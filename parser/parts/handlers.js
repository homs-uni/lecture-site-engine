import { slugify, extractSubsections } from '../core/slug.js';
import { parseBlocks, enrichCodeLineMaps } from '../blocks/index.js';

/** @param {string} title @param {string} body @param {{ parseBlocksFn: Function }} ctx */
export function parseDetailPart(title, body, ctx) {
  const blocks = ctx.parseBlocksFn(body);
  enrichCodeLineMaps(blocks);
  return {
    title,
    type: ctx.type,
    icon: ctx.icon,
    blocks,
    subsections: extractSubsections(body),
  };
}

// Matches a single option marker (e.g. "أ)") at the start of a line —
// optionally after a "-"/"*" bullet ("- أ) نص", used by
// subjects/year-5/1-kdd/lectures/par7-sec3.md), and accepts "." as
// well as ")" (subjects/year-5/1-kdd/lectures/par5-sec2.md uses
// "أ. نص"). The trailing text is optional too, because some options
// are just a bare marker on their own line followed by a multi-line
// code block — see the `pending` accumulation below.
//
// Only the Arabic letters (أ-ي) count as markers — NOT the bare Latin
// "a"/"b"/"c"/"d" that `arabicKey` maps option keys to. Every real
// question in the repo marks its options with أ/ب/ج/د; nothing uses a
// literal "a)"/"b)" as the marker itself. But quite a few questions
// mention math/code that legitimately CONTAINS a lone Latin a/b/c/d —
// e.g. an SVM option's own text "... W·Xi + b) = 1" (closing a
// function-call paren right after variable "b") or a Kotlin code
// block containing "d.turnOn()" (variable "d" + method-call dot) —
// and both "b)" and "d." are indistinguishable from a real marker by
// shape alone. Since no real option is ever marked with a bare Latin
// letter, excluding them from the marker class entirely removes this
// whole class of false positives (year-5/1-kdd/lectures/par7-sec1.md
// السؤال 10, year-4/android-dev-fundamentals/lectures/par3.md
// السؤال 5).
const optStartRe = /^[-*]?\s*([أ-ي])[)\.]\s*(.*)$/i;

// Finds every marker occurrence within a single line, for the
// all-options-crammed-on-one-line layout. Requires the marker to be
// preceded by the start of the line or by whitespace — never by a
// letter/digit (e.g. an Arabic word ending in "...أعداد)" ends in a
// marker letter "د" right before a ")") and never by punctuation such
// as "(" — e.g. an option that itself reads "لأن فريق (أ) أقل خبرة من
// فريق (ب)" (referring to "Team A"/"Team B") contains "(أ)" and "(ب)"
// that are NOT new options, just parenthetical references glued right
// after "(". Without this guard, any such letter buried inside
// another option's own text was mistaken for a brand-new option,
// splitting one option into two (or more) that all claim the same
// key — the single largest bug category found across the repo (~20
// files, e.g. year-3/2-ai-theory/lectures/par1.md السؤال 6/7,
// year-1/2-mabade2-th/lectures/par6.md السؤال 2.3, most of the
// *-compiler-principles files). A genuine marker is always its own
// token, set off by whitespace or the very start of the line.
const optGlobalRe = /(?:^|(?<=\s))([أ-ي])[)\.]\s*/gi;

/**
 * Parses a question's stem + options + answer + rationale out of the text
 * that follows its "### السؤال N (...)" / "**السؤال N:**" heading. Shared by
 * both a standalone question and each sub-question inside a Case-2 group
 * (`parseMcqGroup` below) so the option/answer parsing logic lives in one
 * place instead of being duplicated per call site.
 *
 * @param {string} content @param {object} arabicKey
 */
function parseQuestionContent(content, arabicKey) {
  // The answer-key label shows up in at least three different forms across
  // the repo's lecture files:
  //   1. "**الإجابة الصحيحة: ب**"  (bold, documented form)
  //   2. "الإجابة الصحيحة: ج"      (plain text, no ** at all)
  //   3. "**الإجابة: ب**"          (short form, no "الصحيحة" word)
  // Match all three. Left blank (extraction-only prompts), answerM must stay
  // null and correct must stay '' — it must NOT fall through to some other
  // Arabic letter later in the text. The captured class here is deliberately
  // the four literal option letters (+ bare "ا", which arabicKey also maps
  // to option "a") — NOT the sweeping [أ-ي] range, which spans nearly the
  // *entire* Arabic alphabet. With a blank answer field followed directly by
  // "**التعليل:**", [أ-ي] happily matched the "ا" inside "التعليل" itself and
  // silently "answered" the question — reproduced with a real دورات extract
  // (subjects/year-4/android-dev-fundamentals/exams/exams.md): every blank
  // answer resolved to "a" for exactly this reason.
  const answerRe = /الإجابة(?:\s+الصحيحة)?[:\s*]*([أابجدهabcde])(?![؀-ۿ])/i;
  const answerM = content.match(answerRe);
  let correct = answerM ? (arabicKey[answerM[1].toLowerCase()] || answerM[1].toLowerCase()) : '';

  // A fourth format has NO "الإجابة" label anywhere — the correct option is
  // marked with a trailing "✅" instead. Only used as a fallback when the
  // label-based match above found nothing.
  if (!correct) {
    const ckM = content.match(/([أابجدهabcde])\)[^\n]*?✅/);
    if (ckM) correct = arabicKey[ckM[1].toLowerCase()] || ckM[1].toLowerCase();
  }

  const explainM = content.match(/التعليل[:\s*]*([\s\S]+?)(?=\n---|\n(?:#{3,4} |\*\*)السؤال |$)/);
  let explain = explainM ? explainM[1].trim() : '';
  if (!explain && answerM) {
    // Some files skip the "التعليل:" label entirely and put the rationale
    // directly in a blockquote right after the answer line. Only look for
    // this when there WAS an answer line to anchor on — otherwise (answer
    // deliberately left blank) there's nothing to anchor the search to and
    // it would just grab the next unrelated blockquote in the text.
    const afterAnswer = content.slice(answerM.index + answerM[0].length);
    const bqM = afterAnswer.match(/^\s*\n*((?:^>.*\n?)+)/m);
    if (bqM) explain = bqM[1].replace(/^>\s?/gm, '').trim();
  }

  // The options loop below must stop BEFORE any explanation text — but when
  // a question has no "الإجابة" label at all (blank-answer or ✅-checkmark
  // forms), there's nothing for answerRe to anchor on. Cut the body off at
  // whichever comes first: the "الإجابة" label or the "التعليل" label.
  const explainLabelM = content.match(/التعليل/);
  const cutPoints = [answerM?.index, explainLabelM?.index].filter(i => typeof i === 'number');
  const bodyEnd = cutPoints.length ? Math.min(...cutPoints) : content.length;
  const body = content.slice(0, bodyEnd).trim();
  const qLines = [];
  const options = [];

  // Accumulates a multi-line option's text — e.g. a fenced code block used
  // for pseudocode/algorithm questions, where the option is just "أ)" alone
  // on its line and the real content spans several following lines.
  // `pending` resets whenever a new marker line appears.
  let pending = null;

  // Question stems normally collapse to one line (qLines.join(' ') below) —
  // fine for plain text, but a stimulus question ("the following code has 4
  // questions about it") needs its fenced code block's newlines and
  // indentation preserved instead of being squashed into one line. Track
  // fence state only while still in the stem (before any option marker has
  // appeared) and keep those lines raw/untrimmed.
  let qFence = false;

  for (const line of body.split('\n')) {
    const t = line.trim();

    if (!options.length && /^```/.test(t)) {
      qFence = !qFence;
      qLines.push(line);
      continue;
    }
    if (!options.length && qFence) {
      qLines.push(line);
      continue;
    }

    if (t === '---') { pending = null; continue; }
    if (!t) {
      if (pending) pending.textLines.push('');
      continue;
    }

    if (optStartRe.test(t)) {
      // SCHEMA.md's documented MCQ example puts all four options on a
      // single line ("أ) ... ب) ... ج) ... د) ..."), but real lecture
      // content sometimes follows that literally instead of the
      // one-option-per-line layout most files use. Find every marker on
      // the line and slice the text between consecutive markers, so both
      // layouts produce the right number of options.
      const markers = [...t.matchAll(optGlobalRe)];
      pending = null; // any new marker line ends prior accumulation

      if (markers.length > 1) {
        markers.forEach((m, i) => {
          const start = m.index + m[0].length;
          const end = i + 1 < markers.length ? markers[i + 1].index : t.length;
          const key = arabicKey[m[1].toLowerCase()] || m[1].toLowerCase();
          // Strip a trailing "✅" some files append directly to the
          // correct option's own text — otherwise the answer would be
          // visible on the button before the student even clicks.
          const optText = t.slice(start, end).replace(/✅/g, '').trim();
          if (optText) options.push({ key, text: optText });
        });
      } else {
        const om = t.match(optStartRe);
        const key = arabicKey[om[1].toLowerCase()] || om[1].toLowerCase();
        const rest = (om[2] || '').replace(/✅/g, '').trim();
        const opt = { key, textLines: rest ? [rest] : [] };
        options.push(opt);
        if (!rest) pending = opt; // marker-only line — keep collecting
      }
    } else if (pending) {
      pending.textLines.push(t.replace(/✅/g, ''));
    } else if (!options.length) {
      qLines.push(t);
    }
  }

  for (const opt of options) {
    if (opt.textLines) {
      opt.text = opt.textLines.join('\n').trim();
      delete opt.textLines;
    }
  }

  // A stem with a fenced code block needs its newlines kept intact for the
  // renderer to reproduce the block — plain-text stems keep the old
  // single-line join so every existing lecture file parses unchanged.
  const question = qLines.some(l => l.trim().startsWith('```'))
    ? qLines.join('\n').trim()
    : qLines.join(' ');

  return { question, options, correct, explain };
}

/**
 * "**المصدر:** ..." is written as a tag directly above the question heading
 * it labels, but chunk-splitting happens at the heading line — so without
 * this the tag would be left dangling at the END of the PREVIOUS question's
 * chunk instead of attached to the one it's actually labeling. Swap it to
 * just after the heading line it precedes, so it ends up inside the right
 * chunk once split() runs.
 */
function moveSourceTagAfterHeading(text) {
  return text.replace(
    /^\*\*المصدر:\*\*[ \t]*([^\n]*)\n((?:#{3,4} السؤال \d+|\*\*السؤال \d+ ?\().*)/gm,
    '$2\n**المصدر:** $1',
  );
}

/** Extracts a "**المصدر:** ..." tag from a chunk (templates/part-past-exam-mcq.md)
 * and returns it separately from the chunk with that line removed, so it
 * doesn't leak into the question stem/options/explanation parsing below. */
function extractSource(chunk) {
  const boldM = chunk.match(/^\*\*المصدر:\*\*[ \t]*([^\n]*)\n?/m);
  if (boldM) return { source: boldM[1].trim(), rest: chunk.replace(boldM[0], '') };
  return { source: '', rest: chunk };
}

/**
 * Case-2 "shared stimulus" group: one paragraph/code block feeding several
 * sub-questions, all inside a single "### السؤال N–M (...)" chunk so they
 * stay visually and semantically together instead of being split into
 * separate top-level questions. Sub-questions are marked "**السؤال N:**"
 * (colon form) — deliberately excluded from the top-level split regex so
 * they don't break the group apart.
 *
 * @param {string} afterHeading @param {object} arabicKey
 */
function parseMcqGroup(afterHeading, subMatches, arabicKey) {
  const stimulus = afterHeading.slice(0, subMatches[0].index).trim();
  const segments = afterHeading
    .split(/(?=^\*\*السؤال [\d.]+:\*\*)/m)
    .filter(s => /^\*\*السؤال [\d.]+:\*\*/.test(s.trim()));

  const questions = segments.map(seg => {
    const sm = seg.match(/^\*\*السؤال ([\d.]+):\*\*\s*/);
    const num = sm ? sm[1] : '?';
    const rest = seg.replace(/^\*\*السؤال [\d.]+:\*\*\s*/, '');
    return { num, ...parseQuestionContent(rest, arabicKey) };
  });

  return { stimulus, questions };
}

/** @param {string} text @param {object} config */
/**
 * Splits text into `{ section, body }` groups on "## <label>" dividers —
 * used to group a past-exam bank's questions by which lecture their answer
 * came from ("## محاضرة 1: ..."). A "##" divider sits ABOVE the "###"/"**"
 * question-split layer parseMCQ runs next, so it never collides with any
 * question boundary. Text before the first "## " divider (or the whole text,
 * if there are no dividers at all) gets section: ''.
 */
function splitMcqSections(text) {
  const chunks = text.split(/(?=^## )/m);
  return chunks.map(chunk => {
    const hm = chunk.match(/^## ([^\n]+)\n?/);
    if (!hm) return { section: '', body: chunk };
    return { section: hm[1].trim(), body: chunk.slice(hm[0].length) };
  });
}

/** @param {string} text @param {object} config */
export function parseMCQ(text, config) {
  const arabicKey = config.arabicKey || {};

  return splitMcqSections(text).flatMap(({ section, body }) =>
    moveSourceTagAfterHeading(body)
      // templates/part-mcq.md + templates/part-past-exam-mcq.md only:
      //   "### السؤال 1 (متوسط)" / "**السؤال 1 (متوسط)**"
      // The bold (non-###) alternative requires a following "(" so it can't
      // match the "**السؤال N:**" (colon) inner marker used by Case-2 groups
      // below — "###" headings never use the colon form, so that alternative
      // is left unrestricted (some real lecture files omit the "(difficulty)"
      // entirely on a "###" heading).
      .split(/(?=^(?:#{3,4} السؤال \d+|\*\*السؤال \d+ ?\())/m)
      .filter(c => /^(?:#{3,4} السؤال \d+|\*\*السؤال \d+ ?\()/.test(c.trim()))
      .map(chunk => {
        const { source, rest: cleanedChunk } = extractSource(chunk);

        // "\d+" only matched plain numbers, so sub-numbered questions like
        // "### السؤال 1.1 (hard): ..." (used for multi-part scenarios) fell
        // through to num='?'. "[\d.]+" also accepts "1.1", "2.3", etc.
        const hm = cleanedChunk.match(/^(?:#{3,4} |\*\*)السؤال ([\d.]+)(?:[–-][\d.]+)? ?\((.+?)\)(?:\*\*)?/);
        const num = hm ? hm[1] : '?';
        const difficulty = hm ? hm[2].trim() : 'متوسط';
        const afterHeading = cleanedChunk.replace(/^(?:#{3,4} |\*\*)السؤال .+\n/m, '');

        const subMatches = [...afterHeading.matchAll(/^\*\*السؤال [\d.]+:\*\*/gm)];
        if (subMatches.length) {
          const { stimulus, questions } = parseMcqGroup(afterHeading, subMatches, arabicKey);
          return { type: 'group', num, difficulty, source, section, stimulus, questions };
        }

        return { num, difficulty, source, section, ...parseQuestionContent(afterHeading, arabicKey) };
      }),
  );
}

/** @param {string} text @param {{ parseBlocksFn: Function }} ctx */
export function parseDebug(text, ctx) {
  return text
    .split(/(?=^### سؤال تصحيح )/m)
    .filter(c => /^### سؤال تصحيح /.test(c))
    .map(chunk => {
      const hm = chunk.match(/^### (سؤال تصحيح \d+)/);
      const title = hm ? hm[1] : 'سؤال تصحيح';
      const blocks = ctx.parseBlocksFn(chunk.replace(/^### .+\n/m, ''));
      enrichCodeLineMaps(blocks);
      return { title, blocks };
    });
}

/** @param {string} text @param {{ parseBlocksFn: Function }} ctx */
export function parseExercise(text, ctx) {
  return text
    .split(/(?=^### (?:\d+\.\s*)?تمرين)/m)
    .filter(c => /^### (?:\d+\.\s*)?تمرين/.test(c))
    .map(chunk => {
      const hm = chunk.match(/^### ((?:\d+\.\s*)?تمرين[^\n]+)/);
      const title = hm ? hm[1].trim() : 'تمرين';
      const blocks = ctx.parseBlocksFn(chunk.replace(/^### .+\n/m, ''));
      enrichCodeLineMaps(blocks);
      return { title, blocks, id: slugify(title) };
    });
}

/** @param {string} text */
export function parseTheory(text) {
  return text
    .split(/(?=^### سؤال )/m)
    .filter(c => /^### سؤال /.test(c) && !c.includes('تصحيح') && !c.includes('تصميم'))
    .map(chunk => {
      const hm = chunk.match(/^### (سؤال \d+:\s*.+)/);
      const title = hm ? hm[1].trim() : 'سؤال';
      const answerM = chunk.match(/\*\*نموذج الإجابة:\*\*\s*([\s\S]+?)(?=\n---|\n### |$)/);
      const answer = answerM ? answerM[1].trim() : '';
      return { title, answer, id: slugify(title) };
    });
}

/** @param {string} text @param {{ parseBlocksFn: Function }} ctx */
export function parseTraceExercise(text, ctx) {
  return text
    .split(/(?=^### (?:تمرين تتبع|تتبع))/m)
    .filter(c => /^### (?:تمرين تتبع|تتبع)/.test(c))
    .map(chunk => {
      const hm = chunk.match(/^### ([^\n]+)/);
      const title = hm ? hm[1].trim() : 'تمرين تتبع';
      const blocks = ctx.parseBlocksFn(chunk.replace(/^### .+\n/m, ''));
      return { title, blocks, id: slugify(title) };
    });
}

/** @param {string} text @param {{ parseBlocksFn: Function }} ctx */
export function parseDesignQuestion(text, ctx) {
  return text
    .split(/(?=^### (?:سؤال تصميم|تصميم))/m)
    .filter(c => /^### (?:سؤال تصميم|تصميم)/.test(c))
    .map(chunk => {
      const hm = chunk.match(/^### ([^\n]+)/);
      const title = hm ? hm[1].trim() : 'سؤال تصميم';
      const requiredM = chunk.match(/\*\*المطلوب:\*\*\s*([\s\S]+?)(?=\*\*نموذج الإجابة|\*\*معايير|$)/);
      const required = requiredM ? requiredM[1].trim() : '';
      const answerM = chunk.match(/\*\*نموذج الإجابة:\*\*\s*([\s\S]+?)(?=\*\*معايير|$)/);
      const answerBody = answerM ? answerM[1].trim() : chunk.replace(/^### .+\n/m, '').trim();
      const criteriaM = chunk.match(/\*\*معايير التقييم:\*\*\s*([\s\S]+?)(?=\n---|\n### |$)/);
      const criteria = criteriaM
        ? criteriaM[1].trim().split('\n').map(l => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean)
        : [];
      const blocks = ctx.parseBlocksFn(answerBody);
      enrichCodeLineMaps(blocks);
      return { title, required, blocks, criteria, id: slugify(title) };
    });
}
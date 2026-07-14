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

/** @param {string} text @param {object} config */
export function parseMCQ(text, config) {
  const arabicKey = config.arabicKey || {};
  return text
    .split(/(?=^(?:#{3,4} |\*\*)السؤال \d+)/m)
    .filter(c => /^(?:#{3,4} |\*\*)السؤال \d+/.test(c.trim()))
    .map(chunk => {
      // "\d+" only matched plain numbers, so sub-numbered questions like
      // "### السؤال 1.1 (hard): ..." (used for multi-part scenarios) fell
      // through to num='?'. "[\d.]+" also accepts "1.1", "2.3", etc.
      const hm = chunk.match(/^(?:#{3,4} |\*\*)السؤال ([\d.]+) \((.+?)\)(?:\*\*)?/);
      const num = hm ? hm[1] : '?';
      const difficulty = hm ? hm[2].trim() : 'متوسط';

      // The answer-key label shows up in at least three different forms
      // across the repo's lecture files:
      //   1. "**الإجابة الصحيحة: ب**"  (bold, documented form)
      //   2. "الإجابة الصحيحة: ج"      (plain text, no ** at all)
      //   3. "**الإجابة: ب**"          (short form, no "الصحيحة" word)
      // The old regex only matched form 1. On every file using form 2 or 3,
      // answerM was always null, correct was always '', no rendered option
      // ever has key === '', and the MCQ card marked EVERY click as wrong
      // regardless of what the student picked — confirmed across 40+ lecture
      // files via audit-mcq.mjs. Match all three forms.
      const answerRe = /الإجابة(?:\s+الصحيحة)?[:\s*]*([أ-يabcd])/i;
      const answerM = chunk.match(answerRe);
      let correct = answerM ? (arabicKey[answerM[1].toLowerCase()] || answerM[1].toLowerCase()) : '';

      // A fourth format has NO "الإجابة" label anywhere — the correct option
      // is marked with a trailing "✅" instead, either right on the option's
      // own line ("ب) `B1` هو الميل ✅") or inside the "التعليل:" text
      // ("- ب) ✅ صحيح ..." / "**التعليل:** ب) ✅ ..."). If the label-based
      // match above found nothing, fall back to whichever letter is
      // immediately followed by "✅" later on the same line.
      let checkmarkKey = '';
      if (!correct) {
        const ckM = chunk.match(/([أ-يabcd])\)[^\n]*?✅/);
        if (ckM) {
          checkmarkKey = arabicKey[ckM[1].toLowerCase()] || ckM[1].toLowerCase();
          correct = checkmarkKey;
        }
      }

      const explainM = chunk.match(/التعليل[:\s*]*([\s\S]+?)(?=\n---|\n(?:#{3,4} |\*\*)السؤال |$)/);
      let explain = explainM ? explainM[1].trim() : '';
      if (!explain) {
        // Some files skip the "التعليل:" label entirely and put the
        // rationale directly in a blockquote right after the answer line
        // (e.g. "**الإجابة: ب**\n> أ) خاطئ... ب) **صحيح**..."). Fall back to
        // that blockquote so the explanation panel isn't just empty.
        const afterAnswer = chunk.slice((answerM?.index ?? 0) + (answerM?.[0]?.length ?? 0));
        const bqM = afterAnswer.match(/^\s*\n*((?:^>.*\n?)+)/m);
        if (bqM) explain = bqM[1].replace(/^>\s?/gm, '').trim();
      }

      // The options loop below must stop BEFORE any explanation text — but
      // when a question has no "الإجابة" label at all (the ✅-checkmark
      // formats above), there's nothing for answerRe to split on, so
      // `before` used to be the ENTIRE chunk, "التعليل:" breakdown included.
      // That was harmless only because the old option-marker regex could
      // never match a bulleted "- أ) ..." line. Now that bulleted lines ARE
      // recognized as options (see optStartRe below), the explanation's own
      // "- أ) خاطئ ..." / "- ب) ✅ صحيح ..." bullets would otherwise be
      // mistaken for a second, duplicate set of options. Cut the body off
      // at whichever comes first: the "الإجابة" label or the "التعليل" label.
      const explainLabelM = chunk.match(/التعليل/);
      const cutPoints = [answerM?.index, explainLabelM?.index].filter(i => typeof i === 'number');
      const bodyEnd = cutPoints.length ? Math.min(...cutPoints) : chunk.length;
      const before = chunk.slice(0, bodyEnd);
      const body = before.replace(/^(?:#{3,4} |\*\*)السؤال .+\n/m, '').trim();
      const qLines = [];
      const options = [];

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

      // Accumulates a multi-line option's text — e.g. a fenced code block
      // used for pseudocode/algorithm questions
      // (subjects/year-3/1-compiler-principles/lectures/par2.md السؤال 17,
      // subjects/year-3/advanced-programming-2/lectures/par11.md السؤال 16),
      // where the option is just "أ)" alone on its line and the real
      // content spans several following lines. `pending` resets whenever a
      // new marker line appears.
      let pending = null;

      for (const line of body.split('\n')) {
        const t = line.trim();

        if (t === '---') { pending = null; continue; }
        if (!t) {
          if (pending) pending.textLines.push('');
          continue;
        }

        if (optStartRe.test(t)) {
          // SCHEMA.md's documented MCQ example puts all four options on a
          // single line ("أ) ... ب) ... ج) ... د) ..."), but real lecture
          // content sometimes follows that literally instead of the
          // one-option-per-line layout most files use. A plain per-line
          // match only ever found the first marker and swallowed the rest
          // of the line (including the other three markers) into option
          // "أ"'s text — so ب/ج/د silently disappeared, leaving a single
          // garbled choice. Since the correct answer is almost never "أ",
          // this made the MCQ card look like it has no real options and
          // marked (almost) every click as wrong.
          //
          // Fix: find every marker on the line and slice the text between
          // consecutive markers, so both the one-per-line and all-on-one-
          // line formats produce the right number of options.
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

      return { num, difficulty, question: qLines.join(' '), options, correct, explain };
    });
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
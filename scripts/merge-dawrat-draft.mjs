#!/usr/bin/env node
/**
 * Merge a tagged DAWRAT draft (exams_draft_*.md with **[محاضرة: N] tags)
 * into the subject's lecture-grouped DAWRAT/exams.md, then renumber.
 *
 * Usage:
 *   node scripts/merge-dawrat-draft.mjs <year-N>/<subject-id> <draft-filename>
 *   node scripts/merge-dawrat-draft.mjs year-4/software-engineering-2 exams_draft_4_5.md
 *   node scripts/merge-dawrat-draft.mjs year-4/software-engineering-2 exams_draft_4_5.md --dry-run
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const subject = process.argv[2];
const draftName = process.argv[3];
const dryRun = process.argv.includes('--dry-run');
if (!subject || !draftName) {
  console.error('Usage: node scripts/merge-dawrat-draft.mjs <year-N>/<subject-id> <draft.md> [--dry-run]');
  process.exit(1);
}

const dawratDir = path.join(REPO_ROOT, 'subjects', subject, 'DAWRAT');
const examsPath = path.join(dawratDir, 'exams.md');
const draftPath = path.join(dawratDir, draftName);
if (!existsSync(examsPath)) {
  console.error(`Not found: ${examsPath}`);
  process.exit(1);
}
if (!existsSync(draftPath)) {
  console.error(`Not found: ${draftPath}`);
  process.exit(1);
}

const LECTURE_TITLES = {
  1: 'Introduction to Software Engineering (مقدمة في هندسة البرمجيات)',
  2: 'Software Life Cycle Models (نماذج دورة حياة البرمجيات)',
  3: 'Software Requirements (متطلبات البرمجيات)',
  4: 'Design and Implementation (التصميم والتنفيذ)',
  5: 'Software Testing (اختبار البرمجيات)',
  6: 'JUnit (اختبار الوحدة بلغة Java)',
  7: 'Project Management and Planning (تخطيط وإدارة المشاريع البرمجية)',
  8: 'Software Measurement (قياس البرمجيات)',
  9: 'Software Measurement — الجزء الثاني (قياس البرمجيات)',
  10: 'Software Requirements Specification (مواصفات متطلبات البرمجيات)',
  11: 'Software Requirements Specification - 2 (وثيقة متطلبات البرمجيات - الجزء الثاني)',
  12: 'Software Quality (جودة البرمجيات)',
  13: 'Refactoring (إعادة هيكلة الكود)',
  14: 'Nature of Games (طبيعة الألعاب)',
};

const CATCH_ALL = 'all';

function resolveLecture(tagBody) {
  const t = tagBody.trim();
  if (/^عام\b/.test(t)) return CATCH_ALL;
  if (/^\d+\s*\/\s*\d+/.test(t)) return CATCH_ALL;
  if (/\d+\s*—[^/\n]*\/\s*\d+\s*—/.test(t)) return CATCH_ALL;
  const m = t.match(/^(\d+)\s*—/);
  if (m) return Number(m[1]);
  return CATCH_ALL;
}

function lectureFromSectionHeading(heading) {
  if (/المحاضرة الكل/.test(heading)) return CATCH_ALL;
  const m = heading.match(/المحاضرة\s+(\d+)/);
  return m ? Number(m[1]) : CATCH_ALL;
}

function stripTrailingSep(text) {
  return text
    .replace(/(?:\n(?:---\s*)?(?:\n##\s*دورة:[^\n]*)+)+\s*$/g, '')
    .replace(/(?:\n|^)---\s*$/g, '')
    .replace(/(?:\n|^)##\s*دورة:[^\n]*\s*$/g, '')
    .trim();
}

const LAT_TO_AR = { a: 'أ', b: 'ب', c: 'ج', d: 'د', e: 'ه', f: 'و' };

function arabicizeOptionsAndAnswer(text) {
  let out = text.replace(
    /^([-*]?\s*)([A-Fa-f])([).]\s*)/gm,
    (_, pre, letter, sep) => `${pre}${LAT_TO_AR[letter.toLowerCase()]}${sep}`,
  );
  out = out.replace(
    /(\*\*الإجابة الصحيحة:\s*)([A-Fa-f])(\*\*)/g,
    (_, pre, letter, post) => `${pre}${LAT_TO_AR[letter.toLowerCase()]}${post}`,
  );
  out = out.replace(
    /(الإجابة الصحيحة:\s*)([A-Fa-f])(?!\w)/g,
    (_, pre, letter) => `${pre}${LAT_TO_AR[letter.toLowerCase()]}`,
  );
  return out;
}

function sectionHeading(lecture) {
  if (lecture === CATCH_ALL) return '## المحاضرة الكل: أسئلة عامة';
  const title = LECTURE_TITLES[lecture] || `محاضرة ${lecture}`;
  return `## المحاضرة ${lecture}: ${title}`;
}

function renderQuestion(q, num) {
  return [
    `**المصدر:** ${q.source}`,
    `### السؤال ${num} (${q.difficulty})`,
    arabicizeOptionsAndAnswer(q.body),
  ].join('\n');
}

function renderGroup(g, startNum) {
  const endNum = startNum + g.subs.length - 1;
  const lines = [
    `**المصدر:** ${g.source}`,
    `### السؤال ${startNum}–${endNum} (${g.groupLabel})`,
    '',
    g.stimulus,
    '',
  ];
  g.subs.forEach((sub, i) => {
    lines.push(`**السؤال ${startNum + i}:** ${arabicizeOptionsAndAnswer(sub.body)}`);
    lines.push('');
  });
  return { text: lines.join('\n').replace(/\n{3,}/g, '\n\n').trim(), count: g.subs.length };
}

/** Parse tagged draft blocks (**[محاضرة: …]**). */
function parseTaggedDraft(md) {
  const chunks = md.split(/(?=^\*\*\[محاضرة:)/m).filter(c => /^\*\*\[محاضرة:/.test(c.trim()));
  const blocks = [];
  for (const chunk of chunks) {
    const raw = chunk.trim();
    const tagM = raw.match(/^\*\*\[محاضرة:\s*([^\]]+)\]\*\*\s*\n?/);
    if (!tagM) continue;
    const tagBody = tagM[1];
    const lecture = resolveLecture(tagBody);
    let rest = raw.slice(tagM[0].length);

    const sourceM = rest.match(/^\*\*المصدر:\*\*[ \t]*([^\n]*)\n?/);
    const source = sourceM ? sourceM[1].trim() : '';
    if (sourceM) rest = rest.slice(sourceM[0].length);
    rest = stripTrailingSep(rest);

    const isGroupTag = /مجموعة/.test(tagBody);
    const hasSubQs = /^\*\*السؤال X\s*\(/m.test(rest) || /\n\*\*السؤال X\s*\(/m.test(rest);

    if (isGroupTag || hasSubQs) {
      rest = rest.replace(/^### السؤال X[^\n]*\n?/, '');
      const firstSub = rest.search(/^\*\*السؤال X\s*\(/m);
      const stimulus = firstSub >= 0 ? rest.slice(0, firstSub).trim() : '';
      const subRaw = firstSub >= 0 ? rest.slice(firstSub) : rest;
      const subs = subRaw
        .split(/(?=^\*\*السؤال X\s*\()/m)
        .filter(s => /^\*\*السؤال X\s*\(/.test(s.trim()))
        .map(seg => {
          const sm = seg.match(/^\*\*السؤال X\s*\(([^)]+)\):\*\*\s*/);
          return {
            difficulty: sm ? sm[1].trim() : 'متوسط',
            body: stripTrailingSep(seg.replace(/^\*\*السؤال X\s*\([^)]+\):\*\*\s*/, '')),
          };
        });
      blocks.push({
        kind: 'group',
        lecture,
        source,
        stimulus,
        subs,
        groupLabel: tagBody.includes('Calculator')
          ? 'مجموعة أسئلة على كود Calculator'
          : 'مجموعة أسئلة على نص مشترك',
      });
      continue;
    }

    const hm = rest.match(/^### السؤال X\s*\(([^)]+)\)\s*\n?/);
    blocks.push({
      kind: 'question',
      lecture,
      source,
      difficulty: hm ? hm[1].trim() : 'متوسط',
      body: stripTrailingSep(hm ? rest.slice(hm[0].length) : rest),
    });
  }
  return blocks;
}

/**
 * Parse already-grouped exams.md into the same block shape.
 * Keeps source/difficulty/body; lecture from ## heading.
 */
function parseGroupedExams(md) {
  const sections = md.split(/(?=^## )/m).filter(s => /^## /.test(s.trim()));
  const blocks = [];

  for (const sec of sections) {
    const hm = sec.match(/^## ([^\n]+)\n?/);
    if (!hm) continue;
    const lecture = lectureFromSectionHeading(hm[1]);
    const body = sec.slice(hm[0].length);
    const chunks = body.split(/(?=^\*\*المصدر:)/m).filter(c => /^\*\*المصدر:/.test(c.trim()));

    for (const chunk of chunks) {
      let rest = chunk.trim();
      const sourceM = rest.match(/^\*\*المصدر:\*\*[ \t]*([^\n]*)\n?/);
      const source = sourceM ? sourceM[1].trim() : '';
      if (sourceM) rest = rest.slice(sourceM[0].length).trim();

      const groupHm = rest.match(/^### السؤال [\d.]+[–-][\d.]+\s*\(([^)]+)\)\s*\n?/);
      if (groupHm) {
        rest = rest.slice(groupHm[0].length);
        const firstSub = rest.search(/^\*\*السؤال [\d.]+:\*\*/m);
        const stimulus = firstSub >= 0 ? rest.slice(0, firstSub).trim() : '';
        const subRaw = firstSub >= 0 ? rest.slice(firstSub) : rest;
        const subs = subRaw
          .split(/(?=^\*\*السؤال [\d.]+:\*\*)/m)
          .filter(s => /^\*\*السؤال [\d.]+:\*\*/.test(s.trim()))
          .map(seg => {
            const bodyOnly = stripTrailingSep(seg.replace(/^\*\*السؤال [\d.]+:\*\*\s*/, ''));
            return { difficulty: 'متوسط', body: bodyOnly };
          });
        blocks.push({
          kind: 'group',
          lecture,
          source,
          stimulus,
          subs,
          groupLabel: groupHm[1].trim(),
        });
        continue;
      }

      const qHm = rest.match(/^### السؤال [\d.]+\s*\(([^)]+)\)\s*\n?/);
      const difficulty = qHm ? qHm[1].trim() : 'متوسط';
      const qBody = stripTrailingSep(qHm ? rest.slice(qHm[0].length) : rest);
      blocks.push({ kind: 'question', lecture, source, difficulty, body: qBody });
    }
  }
  return blocks;
}

function countQuestions(blocks) {
  return blocks.reduce((n, b) => n + (b.kind === 'group' ? b.subs.length : 1), 0);
}

// ─── main ───────────────────────────────────────────────────────────────────

const existingMd = readFileSync(examsPath, 'utf8');
const draftMd = readFileSync(draftPath, 'utf8');

const existing = parseGroupedExams(existingMd);
const draft = parseTaggedDraft(draftMd);

if (!draft.length) {
  console.error('No tagged questions found in draft.');
  process.exit(1);
}

console.log(`Existing exams.md: ${existing.length} blocks (${countQuestions(existing)} questions)`);
console.log(`Draft ${draftName}: ${draft.length} blocks (${countQuestions(draft)} questions)`);

/** @type {Map<number|'all', any[]>} */
const byLecture = new Map();
function push(b) {
  if (!byLecture.has(b.lecture)) byLecture.set(b.lecture, []);
  byLecture.get(b.lecture).push(b);
}
for (const b of existing) push(b);
for (const b of draft) push(b);

const lectureOrder = [...byLecture.keys()]
  .filter(k => k !== CATCH_ALL)
  .sort((a, b) => a - b);
if (byLecture.has(CATCH_ALL)) lectureOrder.push(CATCH_ALL);

const outParts = [];
let nextNum = 1;
const stats = [];

for (const lec of lectureOrder) {
  const items = byLecture.get(lec);
  outParts.push(sectionHeading(lec));
  outParts.push('');
  let sectionCount = 0;

  for (const item of items) {
    if (item.kind === 'group') {
      const { text, count } = renderGroup(item, nextNum);
      outParts.push(text);
      outParts.push('');
      nextNum += count;
      sectionCount += count;
    } else {
      outParts.push(renderQuestion(item, nextNum));
      outParts.push('');
      nextNum += 1;
      sectionCount += 1;
    }
  }
  stats.push({ lecture: lec, count: sectionCount });
}

const output = outParts.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';

console.log(`\nMerged → ${nextNum - 1} questions`);
for (const s of stats) {
  const label = s.lecture === CATCH_ALL ? 'الكل (أسئلة عامة)' : `المحاضرة ${s.lecture}`;
  console.log(`  ${label}: ${s.count}`);
}

if (dryRun) {
  console.log('\n--dry-run: not writing');
  process.exit(0);
}

const bakPath = examsPath + '.pre-merge.bak';
writeFileSync(bakPath, existingMd, 'utf8');
writeFileSync(examsPath, output, 'utf8');
console.log(`\nWrote ${examsPath}`);
console.log(`Backup: ${bakPath}`);

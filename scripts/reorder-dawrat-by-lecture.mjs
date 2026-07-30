#!/usr/bin/env node
/**
 * Reorders a transitional DAWRAT/exams.md that still has per-question
 * **[محاضرة: N — …]** tags (and cycle ## headers) into the final
 * lecture-grouped format used by e.g. databases-2:
 *
 *   ## المحاضرة N: <title>
 *   **المصدر:** …
 *   ### السؤال K (difficulty)
 *   …
 *
 * Shared-context groups stay intact as Case-2 blocks.
 * Unmatched / عام / multi-lecture tags go under "## المحاضرة الكل: أسئلة عامة".
 *
 * Usage:
 *   node scripts/reorder-dawrat-by-lecture.mjs <year-N>/<subject-id>
 *   node scripts/reorder-dawrat-by-lecture.mjs year-4/software-engineering-2 --dry-run
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const subject = process.argv[2];
const dryRun = process.argv.includes('--dry-run');
if (!subject) {
  console.error('Usage: node scripts/reorder-dawrat-by-lecture.mjs <year-N>/<subject-id> [--dry-run]');
  process.exit(1);
}

const examsPath = path.join(REPO_ROOT, 'subjects', subject, 'DAWRAT/exams.md');
if (!existsSync(examsPath)) {
  console.error(`Not found: ${examsPath}`);
  process.exit(1);
}

/** Real lecture titles from this subject's par*.md H1s (English + Arabic). */
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

/**
 * Map a raw `محاضرة: …` tag body to a lecture number or CATCH_ALL.
 * Single numbered tags (even with "/ عام") stay on that lecture.
 * Pure عام / multi-lecture tags → catch-all.
 */
function resolveLecture(tagBody) {
  const t = tagBody.trim();
  if (/^عام\b/.test(t)) return CATCH_ALL;
  // "5/6 — …", "10/11 — …", "1/2 — …"
  if (/^\d+\s*\/\s*\d+/.test(t)) return CATCH_ALL;
  // "1 — Introduction / 8 — Measurement"
  if (/\d+\s*—[^/\n]*\/\s*\d+\s*—/.test(t)) return CATCH_ALL;
  const m = t.match(/^(\d+)\s*—/);
  if (m) return Number(m[1]);
  return CATCH_ALL;
}

/** Strip draft cycle headers / `---` separators that clung to a block's end
 * when the source was still ordered by exam sitting, not by lecture. */
function stripTrailingSep(text) {
  return text
    // trailing "---" and/or "## دورة: …" leftover from the draft layout
    .replace(/(?:\n(?:---\s*)?(?:\n##\s*دورة:[^\n]*)+)+\s*$/g, '')
    .replace(/(?:\n|^)---\s*$/g, '')
    .replace(/(?:\n|^)##\s*دورة:[^\n]*\s*$/g, '')
    .trim();
}

/** Map Latin MCQ markers (a–e / A–E) → Arabic (أ–ه) so parseMCQ can see them.
 * Only touches option lines and the الإجابة الصحيحة letter — not free prose. */
const LAT_TO_AR = { a: 'أ', b: 'ب', c: 'ج', d: 'د', e: 'ه' };

function arabicizeOptionsAndAnswer(text) {
  // Option lines: "a) …" / "A) …" / "- a) …" at start of line
  let out = text.replace(
    /^([-*]?\s*)([A-Ea-e])([).]\s*)/gm,
    (_, pre, letter, sep) => `${pre}${LAT_TO_AR[letter.toLowerCase()]}${sep}`,
  );
  // **الإجابة الصحيحة: c** / **الإجابة الصحيحة: C**
  out = out.replace(
    /(\*\*الإجابة الصحيحة:\s*)([A-Ea-e])(\*\*)/g,
    (_, pre, letter, post) => `${pre}${LAT_TO_AR[letter.toLowerCase()]}${post}`,
  );
  // Bare: الإجابة الصحيحة: c
  out = out.replace(
    /(الإجابة الصحيحة:\s*)([A-Ea-e])(?!\w)/g,
    (_, pre, letter) => `${pre}${LAT_TO_AR[letter.toLowerCase()]}`,
  );
  return out;
}

/**
 * Parse one tagged block into either a normal question or a shared group.
 * @returns {{ kind: 'question'|'group', lecture: number|'all', source: string, difficulty?: string, body: string, stimulus?: string, subs?: {difficulty: string, body: string}[], groupLabel?: string }}
 */
function parseBlock(raw) {
  const tagM = raw.match(/^\*\*\[محاضرة:\s*([^\]]+)\]\*\*\s*\n?/);
  if (!tagM) return null;
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
    // Drop the draft group heading if present
    rest = rest.replace(/^### السؤال X[^\n]*\n?/, '');
    const firstSub = rest.search(/^\*\*السؤال X\s*\(/m);
    const stimulus = firstSub >= 0 ? rest.slice(0, firstSub).trim() : '';
    const subRaw = firstSub >= 0 ? rest.slice(firstSub) : rest;
    const subs = subRaw
      .split(/(?=^\*\*السؤال X\s*\()/m)
      .filter(s => /^\*\*السؤال X\s*\(/.test(s.trim()))
      .map(seg => {
        const sm = seg.match(/^\*\*السؤال X\s*\(([^)]+)\):\*\*\s*/);
        const difficulty = sm ? sm[1].trim() : 'متوسط';
        const body = stripTrailingSep(seg.replace(/^\*\*السؤال X\s*\([^)]+\):\*\*\s*/, ''));
        return { difficulty, body };
      });

    const groupLabel = tagBody.includes('Calculator')
      ? 'مجموعة أسئلة على كود Calculator'
      : 'مجموعة أسئلة على نص مشترك';

    return { kind: 'group', lecture, source, stimulus, subs, groupLabel };
  }

  // Normal question
  const hm = rest.match(/^### السؤال X\s*\(([^)]+)\)\s*\n?/);
  const difficulty = hm ? hm[1].trim() : 'متوسط';
  const body = stripTrailingSep(hm ? rest.slice(hm[0].length) : rest);
  return { kind: 'question', lecture, source, difficulty, body };
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
    const n = startNum + i;
    lines.push(`**السؤال ${n}:** ${arabicizeOptionsAndAnswer(sub.body)}`);
    lines.push('');
  });
  return { text: lines.join('\n').replace(/\n{3,}/g, '\n\n').trim(), count: g.subs.length };
}

// ─── main ───────────────────────────────────────────────────────────────────

const md = readFileSync(examsPath, 'utf8');
const chunks = md.split(/(?=^\*\*\[محاضرة:)/m).filter(c => /^\*\*\[محاضرة:/.test(c.trim()));

const blocks = [];
for (const chunk of chunks) {
  const parsed = parseBlock(chunk.trim());
  if (!parsed) {
    console.warn('Skipped unparseable chunk starting:', chunk.slice(0, 80).replace(/\n/g, ' '));
    continue;
  }
  blocks.push(parsed);
}

if (!blocks.length) {
  console.error('No tagged questions found — nothing to reorder.');
  process.exit(1);
}

/** @type {Map<number|'all', typeof blocks>} */
const byLecture = new Map();
for (const b of blocks) {
  if (!byLecture.has(b.lecture)) byLecture.set(b.lecture, []);
  byLecture.get(b.lecture).push(b);
}

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

console.log(`Parsed ${blocks.length} tagged blocks → ${nextNum - 1} questions`);
for (const s of stats) {
  const label = s.lecture === CATCH_ALL ? 'الكل (أسئلة عامة)' : `المحاضرة ${s.lecture}`;
  console.log(`  ${label}: ${s.count}`);
}

if (dryRun) {
  console.log('\n--dry-run: not writing file');
  console.log('--- preview (first 40 lines) ---');
  console.log(output.split('\n').slice(0, 40).join('\n'));
  process.exit(0);
}

// Backup then overwrite
const bakPath = examsPath + '.pre-reorder.bak';
writeFileSync(bakPath, md, 'utf8');
writeFileSync(examsPath, output, 'utf8');
console.log(`\nWrote ${examsPath}`);
console.log(`Backup: ${bakPath}`);

// Ensure DAWRAT/manifest.json exists (required for the دورات section)
const manifestPath = path.join(REPO_ROOT, 'subjects', subject, 'DAWRAT/manifest.json');
if (!existsSync(manifestPath)) {
  const manifest = {
    title: 'دورات سنوات سابقة',
    subtitle: 'أسئلة من دورات امتحانية سابقة',
    files: [
      {
        path: 'exams.md',
        id: 'exams',
        icon: '📝',
        matIcon: 'history_edu',
        label: 'دورات سنوات سابقة',
      },
    ],
  };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${manifestPath}`);
}

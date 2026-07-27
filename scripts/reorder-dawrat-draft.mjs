#!/usr/bin/env node
/**
 * Reorder a programming-2-style DAWRAT draft into lecture-grouped exams.md.
 *
 * Draft format (tags on the ### heading line):
 *   **المصدر:** […]
 *   ### السؤال N (difficulty) **[محاضرة: K — Title]**
 *   …body…
 *
 * Case-2 groups (MUST stay intact — never split sub-questions):
 *   **المصدر:** […]
 *   ### السؤال N–M (مجموعة أسئلة على نص/كود مشترك) **[محاضرة: …]**
 *   …shared stimulus…
 *   **السؤال N (difficulty):** …
 *   **السؤال N+1 (difficulty):** …
 *
 * Usage:
 *   node scripts/reorder-dawrat-draft.mjs <year-N>/<subject-id> <draft.md>
 *   node scripts/reorder-dawrat-draft.mjs year-1/programming-2 exams_draft.md --dry-run
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const subject = process.argv[2];
const draftName = process.argv[3];
const dryRun = process.argv.includes('--dry-run');
if (!subject || !draftName) {
  console.error('Usage: node scripts/reorder-dawrat-draft.mjs <year-N>/<subject-id> <draft.md> [--dry-run]');
  process.exit(1);
}

const dawratDir = path.join(REPO_ROOT, 'subjects', subject, 'DAWRAT');
const draftPath = path.join(dawratDir, draftName);
const examsPath = path.join(dawratDir, 'exams.md');
const lecturesDir = path.join(REPO_ROOT, 'subjects', subject, 'lectures');

if (!existsSync(draftPath)) {
  console.error(`Not found: ${draftPath}`);
  process.exit(1);
}

const CATCH_ALL = 'all';

/** Build lecture title map from par*.md H1s. */
function loadLectureTitles() {
  const titles = {};
  if (!existsSync(lecturesDir)) return titles;
  for (const name of readdirSync(lecturesDir)) {
    if (!/^par\d+\.md$/i.test(name)) continue;
    const text = readFileSync(path.join(lecturesDir, name), 'utf8');
    const hm = text.match(/^#\s+المحاضرة\s+(\d+)\s*[—–-]\s*(.+)$/m);
    if (!hm) continue;
    titles[Number(hm[1])] = hm[2].trim();
  }
  return titles;
}

const LECTURE_TITLES = loadLectureTitles();

function resolveLecture(tagBody) {
  const t = (tagBody || '').trim();
  if (!t || /^الكل\b/.test(t) || /^عام\b/.test(t) || /^أسئلة عامة/.test(t)) return CATCH_ALL;
  if (/^\d+\s*\/\s*\d+/.test(t)) return CATCH_ALL;
  if (/\d+\s*—[^/\n]*\/\s*\d+\s*—/.test(t)) return CATCH_ALL;
  const m = t.match(/^(\d+)\s*—/);
  if (m) return Number(m[1]);
  return CATCH_ALL;
}

function parseLectureTagLine(line) {
  // **[محاضرة الكل: أسئلة عامة]**  OR  **[محاضرة: 3 — Title]**
  const allM = line.match(/^\*\*\[محاضرة\s*الكل:\s*([^\]]*)\]\*\*/);
  if (allM) return CATCH_ALL;
  const numM = line.match(/^\*\*\[محاضرة:\s*([^\]]+)\]\*\*/);
  if (numM) return resolveLecture(numM[1]);
  return null;
}

function stripTrailingSep(text) {
  return text
    .replace(/(?:\n|^)---\s*$/gm, '')
    .replace(/(?:\n|^)##\s*دورة[^\n]*\s*$/gm, '')
    .trim();
}

function sectionHeading(lecture) {
  if (lecture === CATCH_ALL) return '## المحاضرة الكل: أسئلة عامة';
  const title = LECTURE_TITLES[lecture] || `محاضرة ${lecture}`;
  return `## المحاضرة ${lecture}: ${title}`;
}

const LAT_TO_AR = { a: 'أ', b: 'ب', c: 'ج', d: 'د', e: 'ه', f: 'و' };

function arabicizeOptionsAndAnswer(text) {
  // A) / A. / A:  → أ) / أ. / أ:
  let out = text.replace(
    /^([-*]?\s*)([A-Fa-f])([).:]\s*)/gm,
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

/**
 * Split draft into top-level chunks: each starts with **المصدر:** then ### السؤال.
 * Inner **السؤال N:** markers are NOT split points — groups stay whole.
 */
function splitTopLevelChunks(md) {
  return md
    .split(/(?=^\*\*المصدر:)/m)
    .map(c => c.trim())
    .filter(c => /^\*\*المصدر:/.test(c) && /^### السؤال /m.test(c));
}

function parseChunk(raw) {
  const sourceM = raw.match(/^\*\*المصدر:\*\*[ \t]*([^\n]*)\n?/);
  if (!sourceM) return null;
  const source = sourceM[1].trim();
  let rest = raw.slice(sourceM[0].length).trim();

  // Format A (programming-2): ### السؤال … **[محاضرة: …]** on the SAME line
  let hm = rest.match(
    /^### السؤال\s+(X|[\d.]+)(?:[–-](X|[\d.]+))?\s*\(([^)]+)\)\s*\*\*\[محاضرة(?:\s*الكل:\s*([^\]]*)|:\s*([^\]]+))\]\*\*\s*\n?/,
  );
  let startNum;
  let endNum;
  let parenLabel;
  let lecture;

  if (hm) {
    startNum = hm[1];
    endNum = hm[2] || null;
    parenLabel = hm[3].trim();
    lecture = hm[4] != null ? CATCH_ALL : resolveLecture(hm[5]);
    rest = stripTrailingSep(rest.slice(hm[0].length));
  } else {
    // Format B (algorithms / SE2 draft): ### السؤال X (diff)\n**[محاضرة: …]**
    hm = rest.match(
      /^### السؤال\s+(X|[\d.]+)(?:[–-](X|[\d.]+))?\s*\(([^)]+)\)\s*\n?/,
    );
    if (!hm) {
      console.warn('Unrecognized heading in chunk:', rest.slice(0, 140).replace(/\n/g, ' '));
      return null;
    }
    startNum = hm[1];
    endNum = hm[2] || null;
    parenLabel = hm[3].trim();
    rest = rest.slice(hm[0].length).replace(/^\s*\n?/, '');
    const tagLine = rest.match(/^\*\*\[محاضرة[^\]]*\]\*\*\s*\n?/);
    if (!tagLine) {
      console.warn('Missing lecture tag after heading:', rest.slice(0, 100).replace(/\n/g, ' '));
      return null;
    }
    lecture = parseLectureTagLine(tagLine[0].trim());
    if (lecture == null) {
      console.warn('Bad lecture tag:', tagLine[0]);
      return null;
    }
    rest = stripTrailingSep(rest.slice(tagLine[0].length));
  }

  const isGroup = (endNum != null && endNum !== 'X') || /مجموعة/.test(parenLabel);
  if (isGroup) {
    const subRe = /^\*\*السؤال\s+[\d.]+\s*(?:\([^)]*\))?:\*\*/m;
    const firstSub = rest.search(subRe);
    if (firstSub < 0) {
      console.warn(`Group ${startNum}–${endNum} has no sub-questions — treating as single`);
      return {
        kind: 'question',
        lecture,
        source,
        difficulty: parenLabel,
        body: rest,
      };
    }

    const stimulus = rest.slice(0, firstSub).trim();
    const subRaw = rest.slice(firstSub);
    const subs = subRaw
      .split(/(?=^\*\*السؤال\s+[\d.]+\s*(?:\([^)]*\))?:\*\*)/m)
      .filter(s => /^\*\*السؤال\s+[\d.]+\s*(?:\([^)]*\))?:\*\*/.test(s.trim()))
      .map(seg => {
        const sm = seg.match(/^\*\*السؤال\s+([\d.]+)\s*(?:\(([^)]*)\))?:\*\*\s*/);
        const difficulty = sm?.[2]?.trim() || 'متوسط';
        const body = stripTrailingSep(seg.replace(/^\*\*السؤال\s+[\d.]+\s*(?:\([^)]*\))?:\*\*\s*/, ''));
        return { origNum: sm?.[1], difficulty, body };
      });

    if (!subs.length) {
      console.warn(`Group ${startNum}–${endNum} parsed 0 subs`);
      return null;
    }

    return {
      kind: 'group',
      lecture,
      source,
      stimulus,
      subs,
      groupLabel: /مجموعة/.test(parenLabel) ? parenLabel : 'مجموعة أسئلة على نص/كود مشترك',
      expectedRange: endNum ? `${startNum}–${endNum}` : startNum,
    };
  }

  return {
    kind: 'question',
    lecture,
    source,
    difficulty: parenLabel,
    body: rest,
  };
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

// ─── main ───────────────────────────────────────────────────────────────────

const md = readFileSync(draftPath, 'utf8');
const chunks = splitTopLevelChunks(md);
const blocks = [];
let skipped = 0;

for (const chunk of chunks) {
  const parsed = parseChunk(chunk);
  if (!parsed) {
    skipped += 1;
    continue;
  }
  blocks.push(parsed);
}

if (!blocks.length) {
  console.error('No questions parsed from draft.');
  process.exit(1);
}

const groups = blocks.filter(b => b.kind === 'group');
console.log(`Parsed ${blocks.length} top-level blocks (${groups.length} groups kept intact, ${skipped} skipped)`);
for (const g of groups) {
  console.log(
    `  group lecture=${g.lecture} expected=${g.expectedRange} → ${g.subs.length} subs` +
      (g.subs.length !== (Number(g.expectedRange.split('–')[1]) - Number(g.expectedRange.split('–')[0]) + 1)
        ? ' ⚠ count mismatch vs range'
        : ''),
  );
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

console.log(`\n→ ${nextNum - 1} questions total`);
for (const s of stats) {
  const label = s.lecture === CATCH_ALL ? 'الكل' : `المحاضرة ${s.lecture}`;
  const title = s.lecture === CATCH_ALL ? '' : ` — ${LECTURE_TITLES[s.lecture] || '?'}`;
  console.log(`  ${label}${title}: ${s.count}`);
}

if (dryRun) {
  console.log('\n--dry-run: not writing');
  process.exit(0);
}

writeFileSync(examsPath, output, 'utf8');
console.log(`\nWrote ${examsPath}`);

const manifestPath = path.join(dawratDir, 'manifest.json');
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

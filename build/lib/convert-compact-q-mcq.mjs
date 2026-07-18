#!/usr/bin/env node
/**
 * Convert compact English MCQ banks (**QN.** + a)b)c)d) + bold answer)
 * into templates/part-mcq.md shape so the parser does not need a special case.
 *
 * Usage:
 *   node build/lib/convert-compact-q-mcq.mjs path/to/par.md [...]
 *   node build/lib/convert-compact-q-mcq.mjs --dir subjects/year-5/distributed-systems-questions/lectures
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const LATIN_TO_AR = { a: 'أ', b: 'ب', c: 'ج', d: 'د' };
const DIFF_MAP = {
  easy: 'سهل', 'سهل': 'سهل',
  medium: 'متوسط', 'متوسط': 'متوسط',
  hard: 'صعب', 'صعب': 'صعب',
};

const Q_HEAD_RE = /^\*\*Q(\d+)\s*(?:[\[(]([^\]\)]*)[\])])?\s*[\.:]\*\*\s*(.*)$/m;

function mapDiff(meta) {
  if (!meta) return 'متوسط';
  const parts = meta.split(/[,/]/).map(p => p.trim().toLowerCase());
  for (const p of [...parts].reverse()) {
    if (DIFF_MAP[p]) return DIFF_MAP[p];
  }
  for (const p of parts) {
    for (const [eng, ar] of Object.entries(DIFF_MAP)) {
      if (p.includes(eng)) return ar;
    }
  }
  return 'متوسط';
}

function parseOptionsLine(line) {
  const markers = [...line.matchAll(/(?:^|(?<=\s))([a-d])\)\s*/gi)];
  if (markers.length < 2) return null;
  const opts = [];
  let correct = null;
  for (let i = 0; i < markers.length; i++) {
    const letter = markers[i][1].toLowerCase();
    const start = markers[i].index + markers[i][0].length;
    const end = i + 1 < markers.length ? markers[i + 1].index : line.length;
    let raw = line.slice(start, end).trim();
    const bold = raw.match(/^\*\*(.+)\*\*$/);
    if (bold) {
      raw = bold[1].trim();
      correct = letter;
    }
    opts.push({ letter, text: raw.replace(/✅/g, '').trim() });
  }
  return { opts, correct };
}

/**
 * @param {string} body MCQ section body (after ## heading)
 * @returns {{ text: string, converted: number, skipped: number }}
 */
export function convertCompactMcqBody(body) {
  const matches = [...body.matchAll(new RegExp(Q_HEAD_RE.source, 'gm'))];
  if (!matches.length) return { text: body, converted: 0, skipped: 0 };

  const out = [];
  const preamble = body.slice(0, matches[0].index);
  if (preamble.trim()) out.push(preamble.replace(/\s+$/, '') + '\n\n');

  let converted = 0;
  let skipped = 0;

  for (let idx = 0; idx < matches.length; idx++) {
    const m = matches[idx];
    const num = m[1];
    const meta = m[2];
    const first = m[3] || '';
    const start = m.index + m[0].length;
    const end = idx + 1 < matches.length ? matches[idx + 1].index : body.length;
    let chunk = body.slice(start, end);

    // Keep following ### section headers outside the question
    const secM = chunk.match(/\n(?=### )/);
    let trailing = '';
    if (secM) {
      trailing = chunk.slice(secM.index);
      chunk = chunk.slice(0, secM.index);
    }

    const lines = (first + chunk).replace(/\n---\s*$/, '').trim().split('\n');
    const qLines = [];
    let opts = null;
    let correct = null;
    let source = '';

    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;
      if (/^\*?المصدر:/.test(t)) {
        source = t.replace(/^\*+\s*/, '').replace(/\*+$/, '').trim();
        // drop leading "المصدر:" label noise into clean تعليل text
        source = source.replace(/^المصدر:\s*/, '').trim();
        continue;
      }
      const parsed = parseOptionsLine(t);
      if (parsed) {
        opts = parsed.opts;
        correct = parsed.correct;
        continue;
      }
      const one = t.match(/^([a-d])\)\s*(.*)$/i);
      if (one) {
        if (!opts) opts = [];
        let text = (one[2] || '').trim();
        const letter = one[1].toLowerCase();
        const bold = text.match(/^\*\*(.+)\*\*$/);
        if (bold) {
          text = bold[1].trim();
          correct = letter;
        }
        opts.push({ letter, text });
        continue;
      }
      qLines.push(t);
    }

    if (!opts?.length || !correct) {
      skipped++;
      out.push(m[0] + chunk); // leave original
      if (trailing.trim()) out.push(trailing.trim() + '\n\n');
      continue;
    }

    const diff = mapDiff(meta);
    const arCorrect = LATIN_TO_AR[correct];
    const block = [
      `### السؤال ${num} (${diff})`,
      qLines.join(' ').trim(),
      ...opts.map(o => `${LATIN_TO_AR[o.letter]}) ${o.text}`),
      `**الإجابة الصحيحة: ${arCorrect}**`,
      `**التعليل:** ${source ? `المصدر: ${source}` : 'من نص المحاضرة.'}`,
      '',
    ];
    out.push(block.join('\n'));
    converted++;

    if (idx + 1 < matches.length) out.push('\n---\n\n');
    if (trailing.trim()) out.push(trailing.trim() + '\n\n');
  }

  let text = out.join('').replace(/(?:\n---\n){2,}/g, '\n---\n').replace(/\n{3,}/g, '\n\n');
  if (!text.endsWith('\n')) text += '\n';
  return { text, converted, skipped };
}

export function convertFile(filePath) {
  const abs = resolve(filePath);
  const text = readFileSync(abs, 'utf8');
  const m = text.match(/^## .*(?:MCQ|اختيار من متعدد).*$/m);
  if (!m) return { file: abs, converted: 0, skipped: 0, reason: 'no MCQ section' };

  const headerEnd = m.index + m[0].length;
  const nxt = text.slice(headerEnd).match(/^## /m);
  const sectionEnd = nxt ? headerEnd + nxt.index : text.length;

  const header = text.slice(m.index, headerEnd);
  const body = text.slice(headerEnd, sectionEnd);
  if (!/^\*\*Q\d+/m.test(body)) {
    return { file: abs, converted: 0, skipped: 0, reason: 'already template-shaped' };
  }

  const { text: newBody, converted, skipped } = convertCompactMcqBody(body);
  const next = text.slice(0, m.index) + header + '\n\n' + newBody.replace(/^\n+/, '')
    + (nxt ? text.slice(sectionEnd) : '');
  writeFileSync(abs, next.endsWith('\n') ? next : next + '\n', 'utf8');
  return { file: abs, converted, skipped };
}

function main(argv) {
  const args = argv.slice(2);
  const files = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dir') {
      const dir = resolve(args[++i]);
      for (const name of readdirSync(dir).filter(n => /^par\d+\.md$/.test(n)).sort()) {
        files.push(join(dir, name));
      }
    } else {
      files.push(resolve(args[i]));
    }
  }
  if (!files.length) {
    console.error('Usage: node build/lib/convert-compact-q-mcq.mjs [--dir DIR] file.md …');
    process.exit(1);
  }
  for (const f of files) {
    const r = convertFile(f);
    console.log(`${r.file}: converted=${r.converted} skipped=${r.skipped}${r.reason ? ` (${r.reason})` : ''}`);
  }
}

const isMain = import.meta.url === `file://${resolve(process.argv[1])}`
  || process.argv[1]?.endsWith('convert-compact-q-mcq.mjs');
if (isMain) main(process.argv);

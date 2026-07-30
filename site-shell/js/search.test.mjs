/**
 * Unit tests for client-side search ranking.
 */
import { searchEntries } from './search.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const fixtures = [
  { id: 'par1', lecId: 'par1', lecNum: 1, lecTitle: 'Intro', kind: 'lecture', context: '', title: 'المحاضرة 1 — مقدمة', text: 'مقدمة عامة' },
  { id: 'par9', lecId: 'par9', lecNum: 9, lecTitle: 'Recovery', kind: 'lecture', context: '', title: 'المحاضرة — تقنيات الاسترجاع', text: 'Recovery Techniques' },
  { id: 'par9-p2', lecId: 'par9', lecNum: 9, lecTitle: 'Recovery', kind: 'part', context: 'الشرح', title: 'الشرح التفصيلي', text: 'الشرح التفصيلي' },
  { id: 'par9-p2-aries', lecId: 'par9', lecNum: 9, lecTitle: 'Recovery', kind: 'section', context: 'Recovery', title: '3. خوارزمية ARIES', text: '3. خوارزمية ARIES' },
  { id: 'par9-p2', lecId: 'par9', lecNum: 9, lecTitle: 'Recovery', kind: 'content', context: 'Recovery › ARIES', title: 'ARIES phases', text: 'ARIES uses analysis, redo, and undo phases during recovery.' },
  { id: 'par7-p2', lecId: 'par7', lecNum: 7, lecTitle: 'TX', kind: 'content', context: 'Transactions', title: 'ACID', text: 'خصائص ACID المرغوبة' },
  { id: 'par7-noise', lecId: 'par7', lecNum: 7, lecTitle: 'TX', kind: 'content', context: 'Transactions', title: 'boundaries', text: 'تحديد transaction boundaries مهم جداً' },
];

// Unrelated lectures/parts must not appear for every query
{
  const hits = searchEntries(fixtures, 'ARIES', 15);
  assert(hits.length >= 1, 'ARIES should match');
  assert(hits.every(h => (h.entry.title + h.entry.text).toLowerCase().includes('aries')),
    'every hit must mention ARIES (no kind-only noise)');
  assert(!hits.some(h => (h.entry.text || '').includes('boundaries')),
    'aries must not match inside boundaries');
  assert(hits[0].entry.kind === 'section' || hits[0].entry.kind === 'content',
    'top hit should be section or content, not an unrelated lecture');
}

// Empty / whitespace → no results
assert(searchEntries(fixtures, '   ').length === 0, 'blank query → []');
assert(searchEntries([], 'ARIES').length === 0, 'empty index → []');

// Real title match still ranks lectures when relevant
{
  const hits = searchEntries(fixtures, 'الاسترجاع', 10);
  assert(hits.some(h => h.entry.kind === 'lecture' && h.entry.id === 'par9'),
    'lecture title match for الاسترجاع');
  assert(!hits.some(h => h.entry.id === 'par1'),
    'unrelated lecture must not appear');
}

console.log('search.test.mjs: ok');

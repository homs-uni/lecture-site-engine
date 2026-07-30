#!/usr/bin/env node
/** Smoke test: verify renderer imports and basic block/part output. */
import { createRenderer } from './index.js';

const { renderBlocks, renderLecture, renderTrace, renderDesign, buildTocData } = createRenderer({
  config: { defaultTitle: 'Test Site' },
});

const blocks = [
  { type: 'paragraph', text: 'Hello **world**' },
  { type: 'analogy', title: '💡 التشبيه:', content: 'مثل الصندوق\n**وجه الشبه:** X = Y' },
  { type: 'algorithm', steps: [{ num: '1', step: 'ابدأ', tool: 'IDE', detail: 'افتح المشروع' }] },
  { type: 'equation', title: '📐 المعادلة: Work', latex: 'W = \\sum_i t_i', displayMode: true, explanation: 'مجموع أزمنة المهام' },
  {
    type: 'mini-mcq',
    question: 'ما الناتج؟',
    options: [{ key: 'a', text: '1' }, { key: 'b', text: '2' }],
    correct: 'b',
    explain: 'لأن 1+1=2',
  },
  { type: 'unknown-xyz', text: 'should warn' },
];

const html = renderBlocks(blocks, 'test-p1', 'detail');
if (!html.includes('analogy-card')) throw new Error('missing analogy-card');
if (!html.includes('algorithm-flow')) throw new Error('missing algorithm-flow');
if (!html.includes('equation-block')) throw new Error('missing equation-block');
if (!html.includes('mini-mcq')) throw new Error('missing mini-mcq');
if (!html.includes('unknown-block')) throw new Error('missing unknown fallback');
if (!html.includes('<strong>world</strong>')) throw new Error('missing inline md');

const traceHtml = renderTrace([{
  title: 'تمرين تتبع 1',
  blocks: [
    { type: 'paragraph', text: '**المدخل:** x=1' },
    { type: 'table', header: ['الخطوة', 'الحالة'], rows: [['1', '؟']] },
    { type: 'h4', text: 'نموذج الحل:' },
    { type: 'table', header: ['الخطوة', 'الحالة'], rows: [['1', 'x=2']] },
  ],
}], 'lec1-p1', { registry: createRenderer().blockRegistry });

if (!traceHtml.includes('trace-solution-reveal')) throw new Error('missing trace solution reveal');

const designHtml = renderDesign([{
  title: 'سؤال تصميم 1',
  required: 'صمّم مخططاً',
  criteria: ['وضوح العُقد', 'تسمية الروابط'],
  blocks: [{ type: 'paragraph', text: 'الإجابة هنا' }],
}], 'lec1-p2', { registry: createRenderer().blockRegistry });

if (!designHtml.includes('design-criteria')) throw new Error('missing design criteria');
if (!designHtml.includes('design-answer-reveal')) throw new Error('missing design answer reveal');

const lecture = {
  id: 'lec1',
  title: 'المحاضرة 1 — Test',
  tag: 'Lab 1',
  intro: [],
  parts: [{ type: 'detail', title: 'شرح', blocks: [{ type: 'paragraph', text: 'ok' }] }],
};
const lecHtml = renderLecture(lecture);
if (!lecHtml.includes('id="lec1"')) throw new Error('missing lecture id');

const toc = buildTocData([lecture]);
if (!toc[0].parts[0].id) throw new Error('missing toc part id');

console.log('renderer smoke test: OK');
console.log('  blocks:', blocks.length, 'types rendered');

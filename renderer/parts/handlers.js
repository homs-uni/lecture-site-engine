import { esc } from '../core/escape.js';
import { inlineMd } from '../core/inline-md.js';
import { ms } from '../core/icons.js';
import { renderBlocks } from '../blocks/index.js';
import { calloutHtml } from '../blocks/handlers.js';
import { mcqSectionAnchor } from '../core/slug.js';

function diffBadgeClass(d) {
  if (d === 'سهل') return 'bg-primary/20 text-primary';
  if (d === 'صعب') return 'bg-error-container text-on-error-container';
  return 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
}

/**
 * Optional "تذكرة" reinforcement block inside an MCQ rationale — same visual
 * family as `مهم للامتحان`. Accepts:
 *   #### تذكرة:
 *   > line…
 * or:
 *   **تذكرة:** …
 * followed by optional `>` blockquote lines (or plain lines until a blank line).
 */
function extractTadhkira(explain) {
  if (!explain) return { body: '', tadhkira: '' };
  const m = explain.match(/\n*(?:#{2,4}\s*تذكرة\s*:?|\*\*تذكرة:\*\*)\s*\n*/);
  if (!m) return { body: explain.trim(), tadhkira: '' };

  const before = explain.slice(0, m.index).trim();
  const afterLines = explain.slice(m.index + m[0].length).split('\n');
  let i = 0;
  while (i < afterLines.length && !afterLines[i].trim()) i++;

  const tadhkiraLines = [];
  if (i < afterLines.length && /^>\s?/.test(afterLines[i])) {
    while (i < afterLines.length && (/^>\s?/.test(afterLines[i]) || !afterLines[i].trim())) {
      if (afterLines[i].trim()) tadhkiraLines.push(afterLines[i].replace(/^>\s?/, ''));
      i++;
    }
  } else {
    while (i < afterLines.length && afterLines[i].trim()) {
      tadhkiraLines.push(afterLines[i]);
      i++;
    }
  }

  const trailing = afterLines.slice(i).join('\n').trim();
  const body = [before, trailing].filter(Boolean).join('\n\n');
  return { body, tadhkira: tadhkiraLines.join('\n').trim() };
}

/** Renders MCQ rationale: paragraph breaks preserved, optional تذكرة callout. */
function renderMcqExplain(explain) {
  const { body, tadhkira } = extractTadhkira(explain || '');
  const paras = body
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p class="mb-sm last:mb-0">${inlineMd(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
  const tadhkiraHtml = tadhkira
    ? `<div class="mt-md">${calloutHtml('callout-exam', 'تذكرة 💡', tadhkira)}</div>`
    : '';
  return `${paras}${tadhkiraHtml}`;
}

/** Renders an MCQ question stem — plain text via inlineMd, or (for a shared
 * code/paragraph stimulus feeding several questions) text + fenced code
 * segments, code rendered as a real <pre> block instead of collapsed inline. */
function renderQuestionStem(text) {
  if (!text.includes('```')) {
    return `<p class="font-headline-sm text-headline-sm mb-lg">${inlineMd(text)}</p>`;
  }
  let html = '<div class="mb-lg">';
  const parts = text.split(/```(\w*)\n?([\s\S]*?)```/g);
  for (let i = 0; i < parts.length; i += 3) {
    const plain = parts[i];
    if (plain && plain.trim()) {
      html += `<p class="font-headline-sm text-headline-sm mb-md">${inlineMd(plain.trim())}</p>`;
    }
    const code = parts[i + 1] !== undefined ? parts[i + 2] : undefined;
    if (code !== undefined && code.trim()) {
      html += `<pre class="bg-surface-container-high dark:bg-[#0d0f1a] rounded-lg p-md mb-md overflow-x-auto font-code-sm text-code-sm"><code>${esc(code.trim())}</code></pre>`;
    }
  }
  return html + '</div>';
}

/** A small pill next to the difficulty badge, shown only when the question
 * carries a "**المصدر:**" tag (e.g. a past-exam-year source). */
function sourceTag(source) {
  if (!source) return '';
  return `<span class="font-label-md px-sm py-xs rounded-full bg-outline-variant/40 text-on-surface-variant">${esc(source)}</span>`;
}

/** Renders one answerable question as its own card — reused both for a
 * standalone question and for each sub-question inside a Case-2 group. */
function renderMcqCard(q, cardId, { showSource = true } = {}) {
  let html = `<article class="mcq-card bg-surface-container-lowest dark:bg-[#161b30] border border-outline-variant dark:border-[#1e40af] rounded-xl p-lg custom-shadow box-animate box-hover" id="${cardId}" data-correct="${q.correct}">
    <div class="flex items-center gap-md mb-md flex-wrap">
      <span class="px-sm py-xs bg-secondary-container text-on-secondary-container rounded-lg font-code-sm text-code-sm">س${q.num}</span>
      ${q.difficulty ? `<span class="font-label-md px-sm py-xs rounded-full ${diffBadgeClass(q.difficulty)}">${esc(q.difficulty)}</span>` : ''}
      ${showSource ? sourceTag(q.source) : ''}
    </div>
    ${renderQuestionStem(q.question)}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md mcq-options">`;

  q.options.forEach(opt => {
    html += `<button type="button" class="mcq-opt w-full text-right p-md border border-outline-variant rounded-lg hover:bg-surface-variant hover:border-primary transition-all font-body-md flex items-center gap-md" data-key="${opt.key}" data-correct="${q.correct}">
      <span class="w-8 h-8 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center font-bold shrink-0">${opt.key.toUpperCase()}</span>
      <span class="opt-text flex-1">${inlineMd(opt.text)}</span>
    </button>`;
  });

  html += `</div>
    <div class="mcq-feedback mt-md font-label-md font-bold min-h-[1.4em]" aria-live="polite"></div>
    <div class="mcq-explain hidden mt-md p-md bg-primary/10 rounded-lg border-r-4 border-primary font-body-md">
      <strong class="text-primary">التعليل:</strong>
      <div class="mt-sm">${renderMcqExplain(q.explain)}</div>
    </div>
  </article>`;
  return html;
}

/** Renders a Case-2 group (shared stimulus + several sub-questions) as ONE
 * wrapping block, so the stimulus and all its questions stay together and
 * scroll/move as a unit instead of reading as unrelated separate cards. */
function renderMcqGroup(q, partId) {
  let html = `<section class="mcq-group bg-surface-container-low dark:bg-[#12162a] border-2 border-primary/30 dark:border-[#2b3a8f] rounded-2xl p-lg custom-shadow box-animate box-hover">
    <div class="flex items-center gap-md mb-md flex-wrap">
      <span class="px-sm py-xs bg-primary text-on-primary rounded-lg font-code-sm text-code-sm">${ms('link', true, 'text-sm')} س${q.num}${q.questions.length > 1 ? `–${q.questions[q.questions.length - 1].num}` : ''}</span>
      ${q.difficulty ? `<span class="font-label-md px-sm py-xs rounded-full ${diffBadgeClass(q.difficulty)}">${esc(q.difficulty)}</span>` : ''}
      ${sourceTag(q.source)}
    </div>
    ${renderQuestionStem(q.stimulus)}
    <div class="space-y-md mt-lg">`;

  q.questions.forEach(sub => {
    html += renderMcqCard(sub, `${partId}-q${q.num}-${sub.num}`, { showSource: false });
  });

  return html + '</div></section>';
}

export function renderMCQ(questions, partId) {
  const totalCount = questions.reduce((n, q) => n + (q.type === 'group' ? q.questions.length : 1), 0);

  let html = `<div class="mcq-progress sticky top-16 z-10 bg-surface-container-lowest dark:bg-[#10121f]/90 border border-outline-variant dark:border-[#1e40af] rounded-xl p-md mb-lg custom-shadow box-animate box-hover backdrop-blur-sm" data-part="${partId}">
    <div class="flex items-center gap-md mb-sm">
      ${ms('quiz', false, 'text-primary')}
      <span class="font-label-md text-on-surface-variant">تقدّم الاختبار: <strong class="text-primary mcq-score">0</strong> / ${totalCount}</span>
    </div>
    <div class="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
      <div class="mcq-progress-fill h-full bg-primary rounded-full transition-all duration-300" style="width:0%"></div>
    </div>
  </div>
  <div class="space-y-lg">`;

  let lastSection = null;
  questions.forEach(q => {
    // "## <label>" dividers in the source (e.g. grouping a past-exam bank's
    // questions by which lecture their answer came from) come through as a
    // `section` string on every question — insert a heading whenever it
    // changes so consecutive questions from the same section stay grouped
    // visually without repeating the label on every card.
    if (q.section && q.section !== lastSection) {
      const secId = `${partId}-${mcqSectionAnchor(q.section)}`;
      html += `<h3 id="${esc(secId)}" class="font-headline-md text-headline-md text-primary dark:text-inverse-primary flex items-center gap-sm pt-md first:pt-0 scroll-mt-16">
        ${ms('menu_book', false, 'text-lg')} ${esc(q.section)}
      </h3>`;
    }
    lastSection = q.section || lastSection;

    if (q.type === 'group') {
      html += renderMcqGroup(q, partId);
      return;
    }
    html += renderMcqCard(q, `${partId}-q${q.num}`);
  });

  return html + '</div>';
}

export function renderDebug(questions, partId, ctx) {
  const codeCounterRef = ctx.codeCounterRef || { n: 0 };
  return questions.map(q => `
    <details class="accordion-card group bg-surface-container-lowest dark:bg-[#161b30] border border-outline-variant dark:border-[#1e40af] rounded-xl mb-md overflow-hidden custom-shadow box-animate box-hover">
      <summary class="flex items-center gap-md p-lg cursor-pointer list-none hover:bg-surface-container-high dark:hover:bg-[#1c2440] transition-colors">
        ${ms('bug_report', false, 'text-error')}
        <span class="acc-title flex-1 font-headline-sm text-headline-sm">${esc(q.title)}</span>
        ${ms('expand_more', false, 'text-on-surface-variant acc-chevron transition-transform shrink-0')}
      </summary>
      <div class="acc-body p-lg pt-0 border-t border-outline-variant prose-content">${renderBlocks(q.blocks, { ...ctx, partId, partType: 'debug', codeCounterRef })}</div>
    </details>`).join('');
}

export function renderExercise(questions, partId, ctx) {
  const codeCounterRef = ctx.codeCounterRef || { n: 0 };
  return questions.map((q, qi) => {
    const qId = q.id || `exercise-${qi + 1}`;
    return `
    <details id="${partId}-${qId}" class="accordion-card group bg-surface-container-lowest dark:bg-[#161b30] border border-outline-variant dark:border-[#1e40af] rounded-xl mb-md overflow-hidden custom-shadow box-animate box-hover scroll-mt-16" open>
      <summary class="flex items-center gap-md p-lg cursor-pointer list-none hover:bg-surface-container-high dark:hover:bg-[#1c2440] transition-colors">
        ${ms('terminal', false, 'text-secondary')}
        <span class="acc-title flex-1 font-headline-sm text-headline-sm">${esc(q.title)}</span>
        <span class="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full font-label-md text-label-md shrink-0">مفسر</span>
        ${ms('expand_more', false, 'text-on-surface-variant acc-chevron transition-transform shrink-0')}
      </summary>
      <div class="acc-body p-lg pt-0 border-t border-outline-variant prose-content">${renderBlocks(q.blocks, { ...ctx, partId, partType: 'exercise', codeCounterRef })}</div>
    </details>`;
  }).join('');
}

function formatAnswer(text) {
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  for (const line of lines) {
    const t = line.trim();
    const ul = t.match(/^[-*]\s+(.+)/);
    if (ul) {
      if (!inList) { html += '<ul class="list-disc mr-lg">'; inList = true; }
      html += `<li>${inlineMd(ul[1])}</li>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      if (t) html += `<p class="mb-sm">${inlineMd(t)}</p>`;
    }
  }
  if (inList) html += '</ul>';
  return html;
}

export function renderTheory(questions, partId) {
  return questions.map((q, qi) => {
    const qId = q.id || `theory-${qi + 1}`;
    return `
    <details id="${partId}-${qId}" class="accordion-card group bg-surface-container-lowest dark:bg-[#161b30] border border-outline-variant dark:border-[#1e40af] rounded-xl mb-md overflow-hidden custom-shadow box-animate box-hover scroll-mt-16">
      <summary class="flex items-center gap-md p-lg cursor-pointer list-none hover:bg-surface-container-high dark:hover:bg-[#1c2440] transition-colors">
        ${ms('edit_note', false, 'text-secondary')}
        <span class="acc-title flex-1 font-headline-sm text-headline-sm">${esc(q.title)}</span>
        ${ms('expand_more', false, 'text-on-surface-variant acc-chevron transition-transform shrink-0')}
      </summary>
      <div class="acc-body p-lg pt-0 border-t border-outline-variant">
        <div class="bg-primary-fixed/50 dark:bg-primary/10 border border-primary p-md rounded-xl">
          <div class="flex items-center gap-sm mb-sm font-label-md font-bold text-primary">${ms('checklist', false, 'text-primary')} نموذج الإجابة</div>
          <div class="prose-content font-body-md">${formatAnswer(q.answer)}</div>
        </div>
      </div>
    </details>`;
  }).join('');
}

function findSolutionSplitIndex(blocks) {
  return blocks.findIndex(b =>
    (b.type === 'h4' && /نموذج الحل/.test(b.text)) ||
    (b.type === 'paragraph' && /\*\*نموذج الحل/.test(b.text)) ||
    (b.type === 'h4' && /نموذج الحل:/.test(b.text)),
  );
}

export function renderTrace(questions, partId, ctx) {
  const codeCounterRef = ctx.codeCounterRef || { n: 0 };
  return questions.map((q, qi) => {
    const qId = q.id || `trace-${qi + 1}`;
    const splitIdx = findSolutionSplitIndex(q.blocks || []);
    const promptBlocks = splitIdx >= 0 ? q.blocks.slice(0, splitIdx) : q.blocks;
    const solutionBlocks = splitIdx >= 0 ? q.blocks.slice(splitIdx) : [];

    return `
    <details id="${partId}-${qId}" class="accordion-card trace-exercise group bg-surface-container-lowest dark:bg-[#161b30] border border-outline-variant dark:border-[#1e40af] rounded-xl mb-md overflow-hidden custom-shadow box-animate box-hover scroll-mt-16" open>
      <summary class="flex items-center gap-md p-lg cursor-pointer list-none hover:bg-surface-container-high dark:hover:bg-[#1c2440] transition-colors">
        ${ms('track_changes', false, 'text-secondary')}
        <span class="acc-title flex-1 font-headline-sm text-headline-sm">${esc(q.title)}</span>
        <span class="px-sm py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md shrink-0">تتبع</span>
        ${ms('expand_more', false, 'text-on-surface-variant acc-chevron transition-transform shrink-0')}
      </summary>
      <div class="acc-body p-lg pt-0 border-t border-outline-variant">
        <div class="trace-prompt prose-content mb-md">${renderBlocks(promptBlocks, { ...ctx, partId, partType: 'trace', codeCounterRef })}</div>
        ${solutionBlocks.length ? `<details class="trace-solution-reveal border border-primary/30 rounded-xl overflow-hidden">
          <summary class="flex items-center gap-sm p-md cursor-pointer bg-primary/10 font-label-md font-bold text-primary list-none">
            ${ms('visibility', false, 'text-primary')} عرض نموذج الحل
          </summary>
          <div class="p-md prose-content border-t border-primary/20">${renderBlocks(solutionBlocks, { ...ctx, partId, partType: 'trace', codeCounterRef })}</div>
        </details>` : ''}
      </div>
    </details>`;
  }).join('');
}

export function renderDesign(questions, partId, ctx) {
  const codeCounterRef = ctx.codeCounterRef || { n: 0 };
  return questions.map((q, qi) => {
    const qId = q.id || `design-${qi + 1}`;
    const criteriaHtml = q.criteria?.length
      ? `<ul class="design-criteria list-none space-y-xs mb-lg">
          ${q.criteria.map(c => `<li class="flex items-start gap-sm font-body-md text-on-surface-variant">
            ${ms('check_box_outline_blank', false, 'text-primary shrink-0 text-sm')}
            <span>${inlineMd(c)}</span>
          </li>`).join('')}
        </ul>`
      : '';

    return `
    <details id="${partId}-${qId}" class="accordion-card design-exercise group bg-surface-container-lowest dark:bg-[#161b30] border border-outline-variant dark:border-[#1e40af] rounded-xl mb-md overflow-hidden custom-shadow box-animate box-hover scroll-mt-16">
      <summary class="flex items-center gap-md p-lg cursor-pointer list-none hover:bg-surface-container-high dark:hover:bg-[#1c2440] transition-colors">
        ${ms('architecture', false, 'text-secondary')}
        <span class="acc-title flex-1 font-headline-sm text-headline-sm">${esc(q.title)}</span>
        ${ms('expand_more', false, 'text-on-surface-variant acc-chevron transition-transform shrink-0')}
      </summary>
      <div class="acc-body p-lg pt-0 border-t border-outline-variant">
        ${q.required ? `<div class="design-required mb-lg p-md bg-surface-container-high rounded-xl border border-outline-variant">
          <div class="flex items-center gap-sm mb-sm font-label-md font-bold text-primary">${ms('assignment', false, 'text-primary')} المطلوب</div>
          <div class="font-body-md text-on-surface-variant">${inlineMd(q.required).replace(/\n/g, '<br>')}</div>
        </div>` : ''}
        ${criteriaHtml}
        <details class="design-answer-reveal border border-primary/30 rounded-xl overflow-hidden">
          <summary class="flex items-center gap-sm p-md cursor-pointer bg-primary/10 font-label-md font-bold text-primary list-none">
            ${ms('visibility', false, 'text-primary')} عرض نموذج الإجابة
          </summary>
          <div class="p-md prose-content border-t border-primary/20">${renderBlocks(q.blocks || [], { ...ctx, partId, partType: 'design', codeCounterRef })}</div>
        </details>
      </div>
    </details>`;
  }).join('');
}

/**
 * @param {Array<{ type: string, render: Function }>} [extraHandlers]
 */
export function createDefaultPartHandlers(extraHandlers = []) {
  return [
    ...extraHandlers,
    { type: 'mcq', render: (part, ctx) => renderMCQ(part.questions, ctx.partId) },
    { type: 'debug', render: (part, ctx) => renderDebug(part.questions, ctx.partId, ctx) },
    { type: 'exercise', render: (part, ctx) => renderExercise(part.questions, ctx.partId, ctx) },
    { type: 'theory', render: (part, ctx) => renderTheory(part.questions, ctx.partId) },
    { type: 'trace', render: (part, ctx) => renderTrace(part.questions, ctx.partId, ctx) },
    { type: 'design', render: (part, ctx) => renderDesign(part.questions, ctx.partId, ctx) },
  ];
}

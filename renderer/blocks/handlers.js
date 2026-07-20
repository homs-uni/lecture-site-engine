import { esc } from '../core/escape.js';
import { inlineMd } from '../core/inline-md.js';
import { ms } from '../core/icons.js';
import { diagramToHtml } from '../diagram/diagram.js';

const MINI_HEAD_ICONS = {
  'النص الأصلي يقول:': 'record_voice_over',
  'الشرح المبسّط:': 'lightbulb',
  'مثال عملي:': 'science',
  'شرح كل سطر:': 'format_list_numbered',
  'شرح كل سطر/أمر:': 'format_list_numbered',
  'الناتج المتوقع:': 'output',
  'ما هذا الكود؟': 'code',
  'ما هذا الكود/الأمر؟': 'code',
  'ما هذا الملف؟': 'code',
  'ما هذا المخطط؟': 'schema',
  'المكتبات المطلوبة': 'package_2',
  'الناتج المتوقع': 'smartphone',
  'وصف العُقد': 'table_rows',
  'وصف الروابط': 'arrow_range',
  'تفعيل الفهم': 'psychology',
  'استكشاف الأخطاء': 'build',
};

function miniHeadIcon(text) {
  for (const [key, icon] of Object.entries(MINI_HEAD_ICONS)) {
    if (text.includes(key.replace(':', '')) || text.startsWith(key)) return icon;
  }
  return 'subdirectory_arrow_left';
}

function isDiagramNodesHeading(text) {
  return /^وصف الع/.test(String(text).trim());
}

export function calloutHtml(cls, label, content) {
  const map = {
    'callout-exam': {
      wrap: 'bg-error-container text-on-error-container border-2 border-error',
      icon: 'warning',
      filled: true,
    },
    'callout-important': {
      wrap: 'bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-container',
      icon: 'priority_high',
      filled: true,
    },
    'callout-note': {
      wrap: 'bg-secondary-fixed text-on-secondary-fixed border border-secondary',
      icon: 'info',
      filled: false,
    },
    'callout-lesson': {
      wrap: 'bg-primary-fixed text-on-primary-fixed border border-primary',
      icon: 'school',
      filled: true,
    },
  };
  const m = map[cls] || map['callout-note'];
  return `<div class="${m.wrap} p-lg rounded-xl flex items-start gap-lg mb-lg box-animate box-hover">
    ${ms(m.icon, m.filled, 'text-3xl shrink-0')}
    <div class="flex-1">
      <h5 class="font-headline-sm text-headline-sm mb-xs">${esc(label)}</h5>
      <div class="font-body-md text-body-md leading-relaxed">${inlineMd(content).replace(/\n/g, '<br>')}</div>
    </div>
  </div>`;
}

function diagramSpecNoteHtml() {
  return calloutHtml(
    'callout-note',
    'توصيف لكيفية رسم العُقد والروابط فقط (إضافة من AI)',
    'هذا الجدول **ليس للحفظ**. يشرح كيف رُسم المخطط وما علاقة كل عُقدة بكل رابط — استخدمه لفهم الرسم التفاعلي، ثم راجع المحاضرة الأصلية.',
  );
}

function renderMermaid(block) {
  const title = esc(block.title || 'مخطط');
  const code = esc(block.code || '');
  return `<div class="mermaid-container box-animate box-hover">
    <div class="mermaid-header">
      <span class="material-symbols-outlined mermaid-header__icon" aria-hidden="true">account_tree</span>
      <div class="mermaid-header__text">
        <span class="mermaid-header__type">Mermaid</span>
        <span class="mermaid-header__title">${title}</span>
      </div>
    </div>
    <pre class="mermaid">${code}</pre>
  </div>`;
}

function stripBackticks(text) {
  const t = String(text).trim();
  if (t.startsWith('`') && t.endsWith('`')) return t.slice(1, -1);
  return t;
}

function normalizeHlLang(lang) {
  const l = String(lang || 'text').toLowerCase();
  if (l.includes('kotlin')) return 'kotlin';
  if (l.includes('xml')) return 'xml';
  if (l.includes('bash') || l.includes('shell')) return 'bash';
  if (l.includes('gradle')) return 'gradle';
  if (l.includes('json')) return 'json';
  return l.split(/\s*[\/|\s]\s*/)[0] || 'text';
}

export function renderCodeTerminalBody(code, lang, lineMap = {}, langLabel) {
  const lines = String(code).split('\n');
  const language = esc(normalizeHlLang(lang));
  const gutter = lines.map((_, i) => {
    const ln = i + 1;
    const exp = lineMap[ln];
    if (!exp) {
      return `<span class="code-terminal__ln">${ln}</span>`;
    }
    const label = esc(exp.role + (exp.why ? ` — ${exp.why}` : ''));
    return `<span class="code-terminal__ln code-terminal__ln--explainable" data-line="${ln}" data-role="${esc(exp.role)}" data-why="${esc(exp.why)}" tabindex="0" role="button" aria-label="${label}">${ln}</span>`;
  }).join('');
  return `<div class="code-terminal__body code-terminal__body--numbered">
    <div class="code-terminal__gutter" aria-hidden="true">${gutter}</div>
    <pre class="code-terminal__pre"><code class="language-${language}">${esc(code)}</code></pre>
  </div>`;
}

function renderNumberedCode(code, startLine = 1, { numberAllLines = false } = {}) {
  const lines = String(code).split('\n');
  const fullClass = numberAllLines ? ' numbered-code--full' : '';
  return `<div class="numbered-code${fullClass}">${lines.map((line, i) => {
    const showNum = numberAllLines || i === 0;
    const lineNum = numberAllLines ? startLine + i : startLine;
    return `<div class="numbered-code__line">
      <span class="numbered-code__ln${!showNum ? ' numbered-code__ln--cont' : ''}" aria-hidden="true">${showNum ? lineNum : ''}</span>
      <code class="numbered-code__text">${esc(line) || '&nbsp;'}</code>
    </div>`;
  }).join('')}</div>`;
}

function splitOriginalText(content) {
  let text = String(content).trim();
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith('«') && text.endsWith('»'))) {
    text = text.slice(1, -1).trim();
  }
  // Each quoted source line is a deliberate readable unit. Rendering only
  // blank-line splits caused wrapped English source text to collapse back
  // into one dense browser paragraph.
  const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(Boolean);
  return paragraphs.length ? paragraphs : [text];
}

export function renderOriginalText(title, content) {
  const parts = splitOriginalText(content);
  const isEnglish = /\bEnglish\b/i.test(String(title));
  const directionAttrs = isEnglish ? ' dir="ltr" lang="en"' : '';
  const directionClass = isEnglish ? ' text-left' : '';
  return `<div class="source-quote mb-lg">
    <div class="source-quote__head">
      ${ms('record_voice_over', false, 'source-quote__icon')}
      <span class="source-quote__label">${inlineMd(title)}</span>
    </div>
    <div class="source-quote__body${directionClass}"${directionAttrs}>
      ${parts.map(part => `<p>${inlineMd(part)}</p>`).join('')}
    </div>
  </div>`;
}

export function renderOriginalTextCollapsible(block, ctx) {
  const inner = block.blocks?.length && ctx.renderBlocks
    ? ctx.renderBlocks(block.blocks, { ...ctx, nested: true, codeCounterRef: ctx.codeCounterRef || { n: 0 } })
    : '';
  const summary = block.summary || block.title || 'عرض النص الأصلي';
  return `<details class="original-text-collapsible accordion-card group bg-surface-container-lowest dark:bg-[#161b30] border border-outline-variant dark:border-[#1e40af] rounded-xl mb-lg overflow-hidden custom-shadow box-animate box-hover">
    <summary class="flex items-center gap-md p-lg cursor-pointer list-none hover:bg-surface-container-high dark:hover:bg-[#1c2440] transition-colors">
      ${ms('record_voice_over', false, 'text-secondary shrink-0')}
      <span class="acc-title flex-1 font-headline-sm text-headline-sm text-on-surface">${inlineMd(summary)}</span>
      ${ms('expand_more', false, 'text-on-surface-variant acc-chevron transition-transform shrink-0')}
    </summary>
    <div class="acc-body p-lg pt-0 border-t border-outline-variant prose-content">${inner}</div>
  </details>`;
}

function plainTableLabel(text) {
  return String(text).replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`/g, '').trim();
}

export function renderTable(header, rows) {
  let h = `<div class="table-wrap border border-outline-variant rounded-lg mb-lg">
    <table class="study-table w-full text-right font-body-md">
      <thead><tr class="bg-surface-container-high border-b border-outline-variant">`;
  header.forEach(c => { h += `<th class="p-md text-primary font-bold align-top">${inlineMd(c)}</th>`; });
  h += '</tr></thead><tbody>';
  rows.forEach((row, ri) => {
    h += `<tr class="border-b border-outline-variant hover:bg-surface-container transition-colors${ri === rows.length - 1 ? ' border-b-0' : ''}">`;
    row.forEach((c, ci) => {
      const label = esc(plainTableLabel(header[ci] || ''));
      h += `<td class="p-md text-on-surface-variant align-top" data-label="${label}">${inlineMd(c)}</td>`;
    });
    h += '</tr>';
  });
  return h + '</tbody></table></div>';
}

function renderLineExplainCard(num, { code, role, why, explain }, delayIdx) {
  const delay = delayIdx * 0.09;
  const hasMeta = role || why || explain;
  let html = `<article class="line-explain-card${code ? '' : ' line-explain-card--no-code'} box-animate box-hover" style="--line-delay:${delay}s">`;

  if (!code && hasMeta) {
    html += `<div class="line-explain-card__num" aria-hidden="true">${num}</div>`;
  }

  html += `<div class="line-explain-card__body">`;

  if (code) {
    html += `<div class="line-explain-card__code-row">
      ${renderNumberedCode(code, num)}
    </div>
    <div class="line-explain-card__divider" aria-hidden="true">
      ${ms('arrow_downward', false, 'line-explain-card__arrow-icon')}
    </div>`;
  }

  if (role || why) {
    html += `<div class="line-explain-card__meta">`;
    if (role) {
      html += `<div class="line-explain-card__meta-cell line-explain-card__meta-cell--role">
        <div class="line-explain-card__meta-head">
          ${ms('functions', false, 'line-explain-card__meta-icon')}
          <span class="line-explain-card__meta-label">الوظيفة</span>
        </div>
        <p class="line-explain-card__explain">${inlineMd(role)}</p>
      </div>`;
    }
    if (why) {
      html += `<div class="line-explain-card__meta-cell line-explain-card__meta-cell--why">
        <div class="line-explain-card__meta-head">
          ${ms('lightbulb', false, 'line-explain-card__meta-icon')}
          <span class="line-explain-card__meta-label">لماذا؟</span>
        </div>
        <p class="line-explain-card__explain">${inlineMd(why)}</p>
      </div>`;
    }
    html += '</div>';
  } else if (explain) {
    html += `<p class="line-explain-card__explain">${inlineMd(explain)}</p>`;
  }

  return html + '</div></article>';
}

export function renderLineExplain(items, title, groups) {
  const heading = title || 'شرح كل سطر:';
  const total = items.length;
  let html = `<div class="line-explain-section mb-lg box-animate">
    <div class="line-explain-section__header">
      ${ms('format_list_numbered', false, 'line-explain-section__icon')}
      <h5 class="line-explain-section__title">${inlineMd(heading)}</h5>
      <span class="line-explain-section__count">${total} سطر</span>
    </div>
    <div class="line-explain-list">`;

  const renderItems = (list, offset = 0) => {
    let chunk = '';
    list.forEach((item, idx) => {
      chunk += renderLineExplainCard(offset + idx + 1, {
        code: item.code || '',
        explain: item.explain || '',
      }, offset + idx);
    });
    return chunk;
  };

  if (groups?.length) {
    let offset = 0;
    for (const group of groups) {
      if (group.title) {
        html += `<div class="line-explain-group">
          <h6 class="line-explain-group__title">${inlineMd(group.title)}</h6>`;
      }
      html += renderItems(group.items, offset);
      offset += group.items.length;
      if (group.title) html += '</div>';
    }
  } else {
    html += renderItems(items);
  }

  return html + '</div></div>';
}

export function renderLineExplainTable(header, rows, title, items) {
  const heading = title || 'شرح كل سطر:';
  const mapped = items?.length
    ? items
    : rows.map(row => ({
      code: stripBackticks(row[0] || ''),
      role: row[1] || '',
      why: header.length >= 3 ? (row[2] || '') : '',
    }));
  let html = `<div class="line-explain-section mb-lg box-animate">
    <div class="line-explain-section__header">
      ${ms('format_list_numbered', false, 'line-explain-section__icon')}
      <h5 class="line-explain-section__title">${inlineMd(heading)}</h5>
      <span class="line-explain-section__count">${mapped.length} سطر</span>
    </div>
    <div class="line-explain-list">`;

  mapped.forEach((item, idx) => {
    html += renderLineExplainCard(idx + 1, {
      code: item.code || '',
      role: item.role || '',
      why: item.why || '',
      explain: item.explain || '',
    }, idx);
  });

  return html + '</div></div>';
}

export function renderAlgorithmFlow(steps) {
  if (!steps?.length) return '';
  let html = '<div class="algorithm-flow mb-lg box-animate">';
  steps.forEach((step, i) => {
    html += `<div class="algorithm-step border border-outline-variant rounded-xl p-md bg-surface-container-lowest box-hover">
      <div class="flex items-start gap-md">
        <span class="algorithm-step__num w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold shrink-0">${esc(step.num || String(i + 1))}</span>
        <div class="flex-1">
          <p class="font-headline-sm text-headline-sm text-on-surface mb-xs">${inlineMd(step.step)}</p>
          ${step.tool ? `<p class="font-label-md text-label-md text-secondary mb-xs">${ms('build', false, 'text-sm inline-block align-middle')} ${inlineMd(step.tool)}</p>` : ''}
          ${step.detail ? `<p class="font-body-md text-body-md text-on-surface-variant">${inlineMd(step.detail)}</p>` : ''}
        </div>
      </div>
    </div>`;
    if (i < steps.length - 1) {
      html += `<div class="algorithm-arrow text-center text-primary text-2xl py-xs" aria-hidden="true">↓</div>`;
    }
  });
  return html + '</div>';
}

function renderAnalogy(block) {
  return `<div class="analogy-card bg-primary-fixed/40 border border-primary p-lg rounded-xl mb-lg box-animate box-hover flex items-start gap-lg">
    ${ms('lightbulb', true, 'text-primary text-3xl shrink-0')}
    <div class="flex-1">
      ${block.title ? `<h5 class="font-headline-sm text-headline-sm text-primary mb-sm">${inlineMd(block.title)}</h5>` : ''}
      <div class="font-body-md text-on-surface-variant leading-relaxed">${inlineMd(block.content).replace(/\n/g, '<br>')}</div>
    </div>
  </div>`;
}

function renderCoreIdea(block) {
  const label = String(block.title || '💡 الفكرة الأساسية').trim();
  return `<div class="core-idea mb-md">
    <div class="flex items-center gap-sm mb-xs mt-md">
      ${ms('lightbulb', false, 'text-primary text-lg shrink-0')}
      <h5 class="font-label-md text-label-md font-bold text-on-surface-variant">${inlineMd(label)}</h5>
    </div>
    <p class="core-idea__text">${inlineMd(block.content)}</p>
  </div>`;
}

function renderEquation(block) {
  const title = block.title || '📐 المعادلة';
  const display = block.displayMode !== false;
  const latex = block.latex || '';
  let html = `<div class="equation-block mb-lg box-animate bg-surface-container-low border border-outline-variant rounded-xl p-lg">
    <div class="flex items-center gap-sm mb-md">
      ${ms('functions', false, 'text-primary text-lg')}
      <h5 class="font-headline-sm text-headline-sm text-on-surface">${inlineMd(title)}</h5>
    </div>
    <div class="equation-block__math overflow-x-auto py-sm text-center" data-katex-display="${display ? 'true' : 'false'}">${esc(latex)}</div>`;
  if (block.explanation) {
    html += `<div class="equation-block__explain mt-md pt-md border-t border-outline-variant font-body-md text-on-surface-variant leading-relaxed">${inlineMd(block.explanation).replace(/\n/g, '<br>')}</div>`;
  }
  return html + '</div>';
}

function renderTradeOff(block) {
  if (block.header?.length && block.rows?.length) {
    let html = `<div class="trade-off-block mb-lg box-animate">
      <div class="flex items-center gap-sm mb-md">
        ${ms('balance', false, 'text-secondary text-lg')}
        <h5 class="font-headline-sm text-headline-sm text-on-surface">${inlineMd(block.title)}</h5>
      </div>
      <div class="trade-off-table table-wrap border border-outline-variant rounded-lg overflow-hidden">`;
    html += '<table class="study-table w-full text-right font-body-md"><thead><tr class="bg-surface-container-high">';
    block.header.forEach((c, ci) => {
      const cls = ci === 1 ? 'trade-off-col-a' : ci === 2 ? 'trade-off-col-b' : '';
      html += `<th class="p-md text-primary font-bold align-top ${cls}">${inlineMd(c)}</th>`;
    });
    html += '</tr></thead><tbody>';
    block.rows.forEach((row, ri) => {
      html += `<tr class="border-b border-outline-variant${ri === block.rows.length - 1 ? ' border-b-0' : ''}">`;
      row.forEach((c, ci) => {
        const cls = ci === 1 ? 'trade-off-col-a bg-primary/5' : ci === 2 ? 'trade-off-col-b bg-secondary/5' : 'font-bold text-on-surface';
        html += `<td class="p-md align-top ${cls}">${inlineMd(c)}</td>`;
      });
      html += '</tr>';
    });
    return html + '</tbody></table></div></div>';
  }
  return `<div class="trade-off-block mb-lg box-animate p-lg border border-outline-variant rounded-xl">
    <div class="flex items-center gap-sm mb-sm">${ms('balance', false, 'text-secondary')}<h5 class="font-headline-sm">${inlineMd(block.title)}</h5></div>
    <p class="font-body-md text-on-surface-variant">${inlineMd(block.content || '')}</p>
  </div>`;
}

function renderBeforeAfter(block) {
  const before = block.phases?.find(p => p.phase === 'before');
  const after = block.phases?.find(p => p.phase === 'after');
  let html = `<div class="before-after-block mb-lg box-animate">
    <div class="flex items-center gap-sm mb-md">
      ${ms('sync_alt', false, 'text-secondary text-lg')}
      <h5 class="font-headline-sm text-headline-sm text-on-surface">${inlineMd(block.title)}</h5>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">`;
  if (before) {
    html += `<div class="before-after-panel before-after-panel--before border border-error/30 rounded-xl overflow-hidden">
      <div class="before-after-panel__head bg-error-container/30 px-md py-sm font-label-md font-bold text-error">قبل</div>
      <pre class="p-md font-code-sm overflow-x-auto"><code class="language-${esc(normalizeHlLang(before.lang))}">${esc(before.code)}</code></pre>
    </div>`;
  }
  if (after) {
    html += `<div class="before-after-panel before-after-panel--after border border-tertiary/30 rounded-xl overflow-hidden">
      <div class="before-after-panel__head bg-tertiary-container/30 px-md py-sm font-label-md font-bold text-tertiary">بعد</div>
      <pre class="p-md font-code-sm overflow-x-auto"><code class="language-${esc(normalizeHlLang(after.lang))}">${esc(after.code)}</code></pre>
    </div>`;
  }
  html += '</div>';
  if (block.changeNote) {
    html += `<p class="mt-md font-body-md text-on-surface-variant border-r-4 border-secondary pr-md">${ms('edit_note', false, 'text-secondary inline-block align-middle')} ${inlineMd(block.changeNote)}</p>`;
  }
  return html + '</div>';
}

function renderTraceBlock(block) {
  let html = `<div class="trace-block mb-lg box-animate">
    <div class="flex items-center gap-sm mb-md">
      ${ms('track_changes', false, 'text-secondary text-lg')}
      <h5 class="font-headline-sm text-headline-sm text-on-surface">${inlineMd(block.title)}</h5>
    </div>`;
  if (block.input) {
    html += `<div class="trace-input mb-md p-md bg-surface-container-high rounded-lg border border-outline-variant">
      <span class="font-label-md font-bold text-primary block mb-xs">المدخل:</span>
      <pre class="font-code-sm whitespace-pre-wrap">${esc(block.input)}</pre>
    </div>`;
  }
  for (const sub of block.blocks || []) {
    if (sub.type === 'table') html += renderTable(sub.header, sub.rows);
    else if (sub.type === 'result') {
      html += `<p class="font-body-md text-on-surface-variant mt-md"><strong class="text-primary">النتيجة:</strong> ${inlineMd(sub.text)}</p>`;
    }
  }
  return html + '</div>';
}

function renderAlgorithmSection(block) {
  let html = `<div class="algorithm-section mb-lg box-animate">
    <div class="flex items-center gap-sm mb-md">
      ${ms('settings', false, 'text-primary text-lg')}
      <h5 class="font-headline-sm text-headline-sm text-on-surface">${inlineMd(block.title)}</h5>
    </div>`;
  for (const sec of block.sections || []) {
    if (sec.type === 'purpose') {
      html += `<blockquote class="border-r-4 border-primary bg-primary/5 p-md rounded-l-xl mb-md font-body-md">${inlineMd(sec.content).replace(/\n/g, '<br>')}</blockquote>`;
    } else if (sec.type === 'algorithm') {
      html += renderAlgorithmFlow(sec.steps);
    } else if (sec.type === 'execution-notes') {
      html += `<div class="execution-notes mb-md">
        <h6 class="font-label-md font-bold text-on-surface-variant mb-sm">${ms('checklist', false, 'text-sm inline-block')} نقاط التنفيذ</h6>
        <ul class="list-disc mr-lg space-y-xs font-body-md text-on-surface-variant">` +
        sec.items.map(it => `<li>${inlineMd(it)}</li>`).join('') +
        '</ul></div>';
    }
  }
  return html + '</div>';
}

function renderUnknownBlock(block) {
  console.warn(`[renderer] Unknown block type: ${block.type}`, block);
  return `<div class="unknown-block mb-md p-md border border-error/50 bg-error-container/10 rounded-lg font-label-md text-error" data-unknown-type="${esc(block.type)}">
    نوع كتلة غير معروف: <code>${esc(block.type)}</code>
  </div>`;
}

/**
 * @param {Array<{ id: string, match: Function, render: Function }>} [extraHandlers]
 */
export function createDefaultBlockHandlers(extraHandlers = []) {
  const handlers = [
  { id: 'h3', match: b => b.type === 'h3', render: (b, ctx) => {
    const sid = b.id ? `${ctx.partId}-${b.id}` : '';
    return `<div class="flex items-center gap-md mb-md mt-lg scroll-mt-16 anchor-target"${sid ? ` id="${esc(sid)}"` : ''}>
        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
          ${ms('bookmark', false, 'text-primary')}
        </div>
        <h4 class="font-headline-md text-headline-md text-on-surface">${inlineMd(b.text)}</h4>
      </div>`;
  }},
  { id: 'paragraph', match: b => b.type === 'paragraph', render: b =>
    `<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-md">${inlineMd(b.text)}</p>` },
  { id: 'blockquote', match: b => b.type === 'blockquote', render: b => {
    const isStudyTip = /نصيحة للدراسة/.test(b.content);
    if (isStudyTip) {
      return `<div class="study-tip mb-lg box-animate" role="note" aria-label="نصيحة للدراسة">
          ${ms('lightbulb', false, 'study-tip__icon')}
          <p class="study-tip__text">${inlineMd(b.content)}</p>
        </div>`;
    }
    return `<blockquote class="border-r-4 border-primary bg-primary/5 dark:bg-primary/10 p-md rounded-l-xl mb-lg font-body-md text-on-surface leading-relaxed box-animate">
        ${ms('format_quote', false, 'text-primary float-right ml-sm')}
        ${inlineMd(b.content).replace(/\n/g, '<br>')}
      </blockquote>`;
  }},
  { id: 'hr', match: b => b.type === 'hr', render: () => '<hr class="border-outline-variant my-lg">' },
  { id: 'code', match: b => b.type === 'code', render: b => {
    const displayLang = esc(b.langLabel || b.lang || 'Code');
    const lineMap = b.lineMap || {};
    const hasExplain = Object.keys(lineMap).length > 0;
    return `<div class="code-terminal rounded-xl overflow-hidden shadow-xl mb-lg box-animate box-hover${hasExplain ? ' code-terminal--has-explain' : ''}">
        <div class="code-terminal-header px-lg py-sm flex justify-between items-center font-label-md">
          <div class="flex items-center gap-sm">
            <span class="w-3 h-3 rounded-full bg-red-500"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
            <span class="mr-md opacity-70">${displayLang}</span>
          </div>
          <div class="flex items-center gap-md">
            ${hasExplain ? `<button type="button" class="line-explain-toggle flex items-center gap-xs hover:text-inverse-primary transition-colors font-label-md" aria-pressed="false" aria-label="تفعيل وضع الشرح — مرّر على رقم السطر">
              ${ms('info', false, 'text-sm')} شرح
            </button>` : ''}
            <button type="button" class="copy-code-btn flex items-center gap-xs hover:text-inverse-primary transition-colors font-label-md">
              ${ms('content_copy', false, 'text-sm')} نسخ
            </button>
          </div>
        </div>
        ${renderCodeTerminalBody(b.code, b.lang, lineMap, b.langLabel)}
      </div>`;
  }},
  { id: 'code-desc', match: b => b.type === 'code-desc', render: b =>
    `<blockquote class="border-r-4 border-secondary bg-secondary-fixed/30 dark:bg-secondary/10 p-md rounded-l-xl mb-md font-body-md">${inlineMd(b.content)}</blockquote>` },
  { id: 'diagram-desc', match: b => b.type === 'diagram-desc', render: b =>
    `<blockquote class="border-r-4 border-secondary bg-secondary-fixed/30 dark:bg-secondary/10 p-md rounded-l-xl mb-md font-body-md">${inlineMd(b.content)}</blockquote>` },
  { id: 'diagram', match: b => b.type === 'diagram', render: b => diagramToHtml(b.data) },
  { id: 'mermaid', match: b => b.type === 'mermaid', render: b => renderMermaid(b) },
  { id: 'line-explain', match: b => b.type === 'line-explain', render: b => renderLineExplain(b.items, b.title, b.groups) },
  { id: 'line-explain-table', match: b => b.type === 'line-explain-table', render: b => renderLineExplainTable(b.header, b.rows, b.title, b.items) },
  { id: 'ol', match: b => b.type === 'ol', render: b =>
    '<ol class="list-decimal mr-lg mb-md space-y-xs font-body-md text-on-surface-variant">' +
    b.items.map(it => `<li>${inlineMd(it)}</li>`).join('') + '</ol>' },
  { id: 'ul', match: b => b.type === 'ul', render: b =>
    '<ul class="list-disc mr-lg mb-md space-y-xs font-body-md text-on-surface-variant">' +
    b.items.map(it => `<li>${inlineMd(it)}</li>`).join('') + '</ul>' },
  { id: 'table', match: b => b.type === 'table', render: b => renderTable(b.header, b.rows) },
  { id: 'callout', match: b => b.type === 'callout', render: b => calloutHtml(b.cls, b.label, b.content) },
  { id: 'compare', match: b => b.type === 'compare', render: b =>
    `<div class="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg box-animate">
      <div class="bg-error-container/20 border border-error/30 p-md rounded-lg flex items-start gap-md">
        ${ms('close', false, 'text-error shrink-0')}
        <div><span class="font-label-md font-bold text-error block mb-xs">❌ الفهم الخاطئ</span>
        <p class="font-body-md text-on-surface-variant">${inlineMd(b.wrong)}</p></div>
      </div>
      <div class="bg-tertiary-container/20 border border-tertiary/30 p-md rounded-lg flex items-start gap-md">
        ${ms('check', false, 'text-tertiary shrink-0')}
        <div><span class="font-label-md font-bold text-tertiary block mb-xs">✅ الفهم الصحيح</span>
        <p class="font-body-md text-on-surface-variant">${inlineMd(b.right)}</p></div>
      </div>
    </div>` },
  { id: 'imports', match: b => b.type === 'imports', render: b =>
    `<div class="imports-block mb-md box-animate">
      <div class="imports-block__head">
        ${ms('package_2', false, 'imports-block__icon')}
        <span class="imports-block__label">المكتبات المطلوبة (Imports)</span>
      </div>
      <div class="imports-block__body">${inlineMd(b.content).replace(/\n/g, '<br>')}</div>
    </div>` },
  { id: 'expected-output', match: b => b.type === 'expected-output', render: b =>
    `<div class="expected-output mb-md box-animate">
      <div class="expected-output__head">
        ${ms('smartphone', false, 'expected-output__icon')}
        <span class="expected-output__label">الناتج المتوقع (لقطة الشاشة)</span>
      </div>
      <div class="expected-output__screen">
        <div class="expected-output__notch" aria-hidden="true"></div>
        <p class="expected-output__text">${inlineMd(b.content)}</p>
      </div>
    </div>` },
  { id: 'troubleshoot-title', match: b => b.type === 'troubleshoot-title', render: b =>
    `<div class="troubleshoot-head mb-md mt-md flex items-center gap-sm">
      ${ms('build', false, 'text-error text-lg')}
      <h5 class="font-label-md text-label-md font-bold text-error">${inlineMd(b.text || 'استكشاف الأخطاء وإصلاحها')}</h5>
    </div>` },
  { id: 'think-prompt', match: b => b.type === 'think-prompt', render: b =>
    `<div class="think-prompt mb-lg box-animate">
      <div class="think-prompt__head">
        ${ms('psychology', false, 'think-prompt__icon')}
        <span class="think-prompt__label">${inlineMd(b.title || '🤔 تفعيل الفهم')}</span>
      </div>
      <blockquote class="think-prompt__body">${inlineMd(b.content).replace(/\n/g, '<br>')}</blockquote>
    </div>` },
  { id: 'think-heading', match: b => b.type === 'think-heading', render: b =>
    `<div class="flex items-center gap-sm mb-sm mt-md">
      ${ms('psychology', false, 'text-secondary text-lg')}
      <h5 class="font-label-md text-label-md font-bold text-on-surface-variant">${inlineMd(b.text)}</h5>
    </div>` },
  { id: 'qa-card', match: b => b.type === 'qa-card', render: b =>
    `<article class="qa-card mb-md box-animate" data-qa-card>
      <button type="button" class="qa-card__toggle w-full text-right" aria-expanded="false">
        <span class="qa-card__q-badge">Q${esc(b.num)}</span>
        <span class="qa-card__question">${inlineMd(b.question)}</span>
        ${ms('expand_more', false, 'qa-card__chevron')}
      </button>
      <div class="qa-card__answer hidden">
        <div class="qa-card__answer-inner">
          <span class="qa-card__a-badge">A</span>
          <p class="qa-card__answer-text">${inlineMd(b.answer)}</p>
        </div>
      </div>
    </article>` },
  { id: 'core-idea', match: b => b.type === 'core-idea', render: renderCoreIdea },
  { id: 'analogy', match: b => b.type === 'analogy', render: renderAnalogy },
  { id: 'equation', match: b => b.type === 'equation', render: renderEquation },
  { id: 'trade-off', match: b => b.type === 'trade-off', render: renderTradeOff },
  { id: 'before-after', match: b => b.type === 'before-after', render: renderBeforeAfter },
  { id: 'trace', match: b => b.type === 'trace', render: renderTraceBlock },
  { id: 'algorithm', match: b => b.type === 'algorithm', render: b => renderAlgorithmFlow(b.steps) },
  { id: 'algorithm-section', match: b => b.type === 'algorithm-section', render: renderAlgorithmSection },
  { id: 'unknown', match: () => true, render: renderUnknownBlock },
  ];

  return [...extraHandlers, ...handlers];
}

export function renderH4(block, ctx, blocks, index) {
  if (block.id) {
    const sid = `${ctx.partId}-${block.id}`;
    return `<div class="flex items-center gap-md mb-md mt-lg scroll-mt-16 anchor-target" id="${esc(sid)}">
      <div class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
        ${ms('bookmark', false, 'text-secondary text-base')}
      </div>
      <h4 class="font-headline-sm text-headline-sm text-on-surface">${inlineMd(block.text)}</h4>
    </div>`;
  }
  if (block.text.includes('النص الأصلي')) {
    const next = blocks[index + 1];
    if (next?.type === 'blockquote') {
      return { html: renderOriginalText(block.text, next.content), skip: 1 };
    }
  }
  let html = '';
  if (isDiagramNodesHeading(block.text)) {
    html += diagramSpecNoteHtml();
  }
  html += `<div class="mini-heading flex items-center gap-sm">
    ${ms(miniHeadIcon(block.text), false, 'text-primary text-lg')}
    <h5 class="font-label-md text-label-md font-bold text-on-surface-variant">${inlineMd(block.text)}</h5>
  </div>`;
  return html;
}

const CODE_SECTION_TYPES = new Set(['code', 'code-desc', 'line-explain', 'line-explain-table', 'imports', 'expected-output']);

export function isCodeSectionBlock(type) {
  return CODE_SECTION_TYPES.has(type);
}

export function renderCodeTitle(block, ctx, codeCounterRef) {
  codeCounterRef.n += 1;
  const title = block.text.replace(/^💻\s*(?:الكود(?:\/الأوامر)?:\s*)?/, '');
  const codeId = `${ctx.partId}-code-${String(codeCounterRef.n).padStart(2, '0')}`;
  return `<div class="code-section mb-lg scroll-mt-16 anchor-target" id="${esc(codeId)}">
    <div class="flex items-center gap-md mb-md">
      ${ms('terminal', false, 'text-primary')}
      <h5 class="font-headline-sm text-headline-sm text-primary">${inlineMd(title)}</h5>
    </div>`;
}

export function renderDiagramTitle(block) {
  const title = block.text.replace(/^📊\s*(?:المخطط:\s*)?/, '');
  return `<div class="flex items-center gap-md mb-md mt-md">
    ${ms('account_tree', false, 'text-secondary text-lg')}
    <h5 class="font-label-md text-label-md font-bold text-secondary">${inlineMd(title)}</h5>
  </div>`;
}

export function renderScreenTitle(block) {
  const title = block.text.replace(/^🖼️\s*(?:الواجهة:\s*)?/, '');
  return `<div class="flex items-center gap-md mb-md mt-md">
    ${ms('screenshot_monitor', false, 'text-secondary text-lg')}
    <h5 class="font-label-md text-label-md font-bold text-secondary">${inlineMd(title)}</h5>
  </div>`;
}

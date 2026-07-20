import {
  collectBlockquote,
  collectDetailsBlock,
  collectDollarMath,
  collectFence,
  collectList,
  collectParagraph,
  collectUntilHeading,
  isStructural,
  isTableStart,
  parseTable,
} from '../core/collectors.js';
import { slugify } from '../core/slug.js';
import { normalizeCodeLang, codeLangLabel, parseAlgorithmLines, isSchemaMetadataCommentStart, collectSchemaMetadataComment } from '../core/utils.js';
import { parseDiagramYaml } from '../diagram/parse-yaml.js';

/** @typedef {import('../core/context.js').ParseContext} Ctx */

function isLineExplainTitle(text) {
  const t = String(text).replace(/^\*\*|\*\*$/g, '').trim();
  if (!t || /^شرح\s+(?:الحل|الفرق)/i.test(t)) return false;
  if (/^شرح\s+كل\s+سطر/i.test(t)) return true;
  if (/^(?:ال)?شرح\s*:?\s*$/i.test(t)) return true;
  return /^شرح\s+(?:هذا\s+تابع|كل\s+(?:قسم|نمط|جزء)|البنية\s+المشتركة|خطوات\s+التحقق|الفكرة\s+العامة|التتب[ّ]?[عط]\s+خطو[ةه]\s+بخطو[ةه]|خطو[ةه]\s+بخطو[ةه]|النمط|التعبير\s+النمطي)/i.test(t);
}

function parseLineExplainItem(text) {
  const t = String(text).trim();
  const arrow = t.match(/^([\s\S]+?)\s*(?:→|->)\s*([\s\S]+)$/);
  if (arrow) {
    return { code: arrow[1].trim().replace(/^`|`$/g, ''), explain: arrow[2].trim() };
  }
  const bt = t.match(/^(`[^`]+`)\s*(.*)$/);
  if (bt) return { code: bt[1].slice(1, -1), explain: bt[2].trim() || t };
  return { code: '', explain: t };
}

/** @returns {import('./registry.js').BlockRegistry['handlers']} */
export function createDefaultBlockHandlers() {
  return [
    {
      id: 'schema-metadata-comment',
      priority: 101,
      test: (ctx) => isSchemaMetadataCommentStart(ctx.line),
      parse: (ctx) => {
        const collected = collectSchemaMetadataComment(ctx.lines, ctx.i);
        return { nextIndex: collected.nextIndex };
      },
    },

    // ── Fences (highest priority) ──────────────────────────────────────────
    {
      id: 'fence',
      priority: 100,
      test: (ctx) => /^```/.test(ctx.trimmed),
      parse: (ctx) => {
        const { lang, code, nextIndex } = collectFence(ctx.lines, ctx.i);
        if (lang === 'diagram') {
          try {
            return { block: { type: 'diagram', data: parseDiagramYaml(code) }, nextIndex };
          } catch {
            return { block: { type: 'code', lang: 'diagram', code }, nextIndex };
          }
        }
        if (lang === 'mermaid') {
          return { block: { type: 'mermaid', code: String(code || '').trim() }, nextIndex };
        }
        if (lang === 'algorithm') {
          return { block: { type: 'algorithm', steps: parseAlgorithmLines(code) }, nextIndex };
        }
        if (lang === 'math' || lang === 'latex') {
          return {
            block: { type: 'equation', latex: code.trim(), displayMode: true },
            nextIndex,
          };
        }
        return {
          block: {
            type: 'code',
            lang: normalizeCodeLang(lang, ctx.config),
            langLabel: codeLangLabel(lang, ctx.config),
            code,
          },
          nextIndex,
        };
      },
    },

    // ── H4 structured blocks ───────────────────────────────────────────────
    {
      id: 'h4-original-text-collapsible',
      priority: 91,
      test: (ctx) => {
        if (!/^#### /.test(ctx.line)) return false;
        const heading = ctx.line.replace(/^#### /, '').trim();
        if (!/النص الأصلي/.test(heading)) return false;
        let j = ctx.i + 1;
        while (j < ctx.lines.length && !ctx.lines[j].trim()) j++;
        return j < ctx.lines.length && /^<details>/.test(ctx.lines[j].trim());
      },
      parse: (ctx) => {
        const heading = ctx.line.replace(/^#### /, '').trim();
        let i = ctx.i + 1;
        while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
        const details = collectDetailsBlock(ctx.lines, i);
        return {
          block: {
            type: 'original-text-collapsible',
            title: heading,
            summary: details.summary,
            innerText: details.innerText,
          },
          nextIndex: details.nextIndex,
        };
      },
    },

    {
      id: 'details-block',
      priority: 88,
      test: (ctx) => /^<details>/.test(ctx.trimmed),
      parse: (ctx) => {
        const details = collectDetailsBlock(ctx.lines, ctx.i);
        return {
          block: {
            type: 'original-text-collapsible',
            title: 'النص الأصلي من المحاضرة',
            summary: details.summary,
            innerText: details.innerText,
          },
          nextIndex: details.nextIndex,
        };
      },
    },

    {
      id: 'h4-callout',
      priority: 90,
      test: (ctx) => {
        if (!/^#### /.test(ctx.line)) return false;
        const heading = ctx.line.replace(/^#### /, '').trim();
        return (ctx.config.callouts || []).some(c => c.re.test(heading));
      },
      parse: (ctx) => {
        const heading = ctx.line.replace(/^#### /, '').trim();
        const callout = ctx.config.callouts.find(c => c.re.test(heading));
        const content = collectUntilHeading(ctx.lines, ctx.i + 1);
        return {
          block: { type: 'callout', cls: callout.cls, label: callout.label, content: content.text },
          nextIndex: content.nextIndex,
        };
      },
    },

    {
      id: 'h4-schema-equation',
      priority: 90,
      test: (ctx) => /^#### (?:📐|المعادلة)/.test(ctx.line),
      parse: (ctx) => {
        const title = ctx.line.replace(/^#### /, '').trim();
        let i = ctx.i + 1;
        let latex = '';
        let displayMode = true;

        while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;

        if (i < ctx.lines.length && /^```/.test(ctx.lines[i].trim())) {
          const fence = collectFence(ctx.lines, i);
          if (fence.lang === 'math' || fence.lang === 'latex' || !fence.lang) {
            latex = fence.code.trim();
            i = fence.nextIndex;
          }
        } else {
          const math = collectDollarMath(ctx.lines, i);
          if (math?.latex) {
            latex = math.latex;
            i = math.nextIndex;
          }
        }

        let explanation = '';
        while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
        if (i < ctx.lines.length) {
          const t = ctx.lines[i].trim();
          if (/^\*\*الشرح:?\*\*/.test(t) || /^#### شرح المعادلة/.test(t)) {
            i++;
            while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
            const bq = collectBlockquote(ctx.lines, i);
            if (bq.text) {
              explanation = bq.text;
              i = bq.nextIndex;
            } else {
              const para = collectParagraph(ctx.lines, i);
              explanation = para.text;
              i = para.nextIndex;
            }
          }
        }

        return {
          block: { type: 'equation', title, latex, displayMode, explanation },
          nextIndex: i,
        };
      },
    },

    {
      id: 'h4-compare',
      priority: 91,
      test: (ctx) => {
        if (!/^#### الفهم الخاطئ/.test(ctx.line)) return false;
        let j = ctx.i + 1;
        while (j < ctx.lines.length) {
          const t = ctx.lines[j].trim();
          if (/^#### الفهم الصحيح/.test(t)) return true;
          if (/^### /.test(t) || /^## /.test(t)) return false;
          j++;
        }
        return false;
      },
      parse: (ctx) => {
        const wrongHeading = ctx.line.replace(/^#### /, '').trim();
        const wrongInline = wrongHeading.match(/^الفهم الخاطئ[^:]*:\s*(.+)$/);
        let wrong = '';
        let i = ctx.i + 1;
        if (wrongInline?.[1]) {
          wrong = wrongInline[1].trim();
        } else {
          while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
          const collected = collectUntilHeading(ctx.lines, i);
          wrong = collected.text;
          i = collected.nextIndex;
        }
        while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
        const rightHeading = ctx.lines[i].replace(/^#### /, '').trim();
        const rightInline = rightHeading.match(/^الفهم الصحيح[^:]*:\s*(.+)$/);
        i++;
        let right = '';
        if (rightInline?.[1]) {
          right = rightInline[1].trim();
        } else {
          while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
          const collected = collectUntilHeading(ctx.lines, i);
          right = collected.text;
          i = collected.nextIndex;
        }
        return { block: { type: 'compare', wrong, right }, nextIndex: i };
      },
    },

    {
      id: 'h4-schema-core-idea',
      priority: 90,
      test: (ctx) => /^#### 💡 الفكرة (?:الأساسية|الرئيسية)/.test(ctx.line),
      parse: (ctx) => {
        const title = ctx.line.replace(/^#### /, '').trim();
        let i = ctx.i + 1;
        while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
        if (i < ctx.lines.length && /^> /.test(ctx.lines[i])) {
          const bq = collectBlockquote(ctx.lines, i);
          return { block: { type: 'core-idea', title, content: bq.text }, nextIndex: bq.nextIndex };
        }
        const para = collectParagraph(ctx.lines, i);
        return { block: { type: 'core-idea', title, content: para.text }, nextIndex: para.nextIndex };
      },
    },

    {
      id: 'h4-schema-analogy',
      priority: 89,
      test: (ctx) => /^#### 💡/.test(ctx.line),
      parse: (ctx) => {
        const title = ctx.line.replace(/^#### /, '').trim();
        const bq = collectBlockquote(ctx.lines, ctx.i + 1);
        return { block: { type: 'analogy', title, content: bq.text }, nextIndex: bq.nextIndex };
      },
    },

    {
      id: 'h4-schema-trade-off',
      priority: 89,
      test: (ctx) => /^#### ⚖️/.test(ctx.line),
      parse: (ctx) => {
        const title = ctx.line.replace(/^#### /, '').trim();
        let i = ctx.i + 1;
        while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
        if (isTableStart(ctx.lines, i)) {
          const table = parseTable(ctx.lines, i);
          return {
            block: { type: 'trade-off', title, header: table.header, rows: table.rows },
            nextIndex: table.nextIndex,
          };
        }
        const para = collectParagraph(ctx.lines, i);
        return { block: { type: 'trade-off', title, content: para.text }, nextIndex: para.nextIndex };
      },
    },

    {
      id: 'h4-schema-before-after',
      priority: 89,
      test: (ctx) => /^#### 🔄/.test(ctx.line),
      parse: (ctx) => {
        const title = ctx.line.replace(/^#### /, '').trim();
        const blocks = [];
        let i = ctx.i + 1;
        let changeNote = '';

        while (i < ctx.lines.length) {
          const t = ctx.lines[i].trim();
          if (/^#{3,4} /.test(t) || /^---+$/.test(t)) break;

          if (/^\*\*قبل:\*\*$/.test(t)) {
            i++;
            if (/^```/.test(ctx.lines[i]?.trim())) {
              const fence = collectFence(ctx.lines, i);
              blocks.push({ phase: 'before', lang: fence.lang, code: fence.code });
              i = fence.nextIndex;
            }
            continue;
          }
          if (/^\*\*بعد:\*\*$/.test(t)) {
            i++;
            if (/^```/.test(ctx.lines[i]?.trim())) {
              const fence = collectFence(ctx.lines, i);
              blocks.push({ phase: 'after', lang: fence.lang, code: fence.code });
              i = fence.nextIndex;
            }
            continue;
          }
          if (/^\*\*ماذا تغيّر\?\*\*/.test(t)) {
            changeNote = t.replace(/^\*\*ماذا تغيّر\?\*\*\s*/, '');
            i++;
            if (!changeNote && ctx.lines[i]?.trim()) {
              changeNote = ctx.lines[i].trim();
              i++;
            }
            continue;
          }
          if (!t) { i++; continue; }
          i++;
        }

        return { block: { type: 'before-after', title, phases: blocks, changeNote }, nextIndex: i };
      },
    },

    {
      id: 'h4-schema-trace',
      priority: 89,
      test: (ctx) => /^#### 🔍/.test(ctx.line),
      parse: (ctx) => {
        const title = ctx.line.replace(/^#### /, '').trim();
        let i = ctx.i + 1;
        let input = '';
        const blocks = [];

        while (i < ctx.lines.length) {
          const t = ctx.lines[i].trim();
          if (/^#{3,4} /.test(t) || /^---+$/.test(t)) break;

          if (/^\*\*المدخل:\*\*/.test(t)) {
            input = t.replace(/^\*\*المدخل:\*\*\s*/, '');
            i++;
            if (!input && /^```/.test(ctx.lines[i]?.trim())) {
              const fence = collectFence(ctx.lines, i);
              input = fence.code;
              i = fence.nextIndex;
            }
            continue;
          }
          if (isTableStart(ctx.lines, i)) {
            const table = parseTable(ctx.lines, i);
            blocks.push({ type: 'table', header: table.header, rows: table.rows });
            i = table.nextIndex;
            continue;
          }
          if (/^\*\*النتيجة:\*\*/.test(t)) {
            const result = t.replace(/^\*\*النتيجة:\*\*\s*/, '');
            blocks.push({ type: 'result', text: result });
            i++;
            continue;
          }
          if (!t) { i++; continue; }
          i++;
        }

        return { block: { type: 'trace', title, input, blocks }, nextIndex: i };
      },
    },

    {
      id: 'h4-algorithm-section',
      priority: 88,
      test: (ctx) => /^#### ⚙️/.test(ctx.line),
      parse: (ctx) => {
        const title = ctx.line.replace(/^#### /, '').trim();
        let i = ctx.i + 1;
        const sectionBlocks = [];

        while (i < ctx.lines.length) {
          const t = ctx.lines[i].trim();
          if (/^#{3,4} /.test(t) && !/^#### ما هدف/.test(t) && !/^#### نقاط/.test(t)) break;
          if (/^---+$/.test(t)) break;

          if (/^#### ما هدف/.test(t)) {
            const bq = collectBlockquote(ctx.lines, i + 1);
            sectionBlocks.push({ type: 'purpose', content: bq.text });
            i = bq.nextIndex;
            continue;
          }
          if (/^```algorithm/.test(t)) {
            const fence = collectFence(ctx.lines, i);
            sectionBlocks.push({ type: 'algorithm', steps: parseAlgorithmLines(fence.code) });
            i = fence.nextIndex;
            continue;
          }
          if (/^#### نقاط التنفيذ:/.test(t)) {
            const list = collectList(ctx.lines, i + 1);
            sectionBlocks.push({ type: 'execution-notes', items: list.items });
            i = list.nextIndex;
            continue;
          }
          if (!t) { i++; continue; }
          i++;
        }

        return { block: { type: 'algorithm-section', title, sections: sectionBlocks }, nextIndex: i };
      },
    },

    {
      id: 'h4-emoji-headings',
      priority: 85,
      test: (ctx) => {
        if (!/^#### /.test(ctx.line)) return false;
        const h = ctx.line.replace(/^#### /, '').trim();
        return /^[💻🛠️🤔📊🖼️]/.test(h)
          || h === 'ما هذا الكود؟' || h === 'ما هذا الكود/الأمر؟' || h === 'ما هذا الملف؟'
          || h === 'ما هذا المخطط؟'
          || isLineExplainTitle(h);
      },
      parse: (ctx) => {
        const heading = ctx.line.replace(/^#### /, '').trim();

        if (heading.startsWith('💻')) {
          if (/^💻\s*الكود\s*\/\s*الخطوات/i.test(heading)) {
            return { block: null, nextIndex: ctx.i + 1 };
          }
          return { block: { type: 'code-title', text: heading }, nextIndex: ctx.i + 1 };
        }
        if (heading.startsWith('🛠️')) {
          return {
            block: { type: 'troubleshoot-title', text: heading.replace(/^🛠️\s*/, '').replace(/^\*\*|\*\*$/g, '').trim() },
            nextIndex: ctx.i + 1,
          };
        }
        if (heading.startsWith('🤔')) {
          const bq = collectBlockquote(ctx.lines, ctx.i + 1);
          return { block: { type: 'think-prompt', title: heading, content: bq.text }, nextIndex: bq.nextIndex };
        }
        if (heading.startsWith('📊')) {
          return { block: { type: 'diagram-title', text: heading }, nextIndex: ctx.i + 1 };
        }
        if (heading.startsWith('🖼️')) {
          return { block: { type: 'screen-title', text: heading }, nextIndex: ctx.i + 1 };
        }
        if (heading === 'ما هذا الكود؟' || heading === 'ما هذا الكود/الأمر؟' || heading === 'ما هذا الملف؟') {
          const bq = collectBlockquote(ctx.lines, ctx.i + 1);
          return { block: { type: 'code-desc', content: bq.text }, nextIndex: bq.nextIndex };
        }
        if (heading === 'ما هذا المخطط؟') {
          const bq = collectBlockquote(ctx.lines, ctx.i + 1);
          return { block: { type: 'diagram-desc', content: bq.text }, nextIndex: bq.nextIndex };
        }
        if (isLineExplainTitle(heading)) {
          const list = collectList(ctx.lines, ctx.i + 1);
          if (list.items.length) {
            return {
              block: {
                type: 'line-explain',
                title: heading,
                items: list.items.map(parseLineExplainItem),
              },
              nextIndex: list.nextIndex,
            };
          }
          if (isTableStart(ctx.lines, ctx.i + 1)) {
            const table = parseTable(ctx.lines, ctx.i + 1);
            return {
              block: { type: 'line-explain-table', title: heading, header: table.header, rows: table.rows },
              nextIndex: table.nextIndex,
            };
          }
        }
        return null;
      },
    },

    {
      id: 'h4-generic',
      priority: 80,
      test: (ctx) => /^#### /.test(ctx.line),
      parse: (ctx) => {
        const heading = ctx.line.replace(/^#### /, '').trim();
        const sectionNum = heading.match(/^(\d+(?:\.\d+)*)\.?\s/);
        return {
          block: { type: 'h4', text: heading, ...(sectionNum ? { id: slugify(heading) } : {}) },
          nextIndex: ctx.i + 1,
        };
      },
    },

    // ── H3 ─────────────────────────────────────────────────────────────────
    {
      id: 'h3',
      priority: 75,
      test: (ctx) => /^### /.test(ctx.line),
      parse: (ctx) => {
        const heading = ctx.line.replace(/^### /, '').trim();
        const sectionNum = heading.match(/^(\d+(?:\.\d+)*)\.?\s/);
        return {
          block: { type: 'h3', text: heading, ...(sectionNum ? { id: slugify(heading) } : {}) },
          nextIndex: ctx.i + 1,
        };
      },
    },

    // ── Tables ─────────────────────────────────────────────────────────────
    {
      id: 'table',
      priority: 70,
      test: (ctx) => isTableStart(ctx.lines, ctx.i),
      parse: (ctx) => {
        const table = parseTable(ctx.lines, ctx.i);
        return { block: { type: 'table', header: table.header, rows: table.rows }, nextIndex: table.nextIndex };
      },
    },

    // ── Blockquote ─────────────────────────────────────────────────────────
    {
      id: 'blockquote',
      priority: 65,
      test: (ctx) => /^> /.test(ctx.line),
      parse: (ctx) => {
        const bq = collectBlockquote(ctx.lines, ctx.i);
        return { block: { type: 'blockquote', content: bq.text }, nextIndex: bq.nextIndex };
      },
    },

    // ── Q&A card ───────────────────────────────────────────────────────────
    {
      id: 'qa-card',
      priority: 64,
      test: (ctx) => /^\*\*Q\d+:\*\*/i.test(ctx.trimmed),
      parse: (ctx) => {
        const qMatch = ctx.trimmed.match(/^\*\*Q(\d+):\*\*\s*(.*)$/i);
        if (!qMatch) return null;
        const qNum = qMatch[1];
        const qText = qMatch[2].trim();
        let i = ctx.i + 1;
        while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
        let aText = '';
        if (i < ctx.lines.length) {
          const aLine = ctx.lines[i].trim();
          const aMatch = aLine.match(/^(?:\*\*)?A:\*\*\s*(.*)$/i) || aLine.match(/^A:\s*(.*)$/i);
          if (aMatch) {
            aText = aMatch[1].trim();
            i++;
          }
        }
        return { block: { type: 'qa-card', num: qNum, question: qText, answer: aText }, nextIndex: i };
      },
    },

    // ── Inline emoji / meta lines ──────────────────────────────────────────
    {
      id: 'inline-meta',
      priority: 60,
      test: (ctx) => {
        const t = ctx.trimmed;
        return /^💻/.test(t)
          || /^🛠️/.test(t)
          || /^\*\*ما هذا (?:الكود|الملف)/.test(t)
          || /^\*\*المكتبات المطلوبة/.test(t)
          || /^\*\*الناتج المتوقع/.test(t)
          || /^\*\*⚠️ ملاحظة هامة/.test(t)
          || /^\*\*الفهم الخاطئ/.test(t)
          || /^\*\*لماذا\?\*\*/.test(t);
      },
      parse: (ctx) => {
        const t = ctx.trimmed;
        let i = ctx.i + 1;

        if (/^💻/.test(t)) {
          return { block: { type: 'code-title', text: t.replace(/^\*\*|\*\*$/g, '').trim() }, nextIndex: i };
        }
        if (/^🛠️/.test(t)) {
          return {
            block: { type: 'troubleshoot-title', text: t.replace(/^🛠️\s*/, '').replace(/^\*\*|\*\*$/g, '').trim() },
            nextIndex: i,
          };
        }
        if (/^\*\*ما هذا (?:الكود(?:\/الأمر)?|الملف)\?\*\*\s*$/.test(t)) {
          while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
          if (/^> /.test(ctx.lines[i])) {
            const bq = collectBlockquote(ctx.lines, i);
            return { block: { type: 'code-desc', content: bq.text }, nextIndex: bq.nextIndex };
          }
        }
        if (/^\*\*المكتبات المطلوبة/.test(t)) {
          while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
          let content = '';
          if (/^> /.test(ctx.lines[i])) {
            const bq = collectBlockquote(ctx.lines, i);
            content = bq.text;
            i = bq.nextIndex;
          }
          return { block: { type: 'imports', content }, nextIndex: i };
        }
        if (/^\*\*الناتج المتوقع/.test(t)) {
          while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
          let content = '';
          if (/^> /.test(ctx.lines[i])) {
            const bq = collectBlockquote(ctx.lines, i);
            content = bq.text;
            i = bq.nextIndex;
          }
          return { block: { type: 'expected-output', content }, nextIndex: i };
        }
        if (/^\*\*⚠️ ملاحظة هامة/.test(t)) {
          while (i < ctx.lines.length && !ctx.lines[i].trim()) i++;
          let content = '';
          if (/^> /.test(ctx.lines[i])) {
            const bq = collectBlockquote(ctx.lines, i);
            content = bq.text;
            i = bq.nextIndex;
          } else {
            content = t.replace(/^\*\*⚠️ ملاحظة هامة[^*]*\*\*:?\s*/, '').trim();
          }
          return { block: { type: 'callout', cls: 'callout-important', label: '⚠️ ملاحظة هامة', content }, nextIndex: i };
        }
        if (/^\*\*الفهم الخاطئ/.test(t)) {
          const wrong = t.replace(/^\*\*الفهم الخاطئ الشائع ❌:\*\*\s*/, '');
          let right = '';
          if (/^\*\*الفهم الصحيح/.test(ctx.peek())) {
            right = ctx.lines[ctx.i + 1].trim().replace(/^\*\*الفهم الصحيح ✅:\*\*\s*/, '');
            i = ctx.i + 2;
          } else {
            i = ctx.i + 1;
          }
          return { block: { type: 'compare', wrong, right }, nextIndex: i };
        }
        if (/^\*\*لماذا\?\*\*/.test(t)) {
          const blocks = [{ type: 'paragraph', text: t }];
          if (ctx.peek() && !isStructural(ctx.lines[ctx.i + 1])) {
            blocks.push({ type: 'paragraph', text: ctx.lines[ctx.i + 1].trim() });
            i = ctx.i + 2;
          }
          return { blocks, nextIndex: i };
        }
        return null;
      },
    },

    // ── Lists ──────────────────────────────────────────────────────────────
    {
      id: 'ol',
      priority: 50,
      test: (ctx) => /^[\d]+\. /.test(ctx.trimmed),
      parse: (ctx) => {
        const list = collectList(ctx.lines, ctx.i);
        return { block: { type: 'ol', items: list.items }, nextIndex: list.nextIndex };
      },
    },

    {
      id: 'ul',
      priority: 50,
      test: (ctx) => /^[-*] /.test(ctx.trimmed),
      parse: (ctx) => {
        const list = collectList(ctx.lines, ctx.i);
        return { block: { type: 'ul', items: list.items }, nextIndex: list.nextIndex };
      },
    },

    // ── HR ─────────────────────────────────────────────────────────────────
    {
      id: 'hr',
      priority: 40,
      test: (ctx) => /^---+$/.test(ctx.trimmed),
      parse: (ctx) => ({ block: { type: 'hr' }, nextIndex: ctx.i + 1 }),
    },

    // ── Paragraph (fallback) ───────────────────────────────────────────────
    {
      id: 'paragraph',
      priority: 1,
      test: (ctx) => !!ctx.trimmed && !isStructural(ctx.line),
      parse: (ctx) => {
        const para = collectParagraph(ctx.lines, ctx.i);
        return { block: { type: 'paragraph', text: para.text }, nextIndex: para.nextIndex };
      },
    },
  ];
}

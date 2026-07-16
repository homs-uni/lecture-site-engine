/**
 * Generate a flat search index from parsed lecture JSON.
 * Produces an array of entries — one per navigation-relevant text fragment.
 *
 * Each entry:
 *   id       — anchor ID for scroll‑to navigation
 *   lecId    — lecture identifier (par1, par2…)
 *   lecNum   — ordinal for sorting
 *   lecTitle — lecture title for display
 *   kind     — "lecture" | "part" | "section" | "content"
 *   context  — short breadcrumb (part → section)
 *   title    — heading / label for this entry
 *   text     — the searchable text body
 */

export function generateSearchIndex(lectures) {
  const entries = [];

  for (let li = 0; li < lectures.length; li++) {
    const lec = lectures[li];
    if (!lec || !lec.id) continue;

    // ── Lecture-level entry ──────────────────────────────────────────────
    entries.push({
      id: lec.id,
      lecId: lec.id,
      lecNum: li + 1,
      lecTitle: lec.title || '',
      kind: 'lecture',
      context: '',
      title: lec.title || '',
      text: `${lec.title || ''} ${lec.tag || ''}`,
    });

    // ── Intro blocks ─────────────────────────────────────────────────────
    if (lec.intro?.length) {
      for (const block of lec.intro) {
        const text = extractText(block);
        if (text) {
          entries.push({
            id: lec.id,
            lecId: lec.id,
            lecNum: li + 1,
            lecTitle: lec.title || '',
            kind: 'content',
            context: shortContext(lec.title || ''),
            title: '',
            text,
          });
        }
      }
    }

    // ── Parts ────────────────────────────────────────────────────────────
    if (!lec.parts?.length) continue;

    for (let pi = 0; pi < lec.parts.length; pi++) {
      const part = lec.parts[pi];
      if (!part) continue;

      const partId = `${lec.id}-p${pi + 1}`;
      const partContext = shortContext(lec.title || '', part.title || '');

      // Part-level entry
      entries.push({
        id: partId,
        lecId: lec.id,
        lecNum: li + 1,
        lecTitle: lec.title || '',
        kind: 'part',
        context: part.title || '',
        title: part.title || '',
        text: part.title || '',
      });

      // Subsections (sections / headings)
      const subsections = part.subsections || [];
      for (const sub of subsections) {
        const subId = `${partId}-${sub.id}`;
        entries.push({
          id: subId,
          lecId: lec.id,
          lecNum: li + 1,
          lecTitle: lec.title || '',
          kind: 'section',
          context: partContext,
          title: sub.text || '',
          text: sub.text || '',
        });
      }

      // Blocks inside the part
      if (part.blocks?.length) {
        for (const block of part.blocks) {
          const text = extractText(block);
          if (!text || text.length < 3) continue;

          // Find the nearest section heading for context
          const parentSection = findParentSection(block, part.blocks, subsections);
          const ctx = parentSection
            ? `${partContext} > ${parentSection}`
            : partContext;

          entries.push({
            id: partId,
            lecId: lec.id,
            lecNum: li + 1,
            lecTitle: lec.title || '',
            kind: 'content',
            context: ctx,
            title: blockTitle(block),
            text,
          });
        }
      }

      // Questions (MCQ, theory, exercise, debug, trace, design)
      if (part.questions?.length) {
        for (let qi = 0; qi < part.questions.length; qi++) {
          const q = part.questions[qi];
          if (!q) continue;

          const qId = `${partId}-q${qi + 1}`;

          if (part.type === 'mcq') {
            const qText = q.question || '';
            const optionsText = (q.options || []).map(o => o.text || '').join(' ');
            const explainText = q.explain || '';
            const combined = [qText, optionsText, explainText].filter(Boolean).join(' ');
            if (combined) {
              entries.push({
                id: qId,
                lecId: lec.id,
                lecNum: li + 1,
                lecTitle: lec.title || '',
                kind: 'content',
                context: partContext,
                title: qText,
                text: combined,
              });
            }
          } else if (part.type === 'theory') {
            const combined = [q.title || '', q.answer || ''].filter(Boolean).join(' ');
            if (combined) {
              entries.push({
                id: qId,
                lecId: lec.id,
                lecNum: li + 1,
                lecTitle: lec.title || '',
                kind: 'content',
                context: partContext,
                title: q.title || '',
                text: combined,
              });
            }
          } else {
            const title = q.title || '';
            const blocksText = (q.blocks || []).map(b => extractText(b)).filter(Boolean).join(' ');
            const combined = [title, blocksText].filter(Boolean).join(' ');
            if (combined) {
              entries.push({
                id: qId,
                lecId: lec.id,
                lecNum: li + 1,
                lecTitle: lec.title || '',
                kind: 'content',
                context: partContext,
                title,
                text: combined,
              });
            }
          }
        }
      }
    }
  }

  return { version: 1, entries };
}

function shortContext(...parts) {
  return parts.filter(Boolean).join(' › ');
}

function blockTitle(block) {
  if (!block) return '';
  if (block.type === 'h3' || block.type === 'h4') return block.text || '';
  if (block.type === 'callout') return block.label || '';
  if (block.type === 'code') return `💻 ${block.lang || ''}`.trim();
  return '';
}

function findParentSection(block, allBlocks, subsections) {
  const blockIndex = allBlocks.indexOf(block);
  if (blockIndex < 0) return null;

  // Walk backwards to find the nearest h3/h4 heading
  for (let i = blockIndex - 1; i >= 0; i--) {
    const prev = allBlocks[i];
    if (prev.type === 'h3' || prev.type === 'h4') {
      return prev.text || null;
    }
  }

  // Fallback: last subsection heading
  if (subsections?.length) {
    const last = subsections[subsections.length - 1];
    return last.text || null;
  }

  return null;
}

function extractText(block) {
  if (!block || typeof block !== 'object') return '';

  switch (block.type) {
    case 'paragraph':
      return block.text || '';
    case 'h3':
    case 'h4':
    case 'code-title':
      return block.text || '';
    case 'blockquote':
    case 'code-desc':
    case 'diagram-desc':
      return typeof block.content === 'string' ? block.content : '';
    case 'code':
      return block.code || '';
    case 'callout':
      return [block.label, block.content].filter(Boolean).join(' ');
    case 'analogy':
      return [block.title, block.content].filter(Boolean).join(' ');
    case 'compare':
      return [block.wrong, block.right].filter(Boolean).join(' ');
    case 'equation':
      return [block.title, block.latex, block.explanation].filter(Boolean).join(' ');
    case 'algorithm':
      return (block.steps || []).map(s => [s.step, s.tool, s.detail].filter(Boolean).join(' ')).join(' ');
    case 'algorithm-section':
      return [
        block.title || '',
        ...(block.sections || []).map(s => {
          if (s.type === 'content') return s.content || '';
          if (s.type === 'steps') return (s.items || []).join(' ');
          if (s.type === 'items') return (s.items || []).join(' ');
          return '';
        }),
      ].filter(Boolean).join(' ');
    case 'table':
      return [...(block.header || []), ...(block.rows || []).flat()].filter(Boolean).join(' ');
    case 'ul':
    case 'ol':
      return (block.items || []).filter(Boolean).join(' ');
    case 'qa-card':
      return [block.question, block.answer].filter(Boolean).join(' ');
    case 'line-explain':
      return (block.items || []).map(i => [i.code, i.explain].filter(Boolean).join(' ')).join(' ');
    case 'line-explain-table':
      return [
        block.title || '',
        ...(block.header || []),
        ...(block.rows || []).flat(),
      ].filter(Boolean).join(' ');
    case 'trade-off':
      return [
        block.title || '',
        ...(block.header || []),
        ...(block.rows || []).flat(),
        block.content || '',
      ].filter(Boolean).join(' ');
    case 'before-after':
      return [
        block.title || '',
        ...(block.phases || []).map(p => p.code || ''),
        block.changeNote || '',
      ].filter(Boolean).join(' ');
    case 'trace':
      return [
        block.title || '',
        block.input || '',
        ...(block.blocks || []).map(b => {
          if (b.type === 'paragraph') return b.text || '';
          if (b.type === 'table') return [...(b.header || []), ...(b.rows || []).flat()].join(' ');
          return '';
        }),
      ].filter(Boolean).join(' ');
    case 'imports':
      return block.content || '';
    case 'expected-output':
      return block.content || '';
    case 'think-prompt':
      return [block.title, block.content].filter(Boolean).join(' ');
    case 'troubleshoot-title':
      return block.text || '';
    case 'screen-title':
      return block.text || '';
    case 'diagram':
      return JSON.stringify(block.data || '');
    case 'diagram-title':
      return block.text || '';
    case 'hr':
      return '';
    default:
      return '';
  }
}

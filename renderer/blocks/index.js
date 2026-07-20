import { BlockRenderRegistry } from './registry.js';
import {
  createDefaultBlockHandlers,
  renderH4,
  renderCodeTitle,
  renderDiagramTitle,
  renderScreenTitle,
  isCodeSectionBlock,
  renderOriginalTextCollapsible,
} from './handlers.js';

/**
 * @param {Array<{ id: string, match: Function, render: Function }>} [extraHandlers]
 */
export function createBlockRegistry(extraHandlers = []) {
  const registry = new BlockRenderRegistry();
  for (const h of createDefaultBlockHandlers(extraHandlers)) {
    registry.register(h);
  }
  return registry;
}

/**
 * @param {Array<object>} blocks
 * @param {object} ctx — { partId, partType, codeCounterRef, registry }
 */
export function renderBlocks(blocks, ctx) {
  const registry = ctx.registry || createBlockRegistry();
  let html = '';
  let inCodeSection = false;
  const innerCard = !ctx.nested && ctx.partType !== 'mcq' && ctx.partType !== 'cheat';
  const codeCounterRef = ctx.codeCounterRef || { n: 0 };

  if (innerCard) html += '<div class="prose-content">';

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    if (b.type === 'code-title') {
      if (inCodeSection) html += '</div>';
      inCodeSection = true;
      html += renderCodeTitle(b, ctx, codeCounterRef);
      continue;
    }

    if (b.type === 'diagram-title') {
      if (inCodeSection) { html += '</div>'; inCodeSection = false; }
      html += renderDiagramTitle(b);
      continue;
    }

    if (b.type === 'screen-title') {
      if (inCodeSection) { html += '</div>'; inCodeSection = false; }
      html += renderScreenTitle(b);
      continue;
    }

    if (inCodeSection && !isCodeSectionBlock(b.type)) {
      html += '</div>';
      inCodeSection = false;
    }

    if (b.type === 'original-text-collapsible') {
      html += renderOriginalTextCollapsible(b, {
        ...ctx,
        codeCounterRef,
        renderBlocks: (innerBlocks, innerCtx) => renderBlocks(innerBlocks, innerCtx),
      });
      continue;
    }

    if (b.type === 'h4') {
      const result = renderH4(b, ctx, blocks, i);
      if (result && typeof result === 'object' && result.html) {
        html += result.html;
        i += result.skip || 0;
      } else {
        html += result;
      }
      continue;
    }

    const rendered = registry.render(b, ctx);
    if (rendered) html += rendered;
  }

  if (inCodeSection) html += '</div>';
  if (innerCard) html += '</div>';
  return html;
}

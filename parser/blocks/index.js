import { BlockRegistry } from './registry.js';
import { createDefaultBlockHandlers } from './handlers.js';
import { ParseContext } from '../core/context.js';
import { stripSchemaMetadataFromText } from '../core/utils.js';

/**
 * Build a block registry. Pass extra handlers to extend; they run before defaults
 * if given higher priority, or after if lower.
 *
 * @param {Array<{ id: string, priority?: number, test: Function, parse: Function }>} [extraHandlers]
 */
export function createBlockRegistry(extraHandlers = []) {
  const registry = new BlockRegistry();
  for (const h of extraHandlers) registry.register(h);
  for (const h of createDefaultBlockHandlers()) registry.register(h);
  return registry;
}

/**
 * Parse markdown body into an array of block objects.
 *
 * @param {string} text
 * @param {object} config
 * @param {BlockRegistry} [registry]
 */
export function parseBlocks(text, config = {}, registry = createBlockRegistry()) {
  const lines = text.split('\n');
  /** @type {Array<object>} */
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    if (!lines[i].trim()) { i++; continue; }

    const ctx = new ParseContext(lines, i, config);
    const result = registry.parse(ctx);

    if (!result) { i++; continue; }

    if (result.block) blocks.push(result.block);
    if (result.blocks) blocks.push(...result.blocks);
    i = result.nextIndex;
  }

  expandCollapsibleBlocks(blocks, config, registry);
  return stripMetadataParagraphs(blocks);
}

function stripMetadataParagraphs(blocks) {
  return blocks.flatMap(b => {
    if (b.type !== 'paragraph') return [b];
    const stripped = stripSchemaMetadataFromText(b.text);
    return stripped ? [{ ...b, text: stripped }] : [];
  });
}

function expandCollapsibleBlocks(blocks, config, registry) {
  for (const b of blocks) {
    if (b.type !== 'original-text-collapsible' || !b.innerText) continue;
    b.blocks = parseBlocks(b.innerText, config, registry);
    delete b.innerText;
  }
}

/**
 * Attach line-explain metadata to preceding code blocks (same as enrichCodeLineMaps).
 * @param {Array<object>} blocks
 */
export function enrichCodeLineMaps(blocks) {
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type !== 'code') continue;

    const next = blocks[i + 1];
    if (!next || (next.type !== 'line-explain' && next.type !== 'line-explain-table')) continue;

    /** @type {Array<{ code: string, role: string, why: string }>} */
    let items = [];
    if (next.type === 'line-explain-table') {
      items = (next.rows || []).map(row => ({
        code: (row[0] || '').replace(/^`|`$/g, ''),
        role: row[1] || '',
        why: row[2] || '',
      }));
    } else {
      items = (next.items || []).map(it => ({
        code: it.code || '',
        role: it.explain || it.role || '',
        why: it.why || '',
      }));
    }
    b.lineExplain = items;
  }
  return blocks;
}

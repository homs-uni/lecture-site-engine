import { initInlineMd, setRefContext, clearRefContext } from './core/inline-md.js';
import { PART_MAT_ICONS, ms } from './core/icons.js';
import { createBlockRegistry, renderBlocks } from './blocks/index.js';
import { createPartRegistry } from './parts/index.js';
import {
  renderMCQ,
  renderDebug,
  renderExercise,
  renderTheory,
  renderTrace,
  renderDesign,
} from './parts/handlers.js';
import {
  renderLecture,
  renderCodeGuide,
  renderReview,
  renderAiDisclaimer,
  renderDisclaimers,
  buildTocData,
  shortLectureTitle,
} from './lecture/index.js';
import { initInteractivity, pickMCQ, updateMCQProgress } from './interactivity/index.js';

const DEFAULT_CONFIG = {
  defaultTitle: 'Study Guide',
  sectionRefPattern: /§(\d+(?:\.\d+)*)/g,
  siteHashBody: '(?:lec\\d+(?:-p\\d+)?(?:-s\\d+)?|review-codes(?:-p\\d+)?|roadmap|home|guide)',
};

/**
 * Create a wired renderer instance for a subject site.
 *
 * @param {object} [options]
 * @param {object} [options.config] — guide-config overrides (defaultTitle, sectionRefPattern, siteHashBody…)
 * @param {Array} [options.blockRenderers] — extra block handlers (registered before defaults)
 * @param {Array} [options.partRenderers] — extra part handlers (registered before defaults)
 *
 * @example
 * import { GUIDE_CONFIG } from './guide-config.js';
 * const { renderLecture, initInteractivity } = createRenderer({ config: GUIDE_CONFIG });
 */
export function createRenderer(options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options.config };
  initInlineMd(config);

  const blockRegistry = createBlockRegistry(options.blockRenderers || []);
  const partRegistry = createPartRegistry(options.partRenderers || []);
  const deps = { config, blockRegistry, partRegistry };

  return {
    config,
    blockRegistry,
    partRegistry,
    renderBlocks: (blocks, partId, partType, codeCounterRef) =>
      renderBlocks(blocks, { partId, partType, codeCounterRef, registry: blockRegistry }),
    renderMCQ,
    renderDebug,
    renderExercise,
    renderTheory,
    renderTrace,
    renderDesign,
    renderLecture: (lecture, accent, icon, refs) => renderLecture(lecture, accent, icon, refs, deps),
    renderCodeGuide: (guide, badgeLabel) => renderCodeGuide(guide, deps, badgeLabel),
    renderReview: (review, icon) => renderReview(review, icon, deps),
    renderAiDisclaimer: () => renderAiDisclaimer(config),
    renderDisclaimers: () => renderDisclaimers(config),
    buildTocData,
    shortLectureTitle,
    setRefContext,
    clearRefContext,
    initInteractivity,
    pickMCQ,
    updateMCQProgress,
    PART_MAT_ICONS,
    ms,
  };
}

export { PART_MAT_ICONS, ms, setRefContext, clearRefContext };
export { createBlockRegistry, renderBlocks } from './blocks/index.js';
export { createPartRegistry } from './parts/index.js';
export { initInteractivity, pickMCQ, updateMCQProgress } from './interactivity/index.js';

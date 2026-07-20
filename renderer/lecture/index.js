import { esc } from '../core/escape.js';
import { ms, PART_MAT_ICONS } from '../core/icons.js';
import { isChecklistPart } from '../core/part-filters.js';
import { renderBlocks } from '../blocks/index.js';
import { renderPart } from '../parts/index.js';
import { mcqSectionAnchor } from '../core/slug.js';

export function renderAiDisclaimer(config) {
  const site = config.defaultTitle || 'Study Guide';
  return `<div class="ai-disclaimer mb-md" role="note" aria-label="تنبيه عن المحتوى">
    ${ms('smart_toy', false, 'ai-disclaimer__icon')}
    <p class="ai-disclaimer__text"><strong>تنبيه:</strong> الشروحات التفصيلية في هذا الدليل مُولَّدة بمساعدة الذكاء الاصطناعي (AI). دليل <strong>${esc(site)}</strong> غير مسؤول عن أي نقص أو خطأ قد يظهر فيها. <strong>في حال أي نقص، تواصل مع الهيئة عبر حساب الذي نشر هذا الموقع.</strong></p>
  </div>`;
}

export function renderDisclaimers(config) {
  return `<div class="disclaimers-stack mb-xl">${renderAiDisclaimer(config)}</div>`;
}

function partRenderCtx(partId, part, deps) {
  return {
    partId,
    partType: part.type,
    config: deps.config,
    blockRegistry: deps.blockRegistry,
    partRegistry: deps.partRegistry,
    codeCounterRef: { n: 0 },
  };
}

function renderPartSection(part, pi, lectureId, deps) {
  const partId = `${lectureId}-p${pi + 1}`;
  const pIcon = PART_MAT_ICONS[part.type] || 'article';
  const isCheat = part.type === 'cheat';
  const isMcq = part.type === 'mcq';
  const isReference = part.type === 'reference';

  let html = `<div class="section-block mb-xl scroll-mt-16 box-animate" id="${partId}" data-part-type="${part.type}">
    <div class="flex items-center gap-md mb-lg">
      <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        ${ms(pIcon, false, 'text-primary')}
      </div>
      <h3 class="font-headline-md text-headline-md text-on-surface">${esc(part.title)}</h3>
    </div>`;

  const cardCls = isMcq ? '' : `border border-outline-variant dark:border-[#3D2780] rounded-xl p-lg custom-shadow box-hover${isCheat || isReference ? ' bg-surface-container dark:bg-transparent' : ' bg-surface-container-lowest dark:bg-transparent'}${isReference ? ' reference-part' : ''}`;

  if (!isMcq) html += `<div class="${cardCls}">`;

  html += renderPart(part, partRenderCtx(partId, part, deps));

  if (!isMcq) html += '</div>';
  html += '</div>';
  return html;
}

export function renderReview(review, icon, deps) {
  let html = `<section class="lecture mb-xl" id="${review.id}">
    <section class="mb-xl text-center">
      <span class="inline-block px-md py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md mb-md">${icon || '📚'} مراجعة شاملة</span>
      <h2 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">${esc(review.title)}</h2>
      <p class="font-body-md text-on-surface-variant mb-md">${esc(review.tag)}</p>
    </section>
    <div class="lecture-body">`;

  review.parts.forEach((part, pi) => {
    if (isChecklistPart(part)) return;
    const partId = `${review.id}-p${pi + 1}`;
    const pIcon = PART_MAT_ICONS[part.type] || 'article';
    const isCheat = part.type === 'cheat';

    html += `<div class="section-block mb-xl scroll-mt-16 box-animate" id="${partId}" data-part-type="${part.type}">
      <div class="flex items-center gap-md mb-lg">
        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          ${ms(pIcon, false, 'text-primary')}
        </div>
        <h3 class="font-headline-md text-headline-md text-on-surface">${esc(part.title)}</h3>
      </div>
      <div class="border border-outline-variant dark:border-[#1e40af] rounded-xl p-lg custom-shadow box-hover bg-surface-container-lowest dark:bg-transparent">
        <div class="prose-content">${renderBlocks(part.blocks, { partId, partType: isCheat ? 'cheat' : part.type, registry: deps.blockRegistry })}</div>
      </div>
    </div>`;
  });

  return html + '</div></section>';
}

export function renderCodeGuide(guide, deps, badgeLabel = '💻 أكواد المحاضرة') {
  let html = `<section class="lecture mb-xl" id="${guide.id}">
    <section class="mb-xl text-center">
      <span class="inline-block px-md py-xs bg-tertiary-container text-on-tertiary-container rounded-full font-label-md text-label-md mb-md">${esc(badgeLabel)}</span>
      <h2 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">${esc(guide.title)}</h2>
      <p class="font-body-md text-on-surface-variant mb-md">${esc(guide.tag)}</p>`;

  if (guide.lectureRef) {
    html += `<a href="#${esc(guide.lectureRef)}" class="inline-flex items-center gap-sm px-md py-sm bg-secondary-container text-on-secondary-container rounded-full font-label-md hover:opacity-90 transition-opacity">
      ${ms('menu_book', false, 'text-sm')} اذهب للشرح التفصيلي
    </a>`;
  }

  html += `</section><div class="lecture-body">`;

  guide.parts.forEach((part, pi) => {
    const partId = `${guide.id}-p${pi + 1}`;
    const pIcon = PART_MAT_ICONS[part.type] || 'article';
    const isMcq = part.type === 'mcq';

    html += `<div class="section-block mb-xl scroll-mt-16 box-animate" id="${partId}" data-part-type="${part.type}">
      <div class="flex items-center gap-md mb-lg">
        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          ${ms(pIcon, false, 'text-primary')}
        </div>
        <h3 class="font-headline-md text-headline-md text-on-surface">${esc(part.title)}</h3>
      </div>`;

    const cardCls = 'border border-outline-variant dark:border-[#1e40af] rounded-xl p-lg custom-shadow box-hover bg-surface-container-lowest dark:bg-transparent';
    if (!isMcq) html += `<div class="${cardCls}">`;
    html += renderPart(part, partRenderCtx(partId, part, deps));
    if (!isMcq) html += '</div>';
    html += '</div>';
  });

  return html + '</div></section>';
}

export function renderLecture(lecture, accent, icon, refs, deps) {
  const linkRefs = refs && typeof refs === 'object' && !refs.id
    ? refs
    : { codeRef: refs };
  const { codeRef, companionRef, companionOf, badge } = linkRefs;

  // Find and extract the summary part
  const summaryPartIdx = lecture.parts.findIndex(p =>
    p.type === 'summary' && !/checklist|قائمة فحص|قائمة المراجعة/i.test(p.title || ''),
  );
  const summaryPart = summaryPartIdx >= 0 ? lecture.parts[summaryPartIdx] : null;

  let html = `<section class="lecture mb-xl" id="${lecture.id}">
    ${renderDisclaimers(deps.config)}
    <section class="mb-xl text-center">
      <div class="flex flex-wrap items-center justify-center gap-sm mb-md">
        <span class="inline-block px-md py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md">${esc(lecture.tag)}</span>
        ${badge ? `<span class="inline-block px-md py-xs bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full font-label-md text-label-md">${esc(badge)}</span>` : ''}
      </div>
      <h2 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">${esc(lecture.title)}</h2>`;

  if (companionRef?.id || companionOf?.id) {
    html += `<div class="flex flex-wrap justify-center gap-sm mb-md">`;
    if (companionOf?.id) {
      html += `<a href="#${esc(companionOf.id)}" class="inline-flex items-center gap-sm px-md py-sm bg-secondary-container text-on-secondary-container rounded-full font-label-md hover:opacity-90 transition-opacity">
        ${ms('arrow_forward', false, 'text-sm')} ${esc(companionOf.label)}
      </a>`;
    }
    if (companionRef?.id) {
      html += `<a href="#${esc(companionRef.id)}" class="inline-flex items-center gap-sm px-md py-sm bg-tertiary-container text-on-tertiary-container rounded-full font-label-md hover:opacity-90 transition-opacity">
        ${ms('library_books', false, 'text-sm')} ${esc(companionRef.label)}
      </a>`;
    }
    html += `</div>`;
  }

  // Add "بديل سريع" button if summary exists
  if (summaryPart) {
    const summaryId = `${lecture.id}-p${summaryPartIdx + 1}`;
    html += `<div class="flex justify-center mb-md">
      <a href="#${esc(summaryId)}" data-jump-summary class="inline-flex items-center gap-sm px-lg py-md bg-secondary text-on-secondary rounded-full font-label-md font-bold hover:opacity-90 transition-opacity">
        ${ms('speed', false, 'text-lg')} بديل سريع في حال ما كنت ملحق
      </a>
    </div>`;
  }

  html += `</section>`;

  if (lecture.intro?.length) {
    html += `<div class="lecture-intro mb-xl max-w-3xl mx-auto px-md">
      <div class="prose-content">${renderBlocks(lecture.intro, { partId: lecture.id, partType: 'intro', registry: deps.blockRegistry })}</div>
    </div>`;
  }

  html += `<div class="lecture-body">`;

  lecture.parts.forEach((part, pi) => {
    if (isChecklistPart(part)) return;
    // Skip summary part here; we'll render it at the end
    if (summaryPart && part === summaryPart) return;
    html += renderPartSection(part, pi, lecture.id, deps);
  });

  // Render summary part at the end if it exists
  if (summaryPart) {
    html += renderPartSection(summaryPart, summaryPartIdx, lecture.id, deps);
  }

  if (codeRef?.id || companionRef?.id || companionOf?.id) {
    html += `<div class="mt-2xl pt-xl border-t border-outline-variant text-center flex flex-wrap justify-center gap-md">`;
    if (codeRef?.id) {
      const label = codeRef.number ? `أكواد المحاضرة ${codeRef.number}` : 'أكواد المحاضرة';
      html += `<a href="#${esc(codeRef.id)}" class="inline-flex items-center gap-sm px-lg py-md bg-tertiary-container text-on-tertiary-container rounded-full font-label-md hover:opacity-90 transition-opacity">
        ${ms('code', false, 'text-lg')} ${esc(label)}
      </a>`;
    }
    if (companionOf?.id) {
      html += `<a href="#${esc(companionOf.id)}" class="inline-flex items-center gap-sm px-lg py-md bg-secondary-container text-on-secondary-container rounded-full font-label-md hover:opacity-90 transition-opacity">
        ${ms('arrow_forward', false, 'text-lg')} ${esc(companionOf.label)}
      </a>`;
    }
    if (companionRef?.id) {
      html += `<a href="#${esc(companionRef.id)}" class="inline-flex items-center gap-sm px-lg py-md bg-tertiary-container text-on-tertiary-container rounded-full font-label-md hover:opacity-90 transition-opacity">
        ${ms('library_books', false, 'text-lg')} ${esc(companionRef.label)}
      </a>`;
    }
    html += `</div>`;
  }

  return html + '</div></section>';
}

function buildPartSubsections(part) {
  if (part.blocks?.length) {
    const qaCards = part.blocks.filter(b => b.type === 'qa-card');
    if (qaCards.length) {
      return qaCards.map(q => ({
        level: 3,
        text: `Q${q.num}`,
        id: `qa-${q.num}`,
      }));
    }
  }
  if (part.questions?.length) {
    if (part.type === 'mcq') {
      // Past-exam banks group questions under "## المحاضرة N: …" dividers
      // (parser attaches `section` on each question). Prefer those as TOC
      // entries so the sidebar navigates by lecture, not by question number.
      const seen = new Set();
      const byLecture = [];
      for (const q of part.questions) {
        if (!q.section || seen.has(q.section)) continue;
        seen.add(q.section);
        byLecture.push({
          level: 3,
          text: q.section,
          id: mcqSectionAnchor(q.section),
        });
      }
      if (byLecture.length) return byLecture;

      return part.questions.map(q => ({
        level: 3,
        text: `س${q.num} (${q.difficulty})`,
        id: `q${q.num}`,
      }));
    }
    if (part.type === 'theory') {
      return part.questions.map((q, qi) => ({
        level: 3,
        text: q.title.replace(/^سؤال \d+:\s*/, ''),
        id: q.id || `theory-${qi + 1}`,
      }));
    }
    if (part.type === 'exercise' || part.type === 'trace') {
      return part.questions.map((q, qi) => ({
        level: 3,
        text: q.title.replace(/^تمرين[^\:]*:\s*/, '').slice(0, 55),
        id: q.id || `${part.type}-${qi + 1}`,
      }));
    }
    if (part.type === 'design') {
      return part.questions.map((q, qi) => ({
        level: 3,
        text: q.title.replace(/^سؤال تصميم[^\:]*:\s*/, '').slice(0, 55),
        id: q.id || `design-${qi + 1}`,
      }));
    }
  }
  return part.subsections || [];
}

export function buildTocData(lectures) {
  return lectures.map(lec => ({
    id: lec.id,
    title: lec.title,
    tag: lec.tag,
    parts: lec.parts
      .map((p, i) => ({ part: p, index: i }))
      .filter(({ part }) => !isChecklistPart(part))
      .map(({ part, index }) => ({
      id: `${lec.id}-p${index + 1}`,
      title: part.title,
      type: part.type,
      icon: PART_MAT_ICONS[part.type] || 'article',
      subsections: buildPartSubsections(part),
    })),
  }));
}

export function shortLectureTitle(title) {
  return title
    .replace(/^المختبر\s+\d+\s*—\s*/u, '')
    .replace(/^المحاضرة\s+\d+\s*—\s*/u, '')
    .replace(/^محاضرة عملية\s*—\s*/u, '')
    .replace(/^أكواد المحاضرة\s+\d+\s*—\s*/u, '')
    .replace(/^تجميعة الأكواد والأسئلة\s*—\s*/u, '')
    .trim() || title;
}

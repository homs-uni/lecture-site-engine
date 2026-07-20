import { createRenderer } from '../engine/renderer/index.js';
import { initDiagrams, refreshDiagrams } from '../engine/renderer/diagram/diagram.js';
import { initEquations } from './equations.js';
import { initMermaid, refreshMermaid } from './mermaid-render.js';
import { applySiteSettings } from '../themes/apply-theme.js';
import { GUIDE_CONFIG } from './guide-config.js';
import {
  anchorIdFromHash,
  getLectureIndexFromHash,
  resolveLectureHash,
  hashPointsToSection,
} from './lecture-routing.js';
import {
  initAnalytics,
  trackHomeView,
  trackLectureView,
  trackDawratView,
  trackNoteView,
  trackLectureContentReady,
  updateAnalyticsContext,
} from './analytics.js';
import { initLaserPointer } from './laser-pointer.js';
import { createProgressTracker, lectureIdFromPath, resolveSubjectKeyFromPath } from './progress_tracker.js';
import { createQuizStats } from './quiz-stats.js';
import { createExamMode } from './exam.js';
import { search, snippet } from './search.js';

/** Set true when lecture notes localStorage behaviour is ready. */
const LECTURE_NOTES_ENABLED = false;

const STORAGE_THEME = `${GUIDE_CONFIG.storagePrefix || 'study-guide'}-theme`;
const STORAGE_LAST_LECTURE = `${GUIDE_CONFIG.storagePrefix || 'study-guide'}-last-lecture`;
const STORAGE_LECTURE_WIDTH = `${GUIDE_CONFIG.storagePrefix || 'study-guide'}-lecture-width`;
const STORAGE_NOTES_PREFIX = `${GUIDE_CONFIG.storagePrefix || 'study-guide'}-notes`;
const LECTURE_WIDTH_OPTIONS = [
  { value: '50', label: '50%', body: '50%' },
  { value: '70', label: '70%', body: '70%' },
  { value: '100', label: '100%', body: '100%' },
  { value: '120', label: '120%', body: '100%', padInline: 'var(--lecture-pad-md)', mainMax: 'min(100%, 75rem)' },
  { value: '150', label: '150%', body: '100%', padInline: 'var(--lecture-pad-sm)', mainMax: 'none' },
  { value: 'fill', label: 'ملء', expand: true },
];
const DEFAULT_LECTURE_WIDTH = '120';
const LECTURE_WIDTH_REV = 'default-120';
const LECTURE_WIDTH_REV_KEY = `${STORAGE_LECTURE_WIDTH}-rev`;
const LEGACY_DEFAULT_WIDTHS = new Set(['30', '50', '70', '100']);

const {
  renderLecture,
  renderReview,
  renderMCQ,
  renderCodeGuide,
  buildTocData,
  initInteractivity,
  setRefContext,
  clearRefContext,
  ms,
  shortLectureTitle,
} = createRenderer({ config: GUIDE_CONFIG });

/** Matches sticky header height (`top-16` / 4rem) — keep in sync with styles.css */
const SCROLL_OFFSET_PX = 64;

let appState = {
  manifest: null,
  items: [],
  reviewManifest: null,
  reviewItems: [],
  examManifest: null,
  examItems: [],
  notesManifest: null,
  notesItems: [],
  progressTracker: null,
  quizStats: null,
  examMode: null,
  subjectKey: '',
  progressUnsubscribe: null,
  activeSection: '',
};
let siteTitle = "";
let currentLectureIndex = -1;
let currentReviewIndex = -1;
let currentExamIndex = -1;
let currentNoteIndex = -1;
let routeLock = false;
let scrollAnimObserver = null;
let sidebarObserver = null;
/** Element marking where the sidebar progress rail should read 100% — start of the "ملخص" part, if any. */
let progressEndEl = null;
let htmlCacheBuildId = null;
/** @type {Map<string, string>} */
const lectureHtmlCache = new Map();
/** @type {Map<string, Promise<unknown>>} */
const lectureJsonInflight = new Map();

function readBuildId() {
  return appState.manifest?.settings?.buildId
    || document.querySelector('meta[name="site-build-id"]')?.getAttribute('content')
    || '';
}

function resetHtmlCacheIfStale(buildId) {
  if (!buildId) return;
  if (htmlCacheBuildId && htmlCacheBuildId !== buildId) lectureHtmlCache.clear();
  htmlCacheBuildId = buildId;
}

function htmlCacheKey(item) {
  const buildId = readBuildId();
  const parsedAt = item.parsedAt || item.fileMeta?.parsedAt || 'unknown';
  return `${buildId}:${item.lec.id}:${parsedAt}`;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Converts markdown `code` spans in a TOC subsection label into a subtly styled <code>, and strips any stray unmatched backticks so raw ` never leaks into the sidebar. */
function formatSubsectionLabel(rawText) {
  return esc(rawText)
    .replace(/`([^`]+)`/g, '<code class="toc-inline-code">$1</code>')
    .replace(/`/g, '');
}

function escAttr(s) {
  return esc(s).replace(/"/g, '&quot;');
}

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
function arabicDigits(s) {
  return String(s).replace(/[0-9]/g, d => ARABIC_DIGITS[Number(d)]);
}

async function loadReviewManifest() {
  const res = await fetch(versionedUrl('reviews/manifest.json'), { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function loadReviewJson(path) {
  const res = await fetch(versionedUrl(`reviews/${path}`), { cache: 'no-store' });
  if (!res.ok) throw new Error(`تعذّر تحميل ${path}`);
  return res.json();
}

function reviewFromJson(data, fileId) {
  const review = data.review || data.lectures?.[0] || data;
  if (fileId && review && !review.id) review.id = fileId;
  return review;
}

function getReviewIndexFromHash(hash) {
  if (!hash || hash === 'home') return -1;
  let idx = appState.reviewItems.findIndex(it => it.review.id === hash);
  if (idx >= 0) return idx;
  return appState.reviewItems.findIndex(it => hash.startsWith(`${it.review.id}-`));
}

async function loadExamManifest() {
  const res = await fetch(versionedUrl('DAWRAT/manifest.json'), { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function loadExamJson(path) {
  const res = await fetch(versionedUrl(`DAWRAT/${path}`), { cache: 'no-store' });
  if (!res.ok) throw new Error(`تعذّر تحميل ${path}`);
  return res.json();
}

function examFromJson(data, fileId) {
  const exam = data.exam || data;
  if (fileId && exam && !exam.id) exam.id = fileId;
  return exam;
}

function getExamIndexFromHash(hash) {
  if (!hash || hash === 'home') return -1;
  let idx = appState.examItems.findIndex(it => it.exam.id === hash);
  if (idx >= 0) return idx;
  return appState.examItems.findIndex(it => hash.startsWith(`${it.exam.id}-`));
}

function reviewStats(review) {
  const codeBlocks = review.parts?.reduce((n, p) => {
    return n + (p.blocks?.filter(b => b.type === 'code').length || 0);
  }, 0) || 0;
  return { sections: review.parts?.length || 0, codeBlocks };
}

function renderUpdatedPdfBanner() {
  const section = document.getElementById('updatedPdfBanner');
  if (!section) return;

  const url = appState.manifest?.settings?.updatedPdfUrl;
  if (!url) {
    section.classList.add('hidden');
    section.innerHTML = '';
    return;
  }

  const note = appState.manifest?.settings?.updatedPdfNote
    || 'تم تحديث محتوى المحاضرات — يمكنك تحميل نسخة PDF الشاملة (القديمة في حال كنت تدرس منها) من هنا.';

  section.classList.remove('hidden');
  section.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center gap-md bg-secondary-container/40 border border-primary/30 rounded-2xl p-lg">
      <span class="material-symbols-outlined text-primary shrink-0" aria-hidden="true">picture_as_pdf</span>
      <p class="flex-1 font-body-md text-body-md text-on-surface">${esc(note)}</p>
      <a href="${escAttr(url)}" target="_blank" rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-sm px-lg py-sm bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all shrink-0">
        ${ms('download', false, 'text-lg')} تحميل PDF
      </a>
    </div>`;
}

function renderReviewFeatured() {
  const section = document.getElementById('reviewFeatured');
  if (!section) return;

  if (!appState.reviewItems.length) {
    section.classList.add('hidden');
    section.innerHTML = '';
    return;
  }

  section.classList.remove('hidden');
  const item = appState.reviewItems[0];
  const stats = reviewStats(item.review);

  section.innerHTML = `
    <button type="button" id="reviewFeaturedBtn"
      class="lecture-picker-card group text-right w-full bg-gradient-to-l from-secondary-container/40 to-primary-container/30 border-2 border-primary/30 rounded-2xl p-xl custom-shadow box-hover"
      aria-label="فتح ${escAttr(item.review.title)}">
      <div class="flex flex-col md:flex-row md:items-center gap-lg">
        <div class="picker-icon-wrap w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-on-primary shrink-0 mx-auto md:mx-0">
          ${ms(item.matIcon, true, 'text-4xl')}
        </div>
        <div class="flex-1 text-center md:text-right">
          <span class="inline-block px-md py-xs bg-primary text-on-primary rounded-full font-label-md text-label-md mb-sm">📚 مراجعة شاملة</span>
          <h2 class="font-headline-lg text-headline-lg text-primary dark:text-inverse-primary mb-sm">${esc(item.review.title)}</h2>
          <p class="font-body-md text-on-surface-variant mb-md">${esc(item.review.tag || appState.reviewManifest?.subtitle || '')}</p>
          <div class="flex flex-wrap justify-center md:justify-start gap-sm mb-md">
            <span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">
              ${ms('layers', false, 'text-sm text-primary')} ${stats.sections} قسم
            </span>
            <span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">
              ${ms('terminal', false, 'text-sm text-secondary')} ${stats.codeBlocks} أكواد
            </span>
            <span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">
              ${ms('trending_up', false, 'text-sm text-tertiary')} من الأسهل للأصعب
            </span>
          </div>
          <span class="inline-flex items-center gap-sm text-primary font-label-md font-bold group-hover:gap-md transition-all">
            ابدأ المراجعة ${ms('arrow_back', false, 'text-lg')}
          </span>
        </div>
      </div>
    </button>`;

  document.getElementById('reviewFeaturedBtn')?.addEventListener('click', () => {
    const id = appState.reviewItems[0]?.review.id;
    if (id) location.hash = id;
  });
}

function examStats(exam) {
  const mcqPart = exam.parts?.find(p => p.type === 'mcq');
  const count = mcqPart?.questions?.reduce((n, q) => n + (q.type === 'group' ? q.questions.length : 1), 0) || 0;
  return { count };
}

/** Unlike renderReviewFeatured (always just item[0]), a subject can have
 * more than one دورات file — render one card per item, in a grid that reads
 * fine whether there's one card or several. */
function renderExamArchiveSection() {
  const section = document.getElementById('examArchive');
  if (!section) return;

  if (!appState.examItems.length) {
    section.classList.add('hidden');
    section.innerHTML = '';
    return;
  }

  section.classList.remove('hidden');
  const cardsHtml = appState.examItems.map((item, i) => {
    const stats = examStats(item.exam);
    return `<button type="button" class="lecture-picker-card group text-right w-full bg-gradient-to-l from-tertiary-container/40 to-secondary-container/30 border-2 border-tertiary/30 rounded-2xl p-lg custom-shadow box-hover" data-exam-index="${i}" aria-label="فتح ${escAttr(item.exam.title)}">
      <div class="flex items-center gap-md">
        <div class="picker-icon-wrap w-14 h-14 rounded-xl bg-tertiary flex items-center justify-center text-on-tertiary shrink-0">
          ${ms(item.matIcon, true, 'text-2xl')}
        </div>
        <div class="flex-1 text-right">
          <h3 class="font-headline-sm text-headline-sm text-on-surface mb-xs">${esc(item.exam.title)}</h3>
          <span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">
            ${ms('quiz', false, 'text-sm text-tertiary')} ${stats.count} سؤال
          </span>
        </div>
        ${ms('arrow_back', false, 'text-on-surface-variant shrink-0')}
      </div>
    </button>`;
  }).join('');

  section.innerHTML = `
    <div class="flex items-center gap-md mb-lg">
      ${ms('history_edu', false, 'text-tertiary')}
      <h2 class="font-headline-md text-headline-md text-on-surface">دورات سنوات سابقة</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">${cardsHtml}</div>`;

  section.querySelectorAll('[data-exam-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.examIndex);
      const id = appState.examItems[idx]?.exam.id;
      if (id) location.hash = id;
    });
  });
}

function setJumpQuizVisible(show) {
  document.getElementById('jumpQuizBtn')?.closest('.p-lg')?.classList.toggle('hidden', !show);
  document.getElementById('mobileJumpQuizBtn')?.closest('.mobile-toc-drawer__foot')?.classList.toggle('hidden', !show);
  document.getElementById('mobileStudyQuizBtn')?.classList.toggle('hidden', !show);
}

function mountReviewHtml(item, html) {
  document.getElementById('content').innerHTML = html;
  showView('lecture');
  initInteractivity(document.getElementById('content'));
  initDiagrams(document.getElementById('content'));
  initEquations(document.getElementById('content'));
  initMermaid(document.getElementById('content'));
  if (window.hljs) document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  buildSidebar(item.toc);
  updateSidebarProgressTarget();
  updateSidebarProgressFill();
  initScrollAnimations(document.getElementById('content'));
  revealLectureDetailSections(document.getElementById('content'));
  requestAnimationFrame(() => {
    revealLectureDetailSections(document.getElementById('content'));
    refreshLectureVisibility(document.getElementById('content'));
  });
}

function loadReviewView(index, anchorHash) {
  const item = appState.reviewItems[index];
  if (!item) return;

  currentLectureIndex = -1;
  showView('lecture');
  setJumpQuizVisible(false);

  const needsRender = currentReviewIndex !== index || !document.getElementById(item.review.id);

  if (needsRender) {
    currentReviewIndex = index;
    mountReviewHtml(item, renderReview(item.review, item.icon));

    document.getElementById('sidebarCourseTitle').textContent = shortLectureTitle(item.review.title);
    document.getElementById('sidebarCourseSub').textContent = item.review.tag || '';
    document.getElementById('sidebarMatIcon').textContent = item.matIcon || 'menu_book';
    document.getElementById('mobileTocCourseTitle').textContent = shortLectureTitle(item.review.title);
    document.getElementById('mobileTocCourseSub').textContent = item.review.tag || '';
    document.getElementById('mobileTocMatIcon').textContent = item.matIcon || 'menu_book';
  } else {
    buildSidebar(item.toc);
    updateSidebarProgressTarget();
    updateSidebarProgressFill();
    showView('lecture');
  }

  const hash = anchorHash && anchorHash !== item.review.id ? anchorHash : item.review.id;
  routeLock = true;
  if (location.hash !== `#${hash}`) location.hash = hash;
  routeLock = false;

  if (anchorHash && anchorHash !== item.review.id) scrollToAnchor(anchorHash);
  else if (needsRender) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadExamView(index, anchorHash) {
  const item = appState.examItems[index];
  if (!item) return;

  currentLectureIndex = -1;
  showView('lecture');
  setJumpQuizVisible(false);

  const needsRender = currentExamIndex !== index || !document.getElementById(item.exam.id);

  if (needsRender) {
    currentExamIndex = index;
    mountReviewHtml(item, renderCodeGuide(item.exam, '📝 دورات سنوات سابقة'));

    document.getElementById('sidebarCourseTitle').textContent = shortLectureTitle(item.exam.title);
    document.getElementById('sidebarCourseSub').textContent = item.exam.tag || '';
    document.getElementById('sidebarMatIcon').textContent = item.matIcon || 'history_edu';
    document.getElementById('mobileTocCourseTitle').textContent = shortLectureTitle(item.exam.title);
    document.getElementById('mobileTocCourseSub').textContent = item.exam.tag || '';
    document.getElementById('mobileTocMatIcon').textContent = item.matIcon || 'history_edu';
  } else {
    buildSidebar(item.toc);
    showView('lecture');
  }

  const hash = anchorHash && anchorHash !== item.exam.id ? anchorHash : item.exam.id;
  routeLock = true;
  if (location.hash !== `#${hash}`) location.hash = hash;
  routeLock = false;

  if (anchorHash && anchorHash !== item.exam.id) scrollToAnchor(anchorHash);
  else if (needsRender) window.scrollTo({ top: 0, behavior: 'smooth' });

  trackDawratView(item);
  trackLectureContentReady();
}

async function loadNotesManifest() {
  const res = await fetch(versionedUrl('notes/lectures/manifest.json'), { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function loadNoteJson(path) {
  const res = await fetch(versionedUrl(`notes/lectures/${path}`), { cache: 'no-store' });
  if (!res.ok) throw new Error(`تعذّر تحميل ${path}`);
  return res.json();
}

/** Notes files hold a full 100-question MCQ bank each — keep the home page
 * light by only fetching a note's full JSON when the student actually opens
 * it, same lazy pattern as ensureLectureLoaded for the main lecture list. */
function createNoteStub(file, i) {
  const summary = file.summary || {};
  const stubId = summary.id || `note-par${file.num || i + 1}`;
  return {
    lec: { id: stubId, title: summary.title || file.badge || `ملخص ${file.num || i + 1}`, tag: summary.tag || '', parts: [] },
    fileMeta: file,
    icon: file.icon || '📖',
    matIcon: file.matIcon || 'menu_book',
    sectionIndex: {},
    toc: null,
    summary: file.summary || null,
    loaded: false,
    loading: null,
  };
}

async function ensureNoteLoaded(idx) {
  const item = appState.notesItems[idx];
  if (!item) throw new Error('الملخص غير موجود');
  if (item.loaded) return item;
  if (item.loading) return item.loading;

  item.loading = (async () => {
    const doc = await loadNoteJson(item.fileMeta.path);
    const lec = doc.lectures?.[0];
    if (!lec) throw new Error(`لا محتوى في ${item.fileMeta.path}`);
    item.lec = lec;
    item.sectionIndex = doc.sectionIndex || {};
    item.toc = buildTocData([lec])[0];
    item.loaded = true;
    item.loading = null;
    return item;
  })();

  try {
    return await item.loading;
  } catch (err) {
    item.loading = null;
    throw err;
  }
}

function getNoteIndexFromHash(hash) {
  if (!hash || hash === 'home') return -1;
  let idx = appState.notesItems.findIndex(it => it.lec.id === hash);
  if (idx >= 0) return idx;
  return appState.notesItems.findIndex(it => hash.startsWith(`${it.lec.id}-`));
}

async function loadNoteView(index, anchorHash) {
  const stub = appState.notesItems[index];
  if (!stub) return;

  currentLectureIndex = -1;
  currentReviewIndex = -1;
  currentExamIndex = -1;
  showLectureLoading();

  let item;
  try {
    item = await ensureNoteLoaded(index);
  } catch (err) {
    document.getElementById('content').innerHTML = `
      <div class="py-2xl text-center text-error">
        <p class="mb-md">⚠️ ${esc(err.message)}</p>
        <button type="button" class="text-primary font-bold" onclick="location.hash='home'">العودة</button>
      </div>`;
    return;
  }

  const needsRender = currentNoteIndex !== index || !document.getElementById(item.lec.id);

  if (needsRender) {
    currentNoteIndex = index;
    setRefContext({ lectureRef: item.lec.id, sectionMap: item.sectionIndex || {} });
    const html = renderLecture(item.lec, 'primary', item.icon, item.sectionIndex);
    clearRefContext();
    mountReviewHtml(item, html);

    document.getElementById('sidebarCourseTitle').textContent = shortLectureTitle(item.lec.title);
    document.getElementById('sidebarCourseSub').textContent = item.lec.tag || '';
    document.getElementById('sidebarMatIcon').textContent = item.matIcon || 'menu_book';
    document.getElementById('mobileTocCourseTitle').textContent = shortLectureTitle(item.lec.title);
    document.getElementById('mobileTocCourseSub').textContent = item.lec.tag || '';
    document.getElementById('mobileTocMatIcon').textContent = item.matIcon || 'menu_book';
    setJumpQuizVisible(!!item.lec.parts?.find(p => p.type === 'mcq'));
  } else {
    buildSidebar(item.toc);
    showView('lecture');
  }

  const hash = anchorHash && anchorHash !== item.lec.id ? anchorHash : item.lec.id;
  routeLock = true;
  if (location.hash !== `#${hash}`) location.hash = hash;
  routeLock = false;

  if (anchorHash && anchorHash !== item.lec.id) scrollToAnchor(anchorHash);
  else if (needsRender) window.scrollTo({ top: 0, behavior: 'smooth' });

  trackNoteView(item);
  trackLectureContentReady();
}

/** Theme-accent class cycled per card — matches the subject's own primary/
 * secondary/tertiary colors instead of arbitrary hues, so it stays on-brand
 * while still reading as a distinct rail from the plain lecture grid. */
const NOTE_ACCENTS = [
  { bar: 'var(--md-sys-color-primary)', chip: 'bg-primary/15 text-primary', num: 'text-primary' },
  { bar: 'var(--md-sys-color-secondary)', chip: 'bg-secondary-container/30 text-secondary', num: 'text-secondary' },
  { bar: 'var(--md-sys-color-tertiary)', chip: 'bg-tertiary-fixed/60 text-on-tertiary-fixed-variant', num: '' },
];

function renderNotesSection() {
  const section = document.getElementById('notesSection');
  if (!section) return;

  if (!appState.notesItems.length) {
    section.classList.add('hidden');
    section.innerHTML = '';
    return;
  }

  section.classList.remove('hidden');

  const cardsHtml = appState.notesItems.map((item, i) => {
    const accent = NOTE_ACCENTS[i % NOTE_ACCENTS.length];
    const mcqCount = item.summary?.mcqCount || 0;
    const num = arabicDigits(String(item.fileMeta?.num ?? i + 1));
    return `<button type="button" class="group text-right w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-md custom-shadow box-hover flex items-center gap-md" style="border-inline-start:4px solid ${accent.bar};" data-note-index="${i}" aria-label="فتح ${escAttr(item.lec.title)}">
      <span class="font-display-sm ${accent.num} shrink-0" style="font-size:28px; font-weight:600; opacity:.55; min-width:34px;">${num}</span>
      <div class="flex-1 min-w-0">
        <p class="font-label-md font-bold text-on-surface truncate">${esc(item.lec.title)}</p>
        <div class="flex items-center gap-sm mt-xs flex-wrap">
          <span class="font-label-md text-label-md px-sm py-xs rounded-full ${accent.chip}">${ms('menu_book', false, 'text-sm')} ملخص</span>
          ${mcqCount ? `<span class="font-label-md text-label-md px-sm py-xs rounded-full bg-surface-container-high text-on-surface-variant">${ms('quiz', false, 'text-sm')} ${arabicDigits(String(mcqCount))} سؤال</span>` : ''}
        </div>
      </div>
      ${ms('chevron_left', false, 'text-on-surface-variant shrink-0')}
    </button>`;
  }).join('');

  section.innerHTML = `
    <div class="text-center mb-lg">
      ${ms('auto_stories', false, 'text-primary text-3xl mb-sm')}
      <h2 class="font-headline-md text-headline-md text-on-surface">ملخصات وأسئلة سريعة</h2>
      <p class="font-label-md text-on-surface-variant mt-xs">مراجعة مكثفة لكل محاضرة مع بنك أسئلة كبير</p>
    </div>
    <div class="grid grid-cols-1 gap-md">${cardsHtml}</div>`;

  section.querySelectorAll('[data-note-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.noteIndex);
      const id = appState.notesItems[idx]?.lec.id;
      if (id) location.hash = id;
    });
  });
}

async function loadNotes() {
  const notesManifest = await loadNotesManifest();
  if (!notesManifest?.files?.length) return;
  appState.notesManifest = notesManifest;
  appState.notesItems = notesManifest.files.map((f, i) => createNoteStub(f, i));
}

async function loadReviews() {
  const reviewManifest = await loadReviewManifest();
  if (!reviewManifest?.files?.length) return;

  appState.reviewManifest = reviewManifest;
  for (const file of reviewManifest.files) {
    const path = typeof file === 'string' ? file : file.path;
    if (!path) continue;
    const data = await loadReviewJson(path);
    const review = reviewFromJson(data, file.id);
    if (!review?.parts?.length) continue;
    appState.reviewItems.push({
      review,
      icon: file.icon || '📚',
      matIcon: file.matIcon || 'menu_book',
      toc: buildTocData([review])[0],
    });
  }
}

async function loadExams() {
  const examManifest = await loadExamManifest();
  if (!examManifest?.files?.length) return;

  appState.examManifest = examManifest;
  for (const file of examManifest.files) {
    const path = typeof file === 'string' ? file : file.path;
    if (!path) continue;
    const data = await loadExamJson(path);
    const exam = examFromJson(data, file.id);
    if (!exam?.parts?.length) continue;
    appState.examItems.push({
      exam,
      icon: file.icon || '📝',
      matIcon: file.matIcon || 'history_edu',
      toc: buildTocData([exam])[0],
    });
  }
}

function lectureStats(lec) {
  const mcqPart = lec.parts?.find(p => p.type === 'mcq');
  const mcqCount = mcqPart?.questions?.length || 0;
  return {
    parts: lec.parts?.length || 0,
    mcq: mcqCount,
    sections: lec.parts?.find(p => p.type === 'detail')?.subsections?.length || 0,
  };
}

function itemStats(item) {
  if (item.loaded && item.lec?.parts?.length) return lectureStats(item.lec);
  const s = item.summary || item.fileMeta?.summary;
  if (s) {
    return {
      parts: s.partsCount || 0,
      mcq: s.mcqCount || 0,
      sections: s.sectionCount || 0,
    };
  }
  return lectureStats(item.lec);
}

function lectureStableId(item, idx) {
  const fromFile = lectureIdFromPath(item?.fileMeta?.path);
  if (fromFile) return fromFile;
  if (item?.lec?.id) return item.lec.id;
  return `lec${idx + 1}`;
}

function subjectLectureIds() {
  return appState.items.map((item, idx) => lectureStableId(item, idx));
}

function renderSubjectProgressTracker() {
  const host = document.getElementById('subjectProgressTracker');
  if (!host || !appState.progressTracker) return;

  const progress = appState.progressTracker.getSubjectProgress(subjectLectureIds());
  const done = progress.completed;
  const total = progress.total;
  const percent = progress.percent;

  host.classList.remove('hidden');
  host.innerHTML = `
    <div class="subject-progress-card">
      <div class="subject-progress-card__head">
        <div>
          <p class="subject-progress-card__label">تقدم المادة</p>
          <h3 class="subject-progress-card__title">${esc(String(done))} / ${esc(String(total))} محاضرة مكتملة</h3>
        </div>
        <span class="subject-progress-card__percent">${esc(String(percent))}%</span>
      </div>
      <div class="subject-progress-card__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${esc(String(percent))}" aria-label="تقدم المادة">
        <span class="subject-progress-card__fill" style="width:${esc(String(percent))}%"></span>
      </div>
    </div>`;
}

function setLectureCompletedByIndex(idx, completed) {
  const item = appState.items[idx];
  if (!item || !appState.progressTracker) return;
  const lectureId = lectureStableId(item, idx);
  appState.progressTracker.setLectureCompleted(lectureId, completed);
  renderSubjectProgressTracker();
  renderHomeGrid();
  syncLectureCompletionButtons(currentLectureIndex);
}

function toggleLectureCompletedByIndex(idx) {
  const item = appState.items[idx];
  if (!item || !appState.progressTracker) return;
  const lectureId = lectureStableId(item, idx);
  appState.progressTracker.toggleLectureCompleted(lectureId);
  renderSubjectProgressTracker();
  renderHomeGrid();
  syncLectureCompletionButtons(currentLectureIndex);
}

function syncLectureCompletionButtons(idx) {
  const item = appState.items[idx];
  const sidebarBtn = document.getElementById('sidebarCompleteBtn');
  const mobileBtn = document.getElementById('mobileCompleteBtn');

  if (!item || !appState.progressTracker) {
    [sidebarBtn, mobileBtn].forEach((btn) => {
      if (!btn) return;
      btn.dataset.lectureIndex = '';
      btn.setAttribute('aria-pressed', 'false');
      btn.classList.add('hidden');
    });
    return;
  }

  const lectureId = lectureStableId(item, idx);
  const isDone = appState.progressTracker.isLectureCompleted(lectureId);
  const label = isDone ? 'مكتملة' : 'وضع كمكتملة';

  [sidebarBtn, mobileBtn].forEach((btn) => {
    if (!btn) return;
    btn.classList.remove('hidden');
    btn.dataset.lectureIndex = String(idx);
    btn.dataset.completed = isDone ? '1' : '0';
    btn.setAttribute('aria-pressed', isDone ? 'true' : 'false');
    btn.classList.toggle('is-complete', isDone);
    const text = btn.querySelector('[data-complete-label]');
    if (text) text.textContent = label;
  });
}

function initLectureCompletionButtons() {
  ['sidebarCompleteBtn', 'mobileCompleteBtn'].forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.lectureIndex);
      if (!Number.isInteger(idx) || idx < 0) return;
      toggleLectureCompletedByIndex(idx);
    });
  });
}

function applyDarkMode(dark) {
  document.documentElement.classList.toggle("dark", dark);
  document.body?.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  const icon = document.getElementById("themeIcon");
  if (icon) icon.textContent = dark ? "light_mode" : "dark_mode";
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_THEME);
  const dark = saved ? saved === "dark" : true;
  applyDarkMode(dark);

  const toggle = document.getElementById("themeToggle");
  if (!toggle || toggle.dataset.bound === "1") return;
  toggle.dataset.bound = "1";
  toggle.addEventListener("click", () => {
    const isDark = !document.documentElement.classList.contains("dark");
    applyDarkMode(isDark);
    localStorage.setItem(STORAGE_THEME, isDark ? 'dark' : 'light');
    refreshDiagrams();
    refreshMermaid(document.getElementById('content') || document);
  });
}

const HUB_HOME_URL = '../../index.html';

let currentView = 'home';

function goToHubHome() {
  window.location.href = HUB_HOME_URL;
}

function goToSubjectHome() {
  location.hash = 'home';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleBrandClick() {
  if (currentView === 'home') goToHubHome();
  else goToSubjectHome();
}

function showView(name) {
  currentView = name;
  document.getElementById('homeView')?.classList.toggle('hidden', name !== 'home');
  document.getElementById('lectureView')?.classList.toggle('hidden', name !== 'lecture');
  document.getElementById('examView')?.classList.toggle('hidden', name !== 'exam');
  document.getElementById('backToHomeBtn')?.classList.toggle('hidden', name === 'home');
  document.getElementById('backToHubBtn')?.classList.toggle('hidden', name !== 'home');
  document.getElementById('lectureWidthControl')?.classList.toggle('hidden', name !== 'lecture');
  document.getElementById('lectureNotesBtn')?.classList.toggle('hidden', !LECTURE_NOTES_ENABLED || name !== 'lecture');
  document.getElementById('mobileStudyBar')?.classList.toggle('hidden', name !== 'lecture');
  document.documentElement.classList.toggle('is-lecture-view', name === 'lecture');
  const brandBtn = document.getElementById('brandBtn');
  if (brandBtn) {
    brandBtn.title = name !== 'home'
      ? 'العودة لقائمة المحاضرات'
      : 'العودة للسنوات الدراسية';
  }
  if (name !== 'lecture') closeMobileToc();
}

function versionedUrl(relativePath) {
  const buildId = readBuildId();
  if (!buildId) return relativePath;
  const sep = relativePath.includes('?') ? '&' : '?';
  return `${relativePath}${sep}v=${encodeURIComponent(buildId)}`;
}

async function loadManifest() {
  const res = await fetch(versionedUrl('lectures/manifest.json'), { cache: 'no-store' });
  if (!res.ok) throw new Error('تعذّر تحميل manifest.json');
  return res.json();
}

async function loadLectureJson(path) {
  const key = versionedUrl(`lectures/${path}`);
  if (lectureJsonInflight.has(key)) return lectureJsonInflight.get(key);

  const promise = fetch(key, { cache: 'no-store' })
    .then(res => {
      if (!res.ok) throw new Error(`تعذّر تحميل ${path}`);
      return res.json();
    })
    .finally(() => lectureJsonInflight.delete(key));

  lectureJsonInflight.set(key, promise);
  return promise;
}

function createItemStub(file, i, manifest) {
  const defaultIcons = manifest.lectureIcons || ['📌'];
  const defaultMatIcons = manifest.lectureMatIcons || ['school'];
  const fileStem = lectureIdFromPath(String(file.path));
  const summary = file.summary || {};
  const stubId = summary.id || fileStem || `lec${i + 1}`;
  return {
    lec: {
      id: stubId,
      title: summary.title || file.badge || `محاضرة ${file.num || i + 1}`,
      tag: summary.tag || '',
      parts: [],
    },
    fileMeta: file,
    icon: file.icon || defaultIcons[i] || '📌',
    matIcon: file.matIcon || defaultMatIcons[i] || 'school',
    sectionIndex: {},
    toc: null,
    summary: file.summary || null,
    parsedAt: file.parsedAt || null,
    loaded: false,
    loading: null,
  };
}

async function ensureLectureLoaded(idx) {
  const item = appState.items[idx];
  if (!item) throw new Error('محاضرة غير موجودة');
  if (item.loaded) return item;
  if (item.loading) return item.loading;

  item.loading = (async () => {
    const doc = await loadLectureJson(item.fileMeta.path);
    const lec = doc.lectures?.[0];
    if (!lec) throw new Error(`لا محتوى في ${item.fileMeta.path}`);
    const fileStem = lectureIdFromPath(String(item.fileMeta.path));
    lec.id = fileStem || lec.id || item.lec.id;
    item.lec = lec;
    item.sectionIndex = doc.sectionIndex || {};
    item.toc = buildTocData([lec])[0];
    item.parsedAt = doc.parsedAt || item.fileMeta.parsedAt || null;
    item.loaded = true;
    item.loading = null;
    return item;
  })();

  try {
    return await item.loading;
  } catch (err) {
    item.loading = null;
    throw err;
  }
}

function renderHomeGrid() {
  const grid = document.getElementById('lectureGrid');
  if (!grid || !appState.items.length) return;

  const sections = appState.manifest?.sections || [];
  let tabs = document.getElementById('lectureSectionTabs');
  if (sections.length > 1) {
    if (!tabs) {
      tabs = document.createElement('div');
      tabs.id = 'lectureSectionTabs';
      tabs.className = 'flex gap-sm mb-lg';
      grid.before(tabs);
    }
    tabs.innerHTML = sections.map(section => `
      <button type="button" data-lecture-section="${escAttr(section.key)}"
        class="flex-1 px-lg py-md rounded-xl border font-label-md font-bold transition-all ${appState.activeSection === section.key
    ? 'bg-primary text-on-primary border-primary'
    : 'bg-surface-container-lowest text-on-surface border-outline-variant'}">
        ${esc(section.icon || '')} ${esc(section.label)}
      </button>`).join('');
    tabs.querySelectorAll('[data-lecture-section]').forEach(btn => {
      btn.addEventListener('click', () => {
        appState.activeSection = btn.dataset.lectureSection;
        renderHomeGrid();
      });
    });
  }

  const visibleItems = appState.items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => !appState.activeSection || item.fileMeta?.section === appState.activeSection);

  grid.innerHTML = visibleItems.map(({ item, i }) => {
    const stats = itemStats(item);
    const title = shortLectureTitle(item.lec.title);
    const num = item.fileMeta?.num ?? item.lec.title.match(/المحاضرة\s+(\d+)/)?.[1] ?? String(i + 1);
    const badge = item.fileMeta?.badge;
    const tag = item.lec.tag || '';
    const lectureId = lectureStableId(item, i);
    const isDone = appState.progressTracker?.isLectureCompleted(lectureId) || false;
    const doneLabel = isDone ? 'مكتملة' : 'غير مكتملة';
    const mastered = stats.mcq
      ? Math.min(appState.quizStats?.getMasteredCount(lectureId) || 0, stats.mcq)
      : 0;
    return `
      <article class="lecture-picker-card group text-right bg-surface-container-lowest border border-outline-variant rounded-xl p-lg custom-shadow box-hover w-full"
               data-lecture-card="${i}" aria-label="${esc(title)}">
        <div class="flex items-start justify-between mb-md">
          <div class="picker-icon-wrap w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
            ${ms(item.matIcon, true, 'text-3xl')}
          </div>
          <div class="flex flex-col items-end gap-xs lecture-card-head-actions">
            <span class="px-sm py-xs bg-secondary-container text-on-secondary-container rounded-lg font-code-sm text-code-sm">#${esc(num)}</span>
            ${badge ? `<span class="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg font-label-md text-label-md">${esc(badge)}</span>` : ''}
            <button type="button" class="lecture-complete-btn ${isDone ? 'is-complete' : ''}" data-toggle-complete-index="${i}" aria-pressed="${isDone ? 'true' : 'false'}" aria-label="${isDone ? 'إلغاء إكمال' : 'تحديد كمكتملة'} ${escAttr(title)}">
              ${ms(isDone ? 'task_alt' : 'radio_button_unchecked', false, 'text-base')}
              <span>${doneLabel}</span>
            </button>
          </div>
        </div>
        <h3 class="font-headline-sm text-headline-sm text-on-surface mb-xs group-hover:text-primary transition-colors">${esc(title)}</h3>
        ${tag ? `<p class="font-label-md text-label-md text-on-surface-variant mb-md line-clamp-2">${esc(tag)}</p>` : '<div class="mb-md"></div>'}
        <div class="flex flex-wrap gap-sm mb-lg">
          <span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">
            ${ms('menu_book', false, 'text-sm text-primary')} ${stats.parts} أجزاء
          </span>
          ${stats.mcq ? `<span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">
            ${ms('quiz', false, 'text-sm text-secondary')} ${stats.mcq} سؤال
          </span>` : ''}
          ${mastered ? `<span class="inline-flex items-center gap-xs px-sm py-xs bg-primary-container text-on-primary-container rounded-full font-label-md text-label-md" title="أسئلة أجبت عنها صحيحاً ولو مرة">
            ${ms('workspace_premium', false, 'text-sm')} إتقان ${mastered}/${stats.mcq}
          </span>` : ''}
          ${stats.sections ? `<span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">
            ${ms('format_list_bulleted', false, 'text-sm text-tertiary')} ${stats.sections} أقسام
          </span>` : ''}
        </div>
        <div class="lecture-card-footer">
          <span class="lecture-card-status ${isDone ? 'is-complete' : ''}">
            ${ms(isDone ? 'check_circle' : 'pending', false, 'text-base')} ${doneLabel}
          </span>
          <button type="button" class="lecture-open-btn inline-flex items-center gap-sm text-primary font-label-md font-bold group-hover:gap-md transition-all" data-open-lecture-index="${i}" aria-label="فتح ${escAttr(title)}">
            ابدأ الدراسة ${ms('arrow_back', false, 'text-lg')}
          </button>
        </div>
      </article>`;
  }).join('');

  grid.querySelectorAll('[data-open-lecture-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.openLectureIndex);
      const id = appState.items[idx]?.lec.id;
      if (id) location.hash = id;
    });
  });

  grid.querySelectorAll('[data-toggle-complete-index]').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const idx = Number(btn.dataset.toggleCompleteIndex);
      if (!Number.isInteger(idx) || idx < 0) return;
      toggleLectureCompletedByIndex(idx);
    });
  });
}

function revealAnimated(el) {
  if (!el) return;
  const section = el.classList.contains('section-block') ? el : el.closest('.section-block');
  const targets = section ? [section, ...section.querySelectorAll('.box-animate')] : [el];
  targets.forEach(node => node.classList.add('is-visible'));
}

function revealSectionTree(section) {
  if (!section) return;
  revealAnimated(section);
}

function scrollToAnchor(anchorHash, attempt = 0) {
  if (!anchorHash) return;
  const id = anchorIdFromHash(anchorHash);
  const el = document.getElementById(id);
  if (!el) {
    if (attempt < 8) {
      requestAnimationFrame(() => scrollToAnchor(anchorHash, attempt + 1));
    }
    return;
  }
  // Prefer instant when far away — smooth scroll is flaky after remounts / long pages.
  const far = Math.abs(el.getBoundingClientRect().top) > window.innerHeight * 1.5;
  el.scrollIntoView({ behavior: far ? 'auto' : 'smooth', block: 'start' });
  revealAnimated(el);
  el.classList.add('anchor-flash');
  setTimeout(() => el.classList.remove('anchor-flash'), 2200);
}

function revealLectureDetailSections(root = document.getElementById('content')) {
  if (!root) return;
  root.querySelectorAll('.section-block[data-part-type="detail"]').forEach(revealSectionTree);
}

function scrollAfterLectureLoad(hashPart, item) {
  const scroll = () => {
    if (hashPointsToSection(hashPart, item)) scrollToAnchor(hashPart);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    revealLectureDetailSections();
    refreshLectureVisibility();
  };
  // Remounted lectures need a couple frames + a short delay so layout height settles.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scroll();
      if (hashPointsToSection(hashPart, item)) {
        setTimeout(() => scrollToAnchor(hashPart), 80);
      }
    });
  });
}

function refreshLectureVisibility(root = document.getElementById('content')) {
  if (!root) return;
  root.querySelectorAll('.section-block').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.05 && rect.bottom > 0) {
      revealSectionTree(sec);
    }
  });
}

function setActiveNavLink(activeEl) {
  const href = activeEl?.getAttribute('href');
  document.querySelectorAll('.toc-nav-link').forEach(a => {
    a.classList.remove('bg-primary-container', 'text-on-primary-container', 'border-primary', 'font-bold');
    a.classList.add('text-on-surface-variant');
    if (href && a.getAttribute('href') === href) {
      a.classList.add('bg-primary-container', 'text-on-primary-container', 'border-primary', 'font-bold');
      a.classList.remove('text-on-surface-variant');
    }
  });
}

function buildSidebar(toc) {
  const containers = [
    document.getElementById('sidebarToc'),
    document.getElementById('mobileTocNav'),
  ].filter(Boolean);
  if (!containers.length || !toc) return;

  if (sidebarObserver) {
    sidebarObserver.disconnect();
    sidebarObserver = null;
  }

  containers.forEach(c => { c.innerHTML = ''; });
  const allLinks = [];

  toc.parts.forEach(part => {
    const partLabel = part.title
      .replace(/^الجزء[^:]+:\s*/, '')
      .replace(/^📌\s*/, '');

    containers.forEach(container => {
      const link = document.createElement('a');
      link.href = `#${part.id}`;
      link.className = 'toc-nav-link flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high p-md transition-all mx-md mb-xs font-label-md text-label-md rounded-l-lg border-r-4 border-transparent';
      link.innerHTML = `<span class="line-clamp-2">${esc(partLabel)}</span>`;
      link.dataset.partType = part.type;
      container.appendChild(link);
      if (container === containers[0]) allLinks.push({ el: link, target: null });

      (part.subsections || []).forEach(sub => {
        const subLink = document.createElement('a');
        const subId = `${part.id}-${sub.id}`;
        const indent = sub.level >= 5 ? 'mr-2xl' : sub.level >= 4 ? 'mr-xl' : 'mr-lg';
        subLink.href = `#${subId}`;
        subLink.className = `toc-nav-link flex items-center gap-sm text-on-surface-variant hover:bg-surface-container-high py-xs px-md transition-all ${indent} mb-xs font-label-md text-label-md rounded-l-lg border-r-4 border-transparent opacity-80`;
        const subLabel = sub.text.replace(/^\d+(?:\.\d+)*\.?\s*/, '');
        subLink.innerHTML = `${ms('chevron_left', false, 'text-sm shrink-0')}<span class="line-clamp-2 text-xs leading-snug">${formatSubsectionLabel(subLabel)}</span>`;
        container.appendChild(subLink);
        if (container === containers[0]) allLinks.push({ el: subLink, target: null });
      });
    });
  });

  allLinks.forEach(item => {
    const id = anchorIdFromHash(item.el.hash);
    if (id) item.target = document.getElementById(id);
  });

  if (allLinks.length) setActiveNavLink(allLinks[0].el);

  sidebarObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) {
        const link = allLinks.find(l => l.target === visible[0].target)?.el;
        if (link) setActiveNavLink(link);
      }
    },
    {
      rootMargin: `-${SCROLL_OFFSET_PX + 8}px 0px -65% 0px`,
      threshold: [0, 0.1, 0.25],
    },
  );

  document.querySelectorAll('.toc-nav-link').forEach(link => {
    const id = anchorIdFromHash(link.hash);
    const target = id ? document.getElementById(id) : null;
    const primary = allLinks.find(l => l.el.getAttribute('href') === link.getAttribute('href'));
    if (primary && target) primary.target = target;

    link.addEventListener('click', e => {
      e.preventDefault();
      const anchorId = anchorIdFromHash(link.hash);
      if (!anchorId) return;
      if (location.hash !== `#${anchorId}`) location.hash = anchorId;
      else scrollToAnchor(anchorId);
      setActiveNavLink(link);
      if (target) revealAnimated(target);
      closeMobileToc();
    });
  });

  const observed = new Set();
  allLinks.forEach(item => {
    if (item.target && !observed.has(item.target)) {
      observed.add(item.target);
      sidebarObserver.observe(item.target);
    }
  });
}

/** Finds the "ملخص" (summary) part's DOM element for the item currently on screen — the point where the sidebar progress rail should read 100%. */
function findSummaryPartEl() {
  const toc = currentReviewIndex >= 0
    ? appState.reviewItems[currentReviewIndex]?.toc
    : appState.items[currentLectureIndex]?.toc;
  if (!toc) return null;
  const part = toc.parts?.find(p =>
    p.type === 'summary' && !/checklist|قائمة فحص|قائمة المراجعة/i.test(p.title),
  ) || toc.parts?.find(p => p.type === 'summary' && /ملخص/i.test(p.title));
  if (!part) return null;
  return document.getElementById(part.id);
}

function updateSidebarProgressTarget() {
  progressEndEl = findSummaryPartEl();
}

/** Updates the thin edge rail in the sidebar to reflect how far the student has scrolled through the lecture body (stops at the start of the summary part, if present). */
function updateSidebarProgressFill() {
  const fill = document.getElementById('sidebarProgressFill');
  const dot = document.getElementById('sidebarProgressDot');
  const content = document.getElementById('content');
  if (!fill || !dot || !content || currentView !== 'lecture') return;

  const contentTop = content.getBoundingClientRect().top + window.scrollY;
  const endTop = progressEndEl
    ? progressEndEl.getBoundingClientRect().top + window.scrollY
    : contentTop + content.offsetHeight;
  const span = Math.max(1, endTop - contentTop);
  const frac = Math.min(1, Math.max(0, (window.scrollY + SCROLL_OFFSET_PX - contentTop) / span));

  fill.style.height = `${frac * 100}%`;
  dot.style.top = `${(1 - frac) * 100}%`;
}

function initSidebarProgress() {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateSidebarProgressFill();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

/** Collapses/expands the desktop lecture sidebar. Defaults to expanded on every page load. */
function setSidebarCollapsed(collapsed) {
  const aside = document.getElementById('lectureSidebar');
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const expandBtn = document.getElementById('sidebarExpandBtn');
  const icon = document.getElementById('sidebarToggleIcon');
  if (!aside) return;
  aside.classList.toggle('is-collapsed', collapsed);
  toggleBtn?.setAttribute('aria-expanded', String(!collapsed));
  if (icon) icon.textContent = collapsed ? 'chevron_left' : 'chevron_right';
  expandBtn?.classList.toggle('hidden', !collapsed);
}

function initSidebarToggle() {
  document.getElementById('sidebarToggleBtn')?.addEventListener('click', () => setSidebarCollapsed(true));
  document.getElementById('sidebarExpandBtn')?.addEventListener('click', () => setSidebarCollapsed(false));
  setSidebarCollapsed(false);
}

function initScrollAnimations(root = document) {
  if (scrollAnimObserver) scrollAnimObserver.disconnect();

  scrollAnimObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealSectionTree(entry.target);
        scrollAnimObserver?.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });

  const reveal = el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      revealSectionTree(el);
    } else {
      scrollAnimObserver.observe(el);
    }
  };

  root.querySelectorAll('.section-block').forEach((sec, i) => {
    sec.classList.remove('is-visible');
    sec.classList.remove('stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6');
    sec.classList.add(`stagger-${(i % 6) + 1}`);
    if (sec.dataset.partType === 'detail') {
      revealSectionTree(sec);
    } else {
      reveal(sec);
    }
  });

  root.querySelectorAll('.box-animate').forEach(el => {
    if (el.closest('.section-block')) return;
    el.classList.remove('is-visible');
    reveal(el);
  });

  root.querySelectorAll('.lecture-body .section-block').forEach(revealSectionTree);
}

function mountLectureHtml(item, html) {
  document.getElementById('content').innerHTML = html;
  showView('lecture');
  initInteractivity(document.getElementById('content'));
  initDiagrams(document.getElementById('content'));
  initEquations(document.getElementById('content'));
  initMermaid(document.getElementById('content'));
  if (window.hljs) document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  buildSidebar(item.toc);
  updateSidebarProgressTarget();
  updateSidebarProgressFill();
  initScrollAnimations(document.getElementById('content'));
  revealLectureDetailSections(document.getElementById('content'));
  requestAnimationFrame(() => {
    revealLectureDetailSections(document.getElementById('content'));
    refreshLectureVisibility(document.getElementById('content'));
    trackLectureContentReady();
  });
}

function showLectureLoading() {
  const content = document.getElementById('content');
  if (!content) return;
  content.innerHTML = `
    <div class="py-2xl text-center text-on-surface-variant" role="status" aria-live="polite">
      <span class="material-symbols-outlined text-4xl text-primary mb-md animate-pulse">hourglass_top</span>
      <p class="font-label-md">جارٍ تحميل المحاضرة…</p>
    </div>`;
  showView('lecture');
}

async function loadLectureView(idx, hashPart) {
  const stub = appState.items[idx];
  if (!stub) return;

  currentReviewIndex = -1;

  // Same lecture + already mounted → just scroll (don't wipe DOM / lose scroll target).
  const alreadyMounted = currentLectureIndex === idx && !!document.getElementById(stub.lec.id || stub.fileMeta?.summary?.id);
  if (!alreadyMounted) showLectureLoading();

  let item;
  try {
    item = await ensureLectureLoaded(idx);
  } catch (err) {
    document.getElementById('content').innerHTML = `
      <div class="py-2xl text-center text-error">
        <p class="mb-md">⚠️ ${esc(err.message)}</p>
        <button type="button" class="text-primary font-bold" onclick="location.hash='home'">العودة للمحاضرات</button>
      </div>`;
    return;
  }

  const needsRender = currentLectureIndex !== idx || !document.getElementById(item.lec.id);
  currentLectureIndex = idx;
  setJumpQuizVisible(!!item.lec.parts?.find(p => p.type === 'mcq'));
  localStorage.setItem(STORAGE_LAST_LECTURE, String(idx));

  if (needsRender) {
    document.getElementById('sidebarCourseTitle').textContent = shortLectureTitle(item.lec.title);
    document.getElementById('sidebarCourseSub').textContent = item.lec.tag || '';
    document.getElementById('sidebarMatIcon').textContent = item.matIcon || 'school';
    document.getElementById('mobileTocCourseTitle').textContent = shortLectureTitle(item.lec.title);
    document.getElementById('mobileTocCourseSub').textContent = item.lec.tag || '';
    document.getElementById('mobileTocMatIcon').textContent = item.matIcon || 'school';
    syncLectureCompletionButtons(idx);

    const cacheKey = htmlCacheKey(item);
    let html = lectureHtmlCache.get(cacheKey);
    if (!html) {
      setRefContext({ lectureRef: item.lec.id, sectionMap: item.sectionIndex || {} });
      html = renderLecture(item.lec, 'primary', item.icon, item.sectionIndex);
      clearRefContext();
      lectureHtmlCache.set(cacheKey, html);
    }
    mountLectureHtml(item, html);
  } else {
    buildSidebar(item.toc);
    updateSidebarProgressTarget();
    updateSidebarProgressFill();
    showView('lecture');
    syncLectureCompletionButtons(idx);
  }

  const hash = resolveLectureHash(idx, hashPart, item);
  routeLock = true;
  if (location.hash !== `#${hash}`) location.hash = hash;
  routeLock = false;

  if (needsRender) scrollAfterLectureLoad(hashPart, item);
  else if (hashPointsToSection(hashPart, item)) scrollToAnchor(hashPart);
    else window.scrollTo({ top: 0, behavior: 'smooth' });

  trackLectureView(item);
  if (!needsRender) trackLectureContentReady();
  if (LECTURE_NOTES_ENABLED) loadLectureNotes();
}

function jumpToSummary() {
  let item = appState.items[currentLectureIndex];
  if (!item) {
    const hash = anchorIdFromHash(location.hash);
    const idx = getLectureIndexFromHash(hash, appState.items);
    if (idx >= 0) {
      currentLectureIndex = idx;
      item = appState.items[idx];
    }
  }
  if (!item) return;

  const isQuickSummary = (title) => /سريع|قبل البدء|checklist|قائمة فحص|قائمة المراجعة/i.test(title || '');
  const isComprehensive = (title) => /شامل|Alternative Complete|قراءة بديلة/i.test(title || '');

  const tocParts = item.toc?.parts || [];
  const part = tocParts.find(p => p.type === 'summary' && isComprehensive(p.title))
    || tocParts.find(p => p.type === 'summary' && /ملخص/i.test(p.title || '') && !isQuickSummary(p.title))
    || tocParts.find(p => p.type === 'summary' && !isQuickSummary(p.title));

  let targetId = part?.id || null;
  if (!targetId) {
    const nodes = [...document.querySelectorAll('#content .section-block[data-part-type="summary"]')];
    const byTitle = (pred) => nodes.find(el => pred(el.querySelector('h3')?.textContent || ''));
    targetId = byTitle(isComprehensive)?.id
      || byTitle(t => /ملخص/i.test(t) && !isQuickSummary(t))?.id
      || byTitle(t => !isQuickSummary(t))?.id
      || nodes.at(-1)?.id
      || null;
  }
  if (!targetId) return;

  const hash = `#${targetId}`;
  if (location.hash === hash) scrollToAnchor(targetId);
  else location.hash = targetId;
  closeMobileToc();
}

function initJumpSummary() {
  document.getElementById('jumpQuizBtn')?.addEventListener('click', jumpToSummary);
  document.getElementById('mobileJumpQuizBtn')?.addEventListener('click', jumpToSummary);
  document.getElementById('mobileStudyQuizBtn')?.addEventListener('click', jumpToSummary);
}

function bindJumpSummaryClicks() {
  document.getElementById('content')?.addEventListener('click', onJumpSummaryClick);
}

function onJumpSummaryClick(e) {
  if (e.target.closest('[data-jump-summary]')) {
    e.preventDefault();
    jumpToSummary();
  }
}

function normalizeLectureWidth(value) {
  if (value === '30') return DEFAULT_LECTURE_WIDTH;
  if (LECTURE_WIDTH_OPTIONS.some(opt => opt.value === value)) return value;
  return DEFAULT_LECTURE_WIDTH;
}

function migrateLectureWidthStorage() {
  if (localStorage.getItem(LECTURE_WIDTH_REV_KEY) === LECTURE_WIDTH_REV) return;
  const saved = localStorage.getItem(STORAGE_LECTURE_WIDTH);
  if (!saved || LEGACY_DEFAULT_WIDTHS.has(saved)) {
    localStorage.removeItem(STORAGE_LECTURE_WIDTH);
  }
  const wideKey = `${GUIDE_CONFIG.storagePrefix || 'study-guide'}-lecture-wide`;
  if (localStorage.getItem(wideKey) === '1') localStorage.removeItem(wideKey);
  localStorage.setItem(LECTURE_WIDTH_REV_KEY, LECTURE_WIDTH_REV);
}

function readStoredLectureWidth() {
  migrateLectureWidthStorage();
  const saved = localStorage.getItem(STORAGE_LECTURE_WIDTH);
  if (saved) return normalizeLectureWidth(saved);
  return DEFAULT_LECTURE_WIDTH;
}

function lectureWidthLabel(mode) {
  return LECTURE_WIDTH_OPTIONS.find(opt => opt.value === mode)?.label || mode;
}

function applyLectureWidth(width) {
  const mode = normalizeLectureWidth(width);
  const view = document.getElementById('lectureView');
  const btn = document.getElementById('lectureWidthBtn');
  const preset = LECTURE_WIDTH_OPTIONS.find(opt => opt.value === mode);

  view?.setAttribute('data-width', mode);

  if (preset?.expand) {
    view?.style.removeProperty('--lecture-body-width');
    view?.style.setProperty('--lecture-main-pad-inline', 'var(--lecture-pad-xs)');
    view?.style.setProperty('--lecture-main-pad-block', 'var(--lecture-pad-sm)');
    view?.style.setProperty('--lecture-main-max-width', 'none');
  } else if (preset) {
    view?.style.setProperty('--lecture-body-width', preset.body);
    view?.style.setProperty('--lecture-main-pad-inline', preset.padInline || 'var(--lecture-pad-default)');
    view?.style.setProperty('--lecture-main-pad-block', preset.padBlock || 'var(--lecture-pad-default)');
    view?.style.setProperty('--lecture-main-max-width', preset.mainMax || 'var(--lecture-main-max-default)');
  }

  btn?.setAttribute('title', `عرض المحتوى: ${lectureWidthLabel(mode)}`);
  document.querySelectorAll('.lecture-width-menu__item').forEach(item => {
    item.classList.toggle('is-active', item.dataset.width === mode);
    item.setAttribute('aria-checked', String(item.dataset.width === mode));
  });
}

function closeLectureWidthMenu() {
  const menu = document.getElementById('lectureWidthMenu');
  const btn = document.getElementById('lectureWidthBtn');
  menu?.classList.add('hidden');
  btn?.setAttribute('aria-expanded', 'false');
}

function initLectureWidthToggle() {
  const btn = document.getElementById('lectureWidthBtn');
  const menu = document.getElementById('lectureWidthMenu');
  if (!btn || !menu || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';

  menu.innerHTML = LECTURE_WIDTH_OPTIONS.map(opt => `
    <button type="button" class="lecture-width-menu__item" role="menuitemradio" data-width="${opt.value}">
      ${opt.label}
    </button>`).join('');

  applyLectureWidth(readStoredLectureWidth());

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
  });

  menu.querySelectorAll('.lecture-width-menu__item').forEach(item => {
    item.addEventListener('click', () => {
      const mode = normalizeLectureWidth(item.dataset.width);
      localStorage.setItem(STORAGE_LECTURE_WIDTH, mode);
      applyLectureWidth(mode);
      closeLectureWidthMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#lectureWidthControl')) closeLectureWidthMenu();
  });
}

function openMobileToc() {
  document.getElementById('mobileTocDrawer')?.classList.remove('hidden');
  document.getElementById('mobileTocBackdrop')?.classList.remove('hidden');
  document.getElementById('mobileTocDrawer')?.setAttribute('aria-hidden', 'false');
  document.getElementById('mobileTocBackdrop')?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileToc() {
  document.getElementById('mobileTocDrawer')?.classList.add('hidden');
  document.getElementById('mobileTocBackdrop')?.classList.add('hidden');
  document.getElementById('mobileTocDrawer')?.setAttribute('aria-hidden', 'true');
  document.getElementById('mobileTocBackdrop')?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initMobileStudyUi() {
  document.getElementById('mobileTocOpen')?.addEventListener('click', openMobileToc);
  document.getElementById('mobileTocClose')?.addEventListener('click', closeMobileToc);
  document.getElementById('mobileTocBackdrop')?.addEventListener('click', closeMobileToc);
  document.getElementById('mobileScrollTopBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function lectureNotesStorageKey() {
  const hash = anchorIdFromHash(location.hash) || 'home';
  return `${STORAGE_NOTES_PREFIX}:${location.pathname}#${hash}`;
}

function loadLectureNotes() {
  const textarea = document.getElementById('lectureNotesInput');
  if (!textarea) return;
  try {
    textarea.value = localStorage.getItem(lectureNotesStorageKey()) || '';
  } catch {
    textarea.value = '';
  }
}

function saveLectureNotes() {
  const textarea = document.getElementById('lectureNotesInput');
  if (!textarea) return;
  try {
    localStorage.setItem(lectureNotesStorageKey(), textarea.value);
  } catch {
    /* ignore quota / private mode */
  }
}

function openLectureNotesModal() {
  const modal = document.getElementById('lectureNotesModal');
  const textarea = document.getElementById('lectureNotesInput');
  if (!modal || !textarea) return;
  loadLectureNotes();
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  textarea.focus();
}

function closeLectureNotesModal() {
  const modal = document.getElementById('lectureNotesModal');
  if (!modal) return;
  saveLectureNotes();
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initLectureNotes() {
  const openBtn = document.getElementById('lectureNotesBtn');
  const closeBtn = document.getElementById('lectureNotesClose');
  const textarea = document.getElementById('lectureNotesInput');
  const modal = document.getElementById('lectureNotesModal');
  if (!openBtn || !textarea || !modal || openBtn.dataset.bound === '1') return;
  openBtn.dataset.bound = '1';

  let saveTimer = null;
  openBtn.addEventListener('click', openLectureNotesModal);
  closeBtn?.addEventListener('click', closeLectureNotesModal);
  modal.querySelectorAll('[data-close-notes]').forEach(el => {
    el.addEventListener('click', closeLectureNotesModal);
  });
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveLectureNotes, 300);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeLectureNotesModal();
  });
}

function initScrollFab() {
  const fab = document.getElementById('scrollTopFab');
  if (!fab) return;
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    fab.classList.toggle('opacity-0', !show);
    fab.classList.toggle('pointer-events-none', !show);
  });
  fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function resolveRoute() {
  if (routeLock) return;
  const hash = anchorIdFromHash(location.hash);

  if (appState.examMode?.open(hash)) {
    currentLectureIndex = -1;
    currentReviewIndex = -1;
    return;
  }
  appState.examMode?.teardown();

  const reviewIdx = getReviewIndexFromHash(hash);
  if (reviewIdx >= 0) {
    loadReviewView(reviewIdx, hash);
    return;
  }

  const examIdx = getExamIndexFromHash(hash);
  if (examIdx >= 0) {
    loadExamView(examIdx, hash);
    return;
  }

  const noteIdx = getNoteIndexFromHash(hash);
  if (noteIdx >= 0) {
    loadNoteView(noteIdx, hash).catch(err => console.error(err));
    return;
  }

  const idx = getLectureIndexFromHash(hash, appState.items);
  if (idx >= 0) {
    loadLectureView(idx, hash).catch(err => console.error(err));
  } else {
    currentLectureIndex = -1;
    currentReviewIndex = -1;
    currentExamIndex = -1;
    currentNoteIndex = -1;
    // Mastery chips and the exam entry card depend on quiz stats that may
    // have changed since the grid was last rendered.
    renderHomeGrid();
    appState.examMode?.renderHomeEntry();
    showView('home');
    trackHomeView();
    if (hash === 'home' || !hash) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  const buildId = readBuildId();
  const swUrl = buildId ? `sw.js?v=${encodeURIComponent(buildId)}` : 'sw.js';
  navigator.serviceWorker.register(swUrl).catch(() => {});
}

/**
 * Navigate to a lecture (and optional anchor) from a search result.
 * Calls ensureLectureLoaded then scrolls.
 */
function navigateToLectureSearch(lecId, anchorId) {
  const idx = appState.items.findIndex(it => it.lec.id === lecId);
  if (idx < 0) return;

  const targetHash = (!anchorId || anchorId === lecId) ? lecId : anchorId;
  location.hash = targetHash;
}

function closeSearchResults() {
  const el = document.getElementById('searchResults');
  if (el) el.classList.add('hidden');
  document.getElementById('searchInput')?.setAttribute('aria-expanded', 'false');
}

function initSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const clearBtn = document.getElementById('searchClearBtn');
  if (!input || !results) return;

  let debounceTimer = null;

  function renderResults(q) {
    if (!q || !q.trim()) {
      results.classList.add('hidden');
      input.setAttribute('aria-expanded', 'false');
      clearBtn?.classList.add('hidden');
      return;
    }
    clearBtn?.classList.remove('hidden');

    search(q, 15).then(matches => {
      if (input.value.trim() !== q.trim()) return; // stale response

      if (!matches.length) {
        results.innerHTML = `<div class="p-lg text-center text-on-surface-variant font-label-md">لا نتائج لـ "${esc(q)}"</div>`;
        results.classList.remove('hidden');
        input.setAttribute('aria-expanded', 'true');
        return;
      }

      const seen = new Set();
      let html = '';
      for (const { entry } of matches) {
        const key = entry.id;
        if (seen.has(key)) continue;
        seen.add(key);

        const icon = entry.kind === 'lecture' ? 'description'
          : entry.kind === 'part' ? 'chapter'
          : entry.kind === 'section' ? 'format_list_bulleted'
          : 'article';

        const ctx = entry.kind === 'lecture' ? `محاضرة ${entry.lecNum}`
          : entry.kind !== 'content' ? (entry.context || `محاضرة ${entry.lecNum}`)
          : `${entry.context || `محاضرة ${entry.lecNum}`}`;

        const label = entry.title || entry.text || '';
        const snip = snippet(entry, q, 60);

        html += `
          <button type="button" class="search-result-item flex items-start gap-md w-full text-right px-lg py-md hover:bg-surface-container-high transition-all border-b border-outline-variant last:border-b-0 cursor-pointer"
            data-lec-id="${escAttr(entry.lecId)}"
            data-anchor="${escAttr(entry.id)}"
            role="option"
            aria-label="${escAttr(label)}">
            <span class="material-symbols-outlined text-primary shrink-0 mt-xs" aria-hidden="true">${icon}</span>
            <div class="min-w-0 flex-1">
              <div class="font-label-md text-label-md text-on-surface truncate">${esc(label)}</div>
              <div class="font-code-sm text-code-sm text-on-surface-variant truncate">${esc(ctx)}</div>
              <div class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-xs">${esc(snip)}</div>
            </div>
          </button>`;
      }

      results.innerHTML = html;
      results.classList.remove('hidden');
      input.setAttribute('aria-expanded', 'true');

      // Click handlers
      results.querySelectorAll('.search-result-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const lecId = btn.dataset.lecId;
          const anchor = btn.dataset.anchor;
          closeSearchResults();
          input.value = '';
          clearBtn?.classList.add('hidden');
          navigateToLectureSearch(lecId, anchor);
        });
      });
    }).catch(err => {
      console.warn('Search error:', err);
    });
  }

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value;
    debounceTimer = setTimeout(() => renderResults(q), 150);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) renderResults(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchResults();
      input.blur();
    }
    if (e.key === 'Enter') {
      const first = results.querySelector('.search-result-item');
      if (first) first.click();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchContainer')) closeSearchResults();
  });

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    closeSearchResults();
    clearBtn.classList.add('hidden');
    input.focus();
  });

  // Navbar search button
  document.getElementById('navbarSearchBtn')?.addEventListener('click', () => {
    if (currentView !== 'home') goToSubjectHome();
    setTimeout(() => {
      input.focus();
      input.select();
    }, 100);
  });

  // Keyboard shortcut: Ctrl+Shift+F
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
      e.preventDefault();
      if (currentView !== 'home') goToSubjectHome();
      setTimeout(() => {
        input.focus();
        input.select();
      }, 100);
    }
  });
}

async function init() {
  initTheme();
  initLaserPointer();
  initInteractivity();
  initScrollFab();
  initJumpSummary();
  bindJumpSummaryClicks();
  initLectureWidthToggle();
  initLectureCompletionButtons();
  initSidebarToggle();
  initSidebarProgress();
  if (LECTURE_NOTES_ENABLED) initLectureNotes();
  initMobileStudyUi();
  initSearch();
  document.getElementById('backToHomeBtn')?.addEventListener('click', goToSubjectHome);
  document.getElementById('backToHubBtn')?.addEventListener('click', goToHubHome);
  document.getElementById('brandBtn')?.addEventListener('click', handleBrandClick);
  window.addEventListener('hashchange', resolveRoute);

  try {
    const manifest = await loadManifest();
    appState.manifest = manifest;
    appState.activeSection = manifest.sections?.[0]?.key || '';
    resetHtmlCacheIfStale(manifest.settings?.buildId || readBuildId());

    applySiteSettings(manifest, { guideConfig: GUIDE_CONFIG, basePath: 'themes/' });
    siteTitle = manifest.settings?.subjectName || manifest.title || GUIDE_CONFIG.defaultTitle;

    initAnalytics({
      subjectName: siteTitle,
      storagePrefix: GUIDE_CONFIG.storagePrefix || 'study-guide',
    });
    updateAnalyticsContext({ subjectName: siteTitle });

    const files = manifest.files || [];

    for (let i = 0; i < files.length; i++) {
      appState.items.push(createItemStub(files[i], i, manifest));
    }

    appState.subjectKey = resolveSubjectKeyFromPath(location.pathname);
    appState.progressTracker = createProgressTracker({ subjectKey: appState.subjectKey });
    appState.quizStats = createQuizStats({ subjectKey: appState.subjectKey });
    appState.examMode = createExamMode({
      getItems: () => appState.items,
      ensureLectureLoaded,
      lectureStableId,
      itemStats,
      getCurrentLectureIndex: () => currentLectureIndex,
      showView,
      quizStats: appState.quizStats,
      renderMCQ,
      initEquations,
      ms,
      shortLectureTitle,
      onStatsChanged: () => {
        renderHomeGrid();
        appState.examMode?.renderHomeEntry();
      },
    });
    if (appState.progressUnsubscribe) appState.progressUnsubscribe();
    appState.progressUnsubscribe = appState.progressTracker.onChange(() => {
      renderSubjectProgressTracker();
      renderHomeGrid();
      syncLectureCompletionButtons(currentLectureIndex);
    });

    initServiceWorker();

    if (!appState.items.length) {
      document.getElementById('lectureGrid').innerHTML =
        '<p class="text-center text-on-surface-variant col-span-full py-xl">لا توجد محاضرات بعد.</p>';
    } else {
      renderHomeGrid();
    }
    renderSubjectProgressTracker();
    renderUpdatedPdfBanner();

    try {
      await loadReviews();
    } catch (reviewErr) {
      console.warn('Review guides not loaded:', reviewErr);
    }
    renderReviewFeatured();
    appState.examMode.renderHomeEntry();

    try {
      await loadExams();
    } catch (examErr) {
      console.warn('دورات archive not loaded:', examErr);
    }
    renderExamArchiveSection();

    try {
      await loadNotes();
    } catch (notesErr) {
      console.warn('Notes not loaded:', notesErr);
    }
    renderNotesSection();

    resolveRoute();
  } catch (err) {
    document.getElementById('lectureGrid').innerHTML = `
      <div class="col-span-full text-center py-xl text-on-surface-variant">
        <p class="text-error mb-md">⚠️ ${esc(err.message)}</p>
        <p class="font-label-md">شغّل من مجلد dist بعد البناء: <code class="bg-surface-container-high px-sm py-xs rounded">python3 -m http.server 8080</code></p>
      </div>`;
    console.error(err);
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
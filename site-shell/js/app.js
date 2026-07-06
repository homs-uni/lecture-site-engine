import { createRenderer } from '../engine/renderer/index.js';
import { initDiagrams, refreshDiagrams } from '../engine/renderer/diagram/diagram.js';
import { initEquations } from './equations.js';
import { applySiteSettings } from '../themes/apply-theme.js';
import { GUIDE_CONFIG } from './guide-config.js';

const STORAGE_THEME = `${GUIDE_CONFIG.storagePrefix || 'study-guide'}-theme`;
const STORAGE_LAST_LECTURE = `${GUIDE_CONFIG.storagePrefix || 'study-guide'}-last-lecture`;

const {
  renderLecture,
  buildTocData,
  shortLectureTitle,
  initInteractivity,
  setRefContext,
  clearRefContext,
  PART_MAT_ICONS,
  ms,
} = createRenderer({ config: GUIDE_CONFIG });

/** @type {{ manifest: object|null, items: Array }} */
const appState = { manifest: null, items: [] };
let currentLectureIndex = -1;
let siteTitle = GUIDE_CONFIG.defaultTitle || 'Study Guide';
let scrollAnimObserver = null;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_THEME);
  const dark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = dark ? 'light_mode' : 'dark_mode';
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(STORAGE_THEME, isDark ? 'dark' : 'light');
    if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    refreshDiagrams();
  });
}

function showView(name) {
  document.getElementById('homeView')?.classList.toggle('hidden', name !== 'home');
  document.getElementById('lectureView')?.classList.toggle('hidden', name !== 'lecture');
  document.getElementById('backToHomeBtn')?.classList.toggle('hidden', name === 'home');
}

async function loadManifest() {
  const res = await fetch('lectures/manifest.json');
  if (!res.ok) throw new Error('تعذّر تحميل manifest.json');
  return res.json();
}

async function loadLectureJson(path) {
  const res = await fetch(`lectures/${path}`);
  if (!res.ok) throw new Error(`تعذّر تحميل ${path}`);
  return res.json();
}

function renderHomeGrid() {
  const grid = document.getElementById('lectureGrid');
  if (!grid) return;
  grid.innerHTML = appState.items.map((item, i) => {
    const title = shortLectureTitle(item.lec.title);
    const num = item.fileMeta?.num ?? String(i + 1);
    const badge = item.fileMeta?.badge || item.lec.tag || '';
    return `
      <button type="button" class="group text-right bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full hover:border-primary/40 transition-colors" data-idx="${i}">
        <div class="flex items-start justify-between mb-md">
          <span class="text-3xl" aria-hidden="true">${esc(item.icon)}</span>
          <div class="flex flex-col items-end gap-xs">
            <span class="px-sm py-xs bg-secondary-container text-on-secondary-container rounded-lg text-sm">#${esc(num)}</span>
            ${badge ? `<span class="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg text-sm">${esc(badge)}</span>` : ''}
          </div>
        </div>
        <h3 class="font-headline-sm text-on-surface group-hover:text-primary transition-colors">${esc(title)}</h3>
      </button>`;
  }).join('');

  grid.querySelectorAll('[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      loadLectureView(Number(btn.dataset.idx));
    });
  });
}

function anchorIdFromHash(hash) {
  if (!hash) return '';
  return decodeURIComponent(String(hash).replace(/^#/, ''));
}

function revealAnimated(el) {
  if (!el) return;
  const section = el.classList.contains('section-block') ? el : el.closest('.section-block');
  const targets = section ? [section, ...section.querySelectorAll('.box-animate')] : [el];
  targets.forEach(node => node.classList.add('is-visible'));
}

function scrollToAnchor(anchorHash) {
  if (!anchorHash) return;
  const id = anchorIdFromHash(anchorHash);
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    revealAnimated(el);
    el.classList.add('anchor-flash');
    setTimeout(() => el.classList.remove('anchor-flash'), 2200);
  });
}

function setActiveNavLink(activeEl) {
  document.querySelectorAll('.toc-nav-link').forEach(a => {
    a.classList.remove('bg-primary-container', 'text-on-primary-container', 'border-primary', 'font-bold');
    a.classList.add('text-on-surface-variant');
  });
  if (activeEl) {
    activeEl.classList.add('bg-primary-container', 'text-on-primary-container', 'border-primary', 'font-bold');
    activeEl.classList.remove('text-on-surface-variant');
  }
}

function buildSidebar(toc) {
  const container = document.getElementById('sidebarToc');
  if (!container || !toc) return;

  container.innerHTML = '';
  const allLinks = [];

  toc.parts.forEach(part => {
    const partLabel = part.title
      .replace(/^الجزء[^:]+:\s*/, '')
      .replace(/^📌\s*/, '');
    const link = document.createElement('a');
    link.href = `#${part.id}`;
    link.className = 'toc-nav-link flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high p-md transition-all mx-md mb-xs font-label-md text-label-md rounded-l-lg border-r-4 border-transparent';
    link.innerHTML = `${ms(part.icon, false, 'text-lg shrink-0')}<span class="line-clamp-2">${esc(partLabel)}</span>`;
    link.dataset.partType = part.type;
    container.appendChild(link);
    allLinks.push({ el: link, target: null });

    (part.subsections || []).forEach(sub => {
      const subLink = document.createElement('a');
      const subId = `${part.id}-${sub.id}`;
      const indent = sub.level >= 5 ? 'mr-2xl' : sub.level >= 4 ? 'mr-xl' : 'mr-lg';
      subLink.href = `#${subId}`;
      subLink.className = `toc-nav-link flex items-center gap-sm text-on-surface-variant hover:bg-surface-container-high py-xs px-md transition-all ${indent} mb-xs font-label-md text-label-md rounded-l-lg border-r-4 border-transparent opacity-80`;
      subLink.innerHTML = `${ms('chevron_left', false, 'text-sm shrink-0')}<span class="line-clamp-2 text-xs leading-snug">${esc(sub.text.replace(/^\d+(?:\.\d+)*\.?\s*/, ''))}</span>`;
      container.appendChild(subLink);
      allLinks.push({ el: subLink, target: null });
    });
  });

  allLinks.forEach(item => {
    const id = anchorIdFromHash(item.el.hash);
    if (id) item.target = document.getElementById(id);
  });

  if (allLinks.length) setActiveNavLink(allLinks[0].el);

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible.length) {
      const link = allLinks.find(l => l.target === visible[0].target)?.el;
      if (link) setActiveNavLink(link);
    }
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.25] });

  allLinks.forEach(item => {
    if (item.target) observer.observe(item.target);
    item.el.addEventListener('click', e => {
      e.preventDefault();
      const id = anchorIdFromHash(item.el.hash);
      if (!id) return;
      if (location.hash !== `#${id}`) location.hash = id;
      else scrollToAnchor(id);
      if (item.target) {
        setActiveNavLink(item.el);
        revealAnimated(item.target);
      }
    });
  });
}

function initScrollAnimations(root = document) {
  if (scrollAnimObserver) scrollAnimObserver.disconnect();

  scrollAnimObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollAnimObserver?.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });

  const reveal = el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      el.classList.add('is-visible');
    } else {
      scrollAnimObserver.observe(el);
    }
  };

  root.querySelectorAll('.section-block').forEach((sec, i) => {
    sec.classList.remove('is-visible');
    sec.classList.remove('stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6');
    sec.classList.add(`stagger-${(i % 6) + 1}`);
    reveal(sec);
  });

  root.querySelectorAll('.box-animate').forEach(el => {
    if (el.closest('.section-block')) return;
    el.classList.remove('is-visible');
    reveal(el);
  });
}

function loadLectureView(idx, hashPart) {
  const item = appState.items[idx];
  if (!item) return;

  const needsRender = currentLectureIndex !== idx || !document.getElementById(item.lec.id);
  currentLectureIndex = idx;
  localStorage.setItem(STORAGE_LAST_LECTURE, String(idx));

  if (needsRender) {
    document.getElementById('sidebarCourseTitle').textContent = shortLectureTitle(item.lec.title);
    document.getElementById('sidebarCourseSub').textContent = item.lec.tag || '';
    document.getElementById('sidebarMatIcon').textContent = item.matIcon || 'school';

    setRefContext({ lectureRef: item.lec.id, sectionMap: item.sectionIndex || {} });
    const html = renderLecture(item.lec, 'primary', item.icon, item.sectionIndex);
    clearRefContext();

    document.getElementById('content').innerHTML = html;
    showView('lecture');
    initInteractivity(document.getElementById('content'));
    initDiagrams(document.getElementById('content'));
    initEquations(document.getElementById('content'));
    requestAnimationFrame(() => {
      initScrollAnimations(document.getElementById('content'));
      buildSidebar(item.toc);
      if (hashPart && hashPart !== item.lec.id) scrollToAnchor(hashPart);
    });
    if (window.hljs) document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  } else {
    buildSidebar(item.toc);
    if (hashPart && hashPart !== item.lec.id) scrollToAnchor(hashPart);
  }

  const hash = hashPart || item.lec.id;
  if (location.hash !== `#${hash}`) location.hash = hash;
  else if (!needsRender && hashPart && hashPart !== item.lec.id) scrollToAnchor(hashPart);
}

function initJumpQuiz() {
  document.getElementById('jumpQuizBtn')?.addEventListener('click', () => {
    const item = appState.items[currentLectureIndex];
    if (!item) return;
    const quiz = item.toc?.parts?.find(p => /mcq|اختبار/i.test(p.title));
    if (quiz) location.hash = quiz.id;
    else document.getElementById('content')?.querySelector('.mcq-part')?.scrollIntoView({ behavior: 'smooth' });
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

function getLectureIndexFromHash(hash) {
  if (!hash || hash === 'home') return -1;
  const id = anchorIdFromHash(hash);
  return appState.items.findIndex(it => it.lec.id === id || id.startsWith(`${it.lec.id}-`));
}

function resolveRoute() {
  const hash = anchorIdFromHash(location.hash);
  const idx = getLectureIndexFromHash(hash);
  if (idx >= 0) loadLectureView(idx, hash);
  else showView('home');
}

async function init() {
  initTheme();
  initInteractivity();
  initScrollFab();
  initJumpQuiz();
  document.getElementById('backToHomeBtn')?.addEventListener('click', () => { location.hash = 'home'; });
  document.getElementById('brandBtn')?.addEventListener('click', () => { location.hash = 'home'; });
  window.addEventListener('hashchange', resolveRoute);

  try {
    const manifest = await loadManifest();
    appState.manifest = manifest;

    applySiteSettings(manifest, { guideConfig: GUIDE_CONFIG, basePath: 'themes/' });
    siteTitle = manifest.settings?.subjectName || manifest.title || GUIDE_CONFIG.defaultTitle;

    const defaultIcons = manifest.lectureIcons || ['📌'];
    const defaultMatIcons = manifest.lectureMatIcons || ['school'];
    const files = manifest.files || [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const doc = await loadLectureJson(file.path);
      const lec = doc.lectures?.[0];
      if (!lec) continue;
      // One file = one lecture chunk → parser always emits lec1; use filename stem instead.
      const fileStem = String(file.path).replace(/\.json$/i, '').replace(/\.md$/i, '');
      lec.id = fileStem || lec.id || `lec${appState.items.length + 1}`;
      appState.items.push({
        lec,
        fileMeta: file,
        icon: file.icon || defaultIcons[i] || '📌',
        matIcon: file.matIcon || defaultMatIcons[i] || 'school',
        sectionIndex: doc.sectionIndex || {},
        toc: buildTocData([lec])[0],
      });
    }

    if (!appState.items.length) {
      document.getElementById('lectureGrid').innerHTML =
        '<p class="text-center text-on-surface-variant col-span-full py-xl">لا توجد محاضرات بعد.</p>';
    } else {
      renderHomeGrid();
    }

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

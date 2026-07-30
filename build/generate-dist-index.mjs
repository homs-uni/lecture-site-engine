#!/usr/bin/env node
/**
 * Generate dist/index.html — hub linking to all subjects (built + placeholder stubs).
 */
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  listAllSubjectDirs,
  parseSubjectBrief,
  parseParFilename,
  academicYearFromPath,
  toArabicDigits,
  inferTheme,
} from './lib/scaffold-subject.mjs';
import {
  analyticsMetaTagsHtml,
  hubAnalyticsScriptHtml,
  patchAnalyticsHtml,
} from './lib/patch-analytics.mjs';

const ENGINE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ENGINE_ROOT, 'dist');
const IS_DEV = process.env.GITHUB_BRANCH === 'dev';
/** @type {Record<string, { primary: string, secondary: string, tertiary: string, fixed: string, onFixed: string, icon: string }>} */
const HUB_THEME_PALETTE = {
  'kotlin-pink-blue': {
    primary: "#111827",
    secondary: "#4f92ff",
    tertiary: "#2563eb",
    fixed: "#e0f2fe",
    onFixed: "#0f172a",
    icon: "code",
  },
  'parallel-teal': {
    primary: "#111827",
    secondary: "#4f92ff",
    tertiary: "#2563eb",
    fixed: "#e0f2fe",
    onFixed: "#0f172a",
    icon: "memory",
  },
  'software-purple': {
    primary: "#111827",
    secondary: "#4f92ff",
    tertiary: "#2563eb",
    fixed: "#e0f2fe",
    onFixed: "#0f172a",
    icon: "engineering",
  },
  'programming-blue-lavender': {
    primary: "#111827",
    secondary: "#4f92ff",
    tertiary: "#2563eb",
    fixed: "#e0f2fe",
    onFixed: "#0f172a",
    icon: "terminal",
  },
  'gis-earth': {
    primary: "#111827",
    secondary: "#4f92ff",
    tertiary: "#2563eb",
    fixed: "#e0f2fe",
    onFixed: "#0f172a",
    icon: "map",
  },
  'amber-default': {
    primary: "#111827",
    secondary: "#4f92ff",
    tertiary: "#2563eb",
    fixed: "#e0f2fe",
    onFixed: "#0f172a",
    icon: "school",
  },
};

/** @type {Record<number, { primary: string, secondary: string, fixed: string, label: string }>} */
const YEAR_ACCENTS = {
  1: {
    primary: "#111827",
    secondary: "#4f92ff",
    fixed: "#e0f2fe",
    label: "الأولى",
  },
  2: {
    primary: "#111827",
    secondary: "#4f92ff",
    fixed: "#e0f2fe",
    label: "الثانية",
  },
  3: {
    primary: "#111827",
    secondary: "#4f92ff",
    fixed: "#e0f2fe",
    label: "الثالثة",
  },
  4: {
    primary: "#111827",
    secondary: "#4f92ff",
    fixed: "#e0f2fe",
    label: "الرابعة",
  },
  5: {
    primary: "#111827",
    secondary: "#4f92ff",
    fixed: "#e0f2fe",
    label: "الخامسة",
  },
};

/** @param {number} n */
function lectureCountLabel(n) {
  if (n === 0) return '٠ محاضرات';
  if (n === 1) return 'محاضرة واحدة';
  if (n === 2) return 'محاضرتان';
  return `${toArabicDigits(n)} محاضرات`;
}

/** @param {string} rel */
async function countLecturesForSubject(rel) {
  const lecturesDir = path.join(ENGINE_ROOT, 'subjects', rel, 'lectures');
  if (existsSync(lecturesDir)) {
    const files = await readdir(lecturesDir);
    const nums = new Set();
    for (const f of files) {
      const parsed = parseParFilename(f);
      if (parsed) nums.add(parsed.num);
    }
    if (nums.size) return nums.size;
  }

  const distManifest = path.join(DIST, rel, 'lectures/manifest.json');
  if (existsSync(distManifest)) {
    try {
      const m = JSON.parse(await readFile(distManifest, 'utf8'));
      const nums = new Set(
        (m.files || []).map(f => f.num).filter(n => typeof n === 'number' && !Number.isNaN(n)),
      );
      if (nums.size) return nums.size;
    } catch { /* ignore */ }
  }

  return 0;
}

/** @returns {Promise<{ rel: string, title: string, subtitle: string, year: string, academicYear: number, hasLectures: boolean, lectureCount: number, theme: string, matIcon: string }[]>} */
async function collectHubSubjects() {
  /** @type {Awaited<ReturnType<typeof collectHubSubjects>>} */
  const items = [];

  for (const rel of await listAllSubjectDirs()) {
    const subjectPath = path.join(ENGINE_ROOT, 'subjects', rel);
    const briefPath = path.join(subjectPath, 'subject-brief.yaml');
    const lecturesDir = path.join(subjectPath, 'lectures');
    if (!existsSync(briefPath) && !existsSync(lecturesDir)) continue;

    const folderName = rel.split('/')[1];
    let title = folderName;
    let subtitle = '';
    let year = '';
    let academicYear = academicYearFromPath(rel);
    let domain = null;
    let subjectId = folderName;

    if (existsSync(briefPath)) {
      try {
        const brief = parseSubjectBrief(await readFile(briefPath, 'utf8'));
        title = brief.name_ar || title;
        subtitle = brief.tagline || '';
        domain = brief.domain;
        subjectId = brief.id || subjectId;
      } catch { /* ignore */ }
    }

    let theme = inferTheme(subjectId, domain);
    let matIcon = HUB_THEME_PALETTE[theme]?.icon || 'school';
    let enabledLectures = false;
    let hubTag = '';
    const manifestSrc = path.join(lecturesDir, 'manifest.json');
    if (existsSync(manifestSrc)) {
      try {
        const m = JSON.parse(await readFile(manifestSrc, 'utf8'));
        title = m.settings?.subjectName || m.title || title;
        subtitle = m.subtitle || subtitle;
        year = m.settings?.year || '';
        enabledLectures = m.settings?.enabledLectures || false;
        hubTag = m.settings?.hubTag || '';
        academicYear = m.settings?.academicYear ?? academicYear;
        theme = m.settings?.theme || theme;
        matIcon = m.lectureMatIcons?.[0]
          || m.files?.[0]?.matIcon
          || HUB_THEME_PALETTE[theme]?.icon
          || matIcon;
      } catch { /* ignore */ }
    }

    const lectureCount = await countLecturesForSubject(rel);
    const hasLectures = lectureCount > 0;

    if(enabledLectures)
    {
      items.push({
      rel, title, subtitle, year, academicYear, hasLectures, lectureCount, theme, matIcon, hubTag,
    });
    }
  }

  return items.sort((a, b) => a.rel.localeCompare(b.rel, 'ar'));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderStubHtml(subject) {
  const msg = subject.hasLectures
    ? 'جاري تجهيز عرض المحاضرات — حاول لاحقاً.'
    : 'لا توجد محاضرات منشورة بعد لهذه المادة.';
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject.title)} — قريباً</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Noto Naskh Arabic', 'Source Serif 4', serif; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background: #f8fafc; color: #0f172a; text-align: center; }
    .box { max-width: 420px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 2rem 1.5rem; }
    h1 { font-size: 1.35rem; margin: 0 0 0.75rem; color: #111827; }
    p { color: #555; margin: 0 0 1.25rem; line-height: 1.7; }
    a { color: #2563eb; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
    .badge { display: inline-block; margin-bottom: 1rem; padding: 0.25rem 0.65rem; border-radius: 999px; background: #e0f2fe; color: #1d4ed8; font-size: 0.8rem; }
  </style>
${analyticsMetaTagsHtml()}
</head>
<body>
  <div class="box">
    <span class="badge">قيد الإعداد</span>
    <h1>${escapeHtml(subject.title)}</h1>
    <p>${escapeHtml(msg)}</p>
    <a href="../../index.html">← العودة للصفحة الرئيسية</a>
  </div>
</body>
</html>`;
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>} subjects */
async function ensureSubjectStubs(subjects) {
  let created = 0;
  for (const s of subjects) {
    const outIndex = path.join(DIST, s.rel, 'index.html');
    const builtManifest = path.join(DIST, s.rel, 'lectures/manifest.json');
    if (existsSync(builtManifest) || existsSync(outIndex)) continue;
    await mkdir(path.dirname(outIndex), { recursive: true });
    await writeFile(outIndex, renderStubHtml(s));
    created++;
  }
  return created;
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>} items @param {number} year */
function yearBlockStats(items, year) {
  const inYear = items.filter(s => (s.academicYear || Number(s.rel.match(/year-(\d)/)?.[1]) || 0) === year);
  const lectures = inYear.reduce((sum, s) => sum + s.lectureCount, 0);
  const ready = inYear.filter(s => s.hasLectures).length;
  return { subjects: inYear.length, lectures, ready };
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>[number]} s @param {number} year @param {number} staggerIdx */
function renderSubjectCard(s, year, staggerIdx) {
  const pending = !s.hasLectures;
  const countLabel = lectureCountLabel(s.lectureCount);
  const palette = HUB_THEME_PALETTE[s.theme] || HUB_THEME_PALETTE['amber-default'];
  const stagger = (staggerIdx * 0.07).toFixed(2);
  const tagHtml = s.hubTag
    ? `<span class="hub-card-wrap__tag">${escapeHtml(s.hubTag)}</span>`
    : '';

  return `
    <div class="hub-card-wrap">
      ${tagHtml}
      <a class="hub-card${pending ? ' hub-card--pending' : ''}" href="./${s.rel}/"
       data-progress-subject="${escapeHtml(s.rel)}" data-progress-total="${s.lectureCount}" data-progress-year="${year}"
         style="--card-primary:${palette.primary};--card-secondary:${palette.secondary};--card-tertiary:${palette.tertiary};--card-fixed:${palette.fixed};--card-on-fixed:${palette.onFixed};--stagger:${stagger}s"
         aria-label="${escapeHtml(s.title)}">
        <div class="hub-card__head">
          <div class="hub-card__icon" aria-hidden="true">
            <span class="material-symbols-outlined">${escapeHtml(s.matIcon)}</span>
          </div>
          <div class="hub-card__pills">
            <span class="hub-card__pill hub-card__pill--year">السنة ${toArabicDigits(year)}</span>
            <span class="hub-card__pill hub-card__pill--count" title="${escapeHtml(countLabel)}">${toArabicDigits(s.lectureCount)}</span>
          </div>
        </div>
        <h3 class="hub-card__title">${escapeHtml(s.title)}</h3>
        ${s.subtitle ? `<p class="hub-card__sub">${escapeHtml(s.subtitle)}</p>` : ''}
        ${s.year ? `<p class="hub-card__meta">${escapeHtml(s.year)}</p>` : ''}
        <div class="hub-card__chips">
          <span class="hub-card__chip">
            <span class="material-symbols-outlined">menu_book</span>
            ${escapeHtml(countLabel)}
          </span>
          ${pending ? '<span class="hub-card__chip hub-card__chip--pending">قيد الإعداد</span>' : ''}
        </div>
        <span class="hub-card__cta">
          ${pending ? 'عرض المادة' : 'فتح الدليل'}
          <span class="material-symbols-outlined">arrow_back</span>
        </span>
      </a>
    </div>`;
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>} subjects */
function renderHtml(subjects) {
  const byYear = {};
  for (const s of subjects) {
    const y = s.academicYear || Number(s.rel.match(/year-(\d)/)?.[1]) || 0;
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(s);
  }

  let cardIndex = 0;
  const totalLectures = subjects.reduce((sum, s) => sum + s.lectureCount, 0);
  const readySubjects = subjects.filter(s => s.hasLectures).length;

  const yearSections = Object.keys(byYear).sort((a, b) => Number(a) - Number(b)).map(y => {
    const yearNum = Number(y);
    const accent = YEAR_ACCENTS[yearNum] || YEAR_ACCENTS[1];
    const stats = yearBlockStats(subjects, yearNum);
    const cards = byYear[y].map(s => renderSubjectCard(s, yearNum, cardIndex++)).join('\n');
    return `
    <details id="year-${yearNum}" class="year-panel" data-year-progress="${yearNum}" style="--year-primary:${accent.primary};--year-secondary:${accent.secondary};--year-fixed:${accent.fixed}">
      <summary class="year-panel__header">
        <div class="year-panel__badge" aria-hidden="true">${toArabicDigits(y)}</div>
        <div class="year-panel__intro">
          <h2>السنة ${accent.label}</h2>
          <p class="year-panel__tagline">${toArabicDigits(stats.subjects)} مواد · ${toArabicDigits(stats.lectures)} محاضرة · ${toArabicDigits(stats.ready)} جاهزة</p>
          
        </div>
        <div class="year-panel__chips">
          <span class="year-panel__chip">
            <span class="material-symbols-outlined">folder</span>
            ${toArabicDigits(stats.subjects)} مادة
          </span>
          <span class="year-panel__chip">
            <span class="material-symbols-outlined">menu_book</span>
            ${toArabicDigits(stats.lectures)} محاضرة
          </span>
        </div>
        <span class="year-panel__toggle material-symbols-outlined" aria-hidden="true">expand_more</span>
      </summary>
      <div class="year-panel__body">
        <div class="grid">${cards}</div>
      </div>
    </details>`;
  }).join('\n');

  const heroStats = `
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat__icon material-symbols-outlined">school</span>
        <div>
          <strong>${toArabicDigits(subjects.length)}</strong>
          <span>مادة</span>
        </div>
      </div>
      <div class="hero-stat">
        <span class="hero-stat__icon material-symbols-outlined">menu_book</span>
        <div>
          <strong>${toArabicDigits(totalLectures)}</strong>
          <span>محاضرة</span>
        </div>
      </div>
      <div class="hero-stat">
        <span class="hero-stat__icon material-symbols-outlined">check_circle</span>
        <div>
          <strong>${toArabicDigits(readySubjects)}</strong>
          <span>جاهزة للدراسة</span>
        </div>
      </div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>دلائل الدراسة — Faculty Study Guides</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 1.25rem;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    @keyframes hub-fade-in-up {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    html, body {
      scroll-behavior: auto;
      scroll-padding-top: 80px;
    }
    html.hub-programmatic-scroll,
    html.hub-programmatic-scroll body {
      scroll-behavior: auto !important;
    }
    .hub-navbar {
      position: sticky;
      top: 0;
      z-index: 60;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      padding: 0.95rem 1.25rem;
      background: color-mix(in srgb, #ffffff 86%, #dbeafe);
      border-bottom: 1px solid #dbeafe;
      backdrop-filter: blur(14px);
    }
    .dark .hub-navbar {
      background: color-mix(in srgb, #111827 90%, #1f2937);
      border-bottom-color: color-mix(in srgb, #4f92ff 22%, #374151);
    }
    .hub-navbar__brand {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
    }
    .hub-navbar__brand-btn {
      color: #111827;
      background: transparent;
      border: 0;
      padding: 0;
      font: inherit;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: min(42vw, 20rem);
    }
    .dark .hub-navbar__brand-btn { color: #f8fafc; }
    .hub-navbar__links {
      display: flex;
      justify-content: center;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .hub-navbar__link {
      display: inline-flex;
      align-items: center;
      padding: 0.55rem 0.95rem;
      border-radius: 999px;
      color: #475569;
      text-decoration: none;
      transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }
    .hub-navbar__link:hover {
      background: color-mix(in srgb, #4f92ff 10%, transparent);
      color: #111827;
      transform: translateY(-1px);
    }
    .dark .hub-navbar__link { color: #cbd5e1; }
    .dark .hub-navbar__link:hover { color: #ffffff; }
    .hub-navbar__actions {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.35rem;
    }
    .hub-navbar__toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 999px;
      border: 1px solid #dbeafe;
      background: #ffffff;
      color: #475569;
      cursor: pointer;
      transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
    }
    .hub-navbar__toggle:hover {
      transform: translateY(-1px);
      background: #f8fafc;
      border-color: #bfdbfe;
    }
    .dark .hub-navbar__toggle {
      background: #111827;
      color: #bfdbfe;
      border-color: #374151;
    }
    .dark .hub-navbar__toggle:hover {
      background: #1f2937;
      border-color: #4f92ff;
    }
    body {
      font-family: 'Noto Naskh Arabic', 'Source Serif 4', serif;
      margin: 0;
      padding: 0 0 3rem;
      background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 55%, #f8fafc 100%);
      color: #0f172a;
      min-height: 100vh;
    }
    .dark,
    .dark body {
      background: linear-gradient(180deg, #0f172a 0%, #111827 55%, #0f172a 100%);
      color: #e2e8f0;
    }
    .page-hero {
      text-align: center;
      padding: 2.5rem 1.25rem 2rem;
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,146,255,.16) 0%, transparent 70%),
        linear-gradient(180deg, #fff 0%, #f8fafc 100%);
      border-bottom: 1px solid #dbeafe;
      margin-bottom: 2rem;
    }
    .dark .page-hero {
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,146,255,.12) 0%, transparent 70%),
        linear-gradient(180deg, #111827 0%, #0f172a 100%);
      border-bottom-color: rgba(79,146,255,.16);
    }
    .page-hero h1 {
      margin: 0 0 0.35rem;
      font-size: clamp(1.6rem, 4.5vw, 2.25rem);
      color: #111827;
      font-weight: 700;
    }
    .dark .page-hero h1 { color: #f8fafc; }
    .lead { color: #475569; margin: 0 0 1.5rem; font-size: 1.05rem; }
    .dark .lead { color: #cbd5e1; }
    .hero-stats {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.85rem;
      max-width: 720px;
      margin: 0 auto;
    }
    .hero-stat {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.75rem 1.1rem;
      border-radius: 1rem;
      background: #fff;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 16px -6px rgba(15,23,42,.08);
      min-width: 9rem;
    }
    .dark .hero-stat {
      background: #111827;
      border-color: rgba(148,163,184,.18);
      box-shadow: 0 4px 20px -8px rgba(0,0,0,.35);
    }
    .hero-stat__icon {
      font-size: 1.6rem !important;
      color: #2563eb;
      background: #e0f2fe;
      padding: 0.45rem;
      border-radius: 0.75rem;
    }
    .dark .hero-stat__icon {
      color: #bfdbfe;
      background: rgba(37,99,235,.18);
    }
    .hero-stat strong {
      display: block;
      font-size: 1.2rem;
      color: #111827;
      line-height: 1.2;
    }
    .dark .hero-stat strong { color: #f8fafc; }
    .hero-stat span {
      font-size: 0.78rem;
      color: #64748b;
    }
    .dark .hero-stat span { color: #94a3b8; }
    .year-panel {
      max-width: 1140px;
      margin: 0 auto 2rem;
      padding: 0 1rem;
      animation: hub-fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .year-panel:nth-of-type(2) { animation-delay: 0.08s; }
    .year-panel:nth-of-type(3) { animation-delay: 0.16s; }
    .year-panel:nth-of-type(4) { animation-delay: 0.24s; }
    .year-panel:nth-of-type(5) { animation-delay: 0.32s; }
    .year-panel:nth-of-type(6) { animation-delay: 0.4s; }
    .year-panel__header {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      padding: 1.15rem 1.35rem;
      border-radius: 1.25rem;
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--year-fixed) 80%, #fff) 0%,
        #fff 100%
      );
      border: 1px solid color-mix(in srgb, var(--year-primary) 16%, #e2e8f0);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      list-style: none;
    }
    .year-panel__header::-webkit-details-marker { display: none; }
    .year-panel[open] > .year-panel__header {
      border-radius: 1.25rem 1.25rem 0 0;
      border-bottom: none;
    }
    .year-panel__toggle {
      margin-inline-start: auto;
      color: var(--year-primary);
      transition: transform 0.2s ease;
    }
    .year-panel[open] .year-panel__toggle { transform: rotate(180deg); }
    .dark .year-panel__header {
      background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
      border-color: rgba(79,146,255,.16);
    }
    .year-panel__header::after {
      content: '';
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--year-primary), var(--year-secondary));
    }
    .year-panel__badge {
      flex-shrink: 0;
      width: 3.25rem;
      height: 3.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(145deg, var(--year-primary), var(--year-secondary));
      box-shadow: 0 6px 18px -4px color-mix(in srgb, var(--year-primary) 45%, transparent);
    }
    .year-panel__intro { flex: 1; min-width: 10rem; }
    .year-panel__intro h2 {
      margin: 0 0 0.2rem;
      font-size: 1.2rem;
      color: var(--year-primary);
      font-weight: 700;
    }
    .dark .year-panel__intro h2 { color: #ffffff; }
    .year-panel__tagline {
      margin: 0;
      font-size: 0.85rem;
      color: #475569;
    }
    .dark .year-panel__tagline { color: #cbd5e1; }
    
    .year-panel__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-inline-start: auto;
    }
    .year-panel__chip {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      background: color-mix(in srgb, var(--year-fixed) 60%, #fff);
      color: color-mix(in srgb, var(--year-primary) 85%, #333);
      font-size: 0.78rem;
      font-weight: 600;
      border: 1px solid color-mix(in srgb, var(--year-primary) 15%, transparent);
    }
    .dark .year-panel__chip {
      background: rgba(15,23,42,.85);
      color: #e2e8f0;
      border-color: rgba(148,163,184,.18);
    }
    .year-panel__chip .material-symbols-outlined { font-size: 1rem; }
    .year-panel__body {
      padding: 1.25rem;
      border-radius: 0 0 1.25rem 1.25rem;
      background: #fff;
      border: 1px solid color-mix(in srgb, var(--year-primary) 16%, #e8e4dc);
      border-top: 1px dashed color-mix(in srgb, var(--year-primary) 12%, #e8e4dc);
      box-shadow: 0 10px 32px -14px color-mix(in srgb, var(--year-primary) 18%, transparent);
    }
    .dark .year-panel__body {
      background: #0f172a;
      border-color: rgba(148,163,184,.16);
      border-top-color: rgba(148,163,184,.16);
      box-shadow: 0 10px 32px -14px rgba(0,0,0,.45);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }
    .hub-card-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .hub-card-wrap__tag {
      align-self: flex-start;
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
      background: #fef3c7;
      color: #b45309;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      border: 1px solid #fcd34d;
      line-height: 1.4;
    }
    .dark .hub-card-wrap__tag {
      background: rgba(245, 158, 11, 0.16);
      color: #fbbf24;
      border-color: rgba(251, 191, 36, 0.35);
    }
    .hub-card {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 1.5rem 1.5rem 1.35rem;
      border-radius: 1.25rem;
      text-decoration: none;
      color: inherit;
      text-align: right;
      border: 1px solid color-mix(in srgb, var(--card-primary) 18%, #e2e8f0);
      background: linear-gradient(
        165deg,
        color-mix(in srgb, var(--card-fixed) 55%, #fff) 0%,
        #fff 58%
      );
      box-shadow: 0 8px 28px -10px color-mix(in srgb, var(--card-primary) 22%, transparent);
      opacity: 0;
      animation: hub-fade-in-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: var(--stagger, 0s);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .dark .hub-card {
      background: linear-gradient(165deg, #111827 0%, #0f172a 58%);
      border-color: rgba(148,163,184,.18);
      box-shadow: 0 8px 28px -10px rgba(0,0,0,.45);
    }
    .hub-card::before {
      content: '';
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--card-primary), var(--card-secondary), var(--card-tertiary));
      opacity: 0.9;
    }
    .hub-card:hover {
      transform: translateY(-4px);
      border-color: color-mix(in srgb, var(--card-primary) 38%, #e2e8f0);
      box-shadow: 0 14px 36px -12px color-mix(in srgb, var(--card-primary) 28%, transparent);
    }
    .hub-card:hover .hub-card__icon {
      transform: scale(1.08) rotate(-3deg);
    }
    .hub-card:hover .hub-card__title { color: var(--card-primary); }
    .dark .hub-card:hover .hub-card__title {
      color: #f8fafc;
      text-shadow: 0 1px 10px rgba(15,23,42,.35);
    }
    .hub-card:hover .hub-card__cta .material-symbols-outlined { transform: translateX(-4px); }
    .hub-card--pending {
      border-style: dashed;
      background: linear-gradient(165deg, #f8fafc 0%, #fff 58%);
      box-shadow: 0 6px 20px -12px rgba(0,0,0,.12);
    }
    .dark .hub-card--pending {
      background: linear-gradient(165deg, #0f172a 0%, #111827 58%);
      box-shadow: 0 6px 20px -12px rgba(0,0,0,.28);
    }
    .hub-card__head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .hub-card__icon {
      flex-shrink: 0;
      width: 3.5rem;
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      background: linear-gradient(145deg, var(--card-fixed), color-mix(in srgb, var(--card-primary) 12%, #fff));
      color: var(--card-primary);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--card-primary) 14%, transparent);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .hub-card__icon .material-symbols-outlined { font-size: 2rem; }
    .hub-card__pills {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4rem;
    }
    .hub-card__pill {
      display: inline-flex;
      align-items: center;
      padding: 0.28rem 0.65rem;
      border-radius: 0.65rem;
      font-size: 0.78rem;
      font-weight: 600;
      line-height: 1.2;
    }
    .hub-card__pill--year {
      background: color-mix(in srgb, var(--card-secondary) 12%, #fff);
      color: var(--card-secondary);
    }
    .hub-card__pill--count {
      background: var(--card-primary);
      color: #fff;
      min-width: 2rem;
      justify-content: center;
      box-shadow: 0 2px 10px color-mix(in srgb, var(--card-primary) 35%, transparent);
    }
    .hub-card--pending .hub-card__pill--count {
      background: #64748b;
      box-shadow: 0 2px 8px rgba(100,116,139,.22);
    }
    .hub-card__title {
      margin: 0 0 0.4rem;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--card-on-fixed);
      transition: color 0.2s ease;
      line-height: 1.45;
    }
    .dark .hub-card__title { color: #f8fafc; }
    .hub-card__sub {
      margin: 0 0 0.35rem;
      font-size: 0.9rem;
      color: #475569;
      line-height: 1.55;
    }
    .dark .hub-card__sub { color: #cbd5e1; }
    .hub-card__meta {
      margin: 0 0 0.75rem;
      font-size: 0.78rem;
      color: #64748b;
    }
    .dark .hub-card__meta { color: #94a3b8; }
    .hub-card__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-bottom: 1rem;
    }
    .hub-card__chip {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.3rem 0.65rem;
      border-radius: 999px;
      background: #f1f5f9;
      color: #475569;
      font-size: 0.78rem;
    }
    .dark .hub-card__chip {
      background: rgba(15,23,42,.92);
      color: #cbd5e1;
    }
    .hub-card__chip .material-symbols-outlined { font-size: 1rem; color: var(--card-primary); }
    .hub-card__chip--pending {
      background: #e0f2fe;
      color: #1d4ed8;
    }
    .dark .hub-card__chip--pending {
      background: rgba(37,99,235,.18);
      color: #bfdbfe;
    }
    
    .dark .hub-card__cta {
      color: #bfdbfe;
    }
    .hub-card__cta .material-symbols-outlined {
      font-size: 1.15rem;
      transition: transform 0.2s ease;
      color: currentColor;
    }
    .dark .hub-card:hover .hub-card__cta {
      color: #ffffff;
    }
    .empty { text-align: center; color: #888; padding: 3rem; }
    @media (prefers-reduced-motion: reduce) {
      html, body { scroll-behavior: auto !important; }
      .hub-card, .year-panel {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .hub-card:hover { transform: none; }
      .hub-card:hover .hub-card__icon { transform: none; }
    }
    @media (max-width: 767px) {
      html, body { scroll-padding-top: 56px; }
      .hub-navbar {
        gap: 0.35rem;
        padding: 0.45rem 0.65rem;
        grid-template-columns: minmax(0, 1fr) auto;
      }
      .hub-navbar__brand-btn {
        font-size: 0.8125rem;
        font-weight: 700;
        max-width: min(72vw, 14rem);
      }
      .hub-navbar__links {
        display: none;
      }
      .hub-navbar__toggle {
        width: 2.25rem;
        height: 2.25rem;
      }
      .hub-navbar__toggle .material-symbols-outlined {
        font-size: 1.2rem;
      }
      .page-hero {
        padding: 1rem 0.75rem 0.875rem;
        margin-bottom: 1.25rem;
      }
      .page-hero h1 {
        font-size: 1.125rem;
        line-height: 1.45;
      }
      .lead {
        font-size: 0.8125rem;
        margin-bottom: 0.875rem;
      }
      .hero-stats {
        gap: 0.5rem;
      }
      .hero-stat {
        min-width: 0;
        flex: 1 1 calc(50% - 0.5rem);
        padding: 0.55rem 0.65rem;
        border-radius: 0.75rem;
      }
      .hero-stat__icon {
        font-size: 1.25rem !important;
        padding: 0.3rem;
      }
      .hero-stat strong {
        font-size: 0.9375rem;
      }
      .hero-stat span {
        font-size: 0.6875rem;
      }
    }
    @media (max-width: 640px) {
      .year-panel__header { flex-direction: column; align-items: flex-start; }
      .year-panel__chips { margin-inline-start: 0; }
    }
  </style>
${analyticsMetaTagsHtml()}
</head>
<body>
  <nav class="hub-navbar" aria-label="التنقل الرئيسي">
    <div class="hub-navbar__brand">
      <button class="hub-navbar__brand-btn" type="button" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">دلائل الدراسة</button>
    </div>
    <div class="hub-navbar__links">
      ${Object.keys(byYear)
        .sort((a, b) => Number(a) - Number(b))
        .map(
          (y) =>
            `<a class="hub-navbar__link" href="#" data-scroll-target="year-${Number(y)}">السنة ${toArabicDigits(y)}</a>`,
        )
        .join("")}
    </div>
    <div class="hub-navbar__actions">
      <button class="hub-navbar__toggle" type="button" id="hubThemeToggle" aria-label="تبديل المظهر" aria-pressed="false">
        <span class="material-symbols-outlined" id="hubThemeIcon" aria-hidden="true">dark_mode</span>
      </button>
    </div>
  </nav>
  <header class="page-hero">
    <h1>دلائل الدراسة التفاعلية</h1>
    <p class="lead">اختر المادة للبدء</p>
    ${subjects.length ? heroStats : ''}
  </header>
  <main>
  ${subjects.length ? yearSections : '<p class="empty">لا توجد مواد بعد.</p>'}
  </main>
  <script>
    (function () {
      const key = 'study-guide-theme';
      const progressKey = 'study-guide-progress-v1';
      const toggle = document.getElementById('hubThemeToggle');
      const icon = document.getElementById('hubThemeIcon');
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

      function syncTheme(theme) {
        const dark = theme === 'dark';
        document.documentElement.classList.toggle('dark', dark);
        document.body?.classList.toggle('dark', dark);
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
        if (toggle) toggle.setAttribute('aria-pressed', String(dark));
        if (icon) icon.textContent = dark ? 'light_mode' : 'dark_mode';
      }

      try {
        const saved = localStorage.getItem(key);
        const dark = saved ? saved === 'dark' : true;
        syncTheme(dark ? 'dark' : 'light');
        if (!saved) localStorage.setItem(key, 'dark');
      } catch {
        syncTheme('dark');
      }

      if (toggle) {
        toggle.addEventListener('click', () => {
          const dark = !document.documentElement.classList.contains('dark');
          const next = dark ? 'dark' : 'light';
          syncTheme(next);
          try {
            localStorage.setItem(key, next);
          } catch {}
        });
      }

      function toArabicDigitsLocal(value) {
        return String(value).replace(/\d/g, (digit) => arabicDigits[Number(digit)] || digit);
      }

      function readProgressStore() {
        try {
          const raw = localStorage.getItem(progressKey);
          if (!raw) return { subjects: {} };
          const parsed = JSON.parse(raw);
          if (!parsed || typeof parsed !== 'object') return { subjects: {} };
          if (!parsed.subjects || typeof parsed.subjects !== 'object') return { subjects: {} };
          return parsed;
        } catch {
          return { subjects: {} };
        }
      }

      function subjectDoneCount(store, subjectKey, total) {
        const rawState = store.subjects?.[subjectKey];
        if (!rawState || typeof rawState !== 'object') return 0;

        const completedMap = rawState.completed && typeof rawState.completed === 'object'
          ? rawState.completed
          : rawState;

        const done = Object.keys(completedMap || {}).length;
        return Math.max(0, Math.min(Number(total) || 0, done));
      }

      function applyProgressUi() {
        const store = readProgressStore();

        document.querySelectorAll('[data-progress-subject]').forEach((card) => {
          const subjectKey = card.getAttribute('data-progress-subject') || '';
          const total = Number(card.getAttribute('data-progress-total') || '0');
          const done = subjectDoneCount(store, subjectKey, total);
          const percent = total > 0 ? Math.round((done / total) * 100) : 0;

          const fill = card.querySelector('[data-progress-fill]');
          const doneText = card.querySelector('[data-progress-done]');
          const totalText = card.querySelector('[data-progress-total]');

          if (fill) fill.style.width = percent + '%';
          if (doneText) doneText.textContent = toArabicDigitsLocal(done);
          if (totalText) totalText.textContent = toArabicDigitsLocal(total);
        });

        document.querySelectorAll('[data-year-progress]').forEach((panel) => {
          const year = panel.getAttribute('data-year-progress');
          const cards = panel.querySelectorAll('[data-progress-year="' + year + '"]');

          let done = 0;
          let total = 0;
          cards.forEach((card) => {
            const lectureTotal = Number(card.getAttribute('data-progress-total') || '0');
            const subjectKey = card.getAttribute('data-progress-subject') || '';
            total += lectureTotal;
            done += subjectDoneCount(store, subjectKey, lectureTotal);
          });

          const percent = total > 0 ? Math.round((done / total) * 100) : 0;
          const fill = panel.querySelector('[data-year-progress-fill]');
          const doneText = panel.querySelector('[data-year-progress-done]');
          const totalText = panel.querySelector('[data-year-progress-total]');

          if (fill) fill.style.width = percent + '%';
          if (doneText) doneText.textContent = toArabicDigitsLocal(done);
          if (totalText) totalText.textContent = toArabicDigitsLocal(total);
        });
      }

      applyProgressUi();

      window.addEventListener('storage', (event) => {
        if (event.key === key && typeof event.newValue === 'string') syncTheme(event.newValue);
        if (event.key === progressKey) applyProgressUi();
      });

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let scrollAnimFrame = null;
      const SCROLL_DURATION_MS = 1200;
      const SCROLL_PADDING_PX = 80;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function setScrollY(y) {
        try {
          window.scrollTo({ top: y, left: 0, behavior: 'instant' });
        } catch {
          window.scrollTo(0, y);
        }
      }

      function targetYFor(el) {
        return Math.max(
          0,
          el.getBoundingClientRect().top + window.scrollY - SCROLL_PADDING_PX,
        );
      }

      function smoothScrollToY(targetY, duration) {
        if (scrollAnimFrame) cancelAnimationFrame(scrollAnimFrame);

        const root = document.documentElement;
        root.classList.add('hub-programmatic-scroll');
        root.style.scrollBehavior = 'auto';

        const startY = window.scrollY;
        const distance = targetY - startY;

        if (Math.abs(distance) < 2) {
          root.classList.remove('hub-programmatic-scroll');
          root.style.removeProperty('scroll-behavior');
          return;
        }

        const startTime = performance.now();

        function finish() {
          scrollAnimFrame = null;
          setScrollY(targetY);
          root.classList.remove('hub-programmatic-scroll');
          root.style.removeProperty('scroll-behavior');
        }

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          setScrollY(startY + distance * easeInOutCubic(progress));
          if (progress < 1) scrollAnimFrame = requestAnimationFrame(step);
          else finish();
        }

        scrollAnimFrame = requestAnimationFrame(step);
      }

      document.querySelectorAll('.hub-navbar__link[data-scroll-target]').forEach((link) => {
        link.addEventListener(
          'click',
          (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            const id = link.dataset.scrollTarget;
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            if (target.tagName === 'DETAILS') target.open = true;
            const targetY = targetYFor(target);
            if (prefersReducedMotion) {
              setScrollY(targetY);
            } else {
              smoothScrollToY(targetY, SCROLL_DURATION_MS);
            }
            history.pushState(null, '', \`#\${id}\`);
          },
          true,
        );
      });
    })();
  </script>
${hubAnalyticsScriptHtml()}
</body>
</html>`;
}

async function main() {
  await mkdir(DIST, { recursive: true });
  const subjects = await collectHubSubjects();
  const stubs = await ensureSubjectStubs(subjects);
  const html = patchAnalyticsHtml(renderHtml(subjects));
  await writeFile(path.join(DIST, 'index.html'), html);
  console.log(`✓ dist/index.html (${subjects.length} subject(s), ${stubs} stub(s))`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

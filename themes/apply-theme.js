/**
 * Apply subject site settings from lectures/manifest.json
 *
 * manifest.settings:
 *   theme        — theme id from themes.json (default: amber-default)
 *   subjectName  — Arabic subject name
 *   subjectNameEn — English subject name (optional)
 *   year         — academic year e.g. "2025-2026"
 *   department   — optional section label
 */

const THEME_LINK_ID = 'siteTheme';
const DEFAULT_THEME = 'amber-default';

/** @type {Record<string, string>|null} */
let themeCatalog = null;

/**
 * @param {string} [basePath] — relative path from subject site to lecture-site-engine/themes/
 */
export async function loadThemeCatalog(basePath = '../lecture-site-engine/themes/') {
  if (themeCatalog) return themeCatalog;
  try {
    const res = await fetch(`${basePath}themes.json`);
    if (!res.ok) return {};
    const data = await res.json();
    themeCatalog = Object.fromEntries((data.themes || []).map(t => [t.id, t.file]));
    return themeCatalog;
  } catch {
    return {};
  }
}

/**
 * Switch palette CSS file.
 * @param {string} themeId
 * @param {string} [basePath]
 */
export function applyTheme(themeId, basePath = '../lecture-site-engine/themes/') {
  const id = themeId || DEFAULT_THEME;
  const link = document.getElementById(THEME_LINK_ID);
  const file = id === DEFAULT_THEME ? 'amber-default.css' : `${id}.css`;

  if (link) {
    link.href = `${basePath}${file}`;
  }

  document.documentElement.dataset.theme = id;
  return id;
}

/**
 * Apply manifest settings to DOM (theme, titles, year).
 * @param {object} manifest
 * @param {object} [options]
 * @param {string} [options.basePath]
 * @param {string} [options.defaultTheme]
 * @param {object} [options.guideConfig] — GUIDE_CONFIG fallback for title/subtitle
 */
export function applySiteSettings(manifest, options = {}) {
  const settings = manifest?.settings || {};
  const guideConfig = options.guideConfig || {};
  const basePath = options.basePath || '../lecture-site-engine/themes/';

  const themeId = settings.theme || options.defaultTheme || DEFAULT_THEME;
  applyTheme(themeId, basePath);

  const subjectName = settings.subjectName || manifest.title || guideConfig.defaultTitle || '';
  const subjectNameEn = settings.subjectNameEn || '';
  const year = settings.year || '';
  const subtitle = manifest.subtitle || guideConfig.defaultSubtitle || '';

  const displayTitle = subjectNameEn
    ? `${subjectName} — ${subjectNameEn}`
    : subjectName;

  if (displayTitle) {
    document.title = year ? `${displayTitle} (${year})` : displayTitle;
  }

  const homeTitle = document.getElementById('homeTitle');
  const homeSubtitle = document.getElementById('homeSubtitle');
  const heroSub = document.getElementById('heroSub');
  const appBrand = document.getElementById('appBrand');
  const appBrandShort = document.getElementById('appBrandShort');
  const siteYear = document.getElementById('siteYear');
  const siteSubject = document.getElementById('siteSubject');
  const aiSubject = document.getElementById('aiDisclaimerSubject');

  const headerBrand = guideConfig.homeHeaderBrand || subjectName || manifest.title || '';
  const headerBrandShort = headerBrand.includes(' - ')
    ? headerBrand.split(' - ')[0].trim()
    : headerBrand;

  if (homeTitle) homeTitle.textContent = subjectName || manifest.title || '';
  if (homeSubtitle) homeSubtitle.textContent = subtitle;
  if (heroSub) heroSub.textContent = subtitle;
  if (appBrand) appBrand.textContent = headerBrand;
  if (appBrandShort) appBrandShort.textContent = headerBrandShort || 'موقع تفاعلي';
  if (siteYear) siteYear.textContent = year;
  if (siteSubject) siteSubject.textContent = subjectName;
  if (aiSubject) aiSubject.textContent = subjectName || manifest.title || '';

  return {
    themeId,
    subjectName,
    subjectNameEn,
    year,
    title: displayTitle,
    subtitle,
  };
}

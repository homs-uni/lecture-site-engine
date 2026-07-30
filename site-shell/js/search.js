/**
 * Client‑side full‑text search with auto‑complete.
 *
 * Loads the build‑time search index (lectures/search-index.json) once on
 * first search interaction, then filters + ranks entirely on the client.
 */

let searchIndex = null;          // { version, entries: SearchEntry[] }
let searchIndexLoading = null;   // singleton promise

/** @typedef {{ id:string, lecId:string, lecNum:number, lecTitle:string, kind:string, context:string, title:string, text:string }} SearchEntry */

function versionedUrl(path) {
  const meta = document.querySelector('meta[name="site-build-id"]');
  const buildId = meta?.getAttribute('content') || '';
  if (!buildId) return path;
  return `${path}?v=${encodeURIComponent(buildId)}`;
}

/**
 * Ensure the search index is loaded.
 * @returns {Promise<SearchEntry[]>}
 */
export async function ensureSearchIndex() {
  if (searchIndex) return searchIndex.entries;
  if (searchIndexLoading) return searchIndexLoading;

  searchIndexLoading = (async () => {
    try {
      const res = await fetch(versionedUrl('lectures/search-index.json'), { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      searchIndex = data;
      return data.entries || [];
    } catch (err) {
      console.warn('Search index not available:', err.message);
      searchIndex = { entries: [] };
      return [];
    } finally {
      searchIndexLoading = null;
    }
  })();

  return searchIndexLoading;
}

/**
 * Score an entry against a normalized query.
 * Higher = better match.
 *
 * Kind boosts only apply after a real title/context/text hit — otherwise every
 * lecture/part/section would rank for every query and bury content matches
 * (especially painful on large subjects like databases-2).
 */
function scoreEntry(entry, query, queryLower) {
  const title = (entry.title || '').trim();
  const text = (entry.text || '').trim();
  const titleLower = title.toLowerCase();
  const textLower = text.toLowerCase();
  const contextLower = (entry.context || '').toLowerCase();

  let score = 0;

  // Exact prefix match on title (best)
  if (titleLower.startsWith(queryLower)) {
    score += 100;
    // Exact full match
    if (titleLower === queryLower) score += 50;
  }

  // Title contains query
  if (fieldMatches(titleLower, queryLower)) {
    score += 60;
  }

  // Context match (section / part names)
  if (fieldMatches(contextLower, queryLower)) {
    score += 20;
  }

  // Full text match
  if (fieldMatches(textLower, queryLower)) {
    if (entry.kind === 'content') {
      score += 25;
    } else {
      score += 30;
    }
  }

  // No textual hit → not a result (do not rank by kind alone)
  if (score === 0) return 0;

  // Boost by entry kind (only for real matches)
  switch (entry.kind) {
    case 'lecture':  score += 40; break;
    case 'part':     score += 25; break;
    case 'section':  score += 10; break;
  }

  // Prefer shorter titles (likely more relevant)
  if (title.length > 0) {
    score += Math.max(0, 30 - title.length) * 0.5;
  }

  return score;
}

/** Escape a string for use inside a RegExp. */
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Field match helper.
 * Latin/ASCII token queries use word-ish boundaries so "aries" does not hit
 * "boundaries". Arabic / mixed queries keep substring includes().
 */
function fieldMatches(haystackLower, queryLower) {
  if (!haystackLower || !queryLower) return false;
  if (!haystackLower.includes(queryLower)) return false;
  if (/^[a-z0-9][a-z0-9+._/-]*$/i.test(queryLower)) {
    const re = new RegExp(
      `(^|[^a-z0-9+])${escapeRegExp(queryLower)}($|[^a-z0-9+])`,
      'i',
    );
    return re.test(haystackLower);
  }
  return true;
}

/**
 * Rank entries against a query (pure — no fetch).
 * @param {SearchEntry[]} entries
 * @param {string} query
 * @param {number} [max=20]
 * @returns {{ entry: SearchEntry, score: number }[]}
 */
export function searchEntries(entries, query, max = 20) {
  if (!query || !query.trim() || !entries?.length) return [];

  const q = query.trim().slice(0, 200);
  const qLower = q.toLowerCase();

  const scored = [];
  for (const entry of entries) {
    const score = scoreEntry(entry, q, qLower);
    if (score > 0) scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, max);
}

/**
 * Search the index.
 * @param {string} query      User input
 * @param {number} [max=20]   Max results
 * @returns {Promise<{ entry: SearchEntry, score: number }[]>}
 */
export async function search(query, max = 20) {
  const entries = await ensureSearchIndex();
  return searchEntries(entries, query, max);
}

/**
 * Navigate to a search result.
 * Calls the host app's navigation — expects a global or imported navigateTo function.
 *
 * @param {SearchEntry} entry
 * @param {(lecId:string, anchor?:string) => void} navigateTo
 */
export function navigateToEntry(entry, navigateTo) {
  if (!entry || !entry.id) return;
  navigateTo(entry.lecId, entry.id);
}

/**
 * Build a plain‑text preview snippet around the first match.
 */
export function snippet(entry, query, maxLen = 80) {
  const text = entry.text || '';
  const q = query.trim().toLowerCase();
  if (!q || !text) return truncate(text, maxLen);

  const textLower = text.toLowerCase();
  let idx = -1;
  if (fieldMatches(textLower, q)) {
    idx = textLower.indexOf(q);
  }
  if (idx < 0) return truncate(text, maxLen);

  const start = Math.max(0, idx - Math.floor((maxLen - q.length) / 2));
  const end = Math.min(text.length, start + maxLen);
  let out = text.slice(start, end);

  if (start > 0) out = '…' + out;
  if (end < text.length) out = out + '…';
  return out;
}

function truncate(s, max) {
  if (s.length <= max) return s;
  return s.slice(0, max) + '…';
}

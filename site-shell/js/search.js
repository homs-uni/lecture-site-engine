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

  // Title contains query as a word
  if (titleLower.includes(queryLower)) {
    score += 60;
  }

  // Context match (section / part names)
  if (contextLower.includes(queryLower)) {
    score += 20;
  }

  // Full text match
  if (textLower.includes(queryLower)) {
    // For content entries, lower weight
    if (entry.kind === 'content') {
      score += 5;
    } else {
      score += 30;
    }
  }

  // Boost by entry kind
  switch (entry.kind) {
    case 'lecture':  score += 40; break;
    case 'part':     score += 25; break;
    case 'section':  score += 10; break;
  }

  // Prefer shorter titles (likely more relevant)
  if (score > 0 && title.length > 0) {
    score += Math.max(0, 30 - title.length) * 0.5;
  }

  return score;
}

/**
 * Search the index.
 * @param {string} query      User input
 * @param {number} [max=20]   Max results
 * @returns {Promise<{ entry: SearchEntry, score: number }[]>}
 */
export async function search(query, max = 20) {
  const entries = await ensureSearchIndex();
  if (!query || !query.trim() || !entries.length) return [];

  const q = query.trim().slice(0, 200);
  const qLower = q.toLowerCase();

  const scored = [];

  for (const entry of entries) {
    const score = scoreEntry(entry, q, qLower);
    if (score > 0) {
      scored.push({ entry, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, max);
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

  const idx = text.toLowerCase().indexOf(q);
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

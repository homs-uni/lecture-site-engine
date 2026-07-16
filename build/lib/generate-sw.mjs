/**
 * Emit a per-subject service worker with a versioned cache (buildId).
 * Old caches are deleted on activate so deploys do not serve stale assets.
 */
import { readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

async function listJsFiles(dir, base = dir) {
  /** @type {string[]} */
  const out = [];
  if (!existsSync(dir)) return out;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...await listJsFiles(full, base));
    } else if (ent.isFile() && ent.name.endsWith('.js')) {
      out.push('./' + path.relative(base, full).split(path.sep).join('/'));
    }
  }
  return out.sort();
}

async function listThemeCss(dir) {
  if (!existsSync(dir)) return [];
  const names = await readdir(dir);
  return names
    .filter(n => n.endsWith('.css'))
    .map(n => `./themes/${n}`)
    .sort();
}

/**
 * @param {string} outDir
 * @param {{ buildId: string, cachePrefix: string }} opts
 */
export async function generateServiceWorker(outDir, { buildId, cachePrefix }) {
  const rendererJs = await listJsFiles(path.join(outDir, 'engine/renderer'), path.join(outDir, 'engine/renderer'));
  const rendererPaths = rendererJs.map(p => `./engine/renderer/${p.replace(/^\.\//, '')}`);

  const shellAssets = [
    './',
    './index.html',
    './js/app.js',
    './js/analytics.js',
    './js/lecture-routing.js',
    './js/equations.js',
    './js/guide-config.js',
    './js/progress_tracker.js',
    './css/styles.css',
    './css/tailwind-config.js',
    './themes/apply-theme.js',
    './themes/themes.json',
    './sw.js',
    ...await listThemeCss(path.join(outDir, 'themes')),
    ...rendererPaths,
  ];

  const uniqueShell = [...new Set(shellAssets)];

  const sw = `/* generated — do not edit; rebuild subject to update */
const BUILD_ID = ${JSON.stringify(buildId)};
const CACHE_PREFIX = ${JSON.stringify(cachePrefix || 'study-guide')};
const SHELL_CACHE = \`\${CACHE_PREFIX}-shell-\${BUILD_ID}\`;
const LECTURES_CACHE = \`\${CACHE_PREFIX}-lectures-\${BUILD_ID}\`;
const SHELL_ASSETS = ${JSON.stringify(uniqueShell, null, 2)};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[sw] precache failed', err)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((key) => {
          if (key.startsWith(CACHE_PREFIX) && !key.includes(BUILD_ID)) {
            return caches.delete(key);
          }
          return undefined;
        }),
      ))
      .then(() => self.clients.claim()),
  );
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw new Error('offline');
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  if (cached) {
    void networkPromise;
    return cached;
  }
  const fresh = await networkPromise;
  if (fresh) return fresh;
  return new Response('{"error":"offline"}', {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isLectureJson(url) {
  return /\\/lectures\\/[^/]+\\.json$/i.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.endsWith('/lectures/manifest.json')) {
    event.respondWith(networkFirst(request, LECTURES_CACHE));
    return;
  }

  if (isLectureJson(url)) {
    event.respondWith(staleWhileRevalidate(request, LECTURES_CACHE));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, SHELL_CACHE));
    return;
  }

  const rel = url.pathname.replace(self.registration.scope.replace(/\\/$/, ''), '') || '/';
  const relPath = rel.startsWith('/') ? '.' + rel : './' + rel;
  if (SHELL_ASSETS.some((asset) => relPath === asset || relPath.endsWith(asset.replace(/^\\.\\//, '')))) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
  }
});
`;

  await writeFile(path.join(outDir, 'sw.js'), sw);
}

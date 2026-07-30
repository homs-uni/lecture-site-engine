/**
 * Inject PostHog project key/host into built HTML (meta placeholders).
 * Empty key → analytics.js no-ops (local/dev without secrets).
 */
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const POSTHOG_KEY_PLACEHOLDER = '__POSTHOG_KEY__';
export const POSTHOG_HOST_PLACEHOLDER = '__POSTHOG_HOST__';
export const DEFAULT_POSTHOG_HOST = 'https://eu.i.posthog.com';
export const CLARITY_PROJECT_ID = 'xim6tigbcd';

/** @returns {{ key: string, host: string }} */
export function resolvePosthogConfig() {
  const key = (process.env.POSTHOG_KEY || '').trim();
  const host = (process.env.POSTHOG_HOST || '').trim() || DEFAULT_POSTHOG_HOST;
  return { key, host };
}

/** Escape for use inside double-quoted HTML attribute values. */
export function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Microsoft Clarity loader (heatmaps / session recordings). */
export function claritySnippetHtml(projectId = CLARITY_PROJECT_ID) {
  const id = String(projectId).replace(/[^a-zA-Z0-9]/g, '');
  return `<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;
    t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${id}");
</script>`;
}

/**
 * Replace PostHog placeholders / meta content in an HTML string.
 * Safe to run repeatedly (updates existing meta tags even after first patch).
 * @param {string} html
 * @param {{ key?: string, host?: string }} [config]
 */
export function patchAnalyticsHtml(html, config = resolvePosthogConfig()) {
  const key = escapeHtmlAttr(config.key ?? '');
  const host = escapeHtmlAttr(config.host || DEFAULT_POSTHOG_HOST);
  let out = html
    .replaceAll(POSTHOG_KEY_PLACEHOLDER, key)
    .replaceAll(POSTHOG_HOST_PLACEHOLDER, host);

  out = out.replace(
    /(<meta\s+name=["']posthog-key["']\s+content=["'])[^"']*(["'])/i,
    `$1${key}$2`,
  );
  out = out.replace(
    /(<meta\s+name=["']posthog-host["']\s+content=["'])[^"']*(["'])/i,
    `$1${host}$2`,
  );
  return out;
}

/**
 * Meta tags + Clarity loader for hub / stub HTML generators.
 */
export function analyticsMetaTagsHtml(config = resolvePosthogConfig()) {
  const key = escapeHtmlAttr(config.key ?? '');
  const host = escapeHtmlAttr(config.host || DEFAULT_POSTHOG_HOST);
  return `  ${claritySnippetHtml()}
  <meta name="analytics-provider" content="posthog+clarity">
  <meta name="posthog-key" content="${key}">
  <meta name="posthog-host" content="${host}">`;
}

/**
 * Clarity (always) + PostHog hub events when key is set.
 */
export function hubAnalyticsScriptHtml(config = resolvePosthogConfig()) {
  const key = JSON.stringify(config.key ?? '');
  const host = JSON.stringify(config.host || DEFAULT_POSTHOG_HOST);
  return `<script>
(function () {
  var KEY = ${key};
  var HOST = ${host};

  function siteEnv() {
    var h = location.hostname || '';
    if (!h || h === 'localhost' || h === '127.0.0.1') return 'local';
    if (h.indexOf('netlify') !== -1) return 'sandbox';
    return 'production';
  }

  function clarityEvent(name) {
    try {
      if (typeof window.clarity === 'function') window.clarity('event', name);
    } catch (e) {}
  }

  function claritySet(k, v) {
    if (v == null || v === '') return;
    try {
      if (typeof window.clarity === 'function') window.clarity('set', k, String(v));
    } catch (e) {}
  }

  var env = siteEnv();
  claritySet('content_type', 'hub');
  claritySet('site_env', env);
  claritySet('page', '/hub');
  clarityEvent('hub_pageview');

  document.querySelectorAll('a.hub-card[data-progress-subject]').forEach(function (card) {
    card.addEventListener('click', function () {
      var subjectId = card.getAttribute('data-progress-subject') || '';
      var year = card.getAttribute('data-progress-year') || '';
      claritySet('subject_id', subjectId);
      claritySet('year', year);
      clarityEvent('hub_subject_click');
    });
  });

  if (!KEY) return;

  (function (t, e) {
    if (e.__SV) return;
    window.posthog = e;
    e._i = [];
    e.init = function (i, s, a) {
      function g(u, n) {
        var o = n.split('.');
        if (o.length === 2) { u = u[o[0]]; n = o[1]; }
        u[n] = function () { u.push([n].concat(Array.prototype.slice.call(arguments, 0))); };
      }
      var p = t.createElement('script');
      p.type = 'text/javascript';
      p.async = true;
      p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
      var r = t.getElementsByTagName('script')[0];
      r.parentNode.insertBefore(p, r);
      var u = a !== undefined ? (e[a] = []) : ((a = 'posthog'), e);
      u.people = u.people || [];
      u.toString = function (t2) {
        var x = 'posthog';
        if (a !== 'posthog') x += '.' + a;
        if (!t2) x += ' (stub)';
        return x;
      };
      u.people.toString = function () { return u.toString(1) + '.people (stub)'; };
      var methods = 'init capture register register_once identify reset get_distinct_id set_config'.split(' ');
      for (var n = 0; n < methods.length; n++) g(u, methods[n]);
      e._i.push([i, s, a]);
    };
    e.__SV = 1;
  })(document, window.posthog || []);

  posthog.init(KEY, {
    api_host: HOST,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    persistence: 'localStorage+cookie',
    session_recording: { maskAllInputs: true },
    loaded: function (ph) {
      ph.register({ site_env: env, content_type: 'hub' });
      ph.capture('hub_pageview', { site_env: env, page: '/hub', content_type: 'hub' });
      document.querySelectorAll('a.hub-card[data-progress-subject]').forEach(function (card) {
        card.addEventListener('click', function () {
          ph.capture('hub_subject_click', {
            site_env: env,
            page: '/hub',
            content_type: 'hub',
            subject_id: card.getAttribute('data-progress-subject') || '',
            year: card.getAttribute('data-progress-year') || '',
          });
        });
      });
    },
  });
})();
</script>`;
}

/**
 * Patch index.html in a subject (or any) output directory.
 * @param {string} outDir
 */
export async function patchAnalyticsInDir(outDir) {
  const indexPath = path.join(outDir, 'index.html');
  if (!existsSync(indexPath)) return;
  const html = await readFile(indexPath, 'utf8');
  if (!/posthog-key|__POSTHOG_KEY__/.test(html)) return;
  await writeFile(indexPath, patchAnalyticsHtml(html));
}

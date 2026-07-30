/**
 * Tests for PostHog HTML patching.
 */
import {
  patchAnalyticsHtml,
  escapeHtmlAttr,
  resolvePosthogConfig,
  analyticsMetaTagsHtml,
  claritySnippetHtml,
  CLARITY_PROJECT_ID,
  POSTHOG_KEY_PLACEHOLDER,
  POSTHOG_HOST_PLACEHOLDER,
  DEFAULT_POSTHOG_HOST,
} from './patch-analytics.mjs';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

assert(escapeHtmlAttr('a&b"c') === 'a&amp;b&quot;c', 'escapeHtmlAttr');

const sample = `<meta name="posthog-key" content="${POSTHOG_KEY_PLACEHOLDER}">
<meta name="posthog-host" content="${POSTHOG_HOST_PLACEHOLDER}">`;

const patched = patchAnalyticsHtml(sample, {
  key: 'phc_testkey',
  host: 'https://eu.i.posthog.com',
});
assert(patched.includes('phc_testkey'), 'injects key');
assert(patched.includes('https://eu.i.posthog.com'), 'injects host');
assert(!patched.includes(POSTHOG_KEY_PLACEHOLDER), 'key placeholder gone');
assert(!patched.includes(POSTHOG_HOST_PLACEHOLDER), 'host placeholder gone');

const empty = patchAnalyticsHtml(sample, { key: '', host: DEFAULT_POSTHOG_HOST });
assert(empty.includes('content=""'), 'empty key allowed');
assert(empty.includes(DEFAULT_POSTHOG_HOST), 'default host when empty key');

// Re-patch after placeholders are already filled
const again = patchAnalyticsHtml(patched, { key: 'phc_new', host: 'https://us.i.posthog.com' });
assert(again.includes('phc_new'), 're-patch updates key');
assert(again.includes('https://us.i.posthog.com'), 're-patch updates host');
assert(!again.includes('phc_testkey'), 'old key removed');

const prevKey = process.env.POSTHOG_KEY;
const prevHost = process.env.POSTHOG_HOST;
delete process.env.POSTHOG_KEY;
delete process.env.POSTHOG_HOST;
const cfg = resolvePosthogConfig();
assert(cfg.key === '', 'default key empty');
assert(cfg.host === DEFAULT_POSTHOG_HOST, 'default host');
process.env.POSTHOG_KEY = 'phc_from_env';
process.env.POSTHOG_HOST = 'https://us.i.posthog.com';
const cfg2 = resolvePosthogConfig();
assert(cfg2.key === 'phc_from_env' && cfg2.host === 'https://us.i.posthog.com', 'reads env');
if (prevKey === undefined) delete process.env.POSTHOG_KEY;
else process.env.POSTHOG_KEY = prevKey;
if (prevHost === undefined) delete process.env.POSTHOG_HOST;
else process.env.POSTHOG_HOST = prevHost;

const meta = analyticsMetaTagsHtml({ key: 'phc_x', host: 'https://eu.i.posthog.com' });
assert(meta.includes('analytics-provider') && meta.includes('phc_x'), 'meta tags html');
assert(meta.includes('clarity.ms/tag') && meta.includes(CLARITY_PROJECT_ID), 'meta includes Clarity');
assert(meta.includes('posthog+clarity'), 'provider announces both');

const clarity = claritySnippetHtml();
assert(clarity.includes('xim6tigbcd') && clarity.includes('clarity.ms/tag'), 'clarity snippet');

console.log('patch-analytics.test.mjs: ok');

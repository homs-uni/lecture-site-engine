#!/usr/bin/env node
/**
 * Export study analytics events from PostHog via HogQL → analytics/exports/
 *
 * Requires:
 *   POSTHOG_PERSONAL_API_KEY
 *   POSTHOG_PROJECT_ID
 *   POSTHOG_HOST              — optional API host (default https://eu.posthog.com)
 *
 * Usage:
 *   node analytics/export.mjs
 *   node analytics/export.mjs --days 7
 *   node analytics/export.mjs --days 30 --format csv
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPORT_DIR = path.join(ROOT, 'analytics/exports');
const DEFAULT_API_HOST = 'https://eu.posthog.com';

const TRACKED_EVENTS = [
  'content_viewed',
  'scroll_milestone',
  'study_idle',
  'study_session_end',
  'focus_milestone',
  'hub_pageview',
  'hub_subject_click',
  '$pageview',
  'mcq_answered',
  'exam_mode_opened',
  'exam_started',
  'exam_finished',
  'lecture_progress_toggled',
  'search_performed',
  'search_result_clicked',
  'search_opened',
  'toc_navigated',
  'jump_to_summary',
  'expand_original_toggled',
  'theme_changed',
  'content_load_failed',
];

function parseArgs(argv) {
  let days = 30;
  let format = 'json';
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--days' && argv[i + 1]) days = Math.max(1, Number(argv[++i]) || 30);
    else if (argv[i] === '--format' && argv[i + 1]) format = String(argv[++i]).toLowerCase();
  }
  return { days, format };
}

function requireEnv(name) {
  const v = (process.env[name] || '').trim();
  if (!v) {
    console.error(`Missing required env: ${name}`);
    process.exit(1);
  }
  return v;
}

function apiHost() {
  const raw = (process.env.POSTHOG_HOST || DEFAULT_API_HOST).trim().replace(/\/$/, '');
  if (raw.includes('.i.posthog.com')) {
    return raw.replace('.i.posthog.com', '.posthog.com');
  }
  return raw;
}

async function runHogql(query) {
  const token = requireEnv('POSTHOG_PERSONAL_API_KEY');
  const projectId = requireEnv('POSTHOG_PROJECT_ID');
  const url = `${apiHost()}/api/projects/${projectId}/query/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: { kind: 'HogQLQuery', query },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`HogQL query failed (${res.status}): ${data?.detail || JSON.stringify(data)}`);
  }
  return data;
}

function rowsToObjects(columns, results) {
  return (results || []).map((row) => {
    /** @type {Record<string, unknown>} */
    const obj = {};
    for (let i = 0; i < columns.length; i++) obj[columns[i]] = row[i];
    return obj;
  });
}

function toCsv(rows) {
  if (!rows.length) return '';
  const cols = Object.keys(rows[0]);
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n');
}

async function exportEvents(days) {
  const eventList = TRACKED_EVENTS.map((e) => `'${e.replace(/'/g, "''")}'`).join(', ');
  const query = `
SELECT
  timestamp,
  event,
  distinct_id,
  properties.subject AS subject,
  properties.storage_prefix AS storage_prefix,
  properties.site_env AS site_env,
  properties.page AS page,
  properties.content_type AS content_type,
  properties.content_id AS content_id,
  properties.lecture AS lecture,
  properties.dawrat AS dawrat,
  properties.note AS note,
  properties.active_seconds AS active_seconds,
  properties.max_scroll_pct AS max_scroll_pct,
  properties.milestone_pct AS milestone_pct,
  properties.focus_minutes AS focus_minutes,
  properties.subject_id AS subject_id,
  properties.year AS year
FROM events
WHERE event IN (${eventList})
  AND timestamp > now() - INTERVAL ${Number(days)} DAY
ORDER BY timestamp DESC
LIMIT 50000
`.trim();

  const data = await runHogql(query);
  const columns = data.columns || [];
  const results = data.results || [];
  if (!Array.isArray(columns) || !Array.isArray(results)) {
    throw new Error('Unexpected HogQL response shape (expected columns + results)');
  }
  return rowsToObjects(columns, results);
}

async function runNamedQueries() {
  const queriesDir = path.join(ROOT, 'analytics/queries');
  const names = [
    'top-lectures',
    'engagement-by-subject',
    'scroll-funnel',
    'dawrat-vs-lectures',
    'mcq-accuracy',
    'search-findability',
    'exam-outcomes',
  ];
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const name of names) {
    const file = path.join(queriesDir, `${name}.hogql`);
    try {
      const sql = (await readFile(file, 'utf8'))
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .trim();
      const data = await runHogql(sql);
      out[name] = {
        columns: data.columns || [],
        results: data.results || [],
      };
      console.log(`  query ${name}: ${(data.results || []).length} row(s)`);
    } catch (err) {
      console.warn(`  query ${name} failed: ${err.message}`);
      out[name] = { error: err.message };
    }
  }
  return out;
}

async function main() {
  const { days, format } = parseArgs(process.argv);
  await mkdir(EXPORT_DIR, { recursive: true });

  console.log(`Exporting last ${days} day(s)…`);
  const events = await exportEvents(days);
  console.log(`  events: ${events.length}`);

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const base = path.join(EXPORT_DIR, `events-${days}d-${stamp}`);

  if (format === 'csv') {
    await writeFile(`${base}.csv`, toCsv(events), 'utf8');
    console.log(`✓ ${base}.csv`);
  } else {
    await writeFile(`${base}.json`, JSON.stringify({ days, exportedAt: new Date().toISOString(), events }, null, 2), 'utf8');
    console.log(`✓ ${base}.json`);
  }

  console.log('Running named HogQL queries…');
  const summaries = await runNamedQueries();
  const summaryPath = path.join(EXPORT_DIR, `summaries-${days}d-${stamp}.json`);
  await writeFile(summaryPath, JSON.stringify({ days, exportedAt: new Date().toISOString(), summaries }, null, 2), 'utf8');
  console.log(`✓ ${summaryPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

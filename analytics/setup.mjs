#!/usr/bin/env node
/**
 * Provision PostHog dashboard + insights from analytics/dashboards.json.
 *
 * Requires:
 *   POSTHOG_PERSONAL_API_KEY  — personal API key (project access)
 *   POSTHOG_PROJECT_ID        — numeric project id
 *   POSTHOG_HOST              — optional, default https://eu.posthog.com (API host)
 *
 * Usage:
 *   POSTHOG_PERSONAL_API_KEY=phx_… POSTHOG_PROJECT_ID=12345 node analytics/setup.mjs
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_API_HOST = 'https://eu.posthog.com';

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
  // Client ingest host is eu.i.posthog.com; API is eu.posthog.com
  if (raw.includes('.i.posthog.com')) {
    return raw.replace('.i.posthog.com', '.posthog.com');
  }
  return raw;
}

async function api(method, pathname, body) {
  const token = requireEnv('POSTHOG_PERSONAL_API_KEY');
  const projectId = requireEnv('POSTHOG_PROJECT_ID');
  const url = `${apiHost()}/api/projects/${projectId}${pathname}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const msg = data?.detail || data?.error || text || res.statusText;
    throw new Error(`${method} ${pathname} → ${res.status}: ${msg}`);
  }
  return data;
}

async function createInsight(def) {
  const payload = {
    name: def.name,
    description: def.description || '',
    query: {
      kind: 'InsightVizNode',
      source: def.insight,
    },
    tags: ['lecture-site-engine', 'auto-setup'],
  };
  return api('POST', '/insights/', payload);
}

async function createDashboard(name, description, insightIds) {
  return api('POST', '/dashboards/', {
    name,
    description,
    tags: ['lecture-site-engine', 'auto-setup'],
    use_template: '',
    pinned: true,
  }).then(async (dash) => {
    // Attach insights as tiles
    for (let i = 0; i < insightIds.length; i++) {
      await api('PATCH', `/dashboards/${dash.id}/`, {
        tiles: undefined, // keep existing; use insight relation via separate endpoint when available
      }).catch(() => {});
      // Prefer linking via insight dashboard membership
      try {
        await api('PATCH', `/insights/${insightIds[i]}/`, {
          dashboards: [dash.id],
        });
      } catch (err) {
        console.warn(`  warn: could not attach insight ${insightIds[i]}: ${err.message}`);
      }
    }
    return dash;
  });
}

async function main() {
  const defPath = path.join(ROOT, 'analytics/dashboards.json');
  const def = JSON.parse(await readFile(defPath, 'utf8'));
  console.log(`Setting up dashboard "${def.name}" (${def.insights.length} insights)…`);

  const insightIds = [];
  for (const insight of def.insights) {
    process.stdout.write(`  insight: ${insight.name}… `);
    const created = await createInsight(insight);
    insightIds.push(created.id);
    console.log(`#${created.id}`);
  }

  const dash = await createDashboard(def.name, def.description || '', insightIds);
  const host = apiHost();
  const projectId = requireEnv('POSTHOG_PROJECT_ID');
  const url = `${host}/project/${projectId}/dashboard/${dash.id}`;
  console.log(`\n✓ Dashboard ready: ${url}`);
  console.log(`  Insights: ${insightIds.join(', ')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

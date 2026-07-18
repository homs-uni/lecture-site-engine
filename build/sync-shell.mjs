#!/usr/bin/env node
/**
 * Copy site-shell/ + themes/ + renderer/ into every built subject under dist/,
 * re-applying per-subject patches (base href, storage prefix, build id, sw.js).
 *
 * Usage:
 *   node build/sync-shell.mjs
 */
import { syncSiteShellToAllDist } from './lib/sync-site-shell.mjs';

syncSiteShellToAllDist().catch(err => {
  console.error(err);
  process.exit(1);
});

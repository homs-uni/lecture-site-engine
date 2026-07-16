#!/usr/bin/env node
/**
 * List subject paths (year-N/id) touched in a git diff.
 *
 * Usage:
 *   node build/detect-changed-subjects.mjs --base origin/main
 *   node build/detect-changed-subjects.mjs --range HEAD~1..HEAD
 */
import { execSync } from 'node:child_process';
import {
  subjectsFromChangedFiles,
  listAllSubjectsWithLectures,
  subjectNeedsReviewBuild,
} from './lib/subject-paths.mjs';

function parseArgs(argv) {
  const args = { base: null, range: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--base' && argv[i + 1]) args.base = argv[++i];
    else if (argv[i] === '--range' && argv[i + 1]) args.range = argv[++i];
  }
  return args;
}

function gitChangedFiles(base, range) {
  let cmd;
  if (range) {
    cmd = `git diff --name-only ${range}`;
  } else if (base) {
    cmd = `git diff --name-only ${base}...HEAD`;
  } else {
    cmd = 'git diff --name-only HEAD~1..HEAD';
  }
  const out = execSync(cmd, { encoding: 'utf8' }).trim();
  return out ? out.split('\n').filter(Boolean) : [];
}

const args = parseArgs(process.argv);
const files = gitChangedFiles(args.base, args.range);
const subjects = new Set(subjectsFromChangedFiles(files));

// A change to shared engine code (parser/, renderer/, or the build pipeline
// itself) affects every subject's output, not just subjects whose own
// subjects/**/*.md changed in this push. Without this, a bugfix to e.g.
// parser/parts/handlers.js is invisible to subjectsFromChangedFiles() (it
// only matches paths under subjects/year-N/<id>/), so the incremental CI
// build restores every existing subject untouched from the dist/ cache and
// the fix never actually reaches the live site — it only takes effect on
// subjects that happen to also get a content change in the same push, or on
// a full `--all` rebuild. Treat any shared-engine touch as "rebuild
// everything" so a parser/renderer fix always reaches every already-built
// subject on the next deploy.
const sharedEngineChanged = files.some(f => {
  const p = f.replace(/\\/g, '/');
  return p.startsWith('parser/') || p.startsWith('renderer/') || p.startsWith('build/');
});
if (sharedEngineChanged) {
  for (const s of await listAllSubjectsWithLectures()) subjects.add(s);
} else {
  // Review parser / build step changed → rebuild subjects with pending review output.
  const reviewPipelineChanged = files.some(f => {
    const p = f.replace(/\\/g, '/');
    return p === 'build/cli.mjs' || p.startsWith('parser/review/');
  });
  if (reviewPipelineChanged) {
    for (const s of await listAllSubjectsWithLectures()) {
      if (await subjectNeedsReviewBuild(s)) subjects.add(s);
    }
  }
}

if (process.env.DEBUG) {
  console.error('Changed files:', files);
  console.error('Subjects:', [...subjects]);
}

for (const s of [...subjects].sort()) console.log(s);

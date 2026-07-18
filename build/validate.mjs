#!/usr/bin/env node
/**
 * Validate lecture markdown against SCHEMA + parser.
 *
 * Usage:
 *   node build/validate.mjs subjects/year-1/_template/lectures/par1.md
 *   node build/validate.mjs --subject subjects/year-3/kotlin
 *   npm run validate -- --subject subjects/year-3/kotlin
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createParser } from '../parser/index.js';
import { runSchemaChecks, formatIssues, hasErrors } from './lib/schema-checks.mjs';
import { ensureSubjectScaffold } from './lib/scaffold-subject.mjs';
import { normalizeLectureMd } from './lib/normalize-lecture-md.mjs';
import { listLectureMarkdownFiles } from './lib/subject-paths.mjs';

const ENGINE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const args = { files: [], subject: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--subject' && argv[i + 1]) {
      args.subject = argv[++i];
    } else if (!argv[i].startsWith('-')) {
      args.files.push(argv[i]);
    }
  }
  return args;
}

async function loadGuideConfig(subjectDir) {
  const configPath = path.join(subjectDir, 'guide-config.js');
  if (!existsSync(configPath)) return {};
  const mod = await import(pathToFileUrl(configPath));
  return mod.GUIDE_CONFIG || mod.default || {};
}

function pathToFileUrl(p) {
  return new URL(`file://${path.resolve(p)}`).href;
}

async function collectLectureFiles(subjectDir) {
  const lecturesDir = path.join(subjectDir, 'lectures');
  if (!existsSync(lecturesDir)) throw new Error(`No lectures/ in ${subjectDir}`);
  return (await listLectureMarkdownFiles(lecturesDir))
    .map(name => path.join(lecturesDir, name));
}

async function validateFile(filePath, parser) {
  const rel = path.relative(ENGINE_ROOT, filePath);
  const text = normalizeLectureMd(await readFile(filePath, 'utf8'));
  const issues = runSchemaChecks(text, rel);

  try {
    parser.parseDocument(text);
  } catch (err) {
    issues.push({
      severity: 'error',
      line: 1,
      message: `[${rel}] parse failed: ${err.message}`,
    });
  }

  return { filePath: rel, issues };
}

async function main() {
  const args = parseArgs(process.argv);
  let files = args.files.map(f => path.resolve(process.cwd(), f));

  if (args.subject) {
    const subjectRel = args.subject.replace(/^subjects\//, '');
    const scaffoldActions = await ensureSubjectScaffold(subjectRel);
    for (const action of scaffoldActions) {
      if (action.includes('manifest')) console.log(`↳ ${action}`);
    }
    const subjectDir = path.join(ENGINE_ROOT, 'subjects', subjectRel);
    if (!existsSync(subjectDir)) {
      console.error(`Subject not found: ${args.subject}`);
      process.exit(1);
    }
    const guide = await loadGuideConfig(subjectDir);
    files = await collectLectureFiles(subjectDir);
    if (!files.length) {
      console.log(`No par*.md files in ${subjectDir}/lectures/`);
      process.exit(0);
    }
    const parser = createParser({
      config: {
        lectureSplit: guide.lectureSplit,
        lectureHeading: guide.lectureHeading,
        partTypes: guide.partTypes,
        callouts: guide.callouts,
        arabicKey: guide.arabicKey,
      },
    });

    let totalErrors = 0;
    let totalWarns = 0;
    for (const f of files) {
      const { filePath, issues } = await validateFile(f, parser);
      const errors = issues.filter(i => i.severity === 'error');
      const warns = issues.filter(i => i.severity === 'warn');
      totalErrors += errors.length;
      totalWarns += warns.length;
      // Warnings are counted in the summary but not printed line-by-line.
      if (errors.length) {
        console.log(`\n✗ ${filePath} — ${errors.length} error(s), ${warns.length} warning(s)`);
        console.log(formatIssues(errors));
      } else if (warns.length) {
        console.log(`✓ ${filePath} (${warns.length} warning(s) hidden)`);
      } else {
        console.log(`✓ ${filePath}`);
      }
    }
    console.log(`\nDone: ${files.length} file(s), ${totalErrors} error(s), ${totalWarns} warning(s)`);
    process.exit(totalErrors > 0 ? 1 : 0);
  }

  if (!files.length) {
    console.error('Usage: node build/validate.mjs <file.md> | --subject <path>');
    process.exit(1);
  }

  const parser = createParser();
  let totalErrors = 0;
  for (const f of files) {
    const { filePath, issues } = await validateFile(f, parser);
    const errors = issues.filter(i => i.severity === 'error');
    if (errors.length) {
      console.log(`\n✗ ${filePath}`);
      console.log(formatIssues(errors));
      if (hasErrors(issues)) totalErrors += 1;
    } else if (issues.length) {
      console.log(`✓ ${filePath} (${issues.length} warning(s) hidden)`);
    } else {
      console.log(`✓ ${filePath}`);
    }
  }
  process.exit(totalErrors > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Build a deployable static site for one subject.
 *
 * Usage:
 *   node build/cli.mjs --subject year-1/kotlin
 *   node build/cli.mjs --subject subjects/year-1/kotlin --output dist/year-1/kotlin
 */
import { readFile, writeFile, mkdir, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createParser } from '../parser/index.js';
import { runSchemaChecks, hasErrors } from './lib/schema-checks.mjs';
import { ensureSubjectScaffold } from './lib/scaffold-subject.mjs';
import { normalizeLectureMd } from './lib/normalize-lecture-md.mjs';
import { patchSubjectIndexHtml, patchSubjectStoragePrefix } from './lib/patch-subject-index.mjs';
import { patchBuildMeta } from './lib/patch-build-meta.mjs';
import { generateServiceWorker } from './lib/generate-sw.mjs';
import { lectureSummaryFromLec } from './lib/lecture-summary.mjs';

const ENGINE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const args = { subject: null, output: null, skipValidate: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--subject' && argv[i + 1]) args.subject = argv[++i];
    else if (argv[i] === '--output' && argv[i + 1]) args.output = argv[++i];
    else if (argv[i] === '--skip-validate') args.skipValidate = true;
  }
  return args;
}

function resolveSubjectDir(subjectArg) {
  const raw = subjectArg.replace(/^subjects\//, '');
  const withSubjects = path.join(ENGINE_ROOT, 'subjects', raw);
  if (existsSync(withSubjects)) return withSubjects;
  const direct = path.resolve(process.cwd(), subjectArg);
  if (existsSync(direct)) return direct;
  throw new Error(`Subject not found: ${subjectArg} (tried ${withSubjects})`);
}

function pathToFileUrl(p) {
  return new URL(`file://${path.resolve(p)}`).href;
}

async function loadGuideConfig(subjectDir) {
  const configPath = path.join(subjectDir, 'guide-config.js');
  if (!existsSync(configPath)) {
    return (await import(pathToFileUrl(path.join(ENGINE_ROOT, 'subjects/_template/guide-config.js')))).GUIDE_CONFIG;
  }
  return (await import(pathToFileUrl(configPath))).GUIDE_CONFIG;
}

async function validateSubject(subjectDir, parser) {
  const lecturesDir = path.join(subjectDir, 'lectures');
  const names = (await readdir(lecturesDir)).filter(n => /^par.+\.md$/i.test(n)).sort();
  let errorCount = 0;
  for (const name of names) {
    const filePath = path.join(lecturesDir, name);
    const rel = path.relative(ENGINE_ROOT, filePath);
    const text = normalizeLectureMd(await readFile(filePath, 'utf8'));
    const issues = runSchemaChecks(text, rel);
    try {
      parser.parseDocument(text);
    } catch (err) {
      issues.push({ severity: 'error', line: 1, message: `parse failed: ${err.message}` });
    }
    if (issues.length) {
      const errors = issues.filter(i => i.severity === 'error');
      errorCount += errors.length;
      console.error(`✗ ${rel}: ${errors.length} error(s), ${issues.length - errors.length} warning(s)`);
      for (const i of issues) console.error(`  L${i.line} ${i.severity}: ${i.message}`);
    } else {
      console.log(`✓ ${rel}`);
    }
  }
  if (errorCount) throw new Error(`Validation failed with ${errorCount} error(s)`);
  return names;
}

async function copyDir(src, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: true });
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.subject) {
    console.error('Usage: node build/cli.mjs --subject <year-N/subject-id> [--output dist/...]');
    process.exit(1);
  }

  const subjectDir = resolveSubjectDir(args.subject);
  const subjectRel = path.relative(path.join(ENGINE_ROOT, 'subjects'), subjectDir);
  await ensureSubjectScaffold(subjectRel);
  const outDir = args.output
    ? path.resolve(process.cwd(), args.output)
    : path.join(ENGINE_ROOT, process.env.OUTPUT_DIR || 'dist', subjectRel);

  const guide = await loadGuideConfig(subjectDir);
  const parser = createParser({
    config: {
      lectureSplit: guide.lectureSplit,
      lectureHeading: guide.lectureHeading,
      partTypes: guide.partTypes,
      callouts: guide.callouts,
      arabicKey: guide.arabicKey,
    },
  });

  const mdFiles = args.skipValidate
    ? (await readdir(path.join(subjectDir, 'lectures'))).filter(n => /^par.+\.md$/i.test(n)).sort()
    : await validateSubject(subjectDir, parser);

  if (!mdFiles.length) {
    console.log('No lecture files to build.');
    process.exit(0);
  }

  await mkdir(outDir, { recursive: true });

  // Site shell + assets
  await copyDir(path.join(ENGINE_ROOT, 'site-shell'), outDir);
  await copyDir(path.join(ENGINE_ROOT, 'themes'), path.join(outDir, 'themes'));
  await copyDir(path.join(ENGINE_ROOT, 'renderer'), path.join(outDir, 'engine/renderer'));

  await patchSubjectIndexHtml(outDir, subjectRel);

  const guideSrc = path.join(subjectDir, 'guide-config.js');
  const guideDest = path.join(outDir, 'js/guide-config.js');
  if (existsSync(guideSrc)) {
    await cp(guideSrc, guideDest);
  } else {
    await cp(path.join(ENGINE_ROOT, 'subjects/_template/guide-config.js'), guideDest);
  }

  await patchSubjectStoragePrefix(outDir);

  // Parse lectures → JSON
  const lecturesOut = path.join(outDir, 'lectures');
  await mkdir(lecturesOut, { recursive: true });

  const manifestSrc = path.join(subjectDir, 'lectures/manifest.json');
  const manifest = JSON.parse(await readFile(manifestSrc, 'utf8'));

  const builtFiles = [];
  /** @type {Map<string, { parsedAt: string, summary: ReturnType<typeof lectureSummaryFromLec>, jsonName: string }>} */
  const parsedByJson = new Map();

  for (const name of mdFiles) {
    const text = normalizeLectureMd(await readFile(path.join(subjectDir, 'lectures', name), 'utf8'));
    const doc = parser.parseDocument(text);
    const lec = doc.lectures[0];
    if (lec) lec.id = name.replace(/\.md$/i, '');
    const sectionIndex = lec ? parser.buildSectionIndex(lec) : {};
    const parsedAt = new Date().toISOString();
    const jsonName = name.replace(/\.md$/i, '.json');
    await writeFile(
      path.join(lecturesOut, jsonName),
      JSON.stringify({
        schemaVersion: '1.0',
        source: name,
        parsedAt,
        sectionIndex,
        ...doc,
      }, null, 2),
    );
    builtFiles.push(jsonName);
    parsedByJson.set(jsonName, {
      parsedAt,
      summary: lectureSummaryFromLec(lec),
      jsonName,
    });
    console.log(`  parsed → lectures/${jsonName}`);
  }

  const buildId = new Date().toISOString();

  // Update manifest paths .md → .json + summaries for lazy home grid
  if (manifest.files?.length) {
    manifest.files = manifest.files.map(f => {
      const jsonPath = String(f.path).replace(/\.md$/i, '.json');
      const parsed = parsedByJson.get(jsonPath);
      return {
        ...f,
        path: jsonPath,
        source: f.path,
        parsedAt: parsed?.parsedAt,
        summary: parsed?.summary,
      };
    });
  } else {
    manifest.files = builtFiles.map((p, i) => {
      const parsed = parsedByJson.get(p);
      return {
        path: p,
        num: i + 1,
        parsedAt: parsed?.parsedAt,
        summary: parsed?.summary,
      };
    });
  }

  manifest.settings = {
    ...(manifest.settings || {}),
    buildId,
  };

  await writeFile(path.join(lecturesOut, 'manifest.json'), JSON.stringify(manifest, null, 2));

  const report = {
    subject: subjectRel,
    builtAt: buildId,
    buildId,
    output: path.relative(ENGINE_ROOT, outDir),
    lectures: builtFiles,
    settings: manifest.settings || {},
  };
  await writeFile(path.join(outDir, 'build-report.json'), JSON.stringify(report, null, 2));

  await patchBuildMeta(outDir, buildId);
  await generateServiceWorker(outDir, {
    buildId,
    cachePrefix: guide.storagePrefix || 'study-guide',
  });

  console.log(`\n✓ Built → ${outDir}`);
  console.log(`  Deploy: drag-drop folder or GitHub Pages root = ${path.relative(ENGINE_ROOT, outDir)}`);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});

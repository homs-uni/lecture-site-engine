# lecture-site-engine

Pipeline: PDF → AI-generated Markdown (SCHEMA.md markers) → parser/JSON → renderer/HTML → static site. Deployed to GitHub Pages (main) or Netlify (sandbox, manual only).

No framework — vanilla Node ≥18, ES modules (`"type": "module"`). No linter, no formatter, no typecheck.

## Commands

```bash
npm test                                              # 4 plain Node scripts in sequence, no test runner
npm run validate -- --subject year-N/subject-id       # SCHEMA checks + parser parse (auto-scaffolds)
node build/cli.mjs --subject year-N/subject-id        # **real subject build** (validate → parse → copy)
node build/cli.mjs --subject ... --skip-validate
node build/cli.mjs --subject ... --output dist/custom
npm run build                                         # hub index page only (cards + stubs), NOT subject pages
npm run dev -- --subject year-N/subject-id            # watch + auto-rebuild + live-server
npm run dev -- --all
npm run dev -- --subject year-N/subject-id --port 3000
npm run scaffold                                      # auto-create lectures/ + manifest + guide-config for all
npm run cms:config / cms:local                        # Decap CMS config generation
npm run admin:generate / contrib:page                 # admin/contrib page generation
npm run ci:validate-changed / ci:deploy-build         # CI workflows
```

## Key traps

- `npm run build` generates **only** `dist/index.html` (hub). Subject pages require `node build/cli.mjs --subject year-N/subject-id`.
- Double-dash `--` is required before `--subject` for all `npm run` commands, but NOT for direct `node build/cli.mjs --subject ...`.
- `npm run dev` uses `npx live-server` (fetched on demand, no devDependency). For single subject, Ctrl+S triggers rebuild + hub refresh.
- `OUTPUT_DIR` env var overrides `dist/` output root (used in CI and watch).
- Subject appears on hub only if `manifest.json` has `"settings": { "enabledLectures": true }`. Missing or `false` → invisible.

## Structure

| Directory | Role |
|---|---|
| `parser/` | `createParser(config)` → parses SCHEMA.md Markdown to JSON (`parser/index.js`) |
| `renderer/` | `createRenderer(config)` → renders lecture JSON to HTML (`renderer/index.js`) |
| `build/cli.mjs` | Single-subject build pipeline: scaffold → validate → parse → copy site-shell → search-index |
| `build/deploy-build.mjs` | CI: build changed + missing subjects, then admin + hub + contrib + sync-shell |
| `build/lib/` | Shared utilities: path resolution, schema checks, scaffold, search index, normalizer |
| `site-shell/` | Shared HTML/CSS/JS frontend copied into every subject build |
| `subjects/year-{1..5}/` | Content: `lectures/par*.md`, `reviews/`, `guide-config.js`, `manifest.json` |
| `themes/` | CSS palette files + `apply-theme.js` |
| `dist/` | Build output (gitignored except `.gitkeep`); cached in CI with key `dist-site-v3` |

## manifest.json

`files` array is auto-synced from `par*.md` filenames during validate/build/CI — **do not hand-edit**. Icons/badges cycle through `lectureIcons`/`lectureMatIcons`. `par1-sec2.md` → `num: 1, badge: "المحاضرة ١ — جزء ٢"`. Required `settings`: `subjectName`, `subjectNameEn`, `year`, `academicYear`, `theme`, `department`.

## Per-subject wiring

Every subject has `guide-config.js` exporting `GUIDE_CONFIG` (`lectureSplit`, `lectureHeading`, `partTypes`, `callouts`, `arabicKey` regexes). Falls back to `subjects/_template/guide-config.js`. Parser and renderer read this config at build time.

## SCHEMA.md key conventions

- Part type detection: parser matches keyword in `##` title (`MCQ`, `تصحيح`, `تمارين`, `نظرية`, `Cheat Sheet`, etc.).
- Pipe `|` inside table cells must be escaped `\|` — parser splits on unescaped `|`.
- `algorithm` fences for ordered procedures: one step per line: `N \| step \| tool \| what happens`.
- `diagram` fences for interactive diagrams (flowchart, bpmn, decision-tree, dfd, usecase, class, activity).
- English terms in backticks, section numbering (`### 1.`, `### 1.1.`) enables TOC sidebar.
- Decap CMS saves lectures with YAML frontmatter — `normalizeLectureMd` strips it before parsing.

## Search

Static client-side search. Build: `build/lib/generate-search-index.mjs` → `lectures/search-index.json`. Client: `site-shell/js/search.js` (lazy load, `Ctrl+Shift+F`). Index: flat array of `{ id, lecId, lecNum, lecTitle, kind, context, title, text }`.

## CI & deploy

| Workflow | Trigger | What it does |
|---|---|---|
| Validate lectures | PR to main | `npm test` + detect changed subjects → `validate-changed.mjs` |
| Deploy GitHub Pages | Push to main (or manual) | Restore dist cache (`dist-site-v3`), build changed+missing, admin+hub+contrib, save cache, upload Pages artifact |
| Netlify (manual) | `workflow_dispatch` only | Force-push main → sandbox branch (triggers Netlify with `npm test && node build/deploy-build.mjs --all`) |

Branch protection on main requires Validate lectures check.

## Contributor scope

Edit only `subjects/year-N/subject-id/lectures/par*.md` (or `reviews/`). Do not touch `parser/`, `renderer/`, `site-shell/`, `build/` unless you're a maintainer. Do not hand-edit `manifest.json` `files` array. See `CONTRIBUTING.md` for full workflow.

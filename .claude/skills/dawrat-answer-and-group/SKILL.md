---
name: dawrat-answer-and-group
description: Answers and organizes an already-extracted past-exam MCQ file (دورات/DAWRAT) for a subject in this repo — fills in the blank الإجابة الصحيحة/التعليل fields by matching each question against that subject's own lecture content (mainly its "النص الأصلي يقول" quoted paragraphs), groups the questions by which lecture their answer came from, and writes subjects/<year-N>/<subject-id>/DAWRAT/exams.md + manifest.json. Use this whenever the user asks to answer, fill in, combine, or organize a DAWRAT/دورات past-exam file, or mentions matching exam questions to lecture answers — even if they don't name the skill or say "DAWRAT" explicitly. This picks up AFTER templates/prompt-past-exam-mcq.md's extraction step (which only pulls raw questions out of a PDF with blank answers) — don't use this skill to do that extraction itself, and don't use it to touch any file outside one subject's DAWRAT/ folder.
---

# دورات answer-and-group

## What this is for

A subject's `DAWRAT/` folder holds past-exam MCQ questions, rendered on the site as a standalone "دورات سنوات سابقة" section (see `build/cli.mjs`'s `buildExamsJson`, `site-shell/js/app.js`'s exam-archive wiring, and `parser/parts/handlers.js`'s `parseMCQ`). Getting a subject's DAWRAT content ready is two separate steps:

1. **Extraction** (a different, existing prompt — `templates/prompt-past-exam-mcq.md`): turn a raw exam PDF into markdown questions with blank `**الإجابة الصحيحة:**`/`**التعليل:**` fields. If the user hands you a PDF or asks you to "pull the questions out," that's the other prompt, not this skill.
2. **Answering + grouping** (this skill): take those blank-answer questions — one file, or several that need combining first — and produce the final, answered, lecture-grouped `DAWRAT/exams.md`.

The reason answering has to happen by reading the lectures rather than from general knowledge alone: the exam almost always uses the exact wording, terminology, and even the specific right/wrong framing that the professor's own slides used, quoted verbatim in each lecture's `#### النص الأصلي يقول:` blocks. That's the ground truth. General domain knowledge is a fallback for the (usually few) questions no lecture happens to cover.

## Step 1 — Gather the input

Find the subject's unanswered question source(s). This might already be one file at `subjects/<year-N>/<subject-id>/DAWRAT/exams.md`, or it might be one or more files the user just gave you (uploaded PDFs already run through the extraction prompt, or raw extracted `.md` files elsewhere). If there's more than one source file, combine them into a single question list first — keep each question's own `**المصدر:**` tag (it usually already encodes which exam sitting/year/semester the question came from; don't lose that), don't drop or merge questions unless truly identical wording, and don't rewrite question text or options.

## Step 2 — Know your lecture map

Read `subjects/<year-N>/<subject-id>/lectures/manifest.json` for the real lecture order (the `num` field), and each `lectures/par*.md` file's `# المحاضرة N — <Title>` heading for its real title. Don't assume `par1.md` is "Lecture 1" — check.

## Step 3 — Match each question to a lecture, cheaply

For every question, you need two things: the right answer letter, and which lecture it belongs to. Don't read each lecture file end-to-end for every question — that's slow and mostly wasted, since most of a lecture file isn't relevant to any given question. Instead:

- Pull 2-4 distinctive keywords or phrases out of the question (a method name, a component name, a specific claim) and grep across the subject's `lectures/*.md` for those terms, specifically inside `#### النص الأصلي يقول:` blocks — that's where the exact quoted original text lives, and it's the fastest, most reliable place to confirm an answer.
- When you get a hit, read enough surrounding context (the enclosing section, maybe the "الشرح المبسّط" right after it) to be sure, then move on — you don't need the whole file.
- If nothing in any lecture settles it, fall back to solid domain knowledge for that subject (most of these are well-known factual questions in the field — Android lifecycle order, OS scheduling rules, network layers, whatever the subject is). Still answer it — never leave a question blank — but keep the rationale honest about it being general knowledge rather than a lecture quote.
- If a question is genuinely broad/general and doesn't trace to one specific lecture (spans the whole course, or is pure definitional knowledge not tied to one lecture's content), that's fine — it goes in a catch-all section, not forced into a lecture it doesn't really belong to.

For each question, write:
- `**الإجابة الصحيحة: <letter>**` — never leave this blank.
- `**التعليل:**` — write it in Arabic (English technical terms in backticks), and make it **readable**, not one dense run-on paragraph. Structure it like this, with a blank line between each piece:
  1. One short sentence on why the correct option is right.
  2. Then one short line per wrong option you want to dismiss (e.g. `أ) … لأن …` / `ج) … لأن …`) — skip options that are obviously wrong if space is tight, but cover the tempting ones.
  3. Optionally one closing sentence tying it back to the lecture idea.
  4. **Optional `تذكرة` block** (same visual style as `مهم للامتحان`, but labeled تذكرة) — only when the answer is grounded in one or more `#### النص الأصلي يقول:` paragraphs and that idea is worth locking in. **Not mandatory** — skip it for pure general-knowledge questions, obvious one-liners, or when you have nothing concrete to reinforce. When you do add it, put it at the end of the rationale as:

     ```markdown
     #### تذكرة:
     > من المحاضرة {N} §{X.Y} (وممكن §{A.B} كمان): …
     > …
     ```

     How to write it:
     - **Ground it** in the lecture's `النص الأصلي يقول` — the idea comes from there (one paragraph, or several related ones mashed into one idea). Mention the § if you have it, but don't invent one.
     - **Do NOT quote.** Never paste the slide text as a كوت / اقتباس حرفي. Rephrase the idea in your own words.
     - **عامّية قريبة من الطالب** — احكي معه مو عليه: جمل قصيرة، واضحة، كأنك عم تشرحلّه على السريع ليش هالفكرة بتخلي الجواب يبين لحاله. الهدف يفهم الفكرة عنجد، مو يحفظ جملة المحاضرة.
     - Keep it to ~2–4 short lines inside the `>` block. If the answer needed several paragraphs, weave them into **one** idea — don't list quotes from each.

  Do **not** smash all of that into a single connected paragraph. Use real newlines (and a blank line between the "why correct" sentence and the wrong-option lines) so a student can skim it. Match the tone of existing `**التعليل:**` text in the subject's lecture MCQs (read a couple examples from `lectures/par*.md` first to calibrate), but prefer this clearer line-broken layout over whatever denser form some older lectures use.
- **Difficulty** — decide it yourself from the question (don't copy whatever the extraction left, and don't default everything to `متوسط`). Put one of `سهل` | `متوسط` | `صعب` in the heading parentheses. Use this rubric:
  - `سهل` — definition / recall / one-fact lookup; answer is almost verbatim in a lecture quote; options are clearly distinct; little or no reasoning needed.
  - `متوسط` — needs applying a concept, comparing two ideas, or a short chain of reasoning (e.g. which lifecycle callback, which layer owns X); options can look similar but one is clearly right once you know the rule.
  - `صعب` — multi-step reasoning, code/trace analysis, subtle distractors that share wording with the lecture, edge cases, or questions that combine material from more than one idea; a student who only memorized the slides will often miss it.
  When unsure between two levels, pick the harder one. Vary difficulty across the file — a whole bank of only `متوسط` means you didn't actually judge.

## Step 4 — Assemble the output, following the template exactly

Write `subjects/<year-N>/<subject-id>/DAWRAT/exams.md`. This has to parse with `parser/parts/handlers.js`'s `parseMCQ` — get the formatting exactly right, because a small deviation silently corrupts parsing for everything after it in that chunk (there's no error message, just a badly-parsed question). Two mistakes actually happened the first time this was done manually — avoid them:

1. **Always include a difficulty in parentheses on the heading line**: `### السؤال N (سهل|متوسط|صعب)` — not bare `### السؤال N`. Without it, the question number never gets extracted (defaults to `?` for every single question), which isn't just cosmetic — every question ends up sharing the same DOM id and collides. The value must be the difficulty you decided in Step 3 — never hard-code `متوسط` for every question.
2. **Never put option markers inside a fenced code block** (e.g. `// أ) ...` as a comment inside ```` ```java ```` ). The parser only recognizes `أ) ب) ج) د)` markers *outside* code fences — anything inside a fence is treated as part of the question's stem, not as options, so the question ends up with zero real options. If the source material has this shape (each option IS a code variant), put the shared/representative code in the question's stem as its own fenced block, then write short single-line options below it using inline single-backtick code spans (`` `new String[]{...}` ``) to name what's different about each variant — don't try to fence multi-line code per option.

Template:

```markdown
## المحاضرة 1: <lecture 1's real title>

**المصدر:** [نمط <year> — <semester>]
### السؤال 1 (سهل)
<question text>
أ) ...
ب) ...
ج) ...
د) ...
**الإجابة الصحيحة: ب**
**التعليل:**
الخيار الصحيح لأن …

أ) خاطئ لأن …
ج) خاطئ لأن …
د) خاطئ لأن …

#### تذكرة:
> من المحاضرة 1 §2.1: فكّر فيها هيك — …
> … ليش هيك الجواب بيبين لحاله لما تفهم الفكرة.

**المصدر:** [نمط <year> — <semester>]
### السؤال 2 (صعب)
...

## المحاضرة 2: <lecture 2's real title>

**المصدر:** [نمط <year> — <semester>]
### السؤال 3 (متوسط)
...
```

Rules:
- `## المحاضرة N: <title>` is a section divider (the site renders it as a visible heading grouping the questions under it) — one per lecture that actually has matched questions, in lecture order. Skip lectures with none.
- Renumber `### السؤال N` sequentially across the *whole* combined file (1, 2, 3, ... through however many total questions there are) — don't keep the original per-chapter numbering, since duplicated numbers across sections would collide.
- Every question keeps its own `**المصدر:**` tag directly on the line right above its `### السؤال N` heading — this is what makes each card show which exam sitting it came from, and it MUST be adjacent to the heading (no blank line or other text between them) or the parser leaves it attached to the wrong question.
- Leave one blank line between the end of one question's `**التعليل:**` and the next question's `**المصدر:**` tag.
- Any question that doesn't trace to one specific lecture goes in a final section: `## المحاضرة الكل: أسئلة عامة`.

Also write `subjects/<year-N>/<subject-id>/DAWRAT/manifest.json` if it doesn't already exist:
```json
{
  "title": "دورات سنوات سابقة",
  "subtitle": "أسئلة من دورات امتحانية سابقة",
  "files": [
    { "path": "exams.md", "id": "exams", "icon": "📝", "matIcon": "history_edu", "label": "دورات سنوات سابقة" }
  ]
}
```

## Step 5 — Verify before you finish

Run `node scripts/verify-dawrat.mjs <year-N>/<subject-id>` (bundled with this skill) — it parses your `exams.md` with the repo's real `parseMCQ` and reports the total question count, any question missing an answer or explanation, any question with a suspicious option count (note: exactly 2 options is fine for a True/False question — don't "fix" those), and the section grouping. Fix anything it flags.

Then run `node build/cli.mjs --subject <year-N>/<subject-id>` from the repo root and confirm it builds `dist/<year-N>/<subject-id>/DAWRAT/exams.json` without errors.

## Boundaries

Only ever write inside that one subject's `DAWRAT/` folder (`exams.md` and `manifest.json`). Everything else — `build/cli.mjs`, `parser/`, `renderer/`, `site-shell/` — is already wired generically to pick up any subject's `DAWRAT/` folder automatically; there's no reason to touch any of it for this task, and doing so is out of scope.

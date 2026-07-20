# Lecture Site Schema v1.0

Fixed contract between AI extraction prompts and site parsers (`parser.js`). **One canonical form per block — no alternates.**

---

## 0. Inline formatting rules

- **Always leave one blank line before a bulleted or numbered list.** A list placed directly under a paragraph or a bold lead-in line (no blank line between them) gets swallowed into that paragraph and renders as one run-on sentence instead of a proper list.
  - ❌ Wrong: `**Key types:**\n- foo\n- bar` (no blank line)
  - ✅ Right: `**Key types:**\n\n- foo\n- bar` (blank line before the list)
- Use `**bold**` for key technical terms on first mention (as already required — original quote/backticks rules elsewhere in this doc still apply).
- Use `==term==` (double equals) to visually highlight a term that deserves more emphasis than plain bold (e.g. the single most important concept in a paragraph). Use sparingly — at most one or two per section, not on every bolded term.

---

## 1. Heading hierarchy

| Level | Syntax | Purpose |
| --- | --- | --- |
| Lecture | `# {unit_label} {num} — {title_en} ({title_ar})` | One lecture per file (or split by `lecture.split_regex`) |
| Part | `## {part_heading}` | Major section (detail, MCQ, exercises…) |
| Section | `### {N}. {title}` or `### {N}.{M} {title}` | Numbered topic (TOC anchor when numbered) |
| Block | `#### {marker}` | Sub-block inside a section |

**Intro blockquote** (optional, before first `##`):

```markdown
> **المادة:** {subject} | **الموضوع:** {topic}
```

Separate major sections with `---` on its own line.

---

## 2. Part titles (parser detection)

Part `type` is detected from the `##` title via regex. Use these keywords:

| Parser type | Title must contain |
| --- | --- |
| `mcq` | `MCQ` or `اختيار من متعدد` |
| `qa` | `بطاقات سؤال` or `Q&A Cards` |
| `debug` | `تصحيح` |
| `theory` | `نظرية` |
| `cheat` | `Cheat Sheet` or `المراجعة السريعة` |
| `summary` | `Checklist` or `قائمة فحص` or `قائمة المراجعة` or `ملخص` (when not part 2 heading) |
| `reference` | `الكود النهائي` or `مرجع شامل` |
| `exercise` | `تمارين` or `تمرين` or `مفسّر` or `مفسر` |
| `trace` | `تتبع` |
| `design` | `تصميم` or `صمّم` |
| `detail` | default — `شرح`, `مقدمة`, `خريطة التكامل`, or any other part |

**Standard part headings (recommended):**

```
## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)
## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)
## الجزء الثاني: ملخص منظم
## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)
## الجزء الرابع: أسئلة تصحيح الكود
## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)
## الجزء الرابع: تمارين تتبع التنفيذ
## الجزء الرابع: سؤال تصميم
## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان
## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)
```

Integration map is a `##` section inside lecture intro/preamble (before part 1) or at start of detail part.

---

## 3. Block markers (detail / summary parts)

### Original quote + simplified explanation (required per section)

```markdown
### 1. Topic title

#### النص الأصلي يقول:
> [quote from lecture]

#### الشرح المبسّط:
[plain Arabic explanation]
```

### Callouts

Use `####` heading + blockquote on next lines:

| Marker | Example |
| --- | --- |
| Exam | `#### مهم للامتحان ⚠️:` |
| Reminder | `#### تذكرة:` (same visual as exam callout; optional inside MCQ `**التعليل:**` — colloquial rephrase of the idea from one or more `النص الأصلي يقول` paragraphs, **not** a verbatim quote; omit when nothing clear to reinforce) |
| Important | `#### نقطة مهمة ⚠️:` or `**⚠️ ملاحظة هامة**` + blockquote |
| Note | `#### ملاحظة:` |
| Lesson | `#### الدرس المستفاد:` |

Alternate (parser also accepts): `#### {text}` matching callout regex in `guide-config.js`.

### Compare (wrong vs right)

```markdown
**الفهم الخاطئ الشائع ❌:** [wrong]
**الفهم الصحيح ✅:** [right]
```

### Code block

```markdown
#### 💻 الكود: [descriptive title]

#### ما هذا الكود؟
> [1–3 sentences]

```kotlin
// English inline comment per line
fun main() { println("Hi") }
```

#### شرح كل سطر:
1. `fun` → [role + why]
2. `main` → [role + why]

**المكتبات المطلوبة (Imports):**
> `import ...`

**الناتج المتوقع (لقطة الشاشة):**
> [expected output description]
```

Alternate title line: `💻 **الكود:**` or `💻 **الكود/الأمر:**` at start of line.

Code fence: specify language (`kotlin`, `xml`, `bash`, `csharp`, `c`, `python`, `gradle`, `json`, `text`).

### Troubleshooting

```markdown
🛠️ **استكشاف الأخطاء وإصلاحها**

| الخطأ الشائع | السبب | الحل |
| --- | --- | --- |
| ... | ... | ... |
```

### Think prompt

```markdown
#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ...
> **لماذا هذا مهم؟** ...
```

### Algorithm / Ordered steps

Use for numbered algorithms, installation procedures, setup flows, and any ordered process where **sequence matters**. Do **not** use for visual node-based flows — use `Diagram` block instead.

**Author as plain lines** inside an `algorithm` fence — one step per line. The site parser renders them as boxes + arrows. Do **not** draw boxes or arrows in the markdown (saves tokens).

Line format: `{num} | {step} | {tool} | {what happens}`

**Use `algorithm` blocks liberally in two places:**
1. **Inside detail sections** — any topic that is an ordered process gets an `algorithm` block right after `#### الشرح المبسّط:`.
2. **Inside summary (خطوات وإجراءات المحاضرة)** — every procedure from the lecture gets its own `algorithm` block. Do **not** compress multiple procedures into a single table.

```markdown
#### ⚙️ الخطوات / الخوارزمية: [title]

#### ما هدف هذه العملية؟
> [1–2 sentences]

```algorithm
1 | إنشاء المشروع | dotnet new | ينشئ هيكل المشروع
2 | إضافة المرجع | dotnet add reference | يربط مكتبة الاختبار
3 | تشغيل الاختبار | dotnet test | يشغّل كل الاختبارات
```

#### نقاط التنفيذ:
- [order constraints, edge cases, exceptions]
```

Alternate opener: `⚙️ **الخطوات:**` or `⚙️ **الإجراء:**` at start of line.

### Diagram (interactive)

Three sections in order:

```markdown
#### 📊 المخطط: [title]

#### ما هذا المخطط؟
> [1–3 sentences]

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |

```diagram
type: flowchart
title: ...
direction: TD
nodes:
  - id: start
    label: Start
    kind: event
    level: 0
edges:
  - from: start
    to: task1
```
```

`type`: `flowchart` | `bpmn` | `decision-tree` | `dfd` | `usecase` | `class` | `activity`

### Mermaid (client-rendered)

Also supported — rendered in the browser via Mermaid.js:

```markdown
```mermaid
graph LR
    A --> B
```
```

Prefer ` ```diagram ` for interactive SCHEMA diagrams; use ` ```mermaid ` when the lecture already has Mermaid source (UML sketches, subgraphs, etc.).

### Screen description (GIS / UI — no image render)

```markdown
#### 🖼️ وصف الشاشة: [title]
> **الصفحة/الشريحة:** N
> [element-by-element description + steps]
```

### Tables

Standard GFM pipe table with header separator `| --- |`.

> ⚠️ **Escape every literal `|` inside a cell** (absolute value `|x|`, norms `‖A‖` are fine as-is but `|A|`, conditional-probability notation `P(X|c)`, set-builder `{aⁿ | n≥0}`, regex alternation `(a|b)*`, cardinality `|D|`, `max(|a|,|b|)`, etc.) by writing `\|` instead of `|`. The parser splits table rows on unescaped `|` only — an un-escaped pipe inside a cell silently shifts every following column and breaks the row (this bug affected several existing lectures and was fixed retroactively; do not reintroduce it). Prefer `‖·‖` for norms and rewrite formulas to avoid `|` when a clean alternative exists, but when `|` is unavoidable inside a table cell, always escape it as `\|`.

### Q&A cards (inline in detail part)

```markdown
**Q1:** [question]
A: [answer]
```

### Line-explain table (alternate)

```markdown
#### شرح كل سطر:
| السطر/الكود | الوظيفة | لماذا؟ |
| --- | --- | --- |
| `code` | role | why |
```

---

### Equation (LaTeX / KaTeX)

Use when the lecture contains **mathematical formulas** (Work, Span, Amdahl, complexity, etc.). The site renders via KaTeX.

**Display block** (recommended):

```markdown
#### 📐 المعادلة: [name]

$$
W = \sum_i t_i
$$

**الشرح:**
> [what each symbol means]
```

Alternate fence:

```markdown
#### المعادلة: Ideal Parallelism

```math
P = \frac{W}{S}
```

**الشرح:**
> ...
```

**Inline** in any paragraph (when brief enables equations): `$O(n \log n)$` or `$\text{Span} = \max_i t_i$`

Rules:
- Use LaTeX syntax inside `$$` or ` ```math ` fences
- One named equation block per major formula in detail sections
- Always add **الشرح** when `require_explanation: true` in subject brief
- Do **not** mix unrelated formulas in one block

---

### Analogy (named block)

Use after any abstract concept to provide a concrete mental hook. One block per concept — do **not** embed the analogy inside paragraph text where the parser cannot find it.

```markdown
#### 💡 التشبيه:
> [جملة واحدة من الحياة اليومية]
> **وجه الشبه:** [X في المثال = Y في المفهوم]
```

---

### Trade-off

Use when two options are **both valid** and the choice depends on context. Do **not** use `compare` block here — `compare` is for wrong vs right. Trade-off is for "it depends".

```markdown
#### ⚖️ المقايضة: [topic]
| | [الخيار A] | [الخيار B] |
| --- | --- | --- |
| المزايا | ... | ... |
| العيوب | ... | ... |
| متى تختاره | ... | ... |
```

---

### Before / After

Use when an operation transforms code, data, or system state. Three elements required in this order.

```markdown
#### 🔄 قبل / بعد: [operation]

**قبل:**
```lang
[code or state before]
```

**بعد:**
```lang
[code or state after]
```

**ماذا تغيّر؟** [one sentence]
```

---

### Trace (inline — within detail section)

Walk through execution showing state at each step. Adjust column names to match the subject (e.g. stack depth, register value, queue contents, variable table).

```markdown
#### 🔍 تتبع التنفيذ: [title]

**المدخل:** [initial input or state]

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | ... | ... |
| 2 | ... | ... |

**النتيجة:** [final output]
```

---

## 4. Assessment part formats

### MCQ (`## ... MCQ`)

Author against `templates/part-mcq.md` (lecture guides) or `templates/part-past-exam-mcq.md` (past-paper banks). The parser accepts only those shapes.

**Standard** (`part-mcq.md`):

```markdown
### السؤال 1 (متوسط)
[question text]
أ) option
ب) option
ج) option
د) option
**الإجابة الصحيحة: ب**
**التعليل:**
[why correct — line-broken, not one dense paragraph]

أ) [why wrong]
ج) [why wrong]

#### تذكرة:
> من المحاضرة {N} §{X.Y}: [colloquial idea — not a slide quote]
> [why that idea makes the answer click — **optional** block; omit if no clear lecture idea]
```

Difficulty in parentheses: `سهل` | `متوسط` | `صعب`. Options: Arabic letters `أ) ب) ج) د)` (one per line or all on one line).

Optional `#### تذكرة:` inside `**التعليل:**` uses the same callout style as `مهم للامتحان`. Ground it in one or more `النص الأصلي يقول` paragraphs, but rewrite the idea in friendly عامّية so the student actually gets it — never paste a quote. Skip it when the question is general knowledge or has no clean lecture idea to reinforce.

**Past-exam** (`part-past-exam-mcq.md`): same question body, plus optional `**المصدر:** [نمط …]` on the line *above* `### السؤال`, and Case-2 shared-stimulus groups (`### السؤال N–M` + `**السؤال N:**` sub-questions). See that template for the full shape.

### Debug (`## ... تصحيح`)

```markdown
### سؤال تصحيح 1

**الكود (يحتوي خطأ):**
```lang
[buggy code]
```
**اكتشف الخطأ:** ...

**التصحيح:**
```lang
[fixed code]
```
**شرح الحل:**
1. ...
```

### Exercise (`## ... تمارين`)

```markdown
### تمرين 1 (تمرين إضافي): [title] — [كود ناقص / تصحيح كود]

**السيناريو / المطلوب:**
...

**نموذج الحل:**
[code + explanation per SCHEMA code block]
```

### Theory (`## ... نظرية`)

```markdown
### سؤال 1: [question]
**نموذج الإجابة:** [structured answer]
```

### Trace Exercise (`## ... تتبع`)

Each exercise has three parts: input, an incomplete table the student fills, then the model solution.

```markdown
### تمرين تتبع 1: [title]

**المدخل:**
```lang
[initial state or input]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | ... | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | ... | ... |

**النتيجة:** [final output]
```

Column names vary by subject — examples: `المتغير / القيمة` for algorithm tracing, `العملية / Stack / Heap` for OS, `الرمز / الحالة` for compiler lexer.

---

### Design Question (`## ... تصميم`)

```markdown
### سؤال تصميم 1: [title]

**المطلوب:**
[description of what to design or draw]

**نموذج الإجابة:**
[use appropriate SCHEMA.md blocks — diagram, algorithm, table, or schema description]

**معايير التقييم:**
- [criterion 1]
- [criterion 2]
```

---

## 5. Validation footer (optional)

End each lecture file with:

```markdown
<!-- VALIDATION
schema: 1.0
parts: detail,summary,mcq,exercise,theory,cheat_sheet
mcq_count: 14
code_blocks: 8
-->
```

---

## 6. Rules

1. Do not invent markers outside this schema.
2. One marker form per block type — pick the canonical form above.
3. English technical terms in backticks: `` `Composable` ``.
4. Section numbers (`### 1.`, `### 2.1.`) enable TOC anchors in the site sidebar.

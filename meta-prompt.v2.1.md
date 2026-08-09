# Meta-Prompt v2.1 — Generate Subject-Specific Lecture Extraction Prompt

> **What changed in v2.1 (vs v2.0):** two mandatory sections were added to the
> generated `custom_prompt.md`. Everything else is identical to v2.0.
>
> 1. **قواعد كتابة المعادلات** — required for **any** subject containing equations
>    (math, physics, signals, circuits, statistics, control…).
> 2. **قواعد المخططات** — **every diagram must be `mermaid`**, for every subject.
>    The legacy ```` ```diagram ```` YAML DSL, ASCII art, and image links are out.
>
> **Why it exists:** guides were written with math inside backticks
> (`` `y' = n·xⁿ⁻¹` ``, `` `Df = ]-∞,+∞[` ``) and with several formulas crammed
> into one `$$` block. On an RTL Arabic page that renders as right-to-left body
> text with mirrored brackets, and stacked formulas collapse into one dense
> paragraph. The engine now parses standalone `$$…$$` into real equation blocks
> and forces LTR on math — but only if the source Markdown is written correctly.
> These rules are that contract.

## Your role

You generate **one file only**: `custom_prompt.md` — a subject-specific prompt an AI uses to convert PDF lectures into study-guide Markdown for the lecture-site engine v2.1.

You do **not** extract lecture content. You do **not** output JSON. You do **not** output YAML.

**Start your response directly with the `#` heading of `custom_prompt.md` — no preamble.**

---

## Inputs you receive (attached by user)

1. **SUBJECT_BRIEF.yaml** — filled copy of `subject-brief.template.v2.yaml`
2. **SCHEMA.md v2.0** — canonical block markers and parser contract
3. **templates/** snippets — full library of part/block templates

---

## Hard rules — read before generating

- Include **only** `enabled: true` parts and blocks. Do not mention disabled items.
- Do **not** copy SCHEMA.md into output — say "انظر SCHEMA.md v2.0" instead.
- Respect `content_ordering.default_type` from subject-brief — if `equation-first`, instruct AI to put formulas first.
- Respect `original_text_display.format` — if `collapsible`, explain the new <details> structure; if `hidden`, omit it.
- Respect `coverage_tracking.enabled` — if true, require @coverage metadata per section.
- Respect `lecture.combine_related_topics` — if false, follow lecture order exactly; if true, allow combining adjacent sections that are closely connected.
- **If the subject contains ANY equations** (`equations` block enabled, or `content_ordering.default_type: equation-first`, or any content_type includes DERIVATION/EQUATION): copy the **"## قواعد كتابة المعادلات"** section into `custom_prompt.md` **verbatim and in full**. It is not optional and not summarisable — it is a parser/rendering contract, not style advice.
- **Every diagram must be `mermaid`.** Copy the **"## قواعد المخططات"** section into `custom_prompt.md` whenever the `diagrams` block is enabled. Never instruct the AI to emit the legacy ```` ```diagram ```` YAML DSL, ASCII art, or image links.
- Keep `custom_prompt.md` lean — one mini-example per block is enough.
- **At the very end**, append "## مرجع القوالب (Templates Reference)" with full templates.
- **Never:** generate lecture content, invent markers, include disabled items.

---

## Flexibility Rules — AI SHOULD Adapt by Subject

The `custom_prompt.md` is a **guide template**, not a rigid cage. The AI should:

- ✅ **Choose the right content types** for the subject domain
  - Compiler theory? Use DERIVATION heavily
  - Programming? Use CODE + COMMAND
  - Engineering? Use PRINCIPLE + PRACTICE
  - Math? Use DERIVATION + THEORY

- ✅ **Reorganize sections** if better flow for the subject
- ✅ **Add domain-specific guidance** (e.g., "For proofs in mathematics...")
- ✅ **Adapt example structure** based on content complexity
- ✅ **Change element order** if subject structure demands it

**But:** Keep the **universal principles** intact:
- ✅ Lean detail sections (prevent cognitive overload)
- ✅ Complete alternative summary (same content, different style)
- ✅ Two reading paths (formal + narrative)
- ✅ Strategic examples (after 2-3 related topics)
- ✅ Topic connectivity (show the thread)
- ✅ Visualization via Mermaid

---

## 🎯 Universal Principles (Apply to ANY Subject)

**These are not rules, but LEARNED BEST PRACTICES:**

### 1. Use Appropriate Representation Tools
- Use visualization tools when they clarify concepts (diagrams, flowcharts, tables, code blocks)
- Don't force visualization where linear text is clearer
- Choose the medium that fits the subject's nature

### 2. Content Types (Expand Beyond Three)
Different subjects have different knowledge types. Not all subjects need all types:

**Core Types:**
- **FACT:** Clear, one-answer definitions (مثل: "Syntax is the set of rules...")
- **THEORY:** Explanations of why/how (مثل: "Why FM is better than AM...")
- **DERIVATION:** Mathematical/logical transformations (مثل: Remove left recursion from grammar)
- **ALGORITHM:** Step-by-step procedures (مثل: "Quicksort steps")
- **CODE:** Implementation examples (مثل: Python class definition)
- **COMMAND:** Tool usage, syntax, CLI (مثل: "$ git commit -m")

**Extended Types:**
- **PRACTICE:** Best practices with clear benefits (مثل: DRY principle)
- **PRINCIPLE:** Multiple valid approaches based on context (مثل: choosing SDLC model)

**Examples by Subject:**
- **Digital Communications:** FACT (definitions) + THEORY (signal processing) + DERIVATION (equations)
- **Compiler Principles:** FACT (definitions) + ALGORITHM (parsing) + DERIVATION (grammar transforms)
- **Advanced Programming:** FACT (syntax) + CODE (examples) + COMMAND (CLI)
- **Software Engineering 2:** FACT (definitions) + PRACTICE (best practices) + PRINCIPLE (design decisions)
- **Database:** FACT + ALGORITHM + PRINCIPLE (when to use which index)
- **Math/Physics:** FACT + THEORY + DERIVATION + EQUATION

### 3. Prevent Cognitive Overload (The "Dizzy Student" Problem)
**Keep detail sections LEAN:**
- One main idea + explanation = enough
- Put supporting details, anti-patterns, edge cases → Summary section
- Both sections teach same content, different presentation styles

**Result:** Students have two readable paths to the same knowledge

### 4. Two Alternative Reading Paths (Not Hierarchical)
- **Detail Path:** Structured, formal, organized with clear hierarchy
- **Summary Path:** Narrative, casual, flowing as continuous prose

**Key insight:** NOT "detail is core, summary is optional"
**Actually:** "Both are complete, choose your reading style"

This works for ANY subject across all domains

### 5. Flexible Structure (AI Can Adapt)
**The custom_prompt.md is a GUIDE, not a cage.**

AI can:
- ✅ Reorganize summary subheadings if it makes sense for the subject
- ✅ Add intermediate sections (e.g., "Why this failed historically?" for history)
- ✅ Change the order of elements if flow demands it
- ✅ Add context-specific sections (e.g., "Real data" for statistics)

**Rule:** Stay true to core principles, but adapt structure to subject nature

### 6. Strategic Content Clustering
- **Clustered examples:** After 2-3 related topics, add ONE example showing them together
- Prevents: Too many examples (overwhelming), Too few (abstract)
- Works for: Any subject with interconnected concepts

### 7. Topic Connectivity (Show the Thread)
Every section should show:
- What came before (prerequisite)
- What comes next (application)
- Why we're learning this in this order

This meta-understanding helps students see the subject as **system, not list**

### 8. Math Is Left-to-Right — A Formula Is Never a Code Span
The guide page is RTL Arabic. A formula written as inline code
(`` `y' = f(x)` ``) inherits the paragraph's bidi context: operands get
reordered around the Arabic text and brackets get mirrored, so
`` `Df = ]-∞, +∞[` `` reads back wrong. A formula written as `$…$` / `$$…$$`
is typeset by KaTeX, which the engine pins to `direction: ltr` — so it is
correct in any language.

**Therefore, for every subject that has equations:**
- Backticks are for **code, identifiers, and English terms** (`chain rule`, `radius of convergence`)
- Dollar signs are for **mathematics** — every variable, every relation, every formula
- One formula per `$$` block, with a blank line around it

This applies to math, physics, signals, circuits, statistics, control theory —
anything where a symbol carries meaning. See the mandatory rules block below.




Fill every `[...]` from SUBJECT_BRIEF. Process enabled items only.

---

```markdown
# برومبت شرح [subject.name_ar] — [subject.name_en]

## دورك

أنت **مدرس جامعي وخبير في [subject.name_ar]** ([subject.section_label]).
سأرسل محاضرة (PDF، نص، صور)، وعليك تحويلها إلى **دليل دراسي Markdown** متوافق مع SCHEMA.md v2.0.

> **التركيز:** [domain_profile.content_types as comma list]
> **الخلاصة:** [subject.tagline]

---

## طبيعة المادة

| النوع | الاستخدام | أمثلة |
| --- | --- | --- |
[one row per content_type — fill "أمثلة" with 2–3 real terms]

**اللغة:** [if terms_in_backticks: "كل مصطلح إنجليزي بين backticks"]
[if inline_code_comments=english: "تعليقات داخل الكود بالإنجليزية"]
[if forbid_adding non-empty:] **ممنوع إضافة:** [comma list]
[if prerequisites non-empty:] **المتطلبات السابقة:** [comma list]

---

## القواعس الإلزامية

- لا تتجاهل أي سطر أو معلومة وردت في المحاضرة
- أكمل الناقص مع وسم **(شرح زيادة للفهم)** أو **(غير مشروحة في المحاضرة)**
- ابدأ من المبتدئ، لا تنتقل لنقطة قبل إتمام شرح السابقة
- اشرح **لماذا** وراء كل فكرة، لا التعريف فقط
- تشبيه يومي + مثال عملي بعد كل نقطة
- اتبع تسلسل المحاضرة نفسها — ولا تدمج موضوعات إلا إذا كانت متصلة جداً (راجع `combine_related_topics`)
- لا تخترع رموزاً/بلوكات خارج SCHEMA.md v2.0 — شكل واحد قياسي لكل نوع
- رقّم الأقسام هرمياً (### 1., ### 1.1.) — الترقيم يُفعّل الفهرس الجانبي

---

## قواعد كتابة المعادلات (Math & Equation Formatting) — إلزامية

> **انسخ هذا القسم كما هو إذا كانت المادة تحتوي أي معادلات.**
> هذه ليست قواعد تنسيق تجميلية — البارسر والمُصيّر (`renderer`) يعتمدان عليها.
> مخالفتها تُنتج معادلات مقلوبة الاتجاه، أو صيغاً متلاصقة تبدو كفقرة واحدة كثيفة.

### القاعدة 1: الرياضيات داخل `$` — وليس داخل backticks

الصفحة كلها RTL (من اليمين لليسار). أي صيغة تُكتب كـ inline code تأخذ اتجاه
الفقرة العربية، فتنقلب أطراف المعادلة وتنعكس الأقواس. أما `$…$` فيعالجها
`KaTeX` ويفرض عليها LTR دائماً.

| ❌ ممنوع | ✅ الصحيح |
| --- | --- |
| `` `y' = n·xⁿ⁻¹` `` | `$y' = n\,x^{\,n-1}$` |
| `` `Df = ]-∞, +∞[` `` | `$D_f = \;]-\infty, +\infty[$` |
| `` `lim(x→0) sinx/x = 1` `` | `$\lim\limits_{x\to0} \frac{\sin x}{x} = 1$` |
| `` `∂f/∂x` `` | `$\dfrac{\partial f}{\partial x}$` |

**متى تبقى الـ backticks صحيحة؟** للمصطلحات الإنجليزية وأسماء التقنيات فقط:
`chain rule`، `radius of convergence`، `piecewise`، `Fourier Series`.
القاعدة الفاصلة: **إذا كان الرمز يحمل معنى رياضياً → `$`. إذا كان اسماً → backtick.**

### القاعدة 2: صيغة واحدة لكل `$$` — ممنوع الحشر

كل معادلة تستحق سطرها. حشر عدة صيغ في `$$` واحد بفواصل `\qquad` هو السبب
المباشر لظهورها "متلاصقة" ومزدحمة.

❌ **ممنوع:**
```markdown
$$a_0 = \frac{1}{T}\int f\,dx, \qquad a_n = \frac{1}{T}\int f\cos(nx)dx, \qquad b_n = \frac{1}{T}\int f\sin(nx)dx$$
```

✅ **الصحيح:**
```markdown
#### 📐 المعادلة: معاملات فورييه الثلاثة

$$
a_0 = \frac{1}{T}\int_{-T}^{T} f(x)\,dx
$$

$$
a_n = \frac{1}{T}\int_{-T}^{T} f(x)\cos\left(\frac{n\pi}{T}x\right)dx
$$

$$
b_n = \frac{1}{T}\int_{-T}^{T} f(x)\sin\left(\frac{n\pi}{T}x\right)dx
$$
```

**استثناء وحيد:** صيغتان **متقابلتان فعلاً** (مباشر ↔ عكسي، زوجي ↔ فردي) يجوز
وضعهما في `$$` واحد بفاصل `\qquad\Longleftrightarrow\qquad`.

### القاعدة 3: سطر فارغ قبل كل `$$` وبعده

بدون السطر الفارغ تلتصق المعادلة بالفقرة ويعاملها البارسر كنص عادي.

```markdown
نضرب بالمرافق:

$$
\frac{\sqrt{x}-\sqrt{x_0}}{x-x_0} = \frac{1}{\sqrt x+\sqrt{x_0}}
$$

بأخذ النهاية عند $x \to x_0$:
```

### القاعدة 4: متى `#### 📐` ومتى `$$` مجرّدة؟

| الحالة | الشكل | النتيجة على الصفحة |
| --- | --- | --- |
| صيغة أساسية تستحق عنواناً | `#### 📐 المعادلة: [الاسم]` ثم `$$…$$` | بطاقة معنونة بإطار |
| خطوة داخل اشتقاق/برهان | `$$…$$` مباشرة | معادلة مركزية بلا عنوان |
| أول صيغة في القسم | `#### 📐 التعريف / الصيغة` ثم `$$…$$` | بطاقة معنونة |

البارسر يربط `#### 📐` بأول `$$` بعده فقط؛ وكل `$$` تالية تُصيَّر كمعادلة
مستقلة نظيفة. **لا تكرّر `#### 📐 المعادلة` قبل كل خطوة** في اشتقاق طويل —
اجعل الخطوات `$$` مجرّدة مفصولة بجُمل عربية قصيرة تشرح الانتقال.

**اشتقاق متعدد الخطوات — الشكل القياسي:**
```markdown
نأخذ $\ln$ للطرفين:

$$
\ln y = g(x)\ln\big(f(x)\big)
$$

نشتق الطرفين ضمنياً:

$$
\frac{y'}{y} = \Big(g(x)\ln\big(f(x)\big)\Big)'
$$

وأخيراً نعوّض $y$ بالتعبير الأصلي:

$$
y' = f(x)^{g(x)} \cdot \Big(g(x)\ln\big(f(x)\big)\Big)'
$$
```

### القاعدة 5: اكتب `LaTeX` حقيقياً — لا رموز Unicode

الرموز المرفوعة/المنخفضة (`xⁿ`، `aₙ`، `x₀`، `∂f/∂x`) لا تُصيَّر بخط رياضي،
ولا تتحاذى، وتكسر البحث داخل الموقع.

| ❌ Unicode | ✅ LaTeX |
| --- | --- |
| `Df`, `Wf`, `x₀`, `aₙ` | `$D_f$`, `$W_f$`, `$x_0$`, `$a_n$` |
| `xⁿ`, `e⁻ˣ`, `f²(x)` | `$x^{n}$`, `$e^{-x}$`, `$f^{2}(x)$` |
| `sinx`, `lnx`, `sh(x)` | `$\sin x$`, `$\ln x$`, `$\operatorname{sh}(x)$` |
| `R`, `∞`, `≥`, `≠` | `$\mathbb{R}$`, `$\infty$`, `$\geq$`, `$\neq$` |
| `√(x-1)`, `(a)/(b)` | `$\sqrt{x-1}$`, `$\dfrac{a}{b}$` |

**دوال بأسماء:** استعمل `\sin \cos \tan \ln \log \lim \max \min`، و
`\operatorname{sh}` `\operatorname{ch}` `\operatorname{th}` للدوال القطعية،
و `\arcsin` `\arctan` للعكسية. الاسم بدون backslash يظهر مائلاً كأنه جداء متغيرات.

**استثناء مهم:** داخل `<details>` الخاصة بـ **النص الأصلي من المحاضرة** — اترك
الاقتباس **حرفياً كما ورد في المحاضرة**، بما فيه رموز Unicode. هذا سجل نصي
أمين للمصدر، وليس محتوى للتصيير.

### القاعدة 6: المجالات والمجموعات والقيمة المطلقة

| المعنى | الكتابة الصحيحة |
| --- | --- |
| فترة مفتوحة/مغلقة | `$]-\infty,\, 3[$` ، `$[1,\, 3[$` ، `$[-1,\, 1]$` |
| مجموعة الأعداد الحقيقية | `$\mathbb{R}$` |
| استبعاد قيم | `$\mathbb{R} \setminus \{-3,\, 4\}$` |
| اتحاد | `$[0,2[\ \cup\ ]2,+\infty[$` |
| **القيمة المطلقة** | `$\lvert x \rvert$` — **وليس** `$|x|$` |

> ⚠️ **لا تستعمل `|` داخل أي معادلة أبداً.** الشرطة العمودية هي فاصل خلايا
> الجداول في Markdown، فتكسر الجدول فوراً. استعمل `\lvert … \rvert` دائماً،
> وكذلك `\left\lvert … \right\rvert` للمقادير الطويلة.

### القاعدة 7: المعادلات داخل الجداول

- استعمل `$…$` داخل الخلايا — يعمل بشكل صحيح
- استعمل `\dfrac` لا `\frac` (أوضح داخل الخلية)
- **ممنوع `|`** داخل الخلية (انظر القاعدة 6)
- **تحقق أن كل صفوف الجدول لها نفس عدد الخلايا** — صف واحد بعدد مختلف يكسر الجدول كله

```markdown
| # | الدالة | المشتقة |
| --- | --- | --- |
| 8 | $y = x^{n}$ | $y' = n\,x^{\,n-1}$ |
| 10 | $y = \sqrt{f(x)}$ | $y' = \dfrac{f'(x)}{2\sqrt{f(x)}}$ |
```

### القاعدة 8: داخل الكتل الضيقة استعمل `$…$` لا `$$…$$`

في `compare` (الفهم الخاطئ/الصحيح) و `callout` و خلايا `trace` — المساحة نصف
عرض الشاشة. صيغة `$$` طويلة ستحتاج تمريراً أفقياً. استعمل `$…$` داخل الجملة،
أو اجعل الصيغة `$$` قصيرة جداً.

### القاعدة 9: النتيجة النهائية تُبرز

عند وصول مثال محلول إلى جوابه، أبرزه بـ `\boxed{}`:

```markdown
$$
\boxed{\,D_f = \mathbb{R} \setminus \{-3,\, 4\}\,}
$$
```

### ✅ قائمة تحقق المعادلات (راجعها قبل تسليم أي محاضرة فيها رياضيات)

- [ ] لا توجد أي صيغة رياضية داخل backticks — كلها `$…$` أو `$$…$$`
- [ ] كل `$$` تحتوي **صيغة واحدة** فقط (عدا الصيغ المتقابلة صراحةً)
- [ ] سطر فارغ قبل كل `$$` وبعدها
- [ ] لا يوجد `|` داخل أي معادلة — استُبدلت بـ `\lvert … \rvert`
- [ ] لا رموز Unicode رياضية (`xⁿ`, `x₀`, `∂`, `√`, `∞`) خارج اقتباس النص الأصلي
- [ ] كل أسماء الدوال مسبوقة بـ `\` (`\sin` لا `sin`)
- [ ] كل صفوف كل جدول لها نفس عدد الخلايا
- [ ] الاشتقاقات الطويلة: خطوة لكل `$$`، بينها جملة عربية تشرح الانتقال
- [ ] النتائج النهائية داخل `\boxed{}`
- [ ] أرقام الأجزاء (`## الجزء ...`) فريدة ومتسلسلة

[if the diagrams block is enabled, append these items verbatim:]
- [ ] كل مخطط داخل ```` ```mermaid ```` (لا `diagram`، لا ASCII، لا صور)
- [ ] كل نصوص العُقد بين `"…"` والأسطر الجديدة بـ `<br/>`
- [ ] كل مخطط متبوع بشرح العناصر وشرح الروابط بلا تكرار

---

## قواعد المخططات (Diagrams) — `mermaid` فقط، إلزامي

> **أي مخطط في الدليل يجب أن يكون `mermaid`. بلا استثناء.**
> شجرة، مخطط تدفق، دورة، تسلسل، بنية نظام، تصنيف، آلة حالات — كلها `mermaid`.

### القاعدة 1: لا تستعمل أي صيغة مخططات أخرى

| ❌ ممنوع | ✅ الصحيح |
| --- | --- |
| ```` ```diagram ```` (صيغة `YAML` قديمة) | ```` ```mermaid ```` |
| رسم `ASCII` بالمحارف (`+---+`, `--->`) | ```` ```mermaid ```` |
| وصف المخطط نصياً فقط ثم تركه بلا رسم | ```` ```mermaid ```` |
| صورة أو رابط صورة خارجي | ```` ```mermaid ```` |

**لماذا `mermaid` تحديداً؟** المُصيّر يدعمها أصلاً: تصيير كسول عند التمرير
(مهم لصفحة فيها عشرات المخططات)، خط عربي مضبوط مسبقاً، وتوافق تلقائي مع
الوضع الليلي. أي صيغة أخرى لن تحصل على أيٍّ من ذلك.

### القاعدة 2: البنية الكاملة لأي مخطط — أربعة أجزاء

```markdown
#### 📊 المخطط: [اسم المخطط]

#### ما هذا المخطط؟
> [جملة واحدة: ماذا يُظهر هذا المخطط ولماذا هو هنا]

```mermaid
graph TD
    A["العقدة الأولى"] --> B["العقدة الثانية"]
```

**شرح العناصر:**
- **[العقدة A]**: [معناها]
- **[العقدة B]**: [معناها]

**شرح الروابط:**
- **من A إلى B**: [ماذا يعني هذا السهم]
```

المخطط بلا شرح عناصره وروابطه **ناقص** — الطالب لا يعرف كيف يقرؤه.

### القاعدة 3: النصوص العربية داخل العُقد بين علامتَي تنصيص

هذه أكثر نقطة تكسر `mermaid` عملياً. أي نص يحتوي **قوساً، فاصلة، نقطتين،
شرطة مائلة، أو رمزاً رياضياً** يجب أن يكون داخل `"…"`.

```mermaid
graph TD
    ❌ A[النهايتان (يمين ويسار) موجودتان؟] --> B[نعم]
    ✅ A["النهايتان (يمين ويسار) موجودتان؟"] --> B["نعم"]
```

**القاعدة الآمنة: ضع كل نص عقدة بين `"…"` دائماً**، حتى لو بدا بسيطاً — أرخص
من تتبّع أي محرف كسر المخطط.

- سطر جديد داخل عقدة: `<br/>` (وليس `\n`)
- تجنّب `#` و `%%` و `;` داخل النصوص
- الرياضيات داخل العُقد: اكتبها نصاً بسيطاً (`x0`, `f(x0)`) — `mermaid` لا تُصيّر `LaTeX`

### القاعدة 4: اختر نوع المخطط حسب المعنى

| المعنى المطلوب | نوع `mermaid` |
| --- | --- |
| تصنيف / شجرة قرار / تسلسل هرمي | `graph TD` |
| خطوات عملية أو خوارزمية بقرارات | `graph TD` مع `{شرط؟}` |
| تدفق أفقي قصير | `graph LR` |
| تفاعل بين أطراف عبر الزمن | `sequenceDiagram` |
| بنية أصناف / علاقات كائنية | `classDiagram` |
| دورة متكررة | `graph TB` مع رابط يعود للبداية |
| بنية نظام بطبقات | `graph TB` مع `subgraph` |

**اتجاه المخطط:** استعمل `TD` (أعلى→أسفل) افتراضياً — يقرأ بشكل طبيعي في
الصفحة العربية. استعمل `LR` فقط للتدفقات القصيرة جداً.

### القاعدة 5: متى تضع مخططاً أصلاً؟

- ✅ عندما توجد **علاقة أو تفرّع أو تسلسل** يصعب فهمه من النص وحده
- ✅ عندما تُصنّف المحاضرة شيئاً إلى أنواع (شجرة قرار مثالية)
- ✅ عندما تشرح تدفق عملية متعددة الخطوات
- ❌ **لا تُجبر** المخطط على محتوى خطّي بسيط — النص أوضح عندها
- ❌ لا تحوّل جدول مقارنة إلى مخطط — الجدول أوضح للمقارنات

> **ملاحظة عن مخططات المحاضرة الأصلية:** إذا كانت المحاضرة تحوي رسمة/صورة
> مهمة، أعد بناءها كـ `mermaid` قدر الإمكان، **وأضف أيضاً** التنبيه:
> "⚠️ **مهم:** هذا الموضوع موضح أفضل بالرسمة في الصفحة X من ملف المحاضرة."

### ✅ قائمة تحقق المخططات

- [ ] كل مخطط في الملف داخل ```` ```mermaid ```` — لا `diagram` ولا `ASCII` ولا صور
- [ ] كل مخطط مسبوق بـ `#### 📊 المخطط:` و `#### ما هذا المخطط؟`
- [ ] كل مخطط متبوع بـ **شرح العناصر** و **شرح الروابط**
- [ ] كل نصوص العُقد بين `"…"`
- [ ] الأسطر الجديدة داخل العُقد بـ `<br/>`
- [ ] لا `LaTeX` داخل العُقد (نص بسيط فقط)
- [ ] نوع المخطط يناسب المعنى (شجرة/تدفق/تسلسل/أصناف)

---

## ترتيب المحتوى حسب نوع المادة (Content Ordering Rules)

### للرياضيات والهندسة والنظرية الكمية:
**نوع المحتوى:** `type: "equation-first"`

**الترتيب الإلزامي لكل قسم (`### 1.1`):**
1. العنوان + metadata
2. 📍 أين نحن الآن؟
3. ⬅️ الربط مع السابق
4. 💡 الفكرة الأساسية
5. **📐 التعريف / الصيغة** ← **يأتي أولاً قبل الشرح**
6. 📖 الشرح اللفظي (اشرح الصيغة بجملتين)
7. 🎯 الملخص السريع
8. 📚 التطبيق
9. ⚠️ أخطاء شائعة
10. 📄 النص الأصلي (collapsible)

> ⚠️ **التزم بـ "قواعد كتابة المعادلات" أعلاه في كل قسم من هذا النوع.**

**مثال صغير — لاحظ أن كل رمز رياضي داخل `$` وكل صيغة في `$$` مستقلة:**
```markdown
### 1.2. Derivative (المشتقة)
<!-- @render: {type: "equation-first"} -->

#### 💡 الفكرة الأساسية
**المشتقة $f'(x)$ = معدل تغيير الدالة عند نقطة معينة**

#### 📐 التعريف / الصيغة

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

#### 📖 الشرح
المشتقة تقيس الانحدار (`slope`) — كم بسرعة تتغير الدالة؟ كلما زادت القيمة
الموجبة، ارتفعت الدالة أسرع. لاحظ أن المشتقة موجودة فقط إذا كانت هذه النهاية
**موجودة ومحدودة**.

**مثال:** لحساب مشتقة $f(x) = x^{2}$ من التعريف نعوّض:

$$
f'(x) = \lim_{h \to 0} \frac{(x+h)^{2} - x^{2}}{h} = \lim_{h \to 0} (2x + h)
$$

$$
\boxed{\,f'(x) = 2x\,}
$$
```

**قارن بالخطأ الشائع** (نفس المحتوى، لكنه سيُصيَّر مقلوباً ومتلاصقاً):
```markdown
❌ #### 💡 الفكرة الأساسية
❌ **المشتقة `f'(x)` = معدل تغيير الدالة**
❌
❌ #### 📐 التعريف الرسمي
❌ $$f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}, \qquad f(x)=x², \qquad f'(x)=2x$$
```
السبب: `` `f'(x)` `` داخل backticks يأخذ اتجاه RTL، والصيغ الثلاث محشورة في
`$$` واحد فتظهر متلاصقة، و `x²` رمز Unicode لا يُصيَّر رياضياً.

### للخوارزميات والبرمجة:
**نوع المحتوى:** `type: "code-first"`

**الترتيب الإلزامي لكل قسم:**
1. العنوان + metadata
2. 📍 أين نحن الآن؟
3. ⬅️ الربط مع السابق
4. 💡 الفكرة الأساسية
5. **💻 الكود / شبه الكود** ← **يأتي أولاً**
6. شرح كل سطر (numbered list)
7. 📖 الشرح: "ماذا يفعل هذا الكود؟ لماذا؟"
8. ⚙️ الخوارزمية (إن لزم): algorithm block
9. 🎯 الملخص السريع
10. 📚 التطبيق
11. 📄 النص الأصلي (collapsible)

### للأنظمة والعمارات والمخططات:
**نوع المحتوى:** `type: "diagram-first"`

**الترتيب الإلزامي:**
1. العنوان + metadata
2. 📍 أين نحن الآن؟
3. ⬅️ الربط مع السابق
4. 💡 الفكرة الأساسية
5. **📊 المخطط (`mermaid`)** ← **يأتي أولاً**
6. شرح العناصر + شرح الروابط
7. 📖 الشرح: "اقرأ المخطط كالتالي..."
8. 🎯 الملخص السريع
9. 📚 التطبيق
10. 📄 النص الأصلي (collapsible)

> ⚠️ **المخطط `mermaid` حصراً** — راجع "قواعد المخططات" أعلاه.

### للنظرية والمبادئ (الافتراضي):
**نوع المحتوى:** `type: "prose-first"` ← **هذا الافتراضي**

**الترتيب:**
1. العنوان + metadata
2. 📍 أين نحن الآن؟
3. ⬅️ الربط مع السابق
4. 💡 الفكرة الأساسية
5. 📖 الشرح (prose يأتي أولاً)
6. 💡 التشبيه
7. 🎯 الملخص السريع
8. 📚 التطبيق
9. ⚠️ أخطاء شائعة
10. 📄 النص الأصلي (collapsible)

---

## تتبع اكتمال الشرح (Coverage Tracking)

[if coverage_tracking.enabled: true]

**لكل قسم `### 1.1`، يجب عليك:**

### الخطوة 1: اقتبس النص الأصلي أولاً
قبل كتابة أي شرح، قم بنسخ الفقرات ذات الصلة من المحاضرة بالكامل. ستحتفظ بها في <details> block في نهاية القسم.

### الخطوة 2: اشرح كل نقطة من الاقتباس
اكتب شرحك بحيث **يغطي كل نقطة** من النص الأصلي.

### الخطوة 3: احسب نسبة التغطية
```
coverage % = (عدد النقاط المشروحة / عدد النقاط في المحاضرة) × 100
```

- **100%:** شرحت كل شيء بدقة ← `coverage: "100%"`
- **95%:** شرحت معظمه، قد تكون 1-2 نقاط معقدة جداً ← `coverage: "95%"` + وسّم ⚠️
- **80-90%:** شرحت الأساس فقط ← `coverage: "85%"` + اشرح النقاط الناقصة في <details>
- **<80%:** ❌ **قيّم نفسك:** هل تتجاهل بقصد (لأنها معقدة جداً) أم بالخطأ؟
  - إن **بقصد:** اكتب السبب في `@missing-pieces`
  - إن **بالخطأ:** أكمل الشرح الآن

### الخطوة 4: أضف metadata
```html
<!-- @render: {type: "...", coverage: "95%"} -->
<!-- @missing-pieces: ["Concept X (معقدة جداً في المصدر)", "Edge case Y"] -->
<!-- @additions: ["Analogy (ليس في المحاضرة)"] -->
```

### الخطوة 5: اجعل النص الأصلي collapsible
في نهاية كل قسم:

```markdown
#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95% — نقطة واحدة لم تُشرح بالكامل)</summary>

**النص الأصلي يقول:**
> [الاقتباس الحرفي من المحاضرة]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المفهوم الأساسي + الأمثلة + الاستخدامات
- ⚠️ لم يتم شرح بالكامل: الخطوة الرابعة (معقدة جداً في المصدر الأصلي)
- ℹ️ إضافة من الدليل: تشبيه يومي (ليس في المحاضرة الأصلية)

</details>
```

**قاعدة المستوى المقبول:**
- إن كان `coverage >= 90%`: لا تحتاج لـ ⚠️
- إن كان `coverage < 90%`: أضف ⚠️ في `<summary>` واشرح السبب

---

[endif]

## بنية المخرجات — التزم بها حرفياً

```
# [unit_label] 1 — Example Title (العنوان بالعربي)
> **المادة:** [name_ar] ([section_label]) | **الموضوع:** ...
```

### الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

أقسام مرقّمة (`### 1.`, `### 1.1.`) — كل قسم يتبع البنية المناسبة لنوع المادة.

### الجزء الثاني: ملخص سريع (بديل سريع في حال ما كنت ملحق)

**الغرض الحقيقي:** 
هذا الملخص **مسار قراءة بديل متساوٍ تماماً** للتفاصيل — ليس "نسخة مختصرة" بل **قراءة شاملة بأسلوب مختلف**.
- طالب **قرأ الشرح التفصيلي ما فهمها**: يقرأ هذا الملخص يفهمها من زاوية جديدة
- طالب **ما عنده وقت** أو **تعبان**: يقرأ هذا الملخص وحده وينتهي — ما يحتاج يرجع للتفاصيل
- طالب **بيدخل الامتحان**: يقدر يذاكر هذا الملخص وحده ويكون جاهز

**طول الملخص و معايير الكمية:**
- **45-70 دقيقة قراءة** — هذا ملخص **غني وعميق**، مو مختصر
- **ALL مفاهيم المحاضرة موجودة** (الـ 5-8 core concepts + معلومات داعمة)
- **كل الأمثلة والتطبيقات والسيناريوهات موجودة**
- **كل الفروقات والاستثناءات والحالات الخاصة موجودة**
- **الفقرات متصلة بشكل طبيعي** — يحس القارئ إنه يقرا قصة مترابطة متماسكة
- **شرح عميق لكل فكرة** — ليس تذكير سطحي، بل فهم شامل
- **الموضوعات تتصل ببعضها** — يشوف القارئ كيف تبني الأفكار على بعضها
- **exam-ready standalone** — يقرأ هذا بس وينتهي — ما يحتاج يرجع للمحاضرة أو التفاصيل

**إيش تكتب:**

**1. الفكرة الأساسية (جملة واحدة)**
- عن ماذا هذه المحاضرة كلها؟
- إيش الفكرة الأساسية الواحدة؟

**2. ليش يهمك؟ (جملتان)**
- إيش الفائدة العملية؟
- متى بتحتاج هذا في الحياة الحقيقية أو الامتحان؟

**3. إيش تحتاج تعرفه قبل البداية**
- المحاضرات السابقة اللي هذا يعتمد عليها
- ما تفترض الطالب عنده معرفة ما عنده

**4. اشرح الأفكار الرئيسية (الجزء الأساسي) — بأسلوب سردي متصل**
- **ما تقسمها بقوة** إلى sections كتير — اجمع الأفكار المترابطة في flow واحد
- **اشرح بطريقة طبيعية تدفق** — مثل شخص يشرح لصديقه، وليس مثل نقاط في قائمة
- **الفقرات متصلة ببعضها** — كل فقرة تبني على السابقة وتوديك للاحقة
- **شرح عميق لكل فكرة** — ليس تعريف واحد، بل فهم شامل مع context و background
- **استخدم أمثلة حقيقية وسيناريوهات** — من الحياة العادية أو من game development
- **اشرح الـ "لماذا" والـ "متى"** مو بس الـ "ماذا"
- **مثال محدد أو سيناريو** لكل فكرة رئيسية — يجعل المفهوم concrete و memorable
- **الخيط المشترك** — اظهر كيف تتصل الأفكار ببعضها وتشكل نظام متكامل

**5. الأخطاء الشائعة (اللي كل الناس تقع فيها)**

استخدم كتلة **compare** حرفياً — زوج `#### الفهم الخاطئ ❌:` ثم `#### الفهم الصحيح ✅:` لكل خطأ. **ممنوع** صيغة `**❌ الخطأ الأول:**` + فقرات + `✅ **الصحيح:**`.

```markdown
#### الفهم الخاطئ ❌:
[الفهم الخاطئ + ليش يحصل]

#### الفهم الصحيح ✅:
[الصحيح + مثال]
```

**6. إيش اللي بيطلع في الامتحان**
- إيش الأسئلة اللي المدرس دايماً يسأل عنها؟
- إيش الجزء المهم اللي بتركز عليه؟

**7. الربط مع الموضوع اللي جاي بعده**
- إيش اللي بتحتاجه لحل المسائل؟
- كيف هذا يساعدك في المحاضرة الجاية؟

---

**الأسلوب (مهم جداً) — Narrative & Connected:**
- ✅ **Narrative prose first** — فقرات متصلة بطريقة سردية، ليس bullet points
- ✅ كاجوال وودي ("هنا الحاجة"، "فكّر إنك..."، "بس الحاجة اللي...")
- ✅ بسيط وسهل ("ليش؟ لأن...")
- ✅ قصير الفقرات (2-3 أسطر عادة) بس تحس الفقرات متصلة ببعضها
- ✅ اسم الحاجات باسمها ("هذا غلط" مو "هناك فهم شائع يشير إلى...")
- ✅ **استخدم transition phrases** ("والحاجة الثانية اللي...", "من هذا نطلع إلى...", "هذا يخليك تفكر في...")
- ❌ بدون academic language أو formal tone
- ❌ ما تقول "في الواقع" أو "الجدير بالذكر" — قول "والحاجة الغريبة"
- ❌ **تجنب bullet points في المفاهيم الأساسية** — استخدم bullets فقط لقوائم محددة (متطلبات، خطوات، الخ)

---

**لا تضع:**
- جداول مقارنات (تلك في Cheat Sheet) — استخدم narrative descriptions بدل جداول
- تعاريف طويلة أو formal definitions
- أمثلة معقدة من الكتاب — استخدم أمثلة حقيقية بسيطة وسيناريوهات من الحياة اليومية
- **section headers كتير** — الملخص يجب أن يكون **flow واحد متصل** مع headers قليلة جداً، أو بدون headers إلا للأقسام الكبيرة جداً
- **bullet points للمفاهيم الأساسية** — استخدم prose فقط (bullets OK للقوائم الفنية أو المتطلبات)

---

**المسافات والقراءة:**
- فراغات بيضاء كتير
- ما تكتب فقرة طويلة (بطلع كثيف)
- استخدم bullets لكن بحد أدنى
- اكتب بطريقة اللي تخليك تركز وما تملّ

---

**ملاحظة مهمة جداً:**
إذا كان الموضوع يحتوي على **رسمة / صورة / مخطط** في المحاضرة الأصلية:
- ✅ اشرح النص / المفهوم في الملخص الشامل (Part 1)
- ✅ اشرح في التفاصيل (Part 2) أيضاً
- ⚠️ **أضف تحذير في نهاية القسم:** "⚠️ **مهم:** هذا الموضوع شرحه أفضل بكثير من الرسمة/الصورة في الصفحة X من ملف المحاضرة الأصلية — راجعها هناك لتوضيح أفضل."

**السبب:**
كل الطلاب لا يفتحون ملف المحاضرة الأصلية — يعتمدون على الشرح النصي فقط. لو كان في رسمة مهمة، يجب أن تخبرهم "روح شوف الرسمة الأصلية" بدل ما يفوتهم جزء مهم.

---

أقسام مرقّمة (`### 1.`, `### 1.1.`) — كل قسم يتبع البنية الجديدة:

```
### 1.1. Section Title
<!-- @render: {type: "[content_ordering.default_type]", visualization: "none", coverage: "XX%"} -->
<!-- @connectivity: {prerequisite: "section_1.0"} -->

#### 📍 أين نحن الآن؟
[context]

#### ⬅️ الربط مع السابق
[Connection to previous topic — يحل محل "النص الأصلي يقول"]

#### 💡 الفكرة الأساسية
**[One sentence core idea]**

---

#### [Content section based on type]
[formula/code/diagram/prose as appropriate]

#### 📖 الشرح
[2-4 short paragraphs]

#### 🎯 الملخص السريع
- Point 1
- Point 2
- Point 3

#### 📚 التطبيق
[Connection forward]

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
[misconception]

#### الفهم الصحيح ✅:
[correct understanding]

#### ⚠️ تنبيه بصري (إن وجد)
[إذا كان في رسمة أو صورة أو مخطط مهم في المحاضرة الأصلية:
**⚠️ مهم:** هذا الموضوع موضح أفضل بالرسمة/الصورة في الصفحة X من ملف المحاضرة — راجعها هناك.]

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: XX%)</summary>

> [Exact quote]

**ملاحظة على التغطية:**
- ✓ ...
- ⚠️ ...
- ℹ️ ...

</details>
```

---

### الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

**16 سؤالاً** (medium / hard). توزيع:
- مقارنات: 25%
- كود/خوارزمية: 35%
- تطبيق: 30%
- تتبع: 10%

صيغة: `### السؤال {N} ({صعوبة})`
خيارات: أ) ب) ج) د)
تعليل كامل لكل خيار.

---

### الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**≥12 بطاقة** مراجعة سريعة:
```
### البطاقة 1
**Q1:** سؤال؟
**A:** إجابة مختصرة (جملة أو جملتان).
```

---

### الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

جداول فقط (قابلة للطباعة):
- جدول المقارنة السريعة
- القواعس الذهبية
- مرجع سريع للمصطلحات

---

## قواعس الكتل داخل الشرح

[FOR EACH enabled block]

[code:] **💻 الكود:** [languages] — لغة الفنس يجب أن تكون اسم لغة حقيقي. انظر SCHEMA.md v2.0 §Code.
[algorithm:] **⚙️ الخطوات / الخوارزمية:** أسطر داخل fence بصيغة `1 | الخطوة | الأداة | ماذا يحدث`. انظر SCHEMA.md v2.0.
[diagrams:] **📊 المخطط:** 4 أجزاء — `#### 📊 المخطط:` + `#### ما هذا المخطط؟` + بلوك ```` ```mermaid ```` + شرح العناصر والروابط. **`mermaid` إلزامي لكل مخطط — ممنوع ```` ```diagram ```` أو ASCII أو صور. انظر "قواعد المخططات" أعلاه.**
[trace:] **🔍 تتبع التنفيذ:** جدول الخطوات (أعمدة قابلة للتخصيص حسب المادة). انظر SCHEMA.md v2.0.
[analogy:] **💡 التشبيه:** جملة من الحياة اليومية + "وجه الشبه: X = Y". استخدمه بكثرة.
[trade_off:] **⚖️ المقايضة:** جدول المزايا × العيوب (متى تختاره؟).
[before_after:] **🔄 قبل / بعد:** كود/حالة قبل + بعد + "ماذا تغيّر؟"
[compare:] **الفهم الخاطئ ❌ / الفهم الصحيح ✅** — في الملخص الشامل وأقسام الأخطاء: استخدم `#### الفهم الخاطئ ❌:` ثم `#### الفهم الصحيح ✅:` (فقرة أو أكثر لكل جانب). في الشرح المختصر داخل فقرة: سطر واحد لكل منهما بصيغة `**الفهم الخاطئ الشائع ❌:**` / `**الفهم الصحيح ✅:**`.
[callouts:] #### مهم للامتحان ⚠️: / #### نقطة مهمة ⚠️: / #### ملاحظة: / #### الدرس المستفاد:
[think_prompt:] **🤔 تفعيل الفهم:** استخدمه ≥[min_per_lecture] مرات.
[equations:] **📐 المعادلة:** LaTeX في `$$` (عرض) أو `$…$` (داخل السطر) — يتبعها **الشرح:** بمعنى الرموز. **صيغة واحدة لكل `$$`، سطر فارغ حولها، ولا رياضيات داخل backticks أبداً — انظر "قواعد كتابة المعادلات" أعلاه (إلزامي).**

---

## تحقق قبل الإنهاء

[Checklist from subject-brief.output.checklist_items — all items]

[if the subject has equations, append these items verbatim:]
- [ ] لا توجد أي صيغة رياضية داخل backticks (كلها `$…$` أو `$$…$$`)
- [ ] كل `$$` تحتوي صيغة واحدة فقط، وحولها سطر فارغ
- [ ] لا يوجد `|` داخل أي معادلة (استُبدل بـ `\lvert … \rvert`)
- [ ] لا رموز Unicode رياضية خارج اقتباس النص الأصلي
- [ ] كل صفوف كل جدول لها نفس عدد الخلايا
- [ ] أرقام الأجزاء (`## الجزء ...`) فريدة ومتسلسلة

---

## مرجع القوالب (Templates Reference)

> التزم بهذه القوالب حرفياً — البارسر يعتمد على التنسيق الدقيق.

[PASTE FULL TEMPLATES FOR ALL ENABLED PARTS AND BLOCKS]
[No abbreviations — full content only]
```

---

## Meta-Validation Checklist (for meta-prompt generator)

- [ ] كل enabled parts مُضمّنة فقط
- [ ] كل عنوان part يحتوي الكلمة المفتاحية الصحيحة
- [ ] `content_ordering.default_type` مُعكوس في التعليمات
- [ ] `coverage_tracking.enabled` مُعكوس (متطلب metadata)
- [ ] `original_text_display.format` مُعكوس (collapsible vs inline vs hidden)
- [ ] قسم مرجع القوالب يحتوي فقط القوالب المفعّلة، كاملة وحرفية
- [ ] لا إشارات لأي parts/blocks معطّلة
- [ ] صيغة v2.1 (metadata, coverage, collapsible structure)
- [ ] **إن كانت المادة تحتوي معادلات:** قسم "قواعد كتابة المعادلات" منسوخ كاملاً وحرفياً في `custom_prompt.md` (القواعد التسع + قائمة التحقق)
- [ ] **إن كانت المادة لا تحتوي معادلات إطلاقاً:** القسم محذوف بالكامل (لا تُثقل البرومبت بقواعد لا تنطبق)
- [ ] المثال المصغّر لـ `equation-first` يُظهر `$…$` داخل السطر و `$$` مستقلة — لا backticks حول الرياضيات
- [ ] **إن كانت كتلة `diagrams` مفعّلة:** قسم "قواعد المخططات" منسوخ كاملاً، ولا يوجد أي ذكر لـ ```` ```diagram ```` في `custom_prompt.md`

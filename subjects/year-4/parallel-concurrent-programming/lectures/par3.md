# المحاضرة 3 — Functional Parallelism (التوازي الوظيفي)
> **المادة:** البرمجة المتوازية والمتزامنة (نظري) | **الموضوع:** Functional Programming، Lazy Evaluation، Futures، Memoization، Java Streams، Data Race and Determinism

> هذه المحاضرة بتاخدنا من عالم التوازي الآمر (imperative — زي `async`/`finish` اللي شفناها بمحاضرات سابقة) لعالم تاني كلياً: التوازي المبني على أفكار **Functional Programming**. الفكرة الأساسية: لو تجنبنا تعديل الحالة المشتركة (`state mutation`) من الأساس، بنتجنب فئة كاملة من الأخطاء اللي بتصير بالتوازي الآمر. رح نشوف كيف مفهوم بسيط زي **Lazy Computation** بيتطور خطوة خطوة لحد ما يصير `Future` — أداة أساسية بكل لغة برمجة حديثة تقريباً.

---

# الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 1. lecture_overview
هذه المحاضرة بتقدّم **Functional Parallelism** كأسلوب بديل للتوازي، مبني على مبادئ `Functional Programming` (تجنّب الحالة المشتركة والتعديل عليها). بتشرح رحلة الأفكار: من `Lazy Evaluation` (تأجيل الحساب)، لـ `Futures` (مهام بترجع قيمة)، لـ `Memoization` (تذكّر النتائج)، وصولاً لـ `Java Streams` كتطبيق عملي شامل لكل هالأفكار سوا، وأخيراً علاقة كل هذا بمشكلة `Data Race` ومفهوم `Determinism`.

### 2. learning_objectives
بعد هذه المحاضرة رح تقدر:
- تشرح ليش `Functional Programming` مناسب للتوازي والتزامن.
- تفرّق بين `Eager Evaluation` و `Lazy Evaluation` وتكتب `Lazy Memo` بسيط.
- تفهم آلية عمل `Future` وتستخدمه لحساب أشياء بالتوازي مع القيمة الراجعة.
- تكتب `Future Task` باستخدام Java's Fork/Join Framework (`RecursiveTask`).
- تطبّق `Memoization` بالتوازي باستخدام `Futures`.
- تنشئ وتستخدم `Java Streams` (تسلسلية ومتوازية) وتفرّق بين العمليات الوسيطة (`intermediate`) والنهائية (`terminal`).
- تفرّق بين `Functional Determinism` و `Structural Determinism` وتربطهم بمفهوم `Data Race`.

### 3. prerequisites
- أساسيات البرمجة بلغة Java (methods، classes، generics بشكل مبسط).
- مفاهيم أساسية بنظم التشغيل (Thread، Process).
- **مفاهيم من محاضرات سابقة (لازم تكون فاهمها):** `async`/`finish` constructs، `Computation Graph`، `Work` و `Span`، ومفهوم `Data Race` الأساسي.

### 4. main_concepts
- **`Functional Programming`:** أسلوب برمجة بيعامل البرنامج كتقييم دوال رياضية، بدون تعديل حالة (`state mutation`).
- **`Lazy Evaluation`:** تأجيل حساب قيمة لحد ما تحتاجها فعلياً (أو ما تحتاجها إطلاقاً).
- **`Lazy Memo`:** بنية بتحسب القيمة مرة وحدة بس (أول `get()`)، وبترجعها جاهزة بالمرات الجاية.
- **`Future`:** حاوية (`container`) بتُملأ بنتيجة مهمة قد تشتغل بالتوازي، وبيقدر أي خيط تاني يسحب نتيجتها بـ `get()`.
- **`Future Task` بـ Fork/Join:** استخدام `RecursiveTask` بدل `RecursiveAction` عشان ترجع قيمة من التاسك.
- **`Memoization`:** حفظ نتائج استدعاءات دالة سابقة، وبالتوازي بتتحول من `lookup` عادي لـ `Future.get()`.
- **`Java Streams`:** تعميم فكرة الـ Laziness على مجموعات كاملة من العناصر، مع دعم تنفيذ متوازي عبر `.parallel()`.
- **`Data Race` و `Determinism`:** العلاقة بين غياب الـ `Data Race` وضمان إن البرنامج المتوازي `functionally` و `structurally deterministic`.

### 5. connections
- **قبل هذه المحاضرة:** اتعرفنا على أدوات التوازي الآمر الأساسية (`async`, `finish`) وبنية `Computation Graph` مع `Work` و `Span` — هذول كانوا الأساس اللي بنينا عليه فهم التوازي.
- **بعد هذه المحاضرة:** المحاضرات الجاية غالباً رح تبني على مفهوم `Future` وتوسّعه لأدوات تزامن أكتر تعقيداً (`Barriers`, `Phasers`, `Locks`) وتغوص أعمق بمشاكل التزامن (`Deadlock`, `Livelock`, `Starvation`) اللي بلّشنا نلمسها هون من زاوية `Data Race`.

### 6. common_mistakes
- الاعتقاد إن `Lazy Memo` و `Future` نفس الشي تماماً — الفرق الجوهري إنو `Future` ممكن يُحسب بالتوازي على مصدر تاني، أما `Lazy Memo` بيتحسب بنفس الخيط لما تستدعيه.
- نسيان إن العمليات الوسيطة بالـ `Stream` (`filter`, `map`) **لا تنفّذ شيئاً** لحد ما توصل عملية نهائية (`terminal operation`).
- الخلط بين استخدام `RecursiveAction` و `RecursiveTask` — لو محتاج قيمة راجعة لازم `RecursiveTask`.
- الاعتقاد إن `.parallel()` على `Stream` بتضمن تنفيذ متوازي فعلي — بالحقيقة هي مجرد "طلب"، وجافا مو ملزمة تنفّذه متوازياً.
- الظن إن أي برنامج بلا `Data Race` بيكون بالضرورة "بطيء" أو "أبسط" — بالعكس، غياب الـ Race هو اللي بيضمن `Determinism` وسهولة اختبار البرنامج.

---

# الجزء الثاني: الشرح التفصيلي

## 1. مقدمة (Introduction)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "lecture_2", group: "1.1"} -->

### 1.1. ليش نحتاج Functional Parallelism أصلاً؟

#### 📍 أين نحن الآن؟
هاي أول نقطة بالمحاضرة، وهي بوابة الدخول لكل الأفكار الجاية: `Lazy Evaluation`, `Futures`, `Memoization`, `Streams` — كلها نابعة من فلسفة واحدة هي `Functional Programming`.

#### ⬅️ الربط مع السابق
بالمحاضرات السابقة تعلّمنا `async`/`finish` كأدوات لخلق توازي آمر — بنعدّل متغيرات مشتركة (`shared state`) من جوا التاسكات. هالأسلوب فعّال، بس بيفتح باب واسع لأخطاء صعبة الاكتشاف زي `Data Race`. هالمحاضرة بتقترح طريقة تفكير مختلفة كلياً: شو لو تجنبنا تعديل الحالة من الأساس؟

#### 💡 الفكرة الأساسية
**البرمجة الوظيفية (`Functional Programming`) بتلغي فئة كاملة من الأخطاء الصعبة الاكتشاف اللي بتصير بالتوازي الآمر، لأنها أصلاً بتتجنب تعديل الحالة المشتركة.**

---

#### 📖 الشرح
ليش هاي المشكلة موجودة أصلاً؟ تخيل خيطين عندهم إمكانية الوصول لنفس المتغير وتعديله بنفس الوقت — أي ترتيب تنفيذ عشوائي بين الخيطين ممكن يعطي نتيجة مختلفة. المشكلة مو بالتوازي نفسه، المشكلة بـ **التعديل المشترك للحالة** (`state mutation`). فلو صمّمنا الكود بحيث ما في أي دالة بتعدّل شيء خارجها — كل دالة بس بتاخد مدخلات وترجع مخرجات جديدة بدون أثر جانبي (`side effect`) — عمرها ما رح تصير فيها هالمشكلة، بغض النظر عن ترتيب التنفيذ.

هون بالضبط بيدخل مفهوم **`Lazy Computation`**: إذا الدالة ما إلها أثر جانبي، ليش نحسبها أصلاً قبل ما نحتاجها؟ ممكن نأجل الحساب، وبما إنو ما في حالة مشتركة نخاف نعدّلها، هالتأجيل ممكن يتحول بسهولة لتوازي حقيقي — وهاد بالضبط خيط الأفكار اللي رح تمشي فيه هاي المحاضرة.

#### 🎯 الملخص السريع
- التوازي الآمر (`async`/`finish`) بيفتح باب لأخطاء `Data Race` بسبب تعديل حالة مشتركة.
- `Functional Programming` بيتجنب المشكلة من جذورها بمنع الـ `state mutation`.
- `Lazy Computation` هي البوابة اللي بتوصل من `Functional Programming` للتوازي الوظيفي.

#### 📚 التطبيق
هاي المقدمة أساس لكل ما بعدها — رح نبني عليها `Lazy Evaluation` بالقسم الجاي، وبعدين نوسّعها لـ `Futures`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> We need approaches to parallelism that have been inspired by functional programming. Functional parallelism can eliminate many hard-to-detect bugs that can occur with imperative parallelism. What about Lazy computation??

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الدافع وراء الحاجة لـ Functional Parallelism، والربط مع Lazy Computation.

</details>

---

## 2. البرمجة الوظيفية (Functional Programming)
<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_1.1", group: "2.1-2.2"} -->

### 2.1. ما هي Functional Programming؟ وليش نستخدمها؟

#### 📍 أين نحن الآن؟
هاي المجموعة (2.1) بتعرّف `Functional Programming` كـ `Programming Paradigm` (نمط برمجة)، وبتشرح خصائصها الأساسية، وليش هاي الخصائص بالذات هي اللي بتخليها مناسبة للتوازي.

#### ⬅️ الربط مع السابق
بالقسم السابق قلنا إن الحل هو "تجنب تعديل الحالة" — هلق رح نشوف شو اسم النمط البرمجي اللي بيطبّق هالمبدأ فعلياً، وشو خصائصه بالتفصيل.

#### 💡 الفكرة الأساسية
**`Functional Programming` نمط برمجة بيعامل البرنامج كتقييم دوال رياضية، وبيتجنب أي تعديل على الحالة (`state`) أو أي أثر جانبي (`side effect`).**

---

#### 📖 الشرح
فكّر بالفرق بين معادلة رياضية زي `f(x) = x + 1` وبين سطر كود زي `x = x + 1`. المعادلة الرياضية **ما بتغيّر** قيمة `x` — هي بس بتوصف علاقة، وكل مرة بتعطيها نفس المدخل بترجع نفس المخرج. أما السطر البرمجي التقليدي بيعدّل `x` فعلياً بالذاكرة. `Functional Programming` بتتبنى فلسفة المعادلة الرياضية: كل دالة هي علاقة بين مدخل ومخرج، بدون أي أثر جانبي على أي شيء خارجها.

من أهم خصائصها:
- **`Avoids State` / `Avoids Mutation`:** ما في متغيرات بتتغير قيمتها بعد إنشائها.
- **`Recursion`:** بدل الحلقات (`loops`) اللي بتحتاج متغير عداد بيتغير، بنستخدم استدعاء الدالة لنفسها.
- **`First-order` و `Higher-order functions`:** دوال بسيطة، ودوال بتاخد أو بترجع دوال تانية كمدخلات/مخرجات (زي `map`, `filter` اللي رح نشوفهم لاحقاً بالـ Streams).
- **`Closures`:** دالة بتقدر "تتذكر" المتغيرات المحيطة فيها وقت إنشائها.
- **`Composition`:** بناء دوال معقدة من تركيب دوال أبسط.

**ليش هذا مهم للتوازي تحديداً؟** لأن أكبر مصدر صداع بالتوازي والتزامن هو تعديل الحالة المشتركة (`state mutation`) — لو ما في حالة أصلاً نعدّلها، بنضمن إنو نفس المدخلات دايماً بترجع نفس المخرجات (`Same inputs yield same outputs every time`)، بغض النظر عن ترتيب أو توقيت التنفيذ. هذا بيخلي البرنامج أسهل بالتصميم، وأسهل بالاختبار والتصحيح (`testing and debugging`)، وأسهل بالتشغيل على أكتر من خيط بنفس الوقت.

#### 🤔 تفعيل الفهم
لو عندك دالة `sum(a, b)` بترجع `a + b` بدون ما تغيّر أي متغير خارجي، هل ممكن يصير فيها `Data Race` لو استدعتها 100 خيط بنفس الوقت؟ فكّر ليش قبل ما تكمل.

#### مهم للامتحان ⚠️:
تذكر: `Functional Programming` **مو silver bullet** (حل سحري لكل شيء) — الشريحة الأصلية بتذكر هذا صراحة. هي بتسهّل التوازي بس مش كل مشكلة برمجية بتنحل بيها.

#### 🎯 الملخص السريع
- `Functional Programming`: تقييم دوال رياضية بدون `state` أو `side effects`.
- خصائصها: `Recursion`, `First/Higher-order functions`, `Closures`, `Composition`.
- الفائدة الأساسية للتوازي: تجنب `state mutation` = تجنب أكبر مصدر تعقيد بالتوازي.
- نفس المدخلات = نفس المخرجات دايماً، وهذا بيسهّل الاختبار والتشغيل المتوازي.
- **مو حل سحري لكل شيء.**

#### 📚 التطبيق
بالقسم الجاي رح نشوف أول تطبيق عملي لهاي الفلسفة: `Lazy Computation` — كيف تأجيل الحساب مبني أصلاً على غياب الأثر الجانبي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيظنو إن `Functional Programming` معناها بس "استخدام دوال" (زي أي لغة عادية فيها methods)، فبيحسبو إنه أي كود فيه دوال هو "functional" تلقائياً.

#### الفهم الصحيح ✅:
المعيار الحقيقي مو "وجود دوال" — المعيار هو **غياب الأثر الجانبي** (`side effects`) و **عدم تعديل الحالة** (`no state mutation`). دالة Java عادية فيها `this.field = x` (تعديل حقل الكلاس) **ليست** functional حتى لو اسمها "method"، لأنها عدّلت حالة الكائن.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

> **What is Functional Programming?** Programming Paradigm. Treats programming as evaluating mathematical functions. Avoids state. Avoids mutation (no side effects). Recursion. First-order functions. Higher-order functions. Closures. Composition.
>
> **Why is Functional Programming?** Main focus: avoiding mutation of state. A methodology for solving computation problems without mutating state. State mutation is one of the biggest source of headaches and complexity in parallel and concurrent programming (more on this later in the course). Functional programming paradigm makes programs easier to design and manage when concurrency and parallelism are the goal. FP is easier to think about before you start writing your code. FP is easier to test and debug — Same inputs yield same outputs every time. FP abstractions are much easier to run concurrently. Not a silver bullet!

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل الخصائص المذكورة، وكل أسباب "ليش" المذكورة بالشريحة الثانية.
- ℹ️ إضافة من الدليل: التشبيه بين المعادلة الرياضية والسطر البرمجي (مو موجود بالمحاضرة الأصلية، إضافة للتوضيح).

</details>

---

## 3. الحساب الكسول (Lazy Computation)
<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_2.1", group: "3.1-3.3"} -->

### 3.1. Lazy Evaluation: ليش نأجل الحساب؟

#### 📍 أين نحن الآن؟
هاي المجموعة (3.1 → 3.3) بتشرح فكرة `Lazy Evaluation` من الأساس، وبعدين بتوريك تطبيقها العملي بـ `Lazy Memo`، وأخيراً كيف هاي الفكرة البسيطة بتتحول لبذرة التوازي.

#### ⬅️ الربط مع السابق
بعد ما فهمنا إن `Functional Programming` بيتجنب الأثر الجانبي، صار عنّا سؤال طبيعي: إذا الدالة ما إلها أثر جانبي، ليش نحسبها فوراً أصلاً؟ هاد بالضبط اللي جايين نجاوب عليه.

#### 💡 الفكرة الأساسية
**`Lazy Evaluation` تعني تأجيل حساب قيمة إلى (وإذا فقط) اللحظة اللي نحتاجها فيها فعلياً.**

---

#### 💻 الكود
```java
// Logging library example
Log.i(TAG, "current input: " + input.toString()); // eager
Log.i(TAG, () -> "current input: " + input.toString()); // lazy
```

#### شرح الكود سطراً بسطر
1. **السطر الأول (`eager`):** التعبير `"current input: " + input.toString()` بينحسب **فوراً** لما يوصل هالسطر بالتنفيذ، حتى لو `Log.i` قررت متأخراً إنها ما رح تطبع شيء (مثلاً لأن اللوغ معطّل).
2. **السطر الثاني (`lazy`):** بدل ما نمرّر النص الجاهز، بنمرّر `lambda` (`() -> ...`) — يعني "وصفة" لحساب النص، مو النص نفسه. الحساب الفعلي (`input.toString()`) ما بيصير إلا لو `Log.i` قررت فعلاً إنها محتاجة النص وناديت على الـ lambda.

#### 📖 الشرح
ليش هالفرق مهم؟ لأنه في حالتين بيكون فيهم الحساب المسبق (`eager`) مضيعة وقت:
1. **ممكن يكون الحساب مكلف** (`expensive to compute something`) — زي `input.toString()` لو كان `input` كائن معقد.
2. **ممكن ما تحتاجه أصلاً** (`won't actually need it`) — زي حالة اللوغ المعطّل، فلا داعي نحسب نص رح ينرمى.

الفكرة الجوهرية: **أجّل الحساب لحد ما (وإذا) تحتاجه فعلاً.** بالـ `eager` أسلوب، بنحسب دايماً بغض النظر عن الحاجة. بالـ `lazy` أسلوب، الحساب بس بيصير عند الطلب الفعلي.

#### 🎯 الملخص السريع
- `Eager`: احسب فوراً بغض النظر عن الحاجة.
- `Lazy`: أجّل الحساب لحد ما تحتاجه فعلياً (أو ما تحتاجه إطلاقاً).
- الفائدة: توفير حساب مكلف غير ضروري.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف كيف نبني `Lazy Memo` — بنية فعلية بتطبّق هالفكرة وبتضيف عليها ميزة "تذكّر" النتيجة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Logging library. Log.i(TAG, "current input: " + input.toString()); // eager. Log.i(TAG, ()->"current input: " + input.toString()); // lazy. Why lazy? Maybe it's expensive to compute something. Maybe you won't actually need it (e.g., if you disabled logging). The idea: defer computation of a value until (and if) you need it.

</details>

---

### 3.2. Lazy Memo: تذكّر النتيجة بعد حسابها مرة وحدة

#### 💡 الفكرة الأساسية
**`Lazy Memo` بتحسب القيمة مرة وحدة بس عند أول طلب، وبعدين بتحفظها عشان أي طلب لاحق يرجعها فوراً بدون إعادة حساب.**
*(وبعد ما فهمنا `Lazy Evaluation`، جاي دورنا نشوف كيف تُبنى فعلياً بكلاس `Lazy<T>`.)*

---

#### 💻 الكود
```java
public class Lazy<T> {
    private T contents;
    private Supplier<T> supplier;

    // Private constructor (as usual) plus a factory method (Lazy.of)
    private Lazy(Supplier<T> supplier) {
        contents = null;
        this.supplier = supplier;
    }

    public T get() {
        // If we've already computed the answer, return it.
        if (contents != null) {
            return contents;
        }
        // Call the lambda (once), get the result, forget the lambda.
        if (supplier != null) {
            contents = supplier.get();
            supplier = null;
        }
        return contents;
    }
}
```

#### شرح الكود سطراً بسطر
1. **`private T contents;`** — هون رح تنحفظ القيمة النهائية بعد ما تنحسب. تبدأ `null` لأنه لسا ما انحسبت.
2. **`private Supplier<T> supplier;`** — "الوصفة" (`lambda`) اللي بتعرف كيف تحسب القيمة، لكنها لسا ما نُفّذت.
3. **الـ constructor خاص (`private`)** — يعني ما ينبنى الكائن مباشرة من برّا الكلاس، لازم "factory method" اسمها `Lazy.of` (مش موجودة بالكود المبسّط، بس مذكورة بالشريحة).
4. **`if (contents != null) return contents;`** — لو الحساب صار قبل هيك، رجّع النتيجة الجاهزة فوراً، بدون أي حساب إضافي.
5. **`contents = supplier.get(); supplier = null;`** — أول مرة بس: نادِ على الـ `lambda` عشان تحسب القيمة، احفظها بـ `contents`، وبعدين انسَ الـ `supplier` (خليه `null`) — ما رح نحتاجه تاني.

#### 📖 الشرح
هاي البنية بتجمع فكرتين سوا: **`Laziness`** (ما بتحسب القيمة إلا عند أول `get()`) و **`Memoization`** (بعد ما تحسبها مرة، بتحفظها وما بتعيد حسابها تاني). فكّرها متل موظف كسول لكن ذكي: أول مرة تطلب منه تقرير، بيقعد يحضّره (يستهلك وقت)، بس بعدين بيحتفظ بنسخة، وأي طلب جاي بيعطيك نفس النسخة فوراً بدون ما يعيد الشغل.

هاي بالضبط فكرة **`Dynamic Programming`** المعروفة بعلم الحاسوب — حساب القيمة مرة، وإعادة استخدامها بدل إعادة حسابها من الصفر.

#### 🎯 الملخص السريع
- `Lazy<T>` بتحسب القيمة مرة وحدة بس، بأول `get()`.
- بعد الحساب الأول، الطلبات الجاية بترجع النتيجة المحفوظة فوراً.
- هاي الفكرة اسمها `Memoization` — أساس بمواضيع زي `Dynamic Programming`.

#### 📚 التطبيق
حالياً `Lazy<T>` بتشتغل بنفس الخيط اللي استدعى `get()`. بالفقرة الجاية رح نشوف: شو لو خلّينا الحساب يصير بخيط تاني (`spare resources`) بدل ما ننتظره بنفس الخيط؟

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Lazy and Memorization!! The idea: compute a value once when you need it, then save it. Deep, powerful idea in computer science (e.g., dynamic programming). [كود Lazy<T> الكامل كما هو موضّح فوق]

</details>

---

### 3.3. من Laziness إلى Parallelism

#### 💡 الفكرة الأساسية
**بدل ما ننتظر حتى اللحظة اللي نحتاج فيها القيمة، ممكن نبلّش حسابها بخيط/معالج تاني من الآن، ونروح نعمل شغل تاني بالوقت هذا.**

---

#### 📖 الشرح
بالـ `Lazy Memo` العادي، السؤال كان: "ليش أحسب الشيء إذا ما رح أحتاجه؟". هلق السؤال بيتغير: **"شو لو بعرف إني رح أحتاج القيمة أكيد، بس مو هلق بالضبط؟"** — هون بيصير عنّا فرصة ذهبية: خلّي "الوصفة" (`supplier`) تشتغل **بالتوازي على مصدر فاضي** (معالج/core تاني)، وأنا (الخيط الحالي) بروح أعمل شغل تاني بنفس الوقت. لما أوصل فعلاً للحظة اللي بدي فيها القيمة، إما تكون خلصت (فآخدها فوراً)، أو لسا شغالة (فأنتظرها شوي).

هاي بالضبط النقلة من `Laziness` (تأجيل بالزمن، بنفس الخيط) لـ `Parallelism` (تفويض الشغل، لخيط/معالج تاني).

#### 💡 التشبيه
تخيلك طالب عندك واجب صعب. بدل ما تستناه لآخر لحظة وتحله لحالك (Lazy عادي)، بتعطيه لصاحبك يحله من هلق وانت كمل بشغل تاني (Parallel). وجه الشبه: صاحبك = الخيط التاني، الواجب = الـ `supplier`، وآخر لحظة بتسلّم فيها الواجب = استدعاء `get()`.

#### 🎯 الملخص السريع
- `Lazy`: أجّل الحساب بالزمن (بنفس الخيط).
- `Parallel`: فوّض الحساب لمصدر تاني، واشتغل شيء تاني بنفس الوقت.
- الانتقال من الفكرة الأولى للثانية هو أساس ظهور `Future`.

#### 📚 التطبيق
هذا بالضبط تعريف الـ `Future` اللي رح نشرحه بالقسم الجاي — نسخة من `Lazy Memo` لكن الحساب فيها ممكن يصير بالتوازي.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Why lazy? Maybe it's expensive to compute the contents. Maybe you won't actually need it. The idea: defer computation of a value until (and if) you need it. What if? I know that I will need the contents eventually. But not right now. My framework knows how to execute the supplier in parallel on spare resources, so I can go do something else in the meantime. The idea: offload the computation of the contents by the supplier to spare resources (another core), get the (hopefully already computed) value when you need it.

</details>

---

## 4. Futures: مهام مع قيمة راجعة
<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_3.3", group: "4.1-4.4"} -->

### 4.1. ما هو Future؟

#### 📍 أين نحن الآن؟
هاي المجموعة (4.1 → 4.4) بتشرح `Future` بالتفصيل: تعريفه، مثال عملي بسيط، خصائصه الرسمية، والفرق التقني عن `Lazy Memo`، ووصولاً لتطبيقه بـ Java's Fork/Join Framework.

#### ⬅️ الربط مع السابق
بالقسم السابق وصلنا لفكرة إنو الحساب ممكن ينفّذ بالتوازي بدل ما ننتظره. `Future` هو التجسيد الرسمي والعملي لهاي الفكرة.

#### 💡 الفكرة الأساسية
**`Future` هو حاوية للقراءة فقط (`read-only container`)، بتبدأ فاضية، وبتنملى بنتيجة مهمة قد تُنفّذ بالتوازي، ويقدر أي طرف يسحب نتيجتها عبر `get()`.**

---

#### 💻 الكود
```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    finish(() -> {
        var future = future(() -> {
            // do some work
            System.out.println("Done with the future task");
            return "Hello From the Future!";
        });

        // do main work
        System.out.println("Done with the main task");
        try {
            System.out.println("The future task returned the value " + future.get());
        } catch (InterruptedException | ExecutionException ex) {
            Logger.getLogger(Test3.class.getName()).log(Level.SEVERE, null, ex);
        }
    });
}
```

#### شرح الكود سطراً بسطر
1. **`finish(() -> { ... })`** — نفس الـ `finish` اللي اتعرفنا عليها بمحاضرات سابقة: بتنتظر كل التاسكات الجوّاها لحد ما تخلص.
2. **`var future = future(() -> {...})`** — هون بننشئ `Future Task`: مهمة بترجع قيمة (`"Hello From the Future!"`)، وممكن تشتغل بالتوازي مع باقي الكود.
3. **`System.out.println("Done with the future task")`** — هاد داخل الـ `Future Task` نفسها، بيطبع لما هاي المهمة تخلص شغلها.
4. **`System.out.println("Done with the main task")`** — هاد بالبرنامج الرئيسي، بيستمر بالتنفيذ **بدون ما ينتظر** الـ `Future Task`.
5. **`future.get()`** — هون **البرنامج الرئيسي بينتظر** (إذا لسا الـ Future ما خلصت) نتيجة الـ `Future Task`، وبياخد القيمة الراجعة.
6. **الـ `try/catch`** — لازم نلف `get()` بـ `try/catch` لأنها ممكن ترمي `InterruptedException` أو `ExecutionException` (لو صار خطأ داخل التاسك).

#### 📖 الشرح
لاحظ الفرق عن `Lazy Memo`: بالـ `Lazy Memo`، الـ `get()` الأول كان بيحسب القيمة **بنفس الخيط** (فكأنه بيوقف كل شيء ريثما يحسبها). أما هون، `future(() -> {...})` ممكن ينفّذ **على خيط تاني تماماً**، فالبرنامج الرئيسي بيكمل شغله (`Done with the main task`) بنفس الوقت اللي الـ Future التاسك عم يشتغل فيه. بس لما نوصل فعلياً `future.get()`، عندها بس بننتظر (إذا لسا ما خلصت).

#### 📖 مخطط توضيحي: تدفق تنفيذ Future

**📊 المخطط**
هاد رسم بياني بيوضح كيف "Main program" و "Future task" بيشتغلو بالتوازي، وكيف `future.get()` بيربطهم مع بعض.

| رقم العقدة | الوصف |
| --- | --- |
| N1 | `var future = future(() -> ...)` — إنشاء الـ Future (فاضي بالبداية) |
| N2 | `doRandomWork()` بالبرنامج الرئيسي (Main program) |
| N3 | `doRandomWork()` داخل الـ Future task (بيشتغل بالتوازي مع N2) |
| N4 | `return "Hello From the Future!"` — الـ Future task بترجع نتيجتها |
| N5 | `future.get()` — البرنامج الرئيسي بيسحب النتيجة (ينتظر إذا لزم) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| N1 | N2 | تسلسلي (البرنامج الرئيسي مكمل شغله) |
| N1 | N3 | توازي (Future task بتبلّش بالتوازي) |
| N3 | N4 | تسلسلي (داخل الـ Future task) |
| N4 | N5 | اعتماد بيانات (`data dependency`) — N5 لازم تنتظر N4 |
| N2 | N5 | تسلسلي (Main program بيوصل لهون بعد ما يخلص شغله) |

```flowchart
[N1: Create Future] --> [N2: Main does random work]
[N1: Create Future] --> [N3: Future task does random work]
[N3] --> [N4: return "Hello From the Future!"]
[N2] --> [N5: future.get()]
[N4] -.data dependency.-> [N5]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: البرنامج الرئيسي (N1) بينشئ الـ `Future` فاضية، وبعدها بيمشي بمسارين بالتوازي — واحد بالـ `Main program` (N2) وواحد بالـ `Future task` (N3→N4). المساران بيشتغلو مستقلين تماماً عن بعض، لحد ما يوصل البرنامج الرئيسي لنقطة `future.get()` (N5) — هون بس صار في اعتماد: N5 لازم تستنى N4 قبل ما تكمل.

#### 🎯 الملخص السريع
- `Future`: حاوية فاضية بالبداية، بتنملى بنتيجة مهمة ممكن تشتغل بالتوازي.
- إنشاء الـ `Future` بيرجع فوراً (`creation completes immediately`) — ما بينتظر.
- أول `get()` ممكن ينتظر (`block`) لو النتيجة لسا ما جهزت.
- استدعاءات `get()` اللاحقة بترجع فوراً (متل `Lazy Memo` بالضبط).

#### 📚 التطبيق
بالقسم الجاي رح نفصّل الخصائص الرسمية لـ `Future` ونقارنها بدقة أكبر مع `Lazy Memo`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90%)</summary>

> [الكود الكامل لمثال Futures، ورسمتين توضيحيتين لتدفق البرنامج الرئيسي والـ Future task]

**ملاحظة على التغطية:**
- ⚠️ لم يتم شرح بالكامل: الرسمة الثانية بالمحاضرة فيها صورة "طفل مستني" (`waiting`) كرمزية لانتظار `future.get()` — تم تجاهل الرمزية الفكاهية والتركيز على المضمون التقني فقط.
- ℹ️ إضافة من الدليل: جدول العُقد والروابط وبلوك الـ flowchart (مو موجودين بالمحاضرة الأصلية بهالصيغة، تم بناؤهم لتوضيح الرسمة الأصلية).

</details>

---

### 4.2. خصائص Future الرسمية

#### 💡 الفكرة الأساسية
**`Future` بيشبه `Lazy Memo` بمعظم خصائصه، إلا بفرق جوهري واحد: إمكانية التنفيذ المتوازي.**
*(هاي الفقرة بتلخّص وتقارن بدقة أكبر — مو تعريف جديد.)*

---

#### 📖 الشرح
خلّينا نسرد الخصائص وحدة وحدة، ونقارنها مع `Lazy Memo` بكل نقطة:

1. **حاوية للقراءة فقط** (`Read-only container`) — تماماً متل `Lazy Memo`.
2. **فاضية عند الإنشاء** (`Always Empty on creation`) — تماماً متل `Lazy Memo`.
3. **الإنشاء بيكتمل فوراً** (`Creation completes immediately`) — تماماً متل `Lazy Memo`، ما بننتظر شيء وقت الإنشاء.
4. **بتنملى بلامدا** (`Gets computed and filled-in by a lambda`) — تماماً متل `Lazy Memo`.
5. **المستخدم بينادي `get()` لأخذ القيمة** — تماماً متل `Lazy Memo`.
6. **⭐ الفرق الجوهري:** اللامدا اللي بتحسب القيمة **ممكن تُنفّذ بالتوازي** (`unlike the Lazy Memo`) — هاد الفرق الوحيد الحقيقي.
7. **المستخدم ممكن ينتظر (`block`) بأول `get()`** لو القيمة لسا مو جاهزة — الشريحة بتوصفها "`Kind of` متل الـ Lazy Memo"، لأنه حتى الـ `Lazy Memo` بينتظر بشكل ما (لازم ينفّذ اللامدا وقتها لو ما نُفّذت قبل).
8. **استدعاءات `get()` اللاحقة بترجع فوراً** — تماماً متل `Lazy Memo`.

#### 🎯 الملخص السريع
- `Future` = `Lazy Memo` + إمكانية تنفيذ اللامدا بالتوازي.
- كل الخصائص الباقية (فاضي بالبداية، إنشاء فوري، `get()` أول بينتظر، `get()` بعدين فوري) مشتركة بينهم.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيعتقدو إن `Future` و `Lazy Memo` هم نفس المفهوم تماماً بس بأسماء مختلفة، لأنهم بيتشابهو بكل السلوك الظاهري تقريباً (فاضي بالبداية، `get()` لأخذ القيمة...).

#### الفهم الصحيح ✅:
الفرق الحاسم: **`Lazy Memo` بتحسب اللامدا بنفس الخيط اللي طلب `get()`، أما `Future` ممكن تحسب اللامدا بخيط/معالج تاني تماماً بالتوازي.** يعني السؤال الفاصل: هل مكان الحساب ثابت مع الطالب أم ممكن يكون بمكان تاني؟

#### 📚 التطبيق
بالقسم الجاي رح نشوف `Future Task` بشكل أعمق — `Future` كتركيبة رسمية بعمليتين أساسيتين: `Assignment` و `Blocking read`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Read-only container (just like a Lazy Memo). Always Empty on creation (just like a Lazy Memo). Creation completes immediately (just like a Lazy Memo). Gets computed and filled-in by a lambda (just like a Lazy Memo). The user calls get() on it to get the value (just like a Lazy Memo). The lambda to compute the value may be executed in parallel — Unlike the Lazy Memo. The user may block on the first get() if the value is not ready — Kind of like the Lazy Memo. The first get() on the Lazy Memo always (kind of) blocks: it has to wait for the lambda to execute. Subsequent get() calls complete immediately (just like a Lazy Memo).

</details>

---

### 4.3. Future Tasks: العمليتان الأساسيتان و MultiLisp

#### 💡 الفكرة الأساسية
**`Future Task` هو مفهوم بسيط بس قوي جداً بالتوازي والتزامن، وله عمليتان أساسيتان محددتان بدقة: `Assignment` و `Blocking read`.**
*(بعد ما فهمنا Future كتصور عام، هلق منشوف تعريفه الرسمي الدقيق بلغة العمليات.)*

---

#### 📖 الشرح
مفهوم `Future` مو بس فكرة — هو مبني على عمليتين محددتين بدقة عشان يتجنب أي غموض:

1. **`Assignment` (الإسناد):** متغيّر `A` ممكن ينسند إله مرجع (`reference`) لكائن `Future` راجع من تاسك بالصيغة `future { ⟨task-with-return-value⟩ }`. المهم هون: **محتوى الـ Future قابل للإسناد مرة وحدة بس** (`single assignment`) — تماماً متل متغيّر `final` بجافا — وما ممكن يتعدّل بعد ما التاسك يرجع نتيجته.

2. **`Blocking read` (القراءة الحاجزة):** العملية `A.get()` بتنتظر لحد ما التاسك المرتبط بـ `A` يخلص، وبعدين بترجع القيمة الراجعة من التاسك كقيمة لـ `A.get()`. **أي جملة `S` بتنفّذ بعد `A.get()`** مضمون إنو تاسك `A` خلص شغله **قبل** ما تبدأ `S` بالتنفيذ.

هاتين العمليتين معرّفتين بعناية فائقة عشان **يتجنبو احتمال `Race Condition` على القيمة الراجعة للتاسك** — وهاد بالضبط سبب كون الـ `Futures` مناسبة جداً للتوازي الوظيفي. من أقدم استخدامات الـ Futures بالحوسبة المتوازية كان بامتداد للغة Lisp اسمه **`MultiLisp`**.

#### 🎯 الملخص السريع
- `Assignment`: ربط متغيّر بمرجع Future، والمحتوى قابل للإسناد **مرة وحدة بس** (زي `final`).
- `Blocking read` (`A.get()`): تنتظر خلاص التاسك وبترجع نتيجته، وبتضمن ترتيب زمني (`happens-before`) لكل كود بعدها.
- هاتين العمليتين هما سبب خلو الـ Futures من الـ `Race Condition` على القيمة الراجعة.
- أقدم استخدام للفكرة: امتداد `MultiLisp` للغة Lisp.

#### 📚 التطبيق
بالقسم الجاي رح نطبّق هالمفهوم بمثال عملي كامل: جمع مصفوفة بالتوازي (`Two-way parallel sum`) باستخدام `Futures`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 85%)</summary>

> Extend the concept of asynchronous tasks to future tasks and future objects (also known as promise objects). Future tasks are tasks with return values, and a future object is a "handle" for accessing a task's return value. There are two key operations that can be performed on a future object A: Assignment... Blocking read... These operations are carefully defined to avoid the possibility of a race condition on a task's return value, which is why futures are well suited for functional parallelism. In fact, one of the earliest use of futures for parallel computing was in an extension to Lisp known as MultiLisp.

**ملاحظة على التغطية:**
- ⚠️ لم يتم شرح بالكامل: صورة السبورة اليدوية (handwritten) اللي فيها رموز `A=F(B)`, `FA = FUTURE{B}` إلخ — هاي صورة معقدة مكتوبة بخط اليد، تم الاكتفاء بشرح المفهوم النظري المكافئ لها نصياً بدل إعادة رسمها حرفياً.
- ℹ️ راجع قسم "محتوى غير قابل للمعالجة" أدناه لتفاصيل الصورة.

</details>

#### ملاحظة:
جزء من هالشريحة موضّح بصورة سبورة مكتوبة بخط اليد (صفحة Future Tasks cont'd)، بتوضح تسلسل عمليات `future{}` و `.get()` لسلسلة من الدوال المترابطة (`A=F(B)`, `C=G(A)`, `D=H(A)`) وكيف بتتحول لشجرة `Computation Graph` فيها `join`. **ملخص المحتوى:** الصورة بتوضح إنو لو عندك `C` و `D` بالاثنين محتاجين نتيجة `A`، وبتحسبهم بالتوازي (`future`)، فكل وحد لازم ينادي `.get()` على `A` (أو نسختها كـ Future، `FA`) وينتظرها لحد ما تجهز — وهاد بالضبط معنى `Blocking Read` اللي شرحناه فوق، مطبّق على سيناريو فيه أكتر من تاسك معتمد على نفس النتيجة.

---

### 4.4. مثال متكامل: جمع مصفوفة بالتوازي باستخدام Futures

#### 💡 الفكرة الأساسية
**نفس مسألة الجمع اللي شفناها بمحاضرات سابقة بـ `async`/`finish`، بس هلق نحسب النتيجة كـ قيمة راجعة من `Future` مباشرة بدل متغيّر مشترك.**

---

#### 💻 الكود
```java
// Parent Task T1 (main program)
// Compute sum1 (lower half) & sum2 (upper half) in parallel
var sum1 = future(() -> { // Future Task T2
    int sum = 0;
    for (int i = 0; i < X.length / 2; i++) sum += X[i];
    return sum;
});
var sum2 = future(() -> { // Future Task T3
    int sum = 0;
    for (int i = X.length / 2; i < X.length; i++) sum += X[i];
    return sum;
});
// Task T1 waits for Tasks T2 and T3 to complete
int total = sum1.get() + sum2.get();
```

#### شرح الكود سطراً بسطر
1. **`var sum1 = future(() -> {...})`** — تاسك T2: بتحسب مجموع النصف الأول (`lower half`) من المصفوفة، وترجعه كـ `int`.
2. **`var sum2 = future(() -> {...})`** — تاسك T3: بتحسب مجموع النصف الثاني (`upper half`)، بالتوازي مع T2.
3. **`int total = sum1.get() + sum2.get();`** — التاسك الأب T1 بينادي `get()` على الاثنين — كل `get()` بينتظر تاسكه المرتبط، وبعدين بيجمع القيمتين.

#### 📖 الشرح
لاحظ الفرق الجوهري عن الأسلوب الآمر: **ما في أي متغيّر مشترك يتم تعديله** (زي `sum += X[i]` بمتغير خارجي مشترك بين تاسكات). كل تاسك بيحسب مجموعه الخاص محلياً، وبيرجعه كقيمة — بدون أثر جانبي على أي شيء برّا نفسه. الجمع النهائي بيصير بس بعد ما الاثنين يخلصو (بسبب `get()` اللي بتنتظر).

فيه طريقة بديلة أبسط شوي: خلّي التاسك الأب نفسه يحسب نص المصفوفة مباشرة (بدون `future` ثانية)، وبس النص التاني يكون `Future Task`:

```java
// Task T2 (the future task) computes the lower half sum
var sum1 = future(() -> { // Future Task T2
    int sum = 0;
    for (int i = 0; i < X.length / 2; i++) sum += X[i];
    return sum;
});

// Task T1 (the main program) computes the upper half sum
int sum2 = 0;
for (int i = X.length / 2; i < X.length; i++) sum2 += X[i];

// Task T1 waits for Task T2 to complete
int total = sum1.get() + sum2;
```

هون التاسك الأب بيشتغل مباشرة (بدون `future`) على النص التاني، وبيوفّر إنشاء تاسك إضافية — تحسين بسيط بس مفيد.

#### 🎯 الملخص السريع
- كل تاسك بيرجع نتيجته كقيمة، بدون أي متغيّر مشترك يتعدّل.
- ممكن نخلي التاسك الأب يشتغل مباشرة على جزء من الشغل بدل إنشاء `future` إضافية.

#### 📚 التطبيق
بالقسم الجاي رح نشوف كيف يترجم هالمفهوم بالضبط لـ Java's Fork/Join Framework فعلياً — باستخدام `RecursiveTask`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [كود Example: Two-way parallel sum using Futures، وكود Another way of computing Parallel Sum]

</details>

---

## 5. Futures في Java's Fork/Join Framework
<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_4.4", group: "5.1-5.2"} -->

### 5.1. الفرق بين Future Task و Regular Task بالـ FJ Framework

#### 📍 أين نحن الآن؟
هاي المجموعة (5.1 → 5.2) بتاخد مفهوم `Future` النظري وتربطه مباشرة بـ Java's Fork/Join Framework العملي، من خلال `RecursiveTask` بدل `RecursiveAction`.

#### ⬅️ الربط مع السابق
اتعرفنا نظرياً على `Future` وعملياته. هلق السؤال العملي: كيف نكتب هذا فعلياً بجافا باستخدام أدوات الـ Fork/Join اللي صممت أصلاً للتوازي؟

#### 💡 الفكرة الأساسية
**بالـ Fork/Join Framework، الـ `Future Task` بترث من `RecursiveTask` (مو `RecursiveAction`)، وميثود `compute()` فيها لازم يرجع قيمة، ولازم `join()` يرجع نتيجة التاسك.**

---

#### 📖 الشرح
فيه ثلاث فروقات دقيقة بين تاسك عادية (`Regular Task`) وتاسك مستقبلية (`Future Task`) بإطار الـ Fork/Join:

1. **الكلاس الأساس:** التاسك العادية بترث من `RecursiveAction`، أما الـ `Future Task` بترث من **`RecursiveTask`**.
2. **نوع الإرجاع لـ `compute()`:** بالتاسك العادية، `compute()` نوعها `void` (ما بترجع شيء). أما بالـ `Future Task`، `compute()` **لازم يكون إلها نوع إرجاع غير void**.
3. **معنى `join()`:** استدعاء زي `left.join()` بالحالتين بينتظر التاسك المرتبطة بـ `left`، **بس** بحالة الـ `Future Task`، `join()` كمان **بيرجع القيمة الراجعة** من التاسك (مو بس ينتظرها).

#### 🤔 تفعيل الفهم
لو كتبت `compute()` بترجع `void` جوّا كلاس بيرث من `RecursiveTask<Integer>`، شو توقع يصير؟ (جاوب قبل ما تكمل: راح يصير خطأ compile-time، لأنه `RecursiveTask` بيفرض نوع إرجاع مطابق لجينيريك الكلاس، مو `void`).

#### 🎯 الملخص السريع
- `RecursiveTask` بدل `RecursiveAction` عند الحاجة لقيمة راجعة.
- `compute()` لازم يرجع قيمة (غير `void`) بالـ `Future Task`.
- `join()` بترجع القيمة الفعلية بحالة `Future Task`، مو بس تنتظر.

#### 📚 التطبيق
بالقسم الجاي رح نشوف مثال كامل ومقارنة بين النسخة التسلسلية والمتوازية لجمع مصفوفة (`Recursive Array Sum`) باستخدام هالمفاهيم.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Some key differences between future tasks and regular tasks in the FJ framework are as follows: A future task extends the RecursiveTask class in the FJ framework, instead of RecursiveAction as in regular tasks. The compute() method of a future task must have a non-void return type, whereas it has a void return type for regular tasks. A method call like left.join() waits for the task referred to by object left in both cases, but also provides the task's return value in the case of future tasks.

</details>

---

### 5.2. مثال متكامل: Recursive Array Sum — تسلسلي مقابل متوازي

#### 💡 الفكرة الأساسية
**نمط `divide-and-conquer` التسلسلي المعروف بيتحول لنسخة متوازية بمجرد تغليف الاستدعاءات المتفرّعة بـ `future()` بدل استدعاء مباشر، ثم `.get()` لكل واحد بدل استخدام النتيجة مباشرة.**

---

#### 💻 الكود
```java
// Sequential divide-and-conquer pattern
static int computeSum(int[] X, int lo, int hi) {
    if (lo > hi) return 0;
    else if (lo == hi) return X[lo];
    else {
        int mid = (lo + hi) / 2;
        int sum1 = computeSum(X, lo, mid);
        int sum2 = computeSum(X, mid + 1, hi);
        return sum1 + sum2;
    }
} // computeSum
// ...
int sum = computeSum(X, 0, X.length - 1); // main
```

```java
// Parallel divide-and-conquer pattern
static int computeSum(int[] X, int lo, int hi) throws SuspendableException {
    if (lo > hi) return 0;
    else if (lo == hi) return X[lo];
    else {
        int mid = (lo + hi) / 2;
        var sum1 = future(() -> computeSum(X, lo, mid));
        var sum2 = future(() -> computeSum(X, mid + 1, hi));
        // Parent now waits for the future values
        return sum1.get() + sum2.get();
    }
} // computeSum
// ...
int sum = computeSum(X, 0, X.length - 1); // main
```

#### شرح الكود سطراً بسطر
1. **`if (lo > hi) return 0;`** — حالة أساس (`base case`): مدى فاضي، المجموع صفر — نفس الشيء بالنسختين.
2. **`else if (lo == hi) return X[lo];`** — حالة أساس ثانية: عنصر وحيد، رجّعه مباشرة — نفس الشيء بالنسختين.
3. **بالنسخة التسلسلية، `sum1 = computeSum(X, lo, mid);`** — استدعاء مباشر، بينتظر تلقائياً (لأنه استدعاء دالة عادي) قبل ما ينتقل للسطر التالي.
4. **بالنسخة المتوازية، `var sum1 = future(() -> computeSum(X, lo, mid));`** — نفس الاستدعاء، بس هلق ملفوف بـ `future()` — ما بينتظر، وممكن يشتغل بالتوازي.
5. **`return sum1.get() + sum2.get();`** — هون بس (بالنسخة المتوازية) بينتظر التاسك الأب نتيجة الاثنين، وبعدين يجمعهم.

#### 📖 الشرح
لاحظ جمال هالتحويل: **البنية المنطقية للكود ما تغيّرت إطلاقاً** — لسا نفس نمط `divide-and-conquer` بنفس حالات الأساس. كل اللي تغيّر هو استبدال استدعاء الدالة المباشر بـ `future(() -> ...)` واستبدال استخدام النتيجة مباشرة بـ `.get()`. هاد بالضبط سبب قوة نموذج `Futures`: بيسمحلك تحول كود تسلسلي موجود لمتوازي بأقل تغيير ممكن على البنية.

لاحظ كمان إن التوقيع تغيّر شوي (`throws SuspendableException`) — لأنه العمليات المرتبطة بـ `Futures` ممكن تحتاج تعليق (`suspend`) الخيط الحالي ريثما تجهز النتيجة.

#### 🎯 الملخص السريع
- التحويل من تسلسلي لمتوازي بـ `Futures` = استبدال الاستدعاء المباشر بـ `future()` + استبدال الاستخدام المباشر بـ `.get()`.
- البنية المنطقية (`if/else`, حالات الأساس) ما بتتغيّر.
- هذا النمط اسمه `Parallel divide-and-conquer pattern`.

#### 📚 التطبيق
بالقسم الجاي رح ننتقل لموضوع مرتبط: `Memoization` بالتوازي — كيف نستخدم `Futures` عشان نحفظ نتائج استدعاءات سابقة ونتجنب إعادة حسابها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [كود Recursive Array Sum (Sequential version) و Recursive Array Sum (Future version) كما هو موضّح فوق]

</details>

---

## 6. الحفظ التذكّري (Memoization)
<!-- @render: {type: "code-first", visualization: "none", coverage: "90%"} -->
<!-- @connectivity: {prerequisite: "section_5.2", group: "6.1"} -->

### 6.1. Memoization بالتوازي: من Lookup إلى Future.get()

#### 📍 أين نحن الآن؟
هاي الفقرة بتشرح `Memoization` كتقنية عامة، وبعدين توريك كيف تتحول بسهولة لنسخة متوازية باستخدام `Futures`.

#### ⬅️ الربط مع السابق
شفنا `Lazy Memo` كبنية بتحفظ قيمة وحدة. `Memoization` هي تعميم هالفكرة على **مجموعة كاملة من استدعاءات دالة** بمدخلات مختلفة.

#### 💡 الفكرة الأساسية
**`Memoization` تعني حفظ نتائج استدعاءات دالة سابقة بجدول (`data structure`)، وإعادة استخدامها بدل إعادة الحساب — وبالتوازي، بنستبدل القيمة المحفوظة بـ `Future` بدل قيمة جاهزة.**

---

#### 📖 الشرح
تخيل عندك دالة `f(x)` بتاخد وقت طويل بالحساب. `Memoization` بتعني: كل مرة تحسب `f(xᵢ)`، احفظ الزوج `(xᵢ, yᵢ)` بجدول. المرة الجاية لو حدا طلب `f(x')` وكان `x'` يساوي أحد المدخلات اللي سبق وحسبناها، رجّع القيمة المحفوظة مباشرة (`lookup`) بدل ما تعيد الحساب من الصفر.

هلق كيف نوازي هالنمط؟ الفكرة بسيطة وأنيقة: بدل ما نخزن بالجدول القيمة النهائية الجاهزة `yᵢ = f(xᵢ)`، نخزن **`Future` لهاي القيمة**: `yᵢ = future(f(xᵢ))`. وعملية الـ `lookup` بتتحول لـ **`Future.get()`** — يعني لو حدا سبق وبلّش حساب `f(xᵢ)` (حتى لو لسا ما خلص!)، أي طلب جديد لنفس المدخل بيقدر ياخد نفس الـ `Future` وينتظرها بدل ما يبلّش حساب مكرر من الصفر بالتوازي مع الأول.

هاي التقنية مفيدة جداً بخوارزميات مبنية على `Dynamic Programming` — والشريحة بتذكر تحديداً إنها مفيدة لتوازي حساب **مثلث Pascal** (`Pascal's triangle`) بكفاءة، لأنه كل عنصر بمثلث Pascal بيعتمد على عنصرين من الصف اللي فوقه، وبتكرر نفس الحسابات الفرعية كتير.

#### 🎯 الملخص السريع
- `Memoization`: جدول بيحفظ `(x, f(x))` لتفادي إعادة الحساب.
- بالتوازي: الجدول بيحفظ `(x, future(f(x)))` بدل القيمة الجاهزة.
- عملية `lookup` بتصير `Future.get()`.
- تطبيق مهم: تسريع حساب مثلث Pascal بالتوازي.

#### 📚 التطبيق
هاي آخر فكرة بسلسلة `Lazy → Future → Memoization`. بالقسم الجاي رح ننتقل لتطبيق شامل يجمع كل هاي الأفكار سوا: `Java Streams`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90%)</summary>

> Memorization is to remember results of function calls f(x)... Memorization can be especially helpful for algorithms based on dynamic programming. The memorization pattern lends itself easily to parallelization using futures by modifying the memorized data structure to store {(x1, y1=future(x1)), ...}. The lookup operation can then be replaced by a get() operation on the future value, if a future has already been created for the result of a given input. Memorization is a very useful and powerful trick can be used for parallelizing Pascal's triangle efficiently.

**ملاحظة على التغطية:**
- ⚠️ لم يتم شرح بالكامل: صورة السبورة اليدوية بالشريحة الثانية (`Memorization cont'd`) فيها رموز (`y1=g(x1)`, `INSERT(g,x1,y1)`...) توضح الانتقال من نسخة تسلسلية لنسخة متوازية بالتفصيل الرمزي — تم شرح المضمون نصياً بدل إعادة رسم الرموز حرفياً.

</details>

#### ملاحظة:
جزء من هالموضوع موضّح بصورة سبورة مكتوبة بخط اليد (شريحة `Memorization (cont'd)`) بتوضح مقارنة جنب لجنب بين نسخة `Memoization` تسلسلية (`y1=g(x1)`, `INSERT(g,x1,y1)`) ونسخة متوازية (`FY1=FUTURE{g(x1)}`, `INSERT(g,x1,FY1)`, `y3=LOOKUP(g,x1).GET()`). **ملخص المحتوى:** الفرق الجوهري بالصورة هو استبدال `y1` (قيمة جاهزة) بـ `FY1` (كائن Future)، واستبدال عملية `LOOKUP` العادية بعملية `LOOKUP(...).GET()` — تماماً متل ما شرحنا فوق نصياً.

---

## 7. من Laziness إلى Parallelism: Java Streams
<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_6.1", group: "7.1-7.6"} -->

### 7.1. فكرة Streams: تعميم Laziness على مجموعات كاملة

#### 📍 أين نحن الآن؟
هاي أكبر مجموعة بالمحاضرة (7.1 → 7.6)، بتغطي `Java Streams` من الفكرة العامة، لإنشاء الـ Streams (منتهية ولا نهائية)، لأنواعها البدائية، لخط أنابيب المعالجة (`Pipeline`)، لتفصيل العمليات الوسيطة والنهائية، ووصولاً لتشغيلها بالتوازي.

#### ⬅️ الربط مع السابق
كل الأفكار اللي شفناها (`Lazy Evaluation`, `Futures`, `Memoization`) كانت غالباً عن **قيمة وحدة**. `Java Streams` بتاخد نفس فلسفة الـ Laziness وتعممها على **مجموعة كاملة من العناصر** — وهاي أوضح تطبيق عملي وشامل لكل الفلسفة اللي بنيناها بهاي المحاضرة.

#### 💡 الفكرة الأساسية
**`Stream` هو تمثيل كسول (`lazy representation`) لمجموعة عناصر، بنطبّق عليه سلسلة عمليات كسولة (بوقت ثابت)، وبس عند الحاجة الفعلية للنتيجة بينحسب فقط ما يلزم منها.**

---

#### 📖 الشرح
فكرة `Streams` بأربع خطوات:
1. **خذ مجموعة عناصر** (`Take a bunch of objects`) — مصفوفة، لائحة، أو أي مصدر بيانات.
2. **حوّلها لـ `Stream`** (تمثيل كسول).
3. **طبّق سلسلة عمليات كسولة عليها** — كل عملية بترجع فوراً بوقت ثابت (`constant time`)، بدون ما تنفّذ الحساب الفعلي.
4. **بالنهاية، احسب النتيجة النهائية** — هون بس بينفّذ **فقط** العمليات الضرورية فعلياً لإنتاج النتيجة، مو أكتر.

**الميزة الأكبر:** عمليات `Java Streams` **ممكن تُنفّذ بالتوازي** (`Operations on Java Streams can be executed in parallel!!!`) — وهاد بالضبط الرابط اللي بيوصل كل الفلسفة اللي بنيناها من `Lazy Evaluation` وصولاً هون، بأداة عملية جاهزة بجافا.

#### 💡 التشبيه
فكّر بخط إنتاج بمصنع (`Pipeline`) فاضي (`empty`) — ما في أي منتج يمشي فيه إلا لما حدا يطلب منتج فعلياً من آخر الخط. وجه الشبه: خطوات المعالجة (`filter`, `map`) = محطات بالخط، والعملية النهائية (`terminal operation`) = الطلب اللي بحرّك كل الخط.

#### 🎯 الملخص السريع
- `Stream`: تمثيل كسول لمجموعة عناصر.
- سلسلة العمليات كلها كسولة وبوقت ثابت لحد ما توصل لعملية نهائية.
- ممكن تشتغل بالتوازي بسهولة.

#### 📚 التطبيق
بالقسم الجاي رح نشوف كيف ننشئ Streams فعلياً — من مصادر منتهية ولا نهائية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Generalizing the laziness concept to arbitrary collections of objects. Idea: Take a bunch of objects. Turn them into a Stream (a lazy representation). Perform a series of lazy operations on them (all running in constant time). Eventually, compute the final result of your computation, which triggers evaluation of only of those lazy operations necessary to compute your result. Operations on Java Streams can be executed in parallel!!!

</details>

---

### 7.2. إنشاء Streams (منتهية ولا نهائية)

#### 💡 الفكرة الأساسية
**فيه أكتر من طريقة لإنشاء `Stream`: من لائحة فاضية، من `Collection` موجودة، من مصفوفة، أو حتى `Stream` لا نهائي.**

---

#### 💻 الكود
```java
// Empty Stream
Stream<String> streamEmpty = Stream.empty();

// Stream from a collection
Collection<String> collection = Arrays.asList("a", "b", "c");
Stream<String> streamOfCollection = collection.stream();

// Stream from an array
Stream<String> streamOfArray = Stream.of("a", "b", "c");
String[] arr = new String[]{"a", "b", "c"};
Stream<String> streamOfArrayFull = Arrays.stream(arr);
Stream<String> streamOfArrayPart = Arrays.stream(arr, 1, 3);

// Infinite Streams
Stream<String> streamGenerated = Stream.generate(() -> "element");
var streamIterated = Stream.iterate(40, n -> n + 2); // Stream<Integer>

// Take a finite number of elements from an infinite stream
var tenStrings = streamGenerated.limit(10); // Stream<String>. Runs in constant time
var fiveInts = streamIterated.limit(5); // Stream<Integer>. Runs in constant time
```

#### شرح الكود سطراً بسطر
1. **`Stream.empty()`** — `Stream` فاضي، مفيد كقيمة ابتدائية أو حالة خاصة.
2. **`collection.stream()`** — أسهل طريقة، حوّل أي `Collection` جاهزة (لائحة، Set...) لـ `Stream`.
3. **`Stream.of("a", "b", "c")`** — إنشاء `Stream` مباشرة من عناصر مفردة.
4. **`Arrays.stream(arr)`** — من مصفوفة كاملة.
5. **`Arrays.stream(arr, 1, 3)`** — من **جزء** من المصفوفة فقط (من الفهرس 1 إلى 3، بدون تضمين 3).
6. **`Stream.generate(() -> "element")`** — `Stream` **لا نهائي**، كل عنصر فيه بيتولد من استدعاء الـ `lambda` (هون دايماً `"element"`).
7. **`Stream.iterate(40, n -> n + 2)`** — `Stream` لا نهائي كمان، بيبدأ من `40` وكل عنصر بيتولد بتطبيق `n -> n + 2` على العنصر السابق (`40, 42, 44, ...`).
8. **`.limit(10)` و `.limit(5)`** — طريقة أخذ عدد محدد من عناصر `Stream` لا نهائي، **وبوقت ثابت** (لأنها كسولة — تماماً متل `take()` على `LazyList` اللي شفناها بمفهوم مشابه سابقاً).

#### 📖 الشرح
لاحظ نقطة أساسية: `Stream.generate()` و `Stream.iterate()` بيرجعو Streams **لا نهائية** فعلياً — يعني لو حاولت تطبع كل عناصرهم، البرنامج ما رح يتوقف أبداً! بس بما إنهم **كسولين (`still lazy`)**، إنشاءهم ووضع `.limit()` عليهم ما بيحسب أي شيء فعلياً لحد ما توصل عملية نهائية فعلية.

#### 🎯 الملخص السريع
- طرق الإنشاء: `empty()`, `collection.stream()`, `Stream.of()`, `Arrays.stream()`.
- Streams لا نهائية: `Stream.generate()` (تكرار ثابت) و `Stream.iterate()` (تراكمي).
- `.limit(n)` بتاخد أول `n` عنصر، بوقت ثابت لأنها كسولة.

#### 📚 التطبيق
بالقسم الجاي رح نشوف نوع خاص من الـ Streams مخصص للأنواع البدائية (`primitive types`).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [كود Creating Streams و Creating Infinite Streams كما هو موضّح فوق]. Still lazy!

</details>

---

### 7.3. Streams للأنواع البدائية (Primitive Types)

#### 💡 الفكرة الأساسية
**`Stream<T>` ما ينفع مباشرة للأنواع البدائية (`int`, `long`, `double`)، فجافا وفّرت أنواع خاصة: `IntStream`, `LongStream`, `DoubleStream`.**
*(بعد ما اتعرفنا كيف ننشئ Streams عادية، هاي فقرة قصيرة عن استثناء مهم بالأنواع البدائية.)*

---

#### 💻 الكود
```java
IntStream intStream = IntStream.range(1, 3); // IntStream of (1, 2)
LongStream longStream = LongStream.rangeClosed(1, 3); // LongStream of (1, 2, 3)

// Using Random:
Random random = new Random();
DoubleStream doubleStream = random.doubles(); // Infinite DoubleStream of random double numbers
var fiveIntsStream = random.ints(5); // IntStream of five random int numbers
var alsoFiveIntsStream = random.ints().limit(5); // IntStream of five random int numbers
```

#### شرح الكود سطراً بسطر
1. **`IntStream.range(1, 3)`** — مدى **نصف مفتوح** (`half-open`): بيعطي `1, 2` فقط (بدون `3`).
2. **`LongStream.rangeClosed(1, 3)`** — مدى **مغلق** (`closed`): بيعطي `1, 2, 3` (يتضمن `3`).
3. **`random.doubles()`** — `Stream` لا نهائي من أعداد عشوائية `double`.
4. **`random.ints(5)`** — طريقة مباشرة لأخذ 5 أعداد عشوائية `int` فقط.
5. **`random.ints().limit(5)`** — طريقة بديلة: `Stream` لا نهائي، ثم `.limit(5)` — نفس النتيجة الفعلية بس بأسلوب مختلف (استخدام مباشر لفكرة الـ Laziness اللي شرحناها).

#### 📖 الشرح
السبب البسيط وراء وجود `IntStream` منفصلة عن `Stream<Integer>`: تجنّب تكلفة الـ **`Autoboxing`** (تحويل `int` البدائي لكائن `Integer` وبالعكس بشكل متكرر)، وهاد بيحسّن الأداء بشكل ملحوظ لما بتتعامل مع كميات كبيرة من الأرقام.

#### 🎯 الملخص السريع
- `IntStream`, `LongStream`, `DoubleStream` للأنواع البدائية — تجنّب `Autoboxing`.
- `range()`: نصف مفتوح (بدون النهاية). `rangeClosed()`: مغلق (تتضمن النهاية).
- ممكن تجيب عدد محدد من عشوائيات مباشرة، أو `Stream` لا نهائي + `.limit()`.

#### 📚 التطبيق
هلق بعد ما عرفنا كيف ننشئ Streams، الوقت لنشوف كيف نبني عليها سلسلة عمليات كاملة — `Stream Pipeline`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [كود Streams of Primitive Types كما هو موضّح فوق]

</details>

---

### 7.4. Stream Pipeline: Source → Intermediate → Terminal

#### 💡 الفكرة الأساسية
**كل `Stream Pipeline` بيتكون من ثلاثة أجزاء: مصدر (`source`)، عمليات وسيطة كسولة (`intermediate operations`)، وعملية نهائية واحدة بتحرّك التنفيذ (`terminal operation`).**

---

#### 💻 الكود
```java
List<String> list = Arrays.asList("Rice", "Owls", "are", "the", "best");
long size =
    list.stream()          // Stream source
        .skip(1)
        .map(element -> element.substring(0, 3))   // Intermediate operations
        .filter(element -> element.charAt(2) == 'e') // All lazy!
        .sorted()           // Terminal operation
        .count();
```

#### شرح الكود سطراً بسطر
1. **`list.stream()`** — **المصدر** (`source`): نقطة البداية، بيولّد `Stream` من اللائحة.
2. **`.skip(1)`** — عملية وسيطة: تجاهل أول عنصر (`"Rice"`).
3. **`.map(...)`** — عملية وسيطة: حوّل كل عنصر لأول 3 حروف منه.
4. **`.filter(...)`** — عملية وسيطة: خلّي بس العناصر اللي حرفها الثالث `'e'`.
5. **`.sorted()`** — عملية وسيطة كمان (بترتب العناصر).
6. **`.count()`** — **العملية النهائية** (`terminal operation`): هون بس كل السلسلة فوق بتنفّذ فعلياً، وبترجع `long` (عدد العناصر).

#### 📖 الشرح
لاحظ التسلسل: `source` → مجموعة `intermediate operations` (كل واحدة **كسولة**، `All lazy!` زي ما مكتوب بالشريحة الأصلية) → `terminal operation` وحيدة أخيرة. النقطة الجوهرية: **ولا وحدة من `skip`, `map`, `filter`, `sorted` بتنفّذ أي شيء فعلي وقت استدعائها** — كلهم بس بيبنو "خطة تنفيذ" (`pipeline`)، وبس `count()` هي اللي بتشغّل الخطة كاملة.

#### 🎯 الملخص السريع
- `Pipeline` = `source` + `intermediate operations` (كسولة) + `terminal operation` (تشغّل كل شيء).
- كل عملية وسيطة بترجع `Stream` جديد، فبتقدر تسلسلهم (`chain`) بسهولة.

#### 📚 التطبيق
بالقسم الجاي رح نفصّل كل نوع من العمليات الوسيطة على حدة، ونثبت بمثال عملي إنها فعلاً كسولة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [كود Stream Pipeline كما هو موضّح فوق]

</details>

---

### 7.5. العمليات الوسيطة والنهائية بالتفصيل

#### 💡 الفكرة الأساسية
**العمليات الوسيطة (`intermediate`) كلها كسولة ولا تنفّذ شيء لحدها، أما العمليات النهائية (`terminal`) هي اللي بتحرّك التنفيذ الفعلي — وكلها بالنهاية حالات خاصة من `reduce()`.**

---

#### 📖 الشرح

**أولاً، العمليات الوسيطة (`Intermediate operations`) — كلها كسولة:**

| العملية | الوصف |
| --- | --- |
| `filter(p)` | احتفظ فقط بالعناصر اللي بتحقق الشرط `p` |
| `map(f)` | طبّق الدالة `f` على كل العناصر |
| `flatMap(f)` | متل `map`، بس لما نتيجة `f` تكون `Stream` بحد ذاتها — النتيجة النهائية بتنبسط (`flattened`) بـ Stream واحد |
| `distinct()` | العناصر الفريدة فقط (حسب `Object.equals`) |
| `sorted(c)` | عناصر الـ Stream مرتبة حسب `Comparator c` |
| `peek(a)` | نفّذ إجراء `a` على كل عنصر، وارجع نفس الـ Stream الأصلي (بدون تغيير) |
| `limit(n)` | خذ أول `n` عنصر |
| `skip(n)` | تجاهل أول `n` عنصر |

**دليل عملي إنها كسولة فعلاً:**
```java
List<String> list = Arrays.asList("Rice", "Owls", "are", "the", "best");
Stream<String> stream =
    list.stream()
        .filter(e -> {
            System.out.println("Predicate was called on " + e);
            return e.contains("e");
        });
// ماذا سيطبع هذا السطر؟
```
**الجواب: `Nothing!` (ولا شيء)** — لأنه ما في أي عملية نهائية استُدعيت بعد، فالـ `filter` (وكل ما بداخلها من `println`) **ما نُفّذت إطلاقاً**.

**ثانياً، العمليات النهائية (`Terminal operations`) — هي اللي بتحرّك الحساب فعلياً:**

| العملية | الوصف |
| --- | --- |
| `reduce(zero, f)` | تماماً متل `fold` اللي عرفناها — ابدأ بمُجمّع `zero`، طبّق `f` على كل عناصر الـ Stream |
| `toArray()` | أنتج مصفوفة من عناصر الـ Stream الناتج |
| `collect()` | اجمع عناصر الـ Stream الناتج بكائن (عادة `Java Collection`) |
| `count()` | عدّ عناصر الـ Stream الناتج |
| `forEach(a)` | نفّذ إجراء `a` على كل عنصر |
| `forEachOrdered(a)` | متل `forEach`، بس بترتيب الـ Stream (لو مرتّب بـ `sorted()`) |
| `min(c)`, `max(c)` | أصغر/أكبر عنصر حسب `Comparator c` |
| `(any)(all)(none)Match(p)` | `true` لو أي/كل/ولا عنصر بيحقق الشرط `p` |
| `findFirst()` | خذ أول عنصر من الـ Stream الناتج |
| `findAny()` | خذ أي عنصر من الـ Stream الناتج |

#### مهم للامتحان ⚠️:
كل العمليات النهائية بالجدول فوق **هي بالأساس حالات خاصة من `reduce()`** — النقطة اللي بتأكد عليها المحاضرة صراحة (`All of these are just special cases of reduce()!`).

**مثال: التنفيذ فعلياً مربوط بالعملية النهائية:**
```java
List<String> list = Arrays.asList("Rice", "Owls", "are", "the", "best");
Optional<String> value =
    list.stream()
        .filter(e -> { System.out.println("Filter was called on " + e); return e.contains("s"); })
        .map(e -> { System.out.println("Map was called on " + e); return e.toUpperCase(); })
        .findFirst();
System.out.println(value.get());
```
**الناتج المتوقع:**
```
Filter was called on Rice
Filter was called on Owls
Map was called on Owls
OWLS
```

#### 📖 الشرح
لاحظ شيء مهم جداً بالناتج: `filter` استُدعيت على `"Rice"` (وفشلت — ما فيها `"s"`)، وبعدين على `"Owls"` (ونجحت)، **وعندها مباشرة** استدعى `map` على `"Owls"` — **بدون ما يكمل** `filter` على باقي العناصر (`"are"`, `"the"`, `"best"`)! ليش؟ لأنه `findFirst()` محتاج بس أول عنصر يعدّي كل السلسلة، فبمجرد ما لقاه (بعد `map`)، توقف التنفيذ فوراً — هذا **التقييم الكسول بأبهى صوره**: بس القدر الضروري بالضبط بينحسب.

#### 🎯 الملخص السريع
- العمليات الوسيطة (`filter`, `map`, `flatMap`, `distinct`, `sorted`, `peek`, `limit`, `skip`) كلها كسولة.
- العمليات النهائية (`reduce`, `collect`, `count`, `forEach`, `min/max`, `*Match`, `find*`) هي اللي بتحرّك التنفيذ.
- كل العمليات النهائية = حالات خاصة من `reduce()`.
- التنفيذ الفعلي بيتوقف فور ما تحصل العملية النهائية على كل اللي تحتاجه (زي `findFirst()`).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفترضو إن `.filter(...)` أو `.map(...)` بتنفّذ فوراً على **كل** عناصر الـ Stream وقت كتابة السطر، تماماً متل حلقة `for` عادية.

#### الفهم الصحيح ✅:
العمليات الوسيطة **ما بتنفّذ شيء أبداً** لحد ما توصل عملية نهائية، وحتى عندها، بتنفّذ **عنصر عنصر** (مو كل الـ Stream دفعة وحدة على كل عملية) وقد تتوقف مبكراً (زي `findFirst()`) — مو دايماً بتعالج كل العناصر.

#### 📚 التطبيق
بعد ما فهمنا التنفيذ التسلسلي بالتفصيل، بالقسم الجاي رح نشوف كيف نفعّل التنفيذ المتوازي بسطر واحد فقط: `.parallel()`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [جداول Intermediate operations. Lazy! و Terminal operations. Drive the computation!، وكودي Intermediate Operations are Lazy و Computation is Driven by Terminal Operations]

</details>

---

### 7.6. Parallel Streams: تفعيل التنفيذ المتوازي

#### 💡 الفكرة الأساسية
**`Stream.parallel()` بس بتغيّر "علم" (`flag`) داخل الـ Stream يطلب من جافا تنفيذ العمليات بالتوازي — بدون أي ضمان فعلي بحصول ذلك، ولا بترتيب معين للعمليات.**

---

#### 💻 الكود
```java
List<String> list = Arrays.asList("Rice", "Owls", "are", "the", "best");
Optional<String> value =
    list.stream().parallel()
        .filter(e -> { System.out.println("Filter was called on " + e); return e.contains("s"); })
        .map(e -> { System.out.println("Map was called on " + e); return e.toUpperCase(); })
        .findFirst();
System.out.println(value.get());
```

**الناتج المتوقع (مثال واحد من تشغيلتين مختلفتين موضحتين بالمحاضرة):**
```
Filter was called on are
Filter was called on Owls
Map was called on Owls
Filter was called on Rice
Filter was called on the
OWLS
```

#### شرح الكود سطراً بسطر
1. **`list.stream().parallel()`** — نفس الـ Stream السابق تماماً، بس هلق مفعّل عليه وضع التوازي.
2. **باقي السلسلة (`filter`, `map`, `findFirst`)** — نفس الكود بالضبط بدون أي تغيير — هذا جمال النموذج: ما احتجنا نعيد كتابة أي منطق.

#### 📖 الشرح
لاحظ شيء مهم جداً بالناتج: ترتيب استدعاء `filter` **تغيّر واختلف** عن النسخة التسلسلية (وحتى بين تشغيلة وتانية بنفس البرنامج!) — لأنه هلق عناصر مختلفة ممكن تتفحص بخيوط مختلفة بنفس الوقت، فما في ترتيب مضمون. هذا بالضبط معنى **`No ordering on operations on elements can be assumed`**.

خصائص `Stream.parallel()` الأساسية:
- بيغيّر نمط تنفيذ العمليات الكسولة — **حرفياً بس بيضبط علم (`flag`) داخل الـ Stream**.
- جافا **قد** تنفّذ العمليات الوسيطة والنهائية بالتوازي — **بدون ضمان** فعلي لحصول ذلك ولا لمقدار التوازي.
- **ما في ترتيب مضمون** على العمليات المطبقة على العناصر.
- لو المصدر (`source`) كان `Collection`، ممكن تستخدم `Collection.parallelStream()` مباشرة بدل `.stream().parallel()`.
- العكس متاح كمان: `Stream.sequential()` بترجع الـ Stream لوضع تسلسلي.

#### مهم للامتحان ⚠️:
`.parallel()` هي **طلب مو أمر** — جافا مو ملزمة تنفّذ بالتوازي فعلياً، والقرار بيعتمد على حجم البيانات وعدد المعالجات المتاحة وطبيعة العمليات.

#### 🎯 الملخص السريع
- `.parallel()`: طلب (مو ضمان) لتنفيذ متوازي — مجرد `flag`.
- `.sequential()`: العكس — إرجاع لوضع تسلسلي.
- بالتوازي، **ترتيب معالجة العناصر غير مضمون إطلاقاً**.
- بديل عملي: `Collection.parallelStream()`.

#### 📚 التطبيق
هلق بعد ما شفنا الأداة العملية الكاملة (`Streams`)، بالقسم الأخير رح نربط كل هالأفكار بمشكلة `Data Race` ومفهوم `Determinism` — نفس المشكلة اللي بلّشنا فيها المحاضرة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [كود Parallel Streams مع ناتجين مختلفين، وجدول خصائص Stream.parallel() و Stream.sequential() كما هو موضّح فوق]

</details>

---

## 8. Data Race و Determinism
<!-- @render: {type: "code-first", visualization: "none", coverage: "90%"} -->
<!-- @connectivity: {prerequisite: "section_7.6", group: "8.1-8.4"} -->

### 8.1. تحديات البرمجة المتوازية: Correctness, Performance, Portability

#### 📍 أين نحن الآن؟
هاي أخر مجموعة بالمحاضرة (8.1 → 8.4)، وبترجعنا لسؤال جوهري: بعد كل الأدوات اللي تعلمناها، شو هي التحديات الحقيقية اللي بتواجه أي برنامج متوازي، وكيف ترتبط بمفهوم `Determinism`؟

#### ⬅️ الربط مع السابق
طول المحاضرة بنينا أدوات (`Futures`, `Streams`) بتساعدنا نتجنب مشاكل التوازي الآمر. هلق الوقت نسمّي هالمشاكل بدقة أكبر، ونفهم ليش تجنبها بالضبط هو أساس صحة البرنامج المتوازي.

#### 💡 الفكرة الأساسية
**البرمجة المتوازية بتواجه ثلاث تحديات رئيسية: الصحة (`Correctness`)، الأداء (`Performance`)، وقابلية النقل (`Portability`).**

---

#### 📖 الشرح
خلّينا نفصّل كل تحدي:

1. **`Correctness` (الصحة):** أنواع جديدة من الأخطاء ممكن تظهر بالتوازي، ما كانت موجودة بالبرمجة التسلسلية — أبرزها **`Data races`**، وكمان **`Deadlock`** و **`Livelock`** (رح نتعمق فيهم بمحاضرات جاية).

2. **`Performance` (الأداء):** أداء البرنامج المتوازي **بيعتمد على النظام الأساسي** (`underlying parallel system`) اللي بيشتغل عليه — يعني نفس الكود ممكن يعطي أداء مختلف كلياً حسب:
   - مترجم اللغة ونظام التشغيل وقت التنفيذ (`Language compiler and runtime system`).
   - بنية المعالج والذاكرة الهرمية (`Processor structure and memory hierarchy`).
   - درجة التوازي بالبرنامج مقابل درجة التوازي المتاحة فعلياً بالعتاد (`Degree of parallelism in program vs. hardware`).

3. **`Portability` (قابلية النقل):** نوعين:
   - **`Functional portability`:** برنامج فيه خلل (`buggy`) ممكن يشتغل صح بنظام معين، وما يشتغل صح بنظام تاني (أو حتى بنفس النظام لو أعدت تشغيله!).
   - **`Performance portability`:** برنامج متوازي بيعطي أداء ممتاز بنظام معين، ممكن يعطي أداء ضعيف بنظام تاني.

#### 🎯 الملخص السريع
- `Correctness`: أخطاء جديدة زي `Data races`, `Deadlock`, `Livelock`.
- `Performance`: بيعتمد على المترجم، بنية المعالج، ودرجة التوازي المتاحة فعلياً.
- `Portability`: نوعان — وظيفية (سلوك مختلف بأنظمة مختلفة) وأدائية (أداء مختلف بأنظمة مختلفة).

#### 📚 التطبيق
بالقسم الجاي رح نغوص أعمق بأبرز تحدي بالـ `Correctness`: `Data Race`، مع مثال ملموس.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Correctness — New classes of bugs can arise in parallel programming, relative to sequential programming — Data races, deadlock, livelock. Performance — Performance of parallel program depends on underlying parallel system — Language compiler and runtime system, Processor structure and memory hierarchy, Degree of parallelism in program vs. hardware. Portability — Functional portability... Performance portability...

</details>

---

### 8.2. مثال على Data Race

#### 💡 الفكرة الأساسية
**`Data Race` بتصير لما خيطين يقدرو يوصلو (يقروا أو يكتبو) لنفس المتغيّر المشترك بدون أي تنسيق زمني بينهم، بحيث ترتيب الوصول غير مضمون.**

---

#### 💻 الكود
```java
// 1. Start of Task T0 (main program)
// 2. sum1 = 0; sum2 = 0; // sum1, sum2 are shared fields
// 3. async { // Task T1 computes sum of upper half of array
// 4.   for (int i = X.length/2; i < X.length; i++)
// 5.     sum2 += X[i];
// 6. }
// 7. // Continue in T0, compute sum of lower half of array
// 8. for (int i = 0; i < X.length/2; i++) sum1 += X[i];
// 9. return sum1 + sum2;
```

#### شرح الكود سطراً بسطر
1. **السطر 2:** `sum1` و `sum2` حقول مشتركة (`shared fields`) — يعني ممكن أكتر من خيط يوصلهم بنفس الوقت.
2. **السطر 3-6:** تاسك T1 (`async`) بتحسب مجموع النصف العلوي وبتخزنه بـ `sum2` — بالتوازي مع T0.
3. **السطر 7-8:** T0 بيكمل شغله (بدون أي انتظار للتاسك T1) وبيحسب مجموع النصف السفلي بـ `sum1`.
4. **السطر 9:** `return sum1 + sum2;` — هون المشكلة! T0 بيقرأ `sum2` **بدون أي ضمان** إنو T1 خلصت الكتابة عليها.

#### 📖 الشرح
لاحظ الفرق الحاسم عن مثال `Futures` اللي شفناه سابقاً: هون **ما في `finish` ولا `.get()`** — يعني ما في أي آلية تجبر T0 ينتظر T1 قبل ما يقرأ `sum2`. النتيجة: **`Data race` بين قراءة/كتابة `sum2`** — الشريحة الأصلية بتسميها صراحة: `Data race between accesses of sum2 in async and in main program (due to missing finish)`. المشكلة بالتحديد هي "الوصول الفائت للتنسيق" (`missing finish`) — لو ضفنا `finish` حول الـ `async`، المشكلة كانت رح تنحل فوراً.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
حسب المحاضرة، كتير طلاب بيعتقدو إن أي استخدام لمتغيّر مشترك بين تاسكين هو `Data Race` تلقائياً، حتى لو فيه `finish` أو `.get()` بينهم.

#### الفهم الصحيح ✅:
`Data Race` بتصير **بس** لما ما في أي تنسيق (`synchronization`) يضمن ترتيب الوصول — لو حطينا `finish` أو استخدمنا `Future.get()` بالمكان الصحيح، صار في ضمان زمني (`happens-before`)، وبتختفي المشكلة حتى لو المتغيّر لسا "مشترك" تقنياً.

#### 🎯 الملخص السريع
- `Data Race`: وصول متعدد (قراءة/كتابة) لمتغيّر مشترك بدون تنسيق زمني.
- السبب النموذجي: نسيان `finish` (أو أداة تزامن مكافئة) حول تاسك بتعدّل حالة مشتركة.
- الحل: أضف تنسيق صريح (`finish`, `.get()`) يضمن ترتيب الوصول.

#### 📚 التطبيق
بالقسم الجاي رح نشوف كيف `Data Race` بترتبط مباشرة بمفهومين أساسيين: `Functional Determinism` و `Structural Determinism`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> // Start of Task T0 (main program). sum1 = 0; sum2 = 0; // sum1,sum2 are shared fields. async { // Task T1 computes sum of upper half of array. for(int i=X.length/2; i < X.length; i++) sum2 += X[i]; } // Continue in T0, compute sum of lower half of array. for(int i=0; i < X.length/2; i++) sum1 += X[i]; return sum1 + sum2; Data race between accesses of sum2 in async and in main program (due to missing finish)

</details>

---

### 8.3. Functional Determinism مقابل Structural Determinism

#### 💡 الفكرة الأساسية
**برنامج متوازي `functionally deterministic` لو دايماً بيحسب نفس الجواب لنفس المدخل، و`structurally deterministic` لو دايماً بينتج نفس `Computation Graph` لنفس المدخل — وغياب الـ `Data Race` بيضمن الاثنين معاً.**

---

#### 📖 الشرح
فيه نوعان من الحتمية (`Determinism`) لازم نفرّق بينهم بدقة:

1. **`Functionally deterministic`:** البرنامج بيحسب **نفس الجواب** (النتيجة النهائية) في كل مرة تعطيه فيها نفس المدخل، بغض النظر عن ترتيب أو توقيت تنفيذ الخيوط داخلياً.

2. **`Structurally deterministic`:** البرنامج بينتج **نفس `Computation Graph`** (نفس بنية العلاقات بين التاسكات، نفس عدد التاسكات وترابطها) في كل مرة تعطيه فيها نفس المدخل — حتى لو الجواب النهائي نفسه (وهذا شرط أقوى من `Functional Determinism`).

**الخاصية الأهم بهاي المحاضرة، اسمها `Data-Race-Free Determinism Property`:**
> إذا برنامج متوازي مكتوب باستخدام الأدوات اللي تعلمناها لحد هلق (`finish`, `async`, `futures`) **و** معروف إنه **خالٍ من `Data Race`**، فلازم يكون **`functionally deterministic` و `structurally deterministic` بالاثنين معاً**.

هاي خاصية قوية جداً: **إثبات غياب `Data Race` بيكفي وحده لضمان الحتمية الكاملة** بدون حاجة لإثبات أي شيء إضافي.

#### 🤔 تفعيل الفهم
لو برنامج متوازي عنده `Data Race`، هل هذا معناه أكيد إنه رح يعطي نتائج مختلفة بكل تشغيلة؟ فكّر قبل ما تكمل للقسم الجاي.

#### 🎯 الملخص السريع
- `Functionally deterministic`: نفس الجواب دايماً لنفس المدخل.
- `Structurally deterministic`: نفس `Computation Graph` دايماً لنفس المدخل (شرط أقوى).
- `Data-Race-Free Determinism Property`: خلو البرنامج من `Data Race` (مبني بـ `finish`/`async`/`futures`) ⇒ حتمية وظيفية وبنيوية بالاثنين معاً.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيخلطو بين `Functional Determinism` و `Structural Determinism` وبيعتبروهم نفس الشيء، لأنه الاثنين بالنهاية "نفس البرنامج بيعطي نفس النتيجة".

#### الفهم الصحيح ✅:
الفرق الحاسم: `Functional Determinism` بس بيهتم **بالجواب النهائي** (يعني حتى لو التاسكات اترتبت بشكل مختلف داخلياً، المهم النتيجة نفسها)، بينما `Structural Determinism` بيهتم **ببنية التنفيذ نفسها** (نفس عدد التاسكات ونفس علاقاتها) — يعني ممكن نظرياً برنامج يكون `functionally deterministic` بدون ما يكون `structurally deterministic` لو تغيّرت آلية توزيع الشغل الداخلية بدون ما تأثر على الجواب النهائي.

#### 📚 التطبيق
بالقسم الأخير رح نشوف مفهوم مهم مرتبط: `Benign nondeterminism` — حالة خاصة ممكن يكون فيها البرنامج فيه `Data Race` بس النتيجة لسا مقبولة، بمثال عملي كامل عن البحث بنص.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A parallel program is said to be functionally deterministic if it always computes the same answer when given the same input. A parallel program is said to be structurally deterministic if it always produces the same computation graph when given the same input. Data-Race-Free Determinism Property — If a parallel program is written using the constructs learned so far (finish, async, futures) and is known to be data-race-free, then it must be both functionally deterministic and structurally deterministic.

</details>

---

### 8.4. مثال متكامل: البحث المتوازي عن نمط بنص و Benign Nondeterminism

#### 💡 الفكرة الأساسية
**تطبيق التوازي على خوارزمية بحث كلاسيكية بيوضح خمس نسخ مختلفة، بعضها متعمّد التصميم فيه `Data Race` "حميد" (`benign`) لأنه ما بيأثر على صحة النتيجة النهائية عملياً.**

---

#### 📌 السيناريو
عندنا نص طوله `N` ونمط طوله `M`، وبدنا نبحث عن كل ظهور (أو مجرد وجود، أو أول موقع) للنمط داخل النص — وهاي المسألة الكلاسيكية بتوضح كيف قرارات تصميم بسيطة (شو بالضبط "الإجابة" اللي بدنا نحسبها) بتأثر جذرياً على وجود `Data Race` من عدمه.

#### 💻 الكود: النسخة التسلسلية (الأساس)
```java
for (int i = 0; i <= N - M; i++) {
    for (j = 0; j < M; j++) {
        if (text[i + j] != pattern[j]) break;
    } // for j
    if (j == M) {
        // pattern found
        // update flag/count/index as needed
        // exit for-i loop if needed
    }
} // for i
```

#### 💡 كيف تجتمع الأفكار؟

**النسخة 1 — عدّ كل الظهورات (`Count of all occurrences`):**
```java
a = new Accumulator(SUM, int);
finish(a) {
    for (int ii = 0; ii <= N - M; ii++) {
        int i = ii;
        async {
            for (j = 0; j < M; j++)
                if (text[i + j] != pattern[j]) break;
            if (j == M) a.put(1); // Increment count
        } // async
    }
} // finish
print a.get(); // Output
```
هون استخدمنا `Accumulator` (أداة تجميع آمنة، رح نتعمق فيها لاحقاً) بدل متغيّر مشترك عادي — فما في `Data Race`، والنتيجة (`العدد الكلي`) **حتمية دايماً** (`functionally deterministic`).

**النسخة 2 — هل يوجد ظهور؟ (`Existence of an occurrence`):**
```java
found = false; // object or static field
finish {
    for (int i = 0; i <= N - M; i++)
        async {
            for (j = 0; j < M; j++)
                if (text[i + j] != pattern[j]) break;
            if (j == M) found = true;
        } // for-async
} // finish
print found // Output
```
هون **كل** التاسكات ممكن تكتب على `found = true` بنفس الوقت لو لقو تطابق — هاد تقنياً **`Data Race`** (كتابة متعددة بدون تنسيق)! بس لاحظ: **كل الكتابات بتكتب نفس القيمة بالضبط** (`true`)، فمهما كان ترتيب الكتابة، **النتيجة النهائية نفسها دايماً** — هاي حالة `Benign Nondeterminism`.

**النسخة 3 — موقع الظهور (`Index of an occurrence`):**
```java
index = -1; // object or static field
finish {
    for (int i = 0; i <= N - M; i++)
        async {
            for (j = 0; j < M; j++)
                if (text[i + j] != pattern[j]) break;
            if (j == M) index = i; // found at i
        } // for-async
} // finish
print index // Output
```
هون المشكلة أوضح: لو النمط ظهر بأكتر من موقع، كل تاسك بتكتب موقعها الخاص (`index = i`) — **آخر كتابة بتفوز**، وهاد بيعتمد على **ترتيب التنفيذ العشوائي**! يعني هون `Data Race` **حقيقي وغير حميد** — النتيجة ممكن تختلف بكل تشغيلة (`functionally non-deterministic`).

**النسخة 4 و 5 — تحسينات بالأداء (`Optimized`):**
```java
// Version 4: Optimized existence
found = false;
finish {
    for (int i = 0; i <= N - M; i++) {
        if (found) break; // Optimization!
        async { /* same body as Version 2 */ }
    } // for
} // finish
print found
```
```java
// Version 5: Optimized index
index = -1;
finish {
    for (int i = 0; i <= N - M; i++) {
        if (index != -1) break; // Optimization!
        async { /* same body as Version 3 */ }
    } // for
} // finish
print index
```
هون أضفنا تحسين أداء: لو لقينا النتيجة، نوقف عن إنشاء تاسكات جديدة (`break`). بس هالتحسين **بيقرأ** المتغيّر المشترك (`found` أو `index`) بنفس الوقت اللي تاسكات تانية ممكن تكتب عليه — فهون **زدنا فرصة الـ `Data Race`** (قراءة أثناء كتابة)، والتحسين هذا لازم يُدرس بعناية (مو موضوع بمحاضرة اليوم، بس مهم نلاحظه).

#### ⚠️ لو ما استخدمناها صح؟
لو استخدمنا النسخة 3 (موقع الظهور) بدون وعي إنها `Data Race` حقيقي، ممكن نحصل على موقع مختلف كل تشغيلة لنفس المدخل — خطأ صعب الاكتشاف لأنه أحياناً بيظهر صح بالصدفة.

#### 🎯 الملخص السريع
- ليس كل `Data Race` بالضرورة كارثي — `Benign Nondeterminism` هي حالة فيها `Data Race` تقني، بس النتيجة النهائية مقبولة دايماً بأي ترتيب.
- مثال حميد: كتابة نفس القيمة (`found = true`) من عدة خيوط.
- مثال غير حميد: كتابة قيم مختلفة (`index = i`) من عدة خيوط — النتيجة بتعتمد على ترتيب عشوائي.
- `Determinism Property`: البرنامج الخالي من `Data Race` **مضمون** يكون حتمي بالكامل — بس وجود `Data Race` **لا يعني بالضرورة** إنه لازم يكون `Nondeterministic` (ممكن يكون `Benign`).

#### 📚 التطبيق
بهيك نكون غطينا كل مسار المحاضرة — من فلسفة `Functional Programming`، مروراً بـ `Lazy Evaluation` و `Futures` و `Memoization` و `Streams`، ووصولاً لعلاقة كل هالأدوات بمشكلة `Data Race` والحتمية. المحاضرة الجاية غالباً رح تبني على هيك وتقدّم أدوات تزامن أكتر تعقيداً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

> Determinism and Data Races: The presence of data races often leads to functional and/or structural nondeterminism because a parallel program with data races may exhibit different behaviors for the same input, depending on the relative scheduling and timing of memory accesses involved in a data race. Determinism Property... Determinism and Data Races (cont'd): The determinism property states that all data-race-free parallel programs written using the constructs introduced in this course are guaranteed to be deterministic, but it does not imply that a program with a data race must be functionally/structurally non-deterministic. "benign" nondeterminism for programs with data races is a case in which different executions with the same input may generate different outputs, but all the outputs may be acceptable in the context of the application, e.g., different locations for a search pattern in a target string. [+ خمس نسخ من كود البحث المتوازي]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف `Benign Nondeterminism`، وكل النسخ الخمس لكود البحث.
- ℹ️ إضافة من الدليل: التوضيح إن النسخة 4/5 بتزيد فرصة Data Race إضافية (قراءة أثناء كتابة) — استنتاج منطقي مبني على الكود، مو مذكور صراحة بالمحاضرة.

</details>

---

# ملخص شامل — Functional Parallelism

خلّينا نرجع لنقطة البداية: ليش أصلاً احتجنا موضوع جديد اسمه "Functional Parallelism"؟ بالمحاضرات السابقة تعلمنا `async` و `finish`، وهي أدوات قوية، بس فيها فخ كبير: بتخليك تعدّل متغيرات مشتركة من جوا التاسكات، وأي تعديل مشترك زي هيك هو أرض خصبة لأخطاء صعبة الاكتشاف زي `Data Race`. فبدل ما نحارب هالمشكلة بعد ما تصير، فكرة هالمحاضرة إنو نتجنبها من جذورها — وهون بيدخل مفهوم `Functional Programming`: نمط برمجة بيعامل كل شيء كتقييم دوال رياضية بحتة، بلا أي أثر جانبي ولا تعديل حالة. وليش هذا مهم بالضبط؟ لأنه لو ما في حالة نعدّلها، فما في إمكانية أصلاً لصراع على تعديلها — نفس المدخلات دايماً بترجع نفس المخرجات، بغض النظر عن ترتيب أو توقيت التنفيذ. وهاي بالضبط الخاصية اللي بتخلي الكود أسهل بالتصميم، أسهل بالاختبار، وأسهل بتشغيله بالتوازي.

من هون منوصل لأول فكرة عملية: `Lazy Evaluation`. السؤال البسيط اللي بلّشت منه الفكرة: إذا الدالة ما إلها أثر جانبي، ليش نحسبها فوراً أصلاً؟ فكّر بمثال اللوغ: `Log.i(TAG, "current input: " + input.toString())` — لو كتبناها هيك، النص بينحسب فوراً حتى لو اللوغ معطّل أصلاً! أما لو غلّفنا الحساب بلامدا (`() -> "current input: " + input.toString()`)، صار الحساب "وصفة" مؤجلة، ما بتنفّذ إلا لو فعلاً احتجناها. الفكرة الجوهرية: أجّل الحساب لحد ما (وإذا) تحتاجه فعلاً — لأنه ممكن يكون مكلف، أو ممكن ما تحتاجه إطلاقاً.

من هالفكرة البسيطة بنينا `Lazy Memo`: كلاس بيحسب القيمة مرة وحدة بس عند أول `get()`، وبعدين بيحفظها ويرجعها جاهزة بأي طلب لاحق — نفس فكرة `Dynamic Programming` المعروفة: احسب مرة، واستخدم النتيجة بدل إعادة الحساب. بس السؤال اللي فتح الباب للتوازي كان: شو لو بعرف إني رح أحتاج القيمة أكيد بس مو هلق بالضبط؟ عندها بقدر أفوّض حسابها لمصدر تاني (خيط أو معالج تاني) وأروح أعمل شغل تاني بنفس الوقت — وهاد بالضبط تعريف `Future`.

`Future` هو حاوية للقراءة فقط، بتبدأ فاضية، وبتنملى بنتيجة مهمة ممكن تشتغل بالتوازي، وأي طرف يقدر يسحب نتيجتها عبر `get()`. الشبه الكبير بينه وبين `Lazy Memo` واضح: الاثنين فاضيين بالبداية، الاثنين إنشاءهم فوري، الاثنين بينملو بلامدا، والاثنين أول `get()` فيهم ممكن ينتظر بينما استدعاءات `get()` اللاحقة بترجع فوراً. الفرق الوحيد الحقيقي، بس الأهم: لامدا الـ `Future` ممكن تُنفّذ بالتوازي، بينما لامدا الـ `Lazy Memo` بتتنفّذ بنفس الخيط اللي طلبها.

رسمياً، `Future` معرّف بعمليتين بس: `Assignment` (إسناد لمرة وحدة، زي متغيّر `final`) و `Blocking read` (`A.get()` — بتنتظر خلاص التاسك وبتضمن ترتيب زمني لكل كود بعدها). هالتعريف الدقيق هو اللي بيضمن غياب أي `Race Condition` على القيمة الراجعة، وهو سبب كون الـ `Futures` أداة موثوقة جداً للتوازي الوظيفي — أقدم استخدام لها كان بامتداد Lisp اسمه `MultiLisp`.

بلغة الكود، تحويل خوارزمية `divide-and-conquer` تسلسلية لمتوازية بـ `Futures` سهل جداً وأنيق: بدل ما تستدعي الدالة الفرعية مباشرة، تغلّفها بـ `future(() -> ...)`، وبدل ما تستخدم النتيجة مباشرة، تستدعي `.get()` عليها — والبنية المنطقية للكود (حالات الأساس، الـ `if/else`) ما بتتغير إطلاقاً. وبإطار Java's Fork/Join، هذا بيترجم لاستخدام `RecursiveTask` بدل `RecursiveAction`، بحيث `compute()` لازم يرجع قيمة (مو `void`)، و `join()` بترجع القيمة الفعلية مو بس تنتظرها.

نفس فكرة `Futures` بتنطبق بشكل جميل على `Memoization`: بدل ما نخزّن بجدول الحفظ التذكّري القيمة الجاهزة `f(x)`، نخزّن `Future` لهاي القيمة، وعملية الـ `lookup` بتتحول لـ `Future.get()` — بحيث لو حدا سبق وبلّش يحسب نفس المدخل (حتى لو لسا ما خلص)، أي طلب جديد بياخد نفس الـ `Future` بدل ما يعيد الحساب من الصفر بالتوازي. هاي التقنية مفيدة جداً بمسائل الـ `Dynamic Programming` زي حساب مثلث Pascal بكفاءة.

وبعدها منوصل لأشمل تطبيق عملي لكل هالفلسفة: `Java Streams`. الفكرة بسيطة: خذ مجموعة عناصر، حوّلها لـ `Stream` (تمثيل كسول)، طبّق عليها سلسلة عمليات كسولة كلها بوقت ثابت، وبس عند الحاجة الفعلية للنتيجة، احسب فقط ما يلزم. عمليات الـ `Stream` بتنقسم لنوعين: **وسيطة** (`filter`, `map`, `flatMap`, `distinct`, `sorted`, `peek`, `limit`, `skip`) وكلها كسولة تماماً — ما بتنفّذ شيء لحدها؛ و**نهائية** (`reduce`, `collect`, `count`, `forEach`, `min/max`, `*Match`, `find*`) وهي اللي بتحرّك التنفيذ الفعلي، وكلها بالأساس حالات خاصة من `reduce()`. أثبتنا هالكسل بمثال عملي: `filter` مع `println` جواها ما طبعت أي شيء لحد ما وصلنا `findFirst()` — وحتى عندها، توقفت بمجرد ما لقت أول نتيجة تحقق الشرط، بدون ما تكمل باقي العناصر.

وأجمل شيء بموضوع الـ Streams: كل هالسلسلة ممكن تشتغل بالتوازي بسطر واحد بس — `.parallel()`. بس لازم تنتبه: هاد طلب مو ضمان، جافا مو ملزمة تنفّذ بالتوازي فعلياً، وترتيب معالجة العناصر غير مضمون إطلاقاً بهالوضع — شفنا هذا عملياً لما ترتيب استدعاءات `filter` تغيّر واختلف عن التسلسلي (وحتى بين تشغيلة وتانية).

وأخيراً، كل هالرحلة بترجع تربطنا بالسؤال الأساسي: ليش أهمية كل هذا؟ لأنه البرمجة المتوازية بتواجه ثلاث تحديات: `Correctness` (أخطاء جديدة زي `Data Races`)، `Performance` (بيعتمد على العتاد والمترجم)، و`Portability` (وظيفية وأدائية). أخطر هالتحديات هو `Data Race` — وشفنا مثال واضح: تاسك بتكتب على `sum2` مشترك بدون `finish` تحكمها، فالقراءة النهائية `sum1 + sum2` غير مضمونة الترتيب.

وهون بيجي أهم مفهوم بالمحاضرة: `Data-Race-Free Determinism Property`. لو برنامجك مبني بأدوات زي `finish`, `async`, `futures`، **وأثبتّ إنه خالٍ من `Data Race`**، فهو مضمون **مية بالمية** إنه يكون `functionally deterministic` (نفس الجواب دايماً) **و** `structurally deterministic` (نفس `Computation Graph` دايماً). بس الجانب المثير للاهتمام: وجود `Data Race` **ما يعني بالضرورة** إن البرنامج رح يعطي نتائج مختلفة — فيه حالة اسمها `Benign Nondeterminism`، وشفناها بمثال البحث عن نمط بنص: نسخة "هل يوجد؟" فيها `Data Race` تقني (كل خيط ممكن يكتب `found = true`)، بس النتيجة نفسها دايماً لأنه كل الكتابات متطابقة. بالمقابل، نسخة "أين الموقع؟" فيها `Data Race` حقيقي وخطير، لأنه كل خيط بيكتب قيمة مختلفة (`index = i`)، فآخر كتابة بتفوز بشكل عشوائي غير مضمون.

الدرس الأهم: التفكير الوظيفي (`Functional`) مو مجرد أسلوب برمجة أنيق — هو استراتيجية عملية لبناء برامج متوازية صحيحة وقابلة للتنبؤ، وأدواتها (`Futures`, `Streams`, `Memoization`) موجودة اليوم بكل لغة برمجة حديثة تقريباً لأنها فعلاً بتحل مشكلة حقيقية.

بالمحاضرة الجاية غالباً رح نبني على هالأساس، وننتقل لأدوات تزامن أكتر تعقيداً (`Barriers`, `Phasers`, `Locks`, `Conditions`) ونتعمق أكتر بمشاكل `Deadlock` و `Livelock` و `Starvation` اللي بس لمسناها اليوم من زاوية `Data Race`.

---

# الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium)
**السؤال:** ما هو السبب **الرئيسي** اللي بيخلي `Functional Programming` مناسب للتوازي حسب المحاضرة؟

أ) لأنه بيدعم `Recursion` بدل الحلقات
ب) لأنه بيتجنب تعديل الحالة المشتركة (`state mutation`)، وهو أكبر مصدر تعقيد بالتوازي
ج) لأنه بيسمح باستخدام `Closures` فقط
د) لأنه بيمنع استخدام `for loops` نهائياً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) `Recursion` خاصية موجودة بـ `Functional Programming` بس هي مو السبب الجوهري وراء ملاءمته للتوازي
- ✅ ب) المحاضرة صراحة بتقول "State mutation is one of the biggest source of headaches and complexity in parallel and concurrent programming"
- ❌ ج) `Closures` خاصية جانبية، مو السبب الرئيسي
- ❌ د) `Functional Programming` ما بيمنع الحلقات نهائياً، بس بيفضّل `Recursion`

---

### السؤال 2 (medium)
**السؤال:** أي من التالي يصف الفرق بين `Eager` و `Lazy Evaluation` بشكل صحيح؟

أ) `Eager` بتحسب القيمة فوراً بغض النظر عن الحاجة، و `Lazy` بتؤجل الحساب لحد الحاجة الفعلية
ب) `Lazy` أسرع دايماً من `Eager` بكل الحالات
ج) `Eager` بس تُستخدم بـ `Java Streams`، و `Lazy` بس تُستخدم باللوغ
د) لا فرق عملي بين الاثنين

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ) هذا بالضبط تعريف المحاضرة: "The idea: defer computation of a value until (and if) you need it"
- ❌ ب) `Lazy` أفضل بس بحالات معينة (حساب مكلف أو غير مضمون الحاجة)، مو دايماً أسرع
- ❌ ج) الاثنين مفهومان عامان، مو مقتصرين على تقنية محددة
- ❌ د) فيه فرق جوهري بالأداء والسلوك بينهم

---

### السؤال 3 (hard)
**السؤال:** بالكود التالي:
```java
public T get() {
    if (contents != null) { return contents; }
    if (supplier != null) {
        contents = supplier.get();
        supplier = null;
    }
    return contents;
}
```
لو استدعينا `get()` ثلاث مرات متتالية على نفس الكائن `Lazy<T>`، كم مرة سيتم تنفيذ الـ `lambda` الأصلية (`supplier`)؟

أ) 0
ب) 1
ج) 2
د) 3

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) لازم تنفّذ مرة واحدة على الأقل عند أول `get()` لحساب القيمة
- ✅ ب) أول `get()` بينفّذ `supplier.get()` ويحفظ النتيجة بـ `contents` ويصفّر `supplier`؛ الاستدعاءات الثانية والثالثة بترجع `contents` المحفوظة مباشرة بدون إعادة تنفيذ
- ❌ ج) هذا لو افترضنا خطأً إنه فيه استدعاء إضافي، بس الكود بوضوح بيتحقق `contents != null` أولاً
- ❌ د) هذا يفترض تنفيذ `lambda` بكل `get()`، وهذا يناقض فكرة `Memoization` الأساسية

---

### السؤال 4 (medium)
**السؤال:** ما الفرق الجوهري بين `Future` و `Lazy Memo`؟

أ) `Future` بيحفظ النتيجة، و `Lazy Memo` لا يحفظها
ب) `Lazy Memo` ممكن تنفّذ اللامدا بالتوازي، و `Future` لا
ج) `Future` ممكن تنفّذ اللامدا بالتوازي (على خيط/معالج تاني)، بينما `Lazy Memo` بتحسبها بنفس الخيط
د) لا يوجد فرق، هما نفس المفهوم بأسماء مختلفة

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ) `Lazy Memo` كمان بتحفظ النتيجة — هذا مو الفرق
- ❌ ب) هذا عكس الصحيح تماماً
- ✅ ج) المحاضرة بتذكر صراحة: "The lambda to compute the value may be executed in parallel — Unlike the Lazy Memo"
- ❌ د) الاثنين متشابهين جداً بس فيهم فرق جوهري واحد بمكان التنفيذ

---

### السؤال 5 (hard)
**السؤال:** بإطار Java's Fork/Join، أي كلاس أساس (`base class`) لازم يرث منه `Future Task` (بدل `RecursiveAction`)؟

أ) `ForkJoinTask`
ب) `RecursiveTask`
ج) `CompletableFuture`
د) `Thread`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) `ForkJoinTask` كلاس أعم، مو المحدد المذكور بالمحاضرة
- ✅ ب) المحاضرة صراحة: "A future task extends the RecursiveTask class in the FJ framework, instead of RecursiveAction as in regular tasks"
- ❌ ج) `CompletableFuture` مو مذكور بالمحاضرة كجزء من Fork/Join Framework
- ❌ د) `Thread` غير مرتبط بـ Fork/Join Framework

---

### السؤال 6 (medium) — سيناريو كود
**السؤال:** بالكود التالي من نسخة `Future` لجمع مصفوفة:
```java
var sum1 = future(() -> computeSum(X, lo, mid));
var sum2 = future(() -> computeSum(X, mid + 1, hi));
return sum1.get() + sum2.get();
```
أي من التالي يصف السلوك الفعلي لهذا الكود؟

أ) `sum2` ما رح تبدأ حسابها إلا بعد ما `sum1.get()` تخلص
ب) `sum1` و `sum2` ممكن يبدأو حسابهم بالتوازي، والسطر الأخير بينتظر الاثنين ويجمعهم
ج) الكود سيرمي استثناء لأنه ما فيه `finish`
د) `sum1.get()` و `sum2.get()` بترجعو فوراً بدون أي انتظار

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) هذا وصف للتنفيذ التسلسلي، مو `Future` — الميزة الأساسية إنو الاثنين ممكن يشتغلو بالتوازي
- ✅ ب) هذا بالضبط جوهر `Future`: التاسكات تبدأ فوراً وبشكل مستقل، والـ `get()` بينتظر النتيجة فقط عند الحاجة الفعلية
- ❌ ج) `future()` نفسها آلية تنسيق كافية، ما تحتاج `finish` إضافية بهالمثال
- ❌ د) `get()` ممكن تنتظر (`block`) لو النتيجة لسا مو جاهزة

---

### السؤال 7 (medium)
**السؤال:** حسب `Future Tasks`، متغيّر `A` مسند إليه `Future` — أي وصف صحيح لخاصية `Assignment` عليه؟

أ) ممكن يُعاد إسناده لقيمة جديدة عدة مرات
ب) قابل للإسناد مرة واحدة فقط، شبيه بمتغيّر `final` بجافا
ج) لا يمكن إسناده إطلاقاً بعد إنشائه فارغاً
د) يُسند تلقائياً بمجرد إنشاء التاسك، بدون حاجة لانتظار

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) هذا يناقض خاصية `single assignment` المذكورة بالمحاضرة
- ✅ ب) المحاضرة صراحة: "The content of the future object is constrained to be single assignment (similar to a final variable in Java)"
- ❌ ج) الإسناد الأول ممكن وصحي، الممنوع هو التعديل **بعد** ما التاسك يرجع نتيجته
- ❌ د) الإسناد بيصير بعد ما التاسك يخلص وترجع قيمته، مو تلقائياً فوراً

---

### السؤال 8 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
List<String> list = Arrays.asList("Rice", "Owls", "are", "the", "best");
Stream<String> stream = list.stream()
    .filter(e -> { System.out.println("Filter called on " + e); return e.contains("e"); });
```
ما الذي سيُطبع عند تنفيذ هذا الكود فقط (بدون أي عملية إضافية بعده)؟

أ) `Filter called on Rice`
ب) `Filter called on Rice`, `Filter called on Owls`, ...لكل العناصر
ج) لن يُطبع أي شيء (`Nothing`)
د) `Filter called on the`, `Filter called on best` فقط (العناصر التي تحتوي "e")

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ) هذا يفترض تنفيذاً جزئياً غير موجود بالكود
- ❌ ب) هذا يفترض إن `filter` عملية نهائية تحرّك التنفيذ، وهي ليست كذلك
- ✅ ج) `filter` عملية وسيطة (`intermediate`) كسولة، وما في أي عملية نهائية (`terminal`) استُدعيت — المحاضرة صراحة توضح هذا المثال بالضبط وناتجه "Nothing!"
- ❌ د) هذا يفترض تنفيذاً كاملاً، بينما لا شيء نُفّذ لعدم وجود عملية نهائية

---

### السؤال 9 (medium)
**السؤال:** أي من التالي يصف `Terminal Operations` بالـ Streams بشكل صحيح؟

أ) هي عمليات كسولة زي `filter` و `map`
ب) كل عمليات `Terminal` هي بالأساس حالات خاصة من `reduce()`
ج) `Terminal Operations` لا يمكن استخدامها إلا مع `Parallel Streams`
د) `skip()` و `limit()` هما مثالان على `Terminal Operations`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) هذا وصف لـ `Intermediate Operations` وليس `Terminal`
- ✅ ب) المحاضرة صراحة: "All of these are just special cases of reduce()!"
- ❌ ج) `Terminal Operations` تُستخدم بكلا الوضعين، التسلسلي والمتوازي
- ❌ د) `skip()` و `limit()` هما `Intermediate Operations` وسيطتان كسولتان، وليستا `Terminal`

---

### السؤال 10 (medium)
**السؤال:** ما الفرق بين `IntStream.range(1, 3)` و `LongStream.rangeClosed(1, 3)`؟

أ) لا فرق، الاثنان يعطيان نفس العناصر
ب) `range` نصف مفتوح فلا يتضمن النهاية، و `rangeClosed` مغلق يتضمنها
ج) `range` مخصص للأعداد السالبة فقط
د) `rangeClosed` لا يمكن استخدامها إلا مع `IntStream`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) `range(1, 3)` تعطي `(1, 2)` فقط، بينما `rangeClosed(1, 3)` تعطي `(1, 2, 3)` — فرق حقيقي
- ✅ ب) هذا بالضبط ما يوضحه تعليق الشريحة: `IntStream.range(1, 3); // IntStream of (1, 2)` مقابل `LongStream.rangeClosed(1, 3); // LongStream of (1, 2, 3)`
- ❌ ج) لا علاقة بهذا بالأعداد السالبة
- ❌ د) `rangeClosed` متاحة أيضاً بـ `IntStream` و `DoubleStream`

---

### السؤال 11 (hard)
**السؤال:** لماذا تعتبر النسخة "هل يوجد ظهور؟" (`found = true` من عدة خيوط) مثالاً على `Benign Nondeterminism` رغم وجود `Data Race` فيها؟

أ) لأنها لا تحتوي على `Data Race` أصلاً
ب) لأن كل الكتابات المتزامنة تكتب نفس القيمة بالضبط، فالنتيجة النهائية لا تتأثر بترتيب التنفيذ
ج) لأن الخوارزمية تستخدم `finish` لضمان الترتيب
د) لأن `Java` تمنع `Data Race` تلقائياً على المتغيرات من نوع `boolean`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) بالعكس، فيها `Data Race` تقني حقيقي (كتابات متعددة بدون تنسيق)
- ✅ ب) المحاضرة تعرّف `Benign Nondeterminism` بأنه حالة "different executions... may generate different outputs, but all the outputs may be acceptable" — وهنا كل الكتابات متطابقة (`true`) فالنتيجة ثابتة دائماً
- ❌ ج) وجود `finish` لا علاقة له بمنع `Data Race` على المتغير المشترك نفسه هنا
- ❌ د) `Java` لا توفر أي حماية تلقائية من `Data Race` على `boolean` أو أي نوع آخر

---

### السؤال 12 (medium)
**السؤال:** ما الفرق بين `Functional Determinism` و `Structural Determinism`؟

أ) `Functional Determinism` يهتم بنفس الجواب النهائي، و `Structural Determinism` يهتم بنفس `Computation Graph`
ب) هما مفهوم واحد بأسماء مختلفة
ج) `Structural Determinism` أضعف من `Functional Determinism`
د) `Functional Determinism` فقط ينطبق على `Futures`

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ) المحاضرة تعرّفهما بدقة: الأول "always computes the same answer"، والثاني "always produces the same computation graph"
- ❌ ب) هما مفهومان مختلفان بوضوح رغم الترابط بينهما
- ❌ ج) العكس صحيح — `Structural Determinism` شرط أقوى (نفس البنية، وليس فقط نفس الجواب)
- ❌ د) الاثنان مفهومان عامان ينطبقان على أي برنامج متوازي مبني بـ `finish`/`async`/`futures`

---

### السؤال 13 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
sum1 = 0; sum2 = 0; // shared fields
async {
    for (int i = X.length/2; i < X.length; i++) sum2 += X[i];
}
for (int i = 0; i < X.length/2; i++) sum1 += X[i];
return sum1 + sum2;
```
ما سبب `Data Race` تحديداً بهذا الكود؟

أ) استخدام `for loop` بدل `while loop`
ب) عدم وجود `finish` حول `async`، فلا يوجد ضمان لخلاص التاسك قبل قراءة `sum2`
ج) `sum1` و `sum2` من نوع `int` بدل `long`
د) عدم استخدام `Future` بدل `async`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) نوع الحلقة لا علاقة له بـ `Data Race`
- ✅ ب) المحاضرة صراحة: "Data race between accesses of sum2 in async and in main program (due to missing finish)"
- ❌ ج) نوع البيانات العددي لا يسبب `Data Race`
- ❌ د) استخدام `Future` حل ممكن، لكنه ليس السبب — السبب هو غياب أي آلية تنسيق (`finish` أو ما يعادلها)

---

### السؤال 14 (hard) — حسابي
**السؤال:** برنامج متوازي مبني بالكامل باستخدام `finish`, `async`, و `futures`، وتم إثبات إنه خالٍ تماماً من `Data Race`. حسب `Data-Race-Free Determinism Property`، أي من التالي **صحيح حتماً**؟

أ) البرنامج `functionally deterministic` فقط، وقد يكون `structurally nondeterministic`
ب) البرنامج `structurally deterministic` فقط، وقد يكون `functionally nondeterministic`
ج) البرنامج `functionally deterministic` و `structurally deterministic` بالاثنين معاً
د) لا يمكن الجزم بأي شيء بدون تشغيل البرنامج فعلياً عدة مرات

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ) الخاصية تضمن الاثنين معاً، وليس واحداً فقط
- ❌ ب) نفس السبب أعلاه — الخاصية تضمن الاثنين معاً
- ✅ ج) نص الخاصية بالمحاضرة: "then it must be both functionally deterministic and structurally deterministic" — بشكل مضمون رياضياً، دون حاجة لتشغيل فعلي
- ❌ د) هذا يناقض جوهر الخاصية اللي هدفها إثبات الحتمية **نظرياً** بدون الحاجة لتشغيل متكرر

---

### السؤال 15 (medium) — سيناريو كود
**السؤال:** بالكود التالي لجمع مصفوفة بالنسخة المتوازية:
```java
static int computeSum(int[] X, int lo, int hi) throws SuspendableException {
    if (lo > hi) return 0;
    else if (lo == hi) return X[lo];
    else {
        int mid = (lo + hi) / 2;
        var sum1 = future(() -> computeSum(X, lo, mid));
        var sum2 = future(() -> computeSum(X, mid + 1, hi));
        return sum1.get() + sum2.get();
    }
}
```
إذا استُدعيت الدالة بمصفوفة `X = {2, 4, 6}` و `lo=0, hi=2`، ما القيمة الراجعة؟

أ) 10
ب) 12
ج) 8
د) 6

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ) 10 = 4+6 فقط، لو تم تجاهل أحد العناصر خطأً
- ✅ ب) `mid = (0+2)/2 = 1`. `sum1 = computeSum(X, 0, 1)` = `X[0]+X[1] = 2+4 = 6`. `sum2 = computeSum(X, 2, 2) = X[2] = 6`. المجموع الكلي = `2+4+6 = 12`
- ❌ ج) 8 = 2+6، لو تم تجاهل `X[1]` خطأً
- ❌ د) 6 قيمة جزء واحد فقط من المصفوفة، وليست المجموع الكلي

---

### السؤال 16 (hard) — حسابي
**السؤال:** استخدمت `Java Streams` لحساب `size` من القائمة `["Rice", "Owls", "are", "the", "best"]` بهذا الكود:
```java
long size = list.stream()
    .skip(1)
    .map(e -> e.substring(0, 3))
    .filter(e -> e.charAt(2) == 'e')
    .sorted()
    .count();
```
بعد `.skip(1)` تبقى `["Owls", "are", "the", "best"]`. بعد `.map(...)` تصبح `["Owl", "are", "the", "bes"]`. كم عنصراً سينتج عن `.filter(e -> e.charAt(2) == 'e')` (أي بحيث الحرف بالفهرس 2 يساوي `'e'`)؟

أ) 0
ب) 1
ج) 2
د) 3

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ) هناك بالفعل عناصر تحقق الشرط، فالنتيجة ليست صفراً
- ❌ ب) هذا أقل من العدد الفعلي — هناك عنصران يحققان الشرط وليس واحداً
- ✅ ج) نفحص كل عنصر (الفهرس 2 = الحرف الثالث، 0-indexed): `"Owl"` → `O`(0) `w`(1) `l`(2)='l' ❌. `"are"` → `a`(0) `r`(1) `e`(2)='e' ✅. `"the"` → `t`(0) `h`(1) `e`(2)='e' ✅. `"bes"` → `b`(0) `e`(1) `s`(2)='s' ❌. النتيجة: عنصران يحققان الشرط (`"are"`, `"the"`)
- ❌ د) 3 يفترض تحقق `"bes"` أيضاً للشرط، وهذا غير صحيح لأن حرفها بالفهرس 2 هو `'s'` وليس `'e'`

---

# الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)
```java
public class Lazy<T> {
    private T contents;
    private Supplier<T> supplier;

    private Lazy(Supplier<T> supplier) {
        contents = null;
        this.supplier = supplier;
    }

    public T get() {
        contents = supplier.get(); // مشكلة هنا!
        return contents;
    }
}
```
**الخطأ:** الكود بيعيد استدعاء `supplier.get()` **بكل مرة** يُستدعى فيها `get()`، بدون التحقق أولاً إذا كانت `contents` محسوبة مسبقاً — هذا بيلغي فائدة الـ `Memoization` بالكامل ويعيد الحساب كل مرة.

**التصحيح:**
```java
public T get() {
    if (contents != null) {
        return contents;
    }
    if (supplier != null) {
        contents = supplier.get();
        supplier = null;
    }
    return contents;
}
```

---

### سؤال تصحيح 2 (misconception)
```java
var future1 = future(() -> computeSum(X, 0, mid));
int result = computeSum(X, mid + 1, hi) + future1;
```
**الخطأ:** هذا خطأ مفاهيمي (`misconception`) — الطالب حاول جمع `future1` (كائن `Future`) مباشرة مع `int`، وكأن `future1` هي القيمة نفسها. لازم استدعاء `.get()` صراحة لسحب القيمة الفعلية من الـ `Future`.

**التصحيح:**
```java
var future1 = future(() -> computeSum(X, 0, mid));
int result = computeSum(X, mid + 1, hi) + future1.get();
```

---

### سؤال تصحيح 3 (return_check)
```java
class SumTask extends RecursiveAction {
    int result;
    protected void compute() {
        result = 10; // حساب ما
    }
}
// ...
SumTask task = new SumTask();
task.fork();
int value = task.join(); // مشكلة هنا!
```
**الخطأ:** الكلاس بيرث من `RecursiveAction` (المخصصة للتاسكات اللي **لا** ترجع قيمة)، فـ `join()` عليها بترجع `void`، مو `int` — الكود ما رح يترجم (`compile error`).

**التصحيح:**
```java
class SumTask extends RecursiveTask<Integer> {
    protected Integer compute() {
        return 10; // حساب ما، وإرجاعه فعلياً
    }
}
// ...
SumTask task = new SumTask();
task.fork();
int value = task.join(); // الآن صحيحة لأن RecursiveTask<Integer> ترجع قيمة فعلاً
```

---

### سؤال تصحيح 4 (dead_code)
```java
Stream<String> stream = list.stream()
    .filter(e -> e.contains("a"))
    .map(e -> e.toUpperCase());
System.out.println("Processing done!"); // كود ميت منطقياً هنا
```
**الخطأ:** الطباعة `"Processing done!"` مضللة (`dead code` من ناحية المعنى المنطقي) — لأنه بسبب الطبيعة الكسولة (`lazy`) لعمليات `Stream`، **لا شيء نُفّذ فعلياً بعد** عند وصول هذا السطر — لا `filter` ولا `map`. الطباعة بتوحي بخلاص معالجة لم تبدأ أصلاً.

**التصحيح:**
```java
Stream<String> stream = list.stream()
    .filter(e -> e.contains("a"))
    .map(e -> e.toUpperCase());
long count = stream.count(); // عملية نهائية فعلية تحرّك التنفيذ
System.out.println("Processing done! Count: " + count); // الآن الرسالة صحيحة منطقياً
```

---

### سؤال تصحيح 5 (logic)
```java
found = false;
finish {
    for (int i = 0; i <= N - M; i++) {
        async {
            for (j = 0; j < M; j++)
                if (text[i + j] != pattern[j]) break;
            if (j == M) found = true;
        }
    }
}
if (found) index = 0; // مشكلة هنا!
print index;
```
**الخطأ:** خطأ منطقي (`logic`) — الكود بيفترض إن `index = 0` هو الموقع الصحيح لأي ظهور موجود، بينما الحقيقة إنه ما بنعرف **وين بالضبط** ظهر النمط، بس نعرف **إنه** ظهر بمكان ما. هذا خلط بين نسخة "هل يوجد؟" (`found`) ونسخة "أين الموقع؟" (`index`) اللي شرحناها كنسختين مختلفتين تماماً بالمحاضرة.

**التصحيح:**
```java
index = -1;
finish {
    for (int i = 0; i <= N - M; i++) {
        async {
            for (j = 0; j < M; j++)
                if (text[i + j] != pattern[j]) break;
            if (j == M) index = i; // نخزن الموقع الفعلي i، مو صفر ثابت
        }
    }
}
print index; // -1 لو ما وُجد، أو موقع فعلي (قد يكون غير حتمي إذا وُجد أكثر من ظهور)
```

---

# الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما هو الدافع الأساسي وراء استخدام `Functional Programming` بالتوازي؟
**A:** تجنب تعديل الحالة المشتركة (`state mutation`) من الأساس، وهو أكبر مصدر تعقيد بالتوازي.

### البطاقة 2
**Q2:** ما الفرق بين `Eager` و `Lazy Evaluation`؟
**A:** `Eager` تحسب القيمة فوراً بغض النظر عن الحاجة، `Lazy` تؤجل الحساب لحد الحاجة الفعلية (أو لا تحسبه إطلاقاً).

### البطاقة 3
**Q3:** كم مرة تُنفّذ لامدا (`supplier`) داخل `Lazy Memo` عبر استدعاءات `get()` متعددة؟
**A:** مرة واحدة فقط — أول `get()`، وبعدها تُرجع القيمة المحفوظة مباشرة.

### البطاقة 4
**Q4:** ما الفرق الجوهري الوحيد بين `Future` و `Lazy Memo`؟
**A:** لامدا الـ `Future` ممكن تُنفّذ بالتوازي على مصدر آخر، بينما لامدا الـ `Lazy Memo` تُنفّذ بنفس الخيط.

### البطاقة 5
**Q5:** ما هما العمليتان الأساسيتان المعرّفتان رسمياً على كائن `Future`؟
**A:** `Assignment` (إسناد لمرة واحدة، شبيه بـ `final`) و `Blocking read` (`A.get()` — تنتظر خلاص التاسك وترجع نتيجته).

### البطاقة 6
**Q6:** بإطار Java's Fork/Join، ما الكلاس الذي ترث منه `Future Task` بدل `RecursiveAction`؟
**A:** `RecursiveTask` — بحيث `compute()` ترجع قيمة (غير `void`)، و`join()` ترجع القيمة الفعلية.

### البطاقة 7
**Q7:** كيف تتحول `Memoization` التسلسلية إلى نسخة متوازية باستخدام `Futures`؟
**A:** بتخزين `Future` للقيمة بدل القيمة الجاهزة نفسها، وتحويل عملية `lookup` إلى `Future.get()`.

### البطاقة 8
**Q8:** ما الفرق بين `Intermediate Operations` و `Terminal Operations` بالـ Streams؟
**A:** `Intermediate` كسولة ولا تنفّذ شيئاً (`filter`, `map`...)، بينما `Terminal` تحرّك التنفيذ الفعلي وهي حالات خاصة من `reduce()`.

### البطاقة 9
**Q9:** ماذا يحدث عند استدعاء `.parallel()` على `Stream`؟
**A:** يُفعّل مجرد "علم" (`flag`) يطلب تنفيذاً متوازياً — بدون أي ضمان فعلي للتوازي أو لترتيب معالجة العناصر.

### البطاقة 10
**Q10:** ما هي التحديات الثلاثة الرئيسية للبرمجة المتوازية حسب المحاضرة؟
**A:** `Correctness` (أخطاء جديدة زي `Data Race`)، `Performance` (يعتمد على النظام الأساسي)، و`Portability` (وظيفية وأدائية).

### البطاقة 11
**Q11:** ما نص `Data-Race-Free Determinism Property`؟
**A:** برنامج مبني بـ `finish`/`async`/`futures` وخالٍ من `Data Race` مضمون أن يكون `functionally` و `structurally deterministic` بالاثنين معاً.

### البطاقة 12
**Q12:** ما هو `Benign Nondeterminism`؟
**A:** حالة يوجد فيها `Data Race` تقنياً، لكن كل التنفيذات المختلفة تعطي نتائج مقبولة بنفس المستوى — مثل كتابة نفس القيمة `true` من عدة خيوط.

### البطاقة 13
**Q13:** لماذا نسخة "موقع الظهور" (`index = i`) بالبحث عن نمط تُعتبر `Data Race` حقيقياً وليس `Benign`؟
**A:** لأن كل خيط يكتب قيمة مختلفة (موقعه الخاص)، فآخر كتابة تفوز بشكل عشوائي غير مضمون، والنتيجة تختلف بين التشغيلات.

---

# ورقة المراجعة السريعة

### القواعد الذهبية

| # | القاعدة |
| --- | --- |
| 1 | `Functional Programming` بيتجنب `state mutation` = تجنب أكبر مصدر تعقيد بالتوازي |
| 2 | `Lazy Evaluation`: أجّل الحساب لحد ما (وإذا) تحتاجه فعلاً |
| 3 | `Lazy Memo` = حساب مرة واحدة + حفظ النتيجة، بنفس الخيط |
| 4 | `Future` = `Lazy Memo` + إمكانية تنفيذ اللامدا بالتوازي |
| 5 | `Future` معرّف بعمليتين: `Assignment` (مرة واحدة) و `Blocking read` (`get()`) |
| 6 | Fork/Join: `RecursiveTask` (يرجع قيمة) بدل `RecursiveAction` (`void`) |
| 7 | `Memoization` بالتوازي = تخزين `Future` بدل القيمة الجاهزة |
| 8 | `Stream Pipeline` = `source` + `intermediate` (كسولة) + `terminal` (تحرّك التنفيذ) |
| 9 | `.parallel()` طلب وليس ضمان، وترتيب معالجة العناصر غير مضمون |
| 10 | برنامج خالٍ من `Data Race` (مبني بـ `finish`/`async`/`futures`) = حتمي وظيفياً وبنيوياً بالضمان الكامل |
| 11 | وجود `Data Race` لا يعني بالضرورة نتائج مختلفة — قد يكون `Benign Nondeterminism` |

### مرجع سريع للمصطلحات

| المصطلح | التعريف بسطر |
| --- | --- |
| `Functional Programming` | تقييم دوال رياضية بدون `state` أو `side effects` |
| `Lazy Evaluation` | تأجيل الحساب لحد الحاجة الفعلية |
| `Lazy Memo` | حساب مرة واحدة وحفظ النتيجة، بنفس الخيط |
| `Future` | حاوية فاضية بالبداية، تُملأ بنتيجة قد تُحسب بالتوازي |
| `RecursiveTask` | كلاس Fork/Join للتاسكات اللي ترجع قيمة (بدل `RecursiveAction`) |
| `Memoization` | حفظ نتائج استدعاءات دالة سابقة لتفادي إعادة الحساب |
| `Stream` | تمثيل كسول لمجموعة عناصر مع سلسلة عمليات |
| `Intermediate Operation` | عملية كسولة على `Stream` (`filter`, `map`...) لا تنفّذ شيئاً لوحدها |
| `Terminal Operation` | عملية تحرّك تنفيذ الـ `Stream` فعلياً (`reduce`, `count`...) |
| `Data Race` | وصول متعدد بدون تنسيق لمتغيّر مشترك |
| `Functional Determinism` | نفس الجواب دايماً لنفس المدخل |
| `Structural Determinism` | نفس `Computation Graph` دايماً لنفس المدخل |
| `Benign Nondeterminism` | `Data Race` موجود لكن كل النتائج المحتملة مقبولة |

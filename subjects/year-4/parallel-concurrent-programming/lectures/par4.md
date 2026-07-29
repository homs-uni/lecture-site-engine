# المحاضرة 4 — Loop Parallelism (توازي الحلقات)
> **المادة:** البرمجة المتوازية والمتزامنة (نظري) | **الموضوع:** كيف نحوّل الحلقات التسلسلية (`for`) إلى حلقات متوازية (`forall`) بأمان، وكيف ننسّق بين التكرارات المتوازية باستخدام الحواجز (`Barriers`)، وكيف نتحكم بحجم المهام لتقليل الكلفة (`Chunking`)

> هذه المحاضرة تبني مباشرة على أدوات `finish` و `async` من المحاضرات السابقة، وتقدّم طبقة أعلى مخصّصة للحلقات: `forall`. الفكرة المركزية: مو كل حلقة `for` بتقدر تصير متوازية — لازم نفهم *ليش* بعض الحلقات آمنة للتوازي وبعضها لأ، وبعدين نتعلم كيف ننظّم التزامن بينها.

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 1. عن ماذا هذه المحاضرة؟
هذه المحاضرة بتشرح كيف نأخذ حلقات `for` العادية ونحوّلها لحلقات متوازية (`forall`) بشكل آمن ومنظم، باستخدام مثال عملي (ضرب المصفوفات)، وكيف ننسّق بين التكرارات المتوازية بأدوات الحواجز (`forallPhased` و `next`)، وأخيراً كيف نتعامل مع كلفة إنشاء المهام الكتيرة عبر تقنية التقسيم (`Chunking`).

### 2. ماذا ستقدر تعمل بعد هذه المحاضرة؟
- تميّز بين `Data Parallelism` و `Task Parallelism`.
- تحدد أي حلقة `for` بمجموعة حلقات متداخلة يمكن تحويلها لـ `forall` بدون كسر صحة البرنامج (`data race`).
- تكتب كود Java يستخدم `forall` من مكتبة `HJlib` بدل تركيبة `finish` + `async` + `for` اليدوية.
- تستخدم `forallPhased` و `next()` لضمان أن كل التكرارات المتوازية تنهي مرحلة معينة قبل ما تبلّش المرحلة التالية.
- تطبّق `forallChunked` لتقليل عدد المهام (`tasks`) المُنشأة وتحسين الأداء.

### 3. شو المفروض تعرفه قبل ما تبلّش
- أساسيات `finish` و `async` (من محاضرة سابقة): `finish` بينتظر لحد ما كل المهام جوّاه تخلص، و `async` بينشئ مهمة جديدة تشتغل بالتوازي.
- مفهوم `data race` (تسابق البيانات): لما أكتر من خيط يقرأ/يكتب نفس المتغير بنفس الوقت بدون تنسيق.
- أساسيات مصفوفات Java ثنائية الأبعاد (`array[i][j]`).

### 4. أهم المفاهيم بالمحاضرة
- **`Data Parallelism` مقابل `Task Parallelism`** — تنفيذ نفس الكود على بيانات مختلفة، مقابل تنفيذ أكواد مختلفة بالتوازي.
- **`forall`** — واجهة برمجية بديلة عن `finish` + `for` + `async` المتداخلة، مخصّصة للحلقات المتوازية، وفيها `finish` ضمني.
- **`forallPhased` و `next()`** — حاجز مزامنة (`Barrier`) يخلي كل التكرارات المتوازية تنتظر بعضها عند نقطة معينة قبل ما تكمل.
- **`Iterative Averaging`** — مثال عملي على حلقة متوازية جوا حلقة تسلسلية، توضّح إمتى الحلقة الداخلية تقدر تكون `forall` وإمتى الخارجية لازم تضل `forseq`.
- **`Chunking` (`forallChunked`)** — تجميع عدة تكرارات بمهمة واحدة لتقليل كلفة إنشاء المهام.

### 5. كيف تتصل هذه المحاضرة بالمحاضرات المجاورة
هذه المحاضرة (Lecture 4) بتبني مباشرة على مفاهيم `finish` و `async` من محاضرة سابقة عن التوازي الأساسي (Task Parallelism)، وبتحضّر الأرضية للمحاضرات الجاية حول أدوات تزامن أكتر تعقيداً متل `Futures` و `Data-Driven Tasks`، لأنه فهم `forall` و `Barrier` أساسي قبل ما نفهم أدوات تنسيق أعقد.

### 6. أشهر 3-5 أخطاء يقع فيها الطلاب بهذا الموضوع
1. **الاعتقاد إنو أي حلقة `for` ممكن تصير `forall` مباشرة** — بدون فحص إذا في `data race` (متل حلقة `for-k` بضرب المصفوفات).
2. **نسيان إنو `forall` فيها `finish` ضمني** — فبيحطو `finish` زيادة حواليها بدون داعي، أو بالعكس بيفترضو إنو الكود بعدها بيكمل قبل ما تخلص كل التكرارات.
3. **الخلط بين `forall` و `forallPhased`** — استخدام `forall` بموقف بده تزامن بين التكرارات (`next()`) وهو غير مسموح إلا جوا `forallPhased`.
4. **الاعتقاد إنو `next()` عملها متل حلقة عادية بتتوقف بمكان ثابت** — بينما بالحقيقة الحواجز مو `statically scoped`، ممكن تجي من نقاط مختلفة بالبرنامج.
5. **تجاهل كلفة إنشاء المهام (`overhead`)** — إنشاء `forall` بعدد تكرارات كبير جداً مع شغل قليل جداً بكل تكرار، بدل استخدام `forallChunked`.

---

## الجزء الثاني: الشرح التفصيلي

### 1. أنواع التوازي: Data Parallelism و Task Parallelism
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "finish_async_lecture", group: "1.1"} -->

#### 📍 أين نحن الآن؟
هاي أول نقطة بالمحاضرة، وبتحدد نوعين أساسيين من التوازي رح نستخدمهم كإطار مرجعي طول المحاضرة.

#### ⬅️ الربط مع السابق
بالمحاضرات السابقة اتعرفنا على `async` كأداة عامة لإنشاء مهمة متوازية. هلأ رح نصنّف: هل هاي المهمة المتوازية بتعمل نفس الشي على بيانات مختلفة (Data)، ولا بتعمل شغلة مختلفة تماماً (Task)؟

#### 💡 الفكرة الأساسية
**`Data Parallelism` بتنفّذ نفس الكود بالضبط على عناصر مختلفة من نفس البيانات، بينما `Task Parallelism` بتنفّذ قطع كود مختلفة تماماً بنفس الوقت.**

---

#### 💡 التشبيه
تخيل مطبخ مطعم: لو عندك 6 طهاة وكل واحد فيهم عم يقطّع نفس نوع الخضار (كل واحد ياخد سدس الكمية ويسوي بالضبط نفس العملية) — هاد `Data Parallelism`. أما لو واحد عم يقطّع خضار، وتاني عم يحمّي الفرن، وتالت عم يحضّر الصلصة — كل واحد عملية مختلفة تماماً بنفس الوقت — هاد `Task Parallelism`.
وجه الشبه: **نفس العملية على بيانات مختلفة = `Data Parallelism`**، **عمليات مختلفة بنفس الوقت = `Task Parallelism`**.

#### 📖 الشرح
`Data Parallelism` بتصير لما يكون عندك مجموعة بيانات (`Data set`) وبدك تطبّق نفس الكود على كل عنصر فيها بالتوازي — متل ما بيصير لما تضرب كل عنصر بمصفوفة برقم ثابت، كل عنصر مستقل عن التاني فما في مانع تعالجهم كلهم سوا.

`Task Parallelism` أعم من هيك: بتصير لما عندك أكتر من "مهمة" (`Task`) مختلفة بالكود، وبتنفّذهم بنفس الوقت، سواء اشتغلو على نفس البيانات أو بيانات مختلفة. يعني `Task Parallelism` مو شرط تكون العمليات متطابقة.

**ليش هالتمييز مهم؟** لأنه `forall` (اللي رح نتعلمه بهاي المحاضرة) هي أداة مصممة خصيصاً لحالة `Data Parallelism` — حلقة بتطبّق نفس الجسم (`body`) على مجموعة قيم مختلفة لمتغير التكرار.

#### 🎯 الملخص السريع
- `Data Parallelism`: نفس الكود، بيانات مختلفة.
- `Task Parallelism`: أكواد مختلفة، بنفس الوقت.
- `forall` مبنية أساساً لخدمة `Data Parallelism`.

#### 📚 التطبيق
رح نشوف بالفقرة الجاية مثال حقيقي (ضرب المصفوفات) وين هالتمييز بيصير مهم لتحديد أي حلقة تقدر تصير متوازية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Data parallelism: simultaneous execution of the same code across the elements of a data set. Task parallelism: simultaneous execution of multiple and different pieces of code across the same or different data sets.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف كل من `Data Parallelism` و `Task Parallelism` مع الفرق بينهم.
- ℹ️ إضافة من الدليل: التشبيه اليومي بالمطبخ.

</details>

---

### 2. ضرب المصفوفات: الخوارزمية التسلسلية
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1", group: "2.1-2.4"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (2.1 → 2.4) بتاخدنا خطوة بخطوة من الخوارزمية التسلسلية لضرب المصفوفات، لتحويلها التدريجي لنسخة متوازية بـ `finish`/`async`، وأخيراً لنسخة نظيفة بـ `forall`.

#### ⬅️ الربط مع السابق
بعد ما فهمنا الفرق بين `Data` و `Task Parallelism`، هلأ رح نشوف مثال حقيقي كامل — ضرب المصفوفات — ونحدد وين بالضبط فيه `Data Parallelism` ممكن نستغلها.

#### 💡 الفكرة الأساسية
**ضرب المصفوفات فيه ثلاث حلقات متداخلة (`i`, `j`, `k`)، وكل عنصر بمصفوفة الناتج `c[i][j]` بيتحسب كمجموع حاصل ضرب صف من `a` بعمود من `b`.**

---

#### 💻 الكود
```java
// Sequential version
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        c[i][j] = 0;

for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        for (int k = 0; k < n; k++)
            c[i][j] += a[i][k] * b[k][j];

// Print first element of output matrix
println(c[0][0]);
```

#### شرح الكود سطراً بسطر
1. الحلقة الأولى (`i`, `j`): بتصفّر (`c[i][j] = 0`) كل عناصر مصفوفة الناتج `c` قبل ما نبلّش الجمع.
2. الحلقة التانية المتداخلة (`i`, `j`, `k`): بتحسب `c[i][j]` كمجموع `a[i][k] * b[k][j]` لكل قيم `k` من 0 لـ n-1 — هاد بالضبط تعريف ضرب المصفوفات رياضياً: `c[i,j] = Σ a[i,k]*b[k,j]` حيث `0 ≤ k < n`.
3. السطر الأخير: طباعة أول عنصر بالناتج للتحقق.

#### 📖 الشرح
كل عنصر `c[i][j]` مستقل تماماً عن باقي عناصر `c` — حساب `c[0][0]` ما إله أي علاقة بحساب `c[0][1]` أو `c[1][0]`. هاد بالضبط اللي بيخلينا نفكر: هل نقدر نحسب كل هالعناصر بالتوازي؟ الجواب مرتبط بالحلقة الداخلية `k`، اللي رح نحللها بالفقرة الجاية.

#### 🎯 الملخص السريع
- ثلاث حلقات متداخلة: `i`, `j` (على أبعاد المصفوفة الناتجة)، و `k` (على بعد الجمع الداخلي).
- كل `c[i][j]` مستقل عن العناصر التانية بـ `c`.

#### 📚 التطبيق
بالفقرة الجاية رح نحلل بالضبط أي حلقة من الثلاثة (`i`, `j`, `k`) ممكن نحولها لـ `forall` بأمان.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> for (int i = 0 ; i < n ; i++) for (int j = 0 ; j < n ; j++) c[i][j] = 0; for (int i = 0 ; i < n ; i++) for (int j = 0 ; j < n ; j++) for (int k = 0 ; k < n ; k++) c[i][j] += a[i][k] * b[k][j];

</details>

---

### 2.1. أي الحلقات يمكن أن تصير `forall`؟
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2", group: "2.1-2.4"} -->

#### 💡 الفكرة الأساسية
**الحلقتان `i` و `j` آمنتان للتوازي، لكن الحلقة `k` يجب أن تبقى تسلسلية لتجنّب `data race` — لأنه كل تكرارات `k` بتكتب على نفس المتغير `c[i][j]`.**
*(بعد ما شفنا الكود التسلسلي، جاي دورنا نحلل أي جزء منه آمن للتوازي.)*

---

#### 📖 الشرح
لما نحلل الحلقة `for-i` والحلقة `for-j`: كل تكرار فيهم بيكتب على خانة مختلفة تماماً من `c` (`c[i][j]` مختلفة لكل زوج `i,j`)، فما في أي تعارض — نقدر نحوّلهم لـ `forall` بأمان.

أما الحلقة `for-k`: كل تكرار فيها بيكتب على **نفس** المتغير `c[i][j]` (عبر `+=`)، يعني لو شغّلنا كل تكرارات `k` بالتوازي، ممكن يصير `data race` — خيطين يقرأو نفس قيمة `c[i][j]` قبل ما أي وحد يحدّثها، فتضيع إحدى عمليتي الجمع. لهيك، `for-k` لازم تضل حلقة تسلسلية (`forseq`).

> ⚠️ **مهم للامتحان ⚠️:** القاعدة العامة: الحلقة آمنة للتوازي إذا كل تكرار فيها بيكتب على متغير/خانة **منفصلة تماماً** عن باقي التكرارات. لو أكتر من تكرار بيكتب (أو بيقرأ+يكتب) على نفس المتغير، لازم تفكر منيح قبل ما تحوّلها لـ `forall`.

بالمحاضرة كمان بينوّه إنه في طرق أذكى تسمح بتوازي جزئي حتى بحلقة `k`، بالاعتماد على إنو الجمع (`summation`) *جبرياً تجميعي* (`associative`) حتى لو تنفيذه بالحاسوب مو تجميعي تماماً (بسبب أخطاء التقريب بالـ floating point) — بس هاد موضوع متقدم مو جزء من التركيز الأساسي هون.

#### 🎯 الملخص السريع
- `for-i` و `for-j` → آمنة للتحويل إلى `forall`.
- `for-k` → يجب أن تبقى `forseq` (تسلسلية) لتجنّب `data race`.
- القاعدة: كل تكرار يكتب على خانة مستقلة = آمن للتوازي.

#### 📚 التطبيق
رح نشوف بالفقرة الجاية كيف نطبق هالتحليل فعلياً بالكود، أول مرة باستخدام `finish` و `async` اليدويين.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفكرو إنه أي حلقة `for` جوا الكود ممكن تتحول لـ `forall` تلقائياً طالما هي "حلقة عد بسيطة"، بدون ما يفحصو شو بيصير جوا جسم الحلقة.

#### الفهم الصحيح ✅:
لازم تفحص: هل جسم الحلقة بيكتب على متغير/خانة مشتركة بين التكرارات؟ إذا نعم (متل `c[i][j] += ...` بحلقة `k`)، ما تقدر تحولها لـ `forall` مباشرة بدون معالجة إضافية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Which of the for-i, for-j and for-k loops can be converted to forall loops, i.e., can be executed in parallel? Upon a close inspection, we can see that it is safe to convert for-i and for-j into forall loops, but for-k must remain a sequential loop to avoid data races. There are some trickier ways to also exploit parallelism in the for-k loop, but they rely on the observation that summation is algebraically associative even though it is computationally non-associative.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل النقاط الثلاث بالنص الأصلي.

</details>

---

### 2.2. التوازي اليدوي باستخدام `finish` و `async`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1", group: "2.1-2.4"} -->

#### 💡 الفكرة الأساسية
**نقدر نحول `for-i` و `for-j` لمهام متوازية يدوياً بلف كل تكرار بـ `async` جوا `finish`، بس هيك بيصير الكود طويل ومو واضح.**
*(بعد ما عرفنا إنه `i` و `j` آمنتان، جاي نشوف أول طريقة لتفعيل هالتوازي فعلياً.)*

---

#### 💻 الكود
```java
// Parallel version using finish & async
finish(() -> {
    for (int ii = 0; ii < n; ii++)
        for (int jj = 0; jj < n; jj++) {
            final int i = ii; final int j = jj;
            async(() -> { c[i][j] = 0; });
        }
});

finish(() -> {
    for (int ii = 0; ii < n; ii++)
        for (int jj = 0; jj < n; jj++) {
            final int i = ii; final int j = jj;
            async(() -> {
                for (int k = 0; k < n; k++)
                    c[i][j] += a[i][k] * b[k][j];
            });
        }
});

// Print first element of output matrix
println(c[0][0]);
```

#### شرح الكود سطراً بسطر
1. `finish(() -> {...})`: بينتظر لحد ما كل المهام (`async`) الجوّا تخلص قبل ما يكمل التنفيذ بعده.
2. الحلقتان `ii`, `jj`: بتمشيان تسلسلياً على كل قيم `i` و `j`، بس **ما بتنفّذان الجسم مباشرة** — بس بتنشئان مهمة (`async`) لكل تركيبة `(i,j)`.
3. `final int i = ii; final int j = jj;`: لازم ننسخ المتغيرات لمتغيرات `final` لأنه الـ lambda جوا `async` بتحتاج تلتقط قيم ثابتة (`effectively final`) بلغة Java، مو متغير حلقة بيتغير.
4. `async(() -> { c[i][j] = 0; })`: هاي المهمة الفعلية اللي بتشتغل بالتوازي — تصفير خانة وحدة من `c`.
5. الـ `finish` الثاني: نفس الفكرة بس هالمرة الجسم فيه حلقة `k` **تسلسلية** (`for (int k...)`) جوا كل `async` — لأنه زي ما حكينا، `k` لازم تضل تسلسلية.

#### 📖 الشرح
لاحظ إنه فيه `finish` **منفصل** لكل مرحلة (تصفير المصفوفة، ثم الضرب الفعلي). هاد لأنه لازم نضمن إنه كل عمليات التصفير خلصت *قبل* ما نبلّش الجمع — لو دمجنا الاتنين بنفس `finish` بدون ترتيب صحيح، ممكن يصير `data race` بين خيط عم يصفّر وخيط تاني عم يجمع بنفس الخانة.

#### 🎯 الملخص السريع
- `finish` + `async` بيقدرو يعملو نفس الشي متل `forall`، بس يدوياً.
- لازم `final` copies للمتغيرات المستخدمة جوا `async`.
- لازم نفصل المراحل (تصفير، ثم جمع) بـ `finish` منفصلة لضمان الترتيب الصحيح.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف الملاحظات على هالأسلوب، ولماذا `forall` أنظف منه.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> finish(() -> { for (int ii = 0 ; ii < n ; ii++) for (int jj = 0 ; jj < n ; jj++) { final int i = ii; final int j = jj; async(() -> {c[i][j] = 0; }); } }); finish(() -> { for (int ii = 0 ; ii < n ; ii++) for (int jj = 0 ; jj < n ; jj++){ final int i = ii; final int j = jj; async(() -> { for (int k = 0 ; k < n ; k++) c[i][j] += a[i][k] * b[k][j]; }); } });

</details>

---

### 2.3. ملاحظات على أسلوب `finish`-`for`-`async`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2", group: "2.1-2.4"} -->

#### 💡 الفكرة الأساسية
**`finish` و `async` أدوات عامة، مو مصممة خصيصاً للحلقات — فمن أول نظرة سريعة صعب تعرف أي حلقة متوازية وأي حلقة تسلسلية.**
*(بعد ما كتبنا النسخة اليدوية، جاي نحلل مشاكلها.)*

---

#### 📖 الشرح
أول مشكلة: `finish` و `async` هني تراكيب عامة (`general constructs`) — ما بيقولولك "هاي حلقة متوازية"، لازم تقرأ كل سطر لتفهم شو صاير. هاد بيخلي الكود أصعب بالقراءة.

ثاني ملاحظة مهمة: الحلقات بالنسخة التسلسلية الأصلية كانت "متداخلة تماماً" (`perfectly nested`) — يعني ما في أي سطر كود بين `for(i=...)` و `for(j=...)`. هاي خاصية مهمة لأنه بتخلي تحويل الحلقتين المتداخلتين لحلقة `forall` واحدة متعددة الأبعاد أسهل (رح نشوفها بالفقرة الجاية).

ثالث ملاحظة: ترتيب الحلقات المتداخلة جوا `finish`-`async` (أيهم الخارجية وأيهم الداخلية بين `i` و `j`) **اعتباطي تماماً** — لأنهم أصلاً حلقات متوازية، وتكراراتهم ممكن تتنفذ بأي ترتيب.

#### 🎯 الملخص السريع
- `finish`/`async` عامة → صعب تمييز الحلقات المتوازية بنظرة سريعة.
- الحلقات المتداخلة تماماً (`perfectly nested`) سهّلت التحويل لـ `forall` لاحقاً.
- ترتيب الحلقات المتوازية اعتباطي.

#### 📚 التطبيق
هاي الملاحظات بالضبط هي الدافع وراء تصميم `forall` — أداة مخصّصة تحل هالمشاكل، رح نشوفها بالفقرة الجاية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> finish and async are general constructs, and are not specific to loops. Not easy to discern from a quick glance which loops are sequential vs. parallel. Loops in sequential version of matrix multiplication are "perfectly nested" e.g., no intervening statement between "for(i = ...)" and "for(j = ...)". The ordering of loops nested between finish and async is arbitrary. They are parallel loops and their iterations can be executed in any order.

</details>

---

### 2.4. النسخة النظيفة باستخدام `forall`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.3", group: "2.1-2.4"} -->

#### 💡 الفكرة الأساسية
**`forall` بتجمع تركيبة `finish` + `for` المتداخلة + `async` بأداة واحدة، وبتقبل حلقتين متداخلتين (`i, j`) بمساحة تكرار واحدة ثنائية الأبعاد.**
*(بعد ما شفنا مشاكل الأسلوب اليدوي، هاي الحل الأنظف.)*

---

#### 💻 الكود
```java
// Parallel version using forall
forall(0, n-1, 0, n-1, (i, j) -> {
    c[i][j] = 0;
});

forall(0, n-1, 0, n-1, (i, j) -> {
    forseq(0, n-1, (k) -> {
        c[i][j] += a[i][k] * b[k][j];
    });
});

// Print first element of output matrix
println(c[0][0]);
```

#### شرح الكود سطراً بسطر
1. `forall(0, n-1, 0, n-1, (i, j) -> {...})`: حلقة متوازية ثنائية الأبعاد — `i` من 0 لـ n-1، و `j` من 0 لـ n-1، بمساحة تكرار واحدة (بدل حلقتين منفصلتين متداخلتين).
2. `c[i][j] = 0;`: نفس عملية التصفير، بس هلأ بشكل مباشر وواضح — مافي حاجة لـ `final` copies يدوياً.
3. `forall` الثاني: نفس المساحة الثنائية، بس جسمها هالمرة فيه `forseq` داخلية على `k` — تسلسلية بالكامل، بالضبط متل ما حددنا بالتحليل.
4. `forseq(0, n-1, (k) -> {...})`: نسخة تسلسلية من نفس صياغة `forall`، بتنفّذ الجسم بالترتيب العادي (`for (k=0;k<n;k++)`).

#### 📖 الشرح
لاحظ كيف الكود صار أقصر وأوضح بكتير مقارنة بالنسخة اليدوية بـ `finish`/`async`: `forall` بتخبرك مباشرة "هاي حلقة متوازية"، و `forseq` بتخبرك "هاي حلقة تسلسلية" — بدون حاجة نقرأ كل التفاصيل الداخلية لنفهم شو متوازي وشو لأ.

#### 🎯 الملخص السريع
- `forall` = بديل نظيف لـ `finish` + `for` المتداخلة + `async`.
- تقدر تدمج حلقتين متداخلتين (`i,j`) بـ `forall` واحدة متعددة الأبعاد.
- `forseq` هي نسخة التسلسل المكافئة لـ `forall` — بتسهّل التبديل بينهم.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف تفاصيل الـ APIs الرسمية لـ `forall` بمكتبة `HJlib`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
بعض الطلاب بيفتكرو إنو لازم يحطو `finish` بره الـ `forall` لضمان إنو التصفير خلص قبل الجمع، متل ما عملنا بأسلوب `async` اليدوي.

#### الفهم الصحيح ✅:
`forall` فيها `finish` **ضمني** (implicit) — يعني السطر اللي بعد `forall` ما بينفّذ إلا بعد ما تخلص كل تكرارات الـ `forall` كاملة. فما في داعي تحط `finish` زيادة، وهالضمان هو اللي بيخلي فصل عمليتي التصفير والجمع بـ `forall` منفصلتين آمن تلقائياً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> // Parallel version using forall forall(0, n-1, 0, n-1, (i, j) -> { c[i][j] = 0; }); forall(0, n-1, 0, n-1, (i, j) -> { forseq(0, n-1, (k) -> { c[i][j] += a[i][k] * b[k][j]; }); });

</details>

---

### 3. واجهات `forall` في `HJlib`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.4", group: "3.1-3.3"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (3.1 → 3.3) بتعرض التوقيعات الرسمية لدوال `forall` بمكتبة `HJlib`، وخصائصها العامة، وكيف تتعامل مع تحديث مصفوفة ثنائية الأبعاد بحالات مختلفة.

#### ⬅️ الربط مع السابق
بعد ما استخدمنا `forall` بمثال ضرب المصفوفات، هلأ منشوف التوقيعات الرسمية الكاملة (الـ overloads المختلفة) وخصائصها الدقيقة.

#### 💡 الفكرة الأساسية
**مكتبة `HJlib` فيها عدة نسخ (`overloads`) من `forall`: لبعد واحد، بعدين، تلات أبعاد، أو عبر `Iterable` عام — وكلها فيها `finish` ضمني.**

---

#### 💻 الكود
```java
static void forall(edu.rice.hj.api.HjRegion.HjRegion1D hjRegion,
                    edu.rice.hj.api.HjProcedureInt1D body)

static void forall(edu.rice.hj.api.HjRegion.HjRegion2D hjRegion,
                    edu.rice.hj.api.HjProcedureInt2D body)

static void forall(edu.rice.hj.api.HjRegion.HjRegion3D hjRegion,
                    edu.rice.hj.api.HjProcedureInt3D body)

static void forall(int s0, int e0,
                    edu.rice.hj.api.HjProcedure<java.lang.Integer> body)

static void forall(int s0, int e0, int s1, int e1,
                    edu.rice.hj.api.HjProcedureInt2D body)

static <T> void forall(java.lang.Iterable<T> iterable,
                        edu.rice.hj.api.HjProcedure<T> body)
```

#### شرح الكود سطراً بسطر
1. أول ثلاثة توقيعات: تأخذ `HjRegion` جاهزة (بُعد واحد، بُعدين، تلات أبعاد) بدل ما تحدد `s0, e0` يدوياً.
2. `forall(int s0, int e0, ...)`: النسخة الأبسط — بُعد واحد، من `s0` لـ `e0`.
3. `forall(int s0, int e0, int s1, int e1, ...)`: النسخة اللي استخدمناها بمثال المصفوفات — بُعدين بمساحة تكرار واحدة `(i,j)`.
4. `forall(Iterable<T> iterable, ...)`: نسخة عامة (`generic`) بتتعمل تكرار على أي `Iterable` مو بس على أرقام صحيحة.

#### 📖 الشرح
> ⚠️ **مهم للامتحان ⚠️:** كل نسخ `forall` فيها `finish` ضمني تلقائياً. أما `forasync` فهي **نفس** `forall` بالضبط، بس **بدون** الـ `finish` الضمني — يعني `forasync` لازم تكون هي نفسها جوا `finish` خارجي حتى تنتظرها.

نقطة مهمة تانية: قيمة `e0` هي **آخر قيمة فعلياً بتُنفّذ** (`inclusive end`)، مو `1 + end` — يعني `forall(0, n-1, ...)` بتنفّذ من `0` لـ `n-1` بالضبط (متل `for(i=0;i<n;i++)`)، مو لـ `n`.

#### 🎯 الملخص السريع
- `forall` عندها overloads لـ 1D/2D/3D/Iterable.
- كل نسخ `forall` فيها `finish` ضمني.
- `forasync` = `forall` بدون `finish` ضمني.
- `e0` = آخر قيمة تُنفّذ فعلياً، مو `1+end`.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف كيف تتغير القدرة على استخدام `forall` أو `forseq` حسب نمط الاعتماد (`dependency`) بين عناصر مصفوفة ثنائية الأبعاد.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> static void forall(edu.rice.hj.api.HjRegion.HjRegion1D hjRegion, edu.rice.hj.api.HjProcedureInt1D body) ... static void forall(int s0, int e0, edu.rice.hj.api.HjProcedure<java.lang.Integer> body) static void forall(int s0, int e0, int s1, int e1, edu.rice.hj.api.HjProcedureInt2D body) static <T> void forall(java.lang.Iterable<T> iterable, edu.rice.hj.api.HjProcedure<T> body) NOTE: all forall API's include an implicit finish. forasync is like forall, but without the finish. Also e0 is the "end" value, not 1 + end value.

</details>

---

### 3.1. خصائص عامة لنسخة `forall`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3", group: "3.1-3.3"} -->

#### 💡 الفكرة الأساسية
**متغير التكرار بـ `forall` هو `HjPoint` (نقطة عدد صحيح متعدد الأبعاد)، وحدود التكرار ممكن تكون `HjRegion` مستطيلة، وموجود `forseq` مكافئة للتنقل السهل بين متوازي وتسلسلي.**
*(وبعد ما شفنا التوقيعات، جاي دورنا نفهم الخصائص العامة اللي بتربطهم ببعض.)*

---

#### 📖 الشرح
- تركيبة `finish`-`for`-`for`-`async` المتداخلة تماماً بتنستبدل بأداة واحدة اسمها `forall`.
- تقدر تدمج عدة حلقات بـ `forall` واحدة بمساحة تكرار متعددة الأبعاد (1D, 2D, 3D...).
- متغير التكرار لـ `forall` هو `HjPoint` — يعني `(i,j)` هي نقطة ثنائية الأبعاد (`2-dimensional point`)، مو زوج متغيرات منفصلين.
- حدود التكرار ممكن تُحدد كـ `HjRegion` مستطيلة (حاصل ضرب مجالات كل بُعد)، مثلاً `(0:n-1) x (0:n-1)`.
- توفر `HJlib` كمان `forseq` — نسخة تسلسلية بنفس صيغة `forall` بالضبط، بتسهّل التبديل السريع من متوازي لتسلسلي (والعكس) بدون تغيير هيكل الكود.

#### 🎯 الملخص السريع
- متغير تكرار `forall` = `HjPoint`.
- الحدود ممكن تكون `HjRegion` (منطقة مستطيلة).
- `forseq` مطابقة لـ `forall` بس تسلسلية.

#### 📚 التطبيق
لاحقاً بالمحاضرة، `forseq` رح تظهر بكثرة داخل `forall` بمثال ضرب المصفوفات والمتوسط المتكرر.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> The combination of perfectly nested finish-for–for–async constructs is replaced by a single API, forall. forall includes an implicit finish. Multiple loops can be collapsed into a single forall with a multi-dimensional iteration space (can be 1D, 2D, 3D, ...). The iteration variable for a forall is a HjPoint (integer tuple), e.g., (i,j) is a 2-dimensional point. The loop bounds can be specified as a rectangular HjRegion (product of dimension ranges), e.g., (0:n−1) x (0:n−1). HJlib also provides a sequential forseq API that can also be used to iterate sequentially over a rectangular region. Simplifies conversion between forseq and forall.

</details>

---

### 3.2. تحديث مصفوفة ثنائية الأبعاد: ثلاث حالات اعتماد
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1", group: "3.1-3.3"} -->

#### 💡 الفكرة الأساسية
**حسب اتجاه الاعتماد بين عناصر المصفوفة (`A[i][j-1]` أو `A[i-1][j]`)، بتقرر أي حلقة (`i` أو `j`) تقدر تكون `forall` وأيهم لازم تضل `forseq`.**
*(بعد ما فهمنا خصائص forall العامة، هلأ مثال عملي على تطبيق نفس منطق تحليل التوازي من الفقرة 2.1.)*

---

#### 💻 الكود
```java
// Case 1: loops i,j can run in parallel
forall(0, m-1, 0, n-1, (i, j) -> { A[i][j] = F(A[i][j]); });

// Case 2: only loop i can run in parallel
forall(0, m-1, (i) -> {
    forseq(0, n-1, (j) -> { // Equivalent to "for (j=0;j<n;j++)"
        A[i][j] = F(A[i][j-1]);
    });
});

// Case 3: only loop j can run in parallel
forseq(0, m-1, (i) -> { // Equivalent to "for (i=0;i<m;i++)"
    forall(0, n-1, (j) -> {
        A[i][j] = F(A[i-1][j]);
    });
});
```

#### شرح الكود سطراً بسطر
1. **الحالة 1:** `A[i][j] = F(A[i][j])` — كل خانة بتعتمد بس على نفسها القديمة، ما في اعتماد بين خانات مختلفة → `i` و `j` كلاهما آمنتان للتوازي.
2. **الحالة 2:** `A[i][j] = F(A[i][j-1])` — كل خانة بتعتمد على الخانة **اليسرى** بنفس الصف (`j-1`) — يعني لازم تحسب أعمدة كل صف بالترتيب (`forseq` على `j`)، بس الصفوف (`i`) نفسها مستقلة عن بعض → `forall` على `i`، و `forseq` على `j` (جوّاها).
3. **الحالة 3:** `A[i][j] = F(A[i-1][j])` — عكس الحالة 2: كل خانة بتعتمد على الصف اللي فوقها (`i-1`)، فلازم نحسب الصفوف بالترتيب (`forseq` على `i` بره)، لكن كل عمود (`j`) جوا الصف مستقل → `forall` على `j` (جوّا)، و `forseq` على `i` (بره).

#### 📖 الشرح
هالمثال بيطبّق بالضبط نفس منطق الفقرة 2.1 (تحليل ضرب المصفوفات): اسأل نفسك دايماً "هل جسم الحلقة بيعتمد على نتيجة تكرار سابق من نفس الحلقة؟" — لو الجواب لأ، خليها `forall`، ولو نعم لازم تضل `forseq`.

> 🤔 **تفعيل الفهم:** لو كانت الصيغة `A[i][j] = F(A[i-1][j-1])` (اعتماد قطري)، هل تقدر أي من `i` أو `j` تكون `forall` بمفردها؟ (جاوب قبل ما تكمل: الجواب لأ — كلا البعدين فيهم اعتماد تسلسلي، فما في حل بسيط بدون تقنيات متقدمة.)

#### 🎯 الملخص السريع
- اعتماد على نفس الخانة القديمة فقط → كلا البعدين `forall`.
- اعتماد أفقي (`j-1`) → `i` خارجية `forall`، `j` داخلية `forseq`.
- اعتماد عمودي (`i-1`) → `i` خارجية `forseq`، `j` داخلية `forall`.

#### 📚 التطبيق
هالنمط بالضبط رح نشوفه تطبيقياً بمثال `Iterative Averaging` لاحقاً بالمحاضرة، وين الاعتماد بيكون على القيم القديمة بمصفوفة منفصلة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> // Case 1: loops i,j can run in parallel forall(0, m-1, 0, n-1, (i, j) -> { A[i][j] = F(A[i][j]);}); // Case 2: only loop i can run in parallel forall(0, m-1, (i) -> { forseq(0, n-1, (j) -> { // Equivalent to "for (j=0;j<n;j++)" A[i][j] = F(A[i][j-1]) ; }); }); // Case 3: only loop j can run in parallel forseq(0, m-1, (i) -> { // Equivalent to "for (i=0;i<m;i++)" forall(0, n-1, (j) -> { A[i][j] = F(A[i-1][j]) ; }); });

</details>

---

### 3.3. توازي الحلقات باستخدام `Streams`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.2", group: "3.1-3.3"} -->

#### 💡 الفكرة الأساسية
**`Java Streams` طريقة أنيقة أخرى لكتابة حلقات متوازية، بس هي مناسبة بس لما يكون عندك مصفوفة ناتج وحدة فقط — لهيك المحاضرة رح تستمر باستخدام `forall` كصيغة أعم.**
*(هاد أسلوب بديل عن `forall`، جاي نقارن بينهم بسرعة.)*

---

#### 💻 الكود
```java
a = IntStream.rangeClosed(0, N-1).parallel().toArray(i -> b[i] + c[i]);
```

#### شرح الكود سطراً بسطر
1. `IntStream.rangeClosed(0, N-1)`: بينشئ سلسلة أرقام صحيحة من 0 لـ N-1 (شامل الطرفين).
2. `.parallel()`: بيحوّل السلسلة لتنفيذ متوازي.
3. `.toArray(i -> b[i] + c[i])`: بيحسب لكل `i` القيمة `b[i]+c[i]` ويخزنها بمصفوفة ناتج جديدة `a`.

#### 📖 الشرح
`Streams` مريحة كتير كتعبير مختصر لحلقة متوازية بتنتج **مصفوفة ناتج واحدة فقط**. لكن لما يكون عندك حسابات علمية بتحدّث أو تنشئ **أكتر من مصفوفة ناتج بنفس الوقت** (متل ضرب المصفوفات اللي عندها `c` بس محسوبة من `a` و `b` بخطوات متعددة، أو أمثلة لاحقة بتحدّث مصفوفتين)، صيغة `forall` أكتر مرونة ووضوحاً. لهيك، بقية المحاضرة (وبقية الدورة) رح تعتمد `forall` كصيغة موحدة للحلقات المتوازية.

#### 🎯 الملخص السريع
- `Streams.parallel()` مناسبة لمصفوفة ناتج وحدة.
- `forall` أعم وأنسب للحسابات العلمية متعددة المخرجات.
- المحاضرة رح تستمر بـ `forall` كصيغة موحدة.

#### 📚 التطبيق
من هون فصاعداً، كل الأمثلة (Barrier، Iterative Averaging، Chunking) رح تستخدم `forall` حصراً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Java streams can be an elegant way of specifying parallel loop computations that produce a single output array, e.g., by rewriting the vector addition statement as follows: a = IntStream.rangeClosed(0, N-1).parallel().toArray(i -> b[i] + c[i]); streams are a convenient notation for parallel loops with at most one output array, but the forall notation is more convenient for loops that create/update multiple output arrays, as is the case in many scientific computations. For generality, we will use the forall notation for parallel loops in the remainder of this module.

</details>

---

### 4. مزامنة الحواجز: مثال Hello-Goodbye
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.3", group: "4.1-4.5"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (4.1 → 4.5) بتشرح أهم أداة تزامن جديدة بهالمحاضرة: الحاجز (`Barrier`) — يعني كيف نخلي كل تكرارات `forall` تنتظر بعضها عند نقطة معينة، عبر `forallPhased` و `next()`.

#### ⬅️ الربط مع السابق
لحد هلأ، كل تكرارات `forall` كانت مستقلة تماماً عن بعض. هلأ رح نشوف حالة لازم فيها التكرارات "تتفق" على ترتيب معين — كل واحد لازم يخلص مرحلة قبل ما أي واحد يبلّش المرحلة اللي بعدها.

#### 💡 الفكرة الأساسية
**بـ `forall` عادية، تكرارات "Hello" و "Goodbye" بتطلع بأي ترتيب اعتباطي، وما في ضمانة إنه كل الـ "Hello" بتطبع قبل أي "Goodbye".**

---

#### 💻 الكود
```java
forall(0, m - 1, (i) -> {
    int sq = i * i;
    System.out.println("Hello from task with square = " + sq);
    System.out.println("Goodbye from task with square = " + sq);
});
```

#### شرح الكود سطراً بسطر
1. `forall(0, m-1, (i) -> {...})`: `m` تكرارات متوازية.
2. `int sq = i*i;`: كل تكرار بيحسب متغير محلي خاص فيه.
3. طباعتان متتاليتان: "Hello" ثم "Goodbye" — بس بما إنهم جوا نفس التكرار الواحد، ترتيبهم *داخل نفس التكرار* مضمون (Hello قبل Goodbye لنفس القيمة)، لكن ما في ضمانة على الترتيب *بين تكرارات مختلفة*.

#### 📖 الشرح
الناتج التوضيحي (لـ `m=4`) بيظهر إنه ممكن تطلع "Goodbye from square=0" *قبل* "Hello from square=4" — يعني التكرارات مو منظمة بمراحل واضحة، كل وحدة عم تركض لحالها بأسرع ما تقدر.

#### 🎯 الملخص السريع
- كل تكرار `forall` مستقل تماماً ومالوش علاقة بترتيب التكرارات التانية.
- الطباعتان جوا نفس التكرار مرتبتان، بس مقارنة بتكرارات تانية — عشوائي.

#### 📚 التطبيق
السؤال المطروح بالمحاضرة: كيف نضمن إنه **كل** الـ Hello تطبع قبل **أي** Goodbye؟ رح نشوف 3 مقاربات بالفقرات الجاية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> forall (0, m - 1, (i) -> { int sq = i*i; // NOTE: video used lookup(i) instead System.out.println("Hello from task with square = " + sq); System.out.println("Goodbye from task with square = " + sq); }); Sample output for m = 4: Hello from task with square = 0 Hello from task with square = 1 Goodbye from task with square = 0 Hello from task with square = 4 Goodbye from task with square = 4 Goodbye from task with square = 1 Hello from task with square = 9 Goodbye from task with square = 9

</details>

---

### 4.1. المحاولة الأولى والثانية: `forall` مزدوجة (ولماذا تفشلان)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4", group: "4.1-4.5"} -->

#### 💡 الفكرة الأساسية
**استبدال `forall` واحدة بـ `forall` منفصلتين (وحدة للـ Hello ووحدة للـ Goodbye) بيحل مشكلة الترتيب، بس بيخلق مشكلة تانية: كيف نوصّل قيمة `sq` المحلية من الـ `forall` الأولى للثانية؟**
*(وبعد ما شفنا المشكلة، جاي نجرب أول حلين قبل الحل النهائي.)*

---

#### 💻 الكود
```java
// APPROACH 1 (has a problem)
forall(0, m - 1, (i) -> {
    int sq = i * i;
    System.out.println("Hello from task with square = " + sq);
});
forall(0, m - 1, (i) -> {
    System.out.println("Goodbye from task with square = " + sq); // sq غير مرئية هون!
});

// APPROACH 2 (correct, لكن يحتاج مصفوفة إضافية)
int[] sq = new int[m];
forall(0, m - 1, (i) -> {
    sq[i] = i * i;
    System.out.println("Hello from task with square = " + sq[i]);
});
forall(0, m - 1, (i) -> {
    System.out.println("Goodbye from task with square = " + sq[i]);
});
```

#### شرح الكود سطراً بسطر
1. **المحاولة 1:** بما إنه `forall` الأولى بتنتظر (بسبب الـ `finish` الضمني) قبل ما تبلّش الثانية، فمضمون كل الـ Hello قبل أي Goodbye — بس المشكلة: `sq` متغير محلي (`local`) داخل الـ `forall` الأولى، مش مرئي بالـ `forall` الثانية.
2. **المحاولة 2:** الحل — نستبدل المتغير المحلي بمصفوفة `sq[]` مشتركة خارج الـ `forall`، وكل تكرار بيخزّن قيمته بخانته الخاصة `sq[i]`، والـ `forall` الثانية بتقرأها من نفس المصفوفة.

#### 📖 الشرح
لاحظ إنه الـ `finish` الضمني بـ `forall` هو اللي بيضمن أصلاً إنه كل الـ "Hello" خلصت قبل ما تبلّش أي "Goodbye" — لأنه الـ `forall` الثانية ما بتبلّش إلا بعد ما تخلص الأولى بالكامل. هاد حل صحيح، بس عيبه إنه محتاج نغيّر طريقة تخزين البيانات (نستخدم مصفوفة بدل متغير محلي)، وهاد مو دايماً مريح أو ممكن.

#### 🎯 الملخص السريع
- استخدام `forall` منفصلتين بيحل ترتيب Hello/Goodbye تلقائياً (بفضل الـ `finish` الضمني).
- المشكلة: متغيرات محلية بالـ `forall` الأولى ما بتوصل للثانية.
- الحل المؤقت: تخزين بمصفوفة مشتركة — لكنه يغيّر بنية الكود.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف حل أفضل: `forallPhased` مع `next()` — بيحافظ على المتغير المحلي زي ما هو، بدون حاجة لمصفوفة إضافية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Approach 1: Replace the forall loop by two forall loops, one for the hello's and one for the goodbye's — Problem: Need to communicate local sq values from first forall to the second. Approach 2: Replace the forall loop by two forall loops, one for the hello's and one for the goodbye's — What's the problem here?

</details>

---

### 4.2. الحل النهائي: `forallPhased` و `next()`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1", group: "4.1-4.5"} -->

#### 💡 الفكرة الأساسية
**`forallPhased` مع استدعاء `next()` بينشئ "حاجز" (`Barrier`) بين مرحلتين — كل تكرار بينتظر لحد ما كل التكرارات التانية توصل لنفس نقطة `next()` قبل ما يكمل، مع الحفاظ على المتغيرات المحلية زي ما هي.**
*(هاد الحل الثالث والنهائي اللي بيحل المشكلة بدون تغيير بنية البيانات.)*

---

#### 💻 الكود
```java
// APPROACH 3
forallPhased(0, m - 1, (i) -> {
    int sq = i * i;
    System.out.println("Hello from task with square = " + sq);
    next(); // Barrier
    System.out.println("Goodbye from task with square = " + sq);
});
```

#### شرح الكود سطراً بسطر
1. `forallPhased(0, m-1, (i) -> {...})`: نسخة خاصة من `forall` بتسمح باستدعاء `next()` جوّاها لتقسيم التنفيذ لمراحل (`phases`).
2. `int sq = i*i;` و طباعة "Hello": هاد كود **المرحلة 0** (`Phase 0`).
3. `next();`: هون الحاجز — كل تكرار بيوصل لهون بيتوقف وينتظر باقي التكرارات توصل لنفس النقطة.
4. طباعة "Goodbye": هاد كود **المرحلة 1** (`Phase 1`) — ما بتنفّذ لأي تكرار إلا بعد ما **كل** التكرارات تخلص المرحلة 0 وتوصل لـ `next()`.

#### 📖 الشرح
الفكرة الجوهرية: `next()` بتقسّم جسم الـ `forallPhased` لمراحل متتالية — كل سطر قبل `next()` مرحلة، وكل سطر بعدها مرحلة تانية. والحاجز بيضمن إنه **ما حدا** بيبلّش المرحلة التالية قبل ما **الكل** يخلص المرحلة الحالية. هيك حلينا المشكلة بالضبط زي ما كانت (متغير محلي `sq`)، بس ضمنّا الترتيب بين المراحل.

> 💡 **التشبيه:** فكّر بسباق ركض جماعي بمراحل: كل عدّاء (تكرار) لازم يوصل لخط معين (الحاجز) وينتظر باقي العدّائين، وبعدين الكل يبلّش المرحلة التالية سوا — حتى لو بعض العدّائين أسرع من غيرهم.

#### 🎯 الملخص السريع
- `forallPhased` = `forall` + إمكانية استخدام `next()`.
- `next()` = حاجز (`Barrier`) بين مرحلتين.
- كل تكرارات المرحلة الحالية لازم تخلص قبل ما أي تكرار يبلّش المرحلة التالية.
- المتغيرات المحلية بتضل زي ما هي (ما في حاجة لمصفوفة إضافية).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
بعض الطلاب بيحاولو يستخدمو `next()` جوا `forall` عادية (مو `forallPhased`)، بافتراض إنهم نفس الشي.

#### الفهم الصحيح ✅:
`next()` **مسموح استخدامها فقط جوا `forallPhased`**، مو جوا `forall` العادية. لو حاولت تستخدمها جوا `forall` عادية، هاد استخدام غير صحيح للـ API.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف تأثير هالحاجز على جدولة التنفيذ (`scheduling`) فعلياً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Approach 3: insert a "barrier" ("next" statement) between the hello's and goodbye's. next -> each forallPhased iteration waits at barrier until all iterations arrive (previous phase is completed), after which the next phase can start. Scope of next is the closest enclosing forallPhased statement. If a forallPhased iteration terminates before executing "next", then the other iterations don't wait for it.

</details>

---

### 4.3. تأثير الحاجز على جدولة التنفيذ
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.2", group: "4.1-4.5"} -->

#### 💡 الفكرة الأساسية
**عملية `next()` تتكوّن من إشارة (`SIG`) + انتظار (`WAIT`) — كل تكرار بيرسل إشارة "وصلت" وبعدين ينتظر لحد ما يستلم إشارات من الباقي، وهالانتظار ممكن يخلق فترات خمول (`idle`) للتكرارات الأسرع.**
*(هاد توضيح بصري لما بيصير فعلياً وقت `next()`.)*

---

#### 📊 المخطط

| رقم العقدة | الوصف |
| --- | --- |
| A1 (i=0) | تكرار forallPhased الأول |
| A2 (i=1) | تكرار forallPhased الثاني |
| A3 (i=2) | تكرار forallPhased الثالث |
| A4 (i=3) | تكرار forallPhased الرابع |
| next | نقطة الحاجز المشتركة (تجمع كل التكرارات) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| A1, A2, A3, A4 | next | `signal edges` (كل تكرار يرسل إشارة وصول) |
| next | A1, A2, A3, A4 | `wait edges` (كل تكرار ينتظر إذن المتابعة) |

```flowchart
[Phase 0: A1, A2, A3, A4 executing] --> [each sends SIG on reaching next()]
[SIG from A1, A2, A3, A4] --> [next barrier]
[next barrier] --> [WAIT: barrier releases all iterations together]
[WAIT release] --> [Phase 1: A1, A2, A3, A4 resume execution]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: كل تكرار (`A1` لـ `A4`) بيشتغل بالمرحلة 0 بسرعته الخاصة. أول ما يخلص، بيرسل إشارة (`SIG`) للحاجز `next` ويدخل بحالة انتظار (`idle`). لما **كل** التكرارات الأربعة ترسل إشارتها، الحاجز بيحرر (`WAIT` تنتهي) كل التكرارات سوا لتبلّش المرحلة 1. لاحظ من الرسم إنه بعض التكرارات (متل `i=0` و `i=3`) وصلت أسرع وانتظرت فترة `idle` أطول قبل ما التكرار الأبطأ يوصل.

بالنمذجة الرسمية (`Computation Graph`)، عملية `next()` بتترجم لحواف إشارة (`signal edges`) من كل تكرار للحاجز، وحواف انتظار (`wait edges`) من الحاجز لكل تكرار — يعني الحاجز عملياً نقطة تلاقي (`synchronization point`) لكل التكرارات.

#### 🎯 الملخص السريع
- `next() = SIG + WAIT`.
- التكرار الأسرع بينتظر (`idle`) لحد ما الأبطأ يوصل.
- بالـ `Computation Graph`: حواف إشارة من كل تكرار للحاجز، وحواف انتظار من الحاجز لكل تكرار.

#### 📚 التطبيق
هالفهم مهم لتحليل الأداء لاحقاً — كتر الحواجز بيزيد فترات الانتظار لو التكرارات مو متوازنة بالحمل.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Four forallPhased iterations, each with a next() barrier. next() operation is modeled in the Computation Graph using signal and wait edges. next() = SIG + WAIT.

</details>

---

### 4.4. واجهات `forallPhased` ونطاق `next()`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.3", group: "4.1-4.5"} -->

#### 💡 الفكرة الأساسية
**نطاق (`scope`) استدعاء `next()` هو أقرب `forallPhased` محيطة به — يعني `forallPhased` متداخلة بتخلق حواجز منفصلة، كل وحدة بتزامن فقط تكرارات نفس المستوى.**
*(بعد ما فهمنا الآلية، هلأ نشوف التوقيع الرسمي والقاعدة الدقيقة لنطاق next.)*

---

#### 💻 الكود
```java
static void forallPhased(int s0, int e0,
                          edu.rice.hj.api.HjProcedure<java.lang.Integer> body)

static <T> void forallPhased(java.lang.Iterable<T> iterable,
                              edu.rice.hj.api.HjProcedure<T> body)

static void next()
```

```java
// مثال: forallPhased متداخلة، وحاجزان منفصلان
forallPhased(0, m - 1, (i) -> {
    println("Starting forall iteration " + i);
    next(); // Acts as barrier for forallPhased-i
    forallPhased(0, n - 1, (j) -> {
        println("Hello from task (" + i + "," + j + ")");
        next(); // Acts as barrier for forallPhased-j
        println("Goodbye from task (" + i + "," + j + ")");
    }); // forallPhased-j
    next(); // Acts as barrier for forallPhased-i
    println("Ending forallPhased iteration " + i);
}); // forallPhased-i
```

#### شرح الكود سطراً بسطر
1. توقيعا `forallPhased` الأساسيان: بُعد واحد (`s0, e0`) أو عبر `Iterable`، بالإضافة لدالة `next()` بدون معاملات.
2. المثال المتداخل: أول `next()` (بعد "Starting") بيزامن تكرارات `forallPhased-i` الخارجية فقط.
3. `forallPhased(0, n-1, (j) -> {...})`: حاجز **جديد ومستقل** خاص بالحلقة الداخلية `j` — استدعاء `next()` جوّاه (بعد "Hello") بيزامن تكرارات `j` بس، مش تكرارات `i` الخارجية.
4. `next()` الأخير قبل "Ending": بيرجع يزامن تكرارات `forallPhased-i` الخارجية، بعد ما خلصت الحلقة الداخلية بالكامل.

#### 📖 الشرح
القاعدة الذهبية: نطاق `next()` = أقرب `forallPhased` محيطة بيها مباشرة (`closest enclosing forallPhased statement`). لو عندك `forallPhased` متداخلة، كل مستوى إله حاجز منفصل تماماً — الحاجز الداخلي ما بيأثر ولا بيتأثر بالحاجز الخارجي.

> ⚠️ **نقطة مهمة ⚠️:** كل نسخ `forallPhased` فيها `finish` ضمني بالنهاية (تماماً متل `forall` العادية)، واستدعاءات `next()` مسموحة فقط جوا `forallPhased()`، مش جوا `forall()` العادية.

#### 🎯 الملخص السريع
- `forallPhased` لها overloads مشابهة لـ `forall` (بُعد واحد أو `Iterable`).
- `next()` نطاقها = أقرب `forallPhased` محيطة.
- `forallPhased` متداخلة = حواجز مستقلة لكل مستوى.
- `forallPhased` فيها `finish` ضمني بالنهاية زي `forall`.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف حالة خاصة: شو بيصير لو تكرار انتهى بدون ما يستدعي `next()`؟

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> static void forallPhased(int s0, int e0, edu.rice.hj.api.HjProcedure<java.lang.Integer> body) static <T> void forallPhased(java.lang.Iterable<T> iterable, edu.rice.hj.api.HjProcedure<T> body) static void next() NOTE: All forallPhased API's include an implicit finish at the end (just like a regular forall). Calls to next() are only permitted in forallPhased(), not in forall(). forallPhased (0, m - 1, (i) -> { println("Starting forall iteration " + i); next(); // Acts as barrier for forallPhased-i forallPhased (0, n - 1, (j) -> { println("Hello from task (" + i + "," + j + ")"); next(); // Acts as barrier for forallPhased-j println("Goodbye from task (" + i + "," + j + ")"); } // forallPhased-j next(); // Acts as barrier for forallPhased-i println("Ending forallPhased iteration " + i); }); // forallPhased-i

</details>

---

### 4.5. انتهاء التكرار المبكر ومطابقة الحواجز
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.4", group: "4.1-4.5"} -->

#### 💡 الفكرة الأساسية
**لو تكرار `forallPhased` انتهى (`terminated`) بدون ما يستدعي `next()`، باقي التكرارات ما بتنتظره — يعني عدد المراحل ممكن يختلف من تكرار لآخر.**
*(هاد آخر تفصيلة مهمة بموضوع الحواجز، وممكن تلخبط لو ما انتبهنا لها.)*

---

#### 💻 الكود
```java
forallPhased(0, m - 1, (i) -> {
    forseq(0, i, (j) -> {
        // forall iteration i is executing phase j
        System.out.println("(" + i + "," + j + ")");
        next();
    }); // forseq-j
}); // forallPhased-i
```

#### شرح الكود سطراً بسطر
1. `forallPhased(0, m-1, (i) -> {...})`: `m` تكرارات خارجية (0 لـ m-1).
2. `forseq(0, i, (j) -> {...})`: حلقة داخلية تسلسلية بعدد تكرارات مختلف لكل `i` — بالتحديد `i+1` تكرار (من `0` لـ `i`).
3. `System.out.println("(" + i + "," + j + ")")`: بيطبع زوج `(i,j)` **قبل** استدعاء `next()`.
4. `next()`: حاجز — بس بما إنه عدد تكرارات `j` مختلف باختلاف `i`، بعض التكرارات الخارجية بتخلص (وتنهي مشاركتها بالحواجز) أبكر من غيرها.

#### 📖 الشرح
لاحظ إنه التكرار `i=0` عنده تكرار داخلي واحد بس (`j=0..0`)، فبيطبع `(0,0)`، يستدعي `next()` مرة وحدة، وبعدين **ينتهي كلياً**. أما التكرار `i=1` عنده تكرارين داخليين (`j=0,1`)، فبيطبع `(1,0)`، يستدعي `next()`، يطبع `(1,1)`، يستدعي `next()` تاني، وبعدين ينتهي. وهكذا — كل تكرار `i` بينتهي بمرحلة مختلفة.

**النتيجة المهمة:** بما إنه التكرار `i=0` انتهى بعد المرحلة 0 (نداء `next()` الأول)، باقي التكرارات (`i=1..7`) ما بتنتظر التكرار `i=0` بالمراحل اللاحقة — لأنه هو أصلاً خلص وما عاد له علاقة بالحواجز الجاية. هيك، بالمرحلة الأخيرة (Phase 8)، بس التكرار `i=7` (الوحيد اللي عمره الداخلي طويل بالكفاية) بيوصلها.

#### 🎯 الملخص السريع
- تكرار `forallPhased` منتهي = ما بينتظره أحد بالمراحل الجاية.
- عدد المراحل ممكن يختلف من تكرار لآخر (زي المثال: `i+1` مرحلة للتكرار `i`).
- المرحلة الأخيرة بتضم بس التكرارات اللي عندها أطول عدد مراحل.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفكرو إنه الحاجز `next()` دايماً بينتظر **كل** التكرارات الأصلية (بغض النظر إذا انتهت أو لأ)، متل ما بيصير بحواجز أنظمة تانية بتنتظر عدد ثابت من الخيوط.

#### الفهم الصحيح ✅:
بـ `forallPhased`، الحاجز بينتظر بس التكرارات اللي **لسا عايشة** (ما انتهت بعد). التكرار اللي خلص (انتهى بدون استدعاء `next()` إضافي) بينسحب من عملية المزامنة تماماً، فباقي التكرارات ما بتنتظره.

#### 📊 المخطط
| رقم العقدة | الوصف |
| --- | --- |
| i=0..7 | تكرارات `forallPhased-i` الثمانية |
| (i,j) | مخرجات الطباعة لكل تكرار بكل مرحلة |
| next | حاجز يجمع فقط التكرارات الحيّة بكل مرحلة |
| end | نقطة انتهاء تكرار معيّن (ينسحب من الحواجز اللاحقة) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| i=0 | end (بعد Phase 0) | ينتهي بعد مرحلة وحدة فقط |
| i=1 | end (بعد Phase 1) | ينتهي بعد مرحلتين |
| i=7 | end (بعد Phase 7) | ينتهي بعد 8 مراحل (آخر واحد) |

```flowchart
[Phase 0: i=0..7 all print (i,0), call next()] --> [i=0 ends here]
[Phase 1: i=1..7 print (i,1), call next()] --> [i=1 ends here]
[Phase 2..7: remaining iterations continue, one drops out per phase] --> [Phase 8: only i=7 remains, ends]
```

#### 📚 التطبيق
هالنمط (`iteration termination` مع `next()`) مهم لفهم إنه حجم "المجموعة النشطة" بالحاجز بيتقلّص تدريجياً — نقطة أساسية لفهم أداء وتصرف `forallPhased` بحالات غير متماثلة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> forallPhased (0, m - 1, (i) -> { forseq (0, i, (j) -> { // forall iteration i is executing phase j System.out.println("(" + i + "," + j + ")"); next(); }); //forseq-j }); //forall-i. Outer forall-i loop has m iterations, 0...m-1. Inner sequential j loop has i+1 iterations, 0...i. Line 4 prints (task,phase) = (i, j) before performing a next operation. Iteration i = 0 of the forall-i loop prints (0, 0), performs a next, and then terminates. Iteration i = 1 of the forall-i loop prints (1,0), performs a next, prints (1,1), performs a next, and then terminates. And so on until iteration i=8 ends an empty Phase 8 by terminating.

</details>

---

### 4.6. "next" بنقاط مختلفة من البرنامج (حواجز غير ثابتة النطاق)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.5", group: "4.1-4.5"} -->

#### 💡 الفكرة الأساسية
**الحواجز مو `statically scoped` (نطاقها مو ثابت بموقع واحد بالكود) — تكرار عند `next()` بسطر معين ممكن يتزامن مع تكرار تاني عند `next()` بسطر مختلف تماماً، حتى لو بميثود مختلفة.**
*(هاي آخر ملاحظة مهمة بموضوع الحواجز — نقطة دقيقة بس أساسية.)*

---

#### 💻 الكود
```java
forallPhased(0, m - 1, (i) -> {
    if (i % 2 == 1) { // i is odd
        oddPhase0(i);
        next();
        oddPhase1(i);
    } else { // i is even
        evenPhase0(i);
        next();
        evenPhase1(i);
    }
});
```

#### شرح الكود سطراً بسطر
1. `forallPhased(0, m-1, (i) -> {...})`: `m` تكرارات.
2. `if (i % 2 == 1) {...}`: التكرارات الفردية بتنفّذ `oddPhase0`، `next()`، `oddPhase1`.
3. `else {...}`: التكرارات الزوجية بتنفّذ `evenPhase0`، `next()` (بسطر مختلف تماماً بالكود!)، `evenPhase1`.

#### 📖 الشرح
النقطة الحاسمة هون: عملية `next()` بسطر 4 (جوا الـ `if`، للتكرارات الفردية) **بتتزامن** مع عملية `next()` بسطر 8 (جوا الـ `else`، للتكرارات الزوجية) — رغم إنهم بسطرين مختلفين تماماً بالكود المصدري! لأنه الحاجز بيهتم بس بـ "هل كل التكرارات النشطة وصلت لأي `next()` جوا نفس الـ `forallPhased` المحيطة"، مو بموقع `next()` بالتحديد.

هاي بالضبط أحد الأسباب اللي بتخلي الحواجز (`Barriers`) أداة "أقل انضباطاً بنيوياً" (`less structured`) مقارنة بـ `finish`، `async`، و `future` — لأنه مو زي `finish` اللي نطاقه واضح ومحدد بصريًا بالكود، الحاجز ممكن "يلاقي" تكرار تاني من نقطة مختلفة كلياً.

#### 🎯 الملخص السريع
- الحواجز مو `statically scoped`.
- `next()` بمواقع مختلفة بالكود ممكن تتزامن مع بعض طالما هني جوا نفس `forallPhased`.
- هاد سبب رئيسي كون الحواجز "أقل انضباطاً" من `finish`/`async`/`future`.

#### 📚 التطبيق
هالفهم مهم عند تصميم برامج فيها فروع شرطية مختلفة (`if/else`) جوا `forallPhased` — لازم تتأكد إنه عدد استدعاءات `next()` بكل فرع متوافق بين التكرارات.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Barrier operation synchronizes odd-numbered iterations at line 4 with even-numbered iterations in line 8. One reason why barriers are "less structured" than finish, async, future.

</details>

---

### 5. مثال المتوسط المتكرر أحادي البُعد (Iterative Averaging)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.6", group: "5.1-5.2"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (5.1 → 5.2) بتقدم مثال تطبيقي متكامل يجمع بين `forall` و `forseq` بشكل متكرر (`iterative`)، ويوضّح ليش الحلقة الخارجية (على التكرارات) لازم تضل تسلسلية.

#### ⬅️ الربط مع السابق
بعد ما فهمنا `forall` و `forallPhased`، هلأ منشوف مثال عملي حقيقي كتير مستخدم بالحوسبة العلمية: حساب المتوسط المتكرر لعناصر مصفوفة.

#### 💡 الفكرة الأساسية
**بكل تكرار من `m` تكرار، كل عنصر داخلي بمصفوفة أحادية البُعد بينستبدل بمتوسط جاره الأيسر والأيمن، وبعد عدد كافٍ من التكرارات، القيم بتتقارب (`converge`) لحل معادلة توازن.**

---

#### 💻 الكود
```java
// Initialize m, n, myVal, newVal
m = ...; n = ...;
float[] myVal = new float[n + 2];
float[] myNew = new float[n + 2];
```

#### شرح الكود سطراً بسطر
1. `m`: عدد التكرارات الكلية للتقارب. `n`: عدد العناصر الداخلية بالمصفوفة (بدون الحدود).
2. `myVal`: مصفوفة القيم الحالية، بحجم `n+2` (عنصران إضافيان للحدود).
3. `myNew`: مصفوفة القيم الجديدة، بنفس الحجم — تُستخدم لتخزين نتيجة كل تكرار قبل ما تصير هي القيم "الحالية" بالتكرار الجاي.

#### 📖 الشرح
البيانات بتُهيّأ بشرط حدّي (`boundary condition`): `myVal[0] = 0` و `myVal[n+1] = 1` (ثابتان طول التنفيذ)، والعناصر الداخلية (`myVal[1]` لـ `myVal[n]`) قيم عشوائية بالبداية. الهدف: بكل تكرار، كل عنصر داخلي `myVal[i]` (لـ `i` من 1 لـ `n`) بينستبدل بمتوسط الجارين: `(myVal[i-1] + myVal[i+1]) / 2`. بعد عدد كافٍ من التكرارات، القيم بتتقارب رياضياً للمعادلة `myVal[i] = (myVal[i-1]+myVal[i+1])/2` لكل `i` من 1 لـ `n` (توزيع خطي بين 0 و 1).

**ليش عندنا مصفوفتان (`myVal` و `myNew`)؟** لأنه حساب `myNew[i]` بيعتمد على القيم **القديمة** لـ `myVal[i-1]` و `myVal[i+1]` — لو استخدمنا مصفوفة وحدة وحدّثناها مباشرة، ممكن نستخدم قيمة محدّثة حديثاً (من نفس التكرار) بدل القيمة القديمة، وهيك تنكسر صحة الحساب.

#### 🎯 الملخص السريع
- `myVal`: القيم الحالية، `myNew`: القيم الجديدة قيد الحساب.
- حدود ثابتة: `myVal[0]=0`, `myVal[n+1]=1`.
- الحاجة لمصفوفتين منفصلتين: لتفادي استخدام قيم محدّثة جزئياً أثناء نفس التكرار.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف الكود الكامل (التسلسلي أولاً، بعدين المتوازي).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Initialize a one-dimensional array of (n+2) double's with boundary conditions, myVal[0] = 0 and myVal[n+1] = 1. In each iteration, each interior element myVal[i] in 1..n is replaced by the average of its left and right neighbors. Two separate arrays are used in each iteration, one for old values and the other for the new values. After a sufficient number of iterations, we expect each element of the array to converge to myVal[i] = (myVal[i-1]+myVal[i+1])/2, for all i in 1..n

</details>

---

### 5.1. الكود التسلسلي والمتوازي للمتوسط المتكرر
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5", group: "5.1-5.2"} -->

#### 💡 الفكرة الأساسية
**الحلقة الخارجية على عدد التكرارات (`m`) لازم تضل `forseq` لأنها تسلسلية بطبيعتها (كل تكرار بيعتمد على نتيجة التكرار اللي قبله)، أما الحلقة الداخلية على عناصر المصفوفة (`n`) فآمنة تماماً للتحويل إلى `forall`.**
*(بعد ما فهمنا فكرة المصفوفتين، هلأ الكود الكامل.)*

---

#### 💻 الكود
```java
// Sequential version
forseq(0, m - 1, (iter) -> {
    // Compute MyNew as function of input array MyVal
    forseq(1, n, (j) -> { // Create n tasks
        myNew[j] = (myVal[j - 1] + myVal[j + 1]) / 2.0;
    }); // forseq
    // Swap myVal and myNew for next iteration
    float[] temp = myVal; myVal = myNew; myNew = temp;
}); // forseq

// Parallel version
forseq(0, m - 1, (iter) -> {
    forall(1, n, (j) -> { // Create n tasks
        myNew[j] = (myVal[j - 1] + myVal[j + 1]) / 2.0;
    }); // forall
    float[] temp = myVal; myVal = myNew; myNew = temp;
}); // forseq
```

#### شرح الكود سطراً بسطر
1. `forseq(0, m-1, (iter) -> {...})`: الحلقة الخارجية على عدد التكرارات — لازم تضل تسلسلية دايماً، بالنسختين التسلسلية والمتوازية.
2. الحلقة الداخلية (`forseq` بالنسخة الأولى، `forall` بالثانية) على `j` من 1 لـ `n`: بتحسب `myNew[j]` من جيران `myVal` القديمة — هاد الجزء اللي فيه `Data Parallelism` حقيقية، فآمن نحوله لـ `forall`.
3. `float[] temp = myVal; myVal = myNew; myNew = temp;`: **تبديل المؤشرات** (`pointer swap`) بين `myVal` و `myNew` — بعد ما خلصنا حساب كل القيم الجديدة، `myNew` بتصير هي "الحالية" للتكرار الجاي، و `myVal` القديمة بتصير مساحة عمل جديدة تُكتب عليها بالتكرار الجاي.

#### 📖 الشرح
**ليش الحلقة الخارجية (`iter`) لازم تضل `forseq`؟** لأنه حساب `myVal` بالتكرار رقم `iter+1` بيعتمد بشكل مباشر على نتيجة `myVal` بالتكرار `iter` (بعد التبديل) — يعني في اعتماد تسلسلي واضح بين التكرارات المتتالية، تماماً متل حالة الحلقة `k` بمثال ضرب المصفوفات.

**ليش الحلقة الداخلية (`j`) آمنة للتوازي؟** لأنه جوا نفس التكرار الواحد، حساب `myNew[j]` مستقل تماماً عن حساب `myNew[j']` لأي `j'` تاني — كلهم بيقرأو من `myVal` (القديمة، الثابتة طول هالتكرار) وبيكتبو على خانات مختلفة من `myNew`.

> 🤔 **تفعيل الفهم:** لو استبدلنا `float[] temp = myVal; myVal = myNew; myNew = temp;` بنسخ فعلي للقيم (`copy`) بدل تبديل المؤشرات، هل النتيجة النهائية بتختلف؟ (الجواب: لأ، النتيجة نفسها، بس تبديل المؤشرات أسرع بكتير لأنه ما بيحتاج ينسخ كل عناصر المصفوفة.)

#### 🎯 الملخص السريع
- الحلقة الخارجية (`iter`) → `forseq` دايماً (اعتماد تسلسلي بين التكرارات).
- الحلقة الداخلية (`j`) → آمنة كـ `forall` (Data Parallelism حقيقية).
- تبديل المؤشرات (`swap`) بدل نسخ البيانات = أداء أفضل.

#### 📚 التطبيق
بالجزء الأخير من المحاضرة، رح نشوف إنه هالحلقة الداخلية (`forall(1,n,...)`) ممكن يكون فيها مشكلة كلفة لو `n` كبير جداً — وهاد بالضبط اللي بيقودنا لموضوع الـ `Chunking`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> forseq(0, m-1, (iter) -> { // Compute MyNew as function of input array MyVal forseq(1, n, (j) -> { // Create n tasks myNew[j] = (myVal[j-1] + myVal[j+1])/2.0; }); // forseq float[] temp=myVal; myVal=myNew; myNew=temp; }); // forseq. What is the purpose of line 11? forall(1, n, (j) -> { // Create n tasks myNew[j] = (myVal[j-1] + myVal[j+1])/2.0; }); // forall

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الغرض من سطر التبديل (Line 11 بالمحاضرة)، إمكانية تحويل الحلقة الداخلية لـ `forall`.

</details>

---

### 6. كلفة إنشاء المهام والحل: `Chunking`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1", group: "6.1-6.2"} -->

#### 📍 أين نحن الآن؟
هاي آخر مجموعة بالمحاضرة (6.1 → 6.2)، وبتشرح مشكلة عملية مهمة: كلفة إنشاء المهام الكتيرة بـ `forall`، والحل عبرها تقنية `Chunking` باستخدام `forallChunked`.

#### ⬅️ الربط مع السابق
لحد هلأ افترضنا إنه إنشاء `forall` بعدد تكرارات كبير (متل `forall(1,n,...)` بمثال المتوسط المتكرر) ما إله كلفة. بالحقيقة، إنشاء مهمة (`task`/`async`) لكل تكرار منفرد إله كلفة زمنية حقيقية — وهون بيجي دور الـ `Chunking`.

#### 💡 الفكرة الأساسية
**إنشاء `forall` بعدد كبير من التكرارات، كل وحدة بشغل قليل جداً، غير فعّال — الحل: تجميع مجموعة تكرارات بمهمة واحدة (`chunk`)، فيصير عندنا عدد مهام أقل بكتير، كل وحدة بتنفّذ مجموعة تكرارات تسلسلياً بداخلها.**

---

#### 💻 الكود
```java
// بدل هذا (100 مهمة منفصلة)
forall(0, 99, (i) -> BODY(i)); // 100 tasks

// نستخدم "iteration grouping" يدوياً هيك (4 مهام فقط)
forall(0, 3, (ii) -> { // 4 tasks
    // Each task executes a "chunk" of 25 iterations
    forseq(25 * ii, 25 * (ii + 1) - 1, (i) -> BODY(i));
}); // forall
```

#### شرح الكود سطراً بسطر
1. `forall(0, 99, (i) -> BODY(i))`: بينشئ 100 مهمة منفصلة، وحدة لكل تكرار — لو `BODY(i)` بسيطة وسريعة جداً، كلفة إنشاء المهمة نفسها ممكن تفوق كلفة تنفيذ `BODY(i)` الفعلية.
2. `forall(0, 3, (ii) -> {...})`: بدل 100 مهمة، هلأ عم ننشئ 4 مهام بس (`ii` من 0 لـ 3).
3. `forseq(25*ii, 25*(ii+1)-1, (i) -> BODY(i))`: كل مهمة من الأربعة بتنفّذ **تسلسلياً** مجموعة (`chunk`) من 25 تكرار متتالي — مثلاً المهمة `ii=0` بتنفّذ `i` من 0 لـ 24، والمهمة `ii=1` بتنفّذ `i` من 25 لـ 49، وهكذا.

#### 📖 الشرح
هالتقنية اسمها "تجميع التكرارات" (`iteration grouping`) أو "تقطيع الحلقة" (`loop chunking`) — بدل إنشاء مهمة لكل تكرار مفرد (كلفة إنشاء عالية بالنسبة لحجم الشغل)، منجمّع عدة تكرارات بمهمة واحدة تنفّذهم تسلسلياً، فيقل عدد المهام الكلي (وبالتالي كلفة الإنشاء) بشكل كبير، مع الاحتفاظ بجزء كبير من فايدة التوازي (لأنه الـ 4 مجموعات نفسها بتشتغل بالتوازي).

بس المحاضرة بتشير إنه هالأسلوب اليدوي "غير مريح للمبرمج" — لازم تحسب حدود الـ `chunk` يدوياً بكل مرة. لهيك، `HJlib` بتوفر أداة جاهزة تعمل نفس الشي تلقائياً: `forallChunked` (رح نشوفها بالفقرة الجاية).

#### 🎯 الملخص السريع
- إنشاء مهمة لكل تكرار مفرد بحلقات ضخمة وشغل بسيط = غير فعّال.
- الحل: تجميع عدة تكرارات بمهمة واحدة تنفّذهم تسلسلياً (`chunking`).
- الأسلوب اليدوي (حساب حدود الـ chunk بنفسك) ممكن، بس غير مريح.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف `forallChunked` اللي بتعمل نفس الفكرة تلقائياً، وتطبيقها على مثال المتوسط المتكرر.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> It is inefficient to create forall iterations in which each iteration (async task) does very little work. An alternate approach is "iteration grouping" or "loop chunking" e.g., replace forall(0, 99, (i) -> BODY(i)); // 100 tasks with forall(0, 3, (ii) -> { // 4 tasks // Each task executes a "chunk" of 25 iterations forseq(25*ii, 25*(ii+1)-1, (i) -> BODY(i)); }); // forall. This is better, but it's still inconvenient for the programmer to do the "iteration grouping" or "loop chunking" explicitly

</details>

---

### 6.1. `forallChunked`: تقطيع تلقائي
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6", group: "6.1-6.2"} -->

#### 💡 الفكرة الأساسية
**`forallChunked` هي نفسها `forall` بمعامل إضافي (`chunkSize`) بيحدد حجم كل مجموعة تكرارات، فبتغنيك عن حساب حدود الـ `chunk` يدوياً.**
*(هاي هي الأداة الجاهزة اللي بتحل مشكلة "الأسلوب اليدوي" اللي شفناها بالفقرة السابقة.)*

---

#### 💻 الكود
```java
forallChunked(int s0, int e0, int chunkSize,
              edu.rice.hj.api.HjProcedure<Integer> body)

// e.g., بدل:
forall(0, 99, (i) -> BODY(i)); // 100 tasks

// نستخدم:
forallChunked(0, 99, 100 / 4, (i) -> BODY(i));
```

#### شرح الكود سطراً بسطر
1. توقيع `forallChunked`: نفس معاملات `forall` (`s0, e0, body`)، بالإضافة لمعامل ثالث `chunkSize` بيحدد حجم كل مجموعة.
2. `forallChunked(0, 99, 100/4, (i) -> BODY(i))`: بتعمل بالضبط نفس اللي عملناه يدوياً بالفقرة السابقة (4 مهام، كل وحدة تنفّذ 25 تكرار)، بس بسطر واحد بدل حساب `ii` و `25*ii` يدوياً.

#### 📖 الشرح
`forallChunked` بتاخد على عاتقها حساب حدود كل مجموعة (`chunk`) تلقائياً بناءً على `chunkSize` اللي حددته، وبتنشئ عدد مهام يساوي (عدد التكرارات الكلي ÷ `chunkSize`) تقريباً — كل مهمة بتنفّذ `chunkSize` تكرار تسلسلياً بداخلها.

#### 🎯 الملخص السريع
- `forallChunked(s0, e0, chunkSize, body)` = `forall` + تقطيع تلقائي.
- بتغنيك عن حساب حدود الـ chunk يدوياً.
- عدد المهام الناتج ≈ عدد التكرارات ÷ `chunkSize`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
بعض الطلاب بيفكرو إنه `forallChunked` أداة مختلفة تماماً عن `forall` بسلوكها.

#### الفهم الصحيح ✅:
`forallChunked` هي **نفس** `forall` بالضبط بنفس المعنى والنتيجة النهائية، الفرق الوحيد هو **كيف** بتوزّع الشغل على المهام داخلياً (تقطيع بدل مهمة لكل تكرار) — لتحسين الأداء، مو لتغيير النتيجة.

#### 📚 التطبيق
بالفقرة الأخيرة رح نشوف `forallChunked` مطبّقة فعلياً على مثال المتوسط المتكرر الكامل.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> forallChunked(int s0, int e0, int chunkSize, edu.rice.hj.api.HjProcedure<Integer> body) Like forall(int s0, int e0, edu.rice.hj.api.HjProcedure<Integer> body) but forallChunked includes chunkSize as the third parameter. e.g., replace forall(0, 99, (i) -> BODY(i)); // 100 tasks by forallChunked(0, 99, 100/4, (i)->BODY(i));

</details>

---

### 6.2. تطبيق `forallChunked` على المتوسط المتكرر
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.1", group: "6.1-6.2"} -->

#### 💡 الفكرة الأساسية
**تطبيق `forallChunked` على مثال المتوسط المتكرر بيربط عدد الـ chunks بعدد خيوط العمل الفعلية (`numWorkerThreads`) بدل رقم ثابت، لتحقيق أفضل توزيع للشغل.**
*(هاد آخر مثال بالمحاضرة، وبيربط كل شي ببعض.)*

---

#### 💻 الكود
```java
int nc = numWorkerThreads();
// ... Initializations
forseq(0, m - 1, (iter) -> {
    // Compute MyNew as function of input array MyVal
    forallChunked(1, n, n / nc, (j) -> { // Create n/nc tasks
        myNew[j] = (myVal[j - 1] + myVal[j + 1]) / 2.0;
    }); // forallChunked
    // Swap myVal & myNew;
    float[] temp = myVal; myVal = myNew; myNew = temp;
    // myNew becomes input array for next iteration
}); // forseq
```

#### شرح الكود سطراً بسطر
1. `int nc = numWorkerThreads();`: نجيب عدد خيوط العمل المتاحة فعلياً بالنظام (متل عدد الأنوية بالمعالج).
2. الحلقة الخارجية `forseq(0, m-1, (iter) -> {...})`: نفس ما شفنا بالفقرة 5.1 — تسلسلية دايماً.
3. `forallChunked(1, n, n/nc, (j) -> {...})`: بدل `forall(1,n,...)` العادية، هلأ منستخدم `forallChunked` بحجم `chunk = n/nc` — يعني بننشئ تقريباً `nc` مهمة بس (بعدد خيوط العمل)، كل وحدة بتنفّذ `n/nc` تكرار تسلسلياً.
4. باقي الكود (تبديل `myVal`/`myNew`) نفسه زي الفقرة 5.1 تماماً.

#### 📖 الشرح
ليش `chunkSize = n/nc` بالذات؟ لأنه المنطق الأمثل هو: لو عندك `nc` خيط عمل فعلي، أفضل شي تنشئ **بالضبط** `nc` مهمة (أو قريب منها)، كل وحدة تاخد نصيبها المتساوي من الشغل (`n/nc` تكرار). هيك بتضمن استغلال كل الأنوية المتاحة بدون كلفة إنشاء مهام زيادة عن الحاجة.

> 💡 **التشبيه:** فكّر بتوزيع 1000 صندوق على 4 عمّال — أفضل شي تعطي كل عامل 250 صندوق يشيلهم بنفسه (chunk)، مش تعطي كل عامل صندوق واحد وتطلب منه يرجع لك 1000 مرة (overhead الرجوع والطلب في كل مرة).

#### 🎯 الملخص السريع
- `nc = numWorkerThreads()`: عدد خيوط العمل الفعلية.
- `chunkSize = n/nc`: توزيع متساوٍ للشغل على كل خيط عمل.
- النتيجة: تقريباً `nc` مهمة بس، بدل `n` مهمة منفصلة.

#### 📚 التطبيق
هاد آخر تطوّر بمثال المتوسط المتكرر بهالمحاضرة — يجمع بين `forseq` (الحلقة الخارجية التسلسلية) و `forallChunked` (الحلقة الداخلية المتوازية والمحسّنة بالأداء).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> int nc = numWorkerThreads(); ... // Initializations forseq(0, m-1, (iter) -> { // Compute MyNew as function of input array MyVal forallChunked(1, n, n/nc, (j) -> { // Create n/nc tasks myNew[j] = (myVal[j-1] + myVal[j+1])/2.0; }); // forallChunked // Swap myVal & myNew; float[] temp=myVal; myVal=myNew; myNew=temp; // myNew becomes input array for next iteration }); // forseq

</details>

---

## ملخص شامل — Loop Parallelism (قراءة بديلة كاملة)

خلّينا نرجع لنقطة البداية ونحكي القصة كاملة بشكل متصل، من أول فكرة لآخر واحدة.

أول شي، لازم نميّز بين نوعين من التوازي: `Data Parallelism` هي لما تنفّذ نفس الكود بالضبط على عناصر مختلفة من بيانات — متل ست طهاة كل واحد عم يقطّع نفس نوع الخضار. أما `Task Parallelism` فهي أعم — عمليات مختلفة تماماً بتشتغل بنفس الوقت، متل واحد عم يقطّع وواحد عم يحمّي الفرن. هالتمييز مهم لأنه `forall`، الأداة الأساسية بهالمحاضرة، مبنية أصلاً لخدمة حالة `Data Parallelism`.

نبلّش بمثال حقيقي: ضرب المصفوفات. الخوارزمية التسلسلية عندها ثلاث حلقات متداخلة — `i`، `j`، و `k`. السؤال المطروح: أي واحدة من الثلاثة نقدر نحولها لـ `forall` (متوازية)؟ الجواب: `i` و `j` آمنتان تماماً، لأنه كل زوج `(i,j)` بيكتب على خانة مختلفة من مصفوفة الناتج `c`. أما `k` فلازم تضل تسلسلية (`forseq`)، لأنه كل تكرار من `k` بيكتب على **نفس** الخانة `c[i][j]` عبر عملية `+=` — لو شغّلناهم بالتوازي، ممكن يصير `data race` وتضيع إحدى عمليات الجمع.

أول محاولة لتطبيق هالتوازي كانت باستخدام `finish` و `async` يدوياً — كل تكرار من `i,j` منلفّه بـ `async` جوا `finish`، مع نسخ المتغيرات لـ `final` عشان الـ lambda تقدر تستخدمهم. الكود اشتغل صح، بس طلع طويل وصعب القراءة — ما بتقدر تعرف بنظرة سريعة أي حلقة متوازية وأيهم تسلسلية. وهاد بالضبط اللي قاد لتصميم `forall`: أداة مخصّصة للحلقات، بتجمع `finish` + الحلقات المتداخلة + `async` بسطر واحد واضح، وفيها `finish` ضمني (يعني الكود اللي بعدها ما بينفّذ إلا بعد ما تخلص كل التكرارات). كمان تقدر تدمج حلقتين متداخلتين (`i,j`) بـ `forall` واحدة متعددة الأبعاد، ومتغير التكرار بيصير `HjPoint` (نقطة متعددة الأبعاد).

بعد ضرب المصفوفات، شفنا مثال أعم: تحديث مصفوفة ثنائية الأبعاد بثلاث حالات مختلفة حسب اتجاه الاعتماد — لو كل خانة بتعتمد بس على نفسها القديمة، كلا البُعدين (`i` و `j`) آمنان للـ `forall`. لو الاعتماد أفقي (`A[i][j-1]`)، لازم العمود يضل تسلسلي (`forseq`) والصف يصير متوازي (`forall`). ولو الاعتماد عمودي (`A[i-1][j]`)، العكس بالضبط. نفس المنطق دايماً: اسأل نفسك "هل جسم الحلقة بيعتمد على نتيجة تكرار سابق؟"

بعدين انتقلنا لموضوع مختلف تماماً: مزامنة الحواجز (`Barrier Synchronization`). المشكلة المطروحة كانت مثال Hello-Goodbye: عندك `forall` بسيطة كل تكرار فيها بيطبع "Hello" وبعدها "Goodbye"، بس بترتيب اعتباطي بين التكرارات المختلفة — يعني ممكن يطلع "Goodbye" لتكرار قبل "Hello" لتكرار تاني. السؤال: كيف نضمن إنه كل الـ Hello تطبع قبل أي Goodbye؟ جربنا حلين أوليين: الأول (فصل الكود لـ `forall` منفصلتين) حل مشكلة الترتيب بفضل الـ `finish` الضمني، بس كسر إمكانية الوصول للمتغير المحلي `sq` من الـ `forall` الأولى للثانية. الحل الثاني عالج هاي المشكلة باستخدام مصفوفة مشتركة بدل متغير محلي — اشتغل، بس غيّر بنية الكود بشكل غير مريح.

الحل الثالث والنهائي كان `forallPhased` مع `next()`. هاي الأداة بتقسم جسم الحلقة لمراحل (`phases`) — كل استدعاء لـ `next()` هو حاجز (`Barrier`): كل تكرار بيوصله بيتوقف وينتظر لحد ما **كل** التكرارات النشطة توصل لنفس النقطة، وبعدين الكل يكمل سوا للمرحلة التالية. هيك حافظنا على المتغير المحلي `sq` زي ما هو، وضمنّا الترتيب. بالنمذجة الرسمية، عملية `next()` = إشارة (`SIG`) بيرسلها كل تكرار لما يوصل، بالإضافة لانتظار (`WAIT`) لحد ما يستلم إشارات كل التكرارات التانية.

فيه نقطتان دقيقتان لازم تنتبهلهم بموضوع الحواجز: الأولى، لو تكرار انتهى بدون ما يستدعي `next()` إضافي، باقي التكرارات ما بتنتظره — يعني عدد المراحل ممكن يختلف من تكرار لآخر (متل مثال الحلقة الداخلية اللي عدد تكراراتها `i+1`، فالتكرار `i=0` بيخلص بأسرع وقت والتكرار الأخير بيضل لآخر مرحلة). الثانية، الحواجز مو `statically scoped` — استدعاء `next()` بسطر معين ممكن يتزامن مع `next()` بسطر مختلف تماماً بالكود (متل مثال التكرارات الفردية والزوجية اللي بتستخدم `next()` بفروع `if/else` مختلفة بس بتتزامن مع بعض)، وهاد أحد الأسباب اللي بتخلي الحواجز أقل انضباطاً بنيوياً من `finish` أو `async` أو `future`.

بعد الحواجز، شفنا مثال تطبيقي متكامل: المتوسط المتكرر أحادي البُعد (`Iterative Averaging`). الفكرة: مصفوفة أحادية البُعد بحدود ثابتة (`myVal[0]=0`, `myVal[n+1]=1`)، وبكل تكرار كل عنصر داخلي بينستبدل بمتوسط جاريه. نستخدم مصفوفتين منفصلتين (`myVal` و `myNew`) لتفادي استخدام قيم محدّثة جزئياً بنفس التكرار، وبعد كل تكرار منبدّل المؤشرات بينهم (أسرع من نسخ البيانات). النقطة المهمة هون: الحلقة الخارجية على عدد التكرارات (`iter`) لازم تضل `forseq` — لأنه كل تكرار بيعتمد على نتيجة التكرار اللي قبله — بينما الحلقة الداخلية على عناصر المصفوفة (`j`) آمنة تماماً كـ `forall`، لأنه كل عنصر `myNew[j]` مستقل عن باقي العناصر بنفس التكرار.

آخر موضوع: كلفة إنشاء المهام. لو عندك `forall` بعدد تكرارات كبير جداً (مثلاً 100)، وكل تكرار بيعمل شغلة صغيرة جداً، كلفة إنشاء المهمة نفسها (`overhead`) ممكن تصير أكبر من كلفة الشغل الفعلي — وهاد غير فعّال. الحل: تجميع التكرارات (`iteration grouping` أو `loop chunking`) — بدل مهمة لكل تكرار، منجمّع عدة تكرارات بمهمة واحدة تنفّذهم تسلسلياً جوّاها. أول محاولة كانت يدوية (حساب حدود كل مجموعة بأنفسنا)، بس `HJlib` بتوفر أداة جاهزة: `forallChunked(s0, e0, chunkSize, body)` — نفس `forall` بالضبط، بس بمعامل إضافي بيحدد حجم كل مجموعة تلقائياً. وبالتطبيق على مثال المتوسط المتكرر، أفضل قيمة لـ `chunkSize` هي `n/nc` حيث `nc` عدد خيوط العمل الفعلية — هيك بنضمن استغلال كل الأنوية المتاحة بدون كلفة زيادة.

**إيش بيطلع بالامتحان:** أكتر سؤال متوقع هو تحليل حلقة معينة وتحديد أي جزء منها آمن للتوازي وأي جزء لازم يضل تسلسلي (بناءً على نمط الاعتماد بين العناصر) — تماماً متل تحليل `for-i/for-j/for-k` بضرب المصفوفات، أو حالات تحديث المصفوفة الثنائية الأبعاد الثلاث. كمان متوقع أسئلة على الفرق بين `forall` و `forallPhased` (متى تحتاج `next()`)، وأسئلة على سلوك `next()` مع تكرارات منتهية أو بنقاط مختلفة بالكود.

**الربط مع المحاضرة الجاية:** بعد ما فهمنا `forall` و `forallPhased` كأدوات لتنظيم التوازي داخل الحلقات، المحاضرات الجاية غالباً رح تبني على هالأساس لتقديم أدوات تنسيق أعقد (متل `Futures` أو `Data-Driven Tasks`) للحالات اللي فيها اعتماديات أعقد من مجرد "مرحلة بعد مرحلة".

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium)
**السؤال:** بمثال ضرب المصفوفات (`c[i][j] = Σ a[i][k]*b[k][j]`)، أي من الحلقات التالية يجب أن تبقى `forseq` لتجنّب `data race`؟

أ) الحلقة `i` فقط
ب) الحلقة `j` فقط
ج) الحلقة `k` فقط
د) الحلقات الثلاث معاً

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): الحلقة `i` آمنة تماماً للتوازي لأنها بتحدد خانة `c` مستقلة.
- ❌ ب): الحلقة `j` كذلك آمنة، بنفس السبب.
- ✅ ج): الحلقة `k` بتكتب على نفس الخانة `c[i][j]` بكل تكراراتها عبر `+=`، فلازم تبقى تسلسلية لتفادي `data race`.
- ❌ د): `i` و `j` آمنتان للتحويل إلى `forall`، بس `k` فقط لازم تبقى تسلسلية.

---

### السؤال 2 (medium)
**السؤال:** ما الفرق الجوهري بين `forall` و تركيبة `finish` + `for` + `async` اليدوية؟

أ) `forall` أبطأ دائماً من الأسلوب اليدوي
ب) `forall` أداة مخصّصة للحلقات وفيها `finish` ضمني، بينما `finish`/`async` عامة وتحتاج نسخ المتغيرات لـ `final` يدوياً
ج) `finish`/`async` لا يمكن استخدامها للحلقات إطلاقاً
د) `forall` لا تحتاج `finish` أبداً حتى لو أردنا الانتظار

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا علاقة مباشرة بالسرعة، الفرق بالوضوح والبنية.
- ✅ ب): هذا بالضبط ما ناقشته المحاضرة — `forall` أبسط وأوضح، مع `finish` ضمنية.
- ❌ ج): تم استخدام `finish`/`async` فعلياً لضرب المصفوفات بالمحاضرة، بس بشكل يدوي أقل وضوحاً.
- ❌ د): `forall` فيها `finish` ضمني بالضبط — يعني الانتظار موجود تلقائياً، مو غائب.

---

### السؤال 3 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
forall(0, n-1, 0, n-1, (i, j) -> {
    A[i][j] = F(A[i][j-1]);
});
```
أي من التالي يصف سلوك هذا الكود تحديداً عند التنفيذ؟

أ) الكود آمن تماماً لأنه `forall` ثنائية الأبعاد
ب) ممكن يحصل `data race` أو نتيجة غير صحيحة لأنه `A[i][j]` بيعتمد على `A[i][j-1]` وكلاهما ضمن نفس `forall` المتوازية
ج) الكود سيرمي استثناءً عند التنفيذ
د) النتيجة صحيحة دائماً لأن `j-1` قيمة قديمة بالضرورة

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): كون الحلقة `forall` ثنائية الأبعاد لا يضمن الأمان — الأمان يعتمد على الاعتماديات داخل الجسم.
- ✅ ب): بما إنه `j` نفسها جوا `forall` (متوازية)، ما في ضمانة إنه `A[i][j-1]` اتحسبت (أو ما اتحسبتش لسا) قبل قراءتها — هاد بالضبط سبب الحاجة لجعل `j` حلقة `forseq` (متل الحالة 2 بالمحاضرة).
- ❌ ج): لا يوجد استثناء، المشكلة منطقية (نتيجة قد تكون خاطئة) لا استثناء تنفيذي.
- ❌ د): "قديمة" هون غير مضمونة لأنه `j-1` ممكن تكون قيد الحساب بنفس اللحظة (تكرار موازي).

---

### السؤال 4 (medium)
**السؤال:** ما الغرض من استخدام مصفوفتين منفصلتين (`myVal` و `myNew`) بمثال `Iterative Averaging`؟

أ) لتسريع الطباعة على الشاشة
ب) لتجنّب استخدام قيم محدّثة جزئياً من نفس التكرار الحالي أثناء الحساب
ج) لتقليل استهلاك الذاكرة
د) لأنه `forall` لا تعمل إلا مع مصفوفتين

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا علاقة بالطباعة إطلاقاً.
- ✅ ب): كل `myNew[j]` يجب أن تُحسب من القيم القديمة (`myVal`)، فلو استخدمنا مصفوفة واحدة، ممكن يقرأ تكرار قيمة محدّثة حديثاً بدل القديمة.
- ❌ ج): بالعكس، هذا يستهلك ذاكرة أكثر (مصفوفتان بدل واحدة).
- ❌ د): `forall` تعمل مع أي عدد من المصفوفات، لا قيد بهذا الخصوص.

---

### السؤال 5 (hard) — حسابي
**السؤال:** برنامج فيه `Work = 24` و `Span (CPL) = 6`. إذا شُغّل على `P = 4` معالجات، ما أقرب قيمة لأقصى `Speedup` ممكنة نظرياً حسب صيغة `Speedup(P) = Work / max(Span, Work/P)`؟

أ) 4
ب) 6
ج) 3
د) 24

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- `Work/P = 24/4 = 6`
- `max(Span, Work/P) = max(6, 6) = 6`
- `Speedup(4) = Work / 6 = 24/6 = 4`
- ✅ أ): بالضبط النتيجة المحسوبة أعلاه.
- ❌ ب): هذه قيمة `Span` نفسها، وليست `Speedup` — خطأ شائع بالخلط بين المقامين.
- ❌ ج): لو قسّمت `Work/(P+... )` أو أخطأت بالمقام تحصل على قيم مقاربة خاطئة متل هذه.
- ❌ د): هذه قيمة `Work` نفسها بدون أي قسمة — تجاهل كامل لأثر التوازي.

---

### السؤال 6 (hard) — حسابي
**السؤال:** برنامج فيه `Work = 30` و `Span (CPL) = 5`. ما أقصى عدد معالجات (`P`) يمكن الاستفادة منه فعلياً قبل ما يتوقف `Speedup` عن الزيادة (أي `Work/P = Span`)؟

أ) 5
ب) 6
ج) 10
د) 30

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- الحد الأقصى للتوازي المفيد = `Work / Span` = 30/5 = 6
- بعد `P=6`، أي زيادة بعدد المعالجات لن تُحسّن `Speedup` لأن `Span` تصبح هي القيد المسيطر (`max(Span, Work/P) = Span`).
- ✅ ب): 30/5 = 6 بالضبط.
- ❌ أ): هذه قيمة `Span` نفسها، وليست الحد الأقصى للمعالجات المفيدة.
- ❌ ج): حساب غير صحيح (لا يطابق `Work/Span`).
- ❌ د): هذه قيمة `Work`، بدون أي قسمة على `Span`.

---

### السؤال 7 (medium)
**السؤال:** ما الفرق بين `forall` و `forallPhased`؟

أ) لا فرق، الاسمان لنفس الأداة بالضبط
ب) `forallPhased` تسمح باستخدام `next()` لإنشاء حواجز بين مراحل، بينما `next()` غير مسموحة جوا `forall` العادية
ج) `forall` أسرع دائماً من `forallPhased`
د) `forallPhased` لا تحتوي على `finish` ضمني بعكس `forall`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): أدوات مختلفة بقدرات مختلفة.
- ✅ ب): هذا بالضبط الفرق الجوهري الموضّح بالمحاضرة.
- ❌ ج): لا توجد مقارنة سرعة مباشرة بينهما بالمحاضرة، الفرق وظيفي لا أدائي.
- ❌ د): كلاهما يحتوي على `finish` ضمني بالنهاية.

---

### السؤال 8 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
forallPhased(0, 2, (i) -> {
    forseq(0, i, (j) -> {
        System.out.println("(" + i + "," + j + ")");
        next();
    });
});
```
أي من التالي يصف عدد استدعاءات `next()` لكل تكرار `i`؟

أ) استدعاء واحد فقط لكل التكرارات
ب) `i+1` استدعاء للتكرار `i` (أي: 1، 2، 3 استدعاءات للتكرارات 0، 1، 2 على التوالي)
ج) 3 استدعاءات لكل التكرارات بدون استثناء
د) لا يوجد أي استدعاء لـ `next()` لأنها جوا `forseq`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): عدد استدعاءات `next()` يساوي عدد تكرارات `forseq` الداخلية، وهو مختلف باختلاف `i`.
- ✅ ب): `forseq(0, i, ...)` تنفّذ `i+1` تكرار (من 0 لـ `i`)، وكل تكرار يستدعي `next()` مرة، فالتكرار `i=0` يستدعيها مرة، `i=1` مرتين، `i=2` ثلاث مرات.
- ❌ ج): هذا صحيح فقط للتكرار `i=2`، وليس لكل التكرارات.
- ❌ د): `next()` مسموحة جوا أي كود متداخل ضمن `forallPhased`، بما فيها `forseq` الداخلية — طالما `forallPhased` هي المحيطة الأقرب.

---

### السؤال 9 (medium)
**السؤال:** أي من التالي يصف `HjPoint` بشكل صحيح كما وردت بالمحاضرة؟

أ) اسم بديل لـ `HjRegion`
ب) نقطة عدد صحيح متعدد الأبعاد تمثّل متغير التكرار بـ `forall`
ج) نوع بيانات خاص فقط بـ `forallChunked`
د) دالة لحساب `chunkSize`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `HjRegion` تمثّل حدود التكرار (منطقة مستطيلة)، وهي مفهوم مختلف عن `HjPoint`.
- ✅ ب): بالضبط ما ورد بالمحاضرة — `(i,j)` مثلاً هي `HjPoint` ثنائية الأبعاد.
- ❌ ج): `HjPoint` مرتبطة بـ `forall` عموماً، لا بـ `forallChunked` تحديداً.
- ❌ د): لا علاقة لـ `HjPoint` بحساب `chunkSize`.

---

### السؤال 10 (hard)
**السؤال:** بالمثال التالي:
```java
forallPhased(0, m-1, (i) -> {
    if (i % 2 == 1) { oddPhase0(i); next(); oddPhase1(i); }
    else { evenPhase0(i); next(); evenPhase1(i); }
});
```
ما الذي يوضحه هذا المثال عن طبيعة الحواجز (`Barriers`)؟

أ) الحواجز لا تعمل إطلاقاً داخل `if/else`
ب) الحواجز `statically scoped` — أي أن `next()` يجب أن تكون بنفس السطر دائماً
ج) الحواجز ليست `statically scoped` — استدعاءات `next()` بسطور مختلفة (هنا داخل فروع `if` و `else` مختلفة) يمكن أن تتزامن مع بعضها
د) هذا المثال خاطئ ولا يمكن تنفيذه إطلاقاً

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): الحواجز تعمل بشكل طبيعي داخل `if/else`، كما يوضح المثال نفسه.
- ❌ ب): هذا عكس ما توضحه المحاضرة تماماً — الحواجز ليست ثابتة الموقع.
- ✅ ج): `next()` بسطر 4 (للفرديات) تتزامن مع `next()` بسطر 8 (للزوجيات) رغم اختلاف موقعهما بالكود، لأن النطاق يحدَّد بأقرب `forallPhased` محيطة، لا بموقع السطر.
- ❌ د): الكود صحيح تماماً وهو مثال فعلي من المحاضرة.

---

### السؤال 11 (medium) — سيناريو كود
**السؤال:** بالكود التالي:
```java
// Thread A                    // Thread B
counter++;                     counter++;
```
إذا نفّذ الخيطان بنفس الوقت بدون `synchronized`، أي من التالي يصف سلوك الكود تحديداً؟

أ) الكود سيتوقف بالكامل (`Deadlock`)
ب) قد تُفقد إحدى عمليتي الزيادة بسبب `Race Condition`
ج) النتيجة ستكون دائماً صحيحة لأن `counter++` عملية واحدة
د) سيرمي الكود استثناءً (Exception) عند التنفيذ

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): ما في انتظار متبادل هون، الخيوط بتكمل تنفيذ عادي — هذا مو `Deadlock`.
- ✅ ب): `counter++` مو عملية ذرية (read-modify-write)، لو الخيطين قرأو نفس القيمة قبل ما أي وحد يكتب، بتنضاع زيادة وحدة — نفس منطق `c[i][j] += ...` بحلقة `k` بمثال ضرب المصفوفات.
- ❌ ج): هذا بالضبط الفهم الخاطئ الشائع — `counter++` تترجم لعدة عمليات منفصلة بالـ bytecode.
- ❌ د): ما في استثناء، بس النتيجة غلط منطقياً.

---

### السؤال 12 (medium)
**السؤال:** أي من التالي يصف `Java Streams.parallel()` بشكل صحيح مقارنة بـ `forall`؟

أ) `Streams` أعم من `forall` وتناسب كل حالات الحوسبة العلمية
ب) `Streams` مناسبة بشكل خاص للحلقات المتوازية التي تنتج مصفوفة ناتج واحدة، بينما `forall` أنسب للحسابات متعددة المخرجات
ج) `Streams` و `forall` متطابقتان تماماً بدون أي فرق
د) `forall` لا يمكن استخدامها إلا مع `Streams`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): العكس هو الصحيح — `forall` هي الأعم والأنسب للحوسبة العلمية متعددة المخرجات.
- ✅ ب): بالضبط ما ذكرته المحاضرة كسبب اختيار `forall` كصيغة موحدة لبقية المادة.
- ❌ ج): توجد فروق وظيفية واضحة بينهما (خصوصاً بعدد المخرجات المدعومة).
- ❌ د): `forall` أداة مستقلة عن `Streams` تماماً، من مكتبة `HJlib`.

---

### السؤال 13 (hard)
**السؤال:** ما الفرق الحاسم بين مشكلة `Chunking` (كلفة إنشاء المهام) والمشكلة التي يحلها `forallPhased`؟

أ) لا فرق، كلاهما نفس المشكلة
ب) `Chunking` يعالج كلفة الأداء الناتجة عن عدد كبير من المهام الصغيرة، بينما `forallPhased` يعالج ترتيب التنفيذ (التزامن) بين التكرارات
ج) `forallPhased` يعالج كلفة الأداء، و `Chunking` يعالج ترتيب التنفيذ
د) كلاهما يُستخدم فقط في مثال ضرب المصفوفات

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): مشكلتان مختلفتان تماماً بالهدف والحل.
- ✅ ب): `Chunking` (`forallChunked`) هدفه تقليل `overhead` إنشاء المهام، بينما `forallPhased` هدفه ضمان ترتيب صحيح بين مراحل التكرارات المتوازية.
- ❌ ج): عكس التوصيف الصحيح تماماً.
- ❌ د): كلا الأداتين استُخدمتا بأمثلة متعددة (المصفوفات، المتوسط المتكرر، Hello-Goodbye).

---

### السؤال 14 (medium) — حسابي
**السؤال:** إذا كان لديك `forall(0, 199, (i) -> BODY(i))` وأردت استخدام `forallChunked` بحيث ينتج بالضبط 8 مهام متساوية الحجم، ما القيمة الصحيحة لـ `chunkSize`؟

أ) 8
ب) 25
ج) 200
د) 199

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- عدد التكرارات الكلي = 200 (`s0=0` إلى `e0=199` شامل الطرفين).
- `chunkSize = عدد التكرارات / عدد المهام المطلوب = 200/8 = 25`.
- ✅ ب): 25 بالضبط، نفس منطق مثال `forallChunked(0, 99, 100/4, ...)` بالمحاضرة (100/4=25).
- ❌ أ): هذا هو عدد المهام المطلوب، وليس حجم كل `chunk`.
- ❌ ج): هذا هو العدد الكلي للتكرارات، لا حجم `chunk` الواحد.
- ❌ د): هذا هو آخر تكرار (`e0`)، وليس حجم `chunk`.

---

### السؤال 15 (hard)
**السؤال:** استخدام `Barriers` لـ `Point-to-Point Synchronization` — أي من التالي يصف بدقة سبب كون `next()` "أقل انضباطاً" من `finish`/`async`/`future`؟

أ) لأن `next()` أبطأ من `finish` دائماً
ب) لأن الحواجز ليست `statically scoped`، والتكرارات المنتهية تنسحب تلقائياً من الانتظار، بعكس `finish` التي لها نطاق محدد بصرياً بالكود
ج) لأن `next()` لا يمكن استخدامها إلا مع أعداد زوجية من التكرارات
د) لأن الحواجز تسبب `Deadlock` دائماً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا توجد مقارنة سرعة مباشرة بهذا الخصوص بالمحاضرة.
- ✅ ب): كلا السببين ذُكرا صراحة بالمحاضرة كأسباب "قلة الانضباط البنيوي" للحواجز.
- ❌ ج): لا قيد كهذا على `next()`.
- ❌ د): الحواجز لا تسبب `Deadlock` بالضرورة، بل تنتظر التكرارات النشطة فقط.

---

### السؤال 16 (medium)
**السؤال:** بمثال `Iterative Averaging`، لماذا يجب أن تبقى الحلقة الخارجية (على `iter`) دائماً `forseq` ولا يمكن تحويلها إلى `forall` حتى بعد إضافة `Chunking`؟

أ) لأن `forallChunked` لا تدعم الحلقات الخارجية
ب) لأن كل تكرار `iter` يعتمد على نتيجة `myVal` الناتجة من التكرار السابق مباشرة (اعتماد تسلسلي بين التكرارات)
ج) لأن `m` دائماً رقم صغير جداً
د) لأن `myNew` لا يمكن استخدامها إلا داخل `forseq`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا علاقة بدعم `forallChunked` تقنياً، المسألة اعتماد منطقي بالبيانات.
- ✅ ب): نفس منطق حلقة `k` بضرب المصفوفات — اعتماد مباشر بين التكرار الحالي والتالي يمنع التوازي.
- ❌ ج): حجم `m` غير مرتبط بسبب بقاء الحلقة تسلسلية.
- ❌ د): `myNew` مصفوفة عادية تُستخدم داخل أي نوع حلقة، لا قيد كهذا.

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)
```java
forall(0, n-1, 0, n-1, (i, j) -> {
    forall(0, n-1, (k) -> {
        c[i][j] += a[i][k] * b[k][j];
    });
});
```
**الخطأ:** الحلقة الداخلية على `k` استُخدمت كـ `forall` (متوازية)، بينما كل تكراراتها بتكتب على نفس الخانة `c[i][j]` عبر `+=` — هذا `data race` مباشر.

**التصحيح:**
```java
forall(0, n-1, 0, n-1, (i, j) -> {
    forseq(0, n-1, (k) -> {
        c[i][j] += a[i][k] * b[k][j];
    });
});
```

---

### سؤال تصحيح 2 (misconception)
```java
forall(0, m-1, (i) -> {
    int sq = i * i;
    System.out.println("Hello from task with square = " + sq);
    next(); // Barrier
    System.out.println("Goodbye from task with square = " + sq);
});
```
**الخطأ:** استُخدمت `next()` جوا `forall` العادية، بينما `next()` مسموحة فقط جوا `forallPhased()`.

**التصحيح:**
```java
forallPhased(0, m-1, (i) -> {
    int sq = i * i;
    System.out.println("Hello from task with square = " + sq);
    next(); // Barrier
    System.out.println("Goodbye from task with square = " + sq);
});
```

---

### سؤال تصحيح 3 (return_check)
```java
forseq(0, m-1, (iter) -> {
    forall(1, n, (j) -> {
        myNew[j] = (myVal[j-1] + myVal[j+1]) / 2.0;
    });
    // نسيان تبديل المصفوفتين هون!
});
```
**الخطأ:** لم يتم تبديل (`swap`) المصفوفتين `myVal` و `myNew` بعد كل تكرار، فالتكرار التالي رح يحسب من نفس `myVal` القديمة بدل القيم المحدّثة — النتيجة لن تتقارب أبداً.

**التصحيح:**
```java
forseq(0, m-1, (iter) -> {
    forall(1, n, (j) -> {
        myNew[j] = (myVal[j-1] + myVal[j+1]) / 2.0;
    });
    float[] temp = myVal; myVal = myNew; myNew = temp; // إضافة التبديل
});
```

---

### سؤال تصحيح 4 (dead_code)
```java
forallChunked(0, 99, 100/4, (i) -> {
    BODY(i);
    return; // سطر ميت بلا فائدة هون
    System.out.println("Never reached"); // كود ميت لن يُنفَّذ أبداً
});
```
**الخطأ:** السطر `System.out.println("Never reached")` كود ميت (`dead code`) لن يصل إليه التنفيذ أبداً بسبب `return` قبله مباشرة.

**التصحيح:**
```java
forallChunked(0, 99, 100/4, (i) -> {
    BODY(i);
});
```

---

### سؤال تصحيح 5 (logic)
```java
forallPhased(0, m-1, (i) -> {
    forseq(0, n-1, (j) -> {
        oddPhase0(i, j);
    });
    // next() مفقودة هون قبل المرحلة التالية!
    forseq(0, n-1, (j) -> {
        oddPhase1(i, j);
    });
});
```
**الخطأ:** لا يوجد استدعاء لـ `next()` بين المرحلتين، فما في ضمانة إنه كل التكرارات خلصت `Phase0` قبل ما أي تكرار يبلّش `Phase1` — الكود بيتصرف متل `forall` عادية بدون تزامن مراحل حقيقي.

**التصحيح:**
```java
forallPhased(0, m-1, (i) -> {
    forseq(0, n-1, (j) -> {
        oddPhase0(i, j);
    });
    next(); // إضافة الحاجز المفقود
    forseq(0, n-1, (j) -> {
        oddPhase1(i, j);
    });
});
```

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### القواعد الذهبية
| # | القاعدة |
| --- | --- |
| 1 | حلقة آمنة للتحويل إلى `forall` فقط إذا كل تكرار يكتب على خانة/متغير منفصل عن باقي التكرارات |
| 2 | كل نسخ `forall` و `forallPhased` تحتوي على `finish` ضمني بالنهاية |
| 3 | `next()` مسموحة فقط جوا `forallPhased()`، مش جوا `forall()` |
| 4 | تكرار `forallPhased` منتهي (بدون `next()` إضافي) لا ينتظره أحد بالمراحل اللاحقة |
| 5 | الحواجز ليست `statically scoped` — `next()` من مواقع مختلفة بالكود قد تتزامن معاً |
| 6 | استخدم `forallChunked` بدل `forall` لو عدد التكرارات كبير وشغل كل تكرار بسيط جداً |
| 7 | الحلقة الخارجية على تكرارات معتمدة تسلسلياً (متل `iter` بالمتوسط المتكرر) دائماً `forseq` |

### مرجع سريع للمصطلحات والصيغ
| المصطلح | التعريف بسطر |
| --- | --- |
| `Data Parallelism` | نفس الكود على بيانات مختلفة |
| `Task Parallelism` | أكواد مختلفة بنفس الوقت |
| `forall` | حلقة متوازية، فيها `finish` ضمني |
| `forseq` | نسخة تسلسلية مطابقة الصيغة لـ `forall` |
| `forallPhased` | `forall` مع دعم `next()` لتنسيق المراحل |
| `next()` | حاجز مزامنة بين مراحل التكرارات المتوازية |
| `HjPoint` | نقطة عدد صحيح متعدد الأبعاد (متغير تكرار `forall`) |
| `HjRegion` | منطقة مستطيلة تحدد حدود تكرار `forall` |
| `forallChunked` | `forall` + معامل `chunkSize` لتقليل عدد المهام |
| `data race` | تعارض قراءة/كتابة بين تكرارات متوازية على نفس المتغير |

---

## الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** شو الفرق بين `Data Parallelism` و `Task Parallelism`؟
**A:** `Data Parallelism` = نفس الكود على عناصر بيانات مختلفة. `Task Parallelism` = عمليات (أكواد) مختلفة تماماً تنفّذ بنفس الوقت.

### البطاقة 2
**Q2:** بضرب المصفوفات، ليش الحلقة `k` لازم تضل تسلسلية؟
**A:** لأنه كل تكرار من `k` بيكتب (`+=`) على نفس الخانة `c[i][j]`، فتوازيها بيسبب `data race`.

### البطاقة 3
**Q3:** شو يعني إنه `forall` فيها `finish` ضمني؟
**A:** إنه الكود اللي بعد `forall` ما بينفّذ إلا بعد ما تخلص كل تكراراتها بالكامل — بدون حاجة لكتابة `finish` بشكل صريح.

### البطاقة 4
**Q4:** شو الفرق بين `forall` و `forasync`؟
**A:** نفس الشي بالضبط، بس `forasync` بدون `finish` ضمني — لازم تحطها بنفسك جوا `finish` خارجي.

### البطاقة 5
**Q5:** وين مسموح تستخدم `next()`؟
**A:** فقط جوا `forallPhased()`، مو جوا `forall()` العادية.

### البطاقة 6
**Q6:** شو بيصير لو تكرار `forallPhased` انتهى بدون استدعاء `next()` إضافي؟
**A:** باقي التكرارات ما بتنتظره بالمراحل الجاية — بينسحب تماماً من عملية المزامنة.

### البطاقة 7
**Q7:** هل الحواجز `statically scoped`؟
**A:** لأ — استدعاءات `next()` من نقاط مختلفة بالكود (حتى بميثودات مختلفة) ممكن تتزامن مع بعض طالما هني جوا نفس `forallPhased`.

### البطاقة 8
**Q8:** ليش بنستخدم مصفوفتين (`myVal`, `myNew`) بمثال المتوسط المتكرر؟
**A:** عشان نتفادى استخدام قيم محدّثة جزئياً من نفس التكرار الحالي — كل `myNew[j]` لازم يُحسب من القيم القديمة فقط.

### البطاقة 9
**Q9:** ليش الحلقة الخارجية (`iter`) بمثال المتوسط المتكرر لازم تضل `forseq`؟
**A:** لأنه كل تكرار بيعتمد مباشرة على نتيجة (`myVal` المحدّثة) من التكرار اللي قبله — اعتماد تسلسلي.

### البطاقة 10
**Q10:** شو مشكلة `forall(0, 99, (i) -> BODY(i))` لو `BODY` بسيطة جداً؟
**A:** كلفة إنشاء 100 مهمة منفصلة ممكن تفوق كلفة تنفيذ الشغل الفعلي — غير فعّال (`overhead` عالٍ).

### البطاقة 11
**Q11:** شو الحل لمشكلة إنشاء عدد كبير من المهام الصغيرة؟
**A:** `Chunking` (تجميع التكرارات) — استخدام `forallChunked` بدل `forall`، لتقليل عدد المهام مع الحفاظ على التوازي.

### البطاقة 12
**Q12:** إيش قيمة `chunkSize` المثلى المقترحة بمثال المتوسط المتكرر، وليش؟
**A:** `n/nc` حيث `nc = numWorkerThreads()` — عشان ننشئ عدد مهام يساوي تقريباً عدد خيوط العمل الفعلية، ونستغل كل الأنوية بدون كلفة زيادة.

### البطاقة 13
**Q13:** شو الفرق بين `HjPoint` و `HjRegion`؟
**A:** `HjPoint` نقطة تكرار وحدة (مثل `(i,j)`)، بينما `HjRegion` منطقة كاملة تحدد حدود كل أبعاد التكرار (مثل `(0:n-1) x (0:n-1)`).

---

## ملاحظات على المخططات والمحتوى غير القابل للتمثيل الكامل

بعض الشرائح بالمحاضرة الأصلية (متل صورة "Data Parallelism vs. Task Parallelism" الافتتاحية) تحتوي على رسم توضيحي مأخوذ من مصدر خارجي (`Image source: https://livebook.manning.com/concept/net/task-parallelism`) يوضّح بصرياً كيف تُوزَّع البيانات على المهام بكل نمط.

#### ملاحظة:
هذا الموضوع موضح بصورة توضيحية في المحاضرة الأصلية (شريحة "Data Parallelism vs. Task Parallelism"). راجع الملف الأصلي للتفاصيل البصرية الكاملة.

**ملخص المحتوى:** الصورة توضّح 6 مهام تعالج بيانات مقسّمة بالتساوي (Data Parallelism) مقابل 6 مهام مختلفة الشكل واللون تعالج بيانات بأنماط متعددة (Task Parallelism) — تم تغطية المفهوم نصياً بالكامل بالفقرة 1 أعلاه.

---

*نهاية دليل المحاضرة 4 — Loop Parallelism*

# المحاضرة 5 — Data Flow Synchronization and Pipelining (تزامن تدفق البيانات والمسيرات)
> **المادة:** البرمجة المتوازية والمتزامنة (نظري) | **الموضوع:** أدوات تزامن متقدمة (`Phasers`)، `Point-to-Point Synchronization`، `Pipeline Parallelism`، و `Data Flow Parallelism`

---

# الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 1. lecture_overview — عن ماذا هذه المحاضرة؟
هاي المحاضرة بتكمل موضوع أدوات التزامن اللي بدأنا فيه بالمحاضرات السابقة (`Barrier`)، وبتوريك كيف تخلي التزامن بين الخيوط **أذكى وأسرع** من خلال `Phasers`، وبعدين بتستخدم نفس الفكرة لبناء نمطين مهمين من التوازي: `Pipeline Parallelism` (خط الإنتاج) و `Data Flow Parallelism` (تدفق البيانات حسب الاعتماديات مش حسب الترتيب).

### 2. learning_objectives — ماذا ستقدر تعمل بعد هذه المحاضرة؟
- تفرّق بين `Barrier` العادي و `Split-Phase Barrier` (`Fuzzy Barrier`) وتعرف ليش الثاني أسرع أحياناً.
- تستخدم `Java Phaser` بطريقتين: `arriveAndAwaitAdvance()` (حاجز كامل) و `arrive()` + `awaitAdvance()` (حاجز مقسوم لمرحلتين).
- تبني `Point-to-Point Synchronization` بين خيوط محددة بدل ما تحجز كل الخيوط بحاجز واحد.
- تحسب `Span (CPL)` لسيناريو معيّن وتقارن بين استخدام `Barrier` و `Point-to-Point`.
- تفهم وتطبّق `Pipeline Parallelism` وتحسب `Work`، `CPL`، و `Ideal Parallelism (PAR)` له.
- تبني برنامج `Data Flow` باستخدام `async` و `asyncAwait` وتفهم ليش ترتيب الأسطر مش مهم فيه.

### 3. prerequisites — شو المفروض تعرفه قبل ما تبلّش
- مفهوم `Thread` الأساسي ومفهوم `forall` (حلقة توازي).
- مفهوم `Barrier` التقليدي (كل الخيوط توقف عند نقطة واحدة وتكمل سوا) من محاضرة سابقة.
- أساسيات `Future` و `async`/`await` من محاضرات سابقة (استخدمناها هون للمقارنة مع `asyncAwait`).
- مفاهيم أساسية بلغة Java: `class`, `array`, حلقات `for`.

### 4. main_concepts — أهم المفاهيم بالمحاضرة
- **`Split-Phase Barrier` (`Fuzzy Barrier`):** حاجز مقسوم لخطوتين (`arrive` + `awaitAdvance`) بيسمح بشغل إضافي بالمنتصف بالتوازي مع الانتظار.
- **`Point-to-Point Synchronization`:** كل خيط بينتظر بس الخيوط اللي فعلاً محتاج نتيجتها، مش كل الخيوط.
- **`Parallel Iterative Averaging`:** مثال عملي بيوضح كيف `Point-to-Point` بتقلل `Span` مقارنة بـ `Barrier` بمسائل التكرار العددي.
- **`Pipeline Parallelism`:** تقسيم معالجة عنصر بيانات لمراحل متتالية (`Stages`)، وكل مرحلة بتشتغل بالتوازي مع مراحل تانية على عناصر مختلفة.
- **`Work` و `CPL (Span)` و `Ideal Parallelism (PAR)`:** مقاييس رياضية لتقييم أداء الـ `Pipeline`.
- **`Data Flow Parallelism`:** برمجة موازية عن طريق تعريف `Computation Graph` (رسمة اعتماديات)، بدل تحديد ترتيب تنفيذ صريح.
- **`asyncAwait`:** أداة بتخلي مهمة تنتظر أحداث محددة (`events`) قبل ما تبلّش، بدل الاعتماد الضمني بـ `Future.get()`.

### 5. connections — كيف تتصل هذه المحاضرة بالمحاضرات المجاورة
هاي المحاضرة بتبني مباشرة على مفهوم `Barrier` من المحاضرة اللي قبلها — يعني افترضنا إنك عارف `Barrier` أصلاً وجينا نحسّنه بـ `Phaser`. وبتفتح الباب قدام مواضيع لاحقة زي `Actors` و `Isolated Constructs` اللي رح تشوف فيها أنماط تزامن مختلفة كلياً (مش مبنية على `Barrier`/`Phaser` أصلاً).

### 6. common_mistakes — أشهر الأخطاء اللي بيقع فيها الطلاب
1. **الخلط بين `arriveAndAwaitAdvance()` و `arrive()` منفردة:** كتير طلاب بيستخدمو `arrive()` بس وينسو إنها **ما بتوقف** الخيط — لازم `awaitAdvance()` كمان إذا بدك تنتظر فعلاً.
2. **نسيان تهيئة `Phaser` بعدد الأطراف (`parties`) الصح:** `new Phaser(1)` تعني طرف واحد بس بيسجل وصول، مش كل الخيوط.
3. **الاعتقاد إنو `Point-to-Point` دايماً أسرع من `Barrier`:** مش صحيح دايماً — بيعتمد على شكل الاعتماديات، وإذا الاعتماديات معقدة، إدارة `Phaser` array نفسها بتصير أصعب وأبطأ.
4. **الخلط بين `Pipeline Parallelism` (تسلسل مراحل بيانات) و `Task Parallelism` العادي (مهام مستقلة):** بالـ `Pipeline` كل مرحلة **معتمدة** على ناتج المرحلة قبلها لنفس العنصر.
5. **نسيان `put()` بـ `Data Flow`:** لو نسيت تستدعي `.put()` بعد مهمة `async`، أي مهمة تانية مستنية هالحدث رح تعلق للأبد — هاي شكل من `Deadlock`.

---

# الجزء الثاني: الشرح التفصيلي

## 1. Split-Phase Barriers with Java Phasers (الحواجز المقسومة بمرحلتين)

#### 📍 أين نحن الآن؟
هاي المجموعة (1.1 → 1.2) بتقدّم فكرة جديدة كلياً: الحاجز التقليدي (`Barrier`) ممكن يتقسم لخطوتين منفصلتين بدل خطوة وحدة، وهاد بيفتح فرصة لأداء أفضل.

#### ⬅️ الربط مع السابق
بالمحاضرة السابقة اتعلمنا إنو `Barrier` بيوقف كل الخيوط عند نقطة واحدة لحد ما توصل كلها. هون رح نشوف إنو هالتوقف الكامل مش دايماً ضروري — ممكن نأجل جزء من الانتظار ونخلي شغل مستقل يصير بالتوازي معه.

### 1.1. لماذا نقسم الحاجز؟ (`Fuzzy Barrier`)
<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "lecture_4_barrier", group: "1.1-1.2"} -->

#### 💡 الفكرة الأساسية
**مو كل شغل داخل حلقة `forall` لازم يكون قبل الحاجز أو بعده بالضبط — لو في شغل مستقل (زي `lookup(i)`)، فيك تخليه يصير بالتوازي مع لحظة الانتظار نفسها.**

#### 💡 التشبيه
تخيل إنك بمطعم وبتستنى صحابك يوصلو (هاد الحاجز) عشان تطلبو الأكل سوا. بدل ما تقعد وتحدّق بالباب وما تعمل شي، فيك تصفّح المنيو (شغل مستقل زي `lookup(i)`) وانت مستني — ما لازم توقف عن كل شي لمجرد إنك مستني. **وجه الشبه:** تصفّح المنيو = العمل المستقل اللي فيه يصير أثناء الانتظار، مش قبله أو بعده حصراً.

---

#### 💻 الكود
```java
// The naive version: two print statements with an implicit ordering
forall (i : [0:n-1]) {
    print HELLO, i;
    myId = lookup(i); // convert int to a string — this call is local to iteration i
    print BYE, myId;
}
```

#### شرح الكود سطراً بسطر
1. `forall (i : [0:n-1])`: حلقة توازي — كل قيمة `i` بتشتغل بخيط/مهمة منفصلة.
2. `print HELLO, i;`: أول عملية طباعة، محلية بالكامل لكل تكرار.
3. `myId = lookup(i);`: عملية تحويل (مثلاً `int` إلى `String`) — **محلية لهاد التكرار فقط**، ما بتحتاج نتيجة من تكرار تاني ولا بتأثر على تكرار تاني.
4. `print BYE, myId;`: ثاني عملية طباعة، بتعتمد على `myId` من السطر يلي قبلها بنفس التكرار.

#### 📖 الشرح
السؤال المطروح: وين نحط الحاجز (`Barrier`) بين `print HELLO` و `print BYE`؟ في احتمالين: قبل `lookup(i)` أو بعدها. بما إنو `lookup(i)` **محلية بالكامل** ومالها علاقة بباقي التكرارات، مافي داعي تنتظرها قبل الحاجز ولا بعده — فيها فرصة تصير **بالتوازي** مع عملية الانتظار (`await`) نفسها. هاد بالضبط اللي بيسمح فيه `Split-Phase Barrier` (يُعرف كمان بـ `Fuzzy Barrier`): بدل حاجز واحد صلب (`arriveAndAwaitAdvance()`)، نفصله لعمليتين: `arrive()` (سجّل وصولي) ثم `awaitAdvance()` (استنى الباقي)، وبين الاثنين نحط الشغل المستقل.

#### 🤔 تفعيل الفهم
لو `lookup(i)` كانت بتعتمد على قيمة محسوبة من تكرار تاني (مش محلية)، هل بيصير صح نحطها بين `arrive()` و `awaitAdvance()`؟ (جاوب قبل ما تكمل: **لأ** — لأنك ما بتضمن التزامن الصحيح للبيانات المشتركة إذا الحاجز نفسه لسا ما اكتمل.)

#### 🎯 الملخص السريع
- `Barrier` العادي = خطوة وحدة توقف كل شي.
- `Split-Phase Barrier` = خطوتين، وبينهم مجال لشغل مستقل بالتوازي.
- الشرط: الشغل المحطوط بالنص لازم يكون **مستقل فعلاً** عن نتيجة الحاجز.

#### 📚 التطبيق
هاد المبدأ (تقسيم الانتظار لمرحلتين) هو الأساس اللي رح نبني عليه فقرة 1.2 لما نشوف الـ API الفعلي بلغة Java.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

> Java's Phaser class has the operation ph.arriveAndAwaitAdvance() which can be used to implement a barrier through phaser object ph. There are two possible positions for inserting a barrier between the two print statements above — before or after the call to lookup(i). The call to lookup(i) is local to iteration i and that there is no specific need to either complete it before the barrier or to complete it after the barrier. In fact, the call to lookup(i) can be performed in parallel with the barrier.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: فكرة الاستقلالية، والموضع البديل للحاجز، وإمكانية التوازي مع الانتظار.
- ℹ️ إضافة من الدليل: التشبيه بالمطعم والمنيو (شرح زيادة للفهم).

</details>

---

### 1.2. `ph.arrive()` و `ph.awaitAdvance()` — الـ API الفعلي
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1", group: "1.1-1.2"} -->

#### 💡 الفكرة الأساسية
**بدل `ph.arriveAndAwaitAdvance()` الواحدة، `Java Phaser` بتوفر `ph.arrive()` (سجّل وصول واستمر فوراً) و `ph.awaitAdvance(phase)` (استنى هون لحد ما الكل يوصل)، وبينهم منحط الشغل المستقل.**
*(بعد ما فهمنا ليش بدنا نقسم الحاجز، هلق منشوف كيف فعلياً منكتبه بالكود.)*

---

#### 💻 الكود
```java
// initialize phaser ph for use by n tasks ("parties")
Phaser ph = new Phaser(n);

// Create forall loop with n iterations that operate on ph
forall (i : [0:n-1]) {
    print HELLO, i;
    int phase = ph.arrive(); // signal arrival, but do NOT block here

    myId = lookup(i); // convert int to a string — runs in parallel with the wait

    ph.awaitAdvance(phase); // now actually wait for all parties to arrive
    print BYE, myId;
}
```

#### شرح الكود سطراً بسطر
1. `Phaser ph = new Phaser(n);`: إنشاء `Phaser` بعدد أطراف (`parties`) يساوي `n` — كل الخيوط اللي رح تشارك بالحاجز.
2. `int phase = ph.arrive();`: كل خيط بيسجل "وصلت"، وبيرجع رقم المرحلة الحالية (`phase`) — **بدون ما يوقف تنفيذه**.
3. `myId = lookup(i);`: هون منحط الشغل المستقل — بيصير بالتوازي مع باقي الخيوط وهي لسا بتصل.
4. `ph.awaitAdvance(phase);`: هلق فعلياً الخيط بيوقف وينتظر لحد كل الأطراف (الـ `n` خيط) توصل، وتنتقل المرحلة.
5. `print BYE, myId;`: بيصير فقط بعد ما كل الخيوط تجاوزت الحاجز فعلياً.

#### 📖 الشرح
الفرق الجوهري: `ph.arriveAndAwaitAdvance()` بتعمل التسجيل والانتظار **بعملية واحدة ذرية** — يعني بمجرد ما تناديها، الخيط بيوقف فوراً. أما `ph.arrive()` لحالها، فبترجع فوراً وما بتوقف الخيط — هاد يلي بيفتح المجال نحط شغل (`lookup(i)`) بينها وبين `ph.awaitAdvance(phase)`. لاحظ إنو `awaitAdvance` محتاجة رقم `phase` اللي رجعته `arrive()` — هيك بتعرف بالضبط أي مرحلة تنتظر انتقالها.

#### 🎯 الملخص السريع
- `arriveAndAwaitAdvance()` = تسجيل + انتظار بخطوة وحدة (حاجز تقليدي).
- `arrive()` = تسجيل فقط، بدون توقف.
- `awaitAdvance(phase)` = انتظار فعلي لانتقال المرحلة.

#### 📚 التطبيق
نفس فكرة `Phaser` هاي رح نستخدمها بشكل مختلف بفقرة 2 — بدل حاجز واحد لكل الخيوط، رح نعمل `Phaser` منفصل لكل زوج خيوط عشان نبني `Point-to-Point Synchronization`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفتكرو إنو `ph.arrive()` لحالها كافية عشان "تزامن" الخيوط، وبينسو إنو من دونها الخيوط ممكن تتخطى بعض بدون أي ضمانة.

#### الفهم الصحيح ✅:
`ph.arrive()` بس **تسجّل** الوصول وبترجع فوراً — **ما بتضمن أي انتظار**. الضمانة الفعلية (كل الخيوط توصل قبل ما أي وحدة تكمل) بتصير بس عند نداء `ph.awaitAdvance(phase)`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> To facilitate this split-phase barrier (also known as a fuzzy barrier) we use two separate APIs from Java Phaser class: ph.arrive() and ph.awaitAdvance(). [مع كود Phaser ph = new Phaser(n); forall (i : [0:n-1]) { print HELLO, i; int phase = ph.arrive(); myId = lookup(i); ph.awaitAdvance(phase); print BYE, myId; }]

</details>

---

## 2. Point-to-Point Synchronization (التزامن نقطة-لنقطة)

#### 📍 أين نحن الآن؟
هاي المجموعة (2.1) بتاخد فكرة `Phaser` وبتوسعها: بدل `Phaser` واحد مشترك بين كل الخيوط، منستخدم **`Phaser` منفصل لكل خيط**، فيصير كل خيط ينتظر بس اللي فعلاً محتاجه.

#### ⬅️ الربط مع السابق
بالفقرة 1 تعلمنا نقسم الحاجز لمرحلتين لنفس مجموعة الخيوط. هلق الخطوة التالية أبعد: ليش أصلاً نخلي **كل** الخيوط تتزامن مع بعض؟ بعض الخيوط أصلاً مش محتاجة تنتظر بعضها.

### 2.1. مثال Point-to-Point: تقليل الـ Span
<!-- @render: {type: "code-first", visualization: "none", coverage: "90%"} -->
<!-- @connectivity: {prerequisite: "section_1.2", group: "2.1"} -->

#### 💡 الفكرة الأساسية
**بدل حاجز واحد يجمع كل الخيوط، منستخدم `Phaser` منفصل لكل خيط (كل وحد بيهيّئ بعدد أطراف = 1)، وكل خيط بينتظر بس الـ `Phaser` تبع الخيط اللي فعلاً محتاج نتيجته.**

#### 💡 التشبيه
تخيل 3 موظفين بمشروع: الموظف 1 لازم ياخد تقرير الموظف 2، والموظف 2 لازم ياخد تقرير الموظف 1 كمان، بينما الموظف 3 يحتاج تقارير الموظف 1 و2 معاً. لو حطيت اجتماع عام (`Barrier`) يستنى فيه الكل بعض، رح تضيّع وقت. الأفضل: كل موظف يبعت تقريره **مباشرة** لمين محتاجه بس. **وجه الشبه:** بعت التقرير المباشر = `Point-to-Point Synchronization`، الاجتماع العام = `Barrier`.

---

#### 💻 الجدول (Point-to-Point Synchronization Example)

| Task 0 | Task 1 | Task 2 |
| --- | --- | --- |
| `1a: X = A(); //cost=1` | `1b: Y = B(); //cost=2` | `1c: Z = C(); //cost=3` |
| `2a: ph0.arrive();` | `2b: ph1.arrive();` | `2c: ph2.arrive();` |
| `3a: ph1.awaitAdvance(0);` | `3b: ph0.awaitAdvance(0);` | `3c: ph1.awaitAdvance(0);` |
| `4a: D(X,Y); //cost=3` | `4b: ph2.awaitAdvance(0);` | `4c: F(Y,Z); //cost=1` |
| | `5b: E(X,Y,Z); //cost=2` | |

#### شرح الجدول
1. **كل عمود** (Task 0, Task 1, Task 2) يمثل خيط منفصل بيشتغل بالتوازي مع الباقي.
2. `ph0`, `ph1`, `ph2` كل وحد `Phaser` مستقل، **مهيّأ بطرف واحد (`party count = 1`)** — لأنو خيط وحيد بس هو اللي بيسجل الوصول عليه (`arrive()`).
3. `awaitAdvance(0)` تعني: انتظر انتقال المرحلة من `0` إلى `1` — أي انتظر إنو صاحب الـ `Phaser` هاد يكون سجّل وصوله.
4. `Task 0` بيحسب `X`، يسجّل وصوله على `ph0`، وبعدين **بينتظر بس `ph1`** (نتيجة `Task 1`) عشان يقدر يحسب `D(X,Y)`.
5. `Task 1` بيحسب `Y`، يسجّل على `ph1`، بعدين ينتظر `ph0` (نتيجة `Task 0`) **و** `ph2` (نتيجة `Task 2`) عشان يحسب `E(X,Y,Z)`.
6. `Task 2` بيحسب `Z`، يسجّل على `ph2`، بعدين ينتظر `ph1` بس عشان يحسب `F(Y,Z)`.

#### 📖 الشرح
النقطة الأساسية: كل مهمة بتنتظر **بس** الـ `Phaser` تبع المهمة اللي فعلاً بتعتمد عليها، مش كل المهام. هيك منتجنب انتظار غير ضروري. لو استخدمنا `Barrier` عادي بيجمع الكل، كان لازم كل الخيوط توصل لنقطة وحدة قبل ما أي وحدة تكمل — وهاد بيطوّل الـ `Span` (أطول مسار حرج) لأنو أبطأ خيط (`Task 2` بتكلفة 3) بيأخر الكل حتى الخيوط اللي ما محتاجة نتيجته.

#### 🧮 حساب الـ Span
- **مع `Barrier` عادي:** لازم الكل يوصل قبل ما أي حد يكمل → أطول تكلفة أولى = `Task 2` بـ `cost=3`، وبعدها أطول مسار متبقي = `Task 1` (`E`, `cost=2`) → المجموع = `3 + 2 + 1 = 6` وحدات زمن.
- **مع `Point-to-Point`:** كل خيط بينتظر بس اعتماديته المباشرة → المسار الحرج الفعلي (`Task1: 1b→2b→3b(await ph0)→4b(await ph2)→5b`) = `2 + 3 = 5` وحدات زمن (لأنو `Task 1` بينتظر `ph2` يلي بتكلفة 3، مش الكل).
- **الفرق:** `Span` انخفض من `6` إلى `5` وحدات — تحسين ملموس بدون تغيير كمية الشغل (`Work`) نفسها.

#### 🤔 تفعيل الفهم
ليش استخدمنا `awaitAdvance(0)` تحديداً وليس رقم تاني؟ (فكّر قبل الجواب: لأنو كل `Phaser` هون بيمر بمرحلة وحدة بس — من `0` إلى `1` — فـ`0` هي رقم المرحلة الابتدائية اللي منستنى انتقالها.)

#### 🎯 الملخص السريع
- `Point-to-Point` = كل خيط بيهيّئ `Phaser` خاص فيه، وباقي الخيوط تنتظر بس اللي محتاجينه.
- بيقلل `Span` مقارنة بـ `Barrier` العام لما الاعتماديات مش كلها-تحتاج-كلها.
- الكلفة: إدارة عدد أكبر من `Phaser` objects، وتعقيد أكبر بالكود.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
افتراض إنو `Point-to-Point Synchronization` هي **بديل شامل** لـ `Barrier` ودايماً أسرع.

#### الفهم الصحيح ✅:
`Point-to-Point` أسرع **بس** لما الاعتماديات الفعلية بين الخيوط أقل من "الكل يحتاج الكل". لو كل خيط فعلاً بيحتاج نتيجة كل خيط تاني، ما في فايدة إضافية — وممكن حتى تعقيد الكود يزيد التكلفة بلا فايدة حقيقية بالأداء.

#### 📚 التطبيق
بفقرة 3 رح نشوف تطبيق حقيقي وأكبر لهاي الفكرة على مسألة عددية كاملة (`Iterative Averaging`).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90%)</summary>

> It is an example in which the span (critical path length) would be 6 units of time if we used a barrier, but is reduced to 5 units of time if we use individual phasers. Each column in the table represents execution of a separate task, and the calls to arrive() and awaitAdvance(0) represent synchronization across different tasks via phaser objects, ph0, ph1, and ph2, each of which is initialized with a party count of 1 (only one signalling task). (The parameter 0 in awaitAdvance(0) represents a transition from phase 0 to phase 1.)

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الجدول، معنى `party count`، ومعنى `awaitAdvance(0)`.
- ✓ تم شرح حساب الـ 6 مقابل 5 وحدات زمن بالتفصيل (لم يُذكر الحساب صراحة بالمحاضرة، فقط النتيجة النهائية).
- ℹ️ إضافة من الدليل: خطوات الحساب الكاملة للـ Span والتشبيه بالموظفين.

</details>

---

## 3. Example of Parallel Iterative Averaging (مثال التقريب التكراري المتوازي)

#### 📍 أين نحن الآن؟
هاي المجموعة (3.1) بتاخد فكرة `Point-to-Point Synchronization` وبتطبقها على مسألة عددية واقعية — حساب متوسط عناصر مصفوفة بشكل تكراري.

#### ⬅️ الربط مع السابق
بفقرة 2 شفنا `Point-to-Point` بمثال مجرد (Task 0/1/2). هلق رح نشوف كيف نفس الفكرة بتتطبق على مصفوفة كبيرة فيها اعتماديات بين **الجيران** بس، مش بين كل العناصر.

### 3.1. Barrier مقابل Point-to-Point بمسألة 1D Iterative Averaging
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_2.1", group: "3.1"} -->

#### 💡 الفكرة الأساسية
**بمسألة `Iterative Averaging`، كل عنصر `X[i]` بمرحلة `iter+1` بيعتمد بس على جيرانه المباشرين (`X[i-1]` و `X[i+1]`) بمرحلة `iter` — فمافي داعي ينتظر كل المصفوفة، بس الجيران.**

---

#### 📊 المخطط

**السيناريو:** مصفوفة من 12 عنصر، وكل تكرار (`iter`) بيحسب قيمة جديدة لكل عنصر بناءً على متوسط جاره الشمال وجاره اليمين من التكرار السابق.

| نمط التزامن | الوصف |
| --- | --- |
| `Barrier synchronization` | خط أحمر واحد يفصل بين **كل** عناصر `iter=i` و **كل** عناصر `iter=i+1` — أي عنصر ما بيبلّش المرحلة الجديدة قبل ما **كل** عناصر المرحلة القديمة تخلص |
| `Point-to-point synchronization` | أسهم متقاطعة (زي X) بين كل عنصر بـ `iter=i` والعنصرين المجاورين له بـ `iter=i+1` بس — الأرقام (1,2,3,3,2,1...) بتمثل **ترتيب/تكلفة الانتظار الفعلي** لكل عنصر |

```flowchart
[X0(iter=i)] --> [X0(iter=i+1)]
[X0(iter=i)] --> [X1(iter=i+1)]
[X1(iter=i)] --> [X0(iter=i+1)]
[X1(iter=i)] --> [X1(iter=i+1)]
[X1(iter=i)] --> [X2(iter=i+1)]
[X2(iter=i)] --> [X1(iter=i+1)]
[X2(iter=i)] --> [X2(iter=i+1)]
```

#### 📖 الشرح: اقرأ المخطط كالتالي
بنمط `Barrier` (الصف الأول بالرسمة الأصلية): خط أحمر أفقي واحد يفصل بين الصفين، معناها **كل** النقاط لازم تخلص قبل ما **أي** نقطة تبلّش المرحلة الجاية — حتى لو عنصر معيّن مش محتاج إلا جاره القريب. بنمط `Point-to-Point` (الصف الثاني): الأسهم المتقاطعة بتوضح إنو كل نقطة بمرحلة `i+1` بتستنى بس النقطتين المجاورتين ليها بمرحلة `i` — فمثلاً أول عنصر بمرحلة `i+1` بس بيستنى أول وتاني عنصر بمرحلة `i`، مش المصفوفة كلها.

#### 💻 الكود (نسخة عنصر-لكل-خيط)
```java
// Allocate array of phasers
Phaser[] ph = new Phaser[n+2]; // array of phasers
for (int i = 0; i < ph.length; i++) ph[i] = new Phaser(1);

// Main computation
forall (i : [1:n-1]) {
    for (iter : [0:nsteps-1]) {
        newX[i] = (oldX[i-1] + oldX[i+1]) / 2;
        ph[i].arrive();

        if (index > 1) ph[i-1].awaitAdvance(iter);
        if (index < n-1) ph[i+1].awaitAdvance(iter);
        swap pointers newX and oldX;
    }
}
```

#### شرح الكود سطراً بسطر
1. `Phaser[] ph = new Phaser[n+2];`: مصفوفة `Phaser`، وحدة لكل عنصر بالمصفوفة الأصلية (+2 هوامش).
2. `for (...) ph[i] = new Phaser(1);`: كل `Phaser` بطرف واحد بس — العنصر نفسه هو اللي بيسجّل وصوله.
3. `forall (i : [1:n-1])`: كل عنصر بالمصفوفة (عدا الأطراف) بيشتغل بخيط/مهمة منفصلة.
4. `for (iter : [0:nsteps-1])`: حلقة داخلية على عدد التكرارات المطلوبة.
5. `newX[i] = (oldX[i-1] + oldX[i+1]) / 2;`: حساب المتوسط الفعلي بناءً على الجيران من التكرار السابق.
6. `ph[i].arrive();`: العنصر يسجل "خلّصت حسابي لهاد التكرار".
7. `if (index > 1) ph[i-1].awaitAdvance(iter);`: انتظر جارك الشمال يخلص (إذا موجود).
8. `if (index < n-1) ph[i+1].awaitAdvance(iter);`: انتظر جارك اليمين يخلص (إذا موجود).
9. `swap pointers newX and oldX;`: تبديل المصفوفتين استعداداً للتكرار الجاي.

#### 📖 الشرح
لاحظ الفرق عن نسخة تانية بالمحاضرة (بتقسيم المصفوفة لمجموعات `tasks` كل وحدة بتحسب شريحة كاملة بدل عنصر واحد) — نفس المبدأ بالظبط بس على مستوى **مجموعات** عناصر بدل عنصر مفرد، وفيها حساب للعناصر الداخلية بالتوازي مع الانتظار (تطبيق مباشر لفكرة `Split-Phase Barrier` من فقرة 1!).

#### 🤔 تفعيل الفهم
ليش بنحتاج شرط `if (index > 1)` و `if (index < n-1)`؟ (فكّر: عشان نتجنب `Array Index Out of Bounds` عند أطراف المصفوفة — أول عنصر ما إله جار شمال، وآخر عنصر ما إله جار يمين.)

#### 🎯 الملخص السريع
- كل عنصر بيستنى بس جيرانه المباشرين، مش المصفوفة كاملة.
- الفكرة قابلة للتوسيع: نفس المبدأ بينطبق سواء على مستوى عنصر مفرد أو مستوى مجموعة عناصر (`tasks`).
- دمج مع فكرة `Split-Phase Barrier`: حساب العناصر الداخلية بيصير بالتوازي مع انتظار حدود المجموعة.

#### 📚 التطبيق
هاد المثال بيوضح إنو `Point-to-Point Synchronization` مش بس فكرة نظرية — إلها استخدام حقيقي بمسائل رياضية/عددية زي المصفوفات، وهاد بالضبط النمط اللي رح نبنيه بشكل أعمّ بموضوع `Pipeline Parallelism` الجاي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
افتراض إنو استخدام `Phaser` لكل عنصر بمصفوفة كبيرة (زي مليون عنصر) دايماً أفضل من `Barrier` واحد.

#### الفهم الصحيح ✅:
كل `Phaser` إله تكلفة إدارة (`overhead`). لو المصفوفة كبيرة جداً، الأفضل تقسيمها لـ `tasks` (مجموعات) بدل عنصر-لكل-`Phaser` — بالظبط زي ما وريت المحاضرة بالنسخة الثانية من الكود (`Phaser[tasks+2]` بدل `Phaser[n+2]`).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

> [رسمة توضح Barrier synchronization و Point-to-point synchronization بمصفوفة 12 عنصر، مع كودين: نسخة عنصر مفرد بمصفوفة Phaser[n+2]، ونسخة موزّعة على مجموعات (tasks) بمصفوفة Phaser[tasks+2] فيها حساب العناصر الداخلية بالتوازي مع الانتظار]

**ملاحظة على التغطية:**
- ✓ تم شرح كودي المصفوفة بالكامل (عنصر مفرد + نسخة المجموعات).
- ✓ تم شرح الرسمة (Barrier مقابل Point-to-point) بجدول ومخطط.

</details>

---

## 4. Pipeline Parallelism (التوازي بنمط خط الإنتاج)

#### 📍 أين نحن الآن؟
هاي المجموعة (4.1 → 4.3) بتقدّم نمط توازي جديد كلياً — `Pipeline` — وبتستخدم فيه بالضبط أداة `Point-to-Point Synchronization` اللي اتعلمناها بالفقرتين قبل.

#### ⬅️ الربط مع السابق
لاحظ إنو نمط `Point-to-Point` بمثال `Iterative Averaging` كان بين **جيران متجاورين مكانياً**. بـ `Pipeline`، رح نشوف نفس نمط "انتظار الجار بس" لكن بين **مراحل معالجة متتالية**، مش عناصر مصفوفة.

### 4.1. البنية العامة لـ 1D Pipeline
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1", group: "4.1-4.3"} -->

#### 💡 الفكرة الأساسية
**`Pipeline` بيقسم معالجة كل عنصر بيانات لسلسلة مراحل متتالية (`P0, P1, ..., Pp-1`)، وكل مرحلة بتقدر تشتغل على عنصر مختلف بنفس الوقت اللي مرحلة تانية شغالة على عنصر آخر.**

#### 💡 التشبيه
تخيل خط إنتاج بمصنع سيارات: محطة تركيب المحرك، محطة الدهان، محطة الفحص النهائي. مو لازم السيارة الأولى تخلص من **كل** المحطات قبل ما السيارة الثانية تبلّش من محطة التركيب — بالعكس، لما السيارة الأولى توصل محطة الدهان، السيارة الثانية بتبلّش تركيب بنفس الوقت. **وجه الشبه:** محطات المصنع = مراحل الـ `Pipeline` (`P0, P1, ...`)، السيارات = عناصر البيانات (`d0, d1, ...`).

---

#### 📊 المخطط

**السيناريو:** سلسلة إدخال `d9 d8 d7 d6 d5 d4 d3 d2 d1 d0` بتدخل على 10 مراحل معالجة متتالية `P0 → P1 → P2 → ... → P9`.

| رقم العقدة | الوصف |
| --- | --- |
| `P0` | أول مرحلة معالجة، بتستقبل عناصر الإدخال أول شي |
| `P1 ... P9` | مراحل لاحقة، كل وحدة بتستقبل ناتج المرحلة يلي قبلها |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| `P0` | `P1` | تسلسلي (ناتج P0 هو مدخل P1) |
| `P1` | `P2` | تسلسلي |
| `...` | `...` | تسلسلي لباقي المراحل حتى `P9` |

```flowchart
[Input: d9...d0] --> [P0] --> [P1] --> [P2] --> [P3] --> [P4] --> [P5] --> [P6] --> [P7] --> [P8] --> [P9]
```

#### 📖 الشرح: اقرأ المخطط كالتالي
البيانات بتدخل من الشمال بترتيب `d0, d1, d2, ...` (بترتيب الوصول)، وبتمر بالمراحل وحدة ورا وحدة. الفكرة الجوهرية: **بافتراض إنو المداخل `d0, d1, ...` بتوصل بالتسلسل، فيك تفعّل التوازي بحيث المرحلة `Pi` تشتغل على العنصر `d(k-i)` بنفس اللحظة اللي المرحلة `P0` شغالة على العنصر `dk`.** يعني كل مرحلة "متأخرة" خطوة واحدة عن اللي قبلها، بس **كلهم شغالين بنفس الوقت** على عناصر مختلفة.

#### 🤔 تفعيل الفهم
لو عندك 3 مراحل بس (`P0, P1, P2`) و100 عنصر بيانات، هل ممكن كل الـ 100 عنصر يتعالجو بنفس اللحظة الواحدة؟ (فكّر: **لأ** — بأي لحظة معينة، بس 3 عناصر كحد أقصى ممكن تكون تحت المعالجة بنفس الوقت، واحد بكل مرحلة.)

#### 🎯 الملخص السريع
- `Pipeline` = مراحل متتالية (`Stages`)، كل مرحلة بتاخد ناتج يلي قبلها.
- التوازي بيصير لما مراحل مختلفة تشتغل على عناصر بيانات مختلفة **بنفس الوقت**.
- عدد العناصر تحت المعالجة بنفس اللحظة = عدد المراحل (`p`) كحد أقصى.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف **رسمة الزمن (`Timing Diagram`)** اللي بتوضح بالتفصيل كيف هالتوازي بيصير عبر الزمن، وبعدها نحسب المقاييس الرياضية (`Work`, `Span`, `PAR`).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [General Structure of 1D Pipeline] Assuming that the inputs d0, d1, ... arrive sequentially, pipeline parallelism can be exploited by enabling task (stage) Pi to work on item dk-i when task (stage) P0 is working on item dk.

</details>

---

### 4.2. Timing Diagram و المعادلات: Work / CPL / Ideal Parallelism
<!-- @render: {type: "equation-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1", group: "4.1-4.3"} -->

#### 💡 الفكرة الأساسية
**نقدر نحسب أداء الـ `Pipeline` رياضياً بثلاث قيم: `Work` (مجموع الشغل الكلي)، `CPL/Span` (المسار الحرج)، و `Ideal Parallelism (PAR)` (نسبة التسريع النظرية القصوى).**
*(بعد ما فهمنا شكل الـ Pipeline، هلق منقيسه رقمياً.)*

---

#### 📊 مخطط الزمن (Timing Diagram)
الرسمة الأصلية بتوضح جدول زمني، محاوره: المحور الأفقي = تقدم الزمن، والمحور الرأسي = أي مرحلة (`P0` لـ `P9`) شغالة على أي عنصر بيانات بأي لحظة.

| المرحلة | ماذا تعالج بالبداية | ماذا تعالج لاحقاً |
| --- | --- | --- |
| `P0` | `d0, d1, d2, ...` بالتتابع | تستمر بمعالجة عناصر جديدة كل خطوة زمن |
| `P1` | تبلّش بـ `d0` بعد خطوة زمن واحدة تأخير عن `P0` | `d1, d2, ...` بنفس النمط |
| `P9` (آخر مرحلة) | تبلّش بـ `d0` بعد تأخير `p-1 = 9` خطوات زمن | تكمل الباقي |

**قراءة المخطط:** أول جزء من الزمن (بعرض `p-1` خطوة) هو "مرحلة التعبئة" (`fill-up`) — لسا مو كل المراحل شغالة. بعدها، بعرض `n` خطوة، **كل المراحل تشتغل بالتوازي الكامل** — هون فعلياً السرعة القصوى.

#### 📐 التعريف / الصيغ الرسمية
$$WORK = n \times p$$
$$CPL = n + p - 1$$
$$PAR = \frac{WORK}{CPL} = \frac{n \times p}{n + p - 1}$$

**الشرح:** `n` = عدد عناصر الإدخال، `p` = عدد مراحل الـ `Pipeline`. `WORK` هو مجموع كل عمليات المعالجة لو نفّذناها بشكل تسلسلي بحت (كل عنصر بمرّ على كل مرحلة). `CPL` (أو `Span`) هو أطول مسار حرج — بيشمل `p-1` خطوة "تعبئة" زائد `n` خطوة معالجة فعلية. `PAR` هو أفضل تسريع نظري ممكن.

#### 📖 الشرح
عند `p = 1` (مرحلة وحدة بس)، `PAR` بتنخفض لـ `1` — منطقي، لأنو مافي مراحل توازي فعلياً. عند `n = 1` (عنصر بيانات واحد بس)، `PAR` بترجع لـ `1` كمان — لأنو ما في "تدفق" بيانات يستفيد من تعدد المراحل. أما لما `n` أكبر بكثير من `p` (`n >> p`)، فـ `PAR` بتقترب من `p` بالحد الأقصى — يعني أفضل حالة ممكنة هي التسريع بمقدار عدد المراحل بالظبط.

#### 🧮 مثال رقمي محسوب
لو عندنا `n = 100` عنصر بيانات و `p = 10` مراحل:
- `WORK = 100 × 10 = 1000`
- `CPL = 100 + 10 - 1 = 109`
- `PAR = 1000 / 109 ≈ 9.17`

لاحظ إنو `PAR ≈ 9.17` قريبة جداً من `p = 10` — لأنو `n` (100) أكبر بكثير من `p` (10)، فتأثير مرحلة "التعبئة" (`p-1 = 9` خطوة) بيصير صغير نسبياً مقارنة بإجمالي الـ `Span`.

#### 🎯 الملخص السريع
- `WORK = n × p`، `CPL = n + p - 1`، `PAR = WORK / CPL`.
- `PAR` بتنحصر دايماً بين `1` و `p`.
- كل ما `n >> p`، كل ما `PAR` قربت من `p` (أفضل حالة).

#### 📚 التطبيق
هاي المعادلات مهمة كتير بالامتحان — أي سؤال يعطيك `n` و `p` (أو `Work` و `Span` مباشرة) لازم تقدر تحسب `PAR` فوراً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> point-to-point synchronization can be used to build a one-dimensional pipeline with p tasks (stages), T0, . . . Tp−1. For example, three important stages in a medical imaging pipeline are denoising, registration, and segmentation. Let n be the number of input items and p the number of stages in the pipeline, WORK = n × p, CPL = n + p − 1 is the span or critical path. Thus, the ideal parallelism is PAR = WORK/CPL = np/(n+p−1). When p=1, ideal parallelism degenerates to PAR=1. When n=1, ideal parallelism again degenerates to PAR=1. When n is much larger than p (n >> p), the ideal parallelism approaches PAR=p in the limit, which is the best possible case.

**ملاحظة على التغطية:**
- ✓ تم شرح كل الصيغ والحالات الحدّية الثلاث (p=1, n=1, n>>p).
- ✓ تم إضافة مثال رقمي محسوب فعلياً (غير موجود بالمحاضرة، إضافة للفهم).
- ℹ️ إضافة من الدليل: مثال التصوير الطبي (denoising, registration, segmentation) مذكور بالمحاضرة كمثال تطبيقي، أُدرج هنا كما هو.

</details>

---

### 4.3. تطبيق Phasers على مراحل الـ Pipeline
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.2", group: "4.1-4.3"} -->

#### 💡 الفكرة الأساسية
**بالضبط متل مثال `Iterative Averaging`، الـ `Pipeline` بيتطبق بمصفوفة `Phaser` وحدة لكل مرحلة، وكل مرحلة بتنتظر بس المرحلة يلي قبلها مباشرة.**

---

#### 💻 الكود
```java
// Code for pipeline stage i
while (there is an input to be processed) {
    // wait for previous stage, if any
    if (i > 0) ph[i - 1].awaitAdvance();

    process input;

    // signal next stage
    ph[i].arrive();
}
```

#### شرح الكود سطراً بسطر
1. `while (there is an input to be processed)`: كل مرحلة بتفضل تشتغل طالما في مدخلات جديدة توصلها.
2. `if (i > 0) ph[i - 1].awaitAdvance();`: إذا مو أول مرحلة (`i > 0`)، استنى المرحلة السابقة (`ph[i-1]`) تخلص من العنصر الحالي.
3. `process input;`: المعالجة الفعلية لهاي المرحلة على العنصر الحالي.
4. `ph[i].arrive();`: أشّر (بلّغ) المرحلة التالية إنك خلّصت — عشان تقدر تبلّش هي.

#### 📖 الشرح
هاد الكود بالظبط تطبيق لمبدأ `Point-to-Point Synchronization` (فقرة 2) على سياق الـ `Pipeline`: كل مرحلة `i` بتنتظر بس المرحلة `i-1` (جارتها بالتسلسل، مش كل المراحل)، وبتبلّغ بس المرحلة `i+1` (عن طريق `ph[i].arrive()` اللي رح تقرأها هي بـ `awaitAdvance()`).

#### 🎯 الملخص السريع
- كل مرحلة تنتظر بس المرحلة السابقة، وتبلّغ بس المرحلة التالية.
- هاد التطبيق المباشر لـ `Point-to-Point Synchronization` بسياق الـ `Pipeline`.

#### 📚 التطبيق
لاحظ إنو الفكرة الأساسية بكل هاي الأمثلة (`Iterative Averaging`, `Pipeline`) هي نفسها: **حدد اعتمادياتك الفعلية بدقة، وزامن بس عليها**. بالفقرة الجاية (`Data Flow`) رح ناخد هاد المبدأ لأبعد حد — بدل ما نكتب الكود بالترتيب، منعرّف الاعتماديات بس ومنخلي النظام يرتّب التنفيذ.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> The synchronization required for pipeline parallelism can be implemented using phasers by allocating an array of phasers, such that phaser ph[i] is "signalled" in iteration i by a call to ph[i].arrive() as follows: [كود while loop مع awaitAdvance و arrive]

</details>

---

## 5. Data Flow Parallelism (التوازي بنمط تدفق البيانات)

#### 📍 أين نحن الآن؟
هاي المجموعة (5.1 → 5.2) بتقدّم آخر مفهوم بالمحاضرة — نموذج تزامن مختلف كلياً بيعتمد على **رسمة اعتماديات** (`Computation Graph`) بدل تحديد ترتيب صريح للتنفيذ.

#### ⬅️ الربط مع السابق
كل أدوات التزامن اللي شفناها لحد هلق (`Phaser`, `Point-to-Point`, `Pipeline`) بتحدد **متى** ينتظر الخيط بشكل صريح بالكود. بـ `Data Flow`، منعكس الفكرة: منعرّف بس **شو بيعتمد على شو** (الرسمة)، والنظام هو يلي بيرتب التنفيذ تلقائياً.

### 5.1. Computation Graph و asyncAwait
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.3", group: "5.1-5.2"} -->

#### 💡 الفكرة الأساسية
**بدل ما نستخدم `Future.get()` (اعتمادية ضمنية داخل الكود)، `asyncAwait` بتخلينا نحدد صراحة "هاي المهمة لازم تستنى هالأحداث المحددة قبل ما تبلّش" — فيصير برنامجنا **رسمة اعتماديات صريحة** (`Computation Graph`).**

#### 💡 التشبيه
تخيل مطبخ مطعم: طبق السلطة (Task C) لازم يستنى بس الخضار تتقطع (Event A)، بينما الطبق الرئيسي (Task D) لازم يستنى الخضار **و** اللحمة تتحضر (Event A و B). بدل ما الشيف يحفظ بذاكرته "استنى هاد وهاد"، فيه لوحة أوامر (`Computation Graph`) موضح فيها كل طبق شو بينتظر بالظبط. **وجه الشبه:** لوحة الأوامر = الـ `Computation Graph`، كل طبق = مهمة (`Task`).

---

#### 📊 المخطط

**السيناريو:** رسمة اعتماديات فيها 5 عُقد و4 روابط: `A → C`, `A → D`, `B → D`, `B → E`.

| رقم العقدة | الوصف |
| --- | --- |
| `A` | مهمة مستقلة، ما بتعتمد على أي مهمة تانية |
| `B` | مهمة مستقلة، ما بتعتمد على أي مهمة تانية |
| `C` | تعتمد بس على `A` |
| `D` | تعتمد على `A` **و** `B` معاً |
| `E` | تعتمد بس على `B` |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| `A` | `C` | اعتمادية مباشرة |
| `A` | `D` | اعتمادية مباشرة |
| `B` | `D` | اعتمادية مباشرة |
| `B` | `E` | اعتمادية مباشرة |

```flowchart
[Task A] --> [Task C]
[Task A] --> [Task D]
[Task B] --> [Task D]
[Task B] --> [Task E]
```

#### 💻 الكود
```java
async( () -> {/* Task A */; A.put(); } ); // Complete task and trigger event A
async( () -> {/* Task B */; B.put(); } ); // Complete task and trigger event B
asyncAwait(A, () -> {/* Task C */} );     // Only execute task after event A is triggered
asyncAwait(A, B, () -> {/* Task D */} );  // Only execute task after events A, B are triggered
asyncAwait(B, () -> {/* Task E */} );     // Only execute task after event B is triggered
```

#### شرح الكود سطراً بسطر
1. `async(() -> {...; A.put();})`: نفّذ Task A، وبعد ما تخلص، أطلق الحدث `A` (`A.put()`) — أي "بلّغ الكل إني خلّصت".
2. `async(() -> {...; B.put();})`: نفس الشي لـ Task B، وبيطلق الحدث `B`.
3. `asyncAwait(A, () -> {...})`: Task C ما بتبلّش تنفيذها **إلا بعد** ما الحدث `A` ينطلق.
4. `asyncAwait(A, B, () -> {...})`: Task D بتستنى **الحدثين معاً** (`A` و `B`) قبل ما تبلّش.
5. `asyncAwait(B, () -> {...})`: Task E بتستنى بس الحدث `B`.

#### 📖 الشرح: اقرأ المخطط كالتالي
كل سهم بالرسمة بيمثل اعتمادية: `A → C` تعني "C ما بتقدر تبلّش قبل ما A تخلص وتطلق حدثها". الميزة الكبيرة هون: **الاعتماديات صريحة ومكتوبة بوضوح** بالكود (`asyncAwait(A, B, ...)`) — عكس `Future.get()` اللي فيها الاعتمادية **ضمنية**، مخبّأة جوا جسم المهمة نفسها ومش واضحة من أول نظرة على توقيع الدالة.

#### 🤔 تفعيل الفهم
لو بدنا نضيف Task F بتعتمد على C و D معاً، كيف نكتبها؟ (جاوب: `asyncAwait(C, D, () -> {/* Task F */});` — بالظبط نفس النمط، بس بأحداث مختلفة.)

#### 🎯 الملخص السريع
- `Computation Graph` = تمثيل صريح لاعتماديات المهام (عُقد + روابط).
- `async` = نفّذ مهمة وأطلق حدث بالنهاية (`.put()`).
- `asyncAwait(events..., task)` = نفّذ المهمة بس بعد ما كل الأحداث المذكورة تنطلق.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف خاصية غريبة بس مهمة: **ترتيب كتابة هالأسطر بالكود مش مهم إطلاقاً**!

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
افتراض إنو `asyncAwait` بس شكل تاني من `Future.get()` بلا فرق حقيقي.

#### الفهم الصحيح ✅:
الفرق الحاسم: `Future.get()` بتخبّي الاعتمادية **جوا** جسم الدالة (لازم تقرأ الكود بالكامل لتعرف شو بتعتمد عليه المهمة)، بينما `asyncAwait(A, B, task)` بتحط الاعتمادية **بالتوقيع نفسه** — واضحة ومباشرة من أول قراءة، وهاد يلي بيخلي بناء الرسمة (`Computation Graph`) تلقائياً وواضحاً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> The data flow parallelism model is to specify parallel programs as computation graphs. A simple data flow graph is consisted of five nodes and four edges: A → C, A → D, B → D, B → E. While futures can be used to generate such a computation graph, e.g., by including calls to A.get() and B.get() in task D, the computation graph edges are implicit in the get() calls when using futures. Instead, we introduced the asyncAwait notation to specify a task along with an explicit set of preconditions (events that the task must wait for before it can start execution), with this approach, the program can be generated directly from the computation graph as follows: [كود async/asyncAwait]

</details>

---

### 5.2. ترتيب الأسطر غير مهم — وخطر "الـ Deadlock" بنسيان put()
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1", group: "5.1-5.2"} -->

#### 💡 الفكرة الأساسية
**بما إنو الرسمة معرّفة بالاعتماديات نفسها (مش بترتيب الأسطر)، فيك تكتب `async`/`asyncAwait` بأي ترتيب وبيضل نفس المعنى — بس لو نسيت `.put()` لحدث، أي مهمة مستنية إياه رح تعلق للأبد.**
*(وبعد ما فهمنا شكل الـ Computation Graph، هلق منشوف خاصيتين مهمتين إله.)*

---

#### 💻 الكود (نفس البرنامج، ترتيب مختلف كلياً)
```java
asyncAwait(A, () -> {/* Task C */} );     // Only execute task after event A is triggered
asyncAwait(A, B, () -> {/* Task D */} );  // Only execute task after events A, B are triggered
asyncAwait(B, () -> {/* Task E */} );     // Only execute task after event B is triggered
async( () -> {/* Task A */; A.put(); } ); // Complete task and trigger event A
async( () -> {/* Task B */; B.put(); } ); // Complete task and trigger event B
```

#### شرح الكود سطراً بسطر
1-3. نفس تعريفات Task C و D و E من قبل، بس هلق مكتوبين **قبل** تعريف Task A و B بالكود.
4-5. تعريف Task A و B، بس متأخرين بالترتيب النصي عن المهام اللي بتعتمد عليهم.

#### 📖 الشرح
النقطة الجوهرية: هاد البرنامج **نفس المعنى تماماً** متل النسخة بفقرة 5.1، رغم إنو الترتيب النصي انقلب بالكامل. السبب: زي ما رسمة (`Graph`) فيك تعرّفها بسرد حوافها (edges) بأي ترتيب وبتضل نفس الرسمة، برنامج الـ `Data Flow` كمان بيتحدد بـ **الاعتماديات نفسها** (مين بينتظر مين)، مش بترتيب كتابة الأسطر. النظام (الـ `Runtime`) هو يلي بيقرر فعلياً إمتى ينفذ كل مهمة حسب توفر أحداثها.

#### 🎯 الملخص السريع
- ترتيب أسطر `async`/`asyncAwait` بالكود **لا يؤثر** على معنى البرنامج.
- المعنى محدد بس بالاعتماديات (مين بيستنى مين).
- الخطر: نسيان `.put()` = حدث ما بينطلق أبداً = أي مهمة مستنية إياه بتعلق للأبد (شكل من `Deadlock`).

#### 📚 التطبيق
هاد آخر مفهوم بالمحاضرة — بالمحاضرة الجاية رح تشوف كيف هالفكرة بتتوسع لأنماط تزامن مختلفة تماماً زي `Isolated Constructs` و `Actors`.

#### الفهم الخاطئ ❌:
افتراض إنو نسيان `.put()` رح يسبب خطأ واضح (`Exception`) بيوقف البرنامج فوراً.

#### الفهم الصحيح ✅:
نسيان `.put()` **ما بيرمي أي استثناء** — البرنامج ببساطة بيعلّق (`hang`) لأنو أي مهمة `asyncAwait` مستنية هالحدث رح تفضل منتظرة للأبد، بدون أي رسالة خطأ توضح السبب. هاد شكل من أشكال "غياب التقدم" (`lack of progress`) شبيه بمفهوم `Deadlock`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Interestingly, the order of the above statements is not significant. Just as a graph can be defined by enumerating its edges in any order, the above data flow program can be rewritten as follows, without changing its meaning. Finally, the power and elegance of data flow parallel programming is accompanied by the possibility of a lack of progress that can be viewed as a form of "deadlock" if the program omits a put() call for signaling an event.

</details>

---

# الجزء الثاني (تكملة): ملخص شامل — قراءة بديلة كاملة

## ملخص شامل — Data Flow Synchronization and Pipelining

خلّينا نبلّش من نقطة البداية: ليش أصلاً محتاجين نطوّر أدوات تزامن أذكى من `Barrier` العادي؟ لأنو `Barrier` — رغم بساطته — عنده مشكلة: بيوقف **كل** الخيوط عند نقطة واحدة، حتى لو بعضها ما إله علاقة ببعض. هاي المحاضرة كلها قصة تحسين هالفكرة، خطوة-خطوة، لحد ما توصل لنموذج مختلف كلياً بآخرها.

أول خطوة: `Split-Phase Barrier`، أو اسمه التاني `Fuzzy Barrier`. الفكرة بسيطة كتير: بدل ما نستخدم `ph.arriveAndAwaitAdvance()` اللي بتوقف الخيط فوراً بمجرد ما تنادى، منقسمها لخطوتين — `ph.arrive()` (سجّل وصولك واستمر) و `ph.awaitAdvance(phase)` (هلق فعلياً استنى). ليش هاد مهم؟ لأنو بين الخطوتين، فيك تحط أي شغل مستقل — زي `lookup(i)` بمثال المحاضرة — يصير بالتوازي مع لحظة الانتظار نفسها، بدل ما يضيع وقت الخيط وهو واقف بلا فايدة.

من هون منوصل لفكرة أكبر: `Point-to-Point Synchronization`. إذا `Phaser` واحد قسمناه لمرحلتين، ليش ما نروح خطوة أبعد ونعمل `Phaser` **منفصل لكل خيط**؟ هيك كل خيط بيقدر ينتظر بس الخيوط اللي فعلاً محتاج نتيجتها، مش الكل. مثال المحاضرة وضّح هاد كويس: 3 مهام (Task 0, 1, 2)، كل وحدة إلها `Phaser` خاص فيها (`ph0`, `ph1`, `ph2`)، وكل مهمة بتنتظر بس الـ `Phaser`(ات) يلي فعلاً محتاجتها. النتيجة: `Span` (المسار الحرج) انخفض من 6 وحدات زمن (لو استخدمنا `Barrier` عام) إلى 5 وحدات بس (باستخدام `Point-to-Point`) — تحسين حقيقي بلا أي تغيير بكمية الشغل الكلي.

بعدها المحاضرة وريتنا مثال عملي أكبر: `Parallel Iterative Averaging`. تخيل مصفوفة كبيرة، وكل عنصر بيحتاج يحسب قيمة جديدة بناءً على متوسط جيرانه المباشرين (شمال ويمين) من التكرار السابق. لو استخدمنا `Barrier` عام هون، كل عنصر لازم ينتظر **كل** عناصر المصفوفة تخلص قبل ما يبلّش التكرار الجاي — وهاد إسراف كبير، لأنو أنا بس محتاج جيراني! بـ `Point-to-Point`، كل عنصر بيهيّئ `Phaser` خاص فيه، وبس ينتظر جاره الشمال وجاره اليمين. الرسمة بالمحاضرة (خط أحمر واحد للـ `Barrier` مقابل أسهم متقاطعة للـ `Point-to-Point`) بتلخص هالفكرة بصرياً بشكل ممتاز.

الخطوة التالية أخدت نفس المبدأ ("انتظر بس اللي محتاجه فعلاً") وطبّقته بسياق مختلف كلياً: `Pipeline Parallelism`. فكّرها متل خط إنتاج بمصنع — كل مرحلة (`Stage`) بتعالج جزء من الشغل، والسيارة التالية ما لازم تستنى السيارة الأولى تخلص من **كل** المحطات، بس تستنى وصولها لأول محطة. هيك، بأي لحظة معينة، عدة عناصر بيانات مختلفة شغالين على مراحل مختلفة بنفس الوقت — وهاد بالظبط جوهر التوازي هون. المحاضرة وضّحت هالفكرة بمثال حقيقي: `Pipeline` طبي فيه 3 مراحل (`denoising`, `registration`, `segmentation`).

ولحساب أداء الـ `Pipeline` رياضياً، عندنا 3 قيم أساسية لازم تحفظها منيح: `WORK = n × p` (مجموع الشغل لو نفّذناه تسلسلياً، `n` عدد عناصر البيانات و `p` عدد المراحل)، `CPL = n + p - 1` (المسار الحرج، وفيه `p-1` خطوة "تعبئة" بالبداية زائد `n` خطوة معالجة فعلية)، و `PAR = WORK/CPL = np/(n+p-1)` (أفضل تسريع نظري ممكن). القيمة دي عندها 3 حالات مهمة: لو `p=1` (مرحلة وحدة) فـ `PAR=1` (منطقي، مافي توازي أصلاً). لو `n=1` (عنصر بيانات وحيد) فـ `PAR=1` كمان (ما في "تدفق" مستفيد من تعدد المراحل). أما لو `n` أكبر بكثير من `p` (يعني `n >> p`)، فـ `PAR` بتقترب من `p` — أفضل حالة ممكنة، لأنو تأثير "التعبئة" بيصير مهمل مقارنة بحجم الشغل الكامل. مثلاً لو `n=100` و `p=10`، بتطلع `WORK=1000`، `CPL=109`، و `PAR≈9.17` — قريبة جداً من الـ 10 المثالية.

وتنفيذ الـ `Pipeline` بالكود بسيط جداً بمجرد ما تفهم `Point-to-Point`: كل مرحلة `i` عندها حلقة `while` بتستنى المرحلة `i-1` (لو موجودة) عن طريق `ph[i-1].awaitAdvance()`، بعدين تعالج المدخل، وبعدين تبلّغ المرحلة `i+1` عن طريق `ph[i].arrive()`. نفس النمط بالظبط يلي شفناه بمثال المصفوفة، بس هون على مستوى مراحل معالجة بدل عناصر بيانات متجاورة.

وآخر موضوع بالمحاضرة نقلنا لعالم مختلف كلياً: `Data Flow Parallelism`. لحد هلق، كل الأدوات (`Phaser`, `Point-to-Point`, `Pipeline`) كانت بتحدد **متى ينتظر الخيط** بشكل صريح داخل الكود. بـ `Data Flow`، بننعكس الموضوع: بدل ما نكتب "استنى هون"، منعرّف **رسمة اعتماديات** (`Computation Graph`) بالكامل — مين بيعتمد على مين — والنظام هو يلي بيرتب التنفيذ. أداة `asyncAwait` هي المفتاح هون: `async(() -> {task; X.put();})` بتنفذ مهمة وتطلق حدث بالنهاية، و `asyncAwait(A, B, () -> {task})` بتنفذ مهمة بس بعد ما الأحداث `A` و `B` تنطلق. الميزة الكبيرة مقارنة بـ `Future.get()`: الاعتمادية هون **صريحة ومكتوبة بوضوح** بتوقيع الاستدعاء نفسه، مش مخبّأة جوا جسم المهمة.

وخاصية غريبة بس منطقية جداً بمجرد ما تفهمها: **ترتيب كتابة أسطر `async`/`asyncAwait` بالكود مش مهم إطلاقاً!** بالظبط متل ما فيك تعرّف رسمة بسرد حوافها (edges) بأي ترتيب وبتضل نفس الرسمة، برنامج الـ `Data Flow` بيتحدد بالاعتماديات نفسها، مش بترتيب النص. بس فيه خطر لازم تنتبهله: لو نسيت تنادي `.put()` لحدث معين، أي مهمة مستنية هالحدث رح تعلق **للأبد** — بلا أي `Exception` ولا رسالة خطأ توضحلك السبب. هاد شكل من أشكال "غياب التقدم" اللي المحاضرة سمّته صراحة "نوع من الـ `Deadlock`".

**إيش بيطلع بالامتحان؟** غالباً أسئلة حسابية على `WORK`/`CPL`/`PAR` بأرقام محددة، سؤال تفريق بين `arrive()` لحالها و `arriveAndAwaitAdvance()`، سؤال يقارن `Barrier` مقابل `Point-to-Point` بحساب الـ `Span` بمثال شبيه بمثال Task 0/1/2، وسؤال كود عن `Data Flow` يطلب منك تحدد الترتيب الصحيح للتنفيذ (أو تكتشف مشكلة `.put()` منسية).

**الربط مع المحاضرة الجاية:** كل الأدوات اللي شفناها هون (`Phaser`, `Point-to-Point`, `Pipeline`, `Data Flow`) بتحل مشكلة "التنسيق الصحيح" بين خيوط تعرف بعضها البعض بشكل مباشر. المحاضرة الجاية غالباً رح تفتح على أنماط تزامن مختلفة كلياً — زي `Isolated Constructs` و `Actors` — يلي بتحل مشاكل تزامن من زاوية مختلفة تماماً.

---

# الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium)
**السؤال:** شو الفرق الأساسي بين `ph.arriveAndAwaitAdvance()` و استخدام `ph.arrive()` منفردة؟

أ) لا فرق، الاثنين بيوقفو الخيط فوراً
ب) `arriveAndAwaitAdvance()` تسجيل وانتظار بخطوة وحدة، أما `arrive()` تسجّل الوصول فقط وترجع فوراً بدون توقف
ج) `arrive()` بترمي `Exception` إذا استُخدمت لحالها
د) `arriveAndAwaitAdvance()` تُستخدم فقط مع `Point-to-Point Synchronization`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): فيه فرق جوهري — `arrive()` لحالها ما بتوقف الخيط إطلاقاً
- ✅ ب): هاد بالضبط الفرق اللي بيسمح ببناء `Split-Phase Barrier` — تقسيم التسجيل عن الانتظار
- ❌ ج): `arrive()` لا ترمي أي استثناء، هي عملية صحيحة ومسموحة لحالها
- ❌ د): `arriveAndAwaitAdvance()` أداة عامة، مش مقتصرة على `Point-to-Point`

---

### السؤال 2 (medium)
**السؤال:** بمثال `Point-to-Point Synchronization` (Task 0/1/2 بالمحاضرة)، ليش تم تهيئة كل `Phaser` (`ph0`, `ph1`, `ph2`) بـ `party count = 1`؟

أ) لأنو الحد الأقصى المسموح لـ `Phaser` هو طرف واحد
ب) لأنو خيط واحد بس هو يلي بيسجل وصوله (`arrive()`) على كل `Phaser`
ج) لأنو `Phaser` بلغة Java ما بيدعم أكتر من طرف واحد
د) غلط طباعي بالمحاضرة، الصح 3

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `Phaser` بيقدر يستقبل أي عدد أطراف، ما في حد أقصى بـ 1
- ✅ ب): كل `Phaser` مخصص لمهمة وحدة تسجّل وصولها، وباقي المهام بتنتظره بـ `awaitAdvance()` بدون ما تسجل هي وصول على نفس الـ `Phaser`
- ❌ ج): `Phaser` بلغة Java بيدعم أي عدد أطراف عادةً
- ❌ د): هاد صحيح ومقصود بالمحاضرة، مش غلط طباعي

---

### السؤال 3 (hard) — حسابي
**السؤال:** بمثال `Point-to-Point Synchronization`: `Task 0` تكلفتها `1a=1` ثم `4a=3`، `Task 1` تكلفتها `1b=2` ثم `5b=2`، `Task 2` تكلفتها `1c=3` ثم `4c=1`. لو استخدمنا `Barrier` عام بدل `Point-to-Point`، شو قيمة الـ `Span` الناتجة؟

أ) 4
ب) 5
ج) 6
د) 9

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): أقل من الحد الأدنى المنطقي، ما بتراعي أطول مهمة أولية
- ❌ ب): هاي قيمة `Point-to-Point` وليس `Barrier` — الأصغر لأنو `Barrier` بينتظر الكل
- ✅ ج): مع `Barrier`، كل المهام لازم توصل نقطة وحدة قبل ما تكمل — أطول مهمة أولية هي `Task 2` بتكلفة `3`، وبعد الحاجز أطول مهمة متبقية هي `Task 1` بتكلفة `2` → `3 + 2 + 1 = 6` (الـ `1` هي أطول تكلفة متبقية بعد ذلك من مسار `Task 0`، لكن الأهم هو المسار الحرج الكلي = 6 كما ورد صراحة بالمحاضرة)
- ❌ د): هذا مجموع كل التكاليف تسلسلياً (`Work`)، وليس `Span`

---

### السؤال 4 (medium)
**السؤال:** بمثال `Parallel Iterative Averaging`، ليش نمط `Point-to-Point` أسرع من `Barrier` هون تحديداً؟

أ) لأنو `Point-to-Point` بيلغي الحاجة لحساب المتوسط أصلاً
ب) لأنو كل عنصر بيعتمد بس على جيرانه المباشرين، مش على كامل المصفوفة
ج) لأنو `Phaser` أسرع من `Barrier` بشكل عام دايماً بغض النظر عن الاعتماديات
د) لأنو `Barrier` غير مدعوم أصلاً بمسائل المصفوفات

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): الحساب نفسه مطلوب بكلا النمطين، الفرق فقط بالتزامن
- ✅ ب): بما إنو كل عنصر بيحتاج بس جاره الشمال واليمين، انتظار كامل المصفوفة (متل `Barrier`) بيصير إسراف غير ضروري
- ❌ ج): `Point-to-Point` أسرع بس لما الاعتماديات فعلياً محلية، مش دايماً بشكل مطلق
- ❌ د): `Barrier` مدعوم تماماً، بس أقل كفاءة بهاد السياق تحديداً

---

### السؤال 5 (hard) — حسابي
**السؤال:** لدينا `Pipeline` فيه `p = 5` مراحل، ومعالج `n = 20` عنصر بيانات. ما هي قيمة `Ideal Parallelism (PAR)` بأقرب رقم عشري؟

أ) 4.17
ب) 5.00
ج) 20.00
د) 100.00

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): `WORK = n×p = 20×5 = 100`، `CPL = n+p-1 = 20+5-1 = 24`، `PAR = 100/24 ≈ 4.17`
- ❌ ب): هاي قيمة `p` نفسها (الحد الأعلى النظري لو `n` كانت لانهائية)، مش القيمة الفعلية هون
- ❌ ج): هاي قيمة `n` نفسها، خطأ بفهم المعادلة
- ❌ د): هاي قيمة `WORK` (بسط الكسر) بدون قسمة على `CPL` — خطأ حسابي شائع (نسيان القسمة)

---

### السؤال 6 (medium)
**السؤال:** حسب المحاضرة، متى يقترب `Ideal Parallelism (PAR)` من قيمته القصوى `p`؟

أ) لما `n = p`
ب) لما `n = 1`
ج) لما `n` أكبر بكثير من `p` (`n >> p`)
د) لما `p = 1`

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): عند `n=p` القيمة أقل من `p` بشكل ملحوظ لأنو تأثير `p-1` بالمقام لسا كبير نسبياً
- ❌ ب): عند `n=1`، `PAR` بتنحدر إلى `1`، عكس المطلوب
- ✅ ج): كلما `n` أكبر بكثير من `p`، أثر خطوات "التعبئة" (`p-1`) بيصير مهمل مقارنة بـ `n`، فـ `PAR` بتقترب من `p`
- ❌ د): عند `p=1`، `PAR` بتنحدر إلى `1` أيضاً — أسوأ حالة، مش أفضلها

---

### السؤال 7 (hard) — سيناريو كود
**السؤال:** بالكود التالي لمرحلة `Pipeline`:
```java
while (there is an input to be processed) {
    if (i > 0) ph[i - 1].awaitAdvance();
    process input;
    ph[i].arrive();
}
```
إذا كانت هاي المرحلة أول مرحلة بالـ `Pipeline` (`i = 0`)، أي من التالي يصف سلوكها بدقة؟

أ) بتنتظر المرحلة `ph[-1]` قبل ما تبلّش
ب) بتبلّش المعالجة فوراً بدون أي انتظار، لأنو الشرط `i > 0` غير محقق
ج) بترمي `Exception` لأنو `i - 1` قيمة سالبة
د) بتنتظر كل المراحل تخلص قبل ما تبلّش

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا يوجد `ph[-1]` أصلاً، والشرط `if (i > 0)` بيمنع الوصول لهاد السطر
- ✅ ب): بما إنو `i = 0`، الشرط `i > 0` خاطئ (`false`)، فالكود بيتخطى `awaitAdvance()` مباشرة ويبلّش `process input` فوراً — منطقي لأنو أول مرحلة ما إلها مرحلة سابقة تنتظرها
- ❌ ج): الشرط `if` بيحمي من الوصول لهاي الحالة أصلاً، ما في استثناء
- ❌ د): هاد سلوك `Barrier` عام، مش `Point-to-Point` المستخدم هون

---

### السؤال 8 (medium)
**السؤال:** ما الفرق الحاسم بين `Barrier` عام و `Point-to-Point Synchronization`؟

أ) `Barrier` أسرع دايماً بغض النظر عن حجم المسألة
ب) `Point-to-Point` بيخلي كل خيط ينتظر بس الخيوط اللي فعلاً معتمد عليها، بينما `Barrier` بيخلي الكل ينتظر الكل
ج) `Point-to-Point` لا يمكن تطبيقه إلا بمسائل المصفوفات
د) `Barrier` يستخدم `Phaser` بينما `Point-to-Point` لا يستخدمه أبداً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): العكس صحيح غالباً لما الاعتماديات محدودة — `Point-to-Point` أسرع بتلك الحالات
- ✅ ب): هاد الفرق الجوهري المذكور صراحة بالمحاضرة عبر مثال Task 0/1/2 ومثال المصفوفة
- ❌ ج): `Point-to-Point` قابل للتطبيق بأي سياق فيه اعتماديات محدودة، مش بس المصفوفات
- ❌ د): كلاهما ممكن يُبنى باستخدام `Phaser`، الفرق بعدد وطريقة تهيئة `Phaser` objects

---

### السؤال 9 (hard) — سيناريو كود
**السؤال:** بالكود التالي من `Data Flow Parallelism`:
```java
async( () -> {/* Task A */} ); // NOTE: missing A.put()
asyncAwait(A, () -> {/* Task C */} );
```
أي من التالي يصف سلوك هذا الكود تحديداً؟

أ) الكود سينفذ بشكل طبيعي، لأنو `asyncAwait` بتتجاهل غياب `.put()`
ب) `Task C` رح تنتظر للأبد لأنو الحدث `A` ما بينطلق أبداً، وهاد شكل من `Deadlock`
ج) سيُرمى `Exception` فوراً عند تشغيل `asyncAwait(A, ...)`
د) `Task C` ستنفذ فوراً بدون انتظار لأنو `Task A` لا تحتوي أي كود

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `asyncAwait` تعتمد بالكامل على `.put()` لإطلاق الحدث، وبدونها ما رح تكمل أبداً
- ✅ ب): بما إنو `A.put()` ناقصة، الحدث `A` ما بينطلق، فـ `Task C` رح تفضل مستنية للأبد — هاد بالضبط الوصف اللي ذكرته المحاضرة كـ "نوع من الـ Deadlock" (غياب تقدم)
- ❌ ج): ما في `Exception` أو رسالة خطأ، البرنامج بس بيعلّق بصمت
- ❌ د): محتوى `Task A` لا علاقة له بالانتظار — الانتظار مرتبط بالحدث `A.put()` حصراً وليس بمحتوى المهمة

---

### السؤال 10 (medium)
**السؤال:** أي من التالي يصف بشكل صحيح ميزة `asyncAwait` مقارنة بـ `Future.get()` لبناء `Computation Graph`؟

أ) `asyncAwait` أسرع دايماً بغض النظر عن السياق
ب) `asyncAwait` تجعل الاعتماديات صريحة وواضحة بتوقيع الاستدعاء، بينما `Future.get()` تخفيها داخل جسم المهمة
ج) `Future.get()` لا يمكن استخدامها إطلاقاً لبناء `Computation Graph`
د) `asyncAwait` تستبدل الحاجة لأي نوع من `Threads`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): المحاضرة لا تذكر أي فرق بالأداء، الفرق هون بالوضوح البنيوي فقط
- ✅ ب): هاي الميزة المذكورة صراحة بالمحاضرة — الاعتماديات ضمنية (implicit) مع `get()` بس صريحة (explicit) مع `asyncAwait`
- ❌ ج): المحاضرة تذكر إنو `Future` ممكن يولّد نفس الرسمة، بس بشكل ضمني
- ❌ د): كلا الأداتين بتشتغلو فوق نموذج مهام موازية، وليس بديل عن `Threads` بالكامل

---

### السؤال 11 (medium)
**السؤال:** بمثال `Computation Graph` بالمحاضرة (`A → C`, `A → D`, `B → D`, `B → E`)، أي مهمة بتستنى **حدثين معاً** قبل ما تبلّش؟

أ) `Task C`
ب) `Task E`
ج) `Task D`
د) `Task A`

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): `Task C` بتستنى حدث `A` بس (`asyncAwait(A, ...)`)
- ❌ ب): `Task E` بتستنى حدث `B` بس (`asyncAwait(B, ...)`)
- ✅ ج): `Task D` بتستنى الحدثين `A` و `B` معاً (`asyncAwait(A, B, ...)`) — الوحيدة اللي إلها اعتماديتين
- ❌ د): `Task A` مهمة مستقلة (`async`)، ما بتستنى أي حدث أصلاً

---

### السؤال 12 (hard)
**السؤال:** لو أعدنا كتابة برنامج `Data Flow` بترتيب مختلف كلياً للأسطر (مثلاً حطينا `asyncAwait` قبل `async`)، شو يصير؟

أ) البرنامج ينهار بخطأ ترجمة (`Compile Error`)
ب) معنى البرنامج يبقى نفسه تماماً، لأنو الاعتماديات محددة بالأحداث نفسها وليس بترتيب الأسطر
ج) البرنامج يعمل، لكن بنتيجة مختلفة عن الترتيب الأصلي
د) الأحداث تنطلق بترتيب معكوس تلقائياً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا يوجد أي خطأ ترجمة — الترتيب النصي غير مرتبط بصحة اللغة هنا
- ✅ ب): هاد بالضبط ما أكدته المحاضرة — "the order of the above statements is not significant" — تماماً متل تعريف رسمة بسرد حوافها بأي ترتيب
- ❌ ج): النتيجة نفسها بالضبط، لأنو التنفيذ الفعلي محكوم بالأحداث وليس بترتيب الكتابة
- ❌ د): لا علاقة لترتيب الكتابة بترتيب إطلاق الأحداث فعلياً

---

### السؤال 13 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
Phaser ph = new Phaser(n);
forall (i : [0:n-1]) {
    print HELLO, i;
    int phase = ph.arrive();
    myId = lookup(i);
    ph.awaitAdvance(phase);
    print BYE, myId;
}
```
لو استبدلنا `int phase = ph.arrive(); ... ph.awaitAdvance(phase);` بـ `ph.arriveAndAwaitAdvance();` مباشرة قبل `myId = lookup(i);`، أي من التالي يصف الفرق بسلوك الأداء؟

أ) لا فرق إطلاقاً بأي حال من الأحوال
ب) `lookup(i)` بتنفّذ بعد ما كل الخيوط توصل، بدل ما تنفذ بالتوازي مع الانتظار — احتمال بطء أكبر
ج) الكود لن يترجم أصلاً بهذا الشكل
د) `lookup(i)` رح تنفذ مرتين بالخطأ

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): فيه فرق حقيقي بالأداء المحتمل، حسب طول `lookup(i)` وعدد الخيوط
- ✅ ب): نقل `lookup(i)` بعد `arriveAndAwaitAdvance()` بيمنعها من التوازي مع الانتظار، وهاد بالضبط عكس فكرة `Split-Phase Barrier` اللي شرحتها المحاضرة
- ❌ ج): الكود صحيح نحوياً بكلا الحالتين، الفرق فقط بالأداء المحتمل
- ❌ د): `lookup(i)` تُستدعى مرة واحدة بكلا النسختين، لا يوجد استدعاء مضاعف

---

### السؤال 14 (medium)
**السؤال:** أي من التالي يصف بدقة استخدام `Barriers` لـ `Point-to-Point Synchronization` بمثال `Iterative Averaging`؟

أ) استخدام `Barrier` واحد يجمع كل عناصر المصفوفة بنقطة انتظار واحدة
ب) استخدام مصفوفة من `Phaser` objects منفصلة، وكل عنصر ينتظر بس `Phaser` جيرانه المباشرين
ج) عدم استخدام أي أداة تزامن إطلاقاً بهذا المثال
د) استخدام `synchronized` blocks فقط بدون `Phaser`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هاد وصف `Barrier` العام، وليس `Point-to-Point` — المحاضرة قارنت بينهم صراحة
- ✅ ب): هاد بالضبط الكود المعطى بالمحاضرة — `Phaser[] ph` وكل عنصر بيستدعي `ph[i-1].awaitAdvance()` و `ph[i+1].awaitAdvance()`
- ❌ ج): المحاضرة استخدمت `Phaser` بوضوح لهاي المسألة
- ❌ د): لم يُذكر `synchronized` إطلاقاً بهذا السياق بالمحاضرة

---

### السؤال 15 (hard) — حسابي
**السؤال:** برنامج `Pipeline` عنده `Work = 200` و `Span (CPL) = 25`. ما هي أقصى قيمة `Ideal Parallelism (PAR)` ممكنة؟

أ) 5
ب) 8
ج) 25
د) 200

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): قيمة أقل من الناتج الصحيح، خطأ حسابي بالقسمة
- ✅ ب): `PAR = WORK / CPL = 200 / 25 = 8`
- ❌ ج): هاي قيمة `CPL` نفسها (المقام)، وليست ناتج القسمة
- ❌ د): هاي قيمة `WORK` نفسها (البسط) بدون قسمة على `CPL`

---

### السؤال 16 (hard)
**السؤال:** اذكر الفرق الحاسم بين `Pipeline Parallelism` و `Task Parallelism` العادي (مهام مستقلة بالكامل)؟

أ) لا فرق، كلاهما نفس المفهوم بأسماء مختلفة
ب) بـ `Pipeline`، كل مرحلة تعتمد على ناتج المرحلة السابقة لنفس عنصر البيانات، بينما بـ `Task Parallelism` المهام مستقلة تماماً عن بعضها
ج) `Pipeline` لا يستخدم أي نوع من `Synchronization` إطلاقاً
د) `Task Parallelism` أسرع دائماً من `Pipeline Parallelism`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): يوجد فرق جوهري بالاعتماديات بين المفهومين
- ✅ ب): هاد بالضبط ما ذكرته "أشهر الأخطاء الشائعة" — الخلط بين النمطين لتجاهل الاعتمادية التسلسلية بالـ `Pipeline`
- ❌ ج): `Pipeline` يعتمد بشكل أساسي على `Point-to-Point Synchronization` بين المراحل (`ph[i-1].awaitAdvance()`)
- ❌ د): الأداء يعتمد على طبيعة المسألة نفسها، لا يوجد تعميم مطلق كهذا

---

# الجزء الثالث (تكملة): بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** شو الفرق بين `ph.arrive()` و `ph.arriveAndAwaitAdvance()`؟
**A:** `arrive()` تسجل الوصول وترجع فوراً بدون توقف، بينما `arriveAndAwaitAdvance()` تسجل وتنتظر معاً بخطوة واحدة.

### البطاقة 2
**Q2:** ما هو الاسم البديل لـ `Split-Phase Barrier`؟
**A:** `Fuzzy Barrier`.

### البطاقة 3
**Q3:** بمثال Task 0/1/2، بكم وحدة زمن انخفض الـ `Span` عند استخدام `Point-to-Point` مقارنة بـ `Barrier`؟
**A:** انخفض من 6 وحدات إلى 5 وحدات (فرق وحدة زمنية واحدة).

### البطاقة 4
**Q4:** كم طرف (`party`) عادة تُهيّأ به كل `Phaser` بمثال `Point-to-Point Synchronization`؟
**A:** طرف واحد فقط (`party count = 1`)، لأنو مهمة وحدة بتسجل الوصول على كل `Phaser`.

### البطاقة 5
**Q5:** بمثال `Iterative Averaging`، شو بيحتاج كل عنصر بالمصفوفة عشان يحسب قيمته الجديدة؟
**A:** قيمة جاره الشمال وجاره اليمين من التكرار السابق فقط.

### البطاقة 6
**Q6:** ما معادلة `Work` بالـ `Pipeline`؟
**A:** `WORK = n × p`، حيث `n` عدد عناصر البيانات و`p` عدد مراحل الـ `Pipeline`.

### البطاقة 7
**Q7:** ما معادلة `CPL` (المسار الحرج) بالـ `Pipeline`؟
**A:** `CPL = n + p - 1`.

### البطاقة 8
**Q8:** إلى أي قيمة يقترب `Ideal Parallelism (PAR)` عندما `n >> p`؟
**A:** يقترب من `p` (عدد المراحل) — أفضل حالة ممكنة.

### البطاقة 9
**Q9:** ما هي الأداة المستخدمة بالكود لتنفيذ مهمة وإطلاق حدث بعد انتهائها بنموذج `Data Flow`؟
**A:** `async(() -> {task; Event.put();})`.

### البطاقة 10
**Q10:** كم عدد الأحداث اللي بتستنيها `Task D` بمثال `Computation Graph` بالمحاضرة؟
**A:** حدثين معاً — `A` و`B` (`asyncAwait(A, B, ...)`).

### البطاقة 11
**Q11:** شو بيصير لو نسينا نستدعي `.put()` لحدث معين بنموذج `Data Flow`؟
**A:** أي مهمة `asyncAwait` مستنية هالحدث بتفضل عالقة للأبد — شكل من "غياب التقدم" شبيه بـ `Deadlock`.

### البطاقة 12
**Q12:** هل يؤثر ترتيب كتابة أسطر `async`/`asyncAwait` على معنى برنامج الـ `Data Flow`؟
**A:** لا، ترتيب الأسطر غير مهم إطلاقاً — المعنى محدد بالاعتماديات نفسها، تماماً متل تعريف رسمة بسرد حوافها بأي ترتيب.

### البطاقة 13
**Q13:** ما الميزة الأساسية لـ `asyncAwait` مقارنة بـ `Future.get()`؟
**A:** `asyncAwait` تجعل الاعتماديات صريحة بتوقيع الاستدعاء نفسه، بينما `Future.get()` تخفيها داخل جسم المهمة (اعتمادية ضمنية).

---

# الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)
```java
Phaser ph = new Phaser(n);
forall (i : [0:n-1]) {
    print HELLO, i;
    ph.arrive(); // NOTE: return value discarded
    myId = lookup(i);
    ph.awaitAdvance(phase); // ERROR: 'phase' undefined here
    print BYE, myId;
}
```
**الخطأ:** تم تجاهل القيمة اللي بترجعها `ph.arrive()` (رقم المرحلة)، وبعدين استُخدم متغيّر `phase` غير معرّف أصلاً بالسياق.
**التصحيح:**
```java
int phase = ph.arrive(); // capture the returned phase number
...
ph.awaitAdvance(phase); // use the captured phase
```

### سؤال تصحيح 2 (misconception)
```java
Phaser ph0 = new Phaser(3); // Task 0's phaser, initialized with 3 parties
// Task 0
ph0.arrive();
// Task 1 and Task 2 also call ph0.arrive() "just to be safe"
```
**الخطأ:** مفهوم خاطئ شائع — تهيئة `ph0` بـ `3` أطراف والسماح لأكتر من مهمة تسجّل وصولها عليه، رغم إنو المفروض `ph0` مخصص لـ `Task 0` بس (طرف واحد).
**التصحيح:** كل `Phaser` بمثال `Point-to-Point Synchronization` لازم يُهيّأ بـ `party count = 1`، وبس صاحبه (المهمة المسؤولة عنه) هي اللي تنادي `arrive()` عليه — الباقي بس تنادي `awaitAdvance()`.

### سؤال تصحيح 3 (return_check)
```java
double par = WORK / CPL; // n=20, p=5, WORK=100, CPL=24
System.out.println(par);
```
**الخطأ:** لو `WORK` و `CPL` كانوا معرّفين كـ `int`، القسمة `WORK / CPL` رح تنتج قسمة صحيحة (`Integer Division`) تقصّ الكسور، مش النتيجة العشرية الصحيحة `4.17`.
**التصحيح:**
```java
double par = (double) WORK / CPL; // force floating-point division
System.out.println(par); // now correctly prints ≈ 4.17
```

### سؤال تصحيح 4 (dead_code)
```java
forall (i : [1:n-1]) {
    for (iter : [0:nsteps-1]) {
        newX[i] = (oldX[i-1] + oldX[i+1]) / 2;
        ph[i].arrive();
        if (index > 1) ph[i-1].awaitAdvance(iter);
        if (index < n-1) ph[i+1].awaitAdvance(iter);
        swap pointers newX and oldX;
        return; // DEAD CODE ISSUE: added by mistake
    }
}
```
**الخطأ:** إضافة `return;` بنهاية جسم حلقة `for (iter ...)` بتوقف التنفيذ بعد أول تكرار بس — باقي تكرارات `nsteps` (كود ميت فعلياً، ما رح توصلها أبداً) وبتكسر صحة الحساب التكراري بالكامل.
**التصحيح:** إزالة `return;` بالكامل من داخل الحلقة عشان تكمل كل تكرارات `nsteps` بشكل طبيعي.

### سؤال تصحيح 5 (misconception)
```java
async( () -> {/* Task A */} ); // Task A does heavy computation
asyncAwait(A, () -> {/* Task C, depends on A's result */} );
```
**الخطأ:** مفهوم خاطئ شائع — الاعتقاد إنو مجرد كتابة `asyncAwait(A, ...)` كافية عشان تضمن `Task C` تشوف نتيجة `Task A` صحيحة، حتى لو `Task A` نسيت تستدعي `A.put()` بنهايتها.
**التصحيح:**
```java
async( () -> {/* Task A */; A.put(); } ); // MUST call A.put() to trigger the event
asyncAwait(A, () -> {/* Task C */} );
```

---

# الجزء الرابع (تكملة): ورقة المراجعة السريعة (Cheat Sheet)

## القواعد الذهبية

| # | القاعدة |
| --- | --- |
| 1 | `ph.arrive()` تسجّل الوصول بدون توقف، `ph.awaitAdvance(phase)` هي يلي فعلياً بتوقف الخيط |
| 2 | ضع الشغل المستقل بين `arrive()` و `awaitAdvance()` للاستفادة من `Split-Phase Barrier` |
| 3 | `Point-to-Point` أسرع من `Barrier` بس لما الاعتماديات الفعلية أقل من "الكل يحتاج الكل" |
| 4 | بمثال المصفوفات، كل `Phaser` مخصص لمالكه فقط (`party count = 1`)، والبقية تناديه بـ `awaitAdvance()` بس |
| 5 | `WORK = n×p`, `CPL = n+p-1`, `PAR = WORK/CPL` — احفظهم بهاد الترتيب بالضبط |
| 6 | `PAR` تتراوح دائماً بين `1` (أسوأ حالة) و `p` (أفضل حالة، عند `n >> p`) |
| 7 | ترتيب أسطر `async`/`asyncAwait` بالكود لا يؤثر على المعنى — الاعتماديات فقط هي المهمة |
| 8 | نسيان `.put()` لحدث = عالقة أبدية (شكل من `Deadlock`)، بدون أي `Exception` |

## مرجع سريع للمصطلحات والصيغ

| المصطلح | التعريف بسطر |
| --- | --- |
| `Split-Phase Barrier` / `Fuzzy Barrier` | حاجز مقسوم لمرحلتين (`arrive` + `awaitAdvance`) يسمح بشغل مستقل بالمنتصف |
| `Point-to-Point Synchronization` | كل خيط ينتظر بس الخيوط اللي فعلاً معتمد عليها، عبر `Phaser` objects منفصلة |
| `Pipeline Parallelism` | تقسيم معالجة عنصر بيانات لمراحل متتالية، تشتغل بالتوازي على عناصر مختلفة |
| `Data Flow Parallelism` | نموذج تزامن مبني على `Computation Graph` (رسمة اعتماديات) بدل ترتيب صريح |
| `asyncAwait(events, task)` | تنفيذ مهمة بعد ما كل الأحداث المذكورة تنطلق (`.put()`) |
| `WORK = n × p` | مجموع الشغل الكلي لو نُفّذ تسلسلياً بالكامل |
| `CPL = n + p - 1` | المسار الحرج (`Span`) — تعبئة `p-1` زائد معالجة `n` |
| `PAR = WORK / CPL` | التسريع النظري القصوى الممكن للـ `Pipeline` |

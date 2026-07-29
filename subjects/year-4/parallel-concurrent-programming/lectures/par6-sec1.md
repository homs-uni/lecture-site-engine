# المحاضرة 6 — Threads and Locks (الخيوط والأقفال)

> **المادة:** البرمجة المتوازية والمتزامنة (نظري) | **الموضوع:** الجزء الثاني — Concurrent Programming: كيف نخلي أكتر من خيط يشتغلو مع بعض بأمان، وكيف نتحكم بالوصول للبيانات المشتركة بينهم عن طريق `Thread` وأنواع الأقفال (`Locks`).

---

# الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 1. lecture_overview — عن ماذا هذه المحاضرة؟

هاي المحاضرة بتبلّش قسم جديد كلياً بالمادة، اسمه `Concurrent Programming`. لحد هلق كنا نحكي عن `Parallelism` (كيف نخلي المهمة تخلص أسرع باستخدام أكتر من معالج)، بس هلق رح نحكي عن `Concurrency`: كيف نخلي أكتر من خيط (`Thread`) يوصلو لنفس المورد المشترك بنفس الوقت من غير ما يصير تضارب. المحاضرة بتشرح إيش هو الـ `Thread` بلغة Java، دورة حياته (`Lifecycle`)، وكيف نديره (`start`, `join`)، وبعدين بتفتح موضوع الأقفال (`Locks`) اللي هي الأداة الأساسية لحماية البيانات المشتركة.

### 2. learning_objectives — ماذا ستقدر تعمل بعد هذه المحاضرة؟

- تفرّق بوضوح بين `Parallel` و `Concurrent` وتعرف ليش هما مفهومين مختلفين مش نفس الشي.
- تشرح ليش نحتاج `Concurrency` حتى على جهاز فيه معالج واحد بس.
- تكتب `Thread` بلغة Java بطريقتين (extends Thread، أو Runnable/lambda).
- تفرّق بين استدعاء `run()` مباشرة واستدعاء `start()` — وتعرف ليش الفرق مهم جداً.
- تفهم دورة حياة الخيط (`New → Runnable → Running → Terminated`).
- تستخدم `join()` عشان تخلي خيط يستنى خيط تاني يخلص.
- تفهم `synchronized` (الأقفال المهيكلة) وكيف بتمنع أكتر من خيط من الدخول لنفس المنطقة الحرجة بنفس الوقت.
- تحل مشكلة `Bounded Buffer` (Producer-Consumer) باستخدام `wait()` و `notify()`.

### 3. prerequisites — شو المفروض تعرفه قبل ما تبلّش

- أساسيات البرمجة بلغة Java (classes، objects، methods).
- مفهوم `Process` من نظم التشغيل: إنو كل برنامج شغّال بيتاخدله ذاكرة ومعالج خاص فيه من الـ OS.
- من المحاضرات السابقة بالمادة: مفهوم `Parallelism`، و `finish`/`async` من مكتبة HJ-lib (رح نقارن فيهم بهاي المحاضرة).

### 4. main_concepts — أهم المفاهيم بالمحاضرة

- **`Parallel` vs `Concurrent`:** الأول عن السرعة (استخدام معالجات متعددة)، الثاني عن التنسيق (وصول متزامن لمورد مشترك).
- **`Process`:** وحدة تنفيذ مستقلة ومعزولة، إلها ذاكرة خاصة فيها من الـ OS.
- **`Thread`:** "عملية خفيفة" (`lightweight process`) عندها stack خاص فيها بس بتقدر توصل لبيانات مشتركة مع خيوط تانية.
- **`Thread Lifecycle`:** أربع حالات — `New`، `Runnable`، `Running`، `Terminated`.
- **`start()` vs `run()`:** `start()` بيطلق خيط جديد فعلياً، `run()` بينفذ الكود عادي على نفس الخيط الحالي.
- **`join()`:** يجبر الخيط المستدعي ينتظر لحد ما الخيط التاني يخلص تنفيذه.
- **`Structured Locks` (`synchronized`):** أسلوب أقفال مبني على البلوكات، كل object إله قفل خاص فيه.
- **`wait()` / `notify()` / `notifyAll()`:** أدوات تنسيق بين الخيوط جوا القفل نفسه — تخلي خيط يستنى شرط معيّن.

### 5. connections — كيف تتصل هذه المحاضرة بالمحاضرات المجاورة

هاي المحاضرة هي أول محاضرة بالجزء الثاني (`Concurrent Programming`) بعد ما خلّصنا الجزء الأول (`Parallel Programming`: Task/Functional/Loop Parallelism وDataflow). لاحظ إنو المحاضرة بتقارن مباشرة كود `Thread`/`join` مع كود `finish`/`async` من HJ-lib اللي اتعلمناه بالجزء الأول — يعني هاي المحاضرة عم تبني جسر بين الاثنين: نفس فكرة "شغّل شي بالتوازي واستنى يخلص"، بس بطريقتين مختلفتين (خيوط Java الخام، مقابل مكتبة عالية المستوى). المحاضرة الجاية (Critical Sections and Isolation) رح تبني على مفهوم الأقفال هون وتوسّعه لمفاهيم أعمق زي الـ `Isolated Construct`.

### 6. common_mistakes — أشهر الأخطاء اللي بيقع فيها الطلاب

1. الخلط بين `start()` و `run()` — استدعاء `run()` مباشرة ما بيطلق خيط جديد، بس بينفذ الكود بشكل عادي (تسلسلي) على نفس الخيط الحالي.
2. الاعتقاد إنو `Parallel` و `Concurrent` نفس الشي — بينما الفرق الحقيقي هو الهدف (سرعة مقابل تنسيق وصول).
3. نسيان إنو `wait()` لازم يكون جوا حلقة `while` مش جوا `if` — لأنو ممكن الخيط يصحى بس الشرط لسا مش محقق.
4. الاعتقاد إنو `join()` ما فيها خطر — بينما الحقيقة إنو استخدام `join()` بشكل غلط (خيطين بعملو join على بعض) ممكن يسبب `Deadlock` حتى بدون أي `Data Race`.
5. الخلط بين `notify()` و `notifyAll()` — `notify()` بتصحي خيط واحد عشوائي بس، مش بالضرورة اللي بدك ياه.

---

# الجزء الثاني: الشرح التفصيلي

## 1. المقدمة: التوازي مقابل التزامن (Parallel vs Concurrent)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "lecture_5", group: "1.1-1.3"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (1.1 → 1.3) هي بوابة الدخول للجزء الثاني من المادة كلها: `Concurrent Programming`. رح نعرّف شو الفرق بين `Parallel` و `Concurrent`، ليش نحتاج تزامن أصلاً حتى بدون تسريع، وشو هو الـ `Process` اللي هو الوحدة الأساسية اللي بتشتغل عليها أنظمة التشغيل.

#### ⬅️ الربط مع السابق
بالجزء الأول اتعلمنا `Parallelism`: كيف نقسّم شغل على أكتر من معالج عشان يخلص أسرع (`Task`, `Functional`, `Loop Parallelism`). هلق رح نشوف مفهوم مختلف تماماً بالهدف، بس متشابه بالأدوات: `Concurrency`.

### 1.1. Parallel vs Concurrent
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "lecture_5", group: "1.1-1.3"} -->

#### 💡 الفكرة الأساسية
**`Parallel` هدفه السرعة (استخدام معالجات متعددة لحل مشكلة أسرع)، بينما `Concurrent` هدفه التنسيق (تنظيم وصول أكتر من خيط لنفس المورد بنفس الوقت).**

#### 💡 التشبيه
تخيل مطبخ فيه شيفين. لو كل شيف عم يحضّر طبق مختلف تماماً بشكل مستقل — هاد `Parallel`: الشغل انقسم وصار أسرع. لكن لو الاثنين الشيفين محتاجين يوصلو لنفس ثلاجة التوابل بنفس اللحظة — هلق لازم فيه تنظيم (مين بيدخل أول، مين بينتظر)، وهاد بالضبط `Concurrent`.

#### 📖 الشرح
ليش الفرق مهم؟ لأنو ناس كتير بيحسبو الكلمتين مترادفتين، بس الحقيقة إنو ممكن يكون عندك `Concurrency` بدون أي `Parallelism` حقيقي — متل برنامج شغّال على معالج واحد بس فيه أكتر من خيط بيتبادلو التنفيذ (`time-slicing`). بالمقابل، ممكن يكون عندك `Parallelism` بدون `Concurrency` — متل خوارزمية `sort` وزّعت المصفوفة على أربع خيوط، وكل خيط عم يشتغل على جزء منفصل تماماً بدون أي مشاركة بيانات.

النقطة الجوهرية: `Parallel` بيسأل "كيف نخلص أسرع؟" — أما `Concurrent` بيسأل "كيف نضمن إنو الوصول المشترك ما يعمل فوضى؟"

#### 🎯 الملخص السريع
- `Parallel` = استخدام موارد معالجة متعددة لحل مشكلة أسرع (مثال: خوارزمية `sort` موزّعة على خيوط).
- `Concurrent` = أكتر من مسار تنفيذ (`threads`) بيوصلو لمورد مشترك بنفس الوقت (مثال: خيوط كتير عم تعدّل نفس الـ `list` أو `map`).
- الاثنين ممكن يصيرو مع بعض، بس المفهوم مختلف عن التاني.

#### 📚 التطبيق
هاد الفرق أساسي لأنو باقي المحاضرة كلها (ولحد آخر المادة) رح تركّز على الـ `Concurrency` تحديداً — كيف نحمي البيانات المشتركة، مش كيف نسرّع البرنامج.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيحسبو `Parallel` و `Concurrent` نفس الشي لأنو الاثنين بيستخدمو خيوط متعددة، فبيستخدمو الكلمتين بالتبادل.

#### الفهم الصحيح ✅:
الفرق الحاسم: `Parallel` عن **السرعة** (تقسيم شغل على معالجات)، `Concurrent` عن **التنسيق** (وصول متزامن لمورد مشترك). ممكن يكون عندك وحدة بدون التانية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> parallel: Using multiple processing resources (CPUs, cores) at once to solve a problem faster. Example: A sorting algorithm that has several threads each sort part of the array.
> concurrent: Multiple execution flows (e.g. threads) accessing a shared resource at the same time. Example: Many threads trying to make changes to the same data structure (a global list, map, etc.).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريفين والأمثلة المرفقة بكل واحد.

</details>

---

### 1.2. ليش نحتاج Concurrency؟ (فوائدها)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1", group: "1.1-1.3"} -->

#### 💡 الفكرة الأساسية
**`Concurrency` مش دايماً عن السرعة — أحياناً بدك ياها حتى لو عندك معالج واحد بس، عشان استجابة البرنامج وعزل الأعطال.**
*(وبعد ما فهمنا الفرق بين المصطلحين، جاي دورنا نشوف ليش أصلاً نحتاج `Concurrency`.)*

---

#### 📖 الشرح
المحاضرة بتذكر ثلاث فوائد رئيسية للـ `Concurrency`:

1. **`App responsiveness` (استجابة التطبيق):** فكّر ببرنامج فيه واجهة رسومية (`GUI`). لو زر "احفظ" بده يعمل عملية حسابية ثقيلة، وما فيه إلا خيط واحد، الواجهة كلها رح تتجمّد لحد ما العملية تخلص. لو عملنا خيط منفصل للعملية الثقيلة، خيط الواجهة يضل حر يستجيب للمستخدم (مثال: تحريك النافذة، الضغط على زر إلغاء).

2. **`Processor utilization` (استغلال المعالج، وتغطية بطء الـ I/O):** لو خيط واحد عم يستنى قراءة ملف من القرص (عملية بطيئة نسبياً)، المعالج بيضل فاضي بلا فايدة أثناء الانتظار. لو عندك خيوط تانية جاهزة تشتغل، المعالج بيقدر يشغّلهم بالوقت اللي الخيط الأول عم ينتظر الـ I/O.

3. **`Failure isolation` (عزل الأعطال):** لو عندك مهام متعددة عم تتنفذ بشكل متداخل، وحدة منها رمت استثناء (`Exception`)، بنفضّل إنو هالخطأ ما يوقف باقي المهام. الـ `Concurrency` بتعطيك بنية مناسبة لهيك عزل.

#### 🎯 الملخص السريع
- `App responsiveness`: خيط منفصل للعمليات الثقيلة يخلي الواجهة تستجيب.
- `Processor utilization`: خيط تاني بيشتغل أثناء ما خيط عم ينتظر I/O.
- `Failure isolation`: خطأ بمهمة وحدة ما لازم يوقف كل شي.

#### 📚 التطبيق
هاي الفوائد بتفسّر ليش حتى الأنظمة القديمة بمعالج واحد كانت تستخدم خيوط متعددة — مش كل استخدام للـ threads هدفه السرعة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Unlike parallelism, not always about running faster. Even a single-CPU, single-core machine may want concurrency. Useful for: App responsiveness (Example: Respond to GUI events in one thread while another thread is performing an expensive computation), Processor utilization (mask I/O latency) (If 1 thread is stuck working, others have something else to do), Failure isolation (Convenient structure if want to interleave multiple tasks and do not want an exception in one to stop the other)

**ملاحظة على التغطية:**
- ✓ تم شرح الفوائد الثلاث كاملة مع أمثلة موسّعة لكل واحدة.

</details>

---

### 1.3. الـ Process
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.2", group: "1.1-1.3"} -->

#### 💡 الفكرة الأساسية
**الـ `Process` هو وحدة تنفيذ مستقلة تماماً ومعزولة عن باقي البرامج، وما بتقدر توصل مباشرة لبيانات process تاني.**
*(بعد ما فهمنا فوائد التزامن، لازم نميّز بين وحدتين أساسيتين بيشتغل عليهم: الـ Process والـ Thread — هاد الأول.)*

---

#### 📖 الشرح
كل `Process` (متل تطبيق Word مفتوح، أو متصفح الإنترنت) عندو ذاكرته الخاصة ووقت معالج مخصص إله من نظام التشغيل. `Process` تاني ما بيقدر "يشوف" أو "يعدّل" على بيانات process غيره مباشرة — لازم يمر بآليات خاصة (متل الـ sockets أو الملفات) عشان يتواصل معه. هاي العزلة هي اللي بتخلي انهيار برنامج وحد (مثلاً كراش) ما يأثر على باقي البرامج الشغّالة.

بالنسبة لـ Java تحديداً، فيه مفهوم إضافي بالمحاضرة: **النظام = كائنات (`Objects`) + أنشطة (`Activities`)**. الكائنات هي الأشياء الثابتة اللي بتشكّل بنية البرنامج (`ADTs`, `JavaBeans`, `monitors`, remote `RMI` objects...) وبيركّزو على `SAFETY` (يعني ما ينكسرو لو استخدمهم أكتر من نشاط بنفس الوقت). أما الأنشطة فهي المسارات الفعلية اللي بتتنفذ (رسائل، سلاسل استدعاءات، خيوط، جلسات، سيناريوهات، سكريبتات، تدفقات عمل، حالات استخدام، معاملات، تدفقات بيانات، أو حتى حسابات متنقلة). يعني الكائنات هي "الهيكل الثابت"، والأنشطة هي "الحركة" اللي بتمر فيه.

#### 🎯 الملخص السريع
- `Process`: وحدة معزولة، ذاكرة ومعالج خاصين فيها من الـ OS.
- ما بيقدر يوصل مباشرة لبيانات process تاني.
- بالمنظور الجافي: النظام = `Objects` (بنية ثابتة، تركيزها Safety) + `Activities` (مسارات تنفيذ متحركة).

#### 📚 التطبيق
هاي العزلة بين الـ Processes هي بالضبط سبب وجود الـ `Thread` — لأنو أحياناً بدنا "نشاطات" متعددة تشتغل بنفس البرنامج (نفس الـ Process) وتتشارك نفس الذاكرة، بعكس عزل الـ Process. هاد بالضبط موضوع القسم الجاي.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A process runs independently and isolated of other processes. It cannot directly access shared data in other processes. The resources of the process are allocated to it via the operating system, e.g. memory and CPU time.
> Systems = Objects + Activities. Objects: ADTs, aggregate components, JavaBeans, monitors, business objects, remote RMI objects, subsystems... May be grouped according to structure, role... Usable across multiple activities — focus on SAFETY. Activities: Messages, call chains, threads, sessions, scenarios, scripts, workflows, use cases, transactions, data flows, mobile computations.

**ملاحظة على التغطية:**
- ✓ تم شرح تعريف الـ Process بالكامل.
- ✓ تم شرح مخطط Objects + Activities مع كل الأمثلة المذكورة.

</details>

---

## 2. الخيوط والتعددية (Threads and Multithreading)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.3", group: "2.1-2.2"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (2.1 → 2.2) بتعرّفنا على الـ `Thread` تحديداً كوحدة تنفيذ جوا الـ `Process`، وكيف بيصير التنفيذ الفعلي متعدد الخيوط سواء على أكتر من نواة أو على نواة وحدة (`time-slicing`).

#### ⬅️ الربط مع السابق
بعد ما اتفقنا إنو الـ Process معزول تماماً، هلق منشوف إنو جوا نفس الـ Process ممكن يكون فيه أكتر من "نشاط" شغّال بنفس الوقت وبيتشاركو نفس الذاكرة — هاد هو الـ `Thread`.

### 2.1. الخيط (Thread)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.3", group: "2.1-2.2"} -->

#### 💡 الفكرة الأساسية
**الـ `Thread` هو "عملية خفيفة" (`lightweight process`) عندها مسار تنفيذ خاص فيها (`call stack`) بس بتقدر توصل لبيانات مشتركة مع خيوط تانية بنفس الـ Process.**

#### 💡 التشبيه
لو الـ Process متل بيت كامل معزول عن البيوت التانية، فالـ Thread متل شخص عايش جوا هالبيت. كل شخص (Thread) إله غرفته الخاصة (الـ stack)، بس كل الأشخاص بيتشاركو نفس المطبخ والصالون (الذاكرة المشتركة للـ Process).

#### 📖 الشرح
المحاضرة بتحدد أربع خصائص أساسية للـ `Thread`:

1. عندو **call stack خاص فيه** — يعني المتغيرات المحلية والاستدعاءات الخاصة فيه معزولة عن باقي الخيوط.
2. لكنه **بيقدر يوصل لبيانات مشتركة** — عكس الـ Process اللي كان معزول تماماً.
3. عندو **memory cache خاصة فيه** — يعني لما الخيط يقرأ بيانات مشتركة، بيخزّنها بنسخة محلية بذاكرته الخاصة (هاد مهم جداً لأنو هاد بالضبط جذر مشكلة `Race Condition` اللي رح نحكي عنها بمحاضرات لاحقة: كل خيط ممكن يشوف نسخة "قديمة" من البيانات المشتركة إذا ما في تزامن).
4. الخيط **بيقدر يعيد قراءة البيانات المشتركة** — يعني مش قراءة مرة وحدة وخلص، ممكن يرجع يتأكد من القيمة الحالية.

باختصار: `Thread` هو وحدة التنفيذ (`unit of execution`) الأساسية جوا البرنامج.

#### 🎯 الملخص السريع
- `Thread` = عملية خفيفة، عندها stack خاص، بتوصل لبيانات مشتركة.
- عندها memory cache خاصة فيها (مصدر محتمل للتضارب لاحقاً).
- بتقدر تعيد قراءة البيانات المشتركة بأي وقت.

#### 📚 التطبيق
فهم إنو كل Thread عندو نسخته الخاصة من الذاكرة المؤقتة (cache) رح يفسّرلنا لاحقاً ليش لازم أدوات تزامن صريحة (زي `synchronized`) عشان نضمن إنو كل الخيوط "شايفة" نفس القيمة الحقيقية للبيانات المشتركة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Threads are so called lightweight processes which have their own call stack but can access shared data. Every thread has its own memory cache. If a thread reads shared data it stores this data in its own memory cache. A thread can re-read the shared data. Thread is a unit of execution.

**ملاحظة على التغطية:**
- ✓ كل النقاط الأربع (stack خاص، وصول لبيانات مشتركة، memory cache، إعادة القراءة) اتشرحت.

</details>

---

### 2.2. التعددية (Multithreading)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1", group: "2.1-2.2"} -->

#### 💡 الفكرة الأساسية
**`Multithreading` بيصير بطريقتين: إما فعلياً بالتوازي على أكتر من core، أو بالتناوب (`time-slicing`) على core واحد.**
*(وبعد ما فهمنا شو هو الخيط الواحد، جاي دورنا نشوف كيف بيشتغلو أكتر من خيط سوا فعلياً.)*

---

#### 📖 الشرح
المحاضرة بتعرض حالتين:

**الحالة الأولى — `Multi-Threading on multiple cores`:** لو عندك أربع أنوية (`Core 0` إلى `Core 3`)، والبرنامج فيه سبع خيوط (Thread A إلى G)، نظام التشغيل بيوزّع الخيوط على الأنوية المتاحة. لاحظ من الرسمة إنو مش لازم كل نواة تاخد خيط واحد بس — ممكن نواة وحدة (متل Core 1) تاخد خيطين (Thread B و Thread E) بالتناوب، بينما نواة تانية (Core 2) تاخد خيط واحد بس (Thread C) طول الوقت.

**الحالة الثانية — `Multi-Threading (time-slicing)` على core واحد:** لما عدد الخيوط أكتر من عدد الأنوية المتاحة، نظام التشغيل بيعمل "تقطيع للوقت" — يعطي كل خيط فرصة صغيرة (`time slice`) للتنفيذ، وبعدين يبدّل لخيط تاني، وهيك دواليك. من الرسمة: Core 0 بينفذ Thread A شوي، بعدين Thread B، بعدين يرجع A، بعدين B، بعدين C... التعليمات بتصير **متداخلة** (`interleaved`). هاد النمط مفيد بشكل خاص لعمليتين: تنظيف الذاكرة بالخلفية (`background garbage collection`) والواجهات الرسومية المستجيبة (`responsive GUIs`).

#### 🎯 الملخص السريع
- على أنوية متعددة: كل نواة بتاخد خيط (أو أكتر بالتناوب لو الخيوط أكتر من الأنوية).
- على نواة واحدة: التعليمات بتتداخل (`interleaved`) عن طريق `time-slicing`.
- مفيد لـ `garbage collection` والواجهات المستجيبة.

#### 📚 التطبيق
فهم إنو الخيوط ممكن تتنفذ بالتداخل (مش بالضرورة بالتوازي الحقيقي) هو مفتاح فهم ليش مشاكل التزامن (زي `Race Condition`) ممكن تصير حتى على معالج واحد — لأنو ترتيب التنفيذ غير مضمون وغير متوقع.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Multi-Threading (on multiple cores): [رسمة توزيع Thread A-G على Core 0-3]
> Multi-Threading (time-slicing): When there are more threads than cores: The instructions are interleaved. Good for background garbage collection (GC) and responsive GUIs.

**ملاحظة على التغطية:**
- ✓ الحالتين (multi-core و time-slicing) اتشرحو بالكامل مع تفسير الرسمتين.

</details>

---

## 3. خيوط Java (Java Threads)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2", group: "3.1-3.4"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (3.1 → 3.4) هي قلب المحاضرة العملي: كيف نكتب وندير `Thread` فعلياً بلغة Java — من الإنشاء، لدورة الحياة، للتحكم بـ `start()` و `join()`، وأخيراً مثال كامل عملي (جمع مصفوفة بالتوازي) نقارنه مع أسلوب `HJ-lib`.

#### ⬅️ الربط مع السابق
بعد ما فهمنا نظرياً شو هو الـ Thread وكيف بيتوزع على الأنوية، هلق رح نشوف الـ API الفعلي بلغة Java اللي بيسمحلنا نصنع وندير هالخيوط.

### 3.1. إنشاء Thread بلغة Java
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2", group: "3.1-3.4"} -->

#### 💡 الفكرة الأساسية
**تنفيذ برنامج Java بيبلّش دايماً بخيط واحد (خيط الـ `main`)، وممكن نصنع خيوط إضافية بطريقتين: توريث `Thread` أو تمرير `Runnable`.**

---

#### 💻 الكود
```java
public class Thread extends Object implements Runnable {
    Thread() { ... }              // Creates a new Thread
    Thread(Runnable r) { ... }    // Creates a new Thread with Runnable object r
    void run() { ... }            // Code to be executed by thread
    // Case 1: If this thread was constructed using a Runnable object,
    //         then that object's run method is called
    // Case 2: If this class is subclassed, the run() method defined
    //         in the subclass is called
    void start() { ... }          // Causes this thread to begin execution
    void join() { ... }           // Wait for this thread to die
    void join(long m)             // Wait at most m milliseconds for thread to die
    static Thread currentThread() // Returns currently executing thread
}
```

#### شرح الكود سطراً بسطر
1. `public class Thread extends Object implements Runnable`: صنف `Thread` نفسه بلغة Java بيطبّق واجهة `Runnable` — يعني كل `Thread` هو بالأساس `Runnable` كمان.
2. `Thread()`: باني (`constructor`) بيصنع خيط جديد بدون تمرير أي كود له مباشرة (بينفّذ `run()` الافتراضية أو المُعاد تعريفها بالصنف الفرعي).
3. `Thread(Runnable r)`: باني بديل بياخد كائن `Runnable` — أي كائن عندو دالة `run()` — وبيخليه هو اللي ينفّذ لما نستدعي `start()`.
4. `void run()`: هاي الدالة اللي فيها "الشغل الفعلي" اللي بدك الخيط ينفّذه. **مهم:** استدعاؤها مباشرة (`thread.run()`) ما بيطلق خيط جديد — بينفذ عادي زي أي دالة عادية على الخيط الحالي.
5. `void start()`: هاي اللي فعلياً بتطلب من الـ JVM ينشئ خيط تنفيذ جديد، وهالخيط الجديد هو اللي رح ينفّذ الكود جوا `run()`.
6. `void join()`: بيوقف الخيط المستدعي (اللي نادى `join()`) لحد ما الخيط `t` يخلص تنفيذه بالكامل.
7. `void join(long m)`: نفس الفكرة، بس بحد أقصى `m` ميلي ثانية — لو ما خلص الخيط بهالوقت، الخيط المستدعي بيكمل تنفيذه لحاله.
8. `static Thread currentThread()`: دالة ساكنة بترجع مرجع للخيط اللي عم ينفّذ هالسطر بالضبط هلق.

#### 📖 الشرح
النقطة الأهم هون: تنفيذ أي برنامج Java بيبلّش بخيط واحد بس، بيصنعه الـ `JVM` تلقائياً عشان ينفّذ دالة `main()`. لو بدنا `Parallelism` حقيقي، لازم نصنع خيوط إضافية بشكل صريح — إما بتوريث `Thread` وإعادة تعريف `run()`، أو بتمرير كائن `Runnable` (وممكن يكون هاد الكائن مجرد `lambda` — يعني تعبير مختصر بديل عن كتابة صنف كامل).

#### 🎯 الملخص السريع
- `Thread` نفسها بتطبّق `Runnable`.
- طريقتين للتنفيذ: توريث `Thread` وإعادة تعريف `run()`، أو تمرير `Runnable`/`lambda` للباني.
- `start()` ينشئ خيط فعلي، `run()` مجرد استدعاء دالة عادي.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف مثال عملي كامل لصنف يورّث `Thread`، ونشوف بالتحديد الفرق العملي بين استدعاء `run()` و `start()`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Execution of a Java program begins with an instance of Thread created by the Java Virtual Machine (JVM) that executes the program's main() method. Parallelism can be introduced by creating additional instances of class Thread that execute as parallel threads. [كود صنف Thread كامل] A lambda can be passed as a Runnable.

**ملاحظة على التغطية:**
- ✓ تم شرح كل دوال صنف Thread المذكورة بالكود بالتفصيل.

</details>

---

### 3.2. الفرق بين run() و start()
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1", group: "3.1-3.4"} -->

#### 💡 الفكرة الأساسية
**استدعاء `run()` مباشرة بينفذ الكود على الخيط الحالي (تسلسلياً)، بينما `start()` بيطلق خيط تنفيذ جديد فعلياً.**
*(وهاد أخطر خطأ ممكن يقع فيه المبرمج المبتدئ — خلينا نشوف الفرق بالكود.)*

---

#### 💻 الكود
```java
public class MyTask extends Thread {
    public void run() {
        // your task here
    }
}

Thread a = new MyTask();
a.run();     // ❌ خطأ شائع: Invokes run() on the current thread
```

```java
public class MyTask extends Thread {
    public void run() {
        // your task here
    }
}

Thread a = new MyTask();
a.start();   // ✅ صحيح: يطلق خيط تنفيذ جديد فعلياً
```

#### شرح الكود سطراً بسطر
1. `public class MyTask extends Thread`: صنف جديد بيورّث من `Thread`، وبيعيد تعريف `run()` بالكود اللي بدنا نشغّله.
2. `Thread a = new MyTask();`: صنعنا كائن من النوع `MyTask` (لسا ما انطلق أي خيط — بس بحالة `New`).
3. `a.run();`: هون الخطأ — هاد بينفذ محتوى `run()` **مباشرة على الخيط الحالي** (الخيط اللي نادى عليها)، متل أي استدعاء دالة عادي. ما صار في خيط جديد إطلاقاً.
4. `a.start();`: هون الصح — هاد بيطلب من الـ JVM يخلق خيط تنفيذ **جديد ومنفصل**، وهالخيط الجديد هو اللي بينفذ `run()` بشكل مستقل بالتوازي مع الخيط الأصلي.

#### 📖 الشرح
الفرق العملي: لو عندك حلقة `for` طويلة جوا `run()` واستدعيت `a.run()`، البرنامج الرئيسي رح "يتجمد" لحد ما الحلقة تخلص (لأنو نفس الخيط عم ينفذها). أما لو استدعيت `a.start()`، البرنامج الرئيسي بيكمل تنفيذه فوراً بالسطر التالي، وحلقة الـ `run()` عم تشتغل بخيط منفصل بموازاته.

#### 🎯 الملخص السريع
- `run()` = استدعاء دالة عادي، بدون خيط جديد.
- `start()` = إنشاء خيط جديد فعلي.
- `start()` بتقدر تُستدعى **مرة وحدة بس** لكل كائن `Thread`.

#### 📚 التطبيق
هاد الفرق ضروري نفهمه قبل ما نروح لدورة حياة الخيط بالفقرة الجاية، لأنو `start()` بالضبط هي اللي بتنقل الخيط من حالة `New` لحالة `Runnable`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفكرو إنو `run()` و `start()` متبادلين — طالما الدالة اسمها `run` وفيها الكود، ليش نفرّق؟

#### الفهم الصحيح ✅:
`run()` بينفذ الكود **على نفس الخيط الحالي** (زي أي دالة عادية، بدون أي خيط جديد)، أما `start()` هي الوحيدة اللي **فعلياً بتخلق خيط تنفيذ جديد** بالـ JVM. لو استخدمت `run()` بدل `start()`، البرنامج رح يشتغل تسلسلياً بالكامل بدون أي تعددية حقيقية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> public class MyTask extends Thread { public void run() { // your task here } }
> Thread a = new MyTask();
> a.run(); — Invokes run() on the current thread.
> a.start();

**ملاحظة على التغطية:**
- ✓ تم شرح الفرق بالتفصيل مع توضيح الأثر العملي على تنفيذ البرنامج.

</details>

---

### 3.3. دورة حياة الخيط والإدارة (Lifecycle, start, join)
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.2", group: "3.1-3.4"} -->

#### 💡 الفكرة الأساسية
**الخيط بيمر بأربع حالات: `New` → `Runnable` → `Running` → `Terminated`، والانتقال بين `Runnable` و `Running` بيعتمد على جدولة الـ OS/JVM مش عليك.**
*(وبعد ما فهمنا الفرق بين run و start، جاي نشوف بالتفصيل شو بيصير للخيط من لحظة إنشائه لحد ما يخلص.)*

---

#### 📊 المخطط

| رقم العقدة | الوصف |
| --- | --- |
| N1 | `NEW` — الخيط اتصنع (`new MyTask()`) بس لسا ما انطلق |
| N2 | `RUNNABLE` — الخيط جاهز للتنفيذ (بعد استدعاء `a.start()`) |
| N3 | `RUNNING` — الخيط فعلياً عم ينفّذ على المعالج هلق |
| N4 | `TERMINATED` — الخيط خلّص تنفيذه (رجعت دالة `run()`) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| N1 | N2 | `a.start()` |
| N2 | N3 | جدولة الـ OS/JVM (`Dependent on OS/JVM scheduling`) |
| N3 | N2 | ممكن يرجع الخيط لحالة الانتظار (جدولة) قبل ما يخلص |
| N3 | N4 | دالة `run()` ترجع (`run() method returns`) |

```flowchart
[NEW] --a.start()--> [RUNNABLE] <--jvm/os scheduling--> [RUNNING] --run() returns--> [TERMINATED]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: أول ما تصنع كائن `Thread` بـ `new MyTask()`، بيكون بحالة `NEW` — موجود بالذاكرة بس ما انطلق. لما تستدعي `a.start()`، بينتقل لحالة `RUNNABLE` — جاهز يشتغل، بس مش بالضرورة عم يشتغل فعلياً هلق (ممكن يكون مستني دوره). الانتقال من `RUNNABLE` لـ `RUNNING` (وبالعكس) **مش بإيدك** — هو قرار الجدولة (`scheduling`) اللي بياخده نظام التشغيل أو الـ JVM حسب توفر الأنوية وأولويات الخيوط. وأخيراً، لما دالة `run()` ترجع (تخلص تنفيذها)، الخيط بينتقل لحالة `TERMINATED` نهائياً — وما بيقدر يرجع يشتغل تاني (استدعاء `start()` مرة تانية على نفس الكائن بيرمي استثناء).

بعد كده، فيه دالتين إدارة مهمتين:
- **`start()`**: زي ما فهمنا، بتطلق التنفيذ. مهم: `start()` بتقدر تُستدعى **مرة واحدة بس** لكل `Thread instance`. وكمان، زي `async` بالـ HJ-lib، الخيط الأب (اللي نادى `start()`) بيقدر يكمل للسطر التالي فوراً بدون ما ينتظر.
- **`join()`**: استدعاء `t.join()` بيجبر الخيط المستدعي إنو ينتظر لحد ما الخيط `t` يخلص بالكامل. المحاضرة بتلاحظ نقطتين مهمتين: أولاً، `join()` هي أداة "أوطى مستوى" (`lower-level primitive`) من `finish` بالـ HJ-lib، لأنها بس بتستنى **خيط واحد محدد**، مش مجموعة كاملة من الخيوط زي `finish`. ثانياً — وهاي نقطة خطيرة — **ما في قيد على مين بيعمل join على مين**، يعني نظرياً ممكن تصنع دورة `join` (خيط A بينتظر B، وB بينتظر A) وتوقع بـ `Deadlock` **حتى لو ما في أي تضارب بالبيانات (`Data Race`) إطلاقاً**.

#### 🎯 الملخص السريع
- الحالات: `New → Runnable → Running → Terminated`.
- `Runnable ↔ Running`: بيتحكم فيه الـ OS/JVM، مش المبرمج.
- `start()`: مرة واحدة بس لكل Thread، والخيط الأب بيكمل فوراً بدون انتظار.
- `join()`: ينتظر خيط واحد محدد، وممكن يسبب Deadlock لو استُخدم بشكل دائري.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف مثال كامل يستخدم `start()` و `join()` سوا لحل مسألة عملية: جمع مصفوفة بالتوازي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفكرو إنو `join()` أداة آمنة تماماً طالما مفيش تعديل مباشر على بيانات مشتركة بين الخيوط.

#### الفهم الصحيح ✅:
`join()` ممكن تسبب `Deadlock` **بغض النظر عن وجود Data Race من عدمه** — لأنو المشكلة هون مش بالبيانات المشتركة، بل بترتيب الانتظار: لو خيط A عمل `B.join()` وبنفس الوقت خيط B عمل `A.join()`، الاثنين رح يستنو بعض للأبد.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [مخطط Lifecycle: NEW → RUNNABLE → RUNNING → TERMINATED]
> A Thread instance starts executing when its start() method is invoked. start() can be invoked at most once per Thread instance. As with async, the parent thread can immediately move to the next statement after invoking t.start(). A t.join() call forces the invoking thread to wait till thread t completes. Lower-level primitive than finish since it only waits for a single thread rather than a collection of threads. No restriction on which thread performs a join on which thread, so it is possible to create a deadlock cycle using join() even when there are no data races.

**ملاحظة على التغطية:**
- ✓ تم شرح المخطط بالكامل.
- ✓ تم شرح start() و join() ونقطة الـ Deadlock المحتملة بالتفصيل.

</details>

---

### 3.4. مثال متكامل: جمع مصفوفة بالتوازي (Two-way Parallel Array Sum)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.3", group: "3.1-3.4"} -->
<!-- @type: example-for-topics-3.1-to-3.3 -->

#### 📌 السيناريو
عندنا مصفوفة `X` كبيرة وبدنا نجمع كل عناصرها. بدل ما نعمل حلقة تسلسلية وحدة (بطيئة)، بدنا نقسّم الشغل: خيط واحد يجمع النص الأول من المصفوفة، والخيط الرئيسي (الأب) يجمع النص التاني بنفس الوقت، وبالنهاية نجمع النتيجتين مع بعض.

#### 💻 الكود
```java
// Start of main thread
sum1 = 0; sum2 = 0; // sum1 & sum2 are static fields

Thread t1 = new Thread(() -> {
    // Child task computes sum of lower half of array
    for (int i = 0; i < X.length / 2; i++) sum1 += X[i];
});
t1.start();

// Parent task computes sum of upper half of array
for (int i = X.length / 2; i < X.length; i++) sum2 += X[i];

// Parent task waits for child task to complete (join)
t1.join();

return sum1 + sum2;
```

#### شرح الكود سطراً بسطر
1. `sum1 = 0; sum2 = 0;`: تهيئة متغيرين ثابتين (`static fields`) — كل واحد رح يخزّن نتيجة نص مختلف من المصفوفة.
2. `Thread t1 = new Thread(() -> {...});`: صنع خيط جديد `t1` بتمرير `lambda` (بديل مختصر عن `Runnable`) بدل ما نورّث صنف `Thread` كامل.
3. `for (int i=0; i < X.length/2; i++) sum1 += X[i];`: جوا الـ `lambda` — هاد الكود اللي رح ينفّذه الخيط `t1` تحديداً: يجمع **النص الأول** من المصفوفة (من البداية لحد النص) بمتغير `sum1`.
4. `t1.start();`: هون فعلياً بيبلّش تنفيذ `t1` بخيط منفصل. الخيط الرئيسي (main) ما بينتظر — بيكمل فوراً للسطر التالي.
5. `for (int i=X.length/2; i < X.length; i++) sum2 += X[i];`: هاد الكود بينفّذه الخيط **الرئيسي نفسه** (مش t1) بنفس الوقت اللي t1 عم يشتغل فيه — بيجمع **النص الثاني** من المصفوفة بمتغير `sum2`.
6. `t1.join();`: هون الخيط الرئيسي بيوقف وينتظر لحد ما `t1` يخلص تماماً (لأنو بدنا نتأكد إنو `sum1` صار جاهز قبل ما نستخدمه).
7. `return sum1 + sum2;`: بعد ما ضمنا إنو الاثنين خلّصو، نجمع النتيجتين ونرجعهم.

#### 📖 الشرح
هاد مثال كلاسيكي على `Two-way Parallelism`: بدل ما خيط واحد يمر على المصفوفة كلها بالتسلسل، عندنا خيطين — الرئيسي و t1 — كل واحد بياخد نص المصفوفة، وبيشتغلو بنفس الوقت (بالتوازي إذا فيه أكتر من نواة متاحة). الـ `join()` هون ضروري جداً: لو نسينا نستدعيه، ممكن نوصل لسطر `return sum1 + sum2` قبل ما `t1` يخلص جمع `sum1`، فنرجع نتيجة غلط لأنو `sum1` ممكن يكون لسا مش كامل.

#### 🎯 الملخص السريع
- خيط منفصل (`t1`) يجمع نص المصفوفة الأول.
- الخيط الرئيسي يجمع النص الثاني بنفس الوقت.
- `join()` ضروري قبل الجمع النهائي عشان نضمن اكتمال العملية بكلا الخيطين.

#### 📚 التطبيق
هاد المثال بالضبط رح نقارنه بالفقرة الجاية مع نفس الحل باستخدام `finish` و `async` من مكتبة HJ-lib، عشان نشوف الفرق بين الخيوط الخام والمكتبات عالية المستوى.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> // Start of main thread
> sum1 = 0; sum2 = 0; // sum1 & sum2 are static fields
> Thread t1 = new Thread(() -> { // Child task computes sum of lower half of array
> for(int i=0; i < X.length/2; i++) sum1 += X[i]; });
> t1.start();
> // Parent task computes sum of upper half of array
> for(int i=X.length/2; i < X.length; i++) sum2 += X[i];
> // Parent task waits for child task to complete (join)
> t1.join();
> return sum1 + sum2;

**ملاحظة على التغطية:**
- ✓ تم شرح كل سطر بالكامل مع سيناريو تطبيقي واضح.

</details>

---

## 4. Threads و HJ-lib، والـ Thread Pool
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.4", group: "4.1-4.2"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة الصغيرة (4.1 → 4.2) بتقارن حل الجمع اللي شفناه بالكود الخام لـ `Thread`، مع نفس الحل باستخدام `finish`/`async` من HJ-lib، وبعدين بتشرح إزاي HJ-lib فعلياً بتستخدم Java threads تحت الغطاء كـ "عمّال" (`Workers`).

#### ⬅️ الربط مع السابق
بعد ما شفنا حل الجمع بالخيوط الخام، رح نشوف نفس المسألة تماماً لكن بأسلوب المكتبة اللي اتعلمناها بالجزء الأول من المادة.

### 4.1. مقارنة: Threads الخام مقابل finish/async
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.4", group: "4.1-4.2"} -->

#### 💡 الفكرة الأساسية
**نفس مسألة جمع المصفوفة بالتوازي، لكن بأسلوب `finish`/`async` من HJ-lib بدل الخيوط الخام — بنية الكود متشابهة جداً بس المفاهيم مختلفة بالخلفية.**

---

#### 💻 الكود
```java
// Start of Task T0 (main program)
sum1 = 0; sum2 = 0; // sum1 & sum2 are static fields
finish(() -> {
    async(() -> {
        // Child task computes sum of lower half of array
        for (int i = 0; i < X.length / 2; i++) sum1 += X[i];
    });
    // Parent task computes sum of upper half of array
    for (int i = X.length / 2; i < X.length; i++) sum2 += X[i];
});
// Parent task waits for child task to complete (join)
return sum1 + sum2;
```

#### شرح الكود سطراً بسطر
1. `finish(() -> { ... })`: بيفتح كتلة "انتظار جماعي" — أي مهمة `async` جوا هالكتلة، الكود ما بيكمل بعد الكتلة إلا لما **كل** المهام تخلص.
2. `async(() -> { ... })`: بيطلق مهمة فرعية جديدة (زي `Thread` بس أخف وزناً وبتدار من runtime المكتبة)، بتجمع نص المصفوفة الأول.
3. الحلقة التانية (خارج الـ `async`، بس جوا الـ `finish`): بتنفذ على نفس "المهمة" اللي فاتحة الـ `finish` — بتجمع النص الثاني بنفس الوقت اللي الـ `async` عم تشتغل.
4. نهاية `finish`: هون تلقائياً بيصير انتظار ضمني لكل الـ `async` جوا الكتلة — **بدون احتياج لاستدعاء `join()` صريح**.
5. `return sum1 + sum2;`: بعد ما الـ `finish` انتهت (وضمنت اكتمال كل شي)، نرجع المجموع.

#### 📖 الشرح
لاحظ الفرق الجوهري: بالكود اللي شفناه بـ `Thread` الخام، احتجنا نستدعي `t1.join()` صراحة عشان نضمن الانتظار. أما بـ `finish`/`async`، الانتظار **ضمني وتلقائي** — بمجرد ما كتلة `finish` تنتهي، هي بحد ذاتها بتضمن إنو كل الـ `async` جواها خلصت، بدون ما نكتب أي كود انتظار إضافي. هاد فرق مهم بالتصميم: `finish` هي أداة أعلى مستوى بتشيل عننا عبء تتبع كل خيط لحاله.

#### 🎯 الملخص السريع
- `async` ≈ إنشاء + إطلاق خيط (`new Thread(...) + start()`).
- نهاية `finish` ≈ `join()` تلقائي لكل الـ `async` الداخلية، بدون كتابة صريحة.
- المفهوم البرمجي متشابه، بس مستوى التجريد مختلف.

#### 📚 التطبيق
هاي المقارنة بتفهّمنا ليش مكتبات عالية المستوى زي HJ-lib مفيدة: بتقلل الأخطاء (نسيان `join()` مثلاً) وبتبسّط الكود، بس بالخلفية هي لسا بتستخدم Java threads فعلياً — وهاد بالضبط موضوع الفقرة الجاية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> // Start of Task T0 (main program)
> sum1 = 0; sum2 = 0; // sum1 & sum2 are static fields
> finish(() -> { async(() -> { // Child task computes sum of lower half of array
> for(int i=0; i < X.length/2; i++) sum1 += X[i]; });
> // Parent task computes sum of upper half of array
> for(int i=X.length/2; i < X.length; i++) sum2 += X[i]; });
> // Parent task waits for child task to complete (join)
> return sum1 + sum2;

**ملاحظة على التغطية:**
- ✓ تم شرح الكود سطراً بسطر مع مقارنة مباشرة مع مثال الخيوط الخام.

</details>

---

### 4.2. HJlib Runtime وخيوط العمّال (Worker Threads)
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1", group: "4.1-4.2"} -->

#### 💡 الفكرة الأساسية
**HJlib بالخلفية بتصنع عدد صغير من خيوط Java الحقيقية (`Worker Threads`) — عادة وحدة لكل core — وبتوزع عليهم الـ `async` و الـ `continuations` عن طريق طابور شغل منطقي.**
*(بعد ما قارنّا الكود، جاي نشوف كيف فعلياً HJlib شغّالة تحت الغطاء.)*

---

#### 📊 المخطط

| رقم العقدة | الوصف |
| --- | --- |
| N1 | `Logical Work Queue` — طابور منطقي فيه الـ `async`s والـ `continuations` بانتظار التنفيذ |
| N2 | `Worker w1, w2, w3, w4` — خيوط Java حقيقية، عادة بعدد `numWorkerThreads()` (وحدة لكل core تقريباً) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| N2 | N1 | `push` — العامل يدفع مهمة جديدة (async) أو استئناف (continuation) للطابور |
| N1 | N2 | `pull` — العامل الخامل (idle) يسحب مهمة من الطابور ليشتغل عليها |

```flowchart
[Worker w1/w2/w3/w4] --push work--> [Logical Work Queue] --pull work--> [Worker w1/w2/w3/w4]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: HJlib runtime عند بدء البرنامج بتنشئ عدد **صغير وثابت** من خيوط Java الحقيقية جوا `thread pool` — عادة وحدة لكل core متاح بالجهاز (`final int numThreads = numWorkerThreads()`). هاد مختلف عن إنشاء خيط جديد لكل `async` — بدل هيك، كل عامل (`worker`) بيدفع (`push`) أي `async` أو `continuation` جديدة لطابور شغل منطقي مشترك، وأي عامل خامل (خلص شغله الحالي) بيسحب (`pull`) أقرب مهمة من الطابور ليشتغل عليها.

نقطة مهمة إضافية بالمخطط: **المتغيرات المحلية خاصة بكل مهمة** (`private to each task`)، بينما **الحقول الساكنة والحقول الخاصة بالكائن (`static & instance fields`) مشتركة بين كل المهام** — وهاد بالضبط مصدر إمكانية التضارب (`Race Condition`) اللي رح نحكي عنه بمحاضرات لاحقة.

#### 🎯 الملخص السريع
- HJlib بتستخدم عدد ثابت من الـ Worker Threads (عادة = عدد الأنوية)، مش خيط جديد لكل مهمة.
- `push`/`pull` بين العمّال والطابور المنطقي.
- المتغيرات المحلية خاصة لكل مهمة، أما الحقول الساكنة/الكائن مشتركة بين الكل.

#### 📚 التطبيق
هاي الفكرة (تجميع عدد محدود من الخيوط الحقيقية بدل خيط لكل مهمة) هي أساس ما يُعرف بـ `Thread Pool` — تقنية بتحسّن الأداء لأنو إنشاء خيط جديد لكل مهمة صغيرة مكلف. هاي مقدمة مهمة قبل ما نروح لموضوع الأقفال بالقسم الجاي.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Logical Work Queue (async's & continuations). Local variables are private to each task. push work / pull work. Workers w1 w2 w3 w4. final int numThreads = numWorkerThreads(). Static & instance fields are shared among tasks.
> HJlib runtime creates a small number of worker threads in a thread pool, typically one per core. Workers push async's/continuations into a logical work queue when an async operation is performed, when an end-finish operation is reached. Workers pull task/continuation work item when they are idle.

**ملاحظة على التغطية:**
- ✓ تم شرح المخطط بالكامل مع كل النقاط النصية المرافقة له.

</details>

---

## 5. أقفال Java (Java Locks)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.2", group: "5.1-5.5"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة الأخيرة والأهم (5.1 → 5.5) بتشرح أدوات التزامن الفعلية بلغة Java: الأقفال المهيكلة (`Structured Locks` عبر `synchronized`)، وكيف نحل مسألة `Bounded Buffer` الكلاسيكية باستخدام `wait()` و `notify()` و `notifyAll()`.

#### ⬅️ الربط مع السابق
بعد ما اتعلمنا كيف نصنع وندير خيوط (`start`, `join`)، هلق المشكلة الجديدة هي: إذا أكتر من خيط بدهم يوصلو لنفس البيانات المشتركة (زي `static fields` اللي شفناها بمثال HJlib)، كيف نمنع التضارب؟ الجواب: الأقفال.

### 5.1. أنواع الأقفال: Structured و Unstructured
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.2", group: "5.1-5.5"} -->

#### 💡 الفكرة الأساسية
**فيه نوعين من الأقفال بـ Java: `Structured Locks` (`synchronized` — تلقائي ومبني على البلوكات) و `Unstructured Locks` (عمليات `lock`/`unlock` صريحة يديرها المبرمج بنفسه).**

#### 💡 التشبيه
تخيل حمّام عام فيه باب. الـ `synchronized` (Structured) متل باب بيقفل ويفتح تلقائياً — تدخل، تعمل شغلك، تطلع، والباب بيتقفل وبينفتح لحاله بدون ما تتذكر تسكره. أما الـ `Unstructured Lock` متل باب عادي لازم إنت تقفله بإيدك وتفتحه بإيدك — لو نسيت تقفله أو تفتحه، المشكلة عليك.

#### 📖 الشرح
ليش نحتاج أقفال أصلاً؟ لأنو لما أكتر من خيط بيقدرو يعدّلو أو يقرأو نفس البيانات المشتركة بنفس الوقت، ممكن يصير تضارب غير متوقع بالنتيجة. الفكرة الأساسية اللي بتحل هاي المشكلة هي `mutual exclusion` (الاستبعاد المتبادل): نضمن إنو **خيط واحد بس** بيقدر ينفّذ منطقة معينة من الكود (تسمى `Critical Section`) بأي لحظة، وباقي الخيوط لازم تنتظر دورها.

بلغة Java، الطريقة الأساسية (`Structured Locking`) عبر `synchronized` بلوكات — وأساس عملها هو: JVM بينفّذ `synchronized(a) <stmt>` بثلاث خطوات:
1. الحصول على قفل الكائن `a` (`Acquire lock for object a`).
2. تنفيذ الكود جوا البلوك (`Execute <stmt>`).
3. تحرير القفل بعد الانتهاء (`Release lock for object a`).

مهم جداً: **مسؤولية ضمان إنو اختيار الأقفال بيحقق فعلياً العزل الصحيح (`isolation`) هي مسؤولية المبرمج**، مش شي بيضمنه الكمبايلر تلقائياً — يعني ممكن تكتب `synchronized` غلط (على كائن غلط مثلاً) وما يحميك فعلياً.

الضمانة الأساسية اللي بيوفرها القفل: **خيط واحد بس بيقدر يمسك قفل معيّن بأي لحظة**، وأي خيط تاني بده نفس القفل بيتوقف (`blocked`) لحد ما يصير القفل متاح.

#### 🎯 الملخص السريع
- `Structured Locks` (`synchronized`): تلقائي، مبني على بلوكات.
- `Unstructured Locks`: `lock()`/`unlock()` صريحة، مسؤولية المبرمج بالكامل.
- الهدف من الاثنين: `mutual exclusion` — خيط واحد بس بالمنطقة الحرجة بأي وقت.

#### 📚 التطبيق
بالفقرة الجاية رح نشوف بالتفصيل كيف الـ JVM بيطبّق `synchronized` فعلياً عبر تعليمات bytecode (`monitorenter`/`monitorexit`)، وشو بيصير للخيوط اللي بتنتظر القفل.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Two types of Locks: Structured Locks (synchronized blocks) implements mutual exclusion. Unstructured Locks (Explicit lock and unlock operations). Locks are needed for more general cases. Basic idea is for JVM to implement synchronized(a) <stmt> as follows: 1. Acquire lock for object a 2. Execute <stmt> 3. Release lock for object a. The responsibility for ensuring that the choice of locks correctly implements the semantics of isolation lies with the programmer. The main guarantee provided by locks is that only one thread can hold a given lock at a time, and the thread is blocked when acquiring a lock if the lock is unavailable.

**ملاحظة على التغطية:**
- ✓ تم شرح نوعي الأقفال، خطوات monitorenter/monitorexit المنطقية، ومسؤولية المبرمج، والضمانة الأساسية.

</details>

---

### 5.2. Structured Locks بالتفصيل — monitorenter/monitorexit وEntry Set
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1", group: "5.1-5.5"} -->

#### 💡 الفكرة الأساسية
**كل كائن Java عندو قفل خاص فيه، و`synchronized` بيترجم لتعليمتين bytecode: `monitorenter` (طلب الملكية) و`monitorexit` (تحرير الملكية).**
*(بعد ما فهمنا فكرة synchronized بشكل عام، جاي نشوف كيف الـ JVM فعلياً بيطبّقها من الداخل.)*

---

#### 📊 المخطط

| رقم العقدة | الوصف |
| --- | --- |
| N1 | `Entry Set` — طابور غير مرتّب من الخيوط المنتظرة تحصل على القفل |
| N2 | `Object Lock (owner)` — القفل نفسه، ومعه إشارة لمين ماسكه حالياً (`owner`) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| N1 | N2 | `acquire lock` — أي خيط بالـ Entry Set بيحاول ياخد القفل |

```flowchart
[Thread tries monitorenter] --if lock free--> [becomes owner of Object Lock] --monitorexit--> [lock released, next thread from Entry Set tries]
[Thread tries monitorenter] --if lock taken--> [placed in unordered Entry Set] --waits--> [tries again later]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: كل كائن (`Object`) بلغة Java عندو قفل مرتبط فيه تلقائياً (حتى لو ما استخدمناه أبداً). عند دخول بلوك `synchronized`، الـ JVM بيولّد تعليمة bytecode اسمها `monitorenter` — وهاي بتطلب "ملكية" (`ownership`) قفل الكائن. لو الخيط نجح ياخد الملكية (لأنو القفل كان فاضي)، بيكمل تنفيذ البلوك، وعند الخروج منه بتتنفذ تعليمة `monitorexit` اللي بتحرر الملكية.

بس شو بيصير لو خيط حاول ياخد قفل وهو مش متاح (لأنو خيط تاني ماسكه)؟ الخيط هاد بينحط بمجموعة تسمى `Entry Set` — وهاي المجموعة **غير مرتّبة** (`unordered`)، يعني ما فيه ضمانة على "مين جاي أول" — أي خيط بالـ Entry Set ممكن ياخد القفل لما يتحرر، بدون ترتيب أفضلية مضمون.

#### 🎯 الملخص السريع
- كل Object عنده Lock خاص فيه (حتى لو ما استُخدم).
- `monitorenter`: طلب ملكية القفل. `monitorexit`: تحرير الملكية.
- الخيوط اللي فشلت تاخد القفل بتروح لـ `Entry Set` (طابور غير مرتّب).

#### 📚 التطبيق
هاي الفكرة أساسية لفهم مثال الـ `Bounded Buffer` بالفقرة الجاية، لأنو دالتي `insert` و `remove` جوا هالمثال بيصيرو `synchronized` على نفس الكائن — يعني خيط واحد بس يقدر يكون جواهم بنفس اللحظة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Every object has an associated lock. "synchronized" is translated to matching monitorenter and monitorexit bytecode instructions for the Java virtual machine. monitorenter requests "ownership" of the object's lock. monitorexit releases "ownership" of the object's lock. If a thread performing monitorenter does not gain ownership of the lock (because another thread already owns it), it is placed in an unordered "entry set" for the object's lock.

**ملاحظة على التغطية:**
- ✓ تم شرح monitorenter/monitorexit والـ Entry Set بالكامل.

</details>

---

### 5.3. مثال أولي: مسألة Bounded Buffer (بدون تنسيق انتظار بعد)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.2", group: "5.1-5.5"} -->

#### 💡 الفكرة الأساسية
**مسألة `Bounded Buffer` (منتج ومستهلك) بتحتاج `synchronized` لحماية المتغيرات المشتركة، لكن الحماية لحالها مش كافية — لازم كمان طريقة تخلي الخيط ينتظر لو الشرط مش محقق.**
*(بعد ما فهمنا آلية عمل synchronized، جاي نشوف مثال عملي كلاسيكي ونكتشف فيه نقص واضح.)*

---

#### 💻 الكود
```java
public synchronized void insert(Object item) { // producer
    // TODO: wait till count < BUFFER_SIZE
    ++count;
    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
    // TODO: notify consumers that an insert has been performed
}

public synchronized Object remove() { // consumer
    Object item;
    // TODO: wait till count > 0
    --count;
    item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    // TODO: notify producers that a remove() has been performed
    return item;
}
```

#### شرح الكود سطراً بسطر
1. `public synchronized void insert(Object item)`: دالة الإنتاج (`producer`) — كلمة `synchronized` هون معناها إنو الدالة كلها منطقة حرجة، وخيط واحد بس يقدر يكون جواها بأي لحظة (على مستوى نفس الكائن).
2. `// TODO: wait till count < BUFFER_SIZE`: هون **فجوة** — لسا ما فيه طريقة تمنع الإدخال لو البوفر ممتلئ بالكامل. لو نفذنا `++count` بدون هالفحص، ممكن نتجاوز حجم البوفر.
3. `++count; buffer[in] = item; in = (in+1) % BUFFER_SIZE;`: زيادة العداد، إضافة العنصر بالمكان `in`، وتحديث `in` بشكل دائري (`circular`) باستخدام `%`.
4. `// TODO: notify consumers`: فجوة تانية — لازم نعلم أي مستهلك مستني إنو فيه عنصر جديد صار متاح.
5. `public synchronized Object remove()`: دالة الاستهلاك — نفس المبدأ، منطقة حرجة كاملة.
6. `// TODO: wait till count > 0`: فجوة — لازم ننتظر لو البوفر فاضي قبل ما نحاول نسحب عنصر.
7. `--count; item = buffer[out]; out = (out+1) % BUFFER_SIZE;`: تنقيص العداد، سحب العنصر، تحديث `out` دائرياً.
8. `// TODO: notify producers`: فجوة — لازم نعلم أي منتج مستني إنو صار فيه مكان فاضي.

#### 📖 الشرح
هاد المثال بيوضح مشكلة حقيقية: `synchronized` لحالها بتحمينا من "خيطين يعدّلو بنفس اللحظة" (يعني بتضمن `mutual exclusion`)، بس **ما بتحل** مشكلة "شو بنعمل لو الشرط مش جاهز؟" — يعني لو البوفر ممتلئ، شو يعمل المنتج؟ ولو فاضي، شو يعمل المستهلك؟ الحل البسيط (checks بدون انتظار حقيقي) مش كافي لأنو ممكن يأدي لتكرار زيادة `count` فوق الحد، أو محاولة سحب من بوفر فاضي. هاد بالضبط يفتح الحاجة لأدوات `wait()`/`notify()` اللي رح نشرحها بالفقرة الجاية.

#### 🎯 الملخص السريع
- `synchronized` بتحمي من دخول أكتر من خيط بنفس اللحظة (mutual exclusion).
- بس ما بتحل مشكلة "الانتظار الشرطي" (البوفر ممتلئ أو فاضي).
- محتاجين آلية إضافية لتوقيف الخيط والسماح له بالاستئناف لاحقاً.

#### 📚 التطبيق
الفقرات الجاية (`wait()`, `notify()`, `notifyAll()`) رح تكمّل هالفجوات بالضبط اللي شفناها بالـ TODOs.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> public synchronized void insert(Object item) { // producer // TODO: wait till count < BUFFER SIZE ++count; buffer[in] = item; in = (in + 1) % BUFFER SIZE; // TODO: notify consumers that an insert has been performed }
> public synchronized Object remove() { // consumer Object item; // TODO: wait till count > 0 --count; item = buffer[out]; out = (out + 1) % BUFFER SIZE; // TODO: notify producers that a remove() has been performed return item; }

**ملاحظة على التغطية:**
- ✓ تم شرح كل سطر، وتم تحديد الفجوات (TODOs) بوضوح كنقطة انطلاق للفقرة التالية.

</details>

---

### 5.4. wait(), notify(), notifyAll()
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.3", group: "5.1-5.5"} -->

#### 💡 الفكرة الأساسية
**`wait()` بتوقف الخيط وتحرر القفل مؤقتاً لحد ما خيط تاني يستدعي `notify()` أو `notifyAll()` على نفس الكائن.**
*(بعد ما اكتشفنا الفجوة بمثال Bounded Buffer، هاي الأدوات الثلاثة اللي بتسدها.)*

---

#### 📊 المخطط

| رقم العقدة | الوصف |
| --- | --- |
| N1 | `Entry Set` — خيوط بتنتظر تحصل على القفل لأول مرة |
| N2 | `Object Lock (owner)` — القفل والمالك الحالي |
| N3 | `Wait Set` — خيوط استدعت `wait()` وبتنتظر إشعار (`notify`) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| N1 | N2 | `acquire lock` |
| N2 | N3 | `wait()` — الخيط المالك بيحرر القفل ويروح لـ Wait Set |
| N3 | N1 | `notify()`/`notifyAll()` — بينقل خيط (أو الكل) من Wait Set لـ Entry Set |

```flowchart
[Entry Set] --acquire lock--> [Object Lock owner] --wait()--> [Wait Set] --notify()/notifyAll()--> [Entry Set]
```

#### 📖 الشرح
اقرأ المخطط كالتالي — أولاً **`wait()`**: لما خيط ماسك القفل يستدعي `wait()`، بيصير ثلاث أشياء بالترتيب: (1) الخيط **بيحرر قفل الكائن** (عشان خيوط تانية تقدر تدخل وتغيّر الحالة)، (2) حالة الخيط بتصير `blocked`، (3) الخيط بينحط بمجموعة تسمى `Wait Set`. الخيط بيضل واقف هون لحد ما خيط تاني يستدعي `notify()` أو `notifyAll()` على **نفس الكائن**. مهم جداً: `wait()` **لازم دايماً تُستخدم جوا حلقة** (`while`)، مش جوا `if` — لأنو حتى لو الخيط انصحى، لازم يتأكد من جديد إنو الشرط الحقيقي صار محقق (ممكن خيط تاني ياخد الفرصة قبله ويغيّر الحالة مرة تانية).

ثانياً **`notify()`**: لما خيط يستدعي `notify()`، بيصير: (1) بيختار خيط عشوائي `T` من الـ `Wait Set`، (2) بينقل `T` لـ `Entry Set`، (3) بيحط حالة `T` كـ `Runnable`. هلق `T` بيقدر يتنافس على القفل من جديد زي أي خيط تاني بالـ Entry Set.

ثالثاً **`notifyAll()` والإشعارات المتعددة**: المشكلة بـ `notify()` إنها بتختار خيط **عشوائي واحد بس** — وهاد ممكن ميكونش الخيط اللي فعلياً بدنا ياه (Java ما بيسمح تحدد مين بالضبط). لهيك، `notifyAll()` هي أداة **أكتر تحفظاً (`conservative`)**: بتنقل **كل** الخيوط من الـ Wait Set للـ Entry Set دفعة وحدة، وبتخليهم يتنافسو مع بعض بأنفسهم على مين بياخد الدور. `notifyAll()` هي الخيار الأفضل لما يكون فيه أكتر من خيط محتمل ينتظر بنفس الـ Wait Set.

#### 🎯 الملخص السريع
- `wait()`: يحرر القفل، يوقف الخيط، يحطه بـ Wait Set. استخدمها دايماً جوا `while`.
- `notify()`: تختار خيط عشوائي واحد من Wait Set وتنقله لـ Entry Set.
- `notifyAll()`: تنقل كل الخيوط من Wait Set لـ Entry Set — أكتر أماناً لما فيه أكتر من نوع منتظر.

#### 📚 التطبيق
بالفقرة الجاية رح نطبّق الثلاثة سوا لنكمّل حل مسألة Bounded Buffer اللي شفناها فيها فجوات بالفقرة قبل هاي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيستخدمو `wait()` جوا `if` بدل `while`، بيفكرو إنو مجرد ما الخيط ينصحى، الشرط أكيد صار صح.

#### الفهم الصحيح ✅:
لازم `wait()` تكون جوا `while` دايماً — لأنو بين لحظة الإشعار ولحظة ما الخيط فعلياً ياخد القفل تاني، ممكن خيط تاني يتدخل ويغيّر الحالة (مثلاً يمتلئ البوفر من جديد). الفحص لازم يتكرر بعد الاستيقاظ، مش يُفترض إنه صحيح تلقائياً.

#### الفهم الخاطئ ❌:
كتير طلاب بيستخدمو `notify()` و`notifyAll()` بالتبادل وكأنو نفس الشي، لأنو الاثنين "بيصحّيو خيوط منتظرة".

#### الفهم الصحيح ✅:
الفرق الحاسم: `notify()` بتصحي **خيط واحد عشوائي فقط** وما فيك تتحكم مين هو، بينما `notifyAll()` بتصحي **كل** الخيوط المنتظرة وتخليهم يتنافسو. لو عندك أكتر من نوع خيوط منتظرة (مثلاً منتجين ومستهلكين بنفس الـ Wait Set)، استخدام `notify()` وحده ممكن يصحي خيط من النوع الغلط.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A thread can perform a wait(): 1. the thread releases the object lock 2. thread state is set to blocked 3. thread is placed in the wait set. Causes thread to wait until another thread invokes the notify() method or the notifyAll() method for this object. Should always be used in a loop.
> When a thread calls notify(), the following occurs: 1. selects an arbitrary thread T from the wait set 2. moves T to the entry set 3. sets T to Runnable. T can now compete for the object's lock again.
> notify() selects an arbitrary thread from the wait set. This may not be the thread that you want to be selected. Java does not allow you to specify the thread to be selected. notifyAll() removes ALL threads from the wait set and places them in the entry set. This allows the threads to decide among themselves who should proceed next. notifyAll() is a conservative strategy that works best when multiple threads may be in the wait set.

**ملاحظة على التغطية:**
- ✓ تم شرح wait/notify/notifyAll بالكامل مع مخطط Entry/Wait Set.
- ✓ تم شرح لماذا notifyAll أكثر أماناً.

</details>

---

### 5.5. مثال متكامل: حل Bounded Buffer الكامل بـ wait() و notify()
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.4", group: "5.1-5.5"} -->
<!-- @type: example-for-topics-5.1-to-5.4 -->

#### 📌 السيناريو
نرجع لنفس مسألة `Bounded Buffer` (منتج/مستهلك)، بس هلق نسد الفجوات اللي تركناها بالفقرة 5.3 باستخدام `wait()` و`notify()`.

#### 💻 الكود
```java
public synchronized void insert(Object item) { // producer
    while (count == buffer.length()) wait();
    ++count;
    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
    notify();
}

public synchronized Object remove() { // consumer
    Object item;
    while (count == 0) wait();
    --count;
    item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    notify();
    return item;
}
```

#### شرح الكود سطراً بسطر
1. `while (count == buffer.length()) wait();`: لو البوفر ممتلئ بالكامل، المنتج بينتظر (بحلقة `while`، مش `if` — زي ما اتفقنا) لحد ما حدا يستهلك عنصر ويحرر مكان.
2. `++count; buffer[in] = item; in = (in+1) % BUFFER_SIZE;`: نفس منطق الإدخال السابق — زيادة العداد، تخزين العنصر، تحديث المؤشر الدائري.
3. `notify();`: بعد ما أضفنا عنصر جديد، لازم نعلم أي **مستهلك** كان مستني (لأنو هلق البوفر مش فاضي، فممكن مستهلك ينتظر تحديداً هالحالة).
4. `while (count == 0) wait();`: لو البوفر فاضي بالكامل، المستهلك بينتظر لحد ما حدا يضيف عنصر.
5. `--count; item = buffer[out]; out = (out+1) % BUFFER_SIZE;`: سحب العنصر وتحديث المؤشر الدائري.
6. `notify();`: بعد ما سحبنا عنصر، لازم نعلم أي **منتج** كان مستني (لأنو هلق فيه مكان فاضي بالبوفر).

#### 💡 كيف تجتمع الأدوات؟
- **`synchronized`:** يضمن إنو `insert` و`remove` ما ينفذو بنفس اللحظة على نفس الكائن — مفيش تضارب مباشر على `count`, `in`, `out`.
- **`wait()`:** يوقف المنتج لو البوفر ممتلئ، أو المستهلك لو البوفر فاضي — بدل ما "يلف" بحلقة فاضية تستهلك معالج بلا فايدة (`busy-waiting`).
- **`notify()`:** بعد كل عملية ناجحة، يعلم الطرف التاني إنو الحالة تغيّرت وممكن يجرّب من جديد.
- **النتيجة:** بوفر يشتغل بأمان، بدون تجاوز الحجم أو سحب من بوفر فاضي، وبدون استهلاك معالج بلا داعي أثناء الانتظار.

#### ⚠️ لو ما استخدمناها صح؟
لو استعملنا `if` بدل `while` قبل `wait()`، ممكن خيط يستيقظ من `notify()` بس يلاقي إنو خيط تاني سبقه واخد الفرصة (مثلاً مستهلك تاني فرّغ البوفر قبله)، فينفّذ `--count` على بوفر فاضي أصلاً — وهاد بالضبط نوع الخطأ اللي حلقة `while` بتمنعه لأنها بتعيد فحص الشرط من جديد بعد الاستيقاظ.

#### 🎯 الملخص السريع
- الحل الكامل = `synchronized` (لحماية المنطقة الحرجة) + `wait()` (للانتظار الشرطي بكفاءة) + `notify()` (لإعلام الطرف الآخر).
- استخدام `while` مع `wait()` إلزامي لضمان إعادة فحص الشرط.

#### 📚 التطبيق
هاي المسألة (Bounded Buffer) هي مثال جوهري رح يتكرر بأشكال مختلفة بمحاضرات لاحقة عن `Concurrent Data Structures`، وهي الأساس لفهم أنماط `Producer-Consumer` بشكل عام.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> public synchronized void insert(Object item) { // producer while(count == buffer.length()) wait(); ++count; buffer[in] = item; in = (in + 1) % BUFFER SIZE; notify(); }
> public synchronized Object remove() { // consumer Object item; while(count == 0) wait(); --count; item = buffer[out]; out = (out + 1) % BUFFER SIZE; notify(); return item; }

**ملاحظة على التغطية:**
- ✓ تم شرح الحل الكامل سطراً بسطر مع ربطه بكل الأدوات (synchronized/wait/notify) بمثال متكامل.

</details>

---

# ملخص شامل — Threads and Locks
<!-- قراءة بديلة كاملة ومتساوية، 45-70 دقيقة، مسار امتحاني مستقل بذاته -->

خلّينا نرجع لنقطة البداية: ليش أصلاً فتحنا موضوع جديد اسمه `Concurrent Programming` بعد ما خلّصنا `Parallel Programming`؟ الجواب البسيط: لأنو الاثنين بيسألو سؤالين مختلفين تماماً. `Parallel` بيسأل "كيف نخلص أسرع باستخدام كذا معالج؟" — متل خوارزمية `sort` بتوزع المصفوفة على خيوط، كل وحد ياخد جزء ويشتغل عليه لحاله. أما `Concurrent` بيسأل سؤال تاني كلياً: "لو أكتر من خيط بدهم يوصلو لنفس المورد بنفس اللحظة، كيف نضمن ما يصير فوضى؟" وهاد بالضبط سؤال المحاضرة كلها.

والحاجة اللي بتفاجئ كتير ناس: `Concurrency` مش دايماً عن السرعة. حتى جهاز بمعالج واحد بس ممكن يحتاجها. فكّر بتطبيق فيه واجهة رسومية — لو الزر اللي بتضغط عليه بده يعمل عملية ثقيلة بنفس الخيط اللي بيرسم الواجهة، التطبيق كله بيتجمّد لحد ما العملية تخلص. لو فصلناها بخيط منفصل، الواجهة تضل حرة تستجيب — هاد اسمه `App responsiveness`. وفي كمان فايدة تانية اسمها `Processor utilization`: لو خيط عم ينتظر قراءة من القرص (عملية بطيئة)، المعالج ما لازم يضل فاضي — فيه خيوط تانية جاهزة تشتغل بهالوقت. والفايدة الثالثة `Failure isolation`: لو مهمة وحدة رمت استثناء، ما بدنا هالخطأ يوقف باقي المهام.

قبل ما نغوص بالـ Thread، لازم نميّز بينه وبين الـ `Process`. الـ `Process` معزول تماماً — عندو ذاكرته الخاصة من الـ OS، وما بيقدر يوصل مباشرة لبيانات process تاني. لكن الـ `Thread` مختلف: هو "عملية خفيفة" (`lightweight process`) — عندو stack خاص فيه (زي متغيراته المحلية)، بس بيقدر يوصل لبيانات مشتركة مع خيوط تانية بنفس الـ Process. ونقطة مهمة جداً: كل Thread عندو نسخة (`cache`) خاصة فيه من البيانات اللي بيقرأها — وهاد بالضبط جذر مشاكل التزامن اللي رح نشوفها بمحاضرات جاية.

من ناحية التنفيذ الفعلي، الخيوط بتتنفذ بطريقتين: إما فعلياً بالتوازي على أنوية متعددة (كل core ياخد خيط أو أكتر)، أو بالتناوب (`time-slicing`) على core واحد — وهون التعليمات بتصير متداخلة (`interleaved`)، وهاد بالضبط اللي بيفسر ليش مشاكل التزامن ممكن تصير حتى على معالج واحد.

هلق نيجي للجزء العملي بلغة Java. أي برنامج Java بيبلّش بخيط واحد بيصنعه الـ JVM تلقائياً لتنفيذ `main()`. لو بدنا خيوط إضافية، عندنا طريقتين: نورّث صنف `Thread` ونعيد تعريف `run()`، أو نمرر `Runnable` (وممكن يكون `lambda`) للباني. وهون أخطر نقطة لازم تنتبهلها: استدعاء `thread.run()` مباشرة **ما بيطلق خيط جديد** — بينفذ الكود عادي على الخيط الحالي، متل أي استدعاء دالة عادي. الاستدعاء الصحيح لإطلاق خيط جديد فعلياً هو `thread.start()`.

بعد ما تستدعي `start()`، الخيط بيمر بأربع حالات: `New` (لسا ما انطلق)، `Runnable` (جاهز يشتغل بس مش بالضرورة عم يشتغل هلق)، `Running` (فعلياً عم ينفّذ على المعالج)، و`Terminated` (خلّص). الانتقال بين `Runnable` و`Running` **مش بإيدك** — قرار جدولة (`scheduling`) بياخده الـ OS أو الـ JVM. و`start()` بتقدر تُستدعى مرة واحدة بس لكل كائن Thread.

أداة تانية مهمة هي `join()`. استدعاء `t.join()` بيجبر الخيط المستدعي إنو ينتظر لحد ما `t` يخلص تماماً. لاحظ إنها أداة أوطى مستوى من `finish` (اللي اتعلمناها بالجزء الأول من المادة) — لأنو `join()` بتنتظر خيط واحد بس، بينما `finish` بتنتظر مجموعة كاملة. وفيه نقطة خطيرة جداً هون: ما في قيد على مين بيعمل `join` على مين — يعني ممكن نظرياً نصنع دورة `join` (A بينتظر B، وB بينتظر A) وتصير `Deadlock` **حتى لو ما في أي Data Race إطلاقاً**. يعني المشكلة مش بس بتضارب البيانات، ممكن تكون بترتيب الانتظار نفسه.

خلّينا نشوف مثال كامل: بدنا نجمع مصفوفة كبيرة بالتوازي. بنصنع خيط `t1` بيجمع النص الأول من المصفوفة، وبنستدعي `t1.start()` — الخيط الرئيسي بيكمل فوراً بدون انتظار، وبيجمع النص الثاني بنفسه. بعدين بنستدعي `t1.join()` عشان نتأكد إنو النص الأول خلّص جمعه قبل ما نرجع المجموع الكلي. لو نسينا `join()`، ممكن نرجع نتيجة غلط لأنو النص الأول لسا ما خلّص.

ونفس المسألة بالضبط ممكن نحلها بأسلوب `finish`/`async` من HJ-lib، وشكل الكود متشابه جداً: `async` بتقارب فكرة "إنشاء + إطلاق خيط"، وخروجنا من كتلة `finish` بيقارب فكرة "join تلقائي لكل الـ async الداخلية" — بدون ما نكتب أي كود انتظار صريح. وبالخلفية، HJ-lib فعلياً بتستخدم Java threads حقيقية، بس بعدد صغير وثابت (عادة وحدة لكل core) — تسمى `Worker Threads`، وبتتوزع عليهم المهام عبر طابور شغل منطقي (push/pull). المتغيرات المحلية خاصة بكل مهمة، بس الحقول الساكنة والخاصة بالكائن مشتركة بين كل المهام — وهاد بالضبط الباب اللي منه بتدخل مشاكل التزامن.

وهون منوصل للموضوع الثاني الكبير بالمحاضرة: **الأقفال (`Locks`)**. فيه نوعين: `Structured Locks` (عبر `synchronized`، تلقائي) و`Unstructured Locks` (عمليات صريحة يديرها المبرمج). الهدف من الاثنين هو `mutual exclusion` — نضمن إنو خيط واحد بس بيقدر ينفّذ منطقة حرجة (`Critical Section`) بأي لحظة. بلغة Java، كل كائن عندو قفل خاص فيه، و`synchronized` بيترجم لتعليمتين bytecode: `monitorenter` (طلب الملكية) و`monitorexit` (تحرير الملكية). لو خيط حاول ياخد قفل مش متاح، بينحط بمجموعة اسمها `Entry Set` (غير مرتّبة) لحد ما يصير القفل متاح. **مهم:** مسؤولية ضمان إنو اختيار الأقفال صحيح هي مسؤولية المبرمج، مش الكمبايلر بيضمنها تلقائياً.

بس `synchronized` لحالها مش كافية دايماً. فكّر بمسألة `Bounded Buffer` الكلاسيكية (منتج ومستهلك بيتشاركو buffer محدود الحجم): `synchronized` بتحمينا من دخول أكتر من خيط بنفس اللحظة، بس ما بتحل مشكلة "شو بنعمل لو البوفر ممتلئ (المنتج لازم ينتظر) أو فاضي (المستهلك لازم ينتظر)؟" وهون بتدخل ثلاث أدوات: `wait()`, `notify()`, و`notifyAll()`.

لما خيط يستدعي `wait()`، بيصير ثلاث أشياء: بيحرر قفل الكائن، بتصير حالته `blocked`، وبينحط بمجموعة اسمها `Wait Set`. وقاعدة ذهبية هون: **`wait()` لازم تكون دايماً جوا حلقة `while`، مش `if`** — لأنو حتى لو الخيط انصحى، لازم يتأكد من جديد إنو الشرط فعلاً محقق (ممكن خيط تاني يسبقه ويغيّر الحالة). ولما خيط يستدعي `notify()`، بيختار خيط عشوائي واحد من الـ Wait Set وينقله لـ Entry Set (يصير Runnable ويتنافس على القفل من جديد) — بس المشكلة إنو `notify()` **ما فيها ضمانة** إنو الخيط اللي انصحى هو اللي فعلياً بدك ياه؛ Java ما بيسمحلك تحدد. لهيك، `notifyAll()` هي أداة أكتر تحفظاً (`conservative`): بتنقل **كل** الخيوط من الـ Wait Set دفعة وحدة وتخليهم يتنافسو مع بعض — أفضل خيار لما يكون فيه أكتر من نوع خيوط منتظرة (مثلاً منتجين ومستهلكين سوا).

وبالحل الكامل لمسألة Bounded Buffer: دالة `insert` بتستخدم `while (count == buffer.length()) wait();` قبل ما تضيف عنصر (تنتظر لو ممتلئ)، وبعد الإضافة بتستدعي `notify()` لتعلم أي مستهلك منتظر. ونفس الشي بالعكس بدالة `remove`: `while (count == 0) wait();` قبل السحب، و`notify()` بعده لتعلم أي منتج منتظر. النتيجة: بوفر آمن تماماً، بدون تجاوز حده الأقصى، بدون سحب من بوفر فاضي، وبدون استهلاك معالج بلا فايدة أثناء الانتظار (`busy-waiting`).

**أهم شي بيركز عليه الأستاذ بالامتحان:** الفرق بين `run()` و`start()`، دورة حياة الخيط الأربعة، خطر `join()` الدائري رغم غياب Data Race، الفرق بين `notify()` و`notifyAll()`، وضرورة استخدام `while` مع `wait()` مش `if`.

من هون منوصل للمحاضرة الجاية: `Critical Sections and Isolation` — رح تبني مباشرة على مفهوم الأقفال اللي اتعلمناه هون، وتوسّعه لمفاهيم أعمق زي `Isolated Construct` و`Object-based Isolation`.

---

# الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium)
**السؤال:** ما الفرق الجوهري بين `Parallel` و `Concurrent`؟

أ) لا فرق، المصطلحان مترادفان تماماً بلغة البرمجة
ب) `Parallel` هدفه السرعة عبر معالجات متعددة، `Concurrent` هدفه تنسيق الوصول لمورد مشترك
ج) `Concurrent` يحتاج دائماً أكتر من معالج، بينما `Parallel` ممكن يشتغل على معالج واحد
د) `Parallel` فقط يُستخدم مع `Threads`، بينما `Concurrent` يُستخدم مع `Processes` فقط

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): المصطلحان مختلفان بالهدف رغم التشابه بالأدوات المستخدمة
- ✅ ب): هذا بالضبط تعريف المحاضرة — `parallel` لحل مشكلة أسرع، و`concurrent` لتنظيم وصول متزامن لمورد مشترك
- ❌ ج): العكس هو الصحيح — `Concurrency` ممكن تحصل حتى على معالج واحد (`time-slicing`)
- ❌ د): كلا المصطلحين ممكن يُطبّقا باستخدام `Threads`

---

### السؤال 2 (medium)
**السؤال:** أي من التالي **ليس** من فوائد `Concurrency` المذكورة بالمحاضرة؟

أ) `App responsiveness`
ب) `Processor utilization`
ج) `Failure isolation`
د) ضمان تسريع البرنامج دائماً بغض النظر عن عدد المعالجات

**الإجابة الصحيحة:** د

**التعليل الكامل:**
- ❌ أ): مذكورة صراحة كفائدة (استجابة الواجهة أثناء عملية ثقيلة)
- ❌ ب): مذكورة صراحة (استغلال المعالج أثناء انتظار I/O)
- ❌ ج): مذكورة صراحة (عزل خطأ مهمة عن باقي المهام)
- ✅ د): المحاضرة تنص صراحة إنو `Concurrency` "ليس دائماً عن السرعة" — هذا خلط بين `Parallelism` و`Concurrency`

---

### السؤال 3 (medium)
**السؤال:** ما الفرق بين `Process` و `Thread` من ناحية الوصول للبيانات؟

أ) الاثنان يقدران يوصلوا مباشرة لبيانات بعض بدون قيود
ب) `Process` معزول تماماً ولا يصل مباشرة لبيانات process آخر، بينما `Thread` يقدر يصل لبيانات مشتركة مع خيوط أخرى بنفس الـ `Process`
ج) `Thread` معزول تماماً، بينما `Process` يشارك الذاكرة مع باقي الـ Processes
د) لا فرق جوهري، المصطلحان يُستخدمان لنفس الغرض

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `Process` معزول تماماً حسب المحاضرة
- ✅ ب): هذا التعريف الدقيق من المحاضرة لكل من `Process` (معزول) و`Thread` (يشارك الذاكرة مع خيوط أخرى بنفس الـ Process)
- ❌ ج): هذا عكس التعريف الصحيح تماماً
- ❌ د): فيه فرق جوهري بمستوى العزل بين الاثنين

---

### السؤال 4 (hard)
**السؤال:** بالكود التالي:
```java
Thread a = new MyTask();
a.run();
```
ما الذي سيحدث فعلياً؟

أ) سيتم إنشاء خيط جديد وتنفيذ الكود جوا `run()` بالتوازي مع الخيط الحالي
ب) سيُرمى استثناء لأن `run()` لا يجوز استدعاؤها مباشرة
ج) سينفّذ الكود جوا `run()` على الخيط الحالي فقط، دون إنشاء أي خيط جديد
د) سيتم تجاهل الاستدعاء بالكامل دون أي تنفيذ

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): هذا يحدث فقط عند استدعاء `a.start()`، ليس `a.run()`
- ❌ ب): `run()` دالة عادية قابلة للاستدعاء المباشر بدون أي استثناء
- ✅ ج): استدعاء `run()` مباشرة هو استدعاء دالة عادي على الخيط الحالي، بدون أي خيط تنفيذ جديد — هذا بالضبط الخطأ الشائع الموضح بالمحاضرة
- ❌ د): الكود ينفّذ فعلياً، لكن على الخيط الحالي وليس بخيط جديد

---

### السؤال 5 (medium)
**السؤال:** ما هي حالات دورة حياة الخيط (`Thread Lifecycle`) بالترتيب الصحيح؟

أ) `Runnable` → `New` → `Running` → `Terminated`
ب) `New` → `Running` → `Runnable` → `Terminated`
ج) `New` → `Runnable` → `Running` → `Terminated`
د) `New` → `Terminated` → `Runnable` → `Running`

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): ترتيب غلط — `New` هي الحالة الأولى دائماً بعد الإنشاء
- ❌ ب): `Runnable` تأتي قبل `Running`، ليس بعدها
- ✅ ج): هذا الترتيب الصحيح كما بالمخطط: إنشاء (`New`) → `start()` (`Runnable`) → جدولة (`Running`) → انتهاء `run()` (`Terminated`)
- ❌ د): `Terminated` هي الحالة الأخيرة، لا يمكن أن تسبق `Runnable`/`Running`

---

### السؤال 6 (hard)
**السؤال:** أي من التالي يصف بدقة العلاقة بين `join()` و`finish` (من `HJ-lib`)؟

أ) `join()` أداة أعلى مستوى من `finish` لأنها تنتظر مجموعة خيوط كاملة
ب) `join()` أداة أوطى مستوى من `finish` لأنها تنتظر خيطاً واحداً محدداً فقط، بينما `finish` تنتظر مجموعة كاملة
ج) `join()` و`finish` متطابقتان تماماً في الوظيفة والمستوى
د) `finish` لا تحتاج أي انتظار على الإطلاق بعكس `join()`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هذا عكس الوصف الصحيح — `join()` هي الأداة الأوطى مستوى
- ✅ ب): هذا بالضبط ما ورد بالمحاضرة: `join()` "lower-level primitive" لأنها تنتظر خيطاً واحداً فقط، بعكس `finish` التي تنتظر مجموعة `async` كاملة تلقائياً
- ❌ ج): مختلفتان بالمستوى والاستخدام رغم تشابه الفكرة العامة
- ❌ د): `finish` تضمن انتظاراً ضمنياً لكل الـ `async` الداخلية عند انتهائها

---

### السؤال 7 (hard)
**السؤال:** لماذا يُمكن أن يحدث `Deadlock` باستخدام `join()` حتى بدون وجود `Data Race`؟

أ) لأن `join()` تسبب دائماً تسريباً بالذاكرة
ب) لأنه لا يوجد قيد على أي خيط يمكنه استدعاء `join()` على أي خيط آخر، فقد يحدث انتظار دائري بين خيطين
ج) لأن `join()` تتطلب دائماً `synchronized` بشكل صريح ولو نسيناها يحدث `Deadlock`
د) لا يمكن أن يحدث `Deadlock` باستخدام `join()` مطلقاً، هذا خطأ في السؤال

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `join()` غير مرتبطة بتسريب الذاكرة
- ✅ ب): هذا بالضبط ما تنص عليه المحاضرة — إذا استدعى خيط A دالة `B.join()` وبنفس الوقت استدعى خيط B دالة `A.join()`، يحدث انتظار دائري (`Deadlock`) رغم غياب أي `Data Race`
- ❌ ج): `join()` لا علاقة لها بـ`synchronized` مباشرة
- ❌ د): المحاضرة تنص صراحة على إمكانية حدوث هذا السيناريو

---

### السؤال 8 (hard) — سيناريو كود
**السؤال:** بالكود التالي لجمع مصفوفة بالتوازي:
```java
sum1 = 0; sum2 = 0;
Thread t1 = new Thread(() -> {
    for (int i = 0; i < X.length / 2; i++) sum1 += X[i];
});
t1.start();
for (int i = X.length / 2; i < X.length; i++) sum2 += X[i];
return sum1 + sum2;
```
ماذا سيحدث تحديداً إذا حذفنا سطر `t1.join()` قبل `return`؟

أ) البرنامج سيتوقف تماماً (`Deadlock`)
ب) قد يتم إرجاع `sum1 + sum2` قبل أن يكمل `t1` جمعه، فتكون النتيجة غير مكتملة أو خاطئة
ج) النتيجة ستكون صحيحة دائماً لأن `t1.start()` تضمن الانتظار تلقائياً
د) الكود لن يترجم (`compile`) بدون `join()`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا يوجد أي `Deadlock` هنا، البرنامج يستمر لكن بشكل خاطئ منطقياً
- ✅ ب): بدون `join()`، لا ضمانة أن `t1` أنهى حساب `sum1` قبل تنفيذ سطر `return` — قد يُرجع مجموعاً جزئياً أو غير مكتمل
- ❌ ج): `start()` لا تنتظر إطلاقاً، بل تُكمّل الخيط الأب فوراً للسطر التالي
- ❌ د): غياب `join()` لا يسبب أي خطأ ترجمة (`compile-time error`)، المشكلة منطقية فقط وقت التشغيل

---

### السؤال 9 (medium)
**السؤال:** ما الغرض الأساسي من `synchronized` (`Structured Locks`) بلغة Java؟

أ) تسريع تنفيذ البرنامج عبر تشغيل خيوط متعددة بنفس الوقت
ب) تحقيق `Mutual Exclusion` — ضمان أن خيطاً واحداً فقط ينفّذ المنطقة الحرجة في أي لحظة
ج) حذف الحاجة لاستخدام `Thread` نهائياً
د) تحويل البرنامج التسلسلي إلى برنامج متوازٍ تلقائياً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `synchronized` قد تُبطئ التنفيذ لأنها تفرض انتظاراً، هدفها ليس السرعة
- ✅ ب): هذا التعريف الحرفي من المحاضرة — `implements mutual exclusion`
- ❌ ج): `synchronized` تُستخدم مع `Threads` وليست بديلاً عنها
- ❌ د): لا علاقة لـ `synchronized` بتحويل الكود لمتوازٍ، بل بحماية الأقسام الحرجة

---

### السؤال 10 (hard)
**السؤال:** كيف يترجم الـ `JVM` تعليمة `synchronized(a) <stmt>` من ناحية الـ bytecode؟

أ) `push a` ثم `pop a` مباشرة بدون أي ضمانة
ب) `monitorenter` للحصول على ملكية قفل الكائن `a`، ثم تنفيذ `<stmt>`، ثم `monitorexit` لتحرير الملكية
ج) `lock a` و`unlock a` فقط، وهما نفس `monitorenter`/`monitorexit`
د) لا يوجد أي تعليمات bytecode خاصة، `synchronized` مجرد تعليق برمجي (`comment`)

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا علاقة لـ `push`/`pop` بآلية عمل `synchronized`
- ✅ ب): هذا بالضبط ما ورد بالمحاضرة: خطوات `Acquire lock`، `Execute stmt`، `Release lock` تترجم لـ `monitorenter` و`monitorexit`
- ❌ ج): `lock`/`unlock` مصطلحات `Unstructured Locks`، بينما `monitorenter`/`monitorexit` مصطلحات bytecode الفعلية لـ `synchronized`
- ❌ د): `synchronized` تولّد تعليمات bytecode فعلية، ليست مجرد تعليق

---

### السؤال 11 (medium)
**السؤال:** ما الفرق بين `Entry Set` و `Wait Set` بآلية عمل الأقفال بلغة Java؟

أ) لا فرق، هما نفس المجموعة بمسمّيين مختلفين
ب) `Entry Set` تضم الخيوط المنتظرة الحصول على القفل لأول مرة، بينما `Wait Set` تضم خيوطاً استدعت `wait()` وحررت القفل مؤقتاً
ج) `Wait Set` تضم فقط الخيوط المنتهية (`Terminated`)
د) `Entry Set` خاصة بـ `notify()` فقط، و`Wait Set` خاصة بـ `synchronized` فقط

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): المجموعتان مختلفتان تماماً بالوظيفة كما يوضح مخطط المحاضرة
- ✅ ب): هذا الفرق الدقيق — `Entry Set` لخيوط تحاول الدخول لأول مرة، `Wait Set` لخيوط استدعت `wait()` وانتظرت إشعاراً
- ❌ ج): `Wait Set` لا علاقة لها بحالة `Terminated`
- ❌ د): كلا المجموعتين مرتبطتان بآلية القفل الواحدة نفسها، وليستا مقصورتين على دالة واحدة

---

### السؤال 12 (hard)
**السؤال:** لماذا يجب استخدام `wait()` دائماً جوا حلقة `while` بدلاً من `if`؟

أ) لأن `while` أسرع تنفيذاً من `if` بلغة Java
ب) لأن الخيط قد يستيقظ من `notify()` لكن الشرط الحقيقي قد لا يكون محققاً بعد (خيط آخر قد يكون غيّر الحالة)، فيجب إعادة الفحص
ج) لأن الكمبايلر يرفض استخدام `wait()` جوا `if` ويرمي خطأ ترجمة
د) لا فرق فعلي، الاثنان يعملان بنفس الطريقة تماماً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): الفرق ليس بالسرعة بل بصحة المنطق
- ✅ ب): هذا بالضبط سبب القاعدة — بعد الاستيقاظ، خيط آخر قد يسبق ويغيّر الحالة (مثلاً يملأ البوفر من جديد)، فلازم `while` تعيد فحص الشرط قبل المتابعة
- ❌ ج): لا يوجد أي خطأ ترجمة، الكود سيترجم لكن سيكون خاطئاً منطقياً
- ❌ د): استخدام `if` بدل `while` قد يسبب أخطاء منطقية خطيرة (مثل تجاوز حدود البوفر)

---

### السؤال 13 (medium)
**السؤال:** ما الفرق الحاسم بين `notify()` و `notifyAll()`؟

أ) `notify()` تصحي كل الخيوط المنتظرة، و`notifyAll()` تصحي خيطاً واحداً فقط
ب) `notify()` تصحي خيطاً عشوائياً واحداً فقط من `Wait Set`، بينما `notifyAll()` تنقل كل الخيوط المنتظرة إلى `Entry Set` دفعة واحدة
ج) لا فرق، الاثنان يؤديان لنفس النتيجة دائماً
د) `notifyAll()` تُستخدم فقط مع `Unstructured Locks`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هذا عكس التعريف الصحيح تماماً
- ✅ ب): هذا التعريف الدقيق من المحاضرة — `notify()` تختار عشوائياً واحداً، و`notifyAll()` تنقل الجميع ليتنافسوا بأنفسهم
- ❌ ج): النتيجة قد تختلف جذرياً خاصة عندما يوجد أكثر من نوع من الخيوط المنتظرة
- ❌ د): كلاهما جزء من آلية `synchronized`/`Structured Locks` بالمحاضرة

---

### السؤال 14 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
// Thread A                    // Thread B
counter++;                     counter++;
```
إذا نفّذ الخيطان بنفس الوقت بدون `synchronized`، أي من التالي يصف سلوك الكود تحديداً؟

أ) الكود سيتوقف بالكامل (`Deadlock`)
ب) قد تُفقد إحدى عمليتي الزيادة بسبب `Race Condition`، لأن `counter++` ليست عملية ذرية واحدة
ج) النتيجة ستكون دائماً صحيحة لأن `counter++` عملية واحدة بالـ bytecode
د) سيرمي الكود استثناءً (`Exception`) عند التنفيذ

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا يوجد انتظار متبادل هنا، الخيطان يكملان التنفيذ عادياً — هذا ليس `Deadlock`
- ✅ ب): `counter++` تترجم فعلياً لثلاث عمليات منفصلة (قراءة، زيادة، كتابة) — لو الخيطان قرآ نفس القيمة قبل أن يكتب أي منهما، تُفقد إحدى الزيادتين
- ❌ ج): هذا الفهم الخاطئ الشائع تماماً — `counter++` ليست عملية ذرية
- ❌ د): لا يوجد استثناء، النتيجة غلط منطقياً فقط دون أي رمي استثناء

---

### السؤال 15 (hard) — حسابي
**السؤال:** بمثال جمع المصفوفة بالتوازي بالمحاضرة، افترض أن المصفوفة `X` طولها `X.length = 12`. الخيط الرئيسي يجمع من `i = 6` إلى `i = 11` (6 عناصر)، والخيط `t1` يجمع من `i = 0` إلى `i = 5` (6 عناصر). لو كانت قيم عناصر `X` كلها متساوية وتساوي `3`، ما هي القيمة النهائية لـ `sum1 + sum2` بعد استدعاء `t1.join()` بشكل صحيح؟

أ) 18
ب) 24
ج) 36
د) 42

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- خطوات الحساب: كل نصف من المصفوفة فيه 6 عناصر، وكل عنصر قيمته 3
- `sum1` = 6 × 3 = 18 (من `t1`، النصف الأول)
- `sum2` = 6 × 3 = 18 (من الخيط الرئيسي، النصف الثاني)
- المجموع الكلي بعد `join()` الصحيح = 18 + 18 = 36
- ❌ أ) 18: هذه قيمة نصف واحد فقط، ليست المجموع الكلي
- ❌ ب) 24: قيمة غير متسقة مع المعطيات المذكورة
- ✅ ج) 36: هذا المجموع الصحيح بعد جمع كلا النصفين بالكامل
- ❌ د) 42: قيمة أكبر من الناتج الفعلي، خطأ حسابي شائع بإضافة عنصر وهمي إضافي

---

### السؤال 16 (medium)
**السؤال:** ما الفرق الأساسي بين `Structured Locks` و `Unstructured Locks`؟

أ) `Structured Locks` (`synchronized`) تُدار تلقائياً ضمن بلوكات محددة، بينما `Unstructured Locks` تتطلب استدعاءات صريحة لـ `lock`/`unlock` يديرها المبرمج
ب) `Unstructured Locks` أسرع دائماً من `Structured Locks` بكل الحالات
ج) `Structured Locks` لا تضمن `Mutual Exclusion` بعكس `Unstructured Locks`
د) لا يمكن استخدام `Unstructured Locks` بلغة Java إطلاقاً

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): هذا التعريف الدقيق من المحاضرة — الفرق الجوهري هو طريقة الإدارة (تلقائية بالبلوكات مقابل صريحة يديرها المبرمج)
- ❌ ب): المحاضرة لا تنص على أفضلية أداء ثابتة لأي منهما
- ❌ ج): كلاهما يهدف لتحقيق `Mutual Exclusion`، الفرق بطريقة التطبيق فقط
- ❌ د): المحاضرة تذكر صراحة وجود `Unstructured Locks` كنوع ثانٍ متاح بلغة Java

---

# الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)
```java
public synchronized void insert(Object item) {
    if (count == BUFFER_SIZE) wait();
    ++count;
    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
    notify();
}
```
**الخطأ:** استخدام `if` بدل `while` قبل `wait()` — لو الخيط استيقظ من `notify()`، ممكن خيط تاني يكون سبقه وملأ البوفر من جديد، فينفّذ `++count` على بوفر ممتلئ أصلاً.
**التصحيح:** استبدال `if (count == BUFFER_SIZE) wait();` بـ `while (count == BUFFER_SIZE) wait();` لضمان إعادة فحص الشرط بعد كل استيقاظ.

---

### سؤال تصحيح 2 (misconception)
```java
Thread a = new MyTask();
a.run(); // المبرمج يعتقد أن هذا يشغّل خيطاً موازياً
System.out.println("انتهى الخيط الموازي!");
```
**الخطأ:** المبرمج يعتقد خطأً أن `run()` تطلق خيطاً جديداً بالتوازي، بينما هي فعلياً تنفّذ الكود على الخيط الحالي تسلسلياً، فرسالة "انتهى الخيط الموازي" ستُطبع فقط بعد انتهاء `run()` بالكامل، وكأن الكود كان تسلسلياً تماماً.
**التصحيح:** استبدال `a.run();` بـ `a.start();` لإطلاق خيط تنفيذ حقيقي منفصل.

---

### سؤال تصحيح 3 (return_check)
```java
Thread t1 = new Thread(() -> {
    for (int i = 0; i < X.length / 2; i++) sum1 += X[i];
});
t1.start();
for (int i = X.length / 2; i < X.length; i++) sum2 += X[i];
return sum1 + sum2; // بدون التحقق من اكتمال t1
```
**الخطأ:** لا يوجد أي تحقق (`t1.join()`) من انتهاء الخيط `t1` قبل قراءة قيمة `sum1` بسطر `return` — القيمة قد تكون غير مكتملة.
**التصحيح:** إضافة `t1.join();` مباشرة قبل سطر `return sum1 + sum2;` لضمان اكتمال `sum1` بالكامل.

---

### سؤال تصحيح 4 (dead_code)
```java
public synchronized Object remove() {
    Object item;
    if (count == 0) {
        return null; // كود ميت منطقياً في سياق Bounded Buffer الصحيح
    }
    while (count == 0) wait();
    --count;
    item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    notify();
    return item;
}
```
**الخطأ:** السطر `if (count == 0) { return null; }` كود زائد وغير متسق مع تصميم `Bounded Buffer` الصحيح — بدل ما ينتظر المستهلك لحد ما يتوفر عنصر، الكود بيرجع `null` فوراً، وهذا يخالف الغرض من استخدام `wait()` بالسطر التالي مباشرة (الذي أصلاً لن يُنفَّذ أبداً لأن الشرط `count == 0` تم التعامل معه بالأعلى بشكل خاطئ).
**التصحيح:** حذف بلوك `if` بالكامل والاعتماد فقط على `while (count == 0) wait();` كما بالمحاضرة الأصلية.

---

### سؤال تصحيح 5 (logic)
```java
Thread a = new Thread(() -> { /* task A */ });
Thread b = new Thread(() -> { /* task B */ });
a.start();
b.start();
a.join(); // ينتظر a داخل تنفيذ b نفسه بطريقة خاطئة تسبب تسلسلاً غير مقصود
b.join();
```
**الخطأ:** ليس هناك خطأ فعلي بترتيب `join()` هذا تحديداً (كلا الاستدعاءين من نفس الخيط الرئيسي، فلا يوجد دورة انتظار)، لكن كثيراً ما يظن الطلاب أن أي استخدام لـ `join()` بين خيطين متوازيين يُبطل التوازي بالكامل.
**التصحيح (توضيحي):** `a.join()` و`b.join()` هنا صحيحتان تماماً ولا تُلغيان التوازي أثناء تنفيذ `a` و`b` أنفسهما (فهما بدأتا معاً بـ`start()`)، لكن لو استبدلنا الترتيب بحيث ينتظر خيط `a` داخل جسم الخيط `b` والعكس (`a` تستدعي `b.join()` وبالمقابل `b` تستدعي `a.join()`)، عندها فقط يحدث `Deadlock` دائري كما شرحت المحاضرة.

---

# الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

## القواعد الذهبية

| # | القاعدة |
| --- | --- |
| 1 | `Parallel` = سرعة عبر معالجات متعددة. `Concurrent` = تنسيق وصول متزامن لمورد مشترك. |
| 2 | `start()` تُطلق خيطاً جديداً فعلياً؛ `run()` تنفّذ الكود على الخيط الحالي فقط. |
| 3 | دورة حياة الخيط: `New → Runnable → Running → Terminated`، والانتقال `Runnable ↔ Running` بيد الجدولة (`OS/JVM`) لا المبرمج. |
| 4 | `join()` تنتظر خيطاً واحداً محدداً، وقد تسبب `Deadlock` دائرياً حتى بدون `Data Race`. |
| 5 | `synchronized` تحقق `Mutual Exclusion` عبر `monitorenter`/`monitorexit` على قفل الكائن. |
| 6 | مسؤولية اختيار الأقفال الصحيحة تقع على المبرمج، لا يضمنها الكمبايلر تلقائياً. |
| 7 | `wait()` يجب أن تكون دائماً داخل حلقة `while` وليس `if`. |
| 8 | `notify()` تصحي خيطاً عشوائياً واحداً فقط؛ `notifyAll()` تصحي الجميع — استخدمها عند وجود أنواع خيوط متعددة منتظرة. |

## مرجع سريع للمصطلحات

| المصطلح | التعريف بسطر |
| --- | --- |
| `Parallel` | استخدام معالجات متعددة لحل مشكلة أسرع |
| `Concurrent` | أكتر من خيط بيوصل لمورد مشترك بنفس الوقت |
| `Process` | وحدة تنفيذ معزولة تماماً، ذاكرتها خاصة من الـ OS |
| `Thread` | عملية خفيفة، عندها stack خاص لكن تشارك الذاكرة مع خيوط أخرى |
| `start()` | إطلاق خيط تنفيذ جديد فعلياً (مرة واحدة فقط لكل خيط) |
| `run()` | تنفيذ الكود على الخيط الحالي (بدون خيط جديد) |
| `join()` | إجبار الخيط المستدعي على الانتظار حتى ينتهي خيط آخر |
| `Structured Locks` | أقفال مبنية على بلوكات `synchronized`، إدارة تلقائية |
| `Unstructured Locks` | عمليات `lock`/`unlock` صريحة يديرها المبرمج |
| `Entry Set` | مجموعة الخيوط المنتظرة الحصول على قفل لأول مرة |
| `Wait Set` | مجموعة الخيوط التي استدعت `wait()` وتنتظر إشعاراً |
| `notify()` | تصحي خيطاً عشوائياً واحداً من `Wait Set` |
| `notifyAll()` | تصحي كل الخيوط بـ `Wait Set` دفعة واحدة |
| `Bounded Buffer` | مسألة كلاسيكية منتج/مستهلك بحجم مخزن محدود |

---

# الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** شو الفرق بين `Parallel` و `Concurrent`؟
**A:** `Parallel` = سرعة عبر معالجات متعددة. `Concurrent` = تنسيق وصول متزامن لمورد مشترك، وممكن يصير حتى على معالج واحد.

### البطاقة 2
**Q2:** ليش نحتاج `Concurrency` حتى لو ما بدنا سرعة؟
**A:** لثلاث فوائد: استجابة التطبيق (`App responsiveness`)، استغلال أفضل للمعالج أثناء انتظار I/O (`Processor utilization`)، وعزل الأعطال (`Failure isolation`).

### البطاقة 3
**Q3:** ما الفرق بين `Process` و `Thread`؟
**A:** `Process` معزول تماماً وما بيوصل لبيانات process تاني. `Thread` "عملية خفيفة" عندها stack خاص لكن بتوصل لبيانات مشتركة مع خيوط أخرى بنفس الـ Process.

### البطاقة 4
**Q4:** شو بيصير لو استدعينا `thread.run()` بدل `thread.start()`؟
**A:** الكود جوا `run()` بينفذ على الخيط الحالي مباشرة (تسلسلياً)، بدون إطلاق أي خيط جديد إطلاقاً.

### البطاقة 5
**Q5:** ما هي حالات دورة حياة الخيط الأربع؟
**A:** `New` → `Runnable` → `Running` → `Terminated`.

### البطاقة 6
**Q6:** ليش `join()` ممكن تسبب `Deadlock` حتى بدون `Data Race`؟
**A:** لأنه ما فيه قيد على مين بيعمل `join` على مين — لو خيطين عملو `join` على بعض دائرياً، بيصير انتظار أبدي بدون أي تضارب ببيانات.

### البطاقة 7
**Q7:** شو الفرق بين `Structured Locks` و `Unstructured Locks`؟
**A:** `Structured Locks` (`synchronized`) إدارة تلقائية ضمن بلوكات. `Unstructured Locks` عمليات `lock`/`unlock` صريحة يديرها المبرمج بنفسه.

### البطاقة 8
**Q8:** كيف يترجم `JVM` تعليمة `synchronized(a) <stmt>`؟
**A:** إلى ثلاث خطوات: `monitorenter` (طلب ملكية قفل `a`)، تنفيذ `<stmt>`، ثم `monitorexit` (تحرير الملكية).

### البطاقة 9
**Q9:** ما الفرق بين `Entry Set` و `Wait Set`؟
**A:** `Entry Set` لخيوط تحاول الدخول لقفل لأول مرة. `Wait Set` لخيوط استدعت `wait()` وحررت القفل مؤقتاً بانتظار إشعار.

### البطاقة 10
**Q10:** ليش `wait()` لازم تكون دايماً جوا `while` مش `if`؟
**A:** لأنو حتى بعد الاستيقاظ من `notify()`، خيط تاني ممكن يكون سبق وغيّر الحالة، فلازم إعادة فحص الشرط من جديد قبل المتابعة.

### البطاقة 11
**Q11:** شو الفرق بين `notify()` و `notifyAll()`؟
**A:** `notify()` بتصحي خيطاً عشوائياً واحداً بس من `Wait Set`. `notifyAll()` بتصحي كل الخيوط دفعة وحدة وتخليهم يتنافسو على القفل.

### البطاقة 12
**Q12:** كيف بتشتغل `HJlib Runtime` بالخلفية من ناحية الخيوط؟
**A:** بتصنع عدد صغير وثابت من خيوط Java حقيقية (`Worker Threads`، عادة وحدة لكل core)، وبتوزع عليهم المهام (`async`/`continuations`) عبر طابور شغل منطقي (`push`/`pull`).

### البطاقة 13
**Q13:** شو الفجوة الأساسية بحل `Bounded Buffer` بـ `synchronized` بس بدون `wait()`/`notify()`؟
**A:** `synchronized` بتضمن `mutual exclusion` بس ما بتحل مشكلة "شو بنعمل لو البوفر ممتلئ أو فاضي؟" — لازم آلية انتظار شرطي إضافية.

---

## ملاحظة حول محتوى غير قابل للتمثيل بالكامل بصيغة نصية

#### ملاحظة:
بعض الرسومات بالمحاضرة الأصلية (مثل الشعار البصري لمخطط `Systems = Objects + Activities` بالصفحة 6، والرسمة اللونية لتوزيع `Thread A-G` على `Core 0-3` بالصفحة 8) هي رسومات توضيحية بصرية بحتة تم تمثيل محتواها المنطقي كاملاً بجداول ومخططات `flowchart` أعلاه، لكن الشكل الفني الدقيق (الألوان، الأسهم المنحنية) موجود فقط بالملف الأصلي (PDF) إذا رغبت بمراجعته بصرياً.

**ملخص المحتوى:** الرسومات توضح بصرياً نفس المفاهيم المشروحة نصياً وجدولياً بالأقسام 1.3 و 2.2 أعلاه (Objects+Activities، وتوزيع الخيوط على الأنوية).

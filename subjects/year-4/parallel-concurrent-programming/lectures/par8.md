# المحاضرة 8 — Actor Concurrency Model (نموذج الـ Actor للتزامن)
> **المادة:** البرمجة المتوازية والمتزامنة (نظري) | **الموضوع:** الانتقال من الأقفال والعزل اليدوي (`Isolated`, `Object-based Isolation`) إلى نموذج تجريدي أعلى يجعل العزل هو الافتراضي: `Actor Model`.

---

# الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 1. lecture_overview
هذه المحاضرة بتقدّم `Actor Model` كطريقة بديلة للتعامل مع البيانات المشتركة بين الخيوط، بحيث بدل ما نحط `isolated` بكل مكان بيدنا (وننسى مكان وتصير مشكلة)، منخلي العزل *افتراضي* من خلال تغليف الحالة جوا كائن (actor) ما حدا غيره بلمسها إلا عن طريق رسائل.

### 2. learning_objectives
بعد هذه المحاضرة رح تقدر:
- تشرح ليش الاعتماد على `Isolated` بشكل يدوي خطير وليش الحاجة لنموذج "عزل افتراضي".
- تعرّف `Actor` وتذكر عناصره الأربعة (identity, thread, state, procedures).
- تفرّق بين مراحل حياة الـ `Actor`: `New` → `Started` → `Terminated`.
- تكتب `Actor` بسيط باستخدام `HJlib` (`process`, `send`, `start`, `exit`).
- تشرح كيف يُستخدم الـ `Pipelining` مع الـ `Actors`، وليش ممكن يصير فيه `bottleneck`.
- تحل مسائل كلاسيكية بالـ Actors: `Sieve of Eratosthenes`, `Producer-Consumer`, `Bounded Buffer`.

### 3. prerequisites
لازم تكون فاهم من المحاضرات السابقة:
- `Threads` و `Locks` (إدارة الخيوط اليدوية).
- `Critical Sections` و `Isolated Construct` (كيف نحمي بيانات مشتركة بلوك بلوك).
- `Object-based Isolation` (تغليف العزل جوا كائن).
- أساسيات Java (classes, methods) ومفهوم الـ `finish`/`async` من محاضرات التوازي السابقة.

### 4. main_concepts
- **Actor:** كائن مستقل عنده خيط تنفيذ واحد وحالة محلية معزولة افتراضياً.
- **Message Passing:** الطريقة الوحيدة للتواصل مع Actor هي إرسال رسالة له، مش نداء مباشر على متغيراته.
- **Mailbox:** صندوق الرسائل الداخلي اللي بيخزن رسائل الـ Actor لحد ما يعالجها وحدة وحدة.
- **Actor Life Cycle:** `New` → `Started` → `Terminated`.
- **Pipelining with Actors:** كل مرحلة معالجة تصير Actor منفصل، والبيانات بتمشي بينهم بالتسلسل.
- **Parallelism inside process():** إمكانية استخدام `finish`/`async` جوا `process()` نفسها لتسريع معالجة رسالة وحدة.
- **Structural Determinism (ضمناً):** لأنه ما في مشاركة مباشرة بالذاكرة، ما في `Data Race` بالتصميم.

### 5. connections
هذه المحاضرة (8) بتبني مباشرة على محاضرة `Isolated Construct` و `Object-based Isolation` (الأسبوع اللي قبل)، وبتفتح الطريق للمحاضرة الجاية اللي رح تغطي `pause()`/`resume()` (متل ما أشارت الشريحة الأخيرة بـ "Next lecture")، وبتوسّع فكرة `Pipelining` اللي اتشرحت بمحاضرات `Data Flow Synchronization and Pipelining` بالجزء الأول من المادة.

### 6. common_mistakes
1. الطالب بيفكر إنو الـ `Actor` هو مجرد `Thread` عادي — بينسى إنو الفرق الجوهري هو **العزل الافتراضي للحالة**.
2. نسيان استدعاء `start()` قبل إرسال الرسائل — الـ Actor ما بيعالج رسائل وهو بحالة `New`.
3. نسيان استدعاء `exit()` جوا `process()` — الـ Actor بيضل `Started` للأبد وما بينتقل لـ `Terminated`.
4. الخلط بين `Isolated Construct` (عزل يدوي بلوك محدد) و `Actor` (عزل تلقائي دائم على مستوى الكائن كله).
5. الاعتقاد إنو ترتيب معالجة الرسائل بين Actors مختلفين مضمون دائماً — بينما الترتيب مضمون فقط بين نفس المُرسل ونفس المُستقبل.

---

# الجزء الثاني: الشرح التفصيلي

## 1. لماذا نحتاج نموذج الـ Actor؟

#### 📍 أين نحن الآن؟
هذه المجموعة (1.1 → 1.2) بتشرح المشكلة الأساسية اللي دفعت لظهور `Actor Model`: العزل اليدوي بواسطة `Isolated` مش كافي لأنه بيعتمد على انضباط المبرمج.

#### ⬅️ الربط مع السابق
بالمحاضرات السابقة تعلمنا `Isolated Construct` كطريقة لحماية `Critical Section`. بس هون رح نكتشف ثغرة بهاد الأسلوب: شو اللي بيمنع مبرمج تاني إنه ينسى يحط `isolated` ويلمس نفس البيانات مباشرة؟

### 1.1. مشكلة العزل اليدوي (The Problem with Manual Isolation)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "lecture_7_isolated_construct", group: "1.1-1.2"} -->

#### 💡 الفكرة الأساسية
**استخدام `Isolated` بشكل يدوي بيحمي بس المكان اللي حطيته فيه — أي مكان تاني بيلمس نفس البيانات بدون `Isolated` بيبقى مكشوف.**

#### 💻 الكود
```java
// Attempt to implement Atomic Integer manually
class AtomicCounter {
    int CUR = 0;

    int GETandADD(int DELTA) {
        int J;
        isolated(() -> {
            J = CUR;
            CUR = CUR + DELTA;
        });
        return J;
    }

    // Someone forgets to protect this method!
    void FOO() {
        CUR = CUR * 2; // NOT isolated -> race condition possible
    }
}
```

#### شرح الكود سطراً بسطر
1. `int CUR = 0;` — هاي الحالة المشتركة اللي أكتر من خيط ممكن يلمسها.
2. `GETandADD(DELTA)` — بيستخدم `isolated` صح: يقرأ القيمة القديمة `J`، يحدّث `CUR`، ويرجّع `J`.
3. `isolated(() -> {...})` — هاد البلوك محمي؛ ما في خيط تاني يقدر يدخل عليه بنفس اللحظة.
4. `FOO()` — هون المشكلة: عدّل `CUR` **بدون** `isolated`. لو خيط تاني عم يستدعي `GETandADD` بنفس الوقت، ممكن تصير قراءة/كتابة متضاربة.

#### 📖 الشرح
فكّر إنك بتحط قفل (`Isolated`) على باب غرفة معينة بس بتنسى إنو فيه شباك مفتوح (`FOO`) حدا ممكن يفوت منه لنفس الغرفة بدون ما يمر من الباب المقفول. هاد بالضبط اللي بيصير هون: `CUR` محمية بمكان وحد بس مكشوفة بمكان تاني. المشكلة مش بالـ `Isolated` نفسه — هو صحيح وقوي — المشكلة إنه **اختياري**: لازم المبرمج يتذكر يحطه بكل مكان، وأي نسيان واحد بيكسر كل الحماية.

**🤔 تفعيل الفهم:** لو عندك 10 methods بتلمس نفس المتغير، وحطيت `isolated` بـ9 منهم بس نسيت وحدة، شو بيصير للنتيجة النهائية؟

#### 🎯 الملخص السريع
- `Isolated` بيحمي بس البلوك المحدد اللي أنت حاطه فيه.
- أي وصول تاني للبيانات المشتركة من برا الـ `isolated` بيبقى غير محمي.
- الحل: نحتاج نموذج العزل يكون **افتراضي**، مو خيار يدوي.

#### 📚 التطبيق
هاي المشكلة بالضبط هي اللي رح يحلها `Actor` بالفقرة الجاية — عن طريق ما يسمح أساساً بالوصول المباشر للحالة من برا.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Suppose we are implementing the concept of Atomic Integer. ISOLATED is used (critical section). What about processing CUR at another place without isolated??? We need the isolation is the default, and here where actors come. Actor is an independent thread takes care of concurrent accesses to shared data, where accesses are in a form of messages.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: مشكلة العزل اليدوي والحاجة للعزل الافتراضي.
- ℹ️ إضافة من الدليل: تشبيه الباب/الشباك، مثال كود `FOO()`.

</details>

---

### 1.2. فكرة الحل: العزل الافتراضي عبر الرسائل (Isolation by Default via Messages)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1", group: "1.1-1.2"} -->

#### 💡 الفكرة الأساسية
**الـ `Actor` هو خيط مستقل بيتولى كل الوصول للبيانات المشتركة، والوصول الوحيد المسموح له هو عن طريق رسائل — مش نداء مباشر.**
*(بعد ما شفنا المشكلة بـ 1.1، هون منشوف الفكرة اللي بتحلها.)*

#### 💻 الكود
```java
// Conceptual sketch: instead of exposing CUR directly,
// wrap it inside an actor and only communicate via messages
class CounterActor extends Actor<Message> {
    private int CUR = 0; // private, no one touches it directly

    protected void process(Message msg) {
        if (msg instanceof AddMessage) {
            CUR = CUR + ((AddMessage) msg).delta;
        }
    }
}
```

#### شرح الكود سطراً بسطر
1. `class CounterActor extends Actor<Message>` — الكائن بقى Actor، مش كلاس عادي.
2. `private int CUR = 0;` — الحالة أصبحت خاصة تماماً؛ محدا برا الـ actor يقدر يلمسها مباشرة.
3. `process(Message msg)` — النقطة الوحيدة اللي فيها بيتغير `CUR`، وبتشتغل رسالة-رسالة، مش بالتوازي مع نفسها.

#### 📖 الشرح
لاحظ إنه ما في `isolated` هون أصلاً — لأنه العزل **مضمون بالتصميم**: محدا غير الـ actor نفسه بيقدر يعدّل `CUR`، وبما إنه الـ actor عنده خيط تنفيذ واحد بيعالج رسالة وحدة بكل مرة، فمستحيل يصير تعارض. هاي هي الفكرة الجوهرية: **بدل ما تحمي البيانات بقفل، بتخبيها بالكامل وتخلي التواصل معها بس عن طريق رسائل**.

#### 🎯 الملخص السريع
- الحل: خبّي الحالة تماماً جوا الـ Actor.
- التواصل الوحيد المسموح = رسائل.
- النتيجة: عزل تلقائي دائم، مش معتمد على تذكّر المبرمج.

#### 📚 التطبيق
بالفقرة الجاية (2) رح نعرّف رسمياً شو هو الـ `Actor` وشو عناصره الأربعة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Actor is an independent thread takes care of concurrent accesses to shared data, where accesses are in a form of messages.

</details>

---

## 2. تعريف الـ Actor وعناصره

#### 📍 أين نحن الآن؟
هذه المجموعة (2.1 → 2.2) بتعرّف رسمياً شو هو الـ `Actor` وشو بيقدر يعمل — العناصر البنيوية وبعدها السلوكيات المسموحة.

#### ⬅️ الربط مع السابق
بعد ما فهمنا بالقسم 1 *ليش* بدنا Actor (لحل مشكلة العزل اليدوي)، هلق منعرف بالضبط *شو* هو من حيث البنية.

### 2.1. عناصر الـ Actor (Actor Anatomy)
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.2", group: "2.1-2.2"} -->

#### 💡 الفكرة الأساسية
**كل `Actor` هو مكوّن مستقل عنده هوية ثابتة، خيط تنفيذ واحد، حالة محلية معزولة، وواجهة (procedures) للتفاعل معها.**

#### 📊 المخطط
تخيل دائرة واحدة تمثّل الـ Actor: فيها خيط تنفيذ (Thread) ملفوف حوالين صندوق الحالة (State)، وتحت الصندوق فيه دائرة صغيرة اسمها Procedure بتمثّل الواجهة اللي بتوصل للحالة.

| رقم العقدة | الوصف |
| --- | --- |
| N1 | `Thread` — الخيط الوحيد المسؤول عن تنفيذ منطق الـ Actor |
| N2 | `State` — الحالة المحلية القابلة للتعديل (mutable)، لكنها معزولة افتراضياً |
| N3 | `Procedure` — الواجهة (interface) اللي بتسمح بتعديل الحالة |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| N1 | N2 | الخيط ينفذ العمليات على الحالة |
| N2 | N3 | الحالة يتم تعديلها فقط عبر الواجهة |

```flowchart
[Thread] --controls--> [State (isolated by default)]
[State] --accessed only via--> [Procedure/Interface]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: كل Actor هو "كبسولة" مغلقة — جوّاتها خيط واحد بيدير حالة (State) قابلة للتغيير، بس محدا من برا يقدر يوصلها إلا من خلال "الباب الرسمي" (Procedure/Interface). أربعة عناصر رئيسية لازم تحفظها:
1. **هوية غير قابلة للتغيير (immutable identity / global reference):** لكل Actor عنوان مرجعي ثابت ما بيتغير طول حياته — متل رقم الهاتف الثابت لشخص.
2. **خيط تنفيذ منطقي واحد (single logical thread of control):** ما في تنفيذين بالتوازي جوا نفس الـ Actor.
3. **حالة محلية قابلة للتغيير ومعزولة افتراضياً (mutable local state, isolated by default):** فيها بيانات ممكن تتغير، بس محمية تلقائياً.
4. **واجهة (procedures / interface):** الطريقة الرسمية الوحيدة للتفاعل مع الحالة.

**💡 تشبيه:** فكّر بالـ Actor متل موظف استقبال بمكتب مغلق. ما بتقدر تفوت وتاخد ملف من درجه بنفسك (State) — لازم تعطيه طلب (Message عبر الـ Interface)، وهو (Thread) بيرد عليك واحد ورا الثاني.

#### 🎯 الملخص السريع
- 4 عناصر: identity, thread, state, procedures.
- الحالة قابلة للتغيير لكنها معزولة تلقائياً.
- التفاعل فقط عبر الواجهة الرسمية.

#### 📚 التطبيق
بالفقرة الجاية (2.2) رح نشوف شو بالضبط بيقدر الـ Actor "يعمل" باستخدام هاي العناصر.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفكرو إنو الـ `Actor` هو مجرد اسم تاني لـ `Thread` عادي، لأنه بالنهاية "عنده thread واحد".

#### الفهم الصحيح ✅:
الفرق الحاسم: `Thread` وحده ما بيضمن عزل الحالة — لازم إنت تحطلها `Lock`/`Isolated` يدوياً. `Actor` بيضمن العزل **تلقائياً** لأنه ببساطة ما بيسمح بأي وصول مباشر للحالة من برا الواجهة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Actors are an alternative approach to isolation, atomics. An actor is an autonomous, interacting component of a parallel system. An actor has: an immutable identity (global reference), a single logical thread of control, mutable local state (isolated by default), procedures to manipulate local state (interface).

</details>

---

### 2.2. سلوكيات الـ Actor (What an Actor May Do)
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1", group: "2.1-2.2"} -->

#### 💡 الفكرة الأساسية
**الـ Actor بيقدر يعالج رسائل، يغيّر حالته المحلية، ينشئ Actors جدد، ويرسل رسائل لـ Actors تانية.**

#### 📊 المخطط
تخيل ثلاث دوائر: الأولى بترسل رسالة (Messages) للثالثة، وبتنشئ (create) الثانية.

| رقم العقدة | الوصف |
| --- | --- |
| A1 | Actor أساسي عنده Thread + State + Procedure |
| A2 | Actor جديد تم إنشاؤه بواسطة A1 عبر `create` |
| A3 | Actor آخر موجود مسبقاً، استقبل رسالة من A1 |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| A1 | A2 | إنشاء (create) |
| A1 | A3 | إرسال رسالة (Messages) |

```flowchart
[Actor A1] --create--> [Actor A2 (new)]
[Actor A1] --send message--> [Actor A3]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: الـ Actor مش بس "يستقبل ويرد" — عنده أربع قدرات فعلية:
1. **معالجة رسائل (process messages):** يقرأ من صندوق بريده (Mailbox) رسالة رسالة.
2. **تغيير حالته المحلية (change local state):** بعد معالجة الرسالة ممكن يعدّل بياناته الخاصة.
3. **إنشاء Actors جدد (create new actors):** زي مدير بيوظف موظف جديد لما يحتاج.
4. **إرسال رسائل (send messages):** يتواصل مع Actors تانية بنفس الطريقة (رسائل).

*(وبعد ما فهمنا عناصر البنية بـ 2.1، هون منشوف شو بيقدر يعمل فعلياً بهاي العناصر.)*

#### 🎯 الملخص السريع
- 4 سلوكيات: process, change state, create, send.
- كل تفاعل خارجي = رسالة، سواء كان الطرف التاني actor أو لأ.

#### 📚 التطبيق
هاي السلوكيات الأربعة هي نفسها اللي رح نشوفها متطبّقة بكود حقيقي بالـ `HJlib` بالقسم 4.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> An actor may process messages, change local state, create new actors, send messages.

</details>

---

## 3. نموذج Actor الرسمي (The Actor Model)

#### 📍 أين نحن الآن؟
هذه المجموعة فقرة وحدة (3.1) بتحط الـ Actor بسياقه التاريخي والنظري كنموذج تزامن كامل، مش بس فكرة تصميم.

#### ⬅️ الربط مع السابق
بعد ما عرفنا شكل الـ Actor وسلوكياته (قسم 2)، هلق منشوف ليش هو "نموذج" (Model) كامل للتزامن، وشو مبادئه الأساسية.

### 3.1. Actor Model: التعريف الرسمي والمبادئ
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2", group: "3.1"} -->

#### 💡 الفكرة الأساسية
**`Actor Model` هو نموذج تزامن قائم على الرسائل (message-based)، بيعامل كل شيء بالنظام كـ Actor، تماماً متل ما الـ OOP بتعامل كل شيء ككائن (object).**

#### 💻 الكود
```java
// Pseudocode illustrating "everything is an actor"
// analogous to "everything is an object" in OOP
Actor<Message> a = new SomeActor();
a.start();
a.send(new SomeMessage()); // async, non-blocking
```

#### شرح الكود سطراً بسطر
1. `Actor<Message> a = new SomeActor();` — إنشاء Actor بنوع رسالة محدد.
2. `a.start();` — تفعيل الـ Actor عشان يبدأ يعالج رسائل.
3. `a.send(...)` — إرسال غير متزامن (asynchronous)، بيرجع فوراً من غير ما ينتظر معالجة الرسالة.

#### 📖 الشرح
النموذج تم تعريفه أول مرة سنة 1973 من `Carl Hewitt`، وبعدين تطوّر نظرياً أكتر على يد `Henry Baker` و `Gul Agha`. الفكرة المحورية: **كل شيء بالنظام هو Actor** — تماماً متل ما بالـ OOP كل شيء كائن. النتيجة العملية الأهم: **الحالة القابلة للتغيير مش مشتركة (mutable state is not shared)**، وبالتالي **ما في `Data Race` بالتصميم أصلاً** — مش لأنك حطيت قفل، لكن لأنه بنية النظام نفسها ما بتسمح بمشاركة مباشرة.

فيه كمان ميزتين مهمّتين:
- **إرسال رسائل غير متزامن (asynchronous message passing):** الُمرسل ما بينتظر رد فوري — الـ `send()` بيرجع مباشرة.
- **ترتيب غير محدد للرسائل (non-deterministic ordering of messages):** بشكل عام مش مضمون ترتيب وصول الرسائل من مصادر مختلفة، بس (كما رح نشوف بالمثال العملي بقسم 5) كثير مكتبات — منها `HJlib` — بتحافظ على ترتيب الرسائل *بين نفس المُرسل ونفس المُستقبل*.

**🤔 تفعيل الفهم:** إذا Actor A بعت رسالتين متتاليتين لـ Actor B، هل مضمون توصل بنفس الترتيب؟ وإذا Actor A و Actor C كل واحد بعت رسالة لـ B بنفس اللحظة تقريباً، هل الترتيب بينهم مضمون؟

#### 🎯 الملخص السريع
- `Carl Hewitt` (1973) هو أول من عرّف النموذج، وطوّره لاحقاً `Henry Baker` و `Gul Agha`.
- المبدأ: "كل شيء Actor" (زي "كل شيء Object" بالـ OOP).
- الحالة القابلة للتغيير غير مشتركة → صفر `Data Race` بالتصميم.
- إرسال غير متزامن + ترتيب غير محدد عموماً (إلا بين نفس الزوج مرسل/مستقبل).

#### 📚 التطبيق
هلق بعد ما فهمنا النظرية، جاي دورنا نشوف مراحل حياة الـ Actor عملياً (قسم 4)، وبعدها كيف نطبّق كل هذا بمكتبة `HJlib` حقيقية.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
بعض الطلاب بيفكرو إنو "ترتيب غير محدد (non-deterministic ordering)" يعني إنو نتائج البرنامج عشوائية تماماً وغير قابلة للتوقع أبداً.

#### الفهم الصحيح ✅:
عدم التحديد بيخص فقط **ترتيب وصول رسائل من مصادر مختلفة** لنفس المستقبل. أما الرسائل من **نفس المُرسل لنفس المُستقبل**، فترتيبها محفوظ عادةً (متل ما بـ `HJlib`)، وهاد اللي بيخلي تصميم بروتوكولات موثوقة فوق الـ Actors ممكن.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A message-based concurrency model to manage mutable shared state. First defined in 1973 by Carl Hewitt. Further theoretical development by Henry Baker and Gul Agha. Key Ideas: Everything is an Actor! Analogous to "everything is an object" in OOP. Encapsulate shared state in Actors. Mutable state is not shared - i.e., no data races. Other important features: Asynchronous message passing. Non-deterministic ordering of messages.

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف التاريخي، المبادئ الأساسية، الميزتين الإضافيتين.
- ℹ️ إضافة من الدليل: ربط مسبق بمثال HJlib اللي رح يجي بقسم 5 لتوضيح حفظ الترتيب.

</details>

---

## 4. دورة حياة الـ Actor (Actor Life Cycle)

#### 📍 أين نحن الآن؟
فقرة وحدة (4.1) بتشرح المراحل الثلاث اللي بيمر فيها أي Actor من لحظة إنشائه لحد إنهائه.

#### ⬅️ الربط مع السابق
بعد ما فهمنا نظرياً شو هو الـ Actor (قسم 2-3)، هلق لازم نفهم "توقيته الزمني" — امتى بيقدر يشتغل وامتى بيوقف، عشان لما نكتب كود حقيقي (قسم 5) نعرف نتحكم فيه صح.

### 4.1. المراحل الثلاث: New → Started → Terminated
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1", group: "4.1"} -->

#### 💡 الفكرة الأساسية
**كل Actor بيمر بثلاث مراحل بالترتيب: `New` (تم إنشاؤه) → `Started` (بيعالج رسائل) → `Terminated` (توقف نهائياً).**

#### 📊 المخطط

| رقم العقدة | الوصف |
| --- | --- |
| S1 | `New` — تم إنشاء الـ Actor لكنه لسا ما بيعالج رسائل (مثال: حساب إيميل تم إنشاؤه بس مش مفعّل) |
| S2 | `Started` — الـ Actor قادر يعالج رسائل (مثال: حساب الإيميل تم تفعيله) |
| S3 | `Terminated` — الـ Actor ما رح يعالج رسائل تانية أبداً (مثال: إغلاق حساب الإيميل بعد التخرج) |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| Start | S1 | إنشاء الكائن (constructor) |
| S1 | S2 | استدعاء `start()` |
| S2 | S3 | استدعاء `exit()` جوا `process()` |
| S3 | End | نهاية دورة الحياة |

```flowchart
(start) --> [New] --start()--> [Started] --exit()--> [Terminated] --> (end)
```

#### 📖 الشرح
اقرأ المخطط كالتالي: هاد بالضبط متل دورة حياة حساب بريد إلكتروني جامعي:
1. **`New`:** تم إنشاء الحساب (تم استدعاء الـ constructor)، بس لسا ما تفعّل — أي رسالة/إيميل بيوصله بهاي المرحلة ما رح يتعالج.
2. **`Started`:** تم تفعيل الحساب — هلق فيه Mailbox شغّال وفيه Local State (بيانات المستخدم) وفيه عملية معالجة (process one message at a time) — يعني رسالة رسالة، مش كلهم بنفس اللحظة.
3. **`Terminated`:** الطالب تخرّج، الحساب انسكر نهائياً — محدا بعتلوه إيميل رح يوصله أو يتعالج بعد هيك.

**💡 تشبيه:** فكّر فيها متل توظيف موظف جديد: أول شي بتوقّع القرار (New)، بعدين بيباشر شغل فعلي (Started)، وبالنهاية بيتقاعد (Terminated) وما بيرد على إيميلات الشركة بعدها.

#### 🎯 الملخص السريع
- 3 حالات فقط: `New`, `Started`, `Terminated`.
- الانتقال بينهم أحادي الاتجاه (ما فيه رجوع لحالة سابقة).
- المعالجة تصير رسالة واحدة بكل مرة (one message at a time)، مش بالتوازي.

#### 📚 التطبيق
بالقسم الجاي (5) رح نشوف بالظبط كيف نتحكم بهاي المراحل بكود Java حقيقي عن طريق `start()` و `exit()`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بينسوا إنه لازم تستدعي `start()` قبل ما ترسل رسائل، وبيفترضوا إنه بمجرد `new MyActor()` صار جاهز يستقبل رسائل.

#### الفهم الصحيح ✅:
الـ Actor بحالة `New` **ما بيعالج ولا رسالة واحدة** — لازم استدعاء `start()` صراحةً عشان ينتقل لـ `Started` ويبلّش يقرأ من الـ Mailbox.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Actor states: New: Actor has been created (e.g., email account has been created). Started: Actor can process messages (e.g., email account has been activated). Terminated: Actor will no longer processes messages (e.g., termination of email account after graduation).

**ملاحظة على التغطية:**
- ✓ تم شرح: المراحل الثلاث بالكامل مع الأمثلة الأصلية من المحاضرة.
- ℹ️ إضافة من الدليل: تشبيه الموظف الجديد، الربط بمفهوم mailbox من الرسمة المرفقة بنفس الشريحة.

</details>

---

## 5. استخدام Actors بمكتبة HJlib

#### 📍 أين نحن الآن؟
هذه المجموعة (5.1 → 5.3) بتاخدنا من النظرية للتطبيق العملي: كيف نكتب Actor حقيقي بلغة Java باستخدام مكتبة `HJlib`، شو الـ API المتوفر، ومثال Hello World كامل.

#### ⬅️ الربط مع السابق
بعد ما فهمنا دورة حياة الـ Actor نظرياً بالقسم 4، هلق منشوف كيف كل مرحلة (`New`, `Started`, `Terminated`) بتترجم لأسطر كود فعلية.

### 5.1. إنشاء Actor بـ HJlib (Creating and Using an Actor)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1", group: "5.1-5.3"} -->

#### 💡 الفكرة الأساسية
**تعمل Actor بـ `HJlib` عن طريق: (1) توريث `Actor<T>` وتطبيق `process()`، (2) إنشاء وتفعيل بـ `start()`، (3) إرسال رسائل بـ `send()`.**

#### 💻 الكود
```java
import edu.rice.hj.runtime.actors.Actor;

// Step 1: define your actor class
class MyActor extends Actor<String> {
    protected void process(String message) {
        System.out.println("Processing " + message);
    }
}

// Step 2: instantiate and start
Actor<String> anActor = new MyActor();
anActor.start(); // transitions New -> Started

// Step 3: send messages (from actor or non-actor code)
anActor.send("hello"); // aMessage can be any object in general
```

#### شرح الكود سطراً بسطر
1. `class MyActor extends Actor<String>` — يعرّف actor بنوع رسالة `String` (النوع T هو نوع الرسالة).
2. `process(String message)` — هون منحدد "سلوك" الـ Actor: شو يعمل لما توصله رسالة.
3. `Actor<String> anActor = new MyActor();` — الآن الـ Actor بحالة `New`.
4. `anActor.start();` — ينقل الـ Actor لحالة `Started` — بلّش يقدر يعالج رسائل.
5. `anActor.send("hello");` — إرسال رسالة؛ ممكن يستدعيها actor تاني أو حتى كود عادي مش actor.

#### 📖 الشرح
لاحظ التماثل الكامل مع دورة الحياة اللي شرحناها بالقسم 4: الـ `new MyActor()` = حالة `New`، و`start()` = الانتقال لـ `Started`، و(متل ما رح نشوف بالفقرة الجاية) استدعاء `exit()` جوا `process()` = الانتقال لـ `Terminated`. الرسالة (`aMessage`) ممكن تكون أي `Object` بشكل عام — مش شرط تكون `String` بالضبط، حسب نوع T اللي حددته.

#### 🎯 الملخص السريع
- ورّث `Actor<T>` وطبّق `process()`.
- `start()` لازم تُستدعى قبل أي `send()`.
- `send()` ممكن يستدعيها actor أو كود عادي.

#### 📚 التطبيق
بالفقرة الجاية (5.2) رح نشوف باقي دوال الـ API — خصوصاً كيف ننهي (`exit()`) الـ Actor.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Create your custom class which extends edu.rice.hj.runtime.actors.Actor&lt;T&gt;, and implement the void process() method (type parameter T specifies message type). Instantiate and start your actor: Actor&lt;Object&gt; anActor = new MyActor(); anActor.start(). Send messages to the actor (can be performed by actor or non-actor): anActor.send(aMessage); //aMessage can be any object in general.

</details>

---

### 5.2. ملخص واجهة HJlib Actor API
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1", group: "5.1-5.3"} -->

#### 💡 الفكرة الأساسية
**بالإضافة لـ `process`, `send`, `start`, فيه دوال "راحة" (`onPreStart`, `onPostStart`, `onPreExit`, `onPostExit`) ودالة إنهاء `exit()`.**
*(بعد ما شفنا الاستخدام الأساسي بـ 5.1، هون منجمع كل الـ API بمكان واحد.)*

#### 💻 الكود
```java
class LifecycleActor extends Actor<Message> {
    void onPreStart()  { /* code executed BEFORE actor is started */ }
    void onPostStart() { /* code executed AFTER actor is started */ }

    protected void process(Message theMsg) {
        // actor's behavior when processing messages
        if (theMsg.isStopSignal()) {
            exit(); // actor calls exit() to terminate itself
        }
    }

    void onPreExit()  { /* code executed BEFORE actor is terminated */ }
    void onPostExit() { /* code executed AFTER actor is terminated */ }
}
```

#### شرح الكود سطراً بسطر
1. `onPreStart()` — كود اختياري بينفّذ قبل ما الـ Actor يوصل لحالة `Started`.
2. `onPostStart()` — كود اختياري بينفّذ بعد ما يوصل لحالة `Started`.
3. `process(theMsg)` — قلب سلوك الـ Actor؛ هون منحدد الاستجابة لكل رسالة.
4. `exit()` — الـ Actor نفسه (مش حدا خارجي) هو اللي بيقرر ينهي حاله وينتقل لـ `Terminated`.
5. `onPreExit()` / `onPostExit()` — كود اختياري قبل/بعد الإنهاء الفعلي — مفيد للتنظيف (cleanup).

#### 📖 الشرح
لاحظ التماثل: `onPreStart`/`onPostStart` بلفّو حول `start()`، و`onPreExit`/`onPostExit` بلفّو حول `exit()` — بالضبط متل "hooks" قبل وبعد أي حدث مهم بدورة الحياة. هاد التصميم بيسمح لك تحضّر موارد قبل ما يبلّش الـ Actor يشتغل، وتنضّف موارد قبل/بعد ما ينتهي، من دون ما تعبّي منطق `process()` بتفاصيل غير متعلقة بمعالجة الرسائل.

**#### مهم للامتحان ⚠️:**
المحاضرة أشارت إنه `pause()` و `resume()` (لإيقاف واستئناف معالجة الرسائل مؤقتاً) هنّ موضوع **المحاضرة الجاية**، فبالتالي مش المفروض تتوقع أسئلة تفصيلية عنهم بامتحان هذه المحاضرة تحديداً.

#### 🎯 الملخص السريع
- `process`: سلوك معالجة الرسائل (إلزامي).
- `send`: إرسال رسالة (async).
- `start`/`onPreStart`/`onPostStart`: بدء التشغيل + hooks.
- `exit`/`onPreExit`/`onPostExit`: الإنهاء الذاتي + hooks.
- `pause`/`resume`: بمحاضرة قادمة.

#### 📚 التطبيق
بالفقرة الجاية (5.3) رح نشوف مثال Hello World كامل يجمع كل هاي الدوال سوا.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> void process(MessageType theMsg) // Specification of actor's "behavior" when processing messages. void send(MessageType msg) // Send a message to the actor. void start() // Cause the actor to start processing messages. void onPreStart() / onPostStart() // Convenience hooks. void exit() // Actor calls exit() to terminate itself. void onPreExit() / onPostExit() // Convenience hooks. Next lecture: void pause() // Pause the actor. void resume() // Resume a paused actor.

</details>

---

### 5.3. مثال متكامل: Hello World بالـ Actors
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.2", group: "5.1-5.3"} -->
<!-- @type: example-for-topics-5.1-to-5.2 -->

#### 💡 الفكرة الأساسية
**مثال Hello World بيجمع كل عناصر الـ API: `start`, `send`, `process`, `exit`، ضمن `finish` عشان ننتظر انتهاء الـ Actor.**

#### 📌 السيناريو
عندنا `EchoActor` بيستقبل رسالتين نصيتين ("Hello" و "World")، وبعدها رسالة إنهاء خاصة، وبيطبع عدد الرسائل مع محتواها.

#### 💻 الكود
```java
public class HelloWorld {
    public static void main(final String[] args) {
        finish(() -> {
            EchoActor actor = new EchoActor();
            actor.start(); // don't forget to start the actor
            actor.send("Hello");  // asynchronous send (returns immediately)
            actor.send("World");  // non-actors can send messages to actors
            actor.send(EchoActor.STOP_MSG);
        });
        System.out.println("EchoActor terminated.");
    }

    private static class EchoActor extends Actor<Object> {
        static final Object STOP_MSG = new Object();
        private int messageCount = 0;

        protected void process(final Object msg) {
            if (STOP_MSG.equals(msg)) {
                System.out.println("Message-" + messageCount + ": terminating.");
                exit(); // never forget to terminate an actor
            } else {
                messageCount += 1;
                System.out.println("Message-" + messageCount + ": " + msg);
            }
        }
    }
}
```

#### شرح الكود سطراً بسطر
1. `finish(() -> {...})` — ننتظر انتهاء كل المهام غير المتزامنة جواها، بما فيها الـ Actor.
2. `EchoActor actor = new EchoActor();` — إنشاء (حالة `New`).
3. `actor.start();` — تفعيل (حالة `Started`).
4. `actor.send("Hello"); actor.send("World");` — إرسالان متتاليان من *نفس* المُرسل (الـ `main`) لنفس المُستقبل — لذلك ترتيبهم مضمون.
5. `actor.send(EchoActor.STOP_MSG);` — رسالة خاصة لطلب الإنهاء.
6. `System.out.println("EchoActor terminated.");` — هذا السطر ما بيطبع إلا بعد ما الـ `finish` يخلص، أي بعد ما الـ Actor يعالج كل الرسائل وينهي حاله.
7. `static final Object STOP_MSG = new Object();` — قيمة مرجعية فريدة تستخدم كـ "علم" (flag) لرسالة الإيقاف.
8. `if (STOP_MSG.equals(msg))` — لو الرسالة هي إشارة التوقف، اطبع رسالة إنهاء واستدعِ `exit()`.
9. `else { messageCount += 1; ... }` — غير هيك، عالج الرسالة العادية وزوّد العداد.

#### 💡 كيف تجتمع الأدوات؟
- **`start()`:** ينقل الـ Actor من `New` إلى `Started`.
- **`send()` المتكرر:** يثبت إن الترتيب بين نفس المرسل ونفس المستقبل محفوظ (Hello قبل World قبل STOP_MSG دائماً).
- **`exit()`:** ينقل الـ Actor من `Started` إلى `Terminated`.
- **النتيجة:** تسلسل مضمون: `Message-1: Hello` → `Message-2: World` → `Message-2: terminating.`

#### ⚠️ لو ما استخدمناها صح؟
لو نسينا `exit()` جوا معالجة `STOP_MSG`، الـ Actor بيضل بحالة `Started` للأبد، والـ `finish` ما رح يخلص أبداً (أو يعتمد كيف مُصمم runtime التعامل مع actors غير المنتهية)، وطباعة "EchoActor terminated." ما رح تصير كما متوقّع.

#### 📖 الشرح
هذا المثال بيوضّح ملاحظة مهمة جداً من المحاضرة: **رغم إنه الإرسال (`send`) غير متزامن (asynchronous) بشكل عام، مكتبات actor كثيرة — بما فيها `HJlib` — بتحافظ على ترتيب الرسائل بين نفس المُرسل ونفس المُستقبل.** لهيك نضمن إنه "Hello" هتتعالج قبل "World" قبل رسالة التوقف، رغم إن كل `send` رجعت فوراً من غير انتظار.

#### 🎯 الملخص السريع
- `finish` بينتظر إنهاء الـ Actor.
- ترتيب الرسائل من نفس المرسل لنفس المستقبل محفوظ.
- لازم `exit()` داخل `process()` لإنهاء الـ Actor صراحة.

#### 📚 التطبيق
بالقسم الجاي (6) رح نشوف كيف نطبّق نفس الفكرة على مسألة كلاسيكية: عداد صحيح مشترك (Integer Counter)، ونقارن بين النسخة القديمة (بالأقفال) والجديدة (بالـ Actors).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> [كود Hello World الكامل كما ورد بالمحاضرة، بما فيه EchoActor وmain وfinish وsend وexit] — Though sends are asynchronous, many actor libraries (including HJlib) preserve the order of messages between the same sender actor/task and the same receiver actor.

**ملاحظة على التغطية:**
- ✓ تم شرح: الكود كاملاً سطراً بسطر، وملاحظة حفظ الترتيب (الملاحظة الحمراء بالشريحة).
- ℹ️ إضافة من الدليل: قسم "لو ما استخدمناها صح؟" لتوضيح أثر نسيان exit().

</details>

---

## 6. مثال: عداد صحيح (Integer Counter) — بدون وبمع Actors

#### 📍 أين نحن الآن؟
فقرة وحدة (6.1) بتقارن مباشرة بين حل مشكلة العداد المشترك بالطريقة القديمة (Threads + isolated) والطريقة الجديدة (Actor)، عشان تشوف الفرق البرمجي الفعلي بعينك.

#### ⬅️ الربط مع السابق
هاي أفضل فقرة توضّح عملياً كل اللي حكينا عنه بالقسم 1 (مشكلة العزل اليدوي) — هلق منشوف كيف نفس المشكلة تُحل بأسلوبين مختلفين تماماً.

### 6.1. Integer Counter: مقارنة الحلين
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.3", group: "6.1"} -->

#### 💡 الفكرة الأساسية
**بالطريقة القديمة، كل method لازم تحمي البلوك بـ `isolated` بنفسها؛ بالطريقة الجديدة (Actor)، إرسال رسالة (`send`) بيكفي والعزل مضمون داخلياً بلا أي isolated ظاهر بكود المستخدم.**

#### 💻 الكود
```java
// ----- Without Actors -----
int counter = 0;
public void foo() {
    // do something
    isolated(() -> {
        counter++;
    });
    // do something else
}
public void bar() {
    // do something
    isolated(() -> {
        counter--;
    });
}

// ----- With Actors -----
class Counter extends Actor<Message> {
    private int counter = 0; // local state
    protected void process(Message msg) {
        if (msg instanceof IncMessage) {
            counter++;
        } else if (msg instanceof DecMessage) {
            counter--;
        }
    }
}
// ...
Counter counter = new Counter();
counter.start();

public void foo() {
    // do something
    counter.send(new IncrementMessage(1));
    // do something else
}
public void bar() {
    // do something
    counter.send(new DecrementMessage(1));
}
```

#### شرح الكود سطراً بسطر
1. **بدون Actors:** `counter` متغيّر عادي مكشوف؛ كل من `foo()` و `bar()` لازم يحطوا `isolated` بأنفسهم حول أي تعديل — نسيان واحد بيكسر الحماية.
2. **مع Actors:** `counter` أصبح `private` جوا `Counter extends Actor<Message>` — محدا برا يقدر يلمسه مباشرة.
3. `process(Message msg)` — نقطة وحيدة للتعديل، حسب نوع الرسالة (`IncMessage`/`DecMessage`).
4. `foo()`/`bar()` بالنسخة الجديدة بيرسلو رسالة فقط (`send`) — ما فيهم `isolated` ولا أي حماية يدوية.

#### 📖 الشرح
هاد أوضح مثال عملي على الفرق: بالنسخة القديمة، **مسؤولية الحماية على عاتق كل method على حدة** — يعني لو زدنا method ثالثة `baz()` بتعدّل `counter` ونسينا نحطلها `isolated`، صار عندنا Race Condition فوري. بالنسخة الجديدة، **الحماية جزء من بنية الكلاس نفسه** — أي method تانية (حتى لو نسيت شي) ما بتقدر تلمس `counter` مباشرة لأنه `private` جوا Actor، أقصى شي تقدر تعمله هو `send()` رسالة، والـ Actor هو اللي بيقرر يعالجها بأمان.

#### 🎯 الملخص السريع
- بدون Actors: الحماية اختيارية ومنتشرة بكل method.
- مع Actors: الحماية مركزية وإجبارية بحكم البنية.
- التفاعل الخارجي أصبح `send()` فقط، لا وصول مباشر.

#### 📚 التطبيق
هاي الفكرة (تغليف الحالة + تواصل بالرسائل) هي أساس كل الأمثلة الجاية بالمحاضرة: `Pipelining`, `Sieve of Eratosthenes`, `Producer-Consumer`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Without Actors: int counter = 0; public void foo() { isolated(() -> { counter++; }); } public void bar() { isolated(() -> { counter--; }); }
> With Actors: class Counter extends Actor&lt;Message&gt; { private int counter = 0; protected void process(Message msg) { if (msg instanceof IncMessage) counter++; else if (msg instanceof DecMessage) counter--; } } Counter counter = new Counter(); counter.start(); public void foo() { counter.send(new IncrementMessage(1)); } public void bar() { counter.send(new DecrementMessage(1)); }

</details>

---

## 7. Pipelining مع Actors

#### 📍 أين نحن الآن؟
هذه المجموعة (7.1 → 7.2) بتوسّع فكرة الـ `Pipelining` (من محاضرات سابقة بالجزء الأول من المادة) لتُبنى فوق الـ Actors، وبتشرح مشكلة الـ bottleneck وحلها.

#### ⬅️ الربط مع السابق
بعد ما تعلمنا كيف نبني Actor مفرد (أقسام 5-6)، هلق منشوف كيف نربط أكتر من Actor سوا بشكل تسلسلي (pipeline) لحل مسائل معالجة بيانات متعددة المراحل.

### 7.1. بنية الـ Pipeline بالـ Actors وal Bottleneck
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.1", group: "7.1-7.2"} -->

#### 💡 الفكرة الأساسية
**كل مرحلة معالجة تصبح Actor مستقل، والبيانات بتتدفق بينهم بالتسلسل — بس أبطأ مرحلة بتصبح عنق زجاجة (throughput bottleneck) للنظام كله.**

#### 📊 المخطط
مثال بالمحاضرة: pipeline من 3 مراحل — Stage-1 بيفلتر السلاسل ذات الطول الزوجي (even length strings)، Stage-2 بيفلتر السلاسل صغيرة الحروف (lowercase strings)، Stage-3 بيطبع النتائج.

| رقم العقدة | الوصف |
| --- | --- |
| ST1 | `Stage-1 Actor` — فلترة السلاسل ذات الطول الزوجي |
| ST2 | `Stage-2 Actor` — فلترة السلاسل صغيرة الحروف |
| ST3 | `Stage-3 Actor` — طباعة النتائج النهائية |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| Input | ST1 | تدفق بيانات خام |
| ST1 | ST2 | تدفق نتائج المرحلة الأولى |
| ST2 | ST3 | تدفق نتائج المرحلة الثانية |

```flowchart
[Input strings] --> [Stage-1: filter even length] --> [Stage-2: filter lowercase] --> [Stage-3: print results]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: كل Actor بمثابة "محطة عمل" — بياخد مدخلات من المحطة اللي قبله، يعالجها، ويبعت النتيجة للمحطة اللي بعده. المهم هون: **لازم كل مرحلة تحافظ على ترتيب الرسائل وهي عم تعالجها**، لأنه لو المرحلة الأولى بعتت "أ" ثم "ب"، ولو انقلب الترتيب بالمرحلة التانية، النتيجة النهائية بتفسد.

المشكلة العملية: لو عندك 3 مراحل، وواحدة منهم (لنفترض Stage-2) بتاخد وقت أطول بكثير من الباقي، فكل الـ pipeline بيصير سرعته محكومة بسرعة أبطأ مرحلة — تماماً متل خط إنتاج بمصنع فيه محطة واحدة بطيئة بتخلي كل الخط ينتظرها. هاي بالضبط تسمى **throughput bottleneck** (عنق الزجاجة بمعدل الإنتاجية).

**🤔 تفعيل الفهم:** لو كل مرحلة أخذت زمن معالجة مختلف (مثلاً 1، 5، 1 وحدة زمن على التوالي)، شو أقصى معدل إنتاجية ممكن نحققه بالـ pipeline كله؟

#### 🎯 الملخص السريع
- كل مرحلة = Actor مستقل.
- الترتيب لازم يُحفظ أثناء المعالجة بكل مرحلة.
- أبطأ مرحلة = عنق الزجاجة اللي بيحدد سرعة الكل.

#### 📚 التطبيق
بالفقرة الجاية (7.2) رح نشوف الحل لهاي المشكلة عن طريق إدخال توازي إضافي جوا المرحلة البطيئة نفسها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A Simple pipeline with 3 stages: Stage-1 Filter even length strings, Stage-2 Filter lowercase strings, Stage-3 Print results. Pipelined Parallelism: Each stage can be represented as an actor. Stages need to ensure ordering of messages while processing them. Slowest stage is a throughput bottleneck.

</details>

---

### 7.2. حل الـ Bottleneck: توازي إضافي داخل المرحلة (Motivation for Parallelizing Actors)
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7.1", group: "7.1-7.2"} -->

#### 💡 الفكرة الأساسية
**لتقليل أثر أبطأ مرحلة، ندخل توازي مهام (task parallelism) جوا تلك المرحلة نفسها، وهذا بيزيد معدل الإنتاجية (throughput) الكلي.**
*(بعد ما شفنا مشكلة الـ bottleneck بـ 7.1، هون منشوف الحل.)*

#### 📊 المخطط
بدل ما تعالج المرحلة البطيئة (الوردية اللون بالرسمة الأصلية) الرسائل وحدة ورا وحدة بشكل تسلسلي بحت، منقسّم شغلها لمهام متوازية جوا نفس المرحلة، وهيك الوقت الكلي (shorter time) بينقص مقارنة بالوضع الأول (longer time).

| رقم العقدة | الوصف |
| --- | --- |
| P1 | مهمة فرعية 1 داخل المرحلة البطيئة |
| P2 | مهمة فرعية 2 داخل المرحلة البطيئة |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| Stage (input) | P1, P2 | توزيع المهام بالتوازي (fan-out) داخل نفس المرحلة |

```flowchart
[Slow Stage input] --> [Sub-task P1] 
[Slow Stage input] --> [Sub-task P2]
[P1, P2] --> [Stage output]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: بدل ما تبقى المرحلة البطيئة "خانقة" للـ pipeline، منفتحها من جوا ومنعالج أكتر من عنصر بنفس الوقت داخلها (استخدام Task Parallelism من الجزء الأول بالمادة)، فيصير الزمن الكلي أقصر (shorter time) بدل ما يطول (longer time) بسبب انتظار المرحلة البطيئة وحدها.

#### 🎯 الملخص السريع
- الحل: task parallelism داخل المرحلة البطيئة.
- النتيجة: تقليل أثر الـ bottleneck وزيادة throughput.

#### 📚 التطبيق
بالفقرة الجاية (8) رح نشوف بالضبط كيف نكتب هيك توازي جوا `process()` بكود Java حقيقي باستخدام `finish`/`async`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Pipelined Parallelism: Reduce effects of slowest stage by introducing task parallelism. Increases the throughput.

</details>

---

## 8. توازي داخل دالة process()

#### 📍 أين نحن الآن؟
فقرة وحدة (8.1) بتوضّح عملياً — بالكود — كيف نطبّق فكرة "توازي داخل المرحلة" اللي شرحناها نظرياً بالقسم 7.2.

#### ⬅️ الربط مع السابق
بعد ما فهمنا نظرياً ليش بدنا توازي جوا المرحلة (7.2)، هلق منشوف صياغته الفعلية بـ Java باستخدام `finish`/`async` (أدوات تعرفنا عليها بالجزء الأول من المادة، `Task Parallelism`).

### 8.1. استخدام finish/async جوا process()
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7.2", group: "8.1"} -->

#### 💡 الفكرة الأساسية
**ممكن تستخدم `finish` وتفرّع مهام `async` جوا جسم `process()` نفسه، بس لازم تنتبه ما تعمل Data Races على الحالة المحلية (local state) للـ Actor.**

#### 💻 الكود
```java
class ParallelActor extends Actor<Message> {
    void process(Message msg) {
        finish(() -> {
            async(() -> { /* S1 */ });
            async(() -> { /* S2 */ });
            async(() -> { /* S3 */ });
        });
    }
}
```

#### شرح الكود سطراً بسطر
1. `void process(Message msg)` — نفس الدالة المعتادة لمعالجة رسالة وحدة.
2. `finish(() -> {...})` — ينتظر انتهاء كل المهام (`S1`, `S2`, `S3`) قبل ما تنتهي معالجة هاي الرسالة.
3. `async(() -> { S1; });` — مهمة فرعية أولى تشتغل بالتوازي.
4. `async(() -> { S2; });` و `async(() -> { S3; });` — مهمتان فرعيتان إضافيتان تشتغلو بالتوازي مع الأولى.

#### 📖 الشرح
هون بنستخدم أدوات `Task Parallelism` (`finish`/`async`) اللي اتعلمناها بالجزء الأول من المادة، بس هالمرة **جوا** معالجة رسالة واحدة من رسائل الـ Actor. الفكرة: معالجة الرسالة الواحدة ممكن تتوزّع على عدة مهام فرعية متوازية (`S1`, `S2`, `S3`) بدل ما تكون تسلسلية بحتة، وهذا بالضبط اللي بيقلل زمن معالجة كل رسالة، وبالتالي يخفف من bottleneck المرحلة البطيئة اللي حكينا عنها بـ 7.2.

**#### مهم للامتحان ⚠️:**
المحاضرة نبّهت صراحة: **"خذ بالك ما تعمل Data Races على الحالة المحلية!"** — يعني لو `S1`, `S2`, `S3` كلهم بيعدّلو نفس متغير من الحالة المحلية للـ Actor بدون تنسيق، ممكن يصير Race Condition **جوا الـ Actor نفسه**! هذا استثناء مهم للقاعدة العامة "الـ Actor آمن تلقائياً" — الأمان التلقائي بيضمنلك عدم التداخل *بين* الرسائل المتتالية، بس مش بالضرورة *جوا* رسالة وحدة إذا فتحت توازي يدوي بداخلها.

#### 🎯 الملخص السريع
- ممكن تستخدم `finish`/`async` جوا `process()`.
- هذا بيقلل زمن معالجة الرسالة الواحدة.
- لازم تنتبه: التوازي اليدوي جوا الرسالة ممكن يسبب Data Race على local state إذا ما انتبهنا.

#### 📚 التطبيق
هلق بعد ما فهمنا كل الأساسيات (Actor مفرد + pipeline + توازي داخلي)، جاي دورنا نطبقها كلها على مسائل كلاسيكية بالقسم 9.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
بعض الطلاب بيفكرو إنه بما إنه الـ Actor "آمن تلقائياً (isolated by default)"، فمهما فتحنا توازي جواه (زي `async` جوا `process()`) رح يضل آمن تلقائياً.

#### الفهم الصحيح ✅:
العزل التلقائي للـ Actor بيضمن بس عدم تداخل **رسائل مختلفة** مع بعضها (معالجة رسالة-رسالة بالتسلسل). أما التوازي اليدوي **جوا معالجة رسالة وحدة** (زي `async` متعددة تلمس نفس المتغير) فهو مسؤولية المبرمج تماماً، ولازم ينتبه لنفس مشاكل الـ Race Condition القديمة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Use finish construct within process() body and spawn child tasks. Take care not to introduce data races on local state! class ParallelActor extends Actor&lt;Message&gt; { void process(Message msg) { finish(() -> { async(() -> { S1; }); async(() -> { S2; }); async(() -> { S3; }); }); } }

</details>

---

## 9. تطبيقات كلاسيكية باستخدام Actors

#### 📍 أين نحن الآن؟
هذه المجموعة (9.1 → 9.3) بتجمع ثلاث مسائل كلاسيكية بالتزامن — `Sieve of Eratosthenes`, `Producer-Consumer`, `Bounded Buffer` — وبتوضّح كيف تصميم Actors بيحلهم بشكل أنيق بدل الأقفال اليدوية.

#### ⬅️ الربط مع السابق
بعد ما جمعنا كل أدوات الـ Actor (بنية، دورة حياة، API، pipelining، توازي داخلي)، هلق منشوف كيف تُستخدم سوا لحل مسائل حقيقية معروفة بالتزامن.

### 9.1. غربال إراتوستينس (Sieve of Eratosthenes) بالـ Actors
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_8.1", group: "9.1-9.3"} -->

#### 💡 الفكرة الأساسية
**كل عدد أولي (prime) بيصير Actor مسؤول عن فلترة كل مضاعفاته من التدفق، وسلسلة هيك Actors بتكوّن pipeline بيطبع الأعداد الأولية.**

#### 📊 المخطط
المسألة: توليد الأعداد الأولية الأصغر من أو تساوي N. حسب المحاضرة، الحل عبارة عن pipeline من "Actors سحرية" (magic actors)، كل Actor بيفلتر مضاعفات عدد أولي معين وبيمرّر الباقي، وبينشئ Actor جديد للعدد الأولي التالي.

| رقم العقدة | الوصف |
| --- | --- |
| G1 | Actor فلترة "ليس مضاعف لـ 2؟" — يطبع 2 وينشئ Actor لـ 3 |
| G2 | Actor فلترة "ليس مضاعف لـ 3؟" — يطبع 3 وينشئ Actor لـ 5 |
| G3 | Actor فلترة "ليس مضاعف لـ 5؟" — يطبع 5 |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| Input (2,3,4,...,N) | G1 | تدفق كل الأعداد بدايةً |
| G1 | G2 | تدفق `3,5,7,9,...` (بعد استبعاد مضاعفات 2) |
| G2 | G3 | تدفق `5,7,11,...` (بعد استبعاد مضاعفات 3) |

```flowchart
[2,3,4,5,...,N] --> [Not Multiple of 2? -> print 2] --> [Not Multiple of 3? -> print 3] --> [Not Multiple of 5? -> print 5] --> ...
```

#### 📖 الشرح
اقرأ المخطط كالتالي: أول عدد بيوصل من التدفق (وهو 2) بيصير أول عدد أولي مؤكد، فمنطبعه، ومنعمل Actor جديد مسؤول يفلتر أي رقم من الأرقام الجاية إذا كان **مضاعف لـ 2** (لأنه أكيد مش أولي لو كان مضاعف لعدد أولي أصغر). أول رقم بيعدّي من هالفلتر (وهو 3) بيصير عدد أولي جديد، فمنكرر نفس الخطوة: منطبعه، ومنعمل Actor تالت يفلتر مضاعفات 3. وهكذا — **كل Actor جديد بيتخلق ديناميكياً** كل ما اكتشفنا عدد أولي جديد، وهذا استخدام مباشر لقدرة الـ Actor على "إنشاء Actors جدد" اللي حكينا عنها بالقسم 2.2.

**💡 تشبيه:** فكّرها متل خط تفتيش أمني بمطار فيه بوابات متتالية — كل بوابة بتوقف نوع محدد من الممنوعات وتمرر الباقي للبوابة اللي بعدها، وكل ما ظهر نوع ممنوع جديد، بيضيفو بوابة جديدة مخصصة له.

#### 🎯 الملخص السريع
- كل عدد أولي = Actor فلترة جديد.
- الأعداد اللي بتعدّي كل الفلاتر = أعداد أولية جديدة.
- إنشاء Actors ديناميكياً كل ما اكتشفنا عدد أولي.

#### 📚 التطبيق
هاي المسألة مثال ممتاز على استخدام `create new actors` (قسم 2.2) بشكل ديناميكي متكرر، بعكس المثال اللي قبله (Pipeline بعدد مراحل ثابت مسبقاً).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90%)</summary>

> Problem: Generating prime numbers less than or equal to N. A magic Actor as a pipeline of actors: Not Multiple of 2? -> Print 2, Not Multiple of 3? -> Print 3, Not Multiple of 5? -> Print 5. 2,3,4,5,...,N -> 3,5,7,9,... -> 5,7,11,.... Create and start.

**ملاحظة على التغطية:**
- ✓ تم شرح: فكرة الفلترة المتسلسلة وإنشاء Actor جديد لكل عدد أولي مكتشف.
- ⚠️ لم يتم شرح بالكامل: المحاضرة لم تقدّم كوداً كاملاً لهذا المثال (شريحة تخطيطية فقط بدون Java code)، لذلك ما رح تلاقي كود Java تفصيلي هون — بس المفهوم موضّح بالكامل.

</details>

---

### 9.2. مسألة المنتج والمستهلك (Producer-Consumer) بالـ Actors
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_9.1", group: "9.1-9.3"} -->

#### 💡 الفكرة الأساسية
**نصمم Actor مركزي يدير الـ Buffer، وActor لكل منتج (Producer)، وActor لكل مستهلك (Consumer)، وكل التواصل بينهم رسائل فقط.**
*(بعد ما شفنا إنشاء Actors ديناميكياً بـ 9.1، هون منشوف تصميم متعدد الـ Actors ثابت الأدوار.)*

#### 💻 الكود
```java
// [Consumer Thread] version (the OLD, error-prone way):
// while (buffer empty) {}
// remove item from buffer and process it

// [Consumer Actor] version (with Actors):
class ConsumerActor extends Actor<Object> {
    protected void process(final Object S) {
        // process item S
        buffer.send("ready");
    }
}
```

#### شرح الكود سطراً بسطر
1. **نسخة Thread القديمة (تعليق):** الخيط بيدور بحلقة `while(buffer empty){}` — هاد `busy-waiting` مكلف وبيصرف معالج بلا فائدة.
2. **نسخة Actor:** `process(final Object S)` — الرسالة `S` نفسها هي العنصر (item) اللي المفروض يتعالج.
3. `// process item S` — معالجة العنصر (نفس منطق التطبيق).
4. `buffer.send("ready");` — بعد ما خلص المعالجة، منبعت رسالة "ready" لـ actor الـ buffer، عشان يعرف إنه جاهز ياخد عنصر جديد.

#### 📖 الشرح
المسألة: عندنا buffer غير محدود السعة (`unbounded`)، عدد `p` من المنتجين وعدد `c` من المستهلكين. بالطريقة التقليدية بالـ Threads، فيه تحديات كلاسيكية: **Data Race** على الـ buffer، وحالة **الفراغ (empty case)**، وحالة **الامتلاء (full case)**. الحل بالـ Actors بيقسّم المسؤوليات لثلاث أدوار واضحة:
1. **Actor إدارة الـ Buffer:** يستقبل العناصر ويرسلها كرسالة لأي مستهلك جاهز (ready).
2. **Actor منطق المستهلك:** بيرسل رسالة "ready" لـ actor الـ buffer لما يخلص من معالجة العنصر الحالي ويصير جاهز لعنصر جديد.
3. **Actor منطق المنتج:** بيرسل رسالة "insert" لـ actor الـ buffer كل ما عنده عنصر جديد.

لاحظ كيف اختفت مشكلة الـ `Data Race` تماماً: محدا بيلمس الـ buffer مباشرة — كله رسائل، وactor الـ buffer هو الوحيد المسؤول عن الوصول الفعلي للبيانات المشتركة (نفس مبدأ العزل الافتراضي من القسم 1).

#### 🎯 الملخص السريع
- 3 أدوار: Buffer Actor, Consumer Actor, Producer Actor.
- التواصل: رسائل insert/ready بدل الوصول المباشر.
- Data Race يختفي تلقائياً بحكم بنية الرسائل.

#### 📚 التطبيق
بالفقرة الجاية (9.3) رح نوسّع نفس التصميم لحالة أكتر واقعية: buffer محدود السعة (bounded)، ونشوف كيف نتعامل مع حالة الامتلاء أيضاً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Problem: Unbounded buffer, /p/ producers, /c/ consumers. Producers insert items in buffer, consumers remove and process items. Challenges with solution as threads: data race, empty case, full case. Solution: design: Actor maintaining the buffer: removes item and send it as a message to a ready consumer. Actor handling consumer logic: sends ready message to the buffer actor. Actor handling producer logic: sends insert message to the buffer actor. [Consumer Thread] while(buffer empty){} remove item from buffer and process it. [Consumer Actor] Process(S){ process item S; buffer.send("ready") }

</details>

---

### 9.3. مسألة الـ Buffer المحدود (Bounded Buffer) بالـ Actors
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_9.2", group: "9.1-9.3"} -->

#### 💡 الفكرة الأساسية
**بالـ Buffer المحدود السعة، actor الـ buffer بيصير هو من يطلب البيانات من المنتج (بدل ما يستقبلها متى ما بعتها)، عشان يتحكم بمعدل الإدخال حسب السعة المتاحة.**
*(وبعد ما فهمنا حالة الـ buffer اللامحدود بـ 9.2، هون منشوف كيف يتغيّر التصميم لما يصير للـ buffer سعة محدودة.)*

#### 📊 المخطط
حسب المحاضرة: `Producer Actor` ↔ `Buffer Actor` ↔ `Consumer Actor`، بأربع أنواع رسائل: Request data, Insert data, Ready, Removed item.

| رقم العقدة | الوصف |
| --- | --- |
| PR | `Producer Actor` — يستجيب لطلب البيانات (request data) بإرسال بيانات (insert data) |
| BUF | `Buffer Actor` — يدير السعة المحدودة، يطلب بيانات من المنتج، ويرسل عنصر مُزال (removed item) للمستهلك |
| CON | `Consumer Actor` — يرسل "ready" لما يصير جاهز لعنصر جديد |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| BUF | PR | `Request data` (طلب بيانات جديدة إذا فيه مكان بالـ buffer) |
| PR | BUF | `Insert data` (استجابة المنتج لطلب البيانات) |
| CON | BUF | `Ready` (المستهلك جاهز لعنصر جديد) |
| BUF | CON | `Removed item` (البيانات المُزالة من الـ buffer وتم إرسالها للمستهلك) |

```flowchart
[Buffer Actor] --Request data--> [Producer Actor]
[Producer Actor] --Insert data--> [Buffer Actor]
[Consumer Actor] --Ready--> [Buffer Actor]
[Buffer Actor] --Removed item--> [Consumer Actor]
```

#### 📖 الشرح
اقرأ المخطط كالتالي: الفرق الجوهري عن نسخة الـ `unbounded` (9.2) هو إنه هون **actor الـ buffer هو من يبادر (proactive)** — بدل ما ينتظر المنتج يبعتله بيانات بأي وقت (وهذا ممكن يسبب فيضان لو الـ buffer ممتلئ)، هو بيرسل رسالة **"Request data"** للمنتج فقط لما يكون فيه مكان فاضي بالـ buffer. المنتج بيرد بـ **"Insert data"** كاستجابة لهذا الطلب تحديداً (response). أما جهة المستهلك، فنفس منطق 9.2: يرسل "Ready" لما يصير جاهز، والـ buffer actor بيرد بـ"Removed item".

هذا التصميم بيحل حالة "الامتلاء" (full case) اللي كانت مشكلة بالحل التقليدي بالـ threads — لأنه هون **الـ buffer نفسه هو من يتحكم بمعدل الطلب**، فمستحيل يفيض، لأنه ببساطة ما رح يطلب بيانات جديدة إلا لما يكون جاهز ياخدها.

#### 🎯 الملخص السريع
- الفرق عن unbounded: الـ buffer actor يطلب البيانات بنفسه (Request data) بدل الانتظار السلبي.
- 4 أنواع رسائل: Request data, Insert data, Ready, Removed item.
- التحكم بمعدل الطلب = حل طبيعي لمشكلة الامتلاء (full case).

#### 📚 التطبيق
هذه آخر فقرة بالشرح التفصيلي — راجع الملخص الشامل بالأسفل لربط كل الأفكار سوا، وبعدها الأسئلة والبطاقات لمراجعة شاملة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفكرو إنه الفرق بين `Producer-Consumer` (9.2) و `Bounded Buffer` (9.3) هو بس بوجود رقم أقصى للسعة، وباقي منطق التواصل نفسه تماماً.

#### الفهم الصحيح ✅:
الفرق الحاسم مش بس "فيه حد أقصى" — الفرق إنه **اتجاه المبادرة انقلب**: بالـ unbounded، المنتج هو من يبادر بإرسال البيانات وقت ما يجهز. بالـ bounded، **الـ buffer actor نفسه هو من يبادر** بطلب البيانات (`Request data`) بس لما يتأكد فيه مكان، وهذا اللي بيمنع فيضان الـ buffer من الأساس.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Problem: Buffer with /b/ capacity, /p/ producers, /c/ consumers. Producers insert items in buffer, consumers remove and process items. Challenges with solution as threads: data race, empty case, full case. Solution: design: Actor maintaining the buffer: Send /request data/ message to producers. Removes item and send it as a /data response/ message to a ready consumer. Actor handling consumer logic: sends /ready/ message to the buffer actor. Actor handling producer logic: sends /insert data/ message to the buffer actor as a response to /request data/ message. Producer Actor - Buffer Actor - Consumer Actor: Request data, Insert data, Ready, Removed item.

</details>

---

# ملخص شامل — Actor Concurrency Model

خلّينا نرجع لنقطة البداية: ليش أصلاً احتجنا Actor مع إنه عندنا أصلاً `Isolated` و `Object-based Isolation` من المحاضرات السابقة؟ الجواب البسيط: لأنه `Isolated` أداة **اختيارية** — لازم تتذكر تحطها بكل مكان بتلمس فيه البيانات المشتركة، وأي نسيان واحد بيفتح ثغرة. تخيل عندك متغير `CUR` بتحمي تعديله جوا method اسمها `GETandADD` بـ `isolated`، بس عندك method تانية اسمها `FOO` بتعدّل نفس المتغير مباشرة بدون أي حماية — النتيجة: تضارب محتمل رغم كل جهدك بالمكان التاني. هون بالضبط بيجي الحل: **خلّي العزل افتراضياً، مش خياراً**.

هيك بنوصل لتعريف الـ `Actor`: كائن مستقل عنده أربع خصائص أساسية. أولاً، **هوية ثابتة (immutable identity)** — عنوان مرجعي ما بيتغير طول حياته، متل رقم هاتف ثابت. ثانياً، **خيط تنفيذ منطقي واحد** — يعني ما في تنفيذين بالتوازي جوا نفس الـ Actor بأي حال. ثالثاً، **حالة محلية قابلة للتغيير لكن معزولة افتراضياً** — البيانات بتتغير، بس محدا من برا يقدر يوصلها مباشرة. رابعاً، **واجهة (interface/procedures)** — الطريقة الرسمية الوحيدة للتفاعل. فكّر بالموضوع متل موظف استقبال بمكتب مقفول: ما بتقدر تفوت وتاخد ورقة من درجه بنفسك، لازم تقدّم طلب رسمي وهو يرد عليك واحد ورا التاني.

وبناءً على هاي البنية، الـ Actor بيقدر يعمل أربع أشياء: يعالج رسائل، يغيّر حالته، ينشئ Actors جدد، ويرسل رسائل. أي تفاعل خارجي — حتى لو الطرف التاني مش actor أصلاً — بيصير عن طريق رسالة، مش نداء مباشر.

هذا كله جزء من نموذج أكبر اسمه `Actor Model`، عرّفه `Carl Hewitt` سنة 1973 وطوّره لاحقاً `Henry Baker` و `Gul Agha`. الفكرة المحورية فيه: "كل شيء هو Actor" — تماماً متل ما بالـ OOP "كل شيء هو Object". والنتيجة العملية الأهم: **الحالة القابلة للتغيير مش مشتركة أبداً بين Actors، وبالتالي ما في Data Race بالتصميم أصلاً** — مش لأنك حطيت قفل، لكن لأنه ببساطة ما في طريقة توصل فيها للبيانات مباشرة من برا. النموذج كمان بيعتمد إرسال غير متزامن (asynchronous)، وترتيب غير محدد للرسائل بشكل عام — إلا إنه (وهاي نقطة مهمة جداً للامتحان) كثير مكتبات، منها `HJlib`، بتحافظ على ترتيب الرسائل بين نفس المُرسل ونفس المُستقبل. هيك، لو Actor A بعت رسالتين متتاليتين لـ Actor B، الترتيب بينهم مضمون، حتى لو الإرسال أصلاً غير متزامن.

كل Actor بيمر بثلاث مراحل بالترتيب: `New` (تم إنشاؤه بس لسا ما بيعالج رسائل)، `Started` (بيعالج رسائل فعلياً، رسالة واحدة بكل مرة)، و `Terminated` (توقف نهائياً وما رح يعالج أي رسالة بعدها). فكّرها متل حساب إيميل جامعي: تم إنشاؤه، بعدين تفعيله، وبالنهاية إغلاقه بعد التخرج.

طيب كيف نكتب هذا فعلياً بـ Java عن طريق مكتبة `HJlib`؟ ببساطة: بتورّث `Actor<T>` وبتطبّق `process()` عشان تحدد سلوك الـ Actor لما توصله رسالة. بعدين بتعمل `new` (وهذا بيحطك بحالة `New`)، وبتستدعي `start()` (وهذا بينقلك لـ `Started`). أي حدا — actor أو حتى كود عادي — بيقدر يستدعي `send()` عليه ليبعتله رسالة. وجوا `process()` نفسها، إذا حابب تنهي الـ Actor، بتستدعي `exit()` وهذا بينقلك لـ `Terminated`. المكتبة كمان بتوفرلك دوال "راحة" اختيارية زي `onPreStart`/`onPostStart` و `onPreExit`/`onPostExit` لتحضير أو تنظيف الموارد قبل/بعد الأحداث الرئيسية — وحطت المحاضرة إشارة إنه `pause()`/`resume()` رح ندرسهم بالمحاضرة الجاية.

مثال Hello World وضّح هذا كله سوا: عملنا `EchoActor`، استدعينا `start()`، بعتنا "Hello" وبعدها "World" وبعدها رسالة توقف خاصة، وكله جوا `finish` عشان ننتظر انتهاء الـ Actor فعلياً قبل ما نطبع "EchoActor terminated." والنقطة المهمة هون إنه رغم الإرسال غير متزامن، الترتيب بين "Hello" و "World" ورسالة التوقف انحفظ لأنه كلهم جايين من نفس المُرسل لنفس المُستقبل.

وعشان نشوف الفرق العملي بشكل مباشر، قارنا حل مسألة عداد صحيح مشترك بالطريقتين: بالطريقة القديمة، كل method (زي `foo()` و `bar()`) لازم تحمي تعديلها لـ `counter` بـ `isolated` بشكل يدوي ومنفصل. بالطريقة الجديدة، عملنا `Counter extends Actor<Message>` وحطينا `counter` كـ `private` جواه — فأصبح التعديل الوحيد الممكن هو عبر `process()`، والتفاعل الخارجي أصبح بس `send()` رسالة `IncMessage` أو `DecMessage`، بلا أي `isolated` ظاهر بكود المستخدم.

من هون منوصل لفكرة الـ `Pipelining with Actors`: بدل مرحلة معالجة وحدة، منقسّم المسألة لعدة مراحل، وكل مرحلة تصير Actor مستقل يعالج المدخلات ويمررها للمرحلة اللي بعده. المثال بالمحاضرة كان 3 مراحل: فلترة السلاسل ذات الطول الزوجي، بعدين فلترة السلاسل صغيرة الحروف، وأخيراً طباعة النتائج. المشكلة الطبيعية هون: **أبطأ مرحلة بتصبح عنق زجاجة (throughput bottleneck)** يحدد سرعة الـ pipeline كله — تماماً متل خط إنتاج فيه محطة بطيئة بتخلي الكل ينتظرها. الحل: ندخل **توازي مهام (task parallelism) جوا المرحلة البطيئة نفسها** — بدل ما تعالج عناصرها بالتسلسل البحت، منوزّعها على مهام متوازية جوا نفس المرحلة، وهيك الزمن الكلي بيقصر بدل ما يطول.

وكيف نكتب هذا التوازي الداخلي فعلياً؟ باستخدام `finish` و `async` (نفس أدوات `Task Parallelism` من الجزء الأول بالمادة) جوا جسم `process()` نفسها — بحيث معالجة رسالة وحدة توزّع لعدة مهام فرعية متوازية بدل ما تكون تسلسلية بحتة. بس هون تنبيه مهم جداً حطته المحاضرة بوضوح: **لازم تنتبه ما تعمل Data Races على الحالة المحلية!** يعني الأمان التلقائي للـ Actor بيضمنلك بس عدم تداخل رسائل مختلفة مع بعضها، لكن إذا فتحت توازي يدوي جوا معالجة رسالة وحدة، بترجع تكون مسؤول عن نفس مشاكل Race Condition التقليدية لو أكتر من `async` لمسو نفس المتغير من الحالة المحلية.

وآخر شي، شفنا ثلاث تطبيقات كلاسيكية بتربط كل هذا سوا. أول واحدة `Sieve of Eratosthenes` — توليد الأعداد الأولية: كل عدد أولي مكتشف بيصير Actor فلترة جديد لمضاعفاته، ويتخلق ديناميكياً كل ما اكتشفنا عدد أولي جديد — استخدام مباشر لقدرة "إنشاء Actors جدد". ثاني واحدة `Producer-Consumer` بـ buffer غير محدود: قسّمنا التصميم لثلاث أدوار — Actor يدير الـ buffer، Actor لمنطق المستهلك (يرسل "ready" لما يجهز)، وActor لمنطق المنتج (يرسل "insert" لما عنده عنصر). وأخيراً `Bounded Buffer` — نفس الفكرة بس بسعة محدودة، والفرق الحاسم إنه هون **الـ buffer actor نفسه هو من يبادر** ويرسل "Request data" للمنتج بس لما يتأكد فيه مكان فاضي، وهذا اللي بيحل مشكلة "حالة الامتلاء (full case)" اللي كانت تحدي كبير بالحل التقليدي بالـ threads.

بالنسبة للأخطاء الشائعة اللي لازم تنتبهلها: أولاً، بعض الطلاب بيفكرو إنه `Actor` مجرد اسم تاني لـ `Thread` عادي — بس الفرق الحاسم إنه `Thread` وحده ما بيضمن عزل الحالة تلقائياً، لازم تحطلها حماية يدوية، بينما `Actor` بيضمن العزل تلقائياً لأنه أصلاً ما بيسمح بوصول مباشر من برا. ثانياً، بعض الطلاب بينسوا إنه بعد `new MyActor()` الـ Actor بحالة `New` وما بيعالج ولا رسالة لحد ما تستدعي `start()`. ثالثاً، فيه خلط شائع بين `Producer-Consumer` (unbounded) و `Bounded Buffer` — الفرق مش بس "فيه حد أقصى للسعة"، الفرق إنه اتجاه المبادرة انقلب: بالـ bounded، الـ buffer actor نفسه هو من يطلب البيانات، مش المنتج اللي يبعتها وقت ما يحلولو.

#### الفهم الخاطئ ❌:
كتير طلاب بيحسبو إنه استخدام `isolated` بكل مكان لمس فيه البيانات المشتركة كافي لحل مشكلة التزامن نهائياً.

#### الفهم الصحيح ✅:
`isolated` أداة صحيحة بس **اختيارية ومنتشرة** — أي نسيان واحد بيكسر الحماية بالكامل. `Actor` بيحل هاي المشكلة عن طريق جعل العزل **إجبارياً بحكم البنية**، مش معتمداً على تذكّر المبرمج بكل مكان.

**إيش بيطلع بالامتحان؟** أهم نقطة بيركز عليها الأستاذ: الفرق الجوهري بين `Isolated`/`Thread` و `Actor` من ناحية "من المسؤول عن العزل؟" (المبرمج يدوياً مقابل البنية تلقائياً)، وكذلك تتبع كود `process()`/`send()`/`start()`/`exit()` وربطه بمراحل `New`/`Started`/`Terminated`، والقدرة على تمييز الفرق الدقيق بين `Producer-Consumer` و `Bounded Buffer`.

وبالنسبة للمحاضرة الجاية، رح تكمل من حيث توقفنا: `pause()` و `resume()` — كيف نوقف Actor مؤقتاً عن معالجة رسائله ونستأنفه لاحقاً، وهذا بيبني مباشرة على مفهوم دورة الحياة اللي درسناها هون.

---

# الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium)
**السؤال:** ليش استخدام `Isolated` بشكل يدوي وحده مش كافي لضمان أمان التزامن الكامل على بيانات مشتركة؟

أ) لأنه `Isolated` بطيء جداً بالتنفيذ مقارنة بالأقفال العادية

ب) لأنه حماية `Isolated` تشمل فقط البلوك اللي وُضعت فيه، وأي وصول تاني للبيانات من مكان غير محمي بيبقى مكشوف

ج) لأنه `Isolated` غير مدعوم أصلاً بلغة Java

د) لأنه `Isolated` يعمل فقط مع متغيرات من نوع `int`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): السرعة مش السبب المطروح بالمحاضرة؛ المشكلة بنيوية لا أدائية
- ✅ ب): بالضبط المثال اللي طرحته المحاضرة — `GETandADD` محمية بـ `isolated`، لكن `FOO()` بتعدّل نفس المتغير بدون حماية
- ❌ ج): `Isolated` مدعوم ومستخدم فعلياً بالأمثلة
- ❌ د): لا علاقة لنوع المتغير بالمشكلة

---

### السؤال 2 (medium)
**السؤال:** أي من التالي يصف عناصر الـ `Actor` الأربعة بشكل صحيح؟

أ) خيط تنفيذ متعدد، هوية متغيرة، حالة مشتركة، وواجهة عامة

ب) هوية غير قابلة للتغيير، خيط تنفيذ منطقي واحد، حالة محلية قابلة للتغيير معزولة افتراضياً، وواجهة (procedures)

ج) خيط تنفيذ واحد فقط، بدون أي حالة داخلية، وواجهة عامة مفتوحة للجميع

د) هوية ثابتة، عدة خيوط تنفيذ متوازية، وحالة غير قابلة للتغيير أبداً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): الهوية ثابتة وليست متغيرة، والحالة معزولة وليست مشتركة
- ✅ ب): هذا التعريف الحرفي من المحاضرة: immutable identity, single logical thread, mutable local state isolated by default, procedures
- ❌ ج): الـ Actor عنده حالة محلية فعلياً (mutable local state)، مش بدونها
- ❌ د): الـ Actor عنده خيط واحد فقط، والحالة قابلة للتغيير وليست ثابتة

---

### السؤال 3 (hard)
**السؤال:** الفرق بين `Data Race` و `Deadlock` من ناحية سلوك البرنامج؟

أ) `Data Race` تؤدي لتوقف كامل للبرنامج، و`Deadlock` تؤدي لاستمرار التنفيذ بنتيجة غلط

ب) `Data Race` يعني الخيوط تكمل تنفيذها لكن بنتيجة غير صحيحة، بينما `Deadlock` يعني توقف الخيوط كلياً بانتظار متبادل

ج) لا فرق بينهما، كلاهما يعني نفس السلوك بالضبط

د) `Deadlock` يحصل فقط مع الـ `Actors`، بينما `Data Race` يحصل فقط مع `Threads`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): معكوس تماماً — `Deadlock` هي اللي توقف البرنامج، مش `Data Race`
- ✅ ب): الفرق الحاسم: استمرار بنتيجة غلط (Race) مقابل توقف كامل (Deadlock)
- ❌ ج): يوجد فرق جوهري بالسلوك الملحوظ للبرنامج
- ❌ د): كلاهما ممكن يحصل بأي نموذج تزامن؛ الـ Actor Model مصمم أساساً لمنع Data Race بالتحديد

---

### السؤال 4 (medium)
**السؤال:** بحسب `Actor Life Cycle`، ما الحالة الصحيحة بعد استدعاء الـ constructor مباشرة (`new MyActor()`) قبل أي استدعاء آخر؟

أ) `Terminated`

ب) `Started`

ج) `New`

د) `Paused`

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): `Terminated` تصل فقط بعد استدعاء `exit()` جوا `process()`
- ❌ ب): `Started` تصل فقط بعد استدعاء `start()` صراحةً
- ✅ ج): مباشرة بعد `new`، الـ Actor بحالة `New` ولا يعالج أي رسالة بعد
- ❌ د): `Paused`/`pause()` موضوع محاضرة قادمة وليست من المراحل الثلاث الأساسية هون

---

### السؤال 5 (hard) — حسابي
**السؤال:** برنامج تسلسلي عنده `Work = 24` وحدة زمنية، ونسبة الجزء القابل للتوازي منه (`parallel_fraction`) هي `0.75`. حسب `Amdahl's Law`، ما أقرب قيمة لأقصى `Speedup` نظرياً ممكن الوصول له مع عدد لا نهائي من المعالجات (`P → ∞`)؟

أ) 2

ب) 4

ج) 8

د) 24

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- الصيغة عند `P → ∞`: `Speedup = 1 / (1 - parallel_fraction)` = `1 / (1 - 0.75)` = `1 / 0.25` = `4`
- ✅ ب): طابقت الحساب الصحيح تماماً = 4
- ❌ أ): قيمة أقل من الحد الصحيح، خطأ شائع لو حسبنا `1/(1-0.5)` بالغلط
- ❌ ج): لو ضاعفنا الناتج الصحيح بالغلط (خلط مع نسبة أخرى)
- ❌ د): هذا `Work` نفسه، مش `Speedup` — خطأ بالخلط بين المفهومين

---

### السؤال 6 (hard) — حسابي
**السؤال:** عملية عندها `Work = 30` و `Span (CPL) = 6`. إذا شغّلناها على `P = 3` معالجات، ما أقرب قيمة لأقصى `Speedup` ممكن تحقيقه (استخدم `Speedup(P) = Work / max(Span, Work/P)`)؟

أ) 3

ب) 5

ج) 6

د) 10

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- `Work/P = 30/3 = 10`، و`Span = 6`، فـ `max(Span, Work/P) = max(6, 10) = 10`
- `Speedup(P) = Work / max(...) = 30 / 10 = 3`
- ✅ أ): طابق الحساب الصحيح تماماً = 3
- ❌ ب): لو استخدمنا خطأً `Work/Span` بدل `Work/max(Span, Work/P)` كانت النتيجة 5
- ❌ ج): يساوي `Span` نفسه فقط، مش `Speedup` الفعلي
- ❌ د): قيمة غير منطقية تتجاوز عدد المعالجات المتاحة (3) بشكل غير معقول للتفسير الصحيح

---

### السؤال 7 (medium) — سيناريو كود
**السؤال:** بالكود التالي:
```java
class Counter extends Actor<Message> {
    private int counter = 0;
    protected void process(Message msg) {
        if (msg instanceof IncMessage) counter++;
        else if (msg instanceof DecMessage) counter--;
    }
}
```
لو تم استدعاء `counter.send(new IncrementMessage(1))` من عدة خيوط (threads) مختلفة بنفس الوقت تقريباً، أي من التالي يصف السلوك الصحيح؟

أ) ستحدث `Data Race` أكيدة على المتغير `counter` لأنه أكتر من خيط بيعدّله بنفس الوقت

ب) لن يحدث `Data Race` لأنه معالجة كل رسالة تتم بشكل تسلسلي داخل الـ Actor رغم تعدد المرسلين

ج) البرنامج سيدخل بحالة `Deadlock` لأنه أكتر من خيط بينتظر نفس الـ Actor

د) الكود لن يترجم (compile) لأنه `private int counter` لا يمكن تعديله من `process()`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هذا بالضبط الفهم الخاطئ الشائع — الـ Actor عنده خيط تنفيذ واحد يعالج الرسائل رسالة رسالة، مهما كان عدد المرسلين
- ✅ ب): رغم تعدد المرسلين (senders)، الـ Actor نفسه بيعالج الرسائل بالتسلسل (one message at a time)، فمستحيل تحصل Data Race على `counter`
- ❌ ج): ما في انتظار متبادل هون، فقط إرسال غير متزامن للرسائل
- ❌ د): `private` تعني عدم الوصول من خارج الكلاس، لكن `process()` هي method داخل نفس الكلاس فيها صلاحية كاملة

---

### السؤال 8 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
// Thread A                    // Thread B
counter++;                     counter++;
```
إذا نفّذ الخيطان بنفس الوقت بدون أي حماية (`isolated`/`synchronized`)، أي من التالي يصف سلوك الكود تحديداً؟

أ) الكود سيتوقف بالكامل (`Deadlock`)

ب) قد تُفقد إحدى عمليتي الزيادة بسبب `Race Condition` لأنها ليست عملية ذرية

ج) النتيجة ستكون دائماً صحيحة لأن `counter++` عملية واحدة ذرية

د) سيرمي الكود استثناءً (`Exception`) عند التنفيذ

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): ما في انتظار متبادل هون، الخيوط بتكمل تنفيذها عادي — هذا مو `Deadlock`
- ✅ ب): `counter++` بالحقيقة ثلاث عمليات (قراءة، جمع، كتابة) — لو الخيطان قرأو نفس القيمة قبل ما أي وحد يكتب، بتنضاع زيادة وحدة
- ❌ ج): هذا بالضبط الفهم الخاطئ الشائع — `counter++` مش ذرية أبداً
- ❌ د): ما في استثناء بينرمى، بس النتيجة النهائية غلط منطقياً

---

### السؤال 9 (medium)
**السؤال:** أي من التالي يصف بدقة الفرق الحاسم بين مسألة `Producer-Consumer` (unbounded) ومسألة `Bounded Buffer` بتصميم Actors؟

أ) لا فرق أبداً بين التصميمين، الاثنان متطابقان تماماً

ب) بالـ `Bounded Buffer`، actor الـ buffer نفسه هو من يبادر بطلب البيانات (`Request data`) من المنتج بس لما يتأكد فيه مكان فاضي

ج) بالـ `unbounded`، المستهلك هو من يطلب البيانات مباشرة من المنتج بدون تدخل الـ buffer actor

د) `Bounded Buffer` لا يحتاج Actor للمستهلك أصلاً، فقط للمنتج

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): الفرق جوهري بخصوص اتجاه المبادرة كما توضح الإجابة الصحيحة
- ✅ ب): هذا بالضبط ما ميّز `Bounded Buffer` — الـ buffer actor بيرسل `Request data` استباقياً لتفادي حالة الامتلاء (full case)
- ❌ ج): بكلا الحالتين، الـ buffer actor هو الوسيط دائماً بين المنتج والمستهلك، مش تواصل مباشر بينهما
- ❌ د): كلا التصميمين يحتاجان Actor لكل من المنتج والمستهلك والـ buffer

---

### السؤال 10 (hard)
**السؤال:** اذكر التفسير الصحيح لمصطلح `Structural Determinism` بالنسبة للـ `Actor Model` كما يُفهم ضمنياً من مبادئ النموذج.

أ) كل الرسائل بتوصل بترتيب عشوائي دائماً بلا أي استثناء

ب) لأنه الحالة القابلة للتغيير غير مشتركة بين Actors بحكم البنية نفسها، فلا يمكن حدوث Data Race مهما كان توقيت التنفيذ

ج) كل Actor لازم يكون له نفس عدد الرسائل بالضبط طول فترة تشغيله

د) الـ Actor Model لا علاقة له بمنع Data Race إطلاقاً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): الترتيب غير محدد بشكل عام، لكن محفوظ بين نفس المرسل والمستقبل كما أشارت المحاضرة صراحة
- ✅ ب): هذا جوهر مبدأ "Mutable state is not shared" اللي بيضمن غياب Data Race بالتصميم البنيوي، مش بالحظ أو التوقيت
- ❌ ج): لا علاقة لعدد الرسائل بهذا المفهوم
- ❌ د): بالعكس، هذا بالضبط الهدف الأساسي من تصميم النموذج

---

### السؤال 11 (medium) — سيناريو كود
**السؤال:** بالكود التالي:
```java
class ParallelActor extends Actor<Message> {
    void process(Message msg) {
        finish(() -> {
            async(() -> { sharedLocalVar++; });
            async(() -> { sharedLocalVar++; });
        });
    }
}
```
حيث `sharedLocalVar` متغير من الحالة المحلية للـ Actor، أي من التالي يصف الخطر الأكبر بهذا الكود؟

أ) لا يوجد أي خطر لأنه العزل الافتراضي للـ Actor يحمي أي كود جوا `process()` تلقائياً

ب) خطر `Data Race` على `sharedLocalVar` لأنه فتحنا توازي يدوي (`async`) جوا معالجة رسالة واحدة يلمس نفس المتغير

ج) خطر `Deadlock` بين المهمتين الفرعيتين

د) الكود سيرمي استثناءً عند التجميع (compile-time error)

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هذا بالضبط الفهم الخاطئ الشائع — العزل التلقائي يحمي فقط بين رسائل مختلفة، مش بين مهام `async` متوازية داخل نفس الرسالة
- ✅ ب): المحاضرة نبّهت صراحة: "Take care not to introduce data races on local state" — نفس المشكلة التقليدية تعود لو فتحنا توازي يدوي بدون حماية
- ❌ ج): لا يوجد انتظار متبادل بين المهمتين هون، فقط تعديل غير محمي
- ❌ د): لا يوجد أي خطأ يمنع التجميع، المشكلة سلوكية زمن التشغيل فقط

---

### السؤال 12 (medium)
**السؤال:** أي من التالي يصف بشكل صحيح مشكلة `Throughput Bottleneck` بالـ `Pipelining with Actors`؟

أ) عدد Actors المستخدمة أكبر من عدد المعالجات المتوفرة بالنظام

ب) أبطأ مرحلة بالـ pipeline تحدد المعدل الكلي للإنتاجية لكامل السلسلة

ج) عدم وجود ترتيب واضح للرسائل بين مراحل الـ pipeline

د) استخدام `finish`/`async` جوا `process()` بشكل خاطئ يسبب هذه المشكلة

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا علاقة مباشرة بعدد المعالجات مقابل عدد Actors بهذا التعريف تحديداً
- ✅ ب): بالضبط التعريف من المحاضرة — أبطأ مرحلة (Stage) هي عنق الزجاجة اللي بتحدد سرعة الكل
- ❌ ج): ترتيب الرسائل مضمون ضمن كل مرحلة بحسب المحاضرة، وليس هذا مصدر المشكلة
- ❌ د): استخدام `finish`/`async` هو الحل المقترح لهذه المشكلة، وليس سببها

---

### السؤال 13 (hard) — سيناريو كود
**السؤال:** بالمثال التالي:
```java
finish(() -> {
    EchoActor actor = new EchoActor();
    actor.start();
    actor.send("Hello");
    actor.send("World");
    actor.send(EchoActor.STOP_MSG);
});
System.out.println("EchoActor terminated.");
```
لو نسينا استدعاء `exit()` جوا معالجة `STOP_MSG` داخل `process()`، ما الأثر الأرجح على السطر الأخير (`System.out.println("EchoActor terminated.")`)؟

أ) سيُطبع فوراً دون أي تأخير لأنه `println` لا يعتمد على حالة الـ Actor

ب) الـ `finish` قد لا يكتمل كما هو متوقع لأن الـ Actor لن ينتقل رسمياً لحالة `Terminated`

ج) سيرمي البرنامج استثناء `NullPointerException` مباشرة

د) لا يوجد أي أثر لأنه `exit()` اختياري تماماً وليس له أي وظيفة

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `println` بعد `finish` بيعتمد ضمنياً على اكتمال المهام جوا الـ finish بما فيها انتهاء الـ Actor بشكل صحيح
- ✅ ب): بدون `exit()`، الـ Actor يبقى بحالة `Started` ولا ينتقل رسمياً لـ `Terminated`، وهذا يعطل السلوك المتوقع للـ `finish`
- ❌ ج): لا يوجد استثناء متوقع من هذا السيناريو تحديداً
- ❌ د): `exit()` أساسي لإنهاء الـ Actor صراحة، وليس اختيارياً بلا أثر كما توضح المحاضرة ("never forget to terminate an actor")

---

### السؤال 14 (medium)
**السؤال:** استخدام `Barriers` مقابل استخدام `Actors` لـ `Point-to-Point Synchronization` بين مهام متوازية — أي وصف صحيح؟

أ) `Barriers` تنسّق كل الخيوط لتصل لنقطة واحدة معاً، بينما `Actors` تنسّق عبر تبادل رسائل مباشرة بين أطراف محددة دون انتظار الجميع

ب) لا فرق بينهما إطلاقاً من ناحية آلية التنسيق

ج) `Actors` تتطلب دائماً عدد خيوط أكبر من `Barriers`

د) `Barriers` تستخدم رسائل (messages) بينما `Actors` تستخدم فقط انتظار جماعي

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): `Barrier` بتوقف كل المشاركين لحد ما يوصلو كلهم لنفس النقطة (مزامنة جماعية)، بينما `Actor` بيتواصل بشكل مباشر ونقطي عبر رسائل بين مرسل ومستقبل محددين
- ❌ ب): يوجد فرق جوهري بالآلية كما هو موضح بالإجابة الصحيحة
- ❌ ج): لا علاقة مباشرة بعدد الخيوط بين الأداتين
- ❌ د): معكوس تماماً — `Actor` هو من يستخدم الرسائل، بينما `Barrier` يعتمد الانتظار الجماعي

---

### السؤال 15 (hard) — حسابي
**السؤال:** عملية عندها `Work = 40` وحدة، و`Ideal Parallelism = Work / Span = 8`. ما قيمة `Span (CPL)` لهذه العملية؟

أ) 3

ب) 5

ج) 8

د) 32

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- من التعريف: `Ideal Parallelism = Work / Span`، إذاً `Span = Work / Ideal Parallelism = 40 / 8 = 5`
- ✅ ب): طابق الحساب الصحيح تماماً = 5
- ❌ أ): قيمة أقل من الحد الصحيح، خطأ حسابي شائع بقسمة غير صحيحة
- ❌ ج): هذا هو `Ideal Parallelism` نفسه، وليس `Span` — خطأ بالخلط بين المفهومين
- ❌ د): هذا ناتج ضرب خاطئ (`Work - Ideal Parallelism`) وليس له معنى بهذا السياق

---

### السؤال 16 (medium)
**السؤال:** أي من التالي يصف بشكل صحيح متى تتخلق `Actors` جديدة ديناميكياً بمثال `Sieve of Eratosthenes`؟

أ) عدد ثابت من Actors يتم إنشاؤه مسبقاً قبل بدء التنفيذ ولا يتغير أبداً

ب) يتم إنشاء `Actor` فلترة جديد كل ما تم اكتشاف عدد أولي (`prime`) جديد يعبر كل الفلاتر السابقة

ج) يتم إنشاء `Actor` واحد فقط يتولى كل الفلترة لجميع الأعداد الأولية

د) لا علاقة لإنشاء Actors ديناميكياً بهذا المثال إطلاقاً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): العدد ليس ثابتاً مسبقاً، بل يتزايد ديناميكياً مع اكتشاف كل عدد أولي جديد
- ✅ ب): بالضبط الآلية الموضحة بالمحاضرة — كل عدد بيعبر كل الفلاتر السابقة بدون ما ينقسم على أي منها، يصبح عدد أولي جديد وينشئ Actor فلترة خاص فيه
- ❌ ج): التصميم يعتمد على تعدد Actors، Actor واحد لكل عدد أولي مكتشف
- ❌ د): هذا المثال بالتحديد هو أوضح استخدام لقدرة "إنشاء Actors جدد" بالمحاضرة

---

# الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)
```java
class Counter extends Actor<Message> {
    private int counter = 0;
    protected void process(Message msg) {
        if (msg instanceof IncMessage) {
            counter++;
        }
        // forgot to handle DecMessage!
    }
}
```
**الخطأ:** الكود بيتعامل بس مع `IncMessage` وبينسى معالجة `DecMessage` — أي رسالة إنقاص بيتم استقبالها لكن بدون أي تأثير فعلي على `counter`.

**التصحيح:**
```java
protected void process(Message msg) {
    if (msg instanceof IncMessage) {
        counter++;
    } else if (msg instanceof DecMessage) {
        counter--;
    }
}
```

---

### سؤال تصحيح 2 (misconception)
```java
class MyActor extends Actor<String> {
    protected void process(String message) {
        System.out.println("Processing " + message);
    }
}

MyActor actor = new MyActor();
actor.send("Hello"); // sent immediately after creation, no start() called
```
**الخطأ:** الطالب افترض إنه بمجرد `new MyActor()` صار الـ Actor جاهز يستقبل ويعالج رسائل. لكن الـ Actor لسا بحالة `New`، ومحدا رح يعالج الرسالة "Hello" لحد ما يصير بحالة `Started`.

**التصحيح:**
```java
MyActor actor = new MyActor();
actor.start(); // must call start() first — New -> Started
actor.send("Hello");
```

---

### سؤال تصحيح 3 (return_check)
```java
class Buffer extends Actor<Message> {
    protected int process(Message msg) {
        // ... some logic ...
        return 42; // trying to return a value from process()
    }
}
```
**الخطأ:** الطالب حاول يخلي `process()` ترجع قيمة (`int`)، بس بحسب `HJlib API`، توقيع الدالة الصحيح هو `void process(MessageType theMsg)` — الـ Actor ما بيرجع قيمة مباشرة، لأنه التواصل كله بيصير عن طريق رسائل غير متزامنة (send رسالة جواب لو محتاج).

**التصحيح:**
```java
class Buffer extends Actor<Message> {
    protected void process(Message msg) {
        // ... some logic ...
        // if a "result" is needed, send it as a message instead:
        replyTo.send(new ResultMessage(42));
    }
}
```

---

### سؤال تصحيح 4 (dead_code)
```java
class EchoActor extends Actor<Object> {
    protected void process(final Object msg) {
        if (STOP_MSG.equals(msg)) {
            exit();
            System.out.println("Message terminating."); // unreachable!
        } else {
            System.out.println("Message: " + msg);
        }
    }
}
```
**الخطأ:** استدعاء `System.out.println` بعد `exit()` مباشرة كود ميت (dead code) بالمنطق العملي — لأنه بمجرد استدعاء `exit()`، الـ Actor بينتقل لحالة `Terminated` ولا داعي (ولا منطقي) نضيف كود إضافي بعده بنفس البلوك، خصوصاً لو كان الهدف طباعة رسالة "قبل" الإنهاء وليس بعده.

**التصحيح:**
```java
protected void process(final Object msg) {
    if (STOP_MSG.equals(msg)) {
        System.out.println("Message terminating."); // print BEFORE exit()
        exit();
    } else {
        System.out.println("Message: " + msg);
    }
}
```

---

### سؤال تصحيح 5 (logic)
```java
class ParallelActor extends Actor<Message> {
    int total = 0;
    void process(Message msg) {
        finish(() -> {
            async(() -> { total += computeA(); }); // both async tasks
            async(() -> { total += computeB(); }); // write to 'total' unprotected!
        });
    }
}
```
**الخطأ:** فتحنا توازي يدوي (`async`) جوا `process()` بحيث مهمتان بيكتبو بنفس الوقت على نفس المتغير `total` من الحالة المحلية بدون أي حماية — هذا Data Race حقيقي جوا الـ Actor نفسه، رغم إنه الـ Actor "آمن تلقائياً" على مستوى الرسائل.

**التصحيح:**
```java
void process(Message msg) {
    finish(() -> {
        isolated(() -> { total += computeA(); });
    });
    finish(() -> {
        isolated(() -> { total += computeB(); });
    });
    // Or simpler: avoid parallel writes to the same variable —
    // compute values independently then combine sequentially:
    // int a = computeA(); int b = computeB(); total += a + b;
}
```

---

# الجزء الرابع (تكملة): ورقة المراجعة السريعة (Cheat Sheet)

### القواعد الذهبية
| # | القاعدة |
| --- | --- |
| 1 | `Isolated` اليدوي حماية اختيارية؛ `Actor` عزل إجباري بحكم البنية |
| 2 | الـ Actor عنده خيط تنفيذ واحد يعالج رسالة واحدة بكل مرة |
| 3 | التواصل مع/بين Actors يتم فقط عبر رسائل (messages)، لا وصول مباشر |
| 4 | `new` → حالة `New`؛ `start()` → `Started`؛ `exit()` جوا `process()` → `Terminated` |
| 5 | ترتيب الرسائل مضمون بين نفس المرسل ونفس المستقبل، غير مضمون بشكل عام |
| 6 | العزل التلقائي يحمي بين رسائل مختلفة فقط؛ التوازي اليدوي (`async`) جوا `process()` لازم حماية يدوية |
| 7 | أبطأ مرحلة بالـ pipeline = عنق الزجاجة (throughput bottleneck)؛ الحل: task parallelism داخلها |
| 8 | `Bounded Buffer`: الـ buffer actor هو من يبادر بطلب البيانات، لا ينتظرها سلبياً |

### مرجع سريع للمصطلحات والصيغ
| المصطلح | التعريف بسطر |
| --- | --- |
| `Actor` | كائن مستقل بهوية ثابتة، خيط واحد، حالة معزولة افتراضياً، وواجهة تفاعل |
| `Mailbox` | صندوق داخلي لتخزين الرسائل الواردة حتى معالجتها |
| `New` / `Started` / `Terminated` | مراحل دورة حياة الـ Actor الثلاث |
| `process()` | الدالة التي تحدد سلوك الـ Actor عند استقبال رسالة |
| `send()` | إرسال رسالة (غير متزامن) لـ Actor |
| `start()` / `exit()` | الانتقال New→Started / Started→Terminated |
| `Actor Model` | نموذج تزامن قائم على الرسائل، عرّفه Carl Hewitt عام 1973 |
| `Speedup(P)` | `Work / max(Span, Work/P)` |
| `Amdahl's Law` (P→∞) | `Speedup = 1 / (1 - parallel_fraction)` |
| `Ideal Parallelism` | `Work / Span` |
| `Throughput Bottleneck` | أبطأ مرحلة بالـ pipeline تحدد سرعة النظام كله |

---

# الجزء الثالث (تكملة): بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ليش `Isolated` اليدوي غير كافٍ لضمان الأمان الكامل؟
**A:** لأنه بيحمي بس البلوك اللي وُضع فيه؛ أي وصول للبيانات من مكان تاني بدون `isolated` يبقى مكشوفاً.

### البطاقة 2
**Q2:** شو العناصر الأربعة لأي `Actor`؟
**A:** هوية ثابتة (immutable identity)، خيط تنفيذ منطقي واحد، حالة محلية معزولة افتراضياً، وواجهة (interface/procedures).

### البطاقة 3
**Q3:** شو المراحل الثلاث بدورة حياة الـ Actor؟
**A:** `New` (تم إنشاؤه)، `Started` (يعالج رسائل)، `Terminated` (توقف نهائياً).

### البطاقة 4
**Q4:** كيف تنقل Actor من حالة `New` لحالة `Started`؟
**A:** باستدعاء `start()`.

### البطاقة 5
**Q5:** كيف ينهي Actor حاله وينتقل لحالة `Terminated`؟
**A:** بأن يستدعي هو نفسه `exit()` جوا `process()`.

### البطاقة 6
**Q6:** من عرّف `Actor Model` أول مرة، وبأي سنة؟
**A:** `Carl Hewitt` سنة 1973، وطوّره لاحقاً `Henry Baker` و `Gul Agha`.

### البطاقة 7
**Q7:** شو أهم نتيجة عملية لمبدأ "الحالة القابلة للتغيير غير مشتركة" بالـ Actor Model؟
**A:** غياب `Data Race` بالتصميم نفسه، مش بسبب استخدام أقفال.

### البطاقة 8
**Q8:** هل ترتيب الرسائل بين Actors مضمون دائماً؟
**A:** لا، بشكل عام الترتيب غير محدد (non-deterministic)، لكن كثير مكتبات (منها HJlib) بتحافظ عليه بين نفس المرسل ونفس المستقبل.

### البطاقة 9
**Q9:** شو خطر استخدام `finish`/`async` جوا `process()` بدون انتباه؟
**A:** ممكن يصير `Data Race` على الحالة المحلية للـ Actor لو أكتر من مهمة `async` عدّلت نفس المتغير بدون حماية.

### البطاقة 10
**Q10:** شو معنى `Throughput Bottleneck` بالـ Pipelining with Actors؟
**A:** أبطأ مرحلة بالـ pipeline بتحدد معدل الإنتاجية الكلي لكل السلسلة.

### البطاقة 11
**Q11:** شو الحل لتقليل أثر أبطأ مرحلة بالـ pipeline؟
**A:** إدخال task parallelism جوا تلك المرحلة نفسها لتقليل زمن معالجتها.

### البطاقة 12
**Q12:** ما الفرق الحاسم بين `Producer-Consumer` (unbounded) و `Bounded Buffer`؟
**A:** بالـ Bounded Buffer، الـ buffer actor نفسه يبادر بإرسال "Request data" للمنتج، بينما بالـ unbounded المنتج يبعت البيانات وقت ما يجهز دون طلب مسبق.

### البطاقة 13
**Q13:** كيف يتم إنشاء Actor جديد بمثال `Sieve of Eratosthenes`؟
**A:** كل ما عدد يعبر كل الفلاتر السابقة (يعني عدد أولي جديد)، يتم إنشاء Actor فلترة جديد خاص بمضاعفات هذا العدد.

### البطاقة 14
**Q14:** شو الفرق بين استخدام `Isolated` مع `Threads` واستخدام `Actor`؟
**A:** `Isolated` حماية يدوية لبلوك محدد ومسؤوليتها على المبرمج؛ `Actor` عزل تلقائي دائم على مستوى الحالة كاملة بحكم البنية.

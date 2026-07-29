# المحاضرة 7 — Critical Sections and Isolation (الأقسام الحرجة والعزل)
> **المادة:** البرمجة المتوازية والمتزامنة (نظري) | **الموضوع:** إدارة الوصول للموارد المشتركة بين الخيوط عبر `Critical Sections`، `Isolated Construct`، `Object-based Isolation`، `Atomic Variables`، و `Read/Write Isolation`

---

# الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

## 1. عن ماذا هذه المحاضرة؟
هذه المحاضرة بتكمل موضوع `Concurrent Programming` بعد ما اتعرفنا على `Threads` و `Locks`. هون رح نتعرف على أداة أعلى مستوى اسمها `Critical Section` (أو `isolated construct`)، اللي بتحل مشكلة `Data Races` بطريقة أبسط وأأمن من الـ `Locks` اليدوية، وبتضمن عدم حدوث `Deadlock` أبداً. رح نشوف كيف نطورها لتصير أدق (`Object-based Isolation`)، وكيف نستخدمها بأنماط جاهزة زي `Compare-and-Set` و `Work-Sharing`، ووصولاً لأدوات جاهزة بلغة Java زي `AtomicInteger`.

## 2. ماذا ستقدر تعمل بعد هذه المحاضرة؟
- تعرّف `Critical Section` و `Isolated Construct` وتفرّق بينهم وبين الحل اليدوي بـ `Locks`.
- تكتب كود Java يستخدم `isolated(() -> {...})` لحماية منطقة حرجة (`Critical Region`).
- تفرّق بين `Global Isolation` و `Object-based Isolation` وتعرف متى تستخدم كل وحدة.
- تطبّق `Object-based Isolation` على بنية بيانات مثل `Doubly Linked List`.
- تفهم نمط `Compare-and-Set Pattern` ونمط `Work-Sharing Pattern` وتكتب كود لهما.
- تستخدم `java.util.concurrent.atomic.AtomicInteger` وتعرف مكافئها بصيغة `isolated`.
- تفرّق بين `Read Isolation` و `Write Isolation` وتعرف ليش هاد التقسيم بيزيد التوازي.

## 3. شو المفروض تعرفه قبل ما تبلّش
- مفهوم `Thread` و `Runnable` (المحاضرات السابقة: `Threads and Locks`).
- التعريف الرسمي لـ `Data Race` (Recap موجود بأول المحاضرة، بس أفضل تكون شفتها قبل).
- أساسيات `finish-async` model (`finish(() -> {...})`, `async(() -> {...})`) من محاضرات `Part-1: Parallel Programming`.
- مفهوم `Lock` كأداة أساسية لتحقيق `Mutual Exclusion` (محاضرة سابقة: `Threads and Locks`).

## 4. أهم 5-8 مفاهيم بالمحاضرة
- **`Critical Section`:** قطعة كود بتوصل لمورد مشترك ولازم ما يوصلّها أكتر من خيط بنفس الوقت.
- **`Isolated Construct`:** أداة برمجية (`isolated(() -> {...})`) بتطبّق `Critical Section` بشكل ضمني وآمن من `Deadlock`.
- **`Object-based Isolation`:** صيغة متطورة من `isolated` بتحدد بالضبط شو الكائنات (`Objects`) اللي محتاجة حماية، لزيادة التوازي.
- **`Compare-and-Set Pattern`:** نمط بيستخدم `isolated` للتحقق من شرط ثم التعديل بخطوة واحدة ذرية.
- **`Work-Sharing Pattern`:** نمط بيوزّع شغل (زي عناصر مصفوفة) بين خيوط متعددة بأمان عبر متغير عداد مشترك.
- **`AtomicInteger`:** كلاس جاهز بلغة Java (`java.util.concurrent.atomic`) بيوفّر عمليات ذرية (`atomic`) على عدد صحيح بدون الحاجة لكتابة `isolated` يدوياً.
- **`Read/Write Isolation`:** تقسيم العزل لنوعين (قراءة وكتابة) للسماح بعدة عمليات قراءة متزامنة، وحصر العزل الكامل لعمليات الكتابة فقط.

## 5. كيف تتصل هذه المحاضرة بالمحاضرات المجاورة
هذه المحاضرة هي الثانية بجزء `Concurrent Programming` (بعد `Threads and Locks` وقبل `Concurrent Data Structures`). فكرة `Critical Section` هون هي البديل الأعلى مستوى عن `Locks` اليدوية اللي اتعلمناها بالمحاضرة السابقة — يعني بدل ما تدير `lock.acquire()` و `lock.release()` يدوياً، بتستخدم `isolated` والنظام بيدير الحماية إلك. والمحاضرة الجاية (`Concurrent Data Structures`) رح تبني فوق هالمفاهيم لتصميم بنى بيانات كاملة آمنة للتزامن (زي `Concurrent HashMap`, `Concurrent Queue`).

## 6. أشهر 3-5 أخطاء يقع فيها الطلاب بهذا الموضوع
1. الاعتقاد إن `isolated` هو نفسه `lock` عادي — بينما `isolated` هو مفهوم أعلى مستوى بيضمن عدم `Deadlock`، وهذا فرق جوهري.
2. نسيان إنه `Object-based isolated` لازم يشمل **كل** الكائنات اللي بتتلمس بالكود (زي `this.prev`, `this`, `this.next`) — نسيان كائن واحد بيرجّع مشكلة `Data Race`.
3. الخلط بين `isolated(*)` (العزل الشامل الافتراضي) و `isolated(Object)` (العزل المحدد بكائن) — وظن إنهم نفس الأداء.
4. محاولة استخدام عمليات `blocking` (زي `finish`, `future.get()`, `next`) داخل `isolated` — هذا ممنوع تماماً وبيكسر الضمانات.
5. الظن إنه `Read/Write Isolation` معناها إلغاء الحماية على القراءة بالكامل — بينما هي فقط بتسمح بعدة قراءات متزامنة، وما بتسمح بقراءة مع كتابة بنفس الوقت.

---

# الجزء الثاني: الشرح التفصيلي

### 1. مقدمة ومراجعة Data Races
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "lecture_6_threads_locks", group: "1.1-1.2"} -->

#### 📍 أين نحن الآن؟
هالمجموعة (1.1 → 1.2) بتبلّش المحاضرة بمراجعة سريعة لمشكلة `Data Race`، قبل ما نروح على الحل (`Critical Section` / `isolated`).

#### ⬅️ الربط مع السابق
بالمحاضرة السابقة (`Threads and Locks`) تعلمنا كيف نستخدم `Locks` يدوياً لحل مشاكل التزامن. هون رح نراجع أصل المشكلة (`Data Race`) قبل ما نشوف حل أعلى مستوى.

#### 💡 الفكرة الأساسية
**التحدي الأساسي بالبرمجة المتزامنة هو إدارة وصول عدة خيوط لنفس المورد المشترك بدون ما تصير نتيجة غلط.**

---

#### 💻 الكود (مثال توضيحي — Bank Account Transfer)
```java
// المتغيرات المشتركة
int MyBalance = 600, FamilyBalance = 1000, ChildBalance = 0;

// Thread-1: الأب بيحوّل 100$ من حسابه للحساب العائلي
Thread1 {
    MyBalance = MyBalance - 100;
    FamilyBalance = FamilyBalance + 100;
}

// Thread-2: الابن بياخد 100$ من الحساب العائلي لحسابه
Thread2 {
    FamilyBalance = FamilyBalance - 100;
    ChildBalance = ChildBalance + 100;
}
```

#### شرح الكود سطراً بسطر
1. `MyBalance = MyBalance - 100`: الخيط الأول بيسحب 100 من حساب الأب.
2. `FamilyBalance = FamilyBalance + 100`: الخيط الأول بيضيف 100 للحساب العائلي (بعملية `Read` ثم `Write`).
3. `FamilyBalance = FamilyBalance - 100`: الخيط الثاني بيسحب 100 من نفس الحساب العائلي (بعملية `Read` ثم `Write` كمان).
4. `ChildBalance = ChildBalance + 100`: الخيط الثاني بيضيف 100 لحساب الابن.

#### 📖 الشرح
ليش هاي مشكلة أصلاً؟ لأنه كل خيط بيعمل على `FamilyBalance` عمليتين منفصلتين: **يقرأ** القيمة الحالية، وبعدين **يكتب** القيمة الجديدة. المشكلة إنه بين لحظة القراءة ولحظة الكتابة، الخيط التاني ممكن "يتدخل" ويقرأ نفس القيمة القديمة قبل ما تتحدّث — فبيصير فيه "سباق" (`Race`) على مين بيحسم القيمة النهائية.

السيناريو الخطر المذكور بالمحاضرة: **R2, R1, W2, W1** — يعني الخيط الثاني يقرأ `FamilyBalance` (=1000)، بعدين الخيط الأول يقرأ نفس القيمة (=1000)، بعدين الخيط الثاني يكتب (1000-100=900)، وأخيراً الخيط الأول يكتب (1000+100=1100) — **فالنتيجة النهائية 1100 وليس 1000 الصحيحة**، وضاعت عملية سحب الابن بالكامل! هاد مثال كلاسيكي على `Data Race`.

`Data Race` رسمياً (بحسب التعريف الرسمي اللي راجعناه): بتصير على موقع `L` بتنفيذ برنامج له `Computation Graph` معيّن `CG`، إذا وجدت خطوتين `S1` و `S2` بحيث: (أ) ما فيه علاقة اعتماد (`dependence`) بينهم بأي اتجاه بالـ `CG`، و(ب) كلاهما بيقرأ أو بيكتب على `L`، وواحدة منهم على الأقل عملية كتابة (`write`).

بس المشكلة الأعمق: مش كل تضارب بالوصول لازم يكون خطأ! فيه حالات كتير بالواقع بيحتاج فيها الخيوط توصل لنفس الموقع بشكل شرعي بدون ما يصير `Data Race` — والسؤال المطروح: **كيف نتعامل مع هالتضارب الشرعي لما النتيجة ممكن تكون غير حتمية (`nondeterministic`)؟** هاد بالضبط اللي رح تجاوب عنه بقية المحاضرة.

#### 🤔 تفعيل الفهم
لو الخيط الأول والخيط الثاني اشتغلو بالترتيب **R1, W1, R2, W2** (يعني كل وحد قرأ وكتب بشكل متتالي بدون تداخل)، هل رح تصير مشكلة؟ فكّر بالجواب قبل ما تكمل — الجواب: لأ، هاد الترتيب هو أحد السيناريوهات الصحيحة، والمشكلة بس لما القراءة والكتابة تتداخل بين الخيطين.

#### 🎯 الملخص السريع
- التحدي الأساسي: التحكم بوصول خيوط متعددة لموارد مشتركة.
- `Data Race` بتصير لما خطوتين مستقلتين (بلا علاقة اعتماد) بتوصلو لنفس الموقع، وواحدة منهم على الأقل كتابة.
- مثال `Bank Account`: تضارب على `FamilyBalance` بين خيطين، سيناريو R2,R1,W2,W1 بيعطي نتيجة غلط.
- مثال `Doubly Linked List`: عمليتا `delete()` متزامنتين على عقد متجاورة بيعملو `Data Race` على حقول `next`/`prev`.
- التحدي: كيف نسمح بتضارب شرعي بدون خطأ؟

#### 📚 التطبيق
هاد السؤال ("كيف نتعامل مع التضارب الشرعي؟") هو اللي رح يجاوب عنه القسم الجاي عن `Critical Sections` و `Mutual Exclusion`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> In concurrent programming: the key challenge is to manage the accesses by concurrent threads to shared resources. We've learned about using locks in different kinds of ways to do that. We will now learn about higher level construct called a critical section, that's also referred to as an isolated construct.
>
> Formally, a data race occurs on location L in a program execution with computation graph CG if there exist steps (nodes) S1 and S2 in CG such that: S1 does not depend on S2 and S2 does not depend on S1, and both S1 and S2 read or write L, and at least one of the accesses is a write. However, there are many cases in practice when two tasks may legitimately need to perform conflicting accesses to shared locations without incurring data races. How should conflicting accesses be handled in general, when outcome may be nondeterministic?
>
> Example-1 (Bank Account Transfer): Parent has an account, a child has one, and a shared account as a family one. Thread-1: MyBalance=MyBalance-100; FamilyBalance=FamilyBalance+100. Thread-2: FamilyBalance=FamilyBalance-100; ChildBalance=ChildBalance+100. Each thread performs read and write on FamilyBalance. Possible scenario: R2, R1, W2, W1.
>
> Example-2 (Doubly Linked List): class DoublyLinkedListNode { ... void delete() { this.prev.next = this.next; this.next.prev = this.prev; } }. static void deleteTwoNodes(...): finish(() -> { async(second.delete()); async(third.delete()); // conflicts with previous async });

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف الرسمي للـ Data Race، مثال Bank Account بالتفصيل، سيناريو R2R1W2W1.
- ℹ️ إضافة من الدليل: التشبيه العملي وتفعيل الفهم لتوضيح الفرق بين الترتيب الآمن والخطير.

</details>

---

### 2. الأقسام الحرجة والعزل الشامل (Critical Sections & Global Isolated Construct)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1", group: "2.1-2.3"} -->

#### 📍 أين نحن الآن؟
هالمجموعة (2.1 → 2.3) بتقدّم الحل الأساسي لمشكلة `Data Race`: مفهوم `Critical Section` وتطبيقه العملي بلغة الـ pseudocode عبر `isolated construct`.

#### ⬅️ الربط مع السابق
بعد ما شفنا المشكلة (`Data Race`) بمثالي البنك والقائمة المزدوجة بالقسم السابق، هالمجموعة رح تعرّفنا على الحل: إحاطة الكود الحساس بمنطقة محمية (`Critical Section`) عبر أداة `isolated`.

#### 💡 الفكرة الأساسية
**`Mutual Exclusion` (الإقصاء المتبادل) هو الحل: نحيط الكود اللي بيوصل لمورد مشترك بمنطقة اسمها `Critical Section`، وهي بتضمن إنه خيط واحد بس ينفّذها بلحظة معينة.**

#### 💡 التشبيه
تخيّل حمام عام بباب واحد بس — أي شخص لازم يستنى برّا لحد ما اللي جوّا يطلع. هاد بالضبط دور `Critical Section`: منطقة كود "الباب الواحد"، ما بتسمح لأكتر من "شخص" (خيط) يدخلها بنفس الوقت. وجه الشبه: `Critical Section` = الحمام، `Thread` = الشخص، `Mutual Exclusion` = قاعدة "واحد بالمرة".

---

#### 💻 الكود
```java
// الصياغة العامة لـ isolated construct
isolated(() -> {
    // <body> — الكود اللي بده حماية (Critical Section)
});
```

```java
// تطبيق على مثال Bank Account
// المتغيرات المشتركة
int MyBalance = 600, FamilyBalance = 1000, ChildBalance = 0;

// Thread-1
{
    isolated(() -> {
        MyBalance = MyBalance - 100;
        FamilyBalance = FamilyBalance + 100;
    });
}

// Thread-2
{
    isolated(() -> {
        FamilyBalance = FamilyBalance - 100;
        ChildBalance = ChildBalance + 100;
    });
}
```

#### شرح الكود سطراً بسطر
1. `isolated(() -> { ... })`: بتحدد إنه الكود جوّا القوسين هو `Critical Section` — لازم ينفّذ بالكامل بدون تداخل مع أي `isolated` تاني.
2. جوّا `Thread-1`: عمليتا القراءة والكتابة على `MyBalance` و `FamilyBalance` صارو الآن "كتلة واحدة ذرية" من منظور التزامن.
3. جوّا `Thread-2`: نفس الشي — عمليتا `FamilyBalance` و `ChildBalance` محميتين سوا.
4. بما إنه الخيطين بيستخدمو `isolated`، النظام بيضمن إنه ما فيه تداخل بينهم على `FamilyBalance`.

#### 📖 الشرح
تعريف `Critical Section` رسمياً: **قطعة كود بتوصل لمورد مشترك (بنية بيانات أو جهاز) وما لازم توصلها أكتر من خيط تنفيذ بنفس الوقت.** بالعادة بتنتهي بوقت محدد (`fixed time`)، والخيط اللي بده يدخلها بيستنى وقت محدد كمان (`bounded waiting`). هاد النمط بيُعرف كمان باسم `Monitor Concurrency Pattern`.

الأداة اللي بتطبق هالمفهوم عملياً هي `isolated construct`، وصيغتها العامة: `isolated(() -> <body>)`. أهم خصائصها:
- **الضمان الأساسي:** أي خيطين بينفذو `isolated` بيتم تنفيذهم بترتيب متبادل (`mutual exclusion`) — بس هاد الضمان بينطبق **بس** بين زوج (`isolated`, `isolated`)، مو بين (`isolated`, كود عادي غير محمي).
- **التداخل (`Nesting`):** يمكن نستخدم `isolated` جوا `isolated` تانية، بس هاد بيكون زايد عن الحاجة (`redundant`) لأنه المنطقة الخارجية أصلاً بتحميها.
- **قيد مهم:** ممنوع نستخدم داخل `isolated` أي عملية `parallel construct` بتعمل `blocking` (زي `finish`, `future.get()`, `next`) — لأنها ممكن تعلّق التنفيذ لحد ما تصير مشكلة.
- **الإنشاء غير الحاجز مسموح:** يمكن ننشئ مهمة غير حاجزة (`async task`, `future task`, `data-driven task`) جوا `isolated`، بس الضمان بينطبق بس على "إنشاء" المهمة، مو على "تنفيذها" الفعلي.
- **أهم ميزة: لا `Deadlock` أبداً.** بعكس تقنيات تانية زي `Locks` اللي ممكن تسبب `Deadlock` لو استُخدمت غلط، `isolated construct` مصمم بحيث ما يقدر يسبب `Deadlock` مهما كان.
- **`Global isolated` semantically بيعادل `global lock`** — يعني هي بالمنطق زي قفل واحد عالمي يشمل البرنامج كله.

بتطبيق `isolated` على مثالي القسم السابق:
- **Bank Account:** السيناريوهات المحتملة صارت **فقط**: `R2 W2 R1 W1` أو `R1 W1 R2 W2` — يعني كل عملية (قراءة+كتابة) صارت كتلة واحدة ما بتنقسم، وما فيه احتمال تضارب زي قبل.
- **Doubly Linked List:** كود `delete()` صار `isolated(() -> { this.prev.next = this.next; this.next.prev = this.prev; });` — فصارت عمليتا التعديل محميتين سوا.

#### 🎯 الملخص السريع
- `Critical Section`: كود بيوصل مورد مشترك، ممنوع دخوله أكتر من خيط بنفس الوقت.
- `isolated(() -> <body>)`: الأداة اللي بتطبّق `Critical Section`.
- الضمان بس بين زوج `isolated`-`isolated`، مو مع كود غير محمي.
- ممنوع `blocking operations` جوا `isolated`.
- `isolated` ما بيسبب `Deadlock` أبداً — أهم فرق عن `Locks` اليدوية.
- `Global isolated` = `global lock` من ناحية المعنى.

#### 📚 التطبيق
لاحظنا إنه `isolated` بالمثال حل المشكلة، بس هل فيه مشكلة أداء لو استخدمناها هيك دايماً بشكل شامل (`global`)؟ هاد اللي رح يوصلنا للقسم الجاي: `Object-based Isolation`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيحسبو `isolated` هو بس اسم تاني لـ `lock.acquire()` / `lock.release()` اليدوي، وإنه نفس المفهوم بالضبط.

#### الفهم الصحيح ✅:
الفرق الحاسم: `isolated` هو أداة **أعلى مستوى** بتدير الحماية ضمنياً (implicitly) بدون ما تكتب `acquire`/`release` بنفسك، **وبتضمن رياضياً عدم حدوث `Deadlock` مهما كانت طريقة الاستخدام** — بينما `Locks` اليدوية ممكن تسبب `Deadlock` لو استُخدمت بترتيب خاطئ (مثلاً خيط بياخد قفلين بترتيب معاكس لخيط تاني). يعني السؤال الفاصل: هل الأداة بتضمن عدم `Deadlock` رياضياً بحد ذاتها؟ `isolated` نعم، `Lock` اليدوي لأ.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Mutual Exclusion: In both previous examples, we need to implement the concept of mutual exclusion. The predominant approach to ensure mutual exclusion proposed many years ago is to enclose the code region in a critical section. "In concurrent programming a critical section is a piece of code that accesses a shared resource (data structure or device) that must not be concurrently accessed by more than one thread of execution. A critical section will usually terminate in fixed time, and a thread, task or process will have to wait a fixed time to enter it (aka bounded waiting)." Also known as the "Monitor Concurrency Pattern".
>
> "Global" isolated Construct: isolated(() -> <body>); Isolated construct identifies a critical section. Two tasks executing isolated constructs are guaranteed to perform them in mutual exclusion. Isolation guarantee only applies to (isolated, isolated) pairs of constructs, not to (isolated, non-isolated) pairs of constructs. Isolated constructs may be nested; an inner isolated construct is redundant. Blocking parallel constructs are forbidden inside isolated constructs; isolated constructs must not contain any parallel constructs that perform a blocking operation (finish, future get, next). Non-blocking task (async task, future task, data-drive task) creation is permitted, but isolation guarantee only applies to the creation of the task, not to its execution. Isolated constructs can never cause a deadlock; other techniques for enforcing mutual exclusion (e.g., locks) could lead to a deadlock, if used incorrectly. "Global isolated" construct is semantically equivalent to a "global lock".
>
> Example-1 – Bank Account Transfer Isolated: (code as shown). Using Isolated construct: scenarios are: R2 W2 R1 W1, R1 W1 R2 W2.
>
> Example-2 – Doubly Linked List Isolated: void delete() { isolated(() -> { this.prev.next = this.next; this.next.prev = this.prev; }); ... }

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف Critical Section، كل خصائص isolated الست، تطبيقها على مثالي البنك والقائمة.

</details>

---

### 3. العزل المبني على الكائنات (Object-based Isolation)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2", group: "3.1-3.2"} -->

#### 📍 أين نحن الآن؟
هالمجموعة (3.1 → 3.2) بتشرح ليش الـ `Global isolated` مش كافي بكل الحالات، وكيف نطوّره لصيغة أدق (`Object-based`) بتحدد بالضبط شو الكائنات المحتاجة حماية.

#### ⬅️ الربط مع السابق
بالقسم السابق تعلمنا إنه `Global isolated` بيعادل `global lock` — يعني بيحمي **كل شي** بنفس الوقت. هالمجموعة رح توضح مشكلة هاد الأسلوب وتقدم حل أدق.

#### 💡 الفكرة الأساسية
**`Object-based Isolation` بتسمح نحدد بالضبط شو الكائنات (`Objects`) اللي بدها حماية، بدل ما نحمي كل شي بشكل عالمي — وهيك بنزيد التوازي.**

#### 💡 التشبيه
تخيل مبنى فيه كذا غرفة اجتماعات منفصلة، بدل قاعة وحدة كبيرة للجميع. لو كل اجتماع إله غرفته الخاصة، فريقين مختلفين يقدرو يجتمعو بنفس الوقت بدون ما يعطّلو بعض — بعكس لو كانو كلهم لازم يستخدمو نفس القاعة الواحدة. وجه الشبه: `Global isolated` = قاعة وحدة للجميع، `Object-based isolated` = غرفة لكل اجتماع حسب المشاركين الفعليين.

---

#### 💻 الكود (المشكلة أولاً — لماذا نحتاج Object-based؟)
```java
// قائمة مزدوجة: A -> B -> C -> D -> E -> F
// ثلاث مهام تريد الحذف بنفس الوقت:
// T1: Delete(B)   T2: Delete(C)   T3: Delete(E)

// لو استخدمنا Global isolated بس:
// T1, T2, T3 لازم تنتظر بعضها بالتسلسل حتى لو ما فيه تضارب فعلي
// (T3 بتحذف E، بعيدة تماماً عن B و C — بس لسا لازم تستنى!)
```

#### 📖 الشرح
بمثال القائمة `A->B->C->D->E->F`، لو استخدمنا `isolated` الشامل (`Global`)، فالمهام الثلاث (`T1: Delete(B)`, `T2: Delete(C)`, `T3: Delete(E)`) رح تُنفّذ **بالتسلسل الكامل واحدة ورا الثانية**، رغم إنه `T3` (حذف `E`) أصلاً بعيدة تماماً عن منطقة `T1` و `T2` (حذف `B` و `C`) ومفيش أي تضارب فعلي بينهم! هون بالضبط المشكلة: `Global isolated` بيضحّي بتوازي حقيقي وممكن لأنه بيحمي "كل شي" حتى لو مش لازم.

الحل: **`Object-based Isolation`** — بدل ما نقول "احمي كل شي"، نحدد بالضبط الكائنات المشاركة (`participant objects`) اللي بيلمسها كل عملية:
- `T1: Delete(B)` → `isolated {A, B, C}` (لأنه الحذف بيلمس الجار السابق والتالي كمان)
- `T2: Delete(C)` → `isolated {B, C, D}`
- `T3: Delete(E)` → `isolated {D, E, F}`

هيك، `T1` و `T3` (بمجموعتين `{A,B,C}` و `{D,E,F}`) ما فيهم أي كائن مشترك → يقدرو ينفذو **بالتوازي الكامل**! بس `T1` و `T2` (بمجموعتين `{A,B,C}` و `{B,C,D}`) فيهم كائنات مشتركة (`B`, `C`) → لازم يتنافسو ويتناوبو.

#### 🤔 تفعيل الفهم
لو عندنا `T4: Delete(D)` بنفس المثال، شو مجموعة الكائنات المتوقعة إلها؟ فكّر قبل ما تكمل — الجواب المتوقع: `{C, D, E}`، وهاد بيخليها تتنافس مع `T2` (`{B,C,D}` بسبب `C,D`) ومع `T3` (`{D,E,F}` بسبب `D,E`) بنفس الوقت.

---

#### 💻 الكود (الصيغة العامة والتطبيق)
```java
// الصيغ العامة لـ Object-based isolated
isolated(Object participant1, () -> <body>);
isolated(Object participant1, Object participant2, () -> <body>);
isolated(Object participant1, Object participant2, Object participant3, () -> <body>);
isolated(Object[] participants, () -> <body>);
```

```java
// تطبيق على DoublyLinkedListNode.delete()
class DoublyLinkedListNode {
    DoublyLinkedListNode prev, next;

    void delete() {
        isolated(this.prev, this, this.next, () -> { // object-based isolation
            this.prev.next = this.next;
            this.next.prev = this.prev;
        });
        // ... باقي الكود اللي ما بيحتاج mutual exclusion
    }
} // DoublyLinkedListNode

static void deleteTwoNodes(final DoublyLinkedListNode L) {
    finish(() -> {
        DoublyLinkedListNode second = L.next;
        DoublyLinkedListNode third = second.next;
        async(() -> { second.delete(); });
        async(() -> { third.delete(); });
    });
}
```

#### شرح الكود سطراً بسطر
1. `isolated(this.prev, this, this.next, () -> {...})`: بنحدد صراحة الكائنات الثلاث المشاركة بعملية الحذف — العقدة السابقة، العقدة الحالية، والعقدة التالية.
2. `this.prev.next = this.next`: تعديل يلمس `this.prev` و `this` معاً — لهيك لازم تكون `this.prev` جوا قائمة المشاركين.
3. `this.next.prev = this.prev`: تعديل يلمس `this.next` و `this` معاً — لهيك `this.next` كمان لازم تكون مشاركة.
4. `deleteTwoNodes`: بيستدعي `second.delete()` و `third.delete()` بشكل متوازي (`async`)؛ بما إنه `second` و `third` جيران مباشرين، مجموعتا المشاركين إلهم بتتقاطع (كلاهما بيلمس العقدة الوسطى المشتركة)، فبيتناوبو تلقائياً بدون ما يسبب `Data Race`.

#### 📖 الشرح
بما إن `isolated` بمثال `DoublyLinkedListNode` بلشت بعلامة استفهام (`isolated(?, ?, ..., () -> {...})`)، الجواب واضح من تحليل الكود: **العملية بتلمس ثلاث حقول: `this.prev.next`, `this.next.prev`** — يعني الكائنات المتأثرة فعلياً هي `this.prev`, `this`, و `this.next`. فالصيغة الصحيحة: `isolated(this.prev, this, this.next, () -> {...})`.

#### 🎯 الملخص السريع
- المشكلة: `Global isolated` بيحمي "كل شي" حتى لو ما فيه تضارب فعلي → يقلل التوازي بلا داعي.
- الحل: `Object-based Isolation` بيحدد الكائنات المشاركة بالضبط (`participant objects`).
- صيغ متعددة: من كائن واحد لغاية مصفوفة كائنات `Object[]`.
- مهمتين بمجموعتي كائنات ما فيهم تقاطع (`empty intersection`) → ينفذو بالتوازي الكامل.
- `isolated(*)` (بدون تحديد) بيعادل `Global isolated` — أي عزل عبر كل الكائنات.

#### 📚 التطبيق
بمثال القائمة المزدوجة، بنشوف كيف الكائنات المتقاطعة بتقرر مين بيتنافس مع مين — هاد المبدأ رح يتكرر بأنماط تطبيقية زي `Compare-and-Set` بالقسم الجاي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفكرو إن `Object-based isolated` هو نفسه "قفل لكل كائن" (`per-object locking`) — يعني كل كائن إله قفله الخاص وخلص.

#### الفهم الصحيح ✅:
المحاضرة بتنص صراحة إن `Object-based isolated construct is not semantically the same as per-object locking`. الفرق الحاسم: التطبيق الداخلي (`implementation`) بيضمن إنه الكائنات المتشاركة بتُحجز (`acquired`) **بترتيب عالمي موحّد** (`global order`) عبر كل النظام، مو مجرد قفل مستقل لكل كائن بترتيب عشوائي — وهاد بالضبط اللي بيحافظ على ضمان **عدم حدوث `Deadlock`** حتى مع تعدد الكائنات، وهو ضمان ما بيوفره `per-object locking` التقليدي لو استُخدم غلط.

<details>
<summary>عرض ملاحظة إضافية</summary>

**ℹ️ إضافة من الدليل:** هاد الفرق مهم جداً لأنه لو كل كائن إله قفل مستقل وبتاخدهم بترتيب عشوائي (مثلاً خيط بياخد قفل A ثم B، وخيط تاني بياخد B ثم A)، ممكن تصير `Deadlock` كلاسيكية. `Object-based isolated` بتتفادى هاد تماماً عبر ضبط ترتيب الحجز داخلياً.
</details>

#### 📚 المزايا والعيوب (Trade-off)

| الجانب | التفصيل |
| --- | --- |
| ✅ ميزة | يزيد التوازي (`parallelism`) مقارنة بأسلوب `Critical Section` الشامل |
| ✅ ميزة | أبسط من إدارة `Locks` يدوياً |
| ✅ ميزة | خاصية عدم `Deadlock` (`deadlock-freedom`) لسا مضمونة |
| ❌ عيب | المبرمج لازم ينتبه ويحدد الكائنات المشاركة (`participant objects`) بشكل صحيح ودقيق |
| ❌ عيب | الكائنات المشاركة لازم تُحدَّد بس عند بداية `isolated construct`، ما فيك تضيف كائن بنص التنفيذ |
| ❌ عيب | مصفوفات كائنات كبيرة (`large participant object arrays`) ممكن تساهم بزيادة الـ `overhead` |

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Object-based Isolation: Suppose we have a doubly linked list: {A->B->C->D->E->F} and three tasks: T1: Delete(B), T2: Delete(C), T3: Delete(E). We can use isolated construct to enforce mutual exclusion, but ??? We need isolation based on shared objects where object-based isolated construct comes. T1: Delete(B) isolated {A, B, C}; T2: Delete(C) isolated {B, C, D}; T3: Delete(E) isolated {D, E, F}.
>
> Object-based Isolated construct: isolated(Object participant1, () -> <body>); ... isolated(Object[] participants, () -> <body>); Allows for finer-grained control of critical sections. Two isolated constructs that have an empty intersection of participant objects do not interfere. When nesting (still redundant), the inner isolated participant object set has to be a subset of the outer one. Deadlock guarantee still applies; implementation makes sure the objects are acquired in a global order; object-based isolated construct is not semantically the same as per-object locking. Standard isolated is equivalent to "isolated(*)" by default i.e., isolation across all objects. Related concept: Java Synchronized blocks and methods.
>
> DoublyLinkedListNode with Object-Based Isolation: void delete() { isolated(this.prev, this, this.next, () -> { this.prev.next = this.next; this.next.prev = this.prev; }); ... }
>
> Pros and Cons of Object-Based Isolation. Pros: Increases parallelism relative to critical section approach; Simpler approach than "locks"; Deadlock-freedom property is still guaranteed. Cons: Programmer needs to worry about getting the participant objects right; Participant objects can only be specified at start of the isolated construct; Large participant object arrays can contribute to large overheads.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: مشكلة Global isolation، مثال الحذف الثلاثي، الصيغ الأربع، تطبيق DoublyLinkedListNode، جدول Pros/Cons.
- ℹ️ إضافة من الدليل: تشبيه غرف الاجتماعات، وتفعيل الفهم عن T4.

</details>

---

### 4. أنماط تطبيقية: Compare-and-Set و Work-Sharing
<!-- @render: {type: "code-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3", group: "4.1-4.2"} -->

#### 📍 أين نحن الآن؟
هالمجموعة (4.1 → 4.2) بتقدّم نمطين تطبيقيين جاهزين يستخدمو `isolated`: `Compare-and-Set Pattern` (لحل مشكلة `Spanning Tree`) و `Work-Sharing Pattern` (لتوزيع شغل بأمان بين خيوط متعددة).

#### ⬅️ الربط مع السابق
بعد ما فهمنا `Object-based Isolation` كأداة أساسية، هالمجموعة رح توريك كيف تُستخدم عملياً بمسألتين حقيقيتين: بناء شجرة ممتدة، وتوزيع عناصر مصفوفة على خيوط.

#### 💡 الفكرة الأساسية
**`Compare-and-Set Pattern` بيستخدم `isolated` للتحقق من شرط (`check`) وتعديل حالة (`set`) بخطوة ذرية واحدة — لمنع خيطين من "الفوز" بنفس المورد بالخطأ.**

---

#### 💻 الكود
```java
// المسألة: لعقدة undirected graph، أوجد شجرة ممتدة واحدة (Spanning Tree)
// (بافتراض كل الحواف بنفس التكلفة)

// النسخة التسلسلية (بدون تزامن)
spanning_tree(v) {
    for each neighbor c of v
        r = check_not_visited(v, c);
        if (r):
            Spanning_tree(v);
}

check_not_visited(v, c) {
    if (c.parent == null):
        { c.parent = v;
          return true; }
    return false;
}
```

```java
// النسخة المتوازية باستخدام Thread + Isolated (Compare-and-Set)
spanning_tree(v) {
    for each neighbor c of v
        r = check_not_visited(v, c);
        if (r):
            Thread { Spanning_tree(v); }
}

check_not_visited(v, c) {
    isolated (c) {
        if (c.parent == null):
            { c.parent = v;
              return true; }
        return false;
    }
}
```

#### شرح الكود سطراً بسطر
1. `for each neighbor c of v`: نمرّ على كل جار للعقدة الحالية `v`.
2. `r = check_not_visited(v, c)`: نتحقق (ونحاول نحجز) الجار `c` — هاي هي عملية `Compare-and-Set`: **قارن** (`c.parent == null؟`) ثم **اضبط** (`c.parent = v`).
3. `Thread { Spanning_tree(v); }`: لو نجح الحجز، نطلق خيط جديد يكمل بناء الشجرة من الجار.
4. `isolated (c)`: بنحمي العملية بأكملها (فحص + تعديل) على الكائن `c` بالذات — بحيث ما فيه خيطين يقدرو "يحجزو" نفس الجار بنفس الوقت.
5. `c.parent = v; return true;`: لو `c` لسا بلا أب، نعيّن `v` كأب له وننجح بالحجز.
6. `return false;`: لو `c` عنده أب مسبقاً (خيط تاني سبقنا)، نفشل بالحجز.

#### 📖 الشرح
لماذا نحتاج `isolated (c)` هون بالذات؟ لأنه بدونها، ممكن خيطين يفحصو `c.parent == null` **بنفس اللحظة** (كلاهما يشوفها `null`)، وبعدين كلاهما يعيّن نفسه كأب لها — فتصير `c` عندها أبوين متضاربين، وتنكسر بنية الشجرة! بتغليف الفحص والتعديل سوا جوا `isolated (c)`، بنضمن إنه خيط واحد بس يقدر "يفوز" بحجز `c`، والباقي رح ياخدو `false`.

هاد النمط بالتحديد — فحص شرط ثم تعديل بخطوة ذرية واحدة — اسمه **`Compare-and-Set Pattern`**، وهو نمط أساسي جداً بالبرمجة المتزامنة (رح نشوفه لاحقاً بصيغة جاهزة عبر `AtomicInteger.compareAndSet()`).

#### 🎯 الملخص السريع
- `Compare-and-Set Pattern`: فحص شرط + تعديل حالة، سوا جوا `isolated` واحدة.
- استخدام `Object-based isolated (c)` هون بيحدد الجار `c` بس كمشارك — فكل جيران مختلفين يقدرو يتنافسو أو يُحجزو بالتوازي بدون تعارض مع جيران غيرهم.
- بدون `isolated`، ممكن يصير `Data Race` على `c.parent` ويتكسر بنية الشجرة.

#### 📚 التطبيق
هاد النمط أساس أدوات أعلى مستوى زي `compareAndSet` بكلاس `AtomicInteger` اللي رح نشوفه بالقسم الجاي.

---

*(وبعد ما فهمنا Compare-and-Set، جاي دورنا نشوف نمط Work-Sharing اللي بيستخدم نفس فكرة العزل لتوزيع الشغل.)*

#### 💻 الكود (Work-Sharing Pattern)
```java
String[] X = ...; int numTasks = ...; int j;
int[] taskId = new int[X.length];

finish(() -> {
    for (int i = 0; i < numTasks; i++)
        async(() -> {
            do {
                j = j + 1;
                // check if at end of X
                if (j >= X.length) break;
                taskId[j] = i; // Task i processes string X[j]
                // ...
            } while (true);
        });
}); // finish-for-async
```

#### شرح الكود سطراً بسطر
1. `int[] taskId = new int[X.length]`: مصفوفة بتسجل أي مهمة (`task`) عالجت أي عنصر من `X`.
2. `finish(() -> {...})`: بننتظر كل المهام (`tasks`) لحد ما تخلص جميعها.
3. `for (int i = 0; i < numTasks; i++) async(() -> {...})`: نطلق `numTasks` من الخيوط الموازية، كل وحدة بتاخد رقم `i`.
4. `j = j + 1`: كل مهمة بتحاول تاخد "الدور" الجاي `j` من المصفوفة المشتركة — **بس هون فيه مشكلة!** المتغير `j` مشترك بين كل المهام، وزيادته (`j = j + 1`) عملية غير ذرية (`read` ثم `write`) — يعني عرضة لـ `Data Race` تماماً متل `counter++`.
5. `if (j >= X.length) break`: لو خلصنا كل عناصر `X`، نوقف.
6. `taskId[j] = i`: المهمة `i` بتعالج العنصر رقم `j`.

#### 📖 الشرح
هاد النمط اسمه **`Work-Sharing Pattern`**: بدل ما نوزّع الشغل مسبقاً (`statically`) على كل مهمة بشكل ثابت، كل مهمة بتاخد "الدور الجاي" من عداد مشترك `j` بشكل ديناميكي (`dynamically`) لحد ما تخلص كل العناصر. هيك، لو مهمة اشتغلت أسرع من غيرها، بتاخد أدوار أكتر تلقائياً — توازن حمل (`load balancing`) طبيعي.

**بس المشكلة:** الكود المعروض هيك زي ما هو **غير آمن للتزامن** — العملية `j = j + 1` مش ذرية، فممكن مهمتين ياخدو نفس القيمة `j` بنفس الوقت ويعالجو نفس العنصر مرتين (أو يفوّتو عنصر). الحل الصحيح: نحيط `j = j + 1` بـ `isolated` (أو نستخدم أداة ذرية جاهزة زي `AtomicInteger` اللي رح نشوفها بالقسم الجاي مباشرة).

#### 🤔 تفعيل الفهم
شو الفرق بالضبط بين مشكلة `j = j + 1` هون ومشكلة `FamilyBalance` بمثال البنك بأول المحاضرة؟ فكّر قبل ما تكمل — الجواب: **نفس المشكلة تماماً من ناحية المبدأ** — كلاهما عملية `read-modify-write` غير ذرية على متغير مشترك، بس هون التطبيق مختلف (توزيع شغل بدل تحويل أموال).

#### 🎯 الملخص السريع
- `Work-Sharing Pattern`: توزيع ديناميكي للشغل عبر عداد مشترك `j`.
- كل مهمة بتاخد "الدور الجاي" وتزيد العداد، بدل تخصيص ثابت مسبق.
- الكود الأساسي غير آمن (`j = j + 1` مش ذرية) — لازم حماية.
- الحل: إما `isolated` أو أداة ذرية جاهزة (`AtomicInteger`).

#### 📚 التطبيق
بالقسم الجاي رح نشوف بالضبط كيف نحل مشكلة `j = j + 1` عبر `AtomicInteger.getAndAdd()`، وهي أداة جاهزة بلغة Java بتغنينا عن كتابة `isolated` يدوياً بكل حالات العدادات.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Spanning Tree for Undirected Graph: For one undirected graph, there are more than one possible spanning tree. Assume that all the edges with the same cost, so we need to find one spanning tree. spanning_tree(v){...} check_not_visited(v,c){...} — with Thread{} wrapping Spanning_tree(v) and Isolated(c){} wrapping check_not_visited, labeled "Compare and Set Pattern".
>
> Work-Sharing Pattern: String[] X = ...; int numTasks = ...; int j; int[] taskId = new int[X.length]; finish(() -> { for (int i=0; i<numTasks; i++) async(() -> { do { j = j + 1; // check if at end of X; if (j >= X.length) break; taskId[j] = i; // Task i processes string X[j] } while (true); }); }); // finish-for-async

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كود Spanning Tree التسلسلي والمتوازي، نمط Compare-and-Set، نمط Work-Sharing بكل أسطره.
- ℹ️ إضافة من الدليل: توضيح مشكلة عدم الذرية بـ j=j+1 وربطها بمثال البنك.

</details>

---

### 5. المتغيرات الذرية وعزل القراءة/الكتابة (Atomic Variables & Read/Write Isolation)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4", group: "5.1-5.2"} -->

#### 📍 أين نحن الآن؟
هالمجموعة الأخيرة (5.1 → 5.2) بتقدّم أداة جاهزة بلغة Java (`AtomicInteger`) بتغني عن `isolated` اليدوية بحالات العدادات، وبعدين بتقدّم تحسين إضافي (`Read/Write Isolation`) لزيادة التوازي أكتر.

#### ⬅️ الربط مع السابق
حللنا بالقسم السابق مشكلة `j = j + 1` بنمط `Work-Sharing`، وقلنا فيه حل جاهز — هون رح نشوفه بالتفصيل: `AtomicInteger`.

#### 💡 الفكرة الأساسية
**`java.util.concurrent.atomic.AtomicInteger` كلاس جاهز بلغة Java بيوفّر عمليات ذرية (atomic) على عدد صحيح — كل عملية إلها مكافئ مباشر بصيغة `isolated`.**

---

#### 💻 الكود
```java
import java.util.concurrent.atomic.AtomicInteger;

// المُنشئات (Constructors)
AtomicInteger v1 = new AtomicInteger();      // يبدأ بالقيمة 0
AtomicInteger v2 = new AtomicInteger(100);   // يبدأ بالقيمة 100

// أهم الدوال
int j1 = v1.addAndGet(5);   // يضيف 5 للقيمة الحالية ويرجّع القيمة الجديدة
int j2 = v1.getAndAdd(5);   // يرجّع القيمة الحالية، وبعدين يضيف 5
```

#### شرح الكود سطراً بسطر
1. `new AtomicInteger()`: ينشئ متغير عدد صحيح ذري بقيمة ابتدائية `0`.
2. `new AtomicInteger(100)`: ينشئ متغير ذري بقيمة ابتدائية مخصصة (100).
3. `addAndGet(delta)`: **بشكل ذري** (كخطوة واحدة ما فيها تداخل)، بيضيف `delta` للقيمة الحالية، وبيرجّع القيمة **الجديدة**.
4. `getAndAdd(delta)`: **بشكل ذري**، بيرجّع القيمة **الحالية** (القديمة)، وبعدين يضيف `delta` للقيمة.

#### 📖 الشرح
كل دالة بكلاس `AtomicInteger` إلها مكافئ منطقي (`pseudocode`) بصيغة `isolated` كتالي:

| دالة `j.u.c.atomic` | المكافئ بصيغة `isolated` |
| --- | --- |
| `int j = v.get();` | `int j; isolated (v) j = v.val;` |
| `v.set(newVal);` | `isolated (v) v.val = newVal;` |
| `int j = v.getAndSet(newVal);` | `int j; isolated (v) { j = v.val; v.val = newVal; }` |
| `int j = v.addAndGet(delta);` | `isolated (v) { v.val += delta; j = v.val; }` |
| `int j = v.getAndAdd(delta);` | `isolated (v) { j = v.val; v.val += delta; }` |
| `boolean b = v.compareAndSet(expect, update);` | `boolean b; isolated (v) if (v.val == expect) {v.val = update; b = true;} else b = false;` |

لاحظ إنه `v` بهاد الجدول بتشير لكائن `AtomicInteger` بالعمود الثاني، وبتشير لكائن Java عادي (غير ذري) بالعمود الثالث، و `val` بتمثل حقل من نوع `int` جوا الكائن. يعني — **كل عملية `AtomicInteger` هي فعلياً `isolated (v) {...}` جاهزة وسريعة، مبرمجة داخلياً بلغة Java بدون ما تضطر تكتبها يدوياً.**

المصطلح `compareAndSet` هون هو نفسه مبدأ **`Compare-and-Set Pattern`** اللي شفناه بالقسم السابق مع `Spanning Tree` — بس هلق بصيغة جاهزة وذرية بكلاس `AtomicInteger`، بدل ما نكتب `isolated` يدوياً.

**تطبيق على مشكلة `Work-Sharing` السابقة** — الحل الصحيح والآمن:
```java
import java.util.concurrent.atomic.AtomicInteger;

String[] X = ...; int numTasks = ...; int j;
int[] taskId = new int[X.length];
AtomicInteger a = new AtomicInteger();

finish(() -> {
    for (int i = 0; i < numTasks; i++)
        async(() -> {
            do {
                j = a.getAndAdd(1);
                // can also use a.getAndIncrement()
                if (j >= X.length) break;
                taskId[j] = i; // Task i processes string X[j]
                // ...
            } while (true);
        });
}); // finish-for-async
```
بدّلنا `j = j + 1` (غير آمنة) بـ `j = a.getAndAdd(1)` (ذرية وآمنة تماماً) — وحلّت المشكلة بدون ما نكتب `isolated` يدوياً بالمرة! ملاحظة: نفس الوظيفة ممكن تُنفَّذ عبر `a.getAndIncrement()` (دالة مختصة لزيادة واحد بس).

#### 🎯 الملخص السريع
- `AtomicInteger`: كلاس بلغة Java بيوفّر عمليات ذرية جاهزة على عدد صحيح.
- كل دالة (`get`, `set`, `getAndSet`, `addAndGet`, `getAndAdd`, `compareAndSet`) إلها مكافئ `isolated (v) {...}` منطقياً.
- `compareAndSet` هو نفس مبدأ `Compare-and-Set Pattern` اللي شفناه بمثال `Spanning Tree`، بس جاهز.
- حل مشكلة `Work-Sharing`: استبدال `j = j + 1` بـ `j = a.getAndAdd(1)`.
- نفس المفهوم موجود لـ `LongInteger` (أعداد أكبر).

#### 📚 التطبيق
`AtomicInteger` هو تحسين لأداء `isolated` بحالة خاصة (عدد صحيح واحد). القسم الجاي (`Read/Write Isolation`) بيقدّم تحسين مختلف بيشتغل على أي بنية بيانات، عبر التمييز بين عمليات القراءة والكتابة.

---

*(وبعد ما فهمنا AtomicInteger كتحسين لعداد واحد، جاي دورنا نشوف Read/Write Isolation كتحسين أشمل لأي بنية بيانات.)*

#### 💻 الكود (Read/Write Isolation)
```java
// Hash Map h بعمليتين: GET و PUT
// V value = h.GET(K);
// h.PUT(K, V);

// سيناريو تنفيذ محتمل بالتزامن:
// T1: h.GET(K1), h.GET(K3), h.GET(K5)
// T2: h.GET(K1), h.GET(K2), h.GET(K6)
// T3: h.PUT(K0, V0)

// الحل الأدق: بدل isolated (h) العادي
isolated(READ(h))  { /* عمليات القراءة على h */ }
isolated(WRITE(h)) { /* عمليات الكتابة على h */ }
```

```java
// مثال آخر: عملية DELETE بالقائمة المزدوجة، بصيغة Read/Write
// Isolated(READ(this)), Isolated(WRITE(this.prev)), Isolated(WRITE(this.next))
```

#### 📖 الشرح
**`Read/Write Isolation`** هو **تحسين (refinement)** فوق `Object-based isolation` اللي تعلمناها بالقسم 3. الفكرة: مو كل وصول لمورد مشترك متساوي بالخطورة — **عمليات القراءة (`READ`) المتعددة بنفس الوقت لا تسبب `Data Race` أبداً بينها وبين بعض** (لأنه ما فيه تعديل)، والخطر الحقيقي بس لما تتزامن **كتابة (`WRITE`)** مع قراءة أو كتابة تانية.

بمثال `HashMap`: عندنا ثلاث مهام، `T1` و `T2` بس بيعملو `GET` (قراءة)، و `T3` بس بيعمل `PUT` (كتابة). لو استخدمنا `isolated(h)` العادي (الشامل)، فحتى `T1` و `T2` (اللي كلاهما بس بيقرأ، ومفيش أي خطر بينهم) رح يتنافسو ع نفس القفل بدون داعي، وهاد بيقلل التوازي بلا مبرر حقيقي! 

الحل: نقسم العزل لنوعين:
- **`isolated(READ(h))`:** بيسمح لعدة عمليات قراءة تُنفَّذ **بالتوازي مع بعضها** — لأنه ما فيه خطر تضارب بين قراءتين.
- **`isolated(WRITE(h))`:** بيضمن `Mutual Exclusion` الكاملة — عملية كتابة واحدة بس بأي لحظة، وما بتسمح بأي قراءة أو كتابة تانية بنفس الوقت.

بمثال `Doubly Linked List` (عملية `DELETE`)، نفس المبدأ بينطبق بدقة أكبر: `Isolated(READ(this))` لقراءة الحالة الحالية، و `Isolated(WRITE(this.prev))` و `Isolated(WRITE(this.next))` منفصلتين لعمليات التعديل الفعلية على الجيران — وهيك بنوصل لأعلى درجة توازي ممكنة بدون التضحية بالسلامة.

#### 🤔 تفعيل الفهم
لو عندنا `T4: h.GET(K1)` و `T5: h.PUT(K1, V1)` بنفس اللحظة، هل يقدرو ينفذو بالتوازي تحت `Read/Write Isolation`؟ فكّر قبل ما تكمل — الجواب: **لأ**، لأنه `T5` عملية كتابة (`WRITE`)، وأي كتابة لازم تكون بمعزل تام عن أي قراءة أو كتابة تانية — يعني `T4` لازم تستنى لحد ما تخلص `T5` (أو العكس).

#### 🎯 الملخص السريع
- `Read/Write Isolation`: تحسين فوق `Object-based Isolation`.
- عدة عمليات `READ` تقدر تُنفَّذ بالتوازي مع بعضها البعض بأمان تام.
- عملية `WRITE` وحيدة لازم تكون بمعزل كامل عن أي `READ` أو `WRITE` تانية.
- مثال `HashMap`: `isolated(READ(h))` للقراءات، `isolated(WRITE(h))` للكتابة.
- مثال `Doubly Linked List`: فصل `READ(this)` عن `WRITE(this.prev)` و `WRITE(this.next)`.

#### 📚 التطبيق
هاد المفهوم — التمييز بين القراءة والكتابة لزيادة التوازي — هو حجر الأساس لبنى البيانات المتزامنة (`Concurrent Data Structures`) اللي رح نشوفها بالمحاضرة الجاية، زي `Concurrent HashMap` و `Read-Write Locks`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> java.util.concurrent.atomic.AtomicInteger: Constructors — new AtomicInteger() creates a new AtomicInteger with initial value 0; new AtomicInteger(int initialValue) creates one with the given initial value. Selected methods — int addAndGet(int delta): atomically adds delta to the current value and returns the new value; int getAndAdd(int delta): atomically returns the current value and adds delta to the current value. Similar interfaces available for LongInteger.
>
> java.util.concurrent.AtomicInteger Methods and their Equivalent Isolated Constructs (pseudocode): table mapping get/set/getAndSet/addAndGet/getAndAdd/compareAndSet to isolated(v) equivalents.
>
> Work-Sharing Pattern using AtomicInteger: import java.util.concurrent.atomic.AtomicInteger; ... AtomicInteger a = new AtomicInteger(); finish(() -> { for (...) async(() -> { do { j = a.getAndAdd(1); // can also use a.getAndIncrement() if (j >= X.length) break; taskId[j] = i; ... } while(true); }); });
>
> Read/Write Isolation: It is a refinement of object-based isolation. Suppose we have a hash map structure h with two operations: GET: V h.GET(K), PUT: h.PUT(K,V). Possible concurrent execution scenario: T1: h.GET(K1), h.GET(K3), h.GET(K5). T2: h.GET(K1), h.GET(K2), h.GET(K6). T3: h.PUT(K0,V0). One possible solution is to isolate over h, but?? To allow more parallelism: we can use isolated(READ(h)), isolated(WRITE(h)). Another example: Doubly Linked List – DELETE operation: Isolated(READ(this)), Isolated(WRITE(this.pre)), Isolated(Write(this.next)),

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كلاس AtomicInteger ودواله، جدول المكافئات، تطبيق Work-Sharing، Read/Write Isolation بمثالي HashMap والقائمة المزدوجة.
- ℹ️ إضافة من الدليل: تفعيل الفهم عن T4/T5.

</details>

---

# ملخص شامل — Critical Sections and Isolation

خلّينا نرجع لنقطة البداية: ليش أصلاً كل هالموضوع مهم؟ لما عندك أكتر من خيط بيشتغلو بنفس الوقت وبيحاولو يوصلو لنفس البيانات، ممكن يصير تضارب — يعني خيط يقرأ قيمة قبل ما خيط تاني يخلّص تحديثها، فتضيع عملية كاملة بدون ما حدا يلاحظ. هاد بالضبط اللي شفناه بمثال تحويل الفلوس بين حساب الأب والعائلي والابن: لو الخيطين اشتغلو بترتيب معين (R2, R1, W2, W1)، بتضيع عملية سحب الابن بالكامل والنتيجة تطلع غلط بدون أي رسالة خطأ. هاي هي مشكلة `Data Race` رسمياً: خطوتين بلا علاقة اعتماد بينهم، بيوصلو لنفس الموقع، وواحدة منهم عالأقل كتابة.

بس ليش يهمك هالموضوع بالتحديد؟ لأنه أي كود متزامن (`concurrent`) بتكتبه بحياتك المهنية — سواء سيرفر ويب، تطبيق موبايل، أو حتى لعبة — رح يواجه بالضبط هالمشكلة أول ما يصير عندك أكتر من خيط. وبالامتحان، هاد الموضوع بيتقاطع كتير مع أسئلة عملية عن الكود — يعني لازم تقدر تحلل كود Java صغير وتقول "هاد آمن ولا لأ" وليش.

قبل ما نبلش، شو المفروض تكون فاهمه؟ لازم تكون مرتاح مع فكرة `Thread` كوحدة تنفيذ مستقلة، وفكرة إنه فيه `Locks` تقليدية بتستخدمها لحل هالمشكلة (شفناها بمحاضرة سابقة) — بس هالمحاضرة بتقدم بديل أفضل.

هلق ليش `Locks` اليدوية مش كافية؟ المشكلة إنه لو استخدمتها غلط — مثلاً خيط بياخد قفلين بترتيب معاكس لخيط تاني — ممكن توصل لـ `Deadlock`: الخيوط توقف كلياً وتستنى بعضها للأبد. هون بيجي الحل الأعلى مستوى: `Critical Section`، وأداته العملية اسمها `isolated construct`. فكّرها متل حمام عام بباب واحد — أي حدا لازم يستنى دوره. الصيغة بسيطة: `isolated(() -> { الكود الحساس })`، وأي خيطين بيستخدمو `isolated` بيتم تنفيذهم بترتيب متبادل تلقائياً. الميزة الكبرى هون: `isolated` **ما بيقدر يسبب `Deadlock` أبداً**، بعكس `Locks` اليدوية — وهاد الفرق أهم نقطة تحفظها بهالموضوع كله.

بس فيه قيود مهمة على `isolated`: ممنوع تحط جواها أي عملية "حاجزة" (`blocking`) زي `finish` أو `future.get()`، لأنها ممكن تعلّق التنفيذ. وإذا حطيت `isolated` جوا `isolated` تانية، هاي زايدة عن الحاجة لأنه الخارجية أصلاً بتحمي كل شي جواها.

لما طبّقنا `isolated` على مثال البنك، صار عندنا سيناريوهين بس مقبولين: إما الخيط الأول يكمل بالكامل ثم الثاني، أو العكس — مافي احتمال تضارب متوسط زي قبل.

طيب، إذا `Global isolated` بيحمي كل شي، شو المشكلة؟ المشكلة إنه بيضحّي بتوازي حقيقي. تخيل قائمة مزدوجة من ستة عناصر A لغاية F، وعندك ثلاث مهام بدها تحذف عناصر مختلفة تماماً — B، C، وE. لو استخدمت `isolated` الشامل، المهمة التالتة (حذف E) رح تستنى دورها حتى لو أصلاً بعيدة كل البعد عن B وC ومفيش أي تضارب فعلي بينهم! هون بيجي الحل: `Object-based Isolation` — بدل ما تقول "احمي كل شي"، تحدد بالضبط الكائنات المشاركة بكل عملية. حذف B بيحتاج حماية على {A,B,C}، حذف C بيحتاج {B,C,D}، وحذف E بيحتاج {D,E,F}. النتيجة: حذف B وحذف E — مجموعتاهم ما فيها أي كائن مشترك — يقدرو ينفذو بالتوازي الكامل! بس حذف B وحذف C فيهم كائنات مشتركة (B وC) فلازم يتناوبو. والمهم: هاد مش نفسه "قفل لكل كائن" العادي — التطبيق الداخلي بياخد الكائنات بترتيب عالمي موحّد، وهيك برضه بيضمن عدم `Deadlock` حتى مع تعدد الكائنات.

من هون منوصل لنمطين تطبيقيين عمليين جداً. الأول اسمه `Compare-and-Set Pattern`، وشفناه بمسألة بناء شجرة ممتدة (`Spanning Tree`) لعقدة. الفكرة: كل عقدة عندها فحص "هل أنا محجوزة؟" وتعديل "احجزني!" — ولازم الفحص والتعديل يصيرو سوا كخطوة ذرية واحدة جوا `isolated(c)` عالجار c بالذات، وإلا ممكن خيطين يفحصو بنفس اللحظة ويشوفو "لسا فاضية" وكلاهما يحجزها، فتنكسر بنية الشجرة. النمط التاني اسمه `Work-Sharing Pattern`: بدل ما توزّع الشغل ثابت مسبقاً على كل مهمة، كل مهمة بتاخد "الدور الجاي" من عداد مشترك `j` وتزيده. بس هون فيه فخ: `j = j + 1` نفسها عملية غير ذرية (قراءة ثم كتابة)، بالضبط متل مشكلة `FamilyBalance` بأول المحاضرة — لازم حماية.

هون بيجي الحل الجاهز: كلاس `AtomicInteger` من مكتبة Java القياسية. بدل ما تكتب `isolated` يدوياً لكل عملية عداد، عندك دوال جاهزة وذرية زي `getAndAdd(delta)` و `addAndGet(delta)` و `compareAndSet(expect, update)` — وكل وحدة منهم عندها مكافئ منطقي بصيغة `isolated(v) {...}` بالضبط متل ما شفنا بالجدول. وفعلاً، حل مشكلة `Work-Sharing`: بس بدّل `j = j + 1` بـ `j = a.getAndAdd(1)` وخلص الموضوع — بدون ما تكتب `isolated` بنفسك أبداً.

وآخر فكرة بهالمحاضرة اسمها `Read/Write Isolation`، وهي تحسين أشمل من `AtomicInteger` — بتنطبق على أي بنية بيانات مو بس عدد صحيح واحد. الملاحظة الذكية هون: مو كل وصول متساوي بالخطورة — عمليات القراءة المتعددة (`READ`) ما بتسبب أي تضارب فيما بينها، والخطر الحقيقي بس لما كتابة (`WRITE`) توصل لنفس الوقت مع قراءة أو كتابة تانية. فبدل ما نستخدم `isolated(h)` شامل على `HashMap` مثلاً، نستخدم `isolated(READ(h))` اللي بتسمح بعدة قراءات متزامنة، و `isolated(WRITE(h))` اللي بتفرض عزل كامل بس على الكتابة. نفس المبدأ ينطبق على عملية حذف بالقائمة المزدوجة: قراءة الحالة الحالية بمعزل `READ`، والتعديل الفعلي بمعزل `WRITE` منفصل.

بالنسبة للأخطاء الشائعة، أهم شي تنتبهله: `isolated` مش نفسه `lock` عادي — الفرق الحاسم إنه `isolated` بيضمن رياضياً عدم `Deadlock` مهما استخدمته، بينما `Lock` اليدوي ممكن يسبب `Deadlock` لو استخدمته غلط.

#### الفهم الخاطئ ❌:
كتير طلاب بيحسبو إنه كل عملية على متغير مشترك لازم تُغلَّف بـ `isolated` شامل، بدون ما يفرقو بين قراءة وكتابة.

#### الفهم الصحيح ✅:
الفرق الحاسم: العمليات اللي بتقرأ بس (`READ`) بين بعضها ما بتحتاج تناوب أبداً — التزامن الحقيقي المطلوب هو بس لما تدخل عملية **كتابة** بالصورة. استخدام `Read/Write Isolation` بدل `isolated` الشامل بيزيد التوازي بشكل كبير بدون أي تضحية بالسلامة.

بالنسبة للامتحان، الأستاذ بالغالب رح يركّز على: تحليل كود Java صغير وتحديد وين فيه `Data Race` (زي `counter++` أو `j = j + 1`)، الفرق بين `Global` و `Object-based isolated`، وليش `isolated` ما بيسبب `Deadlock` بعكس `Locks`، وتحويل عملية بسيطة (زي عداد) لصيغة `AtomicInteger` المكافئة.

بالنسبة للمحاضرة الجاية (`Concurrent Data Structures`)، رح تحتاج بالضبط هالمفاهيم — `Object-based Isolation` و `Read/Write Isolation` — كأساس لفهم كيف تُبنى بنى بيانات كاملة آمنة للتزامن، زي `Concurrent HashMap` أو `Concurrent Queue`، اللي بتستخدم بالضبط نفس المبادئ اللي تعلمناها هلق.

---

# الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium)
**السؤال:** بحسب التعريف الرسمي، متى تحدث `Data Race` على موقع `L`؟

أ) عندما يقرأ خيطان الموقع `L` بنفس الوقت فقط

ب) عندما توجد خطوتان `S1` و `S2` بلا علاقة اعتماد بينهما، وكلاهما يصل لـ `L`، وواحدة منهما على الأقل كتابة

ج) عندما ينفّذ خيطان `isolated construct` بنفس الوقت

د) عندما يستخدم البرنامج أكثر من `Thread` واحد بغض النظر عن البيانات

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): قراءتان بدون كتابة لا تُسبّبان `Data Race` أبداً، حتى لو تزامنتا
- ✅ ب): هذا هو التعريف الرسمي بالضبط — استقلالية الخطوتين (عدم وجود `dependence`) مع وصول لنفس الموقع وواحدة كتابة على الأقل
- ❌ ج): تنفيذ `isolated` بنفس الوقت مضمون بترتيب متبادل، فلا يسبب `Data Race`
- ❌ د): وجود أكثر من `Thread` لا يعني بالضرورة تضارب فعلي على بيانات مشتركة

---

### السؤال 2 (medium)
**السؤال:** ما الفرق الأساسي بين استخدام `isolated construct` واستخدام `Locks` تقليدية لتحقيق `Mutual Exclusion`؟

أ) `isolated` أبطأ دائماً من `Locks`

ب) `isolated` لا يمكنه حماية أكثر من متغير واحد بنفس الوقت

ج) `isolated` مضمون رياضياً بعدم التسبب بـ `Deadlock`، بينما `Locks` قد تسبب `Deadlock` إذا استُخدمت بترتيب خاطئ

د) `Locks` لا تحتاج إلى `Thread` أصلاً للعمل

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): السرعة تعتمد على التنفيذ الداخلي، والمحاضرة لا تنص على أن `isolated` أبطأ دائماً
- ❌ ب): يمكن لـ `isolated` حماية عدة كائنات عبر `Object-based Isolation`
- ✅ ج): هذا الفرق الجوهري المذكور صراحة — `isolated constructs can never cause a deadlock`، بعكس `Locks` عند سوء الاستخدام
- ❌ د): `Locks` أداة لإدارة تزامن `Threads`، وتُستخدم معها لا بدونها

---

### السؤال 3 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
// Thread A                         // Thread B
FamilyBalance = FamilyBalance + 100;   FamilyBalance = FamilyBalance - 100;
```
إذا نُفّذ الخيطان بنفس الوقت **بدون** `isolated`، أي من التالي يصف سلوك الكود تحديداً؟

أ) الكود سيتوقف تماماً بسبب `Deadlock`

ب) قد تُفقد إحدى العمليتين بسبب `Data Race` على `FamilyBalance` نتيجة تداخل القراءة والكتابة

ج) النتيجة ستكون صحيحة دائماً لأن `FamilyBalance` متغير من نوع `int`

د) سيرمي الكود استثناءً (`Exception`) فوراً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا يوجد انتظار متبادل بين الخيطين، فهما يكملان التنفيذ عادياً — هذا ليس `Deadlock`
- ✅ ب): كل عملية `+= 100` أو `-= 100` هي `read` ثم `write` غير ذرية؛ لو تداخلت القراءتان قبل أي كتابة، تُفقد إحدى العمليتين بالضبط كما حدث بسيناريو `R2,R1,W2,W1` بالمحاضرة
- ❌ ج): نوع البيانات لا علاقة له بالذرية؛ `int` عادي معرّض لنفس المشكلة
- ❌ د): لا يوجد استثناء هنا، فقط نتيجة رقمية غير صحيحة

---

### السؤال 4 (medium)
**السؤال:** ما القيد الإلزامي المتعلق باستخدام العمليات الحاجزة (`blocking operations`) داخل `isolated construct`؟

أ) يمكن استخدام `finish` و `future.get()` بحرية داخل `isolated`

ب) `isolated constructs` يجب ألا تحتوي على أي عملية موازية حاجزة مثل `finish`، `future get`، أو `next`

ج) يُسمح فقط بعملية `finish` وليس `future.get()`

د) لا يوجد أي قيد على نوع العمليات داخل `isolated`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هذا مخالف تماماً لما ورد بالمحاضرة — العمليات الحاجزة ممنوعة تماماً
- ✅ ب): نص المحاضرة صريح: `Blocking parallel constructs are forbidden inside isolated constructs`، وذُكرت أمثلة `finish, future get, next`
- ❌ ج): كلاهما ممنوع بدون استثناء
- ❌ د): يوجد قيد واضح ومحدد بهذا الخصوص

---

### السؤال 5 (hard) — حسابي
**السؤال:** برنامج تسلسلي عنده `Work = 24` (مجموع وقت تنفيذ كل العمليات لو نُفّذت تسلسلياً)، و `Span (CPL) = 6` (أطول مسار حرج). إذا شغّلناه على `P = 4` معالجات، ما أقرب قيمة لأقصى `Speedup` ممكن تحقيقه؟

أ) 4

ب) 6

ج) 8

د) 24

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): أقصى `Speedup` فعلياً على `P` معالجات = `Work / max(Span, Work/P)`؛ هنا `Work/P = 24/4 = 6`، و`max(Span, Work/P) = max(6, 6) = 6`؛ إذن `Speedup = 24/6 = 4`
- ❌ ب): هذا يساوي `Span` نفسه وليس `Speedup` — خطأ بالخلط بين المفهومين
- ❌ ج): رقم غير ناتج عن أي صيغة صحيحة بهذه المعطيات — فخ حسابي شائع (ربما ناتج قسمة خاطئة)
- ❌ د): هذا يساوي `Work` الكلي بدون أي تقسيم على المعالجات — تجاهل كامل لأثر التوازي

---

### السؤال 6 (medium)
**السؤال:** بمثال شجرة القائمة المزدوجة `A->B->C->D->E->F` مع مهام `T1: Delete(B)` و `T3: Delete(E)`، ما سبب إمكانية تنفيذهما بالتوازي الكامل تحت `Object-based Isolation`؟

أ) لأنهما ينتميان لخيطين مختلفين تماماً

ب) لأن مجموعتي الكائنات المشاركة إلهما ({A,B,C} و {D,E,F}) لا تحتويان على أي كائن مشترك (`empty intersection`)

ج) لأن `isolated` لا يطبَّق أصلاً على عمليات الحذف

د) لأن `T1` أسرع من `T3` دائماً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): مجرد كونهما على خيطين مختلفين لا يضمن التوازي بدون خاصية عدم التقاطع
- ✅ ب): المحاضرة تنص: `Two isolated constructs that have an empty intersection of participant objects do not interfere` — وهذا بالضبط حال {A,B,C} و {D,E,F}
- ❌ ج): `isolated` يُطبّق فعلياً على عمليات الحذف كما بمثال `DoublyLinkedListNode`
- ❌ د): السرعة النسبية لا علاقة لها بإمكانية التوازي هنا

---

### السؤال 7 (hard)
**السؤال:** أي من التالي يصف بدقة الفرق بين `Object-based isolated construct` و `per-object locking` التقليدي؟

أ) هما نفس المفهوم بالضبط ولا يوجد فرق

ب) `Object-based isolated` لا يضمن `Mutual Exclusion` بينما `per-object locking` يضمنها

ج) `Object-based isolated` يحجز الكائنات المشاركة بترتيب عالمي موحّد يضمن عدم `Deadlock`، وهذا غير مضمون بالضرورة في `per-object locking` التقليدي

د) `per-object locking` أسرع دائماً من `Object-based isolated`

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): المحاضرة تنص صراحة: `Object-based isolated construct is not semantically the same as per-object locking`
- ❌ ب): كلاهما يهدف لتحقيق `Mutual Exclusion`؛ الفرق ليس بالضمان الأساسي بل بآلية تجنب `Deadlock`
- ✅ ج): النص يوضح إن التطبيق الداخلي `makes sure the objects are acquired in a global order`، وهذا ما يحافظ على `deadlock-freedom` حتى مع تعدد الكائنات
- ❌ د): لا توجد مقارنة أداء مطلقة كهذه بالمحاضرة

---

### السؤال 8 (hard) — سيناريو كود
**السؤال:** بالكود التالي لبناء شجرة ممتدة:
```java
check_not_visited(v, c) {
    isolated (c) {
        if (c.parent == null):
            { c.parent = v;
              return true; }
        return false;
    }
}
```
لو حذفنا `isolated (c)` وتركنا الجسم مكشوفاً، أي من التالي يصف المشكلة المحتملة تحديداً؟

أ) البرنامج سيرمي استثناءً فوراً عند التشغيل

ب) خيطان قد يفحصان `c.parent == null` بنفس اللحظة ويعيّن كلاهما نفسه أباً لـ `c`، فتفسد بنية الشجرة

ج) البرنامج سيدخل بـ `Deadlock` فوراً

د) لا فرق فعلياً، لأن `check_not_visited` تُستدعى مرة واحدة فقط لكل عقدة

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا يوجد سبب لرمي استثناء؛ المشكلة منطقية وليست تقنية
- ✅ ب): هذا بالضبط ما يحل مشكلته `isolated (c)` — بدونه، الفحص والتعديل غير ذريين، فيمكن لخيطين "الفوز" بنفس العقدة معاً
- ❌ ج): لا يوجد انتظار متبادل هنا؛ المشكلة `Data Race` وليست `Deadlock`
- ❌ د): بدون حماية، `check_not_visited` قد تُستدعى من عدة خيوط بنفس الوقت على نفس `c` (من جيران مختلفين)

---

### السؤال 9 (medium)
**السؤال:** بنمط `Work-Sharing Pattern`، ما الغرض الأساسي من استخدام عداد مشترك `j` يُزاد بكل مهمة؟

أ) لضمان تنفيذ كل مهمة بترتيب ثابت مسبقاً

ب) لتوزيع العناصر ديناميكياً بين المهام حسب من يطلب "الدور الجاي" أولاً، مما يحقق توازن حمل طبيعي

ج) لمنع أي مهمة من معالجة أكثر من عنصر واحد

د) لضمان عدم استخدام `finish` أو `async` بالكود

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): على العكس، الفكرة أن الترتيب ديناميكي وليس ثابتاً مسبقاً
- ✅ ب): هذا هو جوهر `Work-Sharing`: عداد مشترك يوزّع العمل حسب توفر المهام، فالمهمة الأسرع تأخذ عناصر أكثر تلقائياً
- ❌ ج): لا يوجد هذا القيد؛ كل مهمة تكرر الحلقة `do-while` وتأخذ عناصر متعددة
- ❌ د): الكود المعروض يستخدم `finish` و `async` أصلاً بشكل أساسي

---

### السؤال 10 (hard) — حسابي
**السؤال:** إذا كان `Ideal Parallelism = Work / Span`، وبرنامج ما عنده `Work = 30` و `Span = 3`، ما القيمة القصوى النظرية لـ `Ideal Parallelism`؟

أ) 3

ب) 9

ج) 10

د) 27

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): هذا يساوي `Span` وليس `Ideal Parallelism`
- ❌ ب): رقم غير ناتج عن قسمة `30/3` — فخ حسابي شائع (ربما جمع بدل قسمة بشكل خاطئ)
- ✅ ج): مباشرة من الصيغة: `Ideal Parallelism = Work / Span = 30 / 3 = 10`
- ❌ د): هذا ناتج عن `Work - Span` وليس القسمة المطلوبة

---

### السؤال 11 (medium)
**السؤال:** ما مكافئ `isolated construct` المنطقي لعملية `int j = v.getAndAdd(delta);` على كائن `AtomicInteger`؟

أ) `isolated (v) { v.val += delta; j = v.val; }`

ب) `isolated (v) { j = v.val; v.val += delta; }`

ج) `isolated (v) j = v.val;`

د) لا يوجد مكافئ لهذه العملية بصيغة `isolated`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هذا هو مكافئ `addAndGet` (يرجّع القيمة **بعد** الإضافة)، وليس `getAndAdd`
- ✅ ب): `getAndAdd` يرجّع القيمة **الحالية أولاً** (`j = v.val`) ثم يضيف `delta` — بالضبط ما يوضحه الجدول بالمحاضرة
- ❌ ج): هذا مكافئ `v.get()` فقط، بدون أي إضافة
- ❌ د): يوجد مكافئ واضح موثّق بجدول المحاضرة

---

### السؤال 12 (hard) — سيناريو كود
**السؤال:** بالكود التالي لتوزيع عمل بين مهام متعددة:
```java
j = j + 1;
if (j >= X.length) break;
taskId[j] = i;
```
أي من التالي هو التعديل الصحيح والآمن لهذا الكود باستخدام `AtomicInteger`؟

أ) استبدال `j = j + 1;` بـ `j = a.getAndAdd(1);`

ب) استبدال السطر الثاني `if (j >= X.length)` بـ `isolated` فقط

ج) حذف السطر `j = j + 1;` بالكامل دون بديل

د) إحاطة `taskId[j] = i;` فقط بـ `isolated` دون التعرض لـ `j = j + 1`

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): هذا بالضبط الحل المذكور بالمحاضرة — استبدال العملية غير الذرية `j = j + 1` بالعملية الذرية `a.getAndAdd(1)` يحل مشكلة `Data Race` على `j`
- ❌ ب): المشكلة الحقيقية بزيادة `j` نفسها، وليس بشرط المقارنة
- ❌ ج): بدون زيادة `j` بشكل ما، الحلقة لن تتقدم أبداً عبر عناصر `X`
- ❌ د): حماية `taskId[j] = i;` فقط لا تحل مشكلة تضارب القراءة/الكتابة على `j` نفسها، وهي أصل المشكلة

---

### السؤال 13 (medium)
**السؤال:** بمثال `HashMap` مع عمليتي `GET` و `PUT`، لماذا يُفضَّل استخدام `isolated(READ(h))` و `isolated(WRITE(h))` منفصلتين بدل `isolated(h)` الشامل؟

أ) لأن `isolated(h)` الشامل غير مسموح أصلاً بلغة Java

ب) لأن عمليات `GET` (القراءة) المتعددة لا تسبب أي تضارب فيما بينها، فحصرها بعزل قراءة منفصل يسمح بتنفيذها بالتوازي ويزيد الأداء

ج) لأن `PUT` لا يحتاج أي حماية إطلاقاً

د) لأنهما يمنعان استخدام `isolated` بالكامل من الكود

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `isolated(h)` مذكور كخيار ممكن بالمحاضرة، فقط غير الأمثل
- ✅ ب): جوهر `Read/Write Isolation`: القراءات لا تتعارض فيما بينها، فعزلها بمعزل خاص يسمح بتوازٍ كامل بينها، بينما تبقى الكتابة محمية بعزل تام
- ❌ ج): `PUT` تحتاج عزلاً كاملاً (`isolated(WRITE(h))`) لأنها تعديل مباشر
- ❌ د): على العكس، هما صيغتان من نفس `isolated construct`

---

### السؤال 14 (hard)
**السؤال:** ما الفرق الحاسم بين `Data Race` و `Deadlock` من ناحية سلوك البرنامج الناتج؟

أ) لا فرق، كلاهما يعني توقف البرنامج فوراً

ب) `Data Race` يجعل الكود يكمل التنفيذ لكن بنتيجة غير صحيحة، بينما `Deadlock` يوقف الكود بالكامل نتيجة انتظار متبادل بلا نهاية

ج) `Deadlock` فقط يصير مع الأنظمة الموزعة (`Distributed Systems`)

د) `Data Race` يصير فقط عند استخدام `Locks`، بينما `Deadlock` يصير فقط عند استخدام `isolated`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `Data Race` لا يوقف البرنامج؛ ينتج فقط قيمة نهائية غير صحيحة
- ✅ ب): هذا هو معيار التمييز الحاسم بينهما — الأول خطأ بالنتيجة مع استمرار التنفيذ، والثاني توقف كامل بلا تقدم
- ❌ ج): `Deadlock` يمكن أن يحدث بأي نظام متزامن، محلي أو موزّع
- ❌ د): `Data Race` قد يحدث بدون أي أداة تزامن أصلاً (وهذا سبب حدوثه)، و`Deadlock` مرتبط بـ `Locks` غالباً وليس بـ `isolated`

---

### السؤال 15 (medium)
**السؤال:** بترقيم كائنات `Object-based Isolation`، ما الشرط الذي يمنع خيطين من التنافس على الدخول؟

أ) أن يكونا على نفس الخيط الفيزيائي

ب) أن تكون مجموعتا الكائنات المشاركة لهما متطابقتين تماماً

ج) أن يكون تقاطع مجموعتي الكائنات المشاركة لهما فارغاً (`empty intersection`)

د) أن يستخدما نفس اسم المتغير بالكود

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): مفهوم `Object-based Isolation` أصلاً مخصص لخيوط منفصلة تتشارك بيانات
- ❌ ب): تطابق المجموعتين يعني تداخلاً كاملاً، وبالتالي تنافساً كاملاً وليس العكس
- ✅ ج): هذا بالضبط الشرط المذكور صراحة بالمحاضرة لعدم التداخل بين `isolated constructs`
- ❌ د): اسم المتغير بالكود لا علاقة له بالكائن الفعلي المشترك بالذاكرة

---

### السؤال 16 (hard) — حسابي
**السؤال:** برنامج عنده `Work = 40`. إذا شُغِّل على معالج واحد فقط (`P = 1`) بدون أي توازي، ما قيمة `Speedup` الناتجة بالضرورة؟

أ) 0

ب) 1

ج) 40

د) غير معروفة بدون معرفة `Span`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `Speedup` لا يمكن أن يكون صفراً؛ هذا يعني عدم تنفيذ البرنامج إطلاقاً
- ✅ ب): بتعريف `Speedup(P) = T_serial / T_parallel(P)`؛ عند `P=1` فإن `T_parallel(1) = T_serial` بالضرورة (نفس التنفيذ التسلسلي)، إذن `Speedup(1) = 1` دائماً بغض النظر عن قيم `Work` أو `Span`
- ❌ ج): هذا يساوي `Work` نفسه وليس `Speedup`؛ خلط بين المفهومين
- ❌ د): عند `P=1` تحديداً، القيمة معروفة دائماً وتساوي 1 بغض النظر عن `Span`، لأن التنفيذ يصبح تسلسلياً بحكم التعريف

---

# الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)
```java
// محاولة حماية عملية حذف بالقائمة المزدوجة
void delete() {
    isolated(this, () -> {   // نسي المبرمج this.prev و this.next!
        this.prev.next = this.next;
        this.next.prev = this.prev;
    });
}
```
**الخطأ:** الكود يحدد `this` بس كمشارك بـ `isolated`، لكن العملية فعلياً بتلمس وبتعدّل `this.prev` و `this.next` كمان (`this.prev.next = ...` و `this.next.prev = ...`) — فهاي الكائنات غير محمية، وممكن يصير `Data Race` عليهم لو حاول خيط تاني (بيحذف عقدة مجاورة) يعدّلهم بنفس الوقت.

**التصحيح:**
```java
void delete() {
    isolated(this.prev, this, this.next, () -> {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    });
}
```

---

### سؤال تصحيح 2 (misconception)
```java
// محاولة منع Deadlock باستخدام Locks بدل isolated
lock1.acquire();
lock2.acquire();
// ... كود حساس يستخدم موردين
lock2.release();
lock1.release();
// المبرمج واثق إن هذا "بديل مكافئ تماماً" لـ isolated من ناحية ضمان عدم Deadlock
```
**الخطأ:** هذا مفهوم خاطئ (misconception): استخدام `Locks` بترتيب معين هنا **لا يضمن** عدم `Deadlock` بشكل عام — لو خيط تاني بالبرنامج ياخد `lock2` ثم `lock1` بترتيب معاكس، ممكن تصير `Deadlock` كلاسيكية (كل خيط مستني القفل اللي عند التاني). هاد بعكس `isolated` اللي بيضمن رياضياً عدم `Deadlock` بغض النظر عن ترتيب الاستخدام.

**التصحيح:** استبدال منطق `Locks` اليدوي بـ `isolated construct` (شامل أو `Object-based`)، اللي بيضمن الحماية بدون خطر `Deadlock` مهما كان ترتيب الاستدعاء بأجزاء البرنامج الأخرى:
```java
isolated(resource1, resource2, () -> {
    // ... كود حساس يستخدم موردين
});
```

---

### سؤال تصحيح 3 (return_check)
```java
// محاولة تطبيق Compare-and-Set لحجز عقدة بالشجرة
check_not_visited(v, c) {
    isolated (c) {
        if (c.parent == null):
            { c.parent = v; }   // نسي return true هون!
        return false;           // بترجع false دائماً حتى لو نجح الحجز!
    }
}
```
**الخطأ:** الكود ما بيتحقق من قيمة الإرجاع (`return`) بشكل صحيح — بحالة النجاح (`c.parent == null`)، الكود بيعيّن `c.parent = v` بس **ما بيرجّع `true`**، فبيوصل مباشرة لـ `return false;` بآخر الدالة — يعني الدالة بترجع `false` **دائماً** حتى لو الحجز نجح فعلياً! هاد بيكسر منطق `spanning_tree(v)` اللي بيعتمد على القيمة المرجعة لقرار إطلاق `Thread` جديد.

**التصحيح:**
```java
check_not_visited(v, c) {
    isolated (c) {
        if (c.parent == null):
            { c.parent = v;
              return true; }
        return false;
    }
}
```

---

### سؤال تصحيح 4 (dead_code)
```java
void delete() {
    isolated(this.prev, this, this.next, () -> {
        this.prev.next = this.next;
        this.next.prev = this.prev;
        return; // كود ميت — العبارات اللي بعدها ما رح تنفذ أبداً
        System.out.println("Deleted node " + this); // Dead Code!
    });
}
```
**الخطأ:** السطر `System.out.println(...)` كود ميت (`dead code`) — موجود بعد `return;` مباشرة جوا نفس الكتلة (`block`)، فما رح يُنفَّذ أبداً بأي حالة. هاد نوع من الأخطاء البرمجية اللي ممكن تفوت على المبرمج وتوهمه إنه في تسجيل (`logging`) بيصير فعلياً بينما هو مش شغال.

**التصحيح:**
```java
void delete() {
    isolated(this.prev, this, this.next, () -> {
        this.prev.next = this.next;
        this.next.prev = this.prev;
        System.out.println("Deleted node " + this); // انقل السطر قبل return أو احذف return الزائدة
    });
}
```

---

### سؤال تصحيح 5 (logic)
```java
// محاولة استخدام Work-Sharing بدون حماية العداد المشترك
finish(() -> {
    for (int i = 0; i < numTasks; i++)
        async(() -> {
            do {
                isolated(() -> { j = j + 1; });  // خطأ! isolated جوا async بس بدون فحص الشرط معها
                if (j >= X.length) break;         // الفحص هون خارج isolated — ما بيحمي القرار كامل
                taskId[j] = i;
            } while (true);
        });
});
```
**الخطأ:** خطأ منطقي دقيق: `isolated` بتحمي بس عملية `j = j + 1;`، لكن الفحص `if (j >= X.length)` بعدها **برّا** الـ `isolated` — يعني فيه فجوة زمنية بين الزيادة والفحص ممكن خيط تاني يزيد `j` فيها كمان، فيصير سلوك غير متسق (رغم إنه هون تحديداً الفحص لقيمة واحدة نسبياً غير حرج، بس **الأسلوب الأصح** حسب المحاضرة استخدام أداة ذرية جاهزة `getAndAdd` بدل `isolated` اليدوية لعملية بهذه البساطة).

**التصحيح:**
```java
finish(() -> {
    for (int i = 0; i < numTasks; i++)
        async(() -> {
            do {
                j = a.getAndAdd(1); // AtomicInteger — ذرية بالكامل، بدون فجوة
                if (j >= X.length) break;
                taskId[j] = i;
            } while (true);
        });
});
```

---

# الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

## القواعد الذهبية

| # | القاعدة |
| --- | --- |
| 1 | `Data Race` بتصير لما خطوتين مستقلتين بيوصلو لنفس الموقع، وواحدة منهم على الأقل كتابة |
| 2 | `isolated(() -> {...})` = `Critical Section` عملية، وبتضمن `Mutual Exclusion` بين زوج `isolated`-`isolated` فقط |
| 3 | `isolated` **لا يمكنه أبداً** التسبب بـ `Deadlock` — هذا أهم فرق عن `Locks` اليدوية |
| 4 | ممنوع تماماً استخدام عمليات حاجزة (`finish`, `future.get()`, `next`) داخل `isolated` |
| 5 | `Object-based isolated(o1, o2, ...)` بيحدد الكائنات المشاركة بالضبط، ويزيد التوازي مقارنة بالعزل الشامل |
| 6 | كائنات `isolated` تُحجز بترتيب عالمي موحّد داخلياً — لهذا `deadlock-freedom` مضمونة حتى مع تعدد الكائنات |
| 7 | `Compare-and-Set Pattern`: فحص شرط + تعديل حالة بخطوة ذرية واحدة جوا `isolated` |
| 8 | `AtomicInteger` بيوفّر عمليات ذرية جاهزة (`get`, `set`, `addAndGet`, `getAndAdd`, `compareAndSet`) بدون كتابة `isolated` يدوياً |
| 9 | `Read/Write Isolation`: عدة قراءات (`READ`) تتنفذ بالتوازي بأمان، وأي كتابة (`WRITE`) لازم تكون بعزل كامل |
| 10 | `Global isolated` semantically بيعادل `global lock` — يحمي كل شي بدون تمييز |

## مرجع سريع للمصطلحات والصيغ

| المصطلح | التعريف بسطر |
| --- | --- |
| `Critical Section` | كود بيوصل مورد مشترك، ممنوع دخوله أكتر من خيط بنفس الوقت |
| `isolated(() -> <body>)` | الصيغة العامة للعزل الشامل (`Global`) |
| `isolated(o1, o2, ..., () -> <body>)` | صيغة `Object-based Isolation` — تحديد كائنات مشاركة معيّنة |
| `isolated(*)` | مكافئ للعزل الشامل الافتراضي (كل الكائنات) |
| `isolated(READ(h))` / `isolated(WRITE(h))` | عزل مخصص للقراءة (متوازٍ) والكتابة (حصري) |
| `Bounded Waiting` | ضمان إنه الخيط المنتظر لدخول `Critical Section` لن ينتظر أكثر من وقت محدد |
| `Monitor Concurrency Pattern` | اسم آخر لمفهوم `Critical Section` |
| `Compare-and-Set Pattern` | فحص شرط + تعديل حالة كخطوة ذرية واحدة |
| `Work-Sharing Pattern` | توزيع ديناميكي للعمل عبر عداد مشترك يُزاد بكل مهمة |
| `AtomicInteger.getAndAdd(delta)` | يرجّع القيمة القديمة، ثم يضيف `delta` (ذرياً) |
| `AtomicInteger.addAndGet(delta)` | يضيف `delta`، ثم يرجّع القيمة الجديدة (ذرياً) |
| `AtomicInteger.compareAndSet(expect, update)` | يعدّل القيمة فقط لو كانت تساوي `expect`، بشكل ذري |
| `Empty Intersection` | تقاطع فارغ بين مجموعتي كائنات مشاركة → لا تداخل، توازٍ كامل |

---

# الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** شو الفرق الأساسي بين `Critical Section` و `Data Race`؟
**A:** `Data Race` هي المشكلة (تضارب وصول بدون حماية)، بينما `Critical Section` هي الحل (منطقة كود محمية بضمان `Mutual Exclusion`).

### البطاقة 2
**Q2:** ليش `isolated construct` ما بيقدر يسبب `Deadlock` أبداً؟
**A:** لأنه مصمم رياضياً بحيث يضمن `deadlock-freedom` (والتطبيق الداخلي بياخد الكائنات المشتركة بترتيب عالمي موحّد بحالة `Object-based`)، بعكس `Locks` اليدوية اللي ممكن تسبب `Deadlock` لو استُخدمت بترتيب متعارض.

### البطاقة 3
**Q3:** شو معنى `isolated(*)`؟
**A:** هي الصيغة الافتراضية للعزل الشامل (`Global isolation`) — تعادل الحماية عبر كل الكائنات بالبرنامج، أي مكافئة لـ `global lock`.

### البطاقة 4
**Q4:** شو المشكلة لو استخدمنا `Global isolated` بدل `Object-based Isolation` بمثال حذف عقد بقائمة مزدوجة؟
**A:** كل عمليات الحذف رح تُنفَّذ بالتسلسل واحدة ورا الثانية، حتى لو ما فيه أي تضارب فعلي بين بعضها (زي حذف عقد بعيدة عن بعض) — وهاد بيضحّي بتوازي حقيقي وممكن بلا داعي.

### البطاقة 5
**Q5:** كيف نحدد الكائنات المشاركة الصحيحة بعملية `delete()` بقائمة مزدوجة؟
**A:** لازم نحدد كل الكائنات اللي بيتم قراءتها أو تعديلها فعلياً بجسم العملية — بمثال الحذف: `this.prev`, `this`, و `this.next`، لأن الكود بيعدّل `this.prev.next` و `this.next.prev`.

### البطاقة 6
**Q6:** ما الفرق بين `Object-based isolated construct` و `per-object locking` التقليدي؟
**A:** كلاهما بيحمي بمستوى الكائن، بس `Object-based isolated` بيحجز الكائنات بترتيب عالمي موحّد داخلياً بما يضمن عدم `Deadlock` حتى مع تعدد الكائنات، وهاد ضمان غير مؤكد بـ `per-object locking` العادي لو استُخدم غلط.

### البطاقة 7
**Q7:** شو نمط `Compare-and-Set Pattern`؟
**A:** نمط بيغلّف فحص شرط (`compare`) وتعديل حالة (`set`) بخطوة ذرية واحدة جوا `isolated`، عشان يمنع خيطين من "الفوز" بنفس المورد بالخطأ.

### البطاقة 8
**Q8:** ليش `j = j + 1` بمثال `Work-Sharing` غير آمنة للتزامن؟
**A:** لأنها عملية `read-modify-write` غير ذرية — قراءة القيمة الحالية ثم كتابة الجديدة عمليتان منفصلتان، وممكن يتداخلو بين خيطين مختلفين ويصير `Data Race`، بالضبط متل مشكلة `counter++`.

### البطاقة 9
**Q9:** شو الحل الجاهز لمشكلة `j = j + 1` غير الآمنة؟
**A:** استبدالها بـ `j = a.getAndAdd(1)` (أو `a.getAndIncrement()`) باستخدام `AtomicInteger`، وهي عملية ذرية جاهزة بدون الحاجة لكتابة `isolated` يدوياً.

### البطاقة 10
**Q10:** شو الفرق بين `getAndAdd(delta)` و `addAndGet(delta)` بكلاس `AtomicInteger`؟
**A:** `getAndAdd` بترجّع القيمة **القديمة** قبل الإضافة، بينما `addAndGet` بترجّع القيمة **الجديدة** بعد الإضافة — كلاهما ذري بالكامل.

### البطاقة 11
**Q11:** شو مبدأ `Read/Write Isolation`؟
**A:** تحسين فوق `Object-based Isolation` بيميّز بين عمليات القراءة (`READ`) اللي تقدر تتنفذ بالتوازي مع بعضها بأمان، وعمليات الكتابة (`WRITE`) اللي لازم تكون بعزل كامل عن أي قراءة أو كتابة تانية.

### البطاقة 12
**Q12:** بمثال `HashMap` مع `GET` و `PUT`، ليش `isolated(READ(h))` أفضل من `isolated(h)` الشامل؟
**A:** لأنه بيسمح بتنفيذ كل عمليات `GET` بالتوازي فيما بينها (بما إنه ما فيه خطر تضارب بين قراءتين)، بينما `isolated(h)` الشامل بيفرض تنافس حتى بين عمليتي قراءة، وهاد بيقلل التوازي بلا داعي.

### البطاقة 13
**Q13:** شو معنى `Bounded Waiting` بتعريف `Critical Section`؟
**A:** ضمان إنه أي خيط بده يدخل `Critical Section` رح يستنى وقت محدد (`fixed time`)، مو يستنى للأبد.

### البطاقة 14
**Q14:** ليش ممنوع استخدام `finish` داخل `isolated construct`؟
**A:** لأنها عملية حاجزة (`blocking`)، وممكن تعلّق تنفيذ `isolated` وتكسر ضمانات السلامة والأداء المرتبطة فيها — القيد ينطبق على أي عملية موازية حاجزة (`finish`, `future get`, `next`).

---

*(انتهى الدليل — راجع ورقة المراجعة السريعة قبل الامتحان مباشرة، وحل أسئلة الـ MCQ بدون النظر للإجابات أولاً لاختبار فهمك الحقيقي.)*

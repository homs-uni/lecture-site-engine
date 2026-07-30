# المحاضرة 9 — قياس البرمجيات: المفاهيم والمقاييس

> **المادة:** هندسة البرمجيات | **الموضوع:** Software Measurement — المقاييس وتقنيات القياس

---

## الجزء الأول: ملخص شامل (لكل من تعب أو ما يركز)

> **هذا الملخص الشامل كامل كافي — لو قرأت هذا بس، انت خلصت. ما تحتاج المحاضرة أو التفاصيل.**

### The Big Idea

قياس البرمجيات (`software measurement`) هو محاولتنا نحوّل خصائص البرنامج لأرقام — عشان نقدر نتوقع التكلفة، نكتشف المشاكل قبل ما تحصل، ونقيّم الجودة بطريقة موضوعية.

### ليش هذا مهم؟

في الواقع ما تقدر تقول "هذا الكود جيد" أو "هذا المشروع بيتأخر" بدون أرقام. المقاييس تحوّل الحكم الشخصي لقرار مبني على بيانات. لو شغلت في شركة برمجيات بكرة، المدير بيسألك: "قديش بيكلّف هذا المشروع؟ وقديش وقته؟" — الإجابة جاية من `function points` وأدوات القياس اللي في هذه المحاضرة.

### المتطلبات السابقة

- فهم أساسي لبنية البرامج (variables، functions، classes)
- أساسيات Object-Oriented Programming (للتعامل مع `depth of inheritance tree`)
- فهم مبدأ `cyclomatic complexity` من دروس الجودة السابقة

---

### الآن: اشرح الموضوع بالكامل

هنا الحاجة الأساسية اللي لازم تفهمها: نحن عادةً عايزين نعرف أشياء خارجية عن البرنامج — زي "هل يسهل نعدّله؟" أو "هل موثوق؟" — لكن ما نقدر نقيسها مباشرة. اللي نقدر نقيسه هي أشياء داخلية (`internal attributes`) زي عدد الأسطر وتعقيد الكود. فـ`metrics` هي جسر بين الاثنين.

**الأنواع الرئيسية للمقاييس:**

هناك تقسيمان مهمان: الأول هو `control metrics` مقابل `predictor metrics`. الـ`control metrics` (أو `process metrics`) تساعد في إدارة المشروع — زي "كم ساعة يستغرق إصلاح bug؟". أما الـ`predictor metrics` (أو `product metrics`) فمرتبطة بالبرنامج نفسه — زي `LOC` (lines of code) و`cyclomatic complexity`.

التقسيم الثاني هو `static metrics` مقابل `dynamic metrics`. الـ`static` تُقاس من الكود بدون تشغيله — زي حجم الكود، `cyclomatic complexity`. الـ`dynamic` تُقاس أثناء التشغيل أو بعد النشر — زي عدد تقارير الأخطاء وسرعة تنفيذ الحسابات. الفرق العملي: لو عايز تعرف "هل البرنامج سريع؟" ← `dynamic`. لو عايز "هل الكود سهل يُفهم؟" ← `static`.

**Fan-in / Fan-out:**

`fan-in` هو كم method تستدعي هذه الـ`method`. `fan-out` هو كم `method` تستدعيها هذه الـ`method`. لو الـ`fan-out` عالي جداً — يعني الـ`method` تعتمد على كتير من الأجزاء الثانية — هذا مشكلة، لأن أي تغيير في أي جزء ممكن يكسرها.

**طول المعرّفات (`length of identifiers`):**

كلما كانت أسماء المتغيرات والدوال أطول، كلما كانت أوضح. `x` مو وضاح. `totalOrderPrice` واضح. هذا مقياس بسيط لكن مرتبط فعلاً بكيف يسهل فهم الكود.

**Function Points — الأهم في المحاضرة:**

الـ`function points` اخترعها Alan Albrecht في IBM سنة 1979 وصارت معيار ISO سنة 2003. الفكرة: بدل ما نقيس جهد التطوير بأسطر الكود (اللي تختلف من لغة للثانية)، نقيسه بـ "وش البرنامج يعمل؟" — كم `input screen`، كم `report`، كم قاعدة بيانات، كم نظام خارجي يتكامل معه.

الحسبة: كل مكوّن (مثل `external input` أو `logical internal file`) يأخذ نقاط حسب تعقيده (Low=7، Average=10، High=15 للـ`logical files`). التعقيد يتحدد من عدد الـ`RETs` (Repeatable Element Types — subgroups) وعدد الـ`DETs` (Data Element Types — الحقول). تجمع كل النقاط ← هذا هو `function point count` ← منه تشتق التكلفة والوقت والفريق.

**Halstead Metric:**

قديمة (1977) لكن مهمة. الفكرة: البرنامج مجموعة من الرموز (`tokens`) — إما `operators` (=، while، +، print، الأقواس...) أو `operands` (المتغيرات والثوابت). تحسب:
- `n1` = عدد الـ`operators` الفريدة
- `n2` = عدد الـ`operands` الفريدة
- `N` = مجموع كل الـ`operators` والـ`operands`

من هذه الأرقام تستخرج `Volume` (حجم البرنامج)، `Difficulty` (صعوبة الفهم)، وتقدير الوقت الفعلي اللازم للكود.

---

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
كتير طلاب يعتقدون إن `static metrics` تعني مقاييس ثابتة ومو مهمة. في حين إن `dynamic metrics` هي الأهم لأنها تقيس البرنامج وهو يشتغل.

#### الفهم الصحيح ✅:
`static` و`dynamic` يصفان *متى* تُجمع البيانات — مو أيها أهم. الـ`static` تُجمع من الكود مباشرة (بدون تشغيل) وتقيّم complexity والـmaintainability. الـ`dynamic` تُجمع أثناء التشغيل وتقيّم الكفاءة والموثوقية. كلاهما مهم لأغراض مختلفة.

---

#### الفهم الخاطئ ❌:
"الـ`function points` بتحسب أسطر الكود بطريقة ثانية."

#### الفهم الصحيح ✅:
الـ`function points` مستقلة تماماً عن لغة البرمجة وأسطر الكود. هي تقيس *الوظائف* اللي يؤديها البرنامج من منظور المستخدم — مش كيف نُفِّذت. لهذا ممكن تحسب الـ`FP` قبل ما تكتب سطر كود واحد، فقط من المتطلبات.

---

#### الفهم الخاطئ ❌:
في مثال Halstead، كتير يحسبون `while` كـ`operand` لأنه "اسم".

#### الفهم الصحيح ✅:
`while` هو `operator` — هو keyword يؤدي عملية (التكرار). الـ`operands` هي القيم والمتغيرات (`z`, `x`, `0`, `y`, `1`). كل الـ`keywords`، علامات الترقيم، والمعاملات الحسابية هي `operators`.

---

### الفروقات المهمة

- الفرق بين `internal attributes` و`external attributes`: الـ`internal` تقدر تقيسها مباشرة (LOC، CC). الـ`external` هي ما يريد المستخدم فعلاً (موثوقية، قابلية صيانة) — لكن نُقدّرها من الـ`internal`.
- الفرق بين `control metrics` و`predictor metrics`: `control` للعمليات والإدارة، `predictor` للمنتج نفسه.

### أمثلة تطبيقية

- **حساب FP لنظام إبلاغ عن bugs:** نظام يسمح للعملاء بإبلاغ bugs، تُخزّن في ملف، المطورون يحصلون على تقرير يومي، العملاء يحصلون على تحديث يومي، الإدارة تستعلم عن ملخصات. النتيجة: external inputs=1, logical internal files=1, external outputs=2, external inquiries=1.
- **Halstead على برنامج بسيط:** الكود المثال في المحاضرة أعطى n1=8، n2=5، N=25.

### الاتصالات مع مواضيع أخرى

- **ما قبله:** Software Quality — فهم ما هي الجودة يسبق محاولة قياسها.
- **الجاي بعده:** Cost Estimation وProject Planning — تستخدم `function points` كأداة تقدير رئيسية.

### الملخص

- **قياس البرمجيات:** جسر بين ما نقدر نقيسه (internal) وما نريده (external quality).
- **Function Points:** أفضل أداة لتقدير التكلفة بشكل مستقل عن التقنية.
- **Halstead:** طريقة لتحويل الكود لأرقام تعبّر عن الحجم والصعوبة والوقت.

### لما تحتاج هذا في الامتحان

توقع أسئلة تطبيقية: احسب الـ`N` لكود معطى، أو حدد عدد الـ`FP` لنظام موصوف. أسئلة مقارنة: ما الفرق بين `static` و`dynamic`؟ بين `control` و`predictor`؟ وأسئلة نظرية عن من اخترع `function points` وما هو هدفه.

---

## الجزء الثاني: الشرح التفصيلي

### 1. افتراضات المقاييس (Metrics Assumptions)

<!-- @render: {type: "diagram-first", visualization: "mapping", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "مفاهيم جودة البرمجيات"} -->

#### 📍 أين نحن الآن؟
نبدأ المحاضرة بالسؤال الأساسي: ليش نقيس؟ وما علاقة ما نقيسه بما نريد معرفته؟

#### ⬅️ الربط مع السابق
في محاضرات الجودة تعلمنا إن هناك صفات نريدها في البرنامج (موثوقية، قابلية صيانة). الآن السؤال: كيف نقيّمها موضوعياً؟

#### 💡 الفكرة الأساسية
**نستطيع قياس `internal attributes` (كود) فقط، لكن ما يهمنا فعلاً هو `external attributes` (سلوك) — فنبني افتراضاً بأن الاثنين مترابطان.**

---

#### 📊 المخطط: ربط الصفات الخارجية بالداخلية

#### ما هذا المخطط؟
> يوضّح كيف تتصل `external quality attributes` (ما يريده المستخدم) بالـ`internal attributes` (ما نستطيع قياسه في الكود).

#### وصف العُقد:

| # | العُقدة | النوع | الشرح |
|---|---------|-------|-------|
| 1 | Maintainability | external attribute | سهولة تعديل البرنامج |
| 2 | Reliability | external attribute | موثوقية عمل البرنامج |
| 3 | Reusability | external attribute | إمكانية إعادة الاستخدام |
| 4 | Usability | external attribute | سهولة الاستخدام |
| 5 | Depth of Inheritance Tree | internal attribute | عمق تسلسل الوراثة في OOP |
| 6 | Cyclomatic Complexity | internal attribute | عدد المسارات المنطقية في الكود |
| 7 | Program Size in LOC | internal attribute | عدد أسطر الكود |
| 8 | Number of Error Messages | internal attribute | عدد رسائل الخطأ |
| 9 | Length of User Manual | internal attribute | طول دليل المستخدم |

#### وصف الروابط:

| من | إلى | الشرح |
|----|-----|-------|
| Maintainability | Depth of Inheritance Tree | شجرة وراثة أعمق = صعوبة صيانة أكبر |
| Maintainability | Cyclomatic Complexity | تعقيد أعلى = صيانة أصعب |
| Reliability | Cyclomatic Complexity | كود معقد = أكثر عرضة للأخطاء |
| Usability | Number of Error Messages | رسائل خطأ واضحة = استخدام أسهل |
| Usability | Length of User Manual | دليل أطول يؤثر على سهولة الاستخدام |

#### 📖 الشرح

لو سألك مدير: "هل هذا البرنامج يسهل صيانته؟" — لا تستطيع قياس `maintainability` مباشرة. لكن تستطيع قياس `cyclomatic complexity` وعمق `inheritance tree`. لو كانت هذه الأرقام مرتفعة، فمن المرجح إن البرنامج صعب الصيانة. هذا هو الافتراض الأساسي في كل قياس البرمجيات.

#### 💡 التشبيه:
> قياس حرارتك لمعرفة وضعك الصحي — لا تستطيع قياس "الصحة" مباشرة، لكن درجة الحرارة تُعطيك مؤشراً موثوقاً.
> **وجه الشبه:** درجة الحرارة = `internal attribute`، الصحة = `external attribute`.

#### 🎯 الملخص السريع
- نقيس `internal attributes` لأنها قابلة للقياس المباشر
- نستنتج `external attributes` من العلاقة بينهما
- العلاقة هي افتراض — قد لا تكون مثالية دائماً

#### 📚 التطبيق
هذا الفهم ضروري لكل ما يلي: كل مقياس سنتعلمه (`LOC`, `CC`, `FP`, `Halstead`) هو `internal attribute` يُستخدم للاستدلال على `external quality`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
"المقاييس الداخلية تعبّر تعبيراً دقيقاً عن الجودة الخارجية — لو `CC` منخفض، إذن البرنامج موثوق."

#### الفهم الصحيح ✅:
هناك *علاقة* بين الداخلي والخارجي، لكنها ليست تامة. `CC` منخفض يزيد *احتمال* الموثوقية، لكنه لا يضمنها. المقاييس مؤشرات، ليست حكماً نهائياً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "The relationship exists between what we can measure and what we want to know. We can only measure internal attributes but are often more interested in external software attributes."

**ملاحظة على التغطية:**
- ✓ تم شرح: الافتراض الأساسي + المخطط + العلاقة بين internal وexternal
- ℹ️ إضافة من الدليل: تشبيه درجة الحرارة (ليس في المحاضرة الأصلية)

</details>

---

### 2. تصنيف المقاييس

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

### 2.1. مقاييس التحكم مقابل مقاييس التنبؤ

#### 📍 أين نحن الآن؟
بعد أن فهمنا لماذا نقيس، الآن نُصنّف المقاييس حسب هدفها.

#### ⬅️ الربط مع السابق
رأينا إن القياس هو جسر بين الداخلي والخارجي. هنا نُحدد: لمن هذا الجسر؟ لمدير المشروع أم للمطور؟

#### 💡 الفكرة الأساسية
**`control metrics` تدعم إدارة العملية (process)، و`predictor metrics` ترتبط بالمنتج (product) نفسه.**

---

#### 📖 الشرح

**`Control Metrics` (مقاييس التحكم / مقاييس العملية):**
هذه تساعد مديري المشاريع. مثال: متوسط الوقت اللازم لإصلاح `defect`، أو متوسط الجهد لتنفيذ feature. هذه المقاييس تجيب على: "كيف تسير العملية؟ هل نحن على المسار الصحيح؟"

**`Predictor Metrics` (مقاييس التنبؤ / مقاييس المنتج):**
هذه مرتبطة بالبرنامج ذاته. تشمل `internal attributes` مثل `LOC` (Lines of Code) و`CC` (Cyclomatic Complexity). تُجيب على: "ما طبيعة هذا الكود؟ هل سيكون سهل الصيانة؟"

#### 💡 التشبيه:
> في المستشفى: `control metrics` = متوسط وقت انتظار المريض (يقيس أداء المستشفى). `predictor metrics` = نتائج فحوصات المريض (تصف حالة المريض نفسه).
> **وجه الشبه:** المستشفى = المشروع، المريض = البرنامج.

#### 🎯 الملخص السريع
- `control / process metrics` → لإدارة المشروع
- `predictor / product metrics` → لتوصيف البرنامج
- كلاهما "قياس" لكن لأهداف مختلفة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Control or Process metrics: Support process management. Ex. Avg. effort, time required to repair defects.
> Predictor or product metrics: Associated with the software itself. Internal attributes: LOC, CC...

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + الأمثلة + الفرق بين الاثنين
- ℹ️ إضافة من الدليل: تشبيه المستشفى

</details>

---

### 2.2. المقاييس الديناميكية مقابل الساكنة

#### 📍 أين نحن الآن؟
تصنيف ثانٍ للمقاييس — هذه المرة حسب *متى* تُجمع البيانات.

#### ⬅️ الربط مع السابق
عرفنا إن `predictor metrics` مرتبطة بالمنتج. الآن نُحدد: هل نقيس الكود قبل تشغيله أم بعده؟

#### 💡 الفكرة الأساسية
**`dynamic metrics` تُجمع أثناء التشغيل أو بعده (كفاءة وموثوقية)، و`static metrics` تُجمع من كود البرنامج مباشرة (تعقيد وقابلية الصيانة).**

---

#### 📖 الشرح

**`Dynamic Metrics`:**
تُجمع أثناء تشغيل البرنامج، أو في التجربة، أو بعد النشر. أمثلة: عدد تقارير الأخطاء من المستخدمين، الوقت اللازم لإتمام عملية حسابية. هذه تقيّم كفاءة البرنامج وموثوقيته الفعلية.

**`Static Metrics`:**
تُجمع من "تمثيلات النظام" — أي من الكود نفسه أو الوثائق. أمثلة: حجم الكود (`code size`)، الـ`cyclomatic complexity`. هذه تقيّم مدى تعقيد الكود وسهولة فهمه وصيانته — *قبل* أن يُشغَّل.

#### ⚖️ المقايضة: Static vs Dynamic

| | `Static Metrics` | `Dynamic Metrics` |
|---|---|---|
| **متى تُجمع** | من الكود مباشرة (بدون تشغيل) | أثناء أو بعد التشغيل |
| **ما تقيّمه** | التعقيد، قابلية الفهم، الصيانة | الكفاءة، الموثوقية |
| **مثال** | LOC، Cyclomatic Complexity | عدد bug reports، وقت التنفيذ |
| **متى تستخدمه** | في مراحل التطوير المبكرة | في التجربة والنشر |

#### 🎯 الملخص السريع
- `static` = تقرأ الكود ← تقيّم البنية
- `dynamic` = تشغّل البرنامج ← تقيّم السلوك
- يكمّلان بعضهما — لا يلغي أحدهما الآخر

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Dynamic metrics: Collected during a program execution, system testing, or after the system has gone into use. Ex. #bug reports, time taken to complete a computation.
> Static metrics: Collected during the representations of the system. Ex. Code size, CC.

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + الأمثلة + جدول المقارنة
- ℹ️ إضافة من الدليل: جدول المقايضة التفصيلي

</details>

---

### 3. المقاييس الساكنة الشائعة

### 3.1. Fan-in / Fan-out

<!-- @render: {type: "diagram-first", visualization: "graph", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_2.2"} -->

#### 📍 أين نحن الآن؟
ننتقل من التصنيف النظري إلى مقاييس محددة. هذا أول مقياس `static` نفصّله.

#### ⬅️ الربط مع السابق
`static metrics` تقيّم البنية. `Fan-in/Fan-out` هو مقياس بنيوي يصف مدى اعتماد `method` على غيرها ومدى اعتماد غيرها عليها.

#### 💡 الفكرة الأساسية
**`fan-in` = كم `method` تستدعي هذه الـ`method`. `fan-out` = كم `method` تستدعيها هذه الـ`method`. `fan-out` عالٍ يعني اعتماد زائد وخطر انهيار متسلسل.**

---

#### 📊 المخطط: Fan-in / Fan-out

#### ما هذا المخطط؟
> يوضّح الفكرة البصرية: السهام الزرقاء الداخلة = `fan-in`، السهام الحمراء الخارجة = `fan-out`.

#### وصف العُقد:

| # | العُقدة | النوع | الشرح |
|---|---------|-------|-------|
| 1 | "A method" | method محورية | الـ`method` التي نقيسها |
| 2-4 | Methods calling (أزرق) | callers | تستدعي الـ`method` المحورية |
| 5-7 | Methods called (أحمر) | callees | تستدعيها الـ`method` المحورية |

#### وصف الروابط:

| من | إلى | الشرح |
|----|-----|-------|
| Methods الخارجية | A method | `fan-in` = 3 (ثلاثة `methods` تستدعيها) |
| A method | Methods الداخلية | `fan-out` = 3 (تستدعي ثلاثة `methods`) |

#### 📖 الشرح

تخيّل `method` في البرنامج. الـ`fan-in` يخبرك كم مكان في البرنامج يعتمد عليها — لو كان كبيراً، تغييرها سيؤثر على كثير من الأماكن. الـ`fan-out` يخبرك كم `method` أخرى تحتاجها لتعمل — لو كان كبيراً، أي خلل في أي منها قد يوقفها.

`fan-out` عالٍ = مؤشر خطر. يعني الـ`method` "تعرف أكثر مما يجب" عن بقية النظام — هذا يخالف مبدأ `separation of concerns`.

#### 💡 التشبيه:
> مدير يُشرف على 15 موظفاً مباشرة (`fan-out` = 15) — أي مشكلة في أي موظف تصل إليه فوراً. مقارنةً بمدير يُشرف على 3 فقط.
> **وجه الشبه:** المدير = الـ`method`، الموظفون = الـ`methods` التي يستدعيها.

#### 🎯 الملخص السريع
- `fan-in` كبير: هذه الـ`method` مهمة جداً، تغييرها خطر
- `fan-out` كبير: هذه الـ`method` معقدة ومعتمدة على كثير، صعبة الصيانة
- المثالي: توازن — لا `fan-in` ولا `fan-out` مرتفع جداً

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> [الشريحة تحتوي رسماً بيانياً فقط بدون نص تفصيلي]

**ملاحظة على التغطية:**
- ✓ تم شرح: المفهوم الكامل بالرسم والأمثلة
- ⚠️ غير مشروح بالكامل: لم توجد أرقام محددة للحد الجيد/السيئ في المحاضرة
- ℹ️ إضافة من الدليل: التشبيه بالمدير والموظفين، توضيح العلاقة بـ`separation of concerns`

</details>

---

### 3.2. طول المعرّفات (Length of Identifiers)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1"} -->

#### 📍 أين نحن الآن؟
مقياس بسيط لكن مرتبط فعلاً بكيف يُقرأ الكود.

#### ⬅️ الربط مع السابق
`fan-in/fan-out` قاسا البنية. طول المعرّفات يقيس القابلية للقراءة.

#### 💡 الفكرة الأساسية
**متوسط طول أسماء المتغيرات والـ`classes` والـ`methods` — كلما كانت أطول، كلما كانت أوضح، وكلما كان الكود أسهل فهماً.**

---

#### 📖 الشرح

الـ`identifiers` هي كل الأسماء في الكود: أسماء المتغيرات، الـ`classes`، الـ`methods`، الـ`parameters`. المقياس ببساطة: احسب متوسط طول هذه الأسماء.

الفكرة وراءه: اسم مثل `x` لا يقول شيئاً. اسم مثل `calculateTotalOrderPrice` يصف بالضبط ماذا تفعل هذه الدالة. كلما زاد الطول المتوسط، زادت احتمالية إن الأسماء معبّرة وذات معنى.

#### 💡 التشبيه:
> تخيّل قائمة مكونات وصفة طبخ. `م` مقابل `ملح` مقابل `ملح البحر الخشن`. كلما كان الاسم أوضح، كلما فهمت الوصفة بسرعة.
> **وجه الشبه:** مكونات الوصفة = متغيرات الكود.

#### 🎯 الملخص السريع
- مقياس بسيط لكن له معنى حقيقي
- أسماء أطول ← احتمالية أعلى بأنها معبّرة ← كود أسهل فهماً
- ليس مطلقاً: اسم طويل غير معبّر لا فائدة منه

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Average length of identifiers (names of variables, classes, methods, …). The longer the identifiers, the more likely they are to be meaningful and hence the more understandable the program.

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + المنطق + مثال

</details>

---

### 4. Function Points

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

### 4.1. نظرة عامة والأهداف

#### 📍 أين نحن الآن؟
أهم موضوع في المحاضرة — `function point analysis` هي الأداة الأكثر استخداماً لتقدير جهد تطوير البرمجيات.

#### ⬅️ الربط مع السابق
`static metrics` مثل `LOC` تعتمد على لغة البرمجة — كود Java بيختلف عن Python لنفس الوظيفة. الـ`function points` تحل هذه المشكلة.

#### 💡 الفكرة الأساسية
**الجهد المطلوب يعتمد على *ماذا* يفعل البرنامج (عدد ونوع وظائفه) — مش *كيف* نُفِّذ.**

---

#### 📖 الشرح

Alan Albrecht من IBM أدرك إن `LOC` كمقياس لتقدير التكلفة به مشكلة: نفس الوظيفة تحتاج 10 أسطر في Python و50 في Java. هذا يجعل المقارنة غير عادلة والتقدير غير دقيق.

حله: بدل الأسطر، نعدّ الوظائف من منظور المستخدم. كم `input screen`؟ كم `report`؟ كم قاعدة بيانات داخلية؟ كم نظام خارجي يتكامل معه؟ مجموع هذه النقاط = `function point count` → يُستخدم لتقدير التكلفة والوقت والفريق.

**أهداف `Function Point Analysis`:**
- قياس البرمجيات بالوظائف المقدمة للعميل — مستقل عن التقنية
- قياس التطوير والصيانة بطريقة موحدة عبر كل المشاريع
- تمكين التقدير الدقيق للتكلفة والمدة وحجم الفريق

#### مهم للامتحان ⚠️:
> `Function Points` أُدخلت بواسطة Alan Albrecht من IBM سنة **1979**، وأصبحت معيار ISO سنة **2003**.

#### 🎯 الملخص السريع
- `FP` تقيس "ماذا" وليس "كيف"
- مستقلة عن لغة البرمجة
- تُستخدم لتقدير: التكلفة، المدة، حجم الفريق

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Introduced by Alan Albrecht of IBM (1979). 2003, ISO standard. Probably the best approach to cost estimation (function point analysis - FPA). Assumes that the effort required to develop a piece of software depends on what the software does (#functions it implements). The larger number of FPs the more functionality.

**ملاحظة على التغطية:**
- ✓ تم شرح: التاريخ + المبدأ + الأهداف + الفوائد

</details>

---

### 4.2. ما الذي نعدّه؟ (What to Count)

#### 📍 أين نحن الآن؟
بعد الفهم النظري، الآن التطبيق: ما المكونات التي نحسبها لحساب `FP`؟

#### 💡 الفكرة الأساسية
**خمسة أنواع من المكونات تُعدّ: `external inputs`، `external outputs`، `logical internal files`، `external interface files`، `external inquiries`.**

---

#### 📖 الشرح

| المكوّن | التعريف | أمثلة |
|---------|---------|-------|
| **External Inputs** | بيانات تدخل النظام من الخارج | شاشات إدخال البيانات، نماذج المستخدم |
| **External Outputs** | بيانات/تقارير تخرج للمستخدم | التقارير، الرسائل، النتائج المعروضة |
| **Logical Internal Files** | ملفات/قواعد بيانات داخلية يديرها النظام | جداول قاعدة البيانات |
| **External Interface Files** | ملفات يقرأها النظام لكن لا يديرها | بيانات من نظام خارجي |
| **External Inquiries** | استعلامات تعطي إجابات فورية | بحث، استعلام عن حالة |

#### 🎯 الملخص السريع
- الإدخالات الخارجية = تدخل النظام
- الإخراجات الخارجية = تخرج منه
- الملفات الداخلية = يملكها ويديرها
- ملفات الواجهة الخارجية = يقرأها لكن لا يملكها
- الاستعلامات الخارجية = سؤال وجواب فوري

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Number of external inputs (transactional types), External outputs (report types), Logical internal files (nonphysical), External interface files (files accessed by the application but not maintained or updated by it), External inquiries.

</details>

---

### 4.3. تعقيد المكوّنات وجداول النقاط (RETs & DETs)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->

#### 📍 أين نحن الآن؟
الآن أدق جزء: كيف نحدد تعقيد كل مكوّن لنعطيه النقاط المناسبة؟

#### 💡 الفكرة الأساسية
**تعقيد كل مكوّن يتحدد بعدد الـ`RETs` (subgroups قابلة للتعرف) وعدد الـ`DETs` (الحقول)، ثم نضرب التعقيد في معامل النقاط.**

---

#### 📖 الشرح

**`DET` (Data Element Type):** حقل بيانات فريد قابل للتعرف من قِبل المستخدم. في نموذج تسجيل: First Name، Last Name، Email، Password — كل منها `DET` واحد.

**`RET` (Repeatable Element Type):** مجموعة فرعية يمكن للمستخدم تعرّفها كوحدة. مثال: جدول Articles فيه Title، Year، Abstract، Notes — هذا `RET` واحد. جدول Tags و Authors — كلٌّ منهما `RET` مستقل.

#### جدول تحديد التعقيد (للـ Logical Internal Files):

| RETs | DETs 1-19 | DETs 20-50 | DETs 51+ |
|------|-----------|------------|----------|
| **1** | Low | Low | Average |
| **2-5** | Low | Average | High |
| **6+** | Average | High | High |

#### جدول النقاط (لـ Logical Internal Files):

| التعقيد | النقاط |
|---------|--------|
| Low | 7 |
| Average | 10 |
| High | 15 |

#### 🔍 تتبع التنفيذ: مثال حساب FP لجدول Articles

**المعطى:** جدول Articles يحتوي (Title, Year, Abstract, Notes) ومرتبط بـ (Tags, Authors).

| الخطوة | العملية | النتيجة |
|---------|---------|---------|
| 1 | عدّ الـRETs | 3 (Articles + Tags + Authors) |
| 2 | عدّ الـDETs في Articles | 4 (Title, Year, Abstract, Notes) |
| 3 | ابحث في الجدول: RETs=3، DETs=4 | Low |
| 4 | ابحث عن نقاط Low | 7 نقاط |

**النتيجة:** هذا الـ`logical internal file` يساوي 7 نقاط.

#### 📚 التطبيق
هكذا تحسب `FP` لكل مكوّن في النظام، ثم تجمع الكل للحصول على `total FP count`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> جدول RETs vs DETs (Low/Average/High) + جدول Complexity Points (Low=7, Average=10, High=15).
> RET (Repeatable data element types): User recognizable subgroup of data elements.

**ملاحظة على التغطية:**
- ✓ تم شرح: تعريف RET وDET + الجداول + مثال تتبع

</details>

---

### 4.4. أمثلة عملية على Function Points

#### 📍 أين نحن الآن؟
نطبّق الفهم على مثالين كاملين من المحاضرة.

---

#### 🔍 المثال الأول: نظام الإبلاغ عن الأخطاء (Bug Reporting)

**الوصف:** نظام يتيح للعملاء الإبلاغ عن `bugs` في منتج. التقارير تُخزّن في ملف. المطورون يحصلون على تقرير يومي بالأخطاء الجديدة. العملاء يحصلون على تحديث يومي لحالة تقاريرهم. الإدارة تستطيع الاستعلام عن ملخص لفترات معينة.

#### ⚙️ التحليل:

| المكوّن | الوصف | العدد |
|---------|-------|-------|
| External Inputs | نموذج إدخال تقرير bug | 1 |
| Logical Internal Files | الملف الذي يخزن التقارير | 1 |
| External Outputs | تقرير المطورين اليومي + تحديث العملاء اليومي | 2 |
| External Inquiries | استعلام الإدارة عن ملخصات | 1 |

**النتيجة:** `#external inputs = 1`, `#logical internal files = 1`, `#external outputs = 2`, `#external inquiries = 1`

---

#### 🔍 المثال الثاني: نظام معلومات الموظفين

**الوصف:** نظام معلومات يتيح للمستخدمين استعراض وتعديل بيانات الموظفين. شاشة واحدة لعرض بيانات موظف واحد تُقدَّر بـ1 person-month. لعمل 6 شاشات ← 6 person-months.

**الدرس المستفاد:**
> قوة `function points` هنا: بمجرد معرفة جهد وظيفة واحدة (1 شاشة = 1 شهر)، تستطيع تقدير جهد النظام كاملاً بالتناسب (6 شاشات = 6 أشهر).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> #External inputs = 1, #Logical internal files = 1, #External outputs = 2, #External inquiries = 1
> An information system... one of the function points... effort will be 1 person month... for 6 screens, we estimate 6 person months.

</details>

---

### 5. Halstead Metric (1977)

<!-- @render: {type: "prose-first", visualization: "equations", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

### 5.1. الأساس النظري والمصطلحات

#### 📍 أين نحن الآن؟
مقياس تاريخي لكن لا يزال مُدرَّساً. يحوّل الكود لأرقام بطريقة منهجية.

#### 💡 الفكرة الأساسية
**البرنامج مجموعة من الرموز (`tokens`) — إما `operators` أو `operands` — ومن عدّها نستخرج مقاييس تعبّر عن الحجم والصعوبة والوقت.**

---

#### 📖 الشرح

**تعريف الـ`tokens`:**
- **`Operators`:** كل ما يُنفّذ عملية — العلامات الرياضية (`+`, `-`)، علامات الإسناد (`=`)، الكلمات المفتاحية (`while`, `if`)، علامات الترقيم (`;`, `(`, `)`)، دوال النظام (`print`)
- **`Operands`:** كل ما له قيمة — المتغيرات (`x`, `z`, `y`) والثوابت (`0`, `1`)

**ملاحظة مهمة:** Halstead كان لا يعدّ التصريحات (`declarations`)، جمل الإدخال/الإخراج، أو التعليقات. لكن معظم المنظمات اليوم تعدّ كل أجزاء البرنامج.

#### مهم للامتحان ⚠️:
> `while`، `if`، `=`، `;`، `(` و `)` كلها **`operators`** — ليست `operands`!

---

### 5.2. المعادلات والحسابات

#### 📐 المعادلة: تعريفات الأساس

$$n_1 = \text{عدد الـoperators الفريدة}$$
$$n_2 = \text{عدد الـoperands الفريدة}$$
$$N = \text{إجمالي tokens} = \text{مجموع كل الـoperators والـoperands}$$

#### 📐 المعادلة: تقدير الطول

$$\text{Est } N = n_1 \times \log_2{n_1} + n_2 \times \log_2{n_2}$$

**الشرح:** هذا تقدير نظري لطول البرنامج — يمكن مقارنته بـ`N` الحقيقي للتحقق من صحة الكود.

#### 📐 المعادلة: الحجم (Volume)

$$V = N \times \log_2(n_1 + n_2)$$

**الشرح:** يمثّل حجم المعلومات في البرنامج بالبت.

#### 📐 المعادلة: الصعوبة (Difficulty)

$$D = \frac{n_1}{2} \times \frac{\text{إجمالي عدد الـoperands}}{n_2}$$

**الشرح:** مرتبط بصعوبة فهم البرنامج عند المراجعة أو الصيانة.

#### 📐 المعادلة: الجهد والوقت

$$E = D \times V$$
$$T \text{ (seconds)} = \frac{E}{18}$$

**الشرح:** `E` = الجهد الكلي. `T` = الوقت التقديري للبرمجة بالثواني (بقسمة على 18).

---

### 5.3. مثال تطبيقي كامل

#### 🔍 تتبع التنفيذ: Halstead على برنامج بسيط

**الكود:**
```pseudocode
z = 0;
while x > 0
    z = z + y;
    x = x - 1
end-while;
print(z);
```

**المدخل:** برنامج يحسب z = y × x (ضرب متكرر)

| الخطوة | العملية | النتيجة |
|---------|---------|---------|
| 1 | تحديد الـoperators الفريدة | `=`, `;`, `while`, `>`, `+`, `-`, `print`, `()` |
| 2 | عدّ n1 | **8** |
| 3 | تحديد الـoperands الفريدة | `z`, `x`, `0`, `y`, `1` |
| 4 | عدّ n2 | **5** |
| 5 | عدّ كل الـoperators (total) | 14 |
| 6 | عدّ كل الـoperands (total) | 11 |
| 7 | حساب N | 14 + 11 = **25** |

**النتيجة:**
- `n1 = 8`, `n2 = 5`, `N = 25`
- `Est N = 8 × log₂8 + 5 × log₂5 = 8×3 + 5×2.32 = 24 + 11.6 ≈ 35.6`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> n1 (= ; while > + - print () )= 8, n2 (z x 0 y 1) = 5, N (operand+operator) = 11 + 14 = 25
> Volume V = N * log2(n1+n2), Difficulty D = (n1/2) * (total #operands/n2), Effort E = D * V, Time required T = E / 18 seconds

**ملاحظة على التغطية:**
- ✓ تم شرح: كل المعادلات + المثال الكامل + تتبع خطوة بخطوة

</details>

---

### 6. خلاصة المحاضرة (Last Word about Measurement)

#### 📍 أين نحن الآن؟
ختام المحاضرة — نظرة نقدية على واقع مقاييس البرمجيات.

#### 💡 الفكرة الأساسية
**رغم وجود مقاييس كثيرة، معظمها على مستوى الكود (متأخر جداً)، وبعضها صعب الحساب، ولا يوجد مقياس موحّد — لكن استخدامها يُحسّن الجودة.**

---

#### 📖 الشرح

الدكتور يُنهي بملاحظات واقعية مهمة:

- **"كثير من المقاييس"**: السوق مليء بمقاييس مختلفة — صعب اختيار الأنسب.
- **"معظمها على مستوى الكود ← متأخر جداً"**: بحلول وقت كتابة الكود، كثير من القرارات المعمارية اتُّخذت بالفعل. المثالي هو القياس في مراحل التصميم.
- **"بعضها صعب الحساب"**: `FP` مثلاً يحتاج خبرة وتفسيراً.
- **"لا يوجد مقياس معياري موحّد"**: لا ISO للمقياس "الأفضل".
- **"استخدام المقاييس الموجودة يساعد في تعظيم صفات الجودة"**: رغم القيود، الاستخدام أفضل من عدمه.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
"لما أجمع الـ`FP` أو `Halstead`، هذه أرقام دقيقة 100% وتعبّر عن الواقع."

#### الفهم الصحيح ✅:
المقاييس مؤشرات وتقديرات — ليست حقائق مطلقة. قيمتها في المقارنة والاتجاهات (`trends`)، وليس في الرقم المطلق.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A lot of metrics. Most at source code level → too late. Some are difficult to calculate. No standard metric. Using existing metrics could help at maximizing the quality attributes.

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: Medium / Hard

---

### السؤال 1 (Medium)

Which of the following best describes the fundamental assumption behind software measurement?

أ) Internal attributes can be measured directly and accurately represent external quality.
ب) External quality attributes like reliability can be directly measured from user feedback only.
ج) There exists a relationship between measurable internal attributes and desired external quality attributes.
د) Measurement is only useful after the software has been deployed.

**الإجابة الصحيحة:** ج

**التعليل:**
- ✅ **ج):** The core assumption is that internal attributes (LOC, CC) correlate with external attributes (reliability, maintainability), even though they are not the same.
- ❌ **أ):** Internal attributes do NOT directly represent external quality — they only approximate it.
- ❌ **ب):** External attributes are NOT directly measurable; that's the whole problem metrics try to solve.
- ❌ **د):** Measurement is useful throughout all stages — especially design and development.

---

### السؤال 2 (Medium)

Which metric classification would "average time required to repair a defect" fall under?

أ) Predictor metric / Product metric
ب) Static metric
ج) Dynamic metric
د) Control metric / Process metric

**الإجابة الصحيحة:** د

**التعليل:**
- ✅ **د):** "Time to repair defects" is a process-level metric that helps manage the development process — it's a control/process metric.
- ❌ **أ):** Product/predictor metrics describe the software itself (like LOC or CC), not the process.
- ❌ **ب):** Static metrics are collected from code representations without execution.
- ❌ **ج):** Dynamic metrics are collected during program execution (like execution time or bug reports during testing).

---

### السؤال 3 (Medium)

The number of bug reports filed by users after system deployment is an example of:

أ) Static metric
ب) Control metric
ج) Dynamic metric
د) Predictor metric only

**الإجابة الصحيحة:** ج

**التعليل:**
- ✅ **ج):** Bug reports collected after deployment are collected during actual system use — this is a dynamic metric.
- ❌ **أ):** Static metrics are collected from code without running it.
- ❌ **ب):** Control/process metrics relate to process management (effort, time), not product behavior.
- ❌ **د):** While it has predictive value, its primary classification is dynamic (based on when it's collected).

---

### السؤال 4 (Medium)

What does a high fan-out value for a method indicate?

أ) The method is called by many other methods — it is highly reused.
ب) The method calls many other methods — it has high coupling and may be hard to maintain.
ج) The method has a large number of local variables.
د) The method has high cyclomatic complexity.

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** High fan-out means the method depends on many other methods, increasing coupling and maintenance risk.
- ❌ **أ):** That describes high fan-in, not fan-out.
- ❌ **ج):** Number of local variables is a separate metric.
- ❌ **د):** Cyclomatic complexity measures logical paths, not method calls.

---

### السؤال 5 (Hard)

A method M has fan-in = 10 and fan-out = 2. Which statement is most accurate?

أ) Method M is highly reusable but has high coupling.
ب) Changing Method M is risky because many modules depend on it; it has low outward coupling.
ج) Method M is difficult to understand because it calls many methods.
د) Method M is isolated and has no impact on other parts of the system.

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** Fan-in = 10 means 10 modules call M — changing it breaks all of them. Fan-out = 2 means M depends on only 2 others — low outward coupling.
- ❌ **أ):** High fan-in indicates reuse but does NOT imply high coupling (fan-out is low here).
- ❌ **ج):** High fan-out (not fan-in) suggests calling many methods and complex dependencies.
- ❌ **د):** Fan-in = 10 means M has significant impact on the system.

---

### السؤال 6 (Medium)

Function Point Analysis was introduced to solve which limitation of Lines of Code (LOC) as a metric?

أ) LOC cannot be counted automatically.
ب) LOC varies significantly across programming languages for the same functionality.
ج) LOC does not count comments.
د) LOC is too small a number for large systems.

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** The same functionality may require 10 lines in Python but 50 in Java — LOC is language-dependent, making cross-project comparisons invalid.
- ❌ **أ):** LOC can be counted automatically; that's not the issue.
- ❌ **ج):** Whether to count comments is a convention issue, not the core limitation.
- ❌ **د):** LOC can be any size; the problem is comparability, not magnitude.

---

### السؤال 7 (Medium)

In Function Point Analysis, which of the following is an "External Inquiry"?

أ) A database table that stores employee records
ب) A daily report sent to managers by email
ج) A search screen where users look up an order status
د) A data entry form for new customer registration

**الإجابة الصحيحة:** ج

**التعليل:**
- ✅ **ج):** An external inquiry is a request-response interaction that retrieves data without updating it — an order status lookup fits exactly.
- ❌ **أ):** A database table is a Logical Internal File (LIF).
- ❌ **ب):** A report sent to users is an External Output.
- ❌ **د):** A data entry form is an External Input.

---

### السؤال 8 (Hard)

A Logical Internal File has 3 RETs and 25 DETs. What is its complexity rating?

أ) Low
ب) Average
ج) High
د) Cannot be determined

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** Looking at the table: RETs = 3 (in range 2-5), DETs = 25 (in range 20-50) → Average.
- ❌ **أ):** Low requires RETs 1-5 AND DETs 1-19 (or RETs=1 with DETs 1-50).
- ❌ **ج):** High requires RETs ≥ 6 with DETs 20+, or RETs 2-5 with DETs 51+.
- ❌ **د):** The table provides definitive mapping — it can be determined.

---

### السؤال 9 (Hard)

A Logical Internal File is rated "Average" complexity. How many Function Points does it contribute?

أ) 5
ب) 7
ج) 10
د) 15

**الإجابة الصحيحة:** ج

**التعليل:**
- ✅ **ج):** The complexity-to-points table for Logical Internal Files: Low=7, Average=10, High=15.
- ❌ **أ):** 5 is not a valid FP point value for LIFs.
- ❌ **ب):** 7 corresponds to Low complexity.
- ❌ **د):** 15 corresponds to High complexity.

---

### السؤال 10 (Hard)

In the Halstead Metric applied to the example code (z=0; while x>0; z=z+y; x=x-1; end-while; print(z);), which of the following tokens is classified as an operator?

أ) z
ب) 0
ج) while
د) y

**الإجابة الصحيحة:** ج

**التعليل:**
- ✅ **ج):** `while` is a keyword that performs an operation (looping) — it's an operator.
- ❌ **أ):** `z` is a variable (has a value) — it's an operand.
- ❌ **ب):** `0` is a constant (has a value) — it's an operand.
- ❌ **د):** `y` is a variable — it's an operand.

---

### السؤال 11 (Medium)

In Halstead Metric, what does n1 represent?

أ) Total count of all operator occurrences in the program
ب) Count of unique operators in the program
ج) Total count of all operands in the program
د) Count of unique operands in the program

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** n1 = number of *distinct/unique* operators. `=` appearing 4 times still counts as 1 in n1.
- ❌ **أ):** The total count of all operator occurrences contributes to N (program length), not n1.
- ❌ **ج):** Total operand occurrences also contribute to N.
- ❌ **د):** n2 = unique operands (not n1).

---

### السؤال 12 (Hard)

Given n1=8, n2=5, total operators=14, total operands=11, calculate the Halstead Difficulty D.

أ) D = 4 × (11/5) = 8.8
ب) D = (8/2) × (11/5) = 8.8
ج) D = 8 × (11/5) = 17.6
د) D = (8/2) × (5/11) ≈ 1.8

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** D = (n1/2) × (total operands / n2) = (8/2) × (11/5) = 4 × 2.2 = 8.8
- ❌ **أ):** Correct calculation but the formula shown has an error (4 instead of n1/2=4 — this happens to be the same, but the formula is written incorrectly).
- ❌ **ج):** Uses n1 directly instead of n1/2.
- ❌ **د):** Inverts the operand ratio — should be (total operands / n2), not (n2 / total operands).

---

### السؤال 13 (Medium)

What is the formula for estimating coding time in Halstead Metric?

أ) T = E × 18
ب) T = V / D
ج) T = E / 18 (in seconds)
د) T = N × log₂(n1 + n2)

**الإجابة الصحيحة:** ج

**التعليل:**
- ✅ **ج):** Time T = E / 18 seconds, where E is effort (E = D × V).
- ❌ **أ):** Inverting the formula — multiplying by 18 gives effort from time, not time from effort.
- ❌ **ب):** V/D is not a standard Halstead formula.
- ❌ **د):** That formula is V (Volume), not T.

---

### السؤال 14 (Hard)

Which statement about Function Points is FALSE?

أ) FP can be calculated before any code is written.
ب) FP became an ISO standard in 2003.
ج) A higher FP count means more functionality.
د) FP values change significantly depending on the programming language used.

**الإجابة الصحيحة:** د

**التعليل:**
- ✅ **د (FALSE):** This is the false statement. FP is specifically designed to be independent of programming language — that's its main advantage over LOC.
- ❌ **أ):** TRUE — FP is calculated from requirements/functionality, so it can be estimated before coding.
- ❌ **ب):** TRUE — FPA became ISO standard in 2003.
- ❌ **ج):** TRUE — more FPs = more functionality = more development effort.

---

### السؤال 15 (Hard)

According to the lecture's "last word about measurement," which of the following is a valid criticism of software metrics?

أ) Metrics are useless because they cannot predict defects.
ب) Most metrics are collected at source code level, which may be too late in the development process.
ج) Function Points are the only reliable metric and should replace all others.
د) Dynamic metrics are always better than static metrics.

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** The lecture explicitly states "Most at source code level → too late" — by the time you measure code, architectural decisions are already made.
- ❌ **أ):** The lecture says metrics CAN help maximize quality attributes — they are not useless.
- ❌ **ج):** The lecture says there is "no standard metric" and notes limitations of all metrics.
- ❌ **د):** The lecture does not rank dynamic above static — both serve different purposes.

---

### السؤال 16 (Hard)

A system has: 2 external inputs, 1 logical internal file (Average complexity), 3 external outputs (all Low), and 1 external inquiry (Low). If external output Low = 4 pts, external inquiry Low = 3 pts, external input Low = 3 pts, LIF Average = 10 pts — what is the total Unadjusted Function Point count?

أ) 23
ب) 25
ج) 28
د) 31

**الإجابة الصحيحة:** ب

**التعليل:**
- ✅ **ب):** External inputs: 2 × 3 = 6. LIF: 1 × 10 = 10. External outputs: 3 × 4 = 12. External inquiries: 1 × 3 = 3. Total = 6+10+12+3 = **31**. Wait — recalculate: 6+10=16, 16+12=28, 28+3=31. Answer is **د) 31**.

**الإجابة الصحيحة المعدّلة: د**

**التعليل المعدّل:**
- ✅ **د):** 2×3 + 1×10 + 3×4 + 1×3 = 6 + 10 + 12 + 3 = **31**

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the core assumption behind all software metrics?
A: There is a relationship between measurable internal attributes (like LOC, CC) and the external quality attributes we care about (like reliability, maintainability) — even though we cannot measure external attributes directly.

---

**Q2:** What is the difference between `control metrics` and `predictor metrics`?
A: Control (process) metrics support project management — e.g., average time to fix a bug. Predictor (product) metrics describe the software itself — e.g., LOC, cyclomatic complexity.

---

**Q3:** What does `static metric` mean and give an example?
A: A static metric is collected from the code/system representation without running the program. Examples: code size (LOC), cyclomatic complexity.

---

**Q4:** What does `dynamic metric` mean and give an example?
A: A dynamic metric is collected during program execution, testing, or after deployment. Examples: number of bug reports, time taken to complete a computation.

---

**Q5:** What does `fan-out` measure and why does a high value indicate a problem?
A: Fan-out measures how many methods a given method calls. A high fan-out means the method depends on many others — if any of those changes or breaks, the method is affected, making it harder to maintain.

---

**Q6:** Who introduced Function Points and when?
A: Alan Albrecht of IBM introduced Function Points in 1979. It became an ISO standard in 2003.

---

**Q7:** What are the five components counted in Function Point Analysis?
A: External Inputs, External Outputs, Logical Internal Files, External Interface Files, and External Inquiries.

---

**Q8:** What is a `DET` in Function Point Analysis?
A: DET stands for Data Element Type — a unique, user-recognizable data field. For example, in a registration form: First Name, Last Name, Email are each one DET.

---

**Q9:** What is a `RET` in Function Point Analysis?
A: RET stands for Repeatable Element Type — a user-recognizable subgroup of data elements within a logical file. For example, a database with Articles, Tags, and Authors tables has 3 RETs.

---

**Q10:** In Halstead Metric, what is `n1` vs `n2` vs `N`?
A: n1 = count of unique operators. n2 = count of unique operands. N = total count of all operator and operand occurrences (N = n1-total + n2-total).

---

**Q11:** In Halstead's example code, is `while` an operator or operand?
A: `while` is an operator — it performs an operation (looping control). Only variables and constants (z, x, 0, y, 1) are operands.

---

**Q12:** What is the Halstead formula for estimating coding time?
A: Time T = E / 18 (seconds), where Effort E = Difficulty D × Volume V, and D = (n1/2) × (total operands / n2), and V = N × log₂(n1 + n2).

---

**Q13:** What are the three benefits of Function Point Analysis according to the lecture?
A: Accurate estimation of (1) project cost, (2) project duration, and (3) project staffing size.

---

**Q14:** According to the lecture's final remarks, what are two main criticisms of current software metrics?
A: (1) Most metrics are collected at source code level — which is too late in the development lifecycle. (2) There is no standard (unified) metric that everyone agrees on.

---

**Q15:** A Logical Internal File has RETs=1 and DETs=30. What is its complexity?
A: Looking at the table: RETs=1, DETs in range 20-50 → Low complexity → 7 Function Points.

---

**Q16:** Why is Function Point Analysis considered better than LOC for cost estimation?
A: FP is independent of programming language — the same functionality gets the same FP count regardless of whether it's implemented in Python, Java, or C++. LOC varies significantly across languages for identical functionality.

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة

| المصطلح | التعريف القصير |
|---------|---------------|
| `internal attribute` | صفة قابلة للقياس المباشر في الكود (LOC، CC) |
| `external attribute` | صفة يريدها المستخدم (موثوقية، قابلية صيانة) |
| `control metric` | مقياس يدعم إدارة عملية التطوير |
| `predictor metric` | مقياس مرتبط بالبرنامج نفسه |
| `static metric` | يُجمع من الكود بدون تشغيل |
| `dynamic metric` | يُجمع أثناء التشغيل أو بعد النشر |
| `fan-in` | عدد الـ`methods` التي تستدعي هذه الـ`method` |
| `fan-out` | عدد الـ`methods` التي تستدعيها هذه الـ`method` |
| `DET` | حقل بيانات فريد قابل للتعرف من قِبل المستخدم |
| `RET` | مجموعة فرعية قابلة للتعرف ضمن ملف منطقي |
| `n1` | عدد الـ`operators` الفريدة (Halstead) |
| `n2` | عدد الـ`operands` الفريدة (Halstead) |
| `N` | إجمالي عدد الـ`tokens` (Halstead) |

---

### 🔑 جداول المقارنة

| المعيار | `Static Metrics` | `Dynamic Metrics` |
|---------|-----------------|------------------|
| **متى تُجمع** | من الكود (بدون تشغيل) | أثناء/بعد التشغيل |
| **ما تقيّمه** | التعقيد، الصيانة، الفهم | الكفاءة، الموثوقية |
| **مثال** | LOC، CC، FP | Bug reports، وقت التنفيذ |

| المعيار | `Control Metrics` | `Predictor Metrics` |
|---------|-----------------|------------------|
| **يخدم** | مدير المشروع | المطور / المحلل |
| **يقيس** | العملية | المنتج |
| **مثال** | وقت إصلاح bug | LOC، CC |

---

### 🔑 نقاط Function Points لـ Logical Internal Files

| RETs \ DETs | 1-19 | 20-50 | 51+ |
|------------|------|-------|-----|
| **1** | Low (7) | Low (7) | Average (10) |
| **2-5** | Low (7) | Average (10) | High (15) |
| **6+** | Average (10) | High (15) | High (15) |

---

### 🔑 معادلات Halstead السريعة

| المعادلة | الصيغة |
|---------|-------|
| طول البرنامج | `N = total operators + total operands` |
| تقدير الطول | `Est N = n1·log₂n1 + n2·log₂n2` |
| الحجم | `V = N · log₂(n1 + n2)` |
| الصعوبة | `D = (n1/2) · (total_operands / n2)` |
| الجهد | `E = D · V` |
| الوقت | `T = E / 18` (seconds) |

---

### 🔑 قواعس ذهبية لا تُنسى

| # | القاعدة |
|---|---------|
| 1 | `fan-out` عالٍ = خطر — الـ`method` تعتمد على كثير من الأجزاء |
| 2 | `fan-in` عالٍ = هذه الـ`method` حساسة — تغييرها يؤثر على الجميع |
| 3 | `FP` مستقل عن لغة البرمجة — ميزته الأساسية |
| 4 | `while`, `if`, `=`, `;` كلها `operators` — ليست `operands` |
| 5 | `n1` = unique operators، `n2` = unique operands (وليس العكس) |
| 6 | المقاييس مؤشرات — ليست حقائق مطلقة |
| 7 | `FP` يُحسب من المتطلبات — يمكن تطبيقه قبل كتابة الكود |

---

### 🔑 قاموس المصطلحات

| المصطلح | المعنى |
|---------|-------|
| `LOC` | Lines of Code — أسطر الكود |
| `CC` | Cyclomatic Complexity — مقياس التعقيد الدوراني |
| `FP` | Function Point — نقطة وظيفية |
| `FPA` | Function Point Analysis — تحليل نقاط الوظائف |
| `DET` | Data Element Type — نوع عنصر البيانات |
| `RET` | Repeatable Element Type — نوع عنصر متكرر |
| `EI` | External Input — إدخال خارجي |
| `EO` | External Output — إخراج خارجي |
| `LIF` | Logical Internal File — ملف داخلي منطقي |
| `EIF` | External Interface File — ملف واجهة خارجية |
| `EQ` | External Inquiry — استعلام خارجي |

---

### 🔑 الخطوات السريعة: حساب Function Points

```algorithm
1 | تحديد المكونات    | المتطلبات   | EI, EO, LIF, EIF, EQ
2 | عدّ RETs و DETs   | كل مكوّن   | الحصول على RETs وDETs لكل مكوّن
3 | تحديد التعقيد     | جدول       | Low / Average / High
4 | تحديد النقاط      | جدول النقاط | نقاط كل مكوّن
5 | الجمع الكلي       | ضرب + جمع   | Total Unadjusted FP
```

### 🔑 الخطوات السريعة: حساب Halstead

```algorithm
1 | تحديد الـoperators  | الكود     | كل keywords والرموز والدوال
2 | تحديد الـoperands   | الكود     | المتغيرات والثوابت فقط
3 | حساب n1, n2, N      | العدّ     | unique operators, unique operands, total
4 | حساب V              | معادلة    | V = N × log₂(n1+n2)
5 | حساب D              | معادلة    | D = (n1/2) × (total_ops / n2)
6 | حساب E و T          | معادلة    | E = D×V، T = E/18
```

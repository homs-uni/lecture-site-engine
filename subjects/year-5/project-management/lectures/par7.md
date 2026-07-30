# المحاضرة 7 — Search in JIRA (البحث في JIRA)
> **المادة:** إدارة المشاريع (القسم النظري والعملي) | **الموضوع:** آليات البحث في JIRA (Quick/Basic/Advanced Search - JQL) + أنواع الـ Issues وإعداداتها

---
## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. آليات البحث في JIRA (Search Mechanisms)

#### النص الأصلي يقول:
> "We have the following search mechanisms in JIRA: Quick Search, Basic Search, Advanced Search, Filters, Quick Filters. In general, search mechanisms in JIRA search for Issues within project issues"

#### الشرح المبسّط:
تخيّل أن `JIRA` مكتبة ضخمة فيها آلاف الكتب (الـ `Issues`). أحياناً تريد كتاباً معيناً بسرعة فتستخدم صندوق بحث بسيط، وأحياناً تريد كل الكتب التي أُلّفت بعد سنة معينة ومن تأليف كاتب محدد فتحتاج نظام بحث متقدم. `JIRA` توفر 5 طرق للبحث، تتدرّج من الأبسط إلى الأقوى.

**لماذا؟** لأن احتياجات المستخدمين تختلف: أحياناً بحث سريع عابر، وأحياناً استعلام دقيق ومعقّد يُحفظ ويُستخدم آلياً (في التقارير أو الأتمتة).

#### 💡 التشبيه:
> مثل محرك بحث `Google` مقابل استخدام أوامر بحث متقدمة (`site:`, `filetype:`) — كلاهما بحث، لكن الثاني أدق وأقوى.
> **وجه الشبه:** `Quick Search` = كتابة كلمة عادية في `Google` | `Advanced Search (JQL)` = استخدام عوامل بحث متقدمة.

---

### 1.1. Quick Search

#### النص الأصلي يقول:
> "Quick search is performed by searching for the item in the text box above the issue list. It accepts the use of the word not to search for the opposite. Weak in terms of design"

#### الشرح المبسّط:
هو أبسط أنواع البحث، تكتب كلمة في صندوق البحث أعلى قائمة الـ `Issues` وتظهر لك النتائج المطابقة. مثال من المحاضرة: كتابة `item` تُعيد 3 نتائج (`PROJ-1`, `PROJ-2`, `PROJ-3`). أما كتابة `item NOT 1` فتستثني أي issue يحتوي الرقم `1`، فتعيد فقط `PROJ-3` و`PROJ-2` (نتيجتان بدلاً من 3). ويمكن استخدام `OR` أيضاً كما في `item OR sample` التي أعادت 4 نتائج لأنها توسّع الشرط بدل أن تضيّقه.

**لماذا؟** لأنه أسرع وسيلة لإيجاد issue تعرف جزءاً من اسمه دون الحاجة لفتح واجهة بحث معقدة، لكنه (كما تقول المحاضرة) "ضعيف من ناحية التصميم" لأنه لا يعرض فلاتر أو خيارات بصرية.

#### 💡 التشبيه:
> مثل البحث السريع في هاتفك عن جهة اتصال بكتابة أول حرفين من اسمها.
> **وجه الشبه:** صندوق النص = شريط البحث في الهاتف | الكلمة المكتوبة = اسم جهة الاتصال.

#### 🔍 تتبع التنفيذ: نتائج Quick Search
**المدخل:** issues موجودة: `PROJ-1 add item 1`, `PROJ-2 add item 2`, `PROJ-3 add item 3`, `PROJ-4 create sample data`

| الاستعلام | العملية | عدد النتائج |
| --- | --- | --- |
| `item` | مطابقة أي issue يحوي كلمة item | 3 |
| `item NOT 1` | استبعاد أي issue يحوي `1` | 2 |
| `item OR sample` | توسيع الشرط (item **أو** sample) | 4 |

**النتيجة:** كل عامل (`NOT`, `OR`) يُغيّر حجم مجموعة النتائج بشكل متوقع ومنطقي.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كتبت `item NOT sample` كم توقع أن تكون النتيجة؟
> **لماذا هذا مهم؟** لأنك تتدرب على قراءة منطق `NOT` قبل الانتقال لـ `JQL` الذي يستخدم نفس الفكرة لكن بصياغة أدق (`!=`).

---

### 1.2. Basic Search

#### النص الأصلي يقول:
> "We have a filter bar that can be applied to the issue list. More powerful than quick search and is considered a visual representation of JQL"

#### الشرح المبسّط:
`Basic Search` هو شريط فلاتر (`Project`, `Type`, `Status`, `Assignee`, `More`...) يظهر أعلى قائمة الـ `Issues`، وبجانبه صندوق نص وزر `Search` وزر `Switch to JQL`. أهم فكرة هنا: **كل ما تختاره من هذه القوائم المنسدلة يتحول تلقائياً خلف الكواليس إلى جملة `JQL`** — أي أن `Basic Search` ليس أداة منفصلة عن `JQL`، بل واجهة رسومية *فوق* `JQL`.

**لماذا؟** لتسهيل الاستعلام على المستخدم غير المتمرّس بلغة `JQL`؛ فبدل أن يكتب الشرط يدوياً، يختاره من قوائم منسدلة والنظام يبني الجملة نيابة عنه.

#### ⚖️ المقايضة: Basic Search vs Advanced Search

| | Basic Search | Advanced Search (JQL) |
| --- | --- | --- |
| المزايا | واجهة سهلة، لا حاجة لتعلم صياغة | الأقوى، يدعم شروط زمنية ومنطقية معقّدة، يُستخدم في process automation |
| العيوب | لا يمكنه التعبير عن استعلامات معقّدة | يتطلب تعلّم صياغة `JQL` |
| متى تختاره | بحث يومي بسيط بمعايير قليلة | تقارير دقيقة، فلاتر محفوظة، أتمتة |

#### 💡 التشبيه:
> مثل استخدام واجهة رسومية (`GUI`) لبناء استعلام `SQL` بدل كتابة الاستعلام يدوياً.
> **وجه الشبه:** القوائم المنسدلة (`Project`, `Status`...) = أدوات بناء الشرط | الجملة الناتجة خلف الكواليس = جملة `SQL`/`JQL`.

---

### 2. Advanced Search وأساس JQL

#### النص الأصلي يقول:
> "Advanced search in JIRA is based on the concept of JQL. JQL is a language similar to SQL. It mainly focuses on the Where condition section"

#### الشرح المبسّط:
`JQL` = `JIRA Query Language`. هي لغة استعلام تشبه `SQL` لكنها مختصرة جداً وتركّز فقط على جزء الشرط (المكافئ لـ `WHERE` في `SQL`) — أي أنك تكتب الشرط مباشرة دون `SELECT ... FROM ...`، لأن `JIRA` تعرف ضمنياً أنك تبحث ضمن الـ `Issues`.

**لماذا؟** لأن المستخدم لا يحتاج غالباً لتحديد الأعمدة أو الجدول (كما في `SQL`)، فقط يحدد **معايير التصفية**، لذلك اختصرت `JIRA` اللغة إلى جزء الشرط فقط، مما يجعلها أخف وأسهل تعلّماً من `SQL` الكاملة.

#### 1.2.1. صياغة الشرط الأساسية

```text
<field name> <operator> <field value>
project = projectA
```

```text
<field name> <operator> <function>
assignee = currentUser()
```

#### شرح كل سطر:
1. `<field name>` → اسم الحقل (`project`, `assignee`, `status`...) — يحدد أي خاصية من الـ issue نقارنها
2. `<operator>` → عامل المقارنة (`=`, `!=`, `<`, `>=`...) — يحدد نوع العلاقة بين الحقل والقيمة
3. `<field value>` → قيمة ثابتة يكتبها المستخدم مثل `projectA`
4. `<function>` → دالة جاهزة توفرها `JIRA` مثل `currentUser()` تُعيد قيمة ديناميكية (المستخدم الحالي فعلياً وقت التنفيذ)

**الناتج المتوقع:**
> الجملة الأولى تُرجع كل issues التي مشروعها `projectA`. الجملة الثانية تُرجع كل issues المسندة (assigned) للمستخدم الذي نفّذ الاستعلام حالياً.

#### 💡 التشبيه:
> `currentUser()` أشبه بكلمة "أنا" في جملة يومية — تتغيّر قيمتها الفعلية حسب من يتكلم.
> **وجه الشبه:** `currentUser()` = "أنا" | القيمة الفعلية تتغيّر حسب من ينفذ الاستعلام.

#### مهم للامتحان ⚠️:
> `JQL` تركز على "Where condition section" فقط — لا يوجد فيها `SELECT`/`FROM` كما في `SQL` الكاملة، لأنها مصممة خصيصاً للبحث ضمن الـ Issues.

---

### 2.1. AutoComplete والترتيب الافتراضي (Sorting)

#### النص الأصلي يقول:
> "Basic search queries are usually converted to advanced. These queries are re-represented using JQL. The JIRA environment supports AutoComplete. 15 results are displayed. By default, the resulting values are sorted by key. Sorting can also be based on multiple columns"

#### الشرح المبسّط:
كل استعلام تبنيه بـ `Basic Search` يُترجَم تلقائياً إلى `JQL` — ولهذا يوجد زر `Switch to JQL` كما رأينا سابقاً. بيئة `JIRA` تدعم `AutoComplete` (اقتراح تلقائي للحقول والقيم أثناء الكتابة) وتعرض 15 نتيجة كحد افتراضي في كل صفحة. الترتيب الافتراضي يكون حسب `key` (رقم/معرّف الـ issue مثل `SAM-01`)، لكن يمكن تخصيصه ليكون بحقل آخر (`order by summary ASC, key`) وحتى الترتيب حسب أكثر من عمود معاً.

**لماذا؟** الترتيب الافتراضي بالـ `key` منطقي لأنه يعكس ترتيب الإنشاء الزمني تقريباً، لكن السماح بترتيب مخصص (حسب أكثر من عمود) يمنح المستخدم مرونة في التقارير — مثلاً: رتّب أولاً حسب الأولوية ثم حسب تاريخ الإنشاء داخل كل أولوية.

#### 🔄 قبل / بعد: تغيير الترتيب

**قبل:**
```text
All issues
order by key DESC
```

**بعد:**
```text
All issues
order by summary ASC, key
```

**ماذا تغيّر؟** انتقلنا من ترتيب أحادي المعيار (`key` تنازلياً) إلى ترتيب متعدد المعايير: أولاً أبجدياً حسب `summary`، ثم عند التساوي يُستخدم `key` كمعيار ثانٍ لفض التعادل.

---

### 3. الشروط الزمنية في JQL (Time Conditions)

#### النص الأصلي يقول:
> "One of the most important points in JQL is searching for issues according to specific time conditions. It depends on searching using specific time values. We rely on the following different time functions: Start functions / End functions / Other time functions"

#### الشرح المبسّط:
كثير من الاستعلامات المفيدة عملياً تعتمد على "الزمن" (مثال: "أعطني كل ما استُحدث هذا الأسبوع"). لذلك توفّر `JQL` دوال جاهزة تمثّل نقاطاً زمنية بدل أن تكتب تاريخاً محدداً يدوياً في كل مرة.

**لماذا؟** لو كتبت تاريخاً ثابتاً (`created > "2026-07-01"`) فسيصبح الاستعلام قديماً بعد فترة. أما استخدام دالة مثل `startOfWeek()` فيجعل الاستعلام **ديناميكياً** يُحدَّث تلقائياً كل مرة تُنفّذه.

#### جدول الدوال الزمنية

| الفئة | الدالة | المعنى |
| --- | --- | --- |
| Start functions | `startOfDay` | بداية اليوم |
| Start functions | `startOfWeek` | بداية الأسبوع |
| Start functions | `startOfMonth` | بداية الشهر |
| Start functions | `startOfYear` | بداية السنة |
| End functions | `endOfDay` | نهاية اليوم |
| End functions | `endOfWeek` | نهاية الأسبوع |
| End functions | `endOfMonth` | نهاية الشهر |
| End functions | `endOfYear` | نهاية السنة |
| Other | `now` | الوقت الحالي |
| Other | `currentLogin` | لحظة تسجيل الدخول الحالية |
| Other | `lastLogin` | لحظة تسجيل الدخول السابقة |

#### 💡 التشبيه:
> مثل قولك "منذ بداية الأسبوع" بدل ذكر تاريخ محدد كل مرة تتكلم — الجملة تبقى صحيحة دائماً مهما تغيّر الأسبوع.
> **وجه الشبه:** `startOfWeek()` = "منذ بداية الأسبوع" | التاريخ الثابت = "منذ 1 يوليو 2026" (يصبح خاطئاً لاحقاً).

---

### 3.1. أمثلة JQL — المجموعة الأولى والثانية

#### النص الأصلي يقول:
> "First group: Created before the start of this week - created < startOfWeek(); Created since the beginning of this month - created >= startOfMonth(); Created by the current user - creator = currentUser(). Second group: Whose approval is pending - approval = pending(); Whose approval is pending by user jDoe - approval = pendingBy(jDoe); Not assigned to the current user - assignee != currentUser()"

#### الشرح المبسّط:
هذه أمثلة تطبيقية تربط ما تعلمناه (الحقول، العوامل، الدوال الزمنية) في جمل كاملة وحقيقية الاستخدام.

#### جدول الأمثلة (المجموعة الأولى والثانية)

| # | الطلب بالعربي | جملة JQL |
| --- | --- | --- |
| 1 | أُنشئت قبل بداية هذا الأسبوع | `created < startOfWeek()` |
| 2 | أُنشئت منذ بداية هذا الشهر | `created >= startOfMonth()` |
| 3 | أُنشئت من قبل المستخدم الحالي | `creator = currentUser()` |
| 4 | موافقتها قيد الانتظار | `approval = pending()` |
| 5 | موافقتها قيد الانتظار من قِبل jDoe | `approval = pendingBy(jDoe)` |
| 6 | غير مُسنَدة للمستخدم الحالي | `assignee != currentUser()` |

**لماذا؟** لاحظ الفرق بين `creator` (من أنشأ الـ issue، لا يتغيّر أبداً) و`assignee` (من هو مسؤول حالياً عن تنفيذها، يمكن أن يتغيّر بمرور الوقت) — تمييز هذا الفرق مهم جداً في الأسئلة.

#### الفهم الخاطئ الشائع ❌: `creator` و`assignee` نفس الشيء دائماً
#### الفهم الصحيح ✅: `creator` ثابت لا يتغيّر (من فتح الـ issue)، بينما `assignee` (المسؤول الحالي) يمكن أن يُعاد إسناده لأشخاص متعددين بمرور الوقت

---

### 3.2. أمثلة JQL مع الترتيب (Sorting Support)

#### النص الأصلي يقول:
> "Issues whose due date ends today sorted by creation date descending - due <= endOfDay() order by createdDate desc; Issues whose status is open sorted by due date ascending - status =Open order by dueDate asc"

#### الشرح المبسّط:
هنا نرى كيف يُضاف شرط الترتيب (`order by`) في نهاية جملة الشرط، وليس منفصلاً عنه — الصياغة العامة هي: `<الشرط> order by <الحقل> <asc|desc>`.

| # | الطلب | جملة JQL |
| --- | --- | --- |
| 1 | تاريخ الاستحقاق ينتهي اليوم، مرتّبة تنازلياً حسب تاريخ الإنشاء | `due <= endOfDay() order by createdDate desc` |
| 2 | الحالة مفتوحة، مرتّبة تصاعدياً حسب تاريخ الاستحقاق | `status = Open order by dueDate asc` |

**لماذا؟** الترتيب بعد الشرط منطقي لأن `JQL` أولاً "تُصفّي" (`WHERE`-like)، ثم "تُرتّب" النتائج المصفّاة — نفس الترتيب المنطقي الموجود في `SQL` (`WHERE` ثم `ORDER BY`).

---

### 3.3. الأسماء البديلة (Alias) والعوامل الإضافية

#### النص الأصلي يقول:
> "Some fields have an Alias: created <=> createdDate; due <=> dueDate. Additional operators: was operator - Indicates finding an issue where the field value matched the passed value - Can be negated using not; ~ - Indicates that the text contains a value, i.e. contains - Can be negated using not"

#### الشرح المبسّط:
بعض الحقول لها أكثر من اسم يؤديان نفس المعنى (`created` و`createdDate` مثلاً وجهان لعملة واحدة). وهناك عاملان إضافيان:
- `was`: يبحث عن حالة **سابقة** كان عليها الحقل (وليس حالته الحالية فقط)
- `~`: يبحث عن **احتواء** نص جزئي (مثل `LIKE` في `SQL`)

كلا العاملين يمكن نفيهما باستخدام `not`.

#### جدول Alias

| الاسم الأساسي | الاسم البديل (Alias) |
| --- | --- |
| `created` | `createdDate` |
| `due` | `dueDate` |

#### 💡 التشبيه:
> مثل أن يكون لشخص اسم واسم شهرة — كلاهما يشير لنفس الشخص.
> **وجه الشبه:** `created` و`createdDate` = الاسم الرسمي واسم الشهرة لنفس الحقل.

---

### 3.4. أمثلة على عامل was

#### النص الأصلي يقول:
> "We want to find issues that were assigned to the current user: assignee was currentUser(). We want to find issues that did not transition to the in progress state: status was not "In Progress""

#### الشرح المبسّط:
`assignee was currentUser()` تختلف جوهرياً عن `assignee = currentUser()`: الأولى تعني "كانت مُسندة لي **في وقت ما** من تاريخها حتى لو تغيّر المسؤول الآن"، بينما الثانية تعني "مُسندة لي **الآن حصراً**".

**لماذا؟** هذا الفرق أساسي في تتبع تاريخ الـ issue (Audit)، مثلاً لمعرفة كل ما مرّ يوماً ما على مكتبك حتى لو أُعيد إسناده لاحقاً لشخص آخر.

#### الفهم الخاطئ الشائع ❌: `was` تعني نفس معنى `=`
#### الفهم الصحيح ✅: `was` تفحص **تاريخ** القيمة (كانت كذلك سابقاً)، بينما `=` تفحص القيمة **الحالية فقط**

---

### 4. خصائص عامل was الموسّعة

#### النص الأصلي يقول:
> "The was operation has many features including: was in / was not in for use with more than one value; after the was condition is checked after a specific time period; before the was condition is checked before a specific time period; BY by a specific user; During ("date1","date2") between two dates; On "date" according to a specific date"

#### الشرح المبسّط:
عامل `was` ليس بسيطاً فقط بل يقبل إضافات (modifiers) تجعله دقيقاً جداً:

| الإضافة | المعنى |
| --- | --- |
| `was in` / `was not in` | مقارنة بأكثر من قيمة واحدة معاً |
| `after` | الشرط يُفحص بعد فترة زمنية محددة |
| `before` | الشرط يُفحص قبل فترة زمنية محددة |
| `BY` | حسب مستخدم معيّن (من قام بالتغيير) |
| `During ("date1","date2")` | بين تاريخين محددين |
| `On "date"` | في تاريخ محدد بعينه |

**لماذا؟** لأن السؤال الواقعي غالباً مركّب: "هل كانت هذه الحالة صحيحة، ومتى بالضبط، ومن قام بذلك؟" — هذه الإضافات تجيب على الأبعاد الثلاثة معاً (القيمة + الزمن + الفاعل).

---

### 4.1. عامل is

#### النص الأصلي يقول:
> "is operation: According to the JIRA documentation, this operation only works with fields that accept NULL or EMPTY values. More precisely, only fields that have this value (i.e. do not accept any values other than null or empty). It is negated using is not"

#### الشرح المبسّط:
`is` عامل خاص جداً — لا يُستخدم للمقارنة العامة (استخدم `=` لذلك)، بل فقط للتحقق من أن حقلاً **فارغ (EMPTY)** أو **لا قيمة له (NULL)**. مثال شائع (غير مذكور حرفياً في النص لكنه شرح زيادة للفهم): `resolution is EMPTY` للبحث عن issues غير محلولة بعد.

**لماذا؟** لأن `=` لا يعمل جيداً مع مفهوم "لا شيء" (Null) في أغلب لغات الاستعلام، فتحتاج لعامل مخصص فقط لهذا الغرض المحدد.

#### (شرح زيادة للفهم)
> مثال تطبيقي: `resolution is EMPTY` تعيد كل الـ Issues التي لم تُحل بعد؛ ونفيها `resolution is not EMPTY` يعيد كل ما تم حله.

---

### 4.2. Time Specifiers (محددات الزمن النسبي)

#### النص الأصلي يقول:
> "Time can be handled using time offsets. -2d means 48 hours before this moment. Includes - for previous / + for next. With the following specifiers: y for year, M for month, w for week, d for day, h for hour, m for minute. The full expression is (-|+)nn(y|M|w|d|h|m)"

#### الشرح المبسّط:
بدلاً من استخدام دوال مثل `startOfWeek()`، يمكن كتابة إزاحة زمنية نسبية مباشرة بصيغة قصيرة: علامة (`-` للماضي أو `+` للمستقبل) + رقم + رمز الوحدة.

#### جدول رموز الوحدات الزمنية

| الرمز | الوحدة |
| --- | --- |
| `y` | سنة (year) |
| `M` | شهر (month) — **بحرف كبير** لتمييزه عن `m` (دقيقة) |
| `w` | أسبوع (week) |
| `d` | يوم (day) |
| `h` | ساعة (hour) |
| `m` | دقيقة (minute) |

الصيغة الكاملة: `(-|+)nn(y|M|w|d|h|m)`

#### مهم للامتحان ⚠️:
> `M` (كبير) = شهر، بينما `m` (صغير) = دقيقة. هذا التمييز بحساسية الحالة (Case Sensitive) من أكثر النقاط التي تُستغل في أسئلة الامتحان لتضليل الطالب.

#### 🔍 تتبع التنفيذ: قراءة -2d
**المدخل:** التعبير `-2d` واللحظة الحالية `now`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحديد الإشارة | `-` → إلى الماضي |
| 2 | تحديد المقدار والوحدة | `2` × `d` (يوم) |
| 3 | الحساب | `now - 48 hours` |

**النتيجة:** `-2d` تعني قبل 48 ساعة من هذه اللحظة تماماً.

---

### 4.3. عامل changed

#### النص الأصلي يقول:
> "changed operator: Works to search for fields whose value changed from one value to another - status changed from "In Progress" to "done". It has the following properties (one or more can be used, or none): after / before / BY / During ("date1","date2") / On / from / to"

#### الشرح المبسّط:
`changed` يبحث عن **حدث انتقال** حصل فعلاً لحقل معيّن من قيمة إلى أخرى، وليس فقط عن القيمة الحالية أو أنها "كانت" كذلك يوماً (كما في `was`). الفرق الدقيق: `changed` يركّز على **فعل التغيير نفسه** (متى/من قام به/من أي قيمة إلى أي قيمة)، بينما `was` يركّز على كون القيمة **كانت مطابقة** في وقت ما.

#### ⚙️ الخطوات / الخوارزمية: قراءة جملة changed

#### ما هدف هذه العملية؟
> فهم كيف تُقرأ جملة تستخدم `changed` مع خصائصها الإضافية خطوة بخطوة.

```algorithm
1 | تحديد الحقل | status | الحقل الذي نراقب تغييره
2 | تحديد القيمة القديمة (from) | "In Progress" | الحالة السابقة قبل التغيير
3 | تحديد القيمة الجديدة (to) | "done" | الحالة بعد التغيير
4 | إضافة خصائص اختيارية | after/before/BY/During/On | تُضيّق زمن أو فاعل التغيير
```

#### نقاط التنفيذ:
- يمكن استخدام خاصية واحدة أو أكثر معاً من (`after`, `before`, `BY`, `During`, `On`, `from`, `to`) أو عدم استخدام أي منها
- `from` و`to` تحديداً تخصان تحديد القيمة القديمة والجديدة، بينما البقية تخص الزمن والفاعل

---

### 4.4. أمثلة على changed

#### النص الأصلي يقول:
> "Search for issues where the responsible user changed - assignee changed. Search for issues whose status changed from "Backlog" to "selected for development" by user jDoe - status changed from "Backlog" to "Selected For Development" by jDoe"

#### الشرح المبسّط:
المثال الأول (`assignee changed`) يستخدم `changed` دون أي خصائص إضافية — أي "حدث تغيير في المسؤول عن الـ issue في أي وقت وبأي طريقة". المثال الثاني يستخدم `from`, `to`, و`BY` معاً لتحديد انتقال دقيق جداً بواسطة شخص محدد.

| # | الطلب | جملة JQL |
| --- | --- | --- |
| 1 | تغيّر المسؤول عن الـ issue | `assignee changed` |
| 2 | تغيّرت الحالة من Backlog إلى Selected For Development بواسطة jDoe | `status changed from "Backlog" to "Selected For Development" by jDoe` |

---

### 5. أمثلة JQL المركّبة (Complex Examples)

#### النص الأصلي يقول:
> "We want to display all issues that were moved to the In Progress or Selected For Development status during the past month - status was in ("In Progress","Selected For Development") After -1M; We want to display issues that were created within a period of 72 hours - created > -3d; We want to display issues created since the 15th of the current month whose status is "Selected For Development" - created > startOfMonth(+14d) and status = "Selected For Development""

#### الشرح المبسّط:
هذه أمثلة تدمج عدة مفاهيم معاً في جملة واحدة:

| # | الطلب | جملة JQL | المفاهيم المدموجة |
| --- | --- | --- | --- |
| 1 | انتقلت إلى In Progress أو Selected For Development خلال الشهر الماضي | `status was in ("In Progress","Selected For Development") After -1M` | `was in` + قائمة قيم + `After` + إزاحة زمنية |
| 2 | أُنشئت خلال 72 ساعة | `created > -3d` | إزاحة زمنية نسبية (72 ساعة = 3 أيام) |
| 3 | أُنشئت منذ اليوم 15 من الشهر الحالي وحالتها Selected For Development | `created > startOfMonth(+14d) and status = "Selected For Development"` | دالة زمنية + إزاحة داخلها + `and` |

**لماذا؟** المثال الثالث مهم جداً: `startOfMonth(+14d)` تعني "بداية الشهر + 14 يوماً" = اليوم 15 من الشهر (لأن بداية الشهر هي اليوم رقم 1، و1+14=15). هذا يوضح أن الدوال الزمنية تقبل **وسيطاً** (parameter) للإزاحة الإضافية بداخلها.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا `startOfMonth(+14d)` تُعطي اليوم 15 وليس 14؟
> **لماذا هذا مهم؟** لأن `startOfMonth()` بذاتها = اليوم 1، فإضافة 14 يوماً فوقها = اليوم 15. فهم هذا الحساب "غير المباشر" يمنع خطأ شائعاً بحسبان الرقم داخل الدالة كيوم مباشر في الشهر.

---

### 6. الفلاتر (Filters)

#### النص الأصلي يقول:
> "Filters - Definition: They are searches (which can be JQL queries) saved for quick application. That is, after creating the query, we save it for later use instead of recreating it again"

#### الشرح المبسّط:
`Filter` هو ببساطة استعلام (`JQL` أو غيره) **محفوظ باسم** لإعادة استخدامه لاحقاً دون إعادة كتابته من الصفر. فكّر فيه كـ "اختصار" لاستعلام تستخدمه بشكل متكرر.

**لماذا؟** لتوفير الوقت وتفادي الأخطاء عند تكرار استعلامات معقّدة يومياً (مثل "كل الـ Bugs المفتوحة المسندة لي").

#### 6.1. أنواع خاصة من الفلاتر — Board Filter

#### النص الأصلي يقول:
> "Special types of filters: Board Filter - Every board (regardless of its type) within the board display mechanism has its own filter to display issues matching that Board - For example, this board displays issues related to only one project or two different projects - Related to team A - Or within a specific Sprint"

#### الشرح المبسّط:
كل `Board` (لوحة عرض، سواء `Scrum` أو `Kanban`) في `JIRA` تعمل خلف الكواليس بواسطة **فلتر خاص بها** يحدد أي issues تظهر عليها. مثلاً بورد معيّنة قد تُعرِّف فلترها ليُظهر فقط issues مشروع واحد، أو مشروعين معاً، أو المرتبطة بفريق معيّن، أو ضمن `Sprint` محدد فقط.

**لماذا؟** لأن البورد ليست مجرد عرض عشوائي، بل نافذة **مُصفّاة** بمعايير محددة مسبقاً كي يرى الفريق فقط ما يخصه.

#### 💡 التشبيه:
> مثل نافذة تلفاز مقسّمة على عدة قنوات (Multi-view) لكن كل شاشة فرعية مضبوطة على قناة مختلفة.
> **وجه الشبه:** الـ Board Filter = إعدادات الشاشة الفرعية | المعايير (project/team/sprint) = القناة المختارة لتلك الشاشة.

---

### 7. أنواع الـ Issues (Types of Issues)

#### النص الأصلي يقول:
> "The expression "issue" is an inaccurate expression resulting from translating the word issue from English to Arabic. Not all issues are actually problems, rather: Story represents a requirement from the user's point of view (another name is Feature Request); task is an issue the team works on that is not necessarily directly related to a user requirement... bug is a software weakness that must be fixed; Epic is a large issue that includes sub-issues; subtask is an issue that is part of another issue. You can also generate your own custom issue types"

#### الشرح المبسّط:
كلمة `Issue` في `JIRA` **لا تعني "مشكلة"** بالضرورة، رغم أن ترجمتها الحرفية للعربية "مشكلة" توحي بذلك — هذا خطأ ترجمة شائع تنبّهنا له المحاضرة صراحة. `Issue` هي مصطلح عام يشمل أي "بند عمل" في النظام، وله عدة أنواع فرعية:

| النوع | التعريف | مثال (شرح زيادة للفهم) |
| --- | --- | --- |
| `Story` | متطلب من وجهة نظر المستخدم (يُسمى أيضاً Feature Request) | "كمستخدم، أريد تسجيل الدخول ببصمتي" |
| `Task` | عمل يقوم به الفريق دون أن يرتبط مباشرة بمتطلب مستخدم | بناء آلية إدارة مستخدمين لم يطلبها العميل صراحة لكنها ضرورية |
| `Bug` | ضعف/خلل برمجي يجب إصلاحه | زر لا يعمل بشكل صحيح |
| `Epic` | issue كبير يضم issues فرعية | "إعادة تصميم نظام الدفع بالكامل" |
| `Subtask` | جزء من issue آخر | خطوة تقنية ضمن Story أكبر |

**لماذا؟** التمييز بين هذه الأنواع يسمح لفريق العمل بتنظيم أعماله بدقة: `Story` تخبرك "ماذا يريد المستخدم"، `Task` تخبرك "ماذا يجب أن يُنجَز تقنياً حتى لو لم يطلبه أحد"، و`Bug` يخبرك "ما الذي انكسر ويجب إصلاحه".

#### مهم للامتحان ⚠️:
> `Issue` ليست بالضرورة "مشكلة" — هذه ترجمة مضلِّلة. `Issue` = أي بند عمل عام (Story/Task/Bug/Epic/Subtask/نوع مخصص).

---

### 7.1. لماذا نحتاج أنواع Issue مختلفة؟

#### النص الأصلي يقول:
> "Why Issue Types? Supports different types of work items. Usually the team has more than one type of work. Each type has different fields, screens, and workflows. You may want bugs to appear at the top of the project board. Reports can be configured separately for each type. Example: a report on the number of bugs fixed in the previous week"

#### الشرح المبسّط:
كل نوع من الـ `Issue` له **حقول مختلفة** (`fields`)، **شاشات مختلفة** (`screens`) لعرض تلك الحقول، و**مسار عمل مختلف** (`workflow`) يمر به. مثال عملي مذكور صراحة: قد تريد أن تظهر `Bugs` دائماً في أعلى لوحة المشروع (لأولويتها العاجلة)، وأن تُبنى تقارير خاصة لكل نوع على حدة — مثل تقرير "عدد الـ Bugs التي أُصلحت الأسبوع الماضي".

**لماذا؟** لأن معاملة كل بنود العمل بنفس الطريقة (نفس الحقول، نفس الشاشة، نفس المسار) غير منطقي عملياً: خطأ برمجي (`Bug`) يحتاج حقولاً مثل "خطورة الخلل" (Severity) لا تحتاجها `Story` عادية، وأولوية عرضه مختلفة أيضاً.

#### جدول: لماذا التنويع مفيد

| الفائدة | مثال تطبيقي |
| --- | --- |
| حقول مختلفة لكل نوع | Bug يحتاج حقل "Severity"، Story لا يحتاجه بالضرورة |
| شاشات مختلفة | واجهة إدخال Bug تختلف عن واجهة إدخال Epic |
| Workflow مختلف | مسار اعتماد Story قد يمر بمراجعة منتج، بينما Bug يمر بمراجعة تقنية فقط |
| ترتيب عرض مخصص | Bugs تظهر أعلى البورد لعجالتها |
| تقارير منفصلة | تقرير أسبوعي لعدد الـ Bugs المُصلحة فقط |

---

### 8. الـ Subtasks بالتفصيل

#### النص الأصلي يقول:
> "Subtasks: An issue type that must have a main (parent) issue. Allows dividing the issue into individual tasks that can be managed easily. May include technical details not present in the parent issue. For example: If the parent issue is a "User Story", it may be written in non-technical language understood by team members and stakeholders. While Subtasks can be written for technical personnel in specialized technical language. Parent issue: such as the user story or main task. Subtasks: technical or implementation details that concern developers/the technical team"

#### الشرح المبسّط:
`Subtask` هو **إلزامياً** جزء من issue أب (`parent`) — لا يمكن أن يوجد بمفرده. فائدته: تقسيم عمل كبير إلى مهام فرعية صغيرة يسهل إدارتها وتتبعها كل واحدة على حدة. الفرق المهم: الـ `parent` (مثل `User Story`) عادة يُكتب بلغة مفهومة لغير التقنيين (أصحاب المصلحة/العميل)، بينما الـ `Subtasks` يمكن كتابتها بلغة تقنية متخصصة يفهمها المطوّرون فقط.

**لماذا؟** لأن أصحاب المصلحة (Stakeholders) يهتمون بـ"ماذا سيحصل المستخدم في النهاية" (لغة الـ Story)، بينما المطوّرون يهتمون بـ"كيف سننفذ ذلك تقنياً خطوة بخطوة" (لغة الـ Subtask).

#### 💡 التشبيه:
> مثل وصفة طبخ: العنوان (`Parent = User Story`) يقول "كعكة شوكولاتة لذيذة" بلغة مفهومة للجميع، بينما الخطوات التفصيلية (`Subtasks`) تحتوي تعليمات دقيقة (درجة حرارة الفرن، وزن الدقيق بالغرام) يفهمها الطاهي المتمرّس فقط.
> **وجه الشبه:** عنوان الوصفة = الـ Story | خطوات التحضير الدقيقة = الـ Subtasks.

---

### 8.1. خصائص Subtasks الإضافية

#### النص الأصلي يقول:
> "Subtasks: Have their own issue key and independent fields. Follow an independent workflow with special stages. Move on the project board separately from the parent issue"

#### الشرح المبسّط:
رغم أن الـ `Subtask` تابع لأب، إلا أنه **مستقل إدارياً**: له معرّف (`key`) خاص به منفصل عن الأب، وله حقوله الخاصة، ومسار عمل (`workflow`) خاص بمراحله، بل ويتحرك على لوحة المشروع بشكل مستقل عن الأب (قد يكون الأب "قيد التنفيذ" بينما إحدى الـ Subtasks التابعة له "منتهية" والأخرى "لم تبدأ بعد").

**لماذا؟** لأن الاستقلالية هنا ضرورية عملياً: مهمة فرعية واحدة قد ينتهي منها مطوّر بينما الآخرون ما زالوا يعملون على مهام فرعية أخرى تابعة لنفس الأب — فلو لم يكن لكل subtask حالتها الخاصة، لما استطعنا تتبع التقدم الفعلي بدقة.

#### جدول خصائص Subtask

| الخاصية | التفصيل |
| --- | --- |
| العلاقة بالأب | إلزامية — لا يمكن أن يوجد Subtask بلا parent |
| Key | مستقل خاص به (وليس نفس مفتاح الأب) |
| الحقول | مستقلة عن حقول الأب |
| Workflow | مستقل، له مراحله الخاصة |
| الحركة على البورد | منفصلة عن حركة الأب |

---

### 9. مخطط أنواع الـ Issues (Issue Type Schema)

#### النص الأصلي يقول:
> "The Issue Type Schema defines the issue types applied to this project. To change the issue types used: You can choose a different issue type schema - Or modify the currently selected schema. From Project Settings -> Issue Types. Each issue type can contain: Its own workflow - Custom field configuration - Unique screen schema"

#### الشرح المبسّط:
`Issue Type Schema` هو الإعداد الذي **يحدد أي أنواع issues مسموح استخدامها في مشروع معيّن**. لتغييره لديك خياران: (1) اختيار مخطط جاهز مختلف بالكامل، أو (2) تعديل المخطط الحالي نفسه. مكان الإعداد: `Project Settings -> Issue Types`. وكل نوع issue داخل هذا المخطط يمكن أن يحمل: `workflow` خاص به + إعداد حقول مخصصة + مخطط شاشة (`screen schema`) فريد.

**لماذا؟** لأن كل مشروع قد يحتاج مجموعة أنواع مختلفة (مشروع دعم فني قد لا يحتاج `Epic` مثلاً، بينما مشروع تطوير كبير يحتاجه)، لذا يجب أن يكون هذا الإعداد **قابلاً للتخصيص لكل مشروع على حدة**.

#### ⚙️ الخطوات / الخوارزمية: تغيير أنواع الـ Issues المستخدمة في مشروع

#### ما هدف هذه العملية؟
> تحديد أو تعديل أنواع الـ Issues التي يمكن إنشاؤها ضمن مشروع معيّن في JIRA.

```algorithm
1 | الدخول إلى الإعدادات | Project Settings -> Issue Types | فتح صفحة إعداد أنواع الـ issues للمشروع
2 | اتخاذ القرار | المستخدم | اختيار "مخطط مختلف جاهز" أو "تعديل المخطط الحالي"
3 | التطبيق (خيار أ) | Issue Type Schema جاهز | استبدال المخطط الحالي بمخطط آخر بالكامل
4 | التطبيق (خيار ب) | تعديل مباشر | إضافة/حذف أنواع ضمن المخطط الحالي نفسه
5 | تخصيص كل نوع | Workflow + Field Config + Screen Schema | كل issue type يحصل على سلوكه وحقوله وشاشته الخاصة
```

#### نقاط التنفيذ:
- تعديل المخطط الحالي يؤثر مباشرة على المشروع دون الحاجة لإنشاء مخطط جديد بالكامل
- كل نوع issue ضمن المخطط مستقل تماماً في (workflow / fields / screen) عن الأنواع الأخرى

---

### 10. آليات إعداد الـ Issue الإضافية

#### النص الأصلي يقول:
> "Among the issue configuration mechanisms: Defining Labels, Defining the issue display mechanism and the fields to display through the screen, Custom fields"

#### الشرح المبسّط:
بالإضافة لكل ما سبق، توفر `JIRA` آليات إعداد أخرى للـ `Issue`:
- **Labels**: وسوم نصية حرة تُلصق بالـ issue لتصنيفه أو تجميعه بسهولة خارج نظام الأنواع الرسمي
- **آلية عرض الـ Issue والحقول عبر الشاشة (Screen)**: تحديد أي حقول تظهر فعلياً عند عرض/تعديل issue معيّن
- **Custom Fields**: حقول مخصصة يُنشئها المستخدم بنفسه لا توجد افتراضياً في `JIRA` (مثال شرح زيادة للفهم: حقل "رمز العميل" الخاص بمنظمة معينة)

**لماذا؟** لأن الحقول الجاهزة في `JIRA` لا تغطي كل احتياجات كل فريق أو منظمة، فتوفير `Custom Fields` وإعدادات العرض يمنح مرونة كافية لتكييف النظام مع أي سياق عمل.

#### 💡 التشبيه:
> مثل الوسوم (Tags) في منشورات مواقع التواصل — لا تنتمي لتصنيف رسمي جامد، لكنها تساعد على التجميع والبحث السريع.
> **وجه الشبه:** `Label` في JIRA = `Tag`/`Hashtag` في منصات التواصل الاجتماعي.

### الأفكار الرئيسية الشاملة
> لا توجد أفكار محورية إضافية لم تُغطَّ أعلاه — تمت تغطية كل نقطة وردت حرفياً في شرائح المحاضرة (آليات البحث الخمس، JQL بكامل عوامله ودوالّه الزمنية، الفلاتر، أنواع Issues، الـ Subtasks، ومخطط أنواع الـ Issue).

---

## الجزء الثاني: ملخص منظم

### جدول التعريفات

| المصطلح | التعريف |
| --- | --- |
| `Quick Search` | بحث نصي بسيط في صندوق أعلى قائمة issues، يدعم `NOT`/`OR` |
| `Basic Search` | شريط فلاتر مرئي يُترجم تلقائياً إلى JQL |
| `Advanced Search` | بحث مباشر بلغة `JQL` |
| `JQL` | لغة استعلام تشبه SQL، تركّز على شرط الـ WHERE فقط |
| `Filter` | استعلام محفوظ بالاسم لإعادة الاستخدام |
| `Board Filter` | فلتر خاص بكل لوحة عرض يحدد أي issues تظهر عليها |
| `Issue` | بند عمل عام (ليس بالضرورة "مشكلة") |
| `Story` | متطلب من وجهة نظر المستخدم (Feature Request) |
| `Task` | عمل للفريق غير مرتبط مباشرة بطلب مستخدم |
| `Bug` | خلل برمجي يجب إصلاحه |
| `Epic` | issue كبير يضم issues فرعية |
| `Subtask` | issue تابع إلزامياً لـ parent issue |
| `Issue Type Schema` | إعداد يحدد أنواع الـ issues المسموحة في مشروع |

### جدول المكونات (عناصر واجهة Basic Search)

| العنصر | الوظيفة |
| --- | --- |
| `Project` | تصفية حسب المشروع |
| `Type` | تصفية حسب نوع issue |
| `Status` | تصفية حسب الحالة |
| `Assignee` | تصفية حسب المسؤول |
| `More` | فلاتر إضافية |
| `Switch to JQL` | تحويل نفس الاستعلام إلى صياغة JQL نصية |

### جدول مقارنات (آليات البحث الخمس)

| الآلية | القوة | الواجهة | متى تُستخدم |
| --- | --- | --- | --- |
| `Quick Search` | ضعيفة | صندوق نص فوق القائمة | بحث سريع عابر بكلمة |
| `Basic Search` | متوسطة | فلاتر مرئية (Dropdowns) | بحث يومي بمعايير بسيطة |
| `Advanced Search (JQL)` | قوية جداً | نص حر بصياغة JQL | استعلامات معقّدة، تقارير، أتمتة |
| `Filters` | (حفظ) | استعلام محفوظ | إعادة استخدام استعلام متكرر |
| `Quick Filters` | سريعة | أزرار جاهزة على البورد | تصفية سريعة أثناء العمل اليومي على البورد |

### جدول عوامل ودوال JQL

| العامل/الدالة | المعنى |
| --- | --- |
| `=` | مساواة مباشرة (القيمة الحالية) |
| `!=` | عدم مساواة |
| `<` `>` `<=` `>=` | مقارنة (خصوصاً للتواريخ) |
| `was` | كانت القيمة كذلك في وقت ما (تاريخياً) |
| `was in` / `was not in` | مقارنة `was` بأكثر من قيمة |
| `~` | يحتوي نصاً جزئياً (contains) |
| `changed` | حدث انتقال فعلي من قيمة لأخرى |
| `is` / `is not` | يعمل فقط مع NULL/EMPTY |
| `currentUser()` | المستخدم المنفّذ للاستعلام حالياً |
| `startOfDay/Week/Month/Year` | بداية فترة زمنية |
| `endOfDay/Week/Month/Year` | نهاية فترة زمنية |
| `now` | اللحظة الحالية |
| `currentLogin` / `lastLogin` | لحظة الدخول الحالية / السابقة |

### جدول مصطلحات (رموز الإزاحة الزمنية)

| الرمز | الوحدة | ملاحظة |
| --- | --- | --- |
| `y` | سنة | |
| `M` | شهر | حرف كبير — يختلف عن `m` |
| `w` | أسبوع | |
| `d` | يوم | |
| `h` | ساعة | |
| `m` | دقيقة | حرف صغير — يختلف عن `M` |

### جدول أخطاء شائعة

| الخطأ الشائع | التصحيح |
| --- | --- |
| الخلط بين `M` (شهر) و`m` (دقيقة) | `M` كبير=شهر، `m` صغير=دقيقة، حساسة لحالة الأحرف |
| اعتبار `assignee = X` و`assignee was X` نفس الشيء | `=` تفحص الحالة الحالية فقط، `was` تفحص التاريخ الكامل للقيمة |
| اعتبار `Issue` تعني "مشكلة" حرفياً | `Issue` بند عمل عام يشمل Story/Task/Bug/Epic/Subtask |
| استخدام `is` كبديل عام لـ `=` | `is` تعمل فقط مع NULL/EMPTY، وليس أي قيمة |
| نسيان أن Basic Search هو تمثيل مرئي لـ JQL فقط | كل استعلام Basic Search يُترجم تلقائياً لجملة JQL خلف الكواليس |
| الاعتقاد أن Subtask يشارك نفس الـ key مع الأب | لكل Subtask مفتاح (key) مستقل خاص به |

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: قراءة نتيجة Quick Search بعامل NOT/OR
```algorithm
1 | كتابة الكلمة الأساسية | صندوق البحث | تحديد الأساس المشترك (مثال: item)
2 | إضافة عامل منطقي | NOT / OR | NOT يستبعد، OR يوسّع المجموعة
3 | تنفيذ البحث | JIRA Quick Search | عرض قائمة Issues المطابقة للمنطق الناتج
```

#### ⚙️ الخطوات / الخوارزمية: تحويل Basic Search إلى JQL
```algorithm
1 | اختيار المعايير | القوائم المنسدلة (Project/Type/Status/Assignee/More) | بناء شرط بصري
2 | الترجمة التلقائية | محرك JIRA الداخلي | تحويل الاختيارات لجملة JQL مكافئة
3 | الاطلاع على الجملة | زر Switch to JQL | عرض نص JQL الناتج للمستخدم
```

#### ⚙️ الخطوات / الخوارزمية: تغيير أنواع الـ Issues في مشروع
```algorithm
1 | الدخول إلى الإعدادات | Project Settings -> Issue Types | فتح صفحة المخطط
2 | القرار | اختيار مخطط جاهز أو تعديل الحالي | تحديد أسلوب التغيير
3 | التخصيص | Workflow / Fields / Screen لكل نوع | ضبط سلوك كل issue type بشكل مستقل
```

### أنماط الأكواد (Query Patterns)

| النمط | الصياغة العامة |
| --- | --- |
| شرط بسيط بقيمة | `<field> <operator> <value>` |
| شرط بدالة | `<field> <operator> <function()>` |
| شرط زمني نسبي | `<field> <operator> (-|+)nn(y|M|w|d|h|m)` |
| ترتيب النتائج | `<condition> order by <field> <asc|desc>` |
| ترتيب متعدد الأعمدة | `order by <field1> <asc>, <field2>` |
| شرط was موسّع | `<field> was <value> [after/before/BY/During/On]` |
| شرط changed موسّع | `<field> changed [from <v1>] [to <v2>] [BY <user>]` |

### أنماط التعامل (Best Practices)

- استخدم `startOfWeek()`/`startOfMonth()` بدل تواريخ ثابتة لضمان استعلام ديناميكي دائم الصلاحية
- ميّز دوماً بين `creator` (لا يتغيّر) و`assignee` (قابل للتغيير)
- استخدم `was` عندما يهمك **التاريخ الكامل** للقيمة، و`=` عندما يهمك **الوضع الحالي فقط**
- احفظ أي استعلام JQL تستخدمه بتكرار كـ `Filter` بدل إعادة كتابته
- افصل الحقول التقنية إلى `Subtasks` منفصلة عن الـ `Story` الأصلية لتسهيل قراءتها على أصحاب المصلحة

### الأفكار الشاملة
> تدور محاضرة اليوم حول فكرتين رئيسيتين مترابطتين: (1) قوة `JQL` كنواة موحّدة تقف خلف كل آليات البحث في JIRA (حتى Basic Search هي واجهة مرئية له)، و(2) مرونة نظام أنواع الـ Issues (Story/Task/Bug/Epic/Subtask) في التعبير عن طبيعة العمل الحقيقية للفريق، مع إمكانية تخصيص كل نوع بحقوله ومساره الخاص عبر `Issue Type Schema`.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25% (4 أسئلة) / سيناريو كود 35% (5-6 أسئلة) / تطبيق 30% (5 أسئلة) / تتبع خوارزمية 10% (1-2 سؤال).

### السؤال 1 (متوسط)
ما الفرق الجوهري بين `Basic Search` و`Advanced Search` في JIRA؟
أ) لا فرق، كلاهما نفس الشيء بواجهتين مختلفتين
ب) `Basic Search` تمثيل مرئي لـ `JQL`، بينما `Advanced Search` هو كتابة `JQL` مباشرة
ج) `Basic Search` أقوى من `Advanced Search`
د) `Advanced Search` لا يدعم الفلاتر بينما `Basic Search` يدعمها
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة تنص صراحة أن `Basic Search` "considered a visual representation of JQL"، أي أنه واجهة رسومية تُترجم لنفس لغة `Advanced Search`. (أ) خطأ لأن الفرق موجود في طريقة الإدخال والقوة. (ج) عكس الصحيح تماماً — `Advanced` أقوى. (د) غير صحيح، فكلاهما يمكن حفظه كفلتر.

### السؤال 2 (سهل)
ماذا يفعل عامل `NOT` في `Quick Search`؟
أ) يوسّع نطاق النتائج
ب) يستبعد النتائج المطابقة للكلمة التالية له
ج) يرتّب النتائج تنازلياً
د) لا يُستخدم في Quick Search إطلاقاً
**الإجابة الصحيحة: ب**
**التعليل:** كما في المثال `item NOT 1` الذي قلّص النتائج من 3 إلى 2. (أ) هذا وصف `OR` وليس `NOT`. (ج) الترتيب لا علاقة له بـ `NOT`. (د) خطأ فالنص يذكر صراحة أن Quick Search يقبل `NOT`.

### السؤال 3 (متوسط)
ما الفرق بين `assignee = currentUser()` و`assignee was currentUser()`؟
أ) لا فرق، كلاهما يبحث عن نفس النتائج
ب) الأولى تفحص فقط القيمة الحالية، والثانية تفحص إن كانت القيمة صحيحة في أي وقت من تاريخ الـ issue
ج) الأولى تعمل فقط مع الأرقام
د) الثانية تعمل فقط مع الحقول الفارغة
**الإجابة الصحيحة: ب**
**التعليل:** `=` يقارن الحالة الحالية فقط، بينما `was` (كما ورد صراحة) يبحث في التاريخ الكامل للقيمة. (ج) لا علاقة بالأرقام. (د) هذا وصف عامل `is` وليس `was`.

### السؤال 4 (صعب) — سيناريو كود
لديك الاستعلام التالي:
```text
status was in ("In Progress","Selected For Development") After -1M
```
ماذا يبحث هذا الاستعلام تحديداً؟
أ) الـ issues التي حالتها الآن In Progress فقط
ب) الـ issues التي انتقلت في وقت ما خلال آخر شهر إلى إحدى الحالتين In Progress أو Selected For Development
ج) الـ issues التي أُنشئت خلال شهر واحد
د) خطأ في الصياغة، `was in` لا تُستخدم مع `After`
**الإجابة الصحيحة: ب**
**التعليل:** `was in` تبحث في القيم التاريخية لأكثر من حالة معاً، و`After -1M` يقيّد الفحص لآخر شهر فقط. (أ) يتجاهل الطابع التاريخي لـ `was`. (ج) يخلط بين حالة الحقل وتاريخ الإنشاء. (د) خطأ فالمحاضرة تذكر صراحة أن `After` من خصائص `was` المدعومة.

### السؤال 5 (متوسط) — سيناريو كود
ما ناتج تنفيذ `created > -3d` من ناحية الفترة الزمنية بالساعات؟
أ) آخر 24 ساعة
ب) آخر 48 ساعة
ج) آخر 72 ساعة
د) آخر أسبوع كامل
**الإجابة الصحيحة: ج**
**التعليل:** كما جاء حرفياً في المحاضرة: "issues that were created within a period of 72 hours - created > -3d"، و3 أيام = 72 ساعة. (أ) و(ب) قيم أصغر خاطئة. (د) الأسبوع أكبر بكثير من 3 أيام.

### السؤال 6 (صعب) — سيناريو كود
عبارة `startOfMonth(+14d)` تشير إلى أي يوم من الشهر؟
أ) اليوم 14
ب) اليوم 15
ج) اليوم 1
د) اليوم 30
**الإجابة الصحيحة: ب**
**التعليل:** `startOfMonth()` تمثّل اليوم 1، فإضافة 14 يوماً فوقها = اليوم 15 (1+14=15). (أ) يتجاهل أن نقطة البداية هي اليوم 1 وليس صفر. (ج) هذا هو `startOfMonth()` بلا إضافة. (د) لا علاقة رياضية بهذا الرقم.

### السؤال 7 (سهل)
أي عامل في JQL يُستخدم حصراً مع الحقول التي تقبل NULL أو EMPTY؟
أ) `=`
ب) `~`
ج) `is`
د) `changed`
**الإجابة الصحيحة: ج**
**التعليل:** النص يذكر صراحة أن `is` "only works with fields that accept NULL or EMPTY values". (أ) عامل مساواة عام. (ب) عامل احتواء نصي. (د) عامل تتبع انتقال قيمة.

### السؤال 8 (متوسط)
ما الفرق بين `~` و`=` في JQL؟
أ) لا فرق
ب) `~` تبحث عن احتواء نص جزئي (contains)، بينما `=` تتطلب تطابقاً تاماً
ج) `~` تعمل فقط مع التواريخ
د) `=` أقوى من `~` في كل الحالات
**الإجابة الصحيحة: ب**
**التعليل:** النص يصف `~` بأنها "Indicates that the text contains a value, i.e. contains". (ج) لا علاقة لها بالتواريخ تحديداً. (د) لا مقارنة قوة مباشرة، الاثنان لهما استخدام مختلف.

### السؤال 9 (صعب) — سيناريو كود
ما الفرق الدقيق بين `assignee changed` و`status changed from "Backlog" to "Selected For Development" by jDoe`؟
أ) الأول عام دون تحديد قيم أو فاعل، والثاني محدد بقيمتين وفاعل معيّن
ب) لا فرق، كلاهما لهما نفس درجة التحديد
ج) الأول يستخدم `was` بينما الثاني يستخدم `changed`
د) الثاني لا يستخدم `changed` أساساً
**الإجابة الصحيحة: أ**
**التعليل:** `assignee changed` بلا أي خاصية إضافية يعني "تغيّر في أي وقت بأي طريقة"، بينما المثال الثاني يحدد القيمة القديمة (`from`) والجديدة (`to`) والفاعل (`by`). (ج) و(د) كلاهما يستخدمان `changed` فعلياً.

### السؤال 10 (متوسط) — تطبيق
مدير مشروع يريد أن تظهر issues أنواع الـ `Bug` دائماً في أعلى لوحة المشروع، وأن يحصل على تقرير أسبوعي منفصل لعدد الـ Bugs المُصلحة. ما السبب البنيوي الذي يجعل هذا ممكناً في JIRA؟
أ) لأن كل Issue Type له إعدادات عرض وتقارير مستقلة عن الأنواع الأخرى
ب) لأن كل الأنواع تتشارك نفس الإعدادات إجبارياً
ج) لأن Bug نوع خاص لا يخضع لنظام Issue Types
د) لأن هذا غير ممكن فعلياً في JIRA
**الإجابة الصحيحة: أ**
**التعليل:** النص يذكر صراحة أن لكل نوع "different fields, screens, and workflows" وأن "reports can be configured separately for each type"، وهذا يفسر بنيوياً كلا الطلبين. (ب) عكس الحقيقة. (ج) Bug نوع issue عادي ضمن النظام. (د) الفكرة مذكورة كمثال في المحاضرة نفسها.

### السؤال 11 (سهل)
أي من التالي **ليس** من أنواع الـ Issues المذكورة في المحاضرة؟
أ) Story
ب) Epic
ج) Sprint
د) Subtask
**الإجابة الصحيحة: ج**
**التعليل:** `Sprint` مفهوم إدارة زمنية (Agile)، وليس نوع Issue. الأنواع المذكورة هي Story, Task, Bug, Epic, Subtask.

### السؤال 12 (صعب) — تطبيق
فريق يعمل على `Epic` بعنوان "إعادة تصميم نظام الدفع"، وتحته Story واحدة "كمستخدم أريد الدفع ببطاقتي الائتمانية" مقسّمة لعدة Subtasks تقنية. ما العبارة الصحيحة حول حالة تقدّم هذه العناصر؟
أ) يجب أن تكون كل الـ Subtasks بنفس الحالة تماماً دائماً
ب) يمكن أن تكون كل Subtask في حالة مختلفة، لأن حركتها على البورد مستقلة عن الأب
ج) الـ Subtasks تتحرك فقط عندما يتحرك الأب معها إجبارياً
د) الـ Epic لا يمكن أن يحتوي Story واحدة فقط
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة "Move on the project board separately from the parent issue". (أ) و(ج) يعاكسان هذه الاستقلالية المذكورة صراحة. (د) لا قيد مذكور على عدد الـ Stories تحت Epic.

### السؤال 13 (متوسط) — مقارنة
أي عبارة صحيحة بخصوص لغة الحقول المستخدمة في Story مقابل Subtask؟
أ) كلاهما يُكتب بنفس اللغة التقنية دائماً
ب) Story تُكتب بلغة مفهومة لأصحاب المصلحة، والSubtask يمكن كتابتها بلغة تقنية متخصصة
ج) Subtask دائماً غير تقنية، والStory دائماً تقنية بحتة
د) لا علاقة بين لغة الحقول ونوع الـ Issue
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح صراحة هذا الفرق كمثال أساسي على استخدام Subtasks. (أ)، (ج)، (د) جميعها تعاكس أو تتجاهل النص الصريح.

### السؤال 14 (صعب) — تتبع خوارزمية
عند تغيير أنواع الـ Issues المستخدمة في مشروع، ما الترتيب الصحيح للخيارات المتاحة حسب المحاضرة؟
أ) يمكن فقط إنشاء مخطط جديد من الصفر
ب) يمكن اختيار مخطط مختلف جاهز أو تعديل المخطط الحالي، عبر Project Settings -> Issue Types
ج) لا يمكن تعديل هذا الإعداد بعد إنشاء المشروع
د) التغيير يتم فقط من إعدادات النظام العامة وليس إعدادات المشروع
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة كلا الخيارين (اختيار مخطط مختلف / تعديل الحالي) وموقعهما بالتحديد. (أ)، (ج)، (د) تناقض النص المباشر.

### السؤال 15 (متوسط) — تطبيق
ما الترتيب الافتراضي لنتائج `Advanced Search` في JIRA عندما لا يُحدَّد المستخدم أي `order by`؟
أ) حسب تاريخ الإنشاء تصاعدياً
ب) حسب الـ `key` (المعرّف)
ج) حسب الأولوية
د) بلا أي ترتيب محدد (عشوائي)
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة "By default, the resulting values are sorted by key". باقي الخيارات غير مذكورة كافتراضي.

### السؤال 16 (صعب) — سيناريو كود
أي جملة JQL صحيحة تعبّر عن: "الحقل status انتقل من قيمة إلى أخرى بواسطة مستخدم معيّن خلال فترة تاريخية محددة"؟
أ) `status = "In Progress" and creator = jDoe`
ب) `status changed from "X" to "Y" BY jDoe During ("date1","date2")`
ج) `status was "X" and status was "Y"`
د) `status ~ "changed"`
**الإجابة الصحيحة: ب**
**التعليل:** يجمع هذا الاستعلام `changed` مع `from`/`to` (القيمتان) و`BY` (الفاعل) و`During` (الفترة الزمنية) بشكل صحيح مطابق لما ورد في المحاضرة عن خصائص `changed`. (أ) لا يعبّر عن الانتقال الفعلي. (ج) صياغة غير منطقية لـ `was`. (د) `~` لا علاقة له بهذا المعنى.

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (منطقية - logic)

**الكود (يحتوي خطأ):**
```text
created > startOfWeek() and created < startOfMonth()
```
**اكتشف الخطأ:** المطلوب فعلياً "منذ بداية هذا الأسبوع" فقط (شرط واحد)، لكن الاستعلام أضاف شرطاً منطقياً ثانياً (`created < startOfMonth()`) يتناقض غالباً مع الأول إذا كان الأسبوع الحالي يقع بعد بداية الشهر، مما يُنتج نتائج فارغة أو خاطئة دون داعٍ.

**التصحيح:**
```text
created >= startOfWeek()
```
**شرح الحل:**
1. الاستعلام الأصلي في المحاضرة يستخدم شرطاً واحداً بسيطاً للتعبير عن "منذ بداية الأسبوع"
2. إضافة شرط `AND` غير ضروري يعقّد المنطق ويقلّص النتائج بشكل غير مقصود
3. استخدام `>=` بدل `>` أدق لتضمين اللحظة الأولى تماماً من بداية الأسبوع

### سؤال تصحيح 2 (سوء فهم - misconception)

**الكود (يحتوي خطأ):**
```text
created > -3M
```
**اكتشف الخطأ:** المطلوب "أُنشئت خلال فترة 72 ساعة" لكن الكود استخدم `M` (شهر) بدل `d` (يوم)، فأصبح الاستعلام يعني "آخر 3 أشهر" بدلاً من "آخر 72 ساعة (3 أيام)" — خلط كلاسيكي ناتج عن سوء فهم حساسية حالة الأحرف.

**التصحيح:**
```text
created > -3d
```
**شرح الحل:**
1. `d` (صغير) تعني يوم، بينما `M` (كبير) تعني شهر — هذا فرق حاسم بحساسية حالة الأحرف
2. 3 أيام = 72 ساعة، وهذا يطابق النص الأصلي للمحاضرة تماماً
3. استخدام الرمز الخاطئ يوسّع النتائج بشكل هائل وغير مقصود (3 أشهر بدل 3 أيام)

### سؤال تصحيح 3 (فحص القيمة المرجعة - return_check)

**الكود (يحتوي خطأ):**
```text
resolution = EMPTY
```
**اكتشف الخطأ:** استخدام `=` مع قيمة `EMPTY` غير صحيح وفق قواعد JQL؛ فحسب النص، فحص القيم الفارغة/الخالية يتطلب عامل `is` وليس `=`، لأن `=` مخصص للمقارنة بقيم فعلية وليس بحالة "لا قيمة".

**التصحيح:**
```text
resolution is EMPTY
```
**شرح الحل:**
1. النص يذكر صراحة أن عامل `is` مخصص فقط للحقول التي تقبل NULL أو EMPTY
2. استخدام `=` بدل `is` مع EMPTY قد لا يُرجع النتائج الصحيحة أو يُعامل بشكل مختلف عن المتوقع
3. القاعدة العامة: أي فحص لـ "لا قيمة" (Null/Empty) يجب أن يستخدم `is`/`is not`، وأي فحص لقيمة فعلية يستخدم `=`/`!=`

### سؤال تصحيح 4 (كود ميت - dead_code)

**الكود (يحتوي خطأ):**
```text
status = Open order by dueDate asc order by createdDate desc
```
**اكتشف الخطأ:** يحتوي الاستعلام على جزأين من `order by` في نفس الجملة، وهو غير مسموح به في JQL — الجزء الثاني (`order by createdDate desc`) هو فعلياً "كود ميت" أو تكرار غير صالح لن يُنفَّذ بشكل صحيح لأن الصياغة الصحيحة تسمح بترتيب واحد فقط قد يتضمن عدة أعمدة بداخله.

**التصحيح:**
```text
status = Open order by dueDate asc, createdDate desc
```
**شرح الحل:**
1. الصياغة الصحيحة لترتيب متعدد الأعمدة تكون بفاصلة داخل نفس `order by` وليس بتكرار الكلمة المفتاحية
2. هذا يطابق ما ورد في المحاضرة عن الترتيب متعدد الأعمدة (`order by summary ASC, key`)
3. تكرار `order by` يُعد بنية زائدة/خاطئة يجب إزالتها تماماً

### سؤال تصحيح 5 (منطقية - logic)

**الكود (يحتوي خطأ):**
```text
assignee = currentUser() and creator = currentUser()
```
**اكتشف الخطأ:** إذا كان الهدف الفعلي هو "issues المسندة للمستخدم الحالي أو التي أنشأها" (بحث موسّع)، فاستخدام `and` هنا يضيّق النتائج بشكل خاطئ ليشمل فقط الحالات التي يكون فيها المستخدم **كلا الاثنين معاً** (المُنشئ والمسؤول في نفس الوقت)، بينما الأغلب أنه يريد اتحاد الحالتين.

**التصحيح:**
```text
assignee = currentUser() or creator = currentUser()
```
**شرح الحل:**
1. `and` يتطلب تحقق الشرطين معاً على نفس الـ issue، بينما `or` يكفي تحقق أحدهما
2. التمييز بين `creator` (لا يتغيّر) و`assignee` (متغيّر) يعني أن حالات كثيرة تكون فيها القيمتان مختلفتين لنفس المستخدم عبر الزمن
3. استخدام `or` هنا يعكس فعلياً النية الغالبة: "كل ما يخصني، سواء أنشأته أو أُسند إليّ الآن"

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): بناء استعلام Fill Gaps — fill_gaps

**السيناريو / المطلوب:**
أكمل الفراغ في الاستعلام التالي بحيث يعبّر عن "issues لم تُحل بعد وأُسندت للمستخدم الحالي":
```text
resolution _______ and assignee = currentUser()
```

**المطلوب:**
1. املأ الفراغ بالعامل والقيمة الصحيحين

**نموذج الحل:**
```text
resolution is EMPTY and assignee = currentUser()
```
`resolution is EMPTY` تعني أن الـ issue لم يُحدَّد لها حل بعد (غير مغلقة)، ودُمجت بـ `and` مع شرط الإسناد للمستخدم الحالي.

### تمرين 2 (تمرين إضافي): تصحيح كود — code_fix

**السيناريو / المطلوب:**
هذا الاستعلام يحتوي خطأ نحوي في استخدام الدالة الزمنية:
```text
created >= startOfmonth()
```

**المطلوب:**
1. حدد الخطأ وصحّحه

**نموذج الحل:**
```text
created >= startOfMonth()
```
الخطأ في كتابة اسم الدالة بحرف صغير (`startOfmonth`) بدل الصيغة الصحيحة (`startOfMonth`) بحرف `M` كبير في منتصف الاسم — أسماء الدوال في JQL حساسة لحالة الأحرف.

### تمرين 3 (تمرين إضافي): سيناريو تطبيقي — scenario

**السيناريو / المطلوب:**
فريق يريد فلتراً محفوظاً يعرض كل الـ `Bugs` المفتوحة (غير محلولة) والمرتبة حسب تاريخ الإنشاء تصاعدياً.

**المطلوب:**
1. اكتب جملة JQL المناسبة
2. اذكر لماذا تُحفَظ كـ Filter بدل تنفيذها يدوياً كل مرة

**نموذج الحل:**
```text
issuetype = Bug and resolution is EMPTY order by created asc
```
تُحفَظ كـ `Filter` لأن الفريق سيستخدم هذا الاستعلام بشكل متكرر يومياً، وحفظه يوفر الوقت ويمنع أخطاء إعادة الكتابة، تماماً كما عرّفت المحاضرة الـ `Filters`: "searches saved for quick application".

### تمرين 4 (تمرين إضافي): fill_gaps — الترتيب متعدد الأعمدة

**السيناريو / المطلوب:**
أكمل الجملة لترتيب النتائج أولاً حسب `priority` تنازلياً، وعند التساوي حسب `key`:
```text
status = Open order by _______
```

**المطلوب:**
1. أكمل الفراغ بالصياغة الصحيحة

**نموذج الحل:**
```text
status = Open order by priority desc, key
```
يُستخدم فاصلة واحدة بين معايير الترتيب المتعددة ضمن نفس `order by` واحد، مطابقاً لنمط `order by summary ASC, key` الوارد في المحاضرة.

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تصميم Board Filter لفريقين

**السيناريو:**
شركة لديها فريقان (A وB) يعملان على نفس المشروع لكن كل فريق يريد لوحته (Board) الخاصة به تعرض فقط issues فريقه ضمن Sprint النشط الحالي.

**المطلوب:**
1. صف المعيار الذي يجب أن يحدده Board Filter لكل لوحة
2. اشرح لماذا لا تكفي لوحة واحدة مشتركة للفريقين

**نموذج الحل:**
يجب أن يتضمن Board Filter لكل فريق شرطين مجتمعين: (1) الانتماء لذلك الفريق تحديداً (مثال: حقل مخصص `team = "Team A"`)، و(2) الانتماء إلى الـ Sprint النشط الحالي. لا تكفي لوحة مشتركة لأن كل فريق يحتاج التركيز فقط على عمله الخاص دون تشتت بمهام الفريق الآخر، وهذا يطابق ما ذكرته المحاضرة عن أن كل بورد "has its own filter... Related to team A".

### تمرين 2: قرار Issue Type Schema

**السيناريو:**
مشروع دعم فني (Support Project) لا يحتاج إطلاقاً نوع `Epic` (لأن طلبات الدعم لا تُقسّم لمشاريع كبيرة)، لكنه يحتاج نوعاً مخصصاً اسمه `Support Ticket`.

**المطلوب:**
1. حدد أي مسار من مسارَي تغيير Issue Type Schema يناسب هذه الحالة (مخطط جديد بالكامل أو تعديل الحالي)
2. اذكر ماذا يجب تخصيصه لنوع `Support Ticket` الجديد

**نموذج الحل:**
الأنسب هنا هو **تعديل المخطط الحالي** (وليس اختيار مخطط جديد بالكامل) بحذف `Epic` غير المستخدم وإضافة نوع مخصص `Support Ticket`، إذ يذكر النص أن هذا الخيار متاح دون الحاجة لمخطط كامل جديد. يجب تخصيص لنوع `Support Ticket`: `workflow` خاص به (مراحل استقبال/تصعيد/إغلاق الطلب)، حقول مخصصة (مثل قناة التواصل، مستوى الأولوية)، وشاشة عرض خاصة به.

### تمرين 3: كتابة سياسة Story مقابل Subtask

**السيناريو:**
مدير منتج يشتكي من أن مطوري الفريق يكتبون تفاصيل تقنية دقيقة جداً داخل حقل وصف الـ `Story` نفسها، مما يجعلها غير مفهومة لأصحاب المصلحة.

**المطلوب:**
1. اقترح حلاً بنيوياً باستخدام مفاهيم المحاضرة
2. اشرح الفائدة المرجوة من هذا الحل

**نموذج الحل:**
الحل هو نقل كل التفاصيل التقنية الدقيقة إلى `Subtasks` منفصلة تابعة لتلك الـ `Story`، وترك وصف الـ `Story` بلغة مفهومة لأصحاب المصلحة كما نصّت المحاضرة صراحة. الفائدة: يبقى وصف الـ Story قابلاً للقراءة من قِبل غير التقنيين (العميل، الإدارة)، بينما يحصل الفريق التقني على تفاصيل التنفيذ الدقيقة في مكان منفصل مخصص لهم (الـ Subtasks) بحقول ومسار عمل مستقلين.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تتبع نتائج Quick Search بعوامل متعددة

**المدخل:**
```text
Issues موجودة: PROJ-1 "add item 1", PROJ-2 "add item 2", PROJ-3 "add item 3", PROJ-4 "create sample data"
استعلامات متتالية: "item", "item NOT 1", "item OR sample", "item NOT 1 OR sample"
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | الاستعلام | عدد النتائج |
| --- | --- | --- |
| 1 | `item` | ؟ |
| 2 | `item NOT 1` | ؟ |
| 3 | `item OR sample` | ؟ |
| 4 | `item NOT 1 OR sample` | ؟ |

**نموذج الحل:**
| الخطوة | الاستعلام | عدد النتائج |
| --- | --- | --- |
| 1 | `item` | 3 (PROJ-1, PROJ-2, PROJ-3) |
| 2 | `item NOT 1` | 2 (PROJ-2, PROJ-3) |
| 3 | `item OR sample` | 4 (PROJ-1, PROJ-2, PROJ-3, PROJ-4) |
| 4 | `item NOT 1 OR sample` | 3 (PROJ-2, PROJ-3, PROJ-4) |

**النتيجة:** إضافة `OR sample` في الخطوة 4 إلى نتيجة الخطوة 2 (المستبعد منها PROJ-1) يضيف PROJ-4 مجدداً، فتصبح النتيجة النهائية 3 عناصر.

#### سؤال MCQ على نفس التتبع:
كم عدد نتائج الخطوة 4 أعلاه؟
أ) 2  ب) 3  ج) 4  د) 1
**الإجابة الصحيحة: ب** — لأن `OR` يضيف PROJ-4 فوق النتيجتين المتبقيتين من `NOT 1`.

### تمرين تتبع 2: تتبع حساب الإزاحة الزمنية النسبية

**المدخل:**
```text
اللحظة الحالية (now) = يوم 20 من الشهر، الساعة 10:00
التعبيرات: startOfMonth(+14d), -3d, startOfWeek()
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | التعبير | القيمة الناتجة |
| --- | --- | --- |
| 1 | `startOfMonth()` | ؟ |
| 2 | `startOfMonth(+14d)` | ؟ |
| 3 | `-3d` من الآن | ؟ |

**نموذج الحل:**
| الخطوة | التعبير | القيمة الناتجة |
| --- | --- | --- |
| 1 | `startOfMonth()` | اليوم 1 من الشهر |
| 2 | `startOfMonth(+14d)` | اليوم 1 + 14 يوماً = اليوم 15 من الشهر |
| 3 | `-3d` من الآن (يوم 20) | اليوم 17 من نفس الشهر، الساعة 10:00 |

**النتيجة:** التعبيرات الزمنية النسبية تُحسب دائماً بالإضافة/الطرح من نقطة مرجعية ديناميكية (بداية الشهر أو اللحظة الحالية)، وليس من تاريخ ثابت.

### تمرين تتبع 3: تتبع عامل changed مع خصائصه

**المدخل:**
```text
استعلام: status changed from "Backlog" to "Selected For Development" by jDoe During ("2026-06-01","2026-06-30")
سجل تغييرات issue PROJ-9:
- 2026-05-20: status تغيّر من Backlog إلى Selected For Development بواسطة jDoe
- 2026-06-15: status تغيّر من Backlog إلى Selected For Development بواسطة jDoe
- 2026-06-20: status تغيّر من Selected For Development إلى Done بواسطة aSmith
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | الشرط المطلوب فحصه | هل يتحقق لـ PROJ-9؟ |
| --- | --- | --- |
| 1 | القيمة القديمة = Backlog والجديدة = Selected For Development | ؟ |
| 2 | الفاعل = jDoe | ؟ |
| 3 | ضمن الفترة (2026-06-01 إلى 2026-06-30) | ؟ |

**نموذج الحل:**
| الخطوة | الشرط المطلوب فحصه | هل يتحقق لـ PROJ-9؟ |
| --- | --- | --- |
| 1 | القيمة القديمة = Backlog والجديدة = Selected For Development | نعم (يتحقق في تغييرَي 05-20 و06-15) |
| 2 | الفاعل = jDoe | نعم (كلا التغييرين بواسطة jDoe) |
| 3 | ضمن الفترة (2026-06-01 إلى 2026-06-30) | فقط تغيير 06-15 يقع ضمن هذه الفترة؛ تغيير 05-20 خارجها |

**النتيجة:** الاستعلام يُطابق `PROJ-9` بناءً على حدث **06-15 فقط**، لأن حدث 05-20 يحقق كل الشروط ما عدا شرط الفترة الزمنية `During`. (تغيير 06-20 غير مطابق أصلاً لأن قيمته القديمة/الجديدة مختلفتان تماماً).

#### سؤال MCQ على نفس التتبع:
هل يُطابق الاستعلام أعلاه issue `PROJ-9`؟
أ) نعم، بسبب حدث 06-15 الذي يحقق كل الشروط الثلاثة معاً
ب) لا، لأن jDoe لم يقم بأي تغيير مطابق
ج) نعم، بسبب حدث 05-20
د) لا، لأن أياً من الأحداث لا يطابق التاريخ القديم/الجديد
**الإجابة الصحيحة: أ**

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هي آليات البحث الخمس في JIRA؟
A: Quick Search, Basic Search, Advanced Search, Filters, Quick Filters.

**Q2:** لماذا يُعتبر `Basic Search` "تمثيلاً مرئياً" لـ `JQL`؟
A: لأن كل معيار يُختار من قوائمه المنسدلة يُترجَم تلقائياً إلى جملة JQL مكافئة خلف الكواليس.

**Q3:** ما الفرق بين `creator` و`assignee`؟
A: `creator` من أنشأ الـ issue ولا يتغيّر، بينما `assignee` هو المسؤول الحالي وقابل للتغيير بمرور الوقت.

**Q4:** ما وظيفة عامل `was` في JQL؟
A: يبحث عمّا إذا كانت قيمة حقل معيّن مطابقة في وقت ما من تاريخ الـ issue، وليس فقط حالياً.

**Q5:** متى يُستخدم عامل `is`؟
A: فقط للتحقق من أن حقلاً NULL أو EMPTY (فارغ)، ويُنفى بـ `is not`.

**Q6:** ما الفرق بين رمزَي `M` و`m` في الإزاحة الزمنية؟
A: `M` (كبير) تعني شهر، و`m` (صغير) تعني دقيقة — الفرق حساس لحالة الأحرف.

**Q7:** ماذا يعني `-2d` في JQL؟
A: قبل 48 ساعة (يومين) من اللحظة الحالية.

**Q8:** ما تعريف الـ `Filter` في JIRA؟
A: استعلام (يمكن أن يكون JQL) محفوظ باسم لإعادة استخدامه بسرعة دون كتابته من جديد.

**Q9:** ما تعريف `Story` كنوع issue؟
A: متطلب من وجهة نظر المستخدم، ويُسمى أيضاً Feature Request.

**Q10:** لماذا يجب أن يكون لكل نوع issue حقول وشاشات ومسار عمل مختلف؟
A: لأن طبيعة كل نوع عمل مختلفة (مثال: Bug يحتاج أولوية عرض عاجلة وتقارير خاصة به).

**Q11:** هل يمكن لـ `Subtask` أن يوجد دون parent issue؟
A: لا، الـ Subtask يجب أن يكون له دائماً issue أب (parent) إلزامياً.

**Q12:** أين يقع إعداد `Issue Type Schema` في واجهة JIRA؟
A: من `Project Settings -> Issue Types`.

**Q13:** ما الفرق بين `changed` و`was` من ناحية التركيز؟
A: `changed` يركّز على حدث الانتقال نفسه (من قيمة إلى أخرى، متى، بواسطة من)، بينما `was` يركّز على كون القيمة كانت مطابقة في وقت ما.

**Q14:** ما هي الخصائص التي يمكن إضافتها إلى عامل `was`؟
A: `was in`/`was not in`, `after`, `before`, `BY`, `During`, `On`.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> لا يوجد في هذه المحاضرة "برنامج واحد" مُجزّأ عبر أقسام متفرقة يحتاج تجميعاً (المحاضرة تتكوّن من استعلامات JQL مستقلة قصيرة، وليست ملف كود واحد متصل). فيما يلي مرجع شامل يجمع كل جمل JQL الواردة في المحاضرة مرتبة كملف مرجعي واحد:

```text
// ==== Basic condition syntax ====
project = projectA
assignee = currentUser()

// ==== First group examples ====
created < startOfWeek()
created >= startOfMonth()
creator = currentUser()

// ==== Second group examples ====
approval = pending()
approval = pendingBy(jDoe)
assignee != currentUser()

// ==== Sorting support examples ====
due <= endOfDay() order by createdDate desc
status = Open order by dueDate asc

// ==== was operator examples ====
assignee was currentUser()
status was not "In Progress"

// ==== changed operator examples ====
assignee changed
status changed from "Backlog" to "Selected For Development" by jDoe

// ==== Complex combined examples ====
status was in ("In Progress","Selected For Development") After -1M
created > -3d
created > startOfMonth(+14d) and status = "Selected For Development"
```

**الناتج المتوقع:**
> كل جملة أعلاه مستقلة قابلة للتنفيذ منفرداً في مربع بحث `Advanced Search (JQL)` في JIRA، وتُرجع issues مطابقة للشرط الموصوف بجانبها في المحاضرة.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: لماذا صُمّمت JQL لتركّز فقط على "Where condition section" ولم تتضمن SELECT/FROM كاملتين كما في SQL؟
**نموذج الإجابة:**
1. التعريف: JQL لغة استعلام مخصصة للبحث ضمن issues مشروع JIRA فقط
2. المكونات/الشروط: تتكون من `<field> <operator> <value/function>` واختيارياً `order by`
3. مثال: `project = projectA and assignee = currentUser()`
4. متى نستخدم: عندما نحتاج دقة أعلى مما يوفره Basic/Quick Search، خصوصاً في التقارير والأتمتة

### سؤال 2: ما الفرق بين `was` و`changed` وفي أي سيناريو يُفضَّل كل منهما؟
**نموذج الإجابة:**
1. التعريف: `was` يفحص هل كانت القيمة مطابقة في وقت ما؛ `changed` يفحص حدوث انتقال فعلي بين قيمتين
2. المكونات/الشروط: `was` يدعم `in/not in/after/before/BY/During/On`؛ `changed` يدعم `from/to` إضافة لبقية الخصائص
3. مثال: `assignee was currentUser()` مقابل `status changed from "Backlog" to "Selected For Development" by jDoe`
4. متى نستخدم: `was` عندما يهمنا مجرد "كونها كذلك يوماً"، و`changed` عندما يهمنا تفاصيل عملية الانتقال نفسها

### سؤال 3: اشرح الدوال الزمنية (Start/End functions) ولماذا تُفضَّل على التواريخ الثابتة.
**نموذج الإجابة:**
1. التعريف: دوال جاهزة تمثّل نقاطاً زمنية نسبية مثل `startOfWeek()`, `endOfMonth()`
2. المكونات/الشروط: تشمل Start functions (بداية يوم/أسبوع/شهر/سنة) وEnd functions (نهاياتها) ودوال أخرى (`now`, `currentLogin`, `lastLogin`)
3. مثال: `created >= startOfMonth()`
4. متى نستخدم: عندما نريد استعلاماً "حياً" يبقى صحيحاً دوماً دون تعديل يدوي، بعكس تاريخ ثابت يصبح قديماً بسرعة

### سؤال 4: ما وظيفة `Issue Type Schema` وكيف يمكن تعديله؟
**نموذج الإجابة:**
1. التعريف: إعداد يحدد أنواع الـ issues المسموح استخدامها في مشروع معيّن
2. المكونات/الشروط: يمكن اختيار مخطط جاهز مختلف، أو تعديل المخطط الحالي مباشرة
3. مثال: من `Project Settings -> Issue Types`
4. متى نستخدم: عندما يحتاج مشروع أنواع issues مختلفة عن الإعداد الافتراضي (مثال: إزالة Epic من مشروع دعم فني)

### سؤال 5: لماذا تُعتبر ترجمة "Issue" إلى "مشكلة" غير دقيقة؟
**نموذج الإجابة:**
1. التعريف: `Issue` مصطلح عام لأي بند عمل في JIRA، وليس بالضرورة خللاً أو مشكلة
2. المكونات/الشروط: يشمل Story, Task, Bug, Epic, Subtask وأنواعاً مخصصة
3. مثال: `Story` تمثّل متطلباً إيجابياً من المستخدم وليست مشكلة على الإطلاق
4. متى نستخدم: عند شرح النظام لمستخدمين جدد يجب توضيح أن "Issue" = بند عمل عام لتفادي سوء الفهم

### سؤال 6: ما الفرق البنيوي بين `Subtask` وباقي أنواع الـ Issues؟
**نموذج الإجابة:**
1. التعريف: `Subtask` هو النوع الوحيد الذي يتطلب إلزامياً وجود issue أب (parent)
2. المكونات/الشروط: له key مستقل، حقول مستقلة، workflow مستقل، وحركة مستقلة على البورد
3. مثال: Subtask تقني تحت Story "الدفع ببطاقة ائتمانية"
4. متى نستخدم: لتقسيم عمل كبير (خصوصاً Story) لخطوات تقنية صغيرة يديرها المطوّرون بشكل مستقل

### سؤال 7: كيف تُبنى جملة JQL تجمع بين شرط قيمة وشرط زمني وترتيب معاً؟
**نموذج الإجابة:**
1. التعريف: JQL تسمح بدمج عدة شروط بـ `and`/`or` مع إضافة `order by` في النهاية
2. المكونات/الشروط: `<field1> <op> <value1> and <field2> <op> <function> order by <field> <asc|desc>`
3. مثال: `created > startOfMonth(+14d) and status = "Selected For Development"`
4. متى نستخدم: عند الحاجة لاستعلام دقيق متعدد الأبعاد (قيمة + زمن) مع ترتيب واضح للنتائج

### سؤال 8: ما أهمية Board Filter ولماذا يختلف من لوحة لأخرى؟
**نموذج الإجابة:**
1. التعريف: فلتر خاص بكل Board يحدد أي issues تظهر عليها
2. المكونات/الشروط: قد يقيّد حسب مشروع واحد أو أكثر، أو فريق، أو Sprint محدد
3. مثال: بورد فريق A تعرض فقط issues فريقه ضمن Sprint النشط
4. متى نستخدم: عندما نحتاج لوحات مختلفة لفرق/أغراض مختلفة تعمل على نفس المشروع أو مشاريع متعددة

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع تعداد آليات البحث الخمس في JIRA بالترتيب
- [ ] أفهم أن Basic Search هو تمثيل مرئي لـ JQL وليس آلية منفصلة
- [ ] أميّز بين `=` و`was` و`changed` وأعرف متى أستخدم كلاً منها
- [ ] أحفظ الفرق بين `M` (شهر) و`m` (دقيقة) في التعبيرات الزمنية
- [ ] أعرف صيغة الإزاحة الزمنية الكاملة `(-|+)nn(y|M|w|d|h|m)`
- [ ] أفهم الفرق بين `creator` و`assignee`
- [ ] أعرف أن `is`/`is not` تُستخدم فقط مع NULL/EMPTY
- [ ] أستطيع شرح لماذا "Issue" ليست بالضرورة "مشكلة"
- [ ] أعدد أنواع الـ Issues الخمسة (Story, Task, Bug, Epic, Subtask) وتعريف كل منها
- [ ] أفهم لماذا يحتاج كل Issue Type حقولاً وشاشات وworkflow مختلفة
- [ ] أعرف أن الـ Subtask يجب أن يكون له parent إلزامياً وله key مستقل
- [ ] أعرف مكان تعديل Issue Type Schema (Project Settings -> Issue Types)
- [ ] أفهم مفهوم الـ Filter وBoard Filter كحالة خاصة منه
- [ ] أستطيع حل تمارين تتبع تنفيذ استعلامات JQL خطوة بخطوة

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المفاهيم

| المفهوم | يرتبط مع | كيف؟ |
| --- | --- | --- |
| Basic Search | JQL | Basic Search يُترجم آلياً إلى جملة JQL |
| Filter | JQL | كل Filter هو استعلام JQL محفوظ باسم |
| Board Filter | Filter | حالة خاصة من الفلاتر مرتبطة بلوحة عرض معيّنة |
| Subtask | Story/Task/Bug/Epic | Subtask دائماً تابع لأحد الأنواع الأخرى كـ parent |
| Issue Type Schema | Workflow/Fields/Screen | كل نوع ضمن المخطط له إعدادات مستقلة من الثلاثة |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| Search Mechanisms | Quick (ضعيف) → Basic (فلاتر مرئية) → Advanced/JQL (الأقوى) → Filters (حفظ) → Quick Filters |
| JQL Time | Start/End functions + `now`/`currentLogin`/`lastLogin` + إزاحة نسبية `(-|+)nn(y|M|w|d|h|m)` |
| JQL Operators | `=`/`!=` للحالة الحالية، `was` للتاريخ، `changed` للانتقال، `is` لـ NULL/EMPTY، `~` للاحتواء |
| Issue Types | Story/Task/Bug/Epic/Subtask — لكل منها حقول وworkflow وشاشة مستقلة |
| Subtask | إلزامي وجود parent، key مستقل، حركة مستقلة على البورد |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `JQL` | JIRA Query Language | Advanced Search |
| `currentUser()` | المستخدم المنفّذ حالياً | شروط الإسناد/الإنشاء |
| `startOfX()` / `endOfX()` | بداية/نهاية فترة زمنية | الشروط الزمنية الديناميكية |
| `was` | كانت القيمة كذلك تاريخياً | تتبع تاريخ حقل |
| `changed` | انتقال فعلي بين قيمتين | تتبع تغييرات محددة |
| `is`/`is not` | فحص NULL/EMPTY فقط | حقول قابلة للفراغ |
| `M` مقابل `m` | شهر مقابل دقيقة | إزاحات زمنية نسبية |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | Basic Search = تمثيل مرئي لـ JQL، وليس آلية بحث منفصلة عنه |
| 2 | `=` للحالة الحالية فقط، `was` للتاريخ الكامل، `changed` لحدث الانتقال نفسه |
| 3 | `M` كبير = شهر، `m` صغير = دقيقة — حساس لحالة الأحرف |
| 4 | `is`/`is not` حصراً مع NULL/EMPTY، وليس بديلاً عاماً عن `=` |
| 5 | "Issue" مصطلح عام (بند عمل) وليس بالضرورة "مشكلة" |
| 6 | Subtask يتطلب parent إلزامياً وله key + workflow + حركة بورد مستقلة بالكامل |
| 7 | كل Issue Type له حقول وشاشات وworkflow مستقلة يمكن تخصيصها منفرداً |

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, full_code, theory, checklist, cheat_sheet
mcq_count: 16
code_blocks: 34
-->

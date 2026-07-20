# المحاضرة 4 — معالجة الاستعلامات: الاستراتيجيات والخوارزميات
> **المادة:** قواعد البيانات 2 (Database-2) | **الموضوع:** استراتيجيات معالجة الاستعلامات (Query Processing Strategies)
> **الدكتور:** عبدو دربولي | **التاريخ:** 19/11/2025

---

## الجزء الأول: الملخص الشامل

> **هذا الملخص الشامل كافٍ — لو قرأت هذا بس، انت خلصت. ما تحتاج ترجع للمحاضرة أو التفاصيل.**

### The Big Idea

**معالجة الاستعلام** هي الرحلة الكاملة من استعلام SQL مكتوب من المستخدم حتى النتيجة على الشاشة — و`query processing` تتعلق بـ *كيف* تنفذ قاعدة البيانات هذه الرحلة باستخدام خوارزميات فعّالة لكل عملية (بحث، ضم جداول، تجميع...).

### ليش هذا مهم؟

هذا الموضوع هو قلب كل `DBMS`. لو عندك استعلام بطيء في شركتك، السبب غالباً هو خوارزمية معالجة غير مناسبة — هل يستخدم النظام `linear search` أو `index`؟ هل يضم الجداول بـ `nested-loop` أو `sort-merge`؟ فهمك لهذه الخوارزميات يجعلك تكتب SQL أسرع وتفهم `EXPLAIN PLAN` في قواعد البيانات الحقيقية.

### المتطلبات السابقة

- **Relational Algebra** (العمليات: `σ`, `π`, `⨝`, `×`, `∪`, `−`, `ρ`) — بدونها ما تقدر تفهم كيف يُترجم SQL
- **SQL Basics** — `SELECT-FROM-WHERE`, `JOIN`, `GROUP BY`, `HAVING`
- **DBMS Architecture** — البنية العامة لقواعد البيانات
- **Indexing Structures** — `B+ tree`, `Hash index`, `Primary/Secondary index`

---

### الآن: اشرح الموضوع بالكامل

#### أولاً: رحلة الاستعلام من SQL إلى نتيجة

لما تكتب `SELECT * FROM EMPLOYEE WHERE Salary > 5000`، قاعدة البيانات ما تنفذها مباشرة. هناك خمس خطوات إلزامية:

**1- `Scanner`**: يمسح النص ويحدد الكلمات والرموز (`SELECT`, `*`, `FROM`, ...) — مثل المدقق الإملائي.

**2- `Parser`**: يتحقق أن التركيب صحيح نحوياً (هل `FROM` جاء قبل `WHERE`؟ هل الأقواس مفتوحة ومغلقة؟) — مثل المدرّس اللغوي.

**3- `Validation`**: يتحقق أن الجداول والأعمدة موجودة فعلاً في قاعدة البيانات — مثل الموظف الذي يتحقق من الهوية.

**4- `Query Tree / Query Graph`**: يُحوّل الاستعلام لتمثيل داخلي (شجرة أو مخطط) — مثل خريطة الطريق.

**5- `Execution Plan`**: يختار `query optimizer` أفضل طريقة للتنفيذ — مثل GPS يختار أسرع طريق.

#### ثانياً: SQL → Relational Algebra

قاعدة البيانات لا تنفذ SQL مباشرة — تُحوّله لـ`relational algebra` أولاً. الاستعلامات المعقدة المتداخلة (`nested queries`) تُقسم لـ`query blocks` — كل `block` = `SELECT-FROM-WHERE` واحد.

**مثال:** استعلام فيه `subquery`:
```sql
SELECT Lname, Fname FROM EMPLOYEE
WHERE Salary > (SELECT MAX(Salary) FROM EMPLOYEE WHERE Dno=5);
```

يُقسم لـ`block` داخلي وخارجي، كل `block` يُترجم منفصلاً لـ`relational algebra`.

#### ثالثاً: عمليات إضافية — Semi-Join و Anti-Join

هذان عملياتان تُستخدمان لحل استعلامات الـ`subquery` بكفاءة:

- **`Semi-join` (⋉)**: يُرجع صفوف من الجدول الأيسر إذا وجد تطابق مع أي صف من الجدول الأيمن (بدون تكرار النتائج). يُستخدم لحل `EXISTS`, `IN`, `ANY`.
- **`Anti-join`**: عكسه تماماً — يُرجع صفوف الجدول الأيسر التي *لا تجد* تطابقاً. يُستخدم لحل `NOT EXISTS`, `NOT IN`, `ALL`.

#### رابعاً: خوارزميات البحث في SELECT

عملية `SELECT` (σ) تعني "ابحث عن صفوف تحقق شرطاً معيناً". هناك ست خوارزميات:

| الخوارزمية | الحالة | الكفاءة |
|---|---|---|
| **S1**: `Linear Search` | دائماً (brute force) | بطيئة جداً |
| **S2**: `Binary Search` | مفتاح على ملف مرتب (equality) | جيدة |
| **S3a**: `Primary Index` | equality على مفتاح رئيسي | ممتازة |
| **S3b**: `Hash Key` | equality على hash key | ممتازة |
| **S4**: `Primary Index + Range` | `>`, `≥`, `<`, `≤` على primary index | جيدة |
| **S5**: `Clustering Index` | equality على non-key attribute | جيدة |
| **S6**: `Secondary Index (B+)` | equality أو range على أي حقل | متغيرة |

للاستعلامات التي تجمع شروطاً بـ`AND` (conjunctive) أو `OR` (disjunctive): استخدام `composite index` أو تقاطع/اتحاد مؤشرات السجلات.

**`Selectivity`**: نسبة الصفوف التي تُحقق الشرط (من 0 إلى 1). الـ`query optimizer` يحسبها من الـ`database catalog` ليختار الخوارزمية الأنسب.

#### خامساً: معلومات الـ`Database Catalog`

الـ`catalog` هو "قاموس" قاعدة البيانات — يحتوي:
- `r_R`: عدد الصفوف في الجدول R
- `R`: طول الصف الواحد (bytes)
- `b_R`: عدد الـ`blocks` التي يشغلها الجدول
- `bfr`: `blocking factor` — عدد الصفوف في الـ`block` الواحد
- `NDV(A,R)`: عدد القيم المختلفة للعمود A في الجدول R
- `max(A,R)` و `min(A,R)`: القيمة الأكبر والأصغر

#### سادساً: خوارزميات الـ`JOIN` — الأهم والأصعب

`JOIN` هي أبطأ عملية في `query processing`. هناك أربع خوارزميات رئيسية:

**J1: `Nested-Loop Join`**
لكل صف في R (الـ`outer loop`)، راجع كل صفوف S (الـ`inner loop`) وتحقق من شرط الـ`join`. بسيطة لكن بطيئة.

**J2: `Index-Based Nested-Loop Join`**
نفس فكرة J1، لكن بدل مراجعة كل S، استخدم `index` على حقل الـ`join` في S للوصول المباشر. أسرع بكثير.

**J3: `Sort-Merge Join`**
رتّب R على حقل A وS على حقل B، ثم امسح الملفين معاً ودمجهم. يمسح كل ملف مرة واحدة فقط — مثالي لو الملفات مرتبة أصلاً.

**J4: `Partition-Hash Join`**
طبّق نفس دالة `hashing` على حقل الـ`join` في كلا الملفين. الصفوف المتطابقة تقع في نفس الـ`bucket` — امسح الـ`bucket` الأصغر وقارنه مع الأكبر.

#### سابعاً: عمليات `PROJECT` والعمليات المجموعية

**`PROJECT`**: بعد سحب الأعمدة المطلوبة فقط، يجب إزالة التكرارات (`duplicates`). هذا يتطلب ترتيباً. في SQL الافتراضي لا تُزال التكرارات — تحتاج `DISTINCT` صريحاً.

**العمليات المجموعية (`Set Operations`)**: `UNION`, `INTERSECTION`, `SET DIFFERENCE`, `CARTESIAN PRODUCT`. كلها تستخدم `sort-merge` أو `hashing`. الـ`CARTESIAN PRODUCT` الأغلى: نتيجتها `n×m` صف — تجنبها دائماً.

#### ثامناً: Aggregate Operations

`MIN`, `MAX`, `COUNT`, `SUM`, `AVERAGE` — تُحسب بـ`table scan` أو `index`. مثلاً:
- `MAX(Salary)` مع `B+tree ascending` = اذهب لأقصى يمين الشجرة (ورقة أقصى اليمين)
- `COUNT` = يمكن حسابه من الـ`index` مباشرة
- `GROUP BY` = رتّب الصفوف بحقول الـ`group` أولاً، ثم احسب الـ`aggregate` لكل مجموعة

#### تاسعاً: `Pipelining` — تحسين تنفيذ العمليات

بدل تنفيذ كل عملية وحفظ نتيجتها في ملف مؤقت ثم تنفيذ التالية (`materialized evaluation`)، الـ`pipelining` تجمع عدة عمليات في خط واحد — كل عملية ترسل نتائجها مباشرة للعملية التالية بدون ملفات مؤقتة.

الـ`iterator` هو الآلية: كل عملية لها `Open()`, `Get_Next()`, `Close()`. لما تستدعي `Get_Next()` على عملية `JOIN` مثلاً، هي بدورها تستدعي `Get_Next()` على عملياتها الداخلية.

---

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
الطالب يظن أن `SELECT` في SQL = عملية `SELECT` (σ) في `relational algebra` بمعنى اختيار الأعمدة.

#### الفهم الصحيح ✅:
في `relational algebra`، `σ` (sigma) هي عملية **الاختيار (Selection)** = اختيار الصفوف بشرط. أما اختيار الأعمدة فهو `π` (pi) = `PROJECT`. في SQL، كلمة `SELECT` تغطي الاثنين.

---

#### الفهم الخاطئ ❌:
الطالب يظن أن `Semi-join` مثل `INNER JOIN` — يُرجع أعمدة من الجدولين.

#### الفهم الصحيح ✅:
`Semi-join` يُرجع **فقط صفوف الجدول الأيسر** — لا أعمدة من الجدول الأيمن. الهدف هو التحقق من وجود تطابق فقط، لا الحصول على بيانات الجدول الأيمن.

---

#### الفهم الخاطئ ❌:
الطالب يظن أن `J3: Sort-Merge` دائماً أسرع من `J1: Nested-Loop`.

#### الفهم الصحيح ✅:
`Sort-Merge` أسرع إذا الملفات كبيرة وغير مرتبة (تكلفة الترتيب مرة واحدة تستحق). لكن لو الملفات صغيرة أو واحدة منها مرتبة أصلاً، قد يكون `J2: Index-Based` أسرع. الـ`query optimizer` هو من يختار.

---

#### الفهم الخاطئ ❌:
الطالب يظن أن SQL يُزيل التكرارات تلقائياً.

#### الفهم الصحيح ✅:
SQL **لا يُزيل** التكرارات افتراضياً (يُرجع `multiset`). تحتاج `SELECT DISTINCT` صراحةً. هذا التصميم المتعمد لأن إزالة التكرارات تتطلب ترتيباً وتكلفة إضافية.

---

### الفروقات المهمة

- **`Semi-join` vs `Anti-join`**: الأول للتطابق (`EXISTS/IN`)، الثاني لعدم التطابق (`NOT EXISTS/NOT IN`)
- **`Materialized Evaluation` vs `Pipelining`**: الأول يخزن نتائج وسطية، الثاني يمررها مباشرة
- **`S1 Linear` vs `S3 Primary Index`**: الأول يمسح كل الملف، الثاني يذهب مباشرة للموقع

### لما تحتاج هذا في الامتحان

الأسئلة المتوقعة: (1) تحويل SQL لـ`relational algebra`، (2) اختيار خوارزمية `SELECT` المناسبة لحالة معينة، (3) مقارنة خوارزميات الـ`JOIN` (J1-J4)، (4) شرح الفرق بين `Semi-join` و`Anti-join` مع مثال، (5) حساب نتيجة `CARTESIAN PRODUCT`.

---

## الجزء الثاني: الشرح التفصيلي

### 1. مقدمة في معالجة الاستعلامات

<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

#### 📍 أين نحن الآن؟
نبدأ من الصورة الكاملة: كيف تعالج قاعدة البيانات استعلاماً من البداية للنهاية.

#### ⬅️ الربط مع السابق
هذا الموضوع يبني على معرفتك بـ`SQL` وبنية `DBMS` — الآن ندخل داخل الـ`DBMS` لنرى ما يحدث.

#### 💡 الفكرة الأساسية
**معالجة الاستعلام تمر بمراحل متسلسلة: فحص → تحليل → تمثيل داخلي → تحسين → تنفيذ.**

---

#### 📊 المخطط: مراحل معالجة الاستعلام

#### ما هذا المخطط؟
> يُوضح الرحلة الكاملة من استعلام `SQL` في أعلى الصفحة حتى النتيجة النهائية في الأسفل — عبر ستة مراحل.

#### وصف العُقد:

| # | العُقدة | النوع | الشرح |
|---|---|---|---|
| 1 | Query in a high-level language | بداية | الاستعلام كما كتبه المستخدم بـ`SQL` |
| 2 | Scanning, Parsing, Validating | معالجة | فحص بناء الجملة والتحقق من الأسماء |
| 3 | Immediate form of query | بيانات | الشكل الداخلي للاستعلام (`query tree`) |
| 4 | Query Optimizer | عملية | يختار أفضل خطة تنفيذ |
| 5 | Execution Plan | بيانات | الخطة المختارة |
| 6 | Query Code Generator | عملية | يُولّد الكود القابل للتنفيذ |
| 7 | Code to execute the query | بيانات | الكود الجاهز للتنفيذ |
| 8 | Runtime Database Processor | عملية | يُنفذ الكود فعلياً على البيانات |
| 9 | Result of query | نهاية | النتيجة النهائية للمستخدم |

#### وصف الروابط:

| من | إلى | الشرح |
|---|---|---|
| SQL Query | Scanning/Parsing | قراءة النص |
| Scanning/Parsing | Immediate form | بناء الشجرة الداخلية |
| Immediate form | Query Optimizer | التمرير للتحسين |
| Query Optimizer | Execution Plan | الخطة المُختارة |
| Execution Plan | Code Generator | توليد الكود |
| Code | Runtime Processor | التنفيذ |
| Runtime Processor | Result | النتيجة |

```diagram
type: flowchart
direction: TD
nodes:
  - id: sql
    label: SQL Query
    kind: start
  - id: parse
    label: Scanning + Parsing + Validating
    kind: process
  - id: tree
    label: Query Tree (Immediate Form)
    kind: data
  - id: optimizer
    label: Query Optimizer
    kind: process
  - id: plan
    label: Execution Plan
    kind: data
  - id: codegen
    label: Query Code Generator
    kind: process
  - id: runtime
    label: Runtime Database Processor
    kind: process
  - id: result
    label: Result
    kind: end
edges:
  - from: sql
    to: parse
  - from: parse
    to: tree
  - from: tree
    to: optimizer
  - from: optimizer
    to: plan
  - from: plan
    to: codegen
  - from: codegen
    to: runtime
  - from: runtime
    to: result
```

#### 📖 الشرح

عندما تكتب استعلام `SQL`، قاعدة البيانات لا تفهمه مباشرة. تبدأ بـ**`Scanner`** الذي يقسّم النص لـ`tokens` (كلمات مفردة: `SELECT`, `FROM`, `WHERE`, أسماء جداول، أرقام...). ثم **`Parser`** يتحقق أن التسلسل النحوي صحيح.

بعدها يأتي دور **`Validation`**: هل الجدول `EMPLOYEE` موجود فعلاً؟ هل العمود `Salary` موجود في هذا الجدول؟ هل المستخدم لديه صلاحيات؟ لو فشل أي تحقق، يُوقف العملية بخطأ.

بعد النجاح، يُبنى **`query tree`** (أو `query graph`) — تمثيل داخلي يعكس العلاقات بين العمليات. هذا التمثيل يُمرر لـ**`query optimizer`** الذي يختار أفضل `execution plan` من بين عدة بدائل ممكنة.

أخيراً **`query code generator`** يُحوّل الـ`plan` لكود قابل للتنفيذ — إما مباشرة (`interpreted mode`) أو يُخزن لاستخدام لاحق (`compiled mode` كالـ`stored procedures`).

#### 💡 التشبيه:
> مثل ترجمة وصفة طبخ من العربية للإنجليزية ثم تنفيذها في المطبخ — أولاً الترجمة والتفهم، ثم الاختيار بين طرق الطبخ، ثم التنفيذ الفعلي.
> **وجه الشبه:** الوصفة = `SQL Query`، الترجمة = `Parsing`، اختيار طريقة الطبخ = `Query Optimization`، الطبخ = `Execution`

#### 🎯 الملخص السريع
- 5 مراحل: `Scanner` → `Parser` → `Validator` → `Query Tree` → `Optimizer` → `Executor`
- الكود يمكن تنفيذه مباشرة (`interpreted`) أو تخزينه (`compiled`)
- `Query Optimization` = اختيار أفضل خطة تنفيذ

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يظن أن `query optimization` معناه تصحيح الاستعلام أو جعل كتابته أبسط.

#### الفهم الصحيح ✅:
`query optimization` معناه اختيار أفضل **خطة تنفيذ** لنفس الاستعلام — كالاختيار بين استخدام `index` أو `full table scan`، أو ترتيب عمليات الـ`JOIN`. النتيجة نفسها، لكن الكفاءة تختلف كثيراً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> DBMS techniques to process a query: Scanner identifies query tokens, Parser checks the query syntax, Validation checks all attribute and relation names, Query tree (or query graph) created, Execution strategy or query plan devised. Query optimization: Planning a good execution strategy.

**ملاحظة على التغطية:**
- ✓ تم شرح: كل المراحل الخمس بالتفصيل + مخطط التدفق الكامل
- ✓ تم شرح: الفرق بين `interpreted` و`compiled mode`
- ℹ️ إضافة من الدليل: التشبيه بالوصفة والطبخ

</details>

---

### 2. ترجمة SQL إلى Relational Algebra

<!-- @render: {type: "prose-first", visualization: "code", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
انتقلنا من فهم الصورة الكاملة لمرحلة التحويل الداخلي: SQL → Relational Algebra.

#### ⬅️ الربط مع السابق
بعد أن يُنشئ الـ`Parser` شجرة داخلية، يُحوّلها النظام لـ`relational algebra` — اللغة التي تعمل عليها خوارزميات التحسين والتنفيذ.

#### 💡 الفكرة الأساسية
**SQL يُقسَّم لـ`query blocks` (كل `block` = `SELECT-FROM-WHERE` واحد)، وكل `block` يُترجم منفصلاً لـ`relational algebra`.**

---

#### 💻 الكود: مثال استعلام متداخل

#### ما هذا الكود؟
> استعلام يجد الموظفين ذوي رواتب أعلى من الحد الأقصى لقسم رقم 5.

```sql
-- Outer query: find employees with salary above threshold
SELECT Lname, Fname
FROM EMPLOYEE
WHERE Salary > (
    -- Inner query: find max salary in department 5
    SELECT MAX(Salary)
    FROM EMPLOYEE
    WHERE Dno = 5
);
```

#### شرح كل جزء:
1. **`Inner Block`** (الـ`subquery`) → يجد أعلى راتب في القسم 5
2. **`Outer Block`** → يجد الموظفين ذوي رواتب أعلى من القيمة الناتجة عن الـ`block` الداخلي

#### 🔄 قبل / بعد: تحويل الـ`blocks` لـ`Relational Algebra`

**الـ`Inner Block` بعد التحويل:**
```math
ℑ_MAX(Salary)(σ_{Dno=5}(EMPLOYEE))
```
> أولاً: اختر موظفي القسم 5 (σ)، ثم احسب الـ`MAX` على رواتبهم (ℑ)

**الـ`Outer Block` بعد التحويل:**
```math
π_{Lname,Fname}(σ_{Salary > c}(EMPLOYEE))
```
> أولاً: اختر الموظفين الذين رواتبهم > `c` (القيمة من الـ`inner block`)، ثم اعرض الاسمين فقط (π)

**ماذا تغيّر؟** تحوّل الاستعلام من صياغة SQL إنشائية لتسلسل عمليات جبرية قابل للتنفيذ والتحسين.

#### 📖 الشرح

`SQL` لغة وصفية (`declarative`) — تقول *ماذا تريد* ولا تقول *كيف تحصل عليه*. `Relational Algebra` إجرائية (`procedural`) — تحدد خطوات التنفيذ بالترتيب.

التقسيم لـ`query blocks` ضروري لأن كل `subquery` متداخلة تُمثل عملية منفصلة يمكن تحسينها مستقلاً. الـ`query optimizer` يختار خطة تنفيذ لكل `block` على حدة.

#### 🎯 الملخص السريع
- كل استعلام `SQL` يُقسم لـ`query blocks`
- كل `block` يحتوي `SELECT-FROM-WHERE` واحد (+اختياري `GROUP BY/HAVING`)
- كل `block` يُترجم منفصلاً لـ`relational algebra`
- الـ`optimizer` يختار خطة التنفيذ لكل `block`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> SQL: Query language used in most RDBMSs. Query decomposed into query blocks — basic units that can be translated into the algebraic operators. Contains single SELECT-FROM-WHERE expression. May contain GROUP BY and HAVING clauses.

**ملاحظة على التغطية:**
- ✓ تم شرح: مفهوم `query blocks` + مثال كامل
- ✓ تم شرح: التحويل لـ`relational algebra` (inner + outer block)
- ℹ️ إضافة من الدليل: التمييز بين اللغات الوصفية والإجرائية

</details>

---

### 3. العمليات الإضافية: Semi-Join و Anti-Join

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### 📍 أين نحن الآن؟
تعلمنا ترجمة الاستعلامات الأساسية. الآن نتعلم عمليتين متخصصتين لحل الـ`subqueries` بكفاءة.

#### ⬅️ الربط مع السابق
في المثال السابق، الـ`inner block` استخدم `MAX`. لكن ماذا لو الـ`subquery` تستخدم `IN`, `EXISTS`, `NOT IN`, `NOT EXISTS`؟ هنا يأتي دور `Semi-join` و`Anti-join`.

#### 💡 الفكرة الأساسية
**`Semi-join` يتحقق من وجود تطابق ويُرجع صفوف الجدول الأيسر فقط؛ `Anti-join` يتحقق من غياب التطابق.**

---

#### 3.1. Semi-Join (⋉)

#### 📊 المخطط: كيف يعمل Semi-Join

#### وصف العُقد:

| العُقدة | الدور |
|---|---|
| T1 (left table) | الجدول الذي نُرجع صفوفه |
| T2 (right table) | الجدول الذي نُقارن معه فقط |
| T1.X | العمود الذي نبحث عن تطابقه في T2 |
| T2.Y | العمود في T2 الذي نقارن معه |

**القاعدة:** لكل صف في T1، ابحث في T2. إذا وجدت صفاً في T2 حيث `T2.Y = T1.X` → أُرجع صف T1 فوراً (بدون الاستمرار في البحث عن تطابقات أخرى).

#### 💻 الكود: مثال Semi-Join

```sql
-- Original query with subquery (IN)
SELECT COUNT(*)
FROM DEPARTMENT D
WHERE D.Dnumber IN (
    SELECT E.Dno
    FROM EMPLOYEE E
    WHERE E.Salary > 200000
);

-- Equivalent using Semi-Join notation
SELECT COUNT(*)
FROM EMPLOYEE E, DEPARTMENT D
WHERE D.Dnumber S= E.Dno AND E.Salary > 200000;
-- S= means Semi-join condition
```

#### شرح كل سطر:
1. الاستعلام الأصلي: ابحث عن الأقسام التي فيها موظفون رواتبهم > 200,000
2. نسخة `Semi-join`: لكل صف في DEPARTMENT، تحقق إذا وُجد موظف يطابق الشرط
3. الفرق: `Semi-join` يتوقف عند أول تطابق — لا يكمل البحث

#### 💡 التشبيه:
> مثل البحث في قاموس: تبحث عن كلمة، وبمجرد ما تجدها تقفل القاموس — ما تكمل لنهاية الصفحة.
> **وجه الشبه:** القاموس = T2، الكلمة = قيمة T1.X، إيجاد الكلمة والوقوف = `Semi-join`

---

#### 3.2. Anti-Join

**القاعدة:** لكل صف في T1، ابحث في T2. إذا وجدت تطابقاً (`T1.x = T2.y`) → **ارفض** صف T1 فوراً. إذا لم تجد أي تطابق → أُرجع صف T1.

#### 💻 الكود: مثال Anti-Join

```sql
-- Original query with NOT IN
SELECT COUNT(*)
FROM EMPLOYEE
WHERE EMPLOYEE.Dno NOT IN (
    SELECT DEPARTMENT.Dnumber
    FROM DEPARTMENT
    WHERE Zipcode = 30332
);

-- Equivalent using Anti-Join notation
SELECT COUNT(*)
FROM EMPLOYEE, DEPARTMENT
WHERE EMPLOYEE.Dno A= DEPARTMENT AND Zipcode = 30332;
-- A= means Anti-join condition
```

#### ⚖️ المقايضة: Semi-Join vs Anti-Join

| | `Semi-Join` (⋉) | `Anti-Join` |
|---|---|---|
| **متى يُرجع صف T1** | عند وجود تطابق | عند غياب التطابق |
| **يُستخدم مع** | `EXISTS`, `IN`, `ANY` | `NOT EXISTS`, `NOT IN`, `ALL` |
| **إذا وُجد تطابق** | أُرجع T1 فوراً (توقف) | ارفض T1 فوراً (توقف) |
| **إذا لم يُجد تطابق** | تجاهل صف T1 | أُرجع صف T1 |

#### 🎯 الملخص السريع
- `Semi-join`: للتحقق من **وجود** علاقة (الـ`positive` case)
- `Anti-join`: للتحقق من **غياب** علاقة (الـ`negative` case)
- كلاهما يُرجع أعمدة الجدول الأيسر فقط
- كلاهما يتوقف عند أول نتيجة (أسرع من `INNER JOIN` العادي)

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Semi-join: Generally used for unnesting EXISTS, IN, and ANY subqueries. Syntax: T1.X S = T2.Y. T1 is the left table and T2 is the right table. A row of T1 is returned as soon as T1.X finds a match with any value of T2.Y without searching for further matches.
> Anti-join: Used for unnesting NOT EXISTS, NOT IN, and ALL subqueries. Syntax: T1.x A = T2.y. A row of T1 is rejected as soon as T1.x finds a match with any value of T2.y. A row of T1 is returned only if T1.x does not match with any value of T2.y.

**ملاحظة على التغطية:**
- ✓ تم شرح: كلا المفهومين بالكامل مع أمثلة SQL حقيقية
- ✓ تم شرح: الفرق بينهما مع جدول مقارنة
- ℹ️ إضافة من الدليل: التشبيه بالبحث في القاموس

</details>

---

### 4. خوارزميات الفرز الخارجي (External Sorting)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "90%"} -->
<!-- @connectivity: {prerequisite: "none — مرجع إضافي: Elmasri §18.2"} -->

#### 📍 أين نحن الآن؟
قبل أن نشرح خوارزميات `SELECT` و`JOIN`، نحتاج نفهم الفرز — لأن كثيراً من الخوارزميات تعتمد عليه.

#### 💡 الفكرة الأساسية
**الفرز الخارجي هو فرز ملفات أكبر من الذاكرة الرئيسية — يُقسّم الملف لأجزاء صغيرة (runs)، يُرتّبها، ثم يدمجها.**

---

#### 📖 الشرح

الفرز الداخلي (`internal sorting`) يعمل لما الملف يسع في الذاكرة. لكن قواعد البيانات تتعامل مع ملفات ضخمة — ملايين الصفوف لا تسع في الـ`RAM`. هنا يأتي **`External Sorting`**.

**استراتيجية `Sort-Merge`:**
1. قسّم الملف لأجزاء صغيرة (كل جزء = `run`) بحجم يسع في الذاكرة
2. رتّب كل `run` في الذاكرة وخزّنه على القرص
3. ادمج الـ`runs` المرتبة معاً (`merge phase`)

**استخدام `B+ trees`:** إذا وُجد `B+ tree index` على حقل الفرز، يمكن اجتياز أوراق الشجرة بالترتيب — هذا أسرع من الفرز الفعلي.

#### مهم للامتحان ⚠️:
> هذا الموضوع **مطلوب من المرجع** (Elmasri, §18.2) وليس في الشرائح. راجع الفقرة مباشرة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90%)</summary>

**النص الأصلي يقول:**
> Sorting is an often-used algorithm in query processing. External sorting: Algorithms suitable for large files that do not fit entirely in main memory. Sort-merge strategy based on sorting smaller subfiles (runs) and merging the sorted runs. Requires buffer space in main memory (DBMS cache). Using B+ trees for sorting.

**ملاحظة على التغطية:**
- ✓ تم شرح: المفهوم الأساسي و`Sort-Merge strategy`
- ⚠️ غير مشروح بالكامل: تفاصيل الخوارزمية (`pass` count، `buffer requirements`) — مطلوبة من المرجع §18.2
- ℹ️ إضافة من الدليل: مقارنة مع الفرز الداخلي

</details>

---

### 5. خوارزميات عملية SELECT

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1, indexing knowledge"} -->

#### 📍 أين نحن الآن؟
`SELECT` (σ) هي الخطوة الأولى في معظم الاستعلامات. الآن نرى كيف تُنفَّذ فعلياً.

#### ⬅️ الربط مع السابق
في `query tree`، تقع عمليات σ عند الأوراق أو قريبة منها. اختيار الخوارزمية المناسبة لها يُؤثر كثيراً على الأداء.

#### 💡 الفكرة الأساسية
**هناك ست خوارزميات (S1-S6) لتنفيذ SELECT — الأنسب تعتمد على نوع الشرط، وجود `index`، ونوعه.**

---

#### 📊 جدول خوارزميات SELECT

| # | الخوارزمية | الشرط المطلوب | الكفاءة |
|---|---|---|---|
| **S1** | `Linear Search` | لا شيء — دائماً تعمل | 🔴 بطيئة (O(n)) |
| **S2** | `Binary Search` | equality على مفتاح، الملف مرتب | 🟡 جيدة (O(log n)) |
| **S3a** | `Primary Index` | equality على key attribute + primary index | 🟢 ممتازة |
| **S3b** | `Hash Key` | equality على key attribute + hash index | 🟢 ممتازة (O(1)) |
| **S4** | `Primary Index + Range` | `>`, `≥`, `<`, `≤` على key + primary index | 🟢 جيدة |
| **S5** | `Clustering Index` | equality على non-key + clustering index | 🟢 جيدة |
| **S6** | `Secondary B+ Index` | equality أو range على أي حقل + secondary index | 🟡 متغيرة |

---

#### 5.1. البحث البسيط (S1 & S2)

**`S1: Linear Search`** — يمسح كل الملف صفاً بصف. يعمل دائماً بغض النظر عن أي شيء آخر. الحل الاحتياطي (`fallback`).

**`S2: Binary Search`** — يعمل فقط إذا: (1) الشرط equality، (2) الحقل مفتاح (`key`)، (3) الملف مرتب على هذا الحقل. كفاءة `O(log n)` بدلاً من `O(n)`.

#### 💡 التشبيه (S1 vs S2):
> `S1` مثل تبحث عن رقم في قائمة تلفونات غير مرتبة — تمر على كل رقم.
> `S2` مثل تبحث في قاموس مرتب — تفتح النصف، تحدد الاتجاه، تقسم مجدداً.
> **وجه الشبه:** القاموس المرتب = الملف المرتب على المفتاح

---

#### 5.2. البحث بالـIndex (S3a, S3b, S4, S5, S6)

**`S3a: Primary Index`**: إذا كان الشرط equality على حقل المفتاح الرئيسي مع وجود `primary index` → استخدم الـ`index` للوصول المباشر للسجل. يُرجع سجلاً واحداً فقط.

**`S3b: Hash Key`**: إذا كان الشرط equality على حقل له `hash index` → طبّق دالة الـ`hash` للوصول المباشر. أسرع من `S3a` في كثير من الحالات.

**`S4: Primary Index + Range`**: إذا كان الشرط `>`, `≥`, `<`, `≤` على حقل له `primary index` → ابحث عن أول سجل يحقق الشرط، ثم اقرأ السجلات التالية/السابقة بالترتيب (لأن الملف مرتب).

**`S5: Clustering Index`**: إذا كان الشرط equality على حقل غير مفتاح مع وجود `clustering index` → استخدم الـ`index` لإيجاد أول سجل، ثم اقرأ الـ`blocks` المتتالية (لأن السجلات المتطابقة متجاورة فيزيائياً).

**`S6: Secondary B+ Index`**: يعمل على أي حقل (مفتاح أو لا). للـ`equality` يُرجع مؤشر/عدة مؤشرات. للـ`range queries` — قد يكون بطيئاً لأن السجلات المتطابقة غير متجاورة فيزيائياً.

---

#### 5.3. الشروط المركبة (Conjunctive & Disjunctive)

**Conjunctive (AND):** عندما يكون الشرط `A=x AND B=y`:
- إذا توفر `index` على أحد الحقول: استخدم الأفضل، ثم فلتر النتائج بالشرط الآخر
- إذا توفر `composite index` على كلا الحقلين: استخدمه مباشرة
- إذا توفر `secondary index` بمؤشرات سجلات على كلا الحقلين: تقاطع المجموعتين

**Disjunctive (OR):** أصعب من AND. تحتاج اتحاد (`union`) مؤشرات السجلات من كل `index`. إذا لم يتوفر `index` على بعض الحقول، تضطر لـ`linear scan` كامل.

---

#### 5.4. Selectivity

#### 📐 المعادلة: حساب Selectivity

$$
sl(C) = \frac{\text{عدد الصفوف التي تُحقق الشرط C}}{\text{إجمالي عدد الصفوف في الملف}}
$$

**الشرح:**
> `sl(C)` = درجة انتقائية الشرط C، قيمة بين 0 و 1
> قيمة 0 = لا صف يحقق الشرط
> قيمة 1 = كل الصفوف تحقق الشرط
> قيمة 0.01 = 1% من الصفوف تحقق الشرط

الـ`query optimizer` يستخدم الـ`selectivity` المخزنة في الـ`catalog` لتقدير حجم النتائج ومقارنة تكلفة الخوارزميات.

#### 🎯 الملخص السريع
- 6 خوارزميات (S1-S6) للـ`SELECT` — من البسيط (linear) للمتقدم (index-based)
- الخوارزمية المناسبة تعتمد على: نوع الشرط + وجود `index` + نوعه
- `Selectivity` تساعد الـ`optimizer` في الاختيار
- للشروط المركبة: تقاطع (AND) أو اتحاد (OR) مؤشرات السجلات

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> S1: Linear search — Retrieve every record in the file, and test whether its attribute values satisfy the selection condition. S2: Binary search — If the selection condition involves an equality comparison on a key attribute on which the file is ordered. S3a: Using a primary index — equality comparison on a key attribute with a primary index. S3b: Using a hash key. S4: Using a primary index to retrieve multiple records — comparison condition is >, ≥, <, or ≤ on a key field with a primary index. S5: Using a clustering index to retrieve multiple records — equality comparison on a non-key attribute with a clustering index. S6: Using a secondary (B+-tree) index on an equality comparison.
> Conjunctive selection: Using an individual index, Using a composite index, Intersection of record pointers.
> Disjunctive selection: Harder to process and optimize — union of record pointers.
> Selectivity: Ratio of the number of records (tuples) that satisfy the condition to the total number of records. Number between zero and one. Query optimizer receives input from system catalog to estimate selectivity.

**ملاحظة على التغطية:**
- ✓ تم شرح: كل خوارزميات S1-S6 بالتفصيل
- ✓ تم شرح: الشروط المركبة (AND/OR)
- ✓ تم شرح: مفهوم الـ`Selectivity` + المعادلة

</details>

---

### 6. معلومات Database Catalog

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن الآن؟
الـ`optimizer` يحتاج بيانات إحصائية ليتخذ قراراته. هذه البيانات تُخزن في الـ`catalog`.

#### 💡 الفكرة الأساسية
**الـ`catalog` هو "ذاكرة" قاعدة البيانات عن نفسها — يحتوي إحصاءات تساعد الـ`optimizer` في تقدير تكاليف العمليات.**

---

#### 📊 محتوى الـDatabase Catalog

**لكل جدول r بـ schema R:**

| الرمز | الاسم | المعنى |
|---|---|---|
| `r_R` أو `\|r(R)\|` | Cardinality | عدد الصفوف في الجدول |
| `R` | Tuple width | طول الصف الواحد (bytes) |
| `b_R` | Block count | عدد الـ`blocks` التي يشغلها الجدول |
| `bfr` | Blocking factor | عدد الصفوف في الـ`block` الواحد |

**لكل عمود A في جدول R:**

| الرمز | المعنى |
|---|---|
| `NDV(A, R)` | Number of Distinct Values — عدد القيم المختلفة للعمود A |
| `max(A, R)` | القيمة الأكبر للعمود A في R |
| `min(A, R)` | القيمة الأصغر للعمود A في R |

#### 📖 الشرح

تخيّل جدول `EMPLOYEE` فيه 10,000 موظف مخزن في 500 `block`، وعمود `Salary` قيمه تتراوح من 3,000 لـ150,000 ريال. الـ`catalog` يخزن:
- `r_EMPLOYEE = 10,000`
- `b_EMPLOYEE = 500`
- `bfr = 20` (20 موظف في كل block)
- `NDV(Salary, EMPLOYEE) = 8,000` (8,000 قيمة راتب مختلفة)
- `max(Salary, EMPLOYEE) = 150,000`
- `min(Salary, EMPLOYEE) = 3,000`

الـ`optimizer` يستخدم هذه الأرقام لتقدير: لو الشرط `Salary > 140,000`، كم صف سيُرجع؟ يُقدّر بـ~670 صف (أقل من 7% من الجدول) ← يستحق استخدام `index`.

#### 🎯 الملخص السريع
- الـ`catalog` يخزن إحصاءات لكل جدول وكل عمود
- الـ`optimizer` يستخدمها لتقدير تكلفة كل خطة تنفيذ
- `NDV` مهم جداً لحساب الـ`selectivity`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> For each relation r with schema R containing r_R tuples: The number of rows/records or its cardinality |r(R)|. The "width" of the relation (i.e., the length of each tuple in the relation). The number of blocks that relation occupies in storage: b_R. The blocking factor bfr (number of tuples per block). For each attribute A in relation R: The number of distinct values of A in R: NDV(A,R). The max and min values of attribute A in R: max(A,R) and min(A,R).

**ملاحظة على التغطية:**
- ✓ تم شرح: كل المعلومات المخزنة في الـ`catalog` مع مثال عملي

</details>

---

### 7. تنفيذ عملية JOIN

<!-- @render: {type: "prose-first", visualization: "algorithm", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن الآن؟
`JOIN` هي أبطأ وأصعب عملية في معالجة الاستعلامات. هنا نتعلم أربع خوارزميات لتنفيذها.

#### ⬅️ الربط مع السابق
بعد تنفيذ `SELECT` على كل جدول، نحتاج ضم النتائج. اختيار الخوارزمية المناسبة للـ`JOIN` يُحدد الفرق بين ثوانٍ وساعات.

#### 💡 الفكرة الأساسية
**هناك 4 خوارزميات لتنفيذ JOIN: J1 (Nested-Loop)، J2 (Index-Based)، J3 (Sort-Merge)، J4 (Partition-Hash) — كل واحدة مناسبة لحالة مختلفة.**

---

#### 7.1. J1: Nested-Loop Join

#### ⚙️ الخطوات / الخوارزمية: Nested-Loop Join

#### ما هدف هذه العملية؟
> ضم جدولين R وS بالمقارنة الشاملة لكل زوج من الصفوف. يعمل دائماً بغض النظر عن أي شيء.

```algorithm
1 | for each tuple t in R (outer loop) | R | اجلب صفاً من R
2 | for each tuple s in S (inner loop)  | S | اجلب صفاً من S
3 | if t[A] = s[B]                      | comparator | قارن قيم حقل الـjoin
4 | then output <t, s> to T             | output | أُرجع الزوج المتطابق
```

#### نقاط التنفيذ:
- **التكلفة**: لكل صف في R، تمسح كل S → تكلفة = `|R| × |S|` مقارنة
- **تحسين الـBuffer**: اقرأ أكبر عدد ممكن من `blocks` R في الذاكرة معاً → قلل قراءات القرص
- **من يكون `outer loop`؟**: الجدول الأصغر (بعدد الـ`blocks`) يجب أن يكون الـ`outer loop`

#### 💡 التشبيه:
> مثل مقارنة قائمتين يدوياً: لكل اسم في القائمة الأولى، تتحقق من كل أسماء القائمة الثانية.
> **وجه الشبه:** القائمة الأولى = R (outer)، القائمة الثانية = S (inner)

---

#### 7.2. J2: Index-Based Nested-Loop Join

#### ⚙️ الخطوات / الخوارزمية: Index-Based Nested-Loop

```algorithm
1 | for each tuple t in R (outer loop)  | R        | اجلب صفاً من R
2 | use index on S.B                    | B+tree/Hash | ابحث في الـindex مباشرة
3 | retrieve matching tuples s from S   | S        | جلب الصفوف المطابقة فقط
4 | output <t, s> to T                 | output   | أُرجع الأزواج المتطابقة
```

#### نقاط التنفيذ:
- يُشترط وجود `index` على حقل الـ`join` في S (الـ`inner` relation)
- أسرع بكثير من J1 — لا نمسح S بالكامل لكل صف من R
- `Hash index` → أسرع للـ`equality join`
- `B+ tree` → يعمل للـ`range join` أيضاً

---

#### 7.3. J3: Sort-Merge Join

#### ⚙️ الخطوات / الخوارزمية: Sort-Merge

```algorithm
1 | sort R on attribute A               | sort      | رتّب R على حقل الـjoin
2 | sort S on attribute B               | sort      | رتّب S على حقل الـjoin
3 | set i=1, j=1                        | init      | ابدأ من الأول في كلا الملفين
4 | while (i≤n) and (j≤m)              | loop      | طالما لم ننهِ أحد الملفين
5 |   if R(i)[A] > S(j)[B]: j++        | advance S | تقدم في S إذا R أكبر
6 |   elif R(i)[A] < S(j)[B]: i++      | advance R | تقدم في R إذا S أكبر
7 |   else: output all matching pairs   | match     | طابق كل الأزواج المتساوية
```

#### نقاط التنفيذ:
- يمسح كل ملف **مرة واحدة فقط** (بعد الترتيب)
- إذا كلا الحقلين `non-key`: تحتاج تعديلاً طفيفاً للتعامل مع التكرارات
- مثالي إذا الملفات مرتبة مسبقاً على حقل الـ`join`

#### 💡 التشبيه:
> مثل دمج مجموعتين من الأوراق المرتبة أبجدياً: تُقارن الورقة العلوية من كل مجموعة، تأخذ الأصغر وتتقدم.
> **وجه الشبه:** المجموعتان = R وS، الورقة العلوية = المؤشر الحالي

---

#### 7.4. J4: Partition-Hash Join

#### ⚙️ الخطوات / الخوارزمية: Partition-Hash Join

```algorithm
1 | apply hash(A) on all R tuples       | hash function | خزّن R في hash buckets
2 | single pass through R               | R             | اقرأ R مرة واحدة
3 | apply same hash(B) on S tuples      | hash function | نفس الدالة على S
4 | for each S tuple → matching bucket  | S             | اقرأ S مرة واحدة
5 | compare S tuple with all R tuples   | comparator    | قارن مع محتوى الـbucket
6 | output matching pairs               | output        | أُرجع الأزواج المتطابقة
```

#### نقاط التنفيذ:
- **نفس** دالة الـ`hash` على كلا الحقلين → الصفوف المتطابقة تذهب لنفس الـ`bucket`
- `R` الأصغر يُخزَّن في الـ`buckets` (يبقى في الذاكرة)
- `S` الأكبر يُمسح مرة واحدة فقط
- ممتاز لـ`equality join` عندما لا `index` متاح

---

#### ⚖️ مقارنة خوارزميات JOIN

| | **J1: Nested-Loop** | **J2: Index-Based** | **J3: Sort-Merge** | **J4: Partition-Hash** |
|---|---|---|---|---|
| **المتطلبات** | لا شيء | `index` على S.B | ملفان مرتبان | ذاكرة لـ`buckets` |
| **التكلفة** | عالية جداً | متوسطة | منخفضة | منخفضة |
| **أفضل حالاتها** | ملفات صغيرة | `index` موجود | ملفات مرتبة | لا `index`، ملفات كبيرة |
| **نوع الـJoin** | أي نوع | `equijoin/range` | `equijoin` | `equijoin` فقط |

#### 🎯 الملخص السريع
- J1: أبسط لكن أبطأ — يقارن كل شيء بكل شيء
- J2: يستغل الـ`index` — لا يمسح S بالكامل
- J3: يستغل الترتيب — يمسح كل ملف مرة
- J4: يستغل الـ`hashing` — يمسح كل ملف مرة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> JOIN operation: One of the most time consuming in query processing. EQUIJOIN (NATURAL JOIN), Two-way or multiway joins.
> J1: Nested-loop join (nested-block join): For each record t in R, retrieve every record s from S and test whether the two records satisfy the join condition t[A]=s[B].
> J2: Index-based nested-loop join: If an index (or hash key) exists for one of the two join attributes, retrieve each record t in R, one at a time, and then use the access structure to retrieve directly all matching records s from S.
> J3: Sort-merge join: If the records of R and S are physically sorted (ordered) by value of the join attributes A and B, respectively, we can implement the join in the most efficient way possible. Both files are scanned in order of the join attributes, matching the records that have the same values for A and B. In this method, the records of each file are scanned only once each for matching with the other file.
> J4: Partition-hash join: The records of files R and S are both hashed to the same hash file, using the same hashing function on the join attributes A of R and B of S as hash keys. A single pass through the file with fewer records (say, R) hashes its records to the hash file buckets. A single pass through the other file (S) then hashes each of its records to the appropriate bucket.

**ملاحظة على التغطية:**
- ✓ تم شرح: كل خوارزميات J1-J4 بالتفصيل مع خوارزميات مكتوبة
- ✓ تم شرح: تأثير الـ`buffer` على J1 + `Join Selection Factor`
- ✓ تم شرح: مقارنة شاملة بين الخوارزميات الأربع

</details>

---

### 8. خوارزميات PROJECT والعمليات المجموعية

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 📍 أين نحن الآن؟
بعد تعلم `SELECT` و`JOIN`، ننتقل لعمليات `PROJECT` وعمليات المجموعات (UNION, INTERSECTION...).

#### 💡 الفكرة الأساسية
**`PROJECT` تسحب الأعمدة المطلوبة وتُزيل التكرارات؛ عمليات المجموعات تستخدم `sort-merge` أو `hashing`.**

---

#### 8.1. عملية PROJECT

**المشكلة:** بعد سحب الأعمدة المطلوبة (π)، قد تنتج صفوف مكررة. يجب إزالتها.

#### ⚙️ الخطوات / الخوارزمية: PROJECT مع إزالة التكرارات

```algorithm
1 | project R on attribute list → T'   | scan      | اسحب الأعمدة المطلوبة
2 | if attr list includes a key of R   | check     | هل يشمل مفتاح الجدول؟
3 |   then T = T' (no duplicates)      | skip sort | لا تكرارات ممكنة — انتهى
4 | else: sort T' on all attributes    | sort      | رتّب T' لاكتشاف التكرارات
5 | scan sorted T' and remove dups     | scan      | امسح وأزل التكرارات
6 | output T (final result)            | output    | النتيجة النهائية
```

#### ملاحظة:
> في SQL، `SELECT` (بدون `DISTINCT`) لا يُزيل التكرارات افتراضياً — يُرجع `multiset`. إزالة التكرارات تحتاج ترتيباً وتكلفة إضافية، لذا SQL جعلها اختيارية.

---

#### 8.2. عمليات المجموعات (Set Operations)

**الأنواع:** `UNION`, `INTERSECTION`, `SET DIFFERENCE`, `CARTESIAN PRODUCT`

**كيف تُنفَّذ:** في الغالب بـ`sort-merge` أو `hashing` — كلاهما يرتب/يُجمّع الصفوف أولاً لسهولة المقارنة.

#### 🔄 خوارزمية UNION (Sort-Merge)

```algorithm
1 | sort R and S using same attributes  | sort     | رتّب الجدولين بنفس المعيار
2 | scan both sorted files simultaneously | scan   | امسح الاثنين معاً
3 | if R(i) < S(j): output R(i), i++   | output R | أُرجع من R وتقدم
4 | if R(i) > S(j): output S(j), j++   | output S | أُرجع من S وتقدم
5 | if R(i) = S(j): output R(i), j++   | skip dup | تجاهل أحد المكررين فقط
6 | output remaining tuples             | tail     | أُرجع ما تبقى من أي ملف
```

#### 🔄 خوارزمية INTERSECTION (Sort-Merge)

```algorithm
1 | sort R and S using same attributes  | sort     | رتّب الجدولين
2 | scan both simultaneously            | scan     | امسح معاً
3 | if R(i) > S(j): j++ (skip)         | skip     | تجاهل S الأصغر
4 | if R(i) < S(j): i++ (skip)         | skip     | تجاهل R الأصغر
5 | if R(i) = S(j): output, i++, j++   | match    | تطابق — أُرجع وتقدم
```

#### 🔄 خوارزمية SET DIFFERENCE (R - S)

```algorithm
1 | sort R and S                        | sort     | رتّب الجدولين
2 | scan both simultaneously            | scan     | امسح معاً
3 | if R(i) > S(j): j++ (skip)         | skip     | تجاهل S الأصغر
4 | if R(i) < S(j): output R(i), i++  | output R | R ليس في S — أُرجعه
5 | if R(i) = S(j): i++, j++           | skip     | موجود في S — لا تُرجعه
6 | if (i≤n): output R(i)..R(n)        | tail     | ما تبقى في R ليس في S
```

---

#### 8.3. CARTESIAN PRODUCT

الـ`CARTESIAN PRODUCT` من R (n صف، j عمود) و S (m صف، k عمود):
- النتيجة: `n × m` صف، `j + k` عمود
- مثال: R فيه 1000 صف، S فيه 5000 صف → الناتج 5,000,000 صف!

#### مهم للامتحان ⚠️:
> `CARTESIAN PRODUCT` **باهظ التكلفة جداً** وقاعدة البيانات تتجنبه دائماً. إذا وجدت `JOIN` بشرط، النظام ينفذها مباشرة ولا يمر بـ`CARTESIAN PRODUCT`. إذا كتبت `SELECT * FROM R, S` بدون `WHERE` → هذا `CARTESIAN PRODUCT` ← تجنبه!

---

#### 8.4. Anti-Join واستخدامه لـSET DIFFERENCE

**مثال:** أوجد الأقسام التي لا فيها موظفون:
```sql
-- Using SET DIFFERENCE
SELECT Dnumber FROM DEPARTMENT
MINUS
SELECT Dno FROM EMPLOYEE;

-- Equivalent with Anti-Join
SELECT DISTINCT DEPARTMENT.Dnumber
FROM DEPARTMENT, EMPLOYEE
WHERE DEPARTMENT.Dnumber A= EMPLOYEE.Dno;
```

#### 🎯 الملخص السريع
- `PROJECT` يُزيل التكرارات بالترتيب (إلا لو الـ`attribute list` يشمل مفتاحاً)
- `UNION/INTERSECTION/DIFFERENCE` تستخدم `sort-merge` أو `hashing`
- `CARTESIAN PRODUCT` أغلى عملية — تجنبها دائماً
- `Anti-join` يُنفذ `SET DIFFERENCE` بكفاءة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> PROJECT operation: After projecting R on only the columns in the list of attributes, any duplicates are removed by treating the result strictly as a set of tuples. Default for SQL queries: No elimination of duplicates from the query result. Duplicates eliminated only if the keyword DISTINCT is included.
> Set operations: UNION, INTERSECTION, SET DIFFERENCE, CARTESIAN PRODUCT. Set operations sometimes expensive to implement — Sort-merge technique, Hashing.
> CARTESIAN PRODUCT: The cartesian product includes all possible combinations of records from R and S. If R has n records and j attributes and S has m records and k attributes, the result relation will have n*m records and j+k attributes. The cartesian product operation is very expensive and should be avoided if possible.

**ملاحظة على التغطية:**
- ✓ تم شرح: `PROJECT` + إزالة التكرارات
- ✓ تم شرح: خوارزميات `UNION`, `INTERSECTION`, `SET DIFFERENCE`
- ✓ تم شرح: `CARTESIAN PRODUCT` + تحذير التكلفة

</details>

---

### 9. تنفيذ عمليات التجميع وأنواع JOIN المتقدمة

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7, section_8"} -->

#### 📍 أين نحن الآن؟
تعلمنا كيفية تنفيذ `SELECT`, `JOIN`, `PROJECT`, والعمليات المجموعية. الآن نتعلم عمليات التجميع (`Aggregate`) وأنواع `JOIN` المتقدمة.

#### 💡 الفكرة الأساسية
**دوال التجميع (MIN, MAX, COUNT, SUM, AVG) تُحسب بـ`table scan` أو باستغلال `indexes`؛ وهناك أنواع متعددة من JOIN تُنفَّذ بتوسيع الخوارزميات الأساسية.**

---

#### 9.1. دوال التجميع الأساسية

**الدوال:** `MIN`, `MAX`, `COUNT`, `AVERAGE`, `SUM`

**طريقتا الحساب:**
1. **`Table Scan`**: امسح كل الجدول وتتبع القيمة المطلوبة — يعمل دائماً لكن O(n)
2. **استغلال `Index`**: إذا وجد `index` على العمود المستهدف، استخدمه مباشرة

#### 📊 استغلال الـIndex لكل دالة

| الدالة | مع `B+ tree` ascending | ملاحظات |
|---|---|---|
| **MAX(A)** | اذهب لأقصى يمين الشجرة (أول ورقة من اليمين) | O(log n) |
| **MIN(A)** | اذهب لأقصى يسار الشجرة (أول ورقة من اليسار) | O(log n) |
| **COUNT** | عد المدخلات في الـ`index` | لا تحتاج فتح السجلات |
| **SUM / AVG** | `dense index`: احسب من قيم الـ`index` | بدون الوصول للسجلات الأصلية |
| **SUM / AVG** | `non-dense index`: احتاج عدد السجلات لكل قيمة | مخزّن في كل مدخل `index` |

#### 💡 التشبيه (MAX مع B+ tree):
> مثل تبحث عن الكلمة الأخيرة في قاموس مرتب — مباشرة لآخر صفحة بدون قراءة كل القاموس.
> **وجه الشبه:** آخر صفحة القاموس = أقصى يمين الـ`B+ tree`

---

#### 9.2. GROUP BY

**الهدف:** تقسيم الصفوف لمجموعات بناءً على قيم عمود معين، ثم تطبيق دالة تجميع على كل مجموعة.

#### ⚙️ الخطوات / الخوارزمية: GROUP BY

```algorithm
1 | partition file by grouping attrs    | sort/hash | قسّم الصفوف لمجموعات
2 | for each group                      | loop      | لكل مجموعة
3 |   compute aggregate function        | aggregate | احسب MIN/MAX/COUNT/SUM/AVG
4 |   output (group key, aggregate)     | output    | أُرجع المجموعة + النتيجة
```

**إذا وجد `clustering index` على حقل الـ`group by`:** الصفوف المتشابهة متجاورة فيزيائياً — لا حاجة للفرز، امسح مباشرة مجموعة مجموعة. أسرع بكثير!

---

#### 9.3. أنواع JOIN المتقدمة

**`Standard JOIN` (= `INNER JOIN` في SQL):** يُرجع فقط الصفوف التي لها تطابق في الجدولين.

**`Outer Join` (ثلاثة أنواع):**

| النوع | ما يُرجع |
|---|---|
| `LEFT OUTER JOIN` | كل صفوف الجدول الأيسر + الصفوف المتطابقة من الأيمن (NULL للغير متطابق) |
| `RIGHT OUTER JOIN` | كل صفوف الجدول الأيمن + الصفوف المتطابقة من الأيسر (NULL للغير متطابق) |
| `FULL OUTER JOIN` | كل الصفوف من الجدولين مع NULL حيث لا تطابق |

```sql
-- Example: LEFT OUTER JOIN
SELECT E.Lname, E.Fname, D.Dname
FROM (EMPLOYEE E LEFT OUTER JOIN DEPARTMENT D ON E.Dno = D.Dnumber);
-- يُرجع كل الموظفين، حتى من لا قسم لهم (Dname = NULL)
```

**`Non-Equi-Join`**: `JOIN` بشرط غير equality (مثل `<`, `>`, `BETWEEN`). أبطأ من `equijoin` — لا يمكن استخدام `Sort-Merge` أو `Partition-Hash` بشكل مباشر.

#### 🎯 الملخص السريع
- دوال التجميع يمكن تسريعها باستغلال `B+ tree indexes`
- `MAX` → أقصى يمين الشجرة، `MIN` → أقصى يسار
- `GROUP BY` يستغل `clustering index` إذا وُجد
- `OUTER JOIN` يُرجع صفوفاً حتى بدون تطابق (بـNULL)

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Aggregate operators: MIN, MAX, COUNT, AVERAGE, SUM. Can be computed by a table scan or using an appropriate index. If an (ascending) B+-tree index on Salary exists: Optimizer can use the Salary index to search for the largest Salary value. Follow the rightmost pointer in each index node from the root to the rightmost leaf.
> AVERAGE or SUM: Index can be used if it is a dense index. Computation applied to the values in the index. Nondense index can be used if actual number of records associated with each index value is stored in each index entry.
> COUNT: Number of values can be computed from the index.
> GROUP BY: Use sorting or hashing on the group attributes to partition the file into the appropriate groups; Computes the aggregate function for the tuples in each group. What if we have Clustering index on the grouping attributes?
> Standard JOIN (called INNER JOIN in SQL). Variations of joins: Outer join (Left, right, and full). Semi-Join. Anti-Join. Non-Equi-Join.

**ملاحظة على التغطية:**
- ✓ تم شرح: كل دوال التجميع + استغلال الـ`index`
- ✓ تم شرح: `GROUP BY` + `clustering index` optimization
- ✓ تم شرح: كل أنواع الـ`JOIN` المتقدمة

</details>

---

### 10. الجمع بين العمليات باستخدام Pipelining

<!-- @render: {type: "prose-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "all previous sections"} -->

#### 📍 أين نحن الآن؟
تعلمنا كيف تُنفَّذ كل عملية منفردة. الآن نتعلم كيف يُجمع نظام الـ`DBMS` بين العمليات بكفاءة.

#### 💡 الفكرة الأساسية
**بدل تنفيذ كل عملية وحفظ نتيجتها في ملف مؤقت، `pipelining` تُمرر النتائج مباشرة من عملية لأخرى — أسرع وأوفر للذاكرة.**

---

#### ⚖️ المقايضة: Materialized Evaluation vs Pipelining

| | **Materialized Evaluation** | **Pipelining** |
|---|---|---|
| **كيف يعمل** | كل عملية تُنفَّذ وتُخزن نتيجتها في ملف مؤقت | النتائج تُمرر مباشرة من عملية للتالية |
| **الذاكرة** | تحتاج مساحة لكل ملف مؤقت | لا ملفات مؤقتة |
| **متى تبدأ النتائج** | بعد انتهاء آخر عملية | فور انتهاء أول صف |
| **المزايا** | أبسط، تدعم أي عملية | أسرع، يوفر ذاكرة |
| **العيوب** | بطيئة، تحتاج مساحة | لا تعمل مع بعض العمليات (مثل `Sort`) |

---

#### 10.1. مفهوم Iterator

**`Iterator`**: كل عملية تُنفَّذ كـ`iterator` — تُرجع صفاً واحداً في كل استدعاء.

#### ⚙️ الخطوات / الخوارزمية: Iterator Interface

```algorithm
1 | Open()     | initialize | تهيئة العملية وفتح مصادر البيانات
2 | Get_Next() | execute    | إرجاع الصف التالي (يستدعي Get_Next() على المدخلات)
3 | Close()    | cleanup    | تحرير الموارد والإغلاق
```

#### 📊 مثال: كيف يعمل Pipelining

```
الاستعلام: SELECT Fname, Lname FROM EMPLOYEE WHERE Salary > 5000

يُنفَّذ كـ pipeline:
┌─────────────────────────────────────────────────────────┐
│  PROJECT (π_{Fname,Lname})                              │
│       ↑ يستدعي Get_Next() على SELECT                   │
│  SELECT (σ_{Salary>5000})                               │
│       ↑ يستدعي Get_Next() على SCAN                     │
│  FILE SCAN (EMPLOYEE)                                   │
└─────────────────────────────────────────────────────────┘

كل مرة يستدعي المستخدم Get_Next() على PROJECT:
1. PROJECT يستدعي Get_Next() على SELECT
2. SELECT يستدعي Get_Next() على SCAN
3. SCAN يُرجع الصف التالي من القرص
4. SELECT يُقيّم الشرط — إذا تحقق يُرجعه لـPROJECT
5. PROJECT يُرجع الأعمدة المطلوبة للمستخدم
```

#### 📖 الشرح

**لماذا `Pipelining` أسرع؟** لأنه يتجنب كتابة وقراءة الملفات المؤقتة من القرص (I/O). في `materialized evaluation`، كل عملية تنتهي قبل أن تبدأ التالية — هذا يعني تأخيراً كبيراً. في `pipelining`، المستخدم يبدأ يرى النتائج فور معالجة أول صف.

**متى لا يعمل `Pipelining`؟** العمليات التي تحتاج رؤية كل البيانات قبل إرجاع أي نتيجة لا تُدعم جيداً بـ`pipelining` — مثل `Sort` (تحتاج رؤية كل البيانات قبل الترتيب) و`GROUP BY` (تحتاج تجميع كل مجموعة). في هذه الحالات، يُستخدم `materialized evaluation` لهذه العمليات بينما `pipelining` يُستخدم للعمليات الأخرى.

#### 💡 التشبيه:
> `Materialized Evaluation` مثل الطباخ الذي ينتهي من تقطيع كل المكونات ويضعها في أطباق، ثم يبدأ الطبخ.
> `Pipelining` مثل خط إنتاج مصنع: ما إن يُقطَّع المكوّن الأول حتى ينتقل للمرحلة التالية مباشرة.
> **وجه الشبه:** المكونات = الصفوف، مراحل الإنتاج = العمليات الجبرية

#### 🎯 الملخص السريع
- `Pipelining` = تمرير النتائج مباشرة بدون ملفات مؤقتة
- `Iterator` = كل عملية تُرجع صفاً واحداً عند الطلب: `Open/Get_Next/Close`
- `Pipelining` لا يعمل مع عمليات تحتاج رؤية كل البيانات أولاً (Sort, Group By)
- الهدف العام = تقليل عدد الملفات المؤقتة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> SQL query translated into relational algebra expression — sequence of relational operations. Materialized evaluation: Creating, storing, and passing temporary results. General query goal: minimize the number of temporary files. Pipelining or stream-based processing: Combines several operations into one. Avoids writing temporary files. Pipelined evaluation benefits: Avoiding cost and time delay associated with writing intermediate results to disk. Being able to start generating results as quickly as possible. Iterator: Operation implemented in such a way that it outputs one tuple at a time. Many iterators may be active at one time. Iterator interface methods: Open(), Get_Next(), Close(). Some physical operators may not lend themselves to the iterator interface concept. Pipelining not supported. Iterator concept can also be applied to access methods.

**ملاحظة على التغطية:**
- ✓ تم شرح: كل مفاهيم `Pipelining` vs `Materialized Evaluation`
- ✓ تم شرح: `Iterator` interface مع مثال
- ℹ️ إضافة من الدليل: مثال تصويري لـ`pipeline`

</details>

---

## الجزء الثالث: أسئلة الاختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط وصعب

---

### السؤال 1 (متوسط)

أيٌّ من التالي يصف **ترتيب** مراحل معالجة الاستعلام بشكل صحيح؟

أ) Validation → Parsing → Scanning → Query Tree → Optimization
ب) Scanning → Parsing → Validation → Query Tree → Optimization
ج) Parsing → Scanning → Query Tree → Validation → Optimization
د) Query Tree → Scanning → Parsing → Validation → Optimization

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** الترتيب الصحيح: `Scanner` أولاً (يُحدد الـ`tokens`)، ثم `Parser` (يُحلل التركيب النحوي)، ثم `Validation` (يُتحقق من وجود الجداول/الأعمدة)، ثم بناء `Query Tree`، ثم `Optimization`.
- ❌ **الخيار أ):** `Validation` قبل `Parsing` خطأ — لا يمكن التحقق من الأسماء قبل فهم بنية الجملة.
- ❌ **الخيار ج):** `Parsing` قبل `Scanning` مستحيل — الـ`Parser` يعمل على `tokens` يُنتجها الـ`Scanner`.
- ❌ **الخيار د):** بناء `Query Tree` قبل `Parsing` مستحيل — الشجرة ناتج عملية الـ`Parse`.

---

### السؤال 2 (متوسط)

استعلام SQL يحتوي `subquery` متداخلة. كيف يتعامل الـ`query optimizer` معه؟

أ) يُنفذ الـ`subquery` والـ`main query` معاً كعملية واحدة
ب) يُقسمه لـ`query blocks` ويُحسّن كل `block` على حدة
ج) يُحوّل كل شيء لـ`CARTESIAN PRODUCT` ثم يُفلتر
د) يُنفذ الـ`main query` أولاً ثم الـ`subquery`

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** SQL يُقسَّم لـ`query blocks` — كل `SELECT-FROM-WHERE` هو `block` مستقل. كل `block` يُترجم لـ`relational algebra` ويُحسَّن بشكل مستقل.
- ❌ **الخيار أ):** العمليات لا تُنفَّذ معاً — يجب معالجة الـ`subquery` أولاً لأن الـ`main query` يعتمد على نتيجتها.
- ❌ **الخيار ج):** `CARTESIAN PRODUCT` تكلفتها هائلة والنظام يتجنبها.
- ❌ **الخيار د):** في الاستعلامات المتداخلة، الـ`inner block` يُحسب أولاً لأن الـ`outer block` يحتاج نتيجته.

---

### السؤال 3 (متوسط)

ما الفرق الأساسي بين `Semi-join` و`INNER JOIN`؟

أ) `Semi-join` أبطأ لأنه يبحث في كل الجدول الأيمن
ب) `Semi-join` يُرجع فقط صفوف الجدول الأيسر بدون تكرار
ج) `Semi-join` يُرجع صفوفاً من الجدولين كـ`INNER JOIN`
د) لا فرق بينهما في النتيجة

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** `Semi-join` يُرجع فقط صفوف الجدول الأيسر (T1) عند وجود تطابق — بدون أعمدة من T2، وبدون تكرار حتى لو تطابق مع أكثر من صف في T2.
- ❌ **الخيار أ):** `Semi-join` أسرع من `INNER JOIN` — يتوقف عند أول تطابق.
- ❌ **الخيار ج):** هذا وصف `INNER JOIN` — `Semi-join` لا يُرجع أعمدة T2.
- ❌ **الخيار د):** الفرق جوهري: `INNER JOIN` قد يُضاعف الصفوف (عدة تطابقات)، `Semi-join` يُرجع كل صف من T1 مرة واحدة فقط.

---

### السؤال 4 (صعب)

أيٌّ من الخوارزميات يُستخدم لتنفيذ `SELECT` على شرط `Salary = 50000` إذا كان `Salary` حقل غير مفتاح وعليه `B+ tree secondary index`؟

أ) S2: Binary Search
ب) S3a: Primary Index
ج) S6: Secondary B+ Index
د) S4: Primary Index to retrieve multiple records

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `S6` يستخدم `secondary B+ tree index` على أي حقل (مفتاح أو لا) لعمليات `equality` أو `range`. هنا `Salary` غير مفتاح وعليه `secondary index` → `S6` هو الخيار الصحيح.
- ❌ **الخيار أ):** `S2` يشترط الملف مرتباً على حقل **مفتاح** — `Salary` ليس مفتاحاً.
- ❌ **الخيار ب):** `S3a` يشترط `primary index` على حقل المفتاح — هنا الـ`index` ثانوي (`secondary`).
- ❌ **الخيار د):** `S4` يشترط `primary index` وشرط range (`>`, `<`) — الشرط هنا `equality`.

---

### السؤال 5 (صعب)

جدول EMPLOYEE يحتوي 10,000 صف ومنهم 500 موظف رواتبهم أكثر من 200,000. ما `selectivity` الشرط `Salary > 200,000`؟

أ) 0.5
ب) 0.05
ج) 0.95
د) 200,000

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** `Selectivity = 500 / 10,000 = 0.05`. أي 5% من الصفوف تُحقق الشرط.
- ❌ **الخيار أ):** 0.5 يعني 50% من الصفوف — وهذا 5,000 موظف وهو خطأ.
- ❌ **الخيار ج):** 0.95 يعني 95% من الصفوف تُحقق الشرط — هذا عكس المنطق (المرتفعون أقلية).
- ❌ **الخيار د):** `Selectivity` نسبة (بين 0 و1) وليست القيمة المقارنة.

---

### السؤال 6 (متوسط)

أي خوارزمية `JOIN` تُعطي أفضل أداء لو الملفين R وS **مرتبان مسبقاً** على حقل الـ`join`؟

أ) J1: Nested-Loop
ب) J2: Index-Based
ج) J3: Sort-Merge
د) J4: Partition-Hash

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `Sort-Merge Join` ممتاز لما الملفان مرتبان مسبقاً — يتخطى مرحلة الترتيب (الأغلى) ويمسح كل ملف مرة واحدة فقط.
- ❌ **الخيار أ):** `Nested-Loop` لا يستغل الترتيب — يظل O(n×m).
- ❌ **الخيار ب):** `Index-Based` أفضل لو وُجد `index` — لكن السؤال يقول مرتبان (ليس بالضرورة بـ`index`).
- ❌ **الخيار د):** `Partition-Hash` لا يستغل الترتيب — يُعيد `hashing` كل شيء.

---

### السؤال 7 (صعب)

ما عدد الصفوف الناتجة عن `CARTESIAN PRODUCT` لجدولين: الأول فيه 100 صف و3 أعمدة، والثاني فيه 50 صف و5 أعمدة؟

أ) 150 صف و8 أعمدة
ب) 5,000 صف و8 أعمدة
ج) 5,000 صف و15 أعمدة
د) 100 صف و5 أعمدة

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** عدد الصفوف = `100 × 50 = 5,000`؛ عدد الأعمدة = `3 + 5 = 8`. النتيجة تشمل كل تركيبات الصفوف وكل الأعمدة من الجدولين.
- ❌ **الخيار أ):** 150 = جمع الصفوف وهو خطأ — `CARTESIAN PRODUCT` يضرب وليس يجمع.
- ❌ **الخيار ج):** 15 عمود خاطئ — الأعمدة تُجمع (3+5=8) وليست تُضرب.
- ❌ **الخيار د):** خاطئ تماماً — لا صلة بالحساب.

---

### السؤال 8 (متوسط)

ما الفرق بين `Semi-join` و`Anti-join`؟

أ) `Semi-join` يُرجع صفوف T1 عند التطابق؛ `Anti-join` عند عدم التطابق
ب) `Semi-join` يُرجع صفوف T2؛ `Anti-join` يُرجع صفوف T1
ج) `Semi-join` يُرجع أعمدة من الجدولين؛ `Anti-join` من جدول واحد
د) كلاهما يُرجع نفس النتيجة بطريقة مختلفة

**الإجابة الصحيحة: أ)**

**التعليل:**
- ✅ **الخيار أ):** `Semi-join` يُرجع صف T1 **إذا وجد** تطابق (للـ`IN/EXISTS`). `Anti-join` يُرجع صف T1 **إذا لم يجد** تطابق (للـ`NOT IN/NOT EXISTS`).
- ❌ **الخيار ب):** كلاهما يُرجع صفوف T1 (الجدول الأيسر) — ليس T2.
- ❌ **الخيار ج):** كلاهما يُرجع أعمدة T1 فقط.
- ❌ **الخيار د):** النتيجة مختلفة تماماً — `Semi-join` = الموجود في T2، `Anti-join` = الغائب عن T2.

---

### السؤال 9 (صعب)

مدرس يريد تنفيذ `MAX(Salary)` على جدول `EMPLOYEE` الذي عليه `B+ tree ascending index` على `Salary`. ما أفضل استراتيجية؟

أ) مسح كل الجدول وتتبع أعلى قيمة
ب) الذهاب لأقصى يسار الشجرة (leftmost leaf)
ج) الذهاب لأقصى يمين الشجرة (rightmost leaf)
د) البحث الثنائي في الـ`index`

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `B+ tree ascending` يُرتب القيم من الأصغر لليسار للأكبر لليمين. `MAX` = أكبر قيمة = أقصى يمين الشجرة. اتبع المؤشر الأيمن من الجذر لأول ورقة في أقصى اليمين.
- ❌ **الخيار أ):** يعمل لكن O(n) — الـ`index` يوفر O(log n) بكفاءة أعلى بكثير.
- ❌ **الخيار ب):** أقصى اليسار = `MIN` (أصغر قيمة) — عكس المطلوب.
- ❌ **الخيار د):** البحث الثنائي للـ`MAX` لا معنى له — لا ندري عن أي قيمة نبحث.

---

### السؤال 10 (متوسط)

في الـ`Pipelining`، ما دور دالة `Get_Next()` في الـ`Iterator`؟

أ) تُغلق العملية وتُحرر الموارد
ب) تُهيئ العملية وتفتح مصادر البيانات
ج) تُرجع الصف التالي من نتيجة العملية
د) تُرجع كل الصفوف دفعة واحدة

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `Get_Next()` تُرجع **صفاً واحداً** في كل استدعاء. هذا جوهر فكرة `pipelining` — كل `iterator` يُنتج صفاً واحداً عند الطلب.
- ❌ **الخيار أ):** هذا وصف `Close()`.
- ❌ **الخيار ب):** هذا وصف `Open()`.
- ❌ **الخيار د):** `Pipelining` يعمل بـ**صف في كل مرة** — لو أرجع كل الصفوف دفعة واحدة لأصبح `materialized evaluation`.

---

### السؤال 11 (صعب)

أي من التالي يُعتبر صحيحاً لاستخدام `J4: Partition-Hash Join`؟

أ) يعمل على `range join` مثل `R.A > S.B`
ب) يتطلب وجود `index` على أحد الحقلين
ج) يستخدم نفس دالة `hashing` على حقل الـ`join` في الجدولين
د) يمسح كل ملف عدة مرات للتأكد من كل التطابقات

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `Partition-Hash` يطبق **نفس** دالة `h()` على `R.A` وعلى `S.B`. هذا يضمن أن الصفوف المتطابقة (R.A = S.B) تقع في نفس الـ`bucket`.
- ❌ **الخيار أ):** `Partition-Hash` يعمل فقط مع `equijoin` (equality). لـ`range join` لا يعمل مباشرة.
- ❌ **الخيار ب):** `Partition-Hash` لا يحتاج `index` — هو بديل للـ`index`.
- ❌ **الخيار د):** كل ملف يُمسح **مرة واحدة فقط** — هذه ميزة J4.

---

### السؤال 12 (متوسط)

في خوارزمية `PROJECT` مع `SELECT DISTINCT`، متى يمكن تخطي مرحلة الفرز؟

أ) دائماً يجب الفرز لإزالة التكرارات
ب) إذا كانت قائمة الأعمدة تشمل مفتاح الجدول
ج) إذا كان الجدول مرتباً مسبقاً على أي عمود
د) إذا كان عدد الصفوف أقل من 1000

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** إذا كانت قائمة الأعمدة المسحوبة تشمل **مفتاح** الجدول، لا يمكن أن توجد تكرارات (المفتاح فريد بحكم تعريفه) → لا حاجة للفرز.
- ❌ **الخيار أ):** الفرز ليس إلزامياً دائماً — المفتاح يضمن عدم التكرار.
- ❌ **الخيار ج):** الترتيب المسبق على عمود لا علاقة له بالأعمدة المحددة في `SELECT`.
- ❌ **الخيار د):** حجم الجدول لا يُحدد ما إذا كان هناك تكرارات — المفتاح هو الضامن.

---

### السؤال 13 (صعب)

ما السبب الرئيسي لتجنب `CARTESIAN PRODUCT` في استعلامات قواعد البيانات؟

أ) ينتج أعمدة غير صحيحة
ب) لا يمكن تنفيذه إلا بـ`Sort-Merge`
ج) ينتج `n×m` صف — التكلفة تتضاعف أسياً مع حجم البيانات
د) لا يعمل مع أكثر من جدولين

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `CARTESIAN PRODUCT` ينتج `n×m` صف. جدولان كل منهما 10,000 صف → 100,000,000 صف في النتيجة. المعالجة والتخزين يصبحان مستحيلين عملياً.
- ❌ **الخيار أ):** الأعمدة صحيحة — تجمع كل أعمدة الجدولين.
- ❌ **الخيار ب):** يمكن تنفيذه بعدة طرق — المشكلة التكلفة وليس الخوارزمية.
- ❌ **الخيار د):** يعمل مع عدة جداول — المشكلة التكلفة المتصاعدة.

---

### السؤال 14 (صعب)

ما الـ`NDV(Salary, EMPLOYEE)` يخبر الـ`optimizer`؟

أ) أكبر قيمة راتب في الجدول
ب) متوسط الرواتب في الجدول
ج) عدد القيم المختلفة للراتب في الجدول — يُستخدم لتقدير `selectivity`
د) عدد الموظفين الذين رواتبهم أكبر من المتوسط

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `NDV(Salary, EMPLOYEE)` = عدد قيم الراتب المختلفة. إذا كان 8,000 ولدينا 10,000 موظف، معناه متوسط 1.25 موظف لكل قيمة راتب. الـ`optimizer` يستخدم هذا لتقدير `selectivity` الشرط `Salary = x` ≈ `1 / NDV`.
- ❌ **الخيار أ):** هذا `max(Salary, EMPLOYEE)` — قيمة محددة وليست عدد قيم.
- ❌ **الخيار ب):** المتوسط لا يُخزَّن في الـ`catalog` — يُحسب عند الطلب.
- ❌ **الخيار د):** هذا ليس ما يعنيه `NDV` — `NDV` يعد القيم المختلفة وليس المقارنات.

---

### السؤال 15 (متوسط)

متى يكون `LEFT OUTER JOIN` هو الخيار الصحيح دون `INNER JOIN`؟

أ) عندما نريد فقط الصفوف التي لها تطابق في الجدولين
ب) عندما نريد كل صفوف الجدول الأيسر حتى لو لا تطابق في الأيمن
ج) عندما يكون الجدول الأيمن أكبر من الأيسر
د) عندما نريد فقط الصفوف بدون تطابق

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** `LEFT OUTER JOIN` يُرجع كل صفوف الجدول الأيسر — حتى لو لم يجد تطابقاً في الأيمن (يضع `NULL` في أعمدة الأيمن). مفيد مثلاً لعرض كل الموظفين حتى من لا قسم معيّن لهم.
- ❌ **الخيار أ):** هذا وصف `INNER JOIN` — يُرجع فقط الصفوف ذات التطابق.
- ❌ **الخيار ج):** حجم الجداول لا يُحدد نوع الـ`JOIN`.
- ❌ **الخيار د):** هذا وصف `Anti-join` أو `WHERE NOT EXISTS`.

---

### السؤال 16 (صعب)

ما الفائدة الأساسية من استخدام `clustering index` في `GROUP BY` على حقل الـ`group`؟

أ) يُزيل الحاجة لتنفيذ `GROUP BY` أصلاً
ب) الصفوف المتشابهة متجاورة فيزيائياً → لا حاجة للفرز قبل التجميع
ج) يُسرّع قراءة الأعمدة المطلوبة فقط
د) يُحوّل `GROUP BY` لـ`DISTINCT` تلقائياً

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** `Clustering index` يضمن أن الصفوف ذات نفس قيمة حقل الـ`group` مخزونة في `blocks` متجاورة على القرص. لذا لا حاجة لفرز البيانات قبل التجميع — فقط امسح الجدول وابدأ تجميع كل مجموعة مباشرة لما تنتهي المجموعة السابقة.
- ❌ **الخيار أ):** `GROUP BY` ضروري — الـ`index` فقط يُسرّع التنفيذ.
- ❌ **الخيار ج):** `Clustering index` يتعلق بترتيب الصفوف لا الأعمدة.
- ❌ **الخيار د):** `GROUP BY` و`DISTINCT` مختلفان — لا تحويل تلقائي.

---

## الجزء الرابع: بطاقات السؤال والجواب (Q&A Cards)

---

### البطاقة 1
**Q1:** ما الفرق بين `Scanner` و`Parser` في معالجة الاستعلامات؟
**A:** `Scanner` يقسم النص لـ`tokens` (كلمات ورموز منفردة)؛ `Parser` يتحقق أن تسلسل هذه الـ`tokens` صحيح نحوياً.

---

### البطاقة 2
**Q2:** لماذا يُقسَّم SQL لـ`query blocks`؟
**A:** لأن كل `subquery` متداخلة تُعبّر عن عملية مستقلة يمكن تحسينها بشكل منفصل. الـ`optimizer` يتعامل مع كل `block` على حدة.

---

### البطاقة 3
**Q3:** ما الفرق بين `Semi-join` و`Anti-join`؟
**A:** `Semi-join` يُرجع صف T1 عند **وجود** تطابق (مناسب لـ`IN/EXISTS`)؛ `Anti-join` يُرجع صف T1 عند **غياب** التطابق (مناسب لـ`NOT IN/NOT EXISTS`).

---

### البطاقة 4
**Q4:** متى تستخدم `S2: Binary Search` في خوارزميات SELECT؟
**A:** فقط عندما: (1) الشرط equality، (2) الحقل مفتاح (`key`)، (3) الملف مرتب على هذا الحقل. كفاءتها O(log n).

---

### البطاقة 5
**Q5:** ما الفرق بين `S5: Clustering Index` و`S6: Secondary B+ Index`؟
**A:** `S5` على حقل غير مفتاح لكن الملف مرتب عليه فيزيائياً (clustering) → الصفوف المتطابقة متجاورة. `S6` على أي حقل لكن الصفوف ليست بالضرورة متجاورة → قد تستلزم قراءة `blocks` متفرقة.

---

### البطاقة 6
**Q6:** ما هو `Selectivity` ولماذا يهم الـ`optimizer`؟
**A:** `Selectivity = عدد الصفوف المُحققة للشرط / إجمالي الصفوف` (قيمة من 0 إلى 1). الـ`optimizer` يستخدمها لتقدير حجم النتائج واختيار الخوارزمية الأنسب.

---

### البطاقة 7
**Q7:** ما المعلومات التي يحتفظ بها الـ`Database Catalog` لكل جدول؟
**A:** عدد الصفوف (`r_R`)، طول الصف (`R`)، عدد الـ`blocks` (`b_R`)، الـ`blocking factor` (`bfr`). ولكل عمود: `NDV(A,R)`, `max(A,R)`, `min(A,R)`.

---

### البطاقة 8
**Q8:** ما الفرق بين `J1: Nested-Loop` و`J2: Index-Based Nested-Loop`؟
**A:** `J1` يمسح كل S لكل صف من R (O(n×m)). `J2` يستخدم `index` على S.B للوصول المباشر للصفوف المتطابقة فقط — أسرع بكثير.

---

### البطاقة 9
**Q9:** متى يكون `J3: Sort-Merge Join` هو الأمثل؟
**A:** عندما الملفان مرتبان مسبقاً على حقل الـ`join` — يتخطى الترتيب ويمسح كل ملف مرة واحدة.

---

### البطاقة 10
**Q10:** كيف يُنفّذ `J4: Partition-Hash Join`؟
**A:** يُطبق نفس دالة `hash` على حقل الـ`join` في كلا الجدولين → الصفوف المتطابقة تقع في نفس الـ`bucket` → يمسح R مرة ويضعه في `buckets`، ثم يمسح S مرة ويقارن في الـ`buckets`.

---

### البطاقة 11
**Q11:** لماذا SQL لا يُزيل التكرارات افتراضياً؟
**A:** إزالة التكرارات تتطلب فرزاً وتكلفة إضافية. SQL يُرجع `multiset` افتراضياً — تحتاج `DISTINCT` صراحةً لإزالتها. هذا تصميم متعمد لتجنب التكلفة غير الضرورية.

---

### البطاقة 12
**Q12:** ما مزايا `Pipelining` على `Materialized Evaluation`؟
**A:** يتجنب كتابة وقراءة ملفات مؤقتة (توفير I/O)، ويبدأ إرجاع النتائج فور معالجة أول صف (دون انتظار اكتمال كل العمليات).

---

### البطاقة 13
**Q13:** ما الثلاثة دوال في `Iterator interface`؟
**A:** `Open()` للتهيئة، `Get_Next()` لإرجاع صف واحد في كل استدعاء، `Close()` للإغلاق وتحرير الموارد.

---

### البطاقة 14
**Q14:** كيف يُحسب `MAX(Salary)` باستخدام `B+ tree ascending index`؟
**A:** اتبع المؤشر الأيمن من جذر الشجرة حتى أقصى يمين الأوراق (`rightmost leaf`) — القيمة الموجودة هناك هي `MAX`. كفاءة O(log n).

---

### البطاقة 15
**Q15:** ما فائدة الـ`NDV(A, R)` في الـ`catalog`؟
**A:** يُخبر الـ`optimizer` بعدد القيم المختلفة للعمود A في الجدول R. يُستخدم لتقدير `selectivity` شرط `equality`: كلما كان `NDV` أكبر، كلما كانت الانتقائية أعلى (تُرجع صفوف أقل).

---

### البطاقة 16
**Q16:** ما الفرق بين `Conjunctive Selection` و`Disjunctive Selection`؟
**A:** `Conjunctive` (AND): يمكن استخدام `index` واحد ثم فلترة الشروط الأخرى، أو `composite index`، أو تقاطع مؤشرات السجلات. `Disjunctive` (OR): أصعب — تحتاج اتحاد (`union`) جميع المؤشرات؛ إذا لم يتوفر `index` على أي شرط → `linear scan` إلزامي.

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

---

### 🔑 مراحل معالجة الاستعلام

| المرحلة | المدخل | الناتج | الوظيفة |
|---|---|---|---|
| Scanner | نص SQL | Tokens | تقسيم النص لوحدات |
| Parser | Tokens | Parse Tree | فحص التركيب النحوي |
| Validator | Parse Tree | Validated Tree | التحقق من وجود الجداول/الأعمدة |
| Query Tree Builder | Validated Tree | Query Tree | بناء التمثيل الداخلي |
| Query Optimizer | Query Tree | Execution Plan | اختيار أفضل خطة |
| Code Generator | Execution Plan | Executable Code | توليد كود التنفيذ |
| Runtime Processor | Code + Data | Result | التنفيذ الفعلي |

---

### 🔑 خوارزميات SELECT (S1-S6)

| # | الاسم | الشرط | الكفاءة |
|---|---|---|---|
| S1 | Linear Search | أي شرط | O(n) — أبطأ |
| S2 | Binary Search | equality على key في ملف مرتب | O(log n) |
| S3a | Primary Index | equality على key + primary index | O(k) حيث k = عمق الشجرة |
| S3b | Hash Key | equality على key + hash | O(1) |
| S4 | Primary Index Range | `>`, `≥`, `<`, `≤` + primary index | O(k + m) |
| S5 | Clustering Index | equality على non-key + clustering | O(k + blocks) |
| S6 | Secondary B+ Index | equality أو range على أي حقل | O(k + r) — قد تكون بطيئة |

---

### 🔑 خوارزميات JOIN مقارنة

| | J1 Nested-Loop | J2 Index-Based | J3 Sort-Merge | J4 Partition-Hash |
|---|---|---|---|---|
| **المتطلبات** | لا شيء | index على S.B | ملفان مرتبان | buffer لـbuckets |
| **التكلفة** | O(n×m) | O(n × log m) | O(n+m) بعد فرز | O(n+m) |
| **نوع JOIN** | أي | equality/range | equality | equality فقط |
| **الأفضل متى** | ملفات صغيرة | index موجود | ملفات مرتبة مسبقاً | لا index، ملفات كبيرة |

---

### 🔑 العمليات المجموعية

| العملية | الرمز | الوصف | التكلفة |
|---|---|---|---|
| UNION | ∪ | صفوف R أو S (بدون تكرار) | O(n log n + m log m) |
| INTERSECTION | ∩ | صفوف مشتركة في R وS | O(n log n + m log m) |
| SET DIFFERENCE | − | في R ولا في S | O(n log n + m log m) |
| CARTESIAN PRODUCT | × | كل التركيبات الممكنة | O(n×m) — **تجنب!** |

---

### 🔑 Semi-Join vs Anti-Join vs INNER JOIN

| | INNER JOIN | Semi-Join (⋉) | Anti-Join |
|---|---|---|---|
| **يُرجع** | صفوف من الجدولين | صفوف T1 فقط (عند تطابق) | صفوف T1 فقط (بلا تطابق) |
| **يُستخدم مع** | JOIN عادي | IN, EXISTS, ANY | NOT IN, NOT EXISTS, ALL |
| **عند التطابق** | يضم ويُرجع | يُرجع T1 فوراً ويتوقف | يرفض T1 فوراً ويتوقف |
| **تكرار الصفوف** | ممكن | لا | لا |

---

### 🔑 Aggregate Functions مع Indexes

| الدالة | مع B+ tree ascending | ملاحظات |
|---|---|---|
| MAX | أقصى يمين (rightmost leaf) | O(log n) |
| MIN | أقصى يسار (leftmost leaf) | O(log n) |
| COUNT | عدد مدخلات الـindex | O(log n) |
| SUM/AVG | من قيم الـdense index | بدون فتح السجلات |

---

### 🔑 القواعس الذهبية لا تُنسى

| # | القاعدة |
|---|---|
| 1 | `CARTESIAN PRODUCT` = خطر — تجنبه دائماً في الاستعلامات |
| 2 | لا تكرارات مع `PROJECT` إذا كانت قائمة الأعمدة تشمل مفتاحاً |
| 3 | `Selectivity` قريبة من 0 = يستحق الـ`index`؛ قريبة من 1 = `linear scan` أفضل |
| 4 | `Pipelining` لا يعمل مع عمليات تحتاج كل البيانات أولاً (Sort, full Group By) |
| 5 | `Semi-join` = للـ`positive` subqueries (IN, EXISTS) ← يتوقف عند أول تطابق |
| 6 | `Anti-join` = للـ`negative` subqueries (NOT IN, NOT EXISTS) ← يتوقف عند أول تطابق أيضاً |
| 7 | `clustering index` على حقل `GROUP BY` = لا حاجة للفرز |
| 8 | `B+ tree ascending` → `MAX` في أقصى اليمين، `MIN` في أقصى اليسار |

---

### 🔑 قاموس المصطلحات

| المصطلح | المعنى |
|---|---|
| `Selectivity` | نسبة الصفوف التي تُحقق شرطاً (0 إلى 1) |
| `Query Block` | وحدة SQL قابلة للترجمة = `SELECT-FROM-WHERE` واحد |
| `Pipelining` | تمرير نتائج العمليات مباشرة بدون ملفات مؤقتة |
| `Materialized Evaluation` | تنفيذ وتخزين نتيجة كل عملية قبل التالية |
| `Iterator` | آلية `Get_Next()` التي تُرجع صفاً واحداً في كل مرة |
| `Blocking Factor (bfr)` | عدد الصفوف في الـ`block` الواحد |
| `NDV(A,R)` | عدد القيم المختلفة للعمود A في الجدول R |
| `Join Selection Factor` | نسبة الصفوف في أحد الجدولين التي ستُضم مع الآخر |
| `Clustering Index` | index يُرتّب الصفوف فيزيائياً على القرص |
| `Dense Index` | مدخل في الـindex لكل صف في الملف |
| `Non-dense Index` | مدخل في الـindex لكل block فقط |

---

### 🔑 الخطوات السريعة: تحويل SQL لـRelational Algebra

```algorithm
1 | حدد الـquery blocks | كل SELECT-FROM-WHERE = block
2 | ابدأ بالـinner block | ترجم أعمق subquery أولاً
3 | SELECT clause → π (projection) | على الأعمدة المطلوبة
4 | WHERE clause → σ (selection)   | على الشروط
5 | JOIN → ⨝ (join)               | على شرط الضم
6 | اجمع العمليات: π(σ(⨝(...)))  | الترتيب: σ أولاً ثم ⨝ ثم π
7 | Optimizer يُعيد الترتيب       | لتقليل التكلفة
```

---

### 🔑 الخطوات السريعة: اختيار خوارزمية SELECT

```algorithm
1 | هل الشرط equality على key + ملف مرتب؟  | → S2 Binary Search
2 | هل على key + primary index؟             | → S3a Primary Index
3 | هل على key + hash index؟                | → S3b Hash Key
4 | هل range (>, <) + primary index؟        | → S4 Primary Index Range
5 | هل equality على non-key + clustering?   | → S5 Clustering Index
6 | هل على أي حقل + secondary B+ index?    | → S6 Secondary Index
7 | لا index ولا شيء؟                       | → S1 Linear Search (fallback)
```

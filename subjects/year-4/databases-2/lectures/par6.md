# المحاضرة 6 — تحسين الاستعلامات: المدخل القائم على التكلفة (Cost-Based Approach)
> **المادة:** تحسين الاستعلامات (DBMS — Query Processing & Optimization) | **الموضوع:** Cost-Based Query Optimization

---

## ملخص شامل (لكل من تعب أو ما يركز)

> **هذا الملخص الشامل كامل كافي — لو قرأت هذا بس، انت خلصت. ما تحتاج المحاضرة أو التفاصيل.**

### The Big Idea

الفكرة كلها إن الـ optimizer ما بيسوي queries "بالحدس" (زي `heuristics`)، هو فعلياً بيحسب **رقم** لكل طريقة تنفيذ ممكنة (اسمه `cost`)، وبعدين يختار الطريقة اللي رقمها أقل.

### ليش يهمك؟

عشان أي `SELECT` أو `JOIN` ممكن يتنفذ بأكتر من طريقة (مسح كامل، فهرس، sort-merge...)، والفرق بين طريقة وطريقة ممكن يكون آلاف الأضعاف بالسرعة. هذا الموضوع أساسي في أي مقابلة أو امتحان يسألك "احسب تكلفة هالخطة" أو "قارن بين خطتين".

### المتطلبات السابقة

لازم تكون فاهم:
- `query tree` و `query graph` وكيف تتكون من عمليات relational algebra
- الفرق بين `heuristics-based optimization` (المحاضرة اللي قبل هذي) و `cost-based optimization` (هذي المحاضرة)
- مفاهيم أساسية عن التخزين: `blocks`, `blocking factor`, `primary/secondary/clustering index`

### الآن: اشرح الموضوع بالكامل

خلّك تتخيل إنك بتطلب من مطعم توصيل. عندك أكتر من طريقة توصل الطلب: تاكسي مباشر، أو دراجة، أو مشي. كل طريقة عندها "تكلفة" (وقت + فلوس). أنت ما بتختار عشوائي — بتحسب التكلفة التقريبية لكل طريقة وتختار الأرخص. هذا بالضبط اللي يسويه الـ **cost-based optimizer**.

**الفكرة الأساسية: القرار مبني على أرقام حقيقية، مو على قواعد ثابتة**

في `heuristics-based optimization` كنا نقول "دايماً ادفع الـ selection قبل الـ join" كقاعدة عامة. لكن بالـ `cost-based optimization`، الـ optimizer يحسب فعلياً: كم `block access` بده يسوي؟ كم عملية حسابية؟ وبعدين يقارن الأرقام. أحياناً القاعدة العامة تكون غلط في حالة معينة (مثلاً لو الجدول صغير جداً)، فالـ cost-based بيكتشف هذا لأنه يحسب مو يخمن.

**مكونات التكلفة (Cost Components)**

كل عملية تنفيذ لها 5 أنواع تكلفة:
- **access cost**: كم قراءة/كتابة عن القرص (الأهم عادة، لأن القرص أبطأ آلاف المرات من الذاكرة)
- **disk storage cost**: تخزين النتائج المؤقتة
- **computation cost**: وقت المعالج (CPU) للمقارنة والفرز
- **memory usage cost**: كم buffer محتاج بالذاكرة
- **communication cost**: نقل البيانات (مهم جداً بالـ distributed databases)

عادة الـ optimizer يركّز على **access cost** لأنه الأكبر بكثير من الباقي.

**من وين الـ optimizer يجيب الأرقام؟ الـ Catalog**

الـ `DBMS catalog` (نوع من metadata مخزنة) فيه معلومات زي:
- حجم الجدول (`file size`, عدد `blocks`)
- تنظيم الملف (`organization`)
- عدد مستويات أي `multilevel index`
- عدد القيم المميزة لأي عمود (`number of distinct values` أو `NDV`)
- `attribute selectivity`: نسبة من الجدول بتحقق شرط معين على هذا العمود

من هذي المعلومات نحسب أهم رقمين:
- **`selectivity` (sl)**: نسبة (بين 0 و1) — كم من صفوف الجدول بتحقق الشرط
- **`selection cardinality` (s)**: العدد الفعلي = `sl × r` (حيث r = عدد الصفوف بالجدول)

مثال بسيط: لو عندك 10000 موظف، وعمود "الراتب" عنده 500 قيمة مميزة، فـ `sl = 1/500`، وإذا سألت "الموظفين براتب = X" فـ `selection cardinality = 10000/500 = 20` موظف تقريباً.

**`Histograms` — طريقة أدق للتقدير**

بدل ما نفترض إن كل القيم موزعة بالتساوي (وهذا خطأ بمعظم الحالات الحقيقية — مثلاً الرواتب متجمعة حوالين قيمة معينة مو موزعة بالتساوي)، الـ `RDBMS` يخزن **جدول** يوضح كم صف يقع بكل مجال من القيم (مثلاً: كم موظف راتبه بين 30k-40k، وكم بين 40k-70k...). هذا يخلي التقدير أدق بكثير من مجرد قسمة بسيطة.

**دوال التكلفة لعملية SELECT**

هذي أهم جزء عملي بالمحاضرة. لكل طريقة ممكن تجيب فيها الـ optimizer الصفوف المطلوبة، فيه صيغة تحسب عدد الـ `block accesses`:

| الطريقة | الوصف | الصيغة |
| --- | --- | --- |
| S1a | مسح كامل (`linear search`) لكل الصفوف | `C = b` |
| S1b | مسح كامل، شرط مساواة على `key` | `C = b/2` |
| S2 | بحث ثنائي (`binary search`)، الملف مرتب | `C = log₂b + ⌈s/bfr⌉ - 1` |
| S3a | `primary index`، صف واحد | `C = x + 1` |
| S3b | `hash key`، صف واحد | `C = 1` |
| S4 | `ordering index`، صفوف متعددة (range) | `C = x + b/2` |
| S5 | `clustering index`، صفوف متعددة | `C = x + ⌈s/bfr⌉` |
| S6a | `secondary index` (B+ tree)، أسوأ حالة | `C = x + 1 + s` |
| S6b | `secondary index`، range query | `C = x + b_I1/2 + r/2` |

**ليش هذا الترتيب منطقي؟** كل ما اقتربت من "أعرف بالضبط وين البيانات" (زي `hash` أو `primary index`) كل ما التكلفة أقل. وكل ما احتجت "تفتش" أكتر (زي `linear search`) كل ما التكلفة أعلى. الـ index يعطيك اختصار — بدل ما تفتش كل الملف، تروح مباشرة للمكان الصح.

**دوال التكلفة لعملية JOIN**

الـ `JOIN` أغلى عملية بالاستعلام عادة، لأنه يقارن جدولين ببعض. أول شي لازم نعرف **حجم النتيجة** المتوقع:

- **`join selectivity` (js)**: نسبة صغيرة (بين 0 و1) — `js = 1/max(NDV(A,R), NDV(B,S))`
- **`join cardinality` (jc)**: عدد صفوف النتيجة المتوقع — `jc = js × |R| × |S|`

بعدين عندنا 4 خوارزميات أساسية للتنفيذ:

| الخوارزمية | الفكرة | الصيغة (تقريبية) |
| --- | --- | --- |
| J1 `nested-loop join` | لكل صف بـ R، فتش كل S | `C = b_R + (b_R × b_S) + (jc/bfr_RS)` |
| J2 `index-based nested-loop` | لكل صف بـ R، استخدم index على S | `C = b_R + (|R| × (x_B+1+s_B)) + (jc/bfr_RS)` |
| J3 `sort-merge join` | الجدولين مرتبين، امشِ عليهم مرة وحدة | `C = b_R + b_S + (jc/bfr_RS)` (+ تكلفة الفرز لو مو مرتبين) |
| J4 `partition-hash join` | قسّم الجدولين بنفس دالة الـ hash وطابق الأقسام | `C = 3×(b_R + b_S) + (jc/bfr_RS)` |

**التشبيه اليومي:** تخيل عندك دفترين تلفونات وبدك تلاقي الأسماء المشتركة. `nested-loop` يعني لكل اسم بالدفتر الأول، تقلّب كل صفحات الدفتر الثاني (بطيء جداً). `sort-merge` يعني الدفترين مرتبين أبجدياً، فتمشي عليهم مع بعض بإصبعين بمرة وحدة (أسرع بكثير). هذا بالضبط ليش `sort-merge` و `partition-hash` أرخص من `nested-loop` العادي بمعظم الحالات.

**حالات خاصة: Semi-join و Anti-join**

هذي تطلع لما نفس Subquery فيها `IN` أو `NOT IN`:
- `semi-join`: `SELECT COUNT(*) FROM T1 WHERE T1.X IN (SELECT T2.Y FROM T2)` → `js = MIN(1, NDV(Y,T2)/NDV(X,T1))`
- `anti-join`: نفس الشي بس `NOT IN` → `js = 1 - MIN(1, NDV(T2.y)/NDV(T1.x))`

**ترتيب الـ JOIN وأشجار التنفيذ**

لو عندك أكتر من جدولين بالاستعلام (مثلاً 4 جداول)، فيه أكتر من طريقة ترتّب فيها الـ joins. هذا يتمثل بشكل شجرة:
- **`left-deep tree`**: كل join جديد يضيف جدول واحد على اليسار — **هذا النوع المفضّل عملياً**
- **`right-deep tree`**: نفس الفكرة بس على اليمين
- **`bushy tree`**: joins متوازية، مو بس سلسلة واحدة

**ليش `left-deep` هو المفضّل؟** لأنه يتوافق مع خوارزميات الـ join العملية (زي nested-loop) ويسمح بعمل `fully pipelined plans` — يعني تقدر تبدأ تعالج النتائج أول بأول بدون ما تنتظر كل شي يخلص.

عدد الأشجار الممكنة يكبر بسرعة رهيبة مع عدد الجداول (factorial!). لأربع جداول عندك 24 `left-deep tree` ممكنة، ولسبع جداول عندك 5,040! لهيك، الـ optimizer يستخدم **`dynamic programming`**: يحل المسائل الصغيرة أول (join بين جدولين)، ويبني عليها الحلول الأكبر تدريجياً من الأسفل للأعلى (`bottom-up`)، بدل ما يجرب كل الاحتمالات وحدة وحدة.

**التحسين الفيزيائي (Physical Optimization)**

بعد ما يتحدد شكل الشجرة، الـ optimizer لازم يقرر كمان: أي خوارزمية تحديداً تستخدم لكل join؟ (nested-loop؟ sort-merge؟) وهل تستخدم index scan للـ selection؟ هذا اسمه `physical optimization`، وأحياناً فيه heuristics بسيطة تغني عن الحساب الكامل (زي: "استخدم index scan كل ما أمكن").

**مثال شامل: الاستعلام Q2**

المحاضرة تستخدم استعلام واحد كمثال طول الطريق:
```sql
SELECT Pnumber, Dnum, Lname, Address, Bdate
FROM PROJECT, DEPARTMENT, EMPLOYEE
WHERE Dnum=Dnumber AND Mgr_ssn=Ssn AND Plocation='Stafford';
```
عندنا 3 جداول، فمعناها فيه احتمالات ترتيب مختلفة لو افترضنا إن الـ optimizer يفكر بس بـ `left-deep trees`:
- PROJECT ⨝ DEPARTMENT ⨝ EMPLOYEE
- DEPARTMENT ⨝ PROJECT ⨝ EMPLOYEE
- DEPARTMENT ⨝ EMPLOYEE ⨝ PROJECT
- EMPLOYEE ⨝ DEPARTMENT ⨝ PROJECT

الـ optimizer يحسب تكلفة كل ترتيب (باستخدام الأرقام من الـ catalog: PROJECT فيه 2000 صف/100 block، DEPARTMENT فيه 50 صف/5 blocks، EMPLOYEE فيه 10000 صف/2000 block) ويختار الأرخص.

---

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
كتير طلاب يفتكرون إن `cost-based optimization` معناه إنه "أفضل من الـ heuristics دايماً" أو إنه يلغي الحاجة للـ heuristics تماماً.

#### الفهم الصحيح ✅:
الاثنين يشتغلون مع بعض. الـ `heuristics` (زي دفع الـ selection قبل الـ join) تستخدم أول عشان **تقلل عدد الخيارات** اللي لازم الـ cost-based يحسب تكلفتها. لو ما فيه heuristics، عدد الاحتمالات يصير كبير جداً (تذكر جدول factorial!) والحساب يصير بطيء جداً بنفسه.

---

#### الفهم الخاطئ ❌:
كتير طلاب يفتكرون إن `selectivity` هي نفسها `selection cardinality`.

#### الفهم الصحيح ✅:
`selectivity (sl)` هي **نسبة** (رقم بين 0 و1، زي 0.002). `selection cardinality (s)` هي **عدد فعلي من الصفوف** = `sl × r`. يعني sl تجاوبك "أي نسبة من الجدول"، وs تجاوبك "كم صف بالضبط".

---

#### الفهم الخاطئ ❌:
البعض يفتكر إن `sort-merge join` دايماً أرخص من `nested-loop join`.

#### الفهم الصحيح ✅:
`sort-merge` أرخص **إذا** الجدولين مرتبين أصلاً على عمود الـ join. لو مو مرتبين، لازم تضيف تكلفة الفرز نفسه (اللي ممكن يكون غالي)، وأحياناً بهذي الحالة `nested-loop` (خصوصاً `index-based nested-loop`) يطلع أرخص.

---

### إيش اللي بيطلع في الامتحان

- حساب `selectivity` و `selection cardinality` من أرقام catalog معطاة
- حساب تكلفة `SELECT` بطريقة معينة (S1 لـ S6) بمعطيات رقمية
- حساب `join selectivity` و `join cardinality` وتطبيقها بصيغة J1-J4
- التمييز بين `semi-join` و `anti-join` وصيغهم
- عدد الـ `left-deep trees` أو `bushy trees` الممكنة لعدد معين من الجداول
- تحليل مثال زي Q2: احسب تكلفة أكتر من ترتيب join واختر الأرخص

### الربط مع الموضوع اللي جاي بعده

بعد ما تعرف تحسب تكلفة كل خطة تنفيذ، الموضوع اللي جاي غالباً يشرح **كيف الـ optimizer فعلياً يبني ويقارن** كل الخطط دي بكفاءة (باستخدام `dynamic programming` بالتفصيل)، أو ينتقل لموضوع `transaction processing` و `concurrency control`.

---

## الشرح التفصيلي

### 1. المقدمة والفكرة العامة

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "heuristics-based optimization lecture"} -->

#### 📍 أين نحن الآن؟
هذا أول قسم من محاضرة `Cost-Based Query Optimization`، ويأتي بعد محاضرة `Heuristics-Based Optimization`.

#### ⬅️ الربط مع السابق
بالمحاضرة السابقة تعلمنا قواعد استكشافية (`heuristics`) عامة لإعادة ترتيب الاستعلام (زي دفع الـ selection للأسفل). هذي المحاضرة تاخذنا خطوة أعمق: بدل قواعد عامة، نحسب أرقام فعلية.

#### 💡 الفكرة الأساسية
**الـ `cost-based query optimizer` يقدّر ويقارن تكلفة تنفيذ الاستعلام بأكتر من استراتيجية، ويختار الاستراتيجية الأقل تكلفة.**

---

#### 📖 الشرح
موضوعات المادة (Course Topics) المذكورة بالمحاضرة تغطي: `DBMS Overview`، `Database Normalization`، `Disk Storage and Indexing Structures`، `Query Processing and Optimization` (وهذا موضوعنا)، `Transaction Processing and Concurrency Control`، `Recovery Techniques`، و`Distributed Databases`.

موضوعات اليوم بالتحديد: مقدمة، استخدام الـ `selectivities` في التحسين القائم على التكلفة، معلومات الـ `catalog` المستخدمة بدوال التكلفة، دوال التكلفة لعملية `SELECT`، ودوال التكلفة لعملية `JOIN`.

#### 🎯 الملخص السريع
- الموضوع الرئيسي: `cost-based query optimization`
- يبني على معرفة سابقة بـ `heuristics-based optimization`
- المصادر: Elmasri & Navathe، Ramakrishnan & Gehrke، Silberschatz et al.

#### 📚 التطبيق
هذي المقدمة تؤسس للأقسام الجاية اللي فيها الصيغ الفعلية للحساب.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن هذا الموضوع نظري بحت وما له علاقة بالأداء الحقيقي.

#### الفهم الصحيح ✅:
هذي بالضبط الآلية اللي تحدد ليش استعلام SQL معين يرجع بثانية وحدة أو بدقيقة — فرق التكلفة بين خطتين تنفيذ ممكن يكون هائل.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Today's Topics: Introduction, Use of Selectivities in Cost-Based Optimization, Catalog Information Used in Cost Functions, Cost Functions for SELECT Operation, Cost Functions for the JOIN Operation.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل النقاط الخمس مذكورة وسيتم تفصيلها بالأقسام الجاية

</details>

---

### 2. استخدام الـ Selectivities في التحسين القائم على التكلفة

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
هذا القسم يشرح آلية عمل الـ `cost-based optimizer` بشكل عام قبل ما ندخل بالصيغ التفصيلية.

#### ⬅️ الربط مع السابق
بعد ما عرفنا إن الهدف هو "اختيار الأرخص"، هنا نفهم **كيف** يتم هذا الاختيار عملياً.

#### 💡 الفكرة الأساسية
**الـ optimizer يقدّر ويقارن تكلفة استراتيجيات مختلفة، يختار الأقل تكلفة، ويكرر هذا العمل على مستوى `query block` واحد بكل مرة.**

---

#### 📖 الشرح

للاستعلامات المُصرّفة مسبقاً (`compiled queries`)، الحساب يتم مرة وحدة وقت الترجمة، وهذا مناسب جداً — التكلفة الإضافية للحساب تُدفع مرة وحدة بس، وبعدها الاستعلام يتنفذ آلاف المرات بالخطة المُحسّنة. أما بالاستعلامات المُفسَّرة (`interpreted queries`)، العملية كاملة تصير وقت التشغيل (`runtime`)، وهذا معناه إن حساب التكلفة نفسه ممكن يبطّئ زمن الاستجابة — لازم توازن بين دقة التقدير وسرعة الحساب.

بالنسبة لآلية العمل: لأي جزء جزئي من الاستعلام (`subexpression`)، ممكن يكون فيه أكتر من `equivalence rule` تنطبق عليه (يعني أكتر من طريقة تحويل متكافئة). فالـ optimizer يحتاج **مقياس كمي** (quantitative measure) يقارن فيه هذي البدائل، وهذا المقياس هو **الـ cost metric**، واللي يشمل متطلبات المساحة (space) والوقت (time).

عشان ما يجرب كل الاحتمالات (وهذا مكلف جداً حسابياً)، الـ optimizer يصمم استراتيجيات بحث مناسبة (`search strategies`) تحتفظ بالبدائل الأرخص وتشذّب (`prune`) البدائل الأغلى بدري.

نقطة أخيرة مهمة: **نطاق** التحسين هذا هو `query block` واحد. لو الاستعلام فيه أكتر من query block (مثلاً subqueries متداخلة)، هذا يحتاج `global query optimization` يشمل كل الـ blocks مع بعض.

كل عملية تنفيذ لها 5 مكونات تكلفة: **access cost** للتخزين الثانوي (الأهم عادة)، **disk storage cost**، **computation cost**، **memory usage cost**، و**communication cost** (مهم بالأنظمة الموزعة).

#### 🎯 الملخص السريع
- الهدف: أرخص استراتيجية تنفيذ لكل `query block`
- التحسين للـ compiled queries أفضل من interpreted queries من ناحية الأداء
- الـ cost metric يشمل الزمن والمساحة معاً
- 5 مكونات تكلفة: access, storage, computation, memory, communication

#### 📚 التطبيق
هذي المكونات الخمسة هي الأساس اللي عليه بتُبنى الصيغ الرياضية بالأقسام الجاية (خصوصاً access cost).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن كل مكونات التكلفة الخمسة لها نفس الوزن بحساب الـ optimizer.

#### الفهم الصحيح ✅:
عملياً، `access cost` (عدد قراءات القرص) هو المكوّن المهيمن بمعظم الحالات، لأن الوصول للقرص أبطأ بآلاف المرات من عمليات الذاكرة والمعالج. لهيك أغلب الصيغ اللي رح نشوفها تحسب بالضبط عدد الـ `block accesses`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Query optimizer estimates and compares costs of query execution using different strategies. Chooses lowest cost estimate strategy. Process suited to compiled queries. Interpreted queries: entire process occurs at runtime; cost estimate may slow down response time.
> Cost-based query optimization approach: for a given query subexpression, multiple equivalence rules may apply. Quantitative measure for evaluating alternatives; cost metric includes space and time requirements. Design appropriate search strategies by keeping cheapest alternatives and pruning costlier alternatives. Scope of query optimization is a query block; global query optimization involves multiple query blocks.
> Cost components for query execution: Access cost to secondary storage, Disk storage cost, Computation cost, Memory usage cost, Communication cost.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل النقاط المذكورة أعلاه

</details>

---

### 3. معلومات الـ Catalog المستخدمة في دوال التكلفة

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### 📍 أين نحن الآن؟
هنا نتعرف على **مصدر الأرقام** اللي الـ optimizer يستخدمها بحساباته.

#### ⬅️ الربط مع السابق
عرفنا إن الـ optimizer يحتاج "مقياس كمي" — بس من وين يجيب الأرقام الخام أصلاً؟ الجواب: من الـ `DBMS catalog`.

#### 💡 الفكرة الأساسية
**الـ catalog يخزّن إحصائيات عن كل جدول وعمود، وهذي الإحصائيات هي المدخلات الأساسية لكل صيغة تكلفة جاية.**

---

#### 💡 التشبيه:
> فكّر بالـ catalog زي ملف "بيانات المريض" بالمستشفى — قبل ما الدكتور يقرر العلاج (استراتيجية التنفيذ)، لازم يشوف الملف (وزن، عمر، تاريخ...) عشان يقرر صح.
> **وجه الشبه:** ملف المريض = catalog؛ قرار العلاج = اختيار استراتيجية التنفيذ

#### 📖 الشرح

المعلومات المخزنة بالـ catalog وتُستخدم من الـ optimizer تشمل:
- **File size**: حجم الملف (عدد الصفوف والـ blocks)
- **Organization**: طريقة تنظيم الملف (مرتب؟ hash؟ عشوائي؟)
- **Number of levels of each multilevel index**: عدد مستويات أي index متعدد المستويات على الجدول
- **Number of distinct values of an attribute**: عدد القيم المختلفة لعمود معين (اختصاره `NDV`)
- **Attribute selectivity**: وهذا يسمح بحساب **selection cardinality** — يعني متوسط عدد الصفوف اللي تحقق شرط مساواة (equality condition) على هذا العمود

هذي الأرقام كلها **جاهزة ومحسوبة مسبقاً** بالـ catalog (يعني الـ optimizer ما يحسبها من الصفر كل مرة، هو يقرأها فقط)، وهذا يخلي عملية اتخاذ القرار سريعة.

#### 🎯 الملخص السريع
- الـ catalog = مصدر كل الإحصائيات الخام
- أهم رقمين: `NDV` (عدد القيم المميزة) و`selectivity`
- من `selectivity` نحسب `selection cardinality`

#### 📚 التطبيق
الأرقام دي (خصوصاً NDV وselectivity) هي المدخل المباشر لكل صيغ SELECT وJOIN بالأقسام الجاية.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن الـ optimizer "يخمّن" الأرقام أو يحسبها بالـ runtime من الصفر كل استعلام.

#### الفهم الصحيح ✅:
الأرقام محفوظة مسبقاً بالـ catalog (metadata) ويتم تحديثها بشكل دوري (عادة بأمر زي `ANALYZE` أو `UPDATE STATISTICS`)، والـ optimizer يقرأها مباشرة وقت التخطيط.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Information stored in DBMS catalog and used by optimizer: File size, Organization, Number of levels of each multilevel index, Number of distinct values of an attribute, Attribute selectivity — allows calculation of selection cardinality (average number of records that satisfy equality selection condition on that attribute).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 3.1 Histograms

<!-- @render: {type: "diagram-first", visualization: "chart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
جزء فرعي من معلومات الـ catalog، بس مهم كفاية إنه ياخذ قسم مستقل.

#### ⬅️ الربط مع السابق
عرفنا إن الـ catalog يخزن `NDV` و`selectivity`. لكن أبسط طريقة لحساب selectivity (قسمة بسيطة) تفترض توزيع متساوي للقيم — والـ `histogram` يحل هذي المشكلة بالتحديد.

#### 💡 الفكرة الأساسية
**الـ `histogram` هو جدول أو بنية بيانات تسجل توزيع البيانات الفعلي، مو بس عددها، لتقدير أدق للـ selectivity.**

---

#### 📊 المخطط: Histogram على عمود الراتب (Salary) بجدول EMPLOYEE

#### ما هذا المخطط؟
> يوضّح كم موظف يقع براتب داخل كل مجال (bucket)، بدل افتراض إن كل القيم موزعة بالتساوي.

#### وصف العُقد (الأعمدة/Buckets):
| # | المجال (Bucket) | عدد الموظفين تقريباً |
| --- | --- | --- |
| 1 | 30k–40k | ~300 |
| 2 | 40k–70k | ~510 |
| 3 | 70k–120k | ~280 |
| 4 | 120k–200k | ~160 |
| 5 | 200k–500k | ~100 |

#### 📖 الشرح

بدل ما نفترض إن كل الرواتب موزعة بالتساوي بين أقل قيمة وأعلى قيمة (وهذا نادراً ما يكون صحيح بالواقع — أغلب الموظفين براتب متوسط، وقلة براتب عالي جداً)، الـ `RDBMS` يخزّن **histogram** لأهم الأعمدة (زي الراتب، السعر، إلخ). هذا الـ histogram يقسّم مجال القيم لمجموعات (`buckets`) ويسجل عدد الصفوف بكل مجموعة.

لما الـ optimizer يحتاج يقدّر `selectivity` لشرط زي `Salary > 150000`، بدل قسمة بسيطة (range/total)، يشوف بالضبط أي buckets تقع بهذا المجال ويجمع أعدادها — تقدير أدق بكثير.

#### 🎯 الملخص السريع
- الـ histogram = جدول توزيع بيانات فعلي
- يُستخدم لأهم الأعمدة فقط (مو كل الأعمدة)
- يحسّن دقة تقدير الـ selectivity خصوصاً للبيانات غير المتساوية التوزيع

#### 📚 التطبيق
تقدير الـ selectivity الأدق يؤدي لحساب `selection cardinality` أدق، وبالتالي قرار أفضل بأي طريقة SELECT (S1-S6) نستخدم.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن الـ histogram يُبنى لكل عمود بكل جدول.

#### الفهم الصحيح ✅:
الـ RDBMS عادة يبني histograms بس للأعمدة "المهمة" (اللي تُستخدم كتير بشروط WHERE أو JOIN)، لأن بناء وصيانة histogram له تكلفة أيضاً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Tables or data structures that record information about the distribution of data. RDBMS stores histograms for most important attributes. [مع رسم بياني: Histogram of salary in the relation EMPLOYEE، بمجالات 30k-40k حتى 200k-500k]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 4. دوال التكلفة لعملية SELECT

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
هذا القسم الأساسي الأول اللي فيه صيغ رياضية فعلية نطبقها.

#### ⬅️ الربط مع السابق
بعد ما عرفنا مصدر الأرقام (catalog)، هلأ نشوف كيف نستخدمها بالضبط بصيغة رياضية لكل طريقة SELECT ممكنة.

#### 💡 الفكرة الأساسية
**لكل طريقة تنفيذ ممكنة لعملية SELECT (S1 إلى S6)، فيه صيغة تحسب عدد الـ `block accesses` المطلوبة.**

---

#### 📐 المعادلة: الرموز المستخدمة (Notation)

| الرمز | المعنى |
| --- | --- |
| `C_Si` | التكلفة لطريقة Si بعدد الـ block accesses |
| `r_X` | عدد الصفوف (tuples) بالعلاقة X |
| `b_X` (أو b) | عدد الـ blocks اللي تشغلها العلاقة X |
| `bfr_X` | الـ `blocking factor` — عدد الصفوف بكل block |
| `sl_A` | الـ `selectivity` لعمود A تحت شرط معين |
| `s_A` (أو s) | الـ `selection cardinality` = `sl_A × r` |
| `x_A` | عدد مستويات الـ index على العمود A |
| `b_I1,A` | عدد blocks المستوى الأول (first-level) للـ index على A |
| `NDV(A, X)` | عدد القيم المميزة للعمود A بالعلاقة X |

#### 📖 الشرح

هذي الرموز هي "اللغة المشتركة" لكل الصيغ الجاية. أهم تمييز لازم تنتبه له: **s** (selection cardinality) هي **عدد فعلي من الصفوف**، بينما **b** (blocks) هو **عدد وحدات القرص** اللي فيها هالصفوف — والفرق بينهم هو الـ `bfr` (كم صف بكل block).

#### 🎯 الملخص السريع
- كل صيغة جاية تعتمد على هالرموز
- s = sl × r (احفظها، رح تحتاجها كتير)
- b عادة يمثل "عدد قراءات القرص" وهو أهم شي نحسبه

#### 📚 التطبيق
الأقسام الفرعية الجاية (4.1 - 4.6) تطبق هالرموز على 6 طرق تنفيذ مختلفة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الخلط بين `r` (عدد الصفوف) و`b` (عدد الـ blocks) — كتير طلاب يستخدمونهم بالتبادل.

#### الفهم الصحيح ✅:
`r` هو عدد الصفوف الكلي، بينما `b = r/bfr` تقريباً (عدد الـ blocks). التكلفة دايماً تُقاس بعدد الـ block accesses (يعني بـ b) مو بعدد الصفوف (r)، لأن القراءة من القرص تتم على مستوى الـ block كامل.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> C_Si: Cost for method Si in block accesses. r_X: Number of records (tuples) in a relation X. b_X: Number of blocks occupied by relation X (also referred to as b). bfr_X: Blocking factor (i.e., number of records per block) in relation X. sl_A: Selectivity of an attribute A for a given condition. sA: Selection cardinality of the attribute being selected (= slA * r). xA: Number of levels of the index for attribute A. b_I1 A: Number of first-level blocks of the index on attribute A. NDV (A, X): Number of distinct values of attribute A in relation X.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 4.1. S1: البحث الخطي (Linear Search) — و S2: البحث الثنائي (Binary Search)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن الآن؟
أبسط طريقتين لتنفيذ SELECT — بدون أي index.

#### ⬅️ الربط مع السابق
هذي أول تطبيق فعلي للرموز اللي عرّفناها بالقسم السابق.

#### 💡 الفكرة الأساسية
**بدون index، إما تفتش كل الملف (linear) أو تستفيد من كونه مرتب (binary) — لكن binary يحتاج الملف مرتب أصلاً على العمود.**

---

#### ⚙️ الخطوات / الخوارزمية: S1 و S2

#### ما هدف هذه العملية؟
> تحديد كلفة إيجاد الصفوف المطلوبة بدون استخدام أي فهرس (index).

```algorithm
1 | S1a: مسح كل الـ blocks | Linear Scan | نجيب كل الصفوف بدون شرط → C = b
2 | S1b: مسح نصف الملف تقريباً | Linear Scan | شرط مساواة على key attribute → C = b/2
3 | S2: بحث ثنائي | Binary Search | الملف مرتب على العمود → C = log₂b + ⌈s/bfr⌉ - 1
```

#### نقاط التنفيذ:
- S1a يُستخدم لما ما فيه شرط WHERE أصلاً (نجيب كل الصفوف)
- S1b يفترض شرط مساواة (`=`) على عمود key (قيمة وحيدة موجودة، فمتوسط البحث نص الملف)
- S2 يحتاج شرط مسبق: **الملف لازم يكون مرتب فعلياً** على العمود المطلوب، وإلا ما ينفع نستخدم binary search

#### 📖 الشرح

`linear search` (أو brute-force) هو الأبسط: تمسح كل الـ blocks وحدة وحدة. لو ما فيه شرط، لازم تشوف كل صف فعلاً فالتكلفة = b (كل الـ blocks). لو فيه شرط مساواة على مفتاح (`key`)، بالمتوسط رح تلقى الصف اللي تدور عليه بعد ما تفتش نص الملف تقريباً (لأنه بيقف فور ما يلقاه)، فالتكلفة = b/2.

`binary search` (S2) أذكى: إذا الملف مرتب على العمود، تقدر تستخدم نفس فكرة "دليل التلفون" — تفتح بالنص، تقارن، تروح يمين أو يسار، وتكرر. هذا يقلل عدد الـ blocks اللي لازم تقراها لـ `log₂b` تقريباً بدل b كاملة. الجزء الإضافي `⌈s/bfr⌉ - 1` يمثل قراءة باقي الصفوف المتطابقة (لو الشرط يرجع أكتر من صف وحد).

#### 🎯 الملخص السريع
- S1a: مسح كامل، بدون شرط → C = b
- S1b: مسح، شرط مساواة على key → C = b/2
- S2: بحث ثنائي، الملف مرتب → C = log₂b (تقريباً)
- binary search أسرع بكثير من linear لكنه يحتاج ملف مرتب

#### 📚 التطبيق
هاتين الطريقتين هما "خط الأساس" (baseline) — أي index (S3-S6) لازم يكون أرخص منهم عشان يستاهل استخدامه.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن `binary search` ينفع يستخدم على أي عمود بأي وقت.

#### الفهم الصحيح ✅:
`binary search` يتطلب إن الملف يكون **مرتب فعلياً** (physically sorted) على العمود المطلوب البحث فيه. لو الملف مرتب على عمود ثاني، ما ينفع نطبق binary search على هذا العمود.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> S1: Linear search (brute force approach). Search all file blocks to retrieve all records: C_S1a = b. For equality condition on a key attribute, on average one-half the records are searched: C_S1b = b/2.
> S2: Binary search: C_S2 = log₂b + ⌈s/bfr⌉ - 1. Reduces to log₂b if equality condition is on a key attribute.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 4.2. S3، S4، S5، S6: طرق البحث باستخدام Index

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1"} -->

#### 📍 أين نحن الآن؟
هذا القسم يغطي كل طرق SELECT اللي تستخدم فهرس (index) — الأكثر استخداماً بالواقع العملي.

#### ⬅️ الربط مع السابق
بعد ما شفنا التكلفة بدون index (S1, S2)، هلأ نشوف كيف الـ index يقلل هذي التكلفة بشكل كبير.

#### 💡 الفكرة الأساسية
**كل نوع index (primary, hash, ordering, clustering, secondary) له صيغة تكلفة مختلفة، حسب كم "دقة" يعطيك بالوصول للبيانات مباشرة.**

---

#### 📐 المعادلة: صيغ S3 إلى S6

$$
C_{S3a} = x + 1 \qquad C_{S3b} = 1
$$

**الشرح:**
> S3a: استخدام `primary index` لجلب صف واحد → نمشي عبر x مستويات index + قراءة block واحد من البيانات.
> S3b: استخدام `hash key` لجلب صف واحد → قراءة مباشرة، بلوك واحد فقط (بافتراض hashing مثالي).

$$
C_{S4} = x + \frac{b}{2}
$$

**الشرح:**
> S4: استخدام `ordering index` لجلب صفوف متعددة (range query) → نمشي عبر x مستويات، ثم نمسح نصف بيانات الملف تقريباً.

$$
C_{S5} = x + \left\lceil \frac{s}{bfr} \right\rceil
$$

**الشرح:**
> S5: استخدام `clustering index` لجلب صفوف متعددة → نمشي عبر x مستويات، ثم نقرأ فقط الـ blocks اللي فيها فعلاً النتائج المتطابقة (s/bfr).

```math
C_{S6a} = x + 1 + s \qquad (\text{أسوأ حالة})
```
```math
C_{S6b} = x + \frac{b_{I1}}{2} + \frac{r}{2} \qquad (\text{range query})
```

**الشرح:**
> S6: استخدام `secondary index` (عادة B+ tree). بأسوأ حالة (S6a)، كل صف نتيجة قد يكون بـ block منفصل (لأن الـ index الثانوي ما يضمن ترتيب فيزيائي)، فالتكلفة تزيد بعدد النتائج نفسه (s). أما للـ range queries (S6b)، الصيغة مختلفة وتشمل نصف الـ index الأول ونصف الجدول الأصلي.

#### 📖 الشرح

الفرق الجوهري بين هاي الطرق هو: **هل الـ index مرتبط بترتيب فيزيائي للبيانات على القرص ولا لأ؟**

- `primary index` (S3a) و`clustering index` (S5): البيانات فعلياً مرتبة على القرص حسب هذا العمود، فبعد ما توصل عبر الـ index، النتائج المتشابهة قريبة من بعض على نفس الـ blocks — رخيص.
- `hash key` (S3b): إذا العمود عليه hash index وهو مفتاح فريد، وصول مباشر بقراءة وحدة تقريباً — أرخص طريقة إطلاقاً لصف واحد.
- `ordering index` (S4): مشابه لـ clustering بس لصفوف أكتر بمدى (range)، فبنمشي بنصف الملف تقريباً بعد ما نوصل بالمكان الصح.
- `secondary index` (S6): البيانات **غير مرتبة** فيزيائياً حسب هذا العمود، فحتى لو الـ index نفسه فعال بإيجاد "مين" الصفوف المطلوبة، كل صف ممكن يكون بـ block مختلف تماماً — لهيك أسوأ حالة (S6a) مكلفة جداً لو عدد النتائج (s) كبير.

كل هذي الصيغ فيها **x**: عدد مستويات الـ index، وهذا رقم صغير جداً عادة (2-4 مستويات حتى لملايين الصفوف)، لأن الـ index بنفسه multilevel (زي B+ tree).

#### 🎯 الملخص السريع
- S3a (primary index، صف واحد): x+1
- S3b (hash، صف واحد): 1 — أرخص طريقة
- S4 (ordering index، range): x + b/2
- S5 (clustering index، صفوف متعددة): x + s/bfr — رخيص لأن البيانات مرتبة فيزيائياً
- S6a (secondary index، worst case): x+1+s — أغلى طريقة لو s كبير
- S6b (secondary index، range): x + b_I1/2 + r/2

#### 📚 التطبيق
هذي الصيغ تُستخدم مباشرة بالمثال التطبيقي (Q2) بالقسم الأخير، لحساب أي index يستخدم لأي شرط.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن `secondary index` دايماً أرخص لأنه "index".

#### الفهم الصحيح ✅:
لو عدد النتائج (`s`) كبير، `secondary index` (S6a) ممكن يكون **أغلى بكثير** من مسح كامل (S1)! لأن كل صف نتيجة يحتاج قراءة block منفصل (بأسوأ حالة). هذا بالضبط ليش optimizer الحقيقي أحياناً "يتجاهل" index موجود ويعمل full scan.

---

#### الفهم الخاطئ ❌:
الخلط بين `clustering index` و`secondary index` — كتير يفتكرون نفس الشي.

#### الفهم الصحيح ✅:
`clustering index` مبني على عمود **البيانات مرتبة فيزيائياً حسبه** (حتى لو مو مفتاح فريد)، بينما `secondary index` مستقل تماماً عن الترتيب الفيزيائي للبيانات. هذا الفرق هو سبب اختلاف الصيغ (S5 مقابل S6).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> S3a: Using a primary index to retrieve a single record: C_S3a = x + 1. S3b: Using a hash key to retrieve a single record: C_S3b = 1. S4: Using an ordering index to retrieve multiple records: C_S4 = x + b/2.
> S5: Using a clustering index to retrieve multiple records: C_S5 = x + ⌈s/bfr⌉. S6: Using a secondary index (B+ tree): C_S6a = x + 1 + s (worst case); C_S6b = x + b_I1/2 + r/2 (for range queries).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 5. دوال التكلفة لعملية JOIN

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن الآن؟
ننتقل الآن من عملية SELECT (على جدول واحد) لعملية JOIN (بين جدولين أو أكتر) — عادة أغلى عملية بالاستعلام.

#### ⬅️ الربط مع السابق
بعد ما حسبنا تكلفة إيجاد الصفوف من جدول واحد، هلأ نحتاج نعرف كيف نقدّر **حجم وتكلفة** دمج جدولين مع بعض.

#### 💡 الفكرة الأساسية
**دوال تكلفة JOIN تعتمد أولاً على تقدير حجم النتيجة (join selectivity وjoin cardinality)، وبعدين نطبق صيغة الخوارزمية المستخدمة (J1-J4).**

---

#### 📐 المعادلة: Join Selectivity و Join Cardinality

$$
js = \frac{1}{\max(NDV(A,R),\ NDV(B,S))}
$$

**الشرح:**
> `js` (join selectivity): نسبة حجم ملف النتيجة إلى حجم ملف الـ `CARTESIAN PRODUCT` الكامل (لو ضربنا الجدولين ببعض بدون شرط). الصيغة البسيطة تفترض إن كل قيمة بالعمود الأكثر تكراراً (أقل NDV) لها تطابق واحد بالمتوسط بالجدول التاني.

$$
jc = |(R \bowtie_c S)| = js \times |R| \times |S|
$$

**الشرح:**
> `jc` (join cardinality): العدد الفعلي المتوقع من الصفوف بنتيجة الـ join = نسبة الـ selectivity مضروبة بحجم الجدولين.

#### 📖 الشرح

قبل ما نحسب تكلفة أي خوارزمية join، لازم نعرف **كم صف رح يطلع بالنتيجة**، لأن هذا الرقم يدخل بكل صيغة تكلفة (خصوصاً بالجزء اللي يمثل كتابة النتيجة). الفكرة إن `join selectivity` هي نسبة صغيرة جداً عادة (لأن الـ CARTESIAN PRODUCT ضخم جداً، والنتيجة الفعلية أصغر بكثير).

الصيغة البسيطة `js = 1/max(NDV(A,R), NDV(B,S))` تفترض سيناريو مثالي: كل قيمة بالعمود الأقل تنوعاً (`NDV` أقل) موجودة أيضاً بالعمود التاني، وبالتالي كل صف من الجدول الأكبر NDV يطابق تقريباً صف واحد فقط بالمتوسط.

#### 🎯 الملخص السريع
- js = نسبة (صغيرة عادة)، تعتمد على NDV لكلا العمودين
- jc = العدد الفعلي المتوقع من صفوف النتيجة
- هذين الرقمين مدخل أساسي لكل صيغة join جاية (J1-J4)

#### 📚 التطبيق
js وjc يظهروا بكل صيغة من J1 لـ J4، وأيضاً بصيغ semi-join وanti-join الخاصة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن `js` تعتمد فقط على عدد صفوف الجدولين.

#### الفهم الصحيح ✅:
`js` تعتمد على `NDV` (عدد القيم المميزة) للعمود المستخدم بالـ join، مو على عدد الصفوف. جدول كبير جداً بس عمود join عنده قيم مميزة قليلة، يعطي js أكبر (تطابقات أكتر لكل قيمة).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Cost functions involve estimate of file size that results from the JOIN operation. Join selectivity: ratio of the size of resulting file to size of the CARTESIAN PRODUCT file. Simple formula for join selectivity: js = 1/max(NDV(A,R), NDV(B,S)). Join cardinality: jc = |(Rc S)| = js * |R| * |S|.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 5.1. خوارزميات الـ JOIN: J1، J2، J3، J4

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن الآن؟
هنا نشوف الصيغ الفعلية للخوارزميات الأربع المستخدمة لتنفيذ الـ join.

#### ⬅️ الربط مع السابق
بعد ما حسبنا `js` و`jc`، نستخدمهم الآن ضمن صيغة كل خوارزمية.

#### 💡 الفكرة الأساسية
**كل خوارزمية join (nested-loop, index-based nested-loop, sort-merge, partition-hash) لها طريقة مختلفة بالوصول للبيانات، وبالتالي صيغة تكلفة مختلفة.**

---

#### 📐 المعادلة: J1 — Nested-Loop Join

$$
C_{J1} = b_R + (b_R \times b_S) + \frac{js \times |R| \times |S|}{bfr_{RS}} \qquad (\text{لـ 3 memory buffer blocks})
$$

$$
C_{J1} = b_R + \left\lceil \frac{b_R}{n_B - 2} \right\rceil \times b_S + \frac{js \times |R| \times |S|}{bfr_{RS}} \qquad (\text{لـ } n_B \text{ memory buffer blocks})
$$

**الشرح:**
> نقرأ R مرة وحدة (b_R)، ولكل "دفعة" من R نقرأ S كاملة من جديد — لهيك b_R × b_S بأبسط حالة. زيادة عدد الـ buffers (n_B) تقلل عدد مرات إعادة قراءة S. الجزء الأخير (jc/bfr_RS) هو تكلفة كتابة النتيجة.

#### 📐 المعادلة: J2 — Index-Based Nested-Loop Join

$$
C_{J2a} = b_R + \left(|R| \times (x_B + 1 + s_B)\right) + \frac{js \times |R| \times |S|}{bfr_{RS}}
$$

**الشرح:**
> بدل ما نمسح S كاملة لكل صف من R، نستخدم index على عمود الـ join بـ S (بـ selection cardinality اسمها s_B). هذا يبدل "مسح b_S كامل" بـ "بحث index" (x_B+1+s_B) لكل صف من R — أرخص بكثير لو الـ index فعال.

#### 📐 المعادلة: J3 — Sort-Merge Join

$$
C_{J3a} = b_R + b_S + \frac{js \times |R| \times |S|}{bfr_{RS}} \qquad (\text{للملفات المرتبة مسبقاً على عمود الـ join})
$$

**الشرح:**
> لو الجدولين مرتبين أصلاً على عمود الـ join، نمشي عليهم مرة وحدة فقط (كل واحد b مرة)، وهذا أرخص بكثير من nested-loop. **لو مو مرتبين، لازم نضيف تكلفة الفرز نفسه.**

#### 📐 المعادلة: J4 — Partition-Hash Join

$$
C_{J4} = 3 \times (b_R + b_S) + \frac{js \times |R| \times |S|}{bfr_{RS}}
$$

**الشرح:**
> نقسّم كلا الجدولين لأقسام (partitions) بنفس دالة hash على عمود الـ join، وبعدين نقارن كل قسم من R بنفس القسم من S بس. الرقم 3 يمثل: قراءة أثناء التقسيم + كتابة الأقسام + قراءتها مرة ثانية للمطابقة.

#### 📖 الشرح

الترتيب من الأغلى للأرخص (بالعادة): `J1` (nested-loop العادي) أغلى طريقة لأنه يعيد قراءة S بالكامل لكل block من R. `J2` (index-based) أفضل بكثير لو فيه index مناسب على S. `J3` (sort-merge) ممتاز **إذا** الجدولين مرتبين أصلاً — أرخص طريقة بمعظم الحالات. `J4` (partition-hash) بديل جيد لما ما فيه ترتيب ولا index مناسب، ويعتمد على قوة دالة hash.

#### 🎯 الملخص السريع
- J1 (nested-loop): الأبسط، غالباً الأغلى
- J2 (index-based nested-loop): أرخص لو فيه index جيد على S
- J3 (sort-merge): أرخص طريقة لو الجدولين مرتبين مسبقاً
- J4 (partition-hash): بديل قوي بدون ترتيب أو index

#### 📚 التطبيق
الـ optimizer يحسب هذي الصيغ الأربع لكل ترتيب join ممكن، ويختار الأرخص — هذا بالضبط اللي رح نشوفه بالمثال التطبيقي (Q2).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن J3 (sort-merge) دايماً "مجاني" لأن الصيغة ما فيها ضرب b_R × b_S.

#### الفهم الصحيح ✅:
الصيغة C_J3a تفترض **الملفات مرتبة أصلاً**. لو مش مرتبة، لازم تضيف تكلفة الفرز (sorting cost) وهذي ممكن تكون غالية (عادة O(b log b))، وأحياناً تخلي J3 أغلى من J2.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> J1: Nested-loop join. For three memory buffer blocks: C_J1 = b_R + (b_R * b_S) + ((js * |R| * |S|)/bfr_RS). For n_B memory buffer blocks: C_J1 = b_R + (⌈b_R/(n_B-2)⌉ * b_S) + ((js*|R|*|S|)/bfr_RS).
> J2: Index-based nested-loop join. For a secondary index with selection cardinality S_B for join attribute B of S: C_J2a = b_R + (|R| * (x_B + 1 + s_B)) + ((js*|R|*|S|)/bfr_RS).
> J3: Sort-merge join. For files already sorted on the join attributes: C_J3a = b_R + b_S + ((js*|R|*|S|)/bfr_RS). Cost of sorting must be added if sorting needed.
> J4: Partition-hash join: C_J4 = 3*(b_R+b_S) + ((js*|R|*|S|)/bfr_RS).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 5.2. Semi-Join و Anti-Join

<!-- @render: {type: "diagram-first", visualization: "before-after", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1"} -->

#### 📍 أين نحن الآن؟
حالتين خاصتين لصيغة join selectivity/cardinality، تظهر لما الاستعلام فيه subquery بـ `IN` أو `NOT IN`.

#### ⬅️ الربط مع السابق
بعد ما شفنا الصيغة العامة لـ js وjc، هلأ نشوف كيف تتغير الصيغة لما نوع الـ join يكون مختلف (semi-join، anti-join) بدل inner join عادي.

#### 💡 الفكرة الأساسية
**استعلامات بـ `IN` تتحول لـ `semi-join`، واستعلامات بـ `NOT IN` تتحول لـ `anti-join` — ولكل واحدة صيغة selectivity خاصة.**

---

#### 🔄 قبل / بعد: Unnesting الاستعلام (Semi-Join)

**قبل (الاستعلام الأصلي بـ subquery):**
```sql
SELECT COUNT(*)
FROM T1
WHERE T1.X IN (SELECT T2.Y
               FROM T2);
```

**بعد (بعد unnesting، يتحول لـ semi-join):**
```sql
SELECT COUNT(*)
FROM T1, T2
WHERE T1.X = T2.Y;
```

**ماذا تغيّر؟** الاستعلام المتداخل (nested) تحول لجملة join بسيطة، بس نوعه semi-join — يعني نطلع صف من T1 مرة وحدة بس حتى لو طابق أكتر من صف بT2.

#### 📐 المعادلة: Join Selectivity/Cardinality لـ Semi-Join

$$
js = \min\left(1,\ \frac{NDV(Y,T2)}{NDV(X,T1)}\right) \qquad jc = |T1| \times js
$$

#### 🔄 قبل / بعد: Unnesting الاستعلام (Anti-Join)

**قبل:**
```sql
SELECT COUNT(*)
FROM T1
WHERE T1.X NOT IN (SELECT T2.Y
                   FROM T2);
```

**بعد:**
```sql
SELECT COUNT(*)
FROM T1, T2
WHERE T1.X ≠ T2.Y;   -- (anti-join logically)
```

**ماذا تغيّر؟** نفس الفكرة بس معكوسة — نبحث عن صفوف T1 اللي **ما** لها تطابق بـ T2.

#### 📐 المعادلة: Join Selectivity/Cardinality لـ Anti-Join

$$
js = 1 - \min\left(1,\ \frac{NDV(T2.y)}{NDV(T1.x)}\right) \qquad jc = |T1| \times js
$$

#### 📖 الشرح

فكرة الـ `unnesting` (تحويل subquery لجملة join مسطحة) مهمة لأن الـ optimizer عادة يقدر يحسّن join أفضل بكثير من subquery متداخلة. بعد التحويل، النتيجة تصير نوع خاص من الـ join:

- **semi-join**: نطلع صفوف T1 اللي **لها** تطابق واحد على الأقل بـ T2 (بس T1 نفسه مو نتيجة الـ join، فقط "عينة" منه — لهذا اسمه semi أي "نص"). صيغة js تستخدم `min` لأنها نسبة، ما ينفع تتجاوز 1.
- **anti-join**: عكس تماماً — نطلع صفوف T1 اللي **ما** لها أي تطابق بـ T2. الصيغة `1 - min(...)` منطقية: لو كل قيم T1.x موجودة بـ T2.y، فما فيه صفوف بدون تطابق، فـ js = 0.

#### 🎯 الملخص السريع
- `IN` subquery → semi-join → js = min(1, NDV(Y,T2)/NDV(X,T1))
- `NOT IN` subquery → anti-join → js = 1 - min(1, NDV(T2.y)/NDV(T1.x))
- jc بكلا الحالتين = |T1| × js (مو |T1|×|T2| زي الـ join العادي)

#### 📚 التطبيق
هذا يستخدم لما نحلل استعلامات فيها `EXISTS`, `IN`, `NOT IN` — شائعة جداً بالواقع العملي وبالامتحانات.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
استخدام نفس صيغة jc العادية (`js × |R| × |S|`) للـ semi-join و anti-join.

#### الفهم الصحيح ✅:
لـ semi-join و anti-join، الصيغة الصحيحة هي `jc = |T1| × js` **فقط** (بدون ضرب بـ |T2|)، لأن النتيجة هي صفوف من T1 فقط (مو دمج بين الجدولين).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Join selectivity and cardinality for semi-join: SELECT COUNT(*) FROM T1 WHERE T1.X IN (SELECT T2.Y FROM T2); Unnesting query above leads to semi-join: SELECT COUNT(*) FROM T1, T2 WHERE T1.X S= T2.Y; Join selectivity: js = MIN(1,NDV(Y,T2)/NDV(X,T1)). Join cardinality: jc = |T1|* js.
> Join selectivity and cardinality for anti-join: SELECT COUNT(*) FROM T1 WHERE T1.X NOT IN (SELECT T2.Y FROM T2); Unnesting query above leads to anti-join: SELECT COUNT(*) FROM T1, T2 WHERE T1.X A= T2.Y; Join selectivity: js = 1 - MIN(1,NDV(T2.y)/NDV(T1.x)). Join cardinality: jc = |T1|*js.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 5.3. أشجار الـ JOIN وترتيب التنفيذ (Left-Deep, Right-Deep, Bushy)

<!-- @render: {type: "diagram-first", visualization: "tree", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1"} -->

#### 📍 أين نحن الآن؟
بعد ما عرفنا صيغ التكلفة لـ join واحد، هلأ نتعامل مع استعلامات فيها **أكتر من جدولين** وكيف نرتبهم.

#### ⬅️ الربط مع السابق
لو الاستعلام فيه أكتر من join، ترتيب تنفيذها يأثر على التكلفة الكلية بشكل كبير — وهذا يمثل بشكل "شجرة".

#### 💡 الفكرة الأساسية
**شكل شجرة تنفيذ الـ joins المتعددة (left-deep, right-deep, bushy) يحدد أي الاستراتيجيات ممكنة، وعددها يكبر بسرعة رهيبة (factorial) مع عدد الجداول.**

---

#### 📊 المخطط: أشكال أشجار الـ Join لأربع جداول (R1, R2, R3, R4)

#### ما هذا المخطط؟
> يوضّح 3 أشكال مختلفة لترتيب تنفيذ الـ joins بين 4 جداول: left-deep، right-deep، و bushy.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | R1, R2, R3, R4 | leaf (جدول أساسي) | الجداول الخام قبل أي join |
| 2 | ⨝ (join) | internal node | نتيجة دمج فرعين |

#### وصف الروابط:
| من | إلى | التسمية | نوع | الشرح |
| --- | --- | --- | --- | --- |
| R1, R2 | ⨝ الأول | join | صلب | أول join بالشجرة |
| ⨝ الأول, R3 | ⨝ الثاني | join | صلب | (بحالة left-deep) نضيف جدول جديد بكل مرة على اليسار |
| ⨝ الثاني, R4 | ⨝ الجذر | join | صلب | نتيجة نهائية |

```diagram
type: tree
title: Left-Deep Join Tree (R1,R2,R3,R4)
direction: TD
nodes:
  - id: root
    label: "⨝ (final)"
    kind: process
  - id: j2
    label: "⨝"
    kind: process
  - id: j1
    label: "⨝"
    kind: process
  - id: r1
    label: "R1"
    kind: data
  - id: r2
    label: "R2"
    kind: data
  - id: r3
    label: "R3"
    kind: data
  - id: r4
    label: "R4"
    kind: data
edges:
  - from: root
    to: j2
  - from: root
    to: r4
  - from: j2
    to: j1
  - from: j2
    to: r3
  - from: j1
    to: r1
  - from: j1
    to: r2
```

#### 📖 الشرح

**Left-deep tree**: كل join جديد يضيف جدول واحد بالمرة على الطرف الأيسر — يعني عندك سلسلة (R1⨝R2)⨝R3)⨝R4. هذا الشكل **مفضّل عملياً** لأنه يتوافق مع خوارزميات الـ join الشائعة (زي nested-loop) ويسمح بعمل `fully pipelined plans` (تقدر تبدأ بمعالجة النتائج الجزئية فوراً بدون انتظار كل الأشجار).

**Right-deep tree**: نفس الفكرة معكوسة (الإضافة على اليمين).

**Bushy tree**: الأشكال غير الخطية — مثلاً (R1⨝R2) و(R3⨝R4) تُحسبان بشكل منفصل ومتوازي وبعدين تُدمجان مع بعض. هذا يعطي مرونة أكتر بس صعوبة أكبر بالـ pipelining.

**عدد الاحتمالات**: الجدول بالمحاضرة يوضح كيف عدد هالأشجار يكبر بسرعة رهيبة:

| عدد الجداول N | عدد left-deep trees (N!) | عدد أشكال bushy S(N) | عدد bushy trees الكامل |
| --- | --- | --- | --- |
| 2 | 2 | 1 | 2 |
| 3 | 6 | 2 | 12 |
| 4 | 24 | 5 | 120 |
| 5 | 120 | 14 | 1,680 |
| 6 | 720 | 42 | 30,240 |
| 7 | 5,040 | 132 | 665,280 |

لاحظ كيف بس 7 جداول عندك أكثر من نص مليون شجرة bushy ممكنة! هذا بالضبط ليش الـ optimizer **ما يجرب كل الاحتمالات وحدة وحدة** — لازم استراتيجية أذكى.

#### 🎯 الملخص السريع
- Left-deep: مفضل عملياً، متوافق مع pipelining
- Right-deep و bushy: بدائل أقل استخداماً عملياً
- عدد الأشجار الممكنة = factorial، يكبر بسرعة جنونية
- هذا يبرر الحاجة لـ dynamic programming (القسم الجاي)

#### 📚 التطبيق
بالمثال التطبيقي (Q2)، افترضنا "left-deep trees" بس عشان نحصر عدد الاحتمالات لـ 4 (بدل 12 لو اعتبرنا bushy أيضاً).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن bushy trees دايماً أفضل لأنها "أكتر مرونة".

#### الفهم الصحيح ✅:
Bushy trees فعلاً أكتر مرونة نظرياً، لكن left-deep trees **مفضلة عملياً** لأنها تتماشى أفضل مع خوارزميات الـ join المستخدمة فعلياً (زي nested-loop join) وتسمح بتنفيذ pipelined كامل — يعني توفير بمساحة التخزين المؤقت.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Multirelation queries and JOIN ordering choices: Left-deep join tree, Right-deep join tree, Bushy join tree. [جدول: Number of permutations of left-deep and bushy join trees of n relations — N=2 to 7, مع أعمدة No. of Left-Deep Trees N!, No. of Bushy Shapes S(N), No. of Bushy Trees (2N-2)!/(N-1)!]
> Left-deep trees generally preferred: work well for common algorithms for join; able to generate fully pipelined plans.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

### 5.4. التحسين الفيزيائي والـ Dynamic Programming

<!-- @render: {type: "prose-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_5.3"} -->

#### 📍 أين نحن الآن؟
آخر قسم بموضوع JOIN — كيف الـ optimizer فعلياً يتعامل مع هذا العدد الهائل من الاحتمالات بكفاءة.

#### ⬅️ الربط مع السابق
عرفنا إن عدد أشجار الـ join يكبر بشكل factorial. هلأ نشوف الحل: `dynamic programming`.

#### 💡 الفكرة الأساسية
**بدل تجربة كل الاحتمالات، الـ optimizer يحل مسائل جزئية أصغر أول ويبني عليها الحل الكامل تصاعدياً (bottom-up) — هذا اسمه dynamic programming.**

---

#### 📖 الشرح

`physical optimization` هو القرار على مستوى "التنفيذ الفعلي": بعد ما نحدد **ترتيب** الجداول بالـ join (الشجرة)، لازم نقرر كمان **أي خوارزمية** بالضبط نستخدم لكل عقدة join (nested-loop؟ sort-merge؟) وهل نستخدم index scan أو لأ. هذا القرار يمكن يكون:
- **cost-based physical optimization**: نحسب فعلياً، بطريقتين ممكنتين: `top-down` (نبدأ من الجذر ونقرر للأسفل) أو `bottom-up` (نبدأ من الأوراق ونبني للأعلى).
- أو أحياناً فيه **heuristics على المستوى الفيزيائي** تلغي الحاجة لحساب كامل — مثال: "استخدم index scan كل ما كان ممكن" (قاعدة بسيطة بدل حساب).

للتعامل مع الانفجار بعدد الاحتمالات (اللي شفناه بالقسم السابق)، تُستخدم **`dynamic programming`** كطريقة cost-based optimization: تنطبق لما المسألة نفسها فيها مسائل فرعية، وهذي المسائل الفرعية نفسها فيها مسائل فرعية أصغر (recursive structure). خطوات الطريقة:
1. نطور بنية الحل الأمثل (optimal solution structure)
2. نعرّف قيمة الحل الأمثل بشكل تكراري (recursively defined)
3. نحسب الحل الأمثل وقيمته بطريقة تصاعدية (bottom-up fashion)

**بمعنى عملي**: بدل ما نحسب تكلفة كل شجرة join كاملة من الصفر (وفيه ملايين الأشجار)، نحسب أول أرخص طريقة لـ join بين **كل زوج من جدولين**، ونخزن هذي النتائج. بعدين نستخدمها لحساب أرخص طريقة لـ join بين **كل 3 جداول**، وهكذا حتى نوصل لكل الجداول — كل مرحلة تعيد استخدام نتائج المرحلة اللي قبلها بدل إعادة الحساب.

#### 🎯 الملخص السريع
- physical optimization يقرر الخوارزمية الفعلية لكل join
- Left-deep trees مفضلة لأنها تتوافق مع خوارزميات الـ join الشائعة
- Dynamic programming يحل المسألة تصاعدياً (من الأصغر للأكبر) بدل تجربة كل الاحتمالات
- هذا يقلل التعقيد الحسابي بشكل كبير جداً

#### 📚 التطبيق
هذا يفسر كيف optimizer حقيقي (زي Oracle أو PostgreSQL) يقدر يحسب خطة تنفيذ لاستعلام فيه 10+ جداول خلال أجزاء من الثانية، رغم إن عدد الاحتمالات الخام يكون مليارات.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن dynamic programming "يجرب كل شي بس بترتيب أسرع".

#### الفهم الصحيح ✅:
الفكرة الحقيقية هي **إعادة استخدام الحسابات** (memoization) — مثلاً لو حسبنا أرخص طريقة لـ join بين R1 وR2، هذا الحساب يُستخدم مباشرة بأي شجرة أكبر تحتوي على R1⨝R2، بدل ما يُعاد حسابه من الصفر مع كل شجرة جديدة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> Physical optimization involves execution decision at the physical level. Cost-based physical optimization: Top-down approach, Bottom-up approach. Certain physical level heuristics make cost optimizations unnecessary. Example: for selections, use index scans whenever possible.
> Dynamic programming: cost-based optimization approach. Applies when a problem has subproblems that themselves have subproblems. Optimal solution structure is developed. Value of the optimal solution is recursively defined. Optimal solution is computed and its value developed in a bottom-up fashion.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: physical optimization وdynamic programming والفرق بين top-down/bottom-up
- ⚠️ غير مشروح بالكامل: المحاضرة ما أعطت مثال رقمي كامل لخطوات dynamic programming تحديداً (بس شرحت المبدأ العام)
- ℹ️ إضافة من الدليل: تشبيه "memoization" لتوضيح الفكرة عملياً

</details>

---

### 6. مثال تطبيقي شامل: الاستعلام Q2

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.4"} -->

#### 📍 أين نحن الآن؟
آخر قسم بالمحاضرة — تطبيق عملي كامل يجمع كل المفاهيم السابقة على استعلام حقيقي.

#### ⬅️ الربط مع السابق
هذا المثال يستخدم بالضبط: catalog statistics، join selectivity/cardinality، ومفهوم left-deep trees من الأقسام السابقة.

#### 💡 الفكرة الأساسية
**نأخذ استعلام حقيقي فيه 3 جداول، ونستخدم إحصائيات الـ catalog لتقييم ترتيبات join مختلفة واختيار الأرخص.**

---

#### 💻 الكود: الاستعلام Q2

#### ما هذا الكود؟
> استعلام يجيب معلومات المشروع والقسم والمدير للمشاريع الموجودة بموقع 'Stafford'.

```sql
-- Q2: retrieve project/department/manager info for projects in 'Stafford'
SELECT Pnumber, Dnum, Lname, Address, Bdate
FROM PROJECT, DEPARTMENT, EMPLOYEE
WHERE Dnum = Dnumber        -- join PROJECT with DEPARTMENT
  AND Mgr_ssn = Ssn         -- join DEPARTMENT with EMPLOYEE (manager)
  AND Plocation = 'Stafford'; -- selection condition on PROJECT
```

#### شرح كل سطر:
1. `SELECT ...` → تحديد الأعمدة المطلوبة بالنتيجة النهائية — لا يؤثر على التكلفة بشكل مباشر (بس على حجم النتيجة النهائية المكتوبة)
2. `FROM PROJECT, DEPARTMENT, EMPLOYEE` → 3 جداول، يعني عندنا 2 joins بأي ترتيب (شجرة بثلاث عقد)
3. `Dnum = Dnumber` → شرط الـ join الأول (PROJECT مع DEPARTMENT)
4. `Mgr_ssn = Ssn` → شرط الـ join الثاني (DEPARTMENT مع EMPLOYEE، عبر المدير)
5. `Plocation = 'Stafford'` → شرط selection على PROJECT فقط، يقلل حجم PROJECT **قبل** أي join (لو طبقنا heuristics)

**الناتج المتوقع:**
> قائمة بالمشاريع بموقع Stafford مع رقم القسم واسم وعنوان وتاريخ ميلاد مديره.

#### 📊 المخطط: إحصائيات الـ Catalog لجداول Q2

#### ما هذا المخطط؟
> يوضّح الأرقام الفعلية من الـ catalog اللي نحتاجها لحساب أي تكلفة بهذا المثال.

#### وصف العُقد (جدول Table Info):
| Table_name | Num_rows | Blocks |
| --- | --- | --- |
| PROJECT | 2000 | 100 |
| DEPARTMENT | 50 | 5 |
| EMPLOYEE | 10000 | 2000 |

#### وصف الروابط (جدول Column Info):
| Table_name | Column_name | Num_distinct | Low_value | High_value |
| --- | --- | --- | --- | --- |
| PROJECT | Plocation | 200 | 1 | 200 |
| PROJECT | Pnumber | 2000 | 1 | 2000 |
| PROJECT | Dnum | 50 | 1 | 50 |
| DEPARTMENT | Dnumber | 50 | 1 | 50 |
| DEPARTMENT | Mgr_ssn | 50 | 1 | 50 |
| EMPLOYEE | Ssn | 10000 | 1 | 10000 |
| EMPLOYEE | Dno | 50 | 1 | 50 |
| EMPLOYEE | Salary | 500 | 1 | 500 |

**معلومات الـ Index (Blevel = عدد المستويات بدون leaf level):**
| Index_name | Uniqueness | Blevel | Leaf_blocks | Distinct_keys |
| --- | --- | --- | --- | --- |
| PROJ_PLOC | NONUNIQUE | 1 | 4 | 200 |
| EMP_SSN | UNIQUE | 1 | 50 | 10000 |
| EMP_SAL | NONUNIQUE | 1 | 50 | 500 |

#### 📖 الشرح

بهذا المثال، بنفترض إن الـ optimizer يعتبر بس `left-deep trees` (عشان نحصر عدد الاحتمالات). بما إن عندنا 3 جداول، عدد ترتيبات الـ left-deep الممكنة = 3! = 6، بس المحاضرة اختصرت لأربع ترتيبات منطقية (بعضها متشابه بالتكلفة):

- PROJECT ⨝ DEPARTMENT ⨝ EMPLOYEE
- DEPARTMENT ⨝ PROJECT ⨝ EMPLOYEE
- DEPARTMENT ⨝ EMPLOYEE ⨝ PROJECT
- EMPLOYEE ⨝ DEPARTMENT ⨝ PROJECT

لكل ترتيب، الـ optimizer يحسب:
1. تكلفة تطبيق شرط `Plocation='Stafford'` على PROJECT (باستخدام index PROJ_PLOC مثلاً — طريقة S6 بما إنه NONUNIQUE) → يعطينا selection cardinality تقريبية = 2000/200 = 10 صفوف
2. تكلفة الـ join الأول بين النتيجة والجدول التالي بالترتيب (باستخدام إحدى J1-J4، حسب توفر index مناسب)
3. تكلفة الـ join الثاني بنفس الطريقة

الترتيب اللي يبدأ بـ PROJECT منطقي جداً هنا، لأن شرط `Plocation='Stafford'` يقلل حجم PROJECT بشكل كبير **قبل** أي join (من 2000 صف لـ 10 صفوف تقريباً) — وهذا بالضبط نفس فكرة الـ heuristics (دفع الـ selection بدري) لكن هنا مثبتة بالأرقام الفعلية عبر cost-based optimization.

#### 🎯 الملخص السريع
- Q2 فيه 3 جداول → عدة ترتيبات join ممكنة (left-deep)
- الأرقام (rows, blocks, NDV, index info) من الـ catalog هي المدخل لكل حساب
- شرط `Plocation='Stafford'` يقلل PROJECT من 2000 لـ ~10 صف، فترتيب يبدأ بـ PROJECT غالباً الأرخص
- هذا يربط بين heuristics (دفع selection بدري) وcost-based (تأكيد بالأرقام)

#### 📚 التطبيق
هذا المثال يلخص كل المحاضرة عملياً — أي سؤال امتحان يطلب "احسب التكلفة" غالباً رح يستخدم نفس هالشكل من الجداول (row count, block count, NDV, index info).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن ترتيب الجداول بجملة `FROM` بالـ SQL يحدد ترتيب تنفيذ الـ joins فعلياً.

#### الفهم الصحيح ✅:
الـ optimizer **حر تماماً** بإعادة ترتيب الـ joins بأي شكل يريده (طالما النتيجة النهائية صحيحة منطقياً)، بغض النظر عن ترتيب كتابتها بجملة FROM. هذا بالضبط الهدف من كل هذي المحاضرة — نحسب التكلفة لكل ترتيب ممكن ونختار الأرخص، مو الترتيب اللي كتبه المبرمج.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Example: Consider Q2 below and query tree from Figure 19.1(a): Q2: SELECT Pnumber, Dnum, Lname, Address, Bdate FROM PROJECT, DEPARTMENT, EMPLOYEE WHERE Dnum=Dnumber AND Mgr_ssn=Ssn AND Plocation='Stafford'.
> [Sample statistical information: column info, table info، index info كما بالجداول أعلاه]
> Assume optimizer considers only left-deep trees. Evaluate potential join orders: PROJECT⨝DEPARTMENT⨝EMPLOYEE, DEPARTMENT⨝PROJECT⨝EMPLOYEE, DEPARTMENT⨝EMPLOYEE⨝PROJECT, EMPLOYEE⨝DEPARTMENT⨝PROJECT.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>

---

## أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط وصعب

### السؤال 1 (متوسط)

أي مكون تكلفة يُعتبر عادة **الأهم والأكبر** بحسابات الـ cost-based optimizer؟

أ) Computation cost
ب) Access cost to secondary storage
ج) Memory usage cost
د) Communication cost

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** الوصول للتخزين الثانوي (القرص) أبطأ بآلاف المرات من عمليات الذاكرة أو المعالج، لهيك هو المكوّن المهيمن بمعظم الحسابات.
- ❌ **الخيار أ):** Computation cost مهم بس أصغر بكثير من access cost بمعظم الحالات.
- ❌ **الخيار ج):** Memory usage cost يؤثر لكنه ثانوي مقارنة بالوصول للقرص.
- ❌ **الخيار د):** Communication cost مهم بالأنظمة الموزعة تحديداً، لكنه مو الافتراضي العام لكل الأنظمة.

---

### السؤال 2 (سهل-متوسط)

لو `sl_A = 0.02` و`r = 5000`، كم قيمة `selection cardinality (s)`؟

أ) 10
ب) 100
ج) 250
د) 2500

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `s = sl_A × r = 0.02 × 5000 = 100`.
- ❌ **الخيار أ):** هذا لو استخدمنا r × sl خطأ بترتيب أو رقم مختلف.
- ❌ **الخيار ج):** ناتج حسابي خاطئ لا يطابق الصيغة.
- ❌ **الخيار د):** هذا لو ضربنا 0.5 × 5000 خطأ، مو 0.02.

---

### السؤال 3 (متوسط)

جدول يحتوي 20000 صف موزعة على 1000 block. تريد جلب كل الصفوف بدون أي شرط باستخدام `linear search`. ما التكلفة (S1a)؟

أ) 500
ب) 1000
ج) 10000
د) 20000

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `C_S1a = b = 1000` (نمسح كل الـ blocks مرة وحدة، بغض النظر عن عدد الصفوف).
- ❌ **الخيار أ):** هذا نصف عدد الـ blocks (يطبق فقط لشرط مساواة على key، S1b).
- ❌ **الخيار ج):** هذا رقم غير مرتبط بالصيغة الصحيحة.
- ❌ **الخيار د):** هذا عدد الصفوف (r) مو عدد الـ blocks (b) — خطأ شائع بالخلط بينهم.

---

### السؤال 4 (متوسط)

أي طريقة SELECT تعطي أرخص تكلفة لجلب **صف واحد فقط** بشرط مساواة على مفتاح؟

أ) S1a (linear search كامل)
ب) S2 (binary search)
ج) S3b (hash key)
د) S6a (secondary index، worst case)

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** `C_S3b = 1` — أرخص طريقة إطلاقاً، لأن الـ hash يوصل مباشرة للـ block الصحيح.
- ❌ **الخيار أ):** أغلى طريقة (C = b كامل).
- ❌ **الخيار ب):** أرخص من linear لكن أغلى من hash (يحتاج log₂b).
- ❌ **الخيار د):** مخصص لصفوف متعددة، وبأسوأ حالة أغلى بكثير من hash لصف واحد.

---

### السؤال 5 (صعب)

عمود له `NDV = 50` بجدول من 10000 صف. باستخدام `secondary index (B+ tree)` بأسوأ حالة (S6a)، مع `x=3`، ما شكل الصيغة الصحيحة؟

أ) `C = x + 1` فقط
ب) `C = x + 1 + s` حيث s = عدد النتائج المتوقعة
ج) `C = log₂b`
د) `C = b/2`

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** S6a (أسوأ حالة) = `x + 1 + s`، وهنا `s = r/NDV = 10000/50 = 200` صف تقريباً — يعني التكلفة تكبر بشكل كبير لأن كل صف قد يكون بـ block مختلف.
- ❌ **الخيار أ):** هذي صيغة S3a (primary index لصف واحد)، مو secondary index لعدة صفوف.
- ❌ **الخيار ج):** هذي صيغة binary search (S2)، غير مرتبطة بـ secondary index.
- ❌ **الخيار د):** هذي صيغة جزء من S4 (ordering index)، مو S6a.

---

### السؤال 6 (متوسط)

عمود الـ join A بجدول R له `NDV(A,R) = 100`، وعمود B بجدول S له `NDV(B,S) = 20`. ما قيمة `join selectivity (js)` بالصيغة البسيطة؟

أ) 1/20
ب) 1/100
ج) 1/120
د) 20/100

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `js = 1/max(NDV(A,R), NDV(B,S)) = 1/max(100,20) = 1/100`.
- ❌ **الخيار أ):** استخدام أصغر NDV بدل أكبرها — خطأ بتطبيق `max` بدل `min`.
- ❌ **الخيار ج):** جمع القيمتين بدل أخذ الأكبر منهما، غير صحيح بالصيغة.
- ❌ **الخيار د):** نسبة عشوائية غير مرتبطة بالصيغة الصحيحة.

---

### السؤال 7 (متوسط)

لو `|R|=200` و`|S|=5000` و`js=0.01`، ما قيمة `join cardinality (jc)`؟

أ) 100
ب) 1000
ج) 10000
د) 50

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `jc = js × |R| × |S| = 0.01 × 200 × 5000 = 1000`.
- ❌ **الخيار أ):** خطأ حسابي (نسيان ضرب أحد الطرفين).
- ❌ **الخيار ج):** خطأ حسابي (ضرب زائد بمقدار 10).
- ❌ **الخيار د):** خطأ حسابي (قسمة بدل ضرب).

---

### السؤال 8 (صعب)

أي خوارزمية join تعطي أرخص تكلفة **إذا كان كلا الجدولين مرتبين مسبقاً** على عمود الـ join؟

أ) J1 (nested-loop)
ب) J2 (index-based nested-loop)
ج) J3 (sort-merge)
د) J4 (partition-hash)

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** J3 بالصيغة `C_J3a = b_R + b_S + (jc/bfr_RS)` — أرخص طريقة بدون أي تكلفة إضافية عندما يكون الجدولين مرتبين فعلياً.
- ❌ **الخيار أ):** J1 دايماً يحتاج `b_R × b_S` تقريباً، أغلى بكثير من J3 بهذي الحالة.
- ❌ **الخيار ب):** J2 جيد بس فقط لو فيه index مناسب على S، مو بالضرورة أرخص من J3 مع ترتيب مسبق.
- ❌ **الخيار د):** J4 يحتاج تقسيم (partitioning) إضافي حتى لو الجدولين مرتبين، فأغلى من J3 بهذي الحالة تحديداً.

---

### السؤال 9 (متوسط)

استعلام SQL فيه `WHERE T1.X IN (SELECT T2.Y FROM T2)`. بعد الـ `unnesting`، هذا يتحول إلى:

أ) Anti-join
ب) Semi-join
ج) Cartesian product
د) Outer join

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** شرط `IN` بالـ subquery يتحول لـ `semi-join` بعد الـ unnesting.
- ❌ **الخيار أ):** `anti-join` يتوافق مع `NOT IN`، مو `IN`.
- ❌ **الخيار ج):** الـ Cartesian product هو الحالة بدون أي شرط join إطلاقاً.
- ❌ **الخيار د):** Outer join مفهوم مختلف تماماً (يحافظ على صفوف بدون تطابق).

---

### السؤال 10 (صعب)

لديك `T1` بعمود X له `NDV(X,T1)=100`، و`T2` بعمود Y له `NDV(Y,T2)=25`. ما قيمة `js` لعملية **semi-join** (من استعلام `IN`)؟

أ) 0.25
ب) 0.04
ج) 1
د) 0.75

**الإجابة الصحيحة:** أ)

**التعليل:**
- ✅ **الخيار أ):** `js = MIN(1, NDV(Y,T2)/NDV(X,T1)) = MIN(1, 25/100) = 0.25`.
- ❌ **الخيار ب):** هذا معكوس النسبة (100/25 مقسوم بشكل خاطئ)، غير مطابق للصيغة.
- ❌ **الخيار ج):** MIN(1, ...) تعطي 1 فقط لو النسبة أكبر من أو تساوي 1، وهنا النسبة 0.25 فقط.
- ❌ **الخيار د):** هذا يشبه صيغة anti-join (1 - النسبة)، مو semi-join.

---

### السؤال 11 (صعب)

بنفس أرقام السؤال السابق (NDV(X,T1)=100، NDV(Y,T2)=25)، ما قيمة `js` لعملية **anti-join** (من استعلام `NOT IN`)؟

أ) 0.25
ب) 0.75
ج) 4
د) 1

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `js = 1 - MIN(1, NDV(T2.y)/NDV(T1.x)) = 1 - 0.25 = 0.75`.
- ❌ **الخيار أ):** هذي قيمة الـ semi-join، مو anti-join (نسيان الطرح من 1).
- ❌ **الخيار ج):** هذا نتيجة قسمة معكوسة خاطئة (100/25) غير مطابقة للصيغة.
- ❌ **الخيار د):** فقط لو النسبة الأصلية كانت صفر تماماً، غير صحيح هنا.

---

### السؤال 12 (متوسط)

كم عدد `left-deep join trees` الممكنة لاستعلام فيه **5 جداول**؟

أ) 5
ب) 25
ج) 120
د) 1680

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** عدد left-deep trees = N! = 5! = 120 (حسب الجدول بالمحاضرة).
- ❌ **الخيار أ):** هذا عدد الجداول نفسه، مو عدد التباديل.
- ❌ **الخيار ب):** حساب خاطئ (5² بدل 5!).
- ❌ **الخيار د):** هذا عدد الـ bushy trees الكامل لـ 5 جداول، مو left-deep.

---

### السؤال 13 (متوسط)

لماذا تُعتبر `left-deep trees` مفضلة عملياً على `bushy trees`؟

أ) لأن عددها أكبر فتعطي خيارات أكتر
ب) لأنها تتوافق مع خوارزميات join الشائعة وتسمح بـ fully pipelined plans
ج) لأنها الوحيدة اللي تعطي نتيجة صحيحة منطقياً
د) لأن حسابها أبطأ لكن أدق

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** left-deep trees تعمل بكفاءة مع خوارزميات زي nested-loop، وتسمح بمعالجة تدفقية (pipelined) للنتائج بدون تخزين وسيط ضخم.
- ❌ **الخيار أ):** بالعكس، عدد left-deep trees أقل من bushy trees لنفس عدد الجداول.
- ❌ **الخيار ج):** كل الأشكال (left-deep, right-deep, bushy) تعطي نتيجة صحيحة منطقياً — الفرق فقط بالتكلفة والتنفيذ.
- ❌ **الخيار د):** لا علاقة للتفضيل بسرعة الحساب أو الدقة، بل بالتوافق مع خوارزميات التنفيذ.

---

### السؤال 14 (صعب)

ما هو الدور الأساسي لـ `dynamic programming` بسياق الـ cost-based query optimization؟

أ) تجربة كل الأشجار الممكنة بترتيب عشوائي حتى نلقى الأرخص
ب) حل مسائل جزئية أصغر (join بين جدولين) وإعادة استخدام نتائجها لبناء حلول أكبر تدريجياً
ج) استبدال الحاجة لأي حسابات تكلفة بقواعد استكشافية ثابتة
د) حساب join selectivity فقط بدون النظر لترتيب الجداول

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** هذا جوهر dynamic programming — بناء الحل الأمثل بشكل تصاعدي (bottom-up) من حلول المسائل الفرعية الأصغر، بدون إعادة حساب مكرر.
- ❌ **الخيار أ):** هذا بالضبط اللي dynamic programming يتجنبه — التجربة العشوائية لكل الاحتمالات مكلفة جداً حسابياً.
- ❌ **الخيار ج):** dynamic programming هو نفسه cost-based approach، مو بديل عن heuristics بشكل كامل.
- ❌ **الخيار د):** ترتيب الجداول هو بالضبط ما يحاول dynamic programming تحسينه، مو تجاهله.

---

### السؤال 15 (متوسط) — يعتمد على مثال Q2

بمثال Q2، جدول PROJECT فيه 2000 صف، وعمود `Plocation` عنده `NDV=200`. تقريباً كم صف تتوقع بعد تطبيق شرط `Plocation='Stafford'`؟

أ) 2
ب) 10
ج) 100
د) 200

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `s = r/NDV = 2000/200 = 10` (بافتراض توزيع متساوي بدون histogram).
- ❌ **الخيار أ):** حساب خاطئ (200/100 مثلاً)، غير مطابق للأرقام المعطاة.
- ❌ **الخيار ج):** هذا لو قسمنا 2000 على 20 خطأ، مو على 200.
- ❌ **الخيار د):** هذا رقم NDV نفسه، مو selection cardinality.

---

### السؤال 16 (صعب) — يعتمد على مثال Q2

لماذا يُفضّل غالباً ترتيب join يبدأ بجدول PROJECT أولاً بمثال Q2؟

أ) لأن PROJECT مذكور أولاً بجملة FROM
ب) لأن شرط `Plocation='Stafford'` يقلل حجم PROJECT بشكل كبير قبل أي join، فيقلل تكلفة كل الـ joins اللاحقة
ج) لأن PROJECT أكبر جدول من ناحية عدد الصفوف
د) لأن الـ optimizer يحتاج يتبع ترتيب كتابة SQL دايماً

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** تقليل حجم أحد الجداول بدري (عبر selection قوي) يقلل بشكل مباشر حجم أي join تالي، وهذا يتماشى مع مبدأ heuristics أيضاً لكن مثبت هنا بالأرقام.
- ❌ **الخيار أ):** الـ optimizer لا يهتم بترتيب كتابة جملة FROM إطلاقاً — هذا خطأ شائع.
- ❌ **الخيار ج):** PROJECT (2000 صف) أصغر فعلياً من EMPLOYEE (10000 صف)، فهذا ليس السبب.
- ❌ **الخيار د):** الـ optimizer حر تماماً بإعادة الترتيب بغض النظر عن ترتيب SQL الأصلي.

---

## بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما الفرق الأساسي بين `heuristics-based` و`cost-based optimization`؟
**A:** الأول يستخدم قواعد عامة ثابتة (زي دفع selection قبل join)، والثاني يحسب أرقام فعلية (تكلفة) لكل استراتيجية ويقارنها.

### البطاقة 2
**Q2:** ما هي أهم 5 مكونات للتكلفة بتنفيذ استعلام؟
**A:** Access cost، Disk storage cost، Computation cost، Memory usage cost، Communication cost.

### البطاقة 3
**Q3:** ما الفرق بين `selectivity (sl)` و`selection cardinality (s)`؟
**A:** `sl` نسبة (0 إلى 1)، بينما `s = sl × r` هو عدد فعلي من الصفوف.

### البطاقة 4
**Q4:** لماذا يُستخدم `histogram` بدل حساب selectivity بسيط؟
**A:** لأن توزيع القيم بالواقع نادراً ما يكون متساوي، والـ histogram يعطي تقدير أدق بتسجيل عدد الصفوف بكل مجال قيم فعلياً.

### البطاقة 5
**Q5:** ما صيغة تكلفة `linear search` مع شرط مساواة على مفتاح (key)؟
**A:** `C_S1b = b/2` (بالمتوسط نفتش نص الملف).

### البطاقة 6
**Q6:** أي طريقة SELECT أرخص طريقة إطلاقاً لصف واحد؟
**A:** `S3b`: استخدام `hash key`، بتكلفة `C = 1`.

### البطاقة 7
**Q7:** لماذا `secondary index` (S6a) ممكن يكون مكلف جداً بحالات معينة؟
**A:** لأن البيانات غير مرتبة فيزيائياً حسب هذا العمود، فكل صف نتيجة قد يحتاج قراءة block منفصل — التكلفة تزيد بعدد النتائج نفسه (s).

### البطاقة 8
**Q8:** ما صيغة `join selectivity` البسيطة؟
**A:** `js = 1/max(NDV(A,R), NDV(B,S))`.

### البطاقة 9
**Q9:** متى تكون خوارزمية `sort-merge join` (J3) الأرخص؟
**A:** عندما يكون الجدولين مرتبين مسبقاً على عمود الـ join.

### البطاقة 10
**Q10:** ما الفرق بين صيغة `jc` للـ join العادي وصيغتها للـ semi-join/anti-join؟
**A:** الـ join العادي: `jc = js × |R| × |S|`. أما semi-join/anti-join: `jc = |T1| × js` فقط (لأن النتيجة صفوف من T1 فقط).

### البطاقة 11
**Q11:** ما هو `left-deep join tree`؟
**A:** شكل شجرة join حيث كل join جديد يضيف جدول واحد فقط على الطرف الأيسر بكل مرة، وهو الشكل المفضل عملياً.

### البطاقة 12
**Q12:** ما فائدة `dynamic programming` بتحسين ترتيب joins متعددة؟
**A:** يحل مسائل join الأصغر أول (بين جدولين) ويعيد استخدام نتائجها لبناء الحل الأمثل تصاعدياً، بدل تجربة كل الاحتمالات (اللي عددها factorial).

### البطاقة 13
**Q13:** بمثال Q2، ما الأرقام الأساسية من الـ catalog اللي نحتاجها لأي حساب تكلفة؟
**A:** عدد الصفوف (Num_rows)، عدد الـ blocks، عدد القيم المميزة (NDV) لكل عمود، ومعلومات الـ index (Blevel, Leaf_blocks, Distinct_keys).

### البطاقة 14
**Q14:** لماذا نطاق (scope) الـ cost-based optimization هو `query block` واحد فقط؟
**A:** لأن الحساب يتم على مستوى subexpression واحد بكل مرة؛ لو الاستعلام فيه أكتر من query block (subqueries)، يحتاج `global query optimization` يشمل كل الـ blocks مع بعض.

---

## ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة

| المصطلح | التعريف القصير |
| --- | --- |
| `selectivity (sl)` | نسبة (0-1) من الجدول تحقق شرط معين |
| `selection cardinality (s)` | عدد فعلي من الصفوف = sl × r |
| `NDV` | عدد القيم المميزة لعمود بجدول |
| `histogram` | جدول يسجل توزيع البيانات الفعلي (مو افتراض تساوي) |
| `join selectivity (js)` | نسبة حجم نتيجة join لحجم الـ cartesian product |
| `join cardinality (jc)` | عدد صفوف نتيجة join المتوقع |
| `left-deep tree` | شجرة join، كل جدول جديد يُضاف على اليسار — مفضلة عملياً |
| `bushy tree` | شجرة join غير خطية، joins متوازية |
| `dynamic programming` | حل تصاعدي (bottom-up) لمسائل جزئية، يقلل إعادة الحساب |

### 🔑 جداول المقارنة: صيغ SELECT

| الطريقة | الوصف | الصيغة |
| --- | --- | --- |
| S1a | Linear search، بدون شرط | C = b |
| S1b | Linear search، شرط مساواة على key | C = b/2 |
| S2 | Binary search (ملف مرتب) | C = log₂b + ⌈s/bfr⌉ - 1 |
| S3a | Primary index، صف واحد | C = x + 1 |
| S3b | Hash key، صف واحد | C = 1 |
| S4 | Ordering index، صفوف متعددة | C = x + b/2 |
| S5 | Clustering index، صفوف متعددة | C = x + ⌈s/bfr⌉ |
| S6a | Secondary index، أسوأ حالة | C = x + 1 + s |
| S6b | Secondary index، range query | C = x + b_I1/2 + r/2 |

### 🔑 جداول المقارنة: صيغ JOIN

| الخوارزمية | الصيغة (مختصرة) | متى تُستخدم |
| --- | --- | --- |
| J1 (nested-loop) | b_R + (b_R×b_S) + jc/bfr | بدون index أو ترتيب — الأبسط والأغلى غالباً |
| J2 (index-based nested-loop) | b_R + \|R\|×(x_B+1+s_B) + jc/bfr | فيه index جيد على عمود الـ join بـ S |
| J3 (sort-merge) | b_R + b_S + jc/bfr | الجدولين مرتبين مسبقاً على عمود الـ join |
| J4 (partition-hash) | 3×(b_R+b_S) + jc/bfr | بدون ترتيب أو index مناسب |

### 🔑 المكونات والأدوات

| الأداة | الوظيفة | متى تستخدم |
| --- | --- | --- |
| DBMS Catalog | تخزين إحصائيات (rows, blocks, NDV) | مصدر كل الحسابات |
| Histogram | توزيع دقيق للقيم | تقدير selectivity أدق للأعمدة المهمة |
| Left-deep tree | ترتيب joins متسلسل | التفضيل الافتراضي عملياً |
| Dynamic programming | حل تصاعدي لترتيب joins | تقليل التعقيد الحسابي لعدد كبير من الجداول |

### 🔑 قواعس ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | `access cost` (قراءة القرص) هو المكوّن الأهم بمعظم حسابات التكلفة |
| 2 | `s = sl × r` — احفظها، هي أساس كل صيغة SELECT |
| 3 | `jc = js × |R| × |S|` للـ join العادي، لكن `jc = |T1| × js` للـ semi/anti-join |
| 4 | `secondary index` ممكن يكون أغلى من full scan لو عدد النتائج كبير |
| 5 | `sort-merge join` أرخص فقط إذا الجدولين مرتبين مسبقاً وإلا لازم إضافة تكلفة الفرز |
| 6 | `left-deep trees` مفضلة عملياً لأنها تدعم `fully pipelined plans` |
| 7 | عدد أشجار الـ join يكبر بشكل factorial — لهذا نحتاج `dynamic programming` |
| 8 | الـ optimizer حر بإعادة ترتيب الجداول بغض النظر عن ترتيب كتابتها بـ SQL |

### 🔑 قاموس المصطلحات

| المصطلح | المعنى |
| --- | --- |
| `blocking factor (bfr)` | عدد الصفوف بكل block |
| `x` | عدد مستويات الـ index |
| `b_I1` | عدد blocks المستوى الأول للـ index |
| `Blevel` | عدد مستويات الـ index بدون leaf level (بمصطلح catalog) |
| `unnesting` | تحويل subquery متداخل لجملة join مسطحة |
| `semi-join` | join ينتج عن `IN` subquery |
| `anti-join` | join ينتج عن `NOT IN` subquery |

### 🔑 الخطوات السريعة

#### حساب تكلفة SELECT بسيط
```algorithm
1 | حدد نوع الوصول المتاح | Catalog (index موجود؟ مرتب؟) | نعرف أي صيغة (S1-S6) تنطبق
2 | احسب s = sl × r | Selectivity من الـ catalog أو histogram | selection cardinality
3 | طبّق الصيغة المناسبة | صيغة S1 إلى S6 | التكلفة النهائية بعدد block accesses
```

#### تقييم ترتيب joins متعددة
```algorithm
1 | حدد js وjc لكل زوج joins محتمل | NDV من الـ catalog | حجم النتيجة المتوقع لكل خطوة
2 | احسب تكلفة كل خوارزمية ممكنة (J1-J4) | صيغ الـ join | تكلفة رقمية لكل بديل
3 | كرر تصاعدياً لكل ترتيب left-deep ممكن | Dynamic programming | أرخص خطة تنفيذ كاملة
```

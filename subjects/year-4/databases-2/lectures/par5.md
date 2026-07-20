# المحاضرة — تحسين الاستعلامات: المنهج الاستكشافي (Heuristics-Based Approach)
> **المادة:** Database-2 (DBMS — Query Processing & Optimization) | **الموضوع:** Query Optimization باستخدام `Heuristics`

---

## الجزء الأول: ملخص شامل (لكل من تعب أو ما يركز)

**1. الفكرة الأساسية (جملة واحدة)**
المحاضرة تشرح كيف يأخذ الـ `DBMS` استعلام `SQL` ويحوّله لشكل تنفيذي أسرع، عن طريق تمثيله كـ `query tree` وتطبيق قواعد استكشافية (`heuristics`) عليه — أهمها "خلّي الفلترة والاختيار قبل الـ join".

**2. ليش يهمك؟**
لو ما فيه تحسين، أي استعلام فيه `join` بين جداول كبيرة رح يعمل `cartesian product` ضخم قبل ما يفلتر النتائج — هذا بطيء جداً. فهمك لهذا الموضوع يفيدك في تصميم استعلامات أسرع، وفي فهم ليش بعض الاستعلامات بطيئة رغم إنها منطقياً صح. وبالامتحان، هاد الموضوع من المواضيع اللي بيجي فيها سؤال تطبيقي (حوّل query لـ query tree وحسّنه).

**3. إيش تحتاج تعرفه قبل البداية**
تحتاج تعرف `Relational Algebra` (σ selection، π projection، ⨝ join، × cartesian product) وأساسيات `SQL` (`SELECT/FROM/WHERE`)، وفكرة عامة عن بنية الـ `DBMS`.

**4. اشرح الأفكار الرئيسية**

فيه طريقتين لتحسين الاستعلام: `Heuristics-based optimization` اللي يطبّق قواعد ثابتة (زي "افلتر بدري")، و `Cost-based optimization` اللي يحسب تكلفة كل خطة تنفيذ ممكنة ويختار الأرخص. المحاضرة تركز على الأولى.

فكّر إن الـ `DBMS` أول ما يستقبل الاستعلام، الـ `scanner and parser` يحوّله لتمثيل داخلي أوّلي (شجرة). هالشجرة الأولية سيئة جداً من ناحية الأداء — لأنها بتعمل كل الـ `joins` (أو حتى `cartesian products`) الأول، وبعدين تفلتر. تخيل إنك تطبخ أكل لعشرين شخص وبعدين تكتشف بس ثلاثة رح ياكلوا — ضيّعت وقت وموارد. فـ الـ `optimizer` يجي ويعيد ترتيب هالشجرة.

الـ `query tree` هو رسمة بتمثل الاستعلام: الأوراق (`leaves`) هي الجداول، والعُقد الداخلية هي العمليات (`σ`, `π`, `⨝`)، والجذر هو النتيجة النهائية. التنفيذ يبدأ من تحت (الأوراق) ويطلع لفوق. مقابلها فيه `query graph` اللي يمثل `relational calculus` بدل `relational algebra` — بس الفرق المهم: الـ `query graph` ما فيه ترتيب واحد محدد للعمليات (لأنه غير موجّه)، بينما الـ `query tree` بيمثل ترتيب تنفيذ محدد، ولهذا هو المفضّل عملياً.

القاعدة الاستكشافية الأهم: **طبّق `SELECT` و `PROJECT` قبل `JOIN`**. ليش؟ لأن الـ `selection` والـ `projection` بيقلّلوا عدد الصفوف (`tuples`) والأعمدة (`attributes`) اللي رح تدخل على الـ `join` — يعني الجدول اللي رح يتضرب بجدول تاني يصير أصغر بكثير، فالـ `join` نفسه أسرع.

فيه أربع قواعد تحويل جبرية أساسية بتستخدم لإعادة ترتيب الشجرة:
- **Cascade of σ**: شرط `AND` مركّب ممكن تفكّه لسلسلة من عمليات `σ` منفصلة، كل وحدة تطبّق شرط واحد.
- **Commutativity of σ**: ترتيب شرطين `σ` فوق بعض ما يهم، تقدر تبدّلهم.
- **Cascade of π**: لو عندك سلسلة `π` فوق بعض، بس آخر وحدة (الأخيرة اللي فوق) هي اللي مهمة، الباقي إضافي.
- **Commuting σ with π**: تقدر تبدّل ترتيب `σ` و `π` إذا شرط الـ `σ` بيعتمد بس على أعمدة موجودة أصلاً بقائمة الـ `π`.

هالقواعد هي اللي بتخلي الـ `optimizer` "يدفع" عمليات الـ `σ` لتحت (قريب من الجداول الأساسية) بدل ما تضل فوق الشجرة.

مثال المحاضرة (استعلام Q2: PROJECT ⨝ DEPARTMENT ⨝ EMPLOYEE مع شرط `location='Stafford'`) بيوريك الفرق: الشجرة الأولية (canonical) بتعمل `cartesian product` لثلاث جداول كاملة وبعدين تفلتر فوق — سيئة جداً. الشجرة المحسّنة تطبّق كل `σ` قريب من الجدول اللي يخصه (زي فلترة PROJECT على location قبل أي join)، وبعدين تستبدل `× + σ` بعملية `⨝` مباشرة (join)، وهاد أرخص بكثير.

بعد الـ `join order`، فيه خطوة اختيار **خطة التنفيذ الفعلية** (`Query Execution Plan`) — يعني كيف نتيجة كل عملية تنتقل للي بعدها. فيه طريقتين: `Materialized evaluation` (نتيجة كل خطوة تنخزن مؤقتاً كجدول وسيط) و `Pipelined evaluation` (النتيجة تمرّر مباشرة للعملية اللي بعدها من غير ما تنخزن). الـ `pipelined` عادة أسرع لأنه ما فيه كتابة/قراءة وسيطة.

فيه كمان تحسين خاص بالاستعلامات المتداخلة (`Nested Subqueries`). لو عندك subquery جوه `WHERE` (مثلاً `EXISTS` أو `IN`)، ممكن الـ `optimizer` "يفكّها" ويحوّلها لاستعلام واحد فيه join بدل subquery منفصلة — هاد اسمه `Unnesting`. لو الـ subquery مرتبطة بالـ outer query (`correlated`)، ممكن تتحول لـ `semi-join`. الفكرة: تنفيذ subquery لكل صف بالـ outer query (nested loop) أبطأ بكثير من دمجهم بـ join واحد.

نفس الفكرة تنطبق على الـ `views` بالـ `FROM` clause (يسمى `inline view`) — الـ optimizer يقدر "يدمج" (`view merging`) جداول الـ view مع جداول الاستعلام الخارجي بدل ما يعاملهم كوحدتين منفصلتين. لو الـ view فيها `GROUP BY`، القرار (`Group-By view-merging`) بيعتمد على التكلفة: هل أرخص تعمل الـ `GROUP BY` بدري (يقلل حجم البيانات قبل الـ joins) ولا متأخر (لو الـ joins نفسها فلترت كتير)؟

آخر شيء: `Materialized Views` — يعني تخزين نتيجة query (اللي عادة view يحسبه من الصفر كل مرة) بشكل فعلي على القرص، عشان لما تحتاجه تقراه جاهز بدل ما تعيد حسابه. المشكلة: لما الجداول الأصلية تتغيّر، الـ view المخزّن يصير قديم — فهنا يجي دور `Incremental View Maintenance`: بدل ما تعيد حساب الـ view كامل من الصفر، تحدّثه بس بالتغييرات (`insert`/`delete`) اللي صارت على الجداول الأساسية، وهذا أرخص بكثير من إعادة الحساب الكامل.

**5. الأخطاء الشائعة**

#### الفهم الخاطئ ❌:
كثير طلاب يعتقدون إن `query tree` و `query graph` نفس الشي بس شكل مختلف.

#### الفهم الصحيح ✅:
`query tree` يمثل `relational algebra expression` وله ترتيب تنفيذ محدد (شجرة موجّهة)، بينما `query graph` يمثل `relational calculus expression` وما فيه ترتيب تنفيذ واحد محدد — ولهذا الـ `query tree` هو اللي الـ DBMS يستخدمه فعلياً للتنفيذ.

---

#### الفهم الخاطئ ❌:
الطالب يفكر إن تطبيق `SELECT` بدري معناه بس "أسرع لأنه أقل خطوات".

#### الفهم الصحيح ✅:
السبب الحقيقي هو تقليل **حجم البيانات الوسيطة** (`intermediate results`) اللي رح تدخل على الـ `join`. كل ما صغّرت الجدول قبل الـ join، كل ما الـ join نفسه أرخص — مو لأن فيه "خطوات أقل" بشكل عام.

---

#### الفهم الخاطئ ❌:
الطالب يظن إن `Unnesting` معناها حذف الـ subquery وخلاص.

#### الفهم الصحيح ✅:
`Unnesting` معناها **إعادة صياغة** الاستعلام المتداخل كاستعلام واحد بـ `join` (أو `semi-join`) بدل تنفيذه كـ subquery منفصلة لكل صف بالـ outer query — النتيجة نفس الشي بس أسرع.

**6. إيش اللي بيطلع في الامتحان**
الدكتور غالباً بيجيب استعلام `SQL` (زي Q2) ويطلب منك ترسم الـ `query tree` الأولي وبعدين تطبّق قواعد التحويل خطوة بخطوة وصولاً للشجرة المحسّنة. كمان ممكن يسأل عن الفرق بين `materialized` و `pipelined evaluation`، أو يعطيك `nested query` ويطلب `unnesting`.

**7. الربط مع الموضوع اللي جاي بعده**
هالمحاضرة أساس لموضوع `Cost-Based Optimization` اللي جاي بعدها — لأن بعد ما تعرف تبني شجرة استعلام محسّنة بالـ heuristics، الخطوة التالية إنك تختار من بين عدة شجرات محسّنة الأرخص فعلياً باستخدام تقديرات التكلفة (`cost estimation`).

---

## الجزء الثاني: الشرح التفصيلي

### 1. المقدمة والاستراتيجيات

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

#### 📍 أين نحن الآن؟
هذا أول قسم بالمحاضرة — بيعرّف مفهوم `query optimization` بشكل عام قبل الدخول بالتفاصيل.

#### ⬅️ الربط مع السابق
هذا أول موضوع بالمحاضرة، بيبني على معرفتك بـ `SQL` و `Relational Algebra` من محاضرات سابقة.

#### 💡 الفكرة الأساسية
**`Query Optimization` هي عملية يقوم بها الـ `query optimizer` داخل الـ `DBMS` لاختيار أفضل استراتيجية متاحة لتنفيذ استعلام معيّن.**

---

#### 📖 الشرح
لما تكتب استعلام `SQL`، أنت بتقول *إيش* تبي (النتيجة)، بس ما بتحدد *كيف* الـ DBMS رح يوصلها. هذا الفرق بين اللغات "الوصفية" (`declarative`) زي `SQL` وبين لغات برمجة عادية. فالمهمة تروح للـ `query optimizer`: يقرر أفضل طريقة تنفيذ، بناءً على المعلومات المتوفرة عنده (إحصائيات الجداول، الفهارس `indexes`، حجم البيانات...).

أغلب أنظمة قواعد البيانات العلائقية (`RDBMS`) تستخدم **شجرة** (`tree`) كتمثيل داخلي للاستعلام — لأن الشجرة بطبيعتها بتعكس ترتيب تنفيذ العمليات (من تحت لفوق)، وهذا يسهّل على الـ optimizer إنه "يعيد ترتيب" العمليات بمجرد ما يعيد ترتيب أو تعديل الشجرة.

فيه استراتيجيتين رئيسيتين للتحسين:
- **Heuristics-based optimization**: يطبّق قواعد استكشافية ثابتة (`rules of thumb`) لتعديل التمثيل الداخلي للاستعلام والوصول لتمثيل محسّن — بدون ما يحسب تكلفة فعلية.
- **Cost-based optimization**: يستخدم تقنيات بحث تقليدية (`search techniques`) تفحص مساحة الحلول الممكنة للمشكلة، وتختار الحل اللي يقلل دالة تكلفة (`cost function`) معيّنة.

#### 🎯 الملخص السريع
- هدف الـ optimizer: اختيار أفضل استراتيجية تنفيذ متاحة.
- أغلب RDBMS تستخدم `tree` كتمثيل داخلي.
- فيه نوعين: `Heuristics-based` (قواعد ثابتة) و `Cost-based` (حساب تكلفة).

#### 📚 التطبيق
هذا التمييز بيحدد باقي المحاضرة كاملة — لأنها بتركز فقط على المنهج الاستكشافي، بينما الـ `cost-based` بيجي كموضوع منفصل لاحقاً.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
البعض يظن إن الـ `heuristics-based` و `cost-based` نفس الشي أو بديل كامل عن بعض.

#### الفهم الصحيح ✅:
أنظمة قواعد البيانات الحقيقية عادة تستخدم الاثنين مع بعض: تطبّق القواعد الاستكشافية الأول لتقليل عدد الخيارات، وبعدين تستخدم تقدير التكلفة لاختيار الأفضل من بين الخيارات المتبقية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Query optimization: Conducted by a query optimizer in a DBMS. Goal: select best available strategy for executing query, based on information available. Most RDBMSs use a tree as the internal representation of a query. Query Optimization Strategies: Heuristics-based optimization — applies heuristic rules to modify the internal representation of a query in order to get the optimized query representation. Cost-based optimization — uses traditional optimization techniques that search the solution space to a problem for a solution that minimizes an objective (cost) function.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف query optimization، الاستراتيجيتين، ليش الشجرة هي التمثيل المفضّل
- ℹ️ إضافة من الدليل: تشبيه SQL كلغة وصفية وليست إجرائية

</details>

---

### 2. أشجار الاستعلام والاستكشاف (Query Trees and Heuristics)

<!-- @render: {type: "diagram-first", visualization: "tree", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
هنا بنفهم كيف الـ DBMS يبني الشجرة الأولية للاستعلام، وكيف يستخدمها للوصول لخطة تنفيذ.

#### ⬅️ الربط مع السابق
بعد ما عرفنا إن الشجرة هي التمثيل الداخلي، هلأ بنشوف بالضبط كيف تُبنى وتُستخدم.

#### 💡 الفكرة الأساسية
**عملية التحسين تمر بثلاث خطوات: توليد شجرة أولية، تحسينها بالقواعد الاستكشافية، ثم بناء خطة تنفيذ فعلية.**

#### 📊 المخطط

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | π P.Pnumber,P.Dnum,E.Lname,E.Address,E.Bdate | projection | تحديد الأعمدة النهائية المطلوبة |
| 2 | ⨝ D.Mgr_ssn=E.Ssn | join | ربط نتيجة الخطوة السابقة مع EMPLOYEE |
| 3 | ⨝ P.Dnum=D.Dnumber | join | ربط PROJECT (بعد الفلترة) مع DEPARTMENT |
| 4 | σ P.Plocation='Stafford' | selection | فلترة جدول PROJECT بدري |
| 5 | PROJECT / DEPARTMENT / EMPLOYEE | base table | الجداول الأساسية (leaves) |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| PROJECT | σ Plocation='Stafford' | مدخل | تسلسل | فلترة PROJECT فوراً |
| σ | ⨝ Dnum=Dnumber | مدخل يسار | تسلسل | نتيجة الفلترة تدخل الـ join الأول |
| DEPARTMENT | ⨝ Dnum=Dnumber | مدخل يمين | تسلسل | الجدول كامل بلا فلترة |
| ⨝ (1) | ⨝ Mgr_ssn=Ssn | مدخل يسار | تسلسل | نتيجة join الأول تدخل join الثاني |
| EMPLOYEE | ⨝ Mgr_ssn=Ssn | مدخل يمين | تسلسل | |
| ⨝ (2) | π | مدخل | تسلسل | آخر خطوة: اختيار الأعمدة |

#### 📖 الشرح
عملية التحسين الاستكشافي بتمر بثلاث خطوات: **الخطوة 1** — الـ `scanner and parser` (جزء من الـ DBMS يقرأ نص الـ SQL) يولّد تمثيل أولي للاستعلام (شجرة أو رسم بياني). **الخطوة 2** — هالتمثيل الأولي يتحسّن حسب قواعد استكشافية (زي دفع الـ selection لتحت). **الخطوة 3** — بعد التحسين، تُبنى خطة تنفيذ فعلية (`query execution plan`)، تحدد كيف تُنفَّذ مجموعات العمليات بناءً على مسارات الوصول (`access paths`) المتاحة والملفات المعنية.

القاعدة الاستكشافية المثالية: **طبّق `SELECT` و `PROJECT` قبل `JOIN`** — لأنها بتقلل حجم الملفات اللي رح تنضم لبعضها.

بالنسبة للتمثيلات: `query tree` يمثل تعبير `relational algebra`، بينما `query graph` يمثل تعبير `relational calculus`. المثال الموضّح فوق هو الشجرة **النهائية المحسّنة** لاستعلام Q2 (الفلترة صارت أول شي على PROJECT قبل أي join)، وهذا يوضح كيف يبان شكل الحل المطلوب الوصول له.

#### 🎯 الملخص السريع
- 3 خطوات: توليد → تحسين استكشافي → خطة تنفيذ.
- القاعدة الذهبية: `SELECT` و `PROJECT` قبل `JOIN`.
- `query tree` = `relational algebra`, `query graph` = `relational calculus`.

#### 📚 التطبيق
هالتسلسل (Steps 1-3) هو الإطار العام اللي كل الأمثلة الجاية بالمحاضرة (Q2 والاستعلام الآخر) بتشتغل جواه.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يفكر إن الـ optimizer "يحل" الاستعلام من الصفر بطريقة جديدة كل مرة.

#### الفهم الصحيح ✅:
الـ optimizer ياخذ نفس الشجرة الأولية (اللي منطقياً بتعطي نفس النتيجة) ويعيد **ترتيبها/تحويلها** بقواعد محددة — النتيجة النهائية (البيانات) ما بتتغير، بس طريقة الوصول لها بتصير أسرع.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Step 1: scanner and parser generate initial query representation. Step 2: representation is optimized according to heuristic rules. Step 3: query execution plan is developed — execute groups of operations based on access paths available and files involved. Example heuristic rule: Apply SELECT and PROJECT before JOIN — reduces size of files to be joined. Query tree represents relational algebra expression. Query graph represents relational calculus expression. Query tree represents a specific order of operations for executing a query — preferred to query graph for this reason. Query graph: relation nodes displayed as single circles, constants represented by constant nodes (double circles or ovals), selection or join conditions represented as edges, attributes to be retrieved displayed in square brackets.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الخطوات الثلاث، القاعدة الاستكشافية المثالية، الفرق بين query tree و query graph
- ℹ️ إضافة من الدليل: المخطط أعلاه يمثل الشجرة النهائية المحسّنة لـ Q2 كتوضيح تطبيقي

</details>

---

### 3. تحويل الشجرة بالتحسين الاستكشافي (مثال Q2 و Q)

<!-- @render: {type: "diagram-first", visualization: "tree", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### 📍 أين نحن الآن؟
هنا بنشوف بالتفصيل، خطوة بخطوة، كيف تتحول الشجرة الأولية (السيئة) للشجرة المحسّنة — عبر مثال Q (EMPLOYEE, WORKS_ON, PROJECT).

#### ⬅️ الربط مع السابق
هذا تطبيق عملي مباشر للخطوة 2 من القسم السابق (التحسين حسب القواعد الاستكشافية).

#### 💡 الفكرة الأساسية
**فيه أكثر من شجرة ممكن تمثّل نفس الاستعلام وتعطي نفس النتيجة — لكن بعضها أبطأ بكثير من بعض، والـ optimizer يحوّل الشجرة السيئة (الأولية) للشجرة الجيدة (المحسّنة) خطوة بخطوة.**

---

#### 🔄 قبل / بعد: تحويل شجرة الاستعلام

**الاستعلام Q:**
```sql
-- Find last name of employees born after 1957 who work on project "Aquarius"
SELECT E.Lname
FROM EMPLOYEE E, WORKS_ON W, PROJECT P
WHERE P.Pname = 'Aquarius' AND P.Pnumber = W.Pno
  AND E.Essn = W.Ssn AND E.Bdate > '1957-12-31';
```

**(a) الشجرة الأولية (Canonical):** أعلى الشجرة `π Lname` وتحتها `σ` واحدة كبيرة فيها **كل** الشروط مع بعض (`Pname='Aquarius' AND Pnumber=Pno AND Essn=Ssn AND Bdate>'1957-12-31'`)، وتحتها `×` (cartesian product) بين EMPLOYEE و WORKS_ON، وبعدين `×` تانية مع PROJECT. **مشكلتها:** تعمل ضرب كارتيزي لثلاث جداول كاملة قبل أي فلترة — حجم البيانات الوسيطة ضخم جداً.

**(b) تفكيك الـ σ ودفعها لتحت (Cascade + إنزال):** الشرط الكبير يتفكك لأربع عمليات `σ` منفصلة (بقاعدة `Cascade of σ`)، وكل وحدة تنزل لأقرب مكان ممكن لها: `σ Bdate>'1957-12-31'` تنزل مباشرة فوق EMPLOYEE، و `σ Pname='Aquarius'` تنزل فوق PROJECT، بينما `σ Essn=Ssn` و `σ Pnumber=Pno` تضلوا فوق نقاط الـ `×` (لأنها شروط تربط جدولين، مو جدول واحد).

**(c) تطبيق الشرط الأكثر تقييداً أول (More restrictive selection first):** الترتيب يتغيّر بحيث الشرط اللي بيقلل البيانات أكثر يتنفذ الأول — هون تصير `σ Essn=Ssn` (اللي بتضم EMPLOYEE المفلترة مع WORKS_ON) هي الأعلى، وتحتها فرعين: فرع PROJECT المفلتر (`Pname='Aquarius'`) مضموم لـ WORKS_ON بشرط `Pnumber=Pno`، وفرع EMPLOYEE المفلتر (`Bdate>...`) لحاله.

**(d) استبدال `× + σ` بعملية `⨝` مباشرة:** كل زوج `Cartesian product` متبوع بـ `selection` على شرط ربط، ينضغط لعملية `join (⨝)` واحدة — وهذا أرخص تنفيذياً لأن الـ DBMS عنده خوارزميات join مخصصة (زي hash join) أسرع بكثير من ضرب كامل ثم فلترة.

**(e) دفع الـ `π` (projection) لتحت كمان:** بالإضافة لـ `σ`، حتى عمليات `π` تنزل لتحت — يعني بدل ما ناخذ كل أعمدة WORKS_ON مثلاً ونضمها، ناخذ بس الأعمدة اللي محتاجينها فعلاً (`Essn, Pno`) من البداية. هذا يقلل حجم الصفوف الوسيطة (مو بس عددها) أكتر.

**ماذا تغيّر؟** من ضرب كارتيزي كامل لثلاث جداول ثم فلترة، إلى: فلترة كل جدول لحاله بأصغر شرط ممكن، ثم joins مباشرة بترتيب يبدأ بالأكثر تقييداً، مع تقليص الأعمدة لأقل قدر ممكن من البداية.

#### 🎯 الملخص السريع
- فيه أكثر من `query tree` صحيح لنفس الاستعلام، بس مو كلها بنفس الكفاءة.
- الشجرة الأولية (canonical) غير كفؤة أبداً ولن تُنفَّذ كما هي.
- التحويل يمر بـ: تفكيك σ → إنزالها لأقرب موضع → تنفيذ الأكثر تقييداً أول → دمج ×+σ إلى ⨝ → إنزال π كمان.

#### 📚 التطبيق
هالخطوات بالضبط هي اللي الـ optimizer يطبّقها آلياً على أي استعلام فيه joins متعددة — نفس الفكرة استُخدمت مع Q2 بالقسم اللي قبله.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
البعض يعتقد إن ترتيب تفكيك وإنزال الـ σ عشوائي.

#### الفهم الصحيح ✅:
كل شرط `σ` ينزل لأقرب عقدة ممكنة تحتوي كل الأعمدة اللي الشرط يحتاجها — لو الشرط يخص جدول واحد بس، ينزل لفوق ذاك الجدول مباشرة؛ لو يربط جدولين، يضل فوق نقطة اتصالهم (الـ join/product بينهم).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> Many different query trees can be used to represent the query and get the same results. Figure b shows initial tree for Q2 — very inefficient, will never be executed. Optimizer will transform into equivalent final query tree. Query Transformation Example: Q: SELECT E.Lname FROM EMPLOYEE E, WORKS_ON W, PROJECT P WHERE P.Pname='Aquarius' AND P.Pnumber=W.Pno AND E.Essn=W.Ssn AND E.Bdate>'1957-12-31'. Steps: (a) Initial (canonical) query tree. (b) Moving SELECT operations down the query tree. (c) Applying the more restrictive SELECT operation first. (d) Replacing CARTESIAN PRODUCT and SELECT with JOIN operations. (e) Moving PROJECT operations down the query tree.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل الخطوات الخمس (a-e) لاستعلام Q
- ⚠️ غير مشروح بتفصيل رسمي: الرسم البصري الدقيق لكل خطوة (تم وصفه نصياً بدل رسم منفصل لكل خطوة توفيراً للمساحة)
- ℹ️ إضافة من الدليل: تشبيه "الأكثر تقييداً أول" بمنطق تقليل البيانات

</details>

---

### 4. القواعد العامة لتحويل عمليات الجبر العلائقي

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
هنا بنشوف القواعد الرسمية (الرياضية) اللي بررت خطوات التحويل اللي شفناها بالمثال السابق.

#### ⬅️ الربط مع السابق
هالقواعد هي "القانون" اللي يسمح بخطوات (b) و (c) بالمثال السابق (تفكيك σ، تبديل ترتيبها، دفع π).

#### 💡 الفكرة الأساسية
**فيه أربع قواعد رياضية أساسية تسمح للـ optimizer بإعادة ترتيب عمليات الـ selection والـ projection بأمان (بدون ما يغيّر النتيجة).**

---

#### 📖 الشرح

**Cascade of σ (تسلسل الـ selection):**
$$
\sigma_{c1 \, AND \, c2 \, AND \, ... \, AND \, cn}(R) = \sigma_{c1} (\sigma_{c2} (...(\sigma_{cn}(R))...))
$$
شرط `AND` مركّب من عدة شروط فرعية ممكن تفكّه لسلسلة من عمليات `σ` منفصلة، كل وحدة تطبّق شرط واحد بس. هذا هو اللي سمح بتفكيك الشرط الكبير بخطوة (b) بالمثال السابق.

**Commutativity of σ (تبديل ترتيب الـ selection):**
$$
\sigma_{c1} (\sigma_{c2}(R)) = \sigma_{c2} (\sigma_{c1}(R))
$$
ترتيب تطبيق شرطين `σ` فوق بعض ما يأثر بالنتيجة — تقدر تبدّل أيهم يجي أول. هذا اللي سمح بترتيب "الأكثر تقييداً أول" بخطوة (c).

**Cascade of π (تسلسل الـ projection):**
$$
\pi_{List1} (\pi_{List2} (...(\pi_{Listn}(R))...)) = \pi_{List1}(R)
$$
لو عندك سلسلة عمليات `π` فوق بعض، بس آخر وحدة (الأعلى، `List1`) هي اللي فعلياً بتحدد الأعمدة النهائية — الباقيات إضافيات ممكن تجاهلهم منطقياً.

**Commuting σ with π (تبديل σ مع π):**
$$
\pi_{A1, A2, ..., An} (\sigma_{c} (R)) = \sigma_{c} (\pi_{A1, A2, ..., An} (R))
$$
تقدر تبدّل ترتيب `σ` و `π` — **بس بشرط**: كل الأعمدة اللي شرط الـ `σ` يعتمد عليها لازم تكون موجودة أصلاً بقائمة أعمدة الـ `π`. لو الشرط يستخدم عمود مو موجود بقائمة الـ projection، ما تقدر تبدّل (لأنك رح تخسر العمود قبل ما تفلتر عليه).

#### 🎯 الملخص السريع
- 4 قواعد: Cascade of σ، Commutativity of σ، Cascade of π، Commuting σ with π.
- هذي القواعد هي "الترخيص الرياضي" اللي يسمح بإعادة ترتيب الشجرة بأمان.
- شرط تبديل σ مع π: أعمدة شرط الـ σ لازم تكون بقائمة الـ π.

#### 📚 التطبيق
هالقواعد الأربع تُطبَّق فعلياً بكل مثال تحويل شجرة استعلام بالمحاضرة — هي "الأدوات" اللي الـ optimizer يستخدمها.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يفكر إنه يقدر يبدّل `σ` مع `π` بأي وقت.

#### الفهم الصحيح ✅:
التبديل مسموح **فقط** إذا كل أعمدة شرط الـ `σ` موجودة أصلاً ضمن قائمة أعمدة الـ `π` — وإلا، لازم تطبّق الـ `σ` قبل ما تصغّر الأعمدة بالـ `π`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Some transformation rules useful in QO: Cascade of σ — conjunctive selection condition can be broken up into a cascade (sequence) of individual σ operations. σc1 AND c2 AND ... AND cn(R) = σc1 (σc2 (...(σcn(R))...)). Commutativity of σ — σc1(σc2(R)) = σc2(σc1(R)). Cascade of π — in a sequence of π operations, all but the last one can be ignored. πList1(πList2(...(πListn(R))...)) = πList1(R). Commuting σ with π — if the selection condition involves only attributes in the projection list. πA1,A2,...,An(σc(R)) = σc(πA1,A2,...,An(R)).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل القواعد الأربع مع الصيغ الرياضية والشرط الخاص بتبديل σ مع π

</details>

---

### 5. ملخص القواعد الاستكشافية للتحسين الجبري

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن الآن؟
خلاصة عملية تجمع كل قواعد الأقسام السابقة بقاعدتين ذهبيتين.

#### ⬅️ الربط مع السابق
هذي خلاصة مباشرة لكل الأمثلة والقواعد اللي شرحناها بالأقسام 2-4.

#### 💡 الفكرة الأساسية
**القاعدة الذهبية: طبّق العمليات اللي تقلل حجم النتائج الوسيطة بأبكر وقت ممكن، وابدأ بالعمليات الأكثر تقييداً.**

---

#### 📖 الشرح
كل قواعد التحسين الاستكشافي تلخّص بقاعدتين عمليتين: (1) نفّذ عمليات `SELECT` و `PROJECT` بأبكر وقت ممكن، عشان تقلل عدد الصفوف (`tuples`) والأعمدة (`attributes`) اللي رح تنتقل للعمليات اللي بعدها. (2) من بين عمليات `SELECT` و `JOIN` المتاحة، نفّذ الأكثر تقييداً (اللي بتحذف أكبر عدد من الصفوف) أول.

#### 🎯 الملخص السريع
- نفّذ `SELECT`/`PROJECT` بدري.
- نفّذ الأكثر تقييداً من `SELECT`/`JOIN` أول.

#### 📚 التطبيق
هالخلاصة هي المعيار اللي الـ optimizer يقيس عليه أي شجرة تحويل "أفضل" من غيرها.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
"الأكثر تقييداً" يعني بس "أقل عدد سطور بالكود".

#### الفهم الصحيح ✅:
"الأكثر تقييداً" يعني الشرط اللي بيحذف أكبر **نسبة** من الصفوف (أعلى `selectivity`)، بغض النظر عن شكل الكود.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Apply first the operations that reduce the size of intermediate results. Perform SELECT and PROJECT operations as early as possible to reduce the number of tuples and attributes. The SELECT and JOIN operations that are most restrictive should be executed before other similar operations.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: القاعدتين الرئيسيتين

</details>

---

### 6. اختيار خطة تنفيذ الاستعلام (Materialized vs Pipelined)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن الآن؟
بعد ما رتبنا الشجرة، السؤال التالي: كيف بالضبط تنتقل النتائج بين عمليات الشجرة أثناء التنفيذ الفعلي؟

#### ⬅️ الربط مع السابق
هذا هو "الخطوة 3" اللي ذكرناها بالقسم 2 (بناء خطة تنفيذ فعلية بعد التحسين).

#### 💡 الفكرة الأساسية
**فيه طريقتين لتمرير نتيجة عملية للعملية اللي بعدها بالشجرة: تخزينها مؤقتاً (`Materialized`) أو تمريرها مباشرة (`Pipelined`).**

#### ⚖️ المقايضة: Materialized vs Pipelined

| | Materialized evaluation | Pipelined evaluation |
| --- | --- | --- |
| **الوصف** | نتيجة العملية تُخزَّن كجدول مؤقت كامل | نتيجة العملية تُمرَّر مباشرة للعملية التالية بدون تخزين كامل |
| **المزايا** | سهل تطبيقه، النتيجة الوسيطة متاحة كاملة لو احتجتها مرة ثانية | أسرع عادة، يوفر قراءة/كتابة على القرص |
| **العيوب** | استهلاك وقت وذاكرة/قرص لتخزين نتائج وسيطة | أصعب تطبيقاً، النتيجة الوسيطة الكاملة مو متاحة لوحدها |

#### 📖 الشرح
**Materialized evaluation**: نتيجة كل عملية بالشجرة تُحسب كاملة وتُخزَّن كعلاقة (جدول) مؤقتة على القرص أو بالذاكرة، وبعدين العملية التالية تقرأها كمدخل. **Pipelined evaluation**: نتائج كل عملية تُمرَّر مباشرة (سطر سطر أو دفعة دفعة) للعملية التالية بالتسلسل، بدون ما تُخزَّن كاملة كجدول وسيط منفصل — زي خط أنابيب (pipe) متواصل.

#### 🎯 الملخص السريع
- Materialized = تخزين وسيط كامل.
- Pipelined = تمرير مباشر بدون تخزين كامل.

#### 📚 التطبيق
اختيار الـ DBMS بين الطريقتين (أو مزيج منهما) بيأثر مباشرة على أداء تنفيذ خطة الاستعلام النهائية اللي وصلنالها بالأقسام السابقة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يظن إن الـ `pipelined evaluation` دايماً أفضل بكل الحالات.

#### الفهم الصحيح ✅:
المحاضرة ما ذكرت هذا صراحة كقاعدة مطلقة — الاختيار يعتمد على خطة التنفيذ ونوع العمليات؛ أحياناً تحتاج تخزين وسيط (مثلاً لو نفس النتيجة الوسيطة رح تُستخدم أكثر من مرة).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Materialized evaluation — result of an operation stored as temporary relation. Pipelined evaluation — operation results forwarded directly to the next operation in the query sequence.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف الطريقتين ومقارنة عملية بينهما

</details>

---

### 7. تحسين الاستعلامات المتداخلة (Nested Subquery Optimization)

<!-- @render: {type: "diagram-first", visualization: "before-after", coverage: "90%"} -->
<!-- @connectivity: {prerequisite: "section_6"} -->

#### 📍 أين نحن الآن؟
هلأ ننتقل من تحسين شكل الاستعلام العام، لتحسين حالة خاصة: الاستعلامات اللي فيها subquery جوه WHERE.

#### ⬅️ الربط مع السابق
نفس فلسفة "قلّل شغل التكرار" اللي شفناها بتحسين joins، بس هون مطبقة على subqueries بدل جداول عادية.

#### 💡 الفكرة الأساسية
**`Unnesting` هي عملية إزالة الاستعلام المتداخل (nested) وتحويل الاستعلام الداخلي والخارجي لكتلة استعلام واحدة (single block) — عادة عن طريق تحويلها لـ join أو semi-join.**

---

#### 🔄 قبل / بعد: Unnesting باستخدام Join

**قبل (Correlated nested subquery):**
```sql
SELECT Fname, Lname, Salary
FROM EMPLOYEE E
WHERE EXISTS (SELECT *
              FROM DEPARTMENT D
              WHERE D.Dnumber = E.Dno AND D.Zipcode = 30332);
```

**بعد (Unnesting):**
```sql
SELECT Fname, Lname, Salary
FROM EMPLOYEE E, DEPARTMENT D
WHERE D.Dnumber = E.Dno AND D.Zipcode = 30332;
```

**ماذا تغيّر؟** بدل ما الـ DBMS ينفّذ الـ subquery (`EXISTS...`) بشكل منفصل لكل صف من EMPLOYEE (زي حلقة متداخلة `nested loop`)، صار الاستعلام كتلة واحدة فيها `join` مباشر بين EMPLOYEE و DEPARTMENT — وهذا أسرع لأنه يستفيد من خوارزميات الـ join المحسّنة (زي hash join) بدل تكرار فحص الـ subquery.

#### 🔄 قبل / بعد: Unnesting باستخدام Semi-Join

**قبل (Correlated nested subquery بـ IN):**
```sql
SELECT COUNT(*)
FROM DEPARTMENT D
WHERE D.Dnumber IN (SELECT E.Dno
                     FROM EMPLOYEE E
                     WHERE E.Salary > 200000);
```

**بعد (Unnesting with Semi-Join):**
الاستعلام يتحول منطقياً لعملية `semi-join` بين DEPARTMENT و EMPLOYEE (بشرط `Dnumber = Dno`)، بحيث النتيجة هي صفوف DEPARTMENT اللي عندها **على الأقل** موظف واحد راتبه أكبر من 200000 — بدون تكرار صفوف DEPARTMENT حتى لو فيه أكثر من موظف مطابق (وهذا هو الفرق الأساسي بين semi-join والـ join العادي).

**ماذا تغيّر؟** بدل فحص شرط `IN` لكل صف بشكل منفصل، صار الفحص عملية `semi-join` واحدة محسّنة.

#### 📖 الشرح
الاستعلامات المتداخلة (`nested subqueries`) المرتبطة (`correlated`) — يعني الـ subquery بتعتمد على قيمة من الاستعلام الخارجي بكل مرة — تكون مكلفة لأن التنفيذ الساذج بيحتاج تشغيل الـ subquery من جديد لكل صف بالخارجي. الحل: **Unnesting**، وهي عملية إزالة الـ nested query وتحويل الداخلي والخارجي لكتلة واحدة. الاستعلامات المرتبطة بـ `IN` أو `ANY` ممكن دايماً تتحول لاستعلام كتلة واحدة (single block query). كطريقة بديلة، ممكن كمان إنشاء جدول نتيجة مؤقت (`temporary result table`) من الـ subquery واستخدامه بعملية join عادية.

#### 🎯 الملخص السريع
- `Unnesting` = دمج الـ subquery مع الاستعلام الخارجي بكتلة واحدة.
- استعلامات مرتبطة بـ `IN`/`ANY` ممكن دايماً تتحول لكتلة واحدة.
- طريقة بديلة: جدول نتيجة مؤقت من الـ subquery يُستخدم بـ join.

#### 📚 التطبيق
نفس منطق "تقليل التكرار وتحويله لعملية جبرية واحدة محسّنة" هيُستخدم بالقسم الجاي مع الـ `views` (subquery merging).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يعتقد إن `semi-join` بترجّع نفس عدد صفوف الـ `join` العادي.

#### الفهم الصحيح ✅:
`semi-join` بترجّع كل صف من الجدول الأول **مرة وحدة بس** إذا فيه تطابق واحد أو أكثر بالجدول الثاني — ما بتكرر الصف حتى لو فيه عدة تطابقات (بعكس الـ join العادي اللي بيكرره).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90%, ⚠️ راجع الملاحظات)</summary>

**النص الأصلي يقول:**
> Correlated nested subqueries. SELECT E1.Fname, E1.Lname FROM EMPLOYEE E1 WHERE E1.Salary = (SELECT MAX(Salary) FROM EMPLOYEE E2). SELECT Fname, Lname, Salary FROM EMPLOYEE E WHERE EXISTS (SELECT * FROM DEPARTMENT D WHERE D.Dnumber=E.Dno AND D.Zipcode=30332) → Unnesting → SELECT Fname, Lname, Salary FROM EMPLOYEE E, DEPARTMENT D WHERE D.Dnumber=E.Dno AND D.Zipcode=30332. SELECT COUNT(*) FROM DEPARTMENT D WHERE D.Dnumber IN (SELECT E.Dno FROM EMPLOYEE E WHERE E.Salary>200000) → Unnesting with Semi-Join. Unnesting: process of removing the nested query and converting the inner and outer query into one block. Queries involving a nested subquery connected by IN or ANY connector can always be converted into a single block query. Alternate technique: creating temporary result tables from subqueries and using them in joins.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الفكرة الأساسية، مثالي الـ join والـ semi-join، الطريقة البديلة
- ⚠️ غير مشروح بالكامل: مثال `E1.Salary = (SELECT MAX(Salary)...)` — المحاضرة عرضته كمثال تمهيدي لـ correlated subqueries بدون تفاصيل إضافية، لهذا لم يُفرد له شرح منفصل (بسيط بما فيه الكفاية أنه مغطى ضمنياً بمفهوم correlated subquery)
- ℹ️ إضافة من الدليل: توضيح الفرق العملي بين semi-join والـ join العادي بخصوص التكرار

</details>

---

### 8. دمج الاستعلامات الفرعية (Subquery / View Merging Transformation)

<!-- @render: {type: "prose-first", visualization: "trade-off", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 📍 أين نحن الآن؟
نفس فكرة الـ unnesting، بس مطبقة على subquery موجودة بالـ FROM clause بدل WHERE clause.

#### ⬅️ الربط مع السابق
امتداد طبيعي لفكرة "Unnesting" اللي شرحناها بالقسم السابق — هون النوع مختلف (view/inline view بدل WHERE subquery).

#### 💡 الفكرة الأساسية
**`View merging` هي عملية دمج جداول الـ view (الموجودة بـ FROM clause كـ inline view) مع جداول الاستعلام الخارجي، بدل معاملتها كوحدتين منفصلتين.**

---

#### 📖 الشرح
`Inline view` هي subquery موجودة بالـ `FROM` clause (بدل WHERE). عملية `view merging` تدمج جداول الـ view مع جداول الاستعلام الخارجي بكتلة واحدة. الـ `views` اللي تحتوي عمليات `select-project-join` بس تُسمى **simple views** — وهذا النوع يقدر دايماً يخضع لعملية الدمج.

**ليش الدمج مهم؟** بالمثال بالمحاضرة (EMP, DEPT, BLDG): الاستعلام قبل الدمج (فيه inline view باسم V) عنده عدد مرشحين لترتيب الـ join (`join order candidates`) = 4 بس، وما واضح إذا فيه فهرس (`index`) على `V.Dno` أصلاً — لأن V نتيجة وسيطة، مو جدول حقيقي عليه فهارس. بعد الدمج (كل الجداول EMP, DEPT, BLDG بكتلة واحدة)، عدد مرشحين ترتيب الـ join يصير = 8 (فيه خيارات أكثر يقدر optimizer يجربها)، وكمان يصير فيه إمكانية استخدام فهارس حقيقية على DEPT و BLDG مباشرة. يعني **الدمج بيوسّع مساحة البحث للـ optimizer** ويسمح باستخدام الفهارس، وهذا غالباً أفضل.

بالنسبة لـ **Group-By view-merging** (لو الـ view فيها `GROUP BY`): فيه مقايضة — تأخير عملية الـ `GROUP BY` لبعد تنفيذ الـ joins ممكن يقلل حجم البيانات المعرّضة للتجميع (لو الـ joins نفسها عندها `selectivity` قليلة، يعني بتفلتر كتير)؛ بالمقابل، تنفيذ الـ `GROUP BY` بدري ممكن يقلل حجم البيانات اللي رح تدخل على الـ joins اللي بعدها. الـ optimizer يقرر أيهم أفضل بناءً على تقديرات التكلفة.

#### ⚖️ المقايضة: GROUP BY بدري vs متأخر

| | GROUP BY بدري | GROUP BY متأخر (بعد الـ joins) |
| --- | --- | --- |
| **المزايا** | يقلل حجم البيانات اللي رح تدخل joins لاحقة | يستفيد لو الـ joins قللت البيانات كتير أصلاً (selectivity منخفضة) |
| **العيوب** | ممكن يكون غير مفيد لو الـ joins كانت رح تقلل البيانات أكتر منه | حجم بيانات أكبر يدخل عملية التجميع لو ما فيه فلترة كافية قبلها |
| **متى تختاره** | لو التجميع نفسه يقلل عدد الصفوف بشكل كبير قبل الـ joins | لو الـ joins عندها انتقائية عالية (تفلتر كتير) |

#### مثال Group-By Merging
جداول: `SALES(Custid, Productid, Date, Qty_sold)`, `CUST(Custid, Custname, Country, Cemail)`, `PRODUCT(Productid, Pname, Qty_onhand)`.

فيه view باسم `CP_BOUGHT_VIEW` يحسب مجموع الكمية المشتراة لكل زوج `(Custid, Productid)`:
```sql
CREATE VIEW CP_BOUGHT_VIEW AS
SELECT SUM(S.Qty_sold) as Bought, S.Custid, S.Productid
FROM SALES S
GROUP BY S.Custid, S.Productid;
```

والاستعلام اللي يستخدم الـ view (يجيب زبائن من فرنسا اشتروا أكثر من 50 قطعة من منتج "Ring_234"):
```sql
SELECT C.Custid, C.Custname, C.Cemail
FROM CUST C, PRODUCT P, CP_BOUGHT_VIEW V1
WHERE P.Productid = V1.Productid AND C.Custid = V1.Custid AND V1.Bought > 50
  AND Pname = 'Ring_234' AND C.Country = 'France';
```
هنا الـ optimizer يقرر: هل أرخص يعمل `GROUP BY` على كل جدول SALES كامل ثم يربطه بـ CUST و PRODUCT (متأخر)، أو يفلتر أول (زبائن فرنسا + منتج Ring_234) ثم يجمّع بس على النتيجة المفلترة (بدري)؟ الخيار الثاني عادة أرخص لأنه يقلل عدد الصفوف قبل عملية التجميع المكلفة.

#### 🎯 الملخص السريع
- `View merging` = دمج جداول الـ view مع الاستعلام الخارجي بكتلة واحدة.
- `Simple views` (select-project-join) يقدروا دايماً يخضعوا للدمج.
- الدمج بيزيد خيارات ترتيب الـ join وبيسمح باستخدام فهارس حقيقية.
- `Group-By merging`: قرار مبني على التكلفة (بدري يقلل بيانات الـ joins، متأخر يستفيد من انتقائية الـ joins).

#### 📚 التطبيق
هالمفهوم بيتصل مباشرة بموضوع `Materialized Views` بالقسم الجاي — لأن أحياناً بدل ما ندمج الـ view بكل استعلام، أرخص نخزّنها جاهزة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يفكر إن أي `view` بالـ FROM clause تُدمج تلقائياً بنفس الطريقة.

#### الفهم الصحيح ✅:
فقط الـ `simple views` (اللي تحتوي `select-project-join` بس) مضمون دمجها دايماً. أما الـ `views` اللي فيها `GROUP BY`، فالدمج قرار يعتمد على تقدير التكلفة (`cost-based decision`) مو قاعدة ثابتة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> Inline view — FROM clause subquery. View merging operation — merges the tables in the view with the tables from the outer query block. Views containing select-project-join operations are considered simple views — can always be subjected to this type of view-merging. Example: EMP(Ssn,Fn,Ln,Dno), DEPT(Dno,Dname,Dmgrname,Bldg_id), BLDG(Bldg_id,No_storeys,Addr,Phone). Query with inline view V: join order candidates=4, any index on V.Dno? After merging: join order candidates=8, any indexes can be used? Group-By view-merging: delaying the Group By operation after performing joins may reduce the data subjected to grouping in case the joins have low join selectivity. Alternately, performing Group By early may reduce the amount of data subjected to subsequent joins. Optimizer determines whether to merge GROUP-BY views based on estimated costs. Group-By Merging Example: SALES(Custid,Productid,Date,Qty_sold), CUST(Custid,Custname,Country,Cemail), PRODUCT(Productid,Pname,Qty_onhand). CREATE VIEW CP_BOUGHT_VIEW AS SELECT SUM(S.Qty_sold) as Bought, S.Custid, S.Productid FROM SALES S GROUP BY S.Custid, S.Productid. QG: SELECT C.Custid, C.Custname, C.Cemail FROM CUST C, PRODUCT P, CP_BOUGHT_VIEW V1 WHERE P.Productid=V1.Productid AND C.Custid=V1.Custid AND V1.Bought>50 AND Pname='Ring_234' AND C.Country='France'.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: inline view، عملية الدمج، simple views، مثال join order candidates، Group-By merging والمثال الكامل
- ⚠️ غير مشروح بالكامل: التفاصيل الدقيقة لكيفية حساب "4" و"8" كعدد مرشحين لترتيب الـ join (المحاضرة ذكرت الرقم كمعطى بدون شرح صيغة الحساب)
- ℹ️ إضافة من الدليل: جدول المقايضة (trade-off) بين GROUP BY بدري ومتأخر

</details>

---

### 9. الـ Views المخزَّنة (Materialized Views)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_8"} -->

#### 📍 أين نحن الآن؟
بدل ما ندمج الـ view بكل استعلام يستخدمها، فيه خيار تاني: نخزّن نتيجتها فعلياً.

#### ⬅️ الربط مع السابق
امتداد لفكرة الـ view من القسم السابق — بس بدل "دمج" الـ view، هون "نخزّنها" كنتيجة جاهزة.

#### 💡 الفكرة الأساسية
**`Materialized View` هي view معرّفة كاستعلام بقاعدة البيانات، لكن نتيجتها تُخزَّن فعلياً (مؤقتاً أو بشكل دائم) بدل ما تُحسب من جديد كل مرة.**

---

#### 📖 الشرح
عادة الـ `view` العادية (`virtual view`) ما فيها بيانات مخزّنة — كل مرة تستعلم منها، الـ DBMS يعيد تنفيذ الاستعلام اللي عرّفها من جديد. أما `Materialized view`، فنتيجة ذاك الاستعلام تُخزَّن فعلياً كجدول (مؤقتاً أو بشكل دائم). هذا يُستخدم كتقنية تحسين: تجنّب جزء من الحساب المطلوب بالاستعلام الأصلي، لأنه أسهل تقرأ النتيجة الجاهزة من القرص وقت الحاجة، بدل ما تعيد حسابها من الصفر كل مرة.

#### 🎯 الملخص السريع
- View عادية = بدون تخزين، تُحسب من جديد كل استعلام.
- Materialized view = النتيجة مخزّنة فعلياً (مؤقت أو دائم).
- الفائدة: تجنب إعادة الحساب المكرر.

#### 📚 التطبيق
بما إن البيانات الأصلية بتتغيّر بمرور الوقت (`insert`/`update`/`delete`)، لازم نعرف كيف نحدّث الـ materialized view بدون إعادة حسابها كاملة — وهذا موضوع القسم الجاي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يفكر إن الـ `materialized view` نفس الـ `temporary table` العادية.

#### الفهم الصحيح ✅:
الـ `materialized view` مرتبطة **بتعريف** (view definition) داخل قاعدة البيانات — يعني الـ DBMS "يعرف" إنها نتيجة استعلام معيّن ويقدر يحدّثها لما الجداول الأساسية تتغيّر (خلافاً لجدول مؤقت عادي ما إله علاقة بمصدره الأصلي بعد إنشائه).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> View defined in database as a query. Materialized view stores results of that query — may be stored temporarily or permanently. Optimization technique: using materialized views to avoid some of the computation involved in the query. Easier to read it when needed than recompute from scratch.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف materialized view والفائدة منها

</details>

---

### 10. الصيانة التراكمية للـ Views (Incremental View Maintenance)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "85%"} -->
<!-- @connectivity: {prerequisite: "section_9"} -->

#### 📍 أين نحن الآن؟
آخر قسم بالمحاضرة — كيف نحافظ على تحديث الـ materialized view بكفاءة بعد ما الجداول الأصلية تتغيّر.

#### ⬅️ الربط مع السابق
مباشرة بيحل مشكلة الـ materialized view: لما الجداول الأساسية تتغيّر، النتيجة المخزّنة تصير قديمة (`stale`) — فكيف نحدّثها بأرخص طريقة؟

#### 💡 الفكرة الأساسية
**بدل إعادة حساب الـ materialized view بالكامل من الصفر بعد كل تغيير، نحدّثها تراكمياً (`incrementally`) بالاعتماد بس على التغييرات (insert/delete) اللي صارت على الجداول الأساسية منذ آخر تحديث.**

---

#### 📐 المعادلة: تحديث view مبنية على Join

$$
v_{new} = r \Join s \cup r_i \Join s
$$

**الشرح:**
> لو عندك view قديمة `v_old = r ⨝ s` (join بين جدولين r و s)، وانضاف مجموعة صفوف جديدة `r_i` للجدول `r`، فبدل إعادة عمل `(r ∪ r_i) ⨝ s` من الصفر، تقدر تحسب بس الجزء الجديد `r_i ⨝ s` وتضيفه للنتيجة القديمة. بالمثل، لو انحذفت مجموعة صفوف `r_d` من `r`، القيمة الجديدة تصير `v_new = r ⨝ s − r_d ⨝ s`. ونفس المنطق ينطبق بشكل متماثل لو التغيير صار على `s` بدل `r`.

#### 📐 المعادلة: تحديث view مبنية على Selection

$$
v_{new} = v_{old} \cup \sigma_C(r_i)
$$

**الشرح:**
> لو الـ view معرّفة كـ `V = σ_C(R)` (فلترة بشرط C)، ولما تنضاف صفوف جديدة `r_i` للجدول `r`، الـ view تتحدّث بإضافة `σ_C(r_i)` بس (فلترة الصفوف الجديدة فقط) — مو إعادة فلترة الجدول كامل. لو انحذفت صفوف `r_d`، تُحدَّث بطرح `σ_C(r_d)` من النتيجة القديمة: `v_new = v_old − σ_C(r_d)`.

#### 📖 الشرح
فكرة الصيانة التراكمية (`Incremental View Maintenance`) هي: تحديث الـ view بالاعتماد على التغييرات (`changes`) اللي حصلت منذ آخر تحديث، بدل إعادة حساب الاستعلام كامل من الصفر. هذا مهم لأن الجداول الأصلية باستمرار بتتغيّر (join, selection, projection, intersection, aggregation) — وإعادة الحساب الكامل بكل مرة مكلف جداً، خصوصاً لو الجداول كبيرة والتغييرات صغيرة نسبياً.

بالنسبة لعمليات `join` و `selection`، المنطق واضح ومباشر كما بالمعادلات فوق — التغيير الجديد بس هو اللي يُعالج، والباقي القديم يبقى كما هو. المحاضرة أحالت باقي الحالات (`Projection`, `Selection` بتفاصيل أكثر، و`Aggregation`) للكتاب المرجعي مباشرة.

#### 🎯 الملخص السريع
- الهدف: تحديث الـ view بدون إعادة حسابها كاملة.
- التحديث يعتمد على `insert`/`delete` منذ آخر تحديث.
- يشمل عمليات: Join, Selection, Projection, Intersection, Aggregation.

#### 📚 التطبيق
هذا آخر موضوع بالمحاضرة، ويربط مباشرة بموضوع أداء الاستعلامات اللي تعتمد على `materialized views` بأنظمة فيها تحديثات مستمرة (زي أنظمة الـ OLTP مع تقارير OLAP).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الطالب يفكر إن الصيانة التراكمية تُطبَّق بنفس الطريقة على كل أنواع العمليات (join, selection, aggregation...) بدون فرق.

#### الفهم الصحيح ✅:
كل نوع عملية إله صيغة تحديث خاصة به (زي المعادلات فوق للـ join والـ selection) — والمحاضرة أحالت طلابها للكتاب المرجعي لمراجعة صيغ `Projection`, `Selection` بتفصيل أكبر، و`Aggregation` تحديداً، لأنها أعقد من join/selection البسيطة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 85%, ⚠️ راجع الملاحظات)</summary>

**النص الأصلي يقول:**
> Update view incrementally by accounting for changes that occurred since last update: Join, Selection, Projection, Intersection, Aggregation. For students: See Projection, Selection and Aggregation at textbook. Join: If a view contains inner join of relations r and s, v_old=r⋈s, and there is a new set of tuples inserted: ri, in r, then the new value of the view contains (r∪ri)⋈s. The incremental change to the view can be computed as v_new=r⋈s ∪ ri⋈s. Similarly, deleting a set of tuples rd from r results in the new view as v_new=r⋈s − rd⋈s. We will have similar expressions symmetrically when s undergoes addition or deletion. Selection: If a view is defined as V=σC R with condition C for selection, when a set of tuples ri are inserted into r, the view can be modified as v_new=v_old ∪ σC ri. On the other hand, upon deletion of tuples rd from r, we get v_new=v_old − σC rd.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: صيغ التحديث لعمليتي Join و Selection
- ⚠️ غير مشروح بالكامل: صيغ Projection, Intersection, Aggregation بالتفصيل — المحاضرة نفسها أحالت الطلاب صراحة للكتاب المرجعي (`textbook`) لهذه الأجزاء ولم تعرضها بالسلايد

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط وصعب

### السؤال 1 (متوسط)

ما الهدف الأساسي من تطبيق `SELECT` و `PROJECT` قبل `JOIN` بالتحسين الاستكشافي؟

أ) تسهيل قراءة الاستعلام على المبرمج
ب) تقليل حجم البيانات (الصفوف والأعمدة) اللي رح تدخل على عملية الـ join
ج) لأن SQL يفرض هذا الترتيب إلزامياً
د) لتقليل عدد الجداول بقاعدة البيانات

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** فلترة البيانات وتقليل أعمدتها قبل الـ join يقلل حجم الملفات اللي رح تنضم لبعضها، وبالتالي الـ join نفسه ينفّذ أسرع وبموارد أقل.
- ❌ **الخيار أ):** الترتيب مالوش علاقة بسهولة القراءة، هذا تمثيل داخلي للـ DBMS مو للمبرمج.
- ❌ **الخيار ج):** SQL كلغة `declarative` ما بيفرض ترتيب تنفيذ — الـ optimizer هو اللي يقرر.
- ❌ **الخيار د):** عدد الجداول بقاعدة البيانات ثابت، ما له علاقة بترتيب عمليات استعلام واحد.

---

### السؤال 2 (متوسط)

ما الفرق الأساسي بين `query tree` و `query graph`؟

أ) query tree يمثل SQL، query graph يمثل relational algebra
ب) query tree يمثل relational algebra وله ترتيب تنفيذ محدد، query graph يمثل relational calculus وبدون ترتيب تنفيذ واحد
ج) لا فرق، هما نفس الشي بأسماء مختلفة
د) query graph أسرع دايماً من query tree بالتنفيذ

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** هذا بالضبط ما ذكرته المحاضرة — query tree = relational algebra + ترتيب تنفيذ محدد، query graph = relational calculus بدون ترتيب واحد، ولهذا query tree مفضّل عملياً.
- ❌ **الخيار أ):** كلاهما تمثيلات داخلية، مو أحدهما SQL مباشرة.
- ❌ **الخيار ج):** فيه فرق جوهري بالبنية والاستخدام كما بالخيار ب.
- ❌ **الخيار د):** query graph لا يُستخدم مباشرة للتنفيذ أصلاً؛ query tree هو المفضّل لهذا الغرض.

---

### السؤال 3 (صعب)

بالمثال Q2 (PROJECT, DEPARTMENT, EMPLOYEE)، ليش الشجرة الأولية (canonical) "لن تُنفَّذ أبداً" حسب المحاضرة؟

أ) لأنها تحتوي أخطاء بالصياغة
ب) لأنها تنفّذ cartesian product لكل الجداول قبل أي فلترة، وهذا مكلف جداً
ج) لأن SQL يمنع استخدامها
د) لأنها تحتوي دوال تجميع (aggregation)

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** الشجرة الأولية تعمل `×` (cartesian product) بين كل الجداول قبل تطبيق أي شرط فلترة، فحجم النتيجة الوسيطة يكون ضخم جداً — ولهذا يُعتبر تنفيذها غير عملي.
- ❌ **الخيار أ):** الشجرة صحيحة منطقياً وتعطي نفس نتيجة الشجرة المحسّنة، بس أداؤها سيء.
- ❌ **الخيار ج):** SQL ما له علاقة مباشرة بهذا؛ هذا قرار الـ optimizer الداخلي.
- ❌ **الخيار د):** المثال ما فيه دوال تجميع أصلاً.

---

### السؤال 4 (متوسط)

حسب قاعدة `Cascade of σ`، الشرط `σ_{Pname='Aquarius' AND Pnumber=Pno}(R)` يكافئ:

أ) `σ_{Pname='Aquarius'}(σ_{Pnumber=Pno}(R))`
ب) `σ_{Pnumber=Pno}(R) × σ_{Pname='Aquarius'}(R)`
ج) `π_{Pname, Pnumber}(R)`
د) لا يوجد تكافؤ، الشرط المركب لا يمكن تفكيكه

**الإجابة الصحيحة:** أ)

**التعليل:**
- ✅ **الخيار أ):** حسب `Cascade of σ`، شرط AND مركّب يتفكك لسلسلة σ متتالية — بالضبط زي الصيغة σc1 AND c2(R) = σc1(σc2(R)).
- ❌ **الخيار ب):** هذا خلط خاطئ بين cartesian product وعملية cascade — ما إلها علاقة.
- ❌ **الخيار ج):** π عملية projection مختلفة تماماً عن σ selection.
- ❌ **الخيار د):** بالعكس، هذا بالضبط ما تسمح فيه قاعدة Cascade of σ.

---

### السؤال 5 (سهل-متوسط)

متى يجوز تبديل ترتيب عمليتي `σ` و `π` (Commuting σ with π)؟

أ) دايماً بأي حالة
ب) فقط إذا كل أعمدة شرط σ موجودة أصلاً بقائمة أعمدة π
ج) فقط إذا الجدول فيه فهرس
د) أبداً، هذي العملية غير مسموحة رياضياً

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** الشرط الدقيق حسب المحاضرة: "if the selection condition involves only attributes in the projection list" — لازم أعمدة شرط الـ σ تكون بقائمة الـ π.
- ❌ **الخيار أ):** لو شرط σ يستخدم عمود مو موجود بقائمة π، فقدت العمود قبل ما تقدر تفلتر عليه — فما ينفع التبديل.
- ❌ **الخيار ج):** وجود فهرس مالوش علاقة بصحة قاعدة التحويل هذي.
- ❌ **الخيار د):** بالعكس، هذي قاعدة رسمية موجودة بالمحاضرة، بس بشرط محدد.

---

### السؤال 6 (متوسط)

بمثال تحويل شجرة الاستعلام Q (EMPLOYEE, WORKS_ON, PROJECT)، إيش أول خطوة تُطبَّق بعد الشجرة الأولية؟

أ) استبدال × و σ بـ join مباشرة
ب) دفع عمليات SELECT لتحت الشجرة
ج) دفع عمليات PROJECT لتحت الشجرة
د) حذف جدول WORKS_ON بالكامل

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** الترتيب حسب المحاضرة: (a) الشجرة الأولية → (b) دفع SELECT لتحت → (c) الأكثر تقييداً أول → (d) استبدال ×+σ بـ join → (e) دفع PROJECT لتحت. فدفع SELECT هو أول خطوة تحويل فعلية.
- ❌ **الخيار أ):** هذي الخطوة (d)، تأتي بعد دفع الـ SELECT وترتيبها.
- ❌ **الخيار ج):** دفع PROJECT هي الخطوة الأخيرة (e)، مو الأولى.
- ❌ **الخيار د):** لا يوجد حذف لأي جدول؛ كل الجداول الثلاثة (EMPLOYEE, WORKS_ON, PROJECT) تبقى بالشجرة النهائية.

---

### السؤال 7 (صعب)

بخطوة (c) بمثال تحويل الاستعلام Q، ليش σ_{Essn=Ssn} صارت أعلى من σ_{Pnumber=Pno} بالشجرة؟

أ) لأن الترتيب الأبجدي يحدد ذلك
ب) لأن Essn=Ssn هو الشرط الأكثر تقييداً بهذا المثال
ج) لأن EMPLOYEE أكبر جدول
د) الترتيب عشوائي ولا يوجد سبب منطقي

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** قاعدة "الأكثر تقييداً أول" (More restrictive selection first) تعني تنفيذ الشرط اللي بيقلل البيانات أكتر أولاً — والمحاضرة رتبت σ_Essn=Ssn (اللي تربط EMPLOYEE المفلتر مع WORKS_ON) كأعلى عملية بناءً على هذا المبدأ.
- ❌ **الخيار أ):** ما فيه علاقة بترتيب أبجدي بأي قاعدة تحسين استعلامات.
- ❌ **الخيار ج):** حجم الجدول وحده مو المعيار؛ المعيار هو مدى تقييد (selectivity) الشرط نفسه.
- ❌ **الخيار د):** الترتيب مبني على مبدأ صريح (الأكثر تقييداً أول)، مو عشوائي.

---

### السؤال 8 (متوسط)

ما الفرق الجوهري بين `Materialized evaluation` و `Pipelined evaluation`؟

أ) الأولى تخزن نتيجة كل عملية كجدول مؤقت، والثانية تمرر النتائج مباشرة للعملية التالية بدون تخزين كامل
ب) الأولى أبطأ دايماً بلا استثناء
ج) الثانية تُستخدم فقط مع الـ views
د) لا فرق عملي بينهما

**الإجابة الصحيحة:** أ)

**التعليل:**
- ✅ **الخيار أ):** بالضبط تعريف المحاضرة: materialized = نتيجة مخزّنة كعلاقة مؤقتة، pipelined = النتائج تُمرَّر مباشرة للعملية التالية بالتسلسل.
- ❌ **الخيار ب):** المحاضرة ما قالت هذا كقاعدة مطلقة؛ الاختيار يعتمد على السياق.
- ❌ **الخيار ج):** كلا الطريقتين تنطبقان على أي عملية بخطة التنفيذ، مو مرتبطتين حصراً بالـ views.
- ❌ **الخيار د):** فيه فرق جوهري بطريقة تمرير البيانات بين خطوات التنفيذ.

---

### السؤال 9 (متوسط)

الاستعلام:
```sql
SELECT Fname, Lname, Salary FROM EMPLOYEE E
WHERE EXISTS (SELECT * FROM DEPARTMENT D WHERE D.Dnumber=E.Dno AND D.Zipcode=30332);
```
بعد تطبيق `Unnesting`، الاستعلام المكافئ يصير؟

أ) نفس الاستعلام بدون أي تغيير
ب) `SELECT Fname, Lname, Salary FROM EMPLOYEE E, DEPARTMENT D WHERE D.Dnumber=E.Dno AND D.Zipcode=30332`
ج) استعلام يحذف جدول DEPARTMENT بالكامل
د) استعلام يستخدم UNION بدل EXISTS

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** هذا بالضبط المثال بالمحاضرة — تحويل الـ correlated subquery بـ EXISTS إلى join مباشر بين EMPLOYEE و DEPARTMENT بنفس الشرط.
- ❌ **الخيار أ):** الهدف من Unnesting هو إعادة الصياغة، مو تركها كما هي.
- ❌ **الخيار ج):** DEPARTMENT ضروري بالنتيجة (شرط Zipcode)، فما يُحذف.
- ❌ **الخيار د):** UNION ما إله علاقة بهذا التحويل أبداً.

---

### السؤال 10 (صعب)

ما الفرق الأساسي بين `semi-join` والـ `join` العادي بسياق تحويل الاستعلام:
```sql
SELECT COUNT(*) FROM DEPARTMENT D WHERE D.Dnumber IN (SELECT E.Dno FROM EMPLOYEE E WHERE E.Salary>200000);
```

أ) لا فرق، هما نفس العملية
ب) semi-join ترجّع كل صف من DEPARTMENT مرة وحدة بس لو فيه تطابق، بدون تكرار حتى لو فيه عدة موظفين مطابقين
ج) semi-join يرجع فقط صفوف EMPLOYEE
د) semi-join لا يمكن استخدامه مع IN

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** الـ semi-join يحافظ على عدد صفوف الجدول الأول (DEPARTMENT) بدون تكرار، وهذا مهم هنا لأن `COUNT(*)` يحتاج عدد الأقسام مو عدد أزواج (قسم، موظف).
- ❌ **الخيار أ):** لو استخدمنا join عادي بدل semi-join، ممكن تتكرر صفوف DEPARTMENT لو فيها أكثر من موظف مطابق، وهذا يغيّر نتيجة COUNT بشكل خاطئ.
- ❌ **الخيار ج):** semi-join يرجع صفوف الجدول الأول (DEPARTMENT بهذا المثال) اللي عندها تطابق، مو صفوف EMPLOYEE.
- ❌ **الخيار د):** بالعكس، المحاضرة استخدمت semi-join تحديداً كتحويل لاستعلام فيه IN.

---

### السؤال 11 (متوسط)

`Inline view` بالمحاضرة تعني؟

أ) view مخزّنة بشكل دائم بالقرص
ب) subquery موجودة بالـ FROM clause
ج) view تحتوي فقط أعمدة رقمية
د) view لا يمكن تعديلها

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** حسب المحاضرة، `Inline view — FROM clause subquery` — بالضبط هذا التعريف.
- ❌ **الخيار أ):** هذا وصف الـ `materialized view` مو الـ `inline view`.
- ❌ **الخيار ج):** لا علاقة لنوع الأعمدة بتعريف inline view.
- ❌ **الخيار د):** المحاضرة ما ذكرت شيء عن قابلية التعديل.

---

### السؤال 12 (صعب)

بمثال view merging (EMP, DEPT, BLDG)، بعد دمج الـ inline view مع الاستعلام الخارجي، إيش اللي تغيّر حسب المحاضرة؟

أ) عدد مرشحين ترتيب الـ join زاد من 4 إلى 8، وصار ممكن استخدام فهارس حقيقية
ب) الاستعلام صار أبطأ دايماً
ج) عدد الجداول قلّ من 3 إلى 2
د) لا شيء تغيّر عملياً

**الإجابة الصحيحة:** أ)

**التعليل:**
- ✅ **الخيار أ):** المحاضرة أظهرت صراحة: قبل الدمج join order candidates=4 (وسؤال عن وجود فهرس على V.Dno)، بعد الدمج =8 (وسؤال عن استخدام فهارس حقيقية) — يعني خيارات أكتر وإمكانية استخدام فهارس فعلية.
- ❌ **الخيار ب):** المحاضرة تعرض الدمج كتقنية تحسين، مو كسبب للبطء.
- ❌ **الخيار ج):** عدد الجداول الفعلي (EMP, DEPT, BLDG) ثابت = 3 قبل وبعد؛ اللي تغيّر هو طريقة تمثيلها بالاستعلام (منفصلة كـ view أو مدموجة).
- ❌ **الخيار د):** فيه تغيير واضح بعدد مرشحين ترتيب الـ join وإمكانية استخدام الفهارس.

---

### السؤال 13 (متوسط)

أي نوع من الـ `views` يمكن إخضاعه دايماً لعملية `view-merging` حسب المحاضرة؟

أ) أي view بغض النظر عن محتواها
ب) الـ views اللي تحتوي فقط عمليات select-project-join (simple views)
ج) فقط الـ views اللي فيها GROUP BY
د) فقط الـ views المخزّنة (materialized)

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** النص صريح: "Views containing select-project-join operations are considered simple views — can always be subjected to this type of view-merging."
- ❌ **الخيار أ):** الـ views اللي فيها GROUP BY مثلاً، الدمج فيها قرار مبني على التكلفة مو مضمون دايماً.
- ❌ **الخيار ج):** بالعكس، الـ GROUP BY views دمجها قرار اختياري بناءً على cost estimation، مو مضمون.
- ❌ **الخيار د):** المادة مالتها علاقة بكون الـ view مخزّنة أو لا؛ الموضوع عن نوع العمليات داخل الـ view.

---

### السؤال 14 (متوسط)

ما الفرق بين الـ `view` العادية و`materialized view`؟

أ) لا فرق، مصطلحان لنفس الشيء
ب) العادية تُحسب من جديد كل استعلام، بينما المخزّنة نتيجتها محفوظة فعلياً
ج) materialized view لا تحتوي أعمدة
د) الـ view العادية أسرع دايماً من materialized view

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** هذا جوهر الفرق حسب المحاضرة — materialized view "stores results of that query... may be stored temporarily or permanently"، بعكس الـ view العادية الافتراضية.
- ❌ **الخيار أ):** فيه فرق جوهري بالتخزين كما بالخيار ب.
- ❌ **الخيار ج):** كلاهما لهما أعمدة معرّفة بالاستعلام الأصلي.
- ❌ **الخيار د):** الهدف الأساسي من materialized view هو تجنب إعادة الحساب، يعني عادة أسرع بالقراءة من العادية اللي تُعاد حسابها كل مرة.

---

### السؤال 15 (صعب)

لو view معرّفة كـ `V = σ_C(R)`، وانضافت مجموعة صفوف جديدة `r_i` للجدول R، كيف تُحدَّث القيمة الجديدة للـ view حسب `Incremental View Maintenance`؟

أ) `v_new = σ_C(R)` (إعادة الحساب كامل)
ب) `v_new = v_old ∪ σ_C(r_i)`
ج) `v_new = v_old − σ_C(r_i)`
د) `v_new = r_i` فقط

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** حسب المعادلة بالمحاضرة، الـ view الجديدة = القديمة زائد فلترة الصفوف الجديدة فقط بنفس شرط C — بدون إعادة فلترة الجدول كامل.
- ❌ **الخيار أ):** هذا بالضبط ما تتجنبه فكرة الصيانة التراكمية (تجنب إعادة الحساب الكامل).
- ❌ **الخيار ج):** الطرح `−` يُستخدم بحالة الحذف (deletion) مو الإضافة (insertion).
- ❌ **الخيار د):** هذا يتجاهل النتيجة القديمة v_old بالكامل، وهذا خطأ.

---

### السؤال 16 (متوسط)

حسب المحاضرة، أي العمليات التالية أحال الدكتور طلابه للكتاب المرجعي (textbook) لمراجعة تفاصيلها بموضوع Incremental View Maintenance؟

أ) Join فقط
ب) Selection فقط
ج) Projection, Selection (بتفصيل أكبر), و Aggregation
د) كل العمليات بدون استثناء

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** السلايد يقول صراحة "For students: See Projection, Selection and Aggregation at textbook" — بينما Join وSelection الأساسية شُرحا مباشرة بالسلايد.
- ❌ **الخيار أ):** Join شُرح مباشرة بالسلايد بمعادلته الكاملة، ما تمت إحالته للكتاب.
- ❌ **الخيار ب):** Selection الأساسية شُرحت بمعادلتها بالسلايد؛ الإحالة للكتاب كانت لتفاصيل إضافية.
- ❌ **الخيار د):** Join شُرح بالتفصيل مباشرة بالمحاضرة، فما ينطبق عليه "كل العمليات بدون استثناء".

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما هدف الـ query optimizer؟
**A:** اختيار أفضل استراتيجية متاحة لتنفيذ الاستعلام بناءً على المعلومات المتوفرة.

### البطاقة 2
**Q2:** ما الفرق بين Heuristics-based و Cost-based optimization؟
**A:** الأول يطبّق قواعد استكشافية ثابتة، والثاني يحسب تكلفة كل خطة ممكنة ويختار الأرخص.

### البطاقة 3
**Q3:** ما القاعدة الاستكشافية المثالية بالمحاضرة؟
**A:** طبّق SELECT و PROJECT قبل JOIN، لتقليل حجم الملفات اللي رح تنضم لبعضها.

### البطاقة 4
**Q4:** ما الفرق بين query tree و query graph؟
**A:** query tree يمثل relational algebra وله ترتيب تنفيذ محدد؛ query graph يمثل relational calculus بدون ترتيب واحد.

### البطاقة 5
**Q5:** ما قاعدة Cascade of σ؟
**A:** شرط AND مركّب يتفكك لسلسلة σ منفصلة، كل واحدة تطبّق شرط واحد.

### البطاقة 6
**Q6:** متى يجوز تبديل σ مع π (Commuting σ with π)؟
**A:** فقط إذا كل أعمدة شرط σ موجودة أصلاً بقائمة أعمدة π.

### البطاقة 7
**Q7:** ما الفرق بين Materialized وPipelined evaluation؟
**A:** Materialized تخزن نتيجة كل عملية كجدول مؤقت؛ Pipelined تمرر النتائج مباشرة للعملية التالية بدون تخزين كامل.

### البطاقة 8
**Q8:** ما هي Unnesting؟
**A:** عملية إزالة الاستعلام المتداخل (nested) وتحويل الداخلي والخارجي لكتلة استعلام واحدة.

### البطاقة 9
**Q9:** ما الفرق بين semi-join والـ join العادي؟
**A:** semi-join ترجّع كل صف من الجدول الأول مرة وحدة بس لو فيه تطابق، بدون تكرار — بعكس الـ join العادي.

### البطاقة 10
**Q10:** ما هو Inline view؟
**A:** subquery موجودة بالـ FROM clause بدل WHERE clause.

### البطاقة 11
**Q11:** ما هي simple view، وليش مهمة؟
**A:** view تحتوي فقط عمليات select-project-join — يمكن إخضاعها دايماً لعملية view-merging.

### البطاقة 12
**Q12:** ما الفرق بين view عادية و materialized view؟
**A:** العادية تُحسب من جديد كل استعلام؛ المخزّنة (materialized) نتيجتها محفوظة فعلياً (مؤقتاً أو دائماً).

### البطاقة 13
**Q13:** ما هدف Incremental View Maintenance؟
**A:** تحديث الـ view بالاعتماد على التغييرات (insert/delete) اللي صارت منذ آخر تحديث، بدل إعادة الحساب الكامل.

### البطاقة 14
**Q14:** كيف تتحدث view مبنية على join (V=r⋈s) عند إضافة صفوف r_i لـ r؟
**A:** v_new = r⋈s ∪ ri⋈s — نحسب بس الجزء الجديد (ri⋈s) ونضيفه للنتيجة القديمة.

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Query Optimization` | اختيار أفضل استراتيجية تنفيذ متاحة للاستعلام |
| `Heuristics-based optimization` | تطبيق قواعد استكشافية ثابتة لتحسين تمثيل الاستعلام |
| `Cost-based optimization` | اختيار الخطة الأرخص عبر حساب دالة تكلفة |
| `Query tree` | تمثيل شجري لـ relational algebra، له ترتيب تنفيذ محدد |
| `Query graph` | تمثيل لـ relational calculus، بدون ترتيب تنفيذ واحد |
| `Unnesting` | تحويل subquery متداخلة لاستعلام كتلة واحدة (join/semi-join) |
| `Semi-join` | join بدون تكرار صفوف الجدول الأول |
| `Inline view` | subquery موجودة بالـ FROM clause |
| `View merging` | دمج جداول الـ view مع الاستعلام الخارجي بكتلة واحدة |
| `Materialized view` | view نتيجتها مخزّنة فعلياً بدل إعادة الحساب كل مرة |
| `Incremental View Maintenance` | تحديث الـ view بناءً على التغييرات فقط، مو إعادة الحساب كامل |

### 🔑 جداول المقارنة
| المعيار | Heuristics-based | Cost-based |
| --- | --- | --- |
| الأساس | قواعد ثابتة | حساب تكلفة فعلي |
| السرعة بالقرار | أسرع (بدون حسابات معقدة) | أبطأ (يحتاج تقدير تكلفة) |
| الدقة | تقريبية عامة | أدق (خاصة بكل استعلام) |

| المعيار | Materialized evaluation | Pipelined evaluation |
| --- | --- | --- |
| التخزين | يخزن نتيجة كل عملية | لا يخزن، يمرر مباشرة |
| السرعة عادة | أبطأ | أسرع |

### 🔑 المكونات والأدوات
| الأداة | الوظيفة | متى تستخدم |
| --- | --- | --- |
| `σ` (selection) | فلترة الصفوف | طبّقها بأبكر وقت ممكن |
| `π` (projection) | اختيار الأعمدة | طبّقها بأبكر وقت ممكن (بشرط توافق التبديل مع σ) |
| `⨝` (join) | ربط جدولين | بعد فلترة كل جدول لحاله، وبترتيب الأكثر تقييداً أول |
| `Semi-join` | فلترة جدول بناءً على تطابق بجدول آخر بدون تكرار | تحويل subqueries بـ IN/ANY |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | طبّق SELECT و PROJECT قبل JOIN دايماً |
| 2 | نفّذ الشرط الأكثر تقييداً (highest selectivity) أول |
| 3 | Cascade of σ: فكّك شرط AND المركّب لسلسلة σ منفصلة |
| 4 | Commuting σ with π مسموح فقط لو أعمدة شرط σ موجودة بقائمة π |
| 5 | Unnesting يحوّل correlated subquery لـ join أو semi-join |
| 6 | Simple views (select-project-join) تُدمج دايماً؛ GROUP BY views تُدمج حسب التكلفة |
| 7 | Incremental maintenance يحدّث بالتغييرات فقط، مو بإعادة الحساب الكامل |

### 🔑 قاموس المصطلحات
| المصطلح | المعنى |
| --- | --- |
| `Selectivity` | نسبة الصفوف اللي شرط معيّن "يبقيها" من الجدول الأصلي |
| `Correlated subquery` | subquery تعتمد على قيمة من الاستعلام الخارجي بكل تكرار |
| `Access path` | الطريقة اللي الـ DBMS يوصل فيها للبيانات (فهرس، مسح كامل...) |
| `Intermediate result` | نتيجة وسيطة بين خطوتين بخطة تنفيذ الاستعلام |

### 🔑 الخطوات السريعة

#### تحويل استعلام SQL لشجرة محسّنة
```algorithm
1 | ولّد الشجرة الأولية (canonical) | scanner/parser | شجرة كاملة بكل الشروط فوق × واحد كبير
2 | فكّك شروط AND المركبة | Cascade of σ | عدة عمليات σ منفصلة
3 | ادفع كل σ لأقرب موضع ممكن | Commutativity + قواعد الدفع | σ قريبة من الجداول الأساسية
4 | رتّب σ الأكثر تقييداً أول | تحليل selectivity | ترتيب عمليات فلترة محسّن
5 | استبدل × + σ بـ ⨝ | قاعدة الاستبدال | join مباشر بدل ضرب+فلترة
6 | ادفع π لأقرب موضع ممكن | Cascade of π + Commuting σ/π | أعمدة مقلّصة من البداية
```

#### Unnesting لاستعلام متداخل
```algorithm
1 | افحص نوع الـ subquery (EXISTS/IN/ANY) | تحليل الاستعلام | تحديد نوع التحويل المناسب
2 | حوّل EXISTS المرتبطة لـ join مباشر | Unnesting | كتلة استعلام واحدة
3 | حوّل IN/ANY المرتبطة لـ semi-join | Unnesting with Semi-Join | نتيجة بدون تكرار صفوف
```

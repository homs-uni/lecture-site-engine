# المحاضرة — Problem Solving, Search, First-Order Logic & Rule Learning
> **المادة:** الذكاء الاصطناعي (القسم النظري) | **الموضوع:** تمارين على خوارزميات البحث (`BFS`، `Uniform Cost`، `DFS`، `IDS`، `A*`، `Greedy`)، مسألة `Water Pouring`، تمارين `First-Order Logic` و`Unification`، وخوارزميات تعلّم القواعد `Divide and Conquer` و`ILA`
> **Dr. Yosser ATASSI**

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| المرحلة 1: تمثيل المسألة | `State Space`، `Initial State`، `Goal State`، `Successor Function` | صياغة مسألة قابلة للحل بالبحث |
| المرحلة 2: خوارزميات البحث | `BFS`، `DFS`، `UCS`، `IDS`، `Greedy`، `A*` | مسار من الحالة الابتدائية إلى الهدف |
| المرحلة 3: المنطق الرمزي | `First-Order Logic`، `Unification` | تمثيل المعرفة والاستدلال عليها |
| المرحلة 4 ← **أنت هنا أيضاً**: تعلّم القواعد | `Divide and Conquer`، `ILA`، `Rule Induction` | مجموعة قواعد `IF-THEN` قابلة للتفسير من بيانات مصنّفة |

> **نوع هذه المحاضرة:** محاضرة مركّبة (Problem Solving & Search + First-Order Logic + Rule Learning) — كلها أساليب لتمثيل المعرفة والاستدلال عليها ضمن مادة الذكاء الاصطناعي النظري.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مسألة البحث الأولى (رسم S-A-B-C-G)

#### النص الأصلي يقول:
> «Apply search algorithms: BFS, Uniform cost, DFS, IDS, A*, Greedy search» مع رسم بياني: `S` متصلة بـ `A` (تكلفة 1) و`B` (تكلفة 1)، `A` متصلة بـ `B` (تكلفة 9)، `B` متصلة بـ `C` (تكلفة 6) و`G` (تكلفة 12)، `C` متصلة بـ `G` (تكلفة 5). القيم الحمراء بجانب العقد (`A=10`، `S=7`، `B=9`، `C=5`، `G=0`) تمثّل قيم دالة `heuristic` باتجاه الهدف `G`.

#### الشرح المبسّط:
تخيّل أنك تخطط لرحلة بين مدن، وكل طريق بينها له تكلفة (وقود، وقت)، وعندك تخمين تقريبي (`heuristic`) عن المسافة المتبقية لكل مدينة حتى الوجهة النهائية. المطلوب هو تجربة عدة استراتيجيات مختلفة (`BFS`، `DFS`...) لإيجاد الطريق من نقطة البداية `S` إلى الهدف `G`، ومقارنة أيها يجد أقصر طريق وأيها أسرع في البحث فقط دون الاهتمام بالتكلفة.

**لماذا؟** لأن كل خوارزمية بحث تقدّم مقايضة مختلفة بين: هل تضمن إيجاد الحل الأمثل (`Optimality`)، وهل تستهلك ذاكرة أقل، وهل تحتاج معلومة إضافية (`heuristic`) أم لا.

```algorithm
1 | Represent the graph | Adjacency list with edge costs | S→A(1), S→B(1), A→B(9), B→C(6), B→G(12), C→G(5)
2 | Represent the heuristic | Heuristic table h(n) | h(S)=7, h(A)=10, h(B)=9, h(C)=5, h(G)=0
3 | Choose a strategy | BFS / DFS / UCS / IDS / Greedy / A* | Each defines a different node-selection rule from the frontier
4 | Expand nodes | Frontier + Explored set | Follow the chosen strategy until G is reached or frontier is empty
```

**💡 التشبيه**
> تشبيه من الحياة اليومية: البحث في المتاهة أشبه بتجربة عدة طرق مختلفة للوصول إلى الباب الخارجي.
> **وجه الشبه:** الحالة الابتدائية `S` = مكانك الحالي في المتاهة، والهدف `G` = الباب الخارجي، وكل ممر = إجراء ممكن.

---

### 2. مسألة صب الماء (Water Pouring Problem)

#### النص الأصلي يقول:
> «Given a 4 gallon bucket and a 3 gallon bucket, how can we measure exactly 2 gallons into one bucket? There are no markings on the bucket. You must fill each bucket completely. Initial state: The buckets are empty, Represented by the tuple (0 0). Goal state: One of the buckets has two gallons of water in it. Path cost: 1 per unit step.»

#### الشرح المبسّط:
لديك دلوان بلا علامات قياس: سعة 4 وسعة 3 غالون. تريد الوصول لكمية 2 غالون بالضبط في أحدهما، فقط عبر: تعبئة دلو كاملاً، تفريغه بالكامل، أو صب محتواه في الدلو الآخر حتى يمتلئ أو يفرغ المصدر.

**لماذا؟** هذا مثال كلاسيكي يوضّح كيف تُمثَّل مسألة واقعية بلا رسم بياني جاهز على شكل: حالات (Tuples)، ودوال انتقال (Successor Function)، وحالة هدف — قبل تطبيق أي خوارزمية بحث.

```algorithm
1 | Define state | Tuple (x, y) | x = water in 4-gal bucket, y = water in 3-gal bucket
2 | Fill action | (x,y) → (4,y) or (x,y) → (x,3) | Fill a bucket completely
3 | Empty action | (x,y) → (0,y) or (x,y) → (x,0) | Empty a bucket completely
4 | Pour action | (x,y) → (0, x+y) or (4, x+y-4) | Pour bucket 1 into bucket 2
5 | Pour action | (x,y) → (x+y, 0) or (x+y-3, 3) | Pour bucket 2 into bucket 1
6 | Goal test | (x,2) or (2,y) | Stop when either bucket holds exactly 2 gallons
```

**الناتج المتوقع:**
> أحد الحلول الأقصر (6 خطوات): `(0,0) → (0,3) → (3,0) → (3,3) → (4,2) → (0,2)`.

**🤔 تفعيل الفهم (اسأل نفسك):**
> **سؤال:** لماذا لا يمكن أن تكون الحالة `(2,2)` أو `(5,1)` ضمن فضاء الحالات؟
> **لماذا هذا مهم؟** لأن `x` محصور بين 0 و4، و`y` بين 0 و3 — أي قيمة خارج هذا المجال غير قابلة للتمثيل فيزيائياً.

---

### 3. مسألة البحث الثانية (رسم S-F-A-C-B-D-E-G) مع A*

#### النص الأصلي يقول:
> «The graph in the figure below shows the state space of a hypothetical search problem... Note that actions are not reversible, since the graph is oriented... it is easy to verify that such an heuristic never overestimates the true, minimum path cost.»
> جدول القيم: `h(S)=6, h(A)=4, h(B)=5, h(C)=2, h(D)=2, h(E)=8, h(F)=4, h(G)=0`

#### الشرح المبسّط:
هنا الرسم البياني **موجّه** (Directed) أي لا يمكن الرجوع بالاتجاه المعاكس، وهذا يغيّر سلوك بعض الخوارزميات (خاصة `DFS`). دالة `heuristic` المعطاة هنا **مقبولة** (`Admissible`) أي لا تبالغ أبداً في تقدير التكلفة الحقيقية المتبقية — شرط أساسي لضمان أن `A*` يجد الحل الأمثل.

**لماذا؟** لأن ضمان المثالية (`Optimality`) في `A*` يعتمد كلياً على أن `h(n) ≤ h*(n)`.

#### الفهم الخاطئ ❌ / الفهم الصحيح ✅
**الفهم الخاطئ ❌:** الرسم البياني الموجّه لا يؤثر على نتائج البحث، فقط شكل الرسم.
**الفهم الصحيح ✅:** في الرسم الموجّه، بعض الأقواس تُقصر فرص الرجوع لحالة سابقة، مما قد يجعل بعض المسارات تنتهي في طريق مسدود لا يصل للهدف، خاصة في `DFS`.

---

### 4. First-Order Logic — مسألة المترجم (Interpreter)

#### النص الأصلي يقول:
> «Consider a domain where the individuals are people and languages: s(X,L): Person X speaks language L. c(X,Y): Persons X and Y can communicate. i(W,X,Y): Person W can serve as an interpreter between persons X and Y.»

#### الشرح المبسّط:
هذا تمرين كلاسيكي في `First-Order Logic` لترجمة جمل باللغة الطبيعية إلى صيغ منطقية باستخدام `predicates` مثل `s(X,L)` و`c(X,Y)`، ثم استخدام هذه الصيغ لإثبات جملة جديدة عبر الاستدلال المنطقي.

**لماذا؟** لأن تمثيل المعرفة بشكل منطقي رسمي يسمح للحاسوب بالاستنتاج الآلي — وهذا جوهر `Logical Agents`.

#### 📐 المعادلة: الصياغة المنطقية للجمل

$$
\begin{aligned}
&\text{i. } s(j, e) \qquad \text{ii. } s(p, f) \\
&\text{iii. } \forall X, Y, L \; (s(X,L) \land s(Y,L)) \Rightarrow c(X,Y) \\
&\text{iv. } \forall W, X, Y \; (c(W,X) \land c(W,Y)) \Rightarrow i(W,X,Y) \\
&\text{v. } \forall L, M \; \exists X \; s(X,L) \land s(X,M) \\
&\text{vi. } \exists W \; i(W, j, p)
\end{aligned}
$$

#### إثبات (vi) من (i) إلى (v):
1. من `(v)` مع `L=e, M=f`: يوجد شخص `W` يتكلم الإنجليزية والفرنسية معاً.
2. من `(i)` و`(iii)`: `c(W,j)`.
3. من `(ii)` و`(iii)`: `c(W,p)`.
4. من `(iv)`: `i(W,j,p)` وهو المطلوب إثباته.

**💡 التشبيه**
> تخيل شخصاً ثالثاً يتكلم لغتين، فيصبح "جسراً" يربط بين طرفين لا يتشاركان لغة مشتركة، تماماً كما يفعل المترجم البشري.

---

### 5. First-Order Logic — تلوين الخرائط (No two adjacent countries)

#### النص الأصلي يقول:
> «Which of the following First-Order Logic sentences are correct translations of "No two adjacent countries have the same color?"» — الإجابات المحدَّدة: أ) Yes، ب) Yes، ج) No، د) No.

#### الشرح المبسّط:
تمرين على الفرق بين صياغات متكافئة شكلياً (`¬P∨¬Q∨¬R∨¬S` تكافئ `(P∧Q∧R)⇒¬S` عبر `De Morgan`)، مقابل صياغات تستخدم `∧` بدل `⇒` فتغيّر المعنى كلياً.

**لماذا؟** لأن `∀x,y P∧Q` تفرض تحقق الشرط دائماً، بينما نحتاج `⇒` لجعله شرطياً.

#### جدول تحليل الخيارات
| الخيار | الصيغة | صحيح؟ | لماذا |
| --- | --- | --- | --- |
| أ | `¬Country(x)∨¬Country(y)∨¬Adjacent(x,y)∨¬(Color(x)=Color(y))` | ✅ Yes | مكافئ لـ `(P∧Q∧R)⇒¬S` عبر De Morgan |
| ب | `(Country(x)∧Country(y)∧Adjacent(x,y))⇒¬(Color(x)=Color(y))` | ✅ Yes | الصياغة الشرطية المباشرة الصحيحة |
| ج | `Country(x)∧Country(y)∧Adjacent(x,y)∧¬(Color(x)=Color(y))` | ❌ No | يفرض أن كل زوج متجاور موجود فعلاً بدل جعله شرطاً |
| د | `(Country(x)∧Country(y)∧Adjacent(x,y))⇒Color(x≠y)` | ❌ No | خطأ تركيبي: `Color` محمول أحادي لا يقارن كيانين هكذا |

**⚠️ مهم للامتحان**
> أي جملة تبدأ بـ `∀x,y P∧Q` بدل `∀x,y (P∧Q)⇒R` غالباً خطأ لأنها تفرض تحقّق الشرط بدل جعله افتراضياً.

---

### 6. Unification (توحيد التعابير)

#### النص الأصلي يقول:
> «Are the following two expressions unifiable? P(x, g(y, A, h(y, B))) and P(h(A,B), g(A, y, x))» → `MGU = {x/h(A,B), y/A}`

#### الشرح المبسّط:
`Unification` هي إيجاد إحلال (`substitution`) للمتغيرات يجعل تعبيرين منطقيين متطابقين تماماً، عبر مطابقة موضعاً بموضع:
- `x` مقابل `h(A,B)` → `x/h(A,B)`.
- `g(y,A,h(y,B))` مقابل `g(A,y,x)`: `y` مقابل `A` → `y/A`؛ `A` مقابل `y` → متسق؛ `h(y,B)` مقابل `x` → بعد `y=A` نحصل `h(A,B)` وهذا مطابق لإحلال `x` السابق — لا تعارض.

**لماذا؟** لأن `Unification` أساس خوارزميات `Resolution` و`Forward/Backward Chaining`.

```algorithm
1 | Compare outer functor | P(...) vs P(...) | Same functor and arity → proceed
2 | Match argument 1 | x vs h(A,B) | Substitute x/h(A,B)
3 | Match argument 2 | g(y,A,h(y,B)) vs g(A,y,x) | Same functor g, recurse into sub-arguments
4 | Sub-argument 1 | y vs A | Substitute y/A
5 | Sub-argument 2 | A vs y | Consistent with y/A
6 | Sub-argument 3 | h(y,B) vs x | After y/A: h(A,B) vs x → consistent with x/h(A,B)
7 | Conclude | No conflicts | MGU = {x/h(A,B), y/A}
```

---

### 7. خوارزمية فرّق تسد (Divide and Conquer) — مسألة الموافقة على قرض مصرفي

#### النص الأصلي يقول:
> «الموافقة على قرض مصرفي: OK: الموافقة على القرض. APP: تخمين الضمانة أكبر من مبلغ القرض. RATING: للعميل دفعات دوريّة منتظمة. INC: يتجاوز دخل العميل مصاريفه. BAL: للعميل صفحة موازنة ممتازة.» مع جدول بيانات من 9 أمثلة بقيم ثنائية (0/1).

#### الشرح المبسّط:
ننتقل الآن من البحث والمنطق الرمزي إلى موضوع مرتبط: **تعلّم القواعد آلياً من بيانات**. نريد استخراج قاعدة مثل "إذا كان دخل العميل ممتازاً ولديه ضمانة كافية، وافق على القرض" — لكن آلياً من 9 حالات سابقة، بدل اختراعها يدوياً.

**لماذا؟** لأن القواعد المستخلَصة آلياً قابلة للتفسير (Interpretable)، وهذا مهم في قرارات حساسة كالقرارات المصرفية.

**💡 التشبيه**
> كطبيب يراجع سجلات مرضى سابقين ليستنتج قاعدة عامة تربط الأعراض بالتشخيص.

---

### 8. فكرة الخوارزمية: البحث عن القاعدة التي تغطي أكبر عدد من الأمثلة الموجبة

#### النص الأصلي يقول:
> «نحاول في هذه الطريقة أولاً أن نجد قاعدة واحدة تغطي الأمثلة الموجبة فقط... وذلك بالبدء بقاعدة تغطي جميع الأمثلة الموجبة والسالبة ثم نجعلها بالتدريج أكثر خصوصيّة... الأمثلة التي تأخذ فيها OK القيمة True نسميّها أمثلة موجبة أمّا التي تأخذ فيها القيمة False نسميّها سالبة.»

#### الشرح المبسّط:
تبدأ الخوارزمية بقاعدة عامة جداً `True ⇒ OK` (خاطئة لأنها تغطي حتى الحالات المرفوضة)، ثم تُضاف شروط (ذرّات) واحداً تلو الآخر لتضييق نطاقها تدريجياً حتى **لا تغطي أي مثال سالب**، مع محاولة تغطية أكبر عدد ممكن من الأمثلة الموجبة.

**لماذا؟** الهدف: قواعد **صحيحة تماماً** (لا تغطي سالباً) و**مفيدة** (تغطي أكبر عدد ممكن من الموجب) — مفاضلة أساسية بين الدقة والتغطية.

```algorithm
1 | Start with general rule | True ⇒ OK | Covers all positive and negative examples
2 | Compute coverage ratio | r_alpha = n_alpha+ / n_alpha for each candidate attribute | Measures purity if attribute added
3 | Select best attribute | Attribute with maximum r_alpha | Add it as a new condition (specialize)
4 | Check purity | Does the rule now cover zero negative examples? | If yes stop; if no repeat 2-3
```

**📐 المعادلة: معدّل تغطية الذرّة**
$$
r_\alpha = \frac{n_\alpha^+}{n_\alpha}
$$
**الشرح:** `n_α⁺`: عدد الأمثلة الموجبة بعد إضافة `α`. `n_α`: العدد الكلي (موجب+سالب) المُغطّى بعد إضافة `α`. كلما اقترب `r_α` من 1 كانت الذرّة أفضل.

---

### 9. التطبيق العملي خطوة بخطوة على مثال القرض المصرفي

#### النص الأصلي يقول:
> «وتكون هذه القيَم في مثالنا: r_APP = 3/6 = 0.5, r_RATING = 4/6 = 0.6, r_INC = 3/6 = 0.5, r_BAL = 3/4 = 0.75. إذاً سنختار الذرّة BAL... مما يعطي القاعدة: BAL ⇒ OK»

#### الشرح المبسّط:
من بين الذرّات الأربع نختار `BAL` (أعلى `r=0.75`). لكن `BAL ⇒ OK` **ليست مثالية**: تغطي مثالاً سالباً واحداً (الصف 1)، فيجب الاستمرار بالبحث عن ذرّة إضافية.

**لماذا؟** لأن الاختيار الأمثل في كل خطوة (Greedy) لا يضمن الوصول مباشرة لقاعدة نقية 100%.

#### الفهم الخاطئ ❌ / الفهم الصحيح ✅
**الفهم الخاطئ ❌:** بمجرد اختيار أعلى `r_α`، تصبح القاعدة نهائية تلقائياً.
**الفهم الصحيح ✅:** يجب التحقق دائماً هل القاعدة الجديدة تغطي أي مثال سالب؛ إن كانت تغطي، أضِف ذرّة أخرى قبل قبولها.

---

### 10. تنقية القاعدة، ثم اكتشاف أنها صحيحة لكن غير كافية

#### النص الأصلي يقول:
> «سنقوم بالبحث عن ذرّة أخرى... نجد أنّه عندما BAL موجباً فإنّ: r_APP = 2/3, r_RATING = 3/3, r_INC = 2/2... نلاحظ أنّه لدينا تعادل بين r_RATING وَ r_INC وسنختار الذرّة RATING لأنّها تغطّي مجموعة أكبر من الأمثلة، فنحصل على القاعدة الجديدة: BAL ∧ RATING ⇒ OK وهذه القاعدة صحيحة... ولكنها بنفس الوقت لا تُغَطِّ جميع الأمثلة الموجبة... إذ أنها لا تُغَطِّ المثال الموجب رقم 6.»

#### الشرح المبسّط:
بعد اختيار `BAL`، نُقيَّد البحث فقط على الأسطر حيث `BAL=1`، ونعيد حساب `r_α`. `RATING` تعطي `r=1.0` (نقية تماماً)، وعند التعادل مع `INC` نختار الأوسع تغطية. القاعدة `BAL ∧ RATING ⇒ OK` **صحيحة 100%** لكنها **ناقصة**: المثال 6 (`OK=1` لكن بدون `BAL=1`) لا تُغطّى — أي يوجد سبب آخر مستقل يبرر موافقته.

**لماذا؟** لأن أنظمة تعلّم القواعد غالباً تنتج **مجموعة قواعد** لأن الظاهرة الحقيقية قد يكون لها أكثر من سبب منطقي مستقل.

**🤔 تفعيل الفهم (اسأل نفسك):**
> **سؤال:** ماذا يعني أن تكون قاعدة "صحيحة" لكنها ليست "كاملة"؟
> **لماذا هذا مهم؟** لأن هذا الفرق هو معيار التوقف الأساسي في `Divide and Conquer`.

#### الحالتان الجوهريتان (ملاحظات نظرية)
1. **قاعدة "غير نقية" (تغطي سالباً واحداً على الأقل)** → أضف ذرّة جديدة (Specialization).
2. **قاعدة "نقية" لكن ناقصة (لا تغطي كل الموجب)** → ابدأ قاعدة جديدة تماماً من `True ⇒ OK` على الأمثلة الموجبة المتبقية فقط.

```algorithm
1 | Test current rule | Does it cover ≥1 negative example? | If yes → specialize; if no → check completeness
2 | Specialize | Add best new attribute (highest r_alpha) | Loop back to step 1
3 | Check completeness | Does the pure rule cover all positive examples? | If yes → STOP; single rule suffices
4 | Divide | Remove already-covered positives, restart True ⇒ OK on remaining rows | "Conquer next sub-problem"
```

**💡 التشبيه**
> كفرز صندوق فواكه: قاعدة لفرز التفاح، ثم الانتقال للفواكه المتبقية غير المصنّفة لإيجاد قاعدة تفرز الموز.

---

### 11. متابعة المثال: حذف الأمثلة المُغطّاة، واستكمال بناء القاعدة الثانية

#### النص الأصلي يقول:
> «نبدأ بحذف جميع الأمثلة الموجبة المغَطّاة بالقاعدة الأولى وهي الأمثلة 3, 4, 7... r_APP=1/4, r_RATING=1/3, r_INC=1/4, r_BAL=0/1... نختار الذرّة RATING... نجد أنّ هذه القاعدة تغطّي المثالين السالبَين 5 وَ 9... [تعادل بين r_APP وَ r_INC، نختار APP]... لكنّ هذه القاعدة تغطّي مثالاً سالباً... إذاً الذرّة INC ستتمّ إضافتها لنحصل على القاعدة RATING ∧ APP ∧ INC ⇒ OK»

#### الشرح المبسّط:
نحذف الأسطر 3، 4، 7 (المُغطّاة موجبة)، ونعيد البحث على الباقي (1,2,5,6,8,9) الذي يضم المثال 6. نختار `RATING` (أعلى نسبة `1/3`)، لكنها غير نقية (تغطي 5 و9 السالبين)، فنضيف `APP` (تعادل مع `INC`، لكن APP أوسع تغطية على الجدول الأصلي)، فتصبح `RATING ∧ APP ⇒ OK` لكنها لا تزال تغطي المثال السالب 9، فنضيف `INC` أخيراً لنصل لقاعدة نقية تماماً `RATING ∧ APP ∧ INC ⇒ OK` تغطي المثال الموجب 6 المتبقي.

**لماذا؟** يوضح أن الخوارزمية قد تحتاج أكثر من ذرّة قبل الوصول لقاعدة نقية، وأن التعادل بين ذرّتين يُحسم غالباً باختيار الأوسع تغطية على الجدول الأصلي الكامل.

**الناتج المتوقع:**
> مجموعة القواعد النهائية: 1) `BAL ∧ RATING ⇒ OK` 2) `RATING ∧ APP ∧ INC ⇒ OK`

---

### 12. خوارزمية Induction Learning Algorithm (ILA) — الخطوات الرسمية

#### النص الأصلي يقول:
> «Step1: Partition the table which contains m examples into n sub-tables. One table for each possible value of the class attribute... Step4: For each combination of attributes, count the number of occurrences of attribute values that appear under the same combination of attributes in unmarked rows of the sub-table under consideration but at the same time that should not appear under the same combination of attributes of other sub-tables... Step7: Add a rule to R...»

#### الشرح المبسّط:
`ILA` أكثر رسمية وعمومية من `Divide and Conquer` أعلاه، لكنها تشترك بالفكرة الجوهرية: **البحث عن أكثر توليفة سمات (Attribute Combination) شيوعاً** تُميّز صفاً معيناً (Class) عن غيره، ثم تحويلها لقاعدة، وتكرار العملية حتى تُصنَّف كل الصفوف.

**لماذا؟** الفرق الأساسي: `ILA` يبدأ بمجموعة واحدة من السمات (`j=1`) ويزيد حجمها تدريجياً (`j=2,3...`) إن لم يجد توليفة صالحة، بدل إضافة ذرّة واحدة لقاعدة سابقة دوماً — أكثر مرونة لاكتشاف قواعد مركّبة من البداية.

```algorithm
1 | Partition table | Split m examples into n sub-tables by class value | One sub-table per distinct class value
2 | Initialize j | j = 1 | Start searching with single-attribute combinations
3 | Generate combinations | All distinct combinations of j attributes | e.g., for j=1: {size},{color},{shape}
4 | Count occurrences | Count matching unmarked rows in current sub-table NOT appearing in other sub-tables | Call best one max-combination
5 | Check empty | If max-combination = φ | Increase j by 1, go back to Step 3
6 | Mark rows | Mark all rows matching max-combination as classified | These rows are now "covered"
7 | Add rule | IF max-combination attributes THEN class value | Add to rule set R
8 | Check completion | If all rows marked, move to next sub-table (reset j=1); else repeat Step 4 | Exit with full rule set when no sub-tables remain
```

**⚠️ مهم للامتحان**
> خطوة 4 تشترط أن تظهر التوليفة في الجدول الفرعي الحالي **لكن لا تظهر بنفس القيم** في الجداول الفرعية الأخرى — يضمن ذلك أن القاعدة لا تُخطئ بتصنيف أمثلة تخص صفوفاً أخرى.

---

### 13. مثال تطبيقي على ILA (Size, Color, Shape → Decision)

#### النص الأصلي يقول:
> «For sub-table1: J=1 size: the value of max-combination is "medium" occurrence =1. J=2 color: the value of max-combination is "green" occurrence =2... Rule1: IF color is green THEN the decision is yes»

#### الشرح المبسّط:
بعد تقسيم الجدول لجدولين فرعيين (Yes/No)، نبحث في Sub-Table 1 عن أكثر قيمة تتكرر بدءاً بـ `j=1`. `color=green` تتكرر مرتين (أكثر من `size=medium` مرة واحدة)، ولا تظهر في Sub-Table 2 — فتصبح القاعدة الأولى.

**لماذا؟** الشرط الأساسي: اختيار القيمة الأكثر تكراراً **والتي تُميّز** الصف عن غيره بوضوح — مشابه لمعدّل `r_α` لكن بصياغة عد بسيطة.

**النتيجة الكاملة (أربع قواعد):**
1. `IF color is green THEN yes` 2. `IF shape is sphere THEN yes` 3. `IF shape is wedge THEN no` 4. `IF size is large AND color is red THEN no`

---

### 14. مثال ثانٍ: Outlook/Temperature/Humidity/Windy → Class (P/N)

#### النص الأصلي يقول:
> جدول من 14 مثالاً بأربع سمات (`Outlook`, `Temperature`, `Humidity`, `Windy`) وصف نهائي (Class: P/N).

#### الشرح المبسّط:
هذا المثال الكلاسيكي ("Play Tennis") يوضّح بناء مجموعة قواعد كاملة: القاعدة الأولى تُغطي أكبر عدد من الموجب بأبسط شرط (`Outlook=overcast`)، ثم قواعد أكثر تخصيصاً لتغطية الباقي.

**الناتج المتوقع (القواعد الخمس):**
1. `IF outlook is overcast THEN Positive` 2. `IF outlook is sunny AND humidity is high THEN Negative` 3. `IF outlook is rain AND windy is true THEN Negative` 4. `IF outlook is rain AND windy is false THEN Positive` 5. `IF outlook is sunny AND humidity is normal THEN Positive`

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `State Space` | مجموع كل الحالات الممكنة للمسألة | جدول (x,y) في مسألة الدلاء |
| `Admissible Heuristic` | دالة تقدير لا تبالغ أبداً في تقدير التكلفة الحقيقية | `h(n) ≤ h*(n)` لكل عقدة n |
| `Unification` | إيجاد إحلال يجعل تعبيرين متطابقين | `MGU` أعم إحلال ممكن |
| `Rule Induction` | استخلاص قواعد `IF-THEN` آلياً من بيانات مصنَّفة | `BAL ∧ RATING ⇒ OK` |
| `Positive/Negative Examples` | الأمثلة التي يتحقق فيها الصف الهدف مقابل التي لا يتحقق فيها | `OK=True` مقابل `OK=False` |
| `Coverage Ratio (r_α)` | نسبة الأمثلة الموجبة إلى إجمالي الأمثلة المغطاة بعد إضافة ذرّة | `r_BAL = 3/4 = 0.75` |
| `Correct` مقابل `Complete Rule` | لا تغطي سالباً؛ مقابل تغطي كل الموجب | قد تكون صحيحة وغير كاملة معاً |
| `max-combination` | توليفة السمات الأكثر تكراراً دون تكرارها في جداول أخرى | `color=green` |

### جداول مقارنات سريعة
| المقارنة | BFS | DFS | UCS | A* |
| --- | --- | --- | --- | --- |
| بنية الـ Frontier | `Queue` | `Stack` | `Priority Queue` بـ`g(n)` | `Priority Queue` بـ`f(n)=g+h` |
| Optimality | فقط بتكاليف متساوية | لا | نعم | نعم (مع h مقبولة) |

| المقارنة | Divide and Conquer | ILA |
| --- | --- | --- |
| معيار الاختيار | أعلى نسبة `n_α⁺/n_α` | أكثر تكرار (Count) لتوليفة حصرية |
| بداية البحث | ذرّة تُضاف لقاعدة قائمة | توليفات حجم `j=1` تزداد تدريجياً |

### أبرز النقاط الذهبية
1. اختيار خوارزمية البحث يعتمد على: توفر `heuristic`، الحاجة لضمان المثالية، قيود الذاكرة.
2. `A*` مع heuristic مقبولة يضمن دائماً الحل الأمثل.
3. صياغة FOL الصحيحة لجمل "لا شيئين متشابهين" تستخدم `⇒` لا `∧`.
4. القاعدة يجب أن تكون **صحيحة** (لا تغطي سالباً) قبل التفكير في هل هي **كافية** (تغطي كل الموجب).
5. عند التعادل بين ذرّتين، تُختار الأوسع تغطية على الجدول الكامل.

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| اعتبار DFS دائماً أسوأ من BFS | DFS أفضل ذاكرة، لكنه غير مكتمل/مثالي عموماً |
| الخلط بين g(n) وh(n) في A* | g(n) تكلفة ماضية فعلية، h(n) تقدير مستقبلي |
| استخدام `∧` بدل `⇒` في FOL الشرطية | `∧` يفرض التحقق دائماً بدل جعله شرطياً |
| التوقف عند أول قاعدة نقية دون فحص الاكتمال | تحقق دائماً من تغطية كل الموجب قبل التوقف |
| نسيان حذف الأمثلة المُغطّاة قبل قاعدة جديدة | يجب حذفها لتجنب استخراج نفس القاعدة مجدداً |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ Breadth-First Search (BFS)
```algorithm
1 | Initialize | Frontier = Queue([Start]) | Add the initial node
2 | Check goal | Test the front of the queue | If it is the goal, return the path
3 | Expand | Dequeue front node, generate children | Add unvisited children to back of queue
4 | Repeat | Loop until frontier empty or goal found | Shortest path in edge-count for uniform costs
```

#### ⚙️ Depth-First Search (DFS)
```algorithm
1 | Initialize | Frontier = Stack([Start]) | Add the initial node
2 | Expand | Pop top node, test goal | If goal, return path
3 | Push children | Add children on top of stack | Deepest branch explored first
4 | Repeat | Backtrack when exhausted | May loop forever without cycle checking
```

#### ⚙️ Uniform-Cost Search (UCS)
```algorithm
1 | Initialize | Priority Queue ordered by g(n) | Start node g=0
2 | Expand | Pop node with smallest g(n) | Test goal only when popped
3 | Update | g(child)=g(parent)+cost | Add/replace if cheaper path found
4 | Repeat | Until goal popped | Guarantees optimal path cost
```

#### ⚙️ Iterative Deepening Search (IDS)
```algorithm
1 | Initialize | limit = 0 | Depth-limited search with increasing bound
2 | Run DLS | Depth-Limited DFS with current limit | If goal found, return path
3 | Increase | limit = limit + 1 | Repeat with new limit
4 | Repeat | Until goal found | Re-explores shallow nodes (acceptable trade-off)
```

#### ⚙️ Greedy Best-First Search
```algorithm
1 | Initialize | Priority Queue ordered by h(n) | Evaluated by heuristic only
2 | Expand | Pop node with smallest h(n) | Test if goal
3 | Generate children | Compute h(child) | Add to priority queue
4 | Repeat | Until goal found | Fast but not complete/optimal in general
```

#### ⚙️ A* Search
```algorithm
1 | Initialize | Priority Queue ordered by f(n)=g(n)+h(n) | f(start)=h(start)
2 | Expand | Pop smallest f(n) | Test goal when popped
3 | Generate children | f(child)=g(parent)+cost+h(child) | Add/update in queue
4 | Repeat | Until goal popped | Optimal if h(n) admissible
```

#### ⚙️ Divide and Conquer لتعلّم القواعد
```algorithm
1 | Start rule | current_rule = True ⇒ OK | Covers all examples initially
2 | Compute ratio | r_alpha = n_alpha+ / n_alpha for unused attributes | Choose max
3 | Specialize | current_rule = current_rule ∧ attribute | Restrict examples accordingly
4 | Test purity | Covers any negative? | If yes repeat 2-3; if no go to 5
5 | Test completeness | Covers all positives? | If yes STOP; if no add to R, remove covered, restart on rest
```

#### ⚙️ Induction Learning Algorithm (ILA)
```algorithm
1 | Partition | Split table into n sub-tables (one per class value)
2 | Initialize j=1 | Start with single-attribute combinations
3 | Generate & count | Count matching unmarked rows not conflicting with other sub-tables | Find max-combination
4 | Handle empty | If none found, increase j by 1, retry step 3
5 | Mark & extract rule | Mark matched rows classified, add rule to R | Repeat until sub-table fully marked
```

### الأفكار الرئيسية الشاملة
الفكرة المحورية: البحث بأنواعه واختيار القواعد بأنواعه يشتركان بنفس المنطق العميق — استكشاف منظّم لفضاء الاحتمالات (حالات أو قواعد) وفق معيار تقييم (تكلفة/heuristic أو نسبة تغطية)، مع التوقف عند تحقق شرط الهدف (Goal Test أو Correctness+Completeness).

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **18 سؤالاً** — تغطي البحث/FOL (9 أسئلة) وتعلّم القواعد (9 أسئلة).

### السؤال 1 (medium)
ما الفرق الجوهري بين `BFS` و`UCS`؟
أ) لا فرق، هما نفس الخوارزمية
ب) `BFS` يستخدم `Stack` بينما `UCS` يستخدم `Queue`
ج) `BFS` يوسّع حسب عدد الخطوات، بينما `UCS` يوسّع حسب التكلفة الإجمالية `g(n)`
د) `UCS` لا يضمن الاكتمال أبداً

**الإجابة الصحيحة: ج**
**التعليل:** (ب) مقلوب: كلاهما Queue، لكن UCS أولوية مرتبة. (د) خاطئ، UCS مكتمل مع تكاليف موجبة.

---

### السؤال 2 (medium)
في مسألة الدلاء، ما هو تمثيل الحالة الابتدائية؟
أ) `(4,3)` ب) `(0,0)` ج) `(2,0)` د) `(4,0)`

**الإجابة الصحيحة: ب**

---

### السؤال 3 (hard)
لماذا لا يضمن `Greedy Best-First Search` إيجاد الحل الأمثل؟
أ) لأنه يستخدم `g(n)` فقط
ب) لأنه يتجاهل التكلفة الماضية `g(n)` ويعتمد فقط على `h(n)`
ج) لأنه يستخدم `Stack` بدل `Queue`
د) لأنه لا يتوقف أبداً

**الإجابة الصحيحة: ب**

---

### السؤال 4 (medium)
أي شرط ضروري لضمان مثالية `A*`؟
أ) أن تكون `h(n)` مساوية دائماً لـ `g(n)`
ب) أن تكون `h(n)` دالة مقبولة (Admissible)
ج) أن تكون كل تكاليف الأقواس متساوية
د) أن يكون الرسم البياني غير موجّه

**الإجابة الصحيحة: ب**

---

### السؤال 5 (hard)
عند تطبيق Unification على `P(x,g(y,A,h(y,B)))` و`P(h(A,B),g(A,y,x))`، ما أول إحلال يُستنتج؟
أ) `y/B` ب) `x/h(A,B)` ج) `A/x` د) لا يوجد إحلال

**الإجابة الصحيحة: ب**

---

### السؤال 6 (hard)
لماذا لا يمكن ترجمة "No two adjacent countries have the same color" باستخدام `∧` بدل `⇒`؟
أ) لأن `∧` أبطأ حسابياً
ب) لأن `∧` تفرض أن الشرط متحقق دائماً لكل زوج بدل جعله اختيارياً
ج) لأن `∧` غير معرّفة في FOL
د) لا فرق فعلي

**الإجابة الصحيحة: ب**

---

### السؤال 7 (medium)
ما دور `∃` في البند `v` من مسألة المترجم؟
أ) كل شخص يتكلم كل اللغات
ب) وجود شخص واحد على الأقل يحقق الشرط
ج) الشخص وحيد بالضرورة
د) لا معنى منطقي له

**الإجابة الصحيحة: ب**

---

### السؤال 8 (medium)
أي خوارزمية تستخدم `heuristic` فقط دون معلومة عن التكلفة الماضية؟
أ) `UCS` ب) `BFS` ج) `Greedy Best-First Search` د) `IDS`

**الإجابة الصحيحة: ج**

---

### السؤال 9 (hard)
متى نتوقف رسمياً عن البحث في `A*`؟
أ) عند توليد الهدف لأول مرة في أي مكان
ب) عند إخراج (Pop) عقدة الهدف من طابور الأولوية
ج) عند الوصول لأقصى عمق محدد
د) عند فراغ الذاكرة

**الإجابة الصحيحة: ب**

---

### السؤال 10 (medium)
ما معنى أن مثالاً هو "موجب" (Positive) في سياق تعلّم القواعد؟
أ) أن قيمة السمة `BAL` تساوي 1
ب) أن قيمة صف القرار (OK) تساوي True
ج) أن كل السمات قيمتها 1
د) أن المثال يحتوي أقل عدد من السمات

**الإجابة الصحيحة: ب**

---

### السؤال 11 (hard)
في مثال القرض، لماذا اختِيرت `BAL` كأول ذرّة؟
أ) لأن `BAL` أعلى قيمة `r_α` (0.75) بين جميع الذرّات
ب) لأن `BAL` أبجدياً قبل `RATING`
ج) لأن `RATING` غير موجودة في الجدول
د) لا يوجد سبب، الاختيار عشوائي

**الإجابة الصحيحة: أ**

---

### السؤال 12 (medium)
ماذا يعني أن القاعدة `BAL ∧ RATING ⇒ OK` "صحيحة لكن غير كاملة"؟
أ) لا تغطي أي مثال سالب، لكنها لا تغطي كل الموجب
ب) تحتوي خطأً برمجياً
ج) تغطي كل الأمثلة السالبة فقط
د) غير قابلة للاستخدام إطلاقاً

**الإجابة الصحيحة: أ**

---

### السؤال 13 (hard)
ماذا يجب فعله بعد اكتشاف أن القاعدة صحيحة لكن غير كاملة؟
أ) التوقف فوراً واعتبارها القاعدة الوحيدة
ب) حذف الأمثلة الموجبة المُغطّاة والبدء بقاعدة جديدة من `True ⇒ OK`
ج) حذف كل الأمثلة السالبة من الجدول
د) إعادة حساب r_α لنفس القاعدة دون تغيير

**الإجابة الصحيحة: ب**

---

### السؤال 14 (medium)
ما أول شيء تفعله خوارزمية `ILA` قبل أي بحث عن قواعد؟
أ) حساب `r_α` لكل السمات
ب) تقسيم الجدول إلى جداول فرعية حسب قيمة صف القرار
ج) حذف كل الأمثلة السالبة نهائياً
د) دمج كل السمات في سمة واحدة

**الإجابة الصحيحة: ب**

---

### السؤال 15 (hard)
لماذا تزيد خوارزمية `ILA` قيمة `j` بدل الاكتفاء بـ `j=1` دائماً؟
أ) لأن `j=1` ممنوعة نظرياً
ب) لأنه أحياناً لا توجد سمة مفردة كافية للتمييز، فنحتاج توليفة أكبر
ج) لتقليل عدد القواعد فقط
د) لا علاقة لـ`j` بجودة التمييز

**الإجابة الصحيحة: ب**

---

### السؤال 16 (medium)
في مثال Size/Color/Shape، لماذا اختِيرت `color=green` قبل `size=medium`؟
أ) لأن `green` تتكرر مرتين بينما `medium` مرة واحدة فقط
ب) لأن الألوان أولوية دائماً في `ILA`
ج) لأن `size` غير موجودة في الجدول
د) لا يوجد فرق بينهما

**الإجابة الصحيحة: أ**

---

### السؤال 17 (hard)
ماذا يعني اشتراط "لا تظهر بنفس القيمة في الجداول الفرعية الأخرى" عند اختيار max-combination؟
أ) شرط غير ضروري
ب) يضمن أن القاعدة لا تُصنّف خطأً أمثلة تخص صفاً آخر
ج) يعني أن القاعدة يجب أن تكون فريدة أبجدياً
د) لا علاقة له بجودة القاعدة

**الإجابة الصحيحة: ب**

---

### السؤال 18 (medium)
ما الهدف النهائي المشترك بين البحث وتعلّم القواعد في هذه المحاضرة؟
أ) استكشاف منظّم لفضاء احتمالات (حالات أو قواعد) وفق معيار تقييم، حتى الوصول لهدف/حل صحيح
ب) بناء شبكة عصبية معقدة فقط
ج) توحيد تعبيرين منطقيين حصراً
د) لا يوجد أي هدف مشترك بينهما

**الإجابة الصحيحة: أ**

---

## الجزء الرابع: أسئلة تصحيح الخوارزميات (Pseudocode)

> **6 أسئلة** — 3 من البحث/المنطق، 3 من تعلّم القواعد.

### سؤال تصحيح 1 (logic) — UCS

**الكود التالي يحتوي خطأ:**
```text
function UCS(start, goal):
    frontier = PriorityQueue ordered by g(n)
    add start to frontier with g=0
    while frontier is not empty:
        n = frontier.pop_min()
        add n to explored
        for each child c of n:
            if c not in explored:
                frontier.add(c)   // BUG: goal test missing, cost not updated
    return failure
```
**اكتشف الخطأ:** لا اختبار للهدف عند إخراج `n`، ولا حساب لتكلفة الطفل.

**التصحيح:**
```text
function UCS(start, goal):
    frontier = PriorityQueue ordered by g(n)
    add start to frontier with g=0
    while frontier is not empty:
        n = frontier.pop_min()
        if n == goal: return path(n)
        add n to explored
        for each child c of n:
            g_c = g(n) + cost(n, c)
            if c not in explored or g_c < g(c):
                frontier.add_or_update(c, g_c)
    return failure
```
**شرح الحل:** يجب اختبار الهدف عند الإخراج لضمان المثالية، وحساب `g(c)=g(parent)+cost` وتحديثها إن وُجد مسار أرخص.

---

### سؤال تصحيح 2 (misconception) — Greedy مقابل A*

**الكود التالي يحتوي خطأ:**
```text
function GreedySearch(start, goal):
    frontier = PriorityQueue ordered by f(n) = g(n) + h(n)   // BUG
    ...
```
**اكتشف الخطأ:** `f(n)=g(n)+h(n)` تعريف `A*` وليس `Greedy`.

**التصحيح:**
```text
function GreedySearch(start, goal):
    frontier = PriorityQueue ordered by h(n)   // heuristic only
    ...
```
**شرح الحل:** `Greedy` يعتمد فقط على `h(n)`. الخلط بينهما وبين `A*` من أكثر الأخطاء شيوعاً.

---

### سؤال تصحيح 3 (infinite_loop) — DFS

**الكود التالي يحتوي خطأ:**
```text
function DFS(start, goal):
    stack = [start]
    while stack is not empty:
        n = stack.pop()
        if n == goal: return path(n)
        for each child c of n:
            stack.push(c)   // BUG: no visited check
```
**اكتشف الخطأ:** عدم تتبع العقد المُستكشَفة يسبب حلقة لا نهائية في الرسومات الدائرية.

**التصحيح:**
```text
function DFS(start, goal):
    stack = [start]
    explored = {}
    while stack is not empty:
        n = stack.pop()
        if n == goal: return path(n)
        add n to explored
        for each child c of n:
            if c not in explored and c not in stack:
                stack.push(c)
```
**شرح الحل:** إضافة فحص `explored` يوقف التكرار اللانهائي في الدورات (Cycles).

---

### سؤال تصحيح 4 (logic) — Divide and Conquer

**الكود التالي يحتوي خطأ:**
```text
function DivideAndConquer(examples):
    rule = "True ⇒ OK"
    while rule covers at least one negative example:
        best_attr = attribute with maximum n_alpha   // BUG: should use ratio, not raw count
        rule = rule AND best_attr
    return rule
```
**اكتشف الخطأ:** استخدام العدد الكلي `n_α` بدل النسبة `r_α = n_α⁺/n_α`.

**التصحيح:**
```text
function DivideAndConquer(examples):
    rule = "True ⇒ OK"
    while rule covers at least one negative example:
        best_attr = attribute with maximum r_alpha = n_alpha_positive / n_alpha
        rule = rule AND best_attr
    return rule
```
**شرح الحل:** ذرّة قد تغطي عدداً كبيراً لكن معظمه سالب، فتكون نسبتها منخفضة رغم عددها الكبير. `r_α` هو المعيار الصحيح.

---

### سؤال تصحيح 5 (misconception) — اكتمال التغطية

**الكود التالي يحتوي خطأ:**
```text
function DivideAndConquer(examples):
    rule = "True ⇒ OK"
    while rule covers at least one negative example:
        add best attribute to rule
    return rule   // BUG: stops without checking completeness
```
**اكتشف الخطأ:** يتوقف بمجرد نقاء القاعدة دون التحقق من تغطية **كل** الأمثلة الموجبة.

**التصحيح:**
```text
function DivideAndConquer(examples):
    rule_set = []
    remaining = examples
    while remaining has positive examples not yet covered:
        rule = "True ⇒ OK"
        while rule covers at least one negative example in remaining:
            add best attribute to rule
        rule_set.add(rule)
        remaining = remaining - (positive examples covered by rule)
    return rule_set
```
**شرح الحل:** يجب التحقق من الاكتمال بعد كل قاعدة نقية، وإلا حذف المُغطّى والبدء بقاعدة جديدة. الناتج مجموعة قواعد وليس قاعدة واحدة بالضرورة.

---

### سؤال تصحيح 6 (infinite_loop) — ILA

**الكود التالي يحتوي خطأ:**
```text
function ILA(table):
    j = 1
    while table has unmarked rows:
        combination = best combination of j attributes
        if combination == empty:
            // BUG: missing j = j + 1, infinite loop
            continue
        mark rows matching combination
        add rule
    return rules
```
**اكتشف الخطأ:** عدم زيادة `j` عند فشل إيجاد توليفة يسبب حلقة لا نهائية.

**التصحيح:**
```text
function ILA(table):
    j = 1
    while table has unmarked rows:
        combination = best combination of j attributes
        if combination == empty:
            j = j + 1
            continue
        mark rows matching combination
        add rule
        j = 1
    return rules
```
**شرح الحل:** يجب زيادة `j` عند الفشل (Step 5)، وإعادة ضبطها إلى 1 بعد كل قاعدة ناجحة.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> **6 تمارين** — 3 من البحث/المنطق، 3 من تعلّم القواعد. ليست في المحاضرة الأصلية.

### تمرين 1: تتبع UCS على الرسم الأول — `search_trace`

**المطلوب:** طبّق `UCS` وابحث عن أقل تكلفة من `S` إلى `G` (رسم: S-A(1),S-B(1),A-B(9),B-C(6),B-G(12),C-G(5)).

**نموذج الحل:**
| الخطوة | العقدة | g(n) | التفسير |
| --- | --- | --- | --- |
| 1 | S | 0 | البداية |
| 2 | A,B | 1 | عبر S |
| 4 | C | 7 | عبر B (1+6) |
| 4 | G | 13 | عبر B (1+12) |
| 5 | G | 12 | عبر C (7+5)، أقل → تحديث |

**النتيجة:** المسار الأمثل `S→B→C→G` بتكلفة 12.

---

### تمرين 2: تصحيح كود (fill_gaps) لخوارزمية A*

**المطلوب:** أكمل الفراغات:
```text
frontier = PriorityQueue ordered by _______
if n == goal: return _______
g_c = _______
```
**نموذج الحل:** 1) `f(n)=g(n)+h(n)` 2) `path(n)` 3) `g(n)+cost(n,c)`

---

### تمرين 3: منطق (logic_table) — جدول Entailment لمسألة المترجم

**المطلوب:** بافتراض `s(Mary,e)=True, s(Mary,f)=True` احسب `i(Mary,j,p)`.

**نموذج الحل:**
| العلاقة | القيمة | السبب |
| --- | --- | --- |
| `c(Mary,j)` | True | كلاهما يتكلم الإنجليزية |
| `c(Mary,p)` | True | كلاهما يتكلم الفرنسية |
| `i(Mary,j,p)` | True | Mary تتواصل مع كليهما |

---

### تمرين 4: fill_gaps — حساب r_α لجدول جديد

**السيناريو:** جدول 5 أمثلة، سمتان A,B، صف OK: (1,0→1),(1,1→1),(0,1→0),(1,1→0),(0,0→0)

**المطلوب:** احسب `r_A` و`r_B` وحدد الذرّة الأولى.

**نموذج الحل:** `r_A=2/3≈0.67`، `r_B=1/3≈0.33` → تُختار **A**.

---

### تمرين 5: scenario — بناء قاعدة يدوياً على Play Tennis (مُختصر)

**السيناريو:** الأمثلة حيث `outlook=rain` (4,5,6,10,14).

**المطلوب:** طبّق منطق Divide and Conquer داخل هذه المجموعة الفرعية.

**نموذج الحل:** `outlook=rain⇒P` تغطي 4(P),5(P),6(N),10(P),14(N) — غير نقية. بفحص `windy`: عند `windy=false` (4,5,10) كلها P نقية. القاعدة: `outlook=rain ∧ windy=false ⇒ Positive`.

---

### تمرين 6: table_fill — تتبع حذف الأمثلة في مثال القرض

**المطلوب:** أكمل الجدول بعدد الأمثلة المتبقية بعد كل قاعدة.

**نموذج الحل:**
| بعد القاعدة | مُغطّاة | متبقية |
| --- | --- | --- |
| البداية | - | 9 |
| `BAL∧RATING⇒OK` | 3,4,7 | 6 (1,2,5,6,8,9) |
| `RATING∧APP∧INC⇒OK` | 6 | 0 → اكتمال |

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> **4 تمارين** — جداول ناقصة، إكمال أشجار بحث، تحليل نظري.

### تمرين 1: heuristic_eval — حساب f(n) لكل عقدة في الرسم الثاني

**السيناريو:** الرسم S-F(3),S-A(2),S-B(1),A-C(2),A-D(3),B-D(2),B-E(4),C-G(4),D-G(4),F-G(6). h: S=6,A=4,B=5,C=2,D=2,E=8,F=4,G=0.

**نموذج الحل:**
| العقدة | g(n) | h(n) | f(n) |
| --- | --- | --- | --- |
| S | 0 | 6 | 6 |
| B | 1 | 5 | 6 |
| D (عبر B) | 3 | 2 | 5 |
| G (عبر D من B) | 7 | 0 | 7 |

**النتيجة:** أفضل مسار `S→B→D→G` بتكلفة فعلية 7.

---

### تمرين 2: resolution_steps — تحويل بند iii إلى صيغة Clausal

**المطلوب:** حوّل `∀X,Y,L (s(X,L)∧s(Y,L))⇒c(X,Y)` إلى Clause.

**نموذج الحل:** `¬(s(X,L)∧s(Y,L))∨c(X,Y)` ≡ (De Morgan) → `¬s(X,L)∨¬s(Y,L)∨c(X,Y)`

---

### تمرين 3: case_study — تحليل حالة تعارض بيانات (Noise)

**السيناريو:** مثال عاشر بنفس قيم الصف 1 لكن `OK=1`.

**نموذج الحل:** تناقض في البيانات (Noisy Data): نفس السمات تؤدي لقرارين مختلفين؛ لا يمكن لقاعدة حتمية أن تميّز بينهما بهذه السمات وحدها — يلزم سمات إضافية أو أساليب احتمالية.

---

### تمرين 4: written_analysis — لماذا لا تضمن هذه الخوارزميات (بحث وقواعد) الحل الأمثل الشامل دائماً؟

**نموذج الحل:** كلاهما (Greedy Search وDivide-and-Conquer الجشع) يعتمدان اختيارات محلية أفضل في كل خطوة (أعلى `r_α` أو أقل `h(n)`) دون استكشاف شامل (Exhaustive) لكل الاحتمالات؛ هذا يوفر كفاءة حسابية لكنه لا يضمن الحل الأمثل الشامل في كل الحالات.

---

## الجزء الرابع: تمارين تتبع الخوارزميات (خطوة بخطوة)

> **4 تمارين تتبع.**

### تمرين تتبع 1: BFS على الرسم الأول

**المدخل:** `Graph: S-A(1), S-B(1), A-B(9), B-C(6), B-G(12), C-G(5)`

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Dequeue S، توليد A,B | Frontier: [A,B] |
| 2 | Dequeue A، توليد B (مكرر) | Frontier: [B] |
| 3 | Dequeue B، توليد C,G | Frontier: [C,G] |
| 4 | Dequeue C — ليست الهدف | Frontier: [G] |
| 5 | Dequeue G — **هدف!** | توقف |

**النتيجة:** `S→B→G` (خطوتان).

---

### تمرين تتبع 2: Unification على تعبيرين جديدين

**المدخل:** `Q(x, f(A), y)` و`Q(g(B), f(x), z)`

**نموذج الحل:**
| الخطوة | المقارنة | الإحلال |
| --- | --- | --- |
| 1 | `x` مقابل `g(B)` | `x/g(B)` |
| 2 | `f(A)` مقابل `f(x)` | بعد `x/g(B)`: `f(A)` مقابل `f(g(B))` → **تعارض** |

**النتيجة:** فشل التوحيد.

---

### تمرين تتبع 3: Divide and Conquer من الصفر على جدول جديد

**المدخل:** `X,Y,Z→OK`: (1,1,0→1),(1,0,1→1),(0,1,1→0),(1,1,1→0),(0,0,1→0)

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | r_X=2/3, r_Y=1/3, r_Z=1/3 | اختيار X |
| 2 | `X⇒OK` تغطي 1,2,4؛ الصف 4 سالب | غير نقية |
| 3 | ضمن X=1: r_Y=1/2, r_Z=1/2 (تعادل)؛ اختبار فعلي يُظهر Z هو الأنسب | `X∧Z⇒OK` تغطي الصف 2 فقط، نقية |

**الدرس المستفاد:** عند التعادل يجب اختبار كل خيار فعلياً بدل افتراض تعميم ثابت.

---

### تمرين تتبع 4: ILA على جدول ثلاثي القيم

**المدخل:** `Size,Color→Class`: (S,red→yes),(S,red→yes),(L,blue→no),(L,red→no)

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تقسيم | Yes:{1,2}, No:{3,4} |
| 2 | j=1، Size في Yes: `S` تتكرر مرتين، لا تظهر في No | صالحة |
| 3 | القاعدة: `IF Size is S THEN yes` | — |
| 4 | j=1، Size في No: `L` تتكرر مرتين، لا تظهر في Yes | صالحة |
| 5 | القاعدة: `IF Size is L THEN no` | — |

---

## الجزء الرابع: أسئلة تصميم

> **2 سؤالان تصميم.**

### سؤال تصميم 1: architecture — تصميم وكيل بحث (Search-Based Agent)

**المطلوب:** صمّم مخطط `PEAS` لوكيل يحل مسألة الدلاء تلقائياً.

**نموذج الإجابة:**
| العنصر | الوصف |
| --- | --- |
| Performance | الوصول لكمية 2 غالون بأقل عدد خطوات |
| Environment | حالة الدلوين، بيئة حتمية وكاملة المعرفة |
| Actuators | fill/empty/pour |
| Sensors | قراءة (x,y) الحالية |

**معايير التقييم:** تغطية العناصر الأربعة بدقة، وربطها بخصائص البيئة.

---

### سؤال تصميم 2: architecture — تصميم نظام تعلّم قواعد لمصرف

**المطلوب:** صمّم Pipeline لنظام يستقبل بيانات عملاء ويُخرج قواعد قابلة للتفسير للموافقة على القروض.

**نموذج الإجابة:**
```
[بيانات تاريخية] → [تصنيف Positive/Negative] → [Divide and Conquer Engine]
    → [مجموعة قواعد IF-THEN] → [مراجعة بشرية] → [نظام قرار آلي]
```

**معايير التقييم:** وضوح التسلسل، وتضمين خطوة المراجعة البشرية للقرارات الحساسة.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

> **16 بطاقة** — 8 من البحث/المنطق، 8 من تعلّم القواعد.

**Q1:** ما الفرق بين `BFS` و`DFS` من حيث بنية البيانات؟
A: `BFS` يستخدم `Queue`، `DFS` يستخدم `Stack`.

---

**Q2:** ما معنى `Admissible Heuristic`؟
A: دالة لا تبالغ أبداً في تقدير التكلفة الحقيقية المتبقية، `h(n)≤h*(n)`.

---

**Q3:** ما هو `f(n)` في `A*`؟
A: `f(n)=g(n)+h(n)`، مجموع التكلفة الفعلية الماضية والتقدير المستقبلي.

---

**Q4:** ما هو تمثيل الحالة الهدف في مسألة الدلاء؟
A: `(x,2)` أو `(2,y)`.

---

**Q5:** ما معنى `Unification` باختصار؟
A: إيجاد إحلال للمتغيرات يجعل تعبيرين منطقيين متطابقين.

---

**Q6:** ما هو `MGU`؟
A: أعم إحلال ممكن (Most General Unifier).

---

**Q7:** ما الفرق بين `∧` و`⇒` في صياغة FOL الشرطية؟
A: `∧` تفرض تحقق الطرفين دائماً، `⇒` تجعل الثاني شرطياً عند تحقق الأول.

---

**Q8:** متى يجب اختبار الهدف في `UCS`: عند التوليد أم عند الإخراج؟
A: عند الإخراج (Pop)، لضمان أن التكلفة المسجلة أقل فعلاً.

---

**Q9:** ما هو المثال الموجب (Positive) في تعلّم القواعد؟
A: المثال الذي فيه صف القرار (OK) = True.

---

**Q10:** بأي قاعدة تبدأ خوارزمية Divide and Conquer؟
A: `True⇒OK`، أعم قاعدة ممكنة.

---

**Q11:** ما هي معادلة معدّل تغطية الذرّة؟
A: `r_α = n_α⁺/n_α`.

---

**Q12:** متى نتوقف عن إضافة ذرّات لنفس القاعدة؟
A: عندما تصبح لا تغطي أي مثال سالب.

---

**Q13:** متى نبدأ قاعدة جديدة تماماً؟
A: عندما تكون القاعدة نقية لكن لا تغطي كل الموجب.

---

**Q14:** ما أول خطوة في `ILA`؟
A: تقسيم الجدول إلى جداول فرعية حسب صف القرار.

---

**Q15:** ماذا تفعل `ILA` إذا لم تجد max-combination صالحة؟
A: تزيد `j` بمقدار 1 وتعيد البحث بتوليفات أكبر.

---

**Q16:** كيف نكسر التعادل بين ذرّتين لهما نفس `r_α`؟
A: نختار الذرّة الأوسع تغطية على الجدول الأصلي الكامل.

---

## الجزء الخامس: الخوارزميات الكاملة (مرجع Pseudocode)

> مرجع كامل — بدون شرح جديد.

```text
// BFS
function BFS(start, goal):
    frontier = Queue([start]); explored = {}
    while frontier is not empty:
        n = frontier.dequeue()
        if n == goal: return path(n)
        add n to explored
        for each child c of n:
            if c not in explored and c not in frontier:
                frontier.enqueue(c)
    return failure
```

```text
// DFS
function DFS(start, goal):
    frontier = Stack([start]); explored = {}
    while frontier is not empty:
        n = frontier.pop()
        if n == goal: return path(n)
        add n to explored
        for each child c of n:
            if c not in explored and c not in frontier:
                frontier.push(c)
    return failure
```

```text
// Uniform-Cost Search
function UCS(start, goal):
    frontier = PriorityQueue ordered by g(n)
    frontier.add(start, g=0); explored = {}
    while frontier is not empty:
        n = frontier.pop_min()
        if n == goal: return path(n)
        add n to explored
        for each child c of n:
            g_c = g(n) + cost(n, c)
            if c not in explored or g_c < g(c):
                frontier.add_or_update(c, g_c)
    return failure
```

```text
// Iterative Deepening Search
function IDS(start, goal):
    limit = 0
    loop:
        result = DepthLimitedSearch(start, goal, limit)
        if result != cutoff: return result
        limit = limit + 1

function DepthLimitedSearch(node, goal, limit):
    if node == goal: return path(node)
    if limit == 0: return cutoff
    for each child c of node:
        result = DepthLimitedSearch(c, goal, limit - 1)
        if result != cutoff: return result
    return cutoff
```

```text
// Greedy Best-First Search
function GreedySearch(start, goal):
    frontier = PriorityQueue ordered by h(n)
    frontier.add(start, h(start)); explored = {}
    while frontier is not empty:
        n = frontier.pop_min()
        if n == goal: return path(n)
        add n to explored
        for each child c of n:
            if c not in explored and c not in frontier:
                frontier.add(c, h(c))
    return failure
```

```text
// A* Search
function AStar(start, goal):
    frontier = PriorityQueue ordered by f(n) = g(n) + h(n)
    frontier.add(start, f = h(start)); explored = {}
    while frontier is not empty:
        n = frontier.pop_min()
        if n == goal: return path(n)
        add n to explored
        for each child c of n:
            g_c = g(n) + cost(n, c)
            f_c = g_c + h(c)
            if c not in explored or f_c < f(c):
                frontier.add_or_update(c, f_c)
    return failure
```

```text
// Unification
function Unify(x, y, subst):
    if subst == failure: return failure
    if x == y: return subst
    if x is variable: return UnifyVar(x, y, subst)
    if y is variable: return UnifyVar(y, x, subst)
    if x is compound and y is compound and same functor and same arity:
        for each pair of arguments (xi, yi):
            subst = Unify(xi, yi, subst)
        return subst
    return failure

function UnifyVar(var, x, subst):
    if var occurs in x: return failure   // occurs-check
    return subst + {var / x}
```

```text
// Divide and Conquer Rule Induction
function DivideAndConquer(all_examples):
    rule_set = []
    remaining_positives = all positive examples in all_examples
    while remaining_positives is not empty:
        rule = "True ⇒ Class"
        current_examples = all_examples
        while rule covers at least one negative example among current_examples:
            best_attr = argmax over unused attributes of r_alpha = n_alpha_positive / n_alpha
            rule = rule AND best_attr
            current_examples = current_examples restricted to rows satisfying rule
        rule_set.add(rule)
        covered_positives = positive examples satisfying rule
        remaining_positives = remaining_positives - covered_positives
        all_examples = all_examples - covered_positives
    return rule_set
```

```text
// Induction Learning Algorithm (ILA)
function ILA(table):
    sub_tables = partition table by class attribute value
    rule_set = []
    for each sub_table in sub_tables:
        j = 1
        while sub_table has unmarked rows:
            combinations = all distinct combinations of j attributes
            max_combination = combination with highest occurrence count
                              among unmarked rows of sub_table
                              that does NOT appear with same values in other sub_tables
            if max_combination == empty:
                j = j + 1
                continue
            mark all rows in sub_table matching max_combination as classified
            rule_set.add("IF " + max_combination.attributes + " THEN class = " + sub_table.class_value)
            j = 1
    return rule_set
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

> **10 أسئلة** — 5 من البحث/المنطق، 5 من تعلّم القواعد.

### السؤال 1: ما هي عناصر تعريف مسألة البحث الرسمية (Problem Formulation)؟
**نموذج الإجابة:** 1) التعريف: خمسة عناصر: الحالة الابتدائية، فضاء الحالات، دالة الأفعال، اختبار الهدف، تكلفة المسار. 2) المكونات: `Initial State`, `Actions`, `Transition Model`, `Goal Test`, `Path Cost`. 3) مثال: مسألة الدلاء. 4) متى نستخدم: قبل تطبيق أي خوارزمية بحث.

---

### السؤال 2: قارن بين `Uninformed Search` و`Informed Search`.
**نموذج الإجابة:** 1) التعريف: الأول لا يستخدم أي معلومة عن الهدف، الثاني يستخدم `heuristic`. 2) المكونات: الفرق هو استخدام `h(n)`. 3) مثال: `UCS` مقابل `A*`. 4) متى نستخدم: البحث المعلوماتي أفضل مع تقدير جيد للمسافة المتبقية.

---

### السؤال 3: ما شروط ضمان المثالية (Optimality) في `A*`؟
**نموذج الإجابة:** 1) التعريف: ضمان إيجاد أقل تكلفة إجمالية. 2) المكونات: `h(n)` مقبولة، تكاليف غير سالبة. 3) مثال: جدول heuristic في التمرين الثاني. 4) متى نستخدم: عند الحاجة لضمان الحل الأمثل بكفاءة معقولة.

---

### السؤال 4: عرّف `Unification` وأهميتها في First-Order Logic.
**نموذج الإجابة:** 1) التعريف: إيجاد إحلال يجعل تعبيرين متطابقين. 2) المكونات: `Substitution`, `MGU`, `Occurs-check`. 3) مثال: توحيد `P(x,...)` مع `P(h(A,B),...)`. 4) متى نستخدم: أساسية في `Resolution` و`Chaining`.

---

### السؤال 5: ما أهمية صياغة FOL الصحيحة (استخدام `⇒` بدل `∧`) في التطبيقات العملية؟
**نموذج الإجابة:** 1) التعريف: الصياغة الخاطئة تُغيّر المعنى المنطقي جذرياً. 2) المكونات: يؤدي لاستنتاجات خاطئة في محرك استدلال آلي. 3) مثال: تلوين الخرائط. 4) متى نستخدم: يجب مراجعة الصياغة دائماً قبل إدخالها في نظام قواعد.

---

### السؤال 6: عرّف خوارزمية Divide and Conquer في سياق تعلّم القواعد.
**نموذج الإجابة:** 1) التعريف: تبني قاعدة تلو الأخرى، تبدأ عامة ثم تُخصَّص تدريجياً. 2) المكونات: `r_α`، الأمثلة الموجبة/السالبة. 3) مثال: مسألة القرض بقاعدتين نهائيتين. 4) متى نستخدم: لقواعد بسيطة وقابلة للتفسير.

---

### السؤال 7: ما الفرق بين قاعدة "صحيحة" وقاعدة "كاملة"؟
**نموذج الإجابة:** 1) التعريف: الصحيحة لا تغطي سالباً، الكاملة تغطي كل الموجب. 2) المكونات: يمكن أن تكون صحيحة وغير كاملة معاً. 3) مثال: `BAL∧RATING⇒OK`. 4) متى نستخدم: كلا المعيارين لتقييم جودة القاعدة.

---

### السؤال 8: كيف تختلف `ILA` عن `Divide and Conquer` من حيث بنية البحث؟
**نموذج الإجابة:** 1) التعريف: `ILA` تبحث بتوليفات متزايدة الحجم `j`، `D&C` تضيف ذرّة واحدة لقاعدة قائمة. 2) المكونات: `j` يقابل عدد الذرّات لكن بمنطق عد لا نسبة. 3) مثال: البدء بـ j=1 في مثال Size/Color/Shape. 4) متى نستخدم: كلاهما لبيانات مصنَّفة، `ILA` أعم لدعم أي عدد فئات.

---

### السؤال 9: ما الشرط الأساسي لصلاحية max-combination في `ILA`؟
**نموذج الإجابة:** 1) التعريف: ألا تظهر نفس القيم في جدول فرعي آخر. 2) المكونات: يضمن الحصرية (Exclusivity). 3) مثال: `color=green` صالحة لأنها لا تظهر في Sub-Table 2. 4) متى نستخدم: عند كل بحث عن max-combination جديدة.

---

### السؤال 10: لماذا لا تضمن خوارزميات البحث الجشعة وتعلّم القواعد الجشع دائماً الحل الأمثل الشامل؟
**نموذج الإجابة:** 1) التعريف: الاختيارات الجشعة محلية في كل خطوة. 2) المكونات: القرار الأفضل محلياً لا يضمن الأفضل شمولياً. 3) مثال: `Greedy Search` وGreedy attribute selection في `D&C`. 4) متى نستخدم: نتقبل هذا القيد لأن البحث الشامل مكلف حسابياً.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفرّق بوضوح بين `BFS`, `DFS`, `UCS`, `IDS`, `Greedy`, `A*` من حيث بنية البيانات ومعيار التوسيع.
- [ ] أعرف شرط `Admissibility` وأثره على مثالية `A*`.
- [ ] أستطيع تتبع أي خوارزمية بحث يدوياً على رسم بياني بسيط.
- [ ] أستطيع صياغة جمل FOL بشكل صحيح باستخدام `∀`, `∃`, `⇒`, `∧`.
- [ ] أفهم عملية `Unification` وأستطيع حساب `MGU` يدوياً، بما فيها `occurs-check`.
- [ ] أفهم الفرق بين "أمثلة موجبة" و"أمثلة سالبة" وأحسب `r_α` يدوياً.
- [ ] أفرّق بين متى نضيف ذرّة جديدة لنفس القاعدة، ومتى نبدأ قاعدة جديدة تماماً.
- [ ] أفهم خطوات `ILA` الثمانية بالترتيب، وشرط صلاحية max-combination.
- [ ] أستطيع تحديد أخطاء شائعة في pseudocode لكل هذه الخوارزميات.
- [ ] أفهم لماذا الاختيارات الجشعة (في البحث وتعلّم القواعد) لا تضمن الحل الأمثل الشامل دائماً.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| البحث | اختر حسب: توفر heuristic، الحاجة لضمان المثالية، قيود الذاكرة |
| FOL | استخدم `⇒` للشروط، `∧` فقط للاقتران الفعلي المؤكد |
| Unification | تحقق موضعاً بموضع، وطبّق occurs-check |
| Rule Learning | القاعدة يجب أن تكون صحيحة أولاً، ثم كاملة؛ احذف المُغطّى قبل قاعدة جديدة |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `g(n)` | تكلفة فعلية ماضية | UCS, A* |
| `h(n)` | تقدير مستقبلي | Greedy, A* |
| `f(n)=g(n)+h(n)` | تقييم كلي | A* |
| `MGU` | أعم إحلال | Unification |
| `r_α = n_α⁺/n_α` | معدّل نقاء الذرّة | Divide and Conquer |
| `j` | حجم توليفة السمات الحالية | ILA |
| `max-combination` | أكثر توليفة مميّزة حصرياً | ILA |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | `A*` مثالي فقط مع heuristic مقبولة |
| 2 | اختبر الهدف عند الإخراج لا عند التوليد في UCS/A* |
| 3 | `∧` ≠ `⇒` في صياغة الجمل الشرطية بـ FOL |
| 4 | قاعدة "صحيحة" ليست بالضرورة "كاملة" — تحقق من الاثنين |
| 5 | عند التعادل بين ذرّتين، اختر الأوسع تغطية على الجدول الأصلي |

<!-- VALIDATION: هذا الملف الموحّد يغطي محتوى محاضرة واحدة (تمارين البحث BFS/DFS/UCS/IDS/Greedy/A*، مسألة صب الماء، تمارين First-Order Logic والـ Unification، وخوارزميات تعلّم القواعد Divide-and-Conquer وILA) كما وردت معاً في ملفَي "تمـارين_ذكــاء_نظري.pdf" و"ذكاء_نظري_مـ_12.pdf". تم إنشاؤه وفق تعليمات ai-theory.md مع الاستدلال على تنسيق SCHEMA.md من القوالب المرفقة داخل الملف نفسه (SCHEMA.md غير متوفر بشكل منفصل)، وتم ضبط أعداد الأسئلة/التمارين لتلائم محاضرة واحدة (18 MCQ، 6 تصحيح، 6 تطبيقية، 4 تحليلية، 4 تتبع، 2 تصميم، 16 بطاقة، 10 نظرية) بدل مضاعفتها. -->

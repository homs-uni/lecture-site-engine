# المحاضرة 6 — الوحدة F: قياس البرمجيات الكامل (محاضرة 8 + 9)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

### الفقرة 1: LOC — مشاكله وحدوده

**من المحاضرة:** محاضرة 8، §2 | `LOC` (Lines of Code) أبسط مقياس حجم، لكنه معتمد على اللغة وما يعكس التعقيد الحقيقي.

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
"Lines of code" is a poor metric because:
أ) it is language independent
ب) it penalizes efficient, compact coding
ج) it measures what matters, not what can be measured
د) developed in the 1960's
ه) All of the above
**الإجابة: ب**
> الكود المضغوط الفعّال بيسجّل LOC أقل، كأنو المبرمج الماهر "أنتج أقل" — عكس الحقيقة.


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
Which statement is MOST accurate regarding LOC as a metric?
أ) universally reliable
ب) useful for comparing productivity across different languages
ج) useful within same organization/standards, but limited across different contexts
د) outdated, should never be used
**الإجابة: ج**
> —


### الفقرة 2: Cyclomatic Complexity (CC) — التعريف والحساب

**من المحاضرة:** محاضرة 8، §3 | `V(G) = e − n + 2p` (e=حواف، n=عُقد، p=مكوّنات متصلة) على `Control Flow Graph` (مخطط تدفق التحكم).

#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
What does cyclomatic complexity measure?
أ) Number of lines of code
ب) Number of independent paths through the code
ج) Number of classes in a system
د) Total number of bugs
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
In McCabe's CC metric, code is first represented as:
أ) A syntax graph
ب) A data-flow graph
ج) A flow control graph
د) A control-vs-command graph
ه) None
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
CC is primarily used to measure:
أ) Number of potential execution paths in a module
ب) Degree of coupling between modules
ج) Depth of inheritance hierarchy
د) Number of external dependencies
**الإجابة: أ**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
The cyclomatic complexity of a graph is:
أ) number of closed paths
ب) number of independent test cases required to reach every node
ج) edges − nodes + 1
د) All of the above
ه) None
**الإجابة: ب**
> تفسيرها العملي: الحد الأدنى لعدد حالات الاختبار المستقلة اللازمة.


### الفقرة 3: تطبيق شامل — مثال Calculator (LOC/CC/Coverage/Maintainability سوا)

**من المحاضرة:** محاضرة 8 (تمرين تطبيقي على كلاس Calculator بـ add/subtract/multiply/divide)

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 (مجموعة أسئلة على نفس الكود)]
What is the cyclomatic complexity of the ENTIRE Calculator class (WMC)?
أ) 1
ب) 2
ج) 4
د) 5
**الإجابة: د**
> كل من add/subtract/multiply CC=1 (بدون شروط)، divide فيها if واحد فـ CC=2 → المجموع (`WMC`) = 1+1+1+2 = 5.


### الفقرة 4: مقاييس OO — DIT / Coupling (CBO) / RFC / WMC

**من المحاضرة:** محاضرة 8، §4 | مقاييس Chidamber & Kemerer الستة: DIT, NOC, WMC, RFC, CBO, LCOM.

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
A high Depth of Inheritance Tree (DIT) value generally indicates:
أ) Well-designed, easily maintainable hierarchy
ب) Potential difficulties in understanding/maintaining due to increased complexity
ج) Improved reuse, reduced duplication
د) Lower risk of errors
**الإجابة: ب**
> مقايضة حقيقية: DIT عميق = reuse أكبر **لكن** تعقيد أكبر، مو "جيد دائماً".


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
In quality metrics, what does "coupling" refer to?
أ) Degree of interaction between different modules/components
ب) Strength of relationship in inheritance hierarchy
ج) Number of dependencies on external libraries
د) Cohesion of elements within a module
**الإجابة: أ**
> القاعدة الذهبية: "حافظ على اقتران منخفض (`low coupling`) لكن تماسك عالي (`high cohesion`)".


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
Weighted Methods per Class (WMC) is calculated as:
أ) Total number of methods
ب) Sum of Cyclomatic Complexity of all methods in a class
ج) Ratio of methods to attributes
د) Average methods across all classes - و) None
**الإجابة: ب**
> قاعدة عملية: WMC=20 جيدة، تجنّبي تجاوز 40.


#### تحقق سريع:
`Lack of Cohesion in Methods` (LCOM) measures:
أ) How strongly methods within a class share the class's attributes
ب) The number of external classes a class depends on
ج) The depth of a class's inheritance chain
د) The total lines of code in a class
**الإجابة: أ**
> الترجمة: `Cohesion` = التماسك (كل دوال الفئة تتشارك بمسؤولية واحدة مترابطة). `LCOM` مرتفع = تماسك ضعيف = مرشّح لتقسيم الفئة (`Extract Class`).


### الفقرة 5: مقاييس اعتمادية الحزم (Ca / Ce / Instability)

**من المحاضرة:** محاضرة 8، §5 | `Ca` (Afferent — اعتمادية داخلة)، `Ce` (Efferent — اعتمادية خارجة)، `Instability = Ce/(Ca+Ce)`.

#### تحقق سريع:
A package with high `Instability` (Ce/(Ca+Ce) close to 1) means:
أ) It is heavily depended upon by others, so it's hard to change
ب) It depends heavily on others but few depend on it, so it's easy to change
ج) It has no dependencies at all
د) It is the most stable package in the system
**الإجابة: ب**
> —


### الفقرة 6: مقاييس الجودة — Defect Density / MTTR / MTBF / Discovery Rate

**من المحاضرة:** محاضرة 8، §7 | `Defect Density = #defects / size`. `MTTR` = زمن الإصلاح. `MTBF` = زمن بين عطلين.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which metric measures the average time required to fix a software defect?
أ) Defect density
ب) Mean Time Between Failures
ج) Mean Time to Repair
د) Software complexity
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which metric measures the number of defects discovered PER UNIT OF TIME during testing?
أ) Defect density
ب) Defect discovery rate
ج) Cyclomatic complexity
د) Test coverage
**الإجابة: ب**
> الفرق: Density = لكل وحدة حجم، Discovery Rate = لكل وحدة زمن.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
Which of the following is NOT a software metric?
أ) Lines of code
ب) Cyclomatic complexity
ج) Defect density
د) Software documentation
**الإجابة: د**
> التوثيق منتج (deliverable)، مو مقياساً رقمياً.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
Which is NOT a common software quality metric?
أ) Mean time to failure
ب) Code churn
ج) Feature count
د) Lines of code
**الإجابة: ج**
> ليست مقياس جودة معياري.


### الفقرة 6ب: Predictor مقابل Control Metrics

**من المحاضرة:** محاضرة 9، §2 | `Control/Process Metrics` (مقاييس التحكم): تراقب العملية نفسها (مثال: متوسط الجهد/الوقت لإصلاح عطل). `Predictor/Product Metrics` (مقاييس التنبؤ): مرتبطة بالمنتج البرمجي نفسه = نفس `Internal Attributes` (LOC، CC).

#### تحقق سريع:
"Average time required to repair a defect" is an example of a:
أ) Predictor metric
ب) Control metric
ج) Static metric
د) Function Point
**الإجابة: ب**
> تراقب العملية (زمن الإصلاح)، مو خاصية بالكود نفسه.


### الفقرة 6ج: Dynamic مقابل Static Metrics

**من المحاضرة:** محاضرة 9، §3 | `Dynamic Metrics`: تُجمع أثناء تشغيل البرنامج فعلياً (مثال: عدد تقارير الأخطاء، وقت إنجاز عملية حسابية) — تقيّم الكفاءة والموثوقية. `Static Metrics`: تُجمع من الكود بدون تشغيله (مثال: حجم الكود، Cyclomatic Complexity) — تقيّم التعقيد وسهولة الفهم/الصيانة.

### الفقرة 8ب: Fan-in / Fan-out + طول أسماء المتغيرات

**من المحاضرة:** محاضرة 9، §4-5 | (تكملة للفقرة 8 بالوحدة F) — طول أسماء المتغيرات (`Length of Identifiers`): أسماء أطول وأوضح عادة ترتبط بفهم أسهل للكود (لكن ليست قاعدة مطلقة، فيه حدود عملية للطول المفيد).

### الفقرة 9ب: Halstead Metric (1977)

**من المحاضرة:** محاضرة 9، §10-11 | يقيس **الكود نفسه رمزاً برمز** (بعكس Function Points اللي تقيس الوظائف قبل الكود). كل برنامج = مجموعة رموز (`tokens`): إما `Operators` (عوامل: =, while, +, print()) أو `Operands` (معاملات: متغيرات وثوابت).

- `n1` = عدد الـ Operators الفريدة (unique)
- `n2` = عدد الـ Operands الفريدة (unique)
- `N` = الطول الكلي (كل الرموز مع التكرار)
- **الحجم** `Volume V = N × log2(n1+n2)`
- **الصعوبة** `Difficulty D = (n1/2) × (total operands/n2)`
- **الجهد** `Effort E = D × V`
- **وقت البرمجة المقدَّر** `T = E / 18` (بالثواني)

#### تحقق سريع:
In Halstead's metric, what does `n1` represent?
أ) The total length of the program including repetitions
ب) The number of unique operators
ج) The number of unique operands
د) The estimated coding time
**الإجابة: ب**
> `n2` هو عدد الـ Operands الفريدة (مو n1)، و`N` هو الطول الكلي مع التكرار (مو n1 ولا n2).


### الفقرة 7: Function Points — التعريف والهدف

**من المحاضرة:** محاضرة 9، §6-9 | قياس الحجم بناءً على "الوظائف" (Inputs/Outputs/Files/Interfaces/Inquiries)، مستقل عن لغة البرمجة (Albrecht/IBM 1979، معيار ISO 2003).

#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
What does the term 'function point' measure?
أ) Complexity of the code
ب) Size and complexity based on functionality
ج) Number of functions in code
د) Execution speed
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is the primary goal of Function Point Analysis (FPA)?
أ) Estimate development time
ب) Assess code quality/bugs
ج) Measure size based on functionality from user's perspective
د) Track development team progress
**الإجابة: ج**
> —


### الفقرة 8: Fan-in / Fan-out + السياق عند تفسير المقاييس

**من المحاضرة:** محاضرة 9، §4 | `Fan-in` (استدعاءات داخلة) = كم وحدة بتنادي عليّي. `Fan-out` (استدعاءات خارجة) = كم وحدة أنا بنادي عليها (بما فيها المكتبات الخارجية).

#### تحقق سريع:
**المصدر:** [نمط 2025-2026]
Fan-out for a function that calls 3 functions and 2 external libraries. Value?
أ) Components
ب) 5
ج) 2
د) 3
**الإجابة: ب**
> المجموع الكلي (3 داخلية + 2 خارجية)، بغض النظر عن كونها داخل النظام أو مكتبة خارجية.


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
When evaluating software metrics, it's crucial to consider:
أ) The specific context of the project and organization
ب) Absolute values without external factors
ج) Individual developer opinions
د) Latest trends without adapting them
**الإجابة: أ**
> العلاقة بين الصفات الداخلية (CC) والخارجية (Maintainability) إحصائية/افتراضية، لازم تُفسَّر بالسياق.

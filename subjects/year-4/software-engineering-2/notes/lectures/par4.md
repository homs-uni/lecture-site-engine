# المحاضرة 4 — الوحدة D: الاختبار (محاضرة 5 + محاضرة 6: JUnit)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

### الفقرة 0أ: Validation مقابل Verification (V&V)

**من المحاضرة:** محاضرة 5، §2 | `Validation`: "هل نبني المنتج الصحيح؟" (يلبي احتياج العميل الحقيقي). `Verification`: "هل نبني المنتج بشكل صحيح؟" (يطابق المواصفات المكتوبة). ممكن ينجح Verification بالكامل ويفشل Validation — لأن وثيقة المتطلبات نفسها ما تعكس دايماً الاحتياج الحقيقي للعميل.

### الفقرة 0ب: Inspections مقابل Testing (Static مقابل Dynamic Verification)

**من المحاضرة:** محاضرة 5، §3 | `Inspections` (مراجعات — تحليل ساكن `static`): تراجع Requirements Spec، Architecture، UML Models، DB Schemas، والكود **بدون تشغيله**. `Testing` (تحليل ديناميكي): يشغّل البرنامج فعلياً ويراقب سلوكه.

**مزايا Inspections:** تكشف مشاكل الأسلوب البرمجي والخوارزميات غير المناسبة، ممكن تراجع كود غير مكتمل، وتتفادى مشكلة "خطأ يخفي خطأ آخر". **حدودها:** ما تكتشف مشاكل الأداء (`performance`) أو التوقيت (`timing`) أو تفاعلات وقت التشغيل غير المتوقعة.

#### تحقق سريع:
Which of the following is an advantage of software inspections over dynamic testing?
أ) They can detect timing problems accurately
ب) They can be applied to incomplete system versions without extra cost
ج) They always find more defects than testing
د) They require the system to be fully executable
**الإجابة: ب**
> —


### الفقرة 1: هدف الاختبار + Validation مقابل Verification

**من المحاضرة:** محاضرة 5، §1-2 | `Validation` = "نبني الصحيح؟" — `Verification` = "نبنيه صح؟"

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the primary purpose of software testing?
أ) Ensure software meets customer requirements
ب) Improve performance
ج) Identify and fix defects
د) Estimate effort
**الإجابة: أ**
> يتقاطع مع مفهوم Validation.


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is the primary goal of software testing? *(صياغة أدق)*
أ) Prove software is bug-free
ب) Find as many defects as possible before release
ج) Ensure all requirements are met
د) Improve code quality
**الإجابة: ب**
> تحذير: خيار "أ" هو بالضبط الفهم الخاطئ المُحذَّر منه — الاختبار **يكشف** الأخطاء، ما **يثبت غيابها**.


### الفقرة 2: مستويات الاختبار — Unit / Integration / System

**من المحاضرة:** محاضرة 5، §8 | التدرّج: Unit → Component/Integration → System.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique involves executing the entire system with realistic data in a simulated environment?
أ) Unit testing
ب) Regression testing
ج) System testing
د) Acceptance testing
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique focuses on testing interactions between different components?
أ) Integration testing
ب) Unit testing
ج) System testing
د) Acceptance testing
**الإجابة: أ**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
The testing phase doesn't require:
أ) testing that implementation compiles correctly
ب) matches design
ج) matches requirements
د) components work separately/together
ه) interacts correctly with environment
**الإجابة: أ**
> التصريف الناجح (`compiling`) شرط *سابق* للاختبار، مو نشاط اختبار بحد ذاته.


### الفقرة 3: White-box مقابل Black-box Testing

**من المحاضرة:** محاضرة 5 + محاضرة 6 | White-box = بناءً على الكود الداخلي. Black-box = بناءً على المواصفات الخارجية فقط.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique involves executing test cases derived from the internal structure of the software?
أ) White-box testing
ب) Black-box testing
ج) Regression testing
د) Acceptance testing
**الإجابة: أ**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is the primary difference between white-box and black-box testing?
أ) White-box focuses on internal logic, black-box on input-output behavior
ب) White-box by end-users, black-box by developers
ج) White-box requires knowledge of external systems
د) White-box more cost-effective
**الإجابة: أ**
> —


### الفقرة 4: Stress / Regression Testing + خصائص تقنية الاختبار الجيدة

**من المحاضرة:** محاضرة 5، §5-7

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique involves testing system's ability to handle maximum expected load?
أ) Stress testing
ب) Usability testing
ج) Regression testing
د) Integration testing
**الإجابة: أ**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is regression testing?
أ) Testing new features
ب) Retesting existing functionality after changes to ensure no new defects introduced
ج) Testing performance under heavy load
د) Testing security
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which is NOT a characteristic of a good testing technique?
أ) High fault detection rate
ب) Ability to uncover complex defects
ج) Low time and cost requirements
د) High execution speed
**الإجابة: د**
> سرعة التنفيذ **مو** معياراً جوهرياً للجودة (تقنية بطيئة لكن فعّالة تبقى جيدة).


### الفقرة 5: Test Case مقابل Test Data

**من المحاضرة:** محاضرة 5، §4 | `Test Case` (حالة اختبار) = المواصفة الكاملة (مدخل + مخرج متوقع + سبب). `Test Data` (بيانات اختبار) = المدخلات فقط.

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is a test case in software testing?
أ) A step-by-step procedure only
ب) A set of preconditions, inputs, execution steps, and expected results
ج) A tool to automate testing
د) A document outlining testing strategy
**الإجابة: ب**
> —


### الفقرة 4ب: استراتيجيات اختيار حالات الاختبار — Partition Testing + Boundary Value Analysis

**من المحاضرة:** محاضرة 5، §11-12 | `Partition Testing`: قسّم كل المدخلات الممكنة (صحيحة وخاطئة) لمجموعات (`partitions`) بحيث كل عناصر المجموعة الواحدة يُتوقّع نفس السلوك — اختر حالة اختبار واحدة على الأقل من كل مجموعة. تحديد الـ partitions عبر: مواصفات البرنامج، وثائق المستخدم، أو الخبرة. **العلاقة بين input/output partitions ليست دائماً 1:1**.

`Boundary Value Analysis` (تحليل القيم الحدودية): أفضل قيم للاختبار هي عند **حدود** كل partition (تكشف أخطاء `off-by-one` الشائعة: `<` بدل `<=`)، بالإضافة لقيمة من منتصف الـ partition للتأكد من السلوك الطبيعي.

#### تحقق سريع:
A function accepts ages from 18 to 65 inclusive. Which set of test values best applies Boundary Value Analysis?
أ) 40 only
ب) 17, 18, 65, 66, and 40
ج) 1, 100, 1000
د) 18 and 65 only
**الإجابة: ب**
> الحدود (17/18 و65/66) + قيمة من المنتصف (40) — تطبيق مباشر لقاعدة Boundary Value Analysis.


### الفقرة 6: JUnit — Annotations + Assertions + Test Suite

**من المحاضرة:** محاضرة 6 | `@Test`, `@Before`, `@After`, `@BeforeClass` (static), `@AfterClass` (static).

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
In JUnit, what does the @Test annotation signify?
أ) Setup method
ب) Test method
ج) Teardown method
د) Helper method
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
Which annotation executes code BEFORE EACH test method?
أ) @BeforeClass
ب) @BeforeAll
ج) @Before
د) @BeforeEach
**الإجابة: ج**
> بمحاضرتك استُخدمت أسماء JUnit 4 (`@Before`/`@BeforeClass`)، مو JUnit 5 (`@BeforeEach`/`@BeforeAll`) رغم تطابق المفهوم.


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is an assertion in JUnit?
أ) A method that throws exception if test fails
ب) A statement that checks whether a condition is true/false during a test
ج) A comment describing test purpose
د) A method that initializes test environment
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is the purpose of a test suite in JUnit?
أ) Group related test cases together for execution
ب) Generate test reports
ج) Define overall testing strategy
د) Automatically fix bugs
**الإجابة: أ**
> —


### الفقرة 7: Code Coverage

**من المحاضرة:** محاضرة 6 | نسبة الكود المُنفَّذ فعلياً أثناء الاختبار — تغطية 100% **لا تعني** خلوّ الكود من الأخطاء.

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is the purpose of measuring "Code Coverage"?
أ) Assess overall code quality
ب) Determine percentage of code executed by automated tests
ج) Identify security vulnerabilities
د) Track testing team progress
**الإجابة: ب**
> —

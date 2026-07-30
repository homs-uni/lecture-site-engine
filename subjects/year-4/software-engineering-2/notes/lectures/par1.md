# المحاضرة 1 — الوحدة A: الأساسيات ودورة حياة البرمجيات (محاضرة 1 + 2)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

### الفقرة 1: أزمة البرمجيات وتكاليفها

**من المحاضرة:** محاضرة 1، §1 | **تذكير:** "Software: still come late, exceed budget, full of residual faults."

3 أعراض (تأخر، تجاوز ميزانية، أخطاء متبقية)، والسبب الجذري هو التعقيد (`complexity`) مش نقص الأدوات.

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is the primary cause of the "software crisis" as identified in the 1960s?
أ) Rapidly increasing hardware capabilities
ب) The rise of open-source software
ج) The introduction of agile methodologies
د) Inability to meet user requirements and project deadlines
**الإجابة: د**
> أرقام IBM (31% إلغاء، 53% تجاوز ميزانية بمعدل 189%) كلها مظاهر فشل تلبية متطلبات المستخدم والمواعيد. الترجمة: `crisis` = أزمة، `deadlines` = المواعيد النهائية.


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
Which of the following best describes a consequence of the software crisis?
أ) Decreased demand for software engineers
ب) Increased costs and delays in software development projects
ج) Improved collaboration between development teams and stakeholders
د) A shift towards more manual testing processes
**الإجابة: ب**
> نتيجة مباشرة موثّقة بالأرقام (تجاوز 189% بالميزانية). العكس تماماً لخيارات أ وج.


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
In response to the software crisis, which methodology was introduced to improve software development processes?
أ) Waterfall model
ب) Agile methodologies
ج) Spiral model
د) DevOps practices
**الإجابة: أ**
> تاريخياً أول نموذج منظّم رسمياً ظهر كردّ مباشر على فوضى `Build and Fix`. `Agile` وDevOps ظهروا لاحقاً بعقود، وSpiral جا بعده لسبب مختلف (المخاطر).


### الفقرة 2: تعريف SE + أساطير البرمجيات

**من المحاضرة:** محاضرة 1، §2.1 و §5 | **تذكير:** "Addition of more software engineers will make up the delay" — أسطورة، مش حقيقة (قانون Brooks).

#### تحقق سريع:
Which of the following is one of the software myths mentioned in the lecture?
أ) Freezing requirements early always guarantees zero delays
ب) Adding more programmers to a late project will speed up its completion
ج) Automated testing can fully eliminate the need for a design phase
د) Reusable components always reduce the cost of every future project
**الإجابة: ب**
> أسطورة قانون Brooks الحرفية بالمحاضرة. الترجمة: `myth` = أسطورة/معتقد خاطئ شائع.


### الفقرة 2ب: صفات مهندس البرمجيات

**من المحاضرة:** محاضرة 1، §2.2 | 3 مسؤوليات تميّزه عن "مبرمج عادي": نهج منظم وموثّق (`systematic approach`)، اختيار الأدوات المناسبة حسب المشكلة، واستغلال الموارد المتاحة بكفاءة.

### الفقرة 3: Program / Software / Product / Process

**من المحاضرة:** محاضرة 1، §3.1 و §9.2 | **تذكير:** "Product: is what is delivered to the customer... Process: way in which we produce software."

| المصطلح | التعريف |
|---|---|
| `Program` (برنامج) | الكود المصدري فقط |
| `Software` (برمجية) | `Program` + توثيق (`Documentation`) + إجراءات تشغيل |
| `Product` (منتج) | كل ما يُسلَّم للعميل |
| `Process` (عملية) | **الطريقة** يلي وصلنا فيها للنتيجة |

**القاعدة الذهبية:** `Product` = شو، `Process` = كيف.

#### تحقق سريع:
According to the lecture, which of the following completes the definition: Software = Program + Documentation + ...?
أ) Marketing Plan
ب) Operating Procedures
ج) Test Budget
د) Customer Contract
**الإجابة: ب**
> المكوّن الثالث الحرفي بتعريف Software.


### الفقرة 3ب: هيكل التوثيق + إجراءات التشغيل

**من المحاضرة:** محاضرة 1، §3.2-3.3 | التوثيق (`Documentation`) 4 فئات حسب مرحلة التطوير: Analysis/Specification (DFD, Context Diagram)، Design (Flow Charts, ERD)، Implementation (Source Code Listing)، Testing (Test Data/Results). إجراءات التشغيل (`Operating Procedures`) نوعان: `User Manuals` (للمستخدم: Overview, Beginner's Guide, Tutorial, Reference) و`Operational Manuals` (للفريق التقني: Installation Guide, System Administration Guide).

**📌 الترجمة:** `Cross-Reference Listing` = قائمة الإحالة المرجعية، `Entity-Relationship Diagram` = مخطط العلاقة بين الكيانات.

### الفقرة 4: Generic مقابل Bespoke

**من المحاضرة:** محاضرة 1، §4.1 | مين يملك المواصفة (`specification` — الترجمة: المواصفة/الوثيقة التقنية) هو الفيصل: `Generic` = المطوّر يملكها، `Bespoke` = العميل يملكها.

#### تحقق سريع:
A company builds a general accounting package and independently decides which features to include, then sells it to many businesses. This is:
أ) Bespoke
ب) Generic
ج) Embedded
د) Real-time
**الإجابة: ب**
> المطوّر يملك القرار = Generic.


### الفقرة 4ب: مكونات منتج البرمجية (Software Product)

**من المحاضرة:** محاضرة 1، §4.2 | المنتج = كل ما يُصمَّم للتسليم، 10 عناصر: Source Code, Object Codes, Reports, Plan, Documents, Manuals, Data, Test Suites, Test Results, Prototypes.

### الفقرة 5: Good Software مقابل Software Process

**من المحاضرة:** محاضرة 1، §8 و §6.1 | قائمتان من 4 عناصر بيسهل تختلطوا:

| Good Software (صفات المنتج) | Software Process (أنشطة العملية) |
|---|---|
| Maintainability (قابلية الصيانة) | Specification (تخصيص) |
| Dependability & Security (الموثوقية والأمان) | Development (تطوير) |
| Efficiency (الكفاءة) | Validation (تحقق) |
| Acceptability (القبول) | Evolution (تطوّر) |

#### تحقق سريع:
Which pair correctly matches a Software Process activity with its purpose?
أ) Validation — designing architecture
ب) Specification — defining what the system should do
ج) Evolution — writing initial code
د) Development — checking customer requirements
**الإجابة: ب**
> باقي الأزواج مقلوبة عمداً.


### الفقرة 5ب: خصائص البرمجية (Software Characteristics) + تطبيقاتها

**من المحاضرة:** محاضرة 1، §6.2 و §7 | 4 خصائص تميّزها عن الهاردوير: **لا تتآكل** (`does not wear out` — منحنى أعطالها ينخفض باستمرار، بعكس منحنى U للهاردوير)، **لا تُصنَّع بل تُنسَخ** (`not manufactured, just copied`)، **قابلة لإعادة الاستخدام**، و**مرنة** (`flexible`).

8 أنواع تطبيقات: System Software (compilers, OS)، Real-time Software، Embedded Software، Business Software، Personal Computer Software، AI Software، Web-Based Software، Engineering & Scientific Software (CAD, SPSS, MATLAB).

### الفقرة 6: Deliverables مقابل Milestones

**من المحاضرة:** محاضرة 1، §9.1 | `Deliverable` (مُخرَج) = شيء ملموس. `Milestone` (معلَم/محطة تقييم) = حدث يقيس التقدم.

#### تحقق سريع:
"Completion of the design documentation" is best classified as a:
أ) Deliverable
ب) Milestone
ج) Software Myth
د) Process Metric
**الإجابة: ب**
> مثال حرفي بالمحاضرة على Milestone.


### الفقرة 7: Measure / Measurement / Metrics

**من المحاضرة:** محاضرة 1، §9.3 | `Measure` (مقياس فردي) → `Measurement` (فعل القياس) → `Metrics` (ربط عدة measures).

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
A metric is:
أ) an ISO standard unit
ب) a qualitative measure of a system attribute
ج) a quantitative measure of the degree to which a system component possesses a given attribute
د) a qualitative attribute which determines degree of measurement
ه) an attributed quantity in degrees
**الإجابة: ج**
> المقياس بطبيعته **كمّي** (quantitative) لا نوعي (qualitative) — هاد الفرق نفسه هو الفخ بخيار ب.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Why is it useful to measure aspects of a system?
أ) Human perception is inaccurate
ب) Numbers allow comparing, controlling, predicting
ج) Measurements track progress
د) Gives quality assessment
ه) All of the above
**الإجابة: ه**
> كل الأسباب صحيحة ومكمّلة لبعض.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What are the features of a poor metric?
أ) complex, hard-to-measure, persuasive
ب) complex, consistent, language-independent
ج) simple, hard-to-measure, no units
د) complex, subjective, inconsistent
ه) complex, subjective, persuasive
**الإجابة: د**
> المقياس السيء: معقّد + ذاتي (`subjective`) + غير متسق (`inconsistent`) — عكس الجيد (بسيط، موضوعي، متسق).


### الفقرة 8: Productivity + Module + Component

**من المحاضرة:** محاضرة 1، §9.4 | `Productivity = LOC / Person-Months`. `Component` (مكوّن) أكبر من `Module` (وحدة)، ويوفر خدمته عبر `interface`.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
Which metric is often used to measure the efficiency of a software development team?
أ) Defect density
ب) Lines of code per person-month
ج) Code coverage
د) Number of test cases
**الإجابة: ب**
> تعريف Productivity بالضبط.


### الفقرة 9: دور الإدارة في التطوير

**من المحاضرة:** محاضرة 1، §10 | 4 عوامل: **People + Product + Process + Project**. تجميد المتطلبات (`freeze`) تحت Project بيقلل المخاطر.

#### تحقق سريع:
Under which management factor does the lecture discuss freezing requirements to avoid software surprises?
أ) People
ب) Product
ج) Process
د) Project
**الإجابة: د**
> —


### الفقرة 10: نماذج دورة حياة البرمجيات (SDLC Models)

**من المحاضرة:** محاضرة 2، كاملة | Spiral = الوحيد بـ`Risk Analysis` صريح كل لفة.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which model is characterized by iterations and feedback cycles?
أ) Waterfall
ب) Spiral
ج) Agile
د) V-shaped
**الإجابة: ج**
> *(معرفة عامة أكثر من كونها مذكورة بالاسم بمحاضرتك؛ لو الخيارات ما فيها Agile فـ Spiral هو الأقرب المدروس)*


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which model is characterized by a linear and sequential flow?
أ) Agile
ب) Waterfall
ج) Spiral
د) Iterative
**الإجابة: ب**
> تشبيه "الشلال": الماء ينزل لجهة وحدة بلا رجوع.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which model involves construction of a partial system progressively refined through iterations?
أ) Waterfall
ب) Spiral
ج) Incremental
د) V-shaped
**الإجابة: ج**
> بيحذّر: خلط شائع بين Iterative Enhancement (منتج قابل للاستخدام كل دورة) وEvolutionary (لأ).

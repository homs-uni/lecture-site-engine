# دليل ربط المفاهيم واختبار الفهم — هندسة البرمجيات 2 (كل الوحدات)

> **هاد الملف طبقة إضافية جنب ملفات محاضراتك الأصلية — ما بيعدّل عليهن ولا بيغيّر شكلهن.**
> كل سؤال هون مصدره الوحيد **ملف "exams.md"** يلي رفعتيه (فيه حلول حقيقية لدورات سابقة 2023–2026)، ومكتوب فوق كل سؤال أي دورة/نمط اجا منها بالضبط. وين ما ما كان في سؤال حقيقي لفقرة معينة، مصرّح بهيك بوضوح + سؤال بديل بأسلوب الدكتور (من تأليفي، منسوب بوضوح).

---

## فهرس الوحدات

- **الوحدة A** — الأساسيات ودورة حياة البرمجيات (محاضرة 1 + 2)
- **الوحدة B** — هندسة المتطلبات الكاملة (محاضرة 3 + 10 + 11)
- **الوحدة C** — التصميم والتنفيذ (محاضرة 4)
- **الوحدة D** — الاختبار (محاضرة 5 + 6)
- **الوحدة E** — إدارة المشروع والمخاطر (محاضرة 7)
- **الوحدة F** — قياس البرمجيات الكامل (محاضرة 8 + 9)
- **الوحدة G** — الجودة (محاضرة 12)
- **الوحدة H** — Refactoring (محاضرة 13)

---
---

# الوحدة A — الأساسيات ودورة حياة البرمجيات (محاضرة 1 + 2)

## الفقرة 1: أزمة البرمجيات وتكاليفها

**من المحاضرة:** محاضرة 1، §1 | **تذكير:** "Software: still come late, exceed budget, full of residual faults."

3 أعراض (تأخر، تجاوز ميزانية، أخطاء متبقية)، والسبب الجذري هو التعقيد (`complexity`) مش نقص الأدوات.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the primary cause of the "software crisis" as identified in the 1960s?

- أ) Rapidly increasing hardware capabilities
- ب) The rise of open-source software
- ج) The introduction of agile methodologies
- د) Inability to meet user requirements and project deadlines

**الإجابة الصحيحة: د**

**التعليل:** أرقام IBM (31% إلغاء، 53% تجاوز ميزانية بمعدل 189%) كلها مظاهر فشل تلبية متطلبات المستخدم والمواعيد. الترجمة: `crisis` = أزمة، `deadlines` = المواعيد النهائية.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** Which of the following best describes a consequence of the software crisis?

- أ) Decreased demand for software engineers
- ب) Increased costs and delays in software development projects
- ج) Improved collaboration between development teams and stakeholders
- د) A shift towards more manual testing processes

**الإجابة الصحيحة: ب**

**التعليل:** نتيجة مباشرة موثّقة بالأرقام (تجاوز 189% بالميزانية). العكس تماماً لخيارات أ وج.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** In response to the software crisis, which methodology was introduced to improve software development processes?

- أ) Waterfall model
- ب) Agile methodologies
- ج) Spiral model
- د) DevOps practices

**الإجابة الصحيحة: أ — Waterfall**

**التعليل:** تاريخياً أول نموذج منظّم رسمياً ظهر كردّ مباشر على فوضى `Build and Fix`. `Agile` وDevOps ظهروا لاحقاً بعقود، وSpiral جا بعده لسبب مختلف (المخاطر).

**📌 ملاحظة:** لاحظي إنو أسئلة هالفقرة بتربط دايماً سبب↔نتيجة↔حل، مو بس استرجاع رقم.

---

## الفقرة 2: تعريف SE + أساطير البرمجيات

**من المحاضرة:** محاضرة 1، §2.1 و §5 | **تذكير:** "Addition of more software engineers will make up the delay" — أسطورة، مش حقيقة (قانون Brooks).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
Which of the following is one of the software myths mentioned in the lecture?

- أ) Freezing requirements early always guarantees zero delays
- ب) Adding more programmers to a late project will speed up its completion
- ج) Automated testing can fully eliminate the need for a design phase
- د) Reusable components always reduce the cost of every future project

**الإجابة الصحيحة: ب**

**التعليل:** أسطورة قانون Brooks الحرفية بالمحاضرة. الترجمة: `myth` = أسطورة/معتقد خاطئ شائع.

**📌 ملاحظة:** حفظي التسعة أساطير بدقة كافية تميزيهن عن نقيضهن الصحيح، مش بس وجودهن.

---

## الفقرة 2ب: صفات مهندس البرمجيات

**من المحاضرة:** محاضرة 1، §2.2 | 3 مسؤوليات تميّزه عن "مبرمج عادي": نهج منظم وموثّق (`systematic approach`)، اختيار الأدوات المناسبة حسب المشكلة، واستغلال الموارد المتاحة بكفاءة.

---

## الفقرة 3: Program / Software / Product / Process

**من المحاضرة:** محاضرة 1، §3.1 و §9.2 | **تذكير:** "Product: is what is delivered to the customer... Process: way in which we produce software."

| المصطلح | التعريف |
|---|---|
| `Program` (برنامج) | الكود المصدري فقط |
| `Software` (برمجية) | `Program` + توثيق (`Documentation`) + إجراءات تشغيل |
| `Product` (منتج) | كل ما يُسلَّم للعميل |
| `Process` (عملية) | **الطريقة** يلي وصلنا فيها للنتيجة |

**القاعدة الذهبية:** `Product` = شو، `Process` = كيف.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
According to the lecture, which of the following completes the definition: Software = Program + Documentation + ...?

- أ) Marketing Plan
- ب) Operating Procedures
- ج) Test Budget
- د) Customer Contract

**الإجابة الصحيحة: ب (إجراءات التشغيل)**

**التعليل:** المكوّن الثالث الحرفي بتعريف Software.

---

## الفقرة 3ب: هيكل التوثيق + إجراءات التشغيل

**من المحاضرة:** محاضرة 1، §3.2-3.3 | التوثيق (`Documentation`) 4 فئات حسب مرحلة التطوير: Analysis/Specification (DFD, Context Diagram)، Design (Flow Charts, ERD)، Implementation (Source Code Listing)، Testing (Test Data/Results). إجراءات التشغيل (`Operating Procedures`) نوعان: `User Manuals` (للمستخدم: Overview, Beginner's Guide, Tutorial, Reference) و`Operational Manuals` (للفريق التقني: Installation Guide, System Administration Guide).

**📌 الترجمة:** `Cross-Reference Listing` = قائمة الإحالة المرجعية، `Entity-Relationship Diagram` = مخطط العلاقة بين الكيانات.

---

## الفقرة 4: Generic مقابل Bespoke

**من المحاضرة:** محاضرة 1، §4.1 | مين يملك المواصفة (`specification` — الترجمة: المواصفة/الوثيقة التقنية) هو الفيصل: `Generic` = المطوّر يملكها، `Bespoke` = العميل يملكها.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
A company builds a general accounting package and independently decides which features to include, then sells it to many businesses. This is:

- أ) Bespoke
- ب) Generic
- ج) Embedded
- د) Real-time

**الإجابة الصحيحة: ب**

**التعليل:** المطوّر يملك القرار = Generic.

---

## الفقرة 4ب: مكونات منتج البرمجية (Software Product)

**من المحاضرة:** محاضرة 1، §4.2 | المنتج = كل ما يُصمَّم للتسليم، 10 عناصر: Source Code, Object Codes, Reports, Plan, Documents, Manuals, Data, Test Suites, Test Results, Prototypes.

---

## الفقرة 5: Good Software مقابل Software Process

**من المحاضرة:** محاضرة 1، §8 و §6.1 | قائمتان من 4 عناصر بيسهل تختلطوا:

| Good Software (صفات المنتج) | Software Process (أنشطة العملية) |
|---|---|
| Maintainability (قابلية الصيانة) | Specification (تخصيص) |
| Dependability & Security (الموثوقية والأمان) | Development (تطوير) |
| Efficiency (الكفاءة) | Validation (تحقق) |
| Acceptability (القبول) | Evolution (تطوّر) |

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
Which pair correctly matches a Software Process activity with its purpose?

- أ) Validation — designing architecture
- ب) Specification — defining what the system should do
- ج) Evolution — writing initial code
- د) Development — checking customer requirements

**الإجابة الصحيحة: ب**

**التعليل:** باقي الأزواج مقلوبة عمداً.

---

## الفقرة 5ب: خصائص البرمجية (Software Characteristics) + تطبيقاتها

**من المحاضرة:** محاضرة 1، §6.2 و §7 | 4 خصائص تميّزها عن الهاردوير: **لا تتآكل** (`does not wear out` — منحنى أعطالها ينخفض باستمرار، بعكس منحنى U للهاردوير)، **لا تُصنَّع بل تُنسَخ** (`not manufactured, just copied`)، **قابلة لإعادة الاستخدام**، و**مرنة** (`flexible`).

8 أنواع تطبيقات: System Software (compilers, OS)، Real-time Software، Embedded Software، Business Software، Personal Computer Software، AI Software، Web-Based Software، Engineering & Scientific Software (CAD, SPSS, MATLAB).

---

## الفقرة 6: Deliverables مقابل Milestones

**من المحاضرة:** محاضرة 1، §9.1 | `Deliverable` (مُخرَج) = شيء ملموس. `Milestone` (معلَم/محطة تقييم) = حدث يقيس التقدم.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
"Completion of the design documentation" is best classified as a:

- أ) Deliverable
- ب) Milestone
- ج) Software Myth
- د) Process Metric

**الإجابة الصحيحة: ب**

**التعليل:** مثال حرفي بالمحاضرة على Milestone.

---

## الفقرة 7: Measure / Measurement / Metrics

**من المحاضرة:** محاضرة 1، §9.3 | `Measure` (مقياس فردي) → `Measurement` (فعل القياس) → `Metrics` (ربط عدة measures).

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** A metric is:

- أ) an ISO standard unit
- ب) a qualitative measure of a system attribute
- ج) a quantitative measure of the degree to which a system component possesses a given attribute
- د) a qualitative attribute which determines degree of measurement
- ه) an attributed quantity in degrees

**الإجابة الصحيحة: ج**

**التعليل:** المقياس بطبيعته **كمّي** (quantitative) لا نوعي (qualitative) — هاد الفرق نفسه هو الفخ بخيار ب.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Why is it useful to measure aspects of a system?

- أ) Human perception is inaccurate
- ب) Numbers allow comparing, controlling, predicting
- ج) Measurements track progress
- د) Gives quality assessment
- ه) All of the above

**الإجابة الصحيحة: ه**

**التعليل:** كل الأسباب صحيحة ومكمّلة لبعض.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What are the features of a poor metric?

- أ) complex, hard-to-measure, persuasive
- ب) complex, consistent, language-independent
- ج) simple, hard-to-measure, no units
- د) complex, subjective, inconsistent
- ه) complex, subjective, persuasive

**الإجابة الصحيحة: د**

**التعليل:** المقياس السيء: معقّد + ذاتي (`subjective`) + غير متسق (`inconsistent`) — عكس الجيد (بسيط، موضوعي، متسق).

**📌 ملاحظة:** هاي الفقرة كانت منطقة عارية تماماً بالبنك الخارجي القديم — لكن exams.md عطاها تغطية ممتازة. راجعيها منيح، بترجع بقوة بمحاضرة 8/9.

---

## الفقرة 8: Productivity + Module + Component

**من المحاضرة:** محاضرة 1، §9.4 | `Productivity = LOC / Person-Months`. `Component` (مكوّن) أكبر من `Module` (وحدة)، ويوفر خدمته عبر `interface`.

#### 🧪 نمط 2023-2024
**السؤال:** Which metric is often used to measure the efficiency of a software development team?

- أ) Defect density
- ب) Lines of code per person-month
- ج) Code coverage
- د) Number of test cases

**الإجابة الصحيحة: ب**

**التعليل:** تعريف Productivity بالضبط.

---

## الفقرة 9: دور الإدارة في التطوير

**من المحاضرة:** محاضرة 1، §10 | 4 عوامل: **People + Product + Process + Project**. تجميد المتطلبات (`freeze`) تحت Project بيقلل المخاطر.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
Under which management factor does the lecture discuss freezing requirements to avoid software surprises?

- أ) People
- ب) Product
- ج) Process
- د) Project

**الإجابة الصحيحة: د**

---

## الفقرة 10: نماذج دورة حياة البرمجيات (SDLC Models)

**من المحاضرة:** محاضرة 2، كاملة | Spiral = الوحيد بـ`Risk Analysis` صريح كل لفة.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which model is characterized by iterations and feedback cycles?

- أ) Waterfall
- ب) Spiral
- ج) Agile
- د) V-shaped

**الإجابة الصحيحة: ج — Agile**

**التعليل:** *(معرفة عامة أكثر من كونها مذكورة بالاسم بمحاضرتك؛ لو الخيارات ما فيها Agile فـ Spiral هو الأقرب المدروس)*

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which model is characterized by a linear and sequential flow?

- أ) Agile
- ب) Waterfall
- ج) Spiral
- د) Iterative

**الإجابة الصحيحة: ب — Waterfall**

**التعليل:** تشبيه "الشلال": الماء ينزل لجهة وحدة بلا رجوع.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which model involves construction of a partial system progressively refined through iterations?

- أ) Waterfall
- ب) Spiral
- ج) Incremental
- د) V-shaped

**الإجابة الصحيحة: ج (Incremental = Iterative Enhancement بمحاضرتك)**

**التعليل:** بيحذّر: خلط شائع بين Iterative Enhancement (منتج قابل للاستخدام كل دورة) وEvolutionary (لأ).

**📌 ملاحظة:** لاحظي إنو خيارات الأسئلة أحياناً بتستخدم أسماء مو مطابقة 100% لأسماء محاضرتك (Incremental، V-shaped). ارجعي لتعريف السلوك مش لاسم الموديل.


---
---

# الوحدة B — هندسة المتطلبات الكاملة (محاضرة 3 + 10 + 11)

## الفقرة 0أ: تعريف المتطلب + أهمية هندسة المتطلبات

**من المحاضرة:** محاضرة 3، §1-2 | المتطلب (`requirement`) له وظيفة مزدوجة: بيان عام (أساس لعرض/Bid) أو مواصفة دقيقة (أساس للعقد). الهندسة = حل مشاكل، وما تقدر تحل مشكلة إلا بفهمها كاملة.

**القاعدة الذهبية:** تصحيح خطأ متطلب بمرحلة الصيانة = **100 ضعف** تكلفته وقت جمع المتطلبات. أخطاء السلامة (`safety`) غالباً من تحديد المتطلبات، أخطاء تانية غالباً من التنفيذ.

---

## الفقرة 0ب: التحديات السبعة لجمع المتطلبات (Present State of Practice)

**من المحاضرة:** محاضرة 3، §2 (تابع) | 7 تحديات: صعوبة الاكتشاف، تغيّر المتطلبات باستمرار، الاعتماد الزائد على أدوات CASE، ضيق الجدول الزمني، حواجز التواصل (لغة المستخدم الطبيعية مقابل دقة المطوّر)، تطوير موجّه بالسوق (عملاء مجهولون)، نقص الموارد.

---

## الفقرة 0ج: Known / Unknown / Undreamt Requirements

**من المحاضرة:** محاضرة 3، §3 | `Known` (معروفة، واضحة من البداية) — `Unknown` (موجودة بس مو واضحة الآن، توقيت أو صاحب مصلحة مختلف) — `Undreamt` (العميل نفسه ما يتخيلها، تحتاج خبرة المحلل بالمجال). الثلاثة ممكن تكون Functional أو Non-functional.

---

## الفقرة 0د: User Requirements مقابل System Requirements

**من المحاضرة:** محاضرة 3، §4 | `User Requirements`: لغة طبيعية، للعميل، عامة. `System Requirements`: وثيقة مُهيكَلة، للمطورين، مفصّلة، ممكن جزء من العقد. متطلب مستخدم واحد غالباً يتفرّع لعدة متطلبات نظام (مثال MHC-PMS: متطلب واحد → 5 متطلبات نظام).

---

## الفقرة 0ه: What مقابل How

**من المحاضرة:** محاضرة 3، §6 | `What` (غرض النظام، خارجي، من `Application Domain`) مقابل `How` (بنية النظام، داخلي، من `Machine Domain`). **المتطلبات = What فقط** — أي ذكر لتقنية محددة (مثل "يستخدم MySQL") هو `How` وينتمي للتصميم لا للمتطلبات.

---

## الفقرة 0و: عملية المتطلبات الأساسية (Essential Requirements Process)

**من المحاضرة:** محاضرة 3، §5 | 4 خطوات: **(1)** فهم المشكلة (مقابلات، استبيانات، ملاحظة، نمذجة أولية) **(2)** نمذجة وتحليلها (تحليل بنيوي/كائني/صوري) **(3)** الاتفاق عليها (تحقق، حل خلافات، تفاوض) **(4)** توصيلها (مواصفة، توثيق، اجتماعات مراجعة) — بالإضافة لإدارة تغيير مستمرة (مش خطوة تنتهي، بل دورة ترجع للخطوة الأولى باستمرار).

---

## الفقرة 0ز: الغموض في المتطلبات (مثال "search" الشهير)

**من المحاضرة:** محاضرة 3، §8 | متطلب غامض ممكن يُفسَّر بطرق مختلفة تماماً. المثال الكلاسيكي: متطلب "المستخدم لازم يقدر يبحث بقوائم المواعيد" — المستخدم يقصد بحث شامل بكل العيادات، بينما المطور فهمها بحث داخل عيادة واحدة فقط. النتيجة: نظام "نُفِّذ حرفياً" لكنه ما لبّى الحاجة الفعلية.

**القاعدة الذهبية:** الحل = تفصيل أكثر دقة بمرحلة System Requirements، مو الاكتفاء بصياغة User Requirements العامة.

---

## الفقرة 1: هدف هندسة المتطلبات + خصائص المتطلب الجيد

**من المحاضرة:** محاضرة 3، §1-2 | `Requirements Engineering` (هندسة المتطلبات): جمع وتوثيق متطلبات العميل عبر 4 أنشطة.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the primary goal of requirements engineering?

- أ) Designing the architecture
- ب) Developing the UI
- ج) Gathering and documenting the software requirements
- د) Implementing features

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which of the following is NOT a characteristic of a good requirement?

- أ) Consistency
- ب) Completeness
- ج) Ambiguity
- د) Verifiability

**الإجابة الصحيحة: ج — الغموض (`Ambiguity`)**

**التعليل:** هو عكس المطلوب تماماً؛ مثال كلمة "search" الشهير بالمحاضرة يوضح كيف الغموض بيأدي لتنفيذ خاطئ.

---

## الفقرة 2: Stakeholder + Scope Creep + Requirements Volatility

**من المحاضرة:** محاضرة 3، §17 | `Stakeholder` (صاحب مصلحة): أي شخص متأثر/مؤثر بالمشروع.

#### 🧪 نمط 2023-2024
**السؤال:** What does 'stakeholder' refer to?

- أ) A person who writes code
- ب) Anyone who has an interest in the project's outcome
- ج) The project manager only
- د) The person who provides funding

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2023-2024
**السؤال:** What does 'scope creep' refer to?

- أ) An increase in budget
- ب) An expansion of project scope without corresponding adjustments in resources/time
- ج) A delay in schedule
- د) A reduction in team size

**الإجابة الصحيحة: ب**

**التعليل:** الترجمة: `Scope Creep` = زحف/توسّع النطاق غير المُدار.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is meant by "requirements volatility"?

- أ) Tendency for requirements to change over time due to evolving needs
- ب) Stability of requirements throughout the lifecycle
- ج) Ability to implement without rework
- د) Process of validating against expectations

**الإجابة الصحيحة: أ**

**📌 ملاحظة:** بدون `Requirements Management` منضبطة، التغيّر الطبيعي بالمتطلبات (Volatility) بيتحول لـ Scope Creep غير مُدار.

---

## الفقرة 3: Functional مقابل Non-functional Requirements

**من المحاضرة:** محاضرة 3، §7 | Functional = "شنو النظام يسوي؟" — Non-functional = "كيف بجودة معينة؟"

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** Which best describes "functional requirements"?

- أ) How the system performs under conditions
- ب) Performance metrics and scalability
- ج) UI design and usability
- د) What the system should do, including actions and services

**الإجابة الصحيحة: د**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What does "non-functional requirements" refer to?

- أ) Not related to user interactions
- ب) How the system performs its functions (performance, security, usability)
- ج) Optional, can be excluded
- د) Only applicable to hardware

**الإجابة الصحيحة: ب**

**التعليل:** تنبيه: غير الوظيفية **إلزامية** زي الوظيفية، مو اختيارية (فخ خيار ج).

---

## الفقرة 4: أنشطة هندسة المتطلبات الأربعة (Elicitation → Analysis → Documentation → Validation)

**من المحاضرة:** محاضرة 3، §9-14 | الترتيب حرفياً: `Elicitation` (استخراج) → `Analysis and Negotiation` (تحليل وتفاوض) → `Documentation` (توثيق) → `Validation` (تحقق).

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** Which best describes "requirements elicitation"?

- أ) Documenting after gathering
- ب) Defining verification/validation during testing
- ج) Discovering and collecting stakeholder needs
- د) Prioritizing based on business value

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** Which technique is commonly used for gathering requirements during SRS development?

- أ) Code reviews
- ب) Prototyping
- ج) Performance testing
- د) Version control

**الإجابة الصحيحة: ب**

**التعليل:** Prototyping (نمذجة أولية) أداة ممتازة لكشف الغموض (مثال search).

---

## الفقرة 5: Traceability + إدارة المتطلبات

**من المحاضرة:** محاضرة 3، §17-18 | `Traceability` (قابلية التتبع): ربط كل متطلب بمصدره وبتنفيذه لاحقاً.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is "traceability" in the context of an SRS?

- أ) Tracking codebase changes
- ب) Documenting test cases from requirements
- ج) Ensuring requirements met during testing
- د) Ability to link requirements back to source and forward to implementation

**الإجابة الصحيحة: د**

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** What is the purpose of including the traceability matrix in the SRS?

- أ) To map test cases to requirements for validation
- ب) To break down project milestones
- ج) To outline architecture/design patterns
- د) To document user feedback

**الإجابة الصحيحة: أ**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is one potential consequence of poorly defined requirements?

- أ) Increased satisfaction due to flexibility
- ب) Higher success likelihood
- ج) Increased costs due to rework, scope creep, miscommunication
- د) Faster cycles due to less documentation

**الإجابة الصحيحة: ج**

**التعليل:** تصحيح خطأ بمرحلة الصيانة بيكلف حتى 100 ضعف تصحيحه أثناء جمع المتطلبات.

---

## الفقرة 6: SRS كوثيقة "عقد" (محاضرة 10)

**من المحاضرة:** محاضرة 10، §1 | `SRS` مثل مخطط بناء بيت — توثّق كل التفاصيل عشان ما يصير خلاف بين العميل والفريق.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the primary purpose of an SRS document?

- أ) Project management strategy
- ب) Software architecture and design
- ج) Detailed description of intended capabilities and constraints
- د) Testing strategies

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** Which document serves as a basis for the agreement between the customer and the development team?

- أ) SDD
- ب) SAD
- ج) SRS
- د) TPD
- و) None

**الإجابة الصحيحة: ج**

**التعليل:** الترجمة: `SDD` = وثيقة التصميم، `SAD` = وثيقة المعمارية.

#### 🧪 نمط 2023-2024 — الفصل الثاني *(معرفة عامة تكمّل المحاضرة)*
**السؤال:** Who is typically responsible for preparing the SRS?

- أ) Project manager
- ب) System architect
- ج) QA team
- د) Business analyst
- و) None

**الإجابة الصحيحة: د — Business Analyst**

**التعليل:** *(دور تنظيمي لم يُسمَّ صراحة بالمحاضرة، اعتماداً على معرفة عامة)*

---

## الفقرة 7: أقسام SRS التفصيلية — External Interfaces / Functions / Performance / Design Constraints (محاضرة 10-11)

**من المحاضرة:** محاضرة 10، §4-5 ومحاضرة 11 | 7 أبواب لـ`Specific Requirements`: External Interfaces, Functions, Performance, Logical DB, Design Constraints, Software System Attributes, Organization.

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** Which section typically includes info about hardware/software interfaces?

- أ) Functional requirements
- ب) Non-functional
- ج) External interfaces
- د) User characteristics
- و) None

**الإجابة الصحيحة: ج**

**التعليل:** مثال ACME: كرت شبكة Ethernet + قارئ باركود عبر serial port.

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** Which section typically includes performance requirements details?

- أ) Functional
- ب) Non-functional
- ج) System constraints
- د) User characteristics
- و) None

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** Which type of requirement specifies constraints on development process and implementation?

- أ) Functional
- ب) Non-functional
- ج) Performance requirement
- د) Design requirement
- و) None

**الإجابة الصحيحة: د — Design Constraints (قيود التصميم)**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** Which SRS section would typically contain user roles and permissions info?

- أ) Functional Requirements
- ب) Non-Functional Requirements
- ج) System Architecture
- د) Use Cases or User Stories

**الإجابة الصحيحة: د**

**التعليل:** مثال مكتبة ACME: Public/Private/Administration modes موثّقة عبر use cases مخصصة لكل دور.

---

## الفقرة 8: Assumptions and Dependencies + إدارة التغيير (محاضرة 11)

**من المحاضرة:** محاضرة 11، §3 | `Assumptions and Dependencies` (الافتراضات والتبعيات): عوامل خارجية غير مضمونة، لو تغيّرت لازم مراجعة الـSRS كاملة.

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** What is the purpose of including assumptions and dependencies in the SRS?

- أ) Outline risks
- ب) Justify prioritizing requirements
- ج) Clarify context and limitations of requirements
- د) Define acceptance criteria
- و) None

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** Which aspect of SRS is crucial for ensuring the software can be maintained/enhanced in the future?

- أ) Requirements prioritization
- ب) Change control procedures
- ج) User acceptance criteria
- د) Performance metrics
- و) None

**الإجابة الصحيحة: ب — إجراءات التحكم بالتغيير**


---

## الفقرة 9: تحليل وتحقق المتطلبات + SRS كوثيقة (محاضرة 3 نفسها)

**من المحاضرة:** محاضرة 3، §12-16 | `Requirements Analysis` (تحليل المتطلبات): تنقيح وتنظيم المتطلبات المُستخرَجة، حل التعارضات بينها. `Requirements Validation` (التحقق من المتطلبات): فحص الوثيقة النهائية عبر 5 معايير أساسية: **الصلاحية** (`Validity` — هل هاي المتطلبات فعلاً؟)، **الاتساق** (`Consistency`)، **الاكتمال** (`Completeness`)، **الواقعية** (`Realism`)، و**قابلية التحقق** (`Verifiability`). وثيقة `SRS` نفسها لها 5 فئات مستخدمين رئيسية: العملاء (`Customers`)، المدراء (`Managers`)، مهندسو النظام (`System Engineers`)، مهندسو الاختبار (`Test Engineers`)، ومهندسو الصيانة (`Maintenance Engineers`).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
Which of the following is NOT one of the five Requirements Validation checks discussed in the lecture?

- أ) Consistency
- ب) Completeness
- ج) Profitability
- د) Verifiability


**الإجابة الصحيحة: ج — Profitability**

**التعليل:** مش من المعايير الخمسة (Validity, Consistency, Completeness, Realism, Verifiability).

---
---

# الوحدة C — التصميم والتنفيذ (محاضرة 4)

## الفقرة 0أ: Design مقابل Implementation + متى نوثّق رسمياً

**من المحاضرة:** محاضرة 4، §1-2 | `Design` (نشاط إبداعي: تحديد المكونات وعلاقاتها بناءً على المتطلبات) → `Implementation` (تحقيق التصميم كبرنامج فعلي). التوثيق الرسمي بـ`UML` مهم أكتر مع: منهج كائني التوجه + فريق أكبر من شخص — مو إلزامي لكل مشروع (مثلاً سكربت Python بسيط لشخص واحد ما يحتاج UML مفصّل).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
Formal UML documentation of a design becomes MORE important when:

- أ) The project uses a simple scripting language and one developer
- ب) The project uses an object-oriented language and involves more than one developer
- ج) The design is trivial and unlikely to change
- د) UML is always mandatory regardless of context


**الإجابة الصحيحة: ب**

**التعليل:** المحاضرة صراحة: "use it when OO, not Python" — التوثيق الرسمي يرتبط بمنهج OO وحجم الفريق، مو إلزام مطلق.

---

## الفقرة 0ب: خطوات التصميم الكائني التوجه الخمس (OOD Steps)

**من المحاضرة:** محاضرة 4، §3 | 5 خطوات مرتبطة تسلسلياً (كل خطوة تبني على السابقة): **(1)** فهم السياق والتفاعلات (`Context & Interaction Models`) **(2)** التصميم المعماري (`Architectural Design`) **(3)** تحديد أصناف الكائنات (`Object Class Identification`) **(4)** بناء نماذج التصميم (`Design/System Models` — هيكلية وديناميكية) **(5)** تحديد الواجهات (`Interface Specification`). المثال المرافق طول المحاضرة: نظام محطة طقس (`Weather Station`) بيرسل بياناته عبر قمر صناعي.

**📌 الترجمة:** `Object Class Identification` = استخراج أصناف الكائنات الفعلية من وصف النظام، وهي عملية **تكرارية** (مو خطية بحتة، ترجعلها أكتر من مرة).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
Which OOD step comes immediately BEFORE "Object Class Identification" in the lecture's sequence?

- أ) Interface Specification
- ب) Design/System Models
- ج) Architectural Design
- د) Implementation


**الإجابة الصحيحة: ج — Architectural Design**

**التعليل:** الترتيب الحرفي: Context/Interactions → Architectural Design → Object Class Identification → Design Models → Interface Specification.

---

## الفقرة 0ج: Structural مقابل Dynamic Models + Interface Specification

**من المحاضرة:** محاضرة 4، §3.4-3.5 | `Structural/Static Models` (هيكلية/ساكنة، مثالها `Class Diagram`): تصف البنية الثابتة. `Dynamic Models` (ديناميكية، مثالها `Sequence Diagram`, `State Diagram`): تصف التفاعلات وتغيّر الحالة بمرور الزمن. `Interface Specification` (تحديد الواجهات): تحديد توقيعات ودلالات الخدمات بين المكونات **دون** كشف كيفية تنفيذها الداخلي — أساس أي `API`.

---

## الفقرة 0د: Host-Target Development

**من المحاضرة:** محاضرة 4، §4.3 | التطوير على منصتين: `Host` (بيئة التطوير، فيها أدوات ومحررات وأدوات تصحيح) و`Target` (البيئة الفعلية اللي رح يشتغل عليها النظام النهائي عند المستخدم) — قد تختلفان تماماً (مثلاً تطوير على PC، والتشغيل الفعلي على جهاز embedded محدود الموارد).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
In Host-Target development, the "Target" refers to:

- أ) The development environment with debugging tools
- ب) The actual environment where the final system will run
- ج) The version control repository
- د) The requirements document


**الإجابة الصحيحة: ب**

---

## الفقرة 1: Use Case + النماذج الديناميكية مقابل الساكنة

**من المحاضرة:** محاضرة 4، §3.1 و §3.4 | `Use Case` جزء من `Interaction Model` (ديناميكي). `Class Diagram` = هيكلي/ساكن.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the purpose of a use case in requirements engineering?

- أ) Define system architecture
- ب) Specify implementation details
- ج) Describe interactions between actors and the system
- د) Document project management plan

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which modeling technique represents the dynamic behavior of a system over time?

- أ) Use case diagram
- ب) Class diagram
- ج) Activity diagram
- د) Sequence diagram

**الإجابة الصحيحة: د — Sequence diagram**

**التعليل:** الكائنات أفقياً، الزمن عمودياً.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is [the class diagram] used to represent? *(من سؤال مشابه بنفس الدورة)*

**الإجابة الصحيحة: بنية العلاقات الثابتة بين الفئات (Structural/Static)**

**التعليل:** عكس Sequence/State (ديناميكية).

**📌 الترجمة:** `Structural/Static Models` = نماذج هيكلية/ساكنة، `Dynamic Models` = نماذج ديناميكية.

---

## الفقرة 2: مستويات إعادة الاستخدام (Reuse Levels)

**من المحاضرة:** محاضرة 4، §4.1 | 4 مستويات: Abstraction ← Object ← Component ← System (من الأبسط للأعقد).

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which reuse approach involves assembling components from various sources to create a new system?

- أ) Object-oriented reuse
- ب) Application frameworks
- ج) Component-based reuse
- د) Customization reuse

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which approach involves adapting existing components to fit new requirements WITHOUT modifying core functionality?

- أ) Object-oriented reuse
- ب) Application frameworks
- ج) Component-based reuse
- د) Wrapping reuse

**الإجابة الصحيحة: د — Wrapping (تغليف)**

**التعليل:** الكلمة المفتاحية "بدون تعديل الوظيفة الأساسية".

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which approach involves MODIFYING existing components to meet specific requirements?

- أ) Object-oriented reuse
- ب) Application frameworks
- ج) Component-based reuse
- د) Customization reuse

**الإجابة الصحيحة: د — Customization (تخصيص)**

**التعليل:** عكس Wrapping تماماً (هون *بيتعدّل* الكود الداخلي).

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which approach involves creating components easily adapted/extended for different applications?

- أ) Object-oriented reuse
- ب) Application frameworks
- ج) Component-based reuse
- د) Customization reuse

**الإجابة الصحيحة: ب — Application Frameworks (أطر تطبيقية)**

**📌 القاعدة الذهبية:** Wrapping = بدون تعديل داخلي. Customization = بتعديل داخلي. Frameworks = مصمَّمة أصلاً للتوسعة.

---

## الفقرة 3: فوائد ومشاكل إعادة الاستخدام

**من المحاضرة:** محاضرة 4، §4.1

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the main advantage of reusing software components?

- أ) Reduced development time and cost
- ب) Improved quality
- ج) Enhanced maintainability
- د) Increased performance

**الإجابة الصحيحة: أ**

#### 🧪 نمط 2023-2024
**السؤال:** _______ is a problem of software reusing:

- أ) Increased maintenance costs
- ب) Lack of tool support
- ج) Finding, understanding, adapting reusable components
- د) A & C
- ه) A & B & C

**الإجابة الصحيحة: ه**

**التعليل:** إعادة الاستخدام مش "مجانية"، فيها تكاليف بحث وتقييم وتكييف ودمج حقيقية.

---

## الفقرة 4: Configuration Management + Version Control

**من المحاضرة:** محاضرة 4، §4.2 | 3 أنشطة: `Version Management` (إدارة النسخ)، `System Integration` (دمج النظام)، `Problem Tracking` (تتبع المشاكل).

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the primary purpose of a software configuration management system?

- أ) Track project progress
- ب) Identify and fix defects
- ج) Manage changes to software artifacts throughout development
- د) Estimate project costs

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the primary purpose of version control systems like Git?

- أ) Manage budgets/timelines
- ب) Auto-generate documentation
- ج) Optimize performance
- د) Track changes, enable collaboration, revert to previous states

**الإجابة الصحيحة: د**

---

## الفقرة 5: مراحل التطوير والصيانة (Maintenance)

**من المحاضرة:** محاضرة 4، §4.3 (مرتبط بمحاضرة 1، Software Evolution)

#### 🧪 نمط 2023-2024
**السؤال:** Maintenance may involve:

- أ) only additional coding and testing
- ب) only additional analysis and design
- ج) only additional design, coding and testing
- د) any phase except analysis
- ه) any of the development phases

**الإجابة الصحيحة: ه**

**التعليل:** الصيانة ممكن تحتاج الرجوع لأي مرحلة، حتى إعادة تحليل المتطلبات نفسها.


---
---

# الوحدة D — الاختبار (محاضرة 5 + محاضرة 6: JUnit)

## الفقرة 0أ: Validation مقابل Verification (V&V)

**من المحاضرة:** محاضرة 5، §2 | `Validation`: "هل نبني المنتج الصحيح؟" (يلبي احتياج العميل الحقيقي). `Verification`: "هل نبني المنتج بشكل صحيح؟" (يطابق المواصفات المكتوبة). ممكن ينجح Verification بالكامل ويفشل Validation — لأن وثيقة المتطلبات نفسها ما تعكس دايماً الاحتياج الحقيقي للعميل.

---

## الفقرة 0ب: Inspections مقابل Testing (Static مقابل Dynamic Verification)

**من المحاضرة:** محاضرة 5، §3 | `Inspections` (مراجعات — تحليل ساكن `static`): تراجع Requirements Spec، Architecture، UML Models، DB Schemas، والكود **بدون تشغيله**. `Testing` (تحليل ديناميكي): يشغّل البرنامج فعلياً ويراقب سلوكه.

**مزايا Inspections:** تكشف مشاكل الأسلوب البرمجي والخوارزميات غير المناسبة، ممكن تراجع كود غير مكتمل، وتتفادى مشكلة "خطأ يخفي خطأ آخر". **حدودها:** ما تكتشف مشاكل الأداء (`performance`) أو التوقيت (`timing`) أو تفاعلات وقت التشغيل غير المتوقعة.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
Which of the following is an advantage of software inspections over dynamic testing?

- أ) They can detect timing problems accurately
- ب) They can be applied to incomplete system versions without extra cost
- ج) They always find more defects than testing
- د) They require the system to be fully executable


**الإجابة الصحيحة: ب**

---

## الفقرة 1: هدف الاختبار + Validation مقابل Verification

**من المحاضرة:** محاضرة 5، §1-2 | `Validation` = "نبني الصحيح؟" — `Verification` = "نبنيه صح؟"

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the primary purpose of software testing?

- أ) Ensure software meets customer requirements
- ب) Improve performance
- ج) Identify and fix defects
- د) Estimate effort

**الإجابة الصحيحة: أ**

**التعليل:** يتقاطع مع مفهوم Validation.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the primary goal of software testing? *(صياغة أدق)*

- أ) Prove software is bug-free
- ب) Find as many defects as possible before release
- ج) Ensure all requirements are met
- د) Improve code quality

**الإجابة الصحيحة: ب**

**التعليل:** تحذير: خيار "أ" هو بالضبط الفهم الخاطئ المُحذَّر منه — الاختبار **يكشف** الأخطاء، ما **يثبت غيابها**.

---

## الفقرة 2: مستويات الاختبار — Unit / Integration / System

**من المحاضرة:** محاضرة 5، §8 | التدرّج: Unit → Component/Integration → System.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique involves executing the entire system with realistic data in a simulated environment?

- أ) Unit testing
- ب) Regression testing
- ج) System testing
- د) Acceptance testing

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique focuses on testing interactions between different components?

- أ) Integration testing
- ب) Unit testing
- ج) System testing
- د) Acceptance testing

**الإجابة الصحيحة: أ**

#### 🧪 نمط 2023-2024
**السؤال:** The testing phase doesn't require:

- أ) testing that implementation compiles correctly
- ب) matches design
- ج) matches requirements
- د) components work separately/together
- ه) interacts correctly with environment

**الإجابة الصحيحة: أ**

**التعليل:** التصريف الناجح (`compiling`) شرط *سابق* للاختبار، مو نشاط اختبار بحد ذاته.

---

## الفقرة 3: White-box مقابل Black-box Testing

**من المحاضرة:** محاضرة 5 + محاضرة 6 | White-box = بناءً على الكود الداخلي. Black-box = بناءً على المواصفات الخارجية فقط.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique involves executing test cases derived from the internal structure of the software?

- أ) White-box testing
- ب) Black-box testing
- ج) Regression testing
- د) Acceptance testing

**الإجابة الصحيحة: أ**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the primary difference between white-box and black-box testing?

- أ) White-box focuses on internal logic, black-box on input-output behavior
- ب) White-box by end-users, black-box by developers
- ج) White-box requires knowledge of external systems
- د) White-box more cost-effective

**الإجابة الصحيحة: أ**

**📌 هالفرق من أكثر المفاهيم تكراراً ببنك الأسئلة كله — احفظيه منيح.**

---

## الفقرة 4: Stress / Regression Testing + خصائص تقنية الاختبار الجيدة

**من المحاضرة:** محاضرة 5، §5-7

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique involves testing system's ability to handle maximum expected load?

- أ) Stress testing
- ب) Usability testing
- ج) Regression testing
- د) Integration testing

**الإجابة الصحيحة: أ**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is regression testing?

- أ) Testing new features
- ب) Retesting existing functionality after changes to ensure no new defects introduced
- ج) Testing performance under heavy load
- د) Testing security

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which is NOT a characteristic of a good testing technique?

- أ) High fault detection rate
- ب) Ability to uncover complex defects
- ج) Low time and cost requirements
- د) High execution speed

**الإجابة الصحيحة: د**

**التعليل:** سرعة التنفيذ **مو** معياراً جوهرياً للجودة (تقنية بطيئة لكن فعّالة تبقى جيدة).

---

## الفقرة 5: Test Case مقابل Test Data

**من المحاضرة:** محاضرة 5، §4 | `Test Case` (حالة اختبار) = المواصفة الكاملة (مدخل + مخرج متوقع + سبب). `Test Data` (بيانات اختبار) = المدخلات فقط.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is a test case in software testing?

- أ) A step-by-step procedure only
- ب) A set of preconditions, inputs, execution steps, and expected results
- ج) A tool to automate testing
- د) A document outlining testing strategy

**الإجابة الصحيحة: ب**

---

## الفقرة 4ب: استراتيجيات اختيار حالات الاختبار — Partition Testing + Boundary Value Analysis

**من المحاضرة:** محاضرة 5، §11-12 | `Partition Testing`: قسّم كل المدخلات الممكنة (صحيحة وخاطئة) لمجموعات (`partitions`) بحيث كل عناصر المجموعة الواحدة يُتوقّع نفس السلوك — اختر حالة اختبار واحدة على الأقل من كل مجموعة. تحديد الـ partitions عبر: مواصفات البرنامج، وثائق المستخدم، أو الخبرة. **العلاقة بين input/output partitions ليست دائماً 1:1**.

`Boundary Value Analysis` (تحليل القيم الحدودية): أفضل قيم للاختبار هي عند **حدود** كل partition (تكشف أخطاء `off-by-one` الشائعة: `<` بدل `<=`)، بالإضافة لقيمة من منتصف الـ partition للتأكد من السلوك الطبيعي.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
A function accepts ages from 18 to 65 inclusive. Which set of test values best applies Boundary Value Analysis?

- أ) 40 only
- ب) 17, 18, 65, 66, and 40
- ج) 1, 100, 1000
- د) 18 and 65 only


**الإجابة الصحيحة: ب**

**التعليل:** الحدود (17/18 و65/66) + قيمة من المنتصف (40) — تطبيق مباشر لقاعدة Boundary Value Analysis.

---

## الفقرة 6: JUnit — Annotations + Assertions + Test Suite

**من المحاضرة:** محاضرة 6 | `@Test`, `@Before`, `@After`, `@BeforeClass` (static), `@AfterClass` (static).

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** In JUnit, what does the @Test annotation signify?

- أ) Setup method
- ب) Test method
- ج) Teardown method
- د) Helper method

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** Which annotation executes code BEFORE EACH test method?

- أ) @BeforeClass
- ب) @BeforeAll
- ج) @Before
- د) @BeforeEach

**الإجابة الصحيحة: ج**

**التعليل:** بمحاضرتك استُخدمت أسماء JUnit 4 (`@Before`/`@BeforeClass`)، مو JUnit 5 (`@BeforeEach`/`@BeforeAll`) رغم تطابق المفهوم.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is an assertion in JUnit?

- أ) A method that throws exception if test fails
- ب) A statement that checks whether a condition is true/false during a test
- ج) A comment describing test purpose
- د) A method that initializes test environment

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the purpose of a test suite in JUnit?

- أ) Group related test cases together for execution
- ب) Generate test reports
- ج) Define overall testing strategy
- د) Automatically fix bugs

**الإجابة الصحيحة: أ**

---

## الفقرة 7: Code Coverage

**من المحاضرة:** محاضرة 6 | نسبة الكود المُنفَّذ فعلياً أثناء الاختبار — تغطية 100% **لا تعني** خلوّ الكود من الأخطاء.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the purpose of measuring "Code Coverage"?

- أ) Assess overall code quality
- ب) Determine percentage of code executed by automated tests
- ج) Identify security vulnerabilities
- د) Track testing team progress

**الإجابة الصحيحة: ب**


---
---

# الوحدة E — إدارة المشروع والمخاطر (محاضرة 7)

## الفقرة 0أ: مصطلحات الجدولة الأساسية

**من المحاضرة:** محاضرة 7، §1-2 | 4 أسئلة قبل أي تطوير: نفهم حاجة المستثمر؟ نقدر نصمم حل؟ كم يستغرق؟ كم يكلف؟ — آخر سؤالين يحتاجان `Scheduling`. مصطلحات أساسية: `Activity` (مهمة تستغرق وقتاً محدداً)، `Milestone` (نقطة زمنية تُعلن اكتمال المهمة)، `Precursor` (بادرة — حدث يجب أن يحدث قبل بدء المهمة)، `Duration` (المدة اللازمة)، `Due Date` (الموعد النهائي).

---

## الفقرة 3ب: فريق التطوير وتنظيمه

**من المحاضرة:** محاضرة 7، §8 | 8 مهام أساسية تحتاج إسناداً بشرياً: تحليل، تصميم نظام، تصميم برنامج، تنفيذ، اختبار، تدريب، صيانة، جودة. معايير اختيار الأفراد الستة: القدرة، الاهتمام، الخبرة، التدريب المتاح، القدرة على التواصل، ومهارات الإدارة. التنظيم هرمي — كل عضو يتواصل مع رئيسه المباشر بشكل أساسي، لا بالضرورة مع بقية الفريق (نموذج `Chief Programmer Team`).

---

## الفقرة 6ب: تصنيف المخاطر (المصدر/التأثير) + Risk Checklist

**من المحاضرة:** محاضرة 7، §12 | حسب **المصدر**: `Generic Risks` (مشتركة بين كل المشاريع) مقابل `Product-specific Risks` (خاصة بمشروع معيّن). حسب **التأثير**: `Project Risks` (تؤثر على الجدولة/الموارد)، `Product Risks` (تؤثر على جودة/أداء المنتج)، `Business Risks` (تؤثر على المؤسسة). `Risk Checklist` بـ6 أنواع: Technology, People, Organizational, Tools, Requirements, Estimation.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
A risk where "a competitor may release a competing product" is best classified as a:

- أ) Project risk
- ب) Product risk
- ج) Business risk
- د) Technology risk


**الإجابة الصحيحة: ج — Business Risk**

**التعليل:** يؤثر على المؤسسة/الشركة، مو على جدولة المشروع أو جودة المنتج تحديداً.

---

## الفقرة 6ج: استراتيجيات التعامل مع المخاطر (Risk Handling)

**من المحاضرة:** محاضرة 7، §15 | 3 استراتيجيات: **تجنّب** (`Avoidance` — تغيير المتطلبات لتفادي سبب الخطر)، **نقل** (`Transfer` — لنظام تأمين أو طرف ثالث)، **قبول والتحكم** (`Acceptance` — ضمن موارد المشروع مع مراقبة). تقييم أي إجراء تقليل خطر عبر `Risk Leverage`:

`RL = (Risk Exposure قبل − Risk Exposure بعد) / كلفة التقليل`

لو RL منخفض، ابحث عن بديل أفضل أو أقل كلفة.

---

## الفقرة 1: WBS + CPM + تقدير المدة والاعتماديات

**من المحاضرة:** محاضرة 7، §4-6 | `CPM` (طريقة المسار الحرج): يحدد النشاط اللي `Slack = 0`.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique involves identifying dependencies between project activities?

- أ) Work breakdown structure
- ب) Critical path method
- ج) Dependency diagram
- د) Resource allocation

**الإجابة الصحيحة: ب — CPM**

**التعليل:** يعتمد بالكامل على فهم اعتماديات الأنشطة أولاً.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique estimates the duration of project activities?

- أ) Work breakdown structure
- ب) Critical path method
- ج) Resource allocation
- د) Earned value analysis

**الإجابة الصحيحة: ب**

---

## الفقرة 2: تقدير الجهد — Bottom-up + PERT

**من المحاضرة:** محاضرة 7، §9-10 | `PERT`: معادلة `(x + 4z + y) / 6` (متشائم + 4×الأكثر احتمالاً + متفائل ÷ 6).

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique estimates the effort required to complete a project activity?

- أ) Work breakdown structure
- ب) Critical path method
- ج) Bottom-up estimation
- د) Earned value analysis

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique estimates project durations by evaluating optimistic, most likely, and pessimistic scenarios?

- أ) Monte Carlo Simulation
- ب) Critical Path Method
- ج) PERT
- د) Earned Value Management

**الإجابة الصحيحة: ج — PERT**

---

## الفقرة 3: Gantt Chart + Resource Leveling

**من المحاضرة:** محاضرة 7، §7-8

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the purpose of a Gantt chart in project management?

- أ) Estimate costs
- ب) Track project progress
- ج) Allocate resources
- د) Define requirements

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique allocates resources to activities based on priority and availability?

- أ) Work breakdown structure
- ب) Critical path method
- ج) Resource leveling
- د) Risk identification

**الإجابة الصحيحة: ج — Resource Leveling (موازنة الموارد)**

---

## الفقرة 4: إدارة المخاطر — Identification / Assessment / Analysis

**من المحاضرة:** محاضرة 7، §11-15 | `Risk Exposure = Probability × Impact`. المراحل: Identification → Analysis → Control.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which technique is used to identify and prioritize risks?

- أ) Risk assessment
- ب) Risk mitigation
- ج) Risk identification
- د) Risk monitoring

**الإجابة الصحيحة: أ — Risk Assessment**

**التعليل:** يغطي التحديد + التحليل معاً (وهذا يمكّن الترتيب حسب الأولوية عبر Risk Exposure).

#### 🧪 نمط 2023-2024
**السؤال:** What is the main focus of risk management in project management?

- أ) Identify and mitigate potential problems that could affect the project
- ب) Define scope/requirements
- ج) Allocate resources effectively
- د) Manage stakeholder communication

**الإجابة الصحيحة: أ**

---

## الفقرة 5: خطة المشروع (Project Plan)

**من المحاضرة:** محاضرة 7، §16 | وثيقة من 14 بنداً تعمل كـ"عقد غير رسمي" لكيفية تنفيذ ومراقبة المشروع.

#### 🧪 نمط 2023-2024
**السؤال:** What is the primary purpose of a project management plan?

- أ) Define software requirements
- ب) Outline how the project will be executed, monitored, and controlled
- ج) Write source code
- د) Design system architecture

**الإجابة الصحيحة: ب**


---
---

# الوحدة F — قياس البرمجيات الكامل (محاضرة 8 + 9)

## الفقرة 1: LOC — مشاكله وحدوده

**من المحاضرة:** محاضرة 8، §2 | `LOC` (Lines of Code) أبسط مقياس حجم، لكنه معتمد على اللغة وما يعكس التعقيد الحقيقي.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** "Lines of code" is a poor metric because:

- أ) it is language independent
- ب) it penalizes efficient, compact coding
- ج) it measures what matters, not what can be measured
- د) developed in the 1960's
- ه) All of the above

**الإجابة الصحيحة: ب**

**التعليل:** الكود المضغوط الفعّال بيسجّل LOC أقل، كأنو المبرمج الماهر "أنتج أقل" — عكس الحقيقة.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** Which statement is MOST accurate regarding LOC as a metric?

- أ) universally reliable
- ب) useful for comparing productivity across different languages
- ج) useful within same organization/standards, but limited across different contexts
- د) outdated, should never be used

**الإجابة الصحيحة: ج**

---

## الفقرة 2: Cyclomatic Complexity (CC) — التعريف والحساب

**من المحاضرة:** محاضرة 8، §3 | `V(G) = e − n + 2p` (e=حواف، n=عُقد، p=مكوّنات متصلة) على `Control Flow Graph` (مخطط تدفق التحكم).

#### 🧪 نمط 2023-2024
**السؤال:** What does cyclomatic complexity measure?

- أ) Number of lines of code
- ب) Number of independent paths through the code
- ج) Number of classes in a system
- د) Total number of bugs

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2023-2024
**السؤال:** In McCabe's CC metric, code is first represented as:

- أ) A syntax graph
- ب) A data-flow graph
- ج) A flow control graph
- د) A control-vs-command graph
- ه) None

**الإجابة الصحيحة: ج**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** CC is primarily used to measure:

- أ) Number of potential execution paths in a module
- ب) Degree of coupling between modules
- ج) Depth of inheritance hierarchy
- د) Number of external dependencies

**الإجابة الصحيحة: أ**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** The cyclomatic complexity of a graph is:

- أ) number of closed paths
- ب) number of independent test cases required to reach every node
- ج) edges − nodes + 1
- د) All of the above
- ه) None

**الإجابة الصحيحة: ب**

**التعليل:** تفسيرها العملي: الحد الأدنى لعدد حالات الاختبار المستقلة اللازمة.

---

## الفقرة 3: تطبيق شامل — مثال Calculator (LOC/CC/Coverage/Maintainability سوا)

**من المحاضرة:** محاضرة 8 (تمرين تطبيقي على كلاس Calculator بـ add/subtract/multiply/divide)

#### 🧪 نمط 2023-2024 (مجموعة أسئلة على نفس الكود)
**السؤال:** What is the cyclomatic complexity of the ENTIRE Calculator class (WMC)?

- أ) 1
- ب) 2
- ج) 4
- د) 5

**الإجابة الصحيحة: د**

**التعليل:** كل من add/subtract/multiply CC=1 (بدون شروط)، divide فيها if واحد فـ CC=2 → المجموع (`WMC`) = 1+1+1+2 = 5.

**السؤال:** Which metric would help assess how well the Calculator class is tested?

- أ) Code Churn
- ب) Code Coverage
- ج) Function Points
- د) Defect Density

**الإجابة الصحيحة: ب**

**السؤال:** What is the impact of adding an additional conditional statement inside divide on CC?

- أ) Decrease
- ب) No effect
- ج) Increase
- د) Changes LOC only

**الإجابة الصحيحة: ج**

**التعليل:** كل قرار شرطي جديد يضيف حافة (edge)، فيرفع V(G) حتماً.

**السؤال:** Which metric is most useful for assessing the MAINTAINABILITY of the Calculator class?

- أ) Cyclomatic Complexity
- ب) Number of Methods
- ج) LOC
- د) Code Coverage

**الإجابة الصحيحة: أ**

---

## الفقرة 4: مقاييس OO — DIT / Coupling (CBO) / RFC / WMC

**من المحاضرة:** محاضرة 8، §4 | مقاييس Chidamber & Kemerer الستة: DIT, NOC, WMC, RFC, CBO, LCOM.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** A high Depth of Inheritance Tree (DIT) value generally indicates:

- أ) Well-designed, easily maintainable hierarchy
- ب) Potential difficulties in understanding/maintaining due to increased complexity
- ج) Improved reuse, reduced duplication
- د) Lower risk of errors

**الإجابة الصحيحة: ب**

**التعليل:** مقايضة حقيقية: DIT عميق = reuse أكبر **لكن** تعقيد أكبر، مو "جيد دائماً".

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** In quality metrics, what does "coupling" refer to?

- أ) Degree of interaction between different modules/components
- ب) Strength of relationship in inheritance hierarchy
- ج) Number of dependencies on external libraries
- د) Cohesion of elements within a module

**الإجابة الصحيحة: أ**

**التعليل:** القاعدة الذهبية: "حافظ على اقتران منخفض (`low coupling`) لكن تماسك عالي (`high cohesion`)".

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** Weighted Methods per Class (WMC) is calculated as:

- أ) Total number of methods
- ب) Sum of Cyclomatic Complexity of all methods in a class
- ج) Ratio of methods to attributes
- د) Average methods across all classes
- و) None

**الإجابة الصحيحة: ب**

**التعليل:** قاعدة عملية: WMC=20 جيدة، تجنّبي تجاوز 40.

#### ⚠️ ما في سؤال حقيقي على Cohesion (LCOM) تحديداً
**سؤال بأسلوب الدكتور (من تأليفي):**
`Lack of Cohesion in Methods` (LCOM) measures:

- أ) How strongly methods within a class share the class's attributes
- ب) The number of external classes a class depends on
- ج) The depth of a class's inheritance chain
- د) The total lines of code in a class

**الإجابة الصحيحة: أ**

**التعليل:** الترجمة: `Cohesion` = التماسك (كل دوال الفئة تتشارك بمسؤولية واحدة مترابطة). `LCOM` مرتفع = تماسك ضعيف = مرشّح لتقسيم الفئة (`Extract Class`).

---

## الفقرة 5: مقاييس اعتمادية الحزم (Ca / Ce / Instability)

**من المحاضرة:** محاضرة 8، §5 | `Ca` (Afferent — اعتمادية داخلة)، `Ce` (Efferent — اعتمادية خارجة)، `Instability = Ce/(Ca+Ce)`.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بالذات
**سؤال بأسلوب الدكتور (من تأليفي):**
A package with high `Instability` (Ce/(Ca+Ce) close to 1) means:

- أ) It is heavily depended upon by others, so it's hard to change
- ب) It depends heavily on others but few depend on it, so it's easy to change
- ج) It has no dependencies at all
- د) It is the most stable package in the system

**الإجابة الصحيحة: ب**

---

## الفقرة 6: مقاييس الجودة — Defect Density / MTTR / MTBF / Discovery Rate

**من المحاضرة:** محاضرة 8، §7 | `Defect Density = #defects / size`. `MTTR` = زمن الإصلاح. `MTBF` = زمن بين عطلين.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which metric measures the average time required to fix a software defect?

- أ) Defect density
- ب) Mean Time Between Failures
- ج) Mean Time to Repair
- د) Software complexity

**الإجابة الصحيحة: ج — MTTR**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which metric measures the number of defects discovered PER UNIT OF TIME during testing?

- أ) Defect density
- ب) Defect discovery rate
- ج) Cyclomatic complexity
- د) Test coverage

**الإجابة الصحيحة: ب**

**التعليل:** الفرق: Density = لكل وحدة حجم، Discovery Rate = لكل وحدة زمن.

#### 🧪 نمط 2023-2024
**السؤال:** Which of the following is NOT a software metric?

- أ) Lines of code
- ب) Cyclomatic complexity
- ج) Defect density
- د) Software documentation

**الإجابة الصحيحة: د**

**التعليل:** التوثيق منتج (deliverable)، مو مقياساً رقمياً.

#### 🧪 نمط 2023-2024
**السؤال:** Which is NOT a common software quality metric?

- أ) Mean time to failure
- ب) Code churn
- ج) Feature count
- د) Lines of code

**الإجابة الصحيحة: ج — Feature count**

**التعليل:** ليست مقياس جودة معياري.

---

## الفقرة 6ب: Predictor مقابل Control Metrics

**من المحاضرة:** محاضرة 9، §2 | `Control/Process Metrics` (مقاييس التحكم): تراقب العملية نفسها (مثال: متوسط الجهد/الوقت لإصلاح عطل). `Predictor/Product Metrics` (مقاييس التنبؤ): مرتبطة بالمنتج البرمجي نفسه = نفس `Internal Attributes` (LOC، CC).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
"Average time required to repair a defect" is an example of a:

- أ) Predictor metric
- ب) Control metric
- ج) Static metric
- د) Function Point


**الإجابة الصحيحة: ب — Control/Process Metric**

**التعليل:** تراقب العملية (زمن الإصلاح)، مو خاصية بالكود نفسه.

---

## الفقرة 6ج: Dynamic مقابل Static Metrics

**من المحاضرة:** محاضرة 9، §3 | `Dynamic Metrics`: تُجمع أثناء تشغيل البرنامج فعلياً (مثال: عدد تقارير الأخطاء، وقت إنجاز عملية حسابية) — تقيّم الكفاءة والموثوقية. `Static Metrics`: تُجمع من الكود بدون تشغيله (مثال: حجم الكود، Cyclomatic Complexity) — تقيّم التعقيد وسهولة الفهم/الصيانة.

---

## الفقرة 8ب: Fan-in / Fan-out + طول أسماء المتغيرات

**من المحاضرة:** محاضرة 9، §4-5 | (تكملة للفقرة 8 بالوحدة F) — طول أسماء المتغيرات (`Length of Identifiers`): أسماء أطول وأوضح عادة ترتبط بفهم أسهل للكود (لكن ليست قاعدة مطلقة، فيه حدود عملية للطول المفيد).

---

## الفقرة 9ب: Halstead Metric (1977)

**من المحاضرة:** محاضرة 9، §10-11 | يقيس **الكود نفسه رمزاً برمز** (بعكس Function Points اللي تقيس الوظائف قبل الكود). كل برنامج = مجموعة رموز (`tokens`): إما `Operators` (عوامل: =, while, +, print()) أو `Operands` (معاملات: متغيرات وثوابت).

- `n1` = عدد الـ Operators الفريدة (unique)
- `n2` = عدد الـ Operands الفريدة (unique)
- `N` = الطول الكلي (كل الرموز مع التكرار)
- **الحجم** `Volume V = N × log2(n1+n2)`
- **الصعوبة** `Difficulty D = (n1/2) × (total operands/n2)`
- **الجهد** `Effort E = D × V`
- **وقت البرمجة المقدَّر** `T = E / 18` (بالثواني)

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
In Halstead's metric, what does `n1` represent?

- أ) The total length of the program including repetitions
- ب) The number of unique operators
- ج) The number of unique operands
- د) The estimated coding time


**الإجابة الصحيحة: ب — عدد الـ Operators الفريدة**

**التعليل:** `n2` هو عدد الـ Operands الفريدة (مو n1)، و`N` هو الطول الكلي مع التكرار (مو n1 ولا n2).

**📌 ملاحظة:** Function Points تُحسب **قبل** كتابة الكود (على مستوى الوظائف)، بينما Halstead يُحسب **من الكود المكتوب فعلياً** — الاثنان مكمّلان بمراحل مختلفة من المشروع.

---

## الفقرة 7: Function Points — التعريف والهدف

**من المحاضرة:** محاضرة 9، §6-9 | قياس الحجم بناءً على "الوظائف" (Inputs/Outputs/Files/Interfaces/Inquiries)، مستقل عن لغة البرمجة (Albrecht/IBM 1979، معيار ISO 2003).

#### 🧪 نمط 2023-2024
**السؤال:** What does the term 'function point' measure?

- أ) Complexity of the code
- ب) Size and complexity based on functionality
- ج) Number of functions in code
- د) Execution speed

**الإجابة الصحيحة: ب**

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** What is the primary goal of Function Point Analysis (FPA)?

- أ) Estimate development time
- ب) Assess code quality/bugs
- ج) Measure size based on functionality from user's perspective
- د) Track development team progress

**الإجابة الصحيحة: ج**

---

## الفقرة 8: Fan-in / Fan-out + السياق عند تفسير المقاييس

**من المحاضرة:** محاضرة 9، §4 | `Fan-in` (استدعاءات داخلة) = كم وحدة بتنادي عليّي. `Fan-out` (استدعاءات خارجة) = كم وحدة أنا بنادي عليها (بما فيها المكتبات الخارجية).

#### 🧪 نمط 2025-2026
**السؤال:** Fan-out for a function that calls 3 functions and 2 external libraries. Value?

- أ) Components
- ب) 5
- ج) 2
- د) 3

**الإجابة الصحيحة: ب = 5**

**التعليل:** المجموع الكلي (3 داخلية + 2 خارجية)، بغض النظر عن كونها داخل النظام أو مكتبة خارجية.

#### 🧪 نمط 2024-2025 — الفصل الأول
**السؤال:** When evaluating software metrics, it's crucial to consider:

- أ) The specific context of the project and organization
- ب) Absolute values without external factors
- ج) Individual developer opinions
- د) Latest trends without adapting them

**الإجابة الصحيحة: أ**

**التعليل:** العلاقة بين الصفات الداخلية (CC) والخارجية (Maintainability) إحصائية/افتراضية، لازم تُفسَّر بالسياق.

**📌 ملاحظة:** CC تكرر ذكرها كمؤشر Maintainability بثلاث مواضع مختلفة (محاضرة 8، 9، وحتى محاضرة 12 الجودة) — هاد الربط أهم نقطة بكل وحدة القياس.


---
---

# الوحدة G — الجودة (محاضرة 12)

## الفقرة 1: تعريف الجودة (IEEE/ISO)

**من المحاضرة:** محاضرة 12، §2 | الجودة = مطابقة المتطلبات الصريحة (`explicit`) **و**الضمنية (`implicit`) معاً.

#### 🧪 نمط 2023-2024 — الفصل الثاني
**السؤال:** Which best defines software quality?

- أ) Low number of defects found during testing
- ب) Adherence to project timelines
- ج) Implementation of advanced techniques
- د) Conformance to explicit and implicit requirements
- و) None

**الإجابة الصحيحة: د**

**التعليل:** برنامج ممكن يطابق الوثيقة 100% حرفياً لكن يبقى "سيء الجودة" لو ما لبّى الاحتياجات الضمنية غير المكتوبة.

---

## الفقرة 2: عوامل الجودة الاثني عشر — منظور المستخدم مقابل المطوّر

**من المحاضرة:** محاضرة 12، §4-6 | من منظور المستخدم: Correctness, Reliability, Usability, Security... من منظور المطوّر: Maintainability, Portability, Testability, Readability...

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the measure of the ability of a component to be transferred from one environment to another?

- أ) Reusability
- ب) Portability
- ج) Interoperability
- د) Scalability

**الإجابة الصحيحة: ب — Portability (قابلية النقل)**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the measure of ability to operate correctly in DIFFERENT operating environments? *(نفس المفهوم بصياغة تانية)*

- أ) Reusability
- ب) Portability
- ج) Interoperability
- د) Scalability

**الإجابة الصحيحة: ب**

**التعليل:** تنبيه: `Interoperability` (قابلية التشغيل البيني) تخص التعاون مع أنظمة **أخرى**، مو "أين يعمل هو نفسه".

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the measure of degree a system can be used effectively/efficiently with satisfaction?

- أ) Reliability
- ب) Usability
- ج) Maintainability
- د) Portability

**الإجابة الصحيحة: ب — Usability (سهولة الاستخدام)**

**التعليل:** تعريف ISO القياسي.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** Which is NOT a characteristic of high-quality software?

- أ) Reliability
- ب) Maintainability
- ج) Inefficiency
- د) Usability

**الإجابة الصحيحة: ج — Inefficiency (عدم الكفاءة)**

**التعليل:** هو عكس عامل Performance/Efficiency.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the measure of effort required to understand, prepare, and modify a component?

- أ) Code coverage
- ب) Software complexity
- ج) Software maintainability
- د) Software reliability

**الإجابة الصحيحة: ج — Maintainability**

**📌 الترجمة:** `Reliability` = الموثوقية (منع حدوث العطل من الأساس) — تختلف عن `Availability` (التوفّرية، التعافي بعد العطل؛ الأخيرة معرفة عامة مش من ضمن الـ12 عاملاً المذكورين بالاسم بمحاضرتك).

---

## الفقرة 1ب: Quality Control مقابل Quality Assurance

**من المحاضرة:** محاضرة 12، §3 | `Quality Control` (ضبط الجودة): قياس خصائص البرنامج **بعد** اكتماله — رد فعل (`reactive`). `Quality Assurance` (ضمان الجودة): مراقبة والتحكم بعملية التطوير نفسها **أثناء** حدوثها — وقائي (`proactive`).

---

## الفقرة 2ب: التناقض بين عوامل الجودة + منظورا المستخدم والمطوّر

**من المحاضرة:** محاضرة 12، §6 | لا يمكن تحقيق كل عوامل الجودة بأقصى درجة معاً — مثال تعارض كلاسيكي: `Performance` مقابل `Portability` (تحسين لمنصة معينة يرفع الأداء لكن يصعّب النقل، والعكس). **منظور المستخدم**: Correctness, Usability, Reliability, Security, Adaptability. **منظور المطوّر**: Maintainability, Portability, Readability, Understandability, Testability.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
Which pair of quality factors is used in the lecture as a classic example of a trade-off (improving one tends to weaken the other)?

- أ) Usability and Security
- ب) Performance and Portability
- ج) Correctness and Reliability
- د) Testability and Readability


**الإجابة الصحيحة: ب**

---

## الفقرة 3: إدارة الجودة (SQM) + ضمان الجودة (SQA)

**من المحاضرة:** محاضرة 12، §7-8 | `SQA` ترتكز على 3: Testing (ديناميكي)، Debugging، Reviews (ساكن).

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the primary purpose of a software quality management plan?

- أ) Identify and fix defects
- ب) Ensure software meets customer requirements
- ج) Define quality goals and processes for a project
- د) Monitor project progress

**الإجابة الصحيحة: ج — Quality Plan**

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the primary purpose of a software quality assurance process?

- أ) Identify and fix defects
- ب) Ensure software meets customer requirements
- ج) Improve performance
- د) Monitor project progress

**الإجابة الصحيحة: ب — SQA**

#### 🧪 نمط 2023-2024
**السؤال:** Which metric is most useful for assessing the effectiveness of code reviews?

- أ) Defect density
- ب) Number of lines of code
- ج) Percentage of code reviewed
- د) Development cost

**الإجابة الصحيحة: ج**

---

## الفقرة 4: CMM (Capability Maturity Model)

**من المحاضرة:** محاضرة 12، §9 | معيار عالمي لإطار العملية (مذكور أيضاً بمحاضرة 1 ضمن عامل Process).

#### ⚠️ ما في سؤال حقيقي على مستويات CMM تحديداً بملف exams.md
**سؤال بأسلوب الدكتور (من تأليفي):**
Which CMM level is characterized by processes being measured and controlled quantitatively?

- أ) Initial
- ب) Repeatable
- ج) Managed
- د) Optimizing

**الإجابة الصحيحة: ج — Managed (المُدار)**

**التعليل:** الترجمة: `Initial` = فوضوي، `Repeatable` = قابل للتكرار، `Defined` = موثَّق، `Managed` = مُدار كمّياً، `Optimizing` = مُحسَّن باستمرار (5 مستويات بالترتيب).


---
---

# الوحدة H — Refactoring (محاضرة 13)

## الفقرة 0أ: تعريف Refactoring + ما هو ليس Refactoring

**من المحاضرة:** محاضرة 13، §1-2 | `Refactoring`: تغيير بنية الكود الداخلية دون تغيير سلوكه الخارجي — "تنظيف الكود". **ليس** Refactoring: إضافة functionality جديدة (attributes/methods/classes جديدة)، ولا إعادة الكتابة من الصفر (`Rewriting from scratch`).

**القاعدة الذهبية:** الفيصل الوحيد = "هل تغيّر السلوك الخارجي؟" لو تغيّر، فهذا تطوير جديد لا Refactoring.

---

## الفقرة 0ب: لماذا ومتى نُرفكتِر

**من المحاضرة:** محاضرة 13، §3-4 | **لماذا:** ما نقدر نصمم صح من أول مرة، Refactoring يقلل حجم الكود، يبسّط البنى المعقدة، يسهّل الفهم والتعديل، ويساعد باكتشاف bugs مخفية. **متى:** عند إضافة functionality جديدة (قبل أو بعد)، أثناء مراجعة الكود (`code review`)، وعند الحاجة لإصلاح bug.

---

## الفقرة 0ج: البرامج السهلة (خصائص الكود الصعب)

**من المحاضرة:** محاضرة 13، §5 | 4 أسباب لصعوبة تعديل برنامج: صعوبة القراءة، منطق مكرر (`duplicated logic`)، الحاجة لتعديل كود شغّال (`running code`) لإضافة سلوك، ومنطق شرطي معقد (`complex conditional logic`).

---

## الفقرة 0د: Code Smells وحلولها (الجدول الأهم بالمحاضرة)

**من المحاضرة:** محاضرة 13، §6-8 | `Code Smell` (رائحة الكود): مؤشر على مشكلة تصميمية محتملة حتى لو الكود "يشتغل صح" ظاهرياً — قد تكون قوية، واضحة، خفية (`subtler`)، أو تُخفي مشاكل أخرى.

| الـ Smell | الحل المقترح |
|---|---|
| Duplicated Code (كود مكرر) | `Extract Method` |
| Long Method (طويلة عموماً) | `Compose Method` |
| Long Method (بسبب switch لمعالجة طلبات) | `Command Pattern` |
| Long Method (بسبب switch لجمع بيانات) | `Visitor Pattern` |
| Long Method (خوارزميات متعددة بشرط) | `Strategy Pattern` |
| Conditional Complexity (تعقيد شرطي) | Strategy / Decorator / State |
| Primitive Obsession (هوس بالأنواع الأولية) | `Replace Data Value with Object` |
| Indecent Exposure (كشف غير لائق) | `Factory Pattern` |
| Solution Sprawl (انتشار الحل) | `Factory Pattern` |
| Long Parameter List (قائمة معاملات طويلة) | `Replace Method with Method Object` |

**📌 الترجمة:** `Primitive Obsession` = الاعتماد المفرط على أنواع بدائية (int/String) بدل صنف مخصص (مثال: تمثيل حالة صلاحية كنص "REQUESTED" بدل صنف `PermissionState`). `Indecent Exposure` = كشف تفاصيل داخلية يفترض إخفاؤها (غياب `Information Hiding`).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
A class relies heavily on raw `String` values (e.g., "REQUESTED", "GRANTED") to represent states instead of a dedicated type. Which code smell is this, and what is the standard fix?

- أ) Long Parameter List → Replace Method with Method Object
- ب) Primitive Obsession → Replace Data Value with Object
- ج) Duplicated Code → Extract Method
- د) Indecent Exposure → Factory Pattern


**الإجابة الصحيحة: ب**

**التعليل:** هذا بالضبط مثال المحاضرة (نظام SystemPermission) — الاعتماد على نصوص خام بدل صنف `PermissionState` مخصص هو `Primitive Obsession`، وحلها القياسي `Replace Data Value with Object`.

---

## الفقرة 0ه: دورة Refactoring (Refactoring Cycle)

**من المحاضرة:** محاضرة 13، §7 | حلقة متكررة: طالما فيه smells → اختر الأسوأ أولاً (`worst first`) → اختر التقنية المناسبة → طبّقها → أعد الفحص. لا نُصلح كل شيء دفعة واحدة، بل خطوات صغيرة متكررة (compile & test بين كل خطوة).

---

## الفقرة 0و: تقنيات Refactoring التفصيلية — Extract/Inline + Replace

**من المحاضرة:** محاضرة 13، §11-16 | `Extract Method` (استخراج دالة): عزل جزء كود مكرر أو معقّد لدالة مستقلة باسم واضح. `Inline Method` (دمج دالة): عكس Extract — دمج دالة بسيطة جداً بمكان استدعائها لما تصبح غير ضرورية كطبقة منفصلة. `Replace Temp with Query`: استبدال متغيّر مؤقت يخزّن نتيجة تعبير بدالة (`query`) تُعيد حسابه عند الحاجة. `Replace Method with Method Object`: تحويل دالة بقائمة معاملات طويلة/منطق معقد إلى صنف (`class`) مستقل يمثّل استدعاء الدالة نفسها ككائن. `Replace Data Value with Object`: تحويل قيمة بدائية (نص/رقم) تحمل معنى أعمق إلى صنف مخصص بخصائصه وسلوكه.

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة
**سؤال بأسلوب الدكتور (من تأليفي):**
A method has grown a very long parameter list because it needs many related pieces of data to perform a complex calculation. Which refactoring technique directly addresses this?

- أ) Inline Method
- ب) Replace Temp with Query
- ج) Replace Method with Method Object
- د) Extract Method


**الإجابة الصحيحة: ج**

**التعليل:** `Replace Method with Method Object` يحوّل الدالة نفسها لصنف مستقل، فتصبح كل "المعاملات" حقول (`fields`) بالكائن الجديد بدل قائمة معاملات طويلة بالتوقيع.


---
## الفقرة 1: تعريف Refactoring + الفيصل معه (السلوك الخارجي)

**من المحاضرة:** محاضرة 13، §1-2 | `Refactoring`: تغيير البنية الداخلية **بدون** تغيير السلوك الخارجي.

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the primary purpose of code refactoring in software development?

- أ) Fix defects in the code
- ب) Improve the performance of the code
- ج) Enhance the readability and maintainability of the code
- د) Add new features to the code

**الإجابة الصحيحة: ج**

**التعليل:** الفيصل الحاسم: "هل تغيّر السلوك الخارجي؟" لو تغيّر، فهذا تطوير جديد وليس Refactoring (ولذلك أ، ب، د كلها مستبعدة).

#### 🧪 نمط 2023-2024 — الفصل الأول
**السؤال:** What is the primary goal of software reengineering?

- أ) Add new features
- ب) Improve performance
- ج) Enhance maintainability of an existing system
- د) Rewrite from scratch

**الإجابة الصحيحة: ج**

**التعليل:** نفس فلسفة Refactoring (بنية داخلية أفضل، سلوك خارجي ثابت)، بعكس "إعادة الكتابة من الصفر" (خيار د) اللي هو نشاط مختلف تماماً.

---

## الفقرة 2: Code Smells (روائح الكود)

**من المحاضرة:** محاضرة 13، §6-8 | Long Method, Duplicated Code, Large Class, Long Parameter List, Divergent Change, Shotgun Surgery...

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بملف exams.md
**سؤال بأسلوب الدكتور (من تأليفي):**
A class that has grown to handle many unrelated responsibilities is best described as which code smell?

- أ) Long Parameter List
- ب) Large Class
- ج) Duplicated Code
- د) Feature Envy

**الإجابة الصحيحة: ب — Large Class**

**التعليل:** الترجمة: `Code Smell` = رائحة كود (مؤشر سطحي على مشكلة تصميم أعمق)، `Feature Envy` = فئة "تحسد" فئة تانية وبتستخدم بياناتها أكتر من بياناتها هي.

---

## الفقرة 3: طرق Refactoring — Extract / Inline / Replace

**من المحاضرة:** محاضرة 13، §11-16 | `Extract Method` (استخراج دالة)، `Inline Method` (دمج دالة صغيرة بمكان استدعائها)، `Replace Temp with Query` (استبدال متغيّر مؤقت بدالة).

#### ⚠️ ما في سؤال حقيقي لهاي الفقرة بملف exams.md
**سؤال بأسلوب الدكتور (من تأليفي):**
Which refactoring technique is used when a temporary variable holds the result of an expression that could instead be recalculated by a method each time it's needed?

- أ) Extract Method
- ب) Inline Method
- ج) Replace Temp with Query
- د) Replace Method with Method Object

**الإجابة الصحيحة: ج — Replace Temp with Query**

**📌 ملاحظة عامة عن الوحدة:** لاحظي إنو Refactoring هو أقل الوحدات تغطيةً ببنك الدورات الحقيقي (سؤالين بس بكل الملف) — يعني منطقة عالية الخطورة لسؤال "توسّع" جديد كلياً لو ظهرت هالسنة. ركّزي منيح على تعريف كل Code Smell وأي Refactoring technique بيحلّه.


---
---

# الوحدة I — طبيعة الألعاب (محاضرة 14 — جديدة، بدون دورات سابقة)

> **ملاحظة عامة على الوحدة:** هاي المحاضرة **جديدة كلياً** على المنهج — ما في ولا سؤال حقيقي من دورات سابقة عليها إطلاقاً (لأنها لسا ما دخلت الامتحانات). كل الأسئلة هون بأسلوب الدكتور (من تأليفي)، مبنية حصراً على محتوى المحاضرة، عشان تجهزك تحسباً لأول ظهور محتمل لهاي المحاضرة بالامتحان.

## الفقرة 1: تعريف اللعبة (Adams + Salen & Zimmerman)

**من المحاضرة:** §1 | تعريفا Adams وSalen & Zimmerman يتفقان على 4 عناصر جوهرية: `Players` (لاعبون)، `Challenges` (تحديات)، `Rules` (قواعد)، `Goals` (أهداف/شرط نصر).

#### ⚠️ سؤال بأسلوب الدكتور (من تأليفي — لا يوجد دورة حقيقية بعد)
**السؤال:** According to both Adams' and Salen & Zimmerman's definitions discussed in the lecture, which FOUR elements are common to both?

- أ) Graphics, Sound, Story, Interface
- ب) Players, Challenges, Rules, Goals
- ج) Budget, Team, Engine, Platform
- د) Narrative, Ludic, Balance, Feedback


**الإجابة الصحيحة: ب**

**التعليل:** هاي الأربعة مستخرجة صراحة من كلا التعريفين بالمحاضرة (الشريحة تشير لهن بالاسم). الترجمة: `Victory Condition` = شرط النصر، `Artificial Conflict` = صراع مصطنع.

---

## الفقرة 2: قرارات التصميم السبعة

**من المحاضرة:** §2 | 4 قرارات جوهرية (Players/Goals/Rules/Challenges) + 3 إضافية (Game Modes/Setting/Story). كل قرار = سؤال تصميمي عملي.

#### ⚠️ سؤال بأسلوب الدكتور (من تأليفي)
**السؤال:** Which design decision specifically addresses the question "How does the player learn the rules?" and defines the boundaries of the game?

- أ) Goals
- ب) Setting
- ج) Rules
- د) Story


**الإجابة الصحيحة: ج — Rules**

**التعليل:** حسب المحاضرة، `Rules` تحديداً تحدد `boundaries of the game` (حدود اللعبة) عبر سؤالي "كيف يؤثر اللاعب بالعالم" و"كيف يتعلم القواعد".

---

## الفقرة 3: طول جلسة اللعب (Play Length)

**من المحاضرة:** §3 | `Least meaningful unit of play` (أقل وحدة لعب ذات معنى) تختلف بالمنصة: Console ≥30 دقيقة، Mobile <دقيقة. `Casual vs Core` تصنيف رديء لأنه يخلط بين المدة والعمق (مثال Plants vs. Zombies: قصير + عميق معاً).

#### ⚠️ سؤال بأسلوب الدكتور (من تأليفي)
**السؤال:** Why does the lecture consider the "Casual vs Core" classification a bad distinction?

- أ) Because casual games are always worse than core games
- ب) Because it conflates two independent criteria: play session length and mechanical depth
- ج) Because mobile games cannot have deep mechanics
- د) Because console games are always more casual


**الإجابة الصحيحة: ب**

**التعليل:** المثال المباشر بالمحاضرة: Plants vs. Zombies — جلسات قصيرة (casual) بس آليات عميقة (core)، وهذا يثبت إن المعيارين مستقلين عن بعض.

---

## الفقرة 4: Narrative مقابل Ludic

**من المحاضرة:** §4 | `Narrative`: الألعاب وسيط قصصي — ميزتها التأثير العاطفي والرؤية الفنية، عيبها طغيان الكاتب وضعف الآليات. `Ludic` (من `ludus` اللاتينية = لعب): الألعاب نظام آليات — ميزتها وكالة اللاعب (`Player Agency`) وآليات محكمة، عيبها ضعف الدافعية وصعوبة التمييز.

#### ⚠️ سؤال بأسلوب الدكتور (من تأليفي)
**السؤال:** Which of the following is listed as a disadvantage of the Ludic design philosophy?

- أ) Author voice over player voice
- ب) Poorly defined mechanics
- ج) Lack of player motivation
- د) Traditional narrative structure


**الإجابة الصحيحة: ج — Lack of player motivation**

**التعليل:** خياري أ وب من عيوب Narrative (عكس المطلوب)، وخيار د وصف لـNarrative نفسها مو عيب لـLudic.

---

## الفقرة 5: التوازن (Motivate + Empower) + توجّه المقرر

**من المحاضرة:** §4.2-4.3 | التصميم الجيد توازن: `Motivate` (من Narrative: قصة، بيئة، هوية، سياق للتحديات) + `Empower` (من Ludic: دراما من أفعال اللاعب، قدرات واضحة، مجازاة/معاقبة، حرية). المقرر نفسه بيركّز عملياً على Ludic لأنها قابلة للتدريب، والتوازن الكامل مسؤولية الطالب.

#### ⚠️ سؤال بأسلوب الدكتور (من تأليفي)
**السؤال:** According to the lecture, why does this course focus practically on Ludic design tools despite acknowledging the importance of full balance?

- أ) Because Narrative is not important in game design
- ب) Because Ludic tools are trainable techniques that require practice, while maintaining full balance is the student's own responsibility
- ج) Because students lack storytelling skills
- د) Because the course does not care about final design quality


**الإجابة الصحيحة: ب**

**التعليل:** نص المحاضرة الحرفي: "Keeping balance is up to you" — الأدوات التقنية (Ludic) تُدرَّس وتُمارَس، أما التوازن الكامل مع Narrative فمسؤولية شخصية.

---

## الفقرة 6: منهج Adams (Wish-Fulfillment)

**من المحاضرة:** §5 | يبدأ بـ"أريد أن ___"، ثم 5 أسئلة: الحلم؟ (Narrative) → الأهداف؟ (Narrative) → الأفعال؟ (Ludic) → البيئة؟ (Ludic) → الواجهة؟ (Ludic).

#### ⚠️ سؤال بأسلوب الدكتور (من تأليفي)
**السؤال:** In the Adams Approach, which two questions are classified as Narrative rather than Ludic?

- أ) What actions achieve those goals? / What setting does this dream create?
- ب) What dream are you satisfying? / What goals does this dream create?
- ج) What is the appropriate interface? / What setting does this dream create?
- د) What actions achieve those goals? / What is the appropriate interface?


**الإجابة الصحيحة: ب — الحلم والأهداف**

**التعليل:** المحاضرة صنّفت صراحة: الحلم والأهداف = Narrative، الأفعال والبيئة والواجهة = Ludic.

---

## الفقرة 7: استكشاف الألعاب + الأهداف الواقعية (Quality over Quantity)

**من المحاضرة:** §6-7 | يجب لعب أنواع متنوعة (Kongregate، Armor Games). الهدف الواقعي لمشروع = حجم لعبة موبايل مستقلة، مع قاعدة "عشرة مستويات مذهلة أفضل من 30 رديء" (Quality over Quantity)، وتجنّب "تضخّم الميزات" (`Feature Bloat`، مثال: power-ups زايدة بلا فايدة).

#### ⚠️ سؤال بأسلوب الدكتور (من تأليفي)
**السؤال:** What does the lecture recommend as the appropriate size/ambition target for a student game project?

- أ) A full AAA-studio-sized game
- ب) A boxed retail game sold in stores
- ج) The size of an indie mobile game
- د) There is no recommended size; scope does not matter


**الإجابة الصحيحة: ج**

**التعليل:** المحاضرة تنص صراحة: "Think indie games, not boxed retail" وتحدد الحجم المناسب كـ`indie mobile game`.


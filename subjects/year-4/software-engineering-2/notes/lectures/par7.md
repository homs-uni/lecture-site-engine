# المحاضرة 7 — الوحدة G: الجودة (محاضرة 12)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

### الفقرة 1: تعريف الجودة (IEEE/ISO)

**من المحاضرة:** محاضرة 12، §2 | الجودة = مطابقة المتطلبات الصريحة (`explicit`) **و**الضمنية (`implicit`) معاً.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
Which best defines software quality?
أ) Low number of defects found during testing
ب) Adherence to project timelines
ج) Implementation of advanced techniques
د) Conformance to explicit and implicit requirements - و) None
**الإجابة: د**
> برنامج ممكن يطابق الوثيقة 100% حرفياً لكن يبقى "سيء الجودة" لو ما لبّى الاحتياجات الضمنية غير المكتوبة.


### الفقرة 2: عوامل الجودة الاثني عشر — منظور المستخدم مقابل المطوّر

**من المحاضرة:** محاضرة 12، §4-6 | من منظور المستخدم: Correctness, Reliability, Usability, Security... من منظور المطوّر: Maintainability, Portability, Testability, Readability...

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the measure of the ability of a component to be transferred from one environment to another?
أ) Reusability
ب) Portability
ج) Interoperability
د) Scalability
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the measure of ability to operate correctly in DIFFERENT operating environments? *(نفس المفهوم بصياغة تانية)*
أ) Reusability
ب) Portability
ج) Interoperability
د) Scalability
**الإجابة: ب**
> تنبيه: `Interoperability` (قابلية التشغيل البيني) تخص التعاون مع أنظمة **أخرى**، مو "أين يعمل هو نفسه".


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the measure of degree a system can be used effectively/efficiently with satisfaction?
أ) Reliability
ب) Usability
ج) Maintainability
د) Portability
**الإجابة: ب**
> تعريف ISO القياسي.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which is NOT a characteristic of high-quality software?
أ) Reliability
ب) Maintainability
ج) Inefficiency
د) Usability
**الإجابة: ج**
> هو عكس عامل Performance/Efficiency.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the measure of effort required to understand, prepare, and modify a component?
أ) Code coverage
ب) Software complexity
ج) Software maintainability
د) Software reliability
**الإجابة: ج**
> —


### الفقرة 1ب: Quality Control مقابل Quality Assurance

**من المحاضرة:** محاضرة 12، §3 | `Quality Control` (ضبط الجودة): قياس خصائص البرنامج **بعد** اكتماله — رد فعل (`reactive`). `Quality Assurance` (ضمان الجودة): مراقبة والتحكم بعملية التطوير نفسها **أثناء** حدوثها — وقائي (`proactive`).

### الفقرة 2ب: التناقض بين عوامل الجودة + منظورا المستخدم والمطوّر

**من المحاضرة:** محاضرة 12، §6 | لا يمكن تحقيق كل عوامل الجودة بأقصى درجة معاً — مثال تعارض كلاسيكي: `Performance` مقابل `Portability` (تحسين لمنصة معينة يرفع الأداء لكن يصعّب النقل، والعكس). **منظور المستخدم**: Correctness, Usability, Reliability, Security, Adaptability. **منظور المطوّر**: Maintainability, Portability, Readability, Understandability, Testability.

#### تحقق سريع:
Which pair of quality factors is used in the lecture as a classic example of a trade-off (improving one tends to weaken the other)?
أ) Usability and Security
ب) Performance and Portability
ج) Correctness and Reliability
د) Testability and Readability
**الإجابة: ب**
> —


### الفقرة 3: إدارة الجودة (SQM) + ضمان الجودة (SQA)

**من المحاضرة:** محاضرة 12، §7-8 | `SQA` ترتكز على 3: Testing (ديناميكي)، Debugging، Reviews (ساكن).

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the primary purpose of a software quality management plan?
أ) Identify and fix defects
ب) Ensure software meets customer requirements
ج) Define quality goals and processes for a project
د) Monitor project progress
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the primary purpose of a software quality assurance process?
أ) Identify and fix defects
ب) Ensure software meets customer requirements
ج) Improve performance
د) Monitor project progress
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
Which metric is most useful for assessing the effectiveness of code reviews?
أ) Defect density
ب) Number of lines of code
ج) Percentage of code reviewed
د) Development cost
**الإجابة: ج**
> —


### الفقرة 4: CMM (Capability Maturity Model)

**من المحاضرة:** محاضرة 12، §9 | معيار عالمي لإطار العملية (مذكور أيضاً بمحاضرة 1 ضمن عامل Process).

#### تحقق سريع:
Which CMM level is characterized by processes being measured and controlled quantitatively?
أ) Initial
ب) Repeatable
ج) Managed
د) Optimizing
**الإجابة: ج**
> الترجمة: `Initial` = فوضوي، `Repeatable` = قابل للتكرار، `Defined` = موثَّق، `Managed` = مُدار كمّياً، `Optimizing` = مُحسَّن باستمرار (5 مستويات بالترتيب).

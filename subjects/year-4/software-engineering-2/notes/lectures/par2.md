# المحاضرة 2 — الوحدة B: هندسة المتطلبات الكاملة (محاضرة 3 + 10 + 11)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

### الفقرة 0أ: تعريف المتطلب + أهمية هندسة المتطلبات

**من المحاضرة:** محاضرة 3، §1-2 | المتطلب (`requirement`) له وظيفة مزدوجة: بيان عام (أساس لعرض/Bid) أو مواصفة دقيقة (أساس للعقد). الهندسة = حل مشاكل، وما تقدر تحل مشكلة إلا بفهمها كاملة.

**القاعدة الذهبية:** تصحيح خطأ متطلب بمرحلة الصيانة = **100 ضعف** تكلفته وقت جمع المتطلبات. أخطاء السلامة (`safety`) غالباً من تحديد المتطلبات، أخطاء تانية غالباً من التنفيذ.

### الفقرة 0ب: التحديات السبعة لجمع المتطلبات (Present State of Practice)

**من المحاضرة:** محاضرة 3، §2 (تابع) | 7 تحديات: صعوبة الاكتشاف، تغيّر المتطلبات باستمرار، الاعتماد الزائد على أدوات CASE، ضيق الجدول الزمني، حواجز التواصل (لغة المستخدم الطبيعية مقابل دقة المطوّر)، تطوير موجّه بالسوق (عملاء مجهولون)، نقص الموارد.

### الفقرة 0ج: Known / Unknown / Undreamt Requirements

**من المحاضرة:** محاضرة 3، §3 | `Known` (معروفة، واضحة من البداية) — `Unknown` (موجودة بس مو واضحة الآن، توقيت أو صاحب مصلحة مختلف) — `Undreamt` (العميل نفسه ما يتخيلها، تحتاج خبرة المحلل بالمجال). الثلاثة ممكن تكون Functional أو Non-functional.

### الفقرة 0د: User Requirements مقابل System Requirements

**من المحاضرة:** محاضرة 3، §4 | `User Requirements`: لغة طبيعية، للعميل، عامة. `System Requirements`: وثيقة مُهيكَلة، للمطورين، مفصّلة، ممكن جزء من العقد. متطلب مستخدم واحد غالباً يتفرّع لعدة متطلبات نظام (مثال MHC-PMS: متطلب واحد → 5 متطلبات نظام).

### الفقرة 0ه: What مقابل How

**من المحاضرة:** محاضرة 3، §6 | `What` (غرض النظام، خارجي، من `Application Domain`) مقابل `How` (بنية النظام، داخلي، من `Machine Domain`). **المتطلبات = What فقط** — أي ذكر لتقنية محددة (مثل "يستخدم MySQL") هو `How` وينتمي للتصميم لا للمتطلبات.

### الفقرة 0و: عملية المتطلبات الأساسية (Essential Requirements Process)

**من المحاضرة:** محاضرة 3، §5 | 4 خطوات: **(1)** فهم المشكلة (مقابلات، استبيانات، ملاحظة، نمذجة أولية) **(2)** نمذجة وتحليلها (تحليل بنيوي/كائني/صوري) **(3)** الاتفاق عليها (تحقق، حل خلافات، تفاوض) **(4)** توصيلها (مواصفة، توثيق، اجتماعات مراجعة) — بالإضافة لإدارة تغيير مستمرة (مش خطوة تنتهي، بل دورة ترجع للخطوة الأولى باستمرار).

### الفقرة 0ز: الغموض في المتطلبات (مثال "search" الشهير)

**من المحاضرة:** محاضرة 3، §8 | متطلب غامض ممكن يُفسَّر بطرق مختلفة تماماً. المثال الكلاسيكي: متطلب "المستخدم لازم يقدر يبحث بقوائم المواعيد" — المستخدم يقصد بحث شامل بكل العيادات، بينما المطور فهمها بحث داخل عيادة واحدة فقط. النتيجة: نظام "نُفِّذ حرفياً" لكنه ما لبّى الحاجة الفعلية.

**القاعدة الذهبية:** الحل = تفصيل أكثر دقة بمرحلة System Requirements، مو الاكتفاء بصياغة User Requirements العامة.

### الفقرة 1: هدف هندسة المتطلبات + خصائص المتطلب الجيد

**من المحاضرة:** محاضرة 3، §1-2 | `Requirements Engineering` (هندسة المتطلبات): جمع وتوثيق متطلبات العميل عبر 4 أنشطة.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the primary goal of requirements engineering?
أ) Designing the architecture
ب) Developing the UI
ج) Gathering and documenting the software requirements
د) Implementing features
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which of the following is NOT a characteristic of a good requirement?
أ) Consistency
ب) Completeness
ج) Ambiguity
د) Verifiability
**الإجابة: ج**
> هو عكس المطلوب تماماً؛ مثال كلمة "search" الشهير بالمحاضرة يوضح كيف الغموض بيأدي لتنفيذ خاطئ.


### الفقرة 2: Stakeholder + Scope Creep + Requirements Volatility

**من المحاضرة:** محاضرة 3، §17 | `Stakeholder` (صاحب مصلحة): أي شخص متأثر/مؤثر بالمشروع.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
What does 'stakeholder' refer to?
أ) A person who writes code
ب) Anyone who has an interest in the project's outcome
ج) The project manager only
د) The person who provides funding
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
What does 'scope creep' refer to?
أ) An increase in budget
ب) An expansion of project scope without corresponding adjustments in resources/time
ج) A delay in schedule
د) A reduction in team size
**الإجابة: ب**
> الترجمة: `Scope Creep` = زحف/توسّع النطاق غير المُدار.


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is meant by "requirements volatility"?
أ) Tendency for requirements to change over time due to evolving needs
ب) Stability of requirements throughout the lifecycle
ج) Ability to implement without rework
د) Process of validating against expectations
**الإجابة: أ**
> —


### الفقرة 3: Functional مقابل Non-functional Requirements

**من المحاضرة:** محاضرة 3، §7 | Functional = "شنو النظام يسوي؟" — Non-functional = "كيف بجودة معينة؟"

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
Which best describes "functional requirements"?
أ) How the system performs under conditions
ب) Performance metrics and scalability
ج) UI design and usability
د) What the system should do, including actions and services
**الإجابة: د**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What does "non-functional requirements" refer to?
أ) Not related to user interactions
ب) How the system performs its functions (performance, security, usability)
ج) Optional, can be excluded
د) Only applicable to hardware
**الإجابة: ب**
> تنبيه: غير الوظيفية **إلزامية** زي الوظيفية، مو اختيارية (فخ خيار ج).


### الفقرة 4: أنشطة هندسة المتطلبات الأربعة (Elicitation → Analysis → Documentation → Validation)

**من المحاضرة:** محاضرة 3، §9-14 | الترتيب حرفياً: `Elicitation` (استخراج) → `Analysis and Negotiation` (تحليل وتفاوض) → `Documentation` (توثيق) → `Validation` (تحقق).

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
Which best describes "requirements elicitation"?
أ) Documenting after gathering
ب) Defining verification/validation during testing
ج) Discovering and collecting stakeholder needs
د) Prioritizing based on business value
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
Which technique is commonly used for gathering requirements during SRS development?
أ) Code reviews
ب) Prototyping
ج) Performance testing
د) Version control
**الإجابة: ب**
> Prototyping (نمذجة أولية) أداة ممتازة لكشف الغموض (مثال search).


### الفقرة 5: Traceability + إدارة المتطلبات

**من المحاضرة:** محاضرة 3، §17-18 | `Traceability` (قابلية التتبع): ربط كل متطلب بمصدره وبتنفيذه لاحقاً.

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is "traceability" in the context of an SRS?
أ) Tracking codebase changes
ب) Documenting test cases from requirements
ج) Ensuring requirements met during testing
د) Ability to link requirements back to source and forward to implementation
**الإجابة: د**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
What is the purpose of including the traceability matrix in the SRS?
أ) To map test cases to requirements for validation
ب) To break down project milestones
ج) To outline architecture/design patterns
د) To document user feedback
**الإجابة: أ**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is one potential consequence of poorly defined requirements?
أ) Increased satisfaction due to flexibility
ب) Higher success likelihood
ج) Increased costs due to rework, scope creep, miscommunication
د) Faster cycles due to less documentation
**الإجابة: ج**
> تصحيح خطأ بمرحلة الصيانة بيكلف حتى 100 ضعف تصحيحه أثناء جمع المتطلبات.


### الفقرة 6: SRS كوثيقة "عقد" (محاضرة 10)

**من المحاضرة:** محاضرة 10، §1 | `SRS` مثل مخطط بناء بيت — توثّق كل التفاصيل عشان ما يصير خلاف بين العميل والفريق.

#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
What is the primary purpose of an SRS document?
أ) Project management strategy
ب) Software architecture and design
ج) Detailed description of intended capabilities and constraints
د) Testing strategies
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
Which document serves as a basis for the agreement between the customer and the development team?
أ) SDD
ب) SAD
ج) SRS
د) TPD - و) None
**الإجابة: ج**
> الترجمة: `SDD` = وثيقة التصميم، `SAD` = وثيقة المعمارية.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني *(معرفة عامة تكمّل المحاضرة)*]
Who is typically responsible for preparing the SRS?
أ) Project manager
ب) System architect
ج) QA team
د) Business analyst - و) None
**الإجابة: د**
> *(دور تنظيمي لم يُسمَّ صراحة بالمحاضرة، اعتماداً على معرفة عامة)*


### الفقرة 7: أقسام SRS التفصيلية — External Interfaces / Functions / Performance / Design Constraints (محاضرة 10-11)

**من المحاضرة:** محاضرة 10، §4-5 ومحاضرة 11 | 7 أبواب لـ`Specific Requirements`: External Interfaces, Functions, Performance, Logical DB, Design Constraints, Software System Attributes, Organization.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
Which section typically includes info about hardware/software interfaces?
أ) Functional requirements
ب) Non-functional
ج) External interfaces
د) User characteristics - و) None
**الإجابة: ج**
> مثال ACME: كرت شبكة Ethernet + قارئ باركود عبر serial port.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
Which section typically includes performance requirements details?
أ) Functional
ب) Non-functional
ج) System constraints
د) User characteristics - و) None
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
Which type of requirement specifies constraints on development process and implementation?
أ) Functional
ب) Non-functional
ج) Performance requirement
د) Design requirement - و) None
**الإجابة: د**
> —


#### تحقق سريع:
**المصدر:** [نمط 2024-2025 — الفصل الأول]
Which SRS section would typically contain user roles and permissions info?
أ) Functional Requirements
ب) Non-Functional Requirements
ج) System Architecture
د) Use Cases or User Stories
**الإجابة: د**
> مثال مكتبة ACME: Public/Private/Administration modes موثّقة عبر use cases مخصصة لكل دور.


### الفقرة 8: Assumptions and Dependencies + إدارة التغيير (محاضرة 11)

**من المحاضرة:** محاضرة 11، §3 | `Assumptions and Dependencies` (الافتراضات والتبعيات): عوامل خارجية غير مضمونة، لو تغيّرت لازم مراجعة الـSRS كاملة.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
What is the purpose of including assumptions and dependencies in the SRS?
أ) Outline risks
ب) Justify prioritizing requirements
ج) Clarify context and limitations of requirements
د) Define acceptance criteria - و) None
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الثاني]
Which aspect of SRS is crucial for ensuring the software can be maintained/enhanced in the future?
أ) Requirements prioritization
ب) Change control procedures
ج) User acceptance criteria
د) Performance metrics - و) None
**الإجابة: ب**
> —


### الفقرة 9: تحليل وتحقق المتطلبات + SRS كوثيقة (محاضرة 3 نفسها)

**من المحاضرة:** محاضرة 3، §12-16 | `Requirements Analysis` (تحليل المتطلبات): تنقيح وتنظيم المتطلبات المُستخرَجة، حل التعارضات بينها. `Requirements Validation` (التحقق من المتطلبات): فحص الوثيقة النهائية عبر 5 معايير أساسية: **الصلاحية** (`Validity` — هل هاي المتطلبات فعلاً؟)، **الاتساق** (`Consistency`)، **الاكتمال** (`Completeness`)، **الواقعية** (`Realism`)، و**قابلية التحقق** (`Verifiability`). وثيقة `SRS` نفسها لها 5 فئات مستخدمين رئيسية: العملاء (`Customers`)، المدراء (`Managers`)، مهندسو النظام (`System Engineers`)، مهندسو الاختبار (`Test Engineers`)، ومهندسو الصيانة (`Maintenance Engineers`).

#### تحقق سريع:
Which of the following is NOT one of the five Requirements Validation checks discussed in the lecture?
أ) Consistency
ب) Completeness
ج) Profitability
د) Verifiability
**الإجابة: ج**
> مش من المعايير الخمسة (Validity, Consistency, Completeness, Realism, Verifiability).

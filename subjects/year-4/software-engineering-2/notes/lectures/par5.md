# المحاضرة 5 — الوحدة E: إدارة المشروع والمخاطر (محاضرة 7)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

### الفقرة 0أ: مصطلحات الجدولة الأساسية

**من المحاضرة:** محاضرة 7، §1-2 | 4 أسئلة قبل أي تطوير: نفهم حاجة المستثمر؟ نقدر نصمم حل؟ كم يستغرق؟ كم يكلف؟ — آخر سؤالين يحتاجان `Scheduling`. مصطلحات أساسية: `Activity` (مهمة تستغرق وقتاً محدداً)، `Milestone` (نقطة زمنية تُعلن اكتمال المهمة)، `Precursor` (بادرة — حدث يجب أن يحدث قبل بدء المهمة)، `Duration` (المدة اللازمة)، `Due Date` (الموعد النهائي).

### الفقرة 3ب: فريق التطوير وتنظيمه

**من المحاضرة:** محاضرة 7، §8 | 8 مهام أساسية تحتاج إسناداً بشرياً: تحليل، تصميم نظام، تصميم برنامج، تنفيذ، اختبار، تدريب، صيانة، جودة. معايير اختيار الأفراد الستة: القدرة، الاهتمام، الخبرة، التدريب المتاح، القدرة على التواصل، ومهارات الإدارة. التنظيم هرمي — كل عضو يتواصل مع رئيسه المباشر بشكل أساسي، لا بالضرورة مع بقية الفريق (نموذج `Chief Programmer Team`).

### الفقرة 6ب: تصنيف المخاطر (المصدر/التأثير) + Risk Checklist

**من المحاضرة:** محاضرة 7، §12 | حسب **المصدر**: `Generic Risks` (مشتركة بين كل المشاريع) مقابل `Product-specific Risks` (خاصة بمشروع معيّن). حسب **التأثير**: `Project Risks` (تؤثر على الجدولة/الموارد)، `Product Risks` (تؤثر على جودة/أداء المنتج)، `Business Risks` (تؤثر على المؤسسة). `Risk Checklist` بـ6 أنواع: Technology, People, Organizational, Tools, Requirements, Estimation.

#### تحقق سريع:
A risk where "a competitor may release a competing product" is best classified as a:
أ) Project risk
ب) Product risk
ج) Business risk
د) Technology risk
**الإجابة: ج**
> يؤثر على المؤسسة/الشركة، مو على جدولة المشروع أو جودة المنتج تحديداً.


### الفقرة 6ج: استراتيجيات التعامل مع المخاطر (Risk Handling)

**من المحاضرة:** محاضرة 7، §15 | 3 استراتيجيات: **تجنّب** (`Avoidance` — تغيير المتطلبات لتفادي سبب الخطر)، **نقل** (`Transfer` — لنظام تأمين أو طرف ثالث)، **قبول والتحكم** (`Acceptance` — ضمن موارد المشروع مع مراقبة). تقييم أي إجراء تقليل خطر عبر `Risk Leverage`:

`RL = (Risk Exposure قبل − Risk Exposure بعد) / كلفة التقليل`

لو RL منخفض، ابحث عن بديل أفضل أو أقل كلفة.

### الفقرة 1: WBS + CPM + تقدير المدة والاعتماديات

**من المحاضرة:** محاضرة 7، §4-6 | `CPM` (طريقة المسار الحرج): يحدد النشاط اللي `Slack = 0`.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique involves identifying dependencies between project activities?
أ) Work breakdown structure
ب) Critical path method
ج) Dependency diagram
د) Resource allocation
**الإجابة: ب**
> يعتمد بالكامل على فهم اعتماديات الأنشطة أولاً.


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique estimates the duration of project activities?
أ) Work breakdown structure
ب) Critical path method
ج) Resource allocation
د) Earned value analysis
**الإجابة: ب**
> —


### الفقرة 2: تقدير الجهد — Bottom-up + PERT

**من المحاضرة:** محاضرة 7، §9-10 | `PERT`: معادلة `(x + 4z + y) / 6` (متشائم + 4×الأكثر احتمالاً + متفائل ÷ 6).

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique estimates the effort required to complete a project activity?
أ) Work breakdown structure
ب) Critical path method
ج) Bottom-up estimation
د) Earned value analysis
**الإجابة: ج**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique estimates project durations by evaluating optimistic, most likely, and pessimistic scenarios?
أ) Monte Carlo Simulation
ب) Critical Path Method
ج) PERT
د) Earned Value Management
**الإجابة: ج**
> —


### الفقرة 3: Gantt Chart + Resource Leveling

**من المحاضرة:** محاضرة 7، §7-8

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the purpose of a Gantt chart in project management?
أ) Estimate costs
ب) Track project progress
ج) Allocate resources
د) Define requirements
**الإجابة: ب**
> —


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique allocates resources to activities based on priority and availability?
أ) Work breakdown structure
ب) Critical path method
ج) Resource leveling
د) Risk identification
**الإجابة: ج**
> —


### الفقرة 4: إدارة المخاطر — Identification / Assessment / Analysis

**من المحاضرة:** محاضرة 7، §11-15 | `Risk Exposure = Probability × Impact`. المراحل: Identification → Analysis → Control.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
Which technique is used to identify and prioritize risks?
أ) Risk assessment
ب) Risk mitigation
ج) Risk identification
د) Risk monitoring
**الإجابة: أ**
> يغطي التحديد + التحليل معاً (وهذا يمكّن الترتيب حسب الأولوية عبر Risk Exposure).


#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
What is the main focus of risk management in project management?
أ) Identify and mitigate potential problems that could affect the project
ب) Define scope/requirements
ج) Allocate resources effectively
د) Manage stakeholder communication
**الإجابة: أ**
> —


### الفقرة 5: خطة المشروع (Project Plan)

**من المحاضرة:** محاضرة 7، §16 | وثيقة من 14 بنداً تعمل كـ"عقد غير رسمي" لكيفية تنفيذ ومراقبة المشروع.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024]
What is the primary purpose of a project management plan?
أ) Define software requirements
ب) Outline how the project will be executed, monitored, and controlled
ج) Write source code
د) Design system architecture
**الإجابة: ب**
> —

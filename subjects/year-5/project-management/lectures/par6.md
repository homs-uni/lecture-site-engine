# المحاضرة 6 — JIRA Fundamentals (أساسيات JIRA)
> **المادة:** إدارة المشاريع (القسم النظري والعملي) | **الموضوع:** إدارة المشاريع بأداة `JIRA` — الهيكلية، المستويات الإدارية، نمذجة العمل، `Kanban`، وتقارير `Kanban`

---
## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. ما هو `JIRA`؟

#### النص الأصلي يقول:
> "It is a software tool used to help manage, develop, and communicate about projects. It is a tool that helps in managing projects based on the Agile concept. The project can be: Team-based or individual, Simple or complex."

#### الشرح المبسّط:
`JIRA` هو برنامج (أداة) تُستخدم لإدارة المشاريع ومتابعة تطويرها والتواصل حولها بين أعضاء الفريق. بُني أساساً على فكرة `Agile`، لكنه مرن بما يكفي ليُستخدم مع مشروع فردي أو مشروع فريق، بسيط أو معقّد.

**لماذا؟** لأن أي مشروع — مهما كان حجمه — يحتاج مكاناً واحداً يجمع فيه الفريق: من يعمل على ماذا، وما هي الحالة الحالية لكل مهمة، بدل تشتت المعلومة بين رسائل ومحادثات متفرقة.

#### 💡 التشبيه:
> تخيّل `JIRA` وكأنه لوحة إعلانات كبيرة في مطبخ مطعم، تُعلَّق عليها كل الطلبات وتُنقَل الورقة من "طلب جديد" إلى "قيد التحضير" ثم "جاهز للتسليم".
> **وجه الشبه:** الطلب الورقي = `Issue`، ولوحة الإعلانات = `Board` في `JIRA`.

#### النص الأصلي يقول:
> "A flexible tool that can adapt to your work with Agile methodology however you want to apply it, or you can even rely on traditional methodologies such as the Waterfall model."

#### الشرح المبسّط:
`JIRA` لا يفرض عليك منهجية واحدة؛ يمكن ضبطه ليعمل بطريقة `Agile` (تكرارية ومرنة) أو حتى بطريقة تقليدية مثل `Waterfall` (تسلسلية: مرحلة تلو الأخرى).

**لماذا؟** لأن فرق العمل تختلف، وبعض المؤسسات لا يمكنها الانتقال الكامل لـ `Agile` دفعة واحدة، فتحتاج أداة تتكيّف معها بدل أن تفرض عليها أسلوباً واحداً. *(شرح زيادة للفهم)*

---

### 2. هيكلية `JIRA` — `Structure`

#### النص الأصلي يقول:
> "Projects in JIRA consist of a set of Issues. Each Issue represents a Work Item. Issues are used to build the project features."
> Application level → `Jira` - A collection of projects | Project level → `Project` - A collection of issues | Issue level → `Issue` - A work item

#### الشرح المبسّط:
هيكلية `JIRA` هرمية من ثلاثة مستويات:
1. **`Jira`** (مستوى التطبيق): يحتوي مجموعة من `Projects`.
2. **`Project`** (مستوى المشروع): يحتوي مجموعة من `Issues`.
3. **`Issue`** (مستوى المهمة): يمثّل عنصر عمل واحد (`Work Item`).

هذه العناصر (`Issues`) هي "لبنات البناء" التي تُشكّل ميزات المشروع (`features`) عند إنجازها مجتمعة.

**لماذا؟** لأن تقسيم المشروع الكبير إلى مشاريع، ثم إلى مهام صغيرة قابلة للتنفيذ، هو ما يجعل العمل قابلاً للتتبّع والتوزيع بين أفراد الفريق بدل أن يبقى "كتلة" واحدة غامضة.

#### 💡 التشبيه:
> تخيّل مكتبة كبيرة (`Jira`) فيها عدة أقسام (`Projects`) — قسم الروايات، قسم العلوم — وكل قسم فيه كتب (`Issues`) هي الوحدة الفعلية التي تستعيرها.
> **وجه الشبه:** المكتبة = `Jira`، القسم = `Project`، الكتاب = `Issue`.

#### ⚙️ الخطوات / الخوارزمية: العلاقة الهرمية بين المستويات
> ما هدف هذه العملية؟ توضيح كيف يُبنى المشروع من الأعلى إلى الأسفل.
```algorithm
1 | مستوى التطبيق | Jira | يجمع كل مشاريع المؤسسة
2 | مستوى المشروع | Project | يجمع كل Issues التابعة له
3 | مستوى المهمة | Issue | يمثل عنصر عمل واحد قابل للتنفيذ
```

#### نقاط التنفيذ:
- كل `Issue` ينتمي إلى `Project` واحد فقط، لكن يمكن عرضه ضمن لوحات (`Boards`) متعددة.
- لا يوجد `Issue` مستقل خارج `Project`.

---

### 3. إنشاء المشاريع — `Creating Projects`

#### النص الأصلي يقول:
> "When creating a new project, there are 3 pre-prepared templates in JIRA: Scrum, Kanban, Bug Tracking. They differ based on methodology or goal - Bug Tracking is used to track software bugs during software development."

#### الشرح المبسّط:
عند إنشاء مشروع جديد في `JIRA`، تختار من بين 3 قوالب جاهزة:
| القالب | الاستخدام |
| --- | --- |
| `Scrum` | إدارة العمل عبر `Sprints` زمنية محددة |
| `Kanban` | إدارة تدفّق مستمر من العمل بدون دورات زمنية ثابتة |
| `Bug Tracking` | تتبّع الأخطاء البرمجية أثناء التطوير |

**لماذا؟** لأن كل قالب مصمَّم بحقول وأعمدة تناسب طبيعة عمل مختلفة، فاختيار القالب الصحيح من البداية يوفّر عليك إعادة الضبط لاحقاً.

#### النص الأصلي يقول:
> "Issue details are called \"fields\". Fields may change depending on the selected issue type, the summary field is the title of the created issue."

#### الشرح المبسّط:
كل `Issue` له مجموعة تفاصيل تُسمّى `fields` (حقول)، وتختلف هذه الحقول حسب نوع `Issue` (مثلاً `Bug` له حقول تختلف عن `Story`). الحقل `summary` هو عنوان المهمة نفسها.

#### 💡 التشبيه:
> الحقول أشبه بخانات استمارة طلب توظيف: بعض الخانات ثابتة للجميع (الاسم)، وبعضها يظهر فقط حسب نوع الوظيفة المطلوبة.
> **وجه الشبه:** نوع الوظيفة = نوع `Issue`، والخانات = `fields`.

#### النص الأصلي يقول:
> "JIRA generates a unique value (a primary key within the project) for each issue consisting of the project key and the issue number within the project. `<issue_key> = <project_key>-<issue_number>`"

#### الشرح المبسّط:
كل `Issue` يحصل تلقائياً على معرّف فريد بصيغة `PROJ-1`، حيث `PROJ` هو رمز المشروع، و`1` هو رقم تسلسلي داخل هذا المشروع فقط (وليس داخل `JIRA` كاملاً).

**لماذا؟** لأن هذا المعرّف يشبه `Primary Key` في قواعد البيانات — يضمن أنه لا يوجد `Issue`ان بنفس المعرّف داخل نفس المشروع، ويسهّل الإشارة إليه في المحادثات وسجلات `Git` مثلاً.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كان لديك مشروعان `HR` و`DEV`، هل يمكن أن يتكرر الرقم `1` في كليهما (`HR-1` و`DEV-1` معاً)؟
> **لماذا هذا مهم؟** لأنه يوضّح أن الترقيم مستقل لكل مشروع (`project_key` مختلف)، فلا تعارض رغم تطابق الرقم.

---

### 4. المستويات الإدارية في `JIRA` — `Management Levels`

#### النص الأصلي يقول:
> "Site Manager: The JIRA site manager has the ability to add users. JIRA Manager: Responsible for the process of creating projects, settings modified here affect all company projects. Project Manager: Modifies settings of a specific project."

#### الشرح المبسّط:
هناك ثلاثة مستويات صلاحيات في `JIRA`:
| المستوى | الصلاحية |
| --- | --- |
| `Site Manager` | إضافة مستخدمين جدد للموقع كاملاً |
| `JIRA Manager` | إنشاء المشاريع، وتعديلات تؤثر على كل مشاريع الشركة |
| `Project Manager` | تعديل إعدادات مشروع واحد محدد فقط |

**لماذا؟** لأن الصلاحيات الهرمية تمنع أي شخص عشوائي من تغيير إعدادات تؤثر على كل الشركة، بينما تمنح مدير المشروع مرونة كافية لضبط مشروعه الخاص فقط.

#### النص الأصلي يقول:
> "Site settings: Manage all site details, May include some software from Atlassian. JIRA settings: Settings that include modifications only on projects. Since you are a site manager, you are considered a JIRA manager. Personal settings: Settings that each user can change, affecting only themselves."

#### الشرح المبسّط:
- **`Site settings`**: إعدادات تخص الموقع كله، وقد تشمل أدوات أخرى من شركة `Atlassian` (الشركة المطوّرة لـ `JIRA`).
- **`JIRA settings`**: إعدادات خاصة بالمشاريع فقط.
- **`Personal settings`**: إعدادات شخصية لا تؤثر إلا على المستخدم نفسه.

#### مهم للامتحان ⚠️:
> إذا كنت `Site Manager` فأنت تلقائياً تُعتبر `JIRA Manager` أيضاً (الصلاحية الأعلى تشمل الأدنى).

---

### 5. نمذجة العمل — `Work Modeling`

#### النص الأصلي يقول:
> "We rely on the concept of Todo Lists: Helps with focus, Helps with reminders, Organizing priorities, Tracking execution."

#### الشرح المبسّط:
نقطة الانطلاق في نمذجة العمل هي فكرة بسيطة جداً: قائمة المهام (`Todo List`). هذه الفكرة تخدم 4 أغراض:
1. التركيز على ما يجب فعله.
2. التذكير بالمهام غير المنجزة.
3. ترتيب الأولويات.
4. تتبّع مدى التنفيذ.

**لماذا؟** لأن `JIRA` وكل أدوات `Agile` الأخرى ما هي إلا تطوير احترافي لهذه الفكرة البسيطة، لكن بشكل جماعي وقابل للمشاركة بدل أن تبقى ورقة شخصية.

#### 💡 التشبيه:
> مثل قائمة التسوّق في المطبخ — تكتب فيها ما تحتاجه، وتشطب كل عنصر اشتريته.
> **وجه الشبه:** عنصر التسوّق = `Issue`، شطبه = نقله إلى `Done`.

---

### 6. اللوحات — `Boards`

#### النص الأصلي يقول:
> "One of the basic principles in Agile methodology is work modeling. The board is one of Agile tools used in modeling and managing tasks (work)."

#### الشرح المبسّط:
`Board` (اللوحة) هو أحد أهم أدوات `Agile` لنمذجة العمل وإدارته بصرياً، وهو التطبيق العملي لفكرة `Todo List` الجماعية.

#### النص الأصلي يقول:
> "In JIRA, boards are automatically generated based on the project template used. The board in the Kanban template contains: Columns: Backlog, Selected for Development, In Progress, Done. Each column contains a set of Issues. During team work, issues are moved from one column to the next until reaching the end. Kanban can be seen as a 2D Todo List. The team divides the work into manageable units."

#### الشرح المبسّط:
عندما تنشئ مشروعاً بقالب `Kanban`، ينشئ `JIRA` تلقائياً لوحة تحتوي 4 أعمدة افتراضية:
`Backlog` → `Selected for Development` → `In Progress` → `Done`

كل عمود يحتوي مجموعة من `Issues`، ويتنقّل كل `Issue` من عمود لآخر مع تقدّم العمل عليه، حتى يصل لعمود `Done`.

**لماذا؟** يمكن اعتبار `Kanban` قائمة مهام ثنائية البُعد (`2D Todo List`): البُعد الأول هو "ماذا يجب أن يُعمَل" (المهام نفسها)، والبُعد الثاني هو "أين هي الآن من مراحل الإنجاز" (العمود). هذا يعطي رؤية أوضح بكثير من قائمة نصية بسيطة.

#### 💡 التشبيه:
> تماماً كما في مطعم: طلب يُؤخذ (`take order`)، يدخل طابور المطبخ (`cook's queue`)، يُحضَّر (`prepare order`)، يدخل طابور التسليم (`delivery queue`)، ثم يُسلَّم (`done`).
> **وجه الشبه:** الطلب = `Issue`، مراحل المطعم = أعمدة `Board`.

#### النص الأصلي يقول:
> "Why do we use work modeling? Provides a clear mechanism for tracking execution, Allows managers to see the real status of the project, Transparency in execution for the team and stakeholders, Helps organize and focus team work, Work is only done on tasks present on the board. For management: Easier addition and prioritization of tasks, Easier updating of project tasks, Improving team workflow, Identifying difficult issues."

#### الشرح المبسّط:
فوائد نمذجة العمل عبر اللوحات تنقسم لفريقين مستفيدين:
| المستفيد | الفائدة |
| --- | --- |
| الفريق والإدارة | تتبّع واضح، رؤية الحالة الحقيقية، شفافية، تركيز، لا عمل خارج اللوحة |
| الإدارة تحديداً | إضافة/ترتيب أسهل، تحديث أسهل، تحسين سير العمل، اكتشاف المهام الصعبة |

**لماذا؟** لأن الشفافية (`Transparency`) تعني ألا تكون هناك مفاجآت عند موعد التسليم — الجميع يرى نفس الصورة الحقيقية للمشروع لحظة بلحظة.

---

### 7. سير العمل — `WorkFlow`

#### النص الأصلي يقول:
> "The set of board columns represents the workflow for processing an issue. We use the workflow to model processes within the project. The workflow is divided into steps (Statuses, States, Stages). Each column represents a step in execution. We conclude that boards model the workflow."

#### الشرح المبسّط:
`Workflow` هو مجموعة الأعمدة (الخطوات/الحالات) التي يمرّ بها أي `Issue` من إنشائه حتى إنجازه. كل عمود = خطوة (`Status`/`State`/`Stage`). خلاصة الفكرة: **اللوحة (`Board`) هي التمثيل المرئي لسير العمل (`Workflow`)**.

**لماذا؟** لأن كل مشروع له عملية إنتاج مختلفة (مطعم غير مشروع برمجي)، فـ `Workflow` يسمح لك بتصميم الخطوات التي تناسب طبيعة عملك تحديداً بدل فرض قالب واحد على الجميع.

#### مثال مطعم (من الشريحة):
`take order` (وقت الانتظار) → `cook's queue` (الطباخ) → `prepare order` (الطباخ) → `delivery queue` (وقت الانتظار) → `done` (وقت الانتظار)

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا تتلوّن بعض الأعمدة في المثال بلون مختلف (`wait staff` مقابل `cook`)؟
> **لماذا هذا مهم؟** لأن كل عمود له "منفّذ" (`performer`) مسؤول عنه؛ هذا يوضّح من يجب أن يتابع كل خطوة تحديداً.

---

### 8. اللوحات مقابل سير العمل — `Boards vs WorkFlow`

#### النص الأصلي يقول:
> "The team works based on the board. The board structure is determined based on the defined workflow."

#### الشرح المبسّط:
العلاقة اتجاه واحد: أولاً تُصمَّم `Workflow` (الخطوات المنطقية)، ثم بناءً عليها تُبنى بنية `Board` (الأعمدة الظاهرة للفريق). الفريق فعلياً "يعمل" على اللوحة، لكن اللوحة نفسها انعكاس لسير عمل مُعرَّف مسبقاً.

**لماذا؟** الفصل بين "المنطق" (`Workflow`) و"العرض" (`Board`) يشبه الفصل بين `Backend` و`Frontend` في البرمجة — يمكنك تغيير طريقة العرض دون كسر منطق العملية، أو العكس. *(شرح زيادة للفهم)*

#### النص الأصلي يقول:
> "Boards are created automatically based on the used template. You can create additional boards at any time. One project can contain multiple boards. A single board can contain issues from multiple projects. Each project is linked to a workflow. The status field of each issue must be set to one of the workflow statuses. Boards are a view of issues sorted by status. Moving an issue changes its status field value. Drag and drop in Jira. Changing issue status is called a transition."

#### الشرح المبسّط:
نقاط أساسية حول العلاقة بين `Boards` و`Workflow`:
- مشروع واحد يمكن أن يملك عدة لوحات.
- لوحة واحدة يمكن أن تعرض `Issues` من عدة مشاريع مختلفة.
- كل مشروع مرتبط بـ `Workflow` واحد.
- حقل `status` لأي `Issue` يجب أن يكون قيمة من قيم `Workflow` المسموحة فقط.
- اللوحة ما هي إلا "عرض" (`view`) للـ `Issues` مرتّبة حسب حالتها.
- سحب `Issue` وإفلاته (`Drag and drop`) في عمود آخر يُغيّر قيمة حقل `status` تلقائياً.
- تغيير الحالة يُسمّى **`transition`**.

#### الفهم الخاطئ الشائع ❌:
> نقل بطاقة على اللوحة هو مجرد تغيير "شكلي" أو "بصري" فقط.

#### الفهم الصحيح ✅:
> نقل البطاقة هو `transition` فعلي يُحدّث حقل `status` في قاعدة بيانات `JIRA` نفسها، وليس مجرد تغيير مكان بصري.

---

### 9. عرض النمذجة — `Modeling View`

#### النص الأصلي يقول:
> "The gray dot represents creating an issue. The gray arrow is a transition. The \"all\" box means issues from any other state can be moved to this state."

#### الشرح المبسّط:
عند رسم `Workflow` بصرياً:
- **النقطة الرمادية (●)**: تمثّل لحظة إنشاء `Issue` جديد.
- **السهم الرمادي (→)**: يمثّل `transition` (انتقال من حالة لأخرى).
- **مربع "All"**: يعني أن أي `Issue` من أي حالة أخرى يمكن نقله مباشرة لهذه الحالة (بدون المرور بحالات وسيطة إلزامية).

**لماذا؟** لأن بعض المشاريع تحتاج مرونة — مثلاً يمكن نقل `Issue` من `Backlog` مباشرة إلى `Done` إذا اكتُشِف أنه غير مطلوب أصلاً، دون المرور بـ `In Progress`.

#### 🔍 تتبع التنفيذ: مسار `Issue` عبر `Workflow`
**المدخل:** `Issue` جديد يُنشأ في `Backlog`
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | إنشاء `Issue` | `Backlog` |
| 2 | `transition` عبر مربع `All` | `In Progress` (تخطّى `Selected for Development`) |
| 3 | `transition` طبيعي | `Done` |

**النتيجة:** يمكن لأي `Issue` أن يقفز حالات باستخدام مربع `All`، وهذا يوضّح مرونة `Workflow` في `JIRA`.

---

### 10. إنشاء عمود جديد — `Creating a New Column`

#### النص الأصلي يقول:
> "JIRA creates a status and adds it to the workflow. Column category is similar to status. This category helps determine the issue position in the lifecycle. Only one value from three: To Do (issue not started yet, gray color), In Progress (work ongoing, blue color), Done (issue completed, green color)."

#### الشرح المبسّط:
عند إنشاء عمود جديد يدوياً، ينشئ `JIRA` تلقائياً `status` جديدة ويضيفها إلى `Workflow`. لكل عمود **فئة (`Category`)** واحدة فقط من ثلاث:
| الفئة | المعنى | اللون |
| --- | --- | --- |
| `To Do` | لم يبدأ العمل بعد | رمادي |
| `In Progress` | العمل جارٍ | أزرق |
| `Done` | اكتمل | أخضر |

**لماذا؟** لأن هذه الفئات الثلاث الثابتة تسمح لـ `JIRA` بحساب مقاييس عامة (مثل عدد المهام "المكتملة") بغض النظر عن أسماء الأعمدة المخصّصة التي قد يبتكرها كل فريق (مثل `review`، `QA`...).

#### النص الأصلي يقول:
> "Resolution: If the choice \"set\" for this column, JIRA will consider the issue to be solved when reaching this column."

#### الشرح المبسّط:
خيار `Set resolution` عند تفعيله على عمود معيّن (عادة `Done`)، يجعل `JIRA` يعتبر أي `Issue` يصل لهذا العمود "محلولاً/منتهياً" فعلياً (حقل `Resolution` يُملأ تلقائياً)، وليس فقط منقولاً بصرياً.

#### النص الأصلي يقول:
> "Cards: The boards view issues as a set of cards. These cards shows few information about the issue. We can customize up to 3 fields in the cards to be shown."

#### الشرح المبسّط:
كل `Issue` يظهر على اللوحة كـ **بطاقة (`Card`)** تعرض معلومات مختصرة: `type` (النوع)، `priority` (الأولوية)، `days in column` (عدد الأيام في هذا العمود)، `assignee` (المكلَّف)، و`issue key` (المعرّف)، و`summary` (العنوان). يمكن تخصيص حتى 3 حقول إضافية للعرض على البطاقة.

#### 💡 التشبيه:
> البطاقة أشبه بملصق صغير على صندوق شحن: لا يعرض كل تفاصيل المحتوى، بل فقط المعلومات الأهم (الوجهة، الوزن، رقم التتبّع).
> **وجه الشبه:** الصندوق الكامل = `Issue`، الملصق = `Card`.

---

### 11. `Kanban` — المفهوم العام

#### النص الأصلي يقول:
> "Agile Methodologies: Approaches to achieve flexibility - Also called frameworks or Agile methodologies - It is a mindset, not an actual management approach. Agile methods add more structure to Agile ideas. Each embodies core Agile principles: Team empowerment, Continuous improvement, Working in small batches, Incremental feature addition. Often combined into a customized way."

#### الشرح المبسّط:
`Agile` بحدّ ذاته **عقلية (`mindset`)** وليس منهجية عملية جاهزة للتطبيق المباشر. لتطبيقها عملياً، ظهرت "أطر عمل" (`frameworks`) مثل `Kanban`، `Scrum`، `XP`، وكل واحدة منها تضيف هيكلاً وتفاصيل عملية لأفكار `Agile` العامة، مثل: تمكين الفريق، التحسين المستمر، العمل بدفعات صغيرة، وإضافة الميزات تدريجياً. غالباً تُدمَج هذه الأطر بطريقة مخصّصة حسب احتياج كل فريق.

**لماذا؟** التمييز بين "العقلية" و"إطار العمل" مهم لأنه يوضّح أن `Kanban` مثلاً ليس هو `Agile` نفسه، بل تطبيق واحد من عدة تطبيقات ممكنة لنفس الفلسفة.

#### النص الأصلي يقول:
> "Definition: An Agile method used to manage a continuous queue of work items."

#### الشرح المبسّط:
`Kanban` هو إطار عمل `Agile` يُستخدم لإدارة **طابور مستمر** من عناصر العمل، أي لا يعتمد على دورات زمنية مغلقة (`Sprints`) كما في `Scrum`، بل تدفّق مستمر من المهام.

#### النص الأصلي يقول:
> "Limiting Work In Progress (WIP): Working only on a volume of work that can be handled sustainably. Removing bottlenecks to improve the Value Stream. The Ideal State: Producing a continuous, smooth flow of work. The Reality: Issues accumulate in specific areas due to process complexity or underlying problems. Solution: Identify the root cause and fix the process. Using a Pull system for work instead of a Push system."

#### الشرح المبسّط:
فكرتان أساسيتان في `Kanban`:
1. **تحديد `WIP` (العمل الجاري)**: العمل فقط على كمية يمكن التعامل معها بشكل مستدام، لإزالة الاختناقات (`bottlenecks`) وتحسين تدفّق القيمة (`Value Stream`).
2. **نظام `Pull` بدل `Push`**: بدل أن يُدفَع العمل قسراً لمرحلة تالية، تسحب كل مرحلة العمل من المرحلة التي قبلها عندما تكون جاهزة له.

**لماذا؟** الحالة المثالية هي تدفّق مستمر وسلس، لكن الواقع أن العمل يتراكم في نقاط معيّنة بسبب تعقيد العملية أو مشاكل كامنة؛ الحل ليس "تجاهل" التراكم بل تحديد السبب الجذري وإصلاح العملية نفسها.

#### ⚖️ المقايضة: `Pull` مقابل `Push`
| | `Push` | `Pull` |
| --- | --- | --- |
| المزايا | بساطة، لا حاجة لانتظار طلب | يحترم قدرة كل مرحلة، يمنع التكدّس |
| العيوب | قد يُثقل مرحلة لاحقة غير جاهزة | يحتاج طوابير/`buffers` مُصمَّمة جيداً |
| متى تختاره | عمل بسيط بلا اختلاف سرعات بين المراحل | عندما تختلف سرعة كل مرحلة عن الأخرى |

---

### 12. لماذا نستخدم `Kanban`؟

#### النص الأصلي يقول:
> "Lightweight and Efficient: It is considered more lightweight compared to other frameworks like SCRUM. Simple and provides high flexibility. Easy to start and easy to use."

#### الشرح المبسّط:
`Kanban` أخف من `Scrum` (لا يحتاج أدوار ثابتة أو اجتماعات دورية إلزامية)، وبسيط ومرن، وسهل البدء به فوراً.

#### النص الأصلي يقول:
> "An Evolutionary Approach to Agile Transformation: You can utilize your existing team in their current roles. It does not require a complete reorganization of the team structure."

#### الشرح المبسّط:
يمكنك تطبيق `Kanban` على فريقك الحالي بأدواره الحالية دون إعادة هيكلة، على عكس بعض الأطر التي تفرض أدواراً جديدة (مثل `Scrum Master` في `Scrum`).

#### النص الأصلي يقول:
> "Works Well for Service-Oriented Workflows: Operations, Support, Maintenance, Development, HR… Any scenario that involves a continuous flow of work. Supports Multi-Team and Multi-Project Workflows: Issues can be moved between teams using a single shared board or multiple team-specific boards."

#### الشرح المبسّط:
يناسب `Kanban` أي عمل ذي طبيعة خدمية مستمرة (دعم فني، صيانة، تطوير، موارد بشرية...)، ويدعم أيضاً العمل بين عدة فرق أو مشاريع في آن واحد، إما بلوحة مشتركة واحدة أو لوحات خاصة بكل فريق.

#### 💡 التشبيه:
> `Kanban` أشبه بخط إنتاج مستمر في مصنع (لا يتوقف بين "دفعة" و"دفعة")، بعكس `Scrum` الذي أشبه بموسم زراعي محدد (تُخطَّط دفعة كاملة، تُزرع، ثم تُحصَد).
> **وجه الشبه:** التدفّق المستمر = `Kanban`، الدورة المغلقة = `Sprint` في `Scrum`.

---

### 13. عمود `Backlog` في `Kanban`

#### النص الأصلي يقول:
> "In JIRA, the Backlog column can be separated from the Kanban board. Advantages: The development team sees and focuses only on issues they can currently work on, as backlog items are not yet ready for action. Disadvantages: The backlog may become very long and difficult to manage in this format. Work within it is not visible to the rest of the team members."

#### الشرح المبسّط:
يمكن فصل عمود `Backlog` عن لوحة `Kanban` الرئيسية ووضعه في صفحة منفصلة (`Kanban backlog`).

| المزايا | العيوب |
| --- | --- |
| الفريق يركّز فقط على المهام الجاهزة فعلياً للعمل | قد يصبح `Backlog` طويلاً جداً وصعب الإدارة |
| — | العمل داخله غير مرئي لباقي الفريق |

**لماذا؟** هذا مثال كلاسيكي على مقايضة (`Trade-off`): الفصل يقلّل الفوضى البصرية على اللوحة الرئيسية، لكنه يخفي جزءاً من المعلومة عن باقي الفريق، فيجب اختيار ما يناسب حجم فريقك.

---

### 14. حدود العمل الجاري — `Work In Progress (WIP) Limits`

#### النص الأصلي يقول:
> "We define a minimum and/or maximum number of issues allowed in specific columns of the Kanban board."

#### الشرح المبسّط:
`WIP Limits` هي أرقام (حد أدنى و/أو حد أقصى) تحدّد كم `Issue` يُسمح أن يوجد في عمود معيّن في نفس الوقت.

#### النص الأصلي يقول:
> "Why? Better Workflow: Fewer issues handled simultaneously allows for a flow that leads to completion. The team focuses on finishing current work before starting new tasks by reducing multitasking. Faster issue resolution, as moving issues to the \"Done\" status is a primary metric of progress. Reduces Waste: Prevents delays in the work state. Promotes Teamwork: Encourages the removal of blockers."

#### الشرح المبسّط:
فوائد `WIP Limits`:
1. **سير عمل أفضل**: تعامل مع مهام أقل بالتزامن = تدفّق أسرع نحو الإنجاز، وتقليل تعدّد المهام (`multitasking`).
2. **تقليل الهدر**: يمنع تأخّر الحالات (`states`) عن التقدّم.
3. **تعزيز العمل الجماعي**: يشجّع الفريق على إزالة العوائق (`blockers`) بدل تكديس مهام جديدة.

**لماذا؟** لأن `multitasking` يبدو مُنتِجاً لكنه فعلياً يبطّئ إنجاز كل مهمة على حدة؛ تحديد سقف واضح يجبر الفريق على إنهاء العمل الحالي أولاً.

#### 💡 التشبيه:
> مثل كاشير في محل بقالة يقبل زبوناً واحداً في كل مرة بدل خمسة في نفس الوقت — كل زبون يُخدَم أسرع، والطابور يتحرّك بانسيابية.
> **وجه الشبه:** الزبون = `Issue`، سعة الكاشير = `WIP Limit`.

#### النص الأصلي يقول:
> "Current work limits are called Column Constraints in JIRA. In JIRA, via Board Settings → Columns: Below Minimum: The column turns yellow on the board. Exceeding Maximum: The column turns red on the board."

#### الشرح المبسّط:
تُسمّى هذه الحدود في `JIRA` باسم **`Column Constraints`**، وتُضبَط من `Board Settings → Columns`. المؤشرات البصرية:
| الحالة | اللون |
| --- | --- |
| أقل من الحد الأدنى | أصفر |
| أكثر من الحد الأقصى | أحمر |

#### النص الأصلي يقول:
> "How to define WIP limits? It depends on the project and the team. For example: Start without any WIP limits. Add WIP limits when bottlenecks or issues appear in the process. Set WIP limits to curb excessive multitasking. Set WIP limits on steps that the team tends to neglect."

#### الشرح المبسّط:
لا توجد قاعدة رياضية ثابتة لتحديد `WIP Limits`؛ الأسلوب العملي المقترح:
1. ابدأ بدون أي حدود.
2. أضف حدوداً عند ظهور اختناقات فعلية.
3. اضبط حدوداً لكبح تعدّد المهام المفرط.
4. اضبط حدوداً على الخطوات التي يميل الفريق لإهمالها.

#### مهم للامتحان ⚠️:
> `WIP Limits` ليست قراراً يُتّخذ مرة واحدة، بل تُضبَط تدريجياً بناءً على ملاحظة سلوك الفريق الفعلي، وليس نظرياً مسبقاً.

---

### 15. `Pull` مقابل `Push`

#### النص الأصلي يقول:
> "The developer either pushes work to the next step or pulls it from the previous step."

#### الشرح المبسّط:
في أي مرحلة من `Workflow`، المطوّر إما **يدفع (`push`)** العمل للمرحلة التالية بعد إنهائه، أو **يسحب (`pull`)** العمل من المرحلة السابقة عندما يصبح جاهزاً لاستقباله.

#### النص الأصلي يقول:
> "We create queues (buffers) to enable the Pull system."

#### الشرح المبسّط:
لتفعيل نظام `Pull` عملياً، نُنشئ طوابير وسيطة (`queues`/`buffers`) بين المراحل — مثل `cook's queue` و`delivery queue` في مثال المطعم — تخزّن العمل الجاهز مؤقتاً حتى تسحبه المرحلة التالية عندما تكون متفرّغة.

#### النص الأصلي يقول:
> "Why do we prefer Pull over Push? Allows team members to choose tasks that match their expertise. Maintains a sustainable pace of work."

#### الشرح المبسّط:
نُفضّل `Pull` على `Push` لسببين:
1. يسمح لكل عضو باختيار المهمة التي تناسب خبرته (بدل أن يُفرَض عليه عمل عشوائي).
2. يحافظ على وتيرة عمل مستدامة (لا إغراق مفاجئ لمرحلة بعمل أكثر من طاقتها).

#### 🔄 قبل / بعد: نظام `Push` إلى `Pull`
**قبل (`Push` بلا طوابير):**
```text
take order -> cook's queue -> prepare order -> delivery queue -> done
(العمل يُدفَع مباشرة بلا اعتبار لجاهزية المرحلة التالية)
```
**بعد (`Pull` عبر طوابير/buffers):**
```text
take order --push--> cook's queue --pull--> prepare order --push--> delivery queue --pull--> done
```
**ماذا تغيّر؟** أصبحت المرحلة التالية (الطباخ مثلاً) هي من "تسحب" الطلب من الطابور وقت استعدادها فعلياً، بدل استقباله قسراً.

---

### 16. تقارير `Kanban` — `Kanban Reporting`

#### النص الأصلي يقول:
> "Why use Agile reports? Visualize Team Work: Enhances project transparency (Transparency means no surprises regarding delivery). Troubleshooting & Continuous Improvement: Reports can clearly highlight process bottlenecks. Assistance in Planning and Estimation."

#### الشرح المبسّط:
نستخدم تقارير `Agile` لثلاثة أهداف:
1. تصوير عمل الفريق بصرياً لتعزيز الشفافية (بمعنى: لا مفاجآت عند موعد التسليم).
2. اكتشاف الاختناقات والمساعدة على التحسين المستمر.
3. المساعدة في التخطيط والتقدير المستقبلي.

---

### 17. مخطط التدفّق التراكمي — `Cumulative Flow Diagram (CFD)`

#### النص الأصلي يقول:
> "A common report for Kanban projects. Priority is given to maintaining and improving the team's workflow. Reports are generally updated automatically. The CFD shows the number of issues in each status over time."

#### الشرح المبسّط:
`CFD` هو التقرير الأكثر شيوعاً لمشاريع `Kanban`. يُحدَّث تلقائياً، ويُظهر عدد `Issues` في كل حالة (`status`) عبر الزمن، على شكل مساحات ملوّنة متراكمة فوق بعضها (`Done`, `In Progress`, `Selected for Development`, `Backlog`).

**لماذا؟** لأن اتساع أو ضيق كل شريط لون عبر الزمن يكشف مباشرة أين يتراكم العمل (اختناق) وأين يتدفّق بسلاسة، دون الحاجة لتحليل يدوي معقّد.

#### 🔍 تتبع التنفيذ: قراءة `CFD`
**المدخل:** شريط `In Progress` يزداد اتساعاً باستمرار عبر الأيام بينما شريط `Done` يبقى شبه ثابت.
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | ملاحظة اتساع `In Progress` | تراكم عمل في هذه الحالة |
| 2 | مقارنة مع ثبات `Done` | العمل لا يخرج من `In Progress` بنفس معدّل دخوله |
| 3 | الاستنتاج | يوجد اختناق (`bottleneck`) في `In Progress` |

**النتيجة:** التقرير يكشف اختناقاً حقيقياً في مرحلة `In Progress` يستدعي إجراء (مثل خفض `WIP Limit` لهذا العمود).

---

### 18. زمن الانتظار مقابل زمن الدورة — `Lead Time vs. Cycle Time`

#### النص الأصلي يقول:
> "Lead Time: The total time from the creation of an issue until its completion. Cycle Time: The time from when work actually starts on the issue until its completion."

#### الشرح المبسّط:
| المصطلح | التعريف |
| --- | --- |
| `Lead Time` | الزمن الكلي من **إنشاء** `Issue` حتى اكتماله (يشمل وقت الانتظار في `Backlog`) |
| `Cycle Time` | الزمن من **بدء العمل الفعلي** على `Issue` حتى اكتماله فقط |

**لماذا؟** التمييز مهم لأن `Lead Time` يقيس تجربة العميل (كم انتظر من طلبه حتى استلامه)، بينما `Cycle Time` يقيس كفاءة الفريق الفعلية أثناء التنفيذ فقط، بمعزل عن مدة الانتظار في الطابور.

#### 💡 التشبيه:
> عند طلب طعام: `Lead Time` هو الوقت من لحظة تقديم الطلب حتى استلامه (يشمل الانتظار في الطابور)، أما `Cycle Time` فهو فقط وقت التحضير الفعلي بعد أن بدأ الطباخ العمل.
> **وجه الشبه:** لحظة الطلب = إنشاء `Issue`، بدء الطبخ = بدء العمل الفعلي.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كان `Issue` انتظر 5 أيام في `Backlog` ثم استغرق يومَين عملاً فعلياً، ما قيمة `Lead Time` وما قيمة `Cycle Time`؟
> **لماذا هذا مهم؟** `Lead Time` = 7 أيام، `Cycle Time` = يومان فقط — الفرق هنا هو بالضبط وقت الانتظار في الطابور.

### الأفكار الرئيسية الشاملة
> لا توجد أفكار محورية إضافية لم تُغطَّ في الأقسام أعلاه — كل نقطة واردة في المحاضرة (Jira الأداة، الهيكلية، إنشاء المشاريع، المستويات الإدارية، نمذجة العمل، Boards، Workflow، Modeling View، إنشاء الأعمدة، Kanban ومفاهيمه، WIP Limits، Pull/Push، وتقارير Kanban بما فيها CFD وLead/Cycle Time) شُرحت أعلاه بالتسلسل نفسه.

---
## الجزء الثاني: ملخص منظم

### جدول التعريفات
| المصطلح | التعريف |
| --- | --- |
| `JIRA` | أداة لإدارة المشاريع مبنية على مفهوم `Agile`، قابلة للتكيّف مع `Waterfall` أيضاً |
| `Issue` | عنصر عمل (`Work Item`) واحد داخل مشروع |
| `Project` | مجموعة من `Issues` |
| `Board` | التمثيل المرئي لـ `Workflow`، يعرض `Issues` كبطاقات موزّعة على أعمدة |
| `Workflow` | مجموعة الحالات (`Statuses`) التي يمرّ بها `Issue` |
| `Transition` | الانتقال من حالة لأخرى |
| `Kanban` | إطار `Agile` لإدارة طابور مستمر من العمل |
| `WIP Limit` | حد أقصى/أدنى لعدد `Issues` المسموح بها في عمود معيّن |
| `Pull system` | سحب العمل من المرحلة السابقة عند الجاهزية |
| `Push system` | دفع العمل للمرحلة التالية فور الانتهاء |
| `CFD` | مخطط يعرض عدد `Issues` بكل حالة عبر الزمن |
| `Lead Time` | من الإنشاء حتى الاكتمال |
| `Cycle Time` | من بدء العمل الفعلي حتى الاكتمال |

### جدول المكوّنات (المستويات الإدارية)
| المستوى | الصلاحية الأساسية |
| --- | --- |
| `Site Manager` | إضافة مستخدمين |
| `JIRA Manager` | إنشاء مشاريع، إعدادات تشمل كل الشركة |
| `Project Manager` | إعدادات مشروع واحد فقط |

### جدول مقارنة (قوالب إنشاء المشروع)
| القالب | الاستخدام الأساسي |
| --- | --- |
| `Scrum` | عمل بدورات زمنية (`Sprints`) |
| `Kanban` | تدفّق مستمر بدون دورات |
| `Bug Tracking` | تتبّع الأخطاء البرمجية |

### جدول الأخطاء الشائعة
| الخطأ الشائع | التصحيح |
| --- | --- |
| اعتبار نقل البطاقة على اللوحة تغييراً بصرياً فقط | هو `transition` فعلي يُحدّث حقل `status` |
| الخلط بين `Lead Time` و`Cycle Time` | `Lead Time` يشمل الانتظار، `Cycle Time` لا يشمله |
| اعتبار `Kanban` هو نفسه `Agile` | `Kanban` إطار عمل واحد يطبّق فلسفة `Agile`، وليس مرادفاً لها |
| ضبط `WIP Limits` نظرياً من البداية بأرقام عشوائية | يجب البدء بدون حدود ثم إضافتها بناءً على اختناقات فعلية |

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: إنشاء `Issue` جديد ومعرّفه الفريد
```algorithm
1 | تحديد المشروع | Project | يوفر project_key
2 | إنشاء Issue | Create button | JIRA يولّد issue_number تسلسلي
3 | تركيب المعرف | JIRA Engine | issue_key = project_key-issue_number
```

#### ⚙️ الخطوات / الخوارزمية: دورة حياة `Issue` عبر `Board`
```algorithm
1 | إنشاء Issue | Backlog column | يبدأ عند النقطة الرمادية
2 | نقل بالسحب | Drag and drop | يُغيّر status عبر transition
3 | التقدم عبر الأعمدة | Board columns | Selected -> In Progress
4 | الوصول لعمود Done | Resolution=Set | JIRA يعتبر Issue محلولاً
```

#### ⚙️ الخطوات / الخوارزمية: تفعيل نظام `Pull` بالطوابير
```algorithm
1 | تحديد المراحل | Workflow steps | كل مرحلة لها منفذ (performer)
2 | إنشاء طابور وسيط | Queue/Buffer | يخزن العمل الجاهز مؤقتا
3 | سحب العمل | Pull | المرحلة التالية تسحب عند الجاهزية فقط
```

#### ⚙️ الخطوات / الخوارزمية: منهجية ضبط `WIP Limits`
```algorithm
1 | البدء بدون حدود | Board Settings | مراقبة سير العمل الطبيعي
2 | رصد الاختناقات | CFD / ملاحظة | تحديد العمود المتكدس
3 | إضافة حد | Column Constraints | ضبط Min/Max لهذا العمود تحديدا
4 | مراقبة اللون | Board view | أصفر=أقل من الحد، أحمر=أكثر من الحد
```

### أنماط الأكواد والتعامل
لا يتضمن محتوى هذه المحاضرة ملفات كود أو أوامر طرفية (`commands`)؛ المحاضرة نظرية بالكامل حول مفاهيم إدارة المشاريع عبر `JIRA` — لذا لا يوجد قسم كود كامل (الجزء الخامس سيُشار فيه لذلك).

---
## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)
> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25% (4 أسئلة) / سيناريو 35% (≈6 أسئلة) / تطبيق 30% (≈5 أسئلة) / تتبع خوارزمية 10% (1 سؤال).

### السؤال 1 (متوسط)
ما هو التسلسل الهرمي الصحيح لمستويات `JIRA` من الأعلى إلى الأسفل؟
أ) `Issue` ← `Project` ← `Jira`
ب) `Jira` ← `Project` ← `Issue`
ج) `Project` ← `Jira` ← `Issue`
د) `Jira` ← `Issue` ← `Project`
**الإجابة الصحيحة: ب**
**التعليل:** `Jira` (مستوى التطبيق) يحتوي `Projects`، وكل `Project` يحتوي `Issues`. الخيار أ يعكس الترتيب. ج يضع `Jira` بين `Project` و`Issue` وهذا خاطئ لأن `Jira` هو الأعلى. د يضع `Issue` قبل `Project` رغم أن `Issue` هو الأدنى.

### السؤال 2 (سهل/متوسط)
ما القالب المناسب لتتبّع الأخطاء البرمجية أثناء التطوير؟
أ) `Scrum`
ب) `Kanban`
ج) `Bug Tracking`
د) `Waterfall`
**الإجابة الصحيحة: ج**
**التعليل:** `Bug Tracking` هو القالب المخصّص لهذا الغرض حسب النص. `Scrum` و`Kanban` قوالب عامة لإدارة العمل وليست مخصّصة للأخطاء تحديداً. `Waterfall` أصلاً ليس أحد القوالب الثلاثة الجاهزة في `JIRA` بل منهجية تقليدية.

### السؤال 3 (متوسط)
معرّف `Issue` بصيغة `HR-14` يعني:
أ) هذا هو `Issue` رقم 14 في كل `JIRA` بغض النظر عن المشروع
ب) `HR` هو `project_key` و14 هو `issue_number` ضمن هذا المشروع فقط
ج) 14 هو رقم `Site Manager`
د) `HR-14` هو اسم `Workflow`
**الإجابة الصحيحة: ب**
**التعليل:** الصيغة `<issue_key> = <project_key>-<issue_number>` والترقيم مستقل لكل مشروع. الخيار أ خاطئ لأن الترقيم محلي للمشروع لا عام. ج ود لا علاقة لهما بالمفهوم إطلاقاً.

### السؤال 4 (سيناريو - متوسط)
مدير أراد تعديل إعداد يؤثر على **كل** مشاريع الشركة دفعة واحدة. أي مستوى صلاحية يحتاج على الأقل؟
أ) `Personal settings`
ب) `Project Manager`
ج) `JIRA Manager`
د) لا يحتاج أي صلاحية خاصة
**الإجابة الصحيحة: ج**
**التعليل:** `JIRA Manager` هو المسؤول عن إعدادات تؤثر على كل مشاريع الشركة. `Project Manager` (ب) يعدّل مشروعاً واحداً فقط. `Personal settings` (أ) تؤثر على المستخدم فقط. الخيار د غير منطقي لأن أي تعديل بهذا الحجم يتطلب صلاحية.

### السؤال 5 (متوسط)
أي جملة تصف العلاقة بين `Board` و`Workflow` بشكل صحيح؟
أ) `Workflow` هو انعكاس مرئي لـ `Board`
ب) `Board` هو انعكاس مرئي لـ `Workflow` المُعرَّف مسبقاً
ج) لا علاقة بينهما إطلاقاً
د) `Workflow` يُنشأ تلقائياً بعد إنشاء `Board` فقط
**الإجابة الصحيحة: ب**
**التعليل:** النص يقول "The board structure is determined based on the defined workflow" أي أن اللوحة تُبنى بناءً على `Workflow` المُعرَّف أولاً. الخيار أ يعكس العلاقة الصحيحة. ج تجاهل للعلاقة الموصوفة صراحة. د يعكس ترتيب الإنشاء الفعلي.

### السؤال 6 (تطبيق - متوسط)
عمود `In Progress` بلوحة `Kanban` تحوّل لونه إلى **أحمر**. ماذا يعني هذا؟
أ) عدد `Issues` أقل من الحد الأدنى المسموح
ب) عدد `Issues` تجاوز الحد الأقصى المسموح (`Max`)
ج) العمود لا يحتوي أي `Issue`
د) العمود تم حذفه
**الإجابة الصحيحة: ب**
**التعليل:** حسب النص "Exceeding Maximum: The column turns red on the board" فاللون الأحمر يعني تجاوز الحد الأقصى. اللون الأصفر (أ) هو للأقل من الحد الأدنى. ج ود لا علاقة لهما بالألوان الموصوفة.

### السؤال 7 (تطبيق - صعب)
فريق يعاني من تعدّد مهام مفرط (`multitasking`) لدى أعضائه. ما الإجراء الأنسب حسب المحاضرة؟
أ) زيادة عدد الأعمدة على اللوحة
ب) ضبط `WIP Limits` لكبح تعدّد المهام
ج) حذف عمود `Backlog`
د) التحويل الفوري إلى `Scrum`
**الإجابة الصحيحة: ب**
**التعليل:** من ضمن حالات استخدام `WIP Limits` المذكورة صراحة: "Set WIP limits to curb excessive multitasking". باقي الخيارات (أ، ج، د) غير مرتبطة مباشرة بحل مشكلة تعدّد المهام حسب النص.

### السؤال 8 (سيناريو - متوسط)
`Issue` انتقل من `Backlog` مباشرة إلى `Done` دون المرور بـ `In Progress`. ما الذي يفسّر هذا في `Modeling View`؟
أ) خطأ برمجي في `JIRA`
ب) مربع `All` يسمح بالانتقال من أي حالة لأي حالة أخرى
ج) لا يمكن حدوث هذا إطلاقاً
د) هذا يعني حذف `Issue` وإعادة إنشائه
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضّح أن مربع "All" يعني أن `Issues` من أي حالة أخرى يمكن نقلها لهذه الحالة مباشرة. أ وج ود تفسيرات غير صحيحة ولا أساس لها في النص.

### السؤال 9 (مقارنة - متوسط)
ما الفرق الجوهري بين `Lead Time` و`Cycle Time`؟
أ) لا فرق، مصطلحان لنفس الشيء
ب) `Lead Time` يشمل وقت الانتظار قبل بدء العمل، `Cycle Time` لا يشمله
ج) `Cycle Time` أطول دائماً من `Lead Time`
د) `Lead Time` يُقاس بالأيام فقط، و`Cycle Time` بالساعات فقط
**الإجابة الصحيحة: ب**
**التعليل:** `Lead Time` من الإنشاء وحتى الاكتمال (يشمل الانتظار)، بينما `Cycle Time` من بدء العمل الفعلي فقط. ج عكس الحقيقة دائماً (`Lead Time` ≥ `Cycle Time`). د لا أساس له في النص.

### السؤال 10 (تطبيق - متوسط)
أي تقرير يُستخدم لعرض عدد `Issues` في كل حالة عبر الزمن؟
أ) `Board Settings`
ب) `Cumulative Flow Diagram (CFD)`
ج) `Modeling View`
د) `Column Constraints`
**الإجابة الصحيحة: ب**
**التعليل:** التعريف الحرفي لـ `CFD` هو عرض عدد `Issues` في كل `status` عبر الزمن. باقي الخيارات (أ، ج، د) أدوات/مفاهيم مختلفة لا علاقة لها بعرض البيانات عبر الزمن.

### السؤال 11 (مقارنة - صعب)
لماذا يُفضَّل نظام `Pull` على `Push` حسب المحاضرة؟
أ) لأنه أسرع في كل الحالات دون استثناء
ب) لأنه يسمح باختيار مهام تناسب الخبرة ويحافظ على وتيرة مستدامة
ج) لأنه يلغي الحاجة لوجود `Workflow` أصلاً
د) لأنه يمنع أي تأخير نهائياً
**الإجابة الصحيحة: ب**
**التعليل:** السببان المذكوران حرفياً هما اختيار المهام المناسبة للخبرة والحفاظ على وتيرة مستدامة. أ وج ود مبالغات غير مذكورة في النص.

### السؤال 12 (سيناريو - صعب)
مشروع `Kanban` يعرض `Backlog` منفصلاً عن اللوحة الرئيسية. ما العيب المحتمل لهذا القرار؟
أ) يصبح `Backlog` غير قابل للتعديل نهائياً
ب) العمل داخله قد يصبح غير مرئي لبقية أعضاء الفريق
ج) يمنع إنشاء `Issues` جديدة كلياً
د) يُلغي مفهوم `Column Constraints` تلقائياً
**الإجابة الصحيحة: ب**
**التعليل:** من عيوب فصل `Backlog` المذكورة صراحة: "Work within it is not visible to the rest of the team members". باقي الخيارات ليست عيوباً مذكورة في النص وغير منطقية.

### السؤال 13 (تطبيق - متوسط)
عند إنشاء عمود جديد واختيار الفئة (`Category`) له، كم قيمة يمكن اختيارها؟
أ) قيمة واحدة فقط من ثلاث (`To Do`, `In Progress`, `Done`)
ب) يمكن اختيار قيمتين معاً
ج) لا فئة مطلوبة إطلاقاً
د) الفئة تُحدَّد تلقائياً بلا تدخل المستخدم أبداً
**الإجابة الصحيحة: أ**
**التعليل:** النص يوضّح "Only one value from three" أي فئة واحدة فقط من الثلاث. ب يخالف "Only one value" صراحة. ج ود يتجاهلان أن الفئة إلزامية ويختارها المستخدم.

### السؤال 14 (سيناريو مركّب - صعب)
لوحظ أن عمود `Selected for Development` أصبح فارغاً باستمرار بينما `Backlog` مزدحم جداً. أي إجراء أقرب لحل هذه المشكلة حسب مبادئ `Kanban`؟
أ) تحديد حد أدنى (`Min`) لعمود `Selected for Development` لإجبار الفريق على تغذيته باستمرار
ب) حذف عمود `Backlog` كلياً
ج) تحويل المشروع لقالب `Bug Tracking`
د) إيقاف نظام `Pull` نهائياً
**الإجابة الصحيحة: أ**
**التعليل:** تحديد حد أدنى (`Min`) يجعل العمود يتحوّل للون الأصفر إذا لم تُغذَّ به مهام كافية، مما يُنبّه الفريق لسحب عمل من `Backlog` بانتظام. ب وج ود حلول غير مرتبطة بجذر المشكلة (تدفّق العمل بين عمودين متجاورين).

### السؤال 15 (نظري - متوسط)
أي وصف يطابق تعريف `Kanban` الحرفي في المحاضرة؟
أ) طريقة لإدارة دورات عمل زمنية ثابتة (`Sprints`)
ب) طريقة `Agile` لإدارة طابور مستمر من عناصر العمل
ج) أداة حصرية لتتبّع الأخطاء البرمجية فقط
د) بديل كامل لمفهوم `Board` في `JIRA`
**الإجابة الصحيحة: ب**
**التعليل:** التعريف الحرفي: "An Agile method used to manage a continuous queue of work items". أ يصف `Scrum` وليس `Kanban`. ج ود تفسيرات غير دقيقة وغير مذكورة.

### السؤال 16 (تتبع خوارزمية - متوسط)
بالترتيب الصحيح لمثال المطعم في المحاضرة، أي مرحلة تأتي مباشرة بعد `cook's queue`؟
أ) `take order`
ب) `prepare order`
ج) `delivery queue`
د) `done`
**الإجابة الصحيحة: ب**
**التعليل:** التسلسل الحرفي في الشريحة: `take order` → `cook's queue` → `prepare order` → `delivery queue` → `done`. لذلك المرحلة التالية مباشرة لـ `cook's queue` هي `prepare order`. باقي الخيارات إما سابقة أو بعيدة في التسلسل.

---
## الجزء الرابع: أسئلة تصحيح الكود
> ملاحظة: هذه المحاضرة لا تحتوي على أكواد برمجية فعلية (هي نظرية بحتة حول مفاهيم `JIRA` و`Kanban`)، لذا سنطبّق نمط "تصحيح الكود" على **أخطاء منطقية/مفاهيمية** حول `Workflow` و`WIP` باستخدام تمثيل شبه-برمجي (`pseudocode`) بدل كود حقيقي، مع الإشارة الصريحة إلى أن هذا (غير مشروحة في المحاضرة حرفياً بصيغة كود) بل استنتاج تطبيقي من مفاهيمها.

### سؤال تصحيح 1 — نوع: `misconception`
**الكود (يحتوي خطأ):**
```text
# افتراض: نقل بطاقة على اللوحة هو تغيير بصري فقط
move_card(issue, from_column="In Progress", to_column="Done")
# لا حاجة لتحديث أي حقل، فقط تغيير المكان على الشاشة
```
**اكتشف الخطأ:** الافتراض بأن نقل البطاقة لا يُحدّث أي بيانات فعلية خاطئ.

**التصحيح:**
```text
move_card(issue, from_column="In Progress", to_column="Done")
# هذا الفعل يُنفّذ transition فعلي:
issue.status = "Done"
if column("Done").resolution_set:
    issue.resolution = "Done"
```
**شرح الحل:**
1. نقل البطاقة يُعتبر `transition` حقيقي في `JIRA`.
2. يُحدَّث حقل `status` تلقائياً ليطابق العمود الجديد.
3. إذا كان العمود مضبوطاً بـ `Set resolution`، يُحدَّث حقل `Resolution` أيضاً.

### سؤال تصحيح 2 — نوع: `logic`
**الكود (يحتوي خطأ):**
```text
# منطق خاطئ لحساب Lead Time
lead_time = time(work_started) - time(issue_completed)
```
**اكتشف الخطأ:** ترتيب الطرح معكوس، و`Lead Time` يجب أن يُحسب من الإنشاء لا من بدء العمل.

**التصحيح:**
```text
lead_time = time(issue_completed) - time(issue_created)
cycle_time = time(issue_completed) - time(work_started)
```
**شرح الحل:**
1. `Lead Time` من `issue_created` (الإنشاء) وليس من `work_started`.
2. الطرح يجب أن يكون (النهاية − البداية) لا العكس.
3. `Cycle Time` هو المقياس الذي يبدأ من `work_started` فعلياً، وليس `Lead Time`.

### سؤال تصحيح 3 — نوع: `return_check`
**الكود (يحتوي خطأ):**
```text
function get_project_manager_permissions():
    return "can_create_projects_for_all_company"
```
**اكتشف الخطأ:** هذه الصلاحية تخصّ `JIRA Manager` وليس `Project Manager`.

**التصحيح:**
```text
function get_project_manager_permissions():
    return "can_modify_settings_of_specific_project_only"

function get_jira_manager_permissions():
    return "can_create_projects_affecting_all_company"
```
**شرح الحل:**
1. `Project Manager` يعدّل إعدادات مشروع واحد فقط.
2. `JIRA Manager` هو من يملك صلاحية التأثير على كل مشاريع الشركة.
3. الخلط بين المستويين خطأ شائع يجب التحقق منه دائماً بفحص القيمة المرجعة (نوع الصلاحية) قبل اعتمادها.

### سؤال تصحيح 4 — نوع: `dead_code`
**الكود (يحتوي خطأ):**
```text
function apply_wip_limit(column):
    if column.name == "Backlog":
        set_min(column, 100)
        set_max(column, 100)
    # الكود التالي لن يُنفَّذ أبداً بسبب الشرط أعلاه الذي يغطي كل الحالات خطأً
    if column.name == "In Progress":
        set_max(column, 3)
```
**اكتشف الخطأ:** ليس خطأ برمجي تنفيذي هنا فعلياً، لكنه خطأ مفاهيمي: وضع `WIP Limit` كبير جداً على `Backlog` (100) يخالف فلسفة `Kanban` بأن `WIP Limits` تُطبَّق عادة على أعمدة العمل الفعلي وليس بالضرورة `Backlog`، وقد يجعل الشرط الثاني عديم الفائدة عملياً إذا لم يُفعَّل بسبب تصميم خاطئ للتحقق (مسار ميت منطقياً في سياق ضبط الحدود التدريجي).

**التصحيح:**
```text
function apply_wip_limit(column):
    if column.name == "In Progress":
        set_max(column, 3)   # يطبَّق أولاً بعد رصد اختناق فعلي
    # لا نضع حدوداً افتراضية كبيرة وغير مبرَّرة على Backlog من البداية
```
**شرح الحل:**
1. يجب البدء بلا حدود، ثم إضافتها فقط عند رصد اختناق فعلي (كما ورد حرفياً في المحاضرة).
2. وضع حدود عشوائية كبيرة على أعمدة غير مقصودة يجعل منطق الحدود عديم الأثر (شبيه بـ `dead code`).
3. التركيز يجب أن يكون على أعمدة العمل الفعلي (`In Progress`) وليس `Backlog` بالضرورة.

### سؤال تصحيح 5 — نوع: `misconception`
**الكود (يحتوي خطأ):**
```text
# افتراض خاطئ: Kanban هو نفسه Agile
if methodology == "Kanban":
    is_agile_mindset = False  # خطأ: يُعامَل Kanban كأنه مضاد لـ Agile
```
**اكتشف الخطأ:** `Kanban` هو أحد أطر تطبيق `Agile`، وليس بديلاً مضاداً له أو مرادفاً حصرياً له.

**التصحيح:**
```text
if methodology == "Kanban":
    is_agile_framework = True   # Kanban إطار عمل يطبق فلسفة Agile
    is_agile_mindset_itself = False  # لكنه ليس Agile نفسه (Agile عقلية عامة)
```
**شرح الحل:**
1. `Agile` عقلية عامة (`mindset`) وليست منهجية عملية مباشرة.
2. `Kanban`، `Scrum`، `XP` أطر عمل (`frameworks`) تُطبّق هذه العقلية بشكل عملي مختلف.
3. الخلط بين "العقلية" و"إطار التطبيق" خطأ مفاهيمي شائع يجب تجنّبه.

---
## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)
> هذه تمارين إضافية من إعداد الدليل للتدريب — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): تصميم `Workflow` بسيط — نوع `scenario`
**السيناريو / المطلوب:**
فريق دعم فني (`Support`) يريد تصميم `Workflow` بسيط لمعالجة تذاكر العملاء.

**المطلوب:**
1. اقترح 4 أعمدة مناسبة لهذا `Workflow`.
2. حدّد فئة (`Category`) كل عمود من الثلاث (`To Do`/`In Progress`/`Done`).
3. حدّد أي عمود يجب أن يُفعَّل عليه `Set resolution`.

**نموذج الحل:**
1. الأعمدة: `New Ticket` → `Investigating` → `Waiting on Customer` → `Resolved`.
2. الفئات: `New Ticket`=`To Do`, `Investigating`=`In Progress`, `Waiting on Customer`=`In Progress`, `Resolved`=`Done`.
3. `Set resolution` يُفعَّل فقط على عمود `Resolved`.

### تمرين 2 (تمرين إضافي): حساب `Lead Time` و`Cycle Time` — نوع `numerical_solve`
**السيناريو / المطلوب:**
`Issue` أُنشئ يوم 1، بدأ العمل عليه فعلياً يوم 4، واكتمل يوم 9.

**المطلوب:**
1. احسب `Lead Time`.
2. احسب `Cycle Time`.
3. فسّر الفرق بينهما بجملة واحدة.

**نموذج الحل:**
1. `Lead Time` = يوم 9 − يوم 1 = **8 أيام**.
2. `Cycle Time` = يوم 9 − يوم 4 = **5 أيام**.
3. الفرق (3 أيام) هو وقت الانتظار في `Backlog` قبل بدء العمل الفعلي.

### تمرين 3 (تمرين إضافي): تحديد نوع الصلاحية — نوع `fill_gaps`
**السيناريو / المطلوب:**
أكمل الفراغات بالمستوى الإداري الصحيح.

**المطلوب:**
1. من يستطيع إضافة مستخدم جديد للموقع؟ _______
2. من يستطيع تعديل إعداد يؤثر على كل مشاريع الشركة؟ _______
3. من يستطيع تعديل إعدادات مشروع واحد فقط؟ _______

**نموذج الحل:**
1. `Site Manager`
2. `JIRA Manager`
3. `Project Manager`

### تمرين 4 (تمرين إضافي): ضبط `WIP Limits` — نوع `scenario`
**السيناريو / المطلوب:**
لوحة `Kanban` تحتوي أعمدة: `Backlog`, `Selected for Development`, `In Progress`, `Done`. لاحظتَ أن `In Progress` يتراكم فيه العمل باستمرار.

**المطلوب:**
1. ما الإجراء الأول المقترح؟
2. أين يُضبَط هذا الإجراء في `JIRA`؟
3. ما اللون الذي سيظهر إذا تجاوز العمود الحد الأقصى لاحقاً؟

**نموذج الحل:**
1. تحديد حد أقصى (`Max`) لعمود `In Progress`.
2. من `Board Settings → Columns`.
3. اللون الأحمر.

### تمرين 5 (تمرين إضافي): تصحيح مفهوم — نوع `code_fix`
**السيناريو / المطلوب:**
زميل قال: "`Board` و`Workflow` هما نفس الشيء تماماً، لا فرق بينهما."

**المطلوب:**
1. صحّح هذا الفهم بجملة دقيقة.
2. اذكر أي عنصر هو "السبب" وأيّهما "النتيجة" في العلاقة بينهما.

**نموذج الحل:**
1. `Workflow` هو مجموعة الحالات المنطقية، بينما `Board` هو التمثيل المرئي الذي يُبنى بناءً عليه — فهما مرتبطان لكن غير متطابقين.
2. `Workflow` هو السبب/الأساس، و`Board` هو النتيجة/العرض المبني عليه.

---
## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)
> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: مطعم توصيل طعام — نوع `case_study`
**السيناريو:**
مطعم توصيل يستخدم `JIRA Kanban` لإدارة الطلبات: `take order` → `cook's queue` → `prepare order` → `delivery queue` → `done`. لاحظ المدير أن `cook's queue` يتراكم فيه العمل كل يوم جمعة.

**المطلوب:**
1. ما نوع الإجراء الأنسب في `Board Settings` لهذه المشكلة يوم الجمعة تحديداً؟
2. هل الحل الأنسب هو `Push` أم `Pull` من `take order` إلى `cook's queue`؟ علّل.

**نموذج الحل:**
1. ضبط حد أقصى (`Max` WIP Limit) على عمود `cook's queue` ليجبر `take order` على عدم إغراقه أكثر من طاقته.
2. `Pull`: لأن الطباخ (المرحلة التالية) يجب أن يسحب الطلب فقط عندما يكون جاهزاً فعلياً، بدل أن يُدفَع له كل الطلبات دفعة واحدة يوم الذروة.

### تمرين 2: مقارنة مؤسسية بين فريقين — نوع `table_fill`
**السيناريو:**
فريق A يستخدم `Scrum`، وفريق B يستخدم `Kanban`، لكلا الفريقين نفس عدد الأعضاء.

**المطلوب:**
أكمل الجدول التالي بمقارنة الفريقين حسب مفاهيم المحاضرة:

| المعيار | فريق A (`Scrum`) | فريق B (`Kanban`) |
| --- | --- | --- |
| طبيعة العمل | ؟ | ؟ |
| إعادة هيكلة الفريق مطلوبة؟ | ؟ | ؟ |

**نموذج الحل:**
| المعيار | فريق A (`Scrum`) | فريق B (`Kanban`) |
| --- | --- | --- |
| طبيعة العمل | دورات زمنية مغلقة (`Sprints`) | تدفّق مستمر (`continuous queue`) |
| إعادة هيكلة الفريق مطلوبة؟ | غالباً نعم (أدوار جديدة) | لا، يُستخدم الفريق الحالي بأدواره |

### تمرين 3: مخطط `Modeling View` ناقص — نوع `diagram_completion`
**السيناريو:**
لديك مخطط `Workflow` بأربع حالات لكن أُزيل منه مربع "All" وأحد الأسهم.

**المطلوب:**
1. صف ماذا يمثّل مربع "All" الناقص.
2. صف ماذا يمثّل السهم الناقص إن كان بين حالتين مباشرتين.

**نموذج الحل:**
1. "All" يعني أن `Issues` من أي حالة أخرى يمكن نقلها مباشرة لهذه الحالة تحديداً.
2. السهم يمثّل `transition` (انتقال) مسموح بين حالتين محددتين.

### تمرين 4: تحليل مكتوب حول الشفافية — نوع `written_analysis`
**السيناريو:**
مدير مشروع يشتكي من "مفاجآت" متكررة عند مواعيد التسليم رغم استخدام `JIRA`.

**المطلوب:**
اكتب فقرة قصيرة (3-4 جمل) تحلّل السبب المحتمل بالربط مع مفهوم الشفافية (`Transparency`) الوارد في المحاضرة.

**نموذج الحل:**
"المفاجآت المتكررة عند التسليم تشير غالباً لغياب الشفافية الحقيقية رغم استخدام الأداة — أي أن اللوحة لا تعكس الحالة الواقعية للعمل (Work is only done on tasks present on the board لم تُطبَّق فعلياً)، أو أن الفريق ينفّذ عملاً خارج اللوحة. الحل يبدأ بضمان أن كل عمل فعلي مسجَّل كـ Issue على اللوحة، بحيث يرى الجميع (الفريق وأصحاب المصلحة) الحالة الحقيقية لحظة بلحظة دون انتظار موعد التسليم لاكتشاف المشاكل."

---
## الجزء الرابع: تمارين تتبع التنفيذ
> ≥3 تمارين تتبع — كل تمرين: مدخل + جدول ناقص للطالب + نموذج الحل.

### تمرين تتبع 1: مسار `Issue` عبر `Workflow` مع مربع All
**المدخل:**
```text
Issue "PROJ-9" ينشأ في Backlog، ثم ينتقل عبر transitions مختلفة حتى يصل Done
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | إنشاء Issue | ؟ |
| 2 | transition عادي | ؟ |
| 3 | transition عبر All (تخطي In Progress) | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | إنشاء Issue | Backlog |
| 2 | transition عادي | Selected for Development |
| 3 | transition عبر All (تخطي In Progress) | Done |

**النتيجة:** `PROJ-9` وصل إلى `Done` متخطياً `In Progress` بفضل مربع `All`.

### تمرين تتبع 2: قياس `WIP` عبر الأعمدة
**المدخل:**
```text
عمود In Progress: Max=3
اليوم 1: 2 issues | اليوم 2: 3 issues | اليوم 3: 4 issues
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| اليوم | عدد Issues | لون العمود |
| --- | --- | --- |
| 1 | 2 | ؟ |
| 2 | 3 | ؟ |
| 3 | 4 | ؟ |

**نموذج الحل:**
| اليوم | عدد Issues | لون العمود |
| --- | --- | --- |
| 1 | 2 | عادي (ضمن الحد) |
| 2 | 3 | عادي (يساوي الحد الأقصى بالضبط) |
| 3 | 4 | أحمر (تجاوز Max=3) |

**النتيجة:** في اليوم 3، تجاوز عدد `Issues` الحد الأقصى المسموح، فتحوّل العمود إلى اللون الأحمر.

### تمرين تتبع 3: حساب `Lead Time` عبر عدة `Issues`
**المدخل:**
```text
Issue A: أُنشئ يوم 1، اكتمل يوم 6
Issue B: أُنشئ يوم 3، اكتمل يوم 5
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| Issue | يوم الإنشاء | يوم الاكتمال | Lead Time |
| --- | --- | --- | --- |
| A | 1 | 6 | ؟ |
| B | 3 | 5 | ؟ |

**نموذج الحل:**
| Issue | يوم الإنشاء | يوم الاكتمال | Lead Time |
| --- | --- | --- | --- |
| A | 1 | 6 | 5 أيام |
| B | 3 | 5 | يومان |

**النتيجة:** `Issue A` استغرق وقتاً أطول (5 أيام) رغم عدم معرفة `Cycle Time` الفعلي لكليهما، مما قد يستدعي فحص وقت انتظاره في `Backlog`.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** بناءً على تمرين التتبع 3، ما المعلومة الإضافية التي نحتاجها لحساب `Cycle Time` لكل `Issue`؟
> **لماذا هذا مهم؟** لأننا نحتاج تحديداً "يوم بدء العمل الفعلي" على كل `Issue`، وهو غير موجود في هذا الجدول، وهذا يفرّق بين `Lead Time` (متوفر) و`Cycle Time` (يحتاج بيانات إضافية).

---
## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الفرق بين `Project` و`Issue` في `JIRA`؟
A: `Project` مجموعة من `Issues`، و`Issue` هو عنصر عمل واحد (Work Item) داخل هذا المشروع.

**Q2:** ما القوالب الثلاثة الجاهزة عند إنشاء مشروع في `JIRA`؟
A: `Scrum`, `Kanban`, `Bug Tracking`.

**Q3:** ما صيغة `issue_key`؟
A: `<project_key>-<issue_number>`.

**Q4:** من يملك صلاحية إضافة مستخدمين جدد للموقع؟
A: `Site Manager`.

**Q5:** ما الفرق بين `JIRA Manager` و`Project Manager`؟
A: `JIRA Manager` يؤثر على كل مشاريع الشركة، و`Project Manager` يعدّل مشروعاً واحداً فقط.

**Q6:** ما أعمدة لوحة `Kanban` الافتراضية؟
A: `Backlog`, `Selected for Development`, `In Progress`, `Done`.

**Q7:** ماذا يُسمّى تغيير حالة `Issue` عند نقله بين الأعمدة؟
A: `Transition`.

**Q8:** ما الفئات الثلاث الممكنة لأي عمود جديد؟
A: `To Do`, `In Progress`, `Done`.

**Q9:** ما تعريف `Kanban` حسب المحاضرة؟
A: طريقة `Agile` لإدارة طابور مستمر من عناصر العمل (`continuous queue of work items`).

**Q10:** ما الفرق بين نظام `Pull` و`Push`؟
A: `Push` يدفع العمل للمرحلة التالية فور الانتهاء، بينما `Pull` تسحب المرحلة التالية العمل عند جاهزيتها فقط.

**Q11:** ماذا يُسمّى في `JIRA` تحديد حد أدنى/أقصى لعدد `Issues` في عمود؟
A: `Column Constraints` (تُعرف مفاهيمياً بـ `WIP Limits`).

**Q12:** ما الفرق بين `Lead Time` و`Cycle Time`؟
A: `Lead Time` من الإنشاء حتى الاكتمال، و`Cycle Time` من بدء العمل الفعلي حتى الاكتمال فقط.

**Q13:** ما التقرير الأكثر شيوعاً لمشاريع `Kanban` الذي يعرض عدد `Issues` بكل حالة عبر الزمن؟
A: `Cumulative Flow Diagram (CFD)`.

**Q14:** ما ميزة فصل عمود `Backlog` عن لوحة `Kanban` الرئيسية؟
A: يجعل الفريق يركّز فقط على `Issues` الجاهزة فعلياً للعمل عليها.

---
## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)
> **ملاحظة صريحة:** هذه المحاضرة (JIRA Fundamentals) نظرية بالكامل ولا تتضمن أي ملفات كود، تهيئات (`Dockerfile`/`.gitlab-ci.yml`)، أو أوامر طرفية فعلية وردت في محتواها الأصلي. لذلك **لا يوجد قسم "كود كامل مجمّع"** لهذه المحاضرة تحديداً — هذا (غير مشروحة في المحاضرة) لأنها خارج نطاقها. الأمثلة شبه-البرمجية (`pseudocode`) في أقسام "أسئلة تصحيح الكود" أعلاه هي أدوات تعليمية توضيحية فقط وليست كوداً وارداً في المحاضرة.

---
## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: عرّف `JIRA` واذكر طبيعته المرنة.
**نموذج الإجابة:**
1. التعريف: أداة لإدارة المشاريع والتواصل حولها، مبنية على مفهوم `Agile`.
2. المكونات/الشروط: يعمل مع مشاريع فردية أو جماعية، بسيطة أو معقّدة.
3. مثال: يمكن ضبطه للعمل بـ `Agile` أو حتى `Waterfall`.
4. متى نستخدم: عند الحاجة لأداة موحّدة لإدارة وتتبّع العمل الجماعي.

### سؤال 2: اشرح الهيكلية الهرمية في `JIRA`.
**نموذج الإجابة:**
1. التعريف: ثلاث مستويات: `Jira` (تطبيق) → `Project` (مشروع) → `Issue` (مهمة).
2. المكونات/الشروط: كل مستوى يحتوي المستوى الذي يليه.
3. مثال: `Jira` يحتوي مشروع `HR`، ويحتوي `HR` على `Issue` باسم `HR-1`.
4. متى نستخدم: عند تصميم أي مشروع جديد لفهم أين تُصنَّف كل معلومة.

### سؤال 3: ما الفرق بين `Board` و`Workflow`؟
**نموذج الإجابة:**
1. التعريف: `Workflow` مجموعة حالات منطقية، `Board` تمثيل مرئي لها.
2. المكونات/الشروط: `Board` يُبنى بناءً على `Workflow` المُعرَّف مسبقاً.
3. مثال: أعمدة `Backlog/In Progress/Done` هي `Board` مبني على `Workflow` بنفس الحالات.
4. متى نستخدم: عند تصميم أي عملية عمل جديدة داخل مشروع.

### سؤال 4: اشرح مفهوم `WIP Limits` وأهدافه.
**نموذج الإجابة:**
1. التعريف: حد أدنى/أقصى لعدد `Issues` المسموح بها في عمود معيّن.
2. المكونات/الشروط: يُضبَط عبر `Board Settings → Columns`، يظهر بألوان (أصفر/أحمر).
3. مثال: `Max=3` على `In Progress` يمنع تراكم أكثر من 3 مهام بالتزامن.
4. متى نستخدم: عند ظهور اختناقات أو تعدّد مهام مفرط لدى الفريق.

### سؤال 5: قارن بين نظام `Pull` و`Push`.
**نموذج الإجابة:**
1. التعريف: `Push` يدفع العمل قسراً، `Pull` تسحبه المرحلة التالية عند الجاهزية.
2. المكونات/الشروط: `Pull` يحتاج طوابير/`buffers` وسيطة بين المراحل.
3. مثال: طابور `cook's queue` في مثال المطعم.
4. متى نستخدم: `Pull` يُفضَّل عند اختلاف سرعة المراحل لتفادي إغراق مرحلة غير جاهزة.

### سؤال 6: ما الفرق بين `Lead Time` و`Cycle Time`؟
**نموذج الإجابة:**
1. التعريف: `Lead Time` من الإنشاء للاكتمال، `Cycle Time` من بدء العمل الفعلي للاكتمال.
2. المكونات/الشروط: `Lead Time` ≥ `Cycle Time` دائماً.
3. مثال: `Issue` أُنشئ يوم 1، بدأ العمل يوم 4، اكتمل يوم 9 → `Lead Time`=8، `Cycle Time`=5.
4. متى نستخدم: `Lead Time` لقياس تجربة العميل، `Cycle Time` لقياس كفاءة التنفيذ.

### سؤال 7: لماذا يُعتبر `Kanban` "خفيفاً" مقارنة بـ `Scrum`؟
**نموذج الإجابة:**
1. التعريف: `Kanban` بسيط، مرن، وسهل البدء به فوراً دون أدوار جديدة إلزامية.
2. المكونات/الشروط: لا يتطلب إعادة هيكلة الفريق، ويستخدم الأعضاء بأدوارهم الحالية.
3. مثال: فريق دعم فني يمكنه تبنّي `Kanban` دون تعيين `Scrum Master` مثلاً.
4. متى نستخدم: عند الحاجة لتحوّل تدريجي (`evolutionary`) نحو `Agile` بدل تحوّل جذري.

### سؤال 8: ما الغرض من تقارير `Agile` مثل `CFD`؟
**نموذج الإجابة:**
1. التعريف: تصوير عمل الفريق بصرياً وتحسين الشفافية والتخطيط.
2. المكونات/الشروط: تُحدَّث تلقائياً، وتعرض عدد `Issues` بكل حالة عبر الزمن.
3. مثال: اتساع شريط `In Progress` باستمرار يكشف اختناقاً في هذه المرحلة.
4. متى نستخدم: عند الحاجة لاكتشاف اختناقات العملية أو دعم قرارات التخطيط والتقدير.

### سؤال 9: اشرح مربع "All" في `Modeling View`.
**نموذج الإجابة:**
1. التعريف: يعني أن `Issues` من أي حالة أخرى يمكن نقلها مباشرة لهذه الحالة.
2. المكونات/الشروط: يمنح مرونة لتخطي حالات وسيطة غير ضرورية.
3. مثال: نقل `Issue` من `Backlog` مباشرة إلى `Done` إذا اكتُشِف أنه غير مطلوب.
4. متى نستخدم: عند تصميم `Workflow` يحتاج مسارات استثنائية مرنة.

---
## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅
- [ ] أستطيع شرح الهيكلية الهرمية `Jira`/`Project`/`Issue` وصيغة `issue_key`
- [ ] أميّز بين المستويات الإدارية الثلاثة (`Site`/`JIRA`/`Project Manager`)
- [ ] أفهم العلاقة بين `Board` و`Workflow` وأيّهما "الأساس"
- [ ] أعرف الأعمدة الافتراضية للوحة `Kanban` وترتيبها
- [ ] أفهم معنى `transition` ومربع "All" في `Modeling View`
- [ ] أميّز الفئات الثلاث لأي عمود (`To Do`/`In Progress`/`Done`) وخيار `Set resolution`
- [ ] أفرّق بين `Agile` كعقلية و`Kanban` كإطار عمل
- [ ] أفهم مفهوم `WIP Limits` وكيف تُضبَط تدريجياً وليس عشوائياً
- [ ] أميّز نظام `Pull` عن `Push` وسبب تفضيل `Pull`
- [ ] أفرّق بين `Lead Time` و`Cycle Time` وأستطيع حسابهما رقمياً
- [ ] أفهم الغرض من `CFD` وكيف يكشف الاختناقات

---
## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| هذه المحاضرة (`JIRA Fundamentals`) | محاضرات `Agile`/`Scrum` السابقة أو اللاحقة | `Kanban` أحد أطر `Agile`، بينما `Scrum` إطار آخر بنفس الفلسفة |
| هذه المحاضرة | محاضرات `CPM`/`Gantt` (تقدير الوقت) | كلاهما يخدم "تتبّع التنفيذ"، لكن بأدوات مختلفة (لوحات مقابل مخططات زمنية) |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| الهيكلية | `Jira` ← `Project` ← `Issue`، والمعرّف = `project_key-issue_number` |
| الصلاحيات | `Site Manager` ⊇ `JIRA Manager` > `Project Manager` |
| `Board` مقابل `Workflow` | `Workflow` هو الأساس المنطقي، `Board` هو العرض المبني عليه |
| `Kanban` | تدفّق مستمر، `WIP Limits`، نظام `Pull` |
| القياس | `Lead Time` ≥ `Cycle Time` دائماً؛ `CFD` يكشف الاختناقات |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `Transition` | تغيير حالة `Issue` | نقل البطاقة بين الأعمدة |
| `Column Constraints` | حدود `WIP` في `JIRA` | `Board Settings → Columns` |
| `Resolution=Set` | اعتبار `Issue` محلولاً | عادة عمود `Done` |
| `CFD` | مخطط تدفّق تراكمي | تقارير `Kanban` |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | `Board` = عرض مرئي مبني على `Workflow`، وليسا نفس الشيء |
| 2 | ابدأ بدون `WIP Limits`، وأضفها فقط عند رصد اختناق فعلي |
| 3 | `Lead Time` يشمل الانتظار، `Cycle Time` لا يشمله |
| 4 | `Pull` يُفضَّل على `Push` لاحترام جاهزية كل مرحلة |
| 5 | `Kanban` إطار عمل يطبّق `Agile`، وليس مرادفاً له |

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, full_code_reference, theory, checklist, cheat_sheet
mcq_count: 16
code_blocks: 10
-->

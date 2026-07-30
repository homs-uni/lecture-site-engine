# المحاضرة 1 — Introduction to Project Management (مقدمة في إدارة المشاريع)
> **المادة:** إدارة المشاريع (القسم النظري والعملي) | **الموضوع:** تعريف المشروع، مكوناته، إدارة المشاريع، دورة حياة المشروع، ومدير المشروع

> **تحليل نوع المحاضرة:** هذه محاضرة **نظرية تأسيسية (Project Management Basics)** بلا أكواد برمجية فعلية، لذلك القالب المطبّق هنا يعتمد على: `Goal`, `Resources`, `Stakeholders`, `Clients`, `Iron Triangle`. أي بلوكات كود ستكون توضيحية (pseudocode) وسنشير إليها بوسم (شرح زيادة للفهم) لأنها **غير واردة حرفياً في المحاضرة**.

---
## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. تعريف المشروع (Project)

#### 📍 أين نحن الآن؟
هذه أول نقطة في أول محاضرة — قبل أي شيء آخر في المادة، لازم نتفق على تعريف دقيق لكلمة `Project` نفسها، لأن كل المفاهيم اللاحقة (الموارد، أصحاب المصلحة، دورة الحياة...) مبنية على هذا التعريف.

#### ⬅️ الربط مع السابق
لا يوجد موضوع سابق — هذه نقطة البداية المطلقة في المادة.

#### 💡 الفكرة الأساسية
**`Project` هو مسعى `مؤقت` (temporary) — له بداية ونهاية محددتين — لإنتاج منتج أو خدمة أو نتيجة مميزة (distinct)، وهذا يفرّقه جوهرياً عن أي نشاط تشغيلي مستمر بلا نهاية.**

#### 📖 الشرح
تخيّل أنك تخطط لحفل زفاف. هذا "الحفل" هو `project` — له بداية ونهاية محددتين (وليس نشاطاً مستمراً إلى الأبد)، وله هدف واضح: إنجاح الحفل في يوم معيّن. أي عمل يستمر بلا نهاية محددة (مثل تشغيل خط إنتاج مصنع يومياً) **ليس** مشروعاً، بل عملية تشغيلية (`operation`).

كلمة `temporary` هي الفارق الجوهري بين `project` و`operation`. لكن الجزء الثاني من التعريف لا يقل أهمية: المشروع يجب أن يملك `target` (هدفاً) واضحاً منذ البداية. لماذا؟ لأن بدون تاريخ نهاية *وهدف محدد* معاً، لا يمكن أبداً قياس نجاح المشروع أو فشله بشكل موضوعي — وهذا بالضبط ما يجعل `target` **أهم عنصر منفرد** في أي مشروع، كما تنص المحاضرة صراحة.

💡 **التشبيه:** بناء منزل هو `project` (له تاريخ تسليم ومواصفات محددة)، أما تنظيف المنزل أسبوعياً فهو `operation` متكررة بلا هدف نهائي واحد.
**وجه الشبه:** تاريخ التسليم في بناء المنزل = `temporary` في تعريف المشروع.

#### 🎯 الملخص السريع
- `Project` = مسعى `temporary` (له بداية ونهاية) + هدف واضح (`distinct product/service/result`)
- عكسه هو `Operation`: نشاط مستمر بلا نهاية محددة
- `target` هو أهم عنصر في التعريف لأنه معيار قياس النجاح/الفشل

#### 📚 التطبيق
بما أن `target` هو أهم عنصر، الفقرة القادمة (1.1) تشرح كيف يختلف **نوع** هذا الهدف حسب طبيعة المشروع، وكيف يغيّر ذلك طريقة إدارته بالكامل.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A project is defined as a temporary endeavor to create a distinct product, service or result. المشروع يجب أن يملك هدفاً واضحاً (target)، وهذا الهدف هو أهم جزء لأنه يحدد كيفية قياس نجاح أو فشل المشروع.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف `temporary`، تعريف `distinct product/service/result`، وأهمية `target` كمعيار قياس النجاح.
- ℹ️ إضافة من الدليل: تشبيه حفل الزفاف وتشبيه بناء المنزل (ليست في المحاضرة الأصلية).

</details>

### 1.1. تأثير نوع الهدف على الإدارة

#### 📍 أين نحن الآن؟
بعد ما عرفنا أن `target` هو أهم عنصر في المشروع، السؤال الطبيعي التالي: هل كل الأهداف تُدار بنفس الطريقة؟ الجواب لا — ونوع الهدف نفسه هو ما يحدد أسلوب الإدارة.

#### ⬅️ الربط مع السابق
امتداد مباشر لقسم 1: بما أن `target` هو أهم جزء في تعريف المشروع، هذا القسم يوضّح أن **نوع** هذا الهدف يغيّر طريقة إدارة المشروع بالكامل.

#### 💡 الفكرة الأساسية
**نوع هدف المشروع (`the type of the project target`) هو الذي يحدد كيف يجب أن نديره — فمعيار "النجاح" ليس رقماً ثابتاً، بل يعتمد على طبيعة المشروع نفسه.**

#### 📖 الشرح
المحاضرة تعطي مثالين متقابلين تماماً لتوضيح هذه الفكرة. الحالة الأولى: إذا كان هدف المشروع **منتجاً** (`product`)، فمعيار النجاح واضح ومباشر — يجب أن يطابق المنتج **مواصفات العميل** (`client's specs`) بدقة. مثال: شركة تصنّع هواتف تقيس نجاحها بعدد الأجهزة المطابقة للمواصفات المتفق عليها والمباعة فعلياً.

الحالة الثانية مختلفة جذرياً: في **القطاع الإنساني** (`humanitarian sector`)، لا يوجد "منتج" يُقاس بالمواصفات، بل يُقاس الهدف **بعدد الأشخاص أو العائلات** الذين تمت مساعدتهم فعلياً. المحاضرة تعطي مثالين محددين على هذا:
- **خدمة قانونية** تساعد الناس في إنجاز أوراق الزواج والطلاق (`marriage and divorce papers`) — النجاح هنا يُقاس بعدد الحالات المُنجَزة، لا بالربح.
- **مساعدة `IDPs`** (النازحين داخلياً — `Internally Displaced Persons`)، حيث يُقاس النجاح **بعدد العائلات** التي وصلتها المساعدة تحديداً، وليس بأي مقياس مالي.

فمنظمة إغاثة تقيس نجاحها بعدد العائلات التي وصلتها المساعدة — وليس بالربح المادي أبداً، بعكس الشركة المصنّعة التي مرجعها الوحيد هو مطابقة مواصفات العميل.

**لماذا هذا مهم؟** لأن `success metric` (مقياس النجاح) يجب أن يعكس **الغرض الحقيقي** من المشروع، لا رقماً موحّداً يُطبَّق على كل المنظمات بنفس الطريقة. مدير مشروع يحاول قياس نجاح خدمة قانونية إنسانية بمعيار "الربح" أو "عدد الوحدات المباعة" يرتكب خطأ إدارياً جوهرياً منذ البداية.

**ملاحظة (شرح المحاضرة نفسه):** كلمة `organization` في هذه المادة تشمل أي جهة عامة أو خاصة أو `NGO` أو حكومية تستفيد من المشروع أو تنفذه.

#### 🎯 الملخص السريع
- هدف = منتج (`product`) ← النجاح يُقاس بمطابقة مواصفات العميل
- هدف = إنساني (`humanitarian`) ← النجاح يُقاس بعدد الأشخاص/العائلات المستفيدة (مثال: خدمة أوراق الزواج/الطلاق، مساعدة `IDPs`)
- لا يوجد معيار نجاح واحد يناسب كل المشاريع — `organization` هنا تشمل أي جهة عامة/خاصة/NGO/حكومية

#### 📚 التطبيق
هذا المبدأ (اختلاف معيار النجاح حسب نوع الهدف) سيظهر مرة أخرى في قسم 5 (نتائج المشروع: `Tangible` مقابل `Intangible`) وقسم 3 (`Stakeholders` مقابل `Clients`) — فكرة أن أطرافاً مختلفة تقيس النجاح بمقاييس مختلفة هي خيط يمتد عبر المحاضرة كاملة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> The type of the project target defines how we need to manage the project. إذا كان الهدف منتجاً يجب أن يطابق مواصفات العميل. أما في القطاع الإنساني، فالهدف يُقاس بعدد الأشخاص أو العائلات التي تمت مساعدتها، مثل خدمة قانونية لمساعدة الناس في أوراق الزواج والطلاق، أو مساعدة `IDPs` (النازحين داخلياً) وتُقاس بعدد العائلات.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: حالة المنتج (مطابقة مواصفات العميل)، وحالة القطاع الإنساني بمثاليها الاثنين (الخدمة القانونية، ومساعدة `IDPs`)، وتعريف `organization` كما ورد بالمحاضرة.
- ℹ️ إضافة من الدليل: ربط هذا المبدأ بالأقسام اللاحقة (5 و3) في "📚 التطبيق" (ليس في المحاضرة الأصلية).

</details>

---

### 2. مكونات المشروع (Components of Project)

#### 📍 أين نحن الآن؟
بعد ما عرفنا `Project` وفهمنا أن `target` هو أهم عنصر فيه، ننتقل الآن لرؤية الصورة الكاملة: من ماذا يتكوّن أي مشروع بالضبط؟

#### ⬅️ الربط مع السابق
هذا القسم يبني مباشرة على قسم 1 و1.1: `Target` كان أول ما شرحناه، وهو الآن أول عنصر من أربعة عناصر متكاملة.

#### 💡 الفكرة الأساسية
**أي مشروع يتكوّن من أربعة مكونات لا غنى عنها: `Target/Goal`، `Resources`، `Stakeholders`، و`Clients/Customers`.**

#### 📖 الشرح
أي مشروع = **هدف** (`Target`) تسعى لتحقيقه + **موارد** (`Resources`) تستخدمها للوصول له + **أطراف مهتمة** بنتيجته (`Stakeholders`) + **من سيستفيد فعلياً من المنتج** (`Clients/Customers`). هذه أربعة أبعاد لا غنى عنها: بدون هدف لا تعرف إلى أين تذهب، وبدون موارد لا تستطيع التحرك، وبدون معرفة من يهتم بالنتيجة (`stakeholders`) ومن سيستخدمها (`clients`) لن تدير التوقعات بشكل صحيح.

#### 🎯 الملخص السريع
- المكونات الأربعة: `Target (Goal)`, `Resources`, `Stakeholders`, `Clients/Customers`
- كل عنصر يجيب على سؤال مختلف: ماذا نريد؟ بماذا ننجزه؟ من يهتم؟ من يستفيد؟

#### 📚 التطبيق
الأقسام القادمة (2.1، 2.2، 3، 4) تشرح كل عنصر من هذه الأربعة على حدة بالتفصيل، بدءاً بالهدف.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A Project has multiple components: 1. Target (Goal) 2. Resources 3. Stakeholders 4. Clients/Customers

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المكونات الأربعة كما وردت بالترتيب.

</details>

### 2.1. الهدف (Target/Goal)

#### 📍 أين نحن الآن؟
أول عنصر من المكونات الأربعة — نعمّق فهمنا لـ`Target` بعد أن عرفنا أنه أهم عنصر في المشروع.

#### ⬅️ الربط مع السابق
امتداد مباشر لقسم 1 و2: هنا نوضّح **أشكال** الهدف الممكنة تحديداً.

#### 💡 الفكرة الأساسية
**الهدف ليس بالضرورة "منتجاً مادياً" — يمكن أن يكون منتجاً كاملاً أو جزئياً، خدمة، رسالة بحثية، أو مزيجاً من هذه الأشكال.**

#### 📖 الشرح
حسب المحاضرة، يمكن أن يكون `target` أحد أربعة أشكال: `1)` منتج فريد كامل أو جزئي (`a unique full or partial product`)، `2)` خدمة فريدة (`a unique service`)، `3)` رسالة ماجستير أو دكتوراه أو براءة اختراع (`a master's/PhD thesis or patent`)، أو `4)` مزيج من هذه الأشكال (`mix of the above`). الهدف ليس بالضرورة "شيئاً مادياً" — فرسالة الماجستير أو براءة الاختراع هي أهداف مشروع بحثي بحد ذاتها، تماماً كما أن مشروعاً بحثياً بمخرجات متعددة (منتج جزئي + ورقة بحثية مثلاً) هو مزيج من هذه الأشكال.

💡 **التشبيه:** الهدف مثل وجهة الرحلة في `GPS` — قد تكون مدينة كاملة (منتج كامل) أو مجرد محطة وسيطة (منتج جزئي).
**وجه الشبه:** الوجهة النهائية في `GPS` = `Target` في المشروع.

#### 🎯 الملخص السريع
- أشكال الهدف الأربعة: منتج كامل/جزئي، خدمة، رسالة بحثية/براءة اختراع، أو مزيج منها
- الهدف لا يشترط أن يكون منتجاً مادياً ملموساً

#### 📚 التطبيق
بعد فهم "ماذا" يمكن أن يكون الهدف، القسم القادم (2.2) يشرح "بماذا" ننجز هذا الهدف — أي الموارد.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> The target can be: 1. A unique full or partial product 2. A unique service 3. A master's/PhD thesis or patent 4. Mix of the above

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأشكال الأربعة للهدف كما وردت.
- ℹ️ إضافة من الدليل: تشبيه GPS (ليس في المحاضرة الأصلية).

</details>

### 2.2. الموارد (Resources)

#### 📍 أين نحن الآن؟
ثاني عنصر من المكونات الأربعة — بعد "ماذا نريد؟" (الهدف)، السؤال التالي: "بماذا سننجز هذا الهدف؟"

#### ⬅️ الربط مع السابق
بعد أن حددنا شكل الهدف في 2.1، هذا القسم يفتح الباب للأدوات العملية اللازمة لتحقيقه.

#### 💡 الفكرة الأساسية
**لإنجاز أي مشروع نحتاج أربعة أنواع من الموارد: مالية (`Financial`)، مواد (`Material`)، أشخاص (`People`)، وجدول زمني (`Time Table`).**

#### 📖 الشرح
الموارد الأربعة هي "وقود" المشروع: المال (`Financial Resources`)، المواد الخاصة (`Special Materials`)، الأشخاص (`People`)، والجدول الزمني لتنفيذ المشروع (`Time table for project execution`). أي نقص في أحدها يهدد إتمام المشروع بالكامل، بغض النظر عن مدى قوة الموارد الأخرى.

#### 🎯 الملخص السريع
- الموارد الأربعة: `Financial Resources`, `Special Materials`, `People`, `Time Table`
- الأقسام الفرعية التالية (2.2.1 إلى 2.2.6) تشرح كل نوع بالتفصيل

#### 📚 التطبيق
سنبدأ بالمورد الأكثر تعقيداً — الموارد المالية — لأنها الأكثر عرضة للانحراف عن الخطة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> In order to work on a project, we need: 1. Financial Resources 2. Special Materials 3. People 4. Time table for project execution

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأنواع الأربعة للموارد كما وردت.

</details>

#### 2.2.1. الموارد المالية (Financial Resources)

#### 📖 الشرح
`Budget` هو ما **خططت** لإنفاقه (`the expected cost`)، و`Cost` هو ما **أنفقته فعلياً** (`the actual money spent`). العلاقة بينهما ثلاث حالات: إذا تساويا (`cost === budget`) فهذا `Balance`، وهو الوضع الطبيعي المتوقع (`considered to be the norm`) — وليس `Surplus`. إذا أنفقت أقل من المخطط (`cost < budget`) فهذا `Surplus` — أفضل سيناريو ممكن (`best case scenario`). إذا أنفقت أكثر من المخطط (`cost > budget`) فهذا `Deficit` — أسوأ حالة (`worst case`).

**لماذا؟** لأن الانحراف السالب (`Deficit`) يعني تجاوز الموارد المتاحة فعلاً، وهذا قد يوقف المشروع بالكامل، بينما الانحراف الموجب (`Surplus`) هو مجرد كفاءة إضافية لا يهدد استمرارية المشروع.

💡 **التشبيه:** الميزانية مثل خطة مصروف الشهر، والتكلفة هي ما أنفقته فعلياً في نهاية الشهر.
**وجه الشبه:** تجاوز مصروفك المخطط له = `Budget Deficit`.

⚖️ **المقايضة: أنواع العلاقة بين Cost و Budget**

| | Surplus | Deficit |
| --- | --- | --- |
| المزايا | كفاءة عالية، سمعة جيدة، أموال متبقية لمشاريع أخرى | لا يوجد (حالة سيئة دوماً) |
| العيوب | قد يعني ميزانية مبالغ فيها أصلاً | تهديد مباشر لاستمرارية المشروع، عقوبات، سمعة سيئة |
| متى تختاره | ليست خياراً بل نتيجة تخطيط جيد | يجب تجنبه دوماً |

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> The budget represents the expected cost of the project. The cost is the actual money spent on project. Budget Balance: cost === budget. Budget Surplus: cost < budget. Budget Deficit: cost > budget. Having surplus is best case scenario, while deficit is the worst case, as for balance, it is considered to be the norm.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف `Budget` و`Cost`، والحالات الثلاث (`Balance`/`Surplus`/`Deficit`) مع أيها الأفضل والأسوأ والطبيعي.

</details>

#### 2.2.2. أسباب حدوث العجز المالي (Budget Deficit)

#### 📖 الشرح
العجز غالباً ليس بسبب واحد بل تراكم مخاطر متعددة الأنواع: تخطيط ضعيف (`poor planning`)، تغيّر في أسعار المواد (`change in material prices`)، تغيّر كبير بالمناخ الاقتصادي كسعر الصرف والقوانين والعقوبات (`exchange rate, laws, sanctions`)، حوادث بسبب نقص إجراءات السلامة (`accidents due to lack of safety procedures`)، اكتشافات غير متوقعة أثناء التنفيذ (`unexpected discoveries during execution` — كصخر غير متوقع أثناء الحفر)، أو نتائج تفتيش تكشف عدم مطابقة تستوجب إعادة العمل (`inspections indicating non-compliance causing redo`).

🤔 **تفعيل الفهم:** لو أن دولة فرضت رسوماً جمركية جديدة على مادة أساسية لمشروعك في منتصف التنفيذ، أي فئة من أسباب العجز تنطبق هنا؟
**لماذا هذا مهم؟** لأن التمييز بين الأسباب (داخلية كسوء التخطيط، أم خارجية كالقوانين) يحدد هل كان يمكن تجنّب العجز أصلاً أم لا.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Why might we be in a budget deficit? Poor planning, change in material prices, big change in economic climate (exchange rate, laws, sanctions), accidents due to lack of safety procedures, unexpected discoveries during execution, inspections indicating non-compliance causing redo.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل الأسباب الستة كما وردت.

</details>

#### 2.2.3. أمثلة واقعية على العجز المالي

#### 📖 الشرح
| المشروع | الميزانية | التكلفة الفعلية | السبب الرئيسي |
| --- | --- | --- | --- |
| نفق المانش (Channel Tunnel) | 5.5B GBP | 9.5B GBP | نوع تربة غير متوقع |
| أولمبياد مونتريال 1976 | 300M CAD | 1.5B CAD | إضرابات عمال، ارتفاع أسعار مواد، طقس سيء |
| مقاتلة F-35 | — | 1.7T\$ (عجز 88%) | آلية تمويل عقود الدفاع الأمريكية، وتأخر 10 سنوات |

#### نقطة مهمة ⚠️:
> لاحظ أن آخر مثال (F-35) خارج نطاق المادة كما ذكرت المحاضرة نفسها، لكنه يوضح أن العجز أحياناً يكون **بنيوياً** (نظام تمويل) وليس فقط نتيجة سوء تخطيط.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> The Channel Tunnel: budget 5.5B GBP, actual cost 9.5B GBP due to unexpected soil type. 1976 Montreal Olympiad: budget 300M CAD, cost 1.5B CAD due to strikes, material price rise, bad weather. F-35 Lightning Program: cost reached 1.7T$ (88% deficit) and 10 years late, mostly due to how the US approves and finances defense contracts.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأمثلة الثلاثة بأرقامها وأسبابها.

</details>

#### 2.2.4. المواد (Material)

#### 📖 الشرح
المواد تشمل مواد البناء (`construction material`)، لوحات التحويل الكهربائي (`switching boards`)، الخوادم (`servers`)، البنية التحتية للشبكات (`network infrastructure`)، والأثاث (`furniture`). تتقلب أسعارها بسبب الظروف الاقتصادية، المناخ السياسي، أو التشريعات (`economic conditions, political climate, or legislation`). أحد أكبر التحديات هو ضمان توفر المواد بالسوق المحلي؛ وإلا نضطر للاستيراد، مما يرفع التكاليف لأن تكلفة استيراد الوحدة الواحدة أعلى من الاستيراد بالجملة (`per-unit import cost is higher than bulk`).

لو لم تجد الأسمنت محلياً واضطررت لاستيراده قطعة بقطعة بدلاً من شحنة كاملة، فسعر الوحدة سيرتفع كثيراً — وهذا بالضبط ما تعنيه المحاضرة.

**لماذا؟** لأن تكاليف الشحن والجمارك تُقسّم على كمية أقل، فيرتفع نصيب الوحدة الواحدة من هذه التكاليف الثابتة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Material includes construction material, switching boards, servers, network infrastructure, furniture. Prices fluctuate due to economic conditions, political climate, or legislation. One of the biggest challenges is ensuring availability of materials within local market; otherwise we import, driving up costs since per-unit import cost is higher than bulk.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: أنواع المواد، أسباب تقلب الأسعار، وسبب ارتفاع تكلفة الاستيراد الفردي.

</details>

#### 2.2.5. الأشخاص (People)

#### 📖 الشرح
هم الأشخاص الذين ينفذون المشروع فعلياً (`the people executing the project`). وجود أكثر من شخص في غرفة واحدة يعني عادة احتمال نشوء خلاف، لذلك حل النزاعات (`conflict resolution`) هو مهمة أساسية لمدير المشروع. أحياناً يستمر الفريق كما هو، وأحياناً تحتاج لإعادة توزيعه (`shuffle teams`)، وأحياناً تضطر للاستغناء عن أحدهم (`fire someone`). والشرط الأساسي (`A MAJOR requirement`) هو توزيع المهام حسب الخبرة والمعرفة — لا يمكن تكليف قسم تقني بمهام هندسة مدنية، ولا طبيب بما يفعله مزارع (`you cannot assign IT to civil engineering duties, a medical doctor cannot do what a farmer does`).

**لماذا؟** لأن توزيع المهام بلا مراعاة للخبرة يضمن الفشل حتى قبل البدء.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> They are the people executing the project. Having more than one person in a room will generally cause conflict, so conflict resolution is a main duty of a project manager. Sometimes teams continue together, sometimes you need to shuffle teams, sometimes you have to fire someone. A MAJOR requirement is to divide tasks based on experience and knowledge — you cannot assign IT to civil engineering duties, a medical doctor cannot do what a farmer does.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: النزاعات وحلها، الخيارات الثلاثة (استمرار/إعادة توزيع/فصل)، وشرط توزيع المهام حسب الخبرة.

</details>

#### 2.2.6. الجدول الزمني (Time Table)

#### 📖 الشرح
كل مشروع له حد زمني: تاريخ بداية وتاريخ نهاية (`a start date and finish date`). وعادة يوجد بند مسؤولية (`liability clause`): مكافآت للإنجاز المبكر ضمن المواصفات (`bonuses for finishing early within specs`)، وعقوبات مالية للتأخير أو الخروج عن المواصفات (`financial penalties for finishing late or outside specs`) — ما يجعل الجدول الزمني ملزماً مالياً وليس مجرد تنظيم داخلي.

الحد الزمني لا يعني بالضرورة "قصيراً" (`Time limit doesn't mean short`): سد الممرات الثلاثة في الصين — أكبر سد بالعالم — بدأ عام 1994 وانتهى 2012، بطول جسم 2.3 كيلومتر، وفي 2015 زادوا ارتفاعه لأنه يخزّن ماءً أكثر من المتوقع. هذا يثبت أن مدة 18 سنة كاملة لا تُخرج المشروع من كونه "مؤقتاً" (`temporary`)، طالما له بداية ونهاية محددتين.

وأخيراً، نقول إن المشروع "انتهى" (`we say we finished the project`) في واحدة من ست حالات فقط: `1)` تحقق الهدف (`goal achieved`) — نجاح تام. `2)` هدف غير قابل للتحقيق (`unattainable target`) — مثال: محاولة الهند منافسة تايوان في تصنيع الشرائح خلال التسعينيات وفشلها. `3)` زوال الحاجة للمشروع (`the need for the project no longer exists`). `4)` انتهاء الالتزام المالي (`end of financial commitment`). `5)` فقدان الموارد البشرية أو المادية (`human/physical resources no longer available`) — مثال: تأخر مصانع `TSMC` الأمريكية بسبب ندرة المهندسين المهرة، من 2024 إلى 2025/2027-2028. `6)` أسباب قانونية (`legal reasons`) — كالتعدي على أرض أو مخالفة براءة اختراع أو قانون.

"انتهاء المشروع" له 6 حالات إذن، وليست كلها "نجاحاً" — فالحالات 2 و3 و4 و5 و6 هي في الواقع أشكال من الفشل أو التوقف القسري، وليست نتيجة إيجابية.

⚙️ **الخطوات / الخوارزمية: حالات إنهاء المشروع**

> ما هدف هذه العملية؟ فهم أن "الانتهاء" لا يعني "النجاح" دوماً، وتصنيف كل حالة كنجاح أو توقف.

```algorithm
1 | تحقق الهدف | فريق المشروع | نجاح تام — تم تسليم المنتج/الخدمة/النتيجة
2 | هدف غير قابل للتحقيق | الإدارة العليا | فشل — إيقاف المشروع (مثال الهند وصناعة الشرائح)
3 | زوال الحاجة للمشروع | أصحاب المصلحة | إيقاف — لم يعد هناك سبب للاستمرار
4 | انتهاء الالتزام المالي | الجهة الممولة | إيقاف — نفاد التمويل
5 | فقدان الموارد البشرية/المادية | إدارة الموارد | تأخير أو إيقاف — مثال TSMC ونقص المهندسين
6 | أسباب قانونية | الجهة القانونية | إيقاف — تعدٍّ على أرض، مخالفة براءة اختراع أو قانون
```

#### نقاط التنفيذ:
- الحالات 3–6 يمكن أن تكون **مؤقتة** وليست نهائية — يمكن تمويل جديد، حل قانوني، مصادر مواد جديدة، أو تعيينات جديدة، لكن بتكلفة مالية أعلى دوماً (تأخر الدخل، غرامات، أسعار استيراد أعلى، رواتب توظيف جديد أعلى).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Every project has a time limit: a start date and finish date. There is usually a liability clause: bonuses for finishing early within specs, financial penalties for finishing late or outside specs.
>
> Time limit doesn't mean short: The 3 Gorges Dam in China — the largest dam in the world, started 1994 finished 2012, 2.3KM body length. In 2015 they increased the dam's height because it stores more water than expected.
>
> We say we finished the project when: 1) goal achieved 2) unattainable target — e.g. India competing with Taiwan in chip manufacturing in the 1990s but failed 3) the need for the project no longer exists 4) end of financial commitment 5) human/physical resources no longer available — e.g. TSMC's US plants delayed due to scarcity of skilled engineers, pushed from 2024 to 2025/2027-2028 6) legal reasons — encroaching on land, violating patents or laws.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: بند المسؤولية، مثال سد الممرات الثلاثة، والحالات الست لإنهاء المشروع.

</details>

---

### 3. أصحاب المصلحة (Stakeholders)

#### 📍 أين نحن الآن؟
ثالث عنصر من مكونات المشروع الأربعة (قسم 2) — بعد الهدف والموارد، الآن: من يهتم بنتيجة هذا المشروع؟

#### ⬅️ الربط مع السابق
امتداد مباشر لقسم 2: `Stakeholders` هو ثالث عنصر من العناصر الأربعة المذكورة هناك.

#### 💡 الفكرة الأساسية
**`Stakeholder` هو أي فرد أو مجموعة أو منظمة لها مصلحة في هدف المشروع — وهو مصطلح أوسع بكثير من `Client`.**

#### 📖 الشرح
`Stakeholder` مصطلح **أوسع** من `Client`. فأي شخص أو جهة "لها مصلحة" في نتيجة المشروع — سواء استفادت مباشرة أم لا — تُعتبر `stakeholder`. المحاضرة تعطي أمثلة محددة حسب نوع المنظمة: شركة مساهمة عامة (`publicly traded company`) → `stakeholders` هم المساهمون ممثَّلين بمجلس الإدارة (`shareholders / board of directors`). شركة عامة ممولة من الحكومة (`public company funded by government`) → `stakeholders` هم دافعو الضرائب (`tax payers`)، وهؤلاء أيضاً `clients` في نفس الوقت. منظمة غير حكومية (`NGO`) → `stakeholders` هم الجهات المانحة (`benefactors`). أما في مجال البرمجيات تحديداً، فـ`stakeholders` تشمل: العملاء، الموظفين، المستثمرين، الجهات التنظيمية، والمستخدمين النهائيين (`customers, employees, investors, regulatory bodies, end-users`).

💡 **التشبيه:** لو بنيت مطعماً، فالمستثمر الذي موّل المشروع `stakeholder` حتى لو لم يأكل فيه أبداً.
**وجه الشبه:** المستثمر الممول = `Stakeholder` بدون أن يكون `Client`.

#### 🎯 الملخص السريع
- `Stakeholder` = أي طرف له مصلحة، مباشرة أو غير مباشرة
- أمثلة حسب نوع المنظمة: مساهمون (شركة عامة)، دافعو ضرائب (شركة حكومية)، جهات مانحة (NGO)

#### 📚 التطبيق
القسم القادم (4) يشرح `Clients` كفئة فرعية أضيق من `Stakeholders` — الفرق بينهما نقطة امتحانية مهمة جداً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Stakeholders are individuals, groups or organizations interested in the goal of the project — broader than clients. Example: publicly traded company → shareholders (board of directors). Public company funded by government → tax payers (who are also clients). NGO → benefactors. In software: customers, employees, investors, regulatory bodies, end-users.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف وكل الأمثلة الأربعة (شركة عامة، شركة حكومية، NGO، البرمجيات).

</details>

### 4. العملاء (Clients/Customers)

#### 📍 أين نحن الآن؟
رابع وآخر عنصر من مكونات المشروع — والأهم هنا هو التفريق الدقيق بينه وبين `Stakeholders` الذي شرحناه للتو.

#### ⬅️ الربط مع السابق
هذا القسم امتداد مباشر لقسم 3: نفس فكرة "من يهتم بالمشروع؟" لكن بفئة أضيق وأكثر تحديداً.

#### 💡 الفكرة الأساسية
**`Client` هو فئة فرعية من `Stakeholder`: فرد أو منظمة تشتري أو تستخدم منتجاً أو خدمة محددة، بعلاقة مباشرة ومستمرة — وليس مجرد "زبون" بمعاملة واحدة.**

#### 📖 الشرح
`Clients` هم أفراد أو منظمات تشتري أو تستخدم منتجاً أو خدمة محددة (`purchase or utilize a specific product or service`). بخلاف "الزبون" العادي (`customer`) صاحب المعاملة الواحدة العابرة، فإن `Client` تربطه علاقة مباشرة ومستمرة، غالباً عبر عقد أو شراكة مهنية (`a direct, ongoing relationship, often via a contract or professional partnership`). فكل `client` هو نوع خاص من `stakeholder`، لكن ليس كل `stakeholder` عميلاً.

جدول المقارنة الأصلي في المحاضرة يوضّح الفرق بدقة عبر أربعة معايير: النطاق (`Scope`) — `Clients` فئة فرعية تركّز على المنتج/الخدمة، بينما `Stakeholders` مصطلح شامل. التركيز الأساسي (`Primary Focus`) — `Clients` يهمهم الجودة والمنفعة والقيمة، بينما `Stakeholders` يهمهم العائد المالي (`ROI`) والتوافق الاستراتيجي. طبيعة العلاقة (`Relationship`) — `Clients` علاقة تبادلية/تعاقدية، بينما `Stakeholders` تأثيرهم متفاوت من مستثمر سلبي إلى مستخدم فعّال. الاهتمامات (`Interests`) — `Clients` مدفوعون بالرضا، بينما اهتمامات `Stakeholders` متنوعة وأحياناً متعارضة.

**جدول مقارنة: Clients مقابل Stakeholders**

| المعيار | Clients | Stakeholders |
| --- | --- | --- |
| النطاق (Scope) | فئة فرعية محددة تركّز على المنتج أو الخدمة | مصطلح شامل لكل مهتم بنتيجة المشروع |
| التركيز الأساسي | جودة وقيمة المُخرَج النهائي | العائد المالي (`ROI`) والتوافق الاستراتيجي |
| طبيعة العلاقة | تعاقدية/تبادلية | تتفاوت من مستثمر سلبي إلى مستخدم فعّال |
| الاهتمامات | الرضا وحل المشكلة | متنوعة، وأحياناً متعارضة |

#### 🎯 الملخص السريع
- `Client` = فئة فرعية من `Stakeholder` بعلاقة تعاقدية مستمرة
- الفرق عن `Customer` العادي: العلاقة مستمرة، وليست معاملة واحدة عابرة
- المعايير الأربعة للمقارنة: النطاق، التركيز، العلاقة، الاهتمامات

#### 📚 التطبيق
بعد فهم المكونات الأربعة كاملة (الهدف، الموارد، أصحاب المصلحة، العملاء)، القسم القادم (5) يشرح ما هي "نتائج" المشروع التي تهم هذه الأطراف جميعاً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Clients are individuals or organizations that purchase or utilize a specific product or service. Unlike a random "customer" with a one-time transaction, a client has a direct, ongoing relationship, often via a contract or professional partnership.
>
> جدول المقارنة الأصلي: Scope: Clients = subset focused on product/service | Stakeholders = umbrella term. Primary Focus: Clients = quality/utility/value | Stakeholders = financial returns, ROI, strategic alignment. Relationship: Clients = transactional | Stakeholders = varying influence (passive investors to active users). Interests: Clients = satisfaction-driven | Stakeholders = diverse, sometimes conflicting.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف وجدول المقارنة الرباعي كاملاً.

</details>

---

### 5. نتائج المشروع (Results of Project)

#### 📍 أين نحن الآن؟
أنهينا الآن مكونات المشروع الأربعة كاملة. السؤال التالي الطبيعي: ما الذي "ينتجه" المشروع فعلياً في النهاية؟

#### ⬅️ الربط مع السابق
هذا القسم يربط مباشرة بقسم 1.1: هناك رأينا أن معيار النجاح يختلف حسب نوع الهدف (منتج مقابل قطاع إنساني)؛ هنا نصنّف **نوعي** النتائج التي قد يحققها أي مشروع.

#### 💡 الفكرة الأساسية
**نتائج أي مشروع نوعان: ملموسة (`Tangible`) تُقاس بالأرقام مباشرة، وغير ملموسة (`Intangible`) ذات قيمة استراتيجية لا تُقاس مباشرة.**

#### 📖 الشرح
النتائج الملموسة (`Tangible Results`) تشمل: الربح المالي (`Financial Profit`)، الأسهم للمساهمين (`Shares for shareholders`)، الأدوات الجديدة (`New tools`)، والحصة السوقية (`Market share`). أما النتائج غير الملموسة (`Intangible Results`) فتشمل: السمعة الجيدة (`Good reputation`)، انتشار العلامة التجارية (`Spreading the trademark`)، والنفع العام (`General benefit`).

**جدول: أنواع نتائج المشروع**

| النوع | أمثلة |
| --- | --- |
| Tangible (ملموسة) | ربح مالي، أسهم للمساهمين، أدوات جديدة، حصة سوقية |
| Intangible (غير ملموسة) | سمعة جيدة، انتشار العلامة التجارية، نفع عام |

#### 🎯 الملخص السريع
- `Tangible` = تُقاس بالأرقام مباشرة (ربح، أسهم، أدوات، حصة سوقية)
- `Intangible` = قيمة استراتيجية غير مباشرة (سمعة، علامة تجارية، نفع عام)

#### 📚 التطبيق
بعد فهم المكونات والنتائج، ننتقل الآن لمفهوم أشمل: `Project Management` نفسها — كيف نُدير هذه العناصر معاً لتحقيق هذه النتائج.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Tangible Results: Financial Profit, Shares for shareholders, New tools, Market share. Intangible Results: Good reputation, Spreading the trademark, General benefit.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل الأمثلة الأربعة للنوعين.

</details>

---

### 6. إدارة المشاريع (Project Management) — التعريف

#### 📍 أين نحن الآن؟
بعد فهم مكونات المشروع ونتائجه، نصل الآن لصلب المادة: ما هي `Project Management` نفسها، وكيف نقيس نجاحها؟

#### ⬅️ الربط مع السابق
هذا القسم يبني على كل ما سبق (المكونات، النتائج) ليقدّم الإطار الذي يربطها جميعاً: `Iron Triangle`.

#### 💡 الفكرة الأساسية
**`Project Management` هي إدارة الموارد لتحقيق النتائج المرجوة بأقصر وقت وأقل تكلفة وأعلى جودة ممكنة — وأي تغيير في أحد هذه الأضلاع الثلاثة يؤثر حتماً على الباقي (`Iron Triangle`).**

#### 📖 الشرح
المحاضرة تعطي تعريفين متكاملين. التعريف الأول: `Project Management` هي تطبيق المعرفة والمهارات والأدوات والتقنيات على أنشطة المشروع لتلبية متطلباته وأهدافه (`the application of knowledge, skills, tools, and techniques to project activities to meet the project requirements and goals`). التعريف الثاني أعمق عملياً: إدارة الموارد لتحقيق النتائج المرجوة ضمن أقصر وقت، أقل تكلفة، وأعلى جودة (`management of resources to achieve desired results within shortest time, lowest cost, highest quality`).

هذا هو مفهوم **مثلث الحديد** (`Iron Triangle`): أضلاعه `Cost`، `Time`، `Quality`. القاعدة الذهبية: أي تغيير في ضلع واحد من المثلث يؤثر حتماً على الأضلاع الأخرى (`Any change in one side of the triangle will affect other parts`). لا يمكنك تحسين ضلع واحد دون التأثير على الآخرين.

**لماذا؟** لأن الموارد محدودة دوماً؛ فتسريع الجدول الزمني (`Time`) يحتاج مالاً إضافياً (`Cost`) أو تضحية بالجودة (`Quality`)، وهكذا.

💡 **التشبيه:** مثل شد بطانية قصيرة على سرير كبير — كلما غطيت جهة انكشفت أخرى.
**وجه الشبه:** تغطية جزء من البطانية = تحسين ضلع واحد من المثلث على حساب ضلع آخر.

⚖️ **المقايضة: التركيز على ضلع واحد من المثلث**

| | التركيز على Time (السرعة) | التركيز على Cost (التوفير) |
| --- | --- | --- |
| المزايا | تسليم مبكر، حوافز تعاقدية | ميزانية أقل، فائض مالي محتمل |
| العيوب | تكلفة أعلى أو جودة أقل | تنفيذ أبطأ أو جودة أقل |
| متى تختاره | عند وجود حافز مالي كبير للتسليم المبكر أو ضغط سوقي | عند محدودية التمويل وعدم إلحاح الوقت |

#### 🎯 الملخص السريع
- تعريفان: تطبيق المعرفة/الأدوات على أنشطة المشروع، وإدارة الموارد ضمن `Iron Triangle`
- أضلاع المثلث: `Cost`, `Time`, `Quality` — تغيير أي ضلع يؤثر على الباقي

#### 📚 التطبيق
الأقسام الفرعية القادمة (6.1، 6.2) توضّح النتائج العملية لتطبيق هذا المفهوم بشكل جيد أو سيئ.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Definition 1: Project Management is the application of knowledge, skills, tools, and techniques to project activities to meet the project requirements and goals. Definition 2: management of resources to achieve desired results within shortest time, lowest cost, highest quality. Any change in one side of the triangle will affect other parts.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريفان، ومفهوم Iron Triangle والقاعدة الذهبية له.

</details>

#### 6.1. فوائد الإدارة الناجحة للمشاريع

#### 📖 الشرح
الإدارة الناجحة للمشروع تمكّن المنظمة من: تحقيق الأهداف التجارية، إرضاء توقعات أصحاب المصلحة، زيادة القابلية للتنبؤ، تعزيز فرص النجاح، تسليم المنتج الصحيح بالوقت الصحيح، حل المشاكل بفعالية، الاستجابة للمخاطر بتوقيت مناسب، تحسين استثمار الموارد، تحديد ومعالجة وإنهاء المشاريع الفاشلة، إدارة القيود، وإدارة التغييرات بتوقيت مناسب (`achieve business objectives, satisfy stakeholder expectations, increase predictability, enhance success chances, deliver right product at right time, solve problems effectively, respond to risks timely, optimize resource investment, identify/address/terminate failing projects, manage constraints, manage changes timely`).

هذه قائمة من 11 فائدة، وأهمها عملياً: **زيادة القابلية للتنبؤ** (`predictability`) — أي أن الإدارة الجيدة لا تضمن النجاح المطلق، لكنها تجعل النتائج **متوقعة** وقابلة للتخطيط بدلاً من عشوائية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Successful Project Management enables: achieve business objectives, satisfy stakeholder expectations, increase predictability, enhance success chances, deliver right product at right time, solve problems effectively, respond to risks timely, optimize resource investment, identify/address/terminate failing projects, manage constraints, manage changes timely.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل الفوائد الـ11 مذكورة نصاً.

</details>

#### 6.2. نتائج الإدارة السيئة للمشاريع

#### 📖 الشرح
الإدارة السيئة للمشروع تنتج ثمانية عواقب مباشرة: مواعيد فائتة (`Missed Deadlines`)، تجاوز الميزانية (`Budget Overruns`)، جودة ضعيفة (`Poor Quality`)، إعادة عمل (`Project Rework`)، توسّع غير مخطط بالمتطلبات (`Scope Creep`)، ضرر بالسمعة (`Reputational Damage`)، عدم رضا أصحاب المصلحة (`Stakeholder Dissatisfaction`)، وفشل الأهداف (`Failed Objectives`).

**جدول: نتائج الإدارة السيئة**

| النتيجة | الوصف |
| --- | --- |
| Missed Deadlines | تجاوز المواعيد والجداول الزمنية |
| Budget Overruns | زيادة غير متحكم بها في التكاليف |
| Poor Quality | منتج مليء بالأخطاء أو غير موثوق |
| Project Rework | إعادة العمل بسبب أخطاء أو غموض |
| Scope Creep | توسّع غير مخطط له في متطلبات المشروع |
| Reputational Damage | فقدان مصداقية المنظمة أو الفريق |
| Stakeholder Dissatisfaction | إحباط العملاء والمستثمرين والمستخدمين |
| Failed Objectives | فشل كامل في تحقيق الأهداف الأصلية |

#### الفهم الخاطئ الشائع ❌: "Scope Creep" هو مجرد تغيير بسيط في المتطلبات لا يستحق القلق.
#### الفهم الصحيح ✅: "Scope Creep" هو توسّع **غير مخطط وغير متحكم به**، ويُعد من أخطر أسباب تجاوز الميزانية والوقت لأنه يحدث تدريجياً دون موافقة رسمية واضحة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Consequences of Poor Project Management: Missed Deadlines, Budget Overruns, Poor Quality, Project Rework, Scope Creep, Reputational Damage, Stakeholder Dissatisfaction, Failed Objectives.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل العواقب الثمانية.

</details>

---

### 7. أهمية إدارة المشاريع (Importance of Project Management)

#### 📍 أين نحن الآن؟
بعد فهم "ماذا تعني" إدارة المشاريع ونتائج تطبيقها جيداً أو سيئاً، السؤال التالي: لماذا هي مهمة أصلاً على مستوى المنظمة؟

#### ⬅️ الربط مع السابق
يربط مباشرة بقسم 6.1: القابلية للتنبؤ وباقي الفوائد المذكورة هناك هي التي تجعل هذه الأهمية ملموسة على مستوى استراتيجي.

#### 💡 الفكرة الأساسية
**أهمية إدارة المشاريع نابعة من أهمية المشاريع نفسها، لأنها الطريقة الأساسية التي تُنتج بها المنظمة القيمة.**

#### 📖 الشرح
الأهمية تنبع من أهمية المشاريع نفسها، كونها الطريقة الأساسية التي تُولَّد بها القيمة للمنظمة (`projects are the primary method through which value is generated for the organization`). يجب على المدراء اليوم التعامل مع ميزانيات أصغر، جداول زمنية أقصر، موارد محدودة، وتغيّر تقني سريع (`smaller budgets, shorter timelines, limited resources, and rapid technological change`). الإدارة الناجحة للمشروع تتيح للمنظمة: ربط نتائج المشروع بالأهداف التجارية، المنافسة بفعالية، ضمان الاستدامة، والاستجابة للتغيرات في بيئة الأعمال (`link project outcomes to business objectives, compete effectively, ensure sustainability, respond to changes in business environment`).

المنظمات اليوم تعمل في بيئة "ديناميكية سريعة التغير" (`dynamic environment`)، وإدارة المشاريع هي الأداة التي تربط بين تنفيذ المشروع اليومي وبين الأهداف الاستراتيجية الكبرى للمنظمة.

**لماذا؟** لأنه بدون هذا الربط، قد تنجح المشاريع الفردية تقنياً لكنها تفشل في خدمة الهدف الأكبر للمنظمة.

#### 🎯 الملخص السريع
- المشاريع = الطريقة الأساسية لتوليد القيمة بأي منظمة
- تحديات اليوم: ميزانيات أصغر، جداول أقصر، موارد محدودة، تغيّر تقني سريع
- الإدارة الناجحة تربط تنفيذ المشروع اليومي بالأهداف الاستراتيجية

#### 📚 التطبيق
الآن ننتقل من "لماذا" إلى "كيف" — القسم القادم (8) يشرح المراحل الثابتة التي يمر بها أي مشروع.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Importance stems from the importance of projects themselves, as projects are the primary method through which value is generated for the organization. Managers must handle smaller budgets, shorter timelines, limited resources, and rapid technological change. Successful project management allows the organization to: link project outcomes to business objectives, compete effectively, ensure sustainability, respond to changes in business environment.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: مصدر الأهمية، التحديات الأربعة، والفوائد الأربعة للمنظمة.

</details>

---

### 8. دورة حياة المشروع (Project Life Cycle)

#### 📍 أين نحن الآن؟
بعد فهم أهمية إدارة المشاريع نظرياً، ننتقل الآن للإطار العملي الذي يصف "كيف" يسير أي مشروع من بدايته لنهايته.

#### ⬅️ الربط مع السابق
يبني على قسم 6 و7: `Iron Triangle` يصف "بماذا نقيس"، وهذا القسم يصف "بأي ترتيب زمني نعمل".

#### 💡 الفكرة الأساسية
**كل مشروع، بغض النظر عن المنهجية المستخدمة، يمر بأربع مراحل ثابتة: `Initiation`، `Planning`، `Execution`، و`Closing`.**

#### 📖 الشرح
`Project Life Cycle` هي سلسلة المراحل التي يمر بها أي مشروع من بدايته حتى تحقيق أهدافه النهائية (`the series of phases a project passes through from initiation until final objectives`)، وهذه المراحل موجودة بغض النظر عن المنهجية المستخدمة — سواء `Waterfall` أو `Agile` (`These phases exist regardless of methodology used`). الخطوات: `1) Initiation` — تحديد الأهداف عبر التواصل مع العميل (`goals defined by communicating with client`). `2) Planning` — وضع الجدول الزمني، تقدير التكاليف، وتحديد الأدوات؛ وهي **أهم خطوة على الإطلاق** (`most critical step`). `3) Execution` — تنفيذ المشروع بالكامل حسب الجدول والميزانية (`project fully implemented per schedule and budget`). `4) Closing` — إنهاء المشروع، إجراء اختبار الجودة، وتسليم المُخرَج النهائي للعميل (`project finalized, quality testing performed, final deliverable handed to client`).

هذه المراحل تصف "منطق" أي عمل منظم (تحديد الهدف → التحضير → التنفيذ → التسليم)، وهي مستقلة عن الأسلوب التقني المستخدم لاحقاً.

#### مهم للامتحان ⚠️:
> التخطيط (`Planning`) هو **أهم خطوة** حسب نص المحاضرة صراحة — لأن التنفيذ بأكمله يعتمد عليه.

⚙️ **الخطوات / الخوارزمية: دورة حياة المشروع (Project Life Cycle)**

> ما هدف هذه العملية؟ توفير إطار عام موحّد لأي مشروع بغض النظر عن مجاله أو منهجيته.

```algorithm
1 | Initiation (البداية) | التواصل مع العميل | تحديد أهداف المشروع وفهم احتياجات العميل
2 | Planning (التخطيط) | جداول زمنية وتقدير التكلفة | وضع الجدول الزمني، تقدير التكلفة، تحديد الأدوات — الخطوة الأهم
3 | Execution (التنفيذ) | فريق العمل والموارد | تنفيذ المشروع فعلياً حسب الجدول والميزانية
4 | Closing (الإنهاء) | اختبار الجودة | إنهاء المشروع، اختبار الجودة، تسليم المُخرَج النهائي للعميل
```

#### نقاط التنفيذ:
- هذه المراحل الأربع **ثابتة دوماً** بينما المنهجية (`Waterfall`, `Agile`, ...) هي فقط طريقة تنفيذ التفاصيل داخل هذه المراحل.

#### 🎯 الملخص السريع
- المراحل الأربع: `Initiation → Planning → Execution → Closing`
- `Planning` هي الأهم لأن كل ما بعدها يعتمد عليها
- المراحل ثابتة بغض النظر عن منهجية التطوير (`Waterfall`/`Agile`/...)

#### 📚 التطبيق
القسم القادم (9) يشرح من يدير هذه المراحل الأربع فعلياً: `Project Manager`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Project Life Cycle is the series of phases a project passes through from initiation until final objectives. These phases exist regardless of methodology used (Waterfall or Agile). Steps: 1. Initiation — goals defined by communicating with client. 2. Planning — timeline established, costs estimated, tools identified; most critical step. 3. Execution — project fully implemented per schedule and budget. 4. Closing — project finalized, quality testing performed, final deliverable handed to client.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف والمراحل الأربع كاملة.

</details>

---

### 9. مدير المشروع (Project Manager)

#### 📍 أين نحن الآن؟
بعد فهم مراحل دورة حياة المشروع، السؤال الطبيعي: من يقود هذه المراحل فعلياً، وما التحديات التي يواجهها؟

#### ⬅️ الربط مع السابق
يربط مباشرة بقسم 8: `Project Manager` هو من يدير الانتقال بين مراحل `Initiation → Planning → Execution → Closing`.

#### 💡 الفكرة الأساسية
**مدير المشروع مسؤول عن تطبيق منهجية إدارة المشروع لتحقيق النتائج ضمن الموارد والقيود المتاحة — ومهمته الأساسية هي إدارة الموارد، وليس فقط إضافة المزيد منها لتسريع الإنجاز.**

#### 📖 الشرح
التعريف الرسمي: مدير المشروع مسؤول عن تطبيق منهجية إدارة المشروع لتحقيق النتائج ضمن الموارد والقيود المتاحة (`applying project management methodology to achieve results within available resources and constraints`). أما التعريف غير الرسمي فهو فكاهي جداً: شخص مقتنع تماماً أن تسع نساء يمكنهن إنجاب طفل كامل النمو خلال شهر واحد فقط لو جُمعن معاً (`A person who is fully convinced that nine women can deliver a fully-grown baby in a single month`)! هذا التعريف الفكاهي هو إشارة مباشرة إلى مفهوم **"الشهر-الرجل" (Mythical Man-Month)** الشهير في هندسة البرمجيات: إضافة أشخاص لمشروع متأخر لا يسرّعه بالضرورة، بل قد يزيده تأخيراً.

**لماذا؟** لأن بعض المهام لا يمكن تجزئتها زمنياً (كالحمل)، وإضافة أشخاص جدد تتطلب وقتاً للتنسيق والتدريب يُبطئ الفريق مؤقتاً.

المهمة الأساسية للمدير هي إدارة الموارد لتحقيق أفضل تنفيذ ممكن (`manage resources for best possible execution`). إذا كان التنفيذ بطيئاً وهناك فائض مالي، قد يضيف المدير المزيد من الأشخاص، لكن هذه الزيادة لها حدود؛ بعد عتبة معينة، ينهار الأداء وتنخفض السرعة (`after a certain threshold, performance collapses and speed decreases`). السبب الرئيسي لهذا الانهيار هو أن معظم الوقت يتحول نحو إدارة الفرق وحل النزاعات بدل التنفيذ (`majority of time shifts toward managing teams and resolving conflicts rather than execution`).

الرسم البياني في المحاضرة يوضح علاقة "السرعة" (`Speed`) بعدد الأشخاص (`Number of People`): السرعة ترتفع في البداية مع زيادة الأشخاص، لكن بعد نقطة معينة (حوالي 20 شخصاً في الرسم التوضيحي) تبدأ السرعة بالانخفاض رغم استمرار زيادة العدد. وهذه النقطة، `Breaking Point`، تختلف حسب حجم المشروع: تطوير لعبة ضخمة كـ`Cyberpunk 2077` يدعم/يتطلب عدداً كبيراً من المبرمجين، بينما تطوير موقع `WordPress` بسيط لا يحتاج هذا العدد من الأفراد (`developing a massive game like Cyberpunk 2077 supports/requires a large number of programmers, while developing a simple WordPress site doesn't require such headcount`). دور المدير هو تجنّب الوصول لهذه النقطة أصلاً (`The Manager's Role is to avoid reaching this breaking point`).

⚖️ **المقايضة: زيادة عدد أفراد الفريق**

| | فريق أكبر | فريق أصغر |
| --- | --- | --- |
| المزايا | قدرة أعلى على التوازي في المهام الكبيرة | تنسيق أسهل، تواصل أسرع، أخطاء تنسيق أقل |
| العيوب | تكلفة تنسيق أعلى، نزاعات أكثر، قد تنخفض السرعة الكلية | سعة إنتاجية محدودة لا تناسب المشاريع الضخمة |
| متى تختاره | مشاريع ضخمة معقدة (مثل لعبة AAA) قبل الوصول لنقطة الانهيار | مشاريع بسيطة محدودة النطاق (مثل موقع WordPress) |

#### 🎯 الملخص السريع
- التعريف الرسمي: تطبيق منهجية إدارة المشروع ضمن الموارد والقيود المتاحة
- التعريف الفكاهي يشير لمفهوم `Mythical Man-Month`: إضافة أشخاص لا تضمن التسريع
- `Breaking Point`: نقطة تنهار بعدها الإنتاجية، وتختلف حسب حجم المشروع

#### 📚 التطبيق
القسم الفرعي القادم (9.1) يفصّل مهام المدير اليومية تحديداً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Formal Definition: The Project Manager is responsible for applying project management methodology to achieve results within available resources and constraints. Informal Definition: A person who is fully convinced that nine women can deliver a fully-grown baby in a single month. This is derived from Resource Management — the PM must manage resources within imposed constraints (quality, cost, time) satisfying both stakeholders and client. It has become "common practice" to increase headcount to speed execution, but like human pregnancy this does not always achieve desired speed.
>
> The manager's primary task is to manage resources for best possible execution. If execution is slow and there is financial surplus, the manager may add more people. This increase has limits; after a certain threshold, performance collapses and speed decreases. The primary reason for this collapse is that majority of time shifts toward managing teams and resolving conflicts rather than execution.
>
> The Breaking Point varies based on project scale: developing a massive game like Cyberpunk 2077 supports/requires a large number of programmers, while developing a simple WordPress site doesn't require such headcount. The Manager's Role is to avoid reaching this breaking point.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريفان الرسمي والفكاهي، آلية انهيار الأداء، ومفهوم Breaking Point.

</details>

#### 9.1. مهام مدير المشروع

#### 📖 الشرح
كمدير مشروع، عليك: تحليل فكرة المشروع واستخراج الأهداف، وضع الجدول الزمني، تطوير الميزانية، إجراء دراسة جدوى اقتصادية، مراقبة التنفيذ، حل النزاعات، ومعالجة النقص بالمواد أو العمالة (`analyze the project idea and extract objectives, establish the schedule, develop the budget, conduct economic feasibility study, monitor execution, resolve conflicts, address shortages in materials/labor`). والجملة الأهم في هذه القائمة: إدارة المشاريع مرتبطة جوهرياً بالمهارات الشخصية، وليس فقط بالتقنيات والأدوات (`Project management is fundamentally tied to interpersonal skills, not just technologies and tools`).

القائمة تنتهي بجملة مفصلية: إدارة المشاريع مرتبطة **بالمهارات الشخصية (Interpersonal Skills)** أكثر من ارتباطها بالأدوات التقنية — وهذا يربط مباشرة بسبب "انهيار الأداء" الذي شرحناه في القسم السابق (النزاعات البشرية هي السبب الأول، وليس نقص التقنية).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كان لديك فريق من 15 شخصاً يعمل بكفاءة، وفريق آخر يعمل على نفس نوع المشروع لكنه متأخر جداً، فهل الحل الصحيح دوماً هو "أضف المزيد من الأشخاص للفريق المتأخر"؟
> **لماذا هذا مهم؟** لأن الإجابة الصحيحة تعتمد على "نقطة الانهيار" (`Breaking Point`) الخاصة بهذا المشروع تحديداً — وليست قاعدة عامة صالحة لكل الحالات.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> As a PM you must: analyze the project idea and extract objectives, establish the schedule, develop the budget, conduct economic feasibility study, monitor execution, resolve conflicts, address shortages in materials/labor. Project management is fundamentally tied to interpersonal skills, not just technologies and tools.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل المهام السبعة، والجملة الختامية عن Interpersonal Skills.

</details>

---

### 10. العلاقة مع تطوير البرمجيات (Relationship with Software Development)

#### 📍 أين نحن الآن؟
هذه آخر نقطة رئيسية بالمحاضرة — تربط كل ما تعلمناه عن إدارة المشاريع بمجال تطوير البرمجيات تحديداً.

#### ⬅️ الربط مع السابق
يربط بقسم 8 تحديداً: نماذج التطوير هنا تقع **داخل** مرحلة `Execution` من `Project Life Cycle`، وليست بديلاً عنها.

#### 💡 الفكرة الأساسية
**نماذج التطوير مثل `Waterfall` و`Agile` ليست إدارة مشروع بحد ذاتها — بل هي جزء واحد فقط منها، يمثّل دورة حياة المشروع التقنية تحديداً.**

#### 📖 الشرح
في هندسة البرمجيات، النماذج (`Waterfall, Spiral, Iterative, Agile`) تمثّل دورة حياة المشروع — وهي **ليست** إدارة مشروع، بل **جزء** من إدارة المشروع (`They represent the life cycle of the project — they are NOT project management, they are a PART of project management`). هذه نقطة جوهرية غالباً ما تُخلط: نماذج التطوير هي **أدوات تنفيذية** ضمن مرحلة `Execution` من دورة حياة المشروع، وليست بديلاً عن إدارة المشروع ككل (التي تشمل أيضاً الميزانية، أصحاب المصلحة، الموارد البشرية... إلخ).

#### الفهم الخاطئ الشائع ❌: "Agile" هي طريقة لإدارة المشروع بالكامل.
#### الفهم الصحيح ✅: "Agile" (مثل باقي النماذج) هي **جزء واحد فقط** من إدارة المشروع، تحديداً ضمن مرحلة `Execution` في دورة الحياة.

#### 🎯 الملخص السريع
- نماذج التطوير `Waterfall/Spiral/Iterative/Agile` = جزء تنفيذي واحد من إدارة المشروع، وليست بديلاً عنها
- تقع تحديداً ضمن مرحلة `Execution` من `Project Life Cycle`

#### 📚 التطبيق
الأقسام الفرعية القادمة (10.1 إلى 10.4) تشرح كل نموذج من هذه النماذج الأربعة بالتفصيل.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> In software engineering, models: Waterfall, Spiral, Iterative, Agile. They represent the life cycle of the project — they are NOT project management, they are a PART of project management.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل.

</details>

#### 10.1. نموذج Waterfall

#### 📖 الشرح
`Waterfall`: متطلبات ← تحليل ← تصميم ← برمجة ← اختبار ← نشر ← صيانة (`Requirements → Analysis → Design → Coding → Testing → Deployment → Maintenance`).

⚙️ **الخطوات / الخوارزمية: Waterfall Model**

```algorithm
1 | Requirements | فريق التحليل | جمع متطلبات العميل بشكل كامل قبل البدء
2 | Analysis | المحلل | دراسة المتطلبات وتحويلها لمواصفات
3 | Design | المصمم/المهندس | تصميم بنية النظام
4 | Coding | المبرمج | كتابة الكود الفعلي
5 | Testing | فريق الجودة | اختبار النظام للتأكد من مطابقته للمواصفات
6 | Deployment | فريق العمليات | نشر النظام للاستخدام الفعلي
7 | Maintenance | فريق الصيانة | إصلاح الأخطاء والتحديثات بعد الإطلاق
```

#### نقاط التنفيذ:
- كل مرحلة تبدأ بعد اكتمال التي قبلها بالكامل — لا رجوع للخلف بسهولة، لذلك يناسب المشاريع ذات المتطلبات الثابتة وغير المتغيرة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Waterfall: Requirements → Analysis → Design → Coding → Testing → Deployment → Maintenance

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تسلسل المراحل السبع كما وردت.

</details>

#### 10.2. نموذج Spiral

#### 📖 الشرح
`Spiral`: `1)` تحديد الأهداف (`Identify Objectives`) `2)` تحليل المخاطر (`Risk Analysis`) `3)` تطوير المنتج (`Product Development`) `4)` التقييم (`Evaluation`) — ويتكرر هذا التسلسل في حلقات متتالية تتوسع تدريجياً (شكل حلزوني).

⚙️ **الخطوات / الخوارزمية: Spiral Model**

```algorithm
1 | Identify Objectives | فريق التخطيط | تحديد الأهداف والبدائل لهذه الحلقة (Iteration)
2 | Risk Analysis | محلل المخاطر | تحليل وتقييم المخاطر المحتملة
3 | Product Development | فريق التطوير | تطوير جزء من المنتج لهذه الحلقة
4 | Evaluation | العميل/أصحاب المصلحة | مراجعة النتائج والتخطيط للحلقة التالية
```

#### نقاط التنفيذ:
- يُعاد تنفيذ الحلقة الكاملة عدة مرات، وكل حلقة "أوسع" من سابقتها (شكل حلزوني) — يناسب المشاريع عالية المخاطر.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Spiral: 1. Identify Objectives 2. Risk Analysis 3. Product Development 4. Evaluation (يتكرر في حلقات متتالية تتوسع)

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الخطوات الأربع وطبيعة التكرار الحلزوني.

</details>

#### 10.3. نموذج Iterative

#### 📖 الشرح
`Iterative`: تخطيط أولي (`Initial planning`) يليه تكرار الحلقة (تخطيط ← متطلبات ← تحليل وتصميم ← تنفيذ ← اختبار ← تقييم) عدة مرات، وينتهي بالنشر النهائي (`Deployment`) بعد اكتمال الدورات.

⚙️ **الخطوات / الخوارزمية: Iterative Model**

```algorithm
1 | Initial Planning | فريق المشروع | تخطيط أولي عام للمشروع
2 | Planning | فريق التخطيط | تخطيط تفصيلي لهذه الدورة (Iteration)
3 | Requirements | المحلل | تحديد متطلبات هذه الدورة تحديداً
4 | Analysis & Design | المصمم | تحليل وتصميم جزء من النظام
5 | Implementation | المبرمج | تنفيذ هذا الجزء
6 | Testing | فريق الجودة | اختبار الجزء المُنفَّذ
7 | Evaluation | الفريق وأصحاب المصلحة | تقييم النتائج والعودة للتخطيط لدورة جديدة
8 | Deployment | فريق العمليات | نشر النسخة النهائية بعد اكتمال الدورات
```

#### نقاط التنفيذ:
- الفرق عن `Spiral` أن `Iterative` يركّز على تكرار **التنفيذ والتقييم** أكثر من التركيز الصريح على تحليل المخاطر في كل دورة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Iterative: Initial planning → (Planning → Requirements → Analysis & Design → Implementation → Testing → Evaluation) تتكرر → Deployment

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل.

</details>

#### 10.4. نموذج Agile

#### 📖 الشرح
`Agile`: `1)` تخطيط (`Plan`) `2)` تصميم (`Design`) `3)` تطوير (`Develop`) `4)` اختبار (`Test`) `5)` نشر (`Deploy`) `6)` مراجعة (`Review`) — دورة مستمرة تتكرر باستمرار.

⚙️ **الخطوات / الخوارزمية: Agile Methodology**

```algorithm
1 | Plan | فريق المشروع/Scrum | تخطيط ما سيُنجز في هذه الدورة القصيرة
2 | Design | المصمم | تصميم الميزة أو الجزء المطلوب
3 | Develop | المبرمج | تطوير الكود الفعلي
4 | Test | فريق الجودة | اختبار الميزة المطورة
5 | Deploy | فريق العمليات | نشر الميزة للمستخدمين
6 | Review | الفريق بالكامل | مراجعة النتائج والتغذية الراجعة قبل الدورة التالية
```

#### نقاط التنفيذ:
- الدورة قصيرة ومتكررة باستمرار (تشبه `Sprint` في `Scrum`)، وهذا يجعلها الأنسب للمشاريع سريعة التغيّر في المتطلبات — سنتعمق في هذا لاحقاً (`(غير مشروحة بالتفصيل في هذه المحاضرة)`).

⚖️ **المقايضة: Waterfall مقابل Agile**

| | Waterfall | Agile |
| --- | --- | --- |
| المزايا | وضوح كامل للخطة من البداية، سهل التوثيق والتعاقد | مرونة عالية للتغيير، تسليم مستمر لأجزاء عاملة |
| العيوب | صعوبة التعديل بعد البدء، اكتشاف المشاكل متأخراً | يحتاج تواصلاً مستمراً، أصعب في التقدير الزمني الكلي مسبقاً |
| متى تختاره | متطلبات ثابتة وواضحة منذ البداية (مثل عقود حكومية صارمة) | متطلبات متغيرة أو غير مؤكدة بالكامل (مثل منتجات ناشئة) |

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Agile: 1. Plan 2. Design 3. Develop 4. Test 5. Deploy 6. Review (دورة مستمرة)

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الخطوات الست ومقارنة Waterfall/Agile.

</details>

---

### الأفكار الرئيسية الشاملة

1. **جدول المحتويات الكامل للمحاضرة** يؤكد أن الترتيب المنطقي هو: تعريف المشروع ← مكوناته ← نتائجه ← إدارة المشاريع ← أهميتها ← دورة الحياة ← مدير المشروع ← علاقتها بالبرمجيات.
2. **"Now what?" (خاتمة المحاضرة):** أعلنت المحاضرة عن المواضيع القادمة: `Time Management in Project`, `Budgeting`, `DevOps` (`Git`, `Docker`, `CI/CD`), `Agile` — وهذا يعني أن هذه المواضيع **لم تُشرح بعد** وستُغطى في محاضرات لاحقة، لذلك لا تظهر أكواد `Git`/`Docker` فعلية في هذه المحاضرة تحديداً.

---
## ملخص بديل — قراءة سردية متصلة (Alternative Complete Reading)

> هذا مسار قراءة **بديل ومتساوٍ تماماً** لتفاصيل الجزء الأول أعلاه — ليس نسخة مختصرة، بل نفس المحتوى بأسلوب سردي متصل، يصلح للمراجعة قبل الامتحان بدون الرجوع للتفاصيل. (الجزء الذي يليه — "ملخص منظم" — هو مرجع بالجداول لمن يريد بحثاً سريعاً عن مصطلح؛ هذا القسم مختلف: قصة واحدة مترابطة.)

هذه المحاضرة تجاوب على سؤال بسيط: إيش هو `Project` بالضبط، وإيش يعني أنك "تديره" بنجاح؟ التعريف الأساسي إنه `temporary endeavor` — مسعى مؤقت له بداية ونهاية محددتين، هدفه إنتاج منتج أو خدمة أو نتيجة مميزة (`distinct product, service or result`). كلمة `temporary` هي الفيصل: أي عمل يستمر بلا نهاية محددة، مثل تشغيل خط إنتاج مصنع يومياً، هو `operation` وليس `project`. لكن `temporary` ما تعني "قصير" أبداً — سد الممرات الثلاثة في الصين استغرق 18 سنة كاملة (1994-2012) وزادوا ارتفاعه لاحقاً سنة 2015، ومع ذلك يبقى `project` لأن له بداية ونهاية محددتين بوضوح. والجزء الأهم في التعريف هو `target` (الهدف): بدونه لا يمكن أبداً قياس نجاح المشروع أو فشله، وهذا يخليه أهم عنصر منفرد في أي مشروع. والمهم كمان إن نوع الهدف نفسه يغيّر طريقة الإدارة: لو الهدف منتج، النجاح يُقاس بمطابقة مواصفات العميل، أما في القطاع الإنساني (زي خدمة قانونية تساعد الناس بأوراق الزواج والطلاق، أو مساعدة `IDPs` النازحين داخلياً) فالنجاح يُقاس بعدد الأشخاص أو العائلات المستفيدة، مو بالربح المادي أبداً.

أي مشروع يتكوّن من أربعة مكونات لا غنى عنها: `Target` (الهدف، وممكن يكون منتجاً كاملاً أو جزئياً، خدمة، رسالة ماجستير أو دكتوراه، أو براءة اختراع)، `Resources` (الموارد)، `Stakeholders` (أصحاب المصلحة)، و`Clients/Customers` (العملاء). والموارد نفسها أربعة أنواع: مالية (`Financial`)، مواد (`Material`)، أشخاص (`People`)، وجدول زمني (`Time Table`) — ونقص أي واحد منها يهدد المشروع بالكامل. الجزء المالي فيه ثلاث حالات لازم تفرّق بينها: `Budget` هو ما خططت لإنفاقه، و`Cost` هو ما أنفقته فعلياً. لو تساويا فهذا `Balance` (الوضع الطبيعي المتوقع)، لو أنفقت أقل فهذا `Surplus` (أفضل حالة)، ولو أنفقت أكثر فهذا `Deficit` (أسوأ حالة، وليس `Balance` هو السيء زي ما ممكن يُفهم بالخطأ). أسباب العجز المالي متنوعة: تخطيط ضعيف، تقلب أسعار المواد، تغيّر كبير بالمناخ الاقتصادي (سعر الصرف، القوانين، العقوبات)، حوادث بسبب نقص إجراءات السلامة، اكتشافات غير متوقعة أثناء التنفيذ، أو نتائج تفتيش تكشف عدم مطابقة تستوجب إعادة العمل. وفيه أمثلة حقيقية موثّقة: نفق المانش (ميزانية 5.5 مليار جنيه إسترليني، تكلفة فعلية 9.5 مليار بسبب نوع تربة غير متوقع)، أولمبياد مونتريال 1976 (ميزانية 300 مليون دولار كندي، تكلفة 1.5 مليار بسبب إضرابات وارتفاع أسعار وطقس سيء)، ومقاتلة F-35 (تجاوزت الميزانية بنسبة 88% وتأخرت 10 سنوات، بسبب آلية تمويل عقود الدفاع الأمريكية نفسها — مثال خارج نطاق المادة لكنه يوضح أن العجز أحياناً يكون بنيوياً وليس فقط سوء تخطيط). أما المواد فتحديها الأكبر توفرها بالسوق المحلي؛ إذا لم تتوفر تضطر للاستيراد قطعة بقطعة بدل شحنة كاملة، وسعر الوحدة المستوردة فردياً أغلى دوماً من الاستيراد بالجملة. والأشخاص هم مصدر التحدي الأكبر: وجود أكثر من شخص بغرفة واحدة يعني احتمال نشوء خلاف، وحل هذه الخلافات هو مهمة مدير المشروع الأساسية — أحياناً بإعادة توزيع الفريق، وأحياناً (في أسوأ الحالات) بالاستغناء عن أحدهم. ومن الشروط الأساسية توزيع المهام حسب الخبرة: لا يمكن تكليف مهندس تقني بمهام هندسة مدنية، ولا طبيب بما يفعله مزارع. أما الجدول الزمني فعادة يتضمن بند مكافأة للإنجاز المبكر وعقوبة مالية للتأخير، ما يجعله ملزماً مالياً وليس مجرد تنظيم داخلي.

المشروع ينتهي بواحدة من ست حالات، وحالة واحدة فقط منها هي نجاح حقيقي: تحقق الهدف بالكامل. الخمس الباقية أشكال من الفشل أو التوقف القسري: هدف غير قابل للتحقيق (مثال الهند ومحاولتها منافسة تايوان بصناعة الشرائح في التسعينيات وفشلها)، زوال الحاجة للمشروع، انتهاء الالتزام المالي، فقدان الموارد البشرية أو المادية (مثال مصانع TSMC الأمريكية التي تأخرت من 2024 إلى 2025-2027/2028 بسبب ندرة المهندسين المهرة)، وأسباب قانونية كالتعدي على أرض أو مخالفة براءة اختراع أو قانون. والمهم إن الحالات من الثالثة للسادسة يمكن أن تكون مؤقتة وليست نهائية — يمكن حلها بتمويل جديد أو حل قانوني أو مصادر بديلة، لكن دائماً بتكلفة إضافية.

الآن لنفرّق بين مصطلحين يُخلط بينهما كثيراً: `Stakeholders` و`Clients`. `Stakeholder` مصطلح أوسع بكثير — أي فرد أو جهة "لها مصلحة" في نتيجة المشروع، سواء استفادت مباشرة أم لا، تُعتبر `stakeholder`. مثال: مستثمر موّل بناء مطعم هو `stakeholder` حتى لو لم يأكل فيه أبداً أصلاً. أما `Client` فهو فئة فرعية أضيق: من يشتري أو يستخدم المنتج بعلاقة تعاقدية مستمرة، عادة عبر عقد أو شراكة مهنية، بخلاف "الزبون" العابر ذي المعاملة الواحدة. فكل `Client` هو `Stakeholder`، لكن العكس غير صحيح أبداً. والمقارنة الكاملة بينهما تشمل النطاق (فئة فرعية مقابل مصطلح شامل)، التركيز (جودة/قيمة المنتج مقابل العائد المالي والتوافق الاستراتيجي)، طبيعة العلاقة (تعاقدية مقابل متفاوتة من مستثمر سلبي لمستخدم فعّال)، والاهتمامات (الرضا مقابل اهتمامات متنوعة وأحياناً متعارضة). ونتائج أي مشروع نوعان أيضاً: `Tangible` (ملموسة، تُقاس بالأرقام مباشرة — ربح، أسهم، أدوات جديدة، حصة سوقية) و`Intangible` (غير ملموسة لكن استراتيجية القيمة — سمعة، انتشار علامة تجارية، نفع عام).

بعد ما فهمنا مكونات المشروع، ننتقل لـ`Project Management` نفسها. تعريفها الأول: تطبيق المعرفة والمهارات والأدوات والتقنيات على أنشطة المشروع لتحقيق متطلباته وأهدافه. تعريفها الثاني أعمق: إدارة الموارد لتحقيق النتائج المرجوة بأقصر وقت، أقل تكلفة، وأعلى جودة ممكنة — وهذا هو `Iron Triangle` (مثلث الحديد): `Cost`، `Time`، `Quality`. القاعدة الذهبية هنا: أي تغيير في ضلع واحد من هذا المثلث يؤثر حتماً على الأضلاع الأخرى، لأن الموارد محدودة دوماً — تسريع الجدول الزمني يحتاج مالاً إضافياً أو تضحية بالجودة. الإدارة الناجحة للمشروع تمكّن المنظمة من تحقيق أهدافها التجارية، إرضاء توقعات أصحاب المصلحة، زيادة القابلية للتنبؤ (وهذه أهم فائدة عملياً — الإدارة الجيدة لا تضمن النجاح المطلق، لكنها تجعل النتائج متوقعة بدل عشوائية)، تسليم المنتج الصحيح بالوقت الصحيح، حل المشاكل بفعالية، والاستجابة للمخاطر بتوقيت مناسب. أما الإدارة السيئة فتؤدي إلى مواعيد فائتة، تجاوز الميزانية، جودة ضعيفة، إعادة عمل، وأخطرها `Scope Creep` — التوسع غير المخطط وغير المتحكم به في متطلبات المشروع، والذي يحدث تدريجياً دون موافقة رسمية واضحة، فيتحول لأحد أخطر أسباب تجاوز الوقت والميزانية بالضبط لأنه لا يبدو كخطر واضح من البداية.

وإدارة المشاريع مهمة أصلاً لأن المشاريع هي الطريقة الأساسية التي تُنتج بها المنظمات القيمة. اليوم تعمل المنظمات في بيئة ديناميكية سريعة التغير، بميزانيات أصغر وجداول أقصر وموارد محدودة وتغيّر تقني سريع، وإدارة المشاريع هي الأداة التي تربط التنفيذ اليومي بالأهداف الاستراتيجية الكبرى — البقاء، المنافسة، الاستدامة. وكل مشروع، بغض النظر عن منهجيته، يمر بأربع مراحل ثابتة تُعرف بـ`Project Life Cycle`: البداية (`Initiation` — تحديد الأهداف عبر التواصل مع العميل)، التخطيط (`Planning` — وضع الجدول الزمني وتقدير التكلفة وتحديد الأدوات، وهي **أهم خطوة على الإطلاق** حسب نص المحاضرة صراحة لأن التنفيذ بأكمله يعتمد عليها)، التنفيذ (`Execution` — تنفيذ المشروع فعلياً حسب الجدول والميزانية)، والإنهاء (`Closing` — اختبار الجودة وتسليم المُخرَج النهائي للعميل).

مين يدير كل هذا؟ `Project Manager`، والتعريف الفكاهي له بالمحاضرة لطيف جداً: شخص مقتنع تماماً أن تسع نساء يقدرن يولّدن طفلاً كامل النمو خلال شهر واحد فقط لو جمعتهن! هذي إشارة مباشرة لمفهوم "الشهر-الرجل" الأسطوري (`Mythical Man-Month`) الشهير بهندسة البرمجيات: إضافة أشخاص لمشروع متأخر لا يسرّعه بالضرورة، وأحياناً يزيده تأخيراً، لأن بعض المهام لا يمكن تجزئتها زمنياً، وإضافة أشخاص جدد يتطلب وقت تنسيق وتدريب يُبطئ الفريق مؤقتاً. مهمة المدير الأساسية إدارة الموارد لأفضل تنفيذ ممكن؛ لو التنفيذ بطيء وفيه فائض مالي، ممكن يضيف أشخاصاً، لكن هذه الزيادة لها حدود — بعد نقطة معينة (اسمها `Breaking Point`، وتختلف حسب حجم المشروع؛ لعبة ضخمة زي Cyberpunk 2077 تحتاج فريقاً كبيراً بعكس موقع WordPress بسيط) تنهار الإنتاجية وتنخفض السرعة، لأن معظم الوقت يتحول من التنفيذ الفعلي لإدارة الفريق وحل النزاعات بين الأفراد والأقسام. ومهام المدير باختصار: تحليل فكرة المشروع واستخراج أهدافه، وضع الجدول الزمني، تطوير الميزانية، إجراء دراسة جدوى اقتصادية، مراقبة التنفيذ، حل النزاعات، ومعالجة نقص المواد أو العمالة — والجملة الأهم في كل هذا: إدارة المشاريع مرتبطة بالمهارات الشخصية (`Interpersonal Skills`) أكثر بكثير من ارتباطها بالأدوات التقنية، وهذا يفسّر مباشرة سبب "انهيار الأداء" اللي شرحناه للتو: النزاعات البشرية هي السبب الأول، وليس نقص التقنية.

آخر نقطة جوهرية بالمحاضرة توضّح علاقة إدارة المشاريع بتطوير البرمجيات تحديداً، وهي نقطة يُخطئ فيها كثيرون: نماذج التطوير زي `Waterfall`، `Spiral`، `Iterative`، و`Agile` **ليست** إدارة مشروع بحد ذاتها، بل هي **جزء واحد فقط** منها، تحديداً ضمن مرحلة `Execution` من دورة الحياة. `Waterfall` خطي تماماً: متطلبات ← تحليل ← تصميم ← برمجة ← اختبار ← نشر ← صيانة، وكل مرحلة تبدأ بعد اكتمال التي قبلها كاملة، فيناسب المشاريع ذات المتطلبات الثابتة. `Spiral` يكرر أربع خطوات (تحديد الأهداف، تحليل المخاطر، تطوير المنتج، التقييم) في حلقات متتالية تتوسع تدريجياً، ويناسب المشاريع عالية المخاطر. `Iterative` قريب من `Spiral` لكنه يركّز على تكرار التنفيذ والتقييم أكثر من التحليل الصريح للمخاطر. و`Agile` دورة قصيرة مستمرة (تخطيط، تصميم، تطوير، اختبار، نشر، مراجعة) تناسب أكثر المشاريع سريعة التغيّر في المتطلبات. والفرق الجوهري بين `Waterfall` و`Agile`: الأول يعطي وضوحاً كاملاً من البداية لكنه صعب التعديل، بينما الثاني مرن جداً لكنه يحتاج تواصلاً مستمراً وصعب التقدير الزمني الكلي مسبقاً.

والخيط الذي يربط المحاضرة كلها: كل شيء يبدأ من تعريف دقيق للمشروع وهدفه، يمرّ بمكوناته الأربعة ونتائجه، يصل لإدارته عبر مثلث القيود الثلاثة، ثم دورة حياته الثابتة ومديره الذي يوازن بين الموارد والأشخاص، وينتهي بفهم أن أدوات التطوير التقنية (Waterfall/Agile وغيرها) هي مجرد جزء تنفيذي داخل هذا الإطار الأشمل — وليست بديلاً عنه أبداً. هذا الأساس ستُبنى عليه المواضيع القادمة مباشرة: إدارة الوقت بالمشروع، الميزنة، DevOps (`Git`, `Docker`, `CI/CD`)، و`Agile` بتفصيل أعمق.

---
## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Project` | مسعى مؤقت لإنتاج منتج أو خدمة أو نتيجة مميزة | بناء منزل، رسالة ماجستير |
| `Target/Goal` | الهدف المحدد الذي يقاس به نجاح المشروع | منتج، خدمة، رسالة بحثية |
| `Budget` | التكلفة المتوقعة المخطط لها | 5.5B GBP لنفق المانش |
| `Cost` | المال الفعلي المصروف | 9.5B GBP فعلياً لنفق المانش |
| `Stakeholder` | أي فرد/جهة لها مصلحة في نتيجة المشروع | المساهمون، دافعو الضرائب |
| `Client` | من يشتري/يستخدم المنتج بعلاقة تعاقدية مستمرة | عميل خدمة قانونية |
| `Iron Triangle` | مثلث `Cost`-`Time`-`Quality`/`Scope` المتداخل | أي تغيير بضلع يؤثر على الباقي |
| `Project Life Cycle` | المراحل الأربع لأي مشروع | `Start → Plan → Execute → Finish` |
| `Scope Creep` | توسع غير مخطط في متطلبات المشروع | إضافة ميزات دون موافقة رسمية |

### المكونات الرئيسية (مرجع سريع)

| المكوّن | الوظيفة | ملاحظة |
| --- | --- | --- |
| Target (Goal) | يحدد ما يجب تحقيقه ويقيس النجاح | أهم عنصر في المشروع |
| Resources (المالية/المواد/الأشخاص/الوقت) | يوفر الوقود اللازم للتنفيذ | نقص أي عنصر يهدد المشروع |
| Stakeholders | يمثلون كل الأطراف المهتمة بالنتيجة | مصطلح أوسع من Clients |
| Clients/Customers | يمثلون مستخدمي/مشتري المُخرَج | علاقة تعاقدية مستمرة |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| Clients مقابل Stakeholders | فئة فرعية تركّز على المنتج | مصطلح شامل لكل مهتم | النطاق والعلاقة (تعاقدية مقابل متفاوتة) |
| Budget مقابل Cost | المخطط له مسبقاً | المصروف فعلياً | التخطيط مقابل التنفيذ الفعلي |
| Waterfall مقابل Agile | خطي، ثابت المراحل | دوري، مرن، قصير الدورات | المرونة تجاه تغيّر المتطلبات |
| Project مقابل Operation | مؤقت وله هدف محدد `(شرح زيادة للفهم)` | مستمر بلا نهاية محددة `(شرح زيادة للفهم)` | معيار `temporary` |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| إدارة الموارد | `Budget`, `Cost`, `Surplus`, `Deficit`, `Material`, `Time Table` |
| الأطراف | `Stakeholders`, `Clients`, `Customers`, `Project Manager` |
| دورة الحياة | `Initiation`, `Planning`, `Execution`, `Closing` |
| نماذج التطوير | `Waterfall`, `Spiral`, `Iterative`, `Agile` |
| القياس والجودة | `Iron Triangle`, `Scope`, `Quality`, `Scope Creep` |

### أبرز النقاط الذهبية

1. `Target` هو أهم مكوّن في أي مشروع لأنه معيار قياس النجاح/الفشل.
2. `Budget Deficit` هو أسوأ حالة مالية، و`Balance` هو الوضع الطبيعي المتوقع — وليس `Surplus`.
3. `Stakeholders` أوسع من `Clients` دوماً.
4. زيادة عدد الأفراد في فريق متأخر **لا تضمن** تسريع الإنجاز (تشبيه "تسع نساء وشهر واحد").
5. مراحل دورة حياة المشروع الأربع ثابتة بغض النظر عن منهجية التطوير المستخدمة.
6. `Waterfall/Spiral/Iterative/Agile` هي جزء من إدارة المشروع وليست بديلاً عنها.
7. `Planning` هي أهم مرحلة في دورة حياة المشروع لأن التنفيذ بأكمله يعتمد عليها.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| اعتبار `Agile` = إدارة مشروع كاملة | `Agile` هي جزء تنفيذي واحد ضمن إدارة المشروع فقط |
| اعتبار `Surplus` هو "الوضع الطبيعي" | الوضع الطبيعي هو `Balance` (Cost = Budget)، و`Surplus` هو أفضل من الطبيعي |
| الخلط بين `Client` و`Stakeholder` كمترادفين | كل `Client` هو `Stakeholder`، لكن العكس غير صحيح |
| افتراض أن إضافة أفراد دائماً يسرّع المشروع | بعد نقطة معينة (Breaking Point) تنخفض السرعة الكلية |

---

### خطوات وإجراءات المحاضرة
> كل عملية أو إجراء ورد في المحاضرة — كـ `algorithm` block مستقل.

#### ⚙️ الخطوات / الخوارزمية: حالات إنهاء المشروع

> ما هدفه؟ تصنيف كل طريقة "لإنهاء" مشروع كنجاح فعلي أو كتوقف قسري.

```algorithm
1 | تحقق الهدف | فريق المشروع | نجاح تام
2 | هدف غير قابل للتحقيق | الإدارة العليا | فشل وإيقاف
3 | زوال الحاجة | أصحاب المصلحة | إيقاف
4 | انتهاء التمويل | الجهة الممولة | إيقاف
5 | فقدان الموارد | إدارة الموارد | تأخير أو إيقاف
6 | أسباب قانونية | الجهة القانونية | إيقاف
```

#### نقاط التنفيذ:
- الحالات من 3 إلى 6 قد تكون مؤقتة وقابلة للحل بتكلفة إضافية.

#### ⚙️ الخطوات / الخوارزمية: دورة حياة المشروع

> ما هدفه؟ توفير إطار عام لأي مشروع بغض النظر عن مجاله.

```algorithm
1 | Initiation | التواصل مع العميل | تحديد الأهداف
2 | Planning | تقدير التكلفة والجدولة | أهم خطوة — تحديد الجدول والتكلفة والأدوات
3 | Execution | فريق العمل | التنفيذ حسب الجدول والميزانية
4 | Closing | اختبار الجودة | التسليم النهائي للعميل
```

#### نقاط التنفيذ:
- التخطيط هو أساس نجاح باقي المراحل.

#### ⚙️ الخطوات / الخوارزمية: Waterfall Model

```algorithm
1 | Requirements | فريق التحليل | جمع المتطلبات
2 | Analysis | المحلل | تحويل المتطلبات لمواصفات
3 | Design | المصمم | تصميم البنية
4 | Coding | المبرمج | كتابة الكود
5 | Testing | فريق الجودة | الاختبار
6 | Deployment | فريق العمليات | النشر
7 | Maintenance | فريق الصيانة | الصيانة بعد الإطلاق
```

#### نقاط التنفيذ:
- لا رجوع سهل لمرحلة سابقة بعد اعتمادها.

#### ⚙️ الخطوات / الخوارزمية: Spiral Model

```algorithm
1 | Identify Objectives | فريق التخطيط | تحديد الأهداف والبدائل
2 | Risk Analysis | محلل المخاطر | تحليل المخاطر
3 | Product Development | فريق التطوير | تطوير جزء من المنتج
4 | Evaluation | العميل | مراجعة والتخطيط للحلقة التالية
```

#### نقاط التنفيذ:
- كل حلقة أوسع من سابقتها؛ يناسب المشاريع عالية المخاطر.

#### ⚙️ الخطوات / الخوارزمية: Iterative Model

```algorithm
1 | Initial Planning | فريق المشروع | تخطيط عام أولي
2 | Planning | فريق التخطيط | تخطيط تفصيلي للدورة
3 | Requirements | المحلل | متطلبات هذه الدورة
4 | Analysis & Design | المصمم | تحليل وتصميم جزئي
5 | Implementation | المبرمج | تنفيذ الجزء
6 | Testing | فريق الجودة | اختبار الجزء
7 | Evaluation | الفريق | تقييم والعودة للتخطيط
8 | Deployment | فريق العمليات | النشر النهائي بعد اكتمال الدورات
```

#### نقاط التنفيذ:
- التركيز على تكرار التنفيذ والتقييم أكثر من تحليل المخاطر الصريح.

#### ⚙️ الخطوات / الخوارزمية: Agile Methodology

```algorithm
1 | Plan | الفريق | تخطيط الدورة القصيرة
2 | Design | المصمم | تصميم الميزة
3 | Develop | المبرمج | تطوير الكود
4 | Test | فريق الجودة | الاختبار
5 | Deploy | فريق العمليات | النشر
6 | Review | الفريق بالكامل | المراجعة والتغذية الراجعة
```

#### نقاط التنفيذ:
- دورات قصيرة ومتكررة تناسب المتطلبات المتغيرة.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| دورة تكرارية بأربع خطوات | `Plan → Execute → Test/Evaluate → Repeat` | في `Spiral`, `Iterative`, `Agile` جميعها بأشكال مختلفة |
| مثلث القيود المتعارضة | `Cost` \| `Time` \| `Quality` | أي تحليل مقايضة (`Trade-off`) في إدارة المشروع |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| نزاع بين فردين في الفريق | إعادة توزيع الفريق (Shuffle) لفصلهما، أو الفصل كحل أخير | لأن استمرار النزاع يبطئ الفريق أكثر من إعادة التنظيم |
| تجاوز الميزانية بسبب تقلب أسعار المواد | مراجعة الميزانية وربما البحث عن مصدر محلي بدل الاستيراد | لتقليل تكلفة الاستيراد للوحدة الواحدة |
| متطلبات العميل غير مؤكدة أو متغيرة باستمرار | اختيار `Agile` بدل `Waterfall` | لأن `Agile` يتيح تعديل الاتجاه كل دورة قصيرة |
| فريق كبير جداً وأداؤه يتراجع | تقليل الحجم أو إعادة الهيكلة بدل إضافة المزيد | لتجنب تجاوز `Breaking Point` وزيادة وقت التنسيق بدل التنفيذ |

---
## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)
> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25% (4 أسئلة) / سيناريو 35% (6 أسئلة) / تطبيق 30% (5 أسئلة) / تتبع خوارزمية 10% (1 سؤال).

### السؤال 1 (متوسط)
ما الفرق الجوهري بين `Project` و`Operation`؟
أ) المشروع أرخص دوماً
ب) المشروع مؤقت وله هدف محدد، بينما العملية التشغيلية مستمرة
ج) العملية التشغيلية تحتاج فريقاً أكبر
د) لا يوجد فرق حقيقي
**الإجابة الصحيحة: ب**
**التعليل:** التعريف الأساسي للمشروع هو `temporary endeavor` بهدف محدد. (أ) و(ج) غير مذكورين كمعيار للتفريق. (د) خاطئ لأن المحاضرة تفرّق بينهما ضمنياً عبر تعريف `temporary`.

### السؤال 2 (سهل)
أي من التالي **ليس** أحد مكونات المشروع الأربعة؟
أ) Target ب) Resources ج) Marketing Plan د) Stakeholders
**الإجابة الصحيحة: ج**
**التعليل:** المكونات الأربعة هي `Target`, `Resources`, `Stakeholders`, `Clients/Customers`. خطة التسويق لم تُذكر كمكوّن مستقل.

### السؤال 3 (متوسط)
منظمة إغاثة تقدم مساعدات للنازحين (`IDPs`)، كيف تقيس نجاح مشروعها حسب المحاضرة؟
أ) بالربح المالي المحقق
ب) بعدد العائلات التي تمت مساعدتها
ج) بعدد الموظفين العاملين
د) بمدة تنفيذ المشروع فقط
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة تنص صراحة أن قطاع الإغاثة (IDPs) يقاس بعدد العائلات، ليس بالربح (أ) أو عدد الموظفين (ج) أو المدة فقط (د).

### السؤال 4 (صعب)
مشروع كانت ميزانيته 300M، وتكلفته الفعلية أصبحت 1.5B. أي نوع علاقة بين `Budget` و`Cost` تنطبق هنا، وما اسم المشروع الذي ورد كمثال؟
أ) Budget Surplus — نفق المانش
ب) Budget Balance — F-35
ج) Budget Deficit — أولمبياد مونتريال 1976
د) Budget Deficit — سد الممرات الثلاثة
**الإجابة الصحيحة: ج**
**التعليل:** التكلفة (1.5B) أكبر من الميزانية (300M) وهذا `Deficit`. المثال المطابق بالأرقام في المحاضرة هو أولمبياد مونتريال 1976. نفق المانش أرقامه مختلفة (5.5B → 9.5B)، وF-35 لم تُذكر له ميزانية أولية بهذه الطريقة، وسد الممرات الثلاثة لم يُذكر كمثال عجز مالي بل كمثال جدول زمني طويل.

### السؤال 5 (متوسط)
ما السبب **الرئيسي** لانخفاض السرعة الكلية عند تجاوز عدد أفراد الفريق نقطة معينة حسب المحاضرة؟
أ) نقص الأجهزة والمعدات
ب) ارتفاع تكلفة الرواتب
ج) تحوّل معظم الوقت لإدارة الفريق وحل النزاعات بدل التنفيذ
د) بطء الإنترنت في مكان العمل
**الإجابة الصحيحة: ج**
**التعليل:** نص المحاضرة صريح: السبب الرئيسي هو تحوّل الوقت نحو إدارة الفرق وحل النزاعات الشخصية/بين الأقسام بدل حل مشاكل الإنتاج. باقي الخيارات غير مذكورة كسبب.

### السؤال 6 (سهل)
أي العبارات التالية صحيحة بخصوص `Clients` و`Stakeholders`؟
أ) كل `Stakeholder` هو `Client`
ب) كل `Client` هو `Stakeholder`، لكن العكس غير صحيح
ج) هما مترادفان تماماً
د) لا علاقة بينهما إطلاقاً
**الإجابة الصحيحة: ب**
**التعليل:** `Stakeholders` مصطلح أوسع (`umbrella term`)، بينما `Clients` فئة فرعية محددة ضمنه. لذلك (أ) خاطئ (معكوس)، و(ج) و(د) خاطئان لأن هناك علاقة تبعية واضحة بينهما.

### السؤال 7 (متوسط)
شركة `TSMC` أخّرت افتتاح مصانعها في الولايات المتحدة. ما السبب الذي ذكرته المحاضرة؟
أ) عدم توفر الأراضي
ب) قضايا قانونية متعلقة ببراءات الاختراع
ج) ندرة المهندسين المهرة وذوي الخبرة
د) رفض الحكومة الأمريكية التمويل
**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة تذكر صراحة أن السبب هو ندرة المهندسين المهرة وذوي الخبرة لتشغيل هذه المنشآت، وليس أياً من الأسباب الأخرى.

### السؤال 8 (صعب)
### السيناريو: شركة تعمل على مشروع برمجي بمتطلبات تتغير كل أسبوعين بناءً على ملاحظات المستخدمين المبكرين.
أي نموذج تطوير هو الأنسب حسب ما ورد في المحاضرة؟
أ) Waterfall ب) Agile ج) لا يهم النموذج طالما الفريق كفؤ د) Spiral فقط لأنه الأحدث
**الإجابة الصحيحة: ب**
**التعليل:** `Agile` يعتمد على دورات قصيرة ومتكررة (`Plan-Design-Develop-Test-Deploy-Review`) تتيح التكيف السريع مع تغير المتطلبات، بعكس `Waterfall` الخطي الجامد. (ج) خاطئ لأن اختيار النموذج مؤثر فعلاً، و(د) مبالغة غير مبررة بالنص.

### السؤال 9 (متوسط)
حسب المحاضرة، نماذج `Waterfall`, `Spiral`, `Iterative`, `Agile` تُعتبر:
أ) بديلاً كاملاً عن إدارة المشروع
ب) جزءاً من إدارة المشروع فقط
ج) غير مرتبطة بإدارة المشروع إطلاقاً
د) أدوات مالية فقط
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "They represent the life cycle of the project, they are NOT project management, they are a PART of project management."

### السؤال 10 (سهل)
ما هي المرحلة التي وصفتها المحاضرة بأنها **الأهم** في دورة حياة المشروع؟
أ) Initiation ب) Planning ج) Execution د) Closing
**الإجابة الصحيحة: ب**
**التعليل:** النص يصف مرحلة `Planning` بأنها "considered the most critical step in management".

### السؤال 11 (متوسط)
### السيناريو: مشروع بناء طريق واجه ارتفاعاً مفاجئاً في أسعار الحديد بسبب تعريفات جمركية جديدة أثناء التنفيذ.
أي فئة من أسباب العجز المالي التي وردت في المحاضرة تنطبق هنا؟
أ) تخطيط ضعيف منذ البداية
ب) حوادث بسبب نقص إجراءات السلامة
ج) تغيّر في أسعار المواد بسبب تغير القوانين/الرسوم
د) اكتشافات غير متوقعة أثناء التنفيذ
**الإجابة الصحيحة: ج**
**التعليل:** النص يذكر صراحة "change in material prices" و"a change in the laws... that causes extra new expenses" كأسباب للعجز، وهذا يطابق التعريفات الجمركية الجديدة تحديداً.

### السؤال 12 (سهل)
ما تعريف `Client` مقارنة بـ`Customer` العادي حسب المحاضرة؟
أ) لا فرق بينهما إطلاقاً
ب) العميل (Client) له علاقة مستمرة غالباً بعقد، بخلاف الزبون العابر
ج) الزبون العادي أكثر أهمية للمنظمة
د) العميل يدفع أقل من الزبون العادي
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن `Client` "usually has a direct, ongoing relationship... often involves a contract" بخلاف الزبون ذي المعاملة الواحدة (`one-time transaction`).

### السؤال 13 (صعب)
### السيناريو: مشروع سد الممرات الثلاثة استمر من 1994 إلى 2012 (18 سنة)، وزادوا ارتفاعه لاحقاً عام 2015.
ما الاستنتاج الصحيح من هذا المثال حسب سياق المحاضرة؟
أ) المشاريع الطويلة ليست مشاريع حقيقية
ب) "المؤقت" (temporary) في تعريف المشروع لا يعني بالضرورة "قصير"
ج) كل سد في العالم يأخذ نفس المدة
د) الزيادة في الارتفاع تعني فشل المشروع الأصلي
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة تستخدم هذا المثال تحديداً لتوضيح أن الحد الزمني (temporary) لا يعني قصر المدة، بل فقط وجود بداية ونهاية محددتين، مهما طالت المدة.

### السؤال 14 (متوسط)
أي من التالي يُصنَّف كنتيجة **غير ملموسة** (`Intangible Result`) للمشروع؟
أ) الربح المالي ب) الحصة السوقية ج) السمعة الجيدة د) الأسهم للمساهمين
**الإجابة الصحيحة: ج**
**التعليل:** السمعة الجيدة (`Good reputation`) مذكورة صراحة ضمن النتائج غير الملموسة، بينما باقي الخيارات كلها نتائج ملموسة (`Tangible`).

### السؤال 15 (صعب)
### السيناريو: مدير مشروع أضاف 10 موظفين جدد لفريق متأخر عن جدوله المكوّن أصلاً من 25 شخصاً، فازداد التأخير بدل أن يتحسن.
ما التفسير الأقرب لما ورد في المحاضرة؟
أ) الفريق تجاوز على الأرجح "نقطة الانهيار" (Breaking Point) الخاصة بحجم هذا المشروع
ب) الموظفون الجدد غير مؤهلين بالضرورة
ج) الميزانية لم تكن كافية لدفع رواتبهم
د) هذا لا يحدث أبداً في الواقع
**الإجابة الصحيحة: أ**
**التعليل:** المحاضرة تشرح أن زيادة الأفراد بعد نقطة معينة (تختلف حسب حجم المشروع) تقلل السرعة الكلية بسبب زيادة وقت التنسيق والنزاعات، وهذا يطابق السيناريو تماماً دون افتراضات إضافية كـ(ب) أو (ج) غير المذكورة في النص.

### السؤال 16 (متوسط) — تتبع خوارزمية
بالنظر إلى خوارزمية `Project Life Cycle` (Start → Plan → Execute → Finish)، إذا اكتشف الفريق في مرحلة `Execute` أن الجدول الزمني الموضوع في `Plan` غير واقعي، فما الأثر الأقرب حسب منطق المحاضرة؟
أ) لا يوجد أي أثر لأن كل مرحلة مستقلة تماماً
ب) يتأثر التنفيذ سلباً لأن `Planning` هي الأساس الذي تعتمد عليه بقية المراحل
ج) يجب إلغاء المشروع فوراً
د) هذا يعني أن `Initiation` كانت خاطئة
**الإجابة الصحيحة: ب**
**التعليل:** بما أن `Planning` "considered the most critical step... because the entire execution depends on it"، فأي خلل فيها ينعكس مباشرة على مرحلة `Execution` اللاحقة، وليس بالضرورة يستدعي إلغاء المشروع أو يعني خطأ في `Initiation`.

---
## الجزء الرابع: أسئلة تصحيح الكود
> ملاحظة: هذه المحاضرة نظرية بلا أكواد برمجية فعلية، لذلك الأسئلة هنا تُطبَّق على **منطق حسابي/مفاهيمي (pseudo-code)** بدلاً من كود حقيقي — `(شرح زيادة للفهم)`.

### سؤال تصحيح 1 — نوع الخطأ: wrong_formula (منطقي)

**الكود (يحتوي خطأ):**
```text
// Determine budget status
if cost > budget:
    status = "Surplus"      // (1) خطأ هنا
elif cost < budget:
    status = "Deficit"      // (2) خطأ هنا
else:
    status = "Balance"
```
**اكتشف الخطأ:** الشرطان معكوسان: `cost > budget` يجب أن يعطي `Deficit` وليس `Surplus`، والعكس صحيح للحالة الثانية.

**التصحيح:**
```text
if cost > budget:
    status = "Deficit"
elif cost < budget:
    status = "Surplus"
else:
    status = "Balance"
```
**شرح الحل:**
1. `Deficit` تعني أن التكلفة الفعلية تجاوزت الميزانية المخططة (`cost > budget`).
2. `Surplus` تعني أن التكلفة أقل من الميزانية (`cost < budget`).
3. `Balance` هي الحالة الطبيعية عندما يتساوى الاثنان تماماً.

### سؤال تصحيح 2 — نوع الخطأ: misconception (سوء فهم)

**الكود (يحتوي خطأ):**
```text
// Classify a person's relationship with the project
function classify(person):
    if person.has_interest_in_project:
        return "Client"      // (1) خطأ هنا
    return "Stakeholder"
```
**اكتشف الخطأ:** المنطق معكوس مفاهيمياً؛ مجرد وجود "اهتمام" بالمشروع يجعل الشخص `Stakeholder` (المصطلح الأوسع)، وليس بالضرورة `Client` (الذي يتطلب علاقة تعاقدية مستمرة).

**التصحيح:**
```text
function classify(person):
    if person.has_ongoing_contractual_relationship:
        return "Client"
    elif person.has_interest_in_project:
        return "Stakeholder"
```
**شرح الحل:**
1. `Stakeholder` هو المصطلح الشامل لأي طرف "مهتم" بالمشروع.
2. `Client` هو فئة فرعية أضيق تشترط علاقة تعاقدية/مستمرة.
3. الخطأ الأصلي كان يجعل كل مهتم `Client` مباشرة، وهذا يخالف تعريف المحاضرة.

### سؤال تصحيح 3 — نوع الخطأ: logic (منطقي)

**الكود (يحتوي خطأ):**
```text
// Decide if project truly "succeeded" when it ends
function did_project_succeed(reason_for_ending):
    return true    // (1) خطأ هنا — كل إنهاء يُعتبر نجاحاً؟
```
**اكتشف الخطأ:** الدالة تفترض أن أي سبب لإنهاء المشروع يعني نجاحه، بينما المحاضرة تذكر 6 حالات إنهاء، منها فقط تحقق الهدف يُعتبر نجاحاً حقيقياً.

**التصحيح:**
```text
function did_project_succeed(reason_for_ending):
    return reason_for_ending == "Goal Achieved"
```
**شرح الحل:**
1. من أصل 6 حالات إنهاء، حالة واحدة فقط (`تحقق الهدف`) هي نجاح فعلي.
2. باقي الحالات (هدف غير قابل للتحقيق، زوال الحاجة، انتهاء التمويل، فقدان الموارد، أسباب قانونية) هي أشكال من التوقف أو الفشل.
3. لذلك المقارنة الصحيحة يجب أن تكون بسبب الإنهاء تحديداً وليس إرجاع `true` دوماً.

### سؤال تصحيح 4 — نوع الخطأ: dead_code (كود ميت)

**الكود (يحتوي خطأ):**
```text
function manage_team_size(current_speed, headcount):
    if headcount < breaking_point:
        add_more_people()
    if headcount > breaking_point:      // (1) هذا الشرط لن يُنفَّذ أبداً إذا أضفنا دوماً في الأعلى دون حد
        reduce_people()
    return current_speed
```
**اكتشف الخطأ:** الشرط الأول يضيف أشخاصاً دون أي حد أعلى قبل فحص `breaking_point`، مما يجعل الفرع الثاني (`reduce_people`) غير قابل للوصول عملياً لأن `headcount` يستمر بالزيادة دون توقف عند `breaking_point`، وأيضاً لا تُستخدم قيمة `current_speed` المُعادة في أي منطق فعلي (كود ميت من ناحية التأثير).

**التصحيح:**
```text
function manage_team_size(current_speed, headcount):
    if headcount < breaking_point:
        add_more_people()
        current_speed = recalculate_speed(headcount)
    elif headcount > breaking_point:
        reduce_people()
        current_speed = recalculate_speed(headcount)
    return current_speed
```
**شرح الحل:**
1. استُبدل الشرط الثاني بـ`elif` لضمان تناسق فحص واحد لحالة `headcount` دون تكرار غير ضروري.
2. أُضيف تحديث فعلي لـ`current_speed` بدل إعادته دون تغيير (لتفادي الكود الميت الوظيفي).
3. هذا يعكس فكرة المحاضرة: يجب مراقبة `breaking_point` باستمرار وتعديل حجم الفريق ديناميكياً بدل الزيادة العمياء.

### سؤال تصحيح 5 — نوع الخطأ: return_check (فحص القيمة المرجعة)

**الكود (يحتوي خطأ):**
```text
function get_project_phase(phase_name):
    phases = ["Initiation", "Planning", "Execution", "Closing"]
    for p in phases:
        if p == phase_name:
            found = true
    return found       // (1) خطأ هنا — قد لا تكون found معرّفة إن لم تُطابَق أي قيمة
```
**اكتشف الخطأ:** المتغير `found` لا يُهيّأ (`initialize`) بقيمة افتراضية قبل الحلقة، فإذا لم يُطابق `phase_name` أياً من المراحل الأربع، فإن `return found` سيسبب خطأ في القيمة المرجعة (متغير غير معرّف) بدل إرجاع `false` بشكل صحيح.

**التصحيح:**
```text
function get_project_phase(phase_name):
    phases = ["Initiation", "Planning", "Execution", "Closing"]
    found = false
    for p in phases:
        if p == phase_name:
            found = true
    return found
```
**شرح الحل:**
1. يجب تهيئة `found = false` قبل الحلقة لضمان وجود قيمة مرجعة صحيحة دائماً.
2. بدون هذه التهيئة، أي اسم مرحلة غير موجود ضمن المراحل الأربع الرسمية (Initiation, Planning, Execution, Closing) سيسبب خطأً بدل إرجاع `false` بوضوح.
3. هذا يربط بمفهوم أن دورة حياة المشروع تحتوي **فقط أربع مراحل ثابتة** — أي اسم خارجها يجب أن يُرفض بوضوح لا بخطأ برمجي.

---
## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)
> هذه تمارين إضافية من إعداد الدليل، ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): حساب حالة الميزانية — fill_gaps

**السيناريو / المطلوب:**
مشروع ميزانيته `800,000$` وتكلفته الفعلية `950,000$`.

**المطلوب:**
1. احسب الفرق بين `Cost` و`Budget`.
2. صنّف الحالة (`Surplus`/`Deficit`/`Balance`).

**نموذج الحل:**
الفرق = 950,000 − 800,000 = **150,000\$** زيادة في التكلفة.
بما أن `Cost > Budget`، فالحالة هي **`Budget Deficit`** (أسوأ حالة حسب المحاضرة).

### تمرين 2 (تمرين إضافي): تصنيف Stakeholder أم Client — code_fix (مفاهيمي)

**السيناريو / المطلوب:**
حدد لكل حالة تالية إن كانت `Client` أم `Stakeholder` فقط (وليس كليهما):
1. مساهم في شركة عامة لا يستخدم منتجها أبداً.
2. عائلة توقّع عقداً شهرياً لخدمة توصيل طعام.

**المطلوب:**
1. صنّف الحالة الأولى.
2. صنّف الحالة الثانية.

**نموذج الحل:**
1. المساهم: `Stakeholder` فقط (مصلحة مالية بدون علاقة استخدام مباشرة).
2. العائلة: `Client` (علاقة تعاقدية مستمرة ومباشرة مع مزود الخدمة).

### تمرين 3 (تمرين إضافي): اختيار نموذج التطوير — scenario

**السيناريو / المطلوب:**
عميل حكومي يريد نظاماً بمواصفات موثّقة وثابتة بعقد قانوني صارم لا يمكن تعديله بسهولة.

**المطلوب:**
1. اختر النموذج الأنسب من بين `Waterfall`, `Spiral`, `Iterative`, `Agile`.
2. برّر اختيارك.

**نموذج الحل:**
الأنسب هو **`Waterfall`**، لأن المتطلبات ثابتة وموثقة بعقد، ولا حاجة للمرونة العالية التي يوفرها `Agile`؛ `Waterfall` يناسب المشاريع ذات المتطلبات المستقرة منذ البداية.

### تمرين 4 (تمرين إضافي): تحديد مرحلة دورة الحياة — fill_gaps

**السيناريو / المطلوب:**
فريق يجري حالياً اختبار الجودة (`Quality Testing`) ويستعد لتسليم المنتج للعميل.

**المطلوب:**
1. حدد المرحلة الحالية من `Project Life Cycle`.

**نموذج الحل:**
المرحلة هي **`Closing`**، لأن اختبار الجودة والتسليم النهائي مذكوران صراحة كجزء من هذه المرحلة في المحاضرة.

### تمرين 5 (تمرين إضافي): تحليل سبب العجز المالي — scenario

**السيناريو / المطلوب:**
مشروع بناء تعرّض لحادث عمل بسبب غياب إجراءات سلامة كافية، ما نتج عنه تعويضات كبيرة.

**المطلوب:**
1. صنّف سبب العجز المالي حسب فئات المحاضرة.

**نموذج الحل:**
السبب هو **"Accidents during execution due to lacking safety procedures resulting in large settlement payouts"** — وهي فئة مذكورة حرفياً ضمن أسباب العجز في المحاضرة.

---
## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تحليل مشروع NGO — case_study

**السيناريو:**
منظمة غير حكومية (`NGO`) تنفذ مشروع مساعدة قانونية للاجئين في توثيق أوراق الزواج والميلاد. المشروع ممول من جهات مانحة دولية.

**المطلوب:**
1. من هم `Stakeholders` في هذا المشروع؟
2. من هم `Clients`؟
3. كيف يُقاس نجاح هذا المشروع؟

**نموذج الحل:**
1. `Stakeholders`: الجهات المانحة الدولية (كما ورد "the benefactors are the stakeholders").
2. `Clients`: اللاجئون المستفيدون مباشرة من الخدمة القانونية.
3. النجاح يُقاس بعدد الأفراد/العائلات الذين تمت مساعدتهم، وليس بالربح المالي.

### تمرين 2: إكمال مخطط دورة الحياة — diagram_completion

**السيناريو:**
أمامك مخطط بأربع خانات فارغة يمثل دورة حياة مشروع.

**المطلوب:**
1. أكمل الخانات الأربع بالترتيب الصحيح.

**نموذج الحل:**
`Start (Initiation) → Plan (Planning) → Execute (Execution) → Finish (Closing)`

### تمرين 3: جدول قرار — اختيار نموذج تطوير — table_fill

**السيناريو:**
أربعة مشاريع مختلفة بخصائص متفاوتة.

**المطلوب:**
1. أكمل الجدول التالي باختيار النموذج الأنسب لكل مشروع.

| المشروع | الخاصية | النموذج المناسب |
| --- | --- | --- |
| نظام حكومي بعقد صارم | متطلبات ثابتة تماماً | ؟ |
| تطبيق ستارت-أب ناشئ | متطلبات تتغير أسبوعياً | ؟ |
| مشروع بحثي عالي المخاطر | يحتاج تحليل مخاطر مستمر | ؟ |

**نموذج الحل:**

| المشروع | الخاصية | النموذج المناسب |
| --- | --- | --- |
| نظام حكومي بعقد صارم | متطلبات ثابتة تماماً | `Waterfall` |
| تطبيق ستارت-أب ناشئ | متطلبات تتغير أسبوعياً | `Agile` |
| مشروع بحثي عالي المخاطر | يحتاج تحليل مخاطر مستمر | `Spiral` |

### تمرين 4: تحليل مكتوب — أزمة فريق كبير — written_analysis

**السيناريو:**
مدير مشروع لدى فريق مكوّن من 90 مبرمجاً لمشروع صغير الحجم مشابه لموقع `WordPress` بسيط، والمشروع لا يزال متأخراً رغم كبر الفريق.

**المطلوب:**
1. حلّل الوضع بالاستناد لمفهوم `Breaking Point`.
2. اقترح إجراءً تصحيحياً.

**نموذج الحل:**
1. حسب المحاضرة، مشروع بسيط كموقع `WordPress` لا يحتاج فريقاً كبيراً؛ فريق من 90 شخصاً على الأرجح تجاوز `Breaking Point` منذ البداية، مما يجعل معظم الوقت يُصرف على التنسيق والنزاعات بدل الإنتاج الفعلي.
2. الإجراء الصحيح هو **تقليص حجم الفريق** إلى ما يتناسب مع حجم المشروع الفعلي، وليس إضافة المزيد من الأفراد.

### تمرين 5: سيناريو مؤسسي — شركة مساهمة عامة — case_study

**السيناريو:**
شركة مساهمة عامة (Publicly Traded) تطلق مشروعاً تقنياً داخلياً.

**المطلوب:**
1. من هم `Stakeholders` هنا حسب المثال المذكور في المحاضرة؟
2. هل مجلس الإدارة هو نفسه العميل (`Client`)؟

**نموذج الحل:**
1. `Stakeholders` هم المساهمون ممثَّلين بمجلس الإدارة (Board of Directors) كما ورد حرفياً في المحاضرة.
2. لا بالضرورة — مجلس الإدارة يمثّل `Stakeholders`، بينما `Client` (في حالة المشروع التقني الداخلي) قد يكون قسماً آخر داخل الشركة أو المستخدم النهائي للنظام، وهما دوران مختلفان حتى لو تداخلا أحياناً.

---
## الجزء الرابع: تمارين تتبع التنفيذ
> هذه تمارين إضافية من إعداد الدليل لاختبار الفهم العميق بتتبع التنفيذ خطوة بخطوة.

### تمرين تتبع 1: تتبّع حالة الميزانية عبر مراحل المشروع

**المدخل:**
```text
Budget = 1,000,000$
Month 1 cost so far = 200,000$
Month 2 cost so far = 550,000$ (accumulated)
Month 3 cost so far = 1,100,000$ (accumulated)
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | مقارنة تكلفة الشهر الأول بالميزانية الكلية | ؟ |
| 2 | مقارنة تكلفة الشهر الثاني التراكمية بالميزانية | ؟ |
| 3 | مقارنة تكلفة الشهر الثالث التراكمية بالميزانية | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | 200,000 < 1,000,000 | ضمن الميزانية (لا يوجد حكم نهائي بعد — المشروع مستمر) |
| 2 | 550,000 < 1,000,000 | لا يزال ضمن الميزانية |
| 3 | 1,100,000 > 1,000,000 | **Budget Deficit** — تجاوزت التكلفة التراكمية الميزانية الكلية |

**النتيجة:** المشروع انتقل من وضع آمن إلى حالة **`Budget Deficit`** بحلول الشهر الثالث.

### تمرين تتبع 2: تتبّع سرعة الفريق مقابل عدد الأفراد

**المدخل:**
```text
Headcount: 5 → Speed: 0.3
Headcount: 20 → Speed: 1.0 (peak)
Headcount: 60 → Speed: 0.6
Headcount: 100 → Speed: 0.45
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | عدد الأفراد | هل تجاوزنا Breaking Point؟ |
| --- | --- | --- |
| 1 | 5 | ؟ |
| 2 | 20 | ؟ |
| 3 | 60 | ؟ |
| 4 | 100 | ؟ |

**نموذج الحل:**
| الخطوة | عدد الأفراد | هل تجاوزنا Breaking Point؟ |
| --- | --- | --- |
| 1 | 5 | لا — السرعة لا تزال في مرحلة الصعود |
| 2 | 20 | هذه هي **نقطة الذروة/Breaking Point** (أعلى سرعة مسجّلة) |
| 3 | 60 | نعم — تجاوزنا النقطة والسرعة بدأت بالانخفاض |
| 4 | 100 | نعم — استمرار الانخفاض، السرعة الآن أقل من نصف الذروة |

**النتيجة:** أعلى سرعة (`Speed = 1.0`) تحدث عند `Headcount = 20`؛ أي زيادة بعد ذلك تقلل السرعة الكلية للمشروع.

### تمرين تتبع 3: تتبّع مراحل دورة حياة مشروع برمجي بمنهجية Waterfall

**المدخل:**
```text
حدث: "تم توقيع العقد وتحديد متطلبات العميل"
حدث: "تم الانتهاء من كتابة الكود بالكامل"
حدث: "تم تسليم النظام للعميل بعد اختبار الجودة"
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | الحدث | مرحلة Project Life Cycle المقابلة |
| --- | --- | --- |
| 1 | توقيع العقد وتحديد المتطلبات | ؟ |
| 2 | الانتهاء من كتابة الكود | ؟ |
| 3 | تسليم النظام بعد اختبار الجودة | ؟ |

**نموذج الحل:**
| الخطوة | الحدث | مرحلة Project Life Cycle المقابلة |
| --- | --- | --- |
| 1 | توقيع العقد وتحديد المتطلبات | `Initiation` |
| 2 | الانتهاء من كتابة الكود | `Execution` |
| 3 | تسليم النظام بعد اختبار الجودة | `Closing` |

**النتيجة:** الأحداث الثلاثة تغطي 3 من أصل 4 مراحل؛ مرحلة `Planning` (تقدير الجدول والتكلفة) تحدث ضمنياً بين الحدثين الأول والثاني ولم تُذكر صراحة في هذا المثال.

---
## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما تعريف `Project` حسب المحاضرة؟
A: مسعى مؤقت (`temporary endeavor`) لإنتاج منتج أو خدمة أو نتيجة مميزة.

**Q2:** ما أهم مكوّن في المشروع ولماذا؟
A: `Target/Goal`، لأنه يحدد كيفية قياس نجاح أو فشل المشروع.

**Q3:** ما الفرق بين `Budget` و`Cost`؟
A: `Budget` هو التكلفة المتوقعة المخطط لها، و`Cost` هو المال الفعلي المصروف.

**Q4:** ما أسوأ حالة مالية للمشروع؟
A: `Budget Deficit` (التكلفة أكبر من الميزانية).

**Q5:** ما الفرق بين `Stakeholder` و`Client`؟
A: `Stakeholder` مصطلح شامل لكل مهتم بالمشروع؛ `Client` فئة فرعية أضيق بعلاقة تعاقدية مستمرة.

**Q6:** ما مراحل `Project Life Cycle` الأربع؟
A: `Initiation`, `Planning`, `Execution`, `Closing`.

**Q7:** ما أهم مرحلة في دورة حياة المشروع؟
A: `Planning`، لأن التنفيذ بأكمله يعتمد عليها.

**Q8:** ما التعريف الفكاهي لمدير المشروع في المحاضرة، وما دلالته؟
A: شخص مقتنع أن تسع نساء يمكنهن إنجاب طفل في شهر واحد؛ دلالته أن زيادة الأفراد لا تسرّع دوماً إنجاز المشروع.

**Q9:** ما سبب انخفاض السرعة بعد تجاوز `Breaking Point` في عدد الأفراد؟
A: تحوّل معظم الوقت لإدارة الفريق وحل النزاعات بدل التنفيذ الفعلي.

**Q10:** هل نماذج `Waterfall`/`Agile` تُعتبر إدارة مشروع كاملة؟
A: لا، هي جزء فقط من إدارة المشروع وتمثّل دورة حياة التطوير التقني.

**Q11:** كيف تقيس منظمة إغاثة نجاح مشروعها؟
A: بعدد الأشخاص أو العائلات التي ساعدتها، وليس بالربح المالي.

**Q12:** اذكر مثالاً واحداً على مشروع عانى من `Budget Deficit` والسبب.
A: نفق المانش (Channel Tunnel) — الميزانية 5.5B GBP والتكلفة 9.5B GBP بسبب نوع تربة غير متوقع.

**Q13:** ما الفرق بين النتائج الملموسة وغير الملموسة للمشروع؟
A: الملموسة تُقاس مباشرة بالأرقام (ربح، أسهم)، وغير الملموسة قيمة استراتيجية غير مباشرة (سمعة، انتشار العلامة).

**Q14:** متى نعتبر مشروعاً "منتهياً" لكن **ليس** ناجحاً؟
A: في 5 من 6 حالات: هدف غير قابل للتحقيق، زوال الحاجة، انتهاء التمويل، فقدان الموارد، أو أسباب قانونية.

---
## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)
> ملاحظة: لم تتضمن هذه المحاضرة برنامجاً واحداً متكاملاً مُجزَّأ عبر أقسام متعددة (لا يوجد `Git`/`Docker`/`CI-CD` فعلي هنا — هذه المواضيع أُعلن عنها فقط في قسم "Now what?" لتُشرح لاحقاً). بدلاً من ذلك، هذا مرجع pseudocode واحد يجمع منطق **تصنيف حالة المشروع** المشتق من عدة أقسام في هذه المحاضرة (الميزانية، أصحاب المصلحة، مراحل الحياة) — `(شرح زيادة للفهم)`.

#### 💻 الكود: مرجع تصنيف حالة المشروع الشامل

#### ما هذا الكود؟
> يجمع ثلاث دوال مشتقة من مفاهيم المحاضرة: تصنيف الميزانية، تصنيف الطرف (Client/Stakeholder)، وتحديد مرحلة دورة الحياة — في ملف مرجعي واحد للمراجعة السريعة.

```text
// budget_classifier.txt — Reference logic derived from Lecture 1 concepts

// 1) Classify budget status
function classify_budget(budget, cost):
    if cost == budget:
        return "Balance"        // the norm, as stated in the lecture
    elif cost < budget:
        return "Surplus"        // best case scenario
    else:
        return "Deficit"        // worst case scenario

// 2) Classify a party's relationship to the project
function classify_party(has_contract, has_interest):
    if has_contract:
        return "Client"          // ongoing, contractual relationship
    elif has_interest:
        return "Stakeholder"     // broader umbrella term
    else:
        return "Unrelated"

// 3) Identify current life cycle phase
function current_phase(activity):
    if activity == "defining goals with client":
        return "Initiation"
    elif activity == "estimating cost and schedule":
        return "Planning"
    elif activity == "implementing per schedule/budget":
        return "Execution"
    elif activity == "quality testing and handover":
        return "Closing"
    else:
        return "Unknown Phase"
```

#### شرح كل سطر:
1. `classify_budget(budget, cost)` → دالة — تحدد حالة الميزانية الثلاثة (`Balance`/`Surplus`/`Deficit`) حسب مقارنة `cost` بـ`budget`.
2. `if cost == budget: return "Balance"` → الحالة الطبيعية — لأن النص يصفها بـ"the norm".
3. `elif cost < budget: return "Surplus"` → أفضل حالة — التكلفة أقل من المخطط.
4. `else: return "Deficit"` → أسوأ حالة — التكلفة تجاوزت المخطط.
5. `classify_party(has_contract, has_interest)` → دالة — تميّز بين `Client` و`Stakeholder` بناءً على وجود علاقة تعاقدية.
6. `if has_contract: return "Client"` → علاقة تعاقدية مستمرة تُصنَّف عميلاً مباشرة.
7. `elif has_interest: return "Stakeholder"` → مجرد اهتمام بدون عقد يبقيه `Stakeholder` فقط.
8. `current_phase(activity)` → دالة — تُطابق النشاط الحالي بإحدى مراحل `Project Life Cycle` الأربع.
9. الحالات الأربع (`Initiation`, `Planning`, `Execution`, `Closing`) تعكس حرفياً تعريفات المحاضرة لكل مرحلة.

**المكتبات المطلوبة (Imports):**
> لا يوجد — هذا `pseudocode` توضيحي فقط وليس لغة برمجة فعلية.

**الناتج المتوقع (لقطة الشاشة):**
> عند استدعاء `classify_budget(1000000, 1100000)` يكون الناتج `"Deficit"`. عند استدعاء `classify_party(true, true)` يكون الناتج `"Client"`. عند استدعاء `current_phase("quality testing and handover")` يكون الناتج `"Closing"`.

---
## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان
> ≥8 أسئلة بهيكل ثابت (تعريف + مكونات/شروط + مثال + متى نستخدم).

### سؤال 1: عرّف `Project` واذكر لماذا يُعتبر `Target` أهم مكوّن فيه.
**نموذج الإجابة:**
1. التعريف: مسعى مؤقت لإنتاج منتج أو خدمة أو نتيجة مميزة.
2. المكونات/الشروط: يجب أن يكون له هدف محدد بوضوح.
3. مثال: بناء منزل بمواصفات محددة.
4. متى نستخدم: أي نشاط له بداية ونهاية وهدف واضح، بعكس العمليات التشغيلية المستمرة.

### سؤال 2: اشرح مفهوم `Iron Triangle` في إدارة المشاريع.
**نموذج الإجابة:**
1. التعريف: العلاقة المتشابكة بين `Cost`, `Time`, `Quality/Scope` بحيث يؤثر أي تغيير في أحدها على البقية.
2. المكونات/الشروط: التكلفة، الوقت، الجودة/النطاق.
3. مثال: تسريع الجدول الزمني عادة يزيد التكلفة أو يقلل الجودة.
4. متى نستخدم: عند تحليل أي مقايضة (Trade-off) في تخطيط أو تنفيذ مشروع.

### سؤال 3: ما الفرق بين `Budget Surplus`, `Balance`, و`Deficit`؟
**نموذج الإجابة:**
1. التعريف: ثلاث حالات تصف العلاقة بين التكلفة الفعلية والميزانية المخططة.
2. المكونات/الشروط: `Surplus` (cost<budget), `Balance` (cost=budget), `Deficit` (cost>budget).
3. مثال: أولمبياد مونتريال 1976 (Deficit كبير).
4. متى نستخدم: عند تقييم الأداء المالي لمشروع منتهٍ أو قيد التنفيذ.

### سؤال 4: عرّف `Stakeholders` ووضّح الفرق عن `Clients`.
**نموذج الإجابة:**
1. التعريف: أي فرد أو مجموعة أو منظمة لها مصلحة في نتيجة المشروع.
2. المكونات/الشروط: أوسع من `Clients`؛ يشمل مساهمين، موظفين، مستثمرين، جهات تنظيمية، مستخدمين.
3. مثال: في شركة مساهمة عامة، `Stakeholders` هم المساهمون ممثَّلين بمجلس الإدارة.
4. متى نستخدم: عند تحليل كل الأطراف المتأثرة بالمشروع، وليس فقط من يشتري المنتج.

### سؤال 5: اشرح مراحل `Project Life Cycle` الأربع.
**نموذج الإجابة:**
1. التعريف: سلسلة المراحل التي يمر بها أي مشروع من بدايته حتى تحقيق أهدافه النهائية.
2. المكونات/الشروط: `Initiation`, `Planning`, `Execution`, `Closing`.
3. مثال: توقيع عقد (Initiation) ← تقدير تكلفة وجدول (Planning) ← تنفيذ (Execution) ← تسليم واختبار جودة (Closing).
4. متى نستخدم: كإطار عام لأي مشروع بغض النظر عن منهجية التطوير المستخدمة.

### سؤال 6: لماذا لا تضمن زيادة عدد أفراد الفريق تسريع المشروع؟
**نموذج الإجابة:**
1. التعريف: مفهوم مشتق من تشبيه "الشهر-الرجل" الفكاهي في المحاضرة.
2. المكونات/الشروط: وجود `Breaking Point` يختلف حسب حجم المشروع.
3. مثال: لعبة ضخمة كـCyberpunk 2077 تحتاج فريقاً كبيراً، بعكس موقع WordPress بسيط.
4. متى نستخدم: عند اتخاذ قرار بشأن توسيع أو تقليص فريق مشروع متأخر.

### سؤال 7: ما العلاقة بين نماذج التطوير (`Waterfall`, `Agile`, ...) وإدارة المشروع؟
**نموذج الإجابة:**
1. التعريف: هذه النماذج تمثّل دورة حياة **التطوير التقني** فقط.
2. المكونات/الشروط: هي جزء (`PART`) من إدارة المشروع، وليست بديلاً عنها.
3. مثال: نموذج `Agile` يُستخدم ضمن مرحلة `Execution` من `Project Life Cycle`.
4. متى نستخدم: عند اختيار أسلوب تنفيذ تقني ضمن خطة إدارة مشروع أوسع.

### سؤال 8: اذكر الحالات الست لإنهاء المشروع، وميّز أيها نجاح حقيقي.
**نموذج الإجابة:**
1. التعريف: طرق مختلفة قد ينتهي بها المشروع، ليست كلها نجاحاً.
2. المكونات/الشروط: تحقق الهدف (نجاح)، هدف غير قابل للتحقيق، زوال الحاجة، انتهاء التمويل، فقدان الموارد، أسباب قانونية (كلها فشل/توقف).
3. مثال: تأخر مصانع TSMC بسبب ندرة المهندسين (فقدان موارد).
4. متى نستخدم: عند تقييم ما إذا كان انتهاء مشروع معين يُعد نجاحاً فعلياً أم لا.

### سؤال 9: ما نتائج الإدارة السيئة للمشاريع؟ اذكر ثلاثة على الأقل.
**نموذج الإجابة:**
1. التعريف: عواقب مباشرة لتطبيق إدارة مشروع ضعيفة.
2. المكونات/الشروط: مثل `Missed Deadlines`, `Budget Overruns`, `Scope Creep`, `Reputational Damage`.
3. مثال: `Scope Creep` — توسع غير مخطط في المتطلبات يؤدي لتأخير وزيادة تكلفة.
4. متى نستخدم: عند تشخيص أسباب فشل مشروع قائم أو سابق.

---
## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع تعريف `Project` والتمييز بينه وبين `Operation`.
- [ ] أفهم لماذا `Target` هو أهم مكوّن في المشروع.
- [ ] أستطيع تصنيف حالة الميزانية (`Surplus`/`Balance`/`Deficit`) من مثال رقمي.
- [ ] أعرف الأمثلة الثلاثة على مشاريع تجاوزت ميزانيتها وأسبابها.
- [ ] أميّز بوضوح بين `Stakeholder` و`Client`.
- [ ] أستطيع سرد مراحل `Project Life Cycle` الأربع بالترتيب الصحيح.
- [ ] أفهم لماذا `Planning` هي أهم مرحلة.
- [ ] أفهم مفهوم `Breaking Point` وعلاقته بحجم الفريق والسرعة.
- [ ] أعرف أن نماذج التطوير (`Waterfall`, `Spiral`, `Iterative`, `Agile`) جزء من إدارة المشروع وليست بديلاً عنها.
- [ ] أستطيع تمييز الحالات الست لإنهاء المشروع وتصنيفها كنجاح أو فشل.
- [ ] أعرف الفرق بين النتائج الملموسة وغير الملموسة.
- [ ] أستطيع ربط كل نموذج تطوير (`Waterfall`/`Spiral`/`Iterative`/`Agile`) بخطواته الصحيحة.

---
## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| المحاضرة 1 (هذه) | المحاضرات القادمة (Time Management, Budgeting, DevOps, Agile) | تؤسس للمفاهيم الأساسية (Iron Triangle، دورة الحياة) التي ستُبنى عليها لاحقاً |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| Project | مؤقت + هدف محدد (Target) هو أهم مكوّن |
| Budget vs Cost | Balance = الوضع الطبيعي، Deficit = الأسوأ، Surplus = الأفضل |
| Stakeholders vs Clients | Stakeholders أوسع دوماً |
| Project Life Cycle | Initiation → Planning (الأهم) → Execution → Closing |
| Project Manager | زيادة الأفراد لها حد (Breaking Point) بعده تنخفض السرعة |
| Development Models | جزء من إدارة المشروع فقط، ليست بديلاً عنها |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `Target` | الهدف المحدد للمشروع | تعريف نجاح/فشل المشروع |
| `Iron Triangle` | Cost-Time-Quality المتشابكة | تحليل المقايضات |
| `Breaking Point` | حد أقصى لعدد الأفراد قبل انخفاض السرعة | إدارة حجم الفريق |
| `Scope Creep` | توسّع غير مخطط بالمتطلبات | تشخيص إدارة سيئة |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | كل `Client` هو `Stakeholder`، وليس العكس |
| 2 | `Balance` هو الوضع الطبيعي، وليس `Surplus` |
| 3 | `Planning` هي أهم مرحلة في دورة حياة المشروع |
| 4 | نماذج التطوير (Agile وغيرها) جزء من إدارة المشروع لا بديل عنها |
| 5 | زيادة الأفراد بلا حدود تُبطئ المشروع بعد نقطة معينة |

---

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, extra_exercises, analysis_exercises, trace_exercises, qa_cards, full_code, theory_questions, checklist, cheat_sheet
mcq_count: 16
code_blocks: 12
-->

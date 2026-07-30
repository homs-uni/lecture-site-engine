# المحاضرة 4 — DevOps (نظام العمل والنشر المستمر)
> **المادة:** إدارة المشاريع (القسم النظري والعملي) | **الموضوع:** `DevOps`, `CI/CD`, `Build Systems`, `GitLab CI/CD`, `Traefik`

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

> **تحديد فئة المحاضرة:** هذه محاضرة من فئة **DevOps & CI/CD** بامتداد عملي إلى **Docker** و **Git**، لذلك سيتم استخدام المصطلحات: `CI`, `CD`, `GitLab CI/CD`, `.gitlab-ci.yml`, `build`, `test`, `deploy`, بالإضافة إلى مفاهيم `Docker` (`Dockerfile`, `docker-compose.yml`, `image`, `container`, `network`) لأن المحاضرة تدمج الاثنين معاً في سياق واحد.

### 1. ما هو DevOps؟

#### النص الأصلي يقول:
> "A set of practices, tools, and a work culture that automates and integrates processes between software development and IT teams." ويركز على: Team empowerment, Team communication and collaboration, Process automation.

#### الشرح المبسّط:
تخيّل مطعماً فيه فريق طبخ (المطورون) وفريق تقديم وخدمة (فريق التشغيل/`IT Operations`). لو كل فريق يعمل في عزلة عن الآخر، سيحدث تأخير وسوء تفاهم بين من يجهّز الطبق ومن يقدّمه للزبون. `DevOps` هو ثقافة عمل + أدوات تجعل الفريقين يعملان كوحدة واحدة، بحيث ما إن يجهّز المطوّر "الطبق" (الكود) حتى يُقدَّم فوراً وبشكل آلي للزبون (المستخدم النهائي) دون احتكاكات يدوية.

**لماذا؟** لأن الفصل التقليدي بين "من يكتب الكود" و"من يشغّله على السيرفرات" كان يسبب تأخيراً كبيراً، أخطاء بسبب اختلاف البيئات، وضعف تواصل حول سبب فشل شيء ما. `DevOps` يدمج الاثنين بثقافة وأدوات مشتركة.

#### 💡 التشبيه:
> تخيّل خط إنتاج في مصنع سيارات لا يتوقف بين محطة تركيب المحرك ومحطة الدهان — كل محطة تُسلّم عملها تلقائياً للمحطة التالية دون انتظار موظف يدفع السيارة يدوياً.
> **وجه الشبه:** خط الإنتاج المتصل = خط `CI/CD` المؤتمت الذي ينقل الكود من "الكتابة" إلى "الإنتاج" دون تدخل يدوي.

للمؤسسات، هناك أهداف مشتركة (`Goals`) لتبني `DevOps`، وهي: `Deployment frequency`, `Faster time to market`, `Lower failure rates`, `Shorter lead times`, `Improved recovery time`. سنشرح كل واحد بالتفصيل في القسم التالي.

---

### 1.1. أهداف DevOps (Goals of DevOps)

#### النص الأصلي يقول:
> "Deployment frequency: Improving the frequency at which you release or deploy software... requires changing the way collaboration and communication within the organization..."

#### الشرح المبسّط:
**تكرار النشر (`Deployment Frequency`):** كلما زادت المرة التي تستطيع فيها المؤسسة نشر إصدار جديد من التطبيق (يومياً بدل شهرياً مثلاً)، كلما كان ذلك مؤشراً على نضج عملية `DevOps` لديها. هذا يتطلب أن يعمل المطورون وفريق التشغيل على هدف مشترك واحد بدل أهداف منفصلة.

**لماذا؟** لأن النشر المتكرر يعني أن كل نشرة (`release`) تحتوي تغييرات أصغر، وبالتالي أخطاء أقل وأسهل في الإصلاح.

#### النص الأصلي يقول:
> "Faster time to market: ...the longer it takes to release a product, the more money the business loses to its competitors"

#### الشرح المبسّط:
**سرعة الوصول إلى السوق (`Faster Time to Market`):** المؤسسات تتنافس فيما بينها، فمن يطلق ميزة جديدة أسرع يكسب حصة أكبر من السوق. `DevOps` يقلل الفجوة الزمنية بين "فكرة المنتج" و"إطلاقه فعلياً".

**لماذا؟** لأن كل يوم تأخير هو فرصة ضائعة أمام المنافسين الذين قد يطلقون ميزة مشابهة أولاً.

#### النص الأصلي يقول:
> "Lower failure rates: ...through teams collaborating with each other and communicating better..."

#### الشرح المبسّط:
**تقليل نسبة الفشل (`Lower Failure Rates`):** عندما يتشارك المطورون وفريق التشغيل المعرفة ويفهم كل طرف عمل الآخر (فرق عمل متعددة التخصصات — `Cross-functional teams`)، يقلّ احتمال حدوث أخطاء ناتجة عن سوء فهم أو نقص معلومات.

**لماذا؟** لأن أغلب الأعطال في الإنتاج تحدث بسبب فجوة معرفة بين من كتب الكود ومن يشغّله على السيرفر (مثلاً: نسيان متغيّر بيئة أو إعداد مختلف).

#### النص الأصلي يقول:
> "Shorter Lead Time: the amount of time between work starting on a user story and that story making it to release."

#### الشرح المبسّط:
**تقصير زمن التسليم (`Shorter Lead Time`):** هو الوقت الكلي من لحظة بدء العمل على مهمة (`user story`) حتى وصولها فعلياً للمستخدم. هذا يشمل كل شيء: التخطيط، البرمجة، والبنية التحتية.

**لماذا؟** لأن تقصير هذه الفجوة يعني أن قيمة العمل تصل للمستخدم أسرع، ويُبنى بناءً عليها القرار التالي بسرعة أكبر.

#### النص الأصلي يقول:
> "Improved Recovery Time: ...how long it takes to recover a service? ...An organization that measures this metric and takes steps to reduce them is an even more mature organization."

#### الشرح المبسّط:
**تحسين زمن الاسترجاع (`Improved Recovery Time`):** حتى أفضل الأنظمة تتعطل أحياناً. المؤسسات الناضجة لا تكتفي بمعايير `SLA` (مثل نسبة التوفّر)، بل تقيس أيضاً: "كم يستغرق إصلاح المشكلة عند حدوثها؟" وتعمل على تقليل هذا الزمن.

**لماذا؟** لأن الفشل حتمي في الأنظمة المعقدة، والفرق الحقيقي بين المؤسسات هو سرعة استرجاعها بعد الفشل وليس فقط تجنّب الفشل.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** هل ممكن أن ترتفع "نسبة الفشل" (`Failure Rate`) مؤقتاً عند زيادة "تكرار النشر" (`Deployment Frequency`)؟
> **لماذا هذا مهم؟** لأنه يوضّح أن هذه الأهداف الخمسة مترابطة، ولا يجب قراءتها بمعزل عن بعضها — الهدف من `CI/CD` هو تحقيق التوازن بينها كلها معاً عبر الأتمتة والاختبار.

---

### 2. كيف يعمل DevOps؟ (How DevOps Work)

#### النص الأصلي يقول:
> "DevOps requires continuation to do its work. Continuation is described as the ability to do the thing continuously time over time. In DevOps we focus on: Continuous Integration, Continuous Delivery, Continuous Deployment"

#### الشرح المبسّط:
كلمة "Continuous" (مستمر) هي جوهر `DevOps`. بدلاً من أن يحدث "الدمج" و"النشر" مرة كل عدة أشهر بشكل يدوي ومرهق، تصبح هذه العمليات مستمرة وتلقائية وتحدث بشكل متكرر جداً (أحياناً عدة مرات باليوم).

**لماذا؟** لأن التغييرات الصغيرة والمتكررة أسهل في المراقبة والتصحيح من التغييرات الكبيرة النادرة ("Big bang" changes).

هناك ثلاث مراحل متسلسلة، كل مرحلة تبني على التي قبلها:

```algorithm
1 | Continuous Integration (CI) | أدوات البناء + الاختبار الآلي | دمج الكود الجديد بشكل متكرر وإنتاج build artifact
2 | Continuous Delivery (CD) | أدوات الأتمتة + بيئة staging | أخذ الـ build artifact وتجهيزه للنشر بجدولة يحددها الفريق
3 | Continuous Deployment | pipeline كامل بدون تدخل بشري | نشر كل تغيير ناجح إلى الإنتاج تلقائياً بدون موافقة يدوية
```

#### نقاط التنفيذ:
- كل مرحلة تعتمد على نجاح المرحلة السابقة — لا يمكن تطبيق `Continuous Deployment` دون `Continuous Delivery` ودون `Continuous Integration` أولاً.
- `Continuous Integration` هو **جزء من** كلا المرحلتين الأخريين، وليس مرحلة منفصلة تماماً (شرح زيادة للفهم).

---

### 2.1. التكامل المستمر (Continuous Integration - CI)

#### النص الأصلي يقول:
> "Continuous integration (CI) is the practice of quickly integrating newly developed code with the rest of the application code to be released... produces a build artifact at the end of the process."

#### الشرح المبسّط:
`CI` تعني أن كل مطوّر يدمج الكود الذي كتبه مع الفرع الرئيسي (`main branch`) بشكل متكرر وسريع (وليس بعد أسابيع من العمل المنعزل). هذه العملية آلية بالكامل وتنتهي بإنتاج **`build artifact`** — أي حزمة جاهزة (`package`) ناتجة عن تجميع الكود.

**لماذا؟** لأن الدمج المتأخر لتغييرات كبيرة يسبب "تعارضات" (`conflicts`) معقدة يصعب حلّها، بينما الدمج المبكر والمتكرر يجعل كل تعارض صغيراً وسهل الفهم.

#### 💡 التشبيه:
> تخيّل أنك تكتب مقالاً جماعياً مع 3 زملاء على مستند واحد. لو كل واحد كتب فصلاً كاملاً لوحده لمدة شهر ثم حاولتم الدمج، ستحدث فوضى في الأسلوب والتناقضات. لكن لو كل واحد يحفظ فقرة كل ساعة ويشارك التغييرات فوراً، يسهل ملاحظة أي تعارض بسرعة.
> **وجه الشبه:** المشاركة المتكررة للفقرات = الدمج المتكرر للكود (`Continuous Integration`).

#### النص الأصلي يقول:
> "Four main types of tests exist that can be automated as part of CI: Unit tests, Integration tests, Acceptance tests, User interface tests."

#### الشرح المبسّط:
الاختبار الآلي هو الخطوة الأولى نحو `CI` حقيقي. أنواع الاختبارات الأربعة:

| نوع الاختبار | النطاق | مثال عملي |
| --- | --- | --- |
| `Unit tests` | دالة أو جزء صغير محدد من الكود | اختبار أن دالة `calculateTotal()` تُرجع الرقم الصحيح |
| `Integration tests` | تفاعل عدة مكونات معاً (وربما خدمات خارجية) | اختبار أن تطبيق يتصل بقاعدة بيانات ويحفظ سجلاً بنجاح |
| `Acceptance tests` | من ناحية منطق العمل (`business case`) | اختبار أن "عملية الشراء الكاملة" تعمل كما يتوقعها صاحب المشروع |
| `User interface tests` | من منظور المستخدم النهائي | اختبار أن زر "الدفع" يظهر ويعمل بشكل صحيح في الواجهة |

**لماذا؟** لأن كل نوع اختبار يكشف مشاكل من زاوية مختلفة — `Unit tests` تكشف أخطاء منطقية دقيقة، بينما `UI tests` تكشف مشاكل تجربة المستخدم التي لا تظهر باختبار الدوال فقط.

#### النص الأصلي يقول:
> "if the main branch becomes broken by a commit in code, then the number one priority is fixing it... Every new piece of work that you implement should have its own set of tests... it's important to make sure that your team integrate these changes daily."

#### الشرح المبسّط:
هناك 3 قواعد ذهبية للـ `CI` الفعّال:
1. إذا انكسر الفرع الرئيسي (`main branch`)، فإصلاحه هو **الأولوية القصوى** فوراً — لأن الاستمرار بالعمل فوق كود مكسور يجعل تحديد سبب الكسر أصعب مع الوقت.
2. كل عمل جديد يجب أن يأتي مع اختباراته الخاصة، للوصول إلى مستوى مقبول من **تغطية الكود** (`code coverage`).
3. يجب أن يدمج الفريق تغييراته **يومياً على الأقل** — الدمج المتكرر هو ما يجعل تحديد المشكلة سهلاً.

**لماذا؟** كل قاعدة من هذه تخدم نفس الفكرة: **كشف المشاكل مبكراً وبأصغر حجم ممكن**، بدل تراكمها.

#### الفهم الخاطئ الشائع ❌: `CI` تعني فقط "رفع الكود على `Git`".
#### الفهم الصحيح ✅: `CI` تعني الدمج المتكرر **مع** تشغيل اختبارات آلية وإنتاج `build artifact` — الرفع وحده على `Git` ليس `CI`.

---

### 2.2. التسليم المستمر (Continuous Delivery - CD)

#### النص الأصلي يقول:
> "Continuous delivery (CD) is an approach where teams release products frequently and with high quality... It builds on the work that's done in CI to take the build artifact and then deliver that build to a production environment."

#### الشرح المبسّط:
`CD` تأخذ ما أنتجه `CI` (`build artifact`) وتُجهّزه فعلياً ليكون جاهزاً للنشر إلى بيئة الإنتاج، بجودة عالية وبشكل متوقّع (`predictable`) — أي أن العملية نفسها موثوقة ومُختبرة في كل مرة.

**لماذا؟** لأن الفصل بين "الكود جاهز" و"الكود مُنشور فعلاً للمستخدم" كان يستغرق وقتاً طويلاً يدوياً في السابق؛ `CD` يجعل هذه الخطوة سريعة وآلية (لكن مع احتمال وجود موافقة يدوية أخيرة، كما سنرى في الفرق مع `Continuous Deployment`).

#### النص الأصلي يقول:
> "This feedback loop, sometimes referred to as continuous feedback, centers around delivering software to the end users as quickly as possible, learning from experience, and then taking that feedback and incorporating it into the next release."

#### الشرح المبسّط:
جوهر `CD` هو **حلقة تغذية راجعة** (`feedback loop`): أنشر → استمع لملاحظات المستخدمين والأداء → عدّل → أنشر مجدداً. هذه الحلقة السريعة هي التي تجعل `CD` قيّماً، وليس فقط سرعة النشر نفسها.

#### النص الأصلي يقول:
> "CD is a separate process to CI, but they chain off each other... With CD, you can decide on a schedule that best suits your organization, whether that's daily, weekly, or monthly."

#### الشرح المبسّط:
`CD` منفصلة عن `CI` لكنهما متسلسلتان (`chain off each other`). الفرق المهم: `CD` تعطيك **مرونة في الجدولة** — تختار متى تنشر (يومياً، أسبوعياً، شهرياً) بحسب احتياجك، لكن التوصية هي النشر بأسرع وقت ممكن بدفعات صغيرة سهلة الإصلاح عند حدوث مشكلة.

#### ⚖️ المقايضة: النشر بدفعات صغيرة متكررة مقابل دفعات كبيرة نادرة

| | دفعات صغيرة متكررة | دفعات كبيرة نادرة |
| --- | --- | --- |
| المزايا | أخطاء أسهل تحديداً وإصلاحاً، تغذية راجعة أسرع | تنسيق أقل بين النشرات، عمل أقل تكراراً على البنية التحتية |
| العيوب | تكاليف تشغيلية أعلى (نشر متكرر) | صعوبة تحديد سبب الفشل بسبب حجم التغييرات |
| متى تختاره | معظم فرق `DevOps` الحديثة | مشاريع قديمة أو أنظمة حساسة جداً تتطلب مراجعة يدوية مطوّلة |

---

### 2.3. النشر المستمر (Continuous Deployment)

#### النص الأصلي يقول:
> "Continuous deployment is one step beyond continuous delivery. Every change that passes through all the stages of your production pipeline is released to your customers. There is no human intervention – a failed test, at this stage, will prevent new releases to production."

#### الشرح المبسّط:
`Continuous Deployment` هي الخطوة الأخيرة والأكثر تقدماً: أي تغيير ينجح في اجتياز **كل** مراحل الـ `pipeline` يُنشر **تلقائياً** بدون أي موافقة بشرية. الاختبار الفاشل وحده هو ما يوقف النشر — لا يوجد "يوم إطلاق" (`release day`) محدد بشرياً.

**لماذا؟** لأن هذا يُسرّع حلقة التغذية الراجعة إلى أقصى درجة، ويريح المطوّرين من ضغط "يوم الإطلاق"، فيركزون فقط على جودة الكود وهم يعلمون أن أي كود ناجح سيصل للمستخدمين تلقائياً خلال دقائق.

#### النص الأصلي يقول:
> "Continuous integration is part of both continuous delivery and continuous deployment."

#### الشرح المبسّط:
هذه نقطة مهمة تُلخّص العلاقة بين المفاهيم الثلاثة: `CI` هي الأساس المشترك، وفوقه تُبنى إما `CD` (تسليم يمكن أن يتضمن موافقة يدوية أخيرة للنشر) أو `Continuous Deployment` (نشر تلقائي كامل بدون تدخل بشري).

#### 🔍 تتبع التنفيذ: الفرق بين CD و Continuous Deployment (بناءً على الرسم التوضيحي في المحاضرة)

**المدخل:** تغيير كود ناجح يمرّ عبر: `BUILDS → TEST → ACCEPTANCE TEST → DEPLOY TO STAGING → DEPLOY TO PRODUCTION → SMOKE TESTS`

| الخطوة | نوع العملية (Continuous Delivery) | نوع العملية (Continuous Deployment) |
| --- | --- | --- |
| BUILDS, TEST | آلي (Automatic) | آلي (Automatic) |
| ACCEPTANCE TEST | آلي (Automatic) | آلي (Automatic) |
| DEPLOY TO STAGING | آلي (Automatic) | آلي (Automatic) |
| DEPLOY TO PRODUCTION | **يدوي (Manual)** | آلي (Automatic) |
| SMOKE TESTS | آلي (Automatic) | آلي (Automatic) |

**النتيجة:** الفرق الوحيد بين `Continuous Delivery` و`Continuous Deployment` هو خطوة **"Deploy to Production"** — في `CD` هي خطوة يدوية (يضغط شخص زر الموافقة)، بينما في `Continuous Deployment` هي آلية بالكامل.

#### مهم للامتحان ⚠️:
> لا تخلط بين `Continuous Delivery` و`Continuous Deployment` — كلاهما "جاهز للنشر تلقائياً"، لكن الفرق هو **من يضغط زر النشر النهائي إلى الإنتاج**: إنسان (`Delivery`) أم النظام نفسه (`Deployment`).

---

### 3. نظام البناء (Build System)

#### النص الأصلي يقول:
> "To correctly take full advantage of CI/CD we need to use build system. Build systems are an application or set of applications used to automate the building and testing... process during software development."

#### الشرح المبسّط:
`Build System` هو الأداة التي تجعل `CI/CD` ممكناً فعلياً — هو "المحرك" الذي يقرأ الكود، يجلب المكتبات المطلوبة، يُجمّعه (`compile`)، يُشغّل الاختبارات، وينتج الحزمة النهائية. أمثلة:

| اللغة/المنصة | أدوات Build System |
| --- | --- |
| `Java` | `Maven`, `Gradle` |
| `NodeJS` | `NPM`, `PNPM`, `YARN` + scripts |

#### النص الأصلي يقول:
> "What does build system do? Manage dependencies, Build final packages, Perform testing (up to integration testing)"

#### الشرح المبسّط:
لنظام البناء 3 مهام رئيسية:
1. **إدارة الاعتماديات** (`Dependency Management`) — سنشرحها بالتفصيل في القسم 3.1.
2. **توليد الحزمة النهائية** (`Package Generation`) — سنشرحها في القسم 3.2.
3. **تنفيذ الاختبارات** حتى مستوى `Integration Testing` (وليس بالضرورة `Acceptance` أو `UI testing` التي غالباً تحتاج أدوات منفصلة).

**لماذا؟** لأن كل هذه المهام كانت تُنفَّذ يدوياً في السابق، وكانت مصدراً رئيسياً للأخطاء البشرية وإهدار الوقت — `Build System` يجعلها متكررة وموثوقة.

---

### 3.1. إدارة الاعتماديات (Dependency Management)

#### النص الأصلي يقول:
> "No application is built from zero. We need to use external libraries to speed up the process. But these libraries might have dependencies of their own... This will get complicated quickly, specifically with versions, what if 2 different libraries use 2 different versions of the same library."

#### الشرح المبسّط:
لا أحد يكتب تطبيقاً من الصفر المطلق. نستخدم مكتبات جاهزة (`libraries`) لتسريع العمل. لكن المشكلة أن كل مكتبة قد تعتمد بدورها على مكتبات أخرى (اعتماديات متداخلة)، وقد تحتاج مكتبتان مختلفتان لإصدارين مختلفين من نفس المكتبة الثالثة — هذا يخلق تعقيداً كبيراً (`dependency hell`) لو أُديرت يدوياً.

#### 💡 التشبيه:
> تخيّل أنك تطبخ وصفة تحتاج "صلصة جاهزة"، وهذه الصلصة تحتاج بدورها "زيت زيتون معيّن"، وزيت الزيتون هذا له نوعان بإصدارين مختلفين من الجودة. لو اضطررت لتتبّع كل هذا يدوياً في كل مرة تطبخ فيها، ستضيع وقتاً هائلاً.
> **وجه الشبه:** تتبّع مكونات الوصفة والوصفات الفرعية = تتبّع `dependencies` والـ `transitive dependencies` الخاصة بها.

#### النص الأصلي يقول:
> "Using dependency management will remove all those problems from the developer hand and shift them to the BS [Build System]."
> "Maven uses XML files... Gradle compile Kotlin or Groovy scripts... NPM/PNPM/YARN uses package.json file"

#### الشرح المبسّط:
`Build System` يتحمّل مسؤولية حل هذا التعقيد بدلاً من المطوّر، عبر ملف تهيئة مخصص لكل أداة:

| الأداة | نوع ملف التهيئة | مثال |
| --- | --- | --- |
| `Maven` | XML | `pom.xml` |
| `Gradle` | سكربت `Kotlin` أو `Groovy` | `build.gradle` / `build.gradle.kts` |
| `NPM`/`PNPM`/`YARN` | JSON | `package.json` |

#### 💻 الكود: إضافة اعتمادية في Maven

#### ما هذا الكود؟
> هذا مقطع XML من ملف `pom.xml` في `Maven` يضيف مكتبة `spring-dotenv` كاعتمادية للمشروع.

```xml
<dependencies>
  <!-- Define one dependency block -->
  <dependency>
    <!-- Group (organization) that publishes the library -->
    <groupId>me.paulschwarz</groupId>
    <!-- The library's artifact name -->
    <artifactId>spring-dotenv</artifactId>
    <!-- The exact version to use -->
    <version>5.1.0</version>
    <!-- When this dependency is used: compile = during code writing/build -->
    <scope>compile</scope>
  </dependency>
</dependencies>
```
#### شرح كل سطر:
1. `<dependencies>` → وسم الحاوية — يحتوي كل الاعتماديات للمشروع.
2. `<dependency>` → وسم مفرد — يمثّل مكتبة واحدة تحديداً.
3. `<groupId>me.paulschwarz</groupId>` → معرّف الجهة الناشرة — يمنع تعارض الأسماء بين مكتبات من جهات مختلفة.
4. `<artifactId>spring-dotenv</artifactId>` → اسم المكتبة الفعلي — يُستخدم في الكود لاستدعائها.
5. `<version>5.1.0</version>` → الإصدار المحدد — يضمن ثبات السلوك (`reproducibility`) بين البيئات المختلفة.
6. `<scope>compile</scope>` → متى تُستخدم — تحدد وقت الاستخدام (شرحها بالتفصيل أدناه).

> **الناتج المتوقع:** عند تشغيل `Maven`، سيتم تحميل هذه المكتبة تلقائياً (وكل اعتمادياتها الفرعية) من مستودع مركزي وربطها بالمشروع دون تدخل يدوي.

#### النص الأصلي يقول:
> "We can also specify when the dependency is used. In Maven we can say the dependency is used during code writing, compiling or testing... In NodeJS we can specify where the dependency is used, during runtime or development time... Thats why sometimes we install a package with -D/d flag."

#### الشرح المبسّط:
كل اعتمادية لها "نطاق استخدام" (`scope`) — هل هي مطلوبة فقط أثناء التطوير والاختبار، أم مطلوبة في التطبيق النهائي المنشور فعلياً؟

**لماذا؟** لأن تضمين مكتبات الاختبار مثلاً داخل الحزمة النهائية المرسلة للمستخدم يُهدر مساحة ويزيد المخاطر الأمنية دون فائدة — لذلك تُفصل بوضوح.

#### 💻 الكود: تحديد نطاق الاعتمادية في Gradle و NodeJS

```groovy
// Gradle: this dependency is only needed for running tests, not in the final app
dependencies {
    testImplementation 'org.codehaus.groovy:groovy:3.0.5'
}
```
#### شرح كل سطر:
1. `dependencies { ... }` → كتلة تعريف الاعتماديات في `Gradle`.
2. `testImplementation '...'` → الكلمة المفتاحية `testImplementation` تحدد أن هذه المكتبة تُستخدم فقط في مرحلة الاختبار، وليست جزءاً من الحزمة النهائية.

```bash
# NodeJS: install a package as a development-only dependency
npm install some-package --save-dev
# Short form using the -D flag
npm install some-package -D
```
#### شرح كل سطر:
1. `npm install some-package --save-dev` → يثبّت الحزمة ويسجّلها في قسم `devDependencies` داخل `package.json`.
2. `npm install some-package -D` → الصيغة المختصرة لنفس الأمر السابق (`-D` = `--save-dev`).

> **الناتج المتوقع:** الحزمة تُضاف إلى `devDependencies` في `package.json`، وعند بناء التطبيق للإنتاج (`production build`) لا تُضمّن هذه الحزمة في الحزمة النهائية.

#### 🛠️ استكشاف الأخطاء
| الخطأ | السبب | الحل |
| --- | --- | --- |
| تعارض إصدارات مكتبة واحدة | مكتبتان تعتمدان على إصدارين مختلفين من نفس المكتبة | استخدام أدوات حل التعارض المدمجة في `Build System` (مثل `dependency resolution` في `Gradle`) |
| المكتبة تظهر في الحزمة النهائية رغم أنها للاختبار فقط | لم يُحدَّد `scope`/`devDependency` بشكل صحيح | مراجعة `scope` في `Maven`/`Gradle` أو التأكد من استخدام `-D` في `NPM` |

---

### 3.2. توليد الحزمة (Package Generation)

#### النص الأصلي يقول:
> "Another task of build system is to generate the packaging of the application. If we are writing a desktop application we might need the build system to generate everything up to and including setup.exe. In Maven and Gradle this can be done through the use of plugins. In NodeJS we need to write custom scripts."

#### الشرح المبسّط:
بعد أن يجمع نظام البناء الاعتماديات ويُجمّع الكود، مهمته الأخيرة هي إنتاج **الحزمة النهائية** القابلة للتوزيع أو التشغيل. هذا يختلف حسب نوع التطبيق:
- تطبيق سطح مكتب → قد يحتاج ملف تثبيت كامل (`setup.exe`).
- في `Maven`/`Gradle` → يتم هذا عبر **إضافات** (`plugins`) جاهزة.
- في `NodeJS` → لا توجد إضافات جاهزة بنفس الطريقة، فيجب كتابة **سكربتات مخصصة** (`custom scripts`).

#### النص الأصلي يقول:
> "To create a setup.exe for your application you can use InnoSetup... When developing android applications we either generate APK or ABB... sometimes we compile and build a docker image."

#### الشرح المبسّط:
أمثلة عملية على مخرجات `Package Generation` حسب نوع المشروع:

| نوع التطبيق | المخرج (Output) | الأداة/الملاحظة |
| --- | --- | --- |
| تطبيق سطح مكتب Windows | `setup.exe` | أداة `InnoSetup` تستخدم سكربت لتوليد ملف التثبيت |
| تطبيق Android | `APK` أو `AAB` | `AAB` يُستخدم تحديداً للنشر على `Google Play Store` |
| تطبيق موجّه للنشر بالحاويات | `Docker Image` | يربط الموضوع بمحاضرة `Docker` السابقة (شرح زيادة للفهم) |
| تطبيق Java | ملف `JAR` | يُنتج عادةً من `Maven` أو `Gradle` |
| تطبيق NodeJS | مجلد `dist` أو `output` | يحتوي الكود النهائي الجاهز للتشغيل أو النشر |

#### مهم للامتحان ⚠️:
> لاحظ الفرق بين `APK` و `AAB` — كلاهما لتطبيقات Android، لكن `AAB` (Android App Bundle) هو التنسيق المطلوب تحديداً للنشر على متجر Google Play، بينما `APK` هو الملف القابل للتثبيت المباشر.

---

### 4. GitLab و GitHub

#### النص الأصلي يقول:
> "Similar to each other, both use git as backbone with support for Issue management and tracking, user control, package management, CI/CD (DevOps). They do support DevOps through the use of special files: .gitlab-ci.yml in Gitlab, .github/workflow/*.yml in Github"

#### الشرح المبسّط:
`GitLab` و`GitHub` منصتان متشابهتان جداً، كلاهما مبنيتان فوق نظام التحكم بالإصدارات `Git`، وتوفران: إدارة المهام (`Issues`)، صلاحيات المستخدمين، إدارة الحزم، ودعم `CI/CD`. الفرق الرئيسي العملي هو اسم وموقع ملف تهيئة الأتمتة:

| المنصة | ملف تهيئة CI/CD |
| --- | --- |
| `GitLab` | `.gitlab-ci.yml` (في جذر المستودع) |
| `GitHub` | `.github/workflow/*.yml` (يمكن وجود عدة ملفات) |

**لماذا؟** لأن كل منصة طوّرت محركها الخاص لتشغيل خطوط الأنابيب (`pipelines`)، لكن الفكرة المنطقية العامة (كتابة تسلسل خطوات كملف نصي `YAML` يُنفَّذ تلقائياً عند حدث معيّن كـ `push`) واحدة في كلتيهما.

---

### 4.1. GitLab — تحليل ملف .gitlab-ci.yml كاملاً

#### النص الأصلي يقول:
> "Let's take Gitlab... That was a simple file, it builds and deploys a docker image to the same server the Gitlab instance is running on"

#### الشرح المبسّط:
سنحلّل ملف `.gitlab-ci.yml` المقدَّم في المحاضرة قسماً بقسم، وهو مثال كامل يبني صورة `Docker` وينشرها على نفس السيرفر الذي يعمل عليه `GitLab`.

#### النص الأصلي يقول:
> "stages: - build - deploy ... What are the stages of this build"

#### الشرح المبسّط:
**`stages`**: تحدد المراحل الكبرى للـ pipeline بالترتيب. هنا مرحلتان: `build` ثم `deploy`. أي وظيفة (`job`) تنتمي لمرحلة `deploy` لن تبدأ حتى تنجح كل وظائف مرحلة `build`.

**لماذا؟** لأن هذا يضمن **ترتيباً منطقياً** — لا فائدة من محاولة نشر (`deploy`) صورة `Docker` لم تُبنَ (`build`) بعد أو فشل بناؤها.

#### النص الأصلي يقول:
> "variables: DOCKER_DRIVER: overlay2, DOCKER_TLS_CERTDIR: "", IMAGE_TAG: $CI_PIPELINE_IID ... Some environment variables to set during build time"

#### الشرح المبسّط:
**`variables`**: متغيرات بيئة (`environment variables`) تُستخدم داخل كل خطوات الـ pipeline. لاحظ أن `IMAGE_TAG` يستخدم متغير `GitLab` المدمج `$CI_PIPELINE_IID` — وهو رقم تسلسلي فريد لكل تشغيل للـ pipeline، مما يعطي كل صورة `Docker` وسماً (`tag`) فريداً يمكن تتبعه.

#### النص الأصلي يقول:
> "build-production: stage: build image: docker:latest needs: [] only: - main tags: - Main ... We define our first operation..."

#### الشرح المبسّط:
هذا تعريف أول **وظيفة (job)** باسم `build-production`:

| الحقل | القيمة | المعنى |
| --- | --- | --- |
| `stage` | `build` | تنتمي هذه الوظيفة لمرحلة `build` |
| `image` | `docker:latest` | تُنفَّذ الأوامر داخل حاوية `Docker` تحتوي أداة `docker` نفسها |
| `needs` | `[]` | لا تحتاج انتظار أي وظيفة أخرى قبلها |
| `only` | `- main` | تعمل فقط عند وجود تغيير على فرع `main` |
| `tags` | `- Main` | يجب أن تُنفَّذ على `Runner` (برنامج `GitLab` الذي يشغّل ملفات `YAML`) يحمل الوسم `Main` تحديداً |

**لماذا؟** استخدام `only: main` يمنع تشغيل هذه الوظيفة الحساسة (بناء ونشر للإنتاج) عند أي فرع تطوير آخر، فيقلل خطر النشر غير المقصود.

#### النص الأصلي يقول:
> "before_script: - docker login... script: - echo $CI_REGISTRY... docker build --no-cache -t $CI_REGISTRY_IMAGE:$IMAGE_TAG... docker push..."

#### الشرح المبسّط:
- **`before_script`**: خطوات تمهيدية قبل السكربت الرئيسي — هنا تسجيل الدخول إلى سجل الصور (`Docker Registry`) الخاص بـ `GitLab` (يمكن استبداله بـ `DockerHub`).
- **`script`**: السكربت الفعلي:
  1. طباعة قيمة المتغيرات للتأكد منها (`debugging`).
  2. بناء صورة `Docker` بوسمين: الوسم الفريد (`$IMAGE_TAG`) ووسم `latest`.
  3. رفع (`push`) كلا الوسمين إلى السجل.

**لماذا وسمان (`tags`)؟** الوسم الفريد يسمح بالرجوع لأي نسخة سابقة محددة (`rollback`)، بينما `latest` يسهّل الإشارة دائماً لآخر نسخة ناجحة.

#### النص الأصلي يقول:
> "deploy-production: stage: deploy ... script: - docker compose -f docker-compose.yml pull --policy always - docker compose -f docker-compose.yml up -d"

#### الشرح المبسّط:
وظيفة `deploy-production` تنتمي لمرحلة `deploy`، وتستخدم نفس إعدادات `stage/image/needs/only/tags` تقريباً، لكن سكربتها مختلف:
1. `docker compose ... pull --policy always` → سحب أحدث نسخة من الصور دائماً (لا تعتمد على نسخة مخزّنة محلياً قديمة).
2. `docker compose ... up -d` → تشغيل الحاويات في الخلفية (`detached mode`, علم `-d`).

**النتيجة الكلية:** ملف `.gitlab-ci.yml` هذا يبني صورة `Docker` جديدة عند كل تغيير على `main`، ثم يشغّلها فوراً على نفس السيرفر — وهذا مثال حي وكامل على `Continuous Deployment`.

#### ⚙️ الخطوات / الخوارزمية: تسلسل تنفيذ pipeline بسيط لـ GitLab

> الهدف: توضيح الترتيب الكامل لتنفيذ الـ pipeline من لحظة الـ `push` حتى ظهور التطبيق منشوراً.

```algorithm
1 | Developer يعمل git push | Git / GitLab | يُطلق GitLab Runner تلقائياً pipeline جديد
2 | Runner يبدأ مرحلة build | GitLab Runner + Docker | تسجيل دخول للـ registry، بناء صورة Docker بوسمين، رفعها
3 | نجاح مرحلة build | GitLab CI Engine | ينتقل تلقائياً لمرحلة deploy بحسب ترتيب stages
4 | Runner يبدأ مرحلة deploy | GitLab Runner + docker compose | سحب أحدث صورة وتشغيلها بـ up -d
5 | التطبيق يعمل | السيرفر المستهدف | النسخة الجديدة أصبحت متاحة للمستخدمين تلقائياً
```

#### نقاط التنفيذ:
- إذا فشلت مرحلة `build` (مثلاً فشل اختبار أو خطأ بناء)، لن تبدأ مرحلة `deploy` إطلاقاً — هذا هو معنى ترتيب `stages`.
- استخدام `only: main` يعني أن هذا التسلسل لا يعمل إلا على فرع `main` تحديداً.

---

### 4.2. الاتصال بسيرفرات أخرى عبر SSH

#### النص الأصلي يقول:
> "But what if I want to deploy to another server? well, you need learn SSH... To login to remote server we use ssh <user>@<server> using username & password OR Public Key & Private Key - This method is mostly used with CI/CD as it safer"

#### الشرح المبسّط:
السيناريو السابق كان ينشر التطبيق على **نفس** السيرفر الذي يعمل عليه `GitLab`. لكن ماذا لو أردنا النشر على سيرفر مختلف تماماً؟ الحل هو بروتوكول `SSH` (`Secure Shell`)، وله طريقتان للمصادقة:

| طريقة المصادقة | الوصف | الاستخدام الشائع |
| --- | --- | --- |
| اسم مستخدم وكلمة مرور | مصادقة تقليدية | استخدام يدوي بسيط |
| مفتاح عام/خاص (`Public/Private Key`) | زوج مفاتيح يُولَّد عبر `ssh-keygen` | **مفضّل في `CI/CD`** لأنه أكثر أماناً |

#### النص الأصلي يقول:
> "We generate a pair of private/public keys using ssh-keygen. The private key goes to gitlab. The public key gets added to authorized_keys file in /home/<user>/.ssh folder on the server"

#### الشرح المبسّط:
آلية عمل المفاتيح:

```algorithm
1 | توليد زوج مفاتيح | ssh-keygen (على جهاز المطوّر) | ينتج مفتاح خاص private key ومفتاح عام public key
2 | تخزين المفتاح الخاص | GitLab CI/CD Variables | يبقى سرياً ولا يُشارك خارج بيئة التنفيذ
3 | إضافة المفتاح العام | ملف authorized_keys على السيرفر الهدف | يسمح لأي طرف يملك المفتاح الخاص المطابق بالدخول دون كلمة مرور
```

#### 💡 التشبيه:
> تخيّل قفلاً خاصاً (السيرفر) يقبل فتحه فقط بمفتاح مصنوع خصيصاً له (المفتاح الخاص)، وأنت وضعت نسخة من "بصمة القفل" (المفتاح العام) على الباب نفسه ليتعرف على المفتاح الصحيح عند تقديمه.
> **وجه الشبه:** المفتاح الخاص السري = `private key`، وبصمة القفل المعلنة على الباب = `public key` الموجود في `authorized_keys`.

---

### 4.3. متغيرات CI/CD (CI/CD Variables) والبيئات (Environments)

#### النص الأصلي يقول:
> "Wait a minute, where do I place the private key on Gitlab? Easy, Ci/CD Variables... A set of environment variables that are inject by Gitlab into the context of CI/CD execution for the sole purpose of using them inside the context without exposing them to external developers"

#### الشرح المبسّط:
`CI/CD Variables` هي المكان الآمن لتخزين أي بيانات سرية (مثل مفتاح `SSH` الخاص، أو كلمة مرور، أو مفتاح توقيع `PGP`) في إعدادات المستودع أو المجموعة على `GitLab`. تُحقن هذه القيم تلقائياً في بيئة تنفيذ الـ pipeline **دون** أن تظهر لأي مطوّر خارجي يطّلع على الكود.

**لماذا؟** لأن وضع كلمة مرور أو مفتاح سري مباشرة داخل ملف `.gitlab-ci.yml` يعني أن أي شخص يملك حق قراءة الكود (الذي قد يكون علنياً على `GitHub`/`GitLab`) سيرى السر كاملاً — وهذا خرق أمني خطير.

#### النص الأصلي يقول:
> "if have an OSS library being published to Maven Central we need to sign this library using PGP signature... We store it inside the CI/CD variables under the name PRIVKEY for example."

#### الشرح المبسّط:
مثال عملي: عند نشر مكتبة مفتوحة المصدر إلى `Maven Central`، يجب توقيعها رقمياً بمفتاح `PGP` خاص. هذا المفتاح لا يُكتب أبداً في الكود، بل يُخزَّن كمتغيّر `CI/CD` باسم مثل `PRIVKEY`، ويُستخدم فقط داخل سياق تنفيذ الـ pipeline.

#### 💻 الكود: مثال SSH كامل للنشر على سيرفر خارجي

#### ما هذا الكود؟
> يوضّح كيف يُستخدم مفتاح `SSH` مخزَّن في متغيّر `CI/CD` باسم `TICKET963_KEY` لنسخ ملفات النشر إلى سيرفر بعيد وتشغيلها عن بُعد.

```yaml
before_script:
  # Install the ssh client inside the alpine-based docker image
  - apk add --no-cache openssh
  # Start the ssh-agent process to hold the key in memory
  - eval $(ssh-agent -s)
  # Create the .ssh directory if it does not exist
  - mkdir -p ~/.ssh/
  # Load the private key from the GitLab CI/CD variable into ssh-agent
  - echo "${TICKET963_KEY}" | ssh-add -
  # Skip the interactive host verification prompt
  - echo "StrictHostKeyChecking no" >> ~/.ssh/config
  # Write runtime environment variables into a local .env file
  - echo SITE_DOMAIN=${SITE_DOMAIN} >> .env
  - echo CI_REGISTRY_IMAGE=${CI_REGISTRY_IMAGE} >> .env
  - echo IMG_TAG=latest >> .env
script:
  # Copy the docker-compose file to the remote server
  - scp docker-compose.yml root@ticket963.com:/root/
  # Copy the environment file to the remote server
  - scp .env root@ticket963.com:/root/
  # Log in and run docker compose remotely over SSH
  - ssh root@ticket963.com "docker login -u \"${CI_REGISTRY_USER}\" -p \"${CI_REGISTRY_PASSWORD}\" \"${CI_REGISTRY}\" && docker compose -f docker-compose.yml pull --policy always && docker compose -f docker-compose.yml up -d"
  # Clean up the sensitive files from the remote server after use
  - ssh root@ticket963.com "rm docker-compose.yml .env"
```
#### شرح كل سطر:
1. `apk add --no-cache openssh` → تثبيت أدوات `SSH` داخل صورة `Alpine Linux` المستخدمة في الـ Runner — لأن صور `docker:latest` الأساسية لا تحتوي `SSH` افتراضياً.
2. `eval $(ssh-agent -s)` → تشغيل `ssh-agent`، برنامج مساعد يحمل المفاتيح في الذاكرة أثناء الجلسة.
3. `mkdir -p ~/.ssh/` → التأكد من وجود مجلد الإعدادات قبل الكتابة فيه.
4. `echo "${TICKET963_KEY}" | ssh-add -` → قراءة المفتاح الخاص من متغيّر `CI/CD` السري وإضافته إلى `ssh-agent`.
5. `echo "StrictHostKeyChecking no" >> ~/.ssh/config` → تعطيل السؤال التفاعلي عن الثقة بالسيرفر لأول اتصال (ضروري في بيئة آلية بدون تدخل بشري).
6. أسطر `echo ... >> .env` → إنشاء ملف بيئة محلي يحوي القيم اللازمة لتشغيل `docker-compose.yml` على السيرفر البعيد.
7. `scp docker-compose.yml root@ticket963.com:/root/` → نسخ ملف `docker-compose` عبر `SSH` إلى السيرفر البعيد.
8. `scp .env root@ticket963.com:/root/` → نسخ ملف البيئة بنفس الطريقة.
9. `ssh root@ticket963.com "..."` → تنفيذ سلسلة أوامر (`docker login` ثم `pull` ثم `up -d`) مباشرة على السيرفر البعيد عبر اتصال `SSH` واحد.
10. `ssh root@ticket963.com "rm docker-compose.yml .env"` → حذف الملفات الحساسة من السيرفر بعد الانتهاء، لتقليل أثر أي بيانات سرية متبقية.

> **الناتج المتوقع:** التطبيق يعمل على سيرفر بعيد `ticket963.com` تلقائياً دون أي تدخل يدوي، ودون ترك ملفات حساسة على السيرفر بعد الانتهاء.

#### النص الأصلي يقول:
> "When using CI/CD variables, we can use environments. Let's say I have 2 servers: Development, Production... They use the same variables, but for security reasons the values change between production and development"

#### الشرح المبسّط:
`Environments` تسمح بتعريف **نفس اسم المتغيّر** (مثلاً `SITE_DOMAIN`) بقيم مختلفة حسب البيئة المستهدفة (`dev` أو `prod`). هذا يعني أن نفس ملف `.gitlab-ci.yml` يمكن أن يعمل بأمان على بيئتين مختلفتين دون تكرار الكود.

#### النص الأصلي يقول:
> "deploy-dev: stage: deploy needs: - job: build-dev only: - dev environment: name: dev ... deploy-prod: ... only: - main environment: name: prod"

#### الشرح المبسّط:
لاحظ الفرق المهم عن الوظيفة السابقة `deploy-production`:
- `needs: - job: build-dev` بدل `needs: []` — هذه المرة الوظيفة **تنتظر فعلياً** نجاح وظيفة `build-dev` تحديداً (وليس بدون انتظار).
- `only: - dev` بدل `- main` — تعمل فقط عند تغيير على فرع `dev`.
- `environment: name: dev` — يربط الوظيفة ببيئة `dev`، فتُستخدم قيم المتغيرات الخاصة بـ `dev` تلقائياً بدل `prod`.

**لماذا؟** هذا يمكّن الفريق من امتلاك **قناتي نشر منفصلتين تماماً** (تطوير وإنتاج) بأمان، بحيث لا يُخلط بين بيانات البيئتين، وباستخدام نفس بنية ملف `YAML` الأساسية.

#### مهم للامتحان ⚠️:
> `only: - dev` تتحكم **بمتى تعمل الوظيفة** (أي فرع Git يُطلقها)، بينما `environment: name: dev` تتحكم **بأي مجموعة متغيرات (Variables)** تُستخدم داخل تنفيذ تلك الوظيفة. هذان مفهومان مختلفان يُستخدمان معاً.

---

### 5. أفكار ختامية: النشر على سيرفر خاص وTraefik

#### النص الأصلي يقول:
> "We mostly develop web apps. We mostly deploy to shared hosting using PHP. Here we can use the provided FTP instead of SSH... But if we have our own VPS/Dedicated server, we might take a different approach. We use a reverse proxy server like Apache or Nginx... their configuration is a nightmare and complex... Let's use Traefik"

#### الشرح المبسّط:
هناك سيناريوهان مختلفان للنشر:
1. **استضافة مشتركة (`Shared Hosting`)** بلغة `PHP` مثلاً — هنا يُستخدم `FTP` بدل `SSH` لنقل الملفات، لأن الاستضافة المشتركة نادراً ما تسمح بوصول `SSH` كامل.
2. **سيرفر خاص (`VPS`/`Dedicated Server`)** — هنا نملك تحكماً كاملاً، ويمكن استخدام `Docker` وخادم وكيل عكسي (`Reverse Proxy`) مثل `Apache` أو `Nginx`. لكن المحاضرة تشير إلى أن إعداد هذين الخادمين "معقّد جداً" (`a nightmare`) عند التعامل مع عدد كبير من حاويات `Docker` المتغيرة — لذلك يُقترح استخدام **`Traefik`** كبديل أبسط.

**لماذا Traefik تحديداً؟** لأنه مصمَّم خصيصاً للعمل مع `Docker`، ويكتشف الحاويات ويوجّه الحركة إليها **تلقائياً** بناءً على `labels` بسيطة، دون كتابة ملفات إعداد يدوية معقّدة كما في `Nginx`/`Apache` التقليدي.

#### النص الأصلي يقول:
> "Traefik is reverse proxy server to the docker era... It requires some configuration to tell it to listen ports on the host, mostly 80 (http) and 443 (https). Then it routes automagically the traffic to the correct containers based mostly URL."

#### الشرح المبسّط:
`Traefik` يستمع على المنافذ القياسية (`80` لـ `http` و `443` لـ `https`)، ثم يوجّه أي طلب وارد إلى الحاوية الصحيحة تلقائياً بناءً على اسم النطاق (`URL`/`Host`) المطلوب — بدون الحاجة لتتبّع منفذ كل حاوية يدوياً.

#### 💻 الكود: تهيئة Traefik عبر labels في docker-compose.yml

#### ما هذا الكود؟
> مقطع `docker-compose.yml` يعرّف خدمة `landing`، ويستخدم `labels` خاصة بـ `Traefik` لتوجيه حركة المرور تلقائياً إليها عبر `HTTPS`.

```yaml
services:
  landing:
    # A readable name for the container
    container_name: landing
    # Use the image built and pushed earlier by CI/CD
    image: $CI_REGISTRY_IMAGE:latest
    # Always restart the container if it stops or the server reboots
    restart: always
    # Attach this container to the shared "web" network so Traefik can reach it
    networks:
      - web
    labels:
      # Tell Traefik to manage routing for this specific container
      - 'traefik.enable=true'
      # Route requests whose Host header matches the SITE_DOMAIN variable
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
      # Set routing priority when multiple rules could match
      - 'traefik.http.routers.landing.priority=1000'
      # Use the "websecure" entrypoint, configured for HTTPS
      - 'traefik.http.routers.landing.entrypoints=websecure'
      # Automatically obtain and renew an HTTPS certificate via Let's Encrypt
      - 'traefik.http.routers.landing.tls.certresolver=letsencrypt'
      # Forward traffic to port 80 inside this container
      - 'traefik.http.services.landing.loadbalancer.server.port=80'
networks:
  # Declare that "web" is an existing external network (shared with Traefik)
  web:
    external: true
```
#### شرح كل سطر:
1. `services: / landing:` → تعريف خدمة (حاوية) باسم `landing`.
2. `container_name: landing` → اسم واضح للحاوية عند عرضها بأدوات مثل `Portainer` أو `docker ps`.
3. `image: $CI_REGISTRY_IMAGE:latest` → يستخدم مباشرة الصورة التي بناها ورفعها الـ pipeline في القسم 4.1، فيربط بين `CI/CD` والنشر الفعلي.
4. `restart: always` → إعادة تشغيل الحاوية تلقائياً عند فشلها أو إعادة تشغيل السيرفر، لضمان توفّر عالٍ (`high availability`) بسيط.
5. `networks: - web` → ربط الحاوية بشبكة `Docker` مشتركة تسمح لـ `Traefik` برؤيتها والتواصل معها.
6. `traefik.enable=true` → تفعيل صريح لتوجيه `Traefik` نحو هذه الحاوية تحديداً (وليس كل الحاويات تلقائياً).
7. `traefik.http.routers.landing.rule=Host(...)` → قاعدة التوجيه: أي طلب لعنوان `${SITE_DOMAIN}` يُرسَل لهذه الحاوية.
8. `traefik.http.routers.landing.priority=1000` → عند تعارض قواعد بين عدة حاويات لنفس النطاق، تحدد الأولوية.
9. `traefik.http.routers.landing.entrypoints=websecure` → استخدام نقطة الدخول المخصصة للاتصالات المشفّرة (`HTTPS`).
10. `traefik.http.routers.landing.tls.certresolver=letsencrypt` → توليد وتجديد شهادة `HTTPS` تلقائياً عبر خدمة `Let's Encrypt` المجانية.
11. `traefik.http.services.landing.loadbalancer.server.port=80` → المنفذ **الداخلي** الذي تستمع عليه الحاوية فعلياً (غالباً `80` داخل الحاوية حتى لو كان `Traefik` يستقبل الطلب على `443` من الخارج).
12. `networks: web: external: true` → تصريح أن شبكة `web` مُنشأة مسبقاً خارج هذا الملف (مشتركة مع خدمة `Traefik` نفسها).

> **الناتج المتوقع:** بمجرد تشغيل هذا الملف، يصبح الموقع متاحاً تلقائياً عبر `https://${SITE_DOMAIN}` بشهادة أمان صالحة، دون أي إعداد يدوي إضافي في `Traefik` نفسه.

#### النص الأصلي يقول:
> "Also I need a tool to allow me to manage containers and images without using CLI, this is Portainer. I need to monitor my system and read the logs of my containers. This is Graffana... Prometheus for monitoring the host system and Promtail with Loki for log management"

#### الشرح المبسّط:
منظومة أدوات تكميلية غالباً تُستخدم مع `Traefik` في سيرفر إنتاج حقيقي:

| الأداة | الوظيفة |
| --- | --- |
| `Portainer` | واجهة رسومية لإدارة حاويات وصور `Docker` بدون الحاجة لسطر الأوامر (`CLI`) |
| `Grafana` | لوحة مراقبة ورسم بياني للأداء والسجلات |
| `Prometheus` | جمع مقاييس أداء السيرفر المضيف (`host system monitoring`) |
| `Promtail` + `Loki` | جمع وتخزين سجلات (`logs`) الحاويات لتحليلها لاحقاً |

#### النص الأصلي يقول:
> "What about Github? Well the syntax is different, it's similar in many ways and follows the same logic... I found out that AI is really good at CI/CD stuff, so use it especially Google's Gemini"

#### الشرح المبسّط:
تُختم المحاضرة بملاحظتين عمليتين: أولاً أن `GitHub Actions` يتبع نفس المنطق العام لـ `GitLab CI/CD` (مراحل، وظائف، متغيرات) لكن بصيغة `YAML` مختلفة قليلاً في التسمية والبنية. ثانياً، أن أدوات الذكاء الاصطناعي مفيدة جداً في كتابة وتصحيح ملفات `CI/CD` المعقّدة (شرح زيادة للفهم: هذا لا يلغي أهمية فهم المنطق الأساسي يدوياً كما شُرح في هذه المحاضرة).

### الأفكار الرئيسية الشاملة
> لا توجد أفكار محورية إضافية لم تُغطَّ في الأقسام أعلاه — تمت تغطية كل عناصر المحاضرة بالكامل من `What is DevOps` وحتى `Traefik` والملاحظات الختامية.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `DevOps` | ثقافة عمل وأدوات تدمج التطوير والتشغيل | تمكين الفريق، التواصل، الأتمتة |
| `Continuous Integration (CI)` | دمج الكود بشكل متكرر مع اختبار آلي | ينتج `build artifact` |
| `Continuous Delivery (CD)` | تجهيز الكود للنشر تلقائياً مع موافقة يدوية أخيرة | جدولة مرنة (يومي/أسبوعي/شهري) |
| `Continuous Deployment` | نشر تلقائي كامل بدون تدخل بشري | خطوة `Deploy to Production` آلية |
| `Build System` | أداة تدير الاعتماديات وتبني الحزمة وتختبر | `Maven`, `Gradle`, `NPM` |
| `Dependency Management` | إدارة المكتبات الخارجية واعتمادياتها الفرعية | `pom.xml`, `build.gradle`, `package.json` |
| `Package Generation` | توليد الحزمة النهائية القابلة للتوزيع | `JAR`, `APK`/`AAB`, `setup.exe`, `Docker image` |
| `.gitlab-ci.yml` | ملف تهيئة `CI/CD` في `GitLab` | يحتوي `stages`, `jobs`, `scripts` |
| `CI/CD Variables` | تخزين آمن للبيانات السرية | تُحقن تلقائياً دون كشفها للمطورين |
| `Environment` (في GitLab) | مجموعة قيم متغيرات مرتبطة ببيئة معيّنة | `dev` مقابل `prod` |
| `Traefik` | خادم وكيل عكسي مصمم للعمل مع `Docker` | يوجّه الحركة تلقائياً عبر `labels` |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Maven`/`Gradle` | نظام بناء Java | يدعم `plugins` لتوليد الحزم |
| `NPM`/`PNPM`/`YARN` | نظام بناء NodeJS | يعتمد على `package.json` وسكربتات مخصصة |
| `GitLab Runner` | ينفّذ ملفات `.gitlab-ci.yml` فعلياً | يجب أن يحمل الوسم (`tag`) المطابق للوظيفة |
| `SSH (ssh-keygen)` | نقل ملفات وتنفيذ أوامر بأمان على سيرفر بعيد | يفضَّل استخدام مفاتيح بدل كلمات المرور في `CI/CD` |
| `Portainer` | إدارة `Docker` بواجهة رسومية | بديل عن استخدام `CLI` مباشرة |
| `Grafana` + `Prometheus` + `Loki`/`Promtail` | مراقبة النظام والسجلات | منظومة مراقبة متكاملة |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| `Continuous Delivery` مقابل `Continuous Deployment` | `Delivery` | `Deployment` | خطوة `Deploy to Production` يدوية في الأول، آلية بالكامل في الثاني |
| `only` مقابل `environment` في GitLab | `only` | `environment` | `only` يحدد متى تعمل الوظيفة (أي فرع)، `environment` يحدد أي متغيرات تُستخدم |
| `Maven`/`Gradle` مقابل `NPM` في توليد الحزم | `Maven`/`Gradle` | `NPM` | الأول يستخدم `plugins` جاهزة، الثاني يحتاج سكربتات مخصصة |
| `APK` مقابل `AAB` | `APK` | `AAB` | `APK` قابل للتثبيت المباشر، `AAB` مخصص للنشر على `Google Play` |
| `Reverse Proxy` تقليدي (`Nginx`/`Apache`) مقابل `Traefik` | تقليدي | `Traefik` | الأول يحتاج إعداداً يدوياً معقّداً، الثاني يكتشف الحاويات تلقائياً عبر `labels` |

### قاموس المصطلحات
| الفئة | المصطلحات |
| --- | --- |
| مفاهيم DevOps | `DevOps`, `CI`, `CD`, `Continuous Deployment`, `Lead Time`, `Recovery Time` |
| اختبارات | `Unit tests`, `Integration tests`, `Acceptance tests`, `UI tests` |
| بناء وحزم | `Build System`, `Dependency Management`, `Package Generation`, `Build Artifact` |
| GitLab/CI | `stages`, `jobs`, `variables`, `only`, `needs`, `tags`, `environment`, `CI/CD Variables` |
| شبكة وأمان | `SSH`, `Public/Private Key`, `authorized_keys`, `HTTPS`, `Let's Encrypt` |
| نشر Docker | `Docker Image`, `docker-compose.yml`, `Traefik`, `labels`, `network` |
| مراقبة | `Portainer`, `Grafana`, `Prometheus`, `Loki`, `Promtail` |

### أبرز النقاط الذهبية
1. `DevOps` = ثقافة + أدوات، وليس فقط أدوات — التواصل بين الفرق أساس نجاحها.
2. `CI` هي حجر الأساس لكل من `CD` و`Continuous Deployment`.
3. الفرق الوحيد بين `Continuous Delivery` و`Continuous Deployment` هو وجود موافقة بشرية على النشر النهائي أم لا.
4. `Build System` يحل مشكلة `dependency hell` تلقائياً بدل حلّها يدوياً.
5. المفتاح الخاص (`private key`) يبقى دائماً سرياً في `CI/CD Variables`، ولا يوضع أبداً داخل الكود المصدري.
6. `Environments` في `GitLab` تسمح بنشر آمن لأكثر من بيئة (`dev`/`prod`) بنفس منطق الملف.
7. `Traefik` يبسّط النشر متعدد الحاويات مقارنة بإعداد `Nginx`/`Apache` يدوياً.

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| اعتبار `git push` وحده = `Continuous Integration` | `CI` تتطلب دمجاً متكرراً **مع** اختبار آلي وإنتاج `build artifact` |
| الخلط بين `Continuous Delivery` و`Continuous Deployment` | الفرق فقط في خطوة `Deploy to Production` (يدوي مقابل آلي) |
| وضع أسرار (كلمات مرور/مفاتيح) داخل ملف `.gitlab-ci.yml` مباشرة | يجب استخدام `CI/CD Variables` دائماً للبيانات الحساسة |
| الاعتقاد أن `only` و `environment` يفعلان نفس الشيء | `only` = متى تعمل الوظيفة، `environment` = أي قيم متغيرات تُستخدم |
| نسيان أن `stages` تحدد **ترتيب** التنفيذ وليس فقط تصنيفاً | وظيفة في `deploy` لن تعمل قبل نجاح كل وظائف `build` |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: عملية Continuous Integration

> الهدف: دمج كود جديد بأمان دون كسر الفرع الرئيسي.

```algorithm
1 | كتابة كود جديد + اختباراته | المطوّر + محرر الكود | يُنتَج كود مع مجموعة اختبارات خاصة به
2 | دمج التغييرات على الفرع الرئيسي | Git (commit/merge) | يجب أن يحدث يومياً على الأقل
3 | تشغيل الاختبارات الآلية | CI Pipeline (Unit/Integration/Acceptance/UI tests) | يكشف أي تعارض أو خطأ بسرعة
4 | إصلاح فوري عند الفشل | الفريق بأكمله | إصلاح الفرع المكسور هو الأولوية القصوى
5 | إنتاج Build Artifact | Build System | حزمة جاهزة كمخرج نهائي لعملية CI
```

#### ⚙️ الخطوات / الخوارزمية: عملية Dependency Management

> الهدف: حل تعقيد الاعتماديات المتداخلة تلقائياً.

```algorithm
1 | تحديد مكتبة مطلوبة | المطوّر | يضيف اسم وإصدار المكتبة في ملف التهيئة (pom.xml/build.gradle/package.json)
2 | تحديد نطاق الاستخدام (scope) | Build System | compile/test في Maven-Gradle، أو dependency/devDependency في NPM
3 | حل الاعتماديات الفرعية | Build System | يجلب اعتماديات المكتبة نفسها تلقائياً ويحل تعارضات الإصدارات
4 | تحميل وتخزين المكتبات | Build System (مستودع محلي/بعيد) | يمنع إعادة التحميل في كل مشروع جديد
```

#### ⚙️ الخطوات / الخوارزمية: نشر عبر GitLab CI/CD على نفس سيرفر GitLab

```algorithm
1 | Push على main | Git / GitLab | يُطلق GitLab Runner تلقائياً
2 | Stage build: تسجيل دخول للـ Registry | before_script (docker login) | يهيّئ صلاحية الرفع
3 | Stage build: بناء ورفع الصورة | script (docker build + docker push) | صورة بوسمين: IMAGE_TAG و latest
4 | Stage deploy: سحب أحدث صورة | docker compose pull --policy always | يضمن استخدام آخر نسخة
5 | Stage deploy: تشغيل الحاوية | docker compose up -d | التطبيق يعمل فعلياً على السيرفر
```

#### ⚙️ الخطوات / الخوارزمية: نشر عبر SSH على سيرفر بعيد

```algorithm
1 | تجهيز بيئة SSH داخل الـ Runner | apk add openssh + ssh-agent | يهيئ أدوات الاتصال
2 | تحميل المفتاح الخاص | CI/CD Variable → ssh-add | يُحقن سرياً دون ظهوره في الكود
3 | نسخ ملفات النشر | scp docker-compose.yml + .env | ينقل الملفات اللازمة للسيرفر البعيد
4 | تنفيذ أوامر عن بعد | ssh user@server "docker login && docker compose pull && up -d" | ينشر التطبيق فعلياً
5 | تنظيف الملفات الحساسة | ssh user@server "rm ..." | يقلل بقاء بيانات حساسة على السيرفر
```

#### ⚙️ الخطوات / الخوارزمية: توليد مفاتيح SSH وربطها بـ GitLab

```algorithm
1 | توليد زوج مفاتيح | ssh-keygen | ينتج private key و public key
2 | حفظ المفتاح الخاص | GitLab CI/CD Variables | يُستخدم داخل الـ pipeline فقط
3 | إضافة المفتاح العام | authorized_keys على السيرفر الهدف | يسمح بالدخول دون كلمة مرور
```

#### ⚙️ الخطوات / الخوارزمية: تفعيل Traefik لحاوية Docker

```algorithm
1 | ربط الحاوية بشبكة web المشتركة | docker-compose networks | يتيح لـ Traefik رؤية الحاوية
2 | تفعيل Traefik للحاوية | label traefik.enable=true | بدون هذا، Traefik يتجاهل الحاوية تماماً
3 | تحديد قاعدة التوجيه (Host Rule) | label traefik.http.routers.X.rule | يربط اسم النطاق بالحاوية
4 | تفعيل HTTPS وشهادة تلقائية | entrypoints=websecure + certresolver=letsencrypt | يؤمّن الاتصال تلقائياً
5 | تحديد المنفذ الداخلي | loadbalancer.server.port | يوجّه Traefik الحركة للمنفذ الصحيح داخل الحاوية
```

### أنماط الأكواد والبنى المتكررة
| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| وظيفة GitLab CI قياسية | `job_name: { stage, image, needs, only, tags, before_script, script }` | أي وظيفة بناء أو نشر جديدة |
| نمط "بناء صورة برقمين وسم" | `docker build -t IMAGE:TAG -t IMAGE:latest .` ثم `push` للاثنين | عند رغبتك بتتبع نسخة محددة مع الحفاظ على `latest` |
| نمط "تشغيل دائم التحديث" | `docker compose pull --policy always && docker compose up -d` | عند النشر إلى سيرفر يجب أن يعكس دائماً آخر صورة |
| نمط تفعيل Traefik لخدمة | مجموعة `labels` تبدأ بـ `traefik.enable=true` | أي حاوية تريد كشفها للإنترنت عبر Traefik |

### أنماط التعامل والسلوك
| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| فشل اختبار في مرحلة build | إيقاف الـ pipeline قبل الوصول لمرحلة deploy | لأن `stages` مرتبة، ولا يجب نشر كود لم يجتز الاختبار |
| الحاجة لبيانات سرية داخل pipeline | تخزينها في `CI/CD Variables` واستدعاؤها بـ `${VAR}` | لمنع كشف الأسرار في الكود العلني |
| نشر على بيئتين (dev/prod) بنفس الملف | استخدام `environment:` مع قيم متغيرات مختلفة لكل بيئة | لتجنّب تكرار منطق pipeline لكل بيئة |
| إضافة حاوية جديدة خلف Traefik | إضافة `labels` فقط دون لمس إعدادات Traefik المركزية | لأن الاكتشاف تلقائي بمجرد وجود `labels` صحيحة |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25% (4 أسئلة) / سيناريو كود 35% (6 أسئلة) / تطبيق 30% (5 أسئلة) / تتبع خوارزمية 10% (1 سؤال).

### السؤال 1 (متوسط)
ما الفرق الجوهري بين `Continuous Delivery` و`Continuous Deployment`؟
أ) لا يوجد فرق، هما نفس المفهوم
ب) `Continuous Deployment` لا يتضمن اختباراً آلياً على الإطلاق
ج) الفرق هو وجود تدخل بشري في خطوة `Deploy to Production` في `Delivery`، وغيابه في `Deployment`
د) `Continuous Delivery` يُستخدم فقط مع تطبيقات الجوال
**الإجابة الصحيحة: ج**
**التعليل:** كما وضّح الرسم التوضيحي في المحاضرة، الخطوة الوحيدة المختلفة بينهما هي `Deploy to Production` (يدوية في `Delivery`، آلية في `Deployment`). الخيار أ خاطئ لوجود فرق واضح. ب خاطئ لأن كلاهما يتضمن اختباراً آلياً في كل الخطوات الأخرى. د خاطئ لأن المفهوم عام وليس مقتصراً على الجوال.

### السؤال 2 (سهل-متوسط)
أي نوع اختبار يركّز على "الحالة التجارية" (business case) للتطبيق بدل الجزئيات التقنية؟
أ) `Unit tests`
ب) `Integration tests`
ج) `Acceptance tests`
د) `User interface tests`
**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة تنص صراحة أن `Acceptance tests` تشبه `Integration tests` لكن تركّز على `business case`. أ خاطئ لأنها تختبر أجزاء صغيرة من الكود. ب خاطئ لأنها تختبر تفاعل المكونات وليس منطق العمل. د خاطئ لأنها تركّز على تجربة المستخدم البصرية.

### السؤال 3 (متوسط)
في ملف `.gitlab-ci.yml`، ما وظيفة الحقل `needs: []` في وظيفة معيّنة؟
أ) يمنع الوظيفة من التنفيذ نهائياً
ب) يعني أن الوظيفة لا تحتاج انتظار نجاح أي وظيفة أخرى قبلها
ج) يحدد عدد مرات إعادة المحاولة عند الفشل
د) يحدد اسم الـ Runner المطلوب
**الإجابة الصحيحة: ب**
**التعليل:** `needs: []` (قائمة فارغة) يعني عدم وجود اعتمادية على وظائف أخرى فتبدأ فوراً. أ خاطئ فالوظيفة تعمل بشكل طبيعي. ج خاطئ لأن إعادة المحاولة تُضبط بحقل مختلف (`retry`). د خاطئ لأن اسم الـ Runner يُحدَّد عبر `tags`.

### السؤال 4 (صعب)
لاحظ الفرق بين وظيفتي `deploy-production` (`needs: []`, `only: - main`) و`deploy-prod` (`needs: - job: build-prod`, `only: - main`, `environment: name: prod`) في المحاضرة. ماذا يعني وجود `needs: - job: build-prod` تحديداً؟
أ) لا فرق فعلي، كلاهما نفس السلوك
ب) الوظيفة تنتظر تحديداً نجاح وظيفة `build-prod` قبل أن تبدأ، بعكس `needs: []` التي تعمل بدون انتظار أي وظيفة
ج) يعني أن الوظيفة تعمل فقط على فرع `prod`
د) يعني حذف وظيفة `build-prod` تلقائياً بعد انتهائها
**الإجابة الصحيحة: ب**
**التعليل:** تحديد اسم وظيفة داخل `needs` يخلق اعتمادية تنفيذ صريحة، بعكس القائمة الفارغة `[]`. الخيار ج خاطئ لأن الفرع يُحدَّد بـ `only` وليس `needs`. د خاطئ لأن `needs` لا علاقة له بالحذف.

### السؤال 5 (متوسط)
لماذا يُفضَّل استخدام مفتاح `SSH` عام/خاص بدل اسم مستخدم وكلمة مرور في سياق `CI/CD`؟
أ) لأنه أسرع في الاتصال
ب) لأن المحاضرة تذكر أنه أكثر أماناً ومناسب لبيئة آلية بدون تدخل بشري لإدخال كلمة مرور
ج) لأنه الطريقة الوحيدة المدعومة في `Docker`
د) لأن كلمات المرور ممنوعة تقنياً في `SSH`
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة "This method is mostly used with CI/CD as it safer". أ ليس السبب المذكور. ج خاطئ فكلا الطريقتين مدعومتان تقنياً. د خاطئ فكلمات المرور ليست ممنوعة، فقط أقل أماناً وعملية في بيئة آلية.

### السؤال 6 (سهل-متوسط)
أين يجب وضع المفتاح **الخاص** (`private key`) عند استخدام `GitLab CI/CD`؟
أ) داخل ملف `.gitlab-ci.yml` مباشرة كنص
ب) داخل مجلد `.ssh` في المستودع نفسه
ج) داخل `CI/CD Variables`
د) لا حاجة لتخزينه، يُولَّد تلقائياً في كل تشغيل
**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة توضّح أن `CI/CD Variables` هي المكان الآمن لتخزين الأسرار مثل المفتاح الخاص دون كشفها للمطورين الخارجيين. أ وب خاطئان لأنهما يعرّضان المفتاح للكشف العلني. د خاطئ لأن المفتاح يُولَّد مرة واحدة يدوياً بواسطة `ssh-keygen`.

### السؤال 7 (متوسط)
ما وظيفة الأمر `docker compose -f docker-compose.yml pull --policy always` في سياق النشر؟
أ) يحذف الحاويات القديمة نهائياً
ب) يسحب أحدث نسخة من الصور المذكورة في الملف قبل التشغيل، بدل استخدام نسخة محلية قديمة
ج) يبني صورة جديدة من الصفر
د) يوقف تشغيل جميع الحاويات
**الإجابة الصحيحة: ب**
**التعليل:** `pull --policy always` يضمن سحب أحدث نسخة من `registry` دائماً. أ خاطئ فالأمر لا يحذف حاويات. ج خاطئ لأن البناء يتم بأمر `docker build` منفصل تم تنفيذه في مرحلة سابقة. د خاطئ لأن الإيقاف يتم بأمر مختلف مثل `down`.

### السؤال 8 (صعب - سيناريو كود)
لديك حاوية جديدة تريد كشفها عبر `Traefik` على النطاق `shop.example.com` عبر `HTTPS`. أي مجموعة `labels` صحيحة؟
أ) `traefik.enable=false` مع بقية الإعدادات
ب) `traefik.http.routers.shop.rule=Host(\`shop.example.com\`)` مع `traefik.enable=true` و`entrypoints=websecure` و`certresolver=letsencrypt`
ج) لا حاجة لأي `labels`، `Traefik` يكتشف كل الحاويات تلقائياً بلا استثناء
د) يكفي تحديد `loadbalancer.server.port` فقط بدون بقية الإعدادات
**الإجابة الصحيحة: ب**
**التعليل:** هذا يطابق تماماً بنية `labels` الموضحة في المحاضرة (`enable`, `rule`, `entrypoints`, `certresolver`, `port`). أ خاطئ لأنه يعطّل `Traefik` لهذه الحاوية. ج خاطئ لأن `traefik.enable=true` مطلوب صراحة. د خاطئ لأن قاعدة التوجيه (`rule`) ضرورية لتحديد النطاق المستهدف.

### السؤال 9 (متوسط - تطبيق)
فريق يريد أن ينشر تلقائياً على بيئة `dev` عند الدفع لفرع `dev`، وعلى `prod` عند الدفع لفرع `main`، باستخدام نفس اسم المتغيّر لكن بقيم مختلفة. ما الحل الأنسب وفق المحاضرة؟
أ) كتابة ملفين منفصلين تماماً لكل بيئة
ب) استخدام `CI/CD Variables` مرتبطة بـ `Environments` مختلفة (`dev`/`prod`) مع `only` مناسب لكل وظيفة
ج) استخدام كلمة مرور واحدة مشتركة لكل البيئات
د) هذا غير ممكن تقنياً في `GitLab`
**الإجابة الصحيحة: ب**
**التعليل:** هذا بالضبط ما وضّحته المحاضرة عبر مثال `deploy-dev`/`deploy-prod` مع `environment: name:`. أ ممكن تقنياً لكنه ليس الحل المُعلَّم في المحاضرة ويكرر الكود. ج خاطئ أمنياً. د خاطئ فالمحاضرة تثبت العكس.

### السؤال 10 (سهل - مقارنة)
أي زوج من الأدوات التالية يُستخدم لإدارة الاعتماديات في `Java`؟
أ) `NPM` و `YARN`
ب) `Maven` و `Gradle`
ج) `InnoSetup` و `Traefik`
د) `Grafana` و `Prometheus`
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة تذكرهما صراحة كأداتي `Build System` للغة `Java`. أ خاصة بـ `NodeJS`. ج و د أدوات لأغراض أخرى (توليد حزم/مراقبة) وليست لإدارة الاعتماديات.

### السؤال 11 (متوسط - سيناريو كود)
في `package.json`، ما تأثير تثبيت حزمة بالأمر `npm install some-package -D`؟
أ) تُضاف الحزمة إلى `dependencies` وتُضمَّن في البناء النهائي دائماً
ب) تُضاف الحزمة إلى `devDependencies` ولا تُضمَّن عادةً في بناء الإنتاج النهائي
ج) يتم حذف الحزمة فور التثبيت
د) لا يوجد فرق عن `npm install some-package` العادي
**الإجابة الصحيحة: ب**
**التعليل:** العلم `-D` يعني `--save-dev`، مما يضعها في `devDependencies` المستخدمة فقط أثناء التطوير. أ عكس الصحيح. ج غير منطقي. د خاطئ لأن هناك فرقاً واضحاً في قسم `package.json` الناتج.

### السؤال 12 (صعب - سيناريو كود)
لماذا يتم بناء صورة `Docker` بوسمين (`$IMAGE_TAG` و `latest`) في نفس أمر `docker build` بدل وسم واحد فقط؟
أ) لأن `Docker` لا يسمح ببناء صورة بوسم واحد
ب) للحصول على مرجع دائم لآخر نسخة (`latest`) مع الاحتفاظ بإمكانية الرجوع لنسخة محددة عبر الوسم الفريد
ج) لتسريع عملية البناء نفسها
د) لتقليل حجم الصورة النهائية
**الإجابة الصحيحة: ب**
**التعليل:** هذا يوازن بين سهولة الإشارة لآخر نسخة (`latest`) والقدرة على التتبّع الدقيق والرجوع لنسخة سابقة (`rollback`) عبر الوسم الفريد المبني على `$CI_PIPELINE_IID`. باقي الخيارات لا علاقة لها بسبب استخدام وسمين.

### السؤال 13 (متوسط - تطبيق)
أي من التالي **ليس** من مخرجات (`outputs`) `Package Generation` المذكورة في المحاضرة؟
أ) `JAR`
ب) `APK`/`AAB`
ج) `setup.exe`
د) `pom.xml`
**الإجابة الصحيحة: د**
**التعليل:** `pom.xml` هو ملف **تهيئة إدخال** لـ `Maven` وليس مخرجاً نهائياً. الخيارات أ، ب، ج جميعها مخرجات صريحة ذُكرت في المحاضرة (Java، Android، Windows على التوالي).

### السؤال 14 (متوسط - مقارنة)
ما الفرق الرئيسي بين ملف `.gitlab-ci.yml` وملف `.github/workflow/*.yml` وفق المحاضرة؟
أ) لا يوجد فرق إطلاقاً، الصيغة متطابقة حرفياً
ب) كلاهما يخدم فكرة `CI/CD` نفسها لكن بصيغة/موقع مختلف حسب المنصة
ج) `GitHub` لا يدعم `CI/CD` نهائياً
د) `GitLab` لا يدعم `Docker`
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر أن المنصتين "similar... follows the same logic" لكن الصيغة مختلفة. أ مبالغة غير دقيقة (المنطق متشابه، الصيغة مختلفة). ج و د خاطئان تماماً وفق النص.

### السؤال 15 (صعب - تتبع خوارزمية)
بناءً على تسلسل خطوات النشر عبر `SSH` في المحاضرة، ماذا يحدث **مباشرة بعد** تنفيذ `docker compose up -d` على السيرفر البعيد؟
أ) يتم بناء صورة `Docker` جديدة
ب) يتم حذف ملفي `docker-compose.yml` و `.env` من السيرفر البعيد
ج) يبدأ `Traefik` بالتثبيت التلقائي
د) تنتهي الـ pipeline فوراً دون أي خطوة أخرى
**الإجابة الصحيحة: ب**
**التعليل:** آخر أمر في السكربت هو `ssh root@ticket963.com "rm docker-compose.yml .env"` لتنظيف الملفات الحساسة بعد الاستخدام. أ حدث في مرحلة سابقة (build). ج و د غير مذكورين في هذا التسلسل تحديداً.

### السؤال 16 (متوسط - تطبيق)
شركة تستخدم استضافة مشتركة (`Shared Hosting`) بلغة `PHP` وليس لديها وصول `SSH` كامل. ما الأداة الأنسب لنقل الملفات وفق المحاضرة؟
أ) `Traefik`
ب) `FTP`
ج) `Portainer`
د) `ssh-keygen`
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة: "Here we can use the provided FTP instead of SSH" في سياق الاستضافة المشتركة. باقي الأدوات مرتبطة ببيئة `Docker`/سيرفر خاص وليست بديلاً لنقل الملفات في استضافة مشتركة.

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (منطقي - logic)
**الكود (يحتوي خطأ):**
```yaml
stages:
  - deploy
  - build

build-production:
  stage: build
  script:
    - docker build -t myimage .
```
**اكتشف الخطأ:** ترتيب `stages` معكوس — `deploy` مذكورة قبل `build`، بينما وظيفة `build-production` تنتمي لمرحلة `build`، مما يعني أن `GitLab` سيحاول تنفيذ مرحلة `deploy` أولاً رغم أنها فارغة من وظائف فعلياً وقد يسبب ترتيباً منطقياً خاطئاً إذا أُضيفت لاحقاً وظائف `deploy` تعتمد على نتاج `build`.

**التصحيح:**
```yaml
stages:
  - build
  - deploy

build-production:
  stage: build
  script:
    - docker build -t myimage .
```
**شرح الحل:**
1. `stages` يجب أن تعكس **الترتيب المنطقي الفعلي** للتنفيذ: البناء أولاً، ثم النشر.
2. لو أُضيفت لاحقاً وظيفة `deploy` تعتمد على صورة تم بناؤها في `build`، فإن الترتيب الخاطئ يعني إمكانية محاولة النشر قبل اكتمال البناء.
3. القاعدة العامة: رتّب `stages` دائماً بترتيب الاعتماد المنطقي بين المراحل.

### سؤال تصحيح 2 (سوء فهم - misconception)
**الكود (يحتوي خطأ):**
```yaml
deploy-production:
  stage: deploy
  script:
    - echo "DB_PASSWORD=SuperSecret123" >> .env
    - scp .env root@server.com:/root/
```
**اكتشف الخطأ:** كتابة كلمة مرور حساسة (`DB_PASSWORD`) بشكل ثابت (`hardcoded`) مباشرة داخل ملف `.gitlab-ci.yml` الظاهر للمطورين، بدلاً من استخدام `CI/CD Variables` كما وضّحت المحاضرة.

**التصحيح:**
```yaml
deploy-production:
  stage: deploy
  script:
    - echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
    - scp .env root@server.com:/root/
```
**شرح الحل:**
1. يجب تخزين `DB_PASSWORD` كمتغيّر `CI/CD` سري من إعدادات `GitLab` وليس نصاً ثابتاً في الملف.
2. يُستدعى المتغيّر بصيغة `${DB_PASSWORD}` فيُحقن قيمته وقت التنفيذ فقط دون ظهوره في الكود المصدري.
3. هذا يمنع أي شخص يقرأ الكود (حتى لو كان المستودع خاصاً) من رؤية القيمة الفعلية مباشرة.

### سؤال تصحيح 3 (فحص القيمة المرجعة - return_check)
**الكود (يحتوي خطأ):**
```yaml
build-production:
  stage: build
  script:
    - docker build -t myapp:latest . || true
    - docker push myapp:latest
```
**اكتشف الخطأ:** إضافة `|| true` بعد أمر `docker build` تجعل الوظيفة "تنجح" دائماً حتى لو فشل البناء فعلياً، وبالتالي سيحاول السطر التالي رفع (`push`) صورة قد تكون غير موجودة أو قديمة/فاسدة، وهذا يخالف قاعدة "الفرع المكسور يجب إصلاحه فوراً" التي شرحتها المحاضرة عن `CI`.

**التصحيح:**
```yaml
build-production:
  stage: build
  script:
    - docker build -t myapp:latest .
    - docker push myapp:latest
```
**شرح الحل:**
1. إزالة `|| true` تسمح للـ pipeline بالفشل فعلياً عند فشل البناء، مما يوقف مرحلة `deploy` اللاحقة تلقائياً.
2. هذا يطبّق المبدأ الأساسي في `CI`: أي كسر في الفرع الرئيسي يجب أن يُكتشف فوراً ولا يُخفى.
3. إخفاء الفشل الحقيقي (`false success`) هو من أخطر الممارسات في `CI/CD` لأنه يسمح بنشر كود معطوب دون علم الفريق.

### سؤال تصحيح 4 (كود ميت - dead_code)
**الكود (يحتوي خطأ):**
```yaml
services:
  landing:
    image: $CI_REGISTRY_IMAGE:latest
    networks:
      - web
    labels:
      - 'traefik.enable=false'
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
      - 'traefik.http.routers.landing.entrypoints=websecure'
      - 'traefik.http.routers.landing.tls.certresolver=letsencrypt'
      - 'traefik.http.services.landing.loadbalancer.server.port=80'
networks:
  web:
    external: true
```
**اكتشف الخطأ:** الوسم `traefik.enable=false` يجعل كل بقية `labels` الخاصة بـ `Traefik` (قاعدة التوجيه، `entrypoints`، الشهادة، المنفذ) **كوداً ميتاً فعلياً** — أي أنها مكتوبة لكنها لن تُنفَّذ أبداً لأن `Traefik` يتجاهل الحاوية بالكامل عندما تكون `enable=false`.

**التصحيح:**
```yaml
services:
  landing:
    image: $CI_REGISTRY_IMAGE:latest
    networks:
      - web
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
      - 'traefik.http.routers.landing.entrypoints=websecure'
      - 'traefik.http.routers.landing.tls.certresolver=letsencrypt'
      - 'traefik.http.services.landing.loadbalancer.server.port=80'
networks:
  web:
    external: true
```
**شرح الحل:**
1. تغيير القيمة إلى `traefik.enable=true` يفعّل فعلياً كل بقية إعدادات التوجيه.
2. القاعدة العامة: أي مجموعة `labels` تفصيلية لـ `Traefik` بلا فائدة إن لم يُفعَّل السطر الأساسي `traefik.enable=true` أولاً.
3. هذا مثال واقعي لخطأ إعداد شائع يصعب اكتشافه لأن الملف لا يعطي رسالة خطأ صريحة، بل يفشل التوجيه بصمت.

### سؤال تصحيح 5 (منطقي - logic)
**الكود (يحتوي خطأ):**
```yaml
deploy-dev:
  stage: deploy
  needs:
    - job: build-dev
  only:
    - main
  environment:
    name: dev
```
**اكتشف الخطأ:** الوظيفة `deploy-dev` مرتبطة ببيئة `dev` (`environment: name: dev`) لكن شرط التشغيل `only: - main` يعني أنها ستعمل فقط عند الدفع لفرع `main` — وهذا يخالف منطق المحاضرة الذي يربط فرع `dev` ببيئة `dev` وفرع `main` ببيئة `prod` تحديداً.

**التصحيح:**
```yaml
deploy-dev:
  stage: deploy
  needs:
    - job: build-dev
  only:
    - dev
  environment:
    name: dev
```
**شرح الحل:**
1. يجب أن يتطابق فرع `Git` المحدد في `only` مع البيئة المقصودة في `environment` — فرع `dev` مع بيئة `dev`.
2. الخطأ هنا خطير عملياً لأنه قد يؤدي لنشر بيانات/إعدادات بيئة `dev` عن طريق الخطأ عند الدفع إلى `main` (الإنتاج)، وهو خطر أمني وتشغيلي حقيقي.
3. القاعدة العامة: راجع دائماً التطابق بين `only` (الفرع المُطلِق) و`environment` (مجموعة القيم المستخدمة) لتجنّب تسريب بيانات بيئة خاطئة.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): إكمال ملف gitlab-ci.yml — fill_gaps

**السيناريو / المطلوب:**
أكمل الفراغات في ملف `.gitlab-ci.yml` التالي بحيث يبني وينشر صورة `Docker` بنفس منطق المحاضرة:
```yaml
_______:
  - build
  - deploy

build-production:
  stage: _______
  image: docker:latest
  script:
    - docker build -t $CI_REGISTRY_IMAGE:latest .
    - docker _______ $CI_REGISTRY_IMAGE:latest

deploy-production:
  stage: _______
  script:
    - docker compose -f docker-compose.yml pull --policy _______
    - docker compose -f docker-compose.yml up -_______
```

**المطلوب:**
1. املأ كل فراغ بالكلمة المفتاحية الصحيحة.

**نموذج الحل:**
```yaml
stages:
  - build
  - deploy

build-production:
  stage: build
  image: docker:latest
  script:
    - docker build -t $CI_REGISTRY_IMAGE:latest .
    - docker push $CI_REGISTRY_IMAGE:latest

deploy-production:
  stage: deploy
  script:
    - docker compose -f docker-compose.yml pull --policy always
    - docker compose -f docker-compose.yml up -d
```

---

### تمرين 2 (تمرين إضافي): تصحيح ترتيب مراحل CI/CD — code_fix

**السيناريو / المطلوب:**
الملف التالي يحتوي خللاً في المنطق يجعل النشر يحدث حتى لو فشل البناء:
```yaml
stages:
  - build
  - deploy

deploy-production:
  stage: deploy
  needs: []
  script:
    - docker compose up -d

build-production:
  stage: build
  script:
    - docker build -t myapp .
```

**المطلوب:**
1. حدد سبب المشكلة.
2. صحّح الملف بحيث تنتظر `deploy-production` نجاح `build-production` فعلياً.

**نموذج الحل:**
المشكلة أن `needs: []` في `deploy-production` يجعلها **لا تنتظر** أي وظيفة، فقد تعمل بالتوازي مع `build-production` أو حتى قبلها في بعض الإعدادات، رغم أن ترتيب `stages` وحده لا يكفي عند وجود `needs` صريحة تُلغي هذا الترتيب الافتراضي بين المراحل غير المتجاورة. التصحيح:
```yaml
deploy-production:
  stage: deploy
  needs:
    - job: build-production
  script:
    - docker compose up -d
```

---

### تمرين 3 (تمرين إضافي): سيناريو اختيار نوع الاختبار — scenario

**السيناريو / المطلوب:**
لديك 4 حالات اختبار مطلوبة لتطبيق تجارة إلكترونية. حدد لكل حالة نوع الاختبار الأنسب من: `Unit`, `Integration`, `Acceptance`, `UI`.
1. اختبار أن دالة `calculateDiscount(price, percentage)` تُرجع القيمة الصحيحة.
2. اختبار أن زر "أضف للسلة" يظهر بلون أخضر ويعمل عند الضغط عليه.
3. اختبار أن عملية "الشراء الكامل" تحقق فعلاً هدف صاحب المشروع بخصم الرصيد وتسجيل الطلب.
4. اختبار أن خدمة الدفع تتصل بنجاح مع بوابة الدفع الخارجية وتستلم رداً صحيحاً.

**المطلوب:**
1. صنّف كل حالة.

**نموذج الحل:**
1. `Unit test` — تختبر دالة واحدة محددة.
2. `UI test` — تختبر تجربة المستخدم البصرية.
3. `Acceptance test` — تختبر منطق العمل (business case) الكامل.
4. `Integration test` — تختبر تفاعل التطبيق مع خدمة خارجية.

---

### تمرين 4 (تمرين إضافي): تحويل موقف يدوي إلى Continuous Deployment — table_fill

**السيناريو / المطلوب:**
أكمل الجدول التالي بتحويل كل خطوة يدوية في عملية نشر تقليدية إلى مكافئها الآلي ضمن `Continuous Deployment`:

| الخطوة اليدوية التقليدية | المكافئ الآلي في Continuous Deployment |
| --- | --- |
| مطوّر يرسل الكود بالبريد لمسؤول التشغيل | ______ |
| مسؤول يبني التطبيق يدوياً على جهازه | ______ |
| مسؤول يرفع الملفات عبر FTP يدوياً | ______ |
| مدير يوافق شفهياً على النشر | ______ |

**المطلوب:**
1. أكمل العمود الثاني.

**نموذج الحل:**
| الخطوة اليدوية التقليدية | المكافئ الآلي في Continuous Deployment |
| --- | --- |
| مطوّر يرسل الكود بالبريد لمسؤول التشغيل | `git push` يُطلق pipeline تلقائياً |
| مسؤول يبني التطبيق يدوياً على جهازه | `Build System` يبني `build artifact` تلقائياً ضمن مرحلة `build` |
| مسؤول يرفع الملفات عبر FTP يدوياً | `scp`/`docker push` آلي ضمن السكربت |
| مدير يوافق شفهياً على النشر | لا موافقة بشرية إطلاقاً — النشر يحدث تلقائياً عند نجاح كل المراحل |

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تحليل مؤسسي — اختيار استراتيجية النشر

**السيناريو:**
شركة ناشئة صغيرة تملك سيرفراً واحداً فقط (`VPS`)، وتريد نشر تطبيق ويب مبني بـ `Docker` مع نطاقين مختلفين (`app.company.com` و `admin.company.com`) على نفس السيرفر، وتريد شهادات `HTTPS` تلقائية دون تكلفة إضافية.

**المطلوب:**
1. ما الأداة الأنسب لتوجيه الحركة بين النطاقين على نفس السيرفر؟ ولماذا؟
2. كيف تُفعَّل شهادات `HTTPS` تلقائياً وفق ما ورد في المحاضرة؟

**نموذج الحل:**
1. `Traefik`، لأنه مصمم خصيصاً للعمل مع `Docker` ويكتشف الحاويات تلقائياً بناءً على `labels`، مما يوفر إعداداً أبسط بكثير من `Nginx`/`Apache` التقليدي عند وجود عدة حاويات ونطاقات على نفس السيرفر.
2. عبر إضافة `label` باسم `traefik.http.routers.<name>.tls.certresolver=letsencrypt`، والذي يستخدم خدمة `Let's Encrypt` المجانية لتوليد وتجديد الشهادات تلقائياً لكل نطاق مُعرَّف بـ `Host()` في قاعدة التوجيه.

---

### تمرين 2: إكمال مخطط — تدفق CI/CD الكامل

**السيناريو:**
أمامك مخطط ناقص لتدفق `CI/CD` كامل من لحظة كتابة الكود حتى وصوله للمستخدم.

**المطلوب:**
أكمل الخطوات الناقصة (المشار لها بـ `؟`):
`كتابة الكود` → `؟` → `تشغيل الاختبارات الآلية` → `؟` → `بناء صورة Docker ورفعها` → `؟` → `تشغيل الحاوية على السيرفر`

**نموذج الحل:**
`كتابة الكود` → **`git push / دمج على main`** → `تشغيل الاختبارات الآلية` → **`نجاح مرحلة build (توليد build artifact)`** → `بناء صورة Docker ورفعها` → **`بدء مرحلة deploy (سحب أحدث صورة)`** → `تشغيل الحاوية على السيرفر`

---

### تمرين 3: جدول قرار — اختيار طريقة النقل المناسبة

**السيناريو:**
فريق تطوير يتعامل مع 3 أنواع استضافة مختلفة لثلاثة مشاريع مختلفة.

**المطلوب:**
أكمل الجدول باختيار طريقة النقل المناسبة لكل حالة (`FTP` أو `SSH` عبر مفاتيح) مع التعليل:

| نوع الاستضافة | طريقة النقل المناسبة | السبب |
| --- | --- | --- |
| استضافة مشتركة بـ PHP بلا وصول SSH | ______ | ______ |
| VPS خاص بالكامل، نشر آلي عبر GitLab CI | ______ | ______ |

**نموذج الحل:**
| نوع الاستضافة | طريقة النقل المناسبة | السبب |
| --- | --- | --- |
| استضافة مشتركة بـ PHP بلا وصول SSH | `FTP` | لا يوجد وصول `SSH` كامل عادةً في هذا النوع من الاستضافة كما ذكرت المحاضرة |
| VPS خاص بالكامل، نشر آلي عبر GitLab CI | `SSH` بمفتاح عام/خاص | أكثر أماناً ومناسب للأتمتة الكاملة بدون تدخل بشري لإدخال كلمة مرور |

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تتبّع pipeline بمرحلتين

**المدخل:**
```yaml
stages:
  - build
  - deploy
build-production:
  stage: build
  script:
    - docker build -t app:latest .
    - docker push app:latest
deploy-production:
  stage: deploy
  script:
    - docker compose pull --policy always
    - docker compose up -d
```
افترض أن `docker build` نجح، لكن `docker push` فشل بسبب انقطاع الشبكة.

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تنفيذ `docker build -t app:latest .` | ؟ |
| 2 | تنفيذ `docker push app:latest` | ؟ |
| 3 | مرحلة `build` ككل | ؟ |
| 4 | مرحلة `deploy` | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تنفيذ `docker build -t app:latest .` | نجاح ✅ |
| 2 | تنفيذ `docker push app:latest` | فشل ❌ (انقطاع شبكة) |
| 3 | مرحلة `build` ككل | فشل ❌ (لأن أي سطر فاشل في `script` يوقف الوظيفة) |
| 4 | مرحلة `deploy` | **لا تبدأ إطلاقاً** ❌ (لأن `stages` تمنع بدء `deploy` قبل نجاح `build`) |

**النتيجة:** لا يصل أي تحديث للسيرفر — التطبيق يبقى على النسخة السابقة، وهذا سلوك آمن ومقصود يمنع نشر كود غير مكتمل.

---

### تمرين تتبع 2: تتبّع متغيرات البيئة بين dev و prod

**المدخل:**
متغيّر `SITE_DOMAIN` معرَّف بقيمتين: `dev.example.com` لبيئة `dev`، و `example.com` لبيئة `prod`. فريق ينفّذ `git push` على فرع `dev` ثم لاحقاً على فرع `main`.

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `push` على فرع `dev` | ؟ |
| 2 | قيمة `SITE_DOMAIN` المُستخدمة | ؟ |
| 3 | `push` على فرع `main` | ؟ |
| 4 | قيمة `SITE_DOMAIN` المُستخدمة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `push` على فرع `dev` | تعمل وظيفة `deploy-dev` فقط (بسبب `only: - dev`) |
| 2 | قيمة `SITE_DOMAIN` المُستخدمة | `dev.example.com` (بيئة `dev`) |
| 3 | `push` على فرع `main` | تعمل وظيفة `deploy-prod` فقط (بسبب `only: - main`) |
| 4 | قيمة `SITE_DOMAIN` المُستخدمة | `example.com` (بيئة `prod`) |

**النتيجة:** كل فرع يُشغّل الوظيفة المرتبطة به فقط، وتُستخدم القيم الصحيحة تلقائياً لكل بيئة دون تدخل يدوي أو خطر تسريب.

---

### تمرين تتبع 3: تتبّع مفتاح SSH من التوليد حتى الاستخدام

**المدخل:**
مطوّر ينفّذ `ssh-keygen` على جهازه، ثم يريد استخدام النتيجة لنشر آلي عبر `GitLab CI`.

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة/الموقع |
| --- | --- | --- |
| 1 | تنفيذ `ssh-keygen` | ؟ |
| 2 | المفتاح الخاص (`private key`) | ؟ |
| 3 | المفتاح العام (`public key`) | ؟ |
| 4 | تنفيذ الـ pipeline | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة/الموقع |
| --- | --- | --- |
| 1 | تنفيذ `ssh-keygen` | ينتج زوج مفاتيح (خاص وعام) على جهاز المطوّر |
| 2 | المفتاح الخاص (`private key`) | يُنسخ ويُخزَّن في `GitLab CI/CD Variables` (مثل `TICKET963_KEY`) |
| 3 | المفتاح العام (`public key`) | يُضاف إلى ملف `authorized_keys` على السيرفر الهدف |
| 4 | تنفيذ الـ pipeline | يُحقَن المفتاح الخاص عبر `ssh-add` من المتغيّر، فيتصل بالسيرفر دون كلمة مرور لأن السيرفر يتعرّف على المفتاح العام المطابق |

**النتيجة:** اتصال `SSH` آلي وآمن بالكامل دون أي تدخل بشري لإدخال بيانات اعتماد أثناء تنفيذ الـ pipeline.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الفرق بين `Continuous Integration` و`Continuous Delivery`؟
A: `CI` يدمج الكود ويختبره وينتج `build artifact`؛ `CD` يأخذ هذا الـ artifact ويجهّزه للنشر الفعلي على الإنتاج.

**Q2:** ما الخطوة الوحيدة المختلفة بين `Continuous Delivery` و`Continuous Deployment`؟
A: خطوة `Deploy to Production` — يدوية في `Delivery`، آلية بالكامل في `Deployment`.

**Q3:** ما هي أنواع الاختبارات الأربعة في `CI` وفق المحاضرة؟
A: `Unit tests`, `Integration tests`, `Acceptance tests`, `User interface tests`.

**Q4:** ما هي المهام الثلاث الرئيسية لـ `Build System`؟
A: إدارة الاعتماديات، توليد الحزمة النهائية، وتنفيذ الاختبارات حتى مستوى `Integration testing`.

**Q5:** ما ملف تهيئة الاعتماديات في `Maven`؟
A: ملف `pom.xml` بصيغة `XML`.

**Q6:** أين يُخزَّن مفتاح `SSH` الخاص بأمان في `GitLab`؟
A: داخل `CI/CD Variables`، وليس داخل الكود مباشرة.

**Q7:** ما وظيفة الحقل `only: - main` في وظيفة `GitLab CI`؟
A: يحدد أن الوظيفة تعمل فقط عند حدوث تغيير على فرع `main`.

**Q8:** ما الفرق بين `only` و `environment` في `GitLab CI`؟
A: `only` تحدد متى تعمل الوظيفة (أي فرع)، بينما `environment` تحدد أي مجموعة قيم متغيرات تُستخدم.

**Q9:** ما اسم أداة إدارة الحاويات بواجهة رسومية المذكورة في المحاضرة؟
A: `Portainer`.

**Q10:** ما اسم الأداة المستخدمة لمراقبة السيرفر وجمع سجلات (`logs`) الحاويات؟
A: `Prometheus` لمراقبة النظام، و`Promtail` مع `Loki` لإدارة السجلات، وتُعرض عبر `Grafana`.

**Q11:** لماذا يُفضَّل `Traefik` على إعداد `Nginx`/`Apache` يدوياً في بيئة `Docker`؟
A: لأنه يكتشف الحاويات ويوجّه الحركة إليها تلقائياً عبر `labels` بسيطة، بدلاً من إعداد يدوي معقّد.

**Q12:** ما الفرق بين `APK` و`AAB` في تطبيقات Android؟
A: `APK` قابل للتثبيت المباشر، بينما `AAB` مخصص للنشر عبر `Google Play Store`.

**Q13:** ما اسم متغيّر `GitLab` المدمج المستخدم لإعطاء وسم فريد لكل صورة `Docker` في مثال المحاضرة؟
A: `$CI_PIPELINE_IID`.

**Q14:** ما وظيفة `label: traefik.enable=true`؟
A: تفعيل توجيه `Traefik` صراحة لهذه الحاوية تحديداً؛ بدونها يتم تجاهل الحاوية بالكامل.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> **مرجع واحد يجمع كل الأجزاء المتفرقة لملف `.gitlab-ci.yml` الكامل كما شُرح على دفعات في الجزء الأول (القسم 4.1)، بالإضافة إلى ملف `docker-compose.yml` مع `Traefik` (القسم 5). هذان مشروعان مختلفان (pipeline و docker-compose) لذلك بقيا في كتلتين منفصلتين ولم يُدمَجا.**

```yaml
# ===== .gitlab-ci.yml : Full pipeline reference =====

# Define the execution order of stages
stages:
  - build
  - deploy

# Global environment variables available to all jobs
variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ""
  IMAGE_TAG: $CI_PIPELINE_IID

# ---- Build stage ----
build-production:
  stage: build
  image: docker:latest
  needs: []
  only:
    - main
  tags:
    - Main
  before_script:
    # Authenticate against the container registry
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
  script:
    - echo $CI_REGISTRY
    - echo $CI_REGISTRY_IMAGE
    # Build the image with two tags: a unique pipeline tag and "latest"
    - docker build --no-cache -t $CI_REGISTRY_IMAGE:$IMAGE_TAG -t $CI_REGISTRY_IMAGE:latest .
    # Push both tags to the registry
    - docker push $CI_REGISTRY_IMAGE:$IMAGE_TAG
    - docker push $CI_REGISTRY_IMAGE:latest

# ---- Deploy stage (same server as GitLab) ----
deploy-production:
  stage: deploy
  image: docker:latest
  needs: []
  only:
    - main
  tags:
    - Main
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
  script:
    - docker compose -f docker-compose.yml pull --policy always
    - docker compose -f docker-compose.yml up -d

# ---- Deploy stage (remote server via SSH) ----
deploy-remote-example:
  stage: deploy
  image: docker:latest
  needs: []
  only:
    - main
  tags:
    - Main
  before_script:
    - apk add --no-cache openssh
    - eval $(ssh-agent -s)
    - mkdir -p ~/.ssh/
    - echo "${TICKET963_KEY}" | ssh-add -
    - echo "StrictHostKeyChecking no" >> ~/.ssh/config
    - echo SITE_DOMAIN=${SITE_DOMAIN} >> .env
    - echo CI_REGISTRY_IMAGE=${CI_REGISTRY_IMAGE} >> .env
    - echo IMG_TAG=latest >> .env
  script:
    - scp docker-compose.yml root@ticket963.com:/root/
    - scp .env root@ticket963.com:/root/
    - ssh root@ticket963.com "docker login -u \"${CI_REGISTRY_USER}\" -p \"${CI_REGISTRY_PASSWORD}\" \"${CI_REGISTRY}\" && docker compose -f docker-compose.yml pull --policy always && docker compose -f docker-compose.yml up -d"
    - ssh root@ticket963.com "rm docker-compose.yml .env"

# ---- Multi-environment example (dev / prod) ----
deploy-dev:
  stage: deploy
  image: docker:latest
  needs:
    - job: build-dev
  only:
    - dev
  tags:
    - Main
  environment:
    name: dev

deploy-prod:
  stage: deploy
  image: docker:latest
  needs:
    - job: build-prod
  only:
    - main
  tags:
    - Main
  environment:
    name: prod
```

```yaml
# ===== docker-compose.yml : Traefik-based deployment reference =====

services:
  landing:
    container_name: landing
    image: $CI_REGISTRY_IMAGE:latest
    restart: always
    networks:
      - web
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
      - 'traefik.http.routers.landing.priority=1000'
      - 'traefik.http.routers.landing.entrypoints=websecure'
      - 'traefik.http.routers.landing.tls.certresolver=letsencrypt'
      - 'traefik.http.services.landing.loadbalancer.server.port=80'

networks:
  web:
    external: true
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: ما هو `DevOps` وما هي أبرز أهدافه؟
**نموذج الإجابة:**
1. التعريف: ثقافة عمل وأدوات تدمج وتؤتمت العمليات بين فرق التطوير والتشغيل.
2. المكونات/الشروط: تمكين الفريق (`Team empowerment`)، التواصل والتعاون، أتمتة العمليات.
3. مثال: فريق يدمج ويختبر وينشر الكود آلياً عدة مرات باليوم بدل مرة كل شهر يدوياً.
4. متى نستخدم: عندما تريد المؤسسة زيادة تكرار النشر، تسريع الوصول للسوق، تقليل نسبة الفشل، تقصير زمن التسليم، وتحسين زمن الاسترجاع.

### سؤال 2: اشرح مراحل CI/CD الثلاث وعلاقتها ببعضها.
**نموذج الإجابة:**
1. التعريف: `Continuous Integration` (دمج واختبار متكرر)، `Continuous Delivery` (تجهيز للنشر مع موافقة يدوية أخيرة)، `Continuous Deployment` (نشر تلقائي كامل).
2. المكونات/الشروط: كل مرحلة تعتمد على نجاح سابقتها؛ `CI` جزء من كلتا المرحلتين الأخريين.
3. مثال: كود يُدمج ويُختبر (`CI`) → يُجهّز كـ `build artifact` (`CD`) → يُنشر تلقائياً دون موافقة بشرية (`Continuous Deployment`).
4. متى نستخدم: `Continuous Deployment` مناسب لفرق ناضجة تثق باختباراتها الآلية بالكامل؛ `CD` مناسب حين تريد مراجعة بشرية أخيرة قبل الإنتاج.

### سؤال 3: ما وظيفة `Build System` وما الفرق بين أدواته الشائعة؟
**نموذج الإجابة:**
1. التعريف: تطبيق أو مجموعة تطبيقات تُؤتمت بناء واختبار المشروع.
2. المكونات/الشروط: إدارة الاعتماديات، توليد الحزمة، تنفيذ الاختبارات حتى `Integration testing`.
3. مثال: `Maven`/`Gradle` لـ `Java` عبر `pom.xml`/`build.gradle`؛ `NPM`/`YARN` لـ `NodeJS` عبر `package.json`.
4. متى نستخدم: أي مشروع برمجي حقيقي يحتاج اعتماديات خارجية وتوليد حزمة نهائية موثوقة ومتكررة.

### سؤال 4: كيف تُحل مشكلة "تعارض إصدارات الاعتماديات" في نظام بناء حديث؟
**نموذج الإجابة:**
1. التعريف: `Build System` يتحمل مسؤولية تتبّع وحل الاعتماديات الفرعية المتشابكة بدلاً من المطوّر.
2. المكونات/الشروط: تحديد الإصدار الدقيق لكل مكتبة، تحديد نطاق الاستخدام (`scope`)، حل تلقائي للتعارضات.
3. مثال: مكتبتان تطلبان إصدارين مختلفين من مكتبة ثالثة — الأداة تحل التعارض وفق قواعدها الداخلية بدل تعطّل يدوي.
4. متى نستخدم: في أي مشروع متوسط أو كبير الحجم يعتمد على أكثر من مكتبة خارجية واحدة.

### سؤال 5: ما الفرق بين `CI/CD Variables` و`Environments` في GitLab، ولماذا نحتاج كليهما؟
**نموذج الإجابة:**
1. التعريف: `CI/CD Variables` تخزين آمن للبيانات (سرية أو غير سرية) تُحقن أثناء التنفيذ؛ `Environments` تجميع منطقي يربط قيماً مختلفة من المتغيرات ببيئة معيّنة (`dev`/`prod`).
2. المكونات/الشروط: يمكن لنفس اسم المتغيّر أن يحمل قيماً مختلفة لكل `Environment`.
3. مثال: `SITE_DOMAIN` يحمل `dev.example.com` في بيئة `dev` و`example.com` في `prod`.
4. متى نستخدم: عندما يحتاج نفس منطق الـ pipeline للعمل بأمان على أكثر من بيئة نشر دون تكرار الكود.

### سؤال 6: قارن بين `Continuous Delivery` و`Continuous Deployment` من ناحية المخاطر والفوائد.
**نموذج الإجابة:**
1. التعريف: كلاهما امتداد لـ `CI`؛ يختلفان في وجود موافقة بشرية على النشر النهائي.
2. المكونات/الشروط: `Delivery` = مرونة وأمان أعلى بموافقة يدوية؛ `Deployment` = سرعة أعلى وتغذية راجعة أسرع لكن يتطلب ثقة عالية بالاختبارات الآلية.
3. مثال: مؤسسة مالية حساسة قد تفضّل `CD` لمراجعة أخيرة، بينما شركة تقنية سريعة الحركة تفضّل `Continuous Deployment`.
4. متى نستخدم: حسب مستوى نضج فريق الاختبار الآلي ومدى حساسية النظام المنشور.

### سؤال 7: اشرح آلية عمل `Traefik` ولماذا يُفضَّل مع Docker.
**نموذج الإجابة:**
1. التعريف: خادم وكيل عكسي (`reverse proxy`) مصمم خصيصاً للتكامل مع `Docker`.
2. المكونات/الشروط: يستمع على منفذي `80`/`443`، يكتشف الحاويات عبر `labels`، ويوجّه الحركة تلقائياً بناءً على النطاق (`Host`).
3. مثال: إضافة `labels` بسيطة لحاوية `docker-compose.yml` تكفي لربطها بنطاق مع شهادة `HTTPS` تلقائية.
4. متى نستخدم: عند وجود عدة حاويات/نطاقات على نفس السيرفر، لتفادي إعداد `Nginx`/`Apache` اليدوي المعقّد.

### سؤال 8: ما أهمية استخدام مفاتيح `SSH` (عام/خاص) بدل كلمة المرور في `CI/CD`؟
**نموذج الإجابة:**
1. التعريف: آلية مصادقة عبر زوج مفاتيح رياضي بدل بيانات اعتماد نصية.
2. المكونات/الشروط: مفتاح خاص يبقى سرياً في `CI/CD Variables`، ومفتاح عام يُضاف لـ `authorized_keys` على السيرفر.
3. مثال: pipeline يتصل بسيرفر بعيد دون أي إدخال بشري لكلمة مرور في كل تشغيل.
4. متى نستخدم: في كل عملية نشر آلية تتطلب اتصال `SSH` غير مراقَب بشرياً، لأنها أكثر أماناً وملاءمة للأتمتة.

### سؤال 9: لماذا تُعتبر "الأربعة أنواع من الاختبارات" ضرورية معاً وليس نوعاً واحداً كافياً؟
**نموذج الإجابة:**
1. التعريف: `Unit`, `Integration`, `Acceptance`, `UI tests` — كل نوع يغطي مستوى مختلفاً من التطبيق.
2. المكونات/الشروط: `Unit` يغطي الوحدات الصغيرة، `Integration` التفاعل بين المكونات، `Acceptance` منطق العمل، `UI` تجربة المستخدم.
3. مثال: دالة صحيحة منطقياً (`Unit` ناجح) قد تفشل عند ربطها بقاعدة بيانات حقيقية (`Integration` يكشفها).
4. متى نستخدم: دائماً معاً ضمن `CI` لتغطية كل زاوية محتملة للخطأ قبل الوصول للإنتاج.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح تعريف `DevOps` وأهدافه الخمسة بالتفصيل
- [ ] أفهم الفرق بين `Continuous Integration`, `Continuous Delivery`, `Continuous Deployment`
- [ ] أستطيع تسمية أنواع الاختبارات الأربعة وأمثلة لكل نوع
- [ ] أفهم دور `Build System` ووظائفه الثلاث الرئيسية
- [ ] أعرف الفرق بين `Maven`, `Gradle`, و`NPM`/`YARN` من ناحية ملفات التهيئة
- [ ] أفهم آلية `Dependency Management` وسبب أهميتها
- [ ] أعرف أمثلة `Package Generation` حسب نوع التطبيق (JAR, APK/AAB, setup.exe, Docker image)
- [ ] أستطيع قراءة وتحليل ملف `.gitlab-ci.yml` كاملاً (stages, jobs, variables, needs, only, tags)
- [ ] أفهم الفرق بين `only` و`environment`
- [ ] أعرف كيف تُستخدم `SSH keys` (عام/خاص) في `CI/CD` ولماذا هي أكثر أماناً
- [ ] أفهم دور `CI/CD Variables` في حماية الأسرار
- [ ] أستطيع شرح كيفية عمل `Traefik` مع `labels` في `docker-compose.yml`
- [ ] أعرف أدوات المراقبة والإدارة المكمّلة (`Portainer`, `Grafana`, `Prometheus`, `Loki`/`Promtail`)
- [ ] أفهم الفرق بين `GitLab CI` و`GitHub Actions` من ناحية الملف والمنطق العام

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| محاضرة `Docker` السابقة | محاضرة `DevOps` الحالية | صور `Docker` هي مخرج `Package Generation` وأساس النشر عبر `.gitlab-ci.yml` و`Traefik` |
| مفاهيم `Git` الأساسية | `GitLab CI/CD` | `git push` هو الحدث الذي يُطلق كل `pipeline` تلقائياً |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| `DevOps` | ثقافة + أدوات، وليس أداة واحدة فقط |
| `CI/CD` | `CI` أساس مشترك لكل من `CD` و`Continuous Deployment` |
| الأمان | لا أسرار أبداً داخل ملفات `YAML` — استخدم `CI/CD Variables` |
| `Traefik` | `labels` بديل بسيط عن إعداد `reverse proxy` يدوي معقّد |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `$CI_PIPELINE_IID` | رقم تسلسلي فريد لكل تشغيل pipeline | وسم صورة Docker |
| `needs: []` | عدم انتظار أي وظيفة أخرى | ملفات .gitlab-ci.yml |
| `only: - main` | العمل فقط عند تغيير على main | تحديد الفرع المسموح |
| `traefik.enable=true` | تفعيل التوجيه لهذه الحاوية | docker-compose.yml مع Traefik |
| `certresolver=letsencrypt` | شهادة HTTPS تلقائية مجانية | إعداد Traefik |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | الفرع المكسور = أولوية الإصلاح القصوى فوراً |
| 2 | الأسرار دائماً في `CI/CD Variables`، أبداً في الكود |
| 3 | `stages` تحدد الترتيب، `needs` تحدد الاعتمادية الصريحة بين الوظائف |
| 4 | `Traefik` لا يعمل لحاوية بدون `traefik.enable=true` |
| 5 | `only` = متى تعمل الوظيفة، `environment` = أي قيم متغيرات تُستخدم |

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, theory, checklist, cheat_sheet
mcq_count: 16
code_blocks: 17
-->

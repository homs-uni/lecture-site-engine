# المحاضرة 2 — نظام التحكم في الإصدارات: Git (العنوان بالعربي: أنظمة التحكم بالإصدارات وGit)
> **المادة:** إدارة المشاريع (القسم النظري والعملي) | **الموضوع:** `Version Control System` (VCS) و`Git`

---
## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. أنظمة التحكم بالإصدارات (Version Control System)

#### النص الأصلي يقول:
> "Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later... you use it to track changes you do to file and undo changes and revert back to old state"

#### الشرح المبسّط:
`Version Control` هو نظام يسجّل كل تعديل يحدث على ملف أو مجموعة ملفات عبر الزمن، بحيث تستطيع الرجوع لأي نسخة قديمة متى شئت.

**لماذا؟** لأن أي مشروع برمجي يتغيّر باستمرار، وبدون نظام يسجّل التاريخ، لو حدث خطأ لن تعرف متى ولماذا حدث، ولن تستطيع الرجوع لنسخة سليمة.

#### 💡 التشبيه:
> تخيّل أنك تكتب بحثاً جامعياً وتحفظ نسخة جديدة كل يوم باسم مختلف (بحث_يوم1، بحث_يوم2...).
> **وجه الشبه:** كل نسخة محفوظة = `commit` في Git، والقدرة على فتح أي نسخة قديمة = `checkout`/`revert`.

#### نقطة مهمة ⚠️:
> `VCS` لا يقتصر على المبرمجين فقط — أي شخص يتعامل مع ملفات متغيّرة (مصمم جرافيك، كاتب) يستفيد منه.

### 1.1. لماذا نستخدم VCS؟

#### النص الأصلي يقول:
> "if you are a graphic or web designer and want to keep every version of an image or layout a Version Control System (VCS) is a very wise thing to use... Compare changes over time, see who last modified something... (git blame)"

#### الشرح المبسّط:
فوائد استخدام `VCS`:
1. الرجوع لملفات معينة فقط لحالة سابقة.
2. الرجوع للمشروع كاملاً لحالة سابقة.
3. مقارنة التغييرات بمرور الزمن.
4. معرفة من قام بآخر تعديل سبّب مشكلة عبر أمر `git blame`.

**لماذا؟** لأن العمل الجماعي على نفس الملفات بدون تتبّع يؤدي لفوضى وتضارب لا يمكن تفسيره لاحقاً.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو حذفتَ بالخطأ دالة مهمة من الكود قبل أسبوع ولم تلاحظ إلا الآن، كيف يساعدك `VCS`؟
> **لماذا هذا مهم؟** لأنه يوضّح الفرق بين العمل بدون تتبع (ضياع دائم) والعمل معه (رجوع لأي `commit` سابق).

### 2. أنواع VCS

#### النص الأصلي يقول:
> "The types of VCS: Local, Centralized, Decentralized"

#### الشرح المبسّط:
هناك 3 أنواع رئيسية لأنظمة التحكم بالإصدارات، تطورت الواحدة بعد الأخرى لحل مشاكل التي قبلها: `Local VCS` ثم `Centralized VCS (CVCS)` ثم `Distributed VCS (DVCS)`.

**لماذا؟** كل نوع جديد ظهر ليحل قصور النوع السابق (كما سنرى بالتفصيل بالأقسام التالية).

### 2.1. Local VCS

#### النص الأصلي يقول:
> "local VCS has a simple database that kept all the changes to files under revision control... called RCS... RCS works by keeping patch sets (that is, the differences between files) in a special format on disk it can then re-create what any file looked like at any point in time by adding up all the patches."

#### الشرح المبسّط:
`Local VCS` هو أبسط نوع؛ قاعدة بيانات بسيطة على جهازك تحفظ كل تغيير حدث لملف. أشهر أداة قديمة هي `RCS`، وهي تحفظ فقط "الفروقات" (`patches` / `Δ`) بين كل نسخة والتي تليها، وعند الحاجة لاسترجاع نسخة معينة تقوم بجمع كل الفروقات بالترتيب.

**لماذا؟** توفير مساحة تخزين — بدل حفظ الملف كاملاً في كل مرة، تُحفظ فقط الأجزاء المتغيّرة.

#### ⚙️ الخطوات / الخوارزمية: استرجاع نسخة قديمة في RCS

> الهدف: إعادة بناء شكل الملف عند نسخة معينة من سلسلة الفروقات (deltas).

```algorithm
1 | تحديد النسخة المطلوبة | RCS | تحديد رقم Version المطلوب استرجاعه
2 | جلب النسخة الأساسية | RCS | قراءة أقدم نسخة كاملة محفوظة (Base)
3 | تطبيق الفروقات بالترتيب | RCS | تطبيق كل Δ تباعاً حتى نصل للنسخة المطلوبة
4 | إخراج الملف | RCS | عرض شكل الملف النهائي المطلوب
```

#### نقاط التنفيذ:
- إذا كان هناك خطأ في أي `Δ` وسط السلسلة، تفسد كل النسخ التي تليها.
- `Local VCS` لا يدعم التعاون بين عدة أشخاص لأن قاعدة البيانات على جهاز واحد فقط.

#### الفهم الخاطئ الشائع ❌: `RCS` يحفظ نسخة كاملة من الملف في كل مرة.
#### الفهم الصحيح ✅: `RCS` يحفظ فقط الفروقات (`patch sets`) بين النسخ، لا الملفات كاملة.

### 2.2. Centralized Version Control Systems (CVCS)

#### النص الأصلي يقول:
> "In order to collaborate with developers on other systems. Centralized Version Control Systems (CVCSs) were developed... (such as CVS, Subversion, and Perforce) have a single server that contains all the versioned files, and a number of clients that check out files from that central place"

#### الشرح المبسّط:
لحل مشكلة عدم التعاون في `Local VCS`، ظهرت `CVCS`: خادم مركزي واحد (`shared repository`) يحتوي كل الملفات وتاريخها، وكل مطوّر (`client`) يتصل بهذا الخادم لجلب أو حفظ الملفات. من أشهرها: `CVS`, `Subversion`, `Perforce`.

**لماذا؟** لأن فريق العمل يحتاج مصدراً واحداً موثوقاً يعرف الجميع من خلاله ماذا يفعل الآخرون.

#### 💡 التشبيه:
> تخيّل مكتبة عامة فيها نسخة واحدة فقط من كل كتاب، وكل من يريد التعديل عليه يذهب للمكتبة نفسها.
> **وجه الشبه:** المكتبة = `shared repository`، القرّاء = `developers/clients`.

### 2.2.1. مزايا وعيوب CVCS

#### النص الأصلي يقول:
> "everyone knows to a certain degree what everyone else on the project is doing... Administrators have fine-grained control... However... The most obvious is the single point of failure that the centralized server represents. If that server goes down for an hour, then during that hour nobody can collaborate at all"

#### الشرح المبسّط:
**الميزة:** الجميع يعرف ماذا يفعل الآخرون، والإدارة سهلة لأن التحكم بالصلاحيات مركزي.
**العيب الكبير:** `Single Point of Failure` — لو تعطّل الخادم المركزي ولو لساعة، يتوقف عمل الجميع تماماً، ولا يمكن حفظ أي تعديل.

**لماذا؟** لأن كل تاريخ المشروع موجود في مكان واحد فقط؛ فإذا سقط، سقط كل شيء معه.

#### ⚖️ المقايضة: Local VCS مقابل CVCS

| | `Local VCS` | `CVCS` |
| --- | --- | --- |
| المزايا | بسيط، لا يحتاج شبكة | يدعم التعاون، تحكم مركزي بالصلاحيات |
| العيوب | لا يدعم فريق عمل | نقطة فشل واحدة (Single Point of Failure) |
| متى تختاره | عمل فردي على ملفات محلية | فريق صغير بخادم موثوق ومستقر |

### 2.3. Distributed Version Control Systems (DVCS)

#### النص الأصلي يقول:
> "In a DVCS (such as Git, Mercurial or Darcs), clients don't just check out the latest snapshot of the files They fully mirror the repository, including its full history. Thus, if any server dies... any of the client repositories can be copied back up to the server to restore it."

#### الشرح المبسّط:
في `DVCS` مثل `Git` و`Mercurial` و`Darcs`، كل مطوّر (`client`) لا يأخذ فقط آخر نسخة، بل ينسخ (`mirror`) المستودع **كاملاً بتاريخه الكامل** على جهازه. فإذا تعطّل الخادم المركزي، يمكن استخدام أي نسخة عند أي مطوّر لاستعادة كل شيء.

**لماذا؟** هذا يحل مشكلة `Single Point of Failure` في `CVCS` تماماً، لأن كل نسخة محلية هي نسخة احتياطية كاملة.

#### ⚖️ المقايضة: CVCS مقابل DVCS

| | `CVCS` | `DVCS` |
| --- | --- | --- |
| المزايا | تحكم مركزي بسيط | لا نقطة فشل واحدة، عمل دون اتصال بالإنترنت ممكن |
| العيوب | نقطة فشل واحدة | كل جهاز يحتاج مساحة لتخزين التاريخ الكامل |
| متى تختاره | فرق صغيرة بخادم شديد الموثوقية | معظم المشاريع الحديثة (`Git` هو المعيار السائد) |

#### مهم للامتحان ⚠️:
> ركّز على الفرق الجوهري: في `CVCS` العميل يأخذ **آخر لقطة فقط**، وفي `DVCS` العميل يأخذ **المستودع كاملاً مع تاريخه**.

### 3. تاريخ Git (The History of Git)

#### النص الأصلي يقول:
> "During the early years of the Linux kernel maintenance (1991–2002), changes to the software were passed around as patches and archived files. In 2002, the Linux kernel project began using a proprietary DVCS called BitKeeper. In 2005... the tool's free-of-charge status was revoked. At this point Linus Torvalds... said: 'Fine I'll code it myself'"

#### الشرح المبسّط:
- 1991–2002: مشروع `Linux kernel` كان يُدار بتبادل ملفات `patches` يدوياً.
- 2002: بدأ استخدام أداة تجارية اسمها `BitKeeper`.
- 2005: انهارت العلاقة بين مجتمع `Linux` والشركة صاحبة `BitKeeper`، وأُلغيت الإتاحة المجانية للأداة.
- رد فعل `Linus Torvalds` (مبتكر `Linux`) كان: سيبني نظامه الخاص.

**لماذا؟** لأن الاعتماد على أداة تجارية مغلقة وضع المشروع مفتوح المصدر في خطر — وهذا درس مهم في إدارة المشاريع: الاعتماد على أداة خارجية له مخاطر (`Risk`) يجب إدارتها.

### 3.1. ولادة Git وأهدافه

#### النص الأصلي يقول:
> "For the next 6 months, Linus worked on Git... after day 1 git was tracking itself... Some of the goals of the new system were as follows: speed, Simple design, Strong support for non-linear development (thousands of parallel branches), Fully distributed, Able to handle large projects like the Linux kernel efficiently... Later Github appeared and it played a vital roles in making Git mainline"

#### الشرح المبسّط:
عمل `Linus Torvalds` على `Git` لمدة 6 أشهر فقط، وكانت الأداة قادرة على تتبّع نفسها بذاتها منذ اليوم الأول من التطوير! ثم سلّم المشروع لاحقاً إلى `Junio Hamano` وعاد لتطوير `Linux`.

أهداف تصميم `Git`:
1. السرعة (`speed`)
2. تصميم بسيط (`Simple design`)
3. دعم قوي للتطوير غير الخطي (آلاف الفروع المتوازية — `branches`)
4. توزيع كامل (`Fully distributed`)
5. القدرة على التعامل بكفاءة مع مشاريع ضخمة كـ `Linux kernel`

لاحقاً ظهرت منصة `Github` وساهمت بشكل كبير في جعل `Git` هو المعيار السائد عالمياً.

**لماذا؟** كل هدف من هذه الأهداف كان استجابة مباشرة لعيوب `BitKeeper` و`CVCS` القديمة.

#### 💡 التشبيه:
> `Git` وُلد من أزمة حقيقية، تماماً كمن يبني أداته الخاصة بعد أن خذلته أداة استأجرها.
> **وجه الشبه:** أزمة `BitKeeper` = الدافع، `Git` = الحل المصمم خصيصاً لتفادي نفس المشكلة.

### 4. بنية Git (Git Structure)

### 4.1. تخزين الفروقات (Delta-based / Difference Storage)

#### النص الأصلي يقول:
> "Most other systems store information as a list of file-based changes. These other systems (CVS, Subversion, Perforce, and so on) think of the information they store as a set of files and the changes made to each file over time (this is commonly described as delta-based version control)"

#### الشرح المبسّط:
أغلب أنظمة `VCS` القديمة (`CVS`, `Subversion`, `Perforce`) تخزّن البيانات كسلسلة من **الفروقات** (`Δ`) لكل ملف عبر الزمن — نفس فكرة `RCS` التي شرحناها سابقاً، وتُعرف هذه الطريقة باسم `delta-based version control`.

**لماذا؟** توفير المساحة، لكنها تجعل استرجاع أي نسخة قديمة أبطأ لأنه يحتاج إعادة "جمع" كل الفروقات بالترتيب.

### 4.2. تخزين اللقطات (Snapshot Storage) — طريقة Git

#### النص الأصلي يقول:
> "Git thinks of its data more like a series of snapshots of a miniature filesystem. With Git, every time you commit... Git basically takes a picture of what all your files look like at that moment... To be efficient, if files have not changed, Git doesn't store the file again, just a link to the previous identical file"

#### الشرح المبسّط:
`Git` مختلف جذرياً؛ في كل `commit` يأخذ "صورة" (`snapshot`) كاملة لكل ملفات المشروع في تلك اللحظة، وليس فقط الفروقات. لكن ولتوفير المساحة، إن لم يتغيّر ملف معيّن، لا يعيد `Git` تخزينه، بل يضع رابطاً (`link`) لنفس النسخة القديمة المخزّنة أصلاً.

**لماذا؟** لأن التعامل مع لقطات كاملة أسرع بكثير عند التنقّل بين النسخ (`checkout`) — لا حاجة لإعادة حساب فروقات متتالية.

#### 🔄 قبل / بعد: Commit في Git (نموذج اللقطات)

**قبل (Version 1):**
```text
File A -> A
File B -> B
File C -> C1
```

**بعد (Version 2، تغيّر الملف A فقط):**
```text
File A -> A1        (نسخة جديدة فعلياً)
File B -> B          (رابط لنفس نسخة الـ Version 1، لم يتغيّر)
File C -> C1          (رابط لنفس نسخة الـ Version 1، لم يتغيّر)
```

**ماذا تغيّر؟** فقط `File A` أُعيد تخزينه فعلياً، بينما `File B` و`File C` أصبحا مجرد إشارات (`links`) لنفس المحتوى القديم دون تكرار تخزينه.

### 4.3. لماذا Git أفضل؟ (السلامة عبر Checksums)

#### النص الأصلي يقول:
> "Because by storing snapshots you restore the entire file... Everything in Git is checksummed before it is stored and is then referred to by that checksum. This means it's impossible to change the contents of any file or directory without Git knowing about it... The mechanism that Git uses for this checksumming is called a SHA-1 hash. When you do actions in Git, nearly all of them only add data to the Git database."

#### الشرح المبسّط:
- استعادة ملف من `snapshot` أسرع وأأمن من استعادته من سلسلة فروقات (لا حاجة لإعادة بناء نسخ متعددة بالترتيب).
- كل شيء في `Git` يُحسب له بصمة رقمية (`checksum`) قبل التخزين، باستخدام خوارزمية `SHA-1 hash`. أي تغيير — ولو حرف واحد — يُغيّر هذه البصمة بالكامل، لذلك من المستحيل تعديل ملف دون أن يكتشف `Git` ذلك.
- معظم عمليات `Git` هي عمليات **إضافة بيانات فقط** لقاعدة بياناته (`append-only`)، ما يجعل فقدان المعلومات أو تلفها أثناء النقل شبه مستحيل دون اكتشافه.

**لماذا؟** هذا يمنح `Git` موثوقية عالية جداً — سلامة البيانات (`data integrity`) مضمونة تلقائياً بحكم التصميم لا كخاصية إضافية.

#### 💡 التشبيه:
> مثل بصمة الإصبع: أي تغيير طفيف بالملف = بصمة مختلفة تماماً، فيسهل اكتشاف أي تلاعب.
> **وجه الشبه:** بصمة الإصبع = `SHA-1 checksum`، الشخص = الملف/المحتوى.

### 5. مراحل Git (The Stages of Git)

#### النص الأصلي يقول:
> "Any repository in git has 3 stages: modified... staged... committed: Committed means that the data is safely stored in your local database"

#### الشرح المبسّط:
أي ملف في مستودع `Git` يمر بثلاث حالات:
1. **`Modified`**: عدّلتَ الملف لكن لم تحفظه بعد في قاعدة بيانات `Git`.
2. **`Staged`**: وضعتَ علامة على النسخة الحالية من الملف لتكون ضمن `commit` التالي (عبر `git add`).
3. **`Committed`**: البيانات محفوظة بأمان في قاعدة البيانات المحلية (`.git directory`).

**لماذا؟** وجود مرحلة `Staging` وسيطة يمنحك تحكماً دقيقاً: يمكنك اختيار جزء فقط من تعديلاتك ليدخل ضمن `commit` واحد، بدل إجبارك على حفظ كل شيء دفعة واحدة.

#### ⚙️ الخطوات / الخوارزمية: دورة حياة الملف في Git

> الهدف: توضيح انتقال الملف من التعديل حتى الحفظ الدائم.

```algorithm
1 | تعديل الملف | Working Directory | الملف يصبح Modified
2 | git add | Staging Area | الملف ينتقل إلى حالة Staged
3 | git commit | .git directory | الملف يصبح Committed بشكل دائم
4 | git checkout | Working Directory | استرجاع نسخة الملف من .git directory
```

#### نقاط التنفيذ:
- لا يمكن الانتقال من `Modified` مباشرة إلى `Committed` دون المرور بمرحلة `Staged`.
- `git checkout` تُستخدم لجلب نسخة المشروع من المستودع إلى مجلد العمل (`Working Directory`).

#### 🔍 تتبع التنفيذ: من تعديل ملف حتى حفظه

**المدخل:** ملف `README.md` جديد التعديل عليه.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فتحت الملف وعدّلت سطراً | `Modified` |
| 2 | نفّذت `git add README.md` | `Staged` |
| 3 | نفّذت `git commit -m "update readme"` | `Committed` |

**النتيجة:** الملف أصبح جزءاً دائماً من تاريخ المستودع المحلي (`.git directory`).

### 6. فروع Git (Git: Branches)

#### النص الأصلي يقول:
> "branches provide an isolated environment for the developer to work... in what is known as the Git-Flow, there are three important branches: master, staging, and develop... This allows someone to branch off of the master branch... and work on a feature or fix independently... they can merge the branch back into the master branch"

#### الشرح المبسّط:
`Branch` (فرع) هو بيئة عمل معزولة تسمح للمطوّر بالعمل على ميزة أو إصلاح دون التأثير على بقية المشروع. في نموذج `Git-Flow` الشهير هناك 3 فروع أساسية:
- `master` (أو `main`): الفرع الأب، يمثّل النسخة المنشورة فعلياً للمستخدمين (`deployed`).
- `staging`: حيث يتم اختبار الجودة (`QA`) قبل الإصدار الفعلي.
- `develop`: حيث يعمل المطوّرون يومياً.

بعد الانتهاء من العمل على فرع، يتم دمجه (`merge`) في `master` بضغطة زر.

**لماذا؟** بدون فروع، سيعمل الجميع على نفس النسخة مباشرة، فيتعطّل الإنتاج بأي خطأ بسيط أثناء التطوير. الفروع تفصل "التجربة" عن "الإنتاج".

#### 💡 التشبيه:
> تخيّل مطبخ مطعم فيه فرن رئيسي (`master`) للأطباق الجاهزة للتقديم، وطاولة تجارب (`develop`) للطهاة لتجربة وصفات جديدة قبل اعتمادها.
> **وجه الشبه:** الطاولة = `develop branch`، الفرن الرئيسي = `master branch`، تقديم الطبق للزبون بعد الموافقة = `merge`.

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| العمل مباشرة على `master` | عدم إنشاء فرع مستقل للميزة الجديدة | إنشاء `branch` جديد بـ `git branch` قبل البدء بالعمل |
| ظهور تعارض عند الدمج | تعديل نفس السطر في فرعين مختلفين | حل التعارض يدوياً ثم `commit` نتيجة الدمج |

### 7. واجهة سطر الأوامر في Git (Git: The CLI)

#### النص الأصلي يقول:
> "There are GUI tools for get, by they encapsulate the Git CLI. There are a lot of commands, we will look at: Clone, init, branch, pull, push, checkout, commit, fetch, add, stash, reset"

#### الشرح المبسّط:
توجد أدوات رسومية (`GUI`) لـ`Git`، لكنها في الحقيقة كلها "غلاف" (`wrapper`) حول أوامر `Git CLI` نفسها. الأوامر التي سنغطيها: `clone`, `init`, `branch`, `pull`, `push`, `checkout`, `commit`, `fetch`, `add`, `stash`, `reset` (بالإضافة إلى `revert` و`merge` و`rebase` كما وردت لاحقاً في المحاضرة).

**لماذا؟** فهم الأوامر الأساسية ضروري حتى لو استخدمت أداة رسومية، لأنها تنفّذ نفس المنطق خلف الكواليس.

### 7.1. git init

#### النص الأصلي يقول:
> "init: Allows us to create a repository inside a folder we navigate to the folder and enter the command git init. Simple and effecient. If you want to upload to git server, you need link the local repository with remote repository git remote add origin ... git push -u origin main (this will link the 2 branches in the local and remote repository)"

#### الشرح المبسّط:
`git init` يحوّل أي مجلد عادي إلى مستودع `Git` (بإنشاء مجلد `.git` بداخله). لربطه بخادم بعيد (`remote`) نستخدم `git remote add origin <url>`، ثم `git push -u origin main` لربط الفرع المحلي بالفرع البعيد لأول مرة.

**لماذا؟** المستودع المحلي وحده لا يكفي للعمل الجماعي؛ يجب ربطه بمستودع بعيد مشترك حتى يستطيع الآخرون الوصول لتعديلاتك.

#### ⚙️ الخطوات / الخوارزمية: تهيئة مستودع Git جديد وربطه بخادم بعيد

> الهدف: تحويل مجلد فارغ إلى مستودع Git متصل بخادم بعيد لأول مرة.

```algorithm
1 | git init | Git CLI | إنشاء مجلد .git داخل المشروع الحالي
2 | git remote add origin <url> | Git CLI | ربط المستودع المحلي بمستودع بعيد باسم origin
3 | git add . | Git CLI | وضع الملفات في مرحلة Staging
4 | git commit -m "first commit" | Git CLI | حفظ أول Commit محلياً
5 | git push -u origin main | Git CLI | رفع الفرع main وربطه بالفرع البعيد main
```

#### نقاط التنفيذ:
- خيار `-u` يجعل الأوامر اللاحقة `git push`/`git pull` تعرف تلقائياً الفرع البعيد المرتبط دون تحديده كل مرة.

### 7.2. clone / pull / fetch

#### النص الأصلي يقول:
> "clone: Used to get an entire repository Downloads an entire git repository from the remote server to your local machine... pull: Updates a current branch to match the remote Changes are visible to the user immediately. fetch: similar to pull, but it downloads the latest changes to a branch Doesn't change anything, changes remain in background."

#### الشرح المبسّط:
- `git clone <url>`: تحميل مستودع كامل (بكل تاريخه) من الخادم البعيد إلى جهازك للمرة الأولى. يمكن استخدام `--depth 1` لتحميل آخر نسخة فقط (بدون كل التاريخ) وتقليل حجم التحميل.
- `git pull`: تحديث الفرع الحالي ليطابق النسخة البعيدة، والتغييرات تظهر فوراً في ملفاتك.
- `git fetch`: يشبه `pull` لكنه فقط "يجلب" التغييرات ويخزّنها في الخلفية دون تعديل ملفاتك الحالية مباشرة.

**لماذا؟** `fetch` مفيد عندما تريد الاطّلاع على آخر تغييرات الفريق **قبل** دمجها فعلياً في عملك، بينما `pull` = `fetch` + `merge` تلقائي فوري.

#### ⚖️ المقايضة: git pull مقابل git fetch

| | `git pull` | `git fetch` |
| --- | --- | --- |
| المزايا | تحديث فوري وسريع للفرع | آمن، لا يغيّر ملفاتك مباشرة |
| العيوب | قد يسبب تعارضاً غير متوقع فوراً | يحتاج خطوة `merge` إضافية يدوياً |
| متى تختاره | متأكد من عدم وجود تعارض | تريد مراجعة التغييرات قبل الدمج |

### 7.3. add / commit / push

#### النص الأصلي يقول:
> "add: adds a modified file/folder to staging. commit: do the saving of the changes by appending a message to summarizing the change each commit gets a 6 char unique hexadecimal code as an ID. Push: Sends your local repository to the remote server You MUST have the save base as the remote... if the branches are not on the same base, you must pull, merge then push"

#### الشرح المبسّط:
- `git add`: يضيف ملف/مجلد معدّل إلى `Staging Area`.
- `git commit -m "message"`: يحفظ التغييرات بشكل دائم مع رسالة تلخّص التعديل، ويحصل كل `commit` على معرّف فريد (`ID`) من 6 خانات (`hexadecimal`).
- `git push`: يرسل مستودعك المحلي للخادم البعيد، لكن **يجب** أن تكون على نفس "الأساس" (`base`) مع النسخة البعيدة (أي: آخر `commit` مشترك)؛ وإلا يجب أولاً `pull` ثم `merge` ثم `push`.

**لماذا؟** شرط تطابق الأساس يمنع الكتابة فوق تعديلات الآخرين بالخطأ (`overwrite`) — `Git` يرفض الدفع حتى تدمج التغييرات الجديدة أولاً.

#### مهم للامتحان ⚠️:
> معرّف الـ `commit` المذكور بالمحاضرة هو 6 خانات (`hexadecimal`) — لكن الشائع فعلياً في `Git` الحقيقي هو `SHA-1` طويل (40 خانة) يُختصر لعرض 6-7 خانات فقط؛ التزم بما ورد حرفياً بالمحاضرة عند الإجابة.

### 7.4. branch / checkout

#### النص الأصلي يقول:
> "Branch: Allows the creating of new branches using git branch <new branch name> We cannot create a new branch if the branch is empty We cannot create a new branch from uncommitted branch List branches using git branch -l and all branches (local and remote) git branch -a Rename... git branch -m <new name>. Checkout: Allows the switching between branches git checkout <the other branch> We cannot checkout a branch from uncommitted branch We either commit or stash"

#### الشرح المبسّط:
- `git branch <name>`: ينشئ فرعاً جديداً. **لا يمكن** إنشاء فرع من فرع فارغ (بلا `commits`) أو فرع فيه تعديلات غير محفوظة (`uncommitted`).
- `git branch -l`: عرض الفروع المحلية. `git branch -a`: عرض كل الفروع (محلية + بعيدة).
- `git branch -m <new name>`: إعادة تسمية الفرع الحالي.
- `git checkout <branch>`: التبديل بين الفروع. **لا يمكن** التبديل إن كان هناك تعديلات غير محفوظة — يجب إما `commit` أو `stash` أولاً.

**لماذا؟** هذه القيود تحمي عملك من الضياع؛ `Git` يرفض تنفيذ عملية قد تفقد تعديلاتك دون تأكيد صريح منك.

#### الفهم الخاطئ الشائع ❌: يمكن دائماً عمل `checkout` لفرع آخر مباشرة مهما كانت حالة الملفات.
#### الفهم الصحيح ✅: إذا كانت هناك تعديلات غير محفوظة (`uncommitted`)، يجب أولاً `commit` أو `git stash` قبل التبديل.

### 7.5. stash / rebase

#### النص الأصلي يقول:
> "stash: Stashing allows you to save your current unstaged changes and bring your branch back to an unmodified state. When you stash, your changes are pushed onto a stack... rebase: When you perform a rebase, you are changing the base of your branch... a rebase will look at each commit on your branch and update the code to make it seem like you've been working off the new base all along."

#### الشرح المبسّط:
- `git stash`: يحفظ تعديلاتك غير المحفوظة (`unstaged`) مؤقتاً في مكدّس (`stack`) ويعيد الفرع لحالته النظيفة الأصلية — مفيد للتبديل السريع بين الفروع دون `commit`.
- `git rebase`: يغيّر "أساس" الفرع، بحيث يبدو وكأن كل `commits` فرعك بُنيت أصلاً فوق الأساس الجديد (بدل الدمج التقليدي الذي يترك تاريخاً متفرعاً).

**لماذا؟** `stash` يمنحك مرونة للتنقل السريع، و`rebase` يمنحك تاريخ `commits` أنظف وأكثر خطية (`linear history`) مقارنة بـ`merge`.

#### 💡 التشبيه:
> `stash` مثل وضع أغراضك في درج مؤقت لتنظيف الطاولة بسرعة، ثم إخراجها لاحقاً.
> **وجه الشبه:** الدرج = المكدّس (`stack`)، الأغراض = التعديلات غير المحفوظة.

### 7.6. revert / reset

#### النص الأصلي يقول:
> "revert: this will allow us to rollback a commit, but the changes stays in the git tree (list of commits) both the original commit and the reverted commit. reset: Reset changes the last commit (head) of a repository to the a certain commit (including all files and data) and delete all the other commits after it It is VERY DANGEROUS so be careful when using it"

#### الشرح المبسّط:
- `git revert`: يُلغي تأثير `commit` معيّن، لكنه **يضيف commit جديداً** يحمل الإلغاء، بحيث يبقى `commit` الأصلي والـ`commit` الملغي كلاهما في التاريخ.
- `git reset`: يغيّر مؤشر `HEAD` (آخر نقطة) للمستودع إلى `commit` معيّن ويحذف كل الـ`commits` التي بعده نهائياً — **خطير جداً** لأنه قد يسبب فقداناً دائماً للبيانات.

**لماذا؟** `revert` آمن للاستخدام على فروع مشتركة (تاريخ لا يُحذف)، بينما `reset` مناسب فقط للعمل المحلي غير المشارك بعد، لأن حذف `commits` مشتركة يسبب تعارضاً كارثياً للفريق.

#### ⚖️ المقايضة: git revert مقابل git reset

| | `git revert` | `git reset` |
| --- | --- | --- |
| المزايا | آمن، يحافظ على التاريخ كاملاً | يعيد الحالة تماماً كما كانت (تنظيف تاريخ) |
| العيوب | يترك أثراً إضافياً (commit إلغاء) | يحذف commits بشكل دائم — خطر فقدان بيانات |
| متى تختاره | فرع مشترك مع الفريق (مثل `main`) | فرع محلي شخصي لم يُرفع بعد للخادم |

### 7.7. merge

#### النص الأصلي يقول:
> "merges a source branch to the current target branch This will deletes the source (if we check the delete source flag)... It is bound to have at least 1 file modified by the 2 different users... So which one to use? This is the job of the maintainer, he can either accepts 1 version or in case he is feeling very confident, merge the 2 versions into one"

#### الشرح المبسّط:
`git merge` يدمج فرعاً مصدراً (`source`) في الفرع الحالي (`target`)، ويمكن حذف الفرع المصدر بعد الدمج إن اخترت ذلك. عند دمج فرعين، من المرجّح أن يكون هناك ملف عدّله شخصان مختلفان بطريقتين مختلفتين (`conflict`)، وقرار حل هذا التعارض (قبول نسخة واحدة أو دمج النسختين يدوياً) هو مسؤولية المسؤول عن الدمج (`maintainer`).

**لماذا؟** `Git` لا يستطيع أن يقرر تلقائياً أي نسخة "أصح" عند تعارض حقيقي في نفس السطر؛ القرار البشري ضروري هنا.

#### ⚙️ الخطوات / الخوارزمية: دمج فرعين (Merge) وحل التعارض

> الهدف: دمج فرع feature في الفرع الرئيسي وحل أي تعارض يظهر.

```algorithm
1 | git checkout main | Git CLI | الانتقال إلى الفرع الهدف (target)
2 | git merge feature | Git CLI | محاولة دمج فرع feature داخل main
3 | فحص وجود تعارض | Git CLI | Git يُعلم إن وُجد ملف معدّل من الطرفين
4 | حل التعارض يدوياً | المطوّر / Maintainer | اختيار نسخة أو دمج النسختين داخل الملف
5 | git add + git commit | Git CLI | حفظ نتيجة الدمج كـ commit جديد
```

#### نقاط التنفيذ:
- لا يمكن إكمال الدمج قبل حل كل التعارضات الظاهرة يدوياً.

### 8. هل يجب رفع (commit) كل الملفات؟

#### النص الأصلي يقول:
> "create a file named '.gitignored' All the files and folders you don't want to committed all, simply added to this file... This could include: Build files... Temporary files... IDE specific files, Security information like keys and encryption files"

#### الشرح المبسّط:
لا، لا يجب رفع كل شيء. نضع أسماء الملفات/المجلدات التي لا نريد تتبعها داخل ملف خاص (المذكور بالمحاضرة باسم `.gitignored`؛ والاسم القياسي المستخدم فعلياً في `Git` هو `.gitignore`). أمثلة على ما يجب استبعاده:
- ملفات البناء (`Build files`) الناتجة عن عملية `build`.
- الملفات المؤقتة أو الحزم المحمّلة من الإنترنت (عبر أدوات مثل `maven` أو `npm`).
- ملفات خاصة بالـ`IDE`.
- معلومات أمنية حسّاسة كالمفاتيح وملفات التشفير.

**لماذا؟** رفع هذه الملفات يُضخّم حجم المستودع بلا فائدة، وقد يسرّب بيانات أمنية حسّاسة، أو يسبب تعارضات لا معنى لها بين بيئات عمل مختلفة (`IDE` مختلف لكل مطوّر مثلاً).

#### نقطة مهمة ⚠️:
> ورد بالمحاضرة الاسم `.gitignored` — الاسم الصحيح تقنياً والمستخدم فعلياً في `Git` هو `.gitignore` (بدون `d` في النهاية). (شرح زيادة للفهم)

### 9. Github

#### النص الأصلي يقول:
> "Github is not git Well it is more Github, Gitlab, Gitea and many other like are software built around git they provide massive amount features on top of git like: Actions, issue management"

#### الشرح المبسّط:
`Github` ليس `Git` نفسه، بل منصة/برنامج **مبني حول** `Git` — وكذلك `Gitlab` و`Gitea` وغيرها. توفّر هذه المنصات ميزات إضافية ضخمة فوق `Git` الأساسي، مثل:
- `Actions`: أتمتة العمليات (`CI/CD` وغيرها).
- إدارة القضايا (`issue management`).

**لماذا؟** `Git` نفسه هو فقط أداة تحكم بالإصدارات تعمل محلياً وعبر أوامر `CLI`؛ المنصات مثل `Github` تضيف طبقة تعاون واستضافة وأتمتة فوقه.

### الأفكار الرئيسية الشاملة
> **أي فكرة محورية في المحاضرة لم تُغطَّ في الأقسام أعلاه:**

1. جميع أوامر الفصل السابع (`init, clone, add, commit, push, pull, fetch, branch, checkout, stash, rebase, revert, reset, merge`) هي الأدوات العملية الأساسية التي يجب إتقانها كوحدة واحدة، فهي متكاملة (مثال: `checkout` تفشل بدون `commit`/`stash` أولاً).
2. الفكرة الأعمق للمحاضرة كلها: التطور التاريخي (`Local → Centralized → Distributed`) لم يكن عشوائياً، بل كل خطوة حلّت مشكلة حقيقية واجهها المطوّرون، وهذا نمط شائع في تطور أدوات إدارة المشاريع بشكل عام.

---
## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Version Control System (VCS)` | نظام يسجّل تغييرات الملفات عبر الزمن ويسمح بالرجوع لأي نسخة | `git blame` لمعرفة آخر من عدّل سطراً |
| `Local VCS` | قاعدة بيانات محلية تحفظ فروقات الملفات (`patches`) | مثال: `RCS` |
| `CVCS` | خادم مركزي واحد يخزّن كل شيء، والعملاء يتصلون به | مثال: `CVS`, `Subversion`, `Perforce` |
| `DVCS` | كل عميل ينسخ المستودع كاملاً بتاريخه | مثال: `Git`, `Mercurial`, `Darcs` |
| `Snapshot Storage` | تخزين لقطة كاملة للمشروع بكل `commit` (طريقة `Git`) | عكس `delta-based` |
| `SHA-1 hash` | بصمة رقمية لكل بيانات `Git` تضمن سلامتها | أي تغيير يُغيّر البصمة بالكامل |
| `Staging Area` | منطقة وسيطة تجهّز التعديلات قبل الحفظ الدائم | تُملأ عبر `git add` |
| `Branch` | بيئة عمل معزولة داخل نفس المستودع | مثال: `master`, `develop`, `staging` |
| `.gitignore` | ملف يحدد ما لا يجب تتبّعه من ملفات | ملفات `build`, مفاتيح أمنية |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Working Directory` | مجلد العمل الفعلي على جهازك | تظهر فيه الملفات كما تعدّلها |
| `Staging Area` | تجهيز التعديلات قبل `commit` | تُعبّأ بـ `git add` |
| `.git directory` | قاعدة البيانات المحلية الدائمة | يُنشأ بـ `git init` أو `git clone` |
| `Remote Repository` | نسخة المستودع على الخادم البعيد | يُربط بـ `git remote add origin` |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| `pull` مقابل `fetch` | `git pull` | `git fetch` | `pull` يحدّث الملفات فوراً، `fetch` يجلب فقط دون تعديل الملفات |
| `revert` مقابل `reset` | `git revert` | `git reset` | `revert` يضيف commit إلغاء ويحافظ على التاريخ، `reset` يحذف commits نهائياً |
| `merge` مقابل `rebase` | `git merge` | `git rebase` | `merge` يحافظ على تفرّع التاريخ الحقيقي، `rebase` يعيد كتابة التاريخ ليبدو خطياً |
| `CVCS` مقابل `DVCS` | `CVCS` | `DVCS` | `CVCS` خادم مركزي وحيد، `DVCS` كل عميل نسخة كاملة من المستودع |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| أنواع VCS | `Local VCS`, `CVCS`, `DVCS` |
| مراحل الملف | `Modified`, `Staged`, `Committed` |
| أوامر أساسية | `init`, `clone`, `add`, `commit`, `push`, `pull`, `fetch` |
| أوامر متقدمة | `branch`, `checkout`, `stash`, `rebase`, `revert`, `reset`, `merge` |
| منصات | `Github`, `Gitlab`, `Gitea` |

### أبرز النقاط الذهبية
1. `Git` يخزّن `snapshots` وليس `deltas`، وهذا هو الفرق الجوهري عن الأنظمة القديمة.
2. كل بيانات `Git` محمية بـ `SHA-1 checksum`، فيستحيل تعديلها دون اكتشاف ذلك.
3. `DVCS` يحل مشكلة `Single Point of Failure` الموجودة في `CVCS` لأن كل عميل يملك نسخة كاملة.
4. لا يمكن `checkout` أو إنشاء `branch` من فرع فيه تعديلات غير محفوظة — يجب `commit` أو `stash` أولاً.
5. `git reset` خطير لأنه يحذف `commits` نهائياً، بينما `git revert` آمن لأنه يحافظ على التاريخ.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| الظن بأن `Github` هو نفسه `Git` | `Github` منصة مبنية فوق `Git` وتضيف ميزات إضافية مثل `Actions` |
| استخدام `git reset` على فرع مشترك مع الفريق | استخدام `git revert` بدلاً منه للحفاظ على التاريخ المشترك |
| نسيان `git add` قبل `git commit` | التعديل يبقى بحالة `Modified` فقط ولا يُحفظ بدون `add` |
| الظن أن `git fetch` يحدّث الملفات فوراً | `fetch` فقط يجلب البيانات بالخلفية، `pull` هو من يحدّث الملفات فعلياً |

---
### خطوات وإجراءات المحاضرة
> **كل عملية أو إجراء ورد في المحاضرة — كـ `algorithm` block مستقل بالترتيب.**

#### ⚙️ الخطوات / الخوارزمية: استرجاع نسخة قديمة في RCS (Delta-based)

> الهدف: توضيح كيف تسترجع الأنظمة القديمة نسخة سابقة من فروقاتها المحفوظة.

```algorithm
1 | تحديد النسخة المطلوبة | RCS | تحديد رقم Version
2 | جلب النسخة الأساسية | RCS | قراءة أقدم نسخة كاملة
3 | تطبيق الفروقات بالترتيب | RCS | تطبيق كل Δ حتى النسخة المطلوبة
```

#### نقاط التنفيذ:
- ترتيب تطبيق الفروقات إلزامي وحاسم؛ أي خلل بالترتيب يفسد النتيجة.

#### ⚙️ الخطوات / الخوارزمية: دورة حياة الملف عبر مراحل Git الثلاث

> الهدف: توضيح انتقال الملف من التعديل حتى الحفظ الدائم.

```algorithm
1 | تعديل الملف | Working Directory | الملف يصبح Modified
2 | git add | Staging Area | الملف ينتقل إلى Staged
3 | git commit | .git directory | الملف يصبح Committed
```

#### نقاط التنفيذ:
- لا يمكن تخطي مرحلة `Staged`.

#### ⚙️ الخطوات / الخوارزمية: تهيئة مستودع جديد وربطه بخادم بعيد

> الهدف: تحويل مجلد عادي إلى مستودع Git متصل بالخادم لأول مرة.

```algorithm
1 | git init | Git CLI | إنشاء .git داخل المشروع
2 | git remote add origin <url> | Git CLI | ربط المستودع بخادم بعيد باسم origin
3 | git push -u origin main | Git CLI | رفع وربط الفرع main بالفرع البعيد
```

#### نقاط التنفيذ:
- `-u` يحفظ الربط لتُستخدم أوامر push/pull لاحقاً دون تحديد الفرع كل مرة.

#### ⚙️ الخطوات / الخوارزمية: التبديل الآمن بين الفروع (Checkout)

> الهدف: تجنّب فقدان التعديلات غير المحفوظة عند تبديل الفرع.

```algorithm
1 | فحص حالة الملفات | Git CLI | التحقق إن كانت هناك تعديلات Uncommitted
2 | git commit أو git stash | Git CLI | حفظ التعديلات أو تخزينها مؤقتاً
3 | git checkout <branch> | Git CLI | الانتقال الآمن إلى الفرع الآخر
```

#### نقاط التنفيذ:
- تجاهل الخطوة 2 يجعل `Git` يرفض تنفيذ `checkout`.

#### ⚙️ الخطوات / الخوارزمية: دمج فرعين وحل التعارض (Merge)

> الهدف: دمج فرع feature داخل الفرع الرئيسي بأمان.

```algorithm
1 | git checkout main | Git CLI | الانتقال إلى الفرع الهدف
2 | git merge feature | Git CLI | محاولة الدمج
3 | حل التعارض يدوياً (إن وجد) | Maintainer | اختيار نسخة أو دمج النسختين
4 | git add + git commit | Git CLI | حفظ نتيجة الدمج
```

#### نقاط التنفيذ:
- الدمج لا يكتمل حتى تُحل كل التعارضات.

---
### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| ربط مستودع محلي بخادم بعيد | `git remote add origin <url>` ثم `git push -u origin main` | عند بدء مشروع جديد محلياً وربطه بالخادم لأول مرة |
| دورة حفظ يومية | `git add .` ثم `git commit -m "msg"` ثم `git push` | كل مرة تُنجز فيها جزءاً من العمل تريد حفظه |
| تنزيل سريع بدون تاريخ | `git clone <url> --depth 1` | عند الحاجة لآخر نسخة فقط دون تاريخ كامل ثقيل |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| تعديلات غير محفوظة وتريد تبديل الفرع | `git stash` ثم `git checkout` ثم `git stash pop` لاحقاً | لأن `Git` يرفض `checkout` مع تعديلات `uncommitted` |
| الفرع المحلي متأخر عن البعيد قبل `push` | `git pull` ثم حل أي تعارض ثم `git push` | لأن `push` يفشل إن لم يكن الأساس (`base`) متطابقاً |
| اكتشاف أن آخر commit خاطئ على فرع مشترك | `git revert <commit>` | يحافظ على التاريخ ولا يعطّل نسخ الفريق الآخرين |
| اكتشاف أن آخر commit خاطئ على فرع محلي شخصي غير مرفوع | `git reset --hard <commit>` | لا مشكلة في حذف التاريخ محلياً لأنه غير مشترك بعد |

---
## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25% (4)، سيناريو كود 35% (6)، تطبيق 30% (4)، تتبع خوارزمية 10% (2).

### السؤال 1 (متوسط)
ما الفرق الجوهري بين `CVCS` و `DVCS`؟
أ) `CVCS` أسرع من `DVCS` دائماً
ب) في `DVCS` كل عميل ينسخ المستودع كاملاً بتاريخه، بينما `CVCS` يعتمد على خادم مركزي وحيد
ج) `DVCS` لا يدعم الفروع (`branches`)
د) `CVCS` لا يحتاج اتصالاً بالإنترنت أبداً
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هو التعريف الدقيق الوارد بالمحاضرة. (أ) غير صحيح، لا توجد مقارنة سرعة مباشرة بالنص. (ج) خاطئ، `Git` (DVCS) يدعم آلاف الفروع المتوازية. (د) عكس الصحيح؛ `CVCS` يحتاج اتصالاً دائماً بالخادم المركزي.

### السؤال 2 (صعب)
لماذا تُعتبر `CVCS` أكثر عرضة لـ`Single Point of Failure` من `DVCS`؟
أ) لأن `CVCS` أبطأ في التنفيذ
ب) لأن كل بيانات المشروع وتاريخه موجودة فقط على الخادم المركزي، فتعطّله يوقف كل شيء
ج) لأن `CVCS` لا يدعم أكثر من مستخدم واحد
د) لأن `CVCS` لا يستخدم `checksums`
**الإجابة الصحيحة: ب**
**التعليل:** هذا بالضبط ما ورد بالمحاضرة عن انقطاع الخادم لساعة. (أ) غير مرتبط بالسبب. (ج) خاطئ فعلياً، `CVCS` صُمم أصلاً للتعاون بين مطورين متعددين. (د) غير مرتبط، مفهوم `checksum` خاص بـ`Git` تحديداً.

### السؤال 3 (متوسط)
ما الفرق بين `git pull` و `git fetch`؟
أ) لا فرق، الاسمان لنفس العملية
ب) `pull` يحدّث الملفات فوراً، بينما `fetch` يجلب التغييرات فقط دون تعديل ملفاتك
ج) `fetch` يحذف الفرع المحلي
د) `pull` لا يعمل إلا مع `Github` فقط
**الإجابة الصحيحة: ب**
**التعليل:** مطابق للنص الأصلي مباشرة. (أ) خاطئ، هناك فرق واضح. (ج) غير صحيح إطلاقاً. (د) `pull` أمر عام في `Git` وليس خاصاً بمنصة معينة.

### السؤال 4 (متوسط)
ما الفرق بين `git revert` و `git reset`؟
أ) كلاهما يحذف commits نهائياً
ب) `revert` يضيف commit جديداً يلغي أثر السابق، بينما `reset` يحذف commits نهائياً من التاريخ
ج) `reset` أكثر أماناً على الفروع المشتركة
د) `revert` يغيّر مؤشر `HEAD` فقط دون إضافة أي commit
**الإجابة الصحيحة: ب**
**التعليل:** كما ورد بالمحاضرة حرفياً. (أ) خاطئ، `revert` لا يحذف شيئاً. (ج) عكس الصحيح تماماً؛ `reset` خطير على الفروع المشتركة. (د) هذا وصف `reset` وليس `revert`.

### السؤال 5 (سهل)
أي أمر يستخدم لإنشاء مستودع Git جديد داخل مجلد؟
أ) `git clone`
ب) `git init`
ج) `git fetch`
د) `git branch`
**الإجابة الصحيحة: ب**
**التعليل:** `git init` هو الأمر المخصص لتحويل مجلد لمستودع جديد. `clone` (أ) ينسخ مستودعاً موجوداً مسبقاً على خادم. `fetch` (ج) يجلب تحديثات لمستودع موجود أصلاً. `branch` (د) ينشئ فرعاً داخل مستودع موجود بالفعل.

### السؤال 6 (متوسط) — سيناريو كود
مطوّر عدّل ملفاً، ونفّذ `git add file.txt`، لكنه لم ينفّذ `git commit` بعد. ما حالة الملف الآن؟
أ) `Modified`
ب) `Staged`
ج) `Committed`
د) `Untracked`
**الإجابة الصحيحة: ب**
**التعليل:** `git add` ينقل الملف من `Modified` إلى `Staged` تحديداً. (أ) كانت حالته قبل `add`. (ج) تتطلب `commit` أيضاً. (د) هذا مصطلح لملف لم يُتتبّع أصلاً، غير مذكور بهذا السياق.

### السؤال 7 (صعب) — سيناريو كود
مطوّرة تريد التبديل من فرعها الحالي `feature-x` إلى `main`، لكن لديها تعديلات غير محفوظة (`uncommitted`) على ملف. ماذا سيحدث عند تنفيذ `git checkout main` مباشرة؟
أ) سينجح `checkout` وتُفقد التعديلات تلقائياً
ب) سيرفض `Git` تنفيذ `checkout` حتى تُنفّذ `commit` أو `git stash` أولاً
ج) سيدمج `Git` تلقائياً بين الفرعين
د) سيُنشئ `Git` فرعاً جديداً تلقائياً لحفظ التعديلات
**الإجابة الصحيحة: ب**
**التعليل:** كما ورد بالمحاضرة صراحة: لا يمكن `checkout` من فرع فيه تعديلات غير محفوظة. (أ) خاطئ، `Git` لا يفقد بياناتك بصمت. (ج) و(د) غير صحيحين وغير مذكورين بالمحاضرة.

### السؤال 8 (صعب) — سيناريو كود
فريق يعمل على مستودع `Git`؛ محاولة `git push` فشلت برسالة أن الفرع البعيد متقدّم عن الفرع المحلي. ما الخطوة الصحيحة التالية؟
أ) استخدام `git push --force` فوراً
ب) تنفيذ `git pull` ثم حل أي تعارض ثم `git push` مرة أخرى
ج) حذف المستودع البعيد وإعادة إنشائه
د) استخدام `git reset --hard` على الفرع البعيد
**الإجابة الصحيحة: ب**
**التعليل:** هذا بالضبط ما نصّت عليه المحاضرة: يجب أن يكون الأساس متطابقاً، وإلا يجب `pull` ثم `merge` ثم `push`. (أ) خطير ويكتب فوق عمل الفريق. (ج) و(د) حلول متطرفة وخطيرة وغير مذكورة كحل صحيح.

### السؤال 9 (متوسط) — سيناريو كود
ما الذي يحدث بالضبط عند تنفيذ `git commit` بنجاح؟
أ) تُرسل الملفات للخادم البعيد
ب) تُحفظ التغييرات الموجودة في `Staging Area` بشكل دائم في قاعدة البيانات المحلية `.git`
ج) تُحذف كل الفروع الأخرى
د) يُنشأ ملف `.gitignore` تلقائياً
**الإجابة الصحيحة: ب**
**التعليل:** `commit` عملية محلية بحتة تحفظ في `.git directory`. (أ) هذا وصف `push` وليس `commit`. (ج) و(د) غير مرتبطين إطلاقاً بعملية `commit`.

### السؤال 10 (متوسط) — سيناريو كود
مطوّر ينفّذ `git branch new-feature` بينما فرعه الحالي فارغ تماماً (بلا أي commit). ماذا يحدث؟
أ) يُنشأ الفرع بنجاح فوراً
ب) يفشل الأمر لأنه لا يمكن إنشاء فرع جديد من فرع فارغ بلا commits
ج) يُنشأ الفرع لكنه يحذف الفرع الحالي
د) يطلب `Git` كلمة مرور
**الإجابة الصحيحة: ب**
**التعليل:** ورد بالمحاضرة صراحة: "We cannot create a new branch if the branch is empty". باقي الخيارات غير صحيحة وغير مذكورة.

### السؤال 11 (سهل) — سيناريو كود
أي أمر يضيف ملفاً معدّلاً إلى `Staging Area`؟
أ) `git commit`
ب) `git push`
ج) `git add`
د) `git fetch`
**الإجابة الصحيحة: ج**
**التعليل:** `git add` هو الأمر المخصص لهذه المهمة بالضبط حسب المحاضرة. باقي الأوامر لها وظائف مختلفة تماماً (حفظ دائم، رفع للخادم، جلب تحديثات).

### السؤال 12 (متوسط) — تطبيق
مصمم جرافيك يريد الاحتفاظ بكل نسخة من ملف تصميم عبر الزمن والقدرة على الرجوع لأي نسخة قديمة. ما الحل الأنسب حسب المحاضرة؟
أ) الاحتفاظ بنسخ يدوية بأسماء مختلفة على سطح المكتب
ب) استخدام نظام `Version Control System`
ج) طباعة كل نسخة على ورق
د) إرسال كل نسخة بالبريد الإلكتروني لنفسه
**الإجابة الصحيحة: ب**
**التعليل:** هذا بالضبط المثال الذي ذكرته المحاضرة صراحة عن المصمم الجرافيكي. باقي الخيارات حلول غير عملية وغير مذكورة.

### السؤال 13 (متوسط) — تطبيق
فريق عمل صغير جداً يمتلك خادماً مركزياً شديد الموثوقية ولا يحتاج عملاً بدون اتصال إنترنت. أي نوع VCS مناسب تاريخياً حسب سياق المحاضرة؟
أ) `Local VCS` فقط
ب) `CVCS`
ج) لا يحتاج أي VCS
د) `DVCS` حصراً بلا بديل
**الإجابة الصحيحة: ب**
**التعليل:** `CVCS` صُمم أصلاً لهذا الغرض: فريق يتصل بخادم مركزي موثوق. (أ) لا يدعم التعاون. (ج) خاطئ منطقياً. (د) `DVCS` ممكن أيضاً لكن السؤال يسأل عن الخيار الأنسب تاريخياً حسب سياق تطور VCS بالمحاضرة.

### السؤال 14 (صعب) — تطبيق
أي من الملفات التالية **يجب** أن يوضع داخل `.gitignore` حسب ما ورد بالمحاضرة؟
أ) ملف الكود المصدري الرئيسي للمشروع
ب) ملف يحتوي مفتاح تشفير سرّي (`encryption key`)
ج) ملف `README.md`
د) ملف `LICENSE`
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة ذكرت صراحة "Security information like keys and encryption files" كمثال لما يجب استبعاده. باقي الملفات (أ، ج، د) هي ملفات أساسية يجب تتبعها ورفعها بشكل طبيعي.

### السؤال 15 (متوسط) — تتبع خوارزمية
بالترتيب الصحيح لدورة حياة الملف في Git: `Modified → ? → Committed`. ما الحالة الناقصة؟
أ) `Deleted`
ب) `Staged`
ج) `Cloned`
د) `Pushed`
**الإجابة الصحيحة: ب**
**التعليل:** المراحل الثلاث حسب المحاضرة بالترتيب هي: `Modified → Staged → Committed`. باقي الخيارات ليست من ضمن المراحل الثلاث المذكورة.

### السؤال 16 (صعب) — تتبع خوارزمية
بعد تنفيذ الخطوات التالية بالترتيب: `git checkout main` ثم `git merge feature` ووجد Git تعارضاً في ملف واحد، ما الخطوة الصحيحة التالية قبل اعتبار الدمج مكتملاً؟
أ) تجاهل التعارض وتنفيذ `git push` مباشرة
ب) حل التعارض يدوياً في الملف، ثم `git add` و`git commit`
ج) حذف الفرع `feature` فوراً
د) تنفيذ `git reset --hard` لإلغاء كل شيء
**الإجابة الصحيحة: ب**
**التعليل:** كما ورد بالمحاضرة، حل التعارض عند الدمج هو مسؤولية بشرية (`maintainer`)، ولا يكتمل الدمج إلا بعد الحل اليدوي والحفظ. باقي الخيارات إما تتجاهل المشكلة أو تفقد العمل بلا داعٍ.

---
## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، فحص إرجاع، dead code، سوء فهم.

### سؤال تصحيح 1 (منطقي — logic)

**الكود (يحتوي خطأ):**
```bash
# Trying to save changes permanently to the local repository
git commit -m "fix login bug"
git add login.js
```

**اكتشف الخطأ:** الترتيب معكوس؛ نُفّذ `commit` قبل `add`، لذا لن يُحفظ التعديل الجديد على `login.js` ضمن هذا `commit` (لأنه لم يكن بعد في `Staging Area`).

**التصحيح:**
```bash
# Correct order: stage first, then commit
git add login.js
git commit -m "fix login bug"
```
**شرح الحل:**
1. `git add` يجب أن يسبق `git commit` دائماً لأن `commit` يحفظ فقط ما هو موجود بالفعل في `Staging Area`.
2. تنفيذ `commit` أولاً سيحفظ فقط آخر حالة `staged` سابقة (أو لا شيء إن لم توجد)، وليس تعديل `login.js` الجديد.
3. النتيجة الصحيحة تتطلب دائماً: تعديل → `add` → `commit`.

### سؤال تصحيح 2 (سوء فهم — misconception)

**الكود (يحتوي خطأ):**
```bash
# Developer believes 'fetch' updates their working files immediately
git fetch origin
echo "My files are now updated automatically"
```

**اكتشف الخطأ:** سوء فهم لوظيفة `git fetch`؛ الأمر لا يعدّل ملفات مجلد العمل مباشرة، بل يجلب التغييرات فقط ويخزّنها بالخلفية.

**التصحيح:**
```bash
# fetch downloads changes without touching working files
git fetch origin
# To actually update working files, must merge or pull
git merge origin/main
```
**شرح الحل:**
1. `git fetch` = "جلب فقط"، لا يغيّر أي شيء في مجلد العمل الحالي.
2. لتحديث الملفات فعلياً يجب دمج التغييرات المجلوبة يدوياً عبر `git merge`، أو استخدام `git pull` من البداية.
3. هذا الفرق هو بالضبط ما ميّز `fetch` عن `pull` بالمحاضرة.

### سؤال تصحيح 3 (فحص القيمة المرجعة — return_check)

**الكود (يحتوي خطأ):**
```bash
# Script assumes push always succeeds without checking
git push origin main
deploy_to_production.sh
```

**اكتشف الخطأ:** لا يتحقق السكربت من نجاح `git push` قبل المتابعة للنشر؛ لو فشل `push` (مثلاً بسبب عدم تطابق الأساس كما ذكرت المحاضرة)، سيُنشر كود قديم أو غير مكتمل.

**التصحيح:**
```bash
# Check push result before deploying
git push origin main
if [ $? -eq 0 ]; then
  deploy_to_production.sh
else
  echo "Push failed, aborting deployment"
fi
```
**شرح الحل:**
1. يجب دائماً التحقق من نجاح عمليات `Git` الحساسة (مثل `push`) قبل تنفيذ خطوات تعتمد عليها.
2. `$?` يحمل رمز الخروج (`exit code`) لآخر أمر، `0` تعني النجاح.
3. تجاهل الفشل قد يؤدي لنشر نسخة غير مطابقة للمقصود، وهو خطر عملي حقيقي مذكور ضمناً بشرط "same base" بالمحاضرة.

### سؤال تصحيح 4 (كود ميت — dead_code)

**الكود (يحتوي خطأ):**
```bash
# Attempt to switch branch after stashing
git stash
git checkout feature-branch
git stash  # duplicate, unreachable intent - changes already stashed
```

**اكتشف الخطأ:** السطر الأخير `git stash` مكرر بلا فائدة (`dead code`)؛ التعديلات كانت قد حُفظت مؤقتاً بالفعل بالسطر الأول، ولا يوجد شيء لتخزينه مرة أخرى بعد التبديل للفرع الجديد.

**التصحيح:**
```bash
# Stash once, switch branch, then restore if needed
git stash
git checkout feature-branch
git stash pop   # restore the stashed changes when needed
```
**شرح الحل:**
1. `git stash` الثاني لا فائدة فعلية له لأنه لا توجد تعديلات جديدة غير محفوظة بعد التبديل مباشرة.
2. الخطوة المنطقية الصحيحة بعد `stash` و`checkout` هي استرجاع التعديلات عبر `git stash pop` عند الحاجة فعلياً.
3. الكود الميت (تكرار أمر بلا أثر فعلي) يجب إزالته أو استبداله بالخطوة المفيدة فعلاً.

### سؤال تصحيح 5 (سوء فهم — misconception)

**الكود (يحتوي خطأ):**
```bash
# Developer thinks reset is always safe like revert on a shared branch
git checkout main
git reset --hard HEAD~3   # removes last 3 commits shared with the team
git push origin main
```

**اكتشف الخطأ:** استخدام `git reset --hard` على فرع `main` **مشترك** مع الفريق يحذف آخر 3 `commits` نهائياً من تاريخ الفرع المحلي، وهذا خطير جداً كما حذّرت المحاضرة صراحة، خاصة أنه على فرع مشترك.

**التصحيح:**
```bash
# On a shared branch, use revert instead to preserve history
git checkout main
git revert HEAD~2..HEAD   # safely undo last 3 commits with new commits
git push origin main
```
**شرح الحل:**
1. `reset` يحذف `commits` نهائياً — مناسب فقط للفروع المحلية غير المشتركة.
2. `revert` يحافظ على التاريخ الكامل ويضيف `commits` جديدة تلغي التأثير، وهو الخيار الآمن على `main` المشترك.
3. استخدام `reset --hard` ثم `push` على فرع مشترك يسبب تعارضاً كارثياً لبقية الفريق الذين لا يزال لديهم تلك الـ `commits` محلياً.

---
## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): إكمال تسلسل أوامر النشر الأول — fill_gaps

**السيناريو / المطلوب:**
مطوّر أنشأ مجلد مشروع جديد ويريد ربطه بخادم `Github` ورفع أول `commit`.

**المطلوب:**
1. أكمل الفراغات التالية بالأوامر الصحيحة:
```bash
_______                                  # (1) إنشاء مستودع محلي
git remote add origin <url>
git add .
_______ -m "initial commit"              # (2) حفظ التغييرات محلياً
_______ -u origin main                   # (3) رفع وربط الفرع
```

**نموذج الحل:**
```bash
git init                                 # (1)
git remote add origin <url>
git add .
git commit -m "initial commit"           # (2)
git push -u origin main                  # (3)
```

### تمرين 2 (تمرين إضافي): تصحيح كود — code_fix

**السيناريو / المطلوب:**
الكود التالي يحاول التبديل لفرع جديد لكنه يفشل:
```bash
git branch new-branch
git checkout new-branch
```
عند التنفيذ ظهرت رسالة خطأ لأن الفرع الحالي لا يحتوي أي `commit` بعد.

**المطلوب:**
1. عدّل الكود ليعمل بنجاح بافتراض أن المجلد جديد تماماً.

**نموذج الحل:**
```bash
git init
git add .
git commit -m "initial commit"   # لا بد من commit واحد قبل إنشاء فرع
git branch new-branch
git checkout new-branch
```

### تمرين 3 (تمرين إضافي): سيناريو — scenario

**السيناريو / المطلوب:**
مطوّرة تعمل على `feature-login`، أنجزت جزءاً من العمل لكنها غير جاهزة للحفظ، ومديرها طلب منها فحص خطأ عاجل على فرع `main`.

**المطلوب:**
1. ما تسلسل الأوامر الذي يجب أن تنفّذه للتبديل بأمان دون فقدان عملها، ثم العودة لاحقاً؟

**نموذج الحل:**
```bash
git stash                 # حفظ العمل غير المكتمل مؤقتاً
git checkout main         # الانتقال الآمن لفحص الخطأ
# ... فحص الخطأ ...
git checkout feature-login
git stash pop              # استرجاع العمل غير المكتمل
```

### تمرين 4 (تمرين إضافي): إكمال الفراغات — fill_gaps

**السيناريو / المطلوب:**
أكمل الجدول التالي بربط كل أمر بوظيفته الصحيحة.

**المطلوب:**
1. `git _______` : تحميل مستودع كامل من الخادم لأول مرة.
2. `git _______` : جلب التحديثات فقط دون تعديل الملفات الحالية.
3. `git _______` : حذف كل commits بعد نقطة معينة نهائياً.

**نموذج الحل:**
1. `git clone`
2. `git fetch`
3. `git reset`

### تمرين 5 (تمرين إضافي): سيناريو — scenario

**السيناريو / المطلوب:**
فريق يستخدم `Git-Flow`، وأحد المطوّرين انتهى من ميزة جديدة على فرع `develop` وتم اختبارها بنجاح.

**المطلوب:**
1. صف تسلسل انتقال الميزة من `develop` وصولاً للنشر النهائي حسب النموذج المذكور بالمحاضرة (`master, staging, develop`).

**نموذج الحل:**
الميزة تُدمج من `develop` إلى `staging` لإجراء اختبار الجودة (`QA`)، وبعد التأكد من سلامتها، تُدمج من `staging` إلى `master` لتصبح جزءاً من النسخة المنشورة فعلياً (`deployed`).

---
## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: اختيار نوع VCS المناسب — case_study

**السيناريو:**
شركة ناشئة تطوّر تطبيقاً بفريق موزّع في 3 دول مختلفة، ويحتاج بعض الأعضاء العمل أحياناً بدون اتصال إنترنت مستقر أثناء السفر.

**المطلوب:**
1. أي نوع `VCS` (`Local` / `Centralized` / `Distributed`) هو الأنسب لهذه الشركة؟ برّر إجابتك بالاستناد لما ورد بالمحاضرة.

**نموذج الحل:**
`Distributed VCS` (مثل `Git`) هو الأنسب، لأن كل عضو يمتلك نسخة كاملة من المستودع بتاريخه الكامل محلياً، فيستطيع العمل والحفظ (`commit`) دون اتصال إنترنت، ثم مزامنة التغييرات لاحقاً عبر `push`/`pull` عند توفر الاتصال — على عكس `CVCS` الذي يتطلب اتصالاً دائماً بالخادم المركزي.

### تمرين 2: إكمال مخطط مراحل Git — diagram_completion

**السيناريو:**
يوجد مخطط لمراحل ملف داخل `Git` بثلاث خانات فارغة.

**المطلوب:**
1. أكمل التسلسل: `[Working Directory: ____]` → `[git add]` → `[____: Staging Area]` → `[git commit]` → `[____: .git directory]`

**نموذج الحل:**
`[Working Directory: Modified]` → `[git add]` → `[Staged: Staging Area]` → `[git commit]` → `[Committed: .git directory]`

### تمرين 3: جدول قرار — أي أمر أستخدم؟ — table_fill

**السيناريو:**
موقف مطوّر يواجه حالات مختلفة ويحتاج تحديد الأمر الصحيح لكل حالة.

**المطلوب:**
1. أكمل الجدول التالي:

| الحالة | الأمر المناسب |
| --- | --- |
| يريد إلغاء أثر commit على فرع مشترك مع الفريق | ؟ |
| يريد حذف آخر 2 commits نهائياً من فرع محلي شخصي | ؟ |
| يريد حفظ تعديلات غير مكتملة مؤقتاً قبل تبديل الفرع | ؟ |
| يريد معرفة آخر شخص عدّل سطراً سبب مشكلة | ؟ |

**نموذج الحل:**

| الحالة | الأمر المناسب |
| --- | --- |
| يريد إلغاء أثر commit على فرع مشترك مع الفريق | `git revert` |
| يريد حذف آخر 2 commits نهائياً من فرع محلي شخصي | `git reset` |
| يريد حفظ تعديلات غير مكتملة مؤقتاً قبل تبديل الفرع | `git stash` |
| يريد معرفة آخر شخص عدّل سطراً سبب مشكلة | `git blame` |

### تمرين 4: تحليل مخاطر — written_analysis

**السيناريو:**
فريق مشروع قرر الاعتماد الكلي على أداة تحكم بالإصدارات تجارية مغلقة المصدر مقدَّمة من شركة خارجية واحدة، مشابهة لموقف `BitKeeper` الذي واجهه مجتمع `Linux`.

**المطلوب:**
1. حلّل المخاطر (`Risk`) المحتملة لهذا القرار من منظور إدارة المشاريع، بالاستناد لما حدث فعلياً في تاريخ `Git` بالمحاضرة.

**نموذج الحل:**
المخاطرة الرئيسية هي `Vendor Lock-in` (الارتهان لمزوّد واحد): إن غيّرت الشركة المزوّدة شروط الترخيص أو ألغت الإتاحة المجانية فجأة (كما حدث فعلياً مع `BitKeeper` عام 2005)، يفقد الفريق وصوله لأداة أساسية بلا سابق إنذار، وقد يُضطر لبناء بديل من الصفر تحت ضغط الوقت — تماماً كما فعل `Linus Torvalds`. الدرس: يجب دائماً تقييم بديل مفتوح المصدر أو خطة طوارئ عند الاعتماد على أدوات مغلقة حسّاسة لاستمرارية المشروع.

---
## الجزء الرابع: تمارين تتبع التنفيذ

> ≥3 تمارين تتبع.

### تمرين تتبع 1: تتبّع حالة ملف عبر أوامر متتالية

**المدخل:**
```bash
touch app.js
git add app.js
git commit -m "add app.js"
echo "// new line" >> app.js
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | الأمر | حالة app.js |
| --- | --- | --- |
| 1 | `touch app.js` | ؟ |
| 2 | `git add app.js` | ؟ |
| 3 | `git commit -m "..."` | ؟ |
| 4 | `echo "..." >> app.js` | ؟ |

**نموذج الحل:**
| الخطوة | الأمر | حالة app.js |
| --- | --- | --- |
| 1 | `touch app.js` | ملف جديد غير متتبَّع (Untracked) |
| 2 | `git add app.js` | `Staged` |
| 3 | `git commit -m "..."` | `Committed` |
| 4 | `echo "..." >> app.js` | `Modified` مجدداً (تعديل جديد بعد آخر commit) |

**النتيجة:** الملف عاد لحالة `Modified` بعد تعديله، رغم أنه كان `Committed` قبل قليل — لأن `Git` يتتبّع كل تغيير جديد بشكل مستقل.

### تمرين تتبع 2: تتبّع تسلسل أوامر Branch/Checkout

**المدخل:**
```bash
git branch feature-A
git checkout feature-A
echo "code" > f.txt
git add f.txt
git commit -m "add f.txt"
git checkout main
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الفرع الحالي | حالة f.txt على main |
| --- | --- | --- | --- |
| 1 | `git branch feature-A` | ؟ | ؟ |
| 2 | `git checkout feature-A` | ؟ | ؟ |
| 5 | `git commit -m "..."` | ؟ | ؟ |
| 6 | `git checkout main` | ؟ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الفرع الحالي | حالة f.txt على main |
| --- | --- | --- | --- |
| 1 | `git branch feature-A` | `main` (لم يتبدّل بعد) | غير موجود |
| 2 | `git checkout feature-A` | `feature-A` | غير موجود |
| 5 | `git commit -m "..."` | `feature-A` | غير موجود (الملف فقط على feature-A) |
| 6 | `git checkout main` | `main` | لا يزال غير موجود على main (لم يُدمج بعد) |

**النتيجة:** `f.txt` موجود فقط على فرع `feature-A` ولن يظهر على `main` إلا بعد تنفيذ `git merge feature-A` وأنت على `main`.

### تمرين تتبع 3: تتبّع Stash

**المدخل:**
```bash
echo "draft" > note.txt
git add note.txt
git stash
git checkout other-branch
git checkout main
git stash pop
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | محتوى المكدّس (Stash Stack) | حالة note.txt في مجلد العمل |
| --- | --- | --- | --- |
| 3 | `git stash` | ؟ | ؟ |
| 4-5 | التبديل بين الفروع | ؟ | ؟ |
| 6 | `git stash pop` | ؟ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | محتوى المكدّس (Stash Stack) | حالة note.txt في مجلد العمل |
| --- | --- | --- | --- |
| 3 | `git stash` | يحتوي عنصراً واحداً (تعديلات note.txt) | غير موجود مؤقتاً (تمت إزالته من مجلد العمل) |
| 4-5 | التبديل بين الفروع | لا يزال يحتوي نفس العنصر | لا يزال غائباً؛ الفرع نظيف |
| 6 | `git stash pop` | فارغ (تم استخراج العنصر وإزالته) | عاد للظهور بمحتواه الأصلي "draft" |

**النتيجة:** `git stash pop` أعاد التعديلات المحفوظة مؤقتاً وأفرغ المكدّس من ذلك العنصر.

---
## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هو `Version Control System`؟
A: نظام يسجّل تغييرات الملفات عبر الزمن ويسمح بالرجوع لأي نسخة سابقة.

**Q2:** ما الفرق بين `git pull` و `git fetch`؟
A: `pull` يحدّث الملفات فوراً، `fetch` يجلب التغييرات فقط دون تعديل الملفات الحالية.

**Q3:** لماذا يعتبر `DVCS` أفضل من `CVCS` من حيث الموثوقية؟
A: لأن كل عميل يملك نسخة كاملة من المستودع، فلا توجد نقطة فشل واحدة (`Single Point of Failure`).

**Q4:** ماذا يخزّن `Git` في كل `commit`؟
A: لقطة (`snapshot`) كاملة لحالة كل الملفات في تلك اللحظة، لا مجرد فروقات.

**Q5:** ما هي آلية ضمان سلامة البيانات في Git؟
A: خوارزمية `SHA-1 hash` تحسب بصمة رقمية لكل بيانات، وأي تغيير يُغيّرها بالكامل.

**Q6:** ما هي المراحل الثلاث لأي ملف في Git؟
A: `Modified` ثم `Staged` ثم `Committed`.

**Q7:** ما وظيفة `git add`؟
A: نقل الملف المعدّل من حالة `Modified` إلى `Staged` (منطقة التجهيز).

**Q8:** ما الفرق بين `git revert` و `git reset`؟
A: `revert` يضيف commit جديداً يلغي أثر السابق ويحافظ على التاريخ؛ `reset` يحذف commits نهائياً.

**Q9:** لماذا لا يمكن `checkout` فرع آخر مع وجود تعديلات غير محفوظة؟
A: لأن Git يمنع فقدان التعديلات بالخطأ؛ يجب `commit` أو `git stash` أولاً.

**Q10:** ما وظيفة `.gitignore`؟
A: تحديد الملفات والمجلدات التي لا يجب تتبعها أو رفعها (مثل ملفات البناء والمفاتيح السرية).

**Q11:** هل Github هو نفسه Git؟
A: لا، Github منصة مبنية فوق Git وتضيف ميزات إضافية مثل Actions وإدارة القضايا.

**Q12:** من هو مبتكر Git ولماذا صنعه؟
A: Linus Torvalds، بعد إلغاء الإتاحة المجانية لأداة BitKeeper التي كان يعتمد عليها مشروع Linux.

**Q13:** ما الفروع الثلاثة الأساسية في نموذج Git-Flow؟
A: `master` (الإنتاج)، `staging` (اختبار الجودة)، `develop` (عمل المطورين اليومي).

**Q14:** لماذا يُعتبر `git reset` خطيراً؟
A: لأنه يحذف نهائياً كل الـ commits بعد نقطة معينة، وقد يفقد بيانات لا يمكن استرجاعها خاصة على فروع مشتركة.

---
## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> مرجع كامل يجمع كل أوامر Git التي وردت متفرقة عبر أقسام المحاضرة، في سكربت واحد يوضّح دورة العمل الكاملة من البداية للنهاية.

```bash
# ============================================================
# Git Full Reference Workflow — Project Management Lecture 2
# Covers: init, remote, add, commit, push, clone, pull, fetch,
#         branch, checkout, stash, merge, revert, reset
# ============================================================

# --- 1) Initialize a new local repository ---
git init                                   # create .git database inside current folder

# --- 2) Link local repository to a remote server ---
git remote add origin https://someserver/someuser/somerepo.git
                                            # register the remote named "origin"

# --- 3) Stage and commit the first snapshot ---
git add .                                  # move all modified files to Staging Area
git commit -m "initial commit"             # save a permanent snapshot locally

# --- 4) Push and link local branch to remote branch ---
git push -u origin main                    # upload commits, link main <-> origin/main

# --- 5) Cloning an existing repository (on another machine) ---
git clone https://someserver/someuser/somerepo.git
                                            # download full repo + history
git clone https://someserver/someuser/somerepo.git --depth 1
                                            # download only latest snapshot (shallow clone)

# --- 6) Keeping local repo in sync with remote ---
git fetch origin                           # download latest changes, do NOT touch working files
git pull origin main                       # fetch + merge in one step, updates files immediately

# --- 7) Daily development loop ---
echo "new feature code" >> feature.js
git add feature.js                         # stage the change
git commit -m "add new feature"            # commit the change locally
git push                                   # send local commits to remote (requires same base)

# --- 8) Branching workflow (Git-Flow style) ---
git branch feature-login                   # create a new branch (needs at least 1 prior commit)
git checkout feature-login                 # switch to the new branch (must have no uncommitted changes)
git branch -l                              # list local branches
git branch -a                              # list local + remote branches
git branch -m feature-login-v2             # rename current branch

# --- 9) Saving unfinished work temporarily ---
git stash                                  # push unstaged changes onto a stack, clean working dir
git checkout main                          # now safe to switch branches
git checkout feature-login-v2              # switch back later
git stash pop                              # restore the stashed changes

# --- 10) Merging a finished feature back ---
git checkout main                          # switch to target branch
git merge feature-login-v2                 # merge source branch into current (target) branch
# If a conflict appears in a file modified by two users:
#   1. open the conflicting file
#   2. manually choose or combine the two versions
git add .                                  # stage the resolved file
git commit -m "resolve merge conflict"     # finalize the merge

# --- 11) Undoing mistakes safely (shared branch) ---
git revert <commit-id>                     # safely undo a commit, keeps full history

# --- 12) Undoing mistakes on a local-only branch (dangerous) ---
git reset --hard <commit-id>               # deletes all commits after <commit-id> permanently

# --- 13) Excluding files from version control ---
# Create a .gitignore file listing what should never be committed:
# build/
# node_modules/
# .idea/
# secrets.key
```

#### شرح كل سطر (ملخّص المجموعات الرئيسية):
1. `git init` → تهيئة — إنشاء قاعدة بيانات `Git` محلية جديدة.
2. `git remote add origin <url>` → ربط — تسجيل عنوان الخادم البعيد باسم `origin`.
3. `git add` / `git commit` → حفظ محلي — الانتقال من `Modified` إلى `Staged` إلى `Committed`.
4. `git push -u origin main` → رفع أولي — ربط ورفع الفرع المحلي للمرة الأولى.
5. `git clone [--depth 1]` → تنزيل — نسخ مستودع كامل أو نسخة سطحية أخيرة فقط.
6. `git fetch` / `git pull` → مزامنة — جلب فقط أو جلب مع تحديث فوري للملفات.
7. الحلقة اليومية (`add → commit → push`) → دورة العمل المتكررة القياسية.
8. أوامر `branch`/`checkout` → إدارة الفروع والتبديل الآمن بينها.
9. `git stash` / `git stash pop` → حفظ مؤقت للتعديلات غير الجاهزة.
10. `git merge` → دمج فرع منتهٍ وحل أي تعارض يدوياً.
11. `git revert` → تراجع آمن يحافظ على التاريخ (فروع مشتركة).
12. `git reset --hard` → تراجع خطير يحذف التاريخ نهائياً (فروع محلية فقط).
13. `.gitignore` → استبعاد الملفات غير المرغوب تتبعها.

**الناتج المتوقع:**
> مستودع `Git` مهيّأ بالكامل، مرتبط بخادم بعيد، بتاريخ `commits` نظيف، وفروع منظّمة حسب نموذج `Git-Flow`، دون تسريب ملفات حساسة أو فقدان بيانات مهمة.

---
## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: عرّف `Version Control System` ووضّح فائدته الأساسية.
**نموذج الإجابة:**
1. التعريف: نظام يسجّل التغييرات على ملف أو مجموعة ملفات عبر الزمن.
2. المكونات/الشروط: يسمح بتتبع التغييرات، التراجع عنها، ومعرفة من أجراها ومتى.
3. مثال: مصمم جرافيك يحتفظ بكل نسخة من تصميمه عبر الزمن.
4. متى نستخدم: في أي مشروع تتغيّر ملفاته باستمرار ويحتاج تتبعاً أو عملاً جماعياً.

### سؤال 2: قارن بين `Local VCS` و `Centralized VCS` و `Distributed VCS`.
**نموذج الإجابة:**
1. التعريف: ثلاثة نماذج لتخزين وتوزيع تاريخ التغييرات.
2. المكونات/الشروط: `Local` = قاعدة بيانات محلية فقط؛ `Centralized` = خادم مركزي وحيد؛ `Distributed` = كل عميل ينسخ التاريخ كاملاً.
3. مثال: `RCS` (محلي)، `Subversion` (مركزي)، `Git` (موزّع).
4. متى نستخدم: `Distributed` هو المعيار الحديث بسبب حل مشكلة نقطة الفشل الواحدة.

### سؤال 3: اشرح لماذا يخزّن Git بيانات كـ `snapshots` بدلاً من `deltas`.
**نموذج الإجابة:**
1. التعريف: `Snapshot Storage` = تخزين لقطة كاملة للمشروع بكل `commit`.
2. المكونات/الشروط: إن لم يتغيّر ملف، يُخزَّن رابط لنسخته القديمة بدل تكراره.
3. مثال: 3 ملفات، تغيّر واحد فقط، فقط ذلك الملف يُعاد تخزينه.
4. متى نستخدم: يجعل استرجاع أي نسخة أسرع من إعادة حساب سلسلة فروقات متتالية كما في الأنظمة القديمة.

### سؤال 4: ما دور `SHA-1 hash` في Git؟
**نموذج الإجابة:**
1. التعريف: خوارزمية تحسب بصمة رقمية فريدة لكل بيانات قبل تخزينها.
2. المكونات/الشروط: أي تغيير ولو بسيط في المحتوى يُغيّر البصمة بالكامل.
3. مثال: تعديل حرف واحد بملف يُنتج `hash` مختلفاً تماماً.
4. متى نستخدم: لضمان سلامة البيانات (`data integrity`) واكتشاف أي تلف أو تلاعب تلقائياً.

### سؤال 5: صف تاريخ نشوء Git باختصار.
**نموذج الإجابة:**
1. التعريف: `Git` أداة تحكم بالإصدارات ابتكرها `Linus Torvalds`.
2. المكونات/الشروط: نشأ بعد إلغاء الإتاحة المجانية لأداة `BitKeeper` عام 2005.
3. مثال: استغرق تطويره الأولي 6 أشهر فقط قبل تسليمه لـ `Junio Hamano`.
4. متى نستخدم: يوضّح كيف يمكن لأزمة اعتماد على أداة خارجية أن تدفع لابتكار حل داخلي مستقل.

### سؤال 6: ما الفرق بين `git merge` و `git rebase`؟
**نموذج الإجابة:**
1. التعريف: كلاهما طريقتان لدمج تغييرات فرع في آخر.
2. المكونات/الشروط: `merge` يحافظ على تفرّع التاريخ الفعلي؛ `rebase` يعيد كتابة التاريخ ليبدو خطياً وكأن العمل بُني على الأساس الجديد من البداية.
3. مثال: دمج `feature` في `main` بـ`merge` يترك أثر تفرّع؛ بـ`rebase` يظهر التاريخ متسلسلاً.
4. متى نستخدم: `merge` للحفاظ على السياق التاريخي الحقيقي، `rebase` لتاريخ أنظف قبل الدمج النهائي.

### سؤال 7: لماذا يُعتبر `git reset` خطيراً بينما `git revert` آمن؟
**نموذج الإجابة:**
1. التعريف: كلاهما وسيلتان للتراجع عن `commits`.
2. المكونات/الشروط: `reset` يحذف `commits` نهائياً من التاريخ؛ `revert` يضيف `commit` جديداً يلغي الأثر فقط.
3. مثال: استخدام `reset --hard` على فرع مشترك يحذف عمل الفريق من التاريخ المحلي.
4. متى نستخدم: `revert` على الفروع المشتركة، `reset` فقط على فروع محلية شخصية لم تُرفع بعد.

### سؤال 8: ما وظيفة `.gitignore` ولماذا هي مهمة لإدارة المشروع؟
**نموذج الإجابة:**
1. التعريف: ملف يحدد الملفات/المجلدات المستثناة من التتبع بواسطة `Git`.
2. المكونات/الشروط: يشمل عادة ملفات البناء، الملفات المؤقتة، ملفات `IDE`، والمفاتيح الأمنية.
3. مثال: استثناء مجلد `node_modules` أو ملف مفتاح تشفير.
4. متى نستخدم: دائماً منذ بداية أي مشروع لتجنّب تضخم المستودع وتسريب بيانات حساسة.

### سؤال 9: ما العلاقة بين Git و Github؟
**نموذج الإجابة:**
1. التعريف: `Git` أداة تحكم بالإصدارات تعمل محلياً وعبر `CLI`؛ `Github` منصة مبنية حول `Git`.
2. المكونات/الشروط: `Github` تضيف ميزات إضافية مثل `Actions` وإدارة القضايا (`issue management`) فوق وظائف `Git` الأساسية.
3. مثال: يمكن استخدام `Git` بالكامل محلياً دون `Github` مطلقاً.
4. متى نستخدم: `Github` عند الحاجة لاستضافة مركزية وتعاون وأتمتة إضافية فوق `Git`.

---
## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين `Local VCS` و`CVCS` و`DVCS` بمثال لكل نوع.
- [ ] أفهم لماذا `CVCS` لديها `Single Point of Failure` و`DVCS` لا.
- [ ] أعرف تاريخ نشوء `Git` وسبب ابتكاره (أزمة `BitKeeper`).
- [ ] أفهم الفرق بين `Snapshot Storage` و`Delta-based Storage`.
- [ ] أعرف دور `SHA-1 hash` في ضمان سلامة بيانات `Git`.
- [ ] أستطيع سرد المراحل الثلاث لأي ملف: `Modified → Staged → Committed`.
- [ ] أفهم الفروع الثلاثة في `Git-Flow`: `master`, `staging`, `develop`.
- [ ] أستطيع التفريق بين `git pull` و`git fetch`.
- [ ] أستطيع التفريق بين `git revert` و`git reset` ومتى أستخدم كلاً منهما بأمان.
- [ ] أعرف شروط استخدام `git branch` و`git checkout` (عدم وجود تعديلات غير محفوظة).
- [ ] أفهم وظيفة `git stash` و`git merge` وكيفية حل التعارضات.
- [ ] أعرف الفرق بين `Git` و`Github`.
- [ ] أفهم الغرض من `.gitignore` وأمثلة على ما يوضع بداخله.

---
## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| المحاضرة 2 (Git) | إدارة المخاطر (Risk Management) | أزمة BitKeeper مثال حي على مخاطر الاعتماد على مزوّد واحد (Vendor Lock-in) |
| المحاضرة 2 (Git) | العمل الجماعي والفرق (Agile/Teams) | الفروع (branches) وGitFlow تنظّم تعاون الفريق بلا تعارض دائم |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| VCS | تطور من Local إلى Centralized إلى Distributed لحل مشاكل التعاون والفشل المركزي |
| Git Structure | يخزّن Snapshots كاملة، ويستخدم SHA-1 لضمان السلامة |
| مراحل الملف | Modified → Staged → Committed |
| الأمان في التراجع | revert آمن على المشترك، reset خطير ويستخدم محلياً فقط |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `init` | إنشاء مستودع جديد | بداية أي مشروع |
| `clone` | تحميل مستودع كامل | نسخ مشروع موجود |
| `add` | نقل لمرحلة Staging | قبل commit |
| `commit` | حفظ دائم محلي | حفظ التقدم |
| `push` | رفع للخادم البعيد | مشاركة العمل |
| `pull` | جلب + دمج فوري | مزامنة العمل |
| `fetch` | جلب فقط بالخلفية | مراجعة قبل الدمج |
| `branch` | إنشاء فرع جديد | عزل العمل |
| `checkout` | تبديل الفرع | التنقل بين المهام |
| `stash` | حفظ مؤقت غير محفوظ | تبديل سريع وآمن |
| `merge` | دمج فرعين | إنهاء ميزة |
| `revert` | تراجع آمن | فروع مشتركة |
| `reset` | تراجع خطير نهائي | فروع محلية فقط |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لا `checkout` أو `branch` جديد مع وجود تعديلات غير محفوظة — commit أو stash أولاً |
| 2 | لا `push` إلا إذا كان الأساس (base) مطابقاً للخادم البعيد — وإلا pull ثم merge أولاً |
| 3 | استخدم `revert` لا `reset` على الفروع المشتركة مع الفريق |
| 4 | ضع دائماً الملفات الحساسة وملفات البناء داخل `.gitignore` |
| 5 | Git يخزّن Snapshots لا Deltas — هذا سرّ سرعته وموثوقيته |

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, code, theory, checklist, cheat_sheet
mcq_count: 16
code_blocks: 24
-->

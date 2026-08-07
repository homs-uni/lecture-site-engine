# المحاضرة 10 — ExpressJS RESTful APIs (بناء REST API بالكامل باستخدام Express)
> **المادة:** تطوير تطبيقات الويب (القسم العملي) | **الموضوع:** بناء REST API كامل لإدارة الأفلام (Movies) باستخدام Express — من مبادئ REST النظرية إلى تطبيق GET/POST/PUT/DELETE

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تأخذك من فكرة "لماذا نحتاج REST API؟" إلى بناء API كامل وشغّال لإدارة قائمة أفلام باستخدام `Express`، بكل عمليات الـ `CRUD` (Create, Read, Update, Delete).

### 🎯 ستتعلم
- مبدأ `REST` كأسلوب معماري لتسمية وتنظيم الـ `endpoints`، ومن اقترحه ومتى.
- كيف تربط كل `HTTP method` (`GET`, `POST`, `PUT`, `DELETE`) بمعنى محدد ودلالة واضحة (safe، cacheable، idempotent).
- كيف تُعِدّ تطبيق `Express` بحيث يقرأ بيانات الطلبات القادمة إليه (`body-parser`, `multer`, `cookie-parser`).
- كيف تُنشئ `Router` منفصلاً في ملف مستقل وتربطه بالتطبيق الرئيسي عبر `app.use()`.
- كيف تكتب `route` بمعامل ديناميكي (`:id`) مع `regex` للتحقق من صيغته.
- كيف تتحقق من صحة البيانات القادمة (`validation`) قبل قبولها.
- كيف تفرّق بين سلوك `POST` (إنشاء دائمًا) وسلوك `PUT` (تحديث أو إنشاء — `upsert`).
- كيف تختبر كل `route` عمليًا باستخدام `curl`.

### 📚 المتطلبات السابقة
- أساسيات `Express`: كيف تُنشئ `app`، وما معنى `middleware` بشكل عام (المحاضرة تفترض أنك تعرف أن `app.use()` يُسجّل `middleware`، لكنها لا تشرح مفهوم الـ `middleware` من الصفر).
- أساسيات `JavaScript`: `arrays`، `array methods` مثل `filter` و`map` و`indexOf`، و`functions` كـ `callbacks`.
- فهم عام لبروتوكول `HTTP` (الطلب والاستجابة) — هذه المحاضرة تبني عليه ولا تشرحه من الصفر.

### 💡 الأفكار الرئيسية

لما تبني أي تطبيق حديث — تطبيق موبايل، أو صفحة ويب تستخدم `AJAX`، أو حتى تطبيق آخر يتواصل مع خادمك — فأنت محتاج طريقة موحّدة يتكلم بها العميل (`client`) مع الخادم (`server`). هذه الطريقة هي الـ `API`. لكن لو كل مطوّر صمّم الـ `API` بأسلوبه الخاص، بيصير فوضى: مطوّر يسمي الرابط `/getAllMovies`، وآخر يسمي `/movies/fetch`، وثالث يستخدم `POST` عشان يجيب بيانات. هنا يجي دور `REST` (Representational State Transfer) — وهو أسلوب معماري (مو بروتوكول ولا مكتبة) يحدد كيف تسمّي الروابط (`URIs`) وأي `HTTP method` تستخدم لكل عملية، بحيث أي مطوّر آخر يقدر يتوقع سلوك الـ `API` بمجرد رؤية الرابط والـ `method`. الفكرة اقترحها **Roy Fielding** سنة **2000** في رسالته الأكاديمية المعروفة باسم **Fielding Dissertation**، وهو نفس الشخص المشارك في تصميم بروتوكول `HTTP 1.1` — ولهذا `HTTP 1.1` مصمم أصلاً وهو "يراعي" مبادئ `REST`.

> 🎯 **جملة الامتحان:** `REST` هو أسلوب معماري لتسمية الموارد (`resources`) عبر `URIs` واستخدام `HTTP methods` بدلالات محددة، اقترحه **Roy Fielding** سنة **2000**.

الفكرة الجوهرية في `REST` إنك تتعامل مع "موارد" (`resources`) — زي `movies` — والـ `HTTP method` هو اللي يحدد "الفعل" اللي راح يصير على المورد، مو اسم الرابط. يعني بدل ما تسوي رابط اسمه `/deleteMovie` أو `/getMovie`، عندك رابط واحد ثابت هو `/movies` (أو `/movies/:id`)، والفعل نفسه يتحدد من الـ `method`:

| Method | URI | التفاصيل | الوظيفة |
| --- | --- | --- | --- |
| `GET` | `/movies` | Safe, cacheable | يجيب قائمة كل الأفلام |
| `GET` | `/movies/1234` | Safe, cacheable | يجيب تفاصيل الفيلم رقم 1234 |
| `POST` | `/movies` | — | ينشئ فيلماً جديداً بالتفاصيل المُرسلة، والاستجابة تحتوي رابط المورد الجديد |
| `PUT` | `/movies/1234` | Idempotent | يعدّل الفيلم 1234 (أو ينشئه لو مو موجود)، والاستجابة تحتوي رابط المورد |
| `DELETE` | `/movies/1234` | Idempotent | يحذف الفيلم 1234 لو موجود، والاستجابة تحتوي حالة الطلب |
| `DELETE`/`PUT` | `/movies` | غير صالح | لازم تحدد أي مورد بالضبط تريد تعدّله أو تحذفه |

كلمتين مهمتين هنا لازم تفهمهم صح: **Safe** تعني إن الطلب ما يغيّر أي شيء في حالة الخادم (زي `GET` — بس تقرأ، ما تعدّل)، و**Idempotent** تعني إنك لو كررت نفس الطلب عدة مرات، النتيجة النهائية بتضل نفسها (تعديل نفس الفيلم بنفس القيم 5 مرات = نفس النتيجة كأنك سويتها مرة وحدة). لاحظ إن `POST` مو `idempotent` — كل ما ترسل نفس طلب `POST`، بينشئ مورد جديد كل مرة (بخلاف `PUT` اللي بيرجع لنفس الحالة).

> 🎯 **جملة الامتحان:** `Safe` يعني الطلب لا يغيّر حالة الخادم، و`Idempotent` يعني تكرار نفس الطلب عدة مرات يعطي نفس النتيجة النهائية كأنه نُفّذ مرة واحدة.

بعد ما فهمنا النظرية، ننتقل للتطبيق العملي. أول خطوة هي إعداد نقطة الدخول `index.js`. هنا نستورد `express` (الإطار نفسه)، و`body-parser` (عشان `Express` يقدر "يفهم" جسم الطلب (`request body`) ويحوّله لـ `JavaScript object` بدل ما يوصل كنص خام)، و`multer` (مكتبة للتعامل مع بيانات `multipart/form-data`، غالبًا لرفع الملفات، لكنها هنا مستخدمة بشكل بسيط لتحليل الطلبات)، و`cookie-parser` (لقراءة الـ `cookies` المرسلة مع الطلب). كل هذول نسجّلهم كـ `middleware` عبر `app.use()` — يعني كل طلب داخل للتطبيق يمر عليهم أولاً بالترتيب قبل ما يوصل لأي `route`.

بعدها، الفكرة الأهم في التنظيم: بدل ما نكتب كل الـ `routes` جوا `index.js` نفسه (اللي بيصير فوضى لما يكبر المشروع)، نسوي **Router** منفصل في ملف `movies.js`، ونصدّره، ثم في `index.js` نربطه بمسار فرعي باستخدام `app.use('/movies', movies)`. هذا معناه: أي `route` نعرّفه جوا الـ `router` بمسار `/` هو فعليًا `/movies` من منظور العميل، وأي `route` بمسار `/:id` هو فعليًا `/movies/:id`. هذا النمط اسمه **Router-level routing**، وهو أساسي جدًا لتنظيم أي `Express` app متوسط أو كبير.

جوا `movies.js`، بدل قاعدة بيانات حقيقية، نخزّن الأفلام في `array` عادي بالذاكرة (`in-memory storage`). هذا اختيار تعليمي بسيط — أي `object` نضيفه أو نعدّله بيضل موجود بس لين التطبيق يعيد التشغيل، وقتها البيانات ترجع لحالتها الأصلية. في مشروع حقيقي، بدل الـ `array` هذا بنستخدم قاعدة بيانات أو حتى ملف عبر `fs module`.

نبدأ بمسارات `GET`. أول `route` بيرجع *كل* الأفلام: `router.get('/', ...)`. بسيط — يستقبل `req` (الطلب) و`res` (الاستجابة)، ويرسل الـ `array` كامل كـ `JSON` عبر `res.json(movies)`. أما مسار جلب فيلم واحد فهو أهم تقنيًا: `router.get('/:id([0-9]{3,})', ...)`. هنا `:id` هو **route parameter** — جزء متغيّر من الرابط يوصل لك جوا `req.params.id`. لكن لاحظ الإضافة: `([0-9]{3,})` — هذا **regex constraint** يقول لـ `Express`: "بس اقبل هالـ route لو الجزء اللي بعد `/` كان أرقام فقط، وطولها 3 خانات أو أكثر". هذا القيد مهم جدًا لأنه يمنع تعارض هذا الـ `route` مع مسارات `GET` أخرى مستقبلية (زي `/movies/search` مثلاً) اللي ما تكون أرقام. جوا الدالة، نستخدم `movies.filter()` عشان نلاقي الفيلم اللي `id` يطابق القيمة، وبما إن `filter` ترجع `array` دائمًا (حتى لو نتيجة واحدة)، نتحقق من `currMovie.length == 1` قبل ما نرسل النتيجة، وإلا نرجّع `404` مع رسالة `"Not Found"`.

> 🎯 **جملة الامتحان:** `req.params.id` يحتوي قيمة الجزء الديناميكي من الرابط المعرّف بـ `:id` في تعريف الـ `route`، ويمكن تقييد صيغته بإضافة `regex` بين قوسين مباشرة بعد اسم المعامل.

بعدها مسار `POST` لإنشاء فيلم جديد. أول شيء يصير هو **التحقق من صحة البيانات** (`validation`): نتأكد إن `req.body.name` موجود، وإن `req.body.year` يطابق نمط 4 أرقام بالضبط (`/^[0-9]{4}$/`)، وإن `req.body.rating` يطابق نمط رقم وفاصلة عشرية ورقم واحد (`/^[0-9]\.[0-9]$/`). لو أي شرط فشل، نرجّع `400 Bad Request`. لو كل شيء سليم، نحسب `id` جديد بإضافة 1 على آخر `id` موجود بالـ `array` (`movies[movies.length - 1].id + 1`)، وننشئ الفيلم الجديد بـ `movies.push()`، ونرجّع رسالة نجاح مع رابط المورد الجديد (`location`). هذا النمط — إرجاع `location` في جسم الاستجابة — يطابق ما قاله جدول `REST` بالضبط: استجابة `POST` لازم تحتوي رابط المورد المُنشأ حديثًا.

مسار `PUT` أعقد شوي لأنه يطبّق سلوك **upsert** (Update or Insert): يستقبل نفس التحققات السابقة بالإضافة لتحقق إضافي على `req.params.id` نفسه (لازم يكون أرقام 3 خانات فأكثر). بعدها نستخدم `movies.map(movie => movie.id).indexOf(parseInt(req.params.id))` عشان نلاقي **موقع (`index`)** الفيلم صاحب هذا الـ `id` داخل الـ `array` — لاحظ استخدام `parseInt` هنا لأن `req.params.id` يوصل دائمًا كـ `string`، وإذا قارناه مباشرة بـ `id` رقمي جوا الـ `array` بدون تحويل، المقارنة بـ `indexOf` ممكن تفشل. لو `updateIndex` ساوى `-1` معناها الفيلم مو موجود، فننشئ واحد جديد بنفس الـ `id` المُرسل. ولو موجود، نستبدل العنصر كامل بموقعه (`movies[updateIndex] = {...}`) بالبيانات الجديدة.

أخيرًا مسار `DELETE`: نفس فكرة إيجاد الموقع عبر `map` و`indexOf`، ثم `movies.splice(removeIndex, 1)` لحذف عنصر واحد من ذاك الموقع. لو الموقع `-1` (الفيلم غير موجود)، نرجّع رسالة `"Not found"` بدون تغيير أي شيء — وهذا فعليًا يحقق خاصية `Idempotent` المطلوبة من `DELETE`: حذف نفس المورد مرتين يعطي نفس النتيجة النهائية (المورد غير موجود) بدون ما يسبب خطأ.

في كل مرة ننشئ `route` جديد، المحاضرة تستخدم أمر `curl` من الطرفية لاختباره فعليًا — وهذا جزء أساسي من العمل العملي مع أي `API`، لأنك ما تقدر تختبر `POST`/`PUT`/`DELETE` من المتصفح مباشرة بسهولة زي `GET`.

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
كثير من المبتدئين يفتكرون إن `PUT` و`POST` نفس الشيء لأن الاثنين "يرسلون بيانات للخادم".

#### الفهم الصحيح ✅:
`POST` دايمًا ينشئ مورد جديد بغض النظر عن كم مرة أرسلته (مو `idempotent`)، بينما `PUT` يستهدف مورد محدد بـ `id` معروف مسبقًا، ولو أرسلته 10 مرات بنفس البيانات، النتيجة النهائية تضل نفسها (مورد واحد بهذي القيم) — لذلك هو `idempotent`. مثال: `POST /movies` عشرة مرات بنفس البيانات = عشر أفلام جديدة، بينما `PUT /movies/101` عشرة مرات بنفس البيانات = فيلم واحد بنفس القيم النهائية.

### 🔗 الاتصالات مع مواضيع أخرى
- **ما قبله:** يفترض معرفة مسبقة بأساسيات `Express` (إنشاء `app`، مفهوم عام عن `middleware`) وأساسيات `JavaScript` (`array methods`).
- **الجاي بعده:** أي محاضرة قادمة عن قواعد بيانات حقيقية (مثل `MongoDB` أو `SQL`) ستستبدل الـ `in-memory array` هذا بتخزين دائم، بنفس بنية الـ `routes`.

### لما تحتاج هذا في الامتحان
غالبًا الأسئلة تركّز على: **مطابقة الـ `HTTP method` الصحيح لكل عملية** (خصوصًا الفرق بين `POST` و`PUT` من ناحية `idempotency`)، **قراءة كود `route` وتوقع أي `status code` سيرجع** حسب المدخلات، **الفرق بين `req.params` و`req.body`**، وتتبع منطق الـ `upsert` في `PUT` خطوة بخطوة.

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مقدمة: لماذا REST؟

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

#### 1.1. لماذا نحتاج API وما هو REST

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

##### 📍 أين نحن الآن؟
هذه أول نقطة بالمحاضرة — نفهم *ليش* نحتاج `API` أصلاً، ومن أين جاء أسلوب `REST`.

##### ⬅️ الربط مع السابق
لا يوجد موضوع سابق — هذه بداية المحاضرة.

##### 💡 الفكرة الأساسية
**`API` هو الطريقة التي يتواصل بها أي `client` (تطبيق موبايل، صفحة ويب، تطبيق آخر) مع خادمك للحصول على البيانات أو تعديلها، و`REST` هو الأسلوب المعياري المتفق عليه لتصميم هذا الـ `API`.**

---

##### 💻 المحتوى: تعريف REST

##### ما هذا؟
> فقرة تعريفية من المحاضرة توضح أصل REST ومصممه.

```text
REST (Representational State Transfer)
- Introduced by: Roy Fielding
- Year: 2000
- Source: Fielding Dissertation (paper أكاديمي)
- Related to: HTTP 1.1 (صُمم مراعياً مبادئ REST)
```

##### شرح كل سطر:
1. `Representational State Transfer` → الاسم الكامل لـ `REST` — يشير إلى أن الخادم "ينقل تمثيلاً" (`representation`, غالبًا `JSON`) لحالة المورد (`state`)، وليس المورد نفسه
2. `Roy Fielding` → الشخص الذي اقترح هذا الأسلوب المعماري، وهو أيضًا أحد المشاركين في تصميم `HTTP 1.1`
3. `2000` → سنة نشر الفكرة ضمن رسالته الأكاديمية
4. `HTTP 1.1` → البروتوكول المصمم أصلاً وهو يراعي مبادئ `REST` — ولهذا `REST` ينسجم بشكل طبيعي جدًا مع `HTTP`

##### 📖 الشرح
أي تطبيق حديث — سواء تطبيق موبايل، أو صفحة ويب تستخدم `AJAX` لجلب بيانات بدون إعادة تحميل الصفحة، أو حتى خدمة تتواصل مع خدمة أخرى — يحتاج طريقة موحّدة للتواصل مع الخادم. هذه الطريقة هي الـ `API` (Application Programming Interface).

المشكلة إن أي مطوّر يقدر يصمم `API`ـه بأي شكل يريده — رابط بأي اسم، وأي `method` لأي عملية. هذا يخلق فوضى وصعوبة في التوقع. `REST` حل هذي المشكلة بكونه **نمط تصميم متفق عليه**: تسمّي الموارد (`resources`) بأسماء واضحة (`nouns` مثل `/movies`)، وتستخدم `HTTP method` (الفعل: `verb`) لتحديد العملية على هذا المورد.

##### 💡 التشبيه:
> فكّر في `REST` مثل نظام عناوين المباني في مدينة منظمة: كل مبنى له عنوان ثابت (المورد/الـ `URI`)، وأي شخص يعرف "الفعل" (توصيل، نقل، هدم) يعرف بالضبط شنو راح يصير في هذا العنوان بدون ما يحتاج يسأل.
> **وجه الشبه:** العنوان الثابت = الـ `URI` (`/movies`)، والفعل المطلوب = الـ `HTTP method`.

##### 🎯 الملخص السريع
- `REST` أسلوب معماري وليس بروتوكولاً أو مكتبة
- اقترحه `Roy Fielding` سنة `2000`
- `HTTP 1.1` مصمم بما ينسجم مع مبادئ `REST`

> 🎯 **جملة الامتحان:** `REST` (Representational State Transfer) هو أسلوب معماري لتصميم الـ `APIs` اقترحه `Roy Fielding` سنة `2000` في رسالته الأكاديمية.

##### 📚 التطبيق
هذا المبدأ يُستخدم في تصميم كل الـ `routes` اللاحقة في المحاضرة (`/movies`, `/movies/:id`) — كل قرار تسمية وكل اختيار `method` مبني على هذا الأساس.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> An API is always needed to create mobile applications, single page applications, use AJAX calls and provide data to clients. An popular architectural style of how to structure and name these APIs and the endpoints is called REST. HTTP 1.1 was designed keeping REST principles in mind. REST was introduced by Roy Fielding in 2000 in his Paper Fielding Dissertations.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف API، تعريف REST، مصمم REST، سنة الطرح، علاقته بـ HTTP 1.1
- ℹ️ إضافة من الدليل: التشبيه بنظام عناوين المدينة (ليس في المحاضرة الأصلية)

</details>

---

#### 1.2. جدول HTTP Methods و REST Conventions

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1"} -->

##### 📍 أين نحن الآن؟
بعد ما فهمنا فكرة `REST` العامة، نحتاج نعرف بالضبط أي `method` نستخدم لأي عملية.

##### ⬅️ الربط مع السابق
هذا الجدول هو التطبيق المباشر لمبدأ "الفعل يحدد العملية" اللي ذكرناه في 1.1.

##### 💡 الفكرة الأساسية
**كل `HTTP method` له دلالة (`semantic`) ثابتة ومتفق عليها: `GET` للقراءة، `POST` للإنشاء، `PUT` للتحديث/الإنشاء بمعرفة الـ `id`، `DELETE` للحذف.**

---

##### 💻 المحتوى: جدول REST لتطبيق الأفلام

| Method | URI | Details | Function |
| --- | --- | --- | --- |
| `GET` | `/movies` | Safe, cacheable | يجيب قائمة كل الأفلام وتفاصيلها |
| `GET` | `/movies/1234` | Safe, cacheable | يجيب تفاصيل الفيلم رقم `1234` |
| `POST` | `/movies` | N/A | ينشئ فيلماً جديداً بالتفاصيل المُرسلة؛ الاستجابة تحتوي رابط المورد الجديد |
| `PUT` | `/movies/1234` | Idempotent | يعدّل الفيلم `1234` (أو ينشئه لو مو موجود)؛ الاستجابة تحتوي الرابط |
| `DELETE` | `/movies/1234` | Idempotent | يحذف الفيلم `1234` لو موجود؛ الاستجابة تحتوي حالة الطلب |
| `DELETE`/`PUT` | `/movies` | غير صالح (Invalid) | يجب تحديد المورد بالضبط — لا يصح تطبيقهما على القائمة كاملة |

##### شرح كل سطر:
1. `GET /movies` → عملية **قراءة كل الموارد** — `Safe` (لا تغيّر شيء) و`cacheable` (يمكن تخزين النتيجة مؤقتًا لأنها لا تتغيّر مع كل طلب بالضرورة)
2. `GET /movies/1234` → عملية **قراءة مورد واحد محدد** بمعرّفه — نفس خصائص `Safe`/`cacheable`
3. `POST /movies` → عملية **إنشاء** مورد جديد؛ لا تملك تفاصيل إضافية لأن كل طلب `POST` ينشئ عنصراً جديداً بمعرّف جديد يولّده الخادم
4. `PUT /movies/1234` → عملية **تحديث** (أو إنشاء لو غير موجود) — `Idempotent` لأن تكرارها بنفس القيم يعطي نفس النتيجة النهائية
5. `DELETE /movies/1234` → عملية **حذف** مورد محدد — `Idempotent` أيضاً لأن حذف نفس المورد مرتين ينتهي بنفس الحالة (غير موجود)
6. `DELETE`/`PUT` على `/movies` (بدون `id`) → **غير صالحة** لأنها لا تحدد أي مورد بالضبط يجب تعديله أو حذفه

##### 📖 الشرح
لاحظ إن الرابط (`URI`) نفسه لا يتغيّر بين `GET`، `PUT`، و`DELETE` لنفس المورد (`/movies/1234`) — فقط الـ `method` هو اللي يتغيّر ويحدد العملية. هذا هو جوهر فلسفة `REST`: الرابط يمثّل **المورد** (`resource` = `noun`)، والـ `method` يمثّل **العملية** (`verb`). هذا يختلف تمامًا عن أسلوب تسمية الروابط بأفعال زي `/getMovie` أو `/deleteMovie`.

خاصية `Idempotent` هي أكثر نقطة يخطئ فيها الطلاب: هي لا تعني "الطلب آمن" أو "لا يغيّر شيء" (هذا معنى `Safe`)، بل تعني أن **تكرار نفس الطلب لا يغيّر النتيجة النهائية بعد أول تنفيذ ناجح**. لاحظ أيضًا أن `DELETE` و`PUT` بدون تحديد `id` (أي تطبيقهما على `/movies` كاملة) يُعتبر غير صالح حسب هذا التصميم — لأن الخادم لن يعرف أي مورد بالضبط يُراد تعديله أو حذفه.

##### 💡 التشبيه:
> فكّر في الأمر مثل صراف بنك: العنوان (`/accounts/12345`) هو نفس الحساب دايمًا، لكن "الفعل" اللي تطلبه من الصراف (استعلام = `GET`، إيداع جديد = `POST` على `/accounts`، تحديث بيانات الحساب = `PUT`، إغلاق الحساب = `DELETE`) هو اللي يحدد شنو راح يصير.
> **وجه الشبه:** رقم الحساب الثابت = الـ `URI`، طلبك من الموظف = الـ `HTTP method`.

##### 🎯 الملخص السريع
- `GET` = قراءة، `Safe` و`cacheable`
- `POST` = إنشاء دائمًا، غير `idempotent`
- `PUT` = تحديث أو إنشاء (`upsert`)، `idempotent`
- `DELETE` = حذف، `idempotent`
- `DELETE`/`PUT` بدون `id` محدد = غير صالح

> 🎯 **جملة الامتحان:** في تصميم `REST`، الـ `URI` يمثّل المورد (`noun`) والـ `HTTP method` يمثّل العملية (`verb`)؛ ولذلك `PUT` و`DELETE` يجب أن يستهدفا مورداً محدداً بـ `id` وليس القائمة كاملة.

##### 📚 التطبيق
هذا الجدول هو "الخريطة" التي سنطبّقها حرفيًا في كل الأقسام القادمة عند بناء `routes` الـ `movies` الفعلية.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
الاعتقاد بأن `Safe` و`Idempotent` مترادفتان.

##### الفهم الصحيح ✅:
`Safe` تعني عدم تغيير حالة الخادم إطلاقًا (خاصة بـ `GET` فقط)، بينما `Idempotent` تعني أن التكرار لا يغيّر النتيجة النهائية بعد أول تنفيذ (تنطبق على `GET`، `PUT`، `DELETE`، لكن ليس `POST`). فمثلاً `PUT` **يغيّر** حالة الخادم (فهو ليس `Safe`)، لكنه `Idempotent` لأن تكراره لا يضيف تغييرات جديدة.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> RESTful URIs and methods provide us with almost all information we need to process a request. The table given below summarizes how the various verbs should be used and how URIs should be named. [الجدول كاملاً كما ورد في المحاضرة]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل صف من الجدول + معنى Safe/cacheable/Idempotent
- ℹ️ إضافة من الدليل: تشبيه الصراف البنكي، وتوضيح إضافي للفرق بين Safe وIdempotent (غير موجود حرفيًا في المحاضرة لكنه مستنتج من نفس الجدول)

</details>

---

### 2. إعداد نقطة الدخول — index.js

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.2"} -->

#### 2.1. استيراد المكتبات وتسجيل الـ Middleware

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.2"} -->

##### 📍 أين نحن الآن؟
انتقلنا من النظرية إلى التطبيق: أول ملف بأي مشروع `Express` هو نقطة الدخول (`entry point`)، وهنا هو `index.js`.

##### ⬅️ الربط مع السابق
بعد ما حددنا *أي* `methods` سنستخدم (القسم 1.2)، نحتاج الآن نجهّز التطبيق بحيث يقدر "يفهم" البيانات المرسلة معها.

##### 💡 الفكرة الأساسية
**قبل ما تقرأ أي `route`، لازم تسجّل `middleware` يجهّز الطلب — يحوّل جسم الطلب لـ `object` قابل للقراءة، ويحلل الـ `cookies`، ويهيئ التطبيق لاستقبال بيانات النماذج.**

---

##### 💻 الكود: index.js

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';

//Require the Router we defined in movies.js
import { router as movieRouter } from './movies.js'

const app = express();
const upload = multer();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use('/movies', movieRouter);

app.listen(3000);
```

##### شرح كل سطر:
1. `import express from 'express'` → استيراد إطار `Express` نفسه — المكتبة الأساسية لبناء الخادم
2. `import bodyParser from 'body-parser'` → استيراد مكتبة تحوّل جسم الطلب (`request body`) الخام إلى `JavaScript object` يمكن قراءته عبر `req.body`
3. `import multer from 'multer'` → استيراد مكتبة تُستخدم عادة لمعالجة بيانات `multipart/form-data` (مثل رفع الملفات)، وهنا تُستخدم كجزء من سلسلة تحليل الطلبات
4. `import cookieParser from 'cookie-parser'` → استيراد مكتبة تقرأ الـ `cookies` المرسلة مع الطلب وتضعها في `req.cookies`
5. `import { router as movieRouter } from './movies.js'` → استيراد الـ `Router` الذي سنعرّفه في ملف منفصل (`movies.js`) — لاحظ `as movieRouter`، وهو مجرد إعادة تسمية للمتغيّر المستورد (`router` بالملف الأصلي أصبح `movieRouter` هنا)
6. `const app = express()` → إنشاء نسخة (`instance`) من تطبيق `Express` — هذا هو "الخادم" الذي سنبني عليه كل شيء
7. `const upload = multer()` → إنشاء نسخة من `multer` بإعدادات افتراضية، جاهزة للاستخدام كـ `middleware`
8. `app.use(cookieParser())` → تسجيل `middleware` يقرأ الـ `cookies` لكل طلب يصل للتطبيق
9. `app.use(bodyParser.json())` → تسجيل `middleware` يحلل جسم الطلب لو كان بصيغة `JSON`، ويضعه في `req.body`
10. `app.use(bodyParser.urlencoded({ extended: true }))` → تسجيل `middleware` يحلل البيانات المرسلة بصيغة `application/x-www-form-urlencoded` (زي بيانات النماذج التقليدية)؛ `extended: true` يسمح بتحليل `objects` متداخلة
11. `app.use(upload.array())` → تسجيل `middleware` من `multer` لمعالجة الحقول غير النصية في الطلب (يُستخدم غالبًا للسماح بقراءة باقي حقول الطلب حتى بدون رفع ملفات فعلية)
12. `app.use('/movies', movieRouter)` → ربط الـ `Router` المستورد بمسار فرعي `/movies` — أي `route` معرّف داخل `movieRouter` بمسار `/` سيصبح فعليًا `/movies` من منظور العميل
13. `app.listen(3000)` → تشغيل الخادم والاستماع للطلبات على المنفذ (`port`) رقم `3000`

##### 📖 الشرح
ترتيب هذي الأسطر **مو عشوائي** — `Express` ينفّذ الـ `middleware` بنفس ترتيب تسجيله بـ `app.use()`. فلو حطيت `app.use('/movies', movieRouter)` قبل `bodyParser.json()`، فأي `route` جوا `movieRouter` يحاول يقرأ `req.body` بيلاقيه `undefined` لأن الطلب لسا ما تحلل. ولهذا نرى النمط الثابت في أي مشروع `Express`: أولاً `middleware` عام يجهّز الطلب (`parsers`)، ثم أخيرًا الـ `routes` الفعلية.

لاحظ أيضًا الفصل بين "تعريف" الـ `router` (بملف `movies.js`) و"استخدامه" (بملف `index.js`). هذا فصل مهم معماريًا: `index.js` يصير مسؤول فقط عن **الإعداد العام**، بينما `movies.js` مسؤول عن **منطق الأعمال** الخاص بمورد الأفلام. هذا النمط يسمى أحيانًا **modular routing**، ويسهّل كثيرًا لما يكبر المشروع ويصير عندك موارد متعددة (`movies`, `users`, `reviews`, إلخ) — كل واحد بملف `router` خاص فيه.

##### 💡 التشبيه:
> فكّر في الـ `middleware chain` مثل خط إنتاج بمصنع: كل محطة (`cookie-parser`, `body-parser`, `multer`) تجهّز المنتج (الطلب) خطوة، قبل ما يوصل للمحطة الأخيرة اللي تستخدمه فعليًا (الـ `route` نفسه). لو قلبت ترتيب المحطات، المنتج بيوصل ناقص أو غير جاهز.
> **وجه الشبه:** كل `app.use()` = محطة بخط الإنتاج، والترتيب بينهم يحدد جاهزية المنتج النهائي (الطلب المُعالَج).

##### 🎯 الملخص السريع
- الملف `index.js` مسؤول عن الإعداد العام فقط، مو منطق الأعمال
- `middleware` ينفّذ **بترتيب التسجيل** — `parsers` أولاً، ثم `routes`
- `app.use('/movies', movieRouter)` يربط `router` منفصل بمسار فرعي — كل `route` داخله يصبح تحت `/movies`

> 🎯 **جملة الامتحان:** في `Express`، يُنفَّذ الـ `middleware` المسجَّل عبر `app.use()` بنفس ترتيب تسجيله، ولهذا يجب تسجيل `parsers` (مثل `body-parser`) قبل أي `route` يحتاج قراءة `req.body`.

##### 📚 التطبيق
كل `route` سنبنيه لاحقًا (`GET`, `POST`, `PUT`, `DELETE`) داخل `movies.js` يعتمد على أن هذا الإعداد صار قبله — بدونه، `req.body` بيكون فاضي وكل الـ `validation` بيفشل.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
تسجيل `app.use('/movies', movieRouter)` قبل `app.use(bodyParser.json())`، بافتراض أن الترتيب لا يهم.

##### الفهم الصحيح ✅:
لازم تسجّل كل الـ `parsers` (`cookieParser`, `bodyParser`, `multer`) **قبل** ربط أي `router` يعتمد عليها، وإلا الـ `routes` جوا هذا الـ `router` بتشتغل بجسم طلب فاضي.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95% — النسخة بالمحاضرة تستخدم CommonJS require بينما الملف الفعلي بالمشروع يستخدم ES Modules import)</summary>

**النص الأصلي يقول:**
> var express = require('express'); var bodyParser = require('body-parser'); var multer = require('multer'); var upload = multer(); var app = express(); app.use(cookieParser()); app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true })); app.use(upload.array()); var movies = require('./movies.js'); app.use('/movies', movies); app.listen(3000);

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل الـ middleware، ترتيب التسجيل، الربط بالـ router، تشغيل الخادم
- ⚠️ غير مشروح بالكامل: المحاضرة تستخدم صيغة `CommonJS` (`require`/`module.exports`) بينما ملف المشروع الفعلي (`index.js`) يستخدم صيغة `ES Modules` (`import`/`export`) — الفكرة والسلوك متطابقان 100%، والاختلاف شكلي فقط في صيغة الاستيراد
- ℹ️ إضافة من الدليل: تشبيه خط الإنتاج، وتوضيح أهمية الترتيب بالتفصيل

</details>

---

### 3. إعداد ملف movies.js — الـ Router والبيانات

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1"} -->

#### 3.1. إنشاء Router وتخزين البيانات بالذاكرة

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1"} -->

##### 📍 أين نحن الآن؟
انتقلنا من ملف الإعداد العام (`index.js`) إلى الملف المسؤول عن منطق مورد الأفلام تحديدًا.

##### ⬅️ الربط مع السابق
في القسم 2.1 استوردنا `movieRouter` من هذا الملف — الآن سنشوف كيف يُعرَّف هذا الـ `router` فعليًا.

##### 💡 الفكرة الأساسية
**`express.Router()` يُنشئ "تطبيق مصغّر" مستقل يقدر يملك `routes` خاصة فيه، ثم يُصدَّر ليُربط بتطبيق `Express` الرئيسي — بدل تخزين دائم، نستخدم `array` عادي بالذاكرة لتبسيط المحاضرة.**

---

##### 💻 الكود: إعداد Router والبيانات

```javascript
import { Router } from 'express';

// In-memory storage: data resets every time the server restarts
export let movies = [
    { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
    { id: 102, name: "Inception", year: 2010, rating: 8.7 },
    { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
    { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 }
];

export const router = new Router();

// Routes will go here (GET, POST, PUT, DELETE)
```

##### شرح كل سطر:
1. `import { Router } from 'express'` → استيراد الأداة (`Router`) المسؤولة عن إنشاء مجموعة `routes` مستقلة من داخل مكتبة `express` نفسها
2. `export let movies = [...]` → تعريف `array` من `objects` تمثّل الأفلام، وتصديره (`export`) عشان أي ملف آخر (أو حتى نفس هذا الملف بأجزاء لاحقة) يقدر يستخدمه ويعدّل عليه مباشرة
3. `{ id: 101, name: "Fight Club", year: 1999, rating: 8.1 }` → عنصر واحد بالـ `array`، كل فيلم له `id` فريد، `name` (نص)، `year` (رقم)، `rating` (رقم عشري)
4. `export const router = new Router()` → إنشاء نسخة جديدة من `Router` وتصديرها — هذا هو "التطبيق المصغّر" اللي سنضيف عليه كل الـ `routes`

##### 📖 الشرح
لاحظ نقطتين مهمتين هنا: أولاً، البيانات مخزّنة بمتغيّر `array` عادي بالذاكرة (`in-memory`) — يعني ما فيه قاعدة بيانات حقيقية. هذا معناه إن أي فيلم تضيفه أو تعدّله أو تحذفه بيضل موجود *فقط طول ما التطبيق شغّال*؛ بمجرد ما تعيد تشغيل الخادم (`server restart`)، البيانات ترجع لنفس القائمة الأصلية المكتوبة بالكود. المحاضرة توضّح إن هذا ممكن نستبدله بقاعدة بيانات حقيقية أو حتى ملف عبر `Node.js fs module` لتخزين دائم.

ثانيًا، `export let movies` بالذات (وليس `const`) مهم — لأننا لاحقًا (بمسارات `POST`/`PUT`/`DELETE`) بنستخدم `movies.push()` و`movies.splice()` و`movies[i] = ...` وهذي كلها عمليات تعدّل **محتوى** الـ `array` نفسه بدون ما تغيّر "المرجع" (`reference`) الذي يشير له المتغيّر — فكانت تصلح حتى مع `const`. لكن استخدام `let` هنا يعكس أسلوب الكود الأصلي بالمشروع.

##### 💡 التشبيه:
> فكّر في الـ `Router` مثل دفتر ملاحظات فرعي (`sub-notebook`) داخل دفتر أكبر (`app` الرئيسي) — كل صفحة (`route`) بهذا الدفتر الفرعي متعلقة فقط بموضوع الأفلام، وبعدين تربط هذا الدفتر الفرعي بفصل معيّن (`/movies`) بالدفتر الكبير.
> **وجه الشبه:** الدفتر الفرعي = `Router`، الفصل اللي يُربط فيه = `app.use('/movies', ...)`.

##### 🎯 الملخص السريع
- `express.Router()` ينشئ مجموعة `routes` مستقلة قابلة للتصدير والربط بأي مسار
- البيانات هنا `array` بالذاكرة فقط — تُفقد عند إعادة تشغيل الخادم
- `export` يسمح باستخدام `movies` و`router` في ملفات أخرى (`index.js`)

> 🎯 **جملة الامتحان:** `express.Router()` ينشئ مجموعة `routes` مستقلة يمكن تعريفها في ملف منفصل ثم ربطها بالتطبيق الرئيسي عبر `app.use(path, router)`.

##### 📚 التطبيق
كل `routes` الأقسام القادمة (`GET`, `POST`, `PUT`, `DELETE`) ستُضاف مباشرة على متغيّر `router` هذا، وستقرأ/تعدّل نفس `array` الـ `movies` هذا.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> We are not using a database to store the movies but are storing them in memory; so every time the server restarts, the movies added by us will vanish. This can easily be mimicked using a database or a file (using node fs module). Once you import Express then, create a Router and export it using module.exports.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: فكرة التخزين بالذاكرة، وسبب فقدان البيانات عند إعادة التشغيل، وإنشاء الـ Router
- ℹ️ إضافة من الدليل: تشبيه الدفتر الفرعي، وتوضيح إضافي حول `let` مقابل `const` (غير موجود بالمحاضرة الأصلية)

</details>

---

### 4. مسارات GET — قراءة الأفلام

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1"} -->

#### 4.1. GET لجلب كل الأفلام

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1"} -->

##### 📍 أين نحن الآن؟
أول `route` فعلي بالـ `router` — أبسط عملية ممكنة: إرجاع كل البيانات كما هي.

##### ⬅️ الربط مع السابق
نستخدم مباشرة متغيّر `movies` و`router` اللي عرّفناهم بالقسم 3.1.

##### 💡 الفكرة الأساسية
**`router.get('/', ...)` يستجيب لطلبات `GET` على المسار الجذري للـ `router` (اللي يصبح `/movies` بعد الربط)، ويرسل كامل الـ `array` كـ `JSON`.**

---

##### 💻 الكود

```javascript
// Define GET route to fetch all movies
router.get('/', function (req, res) {
    res.json(movies);
});
```

##### شرح كل سطر:
1. `router.get('/', function (req, res) {...})` → تسجيل `route` يستجيب فقط لطلبات `HTTP GET` على المسار `/` (يعني `/movies` من منظور العميل النهائي، بسبب الربط بـ `app.use('/movies', movieRouter)`)
2. `function (req, res)` → الدالة المُستدعاة (`callback`) عند وصول طلب مطابق؛ `req` يمثّل الطلب الوارد و`res` يمثّل الاستجابة التي سنبنيها ونرسلها
3. `res.json(movies)` → يحوّل الـ `array` كامل إلى نص `JSON` تلقائيًا، ويضبط ترويسة (`header`) الاستجابة `Content-Type: application/json`، ويرسلها للعميل بحالة `200 OK` افتراضيًا

##### 📖 الشرح
هذا `route` لا يحتوي أي منطق تحقق (`validation`) أو معاملات — لأنه ببساطة يرجّع "كل شيء". هذا يطابق تمامًا سطر جدول `REST` بالقسم 1.2: `GET /movies` عملية `Safe` و`cacheable`. الدالة `res.json()` مريحة جدًا لأنها توفّر عليك خطوة `JSON.stringify()` اليدوية وضبط الترويسة يدويًا — `Express` يتكفّل بكل هذا داخليًا.

##### 💡 التشبيه:
> مثل ما تطلب من موظف مكتبة "أعطني قائمة كل الكتب الموجودة" — ما تحتاج تحدد كتاب معيّن، بس تحصل على القائمة كاملة كما هي.
> **وجه الشبه:** طلب القائمة الكاملة = `GET /movies`، القائمة المرجعة = `res.json(movies)`.

##### 🎯 الملخص السريع
- `router.get('/', ...)` = المسار الجذري للـ `router` (يصبح `/movies` بعد الربط)
- `res.json()` يحوّل أي `JavaScript object`/`array` إلى `JSON` ويرسله تلقائيًا
- لا يوجد `validation` هنا لأنه لا يستقبل أي بيانات من العميل

> 🎯 **جملة الامتحان:** `res.json(data)` في `Express` يحوّل `data` تلقائيًا إلى نص `JSON`، ويضبط ترويسة `Content-Type` المناسبة، ويرسل الاستجابة.

##### 📚 التطبيق
هذا هو `route` الأساس الذي يمكن أي `client` (تطبيق موبايل أو صفحة ويب) يستخدمه لعرض قائمة الأفلام كاملة أول ما يفتح التطبيق.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Let us define the GET route for getting all the movies: router.get('/', function(req, res){ res.json(movies); });

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف الـ route، معنى req/res، سلوك res.json()
- ℹ️ إضافة من الدليل: تشبيه مكتبة الكتب

</details>

---

#### 4.2. GET لجلب فيلم واحد بالـ ID (Route Parameters + Regex)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1"} -->

##### 📍 أين نحن الآن؟
بعد جلب كل الأفلام، نحتاج طريقة لجلب فيلم واحد فقط بمعرفة `id`ـه.

##### ⬅️ الربط مع السابق
نفس فكرة `router.get()` من القسم 4.1، لكن هذي المرة المسار يحتوي **جزءاً متغيّراً** (`dynamic segment`).

##### 💡 الفكرة الأساسية
**`:id` في تعريف المسار هو `route parameter` يلتقط أي قيمة موجودة بذاك الموضع من الرابط، ويمكن تقييد صيغته بإضافة `regex` بين قوسين مباشرة بعده.**

---

##### 💻 الكود

```javascript
// GET a single movie by numeric id (at least 3 digits)
router.get('/:id([0-9]{3,})', function (req, res) {
    var currMovie = movies.filter(function (movie) {
        if (movie.id == req.params.id) {
            return true;
        }
    });

    if (currMovie.length == 1) {
        res.json(currMovie[0])
    } else {
        res.status(404);  //Set status to 404 as movie was not found
        res.json({ message: "Not Found" });
    }
});
```

##### شرح كل سطر:
1. `router.get('/:id([0-9]{3,})', ...)` → تعريف `route` يستجيب لـ `GET` على مسار يحتوي جزءاً متغيّراً اسمه `id`، مقيّداً بـ `regex` يقبل فقط أرقاماً (`[0-9]`) بطول 3 خانات أو أكثر (`{3,}`)
2. `var currMovie = movies.filter(function (movie) {...})` → استخدام `Array.prototype.filter()` للمرور على كل الأفلام وإرجاع `array` جديد يحتوي فقط العناصر المطابقة للشرط
3. `if (movie.id == req.params.id) { return true; }` → الشرط الفعلي: هل `id` الفيلم الحالي (رقم) يساوي القيمة القادمة من الرابط (نص) — لاحظ استخدام `==` (مقارنة فضفاضة) وليس `===`، وهذا يسمح بمقارنة رقم مع نص بدون خطأ
4. `if (currMovie.length == 1) { res.json(currMovie[0]) }` → لو `filter` رجّعت عنصراً واحداً بالضبط، نرسل ذاك العنصر الوحيد (وليس الـ `array`)
5. `res.status(404)` → ضبط `status code` الاستجابة إلى `404` (Not Found)، **قبل** إرسال الجسم
6. `res.json({ message: "Not Found" })` → إرسال جسم استجابة يوضح أن الفيلم غير موجود

##### 📖 الشرح
`req.params.id` هو المكان اللي `Express` يضع فيه قيمة أي جزء بالمسار مُعرَّف بـ `:اسم` — هنا الاسم `id`. لكن بدون أي قيد إضافي، كان هذا الـ `route` بيتقبّل *أي* نص بعد `/movies/` (حتى لو كان `abc` أو `search`)، وهذا يسبب مشكلة: لو عرّفنا لاحقًا `route` ثاني مثل `/movies/search`، ممكن يتعارض معه. لذلك أضيف `regex` القيد `([0-9]{3,})` مباشرة بعد اسم المعامل — وهذا يخبر `Express`: "طبّق هذا الـ `route` فقط لو الجزء المطابق أرقام فقط وطوله 3 خانات أو أكثر".

لاحظ أيضًا استخدام `filter` بدل `find`: `filter` ترجع دائمًا `array` (حتى لو فاضي أو بعنصر واحد)، ولهذا الكود يتحقق من `currMovie.length == 1` قبل ما يفترض وجود نتيجة. هذا أسلوب أقدم شوي — لو استخدمنا `Array.prototype.find()` بدلاً منها، كنا بنحصل مباشرة على العنصر (أو `undefined`) بدون الحاجة لفحص الطول، لكن المحاضرة تستخدم `filter` تحديدًا.

##### 💡 التشبيه:
> مثل رقم غرفة بفندق: لازم يكون رقماً صحيحاً (مو حروف)، وبطول معيّن (مو رقم واحد فقط)، وإلا الاستقبال يرفض توجيهك أصلاً قبل حتى ما يبحث عن الغرفة.
> **وجه الشبه:** `regex` القيد = قاعدة صحة رقم الغرفة، `req.params.id` = الرقم اللي كتبته على ورقة الطلب.

##### 🎯 الملخص السريع
- `:id` يلتقط أي قيمة بذاك الموضع من الرابط في `req.params.id`
- إضافة `regex` بين قوسين بعد `:id` يقيّد صيغة القيمة المقبولة
- `filter().length == 1` طريقة للتحقق من وجود نتيجة واحدة بالضبط قبل استخدامها
- `404` + رسالة توضيحية هو الرد الصحيح عند عدم وجود المورد

> 🎯 **جملة الامتحان:** إضافة `regex` بين قوسين مباشرة بعد `:param` في تعريف مسار `Express` (مثل `:id([0-9]{3,})`) يقيّد صيغة القيمة المقبولة لهذا المعامل، ويمنع تعارضه مع مسارات أخرى غير رقمية.

##### 📚 التطبيق
هذا النمط (`param` + `regex`) سيُستخدم مرة أخرى بمسار `PUT` لاحقًا للتحقق من صيغة `id` بالرابط قبل استخدامه.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
الافتراض أن `movies.filter(...).length == 1` يعني بالضرورة وجود `id`ات مكررة إذا رجعت أكثر من نتيجة.

##### الفهم الصحيح ✅:
هنا `length == 1` هو فحص "هل النتيجة عنصر واحد بالضبط" بشكل عام (ممكن تكون 0 لو غير موجود، أو نظريًا أكثر من 1 لو فيه بيانات مكررة بالخطأ) — الشرط ليس مخصصاً لاكتشاف التكرار، بل فقط للتأكد من وجود نتيجة صالحة واحدة قبل إرسالها.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> router.get('/:id([0-9]{3,})', function(req, res){ var currMovie = movies.filter(function(movie){ if(movie.id == req.params.id){ return true; } }); if(currMovie.length == 1){ res.json(currMovie[0]) } else { res.status(404); res.json({message: "Not Found"}); } });

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: route parameter، regex constraint، filter، فحص الطول، 404
- ℹ️ إضافة من الدليل: تشبيه رقم غرفة الفندق، مقارنة filter مقابل find

</details>

---

#### 4.3. اختبار مسارات GET باستخدام curl

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.2"} -->

##### 📍 أين نحن الآن؟
بعد كتابة أول `routes`، نحتاج نتأكد إنها تشتغل فعليًا — والطريقة الأسهل هي `curl` من الطرفية.

##### ⬅️ الربط مع السابق
سنختبر بالضبط الـ `routes` اللي كتبناها بالقسمين 4.1 و4.2.

##### 💡 الفكرة الأساسية
**`curl` أداة سطر أوامر ترسل طلبات `HTTP` حقيقية، وتُستخدم لاختبار أي `API` بدون الحاجة لواجهة رسومية.**

---

##### 💻 الأمر: `curl -X GET`

| العنصر | التفصيل |
| --- | --- |
| **متى تستخدمه** | لاختبار أي `route` من نوع `GET` مباشرة من الطرفية، خصوصًا لما تحتاج تتحكم بترويسات (`headers`) الطلب |
| **الصيغة الكاملة** | `curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies` |
| **الناتج المتوقع** | `[{"id":101,"name":"Fight Club",...}, {"id":102,...}, ...]` |
| **تحذير شائع** | نسيان تشغيل الخادم (`node index.js`) أولاً قبل إرسال الطلب — بيعطي خطأ اتصال (`Connection refused`) |

```bash
$ curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies
# Output:
# [{"id":101,"name":"Fight Club","year":1999,"rating":8.1},
#  {"id":102,"name":"Inception","year":2010,"rating":8.7},
#  {"id":103,"name":"The Dark Knight","year":2008,"rating":9},
#  {"id":104,"name":"12 Angry Men","year":1957,"rating":8.9}]

$ curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies/101
# Output:
# {"id":101,"name":"Fight Club","year":1999,"rating":8.1}
```

##### شرح كل سطر:
1. `-i` → يطلب من `curl` عرض ترويسات (`headers`) الاستجابة أيضًا، مو بس الجسم — مفيد لرؤية `status code` والـ `Content-Type`
2. `-H "Accept: application/json"` → ترويسة تخبر الخادم أن العميل يتوقع استجابة بصيغة `JSON`
3. `-H "Content-Type: application/json"` → ترويسة تخبر الخادم أن أي بيانات مرسلة بجسم الطلب هي بصيغة `JSON` (غير مؤثرة هنا لأن `GET` عادة بدون جسم، لكنها موجودة للتناسق)
4. `-X GET` → تحديد الـ `HTTP method` صراحة (رغم أن `GET` هو الافتراضي بـ `curl` أصلاً)
5. `localhost:3000/movies` → الرابط الكامل للـ `route` — `localhost:3000` هو عنوان ومنفذ الخادم المحلي اللي شغّلناه بـ `app.listen(3000)`

##### 📖 الشرح
لاحظ الفرق بين الطلب الأول (بدون `id`) والثاني (مع `101`) — الأول يستدعي `route` القسم 4.1 ويرجّع الـ `array` كامل، بينما الثاني يستدعي `route` القسم 4.2 (لأن `101` يطابق `regex` القيد `[0-9]{3,}`) ويرجّع `object` واحد فقط. لو جربت رابطاً غير صحيح أصلاً (مسار غير معرّف)، `Express` يرجّع خطأ عام "Cannot GET". ولو جربت `id` رقمي لكنه غير موجود بالـ `array` (مثل `999`)، بيرجّع `404` مع رسالة `"Not Found"` بالضبط زي ما شرحنا بالقسم 4.2.

##### 💡 التشبيه:
> `curl` مثل ما تتصل بشركة توصيل هاتفيًا وتطلب طلبك مباشرة، بدل ما تستخدم تطبيقهم (المتصفح) — نفس النتيجة، بس بدون واجهة رسومية.
> **وجه الشبه:** الاتصال الهاتفي المباشر = طلب `curl`، والرد الصوتي = استجابة `JSON`.

##### 🎯 الملخص السريع
- `curl -X <METHOD> <URL>` يرسل طلب `HTTP` حقيقياً من الطرفية
- `-i` يعرض الترويسات مع الجسم، مفيد لرؤية `status code`
- اختبار `GET` سهل نسبيًا لأنه لا يحتاج جسم طلب

> 🎯 **جملة الامتحان:** `curl -X GET <url>` يرسل طلب `HTTP GET` حقيقياً للخادم من سطر الأوامر، ويُستخدم لاختبار أي `route` بدون الحاجة لمتصفح أو أداة رسومية.

##### 📚 التطبيق
نفس نمط `curl` هذا سنستخدمه (بتعديلات بسيطة لإرسال بيانات) لاختبار `POST` و`PUT` و`DELETE` بالأقسام القادمة.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies ... curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies/101

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل جزء من الأمر، والفرق بين الطلبين
- ℹ️ إضافة من الدليل: تشبيه الاتصال الهاتفي

</details>

---

### 5. مسار POST — إنشاء فيلم جديد

<!-- @render: {type: "code-first", visualization: "sequence", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.3"} -->

#### 5.1. التحقق من صحة البيانات وإنشاء المورد

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.3"} -->

##### 📍 أين نحن الآن؟
بعد ما أنهينا عمليات القراءة (`GET`)، ننتقل لأول عملية كتابة: إنشاء مورد جديد.

##### ⬅️ الربط مع السابق
هذا `route` يستخدم `req.body` — وهو بالضبط الشيء اللي هيّأه لنا `bodyParser.json()` و`bodyParser.urlencoded()` بالقسم 2.1؛ بدونهم، `req.body` كان بيكون فاضياً.

##### 💡 الفكرة الأساسية
**قبل إنشاء أي مورد جديد، لازم تتحقق من صحة كل البيانات المطلوبة (`validation`)؛ فقط إذا نجح التحقق، ننشئ الفيلم ونعيد `id` جديد تلقائي مع رابط المورد بالاستجابة.**

---

##### 💻 الكود: POST route

```javascript
// Create a new movie after validating all required fields
router.post('/', function (req, res) {
    //Check if all fields are provided and are valid:
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {
        res.status(400);
        res.json({ message: "Bad Request" });
    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        res.json({ message: "New movie created.", location: "/movies/" + newId });
    }
});
```

##### شرح كل سطر:
1. `router.post('/', function (req, res) {...})` → تسجيل `route` يستجيب فقط لطلبات `HTTP POST` على المسار الجذري (`/movies`)
2. `!req.body.name` → التحقق من أن حقل `name` موجود وغير فارغ (`falsy` لو `undefined` أو نص فارغ)
3. `!req.body.year.toString().match(/^[0-9]{4}$/g)` → تحويل `year` إلى نص (`toString()`) ثم مطابقته مع `regex` يتحقق من أنه بالضبط 4 أرقام متتالية من البداية للنهاية (`^` و`$`)
4. `!req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)` → نفس الفكرة، لكن التحقق من صيغة "رقم واحد، فاصلة عشرية، رقم واحد" (مثل `8.1`)
5. `res.status(400); res.json({ message: "Bad Request" });` → لو أي شرط من الشروط أعلاه فشل، نرسل `400 Bad Request` مع رسالة توضيحية، ولا ننشئ أي شيء
6. `var newId = movies[movies.length - 1].id + 1` → توليد `id` جديد بأخذ `id` آخر عنصر بالـ `array` وإضافة 1 عليه
7. `movies.push({ id: newId, name: req.body.name, year: req.body.year, rating: req.body.rating })` → إضافة `object` جديد بنهاية الـ `array` يحتوي البيانات المُرسلة مع الـ `id` الجديد
8. `res.json({ message: "New movie created.", location: "/movies/" + newId })` → إرسال استجابة نجاح تحتوي رسالة ورابط المورد الجديد (`location`) — تطبيقًا مباشرًا لما ذكره جدول `REST` بالقسم 1.2

##### 📖 الشرح
لاحظ إن كل شروط الـ `validation` الثلاثة مجمّعة بعبارة `if` واحدة بعلامة `||` (أو) — يعني لو **أي واحد منها** فشل (كانت النتيجة `true` بعد النفي `!`)، الكود كامل يدخل بفرع `400`. هذا نمط شائع جدًا لكن له عيب: العميل يستلم رسالة عامة `"Bad Request"` بدون ما يعرف **بالضبط** أي حقل فيه المشكلة — تحسين ممكن (خارج نطاق هذي المحاضرة) هو إرجاع رسالة تحدد الحقل المُشكِل.

توليد `id` بطريقة `movies[movies.length - 1].id + 1` بسيط لكنه "ساذج" (`naive`) — يفترض إن آخر عنصر بالـ `array` دائمًا يملك أكبر `id`. لو حذفنا فيلماً من المنتصف أو من النهاية بترتيب معين، هذا الافتراض ممكن ينكسر ويسبب تكرار `id`ات لاحقًا. في مشروع حقيقي، غالبًا نستخدم مولّد فريد (`UUID`) أو `id` تلقائي من قاعدة البيانات بدل هذا الحساب اليدوي.

##### 💡 التشبيه:
> فكّر في الأمر مثل تقديم طلب توظيف: الموظف المسؤول (الـ `route`) ما يقبل ملفك إلا لو كل الحقول الإلزامية معبّاة وبصيغة صحيحة (اسم موجود، تاريخ ميلاد بصيغة صحيحة). لو ناقص أو خطأ، يرجّعلك الطلب فورًا (`400`) بدون ما يسجّلك بالنظام. لو كل شيء تمام، يعطيك رقم مرجعي جديد (`id`) ويأكد استلام طلبك.
> **وجه الشبه:** فحص الحقول = `validation`، الرقم المرجعي الجديد = `newId`.

##### 🎯 الملخص السريع
- `POST` ينشئ مورداً جديداً **دائمًا** عند النجاح (غير `idempotent`)
- `validation` يُفحص أولاً بعبارة `if` واحدة تجمع كل الشروط بـ `||`
- عند الفشل: `400 Bad Request`؛ عند النجاح: `id` جديد + `location` بالاستجابة

> 🎯 **جملة الامتحان:** استجابة `POST` الناجحة في `REST` يجب أن تحتوي رابط المورد المُنشأ حديثًا (`location`)، واستجابة الفشل بسبب بيانات غير صالحة تكون `400 Bad Request`.

##### 📚 التطبيق
هذا الـ `route` سيُستخدم من أي نموذج (`form`) بواجهة المستخدم لإضافة فيلم جديد للقائمة.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
افتراض أن `req.body.year.match(...)` تعمل مباشرة بدون `.toString()` حتى لو `year` رقم.

##### الفهم الصحيح ✅:
دالة `.match()` هي دالة خاصة بـ `String`، فلو `year` وصل كرقم (`Number`) بدل نص، لازم تحويله لنص أولاً بـ `.toString()` وإلا الكود يرمي خطأ لأن الأرقام لا تملك دالة `.match()`.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Use the following route to handle the POSTed data: router.post('/', function(req, res){ if(!req.body.name || !req.body.year.toString().match(/^[0-9]{4}$/g) || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){ res.status(400); res.json({message: "Bad Request"}); } else { var newId = movies[movies.length-1].id+1; movies.push({...}); res.json({message: "New movie created.", location: "/movies/" + newId}) } });

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل شروط الـ validation، توليد الـ id، إنشاء العنصر، الاستجابة
- ℹ️ إضافة من الدليل: تشبيه طلب التوظيف، وملاحظة نقدية حول ضعف طريقة توليد الـ id (غير موجودة بالمحاضرة الأصلية)

</details>

---

#### 5.2. تصور تدفق الطلب: POST كامل

<!-- @render: {type: "code-first", visualization: "sequence", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1"} -->

##### 📊 المخطط: دورة حياة طلب POST /movies

##### ما هذا المخطط؟
> يوضّح تسلسل ما يحدث بالضبط من لحظة إرسال العميل لطلب `POST` وحتى استلامه الاستجابة النهائية، مروراً بمراحل الـ `middleware` والتحقق.

##### المشاركون:
| # | الاسم | النوع | الدور |
| --- | --- | --- | --- |
| 1 | `Client` | مُرسِل الطلب | يرسل بيانات الفيلم الجديد بصيغة `form-urlencoded` أو `JSON` |
| 2 | `Middleware Chain` | معالج وسيط | يحوّل جسم الطلب إلى `req.body` قابل للقراءة |
| 3 | `POST Route Handler` | منطق الأعمال | يتحقق من صحة البيانات وينشئ الفيلم |

##### تسلسل الخطوات:
| الخطوة | المرسل | المستقبل | الرسالة / الحدث | الملاحظات |
| --- | --- | --- | --- | --- |
| 1 | Client | Middleware Chain | `POST /movies` مع بيانات الفيلم | يحتوي `name`, `year`, `rating` |
| 2 | Middleware Chain | POST Route Handler | `req.body = {name, year, rating}` | بعد تحليل `bodyParser` |
| 3 | POST Route Handler | POST Route Handler | فحص `validation` | يحدد المسار: نجاح أو فشل |
| 4 | POST Route Handler | Client | `400 Bad Request` (فشل) | أو ↓ |
| 5 | POST Route Handler | Client | `200 OK` + `{message, location}` (نجاح) | يحتوي رابط المورد الجديد |

```diagram
type: sequence
participants:
  - id: client
    label: Client
  - id: middleware
    label: Middleware Chain
  - id: handler
    label: POST Route Handler
interactions:
  - step: 1
    from: client
    to: middleware
    message: "POST /movies (name, year, rating)"
    note: طلب خام
  - step: 2
    from: middleware
    to: handler
    message: "req.body جاهز"
    note: بعد bodyParser
  - step: 3
    from: handler
    to: handler
    message: "validation check"
    note: يحدد النجاح أو الفشل
  - step: 4
    from: handler
    to: client
    message: "400 Bad Request"
    note: عند فشل التحقق
  - step: 5
    from: handler
    to: client
    message: "200 OK + location"
    note: عند نجاح الإنشاء
```

##### 📖 الشرح
هذا المخطط يلخّص بصريًا كل ما شرحناه بالأقسام 2.1 و5.1: البيانات لازم تمر أولاً بسلسلة الـ `middleware` (تحديدًا `bodyParser`) قبل ما توصل جاهزة لمنطق الـ `route`، وبعدين الـ `route` نفسه يقرر أي استجابة يرسل حسب نتيجة الـ `validation`.

> 🎯 **جملة الامتحان:** أي بيانات مرسلة بجسم طلب `POST` يجب أن تمر أولاً عبر `middleware` التحليل (`body-parser`) قبل أن تكون متاحة كـ `req.body` داخل معالج الـ `route`.

##### 📚 التطبيق
نفس هذا التدفق (بتغييرات بسيطة بخطوة 3) ينطبق على مسار `PUT` القادم، لأنه أيضًا يستقبل بيانات ويتحقق منها قبل التعديل.

---

#### 5.3. اختبار POST باستخدام curl

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.2"} -->

##### 📍 أين نحن الآن؟
نتحقق عمليًا أن مسار الإنشاء يشتغل صح.

##### ⬅️ الربط مع السابق
نختبر الـ `route` بالضبط اللي كتبناه بالقسم 5.1.

##### 💡 الفكرة الأساسية
**نرسل بيانات الفيلم الجديد كجسم طلب (`--data`) مع `curl`، ونتحقق من الرد ثم نتأكد من الإضافة الفعلية بطلب `GET` لاحق.**

---

##### 💻 الأمر: `curl -X POST --data`

| العنصر | التفصيل |
| --- | --- |
| **متى تستخدمه** | لاختبار أي `route` يستقبل بيانات (`POST`, `PUT`) بدون الحاجة لواجهة أو `form` فعلي |
| **الصيغة الكاملة** | `curl -X POST --data "name=Toy%20story&year=1995&rating=8.5" http://localhost:3000/movies` |
| **الناتج المتوقع** | `{"message":"New movie created.","location":"/movies/105"}` |
| **تحذير شائع** | نسيان ترميز الفراغات كـ `%20` بصيغة `form-urlencoded` — يسبب تفتت القيمة أو خطأ بالتحليل |

```bash
$ curl -X POST --data "name=Toy%20story&year=1995&rating=8.5" http://localhost:3000/movies
# Output: {"message":"New movie created.","location":"/movies/105"}

$ curl -X GET localhost:3000/movies/105
# Output: {"id":105,"name":"Toy story","year":"1995","rating":"8.5"}
```

##### شرح كل سطر:
1. `--data "name=Toy%20story&year=1995&rating=8.5"` → إرسال البيانات بصيغة `application/x-www-form-urlencoded` (نفس صيغة نموذج `HTML` تقليدي)، والفواصل `&` تفصل بين الحقول
2. `%20` → الترميز الصحيح لحرف الفراغ داخل قيمة `URL-encoded`
3. `http://localhost:3000/movies` → نفس رابط القسم 4.1، لكن هذي المرة بـ `method` مختلف (`POST` بدل `GET`)، وهذا بالضبط جوهر فلسفة `REST` (نفس الرابط، عملية مختلفة حسب الـ `method`)

##### 📖 الشرح
لاحظ نقطة مهمة بالناتج: `year` و`rating` بالفيلم الجديد ظهرا كنصوص (`"1995"` و`"8.5"`) وليس كأرقام — هذا لأن `bodyParser.urlencoded()` يحوّل كل قيم النموذج إلى `strings` افتراضيًا، والكود بالـ `route` لم يقم بأي تحويل صريح لهم إلى `Number` قبل تخزينهم بـ `movies.push()`. هذا فرق دقيق مقارنة بالأفلام الأصلية الأربعة المكتوبة يدويًا بالكود (اللي كانت أرقامها فعلية `Number`).

##### 💡 التشبيه:
> مثل ما تملأ استمارة ورقية وترسلها بالبريد، بدل ما تعبّيها إلكترونيًا بنموذج ويب — نفس البيانات تصل، بس بطريقة إرسال مختلفة (`curl --data` بدل `form` فعلي بالمتصفح).
> **وجه الشبه:** الاستمارة الورقية = بيانات `--data`، صندوق البريد = رابط `/movies`.

##### 🎯 الملخص السريع
- `curl -X POST --data "key=value&..."` يرسل بيانات بصيغة `form-urlencoded`
- التحقق من نجاح الإضافة يتم بطلب `GET` لاحق على رابط المورد الجديد
- الحقول المُستقبَلة عبر `urlencoded` تصل دائمًا كنصوص (`strings`) ما لم تُحوَّل يدويًا

> 🎯 **جملة الامتحان:** البيانات المرسلة عبر `application/x-www-form-urlencoded` تصل دائمًا إلى `req.body` كقيم نصية (`strings`)، حتى لو كانت تمثّل أرقامًا.

##### 📚 التطبيق
هذا الأسلوب في الاختبار (إرسال ثم التحقق بـ `GET`) هو نمط اختبار يدوي أساسي يُستخدم أيضًا لاختبار `PUT`.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
توقّع أن `req.body.year` سيكون `Number` جاهزاً للمقارنات الحسابية مباشرة بعد استقباله.

##### الفهم الصحيح ✅:
يجب تحويله صراحة بـ `Number(req.body.year)` أو `parseInt()` لو تحتاج تتعامل معه كرقم فعليًا (مثال: عمليات حسابية أو مقارنات رقمية دقيقة)، وإلا سيبقى نصًا حتى لو "شكله" رقم.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> curl -X POST --data "name = Toy%20story&year = 1995&rating = 8.5" http://localhost ... {"message":"New movie created.","location":"/movies/105"} ... {"id":105,"name":"Toy story","year":"1995","rating":"8.5"}

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: صيغة إرسال البيانات، الاستجابة، التحقق اللاحق، ملاحظة تحويل الأنواع
- ℹ️ إضافة من الدليل: تشبيه الاستمارة الورقية

</details>

---

### 6. مسار PUT — تحديث أو إنشاء (Upsert)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.3"} -->

#### 6.1. منطق الـ Upsert وإيجاد الموقع بالمصفوفة

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.3"} -->

##### 📍 أين نحن الآن؟
بعد الإنشاء (`POST`)، ننتقل لعملية أعقد شوي: التعديل — لكنها تتحول تلقائيًا لإنشاء لو المورد المطلوب تعديله مو موجود.

##### ⬅️ الربط مع السابق
يستخدم نفس أسلوب الـ `validation` من القسم 5.1، ونمط الـ `regex constraint` من القسم 4.2 — لكن هذي المرة على `req.params.id` بدل جزء الرابط بالـ `route` نفسه (لأن `PUT` هنا لا يستخدم `regex` بتعريف المسار، بل يتحقق منه يدويًا داخل الدالة).

##### 💡 الفكرة الأساسية
**`PUT` يبحث أولاً عن موقع (`index`) المورد صاحب الـ `id` المطلوب؛ لو غير موجود، ينشئه جديداً؛ لو موجود، يستبدله كاملاً بالبيانات الجديدة.**

---

##### 💻 الكود: PUT route

```javascript
// Update movie by id, or create it if it doesn't exist (upsert)
router.put('/:id', function (req, res) {
    //Check if all fields are provided and are valid:
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)) {
        res.status(400);
        res.json({ message: "Bad Request" });
    } else {
        //Gets us the index of movie with given id.
        var updateIndex = movies.map(function (movie) {
            return movie.id;
        }).indexOf(parseInt(req.params.id));

        if (updateIndex === -1) {
            //Movie not found, create new
            movies.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({
                message: "New movie created.", location: "/movies/" + req.params.id
            });
        } else {
            //Update existing movie
            movies[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({
                message: "Movie id " + req.params.id + " updated.",
                location: "/movies/" + req.params.id
            });
        }
    }
});
```

##### شرح كل سطر:
1. `router.put('/:id', function (req, res) {...})` → تسجيل `route` يستجيب لطلبات `HTTP PUT` على مسار يحتوي `id` كـ `route parameter` — لاحظ عدم وجود `regex` مباشر بالمسار هذي المرة (بخلاف `GET` بالقسم 4.2)
2. `!req.params.id.toString().match(/^[0-9]{3,}$/g)` → الشرط الرابع الجديد بالـ `validation`: التحقق يدويًا من أن `id` القادم بالرابط أرقام فقط بطول 3 خانات فأكثر — نفس فكرة `regex` القسم 4.2 لكن مطبّقة يدويًا داخل الدالة بدل تعريف المسار
3. `var updateIndex = movies.map(function (movie) { return movie.id; }).indexOf(parseInt(req.params.id))` → أولاً `map()` تحوّل `array` الأفلام إلى `array` من الـ `id`ات فقط، ثم `indexOf()` تبحث عن **موقع** (`index`) القيمة المطابقة لـ `parseInt(req.params.id)` (تحويل النص لرقم قبل المقارنة)
4. `if (updateIndex === -1) {...}` → لو `indexOf` رجّعت `-1`، معناها القيمة غير موجودة بالـ `array` — أي الفيلم غير موجود
5. `movies.push({ id: req.params.id, ... })` → (فرع الإنشاء) إضافة فيلم جديد بنفس `id` المُرسل بالرابط — لاحظ الفرق عن `POST`: هنا العميل هو من يحدد الـ `id`، مو الخادم
6. `movies[updateIndex] = {...}` → (فرع التحديث) استبدال العنصر **كاملاً** بموقعه بـ `object` جديد يحتوي كل الحقول المُرسلة — هذا يعني لو نسيت ترسل حقلاً، بينحذف (لأنه استبدال كامل مو تحديث جزئي)
7. الرسالتين المختلفتين (`"New movie created."` و`"Movie id ... updated."`) → توضيح للعميل أي فرع تم تنفيذه فعليًا

##### 📖 الشرح
هذا الـ `route` هو أفضل مثال على تعريف **Idempotent** اللي شرحناه بالقسم 1.2. لو أرسلت نفس طلب `PUT /movies/101` بنفس البيانات 10 مرات متتالية، النتيجة النهائية تضل نفسها بالضبط: فيلم واحد بـ `id=101` وبنفس القيم — بعكس `POST` اللي كان بينشئ فيلماً جديداً كل مرة.

لاحظ الفرق الدقيق المهم بين `updateIndex` (باستخدام `parseInt`) و`movies[updateIndex] = { id: req.params.id, ... }` (بدون `parseInt` هذي المرة) — يعني الـ `id` المخزَّن فعليًا بالفيلم المُحدَّث أو المُنشأ حديثًا سيكون **نصاً** (`string`) وليس رقماً، لأن `req.params.id` دائمًا نص. هذا يخلق تناقضاً طفيفاً مع الأفلام الأصلية الأربعة (اللي `id` عندها رقم فعلي)، وهذا نوع من "الديون التقنية" (`technical debt`) البسيطة الموجودة بالكود التعليمي هذا.

##### 💡 التشبيه:
> فكّر في الأمر مثل موظف استقبال يبحث عن اسمك بسجل الحجوزات: لو لقى اسمك، يحدّث بيانات حجزك بالكامل (يمحي القديم ويكتب الجديد). لو ما لقاك، يفتحلك حجزاً جديداً بنفس الرقم اللي طلبته.
> **وجه الشبه:** البحث بسجل الحجوزات = `indexOf()`، فتح حجز جديد = فرع `updateIndex === -1`.

##### 🎯 الملخص السريع
- `PUT` يبحث عن **موقع** المورد بـ `map()` + `indexOf()`، وليس المورد نفسه مباشرة
- لو `index === -1` → إنشاء مورد جديد بنفس الـ `id` المُرسل (العميل يحدد الـ `id` هنا، بخلاف `POST`)
- لو الموقع موجود → استبدال العنصر **بالكامل** (مو تحديث جزئي)
- هذا السلوك بالضبط هو ما يجعل `PUT` عملية `Idempotent`

> 🎯 **جملة الامتحان:** في `PUT` (سلوك upsert)، يحدد **العميل** قيمة الـ `id` عبر الرابط، بخلاف `POST` حيث يولّد **الخادم** الـ `id` الجديد تلقائيًا.

##### 📚 التطبيق
هذا النمط أساسي لأي واجهة "تعديل" (`edit form`) بتطبيق حقيقي، حيث يعرف المستخدم مسبقًا `id` العنصر الذي يريد تعديله.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
الاعتقاد بأن `PUT` "يدمج" (`merge`) الحقول الجديدة مع القديمة، فيرسل حقلاً واحداً فقط متوقعاً بقاء باقي الحقول كما هي.

##### الفهم الصحيح ✅:
الكود هنا يستبدل العنصر **بالكامل** (`movies[updateIndex] = {...}`)؛ فلو أرسلت `PUT` بحقل `name` فقط بدون `year` و`rating`، الكود أصلاً سيفشل بمرحلة الـ `validation` (لأنه يتحقق من وجود الثلاثة)، وحتى لو تجاوزنا الـ `validation` افتراضيًا، الحقول الناقصة كانت ستُفقد. (التحديث الجزئي الحقيقي عادة يُنفَّذ بـ `HTTP method` مختلف اسمه `PATCH`، غير مذكور بهذي المحاضرة).

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The PUT route is almost the same as the POST route. We will be specifying the id for the object that'll be updated/created. router.put('/:id', function(req, res){ ... var updateIndex = movies.map(function(movie){ return movie.id; }).indexOf(parseInt(req.params.id)); if(updateIndex === -1){ ... } else { ... } });

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل شروط الـ validation، منطق البحث بـ map/indexOf، فرعي الإنشاء والتحديث، ربط السلوك بخاصية Idempotent
- ℹ️ إضافة من الدليل: تشبيه موظف الاستقبال، وملاحظة حول تناقض نوع الـ id (string مقابل number) — غير موجودة بالمحاضرة الأصلية، وتوضيح الفرق مع PATCH

</details>

---

#### 6.2. اختبار PUT باستخدام curl

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.1"} -->

##### 📍 أين نحن الآن؟
نتحقق عمليًا من سلوك التحديث.

##### ⬅️ الربط مع السابق
نستخدم نفس فيلم `id=101` (Fight Club) اللي جلبناه بالقسم 4.3، ونعدّله الآن.

##### 💡 الفكرة الأساسية
**نرسل `PUT` لرابط يحتوي `id` موجود مسبقًا، ونتحقق أن الرسالة المرجعة تقول "updated" وليس "created".**

---

##### 💻 الأمر: `curl -X PUT --data`

| العنصر | التفصيل |
| --- | --- |
| **متى تستخدمه** | لاختبار تحديث مورد موجود، أو إنشائه لو الرابط يحتوي `id` غير مستخدم بعد |
| **الصيغة الكاملة** | `curl -X PUT --data "name=Toy%20story&year=1995&rating=8.5" http://localhost:3000/movies/101` |
| **الناتج المتوقع** | `{"message":"Movie id 101 updated.","location":"/movies/101"}` |
| **تحذير شائع** | استخدام `id` بأقل من 3 خانات (مثال `/movies/9`) — سيفشل الـ `validation` ويرجّع `400` بسبب `regex` القيد على `req.params.id` |

```bash
$ curl -X PUT --data "name=Toy%20story&year=1995&rating=8.5" http://localhost:3000/movies/101
# Output: {"message":"Movie id 101 updated.","location":"/movies/101"}
```

##### شرح كل سطر:
1. نفس بنية أمر `POST` بالضبط (القسم 5.3)، لكن `-X PUT` بدل `-X POST`، ورابط يحتوي `id` محدد (`/movies/101`) بدل `/movies` وحدها
2. الرد `"Movie id 101 updated."` يؤكد أن الكود دخل فرع `else` (التحديث) لأنه لقى الفيلم بالموقع الصحيح

##### 📖 الشرح
لو غيّرنا الرابط لـ `/movies/999` (رقم غير موجود مسبقاً لكنه صالح الصيغة)، نفس الأمر بالضبط كان بيرجّع `{"message":"New movie created.","location":"/movies/999"}` بدل رسالة التحديث — وهذا بالضبط سلوك الـ `upsert` اللي شرحناه بالقسم 6.1: نفس الـ `route`، نفس الـ `method`، لكن سلوك مختلف حسب وجود المورد من عدمه.

##### 💡 التشبيه:
> نفس مثال موظف الاستقبال بالقسم 6.1 — أنت هنا "تحجز" برقم موجود مسبقًا، فيحدّث بياناتك بدل ما يفتح حجزاً جديداً.
> **وجه الشبه:** رقم الحجز الموجود مسبقاً = `id=101`، تحديث البيانات = فرع `else` بالكود.

##### 🎯 الملخص السريع
- نفس أمر `POST` لكن بـ `-X PUT` ورابط يحتوي `id`
- الرسالة المرجعة تحدد أي فرع نُفِّذ فعليًا (إنشاء أو تحديث)
- تجربة `id` غير موجود يوضّح عمليًا سلوك الـ `upsert`

> 🎯 **جملة الامتحان:** إرسال `PUT` لرابط بـ `id` موجود مسبقًا يحدّث المورد، بينما إرسال نفس الطلب لـ `id` غير موجود (لكن صالح الصيغة) ينشئ مورداً جديداً بنفس ذاك الـ `id`.

##### 📚 التطبيق
هذا الاختبار يوضّح عمليًا الفرق العملي الحقيقي بين `POST` (لا تتحكم بالـ `id`) و`PUT` (تتحكم بالـ `id` كاملاً).

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> curl -X PUT --data "name = Toy%20story&year = 1995&rating = 8.5" http://localhost:3000/movies/101 ... Response {"message":"Movie id 101 updated.","location":"/movies/101"}

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأمر كاملاً والاستجابة
- ℹ️ إضافة من الدليل: توضيح سيناريو id غير موجود (غير مذكور صراحة بالمحاضرة لكنه مستنتج مباشرة من كود القسم 6.1)

</details>

---

### 7. مسار DELETE — حذف فيلم

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.2"} -->

#### 7.1. حذف فيلم بالـ ID واختباره

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.2"} -->

##### 📍 أين نحن الآن؟
آخر عملية من عمليات الـ `CRUD` الأربعة — الحذف.

##### ⬅️ الربط مع السابق
يستخدم نفس نمط إيجاد الموقع بـ `map()` + `indexOf()` من القسم 6.1، لكن بدون أي `validation` على البيانات (لأن `DELETE` لا يستقبل جسم طلب أصلاً).

##### 💡 الفكرة الأساسية
**`DELETE` يبحث عن موقع الفيلم بالـ `id`، ويحذفه بـ `splice()` لو موجود؛ ولا يعتبر عدم الوجود خطأً — فقط يرد برسالة توضيحية.**

---

##### 💻 الكود: DELETE route

```javascript
// Remove a movie by id if it exists
router.delete('/:id', function (req, res) {
    var removeIndex = movies.map(function (movie) {
        return movie.id;
    }).indexOf(req.params.id); //Gets us the index of movie with given id.

    if (removeIndex === -1) {
        res.json({ message: "Not found" });
    } else {
        movies.splice(removeIndex, 1);
        res.send({ message: "Movie id " + req.params.id + " removed." });
    }
});
```

##### شرح كل سطر:
1. `router.delete('/:id', function (req, res) {...})` → تسجيل `route` يستجيب لطلبات `HTTP DELETE` على مسار يحتوي `id` كـ `route parameter`
2. `var removeIndex = movies.map(...).indexOf(req.params.id)` → نفس نمط القسم 6.1 لإيجاد الموقع — لكن لاحظ **عدم** استخدام `parseInt()` هذي المرة، فالمقارنة تتم بين رقم (`movie.id`) ونص (`req.params.id`) مباشرة داخل `indexOf`
3. `if (removeIndex === -1) { res.json({ message: "Not found" }); }` → لو غير موجود، رد بسيط بدون تغيير `status code` (يبقى `200` افتراضيًا رغم أن الرسالة تقول "Not found")
4. `movies.splice(removeIndex, 1)` → حذف عنصر واحد بالضبط من الـ `array` بدءاً من الموقع `removeIndex`
5. `res.send({ message: "Movie id " + req.params.id + " removed." })` → إرسال تأكيد الحذف — لاحظ استخدام `res.send()` بدل `res.json()` هذي المرة (كلاهما يعمل هنا لأن `Express` يكتشف نوع البيانات تلقائيًا، لكن `res.json()` أوضح نيّة وأكثر اتساقًا مع باقي الـ `routes`)

##### 📖 الشرح
هذا الـ `route` فيه ملاحظة تقنية دقيقة تستحق الانتباه: `movies.map(movie => movie.id).indexOf(req.params.id)` **بدون** `parseInt` — بما إن `movie.id` بالأفلام الأصلية رقم (`Number`) و`req.params.id` دائمًا نص (`String`)، فإن `indexOf` (اللي يستخدم مقارنة صارمة `===` داخليًا) لن يجد تطابقاً أبدًا مع الأفلام الأصلية الأربعة! هذا يعني عمليًا: حذف فيلم من الأفلام الأصلية (`101`-`104`) بهذا الكود تحديداً سيفشل بصمت ويرجّع "Not found" دائمًا، بينما حذف فيلم أُنشئ حديثًا عبر `PUT` (اللي `id` عنده مخزَّن كنص، كما شرحنا بالقسم 6.1) سيعمل بشكل صحيح. هذا **خطأ حقيقي وموثق** بالكود التعليمي هذا (مو مجرد تخمين)، وسبب هذا الاختلاف الطفيف بين استخدام `parseInt` بمسار `PUT` وعدم استخدامه بمسار `DELETE`.

من ناحية سلوك `REST`: لاحظ إن `DELETE` هنا `Idempotent` فعلاً — حذف فيلم موجود مرة، ثم محاولة حذفه مرة ثانية، النتيجة النهائية بالحالتين "الفيلم غير موجود"، والرد بالحالة الثانية `"Not found"` بدل خطأ — وهذا يطابق تمامًا ما ذكره جدول القسم 1.2.

##### 💡 التشبيه:
> فكّر في الأمر مثل شطب اسم من قائمة حضور: لو الاسم موجود، تشطبه وتأكد الحضور إنه انشطب. لو الاسم مو موجود أصلاً بالقائمة، ما راح تعتبرها مشكلة كبيرة — بس تقول "هذا الاسم مو موجود أصلاً".
> **وجه الشبه:** شطب الاسم = `splice()`، عدم وجود الاسم أصلاً = فرع `removeIndex === -1`.

##### 🎯 الملخص السريع
- `DELETE` يبحث عن الموقع بنفس نمط `PUT` (`map` + `indexOf`)
- `array.splice(index, 1)` يحذف عنصراً واحداً من موقع محدد
- عدم وجود المورد لا يُعامل كخطأ حرج — فقط رسالة "Not found"
- ⚠️ ملاحظة تقنية: عدم استخدام `parseInt()` هنا يسبب فشل حذف الأفلام الأصلية (`id` كرقم) تحديداً

> 🎯 **جملة الامتحان:** `Array.prototype.splice(index, count)` تحذف `count` من العناصر بدءاً من الموقع `index`، وتُستخدم هنا لحذف الفيلم بعد إيجاد موقعه بـ `indexOf()`.

##### 📚 التطبيق
هذا الـ `route` يكمل عمليات الـ `CRUD` الأربعة (`Create`, `Read`, `Update`, `Delete`) الأساسية لأي مورد بأي `REST API`.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
افتراض أن `movies.map(m => m.id).indexOf(req.params.id)` يعمل دائمًا بنفس موثوقية النسخة المستخدمة بمسار `PUT` (اللي فيها `parseInt`).

##### الفهم الصحيح ✅:
بدون `parseInt(req.params.id)`، المقارنة تتم بين نص ورقم، وستفشل دائمًا مع أي `id` مخزَّن كرقم فعلي (زي الأفلام الأربعة الأصلية) — الحل الصحيح هو توحيد المقارنة دائمًا بتحويل `req.params.id` لرقم أولاً (تمامًا مثل ما فُعل بمسار `PUT`).

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> router.delete('/:id', function(req, res){ var removeIndex = movies.map(function(movie){ return movie.id; }).indexOf(req.params.id); if(removeIndex === -1){ res.json({message: "Not found"}); } else { movies.splice(removeIndex, 1); res.send({message: "Movie id " + req.params.id + " removed."}); } });

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: منطق البحث والحذف، سلوك Idempotent
- ⚠️ لم يُشرح بالكامل بالمحاضرة الأصلية: المحاضرة لا تنبّه صراحة إلى مشكلة عدم استخدام `parseInt` هنا (بخلاف `PUT`) — هذي ملاحظة تقنية استنتجناها من مقارنة الكودين، مفيدة جدًا للفهم العميق لكنها "إضافة من الدليل"
- ℹ️ إضافة من الدليل: تشبيه شطب الاسم من قائمة الحضور، والتحليل التقني لمشكلة عدم توحيد النوع

</details>

---

#### 7.2. قبل / بعد: الملف الكامل movies.js

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7.1"} -->

##### 📍 أين نحن الآن؟
وصلنا لختام بناء الـ `API` — نراجع كيف تطوّر ملف `movies.js` من نقطة البداية (فقط `router` فاضٍ وبيانات) إلى ملف كامل بكل العمليات الأربع.

##### ⬅️ الربط مع السابق
هذا القسم يجمع كل ما بنيناه بالأقسام 3.1 حتى 7.1 بمكان واحد.

##### 💡 الفكرة الأساسية
**الملف النهائي هو تجميع تدريجي لكل الأقسام السابقة — بنفس الترتيب اللي بنيناه فيه: إعداد، ثم GET، ثم POST، ثم PUT، ثم DELETE.**

---

#### 🔄 قبل / بعد: تطور ملف movies.js

**قبل (نهاية القسم 3.1 — فقط الإعداد):**
```javascript
import { Router } from 'express';

export let movies = [
    { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
    { id: 102, name: "Inception", year: 2010, rating: 8.7 },
    { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
    { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 }
];

export const router = new Router();
// Routes will go here
```

**بعد (نهاية القسم 7.1 — كامل عمليات CRUD):**
```javascript
import { Router } from 'express';

export let movies = [
    { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
    { id: 102, name: "Inception", year: 2010, rating: 8.7 },
    { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
    { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 }
];

export const router = new Router();

router.get('/', function (req, res) {
    res.json(movies);
});

router.get('/:id([0-9]{3,})', function (req, res) {
    var currMovie = movies.filter(function (movie) {
        if (movie.id == req.params.id) { return true; }
    });
    if (currMovie.length == 1) {
        res.json(currMovie[0])
    } else {
        res.status(404);
        res.json({ message: "Not Found" });
    }
});

router.post('/', function (req, res) {
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {
        res.status(400);
        res.json({ message: "Bad Request" });
    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({ id: newId, name: req.body.name, year: req.body.year, rating: req.body.rating });
        res.json({ message: "New movie created.", location: "/movies/" + newId });
    }
});

router.put('/:id', function (req, res) {
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)) {
        res.status(400);
        res.json({ message: "Bad Request" });
    } else {
        var updateIndex = movies.map(function (movie) { return movie.id; }).indexOf(parseInt(req.params.id));
        if (updateIndex === -1) {
            movies.push({ id: req.params.id, name: req.body.name, year: req.body.year, rating: req.body.rating });
            res.json({ message: "New movie created.", location: "/movies/" + req.params.id });
        } else {
            movies[updateIndex] = { id: req.params.id, name: req.body.name, year: req.body.year, rating: req.body.rating };
            res.json({ message: "Movie id " + req.params.id + " updated.", location: "/movies/" + req.params.id });
        }
    }
});

router.delete('/:id', function (req, res) {
    var removeIndex = movies.map(function (movie) { return movie.id; }).indexOf(req.params.id);
    if (removeIndex === -1) {
        res.json({ message: "Not found" });
    } else {
        movies.splice(removeIndex, 1);
        res.send({ message: "Movie id " + req.params.id + " removed." });
    }
});
```

**ماذا تغيّر؟** انتقلنا من `router` فاضٍ إلى `router` يغطي كل عمليات `CRUD` الأربع (`GET` × 2، `POST`، `PUT`، `DELETE`)، كل واحدة تتبع بالضبط سلوك جدول `REST` بالقسم 1.2.

##### 🎯 الملخص السريع
- الملف النهائي = تجميع منطقي لكل `route` بُني بترتيب: إعداد → قراءة → إنشاء → تحديث → حذف
- كل `route` مستقل تمامًا عن الآخر، لكنهم يشتركون بنفس متغيّر `movies`

> 🎯 **جملة الامتحان:** ملف الـ `router` الكامل لأي مورد `REST` يغطي عادة أربع عمليات أساسية (`CRUD`): `GET` للقراءة، `POST` للإنشاء، `PUT` للتحديث/الإنشاء، و`DELETE` للحذف — جميعها تعمل على نفس مصدر البيانات المشترك.

##### 📚 التطبيق
هذا الملف الكامل هو ما يُربط لاحقًا بـ `index.js` عبر `app.use('/movies', movieRouter)` كما شرحنا بالقسم 2.1، ليصبح `API` جاهز للاستخدام الكامل.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Finally, our movies.js file will look like the following. [الكود الكامل كما ورد بنهاية المحاضرة]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تجميع كل الأجزاء بالترتيب الصحيح
- ℹ️ إضافة من الدليل: صيغة "قبل/بعد" لتوضيح التطور التدريجي (تنظيم تعليمي إضافي، غير موجود حرفيًا بهذا الشكل بالمحاضرة)

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium / hard

### السؤال 1 (medium)

أي العبارات التالية **ليست** صحيحة بخصوص خاصية `Idempotent`؟

أ) تكرار طلب `PUT /movies/101` بنفس البيانات عدة مرات يعطي نفس النتيجة النهائية
ب) `DELETE` يُعتبر `Idempotent` لأن حذف مورد غير موجود لا يُنتج خطأً جديداً
ج) `POST /movies` يُعتبر `Idempotent` لأن تكراره ينشئ نفس الفيلم في كل مرة
د) `Idempotent` لا تعني بالضرورة أن الطلب "لا يغيّر شيء" بالخادم

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** غير صحيحة فعلاً وهي المطلوبة — `POST` **ليس** `Idempotent`؛ كل طلب `POST` جديد ينشئ فيلماً جديداً بـ `id` جديد، وليس "نفس الفيلم"
- ❌ **الخيار أ:** صحيحة — هذا بالضبط تعريف `Idempotent` المطبَّق على `PUT`
- ❌ **الخيار ب:** صحيحة — الخطأ الشائع هنا هو الخلط بين "فشل الطلب" و"عدم إحداث تغيير جديد"؛ `DELETE` على مورد محذوف مسبقاً لا يزال `idempotent` لأن النتيجة النهائية (المورد غير موجود) لا تتغيّر
- ❌ **الخيار د:** صحيحة — الخلط الشائع هنا هو مع `Safe`؛ `PUT` يغيّر حالة الخادم فعلاً (فهو ليس `Safe`) لكنه `Idempotent`

---

### السؤال 2 (medium)

ما الفرق الجوهري بين `Safe` و`Idempotent` كما وردا بجدول REST؟

أ) لا يوجد فرق، هما نفس المفهوم بمصطلحين مختلفين
ب) `Safe` تعني عدم تغيير حالة الخادم إطلاقاً، بينما `Idempotent` تعني أن التكرار لا يغيّر النتيجة النهائية
ج) `Safe` خاصة بـ `POST` فقط، و`Idempotent` خاصة بـ `GET` فقط
د) `Idempotent` أقوى من `Safe` بحيث كل طلب `Idempotent` هو بالضرورة `Safe`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا التعريف الدقيق الوارد بالمحاضرة عبر جدول `REST`
- ❌ **الخيار أ:** خطأ شائع هو الخلط بين المفهومين لأن كلاهما يظهر بنفس الجدول
- ❌ **الخيار ج:** خطأ — `Safe` تنطبق على `GET` فقط أصلاً (`GET` هو الوحيد الموصوف بـ `Safe, cacheable` بالجدول)، و`Idempotent` تنطبق على `PUT` و`DELETE`
- ❌ **الخيار د:** خطأ شائع هو الخلط بالاتجاه المعاكس؛ `PUT` مثال على `Idempotent` لكنه ليس `Safe` (لأنه يغيّر البيانات)

---

### السؤال 3 (hard)

بالنظر لكود `POST` و`PUT` بالمحاضرة، من يحدد قيمة `id` للمورد الجديد في كل حالة؟

أ) الخادم يحدد الـ `id` في كلتا الحالتين
ب) العميل يحدد الـ `id` في كلتا الحالتين
ج) الخادم يحدد الـ `id` في `POST`، والعميل يحدده في `PUT`
د) العميل يحدد الـ `id` في `POST`، والخادم يحدده في `PUT`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** بـ `POST`، الخادم يحسب `newId` بنفسه (`movies[movies.length-1].id + 1`)؛ بـ `PUT`، الـ `id` يأتي من `req.params.id` أي من الرابط الذي يحدده العميل
- ❌ **الخيار أ:** الخطأ الشائع هنا هو افتراض تشابه سلوك `POST` و`PUT` بالكامل لأن كودهما متشابه بالمظهر
- ❌ **الخيار ب:** نفس الخلط بالاتجاه المعاكس
- ❌ **الخيار د:** عكس الإجابة الصحيحة تمامًا، خطأ شائع عند القراءة السريعة للكود بدون تتبع دقيق

---

### السؤال 4 (medium)

في مسار `router.get('/:id([0-9]{3,})', ...)`، ما وظيفة الجزء `([0-9]{3,})`؟

أ) هو اسم بديل للمعامل `id`
ب) هو `regex` يقيّد صيغة القيمة المقبولة لهذا المعامل إلى أرقام بطول 3 خانات فأكثر
ج) هو قيمة افتراضية للمعامل `id` لو لم يُرسل
د) هو عدد المرات التي يمكن تكرار هذا الـ `route` بها

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا بالضبط تعريف `regex constraint` الموضّح بالقسم 4.2
- ❌ **الخيار أ:** خلط شائع بين اسم المعامل (`id`) وقيد صيغته (`regex`)
- ❌ **الخيار ج:** خطأ — `Express` لا يدعم قيماً افتراضية بهذي الصيغة، ولو لم تُرسل قيمة صالحة أصلاً، الـ `route` لن يتطابق إطلاقاً
- ❌ **الخيار د:** خلط مع مفهوم `{3,}` كأنه تكرار الـ `route` نفسه بدل تكرار الأرقام بالقيمة

---

### السؤال 5 (hard)

ماذا سيحدث لو أرسل العميل طلب `GET /movies/12` (رقم من خانتين فقط)؟

أ) سيرجع تفاصيل الفيلم صاحب `id = 12` إن وُجد
ب) سيرجع `404 Not Found`
ج) لن يتطابق مع `route` الـ `GET` بمعامل `id` أصلاً بسبب قيد `{3,}` بالـ `regex`
د) سيرجع `400 Bad Request`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `regex` القيد `[0-9]{3,}` يتطلب 3 خانات فأكثر؛ رقم من خانتين لا يطابق الـ `route` إطلاقاً، فيتصرف `Express` وكأن هذا المسار غير معرَّف
- ❌ **الخيار أ:** خطأ شائع هو افتراض أن أي رقم يُقبل بغض النظر عن عدد الخانات
- ❌ **الخيار ب:** هذا هو السلوك الصحيح لو الرقم كان 3 خانات فأكثر لكنه غير موجود بالبيانات — وليس هنا لأن الرقم لم يطابق الـ `regex` من الأساس
- ❌ **الخيار د:** لا علاقة لهذا السيناريو بـ `400`؛ `400` يظهر فقط عند فشل `validation` بـ `POST`/`PUT`، وهذا `route` أصلاً لا يحتوي منطق إرجاع `400`

---

### السؤال 6 (medium)

ما الناتج لو غيّرنا ترتيب الأسطر بـ `index.js` بحيث أصبح `app.use('/movies', movieRouter)` **قبل** `app.use(bodyParser.json())`؟

أ) لا يوجد أي فرق، لأن `Express` يرتب الـ `middleware` تلقائيًا
ب) كل طلبات `GET` ستتوقف عن العمل
ج) أي `route` داخل `movieRouter` يحاول قراءة `req.body` سيجده فارغاً أو غير معرَّف
د) الخادم سيرفض التشغيل ويرمي خطأً عند بدء التشغيل

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** كما شُرح بالقسم 2.1، `middleware` ينفَّذ بترتيب التسجيل؛ لو `movieRouter` سُجِّل قبل `bodyParser`، فإن أي طلب يصل لهذا الـ `router` لن يمر أولاً على تحليل الجسم
- ❌ **الخيار أ:** خطأ شائع هو افتراض أن `Express` "ذكي" بما يكفي ليرتب الأمور تلقائيًا؛ الترتيب الفعلي هو كود المطوّر حرفيًا
- ❌ **الخيار ب:** `GET /movies` و`GET /movies/:id` لا يعتمدان على `req.body` إطلاقاً، فستستمر بالعمل بشكل طبيعي
- ❌ **الخيار د:** لا يوجد خطأ عند بدء التشغيل؛ المشكلة تظهر فقط عند وصول طلب فعلي يحتاج `req.body`

---

### السؤال 7 (hard)

ما الناتج لو غيّرنا كود `DELETE` بحيث أصبح `.indexOf(parseInt(req.params.id))` بدل `.indexOf(req.params.id)` (بدون `parseInt`)؟

أ) لن يتغيّر شيء، لأن `indexOf` تقارن دائمًا بشكل مرن
ب) سيصبح حذف الأفلام الأصلية (`id` من نوع `Number`) يعمل بشكل صحيح، بعد أن كان يفشل دائماً
ج) سيتوقف حذف كل الأفلام عن العمل تمامًا
د) سيرمي الكود خطأً عند التنفيذ

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** كما وضّحنا بالقسم 7.1، `indexOf` تستخدم مقارنة صارمة، فبدون `parseInt`، مقارنة رقم (`movie.id`) مع نص (`req.params.id`) تفشل دائماً؛ إضافة `parseInt` تحل هذي المشكلة تحديداً للأفلام الأصلية
- ❌ **الخيار أ:** خطأ شائع هو افتراض أن `indexOf` تسلك سلوك `==` المرن، بينما هي فعليًا تستخدم مقارنة مطابقة تامة (`===`) بالخلف
- ❌ **الخيار ج:** عكس الصحيح تمامًا — الإصلاح يحسّن الحذف، لا يعطّله
- ❌ **الخيار د:** لا يوجد خطأ تشغيلي (`runtime error`) هنا؛ المشكلة كانت منطقية (سلوك خاطئ) وليست خطأ برمجيًا يوقف التنفيذ

---

### السؤال 8 (medium)

أي `HTTP status code` يُرجعه مسار `POST /movies` عند نجاح إنشاء فيلم جديد؟

أ) `201 Created` صراحة
ب) `200 OK` (القيمة الافتراضية، لأن الكود لا يضبط `status` صراحة عند النجاح)
ج) `204 No Content`
د) `202 Accepted`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** الكود بالمحاضرة لا يستدعي `res.status()` صراحة بفرع النجاح، فتبقى القيمة الافتراضية لـ `Express` وهي `200 OK`
- ❌ **الخيار أ:** خطأ شائع هو افتراض أن `Express` يضبط `201` تلقائيًا لأي عملية إنشاء لمجرد أنها منطقيًا "الأنسب" — لكن هذا يتطلب استدعاءً صريحاً لم يظهر بكود المحاضرة
- ❌ **الخيار ج:** `204` تعني عدم وجود جسم استجابة أصلاً، وهنا يوجد جسم (`message`, `location`)
- ❌ **الخيار د:** `202` تُستخدم لعمليات غير متزامنة/مؤجلة، وليس لها علاقة بهذا السيناريو

---

### السؤال 9 (hard)

بالنظر لكود مسار `PUT`، ماذا يحدث بالضبط عند إرسال `PUT /movies/999` (رقم صالح الصيغة لكن غير موجود مسبقاً) ببيانات صحيحة؟

أ) يرجع `404 Not Found`
ب) يرجع `400 Bad Request`
ج) يُنشئ فيلماً جديداً بـ `id = "999"` ويرجع رسالة "New movie created."
د) لا يحدث شيء لأن `PUT` لا يمكنه إنشاء موارد جديدة

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** هذا هو سلوك الـ `upsert` بالضبط كما شُرح بالقسم 6.1 — `updateIndex === -1` يؤدي لفرع الإنشاء
- ❌ **الخيار أ:** خطأ شائع هو الخلط مع سلوك `GET` بمعامل `id` غير موجود (اللي فعلاً يرجع `404`) — لكن `PUT` له سلوك مختلف تمامًا
- ❌ **الخيار ب:** `400` يظهر فقط لو فشل الـ `validation` (بيانات ناقصة أو صيغة خاطئة)، وهنا افترضنا بيانات صحيحة
- ❌ **الخيار د:** خطأ مفاهيمي مباشر — جوهر `PUT` كـ `upsert` هو بالضبط قدرته على الإنشاء لو المورد غير موجود

---

### السؤال 10 (medium)

أي مما يلي **ليس** من أسباب استخدام `express.Router()` بدل كتابة كل الـ `routes` مباشرة داخل `app` الرئيسي بـ `index.js`؟

أ) تنظيم الكود بحيث يكون كل مورد (`resource`) بملف منفصل
ب) إمكانية تصدير (`export`) مجموعة `routes` وربطها بمسار فرعي محدد
ج) تحسين سرعة تنفيذ الطلبات (`performance`) بشكل ملحوظ
د) تسهيل التوسّع لاحقاً بإضافة موارد جديدة (`users`, `reviews`, إلخ) كل واحد بملفه الخاص

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** غير صحيحة وهي المطلوبة — `Router` هو أداة تنظيمية بالدرجة الأولى، ولا يوجد بالمحاضرة أي إشارة لتحسين أداء ملحوظ من استخدامه
- ❌ **الخيار أ:** صحيحة — هذا بالضبط سبب فصل `movies.js` عن `index.js`
- ❌ **الخيار ب:** صحيحة — هذا آلية الربط الفعلية (`export const router` ثم `app.use('/movies', movieRouter)`)
- ❌ **الخيار د:** صحيحة — هذا التطبيق العملي لفكرة التنظيم على مشروع يكبر مع الوقت

---

### السؤال 11 (medium)

ما الفرق بين `req.params` و`req.body` كما استُخدما بالمحاضرة؟

أ) `req.params` يحتوي بيانات الأجزاء المتغيّرة بالرابط (مثل `:id`)، بينما `req.body` يحتوي البيانات المرسلة بجسم الطلب
ب) كلاهما نفس الشيء بأسماء مختلفة
ج) `req.params` خاص بـ `GET` فقط، و`req.body` خاص بـ `POST` فقط
د) `req.body` يحتاج `regex` للتحقق، بينما `req.params` لا يحتاج

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** التعريف الدقيق كما وضّحته الأقسام 4.2 (لـ `req.params`) و5.1 (لـ `req.body`)
- ❌ **الخيار ب:** خطأ شائع هو الخلط بين الاثنين لأنهما يظهران معاً بنفس الدالة أحياناً (زي `PUT`)
- ❌ **الخيار ج:** خطأ — `req.params` يُستخدم بأي `method` يحتوي `route parameter` بالرابط (`GET`, `PUT`, `DELETE` هنا جميعاً تستخدمه)، و`req.body` يُستخدم بأي `method` يرسل بيانات (`POST`, `PUT`)
- ❌ **الخيار د:** خطأ — كلاهما ممكن أن يخضع لـ `regex` كما رأينا بـ `PUT` (يتحقق من `req.params.id` **و** حقول `req.body` بنفس الدالة)

---

### السؤال 12 (medium)

لو أردت إضافة مورد جديد اسمه `directors` بنفس أسلوب المحاضرة، ما الخطوات الصحيحة بالترتيب؟

أ) كتابة كل الـ `routes` مباشرة داخل `index.js` تحت مسار `/directors`
ب) إنشاء ملف `directors.js` جديد بنفس بنية `movies.js` (Router + بيانات + routes)، ثم استيراده وربطه بـ `app.use('/directors', directorRouter)` داخل `index.js`
ج) نسخ محتوى `movies.js` بالكامل واستبدال اسم المتغيّر فقط دون إنشاء ملف جديد
د) لا يمكن إضافة مورد ثانٍ بنفس التطبيق

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا التطبيق المباشر لنمط `modular routing` الذي شرحناه بالقسمين 2.1 و3.1
- ❌ **الخيار أ:** يخالف فلسفة الفصل والتنظيم التي بُنيت عليها المحاضرة كاملة
- ❌ **الخيار ج:** غير عملي ولا يحقق الفصل المطلوب بين الموارد المختلفة
- ❌ **الخيار د:** خطأ مفاهيمي مباشر — كل الهدف من `Router` هو تمكين إضافة موارد متعددة بسهولة

---

### السؤال 13 (medium)

أي `status code` يجب أن يظهر عند إرسال `POST /movies` ببيانات `rating` بصيغة خاطئة (مثلاً `"8"` بدون فاصلة عشرية)؟

أ) `200 OK`
ب) `201 Created`
ج) `400 Bad Request`
د) `404 Not Found`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `rating` بصيغة `"8"` لا يطابق `regex` `/^[0-9]\.[0-9]$/`، فيدخل الكود فرع فشل الـ `validation` ويرجع `400`
- ❌ **الخيار أ:** خطأ شائع هو افتراض أن أي بيانات "مرسلة" تُقبل تلقائيًا بغض النظر عن الصيغة
- ❌ **الخيار ب:** لا يظهر هذا الرمز إطلاقاً بالكود (كما وضّحنا بالسؤال 8، الكود يستخدم `200` الافتراضي أصلاً حتى عند النجاح)
- ❌ **الخيار د:** خلط مع سيناريو `GET` بـ `id` غير موجود، وليس له علاقة بفشل `validation`

---

### السؤال 14 (hard)

تتبّع تنفيذ `PUT /movies/102` (فيلم Inception موجود مسبقاً بـ `id=102`) ببيانات جديدة صحيحة الصيغة. ما تسلسل الأحداث الصحيح؟

أ) فشل الـ `validation` → `400 Bad Request`
ب) نجاح الـ `validation` → `indexOf` يرجع `-1` → إنشاء فيلم جديد بـ `id="102"`
ج) نجاح الـ `validation` → `indexOf` يجد الموقع الصحيح → استبدال العنصر بالكامل → رسالة "Movie id 102 updated."
د) نجاح الـ `validation` → حذف الفيلم القديم → إنشاء فيلم جديد بنفس الاسم

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** بما أن `102` موجود مسبقاً بالـ `array` الأصلي، `parseInt("102")` يطابق `movie.id` الرقمي (`102`)، فـ `indexOf` يجد الموقع الصحيح ويدخل فرع التحديث
- ❌ **الخيار أ:** يفترض بيانات غير صالحة، لكن السؤال حدد صراحة "بيانات جديدة صحيحة الصيغة"
- ❌ **الخيار ب:** هذا كان سيحدث فقط لو `id` غير موجود مسبقاً (زي `999` بالسؤال 9)، وليس `102` الموجود أصلاً
- ❌ **الخيار د:** الكود لا يستخدم منطق "حذف ثم إنشاء" إطلاقاً؛ يستخدم استبدال مباشر بنفس الموقع (`movies[updateIndex] = {...}`)

---

### السؤال 15 (hard)

تتبّع تنفيذ `DELETE /movies/103` (فيلم The Dark Knight، `id` مخزَّن كرقم `103` بالأفلام الأصلية). ما النتيجة الفعلية بناءً على الكود كما هو مكتوب بالمحاضرة (بدون `parseInt`)؟

أ) يُحذف الفيلم بنجاح وترجع رسالة "Movie id 103 removed."
ب) `removeIndex` يساوي `-1` دائماً بسبب مقارنة نص (`"103"`) مع رقم (`103`)، فترجع رسالة "Not found" رغم أن الفيلم موجود فعلياً
ج) يرجع `400 Bad Request`
د) يرجع `404 Not Found`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا بالضبط "الخطأ الحقيقي الموثق" الذي شرحناه بالقسم 7.1 — عدم استخدام `parseInt()` بمسار `DELETE` (بخلاف `PUT`) يجعل مقارنة `indexOf` تفشل دائماً مع الأفلام ذات الـ `id` الرقمي الأصلي
- ❌ **الخيار أ:** هذا ما "يُفترض" أن يحدث منطقيًا، لكنه ليس ما يحدث فعليًا بسبب الخطأ التقني بالكود
- ❌ **الخيار ج:** لا يوجد أي منطق `validation` أصلاً بمسار `DELETE` يمكن أن يُنتج `400`
- ❌ **الخيار د:** الكود لا يستخدم `res.status(404)` إطلاقاً بمسار `DELETE` — فقط يرجع رسالة `"Not found"` بحالة `200` الافتراضية

---

### السؤال 16 (medium)

أي العبارات التالية **ليست** صحيحة بخصوص بيانات الأفلام (`movies array`) بالمحاضرة؟

أ) البيانات تُخزَّن بالذاكرة فقط، وتُفقد عند إعادة تشغيل الخادم
ب) يمكن استبدالها بقاعدة بيانات حقيقية أو ملف عبر `Node.js fs module`
ج) البيانات تُخزَّن بشكل دائم بملف نصي تلقائيًا في كل مرة يُضاف فيها فيلم جديد
د) الأفلام الأربعة الأصلية معرَّفة مباشرة داخل الكود كقيم ابتدائية

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** غير صحيحة وهي المطلوبة — لا يوجد أي تخزين دائم تلقائي بالكود؛ كل شيء بالذاكرة فقط كما وضّحنا بالقسم 3.1
- ❌ **الخيار أ:** صحيحة تمامًا وهذا بالضبط ما وضّحته المحاضرة
- ❌ **الخيار ب:** صحيحة — هذا الحل البديل المذكور صراحة بالمحاضرة
- ❌ **الخيار د:** صحيحة — الأفلام الأربعة (`101`-`104`) مكتوبة يدويًا كقيم ابتدائية بالـ `array`

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 REST — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `REST` | أسلوب معماري لتصميم `APIs` عبر `URIs` و`HTTP methods` — اقترحه Roy Fielding سنة 2000 |
| `Resource` | الكيان اللي نتعامل معه (مثل `movies`) — يُمثَّل برابط ثابت (`URI`) |
| `Safe` | الطلب لا يغيّر حالة الخادم إطلاقاً (خاص بـ `GET`) |
| `Idempotent` | تكرار نفس الطلب لا يغيّر النتيجة النهائية بعد أول تنفيذ (`GET`, `PUT`, `DELETE`) |
| `Upsert` | سلوك `PUT` — تحديث المورد لو موجود، أو إنشاؤه لو غير موجود |

### 🔑 Express / REST API — مرجع الأوامر السريعة
| الأمر | ماذا يفعل | مثال |
| --- | --- | --- |
| `node index.js` | تشغيل الخادم | `node index.js` |
| `curl -X GET <url>` | إرسال طلب `GET` | `curl -X GET localhost:3000/movies` |
| `curl -X POST --data "..." <url>` | إرسال طلب `POST` ببيانات | `curl -X POST --data "name=X&year=1999&rating=8.0" localhost:3000/movies` |
| `curl -X PUT --data "..." <url>` | إرسال طلب `PUT` ببيانات | `curl -X PUT --data "name=X&year=1999&rating=8.0" localhost:3000/movies/101` |
| `curl -X DELETE <url>` | إرسال طلب `DELETE` | `curl -X DELETE localhost:3000/movies/101` |

### 🔑 Express Routing — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `express.Router()` | ينشئ مجموعة `routes` مستقلة قابلة للتصدير والربط بمسار فرعي |
| `req.params` | يحتوي قيم الأجزاء المتغيّرة بالرابط (`:id`) |
| `req.body` | يحتوي البيانات المرسلة بجسم الطلب (يحتاج `body-parser` أولاً) |
| `res.json(data)` | يحوّل `data` إلى `JSON` ويرسلها مع `Content-Type` مناسب |
| `res.status(code)` | يضبط `HTTP status code` للاستجابة |
| `Route parameter regex` | `:param([regex])` — يقيّد صيغة القيمة المقبولة لمعامل الرابط |

### 🔑 جداول المقارنة السريعة
| المعيار | `POST` | `PUT` |
| --- | --- | --- |
| **من يحدد الـ `id`** | الخادم (تلقائي) | العميل (عبر الرابط) |
| **Idempotent؟** | لا | نعم |
| **عند عدم وجود المورد** | ينشئ دائماً مورداً جديداً | نفس السلوك (ينشئ) |
| **عند إعادة الإرسال بنفس البيانات** | ينشئ نسخة جديدة كل مرة | لا يغيّر النتيجة النهائية |

### 🔑 مرجع HTTP Methods + Status Codes (لهذه المحاضرة REST/Express)
| Method | الاستخدام | Status Code النجاح | Status Code الخطأ الشائع |
| --- | --- | --- | --- |
| `GET` | قراءة مورد أو قائمة موارد | `200 OK` | `404 Not Found` (مورد واحد غير موجود) |
| `POST` | إنشاء مورد جديد | `200 OK` (الكود لا يضبط `201` صراحة) | `400 Bad Request` (بيانات ناقصة/خاطئة) |
| `PUT` | تحديث مورد (أو إنشاؤه — upsert) | `200 OK` | `400 Bad Request` (بيانات أو `id` غير صالح) |
| `DELETE` | حذف مورد | `200 OK` | لا يوجد `status` خاص — الرسالة فقط تتغيّر ("Not found") |

### 🔑 القواعد الذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | الرابط (`URI`) يمثّل المورد، والـ `HTTP method` يمثّل العملية — لا تخلط بينهما بأسماء أفعال بالرابط |
| 2 | `middleware` (`body-parser`, `cookie-parser`, إلخ) يجب تسجيله **قبل** أي `route` يعتمد عليه |
| 3 | `POST` ينشئ دائماً؛ `PUT` يحدّث أو ينشئ حسب وجود المورد (upsert) |
| 4 | استخدم `parseInt()` دائماً عند مقارنة `req.params.id` (نص) مع `id` مخزَّن كرقم — وإلا `indexOf` تفشل بصمت |
| 5 | `regex` بعد `:param` بتعريف المسار (`:id([0-9]{3,})`) يقيّد صيغة القيمة المقبولة قبل حتى دخول الدالة |

### 🔑 الخطوات السريعة — بناء REST API بسيط بـ Express
#### إعداد مورد جديد من الصفر
```algorithm
1 | إنشاء ملف router منفصل (مثل movies.js) | express.Router() | router جاهز للتصدير
2 | تعريف بيانات ابتدائية (array بالذاكرة أو قاعدة بيانات) | JavaScript array/DB | مصدر بيانات جاهز
3 | كتابة GET / و GET /:id | router.get() | قراءة كل الموارد أو مورد واحد
4 | كتابة POST / مع validation | router.post() | إنشاء مورد جديد
5 | كتابة PUT /:id مع منطق upsert | router.put() | تحديث أو إنشاء مورد
6 | كتابة DELETE /:id | router.delete() | حذف مورد
7 | ربط الـ router بـ index.js | app.use('/path', router) | API جاهز للعمل
```

---

## الجزء الخامس: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما هو `REST`، ومن اقترحه ومتى؟
**A:** أسلوب معماري لتصميم الـ `APIs` عبر `URIs` وHTTP methods، اقترحه Roy Fielding سنة 2000.

### البطاقة 2
**Q2:** ما الفرق بين `Safe` و`Idempotent`؟
**A:** `Safe` تعني عدم تغيير حالة الخادم إطلاقاً (خاص بـ `GET`)، بينما `Idempotent` تعني أن تكرار الطلب لا يغيّر النتيجة النهائية (`GET`, `PUT`, `DELETE`).

### البطاقة 3
**Q3:** أي `HTTP method` يُستخدم لإنشاء مورد جديد دائماً بغض النظر عن التكرار؟
**A:** `POST` — كل طلب `POST` ينشئ مورداً جديداً بـ `id` جديد، وهو غير `Idempotent`.

### البطاقة 4
**Q4:** ما الفرق بين `POST` و`PUT` من ناحية تحديد الـ `id`؟
**A:** بـ `POST` الخادم يولّد الـ `id` تلقائياً، بينما بـ `PUT` العميل يحدد الـ `id` عبر الرابط.

### البطاقة 5
**Q5:** ما وظيفة `req.params.id` مقارنة بـ `req.body`؟
**A:** `req.params.id` يحتوي قيمة الجزء المتغيّر بالرابط (`:id`)، بينما `req.body` يحتوي البيانات المرسلة بجسم الطلب.

### البطاقة 6
**Q6:** لماذا يجب تسجيل `bodyParser.json()` قبل ربط أي `router` يحتاج قراءة `req.body`؟
**A:** لأن `middleware` في Express ينفَّذ بترتيب التسجيل؛ بدونه مسجّلاً أولاً، `req.body` يصل فارغاً لأي `route` بعده.

### البطاقة 7
**Q7:** ما وظيفة إضافة `regex` بين قوسين بعد `:param` في تعريف مسار Express؟
**A:** يقيّد صيغة القيمة المقبولة لهذا المعامل — مثل `:id([0-9]{3,})` الذي يقبل أرقاماً فقط بطول 3 خانات فأكثر.

### البطاقة 8
**Q8:** متى تُستخدم `express.Router()` بدل كتابة الـ `routes` مباشرة في `index.js`؟
**A:** لتنظيم الكود بحيث كل مورد له ملف مستقل، وتسهيل التوسّع بإضافة موارد جديدة لاحقاً.

### البطاقة 9
**Q9:** ما ناتج `res.status(404); res.json({message: "Not Found"})`؟
**A:** استجابة برمز حالة `404` وجسم `JSON` يحتوي رسالة توضح عدم وجود المورد المطلوب.

### البطاقة 10
**Q10:** لماذا يستخدم مسار `PUT` دالة `parseInt(req.params.id)` عند البحث عن الموقع، بينما `DELETE` لا يستخدمها؟
**A:** هذا اختلاف (غير مقصود تقنياً) بين المسارين بالمحاضرة؛ `PUT` يحوّل الـ `id` لرقم قبل المقارنة فتنجح المطابقة مع الأفلام الأصلية، بينما `DELETE` يقارن نصاً بمصفوفة أرقام فتفشل المطابقة دائماً معها.

### البطاقة 11
**Q11:** ما الفرق بين `movies.filter()` المستخدمة بمسار `GET /:id` وبين استخدام `Array.prototype.find()`؟
**A:** `filter` ترجع `array` دائماً (حتى لو فارغ أو بعنصر واحد)، فيحتاج الكود لفحص `.length`؛ بينما `find` كانت سترجع العنصر مباشرة (أو `undefined`) بدون هذي الخطوة الإضافية.

### البطاقة 12
**Q12:** ماذا يعني أن تخزين الأفلام "in-memory"؟
**A:** يعني أن البيانات محفوظة في متغيّر `array` بالذاكرة فقط، وتُفقد وترجع لحالتها الأصلية بمجرد إعادة تشغيل الخادم.

### البطاقة 13
**Q13:** ما الحقول الثلاثة التي يتحقق منها مسار `POST` قبل إنشاء فيلم جديد؟
**A:** `name` (موجود وغير فارغ)، `year` (4 أرقام بالضبط)، و`rating` (رقم واحد، فاصلة عشرية، رقم واحد).

### البطاقة 14
**Q14:** متى تستخدم `DELETE /movies` (بدون تحديد `id`) حسب جدول REST بالمحاضرة؟
**A:** لا تُستخدم أبداً — هذا الاستدعاء غير صالح لأن `DELETE` (وكذلك `PUT`) يجب أن يستهدف مورداً محدداً بـ `id`.

### البطاقة 15
**Q15:** ماذا يحدث لو أرسلت `PUT /movies/999` (id غير موجود مسبقاً) ببيانات صحيحة؟
**A:** يتم إنشاء فيلم جديد بـ `id = "999"` (سلوك upsert)، وترجع رسالة "New movie created."

---


# المحاضرة 10 — ExpressJS RESTful APIs (بناء REST API بواسطة Express)
> **المادة:** تطوير تطبيقات الويب (القسم العملي) | **الموضوع:** بناء `RESTful API` كامل باستخدام `Express.js` — من مبدأ `REST` النظري إلى تطبيق عملي (Movies API) بعمليات `CRUD` الأربع

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تشرح كيف تبني `API` حقيقي يتبع أسلوب `REST` باستخدام `Express`، بدءاً من فكرة الـ `REST` النظرية، ووصولاً لتطبيق كامل لإدارة أفلام (`Movies API`) بعمليات القراءة والإنشاء والتعديل والحذف.

### 🎯 ستتعلم
- ما هو `REST` ولماذا أصبح الأسلوب المعتمد في بناء الـ `APIs`
- كيف تُسمّى الـ `URIs` وتُختار أفعال `HTTP` الصحيحة (`GET`, `POST`, `PUT`, `DELETE`)
- كيف تُنشئ `Router` منفصل في `Express` وتربطه بالتطبيق الرئيسي
- كيف تتعامل مع بيانات الطلب (`req.params`, `req.body`) لبناء عمليات `CRUD` كاملة
- كيف تتحقق من صحة البيانات المُرسلة (`validation`) وترجع أكواد الحالة (`status codes`) المناسبة

### 📚 المتطلبات السابقة
- أساسيات `HTML` و `CSS`
- أساسيات `JavaScript` (الدوال، المصفوفات، الـ callbacks)
- معرفة أساسية بـ `Express` (إنشاء `app`, تشغيل `server`, الـ `middleware`) — لأن هذه المحاضرة تفترض أنك تعرف كيف تُشغّل تطبيق `Express` بسيط من محاضرة سابقة

### 💡 الأفكار الرئيسية

خلك تتخيل الموضوع كذا: عندك تطبيق موبايل، وعندك موقع ويب، وعندك تطبيق ديسكتوب — وكلهم يبغون يوصلون لنفس البيانات (مثلاً قائمة أفلام). لو كل تطبيق يتكلم مع السيرفر بطريقته الخاصة، بتصير فوضى. هنا يجي دور الـ `API` — طبقة موحّدة تعطي أي `client` (سواء موبايل أو ويب أو حتى `curl` من التيرمنال) طريقة واحدة موحّدة للوصول للبيانات ومعالجتها.

لكن "طريقة موحّدة" هذي محتاجة قواعد. وهنا يجي `REST` (اختصار `Representational State Transfer`). هذا مو بروتوكول أو مكتبة — هو **أسلوب معماري (architectural style)** اقترحه `Roy Fielding` سنة 2000 في أطروحته الشهيرة (`Fielding Dissertation`). والمثير إن `HTTP 1.1` نفسه صُمم وهو واضع في باله مبادئ `REST` — يعني الاثنين مرتبطين بعمق.

فكرة `REST` بسيطة لما تفهمها: الـ `URI` (الرابط) يمثّل **مورد (resource)**، مثل `/movies` أو `/movies/1234`، وفعل `HTTP` (`GET`, `POST`, `PUT`, `DELETE`) يحدد **العملية** اللي بتُنفَّذ على هذا المورد. يعني الرابط نفسه ما يتغير، اللي يتغير هو الفعل. هذا عكس الطريقة القديمة اللي كنا نشوفها بروابط مثل `/getMovie?id=1234` أو `/deleteMovie?id=1234` — فيها الفعل مكتوب داخل الرابط نفسه، وهذا يخالف مبدأ `REST`.

جدول الأفعال الأربعة الأساسية يوضح الفكرة أكثر:

| Method | URI | خاصية | الوظيفة |
| --- | --- | --- | --- |
| `GET` | `/movies` | `Safe`, `Cacheable` | يجلب قائمة كل الأفلام |
| `GET` | `/movies/1234` | `Safe`, `Cacheable` | يجلب تفاصيل الفيلم رقم 1234 |
| `POST` | `/movies` | — | ينشئ فيلماً جديداً، والاستجابة تحتوي رابط المورد الجديد |
| `PUT` | `/movies/1234` | `Idempotent` | يعدّل الفيلم 1234 (أو ينشئه لو ما كان موجوداً) |
| `DELETE` | `/movies/1234` | `Idempotent` | يحذف الفيلم 1234 إن وُجد |
| `DELETE`/`PUT` | `/movies` | غير صالح | ممنوع — لازم تحدد *أي* مورد بالضبط تريد تعدّله أو تحذفه |

فيه مصطلحين مهمين هنا لازم تفهمهم صح: **`Safe`** يعني الطلب ما يغيّر أي بيانات على السيرفر (بس يقرأ)، و**`Idempotent`** يعني إنك لو كررت نفس الطلب عدة مرات، النتيجة النهائية ما تتغير عن تنفيذه مرة وحدة. مثلاً `DELETE /movies/1234` — أول مرة يحذف الفيلم، لو كررتها 10 مرات، النتيجة نفسها: الفيلم محذوف. لكن `POST /movies` مو `idempotent` — كل مرة تنفذه ينشئ فيلم *جديد* بمعرّف مختلف.

> 🎯 **جملة الامتحان:** `REST` هو أسلوب معماري (وليس بروتوكولاً) اقترحه `Roy Fielding` سنة 2000، يمثّل فيه الـ `URI` المورد ويمثّل فعل `HTTP` العملية المطلوبة على هذا المورد.

بعد ما فهمنا النظرية، المحاضرة تبني تطبيقاً عملياً كاملاً: `Movies API`. الفكرة إننا نخزّن الأفلام في الذاكرة (`in-memory array`) بدل قاعدة بيانات حقيقية — وهذا يعني إن أي فيلم تضيفه بيروح لما تعيد تشغيل السيرفر (لأن الـ array يترجع لقيمته الأصلية). هذا اختيار تعليمي مقصود عشان نركز على منطق الـ `routes` بدون تعقيد قاعدة بيانات، وفي مشروع حقيقي بتستبدل هذا الـ array بقاعدة بيانات أو حتى ملف عبر `Node` `fs` module.

هيكلة المشروع تعتمد على تقسيم الكود لملفين: `index.js` هو نقطة الدخول اللي يجهز التطبيق (`middleware` مثل `body-parser` و `multer`)، و`movies.js` هو **`Router`** منفصل يحتوي كل منطق الأفلام. الـ `Router` في `Express` هو أداة تخليك تجمّع مجموعة `routes` مرتبطة ببعض في ملف منفصل، وبعدين تربطها بالتطبيق الرئيسي بمسار أساسي (`base path`) واحد — بدل ما تكتب كل شي في ملف `index.js` وحيد يصير فوضى مع كبر المشروع.

```javascript
// movies.js exports a Router, index.js mounts it on /movies
app.use('/movies', movies);
```

هذا السطر الوحيد يعني إن كل `route` معرّف داخل `movies.js` بـ `/` سيصبح فعلياً على `/movies`، و `/:id` سيصبح `/movies/:id`. هذا التقنية تسمى **`sub-routing`** أو **`mounting`**.

بعدين تبني عمليات الـ `CRUD` الأربعة واحدة تلو الأخرى:

**القراءة (`GET`)** — عندك مسارين: واحد يرجّع كل الأفلام (`res.json(movies)`)، وواحد يرجّع فيلم واحد بالـ `id` عبر `route parameter` (`req.params.id`). المهم هنا إنه لو الفيلم غير موجود، يرجّع `status 404` بدل ما يرجّع مصفوفة فاضية أو يعلّق — لأن الـ `client` لازم يعرف بوضوح إن المورد غير موجود.

**الإنشاء (`POST`)** — قبل الإضافة، لازم تتحقق (`validate`) إن كل الحقول المطلوبة موجودة وبالصيغة الصحيحة (باستخدام `regex` على `year` و `rating`). لو فيه خطأ، ترجّع `400 Bad Request`. لو كل شي تمام، تحسب `id` جديد وتضيف الفيلم للمصفوفة وترجّع رسالة نجاح مع رابط المورد الجديد.

**التعديل (`PUT`)** — نفس فكرة `POST` من ناحية التحقق، بس الفرق الجوهري إن `PUT` **يحدد الـ id في الرابط نفسه** (`/movies/:id`) مو في الجسم. ولأن `PUT` مفروض يكون `idempotent`، لو الفيلم بهذا الـ `id` غير موجود، السلوك المتوقع (`upsert`) هو **إنشاؤه** بدل رفض الطلب — عكس `POST` اللي دايماً ينشئ مورد جديد بمعرّف جديد.

**الحذف (`DELETE`)** — يبحث عن الفيلم بالـ `id`، ولو لقاه يحذفه من المصفوفة عبر `splice`، ولو ما لقاه يرجّع رسالة `"Not found"`.

آخر شي، المحاضرة تجمع كل هذا في ملف `movies.js` واحد نهائي، جاهز يُصدَّر (`module.exports`) ويُستخدم في `index.js`.

> 🎯 **جملة الامتحان:** الفرق الجوهري بين `POST` و `PUT` هو أن `POST /movies` دائماً ينشئ مورداً جديداً بمعرّف يولّده السيرفر، بينما `PUT /movies/:id` يحدد المعرّف في الرابط ويُعدّل المورد إن وُجد أو ينشئه بنفس المعرّف إن لم يوجد (`upsert`)، وهو `idempotent` على عكس `POST`.

---

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
كثير من المبتدئين يفتكرون إن `REST` هو "بروتوكول" زي `HTTP` أو "معيار" رسمي لازم تتبعه بالحرف — وبعدين يتفاجؤون لما يشوفون تطبيقات "تدّعي" إنها `RESTful` بس تخالف بعض القواعد.

#### الفهم الصحيح ✅:
`REST` هو **أسلوب معماري (architectural style)** — يعني مجموعة مبادئ وإرشادات (زي إن الرابط يمثل مورد، وإن `GET` يكون `safe`) وليس مواصفة صارمة يفرضها جهة رسمية. لهذا تلقى اختلافات بسيطة بين تطبيقات مختلفة تدّعي كلها إنها `RESTful`، طالما هي محترمة المبادئ الأساسية.

---

### 🔗 الاتصالات مع مواضيع أخرى
- **ما قبله:** يفترض أنك تعرف أساسيات `Express` (`app`, `middleware`, تشغيل السيرفر) من محاضرة سابقة — هنا نبني عليها مباشرة بإضافة `Router` منفصل.
- **الجاي بعده:** بعد ما تتعلم `CRUD` الأساسي بمصفوفة في الذاكرة، الخطوة الطبيعية التالية هي ربط نفس المسارات بقاعدة بيانات حقيقية (مثل `MongoDB` أو `MySQL`) بدل الـ `in-memory array`.

---

### لما تحتاج هذا في الامتحان
غالباً الأسئلة تركز على: (1) تمييز أي فعل `HTTP` يستخدم لأي عملية، (2) الفرق بين `POST` و `PUT` من ناحية `idempotency` وسلوك الإنشاء، (3) قراءة كود `route` وتحديد إيش بيرجّع (`status code` أو محتوى) في حالات مختلفة (فيلم موجود / غير موجود / بيانات ناقصة)، (4) معنى `Safe` و `Idempotent` وتطبيقهم على كل فعل.

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مبدأ REST والأفعال الأساسية

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

#### 📍 أين نحن الآن؟
هذا أول موضوع في المحاضرة — الأساس النظري قبل أي كود.

#### ⬅️ الربط مع السابق
لا يوجد ربط مباشر بمحاضرة سابقة هنا، لكنه يبني على فرضية أنك تعرف `HTTP` بشكل عام (الطلب والاستجابة).

#### 💡 الفكرة الأساسية
**`REST` أسلوب معماري يمثّل فيه الرابط (`URI`) موردًا، ويحدد فعل `HTTP` العملية المطلوبة عليه.**

---

#### 📖 الشرح
لما تبني `API`، أنت فعلياً تصمم "لغة" يتفاهم بيها أي `client` مع سيرفرك. `REST` يعطيك قواعد لهذه اللغة: كل مورد (فيلم، مستخدم، منتج...) له رابط ثابت يمثّله، وأنت لا تكرر اسم العملية داخل الرابط (زي `/getMovie`) لأن فعل `HTTP` نفسه (`GET`) هو اللي يحمل معنى العملية.

هذا يخلق تناسقاً: أي مطوّر يشوف `DELETE /movies/1234` يفهم فوراً وبدون قراءة توثيق إضافي إن هذا الطلب سيحذف الفيلم رقم 1234. لو كانت التسمية `/movies/deleteById?id=1234` فهذا يعمل، لكنه يخالف مبدأ `REST` لأنه يكرر الفعل في الرابط بدل الاعتماد على `HTTP method`.

النقطة الأخيرة المهمة: الجدول يوضح إن `DELETE` أو `PUT` على `/movies` (بدون `id`) غير صالحين — لأنهم أفعال تعمل على مورد *واحد محدد*، فلازم تحدد أي مورد بالضبط عبر الـ `id` في الرابط.

#### 💡 التشبيه:
> فكّر في `REST` مثل نظام عنونة البريد: العنوان (الرابط) يحدد *أين* البيت، والفعل (توصيل، استلام، إرجاع طرد) يحدد *إيش* بيصير في هذا العنوان. أنت ما تكتب "بيت-التوصيل-123" كعنوان، العنوان يبقى ثابت والفعل هو اللي يتغير.
> **وجه الشبه:** العنوان الثابت = الـ `URI` للمورد، ونوع عملية البريد = فعل `HTTP`.

#### 🎯 الملخص السريع
- `REST` أسلوب معماري (مو بروتوكولاً رسمياً)، اقترحه `Roy Fielding` سنة 2000
- الرابط (`URI`) = المورد، فعل `HTTP` = العملية
- `GET` = `Safe` (ما يغيّر بيانات) و `Cacheable`
- `PUT` و `DELETE` = `Idempotent` (تكرارها بنفس النتيجة)، أما `POST` فلا

> 🎯 **جملة الامتحان:** `HTTP 1.1` صُمم وهو آخذ بعين الاعتبار مبادئ `REST`، و `REST` نفسه قدّمه `Roy Fielding` سنة 2000 ضمن أطروحته (`Fielding Dissertation`).

#### 📚 التطبيق
هذا الجدول هو الأساس اللي ستُبنى عليه كل الـ `routes` في بقية المحاضرة — كل قسم لاحق (`GET`, `POST`, `PUT`, `DELETE`) هو تطبيق مباشر لسطر من هذا الجدول.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> An API is always needed to create mobile applications, single page applications, use AJAX calls and provide data to clients. A popular architectural style of how to structure and name these APIs and the endpoints is called REST (Representational State Transfer). HTTP 1.1 was designed keeping REST principles in mind. REST was introduced by Roy Fielding in 2000 in his Paper Fielding Dissertations.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف `REST`، علاقته بـ `HTTP 1.1`، من قدّمه ومتى، وجدول الأفعال والـ `URIs` كاملاً
- ℹ️ إضافة من الدليل: تشبيه العنونة البريدية، توضيح مصطلحي `Safe` و `Idempotent`

</details>

---

### 2. إعداد التطبيق الرئيسي — index.js

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
بعد فهم النظرية، أول خطوة عملية هي تجهيز ملف `index.js` كنقطة دخول للتطبيق.

#### ⬅️ الربط مع السابق
في القسم السابق تعلمنا *لماذا* نحتاج بنية معينة للـ `API`؛ هنا نبدأ نبني الهيكل الفعلي الذي سيستضيف تلك الـ `routes`.

#### 💡 الفكرة الأساسية
**`index.js` يجهّز التطبيق (`middleware` لقراءة البيانات) ثم يربط `Router` الأفلام على المسار `/movies`.**

---

#### 💻 الكود
```javascript
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Require the Router we defined in movies.js
var movies = require('./movies.js');
// Use the Router on the sub route /movies
app.use('/movies', movies);

app.listen(3000);
```

#### شرح كل سطر:
1. `require('express')`, `require('body-parser')`, `require('multer')` → استيراد المكتبات: `express` لبناء السيرفر، `body-parser` لتحليل جسم الطلب (`request body`)، و `multer` للتعامل مع بيانات نوع `multipart/form-data`
2. `var upload = multer();` → إنشاء نسخة `multer` جاهزة للاستخدام كـ `middleware`
3. `var app = express();` → إنشاء تطبيق `Express` الرئيسي
4. `app.use(bodyParser.json())` → `middleware` يحوّل جسم الطلب من `JSON` نص خام إلى `object` جافاسكربت متاح عبر `req.body`
5. `app.use(bodyParser.urlencoded({extended: true}))` → نفس الفكرة لكن للبيانات المُرسلة بصيغة `form` تقليدية (`application/x-www-form-urlencoded`)
6. `app.use(upload.array())` → `middleware` من `multer` يتيح استقبال بيانات `form-data` (يُستخدم غالباً مع الملفات، لكنه هنا يتيح أيضاً قراءة الحقول العادية المُرسلة بهذه الصيغة)
7. `var movies = require('./movies.js');` → استيراد الـ `Router` المُعرَّف في ملف منفصل
8. `app.use('/movies', movies);` → **(شرح زيادة للفهم)** ربط ذلك الـ `Router` بحيث كل مسار داخله يُضاف كـ بادئة `/movies` تلقائياً
9. `app.listen(3000);` → تشغيل السيرفر والاستماع على المنفذ `3000`

#### 📖 الشرح
الفكرة الجوهرية هنا هي **الفصل بين الإعداد العام والمنطق الخاص بمورد معين**. ملف `index.js` مسؤوليته الوحيدة هي: تجهيز `middleware` عام (يحتاجه كل التطبيق) وربط أجزاء التطبيق (الـ `Routers`) ببعض، بدون ما يعرف تفاصيل كيف تُدار الأفلام تحديداً.

الـ `middleware` الثلاثة (`bodyParser.json`, `bodyParser.urlencoded`, `upload.array`) كلها تخدم غرض واحد: تحويل بيانات الطلب الخام (`raw`) — سواء جاءت بصيغة `JSON` أو `form-urlencoded` أو `multipart/form-data` — إلى كائن `req.body` سهل التعامل معه في أي `route` لاحق. بدون هذه الخطوة، `req.body` سيكون `undefined` وكل عمليات `POST` و `PUT` ستفشل.

`app.use('/movies', movies)` هو سطر التوصيل السحري: بدل ما تكتب كل الـ `routes` مباشرة على `app`، أنت تفوّضها لكائن `Router` مستقل، وتحدد فقط "أي مسار أساسي يبدأ منه هذا الـ `Router`".

#### 💡 التشبيه:
> فكّر في `index.js` كمدير استقبال في مبنى كبير: هو ما يتعامل مع تفاصيل كل قسم (المحاسبة، الموارد البشرية)، بس يوجّه أي زائر يدخل من باب "الأفلام" (`/movies`) إلى القسم المختص (`movies.js`) اللي يعرف يتعامل مع طلبات هذا القسم بالتفصيل.
> **وجه الشبه:** باب المبنى الموجَّه = `app.use('/movies', movies)`، والقسم المختص = ملف `movies.js`.

#### 🎯 الملخص السريع
- `bodyParser` و `multer` يجهزون `req.body` ليكون قابلاً للاستخدام
- `require('./movies.js')` يستورد `Router` مبني في ملف منفصل
- `app.use('/movies', movies)` يركّب (`mount`) هذا الـ `Router` على مسار أساسي واحد

> 🎯 **جملة الامتحان:** `app.use(path, router)` في `Express` تربط كائن `Router` بمسار أساسي محدد، بحيث تُضاف قيمة `path` تلقائياً كبادئة لكل مسار مُعرَّف داخل ذلك الـ `Router`.

#### 📚 التطبيق
هذا النمط (`Router` منفصل + `app.use`) هو ما يسمح للمشروع بالتوسع — لو أضفت لاحقاً موارد جديدة (`/users`, `/reviews`)، تنشئ `Router` منفصل لكل واحد وتربطه بنفس الطريقة، بدون ما يتضخم `index.js`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Let us now create this API in Express. We will be using JSON as our transport data format as it is easy to work with in JavaScript and has other benefits. Replace your index.js file with the movies.js file as in the following program.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل سطور `index.js` ودور كل `middleware`
- ℹ️ إضافة من الدليل: تشبيه مدير الاستقبال، وتوضيح الفرق بين الثلاثة `middleware` للقراءة

</details>

---

### 3. إعداد Router الأفلام — البيانات الأولية

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### 📍 أين نحن الآن؟
الآن ننتقل لملف `movies.js` نفسه، ونبدأ بإعداد الـ `Router` والبيانات التي سنعمل عليها.

#### ⬅️ الربط مع السابق
في القسم السابق استوردنا `movies.js` من `index.js`؛ هنا نبني محتوى هذا الملف من الصفر.

#### 💡 الفكرة الأساسية
**نُنشئ `Router` مستقل ونخزّن الأفلام في مصفوفة بالذاكرة (بدل قاعدة بيانات) لتبسيط التركيز على منطق الـ `routes`.**

---

#### 💻 الكود
```javascript
var express = require('express');
var router = express.Router();

var movies = [
  {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
  {id: 102, name: "Inception", year: 2010, rating: 8.7},
  {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
  {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];

// Routes will go here

module.exports = router;
```

#### شرح كل سطر:
1. `var express = require('express');` → استيراد مكتبة `Express` داخل هذا الملف أيضاً (كل ملف يحتاج استيراده الخاص)
2. `var router = express.Router();` → إنشاء كائن `Router` جديد — هذا الكائن يشبه `app` لكنه "قابل للتركيب" (`mountable`) على أي مسار
3. `var movies = [...]` → مصفوفة تحتوي 4 أفلام ابتدائية، كل فيلم `object` بأربع خصائص: `id`, `name`, `year`, `rating`
4. `module.exports = router;` → تصدير الـ `Router` ليصبح قابلاً للاستيراد من `index.js` عبر `require('./movies.js')`

#### 📖 الشرح
`express.Router()` هي الأداة المركزية في هذا القسم. هي تعطيك كائناً له نفس دوال `app` (`get`, `post`, `put`, `delete`) لكنه **مستقل عن التطبيق الرئيسي** حتى تربطه لاحقاً. هذا يسمح بتنظيم الكود حسب المورد: كل مورد (أفلام، مستخدمين...) له ملف `Router` خاص به.

استخدام مصفوفة في الذاكرة بدل قاعدة بيانات قرار تعليمي واضح: يخلينا نركز 100% على منطق التعامل مع الطلبات (قراءة `params`, `body`, إرجاع `status codes` صحيحة) بدون تعقيد إعداد وربط قاعدة بيانات. العيب الوحيد (وهو مقصود ومذكور صراحة) هو أن أي تعديل يضيع عند إعادة تشغيل السيرفر، لأن الـ `array` تُعاد تهيئته من الصفر في كل مرة يُحمَّل فيها الملف.

#### 💡 التشبيه:
> `express.Router()` مثل دفتر ملاحظات فارغ منفصل تعطيه لموظف معين ليكتب فيه قواعد قسمه الخاص، بدل ما يكتب كل الموظفين في نفس الدفتر الرئيسي للشركة.
> **وجه الشبه:** الدفتر المنفصل = `Router`، الشركة الرئيسية = `app`.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو أعدت تشغيل السيرفر بعد ما أضفت فيلماً جديداً عبر `POST`، هل سيبقى الفيلم موجوداً؟
> **لماذا هذا مهم؟** لأنه يوضح الفرق بين التخزين المؤقت في الذاكرة (`in-memory`) والتخزين الدائم (قاعدة بيانات أو ملف) — وهذا سؤال كلاسيكي في الامتحانات.

#### 🎯 الملخص السريع
- `express.Router()` ينشئ كائن مسارات قابل للتركيب ومستقل عن `app`
- بيانات الأفلام مخزّنة في مصفوفة بالذاكرة فقط (تُفقد عند إعادة التشغيل)
- `module.exports = router;` ضروري حتى يقدر `index.js` يستورد هذا الـ `Router`

> 🎯 **جملة الامتحان:** `express.Router()` ينشئ كائن `mini-app` مستقل يحتوي مجموعة `routes` قابلة للتصدير والتركيب على أي مسار أساسي في التطبيق الرئيسي.

#### 📚 التطبيق
كل الـ `routes` القادمة (`GET`, `POST`, `PUT`, `DELETE`) ستُضاف داخل هذا الملف، بعد التعليق `// Routes will go here`، وتستخدم جميعها متغير `movies` نفسه المُعرَّف هنا.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Start by setting up the movies.js file. We are not using a database to store the movies but are storing them in memory; so every time the server restarts, the movies added by us will vanish. This can easily be mimicked using a database or a file (using node fs module). Once you import Express then, create a Router and export it using module.exports.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: سبب استخدام مصفوفة بالذاكرة، ودور `express.Router()` و `module.exports`
- ℹ️ إضافة من الدليل: تشبيه الدفتر المنفصل

</details>

---

### 4. مسارات GET — جلب البيانات

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
أول عمليات الـ `CRUD` الفعلية: القراءة، بحالتين — كل الأفلام، وفيلم واحد بالـ `id`.

#### ⬅️ الربط مع السابق
نستخدم متغير `movies` والـ `router` المُعرَّفَين في القسم السابق مباشرة.

#### 💡 الفكرة الأساسية
**`GET /` يرجّع كل الأفلام، و`GET /:id` يرجّع فيلماً واحداً أو `404` إن لم يوجد.**

---

#### 💻 الكود — الجزء الأول: جلب كل الأفلام
```javascript
router.get('/', function(req, res){
  res.json(movies);
});
```

#### شرح كل سطر:
1. `router.get('/', ...)` → تسجيل `route` يستجيب لطلبات `GET` على المسار الجذري لهذا الـ `Router` (والذي يصبح `/movies` بعد التركيب في `index.js`)
2. `function(req, res){...}` → دالة المعالجة (`handler`)، تستقبل `req` (الطلب) و `res` (الاستجابة)
3. `res.json(movies);` → **(شرح زيادة للفهم)** ترسل المصفوفة كاملة كاستجابة بصيغة `JSON`، وتضبط تلقائياً ترويسة `Content-Type: application/json`

#### 📖 الشرح
هذا أبسط `route` ممكن: لا يوجد تحقق (`validation`)، لا يوجد `parameters` — فقط إرجاع كل محتوى المصفوفة. هذا يطابق تماماً الجدول: `GET /movies` يكون `Safe` (لا يغيّر شيئاً) و `Cacheable`.

للتأكد من عمل هذا الـ `route`، يمكن اختباره عبر `curl`:

```bash
$ curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies
# Output: [{"id":101,"name":"Fight Club","year":1999,"rating":8.1}, ...]
```

---

#### 💻 الكود — الجزء الثاني: جلب فيلم واحد بالـ id
```javascript
router.get('/:id([0-9]{3,})', function(req, res){
  var currMovie = movies.filter(function(movie){
    if(movie.id == req.params.id){
      return true;
    }
  });

  if(currMovie.length == 1){
    res.json(currMovie[0]);
  } else {
    res.status(404); // Set status to 404 as movie was not found
    res.json({message: "Not Found"});
  }
});
```

#### شرح كل سطر:
1. `router.get('/:id([0-9]{3,})', ...)` → `:id` هو `route parameter` قابل للقراءة عبر `req.params.id`، والجزء `([0-9]{3,})` هو **قيد `regex`** يفرض أن تكون القيمة أرقاماً فقط بطول 3 خانات أو أكثر — هذا يمنع مثلاً `/movies/abc` من الدخول لهذا الـ `route`
2. `movies.filter(function(movie){...})` → تبحث في المصفوفة عن الأفلام اللي `id` تبعها يطابق `req.params.id`
3. `if(movie.id == req.params.id)` → مقارنة **غير صارمة** (`==` وليس `===`) لأن `req.params.id` دائماً `string`، بينما `movie.id` في المصفوفة `number`
4. `if(currMovie.length == 1)` → لو وجدنا مطابقة واحدة بالضبط
5. `res.json(currMovie[0])` → نرجّع الفيلم الوحيد (أول وآخر عنصر في نتيجة الفلترة)
6. `res.status(404); res.json({message: "Not Found"});` → لو ما وجدنا الفيلم، نضبط `status code` إلى `404` **قبل** إرسال الجسم — الترتيب هنا مهم لأن `res.status()` يجب أن يُستدعى قبل إرسال الاستجابة

#### 📖 الشرح
النقطة الأهم هنا هي **قيد الـ `regex` على الـ `route parameter`**: `/:id([0-9]{3,})`. هذا يعني إن `Express` نفسه يرفض أي طلب فيه `id` غير رقمي أو أقصر من 3 خانات قبل ما يوصل حتى لجسم الدالة — وهذا يمنع تعارضات محتملة مع `routes` أخرى (مثل لو عندك `/movies/new` كمسار منفصل لاحقاً).

الحالة الثانية المهمة هي التمييز بين نوعين من "الفشل": لو زرت رابطاً *غير موجود أصلاً* (لا يطابق أي `route` معرّف)، `Express` يرجّع خطأ `Cannot GET` تلقائياً. أما لو زرت رابطاً *صحيح الشكل* لكن الفيلم بذلك الـ `id` غير موجود في المصفوفة، فنحن نتحكم يدوياً بالاستجابة عبر `res.status(404)` — وهذا هو السلوك الصحيح المتوقع من `API` نظيف: يجب أن يعرف الـ `client` بوضوح "المورد غير موجود" وليس فقط استجابة فارغة بـ `status 200`.

#### 💡 التشبيه:
> `res.status(404)` مثل موظف استقبال يقول لك بوضوح "آسف، لا يوجد أحد بهذا الاسم في سجلاتنا" بدل ما يعطيك ورقة فاضية ويسكت — الاثنين "فشل" بس الأول واضح ومفهوم للنظام اللي يستقبل الرد.
> **وجه الشبه:** الرد الواضح "غير موجود" = `status 404` مع رسالة، والورقة الفاضية الغامضة = استجابة فارغة بدون `status code` مناسب.

#### 🎯 الملخص السريع
- `GET /` يرجّع كل الأفلام مباشرة عبر `res.json()`
- `GET /:id([0-9]{3,})` يستخدم `regex` لقيد شكل الـ `id` (رقمي، 3 خانات فأكثر)
- المقارنة `movie.id == req.params.id` تستخدم `==` لأن `req.params.id` نوعه `string` دائماً
- فيلم غير موجود → `res.status(404)` + رسالة `"Not Found"`

> 🎯 **جملة الامتحان:** كل قيم `req.params` في `Express` تكون دائماً من النوع `string`، حتى لو كان الجزء المطابق في الرابط أرقاماً فقط — لذلك تحتاج غالباً لمقارنة غير صارمة (`==`) أو تحويل نوع صريح عند مقارنتها بقيم رقمية.

#### 📚 التطبيق
منطق البحث بـ `filter` ومقارنة `id` هنا سيتكرر لاحقاً في `PUT` و `DELETE` (لكن باستخدام `map` + `indexOf` بدل `filter`)، وفكرة `regex` على الـ `parameter` يمكن تطبيقها على أي `route` يحتاج قيداً على شكل المدخل.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
مقارنة `req.params.id` مباشرة بـ `movie.id` باستخدام `===` (مقارنة صارمة).

#### الفهم الصحيح ✅:
لأن `req.params.id` هو دائماً `string` بينما `movie.id` هنا `number`، فإن `===` سترجع `false` دائماً حتى لو كانت القيمة "متطابقة منطقياً" (مثلاً `"101" === 101` تعطي `false`). لهذا استخدم `==` أو حوّل النوع صراحة بـ `parseInt(req.params.id)`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Let us define the GET route for getting all the movies... We have a route to get all the movies. Let us now create a route to get a specific movie by its id... If you visit an invalid route, it will produce a cannot GET error while if you visit a valid route with an id that doesn't exist, it will produce a 404 error.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كلا مساري `GET`، أوامر `curl` للاختبار، والفرق بين خطأ "رابط غير موجود" وخطأ "404"
- ℹ️ إضافة من الدليل: شرح سبب استخدام `==` بدل `===`، وتشبيه موظف الاستقبال

</details>

---

### 5. مسار POST — إنشاء فيلم جديد

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن الآن؟
ننتقل من القراءة إلى الكتابة: أول عملية تُغيّر البيانات فعلياً.

#### ⬅️ الربط مع السابق
نفس مصفوفة `movies` من القسم 3، لكن هنا سنضيف لها عنصراً جديداً بدل قراءته فقط كما في القسم 4.

#### 💡 الفكرة الأساسية
**`POST /movies` يتحقق من صحة البيانات المُرسلة، ثم يضيف فيلماً جديداً بمعرّف يولّده السيرفر تلقائياً.**

---

#### 💻 الكود
```javascript
router.post('/', function(req, res){
  // Check if all fields are provided and are valid:
  if(!req.body.name ||
     !req.body.year.toString().match(/^[0-9]{4}$/g) ||
     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){

    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var newId = movies[movies.length-1].id+1;
    movies.push({
      id: newId,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating
    });
    res.json({message: "New movie created.", location: "/movies/" + newId});
  }
});
```

#### شرح كل سطر:
1. `router.post('/', ...)` → تسجيل `route` يستجيب لطلبات `POST` على `/movies`
2. `!req.body.name` → يتحقق أولاً إن حقل `name` موجود أصلاً (لو `undefined` أو فارغ، الشرط `true` فيدخل حالة الخطأ)
3. `!req.body.year.toString().match(/^[0-9]{4}$/g)` → يحوّل `year` لنص، ويتأكد إنه بالضبط 4 أرقام (سنة كاملة مثل `1995`)
4. `!req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)` → يتأكد إن `rating` بصيغة رقم عشري من رقم واحد قبل الفاصلة وواحد بعدها (مثل `8.5`)
5. `res.status(400); res.json({message: "Bad Request"});` → لو أي شرط من الثلاثة فشل، نرجّع `400` (خطأ من طرف العميل بسبب بيانات ناقصة أو غير صحيحة)
6. `var newId = movies[movies.length-1].id+1;` → **(شرح زيادة للفهم)** يأخذ `id` آخر عنصر في المصفوفة ويزيد عليه 1 — طريقة بسيطة لتوليد `id` فريد، لكنها تفترض أن المصفوفة مرتبة ولا يوجد حذف يكسر التسلسل
7. `movies.push({...})` → إضافة الفيلم الجديد فعلياً للمصفوفة
8. `res.json({message: "New movie created.", location: "/movies/" + newId});` → استجابة نجاح تتضمن **رابط المورد الجديد** (`location`) — تطبيق مباشر لما ذُكر في جدول القسم 1: "الاستجابة تحتوي رابط المورد الجديد"

#### 📖 الشرح
هذا الـ `route` يقدّم أول مثال حقيقي على **التحقق من صحة المدخلات (`input validation`)**. لاحظ الترتيب: التحقق يحصل *قبل* أي تعديل على البيانات — هذا مبدأ مهم جداً في بناء الـ `APIs` الموثوقة: لا تلمس البيانات إلا بعد التأكد التام من صحة كل شيء.

طريقة توليد `newId` بسيطة لكنها هشة: تعتمد على كون آخر عنصر في المصفوفة هو صاحب أعلى `id`. في مشروع حقيقي (خصوصاً مع قاعدة بيانات) عادة يُترك توليد الـ `id` لقاعدة البيانات نفسها (`auto-increment` أو `UUID`) تجنباً لتعارضات محتملة، لكن هنا — بما إننا نستخدم مصفوفة بسيطة — هذا الأسلوب كافٍ للتعليم.

آخر نقطة: لاحظ أن `location` تُرجَع في **جسم الاستجابة** (`res.json`) وليس في **ترويسة `Location`** الفعلية لـ `HTTP` — وهذا مبسّط عن الممارسة الأكثر صرامة في `REST` الحقيقي (اللي عادة يستخدم `res.set('Location', ...)` مع `status 201 Created`)، لكن المحاضرة اختارت الطريقة الأبسط للتعليم.

#### 💡 التشبيه:
> عملية التحقق قبل الإضافة تشبه موظف الجمارك اللي يفحص جواز سفرك *قبل* ما يختمه ويسمح لك بالدخول — لو الجواز فيه نقص، يرفض الدخول من الأساس بدل ما يدخّلك ويكتشف المشكلة بعدين.
> **وجه الشبه:** فحص الجواز قبل الختم = التحقق (`validation`) قبل `movies.push()`.

#### 🎯 الملخص السريع
- التحقق يحصل *قبل* أي تعديل على البيانات
- `year` يجب أن يكون 4 أرقام بالضبط، و`rating` رقم عشري من خانة واحدة قبل وبعد الفاصلة
- بيانات غير صحيحة → `400 Bad Request`
- نجاح → `id` جديد يُولَّد تلقائياً + الاستجابة تتضمن `location` المورد الجديد

> 🎯 **جملة الامتحان:** حسب جدول أفعال `REST`، استجابة `POST` الناجحة يجب أن تحتوي على رابط (`URI`) المورد الجديد الذي تم إنشاؤه.

#### 📚 التطبيق
منطق التحقق نفسه (بنفس الـ `regex` تقريباً) سيُعاد استخدامه بالضبط في القسم القادم (`PUT`)، مع إضافة تحقق على `id` نفسه.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
افتراض أن `req.body.year` سيكون دائماً `number` جاهز للتحقق منه مباشرة برقم.

#### الفهم الصحيح ✅:
البيانات القادمة عبر `form` (سواء `JSON` أو `urlencoded`) قد تصل كنص (`string`)، لذلك الكود يستدعي `.toString()` صراحة قبل تطبيق الـ `regex`، لضمان أن الفحص يعمل بغض النظر عن النوع الأصلي للقيمة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Use the following route to handle the POSTed data... This will create a new movie and store it in the movies variable.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل شروط التحقق، توليد الـ `id`، والاستجابة النهائية
- ℹ️ إضافة من الدليل: مقارنة أسلوب توليد الـ `id` هنا بممارسات قواعد البيانات الحقيقية، وملاحظة حول ترويسة `Location` الفعلية

</details>

---

### 6. مسار PUT — تعديل أو إنشاء (Upsert)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن الآن؟
نبني الآن `route` التعديل، والذي يتشابه كثيراً مع `POST` لكن بفارق جوهري في التعامل مع الـ `id`.

#### ⬅️ الربط مع السابق
يعيد استخدام نفس منطق التحقق (`validation`) من قسم `POST`، مع إضافة تحقق على `req.params.id`، ومنطق بحث شبيه بقسم `GET`.

#### 💡 الفكرة الأساسية
**`PUT /movies/:id` يعدّل الفيلم إن وُجد بذلك الـ `id`، أو ينشئه بنفس الـ `id` إن لم يوجد — وهذا يسمى سلوك `upsert`.**

---

#### 💻 الكود
```javascript
router.put('/:id', function(req, res){
  // Check if all fields are provided and are valid:
  if(!req.body.name ||
     !req.body.year.toString().match(/^[0-9]{4}$/g) ||
     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
     !req.params.id.toString().match(/^[0-9]{3,}$/g)){

    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    // Gets us the index of movie with given id.
    var updateIndex = movies.map(function(movie){
      return movie.id;
    }).indexOf(parseInt(req.params.id));

    if(updateIndex === -1){
      // Movie not found, create new
      movies.push({
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating
      });
      res.json({message: "New movie created.", location: "/movies/" + req.params.id});
    } else {
      // Update existing movie
      movies[updateIndex] = {
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating
      };
      res.json({message: "Movie id " + req.params.id + " updated.",
                location: "/movies/" + req.params.id});
    }
  }
});
```

#### شرح كل سطر:
1. `router.put('/:id', ...)` → `route` لـ `PUT` يستقبل الـ `id` من الرابط مباشرة (بعكس `POST` اللي يولّده هو)
2. شرط التحقق الرباعي → نفس شروط `POST` بالضبط، بالإضافة إلى `!req.params.id.toString().match(/^[0-9]{3,}$/g)` للتأكد إن الـ `id` القادم في الرابط رقمي وبطول 3 خانات فأكثر
3. `movies.map(function(movie){return movie.id;})` → **(شرح زيادة للفهم)** تحوّل مصفوفة الأفلام (`objects`) إلى مصفوفة مسطّحة تحتوي فقط قيم الـ `id`، تمهيداً للبحث عن الموقع
4. `.indexOf(parseInt(req.params.id))` → تبحث عن *موقع* (`index`) ذلك الـ `id` داخل المصفوفة الجديدة، وتستخدم `parseInt` لتحويل `req.params.id` (نص) إلى رقم قبل المقارنة، لأن `indexOf` يستخدم مقارنة صارمة داخلياً
5. `if(updateIndex === -1)` → لو النتيجة `-1` فهذا يعني الـ `id` غير موجود إطلاقاً في المصفوفة
6. حالة عدم الوجود → `movies.push({...})` بنفس الـ `id` المُرسل في الرابط، مع رسالة **"New movie created"**
7. حالة الوجود → `movies[updateIndex] = {...}` استبدال العنصر بالكامل بموقعه، مع رسالة **"Movie id X updated"**

#### 📖 الشرح
هذا القسم يجسّد أهم فكرة نظرية من الجدول: **`PUT` هو `idempotent`**. يعني سواء أرسلت هذا الطلب مرة أو 10 مرات بنفس البيانات، النتيجة النهائية للفيلم بهذا الـ `id` واحدة (نفس القيم). قارن هذا بـ `POST` اللي لو كررته 10 مرات، ينشئ 10 أفلام مختلفة بمعرّفات مختلفة.

لاحظ الفرق التقني الدقيق بين البحث هنا (`map` + `indexOf`) والبحث في قسم `GET` (`filter`): هنا نحتاج **موقع (`index`)** العنصر تحديداً حتى نقدر نستبدله (`movies[updateIndex] = ...`)، بينما في `GET` كنا نحتاج **العنصر نفسه** فقط للعرض، لذا `filter` كانت كافية.

هنا أيضاً يظهر واضحاً الفرق الجوهري عن `POST`: في `POST` نحن اللي نولّد الـ `id` (`newId = last.id + 1`)، بينما في `PUT` الـ `id` **يأتي من الـ client عبر الرابط نفسه** — وهذا منطقي لأن الـ `client` هو من يحدد "أريد تعديل/إنشاء المورد رقم X تحديداً".

#### 💡 التشبيه:
> `PUT` يشبه ملء استمارة تعديل بيانات موظف برقم وظيفي محدد سلفاً: لو الموظف موجود بذلك الرقم، تُحدَّث بياناته. لو الرقم غير موجود بعد (موظف جديد جداً بس النظام أعطاه رقمه مسبقاً)، تُنشأ سجلّه لأول مرة بنفس الرقم. النتيجة النهائية بعد أي عدد من مرات التقديم بنفس البيانات: سجل واحد بذلك الرقم.
> **وجه الشبه:** الرقم الوظيفي المحدد سلفاً = `req.params.id` في `PUT`، والاستقرار عند التكرار = `idempotency`.

#### 🎯 الملخص السريع
- `PUT` يستقبل الـ `id` من الرابط (وليس يولّده)
- يتحقق من صحة كل الحقول *و* من صحة شكل الـ `id`
- `updateIndex === -1` → إنشاء فيلم جديد بنفس الـ `id` (سلوك `upsert`)
- `updateIndex !== -1` → استبدال الفيلم الموجود بالكامل
- `PUT` عملية `idempotent` — بعكس `POST`

> 🎯 **جملة الامتحان:** `movies.map(m => m.id).indexOf(value)` هي طريقة شائعة في `JavaScript` لإيجاد *موقع* عنصر داخل مصفوفة `objects` بناءً على قيمة أحد حقوله، وترجع `-1` إن لم يوجد.

#### 📚 التطبيق
نفس هذا النمط (`map` لاستخراج المعرفات ثم `indexOf`) سيُستخدم في `DELETE` القادم لإيجاد موقع الفيلم المطلوب حذفه.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو أرسلت `PUT /movies/999` (وهذا `id` غير موجود إطلاقاً)، ماذا سيحدث بالضبط؟
> **لماذا هذا مهم؟** لاختبار فهمك لسلوك `upsert`: الإجابة الصحيحة هي أن الكود سينشئ فيلماً جديداً بـ `id: "999"` (كنص، لأنه قادم من `req.params`) بدل رفض الطلب — وهذا سلوك متعمد وليس خطأ.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد أن `PUT` على `id` غير موجود يجب أن يرجع دائماً خطأ `404`، مثل `GET`.

#### الفهم الصحيح ✅:
حسب الجدول النظري في بداية المحاضرة، `PUT /movies/1234` **"يعدّل الفيلم 1234 (وينشئه إن لم يكن موجوداً)"** — يعني سلوك `upsert` هو المتوقع أصلاً وليس خطأ. الفرق عن `GET` هو أن `GET` عملية قراءة فقط فلا معنى لإنشاء شيء، بينما `PUT` عملية كتابة يُسمح لها بالإنشاء.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The PUT route is almost the same as the POST route. We will be specifying the id for the object that'll be updated/created... This route will perform the function specified in the above table. It will update the object with new details if it exists. If it doesn't exist, it will create a new object.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل شروط التحقق، منطق `map`+`indexOf`، وحالتي الإنشاء والتحديث
- ℹ️ إضافة من الدليل: تشبيه الاستمارة الوظيفية، وربط صريح لمفهوم `idempotency` بالكود الفعلي

</details>

---

### 7. مسار DELETE — حذف مورد

<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_6"} -->

#### 📍 أين نحن الآن؟
آخر عملية من عمليات الـ `CRUD` الأربعة: الحذف.

#### ⬅️ الربط مع السابق
يستخدم نفس نمط `map` + `indexOf` من قسم `PUT` لإيجاد موقع الفيلم.

#### 💡 الفكرة الأساسية
**`DELETE /movies/:id` يبحث عن الفيلم بموقعه ويحذفه عبر `splice` إن وُجد.**

---

#### 💻 الكود
```javascript
router.delete('/:id', function(req, res){
  var removeIndex = movies.map(function(movie){
    return movie.id;
  }).indexOf(req.params.id); // Gets us the index of movie with given id.

  if(removeIndex === -1){
    res.json({message: "Not found"});
  } else {
    movies.splice(removeIndex, 1);
    res.send({message: "Movie id " + req.params.id + " removed."});
  }
});
```

#### شرح كل سطر:
1. `router.delete('/:id', ...)` → `route` يستجيب لطلبات `DELETE` على `/movies/:id`
2. `movies.map(...).indexOf(req.params.id)` → نفس فكرة `PUT`، لكن **بدون** `parseInt` هنا حول `req.params.id`
3. `if(removeIndex === -1)` → لو الفيلم غير موجود
4. `res.json({message: "Not found"});` → **(شرح زيادة للفهم)** رسالة توضح عدم الوجود — لاحظ أن الكود هنا لا يضبط `res.status(404)` صراحة كما فعل في `GET`، فتبقى الاستجابة بـ `status 200` الافتراضي رغم أن الفيلم لم يوجد
5. `movies.splice(removeIndex, 1);` → حذف عنصر واحد من المصفوفة بدءاً من `removeIndex`
6. `res.send({message: ...});` → إرسال رسالة نجاح الحذف

#### 📖 الشرح
لاحظ نقطة دقيقة جداً هنا: عكس `PUT` اللي استخدم `parseInt(req.params.id)` قبل `indexOf`، هذا الكود يستخدم `req.params.id` **كما هو (نص)** مباشرة في `indexOf(req.params.id)`. بما أن `indexOf` تستخدم مقارنة صارمة (`===`) داخلياً، وبما أن قيم `id` في المصفوفة أحياناً تكون أرقاماً (الأفلام الأصلية) وأحياناً نصوصاً (الأفلام المُنشأة عبر `PUT`، لأن الكود هناك خزّن `id: req.params.id` كنص)، فهذا قد يسبب سلوكاً غير متوقع عند محاولة حذف أحد الأفلام الأربعة الأصلية (اللي `id` تبعها `number`) — لأن `"101" === 101` تكون `false`.

هذه نقطة دقيقة تستحق الانتباه عند القراءة النقدية للكود، لكنها غير مذكورة صراحة كخطأ في نص المحاضرة الأصلي، لذلك نذكرها هنا كملاحظة إضافية للفهم العميق فقط.

#### 💡 التشبيه:
> `movies.splice(removeIndex, 1)` يشبه إزالة كتاب واحد بالضبط من رف مرتب بمعرفة موقعه بالضبط (الرف رقم كذا)، بدل البحث عن الكتاب بالاسم في كل مرة.
> **وجه الشبه:** رقم الموقع على الرف = `removeIndex`، والكتاب المُزال = الفيلم المحذوف.

#### 🎯 الملخص السريع
- يجد موقع الفيلم عبر `map` + `indexOf` (بدون `parseInt` هنا، بعكس `PUT`)
- `removeIndex === -1` → رسالة `"Not found"` (بدون `status 404` صريح في هذا الكود تحديداً)
- وإلا → `movies.splice(removeIndex, 1)` يحذف الفيلم فعلياً من المصفوفة

> 🎯 **جملة الامتحان:** `Array.prototype.splice(index, count)` في `JavaScript` تحذف `count` من العناصر بدءاً من الموقع `index`، وتُعدّل المصفوفة الأصلية مباشرة (`mutates in place`).

#### 📚 التطبيق
هذا يُكمل دورة الـ `CRUD` الأربعة الكاملة، ويجهز الملف النهائي `movies.js` الذي يُعرض في القسم التالي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
افتراض أن `DELETE /movies/101` (على فيلم أصلي مُعرَّفه رقم من النوع `number`) سيعمل بنفس ضمان النجاح مثل حذف فيلم أُنشئ حديثاً عبر `PUT` (مُعرَّفه نص).

#### الفهم الصحيح ✅:
بسبب استخدام `indexOf(req.params.id)` بدون تحويل نوع، قد تختلف نتيجة المقارنة حسب نوع الـ `id` المخزّن أصلاً (`number` مقابل `string`) — وهذا يوضح أهمية توحيد أنواع البيانات (`data types`) عند العمل بمصفوفة بسيطة بدل قاعدة بيانات تفرض نوعاً ثابتاً للعمود.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95% — ملاحظة نوع البيانات في indexOf ليست موضحة صراحة في المحاضرة الأصلية)</summary>

**النص الأصلي يقول:**
> Use the following code to create a delete route... Check the route in the same way as we checked the other routes. On successful deletion (for example id 105), you will get the following output.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: منطق البحث والحذف، وأمر `curl` للاختبار
- ⚠️ لم يُشرح بالكامل: المحاضرة لا تذكر صراحة تعارض النوع (`string` مقابل `number`) في `indexOf` بين `DELETE` و`PUT`
- ℹ️ إضافة من الدليل: ملاحظة نوع البيانات هذه، وتشبيه الرف المرتب

</details>

---

### 8. الملف النهائي movies.js الكامل

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 📍 أين نحن الآن؟
آخر قسم — تجميع كل الأقسام السابقة في ملف `movies.js` واحد جاهز للتشغيل.

#### ⬅️ الربط مع السابق
هذا الملف هو حرفياً دمج الأقسام 3 إلى 7 مرتبة كما ظهرت.

#### 💡 الفكرة الأساسية
**ملف `movies.js` النهائي يحتوي كل عمليات الـ `CRUD` الأربعة على مورد الأفلام، مُصدَّراً كـ `Router` واحد.**

---

#### 💻 الكود
```javascript
var express = require('express');
var router = express.Router();

var movies = [
  {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
  {id: 102, name: "Inception", year: 2010, rating: 8.7},
  {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
  {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];

router.get('/', function(req, res){
  res.json(movies);
});

router.get('/:id([0-9]{3,})', function(req, res){
  var currMovie = movies.filter(function(movie){
    if(movie.id == req.params.id){
      return true;
    }
  });

  if(currMovie.length == 1){
    res.json(currMovie[0]);
  } else {
    res.status(404);
    res.json({message: "Not Found"});
  }
});

router.post('/', function(req, res){
  if(!req.body.name ||
     !req.body.year.toString().match(/^[0-9]{4}$/g) ||
     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var newId = movies[movies.length-1].id+1;
    movies.push({
      id: newId, name: req.body.name, year: req.body.year, rating: req.body.rating
    });
    res.json({message: "New movie created.", location: "/movies/" + newId});
  }
});

router.put('/:id', function(req, res){
  if(!req.body.name ||
     !req.body.year.toString().match(/^[0-9]{4}$/g) ||
     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
     !req.params.id.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var updateIndex = movies.map(function(movie){
      return movie.id;
    }).indexOf(parseInt(req.params.id));

    if(updateIndex === -1){
      movies.push({
        id: req.params.id, name: req.body.name, year: req.body.year, rating: req.body.rating
      });
      res.json({message: "New movie created.", location: "/movies/" + req.params.id});
    } else {
      movies[updateIndex] = {
        id: req.params.id, name: req.body.name, year: req.body.year, rating: req.body.rating
      };
      res.json({message: "Movie id " + req.params.id + " updated.",
                location: "/movies/" + req.params.id});
    }
  }
});

router.delete('/:id', function(req, res){
  var removeIndex = movies.map(function(movie){
    return movie.id;
  }).indexOf(req.params.id);

  if(removeIndex === -1){
    res.json({message: "Not found"});
  } else {
    movies.splice(removeIndex, 1);
    res.send({message: "Movie id " + req.params.id + " removed."});
  }
});

module.exports = router;
```

#### شرح كل سطر:
1. هذا الملف مطابق تماماً لتجميع الأقسام 3–7 — لا يوجد منطق جديد هنا لم يُشرح مسبقاً
2. ترتيب تعريف الـ `routes` (`get`, `get/:id`, `post`, `put`, `delete`) لا يؤثر على وظيفتها لأنها تستخدم أفعال `HTTP` مختلفة، لكنه يتبع نفس ترتيب عرضها في المحاضرة
3. `module.exports = router;` في السطر الأخير هو ما يجعل هذا الكائن الكامل (بكل مساراته الخمسة) قابلاً للاستيراد في `index.js`

#### 📖 الشرح
هذا الملف يمثّل تطبيقاً كاملاً وعملياً لجدول الأفعال الأربعة الذي بدأنا به المحاضرة: كل سطر في ذلك الجدول النظري أصبح الآن `route` حقيقي يعمل. هذا هو جوهر الدرس بأكمله: **الانتقال من مبدأ معماري نظري (`REST`) إلى كود `Express` فعلي منظم**.

#### 💡 التشبيه:
> هذا الملف مثل مخطط بناء مكتمل بعد ما رسمت كل غرفة على حدة (القراءة، الإنشاء، التعديل، الحذف) — الآن تجمعهم في مخطط واحد جاهز للتنفيذ.
> **وجه الشبه:** كل `route` منفصل = غرفة، والملف الكامل = المخطط النهائي للمبنى.

#### 🎯 الملخص السريع
- ملف واحد يحتوي 5 `routes`: `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`
- كل ذلك يُصدَّر ككائن `Router` واحد عبر `module.exports`
- هذا الملف يُستورد بالكامل في `index.js` ويُركَّب على `/movies`

> 🎯 **جملة الامتحان:** ملف `Router` واحد في `Express` يمكن أن يحتوي عدة مسارات بأفعال `HTTP` مختلفة على نفس المسار الأساسي (`/` أو `/:id`)، طالما اختلف الفعل (`GET`, `POST`, `PUT`, `DELETE`) المستخدم في كل تعريف.

#### 📚 التطبيق
هذا هو الأساس الذي تُبنى عليه أي `API` لاحق: نفس البنية (`Router` + عمليات `CRUD` + `validation` + `status codes` صحيحة) تنطبق على أي مورد آخر (`users`, `orders`, ...) وليس الأفلام فقط.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Finally, our movies.js file will look like the following... This completes our REST API. Now you can create much more complex applications using this simple architectural style and Express.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الملف الكامل بكل مساراته الخمسة
- ℹ️ إضافة من الدليل: تشبيه المخطط المعماري، وربط ختامي بالجدول النظري في بداية المحاضرة

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium / hard

### السؤال 1 (medium)
ما هو `REST` بالضبط، ومن قدّمه؟

أ) بروتوكول رسمي جزء من مواصفات `HTTP`
ب) أسلوب معماري قدّمه `Roy Fielding` سنة 2000
ج) مكتبة `JavaScript` تُستخدم مع `Express`
د) معيار دولي ملزم لبناء الـ `APIs`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `REST` (`Representational State Transfer`) هو أسلوب معماري (`architectural style`) قدّمه `Roy Fielding` سنة 2000 ضمن أطروحته، وليس معياراً رسمياً ملزماً
- ❌ **الخيار أ:** خلط شائع بين `REST` و`HTTP` — `HTTP 1.1` صُمم متأثراً بمبادئ `REST`، لكن `REST` نفسه ليس جزءاً من مواصفات `HTTP` الرسمية
- ❌ **الخيار ج:** خلط بين `REST` (المفهوم المعماري) و`Express` (الأداة/الإطار التقني المستخدم لتطبيقه)
- ❌ **الخيار د:** لا يوجد جهة رسمية تفرض `REST` كمعيار ملزم؛ هو مبادئ إرشادية يتبعها المطورون طوعاً

---

### السؤال 2 (medium)
حسب جدول الأفعال في المحاضرة، ما الفعل والرابط الصحيحان لحذف الفيلم رقم 1234؟

أ) `DELETE /movies`
ب) `POST /movies/1234`
ج) `DELETE /movies/1234`
د) `PUT /movies/1234`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `DELETE /movies/1234` هو الفعل والرابط الصحيحان بالضبط حسب الجدول — يحدد المورد بدقة عبر الـ `id`
- ❌ **الخيار أ:** `DELETE /movies` (بدون `id`) غير صالح حسب الجدول لأنه لا يحدد أي مورد بالضبط — الخطأ الشائع هنا هو الخلط مع فكرة "حذف الكل"
- ❌ **الخيار ب:** `POST` تُستخدم للإنشاء وليس الحذف — الخطأ الشائع هنا هو نسيان أن كل فعل له غرض محدد
- ❌ **الخيار د:** `PUT` تُستخدم للتعديل أو الإنشاء (`upsert`)، وليس الحذف — الخطأ الشائع هنا هو الخلط بين `PUT` و`DELETE` كونهما يستهدفان نفس شكل الرابط `/movies/:id`

---

### السؤال 3 (hard)
ما الفرق الجوهري بين `POST /movies` و`PUT /movies/1234` من ناحية توليد الـ `id`؟

أ) كلاهما يولّد الـ `id` تلقائياً بنفس الطريقة
ب) `POST` يولّد `id` جديداً؛ `PUT` يستقبل الـ `id` من الـ client عبر الرابط
ج) `PUT` يولّد `id` جديداً؛ `POST` يستقبله من الـ client
د) لا فرق، الاثنان يتطلبان إرسال الـ `id` في جسم الطلب

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** في `POST`، الكود يحسب `newId` تلقائياً (`movies[movies.length-1].id+1`)؛ بينما في `PUT`، الـ `id` يأتي من `req.params.id` أي من الرابط الذي يحدده الـ `client`
- ❌ **الخيار أ:** يخالف الكود مباشرة — طريقتا توليد الـ `id` مختلفتان تماماً بين المسارين
- ❌ **الخيار ج:** عكس الحقيقة تماماً — الخطأ الشائع هنا هو الخلط بين المسارين لتشابه بنيتهما العامة
- ❌ **الخيار د:** `POST` لا يتطلب إرسال `id` في الجسم إطلاقاً — فقط `name`, `year`, `rating`

---

### السؤال 4 (medium)
ماذا تعني خاصية `Idempotent` في سياق `HTTP methods`؟

أ) الطلب لا يغيّر أي بيانات على السيرفر إطلاقاً
ب) تكرار نفس الطلب عدة مرات يعطي نفس النتيجة النهائية كأنه نُفّذ مرة واحدة
ج) الطلب يمكن تخزينه مؤقتاً (`cache`)
د) الطلب يتطلب مصادقة (`authentication`)

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا هو التعريف الدقيق لـ `idempotency` — النتيجة النهائية ثابتة بغض النظر عن عدد مرات التكرار، مثل `DELETE` و`PUT`
- ❌ **الخيار أ:** هذا تعريف `Safe` وليس `Idempotent` — الخطأ الشائع هنا هو الخلط بين المصطلحين، فـ `GET` مثلاً `Safe` *و* `Idempotent` معاً، لكن ليسا نفس الشيء
- ❌ **الخيار ج:** هذا تعريف `Cacheable`، وهي خاصية منفصلة تماماً عن `Idempotency`
- ❌ **الخيار د:** المصادقة (`authentication`) غير مذكورة إطلاقاً في المحاضرة ولا علاقة لها بمفهوم `Idempotency`

---

### السؤال 5 (hard)
في كود `router.get('/:id([0-9]{3,})', ...)` — ماذا يحدث بالضبط لو طلب الـ `client` الرابط `/movies/ab`؟

أ) يدخل الدالة، ثم `filter` لا يجد شيئاً، فيرجّع `404`
ب) `Express` نفسه لا يطابق هذا الرابط مع هذا الـ `route` أصلاً بسبب قيد الـ `regex`، فيرجّع خطأ `Cannot GET` بدل الدخول للدالة
ج) يرجّع كل الأفلام لأن الفلترة تفشل بصمت
د) يسبب استثناءً (`exception`) يوقف السيرفر

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** قيد الـ `regex` `[0-9]{3,}` يُطبَّق على مستوى مطابقة المسار نفسه، فأي قيمة غير رقمية مثل `"ab"` لن تطابق هذا الـ `route` من الأساس، وبالتالي لا تصل الدالة للتنفيذ إطلاقاً
- ❌ **الخيار أ:** الخطأ الشائع هنا هو الاعتقاد أن التحقق يحصل *داخل* الدالة، بينما هو فعلياً يحصل *قبل* الوصول للدالة عبر قيد الـ `route` نفسه
- ❌ **الخيار ج:** لا علاقة لهذا بالسلوك الفعلي؛ الطلب ببساطة لن يُطابَق مع هذا الـ `route` نهائياً
- ❌ **الخيار د:** لا يوجد أي استثناء هنا — `Express` يتعامل مع عدم التطابق بهدوء عبر إرجاع خطأ "غير موجود"، ولا يوقف تشغيل السيرفر

---

### السؤال 6 (medium)
ما ناتج `res.status(404); res.json({message: "Not Found"});` بالنسبة للـ `client`؟

أ) استجابة `200 OK` مع رسالة "Not Found" في الجسم
ب) استجابة `404 Not Found` مع جسم `JSON` يحتوي رسالة توضيحية
ج) استجابة فارغة بدون أي محتوى
د) خطأ من طرف السيرفر (`500`)

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `res.status(404)` يضبط رمز الحالة إلى `404`، ثم `res.json(...)` يرسل جسماً يوضح السبب — هذا هو النمط الصحيح لاستجابات الخطأ الواضحة في `REST APIs`
- ❌ **الخيار أ:** الخطأ الشائع هنا هو تجاهل أن `res.status()` تُستدعى صراحة قبل الإرسال، فتُغيّر رمز الحالة الفعلي عن الافتراضي `200`
- ❌ **الخيار ج:** الجسم ليس فارغاً؛ `res.json({message: "Not Found"})` يرسل محتوى فعلياً
- ❌ **الخيار د:** `404` هو خطأ من طرف العميل (المورد غير موجود) وليس خطأ سيرفر (`500` تكون لمشاكل داخلية في السيرفر نفسه)

---

### السؤال 7 (hard)
ما الناتج لو غيّرنا شرط التحقق في `POST` من `!req.body.year.toString().match(/^[0-9]{4}$/g)` إلى `!req.body.year.toString().match(/^[0-9]{1,4}$/g)`؟

أ) لا يتغير شيء، لأن `{1,4}` و`{4}` متطابقان تماماً
ب) الشرط يصبح أكثر تساهلاً — سيقبل الآن سنوات مكتوبة برقم واحد أو رقمين أو ثلاثة أرقام أيضاً، وليس فقط 4 أرقام كاملة
ج) الشرط سيرفض كل السنوات نهائياً
د) سيتسبب في خطأ `syntax error` في الـ `regex`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `{1,4}` تعني "من رقم واحد إلى 4 أرقام"، بينما `{4}` تعني "بالضبط 4 أرقام" — تغيير القيد يجعل التحقق أضعف ويسمح بقيم مثل `"5"` أو `"99"` كسنوات، وهذا غير منطقي لسنة ميلاد فيلم
- ❌ **الخيار أ:** الخطأ الشائع هنا هو عدم التمييز بين صيغتي التكرار في الـ `regex`؛ `{4}` و`{1,4}` مختلفتان جذرياً في المعنى
- ❌ **الخيار ج:** عكس الصحيح تماماً — التعديل يجعل الشرط أكثر قبولاً وليس رفضاً
- ❌ **الخيار د:** الصيغة `{1,4}` صيغة `regex` صحيحة تماماً في `JavaScript`، لا يوجد خطأ نحوي هنا

---

### السؤال 8 (medium)
أي من التالي **ليس** من أفعال `HTTP` الأربعة الأساسية المذكورة في جدول المحاضرة؟

أ) `GET`
ب) `PATCH`
ج) `POST`
د) `DELETE`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `PATCH` غير مذكور إطلاقاً في جدول المحاضرة؛ الجدول يقتصر على `GET`, `POST`, `PUT`, `DELETE` فقط
- ❌ **الخيار أ:** `GET` مذكور صراحة في الجدول لعمليتي جلب كل الأفلام وجلب فيلم واحد
- ❌ **الخيار ج:** `POST` مذكور صراحة في الجدول لعملية الإنشاء
- ❌ **الخيار د:** `DELETE` مذكور صراحة في الجدول لعملية الحذف — الخطأ الشائع هنا هو افتراض أن كل الأفعال المعروفة في `HTTP` مذكورة، بينما المحاضرة ركّزت على أربعة فقط

---

### السؤال 9 (hard)
لماذا يستخدم كود `PUT` الدالة `parseInt(req.params.id)` قبل `indexOf`، بينما كود `DELETE` لا يستخدمها؟

أ) لا فرق فعلياً، كلاهما يعمل بنفس الطريقة تماماً
ب) لأن `indexOf` تستخدم مقارنة صارمة (`===`)، و`parseInt` في `PUT` يضمن مطابقة الأنواع مع قيم `id` الرقمية الأصلية، بينما `DELETE` (كما هو مكتوب في المحاضرة) لا يقوم بهذا التحويل
ج) لأن `DELETE` لا يحتاج مقارنة أنواع إطلاقاً
د) لأن `PUT` يستخدم `filter` بدل `indexOf`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا فرق دقيق فعلي بين الكودين كما وردا في المحاضرة — `PUT` يحوّل `req.params.id` (نص) إلى رقم عبر `parseInt` قبل المقارنة مع `id` الأفلام الأصلية (أرقام)، بينما `DELETE` يقارن النص مباشرة بدون تحويل
- ❌ **الخيار أ:** الخطأ الشائع هنا هو افتراض تطابق الكودين لأنهما يستخدمان نفس النمط العام (`map` + `indexOf`)، متجاهلاً التفصيل الدقيق في التحويل
- ❌ **الخيار ج:** `DELETE` أيضاً يستخدم `indexOf` التي تحتاج تطابق أنواع، لكنه ببساطة لا يحوّل النوع صراحة — هذا لا يعني أنه "لا يحتاج" ذلك منطقياً
- ❌ **الخيار د:** كلا الكودين (`PUT` و`DELETE`) يستخدمان `map` ثم `indexOf`، وليس `filter`

---

### السؤال 10 (medium)
ما الغرض من `express.Router()`؟

أ) الاتصال بقاعدة بيانات
ب) إنشاء كائن مسارات مستقل وقابل للتصدير، يمكن تركيبه لاحقاً على مسار أساسي في التطبيق الرئيسي
ج) تحويل بيانات الطلب من نص خام إلى `object`
د) تشغيل السيرفر والاستماع على منفذ معين

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `express.Router()` ينشئ كائناً مستقلاً يجمّع مسارات مرتبطة، ويُصدَّر عبر `module.exports` ليُركَّب لاحقاً في `index.js` عبر `app.use(path, router)`
- ❌ **الخيار أ:** لا علاقة لـ `Router` بقواعد البيانات إطلاقاً — المحاضرة استخدمت مصفوفة بالذاكرة بدل قاعدة بيانات
- ❌ **الخيار ج:** هذا دور `bodyParser`، وليس `Router` — الخطأ الشائع هنا هو الخلط بين وظائف `middleware` المختلفة
- ❌ **الخيار د:** هذا دور `app.listen()`، وهي دالة على كائن `app` الرئيسي وليس على الـ `Router`

---

### السؤال 11 (medium)
ما نوع البيانات الذي تكون عليه قيمة `req.params.id` دائماً في `Express`؟

أ) `number`
ب) `string`
ج) `boolean`
د) يعتمد على نوع القيمة المكتوبة في الرابط

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** كل قيم `req.params` في `Express` تُقرأ كنصوص (`string`) دائماً، بغض النظر عن كون الجزء المطابق في الرابط أرقاماً أو حروفاً
- ❌ **الخيار أ:** هذا خطأ شائع جداً — حتى لو كتب المستخدم أرقاماً في الرابط، `Express` يقرأها كنص، ولهذا احتاج الكود لاستخدام `parseInt` أو `==` في أماكن متعددة
- ❌ **الخيار ج:** لا علاقة، `req.params` دائماً نصوص وليس قيماً منطقية
- ❌ **الخيار د:** الخطأ الشائع هنا هو افتراض أن `Express` "يخمّن" النوع المناسب تلقائياً — هذا غير صحيح، السلوك ثابت دائماً كنص

---

### السؤال 12 (hard)
تتبع تنفيذ: إذا كانت مصفوفة الأفلام تحتوي فقط على الفيلمين `{id:101,...}` و`{id:104,...}`، ما قيمة `newId` عند تنفيذ `POST` جديد؟

أ) `102`
ب) `103`
ج) `105`
د) `100`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** الكود يحسب `newId = movies[movies.length-1].id + 1`، أي `id` **آخر عنصر في المصفوفة** (وليس أكبر `id`) زائد 1؛ آخر عنصر هو `{id:104}` فتكون `newId = 104 + 1 = 105`
- ❌ **الخيار أ:** الخطأ الشائع هنا هو افتراض أن الكود يبحث عن أصغر فراغ متاح في التسلسل، بينما هو فقط ينظر لآخر عنصر في المصفوفة
- ❌ **الخيار ب:** نفس الخطأ الشائع — لا علاقة للعدد الكلي للعناصر (2) بحساب `newId`؛ الحساب يعتمد فقط على `id` آخر عنصر
- ❌ **الخيار د:** لا يوجد أي منطق في الكود يطرح أو يبدأ من `100`؛ الحساب اعتماداً فقط على آخر عنصر زائد واحد

---

### السؤال 13 (medium)
"Which is NOT..." — أي من التالي **ليس** جزءاً من عملية التحقق (`validation`) في مسار `POST`؟

أ) التحقق من وجود `req.body.name`
ب) التحقق من أن `req.body.year` بصيغة 4 أرقام
ج) التحقق من أن `req.body.rating` رقم عشري بخانة واحدة قبل وبعد الفاصلة
د) التحقق من أن `req.body.id` غير مستخدم مسبقاً

**الإجابة الصحيحة: د**

**التعليل:**
- ✅ **الخيار د:** لا يوجد `req.body.id` أصلاً في `POST` — الكود يولّد `newId` تلقائياً ولا يطلب من الـ `client` إرسال `id` في الجسم إطلاقاً، فلا معنى للتحقق من "استخدامه مسبقاً"
- ❌ **الخيار أ:** هذا فعلاً أول شرط في كود `POST`
- ❌ **الخيار ب:** هذا فعلاً الشرط الثاني (`regex` على `year`)
- ❌ **الخيار ج:** هذا فعلاً الشرط الثالث (`regex` على `rating`) — الخطأ الشائع هنا هو نسيان أن كل هذه الشروط الثلاثة موجودة فعلياً في الكود بينما التحقق من `id` غير موجود إطلاقاً

---

### السؤال 14 (hard)
"Which is NOT..." — أي مما يلي **لا** يصف بشكل صحيح خاصية `Safe` لطلبات `HTTP`؟

أ) `GET /movies` مثال على طلب `Safe`
ب) الطلب `Safe` لا يغيّر أي بيانات على السيرفر
ج) `POST /movies` مثال على طلب `Safe`
د) طلبات `Safe` غالباً `Cacheable` أيضاً

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `POST /movies` يُنشئ بيانات جديدة فعلياً (يضيف فيلماً)، فهو بالتعريف **ليس** `Safe` — هذا هو الخيار الخاطئ المطلوب في هذا السؤال
- ❌ **الخيار أ:** وصف صحيح — `GET /movies` مذكور صراحة في الجدول كـ `Safe`
- ❌ **الخيار ب:** تعريف صحيح تماماً لـ `Safe`
- ❌ **الخيار د:** صحيح — الجدول يربط `GET` بكونها `Safe` و`Cacheable` معاً في نفس الوقت

---

### السؤال 15 (hard)
"Which is NOT..." — أي مما يلي **غير صحيح** بخصوص `DELETE` أو `PUT` على `/movies` (بدون تحديد `id`)؟

أ) هذا السيناريو مذكور في جدول المحاضرة كـ "غير صالح" (`Invalid`)
ب) السبب هو عدم تحديد أي مورد بعينه للعملية
ج) هذا نمط شائع ومقبول في تصميم `REST APIs` الجيدة
د) `DELETE` و`PUT` يجب أن يحددا دائماً المورد الذي يعملان عليه

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** هذا هو الوصف الخاطئ (المطلوب) — الجدول يصف هذا السيناريو صراحة بأنه **غير صالح**، وليس نمطاً مقبولاً في `REST` الجيد
- ❌ **الخيار أ:** صحيح تماماً — مذكور حرفياً في الجدول
- ❌ **الخيار ب:** هذا هو السبب المنطقي الصحيح وراء عدم الصلاحية
- ❌ **الخيار د:** هذا استنتاج صحيح من مبدأ `REST` نفسه — الخطأ الشائع هنا هو الخلط بين "غير صالح" و"مسموح لكن غير مستحسن"، بينما المحاضرة تصفه بوضوح كـ `Invalid`

---

### السؤال 16 (medium)
ما الناتج لو غيّرنا `movies.splice(removeIndex, 1)` في `DELETE` إلى `movies.splice(removeIndex, 2)`؟

أ) لا يتغير شيء، النتيجة واحدة
ب) سيُحذف عنصران بدلاً من واحد بدءاً من `removeIndex` (الفيلم المطلوب حذفه بالإضافة إلى الفيلم الذي يليه في المصفوفة)
ج) سيرمي الكود خطأً لأن `2` قيمة غير صالحة
د) سيتم حذف كل المصفوفة بالكامل

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** الوسيط الثاني في `splice(index, count)` يحدد *عدد* العناصر المُراد حذفها بدءاً من `index` — تغييره من `1` إلى `2` يعني حذف عنصرين متتاليين بدل واحد فقط، وهذا يحذف فيلماً لم يطلبه الـ `client` أصلاً
- ❌ **الخيار أ:** الخطأ الشائع هنا هو الاعتقاد أن الوسيط الثاني ثابت أو غير مؤثر؛ هو فعلياً يتحكم مباشرة بعدد العناصر المحذوفة
- ❌ **الخيار ج:** `2` رقم صحيح تماماً كوسيط لـ `splice`، ولا يسبب أي خطأ تنفيذي
- ❌ **الخيار د:** لن تُحذف المصفوفة بالكامل، فقط عنصران بدءاً من الموقع المحدد (ما لم يكن قريباً من نهاية مصفوفة صغيرة جداً)

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 REST — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `REST` | أسلوب معماري لتسمية وهيكلة الـ `APIs`، قدّمه `Roy Fielding` سنة 2000 |
| `Safe` | الطلب لا يغيّر أي بيانات على السيرفر (مثل `GET`) |
| `Idempotent` | تكرار الطلب عدة مرات يعطي نفس النتيجة النهائية كأنه نُفّذ مرة واحدة (`PUT`, `DELETE`) |
| `Cacheable` | يمكن تخزين استجابة الطلب مؤقتاً وإعادة استخدامها (`GET`) |
| `Router` | كائن `Express` مستقل يجمّع مجموعة `routes` قابلة للتركيب على مسار أساسي |
| `Upsert` | سلوك يدمج التحديث والإنشاء معاً — إن وُجد المورد يُحدَّث، وإلا يُنشأ (سلوك `PUT`) |

### 🔑 REST — مرجع الأفعال السريع
| الفعل | المسار | الوظيفة | مثال |
| --- | --- | --- | --- |
| `GET` | `/movies` | جلب كل الأفلام | `curl -X GET localhost:3000/movies` |
| `GET` | `/movies/:id` | جلب فيلم واحد | `curl -X GET localhost:3000/movies/101` |
| `POST` | `/movies` | إنشاء فيلم جديد | `curl -X POST --data "..." localhost:3000/movies` |
| `PUT` | `/movies/:id` | تعديل أو إنشاء فيلم بمعرّف محدد | `curl -X PUT --data "..." localhost:3000/movies/101` |
| `DELETE` | `/movies/:id` | حذف فيلم | `curl -X DELETE localhost:3000/movies/105` |

### 🔑 Express — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `req.params` | قيم مستخرجة من الرابط نفسه (مثل `:id`)، دائماً `string` |
| `req.body` | بيانات جسم الطلب، متاحة فقط بعد `middleware` مثل `body-parser` |
| `res.json()` | يرسل استجابة بصيغة `JSON` مع ضبط ترويسة `Content-Type` تلقائياً |
| `res.status()` | يضبط رمز حالة `HTTP` للاستجابة (يجب استدعاؤها قبل الإرسال) |
| `module.exports` | يصدّر قيمة (هنا `router`) لتصبح قابلة للاستيراد بـ `require` في ملف آخر |

### 🔑 Express — مرجع الأوامر السريعة
| الأمر | ماذا يفعل | مثال |
| --- | --- | --- |
| `express.Router()` | إنشاء كائن `Router` مستقل | `var router = express.Router();` |
| `app.use(path, router)` | تركيب `Router` على مسار أساسي | `app.use('/movies', movies);` |
| `router.get(path, fn)` | تسجيل مسار `GET` | `router.get('/', fn)` |
| `router.post(path, fn)` | تسجيل مسار `POST` | `router.post('/', fn)` |
| `router.put(path, fn)` | تسجيل مسار `PUT` | `router.put('/:id', fn)` |
| `router.delete(path, fn)` | تسجيل مسار `DELETE` | `router.delete('/:id', fn)` |
| `app.listen(port)` | تشغيل السيرفر على منفذ محدد | `app.listen(3000);` |

### 🔑 جداول المقارنة السريعة
| المعيار | `POST` | `PUT` |
| --- | --- | --- |
| مصدر الـ `id` | يولّده السيرفر تلقائياً | يحدده الـ `client` عبر الرابط |
| `Idempotent`؟ | لا (كل تكرار ينشئ مورداً جديداً) | نعم (تكرار بنفس البيانات = نفس النتيجة) |
| السلوك عند التكرار | ينشئ عدة موارد | يحدّث نفس المورد |
| السلوك لو المورد غير موجود | دائماً ينشئ (هذا وظيفته الأساسية) | ينشئه أيضاً (`upsert`) |

### 🔑 مرجع HTTP Methods + Status Codes
| Method | الاستخدام | Success Code | Error Code |
| --- | --- | --- | --- |
| `GET` | قراءة مورد | `200 OK` | `404 Not Found` |
| `POST` | إنشاء مورد جديد | `200 OK` (حسب كود المحاضرة) | `400 Bad Request` |
| `PUT` | تحديث/إنشاء مورد | `200 OK` | `400 Bad Request` |
| `DELETE` | حذف مورد | `200 OK` (`res.send`) | — (المحاضرة لا تضبط `404` صراحة هنا) |

### 🔑 القواعد الذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | الرابط (`URI`) يمثّل المورد، وفعل `HTTP` يمثّل العملية — لا تكرر الفعل داخل اسم الرابط |
| 2 | `DELETE`/`PUT` بدون تحديد مورد (`/movies` فقط) غير صالحين دائماً |
| 3 | `req.params` و `req.body` تكون قيمها دائماً نصوصاً (`string`) ما لم تُحوَّل يدوياً |
| 4 | تحقق دائماً من صحة المدخلات *قبل* أي تعديل على البيانات |
| 5 | `PUT` عملية `idempotent` وتدعم سلوك `upsert`؛ `POST` ليست كذلك |

### 🔑 الخطوات السريعة
#### بناء route جديد في Express Router
```algorithm
1 | استقبل الطلب | router.method(path, fn) | تحديد الفعل والمسار
2 | تحقق من البيانات | if/regex على req.body و req.params | رفض البيانات غير الصحيحة (400)
3 | نفّذ العملية | array.push / filter / splice | تعديل أو قراءة البيانات
4 | أرسل الاستجابة | res.status() + res.json() | إعلام الـ client بالنتيجة
```

---

## الجزء الخامس: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما هو `REST`؟
**A:** أسلوب معماري لبناء الـ `APIs` يمثّل فيه الرابط موردًا وفعل `HTTP` عملية على ذلك المورد، قدّمه `Roy Fielding` سنة 2000.

### البطاقة 2
**Q2:** ما الفرق بين `Safe` و`Idempotent`؟
**A:** `Safe` تعني الطلب لا يغيّر بيانات إطلاقاً (مثل `GET`)، بينما `Idempotent` تعني تكرار الطلب يعطي نفس النتيجة النهائية حتى لو غيّر بيانات (مثل `PUT`, `DELETE`).

### البطاقة 3
**Q3:** أي فعل `HTTP` تستخدمه لإنشاء مورد جديد؟
**A:** `POST` على مسار المجموعة (مثل `/movies`)، والاستجابة الناجحة يجب أن تتضمن رابط المورد الجديد.

### البطاقة 4
**Q4:** ما الفرق بين `POST` و`PUT` من ناحية توليد الـ `id`؟
**A:** `POST` يولّد الـ `id` تلقائياً على السيرفر؛ `PUT` يستقبل الـ `id` جاهزاً من الـ `client` عبر الرابط نفسه.

### البطاقة 5
**Q5:** لماذا `DELETE /movies` (بدون `id`) غير صالح؟
**A:** لأنه لا يحدد أي مورد بعينه — `DELETE` و`PUT` يجب أن يستهدفا مورداً واحداً محدداً عبر الرابط.

### البطاقة 6
**Q6:** ما وظيفة `express.Router()`؟
**A:** ينشئ كائن مسارات مستقل يمكن تجميعه في ملف منفصل ثم تركيبه لاحقاً على مسار أساسي في التطبيق الرئيسي عبر `app.use()`.

### البطاقة 7
**Q7:** ما نوع بيانات `req.params.id` دائماً؟
**A:** `string` دائماً، حتى لو كانت القيمة أرقاماً في الرابط — لذلك غالباً تحتاج `parseInt()` أو مقارنة غير صارمة (`==`) عند مقارنتها بأرقام.

### البطاقة 8
**Q8:** متى تستخدم `res.status(404)` بدل الاستجابة العادية `200`؟
**A:** عندما يكون الرابط صحيح الشكل لكن المورد المطلوب غير موجود فعلياً في البيانات — لتوضيح الفرق بين "الرابط غير موجود" و"المورد غير موجود".

### البطاقة 9
**Q9:** ما الفرق بين `movies.filter()` و`movies.map().indexOf()` في هذه المحاضرة؟
**A:** `filter` تُستخدم لما نحتاج *العنصر نفسه* (مثل `GET`)، بينما `map` + `indexOf` تُستخدم لما نحتاج *موقع (index)* العنصر لنقدر نستبدله أو نحذفه (مثل `PUT` و`DELETE`).

### البطاقة 10
**Q10:** ما وظيفة `movies.splice(index, count)`؟
**A:** تحذف `count` من العناصر بدءاً من الموقع `index`، وتُعدّل المصفوفة الأصلية مباشرة (`mutates in place`).

### البطاقة 11
**Q11:** لماذا نستخدم مصفوفة في الذاكرة بدل قاعدة بيانات في هذه المحاضرة؟
**A:** لتبسيط التعلم والتركيز على منطق الـ `routes` نفسها؛ العيب هو أن البيانات المُضافة تُفقد عند إعادة تشغيل السيرفر.

### البطاقة 12
**Q12:** ما سلوك `PUT` لو الـ `id` المرسل في الرابط غير موجود أصلاً في المصفوفة؟
**A:** ينشئ فيلماً جديداً بنفس ذلك الـ `id` (سلوك `upsert`)، بدل رفض الطلب — وهذا موثّق صراحة في جدول أفعال `REST`.

### البطاقة 13
**Q13:** ما دور `body-parser` في `index.js`؟
**A:** يحوّل جسم الطلب الخام (بصيغة `JSON` أو `urlencoded`) إلى كائن جافاسكربت متاح عبر `req.body`، ودونه تكون `req.body` غير معرّفة.

### البطاقة 14
**Q14:** كيف تربط `Router` مُعرَّف في ملف منفصل بالتطبيق الرئيسي؟
**A:** عبر `require('./movies.js')` لاستيراده، ثم `app.use('/movies', movies)` لتركيبه على مسار أساسي محدد.

# المحاضرة 14 — Project: Web Application With Django (مشروع تطبيق ويب باستخدام Django)
> **المادة:** البرمجة المتقدمة 2 (القسم النظري) | **الموضوع:** بناء مشروع Django كامل خطوة بخطوة (Learning Log)

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تاخدك خطوة بخطوة في بناء أول مشروع `Django` حقيقي اسمه **Learning Log**، من إنشاء البيئة الافتراضية لحد أول صفحة ويب تشتغل فعلياً في المتصفح.

### 🎯 ستتعلم
- إزاي تجهز `virtual environment` معزول لكل مشروع `Python` عشان المكتبات ما تتلخبط مع بعض
- الفرق بين `Django project` و `Django app`، وليش المشروع الواحد ممكن يحتوي أكتر من app
- إزاي تعرّف `models` (زي `Topic` و `Entry`) وتحوّلها لجداول فعلية في قاعدة البيانات عن طريق `migrations`
- إزاي تستخدم `Django Admin site` لإدخال وتعديل البيانات بسرعة من غير ما تكتب واجهة خاصة بيك
- إزاي تربط الأجزاء التلاتة اللي كل صفحة ويب في Django تعتمد عليها: `URL` → `view` → `template`

### 📚 المتطلبات السابقة
- **أساسيات البرمجة** (متغيرات، دوال، حلقات) — عشان تفهم كود `views.py` و `models.py`
- **مفاهيم البرمجة الكائنية `(Classes, Objects)`** — لأن كل `model` في Django هو `class` بيرث من `models.Model`، وكل جدول في قاعدة البيانات هو انعكاس لكلاس بايثون

### 💡 الأفكار الرئيسية

خلّينا نبدأ من البداية. لما تيجي تبني مشروع ويب بلغة Python، أول حاجة المفروض تسويها هي إنك تعزل مشروعك عن باقي مشاريع جهازك. هنا يجي دور الـ `virtual environment`. فكّر فيه كأنه "غرفة خاصة" لكل مشروع، فيها بس المكتبات اللي المشروع ده محتاجها، بنسخها اللي هو محتاجها بالضبط. لو ما استخدمت `virtual environment`، ولنفرض عندك مشروعين، واحد محتاج نسخة قديمة من `Django` والتاني محتاج نسخة جديدة، بيصير عندك تعارض في النظام كله. فبإنشاء بيئة معزولة بأمر زي `python -m venv ll_env`، وبعدين تفعيلها بـ `ll_env\Scripts\activate` على ويندوز، أنت عملياً بتقول لبايثون "لما أنا أنصّب أي حاجة دلوقتي، ركّبها هنا بس، مش في النظام العام".

بعد ما البيئة اشتغلت (بتعرف إنها شغالة لما تشوف اسمها بين قوسين قبل الـ prompt، زي `(ll_env)`)، بننصّب Django جواها بـ `pip install django`. ولاحظ إن `pip` هنا هو أداة إدارة الحزم (`package manager`) بتاعة بايثون، ودورها إنها تجيب المكتبة من الإنترنت وتحطها في بيئتك.

دلوقتي جينا لنقطة إنشاء المشروع نفسه. الأمر `django-admin.py startproject learning_log .` بيعمل حاجتين مع بعض: بيسوي مجلد فرعي فيه ملفات الإعدادات الأساسية (`settings.py`, `urls.py`, `wsgi.py`)، وبيسوي ملف `manage.py` في المجلد الرئيسي، وهو الملف اللي هتستخدمه طول الوقت عشان تشغّل أوامر Django. لاحظ النقطة (`.`) في آخر الأمر — دي مش تفصيلة بسيطة، هي اللي بتخلي Django يحط `manage.py` في نفس مجلد المشروع الأساسي (`learning_log`) بدل ما يعمل مجلد إضافي جواه، وده مهم جداً عشان لما نيجي ننشر المشروع (`deploy`) بعدين ما نواجهش مشاكل في مسارات الملفات.

بعد إنشاء المشروع، لازم نجهز قاعدة البيانات. Django بيستخدم `SQLite` كقاعدة بيانات افتراضية للتطوير، وعشان نخلق الجداول الأساسية اللي Django نفسه محتاجها (زي جداول المستخدمين، الجلسات...)، بنشغّل `python manage.py migrate`. فكّر في `migrate` كأنه "طبّق كل التغييرات المُعلَّقة على قاعدة البيانات فعلياً". وعشان نتأكد إن كل حاجة مظبوطة، بنشغّل `python manage.py runserver` وده بيشغّل سيرفر تطوير محلي على `http://127.0.0.1:8000/`، ولو فتحته في المتصفح المفروض تشوف صفحة "The install worked successfully!".

المشروع الواحد في Django بيتكوّن من **app واحد أو أكتر**. الفرق ببساطة: الـ `project` هو الحاوية الكبيرة اللي فيها الإعدادات العامة، والـ `app` هو وحدة وظيفية مستقلة بتعمل حاجة معينة (زي إدارة المواضيع والمدخلات، أو إدارة حسابات المستخدمين). بنسوي app جديد بالأمر `python manage.py startapp learning_logs`، وده بيولّد مجموعة ملفات جاهزة منها أهمها: `models.py` (تعريف البيانات)، `views.py` (منطق الصفحات)، و `admin.py` (تسجيل الموديلات في لوحة التحكم).

جوه `models.py`، بنعرّف الكلاسات اللي بتمثل جداول قاعدة البيانات. مثلاً `Topic` عنده حقل `text` (نص قصير بحد أقصى 200 حرف عن طريق `CharField(max_length=200)`) وحقل `date_added` (تاريخ ووقت يتسجل تلقائياً عن طريق `DateTimeField(auto_now_add=True)`). ودالة `__str__` مهمة جداً — من غيرها لما تطبع أي عنصر من الموديل هتشوف حاجة غير مفهومة زي `<Topic object (1)>`، لكن بوجودها هتشوف النص الفعلي زي `Chess`.

بعد ما نعرّف الموديل، لازم نعمل خطوتين: الأولى إننا "نفعّل" الـ app في المشروع بإضافة اسمه (`'learning_logs'`) داخل `INSTALLED_APPS` في `settings.py` — من غير الخطوة دي Django أصلاً مش هيعرف إن الـ app موجود. الخطوة التانية هي دورة الـ **migration**، واللي بتتكون من أمرين متتاليين مختلفين في الوظيفة: `python manage.py makemigrations learning_logs` اللي بيعمل "خطة تغيير" (ملف بايثون بيوصف التغيير المطلوب على قاعدة البيانات، زي "أنشئ جدول Topic")، و`python manage.py migrate` اللي بينفّذ الخطة دي فعلياً على قاعدة البيانات. فكّر في `makemigrations` كأنها "اكتب لي وصفة الأكل"، و`migrate` كأنها "اطبخ الوصفة فعلياً". لو نسيت `makemigrations`، Django هيقولك إن في تغييرات في الموديلات ما اتعملهاش migration.

نفس الدورة بالظبط بتتكرر أي مرة تضيف موديل جديد أو تعدّل موديل موجود — زي ما حصل لما ضفنا موديل `Entry` اللي بيمثل كل تدوينة (entry) يكتبها المستخدم عن موضوع معين. لاحظ هنا حاجة مهمة: `Entry` مرتبط بـ `Topic` عن طريق `models.ForeignKey(Topic, on_delete=models.CASCADE)`. الـ `ForeignKey` معناها "علاقة واحد لكتير" — كل `Topic` ممكن يكون ليه كذا `Entry`، لكن كل `Entry` بيتبع `Topic` واحد بس. والـ `on_delete=models.CASCADE` بيقول لـ Django: "لو اتمسح الـ Topic، امسح معاه كل الـ Entries اللي تابعة له" — عشان ما يفضلش عندنا entries يتيمة بلا موضوع.

عشان تتعامل مع البيانات دي بشكل سهل من غير ما تكتب واجهة، Django بيوفر **admin site** جاهزة. أول خطوة إنك تعمل `superuser` بالأمر `python manage.py createsuperuser` وتحط له username وemail وpassword. بعدين، وده أهم جزء، لازم "تسجّل" الموديل في `admin.py` بسطر `admin.site.register(Topic)` (ونفس الشيء لـ `Entry`) — من غيرها الموديل موجود في قاعدة البيانات لكن مش هيظهر في لوحة الإدارة خالص. بعد التسجيل، تروح على `http://localhost:8000/admin/`، تسجّل دخول بالـ superuser، وتقدر تضيف وتعدّل بيانات (زي إضافة موضوعين Chess و Rock Climbing، وإضافة entries ليهم) من واجهة جاهزة تلقائياً.

فيه أداة تانية مفيدة جداً وقت التطوير اسمها **Django shell**، بتتفتح بالأمر `python manage.py shell`. دي بيئة بايثون تفاعلية لكن معاها كل موديلات مشروعك جاهزة للاستيراد، فتقدر تكتب `from learning_logs.models import Topic` وتجرب `Topic.objects.all()` عشان تشوف كل السجلات، أو `Topic.objects.get(id=1)` عشان تجيب سجل معين، وحتى تستخدم `t.entry_set.all()` عشان تجيب كل الـ Entries المرتبطة بموضوع معين (ده بييجي تلقائي من العلاقة اللي عرّفناها بالـ ForeignKey).

آخر جزء في المحاضرة بيوصّل كل حاجة سويناها لحد دلوقتي بحاجة يقدر المستخدم يشوفها فعلياً: صفحة ويب. وعشان تعمل صفحة في Django، دايماً في ثلاث مراحل بالترتيب: أولاً **URL** — نمط بيوصف شكل الرابط ويقول لـ Django "لما حد يفتح الرابط ده، شغّل الدالة الفلانية". ده بيتعرّف في ملف `urls.py`. في `learning_log/urls.py` (الملف العام) بنضيف سطر `url(r'', include('learning_logs.urls', namespace='learning_logs'))` عشان "نوصّل" أي رابط في المشروع لملف `urls.py` تاني بنعمله جوه الـ app نفسه (`learning_logs/urls.py`)، واللي فيه `url(r'^$', views.index, name='index')` — يعني "لو الرابط فاضي (الصفحة الرئيسية)، شغّل دالة `index` من `views.py`".

المرحلة التانية هي **view**، وهي دالة بايثون بتستقبل الطلب (`request`) وترجع استجابة. أبسط شكل ليها هو `def index(request): return render(request, 'learning_logs/index.html')` — الدالة `render()` هي اللي بتربط الطلب بملف `HTML` معين وترجّعه للمتصفح.

المرحلة التالتة هي **template**، وهو ملف `HTML` عادي (`index.html`) بنحطه جوه مجلد `templates` داخل الـ app. في البداية بنخليه بسيط جداً — مجرد عنوان ووصف قصير عن الموقع، عشان الهدف الأساسي إننا نتأكد إن التدفق كله (`URL → view → template`) شغّال صح، قبل ما نبدأ نزوّق الشكل. زي ما المحاضرة قالت بالظبط: "تطبيق شغال هو اللي متعة تزويقه، لكن تطبيق شكله حلو وما بيشتغلش مفيدش."

### 🔗 كيف تتصل هذه المحاضرة بالمحاضرات الأخرى؟
- **السابقة:** أي محاضرة سابقة عرّفتك على أساسيات `Python` و `OOP` (الكلاسات والكائنات) هي اللي بتخليك تقدر تفهم إن `models.py` مجرد كلاسات بترث من `models.Model`.
- **القادمة:** المحاضرات الجاية هتبني فوق نفس المشروع (Learning Log) — هتضيف صفحات لعرض المواضيع، نماذج (`forms`) لإضافة بيانات من المستخدم، ونظام تسجيل دخول للمستخدمين (`user accounts`).

### ⚠️ الأخطاء الشائعة الواجب تجنبها

#### الفهم الخاطئ ❌:
كتير من الطلاب يفتكروا إن `makemigrations` و `migrate` هما نفس الأمر أو إنك تقدر تستخدم واحد بس منهم.

#### الفهم الصحيح ✅:
`makemigrations` بيولّد "ملف وصف التغيير" بس (مجرد ملف بايثون)، ولسه ما لمسش قاعدة البيانات خالص. `migrate` هو اللي فعلياً بيطبّق التغيير على قاعدة البيانات. لازم الاتنين بالترتيب ده كل مرة تعدّل فيها الموديلات.

#### الفهم الخاطئ ❌:
نسيان تسجيل الموديل في `admin.py` بعد إنشائه، وبعدين التساؤل ليش الموديل مش ظاهر في لوحة الإدارة.

#### الفهم الصحيح ✅:
إنشاء الموديل في `models.py` وعمل `migrate` بيخلق الجدول في قاعدة البيانات بس. لازم سطر إضافي منفصل `admin.site.register(ModelName)` في `admin.py` عشان يظهر في واجهة `/admin/`.

#### الفهم الخاطئ ❌:
نسيان النقطة (`.`) في آخر أمر `django-admin.py startproject learning_log .`.

#### الفهم الصحيح ✅:
النقطة بتحدد إن ملفات الإعداد و`manage.py` تتحط في نفس مجلد المشروع الحالي بدل ما يتعمل مجلد فرعي إضافي، وده بيفرق وقت الـ `deployment` بعدين.

### لما تحتاج هذا في الامتحان
غالباً هتيجي أسئلة على: ترتيب أوامر إنشاء وتفعيل الـ `virtual environment`، الفرق بين `makemigrations` و `migrate`، معنى `ForeignKey` و `on_delete=CASCADE`، خطوات تسجيل موديل في الـ admin، وترتيب المراحل التلاتة `URL → view → template` مع تحديد أي ملف مسؤول عن أي جزء. كمان ممكن سؤال على وظيفة `__str__` وليش بنكتبها في الموديل.

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. Setting Up a Project (إعداد المشروع)

### 1.1. Writing a Spec (كتابة المواصفات)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

#### 💡 الفكرة الأساسية
**قبل ما تكتب أي سطر كود، لازم تكتب `spec` — وصف واضح ومختصر لوظيفة المشروع.**

#### 📖 الشرح
الـ `spec` (اختصار `specification`) هو النص اللي بيحدد إيه اللي المشروع المفروض يعمله، من غير تفاصيل تقنية. في محاضرتنا، الـ `spec` بيقول إن المشروع اسمه **Learning Log**، وظيفته إنه يخلي المستخدمين يسجّلوا مواضيع (`topics`) بيتعلموها، ويكتبوا تدوينات (`entries`) عن كل موضوع أثناء ما بيتعلموه. الصفحة الرئيسية لازم توصف الموقع وتدعو المستخدم إما يسجّل حساب جديد أو يسجّل دخول. وبعد تسجيل الدخول، المستخدم يقدر ينشئ مواضيع جديدة، يضيف تدوينات جديدة، ويقرأ ويعدّل التدوينات الموجودة.

كتابة الـ `spec` أول خطوة مهمة جداً لأنها بتحولك من فكرة غامضة في دماغك لخطة واضحة تقدر تبني عليها. لما تعرف بالظبط إيه اللي المستخدم لازم يقدر يعمله، تقدر بعدين تحدد إيه الـ `models` اللي محتاجها، إيه الـ `URLs`، وإيه الـ `views`.

#### 💡 التشبيه:
> زي المهندس المعماري اللي ما يبنيش بيت من غير مخطط. الـ `spec` هو المخطط بتاعك قبل ما تبدأ تبني.
> **وجه الشبه:** المخطط الهندسي = وصف واضح لكل غرفة ووظيفتها، والـ `spec` = وصف واضح لكل ميزة في التطبيق ووظيفتها.

#### 🎯 الملخص السريع
- الـ `spec` وصف عام لوظيفة التطبيق قبل البدء بالكود
- المشروع اسمه Learning Log: تسجيل مواضيع + تدوينات لكل موضوع
- المستخدم لازم يسجّل دخول قبل ما يقدر يضيف أو يعدّل

#### 📚 التطبيق
الـ `spec` ده هو اللي هيوجّه كل القرارات التقنية الجاية: الموديلات (Topic و Entry)، الصفحات (الرئيسية، تسجيل الدخول، إضافة موضوع...)، ونظام حسابات المستخدمين.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> We'll write a web app called Learning Log that allows users to log the topics they're interested in and to make journal entries as they learn about each topic. The Learning Log home page should describe the site and invite users to either register or log in. Once logged in, a user should be able to create new topics, add new entries, and read and edit existing entries.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف spec + محتوى spec Learning Log بكامل تفاصيله
- ℹ️ إضافة من الدليل: تشبيه المهندس المعماري (ليس في المحاضرة الأصلية)

</details>

---

### 1.2. Creating a Virtual Environment (إنشاء بيئة افتراضية)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1"} -->

#### ⬅️ الربط مع السابق
بعد ما حددنا إيه اللي هنبنيه في الـ `spec`، أول خطوة عملية هي إننا نجهّز مكان معزول (بيئة) نركّب فيه Django والمكتبات المطلوبة، من غير ما نأثر على باقي مشاريع الجهاز.

#### 💡 الفكرة الأساسية
**`virtual environment` هي بيئة بايثون معزولة خاصة بمشروعك بس، فيها نسخها الخاصة من المكتبات.**

#### 💻 الكود
```bash
# Create a new project folder
md learning_log
cd learning_log

# Create a virtual environment named ll_env inside the project folder
python -m venv ll_env
```

#### شرح كل سطر:
1. `md learning_log` → ينشئ مجلد جديد باسم `learning_log` (على ويندوز؛ يعادل `mkdir` في Linux/Mac)
2. `cd learning_log` → يدخل داخل المجلد الجديد
3. `python -m venv ll_env` → يستخدم موديول `venv` المدمج في بايثون عشان ينشئ بيئة افتراضية جديدة باسم `ll_env`

#### 📖 الشرح
كل مشروع Python المفروض يكون له بيئته الخاصة، عشان لو مشروع تاني محتاج نسخة مختلفة من نفس المكتبة، ما يصيرش تعارض. أمر `python -m venv ll_env` بيولّد مجلد جديد اسمه `ll_env` جوه مجلد المشروع، وده المجلد اللي هيحتوي نسخة بايثون خاصة ومكان تركيب المكتبات المعزول.

#### 🎯 الملخص السريع
- لازم مجلد مشروع منفصل لكل تطبيق
- الأمر `python -m venv <اسم>` بينشئ بيئة افتراضية معزولة
- البيئة لسه لازم "تتفعّل" عشان تشتغل عليها (الخطوة الجاية)

#### 📚 التطبيق
بعد إنشاء البيئة، لازم "نفعّلها" (Section 1.4) قبل ما نقدر ننصّب Django جواها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Create a new directory for your project called learning_log: C:\users\MohanadRajab> md learning_log ... Create a virtual environment with the following command: C:\users\MohanadRajab\learning_log> python -m venv ll_env

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل الأوامر ووظيفتها
- ℹ️ إضافة من الدليل: توضيح إن `md` تعادل `mkdir`

</details>

---

### 1.3. Installing virtualenv (تركيب حزمة virtualenv)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.2"} -->

#### ⬅️ الربط مع السابق
موديول `venv` المدمج (اللي استخدمناه في 1.2) مش موجود أو مش شغّال صح في كل إصدارات بايثون القديمة، فبتحتاج بديل.

#### 💡 الفكرة الأساسية
**حزمة `virtualenv` هي بديل خارجي لموديول `venv` لو نظامك ما بيدعمهوش بشكل صحيح.**

#### 💻 الكود
```bash
# Install the virtualenv package for the current user only
pip install --user virtualenv
```

#### شرح كل سطر:
1. `pip install --user virtualenv` → ينصّب حزمة `virtualenv` على مستوى المستخدم الحالي بس (مش على مستوى النظام كله)، عشان الحالات اللي `python -m venv` ما بيشتغلش فيها صح

#### 📖 الشرح
لو كنت شغّال بإصدار بايثون قديم، ممكن الأمر `python -m venv` ما يشتغلش صح، فالحل إنك تنصّب حزمة `virtualenv` بشكل منفصل بـ `pip`. الخيار `--user` بيضمن التركيب في مجلد المستخدم بدل ما يحتاج صلاحيات إدارية على النظام كله.

#### 🎯 الملخص السريع
- `virtualenv` بديل لـ `venv` في حالة الإصدارات القديمة أو الأنظمة اللي مش مضبوطة صح
- التركيب عن طريق `pip install --user virtualenv`

#### 📚 التطبيق
بعد التركيب، تقدر تستخدم أمر `virtualenv ll_env` بدل `python -m venv ll_env` لو احتجت.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90%)</summary>

**النص الأصلي يقول:**
> If you're using an earlier version of Python or if your system isn't set up to use the venv module correctly, you can install the virtualenv package. To install virtualenv, enter the following: pip install --user virtualenv

**ملاحظة على التغطية:**
- ✓ تم شرح: سبب استخدام الحزمة + أمر التركيب + معنى `--user`
- ⚠️ غير مشروح بالكامل: المحاضرة ما وضحتش الأمر البديل لإنشاء البيئة باستخدام `virtualenv` نفسها (`virtualenv ll_env`) — أضفناه كـ (شرح زيادة للفهم)

</details>

---

### 1.4. Activating the Virtual Environment (تفعيل البيئة الافتراضية)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.3"} -->

#### ⬅️ الربط مع السابق
دلوقتي عندنا بيئة افتراضية موجودة (`ll_env`)، لكن لسه لازم "ندخلها" فعلياً عشان أي أمر `pip` أو `python` نكتبه يروح جواها بس.

#### 💡 الفكرة الأساسية
**تفعيل البيئة يخلي أي تركيب أو تشغيل بايثون بعد كده يحصل داخلها فقط، لحد ما توقفها.**

#### 💻 الكود
```bash
# Activate the virtual environment (Windows)
ll_env\Scripts\activate

# Deactivate it when you're done working
deactivate
```

#### شرح كل سطر:
1. `ll_env\Scripts\activate` → يفعّل البيئة الافتراضية؛ بعد التفعيل هتلاحظ اسم البيئة `(ll_env)` ظاهر في بداية سطر الأوامر
2. `deactivate` → يخرجك من البيئة الافتراضية ويرجّعك لبيئة بايثون العامة بتاعة النظام

#### 📖 الشرح
علامة التأكد إن البيئة اشتغلت هي ظهور اسمها بين قوسين قبل مسار السطر، زي `(ll_env) c:\users\MohanadRajab\learning_log>`. طول ما إنت شغال جوه البيئة دي، أي مكتبة تركّبها هتتحط جواها بس مش على النظام كله. لما تخلص شغلك، تقدر تخرج بأمر `deactivate`.

#### 🎯 الملخص السريع
- التفعيل بأمر `ll_env\Scripts\activate` على ويندوز
- علامة النجاح: اسم البيئة بين قوسين في بداية السطر
- الخروج بأمر `deactivate`

#### 📚 التطبيق
كل الأوامر الجاية (تركيب Django، إنشاء المشروع، migrate...) لازم تتنفذ **والبيئة مفعّلة**.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
تنفيذ أوامر `pip install django` أو `python manage.py ...` من غير ما تتأكد إن البيئة مفعّلة (مفيش `(ll_env)` ظاهرة).

#### الفهم الصحيح ✅:
لازم تتأكد دايماً إن `(ll_env)` ظاهرة قبل أي أمر متعلق بالمشروع، وإلا هتركّب المكتبات على النظام العام بدل البيئة المعزولة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> If you're using Windows, use the command to activate the virtual environment. C:\users\MohanadRajab\learning_log> ll_env\Scripts\activate (ll_env) c:\users\MohanadRajab\learning_log> ... To stop using a virtual environment, enter: (ll_env) c:\users\MohanadRajab\learning_log> deactivate

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: أمر التفعيل، علامة التأكد، أمر الإلغاء

</details>

---

### 1.5. Installing Django (تركيب Django)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.4"} -->

#### ⬅️ الربط مع السابق
البيئة دلوقتي مفعّلة وجاهزة. الخطوة الجاية إننا ننصّب الأداة الأساسية اللي هيبني عليها المشروع كله: `Django`.

#### 💡 الفكرة الأساسية
**`pip install django` ينصّب مكتبة Django داخل البيئة الافتراضية المفعّلة.**

#### 💻 الكود
```bash
# Install Django inside the active virtual environment
pip install django
```

#### شرح كل سطر:
1. `pip install django` → يحمّل ويركّب `Django` من `PyPI` (مستودع حزم بايثون الرسمي) داخل بيئة `ll_env` المفعّلة حالياً

#### 📖 الشرح
لازم التركيب ده يحصل **والبيئة مفعّلة** (يعني شايف `(ll_env)` في بداية السطر) عشان Django يتنصّب جوه البيئة المعزولة بتاعت المشروع بس، مش على مستوى النظام كله. لو التركيب نجح، هتشوف رسالة زي `Successfully installed Django`.

#### 🎯 الملخص السريع
- `pip` هي أداة تركيب حزم بايثون
- لازم البيئة تكون مفعّلة وقت التركيب
- النتيجة: رسالة `Successfully installed Django`

#### 📚 التطبيق
بعد ما Django اتنصّب، بنقدر نستخدم أمر `django-admin.py` عشان ننشئ المشروع الفعلي (Section 1.6).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Once you've created your virtual environment and activated it, install Django: (ll_env) c:\users\MohanadRajab\learning_log> pip install django Installing collected packages: Django Successfully installed Django Cleaning up... c:\users\MohanadRajab\learning_log>

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأمر ومعنى نجاحه

</details>

---

### 1.6. Creating a Project in Django (إنشاء المشروع)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.5"} -->

#### ⬅️ الربط مع السابق
Django دلوقتي منصّب. الخطوة الجاية هي إننا نولّد هيكل المشروع الأساسي (ملفات الإعدادات والتوجيه).

#### 💡 الفكرة الأساسية
**أمر `startproject` بيولّد الهيكل الأساسي لأي مشروع Django: ملفات الإعدادات + ملف `manage.py`.**

#### 💻 الكود
```bash
# Create a new Django project named learning_log in the current folder
django-admin.py startproject learning_log .

# List folder contents
dir
```

#### شرح كل سطر:
1. `django-admin.py startproject learning_log .` → ينشئ مشروع Django باسم `learning_log`؛ النقطة `.` في الآخر تحدد "أنشئ الملفات هنا في المجلد الحالي" بدل مجلد فرعي جديد
2. `dir` → يعرض محتويات المجلد للتأكد من إنشاء `learning_log` (مجلد الإعدادات)، `ll_env` (البيئة)، و`manage.py`

#### 📖 الشرح
بعد تنفيذ الأمر، هيتكوّن عندك مجلد فرعي اسمه `learning_log` فيه أربع ملفات أساسية: `__init__.py` (بيخلي المجلد يتعامل كـ Python package)، `settings.py` (كل إعدادات المشروع)، `urls.py` (خريطة الروابط العامة)، و`wsgi.py` (خاص بالنشر/deployment). الملف الأهم اللي هيفضل يظهر باستمرار هو `manage.py`، وهو اللي هتستخدمه في كل أمر إدارة للمشروع بعد كده.

#### 🎯 الملخص السريع
- `startproject` ينشئ هيكل المشروع الأساسي
- الملفات الناتجة: `__init__.py`, `settings.py`, `urls.py`, `wsgi.py`, `manage.py`
- النقطة (`.`) مهمة لتجنب تداخل مجلدات لاحقاً وقت الـ `deployment`

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
نسيان النقطة (`.`) في آخر الأمر واعتبارها تفصيلة غير مهمة.

#### الفهم الصحيح ✅:
نسيان النقطة بيخلي Django يعمل مجلد إضافي بنفس اسم المشروع (`learning_log/learning_log/manage.py` بدل `learning_log/manage.py`)، وده بيسبب مشاكل إعداد وقت النشر. لو نسيتها، امسح الملفات اللي اتعملت (ما عدا `ll_env`) وأعد الأمر صح.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Without leaving the active virtual environment... enter the following commands to create a new project: django-admin.py startproject learning_log . ... Note: Don't forget this dot, or you may run into some configuration issues when we deploy the app. If you forget the dot, delete the files and folders that were created (except ll_env), and run the command again.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأمر، الملفات الناتجة، وأهمية النقطة والتحذير الخاص بها

</details>

---

### 1.7. Creating the Database (إنشاء قاعدة البيانات)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.6"} -->

#### ⬅️ الربط مع السابق
عندنا هيكل مشروع جاهز، لكن Django لسه محتاج قاعدة بيانات فعلية عشان يقدر يخزّن فيها بيانات النظام الأساسية (المستخدمين، الجلسات...).

#### 💡 الفكرة الأساسية
**أمر `migrate` بينشئ/يحدّث قاعدة البيانات بناءً على الموديلات المسجّلة في المشروع.**

#### 💻 الكود
```bash
# Apply all pending migrations to create the database
python manage.py migrate

# Verify db.sqlite3 was created
dir
```

#### شرح كل سطر:
1. `python manage.py migrate` → ينفّذ كل الـ `migrations` المُعلّقة، بما فيها جداول Django الأساسية (`contenttypes`, `sessions`, `auth`, `admin`)
2. `dir` → يظهر ملف `db.sqlite3` الجديد جنب `learning_log`, `ll_env`, `manage.py`

#### 📖 الشرح
Django بيخزّن معظم بيانات المشروع في قاعدة بيانات. لأول مرة، الأمر `migrate` بيخلق قاعدة بيانات `SQLite` (اسمها `db.sqlite3`) وبيبني فيها الجداول الأساسية اللي Django نفسه محتاجها عشان يشتغل صح (زي جداول المستخدمين والصلاحيات)، حتى لو لسه ما عرّفناش موديلات خاصة بينا.

#### 🎯 الملخص السريع
- `migrate` بيطبّق كل التغييرات على قاعدة البيانات فعلياً
- SQLite هي القاعدة الافتراضية، وبتظهر كملف `db.sqlite3`
- الجداول اللي بتتعمل هنا هي جداول Django الأساسية بس (مش موديلاتنا الخاصة لسه)

#### 📚 التطبيق
لما نضيف موديلاتنا الخاصة (Section 2)، هنكرر نفس فكرة `migrate` بس بعد خطوة إضافية اسمها `makemigrations`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Because Django stores most of the information related to a project in a database, we need to create a database that Django can work with. To create the database for the Learning Log project, enter the following command (still in an active environment): python manage.py migrate

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: سبب الأمر ووظيفته والنتيجة

</details>

---

### 1.8. Viewing the Project (عرض المشروع)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.7"} -->

#### ⬅️ الربط مع السابق
كل الإعداد الأساسي خلص. دلوقتي الوقت المناسب نتأكد إن المشروع فعلاً شغّال قبل ما نكمل نبني عليه.

#### 💡 الفكرة الأساسية
**أمر `runserver` بيشغّل سيرفر تطوير محلي تقدر تفتح المشروع بيه في المتصفح.**

#### 💻 الكود
```bash
# Start Django's local development server
python manage.py runserver
```

#### شرح كل سطر:
1. `python manage.py runserver` → يشغّل سيرفر ويب محلي بسيط (`development server`) على العنوان `http://127.0.0.1:8000/` بشكل افتراضي؛ لإيقافه نضغط `CONTROL-C`

#### 📖 الشرح
بعد تشغيل الأمر، هتشوف رسائل فحص النظام (`System check identified no issues`) وإصدار Django المستخدَم، ثم رسالة إن السيرفر شغّال. تفتح المتصفح وتكتب `http://localhost:8000/` أو `http://127.0.0.1:8000/`، والمفروض تشوف صفحة ترحيب Django الافتراضية "The install worked successfully! Congratulations!" — دي علامة إن كل الإعداد اللي عملناه لحد دلوقتي صحيح.

#### 🎯 الملخص السريع
- `runserver` يشغّل سيرفر تطوير محلي
- العنوان الافتراضي: `http://127.0.0.1:8000/` أو `http://localhost:8000/`
- ظهور صفحة "install worked successfully" يعني الإعداد سليم

#### 📚 التطبيق
بعد التأكد من نجاح التشغيل، نبدأ نبني الـ app الأول (Section 2)، وبعدين نستبدل صفحة الترحيب الافتراضية دي بصفحتنا الخاصة (Section 3).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Let's make sure that Django has set up the project properly. Enter the runserver command as follows: python manage.py runserver ... Now open a web browser and enter the URL http://localhost:8000/, or http://127.0.0.1:8000/

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأمر والنتيجة المتوقعة في المتصفح

</details>

---

### 2. Starting an App (إنشاء تطبيق داخل المشروع)

### 2.1. Defining Models (تعريف الموديلات)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.8"} -->

#### 📍 أين نحن الآن؟
انتقلنا من إعداد المشروع العام (Section 1) لبناء أول `app` وظيفي جوّاه، وأول حاجة داخل الـ app هي تعريف شكل البيانات.

#### ⬅️ الربط مع السابق
بعد ما تأكدنا إن المشروع الأساسي شغّال (1.8)، لازم ننشئ `app` منفصل يحتوي منطق Learning Log الفعلي، ثم نعرّف جواه أول موديل: `Topic`.

#### 💡 الفكرة الأساسية
**كل `model` في Django هو كلاس بايثون بيرث من `models.Model`، وكل حقل جواه بيتحول تلقائياً لعمود في جدول قاعدة البيانات.**

#### 💻 الكود
```bash
# Create a new app inside the project
ll_env\scripts\activate
python manage.py startapp learning_logs
```

```python
# models.py
from django.db import models

class Topic(models.Model):
    """A topic the user is learning about"""
    text = models.CharField(max_length=200)          # short text field, max 200 chars
    date_added = models.DateTimeField(auto_now_add=True)  # auto-set timestamp on creation

    def __str__(self):
        """Return a string representation of the model."""
        return self.text
```

#### شرح كل سطر:
1. `class Topic(models.Model):` → يعرّف موديل جديد اسمه `Topic` بيرث كل خصائص `models.Model`
2. `text = models.CharField(max_length=200)` → عمود نصي قصير بحد أقصى 200 حرف
3. `date_added = models.DateTimeField(auto_now_add=True)` → عمود تاريخ ووقت يتسجّل تلقائياً أول ما يتعمل السجل، والـ `auto_now_add=True` تمنعك من تعديله يدوياً بعد كده
4. `def __str__(self):` → تحدد الشكل النصي اللي هيظهر لما تطبع كائن من الموديل، وهنا رجّعنا `self.text` (نص الموضوع نفسه)

#### 📖 الشرح
أمر `python manage.py startapp learning_logs` بيولّد مجلد جديد اسمه `learning_logs` فيه ملفات جاهزة (`admin.py`, `models.py`, `views.py`, `migrations/`...). كل حاجة تخص بيانات "المواضيع" و"التدوينات" هنكتبها هنا. الموديل `Topic` بيمثل جدول اسمه `learning_logs_topic` هيتخلق تلقائياً في قاعدة البيانات، وكل خاصية في الكلاس هتبقى عمود في الجدول.

#### ⚙️ الخطوات / الخوارزمية: إنشاء وتعريف Model جديد
```algorithm
1 | إنشاء الـ app | python manage.py startapp <name> | يولّد مجلد الـ app بملفاته الجاهزة
2 | فتح models.py | محرر الكود | لكتابة تعريف الكلاس
3 | تعريف الحقول | models.CharField / DateTimeField ... | تحديد أنواع البيانات لكل عمود
4 | كتابة __str__ | دالة بايثون | لعرض تمثيل نصي مفهوم للسجل
```

#### 🎯 الملخص السريع
- `startapp` بيولّد ملفات الـ app الأساسية
- الموديل = كلاس يرث من `models.Model`
- كل خاصية في الكلاس = عمود في الجدول
- `__str__` بتحدد الشكل النصي للسجل عند الطباعة

#### 📚 التطبيق
الموديل `Topic` ده لازم "يتفعّل" في إعدادات المشروع (Section 2.2) قبل ما Django يعترف بوجوده فعلياً.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
نسيان دالة `__str__` واعتبارها اختيارية غير مهمة.

#### الفهم الصحيح ✅:
من غير `__str__`، أي مكان يعرض سجلات الموديل (زي لوحة الإدارة أو الـ shell) هيظهر تمثيل غير مفهوم زي `<Topic object (1)>` بدل الاسم الفعلي للموضوع.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> class Topic(models.Model): """A topic the user is learning about""" text = models.CharField(max_length=200) date_added = models.DateTimeField(auto_now_add=True) def __str__(self): """Return a string representation of the model.""" return self.text

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الكود كاملاً + أمر إنشاء الـ app + مخرجاته

</details>

---

### 2.2. Activating Models (تفعيل الموديلات)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1"} -->

#### ⬅️ الربط مع السابق
عرّفنا موديل `Topic` في 2.1، لكن Django لسه ما يعرفش إن الـ `app` بتاعنا (`learning_logs`) أصلاً جزء من المشروع، فلازم "نسجّله" في الإعدادات.

#### 💡 الفكرة الأساسية
**لازم تضيف اسم الـ app داخل `INSTALLED_APPS` في `settings.py`، ثم تعمل `makemigrations` و `migrate` عشان الموديل يتحول لجدول حقيقي.**

#### 💻 الكود
```python
# settings.py
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # My apps
    'learning_logs',
)
```

```bash
# Generate the migration file describing the new model
python manage.py makemigrations learning_logs

# Apply the migration to the actual database
python manage.py migrate
```

#### شرح كل سطر:
1. `'learning_logs',` → السطر المضاف داخل `INSTALLED_APPS` تحت تعليق `# My apps`، وهو اللي بيخلي Django "يعرف" إن الـ app ده جزء من المشروع
2. `python manage.py makemigrations learning_logs` → يولّد ملف `migration` جديد (زي `0001_initial.py`) بيوصف التغيير المطلوب ("Create model Topic")
3. `python manage.py migrate` → يطبّق الملف ده فعلياً على قاعدة البيانات، فيتخلق جدول `Topic` بجد

#### 📖 الشرح
عملية "تفعيل الموديلات" دايماً بتتم بنفس الترتيب: 1) تسجيل الـ app في `INSTALLED_APPS`، 2) `makemigrations` (كتابة خطة التغيير)، 3) `migrate` (تنفيذ الخطة). لو حاولت تعمل `migrate` من غير `makemigrations` قبلها، Django مش هيلاقي حاجة جديدة يطبّقها لأنه أصلاً ما كتبش الخطة.

#### 🎯 الملخص السريع
- تسجيل الـ app في `INSTALLED_APPS` خطوة إلزامية أولى
- `makemigrations` = كتابة خطة التغيير
- `migrate` = تنفيذ الخطة فعلياً على قاعدة البيانات

#### 📚 التطبيق
بعد كده الموديل جاهز نتعامل معاه، إما من `admin site` (Section 2.3) أو من `Django shell` (Section 2.7).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن `makemigrations` وحدها كافية عشان الجدول يتخلق في قاعدة البيانات.

#### الفهم الصحيح ✅:
`makemigrations` بس بتكتب "الوصفة" (ملف بايثون بيوصف التغيير)، ولسه ما لمستش قاعدة البيانات. لازم `migrate` بعدها عشان التغيير يتنفذ فعلياً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> Open settings.py ... INSTALLED_APPS = (... # My apps 'learning_logs', ) ... Next, we need to tell Django to modify the database so it can store information related to the model Topic. ... python manage.py makemigrations learning_logs ... python manage.py migrate

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تسجيل الـ app + الأمرين مع مخرجاتهما
- ℹ️ إضافة من الدليل: توضيح صريح لترتيب الخطوات التلاتة كخوارزمية

</details>

---

### 2.3. The Django Admin Site (لوحة إدارة Django)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2"} -->

#### ⬅️ الربط مع السابق
دلوقتي عندنا جدول `Topic` حقيقي في قاعدة البيانات، لكن مفيش أي واجهة لسه نقدر نضيف أو نعدّل بيانات بيها — هنا بيجي دور الـ admin site الجاهزة.

#### 💡 الفكرة الأساسية
**Django بيوفر لوحة إدارة (`admin site`) جاهزة تلقائياً لأي موديل تسجّله، من غير ما تكتب واجهة بنفسك.**

#### 💻 الكود
```bash
# Create an admin (superuser) account
python manage.py createsuperuser
# Username (leave blank to use 'ehmatthes'): mohanadrajab
# Email address: mrajab@gmail.com
# Password: ********
# Password (again): ********
# Superuser created successfully.
```

```python
# admin.py
from django.contrib import admin
from learning_logs.models import Topic

admin.site.register(Topic)
```

#### شرح كل سطر:
1. `python manage.py createsuperuser` → يبدأ حوار تفاعلي لإنشاء حساب مدير كامل الصلاحيات (username, email, password)
2. `from learning_logs.models import Topic` → يستورد الموديل من ملف `models.py`
3. `admin.site.register(Topic)` → السطر اللي فعلياً "يعرّف" لوحة الإدارة على الموديل، فيظهر في `/admin/` بشكل تلقائي

#### 📖 الشرح
عشان تدخل لوحة الإدارة، أول لازم يكون عندك `superuser` (مستخدم بكل الصلاحيات)، وده بيتعمل بالأمر `createsuperuser`. بعدين، حتى لو الموديل موجود في قاعدة البيانات، لازم "تسجّله" صراحةً في `admin.py` باستخدام `admin.site.register(ModelName)` عشان يظهر في اللوحة. بعد التسجيل، تروح `http://localhost:8000/admin/`، تدخل بحساب الـ superuser، وتلاقي `learning_logs` ظاهر كقسم فيه `Topics` تقدر تضيف منه سجلات (زي إضافة "Chess" و"Rock Climbing") من غير ما تكتب أي كود واجهة إضافي.

#### 🎯 الملخص السريع
- `createsuperuser` ينشئ حساب مدير للدخول للوحة الإدارة
- `admin.site.register(Model)` هو السطر اللي يفعّل ظهور الموديل في اللوحة
- الوصول عن طريق `/admin/`

#### 📚 التطبيق
لاحظ إن Topic لسه لوحدها، والخطوة الجاية (2.4) هنضيف موديل `Entry` عشان نقدر نسجّل تفاصيل فعلية عن كل موضوع.

#### 🖼️ وصف الشاشة: لوحة إدارة Django (Site administration)
> **الصفحة/الشريحة:** الشريحة 12
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| قسم AUTHENTICATION AND AUTHORIZATION | أعلى الصفحة | إدارة المستخدمين (Users) والمجموعات (Groups) |
| قسم LEARNING_LOGS | تحت القسم السابق | يحتوي الموديلات المسجّلة (Entries, Topics) بأزرار Add / Change |
| Recent actions | يسار الصفحة | يعرض آخر التعديلات اللي عملها المستخدم الحالي |

**خطوات العمل:**
1. الضغط على `Add` بجانب `Topics`
2. كتابة نص الموضوع (مثل "Chess") في الحقل المتاح
3. الضغط على `Save`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> When you define models for an app, Django makes it easy for you to work with your models through the admin site. To create a superuser in Django, enter the following command and respond to the prompts: python manage.py createsuperuser ... To register Topic with the admin site, enter: admin.site.register(Topic)

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: إنشاء superuser + تسجيل الموديل + خطوات إضافة بيانات من اللوحة

</details>

---

### 2.4. Defining the Entry Model (تعريف موديل Entry)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.3"} -->

#### ⬅️ الربط مع السابق
لغاية دلوقتي عندنا مواضيع (Topics) بس بلا تفاصيل. الخطوة الجاية هي تعريف موديل يمثل "التدوينة" (Entry) اللي بيكتبها المستخدم عن كل موضوع.

#### 💡 الفكرة الأساسية
**موديل `Entry` مرتبط بـ `Topic` عن طريق `ForeignKey`، وده بيمثل علاقة "واحد لكتير" (one-to-many).**

#### 💻 الكود
```python
# models.py
from django.db import models

class Topic(models.Model):
    """A topic the user is learning about"""
    text = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class Entry(models.Model):
    """Something specific learned about a topic"""
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)  # link to a Topic; delete entries if topic is deleted
    text = models.TextField()                                    # unlimited-length text
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'entries'   # fix default plural "Entrys" -> "entries"

    def __str__(self):
        """Return a string representation of the model."""
        return self.text[:50] + "..."
```

#### شرح كل سطر:
1. `topic = models.ForeignKey(Topic, on_delete=models.CASCADE)` → يربط كل `Entry` بموضوع واحد من `Topic`؛ `on_delete=models.CASCADE` يعني لو اتمسح الموضوع، كل التدوينات التابعة له تتمسح معاه تلقائياً
2. `text = models.TextField()` → حقل نصي طويل بلا حد أقصى للطول (بعكس `CharField`)
3. `class Meta:` → كلاس داخلي بيحمل إعدادات إضافية للموديل مش بيانات فعلية
4. `verbose_name_plural = 'entries'` → بيصحح الجمع الافتراضي الخطأ (`Entrys`) ليصبح `entries` في لوحة الإدارة
5. `return self.text[:50] + "..."` → بيرجّع أول 50 حرف بس من التدوينة متبوعين بثلاث نقاط، عشان التمثيل النصي ما يبقاش طويل جداً

#### 📖 الشرح
كل `Entry` لازم يتبع `Topic` معين — مفيش تدوينة "معلّقة" من غير موضوع. الـ `ForeignKey` هي اللي بتعبّر عن العلاقة دي في Django، وبتترجم لعمود إضافي في جدول `Entry` بيحمل رقم الـ `Topic` المرتبط بيه. الخيار `on_delete=models.CASCADE` بيحدد سلوك الحذف: لو الموضوع الأصلي اتمسح، كل تدويناته تتمسح تلقائياً معاه، عشان ما يفضلش عندنا بيانات يتيمة بلا معنى.

#### 🎯 الملخص السريع
- `ForeignKey` تمثل علاقة واحد لكتير بين موديلين
- `on_delete=models.CASCADE` يحذف السجلات التابعة تلقائياً عند حذف السجل الأصلي
- `TextField` للنصوص الطويلة، `CharField` للنصوص القصيرة المحدودة
- `class Meta` + `verbose_name_plural` لتصحيح صيغة الجمع في لوحة الإدارة

#### 📚 التطبيق
بعد تعريف الموديل، لازم نكرر دورة الـ `migration` (Section 2.5) عشان الجدول الجديد يتخلق فعلياً.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن `CharField` و `TextField` نفس الشيء.

#### الفهم الصحيح ✅:
`CharField` مخصص للنصوص القصيرة وله حد أقصى إلزامي (`max_length`)، بينما `TextField` مخصص للنصوص الطويلة بلا حد أقصى محدد — ولذلك استُخدم `TextField` لمحتوى `Entry` الطويل و `CharField` لعنوان `Topic` القصير.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> class Entry(models.Model): """Something specific learned about a topic""" topic = models.ForeignKey(Topic,on_delete=models.CASCADE) text = models.TextField() date_added = models.DateTimeField(auto_now_add=True) class Meta: verbose_name_plural = 'entries' def __str__(self): """Return a string representation of the model.""" return self.text[:50] + "..."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل سطر في الكود + معنى العلاقة والحذف المتسلسل

</details>

---

### 2.5. Migrating the Entry Model (ترحيل موديل Entry)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.4"} -->

#### ⬅️ الربط مع السابق
عرّفنا موديل `Entry` جديد في 2.4، فلازم نكرر نفس دورة الـ migration اللي عملناها مع `Topic` (Section 2.2).

#### 💡 الفكرة الأساسية
**أي إضافة أو تعديل على الموديلات لازم يتبعها `makemigrations` ثم `migrate` من جديد.**

#### 💻 الكود
```bash
# Generate migration for the new Entry model
python manage.py makemigrations learning_logs
# Migrations for 'learning_logs':
#   0002_entry.py:
#     - Create model Entry

# Apply it to the database
python manage.py migrate
# Applying learning_logs.0002_entry... OK
```

#### شرح كل سطر:
1. `python manage.py makemigrations learning_logs` → يكتشف إن في موديل جديد (`Entry`) ما اتعملوش migration، ويولّد ملف `0002_entry.py` يوصف "إنشاء موديل Entry"
2. `python manage.py migrate` → يطبّق ملف `0002_entry.py` على `db.sqlite3` فعلياً، فيتكوّن جدول `Entry` جديد

#### 📖 الشرح
دي بالضبط نفس العملية اللي حصلت مع `Topic`، لكن دلوقتي على موديل `Entry`. لاحظ اسم ملف الـ migration الجديد `0002_entry.py` — الرقم بيزيد تسلسلياً مع كل تغيير، فـ Django بيقدر يتتبع تاريخ كل التغييرات اللي حصلت على قاعدة البيانات بالترتيب.

#### 🎯 الملخص السريع
- كل موديل جديد أو معدَّل = دورة `makemigrations` + `migrate` من جديد
- ملفات الـ migrations مرقّمة تسلسلياً (`0001_initial`, `0002_entry`, ...)
- Django بيحتفظ بتاريخ كامل للتغييرات على قاعدة البيانات

#### 📚 التطبيق
بعد ما جدول `Entry` بقى موجود، لازم نسجّله برضو في لوحة الإدارة (Section 2.6) عشان نقدر نضيف تدوينات منها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Because we've added a new model, we need to migrate the database again. This process will become quite familiar: you modify models.py, run the commands: python manage.py makemigrations learning_logs ... python manage.py migrate

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأمرين ومخرجاتهما وترقيم ملفات الـ migrations

</details>

---

### 2.6. Registering Entry with the Admin Site (تسجيل Entry في لوحة الإدارة)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.5"} -->

#### ⬅️ الربط مع السابق
جدول `Entry` موجود في قاعدة البيانات دلوقتي، لكن زي ما حصل مع `Topic`، لازم نسجّله صراحةً في `admin.py` عشان يظهر في لوحة الإدارة.

#### 💡 الفكرة الأساسية
**كل موديل جديد لازم سطر `register` منفصل خاص بيه في `admin.py`، حتى لو الموديل نفسه بالفعل موجود في قاعدة البيانات.**

#### 💻 الكود
```python
# admin.py
from django.contrib import admin
from learning_logs.models import Topic, Entry

admin.site.register(Topic)
admin.site.register(Entry)
```

#### شرح كل سطر:
1. `from learning_logs.models import Topic, Entry` → استيراد الموديلين الاثنين مع بعض في نفس السطر
2. `admin.site.register(Entry)` → السطر الجديد اللي بيسجّل موديل `Entry` عشان يظهر في `/admin/`

#### 📖 الشرح
بعد إضافة السطر ده، الرجوع لصفحة `/admin/` هيظهر قسم `Entries` جديد تحت `learning_logs` جنب `Topics`. الضغط على `Add` أو `Entries` ثم `Add entry` هيفتح فورم فيه `dropdown list` تختار منها الموضوع (زي "Chess")، وحقل نصي طويل تكتب فيه التدوينة.

#### 🎯 الملخص السريع
- كل موديل جديد يحتاج سطر `admin.site.register()` منفصل
- بعد التسجيل، `Entries` تظهر كقسم مستقل في `/admin/`
- إضافة تدوينة تتطلب اختيار `Topic` من قائمة منسدلة تلقائية (بسبب الـ `ForeignKey`)

#### 📚 التطبيق
بعد إدخال بيانات فعلية (موضوعين وثلاث تدوينات تقريباً)، نقدر نستكشفها برمجياً باستخدام `Django shell` (Section 2.7).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> We also need to register the Entry model. Here's what admin.py should look like now: from django.contrib import admin from learning_logs.models import Topic, Entry admin.site.register(Topic) admin.site.register(Entry) ... Click the Add =>, or click Entries, and Add entry. You should see a drop-down list to select the topic, Select Chess, and add an entry.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الكود + خطوات إضافة تدوينة من اللوحة

</details>

---

### 2.7. The Django Shell (الطرفية التفاعلية)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.6"} -->

#### ⬅️ الربط مع السابق
دلوقتي عندنا بيانات فعلية مدخلة عن طريق لوحة الإدارة (موضوعين وتدوينات). الخطوة الجاية إننا نتعلم إزاي نوصل لنفس البيانات دي برمجياً من غير المتصفح.

#### 💡 الفكرة الأساسية
**`Django shell` هي بيئة بايثون تفاعلية معاها كل موديلات مشروعك جاهزة، مفيدة جداً للاختبار السريع واستكشاف الأخطاء.**

#### 💻 الكود
```bash
python manage.py shell
```

```python
>>> from learning_logs.models import Topic
>>> Topic.objects.all()
<QuerySet [<Topic: chess>, <Topic: Rock Climbing>]>

>>> topics = Topic.objects.all()
>>> for topic in topics:
...     print(topic.id, topic)
...
1 Chess
2 Rock Climbing

>>> t = Topic.objects.get(id=1)
>>> t.text
'Chess'
>>> t.date_added
datetime.datetime(2015, 5, 28, 4, 39, 11, 989446, tzinfo=<UTC>)

>>> t.entry_set.all()
[<Entry: The opening is the first part of the game, roughly...>, <Entry: In the opening phase of the game, it's important t...>]
```

#### شرح كل سطر:
1. `python manage.py shell` → يفتح طرفية بايثون تفاعلية بس مع تحميل إعدادات المشروع، فتقدر تستورد الموديلات مباشرة
2. `Topic.objects.all()` → يرجّع كل السجلات الموجودة في جدول `Topic` كـ `QuerySet` (قائمة خاصة بـ Django)
3. `Topic.objects.get(id=1)` → يرجّع سجل واحد بس بناءً على شرط محدد (هنا `id=1`)
4. `t.entry_set.all()` → يرجّع كل الـ `Entry` المرتبطة بالموضوع `t` — الاسم `entry_set` بيتولد تلقائياً من Django بناءً على العلاقة `ForeignKey` اللي عرّفناها في `Entry`

#### 📖 الشرح
الـ shell أداة قيّمة جداً للتجربة السريعة من غير ما تحتاج تكتب كود view أو تفتح المتصفح. `objects.all()` بترجّع كل السجلات، و`objects.get()` بترجّع سجل واحد بشرط، و`entry_set.all()` بتستفيد من العلاقة العكسية (`reverse relationship`) اللي بيولّدها Django تلقائياً من كل `ForeignKey` — يعني بما إن `Entry` بيشاور على `Topic`، فـ `Topic` كمان بيقدر "يشوف" كل الـ `Entry` بتاعته عن طريق `entry_set`.

#### 🎯 الملخص السريع
- `python manage.py shell` يفتح بيئة تفاعلية محمّلة بإعدادات المشروع
- `Model.objects.all()` لكل السجلات، `Model.objects.get(...)` لسجل واحد بشرط
- `entry_set` اسم تلقائي للعلاقة العكسية من `Topic` إلى كل `Entry` التابعة له

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ليش `t.entry_set.all()` بترجع كل التدوينات المرتبطة بموضوع "Chess" تحديداً؟
> **لماذا هذا مهم؟** لأن فهم العلاقة العكسية دي أساسي عشان تقدر تبني views لاحقاً تعرض كل تدوينات موضوع معين على صفحته الخاصة.

#### 📚 التطبيق
مهارة استخدام الـ `shell` دي هتفيدك جداً لاحقاً وقت كتابة `views.py` اللي بيحتاج يجيب بيانات من قاعدة البيانات ويعرضها في صفحات.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Now that we've entered some data, we can examine that data programmatically through an interactive terminal session. This interactive environment is called the Django shell... >>> from learning_logs.models import Topic >>> Topic.objects.all() ... >>> t.entry_set.all() [<Entry: The opening is the first part of the game, roughly...>, <Entry: In the opening phase of the game, it's important t...>]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل أوامر الـ shell وناتجها ومعنى entry_set

</details>

---

### 3. Making Pages: The Learning Log Home Page (بناء الصفحة الرئيسية)

### 3.1. Mapping a URL (ربط الرابط)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.7"} -->

#### 📍 أين نحن الآن؟
دخلنا المرحلة الأخيرة: تحويل كل الإعداد اللي عملناه لصفحة ويب فعلية يشوفها المستخدم في المتصفح، بدل صفحة الترحيب الافتراضية بتاعة Django.

#### ⬅️ الربط مع السابق
لغاية دلوقتي كل تعاملنا كان من لوحة الإدارة أو الـ shell. الخطوة الجاية هي إننا نعرّف رابط (`URL`) مخصص للصفحة الرئيسية بدل الرابط الافتراضي.

#### 💡 الفكرة الأساسية
**كل صفحة في Django بتحتاج نمط `URL` يوصل الرابط بالدالة (`view`) اللي هتعالج الطلب.**

#### 💻 الكود
```python
# learning_log/urls.py (الملف العام للمشروع)
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('learning_logs.urls', namespace='learning_logs')),
]
```

```python
# learning_logs/urls.py (ملف جديد داخل الـ app نفسها)
"""Defines URL patterns for learning_logs."""
from django.conf.urls import url
from . import views

urlpatterns = [
    # Home page
    url(r'^$', views.index, name='index'),
]
```

#### شرح كل سطر:
1. `url(r'^admin/', include(admin.site.urls))` → أي رابط يبدأ بـ `admin/` يتحول تلقائياً لروابط لوحة الإدارة الجاهزة
2. `url(r'', include('learning_logs.urls', namespace='learning_logs'))` → أي رابط تاني في المشروع يتحول لملف `urls.py` منفصل داخل تطبيق `learning_logs`
3. `url(r'^$', views.index, name='index')` → النمط `r'^$'` معناه "الرابط الفاضي تماماً" (الصفحة الرئيسية)؛ عند مطابقته يتم استدعاء دالة `views.index`

#### 📖 الشرح
الفكرة إن Django بيتعامل مع الروابط على شكل "طبقات": ملف `urls.py` العام في المشروع بيوجّه لملف `urls.py` تاني داخل كل app، وده بيخلي كل app مسؤول عن روابطه الخاصة بشكل منظم ومنفصل. عرّفنا هنا ملف `urls.py` جديد بالكامل داخل مجلد `learning_logs` (لأنه ما كانش موجود أصلاً من غير ما نعمله)، وحطينا فيه نمط واحد بس لحد الآن: الرابط الفاضي (`r'^$'`) بيروح لدالة `index`.

#### 🎯 الملخص السريع
- الروابط في Django منظمة على طبقتين: `urls.py` عام + `urls.py` خاص بكل app
- `include()` بتوصل من ملف urls لآخر
- `r'^$'` نمط الرابط الفاضي (الصفحة الرئيسية)
- كل `url()` بتربط نمط برابط بدالة view معينة

#### 📚 التطبيق
دلوقتي محتاجين نكتب دالة `views.index` فعلياً (Section 3.2) عشان الرابط ده يشتغل بدل ما يرمي خطأ.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The base URL, http://localhost:8000/, returns the default Django site... We need to include the URLs for learning_logs: from django.conf.urls import include, url ... url(r'', include('learning_logs.urls', namespace='learning_logs')), ] ... """Defines URL patterns for learning_logs.""" from django.conf.urls import url from . import views urlpatterns = [ url(r'^$', views.index, name='index'), ]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل أنماط URL والفرق بين الملف العام وملف الـ app

</details>

---

### 3.2. Writing a View (كتابة الـ View)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1"} -->

#### ⬅️ الربط مع السابق
الرابط الرئيسي (`r'^$'`) دلوقتي بيشاور على دالة `views.index`، لكن الدالة دي لسه مش مكتوبة — الخطوة دي هي آخر حلقة في السلسلة.

#### 💡 الفكرة الأساسية
**الـ `view` هي دالة بايثون بتاخد الطلب (`request`) وترجّع استجابة، غالباً عن طريق ربط `template` بيانات معينة باستخدام `render()`.**

#### 💻 الكود
```python
# views.py
from django.shortcuts import render

def index(request):
    """The home page for Learning Log"""
    return render(request, 'learning_logs/index.html')
```

```html
<!-- learning_logs/templates/learning_logs/index.html -->
<p>
    Learning Log
</p>
<p>
    Learning Log helps you keep track of your learning, for
    any topic you're learning about.
</p>
```

#### شرح كل سطر:
1. `from django.shortcuts import render` → استيراد دالة `render`، وهي الطريقة المختصرة والشائعة لربط `request` بـ `template` وإرجاع استجابة HTML جاهزة
2. `def index(request):` → كل دالة `view` لازم تستقبل `request` كباراميتر أول إلزامي
3. `return render(request, 'learning_logs/index.html')` → بيدمج الطلب مع محتوى ملف `index.html` ويرجّع النتيجة كصفحة HTML كاملة للمتصفح

#### 📖 الشرح
دالة `index` هنا بسيطة قصداً — كل اللي بتعمله إنها بترجّع الـ template من غير ما تمرر أي بيانات إضافية معاه لسه (زي المواضيع أو التدوينات). المسار `'learning_logs/index.html'` بيفترض وجود مجلد `templates/learning_logs/` جوه مجلد الـ app، وده تنظيم قياسي في Django بيمنع تعارض أسماء الملفات لو عندك أكتر من app بنفس اسم template. محتوى `index.html` نفسه بسيط بالكامل — مجرد فقرتين HTML بعنوان ووصف قصير للموقع، لأن الهدف الأساسي دلوقتي هو التأكد إن السلسلة الكاملة (`URL → view → template`) شغّالة صح، قبل ما نضيف أي تنسيق أو تصميم.

#### ⚙️ الخطوات / الخوارزمية: تدفق طلب صفحة كاملة في Django
```algorithm
1 | المستخدم يفتح رابط | متصفح | يرسل HTTP request للسيرفر
2 | مطابقة الرابط | urls.py (العام ثم الخاص بالـ app) | يحدد أي view دالة هتستقبل الطلب
3 | تنفيذ الـ view | views.py | تجهّز البيانات (أو من غيرها) وتستدعي render()
4 | تحميل الـ template | render() + index.html | يدمج الطلب مع HTML الثابت
5 | إرجاع الاستجابة | المتصفح | يعرض الصفحة النهائية للمستخدم
```

#### 🎯 الملخص السريع
- كل view دالة بايثون تستقبل `request` وترجّع استجابة
- `render(request, template_path)` هي الطريقة الشائعة لربط view بـ template
- التسلسل الكامل: `URL pattern → view function → template`
- الصفحة الأولى تُبنى بسيطة قصداً للتأكد من سلامة التدفق قبل التصميم

#### 📚 التطبيق
بعد التأكد إن الصفحة الرئيسية شغّالة، المحاضرات الجاية هتوسّع الـ view عشان يمرر بيانات فعلية (زي قائمة المواضيع) للـ template، وهتضيف صفحات جديدة لعرض تفاصيل كل موضوع وتدويناته.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن ترتيب البناء لازم يكون: تصميم/تنسيق الصفحة أولاً، ثم الربط بالبيانات لاحقاً.

#### الفهم الصحيح ✅:
المحاضرة أكدت إن التدفق الصحيح هو: تأكد إن الوظيفة الأساسية شغالة (URL + view + template بسيط) أولاً، والتزويق يجي بعد كده على تطبيق شغّال — "تطبيق شغال هو اللي متعة تزويقه، لكن تطبيق شكله حلو وما بيشتغلش مفيدش."

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A view function takes in information from a request, prepares the data needed to generate a page, and then sends the data back to the browser, often by using a template that defines what the page will look like... def index(request): """The home page for Learning Log""" return render(request, 'learning_logs/index.html') ... Inside the inner learning_logs folder, make a new file called index.html.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كود الـ view والـ template + خطوات تدفق الطلب كاملة

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium / hard

### السؤال 1 (medium)
إيه الفرق الجوهري بين `python manage.py makemigrations` و `python manage.py migrate`؟

أ) الأمرين بيعملوا نفس الحاجة بالظبط
ب) `makemigrations` يولّد ملف يوصف التغيير المطلوب، و`migrate` ينفّذ التغيير فعلياً على قاعدة البيانات
ج) `migrate` يولّد ملف الوصف، و`makemigrations` ينفّذه على قاعدة البيانات
د) `makemigrations` يحذف قاعدة البيانات بالكامل ويعيد بناءها

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** بالظبط زي ما شفنا في Section 2.2 و 2.5، `makemigrations` بتكتب "الوصفة" في ملف بايثون، و`migrate` هي اللي بتطبّق الوصفة فعلياً على `db.sqlite3`
- ❌ **الخيار أ:** لو كانوا بيعملوا نفس الحاجة، ما كناش هنحتاج نكتبهم الاتنين كل مرة
- ❌ **الخيار ج:** عكس الترتيب الصحيح تماماً
- ❌ **الخيار د:** الأمرين ما بيحذفوش قاعدة البيانات، بيضيفوا/يعدلوا جداول

---

### السؤال 2 (medium)
ليش النقطة (`.`) في آخر أمر `django-admin.py startproject learning_log .` مهمة؟

أ) هي مجرد رمز اختياري وما لهاش أي تأثير
ب) بتخلي Django ينشئ الملفات في مجلد فرعي جديد اسمه learning_log جوه learning_log
ج) بتخلي Django يحط manage.py وملفات الإعداد في نفس المجلد الحالي بدل مجلد فرعي إضافي
د) بتحدد اسم قاعدة البيانات اللي هتتنشئ

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** زي ما وضّحت المحاضرة، النقطة بتمنع تكوين مجلد فرعي زيادة، وده بيتجنب مشاكل وقت النشر
- ❌ **الخيار أ:** المحاضرة نصّت صراحة على تحذير خاص بيها
- ❌ **الخيار ب:** ده اللي بيحصل لو **نسيت** النقطة، مش العكس
- ❌ **الخيار د:** لا علاقة لها بقاعدة البيانات

---

### السؤال 3 (hard)
في الكود التالي:
```python
topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
```
إيه اللي بيحصل بالظبط لو تم حذف سجل `Topic` معيّن؟

أ) هيرفض Django عملية الحذف طول ما فيه Entries مرتبطة به
ب) هتفضل الـ Entries المرتبطة موجودة لكن بحقل `topic` فاضي (null)
ج) هتتحذف كل الـ Entries المرتبطة بيه تلقائياً
د) هيتحول الـ Entries المرتبطة لموضوع افتراضي جديد

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `on_delete=models.CASCADE` معناها بالحرف "احذف بالتتالي" — أي حذف للموديل الأصل يحذف كل السجلات المرتبطة تلقائياً
- ❌ **الخيار أ:** ده سلوك خيار مختلف اسمه `PROTECT`، مش `CASCADE`
- ❌ **الخيار ب:** ده سلوك خيار `SET_NULL`، ويحتاج الحقل يكون `null=True` أصلاً
- ❌ **الخيار د:** مفيش سلوك افتراضي زي كده في Django

---

### السؤال 4 (medium)
إيه اللي بيحصل لو نسيت كتابة دالة `__str__` في موديل `Topic`؟

أ) Django مش هيقدر ينشئ الجدول في قاعدة البيانات خالص
ب) هيظهر خطأ وقت الـ migration
ج) لما تطبع أو تعرض سجل من الموديل، هيظهر تمثيل غير مفهوم زي `<Topic object (1)>` بدل النص الفعلي
د) لوحة الإدارة مش هتقدر تعرض قسم Topics أصلاً

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** دي بالظبط النتيجة المذكورة في الشرح — `__str__` مسؤولة عن التمثيل النصي المفهوم بس، مش عن عمل الموديل نفسه
- ❌ **الخيار أ:** `__str__` مش لها علاقة بإنشاء الجدول، الجدول هيتخلق عادي
- ❌ **الخيار ب:** الـ migration بتشتغل عادي بدون `__str__`
- ❌ **الخيار د:** القسم هيظهر لكن أسماء السجلات جواه هتبقى غير واضحة

---

### السؤال 5 (medium)
إيه أول خطوة صحيحة عشان تعرف Django إن `app` معيّن (زي learning_logs) جزء فعلي من المشروع؟

أ) كتابة موديل جديد في models.py
ب) إضافة اسم الـ app داخل قائمة `INSTALLED_APPS` في settings.py
ج) تشغيل python manage.py runserver
د) إنشاء ملف admin.py يدوياً

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** زي ما شفنا في Section 2.2، تسجيل الـ app في `INSTALLED_APPS` خطوة إلزامية قبل ما Django "يعترف" فعلياً بوجوده كجزء من المشروع
- ❌ **الخيار أ:** ممكن تكتب موديل لكن Django مش هيتعامل معاه صح لو الـ app مش مسجّل
- ❌ **الخيار ج:** `runserver` بس لتشغيل السيرفر، مالوش علاقة بتسجيل الـ apps
- ❌ **الخيار د:** `admin.py` بيتولّد تلقائياً مع `startapp`، ومش هو اللي بيسجّل الـ app في المشروع

---

### السؤال 6 (easy-medium)
إيه الفرق بين `CharField` و `TextField` في Django models؟

أ) CharField للأرقام، TextField للنصوص
ب) CharField نص قصير له حد أقصى إلزامي (max_length)، TextField نص طويل بلا حد أقصى محدد
ج) مفيش فرق، الاتنين نفس الشيء
د) CharField مخصص فقط لحقول التاريخ

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** زي ما استخدمنا `CharField(max_length=200)` لـ `text` في Topic (نص قصير)، و`TextField()` بدون حد أقصى لـ `text` في Entry (نص طويل)
- ❌ **الخيار أ:** الاتنين لحقول نصية مش أرقام
- ❌ **الخيار ج:** فيه فرق واضح في الاستخدام والحد الأقصى
- ❌ **الخيار د:** حقل التاريخ هو `DateTimeField` مش `CharField`

---

### السؤال 7 (hard)
في `learning_logs/urls.py`:
```python
urlpatterns = [
    url(r'^$', views.index, name='index'),
]
```
النمط `r'^$'` بيعني إيه بالظبط؟

أ) أي رابط في المشروع بدون استثناء
ب) الرابط الفاضي تماماً (الصفحة الرئيسية للـ app)
ج) رابط يبدأ بكلمة admin
د) رابط لملف index.html مباشرة

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `^` معناها بداية النص و`$` معناها نهاية النص، فـ `r'^$'` معناها "نص فاضي من البداية للنهاية" — يعني الرابط الأساسي (root) للـ app
- ❌ **الخيار أ:** لو كانت أي رابط، ما كناش محتاجين أنماط إضافية لصفحات تانية
- ❌ **الخيار ج:** رابط الـ admin معرّف بشكل منفصل في urls.py العام
- ❌ **الخيار د:** الرابط بيتحول لدالة view، والـ view هي اللي بتستدعي index.html بعدين

---

### السؤال 8 (medium)
إيه الترتيب الصحيح للمراحل التلاتة اللي أي صفحة في Django بتعتمد عليها؟

أ) template → view → URL
ب) view → template → URL
ج) URL → view → template
د) URL → template → view

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** المستخدم بيطلب رابط (URL)، فيتم توجيهه لدالة (view)، اللي بدورها بتستدعي ملف العرض (template) وترجّع النتيجة
- ❌ **باقي الخيارات:** كلها بترتيب مختلف عن التدفق الفعلي اللي شرحته المحاضرة

---

### السؤال 9 (medium)
إيه الغرض من `class Meta: verbose_name_plural = 'entries'` في موديل Entry؟

أ) تحديد اسم الجدول في قاعدة البيانات
ب) تحديد نوع البيانات لحقل معين
ج) تصحيح الجمع الافتراضي الخطأ (Entrys) ليصبح entries في لوحة الإدارة
د) ربط الموديل بموديل Topic

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** بدون هذا السطر، Django كان هيعرض جمع "Entry" بشكل خاطئ لغوياً كـ "Entrys" بدل الصيغة الصحيحة "entries"
- ❌ **الخيار أ:** اسم الجدول بيتحدد تلقائياً من اسم التطبيق والموديل، مش من verbose_name_plural
- ❌ **الخيار ب:** ده مش حقل بيانات، هو إعداد وصفي للموديل نفسه
- ❌ **الخيار د:** الربط بـ Topic بيحصل عن طريق `ForeignKey` مش `Meta`

---

### السؤال 10 (medium)
لو كتبت `Topic.objects.get(id=1)` في الـ Django shell، إيه اللي هيرجع؟

أ) قائمة بكل سجلات Topic
ب) سجل واحد بالظبط له id يساوي 1
ج) خطأ لأن get() مش موجودة في Django
د) عدد سجلات Topic الكلي

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `objects.get(...)` مصممة عشان ترجّع سجل واحد بالظبط بناءً على شرط، بعكس `objects.all()` اللي بترجّع كل السجلات
- ❌ **الخيار أ:** ده سلوك `objects.all()` مش `get()`
- ❌ **الخيار ج:** `get()` دالة أساسية وموجودة في كل Django QuerySet Manager
- ❌ **الخيار د:** لعدّ السجلات نستخدم `objects.count()` مش `get()`

---

### السؤال 11 (hard)
في الـ Django shell، كتبنا `t = Topic.objects.get(id=1)` ثم `t.entry_set.all()`. من أين جاء الاسم `entry_set` تلقائياً؟

أ) اسم عشوائي مفروض تكتبه إنت يدوياً في models.py
ب) اسم متولّد تلقائياً من Django بناءً على العلاقة العكسية لحقل ForeignKey في موديل Entry
ج) اسم دالة عامة في كل موديلات Django بغض النظر عن العلاقات
د) اسم بيتحدد من ترتيب الحقول في قاعدة البيانات

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** بما إن `Entry` بيحتوي `ForeignKey(Topic)`، فـ Django تلقائياً بيضيف علاقة عكسية اسمها `<lowercase_model_name>_set` على موديل `Topic` — أي `entry_set`
- ❌ **الخيار أ:** الاسم مش عشوائي وليس مطلوب كتابته يدوياً بشكل افتراضي
- ❌ **الخيار ج:** ده مش موجود إلا لو فيه علاقة ForeignKey فعلاً تربط الموديلين
- ❌ **الخيار د:** لا علاقة له بترتيب الحقول

---

### السؤال 12 (medium)
عايز تفعّل بيئة افتراضية اسمها `ll_env` على نظام Windows، إيه الأمر الصحيح؟

أ) `source ll_env/bin/activate`
ب) `ll_env\Scripts\activate`
ج) `activate ll_env`
د) `python ll_env activate`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** بالظبط زي ما وضّحت المحاضرة في Section 1.4، ده الأمر الصحيح لتفعيل البيئة على Windows
- ❌ **الخيار أ:** ده أمر التفعيل على أنظمة Linux/Mac، مش Windows
- ❌ **الخيار ج:** صياغة غير صحيحة في Django/venv
- ❌ **الخيار د:** صياغة غير موجودة أصلاً

---

### السؤال 13 (medium)
ما هي وظيفة أمر `python manage.py runserver`؟

أ) ينشئ قاعدة بيانات جديدة
ب) يشغّل سيرفر تطوير محلي لعرض المشروع في المتصفح
ج) ينشئ حساب superuser جديد
د) ينشئ app جديد داخل المشروع

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** كما رأينا في Section 1.8، الأمر بيشغّل development server على `http://127.0.0.1:8000/`
- ❌ **الخيار أ:** إنشاء قاعدة البيانات يتم بأمر `migrate`
- ❌ **الخيار ج:** إنشاء superuser يتم بأمر `createsuperuser`
- ❌ **الخيار د:** إنشاء app جديد يتم بأمر `startapp`

---

### السؤال 14 (hard)
لماذا يستخدم موديل Entry الحقل `date_added = models.DateTimeField(auto_now_add=True)` بدل ما نطلب من المستخدم يكتب التاريخ يدوياً؟

أ) لأن Django مش بيدعم إدخال تاريخ يدوي أصلاً
ب) عشان يضمن تسجيل تاريخ ووقت الإنشاء تلقائياً وبدقة، بدون الاعتماد على إدخال المستخدم أو احتمالية الخطأ
ج) عشان يمنع حذف السجل لاحقاً
د) عشان يربط السجل بموديل Topic تلقائياً

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `auto_now_add=True` بيخلي Django يسجّل التاريخ والوقت الحاليين تلقائياً أول ما يتم إنشاء السجل، وده أدق وأضمن من الاعتماد على إدخال يدوي
- ❌ **الخيار أ:** Django بيدعم كل أنواع إدخال التاريخ، لكن هنا اخترنا التلقائي لدقة أكبر
- ❌ **الخيار ج:** لا علاقة لهذا الحقل بمنع الحذف
- ❌ **الخيار د:** الربط بـ Topic يتم عن طريق `ForeignKey` منفصل تماماً

---

### السؤال 15 (medium)
أي ملف هو المسؤول عن "تسجيل" موديل معين عشان يظهر في لوحة الإدارة (admin site)؟

أ) models.py
ب) urls.py
ج) admin.py
د) views.py

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** استخدام `admin.site.register(Model)` داخل `admin.py` هو ما يجعل الموديل يظهر فعلياً في `/admin/`
- ❌ **الخيار أ:** `models.py` يعرّف بنية البيانات فقط، لا علاقة له بلوحة الإدارة مباشرة
- ❌ **الخيار ب:** `urls.py` مسؤول عن ربط الروابط بالدوال، لا علاقة له بالتسجيل في الإدارة
- ❌ **الخيار د:** `views.py` يحتوي منطق الصفحات العادية، لا الإدارة

---

### السؤال 16 (medium)
ماذا يحدث تحديداً عند تشغيل `python manage.py createsuperuser`؟

أ) ينشئ موديل جديد اسمه superuser
ب) يبدأ حواراً تفاعلياً لإنشاء حساب مستخدم بكامل الصلاحيات للدخول على لوحة الإدارة
ج) يفعّل الـ virtual environment
د) يولّد ملف migration جديد

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** كما رأينا في Section 2.3، الأمر يسأل عن username وemail وpassword وينشئ حساب مدير كامل الصلاحيات
- ❌ **الخيار أ:** لا يوجد موديل باسم superuser، هذا حساب داخل موديل المستخدمين الافتراضي
- ❌ **الخيار ج:** تفعيل البيئة الافتراضية يتم بأمر منفصل (`activate`)
- ❌ **الخيار د:** ملفات الـ migration تتولد بأمر `makemigrations`

---

## الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما هو الـ `virtual environment` وليش نستخدمه؟
**A:** بيئة بايثون معزولة خاصة بمشروع معيّن، فيها نسخها الخاصة من المكتبات، عشان تمنع تعارض النسخ بين مشاريع مختلفة على نفس الجهاز.

### البطاقة 2
**Q2:** ما الأمر المستخدم لإنشاء بيئة افتراضية اسمها `ll_env`؟
**A:** `python -m venv ll_env`

### البطاقة 3
**Q3:** ما الفرق بين `django-admin startproject` و `python manage.py startapp`؟
**A:** الأول ينشئ هيكل المشروع الكامل (settings, urls, wsgi, manage.py)، والثاني ينشئ تطبيق (app) فرعي جديد داخل مشروع موجود بالفعل.

### البطاقة 4
**Q4:** ما وظيفة ملف `manage.py`؟
**A:** هو الملف الذي تُشغَّل من خلاله كل أوامر إدارة المشروع، مثل `runserver`, `migrate`, `makemigrations`, `createsuperuser`.

### البطاقة 5
**Q5:** ماذا يعني `models.CharField(max_length=200)`؟
**A:** حقل نصي قصير، بحد أقصى 200 حرف كطول للنص المسموح به.

### البطاقة 6
**Q6:** ما وظيفة `ForeignKey` في Django models؟
**A:** تمثل علاقة "واحد لكتير" بين موديلين، وتربط كل سجل في موديل بسجل واحد محدد في موديل آخر.

### البطاقة 7
**Q7:** ماذا يعني `on_delete=models.CASCADE`؟
**A:** عند حذف السجل الأصل (مثل Topic)، تُحذف تلقائياً كل السجلات المرتبطة به (مثل كل Entries التابعة له).

### البطاقة 8
**Q8:** لماذا نحتاج دالة `__str__` في كل موديل؟
**A:** لتحديد التمثيل النصي المفهوم للسجل عند طباعته أو عرضه، بدلاً من نص غير واضح زي `<Model object (1)>`.

### البطاقة 9
**Q9:** ما الفرق بين `makemigrations` و `migrate`؟
**A:** `makemigrations` تولّد ملف يصف التغيير المطلوب على قاعدة البيانات، بينما `migrate` تنفّذ هذا التغيير فعلياً على قاعدة البيانات.

### البطاقة 10
**Q10:** كيف تجعل موديلاً يظهر في لوحة إدارة Django؟
**A:** بإضافة سطر `admin.site.register(ModelName)` داخل ملف `admin.py`.

### البطاقة 11
**Q11:** ما وظيفة `python manage.py shell`؟
**A:** فتح بيئة بايثون تفاعلية محمّلة بإعدادات المشروع، تتيح استيراد الموديلات مباشرة واستكشاف البيانات برمجياً.

### البطاقة 12
**Q12:** ما الفرق بين `Model.objects.all()` و `Model.objects.get()`؟
**A:** `all()` ترجّع كل السجلات كـ QuerySet، بينما `get()` ترجّع سجلاً واحداً بالضبط بناءً على شرط محدد.

### البطاقة 13
**Q13:** ما هي المراحل الثلاث الأساسية لبناء أي صفحة في Django؟
**A:** تعريف `URL` → كتابة `view` → إنشاء `template`.

### البطاقة 14
**Q14:** ما وظيفة الدالة `render()` داخل `views.py`؟
**A:** تدمج طلب المستخدم (`request`) مع محتوى ملف `template` معين، وترجّع صفحة HTML كاملة كاستجابة للمتصفح.

### البطاقة 15
**Q15:** ما معنى نمط الرابط `r'^$'` في `urlpatterns`؟
**A:** يمثل الرابط الفارغ تماماً، أي الصفحة الرئيسية (root) للتطبيق أو المشروع.

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `virtual environment` | بيئة بايثون معزولة خاصة بمشروع معيّن |
| `Django project` | الحاوية الكبيرة اللي فيها إعدادات المشروع العامة |
| `Django app` | وحدة وظيفية مستقلة داخل المشروع تقوم بمهمة محددة |
| `model` | كلاس بايثون يرث من `models.Model` ويمثل جدول قاعدة بيانات |
| `migration` | ملف يصف تغييراً معيناً على بنية قاعدة البيانات |
| `ForeignKey` | نوع حقل يمثل علاقة "واحد لكتير" بين موديلين |
| `admin site` | لوحة إدارة جاهزة تلقائياً من Django لإدارة الموديلات المسجَّلة |
| `Django shell` | طرفية بايثون تفاعلية محمّلة بإعدادات وموديلات المشروع |
| `view` | دالة بايثون تستقبل `request` وتُرجع استجابة (غالباً صفحة HTML) |
| `template` | ملف HTML يحدد شكل الصفحة المُرسلة للمتصفح |
| `URL pattern` | نمط يصف شكل الرابط ويربطه بدالة view محددة |
| `render()` | دالة تدمج `request` مع `template` وترجّع استجابة HTML كاملة |

### 🔑 المكتبات والأدوات
| الأداة | الوظيفة | متى تستخدم |
| --- | --- | --- |
| `venv` | إنشاء بيئات افتراضية (مدمجة في بايثون) | عند بداية أي مشروع Python جديد |
| `virtualenv` | بديل خارجي لـ `venv` | عند إصدارات بايثون قديمة أو أنظمة لا تدعم venv |
| `pip` | تركيب حزم بايثون | تركيب Django وأي مكتبة أخرى داخل البيئة |
| `django-admin` | إنشاء مشروع Django جديد | مرة واحدة عند بداية أي مشروع |
| `manage.py` | تشغيل أوامر إدارة المشروع | طوال دورة حياة المشروع (migrate, runserver...) |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لازم تتأكد إن البيئة الافتراضية مفعّلة `(ll_env)` قبل أي أمر `pip` أو `python manage.py` |
| 2 | لا تنسَ النقطة (`.`) في نهاية أمر `startproject` لتجنب مشاكل النشر لاحقاً |
| 3 | أي تغيير على الموديلات يتطلب دائماً `makemigrations` ثم `migrate` بهذا الترتيب |
| 4 | تسجيل الـ app في `INSTALLED_APPS` خطوة إلزامية قبل ظهور تأثيره الكامل في المشروع |
| 5 | كل موديل يحتاج تسجيلاً منفصلاً في `admin.py` عبر `admin.site.register()` حتى يظهر في لوحة الإدارة |
| 6 | ابنِ الوظيفة الأساسية أولاً (URL + view + template بسيط)، ثم صمّم الشكل لاحقاً |

### 🔑 قاموس المصطلحات
| المصطلح | المعنى |
| --- | --- |
| `spec` (specification) | وصف واضح لوظيفة المشروع قبل البدء بالكود |
| `superuser` | مستخدم بكامل الصلاحيات للدخول على لوحة إدارة Django |
| `QuerySet` | نوع بيانات خاص في Django يمثل مجموعة نتائج من قاعدة البيانات |
| `namespace` | اسم مستخدَم لتمييز مجموعة روابط تابعة لـ app معيّن |
| `verbose_name_plural` | إعداد داخل `class Meta` لتحديد صيغة الجمع الصحيحة لغوياً |

### 🔑 الخطوات السريعة

#### إعداد مشروع Django من الصفر
```algorithm
1 | إنشاء مجلد المشروع | md / mkdir | مجلد فارغ للمشروع
2 | إنشاء بيئة افتراضية | python -m venv ll_env | مجلد بيئة معزولة
3 | تفعيل البيئة | ll_env\Scripts\activate | (ll_env) تظهر في السطر
4 | تركيب Django | pip install django | Django مثبت داخل البيئة
5 | إنشاء المشروع | django-admin.py startproject learning_log . | ملفات settings/urls/wsgi + manage.py
6 | بناء قاعدة البيانات | python manage.py migrate | db.sqlite3 بالجداول الأساسية
7 | تشغيل السيرفر | python manage.py runserver | صفحة "install worked successfully"
```

#### إضافة موديل جديد بشكل كامل
```algorithm
1 | إنشاء الـ app (مرة واحدة) | python manage.py startapp <name> | مجلد app جاهز
2 | تسجيل الـ app | INSTALLED_APPS في settings.py | Django يتعرف على الـ app
3 | تعريف الموديل | class Model(models.Model) في models.py | تعريف الحقول و __str__
4 | كتابة خطة التغيير | python manage.py makemigrations <app> | ملف migration جديد
5 | تنفيذ التغيير | python manage.py migrate | جدول جديد في قاعدة البيانات
6 | تسجيل في لوحة الإدارة | admin.site.register(Model) في admin.py | الموديل يظهر في /admin/
```

#### بناء صفحة ويب جديدة (URL → view → template)
```algorithm
1 | تعريف نمط الرابط | url() في urls.py الخاص بالـ app | ربط الرابط بدالة view
2 | توصيل الملف العام | include() في urls.py العام للمشروع | يوجّه لملف urls.py الخاص بالـ app
3 | كتابة دالة الـ view | def view_name(request): ... في views.py | تحضير البيانات واستدعاء render()
4 | إنشاء ملف الـ template | templates/<app>/<name>.html | تحديد شكل الصفحة النهائي
```

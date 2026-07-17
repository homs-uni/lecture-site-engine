# المحاضرة 1 — Activity & Intents (المكوّن Activity والنوايا)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** `Activity Lifecycle`، `Explicit Intent`، `Implicit Intent`، `Intent Filter`، `Intent Resolution`

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| App Fundamentals | `AndroidManifest.xml`, `Activity class` | فهم بنية التطبيق العامة |
| Activity & Intents ← أنت هنا | `Activity`, `Intent`, `Intent Filter` | التنقل بين الشاشات وربط التطبيقات ببعضها |
| Compose UI | `@Composable`, `Modifier` | بناء واجهة داخل كل Activity |
| Compose State & Navigation | `NavController`, `remember` | تنقل حديث يعتمد على نفس مفاهيم Intent |

> **نوع هذه المحاضرة:** App Fundamentals / Activity & Intents — نظرية بحتة (لا يوجد Compose)، تركّز على `Activity`, دورة الحياة, و`Intent`.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. تعريف Activity

#### النص الأصلي يقول (English):
> The activity serves as the entry point for an app's interaction with the user. You implement an activity as a subclass of the Activity class. The Android system initiates code in an Activity instance by invoking specific callback methods that correspond to specific stages of its lifecycle.

#### الترجمة الحرفية:
> الـ `Activity` تعمل كنقطة الدخول لتفاعل التطبيق مع المستخدم. تُنفَّذ الـ `Activity` كصنف فرعي (subclass) من صنف `Activity`. نظام أندرويد يُشغّل الكود داخل نسخة `Activity` عن طريق استدعاء دوال رد نداء (callback methods) محددة تتوافق مع مراحل محددة من دورة حياتها.

#### الشرح المبسّط:
الفكرة هنا أن `Activity` هي الباب الذي يدخل منه المستخدم للتفاعل مع تطبيقك — بدونها لا يوجد شيء يُعرض على الشاشة أو يستقبل ضغطات المستخدم. هي موجودة لأن أندرويد يحتاج وحدة منظمة تمثل "شاشة واحدة" حتى يستطيع النظام إدارتها (فتحها، إيقافها، إغلاقها) بشكل منفصل عن باقي التطبيق. ترتبط هذه الفكرة بكل ما سيأتي لاحقاً لأن كل مفهوم في هذه المحاضرة (دورة الحياة، الـ Intent) يدور حول كيفية التعامل مع هذه الـ Activity. تشبيه يومي: تخيل `Activity` كغرفة في بيت — أنت (النظام) تدخل الغرفة (`onCreate`/`onStart`)، تتفاعل فيها (`onResume`)، ثم تخرج منها (`onPause`/`onStop`) وربما تهدمها لاحقاً (`onDestroy`)؛ مثال عملي: شاشة "كتابة إيميل جديد" في تطبيق بريد هي `Activity` واحدة.

**لماذا؟** لأن أندرويد نظام تشغيل متعدد المهام تدير فيه شاشات كثيرة من تطبيقات مختلفة، فيحتاج طريقة موحّدة (Activity + Lifecycle) لمعرفة متى يظهر تطبيقك ومتى يختفي حتى يوزّع الموارد بذكاء.

---

### 2. واجهة المستخدم والشاشة الواحدة

#### النص الأصلي يقول (English):
> An activity provides the window in which the app draws its UI. Generally, one activity implements one screen in an app. Most apps contain multiple screens, which means they comprise multiple activities. Typically, one activity in an app is specified as the main activity, which is the first screen to appear when the user launches the app.

#### الترجمة الحرفية:
> الـ `Activity` توفّر النافذة التي يرسم فيها التطبيق واجهة المستخدم الخاصة به. عموماً، تُنفّذ `Activity` واحدة شاشة واحدة في التطبيق. معظم التطبيقات تحتوي على شاشات متعددة، مما يعني أنها تتكون من عدة `Activity`. عادةً، تُحدَّد `Activity` واحدة في التطبيق باعتبارها `main activity`، وهي أول شاشة تظهر عندما يُطلق المستخدم التطبيق.

#### الشرح المبسّط:
كل `Activity` تمثّل "نافذة" رسم واحدة، وغالباً كل شاشة في التطبيق = `Activity` مستقلة، لذلك التطبيقات الحقيقية متعددة الشاشات تحتوي على عدة `Activity` تعمل معاً. هذا مهم لأنه يفصل مسؤوليات كل شاشة عن الأخرى، فمثلاً شاشة تسجيل الدخول منفصلة تماماً في الكود عن شاشة الإعدادات. يرتبط هذا بالفكرة السابقة لأنه يوضح أن التطبيق الواحد = مجموعة من "الغرف" (Activities) وليس غرفة واحدة فقط. تشبيه يومي: التطبيق كبيت متعدد الغرف، وكل غرفة (Activity) لها باب دخول رئيسي واحد (`main activity`) هو أول ما تراه عند الدخول للبيت؛ مثال عملي: تطبيق بريد إلكتروني فيه `Activity` لصندوق الوارد (main) و`Activity` أخرى لكتابة رسالة.

**لماذا؟** لأن تحديد "شاشة رئيسية" يعطي النظام نقطة انطلاق واضحة عند تشغيل التطبيق من قائمة التطبيقات (launcher).

---

### 3. الانتقال بين الأنشطة والتسجيل في Manifest

#### النص الأصلي يقول (English):
> Each activity can then start another activity in order to perform different actions. Example, the main activity in a simple e-mail app may provide the screen that shows an e-mail inbox. From there, the main activity might launch other activities that provide screens for tasks like writing e-mails and opening individual e-mails. To use activities in your app, you must register information about them in the app's manifest, and you must manage activity lifecycles appropriately.

#### الترجمة الحرفية:
> يمكن لكل `Activity` أن تبدأ `Activity` أخرى لتنفيذ إجراءات مختلفة. مثال: قد توفّر `Activity` الرئيسية في تطبيق بريد بسيط الشاشة التي تعرض صندوق الوارد. من هناك، قد تُطلق `Activity` الرئيسية أنشطة أخرى توفّر شاشات لمهام مثل كتابة الرسائل وفتح رسائل منفردة. لاستخدام الأنشطة في تطبيقك، يجب تسجيل معلومات عنها في ملف manifest الخاص بالتطبيق، ويجب إدارة دورات حياة الأنشطة بشكل مناسب.

#### الشرح المبسّط:
هذه الفقرة تُظهر آلية عمل التطبيق فعلياً: نشاط يبدأ نشاطاً آخر ليكمل مهمة محددة، وهذا هو أساس التنقل في أندرويد. كل نشاط يجب تسجيله في `AndroidManifest.xml` وإلا فلن يستطيع النظام التعرف عليه أو تشغيله، تماماً كما يجب تسجيل غرفة جديدة في مخطط البيت قبل بنائها. يرتبط هذا مباشرة بما سبق لأنه يفسّر "كيف" تنتقل من الشاشة الرئيسية للشاشات الأخرى، وهو تمهيد مباشر لموضوع "Configuring The Manifest" و"Intents" اللاحقين. تشبيه يومي: كأنك في مطعم تطلب من النادل (Activity الحالية) أن يناديك نادلاً آخر (Activity جديدة) لتقديم طبق مختلف؛ مثال عملي: الضغط على "Compose" في تطبيق بريد يفتح `Activity` جديدة لكتابة رسالة.

**لماذا؟** لأن النظام يحتاج معرفة مسبقة (عبر manifest) بكل الأنشطة الموجودة في التطبيق حتى يستطيع تشغيلها بأمان وبصلاحيات صحيحة.

---

### 4. إعلان الأنشطة في Manifest

#### النص الأصلي يقول (English):
> For your app to be able to use activities, you must declare the activities, and certain of their attributes, in the manifest. To declare your activity, open your manifest file and add an <activity> element as a child of the <application> element. The only required attribute for this element is android:name, which specifies the class name of the activity. You can also add attributes that define activity characteristics such as label, icon, or UI theme.

#### الترجمة الحرفية:
> لكي يستطيع تطبيقك استخدام الأنشطة، يجب عليك إعلان الأنشطة، وبعض خصائصها، في ملف manifest. لإعلان نشاطك، افتح ملف manifest وأضف عنصر `<activity>` كعنصر ابن لعنصر `<application>`. الخاصية الوحيدة المطلوبة لهذا العنصر هي `android:name`، والتي تحدد اسم صنف النشاط. يمكنك أيضاً إضافة خصائص تحدد صفات النشاط مثل التسمية أو الأيقونة أو ثيم الواجهة.

#### الشرح المبسّط:
الإعلان في `Manifest` هو خطوة إلزامية وليست اختيارية — أي `Activity` غير مُعلنة سيرفض النظام تشغيلها وتحدث `ActivityNotFoundException`. الخاصية الإلزامية الوحيدة `android:name` لأنها تربط بين الإعلان في XML والكود الفعلي (الصنف Kotlin)، أما بقية الخصائص (label, icon, theme) اختيارية لتحسين الشكل والتجربة. يرتبط هذا بالفقرة السابقة كتطبيق عملي مباشر لعبارة "يجب تسجيل معلومات عنها في manifest". تشبيه يومي: كأنك تسجّل اسم موظف جديد في سجل الشركة (اسمه إلزامي) بينما صورته الشخصية أو لقبه الوظيفي اختياري؛ مثال عملي أدناه.

**لماذا؟** لأن أندرويد نظام أمني صارم — أي مكوّن غير مُعلن رسمياً يُعتبر غير موجود من منظور النظام، فلا يمكن استدعاؤه.

#### 💻 الكود: إعلان Activity في Manifest

#### ما هذا الكود؟
> تسجيل نشاط باسم `ExampleActivity` داخل ملف الـ manifest كي يتعرف عليه نظام أندرويد.

```xml
<!-- Root manifest element -->
<manifest ... >
  <!-- Application element wraps all app components -->
  <application ... >
    <!-- Declare the activity by its class name -->
    <activity android:name=".ExampleActivity" />
    ...
  </application>
  ...
</manifest>
```

#### شرح كل سطر:
1. `<manifest ... >` → العنصر الجذري لملف الوصف — يحتوي كل معلومات التطبيق.
2. `<application ... >` → يمثّل التطبيق نفسه ويحتضن كل المكوّنات (Activities, Services...).
3. `<activity android:name=".ExampleActivity" />` → يسجّل نشاطاً واحداً — الاسم يبدأ بنقطة لأنه اختصار لحزمة التطبيق الأساسية.

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد Kotlin هنا؛ هذا كود XML ضمن ملف `AndroidManifest.xml`.

**الناتج المتوقع (لقطة الشاشة):**
> لا شيء يظهر مباشرة على الشاشة؛ النتيجة هي أن النظام أصبح "يعرف" بوجود `ExampleActivity` ويمكنه تشغيلها.

---

### 5. Intent Filters — الغاية منها

#### النص الأصلي يقول (English):
> Intent filters provide the ability to launch an activity based not only on an explicit request, but also an implicit one. An explicit request might tell the system to "Start the Send Email activity in the Gmail app". An implicit request tells the system to "Start a Send Email screen in any activity that can do the job." You can take advantage of this feature by declaring an <intent-filter> element in the <activity> element.

#### الترجمة الحرفية:
> توفّر `Intent Filters` القدرة على إطلاق نشاط ليس فقط بناءً على طلب صريح، بل أيضاً بناءً على طلب ضمني. قد يخبر الطلب الصريح النظام: "ابدأ نشاط إرسال البريد في تطبيق Gmail". يخبر الطلب الضمني النظام: "ابدأ شاشة إرسال بريد في أي نشاط قادر على القيام بهذه المهمة." يمكنك الاستفادة من هذه الميزة عن طريق إعلان عنصر `<intent-filter>` داخل عنصر `<activity>`.

#### الشرح المبسّط:
`Intent Filter` هو إعلان يقوله النشاط للنظام: "أنا أستطيع تنفيذ هذا النوع من المهام"، وهذا يفتح الباب لأن يستدعيه أي تطبيق آخر دون معرفة اسمه بالضبط. هذه الفكرة مهمة جداً لأنها أساس التفاعل بين التطبيقات المختلفة في أندرويد (interoperability)، فبدلاً من أن يعرف تطبيقك اسم "تطبيق البريد" بالتحديد، يكفي أن يطلب "أرسل بريداً" ويترك للنظام اختيار التطبيق المناسب. ترتبط هذه الفقرة بموضوع لاحق بالكامل (Receiving an Implicit Intent) وهي تمهيد له. تشبيه يومي: كأنك تنشر إعلان توظيف عام "مطلوب سائق" (implicit) بدل الاتصال بشخص معيّن بالاسم (explicit)؛ مثال عملي: زر "مشاركة" في أي تطبيق يفتح قائمة بكل التطبيقات القادرة على استقبال محتوى للمشاركة.

**لماذا؟** لأن أندرويد يشجّع إعادة استخدام المكوّنات بين التطبيقات بدل إعادة بناء نفس الوظيفة (مثل إرسال بريد) في كل تطبيق.

---

### 6. بنية Intent Filter الكاملة

#### النص الأصلي يقول (English):
> <intent-filter> element includes an <action> element and, optionally, a <category> element and/or a <data> element. These elements combine to specify the type of intent to which your activity can respond. Example, the following code snippet shows how to configure an activity that sends text data, and receives requests from other activities to do so.

#### الترجمة الحرفية:
> عنصر `<intent-filter>` يتضمن عنصر `<action>`، واختيارياً، عنصر `<category>` و/أو عنصر `<data>`. تتجمع هذه العناصر معاً لتحديد نوع الـ `Intent` الذي يستطيع نشاطك الاستجابة له. مثال، يوضح مقتطف الكود التالي كيفية تهيئة نشاط يرسل بيانات نصية، ويستقبل طلبات من أنشطة أخرى للقيام بذلك.

#### الشرح المبسّط:
`Intent Filter` مبني من ثلاثة عناصر تعمل معاً كشروط تصفية: `action` (ماذا يريد فعله المُرسِل)، `category` (سياق إضافي)، و`data` (نوع البيانات المرسلة)، وكل هذه الشروط يجب أن تتحقق معاً حتى يقبل النشاط استقبال الطلب. هذا مهم لأنه يمنح دقة عالية في تحديد من يستطيع استدعاء النشاط، فلا يستقبل أي `Intent` عشوائي بل فقط ما يطابق شروطه بالضبط. يرتبط مباشرة بالفقرة السابقة كتفصيل عملي لكيفية كتابة الطلب الضمني. تشبيه يومي: مثل استمارة تقديم وظيفة تشترط تخصصاً معيناً (action) وخبرة معينة (category) ولغة برمجة معينة (data) معاً؛ مثال عملي في الكود التالي.

**لماذا؟** لأن ترك النشاط يستقبل أي `Intent` بدون شروط دقيقة قد يعرضه لطلبات غير مناسبة أو خطيرة أمنياً.

#### 💻 الكود: تهيئة نشاط لاستقبال بيانات نصية

#### ما هذا الكود؟
> إعلان نشاط `ExampleActivity` قادر على استقبال طلبات "إرسال" (`SEND`) لبيانات من نوع نص عادي.

```xml
<!-- Declare activity with icon -->
<activity android:name=".ExampleActivity" android:icon="@drawable/app_icon">
  <!-- Filter that describes what this activity can handle -->
  <intent-filter>
    <!-- This activity can send data -->
    <action android:name="android.intent.action.SEND" />
    <!-- Enables it to receive launch requests -->
    <category android:name="android.intent.category.DEFAULT" />
    <!-- Only accepts plain text data -->
    <data android:mimeType="text/plain" />
  </intent-filter>
</activity>
```

#### شرح كل سطر:
1. `<activity android:name=".ExampleActivity" android:icon="@drawable/app_icon">` → إعلان النشاط مع تحديد أيقونة اختيارية.
2. `<intent-filter>` → بداية بلوك الفلترة الذي يصف قدرات النشاط.
3. `<action android:name="android.intent.action.SEND" />` → يحدد أن النشاط يقبل عملية "إرسال" بيانات.
4. `<category android:name="android.intent.category.DEFAULT" />` → شرط إلزامي تقريباً كي يستطيع النشاط استقبال طلبات `startActivity()`.
5. `<data android:mimeType="text/plain" />` → يقيّد النوع المقبول على نص عادي فقط.

**المكتبات المطلوبة (Imports):**
> لا يوجد؛ كود XML ضمن manifest.

**الناتج المتوقع (لقطة الشاشة):**
> أي تطبيق آخر يرسل `Intent` بعملية `ACTION_SEND` ونوع `text/plain` سيرى `ExampleActivity` ضمن قائمة الخيارات المتاحة للمشاركة.

---

### 7. استدعاء النشاط من كود Kotlin

#### النص الأصلي يقول (English):
> The following code snippet shows how to call the previous activity: val sendIntent = Intent().apply { action = Intent.ACTION_SEND; type = "text/plain"; putExtra(Intent.EXTRA_TEXT, textMessage) }; startActivity(sendIntent). Activities that you don't want to make available to other applications should have no intent filters, and you can start them yourself using explicit intents.

#### الترجمة الحرفية:
> يوضح مقتطف الكود التالي كيفية استدعاء النشاط السابق: ... الأنشطة التي لا تريد إتاحتها لتطبيقات أخرى يجب ألا يكون لها `Intent Filters`، ويمكنك تشغيلها بنفسك باستخدام `Intents` صريحة.

#### الشرح المبسّط:
هذا الكود يوضح الجانب المقابل — كيف "يستدعي" تطبيق آخر (أو تطبيقك نفسه) هذا النشاط عملياً عبر بناء كائن `Intent` وتمريره لدالة `startActivity()`. النقطة المهمة الثانية هي مبدأ أمني: أي نشاط لا يحتوي `intent-filter` يصبح خاصاً (private) بحيث لا يمكن الوصول إليه إلا من داخل تطبيقك عبر `Intent` صريحة (Explicit)، وهذا يحمي الأنشطة الحساسة من الاستدعاء الخارجي. يرتبط هذا مباشرة بالفكرتين السابقتين لأنه يُكمل الدورة: إعلان القدرة (manifest) ثم الاستدعاء الفعلي (الكود). تشبيه يومي: كأن `intent-filter` هو لافتة "مفتوح للجمهور" على باب متجر، وغيابها يعني أن الباب خاص ويحتاج مفتاحاً (Explicit Intent) لدخوله؛ مثال عملي: نشاط الدفع الداخلي في تطبيق بنكي غالباً بدون `intent-filter` حماية له.

**لماذا؟** لأن ترك أنشطة حساسة (مثل شاشة الدفع) مفتوحة لأي تطبيق خارجي يشكّل ثغرة أمنية خطيرة.

#### 💻 الكود: إرسال بيانات نصية بواسطة Intent صريح البناء

#### ما هذا الكود؟
> بناء `Intent` وإرساله إلى أي نشاط قادر على استقبال نص عادي، ثم إطلاقه فعلياً.

```kotlin
// Create an Intent object using apply scope function
val sendIntent = Intent().apply {
    // Set the action this intent performs
    action = Intent.ACTION_SEND
    // Set MIME type of the data being sent
    type = "text/plain"
    // Attach the actual text as an extra
    putExtra(Intent.EXTRA_TEXT, textMessage)
}
// Ask the system to start an activity that matches this intent
startActivity(sendIntent)
```

#### شرح كل سطر:
1. `val sendIntent = Intent().apply {` → إنشاء كائن `Intent` فارغ وفتح بلوك لتهيئته بعدة خصائص دفعة واحدة.
2. `action = Intent.ACTION_SEND` → تحديد نوع العملية المطلوبة (إرسال).
3. `type = "text/plain"` → تحديد نوع MIME للبيانات المرسلة.
4. `putExtra(Intent.EXTRA_TEXT, textMessage)` → إرفاق النص الفعلي كـ Extra بمفتاح قياسي.
5. `startActivity(sendIntent)` → تمرير الـ Intent للنظام ليجد وينفّذ النشاط المناسب.

**المكتبات المطلوبة (Imports):**
> `import android.content.Intent`

**الناتج المتوقع (لقطة الشاشة):**
> يظهر للمستخدم اختيار (Chooser) من التطبيقات القادرة على استقبال نص للمشاركة (مثل الرسائل أو البريد).

---

### 8. الصلاحيات (Permissions) بين الأنشطة

#### النص الأصلي يقول (English):
> You can use the manifest's <activity> tag to control which apps can start a particular activity. An activity (or application) cannot launch a target activity unless both activities have the same permissions in their manifest. If you declare a <uses-permission> element for an activity, the target activity must require the same permission using the android:permission attribute.

#### الترجمة الحرفية:
> يمكنك استخدام وسم `<activity>` في manifest للتحكم بأي التطبيقات يمكنها بدء نشاط معيّن. لا يمكن لنشاط (أو تطبيق) إطلاق نشاط هدف إلا إذا كان لكلا النشاطين نفس الصلاحيات في ملفي manifest الخاصين بهما. إذا أعلنت عنصر `<uses-permission>` لنشاط، فإن النشاط الهدف يجب أن يطلب نفس الصلاحية باستخدام خاصية `android:permission`.

#### الشرح المبسّط:
هذا نظام حماية إضافي فوق `intent-filter` — حتى لو كان النشاط يقبل `Intents` ضمنية، يمكن اشتراط أن المُستدعي يمتلك صلاحية محددة قبل السماح له بالتشغيل. هذا مهم لتطبيقات تتعامل مع بيانات حساسة (مثل مشاركة منشور اجتماعي) لأنها لا تريد السماح لأي تطبيق عشوائي بذلك دون إذن صريح من المستخدم أو المطور. يرتبط هذا بموضوع الأمان المذكور سابقاً في فقرة "activities that you don't want to make available" كطبقة حماية موازية للـ Intent Filters. تشبيه يومي: مثل مبنى يطلب بطاقة دخول (permission) بالإضافة إلى معرفة الغرفة (intent-filter)؛ مثال عملي أدناه.

**لماذا؟** لأن بعض الوظائف (كالنشر نيابة عن المستخدم) تحتاج تصريحاً واضحاً وليس مجرد تطابق نوع بيانات.

#### 💻 الكود: تعريف واستخدام صلاحية مخصّصة

#### ما هذا الكود؟
> تطبيق SocialApp يعرّف صلاحية خاصة لنشاطه، وتطبيقك يطلب نفس الصلاحية ليتمكن من استدعائه.

```xml
<!-- Inside SocialApp's manifest: require this permission to call the activity -->
<manifest>
  <activity android:name="...."
      android:permission="com.google.socialapp.permission.SHARE_POST" />
</manifest>
```
```xml
<!-- Inside your app's manifest: request the matching permission -->
<manifest>
  <uses-permission android:name="com.google.socialapp.permission.SHARE_POST"/>
</manifest>
```

#### شرح كل سطر:
1. `android:permission="com.google.socialapp.permission.SHARE_POST"` → يفرض على أي مُستدعٍ خارجي امتلاك هذه الصلاحية بالتحديد.
2. `<uses-permission android:name="..."/>` → طلب تطبيقك لنفس الصلاحية حتى يُسمح له بالاستدعاء.

**المكتبات المطلوبة (Imports):**
> لا يوجد؛ كود XML ضمن manifest.

**الناتج المتوقع (لقطة الشاشة):**
> بدون هذه الصلاحية، محاولة استدعاء نشاط SocialApp تفشل ويرمي النظام استثناء أمني (SecurityException).

---

### 9. مفهوم دورة حياة النشاط (Activity Lifecycle) وأهميتها

#### النص الأصلي يقول (English):
> As a user navigates through, out of, and back to your app, the Activity instances in your app transition through different states in their lifecycle. Within the lifecycle callback methods, you can declare how your activity behaves when the user leaves and re-enters the activity. Example: If you're building a streaming video player, you might pause the video and terminate the network connection when the user switches to another app. When the user returns, you can reconnect to the network and let the user resume the video from the same spot.

#### الترجمة الحرفية:
> بينما يتنقل المستخدم داخل تطبيقك وخارجه وعائداً إليه، تنتقل نسخ `Activity` في تطبيقك عبر حالات مختلفة في دورة حياتها. ضمن دوال رد النداء (callback) الخاصة بدورة الحياة، يمكنك تحديد كيف يتصرف نشاطك عندما يغادر المستخدم النشاط ويعود إليه مجدداً. مثال: إذا كنت تبني مشغّل فيديو بث، قد توقف الفيديو مؤقتاً وتنهي اتصال الشبكة عندما ينتقل المستخدم إلى تطبيق آخر. عندما يعود المستخدم، يمكنك إعادة الاتصال بالشبكة والسماح للمستخدم باستئناف الفيديو من نفس النقطة.

#### الشرح المبسّط:
دورة الحياة هي ببساطة سلسلة من "الحالات" التي يمر بها النشاط تلقائياً حسب تفاعل المستخدم (فتح، مغادرة، عودة، إغلاق)، والنظام يستدعي دوالاً محددة عند كل تغيّر حالة لتعطيك فرصة للتصرف المناسب. هذا مهم جداً لأن أندرويد بيئة متعددة المهام حيث قد يغادر المستخدم تطبيقك في أي لحظة (مكالمة، إشعار، تطبيق آخر)، فبدون هذه الآلية سيفقد التطبيق الموارد أو البيانات بشكل عشوائي. يرتبط هذا الموضوع مباشرة بكل ما سبق لأنه ينتقل من "كيف تُطلق نشاطاً" إلى "كيف تدير حياته بعد إطلاقه". تشبيه يومي: مثل موظف استقبال يوقف مهمة ويستأنفها لاحقاً حسب دخول وخروج الزوار، بدل أن يبدأ من الصفر كل مرة؛ مثال عملي: مشغّل فيديو يوقف التشغيل عند الخروج من التطبيق ويستكمل من نفس الثانية عند العودة.

**لماذا؟** لأن إدارة الموارد بذكاء (شبكة، بطارية، ذاكرة) تحافظ على أداء الجهاز وتجربة مستخدم سلسة بدون فقدان تقدمه.

---

### 10. فوائد الإدارة الصحيحة لدورة الحياة

#### النص الأصلي يقول (English):
> Each callback lets you perform specific work that's appropriate to a given change of state. Doing the right work at the right time and handling transitions properly make your app more robust and performant. Example, good implementation of the lifecycle callbacks can help your app avoid the following: Crashing if the user receives a phone call or switches to another app while using your app. Consuming valuable system resources when the user is not actively using it. Losing the user's progress if they leave your app and return to it at a later time. Crashing or losing the user's progress when the screen rotates between landscape and portrait orientation.

#### الترجمة الحرفية:
> كل دالة رد نداء تتيح لك تنفيذ عمل محدد مناسب لتغيّر حالة معيّن. القيام بالعمل الصحيح في الوقت الصحيح والتعامل مع الانتقالات بشكل مناسب يجعل تطبيقك أكثر متانة وأداءً. مثال، التنفيذ الجيد لدوال رد نداء دورة الحياة يمكن أن يساعد تطبيقك على تجنب ما يلي: الانهيار إذا استقبل المستخدم مكالمة هاتفية أو انتقل إلى تطبيق آخر أثناء استخدام تطبيقك. استهلاك موارد نظام قيّمة عندما لا يستخدم المستخدم التطبيق فعلياً. فقدان تقدم المستخدم إذا غادر تطبيقك وعاد إليه لاحقاً. الانهيار أو فقدان تقدم المستخدم عند دوران الشاشة بين الوضع الأفقي والعمودي.

#### الشرح المبسّط:
هذه الفقرة تلخّص "الثمرة العملية" لفهم دورة الحياة: تجنّب أربع مشاكل شائعة جداً في تطبيقات المبتدئين وهي الانهيار عند المقاطعات، استنزاف البطارية والموارد، فقدان بيانات المستخدم، ومشاكل الدوران. هذه المشاكل مهمة لأنها من أكثر أسباب تقييم المستخدمين السلبي للتطبيقات. ترتبط مباشرة بالفقرة السابقة كأمثلة ملموسة تبرر أهمية "الفعل الصحيح في الوقت الصحيح". تشبيه يومي: مثل سائق يتوقف بأمان عند إشارة حمراء بدل الانهيار (crash) أو ترك المحرك يعمل بلا داعٍ (استنزاف موارد)؛ مثال عملي: تطبيق يحفظ نص مكتوب في حقل إدخال قبل أن يدور المستخدم الشاشة، فلا يفقد ما كتبه.

**لماذا؟** لأن تجربة المستخدم السيئة (فقدان بيانات، بطء، انهيار) تؤدي مباشرة لحذف التطبيق أو تقييمه سلبياً.

---

### 11. الدوال الستة الأساسية لدورة الحياة

#### النص الأصلي يقول (English):
> To navigate between stages of the activity lifecycle, the Activity class provides a core set of six callbacks: onCreate(), onStart(), onResume(), onPause(), onStop(), and onDestroy(). The system invokes each of these callbacks as the activity enters a new state. The system's likelihood of killing a given process, along with the activities in it, depends on the state of the activity at the time.

#### الترجمة الحرفية:
> للتنقل بين مراحل دورة حياة النشاط، يوفّر صنف `Activity` مجموعة أساسية من ست دوال رد نداء: `onCreate()`, `onStart()`, `onResume()`, `onPause()`, `onStop()`, و `onDestroy()`. يستدعي النظام كل واحدة من هذه الدوال عندما يدخل النشاط حالة جديدة. احتمالية قيام النظام بإنهاء عملية معينة، مع الأنشطة الموجودة فيها، تعتمد على حالة النشاط في تلك اللحظة.

#### الشرح المبسّط:
هذه الفقرة تعطي "الخارطة الكاملة" لست دوال ستُشرح لاحقاً بالتفصيل، وترتيبها الافتراضي يمثّل رحلة النشاط من الولادة إلى الموت. النقطة الإضافية المهمة هنا أن أندرويد يقرر إنهاء عمليات (Processes) بناءً على حالة الأنشطة بداخلها — فكلما كان النشاط أقرب لـ`onDestroy` أو `onStop`، زادت احتمالية قتله من قبل النظام عند الحاجة للذاكرة. يرتبط هذا بالفقرتين السابقتين كتفصيل تقني لما سبق ذكره بشكل عام. تشبيه يومي: مثل درجات أولوية موظفين في شركة تقلّص عدد الموظفين، فمن هو "خارج المكتب" (Stopped) أول من يُستغنى عنه مقارنة بمن هو "يعمل الآن" (Resumed)؛ مثال عملي: نشاط في الخلفية منذ وقت طويل قد يُقتل تلقائياً بينما النشاط الحالي على الشاشة لا يُقتل أبداً.

**لماذا؟** لأن الذاكرة محدودة على الأجهزة المحمولة، فيحتاج النظام آلية عادلة لتحديد أي العمليات أقل أهمية حالياً.

```algorithm
1 | إطلاق التطبيق | النظام | استدعاء onCreate ثم onStart ثم onResume تلقائياً بالترتيب
2 | مقاطعة (مكالمة/تطبيق آخر) | النظام | استدعاء onPause ثم onStop إذا اختفى النشاط تماماً
3 | العودة للنشاط | النظام | استدعاء onRestart ثم onStart ثم onResume
4 | إغلاق نهائي أو دوران الشاشة | النظام | استدعاء onDestroy وربما إعادة إنشاء نشاط جديد
```

#### نقاط التنفيذ:
- الترتيب لا يمكن تجاوزه؛ لا يصل النشاط لـ `onResume` قبل `onCreate` و `onStart`.
- عند تدوير الشاشة، قد يُستدعى `onDestroy` ثم `onCreate` من جديد على نسخة جديدة تماماً من النشاط.

---

### 12. onCreate()

#### النص الأصلي يقول (English):
> You must implement this callback, which fires when the system first creates the activity. On activity creation, the activity enters the Created state. In the onCreate() method, perform basic application startup logic that happens only once for the entire life of the activity. This method receives the parameter savedInstanceState, which is a Bundle object containing the activity's previously saved state. If the activity has never existed before, the value of the Bundle object is null. Your activity does not remain in the Created state. After the onCreate() method finishes execution, the activity enters the Started state and the system calls the onStart() and onResume() methods in quick succession.

#### الترجمة الحرفية:
> يجب عليك تنفيذ (implement) هذه الدالة، التي تُطلَق عندما ينشئ النظام النشاط لأول مرة. عند إنشاء النشاط، يدخل النشاط حالة `Created`. في دالة `onCreate()`، نفّذ منطق بدء التشغيل الأساسي للتطبيق الذي يحدث مرة واحدة فقط طوال حياة النشاط. تستقبل هذه الدالة معلمة `savedInstanceState`، وهي كائن `Bundle` يحتوي حالة النشاط المحفوظة سابقاً. إذا لم يكن النشاط موجوداً من قبل، تكون قيمة كائن `Bundle` هي `null`. لا يبقى نشاطك في حالة `Created`. بعد انتهاء تنفيذ دالة `onCreate()`، يدخل النشاط حالة `Started` ويستدعي النظام دالتي `onStart()` و`onResume()` بالتتابع السريع.

#### الشرح المبسّط:
`onCreate()` هي أول دالة تُستدعى إجبارياً في حياة أي نشاط، وهي مكان تهيئة كل ما يحدث "مرة واحدة فقط" مثل ربط الواجهة أو إنشاء `ViewModel`. أهميتها أنها تستقبل `savedInstanceState` الذي يسمح باسترجاع بيانات محفوظة من قبل (مثلاً بعد دوران الشاشة)، وهذا يحل مشكلة فقدان البيانات المذكورة سابقاً. ترتبط مباشرة بالدوال الست المذكورة في الفقرة السابقة كأول تفصيل عملي لها. تشبيه يومي: مثل بناء غرفة جديدة من الصفر (أثاث، كهرباء) قبل استقبال أي زائر فيها؛ مثال عملي: في `onCreate()` يتم استدعاء `setContentView()` لعرض تصميم الشاشة لأول مرة.

**لماذا؟** لأن فصل "منطق البدء لمرة واحدة" عن بقية الدورة يمنع تكرار عمليات مكلفة (مثل تحميل بيانات ضخمة) كل مرة يعود فيها المستخدم للنشاط.

#### 💻 الكود: onCreate() الأساسي

#### ما هذا الكود؟
> الشكل القياسي لدالة `onCreate()` كما يجب تنفيذها في أي نشاط.

```kotlin
// Called once when the activity is first created
override fun onCreate(savedInstanceState: Bundle?) {
    // Always call super first to let the system do its own setup
    super.onCreate(savedInstanceState)
}
```

#### شرح كل سطر:
1. `override fun onCreate(savedInstanceState: Bundle?) {` → دالة `override` لأنها تُعيد تعريف سلوك موروث من صنف `Activity` الأصلي.
2. `super.onCreate(savedInstanceState)` → استدعاء إلزامي لتنفيذ منطق النظام الداخلي قبل أي كود إضافي.

**المكتبات المطلوبة (Imports):**
> `import android.os.Bundle`

**الناتج المتوقع (لقطة الشاشة):**
> لا شيء مرئي بعد بدون استدعاء `setContentView()`؛ النشاط أصبح فقط "موجوداً" في الذاكرة.

#### 💡 التشبيه:
> بناء البيت وتأسيسه قبل استقبال أول ضيف فيه.
> **وجه الشبه:** التأسيس = `onCreate()`، استقبال أول ضيف = `onStart()`.

---

### 13. onStart()

#### النص الأصلي يقول (English):
> As onCreate() exits, the activity enters the Started state, and the activity becomes visible to the user. When the activity enters the Started state, the system invokes onStart(). This call makes the activity visible to the user as the app prepares for the activity to enter the foreground and become interactive. This method is where the code that maintains the UI is initialized. The onStart() method completes quickly and, as with the Created state, the activity does not remain in the Started state. Once this callback finishes, the activity enters the Resumed state and the system invokes the onResume() method.

#### الترجمة الحرفية:
> عندما تنتهي `onCreate()`، يدخل النشاط حالة `Started`، ويصبح النشاط مرئياً للمستخدم. عندما يدخل النشاط حالة `Started`، يستدعي النظام `onStart()`. هذا الاستدعاء يجعل النشاط مرئياً للمستخدم بينما يستعد التطبيق لدخول النشاط إلى المقدمة وأن يصبح تفاعلياً. هذه هي الدالة التي يُهيّأ فيها الكود الذي يحافظ على الواجهة. تنتهي دالة `onStart()` بسرعة، وكما في حالة `Created`، لا يبقى النشاط في حالة `Started`. بمجرد انتهاء هذه الدالة، يدخل النشاط حالة `Resumed` ويستدعي النظام دالة `onResume()`.

#### الشرح المبسّط:
`onStart()` هي نقطة انتقالية سريعة تجعل النشاط "مرئياً" على الشاشة لكن لم يبدأ التفاعل الفعلي بعد — أي المستخدم يرى الشاشة لكن لا يمكنه الضغط عليها بشكل كامل حتى `onResume`. أهميتها أنها فاصل بين "الإعداد الداخلي" في `onCreate` و"التفاعل الكامل" في `onResume`، وتُستخدم لتهيئة عناصر واجهة تحتاج أن تكون مرئية. ترتبط مباشرة بالفقرة السابقة كخطوة تالية طبيعية بعد `onCreate()`. تشبيه يومي: مثل فتح ستارة المسرح فيرى الجمهور الممثلين لكن العرض لم يبدأ فعلياً بعد؛ مثال عملي: بدء تحديث واجهة معينة (مثل عداد) بمجرد ظهور الشاشة، حتى قبل أن يتفاعل المستخدم معها.

**لماذا؟** لأن الفصل بين "الظهور" و"التفاعل" يسمح للنظام بمعالجة أي إعدادات بصرية أخيرة قبل تسليم التحكم الكامل للمستخدم.

#### 💻 الكود: onStart()

#### ما هذا الكود؟
> الشكل القياسي لدالة `onStart()`.

```kotlin
// Called when the activity becomes visible to the user
override fun onStart() {
    super.onStart()
}
```

#### شرح كل سطر:
1. `override fun onStart() {` → تعريف الدالة التي يستدعيها النظام عند دخول حالة `Started`.
2. `super.onStart()` → استدعاء إلزامي لضمان تنفيذ السلوك الافتراضي أولاً.

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد إضافي (جزء من صنف `Activity`).

**الناتج المتوقع (لقطة الشاشة):**
> النشاط يصبح مرئياً على الشاشة لكن غير تفاعلي بشكل كامل بعد.

---

### 14. onResume()

#### النص الأصلي يقول (English):
> The system invokes onResume() callback just before the activity starts interacting with the user. When the activity enters the Resumed state, it comes to the foreground, and the system invokes the onResume() callback. This is the state in which the app interacts with the user. The app stays in this state until something happens to take focus away from the app, such as the device receiving a phone call, the user navigating to another activity, or the device screen turning off. When an interruptive event occurs, the activity enters the Paused state and the system invokes the onPause() callback. If the activity returns to the Resumed state from the Paused state, the system once again calls the onResume() method. For this reason, implement onResume() to initialize components that you release during onPause() and to perform any other initializations that must occur each time the activity enters the Resumed state.

#### الترجمة الحرفية:
> يستدعي النظام دالة `onResume()` مباشرة قبل أن يبدأ النشاط بالتفاعل مع المستخدم. عندما يدخل النشاط حالة `Resumed`، يصل إلى المقدمة، ويستدعي النظام دالة `onResume()`. هذه هي الحالة التي يتفاعل فيها التطبيق مع المستخدم. يبقى التطبيق في هذه الحالة حتى يحدث شيء يسحب التركيز بعيداً عن التطبيق، مثل استقبال الجهاز مكالمة هاتفية، أو انتقال المستخدم إلى نشاط آخر، أو إغلاق شاشة الجهاز. عند حدوث حدث مقاطعة، يدخل النشاط حالة `Paused` ويستدعي النظام دالة `onPause()`. إذا عاد النشاط إلى حالة `Resumed` من حالة `Paused`، يستدعي النظام دالة `onResume()` مرة أخرى. لهذا السبب، نفّذ `onResume()` لتهيئة المكوّنات التي تحررها أثناء `onPause()` ولتنفيذ أي تهيئات أخرى يجب أن تحدث في كل مرة يدخل فيها النشاط حالة `Resumed`.

#### الشرح المبسّط:
`onResume()` هي اللحظة التي يصبح فيها النشاط بالكامل في المقدمة وقابلاً للتفاعل الحقيقي، وهي أهم حالة من ناحية تجربة المستخدم لأنها الوحيدة التي يستطيع فيها المستخدم الضغط والتفاعل فعلياً. النقطة المهمة هنا أن هذه الدالة قد تُستدعى أكثر من مرة (وليس مرة واحدة كـ onCreate)، لذلك يجب أن تكون قابلة للتكرار بأمان — كل مرة يعود فيها المستخدم من `Paused` يجب إعادة تهيئة نفس الموارد التي حُرّرت في `onPause`. يرتبط هذا مباشرة بالفقرة السابقة (`onStart`) كخطوة أخيرة في دورة "الظهور" وبداية دورة "المقاطعة" اللاحقة. تشبيه يومي: مثل بدء العرض المسرحي فعلياً بعد فتح الستارة، وإذا توقف العرض مؤقتاً بسبب انقطاع كهرباء ثم عاد، يُعاد تشغيله من نفس هذه النقطة لا من البداية؛ مثال عملي: إعادة تفعيل الكاميرا في تطبيق مسح QR كل مرة يعود فيها المستخدم للشاشة.

**لماذا؟** لأن الموارد الثقيلة (كاميرا، GPS، اتصال شبكة) يجب أن تُفعَّل فقط أثناء التفاعل الفعلي لتوفير البطارية، وتُعاد تفعيلها تلقائياً عند كل عودة.

#### 💻 الكود: onResume()

#### ما هذا الكود؟
> الشكل القياسي لدالة `onResume()` التي تبدأ عندها المرحلة التفاعلية.

```kotlin
// Called right before the user starts interacting with the activity
override fun onResume() {
    super.onResume()
}
```

#### شرح كل سطر:
1. `override fun onResume() {` → تعريف الدالة التي تعلّم النظام بدخول الحالة التفاعلية.
2. `super.onResume()` → تفعيل السلوك الافتراضي أولاً قبل أي كود إضافي.

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد إضافي.

**الناتج المتوقع (لقطة الشاشة):**
> النشاط الآن في المقدمة بالكامل، ويستجيب فعلياً لضغطات المستخدم.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا لا نضع كود فتح الكاميرا في `onCreate()` بدل `onResume()`؟
> **لماذا هذا مهم؟** لأن `onCreate()` يُستدعى مرة واحدة فقط، بينما المستخدم قد يغادر الشاشة ويعود إليها عدة مرات، فتحتاج الكاميرا لإعادة تفعيل في كل مرة عبر `onResume()`.

---

### 15. onPause()

#### النص الأصلي يقول (English):
> The system calls onPause() method as the first indication that the user is leaving your activity, though it does not always mean the activity is being destroyed. It indicates that the activity is no longer in the foreground, but it is still visible if the user is in multi-window mode. There are several reasons why an activity might enter this state: An event that interrupts app execution, pauses the current activity. This is the most common case. In multi-window mode, only one app has focus at any time, and the system pauses all the other apps. The opening of a dialog pauses the underlying activity because it takes focus. As long as the activity is partially visible but not in focus, it remains paused.

#### الترجمة الحرفية:
> يستدعي النظام دالة `onPause()` كأول إشارة على أن المستخدم يغادر نشاطك، رغم أن هذا لا يعني دائماً أن النشاط يتم تدميره. يشير هذا إلى أن النشاط لم يعد في المقدمة، لكنه يبقى مرئياً إذا كان المستخدم في وضع النوافذ المتعددة. هناك عدة أسباب لدخول النشاط هذه الحالة: حدث يقاطع تنفيذ التطبيق، فيوقف النشاط الحالي مؤقتاً. هذه هي الحالة الأكثر شيوعاً. في وضع النوافذ المتعددة، تطبيق واحد فقط يمتلك التركيز في أي وقت، ويوقف النظام كل التطبيقات الأخرى مؤقتاً. فتح مربع حوار (dialog) يوقف النشاط الأساسي مؤقتاً لأنه يأخذ التركيز. طالما أن النشاط مرئي جزئياً لكن غير مركّز عليه، يبقى في حالة `Paused`.

#### الشرح المبسّط:
`onPause()` هي "أول جرس إنذار" بأن المستخدم بدأ بالمغادرة، لكنها ليست نهاية النشاط بالضرورة — فقد يعود المستخدم بسرعة (كفتح حوار بسيط) أو يغادر تماماً. من المهم فهم أن النشاط قد يبقى مرئياً جزئياً في هذه الحالة (مثل وضع النوافذ المتعددة)، وهذا يختلف عن `onStop()` حيث يختفي تماماً. ترتبط هذه الحالة مباشرة بنهاية `onResume()` المذكورة سابقاً كنقطة الخروج الطبيعية من التفاعل الكامل. تشبيه يومي: مثل توقف محادثة مؤقت عندما يرن هاتف أحد الطرفين، لكنهما ما زالا في نفس الغرفة ولم يغادرا؛ مثال عملي: فتح نافذة حوار "هل تريد الحفظ؟" فوق النشاط الحالي يوقفه مؤقتاً دون إغلاقه.

**لماذا؟** لأن النظام يحتاج تمييز حالة "مقاطعة مؤقتة قد تنتهي بسرعة" عن حالة "اختفاء كامل"، لأن التصرف المناسب يختلف بينهما.

---

### 16. الاستخدام الصحيح لـ onPause()

#### النص الأصلي يقول (English):
> Use the onPause() method to: Pause or adjust operations that can't continue, while the Activity is in the Paused state, and that you expect to resume shortly. Release system resources, handles to sensors (like GPS), or any resources that affect battery life while your activity is Paused and user does not need them. onPause() execution does not necessarily offer enough time to perform save operations. For this reason, don't use onPause() to save application or user data, make network calls, or execute database transactions. Instead, perform heavy-load shutdown operations during onStop(). Completion of the onPause() method does not mean that the activity leaves the Paused state. Rather, the activity remains in this state until either the activity resumes or it becomes completely invisible to the user. If the activity resumes, the system invokes the onResume() callback. If the activity becomes completely invisible, the system calls onStop().

#### الترجمة الحرفية:
> استخدم دالة `onPause()` من أجل: إيقاف أو تعديل عمليات لا يمكن أن تستمر أثناء وجود النشاط في حالة `Paused`، وتتوقع استئنافها قريباً. تحرير موارد النظام، مقابض المستشعرات (مثل GPS)، أو أي موارد تؤثر على عمر البطارية بينما نشاطك في حالة `Paused` ولا يحتاجها المستخدم. تنفيذ `onPause()` لا يوفر بالضرورة وقتاً كافياً لتنفيذ عمليات حفظ. لهذا السبب، لا تستخدم `onPause()` لحفظ بيانات التطبيق أو المستخدم، أو إجراء استدعاءات شبكة، أو تنفيذ معاملات قاعدة بيانات. بدلاً من ذلك، نفّذ عمليات إغلاق ثقيلة الحمل أثناء `onStop()`. اكتمال دالة `onPause()` لا يعني أن النشاط يغادر حالة `Paused`. بل يبقى النشاط في هذه الحالة حتى يستأنف النشاط أو يصبح غير مرئي تماماً للمستخدم. إذا استأنف النشاط، يستدعي النظام دالة `onResume()`. إذا أصبح النشاط غير مرئي تماماً، يستدعي النظام دالة `onStop()`.

#### الشرح المبسّط:
هذه الفقرة تحدد بدقة "ما يجب" وما "يُمنع" فعله داخل `onPause()`: يجب تحرير موارد خفيفة وسريعة (مثل GPS)، لكن يُمنع القيام بعمليات ثقيلة كحفظ قاعدة بيانات أو مكالمات شبكة لأن الوقت المتاح قصير جداً وقد يُقتل التطبيق قبل إتمامها. هذا مهم جداً لأنه خطأ شائع عند المبتدئين يظنون أن `onPause()` مكان آمن للحفظ، بينما الصحيح هو `onStop()`. يرتبط هذا مباشرة بالفقرة السابقة كتوضيح عملي لـ"متى تنتهي حالة Paused" ولماذا يوجد فرق زمني/وظيفي بينها وبين `onStop`. تشبيه يومي: مثل إيقاف السيارة مؤقتاً عند إشارة حمراء (onPause) — تطفئ الأضواء الكشافة غير الضرورية لكن لا تقم بصيانة كاملة للمحرك في هذه اللحظة القصيرة، بل انتظر حتى تصل لمرآب (onStop)؛ مثال عملي: إيقاف تحديثات GPS المستمرة في `onPause()` لتوفير البطارية.

**لماذا؟** لأن `onPause()` قد يكون قصيراً جداً زمنياً (أجزاء من الثانية)، فأي عملية ثقيلة فيه قد تسبب تجميد الواجهة أو فقدان البيانات إذا قُتل التطبيق فجأة.

#### 💻 الكود: onPause()

#### ما هذا الكود؟
> الشكل القياسي لدالة `onPause()` المستخدمة لتحرير موارد خفيفة فقط.

```kotlin
// Called as the first sign the user is leaving the activity
override fun onPause() {
    super.onPause()
}
```

#### شرح كل سطر:
1. `override fun onPause() {` → تعريف دالة الاستجابة لبداية المغادرة.
2. `super.onPause()` → استدعاء السلوك الافتراضي أولاً.

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد إضافي.

**الناتج المتوقع (لقطة الشاشة):**
> النشاط يبقى مرئياً جزئياً أو يختفي قريباً، وتُحرَّر الموارد الخفيفة مثل حساسات الموقع.

#### مهم للامتحان ⚠️:
> لا تستخدم `onPause()` أبداً لحفظ بيانات أو تنفيذ استدعاءات شبكة — هذا خطأ شائع في الامتحانات.

---

### 17. onStop()

#### النص الأصلي يقول (English):
> When your activity is no longer visible to the user, it enters the Stopped state, and the system invokes the onStop() callback. This can occur: When a newly launched activity covers the entire screen. When the activity finishes running and is about to be terminated. In the onStop() method: Release or adjust resources that are not needed while the app is not visible to the user. Example, your app might pause animations or switch from fine-grained to coarse-grained location updates. Perform relatively CPU-intensive shutdown operations. Example, to save information to a database.

#### الترجمة الحرفية:
> عندما لم يعد نشاطك مرئياً للمستخدم، يدخل حالة `Stopped`، ويستدعي النظام دالة `onStop()`. يمكن أن يحدث هذا: عندما يغطي نشاط أُطلق حديثاً الشاشة بالكامل. عندما ينتهي النشاط من العمل ويكون على وشك الإنهاء. في دالة `onStop()`: حرّر أو عدّل الموارد غير المطلوبة أثناء عدم ظهور التطبيق للمستخدم. مثال، قد يوقف تطبيقك الرسوم المتحركة أو يبدّل من تحديثات موقع دقيقة إلى تحديثات خشنة. نفّذ عمليات إغلاق مكثفة نسبياً على المعالج. مثال، لحفظ معلومات في قاعدة بيانات.

#### الشرح المبسّط:
`onStop()` هي اللحظة التي يختفي فيها النشاط تماماً من الشاشة، وهي بعكس `onPause()` المكان المناسب لعمليات الحفظ الثقيلة نسبياً مثل تحديث قاعدة بيانات. هذا مهم لأنه يحل التناقض الذي ظهر في الفقرة السابقة: لماذا لا نحفظ في `onPause` رغم أنه "بداية المغادرة"؟ لأن `onStop` تحديداً هو المكان الأنسب زمنياً ووظيفياً لهذا النوع من العمل. يرتبط مباشرة بالفقرة السابقة كامتداد طبيعي لها (خصوصاً جملة "perform heavy-load shutdown operations during onStop()"). تشبيه يومي: مثل الوصول الفعلي إلى المرآب بعد الخروج من الطريق السريع (onStop)، حيث يمكنك أخيراً إجراء صيانة كاملة للسيارة (حفظ البيانات) لأن لديك وقتاً كافياً؛ مثال عملي: حفظ مسودة رسالة بريد إلكتروني في قاعدة البيانات المحلية عند مغادرة شاشة الكتابة بالكامل.

**لماذا؟** لأن النشاط في هذه الحالة أصبح غير مرئي بالكامل، فلدى النظام وقتاً أطول نسبياً قبل قتل العملية، مما يسمح بعمليات أثقل مقارنة بـ `onPause`.

#### 💻 الكود: onStop()

#### ما هذا الكود؟
> الشكل القياسي لدالة `onStop()` المستخدمة لعمليات الإغلاق الأثقل مثل الحفظ في قاعدة البيانات.

```kotlin
// Called when the activity is no longer visible at all
override fun onStop() {
    super.onStop()
}
```

#### شرح كل سطر:
1. `override fun onStop() {` → تعريف الدالة التي تعلّم النظام باختفاء النشاط الكامل.
2. `super.onStop()` → تنفيذ السلوك الافتراضي أولاً.

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد إضافي.

**الناتج المتوقع (لقطة الشاشة):**
> النشاط غير مرئي تماماً على الشاشة، مع حفظ أي بيانات ضرورية في الخلفية.

---

### 18. حالة onStop() والانتقال منها

#### النص الأصلي يقول (English):
> When your activity enters the Stopped state, the Activity object is kept resident in memory: it maintains all state and member information, but is not attached to the window manager. When the activity resumes, it recalls this information. From the Stopped state, the activity either comes back to interact with the user, or the activity is finished running and goes away. If the activity comes back, the system invokes onRestart(). If the Activity is finished running, the system calls onDestroy().

#### الترجمة الحرفية:
> عندما يدخل نشاطك حالة `Stopped`، يبقى كائن `Activity` مقيماً في الذاكرة: يحافظ على كل معلومات الحالة والأعضاء، لكنه غير مرتبط بمدير النوافذ. عندما يستأنف النشاط، يستعيد هذه المعلومات. من حالة `Stopped`، إما يعود النشاط للتفاعل مع المستخدم، أو ينتهي النشاط من العمل ويختفي. إذا عاد النشاط، يستدعي النظام `onRestart()`. إذا انتهى النشاط من العمل، يستدعي النظام `onDestroy()`.

#### الشرح المبسّط:
النقطة الجوهرية هنا أن النشاط "الموقوف" (Stopped) لا يُحذف من الذاكرة تلقائياً — يبقى محتفظاً بكل بياناته الداخلية لكنه فقط غير مرتبط بالشاشة، وهذا يفسّر لماذا يمكن للنشاط أن يعود بسرعة وبنفس حالته الدقيقة دون الحاجة لإعادة تحميل كل شيء. هذا مهم لأنه يوضح الفرق بين "متوقف مؤقتاً في الذاكرة" و"محذوف نهائياً"، وهما مسارين مختلفين تماماً (onRestart مقابل onDestroy). يرتبط هذا مباشرة بنهاية `onStop()` المذكورة سابقاً كنقطة تفرّع القرار. تشبيه يومي: مثل كتاب موضوع على الرف (Stopped) — لم يُمزَّق، فقط ينتظر أن يُفتح مجدداً من نفس الصفحة؛ مثال عملي: عودة المستخدم لتطبيق كان في الخلفية منذ دقائق فيجد كل شيء كما تركه دون إعادة تحميل.

**لماذا؟** لأن الاحتفاظ بالحالة في الذاكرة أسرع بكثير من إعادة إنشاء كل شيء من الصفر، مما يحسّن سرعة الاستجابة عند العودة للتطبيق.

---

### 19. onRestart()

#### النص الأصلي يقول (English):
> The system invokes onRestart() callback when an activity in the Stopped state is about to restart. onRestart() restores the state of the activity from the time that it was stopped. This callback is always followed by onStart().

#### الترجمة الحرفية:
> يستدعي النظام دالة `onRestart()` عندما يكون نشاط في حالة `Stopped` على وشك إعادة التشغيل. تستعيد `onRestart()` حالة النشاط من الوقت الذي كان فيه متوقفاً. تُتبع هذه الدالة دائماً بـ `onStart()`.

#### الشرح المبسّط:
`onRestart()` دالة صغيرة ومتخصصة جداً — تُستدعى فقط في حالة واحدة محددة: عودة نشاط كان في حالة `Stopped` (وليس عند الإنشاء الأول). أهميتها أنها تعطي فرصة لتنفيذ كود خاص فقط بحالة "العودة بعد اختفاء كامل" يختلف عن كود `onStart()` العادي الذي يُنفَّذ في كل الحالات. ترتبط مباشرة بالفقرة السابقة كإجابة مباشرة على "إذا عاد النشاط، يستدعي النظام onRestart()". تشبيه يومي: مثل فتح كتاب كان على الرف مجدداً (onRestart) مقارنة بفتحه لأول مرة (onCreate)؛ مثال عملي: إعادة الاشتراك في تحديثات موقع (location updates) التي أُلغيت في `onStop()` السابق.

**لماذا؟** لأن بعض الإعدادات تحتاج معالجة خاصة فقط عند "العودة" وليس عند "البداية الأولى"، فهذا يوفّر مكاناً منطقياً واضحاً لها.

#### 💻 الكود: onRestart()

#### ما هذا الكود؟
> الشكل القياسي لدالة `onRestart()`.

```kotlin
// Called only when returning to the activity after it was stopped
override fun onRestart() {
    super.onRestart()
}
```

#### شرح كل سطر:
1. `override fun onRestart() {` → تعريف الدالة الخاصة بحالة العودة من `Stopped`.
2. `super.onRestart()` → تنفيذ السلوك الافتراضي أولاً.

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد إضافي.

**الناتج المتوقع (لقطة الشاشة):**
> بعد `onRestart()` يُستدعى `onStart()` تلقائياً فوراً، ثم يعود النشاط للظهور والتفاعل.

---

### 20. onDestroy()

#### النص الأصلي يقول (English):
> onDestroy() is called before the activity is destroyed. The system invokes this callback for one of two reasons: The activity is finishing, due to the user completely dismissing the activity or due to finish() being called on the activity. The system is temporarily destroying the activity due to a configuration change, such as device rotation. If onDestroy() is called as the result of a configuration change, the system immediately creates a new activity instance and then calls onCreate() on that new instance in the new configuration. The onDestroy() callback releases all resources not released by earlier callbacks, such as onStop().

#### الترجمة الحرفية:
> يُستدعى `onDestroy()` قبل تدمير النشاط. يستدعي النظام هذه الدالة لأحد سببين: النشاط ينتهي، بسبب رفض المستخدم للنشاط تماماً أو بسبب استدعاء `finish()` على النشاط. النظام يدمّر النشاط مؤقتاً بسبب تغيّر في التهيئة، مثل دوران الجهاز. إذا استُدعيت `onDestroy()` نتيجة تغيّر تهيئة، ينشئ النظام فوراً نسخة جديدة من النشاط ثم يستدعي `onCreate()` على تلك النسخة الجديدة بالتهيئة الجديدة. تحرّر دالة `onDestroy()` كل الموارد التي لم تُحرَّر بواسطة دوال سابقة، مثل `onStop()`.

#### الشرح المبسّط:
`onDestroy()` هي النهاية الفعلية لحياة النشاط، لكنها تحدث لسببين مختلفين تماماً في أثرهما: إما نهاية حقيقية (المستخدم أغلق النشاط) أو نهاية مؤقتة بسبب تغيّر تهيئة (مثل دوران الشاشة) يليها فوراً إنشاء نسخة جديدة تماماً عبر `onCreate()`. هذه النقطة الأخيرة مهمة جداً وهي مصدر خطأ شائع: عند الدوران يُدمَّر النشاط بالكامل ويُنشأ من جديد، لذا أي بيانات غير محفوظة في `savedInstanceState` تُفقد. ترتبط هذه الفقرة بكل الدورة السابقة كنقطة نهاية طبيعية توضح لماذا كان الحديث عن `savedInstanceState` في `onCreate()` مهماً منذ البداية. تشبيه يومي: مثل هدم غرفة بالكامل عند تجديد المنزل (دوران الشاشة) وإعادة بنائها من جديد بنفس المخطط تقريباً، مقارنة بهدمها نهائياً عند بيع البيت (إغلاق حقيقي)؛ مثال عملي: فقدان نص مكتوب في حقل إدخال عند تدوير الشاشة إن لم يُحفظ في `onSaveInstanceState`.

**لماذا؟** لأن أندرويد يعيد بناء الواجهة بالكامل عند تغيّر التهيئة (مثل الدوران) لضمان توافقها مع الموارد الجديدة (مثل تخطيط أفقي مختلف)، وهذا يتطلب تدميراً وإعادة إنشاء كاملين.

#### 💻 الكود: onDestroy()

#### ما هذا الكود؟
> الشكل القياسي لدالة `onDestroy()` كنقطة تحرير أخيرة للموارد.

```kotlin
// Called right before the activity is destroyed
override fun onDestroy() {
    super.onDestroy()
}
```

#### شرح كل سطر:
1. `override fun onDestroy() {` → تعريف دالة النهاية النهائية للنشاط.
2. `super.onDestroy()` → تنفيذ السلوك الافتراضي أولاً.

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد إضافي.

**الناتج المتوقع (لقطة الشاشة):**
> النشاط يختفي نهائياً من الذاكرة (أو تُنشأ نسخة جديدة فوراً في حال الدوران).

#### الفهم الخاطئ الشائع ❌: `onDestroy()` تعني دائماً أن المستخدم أغلق التطبيق نهائياً.
#### الفهم الصحيح ✅: قد تُستدعى `onDestroy()` مؤقتاً فقط بسبب دوران الشاشة، تليها فوراً `onCreate()` لنسخة جديدة.

---

### 21. ملخص دورة الحياة (رسم توضيحي من المحاضرة)

#### 🖼️ وصف الشاشة: مخطط Lifecycle Callbacks Summary

> **الصفحة/الشريحة:** 22
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| Activity launched | أعلى المخطط | نقطة البداية عند إطلاق النشاط لأول مرة |
| onCreate → onStart → onResume | من الأعلى نزولاً | تسلسل الإطلاق حتى الدخول لحالة Activity running |
| Activity running | المنتصف (أخضر) | الحالة التفاعلية الكاملة مع المستخدم |
| onPause → onStop | يمين المخطط نزولاً | مسار المقاطعة والاختفاء |
| onRestart | يمين المخطط صعوداً | مسار العودة من onStop إلى onStart مجدداً |
| onDestroy → Activity shut down | أسفل المخطط | مسار الإنهاء النهائي |
| App process killed | يسار المخطط | ما قد يحدث إذا احتاج النظام الذاكرة أثناء onStop |

**خطوات العمل:**
1. يبدأ السهم من "Activity launched" وصولاً لـ"onCreate".
2. يتفرّع المسار من "onResume" إلى "Activity running" في حلقة مستمرة مع "onPause" عند فقدان التركيز والعودة عبره.
3. من "onStop" إما يعود عبر "onRestart" أو ينتقل لـ"onDestroy" لإنهاء النشاط، أو قد يُقتل النظام العملية مباشرة عند الحاجة للذاكرة.

#### 📊 المخطط: دورة حياة Activity كاملة

#### ما هذا المخطط؟
> يوضح تسلسل جميع دوال رد النداء الست ومسارات الانتقال بينها من الإطلاق حتى الإغلاق.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Activity launched | event | بداية دورة الحياة |
| 2 | onCreate | state | إنشاء أولي لمرة واحدة |
| 3 | onStart | state | يصبح مرئياً |
| 4 | onResume | state | يصبح تفاعلياً بالكامل |
| 5 | Activity running | state | حلقة التفاعل الفعلي |
| 6 | onPause | state | بداية المغادرة |
| 7 | onStop | state | اختفاء كامل |
| 8 | onRestart | state | عودة من التوقف |
| 9 | onDestroy | state | تحرير نهائي للموارد |
| 10 | Activity shut down | event | نهاية دورة الحياة |
| 11 | App process killed | event | إنهاء قسري من النظام |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Activity launched | onCreate | إطلاق | عادي | بداية التسلسل |
| onCreate | onStart | تلقائي | عادي | استمرار الإطلاق |
| onStart | onResume | تلقائي | عادي | اكتمال الإطلاق |
| onResume | Activity running | دخول | عادي | بداية التفاعل |
| Activity running | onPause | مقاطعة | عادي | فقدان التركيز |
| onPause | onResume | عودة سريعة | راجع | استئناف بدون اختفاء كامل |
| onPause | onStop | اختفاء تام | عادي | لا رؤية للنشاط |
| onStop | onRestart | عودة المستخدم | راجع | استئناف بعد اختفاء |
| onRestart | onStart | تلقائي | عادي | إعادة تشغيل |
| onStop | onDestroy | انتهاء أو تدمير مؤقت | عادي | إنهاء أو دوران الشاشة |
| onStop | App process killed | نقص ذاكرة | عادي | قتل قسري محتمل |
| onDestroy | Activity shut down | تلقائي | عادي | نهاية الدورة |

```diagram
type: activity
title: Activity Lifecycle
direction: TD
nodes:
  - id: launch
    label: Activity launched
    kind: event
    level: 0
  - id: create
    label: onCreate
    kind: state
    level: 1
  - id: start
    label: onStart
    kind: state
    level: 2
  - id: resume
    label: onResume
    kind: state
    level: 3
  - id: running
    label: Activity running
    kind: state
    level: 4
  - id: pause
    label: onPause
    kind: state
    level: 5
  - id: stop
    label: onStop
    kind: state
    level: 6
  - id: restart
    label: onRestart
    kind: state
    level: 5
  - id: destroy
    label: onDestroy
    kind: state
    level: 7
  - id: shutdown
    label: Activity shut down
    kind: event
    level: 8
edges:
  - from: launch
    to: create
  - from: create
    to: start
  - from: start
    to: resume
  - from: resume
    to: running
  - from: running
    to: pause
  - from: pause
    to: resume
  - from: pause
    to: stop
  - from: stop
    to: restart
  - from: restart
    to: start
  - from: stop
    to: destroy
  - from: destroy
    to: shutdown
```

---

### 22. مقدمة التفاعل بين التطبيقات (Interact with Other Apps)

#### النص الأصلي يقول (English):
> An Android app typically has several activities. Each activity displays a user interface that lets the user perform a specific task, such as viewing a map or taking a photo. To take the user from one activity to another, your app must use an Intent to define your app's "intent" to do something. When you pass an Intent to the system with a method such as startActivity(), the system uses the Intent to identify and start the appropriate app component. Using intents even lets your app start an activity that is contained in a separate app. An Intent is a messaging object you can use to request an action from another app component.

#### الترجمة الحرفية:
> يحتوي تطبيق أندرويد عادةً على عدة أنشطة. يعرض كل نشاط واجهة مستخدم تتيح للمستخدم تنفيذ مهمة محددة، مثل عرض خريطة أو التقاط صورة. لنقل المستخدم من نشاط إلى آخر، يجب على تطبيقك استخدام `Intent` لتحديد "نية" تطبيقك للقيام بشيء ما. عندما تمرّر `Intent` إلى النظام باستخدام دالة مثل `startActivity()`، يستخدم النظام هذا الـ`Intent` لتحديد وتشغيل مكوّن التطبيق المناسب. استخدام الـ`Intent` يتيح لتطبيقك حتى بدء نشاط موجود في تطبيق منفصل تماماً. الـ`Intent` هو كائن رسائل يمكنك استخدامه لطلب إجراء من مكوّن تطبيق آخر.

#### الشرح المبسّط:
`Intent` هو الآلية الرسمية والوحيدة تقريباً للتنقل بين الأنشطة في أندرويد — فبدل استدعاء نشاط آخر مباشرة كما لو كان دالة عادية، تبني "رسالة نية" وتسلّمها للنظام ليقرر هو من يستقبلها وينفذها. هذا مهم لأنه يفصل تماماً بين "من يطلب" و"من ينفذ"، مما يسمح حتى بالتواصل بين تطبيقات مختلفة تماماً بدون معرفة تفاصيل بعضها البعض. يربط هذا الموضوع كل ما سبق (Manifest, Intent Filters) بموضوع جديد هو "كيف تُبنى وتُرسَل الـ Intent فعلياً". تشبيه يومي: مثل إرسال طلب توصيل عبر تطبيق (تكتب ماذا تريد) بدل الذهاب بنفسك لسائق معين، والنظام (شركة التوصيل) يختار السائق المناسب؛ مثال عملي: زر "التقاط صورة" في تطبيقك قد يفتح تطبيق الكاميرا الافتراضي على الجهاز عبر `Intent` بدل بناء كاميرا خاصة به.

**لماذا؟** لأن هذا التصميم يسمح بإعادة استخدام مكوّنات جاهزة (كاميرا، خرائط، بريد) بين كل التطبيقات بدل إعادة بنائها في كل تطبيق على حدة.

---

### 23. أنواع الـ Intent: Explicit و Implicit

#### النص الأصلي يقول (English):
> There are two types of intents: Explicit intents specify which component of which application will satisfy the intent, by specifying a full ComponentName. Implicit intents do not name a specific component, but instead declare a general action to perform, which allows a component from another app to handle it. When you use an implicit intent, the Android system finds the appropriate component to start by comparing the contents of the intent to the intent filters declared in the manifest file of other apps on the device. If the intent matches an intent filter, the system starts that component and delivers it the Intent object. If multiple intent filters are compatible, the system displays a dialog so the user can pick which app to use. An intent filter is an expression in an app's manifest file that specifies the type of intents that the component would like to receive. If we do not declare any intent filters for an activity, then it can be started only with an explicit intent.

#### الترجمة الحرفية:
> هناك نوعان من الـ`Intent`: `Intent` صريح (Explicit) يحدد أي مكوّن من أي تطبيق سيلبي الـ`Intent`، عن طريق تحديد `ComponentName` كامل. `Intent` ضمني (Implicit) لا يسمّي مكوّناً محدداً، بل يُعلن إجراءً عاماً لتنفيذه، مما يسمح لمكوّن من تطبيق آخر بمعالجته. عندما تستخدم `Intent` ضمنياً، يجد نظام أندرويد المكوّن المناسب لبدئه عن طريق مقارنة محتويات الـ`Intent` بفلاتر الـ`Intent` المُعلنة في ملف manifest لتطبيقات أخرى على الجهاز. إذا تطابق الـ`Intent` مع فلتر، يبدأ النظام ذلك المكوّن ويسلّمه كائن الـ`Intent`. إذا كانت هناك فلاتر متعددة متوافقة، يعرض النظام مربع حوار حتى يختار المستخدم أي تطبيق يستخدم. فلتر الـ`Intent` هو تعبير في ملف manifest للتطبيق يحدد نوع الـ`Intents` التي يرغب المكوّن باستقبالها. إذا لم نُعلن أي فلاتر Intent لنشاط، فيمكن بدؤه فقط باستخدام `Intent` صريح.

#### الشرح المبسّط:
هذا هو التمييز الجوهري في الفصل: الـ`Explicit Intent` يحدد بدقة "من" سيُستدعى (كأنك تكتب اسم شخص محدد)، بينما الـ`Implicit Intent` يحدد فقط "ماذا تريد فعله" ويترك للنظام مطابقة الطلب مع كل الأنشطة المُعلنة (عبر Intent Filters) في كل التطبيقات المثبتة على الجهاز. أهمية هذا الفرق أنه يحدد سلوك التطبيق: هل تتحكم أنت بدقة بمن يُفتح (Explicit، مناسب للتنقل داخل تطبيقك نفسه)، أم تترك الخيار مفتوحاً (Implicit، مناسب للتفاعل مع تطبيقات خارجية). يربط هذا مباشرة بموضوع Intent Filters المشروح سابقاً في قسم Manifest، فهو التطبيق العملي لكل تلك الفلاتر. تشبيه يومي: `Explicit` مثل الاتصال برقم هاتف محدد تعرفه، و`Implicit` مثل نشر إعلان عام "أحتاج سباكاً" وينتظر من يستجيب من المؤهلين؛ مثال عملي (موضح في الرسم التخطيطي في الشريحة 24): نشاط A يطلب `startActivity()` فيمرّ الطلب عبر نظام أندرويد ثم يصل لنشاط B عبر `onCreate()`.

**لماذا؟** لأن بعض المهام يجب أن تبقى داخلية بدقة (مثل الانتقال بين شاشات تطبيقك)، بينما مهام أخرى (مثل مشاركة صورة) يجب أن تكون مفتوحة لأي تطبيق قادر على التنفيذ.

#### 📊 المخطط: تدفق Explicit Intent (من شريحة 24)

#### ما هذا المخطط؟
> يوضح كيف ينتقل Intent من نشاط A عبر نظام أندرويد إلى نشاط B بالترتيب الرقمي 1-2-3 الموضح في المحاضرة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Activity A | component | مصدر الطلب |
| 2 | Android System | process | الوسيط الذي يحلل الـ Intent |
| 3 | Activity B | component | الهدف الذي يستقبل الطلب |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Activity A | Android System | startActivity() (1) | عادي | إرسال الـ Intent للنظام |
| Android System | Activity B | onCreate() (2→3) | عادي | تسليم الـ Intent للمكوّن الهدف |

```diagram
type: flowchart
title: Explicit Intent Flow
direction: TD
nodes:
  - id: a
    label: Activity A
    kind: component
    level: 0
  - id: sys
    label: Android System
    kind: process
    level: 1
  - id: b
    label: Activity B
    kind: component
    level: 2
edges:
  - from: a
    to: sys
  - from: sys
    to: b
```

#### 💡 التشبيه:
> `Explicit Intent` كطلب توصيل باسم سائق محدد بالضبط، و`Implicit Intent` كطلب عام لأي سائق متاح.
> **وجه الشبه:** اسم السائق المحدد = `ComponentName`، الطلب العام = الـ`Action` بدون مكوّن محدد.

---

### 24. مكوّنات بناء الـ Intent (نظرة عامة)

#### النص الأصلي يقول (English):
> The primary information contained in an Intent is the following: Component name, Action, Data, Category, Extras, Flags. The properties (component name, action, data, and category) represent the defining characteristics of an intent. By reading these properties, the Android system is able to resolve which app component it should start. However, an intent can carry additional information that does not affect how it is resolved to an app component: Extras and Flags.

#### الترجمة الحرفية:
> المعلومات الأساسية التي يحتويها الـ`Intent` هي التالية: اسم المكوّن، الإجراء (Action)، البيانات (Data)، الفئة (Category)، الإضافات (Extras)، الأعلام (Flags). تمثّل الخصائص (اسم المكوّن، الإجراء، البيانات، والفئة) الصفات المحددة للـ`Intent`. بقراءة هذه الخصائص، يستطيع نظام أندرويد تحديد أي مكوّن تطبيق يجب أن يبدأه. مع ذلك، يمكن للـ`Intent` أن يحمل معلومات إضافية لا تؤثر على كيفية تحليله (resolution) لمكوّن تطبيق: الإضافات والأعلام.

#### الشرح المبسّط:
هذه الفقرة تقسّم مكوّنات الـ`Intent` إلى مجموعتين واضحتين: أربعة عناصر "تحديد الهوية" (Component name, Action, Data, Category) تُستخدم فعلياً في عملية اختيار المكوّن المناسب، ومجموعتين "بيانات مصاحبة" (Extras, Flags) لا تؤثر على القرار لكنها تحمل معلومات إضافية أو تعليمات تشغيلية. الفائدة من هذا التقسيم أنه يمنحك خريطة ذهنية واضحة قبل الدخول في تفاصيل كل عنصر على حدة في الفقرات التالية. يرتبط هذا مباشرة بموضوع "Intent Resolution" اللاحق الذي سيشرح بالضبط كيف تُستخدم هذه العناصر الأربعة في المطابقة. تشبيه يومي: مثل استمارة طلب توظيف فيها حقول أساسية تحدد "هل أنت مؤهل" (الاسم، التخصص) وحقول إضافية (رقم الهاتف، ملاحظات) لا تؤثر على قرار القبول لكنها مفيدة لاحقاً؛ مثال عملي: `Action` و`Data` يحددان أي تطبيق يُفتح، بينما `Extras` قد تحمل فقط النص المراد إرساله.

**لماذا؟** لأن فصل "معايير الاختيار" عن "البيانات المصاحبة" يجعل عملية اختيار المكوّن المناسب أسرع وأوضح للنظام.

---

### 25. Component Name

#### النص الأصلي يقول (English):
> The component name specifies the exact application component (such as an Activity or Service) that should handle the intent. If a component name is specified → the intent is explicit, and the system directly starts the specified component. If no component name is specified → the intent is implicit, and the system determines the appropriate component based on other intent properties (such as action, data, and category). Use a component name when you want to start a specific component within your app. The component name is internally represented as a ComponentName object, which consists of the application package name and the fully qualified class name of the target component, for example, com.example.ExampleActivity.

#### الترجمة الحرفية:
> يحدد اسم المكوّن (component name) مكوّن التطبيق الدقيق (مثل `Activity` أو `Service`) الذي يجب أن يعالج الـ`Intent`. إذا تم تحديد اسم مكوّن → يكون الـ`Intent` صريحاً، ويبدأ النظام مباشرة المكوّن المحدد. إذا لم يُحدَّد اسم مكوّن → يكون الـ`Intent` ضمنياً، ويحدد النظام المكوّن المناسب بناءً على خصائص أخرى للـ`Intent` (مثل الإجراء والبيانات والفئة). استخدم اسم مكوّن عندما تريد بدء مكوّن محدد داخل تطبيقك. يُمثَّل اسم المكوّن داخلياً ككائن `ComponentName`، والذي يتكوّن من اسم حزمة التطبيق (package name) واسم الصنف الكامل للمكوّن الهدف، على سبيل المثال، `com.example.ExampleActivity`.

#### الشرح المبسّط:
اسم المكوّن هو "المفتاح الحاسم" الذي يحدد نوع الـ`Intent`: وجوده يجعله صريحاً وغيابه يجعله ضمنياً — هذا يربط مباشرة بالمفهوم النظري المشروح في الفقرة السابقة (23) ويحوّله لقاعدة عملية بسيطة يمكن تطبيقها في الكود. أهميته العملية أنه الخيار الأنسب عند التنقل داخل تطبيقك نفسه لأنك تعرف بالضبط اسم الصنف الذي تريد فتحه، فلا داعي لترك الأمر للنظام يبحث ويقارن. يرتبط هذا بأول عنصر من العناصر الأربعة المذكورة في الفقرة 24. تشبيه يومي: مثل كتابة عنوان بريدي كامل ودقيق (شارع، رقم منزل، مدينة) بدل وصف عام "بيت أبيض في الحي"؛ مثال عملي: الانتقال من شاشة تسجيل الدخول إلى الشاشة الرئيسية داخل نفس التطبيق دائماً يستخدم `Component Name` صريح.

**لماذا؟** لأن التنقل داخل نفس التطبيق لا يحتاج "بحثاً" من النظام؛ أنت تعرف الوجهة بالضبط فلماذا تترك القرار عشوائياً؟

#### 💻 الكود: تحديد Component Name عبر الـ Constructor

#### ما هذا الكود؟
> إنشاء `Intent` صريح ينتقل من النشاط الحالي إلى `SecondActivity` بالتحديد.

```kotlin
// Create an explicit intent targeting SecondActivity
val intent = Intent(this, SecondActivity::class.java)
// Start the target activity
startActivity(intent)
```

#### شرح كل سطر:
1. `val intent = Intent(this, SecondActivity::class.java)` → `this` يمثّل الـ `Context` الحالي، و`SecondActivity::class.java` هو الكلاس الهدف عبر `Class<T>` في Kotlin.
2. `startActivity(intent)` → تمرير الـ Intent الصريح للنظام لبدء النشاط الهدف مباشرة بدون بحث.

**المكتبات المطلوبة (Imports):**
> `import android.content.Intent`

**الناتج المتوقع (لقطة الشاشة):**
> ينتقل التطبيق فوراً من النشاط الحالي إلى `SecondActivity` بدون أي قائمة اختيار.

#### ⚖️ المقايضة: Explicit مقابل Implicit Intent

| | Explicit Intent | Implicit Intent |
| --- | --- | --- |
| المزايا | دقيق، سريع، آمن، لا يحتاج فلاتر | يدعم التفاعل مع تطبيقات خارجية، مرونة عالية |
| العيوب | يعمل فقط ضمن نفس التطبيق غالباً | قد لا يجد أي تطبيق مطابق (Exception محتمل) |
| متى تختاره | التنقل الداخلي بين شاشات تطبيقك | مشاركة بيانات، فتح روابط، مهام عامة (تصوير، اتصال) |

---

### 26. Action

#### النص الأصلي يقول (English):
> An action is a string that specifies the general operation to be performed by an Intent. It defines the primary purpose of the Intent and largely determines how the rest of the intent is structured—particularly the information that is contained in the data and extras. Some common built-in actions for starting an activity: ACTION_MAIN, ACTION_VIEW, ACTION_SEND, ACTION_DIAL, ACTION_EDIT. An action can be defined using the Intent constructor or the setAction() method.

#### الترجمة الحرفية:
> الإجراء (Action) هو سلسلة نصية تحدد العملية العامة التي يجب تنفيذها بواسطة الـ`Intent`. يحدد الغرض الأساسي من الـ`Intent` ويحدد إلى حد كبير كيفية بناء بقية الـ`Intent` — خصوصاً المعلومات الموجودة في البيانات والإضافات. بعض الإجراءات المدمجة الشائعة لبدء نشاط: `ACTION_MAIN` (نقطة الدخول، لا يتوقع بيانات)، `ACTION_VIEW` (عرض معلومة للمستخدم كصورة أو موقع)، `ACTION_SEND` (مشاركة بيانات مع تطبيقات أخرى)، `ACTION_DIAL` (فتح الطلب الهاتفي برقم محدد يبدأه المستخدم يدوياً)، `ACTION_EDIT` (تعديل بيانات موجودة). يمكن تحديد الإجراء باستخدام الـ Constructor أو دالة `setAction()`.

#### الشرح المبسّط:
`Action` هو "الفعل" الذي يريد الـ`Intent` تنفيذه، وهو أهم عنصر من ناحية أنه يحدد شكل باقي الـ`Intent` — فمثلاً `ACTION_EDIT` يفترض وجود بيانات موجودة مسبقاً للتعديل عليها، بينما `ACTION_MAIN` لا يحتاج أي بيانات إطلاقاً. أهمية هذا المفهوم أنه العنصر الرئيسي المستخدم في الـ`Implicit Intent` للمطابقة مع `intent-filter`s الأنشطة الأخرى (كما رأينا سابقاً في `<action>` element). يرتبط هذا مباشرة بموضوع Intent Filters من بداية المحاضرة، فـ`Action` هو نفس القيمة التي تُقارَن بعنصر `<action>` في الفلتر. تشبيه يومي: مثل كلمة الفعل في جملة الطلب "أرسل" أو "اعرض" أو "عدّل"، تحدد نوع الخدمة المطلوبة قبل تفاصيلها؛ مثال عملي: `ACTION_DIAL` يفتح تطبيق الهاتف مع رقم مُعبّأ مسبقاً لكن يترك للمستخدم الضغط على "اتصال" يدوياً (بعكس إجراء آخر قد يتصل تلقائياً).

**لماذا؟** لأن تحديد "الفعل" أولاً يسمح للنظام والمطوّر بمعرفة أي بيانات إضافية متوقعة قبل حتى النظر في تفاصيلها.

#### 💻 الكود: تحديد Action بطريقتين

#### ما هذا الكود؟
> بناء Intent بإجراء `ACTION_DIAL` بطريقتين مختلفتين تعطيان نفس النتيجة.

```kotlin
// Method 1: pass the action directly in the constructor
val intent1 = Intent(Intent.ACTION_DIAL)

// Method 2: use apply and set the action property
val intent2 = Intent().apply {
    // The action property internally calls setAction()
    action = Intent.ACTION_DIAL
}
```

#### شرح كل سطر:
1. `val intent1 = Intent(Intent.ACTION_DIAL)` → أسرع طريقة عند معرفة الإجراء وقت الإنشاء مباشرة.
2. `val intent2 = Intent().apply {` → إنشاء Intent فارغ لتهيئته بعدة خصائص لاحقاً.
3. `action = Intent.ACTION_DIAL` → صياغة الخاصية في Kotlin هي غلاف (wrapper) يستدعي داخلياً `setAction()`.

**المكتبات المطلوبة (Imports):**
> `import android.content.Intent`

**الناتج المتوقع (لقطة الشاشة):**
> فتح تطبيق الطلب الهاتفي (Dialer) دون الاتصال تلقائياً.

---

### 27. Data

#### النص الأصلي يقول (English):
> The data field of an Intent specifies the URI (as a Uri object) that identifies the data to be acted on. It may also be associated with a MIME type that describes the type of that data. The type of data is generally determined by the Intent's action. When creating an Intent, it is often important to specify both URI and MIME type. The MIME type helps the Android system find the best component to receive your intent. The MIME type can sometimes be inferred from the URI.

#### الترجمة الحرفية:
> يحدد حقل البيانات (data) في الـ`Intent` الـ URI (ككائن `Uri`) الذي يحدد البيانات المراد التصرف عليها. قد يكون مرتبطاً أيضاً بنوع MIME يصف نوع تلك البيانات. نوع البيانات يُحدَّد عموماً بواسطة إجراء الـ`Intent`. عند إنشاء Intent، من المهم غالباً تحديد كل من URI ونوع MIME معاً. نوع MIME يساعد نظام أندرويد على إيجاد أفضل مكوّن لاستقبال الـ`Intent`. يمكن أحياناً استنتاج نوع MIME من الـ URI.

#### الشرح المبسّط:
`Data` هي "العنوان" الذي يشير إلى البيانات الفعلية المراد التعامل معها (مثل رقم هاتف، رابط ويب، أو ملف صورة)، ويُفضَّل غالباً إرفاقه مع نوع MIME حتى يعرف النظام بدقة نوع المحتوى وليس فقط مكانه. أهمية هذا الجمع بين URI ونوع MIME أنها تمنع أخطاءً مضحكة مثل فتح تطبيق تشغيل صوت لملف هو في الحقيقة صورة، رغم أن صيغة الـ URI قد تبدو متشابهة. يرتبط هذا مباشرة بمفهوم `Action` السابق لأن نوع البيانات يتحدد غالباً بناءً على الإجراء المختار (كما ذُكر: "generally determined by the Intent's action"). تشبيه يومي: مثل كتابة عنوان منزل (URI) مع ملاحظة "هذا مستودع وليس منزل سكني" (MIME type) حتى لا يخطئ من يقرأ العنوان في فهم طبيعة المكان؛ مثال عملي: URI بصيغة `tel:` يفتح تطبيق الاتصال بينما URI بصيغة `content://` قد يفتح معرض الصور.

**لماذا؟** لأن نفس شكل الـ URI قد يخدع النظام بدون نوع MIME، فتحديد النوع صراحة يضمن اختيار التطبيق الصحيح للمهمة الصحيحة.

#### 💻 الكود: طرق تحديد Data المختلفة

#### ما هذا الكود؟
> ثلاث طرق لتحديد بيانات الـ Intent: URI فقط، نوع MIME فقط، أو كلاهما معاً.

```kotlin
// Setting only a URI (dial a phone number)
val callIntent = Intent(Intent.ACTION_VIEW, Uri.parse("tel:+15145551234"))

// Equivalent using apply with separate data assignment
val callIntent2 = Intent().apply {
    action = Intent.ACTION_VIEW
    data = Uri.parse("tel:+15145551234")
}

// Setting only a MIME type (any image)
val pickImageIntent = Intent().apply {
    type = "image/*"
}

// Setting both URI and MIME type explicitly together
val viewImageIntent = Intent().apply {
    setDataAndType(
        Uri.parse("content://media/external/images/media/100"),
        "image/jpeg"
    )
}
```

#### شرح كل سطر:
1. `Intent(Intent.ACTION_VIEW, Uri.parse("tel:+15145551234"))` → بناء مباشر بمُنشئ يقبل الإجراء وURI معاً.
2. `data = Uri.parse("tel:+15145551234")` → استخدام الخاصية بدل استدعاء `setData()` مباشرة.
3. `type = "image/*"` → تحديد نوع MIME بدون تحديد أي URI.
4. `setDataAndType(Uri.parse(...), "image/jpeg")` → الطريقة الموصى بها عند وجود كلا القيمتين معاً لتجنّب استبدال إحداهما للأخرى.

**المكتبات المطلوبة (Imports):**
> `import android.net.Uri`
> `import android.content.Intent`

**الناتج المتوقع (لقطة الشاشة):**
> يفتح النظام تطبيق الطلب الهاتفي، أو معرض الصور، حسب الحالة المستخدمة.

#### مهم للامتحان ⚠️:
> استخدام `setData()` ثم `setType()` منفصلَين يمسح أحدهما الآخر — يجب استخدام `setDataAndType()` عند الحاجة لكليهما معاً.

---

### 28. Category

#### النص الأصلي يقول (English):
> A category is a string containing additional information about the kind of component that should handle the intent. Any number of category descriptions can be placed in an intent, but most intents do not require a category. Some common categories: CATEGORY_BROWSABLE, CATEGORY_LAUNCHER, CATEGORY_DEFAULT. You can specify a category with addCategory().

#### الترجمة الحرفية:
> الفئة (category) هي سلسلة نصية تحتوي معلومات إضافية عن نوع المكوّن الذي يجب أن يعالج الـ`Intent`. يمكن وضع أي عدد من أوصاف الفئة في Intent واحد، لكن معظم الـ`Intents` لا تتطلب فئة. بعض الفئات الشائعة: `CATEGORY_BROWSABLE` (يمكن فتح النشاط الهدف من متصفح ويب)، `CATEGORY_LAUNCHER` (يحدد نقطة الدخول الرئيسية للتطبيق ويستخدمها مشغّل النظام)، `CATEGORY_DEFAULT` (تُضاف تلقائياً للـ Intents الممرَّرة لـ `startActivity()` إن لم تُحدَّد فئة أخرى؛ يجب على الأنشطة إعلان هذه الفئة في فلاترها لاستقبال Intents ضمنية). يمكنك تحديد فئة باستخدام `addCategory()`.

#### الشرح المبسّط:
`Category` تضيف "سياقاً" إضافياً حول طبيعة المكوّن المطلوب، وهي غالباً غير ضرورية لأن `CATEGORY_DEFAULT` تُضاف تلقائياً في معظم الحالات، لكنها ضرورية جداً في حالات محددة مثل تحديد النشاط الرئيسي للتطبيق (`CATEGORY_LAUNCHER`) أو السماح بفتحه من متصفح (`CATEGORY_BROWSABLE`). أهمية هذا المفهوم أنه يفسّر لماذا رأينا `<category android:name="android.intent.category.DEFAULT" />` مذكورة مسبقاً في مثال Intent Filter بقسم Manifest — هي الشرط الافتراضي الذي يجب أن يطابقه أي نشاط يريد استقبال Intents ضمنية عادية. يرتبط هذا مباشرة بموضوع Intent Filters المشروح سابقاً كتفصيل إضافي لأحد عناصره الثلاثة. تشبيه يومي: مثل وسم إضافي على طرد بريدي "هش" أو "عاجل" يوضح كيف يجب التعامل معه دون أن يغيّر وجهته الأساسية؛ مثال عملي: نشاط `MainActivity` يحتاج `CATEGORY_LAUNCHER` مع `ACTION_MAIN` معاً ليظهر أيقونته في قائمة التطبيقات.

**لماذا؟** لأن بعض السلوكيات الخاصة (كالظهور كأيقونة رئيسية أو القبول من متصفح) تحتاج إشارة صريحة إضافية غير كافية بمجرد `Action` وحده.

#### 💻 الكود: إضافة Category

#### ما هذا الكود؟
> بناء Intent لعرض رابط ويب مع تحديد أنه قابل للفتح من المتصفح.

```kotlin
// Build an intent to view a web page and mark it browsable
val intent = Intent(Intent.ACTION_VIEW).apply {
    data = Uri.parse("https://example.com")
    // Add a category describing extra context for the intent
    addCategory(Intent.CATEGORY_BROWSABLE)
}
```

#### شرح كل سطر:
1. `Intent(Intent.ACTION_VIEW).apply {` → إنشاء Intent بإجراء عرض بيانات.
2. `data = Uri.parse("https://example.com")` → تحديد الرابط المراد عرضه.
3. `addCategory(Intent.CATEGORY_BROWSABLE)` → إضافة فئة توضح إمكانية فتح هذا النشاط من المتصفح.

**المكتبات المطلوبة (Imports):**
> `import android.net.Uri`
> `import android.content.Intent`

**الناتج المتوقع (لقطة الشاشة):**
> يفتح النظام المتصفح الافتراضي أو أي تطبيق مسجّل لاستقبال روابط `https`.

---

### 29. Extras

#### النص الأصلي يقول (English):
> Extras are Key-value pairs that carry additional information required to accomplish the requested action. Just as some actions use particular kinds of data URIs, some actions also use particular extras. You can add extra data with various putExtra() methods, each accepting two parameters: the key name and the value. You can also create a Bundle object with all the extra data, then insert the Bundle in the Intent with putExtras(). Extras support a variety of data types, including primitives, arrays, strings, and objects such as Parcelable.

#### الترجمة الحرفية:
> الإضافات (Extras) هي أزواج مفتاح-قيمة تحمل معلومات إضافية مطلوبة لإنجاز الإجراء المطلوب. تماماً كما تستخدم بعض الإجراءات أنواعاً معينة من URIs للبيانات، تستخدم بعض الإجراءات أيضاً إضافات معينة. يمكنك إضافة بيانات إضافية باستخدام دوال `putExtra()` المختلفة، وكل واحدة تقبل معلمتين: اسم المفتاح والقيمة. يمكنك أيضاً إنشاء كائن `Bundle` يحتوي كل البيانات الإضافية، ثم إدراج الـ`Bundle` في الـ`Intent` باستخدام `putExtras()`. تدعم الإضافات أنواعاً متعددة من البيانات، تشمل الأنواع الأولية، المصفوفات، السلاسل النصية، وكائنات مثل `Parcelable`.

#### الشرح المبسّط:
`Extras` هي الطريقة العملية لإرفاق "محتوى فعلي" مع الـ`Intent` بعد أن تحدّد شكله عبر Action/Data/Category — فمثلاً إجراء إرسال بريد يحدد أن العملية "إرسال"، لكن نص الرسالة نفسه ينتقل عبر `Extras`. أهميتها أنها تُذكّرنا أن Action/Data/Category هي "معايير التوجيه" بينما Extras هي "المحتوى الفعلي" غير المستخدم في المطابقة كما ذُكر سابقاً في الفقرة 24. يرتبط هذا مباشرة بمثال `putExtra(Intent.EXTRA_TEXT, textMessage)` الذي رأيناه مسبقاً في بداية المحاضرة عند شرح Intent Filters، وهذه الفقرة توضّحه بالتفصيل. تشبيه يومي: مثل ظرف بريدي (Extras) يحمل الرسالة الفعلية، بينما العنوان على الظرف (Action/Data) يحدد فقط إلى أين يذهب؛ مثال عملي: إرسال بريد إلكتروني يحتاج موضوعاً ونصاً كإضافات منفصلة.

**لماذا؟** لأن فصل "معايير التوجيه" عن "المحتوى الفعلي" يسمح للنظام بمطابقة الـ Intent بسرعة دون الحاجة لفحص كل البيانات المرفقة الثقيلة.

#### 💻 الكود: إرسال بريد إلكتروني مع Extras

#### ما هذا الكود؟
> بناء Intent كامل لإرسال بريد إلكتروني يتضمن عنوان المستلم والموضوع والنص، مع عرض قائمة اختيار للمستخدم.

```kotlin
// Build an intent addressed to a specific mailto URI
val emailIntent = Intent(Intent.ACTION_SENDTO).apply {
    // Set the recipient using a mailto URI
    data = Uri.parse("mailto:someone@example.com")
    // Attach the email subject as an extra
    putExtra(Intent.EXTRA_SUBJECT, "Hello")
    // Attach the email body as an extra
    putExtra(Intent.EXTRA_TEXT, "This is the body of the email")
}
// Show a chooser so the user picks an email app
startActivity(Intent.createChooser(emailIntent, "Choose an email client"))
```

#### شرح كل سطر:
1. `Intent(Intent.ACTION_SENDTO).apply {` → إجراء مخصص لإرسال بيانات لعنوان محدد (مقابل ACTION_SEND العام).
2. `data = Uri.parse("mailto:someone@example.com")` → تحديد عنوان المستلم عبر مخطط `mailto`.
3. `putExtra(Intent.EXTRA_SUBJECT, "Hello")` → إرفاق موضوع الرسالة بمفتاح قياسي معروف.
4. `putExtra(Intent.EXTRA_TEXT, "This is the body of the email")` → إرفاق نص الرسالة.
5. `startActivity(Intent.createChooser(emailIntent, "Choose an email client"))` → عرض قائمة اختيار صريحة بدل الانتقال تلقائياً لتطبيق واحد فقط.

**المكتبات المطلوبة (Imports):**
> `import android.net.Uri`
> `import android.content.Intent`

**الناتج المتوقع (لقطة الشاشة):**
> يظهر مربع حوار لاختيار تطبيق بريد، وبعد الاختيار تُفتح شاشة كتابة رسالة معبأة مسبقاً بالعنوان والموضوع والنص.

---

### 30. Flags

#### النص الأصلي يقول (English):
> Flags function as metadata for the intent and are used to control how the Android system launches and manages an activity. Example: The flags may instruct the Android system which task the activity should belong to and how to treat it after it's launched (whether it belongs in the list of recent activities). Some common flags: FLAG_ACTIVITY_NO_HISTORY, FLAG_DEBUG_LOG_RESOLUTION. You can specify flags using setFlags() or addFlags() methods.

#### الترجمة الحرفية:
> تعمل الأعلام (Flags) كبيانات وصفية (metadata) للـ`Intent` وتُستخدم للتحكم بكيفية إطلاق نظام أندرويد وإدارته لنشاط ما. مثال: قد توجّه الأعلام نظام أندرويد أي مهمة (task) يجب أن ينتمي إليها النشاط وكيف يُعامَل بعد إطلاقه (سواء ينتمي لقائمة الأنشطة الأخيرة أم لا). بعض الأعلام الشائعة: `FLAG_ACTIVITY_NO_HISTORY` (إذا فُعِّل، لا يُحفظ النشاط في المكدس الخلفي؛ بمجرد مغادرة المستخدم له، ينتهي النشاط)، `FLAG_DEBUG_LOG_RESOLUTION` (تُستخدم للتصحيح؛ عند تفعيلها تُطبع رسائل سجل أثناء تحليل هذا الـ`Intent` لتوضيح ما وُجد لبناء قائمة الحل النهائية). يمكنك تحديد الأعلام باستخدام دوال `setFlags()` أو `addFlags()`.

#### الشرح المبسّط:
`Flags` هي آخر عنصر في بناء الـ`Intent`، وهي بيانات وصفية "تشغيلية" (وليست محتوى ولا معيار مطابقة) تخبر النظام كيف يتعامل مع النشاط بعد إطلاقه، مثل هل يبقى في سجل التنقل (back stack) أم لا. أهميتها في حالات خاصة مثل شاشات تسجيل الدخول التي لا نريد أن يعود المستخدم إليها بالضغط على زر الرجوع بعد نجاح الدخول. يرتبط هذا مباشرة بالفقرة 24 كإكمال أخير للعنصر السادس من عناصر بناء الـ`Intent`. تشبيه يومي: مثل تعليمات خاصة على طرد بريدي "لا تُعِد هذا الطرد لصندوق البريد بعد التسليم" (NO_HISTORY)؛ مثال عملي: بعد نجاح تسجيل الدخول، استخدام `FLAG_ACTIVITY_NO_HISTORY` على نشاط تسجيل الدخول يمنع المستخدم من العودة إليه بزر الرجوع.

**لماذا؟** لأن بعض الشاشات (كصفحات تسجيل الدخول أو splash screens) يجب ألا تظهر مجدداً عند الضغط على زر الرجوع، والأعلام هي الآلية للتحكم في هذا السلوك.

#### 💻 الكود: استخدام Flag

#### ما هذا الكود؟
> بناء Intent مع علم يمنع حفظ النشاط في سجل التنقل.

```kotlin
// Build an intent with a flag controlling back-stack behavior
val newInt = Intent(Intent.ACTION_SEND).apply {
    // Prevent this activity from remaining in the history stack
    flags = Intent.FLAG_ACTIVITY_NO_HISTORY
    // Alternative way to add a flag without overwriting others:
    // addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY)
}
```

#### شرح كل سطر:
1. `Intent(Intent.ACTION_SEND).apply {` → إنشاء Intent بإجراء إرسال.
2. `flags = Intent.FLAG_ACTIVITY_NO_HISTORY` → تعيين العلم مباشرة (يستبدل أي أعلام سابقة).
3. `// addFlags(...)` → بديل يضيف العلم دون مسح الأعلام الأخرى الموجودة مسبقاً.

**المكتبات المطلوبة (Imports):**
> `import android.content.Intent`

**الناتج المتوقع (لقطة الشاشة):**
> النشاط المستهدف لا يظهر في قائمة "الأنشطة الأخيرة" بعد مغادرته.

#### ⚖️ المقايضة: setFlags() مقابل addFlags()

| | setFlags() | addFlags() |
| --- | --- | --- |
| المزايا | بسيط وواضح عند علم واحد | يحافظ على الأعلام الموجودة مسبقاً |
| العيوب | يستبدل أي أعلام سابقة بالكامل | كود أطول قليلاً |
| متى تختاره | عند تعيين علم واحد فقط من البداية | عند إضافة علم جديد لأعلام موجودة مسبقاً |

---

### 31. استقبال Implicit Intent — إعلان الفلاتر

#### النص الأصلي يقول (English):
> To advertise which implicit intents your app can receive, declare one or more intent filters for each of your app components with an <intent-filter> element in your manifest file. The system delivers an implicit intent to your app component only if the intent can pass through one of your intent filters. In each app component that includes an <intent-filter> element, explicitly set a value for android:exported. An app component should declare separate filters for each unique job it can do. Inside the <intent-filter>, you can specify the type of intents to accept using one or more of these three elements: <action>, <data>, <category>.

#### الترجمة الحرفية:
> للإعلان عن الـ`Intents` الضمنية التي يمكن لتطبيقك استقبالها، أعلن فلتر أو أكثر لكل مكوّن من مكوّنات تطبيقك باستخدام عنصر `<intent-filter>` في ملف manifest. يسلّم النظام Intent ضمنياً لمكوّن تطبيقك فقط إذا كان الـ`Intent` يستطيع المرور عبر أحد فلاتره. في كل مكوّن تطبيق يتضمن عنصر `<intent-filter>`، عيّن قيمة صريحة لخاصية `android:exported`. يجب على مكوّن التطبيق إعلان فلاتر منفصلة لكل مهمة فريدة يستطيع تنفيذها. داخل `<intent-filter>`، يمكنك تحديد نوع الـ`Intents` المقبولة باستخدام واحد أو أكثر من هذه العناصر الثلاثة: `<action>`، `<data>`، `<category>`.

#### الشرح المبسّط:
هذه الفقرة تعيد نفس مفهوم Intent Filters المشروح في بداية المحاضرة لكن من "زاوية الاستقبال" وليس الإرسال، وتضيف تفصيلاً جديداً مهماً وهو ضرورة تحديد `android:exported` صراحة لكل مكوّن له فلتر، لأسباب أمنية حديثة في أندرويد. القاعدة العملية المهمة هنا هي "فلتر منفصل لكل مهمة" — فلا يجب دمج مهام مختلفة تماماً (كاستقبال نص واستقبال صورة) في فلتر واحد، بل فلاتر متعددة لكل نشاط. يرتبط هذا مباشرة بموضوع "Declare intent filters" من بداية المحاضرة كإعادة وتوسيع له بعد أن تعلمنا تفاصيل بناء الـ Intent. تشبيه يومي: مثل موظف استقبال في شركة له لوحة معلنة بوضوح "أستقبل: طلبات الدعم الفني فقط" (فلتر محدد) بدل قبول أي طلب عشوائي؛ مثال عملي: نشاط مشاركة يحتاج فلتراً منفصلاً لاستقبال النصوص وفلتراً آخر لاستقبال الصور.

**لماذا؟** لأن تحديد `android:exported` صراحة يمنع الوصول العرضي غير المقصود من تطبيقات خارجية لمكوّنات لم يُقصد جعلها عامة.

---

### 32. مثال كامل على فلاتر تطبيق مشاركة اجتماعي

#### النص الأصلي يقول (English):
> Example filters from the manifest file of a social-sharing app: MainActivity handles ACTION_MAIN with CATEGORY_LAUNCHER. ShareActivity handles SEND actions with text data, and also handles SEND and SEND_MULTIPLE with media data (panorama, image, video MIME types). The first activity, MainActivity, is the app's main entry: The ACTION_MAIN action indicates this is the main entry point and does not expect any intent data. The CATEGORY_LAUNCHER category indicates that this activity's icon should be placed in the system's app launcher. These two must be paired together in order for the activity to appear in the app launcher. The second activity, ShareActivity, is designed to handle sharing content. It can be launched from within the app, or from another app via an implicit intent that matches its intent filters.

#### الترجمة الحرفية:
> أمثلة فلاتر من ملف manifest لتطبيق مشاركة اجتماعي: `MainActivity` تعالج `ACTION_MAIN` مع `CATEGORY_LAUNCHER`. `ShareActivity` تعالج إجراءات `SEND` ببيانات نصية، وتعالج أيضاً `SEND` و`SEND_MULTIPLE` ببيانات وسائط (بانوراما، صورة، فيديو). النشاط الأول، `MainActivity`، هو نقطة الدخول الرئيسية للتطبيق: إجراء `ACTION_MAIN` يشير إلى أن هذه نقطة الدخول الرئيسية ولا يتوقع أي بيانات Intent. فئة `CATEGORY_LAUNCHER` تشير إلى أن أيقونة هذا النشاط يجب أن توضع في مشغّل التطبيقات الخاص بالنظام. يجب اقتران هاتين معاً كي يظهر النشاط في مشغّل التطبيقات. النشاط الثاني، `ShareActivity`، مصمَّم لمعالجة مشاركة المحتوى. يمكن إطلاقه من داخل التطبيق، أو من تطبيق آخر عبر Intent ضمني يطابق فلاتره.

#### الشرح المبسّط:
هذا مثال متكامل يجمع كل ما تعلمناه: نشاط واحد (`MainActivity`) مسؤول عن كونه نقطة الدخول فقط (يحتاج زوج `ACTION_MAIN` + `CATEGORY_LAUNCHER` معاً بالضبط)، ونشاط آخر (`ShareActivity`) له فلترين منفصلين لمهمتين مختلفتين (نص، ووسائط) تماشياً مع قاعدة "فلتر منفصل لكل مهمة" المذكورة في الفقرة السابقة. أهمية هذا المثال أنه يوضح عملياً كيف يمكن لنشاط واحد أن يمتلك أكثر من `intent-filter` في نفس الوقت لخدمة أكثر من سيناريو استخدام. يربط هذا كل الأفكار السابقة (Manifest, Action, Category, Data) في سياق واحد واقعي. تشبيه يومي: مثل موظف استقبال شركة له لافتتان منفصلتان: واحدة "الدخول الرئيسي هنا" وأخرى "قسم الشكاوى والمقترحات هنا"، كل لافتة لمهمة مختلفة تماماً؛ مثال عملي: زر "مشاركة" في تطبيق معرض صور يستدعي `ShareActivity` في هذا التطبيق الاجتماعي مباشرة عبر فلتر الوسائط.

**لماذا؟** لأن دمج زوج `ACTION_MAIN`/`CATEGORY_LAUNCHER` تحديداً هو الشرط الوحيد الذي يجعل النظام يعرض أيقونة تطبيقك في قائمة التطبيقات الرئيسية.

#### 💻 الكود الكامل: فلاتر تطبيق مشاركة اجتماعي

#### ما هذا الكود؟
> ملف manifest جزئي لتطبيق مشاركة يحتوي نشاطين: نقطة دخول رئيسية، ونشاط مشاركة بفلترين منفصلين.

```xml
<!-- Main entry point activity -->
<activity android:name="MainActivity" android:exported="true">
  <!-- This activity is the main entry, should appear in app launcher -->
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
</activity>

<!-- Activity dedicated to handling shared content -->
<activity android:name="ShareActivity" android:exported="true">
  <!-- This filter handles SEND actions with plain text data -->
  <intent-filter>
    <action android:name="android.intent.action.SEND"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <data android:mimeType="text/plain"/>
  </intent-filter>
  <!-- This filter also handles SEND and SEND_MULTIPLE with media data -->
  <intent-filter>
    <action android:name="android.intent.action.SEND"/>
    <action android:name="android.intent.action.SEND_MULTIPLE"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <data android:mimeType="application/vnd.google.panorama360+jpg"/>
    <data android:mimeType="image/*"/>
    <data android:mimeType="video/*"/>
  </intent-filter>
</activity>
```

#### شرح كل سطر:
1. `<activity android:name="MainActivity" android:exported="true">` → إعلان النشاط الرئيسي وجعله متاحاً لمشغّل النظام.
2. `<action android:name="android.intent.action.MAIN" />` + `<category .../LAUNCHER" />` → الزوج الإلزامي لظهور أيقونة التطبيق.
3. `<activity android:name="ShareActivity" ...>` → إعلان نشاط منفصل مخصص للمشاركة.
4. الفلتر الأول: `SEND` + `DEFAULT` + `text/plain` → يقبل فقط نصوصاً عادية.
5. الفلتر الثاني: `SEND`/`SEND_MULTIPLE` + عدة أنواع MIME للوسائط → يقبل صوراً وفيديو وبانوراما، وحتى مشاركات متعددة الملفات.

**المكتبات المطلوبة (Imports):**
> لا يوجد؛ كود XML ضمن manifest.

**الناتج المتوقع (لقطة الشاشة):**
> أيقونة التطبيق تظهر في قائمة التطبيقات، وعند مشاركة نص أو صورة من أي تطبيق آخر يظهر هذا التطبيق ضمن خيارات المشاركة.

---

### 33. Intent Resolution — مقدمة

#### النص الأصلي يقول (English):
> When the system receives an implicit intent to start an activity, it searches for the best activity for the intent by comparing it to intent filters based on three aspects: Action, Data (both URI and data type), Category.

#### الترجمة الحرفية:
> عندما يستقبل النظام Intent ضمنياً لبدء نشاط، يبحث عن أفضل نشاط لهذا الـ`Intent` عن طريق مقارنته بفلاتر الـ`Intent` بناءً على ثلاثة جوانب: الإجراء (Action)، البيانات (Data، سواء URI أو نوع البيانات)، الفئة (Category).

#### الشرح المبسّط:
هذه الفقرة تربط كل شيء معاً — الآن نعرف أن عملية "تحليل الـ Intent" (Intent Resolution) تعتمد بالضبط على العناصر الثلاثة الأولى من العناصر الأربعة الأساسية المذكورة في الفقرة 24 (باستثناء Component name لأنه غير موجود أصلاً في Intent ضمني). أهمية هذه المقدمة أنها تمهّد لثلاث فقرات تفصيلية قادمة، كل واحدة تشرح "اختبار" مطابقة منفصل لكل عنصر من الثلاثة. يرتبط هذا مباشرة بمفهوم Implicit Intent المشروح في الفقرة 23 كتفصيل تقني لكيفية عمل "البحث والمطابقة" الذي ذُكر هناك بشكل عام. تشبيه يومي: مثل نظام توظيف آلي يفحص طلب توظيف عبر ثلاثة معايير بالضبط (المسمى الوظيفي، نوع الملف المرفق، والفئة العمرية) قبل قبول المرشح؛ مثال عملي سيأتي في الفقرات التالية عبر أمثلة أفعال وبيانات وفئات محددة.

**لماذا؟** لأن تقسيم عملية المطابقة لثلاثة اختبارات منفصلة يجعلها منهجية وقابلة للتنبؤ بدقة بدل أن تكون عشوائية.

---

### 34. اختبار الـ Action

#### النص الأصلي يقول (English):
> To specify accepted intent actions, an intent filter can declare zero or more <action> elements. To pass this filter, the action specified in the Intent must match one of the actions listed in the filter. If the filter does not list any actions, there is nothing for an intent to match, so all intents fail the test. If an Intent does not specify an action, it passes the test as long as the filter contains at least one action.

#### الترجمة الحرفية:
> لتحديد الإجراءات المقبولة، يمكن لفلتر Intent إعلان صفر أو أكثر من عناصر `<action>`. لاجتياز هذا الفلتر، يجب أن يطابق الإجراء المحدد في الـ`Intent` أحد الإجراءات المذكورة في الفلتر. إذا لم يذكر الفلتر أي إجراءات، فلا يوجد ما يطابقه أي Intent، لذلك تفشل كل الـ`Intents` هذا الاختبار. إذا لم يحدد Intent إجراءً، فإنه يجتاز الاختبار طالما يحتوي الفلتر على إجراء واحد على الأقل.

#### الشرح المبسّط:
اختبار الـ Action له قاعدة واضحة: يكفي تطابق واحد فقط بين إجراء الـ`Intent` وأي إجراء مذكور في قائمة الفلتر (وليس تطابقاً كاملاً للقائمة)، لكن فلتراً بلا أي `<action>` مذكور يرفض كل شيء تلقائياً لأنه لا يوجد أساس للمقارنة. الحالة الاستثنائية المهمة هنا هي: Intent بلا إجراء محدد إطلاقاً ينجح تلقائياً في هذا الاختبار طالما الفلتر يحتوي إجراءً واحداً على الأقل، وهذا سلوك قد يبدو غريباً لكنه منطقي لأن غياب الشرط لا يمكن أن يُخالف شرطاً موجوداً. يرتبط هذا مباشرة بمثال `ExampleActivity` من بداية المحاضرة حيث كان يحتوي `<action android:name="android.intent.action.SEND" />` وحيد. تشبيه يومي: مثل اختبار توظيف يقبل أي مرشح يمتلك واحدة على الأقل من المهارات المطلوبة في القائمة، لكن يرفض تلقائياً كل المرشحين إذا كانت قائمة المهارات المطلوبة فارغة أصلاً؛ مثال عملي أدناه بجدول تتبع.

**لماذا؟** لأن اشتراط "تطابق واحد فقط" (وليس كل القائمة) يمنح مرونة لكي يعالج نشاط واحد عدة أنواع إجراءات مشابهة عبر فلتر واحد.

#### 🔍 تتبع التنفيذ: اختبار Action

**المدخل:** فلتر يحتوي `EDIT` و`VIEW`؛ Intent وارد بإجراء `VIEW`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | قراءة إجراء الـ Intent الوارد | Action = VIEW |
| 2 | مقارنته مع قائمة الفلتر [EDIT, VIEW] | يوجد تطابق مع VIEW |
| 3 | القرار | اجتياز اختبار الـ Action |

**النتيجة:** الـ Intent يجتاز اختبار الـ Action وينتقل لاختبار الـ Category.

---

### 35. اختبار الـ Category

#### النص الأصلي يقول (English):
> To specify accepted intent categories, an intent filter can declare zero or more <category> elements. For an intent to pass the category test, every category in the Intent must match a category in the filter. The reverse is not necessary—the intent filter may declare more categories than are specified in the Intent and the Intent still passes. Therefore, an intent with no categories always passes this test, regardless of what categories are declared in the filter.

#### الترجمة الحرفية:
> لتحديد فئات Intent المقبولة، يمكن لفلتر Intent إعلان صفر أو أكثر من عناصر `<category>`. لكي يجتاز Intent اختبار الفئة، يجب أن تطابق كل فئة في الـ`Intent` فئة موجودة في الفلتر. العكس ليس ضرورياً — قد يُعلن فلتر الـ`Intent` فئات أكثر مما هو محدد في الـ`Intent` ويظل الـ`Intent` يجتاز الاختبار. لذلك، Intent بدون أي فئات يجتاز هذا الاختبار دائماً، بغض النظر عن الفئات المُعلنة في الفلتر.

#### الشرح المبسّط:
هذا الاختبار عكس منطق اختبار الـ Action تماماً: هنا يجب أن تكون كل فئات الـ`Intent` موجودة ضمن فئات الفلتر (وليس تطابقاً واحداً فقط)، بينما الفلتر يمكن أن يحتوي فئات إضافية زائدة دون أن يضر ذلك. هذا يفسر لماذا `CATEGORY_DEFAULT` مهمة جداً عملياً: لأن `startActivity()` تضيفها تلقائياً لكل Intent صادر، فأي نشاط يريد استقبال Intents ضمنية عادية يجب أن يعلن `CATEGORY_DEFAULT` في فلتره وإلا سيفشل هذا الاختبار تحديداً. يرتبط هذا مباشرة بالفقرة 28 حول Category العامة، ويطبّق نفس المفهوم في سياق المطابقة. تشبيه يومي: مثل اشتراط أن كل الشهادات التي يقدمها المرشح (فئات الـ Intent) يجب أن تكون معترفاً بها من الشركة (فئات الفلتر)، لكن يمكن للشركة قبول شهادات أخرى إضافية لا يملكها المرشح دون مشكلة؛ مثال عملي في جدول التتبع التالي.

**لماذا؟** لأن هذا المنطق (كل فئات Intent ⊆ فئات الفلتر) يضمن أن النشاط "يعِد" فعلياً بدعم كل ما يطلبه المُرسِل، لا أقل.

#### 🔍 تتبع التنفيذ: اختبار Category

**المدخل:** فلتر يحتوي [DEFAULT, BROWSABLE]؛ Intent وارد بفئة واحدة فقط [DEFAULT]

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | قراءة فئات الـ Intent | Categories = [DEFAULT] |
| 2 | التحقق أن كل فئة موجودة في الفلتر | DEFAULT موجودة ضمن [DEFAULT, BROWSABLE] |
| 3 | القرار | اجتياز اختبار الفئة (الفلتر الأوسع لا يضر) |

**النتيجة:** الـ Intent يجتاز اختبار الـ Category وينتقل لاختبار الـ Data.

---

### 36. اختبار الـ Data — البنية

#### النص الأصلي يقول (English):
> To specify accepted intent data, an intent filter can declare zero or more <data> elements. Each <data> element can specify a URI structure and a data type (MIME media type). Each part of the URI is a separate attribute: scheme, host, port, and path: <scheme>://<host>:<port>/<path>. Example: content://com.example.project:200/folder/subfolder/etc. In this URI, the scheme is content, the host is com.example.project, the port is 200, and the path is folder/subfolder/etc. Each of these attributes is optional in a <data> element, but there are linear dependencies: If a scheme is not specified, the host is ignored. If a host is not specified, the port is ignored. If both the scheme and host are not specified, the path is ignored.

#### الترجمة الحرفية:
> لتحديد بيانات Intent المقبولة، يمكن لفلتر Intent إعلان صفر أو أكثر من عناصر `<data>`. يمكن لكل عنصر `<data>` تحديد بنية URI ونوع بيانات (نوع MIME). كل جزء من الـ URI هو خاصية منفصلة: النظام (scheme)، المضيف (host)، المنفذ (port)، والمسار (path): `<scheme>://<host>:<port>/<path>`. مثال: `content://com.example.project:200/folder/subfolder/etc`. في هذا الـ URI، النظام هو `content`، المضيف هو `com.example.project`، المنفذ هو `200`، والمسار هو `folder/subfolder/etc`. كل من هذه الخصائص اختيارية في عنصر `<data>`، لكن هناك تبعيات خطية: إذا لم يُحدَّد النظام (scheme)، يُتجاهل المضيف (host). إذا لم يُحدَّد المضيف، يُتجاهل المنفذ (port). إذا لم يُحدَّد كل من النظام والمضيف، يُتجاهل المسار (path).

#### الشرح المبسّط:
اختبار الـ Data هو الأعقد بين الثلاثة لأنه يتحقق من جزئين مختلفين معاً (نوع MIME وبنية URI)، وبنية URI نفسها مقسّمة لأربعة أجزاء هرمية مترابطة (scheme → host → port → path) بحيث كل جزء يعتمد وجوده على الجزء الذي قبله. أهمية هذه "التبعيات الخطية" أنها تمنع فلتراً غير منطقياً مثل تحديد port بدون host، لأن ذلك لا معنى له في بنية URI حقيقية أصلاً. يرتبط هذا مباشرة بموضوع Data من الفقرة 27 حيث تعلّمنا كيف نبني URI ونوع MIME من جهة الإرسال، وهذه الفقرة تشرح كيف يُفكَّك ويُقارَن من جهة الاستقبال. تشبيه يومي: مثل عنوان بريدي كامل (دولة → مدينة → حي → شارع) لا يمكن تحديد "الشارع" بدون معرفة "الحي" أولاً؛ مثال عملي: في URI `content://com.example.project:200/folder/subfolder/etc`، لو حُذف الـ scheme فسيُتجاهل المضيف بالكامل تلقائياً حتى لو كُتب.

**لماذا؟** لأن هذا الترتيب الهرمي يعكس طبيعة URI الحقيقية نفسها؛ لا معنى لمنفذ (port) بدون خادم (host) يستضيفه أصلاً.

#### 📊 المخطط: بنية URI الهرمية

#### ما هذا المخطط؟
> يوضح تبعية أجزاء الـ URI الأربعة ببعضها البعض من الأعم للأخص.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | scheme | attribute | مثل content أو http |
| 2 | host | attribute | مثل com.example.project |
| 3 | port | attribute | مثل 200 |
| 4 | path | attribute | مثل folder/subfolder/etc |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| scheme | host | يشترط وجوده | عادي | بدون scheme يُتجاهل host |
| host | port | يشترط وجوده | عادي | بدون host يُتجاهل port |
| scheme+host | path | يشترط وجودهما معاً | عادي | بدون الاثنين يُتجاهل path |

```diagram
type: class
title: URI Hierarchy Dependency
direction: TD
nodes:
  - id: scheme
    label: scheme
    kind: attribute
    level: 0
  - id: host
    label: host
    kind: attribute
    level: 1
  - id: port
    label: port
    kind: attribute
    level: 2
  - id: path
    label: path
    kind: attribute
    level: 3
edges:
  - from: scheme
    to: host
  - from: host
    to: port
  - from: scheme
    to: path
  - from: host
    to: path
```

#### 🔍 تتبع التنفيذ: تفكيك URI

**المدخل:** `content://com.example.project:200/folder/subfolder/etc`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استخراج scheme | content |
| 2 | استخراج host | com.example.project |
| 3 | استخراج port | 200 |
| 4 | استخراج path | folder/subfolder/etc |

**النتيجة:** URI مقسَّم بنجاح إلى أربعة أجزاء هرمية جاهزة للمقارنة مع فلتر الـ Data.

#### مهم للامتحان ⚠️:
> إذا حُذف الـ scheme، يُتجاهل host تلقائياً حتى لو كُتب صراحة في عنصر `<data>` — هذه نقطة اختبار شائعة.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Activity` | مكوّن يمثّل شاشة واحدة ونقطة تفاعل المستخدم مع التطبيق | نشاط صندوق الوارد في تطبيق بريد |
| `Intent` | كائن رسائل لطلب إجراء من مكوّن آخر | طلب فتح شاشة كتابة بريد |
| `Explicit Intent` | يحدد المكوّن الهدف بدقة عبر `ComponentName` | `Intent(this, SecondActivity::class.java)` |
| `Implicit Intent` | لا يحدد مكوّناً؛ يعلن إجراءً عاماً | `Intent(Intent.ACTION_VIEW)` |
| `Intent Filter` | إعلان في manifest يحدد أنواع الـ Intents التي يقبلها المكوّن | `<intent-filter>` مع action/data/category |
| `Intent Resolution` | عملية مطابقة الـ Intent الضمني بفلاتر الأنشطة المتاحة | مطابقة Action + Data + Category |

### المكوّنات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `onCreate()` | إعداد أولي لمرة واحدة | يستقبل `savedInstanceState` |
| `onStart()` | يصبح النشاط مرئياً | يليه `onResume()` دائماً |
| `onResume()` | يصبح النشاط تفاعلياً بالكامل | قد يتكرر استدعاؤها عدة مرات |
| `onPause()` | أول إشارة مغادرة | لا تُستخدم لعمليات ثقيلة |
| `onStop()` | اختفاء كامل | مناسبة لحفظ البيانات |
| `onRestart()` | العودة بعد التوقف | تُتبع دائماً بـ `onStart()` |
| `onDestroy()` | تحرير نهائي للموارد | قد تحدث بسبب دوران الشاشة |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| Explicit مقابل Implicit Intent | يحدد المكوّن بدقة | لا يحدد مكوّناً، يعلن إجراءً | الأول للتنقل الداخلي، الثاني للتفاعل بين التطبيقات |
| `onPause()` مقابل `onStop()` | مغادرة أولية، مرئي جزئياً محتمل | اختفاء كامل | الحفظ الثقيل في `onStop` وليس `onPause` |
| `setData()` مقابل `setDataAndType()` | يعيّن URI فقط | يعيّن URI ونوع MIME معاً | `setDataAndType` يمنع الاستبدال العرضي |
| `setFlags()` مقابل `addFlags()` | يستبدل كل الأعلام | يضيف لعلم موجود | استخدم `addFlags` عند وجود أعلام سابقة |

### قاموس المصطلحات
| الفئة | المصطلحات |
| --- | --- |
| دورة الحياة | `onCreate`, `onStart`, `onResume`, `onPause`, `onStop`, `onRestart`, `onDestroy` |
| بناء الـ Intent | `ComponentName`, `Action`, `Data`, `Category`, `Extras`, `Flags` |
| الـ Manifest | `<activity>`, `<intent-filter>`, `<action>`, `<category>`, `<data>`, `android:exported`, `android:permission` |
| Intent Resolution | Action Test, Category Test, Data Test |

### أبرز النقاط الذهبية
1. أي نشاط بدون `intent-filter` لا يمكن استدعاؤه إلا عبر Intent صريح.
2. `onPause()` للعمليات الخفيفة والسريعة فقط؛ `onStop()` للعمليات الثقيلة كحفظ قاعدة البيانات.
3. `CATEGORY_DEFAULT` تُضاف تلقائياً بواسطة `startActivity()` لذا يجب على الأنشطة إعلانها لاستقبال Intents عادية.
4. اختبار الـ Action يكفيه تطابق واحد؛ اختبار الـ Category يشترط كل فئات الـ Intent موجودة في الفلتر.
5. تبعيات URI الهرمية: بدون scheme يُتجاهل host، وبدون host يُتجاهل port.

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| حفظ بيانات المستخدم داخل `onPause()` | انقلها إلى `onStop()` حيث الوقت أطول والعملية أكثر أماناً |
| افتراض أن `onDestroy()` تعني إغلاقاً نهائياً دائماً | قد تكون مؤقتة بسبب تغيّر تهيئة كدوران الشاشة |
| استخدام `setData()` ثم `setType()` منفصلين | استخدم `setDataAndType()` لتجنّب مسح إحدى القيمتين |
| نسيان `CATEGORY_DEFAULT` في فلتر نشاط يريد استقبال Intents ضمنية | أضفها صراحة في `<intent-filter>` |
| الخلط بين اختبار Action (تطابق واحد يكفي) واختبار Category (يجب تطابق الكل) | تذكّر أن منطق كل اختبار مختلف تماماً |

---

### خطوات وإجراءات المحاضرة

```algorithm
1 | إعلان النشاط | AndroidManifest.xml | إضافة `<activity>` مع android:name إلزامياً
2 | إعلان Intent Filter | AndroidManifest.xml | إضافة action/category/data داخل `<intent-filter>`
3 | بناء Intent | Kotlin | تحديد component/action/data/category/extras/flags حسب الحاجة
4 | إرسال Intent | Kotlin | استدعاء startActivity(intent)
5 | تحليل النظام للـ Intent | نظام أندرويد | مطابقة عبر Action Test ثم Category Test ثم Data Test
6 | تشغيل المكوّن المطابق | نظام أندرويد | استدعاء onCreate() على النشاط الهدف
```

```algorithm
1 | إطلاق النشاط لأول مرة | نظام أندرويد | استدعاء onCreate() ثم onStart() ثم onResume()
2 | مقاطعة (اتصال/تطبيق آخر) | نظام أندرويد | استدعاء onPause()، وربما onStop() إن اختفى النشاط تماماً
3 | عودة المستخدم | نظام أندرويد | استدعاء onRestart() ثم onStart() ثم onResume()، أو onResume() مباشرة إن لم يختفِ النشاط بالكامل
4 | إغلاق نهائي أو دوران الشاشة | نظام أندرويد | استدعاء onDestroy()، وربما onCreate() من جديد إن كان السبب دوران الشاشة
```

### أنماط الأكواد
- بناء Intent عبر `apply {}` لتهيئة عدة خصائص معاً (action, data, type, extras) بأسلوب Kotlin نظيف.
- استخدام `Intent.createChooser()` عند الرغبة في إجبار ظهور قائمة اختيار بدل الانتقال التلقائي لتطبيق واحد.
- تجاوز (`override`) كل دالة من دوال دورة الحياة مع استدعاء `super` أولاً دائماً كأول سطر.

### أنماط التعامل
- عند الحاجة لتنقل داخلي بين شاشات نفس التطبيق: استخدم `Explicit Intent` دائماً لضمان الدقة والسرعة.
- عند الحاجة للتفاعل مع تطبيقات خارجية (مشاركة، اتصال، عرض خريطة): استخدم `Implicit Intent` مع Action وData وCategory مناسبة.
- عند حماية نشاط حساس: لا تضِف له `intent-filter`، واستخدم `android:permission` إن كان يجب مشاركته بشكل مقيّد.

### الأفكار الشاملة
دورة حياة الـ`Activity` والـ`Intent` هما وجهان لعملة واحدة تصف كيف يعيش النشاط وكيف يتواصل مع العالم من حوله — الأولى تدير "الوقت" (متى يظهر ويختفي)، والثانية تدير "المكان" (كيف ينتقل المستخدم من نشاط لآخر داخل أو خارج التطبيق). فهم هذين المفهومين معاً هو الأساس لكل تطبيق أندرويد حقيقي مهما كانت تعقيداته لاحقاً في Compose أو التنقل الحديث.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
Which callback is invoked only once during the entire life of an Activity instance under normal circumstances?
أ) `onStart()`
ب) `onCreate()`
ج) `onResume()`
د) `onRestart()`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `onStart()` قد تُستدعى عدة مرات كلما عاد النشاط من `Stopped`.
- ب) صحيح: `onCreate()` تُستدعى مرة واحدة فقط عند إنشاء النشاط لأول مرة (باستثناء إعادة الإنشاء الكاملة).
- ج) خطأ: `onResume()` تتكرر مع كل عودة من `Paused`.
- د) خطأ: `onRestart()` تُستدعى فقط عند العودة من `Stopped`، وليست إعداداً أولياً.

---

### السؤال 2 (صعب)
What happens if you call `setData()` then `setType()` on the same Intent?
أ) كلاهما يُحفظان معاً بدون مشاكل
ب) القيمة الثانية تمسح الأولى
ج) يحدث خطأ في وقت الترجمة (compile error)
د) `setType()` تُتجاهل تلقائياً

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: هذا بالضبط ما يجب تجنّبه؛ إحداهما تمسح الأخرى.
- ب) صحيح: استدعاء `setData()` ثم `setType()` (أو العكس) يمسح القيمة الأولى؛ لهذا يُستخدم `setDataAndType()`.
- ج) خطأ: لا يوجد خطأ ترجمة، المشكلة منطقية فقط وقت التشغيل.
- د) خطأ: لا تُتجاهل، بل تُطبَّق لكنها تمسح ما قبلها.

---

### السؤال 3 (متوسط)
An activity has NO `<intent-filter>` declared in the manifest. How can it still be started?
أ) لا يمكن تشغيله إطلاقاً
ب) فقط عبر Implicit Intent
ج) فقط عبر Explicit Intent
د) عبر أي نوع Intent بدون قيود

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خطأ: يمكن تشغيله لكن بطريقة محددة فقط.
- ب) خطأ: بدون فلتر، لا يوجد شيء ليطابقه Implicit Intent.
- ج) صحيح: النص صرّح أن الأنشطة بدون فلاتر تُشغَّل فقط عبر Intent صريح.
- د) خطأ: هذا يناقض مبدأ الحماية الأساسي للأنشطة الخاصة.

---

### السؤال 4 (متوسط)
Which is TRUE about `onPause()` versus `onStop()`?
أ) كلاهما مناسبان لحفظ البيانات في قاعدة بيانات
ب) `onPause()` مناسبة لعمليات ثقيلة، `onStop()` للعمليات الخفيفة
ج) `onPause()` للعمليات الخفيفة، `onStop()` للعمليات الثقيلة نسبياً
د) لا فرق عملي بينهما

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خطأ: `onPause()` قد لا يوفر وقتاً كافياً لعمليات الحفظ الثقيلة.
- ب) خطأ: هذا عكس القاعدة الصحيحة تماماً.
- ج) صحيح: النص صريح في تحديد هذا التقسيم بالضبط.
- د) خطأ: الفرق جوهري في نوع العمليات المسموحة.

---

### السؤال 5 (صعب)
What is the result of `Intent(this, SecondActivity::class.java)`?
أ) Intent ضمني بدون مكوّن محدد
ب) Intent صريح يستهدف SecondActivity مباشرة
ج) خطأ لأن Intent لا يقبل صنفاً كمعامل
د) Intent يطلب من النظام اختيار أي نشاط مناسب

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: تحديد `Class<T>` صراحة يجعله صريحاً بالتأكيد.
- ب) صحيح: هذا هو الشكل القياسي لبناء Explicit Intent باستخدام Context وClass.
- ج) خطأ: هذا Constructor صحيح ومدعوم رسمياً في Android API.
- د) خطأ: هذا سلوك Implicit Intent وليس هذا الكود.

---

### السؤال 6 (متوسط)
Which flag prevents an activity from being kept in the back stack?
أ) `FLAG_DEBUG_LOG_RESOLUTION`
ب) `FLAG_ACTIVITY_NO_HISTORY`
ج) `CATEGORY_DEFAULT`
د) `CATEGORY_LAUNCHER`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: هذا علم للتصحيح (debugging) وليس له علاقة بسجل التنقل.
- ب) صحيح: النص يذكره صراحة كعلم يمنع بقاء النشاط في المكدس الخلفي.
- ج) خطأ: هذه فئة (category) وليست علماً (flag).
- د) خطأ: هذه فئة أيضاً، مختصة بمشغّل التطبيقات وليس المكدس.

---

### السؤال 7 (متوسط)
What distinguishes the Action test from the Category test in Intent Resolution?
أ) كلاهما يشترطان تطابق كل العناصر
ب) الـ Action يكفيه تطابق واحد، الـ Category يشترط كل عناصر الـ Intent موجودة في الفلتر
ج) الـ Action يشترط تطابق الكل، الـ Category يكفيه تطابق واحد
د) لا يوجد اختبار Category أصلاً في Intent Resolution

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: منطق الاختبارين مختلف تماماً كما وضّح النص.
- ب) صحيح: هذا بالضبط ما وضحته الفقرتان 34 و35.
- ج) خطأ: هذا عكس القاعدة الصحيحة.
- د) خطأ: النص يذكر ثلاثة اختبارات صراحة، من ضمنها Category.

---

### السؤال 8 (متوسط)
In the URI `content://com.example.project:200/folder/subfolder`, what happens if the `scheme` attribute is omitted from the filter's `<data>` element?
أ) لا شيء يتغيّر، تبقى كل الأجزاء الأخرى فعالة
ب) يُتجاهل الـ host تلقائياً حتى لو كُتب
ج) يُصبح المسار (path) إلزامياً
د) يفشل التطبيق بالكامل عند التشغيل

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: التبعيات الخطية تعني أن غياب scheme يؤثر مباشرة على host.
- ب) صحيح: هذا مذكور صراحة في القاعدة: "If a scheme is not specified, the host is ignored."
- ج) خطأ: العكس هو الصحيح؛ يُتجاهل المسار إذا غاب كل من scheme وhost.
- د) خطأ: لا يوجد فشل تشغيل، فقط تجاهل منطقي لجزء من الفلتر.

---

### السؤال 9 (صعب)
Which method call correctly initializes both a URI and a MIME type together without one overwriting the other?
أ) `setData()` ثم `setType()`
ب) `setType()` ثم `setData()`
ج) `setDataAndType()`
د) `putExtra(Intent.EXTRA_TEXT, ...)`

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خطأ: `setType()` بعدها تمسح ما وضعه `setData()`.
- ب) خطأ: نفس المشكلة بالاتجاه المعاكس.
- ج) صحيح: هذه الدالة مصممة خصيصاً لتعيين كليهما معاً بأمان.
- د) خطأ: هذه دالة لإضافة بيانات إضافية (Extras) وليست لتعيين URI أو النوع.

---

### السؤال 10 (متوسط)
Which pair is required together for an activity to appear in the system's app launcher?
أ) `ACTION_SEND` + `CATEGORY_DEFAULT`
ب) `ACTION_MAIN` + `CATEGORY_LAUNCHER`
ج) `ACTION_VIEW` + `CATEGORY_BROWSABLE`
د) `ACTION_EDIT` + `CATEGORY_DEFAULT`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: هذا الزوج خاص بمشاركة البيانات وليس بظهور الأيقونة.
- ب) صحيح: النص يذكر صراحة أن هذين يجب أن يقترنا معاً لظهور النشاط في المشغّل.
- ج) خطأ: هذا الزوج خاص بفتح الروابط من المتصفح.
- د) خطأ: غير مرتبط بموضوع مشغّل التطبيقات إطلاقاً.

---

### السؤال 11 (متوسط)
Why should heavy database save operations be avoided inside `onPause()`?
أ) لأن `onPause()` لا تُستدعى إلا نادراً
ب) لأن الوقت المتاح في `onPause()` قد لا يكفي لإتمام العملية بأمان
ج) لأن `onPause()` تعمل فقط في وضع النوافذ المتعددة
د) لأن قواعد البيانات لا تعمل في `onPause()` تقنياً

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: على العكس، تُستدعى بشكل شائع جداً في كل مقاطعة.
- ب) صحيح: هذا هو السبب المذكور صراحة في النص الأصلي.
- ج) خطأ: `onPause()` تُستدعى في كل الحالات وليس فقط النوافذ المتعددة.
- د) خطأ: تقنياً تعمل، لكن المشكلة هي الوقت غير الكافي وليست استحالة تقنية.

---

### السؤال 12 (صعب)
What is the effect of calling `addCategory(Intent.CATEGORY_BROWSABLE)` on an Intent?
أ) يمسح كل الفئات السابقة ويضع هذه فقط
ب) يضيف هذه الفئة دون حذف الفئات الموجودة مسبقاً
ج) يحوّل الـ Intent إلى Explicit تلقائياً
د) يمنع الـ Intent من الوصول لأي فلتر

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: هذا سلوك `setFlags()` وليس `addCategory()`.
- ب) صحيح: `addCategory()` تُضيف فئة جديدة للقائمة الموجودة.
- ج) خطأ: نوع الـ Intent (صريح/ضمني) يعتمد على وجود Component name وليس الفئات.
- د) خطأ: بالعكس، تساعد الفئة في المطابقة الصحيحة مع الفلاتر.

---

### السؤال 13 (متوسط)
Which state can keep an activity partially visible while it is NOT in the foreground?
أ) `Created`
ب) `Started`
ج) `Paused`
د) `Destroyed`

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خطأ: هذه حالة الإنشاء الأولي، لا علاقة لها بالرؤية الجزئية.
- ب) خطأ: هذه حالة انتقالية سريعة قبل التفاعل الكامل.
- ج) صحيح: النص يذكر أن النشاط في `Paused` قد يبقى مرئياً جزئياً كما في وضع النوافذ المتعددة.
- د) خطأ: النشاط المدمَّر غير موجود على الشاشة إطلاقاً.

---

### السؤال 14 (متوسط)
A developer wants to let the user pick which app handles a "share text" request, even if only one app matches. What should they use?
أ) `startActivity(intent)` مباشرة
ب) `Intent.createChooser(intent, title)`
ج) `addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY)`
د) `setDataAndType()`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: هذا قد يفتح تطبيقاً واحداً تلقائياً دون عرض قائمة اختيار.
- ب) صحيح: `createChooser()` تجبر إظهار قائمة اختيار دائماً كما وضّح مثال البريد الإلكتروني.
- ج) خطأ: هذا علم لا علاقة له بقائمة الاختيار.
- د) خطأ: هذه دالة لتعيين البيانات ونوعها فقط.

---

### السؤال 15 (صعب)
Which lifecycle sequence correctly represents an activity being freshly launched?
أ) `onResume() → onStart() → onCreate()`
ب) `onCreate() → onStart() → onResume()`
ج) `onStart() → onCreate() → onResume()`
د) `onCreate() → onResume() → onStart()`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: هذا ترتيب معكوس تماماً وغير ممكن.
- ب) صحيح: هذا هو الترتيب الرسمي المذكور صراحة في النص الأصلي.
- ج) خطأ: `onCreate()` يجب أن تكون أولاً دائماً.
- د) خطأ: `onStart()` يجب أن تسبق `onResume()` دائماً.

---

### السؤال 16 (متوسط)
Why must every component with an `<intent-filter>` explicitly set `android:exported`?
أ) لتحسين سرعة تحميل التطبيق فقط
ب) لتفادي الوصول غير المقصود من تطبيقات خارجية لأسباب أمنية
ج) لأنها خاصية إلزامية لكل عنصر XML في أندرويد
د) لتحديد لغة الواجهة المستخدمة

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: لا علاقة مباشرة بسرعة التحميل.
- ب) صحيح: هذا هو السبب الأمني المذكور صراحة في فقرة استقبال Implicit Intent.
- ج) خطأ: هذه الخاصية مطلوبة فقط للمكوّنات التي تحتوي `<intent-filter>`.
- د) خطأ: لا علاقة لها باللغة إطلاقاً.
## الجزء الرابع: أسئلة تصحيح الكود

**Debug Q1 [syntax]:**
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
}

override fun onDestroy() {
    super.onDestroyt()
}
```
**Find the bug:** typo in the method name called inside `onDestroy()`.

**Fixed code:**
```kotlin
override fun onDestroy() {
    super.onDestroy()
}
```
**شرح الحل:**
1. الكود الأصلي يستدعي `super.onDestroyt()` وهذا اسم دالة خاطئ (خطأ إملائي) غير موجود في صنف `Activity`.
2. الاسم الصحيح هو `onDestroy()` بدون حرف "t" زائد في النهاية.
3. هذا الخطأ سيسبب فشلاً في الترجمة (compile error) لأن Kotlin لن يجد دالة بهذا الاسم في الصنف الأب.

---

**Debug Q2 [logic]:**
```kotlin
override fun onPause() {
    super.onPause()
    // Saving user data to the database here
    database.saveUserProgress(currentProgress)
}
```
**Find the bug:** heavy database save operation placed inside `onPause()` instead of `onStop()`.

**Fixed code:**
```kotlin
override fun onStop() {
    super.onStop()
    // Saving user data to the database here
    database.saveUserProgress(currentProgress)
}
```
**شرح الحل:**
1. `onPause()` قد لا يوفر وقتاً كافياً لإتمام عملية حفظ في قاعدة البيانات بأمان.
2. النص الأصلي يوصي صراحة بنقل عمليات الحفظ الثقيلة إلى `onStop()`.
3. نقل الكود لـ `onStop()` يضمن وقتاً أكبر نسبياً ويقلل خطر فقدان البيانات عند قتل العملية فجأة.

---

**Debug Q3 [return_check]:**
```kotlin
fun buildShareIntent(): Intent {
    val intent = Intent().apply {
        action = Intent.ACTION_SEND
        type = "text/plain"
    }
    // Missing: no return statement
}
```
**Find the bug:** the function's declared return type is `Intent`, but the body never returns the built object.

**Fixed code:**
```kotlin
fun buildShareIntent(): Intent {
    val intent = Intent().apply {
        action = Intent.ACTION_SEND
        type = "text/plain"
    }
    return intent
}
```
**شرح الحل:**
1. الدالة معرَّفة لإرجاع `Intent` لكنها لا تحتوي أي جملة `return` في جسمها.
2. هذا يسبب خطأ ترجمة لأن Kotlin يتطلب مطابقة نوع القيمة المُرجعة مع التوقيع المعلن.
3. إضافة `return intent` في النهاية يحل المشكلة ويعيد الكائن المُهيَّأ فعلياً.

---

**Debug Q4 [dead_code]:**
```kotlin
val intent = Intent(this, SecondActivity::class.java)
startActivity(intent)
finish()
Log.d("MainActivity", "Navigation completed") // This line never executes
```
**Find the bug:** the `Log.d()` call after `finish()` is dead code because `finish()` triggers activity teardown immediately, and code after it in the same function may still run but is misleading/unreliable since the activity is finishing.

**Fixed code:**
```kotlin
val intent = Intent(this, SecondActivity::class.java)
startActivity(intent)
Log.d("MainActivity", "Navigation completed") // Log before finishing
finish()
```
**شرح الحل:**
1. استدعاء `finish()` يبدأ عملية إنهاء النشاط الحالي، فأي كود مهم بعده يصبح غير موثوق تنفيذه ضمن سياق نشاط حي.
2. من الأفضل نقل أي سطر تسجيل (logging) مهم قبل استدعاء `finish()` مباشرة.
3. هذا يضمن تنفيذ السطر المهم دائماً قبل بدء عملية إنهاء النشاط.

---

**Debug Q5 [misconception]:**
```kotlin
// Developer believes this activity is now safe from external apps
<activity android:name=".SecretActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
    </intent-filter>
</activity>
```
**Find the bug:** the developer wants `SecretActivity` to be private, but declaring an `<intent-filter>` makes it discoverable via implicit intents.

**Fixed code:**
```kotlin
<!-- Remove the intent-filter entirely to keep it private -->
<activity android:name=".SecretActivity" android:exported="false" />
```
**شرح الحل:**
1. أي نشاط يحتوي `<intent-filter>` أصبح قابلاً للاستدعاء من تطبيقات خارجية عبر Intent ضمني مطابق.
2. لجعل النشاط خاصاً فعلياً، يجب حذف `<intent-filter>` بالكامل والاعتماد فقط على Explicit Intent من داخل التطبيق.
3. إضافة `android:exported="false"` صراحة يعزز هذا القرار الأمني بشكل واضح.

---

**Debug Q6 [logic]:**
```kotlin
val intent = Intent().apply {
    setData(Uri.parse("content://media/external/images/media/100"))
    setType("image/jpeg")
}
```
**Find the bug:** calling `setData()` then `setType()` separately causes the second call to erase the first (URI gets cleared).

**Fixed code:**
```kotlin
val intent = Intent().apply {
    setDataAndType(
        Uri.parse("content://media/external/images/media/100"),
        "image/jpeg"
    )
}
```
**شرح الحل:**
1. استدعاء `setData()` ثم `setType()` بشكل منفصل يسبب مسح إحداهما للأخرى داخلياً في تنفيذ `Intent`.
2. الحل الصحيح هو استخدام `setDataAndType()` التي تعيّن كلا القيمتين معاً بدون تعارض.
3. هذا يضمن أن الـ Intent النهائي يحمل كل من الـ URI ونوع MIME الصحيحين معاً.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Build a Dial Intent — `fill_gaps`

**Scenario / Task:**
Complete the missing code to create an Intent that opens the dialer with a phone number, without calling automatically.

**Requirements:**
1. Fill in the missing action constant.
2. Fill in the missing URI scheme.

```kotlin
val intent = Intent(Intent._______).apply {
    data = Uri.parse("_______:+15551234567")
}
```

**نموذج الحل:**
```kotlin
val intent = Intent(Intent.ACTION_DIAL).apply {
    data = Uri.parse("tel:+15551234567")
}
```
1. `ACTION_DIAL` هو الإجراء الصحيح لأنه يفتح الطلب الهاتفي دون اتصال تلقائي (بعكس إجراءات أخرى قد تتصل مباشرة).
2. مخطط `tel:` هو المخطط القياسي المستخدم لأرقام الهاتف في أندرويد.

---

### Exercise 2: Fix the Manifest Declaration — `code_fix`

**Scenario / Task:**
The following manifest snippet fails to make `ShareActivity` appear when sharing an image. Fix it.

**Requirements:**
1. Identify the missing category.
2. Identify the incorrect MIME type.

```xml
<activity android:name=".ShareActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.SEND"/>
        <data android:mimeType="text/plain"/>
    </intent-filter>
</activity>
```

**نموذج الحل:**
```xml
<activity android:name=".ShareActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.SEND"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:mimeType="image/*"/>
    </intent-filter>
</activity>
```
1. الفلتر الأصلي ينقصه `<category android:name="android.intent.category.DEFAULT"/>` وهي إلزامية عملياً لاستقبال Intents عادية من `startActivity()`.
2. نوع MIME كان `text/plain` وهو مخصص للنصوص وليس الصور؛ يجب تغييره إلى `image/*` لاستقبال مشاركة الصور.

---

### Exercise 3: Predict the Lifecycle Sequence — `scenario`

**Scenario / Task:**
A user opens `MainActivity`, then a dialog box appears on top of it (not a new activity), then the user dismisses the dialog.

**Requirements:**
1. List which lifecycle callbacks fire, in order.
2. Explain why `onStop()` is NOT called in this scenario.

**نموذج الحل:**
1. الترتيب: `onPause()` عند فتح الحوار → `onResume()` عند إغلاق الحوار.
2. `onStop()` لا تُستدعى لأن النشاط يبقى مرئياً جزئياً خلف الحوار ولم يختفِ بالكامل عن الشاشة، وهذا بالضبط الحالة الموصوفة في النص: "As long as the activity is partially visible but not in focus, it remains paused."

---

### Exercise 4: Choose Explicit or Implicit — `scenario`

**Scenario / Task:**
For each situation below, decide whether an Explicit or Implicit Intent should be used, and justify.
1. Navigating from a login screen to a home screen within the same app.
2. Opening the user's default camera app to take a photo.
3. Opening a specific settings screen within your own app.

**Requirements:**
1. Provide the intent type for each.
2. Provide one sentence justification per case.

**نموذج الحل:**
1. **Explicit** — التنقل داخل نفس التطبيق يجب أن يكون دقيقاً ومباشراً بدون حاجة لبحث النظام.
2. **Implicit** — التطبيق لا يعرف اسم تطبيق الكاميرا بالتحديد، ويريد ترك النظام يختار أي تطبيق كاميرا متاح.
3. **Explicit** — نفس منطق الحالة الأولى؛ الشاشة معروفة بالاسم داخل نفس التطبيق.

---

### Exercise 5: Trace a Custom Permission Scenario — `code_fix`

**Scenario / Task:**
`AppB` wants to call an activity in `AppA` that requires a custom permission. The manifests are shown; identify what's missing in `AppB`.

```xml
<!-- AppA's manifest -->
<activity android:name="TargetActivity"
    android:permission="com.example.appa.permission.ACCESS_TARGET" />
```
```xml
<!-- AppB's manifest (incomplete) -->
<manifest>
    <!-- Nothing declared here -->
</manifest>
```

**Requirements:**
1. Add the missing element to `AppB`'s manifest.

**نموذج الحل:**
```xml
<manifest>
    <uses-permission android:name="com.example.appa.permission.ACCESS_TARGET"/>
</manifest>
```
1. بدون `<uses-permission>` مطابقة، سيرفض النظام محاولة `AppB` استدعاء `TargetActivity` برمي `SecurityException` وقت التشغيل.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: Full Lifecycle During a Phone Call

**Input:**
```
User opens MainActivity → receives a phone call (covers entire screen) → ends the call and returns
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فتح MainActivity لأول مرة | ؟ |
| 2 | استقبال مكالمة تغطي الشاشة بالكامل | ؟ |
| 3 | إنهاء المكالمة والعودة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فتح MainActivity لأول مرة | onCreate → onStart → onResume |
| 2 | استقبال مكالمة تغطي الشاشة بالكامل | onPause → onStop |
| 3 | إنهاء المكالمة والعودة | onRestart → onStart → onResume |

**Result:** النشاط يعود لحالة `Resumed` مع استعادة كامل حالته المحفوظة في الذاكرة.

---

### Trace Exercise 2: Intent Resolution Step by Step

**Input:**
```
Intent: action=VIEW, categories=[DEFAULT], data URI scheme=https
Filter: actions=[VIEW, EDIT], categories=[DEFAULT, BROWSABLE], data scheme=https
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | اختبار Action | ؟ |
| 2 | اختبار Category | ؟ |
| 3 | اختبار Data | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | اختبار Action | نجاح — VIEW موجود ضمن [VIEW, EDIT] |
| 2 | اختبار Category | نجاح — DEFAULT موجودة ضمن [DEFAULT, BROWSABLE] |
| 3 | اختبار Data | نجاح — scheme=https يطابق scheme=https في الفلتر |

**Result:** الـ Intent يجتاز كل الاختبارات الثلاثة، فيبدأ النظام النشاط المطابق لهذا الفلتر.

---

### Trace Exercise 3: Configuration Change (Screen Rotation)

**Input:**
```
Activity is in Resumed state → user rotates the screen from portrait to landscape
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | بداية دوران الشاشة | ؟ |
| 2 | تدمير النشاط القديم | ؟ |
| 3 | إنشاء نسخة جديدة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | بداية دوران الشاشة | onPause → onStop |
| 2 | تدمير النشاط القديم | onDestroy |
| 3 | إنشاء نسخة جديدة | onCreate → onStart → onResume (على نسخة جديدة تماماً بالتهيئة الجديدة) |

**Result:** نسخة جديدة كلياً من النشاط تُنشأ بنفس الصنف لكن ببيانات مفقودة إلا ما حُفظ عبر `savedInstanceState`.

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: Architecture — Two-Activity Sharing Flow

**Task:**
Design (as a diagram or schema) the manifest and Kotlin structure needed for `AppX` (a text editor) to let users share edited text to any compatible app on the device, using an Implicit Intent.

**نموذج الإجابة:**
```diagram
type: flowchart
title: Share Text Flow (AppX)
direction: TD
nodes:
  - id: editor
    label: EditorActivity
    kind: component
    level: 0
  - id: intent
    label: Build Intent (ACTION_SEND, text/plain, EXTRA_TEXT)
    kind: process
    level: 1
  - id: system
    label: Android System (Intent Resolution)
    kind: process
    level: 2
  - id: chooser
    label: Chooser Dialog
    kind: event
    level: 3
edges:
  - from: editor
    to: intent
  - from: intent
    to: system
  - from: system
    to: chooser
```

**معايير التقييم:**
- استخدام `ACTION_SEND` مع `type = "text/plain"` بشكل صحيح.
- إرفاق النص الفعلي عبر `EXTRA_TEXT` وليس عبر URI.
- استخدام `Intent.createChooser()` لإظهار قائمة اختيار واضحة للمستخدم.

---

### Design Question 2: UML Design — Lifecycle-Aware Video Player

**Task:**
Sketch a state diagram (UML-style) showing how a streaming video player activity should behave across the six lifecycle callbacks, matching the example given in the lecture (pause network on leave, resume on return).

**نموذج الإجابة:**
```diagram
type: activity
title: Video Player Lifecycle Behavior
direction: TD
nodes:
  - id: create
    label: onCreate - init player UI
    kind: state
    level: 0
  - id: start
    label: onStart - prepare UI
    kind: state
    level: 1
  - id: resume
    label: onResume - connect network, play video
    kind: state
    level: 2
  - id: pause
    label: onPause - release lightweight sensors if any
    kind: state
    level: 3
  - id: stop
    label: onStop - pause video, close network connection, save position
    kind: state
    level: 4
  - id: destroy
    label: onDestroy - release remaining resources
    kind: state
    level: 5
edges:
  - from: create
    to: start
  - from: start
    to: resume
  - from: resume
    to: pause
  - from: pause
    to: resume
  - from: pause
    to: stop
  - from: stop
    to: destroy
```

**معايير التقييم:**
- وضع منطق إيقاف الفيديو وإغلاق الشبكة في `onStop()` وليس `onPause()` (لأنها عملية أثقل نسبياً وتحتاج وقتاً).
- إعادة الاتصال بالشبكة واستئناف التشغيل في `onResume()` وليس `onCreate()` (لأنها تتكرر مع كل عودة).
- تحرير أي موارد متبقية أخيراً في `onDestroy()`.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is an `Activity` in Android?
A: A subclass of the `Activity` class that serves as the entry point for user interaction and typically represents one screen of the app.

---

**Q2:** What is the only required attribute when declaring an `<activity>` element?
A: `android:name`, which specifies the class name of the activity.

---

**Q3:** What is the difference between an Explicit and an Implicit Intent?
A: Explicit specifies the exact target component via `ComponentName`; Implicit declares a general action and lets the system find a matching component.

---

**Q4:** Which lifecycle callback is invoked only once per activity instance creation?
A: `onCreate()`.

---

**Q5:** What parameter does `onCreate()` receive, and what does it contain?
A: `savedInstanceState`, a `Bundle` holding the activity's previously saved state (null if never existed before).

---

**Q6:** Why should heavy operations be avoided in `onPause()`?
A: Because `onPause()` execution does not necessarily offer enough time to complete them safely.

---

**Q7:** What triggers `onRestart()` specifically?
A: An activity in the Stopped state that is about to restart and become visible again.

---

**Q8:** What are the two reasons `onDestroy()` might be called?
A: The activity is finishing permanently, or the system is temporarily destroying it due to a configuration change like rotation.

---

**Q9:** What three properties are compared during Intent Resolution?
A: Action, Data (URI and MIME type), and Category.

---

**Q10:** What happens if an Intent filter declares zero `<action>` elements?
A: All intents fail the action test since there is nothing to match against.

---

**Q11:** What happens if an Intent has no categories at all?
A: It always passes the category test, regardless of what categories the filter declares.

---

**Q12:** Why must `setDataAndType()` be used instead of separate `setData()` and `setType()` calls?
A: Because calling one after the other causes the second call to erase the value set by the first.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> ملاحظة: المحاضرة لم تشرح برنامجاً واحداً متكاملاً موزَّعاً على عدة أقسام، بل أمثلة مستقلة منفصلة لكل مفهوم. لذلك هذا القسم يجمع أهم الأمثلة المستقلة كمرجع سريع واحد بدل دمجها بشكل مصطنع في برنامج واحد.

```kotlin
// ===== Full lifecycle callback reference =====
class ExampleActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // One-time setup logic here
    }

    override fun onStart() {
        super.onStart()
        // UI-maintaining code initialized here
    }

    override fun onResume() {
        super.onResume()
        // Re-initialize resources released in onPause()
    }

    override fun onPause() {
        super.onPause()
        // Release lightweight resources (e.g. sensors)
    }

    override fun onStop() {
        super.onStop()
        // Perform heavier shutdown work (e.g. save to database)
    }

    override fun onRestart() {
        super.onRestart()
        // Restore state from when the activity was stopped
    }

    override fun onDestroy() {
        super.onDestroy()
        // Release any remaining resources
    }
}
```

```kotlin
// ===== Intent-building reference =====

// Explicit intent
val explicitIntent = Intent(this, SecondActivity::class.java)
startActivity(explicitIntent)

// Implicit intent: send plain text
val sendIntent = Intent().apply {
    action = Intent.ACTION_SEND
    type = "text/plain"
    putExtra(Intent.EXTRA_TEXT, "Hello world")
}
startActivity(sendIntent)

// Implicit intent: dial a number
val dialIntent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:+15145551234"))
startActivity(dialIntent)

// Implicit intent: view an image with explicit MIME type
val viewImageIntent = Intent().apply {
    setDataAndType(
        Uri.parse("content://media/external/images/media/100"),
        "image/jpeg"
    )
}
startActivity(viewImageIntent)

// Implicit intent: send an email with subject and body
val emailIntent = Intent(Intent.ACTION_SENDTO).apply {
    data = Uri.parse("mailto:someone@example.com")
    putExtra(Intent.EXTRA_SUBJECT, "Hello")
    putExtra(Intent.EXTRA_TEXT, "This is the body of the email")
}
startActivity(Intent.createChooser(emailIntent, "Choose an email client"))

// Intent with a flag controlling back-stack behavior
val noHistoryIntent = Intent(Intent.ACTION_SEND).apply {
    flags = Intent.FLAG_ACTIVITY_NO_HISTORY
}
```

```xml
<!-- ===== Manifest reference ===== -->
<manifest ... >
  <application ... >

    <!-- Main entry point -->
    <activity android:name="MainActivity" android:exported="true">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>

    <!-- Activity handling shared content -->
    <activity android:name="ShareActivity" android:exported="true">
      <intent-filter>
        <action android:name="android.intent.action.SEND"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:mimeType="text/plain"/>
      </intent-filter>
      <intent-filter>
        <action android:name="android.intent.action.SEND"/>
        <action android:name="android.intent.action.SEND_MULTIPLE"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:mimeType="image/*"/>
        <data android:mimeType="video/*"/>
      </intent-filter>
    </activity>

    <!-- Private activity, callable only via explicit intent -->
    <activity android:name=".PrivateActivity" android:exported="false" />

  </application>
</manifest>
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: What is an Activity and why is it central to Android app development?
**نموذج الإجابة:**
`Activity` هي مكوّن يمثّل نقطة دخول لتفاعل المستخدم مع التطبيق وتوفّر نافذة رسم واجهة المستخدم؛ عادةً تمثّل شاشة واحدة، وتُبنى كصنف فرعي من `Activity`. تُعتبر مركزية لأن كل شاشة في التطبيق تقريباً هي `Activity` مستقلة، ويجب تسجيل كل نشاط في manifest وإدارة دورة حياته بشكل صحيح حتى يعمل التطبيق بشكل موثوق. مثال: شاشة "صندوق الوارد" في تطبيق بريد.

---

### Question 2: Explain the sequence and purpose of the six core lifecycle callbacks.
**نموذج الإجابة:**
التسلسل هو `onCreate()` (إعداد أولي لمرة واحدة) → `onStart()` (يصبح مرئياً) → `onResume()` (يصبح تفاعلياً بالكامل) → `onPause()` (بداية المغادرة، تحرير موارد خفيفة) → `onStop()` (اختفاء كامل، حفظ ثقيل) → إما `onRestart()` (عودة) تليها `onStart()` مجدداً، أو `onDestroy()` (تحرير نهائي وإنهاء). كل دالة موجودة لخدمة غرض محدد يتناسب مع درجة ظهور النشاط في تلك اللحظة.

---

### Question 3: Differentiate between Explicit and Implicit Intents with examples.
**نموذج الإجابة:**
Explicit Intent يحدد المكوّن الهدف بدقة عبر `ComponentName` (مثل `Intent(this, SecondActivity::class.java)`)، مناسب للتنقل داخل نفس التطبيق. Implicit Intent لا يحدد مكوّناً بل إجراءً عاماً (مثل `ACTION_SEND`)، ويترك للنظام مطابقته مع فلاتر الأنشطة المتاحة على الجهاز، مناسب للتفاعل مع تطبيقات خارجية مثل المشاركة أو الاتصال.

---

### Question 4: What are the three tests performed during Intent Resolution, and how does each work?
**نموذج الإجابة:**
1) اختبار Action: يكفي تطابق واحد بين إجراء الـ Intent وأحد الإجراءات في الفلتر؛ فلتر بلا إجراءات يرفض الكل. 2) اختبار Category: يجب أن تكون كل فئات الـ Intent موجودة في الفلتر (وليس العكس)؛ Intent بلا فئات يجتاز دائماً. 3) اختبار Data: يقارن نوع MIME وبنية URI (scheme, host, port, path) مع تبعيات هرمية بين هذه الأجزاء.

---

### Question 5: Why is `onPause()` unsuitable for saving user data, and what should be used instead?
**نموذج الإجابة:**
لأن تنفيذ `onPause()` قد لا يوفر وقتاً كافياً لإتمام عملية الحفظ بأمان قبل أن يُقاطَع أو يُقتل النشاط. البديل الصحيح هو `onStop()`، التي تُستدعى عند الاختفاء الكامل وتوفر وقتاً كافياً نسبياً لعمليات مثل حفظ البيانات في قاعدة بيانات.

---

### Question 6: Describe the components used to build an Intent and which ones affect component resolution.
**نموذج الإجابة:**
مكوّنات الـ Intent هي: Component name, Action, Data, Category, Extras, Flags. من هذه، تؤثر على تحديد المكوّن الهدف: Component name (إن وُجد يجعله صريحاً)، Action، Data، وCategory. أما Extras وFlags فتحمل معلومات إضافية أو تعليمات تشغيلية لا تؤثر على عملية اختيار المكوّن نفسه.

---

### Question 7: Why must an Intent Filter declare separate filters for each unique job, using the social-sharing app as an example?
**نموذج الإجابة:**
لأن كل مهمة (نص، صورة، فيديو) قد تحتاج معايير مطابقة مختلفة (أنواع MIME مختلفة)، فدمجها في فلتر واحد قد يخلط المطابقة أو يجعلها غير دقيقة. في مثال تطبيق المشاركة الاجتماعي، `ShareActivity` تمتلك فلتراً منفصلاً للنصوص وفلتراً آخر للوسائط، كل واحد يخدم سيناريو استخدام مختلف بوضوح.

---

### Question 8: Explain the relationship between `onDestroy()` and a configuration change such as screen rotation.
**نموذج الإجابة:**
عند حدوث تغيّر تهيئة كدوران الشاشة، يستدعي النظام `onDestroy()` على النشاط الحالي، لكن هذا لا يعني إغلاقاً نهائياً — بل يُنشئ النظام فوراً نسخة جديدة تماماً من النشاط ويستدعي `onCreate()` عليها بالتهيئة الجديدة. لهذا يجب حفظ أي بيانات مهمة عبر `savedInstanceState` لتجنّب فقدانها أثناء هذه العملية.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين `Activity` و`Intent` بجملة واحدة لكل منهما
- [ ] أحفظ ترتيب الدوال الستة لدورة الحياة عن ظهر قلب
- [ ] أفرّق بوضوح بين استخدامات `onPause()` و`onStop()`
- [ ] أفهم متى تُستدعى `onDestroy()` بسبب دوران الشاشة وليس إغلاقاً حقيقياً
- [ ] أستطيع كتابة Explicit Intent وImplicit Intent من الذاكرة
- [ ] أفرّق بين `setData()`, `setType()`, و`setDataAndType()`
- [ ] أعرف الفرق بين اختبار Action (تطابق واحد) واختبار Category (تطابق الكل)
- [ ] أفهم تبعيات بنية URI الهرمية (scheme → host → port → path)
- [ ] أعرف الزوج الإلزامي لظهور أيقونة التطبيق في المشغّل (`ACTION_MAIN` + `CATEGORY_LAUNCHER`)
- [ ] أفهم لماذا يجب تحديد `android:exported` صراحة لكل مكوّن له `intent-filter`
- [ ] أستطيع تفسير مثال مشغّل الفيديو التطبيقي (pause/resume الشبكة) بدورة الحياة

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| App Fundamentals | Activity & Intents | Activity هي أحد المكوّنات الأربعة الأساسية في App Fundamentals |
| Activity & Intents | Compose UI | كل Activity تحتضن واجهة Compose عبر `setContent {}` |
| Activity & Intents | Compose Navigation | `NavController` يعتمد نفس فكرة الانتقال بين الشاشات لكن داخل Activity واحدة |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| Lifecycle | onCreate مرة واحدة، onResume قد تتكرر، onStop مناسبة للحفظ الثقيل |
| Intent | Explicit للداخل، Implicit للخارج، Component name يحدد النوع |
| Resolution | Action تطابق واحد يكفي، Category يجب تطابق الكل، Data أعقدها هرمياً |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `ACTION_MAIN` + `CATEGORY_LAUNCHER` | نقطة الدخول الرئيسية | ظهور أيقونة التطبيق |
| `ACTION_SEND` | مشاركة بيانات | زر المشاركة |
| `ACTION_VIEW` | عرض بيانات للمستخدم | فتح رابط أو صورة |
| `ACTION_DIAL` | فتح الطلب الهاتفي | الاتصال اليدوي |
| `FLAG_ACTIVITY_NO_HISTORY` | منع البقاء في المكدس | شاشات تسجيل الدخول |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لا حفظ بيانات في `onPause()` — استخدم `onStop()` |
| 2 | نشاط بلا `intent-filter` = Explicit Intent فقط |
| 3 | `setDataAndType()` وليس `setData()` + `setType()` منفصلَين |
| 4 | اختبار Category يشترط أن كل فئات Intent ⊆ فئات الفلتر |
| 5 | `onDestroy()` قد تعني تدميراً مؤقتاً فقط بسبب دوران الشاشة |

---

<!-- VALIDATION: تم تغطية جميع فقرات المحاضرة (44 صفحة) بالكامل — Concept of Activities, Configuring the Manifest (declare activities, intent filters, permissions), Managing the Activity Lifecycle (المقدمة + الفوائد + الدوال الست الكاملة onCreate/onStart/onResume/onPause/onStop/onRestart/onDestroy + مخطط دورة الحياة)، Interact with Other Apps، Intent Types (Explicit/Implicit) مع مخطط تدفق الشريحة 24، Building an Intent (Component Name, Action, Data, Category, Extras, Flags) بكل الأمثلة البرمجية الأصلية، Receiving an Implicit Intent مع مثال التطبيق الاجتماعي الكامل، وIntent Resolution (Action Test, Category Test, Data Test مع بنية URI الهرمية). تم الالتزام ببنية "النص الأصلي يقول ← الترجمة الحرفية ← الشرح المبسّط" لكل قسم رقمي مستقل، مع 16 سؤال MCQ، 6 أسئلة تصحيح كود، 5 تمارين إضافية، 3 تمارين تتبع، سؤالي تصميم، 12 بطاقة Q&A، ومرجع كود كامل مجمّع، بالإضافة لجداول الملخص الشامل وورقة المراجعة السريعة. -->

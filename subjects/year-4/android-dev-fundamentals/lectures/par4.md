# المحاضرة 1 — Application Fundamentals (أساسيات التطبيقات)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** App Components، الـ Manifest، الموارد، ومثال GreetingCard App

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1. Kotlin Basics & OOP | `val/var`، `class`، `Null Safety` | فهم لغة كوتلن |
| 2. Compose UI الأساسي | `@Composable`، `Modifier`، `Column/Row` | بناء واجهات بسيطة |
| 3. **Application Fundamentals** ← أنت هنا | `Activity`، `Service`، `Broadcast Receiver`، `Content Provider`، `AndroidManifest.xml` | فهم بنية أي تطبيق أندرويد وكيف يتواصل مع النظام |
| 4. Activity & Intents بالتفصيل | `Intent`، `Intent Filter`، `Lifecycle` | تفعيل وربط المكوّنات |
| 5. Compose State & Navigation | `remember`، `NavController` | تطبيقات تفاعلية كاملة |

> **نوع هذه المحاضرة:** نظرية بحتة عن App Fundamentals — تشرح المكوّنات الأربعة الأساسية لأي تطبيق أندرويد، وكيف يعرّفها الملف `AndroidManifest.xml`، وكيف يتعامل التطبيق مع الموارد الخارجية، مع مثال عملي كامل (GreetingCard App) بأسلوب `Jetpack Compose` الحديث.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. لغات البناء وصيغ التوزيع (APK و AAB)

#### النص الأصلي يقول (English):
> Android apps can be written using Kotlin, Java, and C++ languages. The Android SDK tools compile your code along with any data and resource files into an APK or an Android App Bundle. An Android package, which is an archive file with an .apk suffix, contains the contents of an Android app required at runtime, and it is the file that Android-powered devices use to install the app. An Android App Bundle, which is an archive file with an .aab suffix, contains the contents of an Android app project, including some additional metadata that isn't required at runtime. An AAB is a publishing format and can't be installed on Android devices. It defers APK generation and signing to a later stage. When distributing your app through Google Play, Google Play's servers generate optimized APKs that contain only the resources and code that are required by the particular device requesting installation of the app.

#### الترجمة الحرفية:
> يمكن كتابة تطبيقات أندرويد باستخدام لغات Kotlin وJava وC++. تقوم أدوات Android SDK بترجمة (compile) الكود الخاص بك مع أي ملفات بيانات وموارد إلى APK أو Android App Bundle. حزمة أندرويد (Android package)، وهي ملف أرشيف بامتداد .apk، تحتوي على محتويات تطبيق أندرويد اللازمة وقت التشغيل، وهي الملف الذي تستخدمه أجهزة أندرويد لتثبيت التطبيق. حزمة تطبيق أندرويد (Android App Bundle)، وهي ملف أرشيف بامتداد .aab، تحتوي على محتويات مشروع تطبيق أندرويد، بما في ذلك بيانات وصفية إضافية غير مطلوبة وقت التشغيل. الـ AAB هو صيغة نشر ولا يمكن تثبيته على أجهزة أندرويد. إنه يؤجّل توليد الـ APK وتوقيعه إلى مرحلة لاحقة. عند توزيع تطبيقك عبر Google Play، تقوم خوادم Google Play بتوليد ملفات APK محسّنة تحتوي فقط على الموارد والكود المطلوبَين للجهاز المحدد الذي يطلب تثبيت التطبيق.

#### الشرح المبسّط:
هذه الفقرة تشرح شيئين مختلفين تماماً لكن الطلاب غالباً يخلطون بينهما: `APK` و `AAB`. الـ `APK` هو الملف النهائي الجاهز للتثبيت مباشرة على أي جهاز — يشبه ملف `.exe` على ويندوز. أما الـ `AAB` فهو ليس ملفاً قابلاً للتثبيت أبداً، بل هو "مستودع" يحتوي كل الموارد الممكنة (كل اللغات، كل كثافات الصور، كل المعماريات مثل ARM وx86)، وتقوم خوادم Google Play بتقطيعه وتوليد APK مخصص وصغير لكل جهاز على حدة. هذا موجود لأن حجم التطبيق مهم جداً للمستخدم؛ فبدل أن يحمّل المستخدم تطبيقاً يحتوي موارد للغة الصينية وشاشات بدقة عالية جداً وهو لا يحتاجها، يحصل فقط على ما يخص جهازه بالضبط. التشبيه اليومي: تخيل أن الـ AAB هو "مستودع ملابس كبير" فيه كل المقاسات والألوان، بينما الـ APK هو "الطلبية النهائية" التي تصل للزبون وتحتوي فقط مقاسه ولونه الذي طلبه — مثلاً عند رفع تطبيق على Google Play اليوم تُستخدم صيغة `.aab` دائماً وليس `.apk` مباشرة.

**لماذا؟** لأن توزيع نسخة واحدة ثقيلة تحتوي كل شيء لكل الأجهزة يهدر مساحة تخزين وباندويث الإنترنت لدى المستخدم، فحلّت Google هذه المشكلة بفصل "التخزين الشامل" (AAB) عن "التوصيل المخصص" (APK).

---

### 2. الحماية بنظام Sandbox

#### النص الأصلي يقول (English):
> Each Android app lives in its own security sandbox, protected by the following Android security features: The Android operating system is a multi-user Linux system in which each app is a different user. By default, the system assigns each app a unique Linux user ID, which is used only by the system and is unknown to the app. The system sets permissions for all the files in an app so that only the user ID assigned to that app can access them. Each process has its own virtual machine (VM), so an app's code runs in isolation from other apps. By default, every app runs in its own Linux process. The Android system starts the process when any of the app's components need to be executed, and then shuts down the process when it's no longer needed or when the system must recover memory for other apps. The Android system implements the principle of least privilege. That is, each app, by default, has access only to the components that it requires to do its work and no more.

#### الترجمة الحرفية:
> يعيش كل تطبيق أندرويد في صندوقه الأمني الخاص (sandbox)، محمياً بميزات الأمان التالية في أندرويد: نظام تشغيل أندرويد هو نظام لينكس متعدد المستخدمين حيث يُعامَل كل تطبيق كمستخدم مختلف. بشكل افتراضي، يُخصّص النظام لكل تطبيق معرّف مستخدم لينكس (Linux user ID) فريداً، يُستخدم فقط من قبل النظام وغير معروف للتطبيق نفسه. يضبط النظام صلاحيات جميع ملفات التطبيق بحيث يستطيع الوصول إليها فقط معرّف المستخدم المخصَّص لذلك التطبيق. لكل عملية (process) آلة افتراضية (VM) خاصة بها، لذا يعمل كود التطبيق بمعزل عن التطبيقات الأخرى. بشكل افتراضي، يعمل كل تطبيق في عملية لينكس خاصة به. يبدأ نظام أندرويد العملية عندما يحتاج أي من مكوّنات التطبيق إلى التنفيذ، ثم يوقفها عندما لا تعود هناك حاجة إليها أو عندما يحتاج النظام لاسترجاع الذاكرة لتطبيقات أخرى. يطبّق نظام أندرويد مبدأ أقل الصلاحيات (principle of least privilege)، أي أن كل تطبيق، بشكل افتراضي، لديه وصول فقط إلى المكوّنات التي يحتاجها لأداء عمله ولا شيء أكثر.

#### الشرح المبسّط:
فكرة الـ `sandbox` هي جوهر أمان أندرويد بأكمله: كل تطبيق معزول تماماً عن باقي التطبيقات، وكأنه يعيش في "غرفة مغلقة" خاصة به لا يستطيع أحد آخر دخولها بدون إذن. هذا مهم لأنه بدون هذا العزل، أي تطبيق ضار يمكن أن يقرأ بيانات تطبيق البنك أو تطبيق الرسائل الخاص بك مباشرة من الذاكرة أو الملفات. الآلية التقنية وراء ذلك هي أن أندرويد يعامل كل تطبيق كأنه "مستخدم" منفصل تماماً في نظام لينكس، بنفس الطريقة التي يكون فيها لكل موظف في شركة حساب مستخدم خاص به لا يستطيع الدخول لملفات زميله. التشبيه اليومي: تخيل مبنى سكني (الجهاز) فيه شقق منفصلة (التطبيقات)، كل شقة لها مفتاح خاص (Linux user ID) ولا يمكن لساكن شقة أن يفتح باب شقة أخرى إلا إذا أعطاه صاحبها إذناً صريحاً (permission)— مثلاً تطبيق الكاميرا لا يستطيع قراءة ملفات تطبيق الرسائل إلا إذا طلب صلاحية وسمح المستخدم بها.

**لماذا؟** لأن مبدأ "أقل الصلاحيات" يقلل الضرر المحتمل؛ فحتى لو تم اختراق تطبيق واحد، يبقى الضرر محصوراً داخل "غرفته" ولا ينتشر لباقي النظام أو التطبيقات الأخرى.

---

### 3. مقدمة App Components وفكرة نقاط الدخول

#### النص الأصلي يقول (English):
> App components are the essential building blocks of an Android app. Each component is an entry point through which the system or a user can enter your app. Some components depend on others. There are four types of app components: Activities, Services, Broadcast receivers, Content providers. Each type serves a distinct purpose and has a distinct lifecycle that defines how a component is created and destroyed.

#### الترجمة الحرفية:
> مكوّنات التطبيق هي اللبنات الأساسية لأي تطبيق أندرويد. كل مكوّن هو نقطة دخول يستطيع النظام أو المستخدم من خلالها الدخول إلى تطبيقك. بعض المكوّنات تعتمد على مكوّنات أخرى. هناك أربعة أنواع من مكوّنات التطبيق: الأنشطة (Activities)، الخدمات (Services)، مستقبلات البث (Broadcast receivers)، ومزوّدات المحتوى (Content providers). كل نوع يخدم غرضاً مميزاً وله دورة حياة مميزة تحدد كيفية إنشاء المكوّن وتدميره.

#### الشرح المبسّط:
هذه الفقرة تقدّم الفكرة المحورية لكل المحاضرة: أي تطبيق أندرويد ليس "برنامجاً واحداً متصلاً" بل مجموعة من أربعة أنواع "قطع بناء" (components) منفصلة، وكل قطعة هي "باب دخول" مستقل يمكن للنظام أو حتى تطبيق آخر أن يدخل منه إلى تطبيقك. هذا مختلف جذرياً عن البرمجة التقليدية التي تعلمناها سابقاً حيث البرنامج يبدأ من نقطة واحدة (مثل `main()`). كل نوع من الأربعة له دور مختلف تماماً: `Activity` للشاشات، `Service` للعمل بالخلفية، `Broadcast Receiver` للاستجابة للأحداث، و`Content Provider` لمشاركة البيانات. التشبيه اليومي: تخيل مبنى حكومي كبير له عدة أبواب دخول منفصلة — باب لخدمة الجمهور (Activity)، باب للموظفين يعملون بالخلف (Service)، جرس إنذار يستجيب تلقائياً لحدث طارئ (Broadcast Receiver)، ومكتب استعلامات يعطي معلومات لأي شخص يطلبها (Content Provider) — كل باب مستقل لكنها كلها أجزاء من نفس المبنى.

**لماذا؟** هذا التصميم موجود لأنه يسمح لأنظمة التشغيل والتطبيقات الأخرى بالتفاعل مع أجزاء محددة من تطبيقك دون الحاجة لتشغيل التطبيق بأكمله، مما يوفر مرونة كبيرة وكفاءة في استخدام الموارد.

---

### 4. تشغيل تطبيق لمكوّن تطبيق آخر

#### النص الأصلي يقول (English):
> A unique aspect of the Android system design is that any app can start another app's component. Example: if you want the user to capture a photo with the device camera, there's probably another app that does that—and your app can use it instead of developing an activity to capture a photo yourself. You don't need to incorporate or even link to the code from the camera app. Instead, you can start the activity in the camera app that captures a photo. When complete, the photo is even returned to your app so you can use it. To the user, it seems as if the camera is actually a part of your app. When the system starts a component, it starts the process for that app, if it's not already running, and instantiates the classes needed for the component. Example: if your app starts the activity in the camera app that captures a photo, that activity runs in the process that belongs to the camera app, not in your app's process.

#### الترجمة الحرفية:
> جانب فريد من تصميم نظام أندرويد هو أن أي تطبيق يمكنه تشغيل مكوّن تابع لتطبيق آخر. مثال: إذا أردت أن يلتقط المستخدم صورة باستخدام كاميرا الجهاز، فمن المرجح وجود تطبيق آخر يقوم بذلك — ويمكن لتطبيقك استخدامه بدلاً من تطوير نشاط (activity) خاص بك لالتقاط صورة. لست بحاجة لدمج أو حتى الربط بكود تطبيق الكاميرا. بدلاً من ذلك، يمكنك تشغيل النشاط في تطبيق الكاميرا الذي يلتقط صورة. عند الانتهاء، تُعاد الصورة حتى إلى تطبيقك لتستخدمها. بالنسبة للمستخدم، يبدو الأمر وكأن الكاميرا هي فعلياً جزء من تطبيقك. عندما يبدأ النظام مكوّناً، فإنه يبدأ العملية (process) الخاصة بذلك التطبيق، إذا لم تكن تعمل بالفعل، وينشئ نسخاً (instantiates) من الأصناف (classes) المطلوبة لذلك المكوّن. مثال: إذا شغّل تطبيقك النشاط في تطبيق الكاميرا الذي يلتقط صورة، فإن ذلك النشاط يعمل في العملية التابعة لتطبيق الكاميرا، وليس في عملية تطبيقك.

#### الشرح المبسّط:
هذه من أقوى ميزات أندرويد وأكثرها إفادة للمطور: لا داعي لإعادة اختراع العجلة. بدل أن تكتب كوداً كاملاً لالتقاط صورة (التعامل مع الكاميرا، الأذونات، المعالجة)، يمكنك ببساطة "استدعاء" تطبيق الكاميرا الموجود مسبقاً على الجهاز ليقوم بالعمل نيابة عنك، ثم يُعيد لك النتيجة (الصورة) لتستخدمها. من المهم فهم أن هذا لا يعني نسخ كود تطبيق الكاميرا داخل تطبيقك؛ بل تطبيق الكاميرا يعمل فعلياً كـ"عملية منفصلة" خاصة به على الجهاز، وفقط يُرسل لك النتيجة عند الانتهاء. هذا يرتبط مباشرة بالفقرة السابقة عن Sandbox: رغم أن كل تطبيق معزول، يستطيع النظام أن ينسّق بينها بأمان عبر آلية الـ Intent التي سنشرحها لاحقاً. التشبيه اليومي: بدل أن تبني مطبخاً كاملاً في بيتك لتطبخ وجبة واحدة، تطلبها من مطعم مجاور (يعمل في "مطبخه" الخاص المنفصل تماماً عن بيتك)، ويصلك الطبق الجاهز — مثل استخدام تطبيقك لكاميرا الجهاز الافتراضية بدل بناء كاميرا خاصة بك من الصفر.

**لماذا؟** هذا يوفر وقت المطور، يقلل تكرار الكود عبر آلاف التطبيقات، ويمنح المستخدم تجربة متسقة (يستخدم نفس تطبيق الكاميرا الذي اعتاد عليه في كل التطبيقات).

---

### 5. غياب نقطة الدخول الواحدة (لا يوجد main())

#### النص الأصلي يقول (English):
> Unlike apps on most other systems, Android apps don't have a single entry point: there's no main() function. Because the system runs each app in a separate process with file permissions that restrict access to other apps, your app can't directly activate a component from another app. However, the Android system can. To activate a component in another app, you deliver a message to the system that specifies your intent to start a particular component. The system then activates the component for you.

#### الترجمة الحرفية:
> على عكس التطبيقات في معظم الأنظمة الأخرى، لا تملك تطبيقات أندرويد نقطة دخول واحدة: لا توجد دالة `main()`. نظراً لأن النظام يشغّل كل تطبيق في عملية منفصلة بصلاحيات ملفات تقيّد الوصول إلى التطبيقات الأخرى، لا يستطيع تطبيقك تفعيل مكوّن من تطبيق آخر بشكل مباشر. لكن نظام أندرويد يستطيع ذلك. لتفعيل مكوّن في تطبيق آخر، ترسل رسالة إلى النظام تحدّد نيّتك (intent) لبدء مكوّن معيّن. عندها يقوم النظام بتفعيل ذلك المكوّن نيابةً عنك.

#### الشرح المبسّط:
هذه النقطة تكمل الصورة من الفقرتين السابقتين: بما أن التطبيق مبني من عدة مكوّنات مستقلة وليس برنامجاً واحداً متسلسلاً، فلا معنى لوجود دالة `main()` واحدة تبدأ التنفيذ كما في لغات مثل C++ أو Java العادية. بدلاً من ذلك، أي مكوّن (Activity مثلاً) يمكن أن يكون هو "نقطة الدخول" حسب الحاجة. لكن السؤال المنطقي هنا: بما أن التطبيقات معزولة عن بعضها (sandbox)، كيف يستطيع تطبيقك أن "يطلب" من تطبيق آخر تشغيل أحد مكوّناته؟ الجواب: لا يحدث هذا بشكل مباشر أبداً؛ تطبيقك لا يتحدث مباشرة مع تطبيق الكاميرا، بل يرسل "طلباً" (رسالة Intent) إلى نظام أندرويد نفسه، والنظام هو من يتحقق من الصلاحيات وينفّذ الطلب بالنيابة عنك. التشبيه اليومي: أنت لا تستطيع الدخول مباشرة إلى مكتب موظف في شركة أخرى وطلب خدمة منه مباشرة (بسبب الحواجز الأمنية)، لكن يمكنك تعبئة طلب رسمي (Intent) وتسليمه للاستقبال (نظام أندرويد)، والاستقبال هو من يوصل طلبك للموظف المختص وينفذه.

**لماذا؟** هذا التصميم يحافظ على أمان الـ sandbox بشكل كامل؛ فالنظام هو "الوسيط الموثوق" الوحيد الذي يستطيع عبور الحواجز بين التطبيقات، مما يمنع أي تطبيق من التلاعب المباشر بتطبيق آخر.

---

### 6. مكوّن Activity — التعريف والغرض

#### النص الأصلي يقول (English):
> An activity is the entry point for interacting with the user. It represents a single screen with a user interface. Example: An email app might have one activity that shows a list of new emails, another activity to compose an email, and another activity for reading emails. Although the activities work together to form a cohesive user experience in the email app, each one is independent of the others. A different app can start any one of these activities if the email app allows it. For example, a camera app might start the activity in the email app for composing a new email to let the user share a picture. An activity facilitates the following key interactions between system and app: Keeping track of what the user currently cares about—what is on-screen—so that the system keeps running the process that is hosting the activity.

#### الترجمة الحرفية:
> النشاط (activity) هو نقطة الدخول للتفاعل مع المستخدم. يمثّل شاشة واحدة بواجهة مستخدم. مثال: قد يحتوي تطبيق بريد إلكتروني على نشاط واحد يعرض قائمة الرسائل الجديدة، ونشاط آخر لإنشاء رسالة، ونشاط آخر لقراءة الرسائل. رغم أن الأنشطة تعمل معاً لتشكّل تجربة مستخدم متماسكة في تطبيق البريد، إلا أن كل نشاط مستقل عن الآخر. يمكن لتطبيق مختلف تشغيل أي من هذه الأنشطة إذا سمح تطبيق البريد بذلك. مثلاً، قد يشغّل تطبيق كاميرا النشاط الخاص بإنشاء رسالة جديدة في تطبيق البريد للسماح للمستخدم بمشاركة صورة. يسهّل النشاط التفاعلات الرئيسية التالية بين النظام والتطبيق: تتبّع ما يهتم به المستخدم حالياً — أي ما هو ظاهر على الشاشة — كي يستمر النظام بتشغيل العملية المستضيفة لذلك النشاط.

#### الشرح المبسّط:
الـ `Activity` هو أكثر مكوّن سيتعامل معه المطور المبتدئ، لأنه ببساطة "الشاشة" التي يراها المستخدم ويتفاعل معها. النقطة الأهم هنا أن التطبيق الواحد عادة يحتوي عدة `Activities` (شاشات) مستقلة، كل واحدة تقوم بمهمة محددة، لكنها تعمل معاً لتعطي تجربة متكاملة. وبما أن كل `Activity` مستقلة، يمكن لتطبيق آخر أن "يستعير" شاشة من تطبيقك (إن سمحت بذلك)، تماماً كما شرحنا في الفقرة الرابعة عن استدعاء مكوّنات من تطبيقات أخرى. هذا يربط مباشرة بمفهوم "نقاط الدخول المتعددة" الذي شرحناه سابقاً: كل Activity هي باب دخول منفصل. التشبيه اليومي: فكّر بتطبيق البريد كمكتبة كبيرة فيها عدة غرف منفصلة — غرفة لعرض قائمة الكتب (قائمة الرسائل)، غرفة للكتابة (إنشاء رسالة)، وغرفة للقراءة (فتح رسالة) — يمكنك الدخول إلى أي غرفة مباشرة دون المرور بالغرف الأخرى، ويمكن لزائر من مبنى آخر (تطبيق الكاميرا) أن يُسمح له بدخول "غرفة الكتابة" مباشرة لمشاركة صورة دون المرور بباقي غرف المكتبة.

**لماذا؟** فصل الشاشات إلى أنشطة مستقلة يسمح بإعادة استخدامها من تطبيقات أخرى، ويجعل النظام قادراً على إدارة كل شاشة بذكاء (مثلاً إبقاء الشاشة النشطة حالياً في الذاكرة وإيقاف الشاشات غير المرئية لتوفير الموارد).

---

### 7. Activity — إدارة العمليات المتوقفة وتنسيق تدفقات المستخدم

#### النص الأصلي يقول (English):
> Knowing which previously used processes contain stopped activities the user might return to and prioritizing those processes more highly to keep them available. Helping the app handle having its process killed so the user can return to activities with their previous state restored. Providing a way for apps to implement user flows between each other, and for the system to coordinate these flows. The primary example of this is sharing. An activity is implemented as a subclass of Activity class.

#### الترجمة الحرفية:
> معرفة أي العمليات المستخدَمة سابقاً تحتوي على أنشطة متوقفة قد يعود إليها المستخدم، وإعطاء أولوية أعلى لتلك العمليات لإبقائها متاحة. مساعدة التطبيق على التعامل مع إنهاء عمليته (killed) بحيث يستطيع المستخدم العودة إلى الأنشطة مع استعادة حالتها السابقة. توفير طريقة للتطبيقات لتنفيذ تدفقات مستخدم (user flows) فيما بينها، وللنظام لتنسيق هذه التدفقات. المثال الرئيسي على ذلك هو المشاركة (sharing). يُنفَّذ النشاط كصنف فرعي (subclass) من صنف `Activity`.

#### الشرح المبسّط:
هذه الفقرة تكمل شرح الأدوار الثلاثة الرئيسية للـ Activity في التنسيق بين النظام والتطبيق. أول دور هو أن النظام "يتذكر" الشاشات التي زارها المستخدم سابقاً حتى لو أُغلقت عملياتها لتوفير الذاكرة، فيعطيها أولوية أكبر للعودة إليها بسرعة إذا رجع المستخدم لها (مثل زر الرجوع Back أو قائمة التطبيقات الأخيرة). ثانياً، إذا اضطر النظام لقتل عملية التطبيق تماماً بسبب نقص الذاكرة، يوفر Activity آلية لحفظ الحالة (state) واستعادتها عند العودة، بحيث لا يشعر المستخدم أن شيئاً تغيّر. ثالثاً، الـ Activity هو ما يسمح بتدفقات مثل "المشاركة" (Sharing) — أي فتح شاشة من تطبيق آخر للقيام بمهمة ثم العودة لتطبيقك الأصلي. وأخيراً تقنياً: كل Activity في الكود هو صنف Kotlin يرث (`extends`/subclass) من الصنف الأساسي `Activity`. التشبيه اليومي: تخيل أنك تقرأ كتاباً وتضع إشارة مرجعية (bookmark) في الصفحة التي وصلت إليها قبل أن تغلق الكتاب — عندما تعود لاحقاً تفتحه من نفس الصفحة تماماً، بدل أن تبدأ من الصفحة الأولى؛ هذا بالضبط ما يفعله النظام مع حالة الـ Activity المحفوظة.

**لماذا؟** لأن أجهزة الموبايل محدودة الذاكرة مقارنة بالحواسيب، فالنظام يحتاج دائماً لإغلاق وفتح العمليات بذكاء، وبدون آلية استعادة الحالة هذه، كانت تجربة المستخدم ستكون مزعجة جداً (فقدان كل التقدم عند كل تبديل بين التطبيقات).

---

### 8. العمارة الحديثة: Single-Activity Architecture

#### النص الأصلي يقول (English):
> In modern Android development, Google promotes a single-activity architecture pattern for most applications. Instead of multiple Activities, apps typically use: A single Activity as a host, Multiple UI destinations managed via Jetpack Compose navigation

#### الترجمة الحرفية:
> في تطوير أندرويد الحديث، تروّج Google لنمط معماري يعتمد على نشاط واحد (single-activity architecture) لمعظم التطبيقات. بدلاً من أنشطة متعددة، تستخدم التطبيقات عادة: نشاطاً واحداً كمضيف (host)، ووجهات واجهة مستخدم متعددة تُدار عبر التنقل (navigation) في Jetpack Compose.

#### الشرح المبسّط:
هذه الملاحظة الحديثة تُعتبر (شرح زيادة للفهم) مهم جداً لفهم الفرق بين الطريقة التقليدية والطريقة الحديثة. سابقاً (كما شرحنا في الفقرة 6)، كان كل "شاشة" في التطبيق = `Activity` منفصلة كاملة (كل واحدة لها دورة حياة خاصة، ملف Manifest خاص بها). لكن مع ظهور `Jetpack Compose`، أصبحت الممارسة الحديثة الموصى بها هي استخدام `Activity` واحدة فقط تعمل كـ"حاوية" أو "مضيف"، وبداخلها يتم التنقل بين "شاشات" (تسمى الآن Composable destinations) باستخدام نظام تنقل برمجي (`Navigation`) بدلاً من إنشاء Activity جديدة لكل شاشة. هذا لا يلغي مفهوم Activity كمكوّن أساسي (الذي شرحناه في الفقرات السابقة يبقى صحيحاً نظرياً)، لكنه يغيّر كيف يُستخدم عملياً في المشاريع الحديثة. التشبيه اليومي: بدل أن يكون لكل غرفة في المتحف بابها الخارجي المستقل (Activity لكل شاشة)، أصبح للمتحف بابٌ خارجي واحد فقط (Activity واحدة)، وبداخله ممرات وأقسام متعددة يتنقل الزائر بينها دون الخروج من المبنى أصلاً (Navigation بين Composable screens).

**لماذا؟** لأن إدارة أنشطة متعددة كانت تسبب تعقيداً في مشاركة البيانات والحالة (state) بين الشاشات، والتنقل البرمجي داخل Activity واحدة أسرع وأخف على الذاكرة ويجعل إدارة الحالة (state management) أسهل بكثير.

#### ⚖️ المقايضة: Multiple Activities مقابل Single-Activity Architecture

| | Multiple Activities (التقليدي) | Single-Activity + Navigation (الحديث) |
| --- | --- | --- |
| المزايا | كل شاشة معزولة تماماً، سهل تشغيلها من تطبيقات أخرى مباشرة | مشاركة الحالة أسهل، أداء أسرع، تنقل أنعم (transitions) |
| العيوب | تعقيد في مشاركة البيانات بين الشاشات، استهلاك ذاكرة أعلى | كل الشاشات "محبوسة" داخل Activity واحدة (تحتاج Intent فقط عند الخروج للتطبيق) |
| متى تختاره | تطبيقات قديمة أو تحتاج شاشات مستقلة فعلياً يستدعيها الآخرون | معظم تطبيقات Compose الحديثة |

---

### 9. مكوّن Service — التعريف والغرض

#### النص الأصلي يقول (English):
> A Service is a general-purpose entry point for keeping an app running in the background for all kinds of reasons. It is a component that runs in the background to perform long-running operations or to perform work for remote processes. A service does not provide a user interface. For example, a service might play music in the background while the user is in a different app. A service might fetch data over the network without blocking user interaction with an activity. Another component, such as an activity, can start the service and let it run or bind to it in order to interact with it. There are two types of services that tell the system how to manage an app: started services and bound services.

#### الترجمة الحرفية:
> الخدمة (Service) هي نقطة دخول عامة الغرض لإبقاء التطبيق يعمل في الخلفية لأسباب متنوعة. إنها مكوّن يعمل في الخلفية لأداء عمليات طويلة الأمد أو لتنفيذ عمل لصالح عمليات بعيدة (remote processes). لا توفّر الخدمة واجهة مستخدم. على سبيل المثال، قد تشغّل خدمة موسيقى في الخلفية بينما يكون المستخدم في تطبيق آخر. قد تجلب خدمة بيانات عبر الشبكة دون حجب تفاعل المستخدم مع نشاط (activity). يمكن لمكوّن آخر، مثل Activity، أن يبدأ الخدمة ويتركها تعمل، أو أن يرتبط (bind) بها للتفاعل معها. هناك نوعان من الخدمات يخبران النظام كيف يدير التطبيق: الخدمات المُبدأة (started services) والخدمات المرتبطة (bound services).

#### الشرح المبسّط:
الـ `Service` هو المكوّن المسؤول عن "العمل الخفي" الذي لا يحتاج شاشة على الإطلاق — وهذا الفرق الجوهري بينه وبين `Activity` الذي شرحناه للتو (Activity = شاشة مرئية، Service = عمل بلا شاشة). أمثلة كلاسيكية: تشغيل موسيقى بالخلفية بينما تتصفح تطبيقاً آخر، أو تحميل ملف من الإنترنت دون تجميد الواجهة. يوجد نوعان أساسيان يجب التفريق بينهما جيداً: "خدمة مُبدأة" (started) تعمل باستقلالية حتى تنتهي مهمتها بنفسها، و"خدمة مرتبطة" (bound) تبقى حية فقط طالما هناك مكوّن آخر مرتبط بها ويحتاجها (سنشرح الفرق بالتفصيل في الفقرتين القادمتين). التشبيه اليومي: تخيل عاملاً في مطبخ مطعم (Service) يعمل خلف الكواليس تماماً ولا يظهر أمام الزبائن (لا واجهة مستخدم)، بينما النادل هو الذي يظهر أمام الزبون (Activity) — العامل قد يكمل طبخ الطلبية باستقلالية حتى لو غادر النادل (started)، أو قد يحتاج لبقاء أحد يراقبه ويتفاعل معه طوال الوقت (bound).

**لماذا؟** لأن كثيراً من مهام التطبيقات (تنزيل ملفات، تشغيل موسيقى، مزامنة بيانات) يجب أن تستمر حتى عندما يغادر المستخدم الشاشة الحالية، وبدون مكوّن منفصل مخصص لهذا الغرض، كان سيتوقف كل عمل بمجرد إغلاق الشاشة.

---

### 10. Started Services بالتفصيل

#### النص الأصلي يقول (English):
> Started services tell the system to keep them running until their work is completed. This might be to sync some data in the background or play music even after the user leaves the app. Syncing data in the background or playing music represent different types of started services(Foreground Service, Background service), which the system handles differently: Music playback is something the user is directly aware of, and the app communicates this to the system by indicating that it wants to be in the foreground, with a notification to tell the user that it is running. In this case, the system prioritizes keeping that service's process running, because the user has a bad experience if it goes away. A regular background service is not something the user is directly aware of, so the system has more freedom in managing its process. It might let it be killed, restarting the service sometime later, if it needs RAM for things that are of more immediate concern to the user.

#### الترجمة الحرفية:
> تخبر الخدمات المُبدأة (started services) النظام بأن يبقيها تعمل حتى تكتمل مهمتها. قد يكون هذا لمزامنة بعض البيانات في الخلفية أو تشغيل موسيقى حتى بعد مغادرة المستخدم للتطبيق. مزامنة البيانات في الخلفية أو تشغيل الموسيقى يمثّلان نوعين مختلفين من الخدمات المُبدأة (خدمة أمامية Foreground Service، وخدمة خلفية Background service)، يتعامل النظام معهما بشكل مختلف: تشغيل الموسيقى شيء يدركه المستخدم مباشرة، ويُبلّغ التطبيق النظام بذلك عبر الإشارة إلى أنه يريد أن يكون في المقدمة (foreground)، مع إشعار يُعلم المستخدم أنه يعمل. في هذه الحالة، يعطي النظام أولوية للحفاظ على عملية تلك الخدمة عاملة، لأن المستخدم سيعاني من تجربة سيئة إذا توقفت. الخدمة الخلفية العادية ليست شيئاً يدركه المستخدم مباشرة، لذا يملك النظام حرية أكبر في إدارة عمليتها. قد يسمح لها بالتوقف (killed)، وإعادة تشغيل الخدمة لاحقاً، إذا احتاج ذاكرة الوصول العشوائي (RAM) لأمور أكثر إلحاحاً بالنسبة للمستخدم.

#### الشرح المبسّط:
هذه الفقرة تفصّل النوع الأول من الخدمات (started) الذي ذُكر إجمالاً في الفقرة السابقة، وتقسمه إلى فئتين حسب مدى أهمية العمل من وجهة نظر المستخدم. الفئة الأولى `Foreground Service` (خدمة أمامية) هي عمل يريد المستخدم أن يستمر ويعرف أنه مستمر — مثل تشغيل الموسيقى — لذا يجب أن يظهر لها إشعار دائم (notification) والنظام يحميها من القتل قدر الإمكان. الفئة الثانية `Background Service` هي عمل "خلف الكواليس تماماً" لا يهتم المستخدم بمعرفة تفاصيله لحظياً — مثل مزامنة بيانات — لذا يسمح النظام لنفسه بإيقافها إذا احتاج الذاكرة لأمر أهم، ثم يعيد تشغيلها لاحقاً بدون أن يشعر المستخدم بفرق كبير. هذا يرتبط مباشرة بمبدأ "أقل الصلاحيات وأكبر مرونة للنظام" الذي رأيناه في فقرة الـ sandbox: النظام دائماً يحاول موازنة رغبة التطبيق في الاستمرار مع احتياج الجهاز للموارد. التشبيه اليومي: الخدمة الأمامية تشبه عاملاً يقف أمامك مباشرة وترتيبه واضح لك أنه يعمل (مثل نادل يقدم لك الطعام الآن، لا يمكن إبعاده فجأة)، بينما الخدمة الخلفية تشبه عامل نظافة يعمل في الخلف ولا تنتبه له، فإذا احتاج المدير أن يوقفه مؤقتاً لصالح مهمة أهم فلن يشعر أحد الزبائن بذلك.

**لماذا؟** لأن الموارد محدودة، فالنظام يحتاج معياراً واضحاً لتحديد أي عمل يستحق حماية أعلى من القتل: العمل الذي "يراه" المستخدم مباشرة (Foreground) يستحق أولوية، والعمل الخفي تماماً (Background) يمكن التضحية به مؤقتاً.

---

### 11. Bound Services بالتفصيل

#### النص الأصلي يقول (English):
> Bound services run because some other app (or the system) has said that it wants to make use of the service. A bound service provides an API to another process, and the system knows there is a dependency between these processes. So if process A is bound to a service in process B, the system knows that it needs to keep process B and its service running for A. A bound service runs only as long as another application component is bound to it. Multiple components can bind to the service at once, but when all of them unbind, the service is destroyed. A service is implemented as a subclass of Service class.

#### الترجمة الحرفية:
> تعمل الخدمات المرتبطة (bound services) لأن تطبيقاً آخر (أو النظام) قد أعلن أنه يريد الاستفادة من هذه الخدمة. توفّر الخدمة المرتبطة واجهة برمجية (API) لعملية أخرى، ويعرف النظام أن هناك اعتمادية (dependency) بين هاتين العمليتين. لذا إذا كانت العملية A مرتبطة بخدمة في العملية B، يعرف النظام أنه يحتاج للحفاظ على عمل العملية B وخدمتها من أجل A. تعمل الخدمة المرتبطة فقط طالما هناك مكوّن تطبيق آخر مرتبط بها. يمكن لعدة مكوّنات أن ترتبط بالخدمة في آن واحد، لكن عندما يفكّ الجميع ارتباطهم، تُدمَّر الخدمة. يُنفَّذ Service كصنف فرعي من صنف `Service`.

#### الشرح المبسّط:
هذا هو النوع الثاني من الخدمات، وهو مختلف جوهرياً عن Started Service من حيث "من يتحكم بدورة حياتها". الخدمة المُبدأة (كما شرحنا) تعمل باستقلالية حتى تنهي عملها بنفسها، أما الخدمة المرتبطة (bound) فوجودها بالكامل مرتبط بوجود "زبون" (مكوّن آخر) يستخدمها فعلياً في تلك اللحظة — بمجرد أن يرحل آخر زبون، تُغلَق الخدمة تلقائياً. هذا يشبه توفير "واجهة خدمة" (API) حية يتواصل معها التطبيق الآخر مباشرة أثناء عمله، وليس مجرد "أرسل مهمة واحدة وانتهى الأمر" كما في Started Service. التشبيه اليومي: تخيل خط اتصال هاتفي مباشر (hotline) بين شركتين — الخط يبقى مفتوحاً فقط طالما هناك طرف متصل فعلياً يستخدمه (bound)، وبمجرد أن يغلق الطرفان الخط، يُقفل الاتصال بالكامل تلقائياً؛ هذا مختلف عن إرسال طرد بريدي (started service) الذي يستمر بالتسليم حتى لو أغلقتَ الباب بعد إرساله.

**لماذا؟** لأن بعض العمليات ليست "مهمة واحدة تنتهي" بل "خدمة تفاعلية مستمرة" يحتاجها طرف آخر باستمرار طوال فترة استخدامه لها، فمن المنطقي أن تنتهي الخدمة تلقائياً بمجرد ألا يحتاجها أحد، توفيراً للموارد.

---

### 12. البدائل الحديثة للـ Services

#### النص الأصلي يقول (English):
> In modern Android development, Services are no longer the default choice for background work. For most background work, Google recommends alternative components: Kotlin Coroutines, WorkManager

#### الترجمة الحرفية:
> في تطوير أندرويد الحديث، لم تعد الخدمات (Services) هي الخيار الافتراضي للعمل في الخلفية. لمعظم أعمال الخلفية، توصي Google بمكوّنات بديلة: `Kotlin Coroutines`، `WorkManager`.

#### الشرح المبسّط:
هذه ملاحظة تحديثية (شرح زيادة للفهم) مهمة جداً حتى لا يظن الطالب أن Service هو دائماً الأداة الصحيحة لأي عمل بالخلفية اليوم. صحيح أن Service ما زال موجوداً كمفهوم أساسي في نظام أندرويد (خاصة للأعمال طويلة الأمد جداً مثل تشغيل موسيقى)، لكن Google توصي الآن باستخدام أدوات أحدث وأخف للمهام الخلفية العادية: `Kotlin Coroutines` للعمليات غير المتزامنة القصيرة نسبياً (مثل طلب شبكة واحد)، و`WorkManager` للمهام المؤجّلة أو المتكررة التي يجب أن تنجح حتى لو أُعيد تشغيل الجهاز (مثل رفع نسخة احتياطية كل يوم). هذا يرتبط بنفس فكرة "single-activity architecture" التي رأيناها سابقاً: أندرويد الحديث يفضّل أدوات أخف وأبسط في إدارة دورة الحياة بدلاً من مكوّنات ثقيلة كاملة. التشبيه اليومي: بدل أن توظّف موظفاً دائماً (Service) لمهمة بسيطة تستغرق دقائق، تستعين بعامل مؤقت (Coroutine) لإنجازها بسرعة ثم ينصرف، أو تجدول المهمة مع شركة متخصصة (WorkManager) تضمن تنفيذها ولو تأخر الوقت.

**لماذا؟** لأن Service التقليدية تستهلك موارد أكثر وتتطلب إدارة يدوية دقيقة لدورة حياتها، بينما Coroutines وWorkManager مصممتان خصيصاً لتبسيط وتحسين كفاءة أعمال الخلفية الشائعة.

---

### 13. مكوّن Broadcast Receiver — التعريف والغرض

#### النص الأصلي يقول (English):
> A broadcast receiver is a component that lets the system deliver events to the app outside of a regular user flow so the app can respond to system-wide broadcast announcements. Because broadcast receivers are another well-defined entry into the app, the system can deliver broadcasts even to apps that aren't currently running. Example: an app can schedule an alarm to post a notification to tell the user about an upcoming event. Because the alarm is delivered to a BroadcastReceiver in the app, there is no need for the app to remain running until the alarm goes off. Many broadcasts originate from the system, like a broadcast announcing that the screen is turned off, the battery is low, or a picture is captured. Apps can also initiate broadcasts, such as to let other apps know that some data is downloaded to the device and is available for them to use.

#### الترجمة الحرفية:
> مستقبل البث (broadcast receiver) هو مكوّن يسمح للنظام بتوصيل أحداث إلى التطبيق خارج تدفق المستخدم الاعتيادي، بحيث يستطيع التطبيق الاستجابة لإعلانات بث على مستوى النظام. نظراً لأن مستقبلات البث هي نقطة دخول أخرى محددة جيداً إلى التطبيق، يستطيع النظام توصيل البثوث حتى إلى تطبيقات لا تعمل حالياً. مثال: يمكن لتطبيق جدولة منبّه (alarm) لإظهار إشعار لإخبار المستخدم بحدث قادم. لأن المنبّه يُوصَل إلى BroadcastReceiver في التطبيق، لا حاجة لبقاء التطبيق عاملاً حتى يُطلق المنبّه. تنشأ بثوث كثيرة من النظام نفسه، مثل بث يعلن أن الشاشة أُطفئت، أو أن البطارية منخفضة، أو أنه تم التقاط صورة. يمكن للتطبيقات أيضاً أن تبدأ بثوثاً، مثلاً لإعلام تطبيقات أخرى بأن بعض البيانات نُزّلت على الجهاز وأصبحت متاحة لاستخدامها.

#### الشرح المبسّط:
الـ `Broadcast Receiver` هو المكوّن المسؤول عن "الاستماع" لأحداث تحدث في النظام أو التطبيق والاستجابة لها تلقائياً، حتى لو كان التطبيق مغلقاً تماماً وقت حدوثها. هذا يميّزه عن الثلاثة الأخرى: الـ Activity يحتاج المستخدم أن يفتح شاشة، والـ Service يحتاج بدءاً صريحاً غالباً من التطبيق نفسه، أما Broadcast Receiver فيُفعَّل تلقائياً بواسطة النظام استجابة لحدث خارجي — سواء كان الحدث نظامياً عاماً (بطارية منخفضة، شاشة مطفأة) أو حدثاً من تطبيق آخر (مثل إعلان أن ملفاً تم تنزيله). المثال الكلاسيكي هو المنبّه (alarm): بدل أن يبقى تطبيقك مفتوحاً طوال الوقت "منتظراً" لحظة معينة (وهذا يستهلك بطارية وذاكرة بلا داعٍ)، يمكنه فقط "تسجيل" رغبته لدى النظام، والنظام هو من يوقظ التطبيق عبر Broadcast Receiver في اللحظة المناسبة فقط. التشبيه اليومي: هذا يشبه جرس الإنذار في المنزل — لا تحتاج للجلوس أمامه طوال اليوم منتظراً حدوث خطر، بل هو يُفعّل نفسه تلقائياً فقط عند حدوث الحدث المحدد (دخان، حركة)، حتى لو كنت نائماً أو خارج المنزل تماماً.

**لماذا؟** لأن إبقاء التطبيق يعمل باستمرار فقط "لينتظر" حدثاً نادراً يهدر البطارية والذاكرة بشكل كبير؛ آلية البث تسمح للنظام بإيقاظ التطبيق فقط عند الحاجة الفعلية.

---

### 14. Broadcast Receiver — القيود والاستخدام السليم

#### النص الأصلي يقول (English):
> Although broadcast receivers don't display a user interface, they can create a status bar notification to alert the user when a broadcast event occurs. More commonly, though, a broadcast receiver is just a gateway to other components and is intended to do a very minimal amount of work. For instance, a broadcast receiver might schedule a JobService to perform some work based on an event using JobScheduler. A BroadcastReceiver should be used to react to events, not to perform heavy work. A broadcast receiver is implemented as a subclass of BroadcastReciever class and each broadcast message is delivered as an Intent object.

#### الترجمة الحرفية:
> رغم أن مستقبلات البث لا تعرض واجهة مستخدم، يمكنها إنشاء إشعار في شريط الحالة لتنبيه المستخدم عند حدوث حدث بث. لكن الأكثر شيوعاً أن مستقبل البث هو مجرد بوابة (gateway) إلى مكوّنات أخرى، والمقصود منه أن يؤدي كمية عمل ضئيلة جداً. مثلاً، قد يجدول مستقبل البث خدمة عمل (JobService) لأداء عمل ما بناءً على حدث باستخدام `JobScheduler`. يجب استخدام BroadcastReceiver للاستجابة للأحداث، وليس لأداء عمل ثقيل. يُنفَّذ مستقبل البث كصنف فرعي من صنف `BroadcastReceiver`، وتُوصَل كل رسالة بث ككائن `Intent`.

#### الشرح المبسّط:
هذه الفقرة تحدد قاعدة تصميم مهمة جداً يخطئ فيها المبتدئون كثيراً: الـ Broadcast Receiver مصمم ليكون "سريعاً وخفيفاً جداً" — مجرد "بوابة" تستقبل الحدث ثم تُحيله فوراً إلى مكوّن آخر أقدر على تنفيذ عمل طويل (مثل جدولة عمل عبر JobScheduler). لا يجوز أبداً وضع عمل ثقيل (مثل تحميل ملف كبير أو معالجة بيانات معقدة) مباشرة داخل الـ Receiver نفسه، لأن النظام يعطيه وقتاً محدوداً جداً للتنفيذ قبل أن يعتبره "متجمداً" (ANR) وينهيه بالقوة. يمكنه فقط إظهار إشعار بسيط للمستخدم، لكن الغالب أنه يعمل بصمت تام في الخلفية. تقنياً، كل حدث بث يصل كجسم `Intent` — وهذا يربطنا بالمفهوم القادم الذي سنشرحه بالتفصيل (Activate Components عبر Intent). التشبيه اليومي: مستقبل البث يشبه موظف استقبال في مستشفى يستقبل حالة الطوارئ ويحوّلها فوراً للقسم المختص (JobService)، لكنه هو نفسه لا يجري العملية الجراحية — فقط "يوجّه" بسرعة فائقة.

**لماذا؟** لأن مستقبل البث يعمل غالباً في سياق زمني ضيق جداً (النظام يعطيه ثوانٍ معدودة قبل اعتباره متجمداً)، فتصميمه كـ"بوابة سريعة" يمنع تجميد النظام أو استنزاف موارد الجهاز.

---

### 15. مكوّن Content Provider — التعريف والغرض

#### النص الأصلي يقول (English):
> A content provider manages a shared set of app data that you can store in the file system, in a SQLite database, on the web, or on any other persistent storage location that your app can access. Through the content provider, other apps can query or modify the data, if the content provider permits it. Example: the Android system provides a content provider that manages the user's contact information. Any app with the proper permissions can query the content provider, such as using ContactsContract.Data, to read and write information about a particular person. To the system, a content provider is an entry point into an app for publishing named data items, identified by a URIs, which other apps can use to access the data. e.g: content://com.example.app/users (all users), content://com.example.app/users/1 (specific user)

#### الترجمة الحرفية:
> يدير مزوّد المحتوى (content provider) مجموعة مشتركة من بيانات التطبيق التي يمكن تخزينها في نظام الملفات، أو في قاعدة بيانات SQLite، أو على الويب، أو في أي موقع تخزين دائم آخر يستطيع تطبيقك الوصول إليه. من خلال مزوّد المحتوى، تستطيع تطبيقات أخرى الاستعلام عن البيانات أو تعديلها، إذا سمح مزوّد المحتوى بذلك. مثال: يوفّر نظام أندرويد مزوّد محتوى يدير معلومات جهات اتصال المستخدم. يستطيع أي تطبيق يملك الأذونات المناسبة الاستعلام عن مزوّد المحتوى، مثل استخدام `ContactsContract.Data`، لقراءة وكتابة معلومات عن شخص معيّن. بالنسبة للنظام، مزوّد المحتوى هو نقطة دخول إلى تطبيق لنشر عناصر بيانات مسمّاة، محددة عبر روابط URI، تستطيع تطبيقات أخرى استخدامها للوصول إلى البيانات. مثال: `content://com.example.app/users` (كل المستخدمين)، `content://com.example.app/users/1` (مستخدم محدد).

#### الشرح المبسّط:
الـ `Content Provider` هو المكوّن المخصص لمشاركة البيانات بشكل منظم وآمن بين التطبيقات — وهذا يحل مشكلة مباشرة نشأت من مبدأ الـ Sandbox الذي شرحناه في بداية المحاضرة: بما أن كل تطبيق معزول ولا يمكنه الوصول لملفات تطبيق آخر مباشرة، كيف يستطيع تطبيق جهات الاتصال مثلاً أن يسمح لتطبيقات أخرى (كالواتساب) بقراءة قائمة جهات الاتصال؟ الجواب: عبر Content Provider الذي يوفّر "واجهة رسمية ومحكومة" للوصول للبيانات، بدل فتح كل الملفات مباشرة. كل قطعة بيانات (سجل مستخدم، جهة اتصال) لها عنوان فريد يسمى URI (مثل عنوان رابط ويب لكن داخل الجهاز)، ويمكن طلب "كل السجلات" أو "سجل واحد محدد" حسب الرابط. التشبيه اليومي: تخيل مكتبة عامة (Content Provider) لا تسمح لأي شخص بالدخول إلى المستودع الداخلي وأخذ الكتب مباشرة، بل يجب أن تطلب من موظف الاستعلامات كتاباً محدداً برقمه (URI)، والموظف هو من يحضره لك أو يرفض إن لم تملك الصلاحية.

**لماذا؟** لأن مشاركة البيانات بين تطبيقات معزولة تماماً عن بعضها تحتاج آلية موحدة وآمنة تسمح بالتحكم الدقيق في من يستطيع القراءة أو الكتابة، بدلاً من كسر مبدأ الـ Sandbox بالكامل.

---

### 16. Content Provider — البيانات الخاصة وطريقة التنفيذ

#### النص الأصلي يقول (English):
> Content providers are also useful for reading and writing data that is private to your app and not shared. A content provider is implemented as a subclass of ContentProvider and must implement a standard set of APIs that enable other apps to perform transactions.

#### الترجمة الحرفية:
> مزوّدات المحتوى مفيدة أيضاً لقراءة وكتابة بيانات خاصة بتطبيقك وغير مشاركة. يُنفَّذ مزوّد المحتوى كصنف فرعي من `ContentProvider` ويجب أن يطبّق مجموعة قياسية من واجهات برمجية (APIs) تمكّن التطبيقات الأخرى من إجراء المعاملات (transactions).

#### الشرح المبسّط:
هذه الملاحظة تصحح فهماً خاطئاً شائعاً: قد يظن البعض أن Content Provider يُستخدم فقط عندما تريد "مشاركة" بياناتك مع تطبيقات أخرى، لكن الحقيقة أنه يمكن استخدامه أيضاً كطريقة داخلية منظمة للتعامل مع بيانات التطبيق الخاصة به فقط، دون أي نية لمشاركتها مع أحد — لأنه يوفر واجهة موحدة وقياسية (APIs) للتعامل مع البيانات بغض النظر عن مكان تخزينها الفعلي (ملفات، SQLite، إلخ). تقنياً، أي Content Provider يجب أن يرث من الصنف الأساسي `ContentProvider` وينفّذ دوال قياسية معينة (مثل `query`، `insert`، `update`، `delete`) حتى تستطيع أي جهة التعامل معه بطريقة متوقعة وموحدة. التشبيه اليومي: تخيل أن لديك نظام أرشفة داخلي منظم في مكتبك الخاص (حتى لو لم يزره أحد غيرك أبداً) — تنظّمه بنفس الطريقة القياسية (ترقيم، تصنيف) التي تستخدمها المكاتب المفتوحة للجمهور، لأن هذا التنظيم يجعل حتى استخدامك الشخصي للبيانات أسهل وأكثر اتساقاً.

**لماذا؟** لأن الواجهة القياسية لـ Content Provider (query, insert, update, delete) تسهّل التعامل مع البيانات بطريقة متسقة داخل التطبيق نفسه أيضاً، حتى بدون حاجة فعلية للمشاركة الخارجية.

---

### 17. تفعيل المكوّنات عبر Intent

#### النص الأصلي يقول (English):
> An asynchronous message called an intent activates three of the four component types: activities, services, and broadcast receivers. Intents bind individual components to each other at runtime. You can think of them as the messengers that request an action from other components, whether the component belongs to your app or another. An intent is created with an Intent object, which defines a message to activate either a specific component (an explicit intent) or a specific type of component (an implicit intent). For activities and services, an intent defines the action to perform, such as to view or send something, and might specify the URI of the data to act on, among other things that the component being started might need to know. Example, an intent might convey a request for an activity to show an image or to open a web page.

#### الترجمة الحرفية:
> رسالة غير متزامنة (asynchronous) تُسمى Intent تُفعّل ثلاثة من أنواع المكوّنات الأربعة: الأنشطة، والخدمات، ومستقبلات البث. تربط الـ Intents المكوّنات الفردية ببعضها البعض وقت التشغيل (runtime). يمكنك اعتبارها "رسلاً" يطلبون إجراءً من مكوّنات أخرى، سواء كان المكوّن تابعاً لتطبيقك أو لتطبيق آخر. يُنشأ الـ Intent بكائن `Intent`، الذي يعرّف رسالة لتفعيل إما مكوّن محدد (intent صريح) أو نوع محدد من المكوّنات (intent ضمني). بالنسبة للأنشطة والخدمات، يعرّف الـ Intent الإجراء المراد تنفيذه، مثل عرض أو إرسال شيء، وقد يحدد رابط URI للبيانات المراد التصرف بها، من بين أمور أخرى قد يحتاجها المكوّن الذي سيُشغَّل. مثال: قد ينقل Intent طلباً لنشاط لعرض صورة أو فتح صفحة ويب.

#### الشرح المبسّط:
هنا نصل إلى الآلية العملية التي تربط كل ما شرحناه سابقاً: كيف "يستدعي" مكوّن مكوّناً آخر فعلياً؟ الجواب هو `Intent`. الـ Intent هو ببساطة "رسالة" تحمل معلومات عن ما تريد فعله، ومن أو ماذا يجب أن يقوم بذلك. هناك نوعان أساسيان يجب حفظهما جيداً: `Explicit Intent` (صريح) حيث تحدد بالضبط أي صنف (Class) تريد تشغيله (عادة داخل تطبيقك نفسه)، و`Implicit Intent` (ضمني) حيث تصف فقط "نوع العمل" المطلوب (مثل "افتح رابط ويب") وتترك للنظام اختيار أي تطبيق مناسب على الجهاز سينفذه — وهذا بالضبط ما شرحناه في الفقرة الرابعة عن استدعاء تطبيق الكاميرا. كلمة "غير متزامنة" (asynchronous) تعني أن إرسال الـ Intent لا يوقف تنفيذ الكود الحالي بانتظار رد فوري، بل هو أشبه برسالة تُرسَل وتُعالَج بشكل منفصل. التشبيه اليومي: الـ Intent يشبه إرسال طلب توصيل (Intent صريح: "أوصل لمنزل فلان بالضبط") أو نداءً عاماً لأي شركة توصيل متاحة ("Implicit: أي أحد يستطيع توصيل هذا الطرد فليتقدم") — النظام (نظام أندرويد) هو من يوجّه الطلب فعلياً للطرف المناسب.

**لماذا؟** لأن التطبيقات معزولة تماماً عن بعضها (Sandbox)، فلا يمكن استدعاء مكوّن آخر بشكل مباشر عبر استدعاء دالة عادية؛ الـ Intent هو "لغة موحدة" يفهمها النظام نفسه ليقوم بالتوصيل الآمن نيابة عنك.

---

### 18. Intent للبثوث ومزوّدات المحتوى

#### النص الأصلي يقول (English):
> For broadcast receivers, the intent defines the broadcast announcement. Example, a broadcast to indicate that the device battery is low includes only a known action string that indicates battery is low. Unlike activities, services, and broadcast receivers, content providers are activated when targeted by a request from a ContentResolver. The content resolver handles all direct transactions with the content provider, and the component performing transactions with the provider calls methods on the ContentResolver object. This leaves a layer of abstraction for security reasons between the content provider and the component requesting information.

#### الترجمة الحرفية:
> بالنسبة لمستقبلات البث، يعرّف الـ Intent إعلان البث. مثال: بث يشير إلى أن بطارية الجهاز منخفضة يتضمن فقط سلسلة نصية معروفة (action string) تشير إلى أن البطارية منخفضة. على عكس الأنشطة والخدمات ومستقبلات البث، تُفعَّل مزوّدات المحتوى عندما تُستهدَف بطلب من `ContentResolver`. يتولى محلّل المحتوى (content resolver) كل المعاملات المباشرة مع مزوّد المحتوى، والمكوّن الذي يجري معاملات مع المزوّد يستدعي دوالاً على كائن `ContentResolver`. هذا يترك طبقة تجريد (abstraction) لأسباب أمنية بين مزوّد المحتوى والمكوّن الذي يطلب المعلومات.

#### الشرح المبسّط:
هذه الفقرة تُبرز استثناءً مهماً يجب الانتباه له: من بين المكوّنات الأربعة، ثلاثة فقط (Activity، Service، Broadcast Receiver) تُفعَّل مباشرة عبر Intent، أما Content Provider (الرابع) فله آلية مختلفة تماماً — يُفعَّل عبر كائن وسيط يسمى `ContentResolver`. لماذا هذا الاختلاف؟ لأن Content Provider يتعامل مع بيانات حساسة (كجهات الاتصال)، فبدل أن يتواصل التطبيق الطالب مباشرة مع مزوّد المحتوى، يمر عبر "محلّل" (Resolver) يضيف طبقة حماية إضافية ويتحقق من الصلاحيات قبل تمرير أي طلب. هذا يذكرنا بمبدأ "النظام كوسيط موثوق" الذي شرحناه سابقاً، لكن هنا الوسيط له اسم خاص ودور أكثر تحديداً في التحقق من الأذونات لكل معاملة بيانات. التشبيه اليومي: تخيل أنك تريد معلومة سرية من أرشيف حكومي (Content Provider) — لا تدخل للأرشيف مباشرة أبداً حتى مع وجود "طلب رسمي" (Intent)، بل يجب أن تمر عبر موظف مختص (ContentResolver) يتحقق من هويتك وصلاحياتك أولاً قبل أن يجلب لك المعلومة أو يرفض طلبك.

**لماذا؟** لأن البيانات التي يديرها Content Provider غالباً حساسة ومشتركة بين عدة تطبيقات في آن واحد، فوجود طبقة وسيطة (ContentResolver) يمنح تحكماً أدق في الأذونات مقارنة بآلية Intent العامة المستخدمة للمكوّنات الأخرى.

---

### 19. دوال تفعيل كل نوع مكوّن

#### النص الأصلي يقول (English):
> There are separate methods for activating each type of component: You can start an activity or give it something new to do by passing an Intent to startActivity() or, when you want the activity to return a result, startActivityForResult(). On Android 5.0 (API level 21) and higher, you can use the JobScheduler class to schedule actions. For earlier Android versions, you can start a service or give new instructions to an ongoing service by passing an Intent to startService(). You can bind to the service by passing an Intent to bindService(). You can initiate a broadcast by passing an Intent to methods such as sendBroadcast() or sendOrderedBroadcast(). You can perform a query to a content provider by calling query() on a ContentResolver.

#### الترجمة الحرفية:
> توجد دوال منفصلة لتفعيل كل نوع من أنواع المكوّنات: يمكنك تشغيل نشاط أو إعطاءه مهمة جديدة عبر تمرير Intent إلى `startActivity()`، أو عندما تريد أن يُعيد النشاط نتيجة، عبر `startActivityForResult()`. في أندرويد 5.0 (مستوى API رقم 21) وما بعده، يمكنك استخدام صنف `JobScheduler` لجدولة الإجراءات. للإصدارات الأقدم من أندرويد، يمكنك تشغيل خدمة أو إعطاء تعليمات جديدة لخدمة قائمة عبر تمرير Intent إلى `startService()`. يمكنك الارتباط بالخدمة عبر تمرير Intent إلى `bindService()`. يمكنك بدء بث عبر تمرير Intent إلى دوال مثل `sendBroadcast()` أو `sendOrderedBroadcast()`. يمكنك تنفيذ استعلام لمزوّد محتوى عبر استدعاء `query()` على كائن `ContentResolver`.

#### الشرح المبسّط:
هذه الفقرة تجمع كل ما شرحناه نظرياً في الفقرات السابقة (17، 18) في شكل "قائمة دوال عملية" يستخدمها المطور فعلياً في الكود. لكل نوع مكوّن دالة مختلفة: `startActivity()` لفتح شاشة عادية، و`startActivityForResult()` عندما تحتاج نتيجة تعود إليك (تماماً كمثال الكاميرا الذي شرحناه سابقاً حيث تعود لك الصورة الملتقطة)، و`startService()`/`bindService()` للخدمات حسب النوع (مُبدأة أو مرتبطة كما شرحنا)، و`sendBroadcast()` للبثوث، وأخيراً `query()` على `ContentResolver` لمزوّدات المحتوى (بدون Intent كما أوضحنا في الاستثناء بالفقرة السابقة). من المهم ملاحظة الإشارة لـ `JobScheduler` كبديل حديث لبدء الخدمات في الإصدارات الأحدث، وهذا يربط بما شرحناه سابقاً عن `WorkManager` كأداة حديثة تعتمد مبدأ مشابهاً. التشبيه اليومي: هذه القائمة أشبه بلائحة أرقام هواتف مختلفة لكل قسم في شركة — رقم لطلب موعد (startActivity)، رقم لطلب موعد مع انتظار الرد (startActivityForResult)، خط ساخن للطلبات المستمرة (startService/bindService)، ونظام نداء عام للإعلانات (sendBroadcast) — كل قسم له طريقة اتصال مختلفة تناسب طبيعة عمله.

**لماذا؟** كل نوع من المكوّنات له طبيعة عمل مختلفة (شاشة تفاعلية، عمل خلفي، حدث لحظي، بيانات مشتركة)، لذا يحتاج كل واحد دالة API مخصصة تناسب طريقة تفعيله ودورة حياته الخاصة.

---

### 20. مقدمة ملف الـ Manifest

#### النص الأصلي يقول (English):
> Before the Android system can start an app component, the system must know that the component exists by reading the app's manifest file, AndroidManifest.xml. Your app declares all its components in AndroidManifest.xml, which is at the root of the app project directory. The manifest does a number of things in addition to declaring the app's components, such as the following: Identifies any user permissions the app requires, such as Internet access or read-access to the user's contacts. Declares the minimum API Level required by the app, based on which APIs the app uses. Declares hardware and software features used or required by the app, such as a camera, bluetooth services, or a multitouch screen. Declares API libraries the app needs to be linked against (other than the Android framework APIs), such as the Google Maps library.

#### الترجمة الحرفية:
> قبل أن يستطيع نظام أندرويد تشغيل مكوّن تطبيق، يجب أن يعرف النظام أن هذا المكوّن موجود عبر قراءة ملف بيان التطبيق (manifest)، وهو `AndroidManifest.xml`. يُصرِّح تطبيقك بكل مكوّناته في `AndroidManifest.xml`، الموجود في جذر مجلد مشروع التطبيق. يقوم ملف البيان بعدة أمور إضافة إلى التصريح عن مكوّنات التطبيق، مثل التالي: تحديد أي أذونات مستخدم يحتاجها التطبيق، مثل الوصول للإنترنت أو صلاحية قراءة جهات اتصال المستخدم. تحديد أدنى مستوى API مطلوب من قبل التطبيق، بناءً على الواجهات البرمجية (APIs) التي يستخدمها التطبيق. تحديد ميزات العتاد والبرمجيات المستخدَمة أو المطلوبة من قبل التطبيق، مثل الكاميرا، أو خدمات البلوتوث، أو شاشة تعدد اللمس. تحديد مكتبات API التي يحتاج التطبيق أن يُربَط بها (بخلاف واجهات برمجة إطار عمل أندرويد)، مثل مكتبة خرائط Google.

#### الشرح المبسّط:
هذه الفقرة تقدّم ملف `AndroidManifest.xml` كـ"بطاقة تعريف رسمية" لكامل التطبيق، يقرأها النظام قبل أي شيء آخر. تذكّر ما شرحناه في الفقرة 5: لا يوجد `main()` واحد يبدأ التطبيق، فكيف يعرف النظام أصلاً أن هناك Activity أو Service موجودة في تطبيقك؟ الجواب هو الـ Manifest — بدون تصريح صريح لمكوّن هناك، لن يعرف النظام بوجوده أبداً ولن يستطيع تشغيله مهما كان الكود مكتوباً بشكل صحيح. إضافة لتعريف المكوّنات، الملف يحمل معلومات حيوية أخرى: ما هي الأذونات التي يطلبها التطبيق (كالإنترنت)، ما أقل نسخة أندرويد يدعمها، وما العتاد المطلوب (كالكاميرا). التشبيه اليومي: الـ Manifest يشبه استمارة تسجيل رسمية تقدمها لجهة حكومية قبل فتح أي نشاط تجاري — تذكر فيها كل الأقسام التي ستفتحها (المكوّنات)، والتصاريح التي تحتاجها (الأذونات)، والمعدات التي ستستخدمها (ميزات العتاد) — بدون هذه الاستمارة، لن تُسمح لك بالعمل رسمياً مهما جهّزت المكان فعلياً.

**لماذا؟** لأن النظام يحتاج معرفة بنية التطبيق بالكامل مسبقاً (وليس أثناء التشغيل فقط) للتحقق من الصلاحيات والتوافق قبل السماح بتثبيت التطبيق أصلاً أو تشغيل أي مكوّن منه.

---

### 21. تصريح المكوّنات في الـ Manifest — مثال Activity

#### النص الأصلي يقول (English):
> Declare components. The primary task of the manifest is to inform the system about the app's components. Example: a manifest file can declare an activity as follows: In the <application> element, the android:icon attribute points to resources for an icon that identifies the app. In the <activity> element, the android:name attribute specifies the fully qualified class name of the Activity subclass, and the android:label attribute specifies a string to use as the user-visible label for the activity.

#### الترجمة الحرفية:
> تصريح المكوّنات. المهمة الأساسية للـ manifest هي إبلاغ النظام بمكوّنات التطبيق. مثال: يمكن لملف manifest أن يصرّح عن نشاط (activity) كما يلي: في عنصر `<application>`، تشير خاصية `android:icon` إلى موارد لأيقونة تعرّف التطبيق. في عنصر `<activity>`، تحدد خاصية `android:name` الاسم المؤهَّل بالكامل (fully qualified) لصنف Activity الفرعي، وتحدد خاصية `android:label` نصاً يُستخدم كتسمية مرئية للمستخدم لذلك النشاط.

#### الشرح المبسّط:
هذه أول مرة نرى فيها كيف يبدو تصريح مكوّن فعلياً بلغة XML داخل الـ Manifest، وهذا يربط مباشرة بكل النظرية السابقة عن App Components: تذكر أننا قلنا في الفقرة 20 أن أي مكوّن غير مصرَّح عنه في الـ Manifest لن يعرف النظام بوجوده — هنا نرى الشكل العملي لهذا التصريح. عنصر `<application>` يمثّل التطبيق ككل ويحمل معلومات عامة كالأيقونة، بينما كل عنصر `<activity>` بداخله يمثّل نشاطاً واحداً محدداً (كما شرحنا في الفقرة 6 أن كل Activity هي شاشة مستقلة). الخاصية `android:name` هي الرابط المباشر بين ملف XML هذا وكود Kotlin الفعلي (تحدد أي Class بالضبط سيُشغَّل)، بينما `android:label` هو فقط النص الذي يراه المستخدم (مثل اسم التطبيق تحت الأيقونة). التشبيه اليومي: هذا يشبه تعبئة نموذج تسجيل موظف جديد في شركة — تكتب اسمه الكامل الرسمي (android:name، يربط بملف الموظف الحقيقي في السجلات) والاسم الذي سيظهر على بطاقته أمام الزبائن (android:label).

**لماذا؟** الفصل بين "الاسم البرمجي" (name) و"الاسم المرئي" (label) يسمح بتغيير ما يراه المستخدم (مثلاً عند الترجمة للغات مختلفة عبر resource qualifiers) دون الحاجة لتغيير الكود البرمجي الفعلي مطلقاً.

#### 💻 الكود: تصريح Activity في AndroidManifest.xml

#### ما هذا الكود؟
> هذا مثال كامل من المحاضرة يوضح كيف يبدو ملف `AndroidManifest.xml` عند تصريح نشاط رئيسي واحد (MainActivity) يعمل كنقطة إطلاق التطبيق.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Root manifest element with Android and tools namespaces -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools">
<!-- application element represents the whole app -->
<application
android:icon="@mipmap/ic_launcher"
android:label="@string/app_name">
<!-- activity element declares one screen (MainActivity) -->
<activity
android:name=".MainActivity"
android:exported="true"
android:label="@string/app_name">
<!-- intent-filter defines what kind of intents this activity can respond to -->
<intent-filter>
<!-- MAIN action means this is an entry point, not requiring input data -->
<action android:name="android.intent.action.MAIN" />
<!-- LAUNCHER category means it appears in the device's app launcher -->
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
</activity>
</application>
</manifest>
```

#### شرح كل سطر:
1. `<manifest xmlns:android=... xmlns:tools=...>` → العنصر الجذري للملف — يعرّف مساحتَي الأسماء (namespaces) اللازمتين لقراءة خصائص `android:` و `tools:` — بدونها لن يفهم المُحلِّل (parser) معنى الخصائص المستخدَمة لاحقاً.
2. `<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name">` → يمثّل التطبيق بأكمله، ويربط أيقونة التطبيق (icon) واسمه الظاهر (label) بموارد معرّفة في مجلد `res/`.
3. `<activity android:name=".MainActivity" android:exported="true" android:label="@string/app_name">` → يصرّح عن نشاط باسم `MainActivity` (النقطة قبل الاسم تعني أنه في الحزمة الأساسية للتطبيق)، و`exported="true"` يعني السماح لتطبيقات أخرى بتشغيل هذا النشاط.
4. `<intent-filter>` → يبدأ تعريف "قدرات" هذا النشاط، أي أي أنواع من الـ Intents يستطيع الاستجابة لها.
5. `<action android:name="android.intent.action.MAIN" />` → يحدد أن هذا النشاط هو نقطة دخول رئيسية (لا يحتاج بيانات من intent ليبدأ).
6. `<category android:name="android.intent.category.LAUNCHER" />` → يحدد أن أيقونة هذا النشاط يجب أن تظهر في قائمة تطبيقات الجهاز (launcher).

**المكتبات المطلوبة (Imports):**
> لا يوجد imports في ملفات XML — لكن يجب أن يتطابق `android:name=".MainActivity"` مع صنف Kotlin فعلي موجود في المشروع.

**الناتج المتوقع (لقطة الشاشة):**
> عند تثبيت التطبيق، تظهر أيقونته في قائمة تطبيقات الجهاز (Launcher)، وعند الضغط عليها يُشغَّل `MainActivity` مباشرة.

---

### 22. أنواع عناصر تصريح المكوّنات الأربعة والقيود عليها

#### النص الأصلي يقول (English):
> You must declare all app components using the following elements: <activity> elements for activities, <service> elements for services, <receiver> elements for broadcast receivers, <provider> elements for content providers. Activities, services, and content providers that you include in your source but don't declare in the manifest aren't visible to the system and, consequently, can never run. Broadcast receivers can either be declared in the manifest or created dynamically in code as BroadcastReceiver objects and registered with the system by calling registerReceiver().

#### الترجمة الحرفية:
> يجب أن تصرّح عن كل مكوّنات التطبيق باستخدام العناصر التالية: عنصر `<activity>` للأنشطة، عنصر `<service>` للخدمات، عنصر `<receiver>` لمستقبلات البث، عنصر `<provider>` لمزوّدات المحتوى. الأنشطة والخدمات ومزوّدات المحتوى التي تُضمّنها في الكود المصدري لكن لا تصرّح عنها في الـ manifest ليست مرئية للنظام، وبالتالي، لا يمكنها العمل أبداً. يمكن التصريح عن مستقبلات البث إما في الـ manifest أو إنشاؤها ديناميكياً في الكود ككائنات `BroadcastReceiver` وتسجيلها لدى النظام عبر استدعاء `registerReceiver()`.

#### الشرح المبسّط:
هذه الفقرة تربط المكوّنات الأربعة النظرية (Activity، Service، Broadcast Receiver، Content Provider) بعناصر XML مقابلة لها تماماً بنفس الترتيب الذي شرحناه في بداية المحاضرة. القاعدة الحاسمة هنا: ثلاثة من الأربعة (Activity، Service، Content Provider) **يجب** أن تُصرَّح في الـ Manifest وإلا فهي "غير موجودة" من منظور النظام تماماً، حتى لو كان الكود صحيحاً ومكتوباً بالكامل. الاستثناء الوحيد هو Broadcast Receiver، الذي يملك طريقتين: إما التصريح الثابت في الـ Manifest (كالبقية)، أو التسجيل الديناميكي وقت التشغيل عبر دالة `registerReceiver()` مباشرة في الكود — وهذا مفيد عندما تريد الاستماع لبث فقط أثناء تشغيل جزء معين من التطبيق (مثل الاستماع لتغيّر حالة الشبكة فقط أثناء ظهور شاشة معينة). التشبيه اليومي: تخيل شركة توظيف تشترط تسجيل كل الموظفين الدائمين (Activity, Service, Provider) في سجلات الموارد البشرية الرسمية قبل بدء عملهم فعلياً، لكنها تسمح للمتطوعين المؤقتين (Broadcast Receiver الديناميكي) بالانضمام والمغادرة بشكل مرن دون تسجيل دائم — فقط "إشعار سريع" عند الحاجة.

**لماذا؟** الفرق يعود لطبيعة الاستخدام: Activity وService وProvider عادة يحتاجها التطبيق طوال دورة حياته، أما بعض البثوث فقد تكون مطلوبة فقط في لحظات أو شاشات معينة، فالتسجيل الديناميكي يمنح مرونة أكبر ويوفر موارد عندما لا تكون الحاجة دائمة.

---

### 23. تصريح قدرات المكوّنات (Intent Filters)

#### النص الأصلي يقول (English):
> Declare component capabilities. You can use an Intent to start activities, services, and broadcast receivers. You do this by explicitly naming the target component, using the component class name, in the intent. You can also use an implicit intent, which describes the type of action to perform and, optionally, the data you want to perform the action on. An implicit intent lets the system find a component on the device that can perform the action and start it. If there are multiple components that can perform the action described by the intent, the user selects which one to use. The system identifies the components that can respond to an intent by comparing the intent received to the intent filters provided in the manifest file of other apps on the device. When you declare an activity in your app's manifest, you can optionally include intent filters that declare the capabilities of the activity so it can respond to intents from other apps. You do this by adding an <intent-filter> element as a child of the component's declaration element.

#### الترجمة الحرفية:
> تصريح قدرات المكوّن. يمكنك استخدام Intent لتشغيل الأنشطة والخدمات ومستقبلات البث. تفعل ذلك عبر تسمية المكوّن الهدف صراحة، باستخدام اسم صنف المكوّن، داخل الـ Intent. يمكنك أيضاً استخدام Intent ضمني، والذي يصف نوع الإجراء المراد تنفيذه، واختيارياً، البيانات التي تريد تنفيذ الإجراء عليها. يسمح الـ Intent الضمني للنظام بإيجاد مكوّن على الجهاز يستطيع تنفيذ الإجراء وتشغيله. إذا وُجدت عدة مكوّنات تستطيع تنفيذ الإجراء الموصوف في الـ Intent، يختار المستخدم أيها سيستخدم. يحدد النظام المكوّنات التي تستطيع الاستجابة لـ Intent عبر مقارنة الـ Intent المستلَم بفلاتر الـ Intent (intent filters) المقدَّمة في ملف manifest للتطبيقات الأخرى على الجهاز. عندما تصرّح عن نشاط في manifest تطبيقك، يمكنك اختيارياً تضمين فلاتر intent تصرّح عن قدرات النشاط بحيث يستطيع الاستجابة لـ intents من تطبيقات أخرى. تفعل ذلك عبر إضافة عنصر `<intent-filter>` كعنصر ابن لعنصر تصريح المكوّن.

#### الشرح المبسّط:
هذه الفقرة تشرح الآلية التقنية الكاملة وراء الفرق بين Explicit وImplicit Intent الذي ذكرناه سابقاً في الفقرة 17، لكن هنا من منظور الـ Manifest تحديداً. عندما يُرسِل تطبيق Intent ضمنياً (implicit)، لا يعرف بالضبط أي تطبيق سيستجيب — النظام هو من "يبحث" بين كل التطبيقات المثبَّتة على الجهاز عن أي مكوّن أعلن في الـ Manifest الخاص به (عبر `<intent-filter>`) أنه "قادر" على التعامل مع هذا النوع من الطلبات. إذا وُجد أكثر من مرشح واحد، يظهر للمستخدم مربع اختيار ("افتح باستخدام...") ليختار بنفسه. عنصر `<intent-filter>` هو إذن "إعلان قدرات" — بمثابة قول "أنا أستطيع التعامل مع هذا النوع من الطلبات إن وصلني أحدها". التشبيه اليومي: هذا يشبه نشر إعلان توظيف عام (implicit intent) بدل الاتصال بشخص محدد بالاسم (explicit intent) — أي شركة (تطبيق) أعلنت في سجلها الرسمي (Manifest) أنها "تقبل هذا النوع من الطلبات" ستظهر كخيار، وإن تقدم أكثر من شركة، يختار الزبون (المستخدم) من يريد التعامل معه.

**لماذا؟** آلية الـ Intent Filter هي ما يجعل أندرويد نظاماً مفتوحاً وقابلاً للتوسع؛ يستطيع أي مطور جديد تثبيت تطبيقه ليصبح فوراً "خياراً متاحاً" للتعامل مع نوع معين من الطلبات على الجهاز، دون الحاجة لتعديل أي تطبيق آخر موجود مسبقاً.

#### 💻 الكود: تصريح Intent Filter لاستقبال بيانات مُرسَلة (SEND)

#### ما هذا الكود؟
> مثال من المحاضرة يوضح كيف يصرّح تطبيق بريد إلكتروني عن نشاط "إنشاء رسالة" بحيث يظهر كخيار عندما يريد تطبيق آخر (كتطبيق صور) مشاركة محتوى عبر البريد.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools">
<application ... >
<!-- ComposeEmailActivity declares it can handle SEND intents -->
<activity android:name="com.example.project.ComposeEmailActivity">
<intent-filter>
<!-- SEND action: this activity can receive shared content -->
<action android:name="android.intent.action.SEND" />
<!-- accepts any MIME type of data -->
<data android:type="*/*" />
<!-- DEFAULT category required for implicit intents to reach it -->
<category android:name="android.intent.category.DEFAULT" />
</intent-filter>
</activity>
</application>
</manifest>
```

#### شرح كل سطر:
1. `<activity android:name="com.example.project.ComposeEmailActivity">` → يصرّح عن نشاط إنشاء الرسالة، بالاسم الكامل للصنف (fully qualified).
2. `<action android:name="android.intent.action.SEND" />` → يعلن أن هذا النشاط يستطيع التعامل مع أي Intent يطلب إجراء "إرسال" محتوى.
3. `<data android:type="*/*" />` → يحدد أنه يقبل أي نوع MIME من البيانات (صور، نصوص، إلخ) — لو أراد المطور قصره على الصور فقط لكتب `image/*`.
4. `<category android:name="android.intent.category.DEFAULT" />` → ضروري ليكون هذا النشاط "مرشحاً" فعلياً عند إرسال implicit intents من تطبيقات أخرى.

**الناتج المتوقع (لقطة الشاشة):**
> عندما يضغط المستخدم "مشاركة" على صورة في تطبيق آخر، سيظهر تطبيق البريد كخيار ضمن قائمة "مشاركة عبر..."، وعند اختياره يُفتح `ComposeEmailActivity` مباشرة مع الصورة مرفقة.

---

### 24. تصريح متطلبات التطبيق (Device Compatibility)

#### النص الأصلي يقول (English):
> Declare app requirements. To prevent your app from being installed on devices that lack features needed by your app, it's important that you clearly define a profile for the types of devices your app supports by declaring device and software requirements in your manifest file. Most of these declarations are informational only. The system doesn't read them, but external services such as Google Play do read them to provide filtering for users when they search for apps from their device.

#### الترجمة الحرفية:
> تصريح متطلبات التطبيق. لمنع تثبيت تطبيقك على أجهزة تفتقر لميزات يحتاجها تطبيقك، من المهم أن تحدد بوضوح ملف تعريف لأنواع الأجهزة التي يدعمها تطبيقك عبر التصريح عن متطلبات العتاد والبرمجيات في ملف manifest الخاص بك. معظم هذه التصريحات إخبارية (informational) فقط. لا يقرأها النظام نفسه، لكن خدمات خارجية مثل Google Play تقرأها لتوفير تصفية (filtering) للمستخدمين عند بحثهم عن تطبيقات من أجهزتهم.

#### الشرح المبسّط:
نقطة مهمة جداً قد تُفهَم خطأً: هذه التصريحات لا يستخدمها نظام أندرويد نفسه على الجهاز أثناء التشغيل، بل تُستخدَم من قِبل متجر Google Play قبل حتى وصول التطبيق للجهاز — أي أن الجهاز الذي لا يملك كاميرا لن "يرى" تطبيقك أصلاً في نتائج البحث على المتجر إن كنت قد صرّحت أن الكاميرا مطلوبة (required). هذا يختلف عن الأذونات (permissions) التي شرحناها سابقاً في الفقرة 20 والتي يتحقق منها الجهاز فعلياً وقت التشغيل. هذا الفرق مهم: الأذونات = تحقق وقت التشغيل، متطلبات الأجهزة (uses-feature) = تصفية وقت التثبيت من المتجر. التشبيه اليومي: هذا يشبه إعلان وظيفة يشترط "خبرة قيادة" — لن تظهر الوظيفة أصلاً لمن لا يملك رخصة قيادة في نتائج بحثه (تصفية عند البحث في المتجر)، وهذا مختلف عن التحقق الفعلي من الرخصة يوم أول العمل (permission check وقت التشغيل).

**لماذا؟** لأن تثبيت تطبيق على جهاز لا يملك الميزات اللازمة (كالكاميرا) سيؤدي لتعطّل التطبيق أو تجربة سيئة، فمن الأفضل منع ظهوره أصلاً لهؤلاء المستخدمين بدلاً من السماح بالتثبيت ثم الفشل لاحقاً.

---

### 25. مثال عملي: متطلب الكاميرا وmin/target SDK

#### النص الأصلي يقول (English):
> Example: Suppose your app requires a camera and uses APIs introduced in Android 8.0 (API level 26). You must declare these requirements. The values for minSdk and targetSdk are set in app module's build.gradle file. You declare the camera feature in your app's manifest file. With the declarations shown in these examples, devices that do not have a camera or have an Android version lower than 8.0 can't install your app from Google Play. You can also declare that your app uses the camera, but does not require it. To do so, you set the required attribute to false, check at runtime whether the device has a camera, and disable any camera features as needed.

#### الترجمة الحرفية:
> مثال: افترض أن تطبيقك يتطلب كاميرا ويستخدم واجهات برمجية (APIs) قُدِّمت في أندرويد 8.0 (مستوى API رقم 26). يجب أن تصرّح عن هذه المتطلبات. تُضبَط قيم `minSdk` و`targetSdk` في ملف `build.gradle` الخاص بوحدة التطبيق (app module). تصرّح عن ميزة الكاميرا في ملف manifest تطبيقك. مع التصريحات الموضحة في هذه الأمثلة، لا تستطيع الأجهزة التي لا تملك كاميرا أو التي لديها إصدار أندرويد أقل من 8.0 تثبيت تطبيقك من Google Play. يمكنك أيضاً التصريح بأن تطبيقك يستخدم الكاميرا، لكن لا يتطلبها. للقيام بذلك، تضبط الخاصية `required` على `false`، وتتحقق وقت التشغيل مما إذا كان الجهاز يملك كاميرا، وتعطّل أي ميزات كاميرا حسب الحاجة.

#### الشرح المبسّط:
هذه الفقرة تجمع مفهومين معاً: تحديد أقل إصدار أندرويد مدعوم (`minSdk`) وأحدث إصدار مُختبَر عليه التطبيق (`targetSdk`)، وهذان يُضبَطان في ملف مختلف تماماً هو `build.gradle` (وليس الـ Manifest مباشرة، وهذه نقطة تفصيلية دقيقة يجب الانتباه لها). أما متطلب الكاميرا فيُصرَّح في الـ Manifest نفسه عبر `<uses-feature>`. النقطة الأهم عملياً هي المرونة التي يوفرها attribute اسمه `required`: إن ضبطته `true` (الافتراضي)، فأي جهاز بلا كاميرا لن يستطيع حتى رؤية تطبيقك في المتجر؛ لكن إن ضبطته `false`، سيظهر التطبيق للجميع، لكن يقع على عاتق المطور مسؤولية التحقق برمجياً (وقت التشغيل) من وجود الكاميرا فعلياً قبل استخدامها، وتعطيل الميزات المرتبطة بها إن لم تكن موجودة. التشبيه اليومي: `required="true"` يشبه اشتراط "يُمنع الدخول بدون سيارة" على مدخل موقف سيارات (لا يدخل من الأساس من لا يملكها)، بينما `required="false"` يشبه "يمكن الدخول للجميع، لكن من لا يملك سيارة لن يستطيع استخدام خدمة صف السيارات تحديداً" — الدخول متاح، لكن ميزة معينة تُعطَّل حسب الحالة.

**لماذا؟** هذه المرونة تسمح للتطبيقات التي تستخدم ميزة اختيارية (كالكاميرا في تطبيق ملاحظات مثلاً) بالوصول لأكبر عدد ممكن من المستخدمين، بدلاً من استبعاد كل من لا يملك تلك الميزة رغم أنها ليست جوهرية لعمل التطبيق.

#### 💻 الكود: تصريح متطلبات العتاد وإصدارات SDK

#### ما هذا الكود؟
> مثالان من المحاضرة: الأول لضبط `minSdk` و`targetSdk` في `build.gradle`، والثاني لتصريح ميزة الكاميرا في `AndroidManifest.xml`.

```gradle
// build.gradle (Module :app) — defines SDK version constraints
android {
    // ... other config
    defaultConfig {
        // ... other config
        minSdk = 26      // lowest Android version (API 26 = Android 8.0) that can install this app
        targetSdk = 29    // Android version this app is tested and optimized for
    }
}
```

```xml
<!-- AndroidManifest.xml — declares camera as a mandatory hardware requirement -->
<manifest ... >
<uses-feature android:name="android.hardware.camera.any"
android:required="true" />
...
</manifest>
```

#### شرح كل سطر:
1. `minSdk = 26` → أقل إصدار أندرويد يمكن تثبيت التطبيق عليه؛ أي جهاز بإصدار أقل من API 26 (أندرويد 8.0) لن يستطيع تثبيت التطبيق من المتجر.
2. `targetSdk = 29` → الإصدار الذي اختُبر التطبيق عليه وحُسِّن له سلوكياً؛ يخبر النظام أن يتعامل مع التطبيق وفق سلوكيات هذا الإصدار تحديداً.
3. `<uses-feature android:name="android.hardware.camera.any" android:required="true" />` → يصرّح أن التطبيق يتطلب أي نوع كاميرا (أمامية أو خلفية)، و`required="true"` تمنع ظهور التطبيق في المتجر للأجهزة بلا كاميرا إطلاقاً.

**الناتج المتوقع:**
> جهاز بإصدار أندرويد 7 (API 24) أو جهاز بلا كاميرا على الإطلاق لن يجد هذا التطبيق ضمن نتائج البحث في متجر Google Play.

---

### 26. موارد التطبيق — الأنواع والمفهوم العام

#### النص الأصلي يقول (English):
> An Android app is composed of more than just code. It requires resources that are separate from the source code, such as images, audio files, and anything relating to the visual presentation of the app. While Jetpack Compose defines the UI structure programmatically, the app still relies on external resources for assets that remain separate from the logic. Static Assets: Includes images (Drawables), strings, fonts, and raw files (audio/video). Declarative UI: Unlike the View system, layouts, themes, and animations are now defined as @Composable functions in Kotlin code rather than XML files. For every resource in the res/ directory, the Android SDK build tools generate a unique integer ID within the R class. Referencing: In Compose, resources are accessed through type-safe functions like stringResource(R.string.name) or painterResource(R.drawable.logo).

#### الترجمة الحرفية:
> يتكوّن تطبيق أندرويد من أكثر من مجرد كود. يحتاج موارد منفصلة عن الكود المصدري، مثل الصور وملفات الصوت وأي شيء متعلق بالعرض البصري للتطبيق. بينما يعرّف Jetpack Compose بنية واجهة المستخدم برمجياً، ما زال التطبيق يعتمد على موارد خارجية للأصول (assets) التي تبقى منفصلة عن المنطق البرمجي. الأصول الثابتة (Static Assets): تشمل الصور (Drawables)، والنصوص (strings)، والخطوط (fonts)، والملفات الخام (raw files) (صوت/فيديو). واجهة المستخدم التصريحية (Declarative UI): على عكس نظام الـ View، تُعرَّف التخطيطات (layouts) والثيمات والحركات الآن كدوال `@Composable` في كود Kotlin بدلاً من ملفات XML. لكل مورد في مجلد `res/`، تُولّد أدوات بناء Android SDK معرّف عدد صحيح (integer ID) فريداً ضمن صنف `R`. المرجعية (Referencing): في Compose، يُصَل إلى الموارد عبر دوال آمنة النوع (type-safe) مثل `stringResource(R.string.name)` أو `painterResource(R.drawable.logo)`.

#### الشرح المبسّط:
هذه الفقرة تفرّق بين شيئين: "الكود" الذي يحدد منطق التطبيق، و"الموارد" (Resources) التي هي كل ما هو غير كود — صور، نصوص قابلة للترجمة، خطوط، ملفات صوت. النقطة التقنية المهمة هنا هي الفرق بين نظام Compose الحديث والنظام القديم: في النظام القديم (Views + XML layouts)، حتى شكل الواجهة نفسها (layout) كان يُكتب كملف XML منفصل، أما في Compose فبنية الواجهة أصبحت كوداً برمجياً مباشرة (دوال @Composable بلغة Kotlin)، لكن الأصول الأساسية (كالصور والنصوص) بقيت خارج الكود في مجلد `res/` كما كانت سابقاً. الآلية العملية للوصول لهذه الموارد تعتمد على أن كل مورد في `res/` يحصل تلقائياً على "رقم تعريف" فريد داخل صنف يُدعى `R` (يولّده النظام تلقائياً عند البناء)، ثم في Compose نستخدم دوال خاصة مثل `stringResource()` و`painterResource()` لجلب هذه الموارد بأمان (آمنة النوع، أي لا يمكنك غلطة استخدام رقم صورة كأنه نص). التشبيه اليومي: تخيل مطعماً — القائمة والوصفات (المنطق البرمجي/Kotlin code) شيء، والمكونات الفعلية في المخزن كالخضار واللحوم (الموارد في res/) شيء آخر تماماً؛ كل عنصر مخزون له رقم رف مرجعي محدد (R class ID) بحيث يستطيع الطباخ إحضاره بدقة دون خلط.

**لماذا؟** فصل الموارد عن الكود يسمح بتغيير شكل التطبيق (صور، ألوان، نصوص) دون لمس منطق البرمجة، ويجعل دعم اللغات المتعددة والثيمات المختلفة أسهل بكثير، كما سنرى في الفقرة التالية.

---

### 27. موارد بديلة حسب إعدادات الجهاز (Resource Qualifiers)

#### النص الأصلي يقول (English):
> One of Android's core strengths is the ability to provide alternative resources tailored to specific device configurations without modifying the logic. Resource Qualifiers: By appending qualifiers to directory names (e.g., res/values-ar/ for Arabic or res/values-night/ for Dark Mode), the system automatically selects the resource that matches the user's current configuration. Modern Adaptability: While localization still relies on XML qualifiers (Strings), UI responsiveness to screen sizes or orientations in Compose is primarily handled programmatic approaches such as Window Size Classes and state-driven layouts, ensuring a more fluid adaptive experience compared to layout-qualifiers (like layout-land).

#### الترجمة الحرفية:
> إحدى نقاط القوة الأساسية في أندرويد هي القدرة على توفير موارد بديلة مصمَّمة خصيصاً لإعدادات جهاز معينة دون تعديل المنطق البرمجي. مؤهِّلات الموارد (Resource Qualifiers): عبر إضافة مؤهِّلات لأسماء المجلدات (مثل `res/values-ar/` للعربية أو `res/values-night/` للوضع الليلي)، يختار النظام تلقائياً المورد الذي يطابق إعدادات المستخدم الحالية. التكيف الحديث (Modern Adaptability): بينما لا يزال التوطين (localization) يعتمد على مؤهِّلات XML (للنصوص)، تُعالَج استجابة واجهة المستخدم لأحجام الشاشات أو الاتجاهات في Compose بشكل أساسي عبر مقاربات برمجية مثل Window Size Classes وتخطيطات مبنية على الحالة (state-driven layouts)، مما يضمن تجربة تكيّف أكثر سلاسة مقارنة بمؤهِّلات التخطيط (مثل layout-land).

#### الشرح المبسّط:
هذه الفقرة تبني مباشرة على الفقرة السابقة حول مجلد `res/`، وتشرح ميزة قوية جداً: يمكنك إنشاء عدة نسخ من نفس المورد (مثل ملف النصوص) لكن في مجلدات بأسماء مختلفة تحمل "مؤهِّلاً" (qualifier) يصف الحالة التي يُستخدَم فيها — مثل `-ar` للعربية أو `-night` للوضع الليلي — والنظام نفسه، دون أي كود إضافي منك، يختار تلقائياً المجلد الصحيح حسب لغة الجهاز أو إعدادات الإضاءة الحالية. هذا يعني أن الكود يبقى موحداً تماماً (تستدعي `stringResource(R.string.welcome)` دائماً بنفس الطريقة)، لكن القيمة الفعلية التي تظهر تتغير تلقائياً حسب الجهاز. من المهم ملاحظة نقطة تحديثية هنا: بينما ما زالت الترجمة (النصوص) تعتمد هذا النظام القديم بمجلدات، فإن التكيف مع أحجام الشاشات المختلفة في التطبيقات الحديثة (Compose) أصبح يُدار برمجياً مباشرة (Window Size Classes) بدلاً من مجلدات layout منفصلة كما كان سابقاً. التشبيه اليومي: تخيل قائمة طعام في مطعم دولي — نفس "اسم" كل طبق في نظام الطلب الداخلي (الكود لا يتغير)، لكن الورقة المطبوعة التي تصل للزبون تُطبع تلقائياً بالعربية إن كان الزبون يفضّل العربية، وبالإنجليزية لغيره (اختيار الموارد تلقائياً حسب إعداد الزبون/الجهاز) دون أن يغيّر الطباخ وصفته أبداً.

**لماذا؟** هذا النظام يفصل تماماً بين "ماذا يفعل التطبيق" (المنطق الثابت) و"كيف يبدو حسب من يستخدمه ومتى" (الموارد المتغيرة)، مما يجعل دعم لغات وأحجام شاشات وأوضاع إضاءة متعددة أمراً سهلاً جداً دون تعقيد الكود بشروط `if` لا نهاية لها.

#### 💡 التشبيه:
> نظام الـ Resource Qualifiers يشبه مقبس كهرباء عالمي (Kotlin/Compose code) يقبل قابساً واحداً موحداً، بينما المحوّل (adapter) الذي تضعه يتغير حسب البلد الذي أنت فيه (qualifier) — نفس الجهاز يعمل، لكن طريقة التوصيل تتكيف تلقائياً.
> **وجه الشبه:** الكود الثابت (المقبس) = القابس الموحد، الموارد المختلفة حسب qualifier = المحوّلات المتعددة حسب البلد.

---

### 28. مثال GreetingCard App — كود MainActivity.kt

#### النص الأصلي يقول (English):
> GreetingCard App — MainActivity.kt: class MainActivity : ComponentActivity() { override fun onCreate(savedInstanceState: Bundle?) { super.onCreate(savedInstanceState) setContent { GreetingcardTheme { Surface( modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background ) { Greeting(name = "Android") } } } } } @Composable fun Greeting(name: String, modifier: Modifier = Modifier) { Text( text = "Hello $name!", modifier = modifier ) }

#### الترجمة الحرفية:
> تطبيق GreetingCard — ملف MainActivity.kt: صنف `MainActivity` يرث من `ComponentActivity()` — دالة `onCreate` المُتجاوَزة (override) تستقبل `savedInstanceState` من نوع `Bundle?` — تستدعي الدالة الأصلية عبر `super.onCreate` — ثم تستدعي `setContent` وبداخلها ثيم `GreetingcardTheme` يحوي `Surface` بخاصية `modifier` تملأ الشاشة كاملة ولون خلفية من ثيم المواد (MaterialTheme) — وبداخل الـ Surface دالة `Greeting` بمعامل `name = "Android"`. دالة `Greeting` القابلة للتأليف (Composable) تستقبل `name` من نوع نص و`modifier` اختياري، وتعرض نصاً "Hello" متبوعاً باسم المستخدَم.

#### الشرح المبسّط:
هذا المثال العملي يجسّد كل ما شرحناه نظرياً عن `Activity` (الفقرات 6-8): لاحظ أن `MainActivity` يرث من `ComponentActivity()` — هذا هو التطبيق الفعلي لما قلناه سابقاً "الـ Activity يُنفَّذ كصنف فرعي من صنف Activity". دالة `onCreate` هي أول دالة تُستدعى عندما يبدأ النظام هذا النشاط (سنتعمق في دورة حياة Activity الكاملة onCreate/onStart/onResume في محاضرة قادمة، لكن onCreate هي نقطة الانطلاق التي "يستدعيها" النظام عندما يقرر تشغيل هذا الـ Activity وفق ما شرحناه في الفقرات 17-19 عن Intent وdوال التفعيل). الدالة `setContent` هي الجسر بين نظام Activity التقليدي وJetpack Compose — بداخلها تُكتب واجهة المستخدم كدوال Composable (كما شرحنا في الفقرة 26 عن Declarative UI). لاحظ أيضاً `Greeting(name = "Android")`: هذا مثال بسيط جداً على مفهوم "single-activity architecture" (الفقرة 8) — Activity واحدة فقط (MainActivity)، والمحتوى الفعلي يُدار عبر دوال Composable بداخلها. التشبيه اليومي: `MainActivity` هو "المبنى" الذي يفتحه النظام (onCreate = فتح الأبواب لأول مرة)، و`setContent` هو تأثيث المبنى من الداخل بالكامل دفعة واحدة، ودالة `Greeting` هي لافتة ترحيب مكتوب عليها اسم الزائر تلقائياً.

**لماذا؟** فهم هذا المثال يربط النظرية بالتطبيق: بدون تصريح `MainActivity` هذا في الـ Manifest (كما سنرى في الفقرة القادمة)، لن يستطيع النظام معرفة وجوده أبداً مهما كان هذا الكود صحيحاً 100%.

#### 💻 الكود: GreetingCard App — MainActivity.kt

#### ما هذا الكود؟
> أبسط تطبيق Compose ممكن: نشاط واحد يعرض رسالة ترحيب "Hello Android!" على الشاشة باستخدام الثيم الافتراضي للتطبيق.

```kotlin
// MainActivity is the single entry-point Activity, inheriting from ComponentActivity
class MainActivity : ComponentActivity() {
    // onCreate is called once when the system first creates this Activity
    override fun onCreate(savedInstanceState: Bundle?) {
        // must call the parent implementation first
        super.onCreate(savedInstanceState)
        // setContent bridges the Activity system with Jetpack Compose UI
        setContent {
            // apply the app's custom theme to everything inside
            GreetingcardTheme {
                // Surface provides a background container filling the whole screen
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // call our custom Composable, passing "Android" as the name
                    Greeting(name = "Android")
                }
            }
        }
    }
}

// A reusable Composable function that displays a greeting text
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

#### شرح كل سطر:
1. `class MainActivity : ComponentActivity()` → يعرّف صنف MainActivity كصنف فرعي من `ComponentActivity`، وهو الصنف الأساسي الحديث لأي Activity يستخدم Compose.
2. `override fun onCreate(savedInstanceState: Bundle?)` → يتجاوز (override) الدالة التي يستدعيها النظام عند إنشاء الـ Activity لأول مرة؛ `Bundle?` قد يحمل حالة محفوظة سابقاً (كما شرحنا في الفقرة 7 عن استعادة الحالة).
3. `super.onCreate(savedInstanceState)` → استدعاء إلزامي لتنفيذ منطق الإعداد الأساسي في الصنف الأب قبل أي كود إضافي.
4. `setContent { ... }` → دالة خاصة بـ Compose تحدد كل واجهة المستخدم الخاصة بهذا الـ Activity برمجياً.
5. `GreetingcardTheme { ... }` → دالة Composable مخصصة (مُولَّدة تلقائياً باسم المشروع) تطبّق الألوان والخطوط الموحدة على كل ما بداخلها.
6. `Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background)` → حاوية أساسية تملأ الشاشة بالكامل (`fillMaxSize`) بلون خلفية موحّد من الثيم.
7. `Greeting(name = "Android")` → استدعاء الدالة المخصصة بتمرير القيمة "Android" لمعامل `name`.
8. `@Composable fun Greeting(name: String, modifier: Modifier = Modifier)` → تعريف دالة قابلة للتأليف تستقبل نصاً واسم المعدِّل (modifier) اختيارياً بقيمة افتراضية فارغة.
9. `Text(text = "Hello $name!", modifier = modifier)` → يعرض نص "Hello" متبوعاً بقيمة `name` (هنا: "Android") باستخدام Template String في Kotlin (`$name`).

**المكتبات المطلوبة (Imports):**
> `import androidx.activity.ComponentActivity`، `import androidx.activity.compose.setContent`، `import androidx.compose.material3.Surface`، `import androidx.compose.material3.Text`، `import androidx.compose.material3.MaterialTheme`، `import androidx.compose.ui.Modifier`

**الناتج المتوقع (لقطة الشاشة):**
> شاشة بيضاء (أو حسب ثيم التطبيق) تحمل نصاً واحداً في الأعلى مكتوباً "Hello Android!"

---

### 29. توقيعات الدوال الأساسية في Compose

#### النص الأصلي يقول (English):
> App Resources — Function Signatures in Jetpack Compose: public fun ComponentActivity.setContent( parent: CompositionContext? = null, content: @Composable () -> Unit): Unit. @Composable public fun GreetingcardTheme(darkTheme: Boolean = isSystemInDarkTheme(), dynamicColor: Boolean = true, content: @Composable () -> Unit): Unit. @Composable public fun Surface( modifier: Modifier = Modifier, shape: Shape = RectangleShape, color: Color = MaterialTheme.colorScheme.surface, contentColor: Color = contentColorFor(color), tonalElevation: Dp = 0.dp, shadowElevation: Dp = 0.dp, border: BorderStroke? = null, content: @Composable () -> Unit): Unit

#### الترجمة الحرفية:
> موارد التطبيق — توقيعات الدوال في Jetpack Compose: دالة عامة `setContent` على `ComponentActivity`، تستقبل `parent` من نوع `CompositionContext?` بقيمة افتراضية `null`، و`content` من نوع دالة Composable لا تُعيد شيئاً، وتُعيد هي نفسها `Unit`. دالة `GreetingcardTheme` المُعلَّمة بـ `@Composable`، تستقبل `darkTheme` من نوع Boolean بقيمة افتراضية تساوي نتيجة `isSystemInDarkTheme()`، و`dynamicColor` من نوع Boolean بقيمة افتراضية `true`، و`content` من نوع دالة Composable، وتُعيد `Unit`. دالة `Surface` المُعلَّمة بـ `@Composable`، تستقبل `modifier` بقيمة افتراضية `Modifier`، و`shape` بقيمة افتراضية `RectangleShape`، و`color` بقيمة افتراضية من ثيم المواد، و`contentColor` محسوبة تلقائياً من اللون، و`tonalElevation` و`shadowElevation` من نوع Dp بقيمة افتراضية صفر، و`border` اختياري بقيمة `null`، و`content`، وتُعيد `Unit`.

#### الشرح المبسّط:
هذه الفقرة تقدّم (شرح زيادة للفهم) عبر عرض التواقيع الكاملة للدوال الثلاث المستخدَمة في مثال الكود السابق (الفقرة 28)، وهذا يفيد الطالب لفهم "ماذا يستطيع" تمرير لكل دالة بخلاف الاستخدام الافتراضي البسيط. لاحظ نمطاً متكرراً في Compose: كل معامل تقريباً له "قيمة افتراضية" (default value) — مثل `modifier: Modifier = Modifier` أو `darkTheme: Boolean = isSystemInDarkTheme()` — وهذا يعني أنك لست مضطراً لتمرير كل شيء يدوياً؛ فمثلاً `GreetingcardTheme` تتحقق تلقائياً إن كان النظام في الوضع الليلي دون أن تكتب أي كود إضافي. أيضاً لاحظ أن الدالتين `GreetingcardTheme` و`Surface` كلاهما يستقبلان معامل أخير من نوع `content: @Composable () -> Unit` — وهذا هو النمط الذي يسمح "بتغليف" (wrapping) عناصر أخرى بداخلهما (كما رأينا `Surface` يغلّف `Greeting` في المثال). التشبيه اليومي: تخيل نموذج طلب مطعم إلكتروني فيه حقول كثيرة، لكن معظمها مُعبّأ مسبقاً بقيم افتراضية معقولة (الحجم متوسط، بدون إضافات) — يمكنك تركها كما هي أو تغيير أي حقل تريده فقط، دون الحاجة لتعبئة النموذج بأكمله من الصفر في كل مرة.

**لماذا؟** استخدام القيم الافتراضية (default parameters) في Kotlin يجعل دوال Compose مرنة جداً وسهلة الاستخدام لحالات بسيطة، بينما تبقى قابلة للتخصيص الكامل عند الحاجة لسيناريوهات أكثر تعقيداً.

---

### 30. مثال GreetingCard App — AndroidManifest.xml الكامل

#### النص الأصلي يقول (English):
> GreetingCard App — AndroidManifest.xml: <application android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:theme="@style/Theme.GreetingCard" tools:targetApi="31"> <activity android:name=".MainActivity" android:exported="true" android:label="@string/app_name" android:theme="@style/Theme.GreetingCard"> <intent-filter> <action android:name="android.intent.action.MAIN" /> <category android:name="android.intent.category.LAUNCHER" /> </intent-filter> </activity> </application>

#### الترجمة الحرفية:
> تطبيق GreetingCard — AndroidManifest.xml: عنصر `<application>` بخاصية أيقونة `@mipmap/ic_launcher`، وتسمية `@string/app_name`، وثيم `@style/Theme.GreetingCard`، وخاصية أدوات `targetApi="31"`. بداخله `<activity>` باسم `.MainActivity`، مُصدَّر (exported) بقيمة `true`، بتسمية `@string/app_name`، وبنفس الثيم `@style/Theme.GreetingCard`. بداخله `<intent-filter>` يحمل إجراء `MAIN` وفئة `LAUNCHER`.

#### الشرح المبسّط:
هذا هو الجزء الأخير الذي يُكمِل مثال GreetingCard الذي بدأناه في الفقرة 28 — الآن نرى كيف يُصرَّح عن `MainActivity` رسمياً في الـ Manifest، وهذا تطبيق حرفي ومباشر لكل ما شرحناه في الفقرة 21 عن تصريح Activity. لاحظ التطابق الكامل بين اسم الصنف في الكود (`class MainActivity`) واسمه في الـ Manifest (`android:name=".MainActivity"`) — هذا هو "الرابط" الذي يجعل النظام قادراً على ربط تصريح XML بالكود الفعلي وتشغيله. أيضاً نلاحظ خاصية جديدة لم نشرحها بعد بالتفصيل: `android:theme="@style/Theme.GreetingCard"` تُطبَّق على مستويين (على `<application>` كإعداد عام، وعلى `<activity>` تحديداً)، وهذا يسمح بتخصيص ثيم مختلف لكل Activity لو أردت ذلك مستقبلاً رغم أن هذا المثال يستخدم نفس الثيم في الموضعين. أما `tools:targetApi="31"` فهو تلميح لأدوات التحقق (linter) في أستوديو أندرويد بأن هذا الجزء من الكود مُختبَر ومتوافق حتى API 31 تحديداً. التشبيه اليومي: هذا الملف هو "شهادة الميلاد الرسمية" لتطبيق GreetingCard — يربط الاسم القانوني (MainActivity في الكود) بالمظهر الخارجي (الأيقونة والثيم) ويعلن رسمياً أن هذا هو "الباب الرئيسي" (MAIN + LAUNCHER) الذي يجب أن يظهر في قائمة تطبيقات الجهاز.

**لماذا؟** بدون هذا التطابق الدقيق بين اسم الصنف في الكود واسمه في الـ Manifest، سيفشل التطبيق عند التشغيل بخطأ "ActivityNotFoundException" رغم أن الكود نفسه صحيح تماماً — وهذا خطأ شائع جداً يقع فيه المبتدئون.

#### 💻 الكود: GreetingCard App — AndroidManifest.xml

#### ما هذا الكود؟
> ملف الـ Manifest الكامل لتطبيق GreetingCard، يصرّح رسمياً عن `MainActivity` كنقطة الدخول الوحيدة للتطبيق.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools">
<application
android:icon="@mipmap/ic_launcher"
android:label="@string/app_name"
android:theme="@style/Theme.GreetingCard"
tools:targetApi="31">
<activity
android:name=".MainActivity"
android:exported="true"
android:label="@string/app_name"
android:theme="@style/Theme.GreetingCard">
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
</activity>
</application>
</manifest>
```

#### شرح كل سطر:
1. `android:theme="@style/Theme.GreetingCard"` (على `<application>`) → يحدد الثيم الافتراضي المطبَّق على كامل التطبيق ما لم يُخصَّص ثيم مختلف على مستوى Activity محدد.
2. `tools:targetApi="31"` → تعليمة لأدوات فحص الكود (لا تؤثر على وقت التشغيل الفعلي) تخبرها أن هذا الجزء متوافق مع API 31 لمنع تحذيرات خاطئة.
3. `android:name=".MainActivity"` → يربط هذا التصريح بصنف Kotlin الفعلي `MainActivity` الذي رأيناه في الفقرة 28.
4. `android:theme="@style/Theme.GreetingCard"` (على `<activity>`) → يمكن تخصيص ثيم مختلف لهذا الـ Activity تحديداً؛ هنا هو نفس ثيم التطبيق العام.
5. `<intent-filter>` مع `MAIN` و`LAUNCHER` → كما شرحنا بالتفصيل في الفقرة 21، يجعل هذا الـ Activity هو نقطة الإطلاق الرئيسية الظاهرة في قائمة تطبيقات الجهاز.

**الناتج المتوقع (لقطة الشاشة):**
> عند تثبيت التطبيق، تظهر أيقونة "GreetingCard" في قائمة تطبيقات الجهاز، وعند فتحها تظهر شاشة بيضاء مكتوب عليها "Hello Android!" كما رأينا في مخرجات الفقرة 28.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `APK` | ملف أرشيف قابل للتثبيت مباشرة على جهاز أندرويد | `.apk` |
| `AAB` | صيغة نشر تحتوي كل الموارد، يُولَّد منها APK مخصص لكل جهاز | `.aab`، لا يُثبَّت مباشرة |
| `Sandbox` | عزل أمني لكل تطبيق في عملية Linux ومعرّف مستخدم خاص | كل تطبيق = مستخدم لينكس منفصل |
| `Activity` | مكوّن يمثّل شاشة واحدة للتفاعل مع المستخدم | `MainActivity` |
| `Service` | مكوّن يعمل بالخلفية بدون واجهة مستخدم | تشغيل موسيقى |
| `Broadcast Receiver` | مكوّن يستقبل أحداث/بثوث من النظام أو التطبيقات | بطارية منخفضة |
| `Content Provider` | مكوّن لمشاركة/إدارة بيانات منظمة عبر URI | جهات الاتصال |
| `Intent` | رسالة غير متزامنة تُفعّل Activity/Service/Broadcast Receiver | Explicit / Implicit |
| `Intent Filter` | إعلان في الـ Manifest عن قدرات مكوّن للاستجابة لـ Intents ضمنية | `<intent-filter>` |
| `ContentResolver` | الوسيط الذي يفعّل Content Provider (بدلاً من Intent) | `query()` |
| `AndroidManifest.xml` | ملف بيان يعرّف كل مكوّنات التطبيق وأذوناته ومتطلباته | جذر المشروع |
| `Resource Qualifier` | لاحقة على اسم مجلد `res/` تخصص المورد لحالة جهاز معينة | `values-ar/`، `values-night/` |
| `R class` | صنف يُولَّد تلقائياً يحمل معرّفات كل الموارد | `R.string.app_name` |

### المكوّنات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Activity` | شاشة تفاعلية واحدة | يرث من `Activity`/`ComponentActivity` |
| `Service` (Started) | عمل خلفي مستقل حتى الانتهاء | Foreground أو Background |
| `Service` (Bound) | عمل خلفي مرتبط بوجود عميل متصل | ينتهي عند فك كل الارتباطات |
| `BroadcastReceiver` | استجابة سريعة لحدث | يجب أن يكون خفيفاً جداً |
| `ContentProvider` | نشر بيانات منظمة عبر URI | يرث من `ContentProvider` |
| `JobScheduler` / `WorkManager` | بدائل حديثة لجدولة عمل خلفي | مفضّلة على Service التقليدية |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| APK مقابل AAB | APK | AAB | APK قابل للتثبيت مباشرة، AAB صيغة نشر فقط يُولَّد منها APK مخصص |
| Started Service مقابل Bound Service | Started | Bound | Started يعمل باستقلالية حتى الانتهاء، Bound يعمل فقط طالما مكوّن آخر مرتبط به |
| Explicit Intent مقابل Implicit Intent | Explicit | Implicit | Explicit يحدد الصنف بالاسم مباشرة، Implicit يصف الإجراء ويترك النظام يختار المكوّن |
| Foreground Service مقابل Background Service | Foreground | Background | Foreground يظهر إشعاراً وله أولوية حماية عالية، Background خفي وقابل للإيقاف بحرية أكبر |
| minSdk مقابل uses-feature required | minSdk | uses-feature | minSdk يحدد أقل إصدار أندرويد، uses-feature يحدد عتاداً مطلوباً كالكاميرا |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| مكوّنات التطبيق | `Activity`، `Service`، `Broadcast Receiver`، `Content Provider` |
| ملفات المشروع | `AndroidManifest.xml`، `build.gradle`، `res/` |
| Compose | `@Composable`، `setContent`، `Surface`، `Modifier`، `MaterialTheme` |
| الأمان والصلاحيات | `Sandbox`، `Linux user ID`، `permissions`، `principle of least privilege` |
| التفعيل | `Intent`، `Intent Filter`، `startActivity()`، `startService()`، `sendBroadcast()`، `query()` |

### أبرز النقاط الذهبية
1. أي مكوّن (عدا Broadcast Receiver الديناميكي) **يجب** أن يُصرَّح في الـ Manifest وإلا فهو غير موجود من منظور النظام.
2. لا يوجد `main()` في أندرويد؛ أي مكوّن يمكن أن يكون نقطة دخول حسب طريقة تفعيله.
3. `Content Provider` هو الوحيد الذي يُفعَّل عبر `ContentResolver` وليس `Intent` مباشرة.
4. `Broadcast Receiver` يجب أن يكون خفيفاً جداً وسريعاً — يُحيل الأعمال الثقيلة لمكوّنات أخرى.
5. النمط الحديث يفضّل `single-activity architecture` مع `Navigation`، و`Coroutines`/`WorkManager` بدل Services التقليدية.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| الظن أن AAB يمكن تثبيته مباشرة على جهاز | AAB صيغة نشر فقط؛ يُولَّد منه APK للتثبيت الفعلي |
| نسيان تصريح Activity في الـ Manifest بعد كتابتها بالكود | أي Activity/Service/Provider غير مصرَّح عنها في Manifest لا تعمل أبداً |
| الخلط بين `minSdk` (في build.gradle) و`uses-feature` (في Manifest) | minSdk لإصدار النظام، uses-feature للعتاد المطلوب — ملفان مختلفان |
| استخدام Broadcast Receiver لأداء عمل ثقيل مباشرة بداخله | يجب تفويض العمل الثقيل لـ JobService/WorkManager عبر البث فقط كبوابة |
| الظن أن Content Provider يُستخدم فقط للمشاركة الخارجية | يُستخدم أيضاً كطريقة منظمة للتعامل مع بيانات خاصة بالتطبيق نفسه |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: تفعيل Activity عبر Implicit Intent
> ما هدفه؟ توضيح كيف يجد النظام مكوّناً مناسباً لتنفيذ إجراء دون تحديد اسم صريح.
```algorithm
1 | إنشاء Intent | المطوّر | تحديد الإجراء المطلوب (مثل ACTION_SEND) دون تحديد صنف معيّن
2 | استدعاء startActivity(intent) | التطبيق المُرسِل | تمرير الـ Intent إلى نظام أندرويد
3 | مطابقة الـ Intent Filters | نظام أندرويد | فحص كل التطبيقات المثبّتة بحثاً عن intent-filter مطابق
4 | عرض خيارات (إن وُجد أكثر من مطابقة) | النظام | إظهار مربع اختيار "افتح باستخدام..." للمستخدم
5 | تشغيل المكوّن المختار | النظام | بدء عملية التطبيق الهدف (إن لم تكن تعمل) وتنفيذ الـ Activity المطلوبة
```
#### نقاط التنفيذ:
- إن لم يوجد أي تطبيق يطابق الـ intent، يحدث استثناء `ActivityNotFoundException`.
- الفئة `DEFAULT` في intent-filter ضرورية ليكون المكوّن قابلاً للاكتشاف عبر implicit intents.

---

#### ⚙️ الخطوات / الخوارزمية: تصريح مكوّن جديد بشكل صحيح في مشروع أندرويد
> ما هدفه؟ ضمان أن أي مكوّن جديد (Activity/Service/Provider) يعمل فعلياً ولا يبقى "غير مرئي" للنظام.
```algorithm
1 | كتابة صنف Kotlin | المطوّر | إنشاء صنف يرث من Activity/Service/ContentProvider حسب النوع
2 | فتح AndroidManifest.xml | المطوّر | الانتقال إلى ملف البيان في جذر المشروع
3 | إضافة عنصر التصريح المناسب | المطوّر | استخدام <activity>/<service>/<provider> مع android:name مطابق تماماً لاسم الصنف
4 | إضافة intent-filter عند الحاجة | المطوّر | تحديد أي أنواع Intents يمكن لهذا المكوّن الاستجابة لها
5 | بناء المشروع والتحقق | أستوديو أندرويد | التأكد من عدم وجود أخطاء تطابق أسماء
```
#### نقاط التنفيذ:
- أي خطأ إملائي بسيط في `android:name` يجعل المكوّن غير قابل للعثور عليه رغم صحة الكود.
- Broadcast Receiver فقط يملك بديلاً: التسجيل الديناميكي عبر `registerReceiver()`.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| Activity بسيطة مع Compose | `class X : ComponentActivity() { override fun onCreate(...) { setContent { ... } } }` | أي شاشة جديدة تستخدم Compose |
| تصريح Activity رئيسية | `<activity>` مع `intent-filter` يحوي `MAIN` و`LAUNCHER` | نقطة إطلاق التطبيق فقط (واحدة عادة) |
| تصريح ميزة عتاد مطلوبة | `<uses-feature android:name="..." android:required="true/false" />` | عند اعتماد التطبيق على عتاد معيّن كالكاميرا |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| عمل خفيف عند حدث نظام (كبطارية منخفضة) | استخدام Broadcast Receiver | نقطة دخول خفيفة مصممة لهذا الغرض تحديداً |
| عمل طويل الأمد يجب أن يستمر بعد إغلاق الشاشة | استخدام Service (أو WorkManager للحالات الحديثة) | Activity تتوقف عند مغادرة الشاشة، لكن Service/WorkManager يستمران |
| مشاركة بيانات مع تطبيقات أخرى بأمان | استخدام Content Provider مع أذونات محددة | يمنح تحكماً دقيقاً بمن يقرأ/يكتب البيانات عبر URI |

### الأفكار الرئيسية الشاملة
الفكرة المحورية لكامل هذه المحاضرة هي أن تطبيق أندرويد ليس برنامجاً متسلسلاً واحداً، بل مجموعة مكوّنات مستقلة (Activity، Service، Broadcast Receiver، Content Provider) يعرّفها جميعاً ملف `AndroidManifest.xml`، ويربط بينها نظام رسائل (`Intent`) يمر عبر النظام نفسه كوسيط موثوق يحافظ على عزل كل تطبيق (`Sandbox`) عن الآخر.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. توزيع: مقارنات 25% | سيناريو كود 35% | تطبيق 40%.

### السؤال 1 (medium)
Which file format is used for publishing an app to Google Play but cannot be installed directly on a device?
أ) APK  ب) AAB  ج) JAR  د) DEX
**الإجابة الصحيحة: ب**
**التعليل:** الـ AAB هو صيغة نشر فقط يؤجل توليد وتوقيع الـ APK لمرحلة لاحقة على خوادم Google Play. أ خاطئ لأن APK هو الصيغة القابلة للتثبيت المباشر (وهو ناتج AAB وليس بديلاً له). ج ود غير مرتبطين بتوزيع تطبيقات أندرويد بهذا السياق.

---

### السؤال 2 (medium)
What mechanism protects one app's files from being accessed by another app by default?
أ) Firewall  ب) Unique Linux user ID per app  ج) Encryption key sharing  د) Root access restriction only
**الإجابة الصحيحة: ب**
**التعليل:** يخصص النظام معرّف مستخدم لينكس فريداً لكل تطبيق ويقيّد صلاحيات الملفات بناءً عليه. أ غير مذكور في المحاضرة كآلية أساسية. ج عكس المطلوب فعلياً. د جزئي وغير كافٍ لوحده كتفسير للـ sandbox.

---

### السؤال 3 (hard)
An app wants the user to take a photo using the device's camera app instead of building its own camera feature. In which process does the camera activity run once started?
أ) في عملية التطبيق الطالب نفسها  ب) في عملية تطبيق الكاميرا  ج) في عملية النظام (system_server)  د) لا يعمل في أي عملية حتى تنتهي المهمة
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح صراحة أن النشاط يعمل في العملية التابعة لتطبيق الكاميرا وليس تطبيقك. أ يخالف مبدأ الـ sandbox حيث لكل تطبيق عمليته الخاصة. ج ود غير مذكورين في النص ولا يتفقان مع آلية عمل الأنشطة.

---

### السؤال 4 (medium)
Which of the following does NOT display a user interface?
أ) Activity  ب) Service  ج) كلاهما لا يعرضان واجهة  د) كلاهما يعرضان واجهة
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة أن Service لا توفّر واجهة مستخدم، بينما Activity هي نقطة الدخول للتفاعل المرئي مع المستخدم. أ خاطئ لأن Activity تعرض واجهة. ج ود يخالفان النص مباشرة.

---

### السؤال 5 (hard)
A music player app wants its playback service to survive even when the system needs RAM for other tasks. What should it declare itself as?
أ) Bound Service فقط  ب) Background Service  ج) Foreground Service مع إشعار  د) Broadcast Receiver
**الإجابة الصحيحة: ج**
**التعليل:** النص يوضح أن تشغيل الموسيقى يجب أن يُعلَن كـ foreground مع إشعار ليعطيه النظام أولوية أعلى في البقاء. أ لا يضمن الاستمرارية إذا لم يعد هناك مكوّن مرتبط. ب معرّض للإيقاف بحرية من النظام وهذا عكس المطلوب. د غير مصمم لتشغيل موسيقى مستمر.

---

### السؤال 6 (hard)
When does a bound service get destroyed according to the lecture?
أ) بعد مرور فترة زمنية ثابتة  ب) عندما يفك كل المكوّنات المرتبطة ارتباطها  ج) فقط عند إعادة تشغيل الجهاز  د) لا تُدمَّر أبداً تلقائياً
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة أن الخدمة المرتبطة تُدمَّر عندما يفك جميع المكوّنات المرتبطة بها ارتباطها. أ وج ود غير مذكورة في النص وتخالف الآلية الموصوفة.

---

### السؤال 7 (medium)
Why should a BroadcastReceiver avoid performing heavy work directly?
أ) لأنه لا يملك صلاحيات كافية أبداً  ب) لأنه مصمم كبوابة سريعة وقد يُعتبر متجمداً إذا استغرق وقتاً طويلاً  ج) لأن BroadcastReceiver لا يستطيع الوصول لـ Intent  د) لأنه يعمل فقط عندما يكون التطبيق مغلقاً
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن الـ Receiver يجب أن يقوم بأقل قدر من العمل ويستخدم كبوابة، لأن أداء عمل ثقيل مباشرة بداخله قد يعرضه لمخاطر التجمد. أ غير صحيح فقد تكون له صلاحيات. ج يناقض النص الذي يقول إن كل بث يصل كـ Intent. د غير دقيق فهو يعمل حتى مع التطبيق المفتوح.

---

### السؤال 8 (medium)
What uniquely activates a Content Provider, unlike the other three component types?
أ) Intent صريح فقط  ب) Intent ضمني فقط  ج) طلب من ContentResolver  د) BroadcastReceiver
**الإجابة الصحيحة: ج**
**التعليل:** النص يوضح صراحة أن Content Provider يُفعَّل عندما يُستهدَف بطلب من ContentResolver وليس عبر Intent كباقي المكوّنات. أ وب يخصان الأنشطة والخدمات ومستقبلات البث فقط. د غير منطقي لأنه مكوّن مختلف تماماً.

---

### السؤال 9 (hard)
Given the URI `content://com.example.app/users/1`, what does this most likely represent according to the lecture's example pattern?
أ) كل المستخدمين في التطبيق  ب) مستخدم واحد محدد برقم 1  ج) عنوان ويب خارجي  د) ملف صوتي مخزَّن محلياً
**الإجابة الصحيحة: ب**
**التعليل:** طبقاً لمثال المحاضرة، إضافة رقم محدد بعد `/users/` يشير إلى سجل واحد محدد، بينما `content://com.example.app/users` بدون رقم يمثل كل المستخدمين (خيار أ). ج ود لا علاقة لهما بصيغة content URI.

---

### السؤال 10 (medium)
Which method is used to start an activity when you expect a result to be returned?
أ) startActivity()  ب) startActivityForResult()  ج) startService()  د) sendBroadcast()
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة هذه الدالة تحديداً لحالة توقّع نتيجة عائدة من النشاط. أ تُستخدم للتشغيل العادي بدون انتظار نتيجة. ج ود تخصان مكوّنات مختلفة تماماً (الخدمات والبثوث).

---

### السؤال 11 (hard)
An app declares `<uses-feature android:name="android.hardware.camera.any" android:required="true" />` in its manifest. What happens on a device without a camera?
أ) يُثبَّت التطبيق لكن ميزات الكاميرا تُعطَّل تلقائياً  ب) لا يستطيع الجهاز تثبيت التطبيق من Google Play أصلاً  ج) يظهر خطأ وقت التشغيل فقط عند فتح الكاميرا  د) لا يوجد أي تأثير لأن minSdk هو المتحكم الوحيد
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح صراحة أن `required="true"` يمنع الأجهزة بلا الميزة المطلوبة من تثبيت التطبيق من المتجر أصلاً. أ يصف سلوك `required="false"` وليس `true`. ج ود يخالفان النص مباشرة.

---

### السؤال 12 (medium)
Where are `minSdk` and `targetSdk` values typically set?
أ) داخل AndroidManifest.xml مباشرة  ب) داخل ملف build.gradle الخاص بوحدة التطبيق  ج) داخل ملف strings.xml  د) لا تُضبَط، بل تُحدَّد تلقائياً من نظام التشغيل
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة أن هذه القيم تُضبَط في ملف build.gradle الخاص بوحدة app، وهذا يختلف عن متطلبات العتاد التي تُصرَّح في الـ Manifest. أ خطأ شائع يخلط بين الملفين. ج ود غير صحيحين إطلاقاً.

---

### السؤال 13 (medium)
In Compose, how are static string resources typically accessed?
أ) عبر ملف XML مباشرة داخل الكود  ب) عبر دالة type-safe مثل stringResource(R.string.name)  ج) عبر متغيرات عامة مباشرة بدون معرّفات  د) لا يمكن استخدام الموارد الثابتة مع Compose إطلاقاً
<br>
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح صراحة أن Compose يستخدم دوال آمنة النوع مثل `stringResource()` للوصول للموارد الثابتة عبر صنف R. أ يصف الأسلوب القديم غير المرتبط بـ Compose مباشرة. ج ود يخالفان النص الذي يؤكد استمرار استخدام الموارد الخارجية حتى مع Compose.

---

### السؤال 14 (hard)
An app has `res/values-ar/strings.xml` and `res/values/strings.xml`. On a device set to Arabic language, which file's strings will the system use automatically?
أ) values/strings.xml فقط دائماً  ب) values-ar/strings.xml تلقائياً بدون كود إضافي  ج) كلاهما معاً بدمج القيم  د) يتطلب كوداً إضافياً لاختيار المجلد يدوياً
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن النظام يختار تلقائياً المورد المطابق لإعدادات الجهاز الحالية عبر آلية qualifiers دون أي تدخل برمجي إضافي. أ يخالف الغرض الكامل من الميزة. ج ود يناقضان مبدأ "بدون تعديل المنطق" المذكور صراحة في النص.

---

### السؤال 15 (medium)
Which class must every Content Provider be a subclass of?
أ) ContentResolver  ب) ContentProvider  ج) BroadcastReceiver  د) Activity
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة أن مزوّد المحتوى يُنفَّذ كصنف فرعي من ContentProvider. أ هو الوسيط الذي يستخدمه المكوّنات الأخرى للتواصل مع Provider، وليس الصنف الأساسي له. ج ود يخصان مكوّنات مختلفة تماماً.

---

### السؤال 16 (hard)
In the GreetingCard manifest example, why must `android:name=".MainActivity"` exactly match the Kotlin class name?
أ) لأنه مجرد تعليق توضيحي ولا يؤثر على التشغيل  ب) لأن النظام يستخدم هذا الاسم لربط تصريح XML بالصنف الفعلي وتشغيله  ج) لأن Compose يتجاهل ملف Manifest كلياً  د) لأنه يحدد فقط أيقونة التطبيق
**الإجابة الصحيحة: ب**
**التعليل:** كما شُرح في القسم النظري، أي عدم تطابق بين اسم الصنف في الكود والتصريح في Manifest يؤدي لعدم قدرة النظام على إيجاد المكوّن أو تشغيله (ActivityNotFoundException). أ خاطئ تماماً فهذا الاسم أساسي للتشغيل الفعلي. ج يخالف حقيقة أن Manifest لا يزال ضرورياً حتى مع Compose. د يخلط بين android:name وandroid:icon وهما خاصيتان مختلفتان تماماً.

---

## الجزء الرابع: أسئلة تصحيح الكود

### Debug Question 1 (misconception)

**The following code contains a bug:**
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        setContent {
            Greeting(name = "Android")
        }
        super.onCreate(savedInstanceState)
    }
}
```
**Find the bug:** The order of `super.onCreate()` and `setContent()` calls is incorrect.

**Fixed code:**
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Greeting(name = "Android")
        }
    }
}
```
**شرح الحل:**
1. يجب استدعاء `super.onCreate()` دائماً أولاً قبل أي كود مخصص، لأنه يهيّئ حالة الـ Activity الأساسية التي يعتمد عليها كل ما يليها بما في ذلك `setContent`.
2. استدعاء `setContent` قبل `super.onCreate()` قد يسبب سلوكاً غير متوقع أو تعطلاً لأن الحالة الأساسية للـ Activity لم تُهيّأ بعد.

---

### Debug Question 2 (dead_code)

**The following code contains a bug:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name">
<activity android:name=".SecondActivity" android:label="Second Screen">
</activity>
</application>
</manifest>
```
**Find the bug:** SecondActivity is declared but has no `<intent-filter>` with MAIN/LAUNCHER, and there is no other activity declared as the entry point — the app will have no launchable entry.

**Fixed code:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name">
<activity android:name=".MainActivity" android:label="Main Screen">
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
</activity>
<activity android:name=".SecondActivity" android:label="Second Screen" />
</application>
</manifest>
```
**شرح الحل:**
1. أي تطبيق يحتاج على الأقل نشاطاً واحداً مصرَّحاً بـ intent-filter يحمل `MAIN` و`LAUNCHER` كي يظهر في قائمة تطبيقات الجهاز ويكون قابلاً للفتح من المستخدم.
2. `SecondActivity` يمكن أن تبقى بدون intent-filter لأنها ليست نقطة الدخول، لكن يجب وجود نشاط رئيسي واحد على الأقل يحمل هذا التصريح.

---

### Debug Question 3 (logic)

**The following code contains a bug:**
```xml
<activity android:name="MainActivity" android:exported="true">
```
**Find the bug:** Missing the leading dot before `MainActivity`, which can cause the system to fail resolving the class if MainActivity is in the app's base package.

**Fixed code:**
```xml
<activity android:name=".MainActivity" android:exported="true">
```
**شرح الحل:**
1. النقطة قبل اسم الصنف (`.MainActivity`) هي اختصار يعني "داخل الحزمة الأساسية (base package) المعرّفة في الملف"، وحذفها قد يؤدي لعدم إيجاد النظام للصنف إذا لم يُكتَب المسار الكامل بديلاً عنها.
2. الحل البديل الصحيح أيضاً هو كتابة الاسم الكامل المؤهَّل مثل `com.example.app.MainActivity` بدلاً من النقطة، لكن الأكثر شيوعاً واختصاراً هو استخدام النقطة.

---

### Debug Question 4 (syntax)

**The following code contains a bug:**
```kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!"
    modifier = modifier
    )
}
```
**Find the bug:** Missing comma after the `text` parameter, causing a syntax error.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```
**شرح الحل:**
1. في Kotlin، يجب فصل كل معامل مُسمّى (named argument) بفاصلة عن المعامل التالي، وغياب الفاصلة بعد `text = "Hello $name!"` يسبب خطأ ترجمة (compilation error) فوري.

---

### Debug Question 5 (return_check)

**The following code contains a bug:**
```kotlin
public fun ComponentActivity.setContent(
    parent: CompositionContext? = null,
    content: @Composable () -> Unit
): Boolean {
    // ...
}
```
**Find the bug:** The function signature from the lecture specifies `setContent` returns `Unit`, not `Boolean`.

**Fixed code:**
```kotlin
public fun ComponentActivity.setContent(
    parent: CompositionContext? = null,
    content: @Composable () -> Unit
): Unit {
    // ...
}
```
**شرح الحل:**
1. حسب توقيع الدالة الرسمي المذكور في المحاضرة، تُعيد `setContent` قيمة من نوع `Unit` (أي لا تُعيد قيمة فعلية ذات معنى)، وليس `Boolean`؛ تغيير نوع الإرجاع دون داعٍ يكسر التوافق مع أي كود يستدعي هذه الدالة متوقعاً `Unit`.

---

### Debug Question 6 (compilation)

**The following code contains a bug:**
```xml
<uses-feature android:name="android.hardware.camera.any"
android:required=true />
```
**Find the bug:** XML attribute values must be quoted strings; `true` without quotes will cause an XML parsing error.

**Fixed code:**
```xml
<uses-feature android:name="android.hardware.camera.any"
android:required="true" />
```
**شرح الحل:**
1. في XML، يجب أن تكون كل قيم الخصائص محاطة بعلامتَي اقتباس، حتى القيم البوليانية مثل `true`/`false`، وإغفال ذلك يسبب فشل تحليل (parsing) الملف بأكمله.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل** — ليست في المحاضرة الأصلية.

### Exercise 1: Choosing the Right Component — scenario

**Scenario / Task:**
You are building a weather app. It needs to: (a) show a screen with the current forecast, (b) download updated weather data every 3 hours even when the app is closed, (c) show a notification instantly when a severe weather alert is broadcast by the system, (d) let a widget app read the last-known temperature from your app.

**Requirements:**
1. Identify which of the four component types fits each of the four needs (a, b, c, d).
2. Justify each choice in one sentence.

**نموذج الحل:**
(a) `Activity` — لأنها شاشة تفاعلية يراها المستخدم لعرض توقعات الطقس. (b) `WorkManager` (البديل الحديث لـ Started Service) — لأنه عمل مجدول متكرر يجب أن يستمر حتى مع إغلاق التطبيق. (c) `Broadcast Receiver` — لأنه استجابة سريعة وخفيفة لحدث بث نظامي (تنبيه طقس). (d) `Content Provider` — لأنه يسمح لتطبيق آخر (الويدجت) بالاستعلام عن بيانات محددة (آخر درجة حرارة) بطريقة منظمة وآمنة.

---

### Exercise 2: Fix the Manifest — code_fix

**Scenario / Task:**
The following manifest snippet is meant to declare two activities, where `SettingsActivity` should be launchable directly by other apps that want to open settings, but currently nothing is exported and there's a naming mismatch.

```xml
<activity android:name=".Settings" android:exported="false" />
```
Assume the actual Kotlin class is named `SettingsActivity`.

**Requirements:**
1. Fix the class name mismatch.
2. Change the export setting so other apps can launch it directly.

**نموذج الحل:**
```xml
<activity android:name=".SettingsActivity" android:exported="true" />
```
تم تصحيح اسم الصنف ليطابق `SettingsActivity` الفعلي في الكود، وتغيير `android:exported` إلى `true` للسماح لتطبيقات أخرى بتشغيل هذا النشاط مباشرة، تماشياً مع مفهوم "أي تطبيق يمكنه تشغيل مكوّن تطبيق آخر" الذي شرحته المحاضرة.

---

### Exercise 3: Started vs Bound — fill_gaps

**Scenario / Task:**
Complete the missing terms in the following statements based on the lecture.

**Requirements:**
1. A _______ service keeps running until its work is completed, even without any component bound to it.
2. A _______ service provides an API to another process and is destroyed once all components unbind.
3. Music playback should be declared as a _______ service so the system prioritizes keeping it alive.

**نموذج الحل:**
1. Started
2. Bound
3. Foreground

---

### Exercise 4: Resource Qualifiers in Practice — scenario

**Scenario / Task:**
Your app needs to show a different welcome message for French-speaking users and support Dark Mode automatically.

**Requirements:**
1. Name the folder structure you would create for the French string resource.
2. Name the folder structure for a dark-mode-specific color resource.
3. Explain, in one sentence, why no extra code is needed to switch between them.

**نموذج الحل:**
1. `res/values-fr/strings.xml`
2. `res/values-night/colors.xml`
3. لأن نظام أندرويد يختار تلقائياً المجلد المطابق لإعدادات الجهاز الحالية (اللغة أو وضع الإضاءة) عبر آلية Resource Qualifiers، دون أي كود إضافي من المطوّر.

---

### Exercise 5: Intent Filter Design — scenario

**Scenario / Task:**
You are building a PDF viewer app. You want your app to appear as an option whenever the user tries to open a PDF file from any other app (like a file manager or email client).

**Requirements:**
1. Write the `<intent-filter>` block that should go inside your `PdfViewerActivity` declaration.
2. Explain which action and MIME type you would use.

**نموذج الحل:**
```xml
<activity android:name=".PdfViewerActivity">
<intent-filter>
<action android:name="android.intent.action.VIEW" />
<category android:name="android.intent.category.DEFAULT" />
<data android:mimeType="application/pdf" />
</intent-filter>
</activity>
```
استخدمنا الإجراء `VIEW` لأننا نريد "عرض" محتوى، مع تحديد نوع MIME الخاص بملفات PDF تحديداً (`application/pdf`) بدلاً من `*/*` لضمان ظهور التطبيق فقط عند فتح ملفات PDF تحديداً وليس أي نوع ملف.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: App Launch Sequence

**Input:**
```text
User taps the GreetingCard app icon on the device launcher.
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | النظام يقرأ AndroidManifest.xml | ؟ |
| 2 | ؟ | يجد intent-filter بـ MAIN/LAUNCHER على MainActivity |
| 3 | النظام يبدأ عملية التطبيق (process) | ؟ |
| 4 | ؟ | يُستدعى onCreate(savedInstanceState = null) |
| 5 | setContent يُنفَّذ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | النظام يقرأ AndroidManifest.xml | يبحث عن النشاط المصرَّح كنقطة إطلاق |
| 2 | النظام يحدد نقطة الدخول | يجد intent-filter بـ MAIN/LAUNCHER على MainActivity |
| 3 | النظام يبدأ عملية التطبيق (process) | تُنشأ عملية Linux جديدة خاصة بالتطبيق |
| 4 | يُنشأ كائن MainActivity | يُستدعى onCreate(savedInstanceState = null) |
| 5 | setContent يُنفَّذ | تُبنى واجهة Compose وتُعرض "Hello Android!" على الشاشة |

**Result:** The user sees the GreetingCard screen showing "Hello Android!"

---

### Trace Exercise 2: Implicit Intent Resolution for Sharing a Photo

**Input:**
```text
User taps "Share" on a photo in a Gallery app; multiple apps have declared SEND intent-filters with image/* MIME type.
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Gallery app creates an Intent with ACTION_SEND | ؟ |
| 2 | ؟ | النظام يفحص كل التطبيقات المثبتة |
| 3 | النظام يجد عدة تطبيقات مطابقة | ؟ |
| 4 | ؟ | يختار تطبيقاً واحداً (مثلاً تطبيق البريد) |
| 5 | النظام يبدأ الـ Activity المختارة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Gallery app creates an Intent with ACTION_SEND | الـ Intent يحمل بيانات الصورة ونوع MIME "image/*" |
| 2 | النظام يطابق الـ Intent مع intent-filters | النظام يفحص كل التطبيقات المثبتة |
| 3 | النظام يجد عدة تطبيقات مطابقة | تظهر قائمة "مشاركة عبر..." للمستخدم |
| 4 | المستخدم يختار تطبيقاً | يختار تطبيقاً واحداً (مثلاً تطبيق البريد) |
| 5 | النظام يبدأ الـ Activity المختارة | تُفتح شاشة إنشاء رسالة جديدة مع الصورة مرفقة تلقائياً |

**Result:** The chosen app's compose/share activity opens with the photo attached.

---

### Trace Exercise 3: Bound Service Lifecycle with Multiple Clients

**Input:**
```text
Activity A binds to Service S. Then Activity B also binds to Service S. Later, Activity A unbinds, then Activity B unbinds.
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Activity A calls bindService() | ؟ |
| 2 | Activity B calls bindService() | ؟ |
| 3 | Activity A calls unbindService() | ؟ |
| 4 | Activity B calls unbindService() | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Activity A calls bindService() | الخدمة S تُنشأ وتبدأ العمل، مرتبطة بعميل واحد (A) |
| 2 | Activity B calls bindService() | الخدمة S تبقى نفسها، الآن مرتبطة بعميلين (A و B) |
| 3 | Activity A calls unbindService() | الخدمة S تبقى تعمل لأن B ما زالت مرتبطة بها |
| 4 | Activity B calls unbindService() | لا يوجد أي عميل مرتبط الآن، فتُدمَّر الخدمة S تلقائياً |

**Result:** Service S is destroyed only after the last bound client (B) unbinds.

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: uml_design — App Components Interaction Diagram

**Task:**
Design a simple diagram showing how a "Note Taking" app's four components could interact: a MainActivity showing notes, a SyncService that uploads notes in the background, a BootReceiver that restarts sync after device reboot, and a NotesProvider that lets a widget app read note titles. Show the direction of interaction between components using arrows.

**نموذج الإجابة:**
```diagram
type: class
title: Note Taking App — Component Interaction
direction: TD
nodes:
  - id: main_activity
    label: MainActivity
    kind: activity
    level: 0
  - id: sync_service
    label: SyncService
    kind: service
    level: 1
  - id: boot_receiver
    label: BootReceiver
    kind: receiver
    level: 1
  - id: notes_provider
    label: NotesProvider
    kind: provider
    level: 2
  - id: widget_app
    label: Widget App (external)
    kind: external
    level: 3
edges:
  - from: main_activity
    to: sync_service
    label: startService(Intent)
  - from: boot_receiver
    to: sync_service
    label: startService(Intent) after BOOT_COMPLETED
  - from: main_activity
    to: notes_provider
    label: insert/query notes
  - from: widget_app
    to: notes_provider
    label: query() via ContentResolver
```

**معايير التقييم:**
- تحديد صحيح لنوع كل مكوّن (Activity/Service/Receiver/Provider) بناءً على وظيفته.
- توضيح أن BootReceiver يُفعَّل تلقائياً من النظام (بث BOOT_COMPLETED) وليس من المستخدم مباشرة.
- توضيح أن الوصول لـ NotesProvider من تطبيق خارجي (Widget) يمر عبر ContentResolver وليس Intent مباشر.

---

### Design Question 2: architecture — Choosing Between Single-Activity and Multi-Activity

**Task:**
You are designing a large e-commerce app with: a product browsing flow (many screens), a checkout flow that another payment app might need to launch directly, and a settings screen. Propose an architecture decision: should this app use single-activity (Compose Navigation) or multiple activities? Justify your answer considering the requirement that an external payment app must be able to launch the checkout screen directly.

**نموذج الإجابة:**
يُفضَّل استخدام معمارية **مختلطة**: `Activity` واحدة رئيسية (Single-Activity) تدير تدفق تصفح المنتجات والإعدادات عبر Compose Navigation لتحقيق أداء أفضل ومشاركة حالة أسهل بين هذه الشاشات المرتبطة داخلياً. لكن شاشة "Checkout" يجب أن تبقى `Activity` منفصلة ومُصدَّرة (`exported="true"`) مع `intent-filter` مناسب، لأن المتطلب الصريح هو أن تطبيقاً خارجياً (تطبيق الدفع) يجب أن يستطيع تشغيلها مباشرة عبر Intent — وهذا غير ممكن بسهولة لو كانت مجرد "وجهة Compose" داخل نشاط واحد مغلق، لأن التطبيقات الأخرى لا تستطيع الوصول لوجهات Navigation الداخلية مباشرة، بل فقط لأنشطة مُصرَّح عنها في الـ Manifest.

**معايير التقييم:**
- إدراك أن التطبيقات الخارجية تحتاج Activity مستقلة مُصدَّرة للوصول المباشر عبر Intent.
- تبرير استخدام Single-Activity للشاشات الداخلية المترابطة فقط (تصفح المنتجات، الإعدادات).
- عدم اقتراح حل متطرف (كل شيء نشاط واحد أو كل شاشة نشاط منفصل) دون مراعاة المتطلب الفعلي.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the difference between an APK and an AAB?
A: An APK is directly installable on a device; an AAB is a publishing format that Google Play splits into optimized, device-specific APKs.

---

**Q2:** Why doesn't Android have a `main()` function like most other systems?
A: Because an app is composed of independent components (Activity, Service, Broadcast Receiver, Content Provider), each of which can serve as an entry point depending on how it's activated.

---

**Q3:** What is the key difference between a Started Service and a Bound Service?
A: A Started Service runs independently until its work is done, while a Bound Service only runs as long as at least one component remains bound to it.

---

**Q4:** Why should a BroadcastReceiver avoid heavy processing?
A: It's designed as a lightweight gateway; performing heavy work directly risks the receiver being considered unresponsive by the system.

---

**Q5:** How is a Content Provider activated differently from the other three components?
A: It's activated through a request from a `ContentResolver`, not through an `Intent`.

---

**Q6:** What happens if an Activity is written in code but never declared in AndroidManifest.xml?
A: The system has no knowledge of it, so it can never be launched.

---

**Q7:** What is the difference between an explicit and an implicit Intent?
A: An explicit Intent names the target component's class directly; an implicit Intent describes an action, letting the system find a matching component.

---

**Q8:** Where do you declare a required hardware feature like a camera?
A: In the `<uses-feature>` element inside `AndroidManifest.xml`.

---

**Q9:** Where are `minSdk` and `targetSdk` configured?
A: In the app module's `build.gradle` file, not in the manifest.

---

**Q10:** What does the `android:required="false"` attribute on `<uses-feature>` allow?
A: It lets the app be installed on devices without that hardware feature, but the app must check at runtime and disable related functionality if the feature is absent.

---

**Q11:** What does a resource qualifier like `values-night/` do?
A: It provides an alternative resource that the system automatically selects when the device is in Dark Mode, without requiring extra code.

---

**Q12:** In modern Android development, what commonly replaces multiple Activities for navigating between screens?
A: A single Activity hosting multiple Composable destinations managed via Jetpack Compose navigation.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> يجمع هذا القسم كل أجزاء كود GreetingCard App التي شُرحت على دفعات في الأقسام 28، 29، و30.

```kotlin
// MainActivity.kt — full GreetingCard app source
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            GreetingcardTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting(name = "Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

```xml
<!-- AndroidManifest.xml — full GreetingCard app manifest -->
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools">
<application
android:icon="@mipmap/ic_launcher"
android:label="@string/app_name"
android:theme="@style/Theme.GreetingCard"
tools:targetApi="31">
<activity
android:name=".MainActivity"
android:exported="true"
android:label="@string/app_name"
android:theme="@style/Theme.GreetingCard">
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
</activity>
</application>
</manifest>
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: What is the Android sandbox model, and how does it protect apps from each other?
**نموذج الإجابة:** نموذج الحماية (sandbox) في أندرويد يعامل كل تطبيق كمستخدم لينكس مستقل بمعرّف فريد، بحيث لا يمكن لأي تطبيق الوصول لملفات تطبيق آخر إلا بإذن صريح. كل تطبيق يعمل أيضاً في عملية (process) وآلة افتراضية (VM) منفصلة، مما يعزل كوده تماماً عن التطبيقات الأخرى. مثال: تطبيق ضار لا يستطيع قراءة بيانات تطبيق بنكي حتى لو كانا مثبتين على نفس الجهاز، لأن كل واحد "معزول" في صندوقه الخاص. نستخدم هذا المفهوم عندما نصمم أي تطبيق يتعامل مع بيانات حساسة ونحتاج التأكد من عدم تسربها لتطبيقات أخرى غير موثوقة.

---

### Question 2: Compare the four types of Android app components in terms of purpose and UI presence.
**نموذج الإجابة:** المكوّنات الأربعة هي: `Activity` (شاشة تفاعلية مرئية للمستخدم)، `Service` (عمل خلفي بدون واجهة مستخدم)، `Broadcast Receiver` (استجابة سريعة وخفيفة لأحداث دون واجهة مباشرة، مع إمكانية إشعار فقط)، و`Content Provider` (إدارة ومشاركة بيانات منظمة بدون واجهة أيضاً). المكوّن الوحيد الذي يعرض واجهة كاملة هو Activity؛ البقية تعمل خلف الكواليس بأدوار مختلفة تماماً. نستخدم هذه المقارنة عند تصميم بنية أي تطبيق جديد لتحديد أي مكوّن يناسب كل جزء من متطلبات التطبيق.

---

### Question 3: Explain the difference between explicit and implicit Intents with an example.
**نموذج الإجابة:** الـ Intent الصريح (explicit) يحدد اسم الصنف المستهدف مباشرة، ويُستخدم عادة داخل نفس التطبيق (مثل الانتقال من شاشة لأخرى). الـ Intent الضمني (implicit) يصف فقط "الإجراء" المطلوب (مثل عرض صورة) ويترك للنظام إيجاد أي مكوّن مناسب على الجهاز، مما يسمح باستدعاء مكوّنات من تطبيقات أخرى دون معرفة اسمها بالتحديد. مثال: الانتقال من شاشة تسجيل الدخول لشاشة الصفحة الرئيسية داخل نفس التطبيق يستخدم Intent صريح، بينما فتح رابط ويب باستخدام أي متصفح متاح على الجهاز يستخدم Intent ضمني.

---

### Question 4: Why must all components (except dynamically registered broadcast receivers) be declared in AndroidManifest.xml?
**نموذج الإجابة:** لأن نظام أندرويد لا يقرأ الكود المصدري للتطبيق مباشرة ليكتشف مكوّناته، بل يعتمد كلياً على ملف البيان (Manifest) كمصدر موثوق ووحيد لمعرفة أي مكوّنات موجودة وكيف يمكن تفعيلها. أي مكوّن غير مصرَّح عنه هناك يبقى "غير مرئي" تماماً للنظام ولا يمكن تشغيله مهما كان الكود صحيحاً. الاستثناء الوحيد هو Broadcast Receiver الذي يمكن تسجيله ديناميكياً وقت التشغيل عبر `registerReceiver()` لحالات الاستخدام المؤقتة.

---

### Question 5: Describe the lifecycle difference between a Started Service and a Bound Service.
**نموذج الإجابة:** الخدمة المُبدأة (Started) تُطلَق عبر `startService()` وتستمر بالعمل باستقلالية تامة حتى تنهي مهمتها بنفسها، بغض النظر عن استمرار وجود المكوّن الذي أطلقها. أما الخدمة المرتبطة (Bound) فتُطلَق عبر `bindService()` وتبقى حية فقط طالما يوجد مكوّن واحد على الأقل مرتبط بها؛ بمجرد أن يفك آخر مكوّن ارتباطه، تُدمَّر الخدمة تلقائياً. الفرق الجوهري هو من "يتحكم" بدورة الحياة: الخدمة نفسها في الحالة الأولى، والعملاء المرتبطون في الحالة الثانية.

---

### Question 6: What role does ContentResolver play in accessing a Content Provider?
**نموذج الإجابة:** يعمل ContentResolver كطبقة وسيطة إلزامية بين أي مكوّن يريد الوصول لبيانات مزوّد محتوى، وبين المزوّد نفسه. بدلاً من التواصل المباشر، يستدعي المكوّن دوالاً مثل `query()` على كائن ContentResolver، والذي يتولى كل المعاملات الفعلية مع Content Provider. هذا يوفر طبقة تجريد أمنية إضافية تسمح بالتحقق من الصلاحيات لكل معاملة على حدة قبل الوصول الفعلي للبيانات.

---

### Question 7: Explain how resource qualifiers (e.g. values-ar, values-night) allow adaptability without changing code logic.
**نموذج الإجابة:** تسمح مؤهِّلات الموارد (Resource Qualifiers) بإنشاء نسخ متعددة من نفس المورد (مثل ملف نصوص) في مجلدات بأسماء مختلفة تحمل لاحقة تصف حالة جهاز معينة (كاللغة أو وضع الإضاءة). عند التشغيل، يختار النظام تلقائياً المجلد المطابق لإعدادات الجهاز الحالية، بينما يبقى الكود البرمجي الذي يطلب المورد (مثل `stringResource(R.string.name)`) موحداً تماماً بلا أي تغيير. هذا يفصل تماماً بين "منطق التطبيق الثابت" و"شكله المتغير حسب المستخدم والجهاز".

---

### Question 8: In the single-activity architecture pattern promoted by Google, what replaces multiple separate Activities for different screens?
**نموذج الإجابة:** بدلاً من إنشاء Activity منفصلة كاملة لكل شاشة، يستخدم النمط الحديث نشاطاً واحداً فقط يعمل كمضيف (host)، بينما تُدار الشاشات المختلفة كوجهات (destinations) قابلة للتأليف (Composable) يتم التنقل بينها برمجياً عبر نظام Navigation الخاص بـ Jetpack Compose. هذا يقلل تعقيد مشاركة البيانات بين الشاشات ويحسّن أداء التطبيق مقارنة بإدارة أنشطة متعددة منفصلة.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين APK وAAB ولماذا لا يُثبَّت الأخير مباشرة.
- [ ] أفهم كيف يحمي نموذج الـ Sandbox كل تطبيق عبر Linux user ID منفصل.
- [ ] أستطيع تسمية المكوّنات الأربعة وشرح وظيفة كل واحد منها بجملة واحدة.
- [ ] أفهم لماذا لا يوجد `main()` في أندرويد وكيف يعمل النظام كوسيط لتفعيل المكوّنات.
- [ ] أستطيع التفريق بين Started Service وBound Service ومتى يُدمَّر كل منهما.
- [ ] أفهم لماذا يجب أن يكون Broadcast Receiver خفيفاً وسريعاً.
- [ ] أفهم كيف تُفعَّل Content Provider عبر ContentResolver وليس Intent.
- [ ] أستطيع كتابة تصريح Activity بسيط في Manifest مع intent-filter صحيح (MAIN/LAUNCHER).
- [ ] أفهم الفرق بين Explicit وImplicit Intent ومتى يُستخدم كل منهما.
- [ ] أعرف أين تُضبَط قيم minSdk/targetSdk (build.gradle) مقابل uses-feature (Manifest).
- [ ] أفهم دور Resource Qualifiers (values-ar, values-night) وكيف تعمل تلقائياً بدون كود إضافي.
- [ ] أستطيع قراءة وشرح كود GreetingCard App كاملاً (MainActivity.kt وManifest) سطراً بسطر.
- [ ] أفهم مفهوم single-activity architecture والفرق بينه وبين الأنشطة المتعددة التقليدية.
- [ ] أعرف البدائل الحديثة لـ Service التقليدية (Coroutines، WorkManager).

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Application Fundamentals (هذه المحاضرة) | Activity & Intents بالتفصيل | تعمّق أكبر في دورة حياة Activity وIntent Resolution |
| Application Fundamentals | Compose UI الأساسي | تطبيق مباشر عبر مثال GreetingCard (setContent، Composable) |
| Application Fundamentals | Compose State & Navigation | تطبيق حديث لمفهوم single-activity architecture |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| المكوّنات الأربعة | Activity (شاشة) / Service (خلفية) / Broadcast Receiver (أحداث) / Content Provider (بيانات مشتركة) |
| Manifest | أي مكوّن غير مصرَّح فيه = غير موجود للنظام (عدا Broadcast Receiver الديناميكي) |
| Intent | صريح = اسم صنف محدد، ضمني = وصف إجراء يبحث عنه النظام |
| Services | Started = مستقل حتى الانتهاء، Bound = يعيش فقط مع وجود عميل مرتبط |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `startActivity()` | تشغيل نشاط بدون انتظار نتيجة | التنقل بين الشاشات |
| `startActivityForResult()` | تشغيل نشاط مع توقع نتيجة عائدة | مثال: الكاميرا تعيد الصورة |
| `bindService()` | الارتباط بخدمة تفاعلية | التواصل المستمر مع خدمة |
| `sendBroadcast()` | إرسال بث عام | إعلام تطبيقات أخرى بحدث |
| `query()` على ContentResolver | استعلام بيانات من Content Provider | قراءة بيانات مشتركة |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | لا يوجد `main()` في أندرويد؛ كل شيء يبدأ عبر مكوّن مُصرَّح في Manifest |
| 2 | Content Provider هو الوحيد الذي يُفعَّل عبر ContentResolver وليس Intent |
| 3 | Broadcast Receiver دائماً خفيف وسريع؛ أي عمل ثقيل يُفوَّض لمكوّن آخر |
| 4 | minSdk/targetSdk في build.gradle، بينما uses-feature في AndroidManifest.xml |
| 5 | android:name في Manifest يجب أن يطابق تماماً اسم الصنف في الكود |

<!-- VALIDATION: تم تغطية كل فقرات محتوى PDF (Application Fundamentals lecture) من الشريحة 3 حتى 31 عبر 30 قسماً رقمياً في الجزء الأول، مع الالتزام ببنية النص الأصلي/الترجمة الحرفية/الشرح المبسّط لكل قسم، وتغطية جميع الأجزاء المطلوبة: MCQ (16)، Debug (6)، تمارين إضافية (5)، تمارين تتبع (3)، أسئلة تصميم (2)، بطاقات Q&A (12)، كود كامل مجمّع، أسئلة نظرية (8)، قائمة فحص، وCheat Sheet. -->

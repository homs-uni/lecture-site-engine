## المحاضرة 1: Android Platform (منصة أندرويد)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 1 (سهل)
Which operating system kernel is Android built on top of?
أ) Linux Kernel
ب) Windows Kernel
ج) macOS Kernel
د) FreeBSD Kernel
**الإجابة الصحيحة: أ**
**التعليل:**
تنص المحاضرة صراحة أن أندرويد نظام مبني على نواة Linux Kernel، وهي الطبقة الأولى (الأسفل) في المكدّس البرمجي (Software Stack) الذي يوفّر الوظائف الأساسية كإدارة الذاكرة والعمليات وأمان النظام.

باقي الخيارات أنظمة تشغيل/نوى غير مرتبطة ببنية أندرويد إطلاقاً.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 2 (متوسط)
Which of the following layers is responsible for memory and process management in the Android Software Stack?
أ) Linux kernel
ب) libraries
ج) Application Framework
د) Android Runtime
**الإجابة الصحيحة: أ**
**التعليل:**
تنص المحاضرة صراحة أن من "خدمات نواة Linux القياسية" (`Linux Kernel Standard Services`): `security`, `memory & process management`, `file & network I/O`, `device drivers`.

أما `Application Framework` فمسؤول عن توفير الـ`Managers` للمطور، و`Android Runtime` يُنفّذ الكود عبر `DEX`، وليس أياً منهما مسؤولاً عن إدارة الذاكرة والعمليات مباشرة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 3 (متوسط)
Which of the following statements is/are true about Android Framework API?
أ) API level is an integer value that uniquely identifies the framework API offered by a version of the Android platform
ب) The Android platform provides a framework API that applications can use to interact with the underlying Android system
ج) Each successive version of the Android platform can include updates to the Android Framework API that it delivers
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الجمل الثلاث مأخوذة حرفياً من نص المحاضرة الأصلي عن `API Level` و`Framework API`: كل واحدة منها صحيحة بذاتها، لذا فإن "All of the above" هي الإجابة الصحيحة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 4 (متوسط)
Which of the following is NOT a service of Android Linux kernel?
أ) File & network I/O management
ب) Navigation stack management
ج) Non-compiled resources management
د) Both b and c
**الإجابة الصحيحة: د**
**التعليل:**
`File & network I/O management` هي فعلاً من خدمات نواة Linux القياسية المذكورة في المحاضرة.

أما `Navigation stack management` (مكدّس التنقل) فهي مهمة `Activity Manager` ضمن `Java API Framework`، و`Non-compiled resources management` هي مهمة `Resource Manager`، وكلاهما من طبقة الـ`Framework` وليسا من خدمات النواة، لذا الإجابة هي "كلاهما" (د).

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 5 (متوسط)
In the Android Software Stack, which of the following belongs to the "Application Framework" Layer?
أ) Location Manager
ب) Notification Manager
ج) Surface Manager
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
`Location Manager` و`Notification Manager` كلاهما من مديري `Java API Framework` المذكورين صراحة في المحاضرة ("Location Manager, Telephony Manager... Notification Manager").

أما `Surface Manager` فهو جزء من `Native C/C++ Libraries` (يدير عرض الرسوميات على مستوى منخفض) وليس من طبقة الـ`Framework`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 6 (متوسط)
Which of the following Statements is/are true?
أ) Android System can automatically save Intents during configuration changes
ب) The Activity UI State is lost when back-button is pressed
ج) Bundle object is appropriate for preserving small amount of data
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
يحافظ النظام تلقائياً على حالة النشاط الأساسية (بما فيها الـ Intent الأصلي القابل للاسترجاع عبر `getIntent()`) عبر تغييرات التهيئة

بينما لا يتم استدعاء `onSaveInstanceState()` عند ضغط زر الرجوع لأن المستخدم يُنهي النشاط عمداً فتُفقد حالة واجهته، و`Bundle` مخصص فعلاً لحفظ كميات صغيرة فقط من البيانات (وليس بيانات كبيرة أو معقدة).

*(مستوى ثقة متوسط بسبب صياغة الخيار الأول).*

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 7 (متوسط)
Ancestral navigation is controlled by:
أ) Android system's back stack
ب) The Up button in application's action bar
ج) Defining parent-child relationships between activities in the Android manifest
د) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
التنقل الهرمي (`Ancestral/Up navigation`) يعتمد تقنياً على تعريف علاقة الأب-الابن بين الأنشطة عبر `android:parentActivityName` في ملف الـ`Manifest`؛ زر `Up` هو فقط العنصر المرئي الذي يستخدم هذه العلاقة المُعرَّفة مسبقاً ليعرف إلى أين ينتقل

بعكس `Back stack` الذي يعتمد على ترتيب التنقل الفعلي للمستخدم وليس التسلسل الهرمي المنطقي للتطبيق.

*(مستوى ثقة متوسط — لم تُغطَّ هذه النقطة حرفياً في المحاضرات).*

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 8 (متوسط)
Which of the following statements is/are true about Android Linux kernel?
أ) Linux Kernel provides standard interfaces that expose device hardware capabilities to Java API framework.
ب) Linux Kernel provides core runtime libraries that provide most of the functionality of Java language.
ج) Linux Kernel provides key security features.
د) All of the above
**الإجابة الصحيحة: ج**
**التعليل:**
العبارة (ج) مطابقة تماماً لنص المحاضرة: "Using a Linux kernel lets Android take advantage of key security features".

أما (أ) فهي في الحقيقة وظيفة طبقة `HAL` (توفير واجهات موحدة تكشف قدرات العتاد أمام `Java API Framework`)، و(ب) هي وظيفة `Android Runtime (ART)` (توفير مكتبات وقت التشغيل الأساسية)،

وليست وظيفة نواة Linux مباشرة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 9 (متوسط)
What is the task of Android Runtime (ART)?
أ) It is responsible of providing Inter-process communication.
ب) It is responsible of running multiple virtual machines on low-memory devices.
ج) It is responsible of providing File & network I/O management.
د) It is responsible of Navigation stack management.
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة حرفياً: "ART is written to run multiple virtual machines on low-memory devices by executing... DEX files".

أما `Inter-process communication` فهي من خدمات نواة Linux الخاصة بأندرويد، و`File & network I/O` خدمة نواة قياسية، و`Navigation stack management` مهمة `Activity Manager`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 10 (متوسط)
Which of the following is/are true component(s) of Android Platform?
أ) Java API Framework
ب) Virtual devices (emulators)
ج) Development tools
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
منصّة أندرويد كما شرحتها المحاضرة تشمل طبقة `Java API Framework` نفسها بالإضافة إلى أدوات التطوير (`SDK Tools`) والمحاكيات (`Emulator`) التي وردت ضمن مكونات الـ`Android SDK`، وكلها جزء من منظومة "منصّة أندرويد" بمعناها الواسع.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 11 (متوسط)
Which of the following is/are true about the differences between Dalvik Virtual Machine (DVM) and Android Runtime (ART)?
أ) Compilation of DVM is Ahead-of-time, while Compilation of ART is Just-In-Time.
ب) DVM has faster app startup times, while ART has slower app startup times.
ج) DVM has less memory usage initially, while ART has more efficient memory management.
د) All of the above
**الإجابة الصحيحة: ج**
**التعليل:**
جدول المقارنة في المحاضرة يوضح أن `Dalvik` يستهلك مساحة/ذاكرة أقل عند التثبيت بينما يدير `ART` الذاكرة بكفاءة أكبر لاحقاً، وهذا يطابق العبارة (ج) تماماً.

أما (أ) و(ب) فمعكوستان: الصحيح هو أن `Dalvik` يستخدم `JIT` و`ART` يستخدم `AOT`، وأن `ART` هو من يملك أوقات إقلاع أسرع وليس العكس، لذا فإن "All of the above" غير صحيحة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 12 (متوسط)
What is/are the tasks of Package Manager in Android platform?
أ) It controls the creation, display, and management of application windows on the screen.
ب) It manages the installation, upgrade, and removal of applications on the Android device.
ج) It provides a common navigation back stack.
د) Both a and b
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة حرفياً على أن `Package Manager` "Manages the installation, upgrade, and removal of applications on the Android device".

أما إنشاء وإدارة نوافذ التطبيق فهي مهمة `Window Manager`، وتوفير مكدّس التنقل الخلفي هي مهمة `Activity Manager`، لذا فإن (أ) لا تخص `Package Manager` وخيار "كلاهما" غير صحيح.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 13 (متوسط)
Which of the following statements is/are true about Android Components?
أ) Activity is a component that handle the user interaction to the mobile screen.
ب) Service is a component that handle communication between Android OS and applications.
ج) Broadcast Receiver is a component that runs in the background to perform long-running operations.
د) Both a and b
**الإجابة الصحيحة: أ**
**التعليل:**
العبارة (أ) صحيحة فعلاً — `Activity` هي نقطة التفاعل مع المستخدم عبر الشاشة.

لكن (ب) خاطئة لأن التواصل مع أحداث النظام هو دور `Broadcast Receiver`

وليس `Service`، و(ج) خاطئة لأن العمل طويل الأمد في الخلفية هو دور `Service` وليس `Broadcast Receiver` (الذي يجب أن يكون خفيفاً وسريعاً). لذا فإن (أ) وحدها هي الصحيحة، وخيار "كلاهما" غير صحيح لأن (ب) خاطئة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 14 (متوسط)
Which of the following is/are a service of Android Linux kernel?
أ) File & network I/O management
ب) Navigation stack management
ج) Non-compiled resources management
د) Both b and c
**الإجابة الصحيحة: أ**
**التعليل:**
`File & network I/O management` مذكورة صراحة كخدمة قياسية لنواة Linux في المحاضرة.

أما `Navigation stack management` فهي وظيفة `Activity Manager`، و`Non-compiled resources management` وظيفة `Resource Manager`، وكلاهما ينتميان لطبقة الـ`Java API Framework`

وليس لنواة Linux.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 15 (متوسط)
Which of the following statements is/are true about Android Application?
أ) Any Android App can directly activate a component from another app.
ب) Android App has multiple entry points.
ج) Any Android App must contain Content Provider component.
د) Both a and b
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة أن التطبيق "don't have a single entry point" أي له نقاط دخول متعددة (كل Activity/Service/Receiver هو نقطة دخول محتملة)، وهذا يطابق (ب).

لكن (أ) خاطئة تماماً لأن النص يقول صراحة "your app can't directly activate a component from another app...

the Android system can" — فقط النظام يقوم بذلك عبر Intent. و(ج) خاطئة لأن التطبيق لا يلزمه احتواء كل الأنواع الأربعة معاً.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 16 (متوسط)
What is/are the tasks of Activity Manager in Android platform?
أ) It manages the lifecycle of activities.
ب) It provides a common navigation back stack.
ج) It maintains the visual hierarchy of application windows based on factors like activity focus and visibility.
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
تنص المحاضرة حرفياً أن `Activity Manager` "Manages the lifecycle of activities... Provides a common navigation back stack"، وهما (أ) و(ب) معاً.

أما الحفاظ على التسلسل البصري لنوافذ التطبيق حسب التركيز والظهور فهي مهمة `Window Manager` وليس `Activity Manager`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 17 (متوسط)
Which of the following is/are component(s) of Java API Framework?
أ) View System
ب) Content Providers
ج) Media framework
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
كل من `View System` و`Content Providers` مذكورَان صراحة ضمن قائمة مديري `Java API Framework` في المحاضرة.

أما `Media Framework` فهو مذكور في المحاضرة كمثال على `Native C/C++ Libraries` وليس ضمن طبقة الـ`Framework` نفسها (رغم وجود واجهة Java تستدعيه).

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 18 (متوسط)
Which of the following statements is/are true about Activities?
أ) Activities are created and managed by the Activity Class.
ب) Android can kill activities when it needs their resources.
ج) State changes of Activity are triggered by user actions only.
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
كل `Activity` تُنفَّذ فعلياً كصنف فرعي من `Activity Class` وتتم إدارتها عبره، وتنص المحاضرة صراحة أن النظام قد يقتل الأنشطة عندما يحتاج ذاكرتها ("احتمالية قيام النظام بإنهاء عملية معينة...

تعتمد على حالة النشاط").

أما (ج) فخاطئة لأن تغييرات حالة النشاط تحدث أيضاً بسبب تغييرات التهيئة (كدوران الشاشة) وإجراءات النظام، وليس بفعل المستخدم فقط.

## المحاضرة 4: Application Fundamentals (أساسيات التطبيقات)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 19 (متوسط)
Which of the following statements is/are true about Service Component in Android?
أ) A service does not provide a user interface
ب) Started services run until their work is completed
ج) Bound services run only as long as another application component is bound to it
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الجمل الثلاث مطابقة حرفياً لنص المحاضرة: "A service does not provide a user interface"، "Started services...

run until their work is completed"، و"A bound service runs only as long as another application component is bound to it".

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 20 (متوسط)
Which of the following statements is/are true about Content Providers?
أ) Content providers can help an application manage access to data stored by the application only
ب) You can perform a query to a content provider by calling query() on a ContentResolver
ج) Content providers are not activated by intents
د) Both b and c
**الإجابة الصحيحة: د**
**التعليل:**
(ب) صحيحة حرفياً: "You can perform a query to a content provider by calling query() on a ContentResolver". و(ج) صحيحة أيضاً لأن المحاضرة تنص أن مزوّدات المحتوى، خلافاً للمكوّنات الثلاثة الأخرى، "تُفعَّل عندما تُستهدَف بطلب من ContentResolver"

وليس عبر Intent.

أما (أ) فخاطئة لأن مزوّد المحتوى يدير بيانات مشتركة يمكن لتطبيقات أخرى الوصول إليها، وليس بيانات التطبيق نفسه فقط.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 21 (متوسط)
Which of the following Components is used to handle communication between Android OS and applications?
أ) Activity
ب) Service
ج) BroadcastReceiver
د) ContentProvider
**الإجابة الصحيحة: ج**
**التعليل:**
`Broadcast Receiver` هو المكوّن الذي "يسمح للنظام بتوصيل أحداث إلى التطبيق خارج تدفق المستخدم الاعتيادي" استجابة لإعلانات بث على مستوى النظام (كإشعارات البطارية أو الشحن)، فهو حلقة الوصل الرسمية بين نظام أندرويد والتطبيق.

`Activity` تتعامل مع المستخدم، و`Service` تنفذ عملاً خلفياً، و`ContentProvider` يشارك البيانات.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 22 (متوسط)
Which of the following statements is/are true about Android?
أ) Android is an open source and Linux-based operating system
ب) Android is developed by Open Handset Alliance
ج) The commercial marketer of Android is Google
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الجمل الثلاث مطابقة حرفياً لتعريف أندرويد في المحاضرة: "Android is an open source and Linux-based Operating System...

developed by... Open Handset Alliance, with the main contributor and commercial marketer being Google".

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 23 (متوسط)
Which of the following statements is/are true about Android Application?
أ) Any Android application can start another application's component
ب) Android applications don't have a single entry point
ج) The application must contain activity, service, broadcast receiver, and content provider components
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
الجملة (ب) صحيحة حرفياً: "Android apps don't have a single entry point: there's no main() function".

أما (أ) فصحيحة بالمعنى العام المقصود في المحاضرة أن أي تطبيق يستطيع تشغيل مكوّن تابع لتطبيق آخر (عبر النظام كوسيط).

أما (ج) فخاطئة لأن التطبيق لا يلزمه احتواء كل الأنواع الأربعة معاً.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 24 (متوسط)
What is contained within the manifest file for the application?
أ) The permissions the app requires
ب) the source code
ج) The hardware and software features used or required by the app
د) Both a and c
**الإجابة الصحيحة: د**
**التعليل:**
تنص المحاضرة أن الـ`Manifest` "Identifies any user permissions the app requires... Declares hardware and software features used or required by the app"، وهما (أ) و(ج).

أما (ب) فخاطئة تماماً؛ ملف الـ`Manifest` هو XML وصفي فقط ولا يحتوي الكود المصدري الفعلي للتطبيق.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 25 (متوسط)
The information contained within the Application's manifest file used by:
أ) SDK
ب) Google Play
ج) Android build tools
د) Both b and c
**الإجابة الصحيحة: د**
**التعليل:**
تنص المحاضرة أن "external services such as Google Play do read them to provide filtering for users"، وأدوات بناء أندرويد (`build tools`) تعتمد على معلومات الـ`Manifest` (كأسماء المكوّنات والحزمة) أثناء تجميع التطبيق.

أما "SDK" بمعناه العام (مجموعة الأدوات) فليس هو من "يقرأ" المانيفست مباشرة بنفس المعنى المقصود هنا.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 26 (متوسط)
Which of the following statements is/are true about Android Components?
أ) Activities, services, and content providers that we include in source code but do not declare in the manifest are not visible to the system and can never run.
ب) Broadcast receivers can be either declared in the manifest or created dynamically in code as BroadcastReceiver objects.
ج) Activities, services, broadcast receivers are activated by intents.
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الجمل الثلاث مطابقة حرفياً لنص المحاضرة: المكوّنات غير المُعلنة في الـ`Manifest` "aren't visible to the system"، ومستقبلات البث يمكن تسجيلها ديناميكياً عبر `registerReceiver()`، والأنشطة والخدمات ومستقبلات البث الثلاثة (وليس مزوّد المحتوى) تُفعَّل عبر `Intent`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 27 (متوسط)
In Android Studio, res/...... folder contains launcher icon files in different resolutions to support different devices.
أ) drawable
ب) values
ج) layouts
د) mipmap
**الإجابة الصحيحة: د**
**التعليل:**
مجلد `res/mipmap` هو المخصص خصيصاً لأيقونات إطلاق التطبيق (`launcher icons`) بدقات متعددة تدعم كثافات شاشات مختلفة، كما يظهر في مثال المحاضرة `android:icon="@mipmap/ic_launcher"`.

أما `drawable` فللصور العامة، و`values` للنصوص والألوان والأبعاد، و`layouts` لتخطيطات الواجهة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 28 (متوسط)
If the device is running Android 5.1 or lower and you list a dangerous permission in your manifest, then user has to grant the permission when ......
أ) They install the app
ب) The app is running
ج) They install the app or the app is running, no matter
د) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
قبل نظام الأذونات وقت التشغيل (`runtime permissions`) الذي أُدخل في أندرويد 6.0 (API 23)، كانت كل الأذونات — بما فيها الخطرة — تُمنَح دفعة واحدة عند تثبيت التطبيق من المتجر، ولا يوجد أي طلب أذونات أثناء التشغيل في تلك الإصدارات الأقدم.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 29 (متوسط)
Which of the following is a dangerous permission?
أ) Reading or writing the user's private data
ب) Reading or writing another app's files
ج) Performing network access
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
حسب تصنيف الأذونات الكلاسيكي في توثيق أندرويد الأمني، تشمل أمثلة الأذونات "الخطرة" (`dangerous`) قراءة/كتابة بيانات المستخدم الخاصة، قراءة/كتابة ملفات تطبيق آخر، والوصول للشبكة الذي قد يترتب عليه تكلفة، وهذه الأمثلة الثلاثة مذكورة معاً كأمثلة كلاسيكية على مستوى الحماية "dangerous" في التوثيق الأصلي لأندرويد.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 30 (متوسط)
Which of the following is a correct android manifest statement?
أ) `<uses-permission android:name="android.INTERNET"/>`
ب) `<uses-permission android:name="permission.INTERNET"/>`
ج) `<using-permission android:name="android.INTERNET"/>`
د) `<uses-permission android:name="android.permission.INTERNET"/>`
**الإجابة الصحيحة: د**
**التعليل:**
الصيغة الصحيحة للعنصر هي `<uses-permission>` (وليس `<using-permission>` كما في الخيار ج)، والاسم الكامل الصحيح للإذن هو `android.permission.INTERNET` (وليس `android.INTERNET` أو `permission.INTERNET`)، وهذا يطابق نمط الأذونات الموضح في مثال المحاضرة `com.google.socialapp.permission.SHARE_POST`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 31 (متوسط)
Which of the following is true to request the permission if necessary?

```java
ActivityCompat.requestPermissions(thisActivity,
        new String[]{Manifest.permission.READ_CONTACTS},
        MY_PERMISSIONS_REQUEST_READ_CONTACTS);
```
أ) الكود أعلاه بالضبط — 3 معاملات، `new String[]{...}` صحيحة الصياغة
ب) نفس الكود لكن `new String {permission.READ_CONTACTS}` بدون أقواس المصفوفة `[]`
ج) نفس الكود لكن بدون المعامل الثالث `MY_PERMISSIONS_REQUEST_READ_CONTACTS`
د) الكود أعلاه بالضبط، مكرر حرفياً (مطابق للخيار أ)
**الإجابة الصحيحة: أ**
**التعليل:**
الصيغة الصحيحة لـ `requestPermissions()` تتطلب ثلاثة معاملات: الـ`Activity`، مصفوفة أذونات صحيحة الصياغة `new String[]{...}`، ورمز طلب (`requestCode`) صحيح.

الخيار (ب) يحتوي خطأ صياغي (`new String {...}` بدون أقواس المصفوفة `[]`)، و(ج) ناقص المعامل الثالث (`requestCode`)، بينما (أ) و(د) متطابقان نصياً ويمثلان الصياغة الصحيحة الكاملة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 32 (متوسط)
Which of the following statements is/are true about permissions?
أ) If an app declares that it needs a normal permission, the system automatically grants the permission to the app
ب) If an app declares that it needs a dangerous permission, the user has to explicitly grant the permission to the app
ج) Permissions are represented as strings in AndroidManifest.xml
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الحقائق الثلاث صحيحة وفق النموذج المعتمد في أندرويد: الأذونات "العادية" (`normal`) تُمنح تلقائياً دون تدخل المستخدم، الأذونات "الخطرة" (`dangerous`) تحتاج موافقة صريحة من المستخدم، وكل الأذونات — أياً كان نوعها — تُمثَّل كسلاسل نصية (`strings`) داخل `AndroidManifest.xml` عبر عنصر `<uses-permission>`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 33 (متوسط)
When the user responds to the permission dialog box, the system invokes your app's ...... method.
أ) checkSelfPermission()
ب) requestPermissions()
ج) onRequestPermissionsResult()
د) onPermissionsResult()
**الإجابة الصحيحة: ج**
**التعليل:**
`onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)` هي دالة رد النداء (`callback`) التي يستدعيها النظام تلقائياً في الـ`Activity` فور أن يستجيب المستخدم لمربع حوار الإذن (بالموافقة أو الرفض)، لتُبلغ التطبيق بالنتيجة.

أما `checkSelfPermission()` فتُستخدم للتحقق المسبق من وجود الإذن، و`requestPermissions()` هي التي تُطلق الحوار أصلاً (وليست ما يُستدعى بعد الرد)، و`onPermissionsResult()` اسم غير موجود في واجهة برمجة أندرويد.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 34 (متوسط)
Which of the following statements is/are true about Broadcast Receiver?
أ) It is a component that listens for and responds to system events.
أ) Each broadcast message is delivered as Receiver object.
ب) Broadcast receivers can be declared in the manifest only.
ج) All of the above
**الإجابة الصحيحة: أ**
**التعليل:**
العبارة الأولى ("It is a component that listens for and responds to system events") صحيحة وتصف بدقة دور `Broadcast Receiver`.

أما العبارة المذكورة بأنها تُوصَل "ككائن Receiver" فخاطئة — النص الأصلي ينص أن "each broadcast message is delivered as an Intent object"

وليس ككائن Receiver. كما أن مستقبلات البث يمكن تسجيلها ديناميكياً في الكود أيضاً وليس فقط في الـ`Manifest`، لذا فإن كِلا الخيارين الآخرين خاطئان و"All of the above" غير صحيحة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 35 (متوسط)
Which of the following Components is used to handle data management issues?
أ) Activity
ب) Service
ج) BroadcastReceiver
د) ContentProvider
**الإجابة الصحيحة: د**
**التعليل:**
`Content Provider` هو المكوّن المخصص لإدارة والوصول إلى مجموعة بيانات مشتركة للتطبيق (ملفات، قاعدة بيانات SQLite، إلخ) والسماح لتطبيقات أخرى بالاستعلام عنها أو تعديلها بشكل منظم وآمن

بعكس بقية المكوّنات المخصصة للواجهة أو العمل الخلفي أو استقبال الأحداث.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 36 (متوسط)
What is the right code to give an id to <EditText> view element in the layout?
أ) android:id="id/location"
ب) android:id="@+id/location"
ج) android:id="+id/location"
د) android:id="@id+/location"
**الإجابة الصحيحة: ب**
**التعليل:**
الصيغة القياسية لإعطاء عنصر واجهة معرّفاً جديداً في XML هي `android:id="@+id/name"`، حيث يشير الرمز `@` إلى أنه مرجع مورد، والعلامة `+` تخبر أدوات البناء بإنشاء معرّف جديد في صنف `R` إن لم يكن موجوداً مسبقاً.

باقي الخيارات تحتوي أخطاء صياغية (ترتيب الرموز أو غيابها).

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 37 (متوسط)
To access String resource in Java code, we use:
أ) R.string.string_name
ب) R.string/string_name
ج) @string/string_name
د) @string.string_name
**الإجابة الصحيحة: أ**
**التعليل:**
للوصول إلى مورد نصي من كود Kotlin/Java يُستخدم `R.string.string_name`، حيث `R` هو الصنف المولَّد تلقائياً الذي يحتوي معرّفات كل الموارد في مجلد `res/`.

أما الصيغة `@string/string_name` فتُستخدم فقط داخل ملفات XML للإشارة للمورد، وليس من كود Java/Kotlin مباشرة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 38 (متوسط)
res/........... folder in Android Studio contains XML definitions for general constants.
أ) drawable
ب) layout
ج) values
د) mipmap
**الإجابة الصحيحة: ج**
**التعليل:**
مجلد `res/values` هو المخصص لملفات XML التي تعرّف ثوابت عامة للتطبيق مثل النصوص (`strings.xml`)، الألوان (`colors.xml`)، والأبعاد (`dimens.xml`).

أما `drawable` فللصور، و`layout` لتخطيطات الواجهة، و`mipmap` لأيقونات الإطلاق تحديداً.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 39 (متوسط)
Which of the following is a dangerous permission?
أ) Reading or writing the user's private data
ب) Reading or writing another app's files
ج) set the time zone
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
قراءة/كتابة البيانات الخاصة للمستخدم وقراءة/كتابة ملفات تطبيق آخر كلاهما من الأمثلة الكلاسيكية على الأذونات "الخطرة" (`dangerous`) في توثيق أندرويد الأمني.

أما ضبط المنطقة الزمنية (`SET_TIME_ZONE`) فهو إذن على مستوى النظام (`signature/system`) وليس من فئة الأذونات الخطرة التي يطلبها تطبيق عادي من المستخدم.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 40 (متوسط)
Which of the following statements is/are true about permissions?
أ) no app, by default, has permission to perform any operations that would adversely impact other apps
ب) Permissions are represented as strings in AndroidManifest.xml.
ج) The permission is used to protect the privacy of an Android user.
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الجمل الثلاث تعكس مبدأ "أقل الصلاحيات" (`least privilege`) الذي شرحته المحاضرة ضمن نظام الـ`Sandbox`: كل تطبيق معزول افتراضياً بلا صلاحيات تضر غيره، وكل الأذونات تُمثَّل كسلاسل نصية في الـ`Manifest`، والهدف الأساسي منها حماية خصوصية المستخدم.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 41 (متوسط)
What is the difference between "normal" and "dangerous" permissions in Android?
أ) There is no difference; all permissions are treated equally.
ب) "Normal" permissions are granted automatically, while "dangerous" permissions require user approval.
ج) "Normal" permissions are for system apps, while "dangerous" permissions are for third-party apps.
د) Both b and c
**الإجابة الصحيحة: ب**
**التعليل:**
الفرق الجوهري بين النوعين هو أن الأذونات "العادية" (`normal`) — مثل الوصول للإنترنت — يمنحها النظام تلقائياً عند التثبيت دون تدخل المستخدم

بينما الأذونات "الخطرة" (`dangerous`) — مثل الوصول لجهات الاتصال أو الكاميرا — تتطلب موافقة صريحة من المستخدم.

لا علاقة لهذا التصنيف بكون التطبيق نظامياً أو تابعاً لجهة خارجية.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 42 (متوسط)
Which of the following statements is/are true about Bound Services in Android?
أ) The system keeps them running until their work is completed.
ب) They are the service providing an API to another process.
ج) They are implemented as a subclass of BoundService.
د) All of the above
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة حرفياً أن "A bound service provides an API to another process"، وهذا يطابق (ب).

أما (أ) فهي في الحقيقة وصف الخدمات "المُبدأة" (`Started services`) التي تعمل حتى تنتهي مهمتها

بينما الخدمة المرتبطة تعمل فقط طالما هناك مكوّن مرتبط بها. و(ج) خاطئة لأن أي خدمة — سواء مُبدأة أو مرتبطة — تُنفَّذ كصنف فرعي من `Service` مباشرة، ولا يوجد صنف اسمه `BoundService`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 43 (متوسط)
How does an app typically present a permission dialog to the user?
أ) By modifying a permission flag in the AndroidManifest.xml file.
ب) By using ActivityCompat.requestPermissions(Activity activity, String[] permissions, int requestCode) method.
ج) By using <uses-permission android:name="string" /> tag.
د) By using ContextCompat.checkSelfPermission(Context context, String permission) method.
**الإجابة الصحيحة: ب**
**التعليل:**
الدالة `ActivityCompat.requestPermissions()` هي التي تعرض فعلياً مربع حوار الأذونات (`permission dialog`) للمستخدم وقت التشغيل.

أما `<uses-permission>` فهو مجرد تصريح ثابت في الـ`Manifest` (لا يعرض حواراً بحد ذاته للأذونات الخطرة)، و`checkSelfPermission()` يتحقق فقط مما إذا كان الإذن ممنوحاً مسبقاً دون عرض أي حوار.

## المحاضرة 5: Activity & Intents (المكوّن Activity والنوايا)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 44 (متوسط)
When we choose to handle the configuration changes manually, the Activity receives a call to ...... method OK8
أ) onConfigurationChanged(Configuration config)
ب) onConfigurationChange(Bundle config)
ج) onChanged(Bundle config)
د) onConfigChanged(Configuration config)
**الإجابة الصحيحة: أ**
**التعليل:**
عندما يُعلن المطوّر في الـ`Manifest` أنه سيتولى تغييرات التهيئة يدوياً (`configChanges`)، يتجنّب النظام إعادة إنشاء الـ`Activity` بالكامل (`onDestroy`→`onCreate`) ويستدعي بدلاً من ذلك `onConfigurationChanged(Configuration newConfig)` مباشرة، والتي تستقبل كائن `Configuration`

وليس `Bundle`.

باقي الخيارات أسماء دوال غير موجودة في واجهة برمجة أندرويد.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 45 (متوسط)
As an activity begins to stop, the system calls ...... Method.
أ) onSaveInstanceState(Bundle savedInstanceState)
ب) onSaveInstanceState(View savedInstanceState)
ج) onRestoreInstanceState(Bundle savedInstanceState)
د) onSaveState(View savedInstance)
**الإجابة الصحيحة: أ**
**التعليل:**
قبل أن يدخل النشاط حالة `Stopped`، يستدعي النظام `onSaveInstanceState(Bundle savedInstanceState)` ليمنح المطوّر فرصة حفظ حالة الواجهة في كائن `Bundle`.

الخيار (ب) خاطئ لأن المعامل من نوع `Bundle` وليس `View`، و(ج) هي الدالة المستخدمة للاستعادة وليس الحفظ، و(د) اسم دالة غير موجود في الـ API.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 46 (متوسط)
State changes of an Activity are triggered by:
أ) User action
ب) Configuration changes
ج) System action
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
كما توضح دورة حياة النشاط في المحاضرة، تتغيّر حالة النشاط نتيجة تفاعل المستخدم (فتح نشاط آخر، الضغط على الرجوع)، أو تغييرات التهيئة (كدوران الشاشة التي تسبب `onDestroy`/`onCreate`)، أو إجراءات النظام نفسه (كقتل العملية لاسترجاع الذاكرة)، لذا فإن كل هذه الأسباب الثلاثة صحيحة معاً.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 47 (متوسط)
We can recover saved instance state from the Bundle that the system passes to the activity in the ...... Method.
أ) onCreate()
ب) onRestoreInstanceState()
ج) onSaveInstanceState()
د) both a and b
**الإجابة الصحيحة: د**
**التعليل:**
يستطيع المطوّر استعادة الحالة المحفوظة إما من `savedInstanceState` الممرَّر إلى `onCreate(Bundle?)` مباشرة، أو من الدالة المخصصة لذلك `onRestoreInstanceState(Bundle)` التي تُستدعى بعد `onStart()`.

أما `onSaveInstanceState()` فهي دالة "الحفظ" وليست "الاستعادة"، فهي معكوسة تماماً لما يطلبه السؤال.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 48 (متوسط)
Which field in the Intent does the value "text/html" belong to?
أ) Type
ب) Action
ج) Data
د) Extras
**الإجابة الصحيحة: ج**
**التعليل:**
حسب تصنيف مكوّنات الـ`Intent` في المحاضرة (`Component name, Action, Data, Category, Extras, Flags`)، فإن نوع `MIME` مثل "text/html" يُعتبر جزءاً من حقل `Data` الذي "قد يكون مرتبطاً أيضاً بنوع MIME يصف نوع تلك البيانات" (`setDataAndType`)،

وليس حقلاً منفصلاً باسم "Type" ضمن التصنيف الست عناصر المعتمد في المحاضرة.

`Action` يحدد الفعل، و`Extras` تحمل بيانات إضافية غير مستخدمة في تحديد المكوّن.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 49 (متوسط)
When the activity is not in focus, but still visible on the screen it is in .......... state
أ) Running
ب) Stopped
ج) Paused
د) Destroyed
**الإجابة الصحيحة: ج**
**التعليل:**
تنص المحاضرة أن `onPause()` "يشير إلى أن النشاط لم يعد في المقدمة، لكنه يبقى مرئياً إذا كان المستخدم في وضع النوافذ المتعددة" أو عند ظهور مربع حوار فوقه — أي أن النشاط "مرئي جزئياً لكن غير مركّز عليه"، وهذا هو تعريف حالة `Paused` بالضبط.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 50 (متوسط)
Which of the following is not an activity callback method?
أ) onCreate()
ب) onRun()
ج) onClick()
د) Both b and c
**الإجابة الصحيحة: د**
**التعليل:**
الدوال الست الأساسية لدورة حياة `Activity` هي `onCreate/onStart/onResume/onPause/onStop/onDestroy` فقط؛ لا توجد دالة اسمها `onRun()` في أندرويد إطلاقاً، و`onClick()` هي دالة رد نداء خاصة بمستمع ضغط زر (`View.OnClickListener`)

وليست جزءاً من دورة حياة `Activity`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 51 (متوسط)
Which of the following callback methods is always followed by onPause() callback?
أ) onCreate()
ب) onStart()
ج) onResume()
د) onRestart()
**الإجابة الصحيحة: ج**
**التعليل:**
حسب دورة حياة النشاط، الانتقال الطبيعي الوحيد المؤدي إلى `onPause()` هو من حالة `Resumed`، أي من `onResume()` تحديداً؛ فبمجرد حدوث أي مقاطعة (مكالمة، تطبيق آخر، حوار)، يستدعي النظام `onPause()` مباشرة بعد `onResume()`.

أما `onCreate()` و`onStart()` و`onRestart()` فتُتبع دائماً بـ`onResume()` وليس `onPause()` مباشرة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 52 (متوسط)
Which method do we use to kill an activity programmatically within the code?
أ) onDestroy()
ب) onKill()
ج) kill()
د) finish()
**الإجابة الصحيحة: د**
**التعليل:**
`finish()` هي الدالة القياسية التي يستدعيها المطوّر داخل الكود لإنهاء النشاط الحالي عمداً، وهذا يستدعي النظام لاحقاً ليُشغّل `onPause()`→`onStop()`→`onDestroy()` تلقائياً.

أما `onDestroy()` فهي دالة رد نداء يستدعيها النظام نفسه (لا يستدعيها المطوّر مباشرة لإنهاء نشاط)، و`onKill()` و`kill()` غير موجودتين في الـ API.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 53 (متوسط)
Which of the following callback methods is called after onStart() callback method?
أ) onRestart() or onResume()
ب) onResume() or onStop()
ج) onResume() or onDestroy()
د) onRestart() or onStop()
**الإجابة الصحيحة: ب**
**التعليل:**
في المسار الطبيعي يلي `onStart()` استدعاء `onResume()` دائماً (وليس `onRestart()` الذي يسبق `onStart()` لا يليه).

لكن في حالة نادرة يصبح فيها النشاط غير مرئي مجدداً قبل اكتمال الانتقال إلى `Resumed` (كأن يغطيه نشاط آخر الشاشة بالكامل فوراً)، يستدعي النظام `onStop()` مباشرة دون المرور بـ`onResume()`، وهذا المسار البديل موثّق في المخطط الرسمي لدورة حياة النشاط في أندرويد.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 54 (متوسط)
What is the mean of the value "CATEGORY_BROWSABLE" for category field in Intent?
أ) The target activity allows itself to be started by a web browser
ب) The calling activity allows itself to be started by a web browser
ج) The target activity allows itself to run a web browser
د) The calling activity allows itself to display data referenced by a link
**الإجابة الصحيحة: أ**
**التعليل:**
تنص المحاضرة صراحة أن `CATEGORY_BROWSABLE` تعني أن "النشاط الهدف يسمح لنفسه بأن يُفتح من متصفح ويب"، أي أنها فئة يُعلنها النشاط المُستقبِل (target) في فلتره ليصبح قابلاً للفتح من رابط في المتصفح،

وليست خاصية للنشاط المُستدعي (calling).

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 55 (متوسط)
What is the right code to convert the map data that is sent in Intent to a Uri Object?
أ) Uri.parse("geo:0,0?q=1600+Pennsylvania+Ave+Washington+DC")
ب) Uri.parse("gra:0,0?q=1600+Pennsylvania+Ave+Washington+DC")
ج) Uri.fromFile("geo:0,0?q=1600+Pennsylvania+Ave+Washington+DC")
د) Uri.parse("content:0,0?q=1600+Pennsylvania+Ave+Washington+DC")
**الإجابة الصحيحة: أ**
**التعليل:**
مخطط الرابط (`scheme`) القياسي في أندرويد لتحديد موقع جغرافي على الخريطة هو `geo:`، ويُبنى الكائن عبر `Uri.parse()` (وليس `Uri.fromFile()` المخصص لملفات محلية).

المخطط "gra:" غير موجود، و"content:" مخصص للوصول إلى بيانات عبر `Content Provider` وليس للإحداثيات الجغرافية.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 56 (متوسط)
Started Activity can set its result to send it back to the calling Activity using ......... method.
أ) public final void setResult (Intent data, int resultCode)
ب) public final void setResult (int requestCode)
ج) public final void setResult (int resultCode, Intent data)
د) both b and c
**الإجابة الصحيحة: ج**
**التعليل:**
التوقيع الصحيح لدالة `setResult()` في Android SDK هو `setResult(int resultCode, Intent data)` — رمز النتيجة أولاً ثم بيانات الـ`Intent`.

الخيار (أ) معكوس الترتيب، و(ب) ناقص معامل بيانات النتيجة وتستخدم `requestCode` وهو مصطلح خاطئ هنا (المصطلح الصحيح هنا `resultCode`).

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 57 (متوسط)
If an Intent does not specify an action, it passes the Intent Resolution test even if the Intent filter for the activity in the manifest file doesn't contain any action.
أ) True
ب) False
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة صراحة: "إذا لم يذكر الفلتر أي إجراءات، فلا يوجد ما يطابقه أي Intent، لذلك تفشل كل الـIntents هذا الاختبار".

أي أن فلتراً بلا أي `<action>` مذكور يرفض كل الـIntents تلقائياً، حتى لو كان الـIntent نفسه بلا إجراء محدد؛ الاستثناء (النجاح التلقائي) يحدث فقط عندما يحتوي الفلتر على إجراء واحد على الأقل والـIntent بلا إجراء، وهذا عكس ما تقوله العبارة، لذا فهي خاطئة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 58 (متوسط)
Which of the following broadcasts doesn't originate from Android System?
أ) A picture was captured
ب) New data has been downloaded
ج) The device starts charging
د) The system boots up
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة صراحة أن "Apps can also initiate broadcasts, such as to let other apps know that some data is downloaded to the device"، أي أن بث "تنزيل بيانات جديدة" هو مثال على بث يُطلقه التطبيق نفسه

وليس النظام.

أما التقاط صورة، وبدء الشحن، وإقلاع النظام فكلها أمثلة صريحة على بثوث تنشأ من نظام أندرويد نفسه.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 59 (متوسط)
What is the right code to start an activity by specifying its name explicitly in the intent?

أ) `Intent i=new Intent(); i.setComponent(new ComponentName(MainActivity.this, SecondActivity.class));`
ب) `Intent intent=new Intent(MainActivity.this, SecondActivity.class);`
ج) `Intent intent=new Intent(MainActivity, SecondActivity);` (بدون `.this` أو `.class`)
د) كلا (أ) و(ب) صحيحان
**الإجابة الصحيحة: د**
**التعليل:**
كلا الأسلوبين (أ) و(ب) صحيحان لإنشاء `Intent` صريح (`Explicit Intent`) يحدد المكوّن الهدف بدقة: إما عبر `setComponent(ComponentName(...))` مباشرة، أو عبر مُنشئ `Intent(Context, Class)` المختصر.

أما الخيار (ج) فخاطئ صياغياً لأنه يمرر أسماء الأصناف مباشرة (`MainActivity, SecondActivity`) دون `.this` أو `.class`، وهو كود غير صالح للترجمة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 60 (متوسط)
Which of the following statements is/are true about Intents?
أ) When we declare a general action to perform in the Intent, then we define implicit Intent
ب) If we do not declare any intent filters for an activity, then it can be started only with an explicit intent
ج) An Intent can be used to query from content provider
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
كلتا العبارتين (أ) و(ب) مطابقتان حرفياً لنص المحاضرة: تعريف إجراء عام (وليس مكوّناً محدداً) يجعل الـIntent ضمنياً (implicit)، و"If we do not declare any intent filters for an activity, then it can be started only with an explicit intent".

أما (ج) فخاطئة لأن مزوّدات المحتوى، خلافاً لبقية المكوّنات، تُفعَّل عبر `ContentResolver` وليس عبر `Intent`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 61 (متوسط)
Which of the following statements is/are true about Intent Fields?
أ) Flags field function as metadata for the intent
ب) Extras field is Key-value pairs that carry information required to accomplish the requested action
ج) Category field specifies additional information about the kind of component that should handle the intent
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الجمل الثلاث مطابقة حرفياً لنص المحاضرة: "Flags function as metadata for the intent"، "Extras are Key-value pairs that carry additional information required to accomplish the requested action"، و"A category is a string containing additional information about the kind of component that should handle the intent".

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 62 (متوسط)
Before trying to start up an activity using implicit intent, we should check if there is an Activity that can receive our action using ...... method.
أ) intent.resolve(getPackageManager()) != null
ب) intent.resolveActivity(getPackageManager()) != null
ج) intent.resolveActivity(getPackage()) == null
د) intent.resolveActivity(getPackageManager()) == null
**الإجابة الصحيحة: ب**
**التعليل:**
الدالة الصحيحة هي `resolveActivity()` (وليس `resolve()` كما في الخيار أ)، وتأخذ كائن `PackageManager` عبر `getPackageManager()` (وليس `getPackage()`)، والتحقق الصحيح قبل الإطلاق هو التأكد من أن النتيجة **ليست** `null` (أي يوجد فعلاً نشاط قادر على الاستجابة)،

وليس التحقق من كونها تساوي `null`.

## المحاضرة 5: Activity & Intents (المكوّن Activity والنوايا)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 63 (متوسط)
When another activity takes over the current activity (activity is no longer visible), then the current activity will be in ...... state.
أ) Resumed
ب) Stopped
ج) Paused
د) Destroyed
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة أن `onStop()` يُستدعى "عندما يغطي نشاط أُطلق حديثاً الشاشة بالكامل"، فيدخل النشاط الأصلي حالة `Stopped` لأنه لم يعد مرئياً على الإطلاق، بخلاف `Paused` التي تعني أنه ما زال مرئياً جزئياً.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 64 (متوسط)
Which of the following is an activity callback method?
أ) onStart()
ب) onConfigurationChanged()
ج) onActivityResult()
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
الدوال الثلاث كلها دوال رد نداء (`callback methods`) فعلية موجودة في صنف `Activity`: `onStart()` من دوال دورة الحياة الست الأساسية، و`onConfigurationChanged()` تُستدعى عند تغييرات التهيئة المُدارة يدوياً، و`onActivityResult()` تُستدعى عند عودة نتيجة من نشاط بدأ عبر `startActivityForResult()`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 65 (متوسط)
Which of the following Intent fields the system is used to search for the best activity that can receive an Implicit Intent?
أ) Data
ب) Extras
ج) flags
د) All of the above
**الإجابة الصحيحة: أ**
**التعليل:**
تنص المحاضرة أن النظام يبحث عن أفضل نشاط لـIntent ضمني بمقارنته بفلاتر الـIntent بناءً على ثلاثة جوانب فقط: `Action`، `Data`، و`Category`.

أما `Extras` و`Flags` فهي بيانات مصاحبة "لا تؤثر على كيفية تحليله (resolution) لمكوّن تطبيق" كما تنص المحاضرة صراحة، لذا من بين الخيارات المتاحة فإن `Data` هي الحقل الوحيد المشارك فعلياً في هذا البحث.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 66 (متوسط)
Which field in the Intent does the value "text/html" belong to?
أ) Type
ب) Action
ج) Data
د) Extras
**الإجابة الصحيحة: ج**
**التعليل:**
كما في السؤال المطابق في الفصل الأول، تُصنَّف قيمة نوع `MIME` مثل "text/html" ضمن حقل `Data` في تصنيف عناصر الـIntent الستة المعتمد في المحاضرة (Component name, Action, Data, Category, Extras, Flags)،

وليست حقلاً منفصلاً باسم "Type".

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 67 (متوسط)
Which of the following callback methods is used to inflate the layout file for an application?
أ) onCreate()
ب) onStart()
ج) onRestart()
د) onResume()
**الإجابة الصحيحة: أ**
**التعليل:**
`onCreate()` هي المكان القياسي لاستدعاء `setContentView()` (أو `setContent{}` في Compose) لأول مرة لعرض تصميم الشاشة، لأنها تُستدعى مرة واحدة فقط عند إنشاء النشاط لأداء "منطق بدء التشغيل الأساسي" كما ورد في المحاضرة.

باقي الدوال (`onStart`, `onRestart`, `onResume`) تخص التحكم بالظهور والتفاعل بعد أن يكون التصميم قد عُرض بالفعل.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 68 (متوسط)
Which of the following callback methods we should use to persist any state information, release resources that are not needed while the app is not visible?
أ) onResume()
ب) onStop()
ج) onRestart()
د) Both b and c
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة حرفياً عن `onStop()`: "Release or adjust resources that are not needed while the app is not visible to the user...

Perform relatively CPU-intensive shutdown operations. Example, to save information to a database".

أما `onRestart()` فهي لاستعادة الحالة عند العودة، وليست لحفظ البيانات أو تحرير الموارد.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 69 (متوسط)
An activity is currently visible and in the foreground. The user presses the home button to minimize the app. Which callback method(s) will be called?
أ) onPause()
ب) onStop()
ج) onDestroy()
د) both a and b
**الإجابة الصحيحة: د**
**التعليل:**
الضغط على زر الهوم يجعل النشاط ينتقل مباشرة من `Resumed` إلى أن يصبح غير مرئي تماماً، فيستدعي النظام `onPause()` أولاً (أول إشارة على المغادرة) ثم `onStop()` فوراً بعد ذلك (لأن النشاط أصبح غير مرئي بالكامل)، دون استدعاء `onDestroy()` لأن النشاط ما زال موجوداً في الذاكرة وقابلاً للعودة إليه.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 70 (متوسط)
An activity is currently paused and in the background. The user taps on the app icon to bring it back to the foreground. Which callback method(s) will be called?
أ) onStart()
ب) onResume()
ج) onRestart()
د) All of the above
**الإجابة الصحيحة: د**
**التعليل:**
عند عودة نشاط كان متوقفاً بالكامل في الخلفية، يستدعي النظام بالترتيب `onRestart()` (لأنه يعود من حالة Stopped)، ثم `onStart()` تلقائياً (كما تنص المحاضرة: "تُتبع هذه الدالة دائماً بـ onStart()")، ثم `onResume()` ليصبح تفاعلياً بالكامل من جديد؛ أي الدوال الثلاث تُستدعى معاً بالتتابع.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 71 (متوسط)
Which of the following statements is/are true about Activities?
أ) Activities are created and managed by the Activity Class.
ب) Android can kill activities when it needs their resources.
ج) State changes of Activity are triggered by user actions only.
د) Both a and b
**الإجابة الصحيحة: د**
**التعليل:**
كل `Activity` تُنفَّذ فعلياً كصنف فرعي من `Activity` وتتم إدارتها عبره، وتنص المحاضرة صراحة أن احتمال قتل النظام لعملية معينة "يعتمد على حالة النشاط"، أي يستطيع النظام قتل الأنشطة لاسترجاع الموارد.

أما (ج) فخاطئة لأن تغييرات الحالة تحدث أيضاً بسبب تغييرات التهيئة وإجراءات النظام، وليس فقط بفعل المستخدم.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 72 (متوسط)
Which of the following statements is/are true about onCreate() callback method?
أ) It can be called more than once during Activity lifecycle.
ب) It takes a Bundle object containing the activity's previously saved state.
ج) During it, the activity is at the top of the activity stack, and captures all user input.
د) All of the above
**الإجابة الصحيحة: ب**
**التعليل:**
تنص المحاضرة حرفياً أن `onCreate()` يستقبل `savedInstanceState` وهو "كائن Bundle يحتوي حالة النشاط المحفوظة سابقاً"، وهذا يطابق (ب).

أما (أ) فخاطئة لأن `onCreate()` تُنفّذ "منطق بدء التشغيل... الذي يحدث مرة واحدة فقط طوال حياة النشاط" لكل نسخة (instance)، و(ج) خاطئة لأنها تصف حالة `Resumed` (حيث النشاط في المقدمة ويلتقط كل إدخال المستخدم)،

وليس حالة `onCreate()`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 73 (متوسط)
What is the primary purpose of the onConfigurationChanged(Configuration newConfig) method?
أ) To handle user interaction with the activity.
ب) To adapt the activity's layout to a new device configuration
ج) To restore the activity's state after being paused.
د) Both b and c
**الإجابة الصحيحة: ب**
**التعليل:**
الغرض الأساسي من `onConfigurationChanged()` هو السماح للنشاط بالتكيّف مع تغيّر في تهيئة الجهاز (كدوران الشاشة أو تغيّر اللغة) دون إعادة إنشاء النشاط بالكامل، أي "تكييف تخطيط النشاط مع تهيئة جهاز جديدة".

لا علاقة لها بالتفاعل المباشر مع المستخدم (أ) ولا باستعادة الحالة بعد الإيقاف المؤقت (ج)، فتلك مهمة `onRestoreInstanceState()`/`onResume()`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 74 (متوسط)
What is the primary purpose of an Intent in Android?
أ) To store data permanently on the device.
ب) To define the layout of an activity.
ج) To communicate between activities and components within an app or between different apps.
د) To handle user gestures on the screen.
**الإجابة الصحيحة: ج**
**التعليل:**
الـ`Intent` هو "كائن رسائل يمكنك استخدامه لطلب إجراء من مكوّن تطبيق آخر" كما تنص المحاضرة، أي وسيلة التواصل الرسمية بين الأنشطة والمكوّنات داخل التطبيق نفسه أو بين تطبيقات مختلفة تماماً.

لا علاقة له بتخزين البيانات بشكل دائم، ولا بتعريف تخطيط الواجهة، ولا بالتعامل المباشر مع لمسات المستخدم.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 75 (متوسط)
You want to display a web page from a URL within your app. Which type of Intent would you likely use?
أ) An explicit intent targeting a specific web browser activity.
ب) An implicit intent with action set to ACTION_VIEW and data set to the URL.
ج) A custom intent with a custom action defined in your app.
د) You cannot directly display web pages using Intents in Android.
**الإجابة الصحيحة: ب**
**التعليل:**
لعرض صفحة ويب، يُستخدم `Intent` ضمني بالإجراء `ACTION_VIEW` مع تحديد رابط الصفحة عبر خاصية `data` (كما في مثال المحاضرة `data = Uri.parse("https://example.com")` مع `addCategory(Intent.CATEGORY_BROWSABLE)`)، تاركاً للنظام اختيار أي متصفح متاح على الجهاز، بدل تحديد متصفح معيّن صراحةً (أ) أو اختراع إجراء مخصص (ج) لا يفهمه أي متصفح.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 76 (متوسط)
What is the difference between an explicit and implicit Intent?
أ) Explicit Intents specify the exact component to launch, while implicit Intents allow the system to choose the best fit.
ب) Explicit Intents are used for launching activities within the same app, while implicit Intents are used for launching activities in other apps.
ج) Explicit Intents require permissions, while implicit Intents do not.
د) Both a and b
**الإجابة الصحيحة: أ**
**التعليل:**
يطابق هذا تعريف المحاضرة تماماً: "Explicit intents specify which component...

will satisfy the intent... Implicit intents do not name a specific component, but instead declare a general action to perform"، فيختار النظام المكوّن المناسب.

أما (ب) فتعميم غير دقيق (فالـIntent الصريح يمكن استخدامه أيضاً بين التطبيقات إن عُرف اسم المكوّن)، و(ج) خاطئة لأن الحاجة للأذونات لا ترتبط بنوع الـIntent بل بإعدادات المكوّن الهدف نفسه.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 77 (متوسط)
Which method can be used to check if an activity can handle a specific Intent before launching it?
أ) startActivity(Intent intent)
ب) resolveActivity(Intent intent, PackageManager pm)
ج) onActivityResult(int requestCode, int resultCode, Intent data)
د) There's no way to check compatibility before launch.
**الإجابة الصحيحة: ب**
**التعليل:**
الدالة `resolveActivity(PackageManager)` على كائن الـ`Intent` تسمح بالتحقق مسبقاً مما إذا كان هناك نشاط قادر على معالجة هذا الـIntent قبل استدعاء `startActivity()` فعلياً، وهذا يمنع حدوث استثناء (`ActivityNotFoundException`) إن لم يوجد تطبيق مناسب.

أما `startActivity()` فتُطلق النشاط مباشرة دون تحقق مسبق، و`onActivityResult()` تخص استقبال نتيجة بعد الإطلاق.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 78 (متوسط)
What is the purpose of Intent filters in Android?
أ) To define the layout of an activity launched using an Intent.
ب) To manage the lifecycle of an Intent object.
ج) To specify which Intents an activity can respond to.
د) To encrypt data transferred between activities using Intents.
**الإجابة الصحيحة: ج**
**التعليل:**
تنص المحاضرة أن الأنشطة "يمكن اختيارياً تضمين فلاتر intent تصرّح عن قدرات النشاط بحيث يستطيع الاستجابة لـintents من تطبيقات أخرى"، أي أن فلتر الـIntent هو إعلان صريح عن أنواع الـIntents الضمنية التي يستطيع المكوّن معالجتها.

لا علاقة له بتعريف تخطيط الواجهة، ولا بإدارة دورة حياة كائن الـIntent، ولا بالتشفير.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 79 (متوسط)
How can fragments communicate with their hosting activity?
أ) By directly accessing the activity's private member variables.
ب) Fragment communication with the activity is not possible.
ج) By defining an interface in the fragment, implementing it in the activity, then calling methods on the interface from the fragment.
د) Communication happens through the Android framework automatically.
**الإجابة الصحيحة: ج**
**التعليل:**
النمط الرسمي الموصى به تاريخياً للتواصل من الـ`Fragment` إلى الـ`Activity` المضيفة هو تعريف واجهة (`interface`) داخل الـ`Fragment`، ثم تنفيذها (`implement`) في الـ`Activity` المضيفة، بحيث يستدعي الـ`Fragment` دوال هذه الواجهة دون معرفة تفاصيل الـ`Activity` الفعلية مباشرة — وهذا يحافظ على فصل المسؤوليات (decoupling) بين المكوّنين.

الوصول المباشر لمتغيّرات خاصة (أ) ينتهك مبدأ التغليف (encapsulation) وغير ممكن أصلاً بسبب خصوصية (`private`) تلك المتغيّرات.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 80 (متوسط)
You're developing a music player app. How could you use Intents to allow users to share a song with other apps?
أ) By creating an implicit intent with action set to ACTION_SEND.
ب) By creating an implicit intent with action set to ACTION_VIEW.
ج) By creating an explicit intent with specific component name.
د) By directly copying the song file to another app's storage.
**الإجابة الصحيحة: أ**
**التعليل:**
`ACTION_SEND` هو الإجراء القياسي المخصص لمشاركة بيانات (نص، صورة، ملف صوتي) مع أي تطبيق آخر قادر على استقبالها

بينما `ACTION_VIEW` يُستخدم لعرض بيانات موجودة (كصفحة ويب) وليس لمشاركتها.

استخدام `Intent` صريح (ج) يقيّد المشاركة بتطبيق واحد محدد بدلاً من ترك النظام يعرض كل الخيارات المتاحة، ونسخ الملف مباشرة (د) يخترق عزل الـSandbox بين التطبيقات.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 81 (متوسط)
What happens when the user presses the Back button during working on an app?
أ) Current activity is destroyed and previous activity is resumed.
ب) Current activity is stopped and previous activity is resumed.
ج) Current activity is destroyed and previous activity is restarted.
د) Current activity is paused and previous activity is restarted.
**الإجابة الصحيحة: أ**
**التعليل:**
الضغط على زر الرجوع يُنهي النشاط الحالي فعلياً (استدعاء ضمني لـ`finish()` يؤدي إلى `onPause→onStop→onDestroy`)، ويُزال نهائياً من مكدّس الأنشطة (`back stack`)

بينما يُستأنف النشاط السابق مباشرة من حالته المحفوظة (`onRestart→onStart→onResume`) وليس إعادة تشغيله من الصفر (`restarted` بمعنى إعادة إنشاء كامل).

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 82 (متوسط)
How does an app typically present a permission dialog to the user?
أ) By modifying a permission flag in the AndroidManifest.xml file.
ب) By using ActivityCompat.requestPermissions(Activity activity, String[] permissions, int requestCode) method.
ج) By using <uses-permission android:name="string" /> tag.
د) By using ContextCompat.checkSelfPermission(Context context, String permission) method.
**الإجابة الصحيحة: ب**
**التعليل:**
الدالة `ActivityCompat.requestPermissions()` هي التي تُطلق فعلياً حوار طلب الإذن أمام المستخدم وقت التشغيل.

عنصر `<uses-permission>` في الـManifest هو مجرد تصريح ثابت لا يعرض أي حوار بحد ذاته لأذونات "الخطرة"، و`checkSelfPermission()` تتحقق فقط من الحالة الحالية للإذن دون طلبه.

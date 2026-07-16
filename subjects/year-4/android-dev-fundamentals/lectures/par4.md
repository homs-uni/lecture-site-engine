# المحاضرة 4 — Application Fundamentals (أساسيات التطبيق)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** `App Components`، `AndroidManifest.xml`، `App Resources`، `Jetpack Compose Basics`

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1. Kotlin Basics | `Kotlin`, `IntelliJ` | فهم بنية اللغة |
| 2. Kotlin OOP | `class`, `inheritance` | كائنات وتصميم برمجي |
| 3. Android Platform | `Gradle`, `ART`, `Linux Kernel` | فهم بنية النظام |
| 4. Application Fundamentals ← أنت هنا | `Activity`, `Service`, `Broadcast Receiver`, `Content Provider`, `AndroidManifest.xml` | بناء تطبيق متكامل المكونات |
| 5. Activity & Intents | `Intent`, `Lifecycle` | ربط الشاشات ببعضها |
| 6. Compose UI | `@Composable`, `Modifier` | بناء الواجهات |

> **نوع هذه المحاضرة:** نظري بامتياز — تشرح المكونات الأساسية (Building Blocks) لأي تطبيق أندرويد، مع لمسة عملية (كود Kotlin/Compose) في النهاية عبر مثال `GreetingCard`.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. لغات البناء وصيغ الحزمة (APK vs AAB)

#### النص الأصلي يقول (English):
> "Android apps can be written using Kotlin, Java, and C++ languages. The Android SDK tools compile your code along with any data and resource files into an APK or an Android App Bundle."

#### الشرح المبسّط:
أندرويد يسمح لك بكتابة التطبيق بأكثر من لغة (`Kotlin` هي المفضّلة رسمياً اليوم، ويمكن أيضاً `Java` أو `C++` للأجزاء الحسّاسة للأداء). بعد كتابة الكود، أدوات الـ `SDK` تجمع كل شيء (الكود + الصور + الملفات) في ملف واحد قابل للتثبيت أو النشر.

**لماذا؟** لأن الجهاز لا يستطيع تشغيل ملفات متفرقة؛ يحتاج حزمة واحدة منظمة يعرف كيف يفكّكها وينفذها.

#### 💡 التشبيه:
> تخيل أنك تجهّز "حقيبة سفر" فيها كل ملابسك وأدواتك بدل حمل كل قطعة لوحدها في يدك.
> **وجه الشبه:** الحقيبة = ملف APK/AAB، الملابس والأدوات = الكود والموارد.

#### النص الأصلي يقول (English):
> "An Android package, which is an archive file with an .apk suffix, contains the contents of an Android app required at runtime, and it is the file that Android-powered devices use to install the app."

#### الشرح المبسّط:
ملف `.apk` هو الملف الجاهز فعلياً للتثبيت المباشر على الجهاز — كل ما يحتاجه التطبيق ليعمل وقت التشغيل (Runtime) موجود بداخله.

#### النص الأصلي يقول (English):
> "An Android App Bundle, which is an archive file with an .aab suffix, contains the contents of an Android app project, including some additional metadata that isn't required at runtime. An AAB is a publishing format and can't be installed on Android devices. It defers APK generation and signing to a later stage."

#### الشرح المبسّط:
ملف `.aab` هو صيغة **نشر فقط** (Publishing Format) — لا يمكن تثبيته مباشرة على الجهاز. هو أشبه بـ"القالب الأم" الذي يحتوي كل شيء + معلومات إضافية، ثم يُرسل لمتجر Google Play الذي يقوم بتوليد ملفات APK مخصصة منه لاحقاً.

**لماذا؟** لتقليل حجم التطبيق النهائي على كل جهاز، فبدل تثبيت كل الموارد (لغات، دقة شاشات مختلفة) على كل الأجهزة، يولّد المتجر نسخة مخصصة لكل جهاز فقط.

#### النص الأصلي يقول (English):
> "When distributing your app through Google Play, Google Play's servers generate optimized APKs that contain only the resources and code that are required by the particular device requesting installation of the app."

#### الشرح المبسّط:
خوادم Google Play تأخذ ملف الـ AAB وتصنع منه نسخ APK "محسّنة" (Optimized) حسب مواصفات كل جهاز طلب التثبيت — فمثلاً جهاز عربي يحصل على موارد اللغة العربية فقط دون غيرها.

```algorithm
1 | كتابة الكود بلغة Kotlin/Java/C++ | Android Studio | يكتب المطوّر منطق التطبيق وواجهاته
2 | تجميع الكود والموارد | Gradle/SDK Tools | يدمج كل الملفات في أرشيف واحد
3 | اختيار صيغة الإخراج | Build System | ينتج .apk للتثبيت المباشر أو .aab للنشر
4 | رفع AAB إلى المتجر | Google Play Console | يستقبل المتجر الحزمة الكاملة
5 | توليد APK مخصص | Google Play Servers | يُنشئ نسخة مخصصة لكل جهاز طلب التثبيت
```

#### نقاط التنفيذ:
- لا يمكن للمستخدم تثبيت ملف `.aab` مباشرة — هو للنشر فقط عبر المتجر.
- التوقيع (Signing) وتوليد الـ APK النهائي يتأجلان حتى مرحلة توزيع المتجر.

#### مهم للامتحان ⚠️:
> الفرق بين APK وAAB هو سؤال كلاسيكي: APK = جاهز للتثبيت، AAB = جاهز للنشر فقط.

---

### 2. صندوق الحماية الأمني (Security Sandbox)

#### النص الأصلي يقول (English):
> "Each Android app lives in its own security sandbox... The Android operating system is a multi-user Linux system in which each app is a different user."

#### الشرح المبسّط:
كل تطبيق أندرويد يُعامَل وكأنه "مستخدم" مختلف تماماً على نظام Linux، حتى لو كان الجهاز يُستخدم من شخص واحد. هذا يعني أن كل تطبيق معزول عن غيره تماماً.

#### النص الأصلي يقول (English):
> "By default, the system assigns each app a unique Linux user ID, which is used only by the system and is unknown to the app. The system sets permissions for all the files in an app so that only the user ID assigned to that app can access them."

#### الشرح المبسّط:
النظام يعطي كل تطبيق رقم هوية مستخدم فريد (`User ID`) لا يعرفه التطبيق نفسه، ويستخدمه النظام فقط للتحقق من الصلاحيات، فلا يستطيع تطبيق قراءة ملفات تطبيق آخر إلا بإذن صريح.

#### النص الأصلي يقول (English):
> "Each process has its own virtual machine (VM), so an app's code runs in isolation from other apps... By default, every app runs in its own Linux process."

#### الشرح المبسّط:
كل تطبيق يشغَّل داخل "عملية" (Process) خاصة به وآلة افتراضية (VM) خاصة به، فحتى لو انهار تطبيق أو حصل خلل، لا يؤثر على التطبيقات الأخرى.

#### 💡 التشبيه:
> كل تطبيق يعيش في "شقة" منفصلة بمفتاح خاص به، لا يستطيع الدخول لشقة الجار إلا إذا أعطاه الجار مفتاحاً (إذناً).
> **وجه الشبه:** الشقة = صندوق الحماية (Sandbox)، المفتاح = الصلاحيات (Permissions).

#### النص الأصلي يقول (English):
> "The Android system implements the principle of least privilege. That is, each app, by default, has access only to the components that it requires to do its work and no more."

#### الشرح المبسّط:
مبدأ "أقل الصلاحيات الممكنة" — التطبيق لا يحصل تلقائياً إلا على الحد الأدنى مما يحتاجه، وأي شيء إضافي (كاميرا، إنترنت، جهات اتصال) يجب طلبه صراحة.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا يعطي أندرويد كل تطبيق عملية Linux منفصلة بدل تشغيل كل التطبيقات في نفس العملية؟
> **لماذا هذا مهم؟** لأن هذا هو أساس الأمان في أندرويد بالكامل — بدونه لأمكن لأي تطبيق التجسس على بيانات تطبيق آخر.

---

### 3. مكونات التطبيق الأربعة (App Components)

#### النص الأصلي يقول (English):
> "App components are the essential building blocks of an Android app. Each component is an entry point through which the system or a user can enter your app... There are four types of app components: Activities, Services, Broadcast receivers, Content providers."

#### الشرح المبسّط:
أي تطبيق أندرويد مبني من 4 "لبنات أساسية" (Building Blocks)، وكل واحدة منها هي "نقطة دخول" (Entry Point) يمكن للنظام أو المستخدم أو حتى تطبيق آخر أن يدخل من خلالها إلى تطبيقك. كل نوع له دورة حياة (Lifecycle) مختلفة تحدد كيف يُنشأ ومتى يُدمَّر.

| المكوّن | الوظيفة الأساسية | يملك واجهة مستخدم؟ |
| --- | --- | --- |
| `Activity` | شاشة تفاعل واحدة مع المستخدم | نعم |
| `Service` | عمل في الخلفية دون واجهة | لا |
| `Broadcast Receiver` | استقبال إشعارات/أحداث من النظام | لا (قد يُنشئ إشعار Notification) |
| `Content Provider` | إدارة ومشاركة بيانات بين التطبيقات | لا |

#### النص الأصلي يقول (English):
> "A unique aspect of the Android system design is that any app can start another app's component. Example: if you want the user to capture a photo with the device camera, there's probably another app that does that—and your app can use it instead of developing an activity to capture a photo yourself."

#### الشرح المبسّط:
ميزة فريدة في أندرويد: تطبيقك يستطيع "استعارة" مكوّن من تطبيق آخر. مثلاً بدل أن تكتب كود لتصوير صورة بنفسك، تطلب من تطبيق الكاميرا الموجود مسبقاً أن يقوم بذلك، ثم يعيد لك النتيجة (الصورة) وكأنها جزء من تطبيقك.

#### النص الأصلي يقول (English):
> "When the system starts a component, it starts the process for that app, if it's not already running... if your app starts the activity in the camera app that captures a photo, that activity runs in the process that belongs to the camera app, not in your app's process."

#### الشرح المبسّط:
عندما تستدعي مكوّناً من تطبيق آخر، فإن ذلك المكوّن يعمل داخل عملية (Process) التطبيق الآخر، وليس داخل عملية تطبيقك — رغم أن المستخدم يشعر وكأن كل شيء يحدث داخل تطبيق واحد.

#### النص الأصلي يقول (English):
> "Unlike apps on most other systems, Android apps don't have a single entry point: there's no main() function."

#### الشرح المبسّط:
في لغات البرمجة التقليدية (مثل C أو Java العادية)، يبدأ البرنامج من دالة واحدة اسمها `main()`. لكن في أندرويد، لا يوجد نقطة بداية واحدة — أي مكوّن من الأربعة يمكن أن يكون "نقطة الدخول" حسب كيفية تشغيل التطبيق.

#### النص الأصلي يقول (English):
> "Because the system runs each app in a separate process with file permissions that restrict access to other apps, your app can't directly activate a component from another app. However, the Android system can. To activate a component in another app, you deliver a message to the system that specifies your intent to start a particular component. The system then activates the component for you."

#### الشرح المبسّط:
لا يمكنك مباشرة "استدعاء" مكوّن تطبيق آخر (بسبب العزل الأمني)، بل ترسل "رسالة" (Intent) إلى النظام تشرح فيها ماذا تريد، والنظام هو من ينفّذ الاستدعاء نيابة عنك.

#### 💡 التشبيه:
> بدل أن تدخل بيت الجار مباشرة، ترسل طلباً للحارس (النظام) ليطرق الباب لك.
> **وجه الشبه:** الحارس = نظام أندرويد، الطلب المكتوب = `Intent`.

#### الفهم الخاطئ الشائع ❌: أندرويد يشبه أي لغة برمجة عادية فيه دالة `main()` تبدأ التنفيذ.
#### الفهم الصحيح ✅: لا يوجد `main()` في أندرويد؛ أي مكوّن (Activity/Service/Receiver) يمكن أن يكون نقطة البداية حسب كيف بدأ النظام تشغيل التطبيق.

---

### 4. المكوّن الأول: Activity

#### النص الأصلي يقول (English):
> "An activity is the entry point for interacting with the user. It represents a single screen with a user interface."

#### الشرح المبسّط:
`Activity` تمثل شاشة واحدة يتفاعل معها المستخدم مباشرة (زر، نص، صورة...).

#### النص الأصلي يقول (English):
> "An email app might have one activity that shows a list of new emails, another activity to compose an email, and another activity for reading emails... A different app can start any one of these activities if the email app allows it."

#### الشرح المبسّط:
تطبيق البريد قد يحتوي عدة شاشات (Activities): قائمة الرسائل، كتابة رسالة، قراءة رسالة — كل شاشة مستقلة لكنها تتعاون لتشكيل تجربة واحدة، وأي شاشة منها يمكن استدعاؤها من تطبيق آخر (مثل تطبيق كاميرا يفتح شاشة "كتابة بريد" لمشاركة صورة).

#### النص الأصلي يقول (English):
> "An activity facilitates the following key interactions between system and app: Keeping track of what the user currently cares about... Knowing which previously used processes contain stopped activities the user might return to... Helping the app handle having its process killed so the user can return to activities with their previous state restored... Providing a way for apps to implement user flows between each other... The primary example of this is sharing."

#### الشرح المبسّط:
الـ `Activity` تساعد النظام على:
1. معرفة ما يهتم به المستخدم الآن (الشاشة الظاهرة) للحفاظ على عمليتها حيّة.
2. تذكّر الشاشات المتوقفة التي قد يعود إليها المستخدم.
3. استعادة حالة الشاشة (State) إذا قُتلت العملية لتوفير الذاكرة.
4. تمكين "المشاركة" (Sharing) بين التطبيقات المختلفة.

#### النص الأصلي يقول (English):
> "An activity is implemented as a subclass of Activity class."

#### الشرح المبسّط:
من الناحية البرمجية، تُكتب أي شاشة كصنف (Class) يرث من `Activity` (أو من فئات حديثة مثل `ComponentActivity` في Compose).

> **ملاحظة إضافية (شرح زيادة للفهم):** في التطوير الحديث بـ Jetpack Compose، غالباً تُستخدم `ComponentActivity` كصنف أساسي بدلاً من `Activity` أو `AppCompatActivity`.

#### النص الأصلي يقول (English):
> "In modern Android development, Google promotes a single-activity architecture pattern for most applications. Instead of multiple Activities, apps typically use: A single Activity as a host, Multiple UI destinations managed via Jetpack Compose navigation."

#### الشرح المبسّط:
التوجّه الحديث في أندرويد لم يعد "شاشة = Activity منفصلة"، بل صار "تطبيق = Activity واحدة" (Single-Activity Architecture)، وكل الشاشات داخلها تُدار كـ"وجهات" (Destinations) عبر التنقل في Compose (`NavHost`/`NavController`) بدل إنشاء Activity جديدة لكل شاشة.

#### ⚖️ المقايضة: Multiple Activities مقابل Single Activity + Compose Navigation

| | Multiple Activities (القديم) | Single Activity + Compose Nav (الحديث) |
| --- | --- | --- |
| المزايا | عزل كامل بين الشاشات، سهل الفهم أول الأمر | تنقّل أسرع، مشاركة حالة أسهل، أداء أفضل |
| العيوب | استهلاك ذاكرة أكبر، كود مكرر بين الشاشات | يحتاج فهم أعمق لـ `NavController` والحالة |
| متى تختاره | تطبيقات قديمة أو تحتاج فصل أمني تام بين الشاشات | كل تطبيق حديث يُبنى بـ Jetpack Compose |

---

### 5. المكوّن الثاني: Service

#### النص الأصلي يقول (English):
> "A Service is a general-purpose entry point for keeping an app running in the background for all kinds of reasons. It is a component that runs in the background to perform long-running operations or to perform work for remote processes. A service does not provide a user interface."

#### الشرح المبسّط:
`Service` هو مكوّن يعمل في الخلفية **بدون واجهة مستخدم مرئية** — مثالياً لأي عمل طويل أو مستمر لا يحتاج تفاعلاً مباشراً من المستخدم.

#### النص الأصلي يقول (English):
> "A service might play music in the background while the user is in a different app. A service might fetch data over the network without blocking user interaction with an activity."

#### الشرح المبسّط:
مثالان كلاسيكيان: تشغيل موسيقى أثناء استخدام تطبيق آخر، أو تنزيل بيانات من الإنترنت دون تجميد الشاشة.

#### النص الأصلي يقول (English):
> "Another component, such as an activity, can start the service and let it run or bind to it in order to interact with it. There are two types of services that tell the system how to manage an app: started services and bound services."

#### الشرح المبسّط:
يوجد طريقتان للتعامل مع Service: إما "تشغيله وتركه يعمل" (`Started`)، أو "الارتباط به للتفاعل معه" (`Bound`).

#### النص الأصلي يقول (English):
> "Started services tell the system to keep them running until their work is completed... Music playback is something the user is directly aware of, and the app communicates this to the system by indicating that it wants to be in the foreground, with a notification to tell the user that it is running... A regular background service is not something the user is directly aware of, so the system has more freedom in managing its process."

#### الشرح المبسّط:
- **Foreground Service:** المستخدم يعرف أنه يعمل (مثل تشغيل الموسيقى)، لذا يظهر إشعار دائم، والنظام يحميه من الإغلاق.
- **Background Service:** يعمل دون أن يشعر المستخدم، لذا النظام "حر" في إيقافه إذا احتاج الذاكرة لشيء أهم، وقد يعيد تشغيله لاحقاً.

#### النص الأصلي يقول (English):
> "Bound services run because some other app (or the system) has said that it wants to make use of the service. A bound service provides an API to another process... A bound service runs only as long as another application component is bound to it. Multiple components can bind to the service at once, but when all of them unbind, the service is destroyed."

#### الشرح المبسّط:
الـ Bound Service يعيش طالما هناك مكوّن آخر مرتبط به. عندما ينفصل الجميع، يُدمَّر تلقائياً. يمكن لعدة مكونات الارتباط به في نفس الوقت.

#### النص الأصلي يقول (English):
> "A service is implemented as a subclass of Service class."

#### الشرح المبسّط:
برمجياً، تُكتب كصنف يرث من `Service`.

#### النص الأصلي يقول (English):
> "In modern Android development, Services are no longer the default choice for background work. For most background work, Google recommends alternative components: Kotlin Coroutines, WorkManager."

#### الشرح المبسّط:
اليوم، لا يُنصح باستخدام `Service` كخيار افتراضي لكل عمل خلفي. البدائل الحديثة:
- `Kotlin Coroutines`: لعمليات غير متزامنة قصيرة/متوسطة مرتبطة بدورة حياة التطبيق.
- `WorkManager`: لعمل مؤجّل أو دوري يجب أن يُنفَّذ حتى لو أُغلق التطبيق أو أُعيد تشغيل الجهاز.

#### 💡 التشبيه:
> `Service` كموظف يعمل خلف الكواليس بلا واجهة أمامية للزبون.
> **وجه الشبه:** الموظف خلف الكواليس = Service، الزبون = المستخدم الذي لا يراه مباشرة.

#### ⚖️ المقايضة: Started Service مقابل Bound Service

| | Started Service | Bound Service |
| --- | --- | --- |
| المزايا | يستمر حتى بعد انتهاء المكوّن الذي شغّله | تحكم دقيق عبر API مباشر بين المكونات |
| العيوب | لا يعيد نتيجة مباشرة لمن شغّله بسهولة | يموت فور انفصال آخر مكوّن مرتبط |
| متى تختاره | تشغيل موسيقى، مزامنة بيانات مستمرة | تطبيق يحتاج التواصل التفاعلي المباشر مع الخدمة |

---

### 6. المكوّن الثالث: Broadcast Receiver

#### النص الأصلي يقول (English):
> "A broadcast receiver is a component that lets the system deliver events to the app outside of a regular user flow so the app can respond to system-wide broadcast announcements. Because broadcast receivers are another well-defined entry into the app, the system can deliver broadcasts even to apps that aren't currently running."

#### الشرح المبسّط:
`Broadcast Receiver` يستقبل "إعلانات" أو أحداث عامة من النظام (مثل انخفاض البطارية) دون أن يكون التطبيق مفتوحاً حتى! النظام يستطيع "إيقاظ" التطبيق فقط لمعالجة هذا الحدث.

#### النص الأصلي يقول (English):
> "Example: an app can schedule an alarm to post a notification to tell the user about an upcoming event. Because the alarm is delivered to a BroadcastReceiver in the app, there is no need for the app to remain running until the alarm goes off."

#### الشرح المبسّط:
مثال: منبّه لحدث قادم — لا داعي لإبقاء التطبيق مفتوحاً طوال الوقت، فقط ينتظر النظام حتى يحين الوقت ثم يستدعي الـ Receiver.

#### النص الأصلي يقول (English):
> "Many broadcasts originate from the system, like a broadcast announcing that the screen is turned off, the battery is low, or a picture is captured. Apps can also initiate broadcasts, such as to let other apps know that some data is downloaded to the device and is available for them to use."

#### الشرح المبسّط:
الإشعارات (Broadcasts) قد تأتي من النظام نفسه (شاشة مطفأة، بطارية منخفضة) أو من تطبيقات أخرى (مثل إعلام أن ملفاً جديداً تم تنزيله).

#### النص الأصلي يقول (English):
> "Although broadcast receivers don't display a user interface, they can create a status bar notification to alert the user when a broadcast event occurs. More commonly, though, a broadcast receiver is just a gateway to other components and is intended to do a very minimal amount of work."

#### الشرح المبسّط:
لا يملك Broadcast Receiver واجهة مستخدم، لكنه قد يُنشئ إشعاراً (Notification) في شريط الحالة. غالباً دوره هو "بوابة" بسيطة تُحوّل العمل الفعلي لمكوّن آخر.

#### النص الأصلي يقول (English):
> "For instance, a broadcast receiver might schedule a JobService to perform some work based on an event using JobScheduler. A BroadcastReceiver should be used to react to events, not to perform heavy work."

#### الشرح المبسّط:
مثلاً، يستقبل الحدث ثم يجدوَل عملاً أثقل عبر `JobScheduler`. **القاعدة الذهبية:** لا تنفّذ عملاً ثقيلاً مباشرة داخل الـ Receiver.

#### النص الأصلي يقول (English):
> "A broadcast receiver is implemented as a subclass of BroadcastReceiver class and each broadcast message is delivered as an Intent object."

#### الشرح المبسّط:
برمجياً: صنف يرث من `BroadcastReceiver`، وكل رسالة بث تصل ككائن `Intent`.

#### مهم للامتحان ⚠️:
> تذكّر: BroadcastReceiver = رد فعل سريع على حدث، وليس مكاناً لتنفيذ عمل ثقيل أو طويل.

---

### 7. المكوّن الرابع: Content Provider

#### النص الأصلي يقول (English):
> "A content provider manages a shared set of app data that you can store in the file system, in a SQLite database, on the web, or on any other persistent storage location that your app can access. Through the content provider, other apps can query or modify the data, if the content provider permits it."

#### الشرح المبسّط:
`Content Provider` هو "بوابة رسمية" لإدارة بيانات مشتركة يمكن تخزينها بأي طريقة (ملفات، قاعدة بيانات SQLite، الإنترنت...)، وتتيح لتطبيقات أخرى الاستعلام عنها أو تعديلها **بإذن**.

#### النص الأصلي يقول (English):
> "Example: the Android system provides a content provider that manages the user's contact information. Any app with the proper permissions can query the content provider, such as using ContactsContract.Data, to read and write information about a particular person."

#### الشرح المبسّط:
مثال حقيقي: مزوّد المحتوى الخاص بجهات الاتصال في أندرويد — أي تطبيق يملك الصلاحية المناسبة يمكنه قراءة/كتابة بيانات جهة اتصال معينة.

#### النص الأصلي يقول (English):
> "To the system, a content provider is an entry point into an app for publishing named data items, identified by a URIs, which other apps can use to access the data."

#### الشرح المبسّط:
البيانات تُعرَّف بواسطة عناوين URI فريدة:
- `content://com.example.app/users` → كل المستخدمين
- `content://com.example.app/users/1` → مستخدم محدد رقم 1

#### النص الأصلي يقول (English):
> "Content providers are also useful for reading and writing data that is private to your app and not shared."

#### الشرح المبسّط:
ليس شرطاً أن تكون البيانات مشتركة مع تطبيقات أخرى — يمكن استخدام Content Provider حتى لتنظيم بيانات خاصة بالتطبيق نفسه.

#### النص الأصلي يقول (English):
> "A content provider is implemented as a subclass of ContentProvider and must implement a standard set of APIs that enable other apps to perform transactions."

#### الشرح المبسّط:
برمجياً: صنف يرث من `ContentProvider` وينفّذ مجموعة عمليات قياسية (query, insert, update, delete) تسمح لتطبيقات أخرى بالتعامل معه.

#### 💡 التشبيه:
> Content Provider كـ"موظف استقبال" في مكتبة، لا يدخل أحد إلى المستودع مباشرة، بل يطلب من الموظف إحضار الكتاب.
> **وجه الشبه:** موظف الاستقبال = Content Provider، المستودع = قاعدة البيانات الفعلية.

---

### 8. تفعيل المكونات (Activate Components) والـ Intent

#### النص الأصلي يقول (English):
> "An asynchronous message called an intent activates three of the four component types: activities, services, and broadcast receivers. Intents bind individual components to each other at runtime."

#### الشرح المبسّط:
`Intent` هو رسالة غير متزامنة (Asynchronous) تُستخدم لتفعيل 3 من أصل 4 مكونات: Activity وService وBroadcast Receiver. تربط المكونات ببعضها أثناء التشغيل (Runtime).

#### النص الأصلي يقول (English):
> "An intent is created with an Intent object, which defines a message to activate either a specific component (an explicit intent) or a specific type of component (an implicit intent)."

#### الشرح المبسّط:
نوعان من الـ Intent:
- **Explicit Intent:** تحدد اسم المكوّن بالضبط (مثلاً `MainActivity` في نفس تطبيقك).
- **Implicit Intent:** تحدد فقط "نوع" العمل المطلوب (مثل "شارك صورة")، والنظام يختار المكوّن المناسب من أي تطبيق.

#### النص الأصلي يقول (English):
> "For activities and services, an intent defines the action to perform, such as to view or send something, and might specify the URI of the data to act on."

#### الشرح المبسّط:
بالنسبة للـ Activity والService، الـ Intent يحمل "الإجراء" (Action) مثل عرض أو إرسال، وأحياناً عنوان URI للبيانات المطلوب التعامل معها.

#### النص الأصلي يقول (English):
> "For broadcast receivers, the intent defines the broadcast announcement. Example, a broadcast to indicate that the device battery is low includes only a known action string that indicates battery is low."

#### الشرح المبسّط:
بالنسبة للـ Broadcast Receiver، الـ Intent يحمل فقط "نص إجراء" معروف (Action String) يوضح ما الحدث (مثل: البطارية منخفضة).

#### النص الأصلي يقول (English):
> "Unlike activities, services, and broadcast receivers, content providers are activated when targeted by a request from a ContentResolver. The content resolver handles all direct transactions with the content provider... This leaves a layer of abstraction for security reasons between the content provider and the component requesting information."

#### الشرح المبسّط:
الاستثناء: Content Provider **لا** يُفعَّل عبر Intent، بل عبر `ContentResolver` الذي يتعامل مع Provider نيابة عن المكوّن الطالب — طبقة حماية إضافية.

#### النص الأصلي يقول (English):
> "You can start an activity or give it something new to do by passing an Intent to startActivity() or, when you want the activity to return a result, startActivityForResult()."

#### الشرح المبسّط:
لتشغيل Activity: `startActivity()`، ولو أردت نتيجة (Result) من تلك الشاشة: `startActivityForResult()`.

#### النص الأصلي يقول (English):
> "On Android 5.0 (API level 21) and higher, you can use the JobScheduler class to schedule actions. For earlier Android versions, you can start a service or give new instructions to an ongoing service by passing an Intent to startService(). You can bind to the service by passing an Intent to bindService()."

#### الشرح المبسّط:
لتشغيل Service: `startService()`، وللارتباط به: `bindService()`. ومنذ Android 5.0، يفضَّل `JobScheduler` لجدولة المهام.

#### النص الأصلي يقول (English):
> "You can initiate a broadcast by passing an Intent to methods such as sendBroadcast() or sendOrderedBroadcast()."

#### الشرح المبسّط:
لإرسال بث: `sendBroadcast()` أو `sendOrderedBroadcast()` (الأخيرة تُرسل البث بترتيب محدد للمستقبلين).

#### النص الأصلي يقول (English):
> "You can perform a query to a content provider by calling query() on a ContentResolver."

#### الشرح المبسّط:
للتعامل مع Content Provider: استدعاء `query()` على كائن `ContentResolver`.

### جدول: طرق تفعيل كل مكوّن (مرجع سريع)

| المكوّن | طريقة التفعيل | ملاحظة |
| --- | --- | --- |
| `Activity` | `startActivity()` / `startActivityForResult()` | يُستخدم عند الحاجة لنتيجة رجوع |
| `Service` | `startService()` / `bindService()` | `JobScheduler` بديل حديث للجدولة |
| `Broadcast Receiver` | `sendBroadcast()` / `sendOrderedBroadcast()` | ترتيب الاستقبال ممكن في النوع الثاني |
| `Content Provider` | `query()` عبر `ContentResolver` | لا يُستخدم Intent مباشرة |

---

### 9. ملف المانيفست (AndroidManifest.xml)

#### النص الأصلي يقول (English):
> "Before the Android system can start an app component, the system must know that the component exists by reading the app's manifest file, AndroidManifest.xml. Your app declares all its components in AndroidManifest.xml, which is at the root of the app project directory."

#### الشرح المبسّط:
النظام **لا يعرف** بوجود أي مكوّن في تطبيقك إلا إذا صرّحت عنه في ملف `AndroidManifest.xml` الموجود في جذر مشروع التطبيق.

#### النص الأصلي يقول (English):
> "The manifest does a number of things in addition to declaring the app's components, such as the following: Identifies any user permissions the app requires... Declares the minimum API Level required by the app... Declares hardware and software features used or required by the app... Declares API libraries the app needs to be linked against."

#### الشرح المبسّط:
المانيفست يقوم بأكثر من مجرد تعريف المكونات:
1. الصلاحيات المطلوبة (إنترنت، جهات اتصال...).
2. أقل إصدار API مدعوم.
3. مواصفات الأجهزة/البرمجيات المطلوبة (كاميرا، بلوتوث...).
4. مكتبات API خارجية (مثل خرائط Google).

#### 💡 التشبيه:
> المانيفست كـ"بطاقة تعريف" للتطبيق يقدمها للنظام قبل السماح له بالعمل.
> **وجه الشبه:** بطاقة التعريف = AndroidManifest.xml، الحارس الذي يقرأها = نظام أندرويد.

#### النص الأصلي يقول (English):
> "In the <application> element, the android:icon attribute points to resources for an icon that identifies the app. In the <activity> element, the android:name attribute specifies the fully qualified class name of the Activity subclass, and the android:label attribute specifies a string to use as the user-visible label for the activity."

#### الشرح المبسّط:
شرح لعناصر مثال المانيفست:
- `android:icon` → أيقونة التطبيق.
- `android:name` (في `<activity>`) → اسم الصنف الكامل الذي يمثل الشاشة.
- `android:label` → النص الظاهر للمستخدم (اسم التطبيق أو الشاشة).

#### 💻 الكود: تعريف Activity أساسي في المانيفست

#### ما هذا الكود؟
> يعرّف تطبيقاً بسيطاً يحتوي شاشة رئيسية واحدة (`MainActivity`) تظهر عند فتح التطبيق من قائمة الجهاز.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Root manifest element with Android and tools namespaces -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools">
<!-- Application-level settings: icon and app name -->
<application
android:icon="@mipmap/ic_launcher"
android:label="@string/app_name">
<!-- Declares MainActivity as a component the system can start -->
<activity
android:name=".MainActivity"
android:exported="true"
android:label="@string/app_name">
<!-- Intent filter marking this as the launcher entry point -->
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
</activity>
</application>
</manifest>
```

#### شرح كل سطر:
1. `<manifest xmlns:android=...>` → الجذر — يحدد مساحات الأسماء المستخدمة في وصف السمات.
2. `<application android:icon=... android:label=...>` → إعدادات عامة للتطبيق كله (الأيقونة والاسم الظاهر).
3. `<activity android:name=".MainActivity">` → يصرّح للنظام بوجود شاشة اسمها `MainActivity` داخل حزمة التطبيق.
4. `android:exported="true"` → يسمح لتطبيقات/مكونات خارج التطبيق باستدعاء هذه الـ Activity.
5. `<intent-filter>` → يحدد "قدرات" هذه الشاشة، هنا تُعلن أنها نقطة الدخول الرئيسية.
6. `<action android:name="android.intent.action.MAIN" />` → يعني: "هذه هي الشاشة التي تبدأ عندها التطبيق".
7. `<category android:name="android.intent.category.LAUNCHER" />` → يعني: "أظهر أيقونة هذا التطبيق في قائمة تطبيقات الجهاز".

**المكتبات المطلوبة (Imports):**
> لا يوجد استيراد Kotlin هنا؛ هذا ملف XML تعريفي وليس كوداً تنفيذياً.

**الناتج المتوقع (لقطة الشاشة):**
> عند تثبيت التطبيق، تظهر أيقونته في قائمة تطبيقات الجهاز، وعند الضغط عليها تُفتح `MainActivity` مباشرة.

#### النص الأصلي يقول (English):
> "You must declare all app components using the following elements: <activity> elements for activities, <service> elements for services, <receiver> elements for broadcast receivers, <provider> elements for content providers. Activities, services, and content providers that you include in your source but don't declare in the manifest aren't visible to the system and, consequently, can never run."

#### الشرح المبسّط:
جدول العناصر:

| المكوّن | العنصر في XML |
| --- | --- |
| Activity | `<activity>` |
| Service | `<service>` |
| Broadcast Receiver | `<receiver>` |
| Content Provider | `<provider>` |

**قاعدة ذهبية:** أي مكوّن غير معلَن في المانيفست (باستثناء استثناء واحد لاحقاً) = لا يمكن للنظام تشغيله أبداً، حتى لو كان الكود موجوداً فعلياً في المشروع!

#### النص الأصلي يقول (English):
> "Broadcast receivers can either be declared in the manifest or created dynamically in code as BroadcastReceiver objects and registered with the system by calling registerReceiver()."

#### الشرح المبسّط:
الاستثناء الوحيد: `Broadcast Receiver` يمكن تسجيله بطريقتين — إما في المانيفست، أو ديناميكياً في الكود عبر `registerReceiver()`.

#### مهم للامتحان ⚠️:
> Broadcast Receiver هو المكوّن الوحيد من بين الأربعة الذي يمكن تسجيله ديناميكياً في الكود دون المانيفست.

#### النص الأصلي يقول (English):
> "You can use an Intent to start activities, services, and broadcast receivers. You do this by explicitly naming the target component... You can also use an implicit intent... An implicit intent lets the system find a component on the device that can perform the action and start it. If there are multiple components that can perform the action described by the intent, the user selects which one to use."

#### الشرح المبسّط:
تكرار وتوضيح للـ Explicit/Implicit Intent: مع implicit intent، إذا وُجد أكثر من تطبيق يمكنه تنفيذ الإجراء، يظهر للمستخدم اختيار (مثل "شارك عبر...").

#### النص الأصلي يقول (English):
> "The system identifies the components that can respond to an intent by comparing the intent received to the intent filters provided in the manifest file of other apps on the device... you can optionally include intent filters that declare the capabilities of the activity so it can respond to intents from other apps."

#### الشرح المبسّط:
النظام يقارن الـ Intent الوارد مع كل `<intent-filter>` معلَنة في تطبيقات الجهاز، ليعرف أي مكوّن قادر على الاستجابة.

#### 💻 الكود: Intent Filter لاستقبال "إرسال" من تطبيقات أخرى

#### ما هذا الكود؟
> يعلن أن شاشة تأليف بريد إلكتروني (`ComposeEmailActivity`) قادرة على استقبال طلبات "إرسال" (SEND) من أي تطبيق آخر، مثل مشاركة صورة.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools">
<application>
<!-- Activity capable of composing an email -->
<activity android:name="com.example.project.ComposeEmailActivity">
<!-- Declares that this activity can handle SEND actions for any data type -->
<intent-filter>
<action android:name="android.intent.action.SEND" />
<data android:type="*/*" />
<category android:name="android.intent.category.DEFAULT" />
</intent-filter>
</activity>
</application>
</manifest>
```

#### شرح كل سطر:
1. `<activity android:name="com.example.project.ComposeEmailActivity">` → يعرّف شاشة تأليف البريد بمسارها الكامل.
2. `<action android:name="android.intent.action.SEND" />` → يعلن قدرة هذه الشاشة على استقبال إجراء "إرسال".
3. `<data android:type="*/*" />` → يقبل أي نوع بيانات (صورة، نص، فيديو...).
4. `<category android:name="android.intent.category.DEFAULT" />` → يجعلها قابلة للظهور كخيار افتراضي عند طلب مشابه من تطبيق آخر.

**الناتج المتوقع (لقطة الشاشة):**
> عندما يضغط المستخدم "مشاركة" في تطبيق كاميرا، يظهر تطبيق البريد كخيار، وعند اختياره تُفتح شاشة تأليف بريد جاهزة لإرفاق الصورة.

#### النص الأصلي يقول (English):
> "To prevent your app from being installed on devices that lack features needed by your app, it's important that you clearly define a profile for the types of devices your app supports by declaring device and software requirements in your manifest file. Most of these declarations are informational only. The system doesn't read them, but external services such as Google Play do read them."

#### الشرح المبسّط:
يمكنك تعريف متطلبات الجهاز (كاميرا، إصدار أندرويد...) في المانيفست. **مهم:** النظام نفسه لا يفرض هذه القيود وقت التشغيل، لكن متجر Google Play يستخدمها للفلترة قبل عرض التطبيق للمستخدمين.

#### النص الأصلي يقول (English):
> "Suppose your app requires a camera and uses APIs introduced in Android 8.0 (API level 26). You must declare these requirements. The values for minSdk and targetSdk are set in app module's build.gradle file."

#### الشرح المبسّط:
مثال: تطبيق يتطلب كاميرا ويستخدم واجهات برمجية من Android 8.0 (API 26). قيم `minSdk` و`targetSdk` تُحدَّد في ملف `build.gradle` وليس في المانيفست مباشرة.

#### 💻 الكود: تحديد minSdk وtargetSdk في build.gradle

```gradle
// Android application configuration block
android {
    // Default configuration shared by all build variants
    defaultConfig {
        // Minimum Android API level the app supports
        minSdk = 26
        // API level the app is tested and optimized against
        targetSdk = 29
    }
}
```

#### شرح كل سطر:
1. `android { ... }` → الكتلة الرئيسية لإعدادات بناء أندرويد.
2. `defaultConfig { ... }` → الإعدادات الافتراضية لكل نسخ البناء (Build Variants).
3. `minSdk = 26` → أقل إصدار أندرويد يمكن تثبيت التطبيق عليه (Android 8.0).
4. `targetSdk = 29` → الإصدار الذي صُمم التطبيق للعمل معه بشكل مُحسَّن.

#### النص الأصلي يقول (English):
> "You declare the camera feature in your app's manifest file... With the declarations shown in these examples, devices that do not have a camera or have an Android version lower than 8.0 can't install your app from Google Play."

#### الشرح المبسّط:
تعريف الحاجة للكاميرا في المانيفست مع `required="true"` يمنع Google Play من عرض التطبيق للأجهزة التي لا تملك كاميرا أو تعمل بإصدار أقل من المطلوب.

#### 💻 الكود: تعريف ميزة الكاميرا كمتطلب إجباري

```xml
<manifest>
<!-- Declares that the app strictly requires a camera to function -->
<uses-feature android:name="android.hardware.camera.any"
android:required="true" />
</manifest>
```

#### شرح كل سطر:
1. `<uses-feature android:name="android.hardware.camera.any" .../>` → يعلن حاجة التطبيق لأي نوع كاميرا (أمامية أو خلفية).
2. `android:required="true"` → يجعل الميزة إجبارية؛ الأجهزة بلا كاميرا لن تستطيع تثبيت التطبيق من المتجر.

#### النص الأصلي يقول (English):
> "You can also declare that your app uses the camera, but does not require it. To do so, you set the required attribute to false, check at runtime whether the device has a camera, and disable any camera features as needed."

#### الشرح المبسّط:
إن أردت أن تكون الكاميرا "اختيارية" فقط (وليست إجبارية)، تضع `required="false"` وتتحقق برمجياً وقت التشغيل من وجودها، ثم تعطّل ميزات الكاميرا إذا لم تكن متوفرة.

#### ⚖️ المقايضة: required="true" مقابل required="false" لميزة الجهاز

| | `required="true"` | `required="false"` |
| --- | --- | --- |
| المزايا | ضمان أن كل من يثبّت التطبيق يملك الميزة | جمهور أوسع من الأجهزة المتوافقة |
| العيوب | يستبعد أجهزة كثيرة من المتجر | يحتاج كوداً إضافياً للتحقق وقت التشغيل |
| متى تختاره | تطبيق أساسه الكاميرا (مثل تطبيق مسح مستندات) | تطبيق عام تستخدم فيه الكاميرا كميزة إضافية فقط |

---

### 10. موارد التطبيق (App Resources)

#### النص الأصلي يقول (English):
> "An Android app is composed of more than just code. It requires resources that are separate from the source code, such as images, audio files, and anything relating to the visual presentation of the app."

#### الشرح المبسّط:
التطبيق ليس كوداً فقط — يحتاج "موارد" (Resources) منفصلة: صور، أصوات، خطوط، وكل ما يتعلق بالشكل المرئي.

#### النص الأصلي يقول (English):
> "While Jetpack Compose defines the UI structure programmatically, the app still relies on external resources for assets that remain separate from the logic. Static Assets: Includes images (Drawables), strings, fonts, and raw files (audio/video). Declarative UI: Unlike the View system, layouts, themes, and animations are now defined as @Composable functions in Kotlin code rather than XML files."

#### الشرح المبسّط:
في Jetpack Compose، هيكل الواجهة نفسه يُكتب برمجياً (دوال `@Composable`)، لكن الأصول الثابتة (صور، نصوص، خطوط، ملفات صوت) تبقى منفصلة كموارد.

| النوع القديم (View System) | النوع الحديث (Compose) |
| --- | --- |
| Layouts في ملفات XML منفصلة | Layouts كدوال `@Composable` في كود Kotlin |
| Themes/Animations في XML | Themes/Animations برمجياً في Kotlin |
| Static Assets (صور، نصوص، خطوط) | تبقى كموارد خارجية في كلتا الحالتين |

#### النص الأصلي يقول (English):
> "For every resource in the res/ directory, the Android SDK build tools generate a unique integer ID within the R class."

#### الشرح المبسّط:
كل مورد داخل مجلد `res/` يحصل تلقائياً على رقم تعريف فريد ضمن صنف يُدعى `R` يولّده نظام البناء.

#### النص الأصلي يقول (English):
> "Referencing: In Compose, resources are accessed through type-safe functions like stringResource(R.string.name) or painterResource(R.drawable.logo)."

#### الشرح المبسّط:
في Compose، تُستدعى الموارد عبر دوال آمنة النوع (Type-safe) مثل `stringResource()` للنصوص و`painterResource()` للصور، بدل الوصول المباشر لصنف `R`.

#### النص الأصلي يقول (English):
> "One of Android's core strengths is the ability to provide alternative resources tailored to specific device configurations without modifying the logic. Resource Qualifiers: By appending qualifiers to directory names (e.g., res/values-ar/ for Arabic or res/values-night/ for Dark Mode), the system automatically selects the resource that matches the user's current configuration."

#### الشرح المبسّط:
نقطة قوة جوهرية: يمكنك توفير موارد بديلة حسب حالة الجهاز (لغة، وضع ليلي...) دون تعديل منطق الكود. تكفي إضافة "مؤهّل" (Qualifier) لاسم المجلد:
- `res/values-ar/` → للغة العربية.
- `res/values-night/` → للوضع الليلي (Dark Mode).

والنظام يختار تلقائياً المجلد المناسب حسب إعدادات المستخدم الحالية.

#### النص الأصلي يقول (English):
> "Modern Adaptability: While localization still relies on XML qualifiers (Strings), UI responsiveness to screen sizes or orientations in Compose is primarily handled programmatic approaches such as Window Size Classes and state-driven layouts, ensuring a more fluid adaptive experience compared to layout-qualifiers (like layout-land)."

#### الشرح المبسّط:
الترجمة (Localization) لا تزال تعتمد على مؤهلات XML، لكن التكيّف مع حجم الشاشة/الاتجاه في Compose أصبح يُدار برمجياً عبر `Window Size Classes` وتخطيطات مبنية على الحالة (State-driven Layouts)، بدل مجلدات مثل `layout-land` القديمة — مما يمنح تجربة تكيّف أكثر سلاسة.

#### 💡 التشبيه:
> مؤهّلات الموارد كـ"قوائم طعام مختلفة" لنفس المطعم حسب البلد — القائمة العربية تُقدَّم للزبون العربي تلقائياً.
> **وجه الشبه:** المطعم = التطبيق، القوائم المختلفة = مجلدات الموارد (`values-ar`, `values-night`).

---

### 11. مثال تطبيقي متكامل: GreetingCard App

#### النص الأصلي يقول (English) — MainActivity.kt:
> "class MainActivity : ComponentActivity() { override fun onCreate(savedInstanceState: Bundle?) { super.onCreate(savedInstanceState) setContent { GreetingcardTheme { Surface(...) { Greeting(name = "Android") } } } } } @Composable fun Greeting(name: String, modifier: Modifier = Modifier) { Text(text = "Hello $name!", modifier = modifier) }"

#### الشرح المبسّط:
هذا مثال كامل لتطبيق بسيط يعرض رسالة ترحيب "Hello Android!" باستخدام Jetpack Compose. `MainActivity` هي نقطة الدخول الوحيدة (Single Activity)، وواجهتها تُبنى بالكامل عبر دوال `@Composable`.

#### 💻 الكود: تطبيق GreetingCard الكامل

#### ما هذا الكود؟
> نقطة دخول التطبيق (Activity واحدة) التي تعرض واجهة Compose بسيطة ترحّب بالمستخدم باسم يُمرَّر كمعامل.

```kotlin
// MainActivity is the single entry point (single-activity architecture)
class MainActivity : ComponentActivity() {
    // onCreate is called when the Activity is first created
    override fun onCreate(savedInstanceState: Bundle?) {
        // Always call the superclass implementation first
        super.onCreate(savedInstanceState)
        // setContent replaces the traditional XML layout with Compose UI
        setContent {
            // Apply the app's custom theme (colors, typography, dark mode)
            GreetingcardTheme {
                // Surface provides a themed background container
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // Call our custom composable, passing "Android" as the name
                    Greeting(name = "Android")
                }
            }
        }
    }
}

// A reusable, stateless composable function that displays a greeting
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    // Text is a basic Compose UI element for showing a string
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

#### شرح كل سطر:
1. `class MainActivity : ComponentActivity()` → يعرّف الشاشة الوحيدة للتطبيق، وارثة من `ComponentActivity` المخصصة لـ Compose.
2. `override fun onCreate(savedInstanceState: Bundle?)` → دالة تُستدعى عند إنشاء الشاشة لأول مرة؛ `Bundle?` يحمل الحالة المحفوظة إن وُجدت.
3. `super.onCreate(savedInstanceState)` → استدعاء إلزامي لتنفيذ منطق الإنشاء الأساسي في الصنف الأب.
4. `setContent { ... }` → يستبدل نظام XML القديم؛ يحدد واجهة المستخدم مباشرة بكود Kotlin تصريحي.
5. `GreetingcardTheme { ... }` → يغلّف الواجهة بثيم التطبيق (ألوان، خطوط، دعم الوضع الليلي).
6. `Surface(modifier = Modifier.fillMaxSize(), color = ...)` → حاوية خلفية تملأ الشاشة بلون من نظام الثيم.
7. `Greeting(name = "Android")` → استدعاء الدالة القابلة للتركيب مع تمرير الاسم "Android".
8. `@Composable fun Greeting(name: String, modifier: Modifier = Modifier)` → دالة قابلة لإعادة الاستخدام، تستقبل نصاً ومعدّل (Modifier) اختياري.
9. `Text(text = "Hello $name!", modifier = modifier)` → عنصر نصي بسيط يعرض الترحيب باستخدام String Template.

**المكتبات المطلوبة (Imports):**
> `import androidx.activity.ComponentActivity`
> `import androidx.activity.compose.setContent`
> `import androidx.compose.material3.Surface`
> `import androidx.compose.material3.MaterialTheme`
> `import androidx.compose.material3.Text`
> `import androidx.compose.runtime.Composable`
> `import androidx.compose.ui.Modifier`

**الناتج المتوقع (لقطة الشاشة):**
> عند تشغيل التطبيق، تظهر شاشة بخلفية بلون الثيم، وفي أعلاها نص "Hello Android!".

#### النص الأصلي يقول (English) — توقيعات الدوال:
> "public fun ComponentActivity.setContent(parent: CompositionContext? = null, content: @Composable () -> Unit): Unit" / "@Composable public fun GreetingcardTheme(darkTheme: Boolean = isSystemInDarkTheme(), dynamicColor: Boolean = true, content: @Composable () -> Unit): Unit" / "@Composable public fun Surface(modifier: Modifier = Modifier, shape: Shape = RectangleShape, color: Color = MaterialTheme.colorScheme.surface, contentColor: Color = contentColorFor(color), tonalElevation: Dp = 0.dp, shadowElevation: Dp = 0.dp, border: BorderStroke? = null, content: @Composable () -> Unit): Unit"

#### الشرح المبسّط:
- `setContent()`: دالة امتداد (Extension Function) على `ComponentActivity` تستقبل محتوى Compose كـ Lambda من نوع `@Composable () -> Unit`.
- `GreetingcardTheme()`: دالة ثيم مخصصة تحدد تلقائياً إن كان الوضع ليلياً (`isSystemInDarkTheme()`) وتدعم الألوان الديناميكية (`dynamicColor`).
- `Surface()`: دالة قابلة للتخصيص الكامل (شكل، لون، ارتفاع الظل...) لكن كلها لها قيم افتراضية معقولة (Default Parameters) فلا يلزم تمريرها كلها.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا تحتوي دوال Compose مثل `Surface` على قيم افتراضية لكل معاملاتها تقريباً؟
> **لماذا هذا مهم؟** لتسهيل الاستخدام — يمكنك استدعاء `Surface { ... }` فقط دون تمرير أي شيء، وتخصيص فقط ما تحتاجه.

#### النص الأصلي يقول (English) — AndroidManifest.xml لتطبيق GreetingCard:
> "<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:theme="@style/Theme.GreetingCard" tools:targetApi="31"> <activity android:name=".MainActivity" android:exported="true" android:label="@string/app_name" android:theme="@style/Theme.GreetingCard"> <intent-filter> <action android:name="android.intent.action.MAIN" /> <category android:name="android.intent.category.LAUNCHER" /> </intent-filter> </activity> </application>"

#### الشرح المبسّط:
مانيفست تطبيق GreetingCard مطابق للبنية العامة، لكنه يضيف:
- `android:theme="@style/Theme.GreetingCard"` على مستوى `<application>` و`<activity>` لتحديد الثيم البصري.
- `tools:targetApi="31"` → سمة مساعدة للأدوات (Lint) توضح أن بعض الميزات المستخدمة تستهدف API 31 تحديداً.

#### 🔄 قبل / بعد: من مانيفست أساسي إلى مانيفست GreetingCard الكامل

**قبل:**
```xml
<activity android:name=".MainActivity" android:exported="true" android:label="@string/app_name">
```

**بعد:**
```xml
<activity android:name=".MainActivity" android:exported="true" android:label="@string/app_name" android:theme="@style/Theme.GreetingCard">
```

**ماذا تغيّر؟** أُضيفت سمة `android:theme` لتخصيص المظهر البصري لهذه الشاشة تحديداً.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `APK` | ملف تثبيت جاهز يحتوي كل ما يلزم وقت التشغيل | يُثبَّت مباشرة على الجهاز |
| `AAB` | صيغة نشر تحتوي المشروع كاملاً + بيانات وصفية | لا يُثبَّت مباشرة؛ يُرسَل للمتجر فقط |
| `Sandbox` | عزل كل تطبيق في "صندوق" أمني خاص به | كل تطبيق = مستخدم Linux مختلف |
| `Principle of Least Privilege` | مبدأ إعطاء الحد الأدنى من الصلاحيات فقط | لا صلاحيات إضافية دون طلب صريح |
| `Intent` | رسالة غير متزامنة لتفعيل مكوّن | Explicit أو Implicit |
| `AndroidManifest.xml` | ملف تعريف كل مكونات التطبيق ومتطلباته | بدونه، لا يعمل أي مكوّن |
| `Resource Qualifier` | لاحقة على اسم مجلد الموارد لتخصيصه حسب الإعداد | `values-ar`, `values-night` |
| `Single-Activity Architecture` | تصميم حديث بـ Activity واحدة وشاشات متعددة داخلها | يُدار عبر Compose Navigation |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Activity` | شاشة تفاعل واحدة | نقطة الدخول للمستخدم |
| `Service` | عمل خلفي بلا واجهة | Started أو Bound |
| `Broadcast Receiver` | استقبال أحداث النظام | لا يُنفَّذ فيه عمل ثقيل |
| `Content Provider` | مشاركة/إدارة بيانات | يُفعَّل عبر `ContentResolver` فقط |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| APK vs AAB | APK | AAB | APK قابل للتثبيت مباشرة، AAB للنشر فقط عبر المتجر |
| Started Service vs Bound Service | Started | Bound | Started يستمر باستقلالية، Bound يعتمد على وجود مرتبطين به |
| Explicit Intent vs Implicit Intent | Explicit | Implicit | الأول يحدد المكوّن بالاسم، الثاني يحدد نوع العمل ويترك الاختيار للنظام/المستخدم |
| required="true" vs required="false" | true | false | الأول يستبعد الأجهزة الناقصة من المتجر، الثاني يسمح بالتثبيت مع تعطيل الميزة برمجياً |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| البنية العامة | `APK`, `AAB`, `Sandbox`, `Linux User ID`, `VM` |
| المكونات | `Activity`, `Service`, `Broadcast Receiver`, `Content Provider` |
| التفعيل | `Intent`, `Explicit Intent`, `Implicit Intent`, `Intent Filter`, `ContentResolver` |
| المانيفست | `AndroidManifest.xml`, `uses-feature`, `minSdk`, `targetSdk` |
| الموارد | `Drawables`, `R class`, `stringResource`, `painterResource`, `Resource Qualifier` |
| Compose | `@Composable`, `setContent`, `Surface`, `Modifier`, `Window Size Classes` |

### أبرز النقاط الذهبية
1. أي مكوّن غير معلَن في المانيفست (باستثناء Broadcast Receiver الديناميكي) لا يمكن للنظام تشغيله أبداً.
2. لا يوجد `main()` في أندرويد — أي مكوّن يمكن أن يكون نقطة البداية.
3. Content Provider هو المكوّن الوحيد الذي لا يُفعَّل عبر Intent، بل عبر ContentResolver.
4. التصميم الحديث يفضّل Single Activity + Compose Navigation بدل تعدد الـ Activities.
5. `Service` لم يعد الخيار الافتراضي للعمل الخلفي؛ البديل: `Coroutines` و`WorkManager`.
6. AAB صيغة نشر فقط، لا يمكن تثبيتها مباشرة على أي جهاز.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| الاعتقاد أن AAB يمكن تثبيتها كـ APK | AAB للنشر فقط عبر المتجر؛ APK هو ملف التثبيت الفعلي |
| تنفيذ عمل ثقيل داخل BroadcastReceiver | يجب تفويض العمل الثقيل لخدمة أو JobScheduler |
| نسيان تعريف مكوّن في المانيفست | أي Activity/Service/Provider غير مُعلَن لن يعمل أبداً |
| الخلط بين Explicit وImplicit Intent | Explicit يحدد الصنف بالاسم، Implicit يحدد نوع العمل فقط |
| اعتبار Service الخيار الافتراضي دائماً للعمل الخلفي | استخدم Coroutines/WorkManager بدلاً منه في أغلب الحالات الحديثة |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء تطبيق أندرويد ونشره

> ما هدفه؟ توضيح المسار الكامل من كتابة الكود إلى ظهور التطبيق للمستخدم عبر المتجر.
```algorithm
1 | كتابة الكود بلغة Kotlin/Java/C++ | Android Studio | يكتب المطوّر منطق ووظائف التطبيق
2 | إضافة الموارد (صور، نصوص، خطوط) | مجلد res/ | يوفّر أصول العرض المرئي واللغات المختلفة
3 | تعريف المكونات والمتطلبات | AndroidManifest.xml | يعلن النظام والمتجر بمكونات ومتطلبات التطبيق
4 | تجميع المشروع | Gradle/SDK Tools | ينتج APK للاختبار أو AAB للنشر
5 | رفع الحزمة إلى المتجر | Google Play Console | يستقبل Google Play ملف AAB
6 | توليد APK محسّن لكل جهاز | Google Play Servers | يُنشئ نسخة APK مخصصة عند طلب التثبيت
```
#### نقاط التنفيذ:
- لا يمكن تخطي خطوة تعريف المانيفست، وإلا فشل تشغيل أي مكوّن.
- الأجهزة التي لا تحقق `uses-feature required="true"` لن تظهر لها إمكانية التثبيت من المتجر.

#### ⚙️ الخطوات / الخوارزمية: استدعاء مكوّن من تطبيق آخر عبر Intent

> ما هدفه؟ توضيح كيف "يستعير" تطبيقك مكوّناً من تطبيق آخر (مثل الكاميرا) دون كتابة كوده بنفسك.
```algorithm
1 | إنشاء كائن Intent | كود Kotlin | يحدد الإجراء المطلوب (مثل التقاط صورة)
2 | إرسال الـ Intent للنظام | startActivity()/startActivityForResult() | يوصل الطلب لنظام أندرويد
3 | مطابقة الـ Intent مع Intent Filters | نظام أندرويد | يبحث عن مكوّن مناسب في تطبيقات الجهاز
4 | تشغيل عملية التطبيق الآخر (إن لم تكن تعمل) | Android System | يبدأ عملية Linux خاصة بتطبيق الكاميرا مثلاً
5 | تنفيذ العملية وإعادة النتيجة | تطبيق الكاميرا → تطبيقك | يعيد الصورة الملتقطة إلى تطبيقك الأصلي
```
#### نقاط التنفيذ:
- المكوّن المستدعى يعمل داخل عملية التطبيق الآخر، وليس عملية تطبيقك.
- في حال وجود أكثر من تطبيق قادر على الاستجابة، يظهر للمستخدم مربع اختيار.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| تعريف Activity في المانيفست | `<activity android:name=".X"><intent-filter>...</intent-filter></activity>` | كل شاشة جديدة يجب أن يعرفها النظام |
| Intent Filter لنقطة الدخول الرئيسية | `action=MAIN` + `category=LAUNCHER` | الشاشة الأولى التي تظهر عند فتح التطبيق |
| Intent Filter لاستقبال مشاركة | `action=SEND` + `data type=*/*` | شاشة تستقبل محتوى من تطبيقات أخرى |
| تعريف متطلب جهاز | `<uses-feature android:name=... android:required=.../>` | فرض أو السماح باختيارية ميزة عتادية |
| نقطة دخول Compose | `class X : ComponentActivity() { onCreate { setContent { ... } } }` | كل تطبيق Compose حديث |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| حاجة لعمل خلفي بسيط قصير | استخدام `Coroutines` | أخف وزناً ومرتبط بدورة حياة واضحة |
| حاجة لعمل مؤجل يضمن التنفيذ لاحقاً | استخدام `WorkManager` | يضمن التنفيذ حتى بعد إعادة تشغيل الجهاز |
| حاجة لمشاركة بيانات مع تطبيقات أخرى | استخدام `Content Provider` | الطريقة الرسمية والآمنة للمشاركة |
| استقبال حدث نظام (بطارية منخفضة) | استخدام `Broadcast Receiver` خفيف | لا حاجة لإبقاء التطبيق يعمل باستمرار |

### الأفكار الرئيسية الشاملة
الفكرة المحورية في هذه المحاضرة هي أن تطبيق أندرويد ليس "برنامجاً واحداً متصلاً" كما في الأنظمة التقليدية، بل هو مجموعة "لبنات" (Activities/Services/Receivers/Providers) يديرها النظام نفسه حسب الحاجة، مع طبقة أمان صارمة (Sandbox) تفصل بين التطبيقات، وملف مركزي (المانيفست) هو المرجع الوحيد الذي يعرّف النظام بما يمتلكه التطبيق من قدرات.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% | سيناريو كود 35% | تطبيق 40%.

### السؤال 1 (medium)
What is the main difference between an APK and an AAB file?
أ) APK is for testing only, AAB is for production
ب) APK can be installed directly on a device, AAB is a publishing format that cannot be installed directly
ج) AAB is smaller than APK
د) There is no difference; they are interchangeable
**الإجابة الصحيحة: ب**
**التعليل:** النص صرّح أن AAB "can't be installed on Android devices" وأنه يؤجل توليد وتوقيع الـ APK لمرحلة لاحقة، بينما APK هو الملف الفعلي القابل للتثبيت. الخيار أ خاطئ لأن AAB ليس للاختبار بل للنشر عبر المتجر فقط. الخيار ج غير مذكور وغير دقيق كقاعدة عامة. الخيار د خاطئ لأنهما مختلفان تماماً في الوظيفة.

---

### السؤال 2 (medium)
Why does each Android app run in its own Linux process with a unique user ID?
أ) To make apps run faster
ب) To reduce app size
ج) To isolate apps from each other for security (sandboxing)
د) To allow apps to share memory easily
**الإجابة الصحيحة: ج**
**التعليل:** النص يشرح أن هذا جزء من "security sandbox" وأن كل تطبيق معزول بمعرف مستخدم Linux فريد. الخيار أ وب غير مرتبطين بالسبب المذكور. الخيار د عكس الهدف تماماً؛ الهدف هو منع المشاركة غير المصرّح بها.

---

### السؤال 3 (hard)
Which of the following is NOT one of the four app component types?
أ) Activity
ب) Service
ج) Fragment
د) Content Provider
**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة حددت أربعة مكونات فقط: Activities, Services, Broadcast receivers, Content providers. الـ `Fragment` ليس من ضمن هذه القائمة الرسمية، رغم أنه مفهوم مرتبط بواجهات المستخدم في أندرويد بشكل عام.

---

### السؤال 4 (medium)
What happens when your app starts an activity that belongs to another app (e.g., the camera app)?
أ) The activity runs in your app's own process
ب) The activity runs in the camera app's process
ج) Both apps share the exact same process
د) The system merges both apps into one process permanently
**الإجابة الصحيحة: ب**
**التعليل:** النص واضح: "that activity runs in the process that belongs to the camera app, not in your app's process." الخيارات الأخرى تناقض هذا المبدأ الأساسي للعزل بين العمليات.

---

### السؤال 5 (medium)
A developer needs to play music continuously while the user navigates to other apps. Which component type is most appropriate?
أ) Activity
ب) Broadcast Receiver
ج) Content Provider
د) Foreground Service
**الإجابة الصحيحة: د**
**التعليل:** تشغيل الموسيقى مثال صريح على "Started Service" من نوع Foreground Service مع إشعار دائم. الـ Activity لا تعمل بعد مغادرة الشاشة، وBroadcast Receiver وContent Provider ليسا مصمَّمين لهذه المهمة.

---

### السؤال 6 (hard)
What is the key difference between a started service and a bound service?
أ) Started services always have a UI, bound services never do
ب) A bound service is destroyed once all bound components unbind, while a started service can keep running independently
ج) Bound services cannot communicate with other components
د) Started services require ContentResolver to activate
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن "A bound service runs only as long as another application component is bound to it... when all of them unbind, the service is destroyed"، بينما started service يستمر حتى إنهاء عمله بغض النظر عمن استدعاه. الخيار أ خاطئ لأن كلا النوعين لا يملكان UI أصلاً. الخيار د خاطئ لأن ContentResolver خاص بـ Content Provider فقط.

---

### السؤال 7 (medium)
According to the lecture, which modern alternatives does Google recommend instead of using Service directly for most background work?
أ) Fragments and Intents
ب) Kotlin Coroutines and WorkManager
ج) Broadcast Receivers and ContentResolver
د) Activities and Navigation
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة: "Google recommends alternative components: Kotlin Coroutines, WorkManager." باقي الخيارات تخلط بين مكونات غير مرتبطة بهذا السياق.

---

### السؤال 8 (medium)
Why should heavy, long-running work NOT be performed directly inside a BroadcastReceiver?
أ) Because BroadcastReceivers cannot use Kotlin
ب) Because a BroadcastReceiver is meant to react to events minimally, not to perform heavy work
ج) Because BroadcastReceivers automatically crash after 1 second
د) Because only Activities can perform background work
**الإجابة الصحيحة: ب**
**التعليل:** النص ينص صراحة: "A BroadcastReceiver should be used to react to events, not to perform heavy work." الخيارات الأخرى مبالغات أو معلومات غير صحيحة.

---

### السؤال 9 (hard)
A content provider identifies its data using which of the following mechanisms?
أ) File paths only
ب) URIs (e.g., content://com.example.app/users)
ج) Intent actions
د) Broadcast action strings
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن "a content provider is an entry point into an app for publishing named data items, identified by a URIs." باقي الخيارات مرتبطة بمكونات أخرى (Intent وBroadcast) وليست بالـ Content Provider.

---

### السؤال 10 (medium)
Unlike activities, services, and broadcast receivers, how is a content provider activated?
أ) Through an explicit Intent only
ب) Through implicit Intents only
ج) Through a request from a ContentResolver
د) It cannot be activated at all
**الإجابة الصحيحة: ج**
**التعليل:** النص صريح: "content providers are activated when targeted by a request from a ContentResolver." الاستخدام المباشر للـ Intent غير وارد لهذا المكوّن تحديداً، بخلاف الثلاثة الأخرى.

---

### السؤال 11 (hard)
Which of the following components can be registered dynamically in code (not only declared in the manifest)?
أ) Activity
ب) Content Provider
ج) Broadcast Receiver
د) Service
**الإجابة الصحيحة: ج**
**التعليل:** النص يقول: "Broadcast receivers can either be declared in the manifest or created dynamically in code as BroadcastReceiver objects and registered with the system by calling registerReceiver()." أما Activity وContent Provider وService، فإن لم تُعلَن في المانيفست، لا يمكن للنظام تشغيلها أبداً.

---

### السؤال 12 (medium)
What is the purpose of the `<intent-filter>` element containing `action=MAIN` and `category=LAUNCHER`?
أ) It hides the app from the device's app list
ب) It declares this activity as the app's entry point shown in the launcher
ج) It requests camera permission
د) It defines the app's minimum SDK version
**الإجابة الصحيحة: ب**
**التعليل:** هذا التركيب المحدد (MAIN + LAUNCHER) هو الصيغة القياسية لتعريف الشاشة التي تُفتح أولاً وتظهر أيقونتها في قائمة تطبيقات الجهاز، كما في مثال المحاضرة. باقي الخيارات غير مرتبطة بهذا التركيب.

---

### السؤال 13 (hard)
If an app declares `<uses-feature android:name="android.hardware.camera.any" android:required="true" />`, what happens on a device without a camera?
أ) The app installs normally but the camera feature is disabled
ب) The device cannot install the app from Google Play
ج) The app crashes immediately after installation
د) Nothing changes; this attribute is purely decorative
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح: "devices that do not have a camera... can't install your app from Google Play" عندما تكون `required="true"`. الخيار أ يصف السلوك عند `required="false"` فقط، وليس هذه الحالة.

---

### السؤال 14 (medium)
In modern Android development, what is the recommended architecture pattern promoted by Google instead of using many separate Activities?
أ) Multiple Activities per feature
ب) Single-Activity architecture with Compose navigation managing UI destinations
ج) One Activity per Fragment
د) No Activities at all, only Services
**الإجابة الصحيحة: ب**
**التعليل:** النص الإضافي في المحاضرة يذكر: "Google promotes a single-activity architecture pattern... A single Activity as a host, Multiple UI destinations managed via Jetpack Compose navigation." باقي الخيارات تناقض هذا التوجه الحديث صراحة.

---

### السؤال 15 (medium)
In Jetpack Compose, how are resources like strings and images typically referenced?
أ) Directly through R.string.name and R.drawable.logo without any wrapper function
ب) Through type-safe composable functions like stringResource() and painterResource()
ج) Only through XML layout files
د) Resources cannot be used in Compose at all
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر: "resources are accessed through type-safe functions like stringResource(R.string.name) or painterResource(R.drawable.logo)." الخيار أ يتجاهل طبقة الدوال الآمنة، والخيار د خاطئ تماماً لأن الموارد لا تزال مستخدمة في Compose.

---

### السؤال 16 (hard)
What is the role of resource qualifiers such as `res/values-ar/` or `res/values-night/`?
أ) They change the app's minimum SDK version
ب) They let the system automatically select resources matching the user's device configuration (e.g., language or dark mode) without changing app logic
ج) They are used only for testing purposes
د) They define which Activity launches first
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن هذه المؤهلات تسمح للنظام باختيار المورد المناسب تلقائياً حسب إعدادات الجهاز (لغة، وضع ليلي) "without modifying the logic." باقي الخيارات غير مرتبطة بوظيفة المؤهلات إطلاقاً.

---

## الجزء الرابع: أسئلة تصحيح الكود

> Cover error types: compilation, logic, return_check, dead code, misconception.

### Debug Question 1 (misconception)

**The following code contains a bug:**
```xml
<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name">
    <!-- Developer forgot to declare this activity in the manifest -->
</application>
```
```kotlin
// This Activity exists in the source code but is never declared above
class SettingsActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { /* settings UI */ }
    }
}
```
**Find the bug:** المطوّر كتب صنف `SettingsActivity` كاملاً في الكود، لكنه لم يعرّفه داخل `AndroidManifest.xml`، فماذا سيحدث عند محاولة تشغيله؟

**Fixed code:**
```xml
<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name">
    <activity android:name=".SettingsActivity" android:exported="false" />
</application>
```
**شرح الحل:** النظام لا يعرف بوجود أي مكوّن إلا إذا صُرِّح عنه في المانيفست، لذا حتى لو كان الكود صحيحاً 100%، فإن `SettingsActivity` "aren't visible to the system and, consequently, can never run" حسب النص. الحل هو إضافة عنصر `<activity>` يعرّفها.
1. أضفنا `<activity android:name=".SettingsActivity" .../>` داخل `<application>`.
2. استخدمنا `android:exported="false"` لأن هذه الشاشة داخلية فقط ولا حاجة لتطبيقات أخرى لاستدعائها.

---

### Debug Question 2 (logic)

**The following code contains a bug:**
```kotlin
class MusicService : Service() {
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        playMusicInBackground()
        // Missing: no foreground notification shown for continuous playback
        return START_STICKY
    }
    override fun onBind(intent: Intent?): IBinder? = null
}
```
**Find the bug:** الخدمة تشغّل موسيقى مستمرة يدركها المستخدم، لكنها لا تُظهر إشعاراً (Notification) ولا تطلب أن تكون Foreground Service، فما المشكلة المحتملة؟

**Fixed code:**
```kotlin
class MusicService : Service() {
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(NOTIFICATION_ID, buildPlaybackNotification())
        playMusicInBackground()
        return START_STICKY
    }
    override fun onBind(intent: Intent?): IBinder? = null
}
```
**شرح الحل:** النص يوضح أن الموسيقى "is something the user is directly aware of, and the app communicates this to the system by indicating that it wants to be in the foreground, with a notification." بدون `startForeground()` وإشعار مرافق، النظام قد يعامل الخدمة كخدمة خلفية عادية ويوقفها لتحرير الذاكرة.
1. أضفنا استدعاء `startForeground()` مع إشعار يوضح للمستخدم أن التشغيل مستمر.
2. هذا يمنح الخدمة أولوية أعلى لدى النظام لعدم إيقافها.

---

### Debug Question 3 (return_check)

**The following code contains a bug:**
```kotlin
fun getFeatureRequirement(hasCamera: Boolean): Boolean {
    // Intended to always require the camera regardless of device
    return hasCamera
}
```
**Find the bug:** الدالة يُفترض أن تحدد إن كانت الكاميرا **مطلوبة إجبارياً** (Required) في المانيفست، لكنها بدل ذلك تُعيد فقط ما إذا كان الجهاز يملك كاميرا فعلاً — وهذا خلط بين "المتطلب الإجباري" و"التحقق وقت التشغيل".

**Fixed code:**
```kotlin
// This should be a fixed manifest declaration, not runtime logic:
// <uses-feature android:name="android.hardware.camera.any" android:required="true" />

// Runtime check should be separate, for when required="false":
fun deviceHasCamera(context: Context): Boolean {
    return context.packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY)
}
```
**شرح الحل:** كما شرح النص، "required" هو تصريح ثابت في المانيفست يقرأه المتجر لفلترة الأجهزة، بينما التحقق وقت التشغيل (Runtime Check) هو خطوة منفصلة تُستخدم فقط عندما تكون الميزة اختيارية (`required="false"`). الخطأ الأصلي خلط المفهومين في دالة واحدة بشكل مضلل.
1. فصلنا التصريح الثابت (في XML) عن التحقق الديناميكي (في Kotlin).
2. استخدمنا `hasSystemFeature()` كطريقة قياسية صحيحة للتحقق من وجود الكاميرا فعلياً وقت التشغيل.

---

### Debug Question 4 (dead_code)

**The following code contains a bug:**
```kotlin
class DownloadReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        // Dead code: heavy network call blocking the receiver
        val data = downloadLargeFileSynchronously() // takes 30 seconds!
        saveToDatabase(data)
    }
}
```
**Find the bug:** الكود ينفّذ عملية تنزيل ثقيلة ومتزامنة (Synchronous) مباشرة داخل `onReceive()`، وهذا يخالف مبدأ استخدام Broadcast Receiver.

**Fixed code:**
```kotlin
class DownloadReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        // Delegate heavy work to WorkManager instead of doing it here
        val workRequest = OneTimeWorkRequestBuilder<DownloadWorker>().build()
        WorkManager.getInstance(context).enqueue(workRequest)
    }
}
```
**شرح الحل:** النص يحذر: "A BroadcastReceiver should be used to react to events, not to perform heavy work"، ويقترح تفويض العمل الثقيل (كمثال `JobService`/`JobScheduler` أو حديثاً `WorkManager`). الكود الأصلي "ميت" وظيفياً من ناحية التصميم الصحيح لأنه سيتسبب بمشاكل أداء وربما إغلاق قسري من النظام.
1. أزلنا التنزيل المباشر من داخل `onReceive()`.
2. جدولنا العمل عبر `WorkManager` ليعمل بأمان في الخلفية دون حجب الـ Receiver.

---

### Debug Question 5 (syntax)

**The following code contains a bug:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name">
<activity android:name=".MainActivity">
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</activity>
</application>
</manifest>
```
**Find the bug:** خطأ نحوي (Syntax Error): عنصر `<intent-filter>` لم يُغلق قبل إغلاق `</activity>`.

**Fixed code:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
<application android:icon="@mipmap/ic_launcher" android:label="@string/app_name">
<activity android:name=".MainActivity">
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
</activity>
</application>
</manifest>
```
**شرح الحل:** كل عنصر XML يجب أن يُغلق بشكل صحيح؛ نسيان `</intent-filter>` يجعل الملف غير صالح (Invalid XML) وسيفشل نظام البناء (Gradle) في تجميع المانيفست.
1. أضفنا وسم الإغلاق `</intent-filter>` المفقود.
2. الآن يتبع الهيكل تسلسل الإغلاق الصحيح: `intent-filter` → `activity` → `application` → `manifest`.

---

### Debug Question 6 (misconception)

**The following code contains a bug:**
```kotlin
// Developer assumes AAB can be directly installed like APK for testing on a friend's phone
fun shareAppWithFriend(bundleFile: File) {
    installPackage(bundleFile) // trying to install the .aab file directly
}
```
**Find the bug:** مفهوم خاطئ: المطوّر يحاول تثبيت ملف `.aab` مباشرة على جهاز صديقه، لكن هذا غير ممكن حسب النص.

**Fixed code:**
```kotlin
// AAB must first be converted to a device-specific APK (e.g., via bundletool) before installation
fun shareAppWithFriend(apkFile: File) {
    installPackage(apkFile) // install the generated .apk instead
}
```
**شرح الحل:** النص واضح: "An AAB is a publishing format and can't be installed on Android devices." لتوليد ملف قابل للتثبيت من AAB لأغراض الاختبار، يُستخدم عادة أداة مثل `bundletool` لتوليد APK مخصص أولاً، ثم يُثبَّت ذلك الـ APK.
1. غيّرنا الملف المُمرَّر من `.aab` إلى `.apk` مُولَّد فعلياً.
2. أوضحنا أن AAB يحتاج خطوة تحويل وسيطة قبل إمكانية التثبيت.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Declare a Service in the Manifest — fill_gaps

**Scenario / Task:**
You built a `SyncService` class that syncs data in the background, but forgot to make it visible to the system.

**Requirements:**
1. Complete the missing manifest element so the system recognizes `SyncService`.
```xml
<application>
    _______
</application>
```

**نموذج الحل:**
```xml
<application>
    <service android:name=".SyncService" android:exported="false" />
</application>
```
نستخدم عنصر `<service>` مع `android:name` يشير للصنف الكامل، و`exported="false"` لأن الخدمة داخلية فقط ولا تحتاج استدعاءً من تطبيقات خارجية.

---

### Exercise 2: Explicit vs Implicit Intent — scenario

**Scenario / Task:**
You want your app to open a specific internal screen (`ProfileActivity`) when a button is clicked, without letting the user choose between apps.

**Requirements:**
1. Should you use an Explicit or Implicit Intent? Justify your answer in one sentence.
2. Write the Kotlin code to start that activity.

**نموذج الحل:**
يجب استخدام **Explicit Intent** لأننا نريد تحديد المكوّن بالضبط (`ProfileActivity` داخل نفس التطبيق) دون ترك الخيار للنظام أو المستخدم.
```kotlin
val intent = Intent(this, ProfileActivity::class.java)
startActivity(intent)
```

---

### Exercise 3: Choosing the Right Component — scenario

**Scenario / Task:**
Design a mini feature: "When the device battery drops below 15%, show a notification suggesting the user enable battery saver mode."

**Requirements:**
1. Which component should listen for this system event?
2. Which component (if any) should it delegate heavier work to, if needed?

**نموذج الحل:**
1. **Broadcast Receiver** هو المكوّن المناسب لاستقبال حدث "البطارية منخفضة" من النظام.
2. بما أن المهمة هنا خفيفة (عرض إشعار فقط)، لا حاجة لتفويضها لخدمة؛ لكن لو كانت المهمة أثقل (مثل تحليل بيانات الاستخدام)، يجب تفويضها إلى `WorkManager` بدل تنفيذها مباشرة داخل الـ Receiver.

---

### Exercise 4: Resource Qualifiers — fill_gaps

**Scenario / Task:**
Your app needs to support both Arabic and English strings, and also adapt its colors for Dark Mode.

**Requirements:**
1. Name the two resource folders you would create for these two adaptations.

**نموذج الحل:**
- `res/values-ar/` → لنصوص اللغة العربية.
- `res/values-night/` → لألوان/موارد الوضع الليلي.
النظام يختار تلقائياً المجلد المناسب حسب لغة الجهاز أو وضع العرض الحالي، دون أي تعديل في منطق الكود.

---

### Exercise 5: Content Provider URI Design — scenario

**Scenario / Task:**
You are designing a Content Provider for a notes app. You need URIs for: all notes, a specific note by ID, and notes filtered by a category.

**Requirements:**
1. Propose three URI patterns following the style shown in the lecture.

**نموذج الحل:**
- `content://com.example.notes/notes` → كل الملاحظات.
- `content://com.example.notes/notes/5` → ملاحظة محددة برقم 5.
- `content://com.example.notes/notes/category/work` → ملاحظات مصنّفة تحت فئة "work".

---

### Exercise 6: code_fix — Foreground vs Background Service Choice

**Scenario / Task:**
A developer wrote a service that silently syncs contacts once a day in the background, but implemented it as a Foreground Service with a persistent notification, which annoys users.

**Requirements:**
1. Identify the design mistake.
2. Suggest the correct alternative component/approach.

**نموذج الحل:**
الخطأ: مزامنة يومية بسيطة لا يحتاج المستخدم أن يعرف عنها فوراً، فاستخدام Foreground Service مع إشعار دائم مبالغة غير ضرورية ومزعجة.
البديل الصحيح: استخدام `WorkManager` مع `PeriodicWorkRequest` لجدولة المزامنة اليومية دون إشعار دائم مزعج، لأن هذا العمل "خلفي" حقيقي لا يهتم به المستخدم بشكل مباشر.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: App Startup Flow

**Input:**
```text
User taps the app icon on the home screen.
The app has: MainActivity (declared with MAIN/LAUNCHER intent-filter),
and SettingsActivity (declared, no intent-filter).
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | النظام يقرأ AndroidManifest.xml | ؟ |
| 2 | النظام يبحث عن intent-filter بـ MAIN/LAUNCHER | ؟ |
| 3 | النظام يبدأ عملية Linux للتطبيق | ؟ |
| 4 | النظام يستدعي onCreate() لـ MainActivity | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | النظام يقرأ AndroidManifest.xml | يكتشف وجود Activity باسم MainActivity وSettingsActivity |
| 2 | النظام يبحث عن intent-filter بـ MAIN/LAUNCHER | يجد التطابق فقط في MainActivity |
| 3 | النظام يبدأ عملية Linux للتطبيق | تُنشأ عملية جديدة بمعرف مستخدم فريد للتطبيق |
| 4 | النظام يستدعي onCreate() لـ MainActivity | تُعرض واجهة MainActivity للمستخدم؛ SettingsActivity تبقى غير نشطة حتى تُستدعى صراحة |

**Result:** يظهر للمستخدم فقط شاشة `MainActivity`، بينما `SettingsActivity` تبقى خاملة حتى يتم استدعاؤها صراحة (Explicit Intent) من داخل التطبيق.

---

### Trace Exercise 2: Bound Service Lifecycle

**Input:**
```text
Activity A binds to MusicControlService.
Activity B also binds to the same service shortly after.
Activity A unbinds first, then Activity B unbinds.
```

**Trace step by step (complete the table):**
| الخطوة | العملية | حالة الخدمة |
| --- | --- | --- |
| 1 | Activity A تربط بالخدمة | ؟ |
| 2 | Activity B تربط بالخدمة أيضاً | ؟ |
| 3 | Activity A تفكّ الارتباط | ؟ |
| 4 | Activity B تفكّ الارتباط | ؟ |

**نموذج الحل:**
| الخطوة | العملية | حالة الخدمة |
| --- | --- | --- |
| 1 | Activity A تربط بالخدمة | الخدمة تُنشأ وتعمل، مرتبطة بمكوّن واحد (A) |
| 2 | Activity B تربط بالخدمة أيضاً | الخدمة تستمر بالعمل، الآن مرتبطة بمكونين (A وB) |
| 3 | Activity A تفكّ الارتباط | الخدمة تستمر بالعمل لأن B لا يزال مرتبطاً بها |
| 4 | Activity B تفكّ الارتباط | لا يوجد أي مكوّن مرتبط الآن، فتُدمَّر الخدمة تلقائياً |

**Result:** الخدمة تُدمَّر فقط بعد أن يفكّ **جميع** المكونات المرتبطة بها ارتباطها، تماماً كما ينص النص: "when all of them unbind, the service is destroyed."

---

### Trace Exercise 3: Implicit Intent Resolution

**Input:**
```text
App X sends an implicit intent with action=SEND, data type="image/*".
Device has 2 apps installed that declare intent-filters matching action=SEND with data type="image/*": Email App and Chat App.
```

**Trace step by step (complete the table):**
| الخطوة | العملية | النتيجة |
| --- | --- | --- |
| 1 | النظام يستقبل الـ Intent | ؟ |
| 2 | النظام يقارنه مع intent-filters لكل التطبيقات | ؟ |
| 3 | النظام يجد أكثر من تطابق | ؟ |

**نموذج الحل:**
| الخطوة | العملية | النتيجة |
| --- | --- | --- |
| 1 | النظام يستقبل الـ Intent | يحمل الإجراء SEND ونوع بيانات image/* |
| 2 | النظام يقارنه مع intent-filters لكل التطبيقات | يجد تطابقاً في تطبيقي البريد والدردشة |
| 3 | النظام يجد أكثر من تطابق | يعرض للمستخدم قائمة اختيار (Chooser) بين التطبيقين |

**Result:** يظهر للمستخدم مربع اختيار يسأله "شارك عبر: البريد / الدردشة"، تماماً كما وضّح النص: "If there are multiple components that can perform the action described by the intent, the user selects which one to use."

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: uml_design — Notes App Components

**Task:**
Design a simple component diagram for a "Notes" app that: shows a list of notes (UI), syncs notes to a remote server periodically in the background, lets other apps read shared notes, and notifies the user when a note's reminder time arrives. Identify which of the four app components you would use for each responsibility and justify each choice.

**نموذج الإجابة:**

#### 📊 المخطط: مكونات تطبيق الملاحظات

#### ما هذا المخطط؟
> يوضح كيف تُوزَّع مسؤوليات تطبيق الملاحظات على المكونات الأربعة الأساسية لأندرويد.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | NotesListActivity | activity | تعرض قائمة الملاحظات وتتفاعل مع المستخدم |
| 2 | SyncWorker (WorkManager) | service-like | يزامن الملاحظات مع الخادم بشكل دوري في الخلفية |
| 3 | NotesContentProvider | provider | يتيح لتطبيقات أخرى قراءة الملاحظات المشتركة |
| 4 | ReminderReceiver | receiver | يستقبل تنبيه الوقت المحدد لعرض إشعار التذكير |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| NotesListActivity | NotesContentProvider | query/insert | مباشر | تعرض القائمة عبر الاستعلام من مزوّد البيانات |
| SyncWorker | NotesContentProvider | read/write | مباشر | يقرأ ويكتب الملاحظات أثناء المزامنة |
| النظام | ReminderReceiver | Alarm broadcast | حدث | ينبّه الـ Receiver عند حلول وقت التذكير |
| ReminderReceiver | NotesListActivity | Notification tap | غير مباشر | يفتح الشاشة عند ضغط المستخدم على الإشعار |

```diagram
type: class
title: Notes App Components
direction: TD
nodes:
  - id: activity
    label: NotesListActivity
    kind: activity
    level: 0
  - id: provider
    label: NotesContentProvider
    kind: provider
    level: 1
  - id: worker
    label: SyncWorker
    kind: service
    level: 1
  - id: receiver
    label: ReminderReceiver
    kind: receiver
    level: 1
edges:
  - from: activity
    to: provider
  - from: worker
    to: provider
  - from: receiver
    to: activity
```

**معايير التقييم:**
- تحديد صحيح لأربعة مكونات مختلفة مع تبرير منطقي لكل اختيار.
- التمييز الصحيح بين ما يحتاج واجهة مستخدم (Activity) وما لا يحتاجها (Provider/Receiver/Worker).
- إدراك أن Content Provider هو الوسيط الوحيد المناسب للمشاركة الآمنة مع تطبيقات خارجية.

---

### Design Question 2: architecture — Manifest for a Multi-Feature App

**Task:**
You are building an app with: a launcher screen (`HomeActivity`), a background sync feature using `WorkManager`, a `BroadcastReceiver` that reacts to `BOOT_COMPLETED` to reschedule sync after device restart, and a `ContentProvider` exposing app data read-only to other apps. Sketch the manifest structure (elements only, not full XML) needed to declare all of this correctly.

**نموذج الإجابة:**

الهيكل المطلوب في `AndroidManifest.xml` (على مستوى العناصر):

```xml
<manifest>
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <application>
        <activity android:name=".HomeActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <receiver android:name=".BootReceiver" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
            </intent-filter>
        </receiver>

        <provider android:name=".AppDataProvider"
                  android:authorities="com.example.app.provider"
                  android:exported="true"
                  android:readPermission="com.example.app.permission.READ_DATA" />
    </application>
</manifest>
```

**معايير التقييم:**
- تعريف `HomeActivity` مع `intent-filter` صحيح لـ MAIN/LAUNCHER.
- تعريف `BootReceiver` مع `intent-filter` لـ `BOOT_COMPLETED` وصلاحية `RECEIVE_BOOT_COMPLETED`.
- تعريف `AppDataProvider` بـ `authorities` فريدة وصلاحية قراءة مناسبة لأنه "read-only" لتطبيقات أخرى.
- ملاحظة أن `WorkManager` لا يحتاج تعريفاً خاصاً في المانيفست (لا يُعتبر من مكونات أندرويد الأربعة الرسمية).

---

## بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What are the four types of Android app components?
A: Activities, Services, Broadcast Receivers, and Content Providers.

---

**Q2:** What is the difference between an APK and an AAB?
A: An APK is directly installable on a device; an AAB is a publishing format that cannot be installed directly and defers APK generation to Google Play.

---

**Q3:** Why does each Android app run in its own Linux process?
A: For security sandboxing — isolating each app's code and data from other apps.

---

**Q4:** What is an Activity?
A: A single screen that serves as an entry point for user interaction.

---

**Q5:** What is the difference between a started service and a bound service?
A: A started service runs independently until its work finishes; a bound service exists only while other components remain bound to it.

---

**Q6:** What are the two modern alternatives to using Service for background work?
A: Kotlin Coroutines and WorkManager.

---

**Q7:** Why should a BroadcastReceiver avoid heavy work?
A: Because it is meant only to react quickly to events; heavy work should be delegated to something like WorkManager.

---

**Q8:** How is data identified in a Content Provider?
A: Through URIs, such as content://com.example.app/users.

---

**Q9:** How is a Content Provider activated, unlike the other three components?
A: Through a request from a ContentResolver, not through an Intent.

---

**Q10:** What must you do before the Android system can start any app component (with one exception)?
A: Declare it in the AndroidManifest.xml file.

---

**Q11:** Which component can be registered dynamically in code instead of only in the manifest?
A: The BroadcastReceiver, via registerReceiver().

---

**Q12:** What is the modern recommended architecture instead of using many Activities?
A: Single-Activity architecture with multiple UI destinations managed via Jetpack Compose navigation.

---

**Q13:** What do resource qualifiers like values-ar or values-night do?
A: They let the system automatically pick resources matching the device's current configuration, like language or dark mode.

---

**Q14:** In Compose, how are string and image resources typically accessed?
A: Through type-safe functions like stringResource() and painterResource().

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> برنامج واحد مُجزّأ في المحاضرة على دفعات (GreetingCard App) — مُجمَّع هنا في مرجع واحد.

**MainActivity.kt**
```kotlin
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

**AndroidManifest.xml**
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

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: Explain why Android does not have a single main() entry point like traditional programs.
**نموذج الإجابة:** لأن أندرويد مصمم حول 4 مكونات مستقلة (Activity, Service, Broadcast Receiver, Content Provider)، وأي منها يمكن أن يكون نقطة البداية حسب كيف بدأ النظام تشغيل التطبيق (فتح شاشة، استقبال بث، استعلام بيانات...). هذا يختلف جذرياً عن اللغات التقليدية التي تبدأ من دالة واحدة محددة.

---

### Question 2: Describe the difference between explicit and implicit intents, with an example of each.
**نموذج الإجابة:** الـ Explicit Intent يحدد اسم المكوّن المستهدف بالضبط (مثل `Intent(this, ProfileActivity::class.java)`)، بينما الـ Implicit Intent يحدد فقط نوع الإجراء المطلوب (مثل "شارك صورة")، ويترك للنظام (وأحياناً للمستخدم عند وجود أكثر من خيار) تحديد المكوّن المناسب من أي تطبيق على الجهاز.

---

### Question 3: What is the principle of least privilege, and how does Android apply it?
**نموذج الإجابة:** هو مبدأ أمني يعطي كل تطبيق افتراضياً فقط الصلاحيات اللازمة لعمله، دون أي زيادة. أندرويد يطبقه عبر عزل كل تطبيق في عملية Linux خاصة بمعرف مستخدم فريد، بحيث لا يستطيع الوصول لبيانات أو مكونات تطبيقات أخرى إلا بإذن صريح (Permissions) يطلبه في المانيفست.

---

### Question 4: Compare a Foreground Service and a Background Service in terms of system priority.
**نموذج الإجابة:** الـ Foreground Service يظهر إشعاراً دائماً للمستخدم ويحظى بأولوية عالية من النظام لعدم إيقافه (لأن المستخدم مدرك لعمله، كتشغيل الموسيقى). أما الـ Background Service العادي فلا يظهر إشعاراً، والنظام له حرية أكبر في إيقافه مؤقتاً واستعادته لاحقاً إذا احتاج الذاكرة لأعمال أكثر إلحاحاً.

---

### Question 5: Why is it recommended to avoid heavy work inside a BroadcastReceiver, and what should be done instead?
**نموذج الإجابة:** لأن دور الـ BroadcastReceiver هو الاستجابة السريعة والخفيفة للأحداث فقط؛ تنفيذ عمل ثقيل مباشرة بداخله قد يجمّد الاستجابة أو يتسبب بمشاكل نظام. البديل الصحيح هو تفويض العمل الثقيل لمكوّن مصمم لذلك مثل `WorkManager` أو (تاريخياً) `JobScheduler`/`JobService`.

---

### Question 6: Explain the purpose and structure of a Content Provider URI, using an example.
**نموذج الإجابة:** الـ URI يحدد بدقة أي بيانات يُقصد الوصول إليها ضمن مزوّد المحتوى. مثال: `content://com.example.app/users` يشير لكل المستخدمين، بينما `content://com.example.app/users/1` يشير لمستخدم واحد محدد برقم 1. هذا يشبه عنوان ويب لكنه مخصص للبيانات الداخلية بين التطبيقات.

---

### Question 7: What is the difference between minSdk and targetSdk, and where are they defined?
**نموذج الإجابة:** `minSdk` هو أقل إصدار أندرويد يمكن تثبيت التطبيق عليه على الإطلاق، بينما `targetSdk` هو الإصدار الذي صُمم التطبيق واختُبر للعمل معه بأفضل شكل. يُعرَّفان داخل ملف `build.gradle` للمشروع (وليس داخل AndroidManifest.xml مباشرة).

---

### Question 8: Describe the Single-Activity architecture and why Google promotes it today.
**نموذج الإجابة:** بدل إنشاء Activity منفصلة لكل شاشة، يستخدم التطبيق Activity واحدة فقط تعمل كـ"مضيف" (Host)، وتُدار كل الشاشات داخلها كوجهات تنقّل (Navigation Destinations) عبر Jetpack Compose Navigation. هذا يقلل استهلاك الذاكرة، ويسهّل مشاركة الحالة بين الشاشات، ويحسّن سلاسة التنقل مقارنة بإنشاء وتدمير Activities متعددة.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين APK وAAB بدقة.
- [ ] أفهم لماذا كل تطبيق يعمل في Sandbox منفصل (Linux User ID, VM, Process).
- [ ] أستطيع تسمية المكونات الأربعة ووظيفة كل منها بدون تردد.
- [ ] أفرّق بين Started Service وBound Service وأعرف متى أستخدم كل منهما.
- [ ] أعرف البدائل الحديثة للـ Service (Coroutines, WorkManager).
- [ ] أفهم لماذا لا يجوز تنفيذ عمل ثقيل داخل BroadcastReceiver.
- [ ] أستطيع كتابة/قراءة بنية URI لمزوّد محتوى.
- [ ] أعرف أن Content Provider يُفعَّل عبر ContentResolver فقط.
- [ ] أفهم دور AndroidManifest.xml وكل العناصر الأساسية بداخله (`<activity>`, `<service>`, `<receiver>`, `<provider>`).
- [ ] أفرّق بين Explicit وImplicit Intent مع مثال لكل منهما.
- [ ] أعرف الفرق بين required="true" وrequired="false" في `<uses-feature>`.
- [ ] أفهم مفهوم Resource Qualifiers (values-ar, values-night) وكيف يعمل تلقائياً.
- [ ] أستطيع شرح مثال GreetingCard كاملاً سطراً بسطر.
- [ ] أفهم مفهوم Single-Activity Architecture وسبب تفضيله حديثاً.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Kotlin OOP | App Fundamentals | المكونات (Activity, Service...) تُكتب كأصناف (classes) ترث من فئات أساسية |
| Android Platform | App Fundamentals | فهم Linux Kernel وGradle ضروري لفهم Sandbox وبناء APK/AAB |
| App Fundamentals | Activity & Intents | Intent هو الجسر بين المكونات؛ التفصيل الكامل يأتي بالمحاضرة القادمة |
| App Fundamentals | Compose UI | مثال GreetingCard يمهّد لفهم @Composable وsetContent |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| APK/AAB | APK قابل للتثبيت، AAB للنشر فقط عبر المتجر |
| المكونات الأربعة | Activity (شاشة)، Service (خلفية)، Receiver (أحداث)، Provider (بيانات مشتركة) |
| الأمان | كل تطبيق = عملية Linux معزولة بمبدأ أقل الصلاحيات |
| المانيفست | لا مكوّن يعمل بدون تعريف فيه (باستثناء Receiver الديناميكي) |
| الحديث | Single Activity + Compose Nav، وCoroutines/WorkManager بدل Service |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `startActivity()` | تشغيل Activity | التنقل بين الشاشات |
| `startService()`/`bindService()` | تشغيل/ربط Service | العمل في الخلفية |
| `sendBroadcast()` | إرسال بث | إعلام التطبيقات بحدث |
| `query()` على `ContentResolver` | استعلام بيانات | التعامل مع Content Provider |
| `<uses-feature required="true/false">` | تعريف متطلب عتادي | فلترة المتجر أو تحقق وقت التشغيل |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | AAB لا يمكن تثبيتها مباشرة — للنشر فقط |
| 2 | لا مكوّن يعمل دون تعريفه في المانيفست (إلا Broadcast Receiver ديناميكياً) |
| 3 | لا تنفّذ عملاً ثقيلاً داخل BroadcastReceiver |
| 4 | Content Provider الوحيد الذي يُفعَّل عبر ContentResolver وليس Intent |
| 5 | Service ليس الخيار الافتراضي اليوم — فضّل Coroutines/WorkManager |
| 6 | كل تطبيق أندرويد = عملية Linux معزولة بمبدأ أقل الصلاحيات |

<!-- VALIDATION: coverage=complete; source=تخصصية_2_نظري_مـ4.pdf (Application Fundamentals, pages 1-31); components_covered=Activity,Service,BroadcastReceiver,ContentProvider,Manifest,Resources,GreetingCardApp; mcq=16; debug=6; extra_exercises=6; trace_exercises=3; design_questions=2; qa_cards=14; theory_questions=8; language_policy=English quotes/questions + Arabic explanations per schema v1.0 -->

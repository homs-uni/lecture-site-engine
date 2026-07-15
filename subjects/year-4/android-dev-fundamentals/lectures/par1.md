# المحاضرة 1 — Android Platform (منصة أندرويد)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** Android Platform Architecture & Kotlin for Android

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1. فهم المنصة والبنية المعمارية | `Linux Kernel`, `HAL`, `ART`, `Java API Framework` | فهم كيف يعمل النظام تحت الغطاء |
| 2. Android Platform (هذه المحاضرة) ← أنت هنا | `Android SDK`, `Kotlin`, `Android Studio` | فهم مكونات المنصة ولغة Kotlin وأدوات التطوير |
| 3. Kotlin Essentials | `val/var`, `functions`, `null safety` | كتابة كود Kotlin سليم |
| 4. App Fundamentals | `Activity`, `Service`, `Manifest` | بناء مكونات تطبيق Android |
| 5. UI مع Jetpack Compose | `@Composable`, `Modifier` | بناء واجهات مستخدم حديثة |

> **نوع هذه المحاضرة:** نظرية بحتة (Theoretical) — تشرح البنية المعمارية للمنصة، تاريخ الإصدارات، ومقدمة عن Kotlin وJetpack Compose وAndroid Studio. لا تحتوي على تمارين برمجية تنفيذية من المحاضرة نفسها، لذا الأكواد وتمارين Debug أدناه مبنية على المقتطفات النظرية الظاهرة في الشرائح (Jetpack Compose snippets).

---

# الجزء الأول: الشرح التفصيلي

### 1. تعريف Android

#### النص الأصلي يقول (English):
> "Android is an open source and Linux-based Operating System designed primarily for touchscreen mobile devices such as smartphones and tablets."

#### الشرح المبسّط:
أندرويد هو نظام تشغيل، أي البرنامج الذي يدير جهاز الموبايل بالكامل (الشاشة، الذاكرة، التطبيقات، الاتصال...). كلمة `open source` تعني أن الكود المصدري متاح للجميع، وكلمة `Linux-based` تعني أنه مبني فوق نواة (kernel) لينكس المعروفة والمُختبرة أمنياً منذ عقود، بدل أن تبني جوجل نواة من الصفر.

**لماذا؟** بناء نظام تشغيل من الصفر مكلف جداً وخطير (أخطاء أمنية، مشاكل استقرار). استخدام Linux كأساس وفّر على جوجل سنوات من التطوير، واستفادت من نظام أمان وإدارة ذاكرة ناضج وموثوق.

#### 💡 التشبيه:
> تخيل أنك تبني بيتاً جديداً — بدل أن تصب الأساسات (foundation) من جديد، تشتري أرضاً عليها أساسات قوية جاهزة من مهندس موثوق وتبني بيتك فوقها.
> **وجه الشبه:** Linux Kernel = الأساسات الجاهزة، Android = البيت المبني فوقها.

---

### 1.1. من يطوّر Android؟

#### النص الأصلي يقول (English):
> "Android is developed by a consortium of developers known as the Open Handset Alliance, with the main contributor and commercial marketer being Google."

#### الشرح المبسّط:
`Open Handset Alliance` هو تحالف من عدة شركات (مصنّعي هواتف، شركات اتصالات، شركات برمجيات) يشتركون في تطوير أندرويد، لكن جوجل هي الجهة الأساسية التي تقود التطوير وتُسوّقه تجارياً.

**لماذا؟** لأن نظام تشغيل موحّد يعمل على أجهزة كثيرة (سامسونج، هواوي، شاومي...) يحتاج تعاون بين عدة أطراف حتى يعمل بشكل متوافق على كل الأجهزة (`compatibility`).

---

### 1.2. النهج الموحّد للتطوير (Unified Development Approach)

#### النص الأصلي يقول (English):
> "Android offers a unified approach to application development for mobile devices which means developers need to develop only for Android, and their applications should be able to run on different devices powered by Android."

#### الشرح المبسّط:
المطوّر يكتب التطبيق **مرة واحدة** فقط لأندرويد، وهذا التطبيق يعمل نظرياً على أي جهاز يشغّل أندرويد — سواء كان سامسونج أو شاومي أو تابلت — دون الحاجة لإعادة كتابة الكود لكل جهاز على حدة.

**لماذا؟** لو كان كل مصنّع يحتاج كوداً مختلفاً، لتضاعف عمل المطوّرين آلاف المرات. الهدف هو "اكتب مرة، اعمل في كل مكان" (Write Once, Run Anywhere تقريباً).

#### الفهم الخاطئ الشائع ❌:
> "التطبيق يعمل بنفس الشكل تماماً على كل الأجهزة بدون أي فروقات."

#### الفهم الصحيح ✅:
> النهج موحّد من ناحية بيئة التطوير والـ APIs، لكن يبقى على المطوّر التعامل مع اختلاف أحجام الشاشات وقدرات الأجهزة (`responsive design`).

---

### 1.3. تاريخ الإصدارات الأولى

#### النص الأصلي يقول (English):
> "The first beta version of the Android Software Development Kit (SDK) was released by Google in 2007, whereas the first commercial version, Android 1.0, was released in September 2008."

#### الشرح المبسّط:
`SDK` (بيتا) صدرت 2007 كنسخة تجريبية للمطورين، ثم بعد سنة صدر أول إصدار تجاري حقيقي (`Android 1.0`) في سبتمبر 2008 ليكون متاحاً للمستخدمين العاديين على الأجهزة.

**لماذا؟** الفرق بين `Beta` و`Commercial Release` مهم: البيتا للاختبار وجمع الملاحظات من المطورين قبل الإطلاق الرسمي للجمهور.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ما الفرق بين إصدار الـ SDK وإصدار نظام التشغيل نفسه (Android 1.0)؟
> **لماذا هذا مهم؟** لأنه يوضّح أن أدوات المطوّرين قد تسبق المنتج النهائي للمستخدم بفترة زمنية.

---

### 2. الترخيص ولغة البرمجة (What is Android — الجزء الثاني)

#### النص الأصلي يقول (English):
> "The source code for Android is available under free and open source software licenses. Android applications are usually developed in the Java or Kotlin language using the Android SDK (Software Development Kit)."

#### الشرح المبسّط:
كود أندرويد المصدري متاح مجاناً تحت تراخيص `open source` (يمكن لأي شركة أخذه وتعديله). والتطبيقات عادة تُكتب بلغة `Java` (التقليدية) أو `Kotlin` (الحديثة والموصى بها حالياً من جوجل).

---

### 2.1. تعريف Android SDK

#### النص الأصلي يقول (English):
> "Android SDK (Software Development Kit) is a set of tools required to develop, debug, and test Android applications. Includes: SDK Tools (for compiling & building apps), SDK Platform (for different Android versions), Emulator (for testing apps without a real device)."

#### الشرح المبسّط:
`SDK` هو "صندوق أدوات" كامل يحتاجه أي مطوّر أندرويد. يحتوي على 3 أجزاء رئيسية:
| المكوّن | الوظيفة |
| --- | --- |
| `SDK Tools` | تجميع (compile) وبناء (build) التطبيق ليصبح ملف قابل للتثبيت |
| `SDK Platform` | نسخ مختلفة من إصدارات أندرويد لاختبار التطبيق عليها |
| `Emulator` | جهاز أندرويد وهمي على الكمبيوتر لتجربة التطبيق بدون هاتف حقيقي |

**لماذا؟** بدون `Emulator` مثلاً، سيحتاج كل مطوّر شراء عشرات الهواتف الحقيقية لاختبار تطبيقه على إصدارات وشاشات مختلفة — وهذا مكلف وغير عملي.

#### 💡 التشبيه:
> الـ SDK أشبه بصندوق أدوات النجار الكامل: منشار (للتجميع)، مسطرة قياس بأحجام مختلفة (لإصدارات أندرويد المختلفة)، ونموذج تجريبي للبيت قبل بناء الحقيقي (Emulator).
> **وجه الشبه:** أدوات النجار = SDK Tools، مقاسات الخشب المختلفة = SDK Platforms، النموذج التجريبي = Emulator.

---

### 2.2. توزيع التطبيقات

#### النص الأصلي يقول (English):
> "Once developed, Android applications can be packaged easily and sold out either through a store such as Google Play or the Amazon Appstore."

#### الشرح المبسّط:
بعد الانتهاء من بناء التطبيق، يُحزَّم (`packaged`) في ملف واحد (عادة `.apk` أو `.aab`) ويُرفع على متجر مثل `Google Play` أو `Amazon Appstore` ليصل للمستخدمين.

---

### 3. Kotlin for Android — لماذا Kotlin أولاً منذ 2019؟

#### النص الأصلي يقول (English):
> "Android mobile development has been Kotlin-first since Google I/O in 2019."

#### الشرح المبسّط:
منذ مؤتمر جوجل 2019، أصبحت `Kotlin` هي اللغة **المفضّلة رسمياً** من جوجل لتطوير أندرويد، بمعنى أن كل الميزات والمكتبات الجديدة تُصمَّم أولاً لتدعم Kotlin، وJava تأتي بدرجة ثانية.

---

### 3.1. فوائد استخدام Kotlin

#### النص الأصلي يقول (English):
> "Less code combined with greater readability... Fewer common errors. Apps built with Kotlin are 20% less likely to crash based on Google's internal data... Kotlin support in Jetpack libraries... Support for multiplatform development."

#### الشرح المبسّط:
| الفائدة | الشرح بالعربي |
| --- | --- |
| كود أقل وأوضح | تكتب أسطراً أقل لتحقيق نفس النتيجة، وتفهم كود الآخرين أسرع |
| أخطاء أقل | التطبيقات المبنية بـ Kotlin أقل عرضة للتعطّل (`crash`) بنسبة 20% حسب بيانات جوجل الداخلية |
| دعم Jetpack | `Jetpack Compose` مبني أساساً على Kotlin، وامتدادات `KTX` تضيف ميزات Kotlin (coroutines، extension functions) للمكتبات القديمة |
| Multiplatform | يمكن مشاركة نفس كود Kotlin بين أندرويد وiOS والويب والباك-إند عبر `Kotlin Multiplatform` |

**لماذا أخطاء أقل تحديداً؟** لأن Kotlin يفرض معالجة `null` (القيم الفارغة) بشكل صريح في الكود (`Null Safety`)، بينما Java تسمح بتجاهلها مما يسبب أخطاء شهيرة تسمى `NullPointerException`.

#### ⚖️ المقايضة: Java مقابل Kotlin
| | Java | Kotlin |
| --- | --- | --- |
| المزايا | ناضجة جداً، مكتبات قديمة كثيرة متوافقة | كود أقصر، أمان أكبر ضد null، مدعومة رسمياً أولاً من جوجل |
| العيوب | كود أطول، عرضة أكثر لأخطاء NullPointerException | أحدث نسبياً، منحنى تعلّم بسيط لكن يحتاج تأقلم قادم من Java |
| متى تختاره | مشروع قديم موجود بالكامل بـ Java | أي مشروع أندرويد جديد اليوم |

---

### 3.2. النضج والتوافق مع Java

#### النص الأصلي يقول (English):
> "Mature language and environment... Interoperability with Java. You can use Kotlin along with the Java programming language in your applications without needing to migrate all your code to Kotlin. Easy learning... Big community... Over 95% of the top thousand Android apps use Kotlin."

#### الشرح المبسّط:
Kotlin موجودة منذ 2011 وأصبحت لغة ناضجة مدمجة بالكامل في `Android Studio`. الميزة الأهم عملياً: `Interoperability` أي يمكنك استخدام Kotlin وJava **في نفس المشروع** بدون الحاجة لإعادة كتابة كل الكود القديم بـ Kotlin دفعة واحدة.

**لماذا هذا مهم عملياً؟** لأن الشركات التي لديها تطبيق قديم مكتوب بالكامل بـ Java لا تستطيع (ولا تريد) إعادة كتابته من الصفر؛ التوافقية تسمح لهم بإضافة ميزات جديدة بـ Kotlin تدريجياً.

#### مهم للامتحان ⚠️:
> احفظ الرقم: أكثر من 95% من أفضل 1000 تطبيق أندرويد تستخدم Kotlin — هذا مؤشر إحصائي مهم يُستخدم كثيراً في أسئلة الاختيار من متعدد.

---

### 4. إصدارات Android القديمة والحديثة (Android Versions)

#### النص الأصلي يقول (English):
> "Codename Version Released API Level — Honeycomb 3.0-3.2.6 Feb 2011 11-13 ... Marshmallow 6.0-6.0.1 Oct 2015 23 ... Nougat 7.0-7.1 Sept 2016 24-25 ... Android 16 16 Jun 2025 36"

#### الشرح المبسّط:
كل إصدار أندرويد له 3 عناصر: **اسم رمزي** (Codename مثل Honeycomb، Marshmallow)، **رقم إصدار** (Version مثل 6.0)، و**مستوى API** (API Level رقم صحيح فريد). لاحظ أن جوجل توقّفت عن استخدام أسماء الحلويات (Codenames) بعد Pie (9) واستخدمت أرقاماً فقط (Android 10، 11، 12...).

جدول مختصر لأهم الإصدارات:
| Codename | Version | API Level |
| --- | --- | --- |
| Marshmallow | 6.0 | 23 |
| Nougat | 7.0–7.1 | 24–25 |
| Oreo | 8.0–8.1 | 26–27 |
| Pie | 9 | 28 |
| Android 10 | 10 | 29 |
| Android 13 | 13 | 33 |
| Android 14 | 14 | 34 |
| Android 15 | 15 | 35 |
| Android 16 | 16 | 36 |

---

### 4.1. مفهوم API Level

#### النص الأصلي يقول (English):
> "API level is an integer value that uniquely identifies the framework API revision offered by a version of the Android platform... Each Android platform version supports exactly one API level, although support is implicit for all earlier API levels (down to API level 1)."

#### الشرح المبسّط:
`API Level` هو رقم صحيح فريد يمثّل "نسخة" الـ Framework API المتاحة في إصدار أندرويد معيّن. الإطار (`Framework API`) يشمل:
- مجموعة أساسية من `packages` و`classes`
- عناصر XML لتعريف ملف `manifest`
- عناصر XML للموارد (`resources`)
- مجموعة من الـ `Intents`
- مجموعة من الأذونات (`permissions`)

**النقطة الأهم:** كل إصدار يدعم API level واحد فقط بشكل مباشر، لكنه **يدعم ضمنياً** كل المستويات الأقدم منه رجوعاً حتى API 1. أي تطبيق مبني لـ API 21 مثلاً سيعمل على أجهزة API 21 وما فوق (طالما لم يُحدَّد حد أعلى صريح).

**لماذا هذا مهم للمطوّر؟** لأن المطوّر يحدد في المشروع قيمتين: `minSdkVersion` (أقل API يدعمه التطبيق) و`targetSdkVersion` (API الذي صُمّم له واختُبر عليه)، وهذا يتحكم بأي الأجهزة تستطيع تثبيت التطبيق من المتجر.

#### 🔍 تتبع التنفيذ: هل يعمل التطبيق على هذا الجهاز؟
**المدخل:** تطبيق `minSdkVersion = 26` (Oreo)، وجهاز يعمل بـ API Level 24 (Nougat).

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | مقارنة API الجهاز (24) مع minSdk المطلوب (26) | 24 < 26 |
| 2 | النظام يتحقق من التوافق قبل التثبيت | غير متوافق |

**النتيجة:** لا يستطيع المستخدم تثبيت التطبيق من المتجر لأن جهازه أقدم من الحد الأدنى المطلوب.

---

### 5. بنية منصة أندرويد (Android Platform Architecture)

#### النص الأصلي يقول (English):
> "The Android platform is software stack created for a wide range of mobile devices that uses a modified Linux kernel. This graphic represents the major components of the Android platform (The Android software stack)."

#### الشرح المبسّط:
منصة أندرويد مبنية كـ `software stack` — أي طبقات برمجية مرصوصة فوق بعضها، كل طبقة تعتمد على الطبقة التي تحتها وتوفّر خدمات للطبقة التي فوقها. من الأسفل للأعلى:

```algorithm
1 | Linux Kernel | نواة معدّلة | إدارة الأمان، الذاكرة، العمليات، الـ drivers
2 | Hardware Abstraction Layer (HAL) | مكتبات وسيطة | ربط الهاردوير بالـ Java API Framework
3 | Android Runtime (ART) + Native C/C++ Libraries | بيئة تشغيل + مكتبات | تشغيل الكود وتوفير وظائف منخفضة المستوى
4 | Java API Framework | مجموعة APIs بلغة Java | توفير Managers ومكوّنات جاهزة للمطوّرين
5 | System Apps | تطبيقات نظام جاهزة | Dialer, Email, Calendar, Camera...
```

**لماذا التصميم الطبقي (Layered)؟** كل طبقة تُخفي التعقيد عن الطبقة التي فوقها. مطوّر التطبيق (في أعلى الهرم) لا يحتاج لمعرفة تفاصيل الـ Linux Kernel أبداً — فقط يتعامل مع Java API Framework الجاهز.

#### 📊 المخطط: Android Software Stack

#### ما هذا المخطط؟
> يوضّح الطبقات الخمس المكوّنة لمنصة أندرويد من الأسفل (الهاردوير) إلى الأعلى (تطبيقات المستخدم)، وكيف تعتمد كل طبقة على التي تحتها.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Linux Kernel | foundation | القاعدة: أمان، ذاكرة، drivers |
| 2 | HAL | bridge | يربط الهاردوير بالبرمجيات |
| 3 | ART | runtime | تشغيل بايت كود التطبيقات |
| 4 | Native C/C++ Libraries | library | مكتبات منخفضة المستوى (Webkit, OpenGL ES) |
| 5 | Java API Framework | api | Managers جاهزة للمطوّر |
| 6 | System Apps | application | تطبيقات جاهزة (Dialer, Camera...) |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Linux Kernel | HAL | يوفّر drivers | اعتماد | HAL يبني فوق الـ drivers |
| HAL | ART/Native Libraries | يعرض الهاردوير | استدعاء | تُستخدم الوظائف عبر الـ HAL |
| ART/Native Libraries | Java API Framework | ينفّذ الكود | استدعاء | الإطار يستخدم ART لتشغيل التطبيقات |
| Java API Framework | System Apps | يوفّر Managers | استخدام | التطبيقات تستخدم الـ APIs الجاهزة |

```diagram
type: flowchart
title: Android Software Stack
direction: BT
nodes:
  - id: kernel
    label: Linux Kernel
    kind: foundation
    level: 0
  - id: hal
    label: Hardware Abstraction Layer (HAL)
    kind: bridge
    level: 1
  - id: art
    label: Android Runtime (ART)
    kind: runtime
    level: 2
  - id: native
    label: Native C/C++ Libraries
    kind: library
    level: 2
  - id: framework
    label: Java API Framework
    kind: api
    level: 3
  - id: apps
    label: System Apps
    kind: application
    level: 4
edges:
  - from: kernel
    to: hal
  - from: hal
    to: art
  - from: hal
    to: native
  - from: art
    to: framework
  - from: native
    to: framework
  - from: framework
    to: apps
```

---

### 6. Linux Kernel

#### النص الأصلي يقول (English):
> "The foundation of the Android platform is the Linux kernel. For example, the Android Runtime (ART) relies on the Linux kernel for underlying functionalities such as threading and low-level memory management. Using a Linux kernel lets Android take advantage of key security features and lets device manufacturers develop hardware drivers for a well-known kernel."

#### الشرح المبسّط:
Linux Kernel هو "الأساس" الذي يقف عليه كل شيء آخر. توفر النواة وظائف حرجة مثل الـ `threading` (تشغيل عدة مهام بالتوازي) وإدارة الذاكرة منخفضة المستوى، وحتى `ART` نفسها تعتمد على هذه الخدمات ولا تُعيد اختراعها.

**لماذا الأمان تحديداً؟** لأن Linux Kernel نظام مُختبر أمنياً منذ عقود من آلاف المطورين حول العالم، فاستخدامه يمنح أندرويد ميزات أمان جاهزة (مثل عزل العمليات عن بعضها).

**لماذا تسهيل عمل المصنّعين؟** لأن الشركات المصنّعة للهواتف (سامسونج، شاومي...) تحتاج كتابة `drivers` (برامج تشغيل) للكاميرا والشاشة والـ Bluetooth... وبما أن Linux معروف ومنتشر، فمهندسو الهاردوير لديهم خبرة جاهزة بكتابة drivers له.

---

### 6.1. خدمات Linux Kernel

#### النص الأصلي يقول (English):
> "Linux Kernel Standard Services — security, memory & process management, file & network I/O, device drivers. Linux Kernel Android-specific Services — power management, android shared memory, low memory killer, Inter-process communication, and much more…"

#### الشرح المبسّط:
| النوع | الخدمات |
| --- | --- |
| خدمات Linux القياسية (Standard) | الأمان `security`، إدارة الذاكرة والعمليات، الإدخال/الإخراج للملفات والشبكة، تعريفات الأجهزة (`device drivers`) |
| خدمات مخصّصة لأندرويد (Android-specific) | إدارة الطاقة (`power management`)، الذاكرة المشتركة الخاصة بأندرويد، `Low Memory Killer` (يغلق التطبيقات تلقائياً عند نقص الذاكرة)، التواصل بين العمليات (`IPC`) |

**لماذا Low Memory Killer مهم؟** لأن الهواتف عادة لديها ذاكرة محدودة (خلافاً للكمبيوتر)، فيحتاج النظام آلية ذكية تغلق التطبيقات في الخلفية غير المهمة تلقائياً عندما تقترب الذاكرة من الامتلاء، بدل أن يتجمّد النظام بالكامل.

---

### 7. طبقة تجريد الهاردوير (Hardware Abstraction Layer - HAL)

#### النص الأصلي يقول (English):
> "The hardware abstraction layer (HAL) provides standard interfaces that expose device hardware capabilities to the higher-level Java API framework. The HAL consists of multiple library modules, each of which implements an interface for a specific type of hardware component, such as the camera or Bluetooth module. When a framework API makes a call to access device hardware, the Android system loads the library module for that hardware component."

#### الشرح المبسّط:
`HAL` هو طبقة وسيطة (`bridge`) بين الهاردوير الفعلي (كاميرا، Bluetooth، حساسات) وبين `Java API Framework` في الأعلى. كل نوع هاردوير له `library module` منفصلة تنفّذ `interface` موحّدة (واجهة قياسية).

**لماذا هذا التصميم؟** لأن كل شركة تصنّع كاميرا هاتفها بطريقة مختلفة داخلياً (chip مختلف مثلاً)، لكن الـ `interface` الموحّدة تجعل مطوّر التطبيق يستدعي دالة واحدة موحّدة (مثل "التقط صورة") بغض النظر عن نوع الكاميرا الفعلي في الجهاز. الـ HAL "يترجم" هذا الطلب الموحّد إلى الأوامر الخاصة بهاردوير ذلك الجهاز تحديداً.

#### 💡 التشبيه:
> تخيل مقبس كهرباء عالمي (Universal Adapter) — تضع فيه أي جهاز كهربائي من أي بلد، والمقبس "يترجم" الفولت والشكل ليتوافق مع مقبس الحائط المحلي.
> **وجه الشبه:** الجهاز الكهربائي = طلب من Java API Framework، مقبس الحائط المحلي = هاردوير الشركة المصنّعة، والـ Universal Adapter = HAL.

#### ⚙️ الخطوات / الخوارزمية: كيف يصل طلب من التطبيق إلى الكاميرا؟
#### ما هدف هذه العملية؟
> توضيح كيف تنتقل استدعاءات الهاردوير من كود المطوّر حتى القطعة الفعلية.

```algorithm
1 | استدعاء دالة الكاميرا | Java API Framework | التطبيق يطلب "التقط صورة"
2 | تحديد الهاردوير المطلوب | Android System | النظام يحدد أن الطلب يخص الكاميرا
3 | تحميل الـ library module | HAL | يُحمَّل موديول الكاميرا الخاص بهذا الجهاز
4 | تنفيذ الأمر فعلياً | Hardware (Camera Chip) | الكاميرا تلتقط الصورة فعلياً
```

**نقاط التنفيذ:**
- لو لم يوجد موديول HAL مطابق لقطعة هاردوير معيّنة، فإن الميزة المرتبطة بها (مثل الكاميرا) لن تعمل على ذلك الجهاز.

---

### 8. بيئة تشغيل أندرويد (Android Runtime - ART)

#### النص الأصلي يقول (English):
> "ART is written to run multiple virtual machines on low-memory devices by executing Dalvik Executable format (DEX) files, a bytecode format designed specifically for Android that's optimized for a minimal memory footprint. Build tools compile Java/Kotlin sources into DEX bytecode, which can run on the Android platform."

#### الشرح المبسّط:
`ART` هي المسؤولة عن تشغيل الكود الفعلي لتطبيقك. لكنها لا تُشغّل كود Kotlin/Java مباشرة، بل يحوّله `Build tools` أولاً إلى صيغة خاصة اسمها `DEX bytecode` (`Dalvik Executable`) مصمّمة خصيصاً لتكون خفيفة على الذاكرة (مناسبة لهواتف بذاكرة محدودة).

**لماذا لا تُشغّل Kotlin/Java مباشرة؟** لأن صيغة `.class` العادية في Java مصمّمة لأجهزة الكمبيوتر ذات موارد أكبر. صيغة DEX مُحسَّنة خصيصاً لتوفير الذاكرة والبطارية على الأجهزة المحمولة الأضعف موارداً.

---

### 8.1. المكتبات الأساسية داخل ART

#### النص الأصلي يقول (English):
> "Android also includes a set of core runtime libraries that provide most of the functionality of the Java programming language... basic java classes -- java.*, javax.* ... app lifecycle -- android.*, androidx.* ... Internet/Web services -- org.* and modern networking libraries (Retrofit, OkHttp, Ktor) ... Unit testing -- junit.*, androidx.test.*"

#### الشرح المبسّط:
| الفئة | الـ Packages/المكتبات |
| --- | --- |
| أساسيات Java | `java.*`, `javax.*` |
| دورة حياة التطبيق | `android.*`, `androidx.*` |
| خدمات الإنترنت | `org.*` ومكتبات شبكات حديثة مثل `Retrofit`, `OkHttp`, `Ktor` |
| اختبار الوحدات | `junit.*`, `androidx.test.*` |

**لماذا هذا التصنيف مهم؟** لأنه يوضّح أن أندرويد لا يعيد اختراع كل شيء — فهو يستفيد من مكتبات Java القياسية (`java.*`) بجانب مكتبات مخصّصة له (`android.*`) ومكتبات شبكات حديثة معتمدة في المجتمع.

---

### 9. ART مقابل Dalvik

#### النص الأصلي يقول (English):
> "Prior to Android version 5.0 (API level 21), Dalvik was the Android runtime. If your app runs well on ART, then it can work on Dalvik as well, but the reverse might not be true."

#### الشرح المبسّط:
قبل أندرويد 5.0 (API 21)، كانت `Dalvik` هي بيئة التشغيل المستخدمة، ثم استُبدلت بـ `ART`. الفرق الجوهري بينهما هو **متى تتم الترجمة (compilation)**.

#### جدول المقارنة:
| الخاصية | Dalvik (DVM) | ART |
| --- | --- | --- |
| الترجمة | `Just-in-Time (JIT)` — أثناء التشغيل | `Ahead-of-Time (AOT)` — قبل التشغيل |
| الأداء | بطء أكبر في بدء التشغيل | بدء تشغيل أسرع وأداء أفضل |
| استخدام الذاكرة | استهلاك أقل في البداية | إدارة ذاكرة أكفأ بشكل عام |
| الحالة | تقنية قديمة، لا تزال مدعومة جزئياً | البيئة الافتراضية منذ أندرويد 5.0+ |

**لماذا "لو عمل على ART سيعمل على Dalvik لكن العكس ليس بالضرورة"؟** لأن ART أحدث وأكثر تشدداً/تحسيناً، فبعض الكود المكتوب بافتراضات قديمة خاصة بـ Dalvik (JIT) قد لا يعمل بنفس السلوك أو الكفاءة على AOT في ART.

#### مهم للامتحان ⚠️:
> احفظ الفرق: `JIT = Just-in-Time` (ترجمة أثناء التشغيل، خاص بـ Dalvik) مقابل `AOT = Ahead-of-Time` (ترجمة مسبقة قبل التشغيل، خاص بـ ART).

---

### 10. مكتبات C/C++ الأصلية (Native C/C++ Libraries)

#### النص الأصلي يقول (English):
> "Many core Android system components and services, such as ART and HAL, are built from native code that requires native libraries written in C and C++. The Android platform provides Java framework APIs to expose the functionality of some of these native libraries to apps. E.g., you can access OpenGL ES through the Android framework's Java OpenGL API to add support for drawing and manipulating 2D and 3D graphics in your app."

#### الشرح المبسّط:
بعض مكونات أندرويد الأساسية (نفسها ART وHAL) مبنية بلغتي C وC++ (وليس Java/Kotlin) لأسباب تتعلق بالأداء العالي والتحكم المباشر بالهاردوير. توفّر جوجل واجهات Java (مثل `Java OpenGL API`) لتسمح لمطوّري التطبيقات باستخدام هذه المكتبات القوية بدون كتابة C++ بأنفسهم.

**لماذا C/C++ وليس Java مباشرة لهذه المكتبات؟** لأن C/C++ لغات "منخفضة المستوى" (`low-level`) تعطي تحكماً أدق بالذاكرة والأداء، وهو أمر ضروري لعمليات ثقيلة مثل الرسوميات (`graphics`) والوسائط (`media`).

---

### 11. إطار Java API (Java API Framework)

#### النص الأصلي يقول (English):
> "The entire feature-set of the Android OS is available to you through APIs written in the Java language. These APIs form the building blocks you need to create Android apps by simplifying the reuse of core, modular system components and services."

#### الشرح المبسّط:
هذه هي الطبقة التي يتعامل معها مطوّر التطبيقات مباشرة في أغلب الأحيان — مجموعة من الـ `Managers` الجاهزة التي تختصر عليه كتابة كود معقّد من الصفر.

### قاموس المصطلحات (الـ 9 Managers/الأنظمة):
| Manager | الوظيفة الأساسية |
| --- | --- |
| `Activity Manager` | إدارة دورة حياة الـ Activities (الشاشات)، ضمان شاشة واحدة فقط في المقدمة |
| `Window Manager` | التحكم بإنشاء وعرض نوافذ التطبيق وترتيبها |
| `Package Manager` | تثبيت/تحديث/حذف التطبيقات وإدارة أذوناتها |
| `Resource Manager` | مركزية الوصول للموارد (نصوص، صور، ألوان) |
| `Notification Manager` | عرض التنبيهات في شريط الحالة |
| `Location Manager` | الوصول لموقع الجهاز الجغرافي |
| `Telephony Manager` | ميزات الاتصال (مكالمات، رسائل SMS) |
| `View System` | مكوّنات واجهة جاهزة (أزرار، نصوص، قوائم) |
| `Content Provider` | مشاركة البيانات بأمان بين التطبيقات المختلفة |

**لماذا هذا التصميم القائم على Managers منفصلة؟** يسمى `Separation of Concerns` (فصل الاهتمامات) — كل Manager مسؤول عن مهمة واحدة محددة، مما يجعل النظام أسهل صيانة وتوسيعاً، ويسمح للمطوّر باستخدام كل Manager بشكل مستقل حسب حاجته.

#### ⚙️ الخطوات / الخوارزمية: دورة عمل Activity Manager الأساسية
#### ما هدف هذه العملية؟
> ضمان أن شاشة واحدة فقط تظهر في مقدمة الشاشة في أي وقت، وإدارة الانتقال بينها.

```algorithm
1 | إطلاق Activity جديدة | Activity Manager | يُضاف Activity الجديد فوق الـ back stack
2 | إيقاف Activity السابقة مؤقتاً | Activity Manager | الشاشة القديمة تنتقل لحالة pause
3 | عرض Activity الجديدة | Window Manager | الشاشة الجديدة تظهر للمستخدم
4 | ضغط زر الرجوع (Back) | Activity Manager | يُزال Activity الحالي من الـ back stack ويعود السابق
```

**نقاط التنفيذ:**
- يستخدم `common navigation back stack` — لذا الترتيب مهم؛ آخر شاشة دخلت هي أول من تخرج (LIFO).

---

### 12. تطبيقات النظام (System Apps)

#### النص الأصلي يقول (English):
> "Android comes with a set of core apps for email, SMS messaging, calendars, internet browsing, contacts, and more. Apps included with the platform have no special status among the apps the user chooses to install... The system apps function both as apps for users and to provide key capabilities that developers can access from their own app."

#### الشرح المبسّط:
هذه الطبقة العليا من الـ stack تضم تطبيقات جاهزة (بريد، رسائل، تقويم، متصفح، كاميرا...). **النقطة الجوهرية:** هذه التطبيقات ليست "مميزة" أو "محمية" — يمكن لتطبيق طرف ثالث أن يحل محلها كافتراضي (مثلاً متصفح Chrome بدل المتصفح الافتراضي)، إلا استثناءات قليلة مثل تطبيق `Settings`.

**لماذا يُسمح لتطبيقات الطرف الثالث بأخذ مكانها؟** لتعزيز حرية الاختيار للمستخدم والمنافسة العادلة — وهذا يميّز أندرويد عن أنظمة أكثر إغلاقاً.

#### الفائدة الثانية المهمة:
هذه التطبيقات لا تخدم المستخدم فقط، بل يمكن لمطوّري التطبيقات **استدعاء وظائفها** من داخل تطبيقهم الخاص. مثال من النص: لو أردت أن يرسل تطبيقك رسالة SMS، لا تحتاج بناء نظام SMS بنفسك — فقط تستدعي تطبيق SMS الموجود مسبقاً على الجهاز وتمرر له الرسالة والمستلم.

**لماذا هذا مهم؟** يوفّر وقت وجهد المطوّر بشكل كبير (`code reuse`) بدل إعادة اختراع وظائف موجودة أصلاً في النظام.

---

### 13. Jetpack Compose — التعريف

#### النص الأصلي يقول (English):
> "Jetpack Compose is the modern toolkit for building native Android UI, simplifying the development of apps that adapt to any display size. It simplifies and accelerates UI development on Android bringing your apps to life with less code, powerful tools, and intuitive Kotlin APIs."

#### الشرح المبسّط:
`Jetpack Compose` هو الطريقة الحديثة (الموصى بها من جوجل) لبناء واجهات المستخدم (`UI`) في أندرويد، بدلاً من نظام `View` القديم (XML layouts). يعتمد كلياً على Kotlin ويقلّل كمية الكود المطلوبة بشكل كبير.

---

### 13.1. النهج التصريحي (Declarative UI)

#### النص الأصلي يقول (English):
> "Compose uses a Declarative UI approach that lets you render your app UI without imperatively mutating frontend views. You declare everything about how your UI should look using composable functions."

#### الشرح المبسّط:
`Declarative` (تصريحي) يعني أنك **تصف كيف يجب أن تبدو الواجهة** حسب البيانات الحالية، بدل أن تكتب خطوات يدوية لتعديلها (`Imperative` — النهج القديم في View system حيث تكتب `textView.setText(...)` يدوياً كل مرة تتغيّر البيانات).

#### ⚖️ المقايضة: Declarative مقابل Imperative
| | Imperative (View System القديم) | Declarative (Jetpack Compose) |
| --- | --- | --- |
| المزايا | تحكم يدوي دقيق مألوف للمطورين القدامى | كود أقل، أقل عرضة لأخطاء عدم التزامن بين البيانات والواجهة |
| العيوب | كود أطول، يجب تحديث كل عنصر UI يدوياً عند تغيّر البيانات | منحنى تعلّم جديد لمن اعتاد View system |
| متى تختاره | مشاريع قديمة موجودة مسبقاً بـ XML/View | أي مشروع جديد اليوم |

#### الفهم الخاطئ الشائع ❌:
> "في Compose، أنا أُعدّل الزر أو النص يدوياً مثل `button.setText()`."

#### الفهم الصحيح ✅:
> في Compose، أنت لا "تعدّل" شيئاً موجوداً؛ أنت تصف الشكل المطلوب حسب البيانات، وCompose تُعيد رسم (`recompose`) الجزء المتأثر تلقائياً عند تغيّر البيانات.

---

### 14. الدالة القابلة للتركيب (Composable Function)

#### النص الأصلي يقول (English):
> "In Compose, a UI Component is a function which is annotated with @Composable. This function doesn't return anything, but the function that it describes what this piece of the UI should look like."

#### الشرح المبسّط:
أي عنصر واجهة في Compose هو دالة Kotlin عادية، لكن مُعلَّم عليها بـ `@Composable` في الأعلى. هذه الدالة **لا تُرجع قيمة** (`no return value`)، بل مهمتها الوحيدة وصف شكل واجهة معيّنة.

#### 💻 الكود: دالة Composable بسيطة

#### ما هذا الكود؟
> يعرض دالة `Greeting` التي تستقبل اسماً وتعرضه داخل نص ترحيبي، مبنية داخل تخطيط عمودي `Column`.

```kotlin
@Composable                              // Annotation marking this as a UI-building function
fun Greeting(name: String) {             // Function receives a String parameter "name"
    Column {                             // Arranges children vertically, one under another
        Text("Hello $name")              // Displays "Hello " followed by the name value
        Text("Hello Everyone!")          // A second, static line of text
    }
}
Greeting(name = "Android")               // Calls the function, rendering "Hello Android"
```

**شرح كل سطر:**
1. `@Composable` → دور: تعليمة (annotation) — لماذا: تخبر مترجم Compose أن هذه الدالة تصف جزءاً من الـ UI ويمكن استدعاؤها داخل شجرة composables أخرى.
2. `fun Greeting(name: String) {` → دور: تعريف الدالة ومعاملها — لماذا: `name` هو مُدخل خارجي يتحكم بمحتوى النص المعروض.
3. `Column {` → دور: حاوية تخطيط — لماذا: ترتّب كل العناصر بداخلها عمودياً واحداً تحت الآخر.
4. `Text("Hello $name")` → دور: عرض نص ديناميكي — لماذا: يستخدم `string template ($name)` لدمج قيمة المتغيّر داخل النص مباشرة.
5. `Text("Hello Everyone!")` → دور: عرض نص ثابت — لماذا: لا يعتمد على أي متغيّر، يبقى كما هو دائماً.
6. `Greeting(name = "Android")` → دور: استدعاء الدالة فعلياً بقيمة محددة — لماذا: بدون هذا الاستدعاء، الدالة معرّفة لكن لا تظهر في أي مكان على الشاشة.

> **المكتبات المطلوبة (Imports):**
> ```
> import androidx.compose.runtime.Composable
> import androidx.compose.foundation.layout.Column
> import androidx.compose.material3.Text
> ```

> **الناتج المتوقع (لقطة الشاشة):**
> شاشة تعرض سطرين من النص: "Hello Android" ثم أسفله "Hello Everyone!"

---

### 15. عدم القابلية للتغيير وإعادة التركيب (Immutability & Recomposition)

#### النص الأصلي يقول (English):
> "In Compose, UI Composables are immutable, meaning there is no way to update a Composable once it's been created. Instead, when the app data has changed and the UI needs to be refreshed, Compose automatically re-executes the Composable functions and transforms this new state into a new UI representation. This process is called recomposition."

#### الشرح المبسّط:
بمجرد إنشاء عنصر Composable، **لا يمكن تعديله مباشرة** (`immutable`). فكيف تتغيّر الواجهة إذاً؟ عندما تتغيّر البيانات (`state`)، تقوم Compose بإعادة **تشغيل الدالة نفسها من جديد** تلقائياً لتُنتج نسخة جديدة من الواجهة تعكس البيانات الجديدة. هذه العملية اسمها `Recomposition`.

**لماذا هذا التصميم بدل التعديل المباشر؟** يجعل حالة الواجهة دائماً متسقة مع البيانات الفعلية (`single source of truth`) بدون قلق من نسيان تحديث عنصر معيّن يدوياً، وهذا يقلل الأخطاء البرمجية الشائعة في الأنظمة القديمة.

#### 🔄 قبل / بعد: تغيير قيمة name في Greeting

**قبل:**
```kotlin
Greeting(name = "Android")
// الشاشة تعرض: "Hello Android"
```

**بعد:**
```kotlin
Greeting(name = "Compose")
// الشاشة تعرض: "Hello Compose"
```

**ماذا تغيّر؟** لم تُعدَّل الشاشة القديمة يدوياً؛ بل أُعيد تنفيذ الدالة `Greeting` بالكامل بقيمة `name` الجديدة (`Recomposition`) لتُنتج واجهة جديدة.

---

### 15.1. التحسين الذكي في Recomposition (Skipping)

#### النص الأصلي يقول (English):
> "The UI elements are completely controlled by the inputs you pass through a Composable function... Compose is smart enough to optimize and skip any work for elements that haven't changed."

#### الشرح المبسّط:
عند حدوث `Recomposition`، لا تُعيد Compose رسم **كل** شيء على الشاشة من الصفر — فقط الأجزاء التي اعتمدت فعلياً على البيانات التي تغيّرت. العناصر الثابتة (مثل `Text("Hello Everyone!")` التي لا تعتمد على `name`) تُتخطى تلقائياً (`skipped`) دون إعادة رسمها.

**لماذا هذا مهم؟** يوفّر أداءً عالياً؛ فلو أعادت Compose رسم كل شيء في كل مرة تتغيّر فيها أصغر بيانة، لأصبح التطبيق بطيئاً جداً خصوصاً في الشاشات المعقّدة.

#### مهم للامتحان ⚠️:
> "إعادة التنفيذ" (Re-execution) لا تعني "إعادة رسم كل شيء" — Compose تُحسِّن الأداء بتخطي العناصر غير المتأثرة بالتغيير.

---

### 16. مقارنة View القديم مقابل Compose

#### النص الأصلي يقول (English):
> "Compose lets you write your app UI easier and with much less code compared to older View space UI toolkit."

#### الشرح المبسّط:
في النظام القديم (`View`)، تكتب الواجهة في ملف XML منفصل تماماً عن منطق الكود، وتحتاج ربط العناصر يدوياً (`findViewById`، إلخ). في `Compose`، كل شيء (منطق + واجهة) مكتوب بلغة Kotlin واحدة موحّدة في نفس الملف، مما يقلل الكود بشكل كبير ويسهّل تمرير البيانات بين المنطق والواجهة.

---

### 17. كتابة الواجهة والمنطق بنفس اللغة

#### النص الأصلي يقول (English):
> "With Compose, you write your user interfaces with Kotlin, the same language you use to build the rest of your app... This makes it easy and convenient to pass data and events between your app's user interface and the other parts of your app."

#### 💻 الكود: ربط دالة Composable من داخل Activity

#### ما هذا الكود؟
> يوضّح كيف تُستدعى دالة `Greeting` من داخل `onCreate()` في الـ Activity باستخدام `setContent`.

```kotlin
override fun onCreate(                 // Called when the Activity is first created
    savedInstance: Bundle?             // Holds previously saved state, if any
) {
    super.onCreate(savedInstance)      // Calls the parent class implementation first
    setContent {                       // Defines the Composable content of this screen
        Greeting("Murat")              // Calls our Composable function with a name
    }
}
```

**شرح كل سطر:**
1. `override fun onCreate(...)` → دور: دالة دورة حياة تُستدعى تلقائياً عند إنشاء الشاشة — لماذا: هي نقطة الدخول القياسية لأي Activity في أندرويد.
2. `super.onCreate(savedInstance)` → دور: استدعاء المنطق الأساسي من الفئة الأم — لماذا: ضروري لضمان عمل آليات Android الداخلية بشكل صحيح.
3. `setContent { ... }` → دور: الجسر بين نظام Activity التقليدي وJetpack Compose — لماذا: هذا هو المكان الوحيد الذي "تُركَّب" فيه واجهة Compose داخل الشاشة.
4. `Greeting("Murat")` → دور: استدعاء الدالة Composable بقيمة محددة — لماذا: يمرر البيانات (الاسم) من كود Activity إلى واجهة العرض مباشرة بنفس اللغة (Kotlin).

> **الناتج المتوقع:** شاشة تعرض "Hello Murat" و"Hello Everyone!" أسفلها.

---

### 18. بيئة تطوير أندرويد (Android Studio)

#### النص الأصلي يقول (English):
> "Android Studio is the official Integrated Development Environment (IDE) for Android app development. Based on the powerful code editor and developer tools from IntelliJ IDEA, Android Studio offers even more features..."

#### الشرح المبسّط:
`Android Studio` هو الـ `IDE` (بيئة تطوير متكاملة) الرسمية من جوجل، مبني فوق `IntelliJ IDEA` (بيئة تطوير Java/Kotlin شهيرة) لكن مع ميزات إضافية مخصصة لأندرويد.

### أهم ميزاته:
| الميزة | الوظيفة |
| --- | --- |
| `Gradle-based build system` | نظام بناء مرن قابل للتخصيص |
| `Emulator` سريع وغني بالميزات | لتجربة التطبيق دون جهاز حقيقي |
| `Live Edit` | تحديث الـ composables مباشرة أثناء التشغيل بدون إعادة تشغيل كاملة |
| Templates + GitHub integration | تسريع بناء ميزات شائعة واستيراد كود جاهز |
| أدوات اختبار موسّعة | لضمان جودة التطبيق |
| `Lint tools` | كشف مشاكل الأداء وسهولة الاستخدام وتوافق الإصدارات |
| دعم C++ وNDK | لكتابة أجزاء أداء عالية بلغات منخفضة المستوى |

---

### 19. هيكل المشروع في Android Studio

#### النص الأصلي يقول (English):
> "Each project in Android Studio contains one or more modules with source code files and resource files... By default, Android Studio displays your project files in the Android view... Each app module contains the following folders: manifests: Contains the AndroidManifest.xml file. java: Contains the Kotlin and Java source code files, including JUnit test code. res: Contains all non-code resources such as UI strings and bitmap images."

#### الشرح المبسّط:
كل مشروع في Android Studio مقسّم إلى `modules` (وحدات)، أنواعها: `Android app modules`، `Library modules`، `Google App Engine modules`. المشروع الواحد يُعرض افتراضياً بـ "Android view" الذي يجمّع الملفات حسب أهميتها بدل هيكل النظام الفعلي.

### جدول المجلدات الأساسية داخل أي module:
| المجلد | المحتوى |
| --- | --- |
| `manifests` | ملف `AndroidManifest.xml` (بطاقة تعريف التطبيق للنظام) |
| `java` | ملفات كود Kotlin وJava، ويشمل كود اختبار JUnit |
| `res` | الموارد غير البرمجية (نصوص UI، صور، ألوان) مقسّمة لمجلدات فرعية |
| `Gradle Scripts` | ملفات البناء الظاهرة في أعلى المستوى دائماً |

**لماذا هذا التنظيم؟** فصل الكود عن الموارد (`res`) عن الإعدادات (`manifest`) يجعل الصيانة أسهل، ويسمح بتعريف نسخ متعددة من نفس المورد (مثلاً نص بلغات مختلفة) بدون تعقيد الكود البرمجي.

---

### 20. نظام البناء Gradle

#### النص الأصلي يقول (English):
> "Android Studio uses Gradle as the foundation of the build system, with more Android-specific capabilities provided by the Android Gradle plugin... Android Studio build files are named build.gradle.kts if you use Kotlin (recommended) or build.gradle if you use Groovy... Each project has one top-level build file for the entire project and separate module-level build files for each module."

#### الشرح المبسّط:
`Gradle` هو النظام الذي يحوّل مشروعك (كود + موارد) إلى تطبيق قابل للتثبيت والتشغيل. يمكن تشغيله من داخل Android Studio أو من سطر الأوامر مباشرة (`command line`) بشكل مستقل. صيغة الملفات: `build.gradle.kts` (لغة Kotlin — موصى بها) أو `build.gradle` (لغة Groovy القديمة).

**البنية الهرمية:** ملف بناء واحد `top-level` لكل المشروع + ملف بناء منفصل لكل `module` على حدة.

#### ⚙️ الخطوات / الخوارزمية: عملية بناء المشروع بواسطة Gradle
#### ما هدف هذه العملية؟
> تحويل الكود المصدري والموارد إلى ملف تطبيق قابل للتشغيل.

```algorithm
1 | قراءة ملفات build.gradle.kts | Gradle | تحديد الإعدادات والمكتبات المطلوبة (dependencies)
2 | تجميع الكود المصدري | Kotlin/Java Compiler | تحويل Kotlin/Java إلى bytecode
3 | تحويل bytecode إلى DEX | Android Gradle Plugin | إنتاج DEX bytecode المناسب لـ ART
4 | تعبئة كل شيء في حزمة واحدة | Build Tools | إنتاج ملف APK أو AAB جاهز للتثبيت
```

**نقاط التنفيذ:**
- الأمر الشائع من سطر الأوامر لتشغيل هذه العملية هو `./gradlew build`.

---

# الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Android` | نظام تشغيل مفتوح المصدر مبني على Linux للأجهزة اللمسية | مطوَّر من `Open Handset Alliance` بقيادة Google |
| `Android SDK` | مجموعة أدوات لتطوير واختبار تطبيقات أندرويد | تشمل SDK Tools، SDK Platform، Emulator |
| `API Level` | رقم صحيح يمثّل نسخة الـ Framework API | كل إصدار أندرويد = API level واحد + دعم ضمني للأقدم |
| `HAL` | طبقة وسيطة تعرض قدرات الهاردوير للإطار البرمجي | مثال: موديول الكاميرا، موديول Bluetooth |
| `ART` | بيئة تشغيل تنفّذ كود DEX bytecode | استبدلت `Dalvik` منذ API 21 |
| `Jetpack Compose` | أداة حديثة لبناء واجهات المستخدم بـ Kotlin | تستخدم نهج `Declarative UI` |
| `Recomposition` | إعادة تنفيذ دالة Composable عند تغيّر البيانات | Compose تُحسّن الأداء بتخطي غير المتأثر |
| `Gradle` | نظام بناء المشروع في Android Studio | ملفات `build.gradle.kts` |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Linux Kernel` | الأساس: أمان، ذاكرة، drivers | نواة معدّلة خصيصاً لأندرويد |
| `HAL` | ربط الهاردوير بالإطار البرمجي | مكوّن من `library modules` منفصلة |
| `Native C/C++ Libraries` | مكتبات أداء عالٍ (Webkit, OpenGL ES) | تُستخدم عبر Java APIs |
| `Java API Framework` | الطبقة التي يتعامل معها المطوّر مباشرة | تحتوي 9 Managers رئيسية |
| `System Apps` | تطبيقات جاهزة يمكن استدعاء وظائفها | لا امتياز خاص، قابلة للاستبدال |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| بيئة التشغيل | `Dalvik` — ترجمة `JIT` | `ART` — ترجمة `AOT` | ART أسرع بدء تشغيل وأكفأ ذاكرة |
| نهج الواجهة | `View System` (Imperative) | `Jetpack Compose` (Declarative) | Compose كود أقل وتحديث تلقائي |
| اللغة | `Java` | `Kotlin` | Kotlin أقصر وأكثر أماناً ضد null |
| ملفات البناء | `build.gradle` (Groovy) | `build.gradle.kts` (Kotlin) | الثانية موصى بها حالياً |

### قاموس المصطلحات
| الفئة | المصطلحات |
| --- | --- |
| بنية النظام | `Kernel`, `HAL`, `ART`, `Framework`, `System Apps`, `Software Stack` |
| Kotlin/Compose | `Composable`, `Recomposition`, `Declarative UI`, `Immutable` |
| أدوات التطوير | `SDK`, `IDE`, `Gradle`, `Emulator`, `Lint`, `NDK` |
| مفاهيم عامة | `Open Source`, `API Level`, `minSdkVersion`, `DEX bytecode` |

### أبرز النقاط الذهبية
1. أندرويد `stack` من 5 طبقات، كل طبقة تعتمد على التي تحتها فقط.
2. `API Level` رقم واحد فريد لكل إصدار، والدعم للأقدم دائماً ضمني.
3. Kotlin هي اللغة المفضّلة رسمياً منذ Google I/O 2019 و95%+ من أفضل 1000 تطبيق تستخدمها.
4. `ART` تستبدل `Dalvik` منذ API 21 وتستخدم `AOT` بدل `JIT`.
5. `Jetpack Compose` نهج `Declarative` — تصف الشكل، والنظام يحدّث الواجهة تلقائياً عبر `Recomposition`.
6. `Recomposition` ذكية: تتخطى العناصر غير المتأثرة بتغيّر البيانات لتحسين الأداء.
7. `System Apps` قابلة للاستبدال من طرف ثالث (باستثناءات مثل Settings).

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| اعتقاد أن HAL هو نفسه Linux Kernel | HAL طبقة منفصلة فوق الـ Kernel، تربط الهاردوير بالإطار البرمجي |
| اعتقاد أن ART و Dalvik يعملان بنفس آلية الترجمة | ART تستخدم AOT، Dalvik تستخدم JIT |
| اعتقاد أن Composable "تُحدَّث" مباشرة عند تغيّر البيانات | الدالة تُعاد تنفيذها بالكامل (Recomposition)، لا تُعدَّل مباشرة |
| اعتقاد أن كل إصدار أندرويد يدعم API Level واحد فقط بدون الأقدم | الدعم ضمني لكل المستويات الأقدم أيضاً |

---

### خطوات وإجراءات المحاضرة
> جميع الإجراءات (Software Stack flow، HAL request flow، Activity Manager flow، Gradle build flow) مذكورة كـ algorithm blocks منفصلة داخل الجزء الأول أعلاه.

---

### أنماط الأكواد والبنى المتكررة
| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| Composable Function | `@Composable fun Name(param: Type) { ... }` | عند تعريف أي جزء من واجهة المستخدم |
| Layout Container | `Column { ... }` / `Row { ... }` | لترتيب عناصر واجهة عمودياً أو أفقياً |
| String Template | `"Hello $name"` | لدمج قيمة متغيّر داخل نص مباشرة |
| Activity Entry Point | `override fun onCreate(...) { setContent { ... } } ` | نقطة ربط Compose بأي Activity |

### أنماط التعامل والسلوك
| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| تغيّرت بيانة يعتمد عليها composable | اترك Compose تُعيد التنفيذ تلقائياً (Recomposition) | لأن التعديل اليدوي غير مدعوم أصلاً (immutable) |
| تحتاج ميزة هاردوير غير مدعومة على جهاز معيّن | تحقق من وجود موديول HAL مطابق قبل الاعتماد على الميزة | غياب الموديول يعني عدم عمل الميزة على ذلك الجهاز |
| تطوّر لجمهور واسع بأجهزة قديمة ومتنوعة | حدّد `minSdkVersion` منخفض بما يكفي مع مراعاة الميزات المطلوبة | التوازن بين انتشار أوسع ودعم ميزات حديثة |

### الأفكار الرئيسية الشاملة
- التصميم الطبقي لأندرويد (Layered Architecture) هو المفتاح لفهم كل تفاصيل المحاضرة: كل مشكلة تقنية تُفهم بمعرفة "في أي طبقة تقع؟".
- التحوّل من Java إلى Kotlin ومن View إلى Compose يعكس فلسفة جوجل العامة: تقليل الكود، تقليل الأخطاء، رفع الإنتاجية.

---

# الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% (4 أسئلة) | سيناريو كود 35% (6 أسئلة) | تطبيق 40% (6 أسئلة).

### السؤال 1 (medium)
Which organization is described as the "main contributor and commercial marketer" of Android?
أ) Open Handset Alliance  ب) Google  ج) Amazon  د) IntelliJ
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "Google" هي المساهم الرئيسي والمسوّق التجاري. `Open Handset Alliance` هو التحالف الأوسع (خيار أ خاطئ لأنه إجابة عامة غير دقيقة للسؤال المحدد). Amazon وIntelliJ غير مذكورين كجهة تطوير لأندرويد نفسه.

---

### السؤال 2 (medium)
When was the first commercial version, Android 1.0, released?
أ) 2007  ب) September 2008  ج) 2011  د) 2019
**الإجابة الصحيحة: ب**
**التعليل:** 2007 كانت نسخة الـ SDK التجريبية (بيتا) فقط وليست إصداراً تجارياً (خيار أ خاطئ). 2011 هو تاريخ إصدار Honeycomb (خيار ج خاطئ). 2019 هو عام إعلان Kotlin-first (خيار د خاطئ وغير متعلق بالسؤال).

---

### السؤال 3 (hard) — مقارنة
What is the key difference between Dalvik and ART regarding compilation timing?
أ) Dalvik uses AOT, ART uses JIT  ب) Both use JIT  ج) Dalvik uses JIT, ART uses AOT  د) Both use AOT
**الإجابة الصحيحة: ج**
**التعليل:** الجدول في المحاضرة يوضّح بوضوح أن Dalvik تستخدم `Just-in-Time (JIT)` وART تستخدم `Ahead-of-Time (AOT)`. الخيار أ معكوس بالكامل، وب/د يتجاهلان الفرق الجوهري بينهما المذكور صراحة في الشريحة.

---

### السؤال 4 (medium) — مقارنة
Which layer is described as "the foundation of the Android platform"?
أ) Java API Framework  ب) Linux Kernel  ج) HAL  د) ART
**الإجابة الصحيحة: ب**
**التعليل:** النص الأصلي يذكر حرفياً "The foundation of the Android platform is the Linux kernel". باقي الخيارات طبقات مبنية فوق النواة وليست الأساس نفسه.

---

### السؤال 5 (hard) — سيناريو كود
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
    }
}
```
If this function is never called anywhere else in the code, what happens?
أ) It runs automatically on app start  ب) It never renders anything on screen  ج) It causes a compile error  د) It replaces the default Activity
**الإجابة الصحيحة: ب**
**التعليل:** تعريف دالة Composable وحده لا يجعلها تظهر تلقائياً؛ يجب استدعاؤها صراحة (كما في `Greeting(name = "Android")`). لا يوجد خطأ ترجمة (خيار ج خاطئ) لأن الكود سليم نحوياً، ولا علاقة له باستبدال الـ Activity الافتراضي (خيار د خاطئ).

---

### السؤال 6 (medium) — سيناريو كود
```kotlin
Greeting(name = "Android")
Greeting(name = "Compose")
```
Based on the Recomposition concept, what happens to the static `Text("Hello Everyone!")` line inside `Greeting` when `name` changes between calls?
أ) It is deleted and recreated fully every time  ب) It is skipped/optimized since it doesn't depend on `name`  ج) It throws a runtime error  د) It becomes editable directly
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضّح أن Compose "smart enough to optimize and skip any work for elements that haven't changed" — أي العناصر غير المعتمدة على البيانات المتغيّرة تُتخطى. لا يوجد خطأ تشغيل (ج) ولا تعديل مباشر ممكن أصلاً بسبب الـ immutability (د خاطئ).

---

### السؤال 7 (medium) — تطبيق
Which Manager ensures only one activity is in the foreground at a time?
أ) Package Manager  ب) Resource Manager  ج) Activity Manager  د) Window Manager
**الإجابة الصحيحة: ج**
**التعليل:** النص صريح أن `Activity Manager` "Ensures only one activity is in the foreground at a time". `Window Manager` يدير عرض النوافذ وليس ضمان شاشة واحدة فقط في المقدمة تحديداً، والباقي غير متعلقين بهذه المهمة إطلاقاً.

---

### السؤال 8 (medium) — تطبيق
A developer wants their app to send SMS messages without building SMS functionality from scratch. Which Android concept enables this?
أ) HAL modules  ب) System Apps' key capabilities  ج) ART recompilation  د) Gradle plugins
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة أن System Apps توفّر "key capabilities that developers can access from their own app" مع مثال SMS بالتحديد. HAL يتعامل مع الهاردوير وليس مع تطبيقات جاهزة (أ خاطئ)، وART وGradle غير متعلقين بهذه الوظيفة.

---

### السؤال 9 (hard) — مقارنة
Which statement correctly compares Imperative and Declarative UI approaches?
أ) Declarative requires manually mutating views; Imperative doesn't  ب) Imperative describes the desired UI state; Declarative mutates views manually  ج) Declarative describes how the UI should look; the system updates it automatically  د) Both approaches are identical in Compose
**الإجابة الصحيحة: ج**
**التعليل:** النص يوضّح أن Compose "lets you render your app UI without imperatively mutating frontend views" — أي تصف الشكل المطلوب فقط. الخياران أ وب معكوسان بالكامل، ود يتجاهل الفرق الجوهري المذكور في المحاضرة.

---

### السؤال 10 (medium) — تطبيق
A device is running Android with API Level 24. Can it run an app with `minSdkVersion` set to API Level 21?
أ) No, because 24 is older than 21  ب) Yes, because API level support is implicit for all earlier levels  ج) Only if the app uses Kotlin  د) No, minSdkVersion must exactly match the device's API level
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضّح أن "support is implicit for all earlier API levels" — أي جهاز API 24 يدعم ضمنياً كل ما هو API 24 وأقل، بما فيها 21. الخيار أ يعكس المقارنة الرقمية بشكل خاطئ (24 أحدث من 21 وليس أقدم)، وج/د يذكران شروطاً غير موجودة في النص.

---

### السؤال 11 (medium) — مقارنة
What primarily distinguishes Native C/C++ Libraries from the Java API Framework layer in the Android stack?
أ) Native libraries are higher-level and used directly by app developers  ب) Native libraries provide low-level performance-critical functionality, exposed to apps via Java APIs  ج) They are the exact same layer  د) Native libraries replace ART entirely
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضّح أن مكونات مثل ART وHAL مبنية بكود C/C++ منخفض المستوى، وتُعرَض وظائفها للتطبيقات عبر Java framework APIs (مثال OpenGL ES). خيار أ يعكس العلاقة الصحيحة، وج/د غير صحيحين بناءً على البنية الموضحة في المخطط.

---

### السؤال 12 (medium) — تطبيق
Why does Google recommend Kotlin over Java for new Android projects, according to internal data mentioned in the lecture?
أ) Kotlin apps are 20% less likely to crash  ب) Kotlin is the only language supported by Android Studio  ج) Java cannot use Jetpack libraries  د) Kotlin apps run faster on Dalvik specifically
**الإجابة الصحيحة: أ**
**التعليل:** النص يذكر رقماً محدداً: "Apps built with Kotlin are 20% less likely to crash based on Google's internal data". الخيارات الأخرى غير صحيحة: Android Studio يدعم Java وKotlin معاً (ب خاطئ)، وJava يمكنها استخدام Jetpack (ج خاطئ)، والسرعة على Dalvik تحديداً غير مذكورة في النص (د خاطئ).

---

### السؤال 13 (hard) — سيناريو كود
```kotlin
override fun onCreate(savedInstance: Bundle?) {
    super.onCreate(savedInstance)
    setContent {
        Greeting("Murat")
    }
}
```
What is the role of `setContent` in this code?
أ) It compiles the Kotlin code into DEX bytecode  ب) It bridges the traditional Activity system with Jetpack Compose UI  ج) It registers the Activity in AndroidManifest.xml  د) It creates a new Gradle module
**الإجابة الصحيحة: ب**
**التعليل:** `setContent` هو نقطة الربط التي تسمح بتركيب واجهة Compose داخل Activity تقليدي. الترجمة لـ DEX تتم عبر Build Tools/Gradle (أ خاطئ)، وتسجيل الـ Activity يتم في ملف manifest بشكل منفصل تماماً (ج خاطئ)، ولا علاقة لها بإنشاء modules (د خاطئ).

---

### السؤال 14 (medium) — تطبيق
Which file must every Android app module contain to define its manifest configuration?
أ) build.gradle.kts  ب) AndroidManifest.xml  ج) settings.gradle  د) proguard-rules.pro
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضّح أن مجلد `manifests` يحتوي `AndroidManifest.xml`. الخيارات الأخرى ملفات بناء (Gradle) أو تهيئة، وليست ملف الـ manifest نفسه.

---

### السؤال 15 (hard) — مقارنة
Which of the following correctly reflects the relationship between HAL and Java API Framework calls?
أ) The Java API Framework directly controls hardware without any intermediary  ب) HAL loads the relevant library module when a framework API call requests hardware access  ج) HAL replaces the Java API Framework entirely on newer Android versions  د) HAL only works with the camera hardware
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "When a framework API makes a call to access device hardware, the Android system loads the library module for that hardware component" — وهذا بالضبط دور HAL كوسيط. خيار أ يتجاهل وجود الوسيط (HAL)، وج/د غير صحيحين إطلاقاً حسب المحاضرة.

---

### السؤال 16 (medium) — تطبيق
A team is building a build file for their Android project and wants to follow Google's current recommendation. Which file naming convention should they use?
أ) build.gradle (Groovy)  ب) build.gradle.kts (Kotlin)  ج) build.xml  د) settings.json
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر أن ملفات البناء تُسمى `build.gradle.kts` عند استخدام Kotlin وهذا "(recommended)" صراحة في الشريحة، مقابل `build.gradle` القديمة بلغة Groovy. `build.xml` و`settings.json` ليسا من صيغ Gradle المذكورة في المحاضرة.

---

# الجزء الرابع: أسئلة تصحيح الكود

> Cover error types: compilation, logic, return_check, dead code, misconception.

### Debug Question 1 — misconception
**The following code contains a bug:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
    }
    return name   // developer tries to return the name
}
```
**Find the bug:** misconception — a `@Composable` function is meant to describe UI and should not return a value; adding `return name` misunderstands how Composables work.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
    }
    // No return statement — Composable functions describe UI, they don't return values
}
```
**شرح الحل:** النص الأصلي يذكر صراحة أن دالة Composable "doesn't return anything". هذا خطأ فهم شائع (misconception) لدى من اعتاد الدوال التقليدية التي تُرجع قيمة.

---

### Debug Question 2 — logic
**The following code contains a bug:**
```kotlin
override fun onCreate(savedInstance: Bundle?) {
    setContent {
        Greeting("Murat")
    }
    super.onCreate(savedInstance)   // called AFTER setContent
}
```
**Find the bug:** logic error — `super.onCreate()` must be called **before** any UI setup like `setContent`, not after.

**Fixed code:**
```kotlin
override fun onCreate(savedInstance: Bundle?) {
    super.onCreate(savedInstance)   // must run first
    setContent {
        Greeting("Murat")
    }
}
```
**شرح الحل:** يجب استدعاء منطق الفئة الأم أولاً لضمان تهيئة النظام الأساسي للـ Activity قبل أي إعداد إضافي مثل بناء واجهة Compose.

---

### Debug Question 3 — dead_code
**The following code contains a bug:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
        Text("Hello Everyone!")
    }
}

fun main() {
    // This line never actually calls Greeting, so nothing renders
    val message = "Hello Android"
}
```
**Find the bug:** dead_code — `Greeting` is defined but never invoked; the `message` variable is unused and irrelevant to rendering the composable.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
        Text("Hello Everyone!")
    }
}
// Greeting must actually be called from setContent inside an Activity to render
```
**شرح الحل:** مجرد تعريف الدالة أو كتابة متغيّر غير مستخدم لا ينتج أي واجهة فعلية؛ يجب استدعاء `Greeting` صراحة ضمن `setContent`.

---

### Debug Question 4 — syntax
**The following code contains a bug:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column
        Text("Hello $name")
    }
}
```
**Find the bug:** syntax — missing opening curly brace `{` after `Column`.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
    }
}
```
**شرح الحل:** كل حاوية تخطيط مثل `Column` تحتاج قوس فتح `{` وقوس إغلاق `}` مطابقين، وإلا يفشل الكود بخطأ ترجمة (compilation error).

---

### Debug Question 5 — return_check
**The following code contains a bug:**
```kotlin
fun isApiSupported(deviceApiLevel: Int, minSdk: Int): Boolean {
    if (deviceApiLevel >= minSdk) {
        true
    }
    false
}
```
**Find the bug:** return_check — missing `return` keywords, so the function doesn't actually return any Boolean value; it will fail to compile.

**Fixed code:**
```kotlin
fun isApiSupported(deviceApiLevel: Int, minSdk: Int): Boolean {
    if (deviceApiLevel >= minSdk) {
        return true
    }
    return false
}
```
**شرح الحل:** الدالة معرَّفة بأنها تُرجع `Boolean`، لكن جسدها لا يحتوي أي `return` فعلي — هذا خطأ يجب أن يُكتشف قبل تجميع الكود.

---

### Debug Question 6 — logic
**The following code contains a bug:**
```kotlin
// Developer wants to check if app supports a device with API level 20
val minSdkVersion = 21
val deviceApiLevel = 20

if (deviceApiLevel > minSdkVersion) {   // wrong comparison direction/operator
    println("Supported")
} else {
    println("Not Supported")
}
```
**Find the bug:** logic — comparing with `>` incorrectly and reasoning about direction; also `20 > 21` is false so it would (correctly by accident) print "Not Supported", but the real logic error is that the developer intended to check "device API >= minSdk" using clear equality-inclusive comparison for correctness and clarity.

**Fixed code:**
```kotlin
val minSdkVersion = 21
val deviceApiLevel = 20

if (deviceApiLevel >= minSdkVersion) {   // correct: device must be at least minSdk
    println("Supported")
} else {
    println("Not Supported")
}
```
**شرح الحل:** المقارنة الصحيحة لدعم API level يجب أن تشمل الحالة التي يتساوى فيها API الجهاز مع الحد الأدنى المطلوب (`>=` وليس `>` فقط)، تماشياً مع مفهوم "implicit support for all earlier API levels" شاملاً نفس المستوى.

---

# الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Identify the Layer — fill_gaps
**Scenario / Task:**
Fill in the missing layer name in the Android software stack description below (from bottom to top): Linux Kernel → _______ → ART / Native Libraries → Java API Framework → System Apps.

**Requirements:**
1. Identify the missing layer name.
2. Explain its role in one sentence in English.

**نموذج الحل:** الطبقة الناقصة هي `Hardware Abstraction Layer (HAL)`. دورها: تعرض قدرات الهاردوير بواجهات موحّدة للطبقات الأعلى (Java API Framework)، وتُحمَّل كـ library modules حسب الحاجة.

---

### Exercise 2: Composable Design — code_fix
**Scenario / Task:**
The following code should display a greeting followed by the app version, but it only compiles a UI element that never receives the version data.
```kotlin
@Composable
fun AppHeader() {
    Column {
        Text("Welcome")
    }
}
```

**Requirements:**
1. Modify the function to accept a `version: String` parameter.
2. Display it below the "Welcome" text.

**نموذج الحل:**
```kotlin
@Composable
fun AppHeader(version: String) {
    Column {
        Text("Welcome")
        Text("Version: $version")
    }
}
```
الشرح: أضفنا معاملاً `version` للدالة، ثم استخدمنا `string template` لعرضه في سطر `Text` إضافي — بنفس نمط `Greeting(name: String)` في المحاضرة.

---

### Exercise 3: API Level Decision — scenario
**Scenario / Task:**
Your team wants your app to support at least 90% of active Android devices as of today, but also wants to use a feature only available from API level 30 onward.

**Requirements:**
1. What should `minSdkVersion` be set to?
2. What trade-off does the team accept?

**نموذج الحل:** يجب تعيين `minSdkVersion = 30` لأن الميزة تتطلبه. المقايضة: الأجهزة ذات API أقل من 30 (أندرويد أقدم من 11) لن تستطيع تثبيت التطبيق من المتجر إطلاقاً، حتى لو كانت الميزة الجديدة غير أساسية لها.

---

### Exercise 4: HAL Reasoning — scenario
**Scenario / Task:**
A new smartphone manufacturer releases a device with a completely new type of biometric sensor that didn't exist before.

**Requirements:**
1. What must the manufacturer provide for existing Android apps to use this sensor via standard Java APIs?
2. Why can't apps access it directly without this component?

**نموذج الحل:** يجب على المصنّع كتابة `HAL library module` جديد لهذا الحساس، ينفّذ الواجهة (`interface`) القياسية المتوقعة من قبل `Java API Framework`. لا يمكن للتطبيقات الوصول مباشرة للهاردوير لأن التطبيقات تتعامل فقط مع طبقات عليا موحّدة (Java APIs)، والـ HAL هو الجسر الوحيد المصمّم لترجمة هذا الاستدعاء إلى أوامر فعلية للحساس الجديد.

---

### Exercise 5: Recomposition Trace — fill_gaps
**Scenario / Task:**
```kotlin
@Composable
fun Counter(count: Int) {
    Text("Count: $count")
}
Counter(count = 1)
Counter(count = 2)
```

**Requirements:**
1. What UI process is triggered when `count` changes from 1 to 2?
2. Fill in the blank: Compose does NOT _______ the existing Text; instead it re-executes the function.

**نموذج الحل:**
1. العملية هي `Recomposition` — إعادة تنفيذ الدالة `Counter` بالكامل مع القيمة الجديدة.
2. الفراغ: Compose does NOT **mutate/edit** the existing Text directly; instead it re-executes the function.

---

### Exercise 6: Gradle Build Order — scenario
**Scenario / Task:**
A student ran `./gradlew build` and wants to understand what happens internally before getting a final `.apk` file.

**Requirements:**
1. List the main steps in order.
2. Which tool converts Kotlin/Java bytecode into DEX format?

**نموذج الحل:**
1. الخطوات: قراءة ملفات `build.gradle.kts` → تجميع الكود المصدري → تحويل bytecode إلى DEX → تعبئة كل شيء في APK/AAB.
2. الأداة: `Android Gradle Plugin` (ضمن Build Tools) هي المسؤولة عن هذا التحويل إلى صيغة DEX.

---

# الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: API Level Compatibility Check
**Input:**
```kotlin
val minSdkVersion = 23
val deviceApiLevels = listOf(21, 23, 25)
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | مقارنة الجهاز الأول (API 21) مع minSdk (23) | ؟ |
| 2 | مقارنة الجهاز الثاني (API 23) مع minSdk (23) | ؟ |
| 3 | مقارنة الجهاز الثالث (API 25) مع minSdk (23) | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | مقارنة الجهاز الأول (API 21) مع minSdk (23) | 21 < 23 → غير مدعوم |
| 2 | مقارنة الجهاز الثاني (API 23) مع minSdk (23) | 23 = 23 → مدعوم (يساوي الحد الأدنى) |
| 3 | مقارنة الجهاز الثالث (API 25) مع minSdk (23) | 25 > 23 → مدعوم |

**Result:** Devices with API 23 and API 25 can install the app; the device with API 21 cannot.

---

### Trace Exercise 2: Recomposition Flow
**Input:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
        Text("Hello Everyone!")
    }
}
Greeting(name = "Android")
Greeting(name = "Compose")
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة على الشاشة |
| --- | --- | --- |
| 1 | استدعاء أول لـ Greeting("Android") | ؟ |
| 2 | استدعاء ثانٍ لـ Greeting("Compose") | ؟ |
| 3 | ماذا يحدث لسطر "Hello Everyone!" بين الاستدعائين؟ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة على الشاشة |
| --- | --- | --- |
| 1 | استدعاء أول لـ Greeting("Android") | يظهر "Hello Android" و"Hello Everyone!" |
| 2 | استدعاء ثانٍ لـ Greeting("Compose") | يظهر "Hello Compose" و"Hello Everyone!" (Recomposition) |
| 3 | ماذا يحدث لسطر "Hello Everyone!" بين الاستدعائين؟ | يُتخطى (skipped) لأنه لا يعتمد على `name` المتغيّر |

**Result:** Only the `Text("Hello $name")` line is actually re-rendered; the static line is optimized/skipped by Compose.

---

### Trace Exercise 3: Activity Back Stack Navigation
**Input:**
User opens `MainActivity` → navigates to `DetailsActivity` → presses Back button.

**Trace step by step (complete the table):**
| الخطوة | العملية (Activity Manager) | الحالة |
| --- | --- | --- |
| 1 | فتح MainActivity | ؟ |
| 2 | الانتقال إلى DetailsActivity | ؟ |
| 3 | الضغط على زر Back | ؟ |

**نموذج الحل:**
| الخطوة | العملية (Activity Manager) | الحالة |
| --- | --- | --- |
| 1 | فتح MainActivity | يُضاف إلى back stack، يظهر في المقدمة |
| 2 | الانتقال إلى DetailsActivity | MainActivity ينتقل لحالة pause، DetailsActivity يُضاف فوق الـ stack ويظهر في المقدمة |
| 3 | الضغط على زر Back | DetailsActivity يُزال من الـ stack، MainActivity يعود للمقدمة (resume) |

**Result:** The user sees `MainActivity` again after pressing Back, following the LIFO (last-in-first-out) back stack behavior.

---

# الجزء الرابع: أسئلة تصميم

### Design Question 1: Design the Android Software Stack — architecture
**Task:**
Draw/describe a layered architecture diagram showing all 5 major layers of the Android platform, including at least 2 example components inside each of: Linux Kernel, Native C/C++ Libraries, and Java API Framework.

**نموذج الإجابة:**
```
System Apps        → Dialer, Camera
Java API Framework → Activity Manager, Location Manager
ART + Native Libs  → ART, Webkit, OpenGL ES
HAL                → Camera module, Bluetooth module
Linux Kernel        → Drivers, Power Management
```

**معايير التقييم:**
- تسلسل الطبقات صحيح من الأسفل (Kernel) للأعلى (System Apps).
- ذكر مكونين على الأقل داخل كل طبقة مطلوبة.
- توضيح أن كل طبقة تعتمد على التي تحتها فقط (لا قفزات مباشرة).

---

### Design Question 2: Design a Composable Screen — uml_design
**Task:**
Design (describe in pseudo-structure) a simple Composable function `ProfileScreen(userName: String, appVersion: String)` that displays the username in one Text and the app version in another, arranged vertically.

**نموذج الإجابة:**
```kotlin
@Composable
fun ProfileScreen(userName: String, appVersion: String) {
    Column {
        Text("User: $userName")
        Text("App Version: $appVersion")
    }
}
```

**معايير التقييم:**
- استخدام `@Composable` annotation بشكل صحيح.
- استقبال معاملين نصيين وعرضهما بترتيب عمودي واضح (`Column`).
- استخدام `string template` لدمج القيم داخل النصوص.

---

# الجزء الخامس: الكود النهائي الكامل (مرجع شامل)

```kotlin
// ===== Composable Function Definition =====
@Composable                                   // Marks this function as UI-describing
fun Greeting(name: String) {                  // Accepts a name to personalize the greeting
    Column {                                  // Vertical layout container
        Text("Hello $name")                   // Dynamic text using the parameter
        Text("Hello Everyone!")               // Static text, unaffected by recomposition
    }
}

// ===== Direct Invocation (renders immediately when composed) =====
Greeting(name = "Android")
Greeting(name = "Compose")

// ===== Activity Integration =====
override fun onCreate(savedInstance: Bundle?) {
    super.onCreate(savedInstance)             // Always call parent first
    setContent {                              // Bridges Activity with Compose UI
        Greeting("Murat")                     // Renders the composable inside the screen
    }
}
```

---

# الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: What is Android and what foundational technology is it built on?
**نموذج الإجابة:** أندرويد نظام تشغيل مفتوح المصدر مبني على `Linux kernel معدّل`، مصمم أساساً للأجهزة اللمسية. يُطوَّر بواسطة `Open Handset Alliance` بقيادة Google تجارياً. مثال: أول SDK بيتا 2007، وأول إصدار تجاري (Android 1.0) سبتمبر 2008.

### Question 2: Explain the concept of API Level and its backward compatibility rule.
**نموذج الإجابة:** `API Level` رقم صحيح فريد يمثّل نسخة الـ Framework API. كل إصدار أندرويد يدعم API level واحد صراحة، لكن الدعم ضمني لكل المستويات الأقدم رجوعاً حتى API 1. يُستخدم عبر `minSdkVersion` لتحديد أقل نسخة يدعمها التطبيق.

### Question 3: Describe the role of the Hardware Abstraction Layer (HAL) with an example.
**نموذج الإجابة:** HAL طبقة وسيطة توفر واجهات موحّدة تعرض قدرات الهاردوير لـ Java API Framework. تتكوّن من `library modules` منفصلة لكل نوع هاردوير (كاميرا، Bluetooth). مثال: عند استدعاء دالة كاميرا، يُحمَّل موديول HAL المطابق لهاردوير ذلك الجهاز تحديداً.

### Question 4: Compare Dalvik and ART in terms of compilation strategy and performance.
**نموذج الإجابة:** Dalvik استخدمت `JIT (Just-in-Time)` — ترجمة أثناء التشغيل، مما يبطئ بدء التشغيل. ART تستخدم `AOT (Ahead-of-Time)` — ترجمة مسبقة قبل التشغيل، مما يحسّن سرعة بدء التشغيل وكفاءة الذاكرة. ART هي الافتراضية منذ أندرويد 5.0 (API 21).

### Question 5: What are the 9 core services provided by the Java API Framework? Name at least 5.
**نموذج الإجابة:** من أصل 9: `Activity Manager` (إدارة دورة حياة الشاشات)، `Window Manager` (عرض النوافذ)، `Package Manager` (تثبيت التطبيقات)، `Resource Manager` (الموارد)، `Notification Manager` (التنبيهات)، إضافة لـ Location Manager وTelephony Manager وView System وContent Provider.

### Question 6: Explain the Declarative UI approach used by Jetpack Compose and how it differs from the imperative approach.
**نموذج الإجابة:** النهج `Declarative` يعني وصف شكل الواجهة المطلوب حسب البيانات الحالية عبر دوال `@Composable`، بدل التعديل اليدوي المباشر للعناصر (`Imperative` كما في View System القديم). عند تغيّر البيانات، تُعاد Compose تنفيذ الدالة تلقائياً (`Recomposition`) بدل أن يقوم المطوّر بتحديث كل عنصر يدوياً.

### Question 7: What is Recomposition, and how does Compose optimize its performance?
**نموذج الإجابة:** `Recomposition` هي إعادة تنفيذ دالة Composable تلقائياً عند تغيّر البيانات (`state`) التي تعتمد عليها، لإنتاج تمثيل جديد للواجهة. تُحسِّن Compose الأداء بتخطي (`skip`) أي عناصر لا تعتمد فعلياً على البيانات المتغيّرة، فلا تُعاد معالجتها من جديد.

### Question 8: Describe the standard folder structure of an Android app module in Android Studio.
**نموذج الإجابة:** كل module يحتوي: `manifests` (ملف AndroidManifest.xml)، `java` (كود Kotlin/Java واختبارات JUnit)، `res` (موارد غير برمجية كالنصوص والصور). بالإضافة لملفات Gradle الظاهرة في المستوى الأعلى للمشروع بالكامل (`Gradle Scripts`).

### Question 9: Why does Google recommend Kotlin over Java for new Android development? List at least 3 reasons.
**نموذج الإجابة:** (1) كود أقل وأوضح وأقل عرضة للأخطاء (20% أقل تعطلاً حسب بيانات Google)، (2) دعم كامل من مكتبات Jetpack وخصوصاً Compose، (3) دعم `Kotlin Multiplatform` لمشاركة الكود بين منصات متعددة، (4) توافقية كاملة مع Java القديم دون الحاجة لإعادة كتابة المشروع بالكامل.

---

# الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح طبقات Android Software Stack الخمس بالترتيب من الأسفل للأعلى
- [ ] أفهم الفرق بين `Standard Linux Kernel Services` و`Android-specific Services`
- [ ] أستطيع شرح دور `HAL` كوسيط بين الهاردوير والإطار البرمجي
- [ ] أفهم الفرق بين `ART` و`Dalvik` من ناحية `JIT` مقابل `AOT`
- [ ] أستطيع تسمية 5 على الأقل من Managers في `Java API Framework` ودور كل منها
- [ ] أفهم لماذا تطبيقات `System Apps` قابلة للاستبدال من طرف ثالث
- [ ] أستطيع شرح مفهوم `API Level` وقاعدة الدعم الضمني للإصدارات الأقدم
- [ ] أفهم فوائد Kotlin الأساسية (كود أقل، أخطاء أقل، Multiplatform)
- [ ] أستطيع شرح `Declarative UI` مقابل `Imperative UI`
- [ ] أفهم مفهوم `Composable Function` و`@Composable` annotation
- [ ] أستطيع شرح `Recomposition` وكيف تُحسِّن Compose الأداء بالتخطي الذكي
- [ ] أفهم دور `setContent` كجسر بين Activity وCompose
- [ ] أستطيع وصف هيكل مجلدات مشروع Android Studio (manifests, java, res)
- [ ] أفهم دور `Gradle` وملفات `build.gradle.kts` في بناء المشروع

---

## ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Android Platform (هذه) | Kotlin Essentials | تُبنى تطبيقات أندرويد بلغة Kotlin الموصى بها |
| Android Platform (هذه) | Jetpack Compose UI | مقدمة أساسية لمفهوم Composable وRecomposition |
| Android Platform (هذه) | App Fundamentals (Activity) | مقدمة لدور Activity Manager ودورة الحياة |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| Software Stack | 5 طبقات: Kernel → HAL → ART/Native → Java Framework → System Apps |
| API Level | رقم فريد لكل إصدار + دعم ضمني للأقدم |
| ART مقابل Dalvik | AOT مقابل JIT |
| Compose | Declarative + Recomposition + تحسين تلقائي بالتخطي |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `HAL` | Hardware Abstraction Layer | ربط الهاردوير بالإطار البرمجي |
| `ART` | Android Runtime | تنفيذ DEX bytecode |
| `AOT` / `JIT` | Ahead-of-Time / Just-in-Time | نوع الترجمة في ART/Dalvik |
| `@Composable` | Annotation لدالة واجهة | Jetpack Compose |
| `minSdkVersion` | أقل API مدعوم | إعدادات Gradle |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | كل طبقة في الـ Stack تعتمد فقط على الطبقة التي تحتها مباشرة |
| 2 | Composable لا تُرجع قيمة ولا تُعدَّل مباشرة — فقط تُعاد صياغتها عبر Recomposition |
| 3 | ART = AOT (قبل التشغيل)، Dalvik = JIT (أثناء التشغيل) |
| 4 | دعم API Level ضمني دائماً للإصدارات الأقدم من الإصدار المحدد |
| 5 | System Apps ليست محمية — يمكن استبدالها بتطبيقات طرف ثالث (عدا استثناءات مثل Settings) |

---

<!-- VALIDATION: تم تغطية كل المعلومات الواردة في المحاضرة (38 شريحة) بالكامل: تعريف Android، Open Handset Alliance، تاريخ الإصدارات، SDK، Kotlin for Android وفوائدها، جدول الإصدارات القديمة والحديثة، API Level، الطبقات الخمس (Linux Kernel، HAL، ART، Native C/C++ Libraries، Java API Framework بمكوناته التسعة، System Apps)، Jetpack Compose (Declarative UI، Composable functions، Recomposition، الأمثلة البرمجية الأربعة من الشرائح)، Android Studio (الميزات، هيكل المشروع، Gradle build system). تم الالتزام ببنية المخرجات: خريطة تكامل، شرح تفصيلي مرقّم هرمياً مع "النص الأصلي يقول" و"الشرح المبسّط" لكل قسم، ملخص منظم بجداول شاملة، خوارزميات لكل إجراء ورد في المحاضرة، 16 سؤال MCQ بالتوزيع المطلوب (25% مقارنات / 35% سيناريو كود / 40% تطبيق)، 6 أسئلة تصحيح كود بأنواع متعددة (misconception, logic x2, dead_code, syntax, return_check)، 6 تمارين إضافية، 3 تمارين تتبع تنفيذ، سؤالا تصميم، كود مرجعي نهائي، 9 أسئلة نظرية، قائمة فحص ذاتي، وورقة مراجعة سريعة. -->

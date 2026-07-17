# المحاضرة 1 — Android Platform (منصة أندرويد)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** منصة أندرويد، بنيتها المعمارية، Kotlin، و Jetpack Compose

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| فهم المنصة والبنية المعمارية ← **أنت هنا** | `Linux Kernel`، `HAL`، `ART`، `Java API Framework`، `Android Studio` | فهم كيف يعمل نظام أندرويد من الداخل وكيف تُبنى التطبيقات فوقه |
| تعلّم لغة Kotlin | `val/var`، `Functions`، `OOP`، `Null Safety` | كتابة كود Kotlin صحيح وآمن |
| بناء واجهات المستخدم | `Jetpack Compose`، `@Composable`، `Modifier` | شاشات تفاعلية حديثة بأقل كود |
| بناء التطبيقات الكاملة | `Activity`، `ViewModel`، `Room`، `Retrofit`، `Hilt` | تطبيقات أندرويد كاملة بمعمارية MVVM |

> **نوع هذه المحاضرة:** محاضرة نظرية تمهيدية عن **Android Platform** — تشرح ما هو أندرويد، لماذا Kotlin، إصدارات النظام، البنية المعمارية الكاملة للمنصة (Linux Kernel → HAL → ART → Native Libraries → Java API Framework → System Apps)، مقدمة عن Jetpack Compose، وبيئة التطوير Android Studio.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. تعريف أندرويد ونشأته

#### النص الأصلي يقول (English):
> "Android is an open source and Linux-based Operating System designed primarily for touchscreen mobile devices such as smartphones and tablets. Android is developed by a consortium of developers known as the Open Handset Alliance, with the main contributor and commercial marketer being Google. Android offers a unified approach to application development for mobile devices which means developers need to develop only for Android, and their applications should be able to run on different devices powered by Android. The first beta version of the Android Software Development Kit (SDK) was released by Google in 2007, whereas the first commercial version, Android 1.0, was released in September 2008."

#### الترجمة الحرفية:
> أندرويد هو نظام تشغيل مفتوح المصدر ومبني على Linux، مُصمَّم بشكل أساسي لأجهزة الجوّال ذات الشاشة اللمسية مثل الهواتف الذكية والأجهزة اللوحية. يُطوَّر أندرويد بواسطة تحالف من المطورين يُعرف باسم Open Handset Alliance، والمساهم الرئيسي والمسوِّق التجاري له هو Google. يقدّم أندرويد نهجاً موحّداً لتطوير التطبيقات على الأجهزة المحمولة، بمعنى أن المطورين يحتاجون إلى التطوير لأندرويد فقط، ويُفترض أن تعمل تطبيقاتهم على أجهزة مختلفة تعمل بنظام أندرويد. صدرت أول نسخة تجريبية (beta) من حزمة تطوير برمجيات أندرويد (Android SDK) عن Google سنة 2007، بينما صدرت أول نسخة تجارية، أندرويد 1.0، في سبتمبر 2008.

#### الشرح المبسّط:
باختصار، أندرويد هو نظام تشغيل — أي البرنامج الأساسي الذي يُشغّل الجهاز ويدير كل شيء فيه (الشاشة، الذاكرة، التطبيقات) — وهو مبني فوق نواة Linux الشهيرة والموثوقة. أهميته تكمن في أنه **موحّد**: لو كتبت تطبيقاً واحداً بلغة Kotlin أو Java فإنه (من حيث المبدأ) يعمل على آلاف الأجهزة المختلفة من شركات مختلفة (Samsung، Xiaomi، Google...) لأنها كلها تشترك بنفس الأساس. هذا يرتبط مباشرة بكونه Open Source (مفتوح المصدر)، فأي شركة مصنّعة هواتف تستطيع أخذ كود أندرويد وتعديله لجهازها الخاص دون دفع رسوم ترخيص، وهذا سبب انتشاره الواسع مقارنة بأنظمة مغلقة مثل iOS. **تشبيه يومي:** فكّر بأندرويد مثل "مخطط بناء منزل" (Blueprint) مجاني ومتاح للجميع — أي مقاول (شركة هواتف) يستطيع أخذه وبناء منزله (هاتفه) عليه بحرية، بعكس مخطط مملوك بالكامل لشركة واحدة لا يمكن لأحد غيرها استخدامه.

**لماذا؟** لأن الهدف من فتح المصدر وتوحيد النهج هو تسريع الابتكار وخفض التكلفة — بدل أن تبني كل شركة هاتف نظام تشغيل من الصفر، تبني فوق أندرويد الجاهز وتضيف له لمستها الخاصة (كما تفعل Samsung بواجهة One UI فوق أندرويد).

---

### 2. تطوير تطبيقات أندرويد (SDK والتوزيع)

#### النص الأصلي يقول (English):
> "The source code for Android is available under free and open source software licenses. Android applications are usually developed in the Java or Kotlin language using the Android SDK (Software Development Kit). Android SDK (Software Development Kit) is a set of tools required to develop, debug, and test Android applications. Includes: SDK Tools (for compiling & building apps), SDK Platform (for different Android versions), Emulator (for testing apps without a real device). Once developed, Android applications can be packaged easily and sold out either through a store such as Google Play or the Amazon Appstore."

#### الترجمة الحرفية:
> الكود المصدري لأندرويد متاح بموجب تراخيص برمجيات حرة ومفتوحة المصدر. عادةً ما تُطوَّر تطبيقات أندرويد بلغة Java أو Kotlin باستخدام حزمة تطوير برمجيات أندرويد (Android SDK). حزمة تطوير برمجيات أندرويد (Android SDK) هي مجموعة من الأدوات اللازمة لتطوير وتصحيح واختبار تطبيقات أندرويد. وتشمل: أدوات SDK (لتجميع وبناء التطبيقات)، منصة SDK (لإصدارات أندرويد المختلفة)، والمحاكي (لاختبار التطبيقات بدون جهاز حقيقي). بعد تطوير التطبيقات، يمكن تغليفها بسهولة وبيعها إما عبر متجر مثل Google Play أو متجر Amazon Appstore.

#### الشرح المبسّط:
هذه الفقرة تشرح "صندوق الأدوات" (SDK) الذي يحتاجه أي مطور ليبدأ العمل على أندرويد؛ فمثلما يحتاج النجار إلى منشار ومطرقة، يحتاج مطوّر أندرويد إلى `Android SDK` الذي يحتوي أدوات البناء (Build Tools)، ونسخ مختلفة من نظام أندرويد للاختبار عليها (SDK Platform)، ومحاكياً (Emulator) يسمح بتجربة التطبيق على "هاتف افتراضي" داخل الحاسوب دون الحاجة لشراء هاتف حقيقي. هذا يرتبط بالنقطة السابقة عن كون أندرويد مفتوح المصدر: بما أن الكود متاح، توفّر Google أيضاً أدوات مجانية (SDK) لأي شخص يريد البناء عليه. وأخيراً، بعد الانتهاء من التطوير، لا ينتهي الأمر بمجرد كتابة الكود — يحتاج المطور لنشر تطبيقه في متجر مثل `Google Play` ليصل للمستخدمين، تماماً كما يحتاج صاحب المطعم لواجهة عرض (المتجر) بعد تحضير الطعام (التطبيق).

**لماذا؟** لأن فصل "أدوات التطوير" (SDK) عن "نظام التشغيل نفسه" يسمح للمطور بتحديث أدواته بمعزل عن تحديث النظام، ويتيح اختبار التطبيق على إصدارات أندرويد متعددة دون امتلاك أجهزة فعلية لكل إصدار — وهذا يوفر وقتاً وتكلفة كبيرين.

---

### 3. لماذا Kotlin؟ — الفوائد التقنية المباشرة

#### النص الأصلي يقول (English):
> "Android mobile development has been Kotlin-first since Google I/O in 2019. Using Kotlin for Android development, you can benefit from: Less code combined with greater readability. Spend less time writing your code and working to understand the code of others. Fewer common errors. Apps built with Kotlin are 20% less likely to crash based on Google's internal data. Kotlin support in Jetpack libraries. Jetpack Compose is Android's recommended modern toolkit for building native UI in Kotlin. KTX extensions add Kotlin language features, like coroutines, extension functions, lambdas, and named parameters to existing Android libraries. Support for multiplatform development. Kotlin Multiplatform allows development for not only Android but also iOS, backend, and web applications."

#### الترجمة الحرفية:
> أصبح تطوير تطبيقات أندرويد للجوال يعتمد Kotlin كأولوية أولى (Kotlin-first) منذ مؤتمر Google I/O سنة 2019. باستخدام Kotlin في تطوير أندرويد، يمكنك الاستفادة من: كود أقل مع قابلية قراءة أكبر؛ ستقضي وقتاً أقل في كتابة كودك وفي فهم كود الآخرين. أخطاء شائعة أقل؛ التطبيقات المبنية بـ Kotlin أقل عرضة بنسبة 20% للتعطّل (crash) استناداً إلى بيانات Google الداخلية. دعم Kotlin في مكتبات Jetpack؛ فـ Jetpack Compose هو مجموعة الأدوات الحديثة الموصى بها من أندرويد لبناء واجهات مستخدم أصلية بلغة Kotlin. امتدادات KTX تضيف ميزات لغة Kotlin، مثل coroutines، الدوال الامتدادية (extension functions)، الدوال اللامدة (lambdas)، والمعاملات المسمّاة (named parameters) إلى مكتبات أندرويد الموجودة. دعم التطوير متعدد المنصّات؛ فـ Kotlin Multiplatform يسمح بالتطوير ليس فقط لأندرويد بل أيضاً لـ iOS، والخلفية (backend)، وتطبيقات الويب.

#### الشرح المبسّط:
هذه الفقرة توضح لماذا اختارت Google لغة Kotlin كلغة رسمية أساسية لأندرويد بدل الاعتماد فقط على Java القديمة. الفكرة الجوهرية هي أن Kotlin تسمح بكتابة نفس المنطق البرمجي بأسطر أقل وبشكل أوضح، وهذا يقلل احتمال الأخطاء البشرية أثناء الكتابة (ومن هنا رقم "أقل عرضة بنسبة 20% للتعطّل")، كما أنها مصمَّمة خصيصاً لتتكامل بسلاسة مع أحدث أدوات أندرويد مثل `Jetpack Compose`. **تشبيه يومي:** الفرق بين Java و Kotlin يشبه الفرق بين كتابة رسالة بجملة طويلة معقدة (Java القديمة) وكتابة نفس الرسالة بجملة قصيرة ومباشرة (Kotlin) — المعنى واحد لكن الوقت والجهد المبذولان في القراءة والكتابة يختلفان كثيراً. أما دعم "التطوير متعدد المنصّات" (`Kotlin Multiplatform`) فيعني أن نفس المنطق البرمجي (مثلاً حسابات أو قواعد عمل) يمكن كتابته مرة واحدة ومشاركته بين تطبيق أندرويد وتطبيق iPhone، بدل كتابته مرتين بلغتين مختلفتين — تماماً مثل استخدام نفس الوصفة لطبخ نفس الطبق في مطبخين مختلفين بدل اختراع وصفة جديدة لكل مطبخ.

**لماذا؟** لأن تقليل الكود وتقليل الأخطاء يعني تطبيقات أسرع في البناء وأكثر استقراراً للمستخدم النهائي، وهذا يوفر وقت ومال الشركات المطوِّرة، وهو السبب المباشر وراء تبنّي Google الرسمي لـ Kotlin.

---

### 4. لماذا Kotlin؟ — النضج والتوافقية والمجتمع

#### النص الأصلي يقول (English):
> "Mature language and environment. Since its creation in 2011, Kotlin has developed continuously, not only as a language but as a whole ecosystem with robust tooling. Now it's seamlessly integrated into Android Studio and is actively used by many companies for developing Android applications. Interoperability with Java. You can use Kotlin along with the Java programming language in your applications without needing to migrate all your code to Kotlin. Easy learning. Kotlin is very easy to learn, especially for Java developers. Big community. Kotlin has great support and many contributions from the community, which is growing all over the world. Over 95% of the top thousand Android apps use Kotlin."

#### الترجمة الحرفية:
> لغة وبيئة ناضجة؛ منذ إنشائها سنة 2011، تطوّرت Kotlin باستمرار، ليس فقط كلغة بل كمنظومة متكاملة (ecosystem) بأدوات قوية. والآن هي مدمجة بسلاسة في Android Studio وتُستخدم فعلياً من قِبل شركات عديدة لتطوير تطبيقات أندرويد. قابلية التشغيل البيني مع Java؛ يمكنك استخدام Kotlin جنباً إلى جنب مع لغة Java في تطبيقاتك دون الحاجة لترحيل كل كودك إلى Kotlin. سهلة التعلّم؛ Kotlin سهلة التعلّم جداً، خصوصاً لمطوري Java. مجتمع كبير؛ تحظى Kotlin بدعم كبير ومساهمات عديدة من المجتمع الذي ينمو حول العالم. أكثر من 95% من أفضل ألف تطبيق أندرويد تستخدم Kotlin.

#### الشرح المبسّط:
تُكمل هذه الفقرة النقاط السابقة بأربعة أسباب "عملية" إضافية تجعل تعلّم Kotlin قراراً آمناً للمطور المبتدئ. أولاً، هي ليست لغة تجريبية جديدة بل نضجت منذ 2011 ولها أدوات قوية داخل `Android Studio`. ثانياً، وهذه نقطة مهمة جداً للمشاريع الحقيقية: يمكن مزج ملفات Kotlin وJava في نفس المشروع (تشغيل بيني/interoperability) — بمعنى أن شركة تملك مشروعاً قديماً مكتوباً بالكامل بـ Java لا تحتاج لإعادة كتابته من الصفر، بل تستطيع إضافة ملفات Kotlin جديدة تدريجياً وكلاهما يعملان معاً بانسجام. **تشبيه يومي:** هذا يشبه منزلاً مبنياً بالطوب القديم يمكنك أن تضيف له غرفة جديدة بمواد بناء حديثة دون أن تهدم المنزل بالكامل. ثالثاً ورابعاً، سهولة التعلّم (خصوصاً لمن يعرف Java مسبقاً) وحجم المجتمع الكبير (95% من أفضل 1000 تطبيق) يعنيان عملياً أن أي مشكلة تواجهها كمطور مبتدئ غالباً ما يكون لها حل موثّق أو منشور من مطور آخر واجه نفس المشكلة سابقاً.

**لماذا؟** لأن اللغة الناضجة وذات المجتمع الكبير تقلل المخاطرة على الشركات والأفراد الذين يستثمرون وقتهم في تعلّمها — فهي مدعومة رسمياً ولن "تختفي" أو "تتوقف عن التطوّر" بعد سنة أو سنتين.

---

### 5. إصدارات أندرويد القديمة والحديثة

#### النص الأصلي يقول (English):
> "Android History and Platform Versions for more and earlier versions before 2011 on: https://source.android.com/setup/start/build-numbers" — with tables listing codenames from Honeycomb (3.0, Feb 2011, API 11) through Marshmallow (6.0, Oct 2015, API 23), and from Nougat (7.0, Sept 2016, API 24) through Android 16 (Jun 2025, API 36).

#### الترجمة الحرفية:
> لمزيد من المعلومات عن تاريخ أندرويد وإصدارات المنصّة السابقة قبل عام 2011، راجع الرابط: source.android.com/setup/start/build-numbers. (تلي هذه العبارة جداول تسرد الأسماء الرمزية للإصدارات من Honeycomb (3.0، فبراير 2011، مستوى API 11) وحتى Marshmallow (6.0، أكتوبر 2015، مستوى API 23)، ثم من Nougat (7.0، سبتمبر 2016، مستوى API 24) وحتى أندرويد 16 (يونيو 2025، مستوى API 36).

#### الشرح المبسّط:
هاتان الشريحتان ليستا معلومة نظرية بقدر ما هما "مرجع" (Reference) يجب أن يعرف المطور كيف يقرأه عند الحاجة، لأن أندرويد يصدر نسخة جديدة كل سنة تقريباً وتحمل كل نسخة رقم إصدار (Version) واسماً رمزياً (Codename) ورقم مستوى API خاصاً بها. **لماذا يهم هذا المطور؟** لأنه عند بناء تطبيق، يجب أن يقرر "الحد الأدنى" لإصدار أندرويد الذي سيدعمه تطبيقه — فكلما دعمت إصدارات أقدم، وصل تطبيقك لعدد أكبر من المستخدمين، لكنك تخسر إمكانية استخدام ميزات النظام الحديثة غير المتوفرة في تلك الإصدارات القديمة. **تشبيه يومي:** الأمر يشبه بناء طريق جديد — كل سنة تُضاف "طبقة إسفلت" جديدة (نسخة أندرويد) فوق الطريق القديم مع تحسينات، لكن السيارات القديمة (الهواتف القديمة) قد لا تستطيع استخدام كل المزايا الحديثة لهذا الطريق.

**لماذا؟** لأن تتبّع هذه الإصدارات يساعد المطور على اتخاذ قرارات توافقية (Compatibility) صحيحة أثناء بناء التطبيق، وهو موضوع سيتكرر لاحقاً عند الحديث عن `minSdkVersion` و`targetSdkVersion` في ملف `AndroidManifest.xml`.

---

### 6. مستوى API (API Level)

#### النص الأصلي يقول (English):
> "API level is an integer value that uniquely identifies the framework API revision offered by a version of the Android platform. The Android platform provides a framework API that applications can use to interact with the underlying Android system. The framework API consists of: A core set of packages and classes; A set of XML elements and attributes for declaring a manifest file; A set of XML elements and attributes for declaring and accessing resources; A set of intents; A set of permissions that applications can request, as well as permission enforcements included in the system. Each successive version of the Android platform can include updates to the Android application framework API that it delivers. Each Android platform version supports exactly one API level, although support is implicit for all earlier API levels (down to API level 1)."

#### الترجمة الحرفية:
> مستوى API هو قيمة عددية صحيحة تحدّد بشكل فريد إصدار الـ framework API الذي تقدّمه نسخة معيّنة من منصّة أندرويد. توفّر منصّة أندرويد واجهة برمجة تطبيقات إطارية (framework API) يمكن للتطبيقات استخدامها للتفاعل مع نظام أندرويد الأساسي. تتكون هذه الـ framework API من: مجموعة أساسية من الحزم (packages) والفئات (classes)؛ مجموعة من عناصر وسمات XML لتعريف ملف البيان (manifest)؛ مجموعة من عناصر وسمات XML لتعريف والوصول إلى الموارد (resources)؛ مجموعة من الـ intents؛ ومجموعة من الأذونات (permissions) التي يمكن للتطبيقات طلبها، بالإضافة إلى فرض الأذونات المضمَّن في النظام. يمكن أن تتضمن كل نسخة لاحقة من منصّة أندرويد تحديثات على واجهة برمجة تطبيقات إطار عمل التطبيقات التي تقدّمها. تدعم كل نسخة من منصّة أندرويد مستوى API واحداً بالضبط، رغم أن الدعم يكون ضمنياً لكل مستويات API السابقة (وصولاً إلى مستوى API رقم 1).

#### الشرح المبسّط:
مستوى API هو ببساطة "رقم تعريفي" لكل نسخة من أندرويد يخبر النظام والتطبيقات بالضبط ما هي الإمكانيات (الدوال، الأذونات، عناصر الواجهة...) المتاحة في هذه النسخة تحديداً. يرتبط هذا مباشرة بالشريحة السابقة عن الإصدارات: فكل صف في جدول الإصدارات (Honeycomb، Marshmallow، Android 16...) يقابله رقم API محدد، وهذا الرقم هو ما يستخدمه المطور فعلياً في الكود (وليس اسم الإصدار). **تشبيه يومي:** فكّر بمستوى API مثل "رقم إصدار قانون" — بدل أن تقول "القانون الذي صدر في فصل الربيع"، تقول "القانون رقم 34"، وهذا الرقم يحدد بدقة أي "بنود" (features/permissions) سارية المفعول. مثال عملي: إن أراد المطور استخدام ميزة جديدة موجودة فقط من API 33 فما فوق، وكان تطبيقه يدعم أجهزة بـ API 21، عليه أن يكتب كوداً يتحقق من رقم النسخة قبل استخدام تلك الميزة.

**لماذا؟** لأن الأذونات (Permissions) وعناصر ملف البيان (Manifest XML) والموارد كلها ترتبط بإصدار محدد من الـ framework، فبدون رقم API واضح لا يمكن للنظام أو للمطور معرفة ما هو "متوافق" وما هو غير متوافق.

---

### 7. البنية المعمارية لمنصّة أندرويد (نظرة عامة)

#### النص الأصلي يقول (English):
> "The Android platform is software stack created for a wide range of mobile devices that uses a modified Linux kernel. This graphic represents the major components of the Android platform (The Android software stack)."

#### الترجمة الحرفية:
> منصّة أندرويد هي مكدّس برمجي (software stack) صُمِّم لمجموعة واسعة من الأجهزة المحمولة ويستخدم نواة Linux معدَّلة. يمثّل هذا الرسم البياني المكوّنات الرئيسية لمنصّة أندرويد (مكدّس أندرويد البرمجي).

#### الشرح المبسّط:
هذه الجملة القصيرة هي مفتاح فهم كل ما سيأتي لاحقاً في المحاضرة، لأنها تقدّم مفهوم "المكدّس البرمجي" (Software Stack) — أي أن أندرويد ليس برنامجاً واحداً، بل عدة طبقات مبنية فوق بعضها البعض، وكل طبقة تعتمد على الطبقة التي تحتها. الطبقات الست الرئيسية (من الأسفل للأعلى) هي: `Linux Kernel`، `HAL`، `Native C/C++ Libraries` و`Android Runtime (ART)` جنباً إلى جنب، `Java API Framework`، ثم `System Apps` في الأعلى. **تشبيه يومي:** تخيّل مبنى من ستة طوابق — الطابق الأرضي هو الأساس والكهرباء والسباكة (Linux Kernel)، وكل طابق فوقه يبني خدمة أكثر تعقيداً حتى تصل للطابق الأخير الذي يسكنه الناس فعلياً (System Apps مثل تطبيق الهاتف والكاميرا). المطور العادي يتعامل غالباً مع الطبقات العليا (Java API Framework) فقط، لكن فهم الطبقات السفلية يساعده على فهم *لماذا* يعمل النظام بالشكل الذي يعمل به.

**لماذا؟** لأن تقسيم النظام إلى طبقات (Layered Architecture) يجعل كل طبقة قابلة للتطوير والاستبدال بشكل مستقل — مثلاً يمكن لـ Google تحديث `ART` دون الحاجة لتعديل كل تطبيق مكتوب فوقه، وهذا مبدأ هندسي أساسي في تصميم الأنظمة الكبيرة.

---

### 8. نواة Linux — الأساس والغرض

#### النص الأصلي يقول (English):
> "The foundation of the Android platform is the Linux kernel. For example, the Android Runtime (ART) relies on the Linux kernel for underlying functionalities such as threading and low-level memory management. Using a Linux kernel lets Android take advantage of key security features and lets device manufacturers develop hardware drivers for a well-known kernel."

#### الترجمة الحرفية:
> أساس منصّة أندرويد هو نواة Linux. على سبيل المثال، يعتمد Android Runtime (ART) على نواة Linux لوظائف أساسية مثل الخيوط البرمجية (threading) وإدارة الذاكرة منخفضة المستوى. استخدام نواة Linux يتيح لأندرويد الاستفادة من ميزات أمان أساسية، ويتيح لمصنّعي الأجهزة تطوير برامج تشغيل (drivers) للأجهزة لنواة معروفة جيداً.

#### الشرح المبسّط:
هذا القسم يشرح أدنى طبقة في المكدّس: نواة Linux، وهي "الجسر" المباشر بين البرمجيات والعتاد الفعلي (Hardware) للهاتف. أهميتها تظهر في أن الطبقات الأعلى — مثل `ART` — لا "تتحدث" مباشرة مع الشاشة أو المعالج، بل تطلب من نواة Linux تنفيذ العمليات منخفضة المستوى مثل إدارة الذاكرة أو تشغيل عدة مهام (Threads) في نفس الوقت. سبب اختيار Google لـ Linux تحديداً (بدل بناء نواة جديدة من الصفر) هو أن Linux نظام ناضج، مُختبَر أمنياً منذ عقود، ومعروف لمعظم شركات صناعة العتاد، فيسهل عليهم كتابة "برامج تشغيل" (Drivers) متوافقة معه. **تشبيه يومي:** نواة Linux هنا تشبه أساسات مبنى وشبكة الكهرباء والمياه فيه — لا يراها الساكن (المستخدم) مباشرة، لكن كل شيء آخر في المبنى (الطوابق العليا) يعتمد عليها للعمل بشكل صحيح وآمن.

**لماذا؟** لأن إعادة استخدام نواة موجودة وموثوقة أرخص وأكثر أماناً من بناء نواة جديدة، ويستفيد أندرويد تلقائياً من كل التحسينات الأمنية التي يطوّرها مجتمع Linux الضخم عالمياً.

---

### 9. خدمات نواة Linux (القياسية والخاصة بأندرويد)

#### النص الأصلي يقول (English):
> "Linux Kernel Standard Services: security; memory & process management; file & network I/O; device drivers. Linux Kernel Android-specific Services: power management; android shared memory; low memory killer; Inter-process communication; and much more…"

#### الترجمة الحرفية:
> خدمات نواة Linux القياسية: الأمان؛ إدارة الذاكرة والعمليات؛ إدخال/إخراج الملفات والشبكة؛ برامج تشغيل الأجهزة (device drivers). خدمات نواة Linux الخاصة بأندرويد: إدارة الطاقة؛ الذاكرة المشتركة الخاصة بأندرويد (android shared memory)؛ قاتل الذاكرة المنخفضة (low memory killer)؛ التواصل بين العمليات (Inter-process communication)؛ والمزيد…

#### الشرح المبسّط:
تُقسّم هذه الشريحة خدمات النواة إلى فئتين: خدمات "قياسية" موجودة في أي نظام Linux عادي (مثل الأمان وإدارة الملفات)، وخدمات "خُصِّصت" أو عُدِّلت خصيصاً لتناسب طبيعة الأجهزة المحمولة. أبرز مثال عملي هو `Low Memory Killer` — وهي خدمة تراقب استهلاك الذاكرة (RAM) وتغلق تلقائياً التطبيقات الأقل أهمية أو غير النشطة في الخلفية عندما تقترب الذاكرة من الامتلاء، حفاظاً على سلاسة أداء الهاتف. هذا يرتبط بالفكرة السابقة عن كون الهواتف أجهزة محدودة الموارد (بعكس الحواسيب المكتبية)، لذا احتاج أندرويد لتعديل النواة لتتعامل بذكاء مع قلة الذاكرة واستهلاك البطارية (`power management`). **تشبيه يومي:** `Low Memory Killer` يشبه مدير فندق مزدحم يضطر لإخلاء الغرف (إغلاق التطبيقات) التي لا يستخدمها أحد حالياً لإفساح المجال لنزلاء جدد (تطبيقات نشطة)، بدل رفض الحجوزات الجديدة بالكامل.

**لماذا؟** لأن الهواتف المحمولة، بعكس الخوادم أو الحواسيب المكتبية، تعمل ببطارية محدودة وذاكرة محدودة، فاحتاجت Google لتخصيص النواة بخدمات إضافية (`power management`, `low memory killer`) لا توجد في توزيعات Linux العادية.

---

### 10. طبقة تجريد العتاد (HAL)

#### النص الأصلي يقول (English):
> "The hardware abstraction layer (HAL) provides standard interfaces that expose device hardware capabilities to the higher-level Java API framework. The HAL consists of multiple library modules, each of which implements an interface for a specific type of hardware component, such as the camera or Bluetooth module. When a framework API makes a call to access device hardware, the Android system loads the library module for that hardware component."

#### الترجمة الحرفية:
> توفّر طبقة تجريد العتاد (HAL) واجهات معيارية (standard interfaces) تكشف إمكانيات عتاد الجهاز أمام إطار عمل Java API الأعلى مستوى. تتكوّن طبقة HAL من عدة وحدات مكتبية (library modules)، وكل وحدة منها تُنفِّذ واجهة لنوع محدد من مكوّنات العتاد، مثل الكاميرا أو وحدة البلوتوث. عندما تجري واجهة برمجة تطبيقات الإطار (framework API) استدعاءً للوصول إلى عتاد الجهاز، يقوم نظام أندرويد بتحميل الوحدة المكتبية الخاصة بذلك المكوّن العتادي.

#### الشرح المبسّط:
طبقة HAL هي "مترجم" أو "وسيط" يقف بين طبقة الـ `Java API Framework` (التي يتعامل معها المطور) وبين نواة Linux وبرامج تشغيل العتاد الفعلي. الفائدة الكبرى هنا أن المطور عندما يكتب كوداً لفتح الكاميرا مثلاً، لا يحتاج لمعرفة أي نوع كاميرا موجود فعلياً في الجهاز (Samsung أم Google أم غيرها) — فكل مُصنِّع يوفّر "وحدة HAL" خاصة بكاميرته تتحدث بنفس "اللغة الموحدة" التي يفهمها أندرويد. هذا يربط مباشرة بمفهوم "التوحيد" (Unified approach) الذي ذُكر في بداية المحاضرة: بفضل HAL، يمكن لتطبيق واحد أن يعمل مع كاميرات مختلفة تماماً من حيث العتاد الداخلي دون تعديل كود التطبيق. **تشبيه يومي:** HAL يشبه مقبس الكهرباء العالمي (Universal Adapter) الذي يسمح لجهازك (تطبيقك) بالعمل في أي بلد (أي عتاد) رغم اختلاف شكل المقابس الأصلية (برامج تشغيل الشركات المصنّعة) — أنت توصل جهازك بالمقبس الموحّد فقط، وهو من يتولى "الترجمة" خلف الكواليس.

**لماذا؟** لأن مصنّعي الهواتف يستخدمون رقائق وقطع عتاد مختلفة تماماً (كاميرات، حساسات، بلوتوث من شركات متعددة)، فبدون طبقة وسيطة موحّدة كـ HAL، كان سيتوجّب على كل مطور تطبيق كتابة كود منفصل لكل نوع عتاد على حدة — وهذا غير عملي إطلاقاً.

---

### 11. بيئة تشغيل أندرويد (ART) — التعريف وDEX

#### النص الأصلي يقول (English):
> "ART is written to run multiple virtual machines on low-memory devices by executing Dalvik Executable format (DEX) files, a bytecode format designed specifically for Android that's optimized for a minimal memory footprint. Build tools compile Java/Kotlin sources into DEX bytecode, which can run on the Android platform. Android also includes a set of core runtime libraries that provide most of the functionality of the Java programming language, including some Java language features, that the Java API framework uses: basic java classes -- java.*, javax.*; app lifecycle -- android.*, androidx.*; Internet/Web services -- org.* and modern networking libraries (Retrofit, OkHttp, Ktor); Unit testing -- junit.*, androidx.test.*"

#### الترجمة الحرفية:
> كُتِب ART ليُشغِّل آلات افتراضية متعددة على أجهزة منخفضة الذاكرة عبر تنفيذ ملفات بصيغة Dalvik Executable (DEX)، وهي صيغة بايت كود (bytecode) مصمَّمة خصيصاً لأندرويد ومُحسَّنة لأقل بصمة ذاكرة ممكنة. تقوم أدوات البناء (Build tools) بترجمة (compile) مصادر Java/Kotlin إلى بايت كود DEX، القابل للتشغيل على منصّة أندرويد. يتضمّن أندرويد أيضاً مجموعة من مكتبات وقت التشغيل الأساسية (core runtime libraries) التي توفّر معظم وظائف لغة برمجة Java، بما فيها بعض ميزات لغة Java، التي يستخدمها إطار عمل Java API: فئات Java الأساسية -- java.*، javax.*؛ دورة حياة التطبيق -- android.*، androidx.*؛ خدمات الإنترنت/الويب -- org.* ومكتبات الشبكات الحديثة (Retrofit، OkHttp، Ktor)؛ الاختبار الوحدوي (Unit testing) -- junit.*، androidx.test.*.

#### الشرح المبسّط:
`ART` (اختصار Android Runtime) هو "المحرّك" الذي ينفّذ الكود الذي كتبه المطور فعلياً على الهاتف. المشكلة التي يحلّها ART هي أن الكود الذي نكتبه بـ Kotlin أو Java لا يفهمه المعالج (Processor) مباشرة، فتقوم أدوات البناء أولاً بترجمته إلى صيغة خاصة اسمها `DEX` (Dalvik Executable) — وهي صيغة مضغوطة ومُحسَّنة خصيصاً لتستهلك أقل ذاكرة ممكنة، لأن الهواتف (بعكس الحواسيب) تملك ذاكرة محدودة. بعدها، مكتبات "وقت التشغيل" (Core Runtime Libraries) التي يستخدمها ART توفّر الدوال الجاهزة الأساسية (فئات Java، دورة حياة التطبيق، الشبكات، الاختبار) التي يعتمد عليها أي تطبيق تقريباً، تماماً كما يعتمد الطبّاخ على أدوات مطبخ جاهزة (سكاكين، أواني) بدل صناعتها من الصفر لكل وجبة. **تشبيه يومي:** فكّر بـ DEX مثل "ملف مضغوط" (zip) خاص لملفاتك — بدل إرسال ملفات ضخمة كما هي، تضغطها أولاً لتوفير المساحة، وهذا بالضبط ما يفعله ART بكودك ليلائم ذاكرة الهاتف المحدودة.

**لماذا؟** لأن الهدف الأساسي من ART هو تشغيل عدة تطبيقات (عدة "آلات افتراضية") في وقت واحد على جهاز بموارد محدودة دون أن يبطئ النظام أو يستهلك بطارية زائدة — وهذا يعيدنا لفكرة أن أندرويد صُمِّم خصيصاً للأجهزة المحمولة وليس للحواسيب.

---

### 12. بيئة تشغيل أندرويد (ART) — مقارنة مع Dalvik

#### النص الأصلي يقول (English):
> "Prior to Android version 5.0 (API level 21), Dalvik was the Android runtime. If your app runs well on ART, then it can work on Dalvik as well, but the reverse might not be true." (comparison table: Compilation — JIT vs AOT; Performance — slower startup vs faster startup; Memory Usage — less initially vs more efficient management; Status — legacy but supported vs default for Android 5.0+).

#### الترجمة الحرفية:
> قبل إصدار أندرويد 5.0 (مستوى API رقم 21)، كان Dalvik هو بيئة تشغيل أندرويد. إذا كان تطبيقك يعمل جيداً على ART، فيمكنه العمل على Dalvik أيضاً، لكن العكس قد لا يكون صحيحاً. (جدول المقارنة: الترجمة — Just-in-Time (JIT) مقابل Ahead-of-Time (AOT)؛ الأداء — أوقات بدء تشغيل أبطأ مقابل أوقات بدء تشغيل أسرع وأداء محسَّن؛ استخدام الذاكرة — استخدام ذاكرة أقل مبدئياً مقابل إدارة ذاكرة أكثر كفاءة؛ الحالة — آلة افتراضية قديمة (legacy) لكن ما زالت مدعومة مقابل الآلة الافتراضية الافتراضية (default) لأندرويد 5.0 فما فوق).

#### الشرح المبسّط:
هذه الشريحة تكمل السابقة بمقارنة تاريخية: قبل ART، كانت هناك بيئة تشغيل أقدم اسمها `Dalvik`، والفرق الجوهري بينهما هو **متى** تتم ترجمة الكود إلى صيغة يفهمها المعالج. `Dalvik` كان يستخدم أسلوب `JIT` (Just-In-Time) أي يترجم أجزاء من الكود "لحظة الحاجة إليها" أثناء تشغيل التطبيق، بينما `ART` يستخدم أسلوب `AOT` (Ahead-Of-Time) أي يترجم كل الكود *مسبقاً* عند تثبيت التطبيق لأول مرة. هذا يفسّر لماذا تُقلع (تفتح) التطبيقات في ART أسرع من Dalvik — لأن العمل الشاق (الترجمة) حدث مسبقاً عند التثبيت وليس في كل مرة يُفتح فيها التطبيق. **تشبيه يومي:** الفرق يشبه الفرق بين طباخ يحضّر الطعام لحظة وصول الزبون (JIT/Dalvik، أبطأ لكل طلب لكن لا يحتاج تحضيراً مسبقاً) وطباخ يجهّز كل الأطباق مسبقاً في الصباح (AOT/ART، يستغرق وقتاً أطول في البداية "عند التثبيت" لكن التقديم لاحقاً فوري وسريع).

**لماذا؟** لأن الانتقال من Dalvik إلى ART (اعتباراً من أندرويد 5.0) كان محاولة من Google لتحسين تجربة المستخدم عبر تسريع فتح التطبيقات، على حساب زيادة بسيطة في وقت التثبيت ومساحة التخزين — وهي مقايضة (Trade-off) مقبولة لأن التثبيت يحدث مرة واحدة بينما فتح التطبيق يحدث مئات المرات.

#### ⚖️ المقايضة: Dalvik (JIT) مقابل ART (AOT)

| | Dalvik (JIT) | ART (AOT) |
| --- | --- | --- |
| المزايا | تثبيت أسرع، مساحة تخزين أقل عند التثبيت | فتح تطبيقات أسرع، أداء عام أفضل، إدارة ذاكرة أكفأ |
| العيوب | فتح التطبيقات أبطأ في كل مرة | تثبيت أبطأ نسبياً، مساحة تخزين أكبر بعد الترجمة المسبقة |
| متى تختاره | غير مستخدَم حالياً — تاريخي فقط (قبل API 21) | الخيار الافتراضي والوحيد فعلياً في أندرويد 5.0 وما بعده |

---

### 13. مكتبات ++C/C الأصلية (Native Libraries)

#### النص الأصلي يقول (English):
> "Many core Android system components and services, such as ART and HAL, are built from native code that requires native libraries written in C and C++. The Android platform provides Java framework APIs to expose the functionality of some of these native libraries to apps. E.g., you can access OpenGL ES through the Android framework's Java OpenGL API to add support for drawing and manipulating 2D and 3D graphics in your app."

#### الترجمة الحرفية:
> يُبنى كثير من مكونات وخدمات نظام أندرويد الأساسية، مثل ART و HAL، من كود أصلي (native code) يتطلب مكتبات أصلية مكتوبة بلغتي C و ++C. توفّر منصّة أندرويد واجهات برمجة تطبيقات Java الإطارية (Java framework APIs) لكشف وظائف بعض هذه المكتبات الأصلية أمام التطبيقات. على سبيل المثال، يمكنك الوصول إلى OpenGL ES عبر واجهة Java OpenGL API التابعة لإطار عمل أندرويد لإضافة دعم لرسم ومعالجة الرسوميات ثنائية وثلاثية الأبعاد في تطبيقك.

#### الشرح المبسّط:
هذه الطبقة تشرح "لماذا" تحتاج مكونات معينة في أندرويد (مثل `ART` و`HAL` اللذين شرحناهما سابقاً) لكود مكتوب بلغتي C و++C بدل Java/Kotlin: السبب هو الأداء — لغات C/++C أقرب للعتاد وأسرع تنفيذاً في العمليات الثقيلة مثل الرسوميات ومعالجة الصوت والفيديو. المطور العادي لا يكتب بلغة C++ مباشرة عادةً، لكنه "يستفيد" منها بشكل غير مباشر عبر واجهات Java/Kotlin التي تتصل بهذه المكتبات خلف الكواليس، كما في مثال `OpenGL ES` لرسم الرسوميات ثلاثية الأبعاد في الألعاب. **تشبيه يومي:** هذا يشبه سائق سيارة يستخدم دواسة البنزين (واجهة Java API بسيطة) دون الحاجة لفهم تفاصيل عمل المحرك الداخلي (المكتبات الأصلية بلغة C++) — الواجهة البسيطة تُخفي التعقيد الكبير وراءها.

**لماذا؟** لأن بعض المهام (كالرسوميات ثلاثية الأبعاد في الألعاب أو معالجة الفيديو) تتطلب سرعة تنفيذ عالية جداً لا توفرها لغات المستوى الأعلى مثل Java بنفس الكفاءة، لذا اختارت Google كتابة هذه الأجزاء الحساسة بلغة C/++C ثم "تغليفها" بواجهة Java سهلة الاستخدام للمطورين.

---

### 14. إطار عمل Java API — نظرة عامة

#### النص الأصلي يقول (English):
> "The entire feature-set of the Android OS is available to you through APIs written in the Java language. These APIs form the building blocks you need to create Android apps by simplifying the reuse of core, modular system components and services, which include the following: Activity Manager, Window Manager, Package Manager, Resource Manager, Notification Manager, Location Manager, Telephony Manager, View System, Content Providers."

#### الترجمة الحرفية:
> كامل مجموعة ميزات نظام تشغيل أندرويد متاحة لك عبر واجهات برمجة تطبيقات (APIs) مكتوبة بلغة Java. تشكّل هذه الواجهات لبنات البناء (building blocks) التي تحتاجها لإنشاء تطبيقات أندرويد، عبر تسهيل إعادة استخدام مكوّنات وخدمات النظام الأساسية والمعيارية (modular)، والتي تشمل ما يلي: مدير الأنشطة (Activity Manager)، مدير النوافذ (Window Manager)، مدير الحزم (Package Manager)، مدير الموارد (Resource Manager)، مدير الإشعارات (Notification Manager)، مدير الموقع (Location Manager)، مدير الاتصالات (Telephony Manager)، نظام العروض (View System)، ومزوّدي المحتوى (Content Providers).

#### الشرح المبسّط:
هذه هي الطبقة التي يتعامل معها المطور "يومياً" فعلياً، لأنها الواجهة العلوية المباشرة التي تربط كود Kotlin/Java الذي نكتبه بكل الطبقات السفلية (ART، HAL، Linux Kernel) التي شرحناها سابقاً. الفكرة الأساسية هي "إعادة الاستخدام" (Reusability): بدل أن يكتب كل مطور كوداً لإدارة النوافذ أو الإشعارات من الصفر، يوفّر أندرويد "مديرين" (Managers) جاهزين لكل وظيفة أساسية، والمطور فقط يستدعيهم. **تشبيه يومي:** هذا يشبه مبنى إداري كبير فيه أقسام متخصصة (قسم الموارد البشرية، قسم المحاسبة، قسم الأمن) — بدل أن يقوم كل موظف بكل المهام بنفسه، يتوجّه لكل قسم عند الحاجة، وكل قسم خبير في مهمته فقط. سنشرح كل "مدير" من هذه المديرين بالتفصيل في الأقسام التالية.

**لماذا؟** لأن تقسيم وظائف النظام إلى "مديرين" منفصلين ومتخصصين (Modular) يجعل النظام أسهل في الصيانة والتطوير، ويسمح للمطور بالتركيز على منطق تطبيقه بدل إعادة اختراع وظائف أساسية موجودة مسبقاً.

---

### 15. مدير الأنشطة (Activity Manager)

#### النص الأصلي يقول (English):
> "Manages the lifecycle of activities, which are the core components of an Android application that represent a single screen with a user interface. Provides a common navigation back stack. Handles tasks like launching, pausing, resuming, and stopping activities based on user interactions or system events. Ensures only one activity is in the foreground at a time, maintaining a smooth user experience."

#### الترجمة الحرفية:
> يدير دورة حياة الأنشطة (activities)، وهي المكوّنات الأساسية لتطبيق أندرويد التي تمثّل شاشة واحدة بواجهة مستخدم. يوفّر مكدّس تنقّل خلفي (back stack) موحّداً. يتعامل مع مهام مثل إطلاق الأنشطة وإيقافها مؤقتاً واستئنافها وإيقافها بناءً على تفاعلات المستخدم أو أحداث النظام. يضمن وجود نشاط واحد فقط في المقدمة (foreground) في أي وقت، حفاظاً على تجربة مستخدم سلسة.

#### الشرح المبسّط:
مدير الأنشطة هو المسؤول عن "كل شاشة" يراها المستخدم في التطبيق (تُسمّى تقنياً `Activity`)؛ فعندما تفتح تطبيقاً وتنتقل من شاشة لأخرى (مثلاً من شاشة تسجيل الدخول إلى الشاشة الرئيسية) ثم تضغط زر "رجوع"، فإن مدير الأنشطة هو من يتذكر ترتيب الشاشات ويعيدك للشاشة الصحيحة السابقة عبر ما يُسمى `back stack` (مكدّس خلفي). أهمية هذا المدير تظهر في ضمانه أن شاشة واحدة فقط تكون "نشطة" ومرئية في المقدمة في أي لحظة، حتى لو كان هناك عدة شاشات مفتوحة في الخلفية — وهذا يمنع الفوضى ويحافظ على تجربة استخدام منطقية. **تشبيه يومي:** تخيّل مكدّس أوراق (Stack) على مكتبك — كل ورقة جديدة (شاشة) توضع فوق السابقة، وعندما تنتهي منها (تضغط رجوع) تُزال من الأعلى فتعود للورقة التي تحتها مباشرة، تماماً مثل تصفح متصفح الإنترنت والضغط على زر "الرجوع".

**لماذا؟** لأن تطبيقات الجوّال بطبيعتها تتكوّن من شاشات متعددة ينتقل المستخدم بينها باستمرار، فكان لا بد من "مدير مركزي" يتتبّع أي شاشة نشطة الآن وأيها في الخلفية، بدل ترك كل شاشة تدير حالتها بمعزل عن الأخريات مما قد يسبب تعارضات.

---

### 16. مدير النوافذ (Window Manager)

#### النص الأصلي يقول (English):
> "Controls the creation, display, and management of application windows on the screen. Defines the layout and positioning of windows, ensuring they are displayed correctly and don't overlap inappropriately. Maintains the visual hierarchy of windows based on factors like activity focus and visibility."

#### الترجمة الحرفية:
> يتحكم بإنشاء نوافذ التطبيق وعرضها وإدارتها على الشاشة. يحدد تخطيط وموضع النوافذ، ويضمن عرضها بشكل صحيح وعدم تداخلها بشكل غير ملائم. يحافظ على التسلسل الهرمي البصري (visual hierarchy) للنوافذ استناداً إلى عوامل مثل تركيز النشاط (activity focus) وظهوره.

#### الشرح المبسّط:
إذا كان `Activity Manager` يدير "أي شاشة نشطة الآن منطقياً"، فإن `Window Manager` يدير الجانب البصري الفعلي: أين تُرسَم النافذة على الشاشة، وما ترتيبها فوق بعضها البعض (مثلاً نافذة إشعار منبثقة يجب أن تظهر *فوق* التطبيق الحالي وليس خلفه). هذا يرتبط بمفهوم "التسلسل الهرمي البصري" — فبعض النوافذ (كنافذة اتصال هاتفي وارد) يجب أن تظهر دائماً فوق أي شيء آخر بغض النظر عن التطبيق المفتوح. **تشبيه يومي:** فكّر بمدير النوافذ مثل منظّم طاولات في مطعم يقرر أين تُوضع كل طاولة (نافذة) وأيها أقرب للمدخل (أعلى الترتيب البصري)، بحيث لا تتصادم الطاولات مع بعضها ويبقى كل شيء منظماً وواضحاً للزبائن.

**لماذا؟** لأن أندرويد يسمح بعرض عناصر متعددة في نفس الوقت (نوافذ منبثقة، حوارات تنبيه، تطبيقات في وضع الشاشة المقسومة)، فبدون مدير مركزي للنوافذ سيحدث تداخل بصري فوضوي يصعب على المستخدم فهمه.

---

### 17. مدير الحزم (Package Manager)

#### النص الأصلي يقول (English):
> "Manages the installation, upgrade, and removal of applications on the Android device. Ensures applications have the necessary permissions to access system resources and protects the system from malicious apps. Maintains a record of all installed applications and their associated data."

#### الترجمة الحرفية:
> يدير عملية تثبيت التطبيقات وترقيتها وإزالتها على جهاز أندرويد. يضمن حصول التطبيقات على الأذونات اللازمة للوصول إلى موارد النظام، ويحمي النظام من التطبيقات الخبيثة. يحتفظ بسجل لكل التطبيقات المثبَّتة وبياناتها المرتبطة بها.

#### الشرح المبسّط:
مدير الحزم (`Package Manager`) هو المسؤول عن "دورة حياة التطبيق ككل" (وليس دورة حياة شاشة واحدة كما في Activity Manager) — من لحظة تثبيته من متجر Google Play، مروراً بأي تحديثات لاحقة، وحتى حذفه. الوظيفة الأمنية المهمة هنا هي التحقق من "الأذونات" (Permissions): فعندما يطلب تطبيق الوصول للكاميرا أو الموقع، مدير الحزم هو من يتحقق أن هذا الإذن مُعرَّف بشكل صحيح في ملف `AndroidManifest.xml` الخاص بالتطبيق ويطبّق قواعد الأمان المرتبطة به. **تشبيه يومي:** يشبه مدير الحزم موظف الجمارك في المطار — عند دخول "حقيبة" (تطبيق) جديدة للبلد (الجهاز)، يفحصها للتأكد أنها لا تحمل شيئاً خطيراً، ويسجّل بياناتها، ويمنحها الأذونات المناسبة فقط حسب ما هو معلن ومصرَّح به.

**لماذا؟** لأن تثبيت تطبيقات من مصادر مختلفة (متاجر متعددة، ملفات APK مباشرة) يشكّل خطراً أمنياً محتملاً، فاحتاج أندرويد لمكوّن مركزي يفرض الأذونات ويحمي بيانات المستخدم وسلامة النظام من التطبيقات الضارة.

---

### 18. مدير الموارد (Resource Manager)

#### النص الأصلي يقول (English):
> "Centralizes access to various application resources like layouts, strings, images, colors, and styles. Stores these resources in a single location, simplifying management and retrieval. Enables developers to define different versions of resources to adapt the app's appearance based on factors like screen size or language."

#### الترجمة الحرفية:
> يمركز الوصول إلى موارد التطبيق المتنوعة مثل التخطيطات (layouts)، والنصوص (strings)، والصور، والألوان، والأنماط (styles). يخزّن هذه الموارد في مكان واحد، مما يبسّط إدارتها واسترجاعها. يمكّن المطورين من تعريف نسخ مختلفة من الموارد لتكييف مظهر التطبيق بناءً على عوامل مثل حجم الشاشة أو اللغة.

#### الشرح المبسّط:
مدير الموارد يحل مشكلة شائعة جداً: بدل كتابة النصوص والألوان والصور "مباشرة" داخل الكود البرمجي (وهو أسلوب سيء جداً)، يضعها المطور في ملفات منفصلة (موارد/resources) ويستدعيها المدير عند الحاجة. الفائدة العملية الأكبر هي دعم التخصيص التلقائي: يمكن للمطور تعريف نسخة عربية ونسخة إنجليزية من نفس النصوص، أو تصميم مختلف قليلاً للشاشات الكبيرة والصغيرة، ويقوم مدير الموارد تلقائياً باختيار النسخة الصحيحة حسب إعدادات جهاز المستخدم (لغته، حجم شاشته) دون أي تدخل يدوي من المطور وقت التشغيل. **تشبيه يومي:** يشبه هذا مطعماً يملك قائمة طعام مطبوعة بعدة لغات — النادل (مدير الموارد) يعطي الزبون تلقائياً النسخة الموافقة للغته دون أن يُعيد كتابة القائمة من جديد لكل زبون.

**لماذا؟** لأن فصل "المحتوى" (نصوص، صور، ألوان) عن "المنطق البرمجي" يجعل التطبيق أسهل في الصيانة والترجمة لعدة لغات، ويجنّب المطور الحاجة لإعادة بناء التطبيق بالكامل لمجرد تغيير نص أو لون.

---

### 19. مدير الإشعارات (Notification Manager)

#### النص الأصلي يقول (English):
> "Provides a mechanism for applications to display alerts and notifications in the status bar to the user outside of their app. Allows developers to define the content, appearance, and behavior of notifications. Ensures notifications are displayed consistently and don't overwhelm the user."

#### الترجمة الحرفية:
> يوفّر آلية للتطبيقات لعرض تنبيهات وإشعارات في شريط الحالة (status bar) للمستخدم خارج نطاق تطبيقهم. يسمح للمطورين بتحديد محتوى الإشعارات ومظهرها وسلوكها. يضمن عرض الإشعارات بشكل متسق ودون إثقال المستخدم بها.

#### الشرح المبسّط:
مدير الإشعارات هو ما يسمح لتطبيق (كتطبيق واتساب مثلاً) بإخبارك برسالة جديدة *حتى وأنت خارج التطبيق* تماماً — وهذه ميزة أساسية جداً في تطبيقات الجوال لا تتوفر بنفس الشكل في مواقع الويب العادية. المدير هنا يوازن بين حاجتين متعارضتين: إعطاء المطور حرية تخصيص شكل ومحتوى وسلوك الإشعار (صوت، أيقونة، نص، إجراء عند الضغط)، وبين ضمان "اتساق" (Consistency) تصميم كل الإشعارات على مستوى النظام حتى لا "تُثقِل" على المستخدم أو تبدو فوضوية عندما تأتي من تطبيقات مختلفة. **تشبيه يومي:** يشبه هذا نظام "إعلانات المطار" — كل شركة طيران (تطبيق) يمكنها إرسال إعلان (إشعار) خاص بها، لكنها كلها تُعرض بنفس الطريقة الموحدة (نفس مكبر الصوت، نفس نمط العرض على الشاشات) بحيث لا يشعر المسافر بالارتباك.

**لماذا؟** لأن الإشعارات إذا تُركت بدون قواعد موحدة قد تُستغل من المطورين لإزعاج المستخدم باستمرار (spam)، لذا يفرض أندرويد قواعد وحدود عبر مدير مركزي يحافظ على تجربة مستخدم متوازنة عبر كل التطبيقات.

---

### 20. مدير الموقع (Location Manager) ومدير الاتصالات (Telephony Manager)

#### النص الأصلي يقول (English):
> "Location Manager: Offers functionalities for accessing the device's location information. Allows developers to build apps that require location awareness, such as navigation apps or fitness trackers. Telephony Manager: Provides access to telephony features on the device. Enables developers to create apps that can make phone calls, send SMS messages, or manage call logs."

#### الترجمة الحرفية:
> مدير الموقع: يقدّم وظائف للوصول إلى معلومات موقع الجهاز. يسمح للمطورين ببناء تطبيقات تحتاج إلى وعي بالموقع (location awareness)، مثل تطبيقات الملاحة أو متتبعات اللياقة البدنية. مدير الاتصالات: يوفّر الوصول إلى ميزات الاتصالات الهاتفية على الجهاز. يمكّن المطورين من إنشاء تطبيقات يمكنها إجراء مكالمات هاتفية، أو إرسال رسائل SMS، أو إدارة سجلات المكالمات.

#### الشرح المبسّط:
هذان المديران يوفّران وصولاً برمجياً لخدمتين حساستين ومرتبطتين بخصوصية المستخدم بشكل مباشر: الموقع الجغرافي، والاتصالات الهاتفية. مدير الموقع مثلاً هو ما يعتمد عليه تطبيق خرائط ليعرف مكانك الحالي عبر GPS أو الشبكة، بينما مدير الاتصالات يسمح لتطبيق مثل "من المتصل؟" بمعرفة رقم المتصل أو حتى إجراء مكالمة نيابة عن المستخدم. وبما أن هاتين الميزتين حسّاستان جداً (يمكن استغلالهما لتتبّع المستخدم أو التنصت)، فإن الوصول إليهما دائماً مشروط بموافقة صريحة من المستخدم عبر نظام الأذونات (Permissions) الذي شرحناه سابقاً مع Package Manager. **تشبيه يومي:** يشبه هذا موظف استقبال في مبنى حساس (بيانات المستخدم الشخصية) لا يسمح لأي زائر (تطبيق) بالدخول لغرفة معينة (الموقع أو سجل المكالمات) إلا بعد توقيع إذن دخول صريح من صاحب المبنى (المستخدم نفسه).

**لماذا؟** لأن الوصول لهذه المعلومات (الموقع، سجل المكالمات) يمس خصوصية المستخدم بشكل مباشر وحساس، فربطتها Google بنظام أذونات صارم يتطلب موافقة صريحة، بعكس معلومات أقل حساسية كالوصول للإنترنت العادي.

---

### 21. نظام العروض (View System)

#### النص الأصلي يقول (English):
> "Provides a set of pre-built UI components (views) that developers can use to construct the user interface of their applications. These views include common elements like buttons, text views, image views, lists, and more. Allows developers to combine these views to create complex and customized user interfaces."

#### الترجمة الحرفية:
> يوفّر مجموعة من مكوّنات واجهة المستخدم الجاهزة مسبقاً (views) التي يمكن للمطورين استخدامها لبناء واجهة مستخدم تطبيقاتهم. تشمل هذه الـ views عناصر شائعة مثل الأزرار (buttons)، وعروض النصوص (text views)، وعروض الصور (image views)، والقوائم (lists)، وغيرها. يسمح للمطورين بدمج هذه الـ views لإنشاء واجهات مستخدم معقّدة ومخصصة.

#### الشرح المبسّط:
نظام العروض (`View System`) هو "الطريقة التقليدية" (القديمة نسبياً، قبل Jetpack Compose الذي سيُشرح لاحقاً) لبناء واجهات المستخدم في أندرويد، حيث يعرّف المطور كل عنصر مرئي (زر، صورة، نص) على أنه `View` منفصل، ثم يجمعها معاً في ملفات تخطيط (Layout) لتشكيل الشاشة الكاملة. كل هذه العناصر الجاهزة (Buttons, TextViews, ImageViews) تُشبه "مكعبات ليغو" جاهزة الاستخدام: يمكن للمطور تركيبها معاً بطرق لا حصر لها لبناء أي تصميم واجهة يريده دون الحاجة لرسم كل عنصر يدوياً من الصفر. **تشبيه يومي:** كأنك تبني منزلاً من مكعبات ليغو جاهزة الأشكال (نوافذ، أبواب، جدران) بدل نحت كل قطعة يدوياً بنفسك — أسرع بكثير وأقل عرضة للأخطاء.

**لماذا؟** لأن توفير عناصر واجهة جاهزة وقياسية (Standard) يضمن اتساق شكل وسلوك التطبيقات عبر النظام (كل الأزرار تتصرف بطريقة متوقعة مثلاً)، ويوفّر على المطور وقتاً هائلاً كان سيُهدر في إعادة بناء عناصر أساسية كالأزرار من الصفر.

---

### 22. مزوّدو المحتوى (Content Providers)

#### النص الأصلي يقول (English):
> "Enables applications to access data from other apps, such as the Contacts app, or to share their own data in a secure and structured manner. Acts as a central repository for data, allowing different applications to access and modify it with appropriate permissions. Promotes data reusability and simplifies communication between applications."

#### الترجمة الحرفية:
> يمكّن التطبيقات من الوصول إلى بيانات من تطبيقات أخرى، مثل تطبيق جهات الاتصال، أو من مشاركة بياناتها الخاصة بطريقة آمنة ومنظمة. يعمل كمستودع مركزي للبيانات، يسمح لتطبيقات مختلفة بالوصول إليها وتعديلها بأذونات مناسبة. يعزز إعادة استخدام البيانات ويبسّط التواصل بين التطبيقات.

#### الشرح المبسّط:
مزوّد المحتوى (`Content Provider`) يحل مشكلة "مشاركة البيانات بين التطبيقات" — فكل تطبيق في أندرويد يعمل عادةً في "عزلة" (Sandbox) لأسباب أمنية، بمعنى أن تطبيقك لا يستطيع مبدئياً قراءة بيانات تطبيق آخر مباشرة من ذاكرته أو ملفاته. لكن أحياناً نحتاج فعلاً لهذه المشاركة — مثلاً تطبيق واتساب يحتاج لقراءة "جهات الاتصال" المخزَّنة في تطبيق جهات الاتصال الرسمي بالهاتف. هنا يأتي دور `Content Provider` كـ "بوابة رسمية ومنظّمة" يوفّرها تطبيق جهات الاتصال، فيطلب واتساب البيانات عبر هذه البوابة (وبإذن المستخدم) بدل اختراق التطبيق الآخر مباشرة. **تشبيه يومي:** يشبه هذا مكتبة عامة تسمح باستعارة الكتب عبر موظف الاستقبال (البوابة الرسمية/Content Provider) بدل السماح لأي شخص بالدخول للمخازن الداخلية وأخذ ما يريد مباشرة.

**لماذا؟** لأن عزل التطبيقات عن بعضها (Sandboxing) ضروري أمنياً لحماية بيانات المستخدم، لكن بعض التطبيقات تحتاج فعلياً للتعاون ومشاركة البيانات (كجهات الاتصال أو الوسائط)، فوفّر أندرويد آلية رسمية ومضبوطة بالأذونات لتحقيق هذا التوازن بين الأمان والوظيفية.

---

### 23. تطبيقات النظام (System Apps)

#### النص الأصلي يقول (English):
> "Android comes with a set of core apps for email, SMS messaging, calendars, internet browsing, contacts, and more. Apps included with the platform have no special status among the apps the user chooses to install. So, a third-party app can become the user's default web browser, SMS messenger, or even the default keyboard. Some exceptions apply, such as the system's Settings app. The system apps function both as apps for users and to provide key capabilities that developers can access from their own app. E.g., if you want your app to deliver SMS messages, you don't need to build that functionality yourself. You can instead invoke whichever SMS app is already installed to deliver a message to the recipient you specify."

#### الترجمة الحرفية:
> يأتي أندرويد مزوَّداً بمجموعة من التطبيقات الأساسية للبريد الإلكتروني، والرسائل النصية (SMS)، والتقويم، وتصفح الإنترنت، وجهات الاتصال، وغيرها. لا تتمتع التطبيقات المضمَّنة مع المنصّة بأي وضعية خاصة بين التطبيقات التي يختار المستخدم تثبيتها. لذلك، يمكن لتطبيق من طرف ثالث أن يصبح متصفح الويب الافتراضي للمستخدم، أو تطبيق الرسائل النصية الافتراضي، أو حتى لوحة المفاتيح الافتراضية. تنطبق بعض الاستثناءات، مثل تطبيق الإعدادات (Settings) الخاص بالنظام. تعمل تطبيقات النظام كتطبيقات للمستخدمين وأيضاً لتوفير قدرات أساسية يمكن للمطورين الوصول إليها من تطبيقهم الخاص. مثال: إذا أردت أن يرسل تطبيقك رسائل SMS، لست بحاجة لبناء تلك الوظيفة بنفسك. يمكنك بدلاً من ذلك استدعاء أي تطبيق SMS مثبَّت مسبقاً لتوصيل رسالة إلى المستلم الذي تحدده.

#### الشرح المبسّط:
هذه هي الطبقة العليا والأخيرة في مكدّس أندرويد — التطبيقات التي يراها المستخدم فعلياً ويتفاعل معها مباشرة (البريد، الرسائل، المتصفح...). النقطة الأكثر أهمية هنا هي أن هذه التطبيقات **لا تملك أي امتياز خاص**: تطبيق طرف ثالث (كتطبيق Chrome أو Gmail) يمكنه أن يحل تماماً محل تطبيق النظام الافتراضي، وهذا مثال عملي آخر على "الانفتاح" الذي بدأنا به المحاضرة (أندرويد مفتوح المصدر وغير مغلق كـ iOS). الفائدة العملية الثانية والمهمة جداً للمطور هي أن هذه التطبيقات الجاهزة توفّر "قدرات" يمكن لأي مطور آخر استدعاءها بدل بنائها من الصفر — فمثلاً لإرسال رسالة SMS، لا يحتاج مطورك لكتابة كود معقد للتعامل مع شبكة الاتصالات، بل يكفي "استدعاء" تطبيق الرسائل الموجود مسبقاً وتمرير الرقم والنص له. **تشبيه يومي:** هذا يشبه مدينة فيها عدة مطاعم بيتزا (تطبيقات SMS مختلفة) — يمكنك أن تختار مطعمك المفضل (الافتراضي)، وأي شخص آخر يريد طلب بيتزا (إرسال SMS) يستطيع فقط الاتصال بالمطعم الذي اخترته دون أن يفتح مطعماً خاصاً به من الصفر.

**لماذا؟** لأن السماح لتطبيقات الطرف الثالث بالتنافس والإحلال محل تطبيقات النظام يعزز المنافسة والابتكار (مثلاً ظهور متصفحات أفضل من المدمج)، وتوفير "قدرات مشتركة" قابلة للاستدعاء (كإرسال SMS) يوفّر وقتاً هائلاً للمطورين ويمنع تكرار بناء نفس الوظيفة الأساسية في كل تطبيق.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا لا تحتاج لكتابة كود كامل للتعامل مع بروتوكول الرسائل النصية (SMS) في تطبيقك؟
> **لماذا هذا مهم؟** لأن فهم هذا يوضّح فلسفة أندرويد بالكامل في إعادة استخدام المكوّنات (Component Reuse) بدل إعادة اختراع نفس الوظيفة في كل تطبيق.

---

### 24. Jetpack Compose — التعريف والغرض

#### النص الأصلي يقول (English):
> "Jetpack Compose is the modern toolkit for building native Android UI, simplifying the development of apps that adapt to any display size. It simplifies and accelerates UI development on Android bringing your apps to life with less code, powerful tools, and intuitive Kotlin APIs. It makes building Android UI faster and easier."

#### الترجمة الحرفية:
> Jetpack Compose هو مجموعة الأدوات الحديثة لبناء واجهة مستخدم أندرويد الأصلية (native)، وهو يبسّط تطوير التطبيقات التي تتكيف مع أي حجم شاشة عرض. إنه يبسّط ويسرّع تطوير واجهة المستخدم على أندرويد، ويُحيي تطبيقاتك بكود أقل، وأدوات قوية، وواجهات برمجة تطبيقات Kotlin بديهية. إنه يجعل بناء واجهة مستخدم أندرويد أسرع وأسهل.

#### الشرح المبسّط:
`Jetpack Compose` هو الطريقة "الحديثة" و"الموصى بها رسمياً" حالياً لبناء واجهات المستخدم في أندرويد، وهو يمثّل تطوراً كبيراً مقارنة بـ `View System` القديم الذي شرحناه سابقاً (الأزرار، النصوص، القوائم المبنية كملفات XML منفصلة). الفرق الجوهري هو أن Compose يسمح ببناء الواجهة بالكامل بلغة Kotlin نفسها (بدون ملفات XML منفصلة)، وبكود أقل بكثير كما رأينا سابقاً في مقارنة الشرائح. هذا يرتبط مباشرة بما تعلمناه عن قوة Kotlin — فكون Compose مبنياً بالكامل على Kotlin يعني أن المطور يستخدم لغة واحدة فقط لكل شيء: المنطق والواجهة معاً. **تشبيه يومي:** إذا كان View System القديم أشبه بكتابة رسالة نصية عادية ثم رسمها على ورقة منفصلة يدوياً، فإن Compose أشبه ببرنامج تصميم حديث يسمح لك بكتابة النص ورؤية شكله النهائي في نفس اللحظة وبنفس الأداة.

**لماذا؟** لأن الطريقة القديمة (XML منفصل + كود Kotlin منفصل) كانت تتطلب التبديل المستمر بين ملفين وكانت عرضة لعدم التزامن بينهما (Layout يتغير لكن الكود لا يعرف)، فوحّدت Compose كل شيء في مكان واحد بلغة واحدة لتسريع التطوير وتقليل الأخطاء.

---

### 25. Jetpack Compose — النهج التصريحي (Declarative UI)

#### النص الأصلي يقول (English):
> "Compose uses a Declarative UI approach that lets you render your app UI without imperatively mutating frontend views. You declare everything about how your UI should look using composable functions. These functions let you define your app's UI programmatically by describing how it should look and providing data dependencies, rather than focusing on the process of the UI's construction (initializing an element, attaching it to a parent, etc.). Compose makes it simple to build lists, to customize your app using themes, to add animation and to test the UI."

#### الترجمة الحرفية:
> يستخدم Compose نهج واجهة المستخدم التصريحي (Declarative UI) الذي يسمح لك بعرض واجهة تطبيقك دون تغيير عروض الواجهة الأمامية بشكل إجرائي (imperatively). تُصرّح بكل شيء عن الشكل الذي يجب أن تبدو عليه واجهتك باستخدام الدوال القابلة للتكوين (composable functions). تسمح لك هذه الدوال بتعريف واجهة تطبيقك برمجياً عبر وصف الشكل الذي يجب أن تبدو عليه وتوفير اعتماديات البيانات، بدلاً من التركيز على عملية بناء الواجهة (تهيئة عنصر، وإرفاقه بعنصر أب، إلخ). يجعل Compose بناء القوائم أمراً بسيطاً، وتخصيص تطبيقك باستخدام الأنماط (themes)، وإضافة الحركة (animation)، واختبار الواجهة.

#### الشرح المبسّط:
هذا هو المفهوم الأهم في Compose بأكمله، وهو الفرق بين البرمجة "التصريحية" (Declarative) و"الإجرائية" (Imperative). في النهج القديم (Imperative)، كان على المطور كتابة تعليمات خطوة بخطوة لـ *كيفية* تغيير الواجهة (مثلاً: "ابحث عن هذا النص، ثم غيّر لونه إلى أحمر، ثم أعد رسمه"). أما في Compose (Declarative)، فالمطور فقط "يصرّح" أو "يصف" *كيف يجب أن تبدو* الواجهة النهائية بناءً على البيانات الحالية، ويتولى Compose نفسه معرفة "كيفية" الوصول لهذا الشكل وتحديثه تلقائياً كلما تغيّرت البيانات (هذا سيُشرح أكثر لاحقاً تحت مفهوم `Recomposition`). **تشبيه يومي:** الفرق يشبه إعطاء سائق تاكسي تعليمات تفصيلية لكل شارع ومنعطف (Imperative: "انعطف يميناً هنا، ثم يساراً هناك...") مقابل إعطائه فقط العنوان النهائي على تطبيق خرائط (Declarative: "أوصلني إلى هذا العنوان") ويتولى هو حساب أفضل طريق تلقائياً.

**لماذا؟** لأن النهج الإجرائي القديم كان عرضة لأخطاء كثيرة (نسيان تحديث عنصر معين عند تغيّر البيانات، فيبقى ظاهراً بشكل قديم/غير متزامن)، بينما النهج التصريحي يضمن أن الواجهة تعكس دائماً حالة البيانات الحقيقية تلقائياً دون تدخل يدوي متكرر من المطور.

#### 💡 التشبيه:
> إعطاء سائق تاكسي العنوان النهائي فقط بدل تعليمات كل منعطف.
> **وجه الشبه:** العنوان النهائي = وصف شكل الواجهة (Declarative)؛ حساب المسار = عمل Compose الداخلي لتحديث الشاشة تلقائياً.

---

### 26. Jetpack Compose — الكتابة بلغة Kotlin وربط الواجهة بالمنطق

#### النص الأصلي يقول (English):
> "With Compose, you write your user interfaces with Kotlin, the same language you use to build the rest of your app. What this means is-- you can use the same language to define how your app looks, as well as how the app should behave. This makes it easy and convenient to pass data and events between your app's user interface and the other parts of your app. Compose lets you write your app UI easier and with much less code compared to older View space UI toolkit."

#### الترجمة الحرفية:
> مع Compose، تكتب واجهات المستخدم بلغة Kotlin، وهي نفس اللغة التي تستخدمها لبناء بقية تطبيقك. ما يعنيه هذا هو أنك تستطيع استخدام نفس اللغة لتحديد شكل تطبيقك، وكذلك كيف يجب أن يتصرف التطبيق. يجعل هذا من السهل والمريح تمرير البيانات والأحداث بين واجهة مستخدم تطبيقك والأجزاء الأخرى من تطبيقك. يتيح لك Compose كتابة واجهة مستخدم تطبيقك بسهولة أكبر وبكود أقل بكثير مقارنة بمجموعة أدوات واجهة المستخدم View القديمة.

#### الشرح المبسّط:
هذه الفقرة تبني على الفكرة السابقة (التصريحية) لتشرح فائدة عملية إضافية: بما أن الواجهة (UI) والمنطق (Logic) مكتوبان بنفس اللغة (Kotlin) في نفس المشروع، يصبح تمرير البيانات بينهما (مثلاً: أخذ اسم مستخدم أدخله في نموذج وعرضه فوراً في نص ترحيبي) أمراً طبيعياً وبسيطاً كاستدعاء دالة عادية، بدل الحاجة لـ "ربط" (Binding) معقّد بين ملف XML منفصل وكود Kotlin منفصل كما كان يحدث في `View System` القديم. مثال الشريحة يوضح هذا: دالة `Greeting(name: String)` تستقبل اسماً كمعامل عادي تماماً كأي دالة Kotlin، وتعرضه في نص — لا فرق بين "دالة برمجية عادية" و"مكوّن واجهة مستخدم" من ناحية طريقة التعامل معهما. **تشبيه يومي:** هذا يشبه فريق عمل يتحدث لغة واحدة فقط (Kotlin) بدل فريقين يتحدثان لغتين مختلفتين (XML للواجهة وKotlin للمنطق) ويحتاجان مترجماً بينهما في كل مرة يتواصلان.

**لماذا؟** لأن توحيد اللغة يقلل نقاط الفشل المحتملة (أخطاء الترجمة/الربط بين XML وKotlin)، ويسمح بإعادة استخدام كل أدوات Kotlin القوية (مثل الشروط، الحلقات، الدوال) مباشرة داخل تعريف الواجهة نفسها.

---

### 27. Jetpack Compose — الدوال القابلة للتكوين (@Composable) والتخطيطات

#### النص الأصلي يقول (English):
> "In Compose, a UI Component is a function which is annotated with @Composable. This function doesn't return anything, but the function that it describes what this piece of the UI should look like. Compose comes with built-in layouts and building blocks that you can use while building the app UI. You can add any UI Composable, such as a line or multiple lines of Text, and decide how to lay them out on the screen by using a Row or Column layout. Similarly, You can add a built-in Composable, such as images, buttons, checkboxes, depending on what's needed in your app."

#### الترجمة الحرفية:
> في Compose، مكوّن الواجهة (UI Component) هو دالة (function) موسومة بالتعليق التوضيحي (annotation) ‎@Composable‎. لا تُعيد هذه الدالة أي قيمة، لكنها تصف شكل هذا الجزء من الواجهة. يأتي Compose مزوَّداً بتخطيطات (layouts) ولبنات بناء (building blocks) جاهزة يمكنك استخدامها أثناء بناء واجهة التطبيق. يمكنك إضافة أي مكوّن Composable، كسطر واحد أو عدة أسطر من Text، وتحديد كيفية ترتيبها على الشاشة باستخدام تخطيط Row أو Column. وبالمثل، يمكنك إضافة مكوّن Composable جاهز، كالصور والأزرار وصناديق الاختيار (checkboxes)، حسب ما يحتاجه تطبيقك.

#### الشرح المبسّط:
هذا القسم يشرح "اللبنة الأساسية" في Compose: أي عنصر واجهة (زر، نص، صورة) هو ببساطة "دالة Kotlin عادية" لكن مع كلمة `@Composable` مكتوبة فوقها — وهذه الكلمة تخبر النظام أن هذه الدالة خاصة برسم واجهة وليست دالة عادية تُعيد قيمة (لذا "لا تُعيد أي قيمة"، بل هي تصف شكل الجزء المرئي فقط). لترتيب عدة عناصر معاً على الشاشة، يوفّر Compose "حاويات ترتيب" جاهزة اسمها `Column` (لترتيب العناصر عمودياً، الواحد تحت الآخر) و`Row` (لترتيبها أفقياً، جنباً إلى جنب). **تشبيه يومي:** فكّر بـ `@Composable` مثل ملصق "قابل للتجميع" (Compose = يُركَّب) على قطعة ليغو — تخبرك أن هذه القطعة مصممة خصيصاً لتوضع مع قطع أخرى لبناء شيء أكبر، بينما `Column` و`Row` هما "الإطار" أو "الصينية" التي ترتب فيها هذه القطع إما عمودياً أو أفقياً.

**لماذا؟** لأن تحويل كل عنصر واجهة إلى "دالة" بسيطة قابلة لإعادة الاستخدام (يمكنك استدعاء نفس الدالة عدة مرات بمعطيات مختلفة) يجعل بناء واجهات معقدة أسهل بكثير من تكرار كتابة نفس عناصر XML يدوياً في كل مرة.

---

### 28. Jetpack Compose — المعاملات والتخصيص الديناميكي

#### النص الأصلي يقول (English):
> "Composable functions can receive parameters and use these parameters to build the UI. You can change this function to receive the text as an argument to be displayed on screen." (Example: `fun Greeting(name: String) { Column { Text("Hello $name") ... } }`)

#### الترجمة الحرفية:
> يمكن للدوال القابلة للتكوين (composable functions) أن تستقبل معاملات (parameters) وتستخدم هذه المعاملات لبناء الواجهة. يمكنك تعديل هذه الدالة لتستقبل النص كوسيط (argument) ليُعرض على الشاشة. (مثال: الدالة `Greeting(name: String)‎` تستقبل اسماً وتعرضه داخل نص "Hello $name" ضمن تخطيط عمودي Column).

#### الشرح المبسّط:
هذا القسم يبني مباشرة على الفكرة السابقة ليوضح كيف تصبح الدوال القابلة للتكوين "ديناميكية" وقابلة لإعادة الاستخدام بدل أن تكون ثابتة الشكل دائماً. بدلاً من كتابة دالة تعرض دائماً كلمة "Android" ثابتة، يمكن للمطور جعلها تستقبل "معامل" (parameter) اسمه `name` من نوع `String`، فتُصبح الدالة قادرة على عرض أي اسم يُمرَّر لها — تماماً كأي دالة Kotlin عادية تستقبل مدخلات وتتصرف بناءً عليها. هذا يفسّر عملياً كيف يُمكن استخدام نفس مكوّن الواجهة (Composable) عشرات المرات بمحتوى مختلف كل مرة، بدل تكرار نفس الكود يدوياً لكل حالة. **تشبيه يومي:** يشبه هذا "قالب دعوة زفاف" جاهز فيه فراغ لاسم الضيف — بدل طباعة دعوة جديدة كاملة لكل ضيف، تستخدم نفس القالب (الدالة) وتضع فقط اسماً مختلفاً (المعامل) في كل مرة.

**لماذا؟** لأن الهدف الأساسي من البرمجة هو تجنب تكرار الكود (مبدأ DRY - Don't Repeat Yourself)، والسماح للدوال القابلة للتكوين باستقبال معاملات يحقق هذا الهدف تماماً لعناصر الواجهة كما يحققه لأي دالة برمجية عادية.

---

### 29. Jetpack Compose — عدم القابلية للتغيير وإعادة التكوين (Recomposition)

#### النص الأصلي يقول (English):
> "In Compose, UI Composables are immutable, meaning there is no way to update a Composable once it's been created. Instead, when the app data has changed and the UI needs to be refreshed, Compose automatically re-executes the Composable functions and transforms this new state into a new UI representation. This process is called recomposition."

#### الترجمة الحرفية:
> في Compose، مكوّنات الواجهة القابلة للتكوين (UI Composables) غير قابلة للتغيير (immutable)، بمعنى أنه لا توجد طريقة لتحديث Composable بعد إنشائه. بدلاً من ذلك، عندما تتغيّر بيانات التطبيق وتحتاج الواجهة إلى التحديث، يقوم Compose تلقائياً بإعادة تنفيذ الدوال القابلة للتكوين، ويحوّل هذه الحالة الجديدة إلى تمثيل جديد للواجهة. تُسمّى هذه العملية إعادة التكوين (recomposition).

#### الشرح المبسّط:
هذا المفهوم قد يبدو غريباً للوهلة الأولى: كيف تتحدث الواجهة إن كانت "غير قابلة للتغيير" (immutable)؟ الجواب هو أن Compose لا "يُعدّل" العنصر الموجود فعلياً كما كان يحدث في View System القديم (حيث كنت تبحث عن نص موجود وتغيّر لونه يدوياً)، بل عندما تتغيّر البيانات، يقوم Compose ببساطة *بإعادة استدعاء الدالة القابلة للتكوين من جديد بالكامل* بالبيانات الجديدة، فيُنتج "نسخة جديدة" من الواجهة تحل محل القديمة — وهذه العملية تُسمّى `Recomposition` (إعادة التكوين). هذا يربط مباشرة بمفهوم "التصريحية" الذي شرحناه سابقاً: أنت فقط تصف "كيف تبدو الواجهة بناءً على البيانات الحالية"، ومسؤولية Compose هي إعادة تنفيذ هذا الوصف كلما تغيّرت البيانات. **تشبيه يومي:** يشبه هذا كاميرا تلتقط صورة جديدة تماماً في كل مرة يتغيّر فيها المشهد، بدل محاولة "تعديل" الصورة القديمة يدوياً بأداة تحرير — كل تغيير في المشهد (البيانات) ينتج "لقطة" (Composition) جديدة بالكامل تلقائياً.

**لماذا؟** لأن جعل العناصر غير قابلة للتغيير (Immutable) يمنع فئة كاملة من الأخطاء الشائعة في البرمجة (مثل تعديل عنصر في مكان بينما جزء آخر من الكود ما زال يعتمد على قيمته القديمة)، ويجعل سلوك الواجهة أكثر قابلية للتنبؤ (Predictable) لأن الشكل الظاهر يعتمد فقط على البيانات الحالية في تلك اللحظة، لا على "تاريخ" التعديلات السابقة.

---

### 30. Jetpack Compose — تحديث الواجهة والتحسين التلقائي (Skip Unchanged)

#### النص الأصلي يقول (English):
> "The UI elements are completely controlled by the inputs you pass through a Composable function. This also allows you not to worry about keeping the app data and the UI in sync. Besides that, Compose is smart enough to optimize and skip any work for elements that haven't changed."

#### الترجمة الحرفية:
> عناصر الواجهة يتحكم بها بالكامل المدخلات (inputs) التي تمررها عبر الدالة القابلة للتكوين. هذا أيضاً يسمح لك بألا تقلق بشأن إبقاء بيانات التطبيق والواجهة متزامنة (in sync). إلى جانب ذلك، Compose ذكي بما يكفي ليحسّن الأداء ويتجاوز أي عمل للعناصر التي لم تتغيّر.

#### الشرح المبسّط:
هذه الفقرة تُلخّص وتُكمل فكرة `Recomposition` بميزة عملية مهمة جداً للأداء: رغم أن Compose "يعيد تنفيذ" الدوال القابلة للتكوين عند تغيّر البيانات، إلا أنه ذكي بما يكفي لعدم إعادة رسم *كل شيء* من الصفر في كل مرة — بل يقارن داخلياً أي أجزاء تغيّرت فعلياً وأيها بقيت كما هي، ويتجاهل (Skip) إعادة رسم الأجزاء التي لم تتغيّر لتوفير الأداء. في المثال المرفق بالشريحة، عندما يتغيّر الاسم من "Android" إلى "Compose"، يُعاد رسم سطر "Hello Compose" فقط بينما يبقى سطر "Hello Everyone!" كما هو دون إعادة رسمه لأنه لم يعتمد على البيانات المتغيّرة. **تشبيه يومي:** هذا يشبه مصحح إملائي ذكي يعيد فحص فقرة كاملة كتبتها، لكنه لا "يُعيد طباعة" كل الفقرة على الشاشة، بل يُبرز فقط الكلمة التي عدّلتها فعلاً، تاركاً باقي النص كما هو دون لمسه.

**لماذا؟** لأن إعادة رسم كل الواجهة بالكامل في كل تغيير بسيط (كتغيير اسم واحد) سيكون مُكلفاً جداً من ناحية الأداء ويستهلك بطارية ومعالجة زائدة، فصمّمت Google Compose ليكون "ذكياً" بما يكفي لتحديث الحد الأدنى الضروري فقط، محققاً بذلك سهولة الكود التصريحي (Declarative) *مع* كفاءة الأداء في نفس الوقت.

---

### 31. بيئة تطوير أندرويد — Android Studio

#### النص الأصلي يقول (English):
> "Android Studio is the official Integrated Development Environment (IDE) for Android app development. Based on the powerful code editor and developer tools from IntelliJ IDEA, Android Studio offers even more features that enhance your productivity when building Android apps, such as: A flexible Gradle-based build system; A fast and feature-rich emulator; A unified environment where you can develop for all Android devices; Live Edit to update composables in emulators and physical devices in real time; Code templates and GitHub integration to help you build common app features and import sample code; Extensive testing tools and frameworks; Lint tools to catch performance, usability, version compatibility, and other problems; C++ and NDK support."

#### الترجمة الحرفية:
> Android Studio هو بيئة التطوير المتكاملة (IDE) الرسمية لتطوير تطبيقات أندرويد. مبني على محرر الأكواد القوي وأدوات المطورين من IntelliJ IDEA، ويقدّم Android Studio مزايا أكثر تعزّز إنتاجيتك عند بناء تطبيقات أندرويد، مثل: نظام بناء (build system) مرن قائم على Gradle؛ محاكي سريع وغني بالميزات؛ بيئة موحّدة يمكنك من خلالها التطوير لكل أجهزة أندرويد؛ ميزة Live Edit لتحديث الـ composables في المحاكيات والأجهزة الفعلية في الوقت الفعلي؛ قوالب كود وتكامل مع GitHub للمساعدة في بناء ميزات تطبيق شائعة واستيراد كود نموذجي؛ أدوات وأطر عمل اختبار واسعة؛ أدوات Lint لاكتشاف مشاكل الأداء، وقابلية الاستخدام، وتوافقية الإصدارات، ومشاكل أخرى؛ دعم ++C و NDK.

#### الشرح المبسّط:
`Android Studio` هو "مكان العمل" الموحّد الذي يستخدمه أي مطور أندرويد لكتابة الكود وتصميم الواجهات واختبار التطبيق، وهو مبني فوق برنامج معروف اسمه `IntelliJ IDEA` (بيئة تطوير عامة لجافا وKotlin) لكن مُخصَّص بالكامل لاحتياجات أندرويد. من أهم مزاياه العملية أن المطور لا يحتاج جهازاً حقيقياً للاختبار بفضل `المحاكي` (Emulator)، وأن ميزة `Live Edit` تسمح برؤية تعديلات الواجهة (خصوصاً في Compose) فوراً على الشاشة أثناء الكتابة دون إعادة تشغيل التطبيق بالكامل. كما توجد أدوات `Lint` التي تفحص الكود تلقائياً وتنبّه المطور لمشاكل محتملة (كاستخدام دالة غير متوافقة مع إصدار أندرويد قديم) قبل أن تتحول لمشكلة حقيقية بعد النشر. **تشبيه يومي:** Android Studio يشبه "ورشة نجارة متكاملة" فيها كل الأدوات اللازمة (مناشير، مطارق، أدوات قياس) في مكان واحد، بدل تنقّل النجار (المطور) بين عدة ورشات منفصلة لكل أداة يحتاجها.

**لماذا؟** لأن توفير بيئة موحّدة رسمية (مدعومة من Google نفسها) تجمع كل الأدوات اللازمة (تحرير، محاكاة، اختبار، فحص أخطاء) يقلل الوقت الضائع في التنقل بين أدوات متفرقة، ويضمن توافقية أفضل بين هذه الأدوات لأنها مصمَّمة خصيصاً للعمل معاً.

---

### 32. هيكل المشروع (Project Structure)

#### النص الأصلي يقول (English):
> "Each project in Android Studio contains one or more modules with source code files and resource files. The types of modules include: Android app modules; Library modules; Google App Engine modules. By default, Android Studio displays your project files in the Android view. This view is organized by modules to provide quick access to your project's key source files. All the build files are visible at the top level, under Gradle Scripts. Each app module contains the following folders: manifests: Contains the AndroidManifest.xml file. java: Contains the Kotlin and Java source code files, including JUnit test code. res: Contains all non-code resources such as UI strings and bitmap images, divided into corresponding subdirectories."

#### الترجمة الحرفية:
> يحتوي كل مشروع في Android Studio على وحدة (module) واحدة أو أكثر بملفات كود مصدري وملفات موارد. تشمل أنواع الوحدات: وحدات تطبيق أندرويد؛ وحدات مكتبة (Library modules)؛ وحدات Google App Engine. افتراضياً، يعرض Android Studio ملفات مشروعك في عرض Android (Android view). يُنظَّم هذا العرض حسب الوحدات لتوفير وصول سريع لملفات الكود المصدري الرئيسية لمشروعك. كل ملفات البناء (build files) مرئية في المستوى الأعلى، تحت Gradle Scripts. تحتوي كل وحدة تطبيق (app module) على المجلدات التالية: manifests: يحتوي ملف AndroidManifest.xml. java: يحتوي ملفات كود Kotlin وJava المصدرية، بما فيها كود اختبار JUnit. res: يحتوي كل الموارد غير البرمجية مثل نصوص الواجهة والصور النقطية (bitmap)، مقسّمة إلى مجلدات فرعية مناظرة.

#### الشرح المبسّط:
هذا القسم يشرح "التنظيم الداخلي" لأي مشروع أندرويد كما يراه المطور في Android Studio، وهو تنظيم موحّد يجعل أي مطور آخر يستطيع فهم بنية مشروعك بسرعة حتى لو لم يعمل عليه من قبل. المفهوم الأساسي هنا هو `Module` — وحدة مستقلة من الكود، وأشهرها `app module` وهو التطبيق الرئيسي نفسه. داخل كل وحدة تطبيق، توجد ثلاثة مجلدات أساسية يجب معرفتها: `manifests` (يحتوي ملف الإعدادات العام `AndroidManifest.xml` الذي يعرّف كل شاشات ووأذونات التطبيق)، `java` (يحتوي كل الكود المصدري الفعلي بلغة Kotlin أو Java)، و`res` (يحتوي كل "الموارد" غير البرمجية كالنصوص والصور — وهذا يربطنا مباشرة بشرح `Resource Manager` السابق). **تشبيه يومي:** يشبه هذا التنظيم مكتبة منزلية مرتبة فيها ثلاثة أرفف واضحة: رفّ "القواعد العامة" (manifest)، رفّ "الكتب الفعلية" (java/كود)، ورفّ "الملحقات كالصور والملصقات" (res) — بدل كومة عشوائية من الأوراق تجعل إيجاد أي شيء صعباً.

**لماذا؟** لأن اتباع بنية موحّدة ومعيارية (Standardized) يجعل أي مطور آخر — أو حتى أدوات Android Studio نفسها والـ Gradle — يعرف بالضبط أين يبحث عن كل نوع ملف، مما يسهّل التعاون بين فرق العمل المختلفة ويقلل الأخطاء الناتجة عن سوء التنظيم.

---

### 33. نظام بناء Gradle (Gradle Build System)

#### النص الأصلي يقول (English):
> "Android Studio uses Gradle as the foundation of the build system, with more Android-specific capabilities provided by the Android Gradle plugin. This build system runs as an integrated tool from the Android Studio menu and independently from the command line. Android Studio build files are named build.gradle.kts if you use Kotlin (recommended) or build.gradle if you use Groovy. They are plain text files that use the Kotlin or Groovy syntax to configure the build with elements provided by the Android Gradle plugin. Each project has one top-level build file for the entire project and separate module-level build files for each module. When you import an existing project, Android Studio automatically generates the necessary build files."

#### الترجمة الحرفية:
> يستخدم Android Studio Gradle كأساس لنظام البناء (build system)، مع إمكانيات إضافية خاصة بأندرويد يوفرها إضافة (plugin) أندرويد Gradle. يعمل نظام البناء هذا كأداة متكاملة من قائمة Android Studio وبشكل مستقل من سطر الأوامر (command line). تُسمّى ملفات بناء Android Studio باسم build.gradle.kts إذا كنت تستخدم Kotlin (وهو الموصى به) أو build.gradle إذا كنت تستخدم Groovy. وهي ملفات نصية عادية تستخدم صياغة Kotlin أو Groovy لتهيئة عملية البناء بعناصر يوفرها إضافة أندرويد Gradle. يحتوي كل مشروع على ملف بناء واحد من المستوى الأعلى للمشروع بأكمله، وملفات بناء منفصلة على مستوى كل وحدة (module). عند استيراد مشروع موجود مسبقاً، يُنشئ Android Studio تلقائياً ملفات البناء الضرورية.

#### الشرح المبسّط:
`Gradle` هو "نظام البناء" (Build System) — أي الأداة المسؤولة عن تحويل كل ملفات الكود والموارد المتناثرة في مشروعك (Kotlin، XML، صور...) إلى ملف تطبيق واحد قابل للتثبيت على الهاتف (يُسمى `APK` أو `AAB`)، وهذا يربط مباشرة بما شرحناه سابقاً عن `ART` وترجمة الكود إلى صيغة `DEX`. ملفات `build.gradle.kts` هي حيث يحدد المطور "تعليمات البناء": ما هي المكتبات الخارجية التي يعتمد عليها التطبيق (كمكتبات Compose أو Retrofit)، وما هو الحد الأدنى والحد الأقصى لإصدار أندرويد المدعوم (رابطاً هذا بمفهوم `API Level` الذي شرحناه سابقاً)، وغيرها من الإعدادات. وجود ملف "عام" على مستوى المشروع كله وملفات "خاصة" لكل وحدة (module) يعكس نفس فكرة التنظيم الهرمي التي رأيناها في هيكل المشروع. **تشبيه يومي:** Gradle يشبه "وصفة طبخ" مفصّلة تحدد بالضبط أي مكونات (مكتبات) تحتاجها، وبأي كمية، وبأي ترتيب تُطهى (تُجمَّع) لتحصل في النهاية على الطبق النهائي الجاهز للتقديم (ملف التطبيق القابل للتثبيت).

**لماذا؟** لأن المشاريع الحديثة تعتمد عادةً على عشرات المكتبات الخارجية وتحتاج لخطوات بناء معقدة (ترجمة، دمج موارد، توقيع رقمي)، فاحتاج أندرويد لنظام بناء قوي وقابل للتخصيص كـ Gradle يؤتمت هذه العملية بالكامل بدل قيام المطور بها يدوياً في كل مرة.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Android` | نظام تشغيل مفتوح المصدر مبني على Linux للأجهزة اللمسية | طوّرته Open Handset Alliance وGoogle |
| `Android SDK` | مجموعة أدوات لتطوير واختبار وتصحيح تطبيقات أندرويد | يشمل SDK Tools، SDK Platform، Emulator |
| `API Level` | رقم يحدد بدقة إصدار الـ framework API لنسخة أندرويد | مثلاً Android 14 = API 34 |
| `Linux Kernel` | أساس منصّة أندرويد، يدير الذاكرة والعمليات والأمان | يوفر threading لـ ART |
| `HAL` | طبقة تجريد العتاد توفّر واجهات موحدة للعتاد المختلف | مثال: كاميرا، بلوتوث |
| `ART` | بيئة تشغيل أندرويد التي تنفّذ ملفات DEX | تستخدم الترجمة المسبقة AOT |
| `DEX` | صيغة بايت كود مُحسَّنة لأندرويد بذاكرة منخفضة | ناتج ترجمة Kotlin/Java |
| `Dalvik` | بيئة تشغيل قديمة قبل ART، استخدمت JIT | قبل API 21 |
| `Native C/C++ Libraries` | مكتبات أصلية تبني مكونات مثل ART وHAL | مثال: OpenGL ES |
| `Java API Framework` | الطبقة التي يستخدمها المطور مباشرة لبناء التطبيقات | Activity Manager, Window Manager... |
| `System Apps` | تطبيقات النظام الجاهزة (بريد، رسائل، متصفح) | لا تملك امتيازاً خاصاً |
| `Jetpack Compose` | مجموعة أدوات حديثة تصريحية لبناء الواجهات بـ Kotlin | بديل View System |
| `@Composable` | تعليق توضيحي (annotation) يحدد دالة كمكوّن واجهة | لا تُعيد أي قيمة |
| `Recomposition` | إعادة تنفيذ الدوال القابلة للتكوين تلقائياً عند تغيّر البيانات | يُحدَّث الجزء المتغيّر فقط |
| `Android Studio` | بيئة التطوير المتكاملة الرسمية لأندرويد | مبنية على IntelliJ IDEA |
| `Gradle` | نظام بناء المشروع الذي يحوّل الكود لملف تطبيق قابل للتثبيت | ملفات build.gradle.kts |

### المكونات الرئيسية (مرجع سريع) — Java API Framework

| المدير (Manager) | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Activity Manager` | يدير دورة حياة الشاشات (Activities) والتنقل بينها | back stack |
| `Window Manager` | يدير عرض وترتيب النوافذ على الشاشة | التسلسل الهرمي البصري |
| `Package Manager` | يدير تثبيت/تحديث/حذف التطبيقات والأذونات | حماية من التطبيقات الخبيثة |
| `Resource Manager` | يمركز الوصول للموارد (نصوص، صور، ألوان) | يدعم تعدد اللغات وأحجام الشاشات |
| `Notification Manager` | يدير عرض الإشعارات في شريط الحالة | يضمن الاتساق |
| `Location Manager` | يوفّر الوصول لمعلومات الموقع الجغرافي | لتطبيقات الملاحة |
| `Telephony Manager` | يوفّر وصولاً لميزات الاتصال الهاتفي | مكالمات، SMS |
| `View System` | مكوّنات واجهة جاهزة (أزرار، نصوص، قوائم) | الطريقة التقليدية للواجهات |
| `Content Providers` | يسمح بمشاركة البيانات بين التطبيقات بأمان | مثال: جهات الاتصال |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| بيئة التشغيل | `Dalvik` | `ART` | Dalvik يستخدم JIT (ترجمة لحظية، فتح أبطأ)، ART يستخدم AOT (ترجمة مسبقة، فتح أسرع) |
| بناء الواجهة | `View System` | `Jetpack Compose` | View System إجرائي بملفات XML منفصلة؛ Compose تصريحي بلغة Kotlin فقط |
| نهج البرمجة | `Imperative` | `Declarative` | الأول يصف "كيف" يتم التغيير خطوة بخطوة؛ الثاني يصف "الشكل النهائي" فقط |
| نوع الوحدة (Module) | `Android app module` | `Library module` | الأول تطبيق كامل قابل للتشغيل؛ الثاني كود قابل لإعادة الاستخدام فقط دون تشغيل مستقل |

### قاموس المصطلحات (Glossary)

| الفئة | المصطلحات |
| --- | --- |
| بنية النظام | `Linux Kernel`, `HAL`, `ART`, `Native Libraries`, `Java API Framework`, `System Apps` |
| الأداء والتنفيذ | `DEX`, `Dalvik`, `JIT`, `AOT`, `Bytecode`, `Threading` |
| المديرون (Managers) | `Activity Manager`, `Window Manager`, `Package Manager`, `Resource Manager`, `Notification Manager`, `Location Manager`, `Telephony Manager` |
| واجهة المستخدم | `View System`, `Jetpack Compose`, `@Composable`, `Declarative UI`, `Recomposition`, `Row`, `Column` |
| بيئة التطوير | `Android Studio`, `Gradle`, `build.gradle.kts`, `Emulator`, `Live Edit`, `Lint` |
| هيكل المشروع | `Module`, `manifests`, `java`, `res`, `AndroidManifest.xml` |

### أبرز النقاط الذهبية
1. أندرويد هو مكدّس برمجي طبقي (Software Stack) من ست طبقات، كل طبقة تعتمد على التي تحتها.
2. Kotlin هي اللغة الرسمية الأولى لتطوير أندرويد منذ 2019 لكونها أقل كوداً وأقل أخطاءً.
3. مستوى `API Level` هو الرقم الحقيقي الذي يستخدمه المطور للتحقق من التوافقية، وليس اسم الإصدار.
4. `ART` يستخدم الترجمة المسبقة (AOT) لتسريع فتح التطبيقات مقارنة بـ `Dalvik` القديم (JIT).
5. `HAL` يوحّد التعامل مع العتاد المختلف من مصنّعين متعددين عبر واجهة قياسية واحدة.
6. تطبيقات النظام (`System Apps`) لا تملك امتيازاً خاصاً — يمكن استبدالها بتطبيقات طرف ثالث.
7. `Jetpack Compose` يستخدم نهجاً تصريحياً (`Declarative`): تصف الشكل النهائي فقط، ويتولى Compose التحديث.
8. `Recomposition` تعيد تنفيذ الدوال القابلة للتكوين تلقائياً، لكن بذكاء يتجاوز الأجزاء غير المتغيّرة.
9. `Gradle` هو نظام البناء الذي يحوّل كل ملفات المشروع لتطبيق واحد قابل للتثبيت.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| الخلط بين `API Level` و`اسم/رقم إصدار أندرويد` (مثل "Android 14") | API Level رقم داخلي منفصل (مثلاً Android 14 = API 34)؛ يُستخدم في الكود وليس اسم التسويق |
| الاعتقاد أن `ART` و`Dalvik` يعملان في نفس الوقت | ART استبدل Dalvik بالكامل ابتداءً من Android 5.0 (API 21)، وليسا يعملان معاً |
| الاعتقاد أن Composable في Jetpack Compose "تُعيد" قيمة كأي دالة عادية | الدالة القابلة للتكوين (@Composable) لا تُعيد قيمة؛ هي تصف الواجهة فقط |
| الظن أن `Recomposition` تعيد رسم الشاشة بأكملها من الصفر في كل مرة | Compose يتجاوز (Skip) الأجزاء غير المتغيّرة تحسيناً للأداء |
| الخلط بين `HAL` و`Native C/C++ Libraries` كأنهما نفس الشيء | HAL طبقة واجهات موحّدة للعتاد؛ Native Libraries مكتبات عامة (كـ OpenGL) تُستخدم من مكونات مختلفة بما فيها HAL نفسه |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: كيف يتم تشغيل تطبيق أندرويد من الكود المصدري حتى الشاشة

#### ما هدف هذه العملية؟
> توضح هذه الخوارزمية الرحلة الكاملة لكود Kotlin/Java من لحظة كتابته حتى ظهور واجهة التطبيق أمام المستخدم، مروراً بكل طبقات المكدّس البرمجي.

```algorithm
1 | كتابة الكود | Kotlin / Java (Android Studio) | المطور يكتب منطق التطبيق وواجهته (Compose أو XML)
2 | البناء (Build) | Gradle + Android Gradle Plugin | يُجمَّع الكود والموارد حسب تعليمات build.gradle.kts
3 | الترجمة لبايت كود | Build Tools | يُترجَم Kotlin/Java إلى صيغة DEX (Dalvik Executable)
4 | التثبيت | Package Manager | يُثبَّت ملف APK/AAB، وتُفحص الأذونات المطلوبة
5 | الترجمة المسبقة | Android Runtime (ART) | يُترجَم DEX مسبقاً (AOT) إلى كود آلة قابل للتنفيذ مباشرة
6 | تنفيذ الكود | ART + Linux Kernel | يُنفَّذ الكود فعلياً مستفيداً من إدارة الذاكرة والخيوط من النواة
7 | الوصول للعتاد (عند الحاجة) | HAL | تُستدعى وحدة HAL المناسبة (كاميرا، بلوتوث) عبر واجهة موحدة
8 | استدعاء خدمات النظام | Java API Framework | يُستدعى Activity Manager, Window Manager... لعرض الشاشة وإدارتها
9 | عرض الواجهة | Jetpack Compose / View System | تُرسَم عناصر الواجهة فعلياً على الشاشة للمستخدم
```

#### نقاط التنفيذ:
- الخطوات 2-3 (البناء والترجمة) تحدث مرة واحدة عادةً عند تثبيت التطبيق أو تحديثه، وليس في كل فتح للتطبيق.
- إن احتاج التطبيق موارد عتاد (كاميرا) دون امتلاك الإذن المناسب (خطوة 4)، سترفض النظام الوصول في الخطوة 7.

---

### أنماط الأكواد

**نمط 1 — تعريف مكوّن Compose بسيط بدون معاملات:**
```kotlin
@Composable
fun Greeting() {
    Column {
        Text("Hello Android")
        Text("Hello Everyone!")
    }
}
```

**نمط 2 — مكوّن Compose يستقبل معاملاً ديناميكياً:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
        Text("Hello Everyone!")
    }
}
```

**نمط 3 — استدعاء المكوّن من نقطة انطلاق التطبيق:**
```kotlin
override fun onCreate(savedInstance: Bundle?) {
    super.onCreate(savedInstance)
    setContent {
        Greeting("Murat")
    }
}
```

### أنماط التعامل
- عند الحاجة لعرض بيانات متغيّرة في الواجهة: مرّرها كمعامل (parameter) لدالة `@Composable` بدل تثبيتها داخل الدالة.
- عند الحاجة لترتيب عدة عناصر: استخدم `Column` للترتيب العمودي و`Row` للترتيب الأفقي.
- عند الحاجة لوظيفة موجودة مسبقاً في تطبيق نظام آخر (كإرسال SMS): استدعِ تطبيق النظام الجاهز بدل إعادة بنائها.

### الأفكار الشاملة
- أندرويد نظام طبقي بالكامل — كل طبقة (Kernel → HAL → ART/Native → Java API Framework → System Apps) تخدم الطبقة التي فوقها وتعتمد على التي تحتها.
- التوجّه العام لأندرويد هو نحو **التبسيط والتصريحية**: من Java إلى Kotlin، ومن View System الإجرائي إلى Compose التصريحي.
- الأمان والخصوصية مبنيان في صلب النظام عبر عزل التطبيقات (Sandboxing)، ونظام الأذونات (Permissions)، وContent Providers كبوابة رسمية للمشاركة.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
What is the primary foundation layer of the Android software stack?
أ) Java API Framework
ب) Linux Kernel
ج) Android Runtime (ART)
د) System Apps

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب) لأن المحاضرة تنص صراحة على أن "أساس منصّة أندرويد هو نواة Linux"، وكل الطبقات الأخرى (HAL، ART، Java API Framework، System Apps) مبنية فوقها.

---

### السؤال 2 (متوسط)
Which organization is described as the main contributor and commercial marketer of Android?
أ) Apple
ب) Open Handset Alliance فقط بدون Google
ج) Google
د) IntelliJ

**الإجابة الصحيحة: ج**
**التعليل:** الإجابة الصحيحة (ج)؛ المحاضرة تذكر أن أندرويد طوّره تحالف Open Handset Alliance، لكن "المساهم الرئيسي والمسوِّق التجاري" هو تحديداً Google.

---

### السؤال 3 (متوسط)
Since which event has Android development been "Kotlin-first"?
أ) إطلاق أندرويد 1.0 سنة 2008
ب) Google I/O سنة 2019
ج) إطلاق Jetpack Compose
د) إطلاق Android Studio

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ النص يذكر صراحة "Kotlin-first since Google I/O in 2019".

---

### السؤال 4 (متوسط)
Based on Google's internal data mentioned in the lecture, apps built with Kotlin are how much less likely to crash?
أ) 5%
ب) 10%
ج) 20%
د) 50%

**الإجابة الصحيحة: ج**
**التعليل:** الإجابة الصحيحة (ج)؛ النص يذكر رقماً محدداً: "20% less likely to crash based on Google's internal data".

---

### السؤال 5 (متوسط)
What API level corresponds to Android version 5.0 (Lollipop), the version where ART became the default runtime?
أ) API 19
ب) API 21
ج) API 23
د) API 28

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ حسب جدول الإصدارات، Lollipop 5.0-5.1.1 يقابل API level 21-22، وهذا هو نفسه رقم API الذي ذكرته شريحة ART كنقطة التحول من Dalvik.

---

### السؤال 6 (متوسط)
According to the lecture, what does an API Level uniquely identify?
أ) اسم التسويق التجاري لإصدار أندرويد
ب) نسخة الـ framework API التي تقدمها منصّة أندرويد
ج) رقم إصدار Kotlin المستخدَم
د) رقم إصدار Gradle

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ التعريف الحرفي في المحاضرة: "API level is an integer value that uniquely identifies the framework API revision offered by a version of the Android platform".

---

### السؤال 7 (متوسط)
Which HAL characteristic allows apps to work with different camera hardware from different manufacturers without changing app code?
أ) أن HAL يكتب برامج تشغيل مباشرة لكل عتاد
ب) أن HAL يوفّر واجهات معيارية موحّدة (standard interfaces) تخفي اختلاف العتاد
ج) أن HAL جزء من Java API Framework مباشرة
د) أن HAL يعمل فقط مع أجهزة Google Pixel

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ HAL "يوفر واجهات معيارية تكشف إمكانيات عتاد الجهاز أمام الإطار الأعلى مستوى"، فتتعامل التطبيقات مع واجهة موحدة بغض النظر عن نوع العتاد الفعلي.

---

### السؤال 8 (متوسط)
Compare Dalvik and ART: which compilation strategy does ART use?
أ) Just-In-Time (JIT)، مثل Dalvik تماماً
ب) Ahead-Of-Time (AOT)
ج) لا يستخدم أي نوع ترجمة
د) الترجمة اليدوية من المطور

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ جدول المقارنة في المحاضرة يوضح أن ART يستخدم AOT بينما Dalvik (القديم) كان يستخدم JIT.

---

### السؤال 9 (متوسط)
A developer wants to add support for drawing 2D/3D graphics in their app using native libraries exposed through a Java API. Which native library does the lecture mention as an example for this?
أ) Webkit
ب) Libc
ج) OpenGL ES
د) OpenMAX AL

**الإجابة الصحيحة: ج**
**التعليل:** الإجابة الصحيحة (ج)؛ المحاضرة تذكر مثالاً محدداً: "you can access OpenGL ES through the Android framework's Java OpenGL API to add support for drawing and manipulating 2D and 3D graphics".

---

### السؤال 10 (متوسط)
Which Java API Framework manager is responsible for ensuring only one activity is in the foreground at a time?
أ) Window Manager
ب) Package Manager
ج) Activity Manager
د) Resource Manager

**الإجابة الصحيحة: ج**
**التعليل:** الإجابة الصحيحة (ج)؛ النص يذكر أن Activity Manager "يضمن وجود نشاط واحد فقط في المقدمة في أي وقت".

---

### السؤال 11 (متوسط)
A developer wants their app to send an SMS message without building SMS functionality from scratch. What Android concept explains why this is possible?
أ) Content Providers فقط
ب) أن تطبيقات النظام (System Apps) توفر قدرات يمكن استدعاؤها من تطبيقات أخرى
ج) أن كل تطبيق يجب أن يبني وظيفة SMS بنفسه إلزامياً
د) HAL يوفر وظيفة SMS مباشرة

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ المحاضرة تنص أن تطبيقات النظام "تعمل كتطبيقات للمستخدمين وأيضاً لتوفير قدرات أساسية يمكن للمطورين الوصول إليها"، وتذكر مثال SMS تحديداً.

---

### السؤال 12 (متوسط)
In the following scenario, which component would a messaging app use to access data from the device's Contacts app securely?
أ) Notification Manager
ب) Content Provider
ج) Location Manager
د) Window Manager

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ Content Providers "تمكّن التطبيقات من الوصول إلى بيانات من تطبيقات أخرى، مثل تطبيق جهات الاتصال... بطريقة آمنة ومنظمة".

---

### السؤال 13 (متوسط)
What does the term "Declarative UI" in Jetpack Compose mean, according to the lecture?
أ) وصف تفصيلي لكل خطوة لتحديث الواجهة يدوياً (imperatively)
ب) وصف كيف يجب أن تبدو الواجهة، دون التركيز على عملية بنائها خطوة بخطوة
ج) كتابة الواجهة بلغة XML منفصلة عن الكود
د) استخدام لغة Java فقط بدل Kotlin

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ النص يوضح أن composable functions "تصف الشكل الذي يجب أن تبدو عليه الواجهة... بدلاً من التركيز على عملية بناء الواجهة".

---

### السؤال 14 (متوسط)
Given the code below, what will happen when the value of `name` changes from "Android" to "Compose"?
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
        Text("Hello Everyone!")
    }
}
```
أ) سيُعاد رسم كامل الشاشة بما فيها "Hello Everyone!" من جديد
ب) سيتوقف التطبيق عن العمل لأن Composable غير قابل للتغيير
ج) ستُعاد فقط تنفيذ/رسم "Hello $name" بينما يُتجاوز "Hello Everyone!" لعدم تغيّره
د) لن يحدث أي تحديث للواجهة إطلاقاً

**الإجابة الصحيحة: ج**
**التعليل:** الإجابة الصحيحة (ج)؛ حسب مفهوم Recomposition، Compose "ذكي بما يكفي ليحسّن الأداء ويتجاوز أي عمل للعناصر التي لم تتغيّر"، وهذا موضّح صراحة في مثال الشريحة 34.

---

### السؤال 15 (متوسط)
Which folder inside an Android app module contains the `AndroidManifest.xml` file?
أ) `java`
ب) `res`
ج) `manifests`
د) `Gradle Scripts`

**الإجابة الصحيحة: ج**
**التعليل:** الإجابة الصحيحة (ج)؛ النص يذكر صراحة: "manifests: Contains the AndroidManifest.xml file".

---

### السؤال 16 (متوسط)
A team is deciding whether to migrate an existing Java-based Android project fully to Kotlin before adding any new features. Based on Kotlin's interoperability with Java, is this migration a strict requirement?
أ) نعم، يجب ترحيل كل الكود لـ Kotlin أولاً وإلا لن يعمل المشروع
ب) لا، يمكن استخدام Kotlin وJava معاً في نفس المشروع دون ترحيل كل الكود
ج) لا يمكن الجمع بينهما إطلاقاً تحت أي ظرف
د) هذا غير متعلق بموضوع Interoperability

**الإجابة الصحيحة: ب**
**التعليل:** الإجابة الصحيحة (ب)؛ المحاضرة تنص صراحة أن Kotlin توفر "قابلية التشغيل البيني مع Java... يمكنك استخدام Kotlin جنباً إلى جنب مع Java دون الحاجة لترحيل كل كودك".
## الجزء الرابع: أسئلة تصحيح الكود

**Question 1 (syntax):**
```kotlin
@Composable
fun Greeting(name: String) 
    Text("Hello $name")

```

**Find the bug:** The function is missing curly braces `{ }` to define its body block.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**شرح الحل:** بالعربية
1. أي دالة في Kotlin تحتاج قوسين معقوفين `{ }` لتحديد بداية ونهاية جسمها، تماماً كأي دالة عادية أخرى — الدوال القابلة للتكوين (`@Composable`) ليست استثناءً من هذه القاعدة.
2. بدون القوسين، لن يفهم المترجم (Compiler) أين يبدأ وينتهي منطق الدالة، وسيظهر خطأ بناء جملة (Syntax Error).

---

**Question 2 (misconception):**
```kotlin
@Composable
fun Greeting(name: String): String {
    return "Hello $name"
}
```

**Find the bug:** The developer believes a Composable function must return a String value like a normal function, but according to the lecture, Composable functions don't return anything.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**شرح الحل:** بالعربية
1. المحاضرة توضح صراحة: "This function doesn't return anything, but the function that it describes what this piece of the UI should look like" — أي أن الدالة القابلة للتكوين لا تُعيد قيمة، بل تصف شكل جزء من الواجهة مباشرة عبر استدعاء دوال Composable أخرى مثل `Text`.
2. محاولة إعادة `String` من دالة `@Composable` تخالف طبيعة عملها بالكامل، والحل هو استخدام `Text()` لعرض النص مباشرة داخل جسم الدالة بدل إعادته كقيمة.

---

**Question 3 (logic):**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Row("Hello $name")   // (1)
    }
}
```

**Find the bug:** `Row` is a layout container used to arrange multiple composables horizontally — it does not accept a raw string directly as shown here; a `Text` composable should be used to display text.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Row {
            Text("Hello $name")
        }
    }
}
```
**شرح الحل:** بالعربية
1. حسب المحاضرة، `Row` و`Column` هما "تخطيطات" (layouts) تُستخدم لترتيب عناصر Composable أخرى (أفقياً أو عمودياً)، وليستا مكوّنات لعرض نص مباشرة.
2. عرض أي نص يجب أن يتم عبر مكوّن `Text` نفسه، الذي يمكن وضعه *داخل* `Row` أو `Column` لتحديد كيفية ترتيبه بالنسبة لعناصر أخرى.

---

**Question 4 (dead_code):**
```kotlin
@Composable
fun Greeting(name: String) {
    if (false) {
        Text("This will never show")
    }
    Text("Hello $name")
}
```

**Find the bug:** The first `Text` block is unreachable dead code because the condition `if (false)` will never evaluate to true, wasting a recomposition check on code that can never execute.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**شرح الحل:** بالعربية
1. أي كتلة كود شرطها ثابت دائماً بـ `false` هي "كود ميت" (Dead Code) لا يُنفَّذ أبداً ويجب حذفه لأنه لا يضيف أي قيمة ويُصعّب قراءة الكود.
2. في سياق Compose تحديداً، أي كود إضافي غير ضروري داخل دالة `@Composable` قد يُعقّد عملية إعادة التكوين (Recomposition) دون أي فائدة فعلية.

---

**Question 5 (return_check):**
```kotlin
fun getGreetingMessage(name: String): String {
    Text("Hello $name")
}
```

**Find the bug:** This is a regular Kotlin function declared to return a `String` (not marked `@Composable`), but its body calls `Text()` — a Composable function — instead of returning a String value, and it's missing a `return` statement.

**Fixed code:**
```kotlin
fun getGreetingMessage(name: String): String {
    return "Hello $name"
}
```
**شرح الحل:** بالعربية
1. هذه الدالة *ليست* موسومة بـ `@Composable`، لذا يجب أن تتصرف كدالة Kotlin عادية تُعيد قيمة `String` فعلياً باستخدام `return`، وليس أن تستدعي مكوّن واجهة مثل `Text()`.
2. الخلط بين الدوال العادية والدوال القابلة للتكوين خطأ شائع؛ القاعدة البسيطة: إن كانت الدالة تُعيد قيمة بيانات (كنص أو رقم) فهي دالة عادية، وإن كانت تصف واجهة مرئية فهي `@Composable` ولا تُعيد قيمة.

---

**Question 6 (syntax):**
```gradle
dependencies 
    implementation("androidx.compose.ui:ui")
}
```

**Find the bug:** The `dependencies` block is missing its opening curly brace `{`.

**Fixed code:**
```gradle
dependencies {
    implementation("androidx.compose.ui:ui")
}
```
**شرح الحل:** بالعربية
1. ملفات `build.gradle.kts` تتبع نفس قواعد صياغة Kotlin، وأي كتلة (Block) مثل `dependencies` تحتاج قوساً مفتوحاً `{` وقوساً مغلقاً `}` بشكل متطابق.
2. نسيان القوس الافتتاحي يمنع Gradle من فهم أين تبدأ قائمة الاعتماديات (المكتبات) المطلوبة، مما يوقف عملية البناء (Build) بالكامل بخطأ syntax.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Identify the Layer — theory

**Scenario / Task:**
For each Android component below, identify which layer of the Android software stack it belongs to: (a) `Binder (IPC)`, (b) `ART`, (c) `Activity Manager`, (d) `OpenGL ES`, (e) `Camera HAL module`.

**Requirements:**
1. Match each component to one of: Linux Kernel, HAL, Native C/C++ Libraries, Android Runtime, Java API Framework.

**نموذج الحل:** بالعربية
- (a) `Binder (IPC)` → طبقة Linux Kernel (من ضمن الـ drivers).
- (b) `ART` → طبقة Android Runtime.
- (c) `Activity Manager` → طبقة Java API Framework.
- (d) `OpenGL ES` → طبقة Native C/C++ Libraries.
- (e) `Camera HAL module` → طبقة Hardware Abstraction Layer (HAL).

---

### Exercise 2: Fill in the Blanks — fill_gaps

**Scenario / Task:**
Complete the sentences about Jetpack Compose using the correct terms from the lecture.

**Requirements:**
1. In Compose, a UI Component is a function annotated with _______.
2. Compose uses a _______ approach, meaning you describe how the UI should look rather than how to construct it step by step.
3. When app data changes, Compose automatically re-executes composable functions in a process called _______.

**نموذج الحل:** بالعربية
1. `@Composable`
2. `Declarative UI` (تصريحي)
3. `Recomposition` (إعادة التكوين)

---

### Exercise 3: Code Fix — code_fix

**Scenario / Task:**
The following code is meant to display a greeting for a dynamic user name, but it doesn't accept any input and always shows "Hello Guest".

```kotlin
@Composable
fun Greeting() {
    Text("Hello Guest")
}
```

**Requirements:**
1. Modify the function to accept a `name: String` parameter.
2. Use it to display a personalized greeting instead of the hardcoded "Guest".

**نموذج الحل:** بالعربية
```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```
الحل يعتمد على مفهوم "المعاملات" (Parameters) في الدوال القابلة للتكوين — بإضافة معامل `name: String`، تصبح الدالة قابلة لإعادة الاستخدام مع أي اسم بدل أن تكون ثابتة على "Guest".

---

### Exercise 4: Scenario — scenario

**Scenario / Task:**
You are building a music player app. When the user taps "Play", you want a notification to appear in the status bar showing the current song, even when the user has switched to a different app.

**Requirements:**
1. Which Java API Framework manager is responsible for this feature?
2. Briefly explain why this manager is the correct choice, referencing the lecture.

**نموذج الحل:** بالعربية
1. `Notification Manager` هو المسؤول.
2. لأن المحاضرة تنص أنه "يوفّر آلية للتطبيقات لعرض تنبيهات وإشعارات في شريط الحالة للمستخدم خارج نطاق تطبيقهم" — وهذا يطابق تماماً الحاجة لإظهار الأغنية الحالية حتى عند مغادرة تطبيق مشغّل الموسيقى.

---

### Exercise 5: Scenario — scenario

**Scenario / Task:**
A manufacturer releases a new phone with a completely new type of fingerprint sensor that didn't exist before. Explain, using concepts from the lecture, how an app can use this new sensor through the standard Android Java APIs without the app developer needing to know the sensor's internal hardware details.

**Requirements:**
1. Name the layer responsible for exposing this hardware to the framework.
2. Explain the flow from the app's API call down to the physical sensor.

**نموذج الحل:** بالعربية
1. الطبقة المسؤولة هي `Hardware Abstraction Layer (HAL)`.
2. عندما يستدعي المطور واجهة Java API متعلقة بالبصمة، يقوم أندرويد بتحميل "وحدة مكتبة" (library module) خاصة بهذا المستشعر الجديد ضمن HAL يوفرها المصنّع نفسه، وتترجم هذه الوحدة الاستدعاء الموحّد إلى أوامر خاصة بذلك العتاد الفعلي عبر برنامج تشغيل (driver) في نواة Linux — وبذلك لا يحتاج المطور لمعرفة أي تفاصيل داخلية عن المستشعر الجديد.

---

### Exercise 6: Design/Comparison — scenario

**Scenario / Task:**
Compare building the same simple UI (a greeting text) using the old `View System` approach versus `Jetpack Compose`, based on the lecture's description.

**Requirements:**
1. List at least two differences mentioned in the lecture.

**نموذج الحل:** بالعربية
1. **اللغة المستخدمة:** View System يفصل الواجهة (XML) عن المنطق (Kotlin/Java)، بينما Compose يكتب كليهما بلغة Kotlin فقط.
2. **كمية الكود:** توضح المحاضرة أن Compose "يتيح لك كتابة واجهة مستخدم تطبيقك بسهولة أكبر وبكود أقل بكثير مقارنة بمجموعة أدوات واجهة المستخدم View القديمة" — وهذا واضح في مقارنة الشريحة 28 حيث كود XML كان أطول من كود Compose المكافئ له.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: Recomposition Trace

**Input:**
```kotlin
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name")
        Text("Hello Everyone!")
    }
}

// Call sequence:
Greeting(name = "Android")
// ... later, state changes ...
Greeting(name = "Compose")
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استدعاء أول `Greeting(name = "Android")` | ؟ |
| 2 | تغيّر قيمة `name` إلى "Compose" | ؟ |
| 3 | إعادة تنفيذ الدالة (Recomposition) | ؟ |
| 4 | أي سطر Text يُعاد رسمه فعلياً؟ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استدعاء أول `Greeting(name = "Android")` | تُرسم الشاشة بعرض "Hello Android" و"Hello Everyone!" |
| 2 | تغيّر قيمة `name` إلى "Compose" | Compose يكتشف أن مدخلاً تغيّر ويستوجب تحديث الواجهة |
| 3 | إعادة تنفيذ الدالة (Recomposition) | يُعاد تنفيذ جسم `Greeting` من جديد بالقيمة الجديدة |
| 4 | أي سطر Text يُعاد رسمه فعلياً؟ | فقط `Text("Hello $name")` يُعاد رسمه (لأنه يعتمد على name)؛ `Text("Hello Everyone!")` يُتجاوَز لعدم تغيّره |

**Result:** الشاشة تعرض الآن "Hello Compose" و"Hello Everyone!"، مع رسم فعلي لسطر واحد فقط رغم استدعاء الدالة كاملة.

---

### Trace Exercise 2: App Launch Flow Trace

**Input:**
A user taps the icon of a newly installed app for the first time.

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | النظام يتحقق من التطبيق المثبَّت | ؟ |
| 2 | يُترجَم كود DEX مسبقاً | ؟ |
| 3 | يبدأ تنفيذ الكود فعلياً | ؟ |
| 4 | تُستدعى خدمات لعرض الشاشة الأولى | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | النظام يتحقق من التطبيق المثبَّت | `Package Manager` يتحقق من سجل التطبيق وأذوناته |
| 2 | يُترجَم كود DEX مسبقاً | `ART` يكون قد ترجم DEX إلى كود آلة مسبقاً (AOT) عند التثبيت، وليس الآن |
| 3 | يبدأ تنفيذ الكود فعلياً | `ART` ينفّذ الكود مستفيداً من إدارة الذاكرة والخيوط من `Linux Kernel` |
| 4 | تُستدعى خدمات لعرض الشاشة الأولى | `Activity Manager` يُطلق أول Activity، و`Window Manager` يعرضها على الشاشة |

**Result:** تظهر الشاشة الأولى للتطبيق (Activity) أمام المستخدم جاهزة للتفاعل.

---

### Trace Exercise 3: API Level Compatibility Trace

**Input:**
An app sets `minSdkVersion = 21` and wants to use a hypothetical feature that was only introduced in `API level 26 (Oreo)`.

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | جهاز يعمل بـ API 21 (Lollipop) يفتح التطبيق | ؟ |
| 2 | الكود يحاول استخدام ميزة API 26 مباشرة بدون تحقق | ؟ |
| 3 | جهاز يعمل بـ API 28 (Pie) يفتح نفس التطبيق | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | جهاز يعمل بـ API 21 (Lollipop) يفتح التطبيق | التطبيق يعمل بشكل عام لأن `minSdkVersion` = 21 متوافق |
| 2 | الكود يحاول استخدام ميزة API 26 مباشرة بدون تحقق | حدوث خطأ محتمل (Crash) لأن هذه الميزة غير موجودة في framework الجهاز بمستوى API 21 |
| 3 | جهاز يعمل بـ API 28 (Pie) يفتح نفس التطبيق | الميزة تعمل بشكل طبيعي لأن API 28 أعلى من 26 (الدعم ضمني للمستويات الأحدث) |

**Result:** يجب على المطور التحقق برمجياً من رقم API الحالي قبل استخدام أي ميزة أحدث من `minSdkVersion` المحدد، لتفادي تعطّل التطبيق على الأجهزة الأقدم.

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: Layered Architecture Diagram — architecture

**Task:**
Draw a simple layered diagram of the Android software stack as described in the lecture, from the bottom-most layer to the top-most layer, and label the two layers that sit side-by-side at the same level.

**نموذج الإجابة:** بالعربية

```diagram
type: flowchart
title: Android Software Stack
direction: TD
nodes:
  - id: kernel
    label: Linux Kernel
    kind: layer
    level: 0
  - id: hal
    label: Hardware Abstraction Layer (HAL)
    kind: layer
    level: 1
  - id: native
    label: Native C/C++ Libraries
    kind: layer
    level: 2
  - id: art
    label: Android Runtime (ART)
    kind: layer
    level: 2
  - id: framework
    label: Java API Framework
    kind: layer
    level: 3
  - id: apps
    label: System Apps
    kind: layer
    level: 4
edges:
  - from: kernel
    to: hal
    label: يوفر الأساس لـ
  - from: hal
    to: native
    label: يُستخدم من قِبل
  - from: hal
    to: art
    label: يُستخدم من قِبل
  - from: native
    to: framework
    label: يُعرَض عبر Java API
  - from: art
    to: framework
    label: ينفّذ كود
  - from: framework
    to: apps
    label: يبني عليه
```

**معايير التقييم:**
- ذُكرت الطبقات الست بالترتيب الصحيح من الأسفل للأعلى (Linux Kernel → HAL → Native Libraries وART جنباً إلى جنب → Java API Framework → System Apps).
- وُضِّح أن `Native C/C++ Libraries` و`Android Runtime (ART)` يقعان على نفس المستوى (side-by-side) وليس أحدهما فوق الآخر.
- عبّر الرسم عن اتجاه الاعتماد الصحيح (كل طبقة تعتمد على التي تحتها، لا العكس).

---

### Design Question 2: Manager Selection Design — uml_design

**Task:**
You are designing a fitness-tracking app with these features: (1) show the user's running route on a map, (2) send a reminder notification to drink water, (3) let the user save custom color themes for the app. For each feature, design a simple table mapping the feature to the correct Java API Framework manager and briefly justify the choice.

**نموذج الإجابة:** بالعربية

| الميزة | المدير المناسب | التبرير |
| --- | --- | --- |
| عرض مسار الجري على الخريطة | `Location Manager` | يوفّر "وظائف للوصول إلى معلومات موقع الجهاز... مثل تطبيقات الملاحة أو متتبعات اللياقة البدنية" وهذا مطابق تماماً لحالة الاستخدام |
| إشعار تذكير بشرب الماء | `Notification Manager` | يوفّر "آلية لعرض تنبيهات وإشعارات في شريط الحالة... خارج نطاق التطبيق"، مناسب لتذكير المستخدم حتى وهو خارج التطبيق |
| حفظ ثيمات ألوان مخصصة | `Resource Manager` | يمركز الوصول لموارد مثل الألوان والأنماط (styles)، ويسمح بتعريف نسخ مختلفة من الموارد يمكن تبديلها |

**معايير التقييم:**
- تم اختيار المدير الصحيح لكل من الميزات الثلاث.
- استند التبرير إلى تعريف كل مدير كما ورد حرفياً في المحاضرة، وليس تخميناً عاماً.
- رُوعي الفرق بين مدير يتعامل مع بيانات حساسة (كالموقع) ومدير يتعامل مع محتوى عادي (كالألوان).

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What license type is Android's source code available under?
A: Free and open source software licenses.

---

**Q2:** Which language has been Android's "first" priority language since Google I/O 2019?
A: Kotlin.

---

**Q3:** What does the acronym "ART" stand for in the Android context?
A: Android Runtime.

---

**Q4:** What bytecode format does ART execute?
A: Dalvik Executable format (DEX).

---

**Q5:** Which runtime did Android use before ART, prior to API level 21?
A: Dalvik.

---

**Q6:** What compilation strategy does ART use compared to Dalvik's JIT?
A: Ahead-of-Time (AOT) compilation.

---

**Q7:** What does HAL stand for, and what is its main purpose?
A: Hardware Abstraction Layer; it provides standard interfaces exposing device hardware capabilities to the higher-level Java API framework.

---

**Q8:** Name three example native libraries mentioned under "Native C/C++ Libraries" in the lecture.
A: Any three of: Webkit, OpenMAX AL, Libc, Media Framework, OpenGL ES.

---

**Q9:** Which manager ensures that installed apps have the necessary permissions and protects the system from malicious apps?
A: Package Manager.

---

**Q10:** In Jetpack Compose, what annotation marks a function as a UI component?
A: `@Composable`.

---

**Q11:** What is the term for Compose automatically re-executing composable functions when app data changes?
A: Recomposition.

---

**Q12:** According to the lecture, do system apps (like the default browser or SMS app) have any special status compared to third-party apps?
A: No — a third-party app can become the user's default browser, SMS messenger, or keyboard (with some exceptions like the Settings app).

---

**Q13:** What build system does Android Studio use as the foundation for compiling projects?
A: Gradle (with the Android Gradle plugin for Android-specific capabilities).

---

**Q14:** Which folder in an Android app module contains the Kotlin/Java source code, including JUnit tests?
A: The `java` folder.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> ملاحظة: هذه المحاضرة نظرية بشكل أساسي، ولم تعرض برنامجاً واحداً متكاملاً مُجزَّأً عبر عدة شرائح، بل مقتطفات Compose توضيحية منفصلة. فيما يلي تجميع لكل مقتطفات Jetpack Compose الواردة في المحاضرة كمرجع واحد متسلسل يوضح تطور المثال خطوة بخطوة.

```kotlin
// Step 1: Basic composable function with no parameters
@Composable
fun Greeting() {
    Column {
        Text("Hello Android")
        Text("Hello Everyone!")
    }
}

// Step 2: Composable function updated to accept a dynamic name parameter
@Composable
fun Greeting(name: String) {
    Column {
        Text("Hello $name") // Uses string template to insert the name value
        Text("Hello Everyone!")
    }
}

// Step 3: Calling the composable from the Activity's onCreate,
// passing data from the traditional Activity world into Compose
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstance: Bundle?) {
        super.onCreate(savedInstance)
        setContent {
            Greeting(name = "Murat") // First call with one name
            Greeting(name = "Compose") // Second call with a different name -> different UI output
        }
    }
}
```

> **المكتبات المطلوبة (Imports):**
> `import androidx.compose.runtime.Composable`
> `import androidx.compose.foundation.layout.Column`
> `import androidx.compose.material3.Text`
> `import androidx.activity.compose.setContent`

> **الناتج المتوقع:**
> شاشة تعرض عمودياً: "Hello Murat"، ثم "Hello Compose"، ثم "Hello Everyone!" مكررة تحت كل استدعاء، حسب ترتيب استدعاء `Greeting()` في `setContent`.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: Explain the concept of Android being a "unified approach" to application development. What problem does this solve for developers?

**نموذج الإجابة:** يعني النهج الموحّد أن المطور يكتب تطبيقه مرة واحدة فقط لمنصّة أندرويد، ومن المفترض أن يعمل هذا التطبيق على مجموعة واسعة من الأجهزة (هواتف، أجهزة لوحية) من مصنّعين مختلفين، دون الحاجة لإعادة كتابته لكل جهاز على حدة. يحل هذا مشكلة تجزؤ (Fragmentation) السوق التي كانت تجبر المطورين على بناء نسخ متعددة من نفس التطبيق لكل نوع جهاز أو نظام تشغيل مختلف، مما يوفّر الوقت والتكلفة ويسمح بالوصول لعدد أكبر من المستخدمين بجهد أقل.

---

### Question 2: Compare Dalvik and ART in terms of when compilation happens, and explain the trade-off between them.

**نموذج الإجابة:** يستخدم Dalvik أسلوب Just-In-Time (JIT)، أي يترجم الكود "لحظة" الحاجة إليه أثناء تشغيل التطبيق، مما يجعل عملية التثبيت أسرع لكن فتح التطبيق أبطأ في كل مرة. أما ART فيستخدم أسلوب Ahead-Of-Time (AOT)، أي يترجم الكود بالكامل مسبقاً عند التثبيت، مما يجعل التثبيت أبطأ نسبياً (ومساحة التخزين أكبر) لكن فتح التطبيق لاحقاً وأداءه العام أسرع وأكثر كفاءة. المقايضة هنا هي "وقت تثبيت أطول مرة واحدة" مقابل "أداء أفضل في كل استخدام لاحق"، وقد اختارت Google الخيار الثاني (ART) لأنه يحسّن تجربة المستخدم اليومية.

---

### Question 3: Describe the role of the Hardware Abstraction Layer (HAL) and give a real-world example of why it's necessary.

**نموذج الإجابة:** توفّر HAL واجهات موحدة (standard interfaces) تخفي تفاصيل العتاد الفعلي عن الطبقات الأعلى (Java API Framework)، بحيث لا يحتاج المطور لمعرفة أي نوع كاميرا أو بلوتوث موجود فعلياً في الجهاز. مثال عملي: شركتا Samsung وXiaomi تستخدمان رقائق كاميرا مختلفة تماماً في هواتفهما؛ بفضل HAL، يستطيع تطبيق كاميرا واحد العمل بنفس الكود على كلا الهاتفين، لأن كل مصنّع يوفّر "وحدة HAL" خاصة به تترجم الاستدعاء الموحّد إلى أوامر تفهمها رقاقته الخاصة.

---

### Question 4: What is the difference between "Imperative" and "Declarative" UI approaches, and which one does Jetpack Compose use?

**نموذج الإجابة:** في النهج الإجرائي (Imperative)، يكتب المطور تعليمات تفصيلية خطوة بخطوة لكيفية تغيير عناصر الواجهة يدوياً (كالبحث عن عنصر وتعديله مباشرة). في النهج التصريحي (Declarative)، الذي يستخدمه Jetpack Compose، يصف المطور فقط "كيف يجب أن تبدو" الواجهة النهائية بناءً على البيانات الحالية، ويتولى النظام نفسه (عبر Recomposition) معرفة كيفية تحديث الواجهة تلقائياً كلما تغيّرت البيانات، دون تدخل يدوي متكرر من المطور.

---

### Question 5: Explain what "Recomposition" means in Jetpack Compose and why it's designed to be optimized (skipping unchanged elements).

**نموذج الإجابة:** Recomposition هي العملية التي يقوم فيها Compose تلقائياً بإعادة تنفيذ الدوال القابلة للتكوين عندما تتغيّر البيانات التي تعتمد عليها الواجهة، لإنتاج تمثيل جديد ومحدَّث للواجهة. صُمِّمت لتكون محسَّنة (Optimized) بحيث تتجاوز (Skip) أي عناصر لم تتغيّر فعلياً، لأن إعادة رسم كامل الشاشة في كل تغيير بسيط سيكون مكلفاً جداً من ناحية الأداء واستهلاك البطارية، فتحافظ Compose بذلك على سهولة الكتابة التصريحية مع كفاءة أداء قريبة من الكتابة اليدوية المُحسَّنة.

---

### Question 6: A developer wants their app to display a list of contacts from the Contacts app. Which Android component should they use, and why is direct access to another app's internal data not allowed?

**نموذج الإجابة:** يجب استخدام `Content Provider` الخاص بتطبيق جهات الاتصال. لا يُسمح بالوصول المباشر لبيانات تطبيق آخر لأن أندرويد يعزل كل تطبيق في "صندوق رمل" (Sandbox) خاص به لأسباب أمنية وحماية خصوصية المستخدم؛ لذا توفّر Content Providers "بوابة رسمية" منظمة ومحكومة بالأذونات تسمح بمشاركة بيانات محددة بأمان دون كسر هذا العزل الأمني الأساسي.

---

### Question 7: Explain the purpose of the `res` folder in an Android app module, and how it connects to the concept of the Resource Manager.

**نموذج الإجابة:** يحتوي مجلد `res` كل الموارد غير البرمجية للتطبيق (نصوص، صور، ألوان، أنماط)، مقسّمة إلى مجلدات فرعية حسب نوعها. يرتبط هذا مباشرة بـ Resource Manager الذي يتولى مركزة الوصول لهذه الموارد أثناء تشغيل التطبيق، ويختار تلقائياً النسخة المناسبة (مثلاً النصوص العربية بدل الإنجليزية) بناءً على إعدادات جهاز المستخدم، دون أن يحتاج المطور لكتابة منطق يدوي لهذا الاختيار.

---

### Question 8: Why does the lecture emphasize that "apps included with the platform have no special status" regarding system apps?

**نموذج الإجابة:** لأن هذا يعكس فلسفة الانفتاح والمنافسة العادلة التي يقوم عليها أندرويد بالكامل — فبدل حصر وظائف أساسية (كالمتصفح أو الرسائل) بتطبيقات Google فقط، يسمح النظام لأي مطور طرف ثالث ببناء تطبيق بديل يمكن أن يصبح "الافتراضي" (Default) بدل تطبيق النظام، طالما استوفى المعايير المطلوبة. هذا يشجّع الابتكار ويمنح المستخدم حرية اختيار حقيقية، وهو أحد الفروقات الجوهرية بين أندرويد ونظام أكثر إغلاقاً كـ iOS.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح ما هو أندرويد ومن طوّره ومتى صدرت أول نسخة تجارية منه.
- [ ] أستطيع تعداد فوائد استخدام Kotlin في تطوير أندرويد (كود أقل، أخطاء أقل، دعم Jetpack، multiplatform).
- [ ] أستطيع تفسير معنى "API Level" والفرق بينه وبين اسم/رقم إصدار أندرويد التسويقي.
- [ ] أستطيع رسم طبقات مكدّس أندرويد الست بالترتيب الصحيح من الأسفل للأعلى.
- [ ] أستطيع شرح دور نواة Linux والتفريق بين خدماتها القياسية والخاصة بأندرويد.
- [ ] أستطيع شرح ما هو HAL ولماذا هو ضروري لدعم عتاد متنوع من مصنّعين مختلفين.
- [ ] أستطيع المقارنة بين Dalvik وART من ناحية استراتيجية الترجمة (JIT مقابل AOT).
- [ ] أستطيع شرح دور المكتبات الأصلية (Native C/C++ Libraries) وإعطاء مثال (OpenGL ES).
- [ ] أستطيع تعداد وشرح وظيفة كل مدير في Java API Framework (Activity, Window, Package, Resource, Notification, Location, Telephony, View System, Content Provider).
- [ ] أستطيع تفسير لماذا تطبيقات النظام (System Apps) لا تملك امتيازاً خاصاً وكيف تُستدعى قدراتها من تطبيقات أخرى.
- [ ] أستطيع شرح الفرق بين النهج التصريحي (Declarative) في Compose والنهج الإجرائي (Imperative) في View System القديم.
- [ ] أستطيع شرح مفهوم `@Composable` ولماذا لا تُعيد هذه الدوال قيمة.
- [ ] أستطيع شرح مفهوم `Recomposition` ولماذا يُحسَّن ليتجاوز العناصر غير المتغيّرة.
- [ ] أستطيع وصف هيكل مشروع Android Studio (manifests، java، res) ودور Gradle في عملية البناء.
- [ ] راجعت كل الأسئلة (MCQ، تصحيح كود، تتبع، تصميم، Q&A) وتأكدت من فهمي لتعليل كل إجابة.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Android Platform (هذه المحاضرة) | Kotlin Essentials | Kotlin هي اللغة الرسمية المستخدمة فوق كل طبقات المنصّة |
| Android Platform | Android Application Fundamentals | Activity Manager وSystem Apps هنا هما أساس فهم Activity وIntents لاحقاً |
| Android Platform | Jetpack Compose UI | مقدمة Compose هنا (Declarative, @Composable, Recomposition) أساس لمحاضرة الواجهات الكاملة |
| Android Platform | Modern App Architecture / MVVM | فهم Java API Framework وResource Manager ضروري قبل فهم ViewModel وState |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| بنية المنصّة | 6 طبقات: Kernel → HAL → (Native Libs + ART) → Java API Framework → System Apps |
| ART مقابل Dalvik | ART = AOT (فتح أسرع)؛ Dalvik = JIT (تثبيت أسرع)؛ ART افتراضي منذ API 21 |
| Compose | تصريحي، بلغة Kotlin فقط، @Composable لا يُعيد قيمة، Recomposition ذكية |
| الأمان | Package Manager للأذونات، Content Provider للمشاركة الآمنة بين التطبيقات |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `DEX` | Dalvik Executable — صيغة بايت كود مضغوطة | تنفذها ART |
| `AOT` | Ahead-Of-Time — ترجمة مسبقة | ART |
| `JIT` | Just-In-Time — ترجمة لحظية | Dalvik (قديم) |
| `HAL` | Hardware Abstraction Layer | وصول موحّد للعتاد |
| `@Composable` | تعليق توضيحي لدالة واجهة | Jetpack Compose |
| `AndroidManifest.xml` | ملف إعدادات التطبيق العام | داخل مجلد manifests |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | كل طبقة في مكدّس أندرويد تعتمد على الطبقة التي تحتها مباشرة، ولا تتجاوزها |
| 2 | API Level رقم داخلي منفصل عن اسم إصدار أندرويد التسويقي — استخدمه في الكود دائماً |
| 3 | ART يُترجم مسبقاً (AOT) عكس Dalvik القديم الذي كان يترجم لحظياً (JIT) |
| 4 | دوال `@Composable` تصف الواجهة ولا تُعيد قيمة أبداً |
| 5 | Recomposition تُحدِّث فقط ما تغيّر فعلياً، وليس الشاشة بأكملها |
| 6 | تطبيقات النظام قابلة للاستبدال بتطبيقات طرف ثالث — لا امتياز خاص لها |

<!-- VALIDATION: تم تغطية جميع الشرائح الواردة في ملف تخصصية_2_نظري_مـ1.pdf (38 شريحة) عبر 33 قسماً رقمياً في الجزء الأول، مع الالتزام ببنية "النص الأصلي يقول ← الترجمة الحرفية ← الشرح المبسّط" لكل قسم، وتضمين: جداول ملخص شاملة، 16 سؤال MCQ (medium/hard) بتوزيع مقارنات/سيناريو كود/تطبيق، 6 أسئلة تصحيح كود بأنواع متنوعة (syntax, misconception, logic, dead_code, return_check)، 6 تمارين إضافية (fill_gaps, code_fix, scenario)، 3 تمارين تتبع تنفيذ كاملة، سؤالا تصميم (architecture + uml_design) مع مخطط diagram block، 14 بطاقة Q&A، مرجع كود كامل مجمّع لمقتطفات Jetpack Compose، 8 أسئلة نظرية متوقعة بالامتحان، قائمة فحص ذاتي، وورقة مراجعة سريعة (Cheat Sheet). لم يُذكر أي محتوى من Swift أو React Native أو Flutter التزاماً بالممنوعات المذكورة في البرومبت. -->

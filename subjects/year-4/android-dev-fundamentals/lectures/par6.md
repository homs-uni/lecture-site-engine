# المحاضرة — Compose UI: User Interface Development with Jetpack Compose -1-
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** Thinking in Compose، Declarative Paradigm، Composable Functions، Compose Phases، Layouts، Modifiers

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| Kotlin Basics & OOP | `val/var`، `class`، `functions` | فهم لغة Kotlin الأساسية |
| App Fundamentals | `Activity`، `AndroidManifest.xml` | بنية تطبيق أندرويد كاملة |
| Compose UI ← أنت هنا | `@Composable`، `Column/Row/Box`، `Modifier` | بناء واجهات مستخدم تصريحية (declarative) |
| Compose State & Navigation | `remember`، `NavController` | واجهات تفاعلية متعددة الشاشات |

> **نوع هذه المحاضرة:** نظرية بالكامل مع أمثلة كود توضيحية — تُقدّم فلسفة Compose التصريحية (declarative) ومراحل عمله الثلاث (Composition, Layout, Drawing)، إضافة إلى تخطيطات UI الأساسية (Column, Row, Box) ونظام الـ Modifiers.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. Thinking in Compose (ما هو Jetpack Compose؟)

#### النص الأصلي يقول (English):
> Jetpack Compose is a modern, declarative UI Toolkit for building native UI and is officially recommended by Android. It simplifies and accelerates writing and maintaining your app UI by providing a declarative API that lets you render your app UI without imperatively mutating frontend views. It quickly bring your app to life with less code, powerful tools, and intuitive Kotlin APIs. Jetpack Compose provides pre-built UI components so you can implement your app's UI with graphics, animations, and other visual elements with minimal code.

#### الترجمة الحرفية:
> Jetpack Compose هو أداة بناء واجهات مستخدم (UI Toolkit) حديثة وتصريحية (declarative) لبناء واجهات مستخدم أصلية (native)، وهو موصى به رسمياً من أندرويد. إنه يبسّط ويسرّع كتابة وصيانة واجهة تطبيقك من خلال توفير واجهة برمجية تصريحية (declarative API) تتيح لك عرض واجهة تطبيقك دون تعديل عناصر الواجهة الأمامية (frontend views) بشكل إجرائي (imperatively). إنه يُحيي تطبيقك بسرعة بكود أقل، وأدوات قوية، وواجهات برمجية Kotlin بديهية. يوفّر Jetpack Compose مكونات واجهة مستخدم جاهزة مسبقاً حتى تتمكن من تنفيذ واجهة تطبيقك بالرسومات والأنيميشن وعناصر بصرية أخرى بأقل قدر من الكود.

#### الشرح المبسّط:
`Jetpack Compose` هو الطريقة الحديثة الرسمية لبناء واجهات المستخدم في أندرويد، وهو يستبدل الطريقة القديمة القائمة على ملفات `XML` بكتابة الواجهة مباشرة بلغة Kotlin. سبب وجوده هو تقليل الكود المتكرر (boilerplate) وتقليل الأخطاء التي كانت تحدث عند تعديل الواجهة يدوياً في النظام القديم؛ فبدلاً من أن يكتب المبرمج تعليمات "اذهب وغيّر هذا العنصر"، يصف فقط "كيف يجب أن تبدو الواجهة" ويتكفّل Compose بالباقي. يرتبط هذا المفهوم بكل ما سيأتي لاحقاً في المحاضرة، لأن كل شيء (Composable Functions، Phases، Layouts، Modifiers) هو أداة تخدم هذه الفكرة المركزية: وصف الواجهة تصريحياً لا بناؤها إجرائياً. **تشبيه يومي:** فكّري في الفرق بين إعطاء طاهٍ وصفة طبخ كاملة (تصريحي — "هذه هي النتيجة التي أريدها") وبين الوقوف بجانبه وتوجيهه خطوة بخطوة ("أضف الآن ملعقة ملح، الآن حرّك...") وهو النمط الإجرائي القديم.

**لماذا؟** لأن الصناعة بأكملها لاحظت أن التعامل اليدوي مع شجرة الواجهات (View Hierarchy) يزيد احتمال الأخطاء ويصعّب الصيانة، فكان الحل هو نمط تصريحي يتولى فيه النظام نفسه معرفة ما الذي تغيّر وكيفية تحديثه.

---

### 2. مشكلة النمط الإجرائي (Imperative) في بناء الواجهات

#### النص الأصلي يقول (English):
> Historically, an Android view hierarchy has been representable as a tree of UI widgets. As the state of the app changes because of things like user interactions, the UI hierarchy needs to be updated to display the current data. The most common way of updating the UI is to walk the tree using functions like findViewById(), and change nodes by calling methods like button.setText(String), container.addChild(View), or img.setImageBitmap(Bitmap). These methods change the internal state of the widget. Manipulating views manually increases the likelihood of errors. If a piece of data is rendered in multiple places, you might forget to update one of the views that shows it. This can also lead to illegal states, when two updates conflict in an unexpected way.

#### الترجمة الحرفية:
> تاريخياً، كان من الممكن تمثيل شجرة الواجهة (view hierarchy) في أندرويد كشجرة من عناصر واجهة المستخدم (UI widgets). عندما تتغيّر حالة التطبيق بسبب أشياء مثل تفاعلات المستخدم، تحتاج شجرة الواجهة إلى التحديث لعرض البيانات الحالية. الطريقة الأكثر شيوعاً لتحديث الواجهة هي المرور عبر الشجرة باستخدام دوال مثل findViewById()، وتغيير العُقد عن طريق استدعاء دوال مثل button.setText(String)‏، container.addChild(View)‏، أو img.setImageBitmap(Bitmap). هذه الدوال تغيّر الحالة الداخلية للعنصر (widget). التعامل اليدوي مع العناصر (views) يزيد من احتمالية حدوث الأخطاء. إذا كانت قطعة من البيانات تُعرض في أماكن متعددة، فقد تنسى تحديث أحد العناصر التي تعرضها. يمكن أن يؤدي هذا أيضاً إلى حالات غير صحيحة (illegal states)، عندما يتعارض تحديثان بشكل غير متوقع.

#### الشرح المبسّط:
في النظام القديم (`View System`)، كانت الواجهة تُبنى كشجرة من عناصر (widgets)، وكل عنصر يحتفظ بحالته الداخلية بنفسه، فيضطر المبرمج إلى البحث يدوياً عن كل عنصر باستخدام `findViewById()` وتعديله بنفسه عند حدوث أي تغيير في البيانات. المشكلة الجوهرية هنا هي أنه إذا كانت نفس البيانات تظهر في أكثر من مكان في الشاشة، يصبح من السهل جداً أن ينسى المبرمج تحديث أحد هذه الأماكن، فتظهر الشاشة ببيانات متضاربة أو "حالة غير صحيحة" (illegal state). هذه المشكلة هي السبب المباشر وراء ظهور Compose، لأنها توضح لماذا لم تعد الطريقة اليدوية كافية مع تعقيد التطبيقات الحديثة. **تشبيه يومي:** تخيّلي لوحة إعلانات بها نفس الرقم مكتوب في 3 أماكن مختلفة يدوياً بالطباشير — إذا تغيّر الرقم، عليكِ محو وكتابة الرقم الجديد في الأماكن الثلاثة بنفسك، وإن نسيتِ مكاناً واحداً ستظهر معلومة خاطئة على اللوحة.

**لماذا؟** لأن الاعتماد الكامل على المبرمج لتتبّع كل مكان يظهر فيه جزء من البيانات يدوياً هو مصدر شبه مضمون للأخطاء البشرية كلما كبر حجم التطبيق.

---

### 3. الحل: النمط التصريحي (Declarative UI Model)

#### النص الأصلي يقول (English):
> Over the last several years, the entire industry has started shifting to a declarative UI model. This model simplifies the engineering associated with building and updating user interfaces. The technique works by conceptually regenerating the entire screen from scratch, then applying only the necessary changes. This approach avoids the complexity of manually updating a stateful view hierarchy. One challenge with regenerating the entire screen is that it is potentially expensive, in terms of time, computing power, and battery usage. To mitigate this cost, Compose intelligently chooses which parts of the UI need to be redrawn at any given time.

#### الترجمة الحرفية:
> على مدى السنوات القليلة الماضية، بدأت الصناعة بأكملها التحوّل نحو نموذج واجهة مستخدم تصريحي (declarative). هذا النموذج يبسّط الهندسة المرتبطة ببناء وتحديث واجهات المستخدم. تعمل هذه التقنية عن طريق إعادة توليد الشاشة بأكملها من الصفر بشكل مفاهيمي (conceptually)، ثم تطبيق التغييرات الضرورية فقط. هذا النهج يتجنّب تعقيد التحديث اليدوي لشجرة واجهة ذات حالة (stateful view hierarchy). أحد التحديات في إعادة توليد الشاشة بأكملها هو أن ذلك قد يكون مكلفاً من ناحية الوقت وقوة الحوسبة واستهلاك البطارية. للتخفيف من هذه التكلفة، يختار Compose بذكاء أي أجزاء من الواجهة يجب إعادة رسمها في أي لحظة معينة.

#### الشرح المبسّط:
الفكرة الأساسية في النمط التصريحي هي أن المبرمج لا يهتم "بكيفية" تحديث الواجهة، بل يصف فقط "كيف يجب أن تبدو" اعتماداً على البيانات الحالية، وكأن الشاشة بأكملها تُعاد كتابتها من الصفر في كل مرة. لكن إعادة رسم الشاشة كاملة في كل تغيير سيكون مكلفاً جداً من ناحية الأداء والبطارية، لذلك لا يقوم Compose فعلياً بإعادة رسم كل شيء، بل "يتظاهر" مفاهيمياً بذلك بينما هو في الحقيقة يحسب بذكاء أي الأجزاء فقط تحتاج تحديثاً حقيقياً (هذه هي فكرة `Recomposition` التي سنراها لاحقاً). هذا يربط مباشرة بمشكلة القسم السابق: بدلاً من أن يتتبع المبرمج يدوياً كل مكان تظهر فيه البيانات، يتكفّل Compose بهذا التتبع تلقائياً. **تشبيه يومي:** تخيّلي أنكِ بدل مسح ألواح الطباشير المكتوبة والكتابة عليها يدوياً، عندكِ آلة ذكية تطبع لوحة جديدة بالكامل كلما تغيّر الرقم، لكنها ذكية بما يكفي لتغيير الملصق فقط في الأماكن التي تغيّر فيها الرقم فعلاً بدل طباعة اللوحة بأكملها من جديد.

**لماذا؟** لأن الموازنة بين بساطة "أعد كل شيء من الصفر" وكفاءة الأداء تتطلب ذكاءً داخلياً يحدد التغييرات الفعلية فقط، وهذا بالضبط ما يوفّره محرّك Compose.

---

### 4. مثال مقارن: XML/Kotlin التقليدي مقابل Jetpack Compose

#### النص الأصلي يقول (English):
> Example using XML and Kotlin: `<Button android:id="@+id/myButton" .../>` then `val button: Button = findViewById(R.id.myButton); button.setOnClickListener { button.text = "Clicked!" }`. Example using Jetpack Compose: `@Composable fun MyButton() { var clicked by remember { mutableStateOf(false) }; Button(onClick = { clicked = true }) { Text(text = if (clicked) "Clicked!" else "Click Me!") } }`. In this declarative approach: No need to find views manually – The UI is defined directly in Kotlin. State management is built-in – Compose automatically updates UI when the state changes.

#### الترجمة الحرفية:
> مثال باستخدام XML وKotlin: تعريف زر في ملف XML، ثم في Kotlin: البحث عن الزر باستخدام findViewById، ثم عند الضغط عليه يتم تغيير نصه يدوياً إلى "Clicked!". مثال باستخدام Jetpack Compose: دالة `MyButton` تحمل حالة `clicked` باستخدام `remember` و`mutableStateOf`، وعند الضغط على الزر يتم تغيير هذه الحالة، فيتغيّر النص المعروض تلقائياً بناءً عليها. في هذا النهج التصريحي: لا حاجة للبحث عن العناصر يدوياً — الواجهة مُعرَّفة مباشرة في Kotlin. إدارة الحالة مدمجة — يقوم Compose تلقائياً بتحديث الواجهة عندما تتغيّر الحالة.

#### الشرح المبسّط:
هذا المثال يجسّد عملياً الفرق النظري السابق: في XML/Kotlin يجب أولاً كتابة الزر في ملف منفصل (`XML`)، ثم "البحث" عنه بـ `findViewById()`، ثم تغيير نصه يدوياً داخل `setOnClickListener` — أي أن المبرمج يتحكم إجرائياً في كل خطوة. أما في Compose فكل شيء يوجد داخل دالة Kotlin واحدة مزينة بـ `@Composable`، والمتغيّر `clicked` (باستخدام `remember` و`mutableStateOf`) هو "الحالة" (state) التي يعتمد عليها النص المعروض؛ فبمجرد تغيّر قيمة `clicked` تُعاد قراءة الدالة تلقائياً ويظهر النص الجديد دون أن يكتب المبرمج أي سطر لتحديث الزر يدوياً. هذا يوضح عملياً معنى عبارة "إدارة الحالة مدمجة" (state management is built-in) التي وردت في النص. **تشبيه يومي:** الطريقة القديمة أشبه بلوحة إعلانات ورقية تحتاج يداً بشرية لتغيير الرقم عليها، بينما Compose أشبه بشاشة رقمية متصلة بقاعدة بيانات — بمجرد تغيّر الرقم في قاعدة البيانات (الحالة)، تتحدث الشاشة نفسها تلقائياً دون تدخل يدوي.

**لماذا؟** لأن ربط عنصر الواجهة مباشرة بمتغيّر حالة (state) بدل ربطه بأمر يدوي (`setText`) يزيل الحاجة الكاملة لتتبّع "من يجب تحديثه الآن؟" لأن كل شيء يعتمد على حالة واحدة مصدر للحقيقة.

---

### 5. التحوّل التصريحي: تدفق البيانات والأحداث (Data & Events Flow)

#### النص الأصلي يقول (English):
> With many imperative object-oriented UI toolkits, you initialize the UI by instantiating a tree of widgets... In Compose's declarative approach, widgets are relatively stateless and don't expose setter or getter functions. In fact, widgets are not exposed as objects. You update UI by calling the same composable function with different arguments... When the user interacts with the UI, the UI raises events such as onClick. Those events should notify the app logic, which can then change the app's state. When the state changes, the composable functions are called again with the new data. This causes the UI elements to be redrawn--this process is called recomposition. The app logic provides data to the top-level composable function. That function uses the data to describe the UI by calling other composables, and passes the appropriate data to those composables, and on down the hierarchy. The user interacted with a UI element, causing an event to be triggered. The app logic responds to the event, then the composable functions are automatically called again with new parameters, if necessary.

#### الترجمة الحرفية:
> في العديد من أدوات بناء الواجهات الكائنية-التوجه الإجرائية، تقوم بتهيئة الواجهة بإنشاء نُسخ من شجرة عناصر (widgets)... في نهج Compose التصريحي، العناصر (widgets) عديمة الحالة نسبياً ولا تُظهر دوال getter أو setter. في الواقع، العناصر لا تُعرَض ككائنات (objects). تحدّث الواجهة عن طريق استدعاء نفس الدالة القابلة للتركيب (composable function) بمعاملات مختلفة... عندما يتفاعل المستخدم مع الواجهة، تُطلق الواجهة أحداثاً مثل onClick. يجب أن تُبلغ هذه الأحداث منطق التطبيق، الذي يمكنه عندها تغيير حالة التطبيق. عندما تتغيّر الحالة، تُستدعى الدوال القابلة للتركيب مرة أخرى بالبيانات الجديدة. هذا يتسبب في إعادة رسم عناصر الواجهة — تُسمى هذه العملية إعادة التركيب (recomposition). منطق التطبيق يزوّد الدالة القابلة للتركيب من المستوى الأعلى بالبيانات. تلك الدالة تستخدم البيانات لوصف الواجهة عن طريق استدعاء دوال قابلة للتركيب أخرى، وتمرّر البيانات المناسبة لتلك الدوال، وهكذا نزولاً في التسلسل الهرمي. تفاعل المستخدم مع عنصر واجهة، مما تسبب في إطلاق حدث. يستجيب منطق التطبيق للحدث، ثم تُستدعى الدوال القابلة للتركيب تلقائياً مرة أخرى بمعاملات جديدة، إن لزم الأمر.

#### الشرح المبسّط:
هنا يصف النص دورة كاملة ثنائية الاتجاه: البيانات تتدفق من الأعلى إلى الأسفل (من دالة `composable` رئيسية عبر الدوال الفرعية) بينما الأحداث (مثل الضغط `onClick`) تتدفق من الأسفل إلى الأعلى (من العنصر الذي تفاعل معه المستخدم إلى منطق التطبيق). النقطة الجوهرية أن `widgets` في Compose "عديمة الحالة" (stateless) ولا تُعرض ككائنات لها getter/setter كما في النظام القديم؛ التحديث لا يتم بتغيير خاصية على كائن، بل باستدعاء نفس الدالة مرة أخرى بمعطيات جديدة، وهذا ما يُسمى `Recomposition`. هذا يربط مباشرة بالمثال السابق (مثال الزر): الضغط غيّر الحالة `clicked`، فاستُدعيت دالة `MyButton` من جديد تلقائياً، وهذا بالضبط ما يعنيه "recomposition". **تشبيه يومي:** تخيّلي دائرة كهربائية بها زر (الحدث يصعد لأعلى ليخبر المصدر) ولمبة تعتمد على حالة المصدر (البيانات تنزل لأسفل لتضيء اللمبة) — لا أحد يذهب فعلياً ليغيّر اللمبة يدوياً، بل تتغيّر تلقائياً كنتيجة لتغيّر الحالة في المصدر.

**لماذا؟** لأن فصل اتجاه البيانات (نزولاً) عن اتجاه الأحداث (صعوداً) يخلق نظاماً يمكن التنبؤ به دائماً — طالما تعرف الحالة الحالية، تعرف شكل الواجهة، بدون الحاجة لتتبع تاريخ كل تفاعل حدث سابقاً.

---

### 6. جدول المقارنة: Imperative (View System) مقابل Declarative (Jetpack Compose)

#### النص الأصلي يقول (English):
> View System vs Jetpack Compose table: Imperative UI vs Declarative UI | Manual UI updates vs State-driven UI | Mutable View hierarchy vs UI described with composable functions | High risk of inconsistent UI state vs Consistent UI via recomposition | UI split across XML and Kotlin vs UI defined entirely in Kotlin | More boilerplate code vs Less boilerplate code | Explicit UI update management vs Automatic selective recomposition.

#### الترجمة الحرفية:
> جدول View System مقابل Jetpack Compose: واجهة إجرائية مقابل واجهة تصريحية | تحديثات يدوية للواجهة مقابل واجهة مبنية على الحالة | شجرة عناصر قابلة للتغيير مقابل واجهة موصوفة بدوال قابلة للتركيب | خطورة عالية لعدم اتساق حالة الواجهة مقابل واجهة متسقة عبر إعادة التركيب | الواجهة موزّعة بين XML وKotlin مقابل واجهة معرَّفة بالكامل في Kotlin | كود متكرر أكثر مقابل كود متكرر أقل | إدارة صريحة لتحديث الواجهة مقابل إعادة تركيب انتقائية تلقائية.

#### الشرح المبسّط:
هذا الجدول هو تلخيص مباشر لكل ما شُرح في الأقسام السابقة (1 إلى 5) في صف واحد مقارن: النظام القديم (`View System`) إجرائي، يدوي، معرّض للأخطاء، موزّع بين ملفين (XML وKotlin)، فيه كود متكرر أكثر، ويتطلب من المبرمج إدارة صريحة لكل تحديث. أما `Jetpack Compose` فتصريحي، معتمد على الحالة (state-driven)، متسق بفضل `recomposition`، معرّف بالكامل في Kotlin، وكل هذا يقلل الكود ويقلل الأخطاء. الفائدة من وجود هذا الجدول هنا هو أنه غالباً ما يظهر في أسئلة الامتحان كمقارنة مباشرة، لذا حفظ هذه الأزواج (imperative↔declarative، manual↔state-driven، إلخ) مهم جداً. **تشبيه يومي:** كأنكِ تقارنين بين دفتر حسابات ورقي (يجب عليكِ تحديث كل رقم يدوياً في كل مكان يظهر فيه) وبين جدول Excel به معادلات (تُحدَّث كل الخلايا المرتبطة تلقائياً بمجرد تغيير خلية واحدة).

**لماذا؟** لأن تلخيص المفاهيم في جدول مقارن يسهّل استرجاعها بسرعة وقت المراجعة، ولأنه يجمع كل الفروقات الجوهرية بين النظامين في مكان واحد.

---

### 7. مثال دالة قابلة للتركيب (Greeting) — البنية الأساسية

#### النص الأصلي يقول (English):
> Using Compose, you can build your user interface by defining a set of composable functions that take in data and emit UI elements. Example: a Greeting widget, which takes in a String and emits a Text widget which displays a greeting message. `@Composable fun Greeting(name: String) { Text("Hello $name") }`. A composable function that is passed data and uses it to render a text widget on the screen.

#### الترجمة الحرفية:
> باستخدام Compose، يمكنك بناء واجهة المستخدم بتعريف مجموعة من الدوال القابلة للتركيب (composable functions) التي تستقبل بيانات وتُصدر (emit) عناصر واجهة. مثال: عنصر Greeting الذي يستقبل نصاً (String) ويُصدر عنصر Text يعرض رسالة ترحيب. دالة قابلة للتركيب تُمرَّر لها بيانات وتستخدمها لعرض عنصر نصي على الشاشة.

#### الشرح المبسّط:
هذا المثال هو أبسط شكل ممكن لدالة `@Composable`: تأخذ معامل واحد (`name`) وتستخدمه مباشرة لعرض نص على الشاشة عبر استدعاء `Text()`. هذا يجسّد عملياً فكرة "أخذ بيانات وإصدار عناصر واجهة" التي شُرحت نظرياً في القسم الأول؛ فبدل أن ترجع الدالة قيمة كما في البرمجة العادية، هي "تصف" ماذا يجب أن يظهر على الشاشة. هذا المثال البسيط سيُستخدم كأساس لفهم القسم التالي (خصائص الدوال القابلة للتركيب) وأمثلة `ArtistCard` لاحقاً في المحاضرة. **تشبيه يومي:** فكّري في هذه الدالة كقالب بطاقة معايدة جاهز يطبع اسمك تلقائياً بمجرد أن تعطيه اسمك — أنتِ لا تصممين البطاقة من الصفر كل مرة، بل تمررين "الاسم" فقط والقالب يتكفل بالباقي.

**لماذا؟** لأن أبسط الأمثلة هي أفضل طريقة لفهم الميكانيكية الأساسية قبل الانتقال لأمثلة أكثر تعقيداً تحتوي على عدة عناصر متداخلة.

---

### 8. الخصائص الأربع للدالة القابلة للتركيب (Annotation, Data Input, UI Display, No Return Value)

#### النص الأصلي يقول (English):
> A few noteworthy things about this function: Annotation: The function is annotated with the @Composable annotation. All composable functions must have this annotation. This annotation informs the Compose compiler that this function is intended to convert data into UI. Data input: The function takes in data. Composable functions can accept parameters, which let the app logic describe the UI. UI display: The function displays text in the UI. It does so by calling the Text() composable function, which actually creates the text UI element. Composable functions emit UI hierarchy by calling other composable functions. No return value: The function doesn't return anything. Compose functions that emit UI don't need to return anything, because they describe the target screen state instead of constructing UI widgets.

#### الترجمة الحرفية:
> بضعة أمور جديرة بالملاحظة حول هذه الدالة: التعليق التوضيحي (Annotation): الدالة مُعلَّمة بـ @Composable annotation. يجب أن تحمل كل الدوال القابلة للتركيب هذا التعليق. هذا التعليق يُخبر مترجم (compiler) Compose أن هذه الدالة مخصصة لتحويل البيانات إلى واجهة. إدخال البيانات (Data input): الدالة تستقبل بيانات. يمكن للدوال القابلة للتركيب استقبال معاملات، تتيح لمنطق التطبيق وصف الواجهة. عرض الواجهة (UI display): الدالة تعرض نصاً في الواجهة. تفعل ذلك عن طريق استدعاء دالة Text()‏ القابلة للتركيب، والتي تُنشئ فعلياً عنصر النص. الدوال القابلة للتركيب تُصدر تسلسلاً هرمياً للواجهة عن طريق استدعاء دوال قابلة للتركيب أخرى. عدم وجود قيمة إرجاع (No return value): الدالة لا تُرجع أي شيء. دوال Compose التي تُصدر واجهة لا تحتاج لإرجاع أي شيء، لأنها تصف حالة الشاشة المستهدفة بدلاً من بناء عناصر واجهة.

#### الشرح المبسّط:
هذه النقاط الأربع هي "بطاقة هوية" أي دالة `@Composable` صحيحة، ومن المهم حفظها لأنها غالباً ما تُختبر في أسئلة MCQ. أولاً، التعليق `@Composable` إلزامي لأنه يخبر المترجم أن هذه الدالة ليست دالة عادية بل تصف واجهة. ثانياً، تستقبل الدالة بيانات (parameters) لتخصيص ما تعرضه. ثالثاً، هي "تُصدر" (emit) عناصر واجهة باستدعاء دوال قابلة للتركيب أخرى (مثل `Text()`)، وليس ببناء كائنات مباشرة. رابعاً — وهذه أهم نقطة قد تُربك المبتدئين قادمين من دوال Kotlin العادية — لا تُرجع الدالة أي قيمة (`Unit` ضمنياً)، لأن دورها ليس "حساب نتيجة" بل "وصف كيف يجب أن تبدو الشاشة"، وهذا يربط مباشرة بالنمط التصريحي الذي شُرح في بداية المحاضرة. **تشبيه يومي:** دالة `@Composable` أشبه بمعلّم يصف للفنان لوحة يريدها ("ارسم شمساً هنا، وشجرة هناك") بدل أن يرسمها بنفسه ويسلّمها جاهزة — المعلّم لا "يُرجع" لوحة، بل يصف كيف يجب أن تكون.

**لماذا؟** لأن غياب قيمة الإرجاع يعكس فلسفة العمل: الدالة توصف بدل أن تبني/تُرجع، وهذا هو جوهر الفرق بين composable function ودالة Kotlin عادية.

---

### 9. مراحل Jetpack Compose الثلاث — نظرة عامة (Composition, Layout, Drawing)

#### النص الأصلي يقول (English):
> Compose has three main phases of a frame: Composition: What UI to show. Compose runs composable functions and creates a description of your UI. Layout: Where to place UI. This phase consists of two steps: measurement and placement. Layout elements measure and place themselves and any child elements in 2D coordinates, for each node in the layout tree. Drawing: How it renders. UI elements draw into a Canvas, usually a device screen.

#### الترجمة الحرفية:
> يملك Compose ثلاث مراحل رئيسية لكل إطار (frame): التركيب (Composition): ما هي الواجهة التي ستُعرض. يُشغّل Compose الدوال القابلة للتركيب وينشئ وصفاً لواجهتك. التخطيط (Layout): أين توضع الواجهة. تتكون هذه المرحلة من خطوتين: القياس (measurement) والوضع (placement). عناصر التخطيط تقيس وتضع نفسها وأي عناصر فرعية في إحداثيات ثنائية الأبعاد، لكل عُقدة في شجرة التخطيط. الرسم (Drawing): كيف يتم عرضها. تُرسم عناصر الواجهة داخل لوحة (Canvas)، غالباً شاشة الجهاز.

#### الشرح المبسّط:
كل إطار (frame) يظهر على الشاشة في Compose يمرّ بثلاث مراحل متتالية إلزامية: أولاً `Composition` تحدد "ماذا" سيُعرض (تشغيل الدوال القابلة للتركيب وبناء شجرة وصفية للواجهة)، ثم `Layout` يحدد "أين" يوضع كل عنصر (بخطوتين: قياس الحجم ثم تحديد موقع كل عنصر بإحداثيات x,y)، وأخيراً `Drawing` يحدد "كيف" يُرسم كل شيء فعلياً على الشاشة (`Canvas`). هذا التسلسل الثلاثي هو الآلية الداخلية التي تجعل النمط التصريحي (الذي شُرح سابقاً) يعمل فعلياً بكفاءة، لأن كل مرحلة تعتمد على مخرجات المرحلة التي قبلها ولا تكرر عملها. **تشبيه يومي:** بناء منزل يمرّ بثلاث مراحل مشابهة: أولاً تحديد "ماذا" سيُبنى (مخطط الغرف — Composition)، ثم "أين" (تحديد أبعاد ومواقع كل غرفة بالضبط على الأرض — Layout)، وأخيراً "كيف" يظهر فعلياً (تنفيذ البناء والدهان — Drawing).

**لماذا؟** لأن فصل "ماذا/أين/كيف" إلى ثلاث مراحل منفصلة يسمح لـ Compose بتحسين الأداء في كل مرحلة على حدة، وتخطي أي مرحلة إن لم تتغير مدخلاتها.

---

### 10. مرحلة التركيب (Composition Phase) بالتفصيل

#### النص الأصلي يقول (English):
> In the composition phase, the Compose runtime executes composable functions and outputs a tree structure that represents your UI. This UI tree consists of layout nodes that contain all the information needed for the next phases. In these examples, each composable function in the code maps to a single layout node in the UI tree. In more complex examples, composables can contain logic and control flow, and produce a different tree given different states.

#### الترجمة الحرفية:
> في مرحلة التركيب (composition phase)، يُنفّذ محرّك Compose (runtime) الدوال القابلة للتركيب ويُخرِج بنية شجرية تمثّل واجهتك. تتكوّن شجرة الواجهة هذه من عُقد تخطيط (layout nodes) تحتوي على كل المعلومات اللازمة للمراحل التالية. في هذه الأمثلة، كل دالة قابلة للتركيب في الكود تُقابل عُقدة تخطيط واحدة في شجرة الواجهة. في أمثلة أكثر تعقيداً، يمكن للدوال القابلة للتركيب أن تحتوي على منطق وتدفق تحكم (control flow)، وأن تُنتج شجرة مختلفة اعتماداً على حالات مختلفة.

#### الشرح المبسّط:
في هذه المرحلة، لا يُرسم أي شيء بعد على الشاشة؛ كل ما يحدث هو أن Compose يُشغّل الكود (دوال `Row`، `Image`، `Column`، `Text` مثلاً) وينشئ شجرة بيانات تصف العلاقة الهرمية بين العناصر (من هو أب من، من هو ابن من)، تماماً كما يظهر في المثال: `Row { Image(..); Column { Text(..); Text(..) } }` يصبح شجرة فيها `Row` هو الجذر، وله ابنان `Image` و`Column`، ولـ`Column` ابنان هما نصّان `Text`. المهم هنا أن الشجرة قد تتغيّر شكلها بناءً على الحالة (state) الحالية — إن كان هناك `if/else` داخل الدالة القابلة للتركيب، فإن الشجرة الناتجة تختلف حسب أي فرع تم تنفيذه. هذه الشجرة الناتجة هي بالضبط ما ستحتاجه المرحلة التالية (`Layout`) لتحديد الأحجام والمواقع. **تشبيه يومي:** هذه المرحلة أشبه بكتابة قائمة تسلسل هرمي لموظفي شركة (من يتبع من) قبل أن تقرري أين يجلس كل واحد فعلياً في المبنى — أنتِ فقط تحددين العلاقات، وليس المواقع بعد.

**لماذا؟** لأن فصل "بناء العلاقة الهرمية" عن "حساب الأحجام والمواقع" يسمح لـ Compose بإعادة تشغيل جزء صغير من الشجرة فقط عند تغيّر الحالة، بدل إعادة حساب كل شيء من جديد.

---

### 11. مرحلة التخطيط (Layout Phase) — خوارزمية القياس والوضع

#### النص الأصلي يقول (English):
> In the layout phase, Compose uses the UI tree produced in the composition phase as input. The collection of layout nodes contain all the information needed to decide on each node's size and location in 2D space. During the layout phase, the tree is traversed using the following three step algorithm: Measure children: A node measures its children if any exist. Decide own size: Based on these measurements, a node decides on its own size. Place children: Each child node is placed relative to a node's own position. At the end of this phase, each layout node has: An assigned width and height. An x, y coordinate where it should be drawn.

#### الترجمة الحرفية:
> في مرحلة التخطيط، يستخدم Compose شجرة الواجهة المُنتَجة في مرحلة التركيب كمدخل. تحتوي مجموعة عُقد التخطيط على كل المعلومات اللازمة لتحديد حجم وموقع كل عُقدة في الفضاء ثنائي الأبعاد. خلال مرحلة التخطيط، يتم اجتياز الشجرة باستخدام خوارزمية من ثلاث خطوات التالية: قياس الأبناء: تقيس العُقدة أبناءها إن وُجدوا. تحديد حجمها الخاص: بناءً على هذه القياسات، تحدد العُقدة حجمها الخاص. وضع الأبناء: يوضع كل عُقدة ابن نسبةً لموقع العُقدة نفسها. في نهاية هذه المرحلة، تمتلك كل عُقدة تخطيط: عرضاً وارتفاعاً محددَين. إحداثيات x وy تُرسم عندها.

```algorithm
1 | قياس الأبناء (Measure children) | Layout Node | العُقدة تطلب من كل أبنائها أن يقيسوا أنفسهم أولاً
2 | تحديد الحجم الخاص (Decide own size) | Layout Node | بناءً على قياسات الأبناء، تحدد العُقدة حجمها الخاص (عرض وارتفاع)
3 | وضع الأبناء (Place children) | Layout Node | تضع العُقدة كل ابن في إحداثيات x,y نسبةً لموقعها هي
```

#### الشرح المبسّط:
مرحلة `Layout` تأخذ الشجرة الناتجة من `Composition` وتحدد لكل عنصر فيها "كم حجمه" و"أين موقعه بالضبط" على الشاشة، وذلك عبر خوارزمية من ثلاث خطوات متكررة لكل عُقدة: أولاً تسأل العقدة أبناءها أن يقيسوا أنفسهم، ثانياً تستخدم هذه القياسات لتقرر حجمها هي، وثالثاً تضع كل ابن في مكانه بالضبط بناءً على موقعها هي. النقطة الجوهرية هنا هي الترتيب الزمني العكسي: "القياس" يبدأ من الجذر نازلاً للأبناء، لكن "تحديد الحجم والوضع الفعلي" يحدث من الأبناء صاعداً للجذر — أي أن الأب لا يعرف حجمه إلا بعد أن يعرف أحجام كل أبنائه أولاً. هذا مهم جداً لفهم المثال العملي في القسم التالي. **تشبيه يومي:** كأنكِ تحاولين تعبئة صناديق داخل صندوق أكبر — يجب أن تعرفي حجم كل صندوق صغير أولاً (قياس الأبناء) قبل أن تقرري حجم الصندوق الكبير الذي يسعهم جميعاً (تحديد الحجم الخاص)، ثم ترتبين الصناديق الصغيرة بداخله (وضع الأبناء).

**لماذا؟** لأن حجم أي حاوية (Row/Column) يعتمد منطقياً على محتوياتها، فلا بد أن تُعرف أحجام المحتويات أولاً قبل أن تستطيع الحاوية معرفة حجمها هي.

---

### 12. مثال تتبّع تنفيذ لخوارزمية القياس (Row → Image + Column → Text, Text)

#### النص الأصلي يقول (English):
> Example1: The Row measures its children, Image and Column. The Image is measured. It doesn't have any children, so it decides its own size and reports the size back to the Row. The Column is measured next. It measures its own children (two Text composables) first. The first Text is measured... reports its size back to the Column. The second Text is measured... reports it back to the Column. The Column uses the child measurements to decide its own size. It uses the maximum child width and the sum of the height of its children. The Column places its children relative to itself, putting them beneath each other vertically. The Row uses the child measurements to decide its own size. It uses the maximum child height and the sum of the widths of its children. It then places its children. Each node was visited only once. Briefly, parents measure before their children, but are sized and placed after their children.

#### الترجمة الحرفية:
> مثال1: يقيس Row أبناءه، Image وColumn. يُقاس Image. ليس له أبناء، لذا يحدد حجمه الخاص ويُبلّغ الحجم مرة أخرى إلى Row. يُقاس Column بعد ذلك. يقيس أبناءه (عنصرا Text) أولاً. يُقاس النص الأول... يُبلّغ حجمه مرة أخرى إلى Column. يُقاس النص الثاني... يُبلّغه مرة أخرى إلى Column. يستخدم Column قياسات الأبناء لتحديد حجمه الخاص. يستخدم أقصى عرض للأبناء ومجموع ارتفاعات أبنائه. يضع Column أبناءه نسبة لنفسه، واضعاً إياهم تحت بعضهم رأسياً. يستخدم Row قياسات الأبناء لتحديد حجمه الخاص. يستخدم أقصى ارتفاع للأبناء ومجموع عروض أبنائه. ثم يضع أبناءه. تمت زيارة كل عُقدة مرة واحدة فقط. باختصار، الآباء يقيسون قبل أبنائهم، لكن يُحدَّد حجمهم وموقعهم بعد أبنائهم.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Row يطلب من Image القياس | Image يُقاس، لا أبناء له |
| 2 | Image يُبلغ حجمه لـ Row | Row يعرف حجم Image فقط حتى الآن |
| 3 | Row يطلب من Column القياس | Column يطلب من أبنائه (Text, Text) القياس أولاً |
| 4 | Text الأول يُقاس ويُبلغ حجمه | Column يعرف حجم Text الأول |
| 5 | Text الثاني يُقاس ويُبلغ حجمه | Column يعرف حجمي كلا النصين |
| 6 | Column يحدد حجمه (أقصى عرض + مجموع الارتفاعات) | Column لديه الآن حجم محدد |
| 7 | Column يضع أبناءه عمودياً تحت بعضهم | مواقع Text, Text محددة |
| 8 | Row يحدد حجمه (أقصى ارتفاع + مجموع العروض) | Row لديه الآن حجم محدد |
| 9 | Row يضع أبناءه (Image, Column) | كل العُقد لها الآن حجم وموقع |

**النتيجة:** كل عُقدة في الشجرة زُرت مرة واحدة فقط خلال المرور بالخوارزمية، مما يجعل عملية القياس والوضع في Compose تمر بشجرة الواجهة بمسار واحد فقط (single pass) وهو ما يحسّن الأداء بشكل كبير.

#### الشرح المبسّط:
هذا المثال يجسّد عملياً خوارزمية الخطوات الثلاث من القسم السابق على شجرة حقيقية بها `Row` كجذر، وابناه `Image` و`Column`، ويحتوي `Column` بدوره على نصين. لاحظي أن `Column` لا يستطيع معرفة حجمه (عرضه وارتفاعه) قبل أن يعرف حجم النصّين بداخله أولاً؛ وبالمثل لا يستطيع `Row` تحديد حجمه قبل معرفة حجمي `Image` و`Column`. هذا يفسر لماذا "الآباء يُقاسون قبل أبنائهم لكن يُحدَّد حجمهم بعد أبنائهم" — وهي جملة أساسية للحفظ لأنها كثيراً ما تُختبر. المهم أيضاً أن كل عُقدة تُزار مرة واحدة فقط، مما يجعل هذا "تمريرة واحدة" (single-pass algorithm) بدل تكرار الزيارة، وهذا يفسر جزئياً لماذا Compose سريع نسبياً رغم كل هذا التسلسل. **تشبيه يومي:** كأنكِ تحسبين تكلفة فاتورة طلب طعام لعائلة (Row) — لا يمكنكِ معرفة المجموع الكلي قبل معرفة سعر كل طبق فردي أولاً (الأبناء)، فتحسبين كل طبق أولاً، ثم تجمعين المجموع الكلي (حجم الأب).

**لماذا؟** لأن اجتياز الشجرة بمسار واحد فقط (بدل مسارات متعددة) هو تحسين أداء جوهري — كل عُقدة تُحسب مرة واحدة تماماً، لا أكثر.

---

### 13. مثال كود كامل لترتيب مراحل القياس والوضع (SearchResult)

#### النص الأصلي يقول (English):
> Example2: `@Composable fun SearchResult() { Row { Image(...); Column { Text("Hello"); Text("World") } } }`. SearchResult function yields the following UI tree. The UI tree layout follows this order: 1. The root node Row is asked to measure. 2. The root node Row asks its first child, Image, to measure. 3. Image is a leaf node, so it reports a size and returns placement instructions. 4. The root node Row asks its second child, Column, to measure. 5. The Column node asks its first Text child to measure. 6. The first Text node is a leaf node, so it reports a size and returns placement instructions. 7. The Column node asks its second Text child to measure. 8. The second Text node is a leaf node, so it reports a size and returns placement instructions. 9. Now that the Column node has measured, sized, and placed its children, it can determine its own size and placement. 10. Now that the root node Row has measured, sized, and placed its children, it can determine its own size and placement.

#### الترجمة الحرفية:
> مثال2: دالة SearchResult تحتوي Row بداخله Image وColumn، وColumn بداخله نصان "Hello" و"World". تُنتج دالة SearchResult شجرة الواجهة التالية. تتبع شجرة تخطيط الواجهة هذا الترتيب: 1. العُقدة الجذرية Row يُطلب منها القياس. 2. العُقدة الجذرية Row تطلب من ابنها الأول، Image، القياس. 3. Image عُقدة ورقية (leaf node)، لذا يُبلّغ حجماً ويُعيد تعليمات الوضع. 4. العُقدة الجذرية Row تطلب من ابنها الثاني، Column، القياس. 5. عُقدة Column تطلب من ابنها الأول Text القياس. 6. عُقدة Text الأولى ورقية، لذا تُبلّغ حجماً وتُعيد تعليمات الوضع. 7. عُقدة Column تطلب من ابنها الثاني Text القياس. 8. عُقدة Text الثانية ورقية، لذا تُبلّغ حجماً وتُعيد تعليمات الوضع. 9. الآن وقد قاست عُقدة Column أبناءها وحدّدت حجمهم ووضعتهم، يمكنها تحديد حجمها وموقعها الخاص. 10. الآن وقد قاست العُقدة الجذرية Row أبناءها وحدّدت حجمهم ووضعتهم، يمكنها تحديد حجمها وموقعها الخاص.

```kotlin
// Composable function describing a Row containing an Image and a Column of two Texts
@Composable
fun SearchResult() {
    Row {
        // Image leaf node — no children
        Image(painter = painterResource(id = R.drawable.dog), contentDescription = "")
        // Column contains two Text leaf nodes
        Column {
            Text("Hello")
            Text("World")
        }
    }
}
```

#### شرح كل سطر:
1. `@Composable` → تعليق توضيحي إلزامي — يخبر مترجم Compose أن هذه دالة تصف واجهة
2. `fun SearchResult()` → تعريف الدالة القابلة للتركيب، بدون معاملات هنا ولا قيمة إرجاع
3. `Row { ... }` → عُقدة الجذر التي ترتّب أبناءها أفقياً
4. `Image(...)` → عُقدة ورقية (leaf node) — لا أبناء لها، أول ابن لـ Row
5. `Column { ... }` → الابن الثاني لـ Row، يحتوي بدوره على أبناء
6. `Text("Hello")` و`Text("World")` → عُقدتان ورقيتان، أبناء Column

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.foundation.layout.Row`، `import androidx.compose.foundation.layout.Column`، `import androidx.compose.material3.Text`، `import androidx.compose.foundation.Image`

**الناتج المتوقع (لقطة الشاشة):**
> صورة كلب على اليسار، وبجانبها كلمتا "Hello" فوق "World" مرتبتان عمودياً.

#### 📊 المخطط: شجرة SearchResult
#### ما هذا المخطط؟
> يوضّح هذا المخطط شجرة الواجهة (UI tree) الناتجة من تشغيل دالة SearchResult في مرحلة Composition، والتي تُستخدم كمدخل لمرحلة Layout.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | SearchResult | root function | الدالة الرئيسية التي تصف كل الواجهة |
| 2 | Row | container | يرتّب أبناءه أفقياً |
| 3 | Image | leaf | عُقدة ورقية — لا أبناء |
| 4 | Column | container | يرتّب أبناءه عمودياً |
| 5 | Text ("Hello") | leaf | عُقدة ورقية |
| 6 | Text ("World") | leaf | عُقدة ورقية |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| SearchResult | Row | يحتوي | احتواء | Row هو الجذر داخل الدالة |
| Row | Image | ابن أول | ترتيب | يُقاس أولاً |
| Row | Column | ابن ثانٍ | ترتيب | يُقاس ثانياً |
| Column | Text("Hello") | ابن أول | ترتيب | يُقاس أولاً داخل Column |
| Column | Text("World") | ابن ثانٍ | ترتيب | يُقاس ثانياً داخل Column |

```diagram
type: flowchart
title: SearchResult UI Tree
direction: TD
nodes:
  - id: row
    label: Row
    kind: container
    level: 0
  - id: image
    label: Image
    kind: leaf
    level: 1
  - id: column
    label: Column
    kind: container
    level: 1
  - id: text1
    label: Text("Hello")
    kind: leaf
    level: 2
  - id: text2
    label: Text("World")
    kind: leaf
    level: 2
edges:
  - from: row
    to: image
  - from: row
    to: column
  - from: column
    to: text1
  - from: column
    to: text2
```

#### الشرح المبسّط:
هذا المثال هو تطبيق حرفي على نفس الترتيب الرقمي (1 إلى 10) الذي وصفته الشرائح: القياس ينزل من `Row` إلى `Image` ثم `Column` ثم نصوصه، لكن تحديد الحجم والوضع الفعلي يصعد بترتيب عكسي بدءاً من العُقد الورقية (`Image`، النصوص) وانتهاءً بـ`Row` نفسه في الخطوة الأخيرة (10). هذا يربط مباشرة بالقسم السابق الذي شرح نفس الفكرة بمثال مختلف؛ الفائدة من رؤية المثالين معاً هو ترسيخ فهم أن "رقم الخطوة" في القياس لا يساوي "رقم الخطوة" في تحديد الحجم/الوضع — وهذا فرق دقيق يظهر غالباً في أسئلة تتبّع التنفيذ (trace) بالامتحان. **تشبيه يومي:** كأنكِ تُنزلين طلبية تسوق تدريجياً من سلة كبيرة (Row) إلى أصغر عنصر بداخلها، ثم تصعدين بترتيب عكسي وأنتِ تعبئين الفواتير الفرعية أولاً قبل الفاتورة الإجمالية.

**لماذا؟** لأن هذا المثال بالتحديد (بأرقام مرقّمة 1-10 واضحة) هو أكثر مثال يُستخدم في الامتحانات لاختبار فهم ترتيب مرحلة Layout، لذا يجب حفظ تسلسله بدقة.

---

### 14. مرحلة الرسم (Drawing Phase)

#### النص الأصلي يقول (English):
> In the drawing phase, the tree is traversed again from top to bottom, and each node draws itself on the screen in turn. Example: The Row draws any content it might have, such as a background color. The Image draws itself. The Column draws itself. The first and second Text draw themselves, respectively.

#### الترجمة الحرفية:
> في مرحلة الرسم، تُجتاز الشجرة مرة أخرى من الأعلى إلى الأسفل، وترسم كل عُقدة نفسها على الشاشة بدورها. مثال: يرسم Row أي محتوى قد يملكه، مثل لون خلفية. يرسم Image نفسه. يرسم Column نفسه. يرسم النصان الأول والثاني نفسيهما، على التوالي.

```algorithm
1 | Row يرسم محتواه الخاص (مثل خلفية) | Canvas | يبدأ الرسم من الجذر
2 | Image يرسم نفسه | Canvas | يُرسم أول ابن
3 | Column يرسم نفسه (إن كان له محتوى خاص) | Canvas | يُرسم الابن الثاني
4 | Text الأول والثاني يرسمان نفسيهما | Canvas | تُرسم العُقد الورقية أخيراً
```

#### الشرح المبسّط:
على عكس مرحلة `Layout` التي تسير بترتيب معقد (قياس نازل، ثم حجم/وضع صاعد)، مرحلة `Drawing` أبسط بكثير: تُجتاز الشجرة من الأعلى للأسفل مرة واحدة فقط، وكل عُقدة ترسم نفسها بالترتيب الذي تظهر فيه (الجذر أولاً، ثم أبناؤه بالترتيب). هذا منطقي لأنه بحلول هذه المرحلة، كل عُقدة تعرف بالفعل حجمها وموقعها الدقيق (من مرحلة Layout)، فلا حاجة لأي حسابات معقدة، فقط رسم فعلي على `Canvas`. هذا يُكمل السلسلة الكاملة الآن: Composition (ماذا) → Layout (أين) → Drawing (كيف)، وهي الدورة التي تتكرر (مفاهيمياً) عند كل تغيّر في حالة التطبيق. **تشبيه يومي:** بعد أن يُحدَّد "مخطط" المنزل وأماكن كل غرفة بالضبط (Layout)، تأتي مرحلة الطلاء والتأثيث الفعلي (Drawing) — وهذه المرحلة بسيطة ومباشرة لأن كل القرارات الصعبة (الأحجام والمواقع) اتُّخذت مسبقاً.

**لماذا؟** لأن فصل "تحديد الموقع" عن "الرسم الفعلي" يعني أن الرسم نفسه عملية أبسط وأسرع، لأنها لا تحتاج لأي قرارات، فقط تنفيذ.

---

### 15. التدفق أحادي الاتجاه وتحسين الأداء (Unidirectional Data Flow & Skipping)

#### النص الأصلي يقول (English):
> The order of these phases is generally the same, allowing data to flow in one direction from composition to layout to drawing to produce a frame (also known as unidirectional data flow). BoxWithConstraints, LazyColumn, and LazyRow are notable exceptions, where the composition of its children depends on the parent's layout phase. Conceptually, each of these phases happens for every frame; however to optimize performance, Compose avoids repeating work that would compute the same results from the same inputs in all of these phases. Compose skips running a composable function if it can reuse a former result, and Compose UI doesn't re-layout or re-draw the entire tree if it doesn't have to. This optimization is possible because Compose tracks state reads within the different phases.

#### الترجمة الحرفية:
> ترتيب هذه المراحل ثابت بشكل عام، مما يسمح للبيانات بالتدفق في اتجاه واحد من التركيب إلى التخطيط إلى الرسم لإنتاج إطار (يُعرف أيضاً بتدفق البيانات أحادي الاتجاه — unidirectional data flow). تُعد BoxWithConstraints وLazyColumn وLazyRow استثناءات ملحوظة، حيث يعتمد تركيب أبنائها على مرحلة تخطيط الأب. من الناحية المفاهيمية، تحدث كل هذه المراحل لكل إطار؛ لكن لتحسين الأداء، يتجنب Compose تكرار العمل الذي من شأنه حساب نفس النتائج من نفس المدخلات في كل هذه المراحل. يتخطى Compose تشغيل دالة قابلة للتركيب إن كان بإمكانه إعادة استخدام نتيجة سابقة، ولا تُعيد واجهة Compose تخطيط أو رسم الشجرة بأكملها إن لم تكن مضطرة لذلك. هذا التحسين ممكن لأن Compose يتتبع قراءات الحالة (state reads) ضمن المراحل المختلفة.

#### الشرح المبسّط:
هذا القسم يجمع كل ما سبق بفكرتين مهمتين: الأولى أن المراحل الثلاث تسير بترتيب ثابت واتجاه واحد (Composition → Layout → Drawing) وهذا يُسمى "تدفق بيانات أحادي الاتجاه"، باستثناءات نادرة مثل `LazyColumn` حيث يعتمد التركيب فعلياً على نتيجة التخطيط. الفكرة الثانية والأهم هي أن Compose لا يُعيد فعلياً تنفيذ كل هذه المراحل من الصفر عند كل تغيير — فهو "يتذكر" (بفضل تتبعه لقراءات الحالة/`state reads`) أي الدوال يعتمد ناتجها على الحالة التي تغيّرت فعلاً، ويتخطى (`skip`) تشغيل أي دالة أخرى لم تتأثر. هذا يربط تماماً بما قيل في بداية المحاضرة عن أن Compose "يعيد توليد الشاشة مفاهيمياً" لكنه ذكي بما يكفي ليطبّق فقط التغييرات الضرورية. **تشبيه يومي:** كأنكِ تراجعين دفتر ملاحظات كامل من الصفحة الأولى للأخيرة كل مرة تفتحينه (مفاهيمياً)، لكن في الواقع عقلك يتذكر أنكِ راجعتِ الصفحات 1-10 سابقاً ولم يتغيّر فيها شيء، فتقفزين مباشرة للصفحة الوحيدة التي أضفتِ فيها ملاحظة جديدة.

**لماذا؟** لأن إعادة حساب كل الشاشة عند كل تغيّر صغير سيكون مكلفاً جداً للأداء والبطارية، فتتبّع "من قرأ أي حالة" يسمح لـ Compose بتحديد أضيق نطاق ممكن يحتاج فعلاً لإعادة العمل.

---

### 16. Layouts in Compose — الحاجة إلى ترتيب صريح

#### النص الأصلي يقول (English):
> The Jetpack Compose implementation of the layout system has two main goals: High performance. Ability to easily write custom layouts. Composable functions are the basic building block of Compose. A composable function is a function emitting Unit that describes some part of your UI. A composable function might emit several UI elements. However, if you don't provide guidance on how they should be arranged, Compose might arrange the elements in a way you don't like. Example, this code generates two text elements: `Text("Alfred Sisley"); Text("3 minutes ago")`. Without guidance on how you want them arranged, Compose stacks the text elements on top of each other, making them unreadable. Compose provides a collection of ready-to-use layouts to help you arrange your UI elements, and makes it easy to define your own, more-specialized layouts.

#### الترجمة الحرفية:
> يمتلك تنفيذ Jetpack Compose لنظام التخطيط هدفين رئيسيين: أداء عالٍ. القدرة على كتابة تخطيطات مخصصة بسهولة. الدوال القابلة للتركيب هي لبنة البناء الأساسية في Compose. الدالة القابلة للتركيب هي دالة تُصدر Unit تصف جزءاً من واجهتك. قد تُصدر الدالة القابلة للتركيب عدة عناصر واجهة. لكن، إن لم تقدّم توجيهاً حول كيفية ترتيبها، قد يرتّب Compose العناصر بطريقة لا تعجبك. مثال، هذا الكود يُنشئ عنصرَي نص: Text("Alfred Sisley")‏، Text("3 minutes ago"). بدون توجيه حول كيفية ترتيبها، يُكدّس Compose عنصري النص فوق بعضهما، مما يجعلهما غير قابلين للقراءة. يوفّر Compose مجموعة من التخطيطات الجاهزة للاستخدام لمساعدتك على ترتيب عناصر واجهتك، ويجعل من السهل تعريف تخطيطاتك المتخصصة الخاصة.

#### الشرح المبسّط:
هذا القسم يفتح موضوعاً جديداً مبنياً على ما سبق: الآن وقد فهمنا كيف تعمل المراحل الثلاث، نحتاج لفهم كيف نُخبر Compose "أين" يجب أن يضع عناصر متعددة. المشكلة الموضحة هنا هي أنه بدون تحديد ترتيب صريح، يضع Compose كل العناصر التي تُصدرها الدالة القابلة للتركيب فوق بعضها البعض تماماً (متراكبة)، لأنه لا توجد أي معلومة تخبره "ضع هذا تحت ذاك" أو "ضعهما جنباً إلى جنب". هذا يمهّد مباشرة لضرورة استخدام `Column`، `Row`، `Box` التي ستُشرح في القسم التالي، وهي أدوات الترتيب الجاهزة (ready-to-use layouts) المذكورة في نهاية النص. **تشبيه يومي:** كأنكِ رميتِ ورقتين على طاولة دون أن تحددي أين تضعينهما بالضبط — ستقعان فوق بعضهما بالصدفة، ولن تستطيعي قراءة كليهما إلا إذا رتبتِهما بنفسكِ بجانب بعض أو فوق بعض بترتيب واضح.

**لماذا؟** لأن الدوال القابلة للتركيب "تصف" العناصر فقط، لكن لا تحمل أي معنى ضمني عن "كيف تُرتَّب بصرياً" ما لم تُغلَّف بحاوية ترتيب صريحة مثل Column أو Row.

---

### 17. حاويات الترتيب القياسية: Column وRow وBox

#### النص الأصلي يقول (English):
> In many cases, you can just use Compose's standard layout elements. Often these building blocks are all you need. You can write your own composable function to combine these layouts into a more elaborate layout that suits your app. Use Column to place items vertically on the screen. Use Row to place items horizontally on the screen. Both Column and Row support configuring the alignment of the elements they contain. Use Box to put elements on top of another. Box also supports configuring specific alignment of the elements it contains.

#### الترجمة الحرفية:
> في العديد من الحالات، يمكنكِ فقط استخدام عناصر التخطيط القياسية في Compose. غالباً ما تكون هذه اللبنات كل ما تحتاجينه. يمكنكِ كتابة دالتك القابلة للتركيب الخاصة لدمج هذه التخطيطات في تخطيط أكثر تفصيلاً يناسب تطبيقك. استخدمي Column لوضع العناصر عمودياً على الشاشة. استخدمي Row لوضع العناصر أفقياً على الشاشة. يدعم كل من Column وRow تهيئة محاذاة العناصر التي يحتويانها. استخدمي Box لوضع عناصر فوق بعضها البعض. يدعم Box أيضاً تهيئة محاذاة محددة للعناصر التي يحتويها.

```kotlin
// Places items vertically
@Composable
fun ArtistCardColumn() {
    Column {
        Text("Alfred Sisley")
        Text("3 minutes ago")
    }
}

// Places items horizontally, aligned vertically to center
@Composable
fun ArtistCardRow(artist: Artist) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Image(bitmap = artist.image, contentDescription = "Artist image")
        Column {
            Text(artist.name)
            Text(artist.lastSeenOnline)
        }
    }
}

// Overlays items on top of each other
@Composable
fun ArtistAvatar(artist: Artist) {
    Box {
        Image(bitmap = artist.image, contentDescription = "Artist image")
        Icon(Icons.Filled.Check, contentDescription = "Check mark")
    }
}
```

#### شرح كل سطر:
1. `Column { ... }` → يرتّب العناصر بداخله عمودياً (الواحد تحت الآخر)
2. `Row(verticalAlignment = Alignment.CenterVertically) { ... }` → يرتّب العناصر أفقياً، مع محاذاة رأسية للمنتصف
3. `Image(bitmap = artist.image, ...)` → يعرض صورة الفنان، ابن أول لـ Row
4. `Column { Text(artist.name); Text(artist.lastSeenOnline) }` → عمود متداخل داخل Row، يحتوي نصين
5. `Box { ... }` → يضع كل أبنائه فوق بعضهم البعض (متراكبين)
6. `Icon(Icons.Filled.Check, ...)` → أيقونة توضع فوق الصورة داخل Box

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.foundation.layout.Column`، `import androidx.compose.foundation.layout.Row`، `import androidx.compose.foundation.layout.Box`، `import androidx.compose.ui.Alignment`

**الناتج المتوقع (لقطة الشاشة):**
> Column: اسم الفنان فوق وقت آخر ظهور. Row: صورة الفنان بجانب عمود يحوي الاسم والوقت. Box: صورة الفنان مع علامة صح (✓) متراكبة فوقها في الزاوية.

#### 💡 التشبيه:
> Column وRow وBox أشبه بثلاثة أنواع من الرفوف: Column رف عمودي (كتب فوق بعضها)، Row رف أفقي (كتب جنباً إلى جنب)، وBox صندوق شفاف تضعين فيه أشياء متراكبة فوق بعضها.
> **وجه الشبه:** اتجاه الترتيب في كل رف = اتجاه ترتيب العناصر داخل كل حاوية Compose.

#### الشرح المبسّط:
هذه الحاويات الثلاث هي الحل المباشر لمشكلة القسم السابق (تراكب العناصر بدون توجيه): `Column` يرتّب أبناءه عمودياً، `Row` أفقياً، و`Box` يجعلهم متراكبين فوق بعضهم عن قصد (بعكس المشكلة السابقة، هنا التراكب مقصود ومفيد، مثل وضع أيقونة صح فوق صورة). لاحظي أن كلاً من `Column` و`Row` يدعمان معاملات محاذاة (`verticalAlignment` في Row، و`horizontalAlignment` في Column ستُشرح لاحقاً) تسمح بالتحكم الدقيق في موضع العناصر ضمن المحور العمودي أو الأفقي. مثال `ArtistCardRow` يجمع كل هذا عملياً: `Row` يحوي صورة، ثم `Column` متداخلاً بداخله يحوي نصين، مما يوضح أن هذه الحاويات يمكن تعشيشها (nesting) داخل بعضها لبناء تخطيطات أكثر تعقيداً. **تشبيه يومي:** فكّري في بطاقة عمل: الاسم والمنصب مكتوبان الواحد تحت الآخر (Column)، بينما الشعار والاسم قد يكونان جنباً إلى جنب (Row)، وطابع الشركة قد يكون موضوعاً شفافاً فوق النص كله (Box).

**لماذا؟** لأن معظم واجهات التطبيقات الحقيقية هي مزيج من هذه الأنماط الثلاثة البسيطة متداخلة ببعضها، فمعرفتها الجيدة تكفي لبناء تخطيطات معقدة نسبياً دون تعلم أدوات إضافية.

---

### 18. تهيئة الترتيب الداخلي: horizontalArrangement وverticalArrangement

#### النص الأصلي يقول (English):
> To set children's position within a Row, set the horizontalArrangement and verticalAlignment arguments. For a Column, set the verticalArrangement and horizontalAlignment arguments.

#### الترجمة الحرفية:
> لتحديد موضع الأبناء داخل Row، حدّدي معاملَي horizontalArrangement وverticalAlignment. بالنسبة لـColumn، حدّدي معاملَي verticalArrangement وhorizontalAlignment.

```kotlin
// Row with custom horizontal arrangement and vertical alignment
@Composable
fun ArtistCardArrangement(artist: Artist) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.End
    ) {
        Image(bitmap = artist.image, contentDescription = "Artist image")
        Column { /*...*/ }
    }
}
```

#### شرح كل سطر:
1. `verticalAlignment = Alignment.CenterVertically` → يحاذي كل الأبناء عمودياً في منتصف ارتفاع Row
2. `horizontalArrangement = Arrangement.End` → يدفع كل الأبناء نحو النهاية (اليمين في LTR) أفقياً داخل Row

#### ⚖️ المقايضة: Alignment مقابل Arrangement
| | Alignment | Arrangement |
| --- | --- | --- |
| المزايا | يتحكم بمحاذاة كل عنصر على المحور العمودي (في Row) أو الأفقي (في Column) | يتحكم بكيفية توزيع المساحة بين العناصر على المحور الرئيسي (الأفقي في Row، العمودي في Column) |
| العيوب | لا يتحكم بالتباعد بين العناصر نفسها | لا يتحكم بمحاذاة العناصر على المحور العمودي/الأفقي المقابل |
| متى تختاره | عندما تريدين محاذاة العناصر على المحور العرضي (cross axis) | عندما تريدين التحكم بتوزيع المساحة على المحور الرئيسي (main axis) |

#### الشرح المبسّط:
هذا القسم يوسّع مفهوم المحاذاة الذي ذُكر بإيجاز في القسم السابق: في `Row`، المحور الأفقي هو "المحور الرئيسي" فتتحكمين فيه بـ`horizontalArrangement`، بينما المحور العمودي هو "المحور العرضي" فتتحكمين فيه بـ`verticalAlignment` — والعكس تماماً صحيح في `Column`. هذا التمييز بين Arrangement (توزيع على المحور الرئيسي، مثل `Arrangement.End` لدفع العناصر لليمين) وAlignment (محاذاة على المحور العرضي، مثل `CenterVertically` لتوسيط عمودي) هو نقطة دقيقة يخطئ فيها الطلاب كثيراً، لذا يجب التمييز بينهما بوضوح: Arrangement يتعلق بـ"أين تذهب العناصر على طول المحور الطويل"، وAlignment يتعلق بـ"أين تقف العناصر على المحور العرضي القصير". **تشبيه يومي:** تخيّلي صفاً من الطلاب يقفون في طابور أفقي (Row) — `horizontalArrangement` يحدد "أين يقف الطابور بأكمله" (يسار، وسط، يمين، أو موزع)، بينما `verticalAlignment` يحدد "هل يقف كل طالب منتصباً أم منحنياً قليلاً" أي محاذاته على المحور العرضي (الطول).

**لماذا؟** لأن كل محور (رئيسي وعرضي) يحتاج نوع تحكم مختلف تماماً: التوزيع (Arrangement) على الطول، والمحاذاة (Alignment) على العرض، ولا يمكن استبدال أحدهما بالآخر.

---

### 19. Compose Modifiers — ما هي وماذا تفعل؟

#### النص الأصلي يقول (English):
> Modifiers allow you to decorate or augment a composable. Modifiers let you do these sorts of things: Change the composable's size, layout, behavior, and appearance. Add information, like accessibility labels. Process user input. Add high-level interactions, like making an element clickable, scrollable, draggable, or zoomable. Modifiers are standard Kotlin objects. Create a modifier by calling one of the Modifier class functions.

#### الترجمة الحرفية:
> تسمح لكِ الـModifiers بتزيين أو تعزيز عنصر قابل للتركيب. تتيح لكِ الـModifiers فعل هذه الأنواع من الأشياء: تغيير حجم العنصر القابل للتركيب، تخطيطه، سلوكه، ومظهره. إضافة معلومات، مثل تسميات إمكانية الوصول (accessibility labels). معالجة إدخال المستخدم. إضافة تفاعلات عالية المستوى، مثل جعل عنصر قابلاً للنقر، أو التمرير، أو السحب، أو التكبير/التصغير. الـModifiers هي كائنات Kotlin قياسية. أنشئي modifier عن طريق استدعاء إحدى دوال صنف Modifier.

```kotlin
// Applies padding to the Column using a Modifier
@Composable
private fun Greeting(name: String) {
    Column(modifier = Modifier.padding(24.dp)) {
        Text(text = "Hello,")
        Text(text = name)
    }
}
```

#### شرح كل سطر:
1. `Column(modifier = Modifier.padding(24.dp))` → يُمرَّر `Modifier` مع تباعد 24dp إلى Column كمعامل modifier
2. `Text(text = "Hello,")` و`Text(text = name)` → نصان بداخل Column يرثان التباعد المطبق على الحاوية الأب

**الناتج المتوقع (لقطة الشاشة):**
> نص "Hello," فوق اسم المستخدم، مع مسافة فارغة 24dp من كل جوانب الشاشة قبل بدء النص.

#### الشرح المبسّط:
`Modifier` هو مفهوم منفصل تماماً عن الحاويات (`Column/Row/Box`) التي شُرحت سابقاً؛ فبينما تحدد الحاويات "كيف يُرتَّب أكثر من عنصر بالنسبة لبعضهم"، يحدد الـ`Modifier` خصائص "عنصر واحد" بذاته — حجمه، مظهره، سلوكه عند اللمس، أو حتى معلومات إمكانية الوصول (accessibility) له. أهم نقطة هنا هي أن `Modifier` ليس شيئاً خاصاً أو سحرياً، بل هو "كائن Kotlin قياسي" (standard Kotlin object) يُنشأ باستدعاء دوال جاهزة من صنف `Modifier` مثل `Modifier.padding(24.dp)`. في المثال، `Modifier.padding(24.dp)` يُمرَّر إلى `Column` نفسها كمعامل، ويؤثر على المسافة حول محتوى العمود بأكمله. **تشبيه يومي:** فكّري في الـModifier كإطار صورة (frame) يمكن إضافته حول لوحة فنية — الإطار لا يغيّر اللوحة نفسها، لكنه يضيف حداً حولها (padding)، ويمكن أن يجعلها قابلة للتعليق بمسمار (clickable) أو يضيف لها بطاقة وصفية (accessibility label).

**لماذا؟** لأن فصل "وصف المحتوى" (composable function نفسها) عن "كيفية تزيينه/سلوكه" (Modifier) يجعل الكود أكثر مرونة وقابلية لإعادة الاستخدام — يمكن تطبيق نفس الدالة القابلة للتركيب بمزيّنات مختلفة في أماكن مختلفة.

---

### 20. سلسلة الـModifiers وترتيبها (Chaining & Order Matters)

#### النص الأصلي يقول (English):
> Multiple modifiers can be chained together to decorate or augment a composable. This chain is created via the Modifier interface which represents an ordered, immutable list of single Modifier.Elements. padding puts space around an element. fillMaxWidth makes the composable fill the maximum width given to it from its parent. It's a best practice to have all of your composables accept a modifier parameter, and pass that modifier to its first child that emits UI. Each Modifier.Element represents an individual behavior... Their ordering matters: modifier elements that are added first will be applied first.

#### الترجمة الحرفية:
> يمكن ربط عدة modifiers معاً لتزيين أو تعزيز عنصر قابل للتركيب. تُنشأ هذه السلسلة عبر واجهة Modifier التي تمثّل قائمة مرتّبة وغير قابلة للتغيير (immutable) من عناصر Modifier.Element فردية. padding يضيف مساحة حول عنصر. fillMaxWidth يجعل العنصر القابل للتركيب يملأ أقصى عرض مُعطى له من والده. من أفضل الممارسات أن تقبل كل عناصرك القابلة للتركيب معامل modifier، وأن تُمرّري ذلك الـmodifier إلى ابنها الأول الذي يُصدر واجهة. كل Modifier.Element يمثّل سلوكاً فردياً... ترتيبها مهم: عناصر الـmodifier التي تُضاف أولاً تُطبَّق أولاً.

```kotlin
// clickable applied BEFORE padding — the entire area including padding responds to clicks
val onClick = {}
@Composable
fun ArtistCard(/*...*/) {
    val padding = 16.dp
    Column(
        Modifier
            .clickable(onClick = onClick)
            .padding(padding)
            .fillMaxWidth()
    ) {
        // rest of the implementation
    }
}
```

```kotlin
// padding applied BEFORE clickable — the padding area no longer responds to clicks
val onClick = {}
@Composable
fun ArtistCard(/*...*/) {
    val padding = 16.dp
    Column(
        Modifier
            .padding(padding)
            .clickable(onClick = onClick)
            .fillMaxWidth()
    ) {
        // rest of the implementation
    }
}
```

#### 🔄 قبل / بعد: ترتيب clickable وpadding
**قبل (clickable أولاً):**
```kotlin
Modifier.clickable(onClick = onClick).padding(padding).fillMaxWidth()
```
**بعد (padding أولاً):**
```kotlin
Modifier.padding(padding).clickable(onClick = onClick).fillMaxWidth()
```
**ماذا تغيّر؟** في الحالة الأولى، كامل المساحة (بما فيها منطقة الـpadding) تستجيب للنقر؛ في الحالة الثانية، منطقة الـpadding حول الحواف لم تعد تستجيب للنقر.

#### شرح كل سطر:
1. `.clickable(onClick = onClick)` → يجعل العنصر يستجيب للمس ويُظهر تأثير تموّج (ripple)
2. `.padding(padding)` → يضيف مسافة فارغة حول العنصر بمقدار 16.dp
3. `.fillMaxWidth()` → يملأ العنصر أقصى عرض متاح من الأب

#### الفهم الخاطئ الشائع ❌: ترتيب الـModifiers لا يهم، فهي تُطبَّق كلها في النهاية بنفس النتيجة بغض النظر عن الترتيب.
#### الفهم الصحيح ✅: الترتيب حاسم — كل modifier "يغلّف" النتيجة السابقة، فتغيير الترتيب يغيّر أي منطقة تتأثر بأي سلوك (كما في مثال clickable/padding أعلاه).

#### الشرح المبسّط:
بما أن `Modifier` كائن Kotlin قياسي كما شُرح في القسم السابق، يمكن ربط عدة استدعاءات منه بسلسلة (`chaining`) باستخدام النقطة `.`، وكل حلقة في هذه السلسلة تُسمى `Modifier.Element`. النقطة الأهم هنا — وهي مصدر خطأ شائع جداً — أن ترتيب هذه السلسلة يُغيّر النتيجة الفعلية، لأن كل عنصر يُطبَّق "على نتيجة العنصر الذي قبله" وليس على العنصر الأصلي مباشرة. في المثال، وضع `clickable` قبل `padding` يجعل منطقة الـpadding جزءاً من "المنطقة القابلة للنقر"، بينما عكس الترتيب يجعل الـpadding "خارج" منطقة الاستجابة للنقر لأن `padding` طُبِّق أولاً وحدّد حدوداً جديدة قبل أن يصل `clickable`. **تشبيه يومي:** تخيّلي أنكِ تلبسين طبقات ملابس بترتيب مختلف — إن لبستِ سترة واقية من المطر ثم فوقها سترة صوفية، تبقين محميتين من المطر بالكامل؛ لكن إن عكستِ الترتيب (الصوفية أولاً ثم الواقية من المطر فوقها)، تكونين محمية من المطر لكن بشكل مختلف تماماً في كيفية تأثير كل طبقة على الأخرى.

**لماذا؟** لأن كل `Modifier.Element` يُطبَّق على "النتيجة المُغلَّفة" من العنصر السابق في السلسلة، وليس على العنصر الأصلي بمعزل عن الباقي، فترتيب التغليف يحدد أي طبقة "تحيط" بأي طبقة أخرى.

---

### 21. رفع الـModifiers لتحسين الأداء (Modifier Hoisting)

#### النص الأصلي يقول (English):
> Sometimes it can be beneficial to reuse the same modifier chain instances in multiple composables, by extracting them into variables and hoisting them into higher scopes. `val greetingContainerModifier = Modifier.padding(24.dp).fillMaxWidth()`. It can improve your app's performance for a few reasons: The re-allocation of the modifiers won't be repeated when recomposition occurs for composables that use them. Modifier chains could potentially be very long and complex, so reusing the same instance of a chain can alleviate the workload Compose runtime needs to do when comparing them.

#### الترجمة الحرفية:
> أحياناً يكون مفيداً إعادة استخدام نفس نُسخ سلسلة الـmodifier في عدة عناصر قابلة للتركيب، عن طريق استخراجها إلى متغيّرات ورفعها (hoisting) إلى نطاقات أعلى. يمكن أن يُحسّن ذلك أداء تطبيقكِ لبضعة أسباب: لن تتكرر إعادة تخصيص (re-allocation) الـmodifiers عند حدوث إعادة تركيب (recomposition) للعناصر القابلة للتركيب التي تستخدمها. يمكن أن تكون سلاسل الـmodifier طويلة ومعقدة جداً، لذا فإن إعادة استخدام نفس نسخة السلسلة يمكن أن يخفف من عبء العمل الذي يحتاجه محرّك Compose عند مقارنتها.

```kotlin
// Hoisted modifier chain reused across recompositions
val greetingContainerModifier = Modifier.padding(24.dp).fillMaxWidth()

@Composable
private fun Greeting(name: String) {
    Column(
        modifier = greetingContainerModifier
    ) {
        Text(text = "Hello,")
        Text(text = name)
    }
}
```

#### شرح كل سطر:
1. `val greetingContainerModifier = Modifier.padding(24.dp).fillMaxWidth()` → يُنشأ الـmodifier مرة واحدة خارج الدالة القابلة للتركيب
2. `Column(modifier = greetingContainerModifier)` → تُستخدم نفس النسخة (instance) في كل مرة تُستدعى فيها Greeting، بدل إنشاء نسخة جديدة كل مرة

#### مهم للامتحان ⚠️:
> رفع الـModifier إلى متغيّر خارجي يمنع إعادة تخصيصه (re-allocation) في كل عملية recomposition، وهذا تحسين أداء مباشر مرتبط بمفهوم "تخطي إعادة العمل" الذي شُرح سابقاً في مرحلة الرسم والتركيب.

#### الشرح المبسّط:
هذا القسم يربط مباشرة بمفهوم `recomposition` والتحسينات المذكورة سابقاً في قسم "التدفق أحادي الاتجاه"؛ فبدل أن تُنشئي سلسلة `Modifier` جديدة من الصفر في كل مرة تُستدعى فيها الدالة القابلة للتركيب (وهو ما يحدث كثيراً بسبب recomposition)، يمكنكِ "رفع" (hoist) هذه السلسلة إلى متغيّر خارج الدالة، فتُنشأ مرة واحدة فقط وتُعاد استخدامها. الفائدة مضاعفة: توفير عبء إعادة إنشاء الكائن، وتوفير عبء مقارنة السلاسل الطويلة عند تحديد ما إذا كانت الدالة تحتاج إعادة تشغيل. **تشبيه يومي:** كأنكِ تحضّرين خلطة توابل جاهزة مسبقاً في وعاء واحد بدل أن تخلطي نفس التوابل من الصفر في كل مرة تطبخين فيها نفس الطبق — الخلطة الجاهزة تُستخدم مباشرة وتوفر الوقت والجهد المتكرر.

**لماذا؟** لأن الأداء في Compose يعتمد جزئياً على تقليل الأعمال المتكررة غير الضرورية، ورفع الـmodifiers إلى نطاق أعلى هو مثال ملموس على هذا التحسين العام الذي شرحته المحاضرة نظرياً سابقاً.

---

### 22. تطبيق شامل للـModifiers في تخطيط ArtistCard

#### النص الأصلي يقول (English):
> Example, here we chain several modifiers to customize the ArtistCard. `clickable makes a composable react to user input and shows a ripple. padding puts space around an element. fillMaxWidth makes the composable fill the maximum width given to it from its parent. size specifies an element's preferred width and height.`

#### الترجمة الحرفية:
> مثال، هنا نربط عدة modifiers لتخصيص ArtistCard. clickable يجعل العنصر القابل للتركيب يستجيب لإدخال المستخدم ويُظهر تأثير تموّج (ripple). padding يضيف مساحة حول عنصر. fillMaxWidth يجعل العنصر القابل للتركيب يملأ أقصى عرض مُعطى له من والده. size يحدد العرض والارتفاع المفضّلين لعنصر.

```kotlin
@Composable
fun ArtistCardModifiers(
    artist: Artist,
    onClick: () -> Unit
) {
    val padding = 16.dp
    Column(
        Modifier
            .clickable(onClick = onClick)
            .padding(padding)
            .fillMaxWidth()
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) { /*...*/ }
        Spacer(Modifier.size(padding))
        Card(
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        ) { /*...*/ }
    }
}
```

#### شرح كل سطر:
1. `fun ArtistCardModifiers(artist: Artist, onClick: () -> Unit)` → الدالة تستقبل بيانات الفنان ودالة تُستدعى عند النقر
2. `Modifier.clickable(onClick = onClick).padding(padding).fillMaxWidth()` → سلسلة modifiers: قابلية النقر أولاً، ثم التباعد، ثم ملء العرض الأقصى
3. `Row(verticalAlignment = Alignment.CenterVertically) { /*...*/ }` → صف يعرض تفاصيل الفنان بمحاذاة رأسية للمنتصف
4. `Spacer(Modifier.size(padding))` → مسافة فارغة بحجم padding بين Row وCard
5. `Card(elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)) { /*...*/ }` → بطاقة برفع (elevation) 4dp تحوي محتوى إضافياً

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.foundation.clickable`، `import androidx.compose.foundation.layout.*`، `import androidx.compose.material3.Card`، `import androidx.compose.material3.CardDefaults`

#### الشرح المبسّط:
هذا المثال يجمع كل مفاهيم الـModifiers السابقة (السلسلة، الترتيب، النطاق) في تطبيق عملي واحد لبطاقة فنان كاملة: `Column` خارجي قابل للنقر (`clickable`) بأكمله، بداخله `Row` لعرض معلومات الفنان، ثم `Spacer` (مسافة فارغة صريحة بحجم محدد)، ثم `Card` لعرض محتوى إضافي برفع بصري (elevation) يعطي إحساساً بالعمق. هذا يوضح كيف تتضافر الحاويات (`Column`/`Row`) مع الـModifiers لبناء واجهة حقيقية متكاملة، تماماً كما ظهرت في الأمثلة السابقة لكن بمستوى أعلى من التعقيد والاكتمال. **تشبيه يومي:** هذا المثال أشبه ببناء بطاقة تعريف موظف كاملة: إطار خارجي قابل للنقر بالكامل (لفتح التفاصيل)، بداخله صورة واسم مرتبان أفقياً، ثم مسافة فاصلة، ثم قسم إضافي مرفوع بصرياً (كأنه بطاقة داخل بطاقة).

**لماذا؟** لأن الأمثلة الواقعية تحتاج دائماً لدمج عدة أدوات معاً (حاويات + modifiers + مكونات جاهزة مثل Card)، وهذا المثال يجسّد كيف تبدو واجهة أندرويد حقيقية مبنية بـCompose.

---

### 23. Modifiers مدمجة: padding, size, requiredSize, fillMax*

#### النص الأصلي يقول (English):
> By default, layouts provided in Compose wrap their children. However, you can set a size by using the size modifier. Note that the size you specified might not be respected if it does not satisfy the constraints coming from the layout's parent. If you require the composable size to be fixed regardless of the incoming constraints, use the requiredSize modifier. If you want a child layout to fill all the available height allowed by the parent, add the fillMaxHeight modifier (Compose also provides fillMaxSize and fillMaxWidth).

#### الترجمة الحرفية:
> بشكل افتراضي، تلتف التخطيطات المتوفرة في Compose حول أبنائها. لكن، يمكنكِ تحديد حجم باستخدام modifier اسمه size. لاحظي أن الحجم الذي حدّدتِه قد لا يُحترَم إن لم يُلبِّ القيود (constraints) القادمة من والد التخطيط. إن كنتِ تحتاجين أن يكون حجم العنصر القابل للتركيب ثابتاً بغض النظر عن القيود الواردة، استخدمي modifier اسمه requiredSize. إن أردتِ أن يملأ تخطيط ابن كل الارتفاع المتاح المسموح به من الوالد، أضيفي modifier اسمه fillMaxHeight (يوفّر Compose أيضاً fillMaxSize وfillMaxWidth).

```kotlin
// size may be overridden by parent constraints; requiredSize forces exact size regardless
@Composable
fun ArtistCard(/*...*/) {
    Row(
        modifier = Modifier.size(width = 400.dp, height = 100.dp)
    ) {
        Image(
            /*...*/
            modifier = Modifier.requiredSize(150.dp)
        )
        Column { /*...*/ }
    }
}
```

#### شرح كل سطر:
1. `Modifier.size(width = 400.dp, height = 100.dp)` → يحدد للـRow حجماً مقترحاً (قد يُقيَّد من الوالد)
2. `Modifier.requiredSize(150.dp)` → يفرض على Image حجماً ثابتاً 150dp×150dp بغض النظر عن قيود الوالد

#### 🛠️ استكشاف الأخطاء
| الخطأ | السبب | الحل |
| --- | --- | --- |
| العنصر لا يظهر بالحجم المحدد في `.size()` | الوالد يفرض قيوداً (constraints) أصغر أو أكبر لا تسمح بهذا الحجم | استخدمي `.requiredSize()` لفرض الحجم بغض النظر عن قيود الوالد |
| العنصر لا يملأ الارتفاع رغم الحاجة لذلك | نسيان إضافة `fillMaxHeight()` | أضيفي `Modifier.fillMaxHeight()` (أو `fillMaxSize()`/`fillMaxWidth()` حسب الحاجة) |

#### الشرح المبسّط:
هذا القسم يفصّل الفرق الدقيق بين ثلاثة modifiers متشابهة الاسم لكنها مختلفة السلوك: `size()` يقترح حجماً لكنه "يحترم" قيود الوالد إن تعارضا (فقد لا يُطبَّق كاملاً)، بينما `requiredSize()` يفرض الحجم بشكل صارم بغض النظر عما يريده الوالد. أما عائلة `fillMax*` (`fillMaxWidth`، `fillMaxHeight`، `fillMaxSize`) فتجعل العنصر يستهلك أقصى مساحة متاحة له من الوالد بدل الالتفاف فقط حول محتواه (وهو السلوك الافتراضي المذكور في بداية النص: "التخطيطات تلتف حول أبنائها افتراضياً"). فهم هذا الفرق مهم لأنه يظهر غالباً في أسئلة تصحيح الكود حين يتوقع الطالب أن `size()` يعمل دائماً بينما القيود الأبوية قد تتجاوزه فعلياً. **تشبيه يومي:** `size()` أشبه بطلب حجز طاولة لأربعة أشخاص في مطعم، لكن إن كان المطعم مزدحماً فقد يعطونكِ طاولة لثلاثة فقط (يحترم القيود)؛ بينما `requiredSize()` أشبه بحجز VIP مضمون الحجم بغض النظر عن ازدحام المطعم.

**لماذا؟** لأن نظام القيود (constraints) في Compose يتدفق من الوالد إلى الابن، وبعض الـmodifiers مصممة لتحترم هذا التدفق (`size`) بينما بعضها الآخر مصمم لتجاوزه عمداً (`requiredSize`) حين يكون ذلك ضرورياً.

---

### 24. Modifiers للموضع: paddingFromBaseline وoffset

#### النص الأصلي يقول (English):
> If you want to add padding above a text baseline such that you achieve a specific distance from the top of the layout to the baseline, use the paddingFromBaseline modifier. To position a layout relative to its original position, add the offset modifier and set the offset in the x and y axis. Offsets can be positive as well as non-positive. The difference between padding and offset is that adding an offset to a composable does not change its measurements. The offset modifier is applied horizontally according to the layout direction. In a left-to-right context, a positive offset shifts the element to the right, while in a right-to-left context, it shifts the element to the left.

#### الترجمة الحرفية:
> إن أردتِ إضافة تباعد فوق خط أساس النص (text baseline) بحيث تحققين مسافة محددة من أعلى التخطيط إلى خط الأساس، استخدمي modifier اسمه paddingFromBaseline. لوضع تخطيط نسبةً لموضعه الأصلي، أضيفي modifier اسمه offset وحدّدي الإزاحة على محوري x وy. يمكن أن تكون الإزاحات موجبة أو غير موجبة. الفرق بين padding وoffset هو أن إضافة offset لعنصر قابل للتركيب لا يغيّر قياساته. يُطبَّق modifier الـoffset أفقياً حسب اتجاه التخطيط. في سياق من اليسار لليمين، تُزيح الإزاحة الموجبة العنصر لليمين، بينما في سياق من اليمين لليسار، تُزيحه لليسار.

```kotlin
// offset shifts the Text without changing its measured size
@Composable
fun ArtistCard(artist: Artist) {
    Row(/*...*/) {
        Column {
            Text(artist.name)
            Text(
                text = artist.lastSeenOnline,
                modifier = Modifier.offset(x = 4.dp)
            )
        }
    }
}
```

#### ⚖️ المقايضة: padding مقابل offset
| | padding | offset |
| --- | --- | --- |
| المزايا | يضيف مساحة حقيقية تُحسب ضمن قياسات العنصر، فيؤثر على العناصر المجاورة | يزيح العنصر بصرياً دون التأثير على المساحة التي يحجزها في التخطيط |
| العيوب | يُغيّر الحجم الكلي المحسوب للعنصر، فقد يدفع عناصر أخرى | قد يتسبب في تراكب بصري مع عناصر مجاورة لأن مساحتها المحجوزة لم تتغيّر |
| متى تختاره | عندما تريدين مسافة حقيقية تؤثر على تخطيط بقية العناصر | عندما تريدين إزاحة بصرية بسيطة دون التأثير على بقية التخطيط |

#### الشرح المبسّط:
هذا القسم يقدّم modifierين للتحكم بالموضع الدقيق: `paddingFromBaseline` مفيد خصوصاً مع النصوص لأنه يقيس المسافة من أعلى العنصر إلى خط أساس الحروف (baseline) وليس إلى حافة النص العلوية العادية، وهو تفصيل دقيق يهم مصممي الواجهات النصية. أما `offset` فهو الأهم للفهم لأنه يقدّم فرقاً جوهرياً عن `padding`: الإزاحة (offset) تحرّك العنصر بصرياً فقط دون أن "تُحسب" ضمن قياسات التخطيط، أي أن العناصر المجاورة لن "تشعر" بأن هذا العنصر تحرّك، وقد يتراكب بصرياً معها. هذا يربط مباشرة بمفهوم القياس (measurement) الذي شُرح في مرحلة Layout سابقاً: padding يُغيّر القياس الفعلي، بينما offset يغيّر الموضع البصري فقط بعد أن اكتمل القياس. **تشبيه يومي:** `padding` أشبه بتوسيع إطار صورة فعلياً (يأخذ مساحة أكبر على الحائط وتحتاج بقية الصور تعديل مواقعها)، بينما `offset` أشبه بتحريك الصورة قليلاً داخل نفس المساحة المحجوزة لها على الحائط (المساحة المحجوزة لم تتغير، فقط الصورة انزاحت بصرياً بداخلها وقد تتراكب مع إطار الصورة المجاورة).

**لماذا؟** لأن الفصل بين "المساحة المحجوزة" (measurement) و"الموضع البصري النهائي" (placement) يمنح مرونة: أحياناً تريدين تغيير الاثنين معاً (padding)، وأحياناً فقط الموضع البصري دون التأثير على بقية التخطيط (offset).

---

### 25. أمان النطاق (Scope Safety): matchParentSize في Box

#### النص الأصلي يقول (English):
> In Compose, there are modifiers that can only be used when applied to children of certain composables. Compose enforces this by means of custom scopes. Scope safety prevents you from adding modifiers that wouldn't work in other composables and scopes and saves time from trial and error. If you want a child layout to be the same size as a parent Box without affecting the Box size, use the matchParentSize modifier. matchParentSize is only available within a Box scope, meaning that it only applies to direct children of Box composables. If fillMaxSize were used instead of matchParentSize, the Spacer would take all the available space allowed to the parent, in turn causing the parent to expand and fill all the available space.

#### الترجمة الحرفية:
> في Compose، توجد modifiers يمكن استخدامها فقط عند تطبيقها على أبناء عناصر قابلة للتركيب معينة. يفرض Compose هذا عن طريق نطاقات مخصصة (custom scopes). أمان النطاق يمنعكِ من إضافة modifiers لن تعمل في عناصر ونطاقات قابلة للتركيب أخرى، ويوفّر وقتاً من التجربة والخطأ. إن أردتِ أن يكون تخطيط الابن بنفس حجم Box الوالد دون التأثير على حجم Box، استخدمي modifier اسمه matchParentSize. matchParentSize متاح فقط ضمن نطاق Box، مما يعني أنه يُطبَّق فقط على الأبناء المباشرين للعناصر القابلة للتركيب Box. لو استُخدم fillMaxSize بدلاً من matchParentSize، لأخذ Spacer كل المساحة المتاحة المسموح بها للوالد، مما يتسبب بدوره في توسّع الوالد ليملأ كل المساحة المتاحة.

```kotlin
// matchParentSize keeps the Box's size dictated by ArtistCard, not by the Spacer
@Composable
fun MatchParentSizeComposable() {
    Box {
        Spacer(
            Modifier
                .matchParentSize()
                .background(Color.LightGray)
        )
        ArtistCard()
    }
}
```

```kotlin
// fillMaxSize instead causes the Box (and Spacer) to expand to fill all available space
@Composable
fun MatchParentSizeComposable() {
    Box {
        Spacer(
            Modifier
                .fillMaxSize()
                .background(Color.LightGray)
        )
        ArtistCard()
    }
}
```

#### الفهم الخاطئ الشائع ❌: fillMaxSize وmatchParentSize يعطيان نفس النتيجة داخل Box لأن كليهما "يملأ المساحة".
#### الفهم الصحيح ✅: matchParentSize يجعل الابن بحجم Box المحدَّد أصلاً من محتوى آخر (مثل ArtistCard) دون أن يوسّع Box نفسه؛ بينما fillMaxSize يجعل الابن يأخذ كل المساحة المتاحة من الوالد الأكبر، مما قد يتسبب في توسّع Box نفسه ليملأ تلك المساحة بالكامل.

#### الشرح المبسّط:
هذا مثال على "أمان النطاق" (scope safety)، وهي آلية يستخدمها Compose لمنع استخدام modifiers في سياقات غير منطقية — فمثلاً `matchParentSize` غير متاح إلا داخل `Box` تحديداً، لأنه بلا معنى في `Row` أو `Column`. الفكرة الدقيقة في `matchParentSize` هي أنه يجعل حجم العنصر (مثل `Spacer`) "يتبع" حجم `Box` المحدَّد أصلاً من مصدر آخر (هنا `ArtistCard`)، بدون أن يشارك هو نفسه في تحديد حجم ذلك `Box`. هذا يختلف جذرياً عن `fillMaxSize` الذي "يطلب" أقصى مساحة من الوالد الأكبر، وإن لم يكن لـ`Box` حجم محدد مسبقاً، فسيتوسع `Box` نفسه استجابة لهذا الطلب — وهذا بالضبط سبب اختلاف النتيجتين في المثالين أعلاه. **تشبيه يومي:** `matchParentSize` أشبه بستارة مُفصَّلة بالضبط على مقاس نافذة موجودة مسبقاً (لن تجعل النافذة نفسها أكبر)، بينما `fillMaxSize` أشبه بطلب "أعطني كل المساحة المتاحة في الغرفة" — إن لم تكن هناك حدود واضحة، فقد تتوسع الغرفة (المجازية) نفسها لتلبية هذا الطلب.

**لماذا؟** لأن السماح باستخدام modifiers مثل `matchParentSize` في أي مكان (خارج Box) سيكون بلا معنى منطقي، فنظام النطاقات (scopes) في Compose يمنع هذا الخطأ في وقت الترجمة (compile time) بدل اكتشافه لاحقاً بالتجربة والخطأ.

---

### 26. أمان النطاق: weight في Row وColumn

#### النص الأصلي يقول (English):
> By default, a composable size is defined by the content it is wrapping. You can set a composable size to be flexible within its parent using the weight Modifier that is only available in RowScope, and ColumnScope.

#### الترجمة الحرفية:
> بشكل افتراضي، يُحدَّد حجم العنصر القابل للتركيب بالمحتوى الذي يلتف حوله. يمكنكِ جعل حجم عنصر قابل للتركيب مرناً ضمن والده باستخدام modifier اسمه weight المتاح فقط في RowScope وColumnScope.

```kotlin
// weight distributes available width proportionally between children
@Composable
fun ArtistCard(/*...*/) {
    Row(
        modifier = Modifier.fillMaxWidth()
    ) {
        Image(
            /*...*/
            modifier = Modifier.weight(2f)
        )
        Column(
            modifier = Modifier.weight(1f)
        ) {
            /*...*/
        }
    }
}
```

#### شرح كل سطر:
1. `Row(modifier = Modifier.fillMaxWidth())` → Row يملأ كامل العرض المتاح أولاً حتى يكون هناك مساحة يتم توزيعها
2. `Image(modifier = Modifier.weight(2f))` → تأخذ الصورة ضعف المساحة النسبية مقارنة بالعمود المجاور
3. `Column(modifier = Modifier.weight(1f))` → يأخذ العمود حصة نسبية واحدة من المساحة المتبقية

#### مهم للامتحان ⚠️:
> `weight()` يوزّع المساحة **النسبية** (بنسبة الأرقام لبعضها، مثل 2:1 هنا) وليس المساحة المطلقة، ولا يعمل إلا إذا كان الوالد (Row أو Column) قد حدد أولاً مساحة كلية له عبر شيء مثل `fillMaxWidth()`، وإلا فلا توجد "مساحة متاحة" ليوزّعها.

#### الشرح المبسّط:
`weight()` هو modifier آخر محصور بنطاق معيّن (`RowScope` و`ColumnScope` فقط)، وهو الأداة الأساسية لتوزيع المساحة بشكل نسبي (proportional) بين عدة عناصر بدل الحجم الثابت الذي يعتمد على المحتوى افتراضياً. في المثال، `Image` بوزن `2f` و`Column` بوزن `1f` يعني أن الصورة تأخذ ضعف مساحة العمود (نسبة 2 إلى 1) من إجمالي العرض المتاح — وهذا يتطلب أن يكون لدى `Row` نفسه عرض محدد أولاً (هنا عبر `fillMaxWidth()`) ليكون هناك "كعكة" (مساحة) يمكن تقسيمها بهذه النسب. هذا يربط بمفهومي `fillMaxWidth` و`matchParentSize` السابقين: كلاهما وweight تدور حول كيفية توزيع أو تحديد المساحة داخل نظام القيود في Compose. **تشبيه يومي:** فكّري في توزيع تركة مالية على وريثين بنسبة 2 إلى 1 — لا يمكن توزيع النسب قبل أن تعرفي المبلغ الكلي المتاح أولاً (fillMaxWidth)، ثم يأخذ كل وريث حصته النسبية من ذلك المبلغ الكلي (weight).

**لماذا؟** لأن `weight` يحل مشكلة عملية شائعة جداً في تصميم الواجهات: توزيع مساحة الشاشة بنسب مرنة بين عدة عناصر بدل حجمٍ ثابت لا يتكيف مع أحجام الشاشات المختلفة.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Jetpack Compose` | أداة بناء واجهات مستخدم تصريحية (declarative) موصى بها رسمياً من أندرويد | تستبدل نظام XML/View القديم |
| `Declarative UI` | نمط تصف فيه الواجهة اعتماداً على الحالة الحالية بدل تعديل عناصر يدوياً | `Text(if (clicked) "Clicked!" else "Click Me!")` |
| `@Composable` | تعليق توضيحي إلزامي لأي دالة تصف واجهة في Compose | `@Composable fun Greeting(...)` |
| `Recomposition` | إعادة استدعاء دالة قابلة للتركيب تلقائياً عند تغيّر الحالة التي تعتمد عليها | يحدث عند تغيّر `mutableStateOf` |
| `Composition Phase` | مرحلة تشغيل الدوال القابلة للتركيب وبناء شجرة تصف الواجهة (ماذا) | تُنتج UI tree |
| `Layout Phase` | مرحلة قياس ووضع كل عُقدة في إحداثيات x,y (أين) | خطوات: قياس، تحديد حجم، وضع |
| `Drawing Phase` | مرحلة رسم كل عُقدة فعلياً على Canvas (كيف) | تسير من الأعلى للأسفل |
| `Unidirectional Data Flow` | تدفق البيانات في اتجاه واحد: Composition → Layout → Drawing | باستثناء LazyColumn وBoxWithConstraints |
| `Modifier` | كائن Kotlin قياسي يزيّن أو يعزّز عنصراً قابلاً للتركيب (حجم، سلوك، مظهر) | `Modifier.padding(24.dp)` |
| `Scope Safety` | آلية تقيّد بعض الـmodifiers لتُستخدم فقط ضمن نطاقات معينة (مثل BoxScope) | `matchParentSize`، `weight` |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Column` | يرتّب العناصر عمودياً | يدعم `verticalArrangement`، `horizontalAlignment` |
| `Row` | يرتّب العناصر أفقياً | يدعم `horizontalArrangement`، `verticalAlignment` |
| `Box` | يضع العناصر متراكبة فوق بعضها | يدعم `matchParentSize`، محاذاة داخلية |
| `padding` | يضيف مساحة حول عنصر، يؤثر على القياس | يُغيّر حجم العنصر المحسوب |
| `offset` | يزيح العنصر بصرياً دون تغيير قياسه | قد يسبب تراكباً بصرياً |
| `size` / `requiredSize` | يحدد حجماً مقترحاً (قابل للتجاوز) أو ثابتاً (غير قابل للتجاوز) | requiredSize يتجاوز قيود الوالد |
| `fillMaxWidth/Height/Size` | يملأ أقصى مساحة متاحة من الوالد | بعكس السلوك الافتراضي (الالتفاف حول المحتوى) |
| `weight` | يوزّع المساحة نسبياً بين عناصر Row/Column | محصور بنطاق RowScope/ColumnScope فقط |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| النمط | `Imperative (View System)` | `Declarative (Compose)` | الأول يدوي وعرضة للأخطاء، الثاني تصريحي ومعتمد على الحالة |
| الموضع | `padding` | `offset` | الأول يُحسب ضمن القياس ويؤثر على الجيران، الثاني إزاحة بصرية فقط |
| الحجم | `size` | `requiredSize` | الأول يحترم قيود الوالد، الثاني يفرض الحجم بغض النظر عنها |
| التوسيع | `fillMaxSize` | `matchParentSize` | الأول يطلب كل المساحة من الوالد (قد يوسّعه)، الثاني يتبع حجم Box محدد مسبقاً دون تغييره |
| المحور | `Arrangement` | `Alignment` | الأول يوزّع على المحور الرئيسي، الثاني يحاذي على المحور العرضي |

### قاموس المصطلحات
| الفئة | المصطلحات |
| --- | --- |
| مفاهيم أساسية | `Declarative`، `Imperative`، `Composable Function`، `Recomposition` |
| المراحل الثلاث | `Composition`، `Layout`، `Drawing`، `Unidirectional Data Flow` |
| الحاويات | `Column`، `Row`، `Box`، `Arrangement`، `Alignment` |
| الـModifiers | `padding`، `offset`، `size`، `requiredSize`، `fillMaxWidth/Height/Size`، `weight`، `matchParentSize`، `clickable` |

### أبرز النقاط الذهبية
1. Compose تصريحي (declarative)، والمبرمج يصف "ماذا يجب أن تكون عليه" الواجهة بدل تعديلها يدوياً خطوة بخطوة.
2. أي دالة `@Composable` لا تُرجع قيمة، لأنها تصف حالة الشاشة المستهدفة لا تبنيها.
3. المراحل الثلاث (Composition → Layout → Drawing) تسير دائماً بنفس الترتيب أحادي الاتجاه.
4. في مرحلة Layout: القياس ينزل من الأب للابن، لكن تحديد الحجم/الموضع يصعد من الابن للأب.
5. بدون حاوية ترتيب (Column/Row/Box) تتراكب عناصر الواجهة فوق بعضها البعض تلقائياً.
6. ترتيب الـModifiers في السلسلة يغيّر النتيجة الفعلية — كل modifier يُطبَّق على نتيجة ما قبله.
7. `padding` يؤثر على القياس، بينما `offset` لا يؤثر عليه، فقط على الموضع البصري.
8. بعض الـModifiers (`matchParentSize`، `weight`) محصورة بنطاقات معينة (`BoxScope`، `RowScope`/`ColumnScope`) بسبب "أمان النطاق".

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| الاعتقاد أن ترتيب الـModifiers لا يؤثر على النتيجة | كل modifier يُطبَّق على نتيجة العنصر السابق له في السلسلة، فالترتيب حاسم |
| الخلط بين `size()` و`requiredSize()` | `size()` قابل للتجاوز من قيود الوالد، `requiredSize()` يفرض الحجم دائماً |
| الاعتقاد أن `fillMaxSize` و`matchParentSize` متكافئان داخل Box | الأول قد يوسّع Box نفسه، الثاني يتبع حجم Box المحدَّد مسبقاً فقط |
| نسيان أن دالة composable لا تُرجع قيمة | الدالة تصف الواجهة عبر آثار جانبية (side effects عبر استدعاء composables أخرى) لا عبر return |
| الخلط بين ترتيب القياس وترتيب تحديد الحجم/الوضع في Layout | القياس ينزل من الجذر، لكن الحجم/الوضع يُحدَّد صعوداً من الأوراق للجذر |

---

### خطوات وإجراءات المحاضرة

```algorithm
1 | Composition Phase | Compose Runtime | تشغيل الدوال القابلة للتركيب وبناء شجرة تصف الواجهة (ماذا)
2 | Layout Phase - Measure | Layout Nodes | كل عُقدة تطلب من أبنائها القياس أولاً (نزولاً من الجذر)
3 | Layout Phase - Decide Size | Layout Nodes | كل عُقدة تحدد حجمها الخاص بناءً على قياسات أبنائها (صعوداً من الأوراق)
4 | Layout Phase - Place | Layout Nodes | كل عُقدة تضع أبناءها في إحداثيات x,y نسبةً لموقعها
5 | Drawing Phase | Canvas | كل عُقدة ترسم نفسها فعلياً على الشاشة، نزولاً من الجذر للأوراق
```

```algorithm
1 | تغيير الحالة (State Change) | User Interaction | المستخدم يتفاعل مع عنصر واجهة، فيُطلق حدثاً مثل onClick
2 | إبلاغ منطق التطبيق | App Logic | الحدث يُبلّغ منطق التطبيق الذي يغيّر قيمة الحالة (state)
3 | إعادة التركيب (Recomposition) | Compose Runtime | تُستدعى الدوال القابلة للتركيب المتأثرة تلقائياً بالبيانات الجديدة فقط
4 | تحديث الواجهة | Compose Runtime | تُعاد مراحل Layout وDrawing فقط للأجزاء التي تغيّرت
```

### أنماط الأكواد
- كل دالة `@Composable` تبدأ بالتعليق `@Composable` وتُسمّى غالباً بأسماء تبدأ بحرف كبير (PascalCase) لتمييزها عن الدوال العادية.
- الترتيب الشائع لمعامل `modifier`: يُمرَّر كأول أو معامل مسمّى، ويُمرَّر للابن الأول الذي يُصدر واجهة (best practice).
- سلاسل الـModifier تُكتب غالباً كل عنصر في سطر منفصل لسهولة القراءة: `Modifier.clickable(...).padding(...).fillMaxWidth()`.

### أنماط التعامل
- عند بناء أي بطاقة أو عنصر واجهة معقد، ابدئي بتحديد الحاوية الخارجية (Column/Row/Box) أولاً، ثم أضيفي المحتوى، ثم زيّني بالـModifiers.
- عند الشك في ترتيب modifiers، اسألي نفسك: "ما الذي يجب أن يحيط بماذا؟" — الأول في السلسلة يُطبَّق أولاً، فيصبح الأقرب للتأثير الخارجي.

### الأفكار الشاملة
Jetpack Compose يقوم على ثلاثية مترابطة: النمط التصريحي (وصف الواجهة اعتماداً على الحالة) + المراحل الثلاث (Composition/Layout/Drawing) التي تحوّل هذا الوصف إلى بكسلات فعلية على الشاشة + أدوات الترتيب والتزيين (Layouts وModifiers) التي تمنح المبرمج تحكماً دقيقاً في الشكل النهائي دون الخروج عن النمط التصريحي.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
What is the main paradigm used by Jetpack Compose?
أ) Imperative programming
ب) Declarative programming
ج) Procedural programming
د) Object-oriented programming only

**الإجابة الصحيحة: ب**
**التعليل:** Compose تصريحي بامتياز — المبرمج يصف "ماذا" يجب أن تكون عليه الواجهة اعتماداً على الحالة، لا "كيف" يعدّلها خطوة بخطوة. الخيار (أ) هو النمط القديم (View System) الذي تحاول Compose استبداله. الخيار (ج) و(د) غير دقيقين لأن Compose تصريحي مبني على Kotlin وليس صرفاً إجرائياً أو كائنياً تقليدياً.

---

### السؤال 2 (متوسط)
In the old imperative View System, what method is commonly used to locate a UI element?
أ) `remember()`
ب) `mutableStateOf()`
ج) `findViewById()`
د) `Composable()`

**الإجابة الصحيحة: ج**
**التعليل:** `findViewById()` هي الطريقة التقليدية للبحث عن عنصر واجهة في XML/View System. أما (أ) و(ب) فهما أدوات Compose الحديثة لإدارة الحالة، و(د) ليست دالة موجودة بهذا الاسم بل `@Composable` هو تعليق توضيحي.

---

### السؤال 3 (متوسط)
What does a `@Composable` function return?
أ) A View object
ب) An Int representing the layout ID
ج) Nothing (Unit) — it describes the UI instead
د) A String representing the UI hierarchy

**الإجابة الصحيحة: ج**
**التعليل:** كما شُرح في القسم الثامن، دوال composable لا تُرجع قيمة لأنها تصف حالة الشاشة عبر استدعاء composables أخرى، وليس عبر إرجاع كائن. باقي الخيارات تصف سلوك أنظمة أخرى غير Compose.

---

### السؤال 4 (متوسط)
Which of the following is NOT one of the three main phases of Compose?
أ) Composition
ب) Layout
ج) Drawing
د) Compilation

**الإجابة الصحيحة: د**
**التعليل:** المراحل الثلاث المذكورة صراحة في المحاضرة هي Composition، Layout، وDrawing. Compilation هي خطوة مترجم عامة في Kotlin وليست إحدى مراحل الإطار (frame) في Compose.

---

### السؤال 5 (متوسط)
In the Layout phase, what is the correct order of operations for a single node?
أ) Place children → Measure children → Decide own size
ب) Measure children → Decide own size → Place children
ج) Decide own size → Measure children → Place children
د) Measure children → Place children → Decide own size

**الإجابة الصحيحة: ب**
**التعليل:** الترتيب الصحيح المذكور حرفياً في المحاضرة هو: قياس الأبناء أولاً، ثم تحديد الحجم الخاص بناءً على تلك القياسات، ثم وضع الأبناء. باقي الترتيبات غير منطقية لأن الوضع يحتاج حجماً محدداً مسبقاً، والحجم يحتاج قياسات مسبقة.

---

### السؤال 6 (متوسط)
According to the lecture, what is true about parent and child nodes during the Layout phase?
أ) Parents are measured and sized before their children
ب) Parents measure before their children, but are sized and placed after their children
ج) Children are never measured, only parents
د) Measurement and sizing happen simultaneously for all nodes

**الإجابة الصحيحة: ب**
**التعليل:** هذه الجملة وردت حرفياً في المحاضرة: "parents measure before their children, but are sized and placed after their children" — أي أن طلب القياس ينزل من الأب للابن، لكن تحديد الحجم الفعلي يصعد من الابن للأب بعد معرفة قياساته.

---

### السؤال 7 (متوسط)
What happens in the Drawing phase?
أ) The tree is traversed and each node decides its size
ب) The tree is traversed again from top to bottom, and each node draws itself
ج) The composable functions are executed for the first time
د) User input events are processed

**الإجابة الصحيحة: ب**
**التعليل:** مرحلة الرسم تجتاز الشجرة مرة أخرى من الأعلى للأسفل وترسم كل عُقدة نفسها، بعد أن اكتملت مرحلتا Composition وLayout. الخيار (أ) يصف Layout، و(ج) يصف Composition.

---

### السؤال 8 (متوسط)
Which composable is used to place items on top of one another?
أ) `Row`
ب) `Column`
ج) `Box`
د) `Spacer`

**الإجابة الصحيحة: ج**
**التعليل:** `Box` هو الحاوية المخصصة لوضع العناصر متراكبة فوق بعضها البعض، بينما `Row` يرتّب أفقياً و`Column` عمودياً. `Spacer` هو عنصر فارغ يُستخدم للتباعد وليس حاوية ترتيب.

---

### السؤال 9 (متوسط)
What happens if two composable Text elements are placed inside a composable function without any layout guidance?
أ) They are automatically arranged in a Row
ب) They are automatically arranged in a Column
ج) They are stacked on top of each other, making them unreadable
د) Compose throws a compilation error

**الإجابة الصحيحة: ج**
**التعليل:** كما وضّح المثال في القسم 16، بدون توجيه ترتيب صريح (Column/Row)، يُكدّس Compose العناصر فوق بعضها البعض، مما يجعلها غير قابلة للقراءة. لا يوجد ترتيب تلقائي افتراضي ولا خطأ ترجمة.

---

### السؤال 10 (متوسط)
In a `Row`, which argument controls how children are distributed along the main (horizontal) axis?
أ) `verticalAlignment`
ب) `horizontalArrangement`
ج) `horizontalAlignment`
د) `verticalArrangement`

**الإجابة الصحيحة: ب**
**التعليل:** في `Row`، المحور الرئيسي هو الأفقي، والذي يُتحكم بتوزيعه عبر `horizontalArrangement`؛ بينما `verticalAlignment` يتحكم بالمحاذاة على المحور العرضي (العمودي). الخياران (ج) و(د) هما معاملات `Column` وليس `Row`.

---

### السؤال 11 (متوسط)
What is the key difference between `padding` and `offset` modifiers?
أ) `padding` shifts an element visually without affecting its measurements, while `offset` adds space that is counted in measurements
ب) `offset` shifts an element visually without affecting its measurements, while `padding` adds space that is counted in measurements
ج) They are functionally identical
د) `padding` only works inside a `Box`, while `offset` works everywhere

**الإجابة الصحيحة: ب**
**التعليل:** كما وُضّح في القسم 24، `offset` يُزيح العنصر بصرياً دون تغيير قياساته، بينما `padding` يُضاف فعلياً إلى قياس العنصر ويؤثر على المساحة التي يحجزها بين العناصر المجاورة.

---

### السؤال 12 (متوسط)
Why might a `size()` modifier not be fully respected?
أ) Because `size()` only works inside `Box`
ب) Because it might not satisfy the constraints coming from the layout's parent
ج) Because `size()` is deprecated in Compose
د) Because `size()` requires `requiredSize()` to work first

**الإجابة الصحيحة: ب**
**التعليل:** كما ورد صراحة في القسم 23، الحجم المحدد بـ`size()` قد لا يُحترم إذا لم يُلبِّ قيود الوالد؛ في هذه الحالة يُستخدم `requiredSize()` لفرض الحجم بشكل صارم.

---

### السؤال 13 (متوسط)
What does `matchParentSize` require, in terms of scope?
أ) It works in any composable
ب) It only works within `RowScope`
ج) It only works within `ColumnScope`
د) It only works within `BoxScope`, applying to direct children of `Box`

**الإجابة الصحيحة: د**
**التعليل:** `matchParentSize` مذكور صراحة في المحاضرة كمثال على "أمان النطاق" (scope safety)، وهو متاح فقط داخل `BoxScope` ويُطبَّق على الأبناء المباشرين لـ`Box` فقط.

---

### السؤال 14 (متوسط)
If `fillMaxSize` is used instead of `matchParentSize` inside a `Box` where the sibling composable (like `ArtistCard`) defines the Box's size, what happens?
أ) No difference — both produce identical results
ب) The Spacer takes all available space, causing the Box itself to expand and fill all available space
ج) A compilation error occurs
د) The Spacer disappears from the layout

**الإجابة الصحيحة: ب**
**التعليل:** كما وُضّح في القسم 25، `fillMaxSize` يجعل العنصر يطلب أقصى مساحة من الوالد الأكبر، مما يتسبب في توسّع `Box` نفسه ليملأ تلك المساحة، على عكس `matchParentSize` الذي يتبع فقط حجم Box المحدَّد مسبقاً من محتوى آخر.

---

### السؤال 15 (متوسط)
What is required for the `weight()` modifier to distribute space meaningfully between children of a `Row`?
أ) `weight()` works independently regardless of the parent's own size
ب) The parent `Row` must already have a defined total width to distribute (e.g. via `fillMaxWidth()`)
ج) `weight()` only works with exactly two children
د) `weight()` requires `requiredSize()` to be applied first

**الإجابة الصحيحة: ب**
**التعليل:** كما وُضّح في القسم 26، `weight()` يوزّع مساحة نسبية من إجمالي عرض الوالد، لذا يحتاج الوالد لعرض محدد مسبقاً (غالباً عبر `fillMaxWidth()`) ليكون هناك مساحة فعلية لتوزيعها بالنسب المحددة.

---

### السؤال 16 (متوسط)
Consider this modifier chain: `Modifier.padding(16.dp).clickable(onClick = onClick)`. What area responds to clicks?
أ) The entire area including the padding
ب) Only the area inside the padding, NOT the padding region itself
ج) No area responds to clicks
د) Only the padding region responds to clicks

**الإجابة الصحيحة: ب**
**التعليل:** كما وُضّح في القسم 20، عندما يُطبَّق `padding` قبل `clickable`، تصبح منطقة الـpadding خارج نطاق الاستجابة للنقر، لأن `padding` "غلّف" العنصر أولاً وحدّد حدوداً جديدة قبل وصول `clickable`.
## الجزء الرابع: أسئلة تصحيح الكود

### Debug Question 1 — Type: syntax
**Buggy code:**
```kotlin
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**Find the bug:** Missing the `@Composable` annotation on a function that emits UI.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**شرح الحل:**
1. أي دالة تستدعي دوال composable أخرى (مثل `Text`) يجب أن تحمل تعليق `@Composable` بنفسها، وإلا سيرفض مترجم Compose الكود لأن `Text()` هي دالة composable ولا يمكن استدعاؤها من دالة عادية.

---

### Debug Question 2 — Type: logic
**Buggy code:**
```kotlin
@Composable
fun ArtistCard(artist: Artist, onClick: () -> Unit) {
    Column(
        Modifier
            .padding(16.dp)
            .clickable(onClick = onClick)
            .fillMaxWidth()
    ) {
        // content
    }
}
// Requirement: the entire card area, including the 16dp padding region, must respond to clicks.
```
**Find the bug:** `padding` is applied before `clickable`, so the padding region will NOT respond to clicks — this contradicts the stated requirement.

**Fixed code:**
```kotlin
@Composable
fun ArtistCard(artist: Artist, onClick: () -> Unit) {
    Column(
        Modifier
            .clickable(onClick = onClick)
            .padding(16.dp)
            .fillMaxWidth()
    ) {
        // content
    }
}
```
**شرح الحل:**
1. لجعل كامل المساحة بما فيها الـpadding قابلة للنقر، يجب وضع `clickable` قبل `padding` في السلسلة، لأن كل modifier يُطبَّق على "نتيجة" العنصر السابق له.

---

### Debug Question 3 — Type: misconception
**Buggy code:**
```kotlin
@Composable
fun MatchParentSizeComposable() {
    Box {
        Spacer(
            Modifier
                .fillMaxSize()
                .background(Color.LightGray)
        )
        ArtistCard()
    }
}
// Requirement: Spacer should match ArtistCard's size exactly, without expanding the Box beyond it.
```
**Find the bug:** Using `fillMaxSize()` instead of `matchParentSize()` causes the Box to expand to fill all available space, rather than being sized by `ArtistCard`.

**Fixed code:**
```kotlin
@Composable
fun MatchParentSizeComposable() {
    Box {
        Spacer(
            Modifier
                .matchParentSize()
                .background(Color.LightGray)
        )
        ArtistCard()
    }
}
```
**شرح الحل:**
1. `matchParentSize()` يجعل `Spacer` يتبع حجم `Box` كما هو محدد من `ArtistCard`، بدون أن يشارك هو نفسه في تحديد ذلك الحجم، بعكس `fillMaxSize()` الذي يوسّع `Box` نفسه.

---

### Debug Question 4 — Type: return_check
**Buggy code:**
```kotlin
@Composable
fun Greeting(name: String): Text {
    return Text("Hello $name")
}
```
**Find the bug:** Composable functions should not have a return type/value; they describe UI via side-effect calls, not by returning objects.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**شرح الحل:**
1. الدوال القابلة للتركيب لا تُرجع كائنات واجهة، بل تصف الواجهة عبر استدعاء دوال composable أخرى مباشرة داخل جسمها؛ محاولة إرجاع `Text` كقيمة تخالف فلسفة Compose بالكامل.

---

### Debug Question 5 — Type: dead_code
**Buggy code:**
```kotlin
@Composable
fun ArtistCard(/*...*/) {
    Row(
        modifier = Modifier.size(width = 400.dp, height = 100.dp)
    ) {
        Image(
            /*...*/
            modifier = Modifier.size(150.dp)
        )
        Column { /*...*/ }
    }
}
// Requirement: Image MUST always be exactly 150dp regardless of any parent constraints.
```
**Find the bug:** Using `size(150.dp)` does not guarantee the exact size if the parent's constraints conflict with it — this contradicts the "MUST always" requirement.

**Fixed code:**
```kotlin
@Composable
fun ArtistCard(/*...*/) {
    Row(
        modifier = Modifier.size(width = 400.dp, height = 100.dp)
    ) {
        Image(
            /*...*/
            modifier = Modifier.requiredSize(150.dp)
        )
        Column { /*...*/ }
    }
}
```
**شرح الحل:**
1. `size()` قد لا يُحترم إن تعارض مع قيود الوالد، بينما `requiredSize()` يفرض الحجم المحدد بشكل صارم بغض النظر عن تلك القيود — وهو المطلوب هنا تماماً.

---

### Debug Question 6 — Type: logic
**Buggy code:**
```kotlin
@Composable
fun ArtistCard(/*...*/) {
    Row {
        Image(
            /*...*/
            modifier = Modifier.weight(2f)
        )
        Column(
            modifier = Modifier.weight(1f)
        ) {
            /*...*/
        }
    }
}
// Requirement: Image should take twice the width of Column, proportionally from the full screen width.
```
**Find the bug:** The `Row` itself has no `fillMaxWidth()` (or any defined width), so there is no "total available space" for `weight()` to distribute proportionally — the requirement will not be met reliably.

**Fixed code:**
```kotlin
@Composable
fun ArtistCard(/*...*/) {
    Row(
        modifier = Modifier.fillMaxWidth()
    ) {
        Image(
            /*...*/
            modifier = Modifier.weight(2f)
        )
        Column(
            modifier = Modifier.weight(1f)
        ) {
            /*...*/
        }
    }
}
```
**شرح الحل:**
1. `weight()` يحتاج أن يكون للوالد (`Row`) عرض إجمالي محدد أولاً (عبر `fillMaxWidth()` هنا) حتى تكون هناك مساحة فعلية يمكن توزيعها بالنسب المطلوبة (2:1).

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

### Exercise 1: Build a Profile Header — fill_gaps
**Scenario / Task:**
Complete the missing modifier so that the `Row` places its children horizontally with equal spacing between them, and vertically centers them.

**Requirements:**
1. Fill in the blank: `Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = _______) { /*...*/ }`

**نموذج الحل:**
```kotlin
Row(
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceEvenly
) { /*...*/ }
```
`Arrangement.SpaceEvenly` يوزّع المساحة بالتساوي بين العناصر (وبعضها فراغات متساوية قبل الأول وبعد الأخير)، بينما `verticalAlignment = Alignment.CenterVertically` يحاذي كل العناصر عمودياً في المنتصف.

---

### Exercise 2: Fix the Overlapping Card — code_fix
**Scenario / Task:**
The following code was meant to overlay a "New" badge icon on top of a product image, but instead the icon and image are arranged side by side incorrectly.

**Requirements:**
1. Identify which composable should replace `Row` to achieve the overlay effect.

```kotlin
@Composable
fun ProductThumbnail(image: ImageBitmap) {
    Row {
        Image(bitmap = image, contentDescription = "Product image")
        Icon(Icons.Filled.Star, contentDescription = "New badge")
    }
}
```

**نموذج الحل:**
```kotlin
@Composable
fun ProductThumbnail(image: ImageBitmap) {
    Box {
        Image(bitmap = image, contentDescription = "Product image")
        Icon(Icons.Filled.Star, contentDescription = "New badge")
    }
}
```
يجب استبدال `Row` بـ`Box` لأن الهدف هو تراكب الأيقونة فوق الصورة، وليس وضعهما جنباً إلى جنب.

---

### Exercise 3: Predict the Output — scenario
**Scenario / Task:**
Given this modifier chain, predict which area (padding region or not) will respond to a tap, and explain why.

```kotlin
Modifier
    .fillMaxWidth()
    .clickable(onClick = onClick)
    .padding(24.dp)
```

**نموذج الحل:**
كامل المساحة (بما فيها منطقة الـpadding البالغة 24dp) ستستجيب للنقر، لأن `clickable` طُبِّق قبل `padding` في السلسلة، فتصبح منطقة الـpadding جزءاً من المنطقة القابلة للنقر (نفس منطق القسم 20 لكن مع ترتيب مختلف يعطي نفس النتيجة المرغوبة).

---

### Exercise 4: Design a Weighted Layout — scenario
**Scenario / Task:**
You need a `Row` where a thumbnail image takes 1/4 of the width, and the text content takes 3/4 of the width, filling the entire screen width.

**Requirements:**
1. Write the composable code implementing this layout using `weight()`.

**نموذج الحل:**
```kotlin
@Composable
fun ThumbnailWithText(image: ImageBitmap, title: String) {
    Row(modifier = Modifier.fillMaxWidth()) {
        Image(
            bitmap = image,
            contentDescription = "Thumbnail",
            modifier = Modifier.weight(1f)
        )
        Text(
            text = title,
            modifier = Modifier.weight(3f)
        )
    }
}
```
النسبة 1 إلى 3 بين `weight(1f)` و`weight(3f)` تعطي بالضبط تقسيم ربع للصورة وثلاثة أرباع للنص من إجمالي عرض `Row` (المحدد بـ`fillMaxWidth()`).

---

### Exercise 5: Trace a Recomposition — theory
**Scenario / Task:**
Explain in your own words why clicking a button in Compose does not require the developer to manually call something like `button.setText(...)`.

**نموذج الحل:**
لأن Compose تصريحي: الضغط على الزر يُطلق حدث `onClick` يُبلّغ منطق التطبيق بتغيير قيمة حالة (state) معينة (مثل `clicked`)، وبما أن النص المعروض يعتمد على هذه الحالة، يُستدعى تلقائياً composable المسؤول عن عرضه من جديد (recomposition) بالقيمة الجديدة، دون أي تدخل يدوي من المبرمج لتحديث النص.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: Row containing two weighted children
**Input:**
```kotlin
Row(modifier = Modifier.fillMaxWidth()) {   // total width = 300dp
    Box(modifier = Modifier.weight(1f))     // Child A
    Box(modifier = Modifier.weight(2f))     // Child B
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Row يحدد عرضه الكلي عبر fillMaxWidth | العرض = 300dp |
| 2 | حساب مجموع الأوزان | ؟ |
| 3 | حساب عرض Child A | ؟ |
| 4 | حساب عرض Child B | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Row يحدد عرضه الكلي عبر fillMaxWidth | العرض = 300dp |
| 2 | حساب مجموع الأوزان | 1 + 2 = 3 |
| 3 | حساب عرض Child A | (1/3) × 300dp = 100dp |
| 4 | حساب عرض Child B | (2/3) × 300dp = 200dp |

**Result:** Child A width = 100dp, Child B width = 200dp.

---

### Trace Exercise 2: Layout phase measurement order
**Input:**
```kotlin
Column {              // Node C
    Row {              // Node R
        Text("A")       // Node T1
        Text("B")       // Node T2
    }
    Text("C")           // Node T3
}
```

**Trace step by step (complete the table):**
| الخطوة | العُقدة | العملية |
| --- | --- | --- |
| 1 | ? | يُطلب منها القياس أولاً كجذر |
| 2 | ? | تطلب من R القياس |
| 3 | ? | يُقاس أولاً كابن ورقي لـ R |
| 4 | ? | يُقاس ثانياً كابن ورقي لـ R |
| 5 | ? | يحدد حجمه بناءً على T1 وT2 |
| 6 | ? | يُقاس كابن ثانٍ لـ C |
| 7 | ? | يحدد حجمه النهائي بناءً على R وT3 |

**نموذج الحل:**
| الخطوة | العُقدة | العملية |
| --- | --- | --- |
| 1 | C (Column) | يُطلب منها القياس أولاً كجذر |
| 2 | R (Row) | تطلب من R القياس (ابنها الأول) |
| 3 | T1 ("A") | يُقاس أولاً كابن ورقي لـ R |
| 4 | T2 ("B") | يُقاس ثانياً كابن ورقي لـ R |
| 5 | R (Row) | يحدد حجمه بناءً على T1 وT2 |
| 6 | T3 ("C") | يُقاس كابن ثانٍ لـ C |
| 7 | C (Column) | يحدد حجمه النهائي بناءً على R وT3 |

**Result:** ترتيب القياس: C → R → T1 → T2 → (R يحدد حجمه) → T3 → (C يحدد حجمه)، وهو نفس نمط "الآباء يُقاسون قبل الأبناء لكن يُحدَّد حجمهم بعدهم" الذي شرحته المحاضرة.

---

### Trace Exercise 3: matchParentSize vs fillMaxSize
**Input:**
```kotlin
Box {
    Spacer(modifier = Modifier.___SIZE_MODIFIER___()) 
    ArtistCard()   // ArtistCard has a fixed intrinsic size of 200dp x 100dp
}
```

**Trace step by step (complete the table):**
| السيناريو | الـModifier المستخدم | حجم Box النهائي | حجم Spacer النهائي |
| --- | --- | --- | --- |
| A | matchParentSize | ? | ? |
| B | fillMaxSize | ? | ? |

**نموذج الحل:**
| السيناريو | الـModifier المستخدم | حجم Box النهائي | حجم Spacer النهائي |
| --- | --- | --- | --- |
| A | matchParentSize | 200dp × 100dp (يحدده ArtistCard) | 200dp × 100dp (يتبع Box) |
| B | fillMaxSize | يتوسع ليملأ كل المساحة المتاحة من والد Box | يملأ نفس تلك المساحة الموسّعة |

**Result:** في السيناريو A يبقى Box بحجم ArtistCard تماماً، بينما في B يتوسع Box نفسه استجابة لطلب Spacer لأقصى مساحة متاحة.

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: Compose Phases Diagram
**Task:**
Draw a diagram showing the three phases of a Compose frame (Composition, Layout, Drawing), including the direction of data flow between them (unidirectional data flow), and note the two exceptions mentioned in the lecture where composition depends on layout.

**نموذج الإجابة:**
```diagram
type: flowchart
title: Compose Frame Phases
direction: TD
nodes:
  - id: data
    label: "App State / Data"
    kind: data
    level: 0
  - id: composition
    label: "Composition (What)"
    kind: process
    level: 1
  - id: layout
    label: "Layout (Where)"
    kind: process
    level: 2
  - id: drawing
    label: "Drawing (How)"
    kind: process
    level: 3
  - id: ui
    label: "UI on Screen"
    kind: output
    level: 4
edges:
  - from: data
    to: composition
  - from: composition
    to: layout
  - from: layout
    to: drawing
  - from: drawing
    to: ui
```
> ملاحظة: `BoxWithConstraints`، `LazyColumn`، و`LazyRow` هي استثناءات حيث تعتمد Composition فعلياً على نتيجة Layout الخاصة بالوالد (اتجاه عكسي جزئي).

**معايير التقييم:**
- ذُكرت المراحل الثلاث بالترتيب الصحيح (Composition → Layout → Drawing)
- وُضّح اتجاه تدفق البيانات (أحادي الاتجاه)
- ذُكرت الاستثناءات الثلاثة (BoxWithConstraints، LazyColumn، LazyRow)

---

### Design Question 2: Weighted Card Architecture
**Task:**
Design (describe or sketch) a composable layout for a music player mini-bar that has: an album thumbnail (fixed 60dp size, using `requiredSize`), a middle section with song title and artist name stacked vertically taking up flexible remaining space (using `weight`), and a play/pause icon on the far right. Specify which layout container and modifiers you would use for each part.

**نموذج الإجابة:**
```kotlin
@Composable
fun MiniPlayerBar(albumArt: ImageBitmap, title: String, artist: String, onPlayPause: () -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Image(
            bitmap = albumArt,
            contentDescription = "Album Art",
            modifier = Modifier.requiredSize(60.dp)
        )
        Column(
            modifier = Modifier.weight(1f).padding(horizontal = 8.dp)
        ) {
            Text(title)
            Text(artist)
        }
        Icon(
            Icons.Filled.PlayArrow,
            contentDescription = "Play/Pause",
            modifier = Modifier.clickable(onClick = onPlayPause)
        )
    }
}
```

**معايير التقييم:**
- استُخدم `Row` كحاوية خارجية أفقية مع `fillMaxWidth()`
- استُخدم `requiredSize` للصورة لضمان حجم ثابت 60dp
- استُخدم `weight(1f)` للعمود الأوسط ليأخذ المساحة المتبقية بمرونة
- الأيقونة قابلة للنقر (`clickable`) لتفعيل تشغيل/إيقاف الأغنية

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the fundamental difference between imperative and declarative UI paradigms?
A: Imperative requires manually finding and mutating views; declarative describes the UI as a function of the current state, and the framework updates it automatically.

**Q2:** What annotation must every function that emits UI in Compose have?
A: `@Composable`.

**Q3:** What is "recomposition"?
A: The process of re-invoking composable functions automatically when the state they read changes, causing affected UI elements to be redrawn.

**Q4:** Name the three phases of a Compose frame.
A: Composition, Layout, and Drawing.

**Q5:** What are the two steps within the Layout phase?
A: Measurement and placement.

**Q6:** In terms of measuring and sizing, what is the relationship between parent and child nodes?
A: Parents measure before their children, but are sized and placed after their children.

**Q7:** Which composable arranges children vertically?
A: `Column`.

**Q8:** Which composable arranges children on top of one another?
A: `Box`.

**Q9:** What is the key difference between `padding` and `offset`?
A: `padding` adds space counted in the element's measurements; `offset` shifts the element visually without changing its measurements.

**Q10:** Why might `Modifier.size()` not be respected exactly?
A: Because it might not satisfy the constraints coming from the parent layout; `requiredSize()` should be used to force an exact size.

**Q11:** What scope is `matchParentSize` restricted to?
A: `BoxScope` — it only applies to direct children of `Box`.

**Q12:** What scope is `weight()` restricted to?
A: `RowScope` and `ColumnScope`.

**Q13:** Why does the order of modifiers in a chain matter?
A: Because each `Modifier.Element` is applied to the result produced by the previous element in the chain, not to the original element in isolation.

**Q14:** What is "modifier hoisting" and why is it beneficial?
A: Extracting a modifier chain into a variable outside the composable to reuse the same instance across recompositions, avoiding repeated allocation and comparison overhead.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> مثال شامل يجمع Column، Row، Box، وModifiers متعددة في بطاقة فنان كاملة (ArtistCard) كما وردت مجزّأة عبر المحاضرة.

```kotlin
// Data model representing an artist
class Artist {
    val image: ImageBitmap = ImageBitmap(0, 0)
    val name = ""
    val lastSeenOnline = ""
}

// Full ArtistCard combining Row, Column, Modifiers, clickable behavior, and a Card
val onClick = {}

@Composable
fun ArtistCard(artist: Artist, onClick: () -> Unit) {
    val padding = 16.dp
    Column(
        Modifier
            .clickable(onClick = onClick)  // whole card, including padding, is clickable
            .padding(padding)
            .fillMaxWidth()
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Image(
                bitmap = artist.image,
                contentDescription = "Artist image",
                modifier = Modifier.requiredSize(60.dp)
            )
            Column(modifier = Modifier.weight(1f).padding(start = 8.dp)) {
                Text(text = artist.name)
                Text(
                    text = artist.lastSeenOnline,
                    modifier = Modifier.offset(x = 4.dp)
                )
            }
        }
        Spacer(Modifier.size(padding))
        Card(
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        ) {
            Box {
                Spacer(
                    Modifier
                        .matchParentSize()
                        .background(Color.LightGray)
                )
                Icon(Icons.Filled.Check, contentDescription = "Check mark")
            }
        }
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

**Question 1:** Explain the declarative programming paradigm and how it differs from the imperative approach used in the traditional Android View System.
**نموذج الإجابة:** النمط التصريحي يعني وصف الواجهة كدالة تعتمد على الحالة الحالية بدل التعديل اليدوي المباشر على عناصر موجودة. في View System الإجرائي، يجب على المبرمج تتبّع كل عنصر يدوياً عبر `findViewById()` وتحديثه بنفسه، مما يزيد خطر الأخطاء وعدم الاتساق. في Compose، يُعاد استدعاء الدالة القابلة للتركيب تلقائياً (recomposition) عند تغيّر الحالة، فيتولى الإطار مهمة التحديث دون تدخل يدوي، مما يقلل الكود المتكرر والأخطاء.

---

**Question 2:** Describe the three phases of a Compose frame and explain the purpose of each.
**نموذج الإجابة:** التركيب (Composition) يحدد "ماذا" سيُعرض بتشغيل الدوال القابلة للتركيب وبناء شجرة تصف الواجهة. التخطيط (Layout) يحدد "أين" يوضع كل عنصر عبر خطوتين (قياس ثم وضع)، منتجاً عرضاً وارتفاعاً وإحداثيات لكل عُقدة. الرسم (Drawing) يحدد "كيف" تُرسم العناصر فعلياً على `Canvas`. تسير هذه المراحل الثلاث بترتيب ثابت أحادي الاتجاه لإنتاج كل إطار.

---

**Question 3:** Why does a `@Composable` function not return a value, and how does it "emit" UI instead?
**نموذج الإجابة:** لأن الدالة تصف حالة الشاشة المستهدفة بدل بناء كائن واجهة وإرجاعه؛ هي "تصدر" (emit) عناصر واجهة باستدعاء دوال قابلة للتركيب أخرى مباشرة داخل جسمها (مثل استدعاء `Text()` داخل `Greeting()`)، فتصبح هذه الاستدعاءات هي وسيلة "الإخراج" بدل قيمة إرجاع تقليدية.

---

**Question 4:** Explain the measurement algorithm in the Layout phase, including why parents are measured before children but sized after them.
**نموذج الإجابة:** تسير الخوارزمية بثلاث خطوات لكل عُقدة: قياس الأبناء، تحديد الحجم الخاص بناءً على تلك القياسات، ثم وضع الأبناء. طلب القياس ينزل من الجذر إلى الأوراق، لكن كل عُقدة لا يمكنها تحديد حجمها الفعلي إلا بعد أن تعرف أحجام أبنائها أولاً، لذا يصعد تحديد الحجم والوضع الفعلي من الأوراق إلى الجذر — وهذا يفسر لماذا "الآباء يُقاسون أولاً لكن يُحدَّد حجمهم أخيراً".

---

**Question 5:** Compare `Column`, `Row`, and `Box`, and explain when to use each.
**نموذج الإجابة:** `Column` يرتّب أبناءه عمودياً (الواحد تحت الآخر)، `Row` يرتّبهم أفقياً (جنباً إلى جنب)، بينما `Box` يضعهم متراكبين فوق بعضهم البعض عن قصد. تُستخدم `Column`/`Row` لبناء تسلسلات خطية من العناصر، بينما تُستخدم `Box` عندما نريد تراكباً متعمداً، مثل وضع أيقونة فوق صورة.

---

**Question 6:** Explain why the order of modifiers in a chain matters, using the `clickable`/`padding` example.
**نموذج الإجابة:** كل `Modifier.Element` يُطبَّق على النتيجة المُغلَّفة من العنصر السابق له في السلسلة، وليس على العنصر الأصلي بمعزل. إن وُضع `clickable` قبل `padding`، تصبح منطقة الـpadding جزءاً من منطقة الاستجابة للنقر؛ أما إن عُكس الترتيب، فتصبح منطقة الـpadding خارج نطاق الاستجابة للنقر، لأن `padding` طُبِّق أولاً وحدّد حدوداً جديدة قبل وصول `clickable`.

---

**Question 7:** What is scope safety in Compose, and give two examples of modifiers restricted by it.
**نموذج الإجابة:** أمان النطاق هو آلية يمنع بها Compose استخدام بعض الـModifiers خارج سياقات محددة منطقياً، مما يمنع أخطاء لا معنى لها ويوفر وقت التجربة والخطأ. مثالان: `matchParentSize` متاح فقط ضمن `BoxScope` (للأبناء المباشرين لـBox)، و`weight()` متاح فقط ضمن `RowScope` و`ColumnScope`.

---

**Question 8:** Explain modifier hoisting and its performance benefit.
**نموذج الإجابة:** رفع الـModifier هو استخراج سلسلة modifier إلى متغيّر خارج الدالة القابلة للتركيب لإعادة استخدام نفس النسخة في كل استدعاء بدل إنشاء نسخة جديدة كل مرة. يحسّن هذا الأداء بطريقتين: يمنع إعادة تخصيص (re-allocation) الذاكرة عند كل recomposition، ويخفف عبء مقارنة سلاسل modifier الطويلة عند تحديد ما إذا كانت الدالة تحتاج إعادة تشغيل.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين النمط الإجرائي (Imperative) والتصريحي (Declarative) بمثال
- [ ] أعرف أن أي دالة composable يجب أن تحمل `@Composable` ولا تُرجع قيمة
- [ ] أستطيع ترتيب المراحل الثلاث (Composition → Layout → Drawing) وشرح كل مرحلة
- [ ] أفهم خوارزمية القياس الثلاثية (measure → decide size → place) وترتيبها العكسي بين الآباء والأبناء
- [ ] أستطيع تتبّع مثال SearchResult بالترقيم الصحيح (1 إلى 10)
- [ ] أفرّق بين Column وRow وBox ومتى أستخدم كلاً منهما
- [ ] أفرّق بين Arrangement (المحور الرئيسي) وAlignment (المحور العرضي)
- [ ] أفهم أن ترتيب سلسلة الـModifiers يغيّر النتيجة الفعلية
- [ ] أفرّق بين padding (يؤثر على القياس) وoffset (لا يؤثر على القياس)
- [ ] أفرّق بين size (قابل للتجاوز) وrequiredSize (غير قابل للتجاوز)
- [ ] أفرّق بين matchParentSize (يتبع Box) وfillMaxSize (قد يوسّع Box)
- [ ] أعرف أن weight محصور بـ RowScope/ColumnScope ويحتاج والداً له عرض/ارتفاع محدد مسبقاً
- [ ] أفهم فائدة رفع الـModifiers (hoisting) للأداء

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Kotlin Basics/OOP | Compose UI (هذه المحاضرة) | Compose مبني بالكامل بلغة Kotlin؛ فهم الدوال والكائنات ضروري |
| Compose UI (هذه) | Compose State & Navigation (المحاضرة القادمة) | recomposition هنا تمهّد لفهم remember وmutableStateOf لاحقاً |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| النمط التصريحي | صف "ماذا" لا "كيف"؛ Compose يتكفل بالتحديث عبر recomposition |
| المراحل الثلاث | Composition (ماذا) → Layout (أين) → Drawing (كيف)، اتجاه واحد |
| Layout | القياس ينزل، الحجم/الوضع يصعد؛ كل عُقدة تُزار مرة واحدة فقط |
| الحاويات | Column (عمودي)، Row (أفقي)، Box (متراكب) |
| Modifiers | ترتيب السلسلة مهم؛ padding يؤثر على القياس، offset لا يؤثر |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `@Composable` | تعليق إلزامي لدالة تصف واجهة | كل دالة composable |
| `Recomposition` | إعادة استدعاء تلقائية عند تغيّر الحالة | تحديث الواجهة |
| `weight()` | توزيع مساحة نسبي | RowScope/ColumnScope فقط |
| `matchParentSize()` | اتباع حجم Box المحدد مسبقاً | BoxScope فقط |
| `requiredSize()` | فرض حجم ثابت متجاوزاً قيود الوالد | أي composable |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | composable function لا تُرجع قيمة أبداً — هي تصف لا تبني |
| 2 | الآباء يُقاسون أولاً لكن يُحدَّد حجمهم ووضعهم أخيراً (بعد الأبناء) |
| 3 | بدون Column/Row/Box، تتراكب العناصر فوق بعضها تلقائياً |
| 4 | ترتيب الـModifiers في السلسلة يغيّر النتيجة — الأول يُطبَّق أولاً |
| 5 | offset لا يغيّر القياس، padding يغيّره |
| 6 | matchParentSize وweight محصوران بنطاقات معينة (BoxScope، RowScope/ColumnScope) |

<!-- VALIDATION: تم تغطية كل شرائح المحاضرة (Thinking in Compose، Declarative Paradigm، Composable Function example، Compose Phases الثلاث بأمثلتها، Layouts القياسية، Compose Modifiers وأنواعها المدمجة وscope safety). تم اتباع بنية القالب المطلوب: نص أصلي + ترجمة حرفية + شرح مبسط لكل قسم، جداول ملخصة، 16 MCQ، 6 أسئلة تصحيح كود، 5 تمارين إضافية، 3 تمارين تتبع، سؤالا تصميم، 14 بطاقة Q&A، كود كامل مجمّع، 8 أسئلة نظرية، قائمة فحص ذاتي، وCheat Sheet. -->

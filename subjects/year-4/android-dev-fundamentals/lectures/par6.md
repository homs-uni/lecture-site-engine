# المحاضرة 6 — Jetpack Compose: التفكير التصريحي والتخطيطات والـ Modifiers (Compose UI)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** User Interface Development with Jetpack Compose -1-

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| أساسيات Kotlin | `val/var`، `functions`، `null safety` | فهم صياغة الكود الأساسية |
| مكونات التطبيق | `Activity`، `AndroidManifest.xml` | هيكل تطبيق يعمل |
| **بناء الواجهة التصريحية (Compose UI)** ← أنت هنا | `@Composable`، `Column/Row/Box`، `Modifier` | واجهة مستخدم تتفاعل مع الحالة تلقائياً |
| الحالة والتنقل (لاحقاً) | `remember`، `mutableStateOf`، `NavController` | تطبيق متعدد الشاشات يدير حالته |

> **نوع هذه المحاضرة:** Compose UI — تُبنى على مفاهيم `@Composable` و `Recomposition` و مراحل Compose الثلاث (Composition, Layout, Drawing).

---

## الجزء الأول: الشرح التفصيلي

### 1. التفكير بطريقة Compose (Thinking in Compose)

#### النص الأصلي يقول (English):
> "Jetpack Compose is a modern, declarative UI Toolkit for building native UI and is officially recommended by Android. It simplifies and accelerates writing and maintaining your app UI by providing a declarative API that lets you render your app UI without imperatively mutating frontend views. It quickly bring your app to life with less code, powerful tools, and intuitive Kotlin APIs. Jetpack Compose provides pre-built UI components so you can implement your app's UI with graphics, animations, and other visual elements with minimal code."

#### الشرح المبسّط:
`Jetpack Compose` هي أداة رسمية من Google لبناء واجهات المستخدم في أندرويد، لكنها تعتمد أسلوباً مختلفاً تماماً عن الطريقة القديمة (نظام `View` و XML). بدلاً من أن تخبر النظام "اذهب وغيّر هذا الزر"، أنت فقط **تصف** كيف يجب أن تبدو الشاشة بناءً على البيانات الحالية، و Compose يتكفّل بالباقي.

**لماذا؟** لأن التطبيقات الحديثة معقدة جداً، وإدارة كل عنصر يدوياً (كما في XML) تُنتج كوداً طويلاً وعرضة للأخطاء. Compose يقلل الكود ويجعل الواجهة أكثر توقعاً واتساقاً.

#### 💡 التشبيه:
> تخيّل أنك تطلب من رسّام أن "يرسم مشهد غروب الشمس" (تصريحي) بدلاً من أن تُملي عليه كل ضربة فرشاة بالتفصيل (أمر إجرائي).
> **وجه الشبه:** وصف النتيجة النهائية = الأسلوب التصريحي، تنفيذ كل خطوة يدوياً = الأسلوب الإجرائي.

---

### 2. النموذج البرمجي التصريحي (The Declarative Programming Paradigm)

#### النص الأصلي يقول (English):
> "Historically, an Android view hierarchy has been representable as a tree of UI widgets. As the state of the app changes... the UI hierarchy needs to be updated to display the current data. The most common way of updating the UI is to walk the tree using functions like findViewById(), and change nodes by calling methods like button.setText(String)... Manipulating views manually increases the likelihood of errors."

#### الشرح المبسّط:
في النظام القديم (`View System`)، واجهة التطبيق تُمثَّل كشجرة من العناصر (Widgets). عند تغيّر البيانات (مثلاً المستخدم ضغط زراً)، على المبرمج أن يبحث يدوياً عن العنصر المطلوب بواسطة `findViewById()` ثم يُعدّل حالته الداخلية مباشرة (مثل `button.setText(...)`).

**لماذا هذا خطر؟** لأنه إذا كانت نفس البيانات معروضة في أكثر من مكان، قد ينسى المبرمج تحديث أحدها، أو قد يحاول تعديل عنصر أُزيل بالفعل من الشجرة، مما يُسبب حالة غير متسقة (`illegal state`).

#### الفهم الخاطئ الشائع ❌: البيانات تُحدَّث تلقائياً في XML بمجرد تغييرها في الكود.
#### الفهم الصحيح ✅: في `View System` يجب استدعاء `setter` صراحةً لكل عنصر عرض في كل مرة تتغيّر فيها البيانات.

---

### 2.1. التحول نحو النموذج التصريحي

#### النص الأصلي يقول (English):
> "Over the last several years, the entire industry has started shifting to a declarative UI model... The technique works by conceptually regenerating the entire screen from scratch, then applying only the necessary changes... To mitigate this cost, Compose intelligently chooses which parts of the UI need to be redrawn at any given time."

#### الشرح المبسّط:
النموذج التصريحي يعمل بفكرة "أعِد بناء الشاشة بالكامل من الصفر" في كل مرة تتغيّر فيها البيانات، لكن بدلاً من رسم كل شيء فعلياً من جديد (وهو مكلف جداً من ناحية الوقت والطاقة)، فإن Compose "ذكي" بما يكفي ليكتشف فقط الأجزاء التي تغيّرت ويُحدّثها فقط.

**لماذا؟** لأن إعادة رسم الشاشة بالكامل في كل تفاعل صغير (كضغطة زر) سيكون بطيئاً جداً ويستهلك البطارية، لذلك يحتاج Compose لآلية تحسين اسمها `Recomposition الانتقائي`.

#### مهم للامتحان ⚠️:
> "التصريحية" لا تعني حرفياً إعادة رسم كل شيء من جديد فعلياً على الشاشة، بل هي نموذج **تصوّري** (conceptual) يُحسّنه Compose داخلياً عبر التتبع الذكي للتغييرات.

---

### 2.2. مثال مقارن: XML/Kotlin مقابل Jetpack Compose

#### النص الأصلي يقول (English):
> "In this imperative approach, you must manually locate the button, set its properties, and update its state when clicked... In this declarative approach: No need to find views manually – The UI is defined directly in Kotlin. State management is built-in – Compose automatically updates UI when the state changes."

#### الشرح المبسّط:
**الطريقة الإجرائية (XML + Kotlin):**

#### 💻 الكود: تعريف زر في XML وتحديثه إجرائياً

#### ما هذا الكود؟
> يُعرّف زراً في ملف XML، ثم يبحث عنه في Kotlin ويُغيّر نصّه عند الضغط عليه يدوياً.

```xml
<!-- Define a button widget in the layout file -->
<Button
    android:id="@+id/myButton"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Click Me!"
    android:background="@color/blue"
    android:textColor="@color/white" />
```
```kotlin
// Locate the button by its id
val button: Button = findViewById(R.id.myButton)
// Manually update its text when clicked
button.setOnClickListener {
    button.text = "Clicked!"
}
```

#### شرح كل سطر:
1. `android:id="@+id/myButton"` → معرّف فريد للزر — يُستخدم لاحقاً للبحث عنه.
2. `findViewById(R.id.myButton)` → يبحث يدوياً عن الزر داخل الشجرة — عملية إجرائية صريحة.
3. `button.setOnClickListener { ... }` → يُسجّل استجابة للحدث.
4. `button.text = "Clicked!"` → يُغيّر الحالة الداخلية للزر مباشرة (mutation).

**المكتبات المطلوبة (Imports):**
> `import androidx.appcompat.widget.Button`

**الناتج المتوقع (لقطة الشاشة):**
> زر أزرق يحمل نص "Click Me!"، وبعد الضغط يتحول النص إلى "Clicked!".

---

**الطريقة التصريحية (Jetpack Compose):**

#### 💻 الكود: زر تفاعلي بأسلوب Compose

#### ما هذا الكود؟
> يبني نفس الزر لكن بأسلوب تصريحي: يصف "ما الذي يجب عرضه" اعتماداً على متغيّر حالة `clicked`.

```kotlin
@Composable
fun MyButton() {
    // Declare a state variable that survives recomposition
    var clicked by remember { mutableStateOf(false) }
    // Describe a Button and what it should show based on state
    Button(onClick = { clicked = true }) {
        Text(text = if (clicked) "Clicked!" else "Click Me!")
    }
}
```

#### شرح كل سطر:
1. `@Composable` → يُعلم مترجم Compose أن هذه الدالة تُنتج واجهة.
2. `var clicked by remember { mutableStateOf(false) }` → متغيّر حالة يحتفظ بقيمته عبر عمليات `Recomposition`.
3. `Button(onClick = { clicked = true })` → عند الضغط، تُغيَّر الحالة فقط، **وليس** الزر نفسه.
4. `Text(text = if (clicked) ...)` → النص يُشتق تلقائياً من الحالة الحالية، دون أي بحث يدوي.

**الناتج المتوقع (لقطة الشاشة):**
> زر يعرض "Click Me!" ثم يتحول تلقائياً إلى "Clicked!" بعد الضغط، دون أي استدعاء يدوي لتعديل الزر.

#### ⚖️ المقايضة: الأسلوب الإجرائي مقابل التصريحي

| | الأسلوب الإجرائي (View System) | الأسلوب التصريحي (Compose) |
| --- | --- | --- |
| المزايا | تحكم دقيق مباشر بكل عنصر | كود أقل، أخطاء أقل، اتساق تلقائي |
| العيوب | كود مطوّل، خطر عدم الاتساق | يحتاج فهم مفاهيم جديدة (State, Recomposition) |
| متى تختاره | مشاريع قديمة قائمة على XML | أي مشروع جديد يوصى به رسمياً من Google |

---

### 3. تحوّل النموذج التصريحي: تدفق البيانات والأحداث (The Declarative Paradigm Shift)

#### النص الأصلي يقول (English):
> "In Compose's declarative approach, widgets are relatively stateless and don't expose setter or getter functions... You update UI by calling the same composable function with different arguments... When the user interacts with the UI, the UI raises events such as onClick. Those events should notify the app logic, which can then change the app's state. When the state changes, the composable functions are called again with the new data. This causes the UI elements to be redrawn--this process is called recomposition."

#### الشرح المبسّط:
في Compose، العناصر (Widgets) لا تحتفظ بحالتها الخاصة ولا تملك دوال `get/set`. بدلاً من ذلك:
- منطق التطبيق (App Logic) يُرسل **البيانات** للأسفل عبر شجرة الدوال القابلة للتركيب (Composables).
- عندما يتفاعل المستخدم (كالضغط)، تُرسل **الأحداث** للأعلى إلى منطق التطبيق.
- منطق التطبيق يُغيّر الحالة، فتُستدعى دوال Composable من جديد بالبيانات الجديدة — وهذا يُسمى **Recomposition**.

**لماذا؟** هذا يضمن اتجاهاً واحداً واضحاً لتدفق البيانات (Unidirectional Data Flow)، ما يمنع التضارب والحالات غير المتسقة.

#### ⚙️ الخطوات / الخوارزمية: دورة تدفق البيانات والأحداث في Compose

#### ما هدف هذه العملية؟
> توضيح كيف تنتقل البيانات من الأعلى للأسفل، والأحداث من الأسفل للأعلى، عبر شجرة الواجهة.

```algorithm
1 | توفير البيانات | App Logic | تُمرَّر البيانات إلى الدالة القابلة للتركيب العليا (Top-level Composable)
2 | بناء الشجرة | Composable Functions | كل دالة تستدعي دوال أخرى وتمرر لها الجزء المناسب من البيانات
3 | تفاعل المستخدم | UI Element | يُطلق حدثاً مثل onClick صعوداً نحو منطق التطبيق
4 | تحديث الحالة | App Logic | يستجيب للحدث ويُغيّر متغيّر الحالة (State)
5 | إعادة التركيب | Compose Runtime | تُستدعى الدوال القابلة للتركيب مجدداً بالبيانات الجديدة (Recomposition)
```

#### نقاط التنفيذ:
- اتجاه البيانات دائماً من الأعلى للأسفل (down)، واتجاه الأحداث دائماً من الأسفل للأعلى (up).
- لا يحدث Recomposition لكل الشجرة، بل فقط للأجزاء المتأثرة فعلياً بتغيّر الحالة.

#### 📊 المخطط: تدفق البيانات والأحداث (Screen → NewsFeed → Story Widgets)

#### ما هذا المخطط؟
> يوضّح مثال المحاضرة (صفحة 8-9) لشجرة واجهة تضم `Screen`، `NewsFeed`، وثلاثة `Story Widget`، مع اتجاهي البيانات والأحداث.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Screen | composable | الجذر الأعلى للشاشة |
| 2 | NewsFeed | composable | يستقبل البيانات من Screen |
| 3 | Story Widget (×3) | composable | عناصر فرعية، كل واحد يمثل خبراً/قصة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Screen | NewsFeed | Data ↓ | اتجاه واحد للأسفل | تمرير البيانات |
| Story Widget | NewsFeed | Event ↑ | اتجاه واحد للأعلى | مثلاً ضغط المستخدم على قصة واحدة (كما في الشريحة 9 حيث تُظهر Story Widget الأولى باللون الأخضر) |
| NewsFeed | Screen | Event ↑ | اتجاه واحد للأعلى | إشعار الحدث للأعلى إذا لزم |

```diagram
type: flowchart
title: Data and Event Flow in Compose
direction: TD
nodes:
  - id: screen
    label: Screen
    kind: composable
    level: 0
  - id: newsfeed
    label: NewsFeed
    kind: composable
    level: 1
  - id: story1
    label: Story Widget 1
    kind: composable
    level: 2
  - id: story2
    label: Story Widget 2
    kind: composable
    level: 2
  - id: story3
    label: Story Widget 3
    kind: composable
    level: 2
edges:
  - from: screen
    to: newsfeed
  - from: newsfeed
    to: story1
  - from: newsfeed
    to: story2
  - from: newsfeed
    to: story3
```

---

### 4. مقارنة شاملة: Imperative UI مقابل Declarative UI

#### النص الأصلي يقول (English):
> "View System | Jetpack Compose — Imperative UI | Declarative UI — Manual UI updates | State-driven UI — Mutable View hierarchy | UI described with composable functions — High risk of inconsistent UI state | Consistent UI via recomposition — UI split across XML and Kotlin | UI defined entirely in Kotlin — More boilerplate code | Less boilerplate code — Explicit UI update management | Automatic selective recomposition"

#### الشرح المبسّط:
هذا الجدول يلخص كل الفروقات الجوهرية بين الأسلوبين في نقاط مباشرة (انظر جدول المقارنات في الملخص أدناه).

**لماذا هذا الجدول مهم؟** لأنه يظهر بوضوح لماذا اختارت Google التحول نحو Compose: تقليل الكود المتكرر، وتقليل مخاطر الأخطاء البشرية.

---

### 5. مثال على دالة قابلة للتركيب (An Example Composable Function)

#### النص الأصلي يقول (English):
> "Using Compose, you can build your user interface by defining a set of composable functions that take in data and emit UI elements. Example: a Greeting widget, which takes in a String and emits a Text widget which displays a greeting message."

#### الشرح المبسّط:
كل واجهة في Compose تُبنى من دوال صغيرة تأخذ بيانات (Input) وتُخرج عناصر واجهة (UI Elements). المثال الكلاسيكي هو دالة `Greeting` التي تأخذ اسماً وتعرض رسالة ترحيب.

#### 💻 الكود: دالة Greeting البسيطة

#### ما هذا الكود؟
> دالة قابلة للتركيب تستقبل `String` وتعرضه ضمن نص ترحيبي باستخدام `Text`.

```kotlin
@Composable
fun Greeting(name: String) {
    // Emit a Text composable with a greeting message
    Text("Hello $name")
}
```

#### شرح كل سطر:
1. `@Composable` → يجعل الدالة جزءاً من نظام Compose، وتُصبح قابلة للاستدعاء من دوال Composable أخرى فقط.
2. `fun Greeting(name: String)` → تأخذ بيانات إدخال (String) — هذا هو "دخل البيانات".
3. `Text("Hello $name")` → تستدعي دالة Composable أخرى (`Text`) لعرض النتيجة على الشاشة — هذا هو "عرض الواجهة".

**الناتج المتوقع (لقطة الشاشة):**
> نص "Hello World" معروض إذا استُدعيت الدالة بـ `Greeting("World")`.

#### 💡 التشبيه:
> الدالة القابلة للتركيب أشبه بقالب طلب في مطعم: تُعطيه اسم الزبون (البيانات) فيُخرج بطاقة ترحيب مطبوعة (واجهة)، دون أن يهتم القالب بمن سيقرأ البطاقة لاحقاً.
> **وجه الشبه:** اسم الزبون = البيانات المُدخلة (String)، البطاقة المطبوعة = عنصر Text المعروض.

#### 5.1. ملاحظات مهمة حول الدالة القابلة للتركيب

#### النص الأصلي يقول (English):
> "Annotation: The function is annotated with the @Composable annotation... Data input: The function takes in data... UI display: The function displays text in the UI... No return value: The function doesn't return anything. Compose functions that emit UI don't need to return anything, because they describe the target screen state instead of constructing UI widgets."

#### الشرح المبسّط:
| الخاصية | الشرح |
| --- | --- |
| `@Composable` Annotation | إلزامية لكل دالة تُنتج واجهة، تُخبر مترجم Compose بذلك |
| دخل البيانات | تقبل بارامترات عادية مثل أي دالة Kotlin |
| عرض الواجهة | تستدعي دوال Composable أخرى (مثل `Text()`) |
| بدون قيمة إرجاع | تُرجع `Unit` — لأنها تصف الشاشة وليست تُنشئ كائناً يُعاد استخدامه |

#### نقطة مهمة ⚠️:
> عدم إرجاع قيمة لا يعني أن الدالة "لا تفعل شيئاً" — بل تعني أنها تصف الشاشة المستهدفة (Target Screen State) مباشرة، بدلاً من بناء كائن View وإرجاعه.

---

### 6. مراحل Jetpack Compose الثلاث (Jetpack Compose Phases)

#### النص الأصلي يقول (English):
> "Compose has three main phases of a frame: Composition: What UI to show... Layout: Where to place UI... Drawing: How it renders... UI elements draw into a Canvas, usually a device screen."

#### الشرح المبسّط:
كل إطار (Frame) في Compose يمر بثلاث مراحل متتالية:
1. **Composition** — تحديد "ماذا" سيُعرض.
2. **Layout** — تحديد "أين" سيوضع كل عنصر.
3. **Drawing** — تحديد "كيف" سيُرسم فعلياً على الشاشة.

**لماذا هذا التقسيم؟** لأن فصل المراحل يسمح لـ Compose بتحسين الأداء: قد لا يحتاج لإعادة تنفيذ كل المراحل الثلاث في كل مرة — فقط المرحلة المتأثرة فعلياً بالتغيير.

#### 💡 التشبيه:
> كأنك تُخرج كتاباً للطباعة: أولاً تُقرر "ماذا" ستكتب (المحتوى)، ثم "أين" يوضع كل فقرة وصورة في الصفحة (التخطيط)، ثم أخيراً "كيف" تُطبع الحبر فعلياً على الورق (الرسم).
> **وجه الشبه:** المحتوى = Composition، تصميم الصفحة = Layout، الطباعة الفعلية = Drawing.

#### 📊 المخطط: مراحل Compose الثلاث

#### ما هذا المخطط؟
> يوضح تسلسل تحويل البيانات إلى واجهة معروضة عبر ثلاث مراحل متتابعة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Data | input | البيانات الأولية القادمة من منطق التطبيق |
| 2 | Composition | phase | تنفيذ الدوال القابلة للتركيب وإنتاج شجرة UI |
| 3 | Layout | phase | قياس ووضع كل عقدة في إحداثيات 2D |
| 4 | Drawing | phase | رسم كل عقدة فعلياً على الشاشة |
| 5 | UI | output | الواجهة النهائية المعروضة للمستخدم |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Data | Composition | يغذي | اتجاه واحد | البيانات تدخل مرحلة التركيب |
| Composition | Layout | ينتج شجرة | اتجاه واحد | شجرة UI تُمرَّر لمرحلة التخطيط |
| Layout | Drawing | يُحدد الإحداثيات | اتجاه واحد | الأحجام والمواضع تُمرَّر لمرحلة الرسم |
| Drawing | UI | يرسم | اتجاه واحد | الناتج يُعرض فعلياً |

```diagram
type: flowchart
title: Jetpack Compose Frame Phases
direction: TD
nodes:
  - id: data
    label: Data
    kind: input
    level: 0
  - id: composition
    label: Composition
    kind: phase
    level: 1
  - id: layout
    label: Layout
    kind: phase
    level: 2
  - id: drawing
    label: Drawing
    kind: phase
    level: 3
  - id: ui
    label: UI
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

---

### 6.1. مرحلة التركيب (Composition)

#### النص الأصلي يقول (English):
> "In the composition phase, the Compose runtime executes composable functions and outputs a tree structure that represents your UI. This UI tree consists of layout nodes that contain all the information needed for the next phases... In more complex examples, composables can contain logic and control flow, and produce a different tree given different states."

#### الشرح المبسّط:
في هذه المرحلة، يُنفّذ Compose الدوال القابلة للتركيب (`Row { Image(); Column { Text(); Text() } }`) وينتج منها **شجرة عُقد تخطيط** (Layout Nodes Tree)، حيث كل دالة composable في الكود = عقدة واحدة في الشجرة.

**لماذا مهم؟** لأن الشجرة الناتجة تحتوي كل المعلومات اللازمة للمرحلتين التاليتين (Layout و Drawing)، وقد تختلف الشجرة نفسها حسب الحالة (State) إن كان هناك منطق شرطي داخل الكود.

#### 📊 المخطط: مثال شجرة Composition

#### ما هذا المخطط؟
> يوضّح كيف يتحول الكود `Row { Image(); Column { Text(); Text() } }` إلى شجرة عُقد.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Row | layout_node | العقدة الجذر |
| 2 | Image | layout_node | طفل أول لـ Row |
| 3 | Column | layout_node | طفل ثانٍ لـ Row |
| 4 | Text (الأول) | layout_node | طفل أول لـ Column |
| 5 | Text (الثاني) | layout_node | طفل ثانٍ لـ Column |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Row | Image | طفل | اتجاه واحد | Image عنصر فرعي مباشر لـ Row |
| Row | Column | طفل | اتجاه واحد | Column عنصر فرعي مباشر لـ Row |
| Column | Text 1 | طفل | اتجاه واحد | أول نص داخل Column |
| Column | Text 2 | طفل | اتجاه واحد | ثاني نص داخل Column |

```diagram
type: class
title: Composition Output Tree Example
direction: TD
nodes:
  - id: row
    label: Row
    kind: layout_node
    level: 0
  - id: image
    label: Image
    kind: layout_node
    level: 1
  - id: column
    label: Column
    kind: layout_node
    level: 1
  - id: text1
    label: Text
    kind: layout_node
    level: 2
  - id: text2
    label: Text
    kind: layout_node
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

---

### 6.2. مرحلة التخطيط (Layout)

#### النص الأصلي يقول (English):
> "In the layout phase, Compose uses the UI tree produced in the composition phase as input... During the layout phase, the tree is traversed using the following three step algorithm: Measure children... Decide own size... Place children... At the end of this phase, each layout node has: An assigned width and height, An x, y coordinate where it should be drawn."

#### الشرح المبسّط:
تُستخدم شجرة Composition كمُدخل، وتمر كل عقدة بثلاث خطوات: **قياس الأبناء**، ثم **تحديد حجمها هي**، ثم **وضع الأبناء** بالنسبة لموقعها. في النهاية كل عقدة تعرف حجمها (width/height) وموقعها (x, y).

**لماذا هذا الترتيب تحديداً؟** لأن حجم أي عنصر أب غالباً يعتمد على أحجام أبنائه (مثال: Column يجب أن يعرف ارتفاع كل Text بداخله ليحسب ارتفاعه هو)، لذا يجب قياس الأبناء أولاً.

#### ⚙️ الخطوات / الخوارزمية: خوارزمية التخطيط (Measure → Size → Place)

#### ما هدف هذه العملية؟
> تحديد حجم وموضع كل عقدة في الشجرة بمرور واحد فقط (single pass) لتحقيق أفضل أداء.

```algorithm
1 | قياس الأبناء | Layout Node | يطلب من كل طفل قياس نفسه أولاً (إن وجد)
2 | تحديد الحجم الخاص | Layout Node | يستخدم قياسات الأبناء ليقرر حجمه هو
3 | وضع الأبناء | Layout Node | يضع كل طفل في إحداثيات نسبية لموقعه هو
```

#### نقاط التنفيذ:
- كل عقدة تُزار مرة واحدة فقط (single pass) — هذا يُحسّن الأداء بشكل كبير.
- الآباء "يُقاسون" قبل أبنائهم، لكنهم "يُحدَّد حجمهم ويوضعون" بعد أبنائهم.

#### مهم للامتحان ⚠️:
> تذكّر القاعدة الذهبية: **Parents measure before their children, but are sized and placed after their children.**

#### 🔍 تتبع التنفيذ: قياس شجرة Row(Image, Column(Text, Text))

**المدخل:** شجرة composition من المثال: `Row { Image; Column { Text("Hello"); Text("World") } }`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Row يطلب قياس Image | Image يُقاس |
| 2 | Image بلا أبناء → يقرر حجمه ويُبلغ Row | حجم Image معروف |
| 3 | Row يطلب قياس Column | Column يبدأ القياس |
| 4 | Column يطلب قياس Text الأول | Text الأول يقرر حجمه ويُبلغ Column |
| 5 | Column يطلب قياس Text الثاني | Text الثاني يقرر حجمه ويُبلغ Column |
| 6 | Column يحسب حجمه (أقصى عرض + مجموع الارتفاعات) ويضع أبناءه عمودياً | حجم وموضع Column محددان |
| 7 | Row يحسب حجمه (أقصى ارتفاع + مجموع العروض) ويضع أبناءه | حجم وموضع Row محددان |

**النتيجة:** كل عقدة في الشجرة أصبح لديها width, height, x, y محددة بمرور واحد فقط.

---

### 6.3. مثال تطبيقي على مراحل Layout: دالة SearchResult

#### النص الأصلي يقول (English):
> "SearchResult function yields the following UI tree... 1. The root node Row is asked to measure. 2. The root node Row asks its first child, Image, to measure. 3. Image is a leaf node... 9. Now that the Column node has measured, sized, and placed its children, it can determine its own size and placement. 10. Now that the root node Row has measured, sized, and placed its children, it can determine its own size and placement."

#### الشرح المبسّط:
هذا مثال عملي كامل مرقّم بعشر خطوات، يُظهر بالتفصيل ترتيب استدعاءات (measure → size → place) عبر شجرة `SearchResult` (`Row` يحوي `Image` و `Column` يحوي نصين).

#### 💻 الكود: دالة SearchResult

#### ما هذا الكود؟
> يبني صفاً أفقياً (Row) يحوي صورة كلب وعمود نصي يحتوي على "Hello" و "World".

```kotlin
@Composable
fun SearchResult() {
    // A horizontal row containing an image and a column
    Row {
        // Display a dog image with no content description
        Image(painter = painterResource(id = R.drawable.dog), contentDescription = "")
        // A vertical column with two text lines
        Column {
            Text("Hello")
            Text("World")
        }
    }
}
```

#### شرح كل سطر:
1. `Row { ... }` → يضع أبناءه أفقياً جنباً إلى جنب.
2. `Image(painter = ..., contentDescription = "")` → يعرض صورة؛ `contentDescription` فارغة لأن الصورة زخرفية فقط هنا.
3. `Column { ... }` → يضع أبناءه عمودياً.
4. `Text("Hello")` و `Text("World")` → عنصرا نص متتاليان داخل العمود.

**الناتج المتوقع (لقطة الشاشة):**
> صف يحتوي صورة كلب على اليسار، وعمود على اليمين يحتوي "Hello" فوق "World".

#### 🔍 تتبع التنفيذ: ترتيب استدعاءات measure/size/place لـ SearchResult

**المدخل:** شجرة composition: `Row(Image, Column(Text, Text))`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Row: measure | يبدأ القياس |
| 2 | Image: measure | ورقة (leaf) — يقيس نفسه فوراً |
| 3 | Image: size + place | يُبلغ حجمه وموضعه لـ Row |
| 4 | Column: measure | يبدأ قياس نفسه عبر أبنائه |
| 5 | Text الأول: measure | ورقة — يقيس نفسه |
| 6 | Text الأول: size + place | يُبلغ حجمه لـ Column |
| 7 | Text الثاني: measure | ورقة — يقيس نفسه |
| 8 | Text الثاني: size + place | يُبلغ حجمه لـ Column |
| 9 | Column: size + place | يحدد حجمه وموضعه بعد معرفة أبنائه |
| 10 | Row: size + place | يحدد حجمه وموضعه النهائي بعد كل الأبناء |

**النتيجة:** ترتيب الاستدعاءات = measure(Row) → measure(Image) → size/place(Image) → measure(Column) → measure(Text1) → size/place(Text1) → measure(Text2) → size/place(Text2) → size/place(Column) → size/place(Row).

---

### 6.4. مرحلة الرسم (Drawing)

#### النص الأصلي يقول (English):
> "In the drawing phase, the tree is traversed again from top to bottom, and each node draws itself on the screen in turn... 1. The Row draws any content it might have, such as a background color. 2. The Image draws itself. 3. The Column draws itself. 4. The first and second Text draw themselves, respectively."

#### الشرح المبسّط:
بعد أن عرفت كل عقدة حجمها وموضعها، تُزار الشجرة مرة أخرى من الأعلى للأسفل، وكل عقدة "تُرسم" فعلياً بالترتيب: الأب أولاً (كخلفيته مثلاً)، ثم كل طفل بدوره.

**لماذا الأب يُرسم قبل أبنائه هنا (بعكس الـ Layout)؟** لأن أي محتوى للأب (كلون خلفية) يجب أن يظهر خلف محتوى أبنائه، وليس فوقه.

#### 6.5. ملاحظات ختامية حول المراحل الثلاث

#### النص الأصلي يقول (English):
> "The order of these phases is generally the same, allowing data to flow in one direction... BoxWithConstraints, LazyColumn, and LazyRow are notable exceptions... Compose skips running a composable function if it can reuse a former result, and Compose UI doesn't re-layout or re-draw the entire tree if it doesn't have to."

#### الشرح المبسّط:
ترتيب المراحل الثلاث ثابت عادةً (Composition → Layout → Drawing) — وهذا ما يُسمى **تدفق البيانات أحادي الاتجاه** (Unidirectional Data Flow). لكن هناك استثناءات مثل `BoxWithConstraints`، `LazyColumn`، و `LazyRow`، حيث تعتمد عملية Composition لأبنائها على نتيجة Layout الخاصة بالأب.

**لماذا هذا مهم للأداء؟** لأن Compose يتجنب إعادة تنفيذ عمل كان سينتج نفس النتيجة (بفضل تتبع قراءات الحالة `State Reads`)، فهو ينفذ الحد الأدنى فقط من العمل اللازم لتحديث الواجهة.

#### الدرس المستفاد:
> الأداء العالي في Compose ليس صدفة، بل نتيجة تصميم متعمد: تتبّع القراءات (state reads) في كل مرحلة يسمح بتخطي إعادة التنفيذ غير الضرورية.

---

### 7. التخطيطات في Compose (Layouts in Compose)

#### النص الأصلي يقول (English):
> "The Jetpack Compose implementation of the layout system has two main goals: High performance, Ability to easily write custom layouts... A composable function might emit several UI elements. However, if you don't provide guidance on how they should be arranged, Compose might arrange the elements in a way you don't like."

#### الشرح المبسّط:
نظام التخطيط في Compose صُمم لهدفين: أداء عالٍ، وسهولة كتابة تخطيطات مخصصة. لكن إن كتبت دالة composable تُصدر عدة عناصر دون توجيه صريح لكيفية ترتيبها، فإن Compose سيرتبها بطريقة غير متوقعة (غالباً فوق بعضها البعض).

#### 💻 الكود: ArtistCard بدون تخطيط محدد

#### ما هذا الكود؟
> يُظهر مشكلة عدم تحديد التخطيط: نصان يُكتبان دون Row أو Column فيتراكبان فوق بعضهما.

```kotlin
@Composable
fun ArtistCard() {
    // Two Text elements with no arrangement guidance
    Text("Alfred Sisley")
    Text("3 minutes ago")
}
```

#### شرح كل سطر:
1. `Text("Alfred Sisley")` → عنصر نص أول.
2. `Text("3 minutes ago")` → عنصر نص ثانٍ، لكن بدون Row/Column سيتراكب فوق الأول.

**الناتج المتوقع (لقطة الشاشة):**
> النصان يظهران متراكبَين فوق بعضهما البعض بشكل غير مقروء (كما في شريحة 23 من المحاضرة).

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| النصوص تتراكب فوق بعضها | عدم استخدام أي حاوية تخطيط (Row/Column/Box) | لفّ العناصر داخل `Column` أو `Row` حسب الاتجاه المطلوب |

---

### 7.1. مكونات التخطيط القياسية: Column، Row، Box

#### النص الأصلي يقول (English):
> "Use Column to place items vertically on the screen... Use Row to place items horizontally on the screen... Use Box to put elements on top of another. Box also supports configuring specific alignment of the elements it contains."

#### الشرح المبسّط:
Compose يوفر ثلاثة مكونات تخطيط أساسية جاهزة:

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Column` | يضع العناصر عمودياً (فوق بعضها) | يدعم `verticalArrangement` و `horizontalAlignment` |
| `Row` | يضع العناصر أفقياً (جنباً إلى جنب) | يدعم `horizontalArrangement` و `verticalAlignment` |
| `Box` | يضع العناصر فوق بعضها البعض (تراكب) | يدعم محاذاة عناصره عبر `contentAlignment` |

#### 💡 التشبيه:
> `Column` مثل رفّ كتب عمودي، `Row` مثل صف كراسي بجانب بعضها، أما `Box` فمثل طبقات من الشفافيات فوق بعضها البعض.
> **وجه الشبه:** ترتيب الكتب على الرف = Column، صف الكراسي = Row، الطبقات الشفافة المتراكبة = Box.

#### 💻 الكود: ArtistCardColumn — ترتيب عمودي

#### ما هذا الكود؟
> يستخدم `Column` لوضع اسم الفنان ووقت آخر ظهور له عمودياً.

```kotlin
@Composable
fun ArtistCardColumn() {
    // Place children vertically, one below the other
    Column {
        Text("Alfred Sisley")
        Text("3 minutes ago")
    }
}
```

#### شرح كل سطر:
1. `Column { ... }` → حاوية تُرتّب أبناءها عمودياً بالتسلسل الذي كُتبوا به.
2. `Text("Alfred Sisley")` ثم `Text("3 minutes ago")` → يظهران أحدهما تحت الآخر.

**الناتج المتوقع (لقطة الشاشة):**
> "Alfred Sisley" في السطر الأول، و"3 minutes ago" أسفله مباشرة.

#### 💻 الكود: ArtistCardRow — صورة + عمود نصي أفقياً

#### ما هذا الكود؟
> يستخدم `Row` لوضع صورة الفنان بجانب عمود يحوي اسمه وآخر ظهور له، مع محاذاة عمودية للمنتصف.

```kotlin
class Artist {
    val image: ImageBitmap = ImageBitmap(0, 0)
    val name = ""
    val lastSeenOnline = ""
}

@Composable
fun ArtistCardRow(artist: Artist) {
    // Align children vertically to the center of the row
    Row(verticalAlignment = Alignment.CenterVertically) {
        Image(bitmap = artist.image, contentDescription = "Artist image")
        Column {
            Text(artist.name)
            Text(artist.lastSeenOnline)
        }
    }
}
```

#### شرح كل سطر:
1. `class Artist { ... }` → كائن بيانات بسيط يحمل صورة، اسم، ووقت آخر ظهور.
2. `Row(verticalAlignment = Alignment.CenterVertically)` → يضع الصورة والعمود جنباً إلى جنب، ويُحاذيهما رأسياً في المنتصف.
3. `Image(bitmap = artist.image, ...)` → يعرض صورة الفنان.
4. `Column { Text(artist.name); Text(artist.lastSeenOnline) }` → عمود فرعي داخل الصف يحوي نصين.

**الناتج المتوقع (لقطة الشاشة):**
> صورة دائرية على اليسار، وبجانبها اسم الفنان فوق نص "3 minutes ago".

---

### 7.2. التحكم بترتيب الأبناء: horizontalArrangement و verticalAlignment

#### النص الأصلي يقول (English):
> "To set children's position within a Row, set the horizontalArrangement and verticalAlignment arguments. For a Column, set the verticalArrangement and horizontalAlignment arguments."

#### الشرح المبسّط:
لكل من `Row` و `Column` محوران: محور رئيسي (اتجاه الترتيب) ومحور عرضي (المحاذاة). الجدول التالي يلخص الفرق:

| الحاوية | محور الترتيب (Arrangement) | محور المحاذاة (Alignment) |
| --- | --- | --- |
| `Row` | `horizontalArrangement` (كيف تتوزع أفقياً: البداية، النهاية، بينهما...) | `verticalAlignment` (المحاذاة الرأسية) |
| `Column` | `verticalArrangement` | `horizontalAlignment` |

#### 💻 الكود: ArtistCardArrangement — التحكم بالتوزيع والمحاذاة

#### ما هذا الكود؟
> يستخدم `Arrangement.End` لدفع العناصر نحو نهاية الصف، مع محاذاة عمودية للمنتصف.

```kotlin
@Composable
fun ArtistCardArrangement(artist: Artist) {
    Row(
        // Center children vertically
        verticalAlignment = Alignment.CenterVertically,
        // Push all children toward the end of the row
        horizontalArrangement = Arrangement.End
    ) {
        Image(bitmap = artist.image, contentDescription = "Artist image")
        Column { /* ... */ }
    }
}
```

#### شرح كل سطر:
1. `verticalAlignment = Alignment.CenterVertically` → يُحاذي كل الأبناء عمودياً في منتصف ارتفاع الصف.
2. `horizontalArrangement = Arrangement.End` → يدفع كل الأبناء نحو الحافة اليمنى (النهاية) بدلاً من البداية الافتراضية.

**الناتج المتوقع (لقطة الشاشة):**
> الصورة والعمود يظهران متجمّعين نحو الطرف الأيمن من الشاشة بدلاً من الطرف الأيسر.

---

### 7.3. استخدام Box والتراكب

#### النص الأصلي يقول (English):
> "Use Box to put elements on top of another. Box also supports configuring specific alignment of the elements it contains."

#### الشرح المبسّط:
`Box` يسمح بوضع عنصر فوق آخر — مفيد جداً لحالات مثل وضع أيقونة "علامة صح" فوق زاوية صورة الملف الشخصي.

#### 💻 الكود: ArtistAvatar — صورة مع علامة تحقق

#### ما هذا الكود؟
> يضع أيقونة "علامة صح" فوق صورة الفنان باستخدام `Box`.

```kotlin
@Composable
fun ArtistAvatar(artist: Artist) {
    // Overlap children on top of each other
    Box {
        Image(bitmap = artist.image, contentDescription = "Artist image")
        Icon(Icons.Filled.Check, contentDescription = "Check mark")
    }
}
```

#### شرح كل سطر:
1. `Box { ... }` → حاوية تراكب — كل الأبناء يُوضعون فوق بعضهم افتراضياً بمحاذاة أعلى-يسار ما لم يُحدَّد غير ذلك.
2. `Image(...)` → صورة الفنان كخلفية.
3. `Icon(Icons.Filled.Check, ...)` → أيقونة تحقق تظهر فوق الصورة.

**الناتج المتوقع (لقطة الشاشة):**
> صورة دائرية للفنان مع علامة صح صغيرة في الزاوية السفلية اليمنى (كما في شريحة 26).

---

### 8. الـ Modifiers في Compose (Compose Modifiers)

#### النص الأصلي يقول (English):
> "Modifiers allow you to decorate or augment a composable. Modifiers let you do these sorts of things: Change the composable's size, layout, behavior, and appearance; Add information, like accessibility labels; Process user input; Add high-level interactions, like making an element clickable, scrollable, draggable, or zoomable."

#### الشرح المبسّط:
`Modifier` هو كائن Kotlin يُستخدم "لتزيين" أو "تعديل" سلوك أي عنصر composable: تغيير الحجم، إضافة حشو (padding)، جعله قابلاً للنقر، إلخ.

**لماذا كائن منفصل بدل بارامترات مباشرة؟** لأن هذا يسمح بإعادة استخدام نفس مجموعة التعديلات على عناصر مختلفة، وتركيبها بحرية (chaining) دون الحاجة لتضخيم توقيع كل دالة composable ببارامترات لا نهائية.

#### 💻 الكود: Greeting مع Modifier.padding

#### ما هذا الكود؟
> يضيف حشوة (padding) مقدارها 24dp حول عمود يحوي رسالة ترحيب.

```kotlin
@Composable
private fun Greeting(name: String) {
    // Add 24dp of padding around the column
    Column(modifier = Modifier.padding(24.dp)) {
        Text(text = "Hello,")
        Text(text = name)
    }
}
```

#### شرح كل سطر:
1. `Modifier.padding(24.dp)` → يُنشئ Modifier يضيف مسافة فارغة مقدارها 24dp حول العنصر.
2. `Column(modifier = ...)` → يُمرَّر الـ Modifier كبارامتر للحاوية.

**الناتج المتوقع (لقطة الشاشة):**
> نص "Hello, Android" داخل مربع أرجواني بحشوة واضحة من كل الجهات (شريحة 27).

---

### 8.1. تسلسل (تشبيك) الـ Modifiers Chaining

#### النص الأصلي يقول (English):
> "Multiple modifiers can be chained together to decorate or augment a composable. This chain is created via the Modifier interface which represents an ordered, immutable list of single Modifier.Elements... It's a best practice to have all of your composables accept a modifier parameter, and pass that modifier to its first child that emits UI."

#### الشرح المبسّط:
يمكن ربط عدة Modifiers ببعضها البعض بسلسلة (chain) باستخدام النقطة `.`، وهذه السلسلة عبارة عن قائمة مرتبة وغير قابلة للتغيير (`immutable`) من عناصر `Modifier.Element`.

**لماذا الترتيب مهم؟** لأن كل Modifier يُطبَّق بالترتيب الذي كُتب به — تبديل الترتيب قد يُغيّر النتيجة تماماً (كما سنرى في مثال `clickable` و `padding`).

#### 💻 الكود: Greeting مع تسلسل padding و fillMaxWidth

#### ما هذا الكود؟
> يجمع Modifier.padding و Modifier.fillMaxWidth في سلسلة واحدة.

```kotlin
@Composable
private fun Greeting(name: String) {
    Column(
        modifier = Modifier
            // Add space around the element first
            .padding(24.dp)
            // Then make it fill the max available width
            .fillMaxWidth()
    ) {
        Text(text = "Hello,")
        Text(text = name)
    }
}
```

#### شرح كل سطر:
1. `.padding(24.dp)` → يضيف حشوة حول العنصر.
2. `.fillMaxWidth()` → يجعل العنصر يملأ أقصى عرض متاح من والده.

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.foundation.layout.padding`
> `import androidx.compose.foundation.layout.fillMaxWidth`

**الناتج المتوقع (لقطة الشاشة):**
> نفس مربع الترحيب لكن الآن يمتد ليملأ عرض الشاشة بالكامل (شريحة 28).

#### مهم للامتحان ⚠️:
> أفضل الممارسات: كل composable يجب أن يقبل بارامتر `modifier` ويُمرره لأول عنصر فرعي يُصدر واجهة — هذا يجعل مكوناتك قابلة لإعادة الاستخدام والتخصيص من الخارج.

---

### 8.2. ترتيب الـ Modifiers يُغيّر السلوك الفعلي

#### النص الأصلي يقول (English):
> "Each Modifier.Element represents an individual behavior, like layout, drawing and graphics behaviors, all gesture-related, focus and semantics behaviors, as well as device input events. Their ordering matters: modifier elements that are added first will be applied first."

#### الشرح المبسّط:
تغيير ترتيب استدعاءات `.clickable()` و `.padding()` يُغيّر أي منطقة تستجيب فعلياً للنقر.

#### 🔄 قبل / بعد: ترتيب clickable و padding

**قبل (clickable ثم padding):**
```kotlin
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

**بعد (padding ثم clickable):**
```kotlin
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

**ماذا تغيّر؟** في الحالة الأولى، **كل** المساحة بما فيها الحشوة تستجيب للنقر. في الحالة الثانية، منطقة الحشوة نفسها **لا** تستجيب للنقر — فقط المحتوى الداخلي يستجيب.

#### الفهم الخاطئ الشائع ❌: ترتيب الـ Modifiers لا يهم طالما كل الـ Modifiers مذكورة.
#### الفهم الصحيح ✅: كل Modifier يُطبَّق بالترتيب الذي كُتب به تماماً، وتبديل الترتيب يُغيّر السلوك الفعلي (كمنطقة النقر أو المساحة المرئية).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا وضعت `.fillMaxWidth()` قبل `.padding()`، فهل ستختلف مساحة العرض النهائية عن وضعها بعده؟
> **لماذا هذا مهم؟** لأن فهم ترتيب التطبيق يمنعك من أخطاء تصميم واجهة صعبة التتبع لاحقاً.

---

### 8.3. إعادة استخدام سلاسل الـ Modifiers لتحسين الأداء

#### النص الأصلي يقول (English):
> "Sometimes it can be beneficial to reuse the same modifier chain instances in multiple composables, by extracting them into variables and hoisting them into higher scopes... It can improve your app's performance for a few reasons: The re-allocation of the modifiers won't be repeated when recomposition occurs... Modifier chains could potentially be very long and complex, so reusing the same instance of a chain can alleviate the workload Compose runtime needs to do when comparing them."

#### الشرح المبسّط:
بدلاً من إنشاء سلسلة Modifier جديدة في كل مرة يُعاد فيها تنفيذ composable، يمكن استخراجها إلى متغيّر عام (Hoisting) يُعاد استخدامه.

**لماذا يُحسّن الأداء؟** لأن (1) لا حاجة لإعادة تخصيص الذاكرة لنفس السلسلة عند كل Recomposition، و(2) مقارنة السلاسل الطويلة يصبح أسرع عندما تكون نفس الكائن (Instance) لا نسخة جديدة.

#### 💻 الكود: استخراج Modifier إلى متغيّر عام

```kotlin
// Hoist the modifier chain to a top-level variable for reuse
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
1. `val greetingContainerModifier = Modifier.padding(24.dp).fillMaxWidth()` → يُنشئ السلسلة مرة واحدة فقط خارج الدالة.
2. `Column(modifier = greetingContainerModifier)` → يُعيد استخدام نفس الكائن (Instance) في كل مرة، دون إعادة تخصيصه.

#### الدرس المستفاد:
> عند وجود عدة composables تحتاج نفس تسلسل الـ Modifiers، استخرجها لمتغيّر مشترك (hoisting) لتحسين الأداء بدلاً من تكرار كتابتها.

---

### 8.4. Modifiers مدمجة شائعة: padding و size

#### النص الأصلي يقول (English):
> "By default, layouts provided in Compose wrap their children. However, you can set a size by using the size modifier... Note that the size you specified might not be respected if it does not satisfy the constraints coming from the layout's parent. If you require the composable size to be fixed regardless of the incoming constraints, use the requiredSize modifier."

#### الشرح المبسّط:
افتراضياً، التخطيطات "تلتفّ" حول محتواها (wrap content). يمكنك تحديد حجم صريح عبر `Modifier.size(width, height)`، لكن الوالد (Parent) قد "يتجاهل" هذا الحجم إن كان يتعارض مع قيوده الخاصة. إن أردت فرض الحجم بغض النظر عن القيود، استخدم `requiredSize`.

#### 💻 الكود: استخدام size و requiredSize

```kotlin
@Composable
fun ArtistCard(/*...*/) {
    Row(
        // Fix the row's overall size
        modifier = Modifier.size(width = 400.dp, height = 100.dp)
    ) {
        Image(
            /*...*/
            // Force this exact size regardless of parent constraints
            modifier = Modifier.requiredSize(150.dp)
        )
        Column { /*...*/ }
    }
}
```

#### شرح كل سطر:
1. `Modifier.size(width = 400.dp, height = 100.dp)` → يحدد حجماً مقترحاً، لكنه قد يُقيَّد من الوالد الأعلى.
2. `Modifier.requiredSize(150.dp)` → يفرض الحجم فعلياً حتى لو تجاوز قيود الوالد.

#### ⚖️ المقايضة: size مقابل requiredSize

| | `size` | `requiredSize` |
| --- | --- | --- |
| المزايا | يحترم قيود الوالد ويتكيّف معها | يضمن حجماً ثابتاً دائماً |
| العيوب | قد يُتجاهل الحجم المطلوب إن تعارض مع قيود الأب | قد يتسبب في تجاوز حدود الوالد (Overflow) |
| متى تختاره | في تخطيطات مرنة عادية | عند الحاجة لحجم دقيق وثابت (كأيقونة موحدة الحجم) |

---

### 8.5. Modifiers ملء المساحة: fillMaxWidth / fillMaxHeight / fillMaxSize

#### النص الأصلي يقول (English):
> "If you want a child layout to fill all the available height allowed by the parent, add the fillMaxHeight modifier (Compose also provides fillMaxSize and fillMaxWidth)."

#### الشرح المبسّط:
مجموعة من Modifiers الجاهزة لجعل العنصر يملأ المساحة المتاحة من والده في اتجاه واحد أو أكثر.

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `fillMaxWidth()` | يملأ أقصى عرض متاح | يُستخدم غالباً لعناصر تمتد أفقياً بعرض الشاشة |
| `fillMaxHeight()` | يملأ أقصى ارتفاع متاح | مفيد داخل Row طويل |
| `fillMaxSize()` | يملأ العرض والارتفاع معاً | يُستخدم لملء الشاشة بالكامل مثلاً |

---

### 8.6. Modifier الإزاحة (Offset)

#### النص الأصلي يقول (English):
> "To position a layout relative to its original position, add the offset modifier and set the offset in the x and y axis. Offsets can be positive as well as non-positive. The difference between padding and offset is that adding an offset to a composable does not change its measurements... In a left-to-right context, a positive offset shifts the element to the right, while in a right-to-left context, it shifts the element to the left."

#### الشرح المبسّط:
`offset` يُزيح العنصر عن موضعه الأصلي دون التأثير على قياساته (بعكس `padding` الذي يُغيّر القياسات فعلياً).

#### 💻 الكود: إزاحة نص باستخدام offset

```kotlin
@Composable
fun ArtistCard(artist: Artist) {
    Row(/*...*/) {
        Column {
            Text(artist.name)
            // Shift this text 4dp horizontally without changing its measured size
            Text(
                text = artist.lastSeenOnline,
                modifier = Modifier.offset(x = 4.dp)
            )
        }
    }
}
```

#### شرح كل سطر:
1. `Modifier.offset(x = 4.dp)` → يُزيح النص 4dp أفقياً، لكن حجمه المقاس (measurement) يبقى كما هو.

#### ⚖️ المقايضة: padding مقابل offset

| | `padding` | `offset` |
| --- | --- | --- |
| المزايا | يُغيّر القياسات الفعلية للعنصر ومحيطه | يُزيح العنصر بصرياً دون التأثير على التخطيط العام |
| العيوب | يؤثر على حساب مساحة الوالد | قد يتسبب في تراكب بصري غير مقصود مع عناصر أخرى |
| متى تختاره | لإضافة مسافة تُحسب ضمن التخطيط | لتحريك عنصر بصرياً فقط دون كسر التخطيط الحسابي |

---

### 8.7. أمان النطاق في Compose (Scope Safety)

#### النص الأصلي يقول (English):
> "In Compose, there are modifiers that can only be used when applied to children of certain composables. Compose enforces this by means of custom scopes. Scope safety prevents you from adding modifiers that wouldn't work in other composables and scopes and saves time from trial and error. Scoped modifiers notify the parent about some information the parent should know about the child."

#### الشرح المبسّط:
بعض الـ Modifiers لا تعمل إلا داخل حاوية معينة (Scope)، مثل `matchParentSize` (لا يعمل إلا داخل `Box`) و `weight` (لا يعمل إلا داخل `Row` أو `Column`). هذا يُسمى "أمان النطاق" — Compose يمنعك من استخدام Modifier في مكان لا يُناسبه أصلاً، فيوفر عليك وقت التجربة والخطأ.

**لماذا هذا مفيد؟** لأن هذه الـ Modifiers تحتاج معلومات خاصة عن الوالد (parent data)، فمن المنطقي أن تُقيَّد بذلك السياق فقط.

#### 8.7.1. matchParentSize داخل Box

#### النص الأصلي يقول (English):
> "If you want a child layout to be the same size as a parent Box without affecting the Box size, use the matchParentSize modifier. matchParentSize is only available within a Box scope, meaning that it only applies to direct children of Box composables... If fillMaxSize were used instead of matchParentSize, the Spacer would take all the available space allowed to the parent, in turn causing the parent to expand and fill all the available space."

#### الشرح المبسّط:
`matchParentSize` يجعل العنصر بنفس حجم الـ `Box` الأب **دون** أن يُؤثر على حجم ذلك الـ Box نفسه (لأن حجم Box محدد أصلاً بواسطة عناصر أخرى فيه، مثل `ArtistCard`). أما `fillMaxSize` فسيجعل العنصر يأخذ كل المساحة المتاحة، مما قد يجعل الـ Box الأب نفسه يتمدد ليملأ الشاشة.

#### 🔄 قبل / بعد: matchParentSize مقابل fillMaxSize

**قبل (باستخدام matchParentSize):**
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

**بعد (باستخدام fillMaxSize):**
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
```

**ماذا تغيّر؟** في النسخة الأولى، حجم `Box` يبقى محدداً بحجم `ArtistCard` فقط، والخلفية الرمادية تتبعه بالضبط. في النسخة الثانية، `Spacer` يفرض ملء كل المساحة المتاحة، فيتمدد `Box` بالكامل ليملأ الشاشة.

#### 8.7.2. weight داخل Row و Column

#### النص الأصلي يقول (English):
> "By default, a composable size is defined by the content it is wrapping. You can set a composable size to be flexible within its parent using the weight Modifier that is only available in RowScope, and ColumnScope."

#### الشرح المبسّط:
`weight` يجعل حجم العنصر "مرناً" — يأخذ حصة نسبية من المساحة المتاحة داخل `Row` أو `Column`، مقارنة بأوزان بقية الأبناء.

#### 💻 الكود: توزيع المساحة بأوزان مختلفة

```kotlin
@Composable
fun ArtistCard(/*...*/) {
    Row(
        modifier = Modifier.fillMaxWidth()
    ) {
        Image(
            /*...*/
            // Takes twice as much space as the column below
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
1. `Modifier.weight(2f)` على `Image` → تأخذ ضعف المساحة النسبية مقارنة بـ `Column`.
2. `Modifier.weight(1f)` على `Column` → تأخذ حصة واحدة نسبية من المساحة، فتكون المساحة الكلية موزعة بنسبة 2:1 لصالح الصورة.

#### مهم للامتحان ⚠️:
> `weight` تعمل فقط ضمن `RowScope` و `ColumnScope` — استخدامها خارج `Row`/`Column` يُسبب خطأ ترجمة (compilation error)، وهذا مثال مباشر على "أمان النطاق" (Scope Safety).

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Jetpack Compose` | مجموعة أدوات تصريحية حديثة لبناء واجهات أندرويد | يوصى بها رسمياً من Google |
| `Declarative UI` | تصف "ماذا" تريد أن تظهر الواجهة، بدلاً من "كيف" تُبنى خطوة بخطوة | `@Composable fun Greeting(...)` |
| `Imperative UI` | تتحكم يدوياً بكل عنصر عبر استدعاءات صريحة (setter/getter) | `findViewById()` + `button.setText()` |
| `@Composable` | Annotation إلزامي لكل دالة تُنتج واجهة | `@Composable fun MyButton() {...}` |
| `Recomposition` | إعادة استدعاء دوال composable عند تغيّر الحالة | يحدث تلقائياً عند تغيّر `mutableStateOf` |
| `Composition` | أول مرحلة من مراحل Compose — "ماذا" سيُعرض | ينتج شجرة عُقد (Layout Nodes Tree) |
| `Layout` | ثاني مرحلة — "أين" يوضع كل عنصر | measure → size → place |
| `Drawing` | ثالث مرحلة — "كيف" يُرسم فعلياً | يرسم على Canvas |
| `Modifier` | كائن Kotlin يُزيّن أو يُعدّل سلوك composable | `Modifier.padding(24.dp)` |
| `Scope Safety` | تقييد بعض Modifiers لتعمل فقط داخل حاوية معينة | `weight` فقط داخل `Row`/`Column` |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Column` | ترتيب عمودي للأبناء | يدعم `verticalArrangement`، `horizontalAlignment` |
| `Row` | ترتيب أفقي للأبناء | يدعم `horizontalArrangement`، `verticalAlignment` |
| `Box` | تراكب الأبناء فوق بعضهم | يدعم `contentAlignment`، وModifier خاص `matchParentSize` |
| `Modifier.padding` | إضافة حشو حول العنصر | يُغيّر القياسات الفعلية |
| `Modifier.size` | تحديد حجم مقترح | قد يُتجاهل إن تعارض مع قيود الوالد |
| `Modifier.requiredSize` | فرض حجم ثابت | يتجاوز قيود الوالد |
| `Modifier.fillMaxWidth/Height/Size` | ملء المساحة المتاحة | اتجاه واحد أو أكثر |
| `Modifier.offset` | إزاحة بصرية دون تغيير القياسات | يعتمد على اتجاه LTR/RTL |
| `Modifier.weight` | توزيع نسبي للمساحة | فقط داخل `RowScope`/`ColumnScope` |
| `Modifier.matchParentSize` | مطابقة حجم الأب دون التأثير عليه | فقط داخل `BoxScope` |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| نظام الواجهة | `View System` (Imperative UI) | `Jetpack Compose` (Declarative UI) | تحديث يدوي مقابل تحديث معتمد على الحالة |
| تحديث الواجهة | Manual UI updates | State-driven UI | من يقرر متى يتغيّر العنصر: المبرمج يدوياً أم الحالة تلقائياً |
| بنية الواجهة | Mutable View hierarchy | UI described with composable functions | كائنات قابلة للتحوير مقابل دوال تصف الواجهة |
| خطر الأخطاء | High risk of inconsistent UI state | Consistent UI via recomposition | خطر نسيان تحديث عنصر مقابل اتساق تلقائي |
| توزع الكود | UI split across XML and Kotlin | UI defined entirely in Kotlin | لغتان مختلفتان مقابل لغة واحدة |
| حجم الكود | More boilerplate code | Less boilerplate code | كود طويل متكرر مقابل كود مختصر |
| إدارة التحديث | Explicit UI update management | Automatic selective recomposition | تحديث صريح يدوي مقابل تحديث انتقائي تلقائي |
| `padding` مقابل `offset` | يُغيّر القياسات الفعلية | لا يُغيّر القياسات | التأثير على حساب مساحة الوالد |
| `size` مقابل `requiredSize` | يحترم قيود الوالد | يفرض الحجم دوماً | مرونة مقابل صرامة |
| `matchParentSize` مقابل `fillMaxSize` | لا يُغيّر حجم Box الأب | قد يُوسّع Box الأب | التأثير العكسي على الوالد |

### قاموس المصطلحات (Glossary)

| الفئة | المصطلحات |
| --- | --- |
| مفاهيم أساسية | `Declarative Paradigm`، `Imperative Paradigm`، `Recomposition`، `Unidirectional Data Flow` |
| مراحل Compose | `Composition`، `Layout`، `Drawing`، `Layout Node`، `single pass` |
| مكونات تخطيط | `Row`، `Column`، `Box`، `RowScope`، `ColumnScope`، `BoxScope` |
| Modifiers | `padding`، `size`، `requiredSize`، `fillMaxWidth/Height/Size`، `offset`، `weight`، `matchParentSize`، `clickable` |
| استثناءات المراحل | `BoxWithConstraints`، `LazyColumn`، `LazyRow` |

### أبرز النقاط الذهبية

1. Compose يُقلل الكود المكرر عبر الاعتماد على الحالة (State) بدلاً من التعديل اليدوي المباشر للعناصر.
2. تدفق البيانات دائماً للأسفل (down)، وتدفق الأحداث دائماً للأعلى (up) — هذا هو أساس Unidirectional Data Flow.
3. كل إطار في Compose يمر بثلاث مراحل ثابتة الترتيب عموماً: Composition → Layout → Drawing.
4. في مرحلة Layout، الآباء يُقاسون قبل أبنائهم، لكن يُحدَّد حجمهم ويوضعون بعد أبنائهم (مرور واحد فقط).
5. بدون تخطيط صريح (Row/Column/Box)، Compose قد يُرتب العناصر بطريقة غير مقروءة (تراكب فوق بعضها).
6. ترتيب سلسلة الـ Modifiers يُغيّر السلوك الفعلي — كل Modifier يُطبَّق بترتيب كتابته.
7. بعض الـ Modifiers مقيدة بنطاق معين (Scope Safety) مثل `weight` (Row/Column فقط) و `matchParentSize` (Box فقط).
8. إعادة استخدام (hoisting) سلاسل الـ Modifiers في متغيرات مشتركة يُحسّن الأداء ويقلل عبء إعادة التخصيص.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| الاعتقاد أن composable تُرجع View يمكن تخزينه واستدعاء setter عليه لاحقاً | composable لا يُرجع شيئاً (Unit) — التحديث يتم عبر إعادة الاستدعاء (Recomposition) بحالة جديدة |
| كتابة عدة `Text()` متتالية بدون Row/Column ظناً أنها ستُرتب تلقائياً | يجب دائماً استخدام حاوية تخطيط صريحة (Row/Column/Box) |
| استخدام `weight` خارج `Row`/`Column` | `weight` مقيدة بـ Scope معين — لن تُترجم الشيفرة خارج هذا النطاق |
| استخدام `fillMaxSize` بدلاً من `matchParentSize` داخل Box | `fillMaxSize` قد يُوسّع الـ Box الأب نفسه بعكس `matchParentSize` |
| الاعتقاد أن ترتيب Modifiers لا يؤثر على النتيجة | الترتيب يُغيّر فعلياً منطقة النقر أو المساحة المرئية |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء دالة Composable صحيحة من الصفر
> ما هدف هذه العملية؟ توضيح الخطوات المنطقية لكتابة أي واجهة تصريحية بسيطة في Compose.
```algorithm
1 | تعريف الدالة | Kotlin Function | تُكتب دالة عادية تأخذ بارامترات البيانات المطلوبة
2 | إضافة Annotation | @Composable | تُعلّم الدالة كجزء من نظام Compose
3 | استدعاء عناصر جاهزة | Text/Image/Button | تُستدعى دوال composable أخرى لعرض المحتوى
4 | تنظيم العرض | Row/Column/Box | تُلف العناصر بحاوية تخطيط مناسبة
5 | تخصيص المظهر | Modifier | يُضاف Modifier لتحديد الحجم أو الحشو أو السلوك
```
#### نقاط التنفيذ:
- لا تنسَ تمرير `modifier` كبارامتر لجعل الدالة قابلة لإعادة الاستخدام من الخارج.

#### ⚙️ الخطوات / الخوارزمية: معالجة Recomposition عند تفاعل المستخدم
> ما هدف هذه العملية؟ توضيح كيف يستجيب Compose لأي تفاعل من المستخدم.
```algorithm
1 | إطلاق الحدث | UI Element | المستخدم يضغط زراً فيُطلق onClick
2 | إشعار منطق التطبيق | App Logic | الحدث يصل لمنطق التطبيق
3 | تحديث الحالة | State Variable | متغيّر الحالة (مثل mutableStateOf) يتغيّر
4 | إعادة التركيب | Compose Runtime | الدوال composable المتأثرة تُستدعى من جديد
5 | إعادة الرسم | UI | الشاشة تعرض النتيجة الجديدة فقط للأجزاء المتغيّرة
```
#### نقاط التنفيذ:
- لا يُعاد رسم الشجرة بالكامل، بل فقط الأجزاء التي قرأت الحالة المتغيّرة فعلياً.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| Composable بسيط | `@Composable fun X(data: T) { Text(...) }` | لعرض بيانات ثابتة بسيطة |
| Composable مع Modifier | `@Composable fun X(modifier: Modifier = Modifier) { ... }` | عند الحاجة لتخصيص المظهر من الخارج |
| تخطيط مركّب | `Row { Image(); Column { Text(); Text() } }` | لبناء بطاقات معلومات مركبة (صورة + نص) |
| سلسلة Modifiers | `Modifier.padding(x).fillMaxWidth().clickable{}` | عند الحاجة لعدة تعديلات مجتمعة على نفس العنصر |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| عرض عدة عناصر نصية معاً | لفّها ضمن `Column` أو `Row` | لتفادي التراكب غير المقصود |
| الحاجة لتوزيع مساحة نسبي بين عناصر | استخدام `Modifier.weight()` داخل `Row`/`Column` | لأنه Modifier مخصص لهذا النطاق فقط |
| الحاجة لتغطية خلفية بحجم عنصر آخر داخل Box | استخدام `matchParentSize` بدلاً من `fillMaxSize` | لتفادي تمدد الـ Box الأب نفسه |

### الأفكار الرئيسية الشاملة
الفكرة المحورية لهذه المحاضرة هي أن Compose يفصل بوضوح بين "وصف" الواجهة (composable functions) و"تنفيذها" الفعلي عبر ثلاث مراحل محسّنة الأداء (Composition, Layout, Drawing)، وأن كل أداة (Row/Column/Box، Modifiers) مصممة لتُبقي هذا الفصل نظيفاً وقابلاً لإعادة الاستخدام.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% | سيناريو كود 35% | تطبيق 40%.

### السؤال 1 (medium)
What is the main characteristic of the declarative UI paradigm used by Jetpack Compose?
أ) The developer manually finds and mutates each view
ب) The UI is described as a function of the current state
ج) The UI hierarchy is inflated only from XML files
د) Every UI update requires calling findViewById()
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح لأن جوهر Compose هو وصف الواجهة كدالة للحالة الحالية. (أ) و(د) يصفان النموذج الإجرائي القديم. (ج) غير صحيح لأن Compose لا يعتمد على XML لتعريف الواجهة.

---

### السؤال 2 (medium)
In the imperative View System example from the lecture, what method is used to locate a button by its id?
أ) `remember()`
ب) `mutableStateOf()`
ج) `findViewById()`
د) `Modifier.clickable()`
**الإجابة الصحيحة: ج**
**التعليل:** `findViewById()` هي الطريقة الكلاسيكية للبحث اليدوي عن عنصر في شجرة Views. باقي الخيارات تنتمي لعالم Compose وليس View System.

---

### السؤال 3 (hard)
What does the term "recomposition" refer to?
أ) Rebuilding the entire app from source code
ب) Re-executing composable functions when their inputs (state) change
ج) Compiling XML layouts into Kotlin
د) Manually calling setText() on a widget
**الإجابة الصحيحة: ب**
**التعليل:** Recomposition تحديداً هي إعادة استدعاء دوال composable عند تغيّر البيانات/الحالة التي تعتمد عليها؛ الخيارات الأخرى لا علاقة لها بهذا المصطلح.

---

### السؤال 4 (medium)
Which of the following are the three main phases of a Compose frame, in correct order?
أ) Layout → Composition → Drawing
ب) Drawing → Layout → Composition
ج) Composition → Layout → Drawing
د) Composition → Drawing → Layout
**الإجابة الصحيحة: ج**
**التعليل:** الترتيب الصحيح كما ورد بالمحاضرة هو Composition (ماذا) ثم Layout (أين) ثم Drawing (كيف). أي ترتيب آخر يخالف تدفق البيانات أحادي الاتجاه.

---

### السؤال 5 (hard)
During the Layout phase, in what order do parent nodes get measured, sized, and placed relative to their children?
أ) Parents are measured, sized, and placed all before their children
ب) Parents measure before their children, but are sized and placed after their children
ج) Children are always measured after being sized
د) There is no defined order; it happens simultaneously
**الإجابة الصحيحة: ب**
**التعليل:** هذه قاعدة صريحة من المحاضرة: الأب يُقاس أولاً ليطلب قياسات الأبناء، لكن حجمه وموضعه النهائيان يُحددان فقط بعد معرفة قياسات الأبناء.

---

### السؤال 6 (medium)
What happens if you write two `Text()` composables directly inside a function without any Row, Column, or Box?
أ) Compose throws a compilation error
ب) The texts are automatically placed side-by-side
ج) Compose stacks them on top of each other
د) Only the first Text is rendered
**الإجابة الصحيحة: ج**
**التعليل:** كما ورد في المحاضرة (مثال ArtistCard)، بدون توجيه صريح للتخطيط، Compose يضع العناصر فوق بعضها فتصبح غير مقروءة.

---

### السؤال 7 (medium)
Which composable is best suited to overlap one element on top of another (e.g., an icon on top of an image)?
أ) `Row`
ب) `Column`
ج) `Box`
د) `Spacer`
**الإجابة الصحيحة: ج**
**التعليل:** `Box` مصمم خصيصاً للتراكب. `Row` و`Column` يرتبان العناصر أفقياً/عمودياً وليس فوق بعضها، و`Spacer` مجرد عنصر فاصغ لا يحمل محتوى.

---

### السؤال 8 (hard)
Given the following code, what does changing the order of `.clickable()` and `.padding()` primarily affect?
```kotlin
Modifier.clickable(onClick = onClick).padding(padding)
```
أ) The color of the composable
ب) Which region of the composable responds to clicks
ج) The font size used inside the composable
د) Whether the composable is Composable-annotated
**الإجابة الصحيحة: ب**
**التعليل:** كما أوضحت المحاضرة، ترتيب `clickable` و`padding` يُحدد ما إذا كانت منطقة الحشو نفسها تستجيب للنقر أم لا؛ لا علاقة له باللون أو الخط أو الـ annotation.

---

### السؤال 9 (medium)
What is the purpose of the `weight` modifier?
أ) To set a fixed pixel size regardless of parent constraints
ب) To distribute available space proportionally among children in a Row or Column
ج) To overlay children on top of one another
د) To shift an element without changing its measured size
**الإجابة الصحيحة: ب**
**التعليل:** `weight` تُوزّع المساحة المتاحة نسبياً بين الأبناء داخل Row/Column. (أ) يصف `requiredSize`، (ج) يصف Box، (د) يصف `offset`.

---

### السؤال 10 (hard)
Where can the `weight` modifier be used?
أ) Anywhere, including outside any layout container
ب) Only inside RowScope or ColumnScope
ج) Only inside BoxScope
د) Only on Text composables
**الإجابة الصحيحة: ب**
**التعليل:** `weight` مثال على Scope Safety — لا يعمل إلا داخل RowScope أو ColumnScope؛ استخدامه خارجهما يُسبب خطأ ترجمة.

---

### السؤال 11 (medium)
What modifier is only available within a Box's scope and lets a child match the Box's size without affecting it?
أ) `fillMaxSize`
ب) `matchParentSize`
ج) `requiredSize`
د) `weight`
**الإجابة الصحيحة: ب**
**التعليل:** `matchParentSize` مخصص لـ BoxScope تحديداً ولا يُؤثر على حجم Box الأب، بعكس `fillMaxSize` الذي قد يُوسّعه.

---

### السؤال 12 (hard)
If `fillMaxSize` is used instead of `matchParentSize` on a Spacer inside a Box, what is the consequence described in the lecture?
أ) The Spacer disappears entirely
ب) The Box itself expands to take all available space
ج) The Spacer is ignored by Compose
د) A compilation error occurs
**الإجابة الصحيحة: ب**
**التعليل:** كما ورد صراحة في المحاضرة: استخدام `fillMaxSize` يجعل Spacer يأخذ كل المساحة المتاحة، مما يجعل الـ Box الأب يتمدد ليملأها.

---

### السؤال 13 (medium)
What is the key difference between `padding` and `offset` modifiers?
أ) `padding` changes measurements while `offset` does not
ب) `offset` changes measurements while `padding` does not
ج) They are functionally identical
د) `padding` only works inside Row while `offset` works anywhere
**الإجابة الصحيحة: أ**
**التعليل:** `padding` يُغيّر القياسات الفعلية للعنصر ومساحة والده، بينما `offset` يُزيح العنصر بصرياً فقط دون تغيير قياساته.

---

### السؤال 14 (medium)
Why does Compose avoid re-executing the same composable function unnecessarily on every frame?
أ) Because Compose does not support recomposition
ب) Because Compose tracks state reads and skips work that would produce the same result
ج) Because composable functions can only run once per app lifetime
د) Because the Compose runtime disables all optimizations by default
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة توضح أن Compose يتتبع قراءات الحالة (state reads) عبر المراحل، مما يسمح بتخطي إعادة تنفيذ العمل غير الضروري وتحقيق أداء أفضل.

---

### السؤال 15 (hard)
Which of these composables/patterns is explicitly mentioned as an exception where child composition depends on the parent's layout phase?
أ) `Row`
ب) `Column`
ج) `LazyColumn`
د) `Text`
**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة تذكر صراحة `BoxWithConstraints`، `LazyColumn`، و`LazyRow` كاستثناءات لهذا الترتيب المعتاد.

---

### السؤال 16 (medium)
What is a recommended best practice mentioned in the lecture regarding the `modifier` parameter of a composable?
أ) Never expose a modifier parameter to keep the composable simple
ب) Accept a modifier parameter and pass it to the first child that emits UI
ج) Always hardcode the modifier chain inside the function body
د) Modifiers should only be used inside private composables
**الإجابة الصحيحة: ب**
**التعليل:** هذه ممارسة موصى بها صراحةً في المحاضرة لجعل composable قابلاً لإعادة الاستخدام والتخصيص من الخارج.

---

## الجزء الرابع: أسئلة تصحيح الكود

### Debug Question 1
**The following code contains a bug:**
```kotlin
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**Find the bug:** compilation — missing annotation.

**Fixed code:**
```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```
**شرح الحل:**
1. أي دالة تستدعي دوال composable أخرى مثل `Text()` يجب أن تحمل `@Composable`.
2. بدون هذا الـ annotation، سيرفض المترجم استدعاء `Text()` من داخل `Greeting`.

---

### Debug Question 2
**The following code contains a bug:**
```kotlin
@Composable
fun MyButton() {
    var clicked = false
    Button(onClick = { clicked = true }) {
        Text(text = if (clicked) "Clicked!" else "Click Me!")
    }
}
```
**Find the bug:** logic — state does not survive recomposition, and reassigning `clicked` won't trigger UI update.

**Fixed code:**
```kotlin
@Composable
fun MyButton() {
    var clicked by remember { mutableStateOf(false) }
    Button(onClick = { clicked = true }) {
        Text(text = if (clicked) "Clicked!" else "Click Me!")
    }
}
```
**شرح الحل:**
1. `var clicked = false` مجرد متغيّر Kotlin عادي — لا يُخبر Compose بضرورة إعادة التركيب عند تغيّره.
2. يجب استخدام `remember { mutableStateOf(false) }` لجعل Compose "يراقب" هذا المتغيّر ويُعيد التركيب تلقائياً عند تغيّره.

---

### Debug Question 3
**The following code contains a bug:**
```kotlin
@Composable
fun ArtistCard() {
    Text("Alfred Sisley")
    Text("3 minutes ago")
}
```
**Find the bug:** misconception — developer expected the two texts to appear one below the other automatically.

**Fixed code:**
```kotlin
@Composable
fun ArtistCard() {
    Column {
        Text("Alfred Sisley")
        Text("3 minutes ago")
    }
}
```
**شرح الحل:**
1. بدون حاوية تخطيط، Compose يضع العنصرين فوق بعضهما البعض، وليس أحدهما تحت الآخر تلقائياً.
2. إضافة `Column { ... }` تفرض الترتيب العمودي الصريح المطلوب.

---

### Debug Question 4
**The following code contains a bug:**
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
        Column {
            /*...*/
        }
    }
}
```
**Find the bug:** dead_code / logic — the `weight(2f)` on Image has no effect because Column doesn't also declare a weight, so proportional distribution is meaningless/inconsistent.

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
1. `weight` تُوزّع المساحة **نسبياً** بين كل الأبناء الذين يستخدمونها؛ إن استخدمها طفل واحد فقط، تصبح النتيجة غير متسقة مع نية توزيع المساحة الموصوفة في المحاضرة (2:1).
2. إضافة `weight(1f)` على `Column` يجعل التوزيع صحيحاً بنسبة 2 إلى 1 لصالح الصورة.

---

### Debug Question 5
**The following code contains a bug:**
```kotlin
@Composable
fun MatchParentSizeComposable() {
    Box {
        Spacer(
            Modifier
                .weight(1f)
                .background(Color.LightGray)
        )
        ArtistCard()
    }
}
```
**Find the bug:** syntax — `weight` is not available in `BoxScope`, causing a compilation error.

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
1. `weight` مقيدة بـ `RowScope`/`ColumnScope` فقط، ولا معنى لها داخل `Box` الذي لا يوزّع مساحة بين أبنائه بنفس الطريقة.
2. البديل الصحيح داخل `Box` لمطابقة حجم الأب هو `matchParentSize`.

---

### Debug Question 6
**The following code contains a bug:**
```kotlin
@Composable
fun ArtistCard(artist: Artist) {
    Row(/*...*/) {
        Column {
            Text(artist.name)
            Text(
                text = artist.lastSeenOnline,
                modifier = Modifier.padding(x = 4.dp)
            )
        }
    }
}
```
**Find the bug:** syntax / return_check — `padding` does not accept a named `x` parameter; the developer meant to shift the element without affecting layout measurements.

**Fixed code:**
```kotlin
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
**شرح الحل:**
1. `Modifier.padding()` لا يقبل بارامتر `x` بهذا الشكل، ولن يُحقق أصلاً الهدف المقصود (إزاحة بصرية دون تغيير القياسات).
2. `Modifier.offset(x = 4.dp)` هو الأداة الصحيحة للإزاحة الأفقية دون التأثير على القياسات، كما وضحت المحاضرة.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Build a Profile Header — scenario
**Scenario / Task:**
Create a composable function `ProfileHeader(name: String, status: String)` that displays a circular-looking layout: an image, followed by the name and status stacked vertically next to it, both vertically centered.

**Requirements:**
1. Use `Row` with `verticalAlignment = Alignment.CenterVertically`.
2. Nest a `Column` containing two `Text` composables.

**نموذج الحل:**
```kotlin
@Composable
fun ProfileHeader(name: String, status: String, image: ImageBitmap) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Image(bitmap = image, contentDescription = "Profile image")
        Column {
            Text(name)
            Text(status)
        }
    }
}
```
هذا الحل يطابق نمط `ArtistCardRow` الذي شُرح في المحاضرة، مع تسمية بارامترات أوضح.

---

### Exercise 2: Fix the Overlap — fill_gaps
**Scenario / Task:**
Complete the missing container so that "Title" appears above "Subtitle" instead of overlapping.

**Requirements:**
1. Fill the blank with the correct composable.
```kotlin
@Composable
fun Header() {
    _______ {
        Text("Title")
        Text("Subtitle")
    }
}
```

**نموذج الحل:**
`Column` هي الإجابة الصحيحة — لأنها ترتب العناصر عمودياً واحداً تحت الآخر، وهو المطلوب هنا:
```kotlin
@Composable
fun Header() {
    Column {
        Text("Title")
        Text("Subtitle")
    }
}
```

---

### Exercise 3: Weighted Layout — code_fix
**Scenario / Task:**
The following layout should split space 3:1 between an Image and a Text, but currently splits it equally. Fix it.

```kotlin
Row(modifier = Modifier.fillMaxWidth()) {
    Image(/*...*/, modifier = Modifier.weight(1f))
    Text("Caption", modifier = Modifier.weight(1f))
}
```

**Requirements:**
1. Adjust the weight values so the Image takes 3 times more space than the Text.

**نموذج الحل:**
```kotlin
Row(modifier = Modifier.fillMaxWidth()) {
    Image(/*...*/, modifier = Modifier.weight(3f))
    Text("Caption", modifier = Modifier.weight(1f))
}
```
تغيير وزن الصورة إلى `3f` مقابل `1f` للنص يُعطي النسبة المطلوبة 3:1.

---

### Exercise 4: Clickable Card Region — scenario
**Scenario / Task:**
Design a `Modifier` chain for a `Column` so that clicking anywhere, including the padding area, triggers `onClick`.

**Requirements:**
1. Decide the correct order of `.clickable()` and `.padding()`.

**نموذج الحل:**
```kotlin
Column(
    Modifier
        .clickable(onClick = onClick)
        .padding(16.dp)
        .fillMaxWidth()
) { /*...*/ }
```
وضع `.clickable()` قبل `.padding()` يجعل منطقة النقر تشمل الحشوة بالكامل، كما شرحت المحاضرة.

---

### Exercise 5: Box Overlay Fix — code_fix
**Scenario / Task:**
The following code was meant to overlay a semi-transparent gray layer exactly over an ArtistCard without expanding the Box, but it currently expands the whole screen.

```kotlin
Box {
    Spacer(
        Modifier
            .fillMaxSize()
            .background(Color.LightGray)
    )
    ArtistCard()
}
```

**Requirements:**
1. Replace the incorrect modifier with the correct scoped one.

**نموذج الحل:**
```kotlin
Box {
    Spacer(
        Modifier
            .matchParentSize()
            .background(Color.LightGray)
    )
    ArtistCard()
}
```
استبدال `fillMaxSize()` بـ `matchParentSize()` يحل المشكلة، لأنه مرتبط بحجم الـ Box الفعلي دون توسيعه.

---

### Exercise 6: Trace Recomposition — scenario
**Scenario / Task:**
Explain, step by step, what happens (in terms of Composition/Layout/Drawing and recomposition) when a user taps a `Button` that toggles a boolean state used to change the button's Text.

**Requirements:**
1. List the sequence of events from tap to updated screen.

**نموذج الحل:**
1. المستخدم يضغط الزر → يُطلق حدث `onClick`.
2. منطق التطبيق يُحدّث متغيّر الحالة (`mutableStateOf`).
3. Compose يكتشف أن composable المعتمد على هذه الحالة يجب أن يُعاد تنفيذه → تحدث Recomposition لهذا الجزء فقط.
4. تُعاد مرحلة Layout للعناصر المتأثرة (قد لا يتغيّر الحجم إن كان النص بنفس الطول تقريباً).
5. تُعاد مرحلة Drawing لرسم النص الجديد على الشاشة.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: Layout Order for Column(Text, Text, Text)

**Input:**
```kotlin
Column {
    Text("A")
    Text("B")
    Text("C")
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Column: measure | ؟ |
| 2 | Text("A"): measure | ؟ |
| 3 | Text("A"): size + place | ؟ |
| 4 | Text("B"): measure | ؟ |
| 5 | Text("B"): size + place | ؟ |
| 6 | Text("C"): measure | ؟ |
| 7 | Text("C"): size + place | ؟ |
| 8 | Column: size + place | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Column: measure | يبدأ قياس نفسه بطلب قياس أبنائه |
| 2 | Text("A"): measure | ورقة — يقيس نفسه فوراً |
| 3 | Text("A"): size + place | يُبلغ حجمه لـ Column |
| 4 | Text("B"): measure | ورقة — يقيس نفسه |
| 5 | Text("B"): size + place | يُبلغ حجمه لـ Column |
| 6 | Text("C"): measure | ورقة — يقيس نفسه |
| 7 | Text("C"): size + place | يُبلغ حجمه لـ Column |
| 8 | Column: size + place | يحدد حجمه (أقصى عرض + مجموع الارتفاعات) ويضع الأبناء عمودياً |

**Result:** ترتيب النصوص "A" فوق "B" فوق "C" عمودياً، وحجم Column = أقصى عرض بين النصوص × مجموع ارتفاعاتها الثلاثة.

---

### Trace Exercise 2: Weighted Row Space Distribution

**Input:**
```kotlin
Row(modifier = Modifier.fillMaxWidth()) {
    Box(Modifier.weight(1f))
    Box(Modifier.weight(3f))
}
```
Assume the Row's total available width is 400dp.

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب مجموع الأوزان | ؟ |
| 2 | حساب حصة Box الأول | ؟ |
| 3 | حساب حصة Box الثاني | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب مجموع الأوزان | 1 + 3 = 4 |
| 2 | حساب حصة Box الأول | (1/4) × 400dp = 100dp |
| 3 | حساب حصة Box الثاني | (3/4) × 400dp = 300dp |

**Result:** Box الأول يأخذ 100dp، وBox الثاني يأخذ 300dp من إجمالي 400dp.

---

### Trace Exercise 3: matchParentSize vs fillMaxSize Effect on Box

**Input:**
```kotlin
// Case A
Box { Spacer(Modifier.matchParentSize()); ArtistCard() }
// Case B
Box { Spacer(Modifier.fillMaxSize()); ArtistCard() }
```
Assume `ArtistCard()` itself measures to 200dp x 100dp, and the screen is 400dp x 800dp.

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Case A: حجم Box النهائي | ؟ |
| 2 | Case A: حجم Spacer | ؟ |
| 3 | Case B: حجم Box النهائي | ؟ |
| 4 | Case B: حجم Spacer | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Case A: حجم Box النهائي | 200dp x 100dp (محدد بحجم ArtistCard فقط) |
| 2 | Case A: حجم Spacer | يطابق حجم Box: 200dp x 100dp |
| 3 | Case B: حجم Box النهائي | 400dp x 800dp (يتمدد ليملأ الشاشة بسبب Spacer) |
| 4 | Case B: حجم Spacer | 400dp x 800dp (يملأ كل المساحة المتاحة) |

**Result:** استخدام `matchParentSize` يحافظ على حجم Box الطبيعي المحدد بمحتواه، بينما `fillMaxSize` يتسبب في تمدد غير مقصود لكامل الشاشة.

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: Design a News Feed Layout Tree
**Task:**
Draw the composition tree (as described in the lecture's Screen/NewsFeed/Story Widget example) for a news feed screen containing: a top-level `Screen`, one `NewsFeed`, and exactly two `StoryWidget` children, each containing an `Image` and a `Text`. Show the tree structure and label the data flow direction.

**نموذج الإجابة:**
```diagram
type: class
title: News Feed Composition Tree
direction: TD
nodes:
  - id: screen
    label: Screen
    kind: composable
    level: 0
  - id: newsfeed
    label: NewsFeed
    kind: composable
    level: 1
  - id: story1
    label: StoryWidget 1
    kind: composable
    level: 2
  - id: story2
    label: StoryWidget 2
    kind: composable
    level: 2
  - id: img1
    label: Image
    kind: leaf
    level: 3
  - id: txt1
    label: Text
    kind: leaf
    level: 3
  - id: img2
    label: Image
    kind: leaf
    level: 3
  - id: txt2
    label: Text
    kind: leaf
    level: 3
edges:
  - from: screen
    to: newsfeed
  - from: newsfeed
    to: story1
  - from: newsfeed
    to: story2
  - from: story1
    to: img1
  - from: story1
    to: txt1
  - from: story2
    to: img2
  - from: story2
    to: txt2
```

**معايير التقييم:**
- وضوح اتجاه تدفق البيانات من الأعلى للأسفل (Screen → NewsFeed → StoryWidget → Image/Text).
- صحة العلاقة الهرمية بين العُقد (كل StoryWidget له طفلان: Image و Text).
- تسمية العُقد بأسماء composable واضحة ومطابقة للسيناريو.

---

### Design Question 2: Architecture — Choosing the Right Layout and Modifiers
**Task:**
You need to design a settings row that: (1) fills the full width of the screen, (2) places an icon on the left and a label next to it vertically centered, (3) is clickable as a whole (including any padding), and (4) has 16dp padding around it. Describe which composables and modifiers you would use, and in what order, and justify your Modifier chain ordering.

**نموذج الإجابة:**
البنية المقترحة:
```kotlin
Row(
    modifier = Modifier
        .clickable(onClick = onClick)
        .fillMaxWidth()
        .padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    Icon(/*...*/)
    Text("Setting Label")
}
```
- `Row` لأن العناصر (أيقونة + نص) يجب أن تكون أفقية.
- `verticalAlignment = Alignment.CenterVertically` لمحاذاة الأيقونة والنص رأسياً.
- ترتيب Modifiers: `.clickable()` أولاً لضمان أن **كل** المساحة بما فيها الحشوة تستجيب للنقر، ثم `.fillMaxWidth()` لضمان امتداد الصف كامل العرض، ثم `.padding(16.dp)` لإضافة الحشوة النهائية حول المحتوى المعروض.

**معايير التقييم:**
- استخدام `Row` بدلاً من `Column` أو `Box` بشكل صحيح.
- ترتيب Modifiers يضمن أن منطقة النقر تشمل الحشوة (كما نوقش في المحاضرة).
- إدراك أن ترتيب `clickable` قبل `padding` هو الفارق الحاسم هنا.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> ملاحظة: أمثلة المحاضرة مستقلة عن بعضها (كل مثال يشرح فكرة منفصلة)، لذا لا يوجد "برنامج واحد" مجزّأ يستوجب دمجه بالكامل. فيما يلي مرجع مُجمّع لأشمل نسخة من بطاقة الفنان (ArtistCard) كما تطورت عبر المحاضرة، لأنها المثال الوحيد الذي بُني تدريجياً عبر عدة شرائح لنفس السياق.

```kotlin
// Data model used across the ArtistCard examples
class Artist {
    val image: ImageBitmap = ImageBitmap(0, 0)
    val name = ""
    val lastSeenOnline = ""
}

@Composable
fun ArtistCardModifiers(
    artist: Artist,
    onClick: () -> Unit
) {
    val padding = 16.dp
    Column(
        // Order matters: clickable first so the whole padded area responds to taps
        Modifier
            .clickable(onClick = onClick)
            .padding(padding)
            .fillMaxWidth()
    ) {
        // Row: image + name/status column, vertically centered
        Row(verticalAlignment = Alignment.CenterVertically) {
            Image(bitmap = artist.image, contentDescription = "Artist image")
            Column {
                Text(
                    text = artist.name,
                    modifier = Modifier.paddingFromBaseline(top = 50.dp)
                )
                Text(
                    text = artist.lastSeenOnline,
                    modifier = Modifier.offset(x = 4.dp)
                )
            }
        }
        // Visual spacing before the card content
        Spacer(Modifier.size(padding))
        // A card with elevation to visually separate content below
        Card(
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        ) { /*...*/ }
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: Explain the difference between the imperative and declarative UI paradigms.
**نموذج الإجابة:** النموذج الإجرائي (View System) يعتمد على تعديل حالة العناصر يدوياً عبر `findViewById()` واستدعاءات `setter`، ما يزيد خطر الأخطاء وعدم الاتساق. النموذج التصريحي (Compose) يصف الواجهة كدالة للحالة الحالية، ويُعاد بناؤها تلقائياً (Recomposition) عند تغيّر تلك الحالة، ما يقلل الكود ويضمن اتساقاً أفضل.

### Question 2: What are the three phases of a Compose frame, and what does each answer?
**نموذج الإجابة:** Composition تُجيب عن "ماذا" سيُعرض (تنفيذ composable functions وإنتاج شجرة UI)، Layout تُجيب عن "أين" (قياس ووضع كل عقدة)، Drawing تُجيب عن "كيف" (الرسم الفعلي على Canvas). الترتيب عادة ثابت باستثناء حالات مثل LazyColumn.

### Question 3: Describe the three-step algorithm used during the Layout phase.
**نموذج الإجابة:** 1) قياس الأبناء (Measure children) 2) تحديد الحجم الخاص بناءً على قياسات الأبناء (Decide own size) 3) وضع الأبناء في إحداثيات نسبية (Place children). كل هذا يحدث بمرور واحد فقط عبر الشجرة لتحسين الأداء.

### Question 4: Why does Compose avoid regenerating the entire UI on every state change?
**نموذج الإجابة:** لأن إعادة بناء الشاشة بالكامل مكلف من ناحية الوقت والطاقة والبطارية، لذلك يتتبع Compose قراءات الحالة (state reads) في كل مرحلة، ويُعيد فقط تنفيذ/تخطيط/رسم الأجزاء المتأثرة فعلياً بالتغيير — وهذا يُسمى Recomposition الانتقائي.

### Question 5: What is the difference between `Modifier.size()` and `Modifier.requiredSize()`?
**نموذج الإجابة:** `size()` يقترح حجماً لكنه قد يُتجاهل إن تعارض مع قيود الوالد. `requiredSize()` يفرض الحجم المحدد بغض النظر عن قيود الوالد الواردة، وقد يُسبب تجاوزاً لحدود التخطيط الأصلية إن لزم.

### Question 6: Explain scope safety in Compose and give two examples of scoped modifiers.
**نموذج الإجابة:** أمان النطاق يعني أن بعض الـ Modifiers لا يمكن استخدامها إلا داخل حاوية معينة، لأنها تحتاج معلومات خاصة عن الوالد (parent data modifiers). مثالان: `weight` (تعمل فقط داخل RowScope/ColumnScope)، و `matchParentSize` (تعمل فقط داخل BoxScope). هذا يمنع الأخطاء الناتجة عن استخدام Modifier في سياق غير مناسب.

### Question 7: Why does modifier ordering matter, and how does it affect a clickable+padding combination?
**نموذج الإجابة:** كل `Modifier.Element` يُطبَّق بالترتيب الذي كُتب به. إذا وُضع `clickable` قبل `padding`، فإن كامل المساحة (بما فيها الحشوة) تستجيب للنقر. أما إذا وُضع `padding` قبل `clickable`، فإن منطقة الحشوة لا تستجيب للنقر — فقط المحتوى الداخلي يستجيب.

### Question 8: What is the benefit of hoisting a Modifier chain into a top-level variable?
**نموذج الإجابة:** يمنع إعادة تخصيص (re-allocation) نفس السلسلة في كل Recomposition، ويُسرّع مقارنة السلاسل الطويلة والمعقدة لأن Compose يقارن نفس الكائن (Instance) بدلاً من نسخ جديدة في كل مرة — ما يُحسّن الأداء العام للتطبيق.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين النموذج الإجرائي والتصريحي بمثال واقعي
- [ ] أفهم لماذا لا تُرجع composable functions قيمة (Unit)
- [ ] أستطيع سرد مراحل Compose الثلاث بالترتيب الصحيح ووظيفة كل مرحلة
- [ ] أفهم خوارزمية القياس-الحجم-الوضع (measure → size → place) ولماذا الآباء تُقاس أولاً وتُوضع أخيراً
- [ ] أعرف متى أستخدم Row، Column، أو Box
- [ ] أفهم الفرق بين horizontalArrangement/verticalAlignment في Row وعكسها في Column
- [ ] أستطيع شرح كيف يُغيّر ترتيب الـ Modifiers السلوك الفعلي (مثال clickable/padding)
- [ ] أفهم الفرق بين size وrequiredSize، وبين padding وoffset
- [ ] أفهم مفهوم Scope Safety وأمثلته (weight، matchParentSize)
- [ ] أستطيع تفسير الفرق بين matchParentSize وfillMaxSize داخل Box
- [ ] أفهم لماذا وكيف يُحسّن hoisting الـ Modifiers الأداء

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| هذه المحاضرة (Compose UI أساسيات) | محاضرة الحالة والتنقل (Compose State & Navigation) | تبني عليها لاحقاً مفاهيم `remember`، `mutableStateOf`، و`State Hoisting` |
| هذه المحاضرة | أساسيات Kotlin (Functions, Lambdas) | الدوال القابلة للتركيب هي دوال Kotlin عادية مع Annotation إضافي |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| النموذج التصريحي | وصف "ماذا" بدلاً من "كيف"؛ Recomposition تلقائي عند تغيّر الحالة |
| مراحل Compose | Composition (ماذا) → Layout (أين) → Drawing (كيف) — مرور واحد فقط |
| التخطيطات | Row (أفقي) / Column (عمودي) / Box (تراكب) |
| Modifiers | ترتيبها يُحدد السلوك؛ بعضها مقيّد بنطاق (Scope Safety) |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `@Composable` | تعليم دالة كمُنشئة واجهة | كل دالة composable |
| `Recomposition` | إعادة تنفيذ composable عند تغيّر الحالة | تحديث الواجهة تلقائياً |
| `weight()` | توزيع نسبي للمساحة | داخل RowScope/ColumnScope فقط |
| `matchParentSize()` | مطابقة حجم الأب دون التأثير عليه | داخل BoxScope فقط |
| `offset()` | إزاحة بصرية دون تغيير القياسات | أي composable |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | composable functions لا تُرجع شيئاً — تصف الشاشة المستهدفة فقط |
| 2 | البيانات تتدفق للأسفل، والأحداث تتدفق للأعلى (Unidirectional Data Flow) |
| 3 | الآباء يُقاسون قبل أبنائهم، لكن يُحدَّد حجمهم ويوضعون بعدهم |
| 4 | ترتيب الـ Modifiers في السلسلة يُغيّر السلوك الفعلي |
| 5 | استخدم الـ Modifier المناسب لنطاقه (weight في Row/Column، matchParentSize في Box) |

---

<!-- VALIDATION: تم توليد هذا الدليل بالكامل من محتوى ملف "تخصصية_2_نظري_مـ6.pdf" (User Interface Development with Jetpack Compose -1-) وفق برومبت android-kotlin.md. تمت تغطية جميع الشرائح (1-38) بما يشمل: Thinking in Compose، الفرق بين الإجرائي والتصريحي، مثال composable function، مراحل Compose الثلاث (Composition/Layout/Drawing) مع أمثلتها التفصيلية (Example1, Example2/SearchResult)، Layouts (Row/Column/Box) وStandard Layout Components، وModifiers (chaining, ordering, hoisting, built-in modifiers: padding/size/requiredSize/fillMax*/offset/weight/matchParentSize) بما فيها Scope Safety. تم الالتزام ببنية SCHEMA.md v1.0 المذكورة في البرومبت (blocks: code, algorithm, diagram, analogy, trade-off, before-after, trace, callouts) قدر الإمكان اعتماداً على القوالب المرفقة في نفس ملف البرومبت، دون الوصول لملف SCHEMA.md نفسه لأنه لم يُرفق. جميع الأعداد المطلوبة من الأسئلة تحققت: 16 MCQ، 6 Debug، 6 تمارين إضافية، 3 تمارين تتبع، 2 سؤالي تصميم، 8 أسئلة نظرية. -->

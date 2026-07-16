# المحاضرة 7 — Compose State & Navigation (الحالة والتنقل في Jetpack Compose)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** State in Jetpack Compose, Stateful/Stateless Composables, State Hoisting, Lifecycle of Composables, Navigation Component for Compose

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| بناء واجهة ثابتة (Compose UI phase 1) | `@Composable`، `Column/Row/Box`، `Modifier` | شاشة تعرض بيانات ثابتة |
| **إدارة الحالة والتنقل ← أنت هنا** | `remember`، `mutableStateOf`، `rememberSaveable`، `NavController`، `NavHost` | شاشة تفاعلية تتغيّر مع المستخدم، وتتنقّل بين عدة شاشات |
| ربط بمصدر بيانات حقيقي (ViewModel/Repository) | `ViewModel`، `StateFlow`، `Room`، `Retrofit` | تطبيق كامل بمعمارية MVVM |

> **نوع هذه المحاضرة:** محاضرة **Compose State & Navigation** — تجمع بين مفهومين مترابطين: كيف تُخزَّن الحالة وتُحدَّث داخل composable (State, remember, State Hoisting)، وكيف تتنقّل بين composables متعددة باستخدام Navigation Component (`NavController`, `NavHost`, `NavGraph`, Back Stack).

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مفهوم الحالة (State) في أندرويد

#### النص الأصلي يقول (English):
> "State in an app is any value that can change over time. This is a very broad definition and encompasses everything from a Room database to a variable in a class."

#### الشرح المبسّط:
الـ `State` هو ببساطة **أي قيمة قابلة للتغيّر مع الوقت**. هذا التعريف واسع جداً — يشمل قيمة بسيطة في متغيّر، ويشمل أيضاً قاعدة بيانات كاملة مثل `Room`. كل شيء يظهر على الشاشة ويمكن أن يتغيّر هو "حالة".

من أمثلة الحالة التي ذكرتها المحاضرة:
- آخر رسائل في تطبيق دردشة
- الصورة الشخصية للمستخدم
- موضع التمرير (scroll position) في قائمة
- رسالة `Snackbar` تظهر عند فشل الاتصال بالشبكة
- تدوينة ومعها التعليقات المرتبطة بها
- تأثير `Ripple` عند الضغط على زر
- ملصقات (Stickers) يرسمها المستخدم فوق صورة

**لماذا؟**
لأن الواجهة (UI) في النهاية ليست إلا **انعكاساً مرئياً للحالة الحالية**. طالما فهمت الفكرة "الحالة هي المصدر، والواجهة نتيجة"، ستفهم فلسفة Compose كاملة.

#### 💡 التشبيه:
> فكّر في الحالة مثل **مؤشر البنزين في السيارة**: الإبرة (الواجهة) لا تتحرك من تلقاء نفسها؛ هي فقط تعرض قيمة حقيقية (كمية البنزين = الحالة) في تلك اللحظة.
> **وجه الشبه:** كمية البنزين الفعلية = State، حركة إبرة المؤشر = UI.

---

### 2. الأحداث (Events) كمحرّك لتغيير الحالة

#### النص الأصلي يقول (English):
> "State is updated in response to events... While the state of the app offers a description of what to display in the UI, events are the mechanism through which the state changes, resulting in changes to the UI."

#### الشرح المبسّط:
الحالة **لا تتغيّر من نفسها**. شيء ما يجب أن يُحدث هذا التغيير، وهذا الشيء يُسمّى **Event (حدث)**. الحدث قد يكون:
- تفاعل المستخدم (ضغط زر مثلاً)
- عامل خارجي (حساس استشعار، استجابة شبكة)

**القاعدة الذهبية هنا:** *State is. Events happen.* — أي أن الحالة "توجد وتُوصف"، بينما الأحداث "تحدث وتُسبّب التغيير".

هذا يشكّل حلقة أساسية تسمّى **UI Update Loop**:

```algorithm
1 | حدوث الحدث (Event) | المستخدم أو النظام | مثلاً ضغط زر أو استجابة شبكة
2 | تحديث الحالة (Update State) | Event Handler | معالج الحدث يغيّر قيمة الحالة
3 | عرض الحالة (Display State) | Compose Runtime | الواجهة تُعاد رسمها بالقيمة الجديدة
```

#### نقاط التنفيذ:
- الحلقة **دائرية ومستمرة**: كل تحديث حالة قد يفتح الباب لحدث جديد (مثال: تحديث القائمة قد يُظهر زر "تحميل المزيد").
- Compose لا "يدفع" التحديث مباشرة إلى الشاشة، بل يعيد تنفيذ الدالة composable المرتبطة بالحالة.

#### 💡 التشبيه:
> تماماً مثل **الترموستات**: تغيّر درجة الحرارة في الغرفة (Event) يجعل الجهاز يقرأ القيمة الجديدة (Update State)، فتضيء الشاشة برقم جديد (Display State).
> **وجه الشبه:** الحساس = مصدر الحدث، القيمة المخزّنة = State، الشاشة الرقمية = الـ UI المعروضة.

---

### 3. لماذا لا تتحدّث المتغيرات المحلية تلقائياً؟ (Recomposition)

#### النص الأصلي يقول (English):
> "Compose is declarative and as such the only way to update it is by calling the same composable with new arguments... If you run this and try to enter text, you'll see that nothing happens. That's because the TextField doesn't update itself—it updates when its value parameter changes."

#### الشرح المبسّط:
Compose بُني على مبدأ **البرمجة التصريحية (declarative)**: أنت لا تكتب "كيف" تتغيّر الواجهة خطوة بخطوة (كما في imperative)، بل تصف "كيف تبدو الواجهة عندما تكون الحالة كذا". لتحديث الواجهة، يجب أن يُعاد استدعاء composable **بنفس البارامترات لكن بقيم جديدة**.

المثال التالي (`HelloContent`) يوضّح خطأ شائع: وضعنا `value = ""` مباشرة، فلا شيء يربط هذه القيمة بأي متغيّر يتغيّر، لذلك الكتابة في الحقل لا تظهر أبداً:

#### 💻 الكود: TextField لا يتحدث ذاتياً

#### ما هذا الكود؟
> يوضّح خطأ نموذجي: `OutlinedTextField` يُعطى قيمة ثابتة `""` فلا يتغيّر أبداً مهما كتب المستخدم.

```kotlin
@Composable
private fun HelloContent() {
    // Column arranges children vertically with padding
    Column(modifier = Modifier.padding(16.dp)) {
        // Static text label
        Text(
            text = "Hello!",
            modifier = Modifier.padding(bottom = 8.dp),
            style = MaterialTheme.typography.bodyMedium
        )
        // TextField with a hardcoded empty value - THIS IS THE BUG
        OutlinedTextField(
            value = "",
            onValueChange = { }, // does nothing with the new text
            label = { Text("Name") }
        )
    }
}
```

#### شرح كل سطر:
1. `Column(modifier = Modifier.padding(16.dp))` → حاوية عمودية — تنظّم العناصر مع حشوة 16dp
2. `Text(text = "Hello!", ...)` → نص ثابت لا علاقة له بالحالة
3. `OutlinedTextField(value = "", ...)` → القيمة مثبّتة دائماً على فارغة، لذلك أي إدخال يُتجاهل بصرياً
4. `onValueChange = { }` → دالة فارغة، لا تُحدّث أي حالة عند الكتابة

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.foundation.layout.Column`
> `import androidx.compose.material3.OutlinedTextField`
> `import androidx.compose.material3.Text`

**الناتج المتوقع (لقطة الشاشة):**
> حقل نصي يبدو فارغاً دائماً؛ أي حرف يكتبه المستخدم لا يظهر لأن `value` لا يتغيّر أبداً.

#### الفهم الخاطئ ❌: "التطبيق سيعرض ما أكتبه لأن هناك `TextField`."
#### الفهم الصحيح ✅: الـ `TextField` عنصر "أبكم" بصريّاً — يعرض فقط قيمة `value` التي تُمرَّر إليه، ولا يخزّن شيئاً بنفسه.

---

### 4. لماذا تفشل المتغيرات المحلية العادية أيضاً؟

#### النص الأصلي يقول (English):
> "The composable can be re-executed... count is a local variable... Recomposition may happen at any time... count is reset to 0 on every recomposition. **Local variables cannot hold UI state in Compose**"

#### الشرح المبسّط:
حتى لو استخدمنا `var count = 0` داخل composable، فإن كل عملية **Recomposition** (إعادة تركيب) تعيد تنفيذ الدالة من جديد، وبالتالي `count` يُعاد تصفيره إلى 0 في كل مرة. السبب أن المتغيرات المحلية العادية في Kotlin لا "تنجو" من إعادة تنفيذ الدالة.

```kotlin
@Composable
fun Counter() {
    // WRONG: this resets to 0 every recomposition
    var count = 0
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

**لماذا؟**
لأن Compose يتعامل مع composable كدالة عادية تُستدعى من جديد لإعادة وصف الواجهة (وليس لتحديث كائن UI موجود فعلياً كما في الـ View system القديم). لذلك يجب تخزين القيمة في مكان **يبقى حياً عبر عمليات الاستدعاء المتكررة**، وهذا بالضبط ما يوفره `remember`.

#### مهم للامتحان ⚠️:
> احفظ هذه الجملة حرفياً: **"Local variables inside a composable do NOT survive recomposition"** — سؤال كلاسيكي في الامتحانات.

---

### 5. remember و mutableStateOf

#### النص الأصلي يقول (English):
> "Composable functions can use the remember API to store an object in memory... remember can be used to store both mutable and immutable objects. mutableStateOf creates an observable MutableState<T>... Any changes to value schedules recomposition of any composable functions that read value."

#### الشرح المبسّط:
- `remember` هي دالة تحفظ كائناً **داخل الـ Composition** بحيث لا يُعاد إنشاؤه من الصفر في كل Recomposition، بل يُستعاد كما هو.
- `mutableStateOf(default)` ينشئ كائن `MutableState<T>` — وهو نوع خاص "قابل للملاحظة" (observable) يعرفه Compose runtime.
- عندما يتغيّر `value` داخل هذا الكائن، يُجدوَل Compose تلقائياً **إعادة تركيب** أي composable يقرأ هذا الـ `value`.

```kotlin
interface MutableState<T> : State<T> {
    override var value: T
}
```

**لماذا الجمع بين `remember` و `mutableStateOf`؟**
- `mutableStateOf` وحدها تُنشئ كائناً جديداً في كل استدعاء (لو استُخدمت بدون remember سيُعاد إنشاؤها من الصفر بقيمة البداية كل Recomposition).
- `remember` وحدها تحفظ كائناً عادياً، لكن التغيير عليه لن "يُخطر" Compose بوجود تغيير.
- **معاً**: `remember { mutableStateOf(default) }` يحفظ الكائن القابل للملاحظة عبر الـ Recompositions، وأي تغيير في قيمته يُطلق تلقائياً إعادة رسم الأجزاء المعنية فقط.

#### مهم للامتحان ⚠️:
> `remember` تحفظ الكائن في الـ Composition، **وتنساه** عندما يُزال الـ composable الذي استدعاها من الـ Composition (أي عند الخروج من الشاشة مثلاً).

#### 💡 التشبيه:
> `remember` مثل **دفتر ملاحظات لاصق على الجدار** — يبقى معلّقاً طالما الغرفة (composable) موجودة، ويُرمى عند إزالة الغرفة.
> **وجه الشبه:** الدفتر = القيمة المحفوظة، الجدار = الـ Composition، إزالة الغرفة = خروج composable من الشجرة.

---

### 6. الطرق الثلاث لإعلان MutableState

#### النص الأصلي يقول (English):
> "There are three ways to declare a MutableState object in a composable: val mutableState = remember { mutableStateOf(default) } / var value by remember { mutableStateOf(default) } / val (value, setValue) = remember { mutableStateOf(default) }"

#### الشرح المبسّط:

| الصيغة | كيف تُستخدم القيمة | يتطلب استيراد خاص؟ |
| --- | --- | --- |
| `val mutableState = remember { mutableStateOf(default) }` | `mutableState.value` | لا |
| `var value by remember { mutableStateOf(default) }` | `value` مباشرة (delegate) | نعم: `getValue`, `setValue` |
| `val (value, setValue) = remember { mutableStateOf(default) }` | `value` للقراءة، `setValue(new)` للتحديث | لا (destructuring) |

الصيغة الثانية (`by`) هي الأكثر شيوعاً واختصاراً لأنها تجعل التعامل مع الحالة أشبه بمتغيّر عادي:

```kotlin
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue

@Composable
fun HelloContent() {
    Column(modifier = Modifier.padding(16.dp)) {
        // remember + mutableStateOf + by delegate
        var name by remember { mutableStateOf("") }

        // Only show greeting when name is not empty
        if (name.isNotEmpty()) {
            Text(
                text = "Hello, $name!",
                modifier = Modifier.padding(bottom = 8.dp),
                style = MaterialTheme.typography.bodyMedium
            )
        }

        OutlinedTextField(
            value = name,
            onValueChange = { name = it }, // updates state -> triggers recomposition
            label = { Text("Name") }
        )
    }
}
```

#### شرح كل سطر:
1. `var name by remember { mutableStateOf("") }` → إنشاء حالة نصية تبدأ فارغة، محفوظة عبر الـ Recompositions
2. `if (name.isNotEmpty())` → استخدام قيمة الحالة كشرط منطقي للتحكم بأي composable يظهر
3. `OutlinedTextField(value = name, onValueChange = { name = it }, ...)` → ربط ثنائي الاتجاه: القيمة تُعرض من `name`، والتغيير يُحدّث `name`

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.runtime.remember`
> `import androidx.compose.runtime.mutableStateOf`
> `import androidx.compose.runtime.getValue`
> `import androidx.compose.runtime.setValue`

**الناتج المتوقع (لقطة الشاشة):**
> عند الكتابة في الحقل، تظهر فوره جملة "Hello, <الاسم>!" لأن `name` تحدّثت وتسبّبت في Recomposition.

---

### 7. remember مقابل rememberSaveable

#### النص الأصلي يقول (English):
> "While remember helps you retain state across recompositions, the state is not retained across configuration changes. For this, you must use rememberSaveable. rememberSaveable automatically saves any value that can be saved in a Bundle."

#### الشرح المبسّط:
- `remember` يحمي القيمة من الضياع خلال **Recomposition فقط**.
- لكنه **لا يحميها** من تغييرات التهيئة (Configuration changes) مثل تدوير الشاشة، لأن النشاط بأكمله (Activity) قد يُعاد إنشاؤه في هذه الحالة.
- `rememberSaveable` يحفظ القيمة تلقائياً داخل `Bundle` (لأنواع مثل `String`, `Int`, `Boolean`, `Parcelable`, `Serializable`)، فتنجو حتى من تدوير الشاشة.

#### ⚖️ المقايضة: remember مقابل rememberSaveable

| | `remember` | `rememberSaveable` |
| --- | --- | --- |
| المزايا | أخف وأسرع، مناسب لحالة مؤقتة بحتة | تنجو من تدوير الشاشة وتغييرات التهيئة |
| العيوب | تُفقد القيمة عند تدوير الشاشة | تكلفة أعلى قليلاً، تحتاج النوع أن يكون قابلاً للحفظ في Bundle |
| متى تختاره | حالة UI بحتة لا تهم المستخدم (مثل توسيع/طي عنصر مؤقت) | حالة يراها المستخدم ويجب أن تبقى بعد تدوير الشاشة (نص مكتوب، تحديد) |

#### مهم للامتحان ⚠️:
> **قاعدة تذكّر سريعة:** حالة عرض مؤقتة داخلية → `remember`. حالة مرئية للمستخدم يجب أن تصمد أمام الدوران → `rememberSaveable`.

---

### 8. Stateful مقابل Stateless Composables

#### النص الأصلي يقول (English):
> "A composable that uses remember to store an object creates internal state, making the composable stateful... A stateless composable is a composable that doesn't hold any state. It receives state via parameters."

#### الشرح المبسّط:
- **Stateful composable**: يخزّن حالته الخاصة داخلياً (باستخدام `remember`). سهل الاستخدام لمن يستدعيه (لا يحتاج تمرير أي شيء)، لكنه أقل قابلية لإعادة الاستخدام وأصعب في الاختبار لأن الحالة "مخفية" بداخله.
- **Stateless composable**: لا يخزّن أي حالة داخلياً؛ بل يستقبلها كباراميترات من الخارج. أكثر مرونة، وأسهل بكثير في الاختبار (تُعطيه قيمة، وتتحقق من الناتج).

#### ⚖️ المقايضة: Stateful مقابل Stateless

| | Stateful | Stateless |
| --- | --- | --- |
| المزايا | استدعاء سريع وبسيط، لا حاجة لتمرير حالة من الخارج | إعادة استخدام أسهل، اختبار أسهل، مصدر واحد للحقيقة |
| العيوب | صعوبة المشاركة أو التحكم من الخارج، أصعب اختبار | يتطلب من المستدعي تمرير القيمة و onValueChange بنفسه |
| متى تختاره | مكوّن بسيط ومستقل تماماً لا يحتاج تنسيق مع بقية الشاشة | مكوّن يُعاد استخدامه في أماكن متعددة أو يحتاج التحكم بحالته من شاشة أعلى |

**الحل الشائع:** تصميم **نسختين** من نفس composable — نسخة Stateful "مريحة" تُستخدم مباشرة، ونسخة Stateless "قابلة للاختبار" تُستخدم عندما يحتاج المستدعي التحكم بالحالة. الأداة التي تربط بينهما تُسمّى **State Hoisting**.

---

### 9. State Hoisting (رفع الحالة)

#### النص الأصلي يقول (English):
> "State hoisting in Compose is a pattern of moving state to a composable's caller to make a composable stateless. The general pattern... is to replace the state variable with two parameters: value: T... and onValueChange: (T) -> Unit"

#### الشرح المبسّط:
**State Hoisting** يعني ببساطة: **انقل الحالة إلى الأعلى، إلى الجهة المستدعية (caller)**، بحيث يصبح الـ composable نفسه بلا حالة داخلية (Stateless). بدلاً من أن يخزّن composable حالته بنفسه، يستقبل بارامترين:
1. `value: T` → القيمة الحالية لعرضها
2. `onValueChange: (T) -> Unit` → دالة تُستدعى عندما يريد composable طلب تغيير القيمة (وليس تغييرها بنفسه)

**لماذا هذا مهم؟**
- **Single source of truth (مصدر واحد للحقيقة):** الحالة موجودة في مكان واحد فقط، فلا يوجد تضارب بين نسختين من نفس القيمة.
- **Encapsulated (محاط/محمي):** فقط composable الذي يملك الحالة (Stateful) يمكنه تغييرها فعلياً.
- **Shareable (قابلة للمشاركة):** composables أخرى يمكنها قراءة نفس الحالة.
- **Interceptable (قابلة للاعتراض):** المستدعي يمكنه تعديل أو تجاهل الحدث قبل تحديث الحالة فعلياً.
- **Decoupled (مفصولة):** يمكن نقل الحالة لاحقاً إلى `ViewModel` دون تعديل composable الأصلي إطلاقاً.

#### 💻 الكود: HelloScreen (Stateful) و HelloContent (Stateless)

#### ما هذا الكود؟
> يوضّح كيف تُرفع الحالة من `HelloContent` إلى `HelloScreen` الأعلى منها في الشجرة، لتصبح `HelloContent` قابلة لإعادة الاستخدام والاختبار بسهولة.

```kotlin
// Stateless: receives state and event as parameters
@Composable
fun HelloContent(name: String, onNameChange: (String) -> Unit) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "Hello, $name",
            modifier = Modifier.padding(bottom = 8.dp),
            style = MaterialTheme.typography.bodyMedium
        )
        // value comes from parameter, event goes up via onNameChange
        OutlinedTextField(value = name, onValueChange = onNameChange, label = { Text("Name") })
    }
}

// Stateful: owns and hoists the state to itself
@Composable
fun HelloScreen() {
    // rememberSaveable so it survives configuration changes too
    var name by rememberSaveable { mutableStateOf("") }
    HelloContent(name = name, onNameChange = { name = it })
}
```

#### شرح كل سطر:
1. `fun HelloContent(name: String, onNameChange: (String) -> Unit)` → لا يوجد `remember` بالداخل إطلاقاً — أصبح Stateless بالكامل
2. `OutlinedTextField(value = name, onValueChange = onNameChange, ...)` → التمرير المباشر لكل من القيمة والحدث دون معالجة داخلية
3. `var name by rememberSaveable { mutableStateOf("") }` → الحالة الفعلية موجودة هنا فقط، في المستوى الأعلى
4. `HelloContent(name = name, onNameChange = { name = it })` → استدعاء composable الأدنى مع تمرير القيمة والحدث

**الناتج المتوقع (لقطة الشاشة):**
> نفس السلوك البصري السابق (كتابة الاسم وظهور "Hello, ...")، لكن `HelloContent` أصبحت الآن قابلة لإعادة استخدامها في أي مكان آخر بأي مصدر حالة.

#### 📊 المخطط: تدفق البيانات بين HelloScreen و HelloContent

#### ما هذا المخطط؟
> يوضّح مبدأ **Unidirectional Data Flow (UDF)**: الحالة تنزل من الأعلى إلى الأسفل، والأحداث تصعد من الأسفل إلى الأعلى.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | HelloScreen | container | يملك الحالة الفعلية (name) |
| 2 | HelloContent | container | Stateless، يعرض فقط |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| HelloScreen | HelloContent | state (name) | نزولاً | القيمة تُمرَّر كـ parameter |
| HelloContent | HelloScreen | event (onNameChange) | صعوداً | الحدث يُبلّغ الأعلى بطلب التغيير |

```diagram
type: flowchart
title: Unidirectional Data Flow
direction: TD
nodes:
  - id: screen
    label: HelloScreen (Stateful)
    kind: event
    level: 0
  - id: content
    label: HelloContent (Stateless)
    kind: event
    level: 1
edges:
  - from: screen
    to: content
  - from: content
    to: screen
```

#### نقطة مهمة ⚠️:
> لست مُلزماً باستخدام اسم `onValueChange` حرفياً؛ إن كان هناك حدث أكثر تحديداً وملاءمة للـ composable (مثل `onLoginClick`)، عرّفه بنفس المنطق كـ lambda مستقل.

---

### 10. قواعد رفع الحالة (أين توضع؟)

#### النص الأصلي يقول (English):
> "State should be hoisted to at least the lowest common parent of all composables that use the state (read). State should be hoisted to at least the highest level it may be changed (write). If two states change in response to the same events they should be hoisted together."

#### الشرح المبسّط:
ثلاث قواعد بسيطة تحدّد **أين** يجب أن تعيش الحالة في شجرة composables:
1. **للقراءة:** ارفعها على الأقل إلى **أقرب أب مشترك** بين كل composables التي تحتاج قراءتها.
2. **للكتابة:** ارفعها على الأقل إلى **أعلى مستوى** قد تتغيّر منه.
3. **حالتان تتغيّران معاً:** إذا كانت حالتان تتغيّران استجابة لنفس الحدث، يجب رفعهما **معاً** (وليس بشكل منفصل).

**لماذا؟**
لأن "تسفيل" الحالة (underhoisting — أي تركها منخفضة جداً في الشجرة) يجعل من المستحيل اتّباع مبدأ Unidirectional Data Flow بشكل صحيح، ويؤدي إلى تكرار أو تضارب البيانات.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كانت شاشتان مختلفتان تعرضان قيمة "سلة التسوّق" — أين يجب أن تعيش هذه الحالة؟
> **لماذا هذا مهم؟** لأنك ستحتاج رفعها إلى أقرب أب مشترك للشاشتين (أو حتى إلى `ViewModel` مشترك)، وإلا ستحصل على نسختين متضاربتين من السلة.

---

### 11. Composition ودورة حياة الـ Composables

#### النص الأصلي يقول (English):
> "A Composition describes the UI of your app and is produced by running composables. A Composition is a tree-structure of the composables that describe your UI... A Composition can only be produced by an initial composition and updated by recomposition."

#### الشرح المبسّط:
- **Composition**: هي بنية شجرية تصف واجهة التطبيق بالكامل، وتُنتَج من تشغيل composables.
- **Initial composition**: أول مرة تُشغَّل فيها composables لبناء الشجرة الأولى.
- **Recomposition**: إعادة تشغيل بعض composables فقط عند تغيّر حالة تعتمد عليها، لتحديث الشجرة.

القاعدة الحاسمة: **الطريقة الوحيدة لتعديل الـ Composition هي عبر Recomposition** — لا توجد طريقة أخرى "لِلَمْس" الشجرة مباشرة كما كان يحدث في الـ View system القديم (findViewById + setText مثلاً).

#### النص الأصلي يقول (English):
> "Recomposition is typically triggered by a change to a State<T> object. Compose tracks these and runs all composables in the Composition that read that particular State<T>, and any composables that they call that cannot be skipped."

#### الشرح المبسّط:
عندما تتغيّر قيمة `State<T>`، فإن Compose **يعرف تحديداً** أي composables قرأت هذه القيمة، ويعيد تنفيذ هذه الـ composables فقط (وأي composables أخرى تستدعيها ولا يمكن تخطّيها) — وليس الشجرة بأكملها. هذا هو أساس الأداء العالي في Compose.

```algorithm
1 | تغيّر قيمة State<T> | Compose Runtime | يُسجَّل التغيير في نظام التتبع (Snapshot system)
2 | تحديد القارئين | Compose Compiler + Runtime | معرفة أي composables قرأت هذه الحالة تحديداً
3 | جدولة Recomposition | Compose Runtime | فقط الـ composables المتأثرة تُعاد جدولتها
4 | إعادة التنفيذ الانتقائي | Compose Runtime | الأجزاء غير المتأثرة تُتخطّى (skip) توفيراً للأداء
```

---

### 12. هوية الـ Composable في الـ Composition (Call Site)

#### النص الأصلي يقول (English):
> "The instance of a composable in Composition is identified by its call site. The Compose compiler considers each call site as distinct... Preserving identity is crucial to associate side effects with their composable, so that they can complete successfully rather than restart for every recomposition."

#### الشرح المبسّط:
كل استدعاء لـ composable له **موقع استدعاء (call site)** فريد في الكود المصدري، ويُستخدم هذا الموقع من قبل المُصرِّف (compiler) لتمييز كل نسخة (instance) عن الأخرى داخل الـ Composition. حتى لو تغيّر ترتيب الاستدعاء بين recompositions، تبقى الهوية محفوظة طالما موقع الاستدعاء لم يتغيّر.

**لماذا هذا مهم؟**
لأن الحفاظ على الهوية يضمن أن الـ **Side Effects** (مثل تحميل صورة عبر الشبكة) المرتبطة بذلك composable **تُكمل عملها بدلاً من أن تُعاد من الصفر** في كل recomposition.

#### 💻 الكود: LoginScreen — تغيّر الترتيب لا يفقد الهوية

#### ما هذا الكود؟
> يوضّح أن composable الذي لا تتغيّر بارامتراته يُتخطّى (skip) في الـ Recomposition، حتى لو تغيّر مكانه في الشجرة نتيجة شرط.

```kotlin
@Composable
fun LoginScreen(showError: Boolean) {
    // LoginError is called only when showError is true
    if (showError) {
        LoginError()
    }
    // LoginInput's call site stays fixed regardless of showError
    LoginInput()
}

@Composable
fun LoginInput() { /* ... */ }

@Composable
fun LoginError() { /* ... */ }
```

#### شرح كل سطر:
1. `if (showError) { LoginError() }` → استدعاء شرطي، لا يحدث إلا حين `showError = true`
2. `LoginInput()` → استدعاء دائم بغض النظر عن الشرط — يحافظ على نفس موقع الاستدعاء دوماً
3. عند تغيّر `showError` إلى true، Compose يتعرّف أن `LoginInput` **لم تتغيّر بارامتراتها إطلاقاً** فيتخطّاها (skip) تماماً

**نقطة مهمة ⚠️:**
> رغم أن `LoginInput` "انتقلت" من كونها الاستدعاء الأول إلى الثاني في الترتيب البصري، يبقى موقع استدعائها في الكود ثابتاً، لذلك تُحفظ هويتها عبر الـ Recompositions.

---

### 13. تكرار composable من نفس موقع الاستدعاء (Loops) ودور key()

#### النص الأصلي يقول (English):
> "Calling a composable multiple times will add it to Composition multiple times as well. When calling a composable multiple times from the same call site, Compose doesn't have any information to uniquely identify each call to that composable, so the execution order is used in addition to the call site."

#### الشرح المبسّط:
عند استدعاء composable **داخل حلقة (loop)** من نفس موقع الاستدعاء (مثل `for (movie in movies) { MovieOverview(movie) }`)، لا يملك Compose معلومات كافية لتمييز كل عنصر بشكل فريد، لذا يستخدم **ترتيب التنفيذ (execution order)** بالإضافة إلى موقع الاستدعاء كوسيلة تمييز مؤقتة.

**المشكلة:** هذا يعمل جيداً فقط إذا كانت الإضافات تحدث في **نهاية** القائمة. أما إذا أُضيف عنصر جديد إلى **أعلى أو وسط** القائمة، أو حُذف عنصر، أو أُعيد ترتيب القائمة، فإن **كل** استدعاءات `MovieOverview` التي تغيّر موضعها ستُعاد تركيبها من جديد رغم أن بياناتها الفعلية لم تتغيّر — وهذا قد يُلغي ويُعيد تشغيل أي Side Effect جارٍ (مثل تحميل صورة عبر الشبكة).

#### 💻 الكود: استخدام key() لحل المشكلة

#### ما هذا الكود؟
> يستخدم `key(movie.id)` لإعطاء Compose معرّفاً فريداً حقيقياً لكل عنصر، بدلاً من الاعتماد على ترتيب التنفيذ فقط.

```kotlin
@Composable
fun MoviesScreenWithKey(movies: List<Movie>) {
    Column {
        for (movie in movies) {
            // movie.id is a real unique identifier for this instance
            key(movie.id) {
                MovieOverview(movie)
            }
        }
    }
}
```

#### شرح كل سطر:
1. `for (movie in movies)` → حلقة عادية تمر على كل عنصر في القائمة
2. `key(movie.id) { ... }` → يُخبر Compose runtime أن هوية هذا الاستدعاء تُحدَّد بمعرّف الفيلم الحقيقي، وليس بموضعه في القائمة
3. `MovieOverview(movie)` → الآن، حتى لو تغيّر ترتيب القائمة، Compose يتعرّف بشكل صحيح على أي العناصر بقيت كما هي دون داعٍ لإعادة تشغيل Side Effects الخاصة بها

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.runtime.key`

**الناتج المتوقع (لقطة الشاشة):**
> عند إضافة فيلم جديد في أعلى القائمة، لا تُعاد تحميل صور الأفلام الأخرى التي بقيت في مكانها منطقياً (بحسب `id`)، رغم تغيّر مواضعها الفهرسية في القائمة.

#### مهم للامتحان ⚠️:
> استخدم `key()` كلما استدعيت composable عدة مرات من نفس موقع الاستدعاء (غالباً داخل loop) **وكان يحتوي على Side Effect أو حالة داخلية** يجب ألا تُفقد أو تُعاد من الصفر.

---

### 14. ما هو الـ Navigation؟

#### النص الأصلي يقول (English):
> "Navigation refers to the interactions that let users navigate across, into, and back out from the different pieces of content within your app."

#### الشرح المبسّط:
الـ Navigation هو ببساطة **كل ما يسمح للمستخدم بالتنقّل بين شاشات التطبيق**: الدخول إلى شاشة تفاصيل، الرجوع منها، الانتقال بين تبويبات، إلخ.

في Compose تحديداً:
- كل شاشة هي **دالة composable**
- كل composable يمثّل **وجهة (destination)**
- الـ Navigation **لا ينشئ واجهة جديدة**، بل فقط يُقرّر أي واجهة يجب أن تُعرض
- تحديث الواجهة المرئية يحدث بسبب **تغيّر حالة الوجهة**، والتي تُترجم إلى Recomposition

> **القاعدة الذهبية:** Navigation in Compose is a state-driven UI transition implemented through recomposition.

#### ⚖️ المقايضة: Navigation في View System التقليدي مقابل Compose

| | View System التقليدي | Jetpack Compose |
| --- | --- | --- |
| المزايا | تحكم صريح ومباشر بالانتقالات عبر `FragmentManager` | تدفق تصريحي مبسّط، لا حاجة لإدارة يدوية لـ transactions |
| العيوب | إدارة الـ Back Stack يدوياً، كود أكثر تعقيداً | يتطلب فهم مبدأ الحالة (State) بشكل جيد أولاً |
| متى تختاره | مشاريع قديمة (legacy) تعتمد على Activities/Fragments | مشاريع Compose جديدة بالكامل (single-activity apps) |

---

### 15. المفاهيم الأساسية للـ Navigation

#### النص الأصلي يقول (English):
> "Host: A UI element that contains the current navigation destination... Graph: A data structure that defines all the navigation destinations... Controller: The central coordinator for managing navigation between destinations... Destination: A node in the navigation graph... Route: Uniquely identifies a destination and any data required by it."

#### الشرح المبسّط:

| المصطلح | الوظيفة | النوع في Compose |
| --- | --- | --- |
| Host | عنصر واجهة يحتوي الوجهة الحالية ويبدّلها عند التنقّل | `NavHost` |
| Graph | بنية بيانات تصف كل الوجهات وكيف تتصل ببعضها | `NavGraph` |
| Controller | المنسّق المركزي: يتنقل، يدير الـ Back Stack، يعالج deep links | `NavController` |
| Destination | عقدة واحدة داخل الـ Graph، تُعرض عند الوصول إليها | `NavDestination` |
| Route | معرّف نصي فريد للوجهة (وأي بيانات تلزمها) | نص فريد (String) |

#### 💡 التشبيه:
> تخيّل مطاراً: **NavController** هو **برج المراقبة** (ينسّق كل الرحلات)، **NavGraph** هو **خريطة كل المسارات الممكنة** بين المطارات، **NavHost** هو **بوابة الوصول** التي تعرض الطائرة الحالية فقط، و**Route** هو **رمز الرحلة** الذي يحدّد أين تذهب بالضبط.
> **وجه الشبه:** NavController = برج المراقبة، NavHost = بوابة العرض، Route = رمز الرحلة.

---

### 16. إعداد Navigation في مشروع Compose

#### النص الأصلي يقول (English):
> "The Navigation component provides support for Jetpack Compose applications... To implement navigation in a Compose app, define: A NavController, A NavHost, A NavGraph"

#### الشرح المبسّط:
لإضافة دعم الـ Navigation، تضيف الاعتمادية التالية إلى ملف `build.gradle` الخاص بالتطبيق:

#### 💻 الكود: إضافة اعتمادية Navigation Compose

#### ما هذا الكود؟
> يضيف مكتبة `navigation-compose` الضرورية لاستخدام NavController وNavHost وNavGraph.

```groovy
// build.gradle (app module)
dependencies {
    // navigation-compose version used in the lecture
    val nav_version = "2.9.7"
    implementation("androidx.navigation:navigation-compose:$nav_version")
}
```

#### شرح كل سطر:
1. `val nav_version = "2.9.7"` → تعريف رقم إصدار مكتبة الـ Navigation كثابت لإعادة الاستخدام
2. `implementation("androidx.navigation:navigation-compose:$nav_version")` → إضافة المكتبة الفعلية لمشروع Compose

**الناتج المتوقع (لقطة الشاشة):**
> بعد مزامنة Gradle (Sync)، تصبح `rememberNavController()`, `NavHost`, و`composable()` متاحة للاستخدام في المشروع.

---

### 17. إنشاء NavController

#### النص الأصلي يقول (English):
> "The navigation controller holds the navigation graph and exposes methods that allow your app to move between the destinations in the graph... To create a NavController when using Jetpack Compose, call rememberNavController()"

#### الشرح المبسّط:
`NavController` هو **الـ API المركزي للتنقّل** — يتتبّع الوجهات التي زارها المستخدم، ويسمح بالتنقّل بينها. في Compose، يُنشأ عبر:

```kotlin
val navController = rememberNavController()
```

**لماذا `remember` هنا بالذات؟**
لأن `rememberNavController()` تستخدم `remember` داخلياً لضمان أن نفس الكائن `NavController` يبقى محفوظاً عبر الـ Recompositions، بدلاً من إعادة إنشائه من الصفر في كل مرة (وهو ما كان سيُفقد الـ Back Stack بأكمله).

#### نقطة مهمة ⚠️:
> كل `NavHost` تنشئه له `NavController` مخصص له، ويوفّر `NavController` الوصول إلى الـ Graph الخاص بذلك الـ Host تحديداً.

---

### 18. إنشاء NavGraph وأنواع الوجهات

#### النص الأصلي يقول (English):
> "The navigation graph is a data structure that contains each destination within your app and the connections between them. There are three types of destinations: hosted, dialog, and activity."

#### الشرح المبسّط:
الـ Navigation Graph هو الخريطة الكاملة لكل الوجهات وعلاقاتها. **ملاحظة مهمة**: الـ Graph **يختلف** عن الـ Back Stack — الأول هو "كل المسارات الممكنة"، والثاني هو "المسار الفعلي الذي زاره المستخدم".

#### جدول: أنواع الوجهات (Destination Types)

| النوع | الوصف | حالات الاستخدام |
| --- | --- | --- |
| Hosted | تملأ حجم الـ Navigation Host بالكامل؛ الوجهات السابقة تختفي تماماً | الشاشة الرئيسية وشاشة التفاصيل |
| Dialog | تُعرض كـ overlay فوق الوجهة الحالية؛ الوجهة السابقة تبقى ظاهرة تحتها | تنبيهات، اختيارات، نماذج (forms) |
| Activity | نقطة خروج تبدأ نشاطاً (Activity) جديداً مُدارًا بشكل منفصل عن Navigation Component | التفاعل مع نشاط طرف ثالث أو أثناء الترحيل التدريجي (migration) |

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا نادراً ما نستخدم نوع `Activity` كوجهة في تطبيقات Compose الحديثة؟
> **لماذا هذا مهم؟** لأن التطبيقات الحديثة غالباً تُبنى بمبدأ **single-activity app**، فيصبح استخدام Activity كوجهة ضرورياً فقط عند التعامل مع نشاط خارجي أو أثناء الانتقال التدريجي من نظام قديم.

---

### 19. بناء NavHost والـ NavGraph فعلياً

#### النص الأصلي يقول (English):
> "In Jetpack Compose, navigation is managed using the NavHost composable. The NavHost: Acts as a container for composable destinations. Connects to a NavController. Displays the current screen based on navigation state."

#### الشرح المبسّط:
يمكن إنشاء الـ Graph بطريقتين:

**الطريقة الأولى — تعريف الـ Graph مباشرة داخل NavHost:**

```kotlin
NavHost(
    navController = navController,
    startDestination = "home"
) {
    composable("home") { HomeScreen() }
    composable("details") { DetailsScreen() }
}
```

**الطريقة الثانية — إنشاء الـ Graph برمجياً باستخدام createGraph():**

```kotlin
val graph = navController.createGraph(startDestination = "home") {
    composable("home") { HomeScreen() }
    composable("details") { DetailsScreen() }
}

NavHost(
    navController = navController,
    graph = graph
)
```

#### 🔄 قبل / بعد: من Graph inline إلى Graph منفصل

**قبل:**
```kotlin
NavHost(navController, startDestination = "home") {
    composable("home") { HomeScreen() }
}
```

**بعد:**
```kotlin
val graph = navController.createGraph(startDestination = "home") {
    composable("home") { HomeScreen() }
}
NavHost(navController = navController, graph = graph)
```

**ماذا تغيّر؟** فُصل تعريف الـ Graph عن استدعاء `NavHost`، مما يسمح بإعادة استخدامه أو بناءه برمجياً بمرونة أكبر.

---

### 20. التنقّل إلى composable باستخدام navigate()

#### النص الأصلي يقول (English):
> "The primary API for navigation in the Navigation component is NavController.navigate(route: String)... When navigate() is invoked on the NavController, it modifies the navigation back stack. This change is observed by the NavHost, which recomposes and renders the Composable associated with the current destination."

#### الشرح المبسّط:
الدالة `navController.navigate(route)` هي الأداة الأساسية للتنقّل، وتقوم بثلاث أشياء:
1. تنتقل بين الوجهات composables
2. تُحدّث الـ Back Stack الذي يديره NavController
3. تُطلق تحديث الواجهة **بشكل غير مباشر** عبر مراقبة الحالة (state observation) — وليس بشكل مباشر أو يدوي

**لماذا "بشكل غير مباشر"؟**
لأن استدعاء `navigate()` لا "يرسم" الشاشة الجديدة بنفسه، بل فقط **يُعدّل حالة الـ Back Stack**. الـ `NavHost` يراقب هذه الحالة، وعندما يتغيّر، يُعاد تركيبه (recompose) ليعرض composable المرتبط بالوجهة الحالية الجديدة. هذا امتداد طبيعي لمبدأ "الحالة تحدّد الواجهة" الذي تعلّمناه في بداية المحاضرة.

#### 💻 الكود: تنقّل أساسي بين شاشتين

#### ما هذا الكود؟
> مثال كامل لتطبيق بشاشتين (Home و Details) مع التنقل بينهما ذهاباً وإياباً.

```kotlin
@Composable
fun MyAppNavHost(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(
                onNavigateToDetails = {
                    navController.navigate("details") // push "details" onto back stack
                }
            )
        }
        composable("details") {
            DetailsScreen(
                onNavigateBack = {
                    navController.popBackStack() // pop current destination off
                }
            )
        }
    }
}

@Composable
fun HomeScreen(onNavigateToDetails: () -> Unit) {
    Button(onClick = onNavigateToDetails) {
        Text("Go to Details")
    }
}

@Composable
fun DetailsScreen(onNavigateBack: () -> Unit) {
    Button(onClick = onNavigateBack) {
        Text("Back")
    }
}
```

#### شرح كل سطر:
1. `startDestination = "home"` → أول وجهة تُعرض عند تشغيل الـ NavHost
2. `composable("home") { HomeScreen(onNavigateToDetails = { navController.navigate("details") }) }` → عند الضغط على الزر، ينتقل المستخدم إلى وجهة "details"
3. `composable("details") { DetailsScreen(onNavigateBack = { navController.popBackStack() }) }` → عند الضغط على "رجوع"، يُزال آخر عنصر من الـ Back Stack ويعود المستخدم للوجهة السابقة
4. `HomeScreen(onNavigateToDetails: () -> Unit)` → composable لا يستقبل `NavController` مباشرة، بل حدثاً (lambda) فقط — هذا تطبيق لمبدأ UDF

**المكتبات المطلوبة (Imports):**
> `import androidx.navigation.compose.NavHost`
> `import androidx.navigation.compose.composable`
> `import androidx.navigation.compose.rememberNavController`

**الناتج المتوقع (لقطة الشاشة):**
> شاشة "Home" فيها زر "Go to Details" ينقل لشاشة "Details" فيها زر "Back" يعيد المستخدم إلى "Home".

#### مهم للامتحان ⚠️:
> **لا تُمرّر NavController مباشرة** إلى composable يحتاج التنقّل. بدلاً من ذلك، اجعله يستقبل **دالة حدث (lambda)** يُستدعى منها `navigate()` في الأعلى — هذا امتداد مباشر لمبدأ **Unidirectional Data Flow** الذي رأيناه سابقاً مع State Hoisting.

---

### 21. التنقّل مع تمرير بيانات (Arguments)

#### النص الأصلي يقول (English):
> "Some destinations require data in order to display the correct UI... In Jetpack Compose Navigation, data is commonly passed through the route... {itemId} is a placeholder for a dynamic value."

#### الشرح المبسّط:
بعض الشاشات تحتاج بيانات لعرض المحتوى الصحيح (مثلاً: شاشة تفاصيل عنصر معيّن). في Compose Navigation، تُمرَّر البيانات **عبر الـ Route نفسه** كجزء من النص:

```kotlin
navController.navigate("details/5")
```

- `"details"` → اسم الوجهة
- `5` → القيمة الفعلية الممرَّرة

ولتعريف الوجهة بحيث تقبل هذه القيمة، نستخدم **placeholder** بصيغة `{itemId}`:

```kotlin
composable("details/{itemId}") { backStackEntry ->
    val itemId = backStackEntry.arguments?.getString("itemId")
    DetailsScreen(itemId)
}
```

**لماذا `backStackEntry`؟**
لأن القيمة المُمرَّرة تُخزَّن داخل `NavBackStackEntry` الخاص بالوجهة، ونقرأها من هناك عبر `arguments?.getString("itemId")`.

#### قواعد أساسية:
- يجب أن يتطابق **اسم البارامتر** في كل من تعريف الـ Route (`{itemId}`) وفي القراءة (`getString("itemId")`) تماماً
- يُفضَّل تمرير **فقط** البيانات التي تحتاجها الوجهة الهدف بالضبط (وليس كائنات كاملة معقدة)

#### 💻 الكود: تنقّل كامل مع تمرير itemId

#### ما هذا الكود؟
> مثال كامل يمرّر قيمة `itemId = 5` من HomeScreen إلى DetailsScreen عبر الـ route.

```kotlin
@Composable
fun MyAppNavHost(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(
                onNavigateToDetails = {
                    // Navigate and pass itemId = 5 through the route
                    navController.navigate("details/5")
                }
            )
        }
        composable("details/{itemId}") { backStackEntry ->
            // Read the argument back from the backStackEntry
            val itemId = backStackEntry.arguments?.getString("itemId")
            DetailsScreen(
                itemId = itemId,
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}

@Composable
fun HomeScreen(onNavigateToDetails: () -> Unit) {
    Button(onClick = onNavigateToDetails) { Text("Go to Details") }
}

@Composable
fun DetailsScreen(itemId: String?, onNavigateBack: () -> Unit) {
    Column {
        Text("Item ID: $itemId")
        Button(onClick = onNavigateBack) { Text("Back") }
    }
}
```

#### شرح كل سطر:
1. `navController.navigate("details/5")` → استبدال `{itemId}` فعلياً بالقيمة "5" عند التنقّل
2. `composable("details/{itemId}") { backStackEntry -> ... }` → تعريف الـ route بصيغة تحتوي placeholder
3. `val itemId = backStackEntry.arguments?.getString("itemId")` → استخراج القيمة الفعلية من الوجهة الحالية
4. `DetailsScreen(itemId = itemId, ...)` → تمرير القيمة كباراميتر عادي لِـ composable الشاشة، مع الحفاظ على مبدأ UDF عبر `onNavigateBack` كحدث

**الناتج المتوقع (لقطة الشاشة):**
> شاشة Details تعرض النص "Item ID: 5" لأن القيمة انتقلت بنجاح عبر الـ route.

---

### 22. Back Stack: البنية والسلوك الأساسي

#### النص الأصلي يقول (English):
> "The NavController holds a 'back stack' that contains the destinations the user has visited... The back stack is a 'last in, first out' data structure."

#### الشرح المبسّط:
الـ Back Stack هو بنية بيانات من نوع **LIFO (Last In, First Out)** — أي آخر عنصر يُضاف هو أول عنصر يُزال. NavController يديرها تلقائياً:

```algorithm
1 | فتح التطبيق لأول مرة | NavController | يُدفع startDestination إلى أعلى الـ Back Stack
2 | استدعاء navigate() | NavController | يُدفع (push) الوجهة الجديدة إلى أعلى الـ Back Stack
3 | الضغط على Back/Up | navigateUp() أو popBackStack() | يُزال (pop) العنصر العلوي من الـ Back Stack
```

#### 🔍 تتبع التنفيذ: تسلسل تنقّل بسيط

**المدخل:** المستخدم يفتح التطبيق ثم ينتقل: home → details → settings، ثم يضغط زر Back مرتين

| الخطوة | العملية | الحالة (الـ Back Stack) |
| --- | --- | --- |
| 1 | فتح التطبيق (startDestination = home) | [ home ] |
| 2 | navigate("details") | [ home, details ] |
| 3 | navigate("settings") | [ home, details, settings ] |
| 4 | الضغط على Back (popBackStack) | [ home, details ] |
| 5 | الضغط على Back مرة أخرى | [ home ] |

**النتيجة:** المستخدم يعود بالضبط بالترتيب العكسي لما زاره — من settings إلى details إلى home.

---

### 23. popBackStack بمعامل الـ route والـ inclusive

#### النص الأصلي يقول (English):
> "You can pop back to a specific screen by using: navController.popBackStack(route, inclusive)... false → the target destination remains on the stack. true → the target destination is also popped."

#### الشرح المبسّط:
`popBackStack()` بدون معاملات تُزيل فقط الوجهة الحالية. لكن يمكن استهداف وجهة محدّدة بالاسم عبر:

```kotlin
navController.popBackStack(route, inclusive)
```

- `route` → اسم الوجهة الهدف للعودة إليها
- `inclusive = false` → تبقى الوجهة الهدف نفسها في الـ Back Stack
- `inclusive = true` → تُزال الوجهة الهدف أيضاً

#### 🔍 تتبع التنفيذ: popBackStack مع inclusive

**المدخل:** الـ Back Stack الحالي: `[ home → details → settings → profile ]`

| الخطوة | العملية | الحالة (الـ Back Stack) |
| --- | --- | --- |
| 1 | البداية | [ home, details, settings, profile ] |
| 2 | popBackStack("details", false) | [ home, details ] |
| 3 (سيناريو بديل من نفس البداية) | popBackStack("details", true) | [ home ] |

**النتيجة:** مع `inclusive = false` تبقى "details" في القمة؛ مع `inclusive = true` تُزال "details" أيضاً فيبقى فقط "home".

#### الفهم الخاطئ ❌: "popBackStack(route, inclusive) تعني الانتقال إلى تلك الوجهة فقط."
#### الفهم الصحيح ✅: هي عملية **إزالة (pop)** لكل ما هو أعلى من الوجهة المحددة في الـ Back Stack، وليست عملية "تنقّل" (navigate) جديدة.

---

### 24. التعامل مع فشل popBackStack

#### النص الأصلي يقول (English):
> "When the popBackStack() returns false, a subsequent call to NavController.getCurrentDestination() returns null. This means... The app has popped the last destination off the back stack. The user sees only a blank screen."

#### الشرح المبسّط:
`popBackStack()` تُعيد قيمة `Boolean`:
- `true` → نجحت عملية الإزالة
- `false` → لا توجد وجهة للعودة إليها (إما لم يُزل شيء، أو أن الإزالة أفرغت الـ Back Stack بالكامل)

في حالة `false`، ستصبح الشاشة **فارغة تماماً** لأنه لا توجد وجهة حالية لعرضها. الحل هو التحقق من القيمة المُعادة، وإن كانت `false`، اتخاذ إجراء بديل مثل إنهاء الـ Activity:

```kotlin
if (!navController.popBackStack()) {
    // No destination left to go back to — close the activity instead
    finish()
}
```

#### مهم للامتحان ⚠️:
> تجاهل القيمة المُعادة من `popBackStack()` قد يؤدي إلى **شاشة فارغة كلياً** للمستخدم — تحقق دائماً من نتيجتها عندما يكون هناك احتمال لإفراغ الـ Back Stack بالكامل (مثل زر "رجوع" في أعلى مستوى بالتطبيق).

---

### 25. popUpTo لإزالة وجهات متعددة أثناء التنقّل

#### النص الأصلي يقول (English):
> "To remove destinations from the back stack when navigating from one destination to another, add a popUpTo() argument to the associated navigate() function call."

#### الشرح المبسّط:
`popUpTo()` يُستخدم **مع** `navigate()` (وليس بديلاً عن `popBackStack()`) لإزالة عدة وجهات من الـ Back Stack **أثناء** الانتقال إلى وجهة جديدة، في استدعاء واحد فقط:

```kotlin
navController.navigate("destination") { popUpTo("route") }
```

#### 🔍 تتبع التنفيذ: popUpTo مع/بدون inclusive

**المدخل:** الـ Back Stack الحالي: `[ login → home → details → settings ]`، وننفّذ `navigate("profile") { popUpTo("home") }`

| الخطوة | العملية | الحالة (الـ Back Stack) |
| --- | --- | --- |
| 1 | البداية | [ login, home, details, settings ] |
| 2 | إزالة كل ما فوق "home" (غير شامل) | [ login, home ] |
| 3 | دفع "profile" إلى القمة | [ login, home, profile ] |

**النتيجة (بدون inclusive):** `[ login → home → profile ]`

**النتيجة إذا استُخدم `popUpTo("home") { inclusive = true }`:** `[ login → profile ]` (لأن "home" نفسها أُزيلت أيضاً هذه المرة)

#### جدول مقارنة سريع

| الاستخدام | النتيجة على الـ Back Stack |
| --- | --- |
| `navigate("B") { popUpTo("A") }` | يُزال كل شيء فوق A (A نفسها تبقى)، ثم تُدفع B |
| `navigate("B") { popUpTo("A") { inclusive = true } }` | يُزال كل شيء فوق A وتُزال A نفسها أيضاً، ثم تُدفع B |
| `navigate("search") { launchSingleTop = true }` | لا يُنشئ نسخة مكررة من "search" إذا كنا بالفعل في "search" |

---

### 26. حفظ واستعادة الحالة عند popUpTo (saveState / restoreState)

#### النص الأصلي يقول (English):
> "When you use popUpTo to navigate to a destination, you can optionally save the back stack and the states of all destinations popped off the back stack... you can also specify restoreState = true in your navigation options to automatically restore the back stack and the state associated with the destination."

#### الشرح المبسّط:
هذا النمط مفيد جداً في تصميم **التبويبات السفلية (Bottom Navigation)** — حيث تريد أن يتذكّر كل تبويب حالته (مكان التمرير، البيانات المدخلة) عند العودة إليه لاحقاً، بدلاً من إعادة بنائه من الصفر.

- `saveState = true` عند `popUpTo` → يحفظ حالة الوجهات التي أُزيلت
- `restoreState = true` عند `navigate` → يستعيد تلك الحالة المحفوظة إن وُجدت عند العودة لنفس الوجهة

```kotlin
navController.navigate(
    route = route,
    navOptions = navOptions {
        popUpTo("route") { saveState = true }
        restoreState = true
    }
)
```

#### 💻 الكود: مثال متكامل لحفظ واستعادة الحالة

#### ما هذا الكود؟
> ينتقل من الوجهة "A" إلى "B" مع حفظ حالة "A" بالكامل (بما فيها استعادتها لاحقاً إن رجع المستخدم إليها).

```kotlin
@Composable
fun MyAppNavHost(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController(),
    startDestination: String = "A"
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = startDestination
    ) {
        composable("A") {
            DestinationA(
                onNavigateToB = {
                    // Pop A off (inclusive), saving its state,
                    // then restore B's previous state if it exists,
                    // then navigate to B.
                    navController.navigate(route = "B") {
                        popUpTo("A") {
                            inclusive = true
                            saveState = true
                        }
                        restoreState = true
                    }
                },
            )
        }
        composable("B") { DestinationB(/* ... */) }
    }
}

@Composable
fun DestinationA(onNavigateToB: () -> Unit) {
    Button(onClick = onNavigateToB) {
        Text("Go to B")
    }
}
```

#### شرح كل سطر:
1. `popUpTo("A") { inclusive = true; saveState = true }` → إزالة "A" من الـ Back Stack نهائياً، لكن مع حفظ حالتها كاملة (لا تُفقد)
2. `restoreState = true` → إذا كانت الوجهة الهدف ("B") قد زارها المستخدم سابقاً وحُفظت حالتها، يُعاد استرجاعها بدلاً من إعادة إنشائها من الصفر

**الناتج المتوقع (لقطة الشاشة):**
> عند التبديل بين تبويبين (A وB) بشكل متكرر، تظهر كل شاشة كما تركها المستخدم تماماً (نفس موضع التمرير، نفس البيانات المدخلة) دون إعادة بناء كاملة.

#### 💡 التشبيه:
> `saveState` + `restoreState` أشبه بـ **وضع الكمبيوتر في وضع السكون (Sleep) بدلاً من إغلاقه**: عند العودة إليه، تجد كل شيء كما تركته تماماً.
> **وجه الشبه:** الكمبيوتر النائم = الوجهة المحفوظة، الاستيقاظ = restoreState.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `State` | أي قيمة قابلة للتغيّر مع الوقت وتؤثّر في الواجهة | موضع تمرير، اسم مُدخَل، حالة اتصال |
| `Event` | إشارة تُطلق تغيير الحالة | ضغط زر، استجابة شبكة |
| `Recomposition` | إعادة تنفيذ composable عند تغيّر حالة يعتمد عليها | تغيّر `count` يعيد رسم `Text` |
| `remember` | حفظ كائن عبر الـ Recompositions فقط | لا ينجو من تدوير الشاشة |
| `rememberSaveable` | حفظ كائن عبر الـ Recompositions وتغييرات التهيئة | ينجو من تدوير الشاشة |
| `mutableStateOf` | ينشئ `MutableState<T>` قابل للملاحظة من Compose | يُستخدم دائماً مع `remember` |
| `Stateful Composable` | يخزّن حالته الداخلية بنفسه | أسهل استدعاءً، أصعب اختباراً |
| `Stateless Composable` | يستقبل الحالة والأحداث كباراميترات | أسهل اختباراً وإعادة استخدام |
| `State Hoisting` | نقل الحالة إلى الأعلى لجعل composable بلا حالة | `value` + `onValueChange` |
| `Composition` | بنية شجرية تصف واجهة التطبيق | تُنتَج من composables |
| `key()` | يمنح Compose معرّفاً حقيقياً للتمييز بين نسخ composable في loop | يمنع إعادة تشغيل side effects خطأً |
| `NavController` | المنسّق المركزي للتنقّل | `rememberNavController()` |
| `NavHost` | حاوية تعرض الوجهة الحالية | يراقب حالة الـ Back Stack |
| `NavGraph` | خريطة كل الوجهات وعلاقاتها | يختلف عن الـ Back Stack |
| `Route` | نص فريد يحدّد وجهة (وبياناتها) | `"details/{itemId}"` |
| `Back Stack` | بنية LIFO تحفظ الوجهات المُزارة | `popBackStack()`, `navigate()` |
| `popUpTo` | إزالة عدة وجهات أثناء استدعاء navigate واحد | يُستخدم مع `inclusive` |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `MutableState<T>` | واجهة تحمل قيمة قابلة للتعديل وللملاحظة | `value` هي الخاصية الوحيدة |
| `NavController.navigate(route)` | ينتقل لوجهة جديدة، يدفعها للـ Back Stack | يُطلق Recomposition في NavHost |
| `NavController.popBackStack()` | يزيل الوجهة الحالية، يعيد `Boolean` | تحقق من القيمة المُعادة دوماً |
| `NavController.navigateUp()` | مكافئ منطقي لزر Up في الواجهة | يُستخدم غالباً مع TopAppBar |
| `NavBackStackEntry` | يحمل بيانات الوجهة الحالية بما فيها الـ arguments | `.arguments?.getString(...)` |
| `createGraph()` | ينشئ NavGraph برمجياً بدل تعريفه inline | يُمرَّر إلى NavHost عبر `graph =` |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| remember | remember | rememberSaveable | الثاني ينجو من تغييرات التهيئة (تدوير الشاشة)، الأول لا |
| Composable | Stateful | Stateless | الأول يملك حالته داخلياً، الثاني يستقبلها من الخارج |
| Navigation | View System | Compose | الأول Imperative بإدارة يدوية للـ back stack، الثاني Declarative وتلقائي عبر الحالة |
| إزالة من Back Stack | `popBackStack()` | `popUpTo()` | الأول عملية مستقلة، الثاني يُستخدم كخيار ضمن `navigate()` |
| نوع الوجهة | Hosted | Dialog | الأول يملأ الشاشة بالكامل، الثاني overlay فوق الوجهة السابقة |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| الحالة | `State`, `MutableState`, `remember`, `rememberSaveable`, `mutableStateOf`, `Recomposition`, `Composition` |
| التصميم | `Stateful`, `Stateless`, `State Hoisting`, `Unidirectional Data Flow (UDF)` |
| التنقّل | `NavController`, `NavHost`, `NavGraph`, `NavDestination`, `Route`, `Back Stack` |
| عمليات التنقّل | `navigate()`, `popBackStack()`, `navigateUp()`, `popUpTo`, `inclusive`, `saveState`, `restoreState`, `launchSingleTop` |

### أبرز النقاط الذهبية
1. الحالة هي المصدر الوحيد للحقيقة؛ الواجهة مجرد انعكاس لها.
2. المتغيرات المحلية العادية لا تنجو من Recomposition — استخدم `remember`.
3. `remember` للحالة المؤقتة، `rememberSaveable` للحالة التي يجب أن تصمد أمام تدوير الشاشة.
4. State Hoisting يحوّل composable إلى Stateless عبر `value` + `onValueChange`.
5. Navigation في Compose = تغيّر حالة الـ Back Stack يُترجَم تلقائياً إلى Recomposition في NavHost.
6. لا تُمرّر NavController مباشرة إلى composable الأدنى — مرّر lambda حدث بدلاً منه.
7. تحقّق دوماً من نتيجة `popBackStack()` لتفادي الشاشة الفارغة.
8. استخدم `key()` عند تكرار composable من نفس موقع الاستدعاء لتفادي فقدان الهوية والـ Side Effects.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| استخدام `var count = 0` داخل composable وتوقّع بقاء القيمة | استخدم `remember { mutableStateOf(0) }` |
| نسيان استخدام `by` مع `getValue`/`setValue` فيظهر خطأ Compiler | أضف `import androidx.compose.runtime.getValue` و`setValue` |
| الاعتقاد بأن `remember` تنجو من تدوير الشاشة | استخدم `rememberSaveable` بدلاً منها لهذا الغرض |
| تمرير `NavController` كباراميتر مباشر إلى composable فرعي | مرّر حدث (lambda) بدلاً منه واستدعِ `navigate()` في الأعلى فقط |
| تجاهل نتيجة `popBackStack()` عند احتمال إفراغ الـ Back Stack بالكامل | تحقّق من القيمة المُعادة، وإن كانت false نفّذ إجراءً بديلاً مثل `finish()` |
| الخلط بين `NavGraph` و`Back Stack` | الأول خريطة كل الاحتمالات، الثاني السجل الفعلي لما زاره المستخدم |
| عدم استخدام `key()` عند استدعاء composable داخل loop مع side effects | أضف `key(item.id) { ... }` لضمان هوية صحيحة لكل عنصر |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء نظام State Hoisting كامل
> ما هدفه؟ تحويل composable من Stateful إلى Stateless مع الحفاظ على نفس السلوك البصري.

```algorithm
1 | تحديد الحالة الداخلية | composable الحالي | العثور على كل استخدامات remember/mutableStateOf
2 | استبدال الحالة ببارامترين | composable | إضافة value: T و onValueChange: (T) -> Unit
3 | نقل remember للأعلى | composable الأب (caller) | الأب الآن يملك var state by remember { mutableStateOf(default) }
4 | تمرير الحالة والحدث | composable الأب | استدعاء composable الابن مع value = state, onValueChange = { state = it }
```

#### نقاط التنفيذ:
- تحقق من قواعد الرفع الثلاث (lowest common parent للقراءة، أعلى مستوى للكتابة، الرفع المشترك للحالات المترابطة).
- لا تنسَ استبدال `remember` بـ `rememberSaveable` في الأب إذا احتجت البقاء بعد تدوير الشاشة.

#### ⚙️ الخطوات / الخوارزمية: إعداد Navigation Compose من الصفر
> ما هدفه؟ بناء نظام تنقّل كامل بين عدة شاشات composable.

```algorithm
1 | إضافة الاعتمادية | build.gradle | إضافة androidx.navigation:navigation-compose
2 | إنشاء NavController | composable الجذر | val navController = rememberNavController()
3 | تعريف NavHost وnavGraph | composable الجذر | تحديد startDestination وربط كل route بـ composable
4 | تنفيذ التنقّل | composables الأبناء | استدعاء navController.navigate(route) عبر حدث (lambda)
5 | إدارة الرجوع | composables الأبناء | navController.popBackStack() أو navigateUp()
```

#### نقاط التنفيذ:
- لا تُمرّر `NavController` كباراميتر مباشر لأي composable فرعي — استخدم أحداثاً (lambdas) فقط.
- تحقّق دوماً من نتيجة `popBackStack()` عند احتمال إفراغ الـ Back Stack.

#### ⚙️ الخطوات / الخوارزمية: التنقّل مع تمرير بيانات واستعادة الحالة
> ما هدفه؟ الانتقال بين وجهتين مع تمرير argument والحفاظ على حالة كل منهما.

```algorithm
1 | تعريف route مع placeholder | NavGraph | composable("details/{itemId}")
2 | التنقّل مع القيمة الفعلية | composable المصدر | navController.navigate("details/5")
3 | قراءة القيمة في الوجهة | composable الهدف | backStackEntry.arguments?.getString("itemId")
4 | حفظ حالة الوجهة عند المغادرة (اختياري) | navigate options | popUpTo(route) { saveState = true }
5 | استعادة الحالة عند العودة (اختياري) | navigate options | restoreState = true
```

#### نقاط التنفيذ:
- اسم البارامتر في الـ route وفي القراءة يجب أن يتطابق تماماً.
- استخدام `saveState`/`restoreState` مفيد بالأخص في التبويبات السفلية (Bottom Navigation).

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| حالة بسيطة بـ delegate | `var x by remember { mutableStateOf(default) }` | حالة UI داخلية بسيطة |
| حالة تنجو من الدوران | `var x by rememberSaveable { mutableStateOf(default) }` | حالة مرئية للمستخدم (نص مُدخل) |
| Stateless composable | `fun X(value: T, onValueChange: (T) -> Unit)` | مكوّن قابل لإعادة الاستخدام والاختبار |
| Stateful wrapper | composable أعلى يملك `remember` ويستدعي النسخة Stateless | توفير راحة الاستخدام مع الحفاظ على القابلية لإعادة الاستخدام |
| تكرار composable مع هوية آمنة | `key(item.id) { ItemComposable(item) }` | داخل loop عند وجود side effects أو حالة داخلية |
| تنقّل بسيط | `navController.navigate("route")` | الانتقال إلى شاشة ثابتة بلا بيانات |
| تنقّل مع بيانات | `navController.navigate("route/$value")` + `composable("route/{param}")` | تمرير معرّف أو قيمة بسيطة لشاشة تفاصيل |
| تنظيف الـ Back Stack أثناء التنقّل | `navigate("X") { popUpTo("Y") { inclusive = true } }` | منع الرجوع إلى شاشات سابقة (مثل بعد تسجيل الدخول) |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| composable يحتاج التحكم بحالته من الخارج | طبّق State Hoisting فوراً | يضمن مصدراً واحداً للحقيقة وقابلية اختبار |
| composable فرعي يحتاج التنقّل | مرّر حدث (lambda) وليس NavController | يحافظ على مبدأ UDF ويُسهّل الاختبار |
| زر "رجوع" في أعلى شاشة بالتطبيق | تحقق من نتيجة popBackStack() قبل الاعتماد عليها | تفادي شاشة فارغة عند إفراغ الـ Back Stack |
| بعد تسجيل الدخول، منع الرجوع لشاشة تسجيل الدخول | استخدم `popUpTo("login") { inclusive = true }` عند الانتقال للشاشة الرئيسية | يمنع "login" من البقاء في الـ Back Stack |
| قائمة عناصر قد تتغيّر ترتيبها ديناميكياً | لفّ كل عنصر بـ `key(item.id)` | يحافظ على هوية العناصر ويمنع فقدان الحالة الداخلية أو Side Effects |

### الأفكار الرئيسية الشاملة
تجمع هذه المحاضرة بين مفهومين متكاملين: إدارة الحالة (State) وإدارة التنقّل (Navigation)، وكلاهما مبني على **نفس الفلسفة الأساسية لـ Compose**: الواجهة هي دالة تصريحية للحالة (`UI = f(State)`)، والتغيير الوحيد الممكن هو عبر تحديث الحالة وترك Compose يعيد التركيب تلقائياً. حتى الـ Navigation، رغم أنه يبدو موضوعاً منفصلاً، هو في جوهره تطبيق لنفس المبدأ: تغيّر حالة الـ Back Stack يُترجَم إلى Recomposition في NavHost.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. توزيع: مقارنات 25% | سيناريو كود 35% | تطبيق 40%.

### السؤال 1 (medium)
What is the main reason a local variable like `var count = 0` inside a composable does NOT retain its value across recompositions?
أ) Kotlin doesn't support local variables inside functions
ب) The composable function is re-executed on recomposition and local variables are reinitialized
ج) Compose deletes all variables automatically after 1 second
د) `var` is not allowed inside `@Composable` functions
**الإجابة الصحيحة: ب**
**التعليل:** لأن composable هي دالة عادية تُعاد استدعاؤها كاملة عند الـ Recomposition، فتُعاد تهيئة أي متغيّر محلي بداخلها من جديد. الخيار أ خاطئ لأن Kotlin يدعم المتغيرات المحلية بشكل طبيعي. الخيار ج غير منطقي ولا علاقة له بآلية عمل Compose. الخيار د خاطئ لأن `var` مسموح تماماً داخل composable، لكنه لا يحمي القيمة من إعادة التهيئة.

---

### السؤال 2 (medium)
Which combination correctly creates a piece of state that survives recomposition but NOT configuration changes like screen rotation?
أ) `rememberSaveable { mutableStateOf(0) }`
ب) `remember { mutableStateOf(0) }`
ج) `var x = 0`
د) `mutableStateOf(0)` alone without `remember`
**الإجابة الصحيحة: ب**
**التعليل:** `remember` وحدها تحمي القيمة فقط من الـ Recomposition، لكنها تُفقد عند تغييرات التهيئة (مثل تدوير الشاشة). الخيار أ خاطئ لأنه ينجو حتى من تدوير الشاشة. الخيار ج خاطئ لأنه لا ينجو حتى من الـ Recomposition. الخيار د خاطئ لأن عدم استخدام `remember` يعني إعادة إنشاء الكائن بقيمة البداية في كل مرة.

---

### السؤال 3 (hard)
In the `LoginScreen` example where `LoginError()` is called conditionally and `LoginInput()` is always called, why does `LoginInput`'s Composition identity remain preserved even though its position in the visual order changes?
أ) Because Compose stores composables by alphabetical order
ب) Because identity is determined by the call site, not by visual order
ج) Because `LoginInput` has no parameters at all
د) Because Compose re-creates the entire tree every time
**الإجابة الصحيحة: ب**
**التعليل:** الهوية تُحدَّد بموقع الاستدعاء (call site) في الكود المصدري، وليس بالترتيب البصري الظاهر على الشاشة. الخيار أ غير صحيح إطلاقاً ولا أساس له. الخيار ج غير دقيق: وجود بارامترات أو عدمها لا علاقة له بالهوية، بل بما إذا كان سيُتخطّى (skip) أم لا. الخيار د خاطئ لأن Compose تحديداً يتجنّب إعادة إنشاء الشجرة بأكملها، ويعيد فقط ما تغيّر.

---

### السؤال 4 (medium)
What problem does wrapping a composable inside a loop with `key(item.id) { ... }` solve?
أ) It makes the loop run faster in terms of CPU cycles
ب) It gives Compose a real unique identity per item instead of relying only on execution order
ج) It removes the need for a `LazyColumn`
د) It automatically sorts the list by `id`
**الإجابة الصحيحة: ب**
**التعليل:** `key()` يمنح Compose معرّفاً حقيقياً وفريداً لكل عنصر، بدلاً من الاعتماد فقط على ترتيب التنفيذ، مما يمنع فقدان الهوية عند إضافة/حذف/إعادة ترتيب عناصر القائمة. الخيار أ غير صحيح: الهدف ليس تحسين الأداء الحسابي بل صحة الهوية. الخيار ج غير صحيح: لا علاقة مباشرة بـ `LazyColumn`. الخيار د غير صحيح: `key()` لا يقوم بأي فرز.

---

### السؤال 5 (hard)
A composable `HelloContent(name: String, onNameChange: (String) -> Unit)` is described as "stateless." What does this mean precisely?
أ) It never displays any text on screen
ب) It holds no internal `remember`-based state; it receives state and events via parameters
ج) It cannot be reused anywhere else
د) It automatically saves state across configuration changes
**الإجابة الصحيحة: ب**
**التعليل:** كونه Stateless يعني تحديداً أنه لا يخزّن أي حالة داخلية عبر `remember`؛ بل يستقبل القيمة والحدث كباراميترات من الخارج. الخيار أ غير صحيح: بالطبع يعرض نصاً، لكنه لا يملك حالة داخلية. الخيار ج معكوس تماماً — كونه Stateless يجعله **أسهل** لإعادة الاستخدام. الخيار د لا علاقة له بمفهوم Stateless إطلاقاً.

---

### السؤال 6 (medium)
Which of the following best illustrates the "Unidirectional Data Flow" pattern discussed with State Hoisting?
أ) State flows down as parameters, events flow up via lambdas
ب) State and events both flow only downward
ج) State flows up, events flow down
د) There is no direction; everything happens simultaneously
**الإجابة الصحيحة: أ**
**التعليل:** هذا بالضبط تعريف UDF: الحالة (State) تنزل كباراميترات إلى composables الأدنى، بينما الأحداث (Events) تصعد عبر lambdas إلى composables الأعلى التي تملك الحالة الفعلية. الخيارات الأخرى تعكس أو تشوّه هذا المبدأ.

---

### السؤال 7 (medium)
According to the three state hoisting rules, if two pieces of state change in response to the exact same event, what should you do?
أ) Keep them in two completely separate composables with no relationship
ب) Hoist them together to the same level
ج) Always hoist one of them lower than the other
د) Delete one of them since they are redundant
**الإجابة الصحيحة: ب**
**التعليل:** القاعدة الثالثة لرفع الحالة تنص صراحة على أن حالتين تتغيّران استجابة لنفس الحدث يجب رفعهما معاً لضمان التناسق. الخيارات الأخرى تخالف هذه القاعدة أو تفترض افتراضات غير صحيحة.

---

### السؤال 8 (hard)
`navController.popBackStack("details", true)` is called on a back stack `[home, details, settings, profile]`. What is the resulting back stack?
أ) `[home]`
ب) `[home, details]`
ج) `[home, details, settings]`
د) `[]` (empty)
**الإجابة الصحيحة: أ**
**التعليل:** `inclusive = true` يعني أن الوجهة الهدف ("details") تُزال أيضاً بالإضافة إلى كل ما فوقها، فتصبح النتيجة `[home]` فقط. الخيار ب يمثّل نتيجة `inclusive = false` وليس `true`. الخيارات ج ود لا تتطابق مع سلوك popBackStack الموصوف في المحاضرة.

---

### السؤال 9 (medium)
What happens if `navController.popBackStack()` returns `false`?
أ) The app crashes immediately
ب) Nothing was popped, or the back stack is now empty and there's no current destination
ج) The NavController automatically restarts the app
د) It means the navigation graph is invalid
**الإجابة الصحيحة: ب**
**التعليل:** حسب النص الأصلي، إعادة `false` تعني إما أن العملية لم تُزل شيئاً، أو أنها أفرغت الـ Back Stack بالكامل، وفي هذه الحالة `getCurrentDestination()` تعيد null، وتظهر شاشة فارغة إن لم يُعالَج الأمر. باقي الخيارات غير صحيحة ولا تستند إلى سلوك حقيقي موصوف في المحاضرة.

---

### السؤال 10 (medium)
Why does the lecture recommend NOT passing a `NavController` reference directly into a lower-level composable that needs to trigger navigation?
أ) Because `NavController` cannot be serialized
ب) To follow Unidirectional Data Flow principles by exposing an event instead
ج) Because `NavController` only works inside `MainActivity`
د) Because Jetpack Compose forbids passing objects as parameters
**الإجابة الصحيحة: ب**
**التعليل:** النص صراحة يقول إن الأفضل هو أن يعرّض composable حدثاً (event) يُعالجه الـ NavController في الأعلى، بدلاً من تمرير مرجع NavController مباشرة، اتساقاً مع مبادئ UDF. باقي الخيارات غير مذكورة أو غير صحيحة تقنياً.

---

### السؤال 11 (hard)
In `navController.navigate("details/{itemId}")` style routes, which statement is TRUE about matching the parameter name?
أ) The parameter name in the route placeholder and in `arguments?.getString(...)` must match exactly
ب) The parameter name can be anything different in each place; Compose auto-matches by position
ج) Only numeric parameter names are supported
د) Parameter names must always be capitalized
**الإجابة الصحيحة: أ**
**التعليل:** المحاضرة تنص صراحة على أن اسم البارامتر يجب أن يتطابق في كلا الموضعين. الخيار ب غير صحيح لأن المطابقة تتم بالاسم وليس بالموضع. الخيار ج وbد غير مذكورين وغير صحيحين إطلاقاً.

---

### السؤال 12 (medium)
What is the key structural difference between a `NavGraph` and the `Back Stack`?
أ) They are the same thing with two different names
ب) `NavGraph` defines all possible destinations and connections; Back Stack holds only the destinations actually visited
ج) `Back Stack` defines all possible destinations; `NavGraph` holds what was visited
د) `NavGraph` only exists for Dialog destinations
**الإجابة الصحيحة: ب**
**التعليل:** هذا الفرق مذكور صراحة في المحاضرة: NavGraph = كل الاحتمالات الممكنة، Back Stack = السجل الفعلي لما زاره المستخدم. الخيار ج معكوس تماماً. باقي الخيارات غير صحيحة.

---

### السؤال 13 (hard)
Given back stack `[login, home, details, settings]`, what does `navigate("profile") { popUpTo("home") }` (WITHOUT inclusive) produce?
أ) `[login, home, profile]`
ب) `[login, profile]`
ج) `[login, home, details, settings, profile]`
د) `[home, profile]`
**الإجابة الصحيحة: أ**
**التعليل:** بدون `inclusive = true`، تُزال فقط الوجهات فوق "home" (details, settings)، بينما تبقى "home" نفسها، ثم تُدفع "profile" فوقها، فتصبح النتيجة `[login, home, profile]`. الخيار ب يفترض إزالة "home" أيضاً (وهذا فقط يحدث مع inclusive=true). الخيار ج لا يزيل أي شيء، والخيار د يزيل "login" خطأً.

---

### السؤال 14 (hard)
What is the purpose of combining `saveState = true` (in `popUpTo`) with `restoreState = true` (in `navigate`)?
أ) To permanently delete the state of the destination being left
ب) To preserve and later restore a destination's state (like scroll position) when navigating back to it, common in bottom navigation
ج) To disable recomposition entirely for that destination
د) To force the destination to always restart from scratch
**الإجابة الصحيحة: ب**
**التعليل:** هذا النمط بالضبط مصمّم لحفظ حالة الوجهات (خاصة في التبويبات السفلية) واستعادتها عند العودة إليها بدل إعادة بنائها من الصفر. باقي الخيارات تناقض الوصف الأصلي في المحاضرة مباشرة.

---

### السؤال 15 (medium)
Which of the following is an example of a `Dialog` type destination as described in the lecture?
أ) A full-screen product details page replacing the previous screen entirely
ب) An alert or selection overlay shown on top of the current screen, which remains visible underneath
ج) A destination that launches a separate Android Activity
د) The app's start destination always
**الإجابة الصحيحة: ب**
**التعليل:** الوجهة من نوع Dialog تُعرض كـ overlay فوق الوجهة الحالية التي تبقى ظاهرة تحتها — تماماً كالتنبيهات والاختيارات. الخيار أ يصف نوع Hosted. الخيار ج يصف نوع Activity. الخيار د غير مرتبط بنوع الوجهة إطلاقاً.

---

### السؤال 16 (medium)
Why is `launchSingleTop = true` useful when navigating to a route like `"search"`?
أ) It prevents creating a duplicate copy of "search" on top of the back stack if already there
ب) It permanently deletes the search history
ج) It forces a full app restart
د) It disables the search screen's UI
**الإجابة الصحيحة: أ**
**التعليل:** كما ورد صراحة في المحاضرة، هذا الخيار يمنع تكديس نسخ متعددة من نفس الوجهة في أعلى الـ Back Stack إذا كنا موجودين فيها بالفعل. باقي الخيارات غير مذكورة وغير صحيحة تقنياً.

---

## الجزء الرابع: أسئلة تصحيح الكود

> Cover error types: compilation, logic, return_check, dead code, misconception.

### Debug Question 1 (misconception)

**The following code contains a bug:**
```kotlin
@Composable
fun Counter() {
    var count = 0
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```
**Find the bug:** The counter never visually increases when the button is clicked, even though `count++` executes.

**Fixed code:**
```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```
**شرح الحل:**
1. المتغيّر المحلي `var count = 0` يُعاد تصفيره إلى 0 في كل Recomposition لأن Compose ينفّذ الدالة من جديد.
2. الحل هو استخدام `remember { mutableStateOf(0) }` بحيث تبقى القيمة محفوظة عبر الاستدعاءات المتكررة، وأي تغيير فيها يُطلق Recomposition تلقائياً.

---

### Debug Question 2 (logic)

**The following code contains a bug:**
```kotlin
@Composable
fun HelloContent() {
    Column {
        var name by remember { mutableStateOf("") }
        Text(text = "Hello, $name!")
        OutlinedTextField(value = name, onValueChange = { })
    }
}
```
**Find the bug:** Typing in the `OutlinedTextField` does nothing, and the greeting never updates.

**Fixed code:**
```kotlin
@Composable
fun HelloContent() {
    Column {
        var name by remember { mutableStateOf("") }
        Text(text = "Hello, $name!")
        OutlinedTextField(value = name, onValueChange = { name = it })
    }
}
```
**شرح الحل:**
1. `onValueChange = { }` هي دالة فارغة لا تفعل شيئاً بالقيمة الجديدة المُدخلة.
2. الإصلاح: تحديث حالة `name` فعلياً داخل `onValueChange` عبر `{ name = it }`، بحيث يُقرأ التغيير ويُطلق Recomposition الذي يُحدّث كل من `Text` و`OutlinedTextField`.

---

### Debug Question 3 (syntax)

**The following code contains a bug:**
```kotlin
@Composable
fun NameInput() {
    var name by remember { mutableStateOf("") }
    OutlinedTextField(value = name, onValueChange = { name = it })
}
```
When compiling, the project fails with an error related to the `by` keyword usage with `mutableStateOf`.

**Find the bug:** Missing required imports for the `by` delegate syntax with `MutableState`.

**Fixed code:**
```kotlin
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember

@Composable
fun NameInput() {
    var name by remember { mutableStateOf("") }
    OutlinedTextField(value = name, onValueChange = { name = it })
}
```
**شرح الحل:**
1. استخدام صيغة `by` مع `MutableState` يتطلب استيراد كل من `getValue` و`setValue` لأنهما اللذان يُفعّلان آلية الـ delegation في Kotlin.
2. بدون هذين الاستيرادين، سيفشل الـ Compiler عند محاولة قراءة/كتابة `name` مباشرة كمتغيّر عادي.

---

### Debug Question 4 (return_check)

**The following code contains a bug:**
```kotlin
fun onBackPressedHandler(navController: NavController) {
    navController.popBackStack()
    // Assumes navigation always succeeded
    println("Navigated back successfully")
}
```
**Find the bug:** The code assumes `popBackStack()` always succeeds and never checks its boolean return value, risking a blank screen if the back stack becomes empty.

**Fixed code:**
```kotlin
fun onBackPressedHandler(navController: NavController) {
    val success = navController.popBackStack()
    if (!success) {
        // No destination left — handle gracefully, e.g., finish the activity
        println("Back stack empty — no destination to return to")
    } else {
        println("Navigated back successfully")
    }
}
```
**شرح الحل:**
1. `popBackStack()` تُعيد قيمة `Boolean` يجب فحصها دوماً.
2. إذا كانت `false`، فهذا يعني أن الـ Back Stack إما لم يتغيّر أو أصبح فارغاً، ويجب معالجة هذه الحالة بدلاً من افتراض النجاح دائماً — وإلا قد تظهر شاشة فارغة للمستخدم.

---

### Debug Question 5 (dead_code)

**The following code contains a bug:**
```kotlin
@Composable
fun MoviesScreen(movies: List<Movie>) {
    Column {
        for (movie in movies) {
            MovieOverview(movie)
        }
        // This key wrapper below never actually executes meaningfully
        if (false) {
            key(movie.id) {
                MovieOverview(movie)
            }
        }
    }
}
```
**Find the bug:** There is unreachable ("dead") code inside `if (false)` that was probably meant to replace the loop above using `key()`, but instead exists as disconnected dead code, and `movie` is not even in scope there.

**Fixed code:**
```kotlin
@Composable
fun MoviesScreen(movies: List<Movie>) {
    Column {
        for (movie in movies) {
            key(movie.id) {
                MovieOverview(movie)
            }
        }
    }
}
```
**شرح الحل:**
1. الكتلة الميتة `if (false) { ... }` لن تُنفَّذ أبداً، وبالإضافة إلى ذلك فإن `movie` غير معرّفة أصلاً في ذلك النطاق (خطأ تجميع إضافي).
2. الحل الصحيح: دمج استخدام `key(movie.id)` مباشرة داخل حلقة `for` الأصلية لضمان الحفاظ على هوية كل عنصر بشكل صحيح دون أي كود ميت.

---

### Debug Question 6 (misconception)

**The following code contains a bug:**
```kotlin
@Composable
fun AppNav() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(navController = navController) // passing NavController directly
        }
        composable("details") { DetailsScreen() }
    }
}

@Composable
fun HomeScreen(navController: NavController) {
    Button(onClick = { navController.navigate("details") }) {
        Text("Go to Details")
    }
}
```
**Find the bug:** `HomeScreen` receives the full `NavController` directly, violating Unidirectional Data Flow and making it harder to test or reuse.

**Fixed code:**
```kotlin
@Composable
fun AppNav() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(onNavigateToDetails = { navController.navigate("details") })
        }
        composable("details") { DetailsScreen() }
    }
}

@Composable
fun HomeScreen(onNavigateToDetails: () -> Unit) {
    Button(onClick = onNavigateToDetails) {
        Text("Go to Details")
    }
}
```
**شرح الحل:**
1. تمرير `NavController` بالكامل إلى composable فرعي يخالف مبدأ UDF ويجعل الاختبار صعباً (لأن composable يعتمد على كائن نظام كامل بدلاً من حدث بسيط).
2. الحل: تحويل `HomeScreen` لتستقبل حدثاً بسيطاً `onNavigateToDetails: () -> Unit`، ويبقى استدعاء `navController.navigate()` الفعلي في المستوى الأعلى فقط (داخل NavHost).

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Convert a Stateful Composable to Stateless — fill_gaps

**Scenario / Task:**
You have a stateful `Checkbox` composable that manages its own checked state internally. Convert it into a stateless version using State Hoisting.

**Requirements:**
1. Remove the internal `remember` block.
2. Add two parameters: `checked: Boolean` and `onCheckedChange: (Boolean) -> Unit`.
3. Show how a parent composable would hoist and provide this state.

**نموذج الحل:**
```kotlin
// Stateless version
@Composable
fun MyCheckbox(checked: Boolean, onCheckedChange: (Boolean) -> Unit) {
    Checkbox(checked = checked, onCheckedChange = onCheckedChange)
}

// Parent hoists the state
@Composable
fun CheckboxScreen() {
    var isChecked by rememberSaveable { mutableStateOf(false) }
    MyCheckbox(checked = isChecked, onCheckedChange = { isChecked = it })
}
```
تم نقل `remember` بالكامل إلى `CheckboxScreen`، بينما أصبحت `MyCheckbox` تستقبل القيمة والحدث فقط، وهذا يجعلها قابلة لإعادة الاستخدام في أي مكان آخر بأي مصدر بيانات.

---

### Exercise 2: Fix a Broken Back Stack Scenario — code_fix

**Scenario / Task:**
After a successful login, the user should NOT be able to press "Back" and return to the login screen. Fix the navigation call below which currently allows this.

```kotlin
navController.navigate("home")
```

**Requirements:**
1. Modify the call so the "login" destination is removed from the back stack.
2. Explain why `inclusive = true` is necessary here.

**نموذج الحل:**
```kotlin
navController.navigate("home") {
    popUpTo("login") { inclusive = true }
}
```
`inclusive = true` ضروري لأن الهدف هو إزالة "login" نفسها من الـ Back Stack، وليس فقط ما فوقها. بدونها، ستبقى "login" في الأسفل ويمكن للمستخدم الرجوع إليها بالضغط على Back.

---

### Exercise 3: Design a Route with Two Arguments — scenario

**Scenario / Task:**
Design a route that navigates to a product review screen requiring both a `productId` (Int-like string) and a `userId` (String).

**Requirements:**
1. Write the route definition string with two placeholders.
2. Write the `composable()` block extracting both arguments.
3. Write the `navigate()` call passing example values `"42"` and `"user123"`.

**نموذج الحل:**
```kotlin
// Route definition
composable("review/{productId}/{userId}") { backStackEntry ->
    val productId = backStackEntry.arguments?.getString("productId")
    val userId = backStackEntry.arguments?.getString("userId")
    ReviewScreen(productId = productId, userId = userId)
}

// Navigating with values
navController.navigate("review/42/user123")
```
كل placeholder يُستبدل بقيمته الفعلية بترتيبه في السلسلة النصية، ويُقرأ لاحقاً بنفس الاسم من `backStackEntry.arguments`.

---

### Exercise 4: Identify Underhoisted State — scenario

**Scenario / Task:**
Two sibling composables, `CartSummary` and `CartItemsList`, both need to read and modify the same shopping cart list, but currently each has its own separate `remember { mutableStateListOf() }`. Explain the bug and propose the fix conceptually (no full code needed, describe the hoisting target).

**Requirements:**
1. Explain why having two separate `remember` blocks is a bug.
2. State where the cart state should be hoisted to, using the hoisting rules from the lecture.

**نموذج الحل:**
المشكلة أن كل composable يملك نسخته الخاصة من قائمة السلة، فتصبح لدينا نسختان منفصلتان تماماً من "الحقيقة" — أي تعديل في إحداهما لن ينعكس على الأخرى، مما يخالف مبدأ **Single Source of Truth**. الحل: رفع الحالة إلى **أقرب أب مشترك** بين `CartSummary` و`CartItemsList` (وفق القاعدة الأولى لرفع الحالة)، ثم تمرير القائمة والحدث (`onCartChange`) إلى كليهما كباراميترات.

---

### Exercise 5: Predict Recomposition Skipping — scenario

**Scenario / Task:**
Given the `LoginScreen` example from the lecture, predict what happens to `LoginInput()`'s recomposition status if `showError` toggles from `false` to `true`, assuming `LoginInput()` takes no parameters at all.

**Requirements:**
1. State whether `LoginInput()` will be recomposed or skipped.
2. Justify your answer using the concept of call site identity.

**نموذج الحل:**
`LoginInput()` **سيُتخطّى (skipped)** أثناء عملية الـ Recomposition الناتجة عن تغيّر `showError`. السبب: موقع استدعاء `LoginInput()` لم يتغيّر إطلاقاً (لا يزال في نفس المكان بالكود المصدري)، وهي لا تملك أي بارامترات يمكن أن تتغيّر قيمتها، لذلك يتعرّف Compose أن لا حاجة لإعادة تنفيذها من جديد ويكتفي بالحفاظ على نتيجتها السابقة.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: Basic Navigate/Pop Sequence

**Input:**
```kotlin
// startDestination = "A"
navController.navigate("B")
navController.navigate("C")
navController.popBackStack()
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | البداية (startDestination = A) | ؟ |
| 2 | navigate("B") | ؟ |
| 3 | navigate("C") | ؟ |
| 4 | popBackStack() | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | البداية (startDestination = A) | [ A ] |
| 2 | navigate("B") | [ A, B ] |
| 3 | navigate("C") | [ A, B, C ] |
| 4 | popBackStack() | [ A, B ] |

**Result:** The final back stack is `[A, B]`, meaning the current visible destination is "B".

---

### Trace Exercise 2: popUpTo with inclusive=false

**Input:**
```kotlin
// Back stack starts as: [login, home, cart, checkout]
navController.navigate("confirmation") {
    popUpTo("home") 
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | البداية | ؟ |
| 2 | popUpTo("home") يزيل ما فوق home (غير شامل) | ؟ |
| 3 | دفع "confirmation" | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | البداية | [login, home, cart, checkout] |
| 2 | popUpTo("home") يزيل ما فوق home (غير شامل) | [login, home] |
| 3 | دفع "confirmation" | [login, home, confirmation] |

**Result:** Final back stack: `[login, home, confirmation]`.

---

### Trace Exercise 3: MutableState Recomposition Trigger

**Input:**
```kotlin
@Composable
fun Demo() {
    var name by remember { mutableStateOf("") }
    Text("Hello, $name")
    OutlinedTextField(value = name, onValueChange = { name = it })
    // User types: "A", then "Al", then "Ali"
}
```

**Trace step by step (complete the table):**
| الخطوة | حدث المستخدم | قيمة name بعد التحديث | هل حدثت Recomposition؟ |
| --- | --- | --- | --- |
| 1 | كتابة "A" | ؟ | ؟ |
| 2 | كتابة "l" | ؟ | ؟ |
| 3 | كتابة "i" | ؟ | ؟ |

**نموذج الحل:**
| الخطوة | حدث المستخدم | قيمة name بعد التحديث | هل حدثت Recomposition؟ |
| --- | --- | --- | --- |
| 1 | كتابة "A" | "A" | نعم — لأن onValueChange غيّرت name |
| 2 | كتابة "l" | "Al" | نعم — نفس السبب |
| 3 | كتابة "i" | "Ali" | نعم — نفس السبب |

**Result:** After all three keystrokes, the screen displays "Hello, Ali", with a recomposition triggered after each individual keystroke because `name` (a `MutableState`) changed each time.

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: uml_design — App Navigation Graph

**Task:**
Design a navigation graph (as a diagram) for a simple e-commerce app with these destinations: `home`, `productDetails/{productId}`, `cart`, and `checkout`. Show which destination each can navigate to, and mark `home` as the start destination.

**نموذج الإجابة:**
```diagram
type: flowchart
title: E-commerce Navigation Graph
direction: TD
nodes:
  - id: home
    label: home (start destination)
    kind: event
    level: 0
  - id: details
    label: productDetails/{productId}
    kind: event
    level: 1
  - id: cart
    label: cart
    kind: event
    level: 1
  - id: checkout
    label: checkout
    kind: event
    level: 2
edges:
  - from: home
    to: details
  - from: details
    to: cart
  - from: cart
    to: checkout
  - from: checkout
    to: home
```

**معايير التقييم:**
- تحديد `home` بوضوح كوجهة البداية
- إظهار أن `productDetails` يتطلب بارامتر `{productId}`
- إظهار مسار منطقي من home إلى details إلى cart إلى checkout
- (اختياري متقدم) توضيح أن العودة لـ home بعد checkout قد تستخدم `popUpTo` مع `inclusive = true` لمنع الرجوع لشاشات السلة السابقة

---

### Design Question 2: architecture — Stateful/Stateless Split

**Task:**
Design (describe architecturally, no need for full code) a reusable `SearchBar` composable following the Stateful/Stateless split principle discussed in the lecture. Identify: (a) what the Stateless version's parameters should be, (b) where the Stateful wrapper's `remember` should live, (c) how this design would make unit testing easier.

**نموذج الإجابة:**
- **(a) بارامترات النسخة Stateless:** `query: String` و `onQueryChange: (String) -> Unit`، بالإضافة لبارامتر اختياري مثل `onSearch: () -> Unit` لحدث تنفيذ البحث.
- **(b) مكان `remember`:** يعيش في composable الأب (Stateful wrapper) الذي يستدعي `SearchBar` مع تمرير `query` و`onQueryChange` — تماماً كما فعلت `HelloScreen` مع `HelloContent` في المحاضرة.
- **(c) تسهيل الاختبار:** بما أن النسخة Stateless لا تحتوي أي `remember` داخلي، يمكن اختبارها بتمرير قيم `query` مختلفة مباشرة والتحقق من الناتج المرئي، دون الحاجة لمحاكاة (mock) نظام الحالة الداخلي للـ Compose runtime.

**معايير التقييم:**
- تحديد صحيح لبارامترات القيمة والحدث
- فهم صحيح لمكان استقرار `remember` (الأب فقط)
- ربط واضح بين Stateless والقابلية للاختبار

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is "State" in the broadest sense used in this lecture?
A: Any value that can change over time and affects what is shown in the UI.

---

**Q2:** What triggers a state to change?
A: An event, generated either by the user (e.g., clicking a button) or by another part of the system (e.g., a network response).

---

**Q3:** Why doesn't a plain local variable like `var count = 0` work as UI state in Compose?
A: Because it is reinitialized every time the composable function re-executes during recomposition.

---

**Q4:** What does `remember` do?
A: It stores a value inside the Composition so it survives recompositions, and forgets it once the composable is removed from the Composition.

---

**Q5:** What is the key difference between `remember` and `rememberSaveable`?
A: `rememberSaveable` also survives configuration changes (like screen rotation) by saving the value in a Bundle, while `remember` does not.

---

**Q6:** What defines a "Stateful" composable?
A: A composable that manages its own internal state using `remember`.

---

**Q7:** What two parameters replace internal state when applying State Hoisting?
A: `value: T` (the current value) and `onValueChange: (T) -> Unit` (the event requesting a change).

---

**Q8:** What is "Unidirectional Data Flow"?
A: The pattern where state flows down to composables as parameters, and events flow up as lambdas to the composables that own the state.

---

**Q9:** What triggers a Recomposition most typically?
A: A change to a `State<T>` object that a composable reads.

---

**Q10:** How does Compose uniquely identify a composable instance in the Composition?
A: By its call site in the source code, combined with execution order when called multiple times from the same call site (e.g., inside a loop).

---

**Q11:** When should you use the `key()` composable?
A: When calling a composable multiple times from the same call site (typically in a loop) and you need Compose to correctly preserve identity and side effects per item.

---

**Q12:** What are the three core building blocks required to implement navigation in Compose?
A: A `NavController`, a `NavHost`, and a `NavGraph`.

---

**Q13:** How is a `NavController` created in Jetpack Compose?
A: By calling `rememberNavController()`.

---

**Q14:** What is the primary function used to move to a new destination?
A: `NavController.navigate(route: String)`.

---

**Q15:** How is data commonly passed to a destination in Compose Navigation?
A: Through the route string itself, using a placeholder like `{itemId}`, and reading it back from `NavBackStackEntry.arguments`.

---

**Q16:** What data structure does the NavController use to track visited destinations?
A: A back stack, which follows a "last in, first out" (LIFO) structure.

---

## الجزء الخامس: الكود النهائي الكامل (مرجع شامل)

```kotlin
// ============ STATE MANAGEMENT ============

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberSaveable
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// Stateless composable: receives state and event via parameters
@Composable
fun HelloContent(name: String, onNameChange: (String) -> Unit) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "Hello, $name",
            modifier = Modifier.padding(bottom = 8.dp),
            style = MaterialTheme.typography.bodyMedium
        )
        OutlinedTextField(value = name, onValueChange = onNameChange, label = { Text("Name") })
    }
}

// Stateful wrapper: hoists and owns the state
@Composable
fun HelloScreen() {
    var name by rememberSaveable { mutableStateOf("") }
    HelloContent(name = name, onNameChange = { name = it })
}

// Correct counter using remember + mutableStateOf
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}

// Using key() inside a loop to preserve identity
data class Movie(val id: String, val title: String, val url: String)

@Composable
fun MoviesScreenWithKey(movies: List<Movie>) {
    Column {
        for (movie in movies) {
            key(movie.id) {
                MovieOverview(movie)
            }
        }
    }
}

@Composable
fun MovieOverview(movie: Movie) {
    Text(movie.title)
}

// ============ NAVIGATION ============

import androidx.navigation.NavController
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navOptions

@Composable
fun MyAppNavHost(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController(),
    startDestination: String = "home"
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = startDestination
    ) {
        composable("home") {
            HomeScreen(
                onNavigateToDetails = {
                    // Navigate with an argument
                    navController.navigate("details/5")
                }
            )
        }
        composable("details/{itemId}") { backStackEntry ->
            val itemId = backStackEntry.arguments?.getString("itemId")
            DetailsScreen(
                itemId = itemId,
                onNavigateBack = {
                    if (!navController.popBackStack()) {
                        // No destination left to return to
                    }
                }
            )
        }
    }
}

@Composable
fun HomeScreen(onNavigateToDetails: () -> Unit) {
    Button(onClick = onNavigateToDetails) { Text("Go to Details") }
}

@Composable
fun DetailsScreen(itemId: String?, onNavigateBack: () -> Unit) {
    Column {
        Text("Item ID: $itemId")
        Button(onClick = onNavigateBack) { Text("Back") }
    }
}

// popUpTo with saveState/restoreState pattern (e.g. bottom navigation)
@Composable
fun DestinationANav(navController: NavHostController) {
    Button(onClick = {
        navController.navigate(route = "B") {
            popUpTo("A") {
                inclusive = true
                saveState = true
            }
            restoreState = true
        }
    }) {
        Text("Go to B")
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: Explain the "UI Update Loop" in Android apps as introduced in this lecture.
**نموذج الإجابة:** الحلقة تتكون من ثلاث مراحل: (1) حدوث Event من المستخدم أو النظام، (2) معالج الحدث يُحدّث الحالة (Update State)، (3) الواجهة تُحدَّث لعرض الحالة الجديدة (Display State). هذه الحلقة تتكرر باستمرار طوال دورة حياة التطبيق، وتُلخَّص بالقاعدة: "State is. Events happen."

---

### Question 2: Compare `remember` and `rememberSaveable` in terms of what each survives.
**نموذج الإجابة:** `remember` تحفظ القيمة عبر عمليات إعادة التركيب (Recomposition) فقط، وتُفقَد عند أي تغيير في التهيئة (configuration change) مثل تدوير الشاشة. أما `rememberSaveable` فتحفظ القيمة في `Bundle`، مما يجعلها تنجو أيضاً من تغييرات التهيئة، وتُستخدم للحالات المرئية للمستخدم التي يجب أن تصمد أمام الدوران، مثل نص مُدخل في حقل.

---

### Question 3: Describe the State Hoisting pattern and list at least three benefits it provides.
**نموذج الإجابة:** State Hoisting هو نمط نقل الحالة من داخل composable إلى المُستدعي (caller) الأعلى منه، عبر استبدال الحالة الداخلية ببارامترين: `value` و `onValueChange`. من فوائده: (1) Single source of truth — مصدر واحد للحقيقة يمنع التضارب، (2) Encapsulated — فقط من يملك الحالة يعدّلها، (3) Shareable — يمكن مشاركتها بين عدة composables، (4) Interceptable — يمكن اعتراض الحدث قبل تنفيذه، (5) Decoupled — يمكن نقل الحالة لاحقاً إلى ViewModel دون تعديل composable.

---

### Question 4: What is a Composition, and what are the only two ways it can be produced or updated?
**نموذج الإجابة:** الـ Composition هي بنية شجرية تصف واجهة التطبيق، تُنتَج من تشغيل composables. لا يمكن إنتاجها إلا عبر **Initial Composition** (أول مرة تُشغَّل فيها composables)، ولا يمكن تحديثها إلا عبر **Recomposition** (إعادة تشغيل انتقائي عند تغيّر الحالة)، ولا توجد طريقة ثالثة للتعامل معها مباشرة.

---

### Question 5: Explain why call site matters for preserving composable identity across recompositions, and why this matters for side effects.
**نموذج الإجابة:** موقع الاستدعاء (call site) هو ما يستخدمه مُصرِّف Compose لتمييز كل نسخة composable عن الأخرى في الـ Composition. الحفاظ على هذه الهوية عبر عمليات إعادة التركيب المتعددة يضمن أن أي **Side Effect** مرتبط بذلك composable (مثل تحميل صورة من الشبكة) يُكمل عمله بشكل طبيعي بدلاً من أن يُلغى ويُعاد تشغيله من الصفر في كل مرة.

---

### Question 6: Describe the role of `key()` when rendering a list of items inside a loop.
**نموذج الإجابة:** عند استدعاء composable داخل حلقة من نفس موقع الاستدعاء، يعتمد Compose افتراضياً على ترتيب التنفيذ لتمييز العناصر، وهذا يفشل عند إضافة/حذف/إعادة ترتيب عناصر في منتصف القائمة أو أعلاها. `key(item.id)` يمنح كل عنصر معرّفاً حقيقياً فريداً، مما يضمن الحفاظ الصحيح على الهوية وتجنّب إعادة تشغيل الحالة أو Side Effects خطأً.

---

### Question 7: List the three core components required to implement navigation in Jetpack Compose, and describe each briefly.
**نموذج الإجابة:** (1) **NavController** — المنسّق المركزي الذي يدير التنقّل والـ Back Stack، يُنشأ عبر `rememberNavController()`. (2) **NavHost** — الحاوية التي تعرض الوجهة الحالية بناءً على حالة التنقّل. (3) **NavGraph** — بنية البيانات التي تحدّد كل الوجهات الممكنة وعلاقاتها، وتُعرَّف إما مباشرة داخل NavHost أو برمجياً عبر `createGraph()`.

---

### Question 8: Explain the difference between `popUpTo("route")` and `popUpTo("route") { inclusive = true }` with an example.
**نموذج الإجابة:** `popUpTo("route")` بدون `inclusive` تُزيل كل الوجهات فوق "route" المحدَّدة، لكنها **تُبقي** الوجهة "route" نفسها في الـ Back Stack. بينما `inclusive = true` تُزيل "route" أيضاً بالإضافة لما فوقها. مثال: على `[login, home, details]`، فإن `popUpTo("home")` تعطي `[login, home]`، بينما `popUpTo("home") { inclusive = true }` تعطي `[login]` فقط.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين State وEvent وربطهما بحلقة UI Update Loop
- [ ] أفهم لماذا لا تنجو المتغيرات المحلية العادية من Recomposition
- [ ] أعرف الفرق العملي بين `remember` و`rememberSaveable` ومتى أستخدم كلاً منهما
- [ ] أستطيع كتابة الصيغ الثلاث لإعلان `MutableState` وأعرف الاستيرادات المطلوبة لصيغة `by`
- [ ] أفهم الفرق بين Stateful وStateless composable وأستطيع تحويل أحدهما للآخر
- [ ] أستطيع شرح State Hoisting وذكر فوائده الخمس
- [ ] أعرف قواعد رفع الحالة الثلاث (أقرب أب مشترك، أعلى مستوى للكتابة، الرفع المشترك)
- [ ] أفهم مفهوم Composition والفرق بين Initial Composition وRecomposition
- [ ] أفهم كيف يحافظ Compose على هوية composable عبر call site
- [ ] أعرف متى ولماذا أستخدم `key()` داخل loop
- [ ] أعرف الفرق بين NavController وNavHost وNavGraph وRoute وDestination
- [ ] أستطيع كتابة NavHost بسيط مع composable لعدة وجهات
- [ ] أعرف كيف أُمرّر بيانات عبر route باستخدام placeholder وكيف أستخرجها من backStackEntry
- [ ] أفهم بنية Back Stack كـ LIFO وأستطيع تتبّع تسلسل navigate/popBackStack يدوياً
- [ ] أعرف الفرق بين `popBackStack()` وpopUpTo() ومتى أستخدم كلاً منهما
- [ ] أفهم استخدام `saveState`/`restoreState` مع `popUpTo` في سياق مثل Bottom Navigation
- [ ] أعرف لماذا لا يجب تمرير NavController مباشرة إلى composable فرعي

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Compose UI الأساسي (Composable, Modifier) | هذه المحاضرة (State & Navigation) | الحالة تحدّد ما يعرضه composable، والتنقّل يبدّل أي composable يظهر |
| Compose State & Navigation (هذه المحاضرة) | ViewModel/معماريات لاحقة | State Hoisting يمهّد لنقل الحالة لاحقاً إلى ViewModel وStateFlow |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| الحالة | State يحدّد الواجهة، Events تُحدث التغيير، المتغيرات المحلية لا تنجو من Recomposition |
| الحفظ | remember (Recomposition فقط) مقابل rememberSaveable (+ Configuration changes) |
| التصميم | Stateful (سهل الاستخدام) مقابل Stateless (سهل الاختبار وإعادة الاستخدام) عبر State Hoisting |
| الهوية | Call site + key() يحافظان على هوية composable وSide Effects |
| Navigation | NavController + NavHost + NavGraph، والتنقّل = تعديل Back Stack يُلاحَظ فيُعاد التركيب |
| Back Stack | LIFO — navigate يدفع، popBackStack/popUpTo يزيلان |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `remember { mutableStateOf(x) }` | حالة تنجو من Recomposition فقط | حالة UI مؤقتة |
| `rememberSaveable { mutableStateOf(x) }` | حالة تنجو من Recomposition + تدوير الشاشة | حالة مرئية للمستخدم |
| `value` / `onValueChange` | نمط State Hoisting القياسي | composables قابلة لإعادة الاستخدام |
| `key(id) { ... }` | حفظ هوية عنصر داخل loop | قوائم ديناميكية |
| `rememberNavController()` | إنشاء NavController محفوظ عبر Recomposition | جذر شجرة التنقّل |
| `navController.navigate(route)` | الانتقال لوجهة جديدة | أي حدث تنقّل |
| `popBackStack()` | إزالة الوجهة الحالية، تُعيد Boolean | زر Back |
| `popUpTo(route) { inclusive = true }` | إزالة عدة وجهات ضمن navigate واحد | منع الرجوع لشاشات سابقة |
| `saveState` / `restoreState` | حفظ واستعادة حالة الوجهة | Bottom Navigation |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | State is. Events happen. |
| 2 | المتغيرات المحلية العادية لا تنجو من Recomposition — استخدم remember |
| 3 | remember للحالة المؤقتة، rememberSaveable للحالة الباقية بعد تدوير الشاشة |
| 4 | State Hoisting = value نازلة + onValueChange صاعدة (Unidirectional Data Flow) |
| 5 | لا تُمرّر NavController مباشرة لأي composable فرعي — مرّر حدثاً فقط |
| 6 | تحقّق دوماً من نتيجة popBackStack() لتفادي الشاشة الفارغة |
| 7 | استخدم key() عند تكرار composable من نفس موقع الاستدعاء مع side effects |
| 8 | Navigation = تغيّر حالة Back Stack يُترجَم تلقائياً إلى Recomposition في NavHost |

---

<!-- VALIDATION: تم تغطية جميع النقاط الواردة في محاضرة "User Interface Development with Jetpack Compose -2-" (State and Jetpack Compose, State in Composables, Stateful vs. Stateless Composables, State Hoisting, Lifecycle of Composables, Anatomy of a Composable in Composition, What is Navigation, Key Concepts of Navigation, Navigation with Compose setup, Create a Navigation Controller, Create a Navigation Graph, Navigate to a composable, Navigate with arguments, Navigation and the Back Stack including popBackStack/popUpTo/saveState/restoreState). تم الالتزام ببنية SCHEMA.md v1.0 المطلوبة: خريطة تكامل، شرح تفصيلي بصيغة "النص الأصلي يقول" + "الشرح المبسّط"، ملخص منظم شامل، 16 سؤال MCQ، 6 أسئلة تصحيح كود، 5 تمارين إضافية، 3 تمارين تتبع، 2 سؤال تصميم، 16 بطاقة Q&A، مرجع كود نهائي، 8 أسئلة نظرية، قائمة فحص ذاتي، وورقة مراجعة سريعة (Cheat Sheet). -->

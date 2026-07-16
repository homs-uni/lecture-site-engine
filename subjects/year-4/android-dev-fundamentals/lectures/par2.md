# المحاضرة 1 — Kotlin Basics (أساسيات كوتلن)
> **المادة:** English For Specific Purposes 2 — Kotlin Fundamentals for Android -1- (نظري) | **الموضوع:** المتغيرات، الشروط، الـ Nullability، الدوال، والـ Lambda Expressions في Kotlin

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| تعلّم لغة `Kotlin` الأساسية | `Kotlin Compiler`, `IntelliJ / Android Studio` | فهم بنية أي برنامج Kotlin |
| **أساسيات كوتلن (هذه المحاضرة)** ← أنت هنا | `val/var`, `if/when`, `null safety`, `functions`, `lambdas`, `repeat()` | القدرة على كتابة برامج Kotlin بسيطة ومنطقية |
| بناء واجهات Compose | `@Composable`, `Modifier` | شاشات أندرويد فعلية |
| ربط الشاشات ببعضها | `Activity`, `Intent`, `NavController` | تطبيق أندرويد متكامل |

> **نوع هذه المحاضرة:** محاضرة Kotlin Basics — تُبنى عليها كل المحاضرات القادمة (OOP، Advanced، Compose)، فهي **حجر الأساس** ولا يجوز تخطي أي جزء منها.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. لغة Kotlin والدالة الرئيسية main

#### النص الأصلي يقول (English):
> "Kotlin is a programming language widely used by Android developers everywhere. A Kotlin program is required to have a main function, which is the specific place in your code where the program starts running. The main function is the entry point, or starting point, of the program."

#### الشرح المبسّط:
كل برنامج Kotlin يجب أن يحتوي على دالة اسمها `main()`، وهي **نقطة البداية** التي يبدأ منها تنفيذ الكود. بدون هذه الدالة لا يعرف الحاسوب من أين يبدأ.

```kotlin
fun main() {                     // نقطة بداية أي برنامج Kotlin
    println("Hello, world!")     // طباعة نص على الشاشة
}
```

**لماذا؟** لأن الحاسوب يحتاج مكاناً محدداً وواحداً يبدأ منه التنفيذ، تماماً كما يحتاج أي كتاب صفحة أولى يبدأ منها القارئ.

#### 💡 التشبيه:
> تخيّل مسرحية طويلة فيها عشرات المشاهد، لكن لا بد أن يكون هناك "مشهد افتتاحي" واحد يبدأ به العرض.
> **وجه الشبه:** المشهد الافتتاحي = دالة `main()`.

---

### 2. تعريف المتغيرات (Variable Declaration)

#### النص الأصلي يقول (English):
> "To define a new variable, start with the Kotlin keyword val. After the variable name, you add a colon, a space, and then the data type of the variable. The variable value is the actual data that's stored in the variable."

#### الشرح المبسّط:
لتعريف متغير في Kotlin نكتب:
```
val اسم_المتغير : نوع_البيانات = القيمة_الابتدائية
```
مثال: `val count: Int = 2` — هنا `count` هو الاسم، `Int` هو النوع، و `2` هي القيمة.

**لماذا؟** تحديد النوع يجعل الكمبايلر يعرف مسبقاً حجم البيانات ونوع العمليات المسموح بها عليها، فيمنع الأخطاء قبل تشغيل البرنامج.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ما الفرق بين اسم المتغير ونوع البيانات في `val count: Int = 2`؟
> **لماذا هذا مهم؟** لأن الخلط بينهما هو أول خطأ يقع فيه المبتدئون عند قراءة كود Kotlin.

---

### 2.1. val مقابل var

#### النص الأصلي يقول (English):
> "If you need to update the value of a variable, declare the variable with the Kotlin keyword var, instead of val. val keyword - Use when you expect the variable value will not change. var keyword - Use when you expect the variable value can change."

#### الشرح المبسّط:
- `val` = **read-only** (قراءة فقط) — بمجرد تحديد القيمة، لا يمكن تغييرها.
- `var` = **mutable** (قابل للتغيير) — يمكن تعديل القيمة لاحقاً.

#### 💡 التشبيه:
> `val` تشبه رقم بصمتك — لا يتغيّر أبداً. أما `var` فتشبه رصيدك البنكي — يتغيّر باستمرار.
> **وجه الشبه:** ثبات القيمة = `val`، تغيّر القيمة = `var`.

### أهم التعاريف والمفاهيم (جدول مقارنة سريع)
| المقارنة | val | var | الفرق |
| --- | --- | --- | --- |
| القابلية للتعديل | لا يمكن تعديلها بعد التعيين | يمكن تعديلها في أي وقت | `val` = read-only، `var` = mutable |
| الاستخدام المفضّل | عندما تتوقع أن القيمة لن تتغيّر | عندما تتوقع أن القيمة ستتغيّر | اختيار `val` افتراضياً أكثر أماناً |

#### الفهم الخاطئ ❌: يعتقد البعض أن `val` تعني "قيمة ثابتة (constant) بمعنى compile-time constant".
#### الفهم الصحيح ✅: `val` تعني فقط أن المرجع (reference) لا يمكن إعادة تعيينه؛ القيمة تُحسب مرة واحدة عند التشغيل (runtime)، وهذا مختلف عن الثوابت الحقيقية.

---

### 2.2. أنواع البيانات الأساسية (Basic Data Types)

#### النص الأصلي يقول (English):
> "In Kotlin, there are some common basic data types." (String, Int, Double, Float, Boolean)

#### الشرح المبسّط:
| النوع | يحتوي على | مثال |
| --- | --- | --- |
| `String` | نص | `"Sign in"` |
| `Int` | عدد صحيح | `32`, `-59281` |
| `Double` | عدد عشري (دقة عالية) | `501.0292` |
| `Float` | عدد عشري (دقة أقل، ينتهي بـ f) | `5.0f` |
| `Boolean` | صح أو خطأ فقط | `true` / `false` |

**لماذا؟** كل نوع بيانات يحجز مساحة ذاكرة مختلفة ويسمح بعمليات مختلفة؛ اختيار النوع الصحيح يجعل البرنامج أكثر كفاءة وأقل عرضة للأخطاء.

#### 💻 الكود: استخدام متغير و String Template

#### ما هذا الكود؟
> يوضّح كيفية طباعة قيمة متغير مباشرة، وكيفية دمج قيمة متغير داخل نص باستخدام `$`.

```kotlin
fun main() {
    val count: Int = 2                              // تعريف متغير عدد صحيح
    println(count)                                   // طباعة القيمة مباشرة → 2
    println("You have $count unread messages.")      // دمج المتغير داخل نص (string template)
}
```

#### شرح كل سطر:
1. `val count: Int = 2` → تعريف متغير — يخزّن القيمة 2 من نوع Int.
2. `println(count)` → طباعة — يعرض قيمة المتغير مباشرة.
3. `println("You have $count unread messages.")` → String Template — يستبدل `$count` بقيمته الفعلية داخل النص.

**الناتج المتوقع (لقطة الشاشة):**
> ```
> 2
> You have 2 unread messages.
> ```

---

### 3. الاستدلال على النوع (Type Inference)

#### النص الأصلي يقول (English):
> "Type inference is when the Kotlin compiler can infer (or determine) what data type a variable should be, without the type being explicitly written in the code... If you don't provide an initial value when you declare a variable, you must specify the type."

#### الشرح المبسّط:
لا يلزم دائماً كتابة النوع صراحة؛ فإذا أعطيت قيمة ابتدائية، يستنتج الكمبايلر النوع تلقائياً.
- `val count = 2` → الكمبايلر يفهم أن النوع `Int` تلقائياً.
- لكن إذا لم تعطِ قيمة ابتدائية: `val count: Int` — **يجب** كتابة النوع صراحة، لأنه لا يوجد ما يُستدل منه.

**لماذا؟** لأن Kotlin يريد أن يمنحك إيجازاً في الكتابة دون التضحية بالأمان (type-safety)، فيمنع مثلاً استدعاء دالة خاصة بـ `Int` على متغير من نوع `String`.

#### 💻 الكود: خطأ نوع شائع

```kotlin
val languageName = "Kotlin"                 // النوع مُستنتج تلقائياً كـ String
val upperCaseName = languageName.toUpperCase()  // صحيح: دالة خاصة بالـ String

languageName.inc()   // خطأ! inc() دالة خاصة بـ Int وليس String
```

#### شرح كل سطر:
1. `val languageName = "Kotlin"` → الكمبايلر يستنتج النوع `String` من القيمة المُعطاة.
2. `languageName.toUpperCase()` → مسموح لأن `toUpperCase()` دالة خاصة بالنصوص.
3. `languageName.inc()` → **خطأ compilation** لأن `inc()` عملية زيادة خاصة بالأعداد فقط.

#### مهم للامتحان ⚠️:
> إذا لم يُعطَ للمتغير قيمة ابتدائية، فإن كتابة النوع تصبح **إلزامية** وليست اختيارية.

---

### 4. الشروط في Kotlin (Conditionals)

### 4.1. جملة if/else

#### النص الأصلي يقول (English):
> "In Kotlin, when you want your program to perform different actions based on a condition, you can use an if/else statement."

#### الشرح المبسّط:
`if/else` تنفّذ كتلة كود إذا تحقق شرط، وكتلة أخرى إذا لم يتحقق.

```kotlin
fun main() {
    val trafficLightColor = "Green"       // متغير يمثل لون الإشارة
    if (trafficLightColor == "Red") {     // فحص الشرط
        println("Stop")                   // ينفَّذ إذا كان الشرط صحيحاً
    } else {
        println("Go")                     // ينفَّذ إذا كان الشرط خاطئاً
    }
}
```

**لماذا؟** لأن البرامج الحقيقية تحتاج اتخاذ قرارات مختلفة حسب الحالة، وليس تنفيذ نفس الكود دائماً.

---

### 4.2. else if — شروط متعددة الطبقات

#### النص الأصلي يقول (English):
> "When you face multiple decision points, you need to create conditionals with multiple layers of conditions, which you can do when you add else if branches to if/else statements."

```kotlin
fun main() {
    val trafficLightColor = "Black"
    if (trafficLightColor == "Red") {
        println("Stop")
    } else if (trafficLightColor == "Yellow") {
        println("Slow")
    } else if (trafficLightColor == "Green") {
        println("Go")
    } else {
        println("Invalid traffic-light color")
    }
}
```

#### الشرح المبسّط:
عندما يكون هناك أكثر من احتمالين، نضيف `else if` لكل احتمال إضافي، وتُفحص الشروط بالترتيب من الأعلى للأسفل.

---

### 4.3. جملة when — بديل أنيق للشروط المتعددة

#### النص الأصلي يقول (English):
> "In Kotlin, when you deal with multiple branches, you can use the when statement instead of the if/else statement. when statements are preferred when there are more than two branches to consider."

#### الشرح المبسّط:
`when` تأخذ قيمة واحدة (parameter) وتقارنها مع عدة شروط بالترتيب، وتنفّذ أول شرط يتحقق.

```kotlin
fun main() {
    val trafficLightColor = "Yellow"
    when (trafficLightColor) {
        "Red" -> println("Stop")
        "Yellow" -> println("Slow")
        "Green" -> println("Go")
        else -> println("Invalid traffic-light color")
    }
}
```

#### ⚖️ المقايضة: if/else مقابل when

| | if/else | when |
| --- | --- | --- |
| المزايا | مناسبة لشرط أو شرطين بسيطين | أوضح وأقصر عند وجود أكثر من شرطين |
| العيوب | تصبح طويلة ومعقدة مع كثرة الشروط | غير مفيدة لشرط واحد بسيط |
| متى تختاره | فرعين (true/false) فقط | 3 فروع أو أكثر لنفس المتغيّر |

---

### 4.4. شروط معقّدة داخل when (فاصلة، in، is)

#### النص الأصلي يقول (English):
> "Use a comma (,) for multiple conditions" / "Use the in keyword for a range of conditions" / "Use the is keyword to check data type"

#### الشرح المبسّط:
- **الفاصلة (,)** تجمع عدة قيم تنفّذ نفس الكتلة:
```kotlin
when (x) {
    2, 3, 5, 7 -> println("x is a prime number between 1 and 10.")
    else -> println("x isn't a prime number between 1 and 10.")
}
```
- **in** تفحص إن كانت القيمة ضمن مدى (range):
```kotlin
when (x) {
    2, 3, 5, 7 -> println("x is a prime number between 1 and 10.")
    in 1..10 -> println("x is a number between 1 and 10, but not a prime number.")
    else -> println("x isn't a prime number between 1 and 10.")
}
```
- **is** تفحص نوع البيانات (type checking):
```kotlin
val x: Any = 20
when (x) {
    2, 3, 5, 7 -> println("x is a prime number between 1 and 10.")
    in 1..10 -> println("x is a number between 1 and 10, but not a prime number.")
    is Int -> println("x is an integer number, but not between 1 and 10.")
    else -> println("x isn't an integer number.")
}
```

**لماذا؟** لأن الحياة الواقعية مليئة بحالات معقّدة (مجموعات قيم، مديات، أنواع مختلفة)، و`when` توفّر أدوات جاهزة للتعامل معها دون تكرار شروط `if` كثيرة.

#### ⚙️ الخطوات / الخوارزمية: تقييم جملة when

#### ما هدف هذه العملية؟
> توضيح كيف يفحص الكمبايلر شروط `when` بالترتيب حتى يجد أول تطابق.

```algorithm
1 | استقبال القيمة | when(parameter) | يأخذ Kotlin القيمة المطلوب فحصها
2 | فحص الشرط الأول | مقارنة/in/is | إذا تحقق ← تنفيذ الكتلة والخروج
3 | فحص الشرط التالي | مقارنة/in/is | يتكرر تسلسلياً حتى إيجاد تطابق
4 | تنفيذ else | else -> | إذا لم يتحقق أي شرط سابق
```

#### نقاط التنفيذ:
- ترتيب الشروط مهم جداً: إذا وُضع `in 1..10` قبل `2, 3, 5, 7` فسيتم التقاط الأعداد الأولية ضمن الشرط الأعم أولاً ولن تصل التنفيذ لشرط الأعداد الأولية.

---

### 4.5. if/else و when كـ Expressions

#### النص الأصلي يقول (English):
> "You can also use conditionals as expressions to return different values for each branch of condition... If the bodies only contain a return value or expression, you can remove the curly braces to make the code more concise."

#### الشرح المبسّط:
بدلاً من كتابة `println` داخل كل فرع، يمكن أن يُرجع الشرط نفسه قيمة تُخزَّن في متغير مباشرة.

```kotlin
fun main() {
    val trafficLightColor = "Amber"
    val message = when (trafficLightColor) {
        "Red" -> "Stop"
        "Yellow", "Amber" -> "Slow"
        "Green" -> "Go"
        else -> "Invalid traffic-light color"
    }
    println(message)
}
```

**لماذا؟** يقلّل من تكرار الكود عندما تكون كل الفروع تفعل نفس الشيء العام (مثل الطباعة)، مما يجعل الكود أنظف.

#### 🔄 قبل / بعد: تحويل if/else إلى expression

**قبل:**
```kotlin
if (trafficLightColor == "Red") {
    println("Stop")
} else {
    println("Go")
}
```

**بعد:**
```kotlin
val message = if (trafficLightColor == "Red") "Stop" else "Go"
println(message)
```

**ماذا تغيّر؟** أصبح الشرط "يُرجع" قيمة مباشرة بدلاً من تكرار `println` في كل فرع.

---

### 5. الـ Nullability في Kotlin

### 5.1. المتغيرات القابلة لأن تكون null

#### النص الأصلي يقول (English):
> "In Kotlin, you can use null to indicate that there's no value associated with the variable... Nullable types are variables that can hold null. Non-null types are variables that can't hold null."

#### الشرح المبسّط:
لتعريف متغير قابل لأن يكون `null` نضيف علامة `?` بعد النوع:
```kotlin
var favoriteActor: String? = "Sandra Oh"
favoriteActor = null   // مسموح لأن النوع String? وليس String
```
بدون `?`، لو حاولنا وضع `null` في نوع غير قابل، سيظهر الخطأ:
> `Null can not be a value of a non-null type String`

#### 💡 التشبيه:
> فكّر بصندوق بريد فارغ مقابل صندوق بريد لا يمكن أن يكون فارغاً أبداً.
> **وجه الشبه:** الصندوق الذي قد يكون فارغاً = نوع `String?`، والصندوق الذي يجب أن يحتوي شيئاً دوماً = نوع `String`.

---

### 5.2. معامل الاستدعاء الآمن ?.

#### النص الأصلي يقول (English):
> "Kotlin intentionally applies syntactic rules so that it can achieve null safety... You can use the ?. safe call operator to access methods or properties of nullable variables... the Kotlin compiler stops any attempt of member access to null references and returns null for the member accessed."

#### الشرح المبسّط:
إذا حاولنا الوصول لخاصية متغير قابل لـ `null` مباشرة (`favoriteActor.length`) سيرفض الكمبايلر الكود لأنه غير آمن. الحل هو `?.`:
```kotlin
var favoriteActor: String? = "Sandra Oh"
println(favoriteActor?.length)   // 9
favoriteActor = null
println(favoriteActor?.length)   // null (بدون كراش)
```

**لماذا؟** لمنع "Runtime Crash" الذي يحدث لو تم الوصول لخاصية متغير قيمته `null` فعلياً أثناء التشغيل.

#### مهم للامتحان ⚠️:
> الخطأ الذي يظهر عند محاولة الوصول لخاصية متغير nullable بدون `?.` أو `!!` هو:
> `Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type String?`

---

### 5.3. معامل التأكيد !!

#### النص الأصلي يقول (English):
> "If you use the !! not-null assertion, it means that you assert that the value of the variable isn't null, regardless of whether it is or isn't... the use of a !! not-null assertion operator may result in a NullPointerException error being thrown if the nullable variable is indeed null."

```kotlin
var favoriteActor: String? = null
println(favoriteActor!!.length)   // يسبب NullPointerException
```

#### الشرح المبسّط:
`!!` تعني "أنا متأكد أن هذا المتغير ليس null"، لكن إذا كنت مخطئاً سيتحطم البرنامج (crash) برسالة `NullPointerException`.

#### الفهم الخاطئ ❌: يظن البعض أن `!!` "تحل" مشكلة الـ nullable بأمان.
#### الفهم الصحيح ✅: `!!` لا تحل شيئاً، بل تراهن أن القيمة ليست null؛ إن كانت خطأً، يتحطم البرنامج فوراً.

#### الدرس المستفاد:
> لا تستخدم `!!` إلا إذا كنت متأكداً 100% أن القيمة ليست null — وإلا استخدم `?.` أو `?:`.

---

### 5.4. معامل Elvis ?:

#### النص الأصلي يقول (English):
> "With the ?: Elvis operator, you can add a default value when the ?. safe-call operator returns null... If the variable isn't null, the expression before the ?: Elvis operator executes. If the variable is null, the expression after the ?: Elvis operator executes."

```kotlin
fun main() {
    var favoriteActor: String? = "Sandra Oh"
    val lengthOfName = favoriteActor?.length ?: 0
    println("The number of characters in your favorite actor's name is $lengthOfName.")
}
```
**الناتج:** `The number of characters in your favorite actor's name is 9.`

#### الشرح المبسّط:
`?:` تعطي قيمة بديلة (افتراضية) إذا كانت نتيجة `?.` هي `null`، بدلاً من التعامل مع `null` لاحقاً بشروط منفصلة.

#### ⚙️ الخطوات / الخوارزمية: التعامل الآمن مع القيم القابلة لـ null

#### ما هدف هذه العملية؟
> توضيح الترتيب المنطقي لاختيار الأداة الصحيحة عند التعامل مع متغير nullable.

```algorithm
1 | تحقق هل المتغير nullable | نوع المتغير (String?) | إذا لا، تعامل معه طبيعياً
2 | إذا نعم، فكّر بالحالة المرغوبة | ?. أو !! أو ?: | اختيار الأداة المناسبة
3 | استخدم ?. | Safe Call | إذا أردت null بدلاً من الكراش
4 | استخدم ?: | Elvis | إذا أردت قيمة افتراضية بدلاً من null
5 | استخدم !! | Not-null Assertion | فقط إن كنت متأكداً 100% أنها ليست null
```

---

### 6. الدوال (Functions) في Kotlin

### 6.1. تعريف واستدعاء دالة

#### النص الأصلي يقول (English):
> "Declaring a function uses the fun keyword and includes code within the curly braces which contains the instructions needed to execute a task."

```kotlin
fun main() {
    birthdayGreeting()             // استدعاء الدالة
}

fun birthdayGreeting() {           // تعريف الدالة
    println("Happy Birthday, Rover!")
    println("You are now 5 years old!")
}
```

#### الشرح المبسّط:
الدالة قطعة كود لها اسم يمكن استدعاؤها (تنفيذها) في أي مكان بالبرنامج دون إعادة كتابة نفس التعليمات.

**لماذا؟** لتفادي تكرار الكود (DRY — Don't Repeat Yourself) ولتنظيم البرنامج في وحدات منطقية صغيرة.

---

### 6.2. إرجاع قيمة من دالة (Return Type)

#### النص الأصلي يقول (English):
> "By default, if you don't specify a return type, the default return type is Unit. Unit means the function doesn't return a value... For functions that don't return anything, or returning Unit, you don't need a return statement."

```kotlin
fun main() {
    val greeting = birthdayGreeting()
    println(greeting)
}

fun birthdayGreeting(): String {
    val nameGreeting = "Happy Birthday, Rover!"
    val ageGreeting = "You are now 5 years old!"
    return "$nameGreeting\n$ageGreeting"
}
```

#### الشرح المبسّط:
- `Unit` = النوع الافتراضي عندما لا ترجع الدالة أي قيمة (تشبه `void` في لغات أخرى).
- إذا حددنا نوع إرجاع آخر (مثل `String`)، **يجب** استخدام `return` لإرجاع القيمة.

---

### 6.3. المعاملات (Parameters) والقيم الافتراضية (Default Arguments)

#### النص الأصلي يقول (English):
> "Each parameter consists of a variable name and data type, separated by a colon and a space... Function parameters can also specify default arguments. When you call a function, you can choose to omit arguments for which there is a default."

```kotlin
fun birthdayGreeting(name: String, age: Int): String {
    val nameGreeting = "Happy Birthday, $name!"
    val ageGreeting = "You are now $age years old!"
    return "$nameGreeting\n$ageGreeting"
}

fun main() {
    println(birthdayGreeting("Rover", 5))
    println(birthdayGreeting("Rex", 2))
}
```

مع قيمة افتراضية:
```kotlin
fun birthdayGreeting(name: String = "Rover", age: Int): String {
    return "Happy Birthday, $name! You are now $age years old!"
}

fun main() {
    println(birthdayGreeting(age = 5))     // يستخدم القيمة الافتراضية للاسم
    println(birthdayGreeting("Rex", 2))    // يتجاوز القيمة الافتراضية
}
```

#### 💡 التشبيه:
> القيمة الافتراضية تشبه طلب قهوة "عادي" في مقهى — إن لم تحدد السكر، يضاف افتراضياً بمقدار معيّن، لكن يمكنك دائماً أن تطلب كمية مختلفة.
> **وجه الشبه:** الطلب الافتراضي للقهوة = default argument.

---

### 7. أنواع الدوال والـ Lambda Expressions

#### النص الأصلي يقول (English):
> "In Kotlin, functions are considered first-class constructs. This means that functions can be treated as a data type. You can store functions in variables, pass them to other functions as arguments, and return them from other functions."

#### الشرح المبسّط:
بما أن الدوال في Kotlin هي "مواطن من الدرجة الأولى" (first-class)، فيمكن التعامل معها تماماً كأي متغير آخر: تخزينها، تمريرها، إرجاعها.

---

### 7.1. تخزين دالة في متغير (Function Reference)

#### النص الأصلي يقول (English):
> "To refer to a function as a value, you need to use the function reference operator (::)."

```kotlin
fun main() {
    val trickFunction = ::trick
}

fun trick() {
    println("No treats!")
}
```

#### الشرح المبسّط:
`::` تحوّل اسم الدالة إلى **قيمة** يمكن تخزينها في متغير، دون تنفيذ الدالة فوراً.

---

### 7.2. إعادة تعريف الدالة كـ Lambda Expression

#### النص الأصلي يقول (English):
> "Lambda expressions provide a concise syntax to define a function without the fun keyword. You can store a lambda expression directly in a variable without a function reference on another function."

```kotlin
val trick = {
    println("No treats!")
}

fun main() {
    val trickFunction = trick
    trick()
    trickFunction()
}
```

#### الشرح المبسّط:
بدلاً من `fun trick() { ... }` ثم أخذ مرجع لها بـ `::`، يمكن كتابة الدالة مباشرة كـ **Lambda** وتخزينها في متغير باستخدام `{ }`.

---

### 7.3. استخدام الدوال كنوع بيانات (Function Types)

#### النص الأصلي يقول (English):
> "Function types consist of a set of parentheses that contain an optional parameter list, the -> symbol, and a return type... If you had a function that took two Int parameters and returned an Int, its data type would be (Int, Int) -> Int."

```kotlin
val trick = { println("No treats!") }
val treat: () -> Unit = { println("Have a treat!") }

fun main() {
    val trickFunction = trick
    trick()
    trickFunction()
    treat()
}
```

#### الشرح المبسّط:
نوع الدالة يُكتب كـ `(المعاملات) -> نوع الإرجاع`. مثلاً `() -> Unit` تعني "دالة لا تأخذ معاملات ولا تُرجع قيمة".

#### 📊 المخطط: تحويل تعريف الدالة إلى Function Type

#### ما هذا المخطط؟
> يوضّح كيفية استخلاص "نوع الدالة" (function type) من تعريف الدالة نفسه.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | تعريف الدالة | process | `fun trickOrTreat(isTrick: Boolean): () -> Unit` |
| 2 | استخلاص نوع المعاملات | process | `(Boolean)` |
| 3 | استخلاص نوع الإرجاع | process | `() -> Unit` |
| 4 | النوع الكامل للدالة | event | `(Boolean) -> (() -> Unit)` |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| تعريف الدالة | استخلاص نوع المعاملات | يحتوي | اتجاهي | المعاملات تُؤخذ من التعريف |
| استخلاص نوع المعاملات | النوع الكامل | يُدمج مع | اتجاهي | يتشكّل النوع الكامل من الجزأين |
| استخلاص نوع الإرجاع | النوع الكامل | يُدمج مع | اتجاهي | يتشكّل النوع الكامل من الجزأين |

```diagram
type: flowchart
title: بناء نوع الدالة (Function Type)
direction: TD
nodes:
  - id: def
    label: "fun trickOrTreat(isTrick: Boolean): () -> Unit"
    kind: event
    level: 0
  - id: params
    label: "المعاملات: (Boolean)"
    kind: process
    level: 1
  - id: ret
    label: "الإرجاع: () -> Unit"
    kind: process
    level: 1
  - id: full
    label: "النوع الكامل"
    kind: event
    level: 2
edges:
  - from: def
    to: params
  - from: def
    to: ret
  - from: params
    to: full
  - from: ret
    to: full
```

---

### 7.4. استخدام دالة كنوع إرجاع (Function as Return Type)

#### النص الأصلي يقول (English):
> "A function is a data type, so you can use it like any other data type. You can even return functions from other functions."

```kotlin
fun trickOrTreat(isTrick: Boolean): () -> Unit {
    if (isTrick) { return trick }
    else { return treat }
}

val trick = { println("No treats!") }
val treat = { println("Have a treat!") }

fun main() {
    val treatFunction = trickOrTreat(false)
    val trickFunction = trickOrTreat(true)
    treatFunction()   // Have a treat!
    trickFunction()   // No treats!
}
```

---

### 7.5. تمرير دالة كمعامل لدالة أخرى

#### النص الأصلي يقول (English):
> "When you write a lambda expression for a function that takes a parameter, the parameters are given names in the order that they occur."

```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: (Int) -> String): () -> Unit {
    if (isTrick) {
        return trick
    } else {
        println(extraTreat(5))
        return treat
    }
}

val trick = { println("No treats!") }
val treat = { println("Have a treat!") }

fun main() {
    val coins: (Int) -> String = { quantity -> "$quantity quarters" }
    val cupcake: (Int) -> String = { "Have a cupcake!" }

    val treatFunction = trickOrTreat(false, coins)
    val trickFunction = trickOrTreat(true, cupcake)
    treatFunction()
    trickFunction()
}
```

**الناتج المتوقع:**
> ```
> 5 quarters
> Have a treat!
> No treats!
> ```

---

### 7.6. الدوال القابلة لـ null (Nullable Function Types)

#### النص الأصلي يقول (English):
> "Like other data types, function types can be declared as nullable... To declare a function as nullable, surround the function type in parentheses followed by a ? symbol outside the ending parenthesis."

```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: ((Int) -> String)?): () -> Unit {
    if (isTrick) {
        return trick
    } else {
        if (extraTreat != null) { println(extraTreat(5)) }
        return treat
    }
}
```

#### الشرح المبسّط:
`((Int) -> String)?` تعني أن المعامل قد يكون دالة، أو قد يكون `null` تماماً — لذلك نتحقق منه قبل استدعائه (`if (extraTreat != null)`).

---

### 7.7. اختصارات كتابة الـ Lambda

#### النص الأصلي يقول (English):
> "When a function has a single parameter and you don't provide a name, Kotlin implicitly assigns it the it name" / "You can pass a lambda expression directly into a function call" / "You can use another shorthand option to write lambdas when a function type is the last parameter of a function."

#### الشرح المبسّط: ثلاث اختصارات متتالية

**أ) حذف اسم المعامل الواحد (it):**
```kotlin
val coins: (Int) -> String = { "$it quarters" }
```

**ب) تمرير Lambda مباشرة كمعامل:**
```kotlin
val treatFunction = trickOrTreat(false, { "$it quarters" })
```

**ج) Trailing Lambda (عندما تكون Lambda آخر معامل):**
```kotlin
val treatFunction = trickOrTreat(false) { "$it quarters" }
```

#### 🔄 قبل / بعد: من الشكل الكامل إلى الشكل المختصر

**قبل:**
```kotlin
val coins: (Int) -> String = { quantity -> "$quantity quarters" }
val treatFunction = trickOrTreat(false, coins)
```

**بعد:**
```kotlin
val treatFunction = trickOrTreat(false) { "$it quarters" }
```

**ماذا تغيّر؟** حذفنا اسم المعامل (`it` بدلاً من `quantity`) ونقلنا الـ Lambda خارج الأقواس (trailing lambda) لأنها آخر معامل.

---

### 8. الدالة repeat()

#### النص الأصلي يقول (English):
> "When a function returns a function or takes a function as an argument, it's called a higher-order function. The repeat() function is one such higher-order function... repeat(times: Int, action: (Int) -> Unit)... You can use the repeat() function to repeat code a specified number of times, similar to a for loop."

```kotlin
fun main() {
    val treatFunction = trickOrTreat(false) { "$it quarters" }
    val trickFunction = trickOrTreat(true, null)
    repeat(4) { treatFunction() }
    trickFunction()
}
```

**الناتج المتوقع:**
> ```
> 5 quarters
> Have a treat!
> Have a treat!
> Have a treat!
> Have a treat!
> No treats!
> ```

#### الشرح المبسّط:
`repeat()` هي دالة **من الدرجة الأعلى** (higher-order function) لأنها تأخذ دالة أخرى كمعامل (`action`). تُعتبر بديلاً مختصراً عن حلقة `for` عندما نريد تكرار كود معيّن عدداً محدداً من المرات.

#### 💡 التشبيه:
> `repeat(4) { treatFunction() }` تشبه أن تقول لشخص: "افعل هذا 4 مرات" بدلاً من كتابة نفس الأمر أربع مرات منفصلة.
> **وجه الشبه:** الأمر المتكرر = جسم الـ Lambda، وعدد المرات = `times`.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `val` | متغير للقراءة فقط، لا يمكن تغيير قيمته بعد التعيين | `val count = 2` |
| `var` | متغير قابل للتغيير | `var count = 2; count = 3` |
| `Type Inference` | استنتاج الكمبايلر لنوع المتغير من قيمته الابتدائية | `val x = 5` → `Int` |
| `if/else` | تنفيذ كود بناءً على شرط منطقي واحد أو اثنين | — |
| `when` | بديل لـ if/else عند وجود أكثر من فرعين | — |
| `Nullable Type (?)` | نوع بيانات يمكن أن يحمل `null` | `String?` |
| `?.` Safe Call | الوصول الآمن لخاصية متغير قد يكون null | يُرجع null بدلاً من كراش |
| `!!` Not-null Assertion | تأكيد أن المتغير ليس null (خطر) | قد يسبب `NullPointerException` |
| `?:` Elvis Operator | إعطاء قيمة افتراضية إذا كانت النتيجة null | `x ?: 0` |
| `fun` | كلمة مفتاحية لتعريف دالة | `fun main() {}` |
| `Unit` | نوع الإرجاع الافتراضي (لا يُرجع قيمة) | مثل `void` |
| `Function Type` | تمثيل الدالة كنوع بيانات | `(Int) -> String` |
| `Lambda Expression` | دالة مجهولة الاسم تُكتب مباشرة | `{ x -> x * 2 }` |
| `it` | الاسم الضمني للمعامل الوحيد في lambda | `{ "$it quarters" }` |
| `Trailing Lambda` | كتابة الـ lambda خارج الأقواس عندما تكون آخر معامل | `repeat(4) { ... }` |
| `Higher-order Function` | دالة تأخذ دالة أو تُرجع دالة | `repeat()` |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `println()` | طباعة نص على الشاشة | — |
| `::functionName` | أخذ مرجع دالة كقيمة | لا يستدعيها فوراً |
| `repeat(times) { }` | تكرار كتلة كود عدد محدد من المرات | بديل لحلقة for |
| `in start..end` | فحص انتماء قيمة لمدى | يُستخدم داخل when |
| `is Type` | فحص نوع البيانات وقت التشغيل | يُستخدم داخل when |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| val | var | إمكانية إعادة التعيين | val = لا، var = نعم |
| `?.` | `!!` | التعامل مع null | `?.` آمن، `!!` خطر (قد يسبب كراش) |
| if/else statement | if/else expression | طريقة الاستخدام | statement ينفّذ أوامر، expression يُرجع قيمة |
| String | Int/Double/Float/Boolean | نوع البيانات | String نص، والباقي أرقام/منطقي |

### قاموس المصطلحات (Glossary)
| الفئة | المصطلحات |
| --- | --- |
| متغيرات | `val`, `var`, `Type Inference`, `String Template` |
| شروط | `if/else`, `when`, `in`, `is` |
| Nullability | `nullable type`, `safe call (?.)`, `not-null assertion (!!)`, `Elvis (?:)`, `NullPointerException` |
| دوال | `fun`, `parameter`, `return type`, `Unit`, `default argument` |
| Lambda | `lambda expression`, `function type`, `it`, `trailing lambda`, `higher-order function` |

### أبرز النقاط الذهبية
1. أي برنامج Kotlin يبدأ من دالة `main()`.
2. استخدم `val` افتراضياً، ولا تستخدم `var` إلا عند الحاجة الفعلية للتغيير.
3. إن لم تُعطِ قيمة ابتدائية للمتغير، يجب تحديد نوعه صراحة.
4. `when` أوضح من `if/else` عند وجود أكثر من فرعين.
5. لا تستخدم `!!` أبداً إلا إن كنت متأكداً 100% أن القيمة ليست null.
6. الدوال في Kotlin "مواطنة من الدرجة الأولى" — يمكن تخزينها، تمريرها، وإرجاعها.
7. `it` تسهّل كتابة lambda ذات معامل واحد فقط.
8. `repeat()` بديل مختصر لحلقة `for` عندما نريد تكرار كتلة كود بعدد محدد.

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| استخدام `val` لمتغير سيتغيّر لاحقاً | استخدم `var` بدلاً منه |
| نسيان `?` عند إسناد `null` لمتغير | اكتب `String?` بدلاً من `String` |
| استخدام `!!` كحل سريع دون تأكد | استخدم `?.` مع `?:` بدلاً منها |
| الاعتقاد أن `when` تحتاج `break` مثل لغات أخرى | لا حاجة لـ `break`؛ Kotlin تتوقف تلقائياً بعد أول تطابق |
| وضع شرط `in 1..10` قبل شرط أكثر تحديداً | رتّب الشروط من الأكثر تحديداً إلى الأعم |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: تعريف واستدعاء دالة بسيطة
> الهدف: تنظيم كود متكرر داخل وحدة واحدة قابلة لإعادة الاستخدام.
```algorithm
1 | كتابة fun | كلمة مفتاحية | بداية تعريف الدالة
2 | اسم الدالة + الأقواس | الاسم يوضّح الغرض | مثال: birthdayGreeting()
3 | تحديد المعاملات (اختياري) | داخل الأقواس | name: String, age: Int
4 | تحديد نوع الإرجاع (اختياري) | بعد : | افتراضياً Unit
5 | كتابة جسم الدالة | { } | التعليمات الفعلية
6 | استدعاء الدالة من main() | () | تنفيذ الدالة فعلياً
```
#### نقاط التنفيذ:
- إن لم يُحدَّد نوع إرجاع، فهو `Unit` تلقائياً ولا حاجة لـ `return`.

#### ⚙️ الخطوات / الخوارزمية: بناء واستخدام Lambda Expression
> الهدف: تعريف دالة مجهولة الاسم وتخزينها كقيمة أو تمريرها مباشرة.
```algorithm
1 | تحديد المعامل (إن وُجد) | اسم أو it | إن كان معامل واحد يمكن حذف اسمه
2 | فتح قوس مجعّد { | بداية الـ lambda | —
3 | كتابة الجسم | التعليمات | ما تفعله الدالة
4 | إغلاق القوس } | نهاية الـ lambda | —
5 | تخزين أو تمرير مباشرة | val x = { } أو trailing lambda | حسب الحاجة
```
#### نقاط التنفيذ:
- عند وجود معامل واحد فقط بلا اسم، يُستخدم `it` تلقائياً.
- إذا كانت الـ lambda هي آخر معامل في الدالة، يمكن كتابتها خارج الأقواس (trailing lambda).

---

### أنماط الأكواد والبنى المتكررة
| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| String Template | `"$variable"` أو `"${expression}"` | لدمج قيمة داخل نص |
| Safe Call + Elvis | `variable?.property ?: default` | عند الحاجة لقيمة افتراضية آمنة |
| Function as return type | `fun x(): () -> Unit` | عند اختيار سلوك بناءً على شرط |
| Trailing Lambda | `function(arg) { lambdaBody }` | عندما تكون الدالة آخر معامل |

### أنماط التعامل والسلوك
| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| متغير قد يكون null وتريد تجنب الكراش | استخدم `?.` | يُرجع null بأمان بدلاً من تحطم البرنامج |
| متغير قد يكون null وتريد قيمة بديلة | استخدم `?:` | يعطي قيمة افتراضية جاهزة |
| تكرار سطر كود عدد ثابت من المرات | استخدم `repeat(n) { }` | أوضح وأقصر من `for` في هذه الحالة |
| أكثر من فرعين لنفس المتغيّر | استخدم `when` | أوضح وأقل تكراراً من `if/else if` المتتالية |

### الأفكار الرئيسية الشاملة
الفكرة المحورية في هذه المحاضرة هي أن **Kotlin لغة آمنة النوع (type-safe) وآمنة من الـ null (null-safe) بتصميمها**، وأن الدوال فيها ليست مجرد أوامر بل **قيم حقيقية** يمكن التعامل معها مثل أي متغير آخر — وهذا هو الأساس الذي تُبنى عليه لاحقاً برمجة الواجهات التفاعلية في Jetpack Compose (حيث يُمرَّر السلوك كدوال lambda باستمرار).

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% | سيناريو كود 35% | تطبيق 40%.

### السؤال 1 (medium)
What is the default return type of a Kotlin function if none is specified?
أ) `Any`  ب) `Unit`  ج) `Void`  د) `Null`
**الإجابة الصحيحة: ب**
**التعليل:** النص الأصلي ينص صراحة أن النوع الافتراضي هو `Unit`. `Void` غير موجودة في Kotlin، و`Any` هو النوع الأعلى لكل الكائنات وليس نوع الإرجاع الافتراضي، و`Null` ليس نوعاً للإرجاع بل قيمة.

---

### السؤال 2 (medium)
Which keyword should you use to declare a variable whose value will change?
أ) `val`  ب) `var`  ج) `let`  د) `const`
**الإجابة الصحيحة: ب**
**التعليل:** `var` تسمح بإعادة تعيين القيمة، بينما `val` للقراءة فقط. `let` دالة scope وليست كلمة تعريف متغير، و`const` تُستخدم لثوابت زمن الترجمة ولها قواعد مختلفة لم تُذكر في المحاضرة.

---

### السؤال 3 (hard)
```kotlin
val languageName = "Kotlin"
languageName.inc()
```
What happens when this code compiles?
أ) يطبع "Kotlin+1"  ب) خطأ compilation لأن `inc()` خاصة بالأعداد  ج) يُرجع null  د) يعمل بدون مشاكل
**الإجابة الصحيحة: ب**
**التعليل:** الكمبايلر استنتج أن `languageName` من نوع `String`، و`inc()` عملية خاصة بـ `Int`، فيرفض الكمبايلر الكود قبل حتى تشغيله. لا علاقة لهذا بالطباعة أو null.

---

### السؤال 4 (medium)
Which operator lets you access a property of a nullable variable without crashing if it's null?
أ) `!!`  ب) `?:`  ج) `?.`  د) `::`
**الإجابة الصحيحة: ج**
**التعليل:** `?.` يفحص إن كان المتغير null قبل الوصول، ويُرجع null بأمان بدل الكراش. `!!` قد تسبب كراشاً، `?:` تُستخدم لإعطاء قيمة بديلة بعد `?.` وليست هي أداة الوصول نفسها، و`::` تُستخدم للإشارة لدالة كقيمة.

---

### السؤال 5 (hard)
```kotlin
var favoriteActor: String? = null
println(favoriteActor!!.length)
```
What is the result of running this code?
أ) يطبع 0  ب) يطبع null  ج) NullPointerException  د) خطأ compilation
**الإجابة الصحيحة: ج**
**التعليل:** `!!` تفترض أن القيمة ليست null، وبما أنها فعلياً null، يتحطم البرنامج أثناء التشغيل (runtime) برسالة `NullPointerException`. هذا ليس خطأ compilation لأن الكود صحيح نحوياً.

---

### السؤال 6 (medium)
What does the Elvis operator `?:` do?
أ) يوقف البرنامج إن كانت القيمة null  ب) يوفر قيمة بديلة إذا كانت النتيجة null  ج) يحوّل null إلى نص  د) يعرّف متغيراً جديداً
**الإجابة الصحيحة: ب**
**التعليل:** كما ورد في النص الأصلي، الجزء بعد `?:` ينفَّذ فقط إن كانت النتيجة قبله null، فيعطي قيمة بديلة بدلاً من إيقاف البرنامج.

---

### السؤال 7 (hard)
```kotlin
when (x) {
    2, 3, 5, 7 -> println("Prime")
    in 1..10 -> println("Between 1 and 10")
    else -> println("Other")
}
```
If `x = 4`, what is printed?
أ) Prime  ب) Between 1 and 10  ج) Other  د) لا شيء
**الإجابة الصحيحة: ب**
**التعليل:** 4 ليست ضمن القائمة (2,3,5,7) لكنها ضمن المدى 1..10، فيُطبع الفرع الثاني. الشروط تُفحص بالترتيب وتتوقف عند أول تطابق.

---

### السؤال 8 (medium)
Which of the following is NOT one of Kotlin's basic data types mentioned in the lecture?
أ) `String`  ب) `Boolean`  ج) `Character`  د) `Double`
**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة ذكرت `String`, `Int`, `Double`, `Float`, `Boolean` فقط؛ `Character` لم تُذكر ضمن الأنواع الأساسية في هذه المحاضرة تحديداً.

---

### السؤال 9 (hard)
```kotlin
fun trickOrTreat(isTrick: Boolean): () -> Unit {
    if (isTrick) { return trick } else { return treat }
}
```
What data type does the function `trickOrTreat` return?
أ) `Boolean`  ب) `String`  ج) `() -> Unit`  د) `Unit`
**الإجابة الصحيحة: ج**
**التعليل:** التوقيع صريح: `(): () -> Unit`، أي أن الدالة تُرجع **دالة أخرى** بلا معاملات ولا قيمة إرجاع. `Boolean` هو نوع المعامل المُدخل وليس المُرجَع، و`Unit` وحدها بدون الأقواس تعني عدم إرجاع أي شيء وهو غير صحيح هنا.

---

### السؤال 10 (medium)
In a lambda expression with a single unnamed parameter, what implicit name does Kotlin assign?
أ) `this`  ب) `it`  ج) `self`  د) `param`
**الإجابة الصحيحة: ب**
**التعليل:** كما ذُكر صراحة في المحاضرة، Kotlin يعطي المعامل الوحيد غير المسمّى اسم `it` تلقائياً لتقليل الكود.

---

### السؤال 11 (hard)
```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: ((Int) -> String)?): () -> Unit { ... }
val trickFunction = trickOrTreat(true, null)
```
Why is passing `null` for `extraTreat` valid here?
أ) لأن كل المعاملات في Kotlin nullable افتراضياً  ب) لأن النوع `((Int) -> String)?` معلَّم كـ nullable  ج) لأن `isTrick` صحيح  د) هذا خطأ ولن يُصرَّف الكود
**الإجابة الصحيحة: ب**
**التعليل:** علامة `؟` بعد قوس نوع الدالة تجعل المعامل قابلاً لحمل null، وهذا هو السبب الوحيد الصحيح؛ المعاملات في Kotlin ليست nullable افتراضياً، وصحة `isTrick` لا علاقة لها بذلك.

---

### السؤال 12 (medium)
What is the correct term for a function that takes another function as a parameter or returns a function?
أ) Lambda function  ب) Nested function  ج) Higher-order function  د) Anonymous function
**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة عرّفت هذا المصطلح صراحة عند شرح `repeat()`. `Lambda function` هي الدالة المجهولة نفسها، و`Nested/Anonymous` مصطلحات غير مطابقة للتعريف المذكور.

---

### السؤال 13 (hard)
```kotlin
repeat(4) { treatFunction() }
```
How many times will `treatFunction()` be executed?
أ) 3  ب) 4  ج) 5  د) غير محدد
**الإجابة الصحيحة: ب**
**التعليل:** `repeat(times, action)` تنفّذ `action` بالضبط `times` مرة، وهنا `times = 4`.

---

### السؤال 14 (medium)
Which shorthand syntax is used when a lambda is the last parameter of a function?
أ) Implicit `it`  ب) Function reference (`::`)  ج) Trailing lambda  د) Elvis operator
**الإجابة الصحيحة: ج**
**التعليل:** Trailing lambda تسمح بوضع الـ lambda خارج الأقواس عندما تكون آخر معامل، وهذا مختلف عن استخدام `it` (لحذف اسم المعامل) أو `::` (للإشارة لدالة موجودة).

---

### السؤال 15 (hard)
```kotlin
var favoriteActor: String? = "Sandra Oh"
val lengthOfName = favoriteActor?.length ?: 0
```
If `favoriteActor` is later set to `null`, what will `lengthOfName` equal (assuming it's recalculated)?
أ) `null`  ب) `9`  ج) `0`  د) NullPointerException
**الإجابة الصحيحة: ج**
**التعليل:** عند إعادة حساب التعبير مع `favoriteActor = null`، ستُرجع `?.` قيمة null، فيتدخل `?:` ويعطي القيمة البديلة `0` بدلاً من `null` أو حدوث كراش.

---

### السؤال 16 (medium)
Why is `val` generally preferred over `var` in Kotlin when possible?
أ) لأنه أسرع في التنفيذ  ب) لأنه يجعل القيمة غير قابلة لإعادة التعيين، مما يقلل الأخطاء  ج) لأن `var` غير مدعومة في كل الإصدارات  د) لا فرق فعلي بينهما
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة توصي باستخدام `val` عندما لا يُتوقع تغيّر القيمة لأن ذلك يجعل الكود أكثر أماناً وقابلية للتنبؤ. لا علاقة مباشرة بسرعة التنفيذ أو التوافق مع الإصدارات كما ورد في المحاضرة.

---

## الجزء الرابع: أسئلة تصحيح الكود

### Debug Question 1 — syntax

**The following code contains a bug:**
```kotlin
val count Int = 2
println(count)
```
**Find the bug:** missing colon (`:`) between the variable name and its type.

**Fixed code:**
```kotlin
val count: Int = 2
println(count)
```
**شرح الحل:**
1. صيغة تعريف المتغير في Kotlin تتطلب `:` بين الاسم والنوع.
2. بدون النقطتين، الكمبايلر لا يستطيع التفريق بين اسم المتغير ونوعه، فيرفض الكود.

---

### Debug Question 2 — logic

**The following code contains a bug:**
```kotlin
val trafficLightColor = "Green"
if (trafficLightColor = "Red") {
    println("Stop")
} else {
    println("Go")
}
```
**Find the bug:** used assignment `=` instead of comparison `==`.

**Fixed code:**
```kotlin
val trafficLightColor = "Green"
if (trafficLightColor == "Red") {
    println("Stop")
} else {
    println("Go")
}
```
**شرح الحل:**
1. `=` تُستخدم للتعيين (إسناد قيمة)، بينما `==` تُستخدم للمقارنة المنطقية.
2. استخدام `=` داخل شرط `if` إما يسبب خطأ compilation أو سلوكاً غير متوقع، والصحيح هو `==`.

---

### Debug Question 3 — return_check

**The following code contains a bug:**
```kotlin
fun birthdayGreeting(): String {
    val nameGreeting = "Happy Birthday, Rover!"
    println(nameGreeting)
}
```
**Find the bug:** الدالة معرَّفة بنوع إرجاع `String` لكنها لا تحتوي جملة `return`.

**Fixed code:**
```kotlin
fun birthdayGreeting(): String {
    val nameGreeting = "Happy Birthday, Rover!"
    return nameGreeting
}
```
**شرح الحل:**
1. أي دالة تحدد نوع إرجاع غير `Unit` يجب أن تحتوي `return` يُرجع قيمة من ذلك النوع.
2. مجرد الطباعة (`println`) لا تعتبر "إرجاعاً"، فيبقى الكمبايلر ينتظر `return`.

---

### Debug Question 4 — dead_code

**The following code contains a bug:**
```kotlin
fun trickOrTreat(isTrick: Boolean): () -> Unit {
    if (isTrick) {
        return trick
    }
    return treat
    println("This will never run")
}
```
**Find the bug:** السطر بعد `return treat` غير قابل للوصول أبداً (dead code) لأن الدالة تنتهي فوراً عند `return`.

**Fixed code:**
```kotlin
fun trickOrTreat(isTrick: Boolean): () -> Unit {
    if (isTrick) {
        return trick
    }
    return treat
}
```
**شرح الحل:**
1. أي كود بعد جملة `return` داخل نفس المسار التنفيذي لن يُنفَّذ أبداً.
2. يجب حذف هذا الكود الميت لأنه لا فائدة منه ويشير غالباً لخطأ في تنظيم الدالة.

---

### Debug Question 5 — misconception

**The following code contains a bug:**
```kotlin
var favoriteActor: String? = "Sandra Oh"
println(favoriteActor.length)
```
**Find the bug:** محاولة الوصول لخاصية `length` مباشرة على متغير nullable بدون `?.` أو `!!`.

**Fixed code:**
```kotlin
var favoriteActor: String? = "Sandra Oh"
println(favoriteActor?.length)
```
**شرح الحل:**
1. الطالب يظن أن كون القيمة الفعلية موجودة ("Sandra Oh") يكفي لتجاوز فحص null.
2. لكن الكمبايلر يفحص **النوع المُعلَن** (`String?`) وليس القيمة الفعلية وقت الكتابة، لذا يتطلب دائماً `?.` أو `!!` للوصول الآمن.

---

### Debug Question 6 — syntax

**The following code contains a bug:**
```kotlin
val coins: (Int) -> String = { quantity ->
    "$quantity quarters"
val treatFunction = trickOrTreat(false, coins)
```
**Find the bug:** القوس المجعّد `}` الخاص بالـ lambda مفقود قبل استخدام المتغير `coins`.

**Fixed code:**
```kotlin
val coins: (Int) -> String = { quantity ->
    "$quantity quarters"
}
val treatFunction = trickOrTreat(false, coins)
```
**شرح الحل:**
1. كل lambda expression يجب أن تُغلَق بقوس مجعّد `}` مطابق للقوس الذي بدأ بها `{`.
2. عدم إغلاق القوس يجعل الكمبايلر يعتبر السطر التالي جزءاً من جسم الـ lambda، مما يسبب خطأ compilation.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Traffic Light Rewrite — fill_gaps

**Scenario / Task:**
Rewrite the following `if/else if` chain using a `when` statement.
```kotlin
if (color == "Red") {
    println("Stop")
} else if (color == "Yellow") {
    println("Slow")
} else {
    println("Go")
}
```

**Requirements:**
1. Use `when` instead of `if/else if`.
2. Keep the same three outcomes.

**نموذج الحل:**
```kotlin
when (color) {
    "Red" -> println("Stop")
    "Yellow" -> println("Slow")
    else -> println("Go")
}
```
هنا استبدلنا كل `else if` بشرط جديد داخل `when`، وأبقينا `else` الأخيرة كحالة افتراضية.

---

### Exercise 2: Safe Access Practice — code_fix

**Scenario / Task:**
The following code crashes at runtime. Fix it using the safe call operator.
```kotlin
var petName: String? = null
println(petName.length)
```

**Requirements:**
1. Prevent the crash.
2. Print `null` instead if `petName` is null.

**نموذج الحل:**
```kotlin
var petName: String? = null
println(petName?.length)
```
باستخدام `?.` يتوقف الكمبايلر عن رفض الكود، ويُطبع `null` بدلاً من حدوث كراش.

---

### Exercise 3: Default Argument Design — scenario

**Scenario / Task:**
Write a function `orderCoffee(size: String = "Medium", withMilk: Boolean): String` that returns a sentence describing the order.

**Requirements:**
1. Use a default argument for `size`.
2. Call it once using the default, and once overriding it.

**نموذج الحل:**
```kotlin
fun orderCoffee(size: String = "Medium", withMilk: Boolean): String {
    val milkPart = if (withMilk) "with milk" else "without milk"
    return "One $size coffee, $milkPart."
}

fun main() {
    println(orderCoffee(withMilk = true))               // يستخدم Medium افتراضياً
    println(orderCoffee("Large", withMilk = false))      // يتجاوز القيمة الافتراضية
}
```
لاحظ أن `withMilk` ليس لها قيمة افتراضية، لذا يجب تمريرها دائماً، بينما `size` اختيارية.

---

### Exercise 4: Elvis Operator Chain — fill_gaps

**Scenario / Task:**
Complete the missing part to give a default age of `0` when `age` is null.
```kotlin
var age: Int? = null
val safeAge = age _______ 0
println(safeAge)
```

**Requirements:**
1. Fill in the missing operator.
2. Explain what would happen without it.

**نموذج الحل:**
```kotlin
var age: Int? = null
val safeAge = age ?: 0
println(safeAge)   // 0
```
بدون `?:`، سيكون نوع `safeAge` هو `Int?` وقد تحتاج لمعالجة null لاحقاً في كل مكان تُستخدم فيه القيمة.

---

### Exercise 5: Higher-order Function Design — scenario

**Scenario / Task:**
Write a function `applyDiscount(price: Double, discountFn: (Double) -> Double): Double` that applies a discount function to a price.

**Requirements:**
1. Accept a function as a parameter.
2. Call it with a lambda that reduces price by 10%.

**نموذج الحل:**
```kotlin
fun applyDiscount(price: Double, discountFn: (Double) -> Double): Double {
    return discountFn(price)
}

fun main() {
    val finalPrice = applyDiscount(100.0) { it * 0.9 }
    println(finalPrice)   // 90.0
}
```
استُخدمت trailing lambda لأن `discountFn` هي آخر معامل، و`it` تمثل السعر الأصلي `price`.

---

### Exercise 6: Repeat Loop Conversion — code_fix

**Scenario / Task:**
Convert the following `for` loop into a `repeat()` call.
```kotlin
for (i in 0..2) {
    println("Welcome!")
}
```

**Requirements:**
1. Use `repeat()` instead of `for`.
2. Produce the exact same output.

**نموذج الحل:**
```kotlin
repeat(3) {
    println("Welcome!")
}
```
حلقة `for (i in 0..2)` تُنفَّذ 3 مرات (0، 1، 2)، لذا فإن `repeat(3)` تعطي نفس عدد التكرارات بالضبط.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: When Statement with Ranges

**Input:**
```kotlin
val x = 6
when (x) {
    2, 3, 5, 7 -> println("Prime")
    in 1..10 -> println("Between 1 and 10")
    else -> println("Other")
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص القائمة (2,3,5,7) | ؟ |
| 2 | فحص المدى (1..10) | ؟ |
| 3 | الفرع المُنفَّذ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص القائمة (2,3,5,7) | 6 غير موجودة في القائمة → لا تطابق |
| 2 | فحص المدى (1..10) | 6 ضمن المدى → تطابق! |
| 3 | الفرع المُنفَّذ | "Between 1 and 10" |

**Result:** `Between 1 and 10`

---

### Trace Exercise 2: Elvis Operator with Reassignment

**Input:**
```kotlin
var favoriteActor: String? = "Sandra Oh"
println(favoriteActor?.length ?: 0)
favoriteActor = null
println(favoriteActor?.length ?: 0)
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | القيمة الأولى لـ favoriteActor | ؟ |
| 2 | نتيجة الطباعة الأولى | ؟ |
| 3 | القيمة بعد إعادة التعيين | ؟ |
| 4 | نتيجة الطباعة الثانية | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | القيمة الأولى لـ favoriteActor | "Sandra Oh" |
| 2 | نتيجة الطباعة الأولى | 9 (طول "Sandra Oh") |
| 3 | القيمة بعد إعادة التعيين | null |
| 4 | نتيجة الطباعة الثانية | 0 (لأن `?.` أرجعت null فتدخّلت `?:`) |

**Result:**
```
9
0
```

---

### Trace Exercise 3: Function Returning a Function

**Input:**
```kotlin
fun trickOrTreat(isTrick: Boolean): () -> Unit {
    if (isTrick) { return trick } else { return treat }
}
val trick = { println("No treats!") }
val treat = { println("Have a treat!") }

fun main() {
    val f1 = trickOrTreat(false)
    val f2 = trickOrTreat(true)
    f1()
    f2()
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استدعاء trickOrTreat(false) | ؟ |
| 2 | استدعاء trickOrTreat(true) | ؟ |
| 3 | استدعاء f1() | ؟ |
| 4 | استدعاء f2() | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استدعاء trickOrTreat(false) | isTrick=false → يُرجع الدالة treat |
| 2 | استدعاء trickOrTreat(true) | isTrick=true → يُرجع الدالة trick |
| 3 | استدعاء f1() | ينفّذ treat → يطبع "Have a treat!" |
| 4 | استدعاء f2() | ينفّذ trick → يطبع "No treats!" |

**Result:**
```
Have a treat!
No treats!
```

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: Type Safety Flowchart

**Task:**
Design a flowchart (using `diagram` block) that shows the decision process for choosing between `?.`, `!!`, and `?:` when handling a nullable variable in Kotlin.

**نموذج الإجابة:**
```diagram
type: decision-tree
title: اختيار أداة التعامل مع Nullable
direction: TD
nodes:
  - id: start
    label: "هل المتغير nullable؟"
    kind: decision
    level: 0
  - id: notnull
    label: "استخدمه مباشرة"
    kind: event
    level: 1
  - id: sure
    label: "هل أنت متأكد 100% أنه ليس null الآن؟"
    kind: decision
    level: 1
  - id: bang
    label: "استخدم !!"
    kind: process
    level: 2
  - id: needDefault
    label: "هل تريد قيمة بديلة عند null؟"
    kind: decision
    level: 2
  - id: elvis
    label: "استخدم ?: مع ?."
    kind: process
    level: 3
  - id: safecall
    label: "استخدم ?. فقط"
    kind: process
    level: 3
edges:
  - from: start
    to: notnull
    label: "لا"
  - from: start
    to: sure
    label: "نعم"
  - from: sure
    to: bang
    label: "نعم"
  - from: sure
    to: needDefault
    label: "لا"
  - from: needDefault
    to: elvis
    label: "نعم"
  - from: needDefault
    to: safecall
    label: "لا"
```

**معايير التقييم:**
- وجود جميع المسارات الثلاثة (`?.`, `!!`, `?:`) في المخطط.
- وضوح شرط "هل أنت متأكد أنه ليس null" كنقطة تفرّع رئيسية.
- تسمية الأسهم بشكل يعكس منطق القرار (نعم/لا).

---

### Design Question 2: Higher-order Function Architecture

**Task:**
Design (as a table + short description) a small system where a function `processOrder` takes an `Int` (order id) and a function `onComplete: (Boolean) -> Unit` as parameters, and calls `onComplete` with `true` if the order id is positive, or `false` otherwise.

**نموذج الإجابة:**
| العنصر | النوع | الدور |
| --- | --- | --- |
| `processOrder` | Higher-order function | تستقبل رقم الطلب ودالة رد الفعل |
| `orderId` | `Int` | معرّف الطلب المطلوب معالجته |
| `onComplete` | `(Boolean) -> Unit` | دالة تُستدعى بعد المعالجة بنتيجة true/false |

```kotlin
fun processOrder(orderId: Int, onComplete: (Boolean) -> Unit) {
    val success = orderId > 0
    onComplete(success)
}

fun main() {
    processOrder(5) { result ->
        println(if (result) "Order processed!" else "Invalid order.")
    }
}
```

**معايير التقييم:**
- استخدام trailing lambda بشكل صحيح.
- منطق واضح لتحديد `true`/`false` بناءً على شرط بسيط.
- تسمية واضحة للمعامل ونوع الدالة الممرَّرة.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What keyword starts a function definition in Kotlin?
A: `fun`

---

**Q2:** What is the difference between `val` and `var`?
A: `val` is read-only (cannot be reassigned); `var` is mutable (can be reassigned).

---

**Q3:** What happens if you don't provide an initial value when declaring a variable?
A: You must explicitly specify the data type.

---

**Q4:** What is the default return type of a Kotlin function?
A: `Unit`, meaning the function doesn't return a value.

---

**Q5:** How do you declare a nullable variable in Kotlin?
A: Add a `?` after the data type, e.g., `String?`.

---

**Q6:** What does the `?.` safe call operator do?
A: It safely accesses a property or method, returning `null` instead of crashing if the variable is `null`.

---

**Q7:** What risk does the `!!` not-null assertion operator carry?
A: It can throw a `NullPointerException` at runtime if the variable is actually `null`.

---

**Q8:** What does the `?:` Elvis operator provide?
A: A default value to use when the expression before it evaluates to `null`.

---

**Q9:** What is a lambda expression?
A: A concise way to define a function without the `fun` keyword, often stored directly in a variable or passed inline.

---

**Q10:** What implicit name is given to a lambda's single unnamed parameter?
A: `it`

---

**Q11:** What is a "trailing lambda"?
A: Writing the lambda expression outside the parentheses when it is the last parameter of a function call.

---

**Q12:** What is a higher-order function?
A: A function that takes another function as a parameter, returns a function, or both.

---

**Q13:** What is the function signature of `repeat()`?
A: `repeat(times: Int, action: (Int) -> Unit)`

---

**Q14:** When is `when` preferred over `if/else`?
A: When there are more than two branches to consider.

---

**Q15:** How do you check a value's type inside a `when` statement?
A: Using the `is` keyword, e.g., `is Int -> ...`.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

الكود التالي يجمّع مثال "Trick or Treat" الذي وردت أجزاؤه متفرّقة عبر عدة شرائح في المحاضرة، في برنامج واحد متكامل يمكن تشغيله مباشرة:

```kotlin
// Function type declared as nullable — extraTreat may or may not be provided
fun trickOrTreat(isTrick: Boolean, extraTreat: ((Int) -> String)?): () -> Unit {
    if (isTrick) {
        return trick                                  // returns a function reference
    } else {
        if (extraTreat != null) {                      // null check before calling
            println(extraTreat(5))                     // call the passed-in lambda
        }
        return treat
    }
}

// Lambda expressions stored directly in variables (function types)
val trick = { println("No treats!") }
val treat = { println("Have a treat!") }

fun main() {
    // Trailing lambda with implicit "it" parameter
    val treatFunction = trickOrTreat(false) { "$it quarters" }
    val trickFunction = trickOrTreat(true, null)

    // repeat() as a higher-order function to call treatFunction 4 times
    repeat(4) { treatFunction() }
    trickFunction()
}
```

**المكتبات المطلوبة (Imports):**
> لا حاجة لأي `import` — كل ما سبق من دوال Kotlin الأساسية (`println`, `repeat`) متاح تلقائياً.

**الناتج المتوقع (لقطة الشاشة):**
> ```
> 5 quarters
> Have a treat!
> Have a treat!
> Have a treat!
> Have a treat!
> No treats!
> ```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: Explain the difference between `val` and `var`, and when each should be used.
**نموذج الإجابة:** `val` هو متغير للقراءة فقط (read-only)، يُستخدم عندما لا نتوقع تغيّر القيمة بعد التعيين. `var` متغير قابل للتغيير (mutable)، يُستخدم عندما نعلم أن القيمة ستتغيّر خلال تنفيذ البرنامج. القاعدة العامة هي البدء بـ `val` دائماً، والانتقال لـ `var` فقط عند الحاجة الفعلية.

---

### Question 2: What is type inference, and what happens if no initial value is given?
**نموذج الإجابة:** الاستدلال على النوع (Type Inference) هو قدرة الكمبايلر على تحديد نوع بيانات المتغير تلقائياً من قيمته الابتدائية، دون كتابة النوع صراحة. مثال: `val x = 5` يُستنتج كـ `Int`. لكن إن لم تُعطَ قيمة ابتدائية (`val x: Int`)، يصبح تحديد النوع **إلزامياً** لأنه لا يوجد ما يستدل منه الكمبايلر.

---

### Question 3: Compare `if/else` and `when` statements — when should each be used?
**نموذج الإجابة:** `if/else` مناسبة لفرعين (شرط صحيح/خطأ)، بينما `when` أنسب عند وجود ثلاثة فروع أو أكثر لنفس المتغير، لأنها أوضح وأقل تكراراً. كلاهما يمكن استخدامه كـ statement (لتنفيذ أوامر) أو كـ expression (لإرجاع قيمة تُخزَّن مباشرة في متغير).

---

### Question 4: Describe null safety in Kotlin and the tools available to handle it.
**نموذج الإجابة:** الأمان من null (Null Safety) هو ضمان Kotlin ألا يحدث وصول عرضي لعضو (member) في متغير قيمته null دون فحص مسبق. الأدوات المتاحة: `?` لتعريف نوع nullable، `?.` للوصول الآمن (يُرجع null إن كانت القيمة null)، `!!` للتأكيد القسري (خطر، قد يسبب NullPointerException)، و`?:` (Elvis) لتوفير قيمة بديلة عند null.

---

### Question 5: What is a function type in Kotlin, and how is it written?
**نموذج الإجابة:** نوع الدالة (Function Type) هو تمثيل الدالة كنوع بيانات، ويُكتب بصيغة `(المعاملات) -> نوع الإرجاع`، مثل `(Int) -> String` لدالة تأخذ `Int` وتُرجع `String`. هذا يسمح بتخزين الدوال في متغيرات، تمريرها كمعاملات، أو إرجاعها من دوال أخرى.

---

### Question 6: Explain what a higher-order function is, with an example from the lecture.
**نموذج الإجابة:** الدالة من الدرجة الأعلى (Higher-order Function) هي دالة تأخذ دالة أخرى كمعامل، أو تُرجع دالة، أو كليهما. مثال من المحاضرة: `repeat(times: Int, action: (Int) -> Unit)` تأخذ دالة `action` كمعامل وتنفّذها عدد `times` من المرات، وكذلك `trickOrTreat()` التي تُرجع دالة (`() -> Unit`).

---

### Question 7: What are the shorthand syntaxes available for writing lambda expressions?
**نموذج الإجابة:** توجد ثلاثة اختصارات رئيسية: (1) حذف اسم المعامل الوحيد واستخدام `it` تلقائياً، (2) تمرير الـ lambda مباشرة كقيمة داخل استدعاء الدالة دون تخزينها في متغير منفصل، (3) استخدام Trailing Lambda، أي كتابة الـ lambda خارج الأقواس عندما تكون آخر معامل في الدالة.

---

### Question 8: Why does Kotlin require a colon and explicit type when declaring a variable without an initial value?
**نموذج الإجابة:** لأن الاستدلال على النوع (Type Inference) يعتمد كلياً على القيمة الابتدائية المُعطاة؛ فإن لم توجد قيمة، لا يملك الكمبايلر أي معلومة يستنتج منها النوع، لذا يصبح تحديد النوع صراحة (بعد `:`) إلزامياً لضمان أمان النوع (type safety) في البرنامج.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين `val` و `var` بمثال.
- [ ] أفهم متى يكون تحديد النوع صراحة إلزامياً.
- [ ] أستطيع كتابة شرط `if/else` و`when` وتحويل أحدهما للآخر.
- [ ] أفهم كيف تُقيَّم شروط `when` بالترتيب وتتوقف عند أول تطابق.
- [ ] أفرّق بين `?.` و`!!` و`?:` وأعرف متى أستخدم كلاً منها.
- [ ] أستطيع تعريف دالة، تحديد معاملاتها، ونوع إرجاعها.
- [ ] أفهم معنى `Unit` ومتى لا أحتاج لكتابة `return`.
- [ ] أستطيع كتابة قيمة افتراضية لمعامل دالة (default argument).
- [ ] أفهم مفهوم "الدوال كنوع بيانات" وكيف تُكتب (`(Int) -> String`).
- [ ] أستطيع تخزين lambda في متغير، وتمريرها كمعامل، وإرجاعها من دالة.
- [ ] أفهم اختصارات كتابة الـ lambda: `it`، التمرير المباشر، وTrailing Lambda.
- [ ] أعرف الفرق بين function type عادي ونظيره nullable (`(...) -> Type)?`).
- [ ] أفهم معنى Higher-order Function وأستطيع إعطاء مثال (`repeat()`).
- [ ] أستطيع تتبع تنفيذ برنامج يستخدم دوال متداخلة أو lambda خطوة بخطوة.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Kotlin Basics (هذه المحاضرة) | Kotlin OOP | المتغيرات والدوال هي أساس الخصائص (properties) والدوال (methods) داخل الأصناف |
| Kotlin Basics | Compose UI | الـ Lambda expressions هنا هي نفسها ما يُستخدم لاحقاً في `@Composable` و `Modifier` وأحداث النقر |
| Nullability | Compose State | فهم `?.` و`?:` ضروري عند التعامل مع بيانات قد لا تكون متوفرة في الواجهات |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| المتغيرات | `val` افتراضياً، النوع إلزامي بدون قيمة ابتدائية |
| الشروط | `when` للفروع المتعددة، ترتيب الشروط مهم |
| Nullability | `?.` آمن، `!!` خطر، `?:` للقيمة البديلة |
| الدوال | `Unit` افتراضي، الدوال قيم حقيقية يمكن تخزينها وتمريرها |
| Lambda | `it` للمعامل الوحيد، Trailing Lambda لآخر معامل |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `?` | نوع قابل لـ null | تعريف متغيرات |
| `?.` | استدعاء آمن | الوصول لخصائص قد تكون null |
| `!!` | تأكيد قسري | عند التأكد الكامل من عدم وجود null |
| `?:` | قيمة بديلة (Elvis) | إعطاء افتراضي عند null |
| `->` | فصل معاملات lambda عن الجسم / تعريف function type | lambda expressions وfunction types |
| `it` | المعامل الضمني الوحيد | lambda ذات معامل واحد |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | استخدم `val` دائماً إلا إذا كنت متأكداً أن القيمة ستتغيّر |
| 2 | بدون قيمة ابتدائية، النوع يصبح إلزامياً |
| 3 | لا تستخدم `!!` إلا عند يقين تام أن القيمة ليست null |
| 4 | `when` أوضح من سلسلة طويلة من `else if` |
| 5 | الدوال في Kotlin قيم حقيقية: خزّنها، مرّرها، أرجعها بحرية |
| 6 | Trailing Lambda تُستخدم فقط عندما تكون الـ lambda آخر معامل |

<!-- VALIDATION: تم تغطية كل الشرائح 1–42 من محاضرة "Kotlin Fundamentals for Android -1-": مقدمة main، تعريف المتغيرات (val/var/أنواع البيانات)، Type Inference، الشروط (if/else, else if, when بأنواعها الثلاثة, expressions)، Nullability (nullable types, ?., !!, ?:)، الدوال (تعريف، استدعاء، return type، parameters، default arguments)، أنواع الدوال والـ Lambda (function reference ::، lambda expression، function type، إرجاع دالة، تمرير دالة كمعامل، nullable function types، اختصارات it/direct-pass/trailing lambda)، ودالة repeat(). تم الالتزام ببنية القالب في android-k.md: خريطة تكامل، شرح تفصيلي مرقّم مع اقتباسات إنجليزية وشرح عربي، ملخص شامل بجداول وخوارزميات، 16 MCQ (تعليل كامل)، 6 أسئلة تصحيح كود (أنواع متنوعة)، 6 تمارين إضافية، 3 تمارين تتبع، 2 سؤال تصميم، 15 بطاقة Q&A، كود كامل مجمّع، 8 أسئلة نظرية، قائمة فحص ذاتي، وcheat sheet. -->

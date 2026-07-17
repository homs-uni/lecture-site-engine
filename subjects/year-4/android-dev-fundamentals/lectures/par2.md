# المحاضرة 1 — Kotlin Basics (أساسيات كوتلن)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** Kotlin Fundamentals for Android -1- (Variable Declaration, Conditionals, Nullability, Functions, Lambda Expressions)

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| أساسيات البرمجة العامة | متغيرات، دوال، شروط | فهم عام للبرمجة |
| Kotlin Basics ← أنت هنا | `val/var`، `Type Inference`، `if/when`، `Null Safety (?.)`، `Functions`، `Lambdas`، `repeat()` | كتابة برامج Kotlin بسيطة تعمل خارج أندرويد |
| Kotlin OOP | `class`، `inheritance`، `constructor` | بناء كائنات ونماذج بيانات |
| Compose UI | `@Composable`، `Modifier` | بناء واجهات مستخدم فعلية لأندرويد |

> **نوع هذه المحاضرة:** محاضرة نظرية-كودية (Kotlin Basics) — تركّز على أساسيات اللغة قبل الدخول لتطوير أندرويد الفعلي، وتُعتبر حجر الأساس لكل ما يليها من OOP و Compose.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مقدمة عن لغة Kotlin ودالة main

#### النص الأصلي يقول (English):
> Kotlin is a programming language widely used by Android developers everywhere. A Kotlin program is required to have a main function, which is the specific place in your code where the program starts running. The main function is the entry point, or starting point, of the program.

#### الترجمة الحرفية:
> كوتلن هي لغة برمجة مستخدَمة على نطاق واسع من قبل مطوّري أندرويد في كل مكان. برنامج كوتلن يتطلّب وجود دالة main، وهي المكان المحدد في الكود حيث يبدأ البرنامج بالتنفيذ. دالة main هي نقطة الدخول، أو نقطة البداية، للبرنامج.

#### الشرح المبسّط:
كوتلن هي اللغة الرسمية المعتمدة من Google لتطوير تطبيقات أندرويد، ولهذا فهي نقطة الانطلاق الإلزامية لأي شخص يريد دخول هذا المجال. دالة `main()` مهمة لأن أي برنامج، مهما كان حجمه، يحتاج نقطة بداية واحدة يعرف منها نظام التشغيل من أين يبدأ التنفيذ؛ بدونها لا يوجد "أول سطر" يُنفَّذ. تخيّل الأمر مثل كتاب لا يمكن قراءته إلا من صفحته الأولى المحددة — `main()` هي تلك الصفحة الأولى للبرنامج. مثال عملي: عند تشغيل أي تطبيق Kotlin بسيط (`fun main() { println("Hello, world!") }`)، فإن أول سطر يُنفَّذ هو ما بداخل هذه الدالة بالتحديد.

**لماذا؟** لأن الحاسوب لا يستطيع تخمين أين يبدأ التنفيذ في ملف يحتوي عدة دوال؛ لذلك تفرض اللغة وجود نقطة دخول موحّدة اسمها `main`.

---

### 2. صيغة إعلان المتغيرات (val)

#### النص الأصلي يقول (English):
> To define a new variable, start with the Kotlin keyword val. After the variable name, you add a colon, a space, and then the data type of the variable. The variable value is the actual data that's stored in the variable. The initial value will be different depending on the data type declared for the variable.

#### الترجمة الحرفية:
> لتعريف متغيّر جديد، ابدأ بكلمة كوتلن المفتاحية val. بعد اسم المتغيّر، تضيف نقطتين، مسافة، ثم نوع بيانات المتغيّر. قيمة المتغيّر هي البيانات الفعلية المخزَّنة في المتغيّر. القيمة الابتدائية ستختلف حسب نوع البيانات المُعلَن للمتغيّر.

#### الشرح المبسّط:
هذه هي الصيغة الأساسية التي تُبنى عليها كل برامج كوتلن: `val name: Type = value`. أهميتها أنها تحدد بوضوح ثلاثة أشياء دفعة واحدة: اسم المتغيّر، نوعه، وقيمته الابتدائية، مما يمنع الأخطاء الناتجة عن استخدام نوع بيانات خاطئ لاحقاً. تشبيه يومي: فكّر بالمتغيّر كصندوق له اسم مكتوب عليه (name)، ونوع محتوى محدد سلفاً (data type) — مثلاً صندوق مخصص للأرقام فقط — ثم توضع بداخله قيمة فعلية (initial value). مثال عملي: `val count: Int = 2` يعني إنشاء صندوق اسمه count، مخصص للأعداد الصحيحة فقط، ويحتوي حالياً على القيمة 2.

**لماذا؟** لأن تحديد النوع بشكل صريح يساعد المترجم (compiler) على اكتشاف الأخطاء البرمجية مبكراً قبل تشغيل البرنامج.

---

### 3. الفرق بين val و var

#### النص الأصلي يقول (English):
> If you need to update the value of a variable, declare the variable with the Kotlin keyword var, instead of val. val keyword - Use when you expect the variable value will not change. var keyword - Use when you expect the variable value can change. With val, the variable is read-only, which means you can only read, or access, the value of the variable. Once the value is set, you cannot edit or modify its value. With var, the variable is mutable, which means the value can be changed or modified. The value can be mutated.

#### الترجمة الحرفية:
> إذا احتجت لتحديث قيمة متغيّر، أعلن المتغيّر بكلمة كوتلن المفتاحية var، بدلاً من val. كلمة val - استخدمها عندما تتوقع أن قيمة المتغيّر لن تتغيّر. كلمة var - استخدمها عندما تتوقع أن قيمة المتغيّر يمكن أن تتغيّر. مع val، المتغيّر يكون للقراءة فقط، وهذا يعني أنك تستطيع فقط قراءة، أو الوصول إلى، قيمة المتغيّر. بمجرد تعيين القيمة، لا يمكنك تعديلها أو تغييرها. مع var، المتغيّر يكون قابلاً للتغيير، وهذا يعني أن القيمة يمكن تغييرها أو تعديلها. القيمة يمكن أن تتحوّر (تتبدّل).

#### الشرح المبسّط:
هذا الفرق هو من أهم مفاهيم كوتلن لأنه يرتبط مباشرة بمبدأ الأمان في البرمجة (immutability)؛ فاستخدام `val` كلما أمكن يقلل من الأخطاء لأن القيمة لا يمكن تعديلها بالخطأ في مكان آخر من الكود. يرتبط هذا المفهوم بما سبق (البند 2) لأنه يوسّع صيغة الإعلان بإضافة خيار ثانٍ (var) عندما تكون القيمة متغيّرة بطبيعتها. تشبيه يومي: `val` أشبه برقم الهوية الوطني — يُحدَّد مرة واحدة ولا يتغيّر، بينما `var` أشبه برصيد حساب بنكي يتغيّر باستمرار حسب الإيداع والسحب. مثال عملي: عمر شخص أو اسمه لا يتغيّران أثناء تنفيذ البرنامج فيُستخدم لهما `val`، أما عدد الرسائل غير المقروءة فيتغيّر باستمرار فيُستخدم له `var`.

**لماذا؟** لأن تفضيل `val` يجعل الكود أكثر أماناً وقابلية للتنبؤ، إذ يمنع أي تعديل غير مقصود على القيم الثابتة.

---

### 4. أنواع البيانات الأساسية في Kotlin

#### النص الأصلي يقول (English):
> In Kotlin, there are some common basic data types: String (Text), Int (Integer number), Double (Decimal number), Float (Decimal number that is less precise than a Double, has an f or F at the end of the number), Boolean (true or false, use this data type when there are only two possible values).

#### الترجمة الحرفية:
> في كوتلن، توجد بعض أنواع البيانات الأساسية الشائعة: String (نص)، Int (عدد صحيح)، Double (عدد عشري)، Float (عدد عشري أقل دقة من Double، وله حرف f أو F في نهاية العدد)، Boolean (صحيح أو خاطئ، استخدم هذا النوع عندما توجد قيمتان محتملتان فقط).

#### الشرح المبسّط:
معرفة أنواع البيانات الأساسية ضرورية لأن كل قيمة في البرنامج يجب أن يكون لها نوع محدد يخبر المترجم كيف يتعامل معها في الذاكرة والعمليات الحسابية. هذا يرتبط مباشرة بالبند 2 لأن هذه الأنواع هي بالضبط ما يوضع في خانة `data type` عند إعلان المتغيّر. تشبيه يومي: تخيّل نوع البيانات كوعاء مخصص — وعاء للنصوص كالكتاب، ووعاء للأعداد الصحيحة كعدّاد الخطوات، ووعاء منطقي (Boolean) كمفتاح كهرباء له وضعان فقط (تشغيل/إطفاء). مثال عملي: `val name: String = "Ali"`، `val age: Int = 20`، `val isStudent: Boolean = true`.

**لماذا؟** لأن اختيار النوع الصحيح يمنع أخطاء منطقية وحسابية، مثل محاولة جمع نص مع رقم.

| Kotlin data type | نوع البيانات التي يحتويها | أمثلة قيم حرفية |
| --- | --- | --- |
| `String` | نص | `"Add contact"`, `"Search"`, `"Sign in"` |
| `Int` | عدد صحيح | `32`, `1293490`, `-59281` |
| `Double` | عدد عشري | `2.0`, `501.0292`, `-31723.99999` |
| `Float` | عدد عشري أقل دقة (ينتهي بـ f/F) | `5.0f`, `-1630.209f`, `1.2940278F` |
| `Boolean` | `true` أو `false` فقط | `true`, `false` |

---

### 5. استخدام المتغيّر و String Template

#### النص الأصلي يقول (English):
> A string template contains a template expression, which is a dollar sign ($) followed by a variable name. A template expression is evaluated, and its value gets substituted into the string.

#### الترجمة الحرفية:
> قالب النص (string template) يحتوي على تعبير قالب (template expression)، وهو علامة الدولار ($) متبوعة باسم متغيّر. يتم تقييم تعبير القالب، وقيمته تُستبدَل داخل النص.

#### الشرح المبسّط:
قوالب النصوص هي وسيلة سريعة لدمج قيمة متغيّر داخل جملة نصية دون الحاجة لعمليات دمج نصوص معقدة (concatenation). ترتبط هذه الفكرة بالمتغيّرات السابقة لأنها الطريقة الأشيع لعرض قيمة متغيّر للمستخدم عبر `println`. تشبيه يومي: مثل ترك فراغ في خطاب مطبوع مسبقاً وكتابة اسم المستلم يدوياً فيه — العلامة `$count` هي ذلك الفراغ الذي يُملأ تلقائياً بقيمة `count`. مثال عملي: `println("You have $count unread messages.")` تطبع "You have 2 unread messages." إذا كانت قيمة count تساوي 2.

**لماذا؟** لأنها تجعل الكود أقصر وأوضح مقارنة بجمع النصوص يدوياً بعلامة الجمع (+).

```kotlin
// Declare an integer variable
val count: Int = 2
// Print the variable value directly
println(count)
// Use string template to embed variable inside text
println("You have $count unread messages.")
```

#### شرح كل سطر:
1. `val count: Int = 2` → إعلان متغيّر ثابت من نوع عدد صحيح بقيمة 2 — أساس التخزين.
2. `println(count)` → طباعة القيمة مباشرة — الناتج: `2`.
3. `println("You have $count unread messages.")` → دمج القيمة داخل نص باستخدام `$` — الناتج: `You have 2 unread messages.`

> **الناتج المتوقع:**
> ```
> 2
> You have 2 unread messages.
> ```

---

### 6. مفهوم Type Inference (الاستدلال على النوع)

#### النص الأصلي يقول (English):
> Type inference is when the Kotlin compiler can infer (or determine) what data type a variable should be, without the type being explicitly written in the code. Note: If you don't provide an initial value when you declare a variable, you must specify the type.

#### الترجمة الحرفية:
> الاستدلال على النوع (Type inference) هو عندما يستطيع مترجم كوتلن أن يستنتج (أو يحدد) ما هو نوع البيانات الذي يجب أن يكون عليه المتغيّر، دون أن يُكتب النوع صراحة في الكود. ملاحظة: إذا لم تُقدّم قيمة ابتدائية عند إعلان المتغيّر، يجب عليك تحديد النوع.

#### الشرح المبسّط:
هذا المفهوم يسمح باختصار صيغة الإعلان التي تعلّمناها في البند 2، فبدلاً من كتابة `val count: Int = 2` يمكن الاكتفاء بـ `val count = 2` وسيستنتج المترجم بنفسه أن النوع هو `Int`. أهمية ذلك أنه يجعل الكود أقصر وأنظف دون التضحية بالأمان، لأن المترجم لا يزال يفرض النوع خلف الكواليس. تشبيه يومي: مثل موظف استقبال ذكي يستنتج من شكل الشخص ولباسه أنه "زبون" دون أن تخبره أنت صراحة بذلك. مثال عملي: `val languageName = "Kotlin"` يجعل المترجم يعرف تلقائياً أن `languageName` هو `String` بدون كتابة `: String`.

**لماذا؟** لأن كتابة النوع في كل مرة يكون أحياناً زائداً عن الحاجة إذا كانت القيمة الابتدائية كافية لتحديده بوضوح.

---

### 7. تطبيق Type Inference وحدوده (أمان النوع)

#### النص الأصلي يقول (English):
> languageName is inferred as a String, so you can't call any functions that aren't part of the String class. toUpperCase() is a function that can only be called on variables of type String. inc() is an Int operator function, so it can't be called on a String. Kotlin's approach to type inference gives you both conciseness and type-safety.

#### الترجمة الحرفية:
> يتم استنتاج أن languageName من نوع String، لذلك لا يمكنك استدعاء أي دوال ليست جزءاً من صنف String. toUpperCase() هي دالة يمكن استدعاؤها فقط على متغيّرات من نوع String. inc() هي دالة عامل خاصة بـ Int، لذلك لا يمكن استدعاؤها على String. أسلوب كوتلن في الاستدلال على النوع يمنحك الإيجاز وأمان النوع معاً.

#### الشرح المبسّط:
حتى مع الاستدلال التلقائي على النوع، يبقى المترجم صارماً بنفس درجة صرامته مع الأنواع المكتوبة يدوياً؛ فبمجرد أن يستنتج أن المتغيّر من نوع `String`، فإنه يمنع استدعاء أي دالة خاصة بأنواع أخرى مثل `Int`. هذا يكمل البند السابق (6) لأنه يوضح أن "الاختصار" في الكتابة لا يعني "التنازل" عن الفحص والتحقق. تشبيه يومي: تماماً كما لا يمكنك استخدام مفتاح سيارة لفتح باب منزل حتى لو كان الاثنان "مفاتيح" بشكل عام، لا يمكن استخدام دالة خاصة بالأرقام على نص. مثال عملي: `languageName.toUpperCase()` تعمل لأن languageName نص، لكن `languageName.inc()` تفشل بالترجمة لأن `inc()` مخصصة للأعداد فقط.

**لماذا؟** لأن هذا التوازن بين الإيجاز والأمان (type-safety) هو ما يميز كوتلن عن اللغات الديناميكية التي لا تتحقق من الأنواع إلا أثناء التشغيل.

---

### 8. الجمل الشرطية if/else

#### النص الأصلي يقول (English):
> In Kotlin, when you want your program to perform different actions based on a condition, you can use an if/else statement.

#### الترجمة الحرفية:
> في كوتلن، عندما تريد لبرنامجك أن ينفّذ أفعالاً مختلفة بناءً على شرط، يمكنك استخدام جملة if/else.

#### الشرح المبسّط:
جملة `if/else` هي الأداة الأساسية لاتخاذ القرار في البرمجة؛ فبدونها سيُنفَّذ البرنامج بنفس الطريقة دائماً بغض النظر عن الظروف. هذا المفهوم منفصل عن مواضيع المتغيّرات السابقة لكنه يعتمد عليها، إذ غالباً ما يكون الشرط مبنياً على قيمة متغيّر مثل `trafficLightColor`. تشبيه يومي: مثل قرار "إذا كانت إشارة المرور حمراء، توقف؛ وإلا، تابع السير" — القرار يعتمد كلياً على حالة الإشارة في تلك اللحظة. مثال عملي من المحاضرة: التحقق من قيمة `trafficLightColor` وطباعة "Stop" أو "Go" حسب قيمتها.

**لماذا؟** لأن البرامج الحقيقية نادراً ما تكون خطية بسيطة، بل تحتاج للتفرع بناءً على مدخلات أو حالات مختلفة.

```kotlin
// Declare a variable holding traffic light color
val trafficLightColor = "Green"
// Check condition: if color is Red
if (trafficLightColor == "Red") {
    println("Stop")
// Otherwise (any other color)
} else {
    println("Go")
}
```

#### شرح كل سطر:
1. `val trafficLightColor = "Green"` → متغيّر ثابت يحمل قيمة نصية "Green".
2. `if (trafficLightColor == "Red")` → فحص هل القيمة تساوي "Red" تماماً.
3. `println("Stop")` → يُنفَّذ فقط إذا كان الشرط صحيحاً.
4. `else { println("Go") }` → يُنفَّذ إذا كان الشرط خاطئاً — وهنا الناتج "Go" لأن اللون أخضر.

> **الناتج المتوقع:** `Go`

---

### 9. سلسلة else if لعدة شروط

#### النص الأصلي يقول (English):
> When you face multiple decision points, you need to create conditionals with multiple layers of conditions, which you can do when you add else if branches to if/else statements.

#### الترجمة الحرفية:
> عندما تواجه نقاط قرار متعددة، تحتاج لإنشاء جمل شرطية بطبقات متعددة من الشروط، وهو ما يمكنك فعله عند إضافة فروع else if إلى جمل if/else.

#### الشرح المبسّط:
هذا امتداد طبيعي للبند السابق (8) لأنه يحل مشكلة وجود أكثر من احتمالين؛ فبدلاً من الاكتفاء بحالتين (صحيح/خطأ)، يسمح `else if` بإضافة طبقات فحص متتالية. أهميته أنه يجعل الكود قادراً على التعامل مع سيناريوهات واقعية أكثر تعقيداً، كإشارة مرور لها ثلاثة ألوان وليس لوناً واحداً فقط. تشبيه يومي: مثل نظام فرز في مطار يفحص جواز السفر أولاً، وإن لم يُطابق فئة معينة يفحص فئة أخرى، وهكذا حتى يصل لفئة مطابقة أو يرفض الجميع. مثال عملي من المحاضرة: فحص قيمة `trafficLightColor` مقابل "Red" ثم "Yellow" ثم "Green"، وأخيراً `else` لأي قيمة غير متوقعة مثل "Black".

**لماذا؟** لأن الاكتفاء بـ if/else واحد يقصر السيناريو على حالتين فقط، بينما أغلب المشاكل الحقيقية لها أكثر من احتمالين.

```kotlin
// Variable with an unexpected color value
val trafficLightColor = "Black"
if (trafficLightColor == "Red") {
    println("Stop")
} else if (trafficLightColor == "Yellow") {
    println("Slow")
} else if (trafficLightColor == "Green") {
    println("Go")
} else {
    // Fallback for any invalid value
    println("Invalid traffic-light color")
}
```
> **الناتج المتوقع:** `Invalid traffic-light color`

---

### 10. جملة when للتعامل مع فروع متعددة

#### النص الأصلي يقول (English):
> In Kotlin, when you deal with multiple branches, you can use the when statement instead of the if/else statement. when statements are preferred when there are more than two branches to consider. A when statement accepts a single value through the parameter. The value is then evaluated against each of the conditions sequentially. The corresponding body of the first condition that's met is then executed. Each condition and body are separated by an arrow (->).

#### الترجمة الحرفية:
> في كوتلن، عندما تتعامل مع فروع متعددة، يمكنك استخدام جملة when بدلاً من جملة if/else. جمل when مُفضَّلة عندما توجد أكثر من فرعين للنظر فيهما. جملة when تقبل قيمة واحدة عبر البارامتر. ثم تُقيَّم القيمة مقابل كل شرط من الشروط بالتتابع. يُنفَّذ الجسم المقابل لأول شرط تحقّق. كل شرط وجسمه يُفصَل بينهما بسهم (->).

#### الشرح المبسّط:
جملة `when` هي بديل أنظف وأكثر قابلية للقراءة من سلسلة `else if` الطويلة عندما يكون هناك أكثر من فرعين، وهي بذلك حلّ مباشر لمشكلة "الفوضى" التي قد تنشأ في البند السابق (9) عند تعدد الشروط. تعمل بمنطق تسلسلي: تأخذ قيمة واحدة، وتفحصها مقابل كل شرط من أعلى لأسفل حتى تجد أول تطابق، فتنفّذ جسمه فقط وتتوقف. تشبيه يومي: مثل آلة فرز الطرود في مستودع تضع كل طرد في الصندوق المناسب بمجرد أن تتعرف على "الفئة" المطابقة له، دون الحاجة لفحصه أكثر من مرة. مثال عملي: `when(trafficLightColor) { "Red" -> println("Stop"); "Yellow" -> println("Slow"); "Green" -> println("Go"); else -> println("Invalid...") }`.

**لماذا؟** لأن كثرة جمل else if المتتالية تجعل الكود مزدحماً وأقل وضوحاً، بينما when يقدّم بنية أنظف بصرياً ومنطقياً.

```kotlin
val trafficLightColor = "Yellow"
when (trafficLightColor) {
    "Red" -> println("Stop")
    "Yellow" -> println("Slow")
    "Green" -> println("Go")
    else -> println("Invalid traffic-light color")
}
```
> **الناتج المتوقع:** `Slow`

---

### 11. استخدام الفاصلة (,) لعدة شروط في نفس السطر ضمن when

#### النص الأصلي يقول (English):
> Write more complex conditions in a when statement. Use a comma (,) for multiple conditions.

#### الترجمة الحرفية:
> اكتب شروطاً أكثر تعقيداً في جملة when. استخدم الفاصلة (,) لعدة شروط.

#### الشرح المبسّط:
هذه إضافة على البند السابق (10) تسمح بتجميع عدة قيم تؤدي لنفس النتيجة في سطر واحد، بدلاً من تكرار السهم `->` لكل قيمة على حدة. أهميتها في اختصار الكود عندما تشترك عدة قيم في نفس رد الفعل المطلوب، مثل عدة أعداد تُعتبر جميعها "أولية". تشبيه يومي: مثل قول "إذا كان اليوم سبتاً أو أحداً، فهو عطلة نهاية أسبوع" بدلاً من كتابة جملتين منفصلتين لكل يوم. مثال عملي: `2, 3, 5, 7 -> println("x is a prime number between 1 and 10.")` تعني أن أي من هذه الأعداد الأربعة يؤدي لنفس النتيجة.

**لماذا؟** لتجنّب تكرار نفس جسم الشرط عدة مرات لمجرد اختلاف القيمة المطابقة.

---

### 12. استخدام الكلمة المفتاحية in لفحص مدى (نطاق) من القيم

#### النص الأصلي يقول (English):
> Use the in keyword for a range of conditions.

#### الترجمة الحرفية:
> استخدم الكلمة المفتاحية in لنطاق من الشروط.

#### الشرح المبسّط:
تسمح `in` بفحص ما إذا كانت القيمة تقع ضمن مدى معين (range) بدلاً من مقارنتها بقيمة واحدة محددة، وهذا يوسّع مرونة `when` التي بدأناها في البندين 10 و11. أهميتها الكبرى في تجنّب كتابة عشرات القيم يدوياً عند التعامل مع نطاق كبير من الأعداد أو الأحرف. تشبيه يومي: مثل قول "أي شخص عمره بين 18 و65 يُعتبر بالغاً في سن العمل" بدلاً من تعداد كل عمر على حدة. مثال عملي: `in 1..10 -> println("x is a number between 1 and 10, but not a prime number.")` تفحص إن كانت x بين 1 و10 شاملة الطرفين.

**لماذا؟** لأن كتابة كل قيمة ضمن مدى كبير يدوياً غير عملي وغير قابل للتوسّع.

---

### 13. استخدام الكلمة المفتاحية is لفحص نوع البيانات

#### النص الأصلي يقول (English):
> Use the is keyword to check data type.

#### الترجمة الحرفية:
> استخدم الكلمة المفتاحية is لفحص نوع البيانات.

#### الشرح المبسّط:
تسمح `is` بفحص النوع الفعلي للمتغيّر أثناء التنفيذ، وهذا مفيد جداً عندما يكون نوع المتغيّر عاماً مثل `Any` ولا نعرف مسبقاً ما هو نوعه الحقيقي. يرتبط هذا بالبندين السابقين (11، 12) لأنه فرع إضافي ضمن نفس بنية `when`، لكنه يفحص "الفئة" (النوع) بدلاً من "القيمة". تشبيه يومي: مثل موظف جمارك يفحص هل الصندوق يحتوي "سوائل" أو "أجهزة إلكترونية" (النوع)، بدلاً من فحص محتوى كل صندوق بالتفصيل. مثال عملي: `is Int -> println("x is an integer number, but not between 1 and 10.")` تتحقق فقط من كون x عدداً صحيحاً.

**لماذا؟** لأن بعض المتغيّرات (خصوصاً من نوع `Any`) يمكن أن تحمل أي نوع بيانات، فنحتاج طريقة صريحة للتحقق من نوعها الفعلي وقت التنفيذ.

```kotlin
val x: Any = 20
when (x) {
    2, 3, 5, 7 -> println("x is a prime number between 1 and 10.")
    in 1..10 -> println("x is a number between 1 and 10, but not a prime number.")
    is Int -> println("x is an integer number, but not between 1 and 10.")
    else -> println("x isn't an integer number.")
}
```
> **الناتج المتوقع:** `x is an integer number, but not between 1 and 10.`

---

### 14. استخدام if/else و when كتعبيرات (expressions)

#### النص الأصلي يقول (English):
> You can also use conditionals as expressions to return different values for each branch of condition. When the body of each branch appears similar, you can use conditional expressions to improve code readability compared to conditional statements. If the bodies only contain a return value or expression, you can remove the curly braces to make the code more concise.

#### الترجمة الحرفية:
> يمكنك أيضاً استخدام الجمل الشرطية كتعبيرات لإرجاع قيم مختلفة لكل فرع من الشرط. عندما يبدو جسم كل فرع متشابهاً، يمكنك استخدام التعبيرات الشرطية لتحسين وضوح الكود مقارنة بالجمل الشرطية. إذا كانت الأجسام تحتوي فقط على قيمة إرجاع أو تعبير، يمكنك إزالة الأقواس المعقوفة لجعل الكود أكثر إيجازاً.

#### الشرح المبسّط:
الفكرة هنا هي التحوّل من "جملة" (statement) تنفّذ فعلاً معيناً، إلى "تعبير" (expression) يُرجع قيمة يمكن تخزينها مباشرة في متغيّر؛ وهذا يوحّد كل الشروط التي درسناها في البنود من 8 إلى 13 في نمط واحد أكثر اختصاراً. الفائدة الأساسية أن الكود يصبح أقصر لأنك لا تحتاج لتكرار `println` في كل فرع، بل تُسند القيمة لمتغيّر واحد وتطبعه مرة واحدة في النهاية. تشبيه يومي: بدلاً من أن يقول كل موظف في شركة جملة الترحيب بنفسه حسب اسم الزائر، يوجد نظام واحد يحسب "رسالة الترحيب المناسبة" ثم موظف استقبال واحد يقولها. مثال عملي: `val message = when(trafficLightColor) { "Red" -> "Stop"; "Yellow", "Amber" -> "Slow"; "Green" -> "Go"; else -> "Invalid traffic-light color" }` ثم `println(message)` مرة واحدة فقط.

**لماذا؟** لأن تجميع القيمة الناتجة في متغيّر واحد بدلاً من تكرار الطباعة أو الفعل داخل كل فرع يجعل الكود أنظف وأسهل لإعادة الاستخدام.

```kotlin
val trafficLightColor = "Amber"
val message = when (trafficLightColor) {
    "Red" -> "Stop"
    "Yellow", "Amber" -> "Slow"
    "Green" -> "Go"
    else -> "Invalid traffic-light color"
}
println(message)
```
> **الناتج المتوقع:** `Slow`

---

### 15. المتغيّرات القابلة لحمل قيمة null

#### النص الأصلي يقول (English):
> In Kotlin, you can use null to indicate that there's no value associated with the variable. In Kotlin, there's a distinction between nullable and non-nullable types: Nullable types are variables that can hold null. Non-null types are variables that can't hold null.

#### الترجمة الحرفية:
> في كوتلن، يمكنك استخدام null للإشارة إلى أنه لا توجد قيمة مرتبطة بالمتغيّر. في كوتلن، يوجد تمييز بين الأنواع القابلة للـ null والأنواع غير القابلة له: الأنواع القابلة للـ null هي متغيّرات يمكنها حمل null. الأنواع غير القابلة للـ null هي متغيّرات لا يمكنها حمل null.

#### الشرح المبسّط:
هذا مفهوم جديد ومنفصل تماماً عن الشروط والمتغيّرات العادية السابقة؛ فـ `null` تعني ببساطة "لا يوجد قيمة على الإطلاق"، وليس صفراً أو نصاً فارغاً. أهمية هذا التمييز بين الأنواع القابلة وغير القابلة للـ null هي أن كوتلن تجبرك على التصريح مسبقاً هل تتوقع أن يكون المتغيّر بلا قيمة يوماً ما أم لا، وهذا يمنع أخطاء لاحقة كثيرة. تشبيه يومي: مثل خانة "اسم الزوج/الزوجة" في استمارة رسمية — بعض الأشخاص غير متزوجين فتبقى الخانة فارغة (null)، بينما خانة "الاسم الشخصي" لا يمكن أن تكون فارغة أبداً (non-null). مثال عملي: `val favoriteActor = null` يعني أن المتغيّر لا يحمل أي قيمة فعلياً.

**لماذا؟** لأن التمييز الصريح بين ما يمكن أن يكون فارغاً وما لا يمكن يمنع أخطاء تشغيل (crashes) شائعة جداً في لغات أخرى لا تفرّق بين النوعين.

---

### 16. إعلان متغيّر قابل لحمل null بعلامة الاستفهام (?)

#### النص الأصلي يقول (English):
> To declare nullable variables in Kotlin, you need to add a ? operator to the end of the type. To declare a nullable variable, you need to explicitly add the nullable type. Without the nullable type, the Kotlin compiler infers that it's a non-nullable type.

#### الترجمة الحرفية:
> لتعريف متغيّرات قابلة للـ null في كوتلن، تحتاج لإضافة عامل ? في نهاية النوع. لتعريف متغيّر قابل للـ null، تحتاج لإضافة النوع القابل للـ null صراحةً. بدون النوع القابل للـ null، يستنتج مترجم كوتلن أنه نوع غير قابل للـ null.

#### الشرح المبسّط:
هذا هو التطبيق العملي للمفهوم في البند 15: علامة الاستفهام `?` بعد النوع هي الإشارة الوحيدة التي تخبر المترجم أن هذا المتغيّر يُسمح له بأن يكون null. بدون هذه العلامة، تعتبر كوتلن أي متغيّر "غير قابل للـ null" تلقائياً بموجب مبدأ Type Inference الذي درسناه سابقاً (البند 6)، فيمنع تعيين null له ويصدر خطأ ترجمة. تشبيه يومي: مثل ملصق تحذيري "قد يكون فارغاً" يُلصق فقط على الصناديق التي يُسمح أن تصل فارغة؛ بدون هذا الملصق، أي صندوق فارغ يُعتبر خطأً في الشحنة. مثال عملي: `var favoriteActor: String? = "Sandra Oh"` يسمح لاحقاً بتنفيذ `favoriteActor = null` دون خطأ، بينما `var favoriteActor: String = "Sandra Oh"` (بدون ?) يرفض `favoriteActor = null` برسالة خطأ "Null can not be a value of a non-null type String".

**لماذا؟** لأن هذا الفرض الصريح يجعل نية المبرمج واضحة تماماً: هل يتوقع غياب القيمة أم لا، بدلاً من ترك الأمر مبهماً.

---

### 17. خطورة الوصول المباشر لمتغيّر nullable ومفهوم Null Safety

#### النص الأصلي يقول (English):
> Kotlin intentionally applies syntactic rules so that it can achieve null safety, which refers to a guarantee that no accidental calls are made on potentially null variables. This is critical because if there's an attempt to access a member of a variable that's null - known as null reference - during the running of an app, the app crashes because the null variable doesn't contain any property or method. This type of crash is known as a runtime error in which the error happens after the code has compiled and runs. Due to the null safety nature of Kotlin, such runtime errors are prevented because the Kotlin compiler forces a null check for nullable types.

#### الترجمة الحرفية:
> تطبّق كوتلن قواعد تركيبية عمداً لتحقيق أمان الـ null (null safety)، والذي يشير إلى ضمان عدم حدوث استدعاءات عرضية على متغيّرات قد تكون null. هذا أمر حاسم لأنه إذا حدثت محاولة للوصول إلى عضو في متغيّر قيمته null - يُعرف هذا بالمرجع الفارغ (null reference) - أثناء تشغيل التطبيق، فإن التطبيق يتعطل (crash) لأن المتغيّر الفارغ لا يحتوي على أي خاصية أو دالة. هذا النوع من التعطل يُعرف بخطأ وقت التشغيل (runtime error) حيث يحدث الخطأ بعد أن يُترجَم الكود ويعمل. بسبب طبيعة أمان الـ null في كوتلن، تُمنَع أخطاء وقت التشغيل هذه لأن مترجم كوتلن يفرض فحص null لأنواع البيانات القابلة له.

#### الشرح المبسّط:
هذا يفسّر السبب الحقيقي وراء كل القيود التي ذكرناها في البندين 15 و16؛ فالهدف من إجبار المبرمج على تحديد نوع nullable صراحة هو منع نوع شائع جداً من الأعطال يسمى "الوصول لمرجع فارغ" (Null Pointer Exception) الذي كان يسبب مشاكل كثيرة في لغات مثل Java قديماً. الفرق الجوهري بين "خطأ ترجمة" (compile error) و"خطأ وقت تشغيل" (runtime error) هو أن الأول يُكتشف فوراً قبل تشغيل التطبيق، بينما الثاني يحدث بعد أن يبدأ التطبيق بالعمل فعلياً أمام المستخدم — وهو أسوأ بكثير لأنه قد يظهر بعد نشر التطبيق. تشبيه يومي: مثل فحص سلامة السيارة قبل الانطلاق (compile-time) بدلاً من اكتشاف عطل الفرامل أثناء السير في الطريق السريع (runtime). مثال عملي: محاولة تنفيذ `favoriteActor.length` مباشرة على متغيّر `String?` يرفضها المترجم فوراً برسالة خطأ توضح أن الوصول الآمن مطلوب.

**لماذا؟** لأن اكتشاف الأخطاء المتعلقة بالـ null أثناء الترجمة (قبل التشغيل) أرخص بكثير وأكثر أماناً من اكتشافها بعد أن يتعطل التطبيق أمام المستخدم الفعلي.

---

### 18. عامل الاستدعاء الآمن ?. (Safe Call Operator)

#### النص الأصلي يقول (English):
> You can use the ?. safe call operator to access methods or properties of nullable variables. The ?. safe call operator allows safer access to nullable variables because the Kotlin compiler stops any attempt of member access to null references and returns null for the member accessed.

#### الترجمة الحرفية:
> يمكنك استخدام عامل الاستدعاء الآمن ?. للوصول إلى دوال أو خصائص المتغيّرات القابلة للـ null. عامل الاستدعاء الآمن ?. يسمح بوصول أكثر أماناً للمتغيّرات القابلة للـ null لأن مترجم كوتلن يوقف أي محاولة للوصول لعضو مرجع فارغ ويُرجع null للعضو المطلوب الوصول إليه.

#### الشرح المبسّط:
هذا هو الحل العملي الأول لمشكلة الوصول الآمن التي شرحناها في البند 17؛ فبدلاً من الوصول المباشر (`.`) الذي يسبب انهياراً إذا كانت القيمة null، يستخدم `?.` الذي يتحقق أولاً: إن كانت القيمة موجودة فعلاً ينفّذ الاستدعاء، وإن كانت null يتوقف بأمان ويُرجع null بدلاً من التعطل. تشبيه يومي: مثل موظف حذر يطرق الباب أولاً ويسأل "هل يوجد أحد؟" قبل الدخول؛ إن لم يجب أحد ينصرف بهدوء بدلاً من اقتحام غرفة فارغة. مثال عملي: `println(favoriteActor?.length)` تطبع الطول الفعلي إن كان الاسم موجوداً، أو تطبع `null` بأمان دون تعطل إن كان المتغيّر يحمل null.

**لماذا؟** لأنه يمنح المبرمج طريقة "دفاعية" للوصول لخصائص متغيّر قد يكون فارغاً، دون الحاجة لكتابة جملة `if` منفصلة للتحقق يدوياً في كل مرة.

```kotlin
var favoriteActor: String? = "Sandra Oh"
println(favoriteActor?.length) // Safe access, prints length
favoriteActor = null
println(favoriteActor?.length) // Safe access, prints null (no crash)
```
> **الناتج المتوقع:**
> ```
> 9
> null
> ```

---

### 19. عامل التأكيد على عدم الـ null !! (Not-Null Assertion Operator)

#### النص الأصلي يقول (English):
> If you use the !! not-null assertion, it means that you assert that the value of the variable isn't null, regardless of whether it is or isn't. Unlike ?. safe-call operators, the use of a !! not-null assertion operator may result in a NullPointerException error being thrown if the nullable variable is indeed null. This Kotlin error shows that your program crashed during execution. As such, it's not recommended to use the !! not-null assertion operator unless you're sure that the variable isn't null.

#### الترجمة الحرفية:
> إذا استخدمت تأكيد عدم الـ null !!، فهذا يعني أنك تؤكد أن قيمة المتغيّر ليست null، بغض النظر عن كونها كذلك فعلاً أم لا. على عكس عوامل الاستدعاء الآمن ?.، استخدام عامل تأكيد عدم الـ null !! قد يؤدي لإطلاق خطأ NullPointerException إذا كان المتغيّر القابل للـ null هو فعلاً null. هذا الخطأ في كوتلن يُظهر أن برنامجك تعطّل أثناء التنفيذ. لذلك، لا يُنصَح باستخدام عامل تأكيد عدم الـ null !! إلا إذا كنت متأكداً أن المتغيّر ليس null.

#### الشرح المبسّط:
على عكس `?.` الآمن في البند 18، فإن `!!` هو تصريح صارم من المبرمج بأنه "متأكد" أن القيمة ليست null — وهذا خطر لأنه إن كان مخطئاً، يتعطل التطبيق فعلياً برسالة `NullPointerException`. هذا يربط مباشرة بمفهوم runtime error الذي شرحناه في البند 17، لأن `!!` هو أحد الطرق القليلة المتبقية في كوتلن التي تسمح لهذا النوع من الأعطال بالحدوث. تشبيه يومي: مثل شخص يقفز من فوق حفرة وهو "متأكد" أنها ضحلة دون النظر فعلياً — إذا كان مخطئاً، تكون النتيجة كارثية وفورية. مثال عملي: `println(favoriteActor!!.length)` عندما تكون `favoriteActor` تساوي `null` فعلاً يؤدي لتعطل البرنامج بخطأ `NullPointerException`.

**لماذا؟** لأن كوتلن تترك هذا الخيار متاحاً لحالات نادرة يكون فيها المبرمج متأكداً 100% من وجود القيمة، لكنها تحذّر بشدة من استخدامه إلا بحذر شديد لأنه يلغي كل الحماية التي توفرها اللغة.

```kotlin
var favoriteActor: String? = null
println(favoriteActor!!.length) // Throws NullPointerException
```
> **الناتج المتوقع:** انهيار البرنامج مع رسالة `Exception in thread "main" java.lang.NullPointerException`.

#### مهم للامتحان ⚠️:
> تجنّب استخدام `!!` إلا إذا كنت متأكداً تماماً أن القيمة لا يمكن أن تكون null؛ استخدام `?.` أو `?:` أكثر أماناً في أغلب الحالات.

---

### 20. عامل Elvis ?: لتوفير قيمة افتراضية

#### النص الأصلي يقول (English):
> The ?: Elvis operator is an operator that you can use together with the ?. safe-call operator. With the ?: Elvis operator, you can add a default value when the ?. safe-call operator returns null. If the variable isn't null, the expression before the ?: Elvis operator executes. If the variable is null, the expression after the ?: Elvis operator executes.

#### الترجمة الحرفية:
> عامل Elvis ?: هو عامل يمكنك استخدامه مع عامل الاستدعاء الآمن ?.. مع عامل Elvis ?:، يمكنك إضافة قيمة افتراضية عندما يُرجع عامل الاستدعاء الآمن ?. القيمة null. إذا لم يكن المتغيّر null، يُنفَّذ التعبير الذي قبل عامل Elvis ?:. إذا كان المتغيّر null، يُنفَّذ التعبير الذي بعد عامل Elvis ?:.

#### الشرح المبسّط:
عامل Elvis هو استكمال طبيعي للاستدعاء الآمن في البند 18؛ فبدلاً من أن ينتهي الأمر بقيمة `null` معلّقة عندما يكون المتغيّر فارغاً، يوفر `?:` قيمة بديلة جاهزة تحل محل null فوراً، فيتحول التعامل مع الحالة الفارغة من "احتمال" إلى "قيمة مضمونة دائماً". هذا يشبه إلى حد كبير جملة `if/else` كتعبير التي درسناها في البند 14، لكن بصيغة أقصر وأكثر تخصصاً للتعامل مع null فقط. تشبيه يومي: مثل آلة قهوة أوتوماتيكية تقول "إن لم تختر نوع السكر، سأضع لك السكر الافتراضي تلقائياً" بدلاً من تقديم فنجان بلا سكر على الإطلاق. مثال عملي: `val lengthOfName = favoriteActor?.length ?: 0` تُرجع طول الاسم الفعلي إن وُجد، أو 0 كقيمة افتراضية إن كان المتغيّر null.

**لماذا؟** لأنه يمنح طريقة مختصرة جداً وواضحة لتحديد "ماذا أفعل إن كانت القيمة غير موجودة؟" دون كتابة جملة if/else كاملة.

```kotlin
var favoriteActor: String? = "Sandra Oh"
val lengthOfName = favoriteActor?.length ?: 0
println("The number of characters in your favorite actor's name is $lengthOfName.")
```
> **الناتج المتوقع:** `The number of characters in your favorite actor's name is 9.`

---

### 21. تعريف واستدعاء دالة (Function)

#### النص الأصلي يقول (English):
> These are the key parts needed to define a function in Kotlin: Declaring a function uses the fun keyword and includes code within the curly braces which contains the instructions needed to execute a task.

#### الترجمة الحرفية:
> هذه هي الأجزاء الأساسية اللازمة لتعريف دالة في كوتلن: إعلان الدالة يستخدم كلمة fun المفتاحية ويتضمن كوداً داخل الأقواس المعقوفة يحتوي على التعليمات اللازمة لتنفيذ مهمة.

#### الشرح المبسّط:
الدالة (function) هي وحدة كود مستقلة تحمل اسماً وتنفّذ مهمة محددة، ويمكن استدعاؤها أكثر من مرة دون إعادة كتابة نفس الكود. هذا يرتبط بمفهوم `main()` الذي بدأنا به المحاضرة (البند 1)، فتبيّن أن `main` نفسها هي مجرد دالة خاصة تُستدعى تلقائياً؛ والآن نتعلّم كيفية إنشاء دوال إضافية باسمنا الخاص. تشبيه يومي: الدالة أشبه بوصفة طبخ مكتوبة مرة واحدة باسم محدد (مثلاً "تحضير القهوة")، ويمكن لأي شخص اتّباعها متى أراد قهوة دون إعادة كتابة الخطوات من الصفر في كل مرة. مثال عملي: `fun birthdayGreeting() { println("Happy Birthday, Rover!") }` ثم استدعاؤها لاحقاً بكتابة `birthdayGreeting()` داخل `main()`.

**لماذا؟** لأن تكرار نفس الكود في أماكن متعددة يجعل البرنامج طويلاً وصعب الصيانة؛ الدوال تسمح بكتابة المنطق مرة واحدة واستدعائه من أي مكان.

```kotlin
fun main() {
    birthdayGreeting() // Call the function
}
fun birthdayGreeting() {
    println("Happy Birthday, Rover!")
    println("You are now 5 years old!")
}
```
> **الناتج المتوقع:**
> ```
> Happy Birthday, Rover!
> You are now 5 years old!
> ```

---

### 22. إرجاع قيمة من الدالة ونوع Unit

#### النص الأصلي يقول (English):
> By default, if you don't specify a return type, the default return type is Unit. Unit means the function doesn't return a value. It's optional to specify the Unit return type in Kotlin. For functions that don't return anything, or returning Unit, you don't need a return statement.

#### الترجمة الحرفية:
> افتراضياً، إذا لم تحدد نوع إرجاع، فإن نوع الإرجاع الافتراضي هو Unit. Unit تعني أن الدالة لا تُرجع قيمة. تحديد نوع إرجاع Unit في كوتلن اختياري. بالنسبة للدوال التي لا تُرجع شيئاً، أو تُرجع Unit، لست بحاجة لجملة return.

#### الشرح المبسّط:
هذا يوضّح أن كل دالة في كوتلن لها "نوع إرجاع" حتى لو لم يُكتب صراحة، تماماً كما أن كل متغيّر له نوع بيانات (البند 2)؛ والدوال التي "لا تُرجع شيئاً محسوساً" (مثل التي تطبع فقط) نوعها الافتراضي هو `Unit`. أهمية هذا المفهوم أنه يوحّد التعامل مع الدوال في اللغة: كل دالة تُرجع قيمة من نوع ما، حتى لو كان ذلك النوع هو "لا شيء". تشبيه يومي: مثل موظف يقوم بمهمة (مثل تنظيف مكتب) دون أن يعيد لك أي غرض ملموس بعد الانتهاء — النتيجة "منجزة" لكن لا يوجد "منتج" تحمله بيدك. مثال عملي: `fun birthdayGreeting(): Unit { println("Happy Birthday, Rover!") }` مطابقة تماماً لكتابتها بدون `: Unit` على الإطلاق.

**لماذا؟** لأن نظام الأنواع في كوتلن يتطلب أن يكون لكل تعبير أو دالة نوع محدد بوضوح، حتى في حالة "عدم الإرجاع".

---

### 23. دالة تُرجع قيمة فعلية من نوع String

#### النص الأصلي يقول (English):
> fun birthdayGreeting(): String { val nameGreeting = "Happy Birthday, Rover!" val ageGreeting = "You are now 5 years old!" return "$nameGreeting\n$ageGreeting" }

#### الترجمة الحرفية:
> دالة birthdayGreeting تُرجع String: تُنشئ متغيّراً nameGreeting بقيمة "Happy Birthday, Rover!"، ومتغيّراً ageGreeting بقيمة "You are now 5 years old!"، ثم تُرجع النصين مدموجين بسطر جديد بينهما.

#### الشرح المبسّط:
على عكس البند 22 حيث كانت الدالة تطبع مباشرة، هذه الدالة "تُرجع" قيمة نصية ليستخدمها المستدعي كما يشاء (طباعتها، تخزينها، دمجها مع نص آخر)، وهذا فرق جوهري بين "التنفيذ" و"الإرجاع". أهمية هذا النمط أنه يفصل بين "حساب القيمة" و"استخدامها"، مما يجعل الدالة أكثر مرونة لإعادة الاستخدام في سياقات مختلفة. تشبيه يومي: مثل طلب من مصنع أن يشحن لك منتجاً جاهزاً (return) بدلاً من أن يكتفي بتصنيعه وتخزينه عنده فقط (println داخلياً). مثال عملي: `val greeting = birthdayGreeting(); println(greeting)` — هنا استُقبلت القيمة المُرجعة أولاً في متغيّر، ثم طُبعت لاحقاً بشكل منفصل.

**لماذا؟** لأن الدالة التي تُرجع قيمة يمكن استخدام ناتجها في أي مكان (طباعة، حفظ، تمرير لدالة أخرى)، بينما الدالة التي تطبع مباشرة تُقيّد الاستخدام بالطباعة فقط.

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
> **الناتج المتوقع:**
> ```
> Happy Birthday, Rover!
> You are now 5 years old!
> ```

---

### 24. إضافة معاملات (Parameters) للدالة

#### النص الأصلي يقول (English):
> Parameters are declared within the parentheses after the function name. Each parameter consists of a variable name and data type, separated by a colon and a space. Multiple parameters are separated by a comma.

#### الترجمة الحرفية:
> المعاملات (parameters) تُعلَن داخل الأقواس بعد اسم الدالة. كل معامل يتكوّن من اسم متغيّر ونوع بيانات، مفصولين بنقطتين ومسافة. المعاملات المتعددة تُفصَل بفاصلة.

#### الشرح المبسّط:
المعاملات تجعل الدالة "قابلة للتخصيص" في كل استدعاء بدلاً من إنتاج نفس النتيجة الثابتة دائماً كما في الأمثلة السابقة (البند 21، 23) التي كانت مقيّدة باسم "Rover" وعمر "5" فقط. أهمية هذا المفهوم أنه يحوّل الدالة من "حل خاص لحالة واحدة" إلى "حل عام قابل لإعادة الاستخدام" مع أي اسم أو عمر يُمرَّر إليها. تشبيه يومي: مثل استمارة تهنئة عيد ميلاد جاهزة الطباعة، لكن فيها فراغات تُملأ بالاسم والعمر في كل مرة تُستخدم فيها لشخص مختلف. مثال عملي: `fun birthdayGreeting(name: String, age: Int): String {...}` يمكن استدعاؤها بـ `birthdayGreeting("Rover", 5)` أو `birthdayGreeting("Rex", 2)` بنفس المنطق ولكن بقيم مختلفة.

**لماذا؟** لأن الدوال التي لا تقبل معاملات تكون محدودة الفائدة، بينما المعاملات تسمح باستخدام نفس منطق الدالة مع بيانات مختلفة في كل استدعاء.

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

---

### 25. المعاملات الافتراضية (Default Arguments)

#### النص الأصلي يقول (English):
> Function parameters can also specify default arguments. When you call a function, you can choose to omit arguments for which there is a default, in which case, the default is used. To add a default argument, you add the assignment operator (=) after the data type for the parameter and set it equal to a value.

#### الترجمة الحرفية:
> معاملات الدالة يمكن أيضاً أن تحدد قيماً افتراضية (default arguments). عند استدعاء دالة، يمكنك اختيار حذف المعاملات التي لها قيمة افتراضية، وفي هذه الحالة، تُستخدم القيمة الافتراضية. لإضافة معامل افتراضي، تضيف عامل الإسناد (=) بعد نوع البيانات للمعامل وتحدد له قيمة.

#### الشرح المبسّط:
هذا يبني على مفهوم المعاملات في البند 24، لكنه يضيف مرونة إضافية: يمكن للمستدعي "تجاهل" معامل معين إن كان راضياً بقيمته الافتراضية، بدلاً من الاضطرار لتمرير قيمة له في كل مرة. أهمية هذا المفهوم في تقليل التكرار عندما تكون هناك قيمة شائعة الاستخدام لمعظم الاستدعاءات، مع إبقاء إمكانية تخصيصها عند الحاجة. تشبيه يومي: مثل طلب قهوة في مقهى حيث "الحليب العادي" هو الخيار الافتراضي إن لم تحدد نوعاً آخر، لكن يمكنك دائماً طلب حليب اللوز بدلاً منه صراحةً. مثال عملي: `fun birthdayGreeting(name: String = "Rover", age: Int): String` تسمح باستدعاء `birthdayGreeting(age = 5)` دون تمرير اسم، فيُستخدم "Rover" تلقائياً.

**لماذا؟** لتقليل التكرار في الاستدعاءات الشائعة مع الحفاظ على إمكانية التخصيص الكامل عند الحاجة.

```kotlin
fun birthdayGreeting(name: String = "Rover", age: Int): String {
    return "Happy Birthday, $name! You are now $age years old!"
}
fun main() {
    println(birthdayGreeting(age = 5)) // Uses default name "Rover"
    println(birthdayGreeting("Rex", 2)) // Overrides default name
}
```

---

### 26. الدوال كمُنشآت من الدرجة الأولى (First-Class Constructs) ومقدمة الـ Lambda

#### النص الأصلي يقول (English):
> In Kotlin, functions are considered first-class constructs. This means that functions can be treated as a data type. You can store functions in variables, pass them to other functions as arguments, and return them from other functions. You can also declare function literals, which are called lambda expressions or lambdas for short.

#### الترجمة الحرفية:
> في كوتلن، تُعتبر الدوال منشآت من الدرجة الأولى (first-class constructs). هذا يعني أن الدوال يمكن معاملتها كنوع بيانات. يمكنك تخزين الدوال في متغيّرات، وتمريرها لدوال أخرى كمعاملات، وإرجاعها من دوال أخرى. يمكنك أيضاً إعلان حرفيات دوال (function literals)، تُسمّى تعبيرات lambda أو lambdas اختصاراً.

#### الشرح المبسّط:
هذا مفهوم متقدم جديد يبني على كل ما تعلمناه عن الدوال (البنود 21-25)، لكنه يفتح باباً جديداً كلياً: التعامل مع الدالة نفسها كأنها "قيمة" أو "بيانات"، تماماً مثل عدد أو نص، وليس فقط كإجراء يُستدعى. أهمية هذا المفهوم كبيرة جداً في أندرويد الحديث (خصوصاً Compose)، لأنه يسمح بتمرير سلوك (behavior) كامل كمعامل، وليس فقط بيانات ثابتة. تشبيه يومي: مثل إعطاء شخص "وصفة طبخ كاملة" مكتوبة على ورقة بدلاً من الطعام الجاهز نفسه — يمكنه حمل تلك الورقة، إعطاؤها لشخص آخر، أو تنفيذها لاحقاً وقتما يشاء. مثال عملي تمهيدي: بدلاً من استدعاء `trick()` مباشرة، يمكن تخزين الإشارة لهذه الدالة في متغيّر واستدعاؤها من خلاله لاحقاً.

**لماذا؟** لأن القدرة على معاملة الدوال كبيانات تسمح ببناء كود مرن جداً، مثل تغيير سلوك جزء من التطبيق وقت التشغيل، أو بناء واجهات Compose المتداخلة.

---

### 27. تخزين دالة في متغيّر باستخدام عامل المرجعية (::)

#### النص الأصلي يقول (English):
> To refer to a function as a value, you need to use the function reference operator (::).

#### الترجمة الحرفية:
> للإشارة إلى دالة كقيمة، تحتاج لاستخدام عامل مرجعية الدالة (::).

#### الشرح المبسّط:
هذا هو أول تطبيق عملي لفكرة "الدوال كقيم" التي شرحناها في البند 26؛ فوضع `::` قبل اسم الدالة يعني "لا تستدعِ هذه الدالة الآن، بل أعطني إشارة إليها لاستخدامها لاحقاً". هذا يختلف تماماً عن الاستدعاء العادي `trick()` الذي ينفّذ الدالة فوراً، بينما `::trick` يشير للدالة نفسها كـ"كائن" يمكن تخزينه. تشبيه يومي: الفرق بين طلب "نفّذ الوصفة الآن" (استدعاء `trick()`) وبين "أعطني نسخة من الوصفة لأحملها معي" (`::trick`). مثال عملي: `val trickFunction = ::trick` يخزّن إشارة لدالة `trick()` في متغيّر اسمه trickFunction، يمكن استدعاؤها لاحقاً بكتابة `trickFunction()`.

**لماذا؟** لأن كوتلن تحتاج إلى تمييز واضح بين "استدعاء دالة الآن" و"الإشارة إلى دالة لاستخدامها لاحقاً"، وعامل `::` هو تلك الإشارة الصريحة.

```kotlin
fun main() {
    val trickFunction = ::trick
}
fun trick() {
    println("No treats!")
}
```

---

### 28. إعادة تعريف الدالة كتعبير Lambda مباشر

#### النص الأصلي يقول (English):
> Lambda expressions provide a concise syntax to define a function without the fun keyword. You can store a lambda expression directly in a variable without a function reference on another function.

#### الترجمة الحرفية:
> تعبيرات lambda توفر صياغة موجزة لتعريف دالة بدون كلمة fun المفتاحية. يمكنك تخزين تعبير lambda مباشرة في متغيّر دون الحاجة لمرجعية دالة على دالة أخرى.

#### الشرح المبسّط:
بدلاً من إنشاء دالة منفصلة بـ `fun` ثم الإشارة إليها بـ `::` كما في البند 27، تسمح الـ lambda بكتابة "جسم الدالة" مباشرة كقيمة، محصوراً بين قوسين معقوفين `{ }`، ويُسند مباشرة لمتغيّر. هذا اختصار كبير عندما لا تحتاج لاسم منفصل للدالة أو استخدامها في أماكن متعددة بذلك الاسم. تشبيه يومي: بدلاً من كتابة وصفة كاملة في كتاب طبخ منفصل (دالة بـ `fun`) ثم الإشارة له لاحقاً، تكتب الوصفة مباشرة على ورقة صغيرة (lambda) وتعطيها مباشرة لمن يحتاجها. مثال عملي: `val trick = { println("No treats!") }` يُنشئ متغيّراً trick يحمل سلوكاً كاملاً (طباعة جملة)، يمكن استدعاؤه لاحقاً بـ `trick()`، تماماً كما لو كانت `trickFunction` من البند 27.

**لماذا؟** لتقليل الكود اللازم عندما يكون السلوك المطلوب بسيطاً ولا يحتاج تعريفاً منفصلاً باسم دالة رسمي.

```kotlin
fun main() {
    val trickFunction = trick
    trick()
    trickFunction()
}
val trick = {
    println("No treats!")
}
```
> **الناتج المتوقع:**
> ```
> No treats!
> No treats!
> ```

---

### 29. استخدام الدوال كنوع بيانات (Function Type)

#### النص الأصلي يقول (English):
> Function types consist of a set of parentheses that contain an optional parameter list, the -> symbol, and a return type. If you had a function that took two Int parameters and returned an Int, its data type would be (Int, Int) -> Int.

#### الترجمة الحرفية:
> أنواع الدوال (function types) تتكوّن من مجموعة أقواس تحتوي قائمة معاملات اختيارية، رمز السهم ->، ونوع الإرجاع. إذا كانت لديك دالة تأخذ معاملين من نوع Int وتُرجع Int، فإن نوع بياناتها سيكون (Int, Int) -> Int.

#### الشرح المبسّط:
تماماً كما أن `Int` أو `String` هي أنواع بيانات، فإن `() -> Unit` هي أيضاً "نوع بيانات" يصف شكل الدالة: كم معاملاً تأخذ وماذا تُرجع؛ وهذا يكمل فكرة "الدوال كقيم" في البند 26 بتوضيح كيف نكتب نوع تلك القيمة صراحةً. أهمية هذا المفهوم أنه يسمح بالتصريح الصريح بنوع متغيّر يحمل دالة، تماماً كما نصرّح بنوع متغيّر يحمل رقماً أو نصاً. تشبيه يومي: مثل وصف وظيفة شاغرة بمواصفات دقيقة ("يستقبل شخصين ويُخرج تقريراً واحداً") قبل أن تشغلها بموظف فعلي. مثال عملي: `val treat: () -> Unit = { println("Have a treat!") }` تُصرّح صراحةً أن treat هي دالة لا تأخذ معاملات ولا تُرجع شيئاً (Unit).

**لماذا؟** لأن التصريح الصريح بنوع الدالة يسمح للمترجم بالتحقق من توافق الدوال المُمرَّرة كمعاملات مع الشكل المتوقع.

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

---

### 30. استخدام دالة كنوع إرجاع (Function as Return Type)

#### النص الأصلي يقول (English):
> A function is a data type, so you can use it like any other data type. You can even return functions from other functions.

#### الترجمة الحرفية:
> الدالة هي نوع بيانات، لذا يمكنك استخدامها مثل أي نوع بيانات آخر. يمكنك حتى إرجاع دوال من دوال أخرى.

#### الشرح المبسّط:
هذا امتداد منطقي مباشر للبند 29؛ فإذا كانت الدالة "نوع بيانات" فعلاً، فمن الطبيعي أن تستطيع دالة أخرى أن "تُرجع" دالة كاملة كنتيجة لها، تماماً كما تُرجع رقماً أو نصاً. أهمية هذا المفهوم أنه يسمح ببناء منطق يختار "أي سلوك" يجب تنفيذه بناءً على شرط معين، ثم يُرجع ذلك السلوك (الدالة) للاستخدام لاحقاً. تشبيه يومي: مثل صراف آلي يقرر أي "إجراء" مناسب حسب نوع البطاقة، ثم يعطيك "الإجراء" نفسه (سحب، إيداع...) بدلاً من تنفيذه فوراً. مثال عملي: `fun trickOrTreat(isTrick: Boolean): () -> Unit { if (isTrick) return trick else return treat }` تُرجع إما دالة `trick` أو دالة `treat` حسب قيمة `isTrick`، دون تنفيذها داخل trickOrTreat نفسها.

**لماذا؟** لأن هذا يسمح بفصل "قرار أي سلوك يُنفَّذ" عن "تنفيذ ذلك السلوك فعلياً"، مما يمنح مرونة كبيرة في بناء برامج ديناميكية.

```kotlin
fun main() {
    val treatFunction = trickOrTreat(false)
    val trickFunction = trickOrTreat(true)
    treatFunction()
    trickFunction()
}
fun trickOrTreat(isTrick: Boolean): () -> Unit {
    if (isTrick) { return trick }
    else { return treat }
}
val trick = { println("No treats!") }
val treat = { println("Have a treat!") }
```
> **الناتج المتوقع:**
> ```
> Have a treat!
> No treats!
> ```

---

### 31. تمرير دالة إلى دالة أخرى كمعامل (Higher-Order Function الأساسي)

#### النص الأصلي يقول (English):
> When declaring function types, the parameters aren't labeled. You only need to specify the data types of each parameter, separated by a comma. When you write a lambda expression for a function that takes a parameter, the parameters are given names in the order that they occur.

#### الترجمة الحرفية:
> عند إعلان أنواع الدوال، لا تُوسَم المعاملات بأسماء. تحتاج فقط لتحديد أنواع بيانات كل معامل، مفصولة بفاصلة. عندما تكتب تعبير lambda لدالة تأخذ معاملاً، تُعطى المعاملات أسماءً حسب ترتيب ورودها.

#### الشرح المبسّط:
هذا يكمل مفهوم البندين 29 و30 بإضافة القدرة على "استقبال" دالة كمعامل داخل دالة أخرى، وليس فقط تخزينها أو إرجاعها؛ فمثلاً يمكن لدالة `trickOrTreat` أن تستقبل دالة أخرى اسمها `extraTreat` كأحد معاملاتها. عند كتابة نوع هذا المعامل، لا نكتب أسماء المعاملات الداخلية (فقط الأنواع، مثل `(Int) -> String`)، لكن عند كتابة الـ lambda الفعلية التي تُمرَّر، نعطي اسماً للمعامل مثل `quantity`. تشبيه يومي: مثل طلب توظيف يذكر فقط "المؤهلات المطلوبة" (النوع) دون تحديد اسم الموظف الفعلي مسبقاً؛ لاحقاً، عند تعيين شخص فعلي، يُعطى اسمه الحقيقي (اسم المعامل في الـ lambda). مثال عملي: `fun trickOrTreat(isTrick: Boolean, extraTreat: (Int) -> String): () -> Unit` تستقبل دالة إضافية، وتُستدعى بـ `trickOrTreat(false, coins)` حيث `coins` هي lambda معرّفة مسبقاً بمعامل اسمه `quantity`.

**لماذا؟** لأن تمرير سلوك كامل (دالة) كمعامل يسمح بتخصيص جزء من منطق الدالة الرئيسية من الخارج، دون تعديل كودها الداخلي.

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
> **الناتج المتوقع:**
> ```
> 5 quarters
> Have a treat!
> No treats!
> ```

---

### 32. أنواع الدوال القابلة لحمل null (Nullable Function Types)

#### النص الأصلي يقول (English):
> Like other data types, function types can be declared as nullable. In these cases, a variable could contain a function or it could be null. To declare a function as nullable, surround the function type in parentheses followed by a ? symbol outside the ending parenthesis.

#### الترجمة الحرفية:
> مثل أنواع البيانات الأخرى، يمكن إعلان أنواع الدوال كقابلة للـ null. في هذه الحالات، يمكن للمتغيّر أن يحتوي دالة أو أن يكون null. لإعلان دالة كقابلة للـ null، أحِط نوع الدالة بقوسين متبوعين بعلامة ? خارج القوس الختامي.

#### الشرح المبسّط:
هذا يجمع بين مفهومين سبق شرحهما: الـ nullability (البنود 15-20) وأنواع الدوال (البند 29)؛ فتماماً كما يمكن لنص أو رقم أن يكون null، يمكن أيضاً لدالة كاملة أن تكون "غير موجودة" (null) في متغيّر معين. الفرق التركيبي المهم هنا هو أن علامة `?` توضع خارج القوسين المحيطين بكامل نوع الدالة `((Int) -> String)?`، وليس داخلها، لتوضيح أن الدالة كلها قد تكون غائبة، وليس فقط قيمة إرجاعها. تشبيه يومي: مثل خدمة اختيارية إضافية (extraTreat) لا يقدمها كل المضيفين — البعض يقدمها فعلياً (دالة موجودة) والبعض لا (null)، وعلى الضيف أن يتحقق أولاً هل الخدمة موجودة قبل استخدامها. مثال عملي: `extraTreat: ((Int) -> String)?` ثم التحقق `if (extraTreat != null) { println(extraTreat(5)) }` قبل استدعائها فعلياً.

**لماذا؟** لأن بعض السلوكيات الإضافية اختيارية بطبيعتها، فنحتاج طريقة صريحة للتعبير عن "قد يكون هناك سلوك إضافي أو قد لا يكون".

```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: ((Int) -> String)?): () -> Unit {
    if (isTrick) {
        return trick
    } else {
        if (extraTreat != null) { println(extraTreat(5)) }
        return treat
    }
}
fun main() {
    val coins: (Int) -> String = { quantity -> "$quantity quarters" }
    val treatFunction = trickOrTreat(false, coins)
    val trickFunction = trickOrTreat(true, null)
    treatFunction()
    trickFunction()
}
```
> **الناتج المتوقع:**
> ```
> 5 quarters
> Have a treat!
> No treats!
> ```

---

### 33. اختصار Lambda: حذف اسم المعامل واستخدام it

#### النص الأصلي يقول (English):
> When a function has a single parameter and you don't provide a name, Kotlin implicitly assigns it the it name, so you can omit the parameter name and -> symbol, which makes lambda expressions more concise.

#### الترجمة الحرفية:
> عندما يكون للدالة معامل واحد ولا تُقدّم له اسماً، تُسنِد كوتلن ضمنياً اسم it له، لذا يمكنك حذف اسم المعامل ورمز ->، وهذا يجعل تعبيرات lambda أكثر إيجازاً.

#### الشرح المبسّط:
هذا اختصار إضافي على البند 31، حيث كنا نكتب `quantity -> "$quantity quarters"` صراحةً؛ الآن، إذا كانت الـ lambda تأخذ معاملاً واحداً فقط، تمنحه كوتلن تلقائياً الاسم الضمني `it`، فيمكننا حذف الاسم والسهم `->` تماماً. أهمية هذا الاختصار في تقليل الكود المكتوب في الحالات الشائعة جداً (lambda بمعامل واحد)، دون خسارة أي وظيفة. تشبيه يومي: مثل استخدام كلمة "هو/هي" بدلاً من إعادة ذكر اسم الشخص بالكامل في كل جملة أثناء محادثة قصيرة — الجميع يفهم من السياق من المقصود. مثال عملي: `val coins: (Int) -> String = { "$it quarters" }` مطابقة تماماً لـ `{ quantity -> "$quantity quarters" }` لكنها أقصر.

**لماذا؟** لأن تسمية معامل واحد فقط في lambda بسيطة غالباً ما تكون زائدة عن الحاجة، و`it` يوفر اسماً افتراضياً مفهوماً من السياق.

```kotlin
fun main() {
    val coins: (Int) -> String = { "$it quarters" }
    val treatFunction = trickOrTreat(false, coins)
    val trickFunction = trickOrTreat(true, null)
    treatFunction()
    trickFunction()
}
```

---

### 34. تمرير Lambda مباشرة داخل استدعاء الدالة

#### النص الأصلي يقول (English):
> Lambda expressions are simply function literals, just like 0 is an integer literal or "Hello" is a string literal. You can pass a lambda expression directly into a function call.

#### الترجمة الحرفية:
> تعبيرات lambda هي ببساطة حرفيات دوال (function literals)، تماماً كما أن 0 هو حرفي عدد صحيح أو "Hello" هو حرفي نصي. يمكنك تمرير تعبير lambda مباشرة داخل استدعاء دالة.

#### الشرح المبسّط:
هذا يوضّح أنه لا حاجة أصلاً لتخزين الـ lambda في متغيّر منفصل (كما فعلنا في البند 33 بمتغيّر coins) قبل تمريرها؛ يمكن كتابتها مباشرة داخل قوسي الاستدعاء، تماماً كما نكتب رقماً أو نصاً مباشرة كمعامل دون تخزينه أولاً في متغيّر. أهمية هذا الاختصار أنه يجعل الكود أقصر عندما تُستخدم الـ lambda مرة واحدة فقط ولا حاجة لإعادة استخدامها باسم منفصل. تشبيه يومي: مثل كتابة "أحضر لي 3 أكواب قهوة" مباشرة بدلاً من كتابة الرقم 3 في مكان منفصل أولاً ثم الإشارة إليه لاحقاً — إن كنت ستستخدمه مرة واحدة فقط، فكتابته مباشرة أبسط. مثال عملي: `trickOrTreat(false, { "$it quarters" })` تمرّر الـ lambda مباشرة كمعامل ثانٍ دون الحاجة لمتغيّر coins منفصل.

**لماذا؟** لتجنّب إنشاء متغيّر إضافي غير ضروري عندما تُستخدم الـ lambda مرة واحدة فقط في مكان الاستدعاء نفسه.

```kotlin
fun main() {
    val treatFunction = trickOrTreat(false, { "$it quarters" })
    val trickFunction = trickOrTreat(true, null)
    treatFunction()
    trickFunction()
}
```

---

### 35. صيغة Trailing Lambda (وضع Lambda خارج الأقواس)

#### النص الأصلي يقول (English):
> You can use another shorthand option to write lambdas when a function type is the last parameter of a function. If so, you can place the lambda expression after the closing parenthesis to call the function. This makes your code more readable because it separates the lambda expression from the other parameters.

#### الترجمة الحرفية:
> يمكنك استخدام خيار اختصار آخر لكتابة الـ lambdas عندما يكون نوع الدالة هو آخر معامل في الدالة. في هذه الحالة، يمكنك وضع تعبير lambda بعد القوس الختامي لاستدعاء الدالة. هذا يجعل كودك أكثر قابلية للقراءة لأنه يفصل تعبير lambda عن باقي المعاملات.

#### الشرح المبسّط:
هذا اختصار تركيبي إضافي على البند 34: عندما تكون الـ lambda هي "آخر معامل" في الدالة (كما هو الحال في `extraTreat` في مثالنا)، يمكن إخراجها خارج الأقواس بالكامل ووضعها مباشرة بعد القوس الختامي `)`، فتبدو وكأنها جزء من "جسم" استدعاء الدالة نفسها. أهمية هذا النمط أنه يفصل بصرياً بين المعاملات العادية (مثل `false`) وبين "السلوك" (الـ lambda)، مما يجعل الكود أشبه ببنية لغوية طبيعية أكثر قابلية للقراءة، وهو النمط الشائع جداً في Jetpack Compose لاحقاً. تشبيه يومي: مثل كتابة "اطلب طعاماً (بيتزا) ثم: أضف الجبنة، أضف الزيتون" حيث الجزء الأخير يبدو كتعليمات منفصلة أوضح بصرياً بدلاً من حشرها كلها داخل قوس واحد طويل. مثال عملي: `trickOrTreat(false) { "$it quarters" }` مطابقة تماماً لـ `trickOrTreat(false, { "$it quarters" })` لكنها أوضح بصرياً.

**لماذا؟** لأن فصل الـ lambda عن باقي المعاملات بصرياً يحسّن قابلية القراءة بشكل كبير، خصوصاً عندما تكون الـ lambda طويلة أو معقدة.

```kotlin
fun main() {
    val treatFunction = trickOrTreat(false) { "$it quarters" }
    val trickFunction = trickOrTreat(true, null)
    treatFunction()
    trickFunction()
}
```

#### 💡 التشبيه:
> تخيّل أنك تطلب من صديقك "اتصل بي، وقل له إنني وصلت" — الجزء الأخير أشبه بتعليمات إضافية تُذكر خارج الجملة الأساسية.
> **وجه الشبه:** الجملة الأساسية (استدعاء الدالة بمعاملاتها العادية) = "اتصل بي"؛ الـ trailing lambda = "وقل له إنني وصلت" (تعليمات السلوك المرفقة).

---

### 36. دالة repeat() والدوال من الدرجة الأعلى (Higher-Order Functions)

#### النص الأصلي يقول (English):
> When a function returns a function or takes a function as an argument, it's called a higher-order function. The repeat() function is one such higher-order function. The repeat() function is a concise way to express a for loop with functions. The repeat() function has this function signature: repeat(times: Int, action: (Int) -> Unit). The times parameter is the number of times that the action should happen. The action parameter is a function that takes a single Int parameter and returns a Unit type. The action function's Int parameter is the number of times that the action has executed so far, such as a 0 argument for the first iteration or a 1 argument for the second iteration.

#### الترجمة الحرفية:
> عندما تُرجع دالة دالة أخرى أو تأخذ دالة كمعامل، تُسمّى دالة من الدرجة الأعلى (higher-order function). دالة repeat() هي واحدة من هذه الدوال من الدرجة الأعلى. دالة repeat() هي طريقة موجزة للتعبير عن حلقة for باستخدام الدوال. توقيع دالة repeat() هو: repeat(times: Int, action: (Int) -> Unit). معامل times هو عدد المرات التي يجب أن يحدث فيها action. معامل action هو دالة تأخذ معاملاً واحداً من نوع Int وتُرجع نوع Unit. معامل Int الخاص بدالة action هو عدد المرات التي نُفِّذ فيها action حتى الآن، مثل معامل 0 للتكرار الأول أو معامل 1 للتكرار الثاني.

#### الشرح المبسّط:
هذا يلخّص ويطبّق كل ما تعلمناه في البنود من 26 إلى 35 عن الدوال كقيم: `repeat()` هي دالة جاهزة في مكتبة كوتلن القياسية تأخذ دالة أخرى (action) وتنفّذها عدد `times` من المرات، وهي مثال حي على "دالة من الدرجة الأعلى" (higher-order function) — وهو مصطلح يصف أي دالة تأخذ دالة كمعامل أو تُرجع دالة. أهميتها أنها توفر بديلاً أنيقاً وموجزاً لحلقة `for` التقليدية، خصوصاً عند استخدامها مع صيغة trailing lambda من البند 35. تشبيه يومي: مثل طلب من موظف "كرّر هذه الخطوة 4 مرات" بدلاً من كتابة نفس الخطوة أربع مرات منفصلة — العدد (times) والفعل المطلوب تكراره (action) كلاهما محدد بوضوح. مثال عملي: `repeat(4) { treatFunction() }` تستدعي `treatFunction()` أربع مرات متتالية.

**لماذا؟** لأن `repeat()` تجمع بين الإيجاز اللغوي (trailing lambda) والقوة الوظيفية (تمرير سلوك كامل)، وهي مثال تطبيقي شامل يوضح فائدة كل المفاهيم السابقة عن الدوال والـ lambdas مجتمعة.

```algorithm
1 | تحديد عدد التكرارات المطلوب | times: Int | يحدد كم مرة سيُنفَّذ action
2 | تنفيذ action في كل تكرار | action: (Int) -> Unit | يُستدعى مع رقم التكرار الحالي (0، 1، 2...)
3 | التوقف بعد الوصول للعدد المحدد | repeat() | ينهي التكرار تلقائياً دون حلقة for يدوية
```

```kotlin
fun main() {
    val treatFunction = trickOrTreat(false) { "$it quarters" }
    val trickFunction = trickOrTreat(true, null)
    repeat(4) { treatFunction() } // Repeats 4 times
    trickFunction()
}
```
> **الناتج المتوقع:**
> ```
> 5 quarters
> Have a treat!
> Have a treat!
> Have a treat!
> Have a treat!
> No treats!
> ```

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا تُعتبر `repeat()` دالة من الدرجة الأعلى (higher-order function) وليست دالة عادية؟
> **لماذا هذا مهم؟** لأن فهم هذا المصطلح أساسي لفهم كيف تُبنى واجهات Compose لاحقاً، حيث تُمرَّر دوال @Composable كمعاملات باستمرار.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `val` | متغيّر ثابت (read-only) لا يمكن تعديل قيمته بعد التعيين | `val count: Int = 2` |
| `var` | متغيّر قابل للتغيير (mutable) | `var favoriteActor: String = "..."` |
| `Type Inference` | استنتاج المترجم لنوع البيانات دون كتابته صراحة | `val count = 2` → `Int` |
| `if/else` | جملة شرطية بسيطة بحالتين | يُستخدم عند وجود احتمالين فقط |
| `when` | جملة شرطية لعدة فروع، تُقيَّم بالتتابع | يُفضَّل عند أكثر من فرعين |
| `null` | إشارة إلى عدم وجود قيمة على الإطلاق | `val x = null` |
| `?` (nullable type) | يسمح للمتغيّر بحمل null | `String?` |
| `?.` (Safe Call) | وصول آمن لخاصية متغيّر قد يكون null | يُرجع null بدلاً من التعطل |
| `!!` (Not-null Assertion) | تأكيد أن القيمة ليست null (خطر) | قد يسبب `NullPointerException` |
| `?:` (Elvis Operator) | قيمة افتراضية إن كانت النتيجة null | `x?.length ?: 0` |
| `fun` | كلمة إعلان الدالة | `fun greet() {...}` |
| `Unit` | نوع الإرجاع الافتراضي؛ يعني "لا قيمة" | اختياري كتابته |
| `Function Type` | وصف شكل الدالة (معاملات وإرجاع) | `(Int) -> String` |
| `Lambda Expression` | تعريف دالة مختصر بدون `fun` | `{ println("Hi") }` |
| `it` | الاسم الضمني لمعامل lambda وحيد | `{ "$it quarters" }` |
| `Higher-Order Function` | دالة تأخذ دالة كمعامل أو تُرجع دالة | `repeat()` |
| `repeat()` | دالة جاهزة لتكرار فعل عدد محدد من المرات | `repeat(4) { ... }` |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `main()` | نقطة دخول أي برنامج كوتلن | إلزامية في كل برنامج |
| `println()` | طباعة نص على الشاشة | تدعم string templates عبر `$` |
| `::functionName` | مرجعية لدالة موجودة | لتخزين دالة معرَّفة بـ `fun` في متغيّر |
| `-> ` (سهم) | يفصل بين المعاملات والجسم في lambda وwhen | يُستخدم في كليهما بمعانٍ مختلفة |
| `in x..y` | فحص انتماء قيمة لمدى معين | يُستخدم داخل `when` |
| `is Type` | فحص نوع بيانات فعلي وقت التنفيذ | يُستخدم داخل `when` |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| `val` مقابل `var` | ثابت (read-only) | متغيّر (mutable) | val لا يمكن إعادة تعيينه بعد أول قيمة |
| `if/else` مقابل `when` | مناسب لحالتين | مناسب لأكثر من حالتين | when أوضح مع فروع كثيرة |
| `?.` مقابل `!!` | آمن، يُرجع null بدلاً من التعطل | خطر، قد يسبب crash | !! يُستخدم فقط عند التأكد الكامل |
| دالة عادية (`fun`) مقابل `lambda` | تحتاج اسم وكلمة `fun` | مختصرة، بلا اسم إلزامي | lambda أنسب للاستخدام لمرة واحدة |
| lambda عادية مقابل trailing lambda | داخل الأقواس | خارج الأقواس (آخر معامل) | trailing lambda أوضح بصرياً |

### قاموس المصطلحات (Glossary)
| الفئة | المصطلحات |
| --- | --- |
| المتغيّرات والأنواع | `val`, `var`, `Type Inference`, `String`, `Int`, `Double`, `Float`, `Boolean` |
| الشروط | `if/else`, `else if`, `when`, `in`, `is` |
| Null Safety | `null`, `nullable type (?)`, `Safe Call (?.)`, `Not-null Assertion (!!)`, `Elvis Operator (?:)`, `NullPointerException` |
| الدوال | `fun`, `Unit`, `return`, `parameter`, `default argument` |
| الدوال المتقدمة | `function reference (::)`, `lambda expression`, `function type`, `it`, `trailing lambda`, `higher-order function`, `repeat()` |

### أبرز النقاط الذهبية
1. استخدم `val` بشكل افتراضي، ولا تلجأ لـ `var` إلا عند الحاجة الفعلية للتغيير.
2. `when` أوضح من سلاسل `else if` الطويلة عند وجود أكثر من فرعين.
3. تجنّب `!!` قدر الإمكان، وفضّل `?.` أو `?:` للتعامل الآمن مع null.
4. أي دالة بدون تحديد نوع إرجاع، نوعها الافتراضي `Unit`.
5. الدوال في كوتلن يمكن تخزينها، تمريرها، وإرجاعها تماماً مثل أي قيمة أخرى.
6. صيغة الـ trailing lambda هي الأساس الذي تُبنى عليه لاحقاً دوال `@Composable` في Jetpack Compose.

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| محاولة تعديل قيمة `val` بعد التعيين الأول | استخدم `var` بدلاً من `val` إن كنت تتوقع التغيير |
| نسيان علامة `?` عند التصريح بمتغيّر قد يكون null | أضف `?` بعد النوع: `String?` بدلاً من `String` |
| استخدام `!!` دون التأكد من القيمة | استخدم `?.` أو `?:` بدلاً منها لتجنّب الانهيار |
| الخلط بين اسم الدالة `trick` والاستدعاء `trick()` | تذكّر أن `trick` بدون أقواس هو مرجع للدالة، أما `trick()` فينفّذها |
| نسيان أن `when` تتوقف عند أول شرط مطابق | رتّب الشروط من الأكثر تحديداً إلى الأعم (كما في مثال الأعداد الأولية قبل `in 1..10`) |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: تحديد نوع الجملة الشرطية المناسبة
> ما هدف هذه العملية؟ مساعدة المبرمج على اختيار بين if/else وwhen بشكل صحيح.
```algorithm
1 | فحص عدد الاحتمالات الممكنة | التفكير المنطقي | إن كان هناك احتمالان فقط تابع للخطوة 2، وإلا انتقل للخطوة 3
2 | استخدام if/else | كلمات if و else | مناسب تماماً لحالتين فقط
3 | استخدام when | كلمة when مع -> | مناسب لثلاثة فروع أو أكثر، مع دعم in وis والفاصلة
```

#### ⚙️ الخطوات / الخوارزمية: التعامل الآمن مع متغيّر Nullable
> ما هدف هذه العملية؟ الوصول لخاصية متغيّر دون التسبب بانهيار التطبيق.
```algorithm
1 | التحقق من نوع المتغيّر | إعلان `Type?` | يُصرَّح بالمتغيّر كقابل لحمل null صراحة
2 | الوصول الآمن للخاصية | عامل `?.` | يُرجع null تلقائياً إن كانت القيمة null، دون تعطل
3 | تحديد قيمة بديلة (اختياري) | عامل `?:` | يوفر قيمة افتراضية بدلاً من null النهائي
```

---

### أنماط الأكواد والبنى المتكررة
| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| إعلان متغيّر بنوع صريح | `val name: Type = value` | عندما تريد وضوحاً كاملاً أو عدم توفر قيمة ابتدائية |
| إعلان متغيّر بالاستدلال | `val name = value` | عندما تكون القيمة الابتدائية كافية لتحديد النوع |
| شرط متعدد الفروع | `when(x) { cond -> body }` | عند وجود أكثر من فرعين |
| وصول آمن + قيمة افتراضية | `x?.prop ?: default` | عند التعامل مع متغيّر nullable وتحتاج قيمة دائماً |
| lambda مختصرة بمعامل واحد | `{ "$it ..." }` | عندما تأخذ الدالة معاملاً واحداً فقط |
| trailing lambda | `function(arg) { lambdaBody }` | عندما تكون الـ lambda آخر معامل في الدالة |

### أنماط التعامل والسلوك
| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| قيمة قد لا تكون موجودة | استخدم `?.` و`?:` | لتجنّب `NullPointerException` |
| تكرار فعل عدد محدد من المرات | استخدم `repeat(n) { ... }` | أوجز وأوضح من حلقة for التقليدية |
| تمرير سلوك مخصص لدالة | مرّر lambda كمعامل | يمنح مرونة دون تعديل كود الدالة الأصلية |

### الأفكار الرئيسية الشاملة
الفكرة المحورية في هذه المحاضرة هي أن كوتلن تعامل كل شيء — القيم، المتغيّرات، وحتى الدوال نفسها — كأنواع بيانات لها نظام صارم للتحقق (type-safety)، مع إتاحة اختصارات كثيرة (type inference، lambda shorthand، trailing lambda) لتقليل الكود دون التضحية بالأمان. مفهوم Null Safety تحديداً هو ما يميز كوتلن عن لغات كثيرة أخرى، ويمنع فئة كاملة من الأعطال الشائعة في تطبيقات الأندرويد الحقيقية.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% (4 أسئلة) | سيناريو كود 35% (6 أسئلة) | تطبيق 40% (6 أسئلة).

### السؤال 1 (medium)
What is the default return type of a Kotlin function if none is specified?
أ) `String`  ب) `Any`  ج) `Unit`  د) `null`
**الإجابة الصحيحة: ج**
**التعليل:** النص الأصلي يذكر صراحة أن نوع الإرجاع الافتراضي هو `Unit`. الخيار أ خاطئ لأن String ليست الافتراضي بل نوع محدد صراحةً. الخيار ب خاطئ لأن Any نوع عام يُستخدم لأغراض أخرى. الخيار د خاطئ لأن null ليس نوع بيانات بل قيمة.

---

### السؤال 2 (medium)
Which keyword should you use to declare a variable whose value will never change?
أ) `var`  ب) `val`  ج) `fun`  د) `when`
**الإجابة الصحيحة: ب**
**التعليل:** `val` يُستخدم للمتغيّرات الثابتة (read-only) التي لا تتغيّر قيمتها. `var` (أ) مخصص للمتغيّرات القابلة للتغيير، وهو عكس المطلوب. `fun` (ج) لإعلان الدوال وليس المتغيّرات. `when` (د) جملة شرطية وليست إعلان متغيّر.

---

### السؤال 3 (hard)
```kotlin
val x = 4
when (x) {
    2, 3, 5, 7 -> println("prime")
    in 1..10 -> println("in range")
    else -> println("other")
}
```
What will this code print?
أ) `prime`  ب) `in range`  ج) `other`  د) لا شيء (خطأ ترجمة)
**الإجابة الصحيحة: ب**
**التعليل:** القيمة 4 ليست ضمن قائمة الأعداد الأولية (2, 3, 5, 7) في الفرع الأول، لذا ينتقل الفحص للفرع الثاني `in 1..10` وتكون 4 ضمن هذا المدى فعلاً، فتُطبع "in range" ويتوقف الفحص هناك. الخيار أ خاطئ لأن 4 غير موجودة في قائمة الفرع الأول. الخيار ج خاطئ لأن الفرع الثاني تحقق قبل الوصول لـ else. الخيار د خاطئ لأن الكود صحيح تركيبياً بالكامل.

---

### السؤال 4 (medium)
Which operator safely accesses a property of a nullable variable without crashing the app?
أ) `!!`  ب) `?.`  ج) `::`  د) `->`
**الإجابة الصحيحة: ب**
**التعليل:** `?.` هو عامل الاستدعاء الآمن الذي يُرجع null بدلاً من التعطل. `!!` (أ) هو العكس تماماً، قد يسبب انهياراً. `::` (ج) عامل مرجعية الدالة وليس له علاقة بالـ null safety. `->` (د) يُستخدم في lambdas وwhen، ليس للوصول الآمن.

---

### السؤال 5 (hard)
```kotlin
var favoriteActor: String? = null
println(favoriteActor!!.length)
```
What happens when this code runs?
أ) يطبع 0  ب) يطبع null  ج) يتعطل البرنامج مع NullPointerException  د) خطأ ترجمة
**الإجابة الصحيحة: ج**
**التعليل:** عامل `!!` يؤكد أن القيمة ليست null رغم كونها فعلاً null، مما يؤدي لرمي استثناء NullPointerException أثناء التنفيذ. الخيار أ خاطئ لأن 0 ليست القيمة الناتجة من هذا الاستثناء. الخيار ب خاطئ لأن `!!` لا يُرجع null أبداً بعكس `?.`. الخيار د خاطئ لأن الكود يترجم بنجاح لكنه يتعطل وقت التشغيل فقط.

---

### السؤال 6 (medium)
What does the `?:` Elvis operator do?
أ) يرمي استثناء دائماً  ب) يوفر قيمة افتراضية إذا كانت النتيجة null  ج) يحوّل النص لحروف كبيرة  د) يكرر تنفيذ سطر معين
**الإجابة الصحيحة: ب**
**التعليل:** كما ورد في النص الأصلي، Elvis operator يوفر قيمة بديلة عندما يُرجع الجزء السابق null. الخيار أ خاطئ لأنه على العكس يمنع رمي الاستثناء. الخيار ج خاطئ لأنه لا علاقة له بتحويل الحروف. الخيار د خاطئ لأن التكرار من وظيفة `repeat()` وليس Elvis operator.

---

### السؤال 7 (hard)
```kotlin
val trick = { println("No treats!") }
val treat: () -> Unit = { println("Have a treat!") }
```
Why does `treat` need explicit type declaration `() -> Unit` while `trick` does not need it?
أ) لأن treat تُرجع قيمة فعلية بينما trick لا تُرجع شيئاً
ب) كلاهما لهما نفس النوع فعلياً، لكن treat فقط أُعلن نوعها صراحةً كمثال توضيحي بينما استُدل على نوع trick تلقائياً
ج) لأن trick تحتوي أخطاء برمجية
د) لأن treat تأخذ معاملات وtrick لا تأخذ
**الإجابة الصحيحة: ب**
**التعليل:** كلا المتغيّرين لهما نفس نوع الدالة فعلياً `() -> Unit`، لكن المحاضرة أوضحت أن treat فقط أُعلن نوعها صراحة كمثال، بينما استُدل على نوع trick تلقائياً تماماً كأي متغيّر آخر (type inference). الخيار أ خاطئ لأن كلاهما لا يُرجعان قيمة فعلية (كلاهما Unit). الخيار ج خاطئ لأن الكود صحيح تماماً. الخيار د خاطئ لأن لا أحد منهما يأخذ معاملات.

---

### السؤال 8 (medium)
What is a "higher-order function" in Kotlin?
أ) دالة تُعرَّف داخل صنف (class) فقط
ب) دالة تأخذ دالة أخرى كمعامل أو تُرجع دالة
ج) دالة تحتوي على أكثر من return statement
د) دالة تُستدعى أكثر من مرة واحدة
**الإجابة الصحيحة: ب**
**التعليل:** هذا هو التعريف الحرفي الوارد في المحاضرة عن higher-order functions، وrepeat() مثال عليها. الخيار أ خاطئ لأن هذا المفهوم غير مرتبط بالأصناف. الخيار ج خاطئ لأن عدد جمل return لا علاقة له بهذا المصطلح. الخيار د خاطئ لأن عدد مرات الاستدعاء لا يحدد كون الدالة من الدرجة الأعلى.

---

### السؤال 9 (hard)
```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: ((Int) -> String)?): () -> Unit { ... }
val trickFunction = trickOrTreat(true, null)
```
Why is passing `null` as the second argument valid here?
أ) لأن extraTreat مُعرَّف كنوع دالة قابل للـ null بإضافة ? خارج القوسين
ب) لأن كوتلن تسمح بتمرير null لأي معامل دائماً
ج) لأن isTrick صحيح (true) فقط
د) هذا خطأ برمجي ولن يترجم الكود
**الإجابة الصحيحة: أ**
**التعليل:** المعامل extraTreat مُعلن كـ `((Int) -> String)?`، أي نوع دالة قابل لحمل null صراحةً، لذا تمرير null صحيح تماماً. الخيار ب خاطئ لأن كوتلن ترفض تمرير null لأي معامل غير مُعلن صراحةً كـ nullable. الخيار ج خاطئ لأن قيمة isTrick لا علاقة لها بصحة تمرير null للمعامل الثاني. الخيار د خاطئ لأن الكود صحيح تركيبياً تماماً.

---

### السؤال 10 (medium)
Which shorthand allows omitting the parameter name in a lambda with a single parameter?
أ) `it`  ب) `this`  ج) `self`  د) `val`
**الإجابة الصحيحة: أ**
**التعليل:** كوتلن تُسنِد ضمنياً اسم `it` لأي معامل وحيد في lambda لم يُسمَّ صراحة. `this` (ب) و`self` (ج) مصطلحات من لغات أخرى وليست الطريقة المتّبعة هنا. `val` (د) لإعلان المتغيّرات وليس أسماء معاملات lambda.

---

### السؤال 11 (hard)
```kotlin
val treatFunction = trickOrTreat(false) { "$it quarters" }
```
What is this syntax called, and what condition must be met to use it?
أ) Safe call syntax؛ يُستخدم مع أي متغيّر nullable
ب) Trailing lambda syntax؛ يُستخدم فقط عندما يكون نوع الدالة هو آخر معامل في الدالة
ج) Elvis syntax؛ يُستخدم فقط مع القيم الرقمية
د) Function reference syntax؛ يُستخدم فقط مع دوال معرَّفة بـ fun
**الإجابة الصحيحة: ب**
**التعليل:** هذا هو trailing lambda syntax بالضبط كما ورد في المحاضرة، ويُشترط أن تكون الـ lambda هي آخر معامل في تعريف الدالة. الخيار أ خاطئ لأن safe call يتعلق بـ `?.` وليس بتمرير lambda. الخيار ج خاطئ لأن Elvis operator هو `?:` وغير مرتبط بهذا. الخيار د خاطئ لأن function reference يستخدم `::` وليس هذه الصياغة.

---

### السؤال 12 (medium)
What is printed by `repeat(3) { println("Hi") }`?
أ) `Hi` مرة واحدة فقط  ب) `Hi` مطبوعة 3 مرات  ج) لا شيء  د) خطأ ترجمة
**الإجابة الصحيحة: ب**
**التعليل:** دالة repeat تنفّذ الـ action الممرَّرة لها بعدد times المحدد، وهنا 3، فتُطبع "Hi" ثلاث مرات متتالية. الخيار أ خاطئ لأن العدد المحدد هو 3 وليس 1. الخيار ج خاطئ لأن الكود صحيح وسينفّذ فعلياً. الخيار د خاطئ لأن هذه صياغة trailing lambda صحيحة تماماً.

---

### السؤال 13 (hard)
```kotlin
val languageName = "Kotlin"
languageName.inc()
```
Why does this code fail to compile?
أ) لأن inc() دالة غير موجودة في كوتلن إطلاقاً
ب) لأن languageName استُدل على نوعها كـ String، وinc() دالة خاصة بـ Int
ج) لأن اسم المتغيّر languageName غير صحيح تركيبياً
د) لأن يجب استخدام var بدلاً من val هنا
**الإجابة الصحيحة: ب**
**التعليل:** كما أوضحت المحاضرة، `inc()` هي دالة عامل خاصة بنوع Int، بينما استُدل على أن languageName من نوع String، فلا يمكن استدعاء دالة خاصة بـ Int عليه. الخيار أ خاطئ لأن inc() دالة موجودة فعلياً في كوتلن لكن لنوع مختلف. الخيار ج خاطئ لأن اسم المتغيّر صحيح تركيبياً. الخيار د خاطئ لأن المشكلة في نوع البيانات وليس في val/var.

---

### السؤال 14 (medium)
Which keyword inside a `when` statement checks the actual runtime type of a variable?
أ) `in`  ب) `is`  ج) `as`  د) `val`
**الإجابة الصحيحة: ب**
**التعليل:** `is` تُستخدم لفحص نوع البيانات الفعلي للمتغيّر وقت التنفيذ كما ورد في المحاضرة. `in` (أ) تُستخدم لفحص الانتماء لمدى قيم وليس فحص النوع. `as` (ج) تُستخدم للتحويل الصريح بين الأنواع (casting) وليست جزءاً من هذه المحاضرة. `val` (د) لإعلان المتغيّرات فقط.

---

### السؤال 15 (hard)
```kotlin
fun birthdayGreeting(name: String = "Rover", age: Int): String {
    return "Happy Birthday, $name! You are now $age years old!"
}
println(birthdayGreeting(age = 5))
```
Why must the argument `age` be passed using its name (`age = 5`) here?
أ) لأنه يجب دائماً تسمية كل المعاملات في كوتلن
ب) لأن name له قيمة افتراضية وتم حذفه من الاستدعاء، فيجب تحديد age بالاسم لتفادي الغموض
ج) لأن age من نوع Int ويجب دائماً تسميته
د) هذا خطأ ولن يترجم الكود
**الإجابة الصحيحة: ب**
**التعليل:** بما أن name له قيمة افتراضية وتم حذف تمريره، يجب تحديد age صراحة بالاسم حتى يعرف المترجم أي معامل يقصد المبرمج بالضبط، بدلاً من الاعتماد على الترتيب فقط. الخيار أ خاطئ لأن التسمية ليست إلزامية دائماً في كل الحالات. الخيار ج خاطئ لأن نوع البيانات (Int) لا علاقة له بضرورة التسمية. الخيار د خاطئ لأن الكود صحيح تماماً وهذا هو الاستخدام الصحيح لتخطي معامل افتراضي.

---

### السؤال 16 (medium)
What is the primary benefit of treating functions as first-class data types in Kotlin?
أ) تسريع تنفيذ البرنامج فقط
ب) السماح بتخزين الدوال في متغيّرات، تمريرها كمعاملات، وإرجاعها من دوال أخرى
ج) منع الأخطاء الإملائية في أسماء الدوال
د) تقليل عدد أسطر الكود إلى النصف دائماً
**الإجابة الصحيحة: ب**
**التعليل:** هذا هو بالضبط ما ورد في النص الأصلي حول الدوال كمنشآت من الدرجة الأولى (first-class constructs). الخيار أ خاطئ لأن هذا المفهوم غير مرتبط مباشرة بسرعة التنفيذ. الخيار ج خاطئ لأنه لا علاقة له بمنع الأخطاء الإملائية. الخيار د خاطئ لأن تقليل عدد الأسطر ليس نتيجة مضمونة أو ثابتة دائماً.

---

## الجزء الرابع: أسئلة تصحيح الكود

> يغطي أنواع الأخطاء التالية: compilation, logic, return_check, dead code, misconception.

### Debug Question 1 (syntax)
**The following code contains a bug:**
```kotlin
var favoriteActor: String = "Sandra Oh"
favoriteActor = null
```
**Find the bug:** Attempting to assign `null` to a variable declared with a non-nullable type `String`.
**Fixed code:**
```kotlin
var favoriteActor: String? = "Sandra Oh"
favoriteActor = null
```
**شرح الحل:**
1. النوع `String` بدون `?` غير قابل لحمل null، فيرفض المترجم إسناد null له مباشرة.
2. الحل هو إضافة `?` بعد النوع لجعله `String?`، مما يسمح صراحةً بحمل null.

---

### Debug Question 2 (logic)
**The following code contains a bug:**
```kotlin
val x = 4
when (x) {
    in 1..10 -> println("in range")
    2, 3, 5, 7 -> println("prime")
    else -> println("other")
}
```
**Find the bug:** The order of branches is wrong; since `when` evaluates sequentially and stops at the first match, the more specific condition (prime numbers) should come before the more general range condition.
**Fixed code:**
```kotlin
val x = 4
when (x) {
    2, 3, 5, 7 -> println("prime")
    in 1..10 -> println("in range")
    else -> println("other")
}
```
**شرح الحل:**
1. جملة `when` تتوقف عند أول شرط يتحقق، لذا وضع الشرط العام (`in 1..10`) قبل الشرط الخاص (الأعداد الأولية) يجعل الشرط الخاص غير قابل للوصول أبداً لأي عدد بين 1-10.
2. الترتيب الصحيح هو من الأكثر تحديداً إلى الأعم، كما ورد في المحاضرة الأصلية.

---

### Debug Question 3 (return_check)
**The following code contains a bug:**
```kotlin
fun birthdayGreeting(name: String, age: Int) {
    val message = "Happy Birthday, $name! You are now $age years old!"
    return message
}
```
**Find the bug:** The function does not declare a return type, so its default type is `Unit`, but it tries to `return` a `String` value.
**Fixed code:**
```kotlin
fun birthdayGreeting(name: String, age: Int): String {
    val message = "Happy Birthday, $name! You are now $age years old!"
    return message
}
```
**شرح الحل:**
1. بما أن الدالة لم تحدد نوع إرجاع، افتراضياً يكون النوع `Unit` (لا قيمة)، لذا لا يمكن أن تحتوي على `return` يُرجع قيمة فعلية.
2. الحل هو إضافة `: String` بعد قوسي المعاملات لتحديد نوع الإرجاع الصحيح المطابق لما تُرجعه فعلياً.

---

### Debug Question 4 (dead_code)
**The following code contains a bug:**
```kotlin
val trafficLightColor = "Red"
if (trafficLightColor == "Red") {
    println("Stop")
} else if (trafficLightColor == "Red") {
    println("Also stop?")
} else {
    println("Go")
}
```
**Find the bug:** The second condition `else if (trafficLightColor == "Red")` is dead code — it can never execute because the first `if` already catches this exact same condition.
**Fixed code:**
```kotlin
val trafficLightColor = "Red"
if (trafficLightColor == "Red") {
    println("Stop")
} else if (trafficLightColor == "Yellow") {
    println("Slow")
} else {
    println("Go")
}
```
**شرح الحل:**
1. الشرط الثاني مطابق تماماً للشرط الأول، وبما أن `if/else if` يتوقف عند أول شرط يتحقق، فإن الفرع الثاني لن يُنفَّذ أبداً مهما كانت القيمة.
2. التصحيح يكون بتغيير الشرط الثاني ليفحص قيمة مختلفة فعلياً (مثل "Yellow") بدلاً من تكرار نفس الشرط.

---

### Debug Question 5 (misconception)
**The following code contains a bug:**
```kotlin
fun trick() {
    println("No treats!")
}
fun main() {
    val trickFunction = trick()
}
```
**Find the bug:** Writing `trick()` with parentheses executes the function immediately and stores its return value (`Unit`) in `trickFunction`, instead of storing a reference to the function itself.
**Fixed code:**
```kotlin
fun trick() {
    println("No treats!")
}
fun main() {
    val trickFunction = ::trick
}
```
**شرح الحل:**
1. المبرمج يظن أنه يخزّن "إشارة" للدالة، لكنه في الحقيقة يستدعيها فوراً بسبب وجود الأقواس `()`، ويخزّن قيمة إرجاعها (Unit) فقط.
2. الحل الصحيح هو استخدام عامل مرجعية الدالة `::trick` بدون أقواس لتخزين إشارة فعلية للدالة قابلة للاستدعاء لاحقاً.

---

### Debug Question 6 (compilation)
**The following code contains a bug:**
```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: (Int) -> String): () -> Unit {
    if (isTrick) { return trick }
    else {
        println(extraTreat(5))
        return treat
    }
}
val trick = { println("No treats!") }
val treat = { println("Have a treat!") }
fun main() {
    val trickFunction = trickOrTreat(true, null)
}
```
**Find the bug:** Passing `null` for `extraTreat`, but its type `(Int) -> String` is not declared as nullable.
**Fixed code:**
```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: ((Int) -> String)?): () -> Unit {
    if (isTrick) { return trick }
    else {
        if (extraTreat != null) { println(extraTreat(5)) }
        return treat
    }
}
```
**شرح الحل:**
1. النوع `(Int) -> String` غير قابل لحمل null افتراضياً، فتمرير `null` له يسبب خطأ ترجمة.
2. الحل هو إحاطة نوع الدالة بقوسين إضافيين وإضافة `?` خارجهما `((Int) -> String)?`، مع إضافة فحص `!= null` قبل الاستدعاء الفعلي.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Season Checker — fill_gaps
**Scenario / Task:**
Write a `when` statement that takes a month number (1-12) and prints the season it belongs to (Winter: 12,1,2 — Spring: 3,4,5 — Summer: 6,7,8 — Fall: 9,10,11).

**Requirements:**
1. Use a `when` statement with comma-separated values for each season.
2. Include an `else` branch for invalid month numbers (e.g., 0 or 13).

**نموذج الحل:**
```kotlin
fun main() {
    val month = 7
    when (month) {
        12, 1, 2 -> println("Winter")
        3, 4, 5 -> println("Spring")
        6, 7, 8 -> println("Summer")
        9, 10, 11 -> println("Fall")
        else -> println("Invalid month")
    }
}
```
الشرح: نستخدم الفاصلة لتجميع الأشهر التي تنتمي لنفس الفصل، ونضيف `else` كإجراء وقائي لأي رقم شهر غير منطقي.

---

### Exercise 2: Safe Age Calculator — scenario
**Scenario / Task:**
You have a nullable variable `birthYear: Int?`. Write code that calculates the age (assume current year is 2026) if `birthYear` is not null, otherwise print "Age unknown".

**Requirements:**
1. Use the `?.` safe call operator and `?:` Elvis operator together.
2. Do not use `!!`.

**نموذج الحل:**
```kotlin
fun main() {
    val birthYear: Int? = 2000
    val age = birthYear?.let { 2026 - it } ?: "Age unknown"
    println(age)
}
```
الشرح: نستخدم `?.` للوصول الآمن، ثم `?:` لتوفير قيمة نصية بديلة "Age unknown" إن كانت birthYear غير موجودة، دون المخاطرة باستخدام `!!`.

---

### Exercise 3: Custom Discount Function — code_fix
**Scenario / Task:**
The following function should return a discounted price, but it always returns the original price due to a logic bug. Fix it.
```kotlin
fun applyDiscount(price: Double, discountPercent: Double): Double {
    val discount = price * discountPercent
    return price
}
```

**نموذج الحل:**
```kotlin
fun applyDiscount(price: Double, discountPercent: Double): Double {
    val discount = price * discountPercent
    return price - discount
}
```
الشرح: الخطأ أن الدالة تحسب الخصم في متغيّر `discount` لكنها لا تستخدمه فعلياً عند الإرجاع؛ التصحيح هو طرح الخصم من السعر الأصلي.

---

### Exercise 4: Lambda-Based Calculator — scenario
**Scenario / Task:**
Write a function `calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int` that applies a given operation lambda to two numbers, then call it with an addition lambda and a multiplication lambda.

**نموذج الحل:**
```kotlin
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}
fun main() {
    val sum = calculate(3, 4) { x, y -> x + y }
    val product = calculate(3, 4) { x, y -> x * y }
    println(sum)     // 7
    println(product) // 12
}
```
الشرح: نستخدم trailing lambda syntax لتمرير عملية مختلفة في كل استدعاء دون تعديل دالة calculate نفسها.

---

### Exercise 5: Repeat Countdown — scenario
**Scenario / Task:**
Use `repeat()` to print a countdown from 5 to 1 (Hint: use the `it` parameter creatively, since `repeat` counts from 0).

**نموذج الحل:**
```kotlin
fun main() {
    repeat(5) { println(5 - it) }
}
```
الشرح: بما أن `it` يبدأ من 0 ويزيد حتى `times - 1`، فإن `5 - it` تعطي التسلسل 5، 4، 3، 2، 1 تماماً كالمطلوب.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: When Statement Evaluation
**Input:**
```kotlin
val x = 7
when (x) {
    2, 3, 5, 7 -> println("A")
    in 1..10 -> println("B")
    is Int -> println("C")
    else -> println("D")
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص x مقابل 2, 3, 5, 7 | ؟ |
| 2 | القرار | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص هل x (=7) ضمن {2, 3, 5, 7} | نعم، 7 موجودة في القائمة |
| 2 | تنفيذ الفرع الأول وإيقاف الفحص | يُطبع "A" ولا تُفحص الفروع الأخرى |

**Result:** `A`

---

### Trace Exercise 2: Nullable Chain
**Input:**
```kotlin
var name: String? = "Kotlin"
val len1 = name?.length ?: -1
name = null
val len2 = name?.length ?: -1
println("$len1, $len2")
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تقييم name?.length عندما name = "Kotlin" | ؟ |
| 2 | تقييم name?.length عندما name = null | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | name ليست null، فـ `?.length` تُرجع 6 مباشرة، والـ Elvis لا يُستخدم | len1 = 6 |
| 2 | name أصبحت null، فـ `?.length` تُرجع null، فيُستخدم البديل بعد `?:` | len2 = -1 |

**Result:** `6, -1`

---

### Trace Exercise 3: Higher-Order Function Execution
**Input:**
```kotlin
fun trickOrTreat(isTrick: Boolean, extraTreat: (Int) -> String): () -> Unit {
    if (isTrick) { return trick } else { println(extraTreat(2)); return treat }
}
val trick = { println("No treats!") }
val treat = { println("Have a treat!") }
fun main() {
    val result = trickOrTreat(false) { "$it candies" }
    result()
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استدعاء trickOrTreat(false, lambda) | ؟ |
| 2 | تنفيذ extraTreat(2) وطباعة الناتج | ؟ |
| 3 | استدعاء result() | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | isTrick = false، فيدخل جسم else | لا شيء يُطبع بعد |
| 2 | extraTreat(2) تُستدعى بالمعامل 2، تُرجع "2 candies"، تُطبع مباشرة | يُطبع "2 candies" |
| 3 | trickOrTreat تُرجع treat، ثم result() تستدعي treat فعلياً | يُطبع "Have a treat!" |

**Result:**
```
2 candies
Have a treat!
```

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: Traffic Light State Machine — uml_design
**Task:**
Design a flowchart diagram (using `when`) that models a traffic light system with three states (Red, Yellow, Green) and their transitions: Red → Green, Green → Yellow, Yellow → Red. Show the decision points and actions for each state.

**نموذج الإجابة:**

#### 📊 المخطط: Traffic Light State Transitions

#### ما هذا المخطط؟
> يوضّح كيف تتحول إشارة المرور من حالة لأخرى بناءً على اللون الحالي، باستخدام منطق `when` لتحديد الفعل والحالة التالية.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Red | state | حالة التوقف الكامل |
| 2 | Green | state | حالة السماح بالسير |
| 3 | Yellow | state | حالة التحذير/الإبطاء |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Red | Green | timeout | انتقال عادي | بعد انتهاء وقت التوقف، تتحول لأخضر |
| Green | Yellow | timeout | انتقال عادي | بعد انتهاء وقت السير، تتحول لأصفر |
| Yellow | Red | timeout | انتقال عادي | بعد انتهاء وقت التحذير، تعود لأحمر |

```diagram
type: activity
title: Traffic Light State Machine
direction: TD
nodes:
  - id: red
    label: Red (Stop)
    kind: state
    level: 0
  - id: green
    label: Green (Go)
    kind: state
    level: 1
  - id: yellow
    label: Yellow (Slow)
    kind: state
    level: 2
edges:
  - from: red
    to: green
  - from: green
    to: yellow
  - from: yellow
    to: red
```

**معايير التقييم:**
- وضوح تسلسل الحالات الثلاث ودقة الانتقالات بينها.
- ربط كل حالة بمنطق `when` مناسب في الشرح.
- تغطية حالة `else` لأي قيمة غير متوقعة.

---

### Design Question 2: Function Type Signature Design — architecture
**Task:**
Design a function type signature (using Kotlin function type syntax) for a "validator" that takes a `String` password and returns `true` or `false` depending on whether it meets certain criteria. Then show how this function type could be passed as a parameter to another function called `checkPassword`.

**نموذج الإجابة:**
```kotlin
// Function type signature for a validator
val isValidPassword: (String) -> Boolean = { password -> password.length >= 8 }

// Higher-order function accepting the validator as a parameter
fun checkPassword(password: String, validator: (String) -> Boolean): String {
    return if (validator(password)) "Valid" else "Invalid"
}

fun main() {
    println(checkPassword("12345678", isValidPassword)) // Valid
    println(checkPassword("123", isValidPassword))       // Invalid
}
```

**معايير التقييم:**
- صحة صياغة نوع الدالة `(String) -> Boolean`.
- استخدام صحيح لتمرير الدالة كمعامل لدالة أعلى (higher-order function).
- إظهار فهم واضح للفرق بين تعريف نوع الدالة واستدعائها الفعلي.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What keyword declares an immutable (read-only) variable in Kotlin?
A: `val`

---

**Q2:** What is the default return type of a Kotlin function with no explicit return type?
A: `Unit`

---

**Q3:** Which operator safely accesses a property on a nullable variable and returns `null` instead of crashing?
A: The safe call operator `?.`

---

**Q4:** What exception can be thrown when using the `!!` not-null assertion operator on a `null` value?
A: `NullPointerException`

---

**Q5:** What does the Elvis operator `?:` do?
A: It provides a default value when the expression before it evaluates to `null`.

---

**Q6:** How do you declare a function type that can also hold `null`?
A: By wrapping the function type in parentheses followed by `?`, e.g. `((Int) -> String)?`

---

**Q7:** What implicit name does Kotlin give to a single lambda parameter if you don't name it?
A: `it`

---

**Q8:** What is a "higher-order function"?
A: A function that takes another function as a parameter or returns a function.

---

**Q9:** What operator is used to reference an existing function as a value (without calling it)?
A: The function reference operator `::`

---

**Q10:** What is "trailing lambda syntax"?
A: Placing the lambda expression outside the parentheses when it is the last parameter of a function call.

---

**Q11:** What does `repeat(times: Int, action: (Int) -> Unit)` do?
A: It executes the `action` function `times` number of times, similar to a for loop.

---

**Q12:** When should you use `when` instead of `if/else`?
A: When there are more than two branches to consider, for improved readability.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> مرجع مجمّع لأشمل مثال في المحاضرة (نظام Trick-or-Treat) الذي شُرح على دفعات متفرقة (البنود 27 إلى 36).

```kotlin
// Function returning Unit, printed directly
fun trick() {
    println("No treats!")
}

// Lambda expression stored in a variable, equivalent to trick()
val treat = { println("Have a treat!") }

// Higher-order function: takes a nullable function type and returns a function type
fun trickOrTreat(isTrick: Boolean, extraTreat: ((Int) -> String)?): () -> Unit {
    if (isTrick) {
        // Return a reference to the trick function
        return ::trick
    } else {
        // Safely call extraTreat only if it's not null
        if (extraTreat != null) {
            println(extraTreat(5))
        }
        // Return the treat lambda
        return treat
    }
}

fun main() {
    // Lambda with shorthand 'it' parameter name
    val coins: (Int) -> String = { "$it quarters" }

    // Trailing lambda syntax for the treat case
    val treatFunction = trickOrTreat(false) { "$it quarters" }
    // Passing null explicitly for the nullable function type
    val trickFunction = trickOrTreat(true, null)

    // repeat() as a higher-order function to call treatFunction 4 times
    repeat(4) { treatFunction() }
    trickFunction()
}
```
> **الناتج المتوقع:**
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

### Question 1: Explain the difference between `val` and `var` in Kotlin, with an example of when to use each.
**نموذج الإجابة:** `val` تُستخدم للمتغيّرات الثابتة التي لا تتغيّر قيمتها بعد التعيين الأول (read-only)، بينما `var` تُستخدم للمتغيّرات القابلة للتغيير (mutable). مثال: `val name = "Ali"` (لن يتغيّر اسم الشخص أثناء تنفيذ البرنامج)، مقابل `var score = 0` (تتغيّر النتيجة باستمرار أثناء اللعبة). يُنصح باستخدام `val` كخيار افتراضي، والانتقال لـ `var` فقط عند الحاجة الفعلية للتغيير.

---

### Question 2: What is Type Inference in Kotlin, and what happens if you don't provide an initial value?
**نموذج الإجابة:** Type Inference هو قدرة مترجم كوتلن على استنتاج نوع بيانات المتغيّر تلقائياً من قيمته الابتدائية، دون الحاجة لكتابة النوع صراحةً. مثال: `val count = 2` يجعل المترجم يستنتج أن count من نوع `Int`. لكن إذا لم تُقدَّم قيمة ابتدائية عند الإعلان، يجب تحديد النوع صراحةً لأن المترجم لا يملك أي معلومة يستنتج منها النوع.

---

### Question 3: Compare `if/else` and `when` statements — when should each be used?
**نموذج الإجابة:** `if/else` مناسبة عندما يوجد احتمالان فقط للفحص، بينما `when` مفضّلة عندما توجد أكثر من فرعين، لأنها أوضح وأكثر تنظيماً. كلاهما يمكن استخدامه كجملة (statement) لتنفيذ فعل، أو كتعبير (expression) لإرجاع قيمة تُخزَّن في متغيّر. مثال: فحص لون واحد فقط (أحمر/غير أحمر) يناسبه if/else، بينما فحص ثلاثة ألوان أو أكثر يناسبه when.

---

### Question 4: Explain Kotlin's Null Safety concept and why it's important.
**نموذج الإجابة:** Null Safety هو نظام في كوتلن يميّز صراحةً بين الأنواع القابلة لحمل null (`Type?`) وغير القابلة له (`Type`)، ويفرض على المبرمج التحقق قبل الوصول لأي خاصية متغيّر قد يكون null. أهميته أنه يمنع فئة كاملة من الأعطال الشائعة (NullPointerException) التي كانت تسبب انهيار تطبيقات كثيرة في لغات أخرى مثل Java القديمة. يتحقق ذلك عبر أدوات مثل `?.` (الوصول الآمن)، `!!` (التأكيد الخطر)، و`?:` (القيمة الافتراضية).

---

### Question 5: What is the difference between the `?.` safe call operator and the `!!` not-null assertion operator?
**نموذج الإجابة:** `?.` يتحقق أولاً من أن المتغيّر ليس null قبل الوصول للخاصية، وإن كان null يُرجع null بأمان دون تعطل البرنامج. أما `!!` فهو تأكيد صريح وخطر من المبرمج بأن القيمة ليست null بغض النظر عن الواقع، وإذا كانت فعلاً null فسيتعطل البرنامج فوراً برسالة `NullPointerException`. لذلك يُنصح دائماً باستخدام `?.` كخيار أول أكثر أماناً.

---

### Question 6: What does it mean that "functions are first-class constructs" in Kotlin?
**نموذج الإجابة:** يعني هذا أن الدوال في كوتلن تُعامَل كأي نوع بيانات آخر (مثل Int أو String)؛ يمكن تخزينها في متغيّرات، تمريرها كمعاملات لدوال أخرى، وإرجاعها كنتيجة من دوال أخرى. هذا يفتح الباب لمفاهيم متقدمة مثل الدوال من الدرجة الأعلى (higher-order functions) وتعبيرات lambda، وهي أساسية جداً في بناء واجهات Jetpack Compose لاحقاً.

---

### Question 7: What is a lambda expression, and how does the shorthand `it` work?
**نموذج الإجابة:** تعبير lambda هو صياغة موجزة لتعريف دالة دون استخدام كلمة `fun`، حيث يُكتب جسم الدالة مباشرة داخل أقواس معقوفة `{ }` ويُسند لمتغيّر أو يُمرَّر مباشرة. عندما تأخذ الـ lambda معاملاً واحداً فقط ولم يُسمَّ صراحةً، تُسنِد له كوتلن الاسم الضمني `it`، مما يسمح بحذف اسم المعامل والسهم `->` لجعل الكود أكثر إيجازاً.

---

### Question 8: Explain what a higher-order function is, using `repeat()` as an example.
**نموذج الإجابة:** الدالة من الدرجة الأعلى (higher-order function) هي دالة تأخذ دالة أخرى كمعامل أو تُرجع دالة. دالة `repeat(times: Int, action: (Int) -> Unit)` مثال واضح: تأخذ معامل `action` وهو دالة، وتنفّذه عدد `times` من المرات، حيث يستقبل `action` رقم التكرار الحالي (بدءاً من 0). هذا يجعل `repeat()` بديلاً موجزاً وأنيقاً عن كتابة حلقة `for` تقليدية.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم الفرق بين `val` و`var` ومتى أستخدم كل منهما.
- [ ] أعرف كيف يعمل Type Inference ومتى يجب تحديد النوع صراحةً.
- [ ] أستطيع كتابة جمل `if/else` و`when` واستخدام `in` و`is` والفاصلة داخل `when`.
- [ ] أفهم الفرق بين الجملة الشرطية (statement) والتعبير الشرطي (expression).
- [ ] أعرف كيف أعلن متغيّراً قابلاً لحمل null باستخدام `?`.
- [ ] أفهم الفرق بين `?.` و`!!` و`?:` ومتى أستخدم كلاً منها.
- [ ] أستطيع تعريف دالة، تمرير معاملات لها، واستخدام معاملات افتراضية.
- [ ] أفهم معنى Unit كنوع إرجاع افتراضي.
- [ ] أعرف كيف أخزّن دالة في متغيّر باستخدام `::` أو باستخدام lambda مباشرة.
- [ ] أفهم صياغة نوع الدالة (function type) مثل `(Int) -> String`.
- [ ] أستطيع تمرير دالة كمعامل لدالة أخرى وإرجاع دالة من دالة أخرى.
- [ ] أعرف كيف أعلن نوع دالة قابل لحمل null `((Int) -> String)?`.
- [ ] أفهم اختصارات lambda: حذف اسم المعامل (`it`)، تمرير lambda مباشرة، وtrailing lambda syntax.
- [ ] أفهم مفهوم higher-order function وأستطيع شرح مثال `repeat()`.
- [ ] راجعت كل أسئلة MCQ وتصحيح الكود وتمارين التتبع.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Kotlin Basics (هذه المحاضرة) | Kotlin OOP | المتغيّرات والدوال هنا هي أساس بناء الأصناف (`class`) لاحقاً |
| Kotlin Basics (هذه المحاضرة) | Compose UI | صياغة trailing lambda هنا هي نفسها المستخدمة في كتابة `@Composable` |
| Null Safety (هذه المحاضرة) | App Fundamentals | التعامل الآمن مع null ضروري عند التعامل مع بيانات قد تكون غائبة من واجهات المستخدم |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| المتغيّرات | فضّل `val` دائماً؛ استخدم `var` فقط عند الحاجة الفعلية للتغيير |
| الشروط | استخدم `when` عند أكثر من فرعين؛ رتّب الشروط من الأخص للأعم |
| Null Safety | فضّل `?.` و`?:`؛ تجنّب `!!` إلا عند اليقين التام |
| الدوال والـ Lambdas | الدوال قيم قابلة للتخزين والتمرير والإرجاع؛ استخدم trailing lambda لتحسين القراءة |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `?` | النوع قابل لحمل null | إعلان المتغيّرات وأنواع الدوال |
| `?.` | وصول آمن | الوصول لخاصية متغيّر nullable |
| `!!` | تأكيد خطر بعدم وجود null | حالات نادرة فقط |
| `?:` | قيمة افتراضية بديلة لـ null | بعد `?.` مباشرة |
| `::` | مرجعية دالة | تخزين دالة معرَّفة بـ fun في متغيّر |
| `it` | اسم ضمني لمعامل lambda وحيد | lambda بمعامل واحد فقط |
| `->` | فاصل معاملات/جسم | لambda و`when` |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | `val` هو الخيار الافتراضي الآمن؛ لا تستخدم `var` إلا عند الحاجة الحقيقية للتغيير |
| 2 | كل دالة لها نوع إرجاع، حتى لو كان `Unit` ضمنياً |
| 3 | لا تستخدم `!!` أبداً إلا إذا كنت متأكداً 100% من عدم وجود null |
| 4 | جملة `when` تتوقف عند أول شرط يتحقق — رتّب الفروع من الأخص إلى الأعم |
| 5 | الدوال في كوتلن قيم كاملة: يمكن تخزينها، تمريرها، وإرجاعها من دوال أخرى |

<!-- VALIDATION: تم تغطية جميع فقرات المحاضرة الأصلية (36 قسماً رقمياً) وفق قالب SCHEMA.md v1.0، شاملاً: النص الأصلي + الترجمة الحرفية + الشرح المبسّط لكل فقرة، جداول الملخص الشامل، 16 سؤال MCQ، 6 أسئلة تصحيح كود، 5 تمارين إضافية، 3 تمارين تتبع، 2 سؤال تصميم، 12 بطاقة Q&A، كود كامل مجمّع، 8 أسئلة نظرية، قائمة فحص ذاتي، وورقة مراجعة سريعة. -->

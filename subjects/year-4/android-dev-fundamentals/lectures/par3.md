# المحاضرة 3 — Classes and Objects in Kotlin & Generics (الأصناف والكائنات والأنواع العامة في كوتلن)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** Kotlin OOP (Classes, Constructors, Inheritance, Visibility Modifiers, Property Delegates) + Kotlin Advanced (Generics, Enum Class, Data Class, Singleton/Companion Objects, Extensions, Scope Functions)

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| `Kotlin Basics` (المحاضرة السابقة) | `val`/`var`، `Type Inference`، `if/when`، `Functions`، `Null Safety` | فهم أساسيات لغة `Kotlin` القابلة للتنفيذ |
| `Kotlin OOP` + `Kotlin Advanced` (هذه المحاضرة) ← **أنت هنا** | `class`، `constructor`، `inheritance`، `override`، `visibility modifiers`، `property delegates`، `Generics`، `enum class`، `data class`، `object`، `extension functions`، `scope functions` | بناء نماذج بيانات وتراتبية أصناف قابلة لإعادة الاستخدام ومنظمة عبر مبادئ `OOP` |
| `App Fundamentals` (المحاضرة القادمة) | `Activity`، `Service`، `AndroidManifest.xml` | توظيف هذه الأصناف والكائنات داخل تطبيق أندرويد حقيقي |

> **نوع هذه المحاضرة:** `Kotlin OOP` (الجزء الأول من المحاضرة) مدموج مع `Kotlin Advanced` (الجزء الثاني) — لذلك اعتُمد في الشرح مصطلحات القسمين معاً: `class`، `primary/secondary constructor`، `inheritance`، `override`، `super`، `visibility modifiers`، `property delegates` من جهة، و`Generics`، `enum class`، `data class`، `singleton object`، `companion object`، `extension functions`، `scope functions (let, apply)` من جهة أخرى.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. الأصناف والكائنات في كوتلن (Classes and Objects in Kotlin)

هذا القسم هو الأساس الكامل للبرمجة الكائنية (`OOP`) في `Kotlin`: كيف تُعرَّف الأصناف، كيف تُنشأ الكائنات منها، وكيف تتفاعل الأصناف مع بعضها عبر الوراثة والرؤية والتفويض.

#### 1.1 تعريف الصنف (Define a Class)

#### النص الأصلي يقول (English):
> "When you define a class, you specify the properties and methods that all objects of that class should have. A class definition starts with the class keyword, followed by a name and a set of curly braces. A class consists of three major parts: Properties. Variables that specify the attributes of the class's objects. Methods. Functions that contain the class's behaviors and actions. Constructors. A special member function that creates instances of the class throughout the program in which it's defined."

#### الترجمة الحرفية:
> عندما تُعرِّف صنفاً (`class`)، فإنك تحدد الخصائص (`properties`) والدوال (`methods`) التي يجب أن تمتلكها جميع كائنات (`objects`) هذا الصنف.
> تعريف الصنف يبدأ بالكلمة المفتاحية `class`، متبوعة باسم، ثم بمجموعة من الأقواس المعقوفة `{ }`.
> يتكوّن الصنف من ثلاثة أجزاء رئيسية:
> الخصائص (`Properties`): متغيرات تحدد صفات كائنات الصنف.
> الدوال (`Methods`): دوال تحتوي على سلوكيات الصنف وأفعاله.
> المُنشِئات (`Constructors`): دالة عضو خاصة تُنشئ نسخاً (`instances`) من الصنف في أي مكان بالبرنامج يُستدعى فيه.

#### الشرح المبسّط:
فكّر بالصنف (`class`) على أنه "قالب" أو "مخطط هندسي" — تماماً مثل مخطط بناء منزل: المخطط نفسه ليس منزلاً تسكن فيه، لكنه يحدد كم غرفة فيه وما شكل كل غرفة. الصنف بنفس الطريقة يحدد **ما الذي سيملكه** كل كائن يُبنى منه (الخصائص) و**ما الذي يستطيع فعله** (الدوال)، لكنه لا يُنشئ أي كائن فعلي بحد ذاته. سبب وجود هذا الفصل بين "التصميم" (الصنف) و"التنفيذ" (الكائن) هو إعادة الاستخدام: تكتب القالب مرة واحدة، ثم تصنع منه عدد لا نهائي من الكائنات المتشابهة في البنية والمختلفة في القيم. مثال عملي: صنف `SmartDevice` يحدد أن كل جهاز ذكي (`smart device`) له اسم وفئة وحالة تشغيل، لكن كل تلفاز أو مصباح ذكي فعلي هو كائن منفصل يُبنى من هذا القالب.

**لماذا؟** فصل التصميم عن التنفيذ يجعل الكود أسهل في الصيانة: إذا احتجت تعديل سلوك مشترك بين كل الأجهزة الذكية، تُعدّله في الصنف مرة واحدة فينعكس تلقائياً على كل الكائنات.

#### 💡 التشبيه:
> تعريف الصنف أشبه بمخطط بناء منزل (بلوبرنت هندسي)؛ لا يمكنك السكن في المخطط نفسه، لكن كل منزل حقيقي يُبنى وفقه.
> **وجه الشبه:** المخطط الهندسي = الصنف `class`، المنزل المبني فعلياً = الكائن `object`.

#### 💻 الكود: تعريف صنف فارغ

##### ما هذا الكود؟
> أبسط شكل ممكن لصنف في `Kotlin` — صنف بلا أي خصائص أو دوال، فقط لإظهار البنية الأساسية `class name { }`.

```kotlin
// Define an empty class named SmartDevice
class SmartDevice {
    // empty body
}
```

##### شرح كل سطر:
1. `class SmartDevice {` → تعريف الصنف — تبدأ الكلمة المفتاحية `class` ثم اسم الصنف `SmartDevice` بصيغة `UpperCamelCase` ثم قوس معقوف يفتح جسم الصنف
2. `// empty body` → تعليق توضيحي — يوضح أن الجسم فارغ حالياً بانتظار إضافة الخصائص والدوال لاحقاً
3. `}` → إغلاق جسم الصنف

**المكتبات المطلوبة (Imports):**
> لا حاجة لأي `import` في هذا المثال — `class` كلمة مفتاحية أساسية في اللغة.

**الناتج المتوقع (لقطة الشاشة):**
> لا يوجد ناتج تنفيذي بعد؛ هذا مجرد تعريف صنف بدون استدعاء `main()`.

---

#### 1.2 إنشاء نسخة (كائن) من الصنف (Create an Instance of a Class)

#### النص الأصلي يقول (English):
> "A class is a blueprint for an object. The Kotlin runtime uses the class to create an object of that particular type. The instantiation syntax starts with the class name followed by a set of parentheses. To use an object, you create the object and assign it to a variable, similar to how you define a variable. The val or var keyword is followed by the name of the variable, then an = assignment operator, then the instantiation of the class object."

#### الترجمة الحرفية:
> الصنف هو مخطط (`blueprint`) لكائن. بيئة تشغيل `Kotlin` تستخدم الصنف لإنشاء كائن من ذلك النوع المحدد.
> صيغة إنشاء الكائن (`instantiation`) تبدأ باسم الصنف متبوعاً بمجموعة من الأقواس الهلالية.
> لاستخدام كائن، تُنشئه وتُسنده إلى متغير، بشكل مشابه لكيفية تعريف أي متغير.
> الكلمة المفتاحية `val` أو `var` تليها اسم المتغير، ثم عامل الإسناد `=`، ثم إنشاء نسخة من الصنف.

#### الشرح المبسّط:
إنشاء الكائن هو اللحظة التي "يتحول فيها المخطط إلى بناء حقيقي". حتى الآن كان `SmartDevice` مجرد وصف نظري؛ عندما تكتب `SmartDevice()` فأنت تطلب من `Kotlin` أن يحجز مساحة في الذاكرة وينشئ كائناً فعلياً يطابق هذا الوصف. الرابط بما سبق واضح: بما أن الصنف من القسم السابق كان "قالباً فارغاً"، فهذا القسم يشرح كيف نستخدم ذلك القالب عملياً. الصياغة تشبه تماماً تعريف أي متغير عادي (`val name = value`)، والفرق الوحيد أن "القيمة" هنا هي استدعاء اسم الصنف متبوعاً بقوسين `()`.

**لماذا؟** بدون هذه الخطوة يبقى الصنف مجرد تعريف نظري لا يشغل ذاكرة ولا يمكن التعامل معه؛ الكائن هو الذي يحمل القيم الفعلية ويُستخدم في بقية البرنامج.

#### 💻 الكود: إنشاء كائن من SmartDevice

##### ما هذا الكود؟
> ينشئ كائناً واحداً باسم `smartTvDevice` من صنف `SmartDevice` داخل الدالة الرئيسية `main()`.

```kotlin
class SmartDevice {
    // empty body
}

fun main() {
    // Create an object (instance) of SmartDevice and store it in smartTvDevice
    val smartTvDevice = SmartDevice()
}
```

##### شرح كل سطر:
1. `class SmartDevice { }` → نفس تعريف الصنف الفارغ من القسم السابق
2. `fun main() {` → نقطة بداية تنفيذ البرنامج في `Kotlin`
3. `val smartTvDevice = SmartDevice()` → إنشاء الكائن — `val` يعني متغير غير قابل لإعادة الإسناد، `SmartDevice()` يستدعي المُنشِئ الافتراضي وينشئ كائناً جديداً يُخزَّن في `smartTvDevice`
4. `}` → نهاية `main()`

**الناتج المتوقع (لقطة الشاشة):**
> لا طباعة على الشاشة؛ الكائن أُنشئ فقط وخُزِّن في الذاكرة دون استدعاء أي دالة طباعة.

---

#### 1.3 تعريف دوال الصنف (Define Class Methods)

#### النص الأصلي يقول (English):
> "Actions that the class can perform are defined as functions in the class. When you define a function in the class body, it's referred to as a member function or a method, and it represents the behavior of the class. To call a class method outside of the class, start with the class object followed by the . operator, the name of the function, and a set of parentheses. If applicable, the parentheses contain arguments required by the method."

#### الترجمة الحرفية:
> الأفعال التي يستطيع الصنف تنفيذها تُعرَّف كدوال (`functions`) داخل الصنف.
> عندما تُعرِّف دالة داخل جسم الصنف، تُسمى دالة عضو (`member function`) أو طريقة (`method`)، وهي تمثل سلوك الصنف.
> لاستدعاء دالة من الصنف خارجه، تبدأ بكائن الصنف متبوعاً بعامل النقطة `.`، ثم اسم الدالة، ثم مجموعة أقواس هلالية.
> إذا لزم الأمر، تحتوي الأقواس على الوسائط (`arguments`) التي تتطلبها الدالة.

#### الشرح المبسّط:
إذا كانت الخصائص تجيب عن سؤال "ماذا يملك الكائن؟"، فإن الدوال (المسماة هنا `methods`) تجيب عن سؤال "ماذا يستطيع الكائن أن يفعل؟". أي فعل مثل "شغّل الجهاز" أو "أطفئ الجهاز" يصبح دالة داخل جسم الصنف بدل أن تكون خارجه. طريقة الاستدعاء تعتمد على نمط "الكائن نقطة الدالة" (`object.method()`) — تماماً كما تقول بالعربية "التلفاز . شغّل ()" أي "اطلب من كائن التلفاز أن ينفذ سلوك التشغيل". هذا الربط بين الكائن والدالة عبر النقطة هو حجر الأساس في كل استدعاء لاحق لأي دالة عضو في بقية المحاضرة.

**لماذا؟** تجميع السلوك (الدوال) داخل الصنف نفسه — بدل كتابته كدوال منفصلة تتلقى الكائن كوسيط — يجعل الكود أقرب لمنطق العالم الحقيقي: "الجهاز يشغّل نفسه" بدل "دالة خارجية تشغّل الجهاز".

#### 💻 الكود: تعريف turnOn() و turnOff() في SmartDevice

##### ما هذا الكود؟
> يضيف دالتين عضو (`turnOn`, `turnOff`) لصنف `SmartDevice`، ثم يستدعيهما على كائن فعلي داخل `main()`.

```kotlin
class SmartDevice {
    // Method to turn the device on
    fun turnOn() {
        println("Smart device is turned on.")
    }
    // Method to turn the device off
    fun turnOff() {
        println("Smart device is turned off.")
    }
}

fun main() {
    val smartTvDevice = SmartDevice()
    // Call methods on the object using the dot operator
    smartTvDevice.turnOn()
    smartTvDevice.turnOff()
}
```

##### شرح كل سطر:
1. `fun turnOn() { println(...) }` → دالة عضو بلا وسائط ولا قيمة إرجاع، تطبع رسالة تشغيل
2. `fun turnOff() { println(...) }` → دالة عضو مشابهة تطبع رسالة إطفاء
3. `val smartTvDevice = SmartDevice()` → إنشاء الكائن كما في القسم السابق
4. `smartTvDevice.turnOn()` → استدعاء الدالة عبر عامل النقطة على الكائن المحدد
5. `smartTvDevice.turnOff()` → استدعاء الدالة الثانية بنفس الطريقة

**الناتج المتوقع (لقطة الشاشة):**
```
Smart device is turned on.
Smart device is turned off.
```

---
#### 1.4 تعريف خصائص الصنف (Define Class Properties)

#### النص الأصلي يقول (English):
> "Properties are basically variables that are defined in the class body instead of the function body. This means that the syntax to define properties and variables are identical."

#### الترجمة الحرفية:
> الخصائص (`Properties`) هي أساساً متغيرات تُعرَّف داخل جسم الصنف بدلاً من جسم دالة.
> هذا يعني أن صياغة تعريف الخصائص وصياغة تعريف المتغيرات متطابقتان تماماً.

#### الشرح المبسّط:
الخاصية ليست شيئاً جديداً بالكامل — هي نفس `val`/`var` التي تعلمتها في أساسيات `Kotlin`، والفرق الوحيد هو **مكان** كتابتها: إن كُتبت داخل جسم الصنف مباشرة (وليس داخل دالة) أصبحت خاصية تخص كل كائن يُبنى من هذا الصنف. هذا يربط مباشرة بما ذُكر في القسم 1.1 عن "الأجزاء الثلاثة للصنف" — الآن نرى الجزء الأول (الخصائص) عملياً. مثال: `name`، `category`، `deviceStatus` تصبح متاحة تلقائياً لأي كائن `SmartDevice` تُنشئه، ولكل كائن نسخته الخاصة من هذه القيم (فتلفاز ومصباح كل منهما له اسمه الخاص).

**لماذا؟** بدون خصائص، سيكون كل كائن مطابقاً تماماً للآخر بلا أي بيانات مميزة له؛ الخصائص هي ما يمنح كل كائن "هويته" الخاصة رغم أنه مبني من نفس القالب.

#### 💻 الكود: إضافة خصائص لصنف SmartDevice

##### ما هذا الكود؟
> يضيف ثلاث خصائص (`name`, `category`, `deviceStatus`) لصنف `SmartDevice`، ثم يقرأ إحداها عبر الكائن.

```kotlin
class SmartDevice {
    val name = "Android TV"
    val category = "Entertainment"
    var deviceStatus = "online"

    fun turnOn() {
        println("Smart device is turned on.")
    }
    fun turnOff() {
        println("Smart device is turned off.")
    }
}

fun main() {
    val smartTvDevice = SmartDevice()
    // Read a property value using the dot operator
    println("Device name is: ${smartTvDevice.name}")
    smartTvDevice.turnOn()
    smartTvDevice.turnOff()
}
```

##### شرح كل سطر:
1. `val name = "Android TV"` → خاصية غير قابلة للتغيير (`val`) بقيمة ابتدائية ثابتة
2. `val category = "Entertainment"` → خاصية ثانية غير قابلة للتغيير
3. `var deviceStatus = "online"` → خاصية قابلة للتغيير (`var`) لأن حالة الجهاز قد تتبدل لاحقاً
4. `println("Device name is: ${smartTvDevice.name}")` → قراءة الخاصية عبر `الكائن.الخاصية` داخل قالب نصي (`string template`) بعلامة `$`

**الناتج المتوقع (لقطة الشاشة):**
```
Device name is: Android TV
Smart device is turned on.
Smart device is turned off.
```

---

#### 1.5 دوال القراءة والتعيين في الخصائص (Getter and Setter Functions in Properties)

#### النص الأصلي يقول (English):
> "Properties can do more than a variable can. The full syntax to define a mutable property starts with the variable definition followed by the optional get() and set() functions. When you don't define the getter and setter function for a property, the Kotlin compiler internally creates the functions. The full syntax for an immutable property has two differences: It starts with the val keyword. The variables of val type are read-only variables, so they don't have set() functions."

#### الترجمة الحرفية:
> الخصائص تستطيع فعل أكثر مما يستطيعه المتغير العادي.
> الصياغة الكاملة لتعريف خاصية قابلة للتغيير تبدأ بتعريف المتغير متبوعاً بدالتَي `get()` و`set()` الاختياريتين.
> عندما لا تُعرِّف دالتَي القراءة والتعيين لخاصية ما، فإن مترجم `Kotlin` ينشئهما داخلياً تلقائياً.
> الصياغة الكاملة للخاصية غير القابلة للتغيير تختلف بنقطتين: تبدأ بالكلمة المفتاحية `val`.
> متغيرات النوع `val` هي متغيرات للقراءة فقط، لذلك لا تمتلك دالة `set()`.

#### الشرح المبسّط:
هذه هي النقطة التي تُميّز "الخاصية" الحقيقية عن "المتغير" البسيط: كل خاصية تمتلك خلف الكواليس دالة `get()` تُنفَّذ كل مرة تقرأ فيها قيمتها، ودالة `set()` تُنفَّذ كل مرة تُسند فيها قيمة جديدة (فقط لمتغيرات `var`). في الحالة الافتراضية لا تكتب هذه الدوال يدوياً لأن `Kotlin` يولّدها تلقائياً بشكل بسيط (إرجاع القيمة كما هي، أو تخزينها كما هي). لكن يمكنك كتابتها يدوياً لإضافة منطق مخصص، وهذا ما سنراه في القسم التالي حين نستخدم `set()` للتحقق من نطاق قيمة معينة. الفرق بين `val` و`var` هنا منطقي: بما أن `val` للقراءة فقط، فلا معنى لوجود `set()` أصلاً.

**لماذا؟** القدرة على تخصيص `get()`/`set()` تسمح للصنف بحماية بياناته الداخلية (مثلاً منع قيمة غير منطقية) دون تغيير الطريقة التي يتعامل بها المستخدم الخارجي مع الخاصية — يبقى الاستخدام `object.property` كما هو تماماً.

#### 💻 الكود: تخصيص get() و set() يدوياً

##### ما هذا الكود؟
> يعرّف خاصية `speakerVolume` مع كتابة `get()` و`set()` يدوياً بأبسط شكل ممكن (بلا أي منطق إضافي بعد).

```kotlin
var speakerVolume = 2
    get() {
        return field
    } // or get() = field
    set(value) {
        field = value
    }
```

##### شرح كل سطر:
1. `var speakerVolume = 2` → تعريف خاصية قابلة للتغيير بقيمة ابتدائية `2`
2. `get() { return field }` → دالة قراءة صريحة تُعيد قيمة `field` (نفس السلوك الافتراضي)
3. `set(value) { field = value }` → دالة تعيين صريحة تخزّن القيمة الجديدة في `field` (نفس السلوك الافتراضي أيضاً هنا)

---

#### 1.6 الحقل الخلفي (Backing Field)

#### النص الأصلي يقول (English):
> "Kotlin properties use a backing field to hold a value in memory. A backing field is basically a class variable defined internally in the properties. A backing field is scoped to a property, which means that you can only access it through the get() or set() property functions. To read the property value in the get() function or update the value in the set() function, you need to use the property's backing field. It's autogenerated by the Kotlin compiler and referenced with a field identifier."

#### الترجمة الحرفية:
> خصائص `Kotlin` تستخدم حقلاً خلفياً (`backing field`) لتخزين القيمة في الذاكرة.
> الحقل الخلفي هو أساساً متغير صنف يُعرَّف داخلياً ضمن الخصائص.
> الحقل الخلفي محصور النطاق ضمن الخاصية، أي أنه لا يمكن الوصول إليه إلا عبر دالتَي `get()` أو `set()` الخاصتين بتلك الخاصية.
> لقراءة قيمة الخاصية داخل `get()` أو تحديثها داخل `set()`، تحتاج لاستخدام الحقل الخلفي للخاصية.
> يُولَّد تلقائياً بواسطة مترجم `Kotlin` ويُشار إليه بالمعرِّف `field`.

#### الشرح المبسّط:
`field` هو "الصندوق الفعلي" الذي تُخزَّن فيه القيمة الحقيقية في الذاكرة، بينما `get()`/`set()` هما "البوابتان" اللتان تتحكمان بمن يدخل ومن يخرج من هذا الصندوق. لماذا لا نستخدم اسم الخاصية نفسها (`speakerVolume`) داخل `set()`؟ لأن كتابة `speakerVolume = value` داخل `set()` الخاصة بـ `speakerVolume` نفسها ستستدعي `set()` من جديد بلا نهاية (حلقة لا متناهية) — لذلك يوفّر `Kotlin` `field` كمرجع مباشر للذاكرة يتجاوز هذه المشكلة. هذا يمهّد مباشرة للمثال العملي التالي: التحقق من أن مستوى الصوت بين 0 و100 قبل قبول القيمة الجديدة.

**لماذا؟** بدون `field`، لن تستطيع كتابة أي منطق تحقق (`validation`) داخل `set()` دون الوقوع في استدعاء ذاتي لا نهائي؛ `field` هو الحل الآمن لهذه المشكلة.

#### مهم للامتحان ⚠️:
> `field` متاح فقط داخل `get()`/`set()` الخاصة بنفس الخاصية — لا يمكن استخدامه خارجهما.

#### 💻 الكود: تحقق من النطاق باستخدام set() و field

##### ما هذا الكود؟
> يضمن أن قيمة `speakerVolume` المسندة تقع دائماً بين 0 و100، وإلا تُرفض القيمة الجديدة ضمنياً (يبقى `field` بقيمته السابقة).

```kotlin
var speakerVolume = 2
    set(value) {
        // Only accept the new value if it's within the valid range
        if (value in 0..100) {
            field = value
        }
    }
```

##### شرح كل سطر:
1. `var speakerVolume = 2` → خاصية قابلة للتغيير بقيمة ابتدائية 2
2. `set(value) {` → بداية دالة التعيين المخصصة، `value` هو المُدخَل الجديد المطلوب إسناده
3. `if (value in 0..100) {` → شرط: هل القيمة الجديدة ضمن المجال المسموح؟
4. `field = value` → إذا تحقق الشرط فقط، يُحدَّث الحقل الخلفي الفعلي؛ وإلا تُتجاهل القيمة بصمت وتبقى القيمة القديمة

---

#### 1.7 تعريف المُنشِئ (Define a Constructor)

#### النص الأصلي يقول (English):
> "The primary purpose of the constructor is to specify how the objects of the class are created. In other words, constructors initialize an object and make the object ready for use. A default constructor is a constructor without parameters. Kotlin aims to be concise, so you can remove the constructor keyword if there are no annotations or visibility modifiers on the constructor. You can also remove the parentheses if the constructor has no parameters. The Kotlin compiler autogenerates the default constructor. To maintain immutability but avoid hardcoded values, use a parameterized constructor to initialize them."

#### الترجمة الحرفية:
> الغرض الأساسي من المُنشِئ (`constructor`) هو تحديد كيف تُنشأ كائنات الصنف.
> بعبارة أخرى، المُنشِئات تُهيّئ الكائن وتجعله جاهزاً للاستخدام.
> المُنشِئ الافتراضي (`default constructor`) هو مُنشِئ بلا وسائط.
> `Kotlin` يهدف إلى الإيجاز، لذا يمكنك حذف الكلمة المفتاحية `constructor` إن لم توجد تعليقات توضيحية (`annotations`) أو معدِّلات رؤية على المُنشِئ.
> يمكنك أيضاً حذف الأقواس الهلالية إن لم يكن للمُنشِئ أي وسائط.
> مترجم `Kotlin` يُولِّد المُنشِئ الافتراضي تلقائياً.
> للحفاظ على عدم القابلية للتغيير مع تجنّب القيم المكتوبة يدوياً بشكل ثابت (`hardcoded`)، استخدم مُنشِئاً بوسائط لتهيئتها.

#### الشرح المبسّط:
المُنشِئ هو الخطوة الفاصلة بين "الكائن أُنشئ في الذاكرة" و"الكائن جاهز فعلاً للاستخدام بقيم منطقية". حتى الآن كنا نكتب `SmartDevice()` بلا أي وسائط — هذا استدعاء لمُنشِئ افتراضي (`default constructor`) لم نكتبه صراحة لكن `Kotlin` ولّده لنا تلقائياً. المشكلة أن القيم في الأمثلة السابقة كانت "مكتوبة يدوياً بشكل ثابت" (`hardcoded`) — كل كائن `SmartDevice` جديد سيحمل نفس الاسم `"Android TV"` بالضبط، وهذا غير منطقي إن أردنا إنشاء تلفاز ومصباح مختلفين. الحل هو مُنشِئ بوسائط (`parameterized constructor`) يستقبل القيم من الخارج وقت الإنشاء، وهذا ما سيُشرح بالتفصيل في القسم التالي.

**لماذا؟** المُنشِئ الافتراضي مناسب فقط عندما تكون كل كائنات الصنف متطابقة القيم؛ أما في الحالات الواقعية (كل جهاز له اسمه الخاص) فنحتاج مُنشِئاً يستقبل بيانات مختلفة لكل كائن.

#### 💻 الكود: من مُنشِئ افتراضي إلى مُنشِئ بوسائط

##### ما هذا الكود؟
> يُظهر التطور من مُنشِئ افتراضي فارغ إلى مُنشِئ يستقبل `name` و`category` كوسيطين، مع تغيّر طريقة إنشاء الكائن تبعاً لذلك.

```kotlin
// Step 1: default constructor (implicit) — Kotlin compiler generates it
class SmartDevice {
    // ...
}

// Step 2: move name and category into the primary constructor
class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    fun turnOn() { println("Smart device is turned on.") }
    fun turnOff() { println("Smart device is turned off.") }
}

fun main() {
    val smartTvDevice = SmartDevice("Android TV", "Entertainment")
    // or, using named arguments:
    // val smartTvDevice = SmartDevice(name = "Android TV", category = "Entertainment")
    println("Device name is: ${smartTvDevice.name}")
    println("Device category is: ${smartTvDevice.category}")
}
```

##### شرح كل سطر:
1. `class SmartDevice(val name: String, val category: String) {` → الوسائط داخل أقواس المُنشِئ الرئيسي وأمامها `val` تصبح تلقائياً خصائص عامة للصنف
2. `var deviceStatus = "online"` → خاصية عادية داخل جسم الصنف بقيمة ابتدائية ثابتة (غير مُمرَّرة عبر المُنشِئ)
3. `val smartTvDevice = SmartDevice("Android TV", "Entertainment")` → تمرير القيم الفعلية حسب ترتيب المعاملات
4. `SmartDevice(name = "Android TV", category = "Entertainment")` → الطريقة البديلة باستخدام الوسائط المُسمّاة (`named arguments`) لزيادة الوضوح

**الناتج المتوقع (لقطة الشاشة):**
```
Device name is: Android TV
Device category is: Entertainment
```

---

#### 1.8 نوعا المُنشِئ: الرئيسي والثانوي (Primary and Secondary Constructors)

#### النص الأصلي يقول (English):
> "There are two main types of constructors in Kotlin: Primary constructor. A class can have only one primary constructor, which is defined as part of the class header. The primary constructor doesn't have a body. Secondary constructor. A class can have multiple secondary constructors. The secondary constructor can initialize the class and has a body, which can contain initialization logic. If the class has a primary constructor, each secondary constructor needs to initialize the primary constructor. The secondary constructor is enclosed in the body of the class and its syntax includes three parts: declaration with the constructor keyword, initialization of the primary constructor using a colon and the this keyword, and the secondary constructor body in curly braces."

#### الترجمة الحرفية:
> يوجد نوعان رئيسيان من المُنشِئات في `Kotlin`: المُنشِئ الرئيسي (`Primary constructor`). يمكن أن يمتلك الصنف مُنشِئاً رئيسياً واحداً فقط، ويُعرَّف كجزء من ترويسة الصنف. المُنشِئ الرئيسي لا يملك جسماً.
> المُنشِئ الثانوي (`Secondary constructor`). يمكن أن يمتلك الصنف عدة مُنشِئات ثانوية. المُنشِئ الثانوي يستطيع تهيئة الصنف ويمتلك جسماً يمكن أن يحتوي منطق تهيئة.
> إذا كان للصنف مُنشِئ رئيسي، يجب على كل مُنشِئ ثانوي أن يُهيّئ المُنشِئ الرئيسي.
> المُنشِئ الثانوي محاط بجسم الصنف، وصياغته تتضمن ثلاثة أجزاء: التصريح بالكلمة المفتاحية `constructor`، تهيئة المُنشِئ الرئيسي باستخدام نقطتين رأسيتين والكلمة المفتاحية `this`، وجسم المُنشِئ الثانوي بين أقواس معقوفة.

#### الشرح المبسّط:
الفرق الجوهري بين النوعين: المُنشِئ الرئيسي "خفيف" — مجرد قائمة وسائط في ترويسة الصنف بلا أي منطق تنفيذي، بينما المُنشِئ الثانوي "كامل" — له جسم حقيقي يمكن أن يحتوي عمليات حسابية أو شرطية أثناء التهيئة. القاعدة المهمة هنا هي أن المُنشِئ الثانوي لا يعمل بمعزل عن الرئيسي؛ يجب أن "يمرّ" عبره أولاً باستخدام `: this(...)`، تماماً كما لو قلت "أولاً نفّذ التهيئة الأساسية، ثم أضف عليها هذا المنطق الإضافي". هذا يشبه سلّم بيت: المُنشِئ الرئيسي هو الأساس الذي لا بد من بنائه أولاً، والمُنشِئ الثانوي هو طابق إضافي يُبنى فوقه.

**لماذا؟** فصل "التهيئة البسيطة" (رئيسي) عن "التهيئة المنطقية المعقدة" (ثانوي) يبقي الحالة الشائعة (مُنشِئ رئيسي فقط) نظيفة وموجزة، بينما يوفّر مرونة لحالات خاصة تحتاج معالجة إضافية أثناء الإنشاء.

#### ⚙️ الخطوات / الخوارزمية: تعريف مُنشِئ ثانوي يهيّئ المُنشِئ الرئيسي

#### ما هدف هذه العملية؟
> إضافة طريقة بديلة لإنشاء الكائن تقبل بيانات خام (مثل رمز حالة رقمي) وتحوّلها لصيغة مناسبة قبل تمريرها للمُنشِئ الرئيسي.

```algorithm
1 | كتابة constructor(parameters) داخل جسم الصنف | الكلمة المفتاحية constructor | يبدأ تعريف المُنشِئ الثانوي
2 | إضافة : this(primary_parameters) بعد قائمة الوسائط | عامل : و this | يربط المُنشِئ الثانوي بالمُنشِئ الرئيسي ويُنفّذه أولاً
3 | كتابة جسم { } يحتوي منطق إضافي | أقواس معقوفة | يُنفَّذ بعد اكتمال تهيئة المُنشِئ الرئيسي مباشرة
```

#### نقاط التنفيذ:
- المُنشِئ الرئيسي يُنفَّذ دائماً أولاً، ثم جسم المُنشِئ الثانوي
- يمكن أن يكون للصنف أكثر من مُنشِئ ثانوي، بشرط اختلاف قوائم الوسائط (توقيعات مختلفة)

#### 💻 الكود: مُنشِئ ثانوي لتحويل رمز الحالة

##### ما هذا الكود؟
> يتخيل المثال أن واجهة برمجية خارجية (`API`) تعيد حالة الجهاز كرقم صحيح (`0`, `1`, أو أي قيمة أخرى)، والمُنشِئ الثانوي يترجم هذا الرقم إلى نص مفهوم.

```kotlin
class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"

    // Secondary constructor: accepts a raw status code and converts it
    constructor(name: String, category: String, statusCode: Int) : this(name, category) {
        deviceStatus = when (statusCode) {
            0 -> "offline"
            1 -> "online"
            else -> "unknown"
        }
    }

    fun turnOn() { println("Smart device is turned on.") }
    fun turnOff() { println("Smart device is turned off.") }
}

fun main() {
    val smartTvDevice = SmartDevice("Android TV", "Entertainment", 0)
    println("Device name is: ${smartTvDevice.name}")
    println("Device category is: ${smartTvDevice.category}")
    println("Device status is: ${smartTvDevice.deviceStatus}")
}
```

##### شرح كل سطر:
1. `constructor(name: String, category: String, statusCode: Int) : this(name, category) {` → مُنشِئ ثانوي يستقبل وسيطاً إضافياً `statusCode`، ويُهيّئ المُنشِئ الرئيسي أولاً عبر `this(name, category)`
2. `deviceStatus = when (statusCode) { ... }` → تعبير `when` يحوّل الرقم إلى نص مناسب ويُسند النتيجة للخاصية `deviceStatus`
3. `val smartTvDevice = SmartDevice("Android TV", "Entertainment", 0)` → استدعاء المُنشِئ الثانوي (لأنه يمرر 3 وسائط تطابق توقيعه)

**الناتج المتوقع (لقطة الشاشة):**
```
Device name is: Android TV
Device category is: Entertainment
Device status is: offline
```

---

#### 1.9 العلاقة بين الأصناف: مبدأ الوراثة (Implement a Relationship Between Classes — Inheritance)

#### النص الأصلي يقول (English):
> "Inheritance lets you build a class upon the characteristics and behavior of another class. It's a powerful mechanism that helps you write reusable code and establish relationships between classes. In Kotlin, all the classes are final by default, which means that you can't extend them, so you have to define the relationships between them. The open keyword informs the compiler that this class is extendable, so now other classes can extend it. The syntax to create a subclass starts with the creation of the class header. The constructor's closing parenthesis is followed by a space, a colon, another space, the superclass name, and a set of parentheses."

#### الترجمة الحرفية:
> الوراثة (`Inheritance`) تتيح لك بناء صنف اعتماداً على خصائص وسلوك صنف آخر. إنها آلية قوية تساعدك على كتابة كود قابل لإعادة الاستخدام وإقامة علاقات بين الأصناف.
> في `Kotlin`، كل الأصناف نهائية (`final`) بشكل افتراضي، أي أنه لا يمكن توسيعها (وراثتها)، لذا يتوجب عليك تحديد العلاقات بينها صراحة.
> الكلمة المفتاحية `open` تُخبر المترجم أن هذا الصنف قابل للتوسيع، فتستطيع أصناف أخرى الآن وراثته.
> صياغة إنشاء صنف فرعي (`subclass`) تبدأ بترويسة الصنف. القوس الهلالي الأخير للمُنشِئ يتبعه مسافة، ثم نقطتان رأسيتان، ثم مسافة، ثم اسم الصنف الأعلى (`superclass`)، ثم مجموعة أقواس هلالية.

#### الشرح المبسّط:
الوراثة تحل مشكلة عملية: `SmartTvDevice` و`SmartLightDevice` كلاهما "جهاز ذكي" يشترك في نفس الخصائص الأساسية (`name`, `category`, `deviceStatus`) ونفس الدوال الأساسية (`turnOn`, `turnOff`) التي رأيناها في `SmartDevice` سابقاً. بدل تكرار كتابة هذا الكود في كل صنف جهاز جديد، تجعل `SmartDevice` صنفاً أعلى (`superclass`/`parent`) قابلاً للتوسيع بكلمة `open`، ثم تبني `SmartTvDevice` و`SmartLightDevice` كأصناف فرعية (`subclass`/`child`) ترث منه تلقائياً كل ما يملكه. نقطة الأمان المهمة هنا هي أن `Kotlin` يمنع الوراثة افتراضياً (كل صنف `final`) لتجنّب أخطاء غير مقصودة؛ يجب أن تُصرّح صراحةً بنيّتك في السماح بالتوسيع عبر `open`. الصياغة `class Child(...) : Parent(...)` تشبه جملة "الابن يرث من الأب" حيث الاسم الثاني بعد النقطتين هو اسم الأب.

**لماذا؟** الوراثة تمنع تكرار الكود المشترك (مبدأ `DRY` — Don't Repeat Yourself) وتنظّم الأصناف في تسلسل هرمي منطقي يعكس بنية العالم الحقيقي (كل تلفاز ذكي هو أولاً وقبل كل شيء "جهاز ذكي").

#### 💡 التشبيه:
> الوراثة أشبه بشجرة عائلة: الابن (الصنف الفرعي) يرث صفات الأب (الصنف الأعلى) تلقائياً، لكن يمكنه أيضاً أن يضيف صفاته الخاصة به.
> **وجه الشبه:** الأب في شجرة العائلة = الصنف الأعلى `superclass`، الابن = الصنف الفرعي `subclass`.

#### 📊 المخطط: تسلسل الوراثة بين SmartDevice والأصناف الفرعية

#### ما هذا المخطط؟
> يوضّح أن `SmartDevice` هو الصنف الأعلى (`parent`)، وأن `SmartTvDevice` و`SmartLightDevice` صنفان فرعيان (`child`) يرثان منه عبر الوراثة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | SmartDevice | class | الصنف الأعلى (`superclass`/`parent`) المُعلَّم بـ `open` |
| 2 | SmartTvDevice | class | صنف فرعي يرث من `SmartDevice` |
| 3 | SmartLightDevice | class | صنف فرعي يرث من `SmartDevice` |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| SmartTvDevice | SmartDevice | inheritance | سهم مفتوح للأعلى | يرث `SmartTvDevice` كل خصائص ودوال `SmartDevice` |
| SmartLightDevice | SmartDevice | inheritance | سهم مفتوح للأعلى | يرث `SmartLightDevice` كل خصائص ودوال `SmartDevice` |

```diagram
type: class
title: تسلسل وراثة SmartDevice
direction: TD
nodes:
  - id: smart_device
    label: SmartDevice (Superclass)
    kind: class
    level: 0
  - id: smart_tv
    label: SmartTvDevice (Subclass)
    kind: class
    level: 1
  - id: smart_light
    label: SmartLightDevice (Subclass)
    kind: class
    level: 1
edges:
  - from: smart_tv
    to: smart_device
  - from: smart_light
    to: smart_device
```

#### 💻 الكود: تعريف صنف قابل للتوسيع وصنفين فرعيين منه

##### ما هذا الكود؟
> يجعل `SmartDevice` قابلاً للتوسيع بـ `open`، ثم يبني `SmartTvDevice` و`SmartLightDevice` كأصناف فرعية، كل منها يضيف خصائص ودوالاً خاصة به فوق ما يرثه.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"

    constructor(name: String, category: String, statusCode: Int) : this(name, category) {
        deviceStatus = when (statusCode) {
            0 -> "offline"
            1 -> "online"
            else -> "unknown"
        }
    }

    fun turnOn() { println("Smart device is turned on.") }
    fun turnOff() { println("Smart device is turned off.") }
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {

    var speakerVolume = 2
        set(value) { if (value in 0..100) { field = value } }

    var channelNumber = 1
        set(value) { if (value in 0..200) { field = value } }

    fun increaseSpeakerVolume() {
        speakerVolume++
        println("Speaker volume increased to $speakerVolume.")
    }
    fun nextChannel() {
        channelNumber++
        println("Channel number increased to $channelNumber.")
    }
}

class SmartLightDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {

    var brightnessLevel = 0
        set(value) { if (value in 0..100) { field = value } }

    fun increaseBrightness() {
        brightnessLevel++
        println("Brightness increased to $brightnessLevel.")
    }
}
```

##### شرح كل سطر:
1. `open class SmartDevice(...) {` → `open` تسمح لأصناف أخرى بوراثة `SmartDevice`
2. `class SmartTvDevice(deviceName: String, deviceCategory: String) :` → ترويسة الصنف الفرعي، وسائطه مؤقتة (`deviceName`, `deviceCategory`) بلا `val`/`var` لأنها ستُمرَّر للأب فقط
3. `SmartDevice(name = deviceName, category = deviceCategory) {` → استدعاء مُنشِئ الأب وتمرير القيم إليه لتهيئة `name` و`category` الموروثتين
4. `var speakerVolume = 2 ... set(value) { ... }` → خاصية جديدة خاصة بـ `SmartTvDevice` فقط، بمنطق تحقق من النطاق كما تعلمنا في القسم 1.6
5. `fun increaseSpeakerVolume() { speakerVolume++; println(...) }` → دالة جديدة خاصة بهذا الصنف الفرعي فقط، غير موجودة في `SmartDevice`
6. نفس المنطق يتكرر لـ `SmartLightDevice` مع خاصية `brightnessLevel` بدل `speakerVolume`/`channelNumber`

---

#### 1.10 علاقات IS-A وHAS-A بين الأصناف (IS-A and HAS-A Relationships)

#### النص الأصلي يقول (English):
> "When you use inheritance, you establish a relationship between two classes in something called an IS-A relationship. An object is also an instance of the class from which it inherits. In a HAS-A relationship, an object can own an instance of another class without actually being an instance of that class itself. The relationship is unidirectional, so you can say that every smart TV is a smart device, but you can't say that every smart device is a smart TV. The HAS-A relationship between two classes is also referred to as composition."

#### الترجمة الحرفية:
> عندما تستخدم الوراثة، تُقيم علاقة بين صنفين تُسمى علاقة "هو-عبارة-عن" (`IS-A relationship`). الكائن هو أيضاً نسخة من الصنف الذي يرث منه.
> في علاقة "يملك" (`HAS-A relationship`)، يمكن للكائن أن يمتلك نسخة من صنف آخر دون أن يكون هو نفسه نسخة من ذلك الصنف.
> العلاقة أحادية الاتجاه، فيمكنك القول إن كل تلفاز ذكي هو جهاز ذكي، لكن لا يمكنك القول إن كل جهاز ذكي هو تلفاز ذكي.
> علاقة "يملك" بين صنفين تُسمى أيضاً التركيب (`composition`).

#### الشرح المبسّط:
هذان النمطان يوضحان طريقتين مختلفتين تماماً لربط الأصناف ببعضها، ومن المهم عدم الخلط بينهما. علاقة `IS-A` هي ما رأيناه في القسم السابق: `SmartTvDevice` **هو** `SmartDevice` (عبر الوراثة `:`)، والعلاقة أحادية الاتجاه تماماً كما تقول "كل قطة هي حيوان، لكن ليس كل حيوان قطة". أما علاقة `HAS-A` فهي مختلفة جوهرياً: صنف `SmartHome` لا يرث من `SmartTvDevice`، بل **يمتلك** كائناً منه كخاصية داخلية — تماماً كما "البيت يملك تلفازاً" لكن "البيت ليس تلفازاً". هذا النمط الثاني يُسمى تركيباً (`composition`) لأنك تُركّب كائناً من كائنات أصغر بدل أن تجعله يرث منها.

**لماذا؟** التمييز بين النمطين أساسي لتصميم صحيح: تستخدم `IS-A` (وراثة) فقط عندما يكون الصنف الفرعي فعلاً نوعاً خاصاً من الصنف الأعلى، وتستخدم `HAS-A` (تركيب) عندما يكون الصنف مجرد "يحتوي على" أو "يستخدم" كائناً آخر دون أن يكون من نفس نوعه.

#### 📊 المخطط: العلاقتان IS-A وHAS-A معاً

#### ما هذا المخطط؟
> يجمع بين علاقة الوراثة (`IS-A`) وعلاقة التركيب (`HAS-A`) في مخطط واحد لتوضيح الفرق بينهما بصرياً.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | SmartDevice | class | الصنف الأعلى |
| 2 | SmartTvDevice | class | يرث من SmartDevice (علاقة IS-A) |
| 3 | SmartHome | class | يمتلك كائناً من SmartTvDevice (علاقة HAS-A) |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| SmartTvDevice | SmartDevice | Inherits (IS-A) | سهم مصمت للأعلى | وراثة حقيقية — SmartTvDevice هو نوع من SmartDevice |
| SmartHome | SmartTvDevice | contains/uses (HAS-A) | سهم متقطع | تركيب — SmartHome يملك خاصية من نوع SmartTvDevice دون أن يكون منه |

```diagram
type: class
title: IS-A مقابل HAS-A
direction: TD
nodes:
  - id: smart_device
    label: SmartDevice
    kind: class
    level: 0
  - id: smart_tv
    label: SmartTvDevice
    kind: class
    level: 1
  - id: smart_home
    label: SmartHome
    kind: class
    level: 1
edges:
  - from: smart_tv
    to: smart_device
    label: "Inherits (IS-A)"
  - from: smart_home
    to: smart_tv
    label: "contains/uses (HAS-A)"
```

#### ⚖️ المقايضة: علاقة IS-A مقابل علاقة HAS-A

| | IS-A (وراثة) | HAS-A (تركيب) |
| --- | --- | --- |
| المزايا | إعادة استخدام مباشرة لكل الخصائص والدوال، مناسبة عند وجود تخصص حقيقي (`specialization`) | مرونة أكبر، لا يفرض تسلسلاً هرمياً صارماً، يسمح بالجمع بين عدة كائنات مختلفة الأنواع |
| العيوب | ربط قوي (`tight coupling`) بين الصنفين، وتعديل الأب قد يكسر الأبناء | يتطلب كتابة دوال "تفويض" (`delegation`) صريحة لاستخدام سلوك الكائن الممتلَك |
| متى تختاره | عندما تكون العلاقة فعلاً "نوع من" (تلفاز ذكي هو جهاز ذكي) | عندما تكون العلاقة "يحتوي على" أو "يستخدم" (المنزل يحتوي تلفازاً) |

#### 💻 الكود: SmartHome — علاقة HAS-A عبر التركيب

##### ما هذا الكود؟
> صنف `SmartHome` **يمتلك** كائنين من `SmartTvDevice` و`SmartLightDevice` كخصائص، ويوفّر دوالاً تفوّض العمل الفعلي لتلك الكائنات الداخلية.

```kotlin
// The SmartHome class HAS-A smart TV device and smart light.
class SmartHome(
    val smartTvDevice: SmartTvDevice,
    val smartLightDevice: SmartLightDevice
) {
    fun turnOnTv() { smartTvDevice.turnOn() }
    fun turnOffTv() { smartTvDevice.turnOff() }
    fun increaseTvVolume() { smartTvDevice.increaseSpeakerVolume() }
    fun changeTvChannelToNext() { smartTvDevice.nextChannel() }

    fun turnOnLight() { smartLightDevice.turnOn() }
    fun turnOffLight() { smartLightDevice.turnOff() }
    fun increaseLightBrightness() { smartLightDevice.increaseBrightness() }

    fun turnOffAllDevices() {
        turnOffTv()
        turnOffLight()
    }
}
```

##### شرح كل سطر:
1. `class SmartHome(val smartTvDevice: SmartTvDevice, val smartLightDevice: SmartLightDevice) {` → المُنشِئ الرئيسي يستقبل كائنين جاهزين من صنفين آخرين ويخزّنهما كخصائص — هذا هو جوهر علاقة `HAS-A`
2. `fun turnOnTv() { smartTvDevice.turnOn() }` → لا يوجد منطق جديد هنا؛ `SmartHome` يُفوِّض (`delegates`) الاستدعاء مباشرة إلى الكائن الذي يملكه
3. `fun turnOffAllDevices() { turnOffTv(); turnOffLight() }` → دالة مركّبة تستدعي دالتين سابقتين من نفس الصنف لإطفاء كل الأجهزة دفعة واحدة

---

#### 1.11 تجاوز دوال الصنف الأعلى من الأصناف الفرعية (Override Superclass Methods from Subclasses)

#### النص الأصلي يقول (English):
> "To override means to intercept the action, typically to take manual control. When you override a method, the method in the subclass interrupts the execution of the method defined in the superclass and provides its own execution."

#### الترجمة الحرفية:
> التجاوز (`override`) يعني اعتراض الفعل، عادةً لأخذ التحكم اليدوي به.
> عندما تُجاوِز دالة، فإن الدالة في الصنف الفرعي تقاطع تنفيذ الدالة المُعرَّفة في الصنف الأعلى وتقدّم تنفيذها الخاص بها بدلاً منها.

#### الشرح المبسّط:
حتى الآن كانت `turnOn()`/`turnOff()` في القسم 1.9 تُطبع نفس الرسالة العامة بغض النظر عن نوع الجهاز — وهذا غير واقعي، فتشغيل تلفاز يختلف فعلياً عن تشغيل مصباح (يجب ضبط مستوى الصوت والقناة للتلفاز، ومستوى الإضاءة للمصباح). التجاوز (`override`) يسمح لكل صنف فرعي أن "يعترض" السلوك الموروث ويستبدله بسلوك خاص به يناسب طبيعته. لكي يسمح الصنف الأعلى بهذا الاعتراض، يجب تعليم الدالة فيه بـ `open` أيضاً (تماماً كما فعلنا مع الصنف نفسه في 1.9) — بدون `open` على الدالة، لن يستطيع أي صنف فرعي تجاوزها. ثم في الصنف الفرعي، تُكتب الدالة بنفس الاسم والتوقيع لكن مسبوقة بالكلمة المفتاحية `override`.

**لماذا؟** التجاوز يحقق ما يُعرف بتعدد الأشكال (`polymorphism`) — نفس الاستدعاء `smartDevice.turnOn()` ينتج سلوكاً مختلفاً فعلياً حسب النوع الحقيقي للكائن، دون أن يحتاج الكود المستدعي لمعرفة ذلك النوع مسبقاً.

#### الفهم الخاطئ الشائع ❌: نسيان كتابة `open` أمام الدالة في الصنف الأعلى ثم محاولة `override` عليها في الصنف الفرعي، ما يسبب خطأ ترجمة.
#### الفهم الصحيح ✅: يجب أن تكون الدالة `open` في الصنف الأعلى ليُسمح بتجاوزها؛ وكل دالة `override` تكون بحكم اللغة `open` ضمنياً أيضاً لمن يرث منها لاحقاً.

#### 💻 الكود: تجاوز turnOn() وturnOff() في الأصناف الفرعية

##### ما هذا الكود؟
> يجعل `turnOn`/`turnOff` قابلتين للتجاوز في `SmartDevice` عبر `open`، ثم يُجاوِزهما كل من `SmartTvDevice` و`SmartLightDevice` بسلوك مختلف يناسب كل جهاز.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    open fun turnOn() { println("Smart device is turned on.") }
    open fun turnOff() { println("Smart device is turned off.") }
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {

    var speakerVolume = 2
        set(value) { if (value in 0..100) { field = value } }
    var channelNumber = 1
        set(value) { if (value in 0..200) { field = value } }

    fun increaseSpeakerVolume() { speakerVolume++; println("Speaker volume increased to $speakerVolume.") }
    fun nextChannel() { channelNumber++; println("Channel number increased to $channelNumber.") }

    // Override: provide TV-specific turn-on/off behavior
    override fun turnOn() {
        deviceStatus = "on"
        println("$name is turned on. Speaker volume is set to $speakerVolume and channel number is " +
            "set to $channelNumber.")
    }
    override fun turnOff() {
        deviceStatus = "off"
        println("$name turned off")
    }
}

class SmartLightDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {

    var brightnessLevel = 0
        set(value) { if (value in 0..100) { field = value } }

    fun increaseBrightness() { brightnessLevel++; println("Brightness increased to $brightnessLevel.") }

    // Override: provide light-specific turn-on/off behavior
    override fun turnOn() {
        deviceStatus = "on"
        brightnessLevel = 2
        println("$name turned on. The brightness level is $brightnessLevel.")
    }
    override fun turnOff() {
        deviceStatus = "off"
        brightnessLevel = 0
        println("Smart Light turned off")
    }
}

fun main() {
    var smartDevice: SmartDevice = SmartTvDevice("Android TV", "Entertainment")
    smartDevice.turnOn()
    smartDevice = SmartLightDevice("Google Light", "Utility")
    smartDevice.turnOn()
}
```

##### شرح كل سطر:
1. `open fun turnOn() { ... }` داخل `SmartDevice` → `open` هنا على مستوى الدالة (وليس الصنف فقط) تسمح تحديداً لهذه الدالة بالتجاوز
2. `override fun turnOn() { ... }` داخل `SmartTvDevice` → يستبدل تنفيذ الأب بمنطق خاص يستخدم `speakerVolume` و`channelNumber`
3. `var smartDevice: SmartDevice = SmartTvDevice(...)` → المتغير من النوع المُعلَن `SmartDevice` لكن الكائن الفعلي `SmartTvDevice` — هذا يوضح تعدد الأشكال
4. `smartDevice.turnOn()` → يُنفَّذ `override` الخاص بـ `SmartTvDevice` تلقائياً رغم أن نوع المتغير المُعلَن هو الأب
5. `smartDevice = SmartLightDevice(...)` → إعادة إسناد نفس المتغير (`var`) لكائن من نوع فرعي آخر، فيتغير السلوك عند الاستدعاء التالي

**الناتج المتوقع (لقطة الشاشة):**
```
Android TV is turned on. Speaker volume is set to 2 and channel number is set to 1.
Google Light turned on. The brightness level is 2.
```

---

#### 1.12 إعادة استخدام كود الصنف الأعلى بالكلمة المفتاحية super (Reuse Superclass Code with the super Keyword)

#### النص الأصلي يقول (English):
> "To call the overridden method in the superclass from the subclass, you need to use the super keyword. Calling a method from the superclass is similar to calling the method from outside the class. Instead of using a . operator between the object and method, you need to use the super keyword, which informs the Kotlin compiler to call the method on the superclass instead of the subclass."

#### الترجمة الحرفية:
> لاستدعاء الدالة المُجاوَزة في الصنف الأعلى من داخل الصنف الفرعي، تحتاج لاستخدام الكلمة المفتاحية `super`.
> استدعاء دالة من الصنف الأعلى يشبه استدعاءها من خارج الصنف.
> بدل استخدام عامل النقطة `.` بين الكائن والدالة، تحتاج لاستخدام الكلمة المفتاحية `super`، التي تُخبر مترجم `Kotlin` باستدعاء الدالة على الصنف الأعلى بدلاً من الصنف الفرعي.

#### الشرح المبسّط:
في القسم السابق، `override` استبدل سلوك الأب بالكامل — لكن ماذا لو أردنا **إضافة** سلوك جديد فوق سلوك الأب بدل استبداله كلياً؟ هنا يأتي دور `super`: يسمح لك بتنفيذ منطق الأب أولاً (مثل تحديث `deviceStatus` الموروثة) ثم إضافة منطقك الخاص بعده. هذا يحل مشكلة تكرار الكود: بدل أن تعيد كتابة `deviceStatus = "on"` يدوياً في كل صنف فرعي (كما فعلنا في القسم 1.11)، تستدعي `super.turnOn()` فينفّذ الأب هذا السطر نيابة عنك، ثم يكمل الصنف الفرعي بمنطقه الإضافي الخاص. لاحظ الفرق الدقيق: عامل النقطة العادي `smartDevice.turnOn()` يستدعي النسخة "الحقيقية" حسب نوع الكائن (تعدد الأشكال)، بينما `super.turnOn()` يفرض تحديداً استدعاء نسخة الأب بغض النظر عن أي تجاوز.

**لماذا؟** `super` يحقق التوازن بين إعادة استخدام كود الأب (تجنّب التكرار) والتخصيص الإضافي في الابن (تعدد الأشكال)، بدل الاختيار بين أحدهما فقط.

#### 💻 الكود: استخدام super.turnOn() لإعادة استخدام منطق الأب

##### ما هذا الكود؟
> بدل تكرار `deviceStatus = "on"` في كل صنف فرعي، يُنقل هذا المنطق إلى `SmartDevice` ويُستدعى عبر `super.turnOn()` من كل صنف فرعي قبل إضافة سلوكه الخاص.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    open fun turnOn() { deviceStatus = "on" }
    open fun turnOff() { deviceStatus = "off" }
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    // ...
    override fun turnOn() {
        super.turnOn()
        println("$name is turned on. Speaker volume is set to $speakerVolume and channel number is " +
            "set to $channelNumber.")
    }
    override fun turnOff() {
        super.turnOff()
        println("$name turned off")
    }
}
```

##### شرح كل سطر:
1. `open fun turnOn() { deviceStatus = "on" }` في `SmartDevice` → المنطق المشترك أصبح موجوداً مرة واحدة فقط في الأب
2. `super.turnOn()` داخل `override fun turnOn()` → يستدعي تحديداً نسخة الأب من `turnOn()`، فيُنفَّذ `deviceStatus = "on"` أولاً
3. سطر `println(...)` بعده → يُضيف السلوك الخاص بـ `SmartTvDevice` بعد اكتمال تنفيذ منطق الأب

---

#### 1.13 تجاوز خصائص الصنف الأعلى من الأصناف الفرعية (Override Superclass Properties from Subclasses)

#### النص الأصلي يقول (English):
> "Similar to methods, you can also override properties with the same steps."

#### الترجمة الحرفية:
> على غرار الدوال، يمكنك أيضاً تجاوز الخصائص بنفس الخطوات.

#### الشرح المبسّط:
هذا القسم قصير لأنه ببساطة يُطبِّق نفس فكرة القسم 1.11 (`open`/`override`) لكن على الخصائص بدل الدوال. تُعلَّم الخاصية في الأب بـ `open val` بدل `open fun`، وفي الصنف الفرعي تُكتب `override val` بدل `override fun`. المثال العملي هنا مفيد جداً: خاصية `deviceType` في `SmartDevice` تحمل قيمة عامة `"unknown"`، بينما كل صنف فرعي يُجاوِزها بقيمة أكثر تحديداً تعكس نوعه الحقيقي (`"Smart TV"` أو `"Smart Light"`).

**لماذا؟** تجاوز الخصائص — تماماً كتجاوز الدوال — يسمح لكل صنف فرعي بتخصيص بيانات وصفية عن نفسه دون كسر البنية العامة الموروثة من الأب.

#### 💻 الكود: تجاوز الخاصية deviceType

##### ما هذا الكود؟
> يعرّف خاصية `deviceType` عامة في `SmartDevice` بقيمة افتراضية، ثم يُجاوِزها كل صنف فرعي بقيمة خاصة به.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    open val deviceType = "unknown"
    // ...
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    override val deviceType = "Smart TV"
    // ...
}

class SmartLightDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    override val deviceType = "Smart Light"
    // ...
}
```

##### شرح كل سطر:
1. `open val deviceType = "unknown"` → خاصية قابلة للتجاوز، قيمتها العامة الافتراضية `"unknown"`
2. `override val deviceType = "Smart TV"` → كل صنف فرعي يستبدل هذه القيمة بقيمة أكثر دقة تخصه

---

#### 1.14 معدِّلات الرؤية: المفهوم العام (Visibility Modifiers — The Concept)

#### النص الأصلي يقول (English):
> "Visibility modifiers play an important role to achieve encapsulation: In a class, they let you hide your properties and methods from unauthorized access outside the class. In a package, they let you hide the classes and interfaces from unauthorized access outside the package. Kotlin provides four visibility modifiers: public, private, protected, internal. A package is like a directory or a folder that groups related classes, whereas a module provides a container for your app's source code, resource files, and app-level settings."

#### الترجمة الحرفية:
> معدِّلات الرؤية (`Visibility modifiers`) تلعب دوراً مهماً لتحقيق التغليف (`encapsulation`): داخل الصنف، تتيح لك إخفاء خصائصك ودوالك عن الوصول غير المصرَّح به من خارج الصنف. داخل الحزمة (`package`)، تتيح لك إخفاء الأصناف والواجهات عن الوصول غير المصرَّح به من خارج الحزمة.
> يوفّر `Kotlin` أربعة معدِّلات رؤية: `public`، `private`، `protected`، `internal`.
> الحزمة (`package`) أشبه بمجلد يجمع أصنافاً مترابطة، بينما الوحدة (`module`) توفّر حاوية لكود مصدر التطبيق وملفات الموارد وإعدادات مستوى التطبيق.

#### الشرح المبسّط:
التغليف (`encapsulation`) هو أحد أعمدة البرمجة الكائنية الأربعة، ومعناه ببساطة: "لا تسمح لأي جزء خارجي بالعبث ببيانات الصنف الداخلية دون رقابة". معدِّلات الرؤية هي الأداة العملية لتطبيق هذا المبدأ — تحدد بدقة "من يستطيع رؤية واستخدام هذه الخاصية أو الدالة". الأربعة معدِّلات تمثل دوائر تحكم متدرجة الاتساع: `private` هي الأضيق (نفس الصنف فقط)، تليها `protected` (الصنف والأبناء)، ثم `internal` (نفس الوحدة البرمجية)، وأخيراً `public` وهي الأوسع (الجميع). هذا مثل طبقات الأمان في مبنى: بعض الغرف مفتوحة للجميع (`public`)، وبعضها لموظفي القسم فقط (`internal`)، وبعضها لعائلة واحدة فقط (`protected` للأبناء)، وبعضها لشخص واحد فقط (`private`).

**لماذا؟** بدون معدِّلات رؤية، يستطيع أي كود خارجي تعديل أي خاصية داخلية مباشرة (مثل `deviceStatus`) بقيم قد تكسر منطق الصنف؛ التغليف يحمي "الحالة الداخلية" ويجبر أي تعديل على المرور عبر دوال مضبوطة (مثل `set()` مع تحقق من النطاق).

#### 💡 التشبيه:
> معدِّلات الرؤية أشبه بدوائر الوصول في مبنى مكتبي: بعض الغرف عامة للزوار، وبعضها لموظفي القسم فقط، وبعضها لصاحب المكتب وحده.
> **وجه الشبه:** مكتب شخصي مغلق = `private`، قسم بأكمله = `protected`، مبنى الشركة كله = `internal`، الشارع العام = `public`.

#### الأصناف والدوال والخصائص العامة افتراضياً في Kotlin
#### النص الأصلي يقول (English):
> "When you define a class, it's publicly visible and can be accessed by any package that imports it, which means that it's public by default unless you specify a visibility modifier. When you define or declare properties and methods in the class, by default they can be accessed outside the class through the class object."
#### الترجمة الحرفية:
> عندما تُعرِّف صنفاً، فهو مرئي علنياً ويمكن الوصول إليه من أي حزمة تستورده، ما يعني أنه `public` افتراضياً ما لم تحدد معدِّل رؤية آخر.
> عندما تُعرِّف أو تُصرِّح خصائص ودوالاً داخل الصنف، فهي بشكل افتراضي قابلة للوصول من خارج الصنف عبر كائن الصنف.
#### الشرح المبسّط:
هذه نقطة يجب تذكّرها جيداً: إن لم تكتب أي معدِّل رؤية إطلاقاً، فـ`Kotlin` يفترض `public` تلقائياً لكل شيء (الأصناف، الدوال، الخصائص). هذا يفسّر لماذا كل الأمثلة في الأقسام السابقة عملت بشكل طبيعي رغم أننا لم نكتب `public` أبداً — كانت `public` ضمنياً طوال الوقت.

---

#### 1.15 تطبيق معدِّلات الرؤية على الخصائص والدوال والمُنشِئات والأصناف

#### النص الأصلي يقول (English):
> "public. Makes the declaration accessible everywhere. private. Makes the declaration accessible in the same class or source file. protected. Makes the declaration accessible in subclasses. internal. Makes the declaration accessible in the same module. The syntax to specify a visibility modifier for a property/method/class starts with the private, protected, or internal modifier followed by the syntax that defines it. For a constructor, the modifier is specified after the class name but before the constructor keyword, and you must keep the constructor keyword and parentheses even with no parameters."

#### الترجمة الحرفية:
> `public`: تجعل التصريح قابلاً للوصول من أي مكان.
> `private`: تجعل التصريح قابلاً للوصول ضمن نفس الصنف أو نفس ملف المصدر فقط.
> `protected`: تجعل التصريح قابلاً للوصول في الأصناف الفرعية.
> `internal`: تجعل التصريح قابلاً للوصول ضمن نفس الوحدة (`module`).
> صياغة تحديد معدِّل رؤية لخاصية/دالة/صنف تبدأ بالمعدِّل `private` أو `protected` أو `internal` متبوعاً بصياغة تعريفها.
> بالنسبة للمُنشِئ، يُكتب المعدِّل بعد اسم الصنف لكن قبل الكلمة المفتاحية `constructor`، ويجب الإبقاء على الكلمة المفتاحية `constructor` والأقواس حتى لو لم توجد وسائط.

#### الشرح المبسّط:
الميزة الجميلة هنا أن الصياغة موحّدة تماماً بغض النظر عمّا تُطبِّق عليه معدِّل الرؤية: تكتب المعدِّل مباشرة قبل `var`/`val`/`fun`/`class`. الاستثناء الوحيد هو المُنشِئ — لأن `Kotlin` عادة يسمح بحذف الكلمة `constructor` تماماً عند عدم وجود وسائط (كما رأينا في 1.7)، لكن بمجرد إضافة معدِّل رؤية عليه، يصبح إعادة كتابة `constructor()` صراحةً أمراً إلزامياً حتى يعرف المترجم أين يضع المعدِّل بالضبط. مثال شائع عملياً: خاصية `deviceStatus` يجب أن تُقرأ من الخارج لكن لا تُعدَّل إلا من داخل الصنف أو أبنائه — هنا تُستخدم حيلة "معدِّل على `set` فقط" (`protected set`) بدل تقييد الخاصية كلها.

**لماذا؟** تطبيق نفس فكرة "دوائر التحكم" (1.14) على أربعة عناصر مختلفة (خاصية، دالة، مُنشِئ، صنف) يعطي مرونة دقيقة: يمكنك مثلاً السماح بقراءة قيمة من الخارج بينما تمنع تعديلها إلا من الداخل.

#### 💻 الكود: أمثلة معدِّلات الرؤية الأربعة على عناصر مختلفة

##### ما هذا الكود؟
> يوضّح تطبيق `private`، `protected`، `internal` على خاصية، على دالة الـ`set` فقط، على دالة عضو، على المُنشِئ، وعلى الصنف نفسه — كلٌ في سياقه.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    // 1) Property fully private: hidden even from subclasses
    private var deviceStatus = "online"
}

open class SmartDeviceV2(val name: String, val category: String) {
    // 2) Only the setter is restricted — readable everywhere, writable only from subclasses
    var deviceStatus = "online"
        protected set
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDeviceV2(name = deviceName, category = deviceCategory) {
    // 3) Method restricted to this class and its subclasses only
    protected fun nextChannel() {
        println("Channel changed.")
    }
}

// 4) Constructor restricted: object can only be created from within the same module
open class SmartDeviceV3 protected constructor(val name: String, val category: String) {
    // ...
}

// 5) Class restricted: usable only within the same module
internal open class SmartDeviceV4(val name: String, val category: String) {
    // ...
}
```

##### شرح كل سطر:
1. `private var deviceStatus = "online"` → لا يمكن الوصول لـ`deviceStatus` إلا من داخل نفس الصنف `SmartDevice` تحديداً، حتى الأصناف الفرعية ممنوعة
2. `var deviceStatus = "online" \n protected set` → القراءة عامة (`public` افتراضياً) لكن الكتابة (`set`) مقيدة على الصنف وأبنائه فقط
3. `protected fun nextChannel() { ... }` → الدالة قابلة للاستدعاء فقط من داخل `SmartTvDevice` أو أي صنف يرثه لاحقاً، وليس من خارج التسلسل
4. `open class SmartDeviceV3 protected constructor(...)` → لاحظ وجوب إبقاء `constructor` صراحةً هنا لأن معدِّل الرؤية يسبقها مباشرة
5. `internal open class SmartDeviceV4(...)` → الصنف بأكمله غير مرئي خارج نفس الوحدة (`module`) حتى لو كانت حزمة أخرى تستورده

#### ⚖️ المقايضة: مقارنة معدِّلات الرؤية الأربعة (جدول مرجعي)

| Modifier | Accessible in same class | Accessible in subclass | Accessible in same module | Accessible outside module |
| --- | --- | --- | --- | --- |
| `private` | ✔ | ✗ | ✗ | ✗ |
| `protected` | ✔ | ✔ | ✗ | ✗ |
| `internal` | ✔ | ✔ | ✔ | ✗ |
| `public` | ✔ | ✔ | ✔ | ✔ |

#### مهم للامتحان ⚠️:
> `internal` تشبه `private` من حيث إخفاء التفاصيل عن العالم الخارجي، لكنها أوسع لأنها تسمح بالوصول من أي مكان داخل **نفس الوحدة** وليس فقط نفس الصنف.

---

#### 1.16 تعريف مفوِّضات الخصائص (Define Property Delegates)

#### النص الأصلي يقول (English):
> "The syntax to create property delegates starts with the declaration of a variable followed by the by keyword, and the delegate object that handles the getter and setter functions for the property. An interface is a contract to which classes that implement it need to adhere. It focuses on what to do instead of how to do the action. With interfaces, the class implements the interface. The class provides implementation details for the methods and properties declared in the interface. To create the delegate class: For the var type, you need to implement the ReadWriteProperty interface. For the val type, you need to implement the ReadOnlyProperty interface."

#### الترجمة الحرفية:
> صياغة إنشاء مفوِّضات الخصائص (`property delegates`) تبدأ بتصريح متغير متبوعاً بالكلمة المفتاحية `by`، ثم كائن المفوَّض (`delegate object`) الذي يتولى دالتَي القراءة والتعيين للخاصية.
> الواجهة (`interface`) هي عقد يجب على الأصناف المُنفِّذة له الالتزام به. تركّز على "ماذا يجب أن يُفعل" بدل "كيف يُفعل".
> مع الواجهات، الصنف يُنفِّذ (`implements`) الواجهة، ويقدّم تفاصيل التنفيذ للدوال والخصائص المُصرَّح عنها في الواجهة.
> لإنشاء صنف المفوَّض: بالنسبة للنوع `var`، تحتاج لتنفيذ واجهة `ReadWriteProperty`. بالنسبة للنوع `val`، تحتاج لتنفيذ واجهة `ReadOnlyProperty`.

#### الشرح المبسّط:
تذكّر القسم 1.6: كتبنا يدوياً منطق تحقق (`if (value in 0..100)`) داخل `set()` لكل خاصية على حدة (`speakerVolume`, `channelNumber`, `brightnessLevel`) — وهذا تكرار للمنطق نفسه في أماكن متعددة. مفوِّضات الخصائص تحل هذه المشكلة: بدل كتابة نفس منطق التحقق مراراً، تكتبه **مرة واحدة** داخل صنف منفصل (المفوَّض)، ثم "تُفوِّض" كل خاصية لتستخدم ذلك الصنف عبر الكلمة المفتاحية `by`. الآلية التقنية خلف ذلك هي الواجهات (`interfaces`): يجب أن ينفّذ صنف المفوَّض واجهة جاهزة من مكتبة `Kotlin` القياسية (`ReadWriteProperty` لخصائص `var` القابلة للقراءة والتعديل، أو `ReadOnlyProperty` لخصائص `val` للقراءة فقط)، وهذه الواجهة تفرض عليه تعريف دالتين محددتين: `getValue()` و`setValue()`.

**لماذا؟** فصل منطق التحقق في صنف مفوَّض منفصل وقابل لإعادة الاستخدام يمنع تكرار الكود عبر خصائص متعددة، ويجعل تعديل قاعدة التحقق (مثلاً تغيير النطاق المسموح) بتغيير مكان واحد فقط بدل عدة أماكن متفرقة.

#### 💻 الكود: صنف RangeRegulator كمفوِّض قابل لإعادة الاستخدام

##### ما هذا الكود؟
> يبني صنف `RangeRegulator` الذي ينفّذ واجهة `ReadWriteProperty<Any?, Int>` القياسية، ثم يستخدمه كل من `speakerVolume` و`channelNumber` و`brightnessLevel` عبر `by` بدل تكرار منطق التحقق يدوياً في كل خاصية.

```kotlin
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

class RangeRegulator(
    initialValue: Int,
    private val minValue: Int,
    private val maxValue: Int
) : ReadWriteProperty<Any?, Int> {

    var fieldData = initialValue

    override fun getValue(thisRef: Any?, property: KProperty<*>): Int {
        return fieldData
    }

    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in minValue..maxValue) {
            fieldData = value
        }
    }
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {

    override val deviceType = "Smart TV"

    // Delegate speakerVolume and channelNumber to RangeRegulator
    private var speakerVolume by RangeRegulator(initialValue = 2, minValue = 0, maxValue = 100)
    private var channelNumber by RangeRegulator(initialValue = 1, minValue = 0, maxValue = 200)

    fun increaseSpeakerVolume() {
        speakerVolume++
        println("Speaker volume increased to $speakerVolume.")
    }
}
```

##### شرح كل سطر:
1. `class RangeRegulator(...) : ReadWriteProperty<Any?, Int> {` → الصنف المفوَّض ينفّذ واجهة `ReadWriteProperty` المخصصة لأعداد صحيحة (`Int`)
2. `var fieldData = initialValue` → متغير داخلي يخزّن القيمة الفعلية للمفوَّض (يشبه دور `field` من القسم 1.6 لكن هنا يدوياً)
3. `override fun getValue(...): Int { return fieldData }` → تُستدعى تلقائياً كلما قرأت الخاصية المفوَّضة
4. `override fun setValue(...) { if (value in minValue..maxValue) { fieldData = value } }` → تُستدعى تلقائياً كلما أسندت قيمة جديدة، وتحتوي منطق التحقق من النطاق مرة واحدة فقط
5. `private var speakerVolume by RangeRegulator(initialValue = 2, minValue = 0, maxValue = 100)` → الكلمة المفتاحية `by` تربط الخاصية بكائن مفوَّض جاهز بدل كتابة `get()`/`set()` يدوياً

**المكتبات المطلوبة (Imports):**
> `import kotlin.properties.ReadWriteProperty`
> `import kotlin.reflect.KProperty`

---

### 2. الأنواع العامة، الكائنات، والامتدادات (Generics, Objects, and Extensions)

#### النص الأصلي يقول (English):
> "In Kotlin language, there are a number of features intended to help developers write more expressive code: Generics, Different kinds of classes (enum classes and data classes), Singleton and companion objects, Extension properties and functions, Scope functions."
#### الترجمة الحرفية:
> في لغة `Kotlin`، يوجد عدد من الميزات المُصمَّمة لمساعدة المطورين على كتابة كود أكثر تعبيراً ووضوحاً: الأنواع العامة (`Generics`)، أنواع مختلفة من الأصناف (أصناف التعداد وأصناف البيانات)، الكائنات المفردة والمرافقة، خصائص ودوال التوسيع، دوال النطاق.
#### الشرح المبسّط:
بعد أن أتقنّا في القسم 1 أساسيات بناء الأصناف والعلاقات بينها، ينتقل هذا القسم لأدوات "متقدمة" في `Kotlin` تجعل الكود أقصر وأكثر أماناً وتعبيراً عن النية بوضوح أكبر، دون تغيير المنطق الأساسي للبرمجة الكائنية. هذه الأدوات الست (الأنواع العامة، أصناف التعداد، أصناف البيانات، الكائنات المفردة/المرافقة، الامتدادات، ودوال النطاق) ستُبنى جميعها فوق مثال متكامل واحد: نظام أسئلة اختبار (`Quiz`)، بحيث يرى الطالب كيف تتراكب هذه الأدوات فوق بعضها في مشروع واقعي.

**لماذا؟** تعلّم هذه الأدوات مجتمعة على نفس المثال يوضح كيف تُستخدم معاً في مشروع حقيقي، بدل تعلّم كل أداة بمعزل عن الأخرى.

---

#### 2.1 الأنواع العامة (Generics)

#### النص الأصلي يقول (English):
> "Generic types, or generics for short, allow a data type, such as a class, to specify an unknown placeholder data type that can be used with its properties and methods. The syntax for defining a generic type for a class: After the class name comes a left-facing angle bracket (<), followed by a placeholder name for the data type, followed by a right-facing angle bracket (>). The data type that the generic type uses is passed as a parameter in angle brackets when you instantiate the class."

#### الترجمة الحرفية:
> الأنواع العامة (`Generic types`)، أو `generics` اختصاراً، تتيح لنوع بيانات، كصنف مثلاً، أن يحدد نوع بيانات غير معروف كعنصر نائب (`placeholder`) يمكن استخدامه مع خصائصه ودواله.
> صياغة تعريف نوع عام لصنف: بعد اسم الصنف يأتي قوس زاوي يفتح لليسار (`<`)، متبوعاً باسم نائب لنوع البيانات، متبوعاً بقوس زاوي يفتح لليمين (`>`).
> نوع البيانات الذي يستخدمه النوع العام يُمرَّر كوسيط بين قوسين زاويين عند إنشاء نسخة من الصنف.

#### الشرح المبسّط:
تخيّل أنك تريد بناء صنف "سؤال اختبار" (`Question`) يحتوي نص السؤال والإجابة الصحيحة — لكن الإجابة قد تكون نصاً (`String`) في سؤال، أو `Boolean` (صح/خطأ) في سؤال آخر، أو رقماً (`Int`) في سؤال ثالث. بدون الأنواع العامة، ستُضطر لكتابة ثلاثة أصناف منفصلة (`QuestionString`, `QuestionBoolean`, `QuestionInt`) رغم أن بنيتها متطابقة تماماً — وهذا تكرار غير ضروري. الحل هو استخدام نوع عام نائب مثل `T` بدل تحديد نوع ثابت للإجابة، بحيث "يُملأ" هذا النائب بنوع حقيقي فقط عند إنشاء الكائن الفعلي، كأنك تقول "سأخبرك لاحقاً أي نوع بيانات أريد استخدامه هنا".

**لماذا؟** الأنواع العامة تمنع تكرار نفس بنية الصنف لكل نوع بيانات محتمل، مع الحفاظ الكامل على أمان الأنواع (`type safety`) وقت الترجمة — فمترجم `Kotlin` يعرف بالضبط نوع `answer` في كل كائن `Question` تنشئه.

#### 💡 التشبيه:
> النوع العام أشبه بقالب حاوية شحن قابل للتخصيص: نفس القالب الخارجي، لكن يمكن ملؤه بأي نوع بضاعة (نصوص، أرقام، قيم منطقية) دون تغيير تصميم الحاوية نفسها.
> **وجه الشبه:** الحاوية الفارغة القابلة للتخصيص = الصنف العام `class Question<T>`، نوع البضاعة المحدد لاحقاً = `T` الفعلي عند إنشاء الكائن (`String`, `Boolean`, `Int`).

#### 💻 الكود: صنف Question عام يدعم أي نوع إجابة

##### ما هذا الكود؟
> يبني صنف `Question<T>` عاماً يخزّن نص السؤال، والإجابة (بنوع نائب `T`)، ومستوى الصعوبة، ثم يُنشئ ثلاثة كائنات بأنواع إجابة مختلفة.

```kotlin
class Question<T>(
    val questionText: String,
    val answer: T,
    val difficulty: String
)

fun main() {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", "medium")
    val question2 = Question<Boolean>("The sky is green. True or false", false, "easy")
    val question3 = Question<Int>("How many days are there between full moons?", 28, "hard")
}
```

##### شرح كل سطر:
1. `class Question<T>(...) {` → `<T>` بعد اسم الصنف يُعرِّف `T` كنوع نائب عام يمكن استخدامه داخل الصنف
2. `val answer: T,` → الخاصية `answer` تأخذ النوع `T` النائب بدل نوع ثابت محدد مسبقاً
3. `Question<String>("...", "nevermore", "medium")` → عند الإنشاء، يُستبدل `T` فعلياً بـ `String`، فيصبح `answer` من نوع `String` في هذا الكائن تحديداً
4. `Question<Boolean>(...)` و`Question<Int>(...)` → نفس الصنف بالضبط، لكن بنوع إجابة مختلف في كل مرة دون أي تكرار للكود

---

#### 2.2 استخدام صنف التعداد (Use an Enum Class)

#### النص الأصلي يقول (English):
> "An enum class is used to create types with a limited set of possible values. Each possible value of an enum is called an enum constant. Enum constants are placed inside the curly braces separated by commas. The convention is to capitalize every letter in the constant name. You refer to enum constants using the dot operator."

#### الترجمة الحرفية:
> صنف التعداد (`enum class`) يُستخدم لإنشاء أنواع بمجموعة محدودة من القيم الممكنة.
> كل قيمة ممكنة في التعداد تُسمى ثابت تعداد (`enum constant`).
> ثوابت التعداد تُوضع داخل الأقواس المعقوفة مفصولة بفواصل.
> العُرف المتبع هو كتابة كل حرف في اسم الثابت بحروف كبيرة (`CAPS`).
> يُشار إلى ثوابت التعداد باستخدام عامل النقطة.

#### الشرح المبسّط:
في المثال السابق (2.1)، كانت `difficulty` من نوع `String` عادي — وهذا يفتح الباب لأخطاء إملائية خطيرة مثل كتابة `"medum"` بدل `"medium"` دون أن يكتشف المترجم الخطأ، لأن أي نص يُعتبر صالحاً من منظور اللغة. صنف التعداد يحل هذه المشكلة بالضبط: يحدد مسبقاً القيم الوحيدة المسموحة (`EASY`, `MEDIUM`, `HARD` مثلاً) بحيث يرفض المترجم أي قيمة أخرى فوراً وقت الترجمة قبل حتى تشغيل البرنامج. الرابط بالقسم السابق مباشر: سنستبدل الآن `val difficulty: String` بـ `val difficulty: Difficulty` في صنف `Question` العام نفسه.

**لماذا؟** صنف التعداد يحوّل مجموعة قيم نصية "مفتوحة" وعرضة للأخطاء إلى مجموعة قيم "مغلقة" ومضبوطة بأمان الأنواع، فيكتشف المترجم أي خطأ إملائي أو قيمة غير منطقية فوراً بدل اكتشافها أثناء التشغيل أو عدم اكتشافها إطلاقاً.

#### 💻 الكود: صنف Difficulty كتعداد ودمجه مع Question

##### ما هذا الكود؟
> يعرّف `enum class Difficulty` بثلاثة ثوابت، ثم يستخدمه كنوع لخاصية `difficulty` بدل `String` الخام.

```kotlin
enum class Difficulty {
    EASY, MEDIUM, HARD
}

class Question<T>(
    val questionText: String,
    val answer: T,
    val difficulty: Difficulty
)

fun main() {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
    val question2 = Question<Boolean>("The sky is green. True or false", false, Difficulty.EASY)
    val question3 = Question<Int>("How many days are there between full moons?", 28, Difficulty.HARD)
}
```

##### شرح كل سطر:
1. `enum class Difficulty { EASY, MEDIUM, HARD }` → تعريف نوع مغلق بثلاث قيم ممكنة فقط، مفصولة بفواصل وبأحرف كبيرة حسب العُرف
2. `val difficulty: Difficulty` → الخاصية الآن من نوع `Difficulty` المخصص بدل `String` العام
3. `Difficulty.MEDIUM` → الوصول لقيمة التعداد عبر اسم الصنف، عامل النقطة، ثم اسم الثابت

---

#### 2.3 استخدام صنف البيانات (Use a Data Class)

#### النص الأصلي يقول (English):
> "Classes that only contain data and don't have any methods that perform an action can be defined as a data class. Defining a class as a data class allows the Kotlin compiler to make certain assumptions, and to automatically implement some methods. To define a data class, simply add the data keyword before the class keyword. When a class is defined as a data class, the following methods are implemented: equals(), hashCode(), toString(), componentN(), copy()."

#### الترجمة الحرفية:
> الأصناف التي تحتوي فقط على بيانات ولا تمتلك أي دوال تنفّذ فعلاً يمكن تعريفها كصنف بيانات (`data class`).
> تعريف صنف كـ`data class` يسمح لمترجم `Kotlin` بافتراض أمور معينة، وتنفيذ بعض الدوال تلقائياً.
> لتعريف صنف بيانات، ببساطة أضف الكلمة المفتاحية `data` قبل الكلمة المفتاحية `class`.
> عندما يُعرَّف صنف كـ`data class`، تُنفَّذ الدوال التالية تلقائياً: `equals()`، `hashCode()`، `toString()`، `componentN()`, `copy()`.

#### الشرح المبسّط:
انظر مجدداً إلى صنف `Question` من القسم 2.1 — هو تماماً المثال المثالي لصنف بيانات: يحمل ثلاث خصائص فقط (`questionText`, `answer`, `difficulty`) ولا يحتوي أي دالة سلوك حقيقية. عادةً في `Kotlin` (كما في لغات أخرى) يحتاج المبرمج كتابة دوال يدوية مثل `toString()` (لعرض الكائن كنص مقروء) أو `equals()` (لمقارنة كائنين) بنفسه — وهذا كود مكرر ومملّ لأي صنف بيانات جديد. كلمة `data` تلغي هذا العناء بالكامل: يفحص المترجم كل الخصائص المعرّفة في المُنشِئ الرئيسي، ويولّد تلقائياً دوال المقارنة والعرض والنسخ استناداً إليها. لاحظ الفرق العملي: `println(question1.toString())` سيطبع الآن تمثيلاً نصياً مقروءاً تلقائياً يحتوي كل قيم الخصائص، بدل نص تقني غامض كان سيظهر بدون `data`.

**لماذا؟** توليد هذه الدوال تلقائياً يوفّر وقت المطور ويمنع أخطاء يدوية شائعة (مثل نسيان تحديث `equals()` بعد إضافة خاصية جديدة)، وهو مناسب تحديداً للأصناف التي وظيفتها الوحيدة حمل بيانات بلا سلوك.

#### 💻 الكود: تحويل Question إلى صنف بيانات

##### ما هذا الكود؟
> يضيف `data` أمام `class Question<T>` فيكتسب الصنف تلقائياً دوال `toString()` وغيرها، ثم يطبع كائناً لإظهار الفرق.

```kotlin
enum class Difficulty {
    EASY, MEDIUM, HARD
}

data class Question<T>(
    val questionText: String,
    val answer: T,
    val difficulty: Difficulty
)

fun main() {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
    println(question1.toString())
}
```

##### شرح كل سطر:
1. `data class Question<T>(...) {` → إضافة `data` قبل `class` تكفي لتوليد `equals()`, `hashCode()`, `toString()`, `componentN()`, `copy()` تلقائياً
2. `println(question1.toString())` → استدعاء `toString()` المُولَّدة تلقائياً، والتي تطبق كل خصائص الكائن بصيغة مقروءة دون كتابة أي كود إضافي

**الناتج المتوقع (لقطة الشاشة):**
```
Question(questionText=Quoth the raven ___, answer=nevermore, difficulty=MEDIUM)
```

---

#### 2.4 استخدام الكائن المفرد (Use a Singleton Object)

#### النص الأصلي يقول (English):
> "A singleton is a class that can only have a single instance. Kotlin provides a special construct, called an object, that can be used to make a singleton class. The syntax for an object is similar to that of a class. Simply use the object keyword instead of the class keyword. A singleton object can't have a constructor as you can't create instances directly. Instead, all the properties are defined within the curly braces and are given an initial value. You can access singleton object properties by referring to the name of the object itself, followed by the dot operator, followed by the property name."

#### الترجمة الحرفية:
> الكائن المفرد (`singleton`) هو صنف لا يمكن أن يكون له إلا نسخة واحدة فقط.
> يوفّر `Kotlin` بنية خاصة تُسمى `object`، تُستخدم لإنشاء صنف مفرد.
> صياغة `object` مشابهة لصياغة `class`. ببساطة استخدم الكلمة المفتاحية `object` بدل `class`.
> الكائن المفرد لا يمكن أن يمتلك مُنشِئاً لأنه لا يمكن إنشاء نسخ منه مباشرة.
> بدلاً من ذلك، تُعرَّف كل الخصائص داخل الأقواس المعقوفة وتُعطى قيمة ابتدائية.
> يمكنك الوصول لخصائص الكائن المفرد بالإشارة لاسم الكائن نفسه، متبوعاً بعامل النقطة، متبوعاً باسم الخاصية.

#### الشرح المبسّط:
حتى الآن كل الأصناف التي رأيناها (`SmartDevice`, `Question`, ...) يمكن إنشاء عدد غير محدود من الكائنات منها. لكن أحياناً تحتاج فعلياً كائناً **واحداً فقط** يشترك فيه كل البرنامج — مثل تتبع "عدد الأسئلة التي أجاب عنها الطالب" في اختبار واحد؛ لا معنى منطقياً لوجود أكثر من نسخة واحدة من هذه الحالة. الكلمة المفتاحية `object` تفرض هذا القيد تلقائياً: بما أنك لا تستدعي `StudentProgress()` أبداً (لا يوجد مُنشِئ إطلاقاً)، فإن `Kotlin` ينشئ النسخة الوحيدة تلقائياً أول مرة يُستخدم فيها الكائن، ويعيد استخدام نفس النسخة في كل مكان آخر بالبرنامج. هذا يختلف جوهرياً عن `class`: لا حاجة لكتابة `val x = StudentProgress()` إطلاقاً؛ تصل مباشرة عبر `StudentProgress.answered`.

**لماذا؟** بعض البيانات في البرنامج منطقياً يجب أن تكون فريدة وموحّدة (كحالة تقدّم طالب واحد)؛ الكائن المفرد يضمن هذا على مستوى اللغة نفسها بدل الاعتماد على انضباط المبرمج يدوياً.

#### 💻 الكود: StudentProgress ككائن مفرد

##### ما هذا الكود؟
> يعرّف `object StudentProgress` بخاصيتين (`total`, `answered`)، ثم يقرأهما مباشرة عبر اسم الكائن دون إنشاء أي نسخة.

```kotlin
object StudentProgress {
    var total: Int = 10
    var answered: Int = 3
}

fun main() {
    println("${StudentProgress.answered} of ${StudentProgress.total} answered.")
}
```

##### شرح كل سطر:
1. `object StudentProgress {` → `object` بدل `class` — لا مُنشِئ، ولا حاجة لكلمة `()` بعد الاسم
2. `var total: Int = 10` و `var answered: Int = 3` → خصائص عادية لكنها فريدة على مستوى البرنامج بأكمله
3. `println("${StudentProgress.answered} of ${StudentProgress.total} answered.")` → الوصول المباشر عبر اسم الكائن دون إنشاء نسخة منه

**الناتج المتوقع (لقطة الشاشة):**
```
3 of 10 answered.
```

---

#### 2.5 تعريف الكائنات كأصناف مرافقة (Declare Objects as Companion Objects)

#### النص الأصلي يقول (English):
> "Classes and objects in Kotlin can be defined inside other types, and can be a great way to organize your code. You can define a singleton object inside another class using a companion object. A companion object allows you to access its properties and methods from inside the class, if the object's properties and methods belong to that class, allowing for more concise syntax. To declare a companion object, simply add the companion keyword before the object keyword."

#### الترجمة الحرفية:
> الأصناف والكائنات في `Kotlin` يمكن تعريفها داخل أنواع أخرى، وهذا يمكن أن يكون طريقة رائعة لتنظيم الكود.
> يمكنك تعريف كائن مفرد داخل صنف آخر باستخدام كائن مرافق (`companion object`).
> الكائن المرافق يتيح لك الوصول لخصائصه ودواله من داخل الصنف، إن كانت خصائص الكائن ودواله تخص فعلياً ذلك الصنف، مما يسمح بصياغة أكثر إيجازاً.
> لتعريف كائن مرافق، ببساطة أضف الكلمة المفتاحية `companion` قبل الكلمة المفتاحية `object`.

#### الشرح المبسّط:
في القسم السابق (2.4) كان `StudentProgress` كائناً مستقلاً منفصلاً تماماً عن صنف `Quiz`، رغم أن تقدّم الطالب منطقياً يخص اختباراً محدداً وليس البرنامج ككل. الكائن المرافق يحل هذا التضارب المفاهيمي: يسمح "بوضع" الكائن المفرد **داخل** صنف آخر (هنا `Quiz`)، بحيث يصبح تابعاً منطقياً له بدل أن يكون معزولاً عنه. الميزة العملية الإضافية هي إيجاز الصياغة: من داخل صنف `Quiz` نفسه، يمكن الوصول لخصائص الكائن المرافق مباشرة باسمها فقط أحياناً (دون تكرار اسمه)، بينما من خارج الصنف يبقى الوصول عبر `Quiz.answered` تماماً كما كان `StudentProgress.answered` من قبل.

**لماذا؟** الكائن المرافق يربط منطقياً بين بيانات "ثابتة/مشتركة" (تشبه المتغيرات الساكنة `static` في لغات أخرى) وبين الصنف الذي تخصه فعلياً، بدل تركها ككائن منفصل بلا سياق واضح.

#### 💻 الكود: StudentProgress ككائن مرافق داخل Quiz

##### ما هذا الكود؟
> ينقل `object StudentProgress` ليصبح `companion object` معرَّفاً داخل صنف `Quiz`، فيصبح الوصول إليه عبر اسم الصنف `Quiz` مباشرة.

```kotlin
class Quiz {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
    val question2 = Question<Boolean>("The sky is green. True or false", false, Difficulty.EASY)
    val question3 = Question<Int>("How many days are there between full moons?", 28, Difficulty.HARD)

    companion object StudentProgress {
        var total: Int = 10
        var answered: Int = 3
    }
}

fun main() {
    println("${Quiz.answered} of ${Quiz.total} answered.")
}
```

##### شرح كل سطر:
1. `companion object StudentProgress { ... }` → `companion` قبل `object` يجعل هذا الكائن المفرد جزءاً "مرافقاً" لصنف `Quiz` تحديداً
2. `println("${Quiz.answered} of ${Quiz.total} answered.")` → الوصول من خارج الصنف يتم عبر اسم الصنف الحاوي (`Quiz`) مباشرة، وليس اسم الكائن المرافق نفسه

---

#### 2.6 توسيع الأصناف بخصائص ودوال جديدة (Extend Classes with New Properties and Methods)

#### النص الأصلي يقول (English):
> "To define an extension property, add the type name and a dot operator (.) before the variable name. To define an extension function, add the type name and a dot operator (.) before the function name."

#### الترجمة الحرفية:
> لتعريف خاصية توسيع (`extension property`)، أضف اسم النوع وعامل نقطة `.` قبل اسم المتغير.
> لتعريف دالة توسيع (`extension function`)، أضف اسم النوع وعامل نقطة `.` قبل اسم الدالة.

#### الشرح المبسّط:
حتى الآن كنا نضيف كل خاصية أو دالة جديدة من **داخل** تعريف الصنف نفسه (بين قوسيه المعقوفين). دوال وخصائص التوسيع تكسر هذا القيد: تسمح لك بإضافة سلوك جديد لصنف موجود مسبقاً (حتى لو كان صنفاً من مكتبة خارجية لا تملك حق تعديل كودها المصدري) **من الخارج تماماً**، بدون فتح ملف الصنف الأصلي وتعديله. الصياغة تشبه كتابة دالة عادية، لكن مع إضافة "اسم النوع + نقطة" مباشرة قبل اسم الدالة أو الخاصية — وكأنك تقول "هذه الدالة تنتمي منطقياً لهذا النوع، رغم أنها مكتوبة في مكان آخر تماماً". المثال العملي هنا يوسّع `Quiz.StudentProgress` (الكائن المرافق من القسم السابق) بخاصية `progressText` ودالة `printProgressBar()` جديدتين تماماً، دون العودة لتعديل تعريف `Quiz` الأصلي.

**لماذا؟** التوسيع مفيد جداً عند التعامل مع أصناف لا تملك صلاحية تعديلها (من مكتبات خارجية)، أو لإبقاء الصنف الأصلي "نظيفاً" ومركّزاً بينما تُضاف الوظائف الإضافية أو المساعدة في ملفات منفصلة.

#### 💻 الكود: خاصية ودالة توسيع لـ Quiz.StudentProgress

##### ما هذا الكود؟
> يضيف خاصية توسيع `progressText` ودالة توسيع `printProgressBar()` للكائن المرافق `Quiz.StudentProgress`، من خارج تعريف صنف `Quiz` تماماً.

```kotlin
class Quiz {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
    val question2 = Question<Boolean>("The sky is green. True or false", false, Difficulty.EASY)
    val question3 = Question<Int>("How many days are there between full moons?", 28, Difficulty.HARD)

    companion object StudentProgress {
        var total: Int = 10
        var answered: Int = 3
    }
}

// Extension property: adds progressText to Quiz.StudentProgress from the outside
val Quiz.StudentProgress.progressText: String
    get() = "${answered} of ${total} answered"

// Extension function: adds printProgressBar() to Quiz.StudentProgress from the outside
fun Quiz.StudentProgress.printProgressBar() {
    repeat(Quiz.answered) { print("▓") }
    repeat(Quiz.total - Quiz.answered) { print("▒") }
    println()
    println(Quiz.progressText)
}

fun main() {
    println(Quiz.progressText)
    Quiz.printProgressBar()
}
```

##### شرح كل سطر:
1. `val Quiz.StudentProgress.progressText: String` → `Quiz.StudentProgress` قبل اسم الخاصية `progressText` يوسّع تحديداً ذلك الكائن المرافق
2. `get() = "${answered} of ${total} answered"` → منطق الخاصية يستخدم `answered`/`total` مباشرة كأنه مكتوب داخل الصنف نفسه
3. `fun Quiz.StudentProgress.printProgressBar() { ... }` → دالة توسيع بنفس المنطق، تستخدم `repeat()` لطباعة شريط تقدم بصري
4. `repeat(Quiz.answered) { print("▓") }` → تكرار طباعة رمز الجزء "المكتمل" من الشريط بعدد الأسئلة المُجاب عنها

**الناتج المتوقع (لقطة الشاشة):**
```
3 of 10 answered
▓▓▓▒▒▒▒▒▒▒
3 of 10 answered
```

---

#### 2.7 إعادة كتابة دوال التوسيع باستخدام الواجهات (Rewrite Extension Functions Using Interfaces)

#### النص الأصلي يقول (English):
> "An interface is defined using the interface keyword, followed by a name in UpperCamelCase, followed by opening and closing curly braces. Within the curly braces, you can define any method signatures or get-only properties that any class conforming to the interface must implement. An interface is a contract. A class that conforms to an interface is said to extend the interface. In return, the class must implement all properties and methods specified in the interface. Interfaces allow for variation in the behavior of classes that extend them. It's up to each class to provide the implementation."

#### الترجمة الحرفية:
> الواجهة (`interface`) تُعرَّف باستخدام الكلمة المفتاحية `interface`، متبوعة باسم بصيغة `UpperCamelCase`، متبوعة بأقواس معقوفة فاتحة وخاتمة.
> داخل الأقواس المعقوفة، يمكنك تعريف أي توقيعات دوال أو خصائص للقراءة فقط يجب على أي صنف يتوافق مع الواجهة تنفيذها.
> الواجهة عقد. الصنف الذي يتوافق مع واجهة يُقال إنه يوسّع الواجهة (`extends`).
> في المقابل، يجب على الصنف تنفيذ كل الخصائص والدوال المحددة في الواجهة.
> الواجهات تتيح تبايناً في سلوك الأصناف التي توسّعها؛ الأمر متروك لكل صنف لتقديم التنفيذ الخاص به.

#### الشرح المبسّط:
في القسم السابق (2.6) كانت `progressText` و`printProgressBar()` مرتبطتين تحديداً وحصراً بـ `Quiz.StudentProgress` — لا يمكن لأي صنف آخر مختلف تماماً (يملك بنية بيانات مختلفة) أن يعيد استخدام نفس الفكرة بسهولة. الواجهة تحل هذه المحدودية عبر تحويل الفكرة إلى "عقد عام": بدل كتابة دوال توسيع مرتبطة بصنف واحد بالتحديد، تُعرِّف واجهة `ProgressPrintable` تنص على "أي صنف يريد طباعة شريط تقدم يجب أن يمتلك `progressText` و`printProgressBar()`"، ثم يلتزم `Quiz` (ويمكن أي صنف آخر لاحقاً) بهذا العقد عبر `class Quiz : ProgressPrintable`. الفرق الجوهري عن الوراثة (القسم 1.9): الواجهة لا تحمل أي تنفيذ فعلي، فقط "توقيعات" فارغة يلتزم كل صنف بملئها بطريقته الخاصة.

**لماذا؟** الواجهات تفصل "ماذا يجب أن يفعل الصنف" عن "كيف يفعله فعلياً"، فتسمح لأصناف مختلفة تماماً في بنيتها الداخلية أن تشترك في نفس السلوك المتوقَّع (`ProgressPrintable`) دون فرض تسلسل وراثي واحد عليها جميعاً.

#### 💻 الكود: واجهة ProgressPrintable وتطبيقها في Quiz

##### ما هذا الكود؟
> يستبدل دوال التوسيع المرتبطة حصراً بـ`Quiz.StudentProgress` بواجهة عامة `ProgressPrintable`، ثم يجعل `Quiz` ينفّذها مباشرة.

```kotlin
interface ProgressPrintable {
    val progressText: String
    fun printProgressBar()
}

class Quiz : ProgressPrintable {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
    val question2 = Question<Boolean>("The sky is green. True or false", false, Difficulty.EASY)
    val question3 = Question<Int>("How many days are there between full moons?", 28, Difficulty.HARD)

    companion object StudentProgress {
        var total: Int = 10
        var answered: Int = 3
    }

    override val progressText: String
        get() = "${answered} of ${total} answered"

    override fun printProgressBar() {
        repeat(Quiz.answered) { print("▓") }
        repeat(Quiz.total - Quiz.answered) { print("▒") }
        println()
        println(progressText)
    }
}

fun main() {
    Quiz().printProgressBar()
}
```

##### شرح كل سطر:
1. `interface ProgressPrintable { val progressText: String; fun printProgressBar() }` → عقد يفرض خاصية واحدة للقراءة ودالة واحدة، بلا أي تنفيذ فعلي
2. `class Quiz : ProgressPrintable {` → نفس صياغة الوراثة (`:`) لكن مع واجهة بدل صنف عادي
3. `override val progressText: String` و `override fun printProgressBar() { ... }` → `Quiz` يلتزم بالعقد ويقدّم تنفيذاً فعلياً خاصاً به لكل عنصر في الواجهة

---

#### 2.8 دالة النطاق let() — التخلص من الإشارة المتكررة لاسم الكائن (Eliminate Repetitive Object References with let())

#### النص الأصلي يقول (English):
> "Scope functions are higher-order functions that allow you to access properties and methods of an object without referring to the object's name. The let() function allows you to refer to an object in a lambda expression using the identifier it, instead of the object's actual name. This can help you avoid using a long, more descriptive object name repeatedly when accessing more than one property. The let() function is an extension function that can be called on any Kotlin object using dot notation."

#### الترجمة الحرفية:
> دوال النطاق (`Scope functions`) هي دوال من الرتبة الأعلى (`higher-order functions`) تتيح لك الوصول لخصائص ودوال كائن دون الإشارة لاسم الكائن.
> دالة `let()` تتيح لك الإشارة لكائن داخل تعبير لامدا (`lambda expression`) باستخدام المُعرِّف `it` بدل الاسم الفعلي للكائن.
> هذا يساعدك على تجنّب استخدام اسم كائن طويل ووصفي بشكل متكرر عند الوصول لأكثر من خاصية واحدة.
> دالة `let()` هي دالة توسيع يمكن استدعاؤها على أي كائن في `Kotlin` باستخدام صيغة النقطة.

#### الشرح المبسّط:
تخيّل أنك تريد طباعة ثلاث خصائص من نفس السؤال (`question1.questionText`, `question1.answer`, `question1.difficulty`) — تكرار اسم `question1` ثلاث مرات متتالية أمر مزعج بصرياً خصوصاً إن كان الاسم طويلاً. `let()` تحل هذه المشكلة بأناقة: تستدعيها على الكائن (`question1.let { ... }`)، وداخل الأقواس المعقوفة (تعبير لامدا) يصبح بإمكانك الإشارة لنفس الكائن عبر الكلمة المختصرة `it` فقط، دون كتابة `question1` مجدداً على الإطلاق. من الناحية التقنية، `let()` هي في الأصل دالة توسيع عادية (بنفس مبدأ القسم 2.6) لكنها معرَّفة مسبقاً داخل مكتبة `Kotlin` القياسية، متاحة تلقائياً على أي كائن دون الحاجة لكتابتها بنفسك.

**لماذا؟** تقليل التكرار البصري لاسم كائن طويل يجعل الكود أقصر وأسهل قراءة، خصوصاً عند تنفيذ عدة عمليات متتالية على نفس الكائن داخل كتلة واحدة.

#### 💻 الكود: استخدام let() لطباعة أسئلة الاختبار

##### ما هذا الكود؟
> دالة `printQuiz()` تستخدم `let()` على كل سؤال لطباعة خصائصه الثلاث دون تكرار اسم متغير السؤال داخل الكتلة.

```kotlin
class Quiz : ProgressPrintable {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
    val question2 = Question<Boolean>("The sky is green. True or false", false, Difficulty.EASY)
    val question3 = Question<Int>("How many days are there between full moons?", 28, Difficulty.HARD)
    // ...

    fun printQuiz() {
        question1.let {
            println(it.questionText)
            println(it.answer)
            println(it.difficulty)
        }
        println()
        question2.let {
            println(it.questionText)
            println(it.answer)
            println(it.difficulty)
        }
        println()
    }
}

fun main() {
    val quiz = Quiz()
    quiz.printQuiz()
}
```

##### شرح كل سطر:
1. `question1.let { ... }` → استدعاء `let()` على `question1`؛ كل ما بداخل الأقواس المعقوفة "نطاق" (`scope`) يمكنه الإشارة لـ`question1` عبر `it`
2. `println(it.questionText)` → `it` يمثّل `question1` نفسه هنا، فـ`it.questionText` مطابق تماماً لـ`question1.questionText`
3. نفس النمط يتكرر لـ`question2` — استدعاء منفصل لـ`let()` بنطاقه الخاص

---

#### 2.9 دالة النطاق apply() — استدعاء دوال الكائن قبل تخزينه في متغير (Call an Object's Methods Without a Variable Using apply())

#### النص الأصلي يقول (English):
> "One of the cool features of scope functions is that you can call them on an object before that object has even been assigned to a variable. The apply() function is an extension function that can be called on an object using dot notation. The apply() function also returns a reference to that object so that it can be stored in a variable."

#### الترجمة الحرفية:
> إحدى الميزات الرائعة لدوال النطاق أنه يمكنك استدعاءها على كائن حتى قبل إسناد ذلك الكائن إلى متغير.
> دالة `apply()` هي دالة توسيع يمكن استدعاؤها على كائن باستخدام صيغة النقطة.
> دالة `apply()` تُعيد أيضاً مرجعاً لذلك الكائن نفسه، بحيث يمكن تخزينه في متغير.

#### الشرح المبسّط:
في القسم السابق كنا نكتب خطوتين منفصلتين: أولاً `val quiz = Quiz()` لإنشاء الكائن وتخزينه، ثم ثانياً `quiz.printQuiz()` لاستدعاء دالة عليه. `apply()` تدمج هاتين الخطوتين في تعبير واحد متسلسل: تستدعي `Quiz().apply { printQuiz() }` مباشرة بعد الإنشاء دون الحاجة لتخزين الكائن في متغير مؤقت أولاً لمجرد استدعاء دالة عليه. الميزة الإضافية المهمة هي أن `apply()` — خلافاً لـ`let()` التي قد تُعيد قيمة مختلفة — تُعيد دائماً **نفس الكائن الأصلي**، لذلك يمكنك في النهاية إسناد النتيجة لمتغير (`val quiz = Quiz().apply { ... }`) إن احتجت الكائن لاحقاً أيضاً.

**لماذا؟** `apply()` مفيدة تحديداً في سيناريو "أنشئ الكائن ثم هيّئه فوراً" — تجعل الكود أكثر تسلسلاً وإيجازاً بدل الحاجة لمتغير وسيط لا فائدة حقيقية منه سوى استدعاء دالة واحدة عليه.

#### 💻 الكود: استخدام apply() عند إنشاء الكائن مباشرة

##### ما هذا الكود؟
> ينشئ كائن `Quiz` ويستدعي `printQuiz()` عليه في تعبير واحد متسلسل عبر `apply()`.

```kotlin
val quiz = Quiz().apply {
    printQuiz()
}
```

##### شرح كل سطر:
1. `Quiz()` → إنشاء الكائن كما هو معتاد
2. `.apply { printQuiz() }` → استدعاء `printQuiz()` مباشرة على الكائن حديث الإنشاء دون متغير وسيط
3. `val quiz = ...` → `apply()` تُعيد نفس الكائن الأصلي، فيُخزَّن في `quiz` للاستخدام لاحقاً إن لزم

#### ⚖️ المقايضة: let() مقابل apply()

| | `let()` | `apply()` |
| --- | --- | --- |
| المزايا | مناسبة لتنفيذ عملية وإرجاع نتيجة مختلفة عن الكائن الأصلي، مرجع الكائن داخلها عبر `it` | مناسبة لتهيئة كائن مباشرة بعد إنشائه، تُعيد الكائن نفسه دائماً فيسمح بالتسلسل |
| العيوب | لا تُعيد الكائن الأصلي تلقائياً إن احتجته لاحقاً | أقل وضوحاً عند استخدام دوال متعددة داخل الكتلة لأنها لا تستخدم `it` صراحة |
| متى تختاره | عندما تريد تنفيذ عملية على كائن (خصوصاً غير قابل للـ`null`) والحصول على نتيجة منها | عندما تريد تهيئة كائن جديد فور إنشائه دون متغير وسيط |

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `class` | قالب/مخطط يحدد خصائص ودوال كل كائن يُبنى منه | `class SmartDevice(...) { ... }` |
| `object` (كائن فعلي) | نسخة حقيقية مُنشأة من صنف، تشغل ذاكرة فعلية | `val smartTvDevice = SmartDevice()` |
| `property` | متغير مُعرَّف داخل جسم الصنف (`val`/`var`) | `val name: String` |
| `method` | دالة عضو تمثل سلوك الصنف | `fun turnOn() { ... }` |
| `constructor` | دالة خاصة تُهيّئ الكائن وقت إنشائه | رئيسي (`primary`) أو ثانوي (`secondary`) |
| `field` | الحقل الخلفي الذي يخزّن قيمة الخاصية فعلياً في الذاكرة | يُستخدم داخل `get()`/`set()` فقط |
| `inheritance` (وراثة) | بناء صنف اعتماداً على صنف آخر عبر `open`/`:` | `class SmartTvDevice : SmartDevice(...)` |
| `IS-A` | علاقة وراثة — الابن هو نوع من الأب | `SmartTvDevice IS-A SmartDevice` |
| `HAS-A` (composition) | علاقة تركيب — الكائن يمتلك كائناً آخر كخاصية | `SmartHome HAS-A SmartTvDevice` |
| `override` | استبدال تنفيذ دالة/خاصية موروثة بتنفيذ خاص في الصنف الفرعي | يتطلب `open` في الأب |
| `super` | استدعاء تنفيذ الأب صراحة من داخل الصنف الفرعي | `super.turnOn()` |
| `visibility modifier` | يحدد نطاق الوصول لعنصر: `public`/`private`/`protected`/`internal` | `private var deviceStatus` |
| `property delegate` | تفويض منطق `get()`/`set()` لصنف خارجي عبر `by` | `by RangeRegulator(...)` |
| `Generics` (`<T>`) | نوع نائب يسمح للصنف بالعمل مع أي نوع بيانات حقيقي | `class Question<T>(...)` |
| `enum class` | نوع بقيم محدودة ومغلقة مسبقاً | `enum class Difficulty { EASY, MEDIUM, HARD }` |
| `data class` | صنف بيانات صرف تُولَّد له دوال `toString`/`equals`/... تلقائياً | `data class Question<T>(...)` |
| `singleton` (`object`) | صنف له نسخة واحدة فقط في كامل البرنامج | `object StudentProgress { ... }` |
| `companion object` | كائن مفرد مُعرَّف داخل صنف آخر، يُنسب إليه منطقياً | `companion object StudentProgress { ... }` داخل `Quiz` |
| `extension function/property` | إضافة سلوك جديد لصنف موجود من خارج تعريفه | `fun Quiz.StudentProgress.printProgressBar() { ... }` |
| `interface` | عقد يحدد توقيعات دوال/خصائص يجب على المُنفِّذ الالتزام بها | `interface ProgressPrintable { ... }` |
| `scope function` | دوال جاهزة (`let`, `apply`, ...) للوصول لكائن دون تكرار اسمه | `question1.let { it.answer }` |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `val`/`var` كخاصية | تخزين بيانات الكائن | `val` للقراءة فقط، `var` قابلة للتغيير |
| `open` | السماح بالوراثة أو التجاوز | على مستوى الصنف أو الدالة أو الخاصية |
| `:` بعد ترويسة الصنف | تحديد الصنف الأعلى الذي يُورَّث منه، أو الواجهة المُنفَّذة | `class Child : Parent(...)` أو `class C : Interface` |
| `this(...)` في مُنشِئ ثانوي | تهيئة المُنشِئ الرئيسي أولاً | إلزامي إن وُجد مُنشِئ رئيسي |
| `field` | مرجع مباشر للقيمة المخزَّنة فعلياً خلف الخاصية | يمنع الاستدعاء الذاتي اللانهائي داخل `set()` |
| `by` | ربط خاصية بكائن مفوَّض يتولى `get()`/`set()` | يتطلب تنفيذ `ReadWriteProperty`/`ReadOnlyProperty` |
| `<T>` | تعريف نوع نائب عام | يُستبدل بنوع حقيقي عند الإنشاء `Question<String>(...)` |
| `it` | الإشارة الضمنية للكائن داخل `let()` | بديل مختصر لاسم الكائن الطويل |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| المُنشِئ الرئيسي مقابل الثانوي | Primary constructor | Secondary constructor | الرئيسي بلا جسم وواحد فقط لكل صنف؛ الثانوي له جسم ويمكن تعدده، ويجب أن يُهيّئ الرئيسي أولاً |
| IS-A مقابل HAS-A | Inheritance (`:`) | Composition (خاصية من نوع صنف آخر) | IS-A تعني "نوع من"، HAS-A تعني "يملك/يستخدم" |
| `class` عادي مقابل `data class` | يحتاج دوال `toString`/`equals` يدوياً | تُولَّد تلقائياً من الخصائص | `data class` فقط للأصناف التي وظيفتها حمل بيانات بلا سلوك |
| `object` مقابل `companion object` | كائن مفرد مستقل بذاته | كائن مفرد مُعرَّف داخل صنف آخر ومنسوب له | الوصول لـ`companion object` يتم عبر اسم الصنف الحاوي |
| Inheritance مقابل Interface | تنقل تنفيذاً فعلياً جاهزاً من الأب | تفرض فقط توقيعات فارغة يجب تنفيذها | الوراثة صنف واحد فقط للأب، بينما يمكن تنفيذ عدة واجهات |
| `let()` مقابل `apply()` | يُعيد نتيجة أي تعبير (قد تختلف عن الكائن) | يُعيد دوماً نفس الكائن الأصلي | `let` لتنفيذ عملية والحصول على نتيجة، `apply` للتهيئة والتسلسل |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| بنية الصنف | `class`, `object`, `property`, `method`, `constructor`, `field` |
| الوراثة والتعدد | `open`, `override`, `super`, `IS-A`, `HAS-A`, `polymorphism`, `interface` |
| التحكم بالوصول | `public`, `private`, `protected`, `internal`, `encapsulation` |
| الأنواع المتقدمة | `Generics <T>`, `enum class`, `data class`, `singleton`, `companion object` |
| التوسيع والنطاق | `extension function/property`, `scope function`, `let()`, `apply()`, `it` |
| التفويض | `property delegate`, `by`, `ReadWriteProperty`, `ReadOnlyProperty`, `KProperty` |

### أبرز النقاط الذهبية
1. الصنف قالب، والكائن نسخة حقيقية منه — لا تخلط بينهما أبداً.
2. كل شيء `public` افتراضياً في `Kotlin` ما لم تحدد معدِّل رؤية آخر صراحة.
3. لا يمكن الوراثة أو التجاوز إلا بعد وضع `open` صراحة — كل شيء `final` افتراضياً.
4. `super` يستدعي **دائماً** نسخة الأب تحديداً، بينما استدعاء عادي (`object.method()`) يستدعي النسخة الحقيقية حسب نوع الكائن الفعلي (تعدد الأشكال).
5. `field` ضروري داخل `set()` المخصصة لتفادي استدعاء ذاتي لا نهائي.
6. الأنواع العامة `<T>` تمنع تكرار نفس بنية الصنف لكل نوع بيانات محتمل.
7. `data class` مخصصة فقط للأصناف التي تحمل بيانات بلا سلوك حقيقي.
8. `companion object` هو المكان الطبيعي لبيانات "مشتركة" منسوبة لصنف محدد (شبيه بـ `static`).
9. الواجهة (`interface`) تفرض "ماذا" يجب تنفيذه دون تحديد "كيف"، بعكس الوراثة التي تنقل تنفيذاً جاهزاً.
10. `apply()` تُعيد الكائن نفسه دوماً (مناسبة للتهيئة)، بينما `let()` تعمل عبر `it` وقد تُعيد قيمة مختلفة.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| محاولة وراثة صنف أو تجاوز دالة دون كتابة `open` | يجب إضافة `open` على الصنف والدالة/الخاصية في الأب قبل أي `override` |
| كتابة `speakerVolume = value` داخل `set()` الخاصة بـ `speakerVolume` نفسها | يجب استخدام `field = value` لتفادي حلقة استدعاء لا نهائية |
| نسيان `this(...)` عند تعريف مُنشِئ ثانوي في صنف يملك مُنشِئاً رئيسياً | كل مُنشِئ ثانوي يجب أن يُهيّئ المُنشِئ الرئيسي أولاً عبر `: this(...)` |
| الخلط بين `class` عادي و`data class` عند الأصناف التي لا تحمل سلوكاً | استخدم `data class` لتوليد `toString`/`equals`/`copy` تلقائياً بدل كتابتها يدوياً |
| افتراض أن `object` عادي مثل `companion object` من حيث طريقة الوصول | `object` مستقل يُستدعى باسمه مباشرة، بينما `companion object` يُستدعى عبر اسم الصنف الحاوي له |
| استخدام الوراثة (`:` + صنف) بدل واجهة عند الحاجة لعقد سلوك بلا تنفيذ جاهز | استخدم `interface` عندما تريد فرض "ماذا" فقط دون تنفيذ مسبق |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: إنشاء صنف فرعي يرث من صنف أعلى مع تجاوز سلوك

#### ما هدف هذه العملية؟
> بناء تسلسل وراثة كامل بدءاً من صنف أعلى قابل للتوسيع وصولاً إلى صنف فرعي يخصص سلوكه الخاص.

```algorithm
1 | إضافة open قبل class في الصنف الأعلى | الكلمة المفتاحية open | يسمح للصنف بأن يُورَّث من أصناف أخرى
2 | إضافة open قبل كل fun/val يُراد تجاوزها لاحقاً | open fun / open val | يسمح تحديداً بتجاوز تلك الدالة أو الخاصية
3 | كتابة class Child(...) : Parent(...) | عامل : | يُنشئ العلاقة الوراثية ويُهيّئ مُنشِئ الأب بالقيم المناسبة
4 | كتابة override أمام كل دالة/خاصية يُراد تخصيصها | الكلمة المفتاحية override | يستبدل تنفيذ الأب بتنفيذ خاص في الصنف الفرعي
5 | استدعاء super.functionName() داخل التجاوز إن أردت إعادة استخدام منطق الأب | super | ينفّذ كود الأب أولاً قبل إضافة المنطق الخاص بالفرع
```

#### نقاط التنفيذ:
- بدون `open` في الأب، أي محاولة وراثة أو تجاوز تُسبب خطأ ترجمة فوراً
- يمكن للصنف الفرعي إضافة خصائص/دوال جديدة كلياً غير موجودة في الأب دون أي علاقة بالتجاوز

---

#### ⚙️ الخطوات / الخوارزمية: تفويض خاصية لصنف مفوَّض مخصص

#### ما هدف هذه العملية؟
> نقل منطق `get()`/`set()` المتكرر (مثل التحقق من نطاق قيمة) إلى صنف واحد قابل لإعادة الاستخدام عبر عدة خصائص.

```algorithm
1 | إنشاء صنف ينفّذ ReadWriteProperty<Any?, T> (أو ReadOnlyProperty للقراءة فقط) | interface من مكتبة kotlin.properties | يفرض تعريف getValue()/setValue() داخل الصنف
2 | تعريف getValue() لإرجاع القيمة المخزَّنة داخلياً | override fun getValue | يُستدعى تلقائياً كل مرة تُقرأ فيها الخاصية المفوَّضة
3 | تعريف setValue() مع منطق التحقق المطلوب | override fun setValue | يُستدعى تلقائياً كل مرة تُسند فيها قيمة جديدة
4 | ربط الخاصية بالمفوَّض عبر by ClassName(parameters) | الكلمة المفتاحية by | يستبدل get()/set() اليدويين بالكامل بمنطق الصنف المفوَّض
```

#### نقاط التنفيذ:
- يمكن استخدام نفس صنف المفوَّض (مثل `RangeRegulator`) لعدة خصائص مختلفة بمعاملات نطاق مختلفة لكل منها
- يتطلب استيراد `kotlin.properties.ReadWriteProperty` و`kotlin.reflect.KProperty`

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| خاصية بتحقق من نطاق | `var x = init \n set(value) { if (value in a..b) { field = value } }` | عندما تحتاج منع قيم غير منطقية لخاصية واحدة فقط |
| مُنشِئ ثانوي محوِّل | `constructor(...) : this(primary) { deviceStatus = when(code) {...} }` | تحويل بيانات خام من مصدر خارجي (`API`) لصيغة داخلية مناسبة |
| تجاوز مع إعادة استخدام | `override fun f() { super.f(); /* إضافة */ }` | عندما تريد سلوك الأب + إضافة خاصة بالفرع، لا استبداله كلياً |
| صنف مفوَّض قابل لإعادة الاستخدام | `class R(...) : ReadWriteProperty<Any?, T> { getValue/setValue }` | عندما يتكرر نفس منطق التحقق عبر أكثر من خاصية |
| دالة/خاصية توسيع | `fun Type.name(...) { ... }` أو `val Type.name: T get() = ...` | إضافة سلوك جديد لصنف موجود دون تعديل تعريفه الأصلي |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| الحاجة لعدة كائنات متشابهة البنية لكن بأنواع بيانات مختلفة | استخدام `Generics <T>` بدل تكرار الصنف لكل نوع | يحافظ على أمان الأنواع دون تكرار الكود |
| الحاجة لمجموعة قيم محدودة ومغلقة | استخدام `enum class` بدل `String` خام | يمنع الأخطاء الإملائية ويُكتشف الخطأ وقت الترجمة |
| صنف وظيفته الوحيدة حمل بيانات | استخدام `data class` | يولّد `toString`/`equals`/`copy` تلقائياً بلا كود إضافي |
| الحاجة لحالة فريدة واحدة في كامل البرنامج | استخدام `object` (أو `companion object` إن كانت منسوبة لصنف محدد) | يضمن نسخة واحدة فقط على مستوى اللغة نفسها |
| الحاجة لفرض سلوك مشترك على أصناف مختلفة البنية | استخدام `interface` بدل وراثة صنف واحد | يسمح لعدة أصناف غير مرتبطة وراثياً بالالتزام بنفس العقد |

### الأفكار الرئيسية الشاملة
> هذه المحاضرة تبني تدريجياً من "الصنف الأساسي" وصولاً إلى أدوات متقدمة، وكلها مترابطة عبر مبدأ واحد مشترك: **تقليل التكرار مع الحفاظ على الوضوح وأمان الأنواع**. الوراثة تمنع تكرار الخصائص/الدوال المشتركة بين أجهزة متشابهة. التفويض يمنع تكرار منطق التحقق عبر خصائص متعددة. الأنواع العامة تمنع تكرار بنية الصنف لكل نوع بيانات. `data class` تمنع كتابة دوال يدوية متكررة. الامتدادات تمنع الحاجة لتعديل كود لا تملكه. ودوال النطاق تقلل التكرار البصري لأسماء الكائنات الطويلة. فهم هذا الخيط المشترك يساعد على تذكّر متى تستخدم كل أداة دون حفظها بمعزل عن الأخرى.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25% (4 أسئلة) | سيناريو كود 35% (6 أسئلة) | تطبيق 40% (6 أسئلة).

### السؤال 1 (متوسط)
What is the main difference between a primary constructor and a secondary constructor in Kotlin?
أ) A primary constructor can have a body, while a secondary constructor cannot
ب) A primary constructor is part of the class header and has no body, while a secondary constructor has a body and must initialize the primary constructor
ج) A class can have multiple primary constructors but only one secondary constructor
د) A secondary constructor cannot accept any parameters
**الإجابة الصحيحة: ب**
**التعليل:** المُنشِئ الرئيسي جزء من ترويسة الصنف ولا يملك جسماً، بينما الثانوي له جسم ويجب أن يُهيّئ الرئيسي عبر `this(...)`. الخيار (أ) عكس الحقيقة تماماً. الخيار (ج) خاطئ لأن الصنف يملك مُنشِئاً رئيسياً واحداً فقط لكن يمكن أن يملك عدة مُنشِئات ثانوية. الخيار (د) خاطئ لأن المُنشِئ الثانوي يمكن أن يقبل وسائط بالتأكيد.

---

### السؤال 2 (متوسط)
Which keyword must be added to a class in Kotlin before it can be inherited by another class?
أ) `public`
ب) `extendable`
ج) `open`
د) `abstract`
**الإجابة الصحيحة: ج**
**التعليل:** كل الأصناف في `Kotlin` نهائية (`final`) افتراضياً، وكلمة `open` هي التي تُخبر المترجم بأن الصنف قابل للتوسيع. الخيار (أ) `public` يتعلق بالرؤية وليس بإمكانية الوراثة. الخيار (ب) ليست كلمة مفتاحية موجودة في اللغة. الخيار (د) `abstract` مرتبطة بالأصناف المجرّدة (خارج نطاق هذه المحاضرة) وليست الكلمة المطلوبة هنا.

---

### السؤال 3 (صعب)
```kotlin
open class SmartDevice(val name: String) {
    open fun turnOn() { println("Device on") }
}
class SmartLight(name: String) : SmartDevice(name) {
    override fun turnOn() {
        super.turnOn()
        println("Light on")
    }
}
fun main() {
    val d: SmartDevice = SmartLight("Lamp")
    d.turnOn()
}
```
What will this code print?
أ) `Device on`
ب) `Light on`
ج) `Device on` then `Light on`
د) لن يُترجم الكود بسبب خطأ
**الإجابة الصحيحة: ج**
**التعليل:** `super.turnOn()` يُنفَّذ أولاً فيطبع `Device on`، ثم يكمّل تنفيذ سطر `println("Light on")` بعده. الخيار (أ) يتجاهل باقي الدالة بعد `super`. الخيار (ب) يفترض خطأً أن `super.turnOn()` لا يُنفَّذ. الخيار (د) خاطئ لأن الكود صحيح تماماً من ناحية `open`/`override`.

---

### السؤال 4 (متوسط)
What does the `field` identifier refer to inside a custom `set()` function?
أ) اسم الخاصية نفسها كنص
ب) الحقل الخلفي (`backing field`) الذي يخزّن القيمة الفعلية للخاصية في الذاكرة
ج) قيمة المعامل `value` الممرَّر للدالة
د) الكائن الذي يملك الخاصية
**الإجابة الصحيحة: ب**
**التعليل:** `field` هو مرجع مباشر لمكان تخزين القيمة الفعلية في الذاكرة، ويُستخدم لتفادي استدعاء ذاتي لا نهائي. الخيار (أ) غير صحيح فـ`field` ليس نصاً. الخيار (ج) خاطئ لأن `value` هو المعامل الجديد المُدخَل، بينما `field` هو التخزين الفعلي القائم. الخيار (د) لا علاقة له بمفهوم `field`.

---

### السؤال 5 (صعب)
```kotlin
open class Animal {
    open val sound = "..."
}
class Cat : Animal() {
    override val sound = "Meow"
}
fun main() {
    val a: Animal = Cat()
    println(a.sound)
}
```
What is printed?
أ) `...`
ب) `Meow`
ج) خطأ ترجمة لأن `val` لا يمكن تجاوزه
د) لا شيء يُطبع
**الإجابة الصحيحة: ب**
**التعليل:** الخاصية `sound` مُعلَّمة `open` في `Animal` ومُجاوَزة في `Cat`، وبفضل تعدد الأشكال يُنفَّذ التجاوز الفعلي بغض النظر عن نوع المتغير المُعلَن (`Animal`). الخيار (أ) يتجاهل مفهوم التجاوز. الخيار (ج) خاطئ لأن `val` يمكن تجاوزها تماماً كـ`fun` طالما هي `open`. الخيار (د) لا مبرر له.

---

### السؤال 6 (متوسط)
Which visibility modifier allows a declaration to be accessed within the same module, but not from outside that module?
أ) `private`
ب) `protected`
ج) `internal`
د) `public`
**الإجابة الصحيحة: ج**
**التعليل:** `internal` تسمح بالوصول من أي مكان داخل نفس الوحدة (`module`) فقط. الخيار (أ) `private` أضيق بكثير (نفس الصنف/الملف فقط). الخيار (ب) `protected` تتعلق بالأصناف الفرعية وليس الوحدة. الخيار (د) `public` هي الأوسع وتسمح بالوصول من أي مكان حتى خارج الوحدة.

---

### السؤال 7 (متوسط)
Comparing IS-A and HAS-A relationships, which statement is correct?
أ) IS-A ينتج عن التركيب (composition)، وHAS-A ينتج عن الوراثة (inheritance)
ب) IS-A ينتج عن الوراثة، وHAS-A ينتج عن التركيب، ولا يمكن اعتبار الكائن نسخة من الصنف الذي يملكه فقط
ج) كلاهما ينتجان فقط عن الوراثة لكن بأشكال مختلفة
د) لا فرق عملياً بين IS-A وHAS-A في Kotlin
**الإجابة الصحيحة: ب**
**التعليل:** `IS-A` تنتج عن الوراثة (`class Child : Parent`)، بينما `HAS-A` تنتج عن التركيب (خاصية من نوع صنف آخر). الخيار (أ) عكس الحقيقة تماماً. الخيار (ج) خاطئ لأن `HAS-A` لا تستخدم الوراثة إطلاقاً. الخيار (د) خاطئ لأن الفرق جوهري كما شُرح في القسم 1.10.

---

### السؤال 8 (صعب)
```kotlin
class RangeRegulator(
    initialValue: Int,
    private val minValue: Int,
    private val maxValue: Int
) : ReadWriteProperty<Any?, Int> {
    var fieldData = initialValue
    override fun getValue(thisRef: Any?, property: KProperty<*>) = fieldData
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in minValue..maxValue) { fieldData = value }
    }
}
class Speaker { var volume by RangeRegulator(5, 0, 10) }
fun main() {
    val s = Speaker()
    s.volume = 15
    println(s.volume)
}
```
What is printed?
أ) `15`
ب) `5`
ج) `10`
د) خطأ وقت التشغيل (Exception)
**الإجابة الصحيحة: ب**
**التعليل:** القيمة `15` تقع خارج النطاق `0..10`، لذا يتجاهل `setValue()` الإسناد بصمت ويبقى `fieldData` بقيمته الابتدائية `5`. الخيار (أ) يفترض خطأً أن أي قيمة تُقبل. الخيار (ج) يفترض خطأً وجود "قص" (`clamping`) للقيمة عند الحد الأقصى، وهذا غير موجود في الكود. الخيار (د) خاطئ لأن الكود لا يرمي أي استثناء، بل يتجاهل القيمة بصمت فقط.

---

### السؤال 9 (متوسط)
What is the primary purpose of using an `enum class` instead of a plain `String` for a property like `difficulty`?
أ) لتحسين سرعة تنفيذ البرنامج فقط
ب) لتقييد القيم الممكنة لمجموعة محددة مسبقاً، فيكتشف المترجم أي قيمة غير صالحة وقت الترجمة
ج) لأن `String` غير مدعومة كنوع لخاصية في `Kotlin`
د) لتمكين استخدام الأنواع العامة `Generics` فقط
**الإجابة الصحيحة: ب**
**التعليل:** `enum class` يحصر القيم الممكنة في مجموعة مغلقة فيمنع الأخطاء الإملائية ويكتشفها المترجم مباشرة. الخيار (أ) ليس السبب الأساسي المذكور في المحاضرة. الخيار (ج) خاطئ تماماً فـ`String` نوع أساسي مدعوم بالكامل. الخيار (د) لا علاقة مباشرة بين `enum class` واستخدام `Generics`.

---

### السؤال 10 (صعب)
```kotlin
data class Point(val x: Int, val y: Int)
fun main() {
    val p1 = Point(1, 2)
    val p2 = Point(1, 2)
    println(p1 == p2)
}
```
What is printed, and why?
أ) `false`، لأن `p1` و`p2` كائنان مختلفان في الذاكرة
ب) `true`، لأن `data class` تولّد `equals()` تلقائياً بناءً على قيم الخصائص وليس مرجع الذاكرة
ج) خطأ ترجمة لأن `==` لا يعمل على الأصناف
د) `true` لكن فقط لأن `x` و`y` من نوع `Int`
**الإجابة الصحيحة: ب**
**التعليل:** `data class` تولّد `equals()` تلقائياً يقارن قيم كل الخصائص، فتُعتبر `p1` و`p2` متساويين رغم كونهما كائنين منفصلين في الذاكرة. الخيار (أ) يصف سلوك المقارنة الافتراضية بمرجع الذاكرة في صنف عادي (بدون `data`)، وهذا ليس الحال هنا. الخيار (ج) خاطئ لأن `==` يعمل ويستدعي `equals()`. الخيار (د) غير دقيق لأن السبب هو `data class` وليس نوع الخصائص تحديداً.

---

### السؤال 11 (متوسط)
Which of the following correctly declares a companion object named `Factory` inside a class `Car`?
أ) `object Factory { }` خارج الصنف `Car`
ب) `companion object Factory { }` داخل جسم الصنف `Car`
ج) `static object Factory { }` داخل جسم الصنف `Car`
د) `Car.companion.Factory { }`
**الإجابة الصحيحة: ب**
**التعليل:** الصياغة الصحيحة هي إضافة `companion` قبل `object` واسمه، مكتوبة داخل جسم الصنف الحاوي. الخيار (أ) يصف كائناً مفرداً مستقلاً وليس مرافقاً. الخيار (ج) `static` ليست كلمة مفتاحية في `Kotlin` لهذا الغرض. الخيار (د) صياغة غير موجودة في اللغة إطلاقاً.

---

### السؤال 12 (متوسط)
What is required for a class to use an extension function defined as `fun String.shout(): String`?
أ) يجب أن يرث الصنف من `String`
ب) لا شيء إضافي — يمكن استدعاؤها مباشرة على أي كائن `String` بصيغة النقطة كأنها دالة عضو أصلية
ج) يجب إعادة تعريف `String` بالكامل لدعم الامتداد
د) دوال التوسيع تعمل فقط داخل نفس الملف الذي عُرِّف فيه الصنف الأصلي
**الإجابة الصحيحة: ب**
**التعليل:** دوال التوسيع تُستدعى مباشرة عبر صيغة `الكائن.الدالة()` دون أي خطوة إضافية أو وراثة. الخيار (أ) غير منطقي فالتوسيع لا يتطلب وراثة. الخيار (ج) يناقض الفكرة الأساسية للتوسيع (إضافة سلوك دون تعديل الأصل). الخيار (د) خاطئ لأن دوال التوسيع متاحة من أي ملف يستوردها.

---

### السؤال 13 (صعب)
```kotlin
interface Shape { fun area(): Double }
class Square(val side: Double) : Shape {
    override fun area() = side * side
}
fun main() {
    val s: Shape = Square(4.0)
    println(s.area())
}
```
What is printed?
أ) `4.0`
ب) `16.0`
ج) خطأ ترجمة لأن `Shape` لا يمكن استخدامه كنوع متغير
د) خطأ ترجمة لأن `Square` لم يُنفِّذ `Shape` بشكل صحيح
**الإجابة الصحيحة: ب**
**التعليل:** `Square` ينفّذ `Shape` بشكل صحيح ويقدّم تنفيذاً فعلياً لـ`area()` يساوي `side * side = 4.0 * 4.0 = 16.0`. الخيار (أ) حساب خاطئ. الخيار (ج) خاطئ لأن الواجهات يمكن استخدامها كنوع للمتغيرات تماماً كالأصناف. الخيار (د) خاطئ لأن `Square` نفّذ كل ما تتطلبه الواجهة (دالة `area()` واحدة فقط).

---

### السؤال 14 (متوسط)
What does the `it` identifier refer to inside a `let()` block such as `question1.let { println(it.answer) }`?
أ) الكائن `question1` نفسه
ب) خاصية عشوائية من الكائن
ج) دالة مجهولة الاسم
د) القيمة التي تُعيدها `println()`
**الإجابة الصحيحة: أ**
**التعليل:** `it` هو الاسم الافتراضي الذي يشير لنفس الكائن الذي استُدعيت عليه `let()`، هنا `question1` تحديداً. الخيار (ب) و(ج) و(د) كلها تصورات خاطئة عن آلية عمل `it` كما شُرح في القسم 2.8.

---

### السؤال 15 (متوسط)
What is the key difference between `let()` and `apply()` as scope functions?
أ) `let()` تُعيد نفس الكائن الأصلي دائماً، بينما `apply()` تُعيد نتيجة آخر تعبير
ب) `apply()` تُعيد نفس الكائن الأصلي دائماً، بينما `let()` تُعيد نتيجة آخر تعبير داخل الكتلة
ج) لا فرق بينهما إطلاقاً ويمكن استبدال إحداهما بالأخرى دوماً
د) `let()` لا تعمل إلا مع الكائنات القابلة لأخذ قيمة `null`
**الإجابة الصحيحة: ب**
**التعليل:** `apply()` مصمَّمة للتهيئة وتُعيد الكائن الأصلي نفسه دوماً لتمكين التسلسل، بينما `let()` تُعيد قيمة آخر سطر داخل كتلتها. الخيار (أ) عكس الحقيقة تماماً. الخيار (ج) خاطئ لأن اختلاف القيمة المُعادة يجعل استبدالهما غير آمن في كل الحالات. الخيار (د) خاطئ فـ`let()` قابلة للاستخدام على أي كائن.

---

### السؤال 16 (صعب)
```kotlin
open class Base(protected open var status: String = "off") {
    open fun activate() { status = "on" }
}
class Sub(status: String) : Base(status) {
    override fun activate() {
        super.activate()
        status = "on-sub"
    }
}
fun main() {
    val obj = Sub("off")
    obj.activate()
    println(obj.status)
}
```
Assuming `status` is accessible from `main()` here, what would be printed?
أ) `off`
ب) `on`
ج) `on-sub`
د) خطأ ترجمة لأن `status` معدَّلة `protected` ولا يمكن الوصول إليها من `main()`
**الإجابة الصحيحة: د**
**التعليل:** `protected` تسمح بالوصول فقط من داخل الصنف نفسه أو الأصناف الفرعية، وليس من دالة `main()` الخارجية — لذا فإن `println(obj.status)` سيسبب خطأ ترجمة فعلياً. هذا سؤال يختبر فهم حدود `protected` بدقة وليس فقط تتبع منطق `super`. الخيارات (أ)، (ب)، (ج) تفترض جميعها خطأً أن الوصول من `main()` مسموح، متجاهلة قيد الرؤية `protected`.

---

## الجزء الرابع: أسئلة تصحيح الكود

> **6 أسئلة** — أنواع: `syntax`، `logic`، `return_check`، `dead_code`، `misconception`.

### Debug Question 1 (syntax)

**The following code contains a bug:**
```kotlin
class SmartDevice(name: String, category: String) {
    var deviceStatus = "online"
}

class SmartTvDevice(deviceName: String, deviceCategory: String)
    SmartDevice(name = deviceName, category = deviceCategory) {
    fun turnOn() { println("TV on") }
}
```
**Find the bug:** Missing the colon (`:`) between the subclass header and the superclass constructor call, which is required to establish the inheritance relationship.

**Fixed code:**
```kotlin
class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    fun turnOn() { println("TV on") }
}
```
**شرح الحل:**
1. صياغة إنشاء صنف فرعي تتطلب دائماً نقطتين رأسيتين `:` بين ترويسة الصنف الفرعي واسم الصنف الأعلى، وإلا يفشل المترجم في التعرف على نية الوراثة.
2. كما أضفنا `val` أمام `name`/`category` في `SmartDevice` لتصبح خصائص فعلية يمكن الوصول إليها لاحقاً عبر `smartTvDevice.name` مثلاً — وإلا تبقى وسائط مُنشِئ عادية غير متاحة كخصائص.

---

### Debug Question 2 (logic)

**The following code contains a bug:**
```kotlin
open class SmartDevice(val name: String) {
    var deviceStatus = "online"
    open fun turnOn() {
        deviceStatus = "on"
    }
}
class SmartLight(name: String) : SmartDevice(name) {
    var brightnessLevel = 0
    override fun turnOn() {
        brightnessLevel = 2
        println("$name turned on. Brightness is $brightnessLevel")
    }
}
```
**Find the bug:** The overridden `turnOn()` in `SmartLight` never calls `super.turnOn()`, so `deviceStatus` is never updated to `"on"` — it silently stays `"online"` forever, which is a logic error if other code depends on `deviceStatus`.

**Fixed code:**
```kotlin
open class SmartDevice(val name: String) {
    var deviceStatus = "online"
    open fun turnOn() {
        deviceStatus = "on"
    }
}
class SmartLight(name: String) : SmartDevice(name) {
    var brightnessLevel = 0
    override fun turnOn() {
        super.turnOn()
        brightnessLevel = 2
        println("$name turned on. Brightness is $brightnessLevel")
    }
}
```
**شرح الحل:**
1. عند التجاوز (`override`)، إذا كان منطق الأب لا يزال مطلوباً (هنا تحديث `deviceStatus`)، يجب استدعاؤه صراحة عبر `super.turnOn()` — التجاوز لا يستدعي منطق الأب تلقائياً أبداً.
2. هذا خطأ منطقي (`logic`) لأن الكود يُترجم وينفَّذ بلا أي رسالة خطأ ظاهرة، لكنه ينتج حالة داخلية غير متسقة قد تسبب أخطاءً لاحقاً في أجزاء أخرى تعتمد على `deviceStatus`.

---

### Debug Question 3 (misconception)

**The following code contains a bug:**
```kotlin
var speakerVolume = 2
    set(value) {
        if (value in 0..100) {
            speakerVolume = value
        }
    }
```
**Find the bug:** Inside a custom `set()` function, assigning to the property's own name (`speakerVolume = value`) instead of `field = value` causes infinite recursion — the compiler treats it as calling `set()` again, leading to a `StackOverflowError` at runtime.

**Fixed code:**
```kotlin
var speakerVolume = 2
    set(value) {
        if (value in 0..100) {
            field = value
        }
    }
```
**شرح الحل:**
1. هذا سوء فهم شائع (`misconception`): الطلاب يعتقدون أن اسم الخاصية داخل `set()` يشير لمكان التخزين، بينما يشير فعلياً لدالة `set()` نفسها فيسبب استدعاءً ذاتياً لا نهائياً.
2. الحل الصحيح هو استخدام المعرِّف الخاص `field` الذي يشير مباشرة للحقل الخلفي في الذاكرة، متجاوزاً `set()` تماماً.

---

### Debug Question 4 (return_check)

**The following code contains a bug:**
```kotlin
class RangeRegulator(
    initialValue: Int,
    private val minValue: Int,
    private val maxValue: Int
) : ReadWriteProperty<Any?, Int> {
    var fieldData = initialValue
    override fun getValue(thisRef: Any?, property: KProperty<*>): Int {
        // missing return statement
    }
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in minValue..maxValue) { fieldData = value }
    }
}
```
**Find the bug:** `getValue()` is declared to return `Int` but its body is empty — it never returns `fieldData`, so the code will not compile at all (a function with a non-`Unit` return type must return a value on every path).

**Fixed code:**
```kotlin
class RangeRegulator(
    initialValue: Int,
    private val minValue: Int,
    private val maxValue: Int
) : ReadWriteProperty<Any?, Int> {
    var fieldData = initialValue
    override fun getValue(thisRef: Any?, property: KProperty<*>): Int {
        return fieldData
    }
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in minValue..maxValue) { fieldData = value }
    }
}
```
**شرح الحل:**
1. أي دالة توقيعها يعيد نوعاً محدداً (هنا `Int`) يجب أن تحتوي `return` فعلياً يعيد قيمة من ذلك النوع؛ نسيان `return` يسبب خطأ ترجمة مباشرة وليس مجرد سلوك خاطئ وقت التشغيل.
2. الإصلاح بسيط: إضافة `return fieldData` لإعادة القيمة المخزَّنة فعلياً في الحقل الداخلي.

---

### Debug Question 5 (dead_code)

**The following code contains a bug:**
```kotlin
open class SmartDevice(val name: String) {
    open fun turnOn() {
        println("Generic device on")
        return
        println("This device is: $name")
    }
}
```
**Find the bug:** The `println("This device is: $name")` line appears after an unconditional `return` statement, making it unreachable (dead code) — it will never execute, and the Kotlin compiler will actually flag this as an error/warning.

**Fixed code:**
```kotlin
open class SmartDevice(val name: String) {
    open fun turnOn() {
        println("Generic device on")
        println("This device is: $name")
    }
}
```
**شرح الحل:**
1. أي سطر مكتوب بعد `return` غير مشروط مباشرة داخل نفس الكتلة يصبح كوداً ميتاً (`dead code`) لا يُنفَّذ إطلاقاً، لأن `return` ينهي تنفيذ الدالة فوراً.
2. الحل هو إزالة `return` غير الضرورية إن أردنا تنفيذ السطرين معاً، أو إعادة ترتيب المنطق إذا كان القصد فعلاً إنهاء الدالة مبكراً في حالة معينة.

---

### Debug Question 6 (syntax)

**The following code contains a bug:**
```kotlin
class Question<T>(
    val questionText: String,
    val answer: T
)
fun main() {
    val q1 = Question("Capital of France?", "Paris")
    val q2: Question<Int> = Question("2+2=?", "4")
}
```
**Find the bug:** In `q2`, the answer `"4"` is a `String` literal (in quotes), but the variable is explicitly typed as `Question<Int>`, causing a type mismatch compilation error since the generic type `T` is being resolved as `Int` while a `String` is passed.

**Fixed code:**
```kotlin
class Question<T>(
    val questionText: String,
    val answer: T
)
fun main() {
    val q1 = Question("Capital of France?", "Paris")
    val q2: Question<Int> = Question("2+2=?", 4)
}
```
**شرح الحل:**
1. عندما تحدد النوع العام صراحة (`Question<Int>`)، يجب أن تتطابق كل الوسائط المرتبطة بذلك النوع النائب `T` مع النوع المحدد فعلياً — هنا `Int` وليس `String`.
2. الإصلاح هو إزالة علامتَي التنصيص وتمرير `4` كعدد صحيح فعلي بدل `"4"` كنص.

---

## تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية. العدد: 6. الأنواع: `fill_gaps`، `code_fix`، `scenario`.

### Exercise 1 (fill_gaps): Complete the Class Definition

**Scenario / Task:**
Complete the missing parts (marked `_______`) so that `SmartFan` inherits from `SmartDevice`, adds a `speed` property restricted to `0..5`, and overrides `turnOn()`.

```kotlin
open class SmartDevice(val name: String) {
    var deviceStatus = "online"
    open fun turnOn() { deviceStatus = "on" }
}

class SmartFan(name: String) : _______(name) {
    var speed = 0
        set(value) {
            if (_______) { field = value }
        }
    _______ fun turnOn() {
        _______.turnOn()
        speed = 1
        println("$name fan on at speed $speed")
    }
}
```

**Requirements:**
1. Fill each `_______` with the correct keyword or expression.

**نموذج الحل:**
```kotlin
class SmartFan(name: String) : SmartDevice(name) {
    var speed = 0
        set(value) {
            if (value in 0..5) { field = value }
        }
    override fun turnOn() {
        super.turnOn()
        speed = 1
        println("$name fan on at speed $speed")
    }
}
```
الفراغ الأول `SmartDevice` لأنه اسم الصنف الأعلى الذي نرثه. الفراغ الثاني `value in 0..5` لتقييد النطاق المطلوب. الفراغ الثالث `override` للتصريح بأننا نجاوز دالة موجودة في الأب. الفراغ الرابع `super` لاستدعاء منطق الأب أولاً.

---

### Exercise 2 (code_fix): Fix the Property Delegate

**Scenario / Task:**
The following delegate class doesn't compile because it's missing the interface implementation clause. Fix it.

```kotlin
class Percentage(initialValue: Int) {
    var fieldData = initialValue
    fun getValue(thisRef: Any?, property: KProperty<*>): Int = fieldData
    fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in 0..100) { fieldData = value }
    }
}
class Progress { var percent by Percentage(0) }
```

**Requirements:**
1. Identify what's missing and correct the code.

**نموذج الحل:**
```kotlin
class Percentage(initialValue: Int) : ReadWriteProperty<Any?, Int> {
    var fieldData = initialValue
    override fun getValue(thisRef: Any?, property: KProperty<*>): Int = fieldData
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in 0..100) { fieldData = value }
    }
}
class Progress { var percent by Percentage(0) }
```
الخلل أن `Percentage` لم يُصرَّح بأنه ينفّذ `ReadWriteProperty<Any?, Int>`، وبالتالي `by` لن يقبله كمفوَّض صالح، ولا تحتاج `getValue`/`setValue` لكلمة `override` بدونها. الإصلاح إضافة `: ReadWriteProperty<Any?, Int>` بعد ترويسة الصنف وإضافة `override` أمام الدالتين.

---

### Exercise 3 (scenario): Design a Vehicle Hierarchy

**Scenario / Task:**
A ride-sharing app needs a class hierarchy: an open `Vehicle` superclass with `plateNumber` (val) and an `open fun startTrip()`, and two subclasses `Car` and `Bike`, each overriding `startTrip()` with a message specific to the vehicle type, calling `super.startTrip()` first.

**Requirements:**
1. Write the full Kotlin code for `Vehicle`, `Car`, and `Bike`.

**نموذج الحل:**
```kotlin
open class Vehicle(val plateNumber: String) {
    open fun startTrip() {
        println("Trip started for vehicle $plateNumber")
    }
}
class Car(plateNumber: String) : Vehicle(plateNumber) {
    override fun startTrip() {
        super.startTrip()
        println("Car ready — please fasten your seatbelt.")
    }
}
class Bike(plateNumber: String) : Vehicle(plateNumber) {
    override fun startTrip() {
        super.startTrip()
        println("Bike ready — please wear your helmet.")
    }
}
```
كل صنف فرعي يرث `plateNumber` والدالة العامة، ثم يضيف رسالة خاصة به بعد استدعاء `super.startTrip()`، بنفس النمط المشروح في القسم 1.12.

---

### Exercise 4 (fill_gaps): Complete the Generic Data Class

**Scenario / Task:**
Complete the code to build a generic `data class Pair2<A, B>` holding two values of possibly different types, then create an instance holding a `String` and a `Boolean`.

```kotlin
_______ class Pair2<A, B>(
    val first: A,
    val second: _______
)
fun main() {
    val p = Pair2<String, _______>("Kotlin", true)
    println(p)
}
```

**Requirements:**
1. Fill each `_______`.

**نموذج الحل:**
```kotlin
data class Pair2<A, B>(
    val first: A,
    val second: B
)
fun main() {
    val p = Pair2<String, Boolean>("Kotlin", true)
    println(p)
}
```
الفراغ الأول `data` لتوليد `toString()` تلقائياً. الفراغ الثاني `B` لأن `second` من النوع النائب الثاني، مختلف عن `first`. الفراغ الثالث `Boolean` لأن القيمة الفعلية الممرَّرة `true` من هذا النوع.

---

### Exercise 5 (code_fix): Fix the Companion Object Access

**Scenario / Task:**
The following code fails to compile. Find and fix the incorrect access to the companion object.

```kotlin
class Config {
    companion object Settings {
        var appName: String = "MyApp"
    }
}
fun main() {
    println(Settings.appName)
}
```

**Requirements:**
1. Correct the access expression in `main()`.

**نموذج الحل:**
```kotlin
class Config {
    companion object Settings {
        var appName: String = "MyApp"
    }
}
fun main() {
    println(Config.appName)
}
```
الوصول للكائن المرافق من خارج الصنف يتم دائماً عبر **اسم الصنف الحاوي** (`Config`) وليس اسم الكائن المرافق نفسه (`Settings`)، حتى وإن كان له اسم صريح — هذا مطابق تماماً لما شُرح في القسم 2.5.

---

### Exercise 6 (scenario): Extension Function for Validation

**Scenario / Task:**
Write an extension function `isValidEmail()` on the `String` type that returns `true` if the string contains exactly one `@` character, and demonstrate calling it.

**Requirements:**
1. Write the extension function and a `main()` that tests it on two example strings.

**نموذج الحل:**
```kotlin
fun String.isValidEmail(): Boolean {
    return this.count { it == '@' } == 1
}
fun main() {
    println("user@example.com".isValidEmail())
    println("invalid-email".isValidEmail())
}
```
دالة التوسيع `String.isValidEmail()` تُستدعى مباشرة على أي كائن `String` بصيغة النقطة، بنفس النمط المشروح في القسم 2.6، لكن هنا مطبَّقة على `String` القياسي بدل صنف مخصص.

---

## تمارين تتبع التنفيذ

> **3 تمارين تتبع.** كل تمرين: مدخل + جدول ناقص للطالب + نموذج الحل.

### Trace Exercise 1: Polymorphism and super

**Input:**
```kotlin
open class SmartDevice(val name: String) {
    var deviceStatus = "online"
    open fun turnOn() { deviceStatus = "on" }
}
class SmartTvDevice(name: String) : SmartDevice(name) {
    override fun turnOn() {
        super.turnOn()
        println("$name: status=$deviceStatus")
    }
}
class SmartLightDevice(name: String) : SmartDevice(name) {
    override fun turnOn() {
        super.turnOn()
        println("$name: status=$deviceStatus, brightness=2")
    }
}
fun main() {
    var device: SmartDevice = SmartTvDevice("TV1")
    device.turnOn()
    device = SmartLightDevice("Lamp1")
    device.turnOn()
}
```

**Trace step by step (complete the table):**
| الخطوة | الاستدعاء | الدالة المنفَّذة فعلياً | الحالة الناتجة (deviceStatus) |
| --- | --- | --- | --- |
| 1 | `device = SmartTvDevice("TV1")` | — | ؟ |
| 2 | `device.turnOn()` | ؟ | ؟ |
| 3 | `device = SmartLightDevice("Lamp1")` | — | ؟ |
| 4 | `device.turnOn()` | ؟ | ؟ |

**نموذج الحل:**
| الخطوة | الاستدعاء | الدالة المنفَّذة فعلياً | الحالة الناتجة (deviceStatus) |
| --- | --- | --- | --- |
| 1 | `device = SmartTvDevice("TV1")` | — | `online` (لم يُستدعَ `turnOn()` بعد) |
| 2 | `device.turnOn()` | `SmartTvDevice.turnOn()` (يستدعي `super.turnOn()` أولاً) | `on`؛ يُطبع `TV1: status=on` |
| 3 | `device = SmartLightDevice("Lamp1")` | — | `online` (كائن جديد تماماً) |
| 4 | `device.turnOn()` | `SmartLightDevice.turnOn()` (يستدعي `super.turnOn()` أولاً) | `on`؛ يُطبع `Lamp1: status=on, brightness=2` |

**Result:**
```
TV1: status=on
Lamp1: status=on, brightness=2
```

---

### Trace Exercise 2: Property Delegate with Range Validation

**Input:**
```kotlin
class RangeRegulator(
    initialValue: Int,
    private val minValue: Int,
    private val maxValue: Int
) : ReadWriteProperty<Any?, Int> {
    var fieldData = initialValue
    override fun getValue(thisRef: Any?, property: KProperty<*>) = fieldData
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in minValue..maxValue) { fieldData = value }
    }
}
class Fan { var speed by RangeRegulator(0, 0, 3) }
fun main() {
    val fan = Fan()
    fan.speed = 2
    fan.speed = 10
    fan.speed = -1
    println(fan.speed)
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | القيمة المُرسلة | fieldData بعد العملية |
| --- | --- | --- | --- |
| 1 | `fan.speed = 2` | 2 | ؟ |
| 2 | `fan.speed = 10` | 10 | ؟ |
| 3 | `fan.speed = -1` | -1 | ؟ |
| 4 | `println(fan.speed)` | — | ؟ |

**نموذج الحل:**
| الخطوة | العملية | القيمة المُرسلة | fieldData بعد العملية |
| --- | --- | --- | --- |
| 1 | `fan.speed = 2` | 2 | `2` (ضمن النطاق 0..3، تُقبل) |
| 2 | `fan.speed = 10` | 10 | `2` (خارج النطاق، تُرفض وتبقى القيمة السابقة) |
| 3 | `fan.speed = -1` | -1 | `2` (خارج النطاق أيضاً، تُرفض) |
| 4 | `println(fan.speed)` | — | يطبع `2` (آخر قيمة صالحة قُبلت فعلياً) |

**Result:**
```
2
```

---

### Trace Exercise 3: Scope Function apply()

**Input:**
```kotlin
class Counter {
    var count = 0
    fun increment() { count++ }
    fun printCount() { println("Count = $count") }
}
fun main() {
    val c = Counter().apply {
        increment()
        increment()
        increment()
    }
    c.printCount()
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | count بعدها |
| --- | --- | --- |
| 1 | `Counter()` (إنشاء الكائن) | ؟ |
| 2 | داخل `apply { }`: أول `increment()` | ؟ |
| 3 | ثاني `increment()` | ؟ |
| 4 | ثالث `increment()` | ؟ |
| 5 | `c.printCount()` | ؟ (الناتج المطبوع) |

**نموذج الحل:**
| الخطوة | العملية | count بعدها |
| --- | --- | --- |
| 1 | `Counter()` (إنشاء الكائن) | `0` (القيمة الابتدائية) |
| 2 | داخل `apply { }`: أول `increment()` | `1` |
| 3 | ثاني `increment()` | `2` |
| 4 | ثالث `increment()` | `3` |
| 5 | `c.printCount()` | يطبع `Count = 3`؛ و`apply()` أعادت الكائن نفسه فخُزِّن في `c` بعد اكتمال التهيئة |

**Result:**
```
Count = 3
```

---

## أسئلة تصميم

> **2 أسئلة تصميم.** أنواع: `uml_design`، `architecture`.

### Design Question 1: Class Diagram for a Library System (uml_design)

**Task:**
Design a small class hierarchy for a library system: an open superclass `LibraryItem` with `title` (val) and `isAvailable` (var), and two subclasses `Book` (adds `author`) and `DVD` (adds `durationMinutes`). Draw the relationship as a class diagram, and show which properties/methods each subclass inherits versus adds.

**نموذج الإجابة:**

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | LibraryItem | class | الصنف الأعلى (`open`) — يحمل `title`, `isAvailable` |
| 2 | Book | class | صنف فرعي يضيف `author` |
| 3 | DVD | class | صنف فرعي يضيف `durationMinutes` |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Book | LibraryItem | Inherits (IS-A) | سهم مصمت للأعلى | Book هو نوع من LibraryItem |
| DVD | LibraryItem | Inherits (IS-A) | سهم مصمت للأعلى | DVD هو نوع من LibraryItem |

```diagram
type: class
title: Library System Class Diagram
direction: TD
nodes:
  - id: library_item
    label: LibraryItem (title, isAvailable)
    kind: class
    level: 0
  - id: book
    label: Book (+ author)
    kind: class
    level: 1
  - id: dvd
    label: DVD (+ durationMinutes)
    kind: class
    level: 1
edges:
  - from: book
    to: library_item
  - from: dvd
    to: library_item
```

```kotlin
open class LibraryItem(val title: String, var isAvailable: Boolean = true)
class Book(title: String, val author: String) : LibraryItem(title)
class DVD(title: String, val durationMinutes: Int) : LibraryItem(title)
```

**معايير التقييم:**
- استخدام `open` بشكل صحيح على الصنف الأعلى
- كل صنف فرعي يستدعي مُنشِئ الأب بشكل صحيح عبر `:`
- تمييز واضح بين الخصائص الموروثة والخصائص الجديدة الخاصة بكل فرع

---

### Design Question 2: Architecture for a Notification Delegate System (architecture)

**Task:**
Design a small architecture using property delegates and an interface: a `Notifiable` interface with a `notify(message: String)` function, implemented by a `NotificationCenter` class that also uses a delegated property `unreadCount` (an `Int` restricted between 0 and 99, reusing `RangeRegulator` from this lecture). Describe how the pieces connect.

**نموذج الإجابة:**

```kotlin
interface Notifiable {
    fun notify(message: String)
}

class NotificationCenter : Notifiable {
    var unreadCount by RangeRegulator(initialValue = 0, minValue = 0, maxValue = 99)

    override fun notify(message: String) {
        unreadCount++
        println("[$unreadCount] $message")
    }
}
```

**وصف البنية:**
- `Notifiable` (واجهة) تفرض عقداً واحداً: أي صنف يريد إرسال إشعارات يجب أن يمتلك `notify()`.
- `NotificationCenter` ينفّذ `Notifiable` ويقدّم التنفيذ الفعلي.
- الخاصية `unreadCount` تُفوَّض لصنف `RangeRegulator` (من القسم 1.16) لضمان بقاء العدّاد ضمن نطاق منطقي (0 حتى 99) دون تكرار منطق التحقق يدوياً.

**معايير التقييم:**
- تنفيذ صحيح للواجهة عبر `override`
- استخدام صحيح لـ`by` مع صنف مفوَّض موجود مسبقاً بدل إعادة كتابة منطق التحقق
- شرح واضح للعلاقة بين الواجهة (العقد) والتفويض (إعادة استخدام منطق) كأداتين منفصلتين تعملان معاً

---

## بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the difference between a class and an object in Kotlin?
A: A class is a blueprint defining properties and methods; an object is an actual instance created from that class using its constructor.

**Q2:** Why does Kotlin make all classes `final` by default?
A: To prevent accidental, unintended inheritance; developers must explicitly opt in using the `open` keyword.

**Q3:** What is a backing field, and what identifier is used to reference it?
A: A backing field is the compiler-generated storage location for a property's value, referenced using the `field` identifier inside `get()`/`set()`.

**Q4:** What must every secondary constructor do if the class has a primary constructor?
A: It must initialize the primary constructor using `: this(...)` before executing its own body.

**Q5:** What is the difference between an IS-A relationship and a HAS-A relationship?
A: IS-A comes from inheritance (a subclass is a type of its superclass); HAS-A comes from composition (a class owns an instance of another class as a property).

**Q6:** What keyword lets a subclass call the superclass's version of an overridden method?
A: The `super` keyword.

**Q7:** Which visibility modifier restricts access to the same class or source file only?
A: `private`.

**Q8:** What are the two interfaces used to build a property delegate for `var` and `val` respectively?
A: `ReadWriteProperty` for `var` properties, and `ReadOnlyProperty` for `val` properties.

**Q9:** What is the purpose of a generic type parameter like `<T>` in a class definition?
A: It lets the class work with an unknown placeholder data type, avoiding duplicating the class for every possible data type.

**Q10:** Why use an `enum class` instead of a plain `String` for a limited set of values?
A: An `enum class` restricts values to a fixed, predefined set, letting the compiler catch invalid values at compile time.

**Q11:** What methods does the Kotlin compiler automatically implement for a `data class`?
A: `equals()`, `hashCode()`, `toString()`, `componentN()` functions, and `copy()`.

**Q12:** How do you access a companion object's properties from outside its containing class?
A: Through the containing class's name directly, e.g., `Quiz.answered`, not through the companion object's own name.

**Q13:** What is the main difference between using inheritance and using an interface to share behavior?
A: Inheritance transfers actual implemented code from a single superclass; an interface only defines a contract (method/property signatures) that each implementing class must provide its own implementation for.

**Q14:** In a `let()` block like `obj.let { it.doSomething() }`, what does `it` refer to?
A: It refers to the object the `let()` function was called on (`obj` in this example).

**Q15:** What does `apply()` return, and why is that useful?
A: `apply()` always returns the original object it was called on, which is useful for chaining initialization logic right after object creation.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> شُرحت أجزاء هذين البرنامجين على دفعات متفرقة عبر أقسام الشرح التفصيلي أعلاه (القسم 1 والقسم 2). فيما يلي النسخة النهائية المجمَّعة لكل برنامج كمرجع واحد شامل بلا شرح إضافي.

### مرجع 1: نظام المنزل الذكي (SmartDevice, SmartTvDevice, SmartLightDevice, SmartHome)

```kotlin
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

class RangeRegulator(
    initialValue: Int,
    private val minValue: Int,
    private val maxValue: Int
) : ReadWriteProperty<Any?, Int> {
    var fieldData = initialValue

    override fun getValue(thisRef: Any?, property: KProperty<*>): Int {
        return fieldData
    }
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in minValue..maxValue) {
            fieldData = value
        }
    }
}

open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
        protected set
    open val deviceType = "unknown"

    constructor(name: String, category: String, statusCode: Int) : this(name, category) {
        deviceStatus = when (statusCode) {
            0 -> "offline"
            1 -> "online"
            else -> "unknown"
        }
    }

    open fun turnOn() {
        deviceStatus = "on"
    }
    open fun turnOff() {
        deviceStatus = "off"
    }
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {

    override val deviceType = "Smart TV"

    private var speakerVolume by RangeRegulator(initialValue = 2, minValue = 0, maxValue = 100)
    private var channelNumber by RangeRegulator(initialValue = 1, minValue = 0, maxValue = 200)

    fun increaseSpeakerVolume() {
        speakerVolume++
        println("Speaker volume increased to $speakerVolume.")
    }
    fun nextChannel() {
        channelNumber++
        println("Channel number increased to $channelNumber.")
    }

    override fun turnOn() {
        super.turnOn()
        println(
            "$name is turned on. Speaker volume is set to $speakerVolume and channel number is " +
                "set to $channelNumber."
        )
    }
    override fun turnOff() {
        super.turnOff()
        println("$name turned off")
    }
}

class SmartLightDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {

    override val deviceType = "Smart Light"

    private var brightnessLevel by RangeRegulator(initialValue = 0, minValue = 0, maxValue = 100)

    fun increaseBrightness() {
        brightnessLevel++
        println("Brightness increased to $brightnessLevel.")
    }

    override fun turnOn() {
        super.turnOn()
        brightnessLevel = 2
        println("$name turned on. The brightness level is $brightnessLevel.")
    }
    override fun turnOff() {
        super.turnOff()
        brightnessLevel = 0
        println("Smart Light turned off")
    }
}

class SmartHome(
    val smartTvDevice: SmartTvDevice,
    val smartLightDevice: SmartLightDevice
) {
    var deviceTurnOnCount = 0
        private set

    fun turnOnTv() {
        deviceTurnOnCount++
        smartTvDevice.turnOn()
    }
    fun turnOffTv() {
        deviceTurnOnCount--
        smartTvDevice.turnOff()
    }
    fun increaseTvVolume() {
        smartTvDevice.increaseSpeakerVolume()
    }
    fun changeTvChannelToNext() {
        smartTvDevice.nextChannel()
    }
    fun turnOnLight() {
        deviceTurnOnCount++
        smartLightDevice.turnOn()
    }
    fun turnOffLight() {
        deviceTurnOnCount--
        smartLightDevice.turnOff()
    }
    fun increaseLightBrightness() {
        smartLightDevice.increaseBrightness()
    }
    fun turnOffAllDevices() {
        turnOffTv()
        turnOffLight()
    }
}

fun main() {
    var smartDevice: SmartDevice = SmartTvDevice("Android TV", "Entertainment")
    smartDevice.turnOn()
    smartDevice = SmartLightDevice("Google Light", "Utility")
    smartDevice.turnOn()
}
```

### مرجع 2: نظام أسئلة الاختبار (Question, Difficulty, Quiz, ProgressPrintable, Scope Functions)

```kotlin
enum class Difficulty {
    EASY, MEDIUM, HARD
}

data class Question<T>(
    val questionText: String,
    val answer: T,
    val difficulty: Difficulty
)

interface ProgressPrintable {
    val progressText: String
    fun printProgressBar()
}

class Quiz : ProgressPrintable {
    val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
    val question2 = Question<Boolean>("The sky is green. True or false", false, Difficulty.EASY)
    val question3 = Question<Int>("How many days are there between full moons?", 28, Difficulty.HARD)

    companion object StudentProgress {
        var total: Int = 10
        var answered: Int = 3
    }

    override val progressText: String
        get() = "${answered} of ${total} answered"

    override fun printProgressBar() {
        repeat(Quiz.answered) { print("▓") }
        repeat(Quiz.total - Quiz.answered) { print("▒") }
        println()
        println(progressText)
    }

    fun printQuiz() {
        question1.let {
            println(it.questionText)
            println(it.answer)
            println(it.difficulty)
        }
        println()
        question2.let {
            println(it.questionText)
            println(it.answer)
            println(it.difficulty)
        }
        println()
        question3.let {
            println(it.questionText)
            println(it.answer)
            println(it.difficulty)
        }
        println()
    }
}

fun main() {
    val quiz = Quiz().apply {
        printQuiz()
    }
    quiz.printProgressBar()
}
```

---

## أسئلة نظرية متوقعة بالامتحان

> **9 أسئلة.**

### Question 1: What is the difference between a primary constructor and a secondary constructor?
**نموذج الإجابة:** المُنشِئ الرئيسي (`primary constructor`) جزء من ترويسة الصنف، لا يملك جسماً، ويوجد واحد فقط لكل صنف؛ يُستخدم لتهيئة الخصائص الأساسية مباشرة (خاصة عبر `val`/`var` في قائمة وسائطه). المُنشِئ الثانوي (`secondary constructor`) يُكتب داخل جسم الصنف بالكلمة المفتاحية `constructor`، يملك جسماً يحتوي منطقاً إضافياً، ويمكن تعدده، لكن يجب أن يُهيّئ المُنشِئ الرئيسي أولاً عبر `: this(...)` إن وُجد. مثال: `SmartDevice` يستخدم مُنشِئاً ثانوياً لتحويل رمز حالة رقمي (`statusCode: Int`) إلى نص حالة مقروء. يُستخدم المُنشِئ الثانوي عندما تحتاج طريقة بديلة لإنشاء الكائن من بيانات مختلفة الشكل عن المُنشِئ الرئيسي.

### Question 2: Explain the difference between IS-A and HAS-A relationships with an example.
**نموذج الإجابة:** علاقة `IS-A` تنتج عن الوراثة، وتعني أن الصنف الفرعي هو فعلياً "نوع من" الصنف الأعلى — مثل `SmartTvDevice IS-A SmartDevice`. علاقة `HAS-A` تنتج عن التركيب (`composition`)، وتعني أن الصنف يمتلك كائناً من صنف آخر كخاصية دون أن يكون هو نفسه من ذلك النوع — مثل `SmartHome HAS-A SmartTvDevice`. تُستخدم `IS-A` عند وجود تخصص حقيقي، و`HAS-A` عند الحاجة لتجميع كائنات مختلفة الأنواع داخل كائن أكبر.

### Question 3: What is `polymorphism`, and how do `open`/`override` enable it in Kotlin?
**نموذج الإجابة:** تعدد الأشكال (`polymorphism`) هو قدرة نفس الاستدعاء (مثل `object.turnOn()`) على تنفيذ سلوك مختلف فعلياً حسب النوع الحقيقي للكائن وقت التشغيل، حتى لو كان نوع المتغير المُعلَن هو الصنف الأعلى. يُفعَّل هذا عبر تعليم الدالة بـ`open` في الصنف الأعلى، ثم كتابة `override` لها في كل صنف فرعي بتنفيذ مختلف؛ عند الاستدعاء، يختار `Kotlin` تلقائياً تنفيذ النسخة المطابقة للنوع الفعلي للكائن.

### Question 4: What problem do property delegates solve, and how are they implemented?
**نموذج الإجابة:** مفوِّضات الخصائص تحل مشكلة تكرار منطق `get()`/`set()` (مثل التحقق من نطاق قيمة) عبر عدة خصائص. يُنفَّذ الحل ببناء صنف مستقل ينفّذ واجهة `ReadWriteProperty<Any?, T>` (لخصائص `var`) أو `ReadOnlyProperty<Any?, T>` (لخصائص `val`)، مع تعريف `getValue()`/`setValue()` داخله مرة واحدة فقط، ثم ربط أي خاصية بهذا الصنف عبر الكلمة المفتاحية `by`.

### Question 5: Compare `enum class` and `data class` in terms of purpose.
**نموذج الإجابة:** `enum class` تُستخدم لتعريف نوع بمجموعة قيم ثابتة ومحدودة مسبقاً (مثل `EASY`, `MEDIUM`, `HARD`)، فتمنع القيم غير الصالحة وتُكتشف الأخطاء وقت الترجمة. `data class` تُستخدم للأصناف التي وظيفتها الوحيدة حمل بيانات دون سلوك حقيقي، وتولّد تلقائياً دوال `equals()`, `hashCode()`, `toString()`, `copy()`, و`componentN()` استناداً لخصائص المُنشِئ الرئيسي. الاثنان يخدمان أغراضاً مختلفة تماماً لكنهما غالباً يُستخدمان معاً (مثل خاصية من نوع `enum class` داخل `data class`).

### Question 6: What is the difference between `object` and `companion object`?
**نموذج الإجابة:** `object` يُعرِّف كائناً مفرداً (`singleton`) مستقلاً بذاته، له نسخة واحدة فقط في كامل البرنامج، ويُستدعى مباشرة باسمه. `companion object` هو أيضاً كائن مفرد، لكنه مُعرَّف **داخل** صنف آخر ومنسوب له منطقياً؛ يُستدعى من خارج الصنف عبر اسم الصنف الحاوي نفسه (مثل `Quiz.answered`) وليس اسم الكائن المرافق.

### Question 7: How do extension functions differ from regular member functions, and what problem do they solve?
**نموذج الإجابة:** الدالة العضو (`member function`) تُكتب داخل جسم الصنف نفسه، بينما دالة التوسيع (`extension function`) تُكتب خارج تعريف الصنف تماماً، بإضافة اسم النوع ونقطة قبل اسم الدالة (مثل `fun Quiz.StudentProgress.printProgressBar()`)، لكنها تُستدعى بنفس صيغة النقطة كأنها عضو أصلي. تحل هذه الآلية مشكلة إضافة سلوك جديد لصنف لا تملك حق تعديل كوده المصدري، أو للحفاظ على الصنف الأصلي نظيفاً ومركّزاً.

### Question 8: What is the role of an `interface` in Kotlin, and how does it differ from inheriting from a superclass?
**نموذج الإجابة:** الواجهة (`interface`) عقد يحدد توقيعات دوال وخصائص للقراءة فقط يجب على أي صنف "يوسّعها" (`extends`) الالتزام بها، دون تقديم أي تنفيذ فعلي جاهز. تختلف عن وراثة صنف أعلى (`superclass`) في أن الوراثة تنقل تنفيذاً فعلياً جاهزاً يمكن إعادة استخدامه مباشرة أو تجاوزه، بينما الواجهة تفرض فقط "ماذا" يجب تنفيذه تاركة "كيف" بالكامل لكل صنف مُنفِّذ. كما يمكن لصنف واحد تنفيذ عدة واجهات، بينما لا يمكنه وراثة أكثر من صنف أعلى واحد.

### Question 9: Explain the difference between `let()` and `apply()` scope functions with an example use case for each.
**نموذج الإجابة:** كلا الدالتين توسيعيتان تتيحان الوصول لكائن دون تكرار اسمه، لكنهما تختلفان في القيمة المُعادة: `let()` تشير للكائن عبر `it` وتُعيد نتيجة آخر تعبير داخل كتلتها (مناسبة لتنفيذ عملية والحصول على نتيجة، مثل طباعة خصائص كائن واحد). `apply()` تُعيد دائماً الكائن الأصلي نفسه (مناسبة لتهيئة كائن مباشرة بعد إنشائه وتسلسل العمليات عليه، مثل `Quiz().apply { printQuiz() }`).

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين الصنف (`class`) والكائن (`object`) بمثال
- [ ] أستطيع كتابة صنف بمُنشِئ رئيسي بوسائط، وأعرف متى أحتاج مُنشِئاً ثانوياً
- [ ] أفهم دور `field` داخل `set()` ولماذا لا أستخدم اسم الخاصية نفسها
- [ ] أستطيع شرح لماذا كل الأصناف `final` افتراضياً في `Kotlin` ودور `open`
- [ ] أستطيع بناء تسلسل وراثة بسيط وتجاوز دالة وخاصية بنجاح
- [ ] أفرّق بعناية بين علاقة `IS-A` (وراثة) وعلاقة `HAS-A` (تركيب) بمثال من كل نوع
- [ ] أعرف متى أستخدم `super.function()` ولماذا يختلف عن استدعاء عادي عبر الكائن
- [ ] أحفظ الفرق بين معدِّلات الرؤية الأربعة (`public`/`private`/`protected`/`internal`) وأطبقها على خاصية ودالة ومُنشِئ وصنف
- [ ] أستطيع شرح آلية مفوِّضات الخصائص (`by`) والواجهتين `ReadWriteProperty`/`ReadOnlyProperty`
- [ ] أفهم فائدة الأنواع العامة `<T>` ومتى أستخدمها بدل تكرار الصنف
- [ ] أعرف الفرق بين `enum class` و`data class` ومتى أستخدم كل واحدة
- [ ] أفرّق بين `object` و`companion object` وطريقة الوصول لكل منهما
- [ ] أستطيع كتابة دالة/خاصية توسيع بسيطة وأشرح فائدتها
- [ ] أفهم الفرق بين الوراثة والواجهة (`interface`) كأداتين لمشاركة السلوك
- [ ] أفرّق بين `let()` و`apply()` من حيث القيمة المُعادة وحالة الاستخدام المناسبة لكل منهما
- [ ] راجعت كل الأمثلة البرمجية في مرجع الكود الكامل وتتبعت تنفيذها ذهنياً

---

## ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| `Kotlin Basics` (السابقة) | هذه المحاضرة (`Kotlin OOP`) | الخصائص والدوال هنا مبنية مباشرة فوق `val`/`var`/`fun` الأساسية |
| هذه المحاضرة (`Kotlin OOP + Advanced`) | `App Fundamentals` (القادمة) | أصناف `Activity`/`Service` في أندرويد تُبنى بنفس مبادئ الوراثة والتجاوز المشروحة هنا |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| الأصناف والكائنات | الصنف قالب، الكائن نسخة فعلية؛ كل شيء `public`/`final` افتراضياً |
| المُنشِئات | رئيسي واحد بلا جسم، ثانوي متعدد بجسم ويجب تهيئة الرئيسي أولاً |
| الوراثة | `open` إلزامية للصنف والدالة/الخاصية قبل أي `override`؛ `super` لإعادة استخدام منطق الأب |
| الرؤية | `private` < `protected` < `internal` < `public` من الأضيق للأوسع |
| التفويض | `by` + تنفيذ `ReadWriteProperty`/`ReadOnlyProperty` لمنع تكرار منطق `get()`/`set()` |
| المتقدم | `<T>` للأنواع العامة، `enum class` للقيم المحدودة، `data class` للبيانات الصرفة، `object`/`companion object` للحالات الفريدة |
| التوسيع والنطاق | امتدادات لإضافة سلوك من الخارج؛ `let()`/`apply()` لتقليل تكرار اسم الكائن |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `open` | يسمح بالوراثة/التجاوز | قبل `class`/`fun`/`val` |
| `override` | يستبدل تنفيذاً موروثاً | أمام `fun`/`val` في الصنف الفرعي |
| `super` | يستدعي نسخة الأب صراحة | داخل دالة مُجاوَزة |
| `field` | الحقل الخلفي الفعلي للخاصية | داخل `get()`/`set()` مخصصة |
| `by` | يفوِّض `get()`/`set()` لكائن آخر | تعريف خاصية مفوَّضة |
| `<T>` | نوع نائب عام | تعريف صنف/دالة عامة |
| `it` | إشارة ضمنية للكائن | داخل `let()` |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | لا وراثة ولا تجاوز بدون `open` صراحة على الصنف والعنصر المُراد تجاوزه |
| 2 | استخدم `field` وليس اسم الخاصية نفسها داخل `set()` المخصصة لتفادي حلقة لا نهائية |
| 3 | كل مُنشِئ ثانوي يجب أن يُهيّئ المُنشِئ الرئيسي عبر `this(...)` إن وُجد |
| 4 | `IS-A` = وراثة (`:` + صنف)، `HAS-A` = تركيب (خاصية من نوع صنف آخر) — لا تخلط بينهما |
| 5 | الوصول لكائن مرافق (`companion object`) يتم عبر اسم الصنف الحاوي، لا اسم الكائن المرافق |
| 6 | `apply()` تُعيد الكائن نفسه دوماً؛ `let()` تُعيد نتيجة آخر تعبير وتستخدم `it` |

---

<!-- VALIDATION
schema: 1.0
parts: detail,summary,mcq,debug,exercise,trace,design,qa,reference,theory,cheat
mcq_count: 16
code_blocks: 59
-->

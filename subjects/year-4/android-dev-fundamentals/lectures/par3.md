# المحاضرة 2 — Kotlin OOP & Advanced (كائنية التوجه والمفاهيم المتقدمة في كوتلن)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** Kotlin Fundamentals for Android -2- (Classes, Objects, Inheritance, Generics, Enum/Data classes, Singleton/Companion objects, Extensions, Scope functions)

> ⚠️ **ملاحظة منهجية:** لم يتم إرفاق ملف `SCHEMA.md v1.0` المرجعي مع هذا الطلب، لذلك تم الالتزام حرفياً بالقوالب الموصوفة داخل `custome_prompt.md` نفسه (قسم "مرجع القوالب") كمرجع تنسيق وحيد.

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1. أساسيات كوتلن (Kotlin Basics) | `val/var`, `if/when`, `functions`, `null safety` | فهم بناء الجملة الأساسي |
| 2. كائنية التوجه في كوتلن (Kotlin OOP) ← أنت هنا | `class`, `constructor`, `inheritance`, `override`, `visibility modifiers`, `property delegates` | نمذجة الكائنات والعلاقات بينها |
| 3. مفاهيم كوتلن المتقدمة (Kotlin Advanced) ← أنت هنا | `Generics`, `enum class`, `data class`, `object`, `companion object`, `extension functions`, `scope functions` | كتابة كود مرن وقابل لإعادة الاستخدام |
| 4. أساسيات التطبيق (App Fundamentals) | `Activity`, `AndroidManifest.xml` | بناء الهيكل الأساسي للتطبيق |
| 5. واجهات Compose | `@Composable`, `Modifier`, `State` | بناء الواجهة الرسومية |

> **نوع هذه المحاضرة:** محاضرة مزدوجة تجمع بين **Kotlin OOP** (الجزء الأول) و**Kotlin Advanced** (الجزء الثاني)، لذلك سيتم تطبيق قالبَي الفئتين معاً.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. تعريف الصنف (Define a Class)

#### النص الأصلي يقول (English):
> "When you define a class, you specify the properties and methods that all objects of that class should have. A class definition starts with the class keyword, followed by a name and a set of curly braces. A class consists of three major parts: Properties, Methods, Constructors."

#### الشرح المبسّط:
الـ`class` في كوتلن هو "المخطط" (blueprint) الذي يصف كيف سيبدو أي كائن يُصنع منه — ما هي بياناته (properties) وما هي الأفعال التي يقدر يسوّيها (methods).

**لماذا؟** بدون Class، كل مرة تحتاج فيها تمثّل جهاز ذكي جديد (تلفزيون، إضاءة...) لازم تكرر نفس المتغيرات يدوياً. الـclass يعطيك قالباً جاهزاً تنسخ منه بأي عدد.

#### 💡 التشبيه:
> تخيل الـ`class` مثل "خارطة البيت" (blueprint) عند المهندس المعماري — الخارطة نفسها مو بيت تقدر تسكن فيه، لكن منها تقدر تبني مئات البيوت المتطابقة في التصميم.
> **وجه الشبه:** خارطة البيت = `class` | البيت الفعلي المبني = `object` (Instance)

```kotlin
// A class with an empty body
class SmartDevice {
    // empty body
}
```

---

### 2. إنشاء كائن (Instance) من الصنف

#### النص الأصلي يقول (English):
> "A class is a blueprint for an object. The Kotlin runtime uses the class to create an object of that particular type... The val or var keyword is followed by the name of the variable, then an = assignment operator, then the instantiation of the class object."

#### الشرح المبسّط:
لإنشاء كائن فعلي (Object) من الـclass، تكتب اسم الصنف متبوعاً بأقواس `()` — تماماً مثل استدعاء دالة. الناتج تخزّنه في متغير باستخدام `val` أو `var`.

**لماذا `val` أغلب الأحيان؟** لأن مرجع الكائن نفسه (العنوان في الذاكرة) غالباً ما يبقى ثابتاً، حتى لو تغيّرت خصائصه الداخلية لاحقاً.

```kotlin
class SmartDevice {
    // empty body
}

fun main() {
    val smartTvDevice = SmartDevice() // إنشاء كائن (Instantiation)
}
```

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كتبت `SmartDevice` بدون أقواس `()`، ماذا يحدث؟
> **لماذا هذا مهم؟** لأنك بذلك تشير إلى الـclass نفسه (النوع/Type) وليس إلى كائن فعلي — الكود لن يترجم بشكل صحيح عند محاولة استخدامه ككائن.

---

### 3. تعريف دوال الصنف (Methods)

#### النص الأصلي يقول (English):
> "Actions that the class can perform are defined as functions in the class... To call a class method outside of the class, start with the class object followed by the . operator, the name of the function, and a set of parentheses."

#### الشرح المبسّط:
الدوال المعرّفة داخل جسم الـclass تسمى **methods**، وهي تمثّل "الأفعال" أو "السلوكيات" التي يقدر يقوم فيها الكائن. لاستدعائها من خارج الصنف نستخدم عامل النقطة `.`.

```kotlin
class SmartDevice {
    fun turnOn() { println("Smart device is turned on.") }
    fun turnOff() { println("Smart device is turned off.") }
}

fun main() {
    val smartTvDevice = SmartDevice()
    smartTvDevice.turnOn()
    smartTvDevice.turnOff()
}
```

#### 💡 التشبيه:
> `turnOn()` مثل زر التشغيل الفعلي على جهاز التلفزيون — تضغطه (تستدعيه) فيتغيّر سلوك الجهاز.
> **وجه الشبه:** زر التشغيل الفيزيائي = استدعاء `method` على الكائن.

---

### 4. تعريف خصائص الصنف (Properties)

#### النص الأصلي يقول (English):
> "Properties are basically variables that are defined in the class body instead of the function body. This means that the syntax to define properties and variables are identical."

#### الشرح المبسّط:
الخصائص (Properties) هي متغيرات (`val`/`var`) لكن معرّفة مباشرة داخل جسم الـclass وليس داخل دالة. تمثّل "بيانات" الكائن أو حالته.

```kotlin
class SmartDevice {
    val name = "Android TV"
    val category = "Entertainment"
    var deviceStatus = "online"

    fun turnOn() { println("Smart device is turned on.") }
    fun turnOff() { println("Smart device is turned off.") }
}

fun main() {
    val smartTvDevice = SmartDevice()
    println("Device name is: ${smartTvDevice.name}")
    smartTvDevice.turnOn()
    smartTvDevice.turnOff()
}
```

---

### 5. دوال Getter و Setter في الخصائص

#### النص الأصلي يقول (English):
> "Properties can do more than a variable can. The full syntax to define a mutable property starts with the variable definition followed by the optional get() and set() functions. When you don't define the getter and setter function for a property, the Kotlin compiler internally creates the functions."

#### الشرح المبسّط:
كل خاصية `var` في كوتلن لها فعلياً دالتان خفيتان: `get()` لقراءة القيمة و`set(value)` لتحديثها. إذا ما كتبتهم، الكومبايلر يولّدهم تلقائياً بشكل افتراضي (قراءة/كتابة مباشرة). لكن تقدر تخصصهم لتضيف شروط أو تحقق من صحة القيمة.

**لماذا نحتاج ذلك؟** لحماية الخاصية من قيم غير منطقية — مثلاً مستوى صوت لا يمكن أن يكون سالباً أو أكبر من 100.

```kotlin
var speakerVolume = 2
    get() {
        return field
    } // or get() = field
    set(value) {
        field = value
    }
```

#### مهم للامتحان ⚠️:
> عبارة `field` هنا هي **backing field** — متغير داخلي مخفي يولّده الكومبايلر تلقائياً، ولا يمكن الوصول إليه إلا من داخل `get()` أو `set()` الخاصة بنفس الخاصية.

```kotlin
// مثال عملي: حصر قيمة الصوت بين 0 و 100
var speakerVolume = 2
    set(value) {
        if (value in 0..100) {
            field = value
        }
    }
```

---

### 6. تعريف الباني (Constructor)

#### النص الأصلي يقول (English):
> "The primary purpose of the constructor is to specify how the objects of the class are created... A default constructor is a constructor without parameters... Kotlin aims to be concise, so you can remove the constructor keyword if there are no annotations or visibility modifiers on the constructor."

#### الشرح المبسّط:
الـConstructor هو دالة خاصة تُنفَّذ تلقائياً عند إنشاء كائن جديد، ومهمتها تهيئة الكائن (إعطاء قيم ابتدائية للخصائص). كوتلن يولّد باني افتراضي تلقائياً إذا لم تكتب واحداً بنفسك.

```kotlin
class SmartDevice constructor() {
    // ...
}

// مكافئ ومختصر (الشكل المُفضّل في كوتلن)
class SmartDevice {
    // ...
}
```

#### 💡 التشبيه:
> الباني (Constructor) مثل "استمارة التسجيل" عند فتح حساب بنكي جديد — تملأ البيانات الأساسية (الاسم، الرقم...) أول ما يُفتح الحساب، فيبدأ الحساب بحالة صحيحة من اليوم الأول.
> **وجه الشبه:** استمارة التسجيل = `constructor` | الحساب البنكي = الكائن (Object)

**مثال — نقل الخصائص إلى الباني الرئيسي (Primary Constructor):**
```kotlin
class SmartDevice (val name: String, val category: String) {
    var deviceStatus = "online"
    fun turnOn() { println("Smart device is turned on.") }
    fun turnOff() { println("Smart device is turned off.") }
}

fun main() {
    val smartTvDevice = SmartDevice("Android TV", "Entertainment")
    // or: val smartTvDevice = SmartDevice(name = "Android TV", category = "Entertainment")
    println("Device name is: ${smartTvDevice.name}")
    println("Device category is: ${smartTvDevice.category}")
}
```

---

### 7. نوعا الباني: الرئيسي (Primary) والثانوي (Secondary)

#### النص الأصلي يقول (English):
> "Primary constructor. A class can have only one primary constructor... The primary constructor doesn't have a body... Secondary constructor. A class can have multiple secondary constructors... If the class has a primary constructor, each secondary constructor needs to initialize the primary constructor."

#### الشرح المبسّط:
| النوع | العدد المسموح | له جسم (body)؟ | الاستخدام |
| --- | --- | --- | --- |
| Primary constructor | واحد فقط | ❌ لا | تهيئة الخصائص مباشرة في ترويسة الصنف |
| Secondary constructor | عدة (متعددة) | ✅ نعم | منطق تهيئة إضافي (تحويل بيانات، حالات خاصة...) |

**لماذا نحتاج Secondary Constructor؟** أحياناً البيانات الواردة (مثل رمز حالة `Int` من API خارجي) لا تُستخدم مباشرة كخاصية، بل تحتاج معالجة قبل التخزين.

```algorithm
1 | استقبال statusCode | Secondary constructor | يستقبل قيمة رقمية (0/1/غيرها)
2 | تفويض للـ Primary | this(name, category) | يهيئ name و category أولاً
3 | تحويل القيمة | when(statusCode) | يحوّل الرقم إلى نص واضح (offline/online/unknown)
4 | تخزين النتيجة | deviceStatus = ... | يحفظ الحالة النهائية كخاصية
```

```kotlin
class SmartDevice (val name: String, val category: String) {
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

fun main() {
    val smartTvDevice = SmartDevice("Android TV", "Entertainment", 0)
    println("Device name is: ${smartTvDevice.name}")
    println("Device category is: ${smartTvDevice.category}")
    println("Device status is: ${smartTvDevice.deviceStatus}")
}
```

---

### 8. العلاقات بين الأصناف: الوراثة (Inheritance / IS-A)

#### النص الأصلي يقول (English):
> "Inheritance lets you build a class upon the characteristics and behavior of another class... In Kotlin, all the classes are final by default, which means that you can't extend them... The open keyword informs the compiler that this class is extendable."

#### الشرح المبسّط:
الوراثة تسمح لصنف فرعي (Subclass) يستفيد من خصائص ودوال صنف أب (Superclass) بدون إعادة كتابتها. لكن كوتلن **يمنع الوراثة افتراضياً** (كل صنف `final`) حماية من الأخطاء، ولازم تصرّح صراحة بكلمة `open` إذا تبي غيرك يرث صنفك.

**لماذا الوضع الافتراضي "ممنوع"؟** لتشجيع التصميم الواعي — الوراثة العشوائية تسبب تعقيداً وأخطاء يصعب تتبعها.

#### 📊 المخطط: علاقة الوراثة بين SmartDevice و SmartTvDevice / SmartLightDevice

#### ما هذا المخطط؟
> يوضّح كيف يرث كل من `SmartTvDevice` و`SmartLightDevice` من الصنف الأب `SmartDevice`.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | SmartDevice | class | الصنف الأب (Superclass) — يحمل الخصائص المشتركة |
| 2 | SmartTvDevice | class | صنف فرعي متخصص بجهاز تلفزيون |
| 3 | SmartLightDevice | class | صنف فرعي متخصص بجهاز إضاءة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| SmartTvDevice | SmartDevice | inheritance | سهم مثلث (IS-A) | التلفزيون "هو" جهاز ذكي |
| SmartLightDevice | SmartDevice | inheritance | سهم مثلث (IS-A) | الإضاءة "هي" جهاز ذكي |

```diagram
type: class
title: SmartDevice Inheritance
direction: TD
nodes:
  - id: SmartDevice
    label: SmartDevice (Superclass)
    kind: class
    level: 0
  - id: SmartTvDevice
    label: SmartTvDevice (Subclass)
    kind: class
    level: 1
  - id: SmartLightDevice
    label: SmartLightDevice (Subclass)
    kind: class
    level: 1
edges:
  - from: SmartTvDevice
    to: SmartDevice
  - from: SmartLightDevice
    to: SmartDevice
```

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

---

### 9. علاقة HAS-A (التركيب / Composition)

#### النص الأصلي يقول (English):
> "In a HAS-A relationship, an object can own an instance of another class without actually being an instance of that class itself... The HAS-A relationship between two classes is also referred to as composition."

#### الشرح المبسّط:
بعكس IS-A (الوراثة)، علاقة HAS-A تعني أن الكائن "يملك" كائناً آخر كخاصية بداخله، دون أن يكون هو نفسه من نفس النوع. مثال: `SmartHome` **تملك** جهاز تلفزيون وجهاز إضاءة، لكن `SmartHome` نفسها ليست جهازاً ذكياً.

#### 💡 التشبيه:
> البيت "يملك" أثاثاً (تلفزيون، مصباح)، لكن البيت نفسه ليس تلفزيوناً ولا مصباحاً.
> **وجه الشبه:** SmartHome = البيت | SmartTvDevice/SmartLightDevice = الأثاث الذي يملكه البيت

```kotlin
// The SmartHome class HAS-A smart TV device and smart light.
class SmartHome (
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

#### ⚖️ المقايضة: IS-A مقابل HAS-A

| | IS-A (Inheritance) | HAS-A (Composition) |
| --- | --- | --- |
| المزايا | إعادة استخدام مباشر للسلوك والخصائص | مرونة أكبر، لا يفرض تسلسلاً هرمياً صارماً |
| العيوب | علاقة أحادية الاتجاه وصارمة (كل تغيير في الأب يؤثر على الجميع) | يتطلب كتابة دوال "تفويض" (delegation) صريحة |
| متى تختاره | عندما يكون الكائن فعلاً "نوعاً من" الصنف الأب | عندما يكون الكائن "يستخدم/يملك" كائناً آخر |

---

### 10. تجاوز الدوال (Override Methods) واستخدام super

#### النص الأصلي يقول (English):
> "To override means to intercept the action, typically to take manual control. When you override a method, the method in the subclass interrupts the execution of the method defined in the superclass and provides its own execution... To call the overridden method in the superclass from the subclass, you need to use the super keyword."

#### الشرح المبسّط:
كلمة `override` تسمح للصنف الفرعي بإعادة كتابة سلوك دالة موروثة من الأب بسلوك خاص فيه. ولازم الدالة الأصلية في الأب تكون معرّفة بـ`open` حتى يُسمح بتجاوزها. أما `super.functionName()` فيُستخدم عندما تبي "تستدعي السلوك الأصلي من الأب" **بالإضافة** إلى السلوك الجديد، بدل استبداله بالكامل.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    open fun turnOn() { deviceStatus = "on" }
    open fun turnOff() { deviceStatus = "off" }
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    var speakerVolume = 2
    var channelNumber = 1

    override fun turnOn() {
        super.turnOn() // إعادة استخدام سلوك الأب أولاً
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
```

#### الفهم الخاطئ الشائع ❌: نسيان استدعاء `super.turnOn()` عند التجاوز، مما يعني فقدان تحديث `deviceStatus` الأصلي في الأب.
#### الفهم الصحيح ✅: استدعِ `super.functionName()` كلما احتجت "تمديد" السلوك الأصلي لا استبداله بالكامل.

---

### 11. تجاوز خصائص الصنف الأب (Override Properties)

#### النص الأصلي يقول (English):
> "Similar to methods, you can also override properties with the same steps."

#### الشرح المبسّط:
نفس مبدأ تجاوز الدوال ينطبق على الخصائص — الخاصية في الأب يجب أن تكون `open` حتى يقدر الصنف الفرعي يكتب لها قيمة مختلفة بـ`override`.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    open val deviceType = "unknown"
}

class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    override val deviceType = "Smart TV"
}

class SmartLightDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    override val deviceType = "Smart Light"
}
```

---

### 12. معدّلات الرؤية (Visibility Modifiers)

#### النص الأصلي يقول (English):
> "public. Default visibility modifier. Makes the declaration accessible everywhere... private. Makes the declaration accessible in the same class or source file... protected. Makes the declaration accessible in subclasses... internal. Makes the declaration accessible in the same module."

#### الشرح المبسّط:
معدّلات الرؤية تتحكم بـ"من يقدر يشوف/يستخدم" خاصية أو دالة أو صنف معين — وهذا هو مبدأ **Encapsulation** (التغليف) في البرمجة الكائنية.

| المُعدِّل | داخل نفس الصنف | في الأصناف الفرعية | داخل نفس الموديول | خارج الموديول |
| --- | --- | --- | --- | --- |
| `private` | ✔ | ✗ | ✗ | ✗ |
| `protected` | ✔ | ✔ | ✗ | ✗ |
| `internal` | ✔ | ✔ | ✔ | ✗ |
| `public` (افتراضي) | ✔ | ✔ | ✔ | ✔ |

**لماذا نحتاجها؟** لمنع الوصول أو التعديل غير المقصود على تفاصيل داخلية للصنف، مما يقلل الأخطاء ويجعل الكود أسهل للفهم والصيانة.

```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
        protected set // يمكن قراءتها من أي مكان، لكن تعديلها فقط من الصنف أو الأصناف الفرعية
}
```

```kotlin
// معدّل الرؤية على الباني (Constructor)
open class SmartDevice protected constructor (val name: String, val category: String) {
    // ...
}
```

```kotlin
// معدّل الرؤية على الصنف نفسه
internal open class SmartDevice(val name: String, val category: String) {
    // ...
}
```

---

### 13. تفويض الخصائص (Property Delegates)

#### النص الأصلي يقول (English):
> "The syntax to create property delegates starts with the declaration of a variable followed by the by keyword, and the delegate object that handles the getter and setter functions for the property... For the var type, you need to implement the ReadWriteProperty interface."

#### الشرح المبسّط:
بدل ما تكرر نفس منطق التحقق (مثل `if (value in 0..100)`) في كل خاصية على حدة، تقدر "تفوّض" مسؤولية الـget/set لكائن خارجي واحد يطبّق واجهة `ReadWriteProperty`، فتوفر تكرار الكود.

**لماذا؟** مبدأ DRY (Don't Repeat Yourself) — إذا عندك أكثر من خاصية تحتاج نفس نوع التحقق (مثل حصر بين حد أدنى وأقصى)، تكتب المنطق مرة واحدة فقط في صنف الـDelegate.

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
```

```kotlin
class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
    private var speakerVolume by RangeRegulator(initialValue = 2, minValue = 0, maxValue = 100)
    private var channelNumber by RangeRegulator(initialValue = 1, minValue = 0, maxValue = 200)
}
```

---

### 14. الأنواع العامة (Generics)

#### النص الأصلي يقول (English):
> "Generic types, or generics for short, allow a data type, such as a class, to specify an unknown placeholder data type that can be used with its properties and methods... The data type that the generic type uses is passed as a parameter in angle brackets when you instantiate the class."

#### الشرح المبسّط:
الـGenerics تسمح لصنف واحد يشتغل مع أكثر من نوع بيانات (String، Int، Boolean...) بدون تكرار الكود لكل نوع. ترمز للنوع "المجهول مؤقتاً" بحرف مثل `T`، ويُحدَّد النوع الفعلي وقت إنشاء الكائن.

**لماذا؟** بدل كتابة `QuestionString`، `QuestionInt`، `QuestionBoolean` كأصناف منفصلة، تكتب صنفاً عاماً واحداً `Question<T>` يخدم جميع الحالات.

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

#### 💡 التشبيه:
> `<T>` مثل "قالب حجز طاولة" فارغ في مطعم — تقدر تحجزه لأي عدد أشخاص (النوع الفعلي)، لكن شكل الحجز نفسه واحد.
> **وجه الشبه:** القالب الفارغ = `<T>` | عدد الأشخاص الفعلي عند الحجز = النوع الممرَّر (String, Int, Boolean...)

---

### 15. صنف التعداد (Enum Class)

#### النص الأصلي يقول (English):
> "An enum class is used to create types with a limited set of possible values... Each possible value of an enum is called an enum constant... You refer to enum constants using the dot operator."

#### الشرح المبسّط:
`enum class` يُستخدم عندما تعرف مسبقاً أن قيمة متغيّر معيّن محصورة بمجموعة ثابتة ومحدودة من الخيارات (مثل: سهل/متوسط/صعب)، بدل استخدام نص حر (`String`) عرضة للأخطاء الإملائية.

```kotlin
enum class Difficulty {
    EASY, MEDIUM, HARD
}

class Question<T>(
    val questionText: String,
    val answer: T,
    val difficulty: Difficulty
)

val question1 = Question<String>("Quoth the raven ___", "nevermore", Difficulty.MEDIUM)
```

#### مهم للامتحان ⚠️:
> استخدام `enum class` بدل `String` يمنع أخطاء مثل كتابة `"mediun"` بدل `"medium"` — لأن الكومبايلر يتحقق من القيم وقت الترجمة (compile-time) وليس وقت التشغيل فقط.

---

### 16. صنف البيانات (Data Class)

#### النص الأصلي يقول (English):
> "Classes that only contain data and don't have any methods that perform an action can be defined as a data class... Defining a class as a data class allows the Kotlin compiler to make certain assumptions, and to automatically implement some methods."

#### الشرح المبسّط:
عندما يكون الصنف مجرد "حاوية بيانات" بدون سلوك حقيقي، تضيف كلمة `data` قبل `class` فيولّد الكومبايلر تلقائياً دوال مفيدة جداً بدون ما تكتبها بنفسك.

```kotlin
data class Question<T>(
    val questionText: String,
    val answer: T,
    val difficulty: Difficulty
)
```

الدوال المولَّدة تلقائياً:
- `equals()`
- `hashCode()`
- `toString()`
- `componentN()`: `component1()`, `component2()`, ...
- `copy()`

```kotlin
println(question1.toString())
// الناتج:
// Question(questionText=Quoth the raven ___, answer=nevermore, difficulty=MEDIUM)
```

---

### 17. الكائن المفرد (Singleton Object) والكائن المرافق (Companion Object)

#### النص الأصلي يقول (English):
> "A singleton is a class that can only have a single instance. Kotlin provides a special construct, called an object... A singleton object can't have a constructor as you can't create instances directly... You can define a singleton object inside another class using a companion object."

#### الشرح المبسّط:
- **`object`**: يُنشئ صنفاً له نسخة واحدة فقط تلقائياً في كامل البرنامج — لا تحتاج (ولا يمكنك) إنشاء كائن منه بـ`SomeObject()`.
- **`companion object`**: كائن مفرد (singleton) لكن **معرَّف داخل صنف آخر**، مما يتيح الوصول لخصائصه من داخل ذلك الصنف مباشرة (صياغة أقصر وأوضح).

```kotlin
object StudentProgress {
    var total: Int = 10
    var answered: Int = 3
}

fun main() {
    println("${StudentProgress.answered} of ${StudentProgress.total} answered.")
}
```

```kotlin
class Quiz {
    companion object StudentProgress {
        var total: Int = 10
        var answered: Int = 3
    }
}

fun main() {
    println("${Quiz.answered} of ${Quiz.total} answered.")
}
```

#### ⚖️ المقايضة: object مقابل companion object

| | `object` (مستقل) | `companion object` (داخل صنف) |
| --- | --- | --- |
| المزايا | بسيط ومباشر عند عدم الحاجة لربطه بصنف | يجمّع البيانات المرتبطة منطقياً بصنف معين داخله |
| العيوب | لا علاقة تنظيمية مع أي صنف | يزيد تعقيد بنية الصنف قليلاً |
| متى تختاره | عندما تكون البيانات/الدوال عامة ومستقلة | عندما تكون البيانات جزءاً من "هوية" صنف معين |

---

### 18. الدوال والخصائص الامتدادية (Extension Functions/Properties)

#### النص الأصلي يقول (English):
> "To define an extension property, add the type name and a dot operator (.) before the variable name... To define an extension function, add the type name and a dot operator (.) before the function name."

#### الشرح المبسّط:
الامتدادات (Extensions) تسمح لك تضيف دالة أو خاصية جديدة لصنف **موجود مسبقاً** (حتى لو ما تملك كوده الأصلي، مثل أصناف مكتبات خارجية) بدون تعديل ذلك الصنف أو وراثته.

```kotlin
val Quiz.StudentProgress.progressText: String
    get() = "${answered} of ${total} answered"

fun Quiz.StudentProgress.printProgressBar() {
    repeat(Quiz.answered) { print("▓") }
    repeat(Quiz.total - Quiz.answered) { print("▒") }
    println()
    println(Quiz.progressText)
}
```

**الناتج المتوقع:**
> ▓▓▓▒▒▒▒▒▒▒
> 3 of 10 answered

---

### 19. إعادة كتابة الامتدادات باستخدام الواجهات (Interfaces)

#### النص الأصلي يقول (English):
> "An interface is a contract. A class that conforms to an interface is said to extend the interface... In return, the class must implement all properties and methods specified in the interface... Interfaces allow for variation in the behavior of classes that extend them."

#### الشرح المبسّط:
الـ`interface` هو "عقد" يحدد **ماذا** يجب أن يفعله الصنف، بدون تحديد **كيف**. أي صنف "يوقّع" على هذا العقد (`class X : InterfaceName`) يلتزم بتطبيق كل الدوال والخصائص المذكورة فيه.

**لماذا أفضل من Extensions أحياناً؟** لأن الـinterface يجبر أي صنف يطبّقه على الالتزام بنفس التوقيع (Signature)، فيضمن الاتساق عبر أصناف متعددة، وإذا عدّلت الـinterface يجبرك الكومبايلر على تحديث كل مكان يستخدمه.

```kotlin
interface ProgressPrintable {
    val progressText: String
    fun printProgressBar()
}

class Quiz : ProgressPrintable {
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
```

---

### 20. دوال النطاق (Scope Functions): let() و apply()

#### النص الأصلي يقول (English):
> "The let() function allows you to refer to an object in a lambda expression using the identifier it, instead of the object's actual name... The apply() function is an extension function that can be called on an object using dot notation. The apply() function also returns a reference to that object."

#### الشرح المبسّط:
- **`let()`**: يسمح لك تشتغل مع خصائص كائن باستخدام الكلمة المختصرة `it` بدل تكرار اسم الكائن الطويل مراراً.
- **`apply()`**: يُستدعى على كائن **قبل حتى تخزينه في متغير**، وينفّذ كتلة كود عليه، ثم "يرجّع" نفس الكائن — مفيد لتهيئة كائن وضبط إعداداته دفعة واحدة.

```kotlin
// let()
question1.let {
    println(it.questionText)
    println(it.answer)
    println(it.difficulty)
}
```

```kotlin
// apply()
val quiz = Quiz().apply {
    printQuiz()
}
```

#### 🔄 قبل / بعد: استخدام let() بدل التكرار

**قبل:**
```kotlin
println(question1.questionText)
println(question1.answer)
println(question1.difficulty)
```

**بعد:**
```kotlin
question1.let {
    println(it.questionText)
    println(it.answer)
    println(it.difficulty)
}
```

**ماذا تغيّر؟** استُبدل الاسم الطويل `question1` المتكرر بالضمير القصير `it` داخل نطاق `let`.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `class` | مخطط لإنشاء كائنات تشترك في نفس الخصائص والدوال | `class SmartDevice { ... }` |
| `object` (Instance) | نسخة فعلية تم إنشاؤها من صنف | `val tv = SmartDevice()` |
| `constructor` | دالة خاصة تهيّئ الكائن عند إنشائه | `class X(val name: String)` |
| `open` | كلمة مفتاحية تسمح للصنف/الدالة/الخاصية بأن تُورَّث أو تُتجاوَز | `open class SmartDevice` |
| `override` | إعادة تعريف سلوك دالة/خاصية موروثة من الأب | `override fun turnOn()` |
| `super` | يشير إلى الصنف الأب لاستدعاء سلوكه الأصلي | `super.turnOn()` |
| `IS-A` | علاقة وراثة (الفرعي "هو نوع من" الأب) | `SmartTvDevice : SmartDevice` |
| `HAS-A` | علاقة تركيب (الكائن "يملك" كائناً آخر كخاصية) | `SmartHome(val tv: SmartTvDevice)` |
| `Generics <T>` | نوع عام يُحدَّد لاحقاً عند الاستخدام | `Question<String>` |
| `enum class` | نوع بقيم محدودة وثابتة | `enum class Difficulty { EASY, MEDIUM, HARD }` |
| `data class` | صنف يولّد تلقائياً `equals/hashCode/toString/copy` | `data class Question<T>(...)` |
| `object` (Singleton) | صنف بنسخة واحدة فقط في البرنامج | `object StudentProgress { ... }` |
| `companion object` | كائن مفرد معرَّف داخل صنف آخر | `companion object { ... }` |
| Extension function/property | إضافة دالة/خاصية جديدة لصنف موجود دون تعديله | `fun Quiz.printProgressBar()` |
| `interface` | عقد يحدد الدوال/الخصائص الواجب تطبيقها | `interface ProgressPrintable` |
| Scope function | دالة تتيح الوصول لخصائص كائن ضمن نطاق مختصر | `let {}`, `apply {}` |
| Property delegate | تفويض منطق get/set لكائن خارجي | `by RangeRegulator(...)` |
| backing field (`field`) | متغير داخلي مخفي يمثل التخزين الفعلي للخاصية | داخل `get()`/`set()` فقط |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `val` | خاصية/متغير للقراءة فقط (immutable) | لا تملك `set()` |
| `var` | خاصية/متغير قابل للتعديل (mutable) | تملك `get()` و`set()` |
| `constructor` (Primary) | تهيئة سريعة في ترويسة الصنف | لا يحتوي جسماً |
| `constructor` (Secondary) | تهيئة إضافية مع منطق معالجة | يجب أن يستدعي `this(...)` |
| `ReadWriteProperty` | واجهة لبناء Delegate لخاصية `var` | تُستخدم مع `by` |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| val مقابل var | `val` | `var` | `val` غير قابل لإعادة التعيين، `var` قابل للتعديل |
| class مقابل data class | `class` | `data class` | data class تولّد `equals/hashCode/toString/copy` تلقائياً |
| object مقابل companion object | `object` مستقل | `companion object` | الثاني مرتبط ببنية صنف محدد |
| IS-A مقابل HAS-A | Inheritance | Composition | IS-A علاقة وراثة، HAS-A علاقة امتلاك |
| private مقابل protected | لا وصول من الأصناف الفرعية | وصول من الأصناف الفرعية مسموح | نطاق الرؤية |

### قاموس المصطلحات (Glossary)

| الفئة | المصطلحات |
| --- | --- |
| بنية الصنف | `class`, `constructor`, `properties`, `methods`, `body` |
| الوراثة | `open`, `override`, `super`, `IS-A`, `HAS-A`, `composition` |
| الرؤية | `public`, `private`, `protected`, `internal` |
| الأنواع المتقدمة | `Generics <T>`, `enum class`, `data class` |
| الكائنات الخاصة | `object`, `companion object`, `singleton` |
| التمديد | `extension function`, `extension property`, `interface` |
| النطاق | `scope function`, `let()`, `apply()`, `it` |
| التفويض | `property delegate`, `by`, `ReadWriteProperty`, `field` |

### أبرز النقاط الذهبية
1. كل الأصناف في كوتلن `final` افتراضياً — الوراثة تتطلب `open` صراحة.
2. `override` يتطلب أن يكون العنصر الأصلي في الأب معلَّماً بـ`open`.
3. `data class` توفّر عليك كتابة دوال شائعة يدوياً (equals, toString...).
4. `companion object` هو أقرب ما يوجد في كوتلن لمفهوم "Static Members" في لغات أخرى.
5. الـ`interface` يضمن الاتساق بين عدة أصناف تطبّقه أكثر من مجرد Extension منفردة.
6. `let()` تستخدم `it`، بينما `apply()` تتيح الوصول المباشر للخصائص وترجع الكائن نفسه.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| محاولة وراثة صنف بدون `open` | أضف `open` قبل `class` في الصنف الأب |
| تجاوز دالة/خاصية غير معلَّمة بـ`open` | أضف `open` للعنصر في الأب قبل استخدام `override` |
| نسيان `super.method()` عند الحاجة لسلوك الأب | استدعِ `super.method()` صراحة داخل الدالة المتجاوَزة |
| استخدام `String` بدل `enum class` لقيم محدودة | استبدلها بـ`enum class` لضمان التحقق وقت الترجمة |
| الخلط بين IS-A و HAS-A | اسأل: "هل الكائن نوع من...؟" (IS-A) أم "هل الكائن يملك...؟" (HAS-A) |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: إنشاء صنف فرعي بعلاقة وراثة (IS-A)
> **ما هدفه؟** بناء صنف جديد يستفيد من خصائص ودوال صنف أب موجود.
```algorithm
1 | تعليم الصنف الأب | كلمة open | يسمح للصنف بأن يُورَّث
2 | كتابة ترويسة الصنف الفرعي | class Sub(params) : Super(args) | يربط الصنف الفرعي بالأب
3 | تمرير معاملات الباني الأب | Super(name = x, category = y) | يهيّئ خصائص الأب من داخل الفرعي
4 | إضافة خصائص/دوال خاصة بالفرعي | داخل جسم الصنف الفرعي | يضيف سلوكاً إضافياً غير موجود بالأب
```
#### نقاط التنفيذ:
- لا يمكن تجاوز الوراثة إذا كان الصنف الأب `final` (الوضع الافتراضي).
- كل Secondary constructor في الصنف الأب يجب تفويضه بـ`this(...)`.

---

#### ⚙️ الخطوات / الخوارزمية: تجاوز دالة موروثة مع الحفاظ على سلوك الأب
> **ما هدفه؟** إضافة سلوك جديد في الصنف الفرعي دون فقدان السلوك الأصلي في الأب.
```algorithm
1 | تعليم الدالة في الأب | open fun | يسمح بتجاوزها لاحقاً
2 | كتابة الدالة في الفرعي | override fun | يعيد تعريف الدالة بنفس التوقيع
3 | استدعاء سلوك الأب (اختياري) | super.functionName() | يُنفّذ الكود الأصلي أولاً
4 | إضافة سلوك جديد | كود إضافي بعد استدعاء super | يمدّد وظيفة الدالة الأصلية
```
#### نقاط التنفيذ:
- تجاهل `super.functionName()` يعني استبدال سلوك الأب بالكامل بدل تمديده.

---

#### ⚙️ الخطوات / الخوارزمية: بناء Property Delegate لخاصية `var` محكومة بنطاق
> **ما هدفه؟** توحيد منطق التحقق (مثل حصر قيمة بين حد أدنى وأقصى) عبر خصائص متعددة.
```algorithm
1 | إنشاء صنف Delegate | class RangeRegulator(...) : ReadWriteProperty<Any?, Int> | يحدد نوع القيمة المُدارة
2 | تخزين القيمة الداخلية | var fieldData = initialValue | يمثل التخزين الفعلي
3 | تطبيق getValue() | return fieldData | يعيد القيمة الحالية عند القراءة
4 | تطبيق setValue() | if (value in min..max) fieldData = value | يتحقق من صحة القيمة قبل الحفظ
5 | ربط الخاصية بالـDelegate | var x by RangeRegulator(...) | يفوّض get/set لهذا الكائن
```
#### نقاط التنفيذ:
- يجب استيراد `kotlin.properties.ReadWriteProperty` و`kotlin.reflect.KProperty`.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| Primary constructor مختصر | `class X(val a: Type, val b: Type)` | عند عدم الحاجة لمنطق تهيئة إضافي |
| Secondary constructor مفوَّض | `constructor(...) : this(...) { ... }` | عند الحاجة لمعالجة بيانات قبل التخزين |
| تجاوز مع تمديد السلوك | `override fun f() { super.f(); /* جديد */ }` | عند رغبتك بإضافة سلوك بدل استبداله |
| خاصية محمية القيمة | `var x = v \n set(value) { if (...) field = value }` | عند الحاجة لحصر مجال قيم مسموح |
| Generics بسيطة | `class X<T>(val value: T)` | عندما يتكرر نفس هيكل الصنف لأنواع بيانات مختلفة |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| بيانات محدودة القيم (سهل/متوسط/صعب) | استخدم `enum class` | يمنع القيم الخاطئة إملائياً وقت الترجمة |
| صنف بيانات بدون سلوك | استخدم `data class` | يوفر توليد تلقائي لدوال أساسية |
| دالة/خاصية عامة مرتبطة بصنف معين | استخدم `companion object` | يتيح استدعاء مباشر باسم الصنف |
| إضافة سلوك لصنف مغلق التعديل | استخدم Extension function | لا يتطلب تعديل الكود الأصلي أو وراثته |
| تكرار الوصول لعدة خصائص لكائن واحد | استخدم `let { it... }` | يختصر الكود ويقلل التكرار |

### الأفكار الرئيسية الشاملة
- الفلسفة الأساسية لكوتلن في هذه المحاضرة: **الأمان بالافتراض** (final classes, immutability بـ`val`) مع إتاحة **المرونة عند الحاجة** (`open`, `var`, Generics).
- كل أداة جديدة (enum, data class, object, extension, delegate) تحل مشكلة تكرار كود محددة رأيناها في الأمثلة الأساسية للصنف `SmartDevice`.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% (4 أسئلة) | سيناريو كود 35% (6 أسئلة) | تطبيق 40% (6 أسئلة).

### السؤال 1 (medium) — مقارنات
What is the default visibility modifier of a class in Kotlin if none is specified?
أ) `private`  ب) `protected`  ج) `public`  د) `internal`
**الإجابة الصحيحة: ج**
**التعليل:** كوتلن يجعل كل شيء `public` افتراضياً ما لم تحدد غير ذلك؛ (أ) و(ب) تتطلبان كتابة صريحة؛ (د) يقتصر الوصول على نفس الموديول فقط وليس الافتراضي.

---

### السؤال 2 (medium) — مقارنات
Which keyword must be added to a class to allow other classes to inherit from it?
أ) `override`  ب) `open`  ج) `super`  د) `final`
**الإجابة الصحيحة: ب**
**التعليل:** `open` هي الكلمة التي تُلغي القفل الافتراضي (final)؛ (أ) لتجاوز عنصر موجود بالفعل؛ (ج) للوصول لسلوك الأب؛ (د) هي الحالة الافتراضية أصلاً (الصنف مقفل).

---

### السؤال 3 (medium) — مقارنات
What is generated automatically by the Kotlin compiler for a `data class`?
أ) فقط `toString()`  ب) `equals()`, `hashCode()`, `toString()`, `copy()`, `componentN()`  ج) فقط باني افتراضي  د) لا شيء تلقائي
**الإجابة الصحيحة: ب**
**التعليل:** هذه الدوال الخمس هي بالضبط ما يذكره النص الأصلي؛ (أ) ناقصة؛ (ج) الباني الافتراضي متوفر لأي class عادي أيضاً؛ (د) خاطئة تماماً لأن الميزة الأساسية لـdata class هي التوليد التلقائي.

---

### السؤال 4 (hard) — مقارنات
In terms of accessibility, what is the key difference between `protected` and `internal`?
أ) لا يوجد فرق  ب) `protected` يتيح الوصول من الأصناف الفرعية فقط بينما `internal` يتيحه لكل الموديول  ج) `internal` أكثر تقييداً من `private`  د) `protected` يتيح الوصول من خارج الموديول
**الإجابة الصحيحة: ب**
**التعليل:** بحسب الجدول، `protected` يقتصر على الصنف والأصناف الفرعية، بينما `internal` يوسّع الوصول لأي كود ضمن نفس الموديول حتى لو لم يكن صنفاً فرعياً؛ (ج) و(د) عكس الحقيقة.

---

### السؤال 5 (medium) — سيناريو كود
```kotlin
open class SmartDevice(val name: String) {
    open fun turnOn() { println("Device on") }
}
class Light(name: String) : SmartDevice(name) {
    override fun turnOn() {
        println("Light on")
    }
}
fun main() {
    val d: SmartDevice = Light("Lamp")
    d.turnOn()
}
```
What will be printed?
أ) "Device on"  ب) "Light on"  ج) خطأ ترجمة (compile error)  د) لا شيء يُطبع
**الإجابة الصحيحة: ب**
**التعليل:** بما أن `turnOn()` تم تجاوزها في `Light` بدون استدعاء `super.turnOn()`، يُنفَّذ فقط السلوك الجديد "Light on"؛ (أ) كانت صحيحة فقط لو استُدعي `super.turnOn()`؛ (ج) و(د) لا سبب للخطأ أو الصمت هنا.

---

### السؤال 6 (medium) — سيناريو كود
```kotlin
var volume = 5
    set(value) {
        if (value in 0..10) field = value
    }
fun main() {
    volume = 15
    println(volume)
}
```
What is printed?
أ) 15  ب) 5  ج) 0  د) خطأ ترجمة
**الإجابة الصحيحة: ب**
**التعليل:** القيمة 15 خارج المدى `0..10`، فالشرط في `set()` يفشل ولا يُحدَّث `field`، فتبقى القيمة القديمة 5؛ (أ) لو لم يكن هناك تحقق؛ (ج) لا سبب لتصفيرها؛ (د) الكود صحيح نحوياً.

---

### السؤال 7 (hard) — سيناريو كود
```kotlin
class Question<T>(val answer: T)
fun main() {
    val q = Question<Int>("28")
}
```
What happens?
أ) يُطبع "28" بنجاح  ب) خطأ ترجمة (type mismatch)  ج) يعمل ويحوّل النص تلقائياً لرقم  د) خطأ وقت التشغيل فقط
**الإجابة الصحيحة: ب**
**التعليل:** حُدِّد `T` كـ`Int` بين الأقواس الزاوية، لكن تم تمرير `"28"` وهو `String`؛ كوتلن يتحقق من التطابق وقت الترجمة (compile-time) فيرفض الكود؛ (أ) و(ج) و(د) تفترض تحويلاً تلقائياً غير موجود.

---

### السؤال 8 (medium) — سيناريو كود
```kotlin
object Counter {
    var count = 0
}
fun main() {
    Counter.count++
    val c2 = Counter
    c2.count++
    println(Counter.count)
}
```
What is printed?
أ) 0  ب) 1  ج) 2  د) خطأ ترجمة لأن object لا يمكن نسخه لمتغير
**الإجابة الصحيحة: ج**
**التعليل:** `object` هو Singleton — نسخة واحدة فقط في الذاكرة، لذا `c2` يشير لنفس الكائن `Counter`، وأي تعديل عبر أي مرجع ينعكس على الجميع (0+1+1=2)؛ (د) خاطئة لأن الإشارة لكائن Singleton مسموحة تماماً.

---

### السؤال 9 (hard) — سيناريو كود
```kotlin
open class A { open fun greet() = "A" }
class B : A() { override fun greet() = "B: " + super.greet() }
fun main() { println(B().greet()) }
```
What is printed?
أ) "A"  ب) "B: "  ج) "B: A"  د) خطأ ترجمة
**الإجابة الصحيحة: ج**
**التعليل:** `super.greet()` يستدعي نسخة الأب التي ترجع "A"، ثم تُدمج مع "B: " فينتج "B: A"؛ (أ) تجاهل التجاوز؛ (ب) تجاهل استدعاء super؛ (د) لا خطأ نحوياً هنا.

---

### السؤال 10 (medium) — تطبيق
Which construct should you use to represent a fixed, limited set of values like `EASY`, `MEDIUM`, `HARD`?
أ) `data class`  ب) `enum class`  ج) `interface`  د) `companion object`
**الإجابة الصحيحة: ب**
**التعليل:** `enum class` صُمِّم خصيصاً لهذا الغرض؛ (أ) لتخزين بيانات عامة؛ (ج) لتعريف عقد سلوكي؛ (د) لخصائص/دوال مرتبطة بصنف.

---

### السؤال 11 (medium) — تطبيق
You want to add a new function to a class from an external library without modifying its source code. What should you use?
أ) Inheritance  ب) Extension function  ج) Property delegate  د) Secondary constructor
**الإجابة الصحيحة: ب**
**التعليل:** الامتدادات (Extensions) مصمَّمة لإضافة سلوك لصنف موجود دون تعديل مصدره أو حتى وراثته؛ (أ) تتطلب أن يكون الصنف `open`؛ (ج) لإدارة get/set لخاصية؛ (د) لمنطق تهيئة إضافي فقط.

---

### السؤال 12 (hard) — تطبيق
Why would you use a `companion object` instead of a top-level standalone `object`?
أ) لأنه أسرع في الأداء  ب) لأنه يربط منطقياً الخصائص/الدوال المشتركة باسم صنف معين ويتيح الوصول عبر اسم الصنف مباشرة  ج) لأنه الطريقة الوحيدة لإنشاء Singleton  د) لأنه يسمح بإنشاء عدة نسخ من نفس الكائن
**الإجابة الصحيحة: ب**
**التعليل:** هذا بالضبط ما يوفره companion object — تنظيم وربط منطقي؛ (أ) لا فرق أداء يُذكر؛ (ج) الـobject المستقل أيضاً Singleton؛ (د) عكس مفهوم Singleton تماماً.

---

### السؤال 13 (medium) — تطبيق
Which visibility modifier should you use for a setter if you want the property readable everywhere but only modifiable within the class and its subclasses?
أ) `private set`  ب) `protected set`  ج) `internal set`  د) لا حاجة لأي معدّل
**الإجابة الصحيحة: ب**
**التعليل:** `protected` يسمح بالوصول من داخل الصنف والأصناف الفرعية فقط، وهو تماماً المطلوب هنا مع بقاء الـgetter عاماً افتراضياً؛ (أ) يمنع حتى الأصناف الفرعية؛ (ج) يوسّع لكل الموديول وهذا أوسع من المطلوب؛ (د) يجعل التعديل مفتوحاً للجميع.

---

### السؤال 14 (hard) — تطبيق
When should you prefer a `property delegate` (`by`) over repeating the same `set()` logic in multiple properties?
أ) عندما تحتاج نفس منطق التحقق (مثل حصر مجال قيم) في أكثر من خاصية  ب) عندما تحتاج خاصية واحدة فقط بدون أي تحقق  ج) عندما تريد صنفاً بدون أي خصائص  د) عندما تحتاج علاقة وراثة فقط
**الإجابة الصحيحة: أ**
**التعليل:** الهدف الأساسي من الـDelegate هو تجنّب تكرار نفس منطق get/set عبر خصائص متعددة؛ باقي الخيارات لا علاقة لها بمشكلة التكرار التي يحلها الـDelegate.

---

### السؤال 15 (medium) — تطبيق
Which scope function returns a reference to the object it was called on, allowing you to configure an object right after creating it?
أ) `let()`  ب) `apply()`  ج) `super()`  د) `override()`
**الإجابة الصحيحة: ب**
**التعليل:** بحسب النص الأصلي، `apply()` تُرجع مرجع الكائن نفسه بعد تنفيذ كتلة التهيئة؛ (أ) تُستخدم بشكل مختلف عبر `it` ولا تُستخدم عادة لهذا الغرض بنفس الطريقة؛ (ج) و(د) ليستا scope functions أصلاً.

---

### السؤال 16 (hard) — تطبيق
What is the primary reason all Kotlin classes are `final` by default?
أ) لتحسين سرعة تنفيذ البرنامج فقط  ب) لتشجيع تصميم واعٍ للوراثة ومنع الأخطاء الناتجة عن وراثة غير مقصودة  ج) لأن كوتلن لا يدعم الوراثة أصلاً  د) لتقليل حجم الملف التنفيذي
**الإجابة الصحيحة: ب**
**التعليل:** هذا هو المبرر التصميمي المذكور صراحة — منع الوراثة العشوائية غير المدروسة؛ (ج) خاطئة تماماً لأن كوتلن يدعم الوراثة عبر `open`؛ (أ) و(د) ليست الأسباب الأساسية المذكورة في المحاضرة.

---

## الجزء الرابع: أسئلة تصحيح الكود

> Cover error types: compilation, logic, return_check, dead code, misconception.

### Debug Question 1 — `syntax`
**The following code contains a bug:**
```kotlin
class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(deviceName, deviceCategory) {
    override turnOn() {
        println("On")
    }
}
```
**Find the bug:** Missing the `fun` keyword before `turnOn()`.

**Fixed code:**
```kotlin
class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(deviceName, deviceCategory) {
    override fun turnOn() {
        println("On")
    }
}
```
**شرح الحل:**
1. أي دالة في كوتلن (حتى المتجاوَزة بـ`override`) يجب أن تبدأ بكلمة `fun`.
2. بدونها، الكومبايلر لا يميّز أن `turnOn()` تعريف دالة، فيحدث خطأ ترجمة.

---

### Debug Question 2 — `logic`
**The following code contains a bug:**
```kotlin
open class SmartDevice(val name: String) {
    var deviceStatus = "online"
    open fun turnOff() {
        deviceStatus = "on" // wrong value assigned
    }
}
```
**Find the bug:** `turnOff()` sets `deviceStatus` to `"on"` instead of `"off"`.

**Fixed code:**
```kotlin
open class SmartDevice(val name: String) {
    var deviceStatus = "online"
    open fun turnOff() {
        deviceStatus = "off"
    }
}
```
**شرح الحل:**
1. الخطأ منطقي وليس نحوياً — الكود يترجم بنجاح لكنه يعطي نتيجة خاطئة.
2. اسم الدالة `turnOff` يوحي بأن الحالة يجب أن تصبح "off" وليس "on".

---

### Debug Question 3 — `return_check`
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
**Find the bug:** `getValue()` has no `return` statement, but it declares a return type `Int`.

**Fixed code:**
```kotlin
override fun getValue(thisRef: Any?, property: KProperty<*>): Int {
    return fieldData
}
```
**شرح الحل:**
1. أي دالة تحدد نوع إرجاع صريح (`: Int`) يجب أن تحتوي على `return` بقيمة من نفس النوع.
2. بدونها الكومبايلر يرفض الترجمة لأن الدالة لا "تفي" بوعدها بإرجاع `Int`.

---

### Debug Question 4 — `dead_code`
**The following code contains a bug:**
```kotlin
open class SmartDevice(val name: String) {
    open fun turnOn() {
        println("Device on")
        return
        println("This will never run") // dead code
    }
}
```
**Find the bug:** The line after `return` is unreachable (dead code).

**Fixed code:**
```kotlin
open class SmartDevice(val name: String) {
    open fun turnOn() {
        println("Device on")
    }
}
```
**شرح الحل:**
1. أي سطر يأتي بعد `return` داخل نفس الكتلة البرمجية لا يُنفَّذ أبداً.
2. الكومبايلر في كوتلن يحذّر (Warning) عن هذا الكود الميت، ويُفضَّل حذفه أو إعادة ترتيب المنطق.

---

### Debug Question 5 — `misconception`
**The following code contains a bug:**
```kotlin
class SmartDevice(val name: String) {
    // developer assumes this class can be inherited without extra keywords
}
class SmartTvDevice(name: String) : SmartDevice(name) {
    // ...
}
```
**Find the bug:** `SmartDevice` is not marked `open`, so it cannot be inherited — this is a misconception that all Kotlin classes are inheritable by default.

**Fixed code:**
```kotlin
open class SmartDevice(val name: String) {
    // ...
}
class SmartTvDevice(name: String) : SmartDevice(name) {
    // ...
}
```
**شرح الحل:**
1. الفهم الخاطئ الشائع: افتراض أن أي صنف في كوتلن قابل للوراثة تلقائياً كما في بعض اللغات الأخرى.
2. الحقيقة: كوتلن يجعل كل صنف `final` افتراضياً، ولازم تضيف `open` صراحة.

---

### Debug Question 6 — `syntax`
**The following code contains a bug:**
```kotlin
class Question<T>(
    val questionText: String
    val answer: T
)
```
**Find the bug:** Missing comma between constructor parameters.

**Fixed code:**
```kotlin
class Question<T>(
    val questionText: String,
    val answer: T
)
```
**شرح الحل:**
1. معاملات الباني (Constructor parameters) يجب أن تُفصل بفاصلة `,`.
2. بدون الفاصلة، الكومبايلر لا يستطيع تمييز نهاية معامل وبداية آخر، فيحدث خطأ ترجمة.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Add a New Subclass — `scenario`
**Scenario / Task:**
Create a new subclass `SmartLockDevice` that inherits from `SmartDevice`, and add a property `isLocked: Boolean` and a function `toggleLock()`.

**Requirements:**
1. Make `SmartDevice` inheritable if it isn't already.
2. Override `turnOn()` to also print the lock status.

**نموذج الحل:**
```kotlin
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    open fun turnOn() { deviceStatus = "on" }
}

class SmartLockDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(deviceName, deviceCategory) {
    var isLocked: Boolean = true

    fun toggleLock() {
        isLocked = !isLocked
        println("Lock status: ${if (isLocked) "Locked" else "Unlocked"}")
    }
    override fun turnOn() {
        super.turnOn()
        println("$name turned on. Lock status: ${if (isLocked) "Locked" else "Unlocked"}")
    }
}
```

---

### Exercise 2: Fill the Gaps — `fill_gaps`
**Scenario / Task:**
Complete the missing parts (`______`) so the code compiles and runs correctly.
```kotlin
______ class SmartDevice(val name: String) {
    open fun turnOn() { println("$name on") }
}
class SmartFan(name: String) : ______(name) {
    override fun turnOn() {
        ______.turnOn()
        println("Fan spinning")
    }
}
```

**نموذج الحل:**
```kotlin
open class SmartDevice(val name: String) {
    open fun turnOn() { println("$name on") }
}
class SmartFan(name: String) : SmartDevice(name) {
    override fun turnOn() {
        super.turnOn()
        println("Fan spinning")
    }
}
```

---

### Exercise 3: Convert to Enum — `code_fix`
**Scenario / Task:**
The following code uses `String` for difficulty, which allows invalid values. Refactor it to use `enum class`.
```kotlin
class Question(val text: String, val difficulty: String)
val q = Question("2+2=?", "mediumm") // typo, still compiles!
```

**Requirements:**
1. Define an `enum class Difficulty`.
2. Update `Question` to use it.

**نموذج الحل:**
```kotlin
enum class Difficulty { EASY, MEDIUM, HARD }
class Question(val text: String, val difficulty: Difficulty)
val q = Question("2+2=?", Difficulty.MEDIUM) // typo أصبح مستحيلاً الآن
```

---

### Exercise 4: Build a Property Delegate — `scenario`
**Scenario / Task:**
Create a delegate `PositiveNumber` that ensures a property can never be set to a negative value (silently ignore invalid assignments).

**Requirements:**
1. Implement `ReadWriteProperty<Any?, Int>`.
2. Use it for a property `score`.

**نموذج الحل:**
```kotlin
class PositiveNumber(initialValue: Int) : ReadWriteProperty<Any?, Int> {
    var fieldData = initialValue
    override fun getValue(thisRef: Any?, property: KProperty<*>): Int = fieldData
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value >= 0) fieldData = value
    }
}

class Player {
    var score by PositiveNumber(0)
}
```

---

### Exercise 5: Companion Object Counter — `scenario`
**Scenario / Task:**
Add a `companion object` inside class `Device` that tracks how many devices have been created (`deviceCount`), incrementing it in the primary constructor's `init` block.

**نموذج الحل:**
```kotlin
class Device(val name: String) {
    companion object {
        var deviceCount: Int = 0
    }
    init {
        deviceCount++
    }
}

fun main() {
    Device("A")
    Device("B")
    println(Device.deviceCount) // 2
}
```

---

### Exercise 6: Extension Function Practice — `scenario`
**Scenario / Task:**
Write an extension function `String.isValidDeviceName()` that returns `true` if the string is not blank and has at least 3 characters.

**نموذج الحل:**
```kotlin
fun String.isValidDeviceName(): Boolean {
    return this.isNotBlank() && this.length >= 3
}

fun main() {
    println("TV".isValidDeviceName())      // false
    println("Android TV".isValidDeviceName()) // true
}
```

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: Overriding with super
**Input:**
```kotlin
open class A { open fun show() = "A" }
class B : A() { override fun show() = "B-" + super.show() }
class C : B() { override fun show() = "C-" + super.show() }
fun main() { println(C().show()) }
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استدعاء `C().show()` | ؟ |
| 2 | داخل `C.show()`، استدعاء `super.show()` (أي B) | ؟ |
| 3 | داخل `B.show()`، استدعاء `super.show()` (أي A) | ؟ |
| 4 | دمج النتائج | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استدعاء `C().show()` | يبدأ تنفيذ `"C-" + super.show()` |
| 2 | `super.show()` في C يستدعي B | ينفّذ `"B-" + super.show()` في B |
| 3 | `super.show()` في B يستدعي A | يُرجع `"A"` |
| 4 | دمج النتائج تصاعدياً | B ترجع `"B-A"`، ثم C ترجع `"C-B-A"` |

**Result:** `"C-B-A"`

---

### Trace Exercise 2: Property Setter with Range Check
**Input:**
```kotlin
var channel = 1
    set(value) { if (value in 0..200) field = value }

fun main() {
    channel = 50
    channel = 300
    channel = -5
    println(channel)
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `channel = 50` | ؟ |
| 2 | `channel = 300` | ؟ |
| 3 | `channel = -5` | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `channel = 50` → 50 ضمن `0..200` | `field = 50`، القيمة أصبحت 50 |
| 2 | `channel = 300` → 300 خارج `0..200` | الشرط يفشل، `field` تبقى 50 |
| 3 | `channel = -5` → -5 خارج `0..200` | الشرط يفشل، `field` تبقى 50 |

**Result:** `50`

---

### Trace Exercise 3: Singleton Shared State
**Input:**
```kotlin
object Score {
    var points = 0
}
fun addPoints(p: Int) { Score.points += p }
fun main() {
    addPoints(10)
    addPoints(5)
    val ref = Score
    ref.points += 3
    println(Score.points)
}
```

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `addPoints(10)` | ؟ |
| 2 | `addPoints(5)` | ؟ |
| 3 | `ref.points += 3` | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `addPoints(10)` → `Score.points = 0 + 10` | `points = 10` |
| 2 | `addPoints(5)` → `Score.points = 10 + 5` | `points = 15` |
| 3 | `ref.points += 3` (نفس الكائن Singleton) → `15 + 3` | `points = 18` |

**Result:** `18`

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: Class Hierarchy Design — `uml_design`
**Task:**
Design a class hierarchy for a "Smart Home Security System" containing a base class `SecurityDevice` (with `name`, `isActive`), and two subclasses: `SmartCamera` (with `resolution`) and `SmartAlarm` (with `volumeLevel`). Draw the relationship diagram and specify which members should be `open`/`override`.

**نموذج الإجابة:**
```diagram
type: class
title: Smart Home Security System
direction: TD
nodes:
  - id: SecurityDevice
    label: SecurityDevice (name, isActive)
    kind: class
    level: 0
  - id: SmartCamera
    label: SmartCamera (resolution)
    kind: class
    level: 1
  - id: SmartAlarm
    label: SmartAlarm (volumeLevel)
    kind: class
    level: 1
edges:
  - from: SmartCamera
    to: SecurityDevice
  - from: SmartAlarm
    to: SecurityDevice
```
```kotlin
open class SecurityDevice(val name: String) {
    var isActive: Boolean = false
    open fun activate() { isActive = true }
}
class SmartCamera(name: String, val resolution: String) : SecurityDevice(name) {
    override fun activate() {
        super.activate()
        println("$name camera activated at $resolution")
    }
}
class SmartAlarm(name: String, val volumeLevel: Int) : SecurityDevice(name) {
    override fun activate() {
        super.activate()
        println("$name alarm activated at volume $volumeLevel")
    }
}
```

**معايير التقييم:**
- استخدام `open` بشكل صحيح على الصنف الأب والدوال القابلة للتجاوز.
- تطبيق علاقة IS-A بشكل منطقي (كاميرا/إنذار "هو نوع من" جهاز أمان).
- استدعاء `super` عند الحاجة للحفاظ على السلوك المشترك.

---

### Design Question 2: HAS-A Composition Design — `architecture`
**Task:**
Design a `SmartHome` system using composition (HAS-A) that contains one `SmartCamera` and one `SmartAlarm` (from Design Question 1), with a method `activateAllDevices()`.

**نموذج الإجابة:**
```kotlin
class SmartHome(
    val camera: SmartCamera,
    val alarm: SmartAlarm
) {
    fun activateAllDevices() {
        camera.activate()
        alarm.activate()
    }
}
```

**معايير التقييم:**
- التمييز الصحيح بين علاقة HAS-A (لا وراثة هنا) وIS-A.
- تفويض الاستدعاءات بشكل صحيح لكل كائن فرعي.
- وضوح التصميم في تجميع أجهزة متعددة داخل صنف واحد منسّق.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What are the three major parts of a Kotlin class?
A: Properties, methods, and constructors.

---

**Q2:** Why are all Kotlin classes `final` by default?
A: To prevent unintended inheritance and encourage deliberate class design.

---

**Q3:** What keyword allows a class to be inherited?
A: `open`.

---

**Q4:** What is the difference between a primary and secondary constructor?
A: The primary constructor is part of the class header and has no body; the secondary constructor is defined inside the class body and can contain initialization logic, but must delegate to the primary constructor with `this(...)`.

---

**Q5:** What does the `super` keyword do?
A: It calls the overridden method or property from the superclass instead of the subclass.

---

**Q6:** What is a "backing field" in Kotlin properties?
A: An auto-generated internal variable (`field`) used inside `get()`/`set()` to store the property's actual value.

---

**Q7:** What is the difference between IS-A and HAS-A relationships?
A: IS-A is an inheritance relationship (a subclass is a type of its superclass); HAS-A is a composition relationship (an object owns an instance of another class without being that type).

---

**Q8:** Which visibility modifier restricts access to the same class or source file only?
A: `private`.

---

**Q9:** What is the purpose of a `data class`?
A: To automatically generate `equals()`, `hashCode()`, `toString()`, `componentN()`, and `copy()` for classes that only hold data.

---

**Q10:** What is the difference between `object` and `companion object`?
A: `object` creates a standalone singleton; `companion object` is a singleton defined inside another class, allowing access to its members through the class name.

---

**Q11:** What does an extension function allow you to do?
A: Add new functions or properties to an existing class without modifying its source code or inheriting from it.

---

**Q12:** What does the `let()` scope function provide?
A: A way to reference an object using `it` inside a lambda, instead of repeating the object's full name.

---

**Q13:** What does `apply()` return?
A: A reference to the same object it was called on, after executing a configuration block.

---

**Q14:** What interface must a `var` property delegate implement?
A: `ReadWriteProperty`.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> مرجع كامل يجمع جميع الأجزاء المتفرقة للنظام (Smart Home) كما ورد عبر المحاضرة بأكملها في كود واحد متكامل.

```kotlin
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

// ---------- Base class with primary + secondary constructor ----------
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

// ---------- Property delegate for range-limited values ----------
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

// ---------- Subclasses (IS-A relationship) ----------
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

// ---------- Composition (HAS-A relationship) ----------
class SmartHome(
    val smartTvDevice: SmartTvDevice,
    val smartLightDevice: SmartLightDevice
) {
    var deviceTurnOnCount = 0
        private set

    fun turnOnTv() { deviceTurnOnCount++; smartTvDevice.turnOn() }
    fun turnOffTv() { deviceTurnOnCount--; smartTvDevice.turnOff() }
    fun increaseTvVolume() { smartTvDevice.increaseSpeakerVolume() }
    fun changeTvChannelToNext() { smartTvDevice.nextChannel() }
    fun turnOnLight() { deviceTurnOnCount++; smartLightDevice.turnOn() }
    fun turnOffLight() { deviceTurnOnCount--; smartLightDevice.turnOff() }
    fun increaseLightBrightness() { smartLightDevice.increaseBrightness() }
    fun turnOffAllDevices() {
        turnOffTv()
        turnOffLight()
    }
}

// ---------- Generics, enum, data class ----------
enum class Difficulty { EASY, MEDIUM, HARD }

data class Question<T>(
    val questionText: String,
    val answer: T,
    val difficulty: Difficulty
)

// ---------- Interface + companion object + extension functions ----------
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
        question1.let { println(it.questionText); println(it.answer); println(it.difficulty) }
        println()
        question2.let { println(it.questionText); println(it.answer); println(it.difficulty) }
        println()
        question3.let { println(it.questionText); println(it.answer); println(it.difficulty) }
        println()
    }
}

// ---------- Entry point ----------
fun main() {
    var smartDevice: SmartDevice = SmartTvDevice("Android TV", "Entertainment")
    smartDevice.turnOn()
    smartDevice = SmartLightDevice("Google Light", "Utility")
    smartDevice.turnOn()

    val quiz = Quiz().apply {
        printQuiz()
        printProgressBar()
    }
}
```

**المكتبات المطلوبة (Imports):**
> `import kotlin.properties.ReadWriteProperty`
> `import kotlin.reflect.KProperty`

**الناتج المتوقع (لقطة الشاشة):**
> Android TV is turned on. Speaker volume is set to 2 and channel number is set to 1.
> Google Light turned on. The brightness level is 2.
> (تليها تفاصيل الأسئلة الثلاثة، ثم ▓▓▓▒▒▒▒▒▒▒ و"3 of 10 answered")

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: Explain the three main components of a Kotlin class.
**نموذج الإجابة:** الصنف في كوتلن يتكون من: (1) **الخصائص (Properties)** — متغيرات تمثل بيانات الكائن؛ (2) **الدوال (Methods)** — تمثل السلوكيات والأفعال؛ (3) **الباني (Constructor)** — دالة خاصة تهيئ الكائن عند إنشائه. مثال: `class SmartDevice(val name: String) { fun turnOn() {...} }`.

---

### Question 2: Why does Kotlin require the `open` keyword for inheritance?
**نموذج الإجابة:** لأن كوتلن يجعل كل الأصناف `final` (غير قابلة للوراثة) افتراضياً، لتشجيع تصميم واعٍ ومدروس للعلاقات بين الأصناف، ومنع الأخطاء الناتجة عن وراثة غير مقصودة قد تكسر افتراضات الصنف الأصلي. يُستخدم متى ما أردنا السماح لصنف آخر بالوراثة منه، عبر كتابة `open class`.

---

### Question 3: Describe the difference between IS-A and HAS-A relationships with examples.
**نموذج الإجابة:** علاقة **IS-A** (الوراثة) تعني أن الصنف الفرعي "هو نوع من" الصنف الأب، مثل `SmartTvDevice : SmartDevice`. علاقة **HAS-A** (التركيب) تعني أن الكائن "يملك" كائناً آخر كخاصية دون أن يكون من نفس نوعه، مثل `SmartHome` التي تملك `SmartTvDevice` و`SmartLightDevice` كخصائص. تُستخدم HAS-A عندما لا تنطبق علاقة "نوع من" منطقياً.

---

### Question 4: What is a backing field and when is it used?
**نموذج الإجابة:** الـ`backing field` (يُشار له بـ`field`) هو متغير داخلي مخفي يولّده كوتلن تلقائياً لتخزين القيمة الفعلية لخاصية `var`. يُستخدم فقط داخل دالتي `get()` و`set()` الخاصتين بنفس الخاصية، ويُستخدم عادة لإضافة منطق تحقق (مثل حصر نطاق قيم مسموح) قبل تحديث القيمة الفعلية.

---

### Question 5: Compare primary and secondary constructors.
**نموذج الإجابة:** الباني الرئيسي (Primary) جزء من ترويسة الصنف، صنف واحد فقط لكل class، وليس له جسم (body) — يُستخدم لتهيئة الخصائص مباشرة. الباني الثانوي (Secondary) يُعرَّف داخل جسم الصنف، يمكن أن يكون هناك عدة بواني ثانوية، وله جسم يحتوي منطق تهيئة إضافي، لكنه يجب أن يُفوِّض التهيئة للباني الرئيسي عبر `this(...)`.

---

### Question 6: What problem do Generics solve?
**نموذج الإجابة:** الـGenerics تحل مشكلة تكرار كتابة نفس بنية الصنف لكل نوع بيانات مختلف. بدل كتابة `QuestionString` و`QuestionInt` بشكل منفصل، تُكتب `Question<T>` مرة واحدة، ويُحدَّد النوع الفعلي (`String`, `Int`, ...) وقت إنشاء الكائن، مما يوفر مرونة مع الحفاظ على أمان الأنواع (Type Safety) وقت الترجمة.

---

### Question 7: Explain the purpose and benefits of using `data class`.
**نموذج الإجابة:** `data class` تُستخدم للأصناف التي تحتوي بيانات فقط بدون سلوك حقيقي. تفيدنا لأنها تولّد تلقائياً دوال أساسية مهمة: `equals()` لمقارنة الكائنات بمحتواها، `hashCode()`, `toString()` لعرض محتوى الكائن بشكل مقروء، `componentN()` للتفكيك (destructuring)، و`copy()` لإنشاء نسخة معدَّلة من كائن موجود بسهولة.

---

### Question 8: What is the role of an interface, and how does it differ from simply writing extension functions?
**نموذج الإجابة:** الـ`interface` يمثل عقداً يحدد الدوال/الخصائص الواجب تطبيقها في أي صنف يعتمده، مما يضمن الاتساق بين عدة أصناف تطبّقه ويجبر الكومبايلر على تحديث كل الأصناف عند تعديل العقد. بينما الـExtension functions تضيف سلوكاً لصنف واحد دون فرض أي التزام أو عقد على أصناف أخرى، فهي أقل صرامة وأكثر مرونة لكن لا تضمن الاتساق كما تفعل الـinterface.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين الـclass والـobject (Instance).
- [ ] أستطيع كتابة primary constructor وsecondary constructor بشكل صحيح.
- [ ] أفهم لماذا كل الأصناف في كوتلن `final` افتراضياً وكيف أستخدم `open`.
- [ ] أستطيع تجاوز دالة/خاصية باستخدام `override` واستدعاء `super` عند الحاجة.
- [ ] أميّز بين علاقة IS-A (الوراثة) وHAS-A (التركيب) بأمثلة واقعية.
- [ ] أعرف الفرق بين `private`, `protected`, `internal`, `public` ومتى أستخدم كل واحد.
- [ ] أفهم مفهوم backing field (`field`) واستخدامه في `get()`/`set()`.
- [ ] أستطيع بناء وتطبيق Property Delegate باستخدام `ReadWriteProperty`.
- [ ] أفهم الـGenerics `<T>` وكيف تستخدم مع أكثر من نوع بيانات.
- [ ] أعرف متى أستخدم `enum class` بدل `String` حر.
- [ ] أعرف الدوال المولَّدة تلقائياً في `data class`.
- [ ] أفهم الفرق بين `object` المستقل و`companion object`.
- [ ] أستطيع كتابة extension function/property لصنف موجود.
- [ ] أفهم الفرق بين `interface` وExtension من ناحية الالتزام والاتساق.
- [ ] أعرف استخدام دوال النطاق `let()` و`apply()` والفرق بينهما.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Kotlin Basics | Kotlin OOP (هذه المحاضرة) | الـval/var وType Inference أساس تعريف الخصائص هنا |
| Kotlin OOP (هذه المحاضرة) | Kotlin Advanced (هذه المحاضرة) | الأصناف الأساسية تُستخدم كقاعدة لتطبيق Generics/Enum/Data class عليها |
| Kotlin Advanced (هذه المحاضرة) | Compose UI | مفاهيم State/Data class تُستخدم لاحقاً في نمذجة حالة الواجهة (UI State) |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| الوراثة | كل صنف `final` افتراضياً؛ استخدم `open` للسماح بالوراثة والتجاوز |
| الرؤية | private < protected < internal < public (من الأكثر تقييداً للأقل) |
| Generics/Enum/Data | استخدمها لتقليل تكرار الكود وزيادة أمان الأنواع |
| Object/Companion | لإدارة حالة مشتركة (Singleton) أو تنظيم أعضاء مرتبطين بصنف |
| Extensions/Interfaces | الأولى مرنة وسريعة، الثانية تفرض عقداً واتساقاً |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `open` | يسمح بالوراثة/التجاوز | الصنف الأب والدوال/الخصائص القابلة للتجاوز |
| `override` | يعيد تعريف عنصر موروث | الصنف الفرعي |
| `super` | يشير لسلوك الأب | داخل الدالة المتجاوَزة |
| `field` | التخزين الداخلي للخاصية | داخل `get()`/`set()` |
| `<T>` | نوع عام غير محدد | صنف Generics |
| `by` | تفويض get/set لكائن خارجي | Property delegate |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | لا وراثة بدون `open` على الصنف الأب |
| 2 | لا `override` بدون `open` على العنصر الأصلي |
| 3 | `data class` فقط للأصناف التي تحمل بيانات دون سلوك حقيقي |
| 4 | استخدم `enum class` كلما كانت القيم محدودة ومعروفة مسبقاً |
| 5 | `companion object` للأعضاء المرتبطين منطقياً بصنف معين |

<!-- VALIDATION: تم توليد هذا الدليل الدراسي اعتماداً على محتوى ملف android-kotlin.md (محاضرة Kotlin Fundamentals for Android -2-) وتعليمات custome_prompt.md. لم يُرفق SCHEMA.md v1.0 المرجعي، فتم اعتماد قوالب التنسيق الموصوفة داخل custome_prompt.md نفسه. جميع الأمثلة البرمجية مأخوذة أو مبنية مباشرة على محتوى المحاضرة الأصلية دون إضافة تقنيات خارج نطاقها (Swift/Flutter/React Native) وفق الممنوعات المذكورة. -->

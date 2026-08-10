# المحاضرة 4 — Advanced JavaScript Features (الخصائص المتقدمة في جافاسكريبت)
> **المادة:** تطوير تطبيقات الويب (القسم العملي) | **الموضوع:** `Closures`، `Currying`، `Destructuring`، `Spread Operator`، `Rest Operator`، `Generators`

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تشرح ست خصائص متقدمة في `JavaScript` (الإصدار `ES6` وما بعده) تخلي الكود أقصر، أذكى، وأسهل في إعادة الاستخدام: `Closures`، `Currying`، `Destructuring`، `Spread Operator`، `Rest Operator`، و`Generators`.

### 🎯 ستتعلم
- **`Closures`** — كيف تتذكر الدالة متغيرات الدالة اللي احتوتها حتى بعد ما تنتهي تلك الدالة من التنفيذ
- **`Currying`** — كيف تحوّل دالة تاخذ عدة parameters إلى سلسلة دوال كل وحدة تاخذ parameter واحد
- **`Destructuring`** — كيف تسحب قيم من array أو object مباشرة إلى متغيرات، حتى داخل parameters الدالة نفسها
- **`Spread Operator` (`...`)** — كيف "تفرد" عناصر array أو object لتستخدمها منفردة (نسخ، دمج، تمرير كـ arguments)
- **`Rest Operator` (`...`)** — كيف تجمع عناصر متعددة (باقي الـ arguments أو باقي عناصر array) في متغير واحد
- **`Generators`** — كيف تكتب دالة تقدر "توقف" تنفيذها مؤقتاً بـ `yield` وتكمل لاحقاً من نفس النقطة

### 📚 المتطلبات السابقة
- **أساسيات `JavaScript`** — تعريف الدوال (`function`)، الـ `scope`، الـ arrays والـ objects — لأن كل خاصية جديدة هنا هي بناء فوق مفهوم الدالة العادية
- **أساسيات `HTML` و`CSS`** — مذكورة كمتطلب عام للمادة، لكنها غير مستخدمة مباشرة في محتوى هذه المحاضرة تحديداً

### 💡 الأفكار الرئيسية

خلّك تتخيل إنك تكتب دالة عادية في `JavaScript`. عادة، أول ما تنتهي الدالة من التنفيذ، كل المتغيرات المحلية اللي كانت جواها "تروح" — الـ `JavaScript engine` ينظفها من الذاكرة لأنه ما فيه أحد محتاجها بعد. لكن فيه حالة خاصة: لو الدالة الخارجية رجّعت دالة داخلية، وهذي الداخلية بتستخدم متغير من الخارجية — الـ engine ما يقدر يمسح ذاك المتغير، لأن فيه دالة لسا "شايفاه" ومحتاجاه. هذا بالضبط اسمه **`closure`**: الدالة الداخلية "تتذكر" الـ scope اللي وُلدت فيه، حتى لو الدالة الخارجية خلصت.

مثال المحاضرة كان `makeCounter()`: هذي دالة فيها متغير `count = 0`، وترجّع دالة صغيرة تسوي `++count` وترجعه. لما تسوي `const counter = makeCounter()`، أنت فعلياً حصلت على دالة مرتبطة بنسخة خاصة فيها من `count` محفوظة في الذاكرة. كل مرة تنادي `counter()`، القيمة تزيد وتفضل محفوظة — مو صفر من جديد. هذا هو أساس **data encapsulation** (إخفاء البيانات): بدل ما تخلي `count` متغير عام يقدر أي حد يعدله، خليته "مخبّى" جوه closure ما أحد يوصله إلا عن طريق الدالة اللي رجعتها.

> 🎯 **جملة الامتحان:** الـ `closure` هو دالة تحتفظ بحق الوصول (access) إلى متغيرات الـ `scope` الخارجي حتى بعد انتهاء تنفيذ تلك الدالة الخارجية.

من الـ `closures` نروح لفكرة قريبة منها جداً اسمها **`currying`**. الفكرة إنك بدل ما تكتب دالة تاخذ كل الـ parameters مرة وحدة زي `multiply(a, b)`، تكتبها كسلسلة دوال متداخلة: دالة تاخذ `a` وترجع دالة تاخذ `b` وترجع الناتج. مثال المحاضرة: `multiply(a)` ترجع `function(b) { return a * b; }`. لما تكتب `const double = multiply(2)`، أنت أنشأت دالة جديدة "تتذكر" إن `a = 2` (بفضل الـ closure!) — وبعدها `double(5)` تعطيك `10`. لاحظ الرابط: `currying` مبني بالكامل على مبدأ الـ `closure` اللي شرحناه فوق، لأن كل دالة داخلية لازم "تتذكر" الـ argument اللي مرّ عليها سابقاً.

مع `ES6` صار فيه طريقة أقصر تكتب فيها الـ curried functions باستخدام `arrow functions`: `const add = a => b => a + b;`. نفس الفكرة تماماً، بس بسطر واحد بدل خمسة أسطر. الفايدة العملية من الـ `currying` تظهر في شي اسمه **partial application** — يعني تقدر "تجهز" جزء من الـ arguments مسبقاً وتحصل على دالة جاهزة تستخدمها بعدين بدون ما تكرر نفس القيمة كل مرة، وهذا مفيد جداً في الـ **functional composition** (تركيب الدوال ببعض).

> 🎯 **جملة الامتحان:** الـ `currying` هو تحويل دالة متعددة الـ parameters إلى سلسلة دوال، كل دالة تاخذ parameter واحد فقط وترجع الدالة التالية.

الفكرة الثالثة هي **`destructuring`**، واللي هي طريقة لاستخراج قيم من `array` أو `object` وتوزيعها على متغيرات في سطر واحد، بدل ما تكتب `const x = arr[0]; const y = arr[1];` كل مرة. للـ arrays تستخدم الأقواس المربعة بنفس ترتيب العناصر: `const [x, y] = [10, 20]`. للـ objects تستخدم الأقواس المعقوفة وتطابق أسماء الخصائص بالضبط: `const { name, age } = user`. والأقوى من هذا إنك تقدر تسوي الـ destructuring **مباشرة داخل parameters الدالة نفسها** — بدل ما تستقبل object كامل وبعدين تفكّه جوه الدالة، تكتب `function greet({ name, age }) { ... }` وتستقبل القيم جاهزة مباشرة. هذا مرتب جداً خصوصاً لما تكون الدالة تحتاج أكثر من خاصية من نفس الـ object.

المحاضرة أعطت مثال متقدم يجمع `destructuring` مع مفهومين جايين بعده (`rest` والـ `recursion`): دالة `reverse` تعكس ترتيب array باستخدام array destructuring مع الـ rest syntax:
`let reverse = ([x, ...y]) => y.length > 0 ? [...reverse(y), x] : [x];`
هذا السطر يفكك أول عنصر (`x`) وباقي العناصر (`y`) في نفس وقت استقبال الـ parameter، وبعدين ينادي نفس الدالة على الباقي (`recursion`) ويحط `x` في الآخر.

> 🎯 **جملة الامتحان:** الـ `destructuring` يسمح باستخراج قيم من `array` أو `object` وتوزيعها على متغيرات مباشرة، حتى داخل توقيع (`signature`) الدالة نفسها.

الآن نجي لأخوين متشابهين شكلاً بس عكس بعض في الوظيفة: **`Spread Operator`** و**`Rest Operator`**. الاثنين يستخدمون نفس الرمز `...` بالضبط، لكن الفرق كله في **السياق** اللي يُستخدم فيه:

- الـ **`spread`** يُستخدم لما عندك array أو object جاهز وتبي **"تفرده"** إلى عناصره المنفردة — مثلاً `console.log(...nums)` يطبع كل عنصر لحاله بدل الـ array كامل، أو `[...arr1, 3, 4]` يعمل نسخة من `arr1` ويضيف عليها عناصر جديدة، أو `{...obj1, c: 3}` يسوي نفس الشي للـ objects. هذا مفيد جداً في **cloning** (النسخ)، **concatenation** (الدمج)، وتمرير عناصر array كـ arguments منفصلة لدالة.

- الـ **`rest`** يُستخدم بالعكس تماماً: عندك عدة قيم متفرقة (arguments لدالة، أو عناصر array) وتبي **تجمعهم** في متغير واحد. مثال: `function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }` — هنا `...nums` يجمع كل الـ arguments اللي تُمرر للدالة في array واحد اسمه `nums`، بغض النظر كم عددهم. ونفس الفكرة في الـ destructuring: `const [first, ...rest] = [10, 20, 30, 40]` تاخذ أول عنصر لحاله، وتجمع الباقي في array اسمه `rest`.

القاعدة الذهبية اللي لازم تحفظها: **الـ `spread` يوسّع (expand)، والـ `rest` يجمع (gather)** — نفس الرمز `...`، لكن الاتجاه معاكس حسب مكان استخدامه.

> 🎯 **جملة الامتحان:** الـ `spread operator` يوسّع array أو object إلى عناصر منفردة، بينما الـ `rest operator` يجمع عناصر متعددة في array أو object واحد — الرمز واحد (`...`) لكن الاتجاه معاكس حسب السياق.

آخر فكرة في المحاضرة هي **`Generators`**، وهي نوع خاص من الدوال يقدر "يوقف" تنفيذه في منتصف الطريق ويكمل لاحقاً بالضبط من نفس النقطة اللي وقف عندها — شي مستحيل مع الدوال العادية. تُعرَّف بإضافة نجمة بعد كلمة `function`: `function* generatorFunc() { ... }`، وجوه الدالة تستخدم كلمة `yield` بدل `return` عشان "تُرجع" قيمة بدون ما تنهي تنفيذ الدالة بالكامل. كل مرة تنادي `.next()` على الـ generator، التنفيذ يكمل من آخر `yield` توقف عنده لحد ما يوصل الـ `yield` التالي (أو ينتهي).

مثال المحاضرة: `idGenerator()` فيها `while (true) { yield id++; }` — لو كانت دالة عادية، الـ `while(true)` كان راح يعلّق البرنامج للأبد. لكن بما إنها `generator`، كل نداء `.next()` يرجع قيمة واحدة بس ويوقف، وما يكمل إلا لما تناديها مرة ثانية. هذا يخليها مثالية لثلاث حالات: **Iterators** (بناء أدوات تكرار مخصصة)، **Lazy evaluation** (حساب القيم بس وقت الحاجة، مو كلها دفعة وحدة — مهم جداً مع قوائم لا نهائية زي `while(true)`)، و**Asynchronous control flows** (التحكم بتدفق العمليات غير المتزامنة).

> 🎯 **جملة الامتحان:** الـ `generator function` (معرّفة بـ `function*`) تقدر توقف تنفيذها مؤقتاً باستخدام `yield` وتستأنفه لاحقاً عبر استدعاء `.next()`، بدون فقدان حالتها الداخلية.

---

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
كثير من المبتدئين يعتقدون إن `Spread` و`Rest` "نفس الشي" لأن الرمز متطابق `...`، فيخلطون بينهم ويحاولون يستخدمون واحد مكان الثاني.

#### الفهم الصحيح ✅:
الفرق هو **الموقع والاتجاه**: لو الـ `...` ظاهرة داخل قيمة موجودة (array/object literal أو استدعاء دالة) فهي `spread` (توسيع). لو ظاهرة في مكان استقبال قيم (function parameters أو الطرف الأيسر من destructuring) فهي `rest` (تجميع). مثال: `[...arr1, 3, 4]` = `spread`، بينما `function sum(...nums)` = `rest`.

---

### 🔗 الاتصالات مع مواضيع أخرى
- **ما قبله:** هذه المحاضرة تفترض إنك عارف الدوال العادية والـ scope في `JavaScript` — كل شي هنا بناء فوقها
- **الجاي بعده:** مفاهيم `closures` و`generators` أساسية لفهم البرمجة غير المتزامنة (`async/await`، `Promises`) في المحاضرات القادمة، والـ `destructuring`/`spread`/`rest` تُستخدم بكثرة جداً مع `React` والـ `Express` لاحقاً

---

### لما تحتاج هذا في الامتحان
غالباً الأسئلة تكون من نوع "ما ناتج هذا الكود؟" على `closures` (خصوصاً لما فيه أكثر من نداء متتالي للدالة الراجعة)، أو "أيهم `spread` وأيهم `rest`؟" في سطر كود معين، أو تتبع تنفيذ `generator` مع أكثر من `.next()`. كمان توقع سؤال يقارن بين `destructuring` العادي و`destructuring` جوه parameters الدالة.

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. Closures

#### 1.1. تعريف الـ Closure والتقاط الحالة (Capturing State)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "js_basics_scope"} -->

##### 📍 أين نحن الآن؟
أول موضوع في المحاضرة — الأساس اللي بتبنى عليه فكرة `currying` بعده.

##### ⬅️ الربط مع السابق
يبني مباشرة على مفهوم الـ `scope` في `JavaScript` من الأساسيات: كل دالة عندها `scope` خاص بها، والسؤال هنا "شنو يصير لهذا الـ scope بعد ما الدالة تخلص؟"

##### 💡 الفكرة الأساسية
**الـ `closure` يصير لما دالة "تتذكر" متغيرات الـ scope الخارجي اللي وُلدت فيه، حتى بعد ما تلك الدالة الخارجية تخلص تنفيذها.**

---

##### 💻 الكود
```javascript
function makeCounter() {
  let count = 0;               // private variable, only accessible inside makeCounter
  return function () {         // inner function returned to the caller
    return ++count;            // increments and returns the remembered variable
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

##### شرح كل سطر:
1. `function makeCounter()` → دالة خارجية (`outer function`) — تُنشئ الـ `scope` اللي بيصير closure
2. `let count = 0;` → متغير محلي داخل `makeCounter` — هذا هو المتغير اللي رح يُحفظ بالـ closure
3. `return function () {...}` → دالة داخلية (`inner function`) تُرجَع كناتج — بمجرد ما تُرجَع، هي تحمل معها مرجع لـ `count`
4. `return ++count;` → تزيد `count` بواحد ثم ترجعه — بما إنها داخل الـ closure، القيمة تتراكم بدل ما ترجع لصفر
5. `const counter = makeCounter();` → استدعاء `makeCounter` مرة واحدة فقط، ينشئ نسخة واحدة خاصة من `count`
6. `counter()` و`counter()` مرة ثانية → كل نداء يستخدم نفس نسخة `count` المحفوظة، فالقيمة تستمر بالزيادة

##### 📖 الشرح
عادة، لما دالة تنتهي من التنفيذ، الـ `JavaScript engine` يحرر الذاكرة المخصصة لمتغيراتها المحلية لأنه ما فيه أحد يحتاجها بعد — هذا يسمى `garbage collection`. لكن في حالة `makeCounter`، الدالة الخارجية ترجع دالة داخلية بتستخدم `count`. طالما فيه مرجع (`reference`) حي لهذي الدالة الداخلية (وهو المتغير `counter`)، الـ engine ما يقدر يحرر `count` من الذاكرة، لأنها لسا "مطلوبة".

هذا يعني إن `count` صارت فعلياً **متغير خاص** — ما فيه أي طريقة توصله من برا إلا عن طريق نداء `counter()`. ما تقدر تكتب `makeCounter.count` ولا أي شي مشابه، لأن `count` ليست خاصية على الدالة، هي متغير محفوظ داخل الـ `closure` بس.

لو ناديت `makeCounter()` مرة ثانية (`const counter2 = makeCounter();`)، بتحصل على `closure` جديد كلياً، بنسخة `count` مستقلة عن الأولى تبدأ من صفر من جديد.

##### 💡 التشبيه:
> فكّر في `closure` مثل حقيبة سفر شخصية: لما تسافر (الدالة الخارجية تخلص)، أغراضك الخاصة (`count`) ما تختفي — تظل معك جوه الحقيبة (الدالة الداخلية) لأنك محتاجها.
> **وجه الشبه:** الحقيبة = الدالة الداخلية المُرجَعة، الأغراض الخاصة = المتغيرات المحفوظة بالـ `closure`.

##### 🎯 الملخص السريع
- الـ `closure` يصير تلقائياً لما دالة داخلية تُرجَع من دالة خارجية وتستخدم متغيرات منها
- المتغيرات تفضل محفوظة بالذاكرة طالما فيه مرجع حي للدالة الداخلية
- كل نداء جديد للدالة الخارجية ينشئ `closure` مستقل بنسخته الخاصة من المتغيرات

> 🎯 **جملة الامتحان:** الـ `closure` هو دالة تحتفظ بحق الوصول إلى متغيرات الـ `scope` الخارجي حتى بعد انتهاء تنفيذ الدالة الخارجية.

##### 📚 التطبيق
أساس مباشر لموضوع `currying` القادم، ومهم جداً لاحقاً في الـ `event handlers`، الـ `callbacks`، والبرمجة غير المتزامنة.

##### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو أضفنا `const counter2 = makeCounter();` وناديت `counter2()`، شنو تكون قيمتها الأولى؟
> **لماذا هذا مهم؟** لأنه يختبر فهمك إن كل نداء لـ `makeCounter()` ينشئ `closure` مستقل تماماً — الجواب `1`، مو استكمال من `counter`.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A closure is created when a function "remembers" the variables from its outer scope, even after the outer function has finished executing.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف الـ `closure`، مثال `makeCounter`، سبب بقاء `count` بالذاكرة، وخاصية الاستقلالية بين النداءات المتكررة
- ℹ️ إضافة من الدليل: تشبيه حقيبة السفر، سؤال تفعيل الفهم عن `counter2`

</details>

---

#### 1.2. الاستخدامات الواقعية (Real-World Uses)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1"} -->

##### 📍 أين نحن الآن؟
بعد ما فهمنا آلية عمل الـ `closure`، الآن نشوف وين يُستخدم فعلياً في مشاريع حقيقية.

##### ⬅️ الربط مع السابق
كل الاستخدامات هنا مبنية مباشرة على نفس فكرة `makeCounter()` اللي شرحناها.

##### 💡 الفكرة الأساسية
**الـ `closures` أساسية في: `data encapsulation`، `function factories`، الحفاظ على `private state`، و`event handlers`/`callbacks`.**

##### 📖 الشرح
- **`Data encapsulation`** (إخفاء البيانات): زي مثال `count` — تخفي متغير عن الوصول المباشر وتتحكم بيه فقط عبر دوال محددة
- **`Function factories`** (مصانع الدوال): دالة زي `makeCounter` تُنتج دوال جديدة، كل وحدة بحالتها الخاصة — نفس الفكرة اللي رح نشوفها بعدين في `currying` مع `multiply`
- **الحفاظ على `private state`**: أي بيانات تبيها تفضل موجودة بين استدعاءات متعددة بدون ما تكون متغير عام (`global variable`)
- **`Event handlers` و`callbacks`**: لما تسوي `addEventListener`، الدالة اللي تمررها غالباً تحتاج تتذكر متغيرات من الـ scope اللي أُنشئت فيه — وهذا كله بفضل الـ `closures`

##### 🎯 الملخص السريع
- `Closures` مو بس مفهوم نظري — هي الأساس وراء إخفاء البيانات والدوال المُنتِجة لدوال أخرى
- أي دالة تُمرر كـ `callback` وتستخدم متغيرات خارجية تعتمد على `closures`

> 🎯 **جملة الامتحان:** `Closures` أساسية في الـ `functional programming` والبرمجة غير المتزامنة في `JavaScript` لأنها تتيح الحفاظ على حالة خاصة بين استدعاءات متعددة.

##### 📚 التطبيق
هذي القائمة تفسّر ليش راح نشوف `closures` تتكرر في كل موضوع لاحق تقريباً — من `currying` مباشرة بعده، لحد `async` البرمجة لاحقاً.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Data encapsulation, Function factories, Maintaining private state, Event handlers and callbacks. Closures are foundational in functional and asynchronous programming in JavaScript.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأربع استخدامات المذكورة بالنص مع شرح كل وحدة وربطها بمثال `makeCounter`

</details>

---

### 2. Currying

#### 2.1. تفكيك الدوال إلى خطوات (Breaking Functions into Steps)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1"} -->

##### 📍 أين نحن الآن؟
ثاني موضوع رئيسي — يبني مباشرة على `closures`.

##### ⬅️ الربط مع السابق
`Currying` هو تطبيق عملي لفكرة الـ `closure`: كل دالة داخلية "تتذكر" الـ argument اللي مرّ للدالة الخارجية، بالضبط زي ما `count` كانت محفوظة في المثال السابق.

##### 💡 الفكرة الأساسية
**`Currying` هو تحويل دالة متعددة الـ parameters إلى سلسلة دوال، كل دالة تاخذ parameter واحد فقط وترجع الدالة التالية.**

---

##### 💻 الكود
```javascript
function multiply(a) {
  return function (b) {
    return a * b;             // "a" is remembered via closure from the outer call
  };
}

const double = multiply(2);
console.log(double(5)); // 10
```

##### شرح كل سطر:
1. `function multiply(a)` → دالة تاخذ parameter واحد بس (`a`) بدل الاثنين مع بعض
2. `return function (b) {...}` → ترجع دالة داخلية تنتظر الـ parameter الثاني (`b`)
3. `return a * b;` → الضرب يحصل هنا — و`a` متاحة بفضل الـ `closure` رغم إن `multiply` خلصت تنفيذها
4. `const double = multiply(2);` → استدعاء أول مرحلة فقط، ينتج دالة جديدة "متذكرة" إن `a = 2`
5. `double(5)` → استدعاء المرحلة الثانية، يضرب `2 * 5` ويرجع `10`

##### 📖 الشرح
لاحظ إن `multiply(2)` **ما تحسب الضرب فوراً** — هي بس ترجع دالة جديدة جاهزة تستقبل الرقم الثاني. هذا يخلي `double` دالة قابلة لإعادة الاستخدام: تقدر تنادي `double(5)`, `double(10)`, `double(100)` كلهم بنفس القيمة الأولى (`2`) بدون ما تكررها كل مرة.

هذا مثال مباشر على **`partial application`**: "جهّزنا" جزء من الـ arguments (`a = 2`) مسبقاً، وخلينا الدالة تنتظر الباقي.

##### 💡 التشبيه:
> فكّر في `currying` مثل آلة قهوة فيها إعدادين منفصلين: أول تختار نوع الحبوب (خطوة أولى تحفظ اختيارك)، وبعدين تختار الحجم (خطوة ثانية تستخدم اختيارك المحفوظ لتحضّر القهوة).
> **وجه الشبه:** اختيار نوع الحبوب = `multiply(2)`، اختيار الحجم = `double(5)`، القهوة الجاهزة = الناتج `10`.

##### 🎯 الملخص السريع
- `Currying` يفكك دالة متعددة الـ parameters إلى سلسلة دوال أحادية الـ parameter
- كل دالة داخلية تعتمد على `closure` لتتذكر القيم السابقة
- يمكّن من `partial application` — تجهيز جزء من الـ arguments مسبقاً

> 🎯 **جملة الامتحان:** الـ `currying` هو تحويل دالة متعددة الـ parameters إلى سلسلة دوال، كل دالة تاخذ parameter واحد وترجع الدالة التالية.

##### 📚 التطبيق
يُستخدم في الـ `functional composition` وبناء دوال قابلة لإعادة الاستخدام بشكل مرن.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Currying is the process of transforming a function with multiple parameters into a sequence of functions, each taking one parameter. Each function remembers its argument through a closure.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف، مثال `multiply`/`double`، والربط الصريح مع `closures`

</details>

---

#### 2.2. Currying مع Arrow Functions

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1"} -->

##### 📍 أين نحن الآن؟
نفس فكرة `currying`، لكن بصيغة أقصر باستخدام `ES6 arrow functions`.

##### ⬅️ الربط مع السابق
هذا مجرد إعادة كتابة لمثال `multiply`/`double` بصيغة مختصرة — نفس السلوك بالضبط.

##### 💡 الفكرة الأساسية
**تقدر تكتب دوال `curried` بشكل مختصر جداً باستخدام سلسلة `arrow functions` متتابعة.**

---

##### 💻 الكود
```javascript
const add = a => b => a + b;

console.log(add(3)(4)); // 7
```

##### شرح كل سطر:
1. `const add = a => b => a + b;` → دالة `arrow` ترجع دالة `arrow` ثانية — بديل مختصر لصيغة `function` المتداخلة في القسم السابق
2. `add(3)(4)` → استدعاء متتابع: `add(3)` ترجع دالة تتذكر `a = 3`، ثم `(4)` تستدعيها فوراً بـ `b = 4`، الناتج `3 + 4 = 7`

##### 📖 الشرح
هذا السطر الواحد `a => b => a + b` يكافئ تماماً الصيغة الطويلة:
```javascript
function add(a) {
  return function(b) {
    return a + b;
  };
}
```
كل سهم (`=>`) إضافي يعني "دالة جديدة ترجع دالة تانية". هذا النمط شائع جداً في الكود الحديث لأنه مختصر ويقرأ بسهولة بمجرد ما تعتاد عليه.

##### 🎯 الملخص السريع
- سلسلة `arrow functions` (`a => b => ...`) هي الصيغة المختصرة لـ `currying`
- `Currying` يفيد في: `function reuse`، `functional composition`، و`partial application` أنظف

> 🎯 **جملة الامتحان:** `a => b => a + b` هي صيغة `ES6` مختصرة لدالة `curried` تُستدعى بالشكل `add(3)(4)`.

##### 📚 التطبيق
هذي الصيغة هي اللي بتشوفها غالباً في مكتبات الـ `functional programming` الحديثة وفي كود `React`/`Redux`.

##### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو كتبت `const addFive = add(5);` ثم `addFive(10)`, شنو الناتج؟
> **لماذا هذا مهم؟** يوضح إن `add(5)` وحدها لا تحسب شي — هي بس ترجع دالة جديدة جاهزة، والناتج هنا `15`.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> You can write curried functions concisely using ES6 arrow syntax. Enables function reuse, Useful in functional composition, Cleaner partial application of arguments.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: مثال `add`، تفكيك السطر، وفوائد `currying` الثلاث المذكورة بالنص

</details>

---

### 3. Destructuring Parameters

#### 3.1. تفكيك القيم (Unpacking Values)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2"} -->

##### 📍 أين نحن الآن؟
موضوع مستقل عن `closures`/`currying`، لكنه أساسي لبقية أدوات `ES6` الجاية بعده.

##### ⬅️ الربط مع السابق
لا يعتمد مباشرة على `currying`، لكنه يشترك معه في كونه أداة `ES6` تختصر كود كان طويل بالطرق التقليدية.

##### 💡 الفكرة الأساسية
**`Destructuring` يسمح باستخراج قيم من `array` أو `object` وتوزيعها على متغيرات في خطوة واحدة.**

---

##### 💻 الكود
```javascript
// Array destructuring — order matters
const [x, y] = [10, 20];
console.log(x, y); // 10 20

// Object destructuring — names must match the property keys
const user = { name: "Alice", age: 30 };
const { name, age } = user;
console.log(name, age); // Alice 30
```

##### شرح كل سطر:
1. `const [x, y] = [10, 20];` → يوزّع عناصر الـ array على `x` و`y` حسب **الترتيب** — `x` يأخذ أول عنصر دائماً
2. `console.log(x, y);` → يطبع `10 20` مباشرة بدون الحاجة لـ `arr[0]`, `arr[1]`
3. `const { name, age } = user;` → يستخرج خصائص من الـ object — الأسماء هنا لازم **تطابق أسماء الخصائص بالضبط** (`name`, `age`)، الترتيب غير مهم هنا

##### 📖 الشرح
الفرق الجوهري بين النوعين: destructuring الـ `array` يعتمد على **الموقع/الترتيب**، بينما destructuring الـ `object` يعتمد على **مطابقة الاسم**. لو كتبت `const { age, name } = user;` بترتيب معاكس، النتيجة نفسها بالضبط — لأن الـ `JavaScript` يبحث عن الخاصية بالاسم مو بالموقع.

بدون `destructuring`، كنت تحتاج تكتب سطرين منفصلين (`const name = user.name; const age = user.age;`) — الآن سطر واحد يسوي نفس الشي.

##### 💡 التشبيه:
> فكّر في `array destructuring` مثل توزيع جوائز حسب الترتيب في السباق (المركز الأول يأخذ `x`، الثاني يأخذ `y`)، بينما `object destructuring` مثل توزيع البريد حسب الاسم المكتوب على الظرف — مو مهم ترتيب الأظرف، بس مهم يطابق الاسم.
> **وجه الشبه:** ترتيب السباق = array destructuring، الاسم على الظرف = object destructuring.

##### 🎯 الملخص السريع
- `Array destructuring` يعتمد على **الترتيب**
- `Object destructuring` يعتمد على **مطابقة اسم الخاصية**
- الاثنين يختصران كود كان يحتاج أسطر متعددة إلى سطر واحد

> 🎯 **جملة الامتحان:** الـ `destructuring` يسمح باستخراج قيم من `array` أو `object` وتوزيعها على متغيرات في خطوة واحدة — الـ array بالترتيب، والـ object بمطابقة الاسم.

##### 📚 التطبيق
أساس مباشر للقسم التالي (`destructuring` داخل parameters الدالة).

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Destructuring allows extracting values from arrays or objects and assigning them to variables in a single step.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المثالين (array وobject) والفرق الجوهري بينهم في آلية المطابقة
- ℹ️ إضافة من الدليل: تشبيه السباق والبريد، توضيح إن ترتيب object destructuring غير مهم

</details>

---

#### 3.2. تفكيك معاملات الدالة (Destructuring Function Parameters)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1"} -->

##### 📍 أين نحن الآن؟
تطبيق `destructuring` مباشرة على parameters الدالة، بدل استقبال object كامل وفكّه لاحقاً.

##### ⬅️ الربط مع السابق
يبني مباشرة على `object destructuring` من القسم السابق — نفس الآلية، بس مكانها هنا داخل توقيع الدالة.

##### 💡 الفكرة الأساسية
**تقدر تسوي `destructuring` مباشرة في توقيع الدالة (`function signature`) بدل ما تستقبل object كامل.**

---

##### 💻 الكود
```javascript
function greet({ name, age }) {
  console.log(`Hello ${name}, age ${age}`);
}

greet({ name: "Bob", age: 25 });
```

##### شرح كل سطر:
1. `function greet({ name, age })` → الـ parameter مو object عادي، هو نمط destructuring — يفكّ الـ object لحظة استقباله ويعطيك `name` و`age` مباشرة كمتغيرات جاهزة
2. `console.log(\`Hello ${name}, age ${age}\`);` → استخدام مباشر للمتغيرين بدون الحاجة لكتابة `person.name` أو `person.age`
3. `greet({ name: "Bob", age: 25 });` → عند الاستدعاء، تمرر object عادي — الفكّ يصير تلقائياً داخل الدالة

##### 📖 الشرح
لو ما استخدمنا `destructuring`، كان لازم نكتب:
```javascript
function greet(person) {
  console.log(`Hello ${person.name}, age ${person.age}`);
}
```
النسخة المفكّكة أنظف خصوصاً لو الدالة تستخدم أكثر من خاصية من نفس الـ object، لأنها توفر عليك تكرار `person.` في كل سطر.

##### 🎯 الملخص السريع
- `Destructuring` في parameters الدالة = نظيف ومختصر لما تحتاج أكثر من خاصية واحدة من object
- يعمل أيضاً مع `array-based` function parameters (نشوفه في القسم القادم)

> 🎯 **جملة الامتحان:** تفكيك الـ object مباشرة في parameters الدالة يعطيك المتغيرات (`name`, `age`, ...) جاهزة للاستخدام داخل جسم الدالة بدون الحاجة لكتابة `object.property` في كل مرة.

##### 📚 التطبيق
نمط شائع جداً في `React components` وفي دوال الـ `Express middleware` اللاحقة.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
بعض المبتدئين يعتقدون إنهم يقدرون يسمّوا الـ parameter المفكك بأي اسم يبونه، مثل `function greet({ n, a })` ويتوقعون إنها تاخذ `name` و`age`.

##### الفهم الصحيح ✅:
أسماء المتغيرات داخل الـ `{}` **يجب أن تطابق أسماء الخصائص بالضبط** في الـ object المُمرر (`name`, `age`) — تماماً مثل `object destructuring` العادي. لو حبيت اسم مختلف تحتاج `renaming`: `{ name: n, age: a }`.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> You can destructure directly in the function signature. Clean and concise for objects with multiple keys. Also works in array-based function params.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: مثال `greet`، مقارنة بالنسخة غير المفكّكة، والإشارة لعملها مع array parameters أيضاً

</details>

---

#### 3.3. مثال متقدم: دمج Destructuring مع Rest وRecursion

<!-- @render: {type: "code-first", visualization: "none", coverage: "90%"} -->
<!-- @connectivity: {prerequisite: "section_3.2", concept: "rest_operator_section_5"} -->

##### 📍 أين نحن الآن؟
هذا مثال متقدم من المحاضرة يجمع بين `array destructuring` و`rest operator` (اللي بنشرحه بالتفصيل في القسم 5) داخل دالة `recursive`.

##### ⬅️ الربط مع السابق
يبني على `array destructuring` من القسم 3.1، لكنه يضيف عنصر جديد — تجميع "الباقي" بواسطة `...` (سنشرح هذا بالتفصيل الكامل لاحقاً في قسم `Rest Operator`).

##### 💡 الفكرة الأساسية
**تقدر تجمع `array destructuring` مع `rest syntax` داخل parameters دالة `arrow` لبناء منطق `recursive` مختصر جداً — مثل عكس ترتيب array.**

---

##### 💻 الكود
```javascript
// Reverses an array recursively using destructuring + rest
let reverse = ([x, ...y]) => y.length > 0 ? [...reverse(y), x] : [x];
```

##### شرح كل سطر:
1. `([x, ...y])` → يفكك الـ parameter (وهو array): `x` = أول عنصر، `y` = باقي العناصر (هذا استخدام لـ `rest operator` — نشرحه بالتفصيل في القسم 5)
2. `y.length > 0 ? ... : [x]` → شرط توقف الـ `recursion`: لو ما تبقى إلا عنصر واحد (`y` فاضية)، رجّع `[x]` مباشرة
3. `[...reverse(y), x]` → استدعاء الدالة نفسها على الباقي (`y`)، ثم "فرد" الناتج (`spread` — نشرحه بالتفصيل في القسم 4) وإضافة `x` في النهاية

##### 📖 الشرح
هذا السطر الواحد يعكس ترتيب array كامل: يفصل أول عنصر (`x`) عن الباقي (`y`)، يعالج الباقي بنفس الطريقة (نداء الدالة لنفسها = `recursion`)، وبعدين يحط `x` في آخر النتيجة. النتيجة النهائية: أول عنصر بالأصل يصير آخر عنصر في المخرجات.

> ⚠️ **ملاحظة:** هذا المثال يستخدم مفهومين (`rest` و`spread`) لسا ما شرحناهم بالتفصيل الكامل — المحاضرة عرضته هنا كتطبيق مبكر، وراح نرجع نشرح كل واحد منهم بعمق في قسمهم الخاص (4 و5) بعدين.

##### 💡 التشبيه:
> فكّر فيها مثل ترتيب طابور أشخاص بالعكس: تاخذ الشخص الأول وتحطه بآخر الطابور الجديد، وتكرر نفس العملية على الباقي حتى ما يتبقى إلا شخص واحد.
> **وجه الشبه:** الشخص الأول = `x`، باقي الطابور = `y`، تكرار العملية = `recursion`.

##### 🎯 الملخص السريع
- `Destructuring` و`rest` و`spread` تتعاون مع بعض في نفس السطر لبناء منطق مضغوط
- هذا مثال `recursion` مبني بالكامل على array destructuring

> 🎯 **جملة الامتحان:** `[x, ...y]` تفكك array إلى أول عنصر (`x`) وباقي العناصر (`y`) — نمط شائع في الدوال الـ `recursive` على arrays.

##### 📚 التطبيق
نموذج مصغّر لما رح تشوفه لاحقاً في معالجة قوائم وبيانات بأسلوب `functional`.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90% — الشرح الكامل لـ rest وspread داخل هذا السطر تحديداً أُجّل لقسمهم الخاص لتجنب التكرار)</summary>

**النص الأصلي يقول:**
> let reverse = ([x, ...y]) => y.length > 0 ? [...reverse(y), x] : [x];

**ملاحظة على التغطية:**
- ✓ تم شرح: البنية العامة، منطق الـ recursion، والهدف من الدالة (عكس array)
- ⚠️ غير مشروح بالكامل هنا: التفاصيل العميقة لـ `rest` و`spread` (مقصود — تُشرح بتفصيل كامل في القسمين 4 و5 لاحقاً)
- ℹ️ إضافة من الدليل: تشبيه الطابور، تتبع تنفيذ (انظر أسفل)

</details>

##### 🔍 تتبع التنفيذ: `reverse([1, 2, 3])`

**المدخل:** `[1, 2, 3]`

| الخطوة | العملية | القيمة/الحالة |
| --- | --- | --- |
| 1 | `reverse([1,2,3])` → `x=1, y=[2,3]` | `y.length > 0` → استدعاء `reverse([2,3])` |
| 2 | `reverse([2,3])` → `x=2, y=[3]` | `y.length > 0` → استدعاء `reverse([3])` |
| 3 | `reverse([3])` → `x=3, y=[]` | `y.length === 0` → يرجّع `[3]` مباشرة |
| 4 | رجوع للخطوة 2: `[...[3], 2]` | `[3, 2]` |
| 5 | رجوع للخطوة 1: `[...[3,2], 1]` | `[3, 2, 1]` |

**النتيجة:** `[3, 2, 1]`

---

### 4. The Spread Operator (`...`)

#### 4.1. توسيع المصفوفات والكائنات

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.3"} -->

##### 📍 أين نحن الآن؟
شرح مفصّل لأداة استخدمناها بشكل عابر في القسم 3.3 — الآن نفهمها بعمق.

##### ⬅️ الربط مع السابق
شفنا `spread` مستخدم داخل `reverse()` في القسم السابق (`[...reverse(y), x]`) — هنا نرجع نشرحه من الصفر بشكل مستقل.

##### 💡 الفكرة الأساسية
**الـ `spread operator` يوسّع (`expand`) array أو object إلى عناصره المنفردة.**

---

##### 💻 الكود
```javascript
const nums = [1, 2, 3];
console.log(...nums); // 1 2 3

// Cloning + concatenating arrays
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); // [1, 2, 3, 4]

// Cloning + merging objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }
```

##### شرح كل سطر:
1. `console.log(...nums);` → يفرد كل عنصر من `nums` كـ argument منفصل لـ `console.log`، فيطبعهم بجانب بعض بدل طباعة الـ array كوحدة
2. `const arr2 = [...arr1, 3, 4];` → ينسخ عناصر `arr1` داخل array جديد، ثم يضيف `3` و`4` — النتيجة array جديد كلياً، `arr1` الأصلي ما تغيّر
3. `const obj2 = { ...obj1, c: 3 };` → نفس الفكرة للـ objects: ينسخ خصائص `obj1` ويضيف `c: 3` — object جديد مستقل عن `obj1`

##### 📖 الشرح
النقطة المهمة: `[...arr1, 3, 4]` **لا يعدّل** `arr1` — هو ينشئ array **جديد** يحتوي نسخة من عناصر `arr1` بالإضافة لعناصر جديدة. هذا يخلي `spread` أداة ممتازة للـ **immutability** (عدم التعديل المباشر على البيانات الأصلية)، وهو مبدأ مهم جداً في `React` وأدوات إدارة الحالة لاحقاً.

نفس الشي ينطبق على الـ objects: `{...obj1, c: 3}` تنشئ object جديد. لو الخاصية الجديدة نفس اسم خاصية موجودة، القيمة الجديدة تكتب فوق القديمة (لأنها تُكتب بعد الـ spread).

##### 💡 التشبيه:
> فكّر في `spread` مثل تفريغ محتويات صندوق على الطاولة: بدل ما تتعامل مع "صندوق واحد"، صار عندك كل قطعة لحالها جاهزة تستخدمها أو تضيف عليها.
> **وجه الشبه:** الصندوق = الـ array/object الأصلي، القطع المفروشة = العناصر بعد الـ `spread`.

##### 🎯 الملخص السريع
- `Spread` يفرد عناصر array/object بدل ما يتعامل معها كوحدة واحدة
- مفيد في: `cloning`، `concatenation`، وتمرير عناصر array كـ arguments منفصلة لدالة
- ينشئ نسخة جديدة — لا يعدّل الأصل (`immutability`)

> 🎯 **جملة الامتحان:** `Spread operator` (`...`) يوسّع array أو object إلى عناصره المنفردة — يُستخدم غالباً في النسخ (`cloning`) والدمج (`concatenation`).

##### 📚 التطبيق
أساسي جداً في `React` (نسخ الـ `state` بدون تعديل مباشر) وفي تمرير عدة arguments لدالة من array جاهز.

##### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** بعد `const arr2 = [...arr1, 3, 4];`، لو عدّلت `arr2[0] = 99`، هل تتأثر `arr1`؟
> **لماذا هذا مهم؟** يختبر فهمك لـ `immutability` — الجواب لا، لأن `spread` أنشأ نسخة جديدة كلياً، `arr1` تبقى `[1, 2]`.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The spread operator expands an array (or object) into individual elements. Useful for: Cloning arrays/objects, Concatenation, Passing arguments to functions.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: الأمثلة الثلاثة (numbers, arrays, objects) والاستخدامات الثلاث المذكورة بالنص
- ℹ️ إضافة من الدليل: توضيح مبدأ الـ immutability وربطه بـ React

</details>

---

### 5. The Rest Operator (`...`)

#### 5.1. تجميع العناصر المتبقية

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1"} -->

##### 📍 أين نحن الآن؟
الوجه الآخر من نفس الرمز `...` اللي شرحناه في القسم السابق كـ `spread`.

##### ⬅️ الربط مع السابق
هنا نستخدم نفس رمز `...` من القسم السابق، لكن **بعكس الاتجاه تماماً**: بدل ما نفرد عناصر، نجمعهم.

##### 💡 الفكرة الأساسية
**الـ `rest operator` يجمع العناصر المتبقية في `array` أو `object` واحد.**

---

##### 💻 الكود
```javascript
// Function parameters: gathers all passed arguments into one array
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6

// Destructuring: gathers remaining array elements
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest);  // [20, 30, 40]
```

##### شرح كل سطر:
1. `function sum(...nums)` → أي عدد من الـ arguments يُمرر لهذه الدالة يُجمع تلقائياً في array واحد اسمه `nums`
2. `nums.reduce((a, b) => a + b, 0);` → يجمع كل عناصر `nums` ببعض بدءاً من `0`
3. `sum(1, 2, 3)` → يعطي `nums = [1, 2, 3]`، والناتج `6`
4. `const [first, ...rest] = [10, 20, 30, 40];` → `first` يأخذ أول عنصر، و`rest` يجمع كل الباقي في array جديد

##### 📖 الشرح
الميزة الكبرى للـ `rest` في parameters الدالة إنك ما تحتاج تعرف مسبقاً كم عدد الـ arguments اللي رح تُمرر — الدالة `sum` تشتغل مع `sum(1)`, `sum(1,2)`, `sum(1,2,3,4,5)` بدون أي تعديل، وهذا يسمى **`variadic function`** (دالة تقبل عدد متغير من المدخلات).

في الـ `destructuring`، الـ `rest` **يجب أن يكون آخر عنصر** في نمط الـ destructuring — ما تقدر تكتب `[...rest, last]`، لازم يكون `[first, ...rest]`.

##### 💡 التشبيه:
> فكّر في `rest` مثل موظف استقبال يستلم أول شخص بالدور لحاله، ويجمع كل البقية في مجموعة واحدة يتعامل معها سوا.
> **وجه الشبه:** الشخص الأول = `first`، بقية الطابور مجمّعين = `rest`.

##### 🎯 الملخص السريع
- `Rest` يجمع arguments متعددة لدالة، أو عناصر array متبقية، في متغير واحد
- يُستخدم في `function parameters` و`array/object destructuring`
- **القاعدة الذهبية:** `Spread` يوسّع، `Rest` يجمع — نفس الرمز `...` بمعنى معاكس حسب السياق

> 🎯 **جملة الامتحان:** `Rest operator` (`...`) يجمع عناصر متعددة (arguments أو عناصر array متبقية) في `array` أو `object` واحد — عكس تماماً `spread operator`.

##### 📚 التطبيق
أساسي لبناء دوال مرنة تقبل عدد غير محدد من المدخلات، وشفناه فعلياً يُستخدم داخل دالة `reverse()` في القسم 3.3.

##### ⚠️ أخطاء شائعة

##### الفهم الخاطئ ❌:
الطالب يشوف `...` في سطرين مختلفين ويفترض إنهم يسوون نفس الشي لأن الرمز متطابق.

##### الفهم الصحيح ✅:
حدد الاتجاه من **الموقع**: لو `...` جوه قيمة موجودة (زي `[...arr1, 3, 4]` أو استدعاء دالة) فهي `spread` (توسيع). لو `...` في مكان استقبال قيم (زي `function sum(...nums)` أو `const [first, ...rest] = ...`) فهي `rest` (تجميع).

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The rest operator collects remaining items into a single array or object. Rest syntax helps capture "the rest" of a list or arguments cleanly. Spread expands, Rest gathers — same syntax, opposite purpose depending on context.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: مثال `sum` (function parameters) ومثال `[first, ...rest]` (destructuring)، والقاعدة الذهبية المذكورة حرفياً بالنص

</details>

---

### 6. Generators

#### 6.1. الدوال القابلة للإيقاف المؤقت (Pausable Functions)

<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_5.1"} -->

##### 📍 أين نحن الآن؟
آخر موضوع رئيسي في المحاضرة — نوع مختلف كلياً عن الدوال العادية.

##### ⬅️ الربط مع السابق
لا يعتمد تقنياً على `rest`/`spread`، لكنه يشترك مع `closures` في فكرة "الدالة تحتفظ بحالتها الداخلية" بين استدعاءات متعددة.

##### 💡 الفكرة الأساسية
**`Generators` هي دوال خاصة تقدر توقف وتستأنف تنفيذها باستخدام `yield`.**

---

##### 💻 الكود
```javascript
function* generatorFunc() {
  yield 1;
  yield 2;
  yield 3;
}
```

##### شرح كل سطر:
1. `function* generatorFunc()` → النجمة (`*`) بعد `function` مباشرة هي اللي تحوّل الدالة العادية إلى `generator function`
2. `yield 1;` → "تُرجع" القيمة `1` وتوقف التنفيذ هنا، لحد ما تُطلَب القيمة التالية
3. `yield 2;` → نفس الشي، توقف بعد إرجاع `2`
4. `yield 3;` → آخر قيمة، بعدها الـ generator يعتبر "منتهي" (`done: true`)

##### 📖 الشرح
الفرق الجوهري بين `return` و`yield`: `return` **ينهي** الدالة نهائياً وترجع قيمة وحدة. أما `yield` **يوقف** الدالة مؤقتاً وترجع قيمة، لكن الدالة تفضل "حية" وتقدر تكمل من نفس النقطة لاحقاً. هذا يعني إن الـ `generator function`، عكس الدالة العادية، ما تنفّذ كامل جسمها فور استدعائها — هي بس تنشئ كائن `generator` (`iterator`)، والتنفيذ الفعلي يصير تدريجياً كل ما تنادي `.next()` عليه.

##### 💡 التشبيه:
> فكّر في `generator` مثل فيلم تقدر تضغط `pause` عليه في أي نقطة وترجع تكمله لاحقاً بالضبط من نفس اللحظة — بعكس فيلم عادي لازم يشتغل من الأول للآخر بلا توقف.
> **وجه الشبه:** زر `pause`/`play` = `yield`/`.next()`، الفيلم = الدالة الـ generator.

##### 🎯 الملخص السريع
- `function*` تُعرّف دالة `generator`
- `yield` يُرجع قيمة ويوقف التنفيذ مؤقتاً (بعكس `return` اللي ينهي الدالة كلياً)
- التنفيذ يستأنف لاحقاً من نفس النقطة عند نداء `.next()` (نشوفه بالتفصيل في القسم القادم)

> 🎯 **جملة الامتحان:** `Generator function` (معرّفة بـ `function*`) تقدر توقف تنفيذها مؤقتاً باستخدام `yield` وتستأنفه لاحقاً بدون فقدان حالتها الداخلية.

##### 📚 التطبيق
أساس لبناء `iterators` مخصصة، ومهم جداً لاحقاً في فهم آلية عمل البرمجة غير المتزامنة (`async/await`).

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> Generators are special functions that can pause and resume their execution using yield. Use `*` in function declaration, Use yield to return values incrementally, Call `.next()` to resume execution.

**ملاحظة على التغطية:**
- ✓ تم شرح: تعريف الـ `generator`، دور `yield`، الفرق مع `return`
- ⚠️ غير مشروح بالكامل هنا: آلية `.next()` بالتفصيل — أُجّلت عمداً للقسم 6.2 لتجنب التكرار مع المثال العملي القادم
- ℹ️ إضافة من الدليل: تشبيه الفيلم والـ pause/play

</details>

---

#### 6.2. استخدام Generators عملياً

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.1"} -->

##### 📍 أين نحن الآن؟
آخر قسم في المحاضرة — مثال عملي كامل يوضح كيف تُستخدم الـ `generators` فعلياً مع `.next()`.

##### ⬅️ الربط مع السابق
يكمل مباشرة من القسم السابق: نفس فكرة `function*` و`yield`، بس الآن نشوف كيف نستهلك القيم فعلياً عبر `.next()`.

##### 💡 الفكرة الأساسية
**تنادي `.next()` على كائن الـ `generator` عشان تحصل على القيمة التالية — وكل نداء يرجع object فيه `value`.**

---

##### 💻 الكود
```javascript
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;      // yields current id, then increments it
  }
}

const gen = idGenerator();

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

##### شرح كل سطر:
1. `let id = 1;` → متغير محلي داخل الـ generator، بيبقى محفوظ بين نداءات `.next()` المتعددة (شبيه بفكرة `closure` من القسم 1)
2. `while (true) { yield id++; }` → حلقة لا نهائية — لكن بما إنها generator، ما تعلّق البرنامج، لأن كل تكرار يوقف عند `yield` لحد ما يُطلب التالي
3. `yield id++;` → يرجع القيمة **الحالية** لـ `id`، ثم يزيدها بواحد (بسبب `postfix ++`) استعداداً للمرة الجاية
4. `const gen = idGenerator();` → إنشاء كائن الـ `generator` — **لا يُنفَّذ أي شي داخل الدالة بعد** في هذي اللحظة
5. `gen.next().value` (أول مرة) → يبدأ التنفيذ من أول سطر لحد أول `yield`، يرجع `{ value: 1, done: false }`، فـ `.value` يعطي `1`
6. `gen.next().value` (ثاني مرة) → يستأنف بالضبط من بعد `yield` السابق، يزيد `id` ويرجع `2`

##### 📖 الشرح
هذا المثال يوضح ليش الـ `generators` مفيدة جداً مع الحلقات اللا نهائية: لو كتبنا `while(true) { id++; }` في دالة عادية، البرنامج كان بيتعلّق للأبد. لكن بفضل `yield`، كل نداء `.next()` يشغّل "خطوة وحدة" بس ويوقف — هذا مثال حقيقي على **`lazy evaluation`**: القيم تُحسب فقط وقت الحاجة الفعلية لها، مو كلها دفعة وحدة.

المحاضرة أضافت أيضاً مثال يجمع الـ `generator` مع `array destructuring`:
```javascript
const [a, b, , c, d] = idGenerator();
console.log(a, b, c, d); // 0 1 3 4
```
هنا الفاصلة الفارغة (`, ,`) تتخطى عنصر واحد بدون تخزينه في متغير — تقنية `skipping elements` في الـ destructuring. لاحظ إن نتيجة هذا المثال بالنص الأصلي تبدأ من `0` (مو `1`)، وهذا مختلف قليلاً عن المثال الأول اللي بدأ `id` من `1` — الأرقام هنا توضيحية للتعامل مع generator جديد ومستقل.

##### 💡 التشبيه:
> فكّر في `.next()` مثل الضغط على زر "التالي" في عرض شرائح (`slideshow`): كل ضغطة تكشف شريحة وحدة وتوقف، ما تعرض كل الشرائح دفعة وحدة.
> **وجه الشبه:** زر "التالي" = `.next()`، الشريحة الظاهرة = القيمة المُرجعة (`value`).

##### 🎯 الملخص السريع
- `.next()` يستأنف تنفيذ الـ generator لحد أول `yield` تالي، ويرجع object فيه `value`
- الـ `generator` يحافظ على حالته الداخلية (زي `id`) بين النداءات المتكررة
- مفيد جداً مع حلقات لا نهائية (`lazy evaluation`) وبناء `iterators` مخصصة

> 🎯 **جملة الامتحان:** كل نداء لـ `.next()` على كائن `generator` يستأنف التنفيذ من آخر نقطة `yield` ويرجع object بالشكل `{ value, done }`.

##### 📚 التطبيق
`Generators` تُستخدم لبناء `iterators`، `lazy evaluation` لبيانات كبيرة أو لا نهائية، والتحكم بتدفق العمليات غير المتزامنة (`asynchronous control flows`).

##### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كتبنا حلقة `while(true)` عادية بدون `yield` داخل دالة عادية (مو generator)، شنو يصير؟
> **لماذا هذا مهم؟** يبرز الفرق الجوهري: بدون `yield`، البرنامج يتعلّق (`infinite loop` تقليدي)، بينما مع `yield` كل تكرار يوقف وينتظر نداء `.next()` القادم.

##### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Generators are useful for: Iterators, Lazy evaluation, Asynchronous control flows.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: مثال `idGenerator` كامل، مثال الـ destructuring مع تخطي عنصر، والاستخدامات الثلاث المذكورة بالنص
- ℹ️ إضافة من الدليل: تشبيه الـ slideshow، تتبع تنفيذ ضمني في شرح الأسطر

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium / hard

### السؤال 1 (medium)

بعد تنفيذ هذا الكود:
```javascript
function makeCounter() {
  let count = 0;
  return function () { return ++count; };
}
const c1 = makeCounter();
const c2 = makeCounter();
console.log(c1()); console.log(c1()); console.log(c2());
```
شنو ناتج الطباعة بالترتيب؟

أ) `1 2 1`
ب) `1 2 3`
ج) `1 1 1`
د) `2 2 2`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** كل نداء لـ `makeCounter()` ينشئ `closure` مستقل بنسخته الخاصة من `count`، فـ `c1` تصل `2` بينما `c2` تبدأ من `1` لأنها منفصلة كلياً
- ❌ **الخيار ب:** يفترض إن `c1` و`c2` يشتركون بنفس `count` — خلط شائع بين "دالة واحدة" و"استدعاءات منفصلة للدالة الخارجية"
- ❌ **الخيار ج:** يفترض إن `count` لا تتغير أبداً — يتجاهل فكرة الـ closure الأساسية بالكامل
- ❌ **الخيار د:** يفترض إن `count` تبدأ من `2` — لا معنى منطقي له هنا

---

### السؤال 2 (medium)

أي من التالي **ليس** استخداماً واقعياً مذكوراً في المحاضرة للـ `closures`؟

أ) `Data encapsulation`
ب) `Function factories`
ج) `Type checking` في وقت الترجمة (`compile-time`)
د) `Event handlers and callbacks`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `JavaScript` لغة `dynamically typed`، ولا يوجد `compile-time type checking` أصلاً — هذا المفهوم غير مرتبط بـ `closures` إطلاقاً وغير موجود بالمحاضرة
- ❌ **الخيار أ:** مذكور صراحة كاستخدام رئيسي لإخفاء البيانات مثل مثال `count`
- ❌ **الخيار ب:** مذكور صراحة — `makeCounter` نفسها مثال على `function factory`
- ❌ **الخيار د:** مذكور صراحة كأحد الاستخدامات الأربعة بالنص الأصلي

---

### السؤال 3 (hard)

ما ناتج هذا الكود؟
```javascript
const multiply = a => b => a * b;
const triple = multiply(3);
console.log(triple(triple(2)));
```

أ) `18`
ب) `6`
ج) `9`
د) `Error`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** `triple(2)` تحسب `3 * 2 = 6`، ثم `triple(6)` تحسب `3 * 6 = 18` — النتيجة النهائية `18`
- ❌ **الخيار ب:** هذا ناتج `triple(2)` وحدها بدون النداء الخارجي — خطأ شائع هو نسيان إن `triple()` استُدعيت مرتين متداخلتين
- ❌ **الخيار ج:** لا يطابق أي عملية حسابية صحيحة هنا، يبدو ناتج خلط بين `3 + ...` و`3 * ...`
- ❌ **الخيار د:** الكود صحيح تماماً وقابل للتنفيذ، لا يوجد أي سبب لخطأ

---

### السؤال 4 (medium)

أي سطر يمثّل استخدام `object destructuring` مباشرة في `function signature`؟

أ) `const { name } = user;`
ب) `function greet({ name, age }) { ... }`
ج) `function greet(user) { const { name } = user; }`
د) `const [x, y] = [1, 2];`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** الـ destructuring مكتوب **داخل الأقواس نفسها** بتوقيع الدالة — هذا بالضبط النمط المذكور بالمحاضرة (مثال `greet`)
- ❌ **الخيار أ:** `destructuring` صحيح، لكنه خارج أي دالة — مجرد `object destructuring` عادي
- ❌ **الخيار ج:** `destructuring` موجود، لكنه **داخل جسم الدالة** وليس في الـ `signature` نفسها — الفرق دقيق ومهم
- ❌ **الخيار د:** هذا `array destructuring` عادي، غير مرتبط بـ function parameters إطلاقاً

---

### السؤال 5 (hard)

ما ناتج هذا الكود؟
```javascript
const [first, second, ...rest] = [5, 10, 15, 20, 25];
console.log(rest);
```

أ) `[15, 20, 25]`
ب) `[5, 10]`
ج) `[10, 15, 20, 25]`
د) `[5, 10, 15, 20, 25]`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** `first = 5`, `second = 10`, و`rest` يجمع كل ما تبقى بعدهم: `[15, 20, 25]`
- ❌ **الخيار ب:** هذا محتوى `first` و`second` نفسهم، مو `rest` — خلط بين المتغيرات المُسمّاة والباقي المُجمّع
- ❌ **الخيار ج:** يتجاهل إن `first` أخذت أول عنصر (`5`) فقط — نسيان إن `second` أيضاً أُخذت من المصفوفة
- ❌ **الخيار د:** يفترض إن `rest` تحتوي المصفوفة كاملة — يتجاهل تماماً معنى "الباقي بعد أول عنصرين"

---

### السؤال 6 (easy-medium)

أي من الأسطر التالية يمثّل استخدام `spread operator` وليس `rest operator`؟

أ) `function sum(...nums) { ... }`
ب) `const [a, ...b] = [1, 2, 3];`
ج) `const arr2 = [...arr1, 4, 5];`
د) `const { x, ...y } = obj;`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** الـ `...arr1` هنا داخل `array literal` جاهز لتوسيعه إلى عناصره — هذا `spread` بحكم التعريف
- ❌ **الخيار أ:** `...nums` هنا في مكان استقبال arguments — `rest`، ليس `spread`
- ❌ **الخيار ب:** `...b` تجمع باقي عناصر المصفوفة بعد `a` — `rest` في سياق destructuring
- ❌ **الخيار د:** `...y` تجمع باقي خصائص الـ object بعد `x` — `rest` في سياق object destructuring

---

### السؤال 7 (hard)

ما الناتج لو غيّرنا `id++` إلى `++id` في مثال `idGenerator`؟
```javascript
function* idGenerator() {
  let id = 1;
  while (true) { yield ++id; }
}
const gen = idGenerator();
console.log(gen.next().value);
console.log(gen.next().value);
```

أ) `2` ثم `3`
ب) `1` ثم `2`
ج) `2` ثم `2`
د) `1` ثم `1`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** `++id` (`prefix`) يزيد القيمة **قبل** إرجاعها، فأول نداء يرجع `2` (بعد الزيادة من `1`)، والثاني يرجع `3`
- ❌ **الخيار ب:** هذا كان ناتج `id++` (`postfix`) الأصلي بالمحاضرة — خلط بين `prefix` و`postfix` increment
- ❌ **الخيار ج:** يفترض إن القيمة لا تتراكم بين النداءات — يتجاهل إن الـ generator يحافظ على حالته الداخلية
- ❌ **الخيار د:** يفترض إن `id` تبقى `1` دائماً — يتجاهل تماماً وجود عملية `++id`

---

### السؤال 8 (medium)

أي وصف صحيح للفرق بين `return` و`yield` داخل دالة `generator`؟

أ) `return` يوقف الدالة مؤقتاً، و`yield` ينهيها نهائياً
ب) `yield` يوقف الدالة مؤقتاً وتقدر تستأنفها، و`return` ينهيها نهائياً
ج) لا فرق بينهم داخل `generator function`
د) `yield` يُستخدم فقط مع الأرقام، و`return` مع أي نوع بيانات

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا هو جوهر الـ `generators` — `yield` يوقف التنفيذ مؤقتاً محتفظاً بالحالة، بينما `return` (لو استُخدم) ينهي الـ generator تماماً
- ❌ **الخيار أ:** الوصف معكوس تماماً عن الصحيح
- ❌ **الخيار ج:** فيه فرق جوهري بينهم، وهو بالضبط سبب وجود `generators` أصلاً
- ❌ **الخيار د:** لا علاقة لنوع البيانات بالفرق بين الكلمتين — كلاهما يقدر يرجع أي نوع قيمة

---

### السؤال 9 (medium)

أي من التالي **ليس** استخداماً صحيحاً أو مذكوراً في المحاضرة للـ `Spread Operator`؟

أ) نسخ (`cloning`) array أو object
ب) دمج (`concatenation`) مصفوفتين
ج) تجميع arguments غير محدودة العدد داخل دالة
د) تمرير عناصر array كـ arguments منفصلة لدالة

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** تجميع arguments غير محدودة العدد هو وظيفة الـ **`rest operator`**، وليس الـ `spread` — هذا هو الفرق الجوهري بينهم اللي شددت عليه المحاضرة
- ❌ **الخيار أ:** مذكور صراحة كأحد استخدامات الـ `spread` (مثال `obj2 = {...obj1, c: 3}`)
- ❌ **الخيار ب:** مذكور صراحة (مثال `arr2 = [...arr1, 3, 4]`)
- ❌ **الخيار د:** مذكور صراحة كأحد استخدامات الـ `spread` بالنص الأصلي

---

### السؤال 10 (hard)

في السياق التالي، ما ناتج التنفيذ؟
```javascript
function greet({ name = "Guest", age }) {
  console.log(`Hello ${name}, age ${age}`);
}
greet({ age: 20 });
```

أ) `Hello Guest, age 20`
ب) `Hello undefined, age 20`
ج) `Error: name is not defined`
د) `Hello Guest, age undefined`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** `destructuring` يدعم `default values` — بما إن `name` لم تُمرر بالـ object، تأخذ القيمة الافتراضية `"Guest"`
- ❌ **الخيار ب:** يتجاهل وجود `default value` (`= "Guest"`) داخل نمط الـ destructuring
- ❌ **الخيار ج:** الكود صحيح تماماً ولا يرمي أي خطأ — القيمة الافتراضية تتولى الأمر
- ❌ **الخيار د:** يخلط بين `name` (اللي لها default) و`age` (اللي بالفعل تم تمريرها بقيمة `20`)

---

### السؤال 11 (medium)

أي جملة تصف بدقة العلاقة بين `Currying` و`Closures`؟

أ) لا علاقة بينهما إطلاقاً
ب) `Currying` مبني على `Closures` لأن كل دالة داخلية تتذكر الـ argument السابق
ج) `Closures` نوع خاص من `Currying`
د) `Currying` يمنع استخدام `Closures`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** كل دالة في السلسلة الـ curried (زي `multiply(2)`) تعتمد بالكامل على آلية الـ `closure` لتتذكر قيمة `a` — هذا مذكور صراحة بالمحاضرة
- ❌ **الخيار أ:** يتجاهل الرابط الجوهري بين المفهومين اللي شرحته المحاضرة صراحة
- ❌ **الخيار ج:** العلاقة معكوسة — `Closures` مفهوم أعم، و`Currying` تطبيق خاص يستخدمه
- ❌ **الخيار د:** عكس الحقيقة تماماً — `Currying` مستحيل بدون `Closures`

---

### السؤال 12 (hard)

ما ناتج هذا الكود؟
```javascript
function* gen() {
  yield "a";
  yield "b";
}
const it = gen();
console.log(it.next().value, it.next().value, it.next().value);
```

أ) `a b undefined`
ب) `a b c`
ج) `undefined undefined undefined`
د) `Error`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** أول نداءين يرجعان `"a"` و`"b"`، والنداء الثالث بعد ما انتهت كل الـ `yield` statements يرجع `{ value: undefined, done: true }` — فـ `.value` تكون `undefined`
- ❌ **الخيار ب:** لا يوجد `yield "c"` في الكود أصلاً — لا يوجد قيمة ثالثة تُنتَج
- ❌ **الخيار ج:** يتجاهل إن أول نداءين فعلاً ينتجان قيم صحيحة قبل ما ينتهي الـ generator
- ❌ **الخيار د:** استدعاء `.next()` على generator منتهي لا يرمي خطأ، فقط يرجع `done: true` مع `value: undefined`

---

### السؤال 13 (medium)

أي من التالي مثال صحيح على `array destructuring` مع تخطي عنصر (`skipping`)؟

أ) `const [a, , c] = [1, 2, 3];`
ب) `const [a, skip, c] = [1, 2, 3];`
ج) `const { a, c } = [1, 2, 3];`
د) `const [a, ...c] = [1, 2, 3];`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** الفاصلة الفارغة (بدون اسم متغير بينها) تتخطى عنصر بدون تخزينه — بالضبط النمط المستخدم بمثال `idGenerator` بالمحاضرة (`const [a, b, , c, d]`)
- ❌ **الخيار ب:** هذا لا يتخطى شي — `skip` تخزّن القيمة `2` فعلياً في متغير باسم `skip`
- ❌ **الخيار ج:** `object destructuring` غير صحيح هنا على `array` أصلاً — خطأ بنيوي
- ❌ **الخيار د:** هذا `rest` وليس `skipping` — يجمع كل الباقي بدل تخطي عنصر واحد

---

### السؤال 14 (hard)

ما ناتج هذا الكود؟
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, b: 99 };
console.log(obj2);
```

أ) `{ a: 1, b: 99 }`
ب) `{ a: 1, b: 2 }`
ج) `{ a: 1, b: [2, 99] }`
د) `Error: duplicate key`

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** لما تتكرر نفس الخاصية بعد الـ `spread`، القيمة الجديدة (`b: 99`) تكتب فوق القديمة (`b: 2`) لأنها مكتوبة بعدها بالترتيب
- ❌ **الخيار ب:** يتجاهل إن القيمة الجديدة المُمررة بعد الـ `spread` **تستبدل** القديمة، مو تُتجاهل
- ❌ **الخيار ج:** `JavaScript` لا يجمع القيم المتكررة بمصفوفة تلقائياً — هذا سلوك غير موجود بلغة `JavaScript`
- ❌ **الخيار د:** لا يوجد أي خطأ — تكرار الخاصية بعد `spread` هو نمط شائع ومقصود (تحديث خاصية واحدة فقط)

---

### السؤال 15 (medium)

أي من التالي **ليس** تصريحاً صحيحاً لدالة `generator`؟

أ) `function* gen() { yield 1; }`
ب) `function *gen() { yield 1; }`
ج) `function gen*() { yield 1; }`
د) `function * gen() { yield 1; }`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** النجمة (`*`) يجب أن تأتي **بعد** كلمة `function` ذاتها (قبل اسم الدالة أو ملتصقة بها)، وليس بعد اسم الدالة — هذا `syntax error`
- ❌ **الخيار أ:** صيغة صحيحة تماماً، النجمة ملتصقة بـ `function`
- ❌ **الخيار ب:** صيغة صحيحة أيضاً، مجرد اختلاف بمكان المسافة — `JavaScript` تتسامح مع الاثنين
- ❌ **الخيار د:** صيغة صحيحة كذلك مع مسافات حول النجمة

---

### السؤال 16 (hard)

أي سيناريو الأنسب لاستخدام `Generator` بدل دالة عادية؟

أ) دالة تحسب مجموع رقمين وترجع الناتج فوراً
ب) دالة تحتاج تنتج تسلسل قيم لا نهائي (زي أرقام تسلسلية) بدون تعليق البرنامج
ج) دالة تنسخ object موجود مع تعديل خاصية واحدة
د) دالة تستخرج `name` و`age` من object مُمرر لها

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** هذا بالضبط سيناريو `idGenerator` بالمحاضرة — حلقة `while(true)` لا نهائية تعمل بأمان فقط بسبب `yield` والتنفيذ التدريجي عبر `.next()`
- ❌ **الخيار أ:** دالة بسيطة تحسب وترجع فوراً — لا حاجة للتوقف المؤقت، دالة عادية كافية تماماً
- ❌ **الخيار ج:** هذا سيناريو مثالي لـ `Spread Operator`، وليس `Generators`
- ❌ **الخيار د:** هذا سيناريو مثالي لـ `Object Destructuring` في function parameters، وليس `Generators`

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 Closures — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Closure` | دالة تحتفظ بالوصول لمتغيرات الـ scope الخارجي حتى بعد انتهاء تنفيذ الدالة الخارجية |
| `Function factory` | دالة تُنشئ وتُرجع دوال أخرى، كل واحدة بحالتها الخاصة |
| `Private state` | متغير محفوظ داخل closure، غير قابل للوصول المباشر من خارج الدالة |

### 🔑 Currying — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Currying` | تحويل دالة متعددة الـ parameters إلى سلسلة دوال، كل وحدة تاخذ parameter واحد |
| `Partial application` | تجهيز جزء من الـ arguments مسبقاً والحصول على دالة جاهزة للباقي |

### 🔑 Destructuring — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Array destructuring` | استخراج قيم من array حسب **الترتيب** (`const [x, y] = arr`) |
| `Object destructuring` | استخراج قيم من object حسب **مطابقة الاسم** (`const { name } = obj`) |
| `Default value` | قيمة تُستخدم تلقائياً لو الخاصية غير موجودة (`{ name = "Guest" }`) |
| `Skipping` | تخطي عنصر في array destructuring بفاصلة فارغة (`[a, , c]`) |

### 🔑 Spread & Rest — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Spread operator` | يوسّع array/object إلى عناصر منفردة (`[...arr, 4]`) |
| `Rest operator` | يجمع عناصر متعددة في array/object واحد (`function f(...args)`) |
| `Variadic function` | دالة تقبل عدد غير محدد من الـ arguments، عادة بواسطة `rest` |

### 🔑 Generators — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Generator function` | دالة معرَّفة بـ `function*` تقدر توقف وتستأنف تنفيذها |
| `yield` | يُرجع قيمة ويوقف التنفيذ مؤقتاً (بعكس `return` اللي ينهي الدالة) |
| `.next()` | يستأنف تنفيذ الـ generator لحد أول `yield` تالي، يرجع `{ value, done }` |
| `Lazy evaluation` | حساب القيم فقط وقت الحاجة الفعلية، لا كلها دفعة وحدة |

### 🔑 جداول المقارنة السريعة

| المعيار | Spread Operator | Rest Operator |
| --- | --- | --- |
| **الوظيفة** | يوسّع (expand) | يجمع (gather) |
| **مكان الاستخدام** | داخل array/object literal أو استدعاء دالة | في function parameters أو الطرف الأيسر لـ destructuring |
| **مثال** | `[...arr1, 3, 4]` | `function sum(...nums)` |
| **الرمز** | `...` (نفس الرمز تماماً) | `...` (نفس الرمز تماماً) |

| المعيار | `return` | `yield` |
| --- | --- | --- |
| **يُستخدم في** | أي دالة عادية | `generator function` فقط |
| **الأثر على الدالة** | ينهي التنفيذ نهائياً | يوقف التنفيذ مؤقتاً |
| **إمكانية الاستئناف** | لا | نعم، عبر `.next()` |

### 🔑 القواعد الذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | `Spread` يوسّع، `Rest` يجمع — نفس الرمز `...`، اتجاه معاكس حسب السياق |
| 2 | `Currying` يعتمد بالكامل على `Closures` — كل دالة في السلسلة تتذكر argument سابق |
| 3 | `Array destructuring` بالترتيب، `Object destructuring` بمطابقة الاسم |
| 4 | `yield` يوقف مؤقتاً، `return` ينهي نهائياً |
| 5 | `Spread` على array/object ينشئ نسخة جديدة (`immutability`) — لا يعدّل الأصل |

---

## الجزء الخامس: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما هو الـ `closure`؟
**A:** دالة تحتفظ بالوصول لمتغيرات الـ scope الخارجي حتى بعد انتهاء تنفيذ الدالة الخارجية.

### البطاقة 2
**Q2:** ما الفرق بين `Spread` و`Rest` رغم استخدام نفس الرمز `...`؟
**A:** `Spread` يوسّع قيمة موجودة إلى عناصرها المنفردة، بينما `Rest` يجمع عناصر متعددة في واحد — الفرق يحدده الموقع في الكود.

### البطاقة 3
**Q3:** ما هو الـ `Currying`؟
**A:** تحويل دالة متعددة الـ parameters إلى سلسلة دوال، كل واحدة تاخذ parameter واحد وترجع الدالة التالية.

### البطاقة 4
**Q4:** ليش دالة `multiply(2)` لا تحسب الضرب فوراً؟
**A:** لأنها ترجع دالة داخلية جديدة تنتظر الـ parameter الثاني — الحساب الفعلي يصير فقط عند نداء تلك الدالة الداخلية.

### البطاقة 5
**Q5:** ما الفرق بين `array destructuring` و`object destructuring`؟
**A:** الـ array يعتمد على ترتيب العناصر، بينما الـ object يعتمد على مطابقة اسم الخاصية بالضبط.

### البطاقة 6
**Q6:** متى تختار `destructuring` مباشرة في function parameters بدل استقبال object كامل؟
**A:** لما الدالة تحتاج تستخدم أكثر من خاصية واحدة من نفس الـ object — يوفر تكرار كتابة `object.property` في كل سطر.

### البطاقة 7
**Q7:** ما الفرق بين `return` و`yield` داخل `generator function`؟
**A:** `return` ينهي تنفيذ الدالة نهائياً، بينما `yield` يوقفها مؤقتاً مع إمكانية استئنافها لاحقاً عبر `.next()`.

### البطاقة 8
**Q8:** كيف تعرّف دالة `generator` في `JavaScript`؟
**A:** بإضافة نجمة (`*`) بعد كلمة `function`، مثل: `function* generatorFunc() { ... }`.

### البطاقة 9
**Q9:** ليش `while(true) { yield id++; }` لا تعلّق البرنامج، بعكس `while(true)` عادية؟
**A:** لأن كل `yield` يوقف التنفيذ ويعيد التحكم للمستدعي — التكرار التالي لا يبدأ إلا عند نداء `.next()` مرة أخرى.

### البطاقة 10
**Q10:** ما هو استخدام الفاصلة الفارغة `[a, , c]` في `array destructuring`؟
**A:** تتخطى عنصراً واحداً بدون تخزينه في أي متغير.

### البطاقة 11
**Q11:** ما هي الـ `variadic function` وكيف ترتبط بـ `Rest Operator`؟
**A:** دالة تقبل عدد غير محدد من الـ arguments؛ الـ `rest operator` (`...args`) هو الأداة اللي تُنشئ هذا النوع من الدوال بجمع كل الـ arguments في array واحد.

### البطاقة 12
**Q12:** لماذا يُعتبر `spread` على array أو object أداة مهمة لمبدأ `immutability`؟
**A:** لأنه ينشئ نسخة جديدة كلياً من البيانات بدل تعديل الأصل مباشرة — أي تعديل على النسخة الجديدة لا يؤثر على الأصلية.

### البطاقة 13
**Q13:** ما الفرق بين `Closures` و`Currying`؟
**A:** `Closures` مفهوم عام (دالة تتذكر متغيرات خارجية)، بينما `Currying` تطبيق خاص يستخدم `closures` لتحويل دالة متعددة الـ parameters إلى سلسلة دوال أحادية الـ parameter.

### البطاقة 14
**Q14:** ما هي الـ `Lazy evaluation` وكيف تظهر في `Generators`؟
**A:** حساب القيم فقط وقت الحاجة الفعلية لها بدل حسابها كلها دفعة وحدة؛ تظهر في `Generators` لأن كل قيمة تُحسب فقط عند نداء `.next()`.


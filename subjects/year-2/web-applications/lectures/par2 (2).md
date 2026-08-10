# المحاضرة 2 — TypeScript (تايبسكريبت)
> **المادة:** تطوير تطبيقات الويب (القسم العملي) | **الموضوع:** نظام الأنواع في TypeScript — الأساسيات، الأنواع المتقدمة، الـ Classes

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تشرح `TypeScript` كطبقة أنواع (`type system`) فوق `JavaScript`، من الأساسيات إلى الأنواع المتقدمة وحتى الـ `classes`.

### 🎯 ستتعلم
- الفرق بين `type` و `interface` ومتى تستخدم كل واحد
- كيف تبني أنواعاً معقدة (`union`، `intersection`، `mapped`، `conditional`)
- الـ `utility types` الجاهزة (`Partial`، `Readonly`، `Pick`، `ReturnType`)
- كيف تكتب `classes` بأمان أكبر من `JavaScript` العادي (`access modifiers`، `abstract`، `generics`)
- لماذا `TypeScript` يتحقق من **الشكل** (`structure`) وليس الاسم

### 📚 المتطلبات السابقة
- أساسيات `JavaScript`: `variables`، `functions`، `objects`، `classes` الأساسية في ES6
- فكرة أن الكود يُترجم (`compile`) قبل التشغيل — من محاضرة `HTTP`/بيئة التطوير

### 💡 الأفكار الرئيسية

خلّك تتخيل إنك تكتب `JavaScript` عادي، وفجأة تكتشف بعد نشر الكود إن دالة استقبلت `string` بدل `number` وانهار كل شي. هذا بالضبط اللي `TypeScript` جاي يمنعه. هو مو لغة جديدة كلياً، هو **superset** من `JavaScript` — يعني كل كود `JavaScript` صحيح هو كود `TypeScript` صحيح، بس `TypeScript` يضيف طبقة فحص أنواع فوقه. الفايدة الحقيقية: الأخطاء تنكشف وأنت تكتب الكود، مو بعد ما يوصل للمستخدم. وبما إنه `TypeScript` يتحول (`compiles`) إلى `JavaScript` عادي في النهاية، فالأنواع كلها تُمحى وقت التشغيل (`erased at runtime`) — يعني مالها أي تأثير على أداء الكود، هي بس أداة مساعدة وقت الكتابة.

الحلو إنك ما تحتاج تكتب النوع في كل مكان. لو كتبت `let helloWorld = "Hello World"`، فـ `TypeScript` يفهم من نفسه إنه `string` — هذا يسمى **type inference**. بس لما يصير الشكل معقد (`object` فيه أكثر من خاصية مثلاً)، تحتاج تعرّف النوع بنفسك عشان يوثّق نيتك ويسهّل القراءة على غيرك.

أهم فكرة بعدها: `TypeScript` عنده طريقتين لتسمية الأشكال — `interface` و `type`. القاعدة البسيطة: لو الشكل اللي تصفه هو **كائن (object)** بحت وممكن تحتاج توسّعه لاحقاً، استخدم `interface`. لو تحتاج مرونة أكثر — `union types` (قيمة من عدة احتمالات)، أو `intersection` (دمج نوعين)، أو أنواع أساسية مو `object` — استخدم `type`. كلاهما يقدر يوصف شكل `object`، لكن `type` أوسع.

| المعيار | `interface` | `type` |
| --- | --- | --- |
| وصف شكل `object` | ✅ | ✅ |
| `union` / `intersection` | ❌ | ✅ |
| التوسعة لاحقاً (`declaration merging`) | ✅ | ❌ |
| الاستخدام الشائع | `object` shapes، `class` contracts | كل شي ثاني |

> 🎯 **جملة الامتحان:** `interface` تُستخدم لوصف شكل `object` وتدعم `declaration merging`، بينما `type` أكثر مرونة وتدعم `union` و`intersection`.

من هنا تبدأ الأنواع المتقدمة تبني فوق بعض. `union type` زي `type Size = "small" | "medium" | "large"` يعني القيمة لازم تكون وحدة من هذي الثلاث بالضبط — مفيد لما عندك مجموعة ثابتة من الخيارات. `intersection type` بالعكس، يدمج نوعين ببعض بـ `&` فتصير القيمة لازم تحقق **كل** خصائص النوعين. فوق هذا، فيه أدوات لاستخراج أنواع من قيم موجودة أصلاً: `typeof` يطلع لك نوع متغير موجود، و`keyof` يطلع لك `union` من أسماء خصائص نوع معيّن (`"name" | "id"` مثلاً)، و`Indexed Access Types` زي `Response["data"]` يطلع لك نوع خاصية وحدة بس من داخل نوع أكبر.

أعمق من هذا فيه `conditional types` — أنواع فيها منطق شرطي زي `T extends string ? true : false`، تشتغل تقريباً زي `if` بس على مستوى الأنواع مو القيم. و`template literal types` تخليك تبني أنواع `string` بدمج `unions` ببعض، زي `${Lang}_${Section}_id` اللي ينتج كل التركيبات الممكنة. و`mapped types` تاخذ نوع موجود وتحوّل كل خاصية فيه لشكل جديد — هذا بالضبط أساس الـ `utility types` الجاهزة اللي بتشوفها بعدين.

وبما إن كتابة هذي الأنواع المعقدة يدوياً بيصير مكرر، `TypeScript` جهّز لك أدوات جاهزة (`utility types`) مبنية أصلاً بـ `mapped types`: `Partial<T>` يخلي كل خصائص النوع اختيارية (`optional`)، `Readonly<T>` يمنع تعديلها بعد الإنشاء، `Pick<T, K>` يطلع لك نوع جديد فيه بس الخصائص اللي تحددها (مفيد جداً لما تبي تخفي حقول حساسة زي `password`)، و`ReturnType<T>` يطلع لك نوع القيمة اللي ترجعها دالة معينة بدون ما تكتبه يدوي.

> 🎯 **جملة الامتحان:** `Pick<User, 'id' | 'name'>` تنشئ نوعاً جديداً يحتوي فقط الخصائص المحددة من `User`، وتُستخدم غالباً لإخفاء حقول حساسة مثل `password`.

بعد الأنواع، المحاضرة تنتقل للـ `classes`. الفكرة الأساسية: `TypeScript` ما يخترع `classes` جديدة، هو يضيف فحص أنواع فوق `classes` الـ `JavaScript` العادية، والسلوك وقت التشغيل يبقى نفسه تماماً. أهم إضافة هي **access modifiers**: `public` (الافتراضي، أي حد يوصله)، `private` (بس من داخل الـ `class` نفسها)، و`protected` (من داخل الـ `class` والـ `classes` اللي ترث منها). بس خلّك منتبه: `private` هذي فحص وقت الكتابة بس (`compile-time`)، بعد التحويل لـ `JavaScript` عادي القيمة تصير قابلة للوصول فعلياً. لو تبي حماية حقيقية وقت التشغيل، فيه بديل من `JavaScript` نفسه اسمه `#private` (بـ `#` قبل الاسم) وهذا ممنوع الوصول له حتى لو جربت تحايل.

من الأشياء اللي تسهّل الكود: **parameter properties** — بدل ما تكتب الخاصية في الـ `class` وبعدين تسويها في الـ `constructor`، تقدر تكتب `constructor(public x: number, public y: number) {}` وتلقائياً `TypeScript` يسوي الخاصية والتعيين بخطوة وحدة. وفيه **getters/setters** للتحكم بالوصول لخاصية (تراقب أو تعدّل القيمة وقت القراءة/الكتابة)، و**static members** اللي تنتمي للـ `class` نفسها مو لكل `instance` — يعني توصلها بـ `Config.version` مباشرة بدون ما تسوي `new Config()`.

فيه أيضاً مفهوم `this` اللي لازم تنتبه له: قيمة `this` داخل `method` تعتمد على **كيف استدعيت الدالة** مو وين كُتبت. لو مررت `method` كـ `callback` (زي `onClick`)، ممكن يضيع سياق `this`. الحل الشائع: استخدام `arrow function` كخاصية بدل `method` عادية، لأن الـ `arrow function` ما تربط `this` الخاص فيها — تاخذ `this` من السياق اللي كُتبت فيه.

آخر شي في الـ `classes`: `inheritance` (وراثة عن طريق `extends` مع إمكانية `override` للـ `methods`)، `implements` (يفرض على الـ `class` تلتزم بشكل معيّن من `interface`)، `abstract classes` (ما تقدر تسوي منها `instance` مباشرة، تستخدم كـ `base class` وتحتوي `methods` مجردة لازم الأبناء يعرّفوها)، و`generics` (`classes` قابلة لإعادة الاستخدام مع أي نوع، زي `Box<T>` تقدر تخزن فيها أي نوع وتحافظ على الأمان).

آخر فكرة بالمحاضرة، ومن أهمها للفهم العميق: `TypeScript` يستخدم **structural type system** — يعني الفحص يكون على **شكل** الكائن مو على **اسم** النوع. لو عندك `interface Point { x: number; y: number }` ودالة تستقبل `Point`، فأي `object` فيه `x` و`y` رقميين يقدر يمر — حتى لو ما كُتب بالأصل كـ `Point`، وحتى لو كان `instance` من `class` مختلفة كلياً زي `VirtualPoint`. بس فيه استثناء يسمى **excess property check**: لو مرّرت `object literal` (كائن مكتوب مباشرة) فيه خصائص زيادة عن المطلوب، `TypeScript` يرفضه مباشرة — رغم إن نفس الكائن لو كان بمتغير منفصل كان بيمر عادي. هذا فرق دقيق يحب يجيبه الامتحان.

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
كثير طلاب يفتكرون إن `private` في `TypeScript` تمنع الوصول للخاصية فعلياً وقت التشغيل، زي حماية حقيقية.

#### الفهم الصحيح ✅:
`private` هي فحص وقت الكتابة (`compile-time`) بس. بعد ما يتحوّل الكود لـ `JavaScript` عادي، الخاصية تصير عامة زي أي خاصية ثانية. الحماية الحقيقية وقت التشغيل تجيك من `#private` (الـ `JavaScript` native private fields).

---

### 🔗 الاتصالات مع مواضيع أخرى
- **ما قبله:** `JavaScript` الأساسي (`variables`، `functions`، `objects`، `classes` بدون أنواع) هو الأساس اللي `TypeScript` يبني فوقه.
- **الجاي بعده:** غالباً `interfaces` و`generics` بتُستخدم لاحقاً في تعريف `props` و`state` في `React`، أو في تعريف شكل `request`/`response` عند التعامل مع `REST APIs`.

### لما تحتاج هذا في الامتحان
غالباً الأسئلة تركز على: الفرق بين `type` و`interface`، الفرق بين `private` و`#private`، كيف تشتغل `utility types` زي `Pick` و`Partial`، ومفهوم `structural typing` مع `excess property check` — هذا الأخير كثير يجيب فيه سؤال "ليش هذا الكود يعطي خطأ بينما هذا الشبيه له ما يعطي".

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. أساسيات TypeScript

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "javascript_basics"} -->

#### 📍 أين نحن الآن؟
هذا أول قسم — نتعرف على `TypeScript` وليش نستخدمه بدل `JavaScript` العادي.

#### ⬅️ الربط مع السابق
تعرف `JavaScript` أصلاً؛ `TypeScript` يبني فوقه مباشرة بدون ما يغيّر طريقة التشغيل.

#### 💡 الفكرة الأساسية
**`TypeScript` هو `superset` من `JavaScript` يضيف نظام أنواع ثابت (`static typing`) يُفحص وقت الكتابة، ثم يُترجم إلى `JavaScript` عادي.**

---

#### 💻 الكود
```typescript
// Declaring a variable with an explicit type
let message: string = "Hello";
let count: number = 10;
```

#### شرح كل سطر:
1. `let message: string = "Hello"` → `: string` هو تحديد النوع صراحةً — يمنع أي قيمة غير نصية من التعيين لهذا المتغير لاحقاً
2. `let count: number = 10` → نفس الفكرة لكن للأرقام؛ لو حاولت `count = "ten"` لاحقاً، `TypeScript` يعطي خطأ فوري

#### 📖 الشرح
`TypeScript` ما يشتغل كلغة منفصلة عن `JavaScript` — هو طبقة فحص تُترجم في النهاية إلى `JavaScript` صافي، وبالتالي أي كود `JavaScript` سليم هو تلقائياً كود `TypeScript` سليم، وتقدر تتبناه تدريجياً (`gradually adopt`) بدون ما تعيد كتابة مشروعك بالكامل.

الفائدة الأساسية هي اكتشاف الأخطاء **مبكراً** — وقت الكتابة، مو بعد ما ينشر الكود ويجرّبه مستخدم حقيقي. وفوق هذا، الأنواع تحسّن دعم بيئة التطوير (`IDE`) زي الإكمال التلقائي (`autocomplete`) وإعادة الهيكلة الآمنة (`refactoring`)، وتخلي المشاريع الكبيرة أسهل بالصيانة لأن أي تغيير بالشكل ينكشف فوراً بكل مكان يستخدمه.

النقطة المهمة الأخيرة: الأنواع تُمحى وقت التشغيل (`types are erased at runtime`) — يعني بعد التحويل لـ `JavaScript`، ما فيه أي أثر للأنواع، فما فيه أي تكلفة أداء إضافية.

#### 💡 التشبيه:
> فكّر إن `TypeScript` زي مدقق إملائي (`spell checker`) يشتغل وأنت تكتب — يوقفك قبل ما ترسل الرسالة فيها غلط، بدل ما يكتشفها القارئ بعدين.
> **وجه الشبه:** المدقق الإملائي = فحص الأنواع وقت الكتابة، إرسال الرسالة = تشغيل الكود.

#### 🎯 الملخص السريع
- `TypeScript` = `JavaScript` + نظام أنواع ثابت
- التبني تدريجي (`gradual adoption`)
- الأنواع تُمحى وقت التشغيل — لا تأثير على الأداء

> 🎯 **جملة الامتحان:** `TypeScript` هو `superset` من `JavaScript` يتحول (`compiles`) إلى `JavaScript` عادي، والأنواع تُفحص وقت الكتابة فقط ثم تُمحى (`erased`) وقت التشغيل.

#### 📚 التطبيق
هذا الأساس اللي تُبنى عليه كل الأقسام الجاية — أي نوع تعرّفه لاحقاً يتبع نفس مبدأ "فحص وقت الكتابة، لا تأثير وقت التشغيل".

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "TypeScript extends JavaScript by adding a powerful type system. It catches errors early... Static typing helps detect bugs during development... TypeScript is a superset of JavaScript... Compiles to plain JavaScript... Types are erased at runtime"

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: `superset`، `static typing`، `gradual adoption`، `erased at runtime`، فوائد الـ `IDE`

</details>

---

### 1.1. الأنواع الأساسية (Everyday Types)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
نتعرف على الأنواع اللي بتستخدمها يومياً في أي كود `TypeScript`.

#### ⬅️ الربط مع السابق
هذي أول تطبيق عملي لفكرة "تحديد النوع صراحة" اللي شرحناها بالقسم السابق.

#### 💡 الفكرة الأساسية
**الأنواع الأساسية هي `string`، `number`، `boolean`، والمصفوفات (`arrays`) والكائنات (`objects`) المبنية فوقها.**

---

#### 💻 الكود
```typescript
let age: number = 30;
let isAdmin: boolean = true;
let names: string[] = ["Alice", "Bob"];
```

#### شرح كل سطر:
1. `age: number` → عدد صحيح أو عشري
2. `isAdmin: boolean` → قيمة منطقية `true`/`false` فقط
3. `names: string[]` → مصفوفة كل عناصرها لازم تكون `string`؛ لو حاولت تضيف رقم يعطي خطأ

#### 📖 الشرح
هذي الأنواع هي حجر الأساس (`building blocks`) لأي برنامج — أي نوع أعقد لاحقاً (زي `objects` أو `unions`) مبني من تركيب هذي الأنواع الأساسية ببعض. النوع `string[]` تحديداً هو صيغة مختصرة لـ "مصفوفة من `string`" — تقدر كمان تكتبها `Array<string>` وتعطي نفس النتيجة.

#### 💡 التشبيه:
> فكّر في الأنواع الأساسية زي قطع الليقو (`Lego`) الأساسية — مربع، مستطيل، دائرة. أي شكل معقد لاحقاً هو تجميع لهذي القطع.
> **وجه الشبه:** قطع الليقو الأساسية = `string`/`number`/`boolean`، الشكل المعقد = `objects` و`interfaces`.

#### 🎯 الملخص السريع
- `string`، `number`، `boolean` هي الأساس
- `string[]` = مصفوفة نصوص، بنفس المبدأ لأي نوع ثاني
- `{}` تصف شكل `object`

> 🎯 **جملة الامتحان:** `T[]` هي الصيغة المختصرة لتعريف مصفوفة عناصرها كلها من النوع `T`.

#### 📚 التطبيق
هذي الأنواع تُستخدم في كل مكان لاحقاً — بارامترات الدوال، خصائص الـ `interfaces`، وقيم الـ `generics`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Common types used daily: string, number, boolean. Arrays: string[]. Objects: {}... These are the building blocks of all programs"

</details>

---

### 1.2. الاستدلال على الأنواع (Type Inference)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1"} -->

#### 📍 أين نحن الآن؟
نتعلم إن `TypeScript` ما يحتاج منك تكتب النوع دايماً — يقدر يستنتجه.

#### ⬅️ الربط مع السابق
بعد ما تعلمنا كتابة النوع صراحة، الآن نشوف متى نقدر **نتجاهل** كتابته.

#### 💡 الفكرة الأساسية
**`TypeScript` يستنتج (`infers`) النوع تلقائياً من القيمة الأولية بدون ما تكتبه صراحة.**

---

#### 💻 الكود
```typescript
let helloWorld = "Hello World";
// TypeScript infers: helloWorld is of type string
```

#### شرح كل سطر:
1. `let helloWorld = "Hello World"` → ما فيه `: string` مكتوبة، لكن `TypeScript` يفهمها تلقائياً من القيمة `"Hello World"`

#### 📖 الشرح
الاستدلال على الأنواع يقلل الحشو (`verbosity`) ويخلي الكود أنظف للقراءة، بدون ما يفقد أي أمان — النوع لسا موجود ومفعّل من طرف `TypeScript`، بس أنت ما كتبته بيدك. القاعدة العملية: اترك `TypeScript` يستنتج النوع لما يكون واضح من القيمة مباشرة، واكتب النوع صراحة لما يكون الشكل معقد أو غير واضح من نظرة أولى (زي `objects` فيها أكثر من خاصية، أو لما تعرّف دالة بدون قيمة ابتدائية).

#### 💡 التشبيه:
> زي لما تكتب "3 تفاحات" ما تحتاج تقول "3 تفاحات، وهذا رقم عدد صحيح موجب" — واضح من السياق.
> **وجه الشبه:** السياق الواضح = القيمة الابتدائية، الاستنتاج التلقائي = `type inference`.

#### 🎯 الملخص السريع
- `TypeScript` يستنتج النوع من القيمة الابتدائية
- يقلل الحشو بدون فقدان الأمان
- اكتب النوع صراحة فقط لما يكون الاستنتاج غير كافٍ

> 🎯 **جملة الامتحان:** `Type Inference` يعني إن `TypeScript` يحدد نوع المتغير تلقائياً من قيمته الابتدائية بدون الحاجة لكتابة النوع صراحةً.

#### 📚 التطبيق
هذا يفسر ليش كثير من كود `TypeScript` اللي بتشوفه ما فيه أنواع مكتوبة بالمتغيرات البسيطة — النوع موجود، بس مستنتَج.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "TypeScript infers types automatically... Reduces verbosity. Keeps code readable. Still provides full type safety"

</details>

---

### 1.3. تعريف الأنواع صراحةً (Defining Types)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.2"} -->

#### 📍 أين نحن الآن؟
نشوف متى وكيف نعرّف النوع بأنفسنا بدل ما نعتمد على الاستنتاج.

#### ⬅️ الربط مع السابق
هذا استمرار مباشر لفكرة `type inference` — لما الاستنتاج ما يكفي، نستخدم هذا الأسلوب.

#### 💡 الفكرة الأساسية
**لما يكون شكل الـ `object` معقداً، تعرّف `interface` منفصلة توثّق شكله بوضوح.**

---

#### 💻 الكود
```typescript
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
```

#### شرح كل سطر:
1. `interface User { name: string; id: number; }` → تعريف شكل `User`: خاصيتين، `name` نصية و`id` رقمية
2. `const user: User = {...}` → ربط المتغير `user` بالنوع `User` صراحة، فأي محاولة تعيين خاصية زيادة أو ناقصة تعطي خطأ

#### 📖 الشرح
تعريف النوع صراحةً يحسّن قابلية القراءة (`readability`) لأنه يوثّق نيتك — أي حد يقرأ الكود يعرف فوراً شكل `User` المتوقع بدون ما يتتبع من وين جاءت القيمة. وهو ضروري تحديداً لما تكون تكتب دالة تستقبل `parameter` بدون قيمة ابتدائية — هنا ما فيه شي يستنتج منه `TypeScript` النوع، فلازم تكتبه صراحة.

#### 💡 التشبيه:
> زي عقد رسمي (`contract`) بين طرفين — يحدد بالضبط شكل البيانات المتوقعة قبل ما تبدأ التعامل.
> **وجه الشبه:** العقد الرسمي = `interface`، الطرفين الملتزمين = المتغير والقيمة المعيّنة له.

#### 🎯 الملخص السريع
- استخدم `interface`/`type` صراحة لما الشكل معقد
- يحسّن القراءة ويوثّق النية
- ضروري لما ما فيه قيمة ابتدائية يُستنتج منها النوع

> 🎯 **جملة الامتحان:** تعريف النوع صراحةً ضروري خصوصاً عند تعريف `parameters` بدون قيمة ابتدائية، لأن `TypeScript` ما عنده شي يستنتج منه النوع.

#### 📚 التطبيق
هذا الأساس اللي يقودنا مباشرة لقسم `Type Aliases` و`Interfaces` بالتفصيل بعده.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "When inference is not enough, define types explicitly... Improves readability. Documents intent"

</details>

---

### 2. Type Aliases و Interfaces

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.3"} -->

#### 📍 أين نحن الآن؟
ندخل بالتفصيل على الطريقتين الرئيسيتين لتسمية الأنواع: `type` و`interface`.

#### ⬅️ الربط مع السابق
استخدمنا `interface` أصلاً بالقسم اللي قبل، الآن نفهم الفرق بينه وبين `type`.

#### 💡 الفكرة الأساسية
**`type alias` يعطي اسماً لأي نوع (بسيط أو معقد)، و`interface` يوصف تحديداً شكل `object` ويدعم التوسعة لاحقاً.**

---

#### 💻 الكود
```typescript
// Type alias for a simple string type
type UserID = string;

// Type alias for an object shape
type Point = { x: number; y: number };

// Interface describing an object shape
interface User {
  name: string;
}

// Intersection: combine User with an extra 'role' property
type Admin = User & { role: string };
```

#### شرح كل سطر:
1. `type UserID = string` → اسم بديل (`alias`) لنوع بسيط موجود أصلاً
2. `type Point = { x: number; y: number }` → اسم لشكل `object` معقد
3. `interface User { name: string; }` → نفس فكرة وصف شكل `object` لكن بصياغة `interface`
4. `type Admin = User & { role: string }` → دمج `interface User` مع خاصية إضافية باستخدام `&` (`intersection`)

#### 📖 الشرح
كلا الأداتين تقدر توصف شكل `object`، لكن الفرق الجوهري: `interface` مصممة تحديداً لأشكال الـ `objects` وتدعم ميزة اسمها `declaration merging` — لو عرّفت نفس `interface` مرتين، `TypeScript` يدمجهم تلقائياً. `type` بالمقابل أوسع وأشمل: تقدر تستخدمها لأي شي — أنواع بسيطة، `unions`، `intersections`، حتى `tuples` — لكن ما تقدر توسّعها بعد التعريف بنفس الاسم.

القاعدة العملية المتعارف عليها: استخدم `interface` لما تصف شكل `object` أو عقد لـ `class` (`contract`)، واستخدم `type` لأي شي ثاني — خصوصاً `unions` و`intersections`.

#### 💡 التشبيه:
> `interface` زي نموذج طلب توظيف رسمي — له شكل ثابت تقدر تضيف له حقول لاحقاً بنفس الاسم. `type` زي ملصق (`label`) تقدر تلزقه على أي شي، بسيط أو معقد.
> **وجه الشبه:** النموذج الرسمي = `interface` (قابل للتوسعة)، الملصق العام = `type` (مرن لأي شكل).

#### 🎯 الملخص السريع
- `type` = اسم لأي نوع؛ `interface` = وصف شكل `object`
- `interface` تدعم `declaration merging`
- `type` تدعم `union`/`intersection`/`tuple`

> 🎯 **جملة الامتحان:** استخدم `interface` عند وصف شكل `object` قابل للتوسعة، واستخدم `type` عند الحاجة لـ `union` أو `intersection` أو أنواع غير `object`.

#### 📚 التطبيق
هذا التمييز يظهر باستمرار لاحقاً في تعريف `props` بـ `React` وتعريف `request/response` shapes بالـ `APIs`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
`interface` و`type` قابلين للاستبدال دايماً بدون فرق حقيقي.

#### الفهم الصحيح ✅:
فيه فروقات جوهرية — `type` وحدها تدعم `union`/`intersection`، و`interface` وحدها تدعم `declaration merging`. الاختيار يعتمد على الحاجة الفعلية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Type aliases give names to types... interface → best for object shapes. type → more flexible... Types support unions, intersections, and more"

</details>

---

### 2.1. أشكال الكائنات والدوال (Object Literal Types & Function Types)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### 📍 أين نحن الآن؟
نتعلم وصف شكل `object` بتفصيل أكبر (خصائص اختيارية)، ووصف شكل دالة كنوع مستقل.

#### ⬅️ الربط مع السابق
استمرار مباشر لـ `type Point` اللي شرحناها بالقسم السابق، لكن بإضافة خصائص اختيارية.

#### 💡 الفكرة الأساسية
**`?` بعد اسم الخاصية يخليها اختيارية، وأنواع الدوال (`function types`) توصف شكل الـ `parameters` والـ `return type` بدون كتابة جسم الدالة.**

---

#### 💻 الكود
```typescript
// Object type with an optional property
type Product = {
  name: string;
  price: number;
  inStock?: boolean;
};

// Function type: describes a callback signature
type Callback = (value: string) => void;
```

#### شرح كل سطر:
1. `inStock?: boolean` → الـ `?` يجعل الخاصية اختيارية، يعني تقدر تنشئ `Product` بدونها
2. `type Callback = (value: string) => void` → يوصف أي دالة تستقبل `string` وترجع `void` (ما ترجع شي)

#### 📖 الشرح
الخصائص الاختيارية (`optional properties`) مفيدة لما تكون بعض البيانات غير مضمونة الوجود دايماً — زي `inStock` اللي ممكن ما يكون معروف وقت إنشاء المنتج. `TypeScript` يفرض هذا الفحص: أي وصول لخاصية اختيارية لازم تتأكد من وجودها أول (وإلا يحذّرك).

أما `function types` فهي مفيدة جداً لما تمرر دالة كـ `parameter` لدالة ثانية (`callback`) — تحدد شكل التوقيع (`signature`) المتوقع مرة وحدة وتعيد استخدامه.

#### 💡 التشبيه:
> الخاصية الاختيارية زي حقل "الاسم الأوسط" بنموذج تسجيل — موجود بس مو إلزامي.
> **وجه الشبه:** حقل اختياري بالنموذج = خاصية بـ `?`.

#### 🎯 الملخص السريع
- `?` = خاصية اختيارية
- `type Callback = (params) => ReturnType` يوصف شكل دالة
- مفيد لتوصيف الـ `callbacks`

> 🎯 **جملة الامتحان:** إضافة `?` بعد اسم خاصية في تعريف نوع `object` تجعلها اختيارية (`optional`) وليست إلزامية.

#### 📚 التطبيق
`function types` تُستخدم كثير في تعريف `event handlers` وأي دالة تُمرَّر كـ `parameter`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Optional fields with ?. Strong structure enforcement... Describe callable structures... Can define parameters and return types"

</details>

---

### 3. Union و Intersection و Tuple Types

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1"} -->

#### 📍 أين نحن الآن؟
نتعلم ثلاث طرق لتركيب أنواع من أنواع ثانية.

#### ⬅️ الربط مع السابق
هذا توسيع مباشر لفكرة `Admin = User & { role: string }` اللي شفناها بقسم `Type Aliases`.

#### 💡 الفكرة الأساسية
**`union` (`|`) يعني "هذا أو ذاك"، `intersection` (`&`) يعني "هذا وذاك معاً"، و`tuple` مصفوفة بطول ثابت وكل موضع له نوع محدد.**

---

#### 💻 الكود
```typescript
// Union: value must be exactly one of these strings
type Size = "small" | "medium" | "large";

// Intersection: merges properties from A and B
type A = { x: number };
type B = { y: number };
type C = A & B; // { x: number, y: number }

// Tuple: fixed-length array, each position has a known type
type Data = [number, string];
```

#### شرح كل سطر:
1. `type Size = "small" | "medium" | "large"` → القيمة لازم تكون **وحدة بالضبط** من هذي الثلاث نصوص، ما فيه رابع
2. `type C = A & B` → النوع الناتج يحتوي **كل** خصائص `A` و`B` معاً — يعني لازم القيمة تحقق `x` و`y` مع بعض
3. `type Data = [number, string]` → مصفوفة من عنصرين بالضبط: الأول رقم، الثاني نص — الترتيب مهم

#### 📖 الشرح
`union types` مثالية لما عندك مجموعة ثابتة ومحدودة من الخيارات المسموحة — تمنع أي قيمة غريبة عن القائمة. `intersection types` بالعكس تُستخدم لدمج خصائص من أكثر من مصدر بدون تكرار التعريف — زي مثال `Admin = User & { role: string }` اللي شفناه قبل، فهي فعلياً `intersection`.

`tuple types` مختلفة عن المصفوفة العادية (`string[]`) لأن كل **موضع** له نوع محدد مسبقاً وطول المصفوفة ثابت — مفيدة لما تبي ترجع أكثر من قيمة من دالة وتحافظ على ترتيب ونوع كل قيمة (زي `[id, name]`).

#### 💡 التشبيه:
> `union` زي قائمة أحجام القهوة (صغير/وسط/كبير) — لازم تختار وحدة بالضبط. `intersection` زي ساندويتش يجمع مكونين مع بعض بنفس الوقت. `tuple` زي عنوان بيت: رقم شارع (رقم) ثم اسم شارع (نص) — الترتيب والنوع ثابتين.
> **وجه الشبه:** خيار القهوة = `union`، الساندويتش المدمج = `intersection`، العنوان المرتب = `tuple`.

#### 🎯 الملخص السريع
- `union` (`|`) = واحد من عدة خيارات محددة
- `intersection` (`&`) = دمج كل الخصائص معاً
- `tuple` = مصفوفة بطول ونوع ثابت لكل موضع

> 🎯 **جملة الامتحان:** `union type` يسمح للقيمة بأن تكون واحدة فقط من مجموعة أنواع محددة باستخدام `|`، بينما `intersection type` يدمج كل خصائص الأنواع المستخدمة باستخدام `&`.

#### 📚 التطبيق
`union types` تُستخدم كثير في حالات زي `status: "loading" | "success" | "error"` بإدارة الحالة (`state management`).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كثير طلاب يخلطون بين `Size = "small" | "medium"` (`union` بقيم نصية محددة) و`string` العادية.

#### الفهم الصحيح ✅:
`Size` تقبل فقط النصوص المحددة بالضبط، بينما `string` تقبل **أي** نص. لو كتبت `let s: Size = "extra-large"` يعطي خطأ، رغم إنه `string` صحيح.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "A value can be one of many types... Useful for fixed sets of values... Combine multiple types... Merges properties... Fixed-length arrays with known types... Each position has a specific type"

</details>

---

### 3.1. استخراج الأنواع من القيم (typeof و Indexed Access)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
نتعلم كيف نستخرج نوعاً جديداً من قيمة أو نوع موجود أصلاً بدل ما نكتبه من الصفر.

#### ⬅️ الربط مع السابق
بعد ما تعلمنا تركيب أنواع من أنواع (`union`/`intersection`)، الآن نتعلم **استخراج** أنواع من مصادر موجودة.

#### 💡 الفكرة الأساسية
**`typeof` يستخرج نوع متغير موجود، و`Indexed Access Type` (`T["key"]`) يستخرج نوع خاصية وحدة من نوع أكبر — الاثنين يحافظون على تزامن (`sync`) الأنواع مع الكود.**

---

#### 💻 الكود
```typescript
// Extracting a type from an existing value
const data = { name: "Alice" };
type Data = typeof data; // { name: string }

// Extracting a nested type by key
type Response = { data: string };
type ResponseData = Response["data"]; // string
```

#### شرح كل سطر:
1. `type Data = typeof data` → `TypeScript` يقرأ شكل المتغير `data` الموجود ويحوّله لنوع باسم `Data`
2. `type ResponseData = Response["data"]` → استخراج نوع خاصية `data` فقط من داخل `Response` (اللي هي `string`)

#### 📖 الشرح
الفايدة الأساسية من `typeof` هي إبقاء التزامن بين القيمة الفعلية والنوع — لو غيّرت شكل `data`، النوع `Data` يتحدث تلقائياً بدون ما تعدّل شي يدوي. هذا يقلل الأخطاء الناتجة عن نسيان تحديث نوع بعد تعديل القيمة.

`Indexed Access Types` مفيدة لما تحتاج نوع جزء صغير بس من نوع أكبر معقد — بدل ما تعيد تعريف نفس الشكل يدوياً، تسحبه مباشرة من مكانه الأصلي.

#### 💡 التشبيه:
> `typeof` زي أخذ صورة (`snapshot`) لشكل شيء موجود فعلياً واستخدامها كقالب. `Indexed Access` زي اقتباس جملة وحدة بس من كتاب كامل.
> **وجه الشبه:** الصورة/القالب = `typeof`، الاقتباس الجزئي = `Indexed Access Type`.

#### 🎯 الملخص السريع
- `typeof value` → يستخرج نوع من قيمة موجودة
- `Type["key"]` → يستخرج نوع خاصية وحدة من نوع أكبر
- الاثنين يحافظون على التزامن مع الكود الأصلي

> 🎯 **جملة الامتحان:** `typeof` يُستخدم لاستخراج نوع من قيمة موجودة فعلياً في الكود، وليس من نوع مُعرَّف مسبقاً.

#### 📚 التطبيق
`typeof` يُستخدم كثير مع `ReturnType` (بعده بالمحاضرة) لاستخراج نوع القيمة اللي ترجعها دالة معينة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Extract types from existing values... Keeps types in sync with values... Access part of a type... Extracts nested types"

</details>

---

### 4. الأنواع الشرطية وأنواع Template Literal

<!-- @render: {type: "code-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_3.1"} -->

#### 📍 أين نحن الآن؟
ندخل على أعمق جزء بنظام الأنواع — منطق شرطي وبناء أنواع نصية ديناميكياً.

#### ⬅️ الربط مع السابق
بعد ما تعلمنا استخراج ودمج الأنواع، الآن نتعلم إعطاء الأنواع **منطق قرار**.

#### 💡 الفكرة الأساسية
**`conditional type` يشتغل زي `if` لكن على مستوى الأنواع، و`template literal type` يبني أنواع `string` جديدة بدمج `unions` ببعض.**

---

#### 💻 الكود
```typescript
// Conditional type: works like an if-statement, but for types
type IsString<T> = T extends string ? true : false;

// Template literal type: combines string unions into all possible combinations
type Lang = "en" | "pt";
type Section = "header" | "footer";
type IDs = `${Lang}_${Section}_id`;
// Result: "en_header_id" | "en_footer_id" | "pt_header_id" | "pt_footer_id"
```

#### شرح كل سطر:
1. `type IsString<T> = T extends string ? true : false` → لو النوع `T` الممرَّر هو `string` (أو نوع فرعي منه)، النتيجة `true`، وإلا `false`
2. `type IDs = \`${Lang}_${Section}_id\`` → يولّد تلقائياً كل التركيبات الممكنة بين قيم `Lang` وقيم `Section`

#### 📖 الشرح
`conditional types` تسمح بمنطق قرار داخل نظام الأنواع نفسه — مفيدة جداً لما تكتب `utility types` عامة تتصرف بشكل مختلف حسب نوع الـ `input` الممرّر لها. هذا مفهوم متقدم غالباً تشوفه أكثر داخل مكتبات جاهزة مو بالكود اليومي مباشرة.

`template literal types` توفر عليك كتابة كل تركيبة يدوياً — بدل ما تكتب أربع قيم `union` بنفسك، `TypeScript` يولّدها تلقائياً من ضرب القائمتين ببعض.

#### 💡 التشبيه:
> `conditional type` زي سؤال نعم/لا يحدد مصير القيمة. `template literal type` زي آلة تركّب كل التوليفات الممكنة من قائمتين ملابس (لون + مقاس) تلقائياً.
> **وجه الشبه:** سؤال نعم/لا = `conditional type`، آلة التوليف = `template literal type`.

#### 🎯 الملخص السريع
- `T extends X ? A : B` = منطق شرطي على مستوى الأنواع
- `` `${A}_${B}` `` = يولّد كل تركيبات `A` و`B` تلقائياً
- الاثنين أدوات متقدمة تُستخدم غالباً داخل مكتبات

> 🎯 **جملة الامتحان:** `Conditional Types` تستخدم صيغة `T extends X ? A : B` لتطبيق منطق شرطي على الأنواع بشكل مشابه لجملة `if` في القيم العادية.

#### 📚 التطبيق
هذي الأنواع أساس بناء `mapped types` و`utility types` الجاية بالقسم بعده.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو غيّرنا `Lang` لتصير `"en" | "pt" | "ar"`، كم تركيبة بيصير عندنا بنوع `IDs`؟
> **لماذا هذا مهم؟** يختبر فهمك إن `template literal type` يضرب كل القيم الممكنة ببعض — النتيجة ستة تركيبات بدل أربعة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> "Types with logic... Works like if in type system... Build types using strings... Combines string unions"

**ملاحظة على التغطية:**
- ✓ تم شرح: `conditional types`، `template literal types`، آلية العمل
- ⚠️ غير مشروح بالكامل: `distributive conditional types` (سلوك متقدم جداً لـ `conditional types` مع `unions`) — غير مذكور بالمحاضرة الأصلية أصلاً

</details>

---

### 4.1. Mapped Types والـ Utility Types

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن الآن؟
نتعلم كيف نحوّل نوع موجود بالكامل لشكل جديد، وأشهر الأدوات الجاهزة المبنية على هذي الفكرة.

#### ⬅️ الربط مع السابق
`mapped types` تستخدم مفهوم `keyof` (بيُشرح بالقسم بعده) لتكرار كل خاصية من نوع موجود.

#### 💡 الفكرة الأساسية
**`mapped type` يمشي على كل خاصية من نوع موجود ويحوّلها لشكل جديد؛ الـ `utility types` الجاهزة (`Partial`، `Readonly`، `Pick`، `ReturnType`) هي أمثلة جاهزة مبنية بنفس الفكرة.**

---

#### 💻 الكود
```typescript
// Mapped type: transforms every property into a subscriber function
type Subscriber<T> = {
  [K in keyof T]: (value: T[K]) => void;
};
```

#### شرح كل سطر:
1. `[K in keyof T]` → `keyof T` يطلع كل أسماء خصائص `T` كـ `union`، و`in` يكرر على كل واحدة منها باسم `K`
2. `(value: T[K]) => void` → لكل خاصية `K`، ينشئ دالة تستقبل قيمة من نفس نوع تلك الخاصية وترجع `void`

#### 📖 الشرح
`mapped types` تتيح لك **تحويل** نوع كامل بقاعدة واحدة تُطبَّق على كل خاصية، بدل ما تكتب كل خاصية يدوياً. هذا بالضبط الأساس اللي بُنيت عليه كل الـ `utility types` الجاهزة اللي `TypeScript` يوفرها لك — فهي توفر عليك إعادة كتابة نفس الأنماط المتكررة (زي "خلي كل الخصائص اختيارية" أو "خلي كل الخصائص للقراءة فقط") في كل مشروع.

هذي الـ `utility types` تحل مشاكل شائعة جداً: تبسيط الأنماط المتكررة، تجنب التكرار (`duplication`)، وتحسين قابلية الصيانة (`maintainability`) — بدل ما تكتب نوع جديد كامل لكل حالة، تبني على نوع موجود أصلاً.

#### 💡 التشبيه:
> `mapped type` زي ختم (`stamp`) تطبعه على كل ورقة بملف كامل — كل ورقة تاخذ نفس التحويل تلقائياً بدل ما تعدلها وحدة وحدة.
> **وجه الشبه:** الختم على كل ورقة = تطبيق `[K in keyof T]` على كل خاصية.

#### 🎯 الملخص السريع
- `[K in keyof T]` يمشي على كل خاصية من `T`
- أساس بناء كل `utility types` الجاهزة
- يقلل التكرار ويحسّن الصيانة

> 🎯 **جملة الامتحان:** `Mapped Types` تستخدم صيغة `[K in keyof T]` للتكرار على كل خصائص نوع موجود وتحويلها لشكل جديد.

#### 📚 التطبيق
القسم الجاي يشرح أشهر أربع أدوات جاهزة مبنية بهذا المبدأ: `Partial`، `Readonly`، `Pick`، `ReturnType`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Transform existing types... Iterates over properties. Creates new structures... Create new types from existing ones. Built-in helpers... Simplify common patterns. Avoid duplication. Improve maintainability"

</details>

---

### 4.2. أشهر Utility Types: Partial، Readonly، Pick، ReturnType

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.1"} -->

#### 📍 أين نحن الآن؟
نطبّق فكرة `mapped types` على أربع أدوات جاهزة تستخدمها كثير بالمشاريع الحقيقية.

#### ⬅️ الربط مع السابق
هذي أمثلة مباشرة على `mapped types` اللي شرحناها بالقسم اللي قبل — ما تحتاج تبنيها بنفسك، هي جاهزة داخل `TypeScript`.

#### 💡 الفكرة الأساسية
**`Partial<T>` تخلي كل الخصائص اختيارية، `Readonly<T>` تمنع تعديلها، `Pick<T, K>` تختار خصائص معينة بس، و`ReturnType<T>` تستخرج نوع القيمة الراجعة من دالة.**

---

#### 💻 الكود
```typescript
// Partial: makes every property of User optional
type User = { name: string; age: number };
type PartialUser = Partial<User>; // { name?: string; age?: number }

// Readonly: makes every property of Point immutable
type Point = { x: number; y: number };
type ReadonlyPoint = Readonly<Point>; // { readonly x: number; readonly y: number }

// Pick: select only specific fields, e.g. exclude the password
interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
}
type PublicUser = Pick<FullUser, 'id' | 'name' | 'email'>;

// ReturnType: extract the return type of a function
function createUser() {
  return { name: "Alice" };
}
type CreatedUser = ReturnType<typeof createUser>; // { name: string }
```

#### شرح كل سطر:
1. `Partial<User>` → ينتج نوع جديد كل خصائصه من `User` أصبحت اختيارية (`?`)
2. `Readonly<Point>` → ينتج نوع جديد كل خصائصه من `Point` أصبحت `readonly` — أي محاولة تعديل بعد الإنشاء تعطي خطأ
3. `Pick<FullUser, 'id' | 'name' | 'email'>` → ينتج نوع جديد فيه فقط الخصائص الثلاث المحددة، ويستثني `password` تماماً
4. `ReturnType<typeof createUser>` → `typeof createUser` يستخرج نوع الدالة نفسها، و`ReturnType` يستخرج منها نوع القيمة اللي ترجعها فقط

#### 📖 الشرح
هذي الأربع أدوات من أكثر الـ `utility types` استخداماً بالمشاريع الحقيقية. `Partial` مفيدة جداً لما تكتب دالة تحديث (`update`) — المستخدم ما يلزم يرسل كل الحقول، بس اللي يبي يعدله. `Readonly` تحمي بيانات ما يفترض تتغير بعد الإنشاء، زي إعدادات ثابتة.

`Pick` من أكثرها فايدة عملية أمنية — استخدامها الكلاسيكي هو **استثناء حقول حساسة** زي `password` قبل ما ترسل بيانات المستخدم للـ `frontend`. `ReturnType` توفر عليك كتابة نوع القيمة الراجعة يدوياً وتخليه يتبع تلقائياً أي تغيير مستقبلي بالدالة الأصلية.

#### 💡 التشبيه:
> `Partial` زي نموذج تعديل بيانات — كل الحقول اختيارية، تعدل بس اللي تبيه. `Pick` زي بطاقة عمل تعرض بس اسمك وبريدك، مو كل بياناتك الشخصية.
> **وجه الشبه:** نموذج التعديل = `Partial`، بطاقة العمل المُنتقاة = `Pick`.

#### 🎯 الملخص السريع
- `Partial<T>` → كل الخصائص اختيارية
- `Readonly<T>` → كل الخصائص غير قابلة للتعديل
- `Pick<T, K>` → نوع جديد فيه بس الخصائص المحددة
- `ReturnType<T>` → نوع القيمة الراجعة من دالة (مع `typeof` غالباً)

> 🎯 **جملة الامتحان:** `Pick<User, 'id' | 'name'>` تُستخدم غالباً لإنشاء نسخة عامة (`public`) من نوع يحتوي حقولاً حساسة، عن طريق اختيار الحقول الآمنة فقط.

#### 📚 التطبيق
`Pick` تُستخدم كثير عند إرجاع بيانات مستخدم من `API` دون كشف `password`، و`Partial` تُستخدم في دوال تحديث الموارد (`PATCH`/`PUT` endpoints).

#### 🔍 تتبع التنفيذ: بناء PublicUser بـ Pick

**المدخل:** `interface FullUser { id: number; name: string; email: string; password: string; }`

| الخطوة | العملية | القيمة/الحالة |
| --- | --- | --- |
| 1 | `Pick<FullUser, 'id' \| 'name' \| 'email'>` يبدأ بقراءة `FullUser` | كل الخصائص الأربع متاحة |
| 2 | يفلتر فقط `'id' \| 'name' \| 'email'` | `password` تُستبعد تماماً |
| 3 | ينتج نوع جديد | `{ id: number; name: string; email: string }` |

**النتيجة:** `PublicUser` لا يحتوي `password` إطلاقاً، حتى لو حاولت الوصول له يعطي خطأ.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
`Pick<FullUser, 'id' | 'name' | 'email'>` تحذف `password` من `FullUser` الأصلي.

#### الفهم الصحيح ✅:
`Pick` **لا تعدّل** `FullUser` الأصلي إطلاقاً — هي تنشئ نوعاً **جديداً منفصلاً**. `FullUser` يبقى كما هو بكل حقوله الأربعة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Constructs a type with all properties of 'User' to optional... Constructs a type with all properties of 'Point' set to readonly... Pick only public fields, exclude password one... Get function return types"

</details>

---

### 5. أدوات استخراج النوع: keyof و typeof

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4.2"} -->

#### 📍 أين نحن الآن؟
نرجع نفصّل `keyof` اللي استخدمناها بالـ `mapped type` قبل شوي.

#### ⬅️ الربط مع السابق
استخدمنا `keyof T` مباشرة داخل `[K in keyof T]` بقسم `Mapped Types` — الآن نشرحها لحالها.

#### 💡 الفكرة الأساسية
**`keyof` يطلع `union` من أسماء خصائص نوع معيّن، بينما `typeof` (كما شفنا قبل) يستخرج النوع من قيمة موجودة.**

---

#### 💻 الكود
```typescript
interface User {
  name: string;
  id: number;
}
type Keys = keyof User; // "name" | "id"
```

#### شرح كل سطر:
1. `type Keys = keyof User` → ينتج `union` نصي فيه أسماء كل خصائص `User`: `"name" | "id"`

#### 📖 الشرح
`keyof` مفيدة جداً لما تبي تكتب دالة تعمل مع أي خاصية من نوع معيّن — بدل ما تكتب `union` يدوياً لأسماء الخصائص، تخلي `TypeScript` يستخرجها تلقائياً من النوع نفسه، وتبقى متزامنة لو أضفت أو حذفت خاصية لاحقاً.

#### 💡 التشبيه:
> `keyof` زي فهرس (`index`) كتاب — يطلع لك أسماء كل الفصول بدون ما تقرأ الكتاب كامل.
> **وجه الشبه:** الفهرس = `keyof`، الكتاب = النوع الأصلي.

#### 🎯 الملخص السريع
- `keyof T` → `union` من أسماء خصائص `T`
- `typeof value` → نوع من قيمة موجودة (تكرار مرجعي من قسم 3.1)
- الاثنين يُستخدمان بكثرة داخل `mapped types`

> 🎯 **جملة الامتحان:** `keyof T` ينتج نوعاً من نوع `union` يحتوي جميع أسماء خصائص `T` كنصوص.

#### 📚 التطبيق
`keyof` هي الأداة الأساسية وراء بناء `mapped types` و`utility types` مثل اللي شفناها بالقسم السابق.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "type User = { name: string; id: number }; type Keys = keyof User; Produces union of keys"

</details>

---

### 6. مقدمة عن Classes في TypeScript

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن الآن؟
ننتقل من نظام الأنواع البحت لتطبيقه على الـ `classes`.

#### ⬅️ الربط مع السابق
كل ما تعلمناه من أنواع (`interface`، `union`، الخ) الآن رح نستخدمه لكتابة `classes` أكثر أماناً.

#### 💡 الفكرة الأساسية
**`TypeScript` يبني فوق `classes` الـ `JavaScript` العادية بإضافة فحص أنواع وقت الكتابة، مع الحفاظ على نفس سلوك التشغيل.**

---

#### 💻 الكود
```typescript
class User {
  name: string;
  id: number;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

#### شرح كل سطر:
1. `class User { ... }` → تعريف `class` بنفس صياغة `JavaScript` العادية
2. `name: string; id: number;` → تعريف نوع كل خاصية صراحة قبل استخدامها
3. `constructor(id: number, name: string)` → الـ `constructor` يفرض إن أي `instance` جديد يمرر `id` رقمي و`name` نصي بالضبط
4. `this.id = id; this.name = name;` → تعيين القيم الممرَّرة للخصائص — نفس سلوك `JavaScript` تماماً

#### 📖 الشرح
الفكرة الجوهرية هنا: `TypeScript` **ما يخترع** آلية جديدة للـ `classes` — هو يضيف فحص أنواع (`type safety`) فوق الآلية الموجودة أصلاً بـ `JavaScript`، ويتأكد وقت الكتابة إن كل خاصية مُعرَّفة بنوع واضح وإن الـ `constructor` يستقبل القيم الصحيحة. وقت التشغيل، الكود يتصرف بالضبط زي أي `class` عادية بـ `JavaScript`.

#### 💡 التشبيه:
> زي نموذج طباعة (`template`) لبطاقة هوية — يحدد أي حقل لازم يكون فيه، وبأي نوع بيانات، قبل ما تطبع أي بطاقة فعلية.
> **وجه الشبه:** نموذج البطاقة = تعريف الـ `class`، طباعة بطاقة فعلية = إنشاء `instance`.

#### 🎯 الملخص السريع
- `TypeScript classes` = نفس `JavaScript classes` + فحص أنواع
- الـ `constructor` يفرض أنواع الـ `parameters`
- السلوك وقت التشغيل يبقى كما هو

> 🎯 **جملة الامتحان:** `TypeScript` يضيف فحص أنواع وقت الكتابة (`compile-time`) فوق `classes` الـ `JavaScript`، لكنه لا يغيّر سلوكها وقت التشغيل (`runtime`).

#### 📚 التطبيق
هذا الأساس اللي تُبنى عليه كل ميزات الـ `classes` المتقدمة الجاية (`access modifiers`، `inheritance`، الخ).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "TypeScript builds on JavaScript classes with additional type features. Adds type safety to class members. Includes compile-time checks. Keeps JavaScript runtime behavior"

</details>

---

### 6.1. إنشاء Instances و Access Modifiers

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6"} -->

#### 📍 أين نحن الآن؟
نتعلم كيف ننشئ `object` فعلي من الـ `class`، وكيف نتحكم بمن يقدر يوصل للخصائص.

#### ⬅️ الربط مع السابق
بعد ما عرّفنا `class User`، الآن ننشئ `instance` فعلي منها، ونتعلم حماية بعض خصائصها.

#### 💡 الفكرة الأساسية
**`new` تنشئ `instance` فعلي؛ `public`/`private`/`protected` تتحكم بمن يقدر يوصل للخاصية — لكن هذا الفحص وقت الكتابة فقط.**

---

#### 💻 الكود
```typescript
// Creating an instance
const user = new User(1, "Alice");

// Access modifiers example
class Account {
  private balance: number;
  constructor(balance: number) {
    this.balance = balance;
  }
}
```

#### شرح كل سطر:
1. `new User(1, "Alice")` → يستدعي الـ `constructor` وينشئ `object` جديد فعلي من نوع `User`
2. `private balance: number` → الخاصية `balance` توصل بس من داخل `class Account` نفسها، ما توصل من الخارج

#### 📖 الشرح
`new` تستدعي الـ `constructor` وترجع `instance` جديد — نفس مبدأ `JavaScript` تماماً. أما `access modifiers` فهي ثلاث: `public` (الافتراضي، أي حد يوصله من أي مكان)، `private` (بس من داخل نفس الـ `class`)، و`protected` (من داخل الـ `class` وأي `class` وريثة منها). النقطة الحرجة اللي لازم تنتبه لها: `private` هي فحص وقت الكتابة (`compile-time`) بس — بعد ما يتحول الكود لـ `JavaScript` عادي، ما فيه أي حماية فعلية وقت التشغيل، فالخاصية تصير قابلة للوصول تقنياً.

#### 💡 التشبيه:
> `private` زي لافتة "ممنوع الدخول" على باب مكتب — تمنع الداخل الملتزم بالقواعد، بس ما تمنع فعلياً حد يفتح الباب بالقوة.
> **وجه الشبه:** اللافتة = فحص `private` وقت الكتابة، فتح الباب بالقوة = الوصول الفعلي وقت التشغيل بعد الترجمة.

#### 🎯 الملخص السريع
- `new ClassName(...)` → ينشئ `instance` فعلي
- `public` (افتراضي) / `private` / `protected` → مستويات وصول مختلفة
- `private` فحص وقت الكتابة فقط، ليست حماية فعلية وقت التشغيل

> 🎯 **جملة الامتحان:** `private` في `TypeScript` هي فحص وقت الكتابة (`compile-time`) فقط، وتُزال هذه الحماية بعد التحويل إلى `JavaScript` العادي.

#### 📚 التطبيق
هذا يقودنا مباشرة للقسم الجاي: `#private` كبديل يوفر حماية حقيقية وقت التشغيل.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
`private balance` تمنع أي كود خارجي من قراءة أو تعديل `balance` حتى بعد تحويل الكود لـ `JavaScript`.

#### الفهم الصحيح ✅:
بعد الترجمة لـ `JavaScript` عادي، `private` تختفي تماماً والخاصية تصير عادية قابلة للوصول. الحماية الحقيقية وقت التشغيل تحتاج `#balance` (`#private` من `JavaScript` نفسها).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "new calls the constructor. Returns an instance of the class... Control visibility of properties: public (default), private, protected... private is only checked at compile time"

</details>

---

### 6.2. private مقابل #private

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.1"} -->

#### 📍 أين نحن الآن؟
نفصّل الفرق الحرج بين الحماية الوهمية (`private`) والحماية الحقيقية (`#private`).

#### ⬅️ الربط مع السابق
هذا استكمال مباشر للنقطة اللي أنهينا فيها القسم السابق.

#### 💡 الفكرة الأساسية
**`private` حماية على مستوى `TypeScript` فقط (تختفي وقت التشغيل)، بينما `#private` حماية حقيقية مفروضة من `JavaScript` نفسها وقت التشغيل.**

---

#### 💻 الكود
```typescript
class Example {
  private x = 1; // TypeScript-only protection
  #y = 2;        // Enforced at JavaScript runtime
}
```

#### شرح كل سطر:
1. `private x = 1` → محمية فقط أثناء الكتابة بـ `TypeScript`؛ بعد التحويل تصير `x` عادية
2. `#y = 2` → محمية فعلياً وقت التشغيل، حتى بعد التحويل لـ `JavaScript` — ما فيه أي طريقة للوصول لها من خارج الـ `class`

#### 📖 الشرح
`#private` هي ميزة أصيلة من `JavaScript` نفسها (مو من `TypeScript`)، وبالتالي تبقى فعّالة حتى بعد ما يتحول الكود. هذا الفرق مهم جداً لو كنت تكتب مكتبة (`library`) هيستخدمها أشخاص آخرين — لو اعتمدت على `private` بس، أي حد يقدر يتحايل عليها بعد التحويل لـ `JavaScript`، لكن `#private` تبقى محمية فعلياً بكل الحالات.

#### 💡 التشبيه:
> `private` زي قاعدة أدب اجتماعي (تحترمها لأنك ملتزم)، و`#private` زي قفل فعلي على الباب (ما تقدر تفتحه حتى لو حاولت).
> **وجه الشبه:** القاعدة الاجتماعية = `private`، القفل الفعلي = `#private`.

#### 🎯 الملخص السريع
- `private` = حماية `TypeScript` فقط، تختفي بعد الترجمة
- `#private` = حماية `JavaScript` حقيقية، تبقى وقت التشغيل
- استخدم `#private` لما تحتاج حماية فعلية مضمونة

> 🎯 **جملة الامتحان:** الفرق بين `private` و`#private` هو أن `private` تُفرض فقط وقت الكتابة بـ `TypeScript`، بينما `#private` تُفرض فعلياً وقت التشغيل لأنها ميزة أصيلة من `JavaScript`.

#### 📚 التطبيق
اختيار `#private` مهم جداً عند بناء مكتبات (`libraries`) قد يستخدمها كود `JavaScript` عادي بدون `TypeScript`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Two types of privacy: private → TypeScript only. #private → Enforced in JavaScript runtime"

</details>

---

### 6.3. Methods و this، Getters/Setters، Static Members

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.2"} -->

#### 📍 أين نحن الآن؟
نتعلم ثلاث ميزات مهمة داخل الـ `classes`: التعامل مع `this`، التحكم بالوصول عبر `getters/setters`، والأعضاء المشتركة عبر `static`.

#### ⬅️ الربط مع السابق
هذي كلها إضافات على تعريف `class` الأساسي اللي شرحناه بالقسمين السابقين.

#### 💡 الفكرة الأساسية
**قيمة `this` تعتمد على كيف استدعيت الدالة لا وين كُتبت؛ `getters/setters` تتحكم بالوصول للخصائص؛ و`static` تنتمي للـ `class` نفسها مو للـ `instance`.**

---

#### 💻 الكود
```typescript
// 'this' binding issue — fixed with an arrow function property
class Counter {
  count = 0;
  increment = () => this.count++;
}

// Getters and setters
class User {
  private _name: string = "";
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
}

// Static members
class Config {
  static version = "1.0";
  static getVersion() {
    return Config.version;
  }
}
```

#### شرح كل سطر:
1. `increment = () => this.count++` → استخدام `arrow function` كخاصية بدل `method` عادية، عشان `this` تبقى مربوطة بالـ `instance` حتى لو الدالة استُدعيت كـ `callback`
2. `get name() { return this._name; }` → دالة تُستدعى تلقائياً عند **قراءة** `user.name` بدون أقواس
3. `set name(value: string) { this._name = value; }` → دالة تُستدعى تلقائياً عند **تعيين** `user.name = "..."`
4. `static version = "1.0"` → خاصية تنتمي للـ `class Config` نفسها، مو لكل `instance` على حدة
5. `Config.getVersion()` → تُستدعى مباشرة على اسم الـ `class`، بدون `new`

#### 📖 الشرح
مشكلة `this` من أشهر المشاكل اللي تواجه المبرمج الجديد: قيمة `this` داخل `method` عادية تتحدد حسب **كيف استدعيت الدالة**، مو وين كتبتها. فلو مررت `counter.increment` كـ `callback` لدالة ثانية (زي `setTimeout` أو `onClick`)، ممكن `this` يضيع سياقه ويصير `undefined`. الحل الشائع هو تحويل الـ `method` لخاصية من نوع `arrow function`، لأن الـ `arrow functions` **ما تربط `this` الخاص فيها** — تاخذه من السياق المحيط وقت الكتابة، مو وقت الاستدعاء.

`getters` و`setters` يخليونك تتحكم بمنطق القراءة/الكتابة بدون ما تغيّر طريقة استخدام الخاصية من الخارج — المستخدم يكتب `user.name = "Alice"` وكأنها خاصية عادية، لكن خلف الكواليس فيه منطق يشتغل (تحقق، تنسيق، الخ).

`static members` تنتمي للـ `class` ككل مو لأي `instance` معين — مفيدة للبيانات أو الدوال المشتركة بين كل الاستخدامات، زي رقم إصدار أو دالة مساعدة عامة.

#### 💡 التشبيه:
> `this` زي ضمير "أنا" — معناه يتغير حسب مين يتكلم فعلياً وقتها، مو حسب مكان كتابة الجملة. `getter`/`setter` زي بواب يراقب كل من يدخل أو يخرج من غرفة، بس بدون ما تحس إنك تمر ببواب. `static` زي لوحة إعلانات بالمبنى — مشتركة لكل السكان، مو لكل شقة نسختها الخاصة.
> **وجه الشبه:** ضمير "أنا" = `this`، البواب = `getter`/`setter`، لوحة الإعلانات المشتركة = `static`.

#### 🎯 الملخص السريع
- استخدم `arrow function` كخاصية عشان تحل مشكلة ضياع `this`
- `get`/`set` يتحكمون بمنطق القراءة والكتابة بدون تغيير طريقة الاستخدام
- `static` تنتمي للـ `class` نفسها، توصلها بدون `new`

> 🎯 **جملة الامتحان:** استخدام `arrow function` كخاصية `class` يحل مشكلة ضياع `this` لأن الـ `arrow function` لا تربط `this` الخاصة فيها، بل تأخذها من السياق المحيط.

#### 📚 التطبيق
تحويل الـ `methods` لـ `arrow functions` أساسي جداً عند تمريرها كـ `event handlers` بـ `React` أو أي `callback` مشابه.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو `increment` كانت `method` عادية (مو `arrow function`) ومررناها كـ `onClick={counter.increment}`، وش بيصير لقيمة `this` جوّها؟
> **لماذا هذا مهم؟** يختبر فهمك العميق لمشكلة ربط `this` — الإجابة: `this` بتصير `undefined` أو تشاور لسياق مختلف، لأن الاستدعاء صار بدون `counter.` قبلها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "The value of this depends on how a function is called... Use arrow functions or bind to fix this... Control access to properties... Encapsulates logic. Provides controlled access... Belong to the class, not instances... Access using class name. Shared across all instances"

</details>

---

### 7. Parameter Properties و Inheritance

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6.3"} -->

#### 📍 أين نحن الآن؟
نتعلم اختصار مفيد لتقليل الحشو، وأول آلية لإعادة استخدام الكود بين الـ `classes`.

#### ⬅️ الربط مع السابق
`parameter properties` تختصر نفس نمط الـ `constructor` اللي كتبناه بالقسم 6 يدوياً.

#### 💡 الفكرة الأساسية
**`parameter properties` تدمج تعريف الخاصية وتعيينها بخطوة وحدة داخل الـ `constructor`؛ `extends` تسمح لـ `class` بوراثة خصائص ودوال من `class` ثانية مع إمكانية التعديل (`override`).**

---

#### 💻 الكود
```typescript
// Parameter properties: shortcut for defining + assigning fields
class Point {
  constructor(public x: number, public y: number) {}
}

// Inheritance with method overriding
class Animal {
  speak() {
    console.log("Some sound");
  }
}
class Dog extends Animal {
  speak() {
    console.log("Bark");
  }
}
```

#### شرح كل سطر:
1. `constructor(public x: number, public y: number) {}` → إضافة `public` قبل الـ `parameter` مباشرة تخلي `TypeScript` ينشئ الخاصية ويعيّنها تلقائياً — مافيه حاجة لكتابة `this.x = x` يدوياً
2. `class Dog extends Animal` → `Dog` يرث كل خصائص ودوال `Animal`
3. `speak() { console.log("Bark"); }` داخل `Dog` → يعيد تعريف (`override`) نفس الدالة الموجودة بـ `Animal` بسلوك مختلف

#### 📖 الشرح
`parameter properties` اختصار عملي بحت — يقلل التكرار اللي شفناه بمثال `class User` بالقسم 6 (حيث كتبنا الخاصية مرتين: تعريفها ثم تعيينها بالـ `constructor`). فايدتها الوحيدة هي تقليل الأسطر، بدون أي فرق بالسلوك.

`inheritance` بالمقابل آلية أعمق: تسمح لـ `class` ثانية (`Dog`) تاخذ كل سلوك `class` أساسية (`Animal`) وتبني فوقه، مع خيار تعديل أي `method` تبيها تتصرف بشكل مختلف (`method overriding`) — زي `Dog` اللي غيّر `speak()` من صوت عام لنباح تحديداً.

#### 💡 التشبيه:
> `parameter properties` زي ملء استمارة بخانة وحدة بدل خانتين منفصلتين لنفس المعلومة. `inheritance` زي طفل يرث صفات عامة من عائلته (زي الكلام) لكن يقدر يطوّر أسلوبه الخاص فوقها.
> **وجه الشبه:** الاستمارة المدمجة = `parameter properties`، وراثة الصفات مع التطوير الشخصي = `inheritance` + `override`.

#### 🎯 الملخص السريع
- `constructor(public x: number)` = اختصار لتعريف + تعيين الخاصية بخطوة وحدة
- `extends` = وراثة كل خصائص ودوال الـ `class` الأساسية
- إعادة تعريف نفس اسم الدالة بالـ `class` الوريثة = `method overriding`

> 🎯 **جملة الامتحان:** `Parameter Properties` تسمح بتعريف وتعيين خاصية بخطوة واحدة داخل الـ `constructor` بإضافة `public`/`private`/`protected` قبل الـ `parameter` مباشرة.

#### 📚 التطبيق
`inheritance` أساس بناء تسلسلات هرمية من الـ `classes` (زي `Animal` → `Dog`/`Cat`)، وتُستخدم كثير بأنظمة الألعاب أو نمذجة الكائنات الحقيقية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Shortcut for defining and initializing fields... Automatically creates and assigns properties... Extend classes using extends... Enables code reuse. Supports method overriding"

</details>

---

### 7.1. Implements، Abstract Classes، Generics في الـ Classes

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 📍 أين نحن الآن؟
نتعلم ثلاث طرق إضافية لفرض بنية أو مرونة على الـ `classes`.

#### ⬅️ الربط مع السابق
هذي امتداد لفكرة `inheritance` — بدل الوراثة الكاملة، عندنا هنا فرض عقد (`implements`)، أو منع الإنشاء المباشر (`abstract`)، أو مرونة النوع (`generics`).

#### 💡 الفكرة الأساسية
**`implements` يفرض على `class` تلتزم بشكل `interface`؛ `abstract class` قاعدة لا تُنشأ منها `instances` مباشرة؛ و`generics` تخلي الـ `class` تشتغل مع أي نوع بأمان.**

---

#### 💻 الكود
```typescript
// Implements: enforces a contract from an interface
interface Serializable {
  serialize(): string;
}
class User implements Serializable {
  serialize() {
    return "user";
  }
}

// Abstract class: cannot be instantiated directly
abstract class Animal {
  abstract getName(): string;
  printName() {
    console.log("Hello " + this.getName());
  }
}

// Generics: reusable, type-safe class for any type
class Box<T> {
  contents: T;
  constructor(value: T) {
    this.contents = value;
  }
}
```

#### شرح كل سطر:
1. `class User implements Serializable` → `User` **ملزَمة** تعرّف دالة `serialize()` بنفس التوقيع الموجود بـ `Serializable`، وإلا `TypeScript` يعطي خطأ
2. `abstract class Animal` → ما تقدر تسوي `new Animal()` مباشرة — لازم تُستخدم كـ `base class` لـ `class` ثانية ترث منها
3. `abstract getName(): string` → دالة مجردة، بدون جسم — أي `class` ترث من `Animal` **ملزَمة** تعرّفها
4. `class Box<T>` → `T` نوع عام (`generic`) يتحدد وقت إنشاء الـ `instance`، فتقدر تسوي `Box<string>` أو `Box<number>` بنفس الـ `class`

#### 📖 الشرح
`implements` تشبه `inheritance` لكنها مختلفة جوهرياً: `interface` ما فيها أي تنفيذ (`implementation`) جاهز، هي بس **عقد** (`contract`) يحدد الشكل المطلوب، وعلى الـ `class` تكتب التنفيذ بنفسها بالكامل.

`abstract classes` مفيدة لما تبي تفرض بنية مشتركة بين مجموعة `classes` بدون ما تسمح بإنشاء `instance` من الـ `class` الأساسية نفسها مباشرة — لأنها غير مكتملة عمداً (فيها `methods` مجردة بلا تنفيذ).

`generics` تحل مشكلة شائعة: لو كتبت `class Box` بدون `generic` وحددت نوع `contents` بـ `string` مثلاً، ما تقدر تستخدمها إلا للنصوص. بـ `<T>`، نفس الـ `class` تشتغل بأمان كامل مع أي نوع تحدده وقت الاستخدام.

#### 💡 التشبيه:
> `implements` زي عقد توظيف يحدد المهارات المطلوبة بدون ما يعلّمك إياها — أنت المسؤول تثبت إنك تقدر تسويها. `abstract class` زي مخطط بناء (`blueprint`) — ما تقدر تسكن فيه مباشرة، لازم يُبنى منه بيت فعلي أول. `generics` زي صندوق قابل للتحجيم يناسب أي محتوى تحطه فيه.
> **وجه الشبه:** عقد التوظيف = `implements`، المخطط الهندسي = `abstract class`، الصندوق القابل للتحجيم = `Box<T>`.

#### 🎯 الملخص السريع
- `implements` = فرض عقد `interface` على الـ `class` بدون توريث تنفيذ جاهز
- `abstract class` = قاعدة لا تُنشأ منها `instances` مباشرة، تحتوي `methods` مجردة إلزامية
- `Box<T>` = `class` تعمل بأمان مع أي نوع يُحدَّد وقت الاستخدام

> 🎯 **جملة الامتحان:** `abstract class` لا يمكن إنشاء `instance` منها مباشرة بواسطة `new`، ويجب أن ترث منها `class` أخرى تُعرِّف كل الـ `methods` المجردة (`abstract`) بداخلها.

#### 📚 التطبيق
`generics` تُستخدم كثير بمكتبات إدارة البيانات (زي `Array<T>` نفسها)، و`abstract classes` شائعة بأنظمة تصميم كبيرة تفرض بنية موحدة على مكونات متعددة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
`abstract class Animal` تقدر تسوي منها `new Animal()` طالما ما فيها أخطاء بالكود.

#### الفهم الصحيح ✅:
`abstract class` ممنوعة الإنشاء المباشر **بالتصميم**، بغض النظر عن وجود أخطاء أو لا — `TypeScript` يرفض `new Animal()` مباشرة دايماً، ولازم تنشئ `class` وريثة تكمّل التنفيذ الناقص أولاً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Ensure a class follows a structure... Enforces contracts... Cannot be instantiated directly... Used as base classes. Can include abstract methods... Reusable type-safe classes... Works with different types. Improves flexibility"

</details>

---

### 8. النظام البنيوي للأنواع (Structural Typing) و Decorators

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7.1"} -->

#### 📍 أين نحن الآن؟
آخر قسم — نفهم كيف `TypeScript` **فعلياً** يقارن الأنواع ببعض، ونتعرف سريعاً على `decorators`.

#### ⬅️ الربط مع السابق
كل الـ `interfaces` و`classes` اللي شفناها بالمحاضرة تُفحص خلف الكواليس بهذا المبدأ بالضبط.

#### 💡 الفكرة الأساسية
**`TypeScript` يفحص الأنواع حسب **الشكل** (`structure`) مو الاسم — أي `object` يطابق الشكل المطلوب يُقبل، حتى لو ما كان معرّفاً أصلاً بذاك النوع.**

---

#### 💻 الكود
```typescript
interface Point {
  x: number;
  y: number;
}
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// Matches structurally even though it wasn't declared as Point
const point = { x: 12, y: 26 };
logPoint(point); // OK

// A class instance also matches by structure, not by declared type
class VirtualPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // OK — matches structurally
```

#### شرح كل سطر:
1. `const point = { x: 12, y: 26 }` → متغير عادي، ما كُتب صراحة كـ `Point`
2. `logPoint(point)` → يمر بنجاح لأن `point` يحتوي `x` و`y` رقميين — نفس شكل `Point` بالضبط، رغم إنه ما أُعلن كذلك
3. `class VirtualPoint { x: number; y: number; ... }` → `class` مستقلة كلياً، ما لها أي علاقة بـ `interface Point`
4. `logPoint(newVPoint)` → يمر بنجاح أيضاً لأن `instance` الناتج يطابق شكل `Point` بالضبط — الاسم `VirtualPoint` غير مهم إطلاقاً

#### 📖 الشرح
هذا مبدأ جوهري يميّز `TypeScript` عن أنظمة أنواع أخرى تعتمد على **الاسم** (`nominal typing`). في `TypeScript`، الفحص **بنيوي** (`structural`) — يعني `TypeScript` ما يهمه إسم النوع الأصلي، يهمه بس هل الشكل مطابق أو لا. هذا يفسر ليش `instance` من `class` مختلفة كلياً (`VirtualPoint`) يقدر يمر لدالة تتوقع `Point` — لأن الشكل النهائي (خصائص `x` و`y` رقمية) متطابق.

فيه استثناء مهم اسمه **excess property check**: لو مررت `object literal` (مكتوب مباشرة بالمكان) فيه خصائص زيادة عن المطلوب (زي `{ x: 12, y: 26, z: 89 }`)، `TypeScript` يرفضه **فوراً** — حتى لو نفس الشكل بالأساس صحيح. لكن لو نفس القيمة كانت بمتغير منفصل قبل التمرير، `TypeScript` غالباً يمررها بدون اعتراض، لأنه ما يقدر يعرف بشكل مؤكد إن الخصائص الزيادة كانت مقصودة أو غلطة.

#### 💡 التشبيه:
> فكّر بمصعد يقبل أي شخص وزنه أقل من حد معين — ما يهمه اسمك أو من وين جيت، يهمه بس هل تطابق الشرط (الوزن). حتى لو لبست يونيفورم شركة مختلفة (`class` مختلفة)، تدخل المصعد طالما تحقق الشرط.
> **وجه الشبه:** شرط الوزن = مطابقة الشكل (`x`, `y` رقميين)، اليونيفورم المختلف = اسم النوع الأصلي (`VirtualPoint` مقابل `Point`) — غير مهم.

#### 🎯 الملخص السريع
- `TypeScript` يفحص حسب **الشكل** لا الاسم (`structural typing`)
- أي `object` أو `instance` يطابق الشكل المطلوب يُقبل، بغض النظر عن نوعه الأصلي
- **استثناء:** `object literals` بخصائص زيادة تُرفض فوراً (`excess property check`)

> 🎯 **جملة الامتحان:** `TypeScript` يستخدم `structural typing`، أي أنه يفحص تطابق **شكل** الكائن (خصائصه وأنواعها) وليس اسم النوع المُعلن به.

#### 📚 التطبيق
هذا المبدأ يفسر ليش تقدر تمرر أي `object` أو `class instance` لدالة تتوقع `interface` معين، طالما الشكل مطابق — أساس مرونة `TypeScript` بكامله.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
`logPoint({ x: 12, y: 26, z: 89 })` (كـ `object literal` مباشر بالتمرير) لازم يمر بنجاح لأنه يحتوي `x` و`y` المطلوبين، تماماً زي `point3` الممرَّر من متغير.

#### الفهم الصحيح ✅:
`TypeScript` يفرّق: لو الـ `object` جاء من متغير منفصل (`const point3 = {...}; logPoint(point3)`) — يمر، لأن الفحص البنيوي يتحقق فقط من وجود الخصائص المطلوبة. لكن لو مررته **مباشرة** كـ `object literal` بنفس استدعاء الدالة وفيه خصائص زيادة، `TypeScript` يفعّل `excess property check` ويرفضه فوراً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "TypeScript checks structure, not name... const point3 = { x: 12, y: 26, z: 89 }; logPoint(point3); const color = { hex: '#187ABF' }; logPoint(color); // Error"

</details>

---

### 8.1. Decorators

<!-- @render: {type: "code-first", visualization: "none", coverage: "90%"} -->
<!-- @connectivity: {prerequisite: "section_8"} -->

#### 📍 أين نحن الآن؟
آخر موضوع بالمحاضرة — تعريف سريع بـ `decorators` كإضافة متقدمة للـ `classes`.

#### ⬅️ الربط مع السابق
هذا موضوع مستقل نوعاً ما، يُبنى فوق فهمك العام للـ `classes` من كل الأقسام السابقة.

#### 💡 الفكرة الأساسية
**`decorators` تضيف بيانات وصفية (`metadata`) أو سلوكاً إضافياً على `classes` وأعضائها، وتحتاج تفعيل خاص بإعدادات المشروع.**

---

#### 💻 الكود
```typescript
@sealed
class User {
  name: string;
}
```

#### شرح كل سطر:
1. `@sealed` → `decorator` يُضاف فوق تعريف الـ `class` مباشرة، وينفّذ منطقاً إضافياً عليها (زي "منع إضافة خصائص جديدة" في حالة `sealed` كمثال شائع)

#### 📖 الشرح
`decorators` تُستخدم غالباً في أطر عمل (`frameworks`) متقدمة لأغراض زي `logging`، `validation`، `caching`، و`serialization` — يعني تضيف سلوكاً جاهزاً بدون ما تكرر نفس الكود يدوياً بكل `class`. النقطة المهمة تقنياً: لازم تفعّل `"experimentalDecorators": true` بملف إعدادات المشروع (`tsconfig.json`) قبل ما تقدر تستخدمها، لأنها ميزة لسا تُعتبر تجريبية.

#### 💡 التشبيه:
> `decorator` زي ملصق (`sticker`) تحطه على صندوق يضيف تعليمات خاصة للتعامل معه ("قابل للكسر"، "هذا الجانب لأعلى") بدون ما تغيّر محتوى الصندوق نفسه.
> **وجه الشبه:** الصندوق = الـ `class`، الملصق = الـ `decorator` والسلوك الإضافي اللي يضيفه.

#### 🎯 الملخص السريع
- `@decoratorName` يُكتب فوق `class` أو عضو مباشرة
- استخدامات شائعة: `logging`، `validation`، `caching`، `serialization`
- يتطلب `"experimentalDecorators": true` بـ `tsconfig.json`

> 🎯 **جملة الامتحان:** استخدام `decorators` في `TypeScript` يتطلب تفعيل الخيار `"experimentalDecorators": true` في ملف `tsconfig.json`.

#### 📚 التطبيق
`decorators` منتشرة جداً بأطر عمل مثل الأنظمة المبنية على `classes` بكثرة، خصوصاً بجانب الـ `backend`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 90% — لم يُشرح آلية عمل @sealed تحديداً)</summary>

**النص الأصلي يقول:**
> "Add metadata to classes and members... Used for frameworks and advanced patterns. Common Use Cases: Logging, Validation, Caching, Serialization, etc. Require 'experimentalDecorators': true in tsconfig.json"

**ملاحظة على التغطية:**
- ✓ تم شرح: الغرض العام، حالات الاستخدام، شرط التفعيل
- ⚠️ غير مشروح بالكامل: التفاصيل الداخلية لكيفية عمل `@sealed` تحديداً — المحاضرة الأصلية ذكرته كمثال فقط بدون شرح آليته
- ℹ️ إضافة من الدليل: تشبيه الملصق (ليس بالمحاضرة الأصلية)

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium / hard

### السؤال 1 (medium)

ما الفرق الأساسي بين `type` و`interface` في `TypeScript`؟

أ) لا يوجد فرق حقيقي، الاثنين متطابقان تماماً
ب) `interface` تدعم `union types`، بينما `type` لا تدعمها
ج) `type` أكثر مرونة (تدعم `union`/`intersection`)، بينما `interface` تدعم `declaration merging`
د) `type` تُستخدم فقط مع `classes`، و`interface` تُستخدم فقط مع الدوال

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** صحيح — `type` أوسع وتدعم `union`/`intersection`/أنواع غير `object`، بينما `interface` مخصصة لأشكال `object` وتدعم ميزة `declaration merging` (دمج تعريفات متعددة بنفس الاسم).
- ❌ **الخيار أ:** خاطئ — فيه فروقات جوهرية وظيفية بينهما، مو مجرد اختلاف بالاسم.
- ❌ **الخيار ب:** خاطئ — معكوس تماماً؛ `type` هي اللي تدعم `union types`، مو `interface`.
- ❌ **الخيار د:** خاطئ — الخلط هنا هو افتراض إن كل أداة مقيدة باستخدام واحد محدد، بينما الاثنين يوصفان أشكال `objects` بشكل عام.

---

### السؤال 2 (medium)

أي من التالي **ليس** من الأنواع الأساسية (`Everyday Types`) المذكورة بالمحاضرة؟

أ) `string`
ب) `number`
ج) `Promise`
د) `boolean`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** صحيح — `Promise` لم يُذكر إطلاقاً بالمحاضرة كنوع أساسي؛ الأنواع المذكورة هي `string`، `number`، `boolean`، والمصفوفات والكائنات المبنية عليها.
- ❌ **الخيار أ:** خاطئ — `string` مذكور صراحة كنوع أساسي.
- ❌ **الخيار ب:** خاطئ — `number` مذكور صراحة كنوع أساسي.
- ❌ **الخيار د:** خاطئ — `boolean` مذكور صراحة كنوع أساسي.

---

### السؤال 3 (hard)

```typescript
function logPoint(p: { x: number; y: number }) {
  console.log(p.x, p.y);
}
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3);
```

ما ناتج تنفيذ هذا الكود؟

أ) خطأ فوري (`compile error`) لأن `point3` فيه خاصية زيادة `z`
ب) يعمل بنجاح ويطبع `12 26` — لأن `point3` مررناه من متغير منفصل، لا كـ `object literal` مباشر
ج) يعمل بنجاح لكن يطبع `12 26 89`
د) خطأ فقط وقت التشغيل (`runtime error`) وليس وقت الكتابة

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — بما إن `point3` أُنشئ كمتغير منفصل ثم مُرِّر، `excess property check` لا يُفعَّل، والفحص البنيوي يتحقق فقط من وجود `x` و`y` رقميين، فهما موجودان فيمر بنجاح.
- ❌ **الخيار أ:** خاطئ — الخطأ يحدث فقط لو مررت `object literal` **مباشرة** داخل الاستدعاء (`logPoint({x:12,y:26,z:89})`)، مو من متغير منفصل.
- ❌ **الخيار ج:** خاطئ — الخلط هنا هو افتراض إن الدالة تطبع كل الخصائص الموجودة بالكائن، بينما هي تطبع فقط `p.x` و`p.y` المحددين بجسم الدالة.
- ❌ **الخيار د:** خاطئ — لا يوجد خطأ إطلاقاً بهذي الحالة (لا وقت الكتابة ولا وقت التشغيل).

---

### السؤال 4 (medium)

ما الفرق بين `private` و`#private` في `TypeScript`؟

أ) لا فرق، كلاهما نفس الآلية بأسماء مختلفة
ب) `private` حماية `TypeScript` فقط تختفي بعد الترجمة، و`#private` حماية `JavaScript` حقيقية تبقى وقت التشغيل
ج) `#private` أقدم من `private` وتم استبدالها
د) `private` تُستخدم فقط مع `static members`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح تماماً — هذا هو الفرق الجوهري المشروح بالمحاضرة.
- ❌ **الخيار أ:** خاطئ — فيه فرق حقيقي بمستوى الحماية الفعلية وقت التشغيل.
- ❌ **الخيار ج:** خاطئ — لا علاقة بالقِدم، هما آليتان مختلفتان تعملان بمستويين مختلفين (`TypeScript` مقابل `JavaScript` runtime).
- ❌ **الخيار د:** خاطئ — الخلط هنا بين `access modifiers` و`static members`، وهما مفهومان منفصلان تماماً.

---

### السؤال 5 (hard)

```typescript
type PublicUser = Pick<
  { id: number; name: string; email: string; password: string },
  'id' | 'name'
>;
```

ما هو شكل `PublicUser` الناتج؟

أ) `{ id: number; name: string; email: string; password: string }`
ب) `{ email: string; password: string }`
ج) `{ id: number; name: string }`
د) `{ id?: number; name?: string }`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** صحيح — `Pick<T, K>` تنتج نوعاً جديداً يحتوي فقط الخصائص المحددة (`'id' | 'name'`)، وتستبعد الباقي بالكامل.
- ❌ **الخيار أ:** خاطئ — هذا شكل النوع الأصلي كاملاً، مو الناتج بعد `Pick`.
- ❌ **الخيار ب:** خاطئ — هذا معكوس تماماً؛ هذي الخصائص اللي **لم تُختر**، لا اللي اختيرت.
- ❌ **الخيار د:** خاطئ — الخلط هنا مع `Partial<T>` اللي تخلي الخصائص اختيارية؛ `Pick` لا تغيّر الخصائص لاختيارية، فقط تختارها كما هي.

---

### السؤال 6 (medium)

في المخطط التالي، أي `HTTP method` مناسب لتحديث مورد موجود بالكامل، بحسب جدول `Common HTTP Methods`؟

أ) `GET`
ب) `POST`
ج) `PUT`
د) `HEAD`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** صحيح — `PUT` مخصص لتحديث مورد (`Update a resource`) بحسب الجدول.
- ❌ **الخيار أ:** خاطئ — `GET` تُستخدم لاسترجاع البيانات (`Retrieve data`) فقط، لا التحديث.
- ❌ **الخيار ب:** خاطئ — `POST` تُستخدم لإرسال بيانات جديدة للخادم (`Send data to server`)، غالباً للإنشاء لا التحديث الكامل.
- ❌ **الخيار د:** خاطئ — `HEAD` مثل `GET` لكن بدون `body`، تُستخدم للتحقق من توفر المورد فقط.

---

### السؤال 7 (medium)

أي مما يلي **ليس** أحد الاستخدامات المذكورة صراحة لـ `decorators` بالمحاضرة؟

أ) `Logging`
ب) `Validation`
ج) `Routing`
د) `Caching`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** صحيح — `Routing` لم يُذكر إطلاقاً كاستخدام لـ `decorators` بالمحاضرة.
- ❌ **الخيار أ:** خاطئ — `Logging` مذكور صراحة كاستخدام شائع.
- ❌ **الخيار ب:** خاطئ — `Validation` مذكور صراحة كاستخدام شائع.
- ❌ **الخيار د:** خاطئ — `Caching` مذكور صراحة كاستخدام شائع.

---

### السؤال 8 (hard)

```typescript
abstract class Shape {
  abstract area(): number;
  describe() {
    console.log("Area is " + this.area());
  }
}
```

ما الذي يحدث لو حاولت كتابة `const s = new Shape();`؟

أ) يعمل بنجاح لأن `describe()` موجودة ومكتملة
ب) خطأ وقت الكتابة (`compile error`) لأن `Shape` هي `abstract class` ولا يمكن إنشاء `instance` منها مباشرة
ج) يعمل بنجاح لكن `s.area()` ترجع `undefined`
د) خطأ فقط وقت التشغيل، لا وقت الكتابة

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — أي `abstract class` ممنوعة الإنشاء المباشر بـ `new` بغض النظر عن اكتمال بقية الدوال، لأن فيها على الأقل `method` مجردة (`area()`) بلا تنفيذ.
- ❌ **الخيار أ:** خاطئ — وجود `describe()` مكتملة لا يلغي القيد؛ القيد مرتبط بوجود `abstract methods` وبتصريح الـ `class` نفسها كـ `abstract`.
- ❌ **الخيار ج:** خاطئ — الكود لا يُترجم أصلاً، فلا وجود لـ `s` إطلاقاً لتنفيذ `s.area()`.
- ❌ **الخيار د:** خاطئ — الخطأ يُكتشف وقت الكتابة (`compile-time`)، وهذا بالضبط جوهر فايدة `TypeScript`.

---

### السؤال 9 (hard)

ما الناتج لو غيّرنا الكود التالي من `type` إلى `interface` بدون أي تعديل آخر؟

```typescript
type Size = "small" | "medium" | "large";
```

أ) نفس السلوك تماماً، `interface` تدعم `union` أيضاً
ب) خطأ وقت الكتابة — لا يمكن استخدام `interface` لتعريف `union type` من قيم نصية ثابتة
ج) يعمل لكن يفقد ميزة `type inference`
د) يعمل ويصبح `Size` نوعاً اختيارياً (`optional`)

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — `interface` مصممة لوصف أشكال `objects` فقط، ولا تقدر تعرّف `union types` من قيم نصية مباشرة بهذي الطريقة.
- ❌ **الخيار أ:** خاطئ — هذا بالضبط الفرق الجوهري المشروح بالمحاضرة؛ `union` من اختصاصات `type` لا `interface`.
- ❌ **الخيار ج:** خاطئ — لا علاقة لهذا التغيير بـ `type inference` إطلاقاً؛ المشكلة أعمق وهي عدم دعم البنية أصلاً.
- ❌ **الخيار د:** خاطئ — الخلط هنا مع مفهوم `optional properties` (`?`)، وهو مفهوم مختلف كلياً عن `union types`.

---

### السؤال 10 (medium)

أي من التالي يصف بدقة `keyof User` حيث `User = { name: string; id: number }`؟

أ) `string | number`
ب) `"name" | "id"`
ج) `User[]`
د) `{ name: string; id: number }`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — `keyof` ينتج `union` من **أسماء** الخصائص كنصوص، لا من أنواع قيمها.
- ❌ **الخيار أ:** خاطئ — الخلط هنا بين `keyof` (أسماء الخصائص) و`Object.values` من حيث المفهوم — `keyof` لا يهتم بأنواع القيم.
- ❌ **الخيار ج:** خاطئ — `keyof` لا ينتج مصفوفة، ينتج `union type`.
- ❌ **الخيار د:** خاطئ — هذا هو النوع الأصلي `User` نفسه، مو ناتج `keyof`.

---

### السؤال 11 (hard)

```typescript
class Counter {
  count = 0;
  increment() {
    this.count++;
  }
}
const c = new Counter();
const fn = c.increment;
fn();
```

ما المشكلة المتوقعة بهذا الكود، وكيف تُحل حسب المحاضرة؟

أ) لا مشكلة، `fn()` تعمل بنجاح دائماً
ب) `this` يفقد سياقه عند استدعاء `fn()` منفصلة؛ الحل هو تحويل `increment` لخاصية `arrow function`
ج) المشكلة أن `count` لم تُعرَّف بنوع صريح
د) المشكلة أن `Counter` تحتاج `abstract class`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — بما إن `fn` استُدعيت بدون `c.` قبلها، `this` داخل `increment` يفقد ارتباطه بـ `c`؛ الحل المذكور بالمحاضرة هو استخدام `arrow function` كخاصية بدل `method` عادية.
- ❌ **الخيار أ:** خاطئ — هذا بالضبط المشكلة الكلاسيكية لـ `this` binding المشروحة بالمحاضرة.
- ❌ **الخيار ج:** خاطئ — `count = 0` يُستنتج نوعها تلقائياً كـ `number`؛ المشكلة لا علاقة لها بالأنواع إطلاقاً.
- ❌ **الخيار د:** خاطئ — لا علاقة لـ `abstract classes` بمشكلة `this` binding.

---

### السؤال 12 (medium)

أي مما يلي **ليس** أحد إصدارات `HTTP` المذكورة بمحاضرة `HTTP Protocol`؟

أ) `HTTP/1.1`
ب) `HTTP/2`
ج) `HTTP/2.5`
د) `HTTP/3`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** صحيح — `HTTP/2.5` غير موجود إطلاقاً؛ الإصدارات المذكورة هي `1.0`، `1.1`، `2`، و`3` فقط.
- ❌ **الخيار أ:** خاطئ — `HTTP/1.1` مذكور صراحة (عام 1999).
- ❌ **الخيار ب:** خاطئ — `HTTP/2` مذكور صراحة (عام 2015).
- ❌ **الخيار د:** خاطئ — `HTTP/3` مذكور صراحة (عام 2022، مبني على `QUIC`).

---

### السؤال 13 (hard)

```typescript
type Box<T> = { value: T };
type StringBox = Box<string>;
type NumberBox = Box<number>;
```

أي وصف يطابق بدقة سلوك `generics` هنا؟

أ) `Box<T>` تنشئ نوعاً منفصلاً بالكامل لكل استخدام، بدون أي علاقة بالنوع الأصلي
ب) `T` يُستبدل بالنوع الفعلي الممرَّر (`string` أو `number`) عند كل استخدام، مع الحفاظ على نفس البنية العامة
ج) `Box<T>` تعمل فقط مع الأنواع الأساسية (`string`، `number`، `boolean`) ولا تعمل مع `objects`
د) `Box<string>` و`Box<number>` يشيران لنفس النوع تماماً وقت التشغيل

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — هذا جوهر `generics`: نفس البنية العامة (`{ value: T }`) تُعاد استخدامها مع أنواع مختلفة تُحدد وقت الاستخدام، مع الحفاظ على الأمان الكامل لكل حالة.
- ❌ **الخيار أ:** خاطئ — العلاقة بالنوع الأصلي موجودة وقوية؛ `Box<T>` هي القالب العام، و`StringBox`/`NumberBox` هي تطبيقات محددة منه.
- ❌ **الخيار ج:** خاطئ — `generics` (زي `Box<T>` بمثال المحاضرة نفسها) تعمل مع أي نوع، سواء أساسي أو `object` معقد.
- ❌ **الخيار د:** خاطئ — الأنواع تُمحى وقت التشغيل أصلاً (`erased at runtime`)، فلا وجود لهذا التمييز أصلاً وقتها؛ لكن وقت الكتابة، `StringBox` و`NumberBox` نوعان مختلفان تماماً.

---

### السؤال 14 (medium)

بحسب المحاضرة، ما هو الغرض الأساسي من `Readonly<T>`؟

أ) تحويل كل خصائص `T` لتصبح اختيارية
ب) تحويل كل خصائص `T` لتصبح غير قابلة للتعديل بعد الإنشاء
ج) استخراج نوع القيمة الراجعة من دالة
د) اختيار خصائص محددة فقط من `T`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — هذا هو التعريف الدقيق المذكور بالمحاضرة لـ `Readonly<T>`.
- ❌ **الخيار أ:** خاطئ — هذا وصف `Partial<T>` وليس `Readonly<T>`؛ خلط شائع بين الاثنين لأنهما `utility types` متشابهة بالبنية.
- ❌ **الخيار ج:** خاطئ — هذا وصف `ReturnType<T>`، أداة مختلفة تماماً.
- ❌ **الخيار د:** خاطئ — هذا وصف `Pick<T, K>`، أداة مختلفة تماماً.

---

### السؤال 15 (hard)

ما الناتج لو غيّرنا `logPoint(point)` إلى `logPoint({ x: 12, y: 26 })` مباشرة (بدون متغير `point` منفصل)، مع بقاء تعريف `logPoint` كما هو؟

أ) خطأ لأن الشكل غير مطابق
ب) يعمل بنجاح، لأن `{ x: 12, y: 26 }` (بدون خصائص زيادة) يطابق `Point` تماماً، سواء كـ `object literal` مباشر أو من متغير
ج) يعمل فقط لو أضفنا `as Point` بعد الكائن
د) خطأ لأن `object literals` لا تُقبل مباشرة أبداً بـ `TypeScript`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** صحيح — `excess property check` يُفعَّل فقط لو فيه خصائص **زيادة** عن المطلوب؛ بما إن `{ x: 12, y: 26 }` مطابق تماماً بدون أي خاصية إضافية، يمر بنجاح سواء كان `object literal` مباشر أو من متغير.
- ❌ **الخيار أ:** خاطئ — الشكل مطابق تماماً هنا (لا خصائص ناقصة ولا زايدة)، فلا يوجد أي سبب للرفض.
- ❌ **الخيار ج:** خاطئ — لا حاجة لـ `as Point` هنا لأن الشكل مطابق أصلاً بدون أي غموض.
- ❌ **الخيار د:** خاطئ — `object literals` تُقبل بشكل طبيعي جداً؛ القيد الوحيد هو خاص بالخصائص **الزائدة** فقط، لا بكل `object literals` بشكل عام.

---

### السؤال 16 (medium)

أي `HTTP status code` يشير إلى نجاح الطلب بحسب جدول `HTTP Status Codes`؟

أ) `404 Not Found`
ب) `301 Moved Permanently`
ج) `200 OK`
د) `500 Internal Server Error`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** صحيح — `200 OK` يعني `Request succeeded` بحسب الجدول.
- ❌ **الخيار أ:** خاطئ — `404` يعني المورد غير موجود (`Resource missing`)، وهو خطأ من طرف العميل.
- ❌ **الخيار ب:** خاطئ — `301` يعني إعادة توجيه (`URL redirection`)، ليس نجاحاً مباشراً بنفس معنى `200`.
- ❌ **الخيار د:** خاطئ — `500` يعني مشكلة بالخادم (`Server problem`)، وهو خطأ خطير من طرف الخادم.

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 [TypeScript الأساسيات] — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Superset` | `TypeScript` = `JavaScript` + طبقة أنواع فوقه |
| `Static Typing` | فحص الأنواع وقت الكتابة، لا وقت التشغيل |
| `Type Inference` | استنتاج النوع تلقائياً من القيمة الابتدائية |
| `Erased at Runtime` | الأنواع تُمحى بعد الترجمة، لا تأثير على الأداء |

### 🔑 [أنواع البيانات] — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Union Type` (`\|`) | القيمة تكون واحدة فقط من مجموعة أنواع محددة |
| `Intersection Type` (`&`) | دمج كل خصائص عدة أنواع معاً |
| `Tuple` | مصفوفة بطول ثابت، كل موضع له نوع محدد |
| `Type Alias` | اسم لأي نوع (بسيط أو معقد) عبر `type` |
| `Interface` | وصف شكل `object` مع دعم `declaration merging` |
| `Optional Property` (`?`) | خاصية غير إلزامية بشكل `object` |

### 🔑 [الأنواع المتقدمة] — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `keyof T` | `union` من أسماء خصائص `T` كنصوص |
| `typeof value` | استخراج نوع من قيمة موجودة فعلياً |
| `T["key"]` (`Indexed Access`) | استخراج نوع خاصية وحدة من نوع أكبر |
| `Conditional Type` | `T extends X ? A : B` — منطق شرطي على مستوى الأنواع |
| `Template Literal Type` | بناء أنواع `string` بدمج `unions` |
| `Mapped Type` | `[K in keyof T]` — تحويل كل خاصية من نوع موجود |

### 🔑 [Utility Types] — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Partial<T>` | يجعل كل خصائص `T` اختيارية |
| `Readonly<T>` | يجعل كل خصائص `T` غير قابلة للتعديل |
| `Pick<T, K>` | ينشئ نوعاً جديداً يحتوي فقط الخصائص `K` من `T` |
| `ReturnType<T>` | يستخرج نوع القيمة الراجعة من دالة (مع `typeof`) |

### 🔑 [Classes] — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `public` | الوصول الافتراضي — من أي مكان |
| `private` | وصول من داخل الـ `class` فقط، فحص `TypeScript` وقت الكتابة بس |
| `protected` | وصول من الـ `class` وأي `class` وريثة منها |
| `#private` | خاصية خاصة حقيقية، محمية فعلياً وقت التشغيل بواسطة `JavaScript` |
| `static` | عضو ينتمي للـ `class` نفسها، لا لكل `instance` |
| `Parameter Property` | تعريف + تعيين خاصية بخطوة واحدة داخل الـ `constructor` |
| `extends` | وراثة خصائص ودوال `class` أساسية، مع إمكانية `override` |
| `implements` | فرض التزام `class` بشكل `interface` معيّن |
| `abstract class` | قاعدة لا تُنشأ منها `instances` مباشرة |
| `Generic Class` (`<T>`) | `class` تعمل بأمان مع أي نوع يُحدد وقت الاستخدام |
| `Structural Typing` | فحص الأنواع حسب الشكل لا الاسم |
| `Excess Property Check` | رفض `object literals` بخصائص زيادة عند التمرير المباشر |
| `Decorator` (`@name`) | يضيف `metadata`/سلوكاً إضافياً على `class` أو أعضائها |

### 🔑 مرجع HTTP Methods + Status Codes (من محاضرة HTTP)
| Method | الاستخدام | Success Code | Error Code |
| --- | --- | --- | --- |
| GET | قراءة مورد | 200 OK | 404 Not Found |
| POST | إنشاء مورد | 201 Created | 400 Bad Request |
| PUT | تحديث مورد بالكامل | 200 OK | 404 Not Found |
| DELETE | حذف مورد | 200 OK | 404 Not Found |

### 🔑 جداول المقارنة السريعة

| المعيار | `type` | `interface` |
| --- | --- | --- |
| وصف شكل `object` | ✅ | ✅ |
| `union` / `intersection` | ✅ | ❌ |
| `declaration merging` | ❌ | ✅ |
| الاستخدام الأنسب | مرونة عامة | عقود `object`/`class` |

| المعيار | `private` | `#private` |
| --- | --- | --- |
| مصدر الآلية | `TypeScript` فقط | `JavaScript` نفسها |
| حماية وقت التشغيل | ❌ (تختفي بعد الترجمة) | ✅ (فعلية دائماً) |
| متى تُستخدم | كود عادي داخل مشروع `TypeScript` | مكتبات قد تُستهلك من `JavaScript` عادي |

| المعيار | `Partial<T>` | `Pick<T, K>` |
| --- | --- | --- |
| ماذا يفعل | يجعل كل الخصائص اختيارية | يختار خصائص محددة فقط |
| الاستخدام الشائع | دوال التحديث (`update`) | إخفاء حقول حساسة زي `password` |

### 🔑 القواعد الذهبية
| # | القاعدة |
| --- | --- |
| 1 | الأنواع تُفحص وقت الكتابة فقط وتُمحى وقت التشغيل |
| 2 | استخدم `interface` لأشكال `object`، و`type` لكل شيء ثاني (`union`/`intersection`) |
| 3 | `private` ليست حماية حقيقية وقت التشغيل — استخدم `#private` لحماية فعلية |
| 4 | `TypeScript` يفحص حسب **الشكل** لا الاسم (`structural typing`) |
| 5 | `object literals` الممرَّرة مباشرة بخصائص زيادة تُرفض فوراً (`excess property check`) |
| 6 | `arrow functions` كخصائص تحل مشكلة ضياع `this` عند تمرير `methods` كـ `callbacks` |

---

## الجزء الخامس: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما هو `TypeScript` بالنسبة لـ `JavaScript`؟
**A:** هو `superset` منه — يضيف نظام أنواع ثابت فوق `JavaScript` ويتحول في النهاية إلى `JavaScript` عادي.

### البطاقة 2
**Q2:** ما الفرق بين `type` و`interface`؟
**A:** `type` أكثر مرونة وتدعم `union`/`intersection`، بينما `interface` مخصصة لأشكال `object` وتدعم `declaration merging`.

### البطاقة 3
**Q3:** متى تستخدم `Pick<T, K>` بدل `Partial<T>`؟
**A:** استخدم `Pick` لما تبي تختار خصائص محددة فقط (زي إخفاء `password`)، واستخدم `Partial` لما تبي تخلي كل الخصائص اختيارية (زي دوال التحديث).

### البطاقة 4
**Q4:** ما الفرق بين `private` و`#private`؟
**A:** `private` فحص `TypeScript` فقط يختفي بعد الترجمة، بينما `#private` حماية `JavaScript` حقيقية تبقى فعّالة وقت التشغيل.

### البطاقة 5
**Q5:** ما ناتج `keyof User` حيث `User = { name: string; id: number }`؟
**A:** `"name" | "id"` — `union` من أسماء الخصائص كنصوص.

### البطاقة 6
**Q6:** ما هي `structural typing`؟
**A:** فحص الأنواع بالاعتماد على **شكل** الكائن (خصائصه وأنواعها) بدلاً من اسم النوع المُعلن به.

### البطاقة 7
**Q7:** متى يُفعَّل `excess property check`؟
**A:** فقط عند تمرير `object literal` مباشرة (لا من متغير منفصل) يحتوي خصائص زيادة عن المطلوب.

### البطاقة 8
**Q8:** لماذا نستخدم `arrow function` كخاصية بدل `method` عادية داخل `class`؟
**A:** لحل مشكلة ضياع `this` عند تمرير الدالة كـ `callback`، لأن `arrow function` لا تربط `this` الخاصة فيها.

### البطاقة 9
**Q9:** ما الفرق بين `abstract class` و`class` عادية؟
**A:** لا يمكن إنشاء `instance` من `abstract class` مباشرة بـ `new`، وتحتوي عادة على `methods` مجردة لازم أي `class` وريثة تعرّفها.

### البطاقة 10
**Q10:** ما هي `Parameter Properties`؟
**A:** اختصار لتعريف وتعيين خاصية بخطوة واحدة داخل الـ `constructor` بإضافة `public`/`private`/`protected` قبل الـ `parameter` مباشرة.

### البطاقة 11
**Q11:** ما الفرق بين `implements` و`extends`؟
**A:** `extends` توريث كامل لخصائص ودوال `class` أساسية (مع تنفيذ جاهز)، بينما `implements` فرض عقد `interface` بدون أي تنفيذ جاهز — على الـ `class` تكتب كل شي بنفسها.

### البطاقة 12
**Q12:** ما فايدة `generics` (زي `Box<T>`)؟
**A:** تخلي نفس الـ `class` تشتغل بأمان كامل مع أي نوع يُحدد وقت الاستخدام، بدل تكرار نفس الـ `class` لكل نوع على حدة.

### البطاقة 13
**Q13:** ما شرط استخدام `decorators` بـ `TypeScript`؟
**A:** لازم تفعيل الخيار `"experimentalDecorators": true` في ملف `tsconfig.json`.

### البطاقة 14
**Q14:** ما الفرق بين `union type` و`intersection type`؟
**A:** `union` (`|`) يعني القيمة تكون واحدة فقط من مجموعة أنواع، بينما `intersection` (`&`) يعني القيمة لازم تحقق **كل** خصائص الأنواع المدموجة معاً.

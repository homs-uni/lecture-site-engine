# المحاضرة 10 — Inheritance by Examples (الوراثة بالأمثلة)
> **المادة:** البرمجة 2 (القسم العملي) | **الموضوع:** بناء ثلاثة صفوف `List` و `ArrayList` و `LinkedList` باستخدام `inheritance` و `virtual` و `pure virtual` و `override`، ومناقشة الفرق بين `override` و `overload`.

---
## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. فكرة المثال العامة

#### النص الأصلي يقول:
> "سنعمل اليوم على تطوير 3 صفوف: `List`، `ArrayList`، `LinkedList`. الصفين الثاني والثالث يرثان الصف الأول."

#### الشرح المبسّط:
تخيّل أن `List` هو "عقد عمل عام" يحدّد ما الذي يجب أن يقوم به أي نوع قائمة (تخزين، قراءة، كتابة، إضافة، حذف)، لكنه لا يحدد **كيف** يتم تنفيذ ذلك فعليًا. أما `ArrayList` و `LinkedList` فهما "موظفان" وقّعا هذا العقد والتزما بتنفيذ كل بند فيه، لكن كل واحد منهما بأسلوبه الخاص: `ArrayList` ينفّذ التخزين بمصفوفة، و `LinkedList` ينفّذه بعقد مترابطة.

**لماذا؟** الهدف من هذا التصميم هو ما يسمى `polymorphism` (تعدد الأشكال): يمكن للمستخدم أن يتعامل مع أي نوع قائمة (سواء `ArrayList` أو `LinkedList`) من خلال نفس الواجهة `List<T>*` دون أن يهتم بالتفاصيل الداخلية لكل نوع.

#### 💡 التشبيه:
> فكّر بـ `List` كأنه "قالب استمارة توظيف" يحدد الحقول المطلوبة (اسم، توقيع، تاريخ)، بينما `ArrayList` و `LinkedList` هما شخصان يملآن نفس الاستمارة لكن بخط يد مختلف.
> **وجه الشبه:** الاستمارة = `List<T>` (الواجهة المشتركة)، وطريقة تعبئتها = تنفيذ كل صف (`ArrayList`/`LinkedList`).

---

### 2. بنية الصف `List<T>`

#### النص الأصلي يقول:
> "الصف `List` يعبر عن قائمة تخزن أي نوع من العناصر. الحقل `len` يعبر عن طول القائمة (عدد العناصر الموجودة فيها). التابع `get` يعطي القيمة المخزنة ضمن فهرس. التابع `set` يخزن قيمة ضمن فهرس. `operator[]` تحميل زائد للمعامل `[]`. التابع `append` لإضافة عنصر جديد في نهاية القائمة. التابع `pop` لإزالة عنصر من نهاية القائمة. التابع `length` يعطي طول القائمة. التابع `getAsRef` يعيد القيمة المخزنة ضمن فهرس بالمرجع (له استخدام لاحق)."

#### الشرح المبسّط:
`List<T>` صف مجرّد (`abstract`) يمثّل "الشكل العام" لأي قائمة، بغض النظر عن طريقة التخزين الداخلية. كل تابع فيه يوصف بما يجب أن يفعله فقط، دون كتابة الجسم الفعلي (لأنه لا يعرف كيف سيُخزَّن العنصر داخليًا).

**لماذا؟** كي نستطيع لاحقًا أن نكتب كودًا يتعامل مع `List<T>*` بشكل عام، ثم نستبدل النوع الفعلي (`ArrayList` أو `LinkedList`) دون تعديل بقية الكود.

#### 💻 الكود: تعريف الصف `List<T>`

#### ما هذا الكود؟
> هذا التصريح (declaration) عن صف مجرّد `List<T>` يحدد الواجهة العامة (interface) التي يجب أن يلتزم بها أي صف وارث منه.

```cpp
template <typename T>
class List {
protected:
    int len = 0;                              // number of elements currently stored
    virtual T& getAsRef(int index) = 0;        // pure virtual: return element by reference

public:
    virtual ~List() {}                         // virtual destructor for safe polymorphic deletion
    virtual T get(int index) = 0;              // pure virtual: get value at index
    virtual void set(int index, T value) = 0;  // pure virtual: set value at index
    virtual void append(T value) = 0;          // pure virtual: add element at the end
    virtual T pop() = 0;                       // pure virtual: remove element from the end
    T& operator[](int index) {return getAsRef(index);} // subscript operator uses getAsRef
    int length() const { return len; }         // returns current length
};
```

#### شرح كل سطر:
1. `template <typename T>` → تعريف `template` عام — يسمح لـ `List` بتخزين أي نوع بيانات (`int`, `double`, كائنات...).
2. `class List {` → بداية تعريف الصف `List`.
3. `protected: int len = 0;` → حقل محمي (`protected`) يعبّر عن عدد العناصر، مع قيمة ابتدائية `0`.
4. `virtual T& getAsRef(int index) = 0;` → تابع `pure virtual` يعيد العنصر بالمرجع (`reference`)، يستخدمه المعامل `[]` لاحقًا.
5. `public: virtual ~List() {}` → هادم (`destructor`) `virtual` فارغ، ضروري كي يعمل الحذف بشكل صحيح عند التعامل عبر مؤشر الأب.
6. `virtual T get(int index) = 0;` → تابع `pure virtual` يعيد قيمة عنصر عند فهرس معيّن.
7. `virtual void set(int index, T value) = 0;` → تابع `pure virtual` يخزّن قيمة عند فهرس معيّن.
8. `virtual void append(T value) = 0;` → تابع `pure virtual` يضيف عنصرًا جديدًا في نهاية القائمة.
9. `virtual T pop() = 0;` → تابع `pure virtual` يزيل ويعيد آخر عنصر في القائمة.
10. `T& operator[](int index) {return getAsRef(index);}` → تحميل زائد (`overload`) للمعامل `[]`، ينفّذ فعليًا باستدعاء `getAsRef`.
11. `int length() const { return len; }` → تابع عادي (غير `virtual`) يعيد طول القائمة الحالي.
12. `};` → نهاية تعريف الصف.

> #### شرح زيادة للفهم (غير مشروحة صراحة في المحاضرة بهذا التفصيل)
> السطر `virtual ~List() {}` مهم جدًا: بدون `virtual` في الهادم، حذف كائن من نوع `ArrayList` أو `LinkedList` عبر مؤشر من نوع `List*` قد لا يستدعي الهادم الصحيح للصف الابن، مما يسبب تسريب ذاكرة (`memory leak`).

**المكتبات المطلوبة (Imports):**
> لا حاجة لمكتبات خارجية لهذا الصف نفسه، لكن الأصناف الوارثة تحتاج `<stdexcept>` لاستخدام `out_of_range` و `runtime_error`.

---

### 3. معنى `template <typename T>`

#### النص الأصلي يقول:
> "المقصود بها أن القائمة `List` تتقبل أي نوع بيانات، أي أن الأكواد التالية صحيحة."

```cpp
List<int> x;
List<double> y;
List<Class1> z;
```

#### الشرح المبسّط:
`template` يجعل الصف "عامًا" (`generic`)، أي يمكن استخدامه مع أي نوع بيانات دون إعادة كتابة الكود من جديد لكل نوع.

**لماذا؟** بدون `template`، سنحتاج لكتابة `IntList`, `DoubleList`, `Class1List`... إلخ، وهذا تكرار غير ضروري للكود.

> #### ملاحظة:
> رغم أن `List<int> x;` مذكور في المحاضرة، لا يمكن فعليًا إنشاء كائن من `List` مباشرة لأنه صف `abstract` (كما سيُشرح لاحقًا)؛ الجملة صحيحة **نحويًا** فقط عند استخدامها كمؤشر: `List<int>* x = new ArrayList<int>();`

#### 💡 التشبيه:
> `template` أشبه بقالب كوكيز (Cookie Cutter) واحد يمكن استخدامه لصنع كوكيز بأي نكهة (شوكولا، فانيلا...) دون تغيير شكل القالب.
> **وجه الشبه:** القالب = `template <typename T>`، النكهة = النوع `T` (`int`, `double`, ...).

---

### 4. معنى `virtual`

#### النص الأصلي يقول:
> "ماذا يعني `virtual`؟ الترجمة الحرفية 'افتراضي'. تعني في سياق البرمجة الغرضية التوجه ما يلي: التابع معرّف ضمن الأب. في حال إعادة تعريفه `override` ضمن الابن، وعبّرنا عن الابن باستخدام الأب، نُفّذ الكود الموجود لدى الابن وليس الكود الموجود لدى الأب."

#### الشرح المبسّط:
عندما نضع `virtual` أمام تابع في الصف الأب، فإننا نخبر المترجم: "لا تقرر أي نسخة من هذا التابع سيتم تنفيذها وقت الترجمة (`compile time`)، بل قرر ذلك وقت التشغيل (`runtime`) بناءً على النوع الحقيقي للكائن." هذا ما يسمى `dynamic dispatch` أو `late binding`.

**لماذا؟** لو لم يكن التابع `virtual`، فإن استدعاء `list->get(0)` عبر مؤشر من نوع `List*` سينفّذ دائمًا نسخة `List` (إن وُجدت)، بغض النظر عن كون الكائن الحقيقي `ArrayList` أو `LinkedList`. هذا يكسر فكرة `polymorphism` بأكملها.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا أزلنا كلمة `virtual` من تابع `get` في `List`، ثم استدعينا `list->get(5)` حيث `list` مؤشر `List*` يشير فعليًا إلى كائن `ArrayList`، أي نسخة ستُنفَّذ؟
> **لماذا هذا مهم؟** لأن هذا هو جوهر الفرق بين الربط الساكن (`static binding`) والربط الديناميكي (`dynamic binding`) في `C++`.

---

### 5. الصف المجرّد `abstract` و `pure virtual`

#### النص الأصلي يقول:
> "في حالتنا هذه لدينا تابع `pure virtual` (نتيجة إضافة `= 0` في النهاية لهذا التابع)، هذا النوع من الصفوف يُعرف باسم الصف المجرّد `abstract` والذي لا يمكن بناؤه، يمكن بناء أبنائه بشريطة ألا يكونوا `abstract`."

#### الشرح المبسّط:
وضع `= 0` بعد توقيع التابع (مثل `virtual T get(int index) = 0;`) يعني أن هذا التابع **ليس له أي تنفيذ** في الصف الأب — إنه مجرد "وعد" بأن كل صف وارث ملزم بتنفيذه. أي صف يحتوي تابعًا واحدًا على الأقل من نوع `pure virtual` يصبح تلقائيًا صفًا مجرّدًا (`abstract class`)، ولا يمكن إنشاء كائن منه مباشرة (`instantiate`).

**لماذا؟** لأن الصف `List` وحده لا يعرف كيف يُخزَّن العنصر فعليًا (بمصفوفة أم بعقد؟)، فمن غير المنطقي السماح ببناء كائن منه مباشرة.

```algorithm
1 | التحقق | المترجم (compiler) | يفحص هل يوجد تابع pure virtual (= 0) غير منفَّذ
2 | التصنيف | المترجم | إذا وُجد، يُصنَّف الصف كـ abstract تلقائيًا
3 | المنع | المترجم | يمنع new List<int>() برسالة خطأ عند الترجمة
4 | السماح | المترجم | يسمح ببناء صف وارث بشرط تنفيذ كل التوابع pure virtual
```

#### الفهم الخاطئ الشائع ❌: `abstract` يعني أن الصف لا يمكن استخدامه إطلاقًا.
#### الفهم الصحيح ✅: `abstract` يعني أنه لا يمكن بناء كائن (`instance`) منه مباشرة، لكن يمكن استخدامه كمؤشر (`List<int>* p = new ArrayList<int>();`) أو كصف أب تُبنى منه أصناف أخرى.

#### ⚖️ المقايضة: صف عادي مقابل صف `abstract`

| | صف عادي (Concrete) | صف مجرّد (Abstract) |
| --- | --- | --- |
| المزايا | يمكن بناء كائن منه مباشرة | يفرض عقدًا (contract) موحدًا على كل الأبناء |
| العيوب | لا يفرض التزامًا على الأبناء | لا يمكن بناء كائن منه مباشرة |
| متى تختاره | عندما يكون التنفيذ كاملًا ومحددًا | عندما تريد تعريف واجهة مشتركة لعدة تنفيذات مختلفة |

---

### 6. الصف `ArrayList<T>` — المفهوم العام

#### النص الأصلي يقول:
> "يعتمد هذا الصف على المصفوفات لتخزين القيم. داخليًا يخزن ضمن مصفوفة. عند إنشاء المصفوفة أول مرة يحجز مجموعة من الخانات الفارغة. عندما تمتلئ هذه الخانات الفارغة، يقوم بإنشاء مصفوفة جديدة ذات حجم أكبر وينقل العناصر السابقة لها ويضيف العنصر الجديد في النهاية. أي أن `capacity` تعبّر عن السعة الكلية للمصفوفة (عدد الغرف في الفندق). `len` تعبّر عن عدد الخانات المستخدمة (الغرف المحجوزة)."

#### الشرح المبسّط:
`ArrayList` يخزّن عناصره في مصفوفة (`array`) عادية على الكومة (`heap`) باستخدام مؤشر `dataPtr`. المشكلة أن حجم المصفوفة في `C++` ثابت بعد إنشائها، فإذا احتجنا مساحة أكبر، لا يمكننا "تمديد" المصفوفة الحالية — بل يجب إنشاء مصفوفة جديدة أكبر، نسخ كل العناصر القديمة إليها، ثم حذف القديمة.

**لماذا؟** لأن هذا هو الأسلوب الوحيد المتاح في `C++` عند التعامل مع مصفوفات ديناميكية (`dynamic arrays`) لا تدعم تغيير الحجم تلقائيًا.

#### 💡 التشبيه:
> تخيّل فندقًا (`capacity`) لديه عدد معيّن من الغرف. عدد الغرف **المحجوزة فعليًا** هو (`len`). عندما يمتلئ الفندق بالكامل ويصل حجز جديد، لا يمكن "تمديد المبنى"، بل يجب بناء فندق جديد أكبر، ونقل كل النزلاء الحاليين إليه، ثم هدم الفندق القديم.
> **وجه الشبه:** الفندق = المصفوفة، عدد الغرف = `capacity`، عدد النزلاء = `len`.

---

### 7. تعريف الصف `ArrayList<T>` وحقوله

#### النص الأصلي يقول:
> "نعرّف الصف `ArrayList` على أنه وارث للصف `List`. الحقل `capacity` يعبّر عن السعة الكلية للمصفوفة. الحقل `dataPtr` مؤشر على المصفوفة. التابع `expandData` يقوم بزيادة السعة بناءً على القيمة المُمرَّرة."

#### الشرح المبسّط:
عبارة `class ArrayList : public List<T>` تعني أن `ArrayList` يرث كل ما هو `public` و `protected` من `List`، ويلتزم بتنفيذ كل التوابع `pure virtual` المطلوبة منه.

**لماذا `public` قبل `List<T>`؟** هذا هو **محدد معرفة الوراثة** (`inheritance access specifier`) وليس محدد وصول عادي:
- `public`: كل من يتعامل مع `ArrayList` من الخارج يعرف أنه وارث لـ `List`.
- `private`: لا أحد خارج `ArrayList` يعرف أنه وارث لـ `List` (لا يمكن التعامل معه كـ `List*`).
- `protected`: فقط أبناء `ArrayList` (إن وُجدوا) يعرفون أنه يرث `List`.

#### 💻 الكود: حقول `ArrayList`

```cpp
class ArrayList : public List<T> {
private:
    T* dataPtr = nullptr;   // pointer to the underlying dynamic array (null = empty)
    int capacity = 0;       // total allocated capacity of the array
```

#### شرح كل سطر:
1. `class ArrayList : public List<T> {` → إعلان وراثة عامة (`public inheritance`) من `List<T>`.
2. `private: T* dataPtr = nullptr;` → مؤشر خاص يشير إلى المصفوفة الفعلية، مبدئيًا يشير إلى `nullptr` (أي "لا شيء").
3. `int capacity = 0;` → السعة الكلية الابتدائية، تبدأ من `0` (لا يوجد أي خانات محجوزة بعد).

> #### نقطة مهمة ⚠️:
> يمكن إسناد قيم ابتدائية للحقول مباشرة عند تعريفها ضمن الصف (`= nullptr`, `= 0`)، وهذا يُسمى `in-class member initialization`، وهو أسلوب حديث ومسموح في `C++11` وما بعدها.

---

### 8. التابع `expandData`

#### النص الأصلي يقول:
> "لا يمكننا المتابعة في حال كانت السعة الجديدة أصغر من السعة القديمة. حساب السعة الفعلية (في حال كنا عند أول استدعاء). التحقق من أن السعة الجديدة أكبر من السعة الفعلية. بناء المصفوفة. نسخ القيم من المصفوفة القديمة للجديدة. حذف المصفوفة القديمة. تخزين المصفوفة الجديدة."

#### الشرح المبسّط:
`expandData` هو "قلب" `ArrayList`: كل مرة تمتلئ فيها المصفوفة، يُستدعى هذا التابع لبناء مصفوفة أكبر ونقل البيانات إليها.

**لماذا؟** لأن التوسعة (`resize`) لمصفوفة موجودة فعليًا في `C++` غير ممكنة مباشرة؛ يجب إنشاء مساحة جديدة، نسخ البيانات، ثم تحرير المساحة القديمة.

#### ⚙️ الخطوات / الخوارزمية: `expandData(newCapacity)`

#### ما هدف هذه العملية؟
> ضمان وجود مساحة كافية في المصفوفة قبل إضافة عنصر جديد، مع مضاعفة السعة تدريجيًا لتقليل عدد عمليات إعادة التخصيص (`re-allocation`).

```algorithm
1 | التحقق المبدئي | if (newCapacity <= capacity) | إذا كانت السعة الجديدة أصغر أو تساوي القديمة، لا داعي للمتابعة (return)
2 | حساب السعة الفعلية | actualNewCapacity = (capacity == 0) ? 2 : capacity * 2 | إذا كنا عند أول استدعاء نبدأ بـ 2، وإلا نضاعف السعة الحالية
3 | التحقق من الكفاية | if (newCapacity > actualNewCapacity) | إذا كانت الحاجة الفعلية أكبر من الضعف، نأخذ newCapacity مباشرة
4 | بناء مصفوفة جديدة | new T[actualNewCapacity]() | حجز مساحة جديدة بالحجم المحسوب مع تهيئة كل القيم (القوسان الأخيران)
5 | نسخ العناصر | for loop | نسخ كل عنصر من المصفوفة القديمة (dataPtr) إلى الجديدة (newData)
6 | حذف القديمة | delete[] dataPtr | تحرير الذاكرة المحجوزة للمصفوفة القديمة لتفادي تسريب الذاكرة
7 | تحديث المؤشر | dataPtr = newData | المصفوفة الجديدة تصبح هي المصفوفة الفعّالة الآن
8 | تحديث السعة | capacity = actualNewCapacity | تسجيل السعة الجديدة الفعلية
```

#### 💻 الكود الكامل لـ `expandData`

```cpp
void expandData(int newCapacity) {
    if (newCapacity <= capacity) return;               // already big enough, nothing to do
    int actualNewCapacity = (capacity == 0) ? 2 : capacity * 2; // double the capacity (or start at 2)
    if (newCapacity > actualNewCapacity)
        actualNewCapacity = newCapacity;               // ensure we cover the requested capacity
    T* newData = new T[actualNewCapacity]();            // allocate new bigger array
    for (int i = 0; i < this->len; i++)
        newData[i] = dataPtr[i];                        // copy old elements to new array
    delete[] dataPtr;                                   // free the old array
    dataPtr = newData;                                  // point to the new array
    capacity = actualNewCapacity;                        // update capacity
}
```

#### شرح كل سطر:
1. `if (newCapacity <= capacity) return;` → إذا كانت السعة المطلوبة أصغر أو تساوي الحالية، لا حاجة للتوسعة.
2. `int actualNewCapacity = (capacity == 0) ? 2 : capacity * 2;` → استخدام `ternary operator` لحساب السعة الجديدة: تبدأ من `2` أو تتضاعف.
3. `if (newCapacity > actualNewCapacity) actualNewCapacity = newCapacity;` → ضمان تغطية الحاجة الفعلية حتى لو كانت أكبر من الضعف.
4. `T* newData = new T[actualNewCapacity]();` → حجز مصفوفة جديدة، والأقواس `()` تهيّئ كل عناصرها بالقيمة الافتراضية.
5. `for (int i = 0; i < this->len; i++)` → المرور على كل العناصر **الموجودة فعليًا** فقط (`len` وليس `capacity` القديمة).
6. `newData[i] = dataPtr[i];` → نسخ كل عنصر قديم إلى مكانه في المصفوفة الجديدة.
7. `delete[] dataPtr;` → تحرير المصفوفة القديمة بأكملها (`[]` ضرورية عند حذف مصفوفة).
8. `dataPtr = newData;` → المصفوفة الجديدة تصبح هي الحالية.
9. `capacity = actualNewCapacity;` → تحديث قيمة السعة.

**الناتج المتوقع (لقطة الشاشة):**
> لا يوجد ناتج طباعة مباشر لهذا التابع؛ أثره داخلي فقط (زيادة السعة ونقل البيانات) ويظهر أثره عند استدعاء `append`/`push` لاحقًا.

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| `Segmentation fault` عند النسخ | استخدام `capacity` القديمة بدل `len` في حلقة النسخ | استخدم `this->len` كحد للحلقة، فهو العدد الفعلي للعناصر |
| تسريب ذاكرة (`memory leak`) | نسيان `delete[] dataPtr;` قبل إسناد `dataPtr = newData;` | احذف المصفوفة القديمة دائمًا قبل استبدال المؤشر |
| حذف جزئي خاطئ | استخدام `delete dataPtr;` بدل `delete[] dataPtr;` | استخدم `delete[]` دائمًا مع المصفوفات المخصصة بـ `new T[]` |

---

### 9. التابع `getAsRef` في `ArrayList`

#### النص الأصلي يقول:
> "لكي يعمل المعامل `[]` بشكل سليم ليسمح لنا بالقراءة والكتابة، يجب أن يعيد قيمة بالمرجع ليسمح بالتغيير والتعديل، وهذا سبب استخدام التابع `getAsRef` عوضًا عن التابع `get`."

#### الشرح المبسّط:
لو أعاد `operator[]` قيمة عادية (`T` وليس `T&`)، لكان بإمكاننا **قراءة** العنصر فقط، لكن لا يمكننا كتابة شيء مثل `list[3] = 10;` لأن الناتج سيكون نسخة مؤقتة (`copy`) وليس العنصر الحقيقي في الذاكرة.

**لماذا `getAsRef` تحديدًا؟** لأنها تعيد `T&` (مرجعًا) يشير مباشرة إلى الخانة داخل `dataPtr`، فأي تعديل عليه ينعكس فورًا على المصفوفة الأصلية.

#### 💻 الكود

```cpp
protected:
    T& getAsRef(int index) override {
        if (index < 0 || index >= this->len)
            throw out_of_range("Index out of bounds");  // guard against invalid access
        return dataPtr[index];                            // return direct reference to the element
    }
```

#### شرح كل سطر:
1. `T& getAsRef(int index) override {` → إعادة تعريف (`override`) لتابع الأب `pure virtual`، مع إعادة `T&` (مرجع).
2. `if (index < 0 || index >= this->len) throw out_of_range("Index out of bounds");` → التحقق من صحة الفهرس؛ إن كان خارج نطاق `[0, len)` نطلق استثناءً (`exception`).
3. `return dataPtr[index];` → إعادة العنصر بالمرجع مباشرة من المصفوفة.

#### 🔄 قبل / بعد: تأثير استخدام `T&` بدل `T`

**قبل (بدون مرجع، لا يمكن التعديل):**
```cpp
T getAsRef(int index) { return dataPtr[index]; } // returns a copy
// list[3] = 10; // compile error: cannot assign to a temporary copy
```

**بعد (مع مرجع، التعديل ممكن):**
```cpp
T& getAsRef(int index) { return dataPtr[index]; } // returns a real reference
list[3] = 10; // works correctly, modifies the actual element
```

**ماذا تغيّر؟** استخدام `T&` بدل `T` يسمح بالتعديل المباشر على العنصر الحقيقي وليس على نسخة مؤقتة منه.

---

### 10. الهادم والمُنشئ وباقي توابع `ArrayList`

#### النص الأصلي يقول:
> "public: `ArrayList()` ... `~ArrayList()` ... `get` ... `set` ... `push` ... `pop`"

#### الشرح المبسّط:
`ArrayList` يحتاج `constructor` لتهيئة الحقول، و `destructor` لتحرير المصفوفة عند انتهاء عمر الكائن، بالإضافة إلى تنفيذ (`override`) كل التوابع `pure virtual` الموروثة من `List`.

#### 💻 الكود

```cpp
public:
    ArrayList() : dataPtr(nullptr), capacity(0) { this->len = 0; } // initializer list
    ~ArrayList() { delete[] dataPtr; }                              // free the array on destruction

    T get(int index) override {
        if (index < 0 || index >= this->len)
            throw out_of_range("Index out of bounds");
        return dataPtr[index];
    }

    void set(int index, T value) override {
        getAsRef(index) = value;   // reuse getAsRef to avoid duplicating bounds-checking logic
    }

    void push(T value) override {   // append behavior (named push here)
        if (this->len >= capacity) expandData(this->len + 1); // grow if needed
        dataPtr[this->len++] = value;                          // store, then increment len
    }

    T pop() override {
        if (this->len == 0) throw runtime_error("Empty list"); // guard against popping empty list
        return dataPtr[--this->len];                             // decrement len, then return element
    }
```

#### شرح كل سطر:
1. `ArrayList() : dataPtr(nullptr), capacity(0) { this->len = 0; }` → مُنشئ (`constructor`) يستخدم قائمة التهيئة (`initializer list`) لتصفير `dataPtr` و `capacity`، ثم يصفّر `len` الموروث من الأب داخل الجسم.
2. `~ArrayList() { delete[] dataPtr; }` → هادم يحرر المصفوفة بالكامل دفعة واحدة.
3. `T get(int index) override {...}` → إعادة تنفيذ `get` مع التحقق من صحة الفهرس، وإعادة نسخة من القيمة (وليس مرجعًا).
4. `void set(int index, T value) override { getAsRef(index) = value; }` → إعادة استخدام `getAsRef` بدلًا من تكرار كود التحقق من الحدود.
5. `void push(T value) override {` → بداية تنفيذ الإضافة (`append`/`push`).
6. `if (this->len >= capacity) expandData(this->len + 1);` → إذا امتلأت المصفوفة، وسّع السعة بمقدار عنصر واحد إضافي على الأقل.
7. `dataPtr[this->len++] = value;` → تخزين القيمة في الخانة التالية، ثم زيادة `len` (بعد الاستخدام مباشرة، لأن `++` هنا لاحقة).
8. `T pop() override {` → بداية تنفيذ الحذف من النهاية.
9. `if (this->len == 0) throw runtime_error("Empty list");` → لا يمكن حذف عنصر من قائمة فارغة.
10. `return dataPtr[--this->len];` → إنقاص `len` أولًا (بادئة `--`) ثم إعادة العنصر في الموقع الجديد لـ `len`.

> #### الدرس المستفاد:
> إعادة استخدام `getAsRef` داخل `set` (بدلًا من إعادة كتابة نفس التحقق من الحدود) هو مثال جيد على مبدأ `DRY` (Don't Repeat Yourself) في البرمجة الغرضية التوجه.

---

### 11. الصف `LinkedList<T>` — مفهوم القوائم المترابطة

#### النص الأصلي يقول:
> "على عكس المصفوفات (`Arrays`)، لا تُخزّن القوائم المترابطة العناصر في أماكن متجاورة في الذاكرة. بدلًا من ذلك، تتكون القائمة من وحدات تسمى العقد (`Nodes`)، وكل عقدة ترتبط بالعقدة التي تليها عن طريق 'مؤشر' (`Pointer/Reference`)."

#### الشرح المبسّط:
بعكس `ArrayList` الذي يخزن كل شيء متجاورًا في كتلة ذاكرة واحدة، فإن `LinkedList` يخزن كل عنصر في "عقدة" (`node`) منفصلة، وكل عقدة تحمل مؤشرًا إلى العقدة التالية (وأحيانًا السابقة).

**لماذا؟** هذا التصميم يجعل الإضافة والحذف في أي مكان بالقائمة أسرع (لا حاجة لنقل عناصر أخرى كما في المصفوفة)، لكنه يجعل الوصول العشوائي (`random access`) عبر الفهرس أبطأ لأنه يتطلب المرور عبر العقد واحدة تلو الأخرى.

#### 💡 التشبيه:
> `ArrayList` أشبه بمقاعد سينما مرقّمة متجاورة (يمكنك القفز مباشرة للمقعد رقم 50)، بينما `LinkedList` أشبه بسلسلة أشخاص يمسك كل واحد منهم يد التالي (لتصل للشخص الخمسين، يجب أن تمر بكل من قبله بالترتيب).
> **وجه الشبه:** المقاعد المرقّمة = وصول مباشر بالفهرس في `ArrayList`، سلسلة الأيدي = مرور تسلسلي (`traversal`) في `LinkedList`.

---

### 12. مكونات العقدة `Node` وأنواع القوائم المترابطة

#### النص الأصلي يقول:
> "تتكون كل عقدة بشكل أساسي من جزئين: 1. البيانات (`Data`): القيمة المراد تخزينها. 2. المؤشر (`Next`): عنوان الذاكرة للعقدة التالية في القائمة (يجب أن يتواجد هذا المؤشر على الأقل). توجد عدة أشكال للقوائم المترابطة بناءً على طريقة الربط بين العقد: القائمة الأحادية (`Singly Linked List`)، القائمة المزدوجة (`Doubly Linked List`)، القائمة الدائرية (`Circular Linked List`)."

#### الشرح المبسّط:
- **القائمة الأحادية:** كل عقدة تشير فقط للعقدة التالية (`next`)، وآخر عقدة تشير إلى `NULL`. التنقل باتجاه واحد فقط.
- **القائمة المزدوجة:** كل عقدة تحمل مؤشرين: `next` (للتالي) و `prev` (للسابق)، مما يسمح بالتنقل للأمام وللخلف. مؤشر `prev` في أول عقدة يشير لـ `NULL`، ومؤشر `next` في آخر عقدة يشير لـ `NULL`.
- **القائمة الدائرية:** تشير العقدة الأخيرة إلى العقدة الأولى بدلًا من `NULL`، فتشكّل حلقة مغلقة (`closed loop`).

**لماذا نستخدم القائمة المزدوجة تحديدًا في هذا المثال؟** لأن الصف `LinkedListItem` المعرَّف في هذه المحاضرة يحتوي على `next` **و** `prev` معًا، مما يجعله `Doubly Linked List`، وهذا يسهّل عملية `pop` من النهاية دون الحاجة للمرور بكامل القائمة.

#### ⚖️ المقايضة: أنواع القوائم المترابطة الثلاثة

| | أحادية (Singly) | مزدوجة (Doubly) | دائرية (Circular) |
| --- | --- | --- | --- |
| المزايا | أقل استهلاكًا للذاكرة (مؤشر واحد فقط) | تنقل للأمام وللخلف بسهولة | مناسبة لتطبيقات دورية (مثل جدول مناوبات) |
| العيوب | لا يمكن التنقل للخلف | استهلاك ذاكرة إضافي (مؤشر `prev`) | صعوبة تحديد "نهاية" القائمة إن لم تُدار بعناية |
| متى تختاره | عند الحاجة لمرور أحادي الاتجاه فقط | عند الحاجة لحذف/تنقل بالاتجاهين (كما في هذا المثال) | عند الحاجة لتكرار دوري مستمر (round-robin) |

---

### 13. العمليات الأساسية على القوائم المترابطة

#### النص الأصلي يقول:
> "الإدراج (`Insertion`): يمكن إضافة عقدة في البداية، النهاية، أو في أي مكان بالمنتصف بمجرد تغيير وجهة المؤشرات، دون الحاجة لإعادة ترتيب العناصر الأخرى كما في المصفوفات. الحذف (`Deletion`): يمكن إزالة عقدة عن طريق جعل العقدة التي تسبقها تشير مباشرة إلى العقدة التي تليها. البحث (`Search`): يتطلب المرور على العقد واحدة تلو الأخرى بدءًا من الرأس (`Head`). المرور (`Traversal`): زيارة كل عقدة في القائمة لطباعة البيانات أو معالجتها."

#### الشرح المبسّط:
هذه العمليات الأربع هي ما يميّز `LinkedList` عن `ArrayList`. لاحظ أن الإدراج والحذف في `LinkedList` لا يتطلبان "إزاحة" (`shifting`) بقية العناصر كما في المصفوفة — فقط تغيير بعض المؤشرات.

**لماذا هذا مهم؟** لأنه يجعل تعقيد (`complexity`) عملية الإدراج/الحذف في منتصف القائمة `O(1)` بمجرد الوصول للموقع (مقارنة بـ `O(n)` في `ArrayList` بسبب الإزاحة)، لكن الوصول نفسه للموقع في `LinkedList` يكلّف `O(n)`.

#### الفهم الخاطئ الشائع ❌: الإدراج/الحذف في `LinkedList` أسرع دائمًا من `ArrayList`.
#### الفهم الصحيح ✅: الإدراج/الحذف نفسه سريع (`O(1)`)، لكن الوصول إلى الموقع المطلوب أولًا يتطلب مرورًا تسلسليًا (`O(n)`)، لذا الأداء الإجمالي يعتمد على موقع العملية.

---

### 14. تعريف `LinkedListItem<T>` (العقدة)

#### النص الأصلي يقول:
> "يتوجب علينا أولًا تعريف العقد بالاعتماد على `Structs`."

#### الشرح المبسّط:
قبل بناء الصف `LinkedList` نفسه، نحتاج تعريف "لبنة البناء" الأساسية: العقدة (`Node`)، والتي تُمثَّل هنا بـ `struct` يحمل البيانات ومؤشرين.

#### 💻 الكود

```cpp
template <typename T>
struct LinkedListItem {
    T data;                  // the value stored in this node
    LinkedListItem* next;    // pointer to the next node (or nullptr if last)
    LinkedListItem* prev;    // pointer to the previous node (or nullptr if first)
};
```

#### شرح كل سطر:
1. `template <typename T>` → العقدة أيضًا عامة (`generic`) وتتوافق مع نفس نوع `T` للقائمة.
2. `struct LinkedListItem {` → استخدام `struct` بدلًا من `class` (الفرق الأساسي أن حقول `struct` تكون `public` افتراضيًا).
3. `T data;` → الحقل الذي يحمل القيمة الفعلية المخزنة في هذه العقدة.
4. `LinkedListItem* next;` → مؤشر ذاتي (`self-referencing pointer`) يشير للعقدة التالية.
5. `LinkedListItem* prev;` → مؤشر ذاتي يشير للعقدة السابقة (وهذا ما يجعلها قائمة مزدوجة).

#### 💡 التشبيه:
> العقدة أشبه بعربة قطار: تحمل ركّابًا (`data`)، ولها مقطورة أمامية متصلة بها (`next`) وأخرى خلفية (`prev`).
> **وجه الشبه:** عربة القطار = `LinkedListItem`، الركاب = `data`، الاتصال بالعربة التالية/السابقة = `next`/`prev`.

---

### 15. تعريف الصف `LinkedList<T>` وحقوله والتابع `moveIndex`

#### النص الأصلي يقول:
> "لكي نتنقل (بأسهل شكل ممكن) ننفذ حلقة تنتقل من البداية إلى العنصر المطلوب وذلك من خلال قراءة محتوى الحقل `next` في العقدة (`LinkedListItem`). هل هنالك آليات تنقل أخرى؟ نعم تستوجب تخزين معلومات أكثر ولكنها تسمح بالتنقل بين العناصر بالاعتماد على `next` و `prev` وذلك بناءً على الفهرس الحالي والفهرس الهدف (غير مطلوب)."

#### الشرح المبسّط:
`LinkedList` يحتفظ بثلاثة مؤشرات: `start` (بداية القائمة)، `end` (نهايتها)، و `current` (يُستخدم كمؤشر مؤقت أثناء التنقل). التابع `moveIndex` هو المسؤول عن "المشي" داخل القائمة حتى الوصول للفهرس المطلوب.

**لماذا نبدأ دائمًا من `start`؟** لأن هذا هو الأسلوب الأبسط (المذكور في المحاضرة)؛ الأسلوب الأكثر تحسينًا (اختياري وغير مطلوب) يقارن الفهرس الهدف بمنتصف القائمة ويقرر الانطلاق من `start` أو `end` أيهما أقرب، لكنه يتطلب تخزين معلومات إضافية.

#### 💻 الكود

```cpp
class LinkedList : public List<T> {
private:
    LinkedListItem<T>* start = nullptr;   // pointer to the first node
    LinkedListItem<T>* end = nullptr;     // pointer to the last node
    LinkedListItem<T>* current = nullptr; // temporary pointer used while traversing

    void moveIndex(int index) const {
        if (index < 0 || index >= this->len)
            throw out_of_range("Index out of bounds"); // guard invalid index
        current = start;                                  // always start walking from the head
        for (int i = 0; i < index; i++) {
            current = current->next;                       // move one step forward each time
        }
    }
```

#### شرح كل سطر:
1. `class LinkedList : public List<T> {` → وراثة عامة من `List<T>` تمامًا مثل `ArrayList`.
2. `LinkedListItem<T>* start = nullptr;` → مؤشر لأول عقدة، مبدئيًا `nullptr` (قائمة فارغة).
3. `LinkedListItem<T>* end = nullptr;` → مؤشر لآخر عقدة، ضروري لتنفيذ `push`/`pop` بكفاءة `O(1)`.
4. `LinkedListItem<T>* current = nullptr;` → مؤشر مساعد يُستخدم مؤقتًا أثناء `moveIndex`/`getAsRef`.
5. `void moveIndex(int index) const {` → تابع خاص (`private`) `const` (لا يعدّل حالة الكائن المنطقية، رغم تعديله لـ `current`).
6. `if (index < 0 || index >= this->len) throw out_of_range(...);` → تحقق من صحة الفهرس أولًا قبل أي محاولة تنقل.
7. `current = start;` → البدء دائمًا من رأس القائمة.
8. `for (int i = 0; i < index; i++) { current = current->next; }` → التقدم خطوة خطوة عبر `next` حتى الوصول للفهرس المطلوب.

> #### ملاحظة:
> لاحظ أن `current` هو حقل من حقول الصف (`member`)، وليس متحولًا محليًا (`local variable`)؛ لذلك رغم أن `moveIndex` توصف بـ `const`، فإن `current` يجب أن يكون معرَّفًا كـ `mutable` (أو أن التابع لا يكون فعليًا `const` بالمعنى الصارم) — هذه نقطة دقيقة للتوسع خارج نطاق هذه المحاضرة.

---

### 16. `getAsRef` والمُنشئ/الهادم في `LinkedList`

#### النص الأصلي يقول:
> "نلاحظ أنه في الهادم علينا أن نحذف (`delete`) كل عنصر من المصفوفة على حدة، على خلاف `ArrayList` التي حذفنا فيها المصفوفة كاملة."

#### الشرح المبسّط:
بعكس `ArrayList` حيث `delete[] dataPtr;` يحرر كل الذاكرة دفعة واحدة، فإن عقد `LinkedList` منفصلة عن بعضها في الذاكرة (كل عقدة حُجزت بـ `new` مستقلة)، لذا يجب المرور عليها عقدة عقدة وحذف كل واحدة على حدة.

#### 💻 الكود

```cpp
protected:
    T& getAsRef(int index) override {
        moveIndex(index);        // move `current` to the target node
        return current->data;    // return reference to its data
    }

public:
    LinkedList() : start(nullptr), end(nullptr), current(nullptr) { this->len = 0; }

    ~LinkedList() {
        while (start) {                        // as long as there is at least one node
            LinkedListItem<T>* temp = start;    // remember the node to delete
            start = start->next;                // move start forward first
            delete temp;                         // then safely delete the old node
        }
    }
```

#### شرح كل سطر:
1. `T& getAsRef(int index) override {` → تستدعي `moveIndex` أولًا للوصول للعقدة الصحيحة.
2. `moveIndex(index);` → تحرك `current` حتى يشير للعقدة المطلوبة.
3. `return current->data;` → إعادة حقل `data` بالمرجع (`reference`)، مما يسمح بالقراءة والتعديل معًا (تمامًا كما في `ArrayList`).
4. `LinkedList() : start(nullptr), end(nullptr), current(nullptr) { this->len = 0; }` → مُنشئ يهيّئ كل المؤشرات إلى `nullptr` ويصفّر `len`.
5. `~LinkedList() {` → بداية الهادم.
6. `while (start) {` → استمرار الحذف طالما توجد عقدة (`start` ليس `nullptr`).
7. `LinkedListItem<T>* temp = start;` → حفظ مؤشر مؤقت للعقدة الحالية قبل التقدم (لتجنب فقدانها).
8. `start = start->next;` → تحريك `start` للعقدة التالية **قبل** الحذف.
9. `delete temp;` → حذف العقدة القديمة بأمان بعد أن أصبح `start` يشير للعقدة الجديدة.

#### 🔍 تتبع التنفيذ: هادم `LinkedList` على قائمة من 3 عناصر

**المدخل:** قائمة `1 -> 2 -> 3` (start يشير إلى العقدة 1)

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `temp = start` (يشير لعقدة 1) | `start` لا يزال يشير لعقدة 1 |
| 2 | `start = start->next` | `start` يشير الآن لعقدة 2 |
| 3 | `delete temp` | عقدة 1 محذوفة من الذاكرة |
| 4 | تكرار (temp=عقدة2, start=عقدة3, delete عقدة2) | `start` يشير لعقدة 3 |
| 5 | تكرار أخير (temp=عقدة3, start=nullptr, delete عقدة3) | `start == nullptr`، الحلقة تتوقف |

**النتيجة:** كل العقد الثلاث محذوفة، ولا يوجد تسريب ذاكرة.

---

### 17. `get`, `set`, `push` في `LinkedList`

#### 💻 الكود

```cpp
T get(int index) override { return getAsRef(index); }
void set(int index, T value) override { getAsRef(index) = value; }

void push(T value) override {
    LinkedListItem<T>* newNode = new LinkedListItem<T>{value, nullptr, nullptr}; // create new node
    if (!start) {
        start = end = newNode;    // list was empty: new node is both start and end
    } else {
        end->next = newNode;      // link current last node to the new one
        newNode->prev = end;      // link the new node back to the old last node
        end = newNode;            // new node becomes the new last node
    }
    this->len++;                  // increment length
}
```

#### شرح كل سطر:
1. `T get(int index) override { return getAsRef(index); }` → إعادة استخدام `getAsRef` مباشرة (بدون تكرار منطق التنقل).
2. `void set(int index, T value) override { getAsRef(index) = value; }` → نفس فكرة إعادة الاستخدام في `set`.
3. `LinkedListItem<T>* newNode = new LinkedListItem<T>{value, nullptr, nullptr};` → إنشاء عقدة جديدة على الكومة (`heap`) تحمل القيمة، مع `next` و `prev` مبدئيًا `nullptr`.
4. `if (!start) {` → حالة خاصة: القائمة فارغة.
5. `start = end = newNode;` → العقدة الجديدة تصبح البداية والنهاية في آن واحد.
6. `} else {` → حالة عامة: توجد عناصر مسبقًا.
7. `end->next = newNode;` → آخر عقدة حالية تشير الآن للعقدة الجديدة.
8. `newNode->prev = end;` → العقدة الجديدة تشير للخلف نحو آخر عقدة سابقة.
9. `end = newNode;` → تحديث `end` لتصبح العقدة الجديدة هي الأخيرة.
10. `this->len++;` → زيادة عدد العناصر.

#### ⚙️ الخطوات / الخوارزمية: `push` في `LinkedList`

```algorithm
1 | إنشاء عقدة | new LinkedListItem<T> | حجز عقدة جديدة تحمل القيمة المطلوب إضافتها
2 | فحص الفراغ | if (!start) | التحقق ما إذا كانت القائمة فارغة تمامًا
3 | حالة الفراغ | start = end = newNode | العقدة الجديدة تصبح الوحيدة (بداية ونهاية)
4 | حالة الامتلاء | end->next = newNode; newNode->prev = end | ربط العقدة الجديدة بنهاية القائمة الحالية من الاتجاهين
5 | تحديث النهاية | end = newNode | العقدة الجديدة تصبح المؤشر الجديد للنهاية
6 | تحديث الطول | this->len++ | زيادة عداد عدد العناصر بمقدار واحد
```

---

### 18. `pop` في `LinkedList`

#### 💻 الكود

```cpp
T pop() override {
    if (!end) throw runtime_error("Cannot pop from empty list"); // guard: nothing to remove
    T value = end->data;                       // save the value before deleting the node
    LinkedListItem<T>* toDelete = end;          // remember which node we are removing
    if (start == end) {                          // only one node in the list
        start = end = nullptr;                    // list becomes empty
    } else {
        end = end->prev;                           // move end back to the previous node
        end->next = nullptr;                       // the new last node has no next anymore
    }
    delete toDelete;                              // free the removed node's memory
    this->len--;                                  // decrement length
    return value;                                 // return the removed value
}
```

#### شرح كل سطر:
1. `if (!end) throw runtime_error("Cannot pop from empty list");` → لا يمكن الحذف من قائمة فارغة (`end` يشير لـ `nullptr`).
2. `T value = end->data;` → حفظ القيمة قبل حذف العقدة (كي لا نفقدها بعد `delete`).
3. `LinkedListItem<T>* toDelete = end;` → الاحتفاظ بمؤشر منفصل للعقدة التي ستُحذف.
4. `if (start == end) {` → حالة خاصة: القائمة تحتوي عنصرًا واحدًا فقط.
5. `start = end = nullptr;` → بعد الحذف تصبح القائمة فارغة تمامًا.
6. `} else {` → الحالة العامة: أكثر من عنصر.
7. `end = end->prev;` → العقدة السابقة تصبح هي النهاية الجديدة.
8. `end->next = nullptr;` → قطع الرابط القديم نحو العقدة المحذوفة.
9. `delete toDelete;` → تحرير ذاكرة العقدة المحذوفة فعليًا.
10. `this->len--;` → إنقاص عدد العناصر.
11. `return value;` → إعادة القيمة المحفوظة مسبقًا.

#### 🔄 قبل / بعد: عملية `pop` على قائمة `1 -> 2 -> 3`

**قبل:**
```cpp
// list: 1 <-> 2 <-> 3   (end points to node "3")
```

**بعد:**
```cpp
// list: 1 <-> 2          (end points to node "2", node "3" freed)
// returned value = 3
```

**ماذا تغيّر؟** العقدة الأخيرة حُذفت فعليًا من الذاكرة، وأصبح `end` يشير للعقدة التي كانت قبلها مباشرة، مع قطع الرابط `next` القديم.

---

### 19. مفهوم `override`

#### النص الأصلي يقول:
> "كلمة غريبة، ما الهدف منها؟ الهدف منها أن نوضح أن هذا التابع تمت إعادة تحقيقه. هل هي إلزامية؟ لا، لكن يفضّل تواجدها. ما الفرق بين `override` (إعادة التحقيق) و `overload` التحميل الزائد؟ التحميل الزائد يعطينا القدرة على جعل التابع يتعرّف على نوع جديد من الوسطاء أو عدد مختلف من الوسطاء، قد يتضمن تعديلًا في المنطق الخاص بالتابع. إعادة التحقيق `override` تعني تغيّرًا كاملًا لمنطق التابع."

#### الشرح المبسّط:
`override` هي كلمة مفتاحية (`keyword`) اختيارية تُضاف بعد توقيع تابع في صف وارث، لتخبر المترجم بوضوح: "أنا أعيد تعريف تابع `virtual` موجود في الصف الأب، وليس تابعًا جديدًا مختلفًا بالخطأ."

**لماذا نستخدمها رغم أنها غير إلزامية؟** لأنها تحمي من أخطاء صامتة (`silent bugs`): لو أخطأت في كتابة توقيع التابع (مثلًا نسيت `const` أو غيّرت نوع وسيط)، فإن المترجم سيعتبره تابعًا جديدًا منفصلًا بدلًا من `override` فعلي، وسيعطيك خطأً واضحًا بسبب `override` بدلًا من ترك الخطأ صامتًا.

#### ⚖️ المقايضة: `override` مقابل `overload`

| | `override` (إعادة التحقيق) | `overload` (التحميل الزائد) |
| --- | --- | --- |
| المزايا | يضمن استبدال منطق الأب بالكامل بأمان، ويكشف أخطاء التوقيع عند الترجمة | يسمح بتعدد أشكال نفس اسم التابع حسب نوع/عدد الوسطاء |
| العيوب | يتطلب أن يكون التابع الأصلي `virtual`، ويجب تطابق التوقيع تمامًا | لا علاقة له بالوراثة؛ لا يمكن استخدامه لتغيير منطق تابع موروث بالكامل |
| متى تختاره | عند إعادة تعريف سلوك تابع من صف أب `virtual` (كما في `List` → `ArrayList`) | عند الحاجة لنفس اسم التابع بعدة توقيعات مختلفة في نفس الصف |

#### الفهم الخاطئ الشائع ❌: `override` و `overload` نفس الشيء لأن كلاهما "يعيد تعريف" تابعًا.
#### الفهم الصحيح ✅: `override` يستبدل منطق تابع `virtual` موروث بالكامل بنفس التوقيع تمامًا، بينما `overload` يضيف نسخة جديدة من التابع بتوقيع مختلف (عدد/نوع وسطاء مختلف) داخل نفس الصف.

---

### 20. التابع `main` — التجربة العملية

#### النص الأصلي يقول:
> كود `main` الذي ينشئ `ArrayList` و `LinkedList`، يضيف 500 عنصر لكل منهما، ثم يطبع العناصر من الفهرس 10 حتى 19 من كل قائمة.

#### الشرح المبسّط:
هذا الكود يثبت عمليًا فكرة `polymorphism`: كلا الكائنين مُعرَّفان كـ `List<int>*`، لكن كل واحد منهما يُنشأ فعليًا كنوع مختلف (`ArrayList` أو `LinkedList`)، والتعامل معهما (عبر `push` والمعامل `[]`) يبدو متطابقًا من الخارج رغم اختلاف التنفيذ الداخلي تمامًا.

#### 💻 الكود الكامل لـ `main`

```cpp
int main() {
    List<int> *alist = new ArrayList<int>();   // create ArrayList, referenced via base pointer
    List<int> *llist = new LinkedList<int>();  // create LinkedList, referenced via base pointer

    for (int i = 0; i < 500; i++) {
        alist->push(i);   // append 500 elements to the ArrayList
        llist->push(i);   // append 500 elements to the LinkedList
    }

    for (int i = 10; i < 20; i++)
        cout << (*llist)[i] << "\t";   // print elements 10..19 from the LinkedList
    cout << endl;

    for (int i = 10; i < 20; i++)
        cout << (*alist)[i] << "\t";   // print elements 10..19 from the ArrayList
    cout << endl;

    return 0;
}
```

#### شرح كل سطر:
1. `List<int> *alist = new ArrayList<int>();` → تعريف مؤشر من نوع الأب `List<int>*`، لكنه يشير فعليًا لكائن `ArrayList<int>` — هذا هو جوهر `polymorphism`.
2. `List<int> *llist = new LinkedList<int>();` → نفس الفكرة، لكن الكائن الفعلي هنا `LinkedList<int>`.
3. `for (int i = 0; i < 500; i++) {` → حلقة تكرار 500 مرة لملء كلتا القائمتين.
4. `alist->push(i);` → استدعاء `push` على `alist`؛ بفضل `virtual`، ينفَّذ فعليًا كود `ArrayList::push`.
5. `llist->push(i);` → استدعاء `push` على `llist`؛ ينفَّذ فعليًا كود `LinkedList::push`.
6. `for (int i = 10; i < 20; i++) cout << (*llist)[i] << "\t";` → طباعة العناصر 10 إلى 19 من `llist` باستخدام المعامل `[]` (الذي يستدعي `getAsRef` داخليًا).
7. `cout << endl;` → سطر جديد بعد طباعة عناصر `llist`.
8. `for (int i = 10; i < 20; i++) cout << (*alist)[i] << "\t";` → نفس الفكرة، لكن على `alist`.
9. `cout << endl;` → سطر جديد بعد طباعة عناصر `alist`.
10. `return 0;` → نهاية البرنامج بنجاح.

**الناتج المتوقع (لقطة الشاشة):**
> يُطبع سطران متطابقان في المحتوى: `10  11  12  13  14  15  16  17  18  19` — رغم اختلاف التنفيذ الداخلي الكامل بين `ArrayList` و `LinkedList`، تُنتج نفس القيم لأن كليهما يخزن نفس التسلسل `0..499`.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** أيّ سطر من الاثنين (طباعة `llist` أم `alist`) سيستغرق وقت تنفيذ أطول عمليًا عند الوصول لكل عنصر بالفهرس، ولماذا؟
> **لماذا هذا مهم؟** لأن `(*llist)[i]` يتطلب مرورًا تسلسليًا من `start` حتى الفهرس `i` في كل استدعاء (`O(i)`)، بينما `(*alist)[i]` وصول مباشر (`O(1)`) عبر `dataPtr[i]`؛ رغم أن الناتج المطبوع متطابق، فإن الأداء الداخلي مختلف تمامًا.

---
## الجزء الثاني: ملخص منظم

### جدول التعريفات

| المصطلح | التعريف |
| --- | --- |
| `abstract class` | صف يحتوي تابعًا واحدًا على الأقل من نوع `pure virtual`، ولا يمكن بناء كائن منه مباشرة |
| `pure virtual` | تابع `virtual` بدون تنفيذ في الصف الأب (`= 0`)، يُلزم كل صف وارث بتنفيذه |
| `virtual` | كلمة مفتاحية تفعّل `dynamic dispatch`، أي تحديد نسخة التابع المُنفَّذة وقت التشغيل بناءً على النوع الحقيقي للكائن |
| `override` | كلمة مفتاحية اختيارية تؤكد أن تابعًا في الصف الوارث يعيد تعريف تابع `virtual` من الأب بنفس التوقيع |
| `overload` | تعريف عدة نسخ من تابع بنفس الاسم لكن بتوقيعات مختلفة (عدد/نوع وسطاء) |
| `template` | آلية `C++` لكتابة كود عام يعمل مع أي نوع بيانات (`generic programming`) |
| `capacity` | السعة الكلية المحجوزة فعليًا في مصفوفة `ArrayList` (قد تكون أكبر من عدد العناصر الفعلي) |
| `len` | عدد العناصر الفعلي المخزَّن حاليًا (في `ArrayList` أو `LinkedList`) |
| `Node` (`LinkedListItem`) | وحدة تخزين أساسية في القائمة المترابطة، تحمل البيانات ومؤشر(ات) للعقد المجاورة |
| `traversal` | المرور على كل عناصر البنية (قائمة، شجرة...) واحدًا تلو الآخر لمعالجتها |

### جدول المكونات

| الصف | الحقول الأساسية | التوابع المميزة |
| --- | --- | --- |
| `List<T>` | `len` (محمي) | `get`, `set`, `append`, `pop`, `length`, `getAsRef` (كلها `pure virtual` عدا `length`)، `operator[]` |
| `ArrayList<T>` | `dataPtr` (مؤشر مصفوفة)، `capacity` | `expandData`, `getAsRef`, `get`, `set`, `push`, `pop` |
| `LinkedList<T>` | `start`, `end`, `current` (مؤشرات عقد) | `moveIndex`, `getAsRef`, `get`, `set`, `push`, `pop` |

### جدول المقارنات: `ArrayList` مقابل `LinkedList`

| المعيار | `ArrayList` | `LinkedList` |
| --- | --- | --- |
| طريقة التخزين | مصفوفة متجاورة في الذاكرة | عقد منفصلة مرتبطة بمؤشرات |
| الوصول بالفهرس (`operator[]`) | مباشر وسريع (`O(1)`) | تسلسلي وأبطأ (`O(n)`) |
| الإضافة في النهاية (`push`) | سريعة غالبًا، وأحيانًا تتطلب `expandData` | سريعة دائمًا (`O(1)`) لوجود مؤشر `end` |
| الحذف من النهاية (`pop`) | سريع (`O(1)`) | سريع (`O(1)`) لوجود مؤشر `end` و `prev` |
| الهادم (`destructor`) | حذف المصفوفة كاملة دفعة واحدة `delete[]` | حذف كل عقدة على حدة ضمن حلقة `while` |

### جدول المصطلحات الإنجليزية المستخدمة

| المصطلح | الشرح المختصر |
| --- | --- |
| `heap` | الذاكرة الديناميكية التي يُحجز فيها بـ `new` ويُحرَّر بـ `delete` |
| `reference` | مرجع/اسم بديل لمتحول موجود فعليًا في الذاكرة، وليس نسخة منه |
| `instantiate` | إنشاء كائن فعلي (`object`) من صف (`class`) |
| `polymorphism` | تعدد الأشكال؛ التعامل مع أنواع مختلفة عبر واجهة موحدة |
| `dynamic dispatch` | تحديد نسخة التابع المُنفَّذة فعليًا وقت التشغيل بدل وقت الترجمة |

### جدول الأخطاء الشائعة

| الخطأ | لماذا يحدث | كيف نتجنبه |
| --- | --- | --- |
| نسيان `virtual` في الهادم بالصف الأب | يظن المبرمج أن الهادم العادي كافٍ | ضع `virtual ~ClassName() {}` دائمًا في أي صف أب مصمَّم للوراثة |
| استخدام `delete` بدل `delete[]` مع مصفوفة | الخلط بين حذف كائن مفرد وحذف مصفوفة | استخدم `delete[]` مع كل ما خُصِّص بـ `new T[...]` |
| نسيان تحديث `end` بعد `pop` في `LinkedList` | التركيز فقط على حذف العقدة دون تحديث المؤشرات المحيطة | تأكد من تحديث `end = end->prev` و `end->next = nullptr` قبل الحذف |
| بناء كائن مباشر من صف `abstract` | نسيان أن وجود `pure virtual` واحد يجعل الصف `abstract` | تحقق من عدم وجود `= 0` غير منفَّذ قبل محاولة `new List<T>()` |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء صف وارث ملتزم بعقد صف أب `abstract`

#### ما هدف هذه العملية؟
> ضمان أن أي صف وارث من صف `abstract` مثل `List<T>` يوفّر تنفيذًا فعليًا لكل تابع `pure virtual` قبل السماح بإنشاء كائنات منه.

```algorithm
1 | تعريف الوراثة | class Child : public Parent<T> | ربط الصف الوارث بالصف الأب عبر public inheritance
2 | تحديد التوابع الناقصة | مراجعة كل virtual ... = 0 | حصر كل تابع pure virtual يجب تنفيذه
3 | التنفيذ الفعلي | إضافة override لكل تابع | كتابة منطق التخزين الخاص بالصف الوارث (array أو linked nodes)
4 | التحقق من الاكتمال | محاولة new Child<T>() | إذا نجحت الترجمة، فالصف لم يعد abstract
```

#### ⚙️ الخطوات / الخوارزمية: التبديل الآمن بين `ArrayList` و `LinkedList` عبر `List<T>*`

#### ما هدف هذه العملية؟
> إظهار كيف يسمح `polymorphism` باستخدام نفس الكود مع أنواع تخزين مختلفة تمامًا.

```algorithm
1 | التصريح | List<T>* p = new ArrayList<T>(); | إنشاء الكائن الفعلي من نوع محدد لكن حمله في مؤشر أب
2 | الاستخدام | p->push(value); | استدعاء تابع virtual عبر المؤشر الأب
3 | الفصل الديناميكي | dynamic dispatch وقت التشغيل | البرنامج يحدد فعليًا أن الكود المنفَّذ هو ArrayList::push
4 | الاستبدال | استبدال new ArrayList<T>() بـ new LinkedList<T>() | نفس بقية الكود يعمل دون أي تعديل إضافي
```

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| صف أب مجرد + أصناف وارثة | `virtual ... = 0;` في الأب، `override` في الأبناء | عند الحاجة لواجهة موحدة لعدة تنفيذات مختلفة (مثل `List` هنا) |
| إعادة استخدام `getAsRef` | `get`/`set`/`operator[]` كلها تستدعي `getAsRef` داخليًا | لتفادي تكرار منطق التحقق من صحة الفهرس في أكثر من تابع |
| مضاعفة السعة (`capacity doubling`) | `actualNewCapacity = capacity * 2` | عند تصميم بنية بيانات ديناميكية الحجم مبنية على مصفوفة |
| مؤشرات `start`/`end` لقائمة مترابطة | حفظ طرفي القائمة لتفادي المرور الكامل | عندما نحتاج عمليات `push`/`pop` من الطرفين بكفاءة `O(1)` |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| فهرس خارج حدود القائمة (`out of range`) | إطلاق استثناء `out_of_range` | لمنع الوصول لذاكرة غير صالحة أو سلوك غير معرَّف (`undefined behavior`) |
| `pop` من قائمة فارغة | إطلاق استثناء `runtime_error` | لأنه لا يوجد عنصر فعلي لإزالته أو إعادته |
| امتلاء سعة `ArrayList` | استدعاء `expandData` قبل التخزين | لضمان وجود مساحة كافية قبل الكتابة في `dataPtr` |
| حذف كائن `LinkedList` بالكامل | حلقة `while` تحذف عقدة عقدة | لأن كل عقدة حُجزت بشكل مستقل بـ `new`، فلا يمكن تحريرها دفعة واحدة |

### الأفكار الرئيسية الشاملة

> **فكرة محورية:** الفرق الجوهري بين `ArrayList` و `LinkedList` ليس فقط في طريقة التخزين، بل في المقايضة (`trade-off`) بين سرعة الوصول العشوائي (`ArrayList` أفضل) وسرعة الإدراج/الحذف دون إزاحة عناصر (`LinkedList` أفضل نظريًا في المنتصف، ومتساوٍ تقريبًا في الطرفين هنا بسبب وجود `end`).

> **فكرة محورية:** استخدام `List<T>*` كنوع مؤشر مشترك يسمح لكود `main` بالتعامل مع أي نوع قائمة دون معرفة تفاصيلها الداخلية — وهذا هو الهدف الأساسي من `polymorphism` في البرمجة الغرضية التوجه.

---
## الجزء الثالث: أسئلة الاختيار من متعدد

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25%، سيناريو كود 35%، تطبيق 30%، تتبع خوارزمية 10%.

### السؤال 1 (سهل)
ما الذي يجعل الصف `List<T>` صفًا `abstract`؟
أ) استخدامه لـ `template`
ب) وجود تابع واحد على الأقل من نوع `pure virtual`
ج) وجود هادم `virtual`
د) استخدام `protected` مع الحقل `len`
**الإجابة الصحيحة: ب**
**التعليل:** وجود `= 0` في توقيع تابع (كما في `getAsRef`) يجعل الصف `abstract` تلقائيًا. الخيار أ خاطئ لأن `template` لا علاقة له بكون الصف `abstract`. الخيار ج خاطئ لأن الهادم `virtual` مهم للحذف الآمن لكنه لا يجعل الصف `abstract`. الخيار د خاطئ لأن `protected` محدد وصول عادي لا علاقة له بمفهوم `abstract`.

### السؤال 2 (متوسط)
ماذا يحدث إذا حاولنا تنفيذ `List<int> x;` مباشرة (وليس كمؤشر)؟
أ) يعمل الكود بشكل طبيعي وينشئ كائنًا فارغًا
ب) خطأ عند الترجمة (`compile error`) لأن `List` صف `abstract`
ج) خطأ فقط عند التشغيل (`runtime error`)
د) يعمل لكن كل التوابع تُعيد قيمًا افتراضية
**الإجابة الصحيحة: ب**
**التعليل:** لأن `List<T>` يحتوي توابع `pure virtual`، فمحاولة بناء كائن منه مباشرة تُكتشف عند الترجمة وتعطي خطأً واضحًا. الخيار أ وج ود جميعها خاطئة لأن المترجم يمنع هذا السلوك من الأساس ولا يصل الأمر لمرحلة التشغيل إطلاقًا.

### السؤال 3 (متوسط)
لماذا يعيد `getAsRef` قيمة من نوع `T&` بدلًا من `T`؟
أ) لتوفير الذاكرة فقط
ب) لأن `T` لا تدعم النسخ
ج) للسماح بالقراءة والتعديل معًا عبر `operator[]`
د) لأن `virtual` تتطلب دائمًا إعادة مرجع
**الإجابة الصحيحة: ج**
**التعليل:** إعادة `T&` تعني أن الناتج هو الخانة الحقيقية في الذاكرة، مما يسمح بكتابة `list[i] = value;`. الخيار أ غير دقيق كسبب رئيسي هنا. الخيار ب غير صحيح لأن `T` نوع عام قد يدعم النسخ بلا مشكلة. الخيار د خاطئ لأن `virtual` لا يفرض نوع الإرجاع.

### السؤال 4 (صعب)
في `ArrayList::push`، ما سبب استخدام `this->len` بدل الاكتفاء بـ `len` مباشرة رغم أن `len` موروث؟
أ) لأن `len` غير موجود أصلًا في `ArrayList`
ب) لتوضيح أن `len` حقل موروث من صف أب `template`، وهو أسلوب شائع لتفادي مشاكل البحث عن الأسماء في القوالب الوارثة
ج) لأن `this->` تجعل الكود أسرع في التنفيذ
د) لأنه إلزامي في كل الحالات عند استخدام `override`
**الإجابة الصحيحة: ب**
**التعليل:** عند الوراثة من صف `template` أب، يحتاج المترجم أحيانًا لتوضيح صريح (`this->`) للوصول لأعضاء الصف الأب المعتمدين على `T`. الخيار أ خاطئ لأن `len` موجود فعلًا في `List`. الخيار ج خاطئ لأنه لا علاقة له بالأداء. الخيار د خاطئ لأنه ليس إلزاميًا في كل الحالات بل في سياق قوالب الوراثة تحديدًا.

### السؤال 5 (متوسط)
ماذا يعيد الاستدعاء `expandData(5)` إذا كانت `capacity` الحالية تساوي `10`؟
أ) يوسّع السعة لتصبح `10`
ب) لا يفعل شيئًا لأن `5 <= 10`
ج) يوسّع السعة لتصبح `20`
د) يطلق استثناء
**الإجابة الصحيحة: ب**
**التعليل:** الشرط الأول في `expandData` هو `if (newCapacity <= capacity) return;`، وبما أن `5 <= 10` فإن التابع يعود فورًا دون أي تغيير. الخيارات أ وج ود جميعها تفترض متابعة التنفيذ رغم أن الشرط يوقفه من البداية.

### السؤال 6 (صعب)
إذا كانت `capacity` الحالية `0` واستدعينا `expandData(1)`، ما قيمة `actualNewCapacity` النهائية؟
أ) `0`
ب) `1`
ج) `2`
د) `-1`
**الإجابة الصحيحة: ج**
**التعليل:** بما أن `capacity == 0`، فإن `actualNewCapacity` تُحسب كـ `2` (الحالة الأولى في `ternary operator`)، وبما أن `newCapacity (=1)` ليست أكبر من `2`، فلا تغيير إضافي، فتبقى النتيجة `2`. الخيار أ يتجاهل حساب المضاعفة. الخيار ب يتجاهل قاعدة "ابدأ من 2". الخيار د غير منطقي أصلًا (سعة سالبة).

### السؤال 7 (سهل)
ما الفرق الأساسي بين `Singly Linked List` و `Doubly Linked List`؟
أ) `Doubly` تدعم التنقل للأمام وللخلف عبر مؤشرين (`next`, `prev`)
ب) `Singly` أسرع في كل العمليات دائمًا
ج) `Doubly` لا تحتاج مؤشر `next` إطلاقًا
د) لا يوجد فرق حقيقي بينهما
**الإجابة الصحيحة: أ**
**التعليل:** إضافة مؤشر `prev` في `Doubly Linked List` هو ما يسمح بالتنقل بالاتجاهين. الخيار ب غير دقيق كتعميم مطلق. الخيار ج خاطئ لأن `Doubly` تحتاج `next` و `prev` معًا. الخيار د خاطئ لوجود فرق واضح في البنية والقدرات.

### السؤال 8 (متوسط)
في هادم `LinkedList`، لماذا نكتب `start = start->next;` **قبل** `delete temp;`؟
أ) لا فرق في الترتيب إطلاقًا
ب) لتفادي الوصول لذاكرة محذوفة (`use-after-free`) إذا حاولنا القراءة من `start->next` بعد حذفه
ج) لأن `delete` يغيّر قيمة `start` تلقائيًا
د) لتسريع عملية الحذف
**الإجابة الصحيحة: ب**
**التعليل:** لو حذفنا `temp` أولًا ثم حاولنا الوصول لـ `temp->next` (أي `start->next` القديم)، لكنا نقرأ من ذاكرة محررة بالفعل، وهذا سلوك غير معرَّف (`undefined behavior`). الخيار أ خاطئ لأن الترتيب مهم جدًا هنا. الخيار ج غير صحيح لأن `delete` لا يغيّر أي متحول آخر تلقائيًا. الخيار د غير دقيق كسبب.

### السؤال 9 (صعب)
ماذا سيحدث لو استدعينا `(*alist)[600]` علمًا أن القائمة تحوي `500` عنصر فقط (فهارس من `0` إلى `499`)؟
أ) يعيد قيمة افتراضية بصمت
ب) يطلق استثناء `out_of_range` من داخل `getAsRef`
ج) يوسّع القائمة تلقائيًا حتى الفهرس `600`
د) يسبب دائمًا `segmentation fault` فورًا دون استثناء
**الإجابة الصحيحة: ب**
**التعليل:** `operator[]` يستدعي `getAsRef`، والذي يتحقق أولًا `if (index < 0 || index >= this->len) throw out_of_range(...)`. الخيار أ وج خاطئان لأن الكود لا يفعل ذلك أبدًا. الخيار د غير دقيق لأن الاستثناء يُطلق أولًا قبل أي وصول فعلي غير آمن للذاكرة.

### السؤال 10 (متوسط)
ما وظيفة `virtual` في الهادم `virtual ~List() {}`؟
أ) تسريع عملية الحذف
ب) ضمان استدعاء الهادم الصحيح للصف الابن الفعلي عند الحذف عبر مؤشر من نوع `List*`
ج) منع الوراثة من `List`
د) لا وظيفة فعلية له، مجرد أسلوب كتابة
**الإجابة الصحيحة: ب**
**التعليل:** بدون `virtual`، حذف كائن `ArrayList` أو `LinkedList` عبر `List*` قد يستدعي فقط هادم `List` ويتجاهل هادم الابن الفعلي، مما يسبب تسريب ذاكرة. الخيار أ غير صحيح كهدف أساسي. الخيار ج عكس الصحيح تمامًا. الخيار د خاطئ لأن له وظيفة حرجة في الأمان الذاكري.

### السؤال 11 (سهل)
أي التوابع التالية **ليس** `pure virtual` في الصف `List<T>`؟
أ) `get`
ب) `append`
ج) `length`
د) `pop`
**الإجابة الصحيحة: ج**
**التعليل:** `length()` لديه تنفيذ فعلي (`return len;`) وليس `= 0`، لذا فهو تابع عادي غير `pure virtual`. باقي الخيارات (أ، ب، د) جميعها معرَّفة بـ `= 0` في الكود الأصلي.

### السؤال 12 (متوسط)
ما الفرق العملي بين `override` و `overload` كما ورد في المحاضرة؟
أ) لا فرق، الكلمتان مترادفتان
ب) `override` يستبدل منطق تابع `virtual` موروث بالكامل، بينما `overload` يضيف نسخة جديدة بتوقيع مختلف
ج) `overload` تُستخدم فقط في `templates`
د) `override` لا يمكن استخدامها إلا مع `constructors`
**الإجابة الصحيحة: ب**
**التعليل:** هذا مطابق تمامًا لما ورد في شريحة المحاضرة عن الفرق بينهما. باقي الخيارات لا تعكس التعريف الصحيح المذكور في المحاضرة.

### السؤال 13 (صعب)
لماذا استخدام `set` استدعاءً لـ `getAsRef` بدلًا من إعادة كتابة التحقق من الفهرس مباشرة (في كل من `ArrayList` و `LinkedList`)؟
أ) لأن `set` لا يمكنها التحقق من الفهرس بنفسها
ب) لتفادي تكرار كود التحقق من صحة الفهرس (مبدأ `DRY`)
ج) لأن `getAsRef` أسرع من أي كود آخر
د) لإجبار المستخدم على استخدام `operator[]` فقط
**الإجابة الصحيحة: ب**
**التعليل:** إعادة استخدام `getAsRef` يمنع تكرار نفس منطق التحقق من الحدود في أكثر من مكان، وهذا تطبيق مباشر لمبدأ `DRY`. باقي الخيارات غير دقيقة كتفسيرات.

### السؤال 14 (متوسط)
في `main`، عبارة `List<int> *alist = new ArrayList<int>();` تُظهر أي مفهوم برمجي بشكل مباشر؟
أ) `overload`
ب) `polymorphism`
ج) `recursion`
د) `encapsulation` فقط
**الإجابة الصحيحة: ب**
**التعليل:** استخدام مؤشر من نوع الأب `List<int>*` للإشارة لكائن من نوع ابن `ArrayList<int>` هو المثال الكلاسيكي على `polymorphism`. الخيارات الأخرى غير مرتبطة مباشرة بهذا السطر تحديدًا.

### السؤال 15 (صعب)
ماذا يحدث تحديدًا عند استدعاء `alist->push(i)` حيث `alist` من نوع `List<int>*` ويشير فعليًا لكائن `ArrayList<int>`؟
أ) يُنفَّذ كود `List::push` لأنه النوع المعلن للمؤشر
ب) خطأ ترجمة لأن `push` غير معرَّف أصلًا في `List`
ج) يُنفَّذ كود `ArrayList::push` بفضل `virtual` و `dynamic dispatch`
د) يُختار التنفيذ عشوائيًا بين الصفين
**الإجابة الصحيحة: ج**
**التعليل:** بما أن `push` (المعرّف كـ `append`/`pop` من نوع `virtual` في الأب) `virtual`، فإن `C++` يحدد وقت التشغيل النوع الحقيقي للكائن (`ArrayList`) وينفّذ نسخته. الخيار أ يتجاهل مفهوم `dynamic dispatch`. الخيار ب غير صحيح لأن `push`/`append` جزء من عقد `List`. الخيار د غير منطقي، فالسلوك محدد وليس عشوائيًا.

### السؤال 16 (متوسط)
لماذا نحتاج مؤشر `end` منفصل في `LinkedList` رغم وجود `start`؟
أ) لأنه إلزامي في كل `struct`
ب) لتحقيق `push`/`pop` من نهاية القائمة بكفاءة `O(1)` دون المرور بكامل القائمة من `start`
ج) لتفادي استخدام `next`
د) لا حاجة فعلية له، ويمكن حذفه دون أي أثر
**الإجابة الصحيحة: ب**
**التعليل:** لولا `end`، لكان الوصول لآخر عنصر (لأجل `push`/`pop`) يتطلب المرور بكامل القائمة بدءًا من `start`، أي `O(n)` بدل `O(1)`. باقي الخيارات غير صحيحة أو غير دقيقة.

---
## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: ترجمة، منطقية، فحص إرجاع، dead code، سوء فهم.

### سؤال تصحيح 1 — نوع الخطأ: `logic`

**الكود (يحتوي خطأ):**
```cpp
void expandData(int newCapacity) {
    if (newCapacity >= capacity) return;  // BUG: wrong comparison direction
    int actualNewCapacity = (capacity == 0) ? 2 : capacity * 2;
    // ...
}
```
**اكتشف الخطأ:** الشرط معكوس؛ يجب أن نتوقف فقط إذا كانت السعة الجديدة **أصغر أو تساوي** السعة الحالية، وليس أكبر أو تساوي، وإلا فإن التابع سيعود فورًا في كل مرة تكون فيها السعة المطلوبة كافية بالفعل أو أكبر، مما يمنع التوسعة الفعلية عندما تكون ضرورية.

**التصحيح:**
```cpp
void expandData(int newCapacity) {
    if (newCapacity <= capacity) return;  // FIXED: correct comparison direction
    int actualNewCapacity = (capacity == 0) ? 2 : capacity * 2;
    // ...
}
```
**شرح الحل:**
1. الهدف من الشرط هو الخروج المبكر فقط عندما تكون السعة الحالية **كافية بالفعل**.
2. `<=` يعني "السعة الجديدة المطلوبة لا تتجاوز الحالية"، وهذا هو الشرط الصحيح للخروج المبكر.
3. عكس الاتجاه (`>=`) يمنع التوسعة بالضبط في الحالات التي نحتاجها فيها.

---

### سؤال تصحيح 2 — نوع الخطأ: `misconception`

**الكود (يحتوي خطأ):**
```cpp
class ArrayList : public List<T> {
private:
    T* dataPtr = nullptr;
    int capacity = 0;
    T& getAsRef(int index) {   // BUG: missing "override" and missing correct access level intent
        return dataPtr[index]; // BUG: no bounds checking at all
    }
```
**اكتشف الخطأ:** هناك خطآن: أولًا، عدم كتابة `override` (وإن لم يكن إلزاميًا) يفقدنا حماية المترجم من أخطاء التوقيع المحتملة؛ وثانيًا وهو الأخطر، غياب التحقق من صحة الفهرس (`bounds checking`) يعني أن الوصول لفهرس خارج النطاق سيؤدي لسلوك غير معرَّف بدلًا من استثناء واضح.

**التصحيح:**
```cpp
class ArrayList : public List<T> {
private:
    T* dataPtr = nullptr;
    int capacity = 0;
protected:
    T& getAsRef(int index) override {          // FIXED: added override keyword
        if (index < 0 || index >= this->len)    // FIXED: added bounds checking
            throw out_of_range("Index out of bounds");
        return dataPtr[index];
    }
```
**شرح الحل:**
1. إضافة `override` تجعل المترجم يتحقق من تطابق التوقيع مع تابع الأب `virtual`.
2. إضافة التحقق من الحدود يمنع الوصول لذاكرة غير صالحة.
3. نقل التابع لمنطقة `protected` (كما في التصميم الأصلي) يحافظ على تغليف (`encapsulation`) مناسب.

---

### سؤال تصحيح 3 — نوع الخطأ: `return_check`

**الكود (يحتوي خطأ):**
```cpp
T pop() override {
    T value = end->data;                  // BUG: reading data before checking if list is empty
    if (!end) throw runtime_error("Cannot pop from empty list");
    // ...
    return value;
}
```
**اكتشف الخطأ:** يتم قراءة `end->data` **قبل** التحقق من كون `end` تساوي `nullptr`. إذا كانت القائمة فارغة، فإن `end` تكون `nullptr`، والوصول لـ `end->data` عبر مؤشر `null` يسبب سلوكًا غير معرَّف (`undefined behavior`) أو `segmentation fault`، قبل أن تُنفَّذ عبارة `throw` أصلًا.

**التصحيح:**
```cpp
T pop() override {
    if (!end) throw runtime_error("Cannot pop from empty list"); // FIXED: check first
    T value = end->data;                                          // safe now
    // ...
    return value;
}
```
**شرح الحل:**
1. يجب أن يسبق التحقق من الحالات الحدّية (`edge cases`) أي عملية قراءة أو كتابة على البيانات.
2. التحقق `if (!end)` يضمن أن `end` ليست `nullptr` قبل استخدام `end->data`.
3. هذا نمط عام يُسمى `guard clause` ويجب تطبيقه دائمًا في بداية التوابع الحساسة.

---

### سؤال تصحيح 4 — نوع الخطأ: `off_by_one`

**الكود (يحتوي خطأ):**
```cpp
void push(T value) override {
    if (this->len > capacity) expandData(this->len + 1);  // BUG: wrong comparison, should be >=
    dataPtr[this->len++] = value;
}
```
**اكتشف الخطأ:** الشرط `this->len > capacity` خاطئ؛ يجب أن يكون `this->len >= capacity`، لأنه عندما يتساوى `len` مع `capacity`، فهذا يعني أن كل الخانات ممتلئة فعليًا (لا توجد خانة فارغة للفهرس `len`)، والتخزين المباشر في `dataPtr[this->len]` عندها سيكتب خارج حدود المصفوفة المخصصة فعليًا.

**التصحيح:**
```cpp
void push(T value) override {
    if (this->len >= capacity) expandData(this->len + 1); // FIXED: correct comparison
    dataPtr[this->len++] = value;
}
```
**شرح الحل:**
1. `capacity` يمثل عدد الخانات الكلي المتاح، والفهارس الصالحة هي `0` إلى `capacity - 1`.
2. عندما يتساوى `len` مع `capacity`، فإن الفهرس `len` (الذي سنكتب فيه القيمة الجديدة) يقع خارج المصفوفة الحالية.
3. لذلك يجب التوسعة **عند التساوي أيضًا** وليس فقط عند التجاوز.

---

### سؤال تصحيح 5 — نوع الخطأ: `dead_code`

**الكود (يحتوي خطأ):**
```cpp
T get(int index) override {
    if (index < 0 || index >= this->len)
        throw out_of_range("Index out of bounds");
    return dataPtr[index];
    cout << "Value retrieved" << endl;   // BUG: unreachable dead code after return
}
```
**اكتشف الخطأ:** السطر `cout << "Value retrieved" << endl;` موجود **بعد** عبارة `return`، مما يجعله كودًا ميتًا (`dead code`) لن يُنفَّذ أبدًا، لأن `return` تُنهي تنفيذ التابع فورًا وتعيد التحكم للمستدعي.

**التصحيح:**
```cpp
T get(int index) override {
    if (index < 0 || index >= this->len)
        throw out_of_range("Index out of bounds");
    cout << "Value retrieved" << endl;   // FIXED: moved before return, if logging is truly needed
    return dataPtr[index];
}
```
**شرح الحل:**
1. أي كود يوضع بعد `return` داخل نفس الكتلة (`block`) لا يمكن أن يُنفَّذ أبدًا.
2. المترجمات الحديثة عادة تصدر تحذيرًا (`warning`) لهذا النوع من الكود الميت.
3. إذا كان الهدف فعلًا طباعة رسالة، يجب نقلها قبل `return` مباشرة.

---
## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): إضافة تابع `insertAt` — fill_gaps

**السيناريو / المطلوب:**
أكمل تنفيذ تابع `insertAt(int index, T value)` في `ArrayList<T>` يقوم بإدراج عنصر في موقع محدد (وليس بالضرورة في النهاية)، مع إزاحة كل العناصر التي بعده خانة واحدة لليمين.

**المطلوب:**
1. أكمل الأجزاء الناقصة المشار إليها بـ `_______`.

```cpp
void insertAt(int index, T value) {
    if (index < 0 || index > this->len) throw out_of_range("Index out of bounds");
    if (this->len >= capacity) _______;                       // (1)
    for (int i = this->len; i > index; i--)
        dataPtr[i] = _______;                                  // (2)
    dataPtr[index] = value;
    this->len++;
}
```

**نموذج الحل:**
```cpp
void insertAt(int index, T value) {
    if (index < 0 || index > this->len) throw out_of_range("Index out of bounds");
    if (this->len >= capacity) expandData(this->len + 1);      // (1) grow if full
    for (int i = this->len; i > index; i--)
        dataPtr[i] = dataPtr[i - 1];                             // (2) shift elements right
    dataPtr[index] = value;
    this->len++;
}
```

---

### تمرين 2 (تمرين إضافي): إصلاح `moveIndex` غير الفعّالة — code_fix

**السيناريو / المطلوب:**
الكود التالي لـ `moveIndex` يعمل لكنه دائمًا يبدأ من `start`، حتى لو كان الفهرس المطلوب قريبًا من النهاية. الهدف اقتراح تحسين بسيط (اختياري ذكرته المحاضرة) يبدأ من `end` إذا كان الفهرس أقرب للنهاية.

**المطلوب:**
1. عدّل الكود ليختار نقطة البداية الأقرب (`start` أو نهاية القائمة) بناءً على مقارنة الفهرس بمنتصف الطول.

**نموذج الحل:**
```cpp
void moveIndex(int index) const {
    if (index < 0 || index >= this->len) throw out_of_range("Index out of bounds");
    if (index < this->len / 2) {           // closer to the start
        current = start;
        for (int i = 0; i < index; i++) current = current->next;
    } else {                                 // closer to the end
        current = end;
        for (int i = this->len - 1; i > index; i--) current = current->prev;
    }
}
```

---

### تمرين 3 (تمرين إضافي): تتبع تنفيذ `push` على `LinkedList` فارغة — scenario

**السيناريو / المطلوب:**
لدينا `LinkedList<int>` فارغة تمامًا (`start = end = nullptr`, `len = 0`). نُنفّذ `push(7)` ثم `push(9)`.

**المطلوب:**
1. صف حالة `start`, `end`, `len` بعد كل استدعاء `push`.

**نموذج الحل:**
- بعد `push(7)`: عقدة جديدة تحمل `7`؛ بما أن `start` كانت `nullptr`، فإن `start = end = newNode(7)`، و `len = 1`.
- بعد `push(9)`: `start` لا تتغيّر (تبقى تشير لعقدة `7`)؛ `end->next = newNode(9)`، `newNode(9)->prev = end (القديم)`، ثم `end = newNode(9)`، و `len = 2`.
- الحالة النهائية: القائمة `7 <-> 9`، مع `start` يشير لـ `7` و `end` يشير لـ `9`.

---

### تمرين 4 (تمرين إضافي): حساب `capacity` عبر عدة عمليات `push` — numerical_solve

**السيناريو / المطلوب:**
لدينا `ArrayList<int>` جديدة (`capacity = 0`, `len = 0`). نفّذ `push` تسع مرات متتالية (`len` تصل إلى `9`).

**المطلوب:**
1. احسب قيمة `capacity` بعد كل عملية توسعة (`expandData`) تمت خلال التسع عمليات.

**نموذج الحل:**
- `push` الأولى: `len(0) >= capacity(0)` → `expandData(1)` → `capacity` تصبح `2`.
- `push` الثالثة: `len(2) >= capacity(2)` → `expandData(3)` → `capacity` تصبح `4`.
- `push` الخامسة: `len(4) >= capacity(4)` → `expandData(5)` → `capacity` تصبح `8`.
- `push` التاسعة: `len(8) >= capacity(8)` → `expandData(9)` → `capacity` تصبح `16`.
- بعد تسع عمليات `push`: `len = 9`, `capacity = 16`.

---
## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: نظام حجز مقاعد طائرة — case_study

**السيناريو:**
شركة طيران تريد بنية بيانات لتخزين قائمة الركّاب المسجلين على رحلة معينة. عدد الركّاب معروف تقريبيًا مسبقًا (يتراوح بين 150 و 180)، والعملية الأكثر شيوعًا هي الوصول لراكب برقم مقعده مباشرة (مثل: "أرني بيانات الراكب في المقعد 45").

**المطلوب:**
1. أي صف تنصح باستخدامه: `ArrayList` أم `LinkedList`؟ برّر إجابتك.
2. ما تأثير معرفة العدد التقريبي للركاب مسبقًا على قرارك؟

**نموذج الحل:**
1. `ArrayList` هو الأنسب، لأن العملية الأكثر تكرارًا هي الوصول المباشر بالفهرس (`operator[]`)، وهذا `O(1)` في `ArrayList` مقابل `O(n)` في `LinkedList`.
2. معرفة العدد التقريبي مسبقًا تسمح بحجز `capacity` مناسبة منذ البداية (عبر توسعة مبكرة واحدة)، مما يقلل عدد عمليات `expandData` المكلفة أثناء التشغيل.

---

### تمرين 2: نظام قائمة انتظار طلبات مطعم — table_fill

**السيناريو:**
مطعم يريد إدارة قائمة انتظار (`waiting queue`) للطلبات، حيث تُضاف الطلبات الجديدة دائمًا في النهاية، وتُخدم وتُحذف الطلبات من البداية فقط (لا حاجة أبدًا للوصول لطلب في المنتصف بالفهرس).

**المطلوب:**
1. أكمل الجدول التالي بمقارنة مدى ملاءمة كل بنية لهذا السيناريو تحديدًا.

| المعيار | `ArrayList` | `LinkedList` |
| --- | --- | --- |
| الإضافة في النهاية | ؟ | ؟ |
| الحذف من البداية | ؟ | ؟ |
| الحاجة للوصول بالفهرس | ؟ | ؟ |

**نموذج الحل:**

| المعيار | `ArrayList` | `LinkedList` |
| --- | --- | --- |
| الإضافة في النهاية | جيدة، لكن قد تتطلب `expandData` أحيانًا | ممتازة دائمًا `O(1)` بفضل `end` |
| الحذف من البداية | ضعيفة: تتطلب إزاحة كل العناصر المتبقية `O(n)` | ممتازة `O(1)` بتحديث `start` فقط |
| الحاجة للوصول بالفهرس | غير مطلوبة أصلًا في هذا السيناريو | غير مطلوبة أصلًا في هذا السيناريو |

الخلاصة: `LinkedList` (بشكل خاص نوع يدعم الحذف من البداية بكفاءة) هي الأنسب هنا، لأن الميزة التي يتفوق فيها `ArrayList` (الوصول بالفهرس) غير مطلوبة أصلًا في هذا السيناريو.

---

### تمرين 3: تصميم نظام تحرير نصوص (Undo History) — written_analysis

**السيناريو:**
نظام تحرير نصوص يحتاج لتخزين سجل التعديلات (`undo history`) بحيث تُضاف كل عملية تعديل جديدة في النهاية، وقد تُحذف عمليات من المنتصف أحيانًا (عند دمج تعديلات متتالية)، لكن نادرًا ما نحتاج الوصول لتعديل بفهرس محدد مباشرة.

**المطلوب:**
1. اكتب تحليلًا من 3-4 جمل يناقش أي بنية (أو مزيج) قد تكون الأنسب، مع الأخذ بعين الاعتبار أن الحذف من المنتصف يحدث أحيانًا.

**نموذج الحل:**
بما أن الحذف من المنتصف يحدث أحيانًا (وليس نادرًا جدًا)، فإن `LinkedList` تصبح خيارًا جذابًا لأن حذف عقدة من المنتصف (بعد الوصول إليها) لا يتطلب إزاحة بقية العناصر كما في `ArrayList`. أما ندرة الحاجة للوصول بالفهرس المباشر فتقلل من أهمية نقطة الضعف الرئيسية لـ `LinkedList` (`O(n)` للوصول العشوائي). لذلك، `LinkedList` أقرب للخيار الأنسب هنا، خصوصًا إذا كان الوصول للعقدة المراد حذفها يتم غالبًا عبر مؤشر محفوظ مسبقًا (وليس فهرسًا رقميًا) وقت إنشاء التعديل، مما يجعل الحذف فعليًا `O(1)`.

---
## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تتبع `push` على `ArrayList<int>` فارغة

**المدخل:**
```cpp
List<int>* list = new ArrayList<int>();
list->push(10);
list->push(20);
list->push(30);
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `push(10)` | ؟ |
| 2 | `push(20)` | ؟ |
| 3 | `push(30)` | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `push(10)`: `len(0)>=capacity(0)` → `expandData(1)` → `capacity=2` | `dataPtr=[10]`, `len=1`, `capacity=2` |
| 2 | `push(20)`: `len(1)<capacity(2)` لا توسعة | `dataPtr=[10,20]`, `len=2`, `capacity=2` |
| 3 | `push(30)`: `len(2)>=capacity(2)` → `expandData(3)` → `capacity=4` | `dataPtr=[10,20,30]`, `len=3`, `capacity=4` |

**النتيجة:** `dataPtr = [10, 20, 30]`, `len = 3`, `capacity = 4`

---

### تمرين تتبع 2: تتبع `pop` مرتين على `LinkedList<int>`

**المدخل:**
```cpp
List<int>* list = new LinkedList<int>();
list->push(1); list->push(2); list->push(3);  // list: 1 <-> 2 <-> 3
list->pop();
list->pop();
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | الحالة الابتدائية بعد 3 `push` | ؟ |
| 2 | `pop()` الأولى | ؟ |
| 3 | `pop()` الثانية | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | بعد 3 `push` | `start`→1, `end`→3, `len=3`، القائمة: `1<->2<->3` |
| 2 | `pop()`: `start != end`، فـ `end=end->prev` (يصبح يشير لـ2)، `end->next=nullptr`، حذف عقدة 3 | القائمة: `1<->2`, `len=2`, أعيدت القيمة `3` |
| 3 | `pop()`: `start != end`، فـ `end=end->prev` (يصبح يشير لـ1)، `end->next=nullptr`، حذف عقدة 2 | القائمة: `1`, `len=1`, أعيدت القيمة `2` |

**النتيجة:** القائمة النهائية تحتوي عقدة واحدة فقط بقيمة `1`، و `len = 1`.

---

### تمرين تتبع 3: تتبع الوصول بالفهرس `[i]` على `ArrayList` مقابل `LinkedList`

**المدخل:**
```cpp
// Both lists already contain: [100, 200, 300, 400, 500]
int a = (*alist)[3];
int b = (*llist)[3];
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `(*alist)[3]` عبر `ArrayList` | ؟ |
| 2 | `(*llist)[3]` عبر `LinkedList` | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `(*alist)[3]` → `getAsRef(3)` → `return dataPtr[3];` وصول مباشر فوري | `a = 400` |
| 2 | `(*llist)[3]` → `getAsRef(3)` → `moveIndex(3)`: `current=start`, ثم `current=current->next` أربع مرات (3 مرات فعليًا للوصول للفهرس 3) → `return current->data;` | `b = 400` |

**النتيجة:** كلاهما ينتج نفس القيمة `400`، لكن `ArrayList` وصل مباشرة (`O(1)`) بينما `LinkedList` احتاج المرور تسلسليًا عبر 3 عقد (`O(n)`).

---
## الجزء الرابع: بطاقات سؤال وجواب

**Q1:** ما الفرق بين `new` و `new[]` في `C++` من ناحية الحذف المطلوب؟
A: `new` يُحذف بـ `delete`، بينما ما خُصِّص بـ `new[]` (مثل مصفوفة) يجب حذفه بـ `delete[]`.

**Q2:** ما معنى `pure virtual`؟
A: تابع `virtual` بدون تنفيذ في الصف الأب (`= 0`)، يُلزم كل صف وارث بتوفير تنفيذ فعلي له.

**Q3:** لماذا `List<T>` صف `abstract`؟
A: لأنه يحتوي عدة توابع `pure virtual` (مثل `get`, `set`, `getAsRef`) دون أي تنفيذ فعلي لها.

**Q4:** ما دور الحقل `capacity` في `ArrayList`؟
A: يمثل السعة الكلية المحجوزة فعليًا في المصفوفة، وقد تكون أكبر من عدد العناصر الفعلي `len`.

**Q5:** ما الفرق بين `override` و `overload`؟
A: `override` يستبدل منطق تابع `virtual` موروث بالكامل بنفس التوقيع، بينما `overload` يضيف نسخة جديدة بتوقيع مختلف.

**Q6:** لماذا نستخدم `T&` بدلًا من `T` في `getAsRef`؟
A: للسماح بإرجاع مرجع حقيقي للعنصر يسمح بالقراءة والتعديل معًا، وليس نسخة مؤقتة منه.

**Q7:** ما الفرق بين `Singly` و `Doubly Linked List`؟
A: `Doubly` تملك مؤشر `prev` إضافيًا يسمح بالتنقل للخلف، بينما `Singly` تدعم التنقل للأمام فقط.

**Q8:** لماذا نحتاج مؤشر `end` في `LinkedList` رغم وجود `start`؟
A: للسماح بعمليات `push`/`pop` من نهاية القائمة بكفاءة `O(1)` دون المرور بكامل القائمة.

**Q9:** ماذا يحدث عند استدعاء `pop()` على قائمة فارغة في كلا الصفين؟
A: يُطلق استثناء `runtime_error` يوضح أن القائمة فارغة، بدلًا من محاولة الوصول لذاكرة غير صالحة.

**Q10:** لماذا يُعتبر الهادم `virtual` في صف أب مصمَّم للوراثة ممارسة جيدة؟
A: لضمان استدعاء الهادم الصحيح للصف الابن الفعلي عند حذف كائن عبر مؤشر من نوع الصف الأب.

**Q11:** ما تعقيد الوصول بالفهرس (`operator[]`) في `ArrayList` مقارنة بـ `LinkedList`؟
A: `O(1)` في `ArrayList` (وصول مباشر)، مقابل `O(n)` في `LinkedList` (مرور تسلسلي عبر العقد).

**Q12:** كيف يُنشئ `expandData` مصفوفة جديدة أكبر؟
A: يحسب سعة جديدة (غالبًا ضعف السعة الحالية)، يحجز مصفوفة بهذا الحجم، ينسخ العناصر القديمة إليها، ثم يحذف المصفوفة القديمة.

---
## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

```cpp
// ===== Full reference implementation: List, ArrayList, LinkedList =====
#include <iostream>
#include <stdexcept>
using namespace std;

// ---------- Abstract base class ----------
template <typename T>
class List {
protected:
    int len = 0;
    virtual T& getAsRef(int index) = 0;

public:
    virtual ~List() {}
    virtual T get(int index) = 0;
    virtual void set(int index, T value) = 0;
    virtual void push(T value) = 0;   // referred to as "append" in the lecture text
    virtual T pop() = 0;
    T& operator[](int index) { return getAsRef(index); }
    int length() const { return len; }
};

// ---------- ArrayList implementation ----------
template <typename T>
class ArrayList : public List<T> {
private:
    T* dataPtr = nullptr;
    int capacity = 0;

    void expandData(int newCapacity) {
        if (newCapacity <= capacity) return;
        int actualNewCapacity = (capacity == 0) ? 2 : capacity * 2;
        if (newCapacity > actualNewCapacity) actualNewCapacity = newCapacity;
        T* newData = new T[actualNewCapacity]();
        for (int i = 0; i < this->len; i++) newData[i] = dataPtr[i];
        delete[] dataPtr;
        dataPtr = newData;
        capacity = actualNewCapacity;
    }

protected:
    T& getAsRef(int index) override {
        if (index < 0 || index >= this->len) throw out_of_range("Index out of bounds");
        return dataPtr[index];
    }

public:
    ArrayList() : dataPtr(nullptr), capacity(0) { this->len = 0; }
    ~ArrayList() { delete[] dataPtr; }

    T get(int index) override {
        if (index < 0 || index >= this->len) throw out_of_range("Index out of bounds");
        return dataPtr[index];
    }

    void set(int index, T value) override { getAsRef(index) = value; }

    void push(T value) override {
        if (this->len >= capacity) expandData(this->len + 1);
        dataPtr[this->len++] = value;
    }

    T pop() override {
        if (this->len == 0) throw runtime_error("Empty list");
        return dataPtr[--this->len];
    }
};

// ---------- Node definition for LinkedList ----------
template <typename T>
struct LinkedListItem {
    T data;
    LinkedListItem* next;
    LinkedListItem* prev;
};

// ---------- LinkedList implementation ----------
template <typename T>
class LinkedList : public List<T> {
private:
    LinkedListItem<T>* start = nullptr;
    LinkedListItem<T>* end = nullptr;
    mutable LinkedListItem<T>* current = nullptr;

    void moveIndex(int index) const {
        if (index < 0 || index >= this->len) throw out_of_range("Index out of bounds");
        current = start;
        for (int i = 0; i < index; i++) current = current->next;
    }

protected:
    T& getAsRef(int index) override {
        moveIndex(index);
        return current->data;
    }

public:
    LinkedList() : start(nullptr), end(nullptr), current(nullptr) { this->len = 0; }

    ~LinkedList() {
        while (start) {
            LinkedListItem<T>* temp = start;
            start = start->next;
            delete temp;
        }
    }

    T get(int index) override { return getAsRef(index); }
    void set(int index, T value) override { getAsRef(index) = value; }

    void push(T value) override {
        LinkedListItem<T>* newNode = new LinkedListItem<T>{value, nullptr, nullptr};
        if (!start) {
            start = end = newNode;
        } else {
            end->next = newNode;
            newNode->prev = end;
            end = newNode;
        }
        this->len++;
    }

    T pop() override {
        if (!end) throw runtime_error("Cannot pop from empty list");
        T value = end->data;
        LinkedListItem<T>* toDelete = end;
        if (start == end) {
            start = end = nullptr;
        } else {
            end = end->prev;
            end->next = nullptr;
        }
        delete toDelete;
        this->len--;
        return value;
    }
};

// ---------- Demonstration in main ----------
int main() {
    List<int> *alist = new ArrayList<int>();
    List<int> *llist = new LinkedList<int>();

    for (int i = 0; i < 500; i++) {
        alist->push(i);
        llist->push(i);
    }

    for (int i = 10; i < 20; i++) cout << (*llist)[i] << "\t";
    cout << endl;

    for (int i = 10; i < 20; i++) cout << (*alist)[i] << "\t";
    cout << endl;

    delete alist;
    delete llist;
    return 0;
}
```

> #### ملاحظة:
> أُضيفت في هذا المرجع الشامل بعض التفاصيل غير الموجودة صراحةً في شرائح المحاضرة (مثل `#include`, `mutable` على `current`، و `delete alist;`/`delete llist;` في نهاية `main`) لضمان أن الكود قابل للترجمة والتشغيل فعليًا. هذه الإضافات موسومة هنا صراحةً كـ **(شرح زيادة للفهم)**.

---
## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: ما المقصود بـ `pure virtual function` وكيف تكتب واحدًا في `C++`؟
**نموذج الإجابة:**
1. التعريف: تابع `virtual` لا يمتلك تنفيذًا في الصف الذي عُرِّف فيه، ويُلزم كل صف وارث فعليًا بتوفير تنفيذ له.
2. المكونات/الشروط: يُكتب بإضافة `= 0` بعد توقيع التابع، مثل: `virtual T get(int index) = 0;`.
3. مثال: التابع `getAsRef` في الصف `List<T>`.
4. متى نستخدم: عندما نريد فرض عقد (`contract`) على كل الأصناف الوارثة دون تحديد طريقة تنفيذ موحدة.

### سؤال 2: اشرح مفهوم `abstract class` وكيف ترتبط بـ `pure virtual functions`.
**نموذج الإجابة:**
1. التعريف: صف يحتوي تابعًا واحدًا على الأقل من نوع `pure virtual`، ولا يمكن إنشاء كائن منه مباشرة.
2. المكونات/الشروط: وجود `= 0` في توقيع تابع واحد على الأقل كافٍ لتصنيف الصف كـ `abstract`.
3. مثال: الصف `List<T>` بسبب توابع مثل `get`, `set`, `getAsRef` المعرَّفة كـ `pure virtual`.
4. متى نستخدم: عند تصميم واجهة مشتركة (`interface`) لعدة تنفيذات مختلفة، كما في `List` مقابل `ArrayList`/`LinkedList`.

### سؤال 3: ما الفرق بين الربط الساكن (`static binding`) والربط الديناميكي (`dynamic binding`)؟
**نموذج الإجابة:**
1. التعريف: `static binding` يحدد أي نسخة من التابع تُنفَّذ وقت الترجمة، بينما `dynamic binding` يحددها وقت التشغيل.
2. المكونات/الشروط: `dynamic binding` يتطلب أن يكون التابع معرَّفًا بـ `virtual`، والاستدعاء يتم عبر مؤشر أو مرجع من نوع الصف الأب.
3. مثال: استدعاء `alist->push(i)` حيث `alist` من نوع `List<int>*` يشير فعليًا لـ `ArrayList<int>`.
4. متى نستخدم: `dynamic binding` (عبر `virtual`) عندما نريد تحقيق `polymorphism` حقيقي بين عدة أصناف وارثة.

### سؤال 4: صف كيف تعمل عملية توسعة السعة (`capacity doubling`) في `ArrayList`، ولماذا تُضاعَف السعة بدل زيادتها بمقدار ثابت؟
**نموذج الإجابة:**
1. التعريف: عند امتلاء المصفوفة الحالية، يُنشأ مصفوفة جديدة بسعة أكبر (عادة ضعف السعة الحالية)، تُنسخ إليها العناصر القديمة، ثم تُحذف القديمة.
2. المكونات/الشروط: يتطلب حساب `actualNewCapacity`، حجز مصفوفة جديدة، حلقة نسخ، ثم `delete[]` للقديمة.
3. مثال: `expandData` في الصف `ArrayList<T>`.
4. متى نستخدم: مضاعفة السعة تقلل عدد عمليات إعادة التخصيص الإجمالية مقارنة بزيادة ثابتة، مما يحسّن الأداء المتوسط (`amortized O(1)` لعملية `push`).

### سؤال 5: قارن بين تعقيد الوقت (`time complexity`) لعمليتي `push` و `operator[]` في `ArrayList` مقابل `LinkedList`.
**نموذج الإجابة:**
1. التعريف: تعقيد الوقت يقيس كيف يزداد زمن تنفيذ عملية مع زيادة حجم البيانات.
2. المكونات/الشروط: `push` في كلا الصفين تقريبًا `O(1)` مُطفأ (`amortized`)؛ `operator[]` هو `O(1)` في `ArrayList` و `O(n)` في `LinkedList`.
3. مثال: تنفيذ `(*alist)[i]` مقابل `(*llist)[i]` كما ورد في `main`.
4. متى نستخدم: عند الحاجة لوصول عشوائي متكرر بالفهرس، `ArrayList` أفضل؛ عند الحاجة لإدراج/حذف متكرر في المنتصف مع مؤشرات محفوظة، `LinkedList` أفضل.

### سؤال 6: ما دور الهادم `virtual` في صف أب، وماذا يحدث إذا حُذف؟
**نموذج الإجابة:**
1. التعريف: هادم `virtual` يضمن استدعاء الهادم الصحيح للصف الابن الفعلي عند الحذف عبر مؤشر من نوع الصف الأب.
2. المكونات/الشروط: يُكتب كـ `virtual ~List() {}` في الصف الأب.
3. مثال: `delete alist;` حيث `alist` من نوع `List<int>*` يشير فعليًا لـ `ArrayList<int>`.
4. متى نستخدم: دائمًا في أي صف مصمَّم ليكون صفًا أبًا يمكن الوراثة منه والتعامل معه عبر مؤشرات من نوعه.

### سؤال 7: اشرح لماذا تحتاج القائمة المترابطة (`LinkedList`) هادمًا مختلفًا كليًا عن `ArrayList`.
**نموذج الإجابة:**
1. التعريف: `ArrayList` يخزن كل عناصره في كتلة ذاكرة متجاورة واحدة، بينما `LinkedList` يخزن كل عنصر في عقدة مستقلة حُجزت بـ `new` منفصلة.
2. المكونات/الشروط: هادم `ArrayList` يستخدم `delete[] dataPtr;` (تحرير دفعة واحدة)، بينما هادم `LinkedList` يستخدم حلقة `while` تحذف كل عقدة على حدة.
3. مثال: مقارنة `~ArrayList()` و `~LinkedList()`.
4. متى نستخدم: عند تصميم أي بنية بيانات، يجب أن يتطابق أسلوب الحذف في الهادم مع أسلوب الحجز الفعلي للذاكرة.

### سؤال 8: ما الفائدة العملية من إعادة استخدام `getAsRef` داخل `get`, `set`, `operator[]`؟
**نموذج الإجابة:**
1. التعريف: `getAsRef` تابع مركزي يعيد مرجعًا للعنصر بعد التحقق من صحة الفهرس، ويُستدعى من عدة توابع أخرى.
2. المكونات/الشروط: كل من `set` و `operator[]` (وأحيانًا `get`) يستدعون `getAsRef` بدل إعادة كتابة منطق التحقق من الحدود.
3. مثال: `void set(int index, T value) override { getAsRef(index) = value; }`.
4. متى نستخدم: هذا مبدأ عام (`DRY`) يجب تطبيقه كلما تكرر نفس المنطق (كالتحقق من الحدود) في أكثر من تابع.

---
## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح لماذا الصف `List<T>` هو `abstract class`.
- [ ] أفهم الفرق بين `pure virtual` (`= 0`) و `virtual` العادي.
- [ ] أستطيع كتابة `override` بشكل صحيح وأشرح لماذا هي مفيدة رغم عدم إلزاميتها.
- [ ] أعرف الفرق الدقيق بين `override` و `overload`.
- [ ] أفهم لماذا يعيد `getAsRef` قيمة `T&` وليس `T`.
- [ ] أستطيع شرح خوارزمية `expandData` خطوة بخطوة (بما فيها حالة أول استدعاء عند `capacity == 0`).
- [ ] أفهم الفرق بين `capacity` و `len` في `ArrayList`.
- [ ] أستطيع تمييز أنواع القوائم المترابطة الثلاثة (`Singly`, `Doubly`, `Circular`).
- [ ] أفهم لماذا يحتاج `LinkedList` هادمًا يحذف كل عقدة على حدة بعكس `ArrayList`.
- [ ] أستطيع تتبع تنفيذ `push` و `pop` يدويًا على كلا الصفين.
- [ ] أفهم مفهوم `polymorphism` من خلال مثال `List<int>* p = new ArrayList<int>();`.
- [ ] أعرف تعقيد الوقت (`time complexity`) لعملية `operator[]` في كل من `ArrayList` و `LinkedList`.

---
## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| المحاضرة 10 (هذه المحاضرة) | محاضرات `templates` السابقة | `List<T>`, `ArrayList<T>`, `LinkedList<T>` كلها تعتمد على `template <typename T>` |
| المحاضرة 10 | محاضرات `pointers`/`dynamic memory` السابقة | `new`, `delete`, `delete[]`, `T*` تُستخدم بكثافة في `ArrayList` و `LinkedList` |
| المحاضرة 10 | محاضرات `structs` السابقة | `LinkedListItem<T>` معرَّف كـ `struct` |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| `abstract class` | تابع واحد `pure virtual (= 0)` على الأقل يكفي لجعل الصف `abstract` |
| `virtual` | يفعّل `dynamic dispatch` عند الاستدعاء عبر مؤشر/مرجع الصف الأب |
| `override` | اختيارية لكنها تكشف أخطاء التوقيع مبكرًا عند الترجمة |
| `ArrayList` | تخزين متجاور، وصول `O(1)` بالفهرس، توسعة بمضاعفة السعة |
| `LinkedList` | تخزين عبر عقد منفصلة، وصول `O(n)` بالفهرس، `push`/`pop` بالطرفين `O(1)` بفضل `start`/`end` |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `= 0` | تحويل تابع `virtual` إلى `pure virtual` | `List<T>` |
| `T&` | إعادة مرجع بدل نسخة | `getAsRef` |
| `dataPtr` | مؤشر المصفوفة الداخلية | `ArrayList<T>` |
| `start`/`end`/`current` | مؤشرات إدارة العقد | `LinkedList<T>` |
| `this->len` | الوصول الصريح لحقل موروث من صف `template` أب | `ArrayList`, `LinkedList` |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | أي صف يحتوي `pure virtual` واحدًا على الأقل يصبح `abstract` ولا يمكن بناء كائن منه مباشرة |
| 2 | ضع `virtual` دائمًا على هادم أي صف مصمَّم ليكون صفًا أبًا |
| 3 | استخدم `T&` (وليس `T`) عندما تريد السماح بالتعديل المباشر على عنصر داخلي |
| 4 | احذف بـ `delete[]` كل ما خُصِّص بـ `new T[]`، واحذف عقدة عقدة كل ما خُصِّص بعدة استدعاءات `new` منفصلة |
| 5 | `override` غير إلزامية لكنها ممارسة جيدة تكشف أخطاء التوقيع مبكرًا |

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, full_code, theory, checklist, cheat_sheet
mcq_count: 16
code_blocks: 24
-->

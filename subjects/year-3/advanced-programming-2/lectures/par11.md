# المحاضرة 11 — Data Analysis Project (مشاريع تحليل البيانات)

> **المادة:** البرمجة المتقدمة 2 (القسم النظري) | **الموضوع:** رسم البيانات، المشي العشوائي، رمي النرد، قراءة CSV وJSON، وخرائط السكان — Python Crash Course ch15–16

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تعلّمك كيف تولّد بيانات برمجياً وترسمها بصرياً باستخدام `matplotlib` و`pygal`، وكيف تقرأ بيانات حقيقية من ملفات `CSV` و`JSON` وتعرضها على مخططات ورسومات بيانية.

### 🎯 ستتعلم
- **`RandomWalk` Class** — بناء كلاس يُنشئ مسارات عشوائية ثنائية الأبعاد ويرسمها بألوان متدرجة
- **Rolling Dice with `pygal`** — محاكاة رمي النرد وبناء `histogram` يُثبت التوزيع الاحتمالي
- **Downloading Data — CSV** — قراءة ملفات الطقس ورسم درجات الحرارة عبر الزمن مع التواريخ
- **Mapping Global Data — JSON** — تحميل بيانات السكان وعرضها على خريطة عالمية تفاعلية

### 📚 المتطلبات السابقة
- **Classes & OOP** — المحاضرة تبني كلاس `RandomWalk` وكلاس `Die` من الصفر
- **Lists & Loops** — كل البيانات تُخزَّن في قوائم وتُعالَج بحلقات `for`
- **`matplotlib` أساسيات** — استُخدمت في محاضرات سابقة، هنا نعمّق الاستخدام

### 💡 الأفكار الرئيسية

المحاضرة تنقسم لثلاثة مشاريع حقيقية، كلّ واحد يُعلّمك شيئاً مختلفاً.

**المشروع الأول — المشي العشوائي:** تبني كلاس `RandomWalk` يحاكي حركة جزيء في الماء — يختار كل خطوة اتجاهاً عشوائياً (يسار/يمين، أعلى/أسفل) ومسافة عشوائية. الجميل في الأمر أنك بعد 5000 خطوة تحصل على مسارات بصرية مذهلة عند رسمها بـ`plt.scatter` مع ألوان متدرجة. واحدة من أهم النقاط: لازم تتجاهل الخطوات التي تبقى في نفس المكان (`x_step == 0 and y_step == 0`).

**المشروع الثاني — رمي النرد:** تبني كلاس `Die` يُحاكي نرداً بـ N وجه، ثم ترمي 1000 مرة وتحسب تكرار كل نتيجة. الناتج `histogram` يُثبت مبدأً رياضياً: النرد العادل يُعطي توزيعاً منتظماً، أما مجموع نردتين فيُعطي توزيعاً جرسياً (bell curve) يتمحور حول الوسط. المكتبة المستخدمة هنا هي `pygal` لا `matplotlib`.

**المشروع الثالث — البيانات الحقيقية:** تتعلم قراءة ملفات `CSV` (بيانات طقس Sitka Alaska) و`JSON` (بيانات سكان العالم). الأهم هنا: تحويل التواريخ النصية لكائنات `datetime` باستخدام `strptime`، والتعامل مع أخطاء التحويل (مثل `int(float(...))` لأن بعض الأرقام تحتوي نقطة عشرية). في النهاية ترسم خريطة عالمية تفاعلية بـ`pygal` تلوّن كل دولة حسب عدد سكانها.

### 🔗 كيف تتصل هذه المحاضرة بالمحاضرات الأخرى؟
- **السابقة:** محاضرات `matplotlib` الأساسية علّمتك `plt.plot` و`plt.scatter` ← الآن نستخدمها في سياق مشاريع حقيقية
- **القادمة:** هذه المهارات (قراءة CSV/JSON + الرسم) هي أساس Machine Learning مع `scikit-learn`

### ⚠️ الأخطاء الشائعة الواجب تجنبها

#### الفهم الخاطئ ❌:
نسيان `int(float(...))` عند تحويل القيم من JSON — لأن بعض الأرقام مثل `"1127437398.85751"` لا يمكن تحويلها مباشرة لـ`int`.

#### الفهم الصحيح ✅:
دائماً استخدم `int(float(value))` عند قراءة الأرقام من JSON لتجنّب `ValueError`.

#### الفهم الخاطئ ❌:
استخدام `plt.plot` مع المشي العشوائي — ينتج خطوط تربط النقاط وتصبح الصورة فوضوية.

#### الفهم الصحيح ✅:
استخدم `plt.scatter` مع `c=rw.y_values` أو `c=point_numbers` لتلوين كل نقطة حسب موقعها، فتبدو جميلة ومفهومة.

### لما تحتاج هذا في الامتحان
الأسئلة المتوقعة: كتابة/إكمال كود كلاس `RandomWalk`، شرح سبب `if x_step == 0 and y_step == 0: continue`، الفرق بين `plt.plot` و`plt.scatter`، كتابة كود قراءة CSV مع تحويل التواريخ، وشرح سبب `int(float(...))`. ركّز على `fill_walk()` كاملة وعلى كيفية حساب `frequencies` في رمي النرد.

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

---

### 1. المشروع الأول: المشي العشوائي (`Random Walk`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 📍 أين نحن الآن؟
نبدأ المشروع الأول من المحاضرة: بناء نظام يُحاكي حركة عشوائية ثنائية الأبعاد ويرسمها.

#### 💡 الفكرة الأساسية
**`RandomWalk` هو كلاس يُنشئ قائمتين (`x_values`, `y_values`) تحتويان إحداثيات النقاط في مسار عشوائي، ثم `matplotlib` يرسم هذه النقاط.**

#### 📖 الشرح

المشي العشوائي (`Random Walk`) هو نمط شهير في الرياضيات والفيزياء — يصف حركة جزيء في سائل، أو تغيّر سعر سهم، أو حركة حيوان يبحث عن طعام. الفكرة بسيطة: في كل خطوة، اختر اتجاهاً وبُعداً عشوائياً.

في Python، نُعبّر عن هذا بكلاس `RandomWalk` له دالة `fill_walk()` تملأ قائمتي `x_values` و`y_values` بالإحداثيات. كل خطوة تُحسب كالتالي: اختر اتجاهاً (`+1` أو `-1`) واضرب بمسافة (`0` إلى `4`)، والحاصل هو `x_step` و`y_step`. ثم أضف الخطوة للإحداثي الأخير.

💡 **التشبيه:**
> تخيّل إنك تقف وسط مدينة وتُقلّب عملة: صورة → تمشي خطوة للأمام، نقش → تدور 90 درجة. المشي العشوائي هو مسارك بعد 5000 خطوة.
> **وجه الشبه:** `x_direction`/`y_direction` = نتيجة العملة، `x_distance`/`y_distance` = عدد الخطوات.

---

### 1.1. كلاس `RandomWalk` — البناء والتهيئة

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**نُهيّئ الكلاس بعدد النقاط المطلوبة وقائمتين تبدآن من الإحداثي (0,0).**

#### 💻 الكود

```python
from random import choice

class RandomWalk():
    """A class to generate random walks."""

    def __init__(self, num_points=5000):
        """Initialize attributes of a walk."""
        self.num_points = num_points
        # All walks start at (0, 0)
        self.x_values = [0]
        self.y_values = [0]
```

#### شرح كل سطر:
1. `from random import choice` → نستورد دالة `choice` التي تختار عنصراً عشوائياً من قائمة
2. `class RandomWalk():` → تعريف الكلاس — لا يرث من شيء هنا
3. `def __init__(self, num_points=5000):` → القيمة الافتراضية 5000 نقطة (يمكن تغييرها)
4. `self.num_points = num_points` → نحفظ العدد كـ attribute للاستخدام لاحقاً في `fill_walk`
5. `self.x_values = [0]` → نبدأ من x=0 (النقطة الأولى في المسار هي (0,0))
6. `self.y_values = [0]` → نبدأ من y=0

#### 📖 ماذا يفعل هذا الكود ولماذا؟

`__init__` يُهيّئ حالة الكلاس فقط — لا يحسب المسار بعد. المسار يُحسب لاحقاً في `fill_walk()`. هذا الفصل بين "التهيئة" و"الحساب" يُسهّل إنشاء مسارات متعددة بنفس الكلاس.

ملاحظة: في النسخة الأولى `num_points=10` (للاختبار)، ثم تُغيَّر لـ`5000` للحصول على مسار بصري جميل.

#### 🎯 الملخص السريع
- `__init__` يُهيّئ العداد والقائمتين فقط
- المسار يبدأ من (0, 0)
- العدد الافتراضي 5000 نقطة ينتج رسماً جميلاً

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> from random import choice
> class RandomWalk():
>     """A class to generate random walks."""
>     def __init__(self, num_points=5000):
>         """Initialize attributes of a walk."""
>         self.num_points = num_points
>         # All walks start at (0, 0).
>         self.x_values = [0]
>         self.y_values = [0]
> ```

**ملاحظة على التغطية:**
- ✓ تم شرح: بنية الكلاس، معنى كل attribute، سبب البداية من (0,0)
- ℹ️ إضافة من الدليل: التشبيه اليومي، توضيح سبب تغيير num_points من 10 إلى 5000

</details>

---

### 1.2. دالة `fill_walk()` — ملء المسار

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`fill_walk()` تُكرّر حتى تصل لعدد النقاط المطلوب، وفي كل دورة تحسب خطوة عشوائية وتُضيفها للإحداثيات.**

#### 💻 الكود

```python
def fill_walk(self):
    """Calculate all the points in the walk."""
    # Keep taking steps until the walk reaches the desired length
    while len(self.x_values) < self.num_points:
        # Decide which direction to go
        x_direction = choice([1, -1])        # +1 = right, -1 = left
        x_distance = choice([0, 1, 2, 3, 4]) # how far to go
        x_step = x_direction * x_distance    # final x movement

        y_direction = choice([1, -1])        # +1 = up, -1 = down
        y_distance = choice([0, 1, 2, 3, 4])
        y_step = y_direction * y_distance

        # Reject moves that go nowhere
        if x_step == 0 and y_step == 0:
            continue

        # Calculate the next x and y values
        next_x = self.x_values[-1] + x_step  # add step to last position
        next_y = self.y_values[-1] + y_step
        self.x_values.append(next_x)
        self.y_values.append(next_y)
```

#### شرح كل سطر:
1. `while len(self.x_values) < self.num_points:` → نكرّر حتى نملأ القائمة بالعدد المطلوب
2. `x_direction = choice([1, -1])` → نختار عشوائياً يمين أو يسار
3. `x_distance = choice([0, 1, 2, 3, 4])` → نختار المسافة (0 إلى 4 وحدات)
4. `x_step = x_direction * x_distance` → الخطوة الفعلية = اتجاه × مسافة
5. `if x_step == 0 and y_step == 0: continue` → **تجاهل الخطوة الصفرية** — هذا يمنع تكرار نفس النقطة بدون تقدّم
6. `next_x = self.x_values[-1] + x_step` → `[-1]` = آخر عنصر في القائمة = الموقع الحالي
7. `self.x_values.append(next_x)` → إضافة الموقع الجديد للقائمة

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا نتحقق من `x_step == 0 and y_step == 0` وليس `x_step == 0 or y_step == 0`؟
> **لماذا هذا مهم؟** لأن خطوة (0 في X، 2 في Y) مقبولة — الحركة حصلت. فقط إذا كلاهما صفر نكون في نفس المكان ويجب التجاهل.

#### مهم للامتحان ⚠️:
> `self.x_values[-1]` تعني "آخر قيمة في القائمة" — أي الموقع الحالي. هذا هو الأساس لبناء المسار تراكمياً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> def fill_walk(self):
>     while len(self.x_values) < self.num_points:
>         x_direction = choice([1, -1])
>         x_distance = choice([0, 1, 2, 3, 4])
>         x_step = x_direction * x_distance
>         y_direction = choice([1, -1])
>         y_distance = choice([0, 1, 2, 3, 4])
>         y_step = y_direction * y_distance
>         if x_step == 0 and y_step == 0:
>             continue
>         next_x = self.x_values[-1] + x_step
>         next_y = self.y_values[-1] + y_step
>         self.x_values.append(next_x)
>         self.y_values.append(next_y)
> ```

**ملاحظة على التغطية:**
- ✓ تم شرح: كل سطر، منطق التجاهل، التراكمية
- ℹ️ إضافة من الدليل: تفعيل الفهم، توضيح `and` vs `or`

</details>

---

### 1.3. رسم `RandomWalk` بـ `matplotlib`

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**نُنشئ كائن `RandomWalk`، نستدعي `fill_walk()`، ثم نرسم النقاط بـ`plt.scatter` مع ألوان تعبّر عن ترتيب النقاط.**

#### 💻 الكود — النسخة الأولى (بسيطة)

```python
import matplotlib.pyplot as plt
from random_walk import RandomWalk

rw = RandomWalk()           # create instance with 5000 points
rw.fill_walk()              # generate all points

# both plot (line) and scatter (dots) are shown
plt.plot(rw.x_values, rw.y_values)
plt.scatter(rw.x_values, rw.y_values, c=rw.y_values, s=15)
plt.show()
```

#### 💻 الكود — النسخة المتطورة مع `point_numbers` و `figsize`

```python
import matplotlib.pyplot as plt
from random_walk import RandomWalk

while True:
    rw = RandomWalk()
    rw.fill_walk()

    # set figure size and resolution
    plt.figure(dpi=128, figsize=(10, 6))

    # color each point by its sequence number (early=light, late=dark)
    point_numbers = list(range(rw.num_points))
    plt.scatter(rw.x_values, rw.y_values,
                c=point_numbers,
                cmap=plt.cm.Blues,
                edgecolor='none',
                s=15)

    # highlight start (green) and end (red) points
    plt.scatter(0, 0, c='green', edgecolors='none', s=100)
    plt.scatter(rw.x_values[-1], rw.y_values[-1], c='red', edgecolors='none', s=100)

    plt.show()

    keep_running = input("Make another walk? (y/n): ")
    if keep_running == 'n':
        break
```

#### شرح كل سطر مهم:
- `point_numbers = list(range(rw.num_points))` → `[0, 1, 2, ..., 4999]` — رقم تسلسلي لكل نقطة
- `c=point_numbers` → لوّن النقاط بالأرقام التسلسلية (البداية فاتح، النهاية غامق)
- `cmap=plt.cm.Blues` → استخدم خريطة ألوان زرقاء
- `edgecolor='none'` → بدون حواف للنقاط (تبدو أنظف)
- `s=15` → حجم النقطة
- `plt.scatter(0, 0, c='green', ...)` → نقطة البداية (0,0) خضراء
- `rw.x_values[-1], rw.y_values[-1]` → نقطة النهاية حمراء

#### 🖼️ وصف الشاشة: الناتج البصري

⚠️ **مهم:** الرسمة النهائية بـ5000 نقطة توجد في شرائح المحاضرة — اذهب وشوفها هناك.

| العنصر | الوصف |
| --- | --- |
| النقاط الفاتحة | أوائل المسار (نقطة الانطلاق) |
| النقاط الغامقة | نهاية المسار |
| النقطة الخضراء الكبيرة | نقطة البداية (0, 0) |
| النقطة الحمراء الكبيرة | نقطة النهاية |

#### 🎯 الملخص السريع
- `plt.scatter` أفضل من `plt.plot` للمشي العشوائي (لا خطوط فوضوية)
- `c=point_numbers` + `cmap` يُلوّن المسار تدريجياً بمرور الوقت
- `while True` + `input()` يُتيح توليد مسارات متعددة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> while True:
>     rw = RandomWalk()
>     rw.fill_walk()
>     point_numbers = list(range(rw.num_points))
>     plt.scatter(rw.x_values, rw.y_values, c=point_numbers, cmap=plt.cm.Blues, edgecolor='none', s=15)
>     plt.scatter(0, 0, c='green', edgecolors='none', s=100)
>     plt.scatter(rw.x_values[-1], rw.y_values[-1], c='red', edgecolors='none', s=100)
>     plt.show()
>     keep_running = input("Make another walk? (y/n): ")
>     if keep_running == 'n':
>         break
> ```
> وأيضاً: `plt.figure(dpi=128, figsize=(10, 6))`

**ملاحظة على التغطية:**
- ✓ تم شرح: كل السطور، `point_numbers`، `cmap`، النقاط الملوّنة، `while True`
- ✓ تم شرح: `plt.figure(dpi=128, figsize=(10, 6))`
- ℹ️ إضافة من الدليل: جدول وصف العناصر البصرية

</details>

---

### 2. المشروع الثاني: رمي النرد بـ `pygal`

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 📍 أين نحن الآن؟
انتهينا من المشي العشوائي، الآن ننتقل لمشروع آخر: محاكاة رمي النرد باستخدام مكتبة `pygal` لإنتاج مخططات `SVG` تفاعلية.

#### ⬅️ الربط مع السابق
في `RandomWalk` استخدمنا `choice()` للاختيار العشوائي. هنا نستخدم `randint()` الذي يُعطي رقماً عشوائياً في نطاق محدد — أنسب لمحاكاة النرد.

#### 💡 الفكرة الأساسية
**نبني كلاس `Die` يُمثّل نرداً، نرميه آلاف المرات، نحسب تكرار كل نتيجة، ثم نرسم `histogram` يُظهر التوزيع.**

---

### 2.1. كلاس `Die` — النرد

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💻 الكود

```python
from random import randint

class Die():
    """A class representing a single die."""

    def __init__(self, num_sides=6):
        """Assume a six-sided die."""
        self.num_sides = num_sides

    def roll(self):
        """Return a random value between 1 and number of sides."""
        return randint(1, self.num_sides)
```

#### شرح كل سطر:
1. `from random import randint` → دالة تُعطي عدداً صحيحاً عشوائياً بين قيمتين شاملتين
2. `def __init__(self, num_sides=6)` → القيمة الافتراضية 6 وجوه (D6 الكلاسيكي)
3. `self.num_sides = num_sides` → نحفظ العدد لاستخدامه في `roll()`
4. `return randint(1, self.num_sides)` → نرج عدداً بين 1 والحد الأقصى (شامل الطرفين)

#### 💡 التشبيه:
> كلاس `Die` هو وصفة لصنع نرد — يمكنك صنع نرد بـ6 وجوه (`Die()`) أو بـ10 وجوه (`Die(10)`) أو أي عدد تريده.
> **وجه الشبه:** `num_sides` = عدد الوجوه، `roll()` = رمية واحدة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> from random import randint
> class Die():
>     def __init__(self, num_sides=6):
>         self.num_sides = num_sides
>     def roll(self):
>         return randint(1, self.num_sides)
> ```

**ملاحظة على التغطية:**
- ✓ تم شرح: الكلاس كاملاً، `randint`، القيمة الافتراضية
- ℹ️ إضافة من الدليل: التشبيه

</details>

---

### 2.2. تحليل نتائج النرد ورسم `Histogram`

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**نرمي النرد 1000 مرة، نحسب تكرار كل رقم، ثم نرسم `Bar Chart` بـ`pygal` يُظهر التوزيع.**

#### 💻 الكود — نرد واحد D6

```python
from die import Die
import pygal

die = Die()  # D6 by default
results = []

# roll 1000 times and collect results
for roll_num in range(1000):
    result = die.roll()
    results.append(result)

# count frequency of each possible value
frequencies = []
for value in range(1, die.num_sides + 1):  # 1 to 6
    frequency = results.count(value)
    frequencies.append(frequency)

# print([159, 160, 165, 165, 184, 167]) — roughly equal!

# visualize with pygal
hist = pygal.Bar()
hist.title = "Results of rolling one D6 1000 times."
hist.x_labels = ['1', '2', '3', '4', '5', '6']
hist.x_title = "Result"
hist.y_title = "Frequency of Result"
hist.add('D6', frequencies)
hist.render_to_file('die_visual.svg')
```

#### شرح كل سطر مهم:
- `for value in range(1, die.num_sides + 1)` → نمرّ على كل قيمة ممكنة (1 إلى 6)
- `results.count(value)` → كم مرة ظهرت هذه القيمة في قائمة النتائج؟
- `hist.add('D6', frequencies)` → نُضيف مجموعة بيانات اسمها 'D6' بالترددات
- `hist.render_to_file(...)` → نحفظ الرسم كملف `SVG` (يمكن فتحه في المتصفح)

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا التوزيع منتظم تقريباً (159, 160, 165...) وليس متساوياً تماماً؟
> **لماذا هذا مهم؟** لأن العشوائية تعطي تقريباً 1000/6 ≈ 167 لكل رقم، والتفاوت طبيعي — يقلّ مع زيادة عدد الرميات.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> قائمة النتائج مثال: `[159, 160, 165, 165, 184, 167]` — توزيع منتظم.
> الكود الكامل كما يظهر في الشريحة.

**ملاحظة على التغطية:**
- ✓ تم شرح: قراءة النتائج، حساب التردد، رسم `pygal.Bar`
- ℹ️ إضافة من الدليل: تفسير لماذا الأرقام متقاربة وليست متساوية

</details>

---

### 2.3. رمي نردتين معاً (`Rolling Two Dice`)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**مجموع نردتين D6 يُعطي توزيعاً جرسياً — الأرقام الوسطية (7, 8) تظهر أكثر من الأطراف (2, 12).**

#### 💻 الكود

```python
import pygal
from die import Die

die_1 = Die()  # D6
die_2 = Die()  # D6

results = []
for roll_num in range(1000):
    result = die_1.roll() + die_2.roll()  # sum of two dice
    results.append(result)

frequencies = []
max_result = die_1.num_sides + die_2.num_sides  # max = 12
for value in range(2, max_result + 1):  # range: 2 to 12
    frequency = results.count(value)
    frequencies.append(frequency)

hist = pygal.Bar()
hist.title = "Results of rolling two D6 dice 1000 times."
hist.x_labels = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
hist.x_title = "Result"
hist.y_title = "Frequency of Result"
hist.add('D6 + D6', frequencies)
hist.render_to_file('dice_visual2.svg')
# hist.render_in_browser()  # alternative: open directly in browser
```

#### شرح الفرق عن نرد واحد:
- `result = die_1.roll() + die_2.roll()` → نجمع رميتين
- `max_result = die_1.num_sides + die_2.num_sides` → الحد الأقصى = 6+6 = 12
- `range(2, max_result + 1)` → النطاق يبدأ من 2 (أدنى مجموع ممكن)

#### ملاحظة:
> `hist.render_in_browser()` تفتح الرسم مباشرة في المتصفح بدل حفظ ملف — مفيدة أثناء التطوير.

---

### 2.4. نرد D6 مع نرد D10 (`Different Sizes`)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**يمكنك رمي نرد D6 مع D10 — الحد الأقصى 16، والحد الأدنى 2، والتوزيع يبقى أشبه بالجرسي لكن بشكل مختلف.**

#### 💻 الكود

```python
from die import Die
import pygal

die_1 = Die()     # D6
die_2 = Die(10)   # D10 — pass num_sides=10

results = []
for roll_num in range(50000):  # 50,000 rolls for smoother distribution
    result = die_1.roll() + die_2.roll()
    results.append(result)

frequencies = []
max_result = die_1.num_sides + die_2.num_sides  # 6+10 = 16
for value in range(2, max_result + 1):  # 2 to 16
    frequency = results.count(value)
    frequencies.append(frequency)

hist = pygal.Bar()
hist.title = "Results of rolling a D6 and a D10 50,000 times."
hist.x_labels = ['2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
hist.x_title = "Result"
hist.y_title = "Frequency of Result"
hist.add('D6 + D10', frequencies)
hist.render_to_file('dice_visual3.svg')
```

#### 🎯 الملخص السريع لـ Rolling Dice
- `pygal.Bar()` ينتج `SVG` تفاعلي قابل للعرض في المتصفح
- كلاس `Die` مرن — `Die(10)` يصنع D10، `Die(20)` يصنع D20
- نرد واحد → توزيع منتظم | نردتان → توزيع جرسي (bell)
- `range(2, max+1)` للنردتين لأن الحد الأدنى = 1+1 = 2

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> الثلاثة أكواد (D6 واحد، D6+D6، D6+D10) كلها موجودة في الشرائح مع الصور البيانية الناتجة.

**ملاحظة على التغطية:**
- ✓ تم شرح: الثلاثة سيناريوهات كاملاً
- ✓ تم شرح: الفرق في النطاق (`range` يبدأ من 2 لا من 1)
- ℹ️ إضافة من الدليل: تفسير التوزيع الجرسي

</details>

---

### 3. المشروع الثالث: تحميل البيانات (`Downloading Data`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 📍 أين نحن الآن؟
انتقلنا من البيانات المُولَّدة برمجياً إلى البيانات الحقيقية. سنقرأ ملفات `CSV` و`JSON` ونحوّلها لرسومات.

#### 💡 الفكرة الأساسية
**Python لديها مكتبة `csv` مدمجة لقراءة الملفات المفصولة بفاصلة، ومكتبة `json` لقراءة البيانات المنظمة — كلتاهما تُعيدان البيانات كقوائم أو قواميس Python عادية.**

---

### 3.1. قراءة ملف `CSV` وتحليل الترويسة

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`csv.reader` يُعيد سطراً سطراً. `next(reader)` يأخذ السطر الأول (الترويسة) ويُعيد الـ `reader` جاهزاً لباقي البيانات.**

#### 💻 الكود — قراءة الترويسة

```python
import csv

filename = 'sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)           # wrap file in csv reader
    header_row = next(reader)        # read first row as header
    print(header_row)

# ['AKDT', 'Max TemperatureF', 'Mean TemperatureF', ...]
```

#### 💻 طباعة الترويسة مع أرقامها

```python
for index, column_header in enumerate(header_row):
    print(index, column_header)

# 0 AKDT
# 1 Max TemperatureF
# 2 Mean TemperatureF
# 3 Min TemperatureF
# ...
```

#### شرح كل سطر:
- `csv.reader(f)` → يُغلّف الملف في `reader` يقرأ سطراً كل مرة
- `next(reader)` → يأخذ السطر التالي (الأول = الترويسة) ويُحرّك المؤشر
- `enumerate(header_row)` → يُعطي (index, value) لكل عنصر — مفيد لمعرفة رقم العمود الذي تريده

#### مهم للامتحان ⚠️:
> بعد `next(reader)` الـ`reader` يبدأ من السطر الثاني تلقائياً عند الحلقة `for row in reader:`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> import csv
> filename = 'd:\sitka_weather_07-2014.csv'
> with open(filename) as f:
>     reader = csv.reader(f)
>     header_row = next(reader)
>     print(header_row)
> for index, column_header in enumerate(header_row):
>     print(index, column_header)
> ```
> الناتج: 24 عمود من 0 إلى 23.

**ملاحظة على التغطية:**
- ✓ تم شرح: `csv.reader`، `next(reader)`، `enumerate`
- ℹ️ إضافة من الدليل: توضيح أن المؤشر يتحرك بعد `next`

</details>

---

### 3.2. استخراج البيانات وتحويلها

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**البيانات في CSV تأتي كنصوص (`strings`) — يجب تحويلها لأرقام (`int`) قبل الرسم.**

#### 💻 الكود — استخراج درجات الحرارة العليا

```python
import csv

filename = 'sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)     # skip header
    highs = []
    for row in reader:
        high = int(row[2])        # column 2 = Mean TemperatureF, convert to int
        highs.append(high)

print(highs)
# [64, 71, 64, 59, 69, 62, 61, 55, ...]
```

#### شرح:
- `row[2]` → العمود رقم 2 (نعرف الرقم من `enumerate` في الخطوة السابقة)
- `int(row[2])` → نحوّل النص `'64'` لرقم `64` — **ضروري لرسمه**
- بدون التحويل كانت تُطبع: `['64', '71', '64', ...]` (نصوص لا أرقام)

#### 🔄 قبل / بعد: تحويل البيانات

**قبل (نصوص):**
```python
['64', '71', '64', '59', '69', ...]
```

**بعد (أرقام):**
```python
[64, 71, 64, 59, 69, ...]
```

**ماذا تغيّر؟** `int(row[2])` حوّلت كل قيمة من `str` إلى `int` — الآن يمكن رسمها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> المحاضرة تُظهر أولاً الكود بدون `int()` فيطبع نصوصاً، ثم مع `int()` فيطبع أرقاماً.

**ملاحظة على التغطية:**
- ✓ تم شرح: الفرق بين القراءة بدون وبمع `int`، رقم العمود
- ℹ️ إضافة من الدليل: مقارنة قبل/بعد

</details>

---

### 3.3. رسم درجات الحرارة (`Temperature Chart`)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**بعد استخراج البيانات نرسمها بـ`plt.plot` مع تنسيق المحاور والعنوان.**

#### 💻 الكود

```python
import csv
from matplotlib import pyplot as plt

filename = 'sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)
    highs = []
    for row in reader:
        high = int(row[2])
        highs.append(high)

fig = plt.figure(dpi=128, figsize=(10, 6))  # high quality figure
plt.plot(highs, c='red')                     # red line chart

# format the plot
plt.title("Daily high temperatures, July 2014", fontsize=24)
plt.xlabel('', fontsize=16)
plt.ylabel("Temperature (F)", fontsize=16)
plt.tick_params(axis='both', which='major', labelsize=16)
plt.show()
```

#### شرح السطور الجديدة:
- `plt.figure(dpi=128, figsize=(10, 6))` → `dpi=128` دقة عالية، `figsize=(10,6)` حجم الإطار بالإنش
- `plt.tick_params(axis='both', which='major', labelsize=16)` → تحكّم في حجم أرقام المحاور

#### ⚠️ تنبيه بصري
⚠️ **مهم:** صورة الرسم الناتج موجودة في شرائح المحاضرة صفحة الـ Temperature Chart — اذهب وشوفها هناك.

---

### 3.4. رسم التواريخ (`Plotting Dates`) — `datetime`

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**بدل رسم الأرقام 0,1,2,... على محور X، نحوّل التواريخ النصية لكائنات `datetime` يفهمها `matplotlib` ويعرضها بشكل صحيح.**

#### 📊 المخطط: وحدات `datetime`

| الرمز | المعنى | مثال |
| --- | --- | --- |
| `%A` | اسم يوم الأسبوع | Monday |
| `%B` | اسم الشهر | January |
| `%m` | رقم الشهر (01-12) | 07 |
| `%d` | رقم اليوم (01-31) | 15 |
| `%Y` | السنة 4 أرقام | 2014 |
| `%y` | السنة رقمان | 14 |
| `%H` | الساعة 24H | 23 |
| `%I` | الساعة 12H | 11 |
| `%p` | am/pm | PM |
| `%M` | الدقائق | 59 |
| `%S` | الثواني | 30 |

#### 💻 الكود — رسم مع التواريخ

```python
import csv
from datetime import datetime
from matplotlib import pyplot as plt

filename = 'sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)
    dates, highs = [], []
    for row in reader:
        # convert string date to datetime object
        current_date = datetime.strptime(row[0], "%m/%d/%Y")
        dates.append(current_date)
        high = int(row[2])
        highs.append(high)

fig = plt.figure(dpi=128, figsize=(10, 6))
plt.plot(dates, highs, c='red')   # dates on x-axis!

plt.title("Daily high temperatures, July 2014", fontsize=24)
plt.xlabel('', fontsize=16)
fig.autofmt_xdate()   # rotate date labels to avoid overlap
plt.ylabel("Temperature (F)", fontsize=16)
plt.tick_params(axis='both', which='major', labelsize=16)
plt.show()
```

#### شرح السطور المهمة:
- `datetime.strptime(row[0], "%m/%d/%Y")` → تحوّل `"07/01/2014"` لكائن `datetime` — `strptime` = "string parse time"
- `"%m/%d/%Y"` → نمط التاريخ: شهر/يوم/سنة 4 أرقام (يجب أن يطابق الصيغة الفعلية في الملف!)
- `fig.autofmt_xdate()` → يُدير تسميات المحور X تلقائياً لتجنّب التداخل

#### مهم للامتحان ⚠️:
> `strptime` تفشل إذا كان نمط الصيغة لا يتطابق مع البيانات. ملف `sitka_weather_2014.csv` يستخدم `"%m/%d/%Y"` بينما ملف آخر يستخدم `"%Y-%m-%d"` — تحقق دائماً من صيغة التاريخ في ملفك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> current_date = datetime.strptime(row[0], "%m/%d/%Y")
> fig.autofmt_xdate()
> ```
> والجدول الكامل لرموز `datetime`.

**ملاحظة على التغطية:**
- ✓ تم شرح: `strptime`، `autofmt_xdate`، جدول الرموز كاملاً
- ℹ️ إضافة من الدليل: التحذير عن تطابق الصيغ

</details>

---

### 3.5. رسم فترة أطول وتظليل المساحة

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`plt.fill_between()` يُلوّن المساحة بين خطّين (درجات عليا وسفلى) — يُعطي إحساساً بالنطاق الحراري.**

#### 💻 الكود — تظليل المساحة

```python
import csv
from datetime import datetime
from matplotlib import pyplot as plt

filename = 'sitka_weather_2014.csv'  # full year data
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)
    dates, highs, lows = [], [], []   # three lists now
    for row in reader:
        current_date = datetime.strptime(row[1], "%Y-%m-%d")  # different format!
        dates.append(current_date)
        high = int(row[2])
        highs.append(high)
        low = int(row[4])   # column 4 = min temperature
        lows.append(low)

fig = plt.figure(dpi=128, figsize=(10, 6))
plt.plot(dates, highs, c='red')
plt.plot(dates, lows, c='blue')
# shade area between highs and lows
plt.fill_between(dates, highs, lows, facecolor='green', alpha=0.1)

plt.title("Daily high and low temperatures 2013", fontsize=24)
plt.xlabel('', fontsize=16)
fig.autofmt_xdate()
plt.ylabel("Temperature (F)", fontsize=16)
plt.tick_params(axis='both', which='major', labelsize=16)
plt.show()
```

#### شرح السطور الجديدة:
- `dates, highs, lows = [], [], []` → ثلاث قوائم بدل اثنتين
- `"%Y-%m-%d"` → صيغة تاريخ مختلفة في الملف الجديد (السنة أولاً!)
- `low = int(row[4])` → العمود 4 = درجة الحرارة الدنيا
- `plt.fill_between(dates, highs, lows, facecolor='green', alpha=0.1)` → يُلوّن المنطقة بين الخطين بأخضر شفاف
- `alpha=0.1` → شفافية 10% (بين 0=شفاف تماماً و1=معتم تماماً)

#### 🎯 الملخص السريع لقراءة CSV
- `csv.reader` + `next()` لقراءة الترويسة
- `enumerate()` للحصول على أرقام الأعمدة
- `int(row[N])` لتحويل القيم لأرقام
- `datetime.strptime()` لتحويل التواريخ
- `fig.autofmt_xdate()` لتنسيق تسميات المحور X
- `plt.fill_between()` لتظليل مساحة بين خطين

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> dates, highs, lows = [], [], []
> plt.fill_between(dates, highs, lows, facecolor='green', alpha=0.1)
> ```

**ملاحظة على التغطية:**
- ✓ تم شرح: القوائم الثلاث، صيغة التاريخ المختلفة، `fill_between`، `alpha`
- ℹ️ إضافة من الدليل: شرح `alpha` بالنسبة المئوية

</details>

---

### 4. بيانات JSON — خريطة سكان العالم

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 📍 أين نحن الآن؟
القسم الثالث والأخير: قراءة بيانات `JSON` وتحويلها لخريطة عالمية تفاعلية.

#### ⬅️ الربط مع السابق
CSV = جدول ببيانات مفصولة بفاصلة. JSON = بيانات منظمة هرمياً (قوائم من قواميس) — أكثر مرونة ومناسبة لبيانات معقدة مثل بيانات الدول.

#### 💡 الفكرة الأساسية
**`json.load(f)` يُحمّل ملف JSON إلى قوائم وقواميس Python — ثم يمكن التعامل معه بأساليب Python العادية.**

---

### 4.1. قراءة بيانات `JSON` السكانية

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💻 الكود

```python
import json

filename = 'population_data.json'
with open(filename) as f:
    pop_data = json.load(f)   # loads JSON into Python list/dict

# print population for each country in 2010
for pop_dict in pop_data:
    if pop_dict['Year'] == '2010':
        country_name = pop_dict['Country Name']
        # must use int(float(...)) — values like '1127437398.85751'
        population = int(float(pop_dict['Value']))
        print(country_name + ": " + str(population))
```

#### شرح:
- `json.load(f)` → يُعيد قائمة من القواميس، كل قاموس = صف واحد من البيانات
- `pop_dict['Year'] == '2010'` → نُصفّي لسنة 2010 فقط (القيم نصوص!)
- `int(float(pop_dict['Value']))` → **نمط مهم**: بعض الأرقام مثل `'1127437398.85751'` لا يمكن تحويلها مباشرة لـ`int`، لذا نُحوّل أولاً لـ`float` ثم لـ`int`

#### مهم للامتحان ⚠️:
> `int('1127437398.85751')` ← **يُعطي `ValueError`**!
> `int(float('1127437398.85751'))` ← **يعمل بشكل صحيح** → `1127437398`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> population = int(float(pop_dict['Value']))
> ```
> "Python can't directly turn a string that contains a decimal, '1127437398.85751', into an integer"

**ملاحظة على التغطية:**
- ✓ تم شرح: `json.load`، `int(float(...))`، التصفية بالسنة
- ℹ️ إضافة من الدليل: مثال `ValueError` لتوضيح سبب الأنماط

</details>

---

### 4.2. الحصول على رموز الدول (`Country Codes`)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`pygal` يستخدم رموز الدول بحرفين (`'sy'`, `'us'`, `'cn'`) لرسم الخريطة. نحتاج دالة تُحوّل اسم الدولة لرمزها.**

#### 💻 الكود — الحصول على الرموز المتاحة

```python
from pygal.maps.world import COUNTRIES

# install: pip install pygal_maps_world
for country_code in sorted(COUNTRIES.keys()):
    print(country_code, COUNTRIES[country_code])

# ad Andorra
# ae United Arab Emirates
# af Afghanistan
# ...
# zw Zimbabwe
```

#### 💻 دالة `get_country_code()`

```python
from pygal.maps.world import COUNTRIES

def get_country_code(country_name):
    """Return the Pygal 2-digit country code for the given country."""
    for code, name in COUNTRIES.items():
        if name == country_name:
            return code
    # if country not found, return None
    return None

# test:
print(get_country_code('Andorra'))            # → 'ad'
print(get_country_code('United Arab Emirates'))  # → 'ae'
```

#### شرح:
- `COUNTRIES` = قاموس `{code: country_name}` مُعرَّف في `pygal_maps_world`
- `COUNTRIES.items()` → يُعطي (code, name) لكل دولة
- إذا لم تُوجد الدولة نُعيد `None` (لا نُعطي خطأ)

#### مهم للامتحان ⚠️:
> بعض أسماء الدول في JSON لا تتطابق مع `pygal` — مثلاً "Yemen, Rep." لا تُوجد في `COUNTRIES` فتُعيد `None` وتطبع `"ERROR - Yemen, Rep."`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ```python
> from pygal.maps.world import COUNTRIES
> def get_country_code(country_name):
>     for code, name in COUNTRIES.items():
>         if name == country_name:
>             return code
>     return None
> ```
> وأيضاً: `pip install pygal_maps_world`

**ملاحظة على التغطية:**
- ✓ تم شرح: قاموس `COUNTRIES`، الدالة، `None` للدول غير الموجودة
- ℹ️ إضافة من الدليل: مثال "Yemen, Rep." لتوضيح مشكلة عدم التطابق

</details>

---

### 4.3. بناء الخريطة العالمية

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**نجمع كل شيء: قراءة JSON + تحويل الأسماء لرموز + رسم خريطة `pygal` تُلوّن كل دولة حسب عدد سكانها.**

#### 💻 الكود — الخريطة الكاملة

```python
import json
from pygal_maps_world.maps import World
from country_codes import get_country_code

filename = 'population_data.json'
with open(filename) as f:
    pop_data = json.load(f)

# build {country_code: population} dict for 2010
cc_populations = {}
for pop_dict in pop_data:
    if pop_dict['Year'] == '2010':
        country_name = pop_dict['Country Name']
        population = int(float(pop_dict['Value']))
        code = get_country_code(country_name)
        if code:                                    # skip if code is None
            cc_populations[code] = population

# build and render world map
wm = World()
wm.title = 'World Population in 2010, by Country'
wm.add('2010', cc_populations)          # add data layer
wm.render_to_file('world_population.svg')
```

#### 💻 الكود — تجميع الدول بمجموعات سكانية

```python
cc_pops_1, cc_pops_2, cc_pops_3 = {}, {}, {}

for cc, pop in cc_populations.items():
    if pop < 10_000_000:          # less than 10 million
        cc_pops_1[cc] = pop
    elif pop < 1_000_000_000:     # less than 1 billion
        cc_pops_2[cc] = pop
    else:                         # 1 billion or more
        cc_pops_3[cc] = pop

print(len(cc_pops_1), len(cc_pops_2), len(cc_pops_3))  # see distribution

wm = World()
wm.title = 'World Population in 2010, by Country'
wm.add('0-10m', cc_pops_1)       # small countries — one color
wm.add('10m-1bn', cc_pops_2)     # medium countries — another color
wm.add('>1bn', cc_pops_3)        # large countries — third color
wm.render_to_file('world_population2.svg')
```

#### شرح:
- `cc_populations[code] = population` → نبني قاموساً `{'sy': 20447000, 'us': 309349000, ...}`
- `wm.add('label', dict)` → نُضيف طبقة بيانات للخريطة — كل `add` يُعطي لوناً مختلفاً
- تقسيم لثلاث مجموعات يُعطي خريطة ذات ثلاثة ألوان — أوضح من لون واحد متدرج

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا نتحقق `if code:` قبل إضافة الدولة للقاموس؟
> **لماذا هذا مهم؟** لأن `get_country_code()` قد تُعيد `None` لدول غير موجودة في `pygal` — ولو أضفنا `None` كمفتاح يحدث خطأ عند رسم الخريطة.

#### 🎯 الملخص السريع لـ JSON + Pygal Map
- `json.load(f)` → بيانات Python (قوائم/قواميس)
- `int(float(value))` → تحويل آمن للأرقام العشرية
- `pygal_maps_world` + `COUNTRIES` → تحويل الأسماء لرموز دول
- `wm.add(label, {code: value})` → إضافة طبقة بيانات للخريطة
- `wm.render_to_file('file.svg')` أو `wm.render_in_browser()` للعرض

#### ⚠️ تنبيه بصري
⚠️ **مهم:** صور الخرائط (أحادية اللون وثلاثية الألوان) موجودة في الشرائح الأخيرة — اذهب وشوفها هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> الكودان الكاملان (خريطة واحدة + تقسيم ثلاثي) مع صور الخرائط الناتجة، وكذلك كود `wm.add('North America', ['ca', 'mx', 'us'])` كمثال أبسط لبناء خريطة أمريكا.

**ملاحظة على التغطية:**
- ✓ تم شرح: قراءة JSON، دالة الرموز، الخريطة الأحادية، التقسيم الثلاثي
- ✓ تم شرح: مثال أمريكا اللاتينية/الشمالية/الجنوبية
- ℹ️ إضافة من الدليل: تفعيل الفهم عن `if code:`

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium / hard

---

### السؤال 1 (medium)

ما هو الغرض من السطر `if x_step == 0 and y_step == 0: continue` في دالة `fill_walk()`؟

أ) تجنّب قيم سالبة في الإحداثيات
ب) تجاهل الخطوات التي لا تغيّر الموقع الحالي
ج) تحديد عدد النقاط المرسومة
د) منع تكرار نفس الاتجاه مرتين متتاليتين

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** إذا كان `x_step=0` و`y_step=0` معاً، تعني الخطوة البقاء في نفس الموقع — نتجاهلها لتجنّب تكرار نقطة بلا تقدّم
- ❌ **الخيار أ:** القيم السالبة مقبولة (تعني الذهاب يساراً أو للأسفل)
- ❌ **الخيار ج:** العداد يكون في `while len(self.x_values) < self.num_points`
- ❌ **الخيار د:** لا يوجد قيد على الاتجاه المتكرر

---

### السؤال 2 (medium)

ما ناتج `choice([1, -1]) * choice([0, 1, 2, 3, 4])` إذا كانت `choice` اختارت `-1` و`3`؟

أ) `3`
ب) `-3`
ج) `1`
د) `-1`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `(-1) * 3 = -3` — الخطوة تعني 3 وحدات في الاتجاه السالب
- ❌ **الخيار أ:** `3` ستكون النتيجة لو `choice` اختارت `+1` و`3`
- ❌ **الخيار ج:** `1` ستكون النتيجة لو `+1 * 1`
- ❌ **الخيار د:** `-1` لو `-1 * 1`

---

### السؤال 3 (hard)

لماذا يُستخدم `self.x_values[-1]` بدلاً من `self.x_values[0]` في حساب الموقع التالي؟

أ) لأن `[0]` لا يوجد في قائمة فارغة
ب) لأن `[-1]` يُشير لآخر عنصر — الموقع الحالي
ج) لأن `[-1]` أسرع في الوصول
د) لتجنّب الأخطاء في Python 3

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `[-1]` في Python يُشير لآخر عنصر في القائمة — أي الموقع الذي وصلنا إليه في آخر خطوة
- ❌ **الخيار أ:** `[0]` يوجد دائماً (نهيّئه بـ`[0]` في `__init__`)
- ❌ **الخيار ج:** السرعة ليست السبب
- ❌ **الخيار د:** `[-1]` مدعوم في كل إصدارات Python

---

### السؤال 4 (medium)

ما الفرق بين `plt.plot()` و`plt.scatter()` في سياق رسم `RandomWalk`؟

أ) `plot` أسرع، `scatter` أبطأ
ب) `plot` يرسم خطوطاً بين النقاط، `scatter` يرسم نقاطاً منفصلة
ج) `scatter` لا تدعم معامل `c`
د) `plot` أنسب للبيانات العشوائية

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `plt.plot` يربط النقاط بخطوط (يُنتج رسماً فوضوياً للمسار العشوائي)، `plt.scatter` يرسم كل نقطة مستقلة مع إمكانية تلوين كل نقطة بلون مختلف
- ❌ **الخيار أ:** السرعة ليست الفرق الجوهري
- ❌ **الخيار ج:** `plt.scatter` تدعم `c` — هذا من أهم مزاياها
- ❌ **الخيار د:** العكس صحيح — `scatter` أنسب للعشوائية

---

### السؤال 5 (medium)

لماذا يُستخدم `list(range(rw.num_points))` كقيمة لـ`c` في `plt.scatter`؟

أ) لتحديد حجم النقاط
ب) لتلوين النقاط حسب ترتيبها الزمني (الأولى فاتحة، الأخيرة غامقة)
ج) لتعيين إحداثيات X
د) لتجنّب الأرقام العشرية

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `range(5000)` = `[0, 1, 2, ..., 4999]`. هذه الأرقام مع `cmap=plt.cm.Blues` تُلوّن النقطة الأولى بأخف أزرق والأخيرة بأغمقه — تُعطي إحساساً بمرور الوقت
- ❌ **الخيار أ:** الحجم يتحكم فيه `s=15`
- ❌ **الخيار ج:** الإحداثيات هي `rw.x_values`, `rw.y_values`
- ❌ **الخيار د:** لا علاقة

---

### السؤال 6 (hard)

ما ناتج `randint(1, 6)` بالنسبة لنرد D6؟

أ) عدد بين 0 و5
ب) عدد بين 1 و6 (شامل الطرفين)
ج) عدد بين 1 و5 فقط
د) عدد عشوائي بين 0 و6 غير شامل الطرفين

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `randint(a, b)` يُعطي عدداً صحيحاً بين `a` و`b` شامل الطرفين — هذا يختلف عن `range(a, b)` الذي لا يشمل `b`
- ❌ **الخيار أ:** يبدأ من 1 لا من 0
- ❌ **الخيار ج:** يشمل 6
- ❌ **الخيار د:** `randint` يشمل الطرفين

---

### السؤال 7 (medium)

لماذا يبدأ `range` في تحليل نتائج رمي نردتين من `2` لا من `1`؟

أ) لأن Python لا تدعم `range(1, ...)`
ب) لأن أدنى مجموع لنردتين D6 هو `1+1=2`
ج) لأن `pygal` لا يدعم الرقم 1
د) لتجنّب القسمة على صفر

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** كل نرد يبدأ من 1، فأدنى مجموع ممكن = 1+1 = 2. الرقم 1 مستحيل لنردتين.
- ❌ **الخيار أ:** Python تدعم أي بداية لـ`range`
- ❌ **الخيار ج:** `pygal` يقبل أي قيمة
- ❌ **الخيار د:** لا توجد قسمة

---

### السؤال 8 (medium)

ما وظيفة `next(reader)` عند قراءة ملف CSV؟

أ) تنقل المؤشر للسطر الأخير
ب) تقرأ السطر التالي وتُحرّك المؤشر — تُستخدم لتخطّي سطر الترويسة
ج) تُعيد عدد السطور في الملف
د) تُغلق الملف بعد القراءة

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `next(reader)` تأخذ السطر التالي من الـ`reader` وتُحرّك المؤشر — فعند حلقة `for row in reader:` تبدأ من السطر الثاني
- ❌ **الخيار أ:** تقرأ السطر التالي (الأول أول مرة)، لا الأخير
- ❌ **الخيار ج:** لا تعدّ السطور
- ❌ **الخيار د:** لا تُغلق الملف

---

### السؤال 9 (hard)

ما وظيفة `enumerate(header_row)` في قراءة CSV؟

أ) تُعيد عدد الأعمدة
ب) تُعيد (index, value) لكل عنصر — لمعرفة رقم كل عمود
ج) تُحوّل الأعمدة لقاموس
د) تُرتّب الأعمدة أبجدياً

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `enumerate` يُعطي زوجاً (رقم, قيمة) لكل عنصر — يُساعد في معرفة رقم العمود الذي تريد قراءته لاحقاً
- ❌ **الخيار أ:** `len(header_row)` هو من يُعطي العدد
- ❌ **الخيار ج:** لا تُحوّل لقاموس مباشرةً
- ❌ **الخيار د:** لا تُرتّب

---

### السؤال 10 (hard)

لماذا نستخدم `int(float(pop_dict['Value']))` وليس `int(pop_dict['Value'])`؟

أ) لأن `float` أسرع من `int`
ب) لأن بعض القيم نصوص تحتوي نقطة عشرية لا يمكن تحويلها مباشرة لـ`int`
ج) لأن `pygal` يتطلب قيماً عشرية
د) لأن ملف JSON يخزّن القيم كـ`bool`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `int('1127437398.85751')` يُعطي `ValueError`. الحلّ: أولاً `float(...)` يُحوّلها لرقم عشري `1127437398.85751`، ثم `int(...)` يُقرّبها لـ`1127437398`
- ❌ **الخيار أ:** السرعة ليست السبب
- ❌ **الخيار ج:** `pygal` يقبل `int` عادي
- ❌ **الخيار د:** القيم في الملف نصوص `str`، لا `bool`

---

### السؤال 11 (medium)

ما وظيفة `datetime.strptime(row[0], "%m/%d/%Y")`؟

أ) تُحوّل كائن `datetime` لنص
ب) تُحوّل نصاً بتاريخ لكائن `datetime` حسب النمط المُحدَّد
ج) تُعيد الفارق بين تاريخين
د) تُنسّق التاريخ للعرض فقط

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `strptime` = "string parse time" — تأخذ نصاً مثل `"07/15/2014"` وتُحوّله لكائن `datetime` بناءً على النمط `"%m/%d/%Y"`
- ❌ **الخيار أ:** `strftime` = "string format time" هي من تُحوّل كائن `datetime` لنص
- ❌ **الخيار ج:** `timedelta` هو للفارق بين تاريخين
- ❌ **الخيار د:** تُحوّل فعلياً، لا تُنسّق فقط

---

### السؤال 12 (medium)

ما وظيفة `fig.autofmt_xdate()`؟

أ) تُحوّل الأرقام لتواريخ على محور X
ب) تُدير تسميات محور X لتجنّب التداخل بين التواريخ
ج) تُضيف شبكة أفقية للمخطط
د) تُحدّد عدد التواريخ المعروضة

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** عند استخدام تواريخ على محور X، تكون النصوص طويلة وتتداخل — `autofmt_xdate()` يُديرها تلقائياً لتصبح مقروءة
- ❌ **الخيار أ:** التحويل يتم في `strptime`
- ❌ **الخيار ج:** الشبكة تُضاف بـ`plt.grid()`
- ❌ **الخيار د:** لا تتحكم في العدد

---

### السؤال 13 (hard)

ما الفرق بين `"%m/%d/%Y"` و`"%Y-%m-%d"` في `strptime`؟

أ) الأول للأسماء، الثاني للأرقام
ب) صيغتان مختلفتان للتاريخ: الأولى `شهر/يوم/سنة`، الثانية `سنة-شهر-يوم`
ج) الأول يقرأ الوقت، الثاني يقرأ التاريخ
د) لا فرق بينهما

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `"%m/%d/%Y"` يُحوّل `"07/15/2014"` (صيغة أمريكية)، أما `"%Y-%m-%d"` فيُحوّل `"2014-07-15"` (صيغة ISO) — يجب أن يتطابق النمط مع الصيغة الفعلية في الملف
- ❌ **الخيار أ:** كلاهما لأرقام التاريخ
- ❌ **الخيار ج:** كلاهما للتاريخ، يمكن إضافة `%H:%M` للوقت
- ❌ **الخيار د:** الفرق جوهري — استخدام النمط الخاطئ يُعطي `ValueError`

---

### السؤال 14 (medium)

ما وظيفة `plt.fill_between(dates, highs, lows, facecolor='green', alpha=0.1)`؟

أ) رسم خطين منفصلين باللون الأخضر
ب) تظليل المساحة بين خطّي درجات الحرارة العليا والسفلى بأخضر شفاف
ج) حذف النقاط بين الخطين
د) تظليل المساحة تحت محور X فقط

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `fill_between` يُلوّن المساحة بين `highs` و`lows`، `alpha=0.1` يجعلها شفافة بنسبة 90%
- ❌ **الخيار أ:** الخطان يُرسمان بـ`plt.plot` منفصلاً
- ❌ **الخيار ج:** لا يحذف شيئاً
- ❌ **الخيار د:** يُظلّل بين `highs` و`lows` حسب إحداثياتهما

---

### السؤال 15 (hard)

لماذا نتحقق `if code:` قبل `cc_populations[code] = population`؟

أ) للتحقق من أن `population` موجب
ب) لأن `get_country_code()` قد تُعيد `None` لدول غير موجودة في `pygal`
ج) لأن رموز الدول الفارغة تُسبّب `TypeError`
د) لتجنّب إضافة دولة مرتين

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `get_country_code()` تُعيد `None` للدول التي لا يعرفها `pygal` (مثل "Arab World" أو "Yemen, Rep."). لو أضفنا `None` كمفتاح للقاموس، سيُسبّب خطأً عند رسم الخريطة
- ❌ **الخيار أ:** `population` دائماً موجب (عدد سكان)
- ❌ **الخيار ج:** السبب هو `None` لا الرمز الفارغ
- ❌ **الخيار د:** `json.load` قد يحتوي دولة مرتين لسنوات مختلفة، لكن نُصفّي بـ`if pop_dict['Year'] == '2010'`

---

### السؤال 16 (hard)

ما الفرق بين `wm.render_to_file('file.svg')` و`wm.render_in_browser()`؟

أ) `render_to_file` ينتج PNG، `render_in_browser` ينتج SVG
ب) `render_to_file` يحفظ الملف على القرص، `render_in_browser` يفتح الرسم مباشرة في المتصفح
ج) `render_in_browser` يتطلب اتصالاً بالإنترنت
د) لا فرق في الناتج

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `render_to_file` يحفظ SVG على القرص (مفيد للإنتاج)، `render_in_browser` يفتح SVG مؤقتاً في المتصفح مباشرةً (مفيد أثناء التطوير)
- ❌ **الخيار أ:** كلاهما ينتج SVG
- ❌ **الخيار ج:** لا يتطلب إنترنت — يفتح ملفاً محلياً
- ❌ **الخيار د:** الفرق في مكان العرض والحفظ

---

## الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما وظيفة `fill_walk()` في كلاس `RandomWalk`؟
**A:** تملأ قائمتي `x_values` و`y_values` بإحداثيات المسار العشوائي — تكرار حتى الوصول لـ`num_points` نقطة، كل نقطة تُحسب بإضافة خطوة عشوائية للإحداثيات الأخيرة.

### البطاقة 2
**Q2:** لماذا نستخدم `choice([1, -1])` في `fill_walk`؟
**A:** لأن الحركة تكون في اتجاهين فقط: موجب (+1 = يمين/أعلى) أو سالب (-1 = يسار/أسفل). `choice` تختار عشوائياً بين الاثنين.

### البطاقة 3
**Q3:** ما الفرق بين `plt.plot` و`plt.scatter` في رسم `RandomWalk`؟
**A:** `plot` يربط النقاط بخطوط (يُنتج رسماً فوضوياً)، `scatter` يرسم نقاطاً منفصلة مع إمكانية تلوين كل نقطة بلون مختلف — أنسب للمشي العشوائي.

### البطاقة 4
**Q4:** ماذا يفعل `list(range(rw.num_points))` ولماذا يُستخدم مع `c=`؟
**A:** ينشئ قائمة `[0, 1, 2, ..., 4999]` — أرقام تسلسلية. عند استخدامها مع `c=` و`cmap=plt.cm.Blues`، تُلوّن النقاط بألوان متدرجة من فاتح (بداية) لغامق (نهاية).

### البطاقة 5
**Q5:** كيف تُنشئ نرداً D10 بكلاس `Die`؟
**A:** `die = Die(10)` — تُمرّر العدد 10 لـ`num_sides`. القيمة الافتراضية 6 لإنشاء D6 العادي.

### البطاقة 6
**Q6:** لماذا يكون توزيع مجموع نردتين جرسياً (bell-shaped)؟
**A:** لأن الأرقام الوسطية (7 من نردتين D6) لها أكثر طرق لتحقيقها (1+6, 2+5, 3+4, 4+3, 5+2, 6+1 = 6 طرق)، بينما الأطراف (2 أو 12) لها طريقة واحدة فقط.

### البطاقة 7
**Q7:** ما وظيفة `next(reader)` في قراءة CSV؟
**A:** تقرأ السطر التالي من الـ`reader` وتُحرّك المؤشر. تُستخدم مرة واحدة لقراءة سطر الترويسة، بعدها `for row in reader:` يبدأ من البيانات مباشرةً.

### البطاقة 8
**Q8:** لماذا نستخدم `enumerate(header_row)` عند عرض الترويسة؟
**A:** لمعرفة رقم كل عمود — `enumerate` يُعطي `(0, 'AKDT'), (1, 'Max TemperatureF'), ...` حتى نعرف أن نكتب `row[2]` للحصول على درجة الحرارة مثلاً.

### البطاقة 9
**Q9:** ما النمطان الشائعان لـ`strptime` في المحاضرة؟
**A:** `"%m/%d/%Y"` للصيغة الأمريكية `07/15/2014`، و`"%Y-%m-%d"` للصيغة الدولية `2014-07-15`. يجب أن يتطابق النمط تماماً مع بيانات الملف.

### البطاقة 10
**Q10:** لماذا نستخدم `int(float(value))` لا `int(value)` مع بيانات JSON؟
**A:** لأن بعض القيم نصوص تحتوي نقطة عشرية مثل `'1127437398.85751'` — `int()` يفشل معها بـ`ValueError`، بينما `float()` تُحوّلها أولاً ثم `int()` يُقرّبها.

### البطاقة 11
**Q11:** ما وظيفة `plt.fill_between(dates, highs, lows, facecolor='green', alpha=0.1)`؟
**A:** يُظلّل المساحة بين خطّين (درجات عليا وسفلى) بلون أخضر شفاف (`alpha=0.1`) — يُعطي إحساساً بالنطاق الحراري اليومي.

### البطاقة 12
**Q12:** لماذا يتحقق الكود من `if code:` قبل إضافة الدولة للقاموس؟
**A:** لأن `get_country_code()` تُعيد `None` للدول غير الموجودة في قاموس `pygal` (مثل "Arab World"). إضافة `None` كمفتاح تُسبّب خطأً في رسم الخريطة.

### البطاقة 13
**Q13:** ما أوامر التثبيت المطلوبة لهذه المحاضرة؟
**A:** `pip install pygal` لمكتبة الرسومات، و`pip install pygal_maps_world` لخرائط الدول. `matplotlib` و`csv` و`json` مُثبَّتة مع Python أساساً.

### البطاقة 14
**Q14:** ما الفرق بين `pygal.Bar()` و`pygal_maps_world.maps.World()`؟
**A:** `pygal.Bar()` يرسم مخطط عمودي (`histogram`)، بينما `World()` يرسم خريطة العالم ويلوّن الدول. كلاهما ينتج `SVG` تفاعلي.

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة

| المصطلح | التعريف القصير |
| --- | --- |
| `RandomWalk` | كلاس يُولّد مسار عشوائي ثنائي الأبعاد بإضافة خطوات عشوائية تراكمياً |
| `fill_walk()` | دالة تملأ قائمتي `x_values`، `y_values` بإحداثيات المسار |
| `choice([1,-1])` | تختار عشوائياً +1 أو -1 لتحديد الاتجاه |
| `plt.scatter()` | يرسم نقاطاً منفصلة، يدعم تلوين كل نقطة (`c=`) |
| `cmap` | خريطة الألوان (`plt.cm.Blues` = ألوان زرقاء متدرجة) |
| `alpha` | الشفافية — 0 = شفاف تماماً، 1 = معتم تماماً |
| `Die` | كلاس يُمثّل نرداً بـN وجه، `roll()` تُعيد رقماً عشوائياً |
| `pygal.Bar()` | مخطط عمودي `SVG` تفاعلي من مكتبة `pygal` |
| `csv.reader()` | يقرأ ملف CSV سطراً سطراً، يُعيد كل سطر كقائمة |
| `next(reader)` | يأخذ السطر التالي من الـ`reader` ويُحرّك المؤشر |
| `enumerate()` | يُعطي `(index, value)` لكل عنصر في قائمة |
| `strptime()` | يُحوّل نص تاريخ لكائن `datetime` حسب نمط محدد |
| `autofmt_xdate()` | يُدير تسميات محور X (للتواريخ) لتجنّب التداخل |
| `fill_between()` | يُظلّل المساحة بين خطين على المخطط |
| `json.load(f)` | يُحمّل ملف JSON كقوائم/قواميس Python |
| `COUNTRIES` | قاموس `{code: name}` من `pygal_maps_world` |
| `World()` | كائن خريطة عالمية من `pygal_maps_world` |

---

### 🔑 جداول المقارنة

#### `plt.plot` vs `plt.scatter`

| المعيار | `plt.plot` | `plt.scatter` |
| --- | --- | --- |
| الرسم | خطوط بين النقاط | نقاط منفصلة |
| تلوين فردي | ❌ | ✅ (`c=` للقائمة) |
| مناسب لـ | البيانات الزمنية المتسلسلة | البيانات العشوائية أو المتفرقة |
| في المحاضرة | ملف الطقس | المشي العشوائي |

#### نرد واحد vs نردتان

| المعيار | نرد واحد D6 | نردتان D6+D6 |
| --- | --- | --- |
| النطاق | 1 إلى 6 | 2 إلى 12 |
| التوزيع | منتظم (flat) | جرسي (bell) |
| `range` في الكود | `range(1, 7)` | `range(2, 13)` |
| أكثر نتيجة | كل الأرقام متساوية | 7 الأكثر احتمالاً |

#### CSV vs JSON

| المعيار | `CSV` | `JSON` |
| --- | --- | --- |
| البنية | جدول بصفوف وأعمدة | هرمية (قوائم/قواميس) |
| المكتبة | `import csv` | `import json` |
| قراءة | `csv.reader(f)` + `next()` | `json.load(f)` |
| الناتج | قوائم نصوص | قوائم/قواميس Python |
| التحويل | `int(row[N])` | `int(float(dict['key']))` |

---

### 🔑 المكتبات والأدوات

| الأداة | الوظيفة | متى تستخدم |
| --- | --- | --- |
| `matplotlib.pyplot` | رسم مخططات بيانية | بيانات عددية، تواريخ، سلاسل زمنية |
| `pygal` | رسومات SVG تفاعلية | Histograms، الخرائط |
| `pygal_maps_world` | خرائط العالم | `pip install pygal_maps_world` |
| `csv` | قراءة/كتابة CSV | بيانات جدولية (طقس، مبيعات) |
| `json` | قراءة/كتابة JSON | بيانات منظمة هرمياً |
| `datetime` | التعامل مع التواريخ | `strptime`, `strftime` |
| `random.choice` | اختيار عشوائي من قائمة | `RandomWalk`, `Die` |
| `random.randint` | عدد صحيح عشوائي في نطاق | `Die.roll()` |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | `self.x_values[-1]` = الموقع الحالي — دائماً ابنِ على آخر نقطة |
| 2 | `int(float(value))` لتحويل أرقام JSON آمناً |
| 3 | النمط في `strptime` يجب أن يتطابق مع صيغة التاريخ في الملف بالضبط |
| 4 | `if code:` قبل إضافة الدولة — تجنّب `None` كمفتاح |
| 5 | `c=point_numbers` + `cmap` = ألوان تُعبّر عن التتابع الزمني |
| 6 | `fill_between` يحتاج `alpha < 1` وإلا يُخفي الخطوط |
| 7 | `render_to_file` للحفظ، `render_in_browser` للمعاينة السريعة |

---

### 🔑 قاموس المصطلحات

| المصطلح | المعنى |
| --- | --- |
| `Random Walk` | مسار عشوائي — حركة تتراكم فيها خطوات عشوائية الاتجاه والمسافة |
| `Histogram` | مخطط عمودي يُظهر تكرار كل قيمة في مجموعة بيانات |
| `Bell Curve` | التوزيع الجرسي — يتمحور حول الوسط عند جمع متغيرات عشوائية |
| `SVG` | Scalable Vector Graphics — صيغة رسوم تفاعلية قابلة للتكبير |
| `CSV` | Comma-Separated Values — ملف نصي يفصل القيم بفاصلة |
| `JSON` | JavaScript Object Notation — صيغة بيانات هرمية منظمة |
| `strptime` | "string parse time" — تحويل نص لكائن `datetime` |
| `strftime` | "string format time" — تحويل كائن `datetime` لنص |
| `alpha` | الشفافية في matplotlib — قيمة بين 0 (شفاف) و1 (معتم) |
| `cmap` | Colormap — خريطة ألوان تُحوّل أرقاماً لألوان مرئية |
| `dpi` | Dots Per Inch — دقة الصورة (128 جودة عالية) |
| `COUNTRIES` | قاموس `pygal` يربط رمز الدولة (2 حروف) بالاسم الكامل |

---

### 🔑 الخطوات السريعة

#### بناء `RandomWalk` كاملاً

```algorithm
1 | تعريف الكلاس   | class RandomWalk():           | __init__ مع num_points, x_values=[0], y_values=[0]
2 | كتابة fill_walk | while len < num_points        | حلقة تملأ القوائم حتى العدد المطلوب
3 | حساب الخطوة    | choice([1,-1]) * choice([0..4]) | x_step و y_step لكل محور
4 | تجاهل الصفرية   | if x_step==0 and y_step==0    | continue — لا تُضف نقطة بلا تقدّم
5 | إضافة النقطة   | append(last + step)           | تراكمي: الجديد = القديم + الخطوة
6 | الرسم          | plt.scatter(c=point_numbers)  | مع cmap ونقاط بداية/نهاية ملوّنة
```

#### قراءة CSV ورسمه

```algorithm
1 | فتح الملف    | with open(filename) as f | context manager يُغلق الملف تلقائياً
2 | قراءة الترويسة | next(reader)           | أخذ سطر الترويسة وتحريك المؤشر
3 | معرفة الأعمدة | enumerate(header_row)  | لمعرفة رقم العمود الذي تريده
4 | قراءة البيانات | for row in reader:     | كل row = قائمة نصوص
5 | التحويل       | int(row[N])            | تحويل النص لرقم
6 | التواريخ      | datetime.strptime()    | إن وُجدت تواريخ — حوّلها
7 | الرسم         | plt.plot() or scatter  | مع autofmt_xdate() للتواريخ
```

#### بناء خريطة السكان

```algorithm
1 | تحميل JSON    | json.load(f)                  | قائمة قواميس
2 | التصفية       | if pop_dict['Year'] == '2010' | سنة محددة فقط
3 | التحويل       | int(float(pop_dict['Value'])) | تحويل آمن للأرقام
4 | الرمز         | get_country_code(name)        | من الاسم لـ2 حروف
5 | التحقق        | if code:                      | تجاهل None
6 | القاموس       | cc_populations[code] = pop   | بناء القاموس
7 | الرسم         | wm.add('label', dict)         | إضافة طبقة بيانات
8 | العرض         | render_to_file / render_in_browser | حفظ أو فتح
```

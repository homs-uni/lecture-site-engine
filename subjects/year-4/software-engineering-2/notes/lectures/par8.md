# المحاضرة 8 — الوحدة H: Refactoring (محاضرة 13)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

### الفقرة 0أ: تعريف Refactoring + ما هو ليس Refactoring

**من المحاضرة:** محاضرة 13، §1-2 | `Refactoring`: تغيير بنية الكود الداخلية دون تغيير سلوكه الخارجي — "تنظيف الكود". **ليس** Refactoring: إضافة functionality جديدة (attributes/methods/classes جديدة)، ولا إعادة الكتابة من الصفر (`Rewriting from scratch`).

**القاعدة الذهبية:** الفيصل الوحيد = "هل تغيّر السلوك الخارجي؟" لو تغيّر، فهذا تطوير جديد لا Refactoring.

### الفقرة 0ب: لماذا ومتى نُرفكتِر

**من المحاضرة:** محاضرة 13، §3-4 | **لماذا:** ما نقدر نصمم صح من أول مرة، Refactoring يقلل حجم الكود، يبسّط البنى المعقدة، يسهّل الفهم والتعديل، ويساعد باكتشاف bugs مخفية. **متى:** عند إضافة functionality جديدة (قبل أو بعد)، أثناء مراجعة الكود (`code review`)، وعند الحاجة لإصلاح bug.

### الفقرة 0ج: البرامج السهلة (خصائص الكود الصعب)

**من المحاضرة:** محاضرة 13، §5 | 4 أسباب لصعوبة تعديل برنامج: صعوبة القراءة، منطق مكرر (`duplicated logic`)، الحاجة لتعديل كود شغّال (`running code`) لإضافة سلوك، ومنطق شرطي معقد (`complex conditional logic`).

### الفقرة 0د: Code Smells وحلولها (الجدول الأهم بالمحاضرة)

**من المحاضرة:** محاضرة 13، §6-8 | `Code Smell` (رائحة الكود): مؤشر على مشكلة تصميمية محتملة حتى لو الكود "يشتغل صح" ظاهرياً — قد تكون قوية، واضحة، خفية (`subtler`)، أو تُخفي مشاكل أخرى.

| الـ Smell | الحل المقترح |
|---|---|
| Duplicated Code (كود مكرر) | `Extract Method` |
| Long Method (طويلة عموماً) | `Compose Method` |
| Long Method (بسبب switch لمعالجة طلبات) | `Command Pattern` |
| Long Method (بسبب switch لجمع بيانات) | `Visitor Pattern` |
| Long Method (خوارزميات متعددة بشرط) | `Strategy Pattern` |
| Conditional Complexity (تعقيد شرطي) | Strategy / Decorator / State |
| Primitive Obsession (هوس بالأنواع الأولية) | `Replace Data Value with Object` |
| Indecent Exposure (كشف غير لائق) | `Factory Pattern` |
| Solution Sprawl (انتشار الحل) | `Factory Pattern` |
| Long Parameter List (قائمة معاملات طويلة) | `Replace Method with Method Object` |

**📌 الترجمة:** `Primitive Obsession` = الاعتماد المفرط على أنواع بدائية (int/String) بدل صنف مخصص (مثال: تمثيل حالة صلاحية كنص "REQUESTED" بدل صنف `PermissionState`). `Indecent Exposure` = كشف تفاصيل داخلية يفترض إخفاؤها (غياب `Information Hiding`).

#### تحقق سريع:
A class relies heavily on raw `String` values (e.g., "REQUESTED", "GRANTED") to represent states instead of a dedicated type. Which code smell is this, and what is the standard fix?
أ) Long Parameter List → Replace Method with Method Object
ب) Primitive Obsession → Replace Data Value with Object
ج) Duplicated Code → Extract Method
د) Indecent Exposure → Factory Pattern
**الإجابة: ب**
> هذا بالضبط مثال المحاضرة (نظام SystemPermission) — الاعتماد على نصوص خام بدل صنف `PermissionState` مخصص هو `Primitive Obsession`، وحلها القياسي `Replace Data Value with Object`.


### الفقرة 0ه: دورة Refactoring (Refactoring Cycle)

**من المحاضرة:** محاضرة 13، §7 | حلقة متكررة: طالما فيه smells → اختر الأسوأ أولاً (`worst first`) → اختر التقنية المناسبة → طبّقها → أعد الفحص. لا نُصلح كل شيء دفعة واحدة، بل خطوات صغيرة متكررة (compile & test بين كل خطوة).

### الفقرة 0و: تقنيات Refactoring التفصيلية — Extract/Inline + Replace

**من المحاضرة:** محاضرة 13، §11-16 | `Extract Method` (استخراج دالة): عزل جزء كود مكرر أو معقّد لدالة مستقلة باسم واضح. `Inline Method` (دمج دالة): عكس Extract — دمج دالة بسيطة جداً بمكان استدعائها لما تصبح غير ضرورية كطبقة منفصلة. `Replace Temp with Query`: استبدال متغيّر مؤقت يخزّن نتيجة تعبير بدالة (`query`) تُعيد حسابه عند الحاجة. `Replace Method with Method Object`: تحويل دالة بقائمة معاملات طويلة/منطق معقد إلى صنف (`class`) مستقل يمثّل استدعاء الدالة نفسها ككائن. `Replace Data Value with Object`: تحويل قيمة بدائية (نص/رقم) تحمل معنى أعمق إلى صنف مخصص بخصائصه وسلوكه.

#### تحقق سريع:
A method has grown a very long parameter list because it needs many related pieces of data to perform a complex calculation. Which refactoring technique directly addresses this?
أ) Inline Method
ب) Replace Temp with Query
ج) Replace Method with Method Object
د) Extract Method
**الإجابة: ج**
> `Replace Method with Method Object` يحوّل الدالة نفسها لصنف مستقل، فتصبح كل "المعاملات" حقول (`fields`) بالكائن الجديد بدل قائمة معاملات طويلة بالتوقيع.


### الفقرة 1: تعريف Refactoring + الفيصل معه (السلوك الخارجي)

**من المحاضرة:** محاضرة 13، §1-2 | `Refactoring`: تغيير البنية الداخلية **بدون** تغيير السلوك الخارجي.

#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the primary purpose of code refactoring in software development?
أ) Fix defects in the code
ب) Improve the performance of the code
ج) Enhance the readability and maintainability of the code
د) Add new features to the code
**الإجابة: ج**
> الفيصل الحاسم: "هل تغيّر السلوك الخارجي؟" لو تغيّر، فهذا تطوير جديد وليس Refactoring (ولذلك أ، ب، د كلها مستبعدة).


#### تحقق سريع:
**المصدر:** [نمط 2023-2024 — الفصل الأول]
What is the primary goal of software reengineering?
أ) Add new features
ب) Improve performance
ج) Enhance maintainability of an existing system
د) Rewrite from scratch
**الإجابة: ج**
> نفس فلسفة Refactoring (بنية داخلية أفضل، سلوك خارجي ثابت)، بعكس "إعادة الكتابة من الصفر" (خيار د) اللي هو نشاط مختلف تماماً.


### الفقرة 2: Code Smells (روائح الكود)

**من المحاضرة:** محاضرة 13، §6-8 | Long Method, Duplicated Code, Large Class, Long Parameter List, Divergent Change, Shotgun Surgery...

#### تحقق سريع:
A class that has grown to handle many unrelated responsibilities is best described as which code smell?
أ) Long Parameter List
ب) Large Class
ج) Duplicated Code
د) Feature Envy
**الإجابة: ب**
> الترجمة: `Code Smell` = رائحة كود (مؤشر سطحي على مشكلة تصميم أعمق)، `Feature Envy` = فئة "تحسد" فئة تانية وبتستخدم بياناتها أكتر من بياناتها هي.


### الفقرة 3: طرق Refactoring — Extract / Inline / Replace

**من المحاضرة:** محاضرة 13، §11-16 | `Extract Method` (استخراج دالة)، `Inline Method` (دمج دالة صغيرة بمكان استدعائها)، `Replace Temp with Query` (استبدال متغيّر مؤقت بدالة).

#### تحقق سريع:
Which refactoring technique is used when a temporary variable holds the result of an expression that could instead be recalculated by a method each time it's needed?
أ) Extract Method
ب) Inline Method
ج) Replace Temp with Query
د) Replace Method with Method Object
**الإجابة: ج**
> —

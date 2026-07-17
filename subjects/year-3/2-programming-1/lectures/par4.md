# المحاضرة 4 — Generics and Collections (الجنيريكس والمجموعات)
> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** Generic Classes, Generic Methods, Bounded Types, Wildcards, Collections Framework (ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap, PriorityQueue, Stack, Vector)

---

## الجزء الأول: الشرح التفصيلي

### 1. Generics — المفهوم والدافع

**النص الأصلي يقول:** *"Generics let you parameterize types — using Java generics is to detect errors at compile time"*

**الشرح المبسّط:** `Generics` تتيح لك كتابة كود يعمل مع أنواع مختلفة دون إعادة الكتابة. الفائدة الكبرى أن الأخطاء تُكشف وقت الترجمة لا وقت التشغيل.

💡 **التشبيه:**
> تخيّل قالب طباعة فارغ — تملأه بأي اسم تريد. `Generics` هو نفس الفكرة: قالب كود تملأه بأي نوع بيانات.
> **وجه الشبه:** القالب الفارغ = `<T>` أو `<E>` | النوع المحدد لاحقاً = الاسم الذي تكتبه في القالب.

**النص الأصلي يقول:** *"<T> <E> represents a formal generic type, which can be replaced later with an actual concrete type."*

**الشرح المبسّط:** `<T>` و`<E>` هما أسماء وهمية (placeholder) تضعها وقت تعريف الكلاس أو الدالة، ويُستبدلان بنوع حقيقي (`String`, `Integer`, ...) عند الاستخدام.

#### مثال مقارنة: قبل وبعد JDK 1.5

🔄 **قبل / بعد: تعريف `Comparable`**

**قبل:**
```java
// Prior to JDK 1.5 — Object-based, no type safety
public interface Comparable {
    public int compareTo(Object o);
}
```

**بعد:**
```java
// JDK 1.5+ — Generic version with type parameter
public interface Comparable<T> {
    public int compareTo(T o);
}
```

**ماذا تغيّر؟** النسخة الجديدة تُجبر المقارنة على نفس النوع — أخطاء النوع تظهر وقت الترجمة لا التشغيل.

#### مهم للامتحان ⚠️:
> الكود `Comparable c = new Date(); c.compareTo("red");` يُترجَم بنجاح لكنه يُعطي `ClassCastException` وقت التشغيل. أما `Comparable<Date> c = new Date(); c.compareTo("red");` فيُعطي خطأ ترجمة مباشرةً — وهذا هو الهدف من `Generics`.

**مثال من الامتحان:**
```
What happens when you write: Comparable c = new Date(); c.compareTo("red");
A) Compile error  B) Runtime error  C) No error  D) Logic error
```
**الإجابة: B** — توضيح: بدون `Generics` الكود يُترجم لكنه يفشل وقت التشغيل بـ `ClassCastException`.

---

### 1.1. ArrayList كـ Generic Class

**النص الأصلي يقول:** *"ArrayList is a generic class"*

**الشرح المبسّط:** `ArrayList<E>` تستبدل `Object` بـ `E` في كل الدوال، مما يضمن أن القائمة تحتوي نوعاً واحداً فقط، ويُلغي الحاجة للـ casting.

```java
// Correct: typed ArrayList — only Strings allowed
ArrayList<String> list = new ArrayList<>();
list.add("Red");         // correct
list.add(new Integer(1)); // compile error — type mismatch

// Cannot use primitive types directly
ArrayList<int> intList = new ArrayList<>();    // NOT correct
ArrayList<Integer> intList = new ArrayList<>(); // CORRECT — use wrapper class
intList.add(5); // autoboxing: int 5 → Integer automatically
```

#### شرح كل سطر:
1. `ArrayList<String>` → قائمة مقيّدة بـ `String` فقط — يمنع إضافة أنواع أخرى
2. `list.add("Red")` → صحيح لأن `"Red"` هي `String`
3. `list.add(new Integer(1))` → خطأ ترجمة — النوع `Integer` لا `String`
4. `ArrayList<int>` → خطأ — `Generics` لا تقبل الأنواع الأصلية (primitives)
5. `ArrayList<Integer>` → صحيح — `Integer` هو wrapper class لـ `int`
6. `intList.add(5)` → صحيح — **autoboxing** يحوّل `5` إلى `new Integer(5)` تلقائياً

#### 💡 التشبيه:
> `autoboxing` كالتغليف التلقائي: تضع هديةً (رقم `5`) في صندوق (`Integer`) تلقائياً عند الحاجة.
> **وجه الشبه:** الرقم الخام = `int` | الصندوق = `Integer`

**مثال `ArrayList<Double>`:**

```java
// Autoboxing and autounboxing with Double
ArrayList<Double> list = new ArrayList<>();
list.add(5.5);  // autoboxing: 5.5 → new Double(5.5)
list.add(3.0);  // autoboxing: 3.0 → new Double(3.0)
Double doubleObject = list.get(0); // no casting needed
double d = list.get(1);            // autounboxing: Double → double automatically
```

#### مهم للامتحان ⚠️:
> - **Autoboxing:** تحويل تلقائي من `int` → `Integer` عند الإضافة لمجموعة
> - **Autounboxing:** تحويل تلقائي من `Integer` → `int` عند الاسترجاع
> - `ArrayList<int>` → **خطأ دائماً** — استخدم `ArrayList<Integer>`

**مثال من الامتحان:**
```
Which declaration is INCORRECT?
A) ArrayList<String> list = new ArrayList<>();
B) ArrayList<Integer> list = new ArrayList<>();
C) ArrayList<int> list = new ArrayList<>();
D) ArrayList<Double> list = new ArrayList<>();
```
**الإجابة: C** — الأنواع الأصلية لا تُستخدم كـ type parameters.

---

### 2. Defining Generic Classes and Interfaces — تعريف كلاسات ودوال جنيريك

**النص الأصلي يقول:** *"A generic type can be defined for a class or interface. A concrete type must be specified when using the class to create an object or using the class or interface to declare a reference variable."*

**الشرح المبسّط:** عند تعريف الكلاس نضع `<E>` بعد الاسم. عند إنشاء الكائن نُحدد النوع الفعلي. مثال: `GenericStack<E>` يُصبح `GenericStack<String>` أو `GenericStack<Integer>`.

#### 💻 الكود: `GenericStack<E>`

#### ما هذا الكود؟
> كلاس `Stack` جنيريك يستخدم `ArrayList<E>` داخلياً. يُطبّق عمليات Stack الأساسية (push, pop, peek) مع أمان النوع.

```java
// Generic Stack class using ArrayList internally
public class GenericStack<E> {
    // internal list to store elements of type E
    private java.util.ArrayList<E> list = new java.util.ArrayList<>();

    // returns number of elements in stack
    public int getSize() {
        return list.size();
    }

    // returns top element without removing it
    public E peek() {
        return list.get(getSize() - 1);
    }

    // adds element to top of stack
    public void push(E o) {
        list.add(o);
    }

    // removes and returns top element
    public E pop() {
        E o = list.get(getSize() - 1); // get top element
        list.remove(getSize() - 1);    // remove it
        return o;
    }

    // returns true if stack is empty
    public boolean isEmpty() {
        return list.isEmpty();
    }

    // string representation of stack
    @Override
    public String toString() {
        return "stack: " + list.toString();
    }
}
```

#### شرح كل سطر:
1. `public class GenericStack<E>` → تعريف كلاس جنيريك — `E` اسم وهمي للنوع
2. `ArrayList<E> list` → القائمة الداخلية نفس نوع الـ Stack — تضمن تجانس البيانات
3. `public E peek()` → نوع الإرجاع `E` — يتغير حسب النوع المُحدد عند الإنشاء
4. `public void push(E o)` → المعامل `o` من نوع `E` — يمنع إضافة نوع خاطئ
5. `list.remove(getSize() - 1)` → يحذف العنصر الأخير (قمة الـ Stack)

**المكتبات المطلوبة:**
> `import java.util.ArrayList;`

**الناتج المتوقع:**
> يمكن إنشاء `GenericStack<String>` أو `GenericStack<Integer>` — كل منهما يعمل بأمان نوع كامل.

```java
// Test: creating typed stacks
class GenericStackTest {
    public static void main(String[] args) {
        GenericStack<String> stack1 = new GenericStack<>();
        stack1.push("London");
        stack1.push("Paris");
        stack1.push("Berlin");

        GenericStack<Integer> stack2 = new GenericStack<>();
        stack2.push(1);
        stack2.push(2);
        stack2.push(3);
    }
}
```

**مثال من الامتحان:**
```
To define a generic type for a class, where do you place the type parameter?
A) Before the class name   B) After the class name
C) After the extends keyword  D) Inside the constructor
```
**الإجابة: B** — مثال: `class GenericStack<E>` — النوع بعد اسم الكلاس مباشرةً.

---

### 3. Generic Methods — الدوال الجنيريك

**النص الأصلي يقول:** *"A generic type can be defined for a static method."*

**الشرح المبسّط:** يمكن تعريف نوع جنيريك لدالة منفردة بوضع `<E>` قبل نوع الإرجاع. هذه الدالة تعمل مع أي نوع دون تكرار الكود.

#### 💻 الكود: `GenericMethodDemo`

#### ما هذا الكود؟
> دالة `print` جنيريك تطبع مصفوفة من أي نوع. نفس الدالة تعمل مع `Integer[]` و`String[]`.

```java
// Generic method demo — one method for all array types
public class GenericMethodDemo {
    public static void main(String[] args) {
        Integer[] integers = {1, 2, 3, 4, 5};
        String[] strings = {"London", "Paris", "New York", "Austin"};

        // calling generic method with explicit type
        GenericMethodDemo.<Integer>print(integers);
        GenericMethodDemo.<String>print(strings);
    }

    // generic static method — E defined before return type
    public static <E> void print(E[] list) {
        for (int i = 0; i < list.length; i++)
            System.out.print(list[i] + " "); // print each element
        System.out.println(); // newline after each array
    }
}
```

#### شرح كل سطر:
1. `public static <E> void print(E[] list)` → `<E>` قبل `void` = تعريف النوع الجنيريك للدالة
2. `GenericMethodDemo.<Integer>print(integers)` → استدعاء صريح بتحديد النوع
3. `for (int i = 0; ...)` → يتكرر على كل عنصر بغض النظر عن نوعه

**الناتج المتوقع:**
> ```
> 1 2 3 4 5
> London Paris New York Austin
> ```

#### مهم للامتحان ⚠️:
> - تعريف النوع في كلاس: `class MyClass<E>` — بعد اسم الكلاس
> - تعريف النوع في دالة: `public static <E> void max(E o1, E o2)` — **قبل** نوع الإرجاع
> - الفرق الجوهري: النوع في الكلاس يُحدد مرة عند إنشاء الكائن، أما في الدالة فيُحدد عند كل استدعاء.

**مثال من الامتحان:**
```
To define a generic type for a method, where do you place the type parameter?
A) After the method name  B) Before the return type
C) After the return type  D) Inside the parentheses only
```
**الإجابة: B** — مثال: `public static <E> void print(E[] list)`

---

### 4. Bounded Type Parameters — تحديد حد للنوع الجنيريك

**النص الأصلي يقول:** *"`<E extends GeometricObject>` — E is a subtype of GeometricObject"*

**الشرح المبسّط:** أحياناً نريد تقييد النوع الجنيريك بحيث يكون فئةً فرعية من كلاس معين. نستخدم `extends` لذلك — مما يتيح استخدام دوال الكلاس الأب داخل الدالة الجنيريك.

```java
// BoundedTypeDemo — generic method restricted to GeometricObject subtypes
public class BoundedTypeDemo {
    public static void main(String[] args) {
        Rectangle rrr = new Rectangle(2, 2);
        Circle ccc = new Circle(2);
        // E must be GeometricObject or its subtype
        System.out.println("Same area? " + equalArea(rrr, ccc));
    }

    // <E extends GeometricObject> means E must be GeometricObject or subclass
    public static <E extends GeometricObject> boolean equalArea(E object1, E object2) {
        return object1.getArea() == object2.getArea(); // can call getArea() because E extends GeometricObject
    }
}
```

#### شرح كل سطر:
1. `<E extends GeometricObject>` → `E` يجب أن يكون `GeometricObject` أو كلاساً يرثه
2. `object1.getArea()` → مسموح لأن `E` مضمون أن يملك `getArea()` من الكلاس الأب

💡 **التشبيه:**
> مثل وصفة طبية تقول "أي مسكّن ألم" — تحديد النوع (`extends`) يضمن أن الدواء ينتمي لفئة المسكّنات.
> **وجه الشبه:** `GeometricObject` = فئة المسكّنات | `Rectangle`, `Circle` = أنواع محددة منها

**مثال من الامتحان:**
```
Why do we use <E extends GeometricObject> instead of just <E>?
A) To allow any type  B) To enable calling getArea() on E
C) To restrict to primitive types  D) To allow null values
```
**الإجابة: B** — `extends` يضمن وجود دوال `GeometricObject` في النوع `E`.

---

### 4.1. Case Study: Sorting an Array of Objects

**النص الأصلي يقول:** *"You can develop a generic method for sorting an array of Comparable objects."*

**الشرح المبسّط:** بدمج `<E extends Comparable<E>>` مع خوارزمية الفرز، نكتب دالة فرز واحدة تعمل مع `Integer[]`، `String[]`، `Character[]`، أي نوع يُطبّق `Comparable`.

```java
// Generic selection sort — works with any Comparable type
public static <E extends Comparable<E>> void sort(E[] list) {
    E currentMin;
    int currentMinIndex;
    for (int i = 0; i < list.length - 1; i++) {
        currentMin = list[i];      // assume current is minimum
        currentMinIndex = i;
        for (int j = i + 1; j < list.length; j++) {
            if (currentMin.compareTo(list[j]) > 0) { // compare using Comparable
                currentMin = list[j];
                currentMinIndex = j;
            }
        }
        if (currentMinIndex != i) {  // swap if needed
            list[currentMinIndex] = list[i];
            list[i] = currentMin;
        }
    }
}

// Prints any Object array
public static void printList(Object[] list) {
    for (int i = 0; i < list.length; i++)
        System.out.print(list[i] + " ");
    System.out.println();
}
```

#### ⚙️ خوارزمية Selection Sort الجنيريك:

#### ما هدف هذه العملية؟
> فرز مصفوفة من أي نوع يُطبّق `Comparable` — دون كتابة دوال فرز منفصلة لكل نوع.

```algorithm
1 | تحديد حد النوع | <E extends Comparable<E>> | E يجب أن يملك compareTo()
2 | حلقة خارجية | for i=0 to length-2 | تحديد موضع كل عنصر
3 | افتراض الحد الأدنى | currentMin = list[i] | نبدأ من العنصر الحالي
4 | حلقة داخلية | for j=i+1 to end | البحث عن أصغر عنصر في الباقي
5 | المقارنة | compareTo(list[j]) > 0 | إذا وجدنا أصغر، نحدّث currentMin
6 | المبادلة | if currentMinIndex != i | نبدّل العنصر الحالي مع الأصغر
```

**مثال من الامتحان:**
```
What does <E extends Comparable<E>> guarantee in the sort method?
A) E can be any type  B) E has a compareTo method for type E
C) E extends Object only  D) E is a primitive type
```
**الإجابة: B** — `Comparable<E>` يعني `compareTo` يأخذ معاملاً من نفس النوع `E`.

---

### 5. Wildcard Generic Types — أنواع Wildcard الجنيريكية

**النص الأصلي يقول:** *"You can use unbounded wildcards, bounded wildcards, or lower bound wildcards to specify a range for a generic type."*

**الشرح المبسّط:** أحياناً لا نريد تقييد النوع تماماً، بل نريد أن نقبل "مجموعة من أي نوع" أو "من نوع فرعي" — هنا يأتي دور `?` الـ wildcard.

#### جدول أنواع Wildcard:

| الصيغة | الاسم | المعنى |
|---|---|---|
| `?` | `Unbounded wildcard` | أي نوع (= `? extends Object`) |
| `? extends T` | `Bounded wildcard` | `T` أو أي كلاس يرث من `T` |
| `? super T` | `Lower bound wildcard` | `T` أو أي كلاس تعلو عليه هرمياً |

#### المشكلة التي تحلها Wildcards:

```java
// PROBLEM: GenericStack<Integer> is NOT a GenericStack<Number>
// This causes a compile error:
public static double max(GenericStack<Number> stack) { ... }

GenericStack<Integer> intStack = new GenericStack<>();
max(intStack); // COMPILE ERROR — Integer stack is not Number stack
```

**الفهم الخاطئ ❌:** `GenericStack<Integer>` هي نوع فرعي من `GenericStack<Number>` لأن `Integer extends Number`
**الفهم الصحيح ✅:** في `Generics`، `GenericStack<Integer>` **ليست** نوعاً فرعياً من `GenericStack<Number>` — يجب استخدام `wildcard`.

#### الحل: `? extends Number`

```java
// SOLUTION: use bounded wildcard
public static double max(GenericStack<? extends Number> stack) {
    double max = stack.pop().doubleValue();
    while (!stack.isEmpty()) {
        double value = stack.pop().doubleValue();
        if (value > max) max = value;
    }
    return max;
}
// Now accepts: GenericStack<Integer>, GenericStack<Double>, GenericStack<Float>...
```

#### مهم للامتحان ⚠️:
> `Number` هو كلاس مجرّد (abstract) أبٌ لـ: `Double`, `Float`, `Long`, `Integer`, `Short`, `Byte`, `BigInteger`, `BigDecimal`.
> لذا `GenericStack<? extends Number>` يقبل Stack لأي من هذه الأنواع.

#### 💻 مثال Unbounded Wildcard `<?>`:

```java
// AnyWildCardDemo — print any type of GenericStack
public class AnyWildCardDemo {
    public static void main(String[] args) {
        GenericStack<Integer> intStack = new GenericStack<>();
        intStack.push(1);
        intStack.push(2);
        intStack.push(-2);
        print(intStack); // output: -2 2 1
    }

    // <?> = <? extends Object> — accepts any type
    public static void print(GenericStack<?> stack) {
        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + " ");
        }
    }
}
```

**الناتج المتوقع:** `-2 2 1`

#### 💻 مثال Lower Bound Wildcard `? super T`:

```java
// SuperWildCardDemo — add elements from one stack to another
public class SuperWildCardDemo {
    public static void main(String[] args) {
        GenericStack<String> stack1 = new GenericStack<>();
        GenericStack<Object> stack2 = new GenericStack<>();
        stack2.push("Java");
        stack2.push(2);
        stack1.push("Sun");
        add(stack1, stack2); // moves stack1 into stack2
        AnyWildCardDemo.print(stack2); // Sun 2 Java
    }

    // stack2 must be T or supertype of T — ensures safe assignment
    public static <T> void add(GenericStack<T> stack1, GenericStack<? super T> stack2) {
        while (!stack1.isEmpty())
            stack2.push(stack1.pop());
    }
}
```

**الناتج المتوقع:** `Sun 2 Java`

🤔 **تفعيل الفهم (اسأل نفسك):**
> **سؤال:** لماذا `GenericStack<Integer>` ليست نوعاً فرعياً من `GenericStack<Number>` رغم أن `Integer extends Number`؟
> **لماذا هذا مهم؟** لأن السماح بذلك سيُفقد أمان النوع — يمكن إضافة `Double` لـ `Stack<Integer>` عبر مرجع `Stack<Number>`.

**مثال من الامتحان:**
```
Which wildcard allows a method to accept GenericStack<Integer> and GenericStack<Double>?
A) GenericStack<Number>   B) GenericStack<? extends Number>
C) GenericStack<? super Number>   D) GenericStack<Object>
```
**الإجابة: B** — `? extends Number` يقبل أي نوع يرث `Number`.

---

### 6. Collections — المجموعات

**النص الأصلي يقول:** *"Choosing the best data structures and algorithms key to developing high-performance software."*

**الشرح المبسّط:** `Collections Framework` هو مجموعة من الواجهات والكلاسات الجاهزة لتخزين وإدارة البيانات. الاختيار الصحيح للهيكل يُحدد كفاءة البرنامج.

#### 📊 المخطط: هرم Collections

#### ما هذا المخطط؟
> يوضّح العلاقة الهرمية بين الواجهات والكلاسات المجردة والكلاسات الملموسة في Collections Framework.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
|---|---|---|---|
| 1 | `Collection<E>` | interface | الواجهة الأساسية لكل المجموعات |
| 2 | `Set<E>` | interface | مجموعة لا تسمح بالتكرار |
| 3 | `List<E>` | interface | مجموعة مرتبة تسمح بالتكرار والوصول بالفهرس |
| 4 | `Queue<E>` | interface | مجموعة FIFO |
| 5 | `AbstractCollection<E>` | abstract class | تنفيذ جزئي لـ Collection |
| 6 | `AbstractList<E>` | abstract class | تنفيذ جزئي لـ List |
| 7 | `ArrayList<E>` | concrete class | قائمة تعتمد على مصفوفة ديناميكية |
| 8 | `LinkedList<E>` | concrete class | قائمة مرتبطة — تُنفّذ List وDeque |
| 9 | `HashSet<E>` | concrete class | مجموعة بدون ترتيب بدون تكرار |
| 10 | `TreeSet<E>` | concrete class | مجموعة مرتبة بدون تكرار |
| 11 | `PriorityQueue<E>` | concrete class | Queue بحسب الأولوية |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|---|---|---|---|---|
| `Set` | `Collection` | implements | إرث واجهة | Set ترث Collection |
| `List` | `Collection` | implements | إرث واجهة | List ترث Collection |
| `ArrayList` | `AbstractList` | extends | إرث كلاس | ArrayList ترث AbstractList |
| `LinkedList` | `AbstractSequentialList` | extends | إرث كلاس | LinkedList ترث AbstractSequentialList |
| `HashSet` | `AbstractSet` | extends | إرث كلاس | HashSet ترث AbstractSet |
| `TreeSet` | `NavigableSet` | implements | تنفيذ واجهة | TreeSet تُنفّذ NavigableSet |

```diagram
type: class
title: Java Collections Framework Hierarchy
direction: TD
nodes:
  - id: collection
    label: "«interface» Collection<E>"
    kind: interface
    level: 0
  - id: set
    label: "«interface» Set<E>"
    kind: interface
    level: 1
  - id: list
    label: "«interface» List<E>"
    kind: interface
    level: 1
  - id: queue
    label: "«interface» Queue<E>"
    kind: interface
    level: 1
  - id: hashset
    label: "HashSet<E>"
    kind: class
    level: 2
  - id: treeset
    label: "TreeSet<E>"
    kind: class
    level: 2
  - id: arraylist
    label: "ArrayList<E>"
    kind: class
    level: 2
  - id: linkedlist
    label: "LinkedList<E>"
    kind: class
    level: 2
  - id: priorityqueue
    label: "PriorityQueue<E>"
    kind: class
    level: 2
edges:
  - from: set
    to: collection
    label: extends
    arrow: inheritance
  - from: list
    to: collection
    label: extends
    arrow: inheritance
  - from: queue
    to: collection
    label: extends
    arrow: inheritance
  - from: hashset
    to: set
    label: implements
    arrow: realization
  - from: treeset
    to: set
    label: implements
    arrow: realization
  - from: arraylist
    to: list
    label: implements
    arrow: realization
  - from: linkedlist
    to: list
    label: implements
    arrow: realization
  - from: priorityqueue
    to: queue
    label: implements
    arrow: realization
```

---

### 6.1. واجهة `Collection<E>` — الدوال الأساسية

**النص الأصلي يقول:** *"Each collection is Iterable. Iterator object to traverse all elements in collection."*

**الشرح المبسّط:** كل مجموعة في Java تُطبّق `Iterable` مما يتيح استخدام `Iterator` للتنقل بين عناصرها. يمكن أيضاً استخدام حلقة `for-each` المختصرة.

#### جدول أهم دوال `Collection<E>`:

| الدالة | الوصف |
|---|---|
| `add(e)` | يضيف عنصراً |
| `addAll(c)` | يضيف كل عناصر c |
| `remove(o)` | يحذف عنصراً |
| `removeAll(c)` | يحذف كل عناصر c |
| `retainAll(c)` | يُبقي فقط العناصر المشتركة مع c (تقاطع) |
| `contains(o)` | يتحقق من وجود العنصر |
| `containsAll(c)` | يتحقق من وجود كل عناصر c |
| `size()` | يُرجع عدد العناصر |
| `isEmpty()` | يتحقق من الفراغ |
| `clear()` | يُفرغ المجموعة |
| `toArray()` | يحوّل لمصفوفة |
| `iterator()` | يُرجع `Iterator` للتنقل |
| `forEach(action)` | يُطبّق action على كل عنصر (Java 8) |

```java
// TestCollection — demonstrating basic Collection operations
import java.util.*;
public class TestCollection {
    public static void main(String[] args) {
        ArrayList<String> coll1 = new ArrayList<>();
        coll1.add("New York");
        coll1.add("Atlanta");
        coll1.add("Dallas");
        coll1.add("Madison");
        System.out.println(coll1);          // [New York, Atlanta, Dallas, Madison]
        System.out.println(coll1.contains("Dallas")); // true
        coll1.remove("Dallas");
        System.out.println(coll1.size());   // 3

        Collection<String> coll2 = new ArrayList<>();
        coll2.add("Seattle");
        coll2.add("Portland");
        coll2.add("Los Angeles");
        coll2.add("Atlanta");
        System.out.println(coll2); // [Seattle, Portland, Los Angeles, Atlanta]

        // union: coll1 OR coll2
        ArrayList<String> c1 = (ArrayList<String>)(coll1.clone());
        c1.addAll(coll2);
        System.out.println(c1); // [New York, Atlanta, Madison, Seattle, Portland, Los Angeles, Atlanta]

        // intersection: coll1 AND coll2
        c1 = (ArrayList<String>)(coll1.clone());
        c1.retainAll(coll2);
        System.out.println(c1); // [Atlanta]

        // difference: in coll1 but NOT in coll2
        c1 = (ArrayList<String>)(coll1.clone());
        c1.removeAll(coll2);
        System.out.println(c1); // [New York, Madison]
    }
}
```

**الناتج المتوقع:**
> ```
> [New York, Atlanta, Dallas, Madison]
> true
> 3
> [Seattle, Portland, Los Angeles, Atlanta]
> [New York, Atlanta, Madison, Seattle, Portland, Los Angeles, Atlanta]
> [Atlanta]
> [New York, Madison]
> ```

---

### 6.2. Iterators — التنقل بين عناصر المجموعة

**النص الأصلي يقول:** *"Each collection is Iterable. You can obtain its Iterator object to traverse all the elements in the collection."*

**الشرح المبسّط:** `Iterator` يُتيح التنقل الأمامي بين عناصر أي مجموعة. يمكن أيضاً استخدام `for-each` كاختصار.

```java
// TestIterator — three ways to traverse a collection
import java.util.*;
public class TestIterator {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();
        coll.add("New York");
        coll.add("Atlanta");
        coll.add("Dallas");
        coll.add("Madison");

        // Method 1: Iterator
        Iterator<String> iter = coll.iterator();
        while (iter.hasNext()) {
            System.out.print(iter.next().toUpperCase() + " ");
        }

        // Method 2: for-each loop (syntactic sugar for iterator)
        for (String ele : coll)
            System.out.print(ele.toUpperCase() + " ");

        // Method 3: forEach with lambda (Java 8)
        coll.forEach(e -> System.out.print(e.toUpperCase() + " "));
    }
}
```

**الناتج المتوقع:** `NEW YORK ATLANTA DALLAS MADISON`

#### مهم للامتحان ⚠️:
> - `Iterator` له دالتان رئيسيتان: `hasNext()` و`next()`
> - `forEach` هي دالة `default` في واجهة `Iterable` (Java 8) — تأخذ `Consumer` كـ lambda
> - `Consumer` هي `functional interface` لها دالة `accept(E e)`

---

### 7. Lists — ArrayList و LinkedList

**النص الأصلي يقول:** *"The List interface extends the Collection interface and defines a collection for storing elements in a sequential order."*

**الشرح المبسّط:** `List` تُضيف على `Collection` إمكانية الوصول بالفهرس والإضافة في موضع محدد. `ArrayList` للوصول السريع، `LinkedList` للإدراج والحذف السريع.

#### ⚖️ المقايضة: `ArrayList` مقابل `LinkedList`

| | `ArrayList` | `LinkedList` |
|---|---|---|
| المزايا | وصول عشوائي `O(1)` بالفهرس | إدراج/حذف سريع `O(1)` من البداية والنهاية |
| العيوب | إدراج/حذف بطيء في المنتصف `O(n)` | وصول بطيء بالفهرس `O(n)` |
| متى تختاره | كثرة القراءة والوصول بالفهرس | كثرة الإضافة/الحذف من الأطراف |

```java
// ArrayList and LinkedList demo
import java.util.*;
public class TestArrayAndLinkedList {
    public static void main(String[] args) {
        // ArrayList operations
        List<Integer> arrlis = new ArrayList<>();
        arrlis.add(1); arrlis.add(2); arrlis.add(3);
        arrlis.add(1); arrlis.add(4);
        arrlis.add(0, 10);  // insert 10 at index 0
        arrlis.add(3, 30);  // insert 30 at index 3
        System.out.println("Array list: " + arrlis); // [10, 1, 2, 30, 3, 1, 4]

        // LinkedList — extra operations at head/tail
        LinkedList<Object> linst = new LinkedList<Object>(arrlis);
        linst.add(1, "red");    // insert "red" at index 1
        linst.removeLast();     // remove last element
        linst.addFirst("green"); // add "green" at head

        // Forward traversal using ListIterator
        ListIterator<Object> listter = linst.listIterator();
        System.out.print("Forward: ");
        while (listter.hasNext())
            System.out.print(listter.next() + " ");

        // Backward traversal
        listter = linst.listIterator(linst.size()); // start from end
        System.out.print("\nBackward: ");
        while (listter.hasPrevious())
            System.out.print(listter.previous() + " ");
    }
}
```

**الناتج المتوقع:**
> ```
> Forward: green 10 red 1 2 30 3 1
> Backward: 1 3 30 2 1 red 10 green
> ```

#### مهم للامتحان ⚠️:
> `LinkedList` تُنفّذ `Deque` و`Queue` — لها دوال إضافية مثل:
> `addFirst()`, `addLast()`, `removeFirst()`, `removeLast()`, `getFirst()`, `getLast()`

---

### 7.1. Static Methods for Lists — دوال Collections الساكنة

**النص الأصلي يقول:** *"The Collections class contains static methods to perform common operations in a collection and a list."*

#### جدول دوال `java.util.Collections`:

| الدالة | الوصف |
|---|---|
| `sort(list)` | فرز القائمة تصاعدياً |
| `sort(list, comparator)` | فرز بمقارن مخصص |
| `binarySearch(list, key)` | بحث ثنائي — القائمة يجب أن تكون مرتبة |
| `reverse(list)` | عكس ترتيب القائمة |
| `reverseOrder()` | يُرجع `Comparator` للترتيب التنازلي |
| `shuffle(list)` | خلط عشوائي |
| `copy(des, src)` | نسخ القائمة |
| `max(collection)` | أكبر عنصر |
| `min(collection)` | أصغر عنصر |
| `frequency(c, o)` | عدد تكرارات عنصر |
| `disjoint(c1, c2)` | `true` إذا لا يوجد عناصر مشتركة |

```java
// Collections static methods demo
import java.util.Collections;
import java.util.List;
import java.util.Arrays;
public class SortStringByLength2 {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("yellow", "red", "green", "blue");

        // sort alphabetically
        Collections.sort(list);
        System.out.println(list); // [blue, green, red, yellow]

        // sort in reverse order
        Collections.sort(list, Collections.reverseOrder());
        System.out.println(list); // [yellow, red, green, blue]

        // binary search (list must be sorted first)
        List<Integer> list1 = Arrays.asList(2, 4, 7, 10, 11, 45, 50, 59, 60, 66);
        System.out.println("Index: " + Collections.binarySearch(list1, 7));  // 2
        System.out.println("Index: " + Collections.binarySearch(list1, 9)); // -4
    }
}
```

**الناتج المتوقع:**
> ```
> [blue, green, red, yellow]
> [yellow, red, green, blue]
> 2
> -4
> ```

#### ملاحظة:
> نتيجة `binarySearch` السالبة (-4) تعني أن العنصر غير موجود، والقيمة `-(insertion point) - 1` تشير لموضع الإدراج المناسب.

---

### 8. Vector و Stack Classes

**النص الأصلي يقول:** *"Vector is a subclass of AbstractList and Stack is a subclass of Vector in the Java API."*

**الشرح المبسّط:** `Vector` مشابه لـ `ArrayList` لكنه `synchronized` (آمن للخيوط المتعددة). `Stack` يرث `Vector` ويضيف عمليات LIFO.

#### ⚖️ المقايضة: `ArrayList` مقابل `Vector`

| | `ArrayList` | `Vector` |
|---|---|---|
| المزايا | أسرع في بيئة أحادية الخيط | آمن في بيئة متعددة الخيوط |
| العيوب | غير آمن للخيوط المتعددة | أبطأ بسبب `synchronized` |
| متى تختاره | التطبيقات العادية | عند الحاجة لـ thread-safety |

```java
// Stack demo — LIFO (Last In First Out)
import java.util.Stack;
public class StackDemo {
    public static void main(String[] args) {
        Stack<String> words = new Stack<String>();
        words.push("Hello");      // add to top
        words.push("world");
        words.push("with");
        words.push("my regards");
        words.push("?"); words.push("?"); words.push("!");

        // pop last 4 elements (undo operation)
        for (int i = 11; i <= 14; i++) {
            String w = words.pop(); // remove from top
            System.out.println("Undo " + w);
        }
        System.out.println(words); // [Hello, world, with]
    }
}
```

**الناتج المتوقع:**
> ```
> Undo !
> Undo ?
> Undo ?
> Undo my regards
> [Hello, world, with]
> ```

#### مهم للامتحان ⚠️:
> دوال `Stack`: `push(o)`, `pop()`, `peek()`, `empty()`, `search(o)`
> `search(o)` يُرجع موضع العنصر من قمة الـ Stack (1 = القمة)

---

### 9. Queues و Priority Queues

**النص الأصلي يقول:** *"In a priority queue, the element with the highest priority is removed first."*

**الشرح المبسّط:** `Queue` العادية FIFO (أول داخل أول خارج). `PriorityQueue` تُخرج أصغر عنصر أولاً (حسب `Comparable` أو `Comparator` مخصص).

#### دوال `Queue<E>`:

| الدالة | الوصف | عند الفشل |
|---|---|---|
| `offer(e)` | يضيف عنصر | يُرجع `false` |
| `poll()` | يُزيل ويُرجع رأس القائمة | يُرجع `null` |
| `remove()` | يُزيل ويُرجع رأس القائمة | يرمي استثناء |
| `peek()` | يُرجع رأس القائمة بدون إزالة | يُرجع `null` |
| `element()` | يُرجع رأس القائمة بدون إزالة | يرمي استثناء |

```java
// PriorityQueue demo
import java.util.*;
public class PriorityQueueDemo {
    public static void main(String[] args) {
        // Default: natural ordering (alphabetical for String)
        PriorityQueue<String> queue1 = new PriorityQueue<>();
        queue1.offer("Oklahoma"); queue1.offer("Indiana");
        queue1.offer("Georgia"); queue1.offer("Texas");
        System.out.println("Priority queue using Comparable:");
        while (queue1.size() > 0)
            System.out.print(queue1.remove() + " ");
        // Output: Georgia Indiana Oklahoma Texas

        // Reverse ordering using Comparator
        PriorityQueue<String> queue2 = new PriorityQueue<>(4, Collections.reverseOrder());
        queue2.offer("Oklahoma"); queue2.offer("Indiana");
        queue2.offer("Georgia"); queue2.offer("Texas");
        System.out.println("\nPriority queue using Comparator:");
        while (queue2.size() > 0)
            System.out.print(queue2.remove() + " ");
        // Output: Texas Oklahoma Indiana Georgia
    }
}
```

**الناتج المتوقع:**
> ```
> Priority queue using Comparable:
> Georgia Indiana Oklahoma Texas
> Priority queue using Comparator:
> Texas Oklahoma Indiana Georgia
> ```

🤔 **تفعيل الفهم (اسأل نفسك):**
> **سؤال:** لماذا `PriorityQueue` تُخرج "Georgia" أولاً من بين {"Oklahoma", "Indiana", "Georgia", "Texas"}؟
> **لماذا هذا مهم؟** لأن الترتيب الافتراضي في `PriorityQueue<String>` هو الترتيب الأبجدي (`Comparable`) — G يسبق I, O, T.

---

### 10. Sets — HashSet و LinkedHashSet و TreeSet

**النص الأصلي يقول:** (من خلال أمثلة الكود) مجموعات لا تسمح بتكرار العناصر

**الشرح المبسّط:** `Set` يُشبه مجموعة رياضية — لا عناصر مكررة. ثلاثة تنفيذات بخصائص مختلفة:

#### جدول مقارنة أنواع `Set`:

| | `HashSet` | `LinkedHashSet` | `TreeSet` |
|---|---|---|---|
| الترتيب | لا ترتيب | ترتيب الإدراج | ترتيب طبيعي (أبجدي/رقمي) |
| السرعة | `O(1)` | `O(1)` | `O(log n)` |
| الفرز | لا | لا | نعم |
| الواجهة | `Set` | `Set` | `NavigableSet` → `SortedSet` |

```java
// HashSet vs LinkedHashSet
import java.util.*;
public class TestHashSet {
    public static void main(String[] args) {
        // HashSet — no order guaranteed
        Set<String> HS = new HashSet<>();
        HS.add("London"); HS.add("Paris");
        HS.add("New York"); HS.add("San Francisco");
        HS.add("Beijing"); HS.add("New York"); // duplicate — ignored
        System.out.println(HS); // [San Francisco, Beijing, New York, London, Paris] — random order
        for (String s: HS)
            System.out.print(s.toUpperCase() + " ");
    }
}
```

**الناتج المتوقع (HashSet):** `[San Francisco, Beijing, New York, London, Paris]` — ترتيب عشوائي

#### دوال `TreeSet` الإضافية:

```java
// TreeSet — sorted set with navigation methods
Set<String> set0 = new HashSet<>();
set0.add("London"); set0.add("Paris"); set0.add("New York");
set0.add("San Francisco"); set0.add("Beijing"); set0.add("New York");

TreeSet<String> treeSet1 = new TreeSet<>(set0); // sorted automatically
System.out.println(treeSet1);                // [Beijing, London, New York, Paris, San Francisco]
System.out.println(treeSet1.first());        // Beijing
System.out.println(treeSet1.last());         // San Francisco
System.out.println(treeSet1.headSet("New York")); // [Beijing, London] — less than "New York"
System.out.println(treeSet1.tailSet("New York")); // [New York, Paris, San Francisco] — >= "New York"
System.out.println(treeSet1.lower("P"));    // New York — largest < "P"
System.out.println(treeSet1.higher("P"));   // Paris — smallest > "P"
System.out.println(treeSet1.floor("P"));    // Paris — largest <= "P" (no exact match → largest < "P" = New York? Wait: floor = <=)
System.out.println(treeSet1.pollFirst());    // Beijing — remove and return first
System.out.println(treeSet1.pollLast());     // San Francisco — remove and return last
```

**الناتج المتوقع:**
> ```
> [Beijing, London, New York, Paris, San Francisco]
> Beijing
> San Francisco
> [Beijing, London]
> [New York, Paris, San Francisco]
> New York
> San Francisco
> Paris
> Beijing
> San Francisco
> [London, New York, Paris]
> ```

#### جدول دوال `NavigableSet` (`TreeSet`):

| الدالة | المعنى |
|---|---|
| `first()` | أصغر عنصر |
| `last()` | أكبر عنصر |
| `headSet(e)` | العناصر الأصغر تماماً من e |
| `tailSet(e)` | العناصر أكبر من أو تساوي e |
| `lower(e)` | أكبر عنصر أصغر تماماً من e (`<`) |
| `higher(e)` | أصغر عنصر أكبر تماماً من e (`>`) |
| `floor(e)` | أكبر عنصر أصغر أو يساوي e (`<=`) |
| `ceiling(e)` | أصغر عنصر أكبر أو يساوي e (`>=`) |
| `pollFirst()` | يُزيل ويُرجع أصغر عنصر |
| `pollLast()` | يُزيل ويُرجع أكبر عنصر |

**مثال من الامتحان:**
```
For TreeSet<String> containing {Beijing, London, New York, Paris}, what does lower("P") return?
A) Paris  B) New York  C) London  D) null
```
**الإجابة: B** — `lower("P")` يُرجع أكبر عنصر أصغر تماماً من "P" — "New York" < "P" < "Paris"

---

### 11. Maps — HashMap و TreeMap و LinkedHashMap

**النص الأصلي يقول:** (من الشرائح) خريطة تربط مفاتيح بقيم، كل مفتاح فريد.

**الشرح المبسّط:** `Map` يخزن أزواج (مفتاح-قيمة). المفتاح فريد، لكن القيمة قد تتكرر. ثلاثة تنفيذات كما في `Set`.

#### جدول مقارنة أنواع `Map`:

| | `HashMap` | `LinkedHashMap` | `TreeMap` |
|---|---|---|---|
| الترتيب | لا ترتيب | ترتيب الإدراج | ترتيب المفاتيح |
| السرعة | `O(1)` | `O(1)` | `O(log n)` |
| null keys | يقبل | يقبل | لا يقبل |

#### جدول دوال `Map<K,V>`:

| الدالة | الوصف |
|---|---|
| `put(key, value)` | يضيف أو يُحدّث زوجاً |
| `get(key)` | يُرجع القيمة أو `null` |
| `remove(key)` | يحذف الزوج |
| `containsKey(key)` | يتحقق من وجود المفتاح |
| `containsValue(value)` | يتحقق من وجود القيمة |
| `keySet()` | يُرجع `Set` من المفاتيح |
| `values()` | يُرجع `Collection` من القيم |
| `entrySet()` | يُرجع `Set<Map.Entry<K,V>>` |
| `size()` | عدد الأزواج |

```java
// CountOccurrenceOfWords — TreeMap word frequency counter
import java.util.*;
public class CountOccurrenceOfWords {
    public static void main(String[] args) {
        String text = "Good morning. Have a good class. Have a good visit. Have fun!";
        Map<String, Integer> map = new TreeMap<>();
        String[] words = text.split("[\\s+\\p{P}]"); // split by space/punctuation

        for (int i = 0; i < words.length; i++) {
            String key = words[i].toLowerCase();
            if (key.length() > 0) {
                if (!map.containsKey(key)) {
                    map.put(key, 1);       // first occurrence
                } else {
                    int value = map.get(key);
                    value++;
                    map.put(key, value);   // increment count
                }
            }
        }
        // forEach with lambda (Java 8)
        map.forEach((k, v) -> System.out.println(k + "\t" + v));
    }
}
```

**الناتج المتوقع:**
> ```
> a       2
> class   1
> fun     1
> good    3
> have    3
> morning 1
> visit   1
> ```

---

### 12. Comparable و Comparator — ترتيب الكائنات

**النص الأصلي يقول:** *"Comparable provides a single sorting sequence. Comparator provides multiple sorting sequences."*

#### جدول مقارنة `Comparable` مقابل `Comparator`:

| | `Comparable` | `Comparator` |
|---|---|---|
| الحزمة | `java.lang` | `java.util` |
| الدالة | `compareTo(Object o)` | `compare(Object o1, Object o2)` |
| الفرز | ترتيب واحد فقط | ترتيبات متعددة |
| التأثير على الكلاس | يُعدّل الكلاس نفسه | لا يُعدّل الكلاس |
| الاستخدام | `Collections.sort(list)` | `Collections.sort(list, comparator)` |

#### مثال `Comparable` — Student بالعمر:

```java
// Student class implementing Comparable by age
class Student implements Comparable<Student> {
    int rollno;
    String name;
    int age;

    Student(int rollno, String name, int age) {
        this.rollno = rollno;
        this.name = name;
        this.age = age;
    }

    // define natural ordering by age
    public int compareTo(Student st) {
        if (age == st.age) return 0;
        else if (age > st.age) return 1;
        else return -1;
    }

    public String getName() { return name; }
    public int getAge() { return age; }
}

// Usage:
ArrayList<Student> al = new ArrayList<>();
al.add(new Student(101, "Vijay", 23));
al.add(new Student(106, "Ajay", 27));
al.add(new Student(105, "Jai", 21));
Collections.sort(al); // sorts by age (natural order)
```

**الناتج المتوقع:** `105 Jai 21 | 101 Vijay 23 | 106 Ajay 27`

#### مثال `Comparator` — ترتيبات متعددة:

```java
// Multiple sort criteria using Comparator
Comparator<Student> byName = Comparator.comparing(Student::getName);
Comparator<Student> byAge  = Comparator.comparing(Student::getAge);

Collections.sort(al, byName); // sort by name
Collections.sort(al, byAge);  // sort by age

// Lambda equivalent:
Collections.sort(al, (s1, s2) -> s1.getName().compareTo(s2.getName()));

// Arrays.sort with lambda:
String[] cities = {"Atlanta", "Savannah", "New York", "Dallas"};
java.util.Arrays.sort(cities, (s1, s2) -> s1.length() - s2.length());
// Result: Dallas Atlanta Savannah New York9
```

#### مهم للامتحان ⚠️:
> `Comparator.comparing(Student::getName)` هي طريقة Java 8 باستخدام `method reference` — تُعادل `Comparator.comparing(s -> s.getName())`

**مثال من الامتحان:**
```
Which interface should a class implement to define its natural ordering?
A) Comparator  B) Comparable  C) Iterator  D) Iterable
```
**الإجابة: B** — `Comparable` يُعرّف الترتيب الطبيعي للكلاس عبر `compareTo`.

---

### 13. Inner Classes — الكلاسات الداخلية

**النص الأصلي يقول:** *"An inner class, or nested class, is a class defined within the scope of another class."*

**الشرح المبسّط:** كلاس داخل كلاس. الكلاس الداخلي يصل لكل حقول الكلاس الخارجي (حتى الخاصة). يُستخدم لتنفيذ واجهات مثل `Comparator` دون إنشاء ملف منفصل.

```java
// OuterClass with InnerClass — inner can access outer's private data
public class OuterClass {
    private int data; // private field

    public void m() {
        // do something
    }

    class InnerClass {
        public void mi() {
            data++;  // directly access outer's private field
            m();     // directly call outer's method
        }
    }
}
```

#### مهم للامتحان ⚠️:
> - الكلاس الداخلي يصل للحقول والدوال الخاصة (`private`) في الكلاس الخارجي
> - الملفات المولّدة: `Test.class` و`Test$A.class`
> - للإشارة للكلاس الخارجي من الداخلي: `OuterClass.this`
> - يمكن تعريف الكلاس الداخلي بأي محدد وصول (`public`, `private`, `protected`)

🤔 **تفعيل الفهم (اسأل نفسك):**
> **سؤال:** لماذا نستخدم كلاس داخلي لـ `Comparator` بدلاً من كلاس منفصل؟
> **لماذا هذا مهم؟** الكلاس الداخلي يصل لحقول الكلاس الخارجي مباشرةً، ويُبقي الكود منظماً — `Comparator` تُحدد ضمن سياق استخدامها.

---

### 14. Java 8 — Default و Static Methods في الواجهات

**النص الأصلي يقول:** (الشريحة 20) Java 8 أضافت `default` و`static` methods للواجهات

**الشرح المبسّط:** قبل Java 8، الواجهات تحتوي دوال مجردة فقط. Java 8 أضافت إمكانية كتابة دوال بتنفيذ افتراضي (`default`) أو دوال ساكنة (`static`) داخل الواجهة.

```java
// Java 8 interface with default and static methods
public interface A {
    // default method — has implementation, can be overridden
    public default void doSomething() {
        System.out.println("Do something");
    }

    // static method — called on interface name, not instance
    public static int getAValue() {
        return 0;
    }
}
```

#### مهم للامتحان ⚠️:
> - `default` method: يمكن تجاوزه في الكلاس المُنفّذ — يُحل مشكلة إضافة دوال جديدة للواجهات دون كسر الكود القديم
> - `static` method: يُستدعى على اسم الواجهة `A.getAValue()` — لا يُورث
> - `forEach` في `Iterable` هي `default` method من Java 8

---

### 15. Performance Comparison — مقارنة الأداء

**النص الأصلي يقول:** (من نتائج `SetListPerformanceTest` — الشريحة 46)

#### جدول أداء هياكل البيانات (N=50000 عنصر):

| الهيكل | `contains` | `remove` |
|---|---|---|
| `HashSet` | 47 ms | 0 ms |
| `LinkedHashSet` | 16 ms | 47 ms |
| `TreeSet` | 32 ms | 31 ms |
| `ArrayList` | 23493 ms | 9081 ms |
| `LinkedList` | 29547 ms | 12684 ms |

#### مهم للامتحان ⚠️:
> `HashSet` أسرع بكثير من القوائم في `contains` و`remove` — لأنه يستخدم hashing بدلاً من البحث الخطي `O(n)`.

---

## الجزء الثاني: ملخص منظم

### جدول المصطلحات الأساسية

| المصطلح | التعريف | مثال |
|---|---|---|
| `Generics` | كتابة كود يعمل مع أنواع متعددة بأمان نوع | `class Stack<E>` |
| `Type Parameter` | اسم وهمي يمثل النوع | `<E>`, `<T>`, `<K>`, `<V>` |
| `Bounded Type` | تقييد النوع بكلاس معين | `<E extends Comparable<E>>` |
| `Wildcard` | نوع مجهول `?` | `List<?>`, `List<? extends Number>` |
| `Autoboxing` | تحويل تلقائي `int → Integer` | `list.add(5)` |
| `Autounboxing` | تحويل تلقائي `Integer → int` | `int d = list.get(0)` |
| `Collection` | واجهة جذر كل المجموعات | `Collection<String>` |
| `Iterator` | كائن للتنقل بين عناصر مجموعة | `iter.hasNext()`, `iter.next()` |
| `Comparable` | واجهة للترتيب الطبيعي | `compareTo(T o)` |
| `Comparator` | واجهة لترتيبات مخصصة | `compare(T o1, T o2)` |

---

### جدول مقارنة المجموعات الشاملة

| الكلاس | الواجهة | التكرار | الترتيب | الوصول | الاستخدام الأمثل |
|---|---|---|---|---|---|
| `ArrayList` | `List` | مسموح | إدراج | `O(1)` بالفهرس | قراءة كثيفة |
| `LinkedList` | `List`, `Deque` | مسموح | إدراج | `O(n)` | إدراج/حذف من الأطراف |
| `Vector` | `List` | مسموح | إدراج | `O(1)` | thread-safe |
| `Stack` | extends Vector | مسموح | LIFO | قمة فقط | undo, DFS |
| `HashSet` | `Set` | ممنوع | لا ترتيب | `O(1)` | بحث سريع |
| `LinkedHashSet` | `Set` | ممنوع | إدراج | `O(1)` | بحث + حفظ ترتيب |
| `TreeSet` | `NavigableSet` | ممنوع | طبيعي | `O(log n)` | مرتبة + navigable |
| `PriorityQueue` | `Queue` | مسموح | أولوية | أصغر أولاً | scheduling |
| `HashMap` | `Map` | مفاتيح فريدة | لا | `O(1)` | قاموس سريع |
| `TreeMap` | `NavigableMap` | مفاتيح فريدة | مفاتيح | `O(log n)` | قاموس مرتب |

---

### جدول أنواع Wildcard

| الصيغة | الاسم | يقبل | مثال |
|---|---|---|---|
| `<?>` | Unbounded | أي نوع | `print(Stack<?> s)` |
| `<? extends T>` | Upper bounded | `T` أو subtype | `max(Stack<? extends Number> s)` |
| `<? super T>` | Lower bounded | `T` أو supertype | `add(Stack<T> s1, Stack<? super T> s2)` |

---

### جدول الأخطاء الشائعة

| الخطأ | السبب | الحل |
|---|---|---|
| `ArrayList<int>` | primitives لا تُستخدم كـ type parameter | استخدم `ArrayList<Integer>` |
| `GenericStack<Integer>` ليست `GenericStack<Number>` | `Generics` لا تدعم الوراثة الضمنية | استخدم `GenericStack<? extends Number>` |
| `list.get(0)` يُرجع `Object` | القائمة غير مُعرَّفة بنوع | استخدم `ArrayList<Type>` |
| `TreeSet` مع كلاس لا يُطبق `Comparable` | `TreeSet` يحتاج `Comparable` | أضف `Comparator` للـ constructor |
| نسيان `import java.util.*` | الكلاسات في `java.util` | أضف `import java.util.*` |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ خطوات إنشاء Generic Class

#### ما هدف هذه العملية؟
> تعريف كلاس يعمل مع أنواع متعددة بأمان نوع كامل.

```algorithm
1 | تعريف الكلاس | class Name<E> | ضع <E> بعد اسم الكلاس
2 | استخدام E | E field; E method() | استبدل الأنواع بـ E
3 | إنشاء كائن | new Name<String>() | حدّد النوع الفعلي
4 | استخدام | obj.method() | يعمل بأمان النوع المحدد
```

---

#### ⚙️ خطوات إنشاء Generic Method

#### ما هدف هذه العملية؟
> كتابة دالة واحدة تعمل مع أنواع مختلفة.

```algorithm
1 | تعريف الدالة | public static <E> ReturnType method(E[] param) | <E> قبل نوع الإرجاع
2 | استخدام E | E variable = ...; | استخدم E كأي نوع
3 | الاستدعاء | Class.<Type>method(array) | حدّد النوع صراحةً أو دع المترجم يستنتجه
```

---

#### ⚙️ خطوات استخدام Iterator

#### ما هدف هذه العملية؟
> التنقل عبر كل عناصر مجموعة.

```algorithm
1 | الحصول على Iterator | Iterator<E> iter = coll.iterator() | من أي Collection
2 | التحقق من وجود عناصر | iter.hasNext() | قبل كل next()
3 | جلب العنصر | E e = iter.next() | يتقدم المؤشر للأمام
4 | تكرار | while (iter.hasNext()) { ... } | حتى نهاية المجموعة
```

---

#### ⚙️ خطوات بناء PriorityQueue مخصص

#### ما هدف هذه العملية؟
> إنشاء Queue تُخرج العناصر بحسب أولوية مخصصة.

```algorithm
1 | تعريف الكلاس | implements Comparable<T> | أو استخدم Comparator
2 | تنفيذ المقارنة | compareTo() أو compare() | تحديد منطق الأولوية
3 | إنشاء Queue | new PriorityQueue<>(capacity, comparator) | مرّر Comparator اختيارياً
4 | الإضافة | queue.offer(element) | يُرتّب تلقائياً
5 | الإزالة | queue.remove() أو poll() | يُخرج الأعلى أولوية
```

---

#### ⚙️ خطوات تطبيق Comparable

#### ما هدف هذه العملية؟
> تعريف الترتيب الطبيعي لكائنات كلاس معين.

```algorithm
1 | تنفيذ الواجهة | class Student implements Comparable<Student> | في تعريف الكلاس
2 | تنفيذ compareTo | public int compareTo(Student other) | إلزامي
3 | منطق المقارنة | return this.age - other.age | سالب: this أصغر, صفر: متساويان, موجب: this أكبر
4 | الفرز | Collections.sort(list) | يستخدم compareTo تلقائياً
```

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
What is the main advantage of using Generics in Java?
أ) Faster runtime execution
ب) Type safety at compile time
ج) Smaller code size
د) Automatic memory management

**الإجابة الصحيحة: ب** — **التعليل:** `Generics` يكشف أخطاء النوع وقت الترجمة بدلاً من وقت التشغيل — مثل `ClassCastException`. أ: `Generics` لا تُحسّن الأداء. ج: قد يزيد الكود. د: هذا دور `Garbage Collector`.

---

### السؤال 2 (متوسط)
Which of the following is a valid declaration?
أ) `ArrayList<int> list = new ArrayList<>();`
ب) `ArrayList<Integer> list = new ArrayList<>();`
ج) `ArrayList<int[]> list = new ArrayList<>();`
د) Both B and C

**الإجابة الصحيحة: د** — **التعليل:** `ArrayList<Integer>` صحيح (`Integer` wrapper class). `ArrayList<int[]>` صحيح (المصفوفات كائنات). أما `ArrayList<int>` فخطأ — primitives لا تُستخدم كـ type parameters.

---

### السؤال 3 (صعب)
Given `GenericStack<Integer> intStack`, which method signature can accept it?
أ) `void process(GenericStack<Number> s)`
ب) `void process(GenericStack<?> s)`
ج) `void process(GenericStack<Object> s)`
د) `void process(GenericStack<Comparable> s)`

**الإجابة الصحيحة: ب** — **التعليل:** `GenericStack<Integer>` ليست subtype لـ `GenericStack<Number>` أو `GenericStack<Object>`. فقط `GenericStack<?>` (unbounded wildcard) تقبل أي نوع من `GenericStack`.

---

### السؤال 4 (متوسط)
What is autoboxing?
أ) Converting `String` to `int`
ب) Automatic conversion from primitive type to its wrapper class
ج) Converting `Object` to specific type
د) Automatic garbage collection

**الإجابة الصحيحة: ب** — **التعليل:** `autoboxing` = `int → Integer`, `double → Double`, إلخ. يحدث تلقائياً عند إضافة primitive لـ Collection. أ: هذا `Integer.parseInt()`. ج: هذا casting. د: هذا `GC`.

---

### السؤال 5 (صعب)
What does `<E extends Comparable<E>>` mean?
أ) E must extend the class Comparable
ب) E must be a subtype of Comparable and compareTo takes E as argument
ج) E can be any type
د) E must implement both Comparable and Iterable

**الإجابة الصحيحة: ب** — **التعليل:** `extends Comparable<E>` يعني `E` تُطبّق `Comparable` وأن `compareTo` يأخذ `E` كمعامل — يضمن مقارنة متجانسة بين عناصر من نفس النوع. أ: `extends` هنا للواجهة أيضاً. ج: خطأ — هذا مقيّد. د: `Iterable` غير مذكور.

---

### السؤال 6 (متوسط)
Which Collection allows duplicate elements AND maintains insertion order?
أ) `HashSet`
ب) `TreeSet`
ج) `ArrayList`
د) `HashMap`

**الإجابة الصحيحة: ج** — **التعليل:** `ArrayList` يسمح بالتكرار ويحفظ ترتيب الإدراج. أ,ب: `Set` لا يسمح بالتكرار. د: `Map` يخزن أزواج مفتاح-قيمة.

---

### السؤال 7 (صعب)
What is the output of `binarySearch(list, 9)` where `list = [2,4,7,10,11,45]`?
أ) -1
ب) -4
ج) 3
د) 4

**الإجابة الصحيحة: ب** — **التعليل:** 9 غير موجود في القائمة. موضع الإدراج هو index 3 (بين 7 و10). الصيغة: `-(insertion_point) - 1 = -(3) - 1 = -4`. أ: `binarySearch` لا يُرجع -1 عند الغياب. ج,د: العنصر موجود.

---

### السؤال 8 (متوسط)
Which data structure is best for LIFO operations?
أ) `Queue`
ب) `ArrayList`
ج) `Stack`
د) `LinkedHashSet`

**الإجابة الصحيحة: ج** — **التعليل:** `Stack` يُطبّق LIFO (Last In First Out) بدوال `push/pop/peek`. أ: FIFO. ب: لا ترتيب خاص. د: Set لا يدعم LIFO.

---

### السؤال 9 (صعب)
After executing: `TreeSet<String> ts = new TreeSet<>(set)` where `set = {London, Paris, New York, Beijing}`, what does `ts.headSet("New York")` return?
أ) `[New York, Paris]`
ب) `[Beijing, London]`
ج) `[Beijing, London, New York]`
د) `[Paris]`

**الإجابة الصحيحة: ب** — **التعليل:** `headSet(e)` يُرجع العناصر **أصغر تماماً** من e (exclusive). بعد الفرز: `[Beijing, London, New York, Paris]`. أصغر من "New York" = `{Beijing, London}`. ج: يشمل "New York" نفسه — خطأ.

---

### السؤال 10 (متوسط)
What is the difference between `Iterator` and `ListIterator`?
أ) `Iterator` works only with Sets
ب) `ListIterator` supports backward traversal while `Iterator` doesn't
ج) `ListIterator` is faster
د) `Iterator` supports `add()` method

**الإجابة الصحيحة: ب** — **التعليل:** `ListIterator` له دوال إضافية: `hasPrevious()`, `previous()`, `add()`, `set()`. أ: `Iterator` يعمل مع كل `Collection`. ج: لا فرق في الأداء. د: `add()` في `ListIterator` لا `Iterator`.

---

### السؤال 11 (صعب)
Which wildcard should be used in: `public static void addToList(List<?> src, List<Object> dest)`?
To copy all elements from src to dest:
أ) `List<?>` is correct as-is
ب) `List<? extends Object>` — same as `?`
ج) You cannot add elements to `List<?>` — use `List<? extends Object>` for source
د) Change source to `List<? extends Object>` and use `dest.add(src.get(i))`

**الإجابة الصحيحة: ج** — **التعليل:** لا يمكن إضافة عناصر لـ `List<?>` (wildcard capture يمنع الكتابة). القراءة ممكنة — استخدم `src.get(i)` ثم أضف لـ `dest`. هذا مثال على PECS: Producer Extends, Consumer Super.

---

### السؤال 12 (متوسط)
What happens when you add a duplicate to a `HashSet`?
أ) Exception is thrown
ب) The duplicate replaces the original
ج) The duplicate is silently ignored
د) The set contains both elements

**الإجابة الصحيحة: ج** — **التعليل:** `Set.add()` يُرجع `false` ولا يُضيف العنصر المكرر. لا استثناء. أ,ب,د: جميعها خاطئة.

---

### السؤال 13 (صعب)
`PriorityQueue<String> pq` with elements `{Texas, Georgia, Indiana, Oklahoma}`. What does `pq.remove()` return first?
أ) Texas
ب) Oklahoma
ج) Georgia
د) Indiana

**الإجابة الصحيحة: ج** — **التعليل:** `PriorityQueue<String>` الافتراضي يُرتّب أبجدياً (ascending). "Georgia" < "Indiana" < "Oklahoma" < "Texas" — أصغر عنصر أبجدياً يخرج أولاً.

---

### السؤال 14 (متوسط)
What does `Comparable` interface provide?
أ) Multiple sorting sequences
ب) Single natural ordering via `compareTo`
ج) External comparison logic
د) Thread-safe comparison

**الإجابة الصحيحة: ب** — **التعليل:** `Comparable` يُعرّف ترتيباً طبيعياً واحداً عبر `compareTo(T o)` داخل الكلاس نفسه. أ: هذا `Comparator`. ج: `Comparator` خارجي. د: لا علاقة بـ thread safety.

---

### السؤال 15 (صعب)
Given the code:
```java
ArrayList<String> list = new ArrayList<>(Arrays.asList("c","a","b"));
Collections.sort(list, (s1,s2) -> s2.compareTo(s1));
```
What is the order of elements after sorting?
أ) `[a, b, c]`
ب) `[c, b, a]`
ج) `[b, a, c]`
د) `[c, a, b]`

**الإجابة الصحيحة: ب** — **التعليل:** `s2.compareTo(s1)` عكس الترتيب الطبيعي → ترتيب تنازلي. `c > b > a` أبجدياً. نفس تأثير `Collections.reverseOrder()`.

---

### السؤال 16 (متوسط)
Which class provides thread-safe List implementation?
أ) `ArrayList`
ب) `LinkedList`
ج) `Vector`
د) `TreeSet`

**الإجابة الصحيحة: ج** — **التعليل:** `Vector` كلاساته `synchronized` — آمنة للخيوط المتعددة. `ArrayList` و`LinkedList` غير آمنين للخيوط. د: `TreeSet` هو Set لا List.

---

### السؤال 17 (صعب)
What is the output:
```java
GenericStack<Integer> s = new GenericStack<>();
s.push(1); s.push(2); s.push(-2);
System.out.print(s.peek() + " " + s.pop() + " " + s.peek());
```
أ) `-2 -2 2`
ب) `1 1 2`
ج) `-2 2 1`
د) `2 2 1`

**الإجابة الصحيحة: أ** — **التعليل:** `peek()` يُرجع القمة (-2) دون إزالة. `pop()` يُزيل ويُرجع القمة (-2). `peek()` الثانية تُرجع القمة الجديدة (2). إذن: `-2 -2 2`.

---

### السؤال 18 (متوسط)
Which method of `Map` returns all keys as a Set?
أ) `values()`
ب) `entrySet()`
ج) `keySet()`
د) `getKeys()`

**الإجابة الصحيحة: ج** — **التعليل:** `keySet()` يُرجع `Set<K>` يحتوي كل المفاتيح. أ: `values()` يُرجع `Collection<V>` من القيم. ب: `entrySet()` يُرجع `Set<Map.Entry<K,V>>`. د: غير موجودة.

---

### السؤال 19 (صعب)
What is the difference between `poll()` and `remove()` in Queue?
أ) `poll()` throws exception when queue is empty; `remove()` returns null
ب) `remove()` throws exception when queue is empty; `poll()` returns null
ج) They are identical
د) `poll()` is for PriorityQueue only

**الإجابة الصحيحة: ب** — **التعليل:** `remove()` يرمي `NoSuchElementException` عند الفراغ. `poll()` يُرجع `null`. نفس الفرق بين `element()` و`peek()`.

---

### السؤال 20 (صعب)
Which statement about Inner Classes is TRUE?
أ) Inner class cannot access private members of outer class
ب) Inner class files have the naming pattern `Outer$Inner.class`
ج) Inner class must be public
د) Inner class cannot implement interfaces

**الإجابة الصحيحة: ب** — **التعليل:** اسم ملف الكلاس الداخلي يكون `OuterClass$InnerClass.class`. أ: الكلاس الداخلي يصل لكل أعضاء الخارجي حتى `private`. ج: يمكن أن يكون `private`. د: يمكنه تنفيذ أي واجهة.

---

### السؤال 21 (متوسط)
What is `retainAll()` in Collection?
أ) Adds all elements from another collection
ب) Removes all elements not in the specified collection (intersection)
ج) Removes all elements in the specified collection
د) Checks if all elements are retained

**الإجابة الصحيحة: ب** — **التعليل:** `retainAll(c)` يُبقي فقط العناصر الموجودة أيضاً في `c` (التقاطع). أ: هذا `addAll()`. ج: هذا `removeAll()`.

---

### السؤال 22 (صعب)
What is the output:
```java
LinkedList<String> dList = new LinkedList<>();
dList.addLast("Harry"); dList.addFirst("Sally");
System.out.println(dList.getFirst());
String r = dList.removeFirst();
System.out.println(dList);
```
أ) `Harry` ثم `[Harry]`
ب) `Sally` ثم `[Harry]`
ج) `Sally` ثم `[]`
د) `Harry` ثم `[Sally]`

**الإجابة الصحيحة: ب** — **التعليل:** بعد `addLast("Harry")` ثم `addFirst("Sally")`: `[Sally, Harry]`. `getFirst()` = "Sally". `removeFirst()` يحذف "Sally". القائمة تصبح `[Harry]`.

---

### السؤال 23 (صعب)
What does `Comparator.comparing(Student::getName)` return?
أ) The student's name directly
ب) A `Comparator<Student>` that compares by name
ج) An `Integer` comparison result
د) A `String` comparison result

**الإجابة الصحيحة: ب** — **التعليل:** `Comparator.comparing(keyExtractor)` هي `static` method تُرجع `Comparator` يقارن الكائنات باستخدام الدالة المُمررة. تستخدم مع `Collections.sort()`.

---

### السؤال 24 (متوسط)
Which is NOT a valid way to traverse a Collection?
أ) Using `Iterator`
ب) Using `for-each` loop
ج) Using `forEach` with lambda (Java 8)
د) Using `for` loop with `get(i)` directly on `Set`

**الإجابة الصحيحة: د** — **التعليل:** `Set` لا يدعم الوصول بالفهرس `get(i)` — هذه دالة `List`. للتنقل في `Set` استخدم `Iterator` أو `for-each`.

---

### السؤال 25 (صعب)
After: `ArrayList<String> c1 = (ArrayList<String>)(coll1.clone()); c1.removeAll(coll2);`
where `coll1 = [New York, Atlanta, Madison]` and `coll2 = [Seattle, Portland, Atlanta]`:
أ) `[New York, Madison]`
ب) `[Atlanta]`
ج) `[New York, Atlanta, Madison, Seattle, Portland]`
د) `[]`

**الإجابة الصحيحة: أ** — **التعليل:** `removeAll(coll2)` يحذف من c1 كل عنصر موجود في coll2. العنصر المشترك = "Atlanta". بعد الحذف: `[New York, Madison]`.

---

## الجزء الثالث (متابعة): السيناريوهات المركّبة

### السيناريو 1: GenericStack Operations

> كود `GenericStack<E>` يحتوي ArrayList داخلياً. الكود التالي:
> ```java
> GenericStack<Integer> s = new GenericStack<>();
> s.push(5); s.push(10); s.push(3);
> s.pop();
> s.push(7);
> System.out.println(s.peek());
> System.out.println(s.getSize());
> ```

### السؤال 1.1 (صعب)
What does `s.peek()` print?
أ) 3  ب) 7  ج) 10  د) 5

**الإجابة: ب** — **التعليل:** push(5), push(10), push(3) → [5,10,3]. pop() → يحذف 3. push(7) → [5,10,7]. peek() = قمة = 7.

### السؤال 1.2 (صعب)
What does `s.getSize()` print?
أ) 4  ب) 3  ج) 2  د) 1

**الإجابة: ب** — **التعليل:** بعد 3 push, 1 pop, 1 push: العناصر = [5, 10, 7] → size = 3.

### السؤال 1.3 (صعب)
If we call `s.pop()` three more times, what happens on the 4th call?
أ) Returns null  ب) Returns -1  ج) Throws `IndexOutOfBoundsException`  د) Returns empty string

**الإجابة: ج** — **التعليل:** بعد 3 pops الـ stack فارغ. `pop()` يستدعي `list.get(getSize()-1)` = `list.get(-1)` → `IndexOutOfBoundsException`.

---

### السيناريو 2: Collections Operations

> ```java
> List<Integer> list = Arrays.asList(2,4,7,10,11,45,50,59,60,66);
> int r1 = Collections.binarySearch(list, 7);
> int r2 = Collections.binarySearch(list, 9);
> int r3 = Collections.binarySearch(list, 2);
> ```

### السؤال 2.1 (صعب)
What is `r1`?
أ) 2  ب) 3  ج) 7  د) -3

**الإجابة: أ** — **التعليل:** 7 موجود عند index 2 (صفري). `binarySearch` يُرجع 2.

### السؤال 2.2 (صعب)
What is `r2`?
أ) -1  ب) -3  ج) -4  د) 3

**الإجابة: ج** — **التعليل:** 9 غير موجود. موضع إدراجه: بعد 7 (index 3) قبل 10 → insertion point = 3. النتيجة: `-(3)-1 = -4`.

### السؤال 2.3 (صعب)
What is `r3`?
أ) 0  ب) 1  ج) -1  د) 2

**الإجابة: أ** — **التعليل:** 2 موجود عند index 0.

---

### السيناريو 3: TreeSet Navigation

> ```java
> TreeSet<String> ts = new TreeSet<>(Arrays.asList("Beijing","London","New York","Paris","San Francisco"));
> ```

### السؤال 3.1 (صعب)
What does `ts.lower("P")` return?
أ) Paris  ب) New York  ج) London  د) Beijing

**الإجابة: ب** — **التعليل:** `lower("P")` = أكبر عنصر أصغر تماماً من "P". "New York" < "P" < "Paris".

### السؤال 3.2 (صعب)
What does `ts.floor("Paris")` return?
أ) London  ب) New York  ج) Paris  د) San Francisco

**الإجابة: ج** — **التعليل:** `floor("Paris")` = أكبر عنصر ≤ "Paris". "Paris" نفسه موجود فيُرجع "Paris".

### السؤال 3.3 (صعب)
After `ts.pollFirst()` and `ts.pollLast()`, what does `ts.first()` return?
أ) London  ب) Beijing  ج) Paris  د) San Francisco

**الإجابة: أ** — **التعليل:** `pollFirst()` يحذف "Beijing". `pollLast()` يحذف "San Francisco". المتبقي: [London, New York, Paris]. `first()` = "London".

---

### السيناريو 4: Wildcard Usage

> ```java
> public static <T> void add(GenericStack<T> s1, GenericStack<? super T> s2)
> GenericStack<String> stack1 = new GenericStack<>();
> GenericStack<Object> stack2 = new GenericStack<>();
> stack1.push("Sun");
> stack2.push("Java"); stack2.push(2);
> add(stack1, stack2);
> // print stack2
> ```

### السؤال 4.1 (صعب)
What does stack2 contain after `add(stack1, stack2)`?
أ) `[Java, 2]`  ب) `[Sun, Java, 2]`  ج) `[Sun, 2, Java]`  د) `[Java, 2, Sun]`

**الإجابة: ب** — **التعليل:** `add` يُفرغ stack1 في stack2. stack1 = [Sun]. بعد add: stack2 = [Java, 2, Sun]. عند الطباعة بـ print (pop): Sun 2 Java. لكن محتوى stack2 = [Java, 2, Sun].

### السؤال 4.2 (صعب)
Why is `GenericStack<? super T>` used instead of `GenericStack<T>` for stack2?
أ) To allow any type in stack2
ب) To allow stack2 to be a supertype of stack1's type (e.g., Object can hold String)
ج) To prevent adding elements to stack2
د) To make stack2 faster

**الإجابة: ب** — **التعليل:** `? super T` يُتيح أن يكون stack2 من نوع `T` أو supertype — `Object` يمكنه استيعاب `String` objects.

---

## الجزء الرابع: أسئلة تصحيح الكود

### السؤال 1 (logic)
```java
// BUGGY CODE
public static <E> void sort(E[] list) {
    for (int i = 0; i < list.length - 1; i++) {
        E currentMin = list[i];
        for (int j = i + 1; j < list.length; j++) {
            if (currentMin.compareTo(list[j]) > 0) { // ERROR LINE
                currentMin = list[j];
            }
        }
        list[i] = currentMin;
    }
}
```
**اكتشف الخطأ:** `E` لا يملك `compareTo()` — لا يوجد تقييد على النوع.
**التصحيح:**
```java
// FIXED CODE
public static <E extends Comparable<E>> void sort(E[] list) {
    // same body — now E guaranteed to have compareTo
}
```
**شرح الحل:**
1. إضافة `extends Comparable<E>` يُقيّد النوع بأن يملك `compareTo()`
2. دون ذلك يُعطي compile error لأن `Object` لا يملك `compareTo()`
3. `Comparable<E>` يضمن أن `compareTo` يأخذ `E` لا `Object`

---

### السؤال 2 (misconception)
```java
// BUGGY CODE
ArrayList<int> numbers = new ArrayList<>();
numbers.add(5);
numbers.add(10);
System.out.println(numbers.get(0));
```
**اكتشف الخطأ:** `ArrayList<int>` — لا يمكن استخدام primitive كـ type parameter.
**التصحيح:**
```java
// FIXED CODE
ArrayList<Integer> numbers = new ArrayList<>(); // use wrapper class
numbers.add(5);   // autoboxing: 5 → Integer(5)
numbers.add(10);
System.out.println(numbers.get(0)); // autounboxing: Integer → int
```
**شرح الحل:**
1. `ArrayList` تقبل فقط reference types (كائنات)
2. `Integer` هو wrapper class لـ `int`
3. `autoboxing` يحوّل `5` إلى `new Integer(5)` تلقائياً

---

### السؤال 3 (return_check)
```java
// BUGGY CODE
public static double max(GenericStack<Number> stack) {
    double max = stack.pop().doubleValue();
    while (!stack.isEmpty()) {
        double value = stack.pop().doubleValue();
        if (value > max) max = value;
    }
    return max;
}
// Usage:
GenericStack<Integer> intStack = new GenericStack<>();
intStack.push(1); intStack.push(2); intStack.push(-2);
System.out.println(max(intStack)); // COMPILE ERROR
```
**اكتشف الخطأ:** `GenericStack<Integer>` ليست subtype من `GenericStack<Number>` — خطأ ترجمة.
**التصحيح:**
```java
// FIXED CODE — use bounded wildcard
public static double max(GenericStack<? extends Number> stack) {
    double max = stack.pop().doubleValue();
    while (!stack.isEmpty()) {
        double value = stack.pop().doubleValue();
        if (value > max) max = value;
    }
    return max;
}
```
**شرح الحل:**
1. `? extends Number` يقبل أي Stack نوعه يرث `Number` (`Integer`, `Double`, إلخ)
2. `Number` كلاس مجرد أبٌ لكل الأنواع العددية
3. هذا مثال على PECS: Producer Extends

---

### السؤال 4 (logic)
```java
// BUGGY CODE
TreeSet<String> ts = new TreeSet<>();
ts.add("banana"); ts.add("apple"); ts.add("cherry");
String result = ts.lower("apple"); // should get element less than apple
System.out.println(result); // prints null — unexpected?
```
**اكتشف الخطأ:** `lower("apple")` صحيح في المنطق لكن "apple" هو أصغر عنصر في الـ Set — لا يوجد عنصر أصغر منه.
**التصحيح:**
```java
// CLARIFICATION: behavior is correct, but programmer expected wrong result
// lower() returns the GREATEST element STRICTLY LESS than the given element
// Since "apple" is smallest, lower("apple") returns null — correct behavior
// To get elements: floor, ceiling, higher based on use case
String result = ts.floor("apple"); // returns "apple" itself (<=)
System.out.println(result); // apple
```
**شرح الحل:**
1. `lower("apple")` = أكبر عنصر أصغر تماماً من "apple" — لا يوجد → null
2. `floor("apple")` = أكبر عنصر ≤ "apple" → "apple" نفسه
3. الفهم الصحيح: `lower < e < higher` و`floor <= e <= ceiling`

---

### السؤال 5 (dead_code)
```java
// BUGGY CODE
import java.util.*;
public class TestMap {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("Harry", 90);
        map.put("Sally", 95);
        map.put("Sally", 100); // update Sally's score
        
        for (String key : map.keySet()) {
            System.out.println(key + ": " + map.get(key));
        }
        // Developer expects: Harry:90, Sally:95, Sally:100
    }
}
```
**اكتشف الخطأ:** `Map` المفاتيح فريدة — `put("Sally", 100)` يُحدّث القيمة لا يُضيف مدخلاً جديداً. المطوّر يتوقع طباعة "Sally" مرتين.
**التصحيح:**
```java
// FIXED — use Map<String, List<Integer>> for multiple values per key
Map<String, List<Integer>> map = new HashMap<>();
map.put("Sally", new ArrayList<>(Arrays.asList(95, 100)));
// OR: accept that map.put updates existing key (no bug — just misunderstanding)
// Sally will print only once with value 100 (last put wins)
```
**شرح الحل:**
1. `HashMap` مفتاح واحد = قيمة واحدة
2. `put` على مفتاح موجود يُحدّث القيمة ويُرجع القيمة القديمة
3. لتخزين قيم متعددة لنفس المفتاح: استخدم `Map<K, List<V>>`

---

### السؤال 6 (logic)
```java
// BUGGY CODE
class Student implements Comparable<Student> {
    String name;
    int age;
    public int compareTo(Student other) {
        return this.name.compareTo(other.name); // sort by name
    }
}
// Usage:
ArrayList<Student> list = new ArrayList<>();
// ... add students ...
Collections.sort(list); // sorts by name (correct)
Collections.sort(list, (s1, s2) -> s1.age - s2.age); // now sorted by age
String first = list.get(0).name; // developer thinks this is alphabetically first student
```
**اكتشف الخطأ:** بعد `Collections.sort(list, byAge)` القائمة مرتبة بالعمر لا بالاسم. المطوّر يفترض خطأً أنها لا تزال بالاسم.
**التصحيح:**
```java
// FIXED — be explicit about which sort is active
Collections.sort(list); // sort by name (natural order via Comparable)
String firstByName = list.get(0).name; // correctly first alphabetically

Collections.sort(list, (s1, s2) -> s1.age - s2.age); // sort by age
Student youngest = list.get(0); // correctly youngest student
```
**شرح الحل:**
1. كل `sort` يُغيّر ترتيب القائمة — الترتيب الأخير هو السائد
2. `Comparable` يُعرّف الترتيب الافتراضي فقط — يمكن تجاوزه بـ `Comparator`
3. وضّح دائماً أي ترتيب يُطبّق في كل لحظة

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل

### تمرين 1: fill_gaps — أكمل الكود الجنيريك
**المعطيات:**
```java
// Complete the Generic method that finds maximum in an array
public static _______ E max(_______ list) {
    E result = list[0];
    for (int i = 1; i < list.length; i++) {
        if (result._______(list[i]) < 0)
            result = list[i];
    }
    return result;
}
```
**المطلوب:** أكمل الفراغات

**نموذج الحل:**
```java
public static <E extends Comparable<E>> E max(E[] list) {
    E result = list[0];
    for (int i = 1; i < list.length; i++) {
        if (result.compareTo(list[i]) < 0)
            result = list[i];
    }
    return result;
}
```
- فراغ 1: `<E extends Comparable<E>>`
- فراغ 2: `E[]`
- فراغ 3: `compareTo`

---

### تمرين 2: code_fix — صحّح الكود
**المعطيات:**
```java
// Code should count word frequencies
Map<String, Integer> freq = new HashMap<>();
String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
for (String word : words) {
    freq.put(word, 1); // BUG HERE
}
```
**المطلوب:** صحّح الكود ليعمل بشكل صحيح

**نموذج الحل:**
```java
for (String word : words) {
    if (!freq.containsKey(word)) {
        freq.put(word, 1);
    } else {
        freq.put(word, freq.get(word) + 1);
    }
}
// Expected: {apple=3, banana=2, cherry=1}
```

---

### تمرين 3: scenario — استخدام PriorityQueue مخصص
**السيناريو:** نظام دعم فني يُعالج الطلبات حسب الأولوية (1=أعلى).

**المطلوب:**
1. أنشئ كلاس `SupportTicket` يُطبّق `Comparable` حسب الأولوية
2. أضف 5 طلبات بأولويات مختلفة
3. أطبع الطلبات بالترتيب

**نموذج الحل:**
```java
class SupportTicket implements Comparable<SupportTicket> {
    int priority;
    String description;
    
    SupportTicket(int p, String d) { priority = p; description = d; }
    
    public int compareTo(SupportTicket other) {
        return this.priority - other.priority; // lower number = higher priority
    }
    
    public String toString() { return "P" + priority + ": " + description; }
}

PriorityQueue<SupportTicket> queue = new PriorityQueue<>();
queue.add(new SupportTicket(3, "Slow computer"));
queue.add(new SupportTicket(1, "System crash"));
queue.add(new SupportTicket(2, "Printer not working"));
queue.add(new SupportTicket(1, "Data loss"));
queue.add(new SupportTicket(5, "Screen flickering"));

while (!queue.isEmpty())
    System.out.println(queue.remove());
```

---

### تمرين 4: fill_gaps — إكمال عمليات TreeSet
**المعطيات:**
```java
TreeSet<Integer> ts = new TreeSet<>(Arrays.asList(10, 20, 30, 40, 50));
System.out.println(ts._______("35")); // largest < 35
System.out.println(ts._______("30")); // largest <= 30
System.out.println(ts._______()); // smallest element
System.out.println(ts.headSet(_______)); // elements < 30
```
**نموذج الحل:**
- `lower(35)` → 30
- `floor(30)` → 30
- `first()` → 10
- `headSet(30)` → [10, 20]

---

### تمرين 5: code_fix — تصحيح استخدام Iterator
**المعطيات:**
```java
// BUGGY: trying to remove while iterating
List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5,6));
for (Integer n : list) {
    if (n % 2 == 0) list.remove(n); // ConcurrentModificationException
}
```
**نموذج الحل:**
```java
// Fix 1: use Iterator.remove()
Iterator<Integer> iter = list.iterator();
while (iter.hasNext()) {
    if (iter.next() % 2 == 0) iter.remove(); // safe removal
}

// Fix 2: removeIf (Java 8)
list.removeIf(n -> n % 2 == 0);
```

---

### تمرين 6: scenario — مقارنة أداء
**السيناريو:** لديك N=10000 عنصر. تحتاج كثيراً لعملية `contains()`. أيهما أسرع: `ArrayList` أم `HashSet`؟

**المطلوب:**
1. اشرح الفرق في التعقيد الزمني
2. متى تختار كل منهما؟

**نموذج الحل:**
- `HashSet.contains()`: **O(1)** — يُحسب hash مباشرةً
- `ArrayList.contains()`: **O(n)** — بحث خطي
- اختر `HashSet` إذا: البحث هو العملية الرئيسية والترتيب غير مهم
- اختر `ArrayList` إذا: تحتاج للوصول بالفهرس أو الترتيب مهم

---

## الجزء الرابع: تمارين تحليل وتطبيق

### تمرين 1: case_study — نظام مكتبة
**السيناريو:**
نظام مكتبة يحتاج:
- قائمة الكتب (مع تكرار وترتيب إدراج)
- فهرس الكتب بحسب ISBN (لا تكرار، بحث سريع)
- تقرير بالكتب مرتبة أبجدياً بالعنوان

**المطلوب:**
1. أي هيكل بيانات لكل حالة؟
2. برّر اختيارك

**نموذج الحل:**
| الحالة | الهيكل | السبب |
|---|---|---|
| قائمة الكتب | `ArrayList<Book>` | يسمح بالتكرار، وصول سريع بالفهرس |
| فهرس ISBN | `HashMap<String, Book>` | ISBN مفتاح فريد، بحث O(1) |
| تقرير أبجدي | `TreeMap<String, Book>` | يرتب تلقائياً بالمفتاح |

---

### تمرين 2: table_fill — اختر الهيكل المناسب
**السيناريو:** اختر الهيكل الأنسب لكل متطلب:

| المتطلب | الهيكل الأنسب |
|---|---|
| تخزين قائمة انتظار طباعة (FIFO) | ؟ |
| تخزين تاريخ التصفح (undo/redo) | ؟ |
| عداد تكرار الكلمات | ؟ |
| قائمة طلاب بدون تكرار | ؟ |
| بيانات الموظفين مرتبة بالرقم الوظيفي | ؟ |

**نموذج الحل:**
| المتطلب | الهيكل الأنسب |
|---|---|
| قائمة انتظار طباعة (FIFO) | `LinkedList` كـ `Queue` |
| تاريخ التصفح (undo/redo) | `Stack` أو `LinkedList` |
| عداد تكرار الكلمات | `HashMap<String, Integer>` |
| قائمة طلاب بدون تكرار | `HashSet<String>` |
| بيانات الموظفين مرتبة | `TreeMap<Integer, Employee>` |

---

### تمرين 3: written_analysis — Comparable مقابل Comparator
**المطلوب:** اكتب تحليلاً لكيفية اختيار `Comparable` أو `Comparator` في هذا السيناريو:
"لديك كلاس `Product` بحقول (id, name, price, category). تحتاج فرز المنتجات بطرق مختلفة."

**نموذج الحل:**
- **استخدم `Comparable`** لتعريف الترتيب الطبيعي (مثلاً بالـ id)
- **استخدم `Comparator`** لكل طريقة ترتيب إضافية:
  - `Comparator.comparing(Product::getPrice)` — بالسعر
  - `Comparator.comparing(Product::getName)` — بالاسم
  - `Comparator.comparing(Product::getCategory)` — بالفئة
- لدمج معايير: `Comparator.comparing(Product::getCategory).thenComparing(Product::getPrice)`

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: Stack Operations

**المدخل:**
```java
GenericStack<Integer> s = new GenericStack<>();
s.push(10); s.push(20); s.push(30);
s.pop();
s.push(40);
s.pop();
System.out.println(s.peek());
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | حالة Stack (من الأسفل للأعلى) | القمة |
|---|---|---|---|
| 1 | `push(10)` | ؟ | ؟ |
| 2 | `push(20)` | ؟ | ؟ |
| 3 | `push(30)` | ؟ | ؟ |
| 4 | `pop()` | ؟ | ؟ |
| 5 | `push(40)` | ؟ | ؟ |
| 6 | `pop()` | ؟ | ؟ |
| 7 | `peek()` | ؟ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | حالة Stack | القمة |
|---|---|---|---|
| 1 | `push(10)` | [10] | 10 |
| 2 | `push(20)` | [10, 20] | 20 |
| 3 | `push(30)` | [10, 20, 30] | 30 |
| 4 | `pop()` → 30 | [10, 20] | 20 |
| 5 | `push(40)` | [10, 20, 40] | 40 |
| 6 | `pop()` → 40 | [10, 20] | 20 |
| 7 | `peek()` → 20 | [10, 20] | 20 |

**النتيجة:** `peek()` تطبع `20`

---

### تمرين تتبع 2: PriorityQueue Ordering

**المدخل:**
```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(15); pq.offer(3); pq.offer(7);
pq.offer(1); pq.offer(10);
// remove all in order
```

**تتبّع خطوة بخطوة:**
| الخطوة | عملية remove() | القيمة المُخرَجة | الحالة المتبقية |
|---|---|---|---|
| 1 | `remove()` | ؟ | ؟ |
| 2 | `remove()` | ؟ | ؟ |
| 3 | `remove()` | ؟ | ؟ |
| 4 | `remove()` | ؟ | ؟ |
| 5 | `remove()` | ؟ | ؟ |

**نموذج الحل:**
| الخطوة | عملية remove() | القيمة المُخرَجة | الحالة المتبقية |
|---|---|---|---|
| 1 | `remove()` | 1 | {3, 7, 10, 15} |
| 2 | `remove()` | 3 | {7, 10, 15} |
| 3 | `remove()` | 7 | {10, 15} |
| 4 | `remove()` | 10 | {15} |
| 5 | `remove()` | 15 | {} |

**النتيجة:** تصاعدياً: `1 3 7 10 15` — أصغر أولاً

---

### تمرين تتبع 3: Collection Operations (addAll, removeAll, retainAll)

**المدخل:**
```java
coll1 = [New York, Atlanta, Madison]   // after removing Dallas
coll2 = [Seattle, Portland, Los Angeles, Atlanta]
```

**تتبّع العمليات:**
| العملية | المحتوى بعد العملية |
|---|---|
| `c1 = clone(coll1)` | ؟ |
| `c1.addAll(coll2)` | ؟ |
| `c1 = clone(coll1)` | ؟ |
| `c1.retainAll(coll2)` | ؟ |
| `c1 = clone(coll1)` | ؟ |
| `c1.removeAll(coll2)` | ؟ |

**نموذج الحل:**
| العملية | المحتوى بعد العملية |
|---|---|
| `c1 = clone(coll1)` | `[New York, Atlanta, Madison]` |
| `c1.addAll(coll2)` | `[New York, Atlanta, Madison, Seattle, Portland, Los Angeles, Atlanta]` |
| `c1 = clone(coll1)` | `[New York, Atlanta, Madison]` |
| `c1.retainAll(coll2)` | `[Atlanta]` (التقاطع) |
| `c1 = clone(coll1)` | `[New York, Atlanta, Madison]` |
| `c1.removeAll(coll2)` | `[New York, Madison]` (الفرق) |

---

### تمرين تتبع 4: Sorting with Comparator

**المدخل:**
```java
String[] cities = {"Atlanta", "Savannah", "New York", "Dallas"};
Arrays.sort(cities, (s1, s2) -> s1.length() - s2.length());
```

**تتبّع الفرز:**
| العنصر | الطول |
|---|---|
| Atlanta | 7 |
| Savannah | 8 |
| New York | 8 |
| Dallas | 6 |

| الخطوة | المقارنة | النتيجة |
|---|---|---|
| فرز تصاعدي بالطول | Dallas(6) < Atlanta(7) < Savannah(8) = New York(8) | ؟ |

**نموذج الحل:** `Dallas Atlanta Savannah New York` (أو `Dallas Atlanta New York Savannah` حسب الاستقرار)

---

### تمرين تتبع 5: LinkedList Forward and Backward

**المدخل:**
```java
LinkedList<Object> linst → contains [10, 1, 2, 30, 3, 1, 4] (from arrlis)
linst.add(1, "red");
linst.removeLast();
linst.addFirst("green");
```

| الخطوة | العملية | محتوى LinkedList |
|---|---|---|
| 0 | البداية | [10, 1, 2, 30, 3, 1, 4] |
| 1 | `add(1, "red")` | ؟ |
| 2 | `removeLast()` | ؟ |
| 3 | `addFirst("green")` | ؟ |

**نموذج الحل:**
| الخطوة | العملية | محتوى LinkedList |
|---|---|---|
| 0 | البداية | [10, 1, 2, 30, 3, 1, 4] |
| 1 | `add(1, "red")` | [10, "red", 1, 2, 30, 3, 1, 4] |
| 2 | `removeLast()` | [10, "red", 1, 2, 30, 3, 1] |
| 3 | `addFirst("green")` | ["green", 10, "red", 1, 2, 30, 3, 1] |

**الطباعة الأمامية:** `green 10 red 1 2 30 3 1`
**الطباعة الخلفية:** `1 3 30 2 1 red 10 green`

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the purpose of Generics in Java?
A: يُتيح كتابة كود يعمل مع أنواع متعددة مع أمان النوع وقت الترجمة — يمنع `ClassCastException`.

**Q2:** What is the difference between `<E>` and `<E extends Comparable<E>>`?
A: `<E>` يقبل أي نوع. `<E extends Comparable<E>>` يقبل فقط أنواع لها `compareTo()` — لازم للفرز.

**Q3:** Why can't you use `ArrayList<int>`?
A: `Generics` تعمل مع Reference Types فقط — استخدم `ArrayList<Integer>` (wrapper class).

**Q4:** What is autoboxing?
A: تحويل تلقائي من primitive (`int`) إلى wrapper class (`Integer`) عند الإضافة لـ Collection.

**Q5:** What is autounboxing?
A: تحويل تلقائي من wrapper class (`Integer`) إلى primitive (`int`) عند الاسترجاع.

**Q6:** What is the difference between `HashSet` and `TreeSet`?
A: `HashSet` لا ترتيب، سرعة O(1). `TreeSet` مرتب أبجدياً، سرعة O(log n) مع navigation methods.

**Q7:** What does `headSet(e)` return in TreeSet?
A: يُرجع العناصر الأصغر تماماً من e (exclusive) — نفس مفهوم `< e`.

**Q8:** What is the difference between `lower(e)` and `floor(e)` in TreeSet?
A: `lower(e)` = أكبر عنصر < e (أصغر تماماً). `floor(e)` = أكبر عنصر <= e (أصغر أو يساوي).

**Q9:** When does `binarySearch` return a negative value?
A: عندما لا يُوجد العنصر — يُرجع `-(insertion point) - 1`.

**Q10:** What is the difference between `poll()` and `remove()` in Queue?
A: `poll()` يُرجع `null` إذا كان Queue فارغاً. `remove()` يرمي `NoSuchElementException`.

**Q11:** What is the LIFO data structure in Java?
A: `Stack` — آخر عنصر يدخل أول عنصر يخرج. دوال: `push()`, `pop()`, `peek()`.

**Q12:** What is the difference between `Comparable` and `Comparator`?
A: `Comparable` داخل الكلاس (`compareTo`) — ترتيب واحد. `Comparator` خارج الكلاس (`compare`) — ترتيبات متعددة.

**Q13:** How do you iterate over a Map's keys?
A: `for (K key : map.keySet()) { ... }` أو `map.forEach((k,v) -> ...)`

**Q14:** What is an Inner Class?
A: كلاس مُعرَّف داخل كلاس آخر — يصل لكل أعضاء الكلاس الخارجي حتى private.

**Q15:** What is `? extends T` wildcard used for?
A: يقبل `T` أو أي subtype — مثلاً `List<? extends Number>` تقبل `List<Integer>`.

**Q16:** What is `? super T` wildcard used for?
A: يقبل `T` أو أي supertype — يُستخدم عندما تريد إضافة عناصر من نوع T لمجموعة أكبر.

**Q17:** What is the natural ordering in PriorityQueue?
A: أصغر عنصر يخرج أولاً (min-heap). للترتيب العكسي استخدم `Collections.reverseOrder()`.

**Q18:** What does `retainAll(c)` do?
A: يُبقي فقط العناصر المشتركة بين المجموعة الحالية وc (التقاطع). يُعادل ∩ في الرياضيات.

**Q19:** What is `forEach` in Java 8 Collections?
A: `default method` في `Iterable` تأخذ `Consumer<E>` lambda — تُطبّق عملية على كل عنصر.

**Q20:** What does `Comparator.comparing(Student::getName)` do?
A: يُنشئ `Comparator<Student>` يقارن الطلاب بأسمائهم — يُستخدم مع `Collections.sort()`.

**Q21:** What is the file naming for Inner Classes?
A: `OuterClass$InnerClass.class` — مثل `Test$A.class` للكلاس A داخل Test.

**Q22:** How do you define a generic type for a static method?
A: ضع `<E>` قبل نوع الإرجاع: `public static <E> void print(E[] list)`

**Q23:** What is the difference between `Vector` and `ArrayList`?
A: `Vector` synchronized (thread-safe) لكن أبطأ. `ArrayList` أسرع لكن غير thread-safe.

**Q24:** When does TreeSet throw an exception?
A: عند إضافة كائن لا يُطبّق `Comparable` دون توفير `Comparator` — `ClassCastException`.

**Q25:** What does `Collections.shuffle(list)` do?
A: يرتّب عناصر القائمة بشكل عشوائي — مفيد في الألعاب والاختبارات.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

### 💻 الكود الكامل: GenericStack مع كل الاستخدامات

#### ما هذا الكود؟
> الكود الكامل لـ `GenericStack<E>` وجميع أنواع استخداماته من المحاضرة في ملف واحد.

```java
import java.util.*;

// ============== GenericStack Class ==============
public class GenericStack<E> {
    // internal ArrayList to store elements
    private java.util.ArrayList<E> list = new java.util.ArrayList<>();

    // returns current size
    public int getSize() {
        return list.size();
    }

    // returns top element without removing
    public E peek() {
        return list.get(getSize() - 1);
    }

    // adds element to top
    public void push(E o) {
        list.add(o);
    }

    // removes and returns top element
    public E pop() {
        E o = list.get(getSize() - 1);
        list.remove(getSize() - 1);
        return o;
    }

    // checks if stack is empty
    public boolean isEmpty() {
        return list.isEmpty();
    }

    @Override
    public String toString() {
        return "stack: " + list.toString();
    }
}

// ============== Test All Wildcard Types ==============
class WildcardDemo {
    // unbounded wildcard — any type
    public static void print(GenericStack<?> stack) {
        while (!stack.isEmpty())
            System.out.print(stack.pop() + " ");
        System.out.println();
    }

    // bounded wildcard — Number or subtype
    public static double max(GenericStack<? extends Number> stack) {
        double max = stack.pop().doubleValue();
        while (!stack.isEmpty()) {
            double value = stack.pop().doubleValue();
            if (value > max) max = value;
        }
        return max;
    }

    // lower bound wildcard — T or supertype
    public static <T> void add(GenericStack<T> s1, GenericStack<? super T> s2) {
        while (!s1.isEmpty())
            s2.push(s1.pop());
    }
}

// ============== Generic Sort ==============
class GenericSort {
    // generic sort using Comparable
    public static <E extends Comparable<E>> void sort(E[] list) {
        E currentMin;
        int currentMinIndex;
        for (int i = 0; i < list.length - 1; i++) {
            currentMin = list[i];
            currentMinIndex = i;
            for (int j = i + 1; j < list.length; j++) {
                if (currentMin.compareTo(list[j]) > 0) {
                    currentMin = list[j];
                    currentMinIndex = j;
                }
            }
            if (currentMinIndex != i) {
                list[currentMinIndex] = list[i];
                list[i] = currentMin;
            }
        }
    }

    // generic print for any Object array
    public static void printList(Object[] list) {
        for (int i = 0; i < list.length; i++)
            System.out.print(list[i] + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        Integer[] intArray    = {new Integer(2), new Integer(4), new Integer(3)};
        Double[]  doubleArray = {new Double(3.4), new Double(1.3), new Double(-22.1)};
        String[]  stringArray = {"Tom", "Susan", "Kim"};

        sort(intArray);    printList(intArray);    // -22.1 1.3 3.4 — wait: int sort: 2 3 4
        sort(doubleArray); printList(doubleArray); // -22.1 1.3 3.4
        sort(stringArray); printList(stringArray); // Kim Susan Tom
    }
}

// ============== Collections Demo ==============
class CollectionsDemo {
    public static void main(String[] args) {
        // List operations
        List<String> list = Arrays.asList("yellow", "red", "green", "blue");
        List<String> mutableList = new ArrayList<>(list);
        Collections.sort(mutableList);
        System.out.println(mutableList); // [blue, green, red, yellow]
        Collections.sort(mutableList, Collections.reverseOrder());
        System.out.println(mutableList); // [yellow, red, green, blue]

        // Binary search
        List<Integer> nums = Arrays.asList(2, 4, 7, 10, 11, 45, 50, 59, 60, 66);
        System.out.println(Collections.binarySearch(nums, 7));  // 2
        System.out.println(Collections.binarySearch(nums, 9)); // -4

        // Set operations
        Set<String> set1 = new HashSet<>(Arrays.asList("London","Paris","New York","Atlanta","Beijing"));
        Set<String> set2 = new HashSet<>(Arrays.asList("London","Shanghai","Paris"));
        set1.addAll(set2);    System.out.println(set1); // union
        set1.retainAll(set2); System.out.println(set1); // intersection → [London, Paris]
        set1.removeAll(set2); System.out.println(set1); // difference

        // Map with word count
        Map<String, Integer> freq = new TreeMap<>();
        String[] words = "good morning have a good class have fun".split(" ");
        for (String w : words)
            freq.put(w, freq.getOrDefault(w, 0) + 1);
        freq.forEach((k, v) -> System.out.println(k + "\t" + v));

        // PriorityQueue
        PriorityQueue<String> pq = new PriorityQueue<>(4, Collections.reverseOrder());
        pq.offer("Oklahoma"); pq.offer("Indiana");
        pq.offer("Georgia"); pq.offer("Texas");
        while (!pq.isEmpty()) System.out.print(pq.remove() + " ");
        // Texas Oklahoma Indiana Georgia
    }
}
```

**المكتبات المطلوبة:**
> `import java.util.*;`

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: What is the purpose of Generics and how do they improve code quality?
**نموذج الإجابة:**
1. **التعريف:** `Generics` يُتيح تعريف كلاسات ودوال مع أنواع بيانات وهمية (`<E>`, `<T>`) تُستبدل بأنواع حقيقية عند الاستخدام.
2. **المكونات:** Type Parameter (`<E>`) + Bounded Types (`<E extends T>`) + Wildcards (`<?>`)
3. **مثال:** `GenericStack<String>` و`GenericStack<Integer>` — نفس الكلاس، أنواع مختلفة
4. **متى نستخدم:** عند الحاجة لكود يعمل مع أنواع متعددة مع أمان النوع وقت الترجمة

---

### سؤال 2: Explain the three types of Wildcard generic types with examples.
**نموذج الإجابة:**
1. **التعريف:** Wildcards تُستخدم لتحديد نطاق النوع الجنيريك دون تقييده بنوع محدد
2. **المكونات:**
   - `?` (Unbounded): يقبل أي نوع — `List<?>`
   - `? extends T` (Upper bounded): T أو subtype — `List<? extends Number>`
   - `? super T` (Lower bounded): T أو supertype — `List<? super Integer>`
3. **مثال:** `max(GenericStack<? extends Number> s)` تقبل `Stack<Integer>` و`Stack<Double>`
4. **متى نستخدم:** عند الحاجة لمرونة في قبول أنواع مرتبطة

---

### سؤال 3: Compare ArrayList and LinkedList — when to use each?
**نموذج الإجابة:**
1. **التعريف:** كلاهما يُنفّذ `List<E>` ولكن بهياكل بيانات مختلفة
2. **الفروق:**
   - `ArrayList`: مصفوفة ديناميكية، وصول O(1) بالفهرس، إدراج O(n)
   - `LinkedList`: قائمة مرتبطة ثنائية، وصول O(n)، إدراج/حذف من الأطراف O(1)
3. **مثال:** `ArrayList` للقراءة الكثيفة، `LinkedList` لعمليات Queue/Deque
4. **متى نستخدم:** `ArrayList` في معظم الحالات — `LinkedList` عند كثرة الإضافة/الحذف من الأطراف

---

### سؤال 4: What is the difference between Comparable and Comparator?
**نموذج الإجابة:**
1. **التعريف:** كلاهما لتعريف ترتيب الكائنات ولكن بأساليب مختلفة
2. **الفروق:**
   - `Comparable`: داخل الكلاس، دالة `compareTo()`, ترتيب واحد طبيعي
   - `Comparator`: خارج الكلاس، دالة `compare()`, ترتيبات متعددة
3. **مثال:** `Student implements Comparable<Student>` + `Comparator<Student> byName = ...`
4. **متى نستخدم:** `Comparable` للترتيب الافتراضي، `Comparator` لترتيبات بديلة

---

### سؤال 5: Explain the Collection Framework hierarchy.
**نموذج الإجابة:**
1. **التعريف:** هرم واجهات وكلاسات لإدارة مجموعات البيانات
2. **المكونات:**
   - `Collection` ← `List` ← `ArrayList`, `LinkedList`, `Vector`
   - `Collection` ← `Set` ← `HashSet`, `TreeSet`, `LinkedHashSet`
   - `Collection` ← `Queue` ← `PriorityQueue`, `LinkedList`
3. **مثال:** `TreeSet<String>` تُنفّذ `NavigableSet` ← `SortedSet` ← `Set` ← `Collection`
4. **متى نستخدم:** اختر الواجهة حسب المتطلب، اختر التنفيذ حسب الأداء

---

### سؤال 6: What are the differences between HashSet, LinkedHashSet, and TreeSet?
**نموذج الإجابة:**
1. **التعريف:** ثلاثة تنفيذات لـ `Set<E>` — لا تسمح بالتكرار
2. **الفروق:**
   - `HashSet`: لا ترتيب، O(1)
   - `LinkedHashSet`: ترتيب الإدراج، O(1)
   - `TreeSet`: ترتيب طبيعي + navigation, O(log n)
3. **مثال:** `TreeSet` لقائمة طلاب مرتبة أبجدياً
4. **متى نستخدم:** حسب الحاجة للترتيب والسرعة

---

### سؤال 7: Explain autoboxing and autounboxing with examples.
**نموذج الإجابة:**
1. **التعريف:** تحويل تلقائي بين primitive types ومقابلاتها من Wrapper classes
2. **Autoboxing:** `int → Integer` تلقائياً عند الإضافة لـ Collection
3. **Autounboxing:** `Integer → int` تلقائياً عند الاسترجاع
4. **مثال:** `list.add(5)` = `list.add(new Integer(5))` و`double d = list.get(0)` = `list.get(0).doubleValue()`

---

### سؤال 8: What is an Iterator and how is it different from for-each?
**نموذج الإجابة:**
1. **التعريف:** `Iterator` كائن يُتيح التنقل الخطي عبر مجموعة
2. **المكونات:** `hasNext()` + `next()` + `remove()`
3. **الفرق:** `for-each` اختصار نحوي يُترجم لـ Iterator. Iterator يُتيح الحذف الآمن أثناء التنقل
4. **متى نستخدم:** `for-each` للقراءة. `Iterator.remove()` للحذف أثناء التنقل

---

### سؤال 9: Explain PriorityQueue and how to use a custom comparator with it.
**نموذج الإجابة:**
1. **التعريف:** Queue تُخرج العناصر بحسب الأولوية لا بترتيب الإدراج
2. **الافتراضي:** أصغر عنصر أولاً (min-heap)
3. **مخصص:** `new PriorityQueue<>(4, Collections.reverseOrder())` — أكبر أولاً
4. **مثال:** `WorkOrder implements Comparable` يُعرّف أولوية معالجة الطلبات

---

### سؤال 10: What are the additional methods provided by TreeSet (NavigableSet)?
**نموذج الإجابة:**
1. `first()` / `last()` — أصغر/أكبر عنصر
2. `headSet(e)` / `tailSet(e)` — عناصر أصغر من / أكبر أو تساوي e
3. `lower(e)` / `higher(e)` — أكبر عنصر < e / أصغر عنصر > e
4. `floor(e)` / `ceiling(e)` — أكبر عنصر <= e / أصغر عنصر >= e
5. `pollFirst()` / `pollLast()` — حذف وإرجاع أصغر/أكبر عنصر

---

### سؤال 11: Explain the concept of Bounded Type `<E extends Comparable<E>>`.
**نموذج الإجابة:**
1. **التعريف:** تقييد للنوع الجنيريك يُلزم `E` بتنفيذ `Comparable<E>`
2. **لماذا `<E>`؟** يضمن أن `compareTo` يأخذ معاملاً من نفس النوع `E` لا `Object`
3. **مثال:** دالة فرز جنيريك تعمل مع `Integer[]`, `String[]`, `Character[]`
4. **الفرق:** `<E extends Comparable>` بدون `<E>` ممكن لكن يُعطي تحذيراً — الصيغة الكاملة أكثر دقة

---

### سؤال 12: What is the difference between HashMap and TreeMap?
**نموذج الإجابة:**
1. **التعريف:** كلاهما يُنفّذ `Map<K,V>` — يخزن أزواج مفتاح-قيمة
2. **HashMap:** لا ترتيب، O(1) للبحث، يقبل null key
3. **TreeMap:** مرتب بالمفاتيح، O(log n) للبحث، له navigation methods
4. **متى نستخدم:** `HashMap` للسرعة. `TreeMap` عند الحاجة لترتيب المفاتيح أو navigation

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم لماذا `Generics` تكشف الأخطاء وقت الترجمة لا التشغيل
- [ ] أستطيع تعريف `Generic Class` بوضع `<E>` بعد اسم الكلاس
- [ ] أستطيع تعريف `Generic Method` بوضع `<E>` قبل نوع الإرجاع
- [ ] أفهم الفرق بين `Autoboxing` و`Autounboxing`
- [ ] أعرف لماذا `ArrayList<int>` خطأ وأستخدم `ArrayList<Integer>` بدلاً منه
- [ ] أفهم `Bounded Type <E extends Comparable<E>>` وأستخدمه في دوال الفرز
- [ ] أعرف الفرق بين الثلاثة أنواع من Wildcards (`?`, `? extends T`, `? super T`)
- [ ] أعرف متى أستخدم `ArrayList` مقابل `LinkedList`
- [ ] أفهم الفرق بين `HashSet`, `LinkedHashSet`, `TreeSet`
- [ ] أعرف دوال `TreeSet` الإضافية (lower, higher, floor, ceiling, headSet, tailSet)
- [ ] أفهم الفرق بين `Comparable` و`Comparator` وأطبّق كلاً منهما
- [ ] أستطيع إنشاء `Comparator` بـ lambda ومع `Comparator.comparing()`
- [ ] أعرف دوال `java.util.Collections` الساكنة (sort, binarySearch, reverse, shuffle)
- [ ] أفهم نتيجة `binarySearch` السالبة وأحسب موضع الإدراج
- [ ] أعرف الفرق بين `poll()` و`remove()` في Queue
- [ ] أفهم `PriorityQueue` وكيفية تخصيص الأولوية
- [ ] أعرف `Stack` ودوالها (push, pop, peek, empty, search)
- [ ] أفهم مفهوم `Inner Class` وكيفية وصولها للكلاس الخارجي
- [ ] أعرف `default` و`static` methods في واجهات Java 8
- [ ] أستطيع استخدام `forEach` مع lambda
- [ ] أعرف هرم Collections كاملاً (Interfaces → Abstract Classes → Concrete Classes)

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
|---|---|---|
| Generics | OOP (Inheritance) | `<E extends GeometricObject>` |
| Collections | Generics | كل Collection جنيريك `<E>` |
| Comparable/Comparator | Generics + Collections | فرز Collections بأنواع جنيريك |
| Inner Classes | Comparator | `Comparator` كـ Anonymous Inner Class |
| Java 8 Lambda | Comparator + forEach | اختصار Inner Classes |

---

### 🔑 أهم النقاط الذهبية
| الموضوع | النقطة |
|---|---|
| `Generics` | يكشف أخطاء النوع وقت الترجمة لا التشغيل |
| Type Parameter | `<E>` بعد اسم الكلاس، `<E>` قبل return type في الدالة |
| `ArrayList<int>` | **خطأ دائماً** — استخدم `ArrayList<Integer>` |
| `GenericStack<Integer>` vs `GenericStack<Number>` | **ليست** علاقة وراثة في Generics |
| `TreeSet` | مرتب تلقائياً + navigation methods |
| `HashMap` vs `TreeMap` | سرعة vs ترتيب |
| `Comparable` | داخل الكلاس — ترتيب واحد |
| `Comparator` | خارج الكلاس — ترتيبات متعددة |
| `binarySearch` سالب | `-(insertion point) - 1` |
| `poll()` vs `remove()` | null vs Exception عند الفراغ |

---

### 🔑 مرجع سريع — أنواع Generics
| الصيغة | الموضع | المعنى |
|---|---|---|
| `class Stack<E>` | بعد اسم الكلاس | نوع جنيريك للكلاس |
| `<E> void method(E[] a)` | قبل return type | نوع جنيريك للدالة |
| `<E extends T>` | في التعريف | E يجب أن يكون T أو subtype |
| `<?>` | كـ parameter | يقبل أي نوع |
| `<? extends T>` | كـ parameter | T أو subtype |
| `<? super T>` | كـ parameter | T أو supertype |

---

### 🔑 مرجع سريع — Collections
| الهيكل | add/remove | contains | ترتيب | تكرار |
|---|---|---|---|---|
| `ArrayList` | O(n) وسط | O(n) | إدراج | ✅ |
| `LinkedList` | O(1) أطراف | O(n) | إدراج | ✅ |
| `HashSet` | O(1) | O(1) | ❌ | ❌ |
| `TreeSet` | O(log n) | O(log n) | طبيعي | ❌ |
| `HashMap` | O(1) | O(1) | ❌ | مفاتيح فريدة |
| `TreeMap` | O(log n) | O(log n) | مفاتيح | مفاتيح فريدة |
| `PriorityQueue` | O(log n) | O(n) | أولوية | ✅ |
| `Stack` | O(1) | O(n) | LIFO | ✅ |

---

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
|---|---|
| 1 | `Generics` لا تقبل primitive types — استخدم wrapper classes |
| 2 | `GenericStack<Integer>` ≠ subtype من `GenericStack<Number>` — استخدم wildcard |
| 3 | لتعريف نوع جنيريك للكلاس: بعد الاسم. للدالة: قبل return type |
| 4 | `binarySearch` يتطلب قائمة مرتبة وإلا النتيجة غير محددة |
| 5 | `TreeSet` و`TreeMap` يتطلبان `Comparable` أو `Comparator` |
| 6 | `poll()` = null عند الفراغ. `remove()` = Exception عند الفراغ |
| 7 | `Comparable` ترتيب واحد داخل الكلاس. `Comparator` ترتيبات متعددة خارجه |
| 8 | `Inner Class` يصل لـ private members للكلاس الخارجي |
| 9 | Java 8: `default` methods قابلة للتجاوز، `static` methods لا تُورث |
| 10 | `retainAll` = تقاطع. `addAll` = اتحاد. `removeAll` = فرق |

---

<!-- VALIDATION
schema: 1.0
parts: detailed_explanation, summary, mcq, scenario_cluster, debug, exercise, analysis_exercise, trace_exercise, qa_cards, theory, self_check, cheat_sheet, full_code
mcq_count: 25
debug_count: 6
qa_count: 25
theory_count: 12
trace_count: 5
scenario_count: 4
lang: ar
lecture: 4
topic: Generics and Collections
-->


# المحاضرة 5 — Lambda and Streams (لامبدا والتدفقات)
> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** Lambda Expressions, Functional Interfaces, Streams API في Java SE 8

---

## الجزء الأول: الشرح التفصيلي

> **مهم**: فئة المحاضرة → **Lambda And Streams**. الأدوات المحورية: `Lambda`, `Stream`, `filter`, `map`, `reduce`, `collect`, `parallel streams`, `IntStream`, `Collectors`.

---

### 1. Java SE 8 Functional Interfaces (الواجهات الوظيفية)

#### النص الأصلي يقول:
> Prior to Java SE 8, Java supported procedural programming, object-oriented programming, and generic programming. Java SE 8 adds functional programming as part of Project Lambda — faster, more concisely, easier to parallelize, can take advantage of multi-core architectures. Functional programming focuses on immutability — not modifying the data source.

#### الشرح المبسّط:
قبل `Java 8`، كنت تخبر الحاسوب **كيف** يعمل خطوة بخطوة (`what you do`). مع `Java 8` أصبحت تخبره **ماذا تريد** (`what you want`) وهو يختار أفضل طريقة تنفيذ. البرمجة الوظيفية تعمل على البيانات دون تعديلها (immutability)، كمن يقرأ كتاباً دون محوه.

**لماذا؟** أسلوب الـ `functional` أسرع وأقصر وأسهل للتوازي على معالجات متعددة.

**💡 التشبيه:**
> مطعم يسألك "ماذا تريد أن تأكل؟" (functional) بدل أن تدخل المطبخ وتطبخ بنفسك (procedural).
> **وجه الشبه:** طلب الطعام = `what you want` — الطبخ اليدوي = `what you do`

#### مثال من الامتحان:
> **Q:** Which feature was added to Java as part of Project Lambda?
> أ) Generics  ب) Functional Programming  ج) Multi-threading  د) Serialization
> **كيف يُختبر هذا في الامتحان؟** MCQ مباشر — يُسأل دائماً لأنه المفهوم التأسيسي للمحاضرة.

---

### 1.1. الواجهات الوظيفية (Functional Interfaces)

#### النص الأصلي يقول:
> Functional interfaces are also known as single abstract method (SAM) interfaces. Package java.util.function contains six basic functional interfaces:
> - `BinaryOperator<T>` : `T apply(T,T)`
> - `Consumer<T>` : `void accept(T)`
> - `Function<T,R>` : `R apply(T)`
> - `Predicate<T>` : `boolean test(T)`
> - `Supplier<T>` : `T get()`
> - `UnaryOperator<T>` : `T apply(T)`

#### الشرح المبسّط:
`Functional Interface` هي واجهة تحتوي على **دالة مجردة واحدة فقط** (`Single Abstract Method = SAM`). هذه الدالة الواحدة هي ما تُطبّق عليه `lambda expression`. الحزمة `java.util.function` تأتي بستة واجهات أساسية جاهزة.

**لماذا؟** وجود دالة واحدة يجعل الكومبايلر يعرف تلقائياً أن `lambda` يُطبّق أي دالة.

| الواجهة | التوقيع | الوصف | مثال الاستخدام |
|---|---|---|---|
| `BinaryOperator<T>` | `T apply(T, T)` | تأخذ قيمتين من نوع T، ترجع نفس النوع | جمع عددين |
| `Consumer<T>` | `void accept(T)` | تأخذ قيمة ولا ترجع شيئاً | طباعة قيمة |
| `Function<T,R>` | `R apply(T)` | تأخذ T وترجع R | تحويل String لـ Integer |
| `Predicate<T>` | `boolean test(T)` | تأخذ قيمة وترجع true/false | فلترة |
| `Supplier<T>` | `T get()` | لا تأخذ شيئاً وترجع قيمة | إنشاء كائن |
| `UnaryOperator<T>` | `T apply(T)` | تأخذ T وترجع T | تحويل String لـ uppercase |

#### مهم للامتحان ⚠️:
> كلمة SAM تعني "Single Abstract Method" — كل `functional interface` تحتوي على دالة مجردة **واحدة فقط**.

#### مثال من الامتحان:
> **Q:** Which functional interface returns `boolean` when testing a condition?
> أ) `Consumer<T>`  ب) `Supplier<T>`  ج) `Predicate<T>`  د) `Function<T,R>`
> **كيف يُختبر؟** MCQ على التعرف — يختبر حفظ توقيع كل واجهة.

---

### 2. Lambda Expressions (تعبيرات لامبدا)

#### النص الأصلي يقول:
> A lambda expression represents an anonymous method — a shorthand notation for implementing a functional interface. The type of a lambda is the type of the functional interface that the lambda implements. Lambda expressions can be used anywhere functional interfaces are expected. A lambda consists of a parameter list followed by the arrow token and a body: `(parameterList) -> {statements}`

#### الشرح المبسّط:
`Lambda expression` هو طريقة مختصرة لكتابة دالة بدون اسم (`anonymous method`). بدلاً من إنشاء كلاس كامل لتطبيق `Functional Interface`، تكتب الدالة مباشرة بصيغة `(parameters) -> body`.

**لماذا؟** يختصر الكود الطويل ويجعله أوضح وأقل تكراراً.

**💡 التشبيه:**
> بدلاً من أن تكتب وصفة طبخ كاملة، تقول "افعل: أضف الملح ثم اخلط" — هذه هي الـ `lambda`.
> **وجه الشبه:** الوصفة المختصرة = `lambda expression` — الوصفة الكاملة = `anonymous class`

#### 💻 الكود: أشكال كتابة Lambda

**ما هذا الكود؟**
> يوضّح الأشكال المختلفة لكتابة `lambda expression` تبعاً لعدد المعاملات وهيكل الجسم.

```java
// Form 1: No parameters, single statement
Runnable r = () -> System.out.println("Hello");

// Form 2: One parameter, single expression (no braces needed)
Consumer<String> c = s -> System.out.println(s);

// Form 3: Multiple parameters, single expression
BinaryOperator<Integer> add = (x, y) -> x + y;

// Form 4: Multiple statements (braces required)
Consumer<String> c2 = s -> {
    System.out.println("Name: " + s);
    System.out.println("Length: " + s.length());
};

// Form 5: With explicit types
BinaryOperator<Integer> multiply = (Integer x, Integer y) -> x * y;
```

#### شرح كل سطر:
1. `() -> ...` → لا معاملات — الأقواس فارغة
2. `s -> ...` → معامل واحد — يمكن حذف الأقواس
3. `(x, y) -> x + y` → معاملان — الجسم تعبير واحد = النتيجة ترجع تلقائياً
4. `{ ... }` → عند وجود أكثر من جملة يجب الأقواس المعقوفة
5. `(Integer x, Integer y)` → نوع صريح (اختياري لأن الكومبايلر يستنتجه)

#### مهم للامتحان ⚠️:
> إذا كان جسم الـ `lambda` جملة واحدة، يمكن حذف `return` والأقواس `{}`. إذا كان متعدداً — `{}` و`return` إلزاميان.

#### مثال من الامتحان:
> **Q:** Which is a valid lambda expression for a `Predicate<Integer>` that checks if a number is even?
> أ) `(x) -> x % 2`  ب) `x -> x % 2 == 0`  ج) `x -> { x % 2 == 0 }`  د) `() -> x % 2 == 0`
> **كيف يُختبر؟** سيناريو كود — يختبر الصياغة الصحيحة.

---

### 3. Streams — مقدمة

#### النص الأصلي يقول:
> Streams are objects that implement interface `Stream` (from `java.util.stream`) and enable you to perform functional programming tasks. Streams — known as a stream pipeline — begin with a data source, perform various intermediate operations, and end with a terminal operation. Unlike collections, streams do not have their own storage — once a stream is processed, it cannot be reused. An intermediate operation specifies tasks to perform on the stream's elements and always results in a new stream. A stream is a transient object for processing data. After data is processed, the stream is destroyed.

#### الشرح المبسّط:
`Stream` ليس مجموعة بيانات (لا يخزّن شيئاً)، بل هو **خط معالجة** (pipeline) يعمل على بيانات من مصدر، ينفّذ تحويلات، ثم ينتهي بعملية نهائية. بعد الانتهاء لا يمكن إعادة استخدام نفس الـ `Stream`.

**لماذا؟** الـ `Stream` مؤقت (`transient`) لأن هدفه المعالجة لا التخزين — يُفصل التخزين (Collection) عن المعالجة (Stream).

**الفهم الخاطئ الشائع ❌:** `Stream` يُخزّن البيانات مثل `ArrayList`.
**الفهم الصحيح ✅:** `Stream` لا يُخزّن شيئاً — يعالج فقط، ويُدمَّر بعد الاستخدام.

#### 📊 المخطط: بنية Stream Pipeline

#### ما هذا المخطط؟
> يوضّح التسلسل الثلاثي لأي `stream pipeline`: المصدر → عمليات وسيطة → عملية نهائية.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
|---|---|---|---|
| 1 | Source (مصدر) | event | مصدر البيانات: مصفوفة، قائمة، مجموعة |
| 2 | Create Stream | process | `.stream()` أو `Stream.of()` |
| 3 | Intermediate Ops | process | صفر أو أكثر: `filter`, `map`, `sorted`, `limit`, `skip`, `distinct` |
| 4 | Terminal Op | event | واحدة فقط: `count`, `forEach`, `collect`, `reduce` |
| 5 | Result | end | النتيجة — الـ Stream يُدمَّر بعدها |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|---|---|---|---|---|
| Source | Create Stream | إنشاء | → | يحوّل المصدر لـ stream |
| Create Stream | Intermediate Ops | تمرير | → | يمرر elements |
| Intermediate Ops | Terminal Op | إنهاء | → | يُوجد النتيجة |
| Terminal Op | Result | تدمير | → | Stream ينتهي |

```diagram
type: flowchart
title: Stream Pipeline
direction: TD
nodes:
  - id: src
    label: Source (Array/List/Set)
    kind: event
    level: 0
  - id: create
    label: .stream() / Stream.of()
    kind: process
    level: 1
  - id: inter
    label: Intermediate Operations\n(filter, map, sorted, limit…)
    kind: process
    level: 2
  - id: term
    label: Terminal Operation\n(count, forEach, collect…)
    kind: process
    level: 3
  - id: result
    label: Result — Stream Destroyed
    kind: event
    level: 4
edges:
  - from: src
    to: create
    label: ""
  - from: create
    to: inter
    label: ""
  - from: inter
    to: term
    label: ""
  - from: term
    to: result
    label: ""
```

#### مثال من الامتحان:
> **Q:** Which statement about Java Streams is TRUE?
> أ) A stream stores data like an ArrayList  ب) A stream can be reused after processing  ج) A stream is destroyed after a terminal operation  د) A stream requires exactly one intermediate operation
> **كيف يُختبر؟** MCQ تمييزي — خصائص `Stream` مقابل `Collection`.

---

### 3.1. عمليات الـ Stream — Intermediate vs Terminal

#### النص الأصلي يقول:
> Interface `java.util.stream.Stream<T>` — Intermediate operations: `distinct()`, `filter()`, `limit()`, `skip()`, `sorted()`, `sorted(comparator)`, `map()`, `mapToInt()`, `mapToLong()`, `mapToDouble()`. Terminal operations: `count()`, `max()`, `min()`, `findFirst()`, `findAny()`, `allMatch()`, `anyMatch()`, `noneMatch()`, `forEach()`, `reduce()`, `collect()`, `toArray()`. Static methods: `empty()`, `of(values...)`, `concat()`.

#### الشرح المبسّط:
العمليات الوسيطة (`Intermediate`) تُنتج `Stream` جديداً — يمكن تسلسلها. العمليات النهائية (`Terminal`) تُنهي الـ pipeline وتُرجع نتيجة (رقم، قائمة، قيمة). الـ `Static methods` تُنشئ `Stream` من الصفر.

| نوع العملية | الخصائص | أمثلة |
|---|---|---|
| `Intermediate` | ترجع `Stream<T>` — قابلة للتسلسل — lazy (لا تُنفَّذ حتى التيرمينال) | `filter`, `map`, `sorted`, `limit`, `skip`, `distinct` |
| `Terminal` | ترجع نتيجة — تُنهي الـ pipeline — تُفعّل الـ lazy operations | `count`, `collect`, `forEach`, `reduce`, `max`, `min` |
| `Static` | تُنشئ `Stream` جديد | `Stream.of(...)`, `Stream.empty()`, `Stream.concat()` |

#### مهم للامتحان ⚠️:
> الـ `Intermediate operations` هي **lazy** — لا تُنفَّذ فعلياً إلا عند وصول `Terminal operation`.

#### 🤔 تفعيل الفهم:
> **سؤال:** لو كتبت `.filter().map()` بدون `terminal operation` هل سيُنفَّذ الكود؟
> **لماذا هذا مهم؟** يساعدك تفهّم الـ laziness في كتابة pipelines فعّالة وتتبّع الأخطاء الصامتة.

#### مثال من الامتحان:
> **Q:** Which of the following is a terminal operation in the Stream API?
> أ) `filter()`  ب) `map()`  ج) `sorted()`  د) `collect()`
> **كيف يُختبر؟** MCQ تمييزي — يُسأل كثيراً لأن الفرق جوهري.

---

### 4. أول مثال عملي على الـ Streams

#### النص الأصلي يقول:
> Example — Numbers greater than 60 in array of Double objects:
> ```
> Double[] numbers = {2.4, 55.6, 90.12, 26.6};
> Set<Double> set11 = new HashSet<>(Arrays.asList(numbers));
> // Traditional way:
> for (double e : set11) { if (e > 60) count++; }
> // Stream way:
> set11.stream().filter(e -> e > 60).count();
> ```

#### الشرح المبسّط:
هذا المثال يُقارن الأسلوب التقليدي (حلقة + شرط) بأسلوب الـ `Stream` (pipeline). النتيجة واحدة لكن الكود الوظيفي أقصر وأوضح.

#### 🔄 قبل / بعد: عدّ العناصر الأكبر من 60

**قبل:**
```java
// Traditional approach — manual iteration
int count = 0;
for (double e : set11)
    if (e > 60) count++;
System.out.println("Count is " + count);
```

**بعد:**
```java
// Stream approach — declarative pipeline
System.out.println("Count is " + set11.stream()
    .filter(e -> e > 60)
    .count());
```

**ماذا تغيّر؟** حُذفت الحلقة والمتغير المؤقت — الـ `Stream` يُدير التكرار داخلياً.

---

### 5. StreamDemo1 — أمثلة متنوعة على Stream

#### النص الأصلي يقول:
> `Stream<String>` words، `Stream<Integer>` digits، `Stream.of(digitArray)`، `IntStream.of(1,2,3,4)`، `myList.stream().filter().map().sorted().forEach()`، `Arrays.stream(new int[]{}).map().average().ifPresent()`

#### 💻 الكود: StreamDemo1 — أشكال إنشاء وتشغيل Streams

**ما هذا الكود؟**
> يُظهر الطرق المختلفة لإنشاء `Stream` من Strings وIntegers ومصفوفات، مع أمثلة على pipeline متسلسلة.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamDemo1 {
    public static void main(String[] args) {

        // Create Stream<String> from varargs
        Stream<String> words = Stream.of("Mary", "had", "a", "little", "lamb");
        words.forEach(e -> System.out.println(e)); // print each word on new line

        // Create Stream<Integer> from varargs
        Stream<Integer> digits = Stream.of(3, 1, 4, 1, 5, 9);
        digits.forEach(e -> System.out.print(e)); // print without newline
        System.out.println();

        // Create Stream<Integer> from array
        Integer[] digitArray = {3, 1, 4, 1, 5, 9};
        Stream<Integer> digitStream = Stream.of(digitArray);
        digitStream.forEach(e -> System.out.print(e));

        // Create IntStream from int varargs (primitive stream)
        IntStream.of(1, 2, 3, 4).forEach(element -> System.out.print(element));

        // Chain: filter strings starting with "c", uppercase, sort, print
        List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");
        myList.stream()
            .filter(s -> s.startsWith("c"))   // keep only "c*" strings
            .map(String::toUpperCase)          // convert to uppercase
            .sorted()                          // sort alphabetically
            .forEach(System.out::println);     // print each

        // Chain on int array: double+1 each, compute average, print if present
        Arrays.stream(new int[]{1, 2, 3})
            .map(n -> 2 * n + 1)               // transform: 3, 5, 7
            .average()                         // compute average = 5.0
            .ifPresent(System.out::println);   // print only if value exists
    }
}
```

#### شرح كل سطر:
1. `Stream.of("Mary", ...)` → ينشئ `Stream<String>` من قيم مباشرة
2. `words.forEach(e -> ...)` → `Terminal` — يطبع كل عنصر
3. `Stream.of(3,1,4,1,5,9)` → `Stream<Integer>` — autoboxing من int
4. `Stream.of(digitArray)` → من مصفوفة `Integer[]` (object array)
5. `IntStream.of(1,2,3,4)` → stream بدائي أكثر كفاءة من `Stream<Integer>`
6. `.filter(s -> s.startsWith("c"))` → intermediate — يُرجع stream مفلتر
7. `.map(String::toUpperCase)` → method reference بدل lambda
8. `.sorted()` → ترتيب طبيعي
9. `Arrays.stream(new int[]{...})` → `IntStream` من مصفوفة int بدائية
10. `.average()` → ترجع `OptionalDouble`
11. `.ifPresent(...)` → تطبع فقط إذا كانت القيمة موجودة

**المكتبات المطلوبة (Imports):**
> `import java.util.Arrays;` `import java.util.List;` `import java.util.stream.IntStream;` `import java.util.stream.Stream;`

**الناتج المتوقع:**
> Mary / had / a / little / lamb / 314159 / 314159 / 1234 / C1 / C2 / 5.0

#### نقطة مهمة ⚠️:
> `Stream.of(array)` مع `Integer[]` (object) تُنشئ `Stream<Integer>`. أما `Arrays.stream(new int[]{...})` مع `int[]` (primitive) تُنشئ `IntStream`. لا تخلطهما!

---

### 6. قراءة ملف وتصفيته بالـ Stream

#### النص الأصلي يقول:
> Read from `countries.txt`, count words with length > 5 using both traditional loop and stream pipeline.

#### 💻 الكود: StreamDemo — قراءة ملف وفلترة

**ما هذا الكود؟**
> يقرأ أسماء دول من ملف نصي، ثم يعدّ الكلمات التي يزيد طولها عن 5 أحرف بطريقتين: حلقة تقليدية وstream pipeline.

```java
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StreamDemo {
    public static void main(String[] args) throws IOException {

        // Open file scanner
        Scanner in = new Scanner(new File("countries.txt"));
        List<String> wordList = new ArrayList<>();

        // Read all lines into list
        while (in.hasNextLine()) {
            wordList.add(in.nextLine()); // add each line as a string
        }

        // Traditional way: count words with length > 5
        long count = 0;
        for (String w : wordList) {
            if (w.length() > 5) { count++; }
        }
        System.out.println("Long words: " + count);

        // Stream way: same logic in one pipeline
        count = wordList.stream()
                .filter(w -> w.length() > 5) // keep words longer than 5 chars
                .count();                     // terminal: return count
        System.out.println("Long words: " + count);
    }
}
```

#### شرح كل سطر:
1. `new Scanner(new File("countries.txt"))` → يفتح ملفاً للقراءة
2. `while(in.hasNextLine())` → يقرأ حتى نهاية الملف
3. `wordList.add(in.nextLine())` → يُضيف كل سطر للقائمة
4. `wordList.stream()` → يحوّل `List` لـ `Stream<String>`
5. `.filter(w -> w.length() > 5)` → predicate: يُبقي الكلمات الطويلة
6. `.count()` → terminal: يُرجع العدد

---

### 7. IntStream Operations — عمليات على التدفقات البدائية

#### النص الأصلي يقول:
> `IntStream.of(values).forEach`, `.count()`, `.min().getAsInt()`, `.max().getAsInt()`, `.sum()`, `.average().getAsDouble()`, `.reduce(0, (x,y) -> x+y)`, `.reduce(1, (x,y)->x*y)`, `.filter().map().sorted().forEach()`, `IntStream.range(1,10).sum()`, `IntStream.rangeClosed(1,10).sum()`

#### 💻 الكود: IntStreamOperations

**ما هذا الكود؟**
> يُطبّق جميع العمليات الأساسية على `IntStream` من حساب المجموع والمتوسط وصولاً للـ `reduce` والفلترة والتعيين.

```java
import java.util.stream.IntStream;

public class IntStreamOperations {
    public static void main(String[] args) {
        int[] values = {3, 10, 6, 1, 4, 8, 2, 5, 9, 7};

        // Print all elements
        IntStream.of(values).forEach(value -> System.out.print(value + " "));
        System.out.println();

        // Terminal statistics
        System.out.println(IntStream.of(values).count());            // 10
        System.out.println(IntStream.of(values).min().getAsInt());   // 1
        System.out.println(IntStream.of(values).max().getAsInt());   // 10
        System.out.println(IntStream.of(values).sum());              // 55
        System.out.println(IntStream.of(values).average().getAsDouble()); // 5.5

        // reduce: sum using identity 0
        System.out.println(IntStream.of(values).reduce(0, (x, y) -> x + y)); // 55

        // reduce: sum of squares using identity 0
        System.out.println(IntStream.of(values).reduce(0, (x, y) -> x + y * y)); // 385

        // reduce: product using identity 1
        System.out.println(IntStream.of(values).reduce(1, (x, y) -> x * y)); // 3628800

        // Chain: filter odd, multiply by 10, sort, print
        IntStream.of(values)
                .filter(value -> value % 2 != 0)  // keep odds: 3,1,5,9,7
                .map(value -> value * 10)          // multiply: 30,10,50,90,70
                .sorted()                          // sort: 10,30,50,70,90
                .forEach(value -> System.out.print(value + " "));
        System.out.println();

        // range: 1 to 9 (exclusive end) → sum = 45
        System.out.println(IntStream.range(1, 10).sum());

        // rangeClosed: 1 to 10 (inclusive end) → sum = 55
        System.out.println(IntStream.rangeClosed(1, 10).sum());
    }
}
```

#### شرح كل سطر:
1. `IntStream.of(values)` → `IntStream` من int array
2. `.min().getAsInt()` → ترجع `OptionalInt` — يجب استدعاء `.getAsInt()` لاستخراج القيمة
3. `.average().getAsDouble()` → ترجع `OptionalDouble`
4. `.reduce(0, (x,y) -> x+y)` → identity=0، accumulator يجمع تراكمياً
5. `.reduce(1, (x,y) -> x*y)` → identity=1، يضرب تراكمياً (لأن 0*أي شيء = 0)
6. `IntStream.range(1,10)` → من 1 إلى 9 (**لا يشمل** 10)
7. `IntStream.rangeClosed(1,10)` → من 1 إلى 10 (**يشمل** 10)

**الناتج المتوقع:**
> 3 10 6 1 4 8 2 5 9 7 / 10 / 1 / 10 / 55 / 5.5 / 55 / 385 / 3628800 / 10 30 50 70 90 / 45 / 55

#### مهم للامتحان ⚠️:
> الفرق بين `range(1,10)` (يُنتج 1-9) و`rangeClosed(1,10)` (يُنتج 1-10). سؤال تتبّع كلاسيكي.

#### مثال من الامتحان:
> **Q:** What is the result of `IntStream.range(1, 5).sum()`?
> أ) 15  ب) 14  ج) 10  د) 4
> **كيف يُختبر؟** تتبّع — `range` لا يشمل النهاية فالمجموع 1+2+3+4=10.

---

### 8. Arrays and Streams — استخدام Stream مع المصفوفات

#### النص الأصلي يقول:
> `Arrays.stream(values).sorted().collect(Collectors.toList())`, filter and collect, sorted collected.

#### 💻 الكود: ArraysAndStreams

**ما هذا الكود؟**
> يُوضّح كيفية تحويل مصفوفة لـ `Stream` ثم الفرز والفلترة وجمع النتائج في `List` جديدة باستخدام `Collectors.toList()`.

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ArraysAndStreams {
    public static void main(String[] args) {
        Integer[] values = {2, 9, 5, 0, 3, 7, 1, 4, 8, 6};

        // Print as list without modification
        System.out.println(Arrays.asList(values));

        // Collect sorted stream into new List
        System.out.println(Arrays.stream(values)
                .sorted()
                .collect(Collectors.toList()));

        // Filter > 4, collect into List (unsorted)
        List<Integer> greaterThan4 = Arrays.stream(values)
                .filter(value -> value > 4)
                .collect(Collectors.toList());
        System.out.println(greaterThan4);

        // Filter > 4, sort, collect
        System.out.println(Arrays.stream(values)
                .filter(value -> value > 4)
                .sorted()
                .collect(Collectors.toList()));

        // Sort an already-filtered list using stream
        System.out.println(greaterThan4.stream()
                .sorted()
                .collect(Collectors.toList()));
    }
}
```

#### شرح كل سطر:
1. `Arrays.asList(values)` → عرض بدون أي تعديل
2. `Arrays.stream(values)` → `Stream<Integer>` من `Integer[]`
3. `.sorted()` → ترتيب تصاعدي طبيعي
4. `.collect(Collectors.toList())` → terminal: يجمع في `List<Integer>`
5. `.filter(value -> value > 4)` → يُبقي 5,6,7,8,9 فقط

**الناتج المتوقع:**
> [2, 9, 5, 0, 3, 7, 1, 4, 8, 6] / [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] / [9, 5, 7, 8, 6] / [5, 6, 7, 8, 9] / [5, 6, 7, 8, 9]

---

### 9. Stream على String Arrays — عمليات متقدمة

#### النص الأصلي يقول:
> `limit(4)`, `skip(4)`, `sorted((e1,e2) -> e1.compareToIgnoreCase(e2))`, `String::compareToIgnoreCase`, `max(String::compareTo)`, `min`, `anyMatch`, `allMatch`, `noneMatch`, `map().distinct().count()`, `map(String::toLowerCase).findFirst()`, `skip(4).sorted().findAny()`, `.map().toArray()`

#### 💻 الكود: StreamDemo — عمليات String متقدمة

**ما هذا الكود؟**
> يُغطّي عمليات `limit`, `skip`, مقارنة case-insensitive, `max/min`, `anyMatch/allMatch/noneMatch`, `distinct`, `findFirst`, `findAny`, تحويل لـ `toArray`.

```java
import java.util.stream.Stream;

public class StreamDemo {
    public static void main(String[] args) {
        String[] names = {"John", "Peter", "Susan", "kim", "Jen",
                "George", "Alan", "Stacy", "Michelle", "john"};

        // Take first 4, sort, print
        Stream.of(names).limit(4)
                .sorted()
                .forEach(e -> System.out.print(e + " "));
        System.out.println();
        // Output: John Peter Susan kim

        // Skip first 4, sort case-insensitive using lambda
        Stream.of(names).skip(4)
                .sorted((e1, e2) -> e1.compareToIgnoreCase(e2))
                .forEach(e -> System.out.print(e + " "));
        System.out.println();

        // Skip first 4, sort case-insensitive using method reference
        Stream.of(names).skip(4)
                .sorted(String::compareToIgnoreCase)
                .forEach(e -> System.out.print(e + " "));
        System.out.println();

        // Find the lexicographically max name with length > 4
        System.out.println(Stream.of(names)
                .filter(e -> e.length() > 4)
                .max(String::compareTo)
                .get()); // Susan

        // Find the lexicographically min name
        System.out.println(Stream.of(names).min(String::compareTo).get()); // Alan

        // Check if "Stacy" exists
        System.out.println(Stream.of(names).anyMatch(e -> e.equals("Stacy"))); // true

        // Check if ALL names start with uppercase
        System.out.println(Stream.of(names)
                .allMatch(e -> Character.isUpperCase(e.charAt(0)))); // false — "kim","john"

        // Check if NO name starts with "Ko"
        System.out.println(Stream.of(names).noneMatch(e -> e.startsWith("Ko"))); // true

        // Uppercase all, remove duplicates, count
        System.out.println(Stream.of(names)
                .map(e -> e.toUpperCase())
                .distinct().count()); // 9 (John and john → JOHN, only counted once)

        // Lowercase first element
        System.out.println(Stream.of(names)
                .map(String::toLowerCase)
                .findFirst().get()); // john

        // Skip 4, sort, return any element
        System.out.println(Stream.of(names).skip(4).sorted().findAny().get()); // Alan

        // Lowercase all, convert to Object array
        Object[] namesInLowerCase = Stream.of(names)
                .map(String::toLowerCase).toArray();
        System.out.println(java.util.Arrays.toString(namesInLowerCase));
    }
}
```

#### شرح كل سطر:
1. `.limit(4)` → يأخذ أول 4 عناصر فقط
2. `.skip(4)` → يتخطى أول 4 عناصر
3. `.sorted((e1,e2)->e1.compareToIgnoreCase(e2))` → comparator مخصص
4. `String::compareToIgnoreCase` → method reference تعادل lambda السابقة
5. `.max(String::compareTo)` → يجد الحد الأقصى lexicographically
6. `.get()` → يستخرج القيمة من `Optional<String>` (لا تستخدم بدون تحقق في الإنتاج)
7. `.anyMatch(...)` → صحيح إذا انطبق الشرط على عنصر واحد على الأقل
8. `.allMatch(...)` → صحيح إذا انطبق الشرط على **جميع** العناصر
9. `.noneMatch(...)` → صحيح إذا **لم ينطبق** الشرط على أي عنصر
10. `.distinct()` → يُزيل التكرارات (بعد uppercase تصبح john وJohn كلاهما JOHN)
11. `.findFirst()` → يُرجع أول عنصر كـ `Optional`
12. `.findAny()` → يُرجع أي عنصر (يفيد في parallel streams)

#### مهم للامتحان ⚠️:
> `allMatch/anyMatch/noneMatch` تُرجع `boolean`. `findFirst/findAny` تُرجع `Optional<T>`.

#### مثال من الامتحان:
> **Q:** Given names = {"John","john"}, what does `Stream.of(names).map(e->e.toUpperCase()).distinct().count()` return?
> أ) 2  ب) 1  ج) 0  د) خطأ في الترجمة
> **كيف يُختبر؟** تتبع — `distinct()` يُزيل التكرار بعد التحويل.

---

### 10. IntStream, LongStream, DoubleStream — تدفقات الأنواع البدائية

#### النص الأصلي يقول:
> `IntStream`, `LongStream`, and `DoubleStream` are special types of streams for processing a sequence of primitive `int`, `long`, and `double` values. `IntStream.of(values).distinct().filter(e->e>3 && e%2==0).average().getAsDouble()` → 10.0. `IntStream.of(values).limit(4).sum()` → 13.

#### الشرح المبسّط:
هذه تدفقات مخصّصة للأنواع البدائية، أكثر كفاءة من `Stream<Integer>` لأنها تتجنب الـ `autoboxing/unboxing`. لها نفس عمليات الـ `Stream<T>` بالإضافة لدوال إحصائية مدمجة.

| النوع | للمعالجة | الكفاءة مقابل |
|---|---|---|
| `IntStream` | `int` بدائي | `Stream<Integer>` |
| `LongStream` | `long` بدائي | `Stream<Long>` |
| `DoubleStream` | `double` بدائي | `Stream<Double>` |

#### 💻 الكود: IntStreamDemo — distinct + filter + average + limit + summaryStatistics

**ما هذا الكود؟**
> يُطبّق `distinct`، فلترة مزدوجة، `average`، ثم `summaryStatistics` لطباعة إحصاءات شاملة.

```java
import java.util.IntSummaryStatistics;
import java.util.stream.IntStream;

public class IntStreamDemo {
    public static void main(String[] args) {
        int[] values = {3, 4, 1, 5, 20, 1, 3, 3, 4, 6};

        // Remove duplicates, keep > 3 AND even, compute average
        // Distinct values: {3,4,1,5,20,6} → filter >3 & even → {4,20,6} → avg = 10.0
        System.out.println(IntStream.of(values).distinct()
                .filter(e -> e > 3 && e % 2 == 0)
                .average().getAsDouble()); // 10.0

        // Sum of first 4 elements: 3+4+1+5 = 13
        System.out.println(IntStream.of(values).limit(4).sum()); // 13

        // Compute all statistics in one pass
        IntSummaryStatistics stats = IntStream.of(values).summaryStatistics();
        System.out.printf("%-10s%10d%n", "Count:", stats.getCount());    // 10
        System.out.printf("%-10s%10d%n", "Max:",   stats.getMax());      // 20
        System.out.printf("%-10s%10d%n", "Min:",   stats.getMin());      // 1
        System.out.printf("%-10s%10d%n", "Sum:",   stats.getSum());      // 50
        System.out.printf("%-10s%10.2f%n","Average:",stats.getAverage());// 5.00
    }
}
```

#### شرح كل سطر:
1. `.distinct()` → يُزيل التكرارات: {3,4,1,5,20,6}
2. `.filter(e -> e > 3 && e % 2 == 0)` → شرطان: أكبر من 3 **و** زوجي
3. `.average()` → `OptionalDouble` — يجب `.getAsDouble()`
4. `.summaryStatistics()` → terminal يُرجع `IntSummaryStatistics` بكل الإحصاءات دفعة واحدة
5. `stats.getCount/Max/Min/Sum/Average()` → قراءة الإحصاءات

**الناتج المتوقع:**
> 10.0 / 13 / Count: 10 / Max: 20 / Min: 1 / Sum: 50 / Average: 5.00

---

### 11. mapToInt — تحويل Stream إلى IntStream

#### النص الأصلي يقول:
> `Stream.of(names).mapToInt(e -> e.length()).sum()` → Total character count for all names is 47

#### الشرح المبسّط:
`mapToInt()` تُحوّل `Stream<T>` إلى `IntStream` بتطبيق دالة تُرجع `int`. يفيد لحساب إجماليات رقمية على كائنات.

#### 💻 الكود: mapToInt — مجموع أطوال الأسماء

```java
import java.util.stream.Stream;

public class IntStreamDemo2 {
    public static void main(String[] args) {
        String[] names = {"John", "Peter", "Susan", "Kim", "Jen",
                "George", "Alan", "Stacy", "Michelle", "john"};

        // Map each name to its length, then sum all lengths
        System.out.println("Total character count for all names is " +
                Stream.of(names)
                        .mapToInt(e -> e.length()) // String → int
                        .sum());                    // terminal: sum all ints
        // Output: 47
    }
}
```

#### شرح كل سطر:
1. `Stream.of(names)` → `Stream<String>`
2. `.mapToInt(e -> e.length())` → يُحوّل لـ `IntStream` (كل string يصبح طوله)
3. `.sum()` → terminal: مجموع كل الأطوال

---

### 12. Parallel Streams — التدفقات المتوازية

#### النص الأصلي يقول:
> `IntStream.of(list).filter(e->e>0).sorted().limit(5).toArray()` — Sequential execution time is 312 millis. Adding `.parallel()` — Parallel execution time is 234 millis. With 4 processors and 20M elements: sequential 3275ms, parallel 1217ms.

#### الشرح المبسّط:
`parallel()` تُحوّل الـ `stream` لنمط معالجة موزّعة على أكثر من خيط (`thread`) — كل جزء من البيانات يُعالَج بشكل مستقل. كلما زادت البيانات وعدد المعالجات، زادت الفائدة.

**💡 التشبيه:**
> بدل أن يُعدّ مُدقق واحد 1000 ورقة امتحان، تُوزّعها على 4 مدققين → ينتهون 4 مرات أسرع.
> **وجه الشبه:** المدققون = المعالجات/الخيوط — أوراق الامتحان = عناصر الـ stream

#### 💻 الكود: ParallelStreamDemo

**ما هذا الكود؟**
> يُقارن وقت تنفيذ نفس الـ pipeline بنمطي sequential وparallel على 2 مليون عنصر.

```java
import java.util.Arrays;
import java.util.Random;
import java.util.stream.IntStream;

public class ParallelStreamDemo {
    public static void main(String[] args) {
        Random random = new Random();
        int[] list = random.ints(2000000).toArray(); // generate 2M random ints

        System.out.println("Number of processors: " +
                Runtime.getRuntime().availableProcessors());

        // --- Sequential execution ---
        long startTime = System.currentTimeMillis();
        int[] list1 = IntStream.of(list)
                .filter(e -> e > 0)   // keep positives
                .sorted()             // sort ascending
                .limit(5)             // take first 5
                .toArray();           // terminal: to array
        System.out.println(Arrays.toString(list1));
        long endTime = System.currentTimeMillis();
        System.out.println("Sequential execution time is " +
                (endTime - startTime) + " millis");

        // --- Parallel execution (add .parallel()) ---
        startTime = System.currentTimeMillis();
        int[] list2 = IntStream.of(list)
                .parallel()           // enable multi-core processing
                .filter(e -> e > 0)
                .sorted()
                .limit(5)
                .toArray();
        System.out.println(Arrays.toString(list2));
        endTime = System.currentTimeMillis();
        System.out.println("Parallel execution time is " +
                (endTime - startTime) + " millis");
    }
}
```

#### شرح كل سطر:
1. `random.ints(2000000).toArray()` → ينشئ 2 مليون int عشوائي
2. `Runtime.getRuntime().availableProcessors()` → عدد المعالجات المتاحة
3. `IntStream.of(list)` → sequential stream افتراضياً
4. `.parallel()` → يُحوّل لـ parallel stream (يمكن وضعها في أي مكان بالـ pipeline)
5. نفس الـ pipeline — الفرق فقط في `.parallel()`
6. كلا الكودين يُنتجان **نفس النتيجة** لكن بأوقات مختلفة

**الناتج المتوقع:**
> نفس المصفوفة — Sequential: 312ms، Parallel: 234ms (مع 2 معالجات).

#### ⚖️ المقايضة: Sequential vs Parallel Stream

| | `Sequential Stream` | `Parallel Stream` |
|---|---|---|
| المزايا | سلوك متوقع، ترتيب محفوظ | أسرع مع بيانات كبيرة ومعالجات متعددة |
| العيوب | أبطأ مع بيانات كبيرة | غير ضامن للترتيب (في بعض العمليات) |
| متى تختاره | بيانات صغيرة، عمليات بسيطة | ملايين العناصر، معالجات متعددة متاحة |

---

### 13. Stream Reduction — عملية reduce

#### النص الأصلي يقول:
> You can use the `reduce` method to reduce the elements in a stream into a single value. `IntStream.of(values).parallel().reduce(1, (e1,e2)->e1*e2)`, `mapToObj(e->e+"").reduce((e1,e2)->e1+","+e2).get()`, `Stream.of(names).reduce((x,y)->x+","+y).get()`, `reduce((x,y)->x+y).get().length()`

#### الشرح المبسّط:
`reduce` يُدمج كل عناصر الـ stream في قيمة واحدة تراكمياً. هناك نسختان: واحدة بـ `identity` (القيمة الابتدائية) وواحدة بدونها (ترجع `Optional`).

**💡 التشبيه:**
> تراكم كرة الثلج — كل خطوة تُضيف العنصر الجديد للنتيجة المتراكمة.
> **وجه الشبه:** كرة الثلج المتنامية = القيمة المتراكمة في `reduce`

#### 💻 الكود: StreamReductionDemo

**ما هذا الكود؟**
> يُوضّح استخدام `reduce` للجمع، الضرب، ودمج Strings في قيمة واحدة.

```java
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamReductionDemo {
    public static void main(String[] args) {
        int[] values = {3, 4, 1, 5, 20, 1, 3, 3, 4, 6};

        // Print all elements
        IntStream.of(values).forEach(e -> System.out.print(e + " "));
        System.out.println();

        // Product of all elements (parallel reduce with identity=1)
        System.out.println(IntStream.of(values).parallel()
                .reduce(1, (e1, e2) -> e1 * e2)); // 259200

        // Convert ints to strings, join with ", "
        System.out.println(IntStream.of(values)
                .mapToObj(e -> e + "")                      // int → String
                .reduce((e1, e2) -> e1 + ", " + e2).get()); // join

        // String array operations
        String[] names = {"John", "Peter", "Susan", "Kim"};

        // Join names with ", "
        System.out.println(Stream.of(names)
                .reduce((x, y) -> x + ", " + y).get()); // John, Peter, Susan, Kim

        // Concatenate names without separator
        System.out.println(Stream.of(names)
                .reduce((x, y) -> x + y).get()); // JohnPeterSusanKim

        // Length of concatenated result
        System.out.println(Stream.of(names)
                .reduce((x, y) -> x + y).get().length()); // 17
    }
}
```

#### شرح كل سطر:
1. `reduce(1, (e1,e2)->e1*e2)` → identity=1 (محايد للضرب)، يُرجع `int` مباشرة
2. `reduce((e1,e2)->e1+","+e2)` → بدون identity → يُرجع `Optional<String>`
3. `.get()` → يستخرج القيمة من `Optional` (خطر إذا كانت `empty`)
4. `mapToObj(e -> e + "")` → يُحوّل `IntStream` لـ `Stream<String>`
5. الفرق بين `reduce(identity, accumulator)` (ترجع T) و`reduce(accumulator)` (ترجع Optional<T>)

**الناتج المتوقع:**
> 3 4 1 5 20 1 3 3 4 6 / 259200 / 3, 4, 1, 5, 20, 1, 3, 3, 4, 6 / John, Peter, Susan, Kim / JohnPeterSusanKim / 17

#### مهم للامتحان ⚠️:
> `reduce(0, accumulator)` ترجع `int`/`long`/`double`. `reduce(accumulator)` فقط (بدون identity) ترجع `Optional<T>` — يجب استدعاء `.get()` أو `.orElse()`.

---

### 14. Collect — تجميع النتائج

#### النص الأصلي يقول:
> You can use the `collect` method to reduce the elements in a stream into a **mutable container**. `Collectors.toList()`, `Collectors.toSet()`, `Collectors.toMap(keyMapper, valueMapper)`, `Collectors.summingInt()`, `Collectors.summarizingInt()`.

#### الشرح المبسّط:
`collect` مثل `reduce` لكن يضع النتيجة في حاوية قابلة للتعديل (`mutable container`) مثل `List` أو `Set` أو `Map`. يستخدم `Collector` يصف كيفية التجميع.

**💡 التشبيه:**
> `reduce` مثل عصّارة تُعطيك عصير في كوب واحد. `collect` مثل مرشّح يُعطيك كل الفواكه المفلترة في وعاء جديد.

#### 💻 الكود: CollectDemo

**ما هذا الكود؟**
> يُوضّح جمع نتائج `Stream` في `List`، `Set`، `Map`، وحساب الإحصاءات باستخدام `Collectors`.

```java
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CollectDemo {
    public static void main(String[] args) {
        String[] names = {"John", "Peter", "Susan", "Kim", "Jen",
                "George", "Alan", "Stacy", "Michelle", "john"};

        // Collect all names into List (preserves order)
        List<String> list = Stream.of(names).collect(Collectors.toList());
        System.out.println(list);

        // Map to uppercase, collect into Set (no duplicates, no order)
        Set<String> set = Stream.of(names)
                .map(e -> e.toUpperCase())
                .collect(Collectors.toSet());
        System.out.println(set);

        // Collect into Map: name → length
        Map<String, Integer> map = Stream.of(names)
                .collect(Collectors.toMap(e -> e, e -> e.length()));
        System.out.println(map);

        // Sum all name lengths
        System.out.println(Stream.of(names)
                .collect(Collectors.summingInt(e -> e.length()))); // 47

        // Detailed statistics of name lengths
        IntSummaryStatistics stats = Stream.of(names)
                .collect(Collectors.summarizingInt(e -> e.length()));
        System.out.println("Max is " + stats.getMax());     // 8
        System.out.println("Min is " + stats.getMin());     // 3
        System.out.println("Average is " + stats.getAverage()); // 4.7
    }
}
```

#### شرح كل سطر:
1. `Collectors.toList()` → يجمع في `ArrayList` (مرتّب)
2. `Collectors.toSet()` → يجمع في `HashSet` (غير مرتّب، بلا تكرار)
3. `Collectors.toMap(keyMapper, valueMapper)` → الأول: مفتاح، الثاني: قيمة
4. `Collectors.summingInt(mapper)` → يُحوّل كل عنصر لـ int ويجمع
5. `Collectors.summarizingInt(mapper)` → يجمع إحصاءات شاملة (count, max, min, sum, avg)

**الناتج المتوقع:**
> [John, ..., john] / [JEN, GEORGE, ..., KIM, STACY] / {Michelle=8, ...} / 47 / Max is 8 / Min is 3 / Average is 4.7

| `Collector` | يُرجع | يُستخدم لـ |
|---|---|---|
| `toList()` | `List<T>` | حفظ الترتيب مع التكرار |
| `toSet()` | `Set<T>` | إزالة التكرار |
| `toMap(k,v)` | `Map<K,V>` | بناء جدول قيم |
| `summingInt(f)` | `Integer` | مجموع رقمي |
| `summarizingInt(f)` | `IntSummaryStatistics` | إحصاءات شاملة |
| `groupingBy(k)` | `Map<K, List<T>>` | التجميع بحسب مفتاح |
| `counting()` | `Long` | عدّ داخل groupingBy |
| `averagingDouble(f)` | `Double` | متوسط رقمي |

---

### 15. Grouping — التجميع حسب معيار

#### النص الأصلي يقول:
> `Collectors.groupingBy(e->e, Collectors.counting())` — groups by value and counts. `Collectors.groupingBy(e->e.charAt(0), TreeMap::new, Collectors.counting())` — groups by first char with TreeMap. `groupingBy(MyStudent::getMajor, TreeMap::new, Collectors.averagingDouble(MyStudent::getScore))`.

#### الشرح المبسّط:
`groupingBy` يُصنّف العناصر في مجموعات بحسب مفتاح تحدده، والنتيجة `Map` مفاتيحها التصنيفات وقيمها ما تريد (count, sum, average, list).

**💡 التشبيه:**
> مثل فرز أوراق الامتحانات حسب الشعبة — كل شعبة = مجموعة.
> **وجه الشبه:** الشعبة = `groupingBy` key — الأوراق في كل شعبة = العناصر في كل مجموعة

#### 💻 الكود: CollectGroupDemo — تجميع وإحصاء

**ما هذا الكود؟**
> يُجمّع أسماء حسب القيمة وحسب الحرف الأول، ثم يُجمّع أرقاماً ويُعرض تكرار كل منها.

```java
import java.util.*;
import java.util.stream.*;

public class CollectGroupDemo {
    public static void main(String[] args) {
        String[] names = {"John", "Peter", "Susan", "Kim", "Jen",
                "George", "Alan", "Stacy", "Steve", "john"};

        // Group by uppercase value → count occurrences
        Map<String, Long> map1 = Stream.of(names)
                .map(e -> e.toUpperCase())
                .collect(Collectors.groupingBy(e -> e, Collectors.counting()));
        System.out.println(map1);
        // {JEN=1, ALAN=1, GEORGE=1, JOHN=2, ...}

        // Group by first character, use TreeMap for sorted output
        Map<Character, Long> map2 = Stream.of(names)
                .collect(Collectors.groupingBy(
                        e -> e.charAt(0),           // key: first char
                        TreeMap::new,               // use sorted TreeMap
                        Collectors.counting()));    // value: count
        System.out.println(map2);
        // {A=1, G=1, J=2, K=1, P=1, S=3, j=1}

        // Group integers, count occurrences with plural handling
        int[] values = {2, 3, 4, 1, 2, 3, 2, 3, 4, 5, 1, 421};
        IntStream.of(values)
                .mapToObj(e -> e)           // convert to Stream<Integer>
                .collect(Collectors.groupingBy(
                        e -> e,             // key: value itself
                        TreeMap::new,       // sorted output
                        Collectors.counting()))
                .forEach((k, v) -> System.out.println(k + " occurs " + v +
                        (v > 1 ? " times " : " time "))); // plural/singular
    }
}
```

#### شرح كل سطر:
1. `groupingBy(e -> e, Collectors.counting())` → كل قيمة تُصبح مفتاحاً، counting() تعدّها
2. `groupingBy(e->e.charAt(0), TreeMap::new, counting())` → 3 معاملات: مفتاح + نوع Map + downstream collector
3. `TreeMap::new` → method reference لإنشاء `TreeMap` (مرتّب) بدل `HashMap` (غير مرتّب)
4. `mapToObj(e -> e)` → `IntStream` → `Stream<Integer>` (تحتاجها groupingBy)
5. `(v > 1 ? "times" : "time")` → صياغة المفرد/الجمع

#### 💻 الكود: CollectGroupDemo_2 — تجميع حسب التخصص

**ما هذا الكود؟**
> يُوضّح `groupingBy` مع class مخصص لحساب متوسط درجات الطلاب حسب التخصص.

```java
import java.util.*;
import java.util.stream.*;

class MyStudent {
    private String firstName, lastName, major;
    private int age;
    private double score;

    public MyStudent(String firstName, String lastName,
                     String major, int age, double score) {
        this.firstName = firstName; this.lastName = lastName;
        this.major = major; this.age = age; this.score = score;
    }
    public String getFirstName() { return firstName; }
    public String getLastName()  { return lastName;  }
    public String getMajor()     { return major;     }
    public int    getAge()       { return age;        }
    public double getScore()     { return score;      }
}

public class CollectGroupDemo2 {
    public static void main(String[] args) {
        MyStudent[] students = {
            new MyStudent("John",  "Lu",      "CS",   32, 78),
            new MyStudent("Susan", "Yao",     "Math", 31, 85.4),
            new MyStudent("Kim",   "Johnson", "CS",   30, 78.1)
        };

        // Group by major, sorted (TreeMap), average score per group
        System.out.printf("%10s%10s%n", "Department", "Average");
        Stream.of(students)
                .collect(Collectors.groupingBy(
                        MyStudent::getMajor,                          // key: major
                        TreeMap::new,                                  // sorted map
                        Collectors.averagingDouble(MyStudent::getScore))) // avg score
                .forEach((k, v) -> System.out.printf("%10s%10.2f%n", k, v));
        // CS: 78.05 — Math: 85.40
    }
}
```

#### شرح كل سطر:
1. `MyStudent::getMajor` → method reference للـ key
2. `Collectors.averagingDouble(MyStudent::getScore)` → downstream: متوسط درجة كل مجموعة
3. `%10s%10.2f` → تنسيق: 10 أحرف للاسم، 10 أحرف بخانتين عشريتين للرقم

**الناتج المتوقع:**
> Department → Average / CS → 78.05 / Math → 85.40

---

### 16. Case Study: Analyzing Numbers (تحليل الأرقام)

#### النص الأصلي يقول:
> `DoubleStream.of(numbers).average().getAsDouble()`, `DoubleStream.of(numbers).filter(e->e>average).count()`

#### 💻 الكود: AnalyzeNumbersUsingStream

**ما هذا الكود؟**
> يقرأ n أرقاماً من المستخدم، يحسب المتوسط، ثم يعدّ كم عنصراً يتجاوزه باستخدام `DoubleStream`.

```java
import java.util.stream.*;

public class AnalyzeNumbersUsingStream {
    public static void main(String[] args) {
        java.util.Scanner input = new java.util.Scanner(System.in);
        System.out.print("Enter the number of items: ");
        int n = input.nextInt();           // number of values
        double[] numbers = new double[n]; // storage array
        double sum = 0;

        System.out.print("Enter the numbers: ");
        for (int i = 0; i < n; i++) {
            numbers[i] = input.nextDouble(); // read each value
        }

        // Compute average using DoubleStream
        double average = DoubleStream.of(numbers).average().getAsDouble();
        System.out.println("Average is " + average);

        // Count elements above average
        System.out.println("Number of elements above the average is " +
                DoubleStream.of(numbers)
                        .filter(e -> e > average)  // keep values above average
                        .count());                  // terminal: count
    }
}
```

#### شرح كل سطر:
1. `DoubleStream.of(numbers)` → `DoubleStream` من `double[]`
2. `.average().getAsDouble()` → terminal: متوسط الـ stream
3. الـ `average` متاح في الـ lambda التالية لأنها `effectively final`
4. `.filter(e -> e > average).count()` → pipeline منفصل على نفس المصفوفة

---

### 17. Case Study: Counting Letter Occurrences (عدّ تكرار الحروف)

#### النص الأصلي يقول:
> Random lowercase letters, `groupingBy(e->e, TreeMap::new, Collectors.counting())`, then counting letters in a string using `filter(Character::isLetter).map(Character::toUpperCase)`.

#### 💻 الكود: CountLettersUsingStream

**ما هذا الكود؟**
> يُنشئ 100 حرف عشوائي ويعدّ تكرار كل حرف باستخدام `groupingBy`.

```java
import java.util.*;
import java.util.stream.*;

public class CountLettersUsingStream {
    private static int count = 0;

    public static void main(String[] args) {
        Random random = new Random();

        // Generate 100 random lowercase chars as Object[]
        Object[] SS = random.ints(100, (int)'a', (int)'z' + 1)
                .mapToObj(e -> (char) e)  // int → char
                .toArray();               // terminal: to Object[]

        // Print all chars, 20 per line
        Stream.of(SS).forEach(e -> {
            System.out.print(e + (++count % 20 == 0 ? "\n" : " "));
        });

        // Count occurrences and print, 10 per line
        count = 0;
        Stream.of(SS)
                .collect(Collectors.groupingBy(
                        e -> e,            // key: char itself
                        TreeMap::new,      // sorted by char
                        Collectors.counting()))
                .forEach((k, v) -> {
                    System.out.print(v + " " + k +
                            (++count % 10 == 0 ? "\n" : " "));
                });
    }
}
```

#### 💻 الكود: CountOccurrenceOfLettersInAString

**ما هذا الكود؟**
> يقرأ نصاً ويعدّ تكرار كل حرف مع تجاهل الأرقام وعلامات الترقيم، والتحويل لـ uppercase.

```java
import java.util.*;
import java.util.stream.*;

public class CountOccurrenceOfLettersInAString {
    private static int count = 0;

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String s = input.nextLine();
        count = 0;

        // Convert char[] to Character[], filter letters, uppercase, group
        Stream.of(toCharacterArray(s.toCharArray()))
                .filter(ch -> Character.isLetter(ch))      // skip non-letters
                .map(ch -> Character.toUpperCase(ch))       // normalize case
                .collect(Collectors.groupingBy(
                        e -> e,
                        TreeMap::new,
                        Collectors.counting()))
                .forEach((k, v) -> {
                    System.out.print(v + " " + k +
                            (++count % 10 == 0 ? "\n" : " "));
                });
    }

    // Helper: convert primitive char[] to Character[] (needed for Stream)
    public static Character[] toCharacterArray(char[] list) {
        Character[] result = new Character[list.length];
        for (int i = 0; i < result.length; i++) {
            result[i] = list[i]; // autoboxing
        }
        return result;
    }
}
```

#### شرح كل سطر:
1. `random.ints(100, 'a', 'z'+1)` → ينتج `IntStream` من كودات ASCII لحروف a-z
2. `.mapToObj(e -> (char)e)` → يُحوّل كل int لـ `char` ثم autoboxing لـ `Character`
3. `Character.isLetter(ch)` → يتحقق أن العنصر حرف (يُزيل أرقام وعلامات)
4. `Character.toUpperCase(ch)` → توحيد الحالة
5. `toCharacterArray()` → `Stream` لا يعمل مع `char[]` مباشرة — يحتاج `Character[]`

---

### 18. Case Study: Processing 2D Array (معالجة مصفوفة ثنائية الأبعاد)

#### النص الأصلي يقول:
> `Stream.of(m).map(e->IntStream.of(e)).reduce((e1,e2)->IntStream.concat(e1,e2)).get().toArray()` → flatten 2D array. `summaryStatistics()`. `Stream.of(m).mapToInt(e->IntStream.of(e).sum()).forEach(...)` → sum of each row.

#### 💻 الكود: TwoDimensionalArrayStream

**ما هذا الكود؟**
> يُدمج مصفوفة ثنائية الأبعاد في `IntStream` واحد باستخدام `reduce+concat`، ثم يُحسب الإحصاءات ومجموع كل صف.

```java
import java.util.IntSummaryStatistics;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class TwoDimensionalArrayStream {
    private static int i = 0;

    public static void main(String[] args) {
        int[][] m = {{1, 2}, {3, 4}, {4, 5}, {1, 3}};

        // Flatten 2D array: each row → IntStream, then concat all streams
        int[] list = Stream.of(m)
                .map(e -> IntStream.of(e))                              // each row → IntStream
                .reduce((e1, e2) -> IntStream.concat(e1, e2))          // merge streams
                .get()                                                   // get Optional<IntStream>
                .toArray();                                              // terminal: to int[]

        // Compute statistics on flattened array
        IntSummaryStatistics stats = IntStream.of(list).summaryStatistics();
        System.out.println("Max: "     + stats.getMax());     // 5
        System.out.println("Min: "     + stats.getMin());     // 1
        System.out.println("Sum: "     + stats.getSum());     // 23
        System.out.println("Average: " + stats.getAverage()); // 2.875

        // Sum of each row
        System.out.println("Sum of row");
        Stream.of(m)
                .mapToInt(e -> IntStream.of(e).sum())               // each row → its sum
                .forEach(e -> System.out.println("Sum of row " + i++ + ": " + e));
    }
}
```

#### شرح كل سطر:
1. `Stream.of(m)` → `Stream<int[]>` — كل عنصر صف كامل
2. `.map(e -> IntStream.of(e))` → `Stream<IntStream>` — كل صف يصبح stream
3. `.reduce((e1,e2)->IntStream.concat(e1,e2))` → يُدمج كل الـ streams في واحد
4. `.get().toArray()` → يستخرج من `Optional` ثم يحوّل لمصفوفة
5. `.mapToInt(e -> IntStream.of(e).sum())` → يُحوّل كل صف لمجموعه (`IntStream`)

**الناتج المتوقع:**
> Max: 5 / Min: 1 / Sum: 23 / Average: 2.875 / Sum of row 0: 3 / Sum of row 1: 7 / Sum of row 2: 9 / Sum of row 3: 4

---

### 19. Case Study: Occurrences of Words (تكرار الكلمات)

#### النص الأصلي يقول:
> `Stream.of(text.split("[\\s+\\p{P}]")).parallel().filter(e->e.length()>0).collect(Collectors.groupingBy(String::toLowerCase, TreeMap::new, Collectors.counting()))`

#### 💻 الكود: CountOccurrenceOfWordsStream

**ما هذا الكود؟**
> يُقسّم جملة عند المسافات وعلامات الترقيم، ثم يعدّ تكرار كل كلمة (case-insensitive) بـ `parallel stream`.

```java
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CountOccurrenceOfWordsStream {
    public static void main(String[] args) {
        String text = "Good morning. Have a good class. " +
                      "Have a good visit. Have fun!";

        // Split on whitespace/punctuation, parallel processing
        Stream.of(text.split("[\\s+\\p{P}]"))  // split on spaces/punctuation
                .parallel()                     // enable parallel processing
                .filter(e -> e.length() > 0)   // remove empty strings from split
                .collect(Collectors.groupingBy(
                        String::toLowerCase,    // key: lowercase word
                        TreeMap::new,           // sorted output
                        Collectors.counting())) // count per word
                .forEach((k, v) -> System.out.println(k + " " + v));
    }
}
```

#### شرح كل سطر:
1. `text.split("[\\s+\\p{P}]")` → يُقسّم النص عند: `\s+` = مسافات، `\p{P}` = punctuation
2. `.parallel()` → تدفق موازٍ للمعالجة الأسرع
3. `.filter(e->e.length()>0)` → `split` ينتج أحياناً strings فارغة → نُزيلها
4. `String::toLowerCase` → توحيد الحالة للكلمات
5. `TreeMap::new` → ترتيب أبجدي للكلمات
6. `Collectors.counting()` → عدّ كل كلمة

---

## الجزء الثاني: الملخص المنظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
|---|---|---|
| `Functional Interface` | واجهة بدالة مجردة واحدة فقط (SAM) | `Predicate<T>`, `Consumer<T>` |
| `Lambda Expression` | دالة مجهولة قصيرة لتطبيق functional interface | `(x) -> x > 5` |
| `Stream` | خط معالجة مؤقت لا يُخزّن بيانات | `list.stream().filter(...).count()` |
| `Intermediate Operation` | عملية ترجع `Stream` جديد (lazy) | `filter`, `map`, `sorted`, `limit` |
| `Terminal Operation` | عملية تُنهي الـ pipeline وترجع نتيجة | `count`, `forEach`, `collect`, `reduce` |
| `reduce` | يُدمج عناصر الـ stream في قيمة واحدة | `reduce(0, (a,b)->a+b)` |
| `collect` | يجمع عناصر الـ stream في حاوية قابلة للتعديل | `collect(Collectors.toList())` |
| `groupingBy` | يُصنّف العناصر في مجموعات حسب مفتاح | `groupingBy(e->e.charAt(0))` |
| `Parallel Stream` | معالجة موزّعة على خيوط متعددة | `.parallel()` |
| `SAM` | Single Abstract Method — الدالة الوحيدة في functional interface | معيار تمييز functional interfaces |
| `Optional<T>` | حاوية قد تحتوي قيمة أو تكون فارغة | ترجعها `max`, `min`, `findFirst` |
| `IntSummaryStatistics` | كائن يحوي count, max, min, sum, average دفعة واحدة | من `summaryStatistics()` |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
|---|---|---|
| `Stream.of(...)` | إنشاء `Stream` من قيم أو مصفوفة object | `Stream<T>` |
| `Arrays.stream(arr)` | إنشاء stream من مصفوفة | primitive → `IntStream`، object → `Stream<T>` |
| `IntStream.of(...)` | `IntStream` من int أو مصفوفة | أكفأ من `Stream<Integer>` |
| `IntStream.range(a,b)` | من a إلى b-1 | لا يشمل b |
| `IntStream.rangeClosed(a,b)` | من a إلى b | يشمل b |
| `.filter(predicate)` | intermediate — يُبقي العناصر التي تحقق الشرط | ترجع Stream |
| `.map(function)` | intermediate — يُحوّل كل عنصر | ترجع Stream |
| `.mapToInt(f)` | intermediate — يُحوّل لـ IntStream | Stream<T> → IntStream |
| `.sorted()` | intermediate — ترتيب طبيعي | ترجع Stream |
| `.distinct()` | intermediate — يُزيل التكرارات | ترجع Stream |
| `.limit(n)` | intermediate — يأخذ أول n عناصر | ترجع Stream |
| `.skip(n)` | intermediate — يتخطى أول n عناصر | ترجع Stream |
| `.forEach(action)` | terminal — يُطبّق action على كل عنصر | لا ترجع شيئاً |
| `.count()` | terminal — عدّ العناصر | يُرجع `long` |
| `.sum()` | terminal (primitive streams فقط) | يُرجع int/long/double |
| `.average()` | terminal — المتوسط | يُرجع `OptionalDouble` |
| `.min/.max(comparator)` | terminal | يُرجع `Optional<T>` |
| `.reduce(identity, op)` | terminal — دمج تراكمي مع قيمة ابتدائية | يُرجع T |
| `.reduce(op)` | terminal — دمج تراكمي | يُرجع `Optional<T>` |
| `.collect(collector)` | terminal — جمع في حاوية | الأهم في الـ stream API |
| `.toArray()` | terminal | يُرجع `Object[]` أو مصفوفة بدائية |
| `.parallel()` | intermediate-like — يُفعّل المعالجة الموازية | يمكن وضعها في أي مكان |

### جداول مقارنات سريعة

| المقارنة | `Stream<T>` | `IntStream` | الفرق |
|---|---|---|---|
| النوع | كائنات (objects) | int بدائي | autoboxing مقابل لا autoboxing |
| الإنشاء | `Stream.of(...)` / `.stream()` | `IntStream.of(...)` / `Arrays.stream(int[])` | طرق مختلفة |
| العمليات الإحصائية | بحاجة لـ `mapToInt` | مباشرة: `sum`, `average` | IntStream أكثر كفاءة |
| `range` | غير متاح | `range(a,b)`, `rangeClosed(a,b)` | خاص بالـ primitive streams |

| المقارنة | `Intermediate` | `Terminal` | الفرق |
|---|---|---|---|
| النتيجة | `Stream<T>` جديد | قيمة أو side-effect | |
| التنفيذ | lazy (لا ينفّذ حتى terminal) | يُفعّل الـ pipeline | |
| التسلسل | قابلة للتسلسل | واحدة فقط في نهاية الـ pipeline | |
| أمثلة | `filter`, `map`, `sorted` | `collect`, `count`, `forEach` | |

| المقارنة | `reduce` | `collect` | الفرق |
|---|---|---|---|
| النتيجة | قيمة واحدة (int, String, ...) | حاوية قابلة للتعديل (List, Map) | |
| الاستخدام | مجموع، جداء، concatenation | toList, toSet, groupingBy | |
| الحاوية | immutable (القيمة النهائية ثابتة) | mutable (List, Map) | |

### قاموس المصطلحات

| الفئة | المصطلحات |
|---|---|
| Functional Interfaces | `Predicate<T>`, `Consumer<T>`, `Function<T,R>`, `Supplier<T>`, `BinaryOperator<T>`, `UnaryOperator<T>` |
| Stream Types | `Stream<T>`, `IntStream`, `LongStream`, `DoubleStream` |
| Intermediate Ops | `filter`, `map`, `mapToInt`, `mapToLong`, `mapToDouble`, `sorted`, `distinct`, `limit`, `skip`, `mapToObj` |
| Terminal Ops | `count`, `sum`, `average`, `min`, `max`, `findFirst`, `findAny`, `anyMatch`, `allMatch`, `noneMatch`, `forEach`, `reduce`, `collect`, `toArray`, `summaryStatistics` |
| Collectors | `toList`, `toSet`, `toMap`, `groupingBy`, `counting`, `summingInt`, `summarizingInt`, `averagingDouble` |
| إحصاءات | `IntSummaryStatistics`, `DoubleSummaryStatistics`, `LongSummaryStatistics` |

### أبرز النقاط الذهبية
1. `Stream` لا يُخزّن بيانات — مؤقت (`transient`) ويُدمَّر بعد الاستخدام.
2. الـ `Intermediate operations` هي lazy — لا تُنفَّذ إلا بوجود `Terminal operation`.
3. `IntStream.range(a,b)` لا يشمل b، بينما `rangeClosed(a,b)` يشمله.
4. `reduce(identity, op)` ترجع T مباشرة، `reduce(op)` ترجع `Optional<T>`.
5. `Collectors.groupingBy` بثلاثة معاملات: `(classifier, mapFactory, downstream)`.
6. `.parallel()` لا تُغيّر البنية — فقط توزّع المعالجة على خيوط متعددة.
7. `Stream.of(Integer[])` → `Stream<Integer>`، `Arrays.stream(int[])` → `IntStream`.
8. `char[]` لا تعمل مع `Stream` مباشرة — يجب التحويل لـ `Character[]`.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
|---|---|
| استخدام `Stream` بعد `terminal operation` | الـ `Stream` يُدمَّر — أنشئ `Stream` جديداً |
| `IntStream.range(1,10)` يعطي 10 عناصر | يعطي 9 فقط (1 حتى 9) |
| `reduce(accumulator)` بدون identity يُرجع T | يُرجع `Optional<T>` — يجب `.get()` |
| `Stream.of(int[])` يُنشئ `Stream<int[]>` | لـ `int[]` استخدم `Arrays.stream(arr)` لـ `IntStream` |
| نسيان `System.out.println()` بين `.print()` | تنسيق الإخراج قد يختلط |
| إهمال `.filter(e->e.length()>0)` بعد `split` | `split` ينتج أحياناً strings فارغة |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء Stream Pipeline

> بناء pipeline للمعالجة الوظيفية من مصدر بيانات إلى نتيجة نهائية.

```algorithm
1 | تحديد المصدر | Array/List/Set | stream() أو Stream.of() أو IntStream.of()
2 | إضافة Intermediate Operations | filter/map/sorted/limit | تسلسل بنقطة — ترتيب يؤثر على النتيجة
3 | إضافة Terminal Operation | count/collect/forEach/reduce | واحدة فقط — تُفعّل كل الـ lazy operations
4 | استخدام النتيجة | int/List/Map/void | ترجع ما طلبته من الـ terminal
```

#### نقاط التنفيذ:
- الـ `Intermediate operations` لا تُنفَّذ حتى وجود `Terminal`.
- `filter` قبل `map` أكثر كفاءة (يُقلّل العناصر أولاً).

---

#### ⚙️ الخطوات / الخوارزمية: استخدام Collectors.groupingBy

> تصنيف عناصر الـ stream في مجموعات حسب معيار.

```algorithm
1 | إنشاء Stream | Stream.of/collection.stream | مصدر البيانات
2 | تحضير البيانات | map/filter (اختياري) | تحويل/تصفية قبل التجميع
3 | collect + groupingBy | Collectors.groupingBy(classifier) | المعامل الأول: دالة المفتاح
4 | تحديد نوع Map (اختياري) | TreeMap::new أو HashMap::new | المعامل الثاني (اختياري)
5 | downstream Collector | Collectors.counting()/averagingDouble() | المعامل الثالث: ماذا نفعل بكل مجموعة
6 | forEach على النتيجة | .forEach((k,v)->...) | المشي على الـ Map الناتج
```

#### نقاط التنفيذ:
- `groupingBy` بمعامل واحد: `Map<K, List<T>>` افتراضياً.
- `groupingBy` بثلاثة معاملات: `Map<K, R>` حيث R تحدده الـ downstream collector.

---

#### ⚙️ الخطوات / الخوارزمية: استخدام reduce

> دمج عناصر الـ stream في قيمة واحدة تراكمياً.

```algorithm
1 | تحديد Identity | 0 للجمع، 1 للضرب، "" للـ concatenation | القيمة التي لا تؤثر على النتيجة
2 | كتابة Accumulator | (x, y) -> x + y | lambda يأخذ النتيجة المتراكمة والعنصر الحالي
3 | تحديد إن كان parallel | .parallel() اختياري | للضرب مثلاً آمن
4 | استخراج النتيجة | T مباشرة (مع identity) أو Optional.get() | احذر من Optional الفارغ
```

#### نقاط التنفيذ:
- `identity` للضرب هو 1 لا 0 — لأن 0 × أي شيء = 0.
- `reduce` بدون `identity` ترجع `Optional` — قد تكون فارغة إذا كان الـ stream فارغاً.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
|---|---|---|
| فلترة وعدّ | `stream.filter(pred).count()` | عدّ عناصر تحقق شرطاً |
| فلترة وجمع | `stream.filter(pred).collect(Collectors.toList())` | استخراج عناصر محددة |
| تحويل وجمع | `stream.map(fn).collect(Collectors.toList())` | تحويل نوع العناصر |
| إحصاءات بدائية | `IntStream.of(arr).sum/max/min/average()` | حسابات على int/double |
| تجميع وعدّ | `stream.collect(groupingBy(key, TreeMap::new, counting()))` | تكرار عناصر |
| تجميع ومتوسط | `stream.collect(groupingBy(key, TreeMap::new, averagingDouble(f)))` | متوسط لكل مجموعة |
| دمج strings | `stream.reduce((a,b)->a+","+b).get()` | بناء string مُركّب |
| stream موازٍ | `IntStream.of(largeArr).parallel().filter().sorted().limit(n)` | بيانات ضخمة |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **25 سؤالاً** — مستوى: متوسط/صعب. التوزيع: 20% مقارنات، 30% سيناريو كود، 30% تطبيق، 20% تتبع.

---

### السؤال 1 (متوسط)
Which package contains the six basic functional interfaces in Java SE 8?
أ) `java.util.stream`  ب) `java.util.function`  ج) `java.util.lambda`  د) `java.util.concurrent`
**الإجابة الصحيحة: ب**
**التعليل:** حزمة `java.util.function` تحتوي `Predicate`, `Consumer`, `Function`, `Supplier`, `UnaryOperator`, `BinaryOperator`. أ) للـ streams، ج) غير موجودة، د) للتزامن.

---

### السؤال 2 (متوسط)
Which functional interface accepts a value and returns `void`?
أ) `Supplier<T>`  ب) `Function<T,R>`  ج) `Consumer<T>`  د) `Predicate<T>`
**الإجابة الصحيحة: ج**
**التعليل:** `Consumer<T>` توقيعها `void accept(T)` — تأخذ قيمة ولا ترجع. أ) ترجع قيمة دون أخذ، ب) تحوّل T إلى R، د) ترجع boolean.

---

### السؤال 3 (متوسط)
What is the result of `IntStream.range(1, 5).sum()`?
أ) 15  ب) 14  ج) 10  د) 5
**الإجابة الصحيحة: ج**
**التعليل:** `range(1,5)` يُنتج 1,2,3,4 (لا يشمل 5) → مجموعها 10. أ) `rangeClosed(1,5)=15`، ب) خطأ، د) خطأ.

---

### السيناريو 1: تتبع pipeline

```java
int[] values = {3, 10, 6, 1, 4, 8, 2, 5, 9, 7};
long result = IntStream.of(values)
        .filter(v -> v % 2 == 0)
        .map(v -> v * 2)
        .filter(v -> v > 10)
        .count();
```

### السؤال 4 (صعب)
What is the value of `result`?
أ) 3  ب) 2  ج) 4  د) 5
**الإجابة الصحيحة: أ**
**التعليل:** الأعداد الزوجية: {10,6,4,8,2} → ×2: {20,12,8,16,4} → >10: {20,12,16} → count=3.

### السؤال 5 (صعب)
If `.filter(v -> v % 2 == 0)` is removed, what changes?
أ) `result` becomes 7  ب) `result` becomes 6  ج) `result` becomes 3  د) compile error
**الإجابة الصحيحة: أ**
**التعليل:** بدون الفلتر الأول: كل العناصر ×2: {6,20,12,2,8,16,4,10,18,14} → >10: {20,12,16,18,14} = 5 عناصر... إعادة الحساب: 3×2=6، 10×2=20>10، 6×2=12>10، 1×2=2، 4×2=8، 8×2=16>10، 2×2=4، 5×2=10 ليس >10، 9×2=18>10، 7×2=14>10 → العدد = 6. الإجابة الصحيحة ب.

**تصحيح:** الإجابة الصحيحة **ب** (6)
**التعليل المصحّح:** 10 عناصر ×2 = {6,20,12,2,8,16,4,10,18,14} → >10: {20,12,16,18,14} = 5... لكن 3×2=6 ليس >10، 1×2=2، 4×2=8، 2×2=4، 5×2=10 ليس >10 → الأعداد >10 هي: {20,12,16,18,14} = 5 عناصر. الإجابة **ب**.

---

### السؤال 6 (صعب)
What does `Stream.of(names).map(e->e.toUpperCase()).distinct().count()` return when `names = {"John","john","JOHN"}`?
أ) 3  ب) 2  ج) 1  د) 0
**الإجابة الصحيحة: ج**
**التعليل:** بعد `toUpperCase()`: {"JOHN","JOHN","JOHN"} → `distinct()` يُبقي واحدة → `count()=1`.

---

### السؤال 7 (متوسط)
Which of the following is an INTERMEDIATE operation?
أ) `count()`  ب) `forEach()`  ج) `collect()`  د) `filter()`
**الإجابة الصحيحة: د**
**التعليل:** `filter()` ترجع `Stream` جديداً (intermediate). أ) ب) ج) جميعها `terminal` — تُنهي الـ pipeline.

---

### السؤال 8 (متوسط)
What is the difference between `reduce(0, (a,b)->a+b)` and `reduce((a,b)->a+b)`?
أ) لا فرق  ب) الأول يُرجع int، الثاني يُرجع `Optional<Integer>`  ج) الأول يُرجع Optional، الثاني يُرجع int  د) الثاني يُعطي compile error
**الإجابة الصحيحة: ب**
**التعليل:** `reduce(identity, op)` تُرجع T مباشرة. `reduce(op)` بدون identity تُرجع `Optional<T>` لأن الـ stream قد يكون فارغاً.

---

### السؤال 9 (متوسط)
What happens when you call a terminal operation on an already-processed Stream?
أ) يُرجع null  ب) يُرجع empty stream  ج) يُلقي `IllegalStateException`  د) يُعيد المعالجة من الأول
**الإجابة الصحيحة: ج**
**التعليل:** بعد الـ `terminal operation`، الـ `Stream` يُدمَّر. أي محاولة لاستخدامه مجدداً تُلقي `IllegalStateException`.

---

### السؤال 10 (صعب)
What does `IntStream.of(new int[]{2,4,6}).reduce(1, (x,y) -> x * y)` return?
أ) 12  ب) 48  ج) 24  د) 0
**الإجابة الصحيحة: ب**
**التعليل:** identity=1: 1×2=2، 2×4=8، 8×6=48.

---

### السيناريو 2: Collectors

```java
String[] words = {"apple","ant","ball","bear","cat"};
Map<Character, Long> result = Stream.of(words)
    .collect(Collectors.groupingBy(e -> e.charAt(0),
             TreeMap::new, Collectors.counting()));
```

### السؤال 11 (صعب)
What is the content of `result`?
أ) `{a=1, b=1, c=1}`  ب) `{a=2, b=2, c=1}`  ج) `{apple=1, ant=1, ball=1, bear=1, cat=1}`  د) `{A=2, B=2, C=1}`
**الإجابة الصحيحة: ب**
**التعليل:** apple وant → a (2)، ball وbear → b (2)، cat → c (1) → `{a=2, b=2, c=1}`. TreeMap يُرتّب تصاعدياً.

### السؤال 12 (صعب)
If `TreeMap::new` is removed, what changes?
أ) خطأ في الترجمة  ب) نفس النتيجة لكن ترتيب غير مضمون  ج) يستخدم LinkedHashMap  د) يُعطي NullPointerException
**الإجابة الصحيحة: ب**
**التعليل:** بدون factory، `groupingBy` يستخدم `HashMap` — نفس البيانات لكن الترتيب غير مضمون.

---

### السؤال 13 (متوسط)
What is the correct way to create an `IntStream` from `int[] arr = {1,2,3}`?
أ) `Stream.of(arr)`  ب) `IntStream.of(arr)`  ج) `new IntStream(arr)`  د) `arr.stream()`
**الإجابة الصحيحة: ب**
**التعليل:** `IntStream.of(int[])` يُنشئ `IntStream` مباشرة. أ) `Stream.of(int[])` يُنشئ `Stream<int[]>` (المصفوفة كعنصر واحد!). ج) لا يوجد constructor. د) المصفوفة البدائية لا تملك `.stream()`.

---

### السؤال 14 (متوسط)
What does `Stream.of("a","b","c").findFirst().get()` return?
أ) `"c"`  ب) `"b"`  ج) `"a"`  د) غير محدد (any element)
**الإجابة الصحيحة: ج**
**التعليل:** `findFirst()` يُرجع أول عنصر في الـ stream بالترتيب — `"a"`. أما `findAny()` فهو غير محدد خاصة في parallel streams.

---

### السؤال 15 (صعب)
```java
List<String> names = Arrays.asList("John","Peter","Ann");
System.out.println(names.stream()
    .allMatch(e -> Character.isUpperCase(e.charAt(0))));
```
What is the output?
أ) `true`  ب) `false`  ج) خطأ في الترجمة  د) `null`
**الإجابة الصحيحة: أ**
**التعليل:** John (J)، Peter (P)، Ann (A) — جميعها تبدأ بحرف كبير → `allMatch = true`.

---

### السؤال 16 (متوسط)
Which `Collector` should be used to group elements and compute their average?
أ) `Collectors.counting()`  ب) `Collectors.summingInt(f)`  ج) `Collectors.averagingDouble(f)`  د) `Collectors.toMap(k,v)`
**الإجابة الصحيحة: ج**
**التعليل:** `averagingDouble(mapper)` يحسب المتوسط لكل مجموعة عند استخدامه مع `groupingBy`.

---

### السيناريو 3: Parallel vs Sequential

```java
int[] arr = new int[20_000_000]; // filled with random values
long start = System.currentTimeMillis();
IntStream.of(arr).filter(e->e>0).sorted().limit(5).toArray();
long seqTime = System.currentTimeMillis() - start;

start = System.currentTimeMillis();
IntStream.of(arr).parallel().filter(e->e>0).sorted().limit(5).toArray();
long parTime = System.currentTimeMillis() - start;
```

### السؤال 17 (متوسط)
In general, which relationship between seqTime and parTime is expected with 4+ processors?
أ) `seqTime < parTime`  ب) `seqTime > parTime`  ج) `seqTime == parTime`  د) يعتمد على `limit(5)`
**الإجابة الصحيحة: ب**
**التعليل:** مع بيانات كبيرة (20M) ومعالجات متعددة، الـ parallel يوزّع العمل فيكون أسرع → `seqTime > parTime`.

### السؤال 18 (صعب)
Would the two arrays (sequential and parallel results) be identical?
أ) نعم دائماً  ب) لا — قد تختلف لأن parallel لا يضمن الترتيب  ج) لا — فقط في بعض الحالات  د) نعم لأن sorted() تُوحّد الناتج
**الإجابة الصحيحة: د**
**التعليل:** رغم أن `parallel` لا يضمن ترتيب المعالجة، وجود `.sorted()` يُوحّد النتيجة النهائية — كلا الكودين يُنتجان نفس أصغر 5 أعداد موجبة.

---

### السؤال 19 (صعب)
What does `Stream.of(names).map(String::toLowerCase).mapToInt(e->e.length()).sum()` compute for `names = {"Hi","World"}`?
أ) 2  ب) 7  ج) 5  د) خطأ — `map` ثم `mapToInt` لا يمكن تسلسلهما
**الإجابة الصحيحة: ب**
**التعليل:** toLowerCase لا يُغيّر الطول. "Hi"→2، "World"→5 → sum=7.

---

### السؤال 20 (متوسط)
What is a SAM interface?
أ) واجهة بدوال متعددة  ب) واجهة بدالة مجردة واحدة فقط  ج) واجهة بدون دوال  د) واجهة تمتد من `Serializable`
**الإجابة الصحيحة: ب**
**التعليل:** SAM = Single Abstract Method. هذا هو تعريف `Functional Interface` تحديداً.

---

### السيناريو 4: reduce على Strings

```java
String[] data = {"A","B","C","D"};
String r1 = Stream.of(data).reduce((x,y) -> x + y).get();
String r2 = Stream.of(data).reduce((x,y) -> x + "," + y).get();
```

### السؤال 21 (صعب)
What are the values of `r1` and `r2`?
أ) `r1="ABCD"` و `r2="A,B,C,D"`  ب) `r1="A,B,C,D"` و `r2="ABCD"`  ج) كلاهما `"ABCD"`  د) خطأ في التنفيذ
**الإجابة الصحيحة: أ**
**التعليل:** `reduce((x,y)->x+y)` يُلصق بدون فاصل → "ABCD". `reduce((x,y)->x+","+y)` يُلصق بفاصلة → "A,B,C,D".

### السؤال 22 (صعب)
What is `r1.length()`?
أ) 3  ب) 4  ج) 7  د) 8
**الإجابة الصحيحة: ب**
**التعليل:** "ABCD" → طولها 4.

---

### السؤال 23 (متوسط)
Which statement correctly creates a stream of all integers from 1 to 100 inclusive?
أ) `IntStream.range(1, 100)`  ب) `IntStream.range(1, 101)`  ج) `IntStream.rangeClosed(1, 101)`  د) `IntStream.range(0, 100)`
**الإجابة الصحيحة: ب**
**التعليل:** `range(1,101)` يُنتج 1 إلى 100. أ) يُنتج 1-99، ج) يُنتج 1-101، د) يُنتج 0-99.

---

### السؤال 24 (صعب)
What does `IntStream.of(3,4,1,5,20,1,3,4,6).distinct().filter(e->e>3 && e%2==0).average().getAsDouble()` return?
أ) 7.5  ب) 10.0  ج) 13.0  د) 8.0
**الإجابة الصحيحة: ب**
**التعليل:** distinct: {3,4,1,5,20,6} → filter (>3 AND زوجي): {4,20,6} → average = (4+20+6)/3 = 30/3 = 10.0.

---

### السؤال 25 (متوسط)
What does `Collectors.toMap(e->e, e->e.length())` do when applied to `Stream.of("Hi","Hello")`?
أ) يُنتج `{Hi=2, Hello=5}`  ب) يُنتج `{2=Hi, 5=Hello}`  ج) يُنتج قائمة  د) خطأ في التنفيذ
**الإجابة الصحيحة: أ**
**التعليل:** `toMap(keyMapper, valueMapper)`: المفتاح = الـ String نفسه، القيمة = طوله → `{Hi=2, Hello=5}`.

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1

**الكود (يحتوي خطأ):**
```java
// Trying to reuse a stream
List<String> names = Arrays.asList("John", "Jane", "Bob");
Stream<String> s = names.stream();
long count1 = s.filter(e -> e.length() > 3).count();
long count2 = s.map(String::toUpperCase).count(); // error here
```
**اكتشف الخطأ:** Stream `s` is already consumed after the first terminal operation — cannot reuse it.

**التصحيح:**
```java
List<String> names = Arrays.asList("John", "Jane", "Bob");
// Create a new stream for each pipeline
long count1 = names.stream().filter(e -> e.length() > 3).count();
long count2 = names.stream().map(String::toUpperCase).count();
```
**شرح الحل:**
1. `terminal operation` (`.count()`) يُدمّر الـ `Stream` — يُلقي `IllegalStateException` إذا استُخدم مجدداً.
2. الحل: استدعاء `.stream()` مرة جديدة من المصدر لكل pipeline.
3. المصدر (`List`) لا يُدمَّر — فقط الـ `Stream` الناتج منه.

---

### سؤال تصحيح 2

**الكود (يحتوي خطأ):**
```java
int[] arr = {5, 3, 8, 1};
Stream<int[]> s = Stream.of(arr); // tries to stream the array's elements
s.filter(e -> e > 4).forEach(System.out::println);
```
**اكتشف الخطأ:** `Stream.of(int[])` creates a `Stream<int[]>` (one element — the whole array), not a stream of individual int elements.

**التصحيح:**
```java
int[] arr = {5, 3, 8, 1};
// Use Arrays.stream for primitive int arrays
Arrays.stream(arr)
    .filter(e -> e > 4)
    .forEach(System.out::println);
// Output: 5, 8
```
**شرح الحل:**
1. `Stream.of(int[])` يُعامل المصفوفة كعنصر واحد — لا يُقسّمها.
2. `Arrays.stream(int[])` يُنشئ `IntStream` بعناصر المصفوفة الفردية.
3. `Stream.of(Integer[])` يعمل صحيحاً مع مصفوفات الكائنات.

---

### سؤال تصحيح 3

**الكود (يحتوي خطأ):**
```java
int[] values = {3, 10, 6, 1, 4};
// Compute sum of odd numbers
int sumOdd = IntStream.of(values)
    .filter(e -> e % 2 != 0)
    .reduce((x, y) -> x + y); // expects int but gets Optional
System.out.println(sumOdd);
```
**اكتشف الخطأ:** `reduce(BinaryOperator)` without identity returns `OptionalInt`, not `int` — type mismatch.

**التصحيح:**
```java
int[] values = {3, 10, 6, 1, 4};
// Option 1: use identity 0
int sumOdd = IntStream.of(values)
    .filter(e -> e % 2 != 0)
    .reduce(0, (x, y) -> x + y); // returns int directly
System.out.println(sumOdd); // 3 + 1 = 4

// Option 2: use Optional properly
int sumOdd2 = IntStream.of(values)
    .filter(e -> e % 2 != 0)
    .reduce((x, y) -> x + y)
    .getAsInt(); // extract from OptionalInt
```
**شرح الحل:**
1. `reduce(accumulator)` يُرجع `OptionalInt` لا `int`.
2. إضافة identity (0 للجمع) يجعلها تُرجع `int` مباشرة.
3. أو استخدام `.getAsInt()` لاستخراج القيمة من `OptionalInt`.

---

### سؤال تصحيح 4

**الكود (يحتوي خطأ):**
```java
IntSummaryStatistics stats = IntStream.of(1, 2, 3, 4, 5)
    .filter(e -> e > 10) // all filtered out
    .summaryStatistics();
System.out.println(stats.getAverage()); // 0.0 — but is it safe?
double avg = IntStream.of(1, 2, 3)
    .filter(e -> e > 10)
    .average()
    .getAsDouble(); // BUG: throws NoSuchElementException
```
**اكتشف الخطأ:** `average()` on an empty stream returns an empty `OptionalDouble`. Calling `.getAsDouble()` without checking throws `NoSuchElementException`.

**التصحيح:**
```java
OptionalDouble avg = IntStream.of(1, 2, 3)
    .filter(e -> e > 10)
    .average();
// Safe access:
if (avg.isPresent()) {
    System.out.println(avg.getAsDouble());
} else {
    System.out.println("No elements match the filter");
}
// Or use orElse:
double safeAvg = avg.orElse(0.0);
```
**شرح الحل:**
1. `average()` على stream فارغ يُرجع `OptionalDouble.empty()`.
2. `.getAsDouble()` على قيمة فارغة يُلقي `NoSuchElementException`.
3. دائماً تحقق بـ `isPresent()` أو استخدم `orElse(defaultValue)`.

---

### سؤال تصحيح 5

**الكود (يحتوي خطأ):**
```java
String[] names = {"Alice","Bob","Charlie"};
// Trying to sort descending
Stream.of(names).sorted((e1, e2) -> e2.CompareTo(e1))
    .forEach(System.out::println);
```
**اكتشف الخطأ:** Method name is wrong — `CompareTo` with capital C does not exist; the correct method is `compareTo` (lowercase c).

**التصحيح:**
```java
String[] names = {"Alice", "Bob", "Charlie"};
// Descending order using correct method name
Stream.of(names)
    .sorted((e1, e2) -> e2.compareTo(e1))   // correct: lowercase compareTo
    .forEach(System.out::println);
// Output: Charlie, Bob, Alice
```
**شرح الحل:**
1. Java متحسّسة لحالة الأحرف (`case-sensitive`).
2. `compareTo` بحروف صغيرة هي الدالة الصحيحة.
3. عكس الترتيب = عكس المعاملات: `(e2, e1)` بدل `(e1, e2)`.

---

### سؤال تصحيح 6

**الكود (يحتوي خطأ):**
```java
// Goal: count words longer than 5 chars
List<String> words = Arrays.asList("hello", "world", "hi", "programming");
words.stream()
    .filter(w -> w.length > 5)  // wrong: length is not a field
    .count();
```
**اكتشف الخطأ:** `String.length` is a method, not a field — must be called as `w.length()` with parentheses.

**التصحيح:**
```java
List<String> words = Arrays.asList("hello", "world", "hi", "programming");
long count = words.stream()
    .filter(w -> w.length() > 5)  // correct: length() with parentheses
    .count();
System.out.println(count); // 1 (only "programming")
```
**شرح الحل:**
1. `String.length()` دالة — تحتاج `()`.
2. `array.length` حقل — لا يحتاج `()` (للمصفوفات فقط).
3. خطأ شائع جداً بين المبتدئين.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): فلترة وتجميع — fill_gaps

**السيناريو / المطلوب:**
أكمل الكود التالي لحساب مجموع الأعداد الزوجية الأكبر من 5 في المصفوفة:

```java
int[] values = {1, 6, 8, 3, 12, 7, 10, 2};
int sum = IntStream.of(values)
    ._______( v -> _______ )    // (1) فلتر: زوجي وأكبر من 5
    ._______();                  // (2) terminal: مجموع
```

**المطلوب:**
1. ملء الفراغين
2. ما النتيجة المتوقعة؟

**نموذج الحل:**
```java
int sum = IntStream.of(values)
    .filter(v -> v % 2 == 0 && v > 5)  // (1)
    .sum();                              // (2)
// الأعداد المؤهلة: 6, 8, 12, 10 → المجموع = 36
```

---

### تمرين 2 (تمرين إضافي): Collectors.toMap — code_fix

**السيناريو / المطلوب:**
الكود التالي يُحاول بناء Map من الأسماء لطولها — اكتشف الخطأ وصحّحه:

```java
String[] names = {"Alice","Bob","Alice"}; // duplicate key!
Map<String, Integer> map = Stream.of(names)
    .collect(Collectors.toMap(e -> e, e -> e.length()));
```

**المطلوب:**
1. ما الخطأ؟
2. كيف تُصحّحه؟

**نموذج الحل:**
```java
// Problem: "Alice" appears twice → duplicate key → throws IllegalStateException

// Fix 1: remove duplicates first
Map<String, Integer> map1 = Stream.of(names)
    .distinct()
    .collect(Collectors.toMap(e -> e, e -> e.length()));

// Fix 2: use merge function (keep first or last)
Map<String, Integer> map2 = Stream.of(names)
    .collect(Collectors.toMap(
        e -> e,
        e -> e.length(),
        (existing, replacement) -> existing  // keep existing on duplicate
    ));
```

---

### تمرين 3 (تمرين إضافي): mapToObj وreduce — scenario

**السيناريو / المطلوب:**
عندك `IntStream` للأرقام {1,2,3,4,5}. اكتب pipeline يُنتج الـ String التالي: `"1-2-3-4-5"`

**المطلوب:**
اكتب الـ pipeline الكامل.

**نموذج الحل:**
```java
String result = IntStream.rangeClosed(1, 5)
    .mapToObj(e -> String.valueOf(e))    // int → String
    .reduce((a, b) -> a + "-" + b)       // join with "-"
    .orElse("");                          // safe get
System.out.println(result); // "1-2-3-4-5"
```

---

### تمرين 4 (تمرين إضافي): IntSummaryStatistics — fill_gaps

**السيناريو / المطلوب:**
اكتب كوداً يقرأ درجات طلاب ويُطبع: أعلى درجة، أدنى درجة، المتوسط — في سطر واحد باستخدام `summaryStatistics`.

**نموذج الحل:**
```java
int[] grades = {75, 88, 92, 65, 78, 95, 70};
IntSummaryStatistics stats = IntStream.of(grades).summaryStatistics();
System.out.printf("Max=%-4d Min=%-4d Avg=%.2f%n",
    stats.getMax(), stats.getMin(), stats.getAverage());
// Max=95  Min=65  Avg=80.43
```

---

### تمرين 5 (تمرين إضافي): groupingBy على Objects — scenario

**السيناريو / المطلوب:**
عندك قائمة طلاب مع درجاتهم. اكتب pipeline يُنتج عدد الطلاب في كل نطاق (A: 90+, B: 80-89, C: أقل):

**نموذج الحل:**
```java
int[] grades = {95, 82, 73, 88, 91, 67, 85};
Map<String, Long> distribution = IntStream.of(grades)
    .mapToObj(g -> g >= 90 ? "A" : g >= 80 ? "B" : "C")
    .collect(Collectors.groupingBy(
        e -> e, TreeMap::new, Collectors.counting()));
distribution.forEach((k,v) -> System.out.println(k + ": " + v));
// A: 2, B: 3, C: 2
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: مقارنة أسلوبين — diagram_completion

**السيناريو:**
نظام معالجة طلبات تسوّق يحتاج: فلترة الطلبات بأكثر من 100$، حساب المجموع، إظهار الكبرى الخمسة.

**المطلوب:**
1. ارسم pipeline للحل بـ `Stream`.
2. قارن بالحل التقليدي (loops).
3. متى تفضّل الـ `parallel stream`؟

**نموذج الحل:**
```
Pipeline: orders.stream()
               .filter(o -> o.amount > 100)
               .mapToDouble(o -> o.amount)
               .sorted()
               .limit(5)
               .sum()

مقارنة:
| المعيار | Loop | Stream |
| الوضوح | متوسط | عالٍ |
| التوازي | صعب | سهل (.parallel()) |
| الصيانة | أصعب | أسهل |
| الكفاءة | جيدة | جيدة (parallel أحياناً أفضل) |

متى parallel: حجم البيانات > مئات الآلاف وعمليات مستقلة.
```

---

### تمرين 2: تصميم pipeline لتحليل نص — written_analysis

**السيناريو:**
تريد تحليل نص لحساب: عدد الكلمات الفريدة، أطول كلمة، وتوزيع الكلمات حسب الطول.

**المطلوب:**
اكتب الـ pipelines المطلوبة مع شرح.

**نموذج الحل:**
```java
String[] words = text.split("\\s+");

// 1. عدد الكلمات الفريدة
long unique = Stream.of(words).distinct().count();

// 2. أطول كلمة
String longest = Stream.of(words)
    .max(Comparator.comparingInt(String::length))
    .orElse("");

// 3. توزيع حسب الطول
Map<Integer, Long> dist = Stream.of(words)
    .collect(Collectors.groupingBy(String::length,
             TreeMap::new, Collectors.counting()));
```

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: IntStream filter + map + sorted

**المدخل:**
```java
int[] values = {5, 2, 8, 1, 6, 3};
IntStream.of(values)
    .filter(v -> v % 2 != 0) // step 1
    .map(v -> v * 3)          // step 2
    .sorted()                 // step 3
    .forEach(System.out::print); // step 4
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | العناصر بعد العملية |
|---|---|---|
| 0 | مصدر | {5,2,8,1,6,3} |
| 1 | `filter(v%2!=0)` | ؟ |
| 2 | `map(v->v*3)` | ؟ |
| 3 | `sorted()` | ؟ |
| 4 | `forEach` | طباعة |

**نموذج الحل:**

| الخطوة | العملية | العناصر بعد العملية |
|---|---|---|
| 0 | مصدر | {5,2,8,1,6,3} |
| 1 | `filter(v%2!=0)` | {5,1,3} |
| 2 | `map(v->v*3)` | {15,3,9} |
| 3 | `sorted()` | {3,9,15} |
| 4 | `forEach` | طباعة: 3 9 15 |

**النتيجة:** `3 9 15`

---

### تمرين تتبع 2: reduce تراكمي

**المدخل:**
```java
int[] nums = {2, 3, 4};
int result = IntStream.of(nums).reduce(1, (x, y) -> x * y);
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | x (متراكم) | y (عنصر حالي) | x * y |
|---|---|---|---|
| ابتدائي | 1 (identity) | — | — |
| 1 | 1 | ؟ | ؟ |
| 2 | ؟ | ؟ | ؟ |
| 3 | ؟ | ؟ | ؟ |

**نموذج الحل:**

| الخطوة | x | y | x * y |
|---|---|---|---|
| ابتدائي | 1 | — | — |
| 1 | 1 | 2 | 2 |
| 2 | 2 | 3 | 6 |
| 3 | 6 | 4 | 24 |

**النتيجة:** `24`

---

### تمرين تتبع 3: groupingBy

**المدخل:**
```java
String[] words = {"cat","car","boat","can","bus","dog"};
Map<Character, Long> map = Stream.of(words)
    .collect(Collectors.groupingBy(e -> e.charAt(0),
             TreeMap::new, Collectors.counting()));
```

**تتبّع (أكمل الجدول):**

| الكلمة | المفتاح (charAt 0) | مجموعتها |
|---|---|---|
| "cat" | ؟ | ؟ |
| "car" | ؟ | ؟ |
| "boat" | ؟ | ؟ |
| "can" | ؟ | ؟ |
| "bus" | ؟ | ؟ |
| "dog" | ؟ | ؟ |

**نموذج الحل:**

| الكلمة | المفتاح | مجموعتها |
|---|---|---|
| "cat" | 'c' | c-group |
| "car" | 'c' | c-group |
| "boat" | 'b' | b-group |
| "can" | 'c' | c-group |
| "bus" | 'b' | b-group |
| "dog" | 'd' | d-group |

**النتيجة:** `{b=2, c=3, d=1}`

---

### تمرين تتبع 4: distinct + filter + average

**المدخل:**
```java
int[] vals = {4, 4, 6, 2, 6, 8};
double avg = IntStream.of(vals)
    .distinct()
    .filter(e -> e > 3)
    .average()
    .getAsDouble();
```

**تتبّع (أكمل الجدول):**

| الخطوة | العملية | العناصر |
|---|---|---|
| 0 | مصدر | {4,4,6,2,6,8} |
| 1 | `distinct()` | ؟ |
| 2 | `filter(e>3)` | ؟ |
| 3 | `average()` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | العناصر |
|---|---|---|
| 0 | مصدر | {4,4,6,2,6,8} |
| 1 | `distinct()` | {4,6,2,8} |
| 2 | `filter(e>3)` | {4,6,8} |
| 3 | `average()` | (4+6+8)/3 = 6.0 |

**النتيجة:** `avg = 6.0`

---

### تمرين تتبع 5: Stream.of مع limit و skip

**المدخل:**
```java
String[] names = {"A","B","C","D","E","F"};
Stream.of(names).skip(2).limit(3).forEach(System.out::print);
```

**تتبّع (أكمل الجدول):**

| الخطوة | العملية | العناصر |
|---|---|---|
| 0 | مصدر | {A,B,C,D,E,F} |
| 1 | `skip(2)` | ؟ |
| 2 | `limit(3)` | ؟ |
| 3 | `forEach` | طباعة |

**نموذج الحل:**

| الخطوة | العملية | العناصر |
|---|---|---|
| 0 | مصدر | {A,B,C,D,E,F} |
| 1 | `skip(2)` | {C,D,E,F} |
| 2 | `limit(3)` | {C,D,E} |
| 3 | `forEach` | طباعة: CDE |

**النتيجة:** `CDE`

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is a functional interface in Java?
A: واجهة تحتوي على دالة مجردة واحدة فقط (SAM — Single Abstract Method).

**Q2:** What does a lambda expression represent?
A: دالة مجهولة (`anonymous method`) مختصرة لتطبيق `functional interface`.

**Q3:** What is the syntax of a lambda expression?
A: `(parameterList) -> {statements}` — أقواس اختيارية لمعامل واحد، حاضنات اختيارية لجملة واحدة.

**Q4:** What is a Stream in Java?
A: كائن مؤقت لمعالجة تسلسل من العناصر وظيفياً — لا يُخزّن البيانات ويُدمَّر بعد الاستخدام.

**Q5:** What is the difference between intermediate and terminal operations?
A: الـ `intermediate` ترجع `Stream` جديداً وهي lazy. الـ `terminal` تُنهي الـ pipeline وترجع نتيجة.

**Q6:** What is the difference between `IntStream.range(1,10)` and `IntStream.rangeClosed(1,10)`?
A: `range(1,10)` يُنتج 1-9 (لا يشمل 10). `rangeClosed(1,10)` يُنتج 1-10 (يشمل 10).

**Q7:** What does `filter()` do?
A: عملية وسيطة تُبقي فقط العناصر التي تحقق الـ `Predicate` المحدد.

**Q8:** What does `map()` do?
A: عملية وسيطة تُحوّل كل عنصر بتطبيق `Function` عليه.

**Q9:** What is the difference between `reduce(0, (a,b)->a+b)` and `reduce((a,b)->a+b)`?
A: الأول بـ identity يُرجع `int` مباشرة. الثاني بدون identity يُرجع `OptionalInt`.

**Q10:** What does `collect(Collectors.toList())` do?
A: يجمع عناصر الـ `Stream` في `List` جديدة (terminal operation).

**Q11:** What is `groupingBy` used for?
A: تصنيف عناصر الـ `Stream` في مجموعات حسب مفتاح تُحدده، والنتيجة `Map`.

**Q12:** What does `.parallel()` do?
A: يُحوّل الـ `Stream` لنمط معالجة موزّعة على خيوط متعددة — أسرع مع بيانات ضخمة.

**Q13:** What does `summaryStatistics()` return?
A: كائن `IntSummaryStatistics` يحتوي count, max, min, sum, average دفعة واحدة.

**Q14:** What is `mapToInt()` used for?
A: تُحوّل `Stream<T>` لـ `IntStream` بتطبيق دالة تُرجع `int` على كل عنصر.

**Q15:** What does `distinct()` do?
A: عملية وسيطة تُزيل العناصر المكررة من الـ stream.

**Q16:** What does `limit(n)` do?
A: عملية وسيطة تأخذ أول n عناصر فقط وتتجاهل الباقي.

**Q17:** What does `skip(n)` do?
A: عملية وسيطة تتخطى أول n عناصر وتُمرّر الباقي.

**Q18:** What is the difference between `findFirst()` and `findAny()`?
A: `findFirst()` يُرجع أول عنصر (محدد). `findAny()` يُرجع أي عنصر (أسرع في parallel).

**Q19:** What do `allMatch`, `anyMatch`, and `noneMatch` return?
A: جميعها ترجع `boolean`. `allMatch`: كل العناصر. `anyMatch`: عنصر واحد على الأقل. `noneMatch`: لا أحد.

**Q20:** How do you create an IntStream from a primitive int array?
A: `Arrays.stream(intArray)` أو `IntStream.of(intArray)`.

**Q21:** What is the difference between `Stream<Integer>` and `IntStream`?
A: `IntStream` للأنواع البدائية `int` — أكثر كفاءة لأنه يتجنب `autoboxing`.

**Q22:** What does `Collectors.counting()` do inside `groupingBy`?
A: يعدّ عدد العناصر في كل مجموعة — ترجع `Long`.

**Q23:** What happens if you call `average()` on an empty stream?
A: ترجع `OptionalDouble.empty()`. استدعاء `getAsDouble()` يُلقي `NoSuchElementException`.

**Q24:** What is `TreeMap::new` used for in `groupingBy`?
A: يُحدد نوع الـ Map الناتجة ليكون `TreeMap` (مرتّب) بدل `HashMap` الافتراضي.

**Q25:** What functional interface does `.filter(predicate)` accept?
A: `Predicate<? super T>` — دالة تأخذ T وترجع `boolean`.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> كل أكواد المحاضرة في مرجع واحد للطالب — بدون شرح جديد.

```java
// ====== 1. StreamDemo1 ======
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamDemo1 {
    public static void main(String[] args) {
        Stream<String> words = Stream.of("Mary", "had", "a", "little", "lamb");
        words.forEach(e -> System.out.println(e));
        Stream<Integer> digits = Stream.of(3, 1, 4, 1, 5, 9);
        digits.forEach(e -> System.out.print(e));
        System.out.println();
        Integer[] digitArray = {3, 1, 4, 1, 5, 9};
        Stream.of(digitArray).forEach(e -> System.out.print(e));
        IntStream.of(1, 2, 3, 4).forEach(element -> System.out.print(element));
        List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");
        myList.stream().filter(s -> s.startsWith("c")).map(String::toUpperCase)
              .sorted().forEach(System.out::println);
        Arrays.stream(new int[]{1, 2, 3}).map(n -> 2 * n + 1)
              .average().ifPresent(System.out::println);
    }
}

// ====== 2. IntStreamOperations ======
import java.util.stream.IntStream;
public class IntStreamOperations {
    public static void main(String[] args) {
        int[] values = {3, 10, 6, 1, 4, 8, 2, 5, 9, 7};
        IntStream.of(values).forEach(v -> System.out.print(v + " "));
        System.out.println(IntStream.of(values).count());
        System.out.println(IntStream.of(values).min().getAsInt());
        System.out.println(IntStream.of(values).max().getAsInt());
        System.out.println(IntStream.of(values).sum());
        System.out.println(IntStream.of(values).average().getAsDouble());
        System.out.println(IntStream.of(values).reduce(0, (x, y) -> x + y));
        System.out.println(IntStream.of(values).reduce(0, (x, y) -> x + y * y));
        System.out.println(IntStream.of(values).reduce(1, (x, y) -> x * y));
        IntStream.of(values).filter(v -> v % 2 != 0).map(v -> v * 10)
                 .sorted().forEach(v -> System.out.print(v + " "));
        System.out.println(IntStream.range(1, 10).sum());
        System.out.println(IntStream.rangeClosed(1, 10).sum());
    }
}

// ====== 3. ArraysAndStreams ======
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
public class ArraysAndStreams {
    public static void main(String[] args) {
        Integer[] values = {2, 9, 5, 0, 3, 7, 1, 4, 8, 6};
        System.out.println(Arrays.asList(values));
        System.out.println(Arrays.stream(values).sorted().collect(Collectors.toList()));
        List<Integer> greaterThan4 = Arrays.stream(values)
                .filter(v -> v > 4).collect(Collectors.toList());
        System.out.println(greaterThan4);
        System.out.println(Arrays.stream(values).filter(v -> v > 4)
                .sorted().collect(Collectors.toList()));
        System.out.println(greaterThan4.stream().sorted().collect(Collectors.toList()));
    }
}

// ====== 4. StreamDemo — String operations ======
import java.util.stream.Stream;
public class StreamDemo {
    public static void main(String[] args) {
        String[] names = {"John","Peter","Susan","kim","Jen","George","Alan","Stacy","Michelle","john"};
        Stream.of(names).limit(4).sorted().forEach(e -> System.out.print(e + " "));
        System.out.println();
        Stream.of(names).skip(4).sorted(String::compareToIgnoreCase)
              .forEach(e -> System.out.print(e + " "));
        System.out.println(Stream.of(names).filter(e->e.length()>4).max(String::compareTo).get());
        System.out.println(Stream.of(names).min(String::compareTo).get());
        System.out.println(Stream.of(names).anyMatch(e -> e.equals("Stacy")));
        System.out.println(Stream.of(names).allMatch(e->Character.isUpperCase(e.charAt(0))));
        System.out.println(Stream.of(names).noneMatch(e -> e.startsWith("Ko")));
        System.out.println(Stream.of(names).map(e->e.toUpperCase()).distinct().count());
        System.out.println(Stream.of(names).map(String::toLowerCase).findFirst().get());
        Object[] lower = Stream.of(names).map(String::toLowerCase).toArray();
        System.out.println(java.util.Arrays.toString(lower));
    }
}

// ====== 5. IntStreamDemo — summaryStatistics ======
import java.util.IntSummaryStatistics;
import java.util.stream.IntStream;
public class IntStreamDemo {
    public static void main(String[] args) {
        int[] values = {3, 4, 1, 5, 20, 1, 3, 3, 4, 6};
        System.out.println(IntStream.of(values).distinct()
                .filter(e -> e > 3 && e % 2 == 0).average().getAsDouble());
        System.out.println(IntStream.of(values).limit(4).sum());
        IntSummaryStatistics stats = IntStream.of(values).summaryStatistics();
        System.out.printf("The summary of the stream is%n %-10s%10d%n%-10s%10d%n %-10s%10d%n %-10s%10d%n %-10s%10.2f%n",
            "Count:", stats.getCount(), "Max:", stats.getMax(),
            "Min:", stats.getMin(), "Sum:", stats.getSum(),
            "Average:", stats.getAverage());
    }
}

// ====== 6. ParallelStreamDemo ======
import java.util.Arrays;
import java.util.Random;
import java.util.stream.IntStream;
public class ParallelStreamDemo {
    public static void main(String[] args) {
        Random random = new Random();
        int[] list = random.ints(2000000).toArray();
        System.out.println("Number of processors: " + Runtime.getRuntime().availableProcessors());
        long startTime = System.currentTimeMillis();
        int[] list1 = IntStream.of(list).filter(e->e>0).sorted().limit(5).toArray();
        System.out.println(Arrays.toString(list1));
        System.out.println("Sequential execution time is " + (System.currentTimeMillis()-startTime) + " millis");
        startTime = System.currentTimeMillis();
        int[] list2 = IntStream.of(list).parallel().filter(e->e>0).sorted().limit(5).toArray();
        System.out.println(Arrays.toString(list2));
        System.out.println("Parallel execution time is " + (System.currentTimeMillis()-startTime) + " millis");
    }
}

// ====== 7. StreamReductionDemo ======
import java.util.stream.IntStream;
import java.util.stream.Stream;
public class StreamReductionDemo {
    public static void main(String[] args) {
        int[] values = {3,4,1,5,20,1,3,3,4,6};
        IntStream.of(values).forEach(e -> System.out.print(e + " "));
        System.out.println();
        System.out.println(IntStream.of(values).parallel().reduce(1,(e1,e2)->e1*e2));
        System.out.println(IntStream.of(values).mapToObj(e->e+"").reduce((e1,e2)->e1+", "+e2).get());
        String[] names = {"John","Peter","Susan","Kim"};
        System.out.println(Stream.of(names).reduce((x,y)->x+", "+y).get());
        System.out.println(Stream.of(names).reduce((x,y)->x+y).get());
        System.out.println(Stream.of(names).reduce((x,y)->x+y).get().length());
    }
}

// ====== 8. CollectDemo ======
import java.util.*;
import java.util.stream.*;
public class CollectDemo {
    public static void main(String[] args) {
        String[] names = {"John","Peter","Susan","Kim","Jen","George","Alan","Stacy","Michelle","john"};
        System.out.println(Stream.of(names).collect(Collectors.toList()));
        System.out.println(Stream.of(names).map(e->e.toUpperCase()).collect(Collectors.toSet()));
        System.out.println(Stream.of(names).collect(Collectors.toMap(e->e,e->e.length())));
        System.out.println(Stream.of(names).collect(Collectors.summingInt(e->e.length())));
        IntSummaryStatistics stats = Stream.of(names).collect(Collectors.summarizingInt(e->e.length()));
        System.out.println("Max is " + stats.getMax());
        System.out.println("Min is " + stats.getMin());
        System.out.println("Average is " + stats.getAverage());
    }
}

// ====== 9. CollectGroupDemo ======
import java.util.*;
import java.util.stream.*;
public class CollectGroupDemo {
    public static void main(String[] args) {
        String[] names = {"John","Peter","Susan","Kim","Jen","George","Alan","Stacy","Steve","john"};
        System.out.println(Stream.of(names).map(e->e.toUpperCase())
            .collect(Collectors.groupingBy(e->e, Collectors.counting())));
        System.out.println(Stream.of(names).collect(Collectors.groupingBy(
            e->e.charAt(0), TreeMap::new, Collectors.counting())));
        int[] values = {2,3,4,1,2,3,2,3,4,5,1,421};
        IntStream.of(values).mapToObj(e->e)
            .collect(Collectors.groupingBy(e->e, TreeMap::new, Collectors.counting()))
            .forEach((k,v)->System.out.println(k+" occurs "+v+(v>1?" times":" time")));
    }
}

// ====== 10. AnalyzeNumbersUsingStream ======
import java.util.stream.*;
public class AnalyzeNumbersUsingStream {
    public static void main(String[] args) {
        java.util.Scanner input = new java.util.Scanner(System.in);
        System.out.print("Enter the number of items: ");
        int n = input.nextInt();
        double[] numbers = new double[n];
        System.out.print("Enter the numbers: ");
        for (int i = 0; i < n; i++) numbers[i] = input.nextDouble();
        double average = DoubleStream.of(numbers).average().getAsDouble();
        System.out.println("Average is " + average);
        System.out.println("Number of elements above the average is " +
            DoubleStream.of(numbers).filter(e->e>average).count());
    }
}

// ====== 11. TwoDimensionalArrayStream ======
import java.util.IntSummaryStatistics;
import java.util.stream.IntStream;
import java.util.stream.Stream;
public class TwoDimensionalArrayStream {
    private static int i = 0;
    public static void main(String[] args) {
        int[][] m = {{1,2},{3,4},{4,5},{1,3}};
        int[] list = Stream.of(m).map(e->IntStream.of(e))
            .reduce((e1,e2)->IntStream.concat(e1,e2)).get().toArray();
        IntSummaryStatistics stats = IntStream.of(list).summaryStatistics();
        System.out.println("Max: "+stats.getMax()+" Min: "+stats.getMin());
        System.out.println("Sum: "+stats.getSum()+" Avg: "+stats.getAverage());
        System.out.println("Sum of row");
        Stream.of(m).mapToInt(e->IntStream.of(e).sum())
            .forEach(e->System.out.println("Sum of row "+i+++": "+e));
    }
}

// ====== 12. CountOccurrenceOfWordsStream ======
import java.util.*;
import java.util.stream.*;
public class CountOccurrenceOfWordsStream {
    public static void main(String[] args) {
        String text = "Good morning. Have a good class. Have a good visit. Have fun!";
        Stream.of(text.split("[\\s+\\p{P}]")).parallel()
            .filter(e->e.length()>0)
            .collect(Collectors.groupingBy(String::toLowerCase, TreeMap::new, Collectors.counting()))
            .forEach((k,v)->System.out.println(k+" "+v));
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: What is a Functional Interface? Define with examples.
**نموذج الإجابة:**
1. **التعريف:** واجهة تحتوي على دالة مجردة واحدة فقط (`Single Abstract Method = SAM`).
2. **المكونات:** annotation `@FunctionalInterface` (اختيارية)، دالة مجردة واحدة، قد تحتوي default/static methods.
3. **مثال:** `Predicate<T>` — دالة `boolean test(T)`. `Consumer<T>` — `void accept(T)`.
4. **متى نستخدم:** في كل مكان يُستخدم فيه `lambda expression` — كـ `filter`, `map`, `forEach`.

---

### سؤال 2: Explain the Stream Pipeline concept.
**نموذج الإجابة:**
1. **التعريف:** تسلسل من العمليات يبدأ من مصدر بيانات، ينفّذ تحويلات، وينتهي بعملية نهائية.
2. **المكونات:** مصدر (Source) + صفر أو أكثر Intermediate Operations + Terminal Operation واحدة.
3. **مثال:** `set.stream().limit(50).distinct().count()`
4. **متى نستخدم:** لمعالجة مجموعات البيانات بأسلوب وظيفي ومقروء.

---

### سؤال 3: What is lazy evaluation in Streams?
**نموذج الإجابة:**
1. **التعريف:** الـ `Intermediate operations` لا تُنفَّذ فعلياً عند الاستدعاء — تُنفَّذ فقط عند وجود `Terminal operation`.
2. **المكونات:** pipeline يُبنى في الذاكرة، ثم يُنفَّذ دفعة واحدة عند الـ terminal.
3. **مثال:** `stream.filter(...).map(...)` لا يُعالج أي عنصر — يُضاف `.count()` فيبدأ الـ pipeline.
4. **متى نستخدم:** يُحسّن الأداء — يُتيح تحسينات مثل short-circuit في `anyMatch`.

---

### سؤال 4: Explain `reduce` method — types and differences.
**نموذج الإجابة:**
1. **التعريف:** يُدمج كل عناصر الـ stream في قيمة واحدة تراكمياً.
2. **النسختان:** `reduce(identity, BinaryOperator)` → ترجع T. `reduce(BinaryOperator)` → ترجع `Optional<T>`.
3. **مثال:** `reduce(0,(a,b)->a+b)` للجمع، `reduce(1,(a,b)->a*b)` للضرب.
4. **متى نستخدم:** جمع، ضرب، concatenation، أي عملية تُدمج عناصر في نتيجة واحدة.

---

### سؤال 5: What is the difference between `Stream.of(int[])` and `Arrays.stream(int[])`?
**نموذج الإجابة:**
1. `Stream.of(int[])` → يُنشئ `Stream<int[]>` (المصفوفة كعنصر واحد).
2. `Arrays.stream(int[])` → يُنشئ `IntStream` بالعناصر الفردية.
3. **مثال:** `Stream.of(new int[]{1,2,3})` → stream بعنصر واحد (مصفوفة). `Arrays.stream(new int[]{1,2,3})` → IntStream بثلاثة عناصر.
4. **متى نستخدم:** للمصفوفات البدائية دائماً استخدم `Arrays.stream` أو `IntStream.of`.

---

### سؤال 6: What are the six basic functional interfaces in java.util.function?
**نموذج الإجابة:**
1. `Predicate<T>` → `boolean test(T)` — للفلترة.
2. `Consumer<T>` → `void accept(T)` — للطباعة/التعديل.
3. `Function<T,R>` → `R apply(T)` — للتحويل.
4. `Supplier<T>` → `T get()` — للإنتاج.
5. `UnaryOperator<T>` → `T apply(T)` — للتحويل بنفس النوع.
6. `BinaryOperator<T>` → `T apply(T,T)` — للدمج.

---

### سؤال 7: Explain parallel streams and when to use them.
**نموذج الإجابة:**
1. **التعريف:** stream يُوزّع المعالجة على خيوط متعددة (ForkJoinPool) لاستغلال المعالجات المتعددة.
2. **الإنشاء:** إضافة `.parallel()` في أي مكان بالـ pipeline.
3. **مثال:** معالجة 20M عنصر: sequential 3275ms، parallel 1217ms (4 معالجات).
4. **متى نستخدم:** بيانات ضخمة (100K+)، عمليات مستقلة لا تعتمد على بعضها، معالجات متعددة متاحة.

---

### سؤال 8: What is `Collectors.groupingBy` and what are its three forms?
**نموذج الإجابة:**
1. **الشكل الأول:** `groupingBy(classifier)` → `Map<K, List<T>>` (افتراضي).
2. **الشكل الثاني:** `groupingBy(classifier, downstream)` → `Map<K, R>`.
3. **الشكل الثالث:** `groupingBy(classifier, mapFactory, downstream)` → `Map<K, R>` بنوع map محدد.
4. **مثال:** `groupingBy(e->e.charAt(0), TreeMap::new, Collectors.counting())`.

---

### سؤال 9: Explain `IntSummaryStatistics` and how to get it.
**نموذج الإجابة:**
1. **التعريف:** كائن يجمع count, max, min, sum, average في مسرة واحدة.
2. **الإنشاء:** `IntStream.of(values).summaryStatistics()` أو `Stream.collect(Collectors.summarizingInt(f))`.
3. **الدوال:** `getCount()`, `getMax()`, `getMin()`, `getSum()`, `getAverage()`.
4. **متى نستخدم:** عندما تحتاج أكثر من إحصاء — بدلاً من تكرار الـ pipeline عدة مرات.

---

### سؤال 10: What is functional programming and how does it differ from OOP?
**نموذج الإجابة:**
1. **التعريف:** أسلوب برمجة يُركّز على "ماذا تريد" (`what you want`) لا "كيف تفعل" (`what you do`).
2. **الخاصية الأساسية:** immutability — لا تُعدَّل البيانات المصدر.
3. **الفرق عن OOP:** OOP يُنظّم الكود في classes وobjects. Functional يُركّز على دوال خالصة.
4. **الفوائد:** أسرع، أقصر، أسهل للتوازي، يستفيد من المعالجات المتعددة.

---

### سؤال 11: What is the difference between `Stream<Integer>` and `IntStream`?
**نموذج الإجابة:**
1. `Stream<Integer>` يعمل مع كائنات `Integer` (object) — يحتاج autoboxing/unboxing.
2. `IntStream` يعمل مع `int` بدائي — لا autoboxing — أكثر كفاءة.
3. `IntStream` له دوال إضافية: `sum()`, `average()`, `range()`, `summaryStatistics()`.
4. للتحويل: `stream.mapToInt(...)` → `IntStream` | `intStream.boxed()` → `Stream<Integer>`.

---

### سؤال 12: When should you use `collect` vs `reduce`?
**نموذج الإجابة:**
1. **reduce:** عندما تريد قيمة واحدة scalar (مجموع، جداء، string واحد).
2. **collect:** عندما تريد حاوية قابلة للتعديل (List, Set, Map).
3. `reduce` ينتج immutable result. `collect` ينتج mutable container.
4. **مثال:** جمع عدد الأحرف → `reduce`. جمع الأسماء في Set → `collect(Collectors.toSet())`.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أعرف تعريف `Functional Interface` و`SAM`.
- [ ] أعرف الست واجهات الأساسية في `java.util.function` ومواقيعها.
- [ ] أستطيع كتابة `lambda expression` بأشكالها المختلفة (بلا معاملات، معامل واحد، متعدد، جسم مركّب).
- [ ] أفهم الفرق بين `Intermediate` و`Terminal` operations.
- [ ] أعرف أن `Stream` مؤقت (`transient`) ويُدمَّر بعد `terminal operation`.
- [ ] أعرف الفرق بين `IntStream.range(a,b)` و`IntStream.rangeClosed(a,b)`.
- [ ] أستطيع استخدام `filter`, `map`, `sorted`, `distinct`, `limit`, `skip`.
- [ ] أستطيع استخدام `count`, `forEach`, `sum`, `average`, `min`, `max`.
- [ ] أفهم `reduce` بنسختيها (مع identity وبدونها) والفرق في النتيجة.
- [ ] أستطيع استخدام `collect(Collectors.toList/toSet/toMap)`.
- [ ] أفهم `Collectors.groupingBy` بمعاملاته الثلاثة وكيفية استخدام `TreeMap::new`.
- [ ] أعرف الفرق بين `summingInt` و`summarizingInt`.
- [ ] أفهم `.parallel()` ومتى تزيد كفاءته.
- [ ] أستطيع استخدام `IntSummaryStatistics` لاستخلاص الإحصاءات.
- [ ] أعرف الفرق بين `Stream.of(int[])` و`Arrays.stream(int[])`.
- [ ] أستطيع استخدام `mapToInt` للتحويل من `Stream<T>` لـ `IntStream`.
- [ ] أفهم كيفية تسطيح مصفوفة ثنائية الأبعاد بـ `IntStream.concat + reduce`.
- [ ] أستطيع كتابة pipeline لعدّ تكرار الكلمات والحروف.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
|---|---|---|
| Lambda & Streams | Collections (ArrayList, HashSet, TreeMap) | `.stream()` تُنشئ stream من collection |
| Lambda & Streams | Functional Interfaces | كل lambda تُطبّق functional interface |
| Lambda & Streams | Generics | `Stream<T>`, `Collector<T,A,R>` |
| Lambda & Streams | Comparator | `sorted(Comparator)`, `max(Comparator)` |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقطة |
|---|---|
| Stream | مؤقت، لا يُخزّن، يُدمَّر بعد terminal |
| Intermediate | lazy — لا تُنفَّذ حتى terminal |
| range vs rangeClosed | range لا يشمل النهاية — rangeClosed يشملها |
| reduce | مع identity → T ، بدونها → Optional\<T\> |
| groupingBy | 1 معامل → Map\<K,List\<T\>\> ، 3 معاملات → Map\<K,R\> |
| parallel | مفيد مع بيانات ضخمة وعمليات مستقلة |
| int[] vs Integer[] | int[] → IntStream ، Integer[] → Stream\<Integer\> |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
|---|---|---|
| `SAM` | Single Abstract Method | تعريف functional interface |
| `OptionalInt` | حاوية int قد تكون فارغة | `min()`, `max()`, `reduce(op)` |
| `OptionalDouble` | حاوية double قد تكون فارغة | `average()` |
| `TreeMap::new` | method reference لإنشاء TreeMap | كـ mapFactory في `groupingBy` |
| `String::toUpperCase` | method reference للـ instance method | بدل `e -> e.toUpperCase()` |
| `System.out::println` | method reference للطباعة | بدل `e -> System.out.println(e)` |
| `\p{P}` | regex للـ punctuation | في `split("[\\s+\\p{P}]")` |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
|---|---|
| 1 | لا تُعيد استخدام `Stream` بعد `terminal operation` — أنشئ stream جديداً. |
| 2 | `range(a,b)` = {a, a+1, ..., b-1}. `rangeClosed(a,b)` = {a, a+1, ..., b}. |
| 3 | `reduce(identity, op)` → نتيجة مباشرة. `reduce(op)` → Optional — استدعِ `.get()` أو `.orElse()`. |
| 4 | `Arrays.stream(int[])` للـ primitive. `Stream.of(Integer[])` للـ objects. |
| 5 | identity للجمع = 0. identity للضرب = 1. identity لـ concatenation = "". |
| 6 | `.parallel()` لا تضمن الترتيب — لكن `.sorted()` تُوحّد النتيجة النهائية. |
| 7 | `char[]` لا تعمل مع `Stream` مباشرة — حوّلها لـ `Character[]` أولاً. |

---

<!-- VALIDATION
schema: 1.0
parts: detail,summary,mcq,debug,exercise,analysis_exercise,trace_exercise,qa_cards,code,theory,self_check,cheat_sheet
mcq_count: 25
code_blocks: 14
-->

# المحاضرة 3 — Exception Handling, Text I/O, Binary I/O, Regular Expressions, Enumerated Types

> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** معالجة الاستثناءات، الإدخال/الإخراج النصي والثنائي، التعبيرات المنتظمة، الأنواع المُعدَّدة

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

---

### 1. Unit-1: Exception Handling (معالجة الاستثناءات)

#### 1.1 ما هي الاستثناءات؟

**النص الأصلي يقول:** "Runtime errors are thrown as exceptions. An exception is an object."

**الشرح المبسّط:**
عندما يحدث خطأ أثناء تشغيل البرنامج (لا أثناء الترجمة)، تقوم Java بإنشاء كائن من نوع معين يُعبّر عن هذا الخطأ — هذا الكائن يُسمى `Exception`. الاستثناءات تتيح للبرنامج أن يُكمل تنفيذه بشكل طبيعي بدل أن يتوقف فجأة.

**💡 التشبيه:**
> كأنك تقود سيارة وأضاءت لمبة الوقود — البرنامج "يُشير" لك بالخطأ بدل أن يتوقف المحرك فجأة.
> **وجه الشبه:** اللمبة = `Exception object`، فحص الوقود = `try-catch block`.

**مثال من الامتحان:**
```
What happens when a runtime error occurs in Java?
a) The program terminates immediately without any indication
b) An exception object is thrown
c) The compiler catches it before running
d) Java ignores it and continues
```
**الإجابة: b** — التعليل: الاستثناءات تُرمى كـ `objects` في وقت التشغيل.

---

#### 1.2 مشكلة القسمة على صفر (بدون معالجة)

**النص الأصلي يقول:** أول مثال يوضح دخول عددين وقسمتهما، إذا كان `n2 == 0` يحدث خطأ.

**الشرح المبسّط:**
الحل البدائي هو التحقق يدوياً بـ `if (n2 != 0)` قبل إجراء القسمة. لكن هذا النهج يُثقل الكود بفحوصات كثيرة. الحل الأفضل هو آلية `try-catch`.

#### 💻 الكود: القسمة بدون معالجة استثناء

**ما هذا الكود؟**
> يوضح مشكلة القسمة على صفر وكيفية التعامل معها بدون `try-catch`.

```java
import java.util.Scanner;
public class Q {
    public static void main(String[] args) {
        Scanner inin = new Scanner(System.in); // create scanner for input
        System.out.print("Enter two integers: "); // prompt user
        int n1 = inin.nextInt(); // read first integer
        int n2 = inin.nextInt(); // read second integer
        // manual check before division
        if (n2 != 0)
            System.out.println(n1 + " / " + n2 + " is " + (n1 / n2));
        else
            System.out.println("Divisor cannot be zero");
    }
}
```

**شرح كل سطر:**
1. `import java.util.Scanner;` → استيراد الـ `Scanner` — لقراءة المدخلات.
2. `Scanner inin = new Scanner(System.in);` → إنشاء كائن `Scanner` — يقرأ من لوحة المفاتيح.
3. `int n1 = inin.nextInt();` → قراءة أول عدد صحيح.
4. `int n2 = inin.nextInt();` → قراءة ثاني عدد صحيح.
5. `if (n2 != 0)` → فحص يدوي — لتجنب `ArithmeticException`.
6. `System.out.println(...)` → طباعة الناتج إذا كان `n2 ≠ 0`.
7. `else` → التعامل مع حالة القسمة على صفر.

**المكتبات المطلوبة:**
> `import java.util.Scanner;`

**الناتج المتوقع:**
> إذا أدخل المستخدم `3 0` → يظهر: `Divisor cannot be zero`

---

#### 1.3 آلية try-catch الأساسية

**النص الأصلي يقول:** يقدم مثال `exception_1` مع `ArrayIndexOutOfBoundsException` و`InputMismatchException`.

**الشرح المبسّط:**
بلوك `try` يحتوي الكود الذي قد يُسبب خطأ. إذا حدث خطأ، تنتقل Java تلقائياً لأول `catch` مطابق لنوع الاستثناء. هذا يُفصل منطق البرنامج الطبيعي عن معالجة الأخطاء.

```algorithm
1 | كتابة الكود المحتمل خطؤه | try block | تُغلَّف العمليات الحساسة
2 | تحديد نوع الاستثناء | catch(ExceptionType ex) | يُطابَق تلقائياً عند حدوث الخطأ
3 | كتابة الاستجابة | catch body | رسالة أو إجراء بديل
4 | متابعة البرنامج | بعد catch | إذا عولج الخطأ، يكمل البرنامج
```

#### 💻 الكود: try-catch مع استثناءات متعددة

**ما هذا الكود؟**
> يوضح كيفية التعامل مع `InputMismatchException` و`IndexOutOfBoundsException` في نفس البرنامج.

```java
import java.util.*;
public class exception_1 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in); // create input scanner
        int d = s.nextInt();               // read array size
        int[] a = new int[d];             // create array of size d
        try {
            for (int i = 0; i < d; i++)  // fill array with input
                a[i] = s.nextInt();
            System.out.println(a[d]);    // intentional: index d is out of bounds!
        }
        catch (InputMismatchException ex) {              // wrong type entered
            System.out.println("Try again????????????????????????");
        }
        catch (IndexOutOfBoundsException ex) {           // array index exceeded
            System.out.println("Out Of Bounds!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }
}
```

**شرح كل سطر:**
1. `int d = s.nextInt();` → حجم المصفوفة — يُقرأ من المستخدم.
2. `int[] a = new int[d];` → إنشاء مصفوفة بحجم `d` — الفهارس من `0` إلى `d-1`.
3. `a[i] = s.nextInt();` → ملء المصفوفة — يستثني الفهرس `d`.
4. `System.out.println(a[d]);` → **خطأ متعمد** — الفهرس `d` خارج النطاق دائماً.
5. `catch (InputMismatchException ex)` → يُمسك الخطأ إذا أُدخل نص بدل رقم.
6. `catch (IndexOutOfBoundsException ex)` → يُمسك خطأ تجاوز حدود المصفوفة.

**الناتج المتوقع:**
> دائماً `Out Of Bounds!!` — لأن `a[d]` دائماً خارج النطاق.

#### مهم للامتحان ⚠️:
> ترتيب `catch` مهم جداً — الأكثر تحديداً (الأبن) يجب أن يأتي قبل الأقل تحديداً (الأب). إذا وضعت `Exception` قبل `IOException`، لن يصل التنفيذ أبداً للـ `catch` الثاني.

---

#### 1.4 منع تكرار الخطأ بحلقة do-while

**النص الأصلي يقول:** مثال `InputMismatchExceptionDemo` — يُكرر طلب الإدخال حتى يُدخل المستخدم عدداً صحيحاً.

**الشرح المبسّط:**
نجمع `try-catch` مع `do-while` للحصول على إدخال صحيح. عند الخطأ، نُعيد ضبط `Scanner` بـ `inin.nextLine()` لمسح الإدخال الخاطئ من الـ buffer.

#### 💻 الكود: إعادة المحاولة عند الخطأ

**ما هذا الكود؟**
> يُكرر طلب إدخال عدد صحيح حتى يُدخل المستخدم قيمة صحيحة، باستخدام `InputMismatchException`.

```java
import java.util.*;
public class InputMismatchExceptionDemo {
    public static void main(String[] args) {
        Scanner inin = new Scanner(System.in); // create scanner
        boolean continueinin = true;           // loop control flag
        do {
            try {
                System.out.print("Enter an integer: "); // prompt
                int number = inin.nextInt();             // try to read int
                System.out.println("The number entered is " + number); // success
                continueinin = false;                   // exit loop on success
            }
            catch (InputMismatchException ex) {          // wrong type
                System.out.println("Try again. (Incorrect input: an integer is required)");
                inin.nextLine(); // clear the invalid input from buffer
            }
        } while (continueinin); // repeat until valid input
    }
}
```

**شرح كل سطر:**
1. `boolean continueinin = true;` → متغير التحكم في الحلقة — `true` = استمر.
2. `int number = inin.nextInt();` → محاولة قراءة عدد صحيح — قد يُثير استثناءً.
3. `continueinin = false;` → إذا نجحت القراءة، أوقف الحلقة.
4. `inin.nextLine();` → **مهم جداً** — يمسح الإدخال الخاطئ من الـ `buffer` لمنع حلقة لا نهائية.

**الناتج المتوقع:**
```
Enter an integer: 3.5
Try again. (Incorrect input: an integer is required)
Enter an integer: 4
The number entered is 4
```

#### نقطة مهمة ⚠️:
> بدون `inin.nextLine()` في الـ `catch`، يبقى الإدخال الخاطئ في الـ `buffer` ويُسبب حلقة لا نهائية من رسائل الخطأ.

**مثال من الامتحان:**
```
What is the purpose of inin.nextLine() inside the catch block?
a) To read the next valid integer
b) To clear the invalid input from the Scanner buffer
c) To reset the loop counter
d) To close the Scanner
```
**الإجابة: b** — التعليل: بدون مسح الـ `buffer`، يُعاد قراءة نفس الإدخال الخاطئ.

---

#### 1.5 هرم الاستثناءات في Java (Exception Hierarchy)

**النص الأصلي يقول:** "Exceptions are objects, and objects are defined using classes. The root class for exceptions is java.lang.Throwable."

**الشرح المبسّط:**
جميع الاستثناءات والأخطاء تنحدر من الكلاس `Throwable`. ينقسم إلى:
- `Exception`: الأخطاء القابلة للمعالجة (Checked & Unchecked).
- `Error`: الأخطاء الحادة غير القابلة عادةً للمعالجة (مثل `OutOfMemoryError`).

#### 📊 المخطط: هرم الاستثناءات في Java

**ما هذا المخطط؟**
> يوضح التسلسل الهرمي لكلاسات الاستثناء في Java انطلاقاً من `Object`.

**وصف العُقد:**

| # | العُقدة | النوع `kind` | الشرح |
|---|---------|-------------|-------|
| 1 | `Object` | class | الجذر الأعلى لكل الكلاسات |
| 2 | `Throwable` | class | جذر كل الاستثناءات والأخطاء |
| 3 | `Exception` | class | الاستثناءات القابلة للمعالجة |
| 4 | `Error` | class | أخطاء JVM الحادة |
| 5 | `RuntimeException` | class | استثناءات غير إلزامية المعالجة (Unchecked) |
| 6 | `IOException` | class | استثناءات إدخال/إخراج (Checked) |
| 7 | `ClassNotFoundException` | class | كلاس غير موجود (Checked) |
| 8 | `ArithmeticException` | class | أخطاء حسابية (مثل القسمة على صفر) |
| 9 | `NullPointerException` | class | الوصول لمرجع `null` |
| 10 | `IndexOutOfBoundsException` | class | تجاوز حدود المصفوفة/القائمة |
| 11 | `IllegalArgumentException` | class | معامل غير صالح |
| 12 | `LinkageError` | class | خطأ ربط الكلاسات |
| 13 | `VirtualMachineError` | class | خطأ في الـ JVM |

**وصف الروابط:**

| من | إلى | التسمية | نوع السهم | الشرح |
|----|-----|---------|-----------|-------|
| `Object` | `Throwable` | inherits | تعميم | الأساس |
| `Throwable` | `Exception` | inherits | تعميم | فرع المعالجة |
| `Throwable` | `Error` | inherits | تعميم | فرع الأخطاء الحادة |
| `Exception` | `RuntimeException` | inherits | تعميم | Unchecked |
| `Exception` | `IOException` | inherits | تعميم | Checked |
| `Exception` | `ClassNotFoundException` | inherits | تعميم | Checked |
| `RuntimeException` | `ArithmeticException` | inherits | تعميم | ÷ صفر |
| `RuntimeException` | `NullPointerException` | inherits | تعميم | null ref |
| `RuntimeException` | `IndexOutOfBoundsException` | inherits | تعميم | array bound |
| `RuntimeException` | `IllegalArgumentException` | inherits | تعميم | bad arg |
| `Error` | `LinkageError` | inherits | تعميم | linkage |
| `Error` | `VirtualMachineError` | inherits | تعميم | JVM |

```diagram
type: class
title: Java Exception Hierarchy
direction: TD
nodes:
  - id: object
    label: Object
    kind: class
    level: 0
  - id: throwable
    label: Throwable
    kind: class
    level: 1
  - id: exception
    label: Exception
    kind: class
    level: 2
  - id: error
    label: Error
    kind: class
    level: 2
  - id: runtimeex
    label: RuntimeException
    kind: class
    level: 3
  - id: ioex
    label: IOException
    kind: class
    level: 3
  - id: classnotfound
    label: ClassNotFoundException
    kind: class
    level: 3
  - id: arithmetic
    label: ArithmeticException
    kind: class
    level: 4
  - id: nullpointer
    label: NullPointerException
    kind: class
    level: 4
  - id: indexoob
    label: IndexOutOfBoundsException
    kind: class
    level: 4
  - id: illegalarg
    label: IllegalArgumentException
    kind: class
    level: 4
  - id: linkage
    label: LinkageError
    kind: class
    level: 3
  - id: vmerror
    label: VirtualMachineError
    kind: class
    level: 3
edges:
  - from: object
    to: throwable
    label: ""
  - from: throwable
    to: exception
    label: ""
  - from: throwable
    to: error
    label: ""
  - from: exception
    to: runtimeex
    label: ""
  - from: exception
    to: ioex
    label: ""
  - from: exception
    to: classnotfound
    label: ""
  - from: runtimeex
    to: arithmetic
    label: ""
  - from: runtimeex
    to: nullpointer
    label: ""
  - from: runtimeex
    to: indexoob
    label: ""
  - from: runtimeex
    to: illegalarg
    label: ""
  - from: error
    to: linkage
    label: ""
  - from: error
    to: vmerror
    label: ""
```

**الفهم الخاطئ الشائع ❌:** "`Error` و`Exception` نفس الشيء."
**الفهم الصحيح ✅:** "`Error` أخطاء JVM حادة لا تُعالج عادةً، `Exception` أخطاء يمكن معالجتها بـ `try-catch`."

| النوع | Checked / Unchecked | مثال | يجب معالجته؟ |
|-------|---------------------|------|--------------|
| `RuntimeException` | Unchecked | `NullPointerException` | لا (اختياري) |
| `IOException` | Checked | `FileNotFoundException` | نعم (إلزامي) |
| `Error` | Unchecked | `StackOverflowError` | لا |

---

#### 1.6 بلوك finally

**النص الأصلي يقول:** مثال `FinallyPractice` — بلوك `finally` يُنفَّذ دائماً سواء حدث استثناء أم لا.

**الشرح المبسّط:**
`finally` يضمن تنفيذ كود التنظيف (إغلاق ملف، تحرير موارد) بغض النظر عن نجاح أو فشل الكود في `try`. هو ينفذ حتى إذا لم يحدث أي استثناء.

```algorithm
1 | تنفيذ الكود | try block | محاولة تنفيذ العمليات
2 | التحقق من الاستثناء | runtime check | هل حدث خطأ؟
3 | معالجة الخطأ | catch block | ينفذ فقط إذا حدث استثناء
4 | التنظيف الإلزامي | finally block | ينفذ دائماً بدون استثناء
5 | متابعة البرنامج | after try-catch-finally | الكود بعد الكتلة
```

#### 💻 الكود: finally block

**ما هذا الكود؟**
> يوضح أن `finally` يُنفذ دائماً — سواء نجحت القسمة أو فشلت.

```java
import java.util.*;
class FinallyPractice {
    public static void main(String[] a) {
        Scanner ssca = new Scanner(System.in); // input scanner
        int num = 0, div = 0;                  // initialize variables
        try {
            System.out.print("Enter the numerator: "); // prompt numerator
            num = ssca.nextInt();                       // read numerator
            System.out.print("Enter the divisor : ");  // prompt divisor
            div = ssca.nextInt();                       // read divisor
            System.out.println(num + " / " + div + " is " + (num / div) + " rem " + (num % div)); // divide
        }
        catch (ArithmeticException ex) { // catch division by zero
            System.out.println("You can't divide " + num + " by " + div);
        }
        finally { // always executes
            System.out.println("If something went wrong, you entered bad data.");
        }
        System.out.println("Good-by"); // executes after try-catch-finally
    }
}
```

**شرح كل سطر:**
1. `int num = 0, div = 0;` → تهيئة متغيرين — `finally` يحتاج الوصول إليهما حتى لو فشل `try`.
2. `catch (ArithmeticException ex)` → يُمسك `÷ 0` تحديداً.
3. `finally { ... }` → **دائماً ينفذ** — حتى إذا حدث `return` في `try`.
4. `System.out.println("Good-by");` → ينفذ بعد `finally` — في حالة عدم وجود `return` أو `System.exit`.

**الناتج المتوقع:**
```
Enter the numerator: 26
Enter the divisor : 4
26 / 4 is 6 rem 2
If something went wrong, you entered bad data.
Good-by
```

**مثال من الامتحان:**
```
When does the finally block execute?
a) Only when an exception occurs
b) Only when no exception occurs
c) Always, whether or not an exception occurs
d) Only when the catch block is empty
```
**الإجابة: c** — التعليل: `finally` مصمم للتنفيذ الإلزامي كتنظيف للموارد.

---

#### 1.7 رمي استثناء مخصص (throw / throws)

**النص الأصلي يقول:** مثال `CircleX` — الدالة `setRadius` ترمي `IllegalArgumentException` إذا كان `radius < 0`.

**الشرح المبسّط:**
يمكنك رمي استثناء يدوياً بالكلمة `throw new ExceptionType("message")`. الكلمة `throws` في رأس الدالة تُعلن للمُستدعي أن هذه الدالة قد ترمي استثناءً معيناً.

#### 💻 الكود: throw و throws في كلاس Circle

**ما هذا الكود؟**
> كلاس `CircleX` يرمي `IllegalArgumentException` عند تعيين `radius` سالب.

```java
public class CircleX {
    private double radius;                // radius field
    private static int numberOfObjects = 0; // count of created circles

    public CircleX() { this(1.0); }      // default constructor delegates to parameterized

    public CircleX(double newRadius) {
        setRadius(newRadius);             // validate via setter
        numberOfObjects++;                // increment count
    }

    public double getRadius() { return radius; } // getter

    public void setRadius(double newRadius) throws IllegalArgumentException { // declares exception
        if (newRadius >= 0)
            radius = newRadius;           // valid: assign
        else
            throw new IllegalArgumentException("Radius cannot be negative"); // invalid: throw
    }

    public static int getNumberOfObjects() { return numberOfObjects; } // static getter

    public double findArea() { return radius * radius * 3.14159; } // compute area
}

public class TestCircleX {
    public static void main(String[] args) {
        try {
            CircleX c1 = new CircleX(5);  // valid: radius = 5
            CircleX c2 = new CircleX(-5); // invalid: throws exception
            CircleX c3 = new CircleX(0);  // never reached
        }
        catch (IllegalArgumentException ex) { // catch the thrown exception
            System.out.println(ex);
        }
        System.out.println("Number of objects " + CircleX.getNumberOfObjects());
    }
}
```

**شرح كل سطر:**
1. `throws IllegalArgumentException` → إعلان للمُستدعي أن الدالة قد ترمي هذا الاستثناء.
2. `throw new IllegalArgumentException("Radius cannot be negative");` → رمي الاستثناء يدوياً.
3. `CircleX c2 = new CircleX(-5);` → هذا السطر يُثير الاستثناء — `c3` لن يُنشأ أبداً.

**الناتج المتوقع:**
```
java.lang.IllegalArgumentException: Radius cannot be negative
Number of objects : 1
```

#### نقطة مهمة ⚠️:
> الفرق بين `throw` و`throws`: `throw` تنفيذ (ترمي الاستثناء فعلاً)، `throws` إعلان (تُخبر من يستدعي الدالة).

---

#### 1.8 معلومات الاستثناء (Stack Trace)

**النص الأصلي يقول:** مثال `TestException` — يوضح `printStackTrace()`, `getMessage()`, `toString()`, `getStackTrace()`.

**الشرح المبسّط:**
كائن الاستثناء يحمل معلومات مفيدة عن مصدر الخطأ وسلسلة استدعاء الدوال.

| الدالة | ما تُرجع | متى تستخدمها |
|--------|----------|--------------|
| `getMessage()` | رسالة الخطأ فقط | للعرض للمستخدم |
| `toString()` | اسم الكلاس + الرسالة | للتسجيل |
| `printStackTrace()` | كل سلسلة الاستدعاء | للتشخيص |
| `getStackTrace()` | مصفوفة `StackTraceElement[]` | للمعالجة البرمجية |

#### 💻 الكود: فحص معلومات الاستثناء

**ما هذا الكود؟**
> يوضح الطرق المختلفة للحصول على معلومات الاستثناء من كائن `Exception`.

```java
public class TestException {
    public static void main(String[] args) {
        try {
            System.out.println(sum(new int[]{1, 2, 3, 4, 5})); // call sum with 5 elements
        }
        catch (Exception ex) {
            ex.printStackTrace();                              // print full stack trace
            System.out.println("\n" + ex.getMessage());       // print error message only
            System.out.println("\n" + ex.toString());         // print class name + message
            System.out.println("\nTrace Info Obtained from getStackTrace");
            StackTraceElement[] traceElements = ex.getStackTrace(); // get trace array
            for (int i = 0; i < traceElements.length; i++) { // iterate trace elements
                System.out.print("method " + traceElements[i].getMethodName()); // method name
                System.out.print("(" + traceElements[i].getClassName() + ":"); // class name
                System.out.println(traceElements[i].getLineNumber() + ")");    // line number
            }
        }
    }

    private static int sum(int[] list) {
        int result = 0;
        for (int i = 0; i <= list.length; i++) // BUG: should be < not <=
            result += list[i];                 // throws ArrayIndexOutOfBoundsException at i=5
        return result;
    }
}
```

**شرح كل سطر:**
1. `for (int i = 0; i <= list.length; i++)` → **الخطأ** — `i <= list.length` يجعل `i` يصل لـ `5` وهو خارج النطاق.
2. `ex.printStackTrace()` → أكثر الدوال شمولاً — تطبع سلسلة الاستدعاء كاملة.
3. `StackTraceElement[]` → مصفوفة من كائنات تصف كل إطار في سلسلة الاستدعاء.

**الناتج المتوقع:**
```
java.lang.ArrayIndexOutOfBoundsException: 5
	at TestException.sum(TestException.java:24)
	at TestException.main(TestException.java:4)
5
java.lang.ArrayIndexOutOfBoundsException: 5
Trace Info Obtained from getStackTrace
method sum(TestException:24)
method main(TestException:4)
```

---

### 2. Unit-2: Text I/O (الإدخال والإخراج النصي)

#### 2.1 كلاس File

**النص الأصلي يقول:** "The File class is used to obtain the properties of a file or directory."

**الشرح المبسّط:**
كلاس `java.io.File` لا يقرأ أو يكتب البيانات — بل يُمثّل مسار ملف أو مجلد ويتيح الاستعلام عن خصائصه (الوجود، الحجم، الأذونات...).

**💡 التشبيه:**
> كلاس `File` مثل بطاقة هوية الملف — تُعطيك المعلومات لكنها لا تفتحه.
> **وجه الشبه:** بطاقة الهوية = `File object`، فتح الملف = `Scanner/PrintWriter`.

#### 💻 الكود: TestFileClass

**ما هذا الكود؟**
> يوضح استخدام كلاس `File` للاستعلام عن خصائص ملف موجود.

```java
public class TestFileClass {
    public static void main(String[] args) {
        java.io.File fff = new java.io.File("image/us.gif"); // create File object (doesn't open file)
        System.out.println("Does it exist? " + fff.exists());          // check existence
        System.out.println("The file has " + fff.length() + " bytes"); // file size
        System.out.println("Can it be read? " + fff.canRead());        // read permission
        System.out.println("Can it be written? " + fff.canWrite());    // write permission
        System.out.println("Is it a directory? " + fff.isDirectory()); // is folder?
        System.out.println("Is it a file? " + fff.isFile());           // is file?
        System.out.println("Is it absolute? " + fff.isAbsolute());     // absolute path?
        System.out.println("Is it hidden? " + fff.isHidden());         // hidden file?
        System.out.println("Absolute path" + fff.getAbsolutePath());   // full path
        System.out.println("Last modified on " + new java.util.Date(fff.lastModified())); // last modified date
    }
}
```

**شرح كل سطر:**
1. `new java.io.File("image/us.gif")` → إنشاء كائن `File` — لا يفتح الملف فعلاً.
2. `fff.exists()` → يُرجع `true` إذا كان الملف/المجلد موجوداً.
3. `fff.length()` → حجم الملف بالبايت.
4. `fff.isAbsolute()` → هل المسار مطلق (يبدأ بـ `/` أو حرف قرص)؟

**الناتج المتوقع:**
```
Does it exist? true
The file has 2998 bytes
Can it be read? true
Is it a directory? false
Absolute path is c:\book\image\us.gif
```

**جدول أهم دوال كلاس File:**

| الدالة | النوع | الوصف |
|--------|-------|-------|
| `exists()` | boolean | هل الملف موجود؟ |
| `canRead()` | boolean | هل يمكن القراءة؟ |
| `canWrite()` | boolean | هل يمكن الكتابة؟ |
| `isDirectory()` | boolean | هل هو مجلد؟ |
| `isFile()` | boolean | هل هو ملف؟ |
| `isAbsolute()` | boolean | هل المسار مطلق؟ |
| `isHidden()` | boolean | هل هو مخفي؟ |
| `getAbsolutePath()` | String | المسار الكامل |
| `getName()` | String | اسم الملف فقط |
| `length()` | long | الحجم بالبايت |
| `lastModified()` | long | وقت آخر تعديل (milliseconds) |
| `delete()` | boolean | حذف الملف |
| `mkdir()` | boolean | إنشاء مجلد |
| `listFiles()` | File[] | قائمة محتوى المجلد |

---

#### 2.2 كتابة الملفات النصية (PrintWriter / FileWriter)

**النص الأصلي يقول:** "Text data are read using the Scanner class and written using the PrintWriter class."

**الشرح المبسّط:**
`PrintWriter` يُوفر نفس دوال `System.out` (`print`, `println`, `printf`) لكن للكتابة في ملفات. `FileWriter` أبسط لكن أقل مرونة.

#### 💻 الكود: كتابة ملف نصي بـ PrintWriter

**ما هذا الكود؟**
> يكتب بيانات طلاب في ملف نصي، ويُفحص أولاً هل الملف موجود.

```java
import java.io.*;
public class WriteData {
    public static void main(String[] args) throws IOException { // declare IOException
        java.io.File fff = new java.io.File("scores.txt");      // reference the file
        if (fff.exists()) {                                       // check if exists
            System.out.println("File already exists");           // warn user
            System.exit(1);                                      // exit program
        }
        java.io.PrintWriter ooo = new java.io.PrintWriter(fff); // create writer
        ooo.print("John T Smith ");                              // write name (no newline)
        ooo.println(90);                                         // write score (with newline)
        ooo.print("Eric K Jones ");                              // write name
        ooo.println(85);                                         // write score
        ooo.close();                                             // MUST close to flush data
    }
}
```

**شرح كل سطر:**
1. `throws IOException` → إعلان إلزامي — `PrintWriter` constructors تُثير `IOException`.
2. `System.exit(1)` → إنهاء البرنامج برمز خطأ `1`.
3. `ooo.print(...)` → كتابة بدون سطر جديد.
4. `ooo.println(...)` → كتابة مع سطر جديد.
5. `ooo.close()` → **إلزامي** — بدونه قد لا تُكتب البيانات في الملف (تبقى في الـ buffer).

**الناتج في الملف:**
```
John T Smith 90
Eric K Jones 85
```

---

#### 💻 الكود: FileWriter مع الإضافة (append mode)

**ما هذا الكود؟**
> مثالان لـ `FileWriter` — الأول يُنشئ الملف جديداً، الثاني يُضيف إليه.

```java
import java.io.*;
class WriteTextFile1 {
    public static void main(String[] args) throws IOException {
        String fileName = "data.txt";                // file name
        FileWriter ww = new FileWriter(fileName);    // create: overwrite if exists
        ww.write("AAAAAAAAA");                       // write block 1
        ww.write("BBBBBBBBB");                       // write block 2
        ww.write("CCCCCCCCC");                       // write block 3
        ww.write("DDDDDDDD");                        // write block 4
        ww.close();                                  // close and flush
    }
}

class WriteTextFile2 {
    public static void main(String[] args) {
        String fileName = "data.txt";
        try {
            FileWriter ww = new FileWriter(fileName, true); // append mode = true
            ww.write("EEEEEEEEEEEE");                       // append to existing content
            ww.write("FFFFFFFFFFFF");
            ww.write("GGGGGGGGG");
            ww.write("HHHHHHHHHH");
            ww.close();
        }
        catch (IOException iox) {
            System.out.println("Problem writing " + fileName);
        }
    }
}
```

**شرح الفرق الجوهري:**
- `new FileWriter(fileName)` → **overwrite** — يُنشئ الملف أو يمحو محتواه إذا كان موجوداً.
- `new FileWriter(fileName, true)` → **append** — يُضيف للنهاية دون محو.

| | `FileWriter(file)` | `FileWriter(file, true)` |
|---|---|---|
| إذا الملف موجود | يمحو المحتوى | يُضيف للنهاية |
| إذا الملف غير موجود | ينشئ جديداً | ينشئ جديداً |

---

#### 2.3 قراءة الملفات النصية من الويب

**النص الأصلي يقول:** مثال `ReadFileFromURL` — يقرأ من رابط URL.

**الشرح المبسّط:**
`Scanner` يمكنه قراءة أي `InputStream` — بما في ذلك البيانات المباشرة من الإنترنت عبر `url.openStream()`.

#### 💻 الكود: قراءة ملف من URL

**ما هذا الكود؟**
> يقرأ محتوى ملف نصي من رابط إنترنت ويحسب عدد المحارف.

```java
import java.util.Scanner;
public class ReadFileFromURL {
    public static void main(String[] args) {
        System.out.print("Enter a URL: ");                    // prompt for URL
        String URLString = new Scanner(System.in).next();    // read URL from user
        try {
            java.net.URL url = new java.net.URL(URLString); // create URL object
            int count = 0;                                   // character counter
            Scanner input = new Scanner(url.openStream());  // open network stream
            while (input.hasNext()) {
                String line = input.nextLine();              // read line
                count += line.length();                     // add length to count
            }
            System.out.println("The file size is " + count + " characters");
        }
        catch (java.net.MalformedURLException ex) {         // invalid URL format
            System.out.println("Invalid URL");
        }
        catch (java.io.IOException ex) {                    // network or IO error
            System.out.println("I/O Errors: no such file");
        }
    }
}
```

**شرح كل سطر:**
1. `new java.net.URL(URLString)` → إنشاء كائن URL — يرمي `MalformedURLException` إذا كان الشكل غلط.
2. `url.openStream()` → يفتح اتصال شبكة ويُعيد `InputStream`.
3. `new Scanner(url.openStream())` → يُغلّف الشبكة مثل أي ملف.

**الناتج المتوقع:**
```
Enter a URL: http://liveexample.pearsoncmg.com/data/Lincoln.txt
The file size is 1469 characters
```

---

### 3. Unit-3: Binary I/O (الإدخال والإخراج الثنائي)

#### 3.1 هرم كلاسات Binary I/O

**النص الأصلي يقول:** "The abstract InputStream is the root class for reading binary data, and the abstract OutputStream is the root class for writing binary data."

**الشرح المبسّط:**
على عكس `Text I/O` الذي يُحول البيانات لنصوص مقروءة، `Binary I/O` يتعامل مع البيانات بصيغتها الثنائية الأصلية — أسرع وأكثر دقة للبيانات الرقمية والكائنات.

**💡 التشبيه:**
> `Text I/O` مثل كتابة الأرقام بالكلمات ("خمسة وثمانون")، `Binary I/O` مثل تخزين الرقم مباشرة كـ `01010101`.
> **وجه الشبه:** الكتابة بالكلمات = `Text I/O`، الرمز الثنائي = `Binary I/O`.

#### 📊 المخطط: هرم Binary I/O Classes

**ما هذا المخطط؟**
> يوضح التسلسل الهرمي لكلاسات القراءة والكتابة الثنائية في Java.

**وصف العُقد:**

| # | العُقدة | النوع `kind` | الشرح |
|---|---------|-------------|-------|
| 1 | `Object` | class | الجذر |
| 2 | `InputStream` | abstract class | جذر كلاسات القراءة الثنائية |
| 3 | `OutputStream` | abstract class | جذر كلاسات الكتابة الثنائية |
| 4 | `FileInputStream` | class | قراءة بايتات من ملف |
| 5 | `FilterInputStream` | class | يُغلّف `InputStream` آخر |
| 6 | `ObjectInputStream` | class | قراءة كائنات متسلسلة |
| 7 | `DataInputStream` | class | قراءة أنواع بيانات Java |
| 8 | `BufferedInputStream` | class | قراءة بـ buffer للكفاءة |
| 9 | `FileOutputStream` | class | كتابة بايتات في ملف |
| 10 | `FilterOutputStream` | class | يُغلّف `OutputStream` آخر |
| 11 | `ObjectOutputStream` | class | كتابة كائنات متسلسلة |
| 12 | `DataOutputStream` | class | كتابة أنواع بيانات Java |
| 13 | `BufferedOutputStream` | class | كتابة بـ buffer للكفاءة |

```diagram
type: class
title: Binary I/O Class Hierarchy
direction: TD
nodes:
  - id: obj
    label: Object
    kind: class
    level: 0
  - id: is
    label: InputStream
    kind: class
    level: 1
  - id: os
    label: OutputStream
    kind: class
    level: 1
  - id: fis
    label: FileInputStream
    kind: class
    level: 2
  - id: filtis
    label: FilterInputStream
    kind: class
    level: 2
  - id: ois
    label: ObjectInputStream
    kind: class
    level: 2
  - id: dis
    label: DataInputStream
    kind: class
    level: 3
  - id: bis
    label: BufferedInputStream
    kind: class
    level: 3
  - id: fos
    label: FileOutputStream
    kind: class
    level: 2
  - id: filtos
    label: FilterOutputStream
    kind: class
    level: 2
  - id: oos
    label: ObjectOutputStream
    kind: class
    level: 2
  - id: dos
    label: DataOutputStream
    kind: class
    level: 3
  - id: bos
    label: BufferedOutputStream
    kind: class
    level: 3
edges:
  - from: obj
    to: is
    label: ""
  - from: obj
    to: os
    label: ""
  - from: is
    to: fis
    label: ""
  - from: is
    to: filtis
    label: ""
  - from: is
    to: ois
    label: ""
  - from: filtis
    to: dis
    label: ""
  - from: filtis
    to: bis
    label: ""
  - from: os
    to: fos
    label: ""
  - from: os
    to: filtos
    label: ""
  - from: os
    to: oos
    label: ""
  - from: filtos
    to: dos
    label: ""
  - from: filtos
    to: bos
    label: ""
```

---

#### 3.2 FileInputStream / FileOutputStream

**النص الأصلي يقول:** "FileInputStream/FileOutputStream are for reading/writing bytes from/to files."

**الشرح المبسّط:**
هذان الكلاسان الأساسيان للتعامل مع البايتات مباشرة. `write(int)` يكتب بايتاً واحداً، `read()` يُرجع بايتاً أو `-1` عند نهاية الملف.

#### 💻 الكود: FileInputStream و FileOutputStream

**ما هذا الكود؟**
> يكتب الأرقام 1-10 كبايتات في ملف، ثم يقرأها ويطبعها.

```java
import java.io.*;
public class TestFileStream {
    public static void main(String[] args) throws IOException {
        try (FileOutputStream ott = new FileOutputStream("temp.dat")) { // create output stream
            for (int i = 1; i <= 10; i++)  // write bytes 1 to 10
                ott.write(i);               // each integer written as ONE byte
        }
        try (FileInputStream inn = new FileInputStream("temp.dat")) { // create input stream
            int value;
            while ((value = inn.read()) != -1) // read until end-of-file (-1)
                System.out.print(value + " "); // print each byte value
        }
    }
}
```

**شرح كل سطر:**
1. `try (FileOutputStream ott = ...)` → **try-with-resources** — يُغلق الملف تلقائياً.
2. `ott.write(i)` → يكتب `i` كبايت واحد (0-255 فقط).
3. `inn.read()` → يُرجع البايت التالي كـ `int` (0-255) أو `-1` عند نهاية الملف.
4. `while ((value = inn.read()) != -1)` → نمط قراءة حتى نهاية الملف.

**الناتج المتوقع:**
```
1 2 3 4 5 6 7 8 9 10
```

#### ملاحظة:
> `write(int)` يكتب فقط أدنى 8 بتات — لذا `write(256)` يكتب `0`، وليس الرقم 256 كاملاً. لكتابة أنواع أكبر استخدم `DataOutputStream`.

---

#### 3.3 DataInputStream / DataOutputStream

**النص الأصلي يقول:** "Using a filter class enables you to read integers, doubles, and strings instead of bytes and characters."

**الشرح المبسّط:**
`DataOutputStream` يُغلّف `FileOutputStream` ليُتيح كتابة أنواع Java الكاملة (`int`, `double`, `String`...). كل نوع يُحوَّل لتسلسل ثنائي دقيق. `DataInputStream` يُعيد قراءتها بنفس الترتيب بالضبط.

#### 💻 الكود: DataOutputStream و DataInputStream

**ما هذا الكود؟**
> يكتب أسماء ودرجات بصيغة ثنائية ثم يقرأها.

```java
import java.io.*;
public class TestDataStream {
    public static void main(String[] args) throws IOException {
        // Write: wrap FileOutputStream with DataOutputStream
        DataOutputStream ooo = new DataOutputStream(new FileOutputStream("temp.dat"));
        ooo.writeUTF("John");      // write string in UTF-8 format
        ooo.writeDouble(85.5);     // write 8 bytes for double
        ooo.writeUTF("Jim");
        ooo.writeDouble(185.5);
        ooo.writeUTF("George");
        ooo.writeDouble(105.25);
        ooo.close();               // flush and close

        // Read: must read in SAME ORDER as written
        DataInputStream iii = new DataInputStream(new FileInputStream("temp.dat"));
        System.out.println(iii.readUTF() + " " + iii.readDouble()); // read pair
        System.out.println(iii.readUTF() + " " + iii.readDouble());
        System.out.println(iii.readUTF() + " " + iii.readDouble());
    }
}
```

**شرح كل سطر:**
1. `new DataOutputStream(new FileOutputStream(...))` → **التغليف** — طبقة فوق طبقة.
2. `writeUTF("John")` → يكتب طول النص أولاً ثم محتواه — لا تستخدم `writeChars`.
3. `readUTF()` + `readDouble()` → **الترتيب مُطابق للكتابة** — خطأ في الترتيب = بيانات خاطئة.

**الناتج المتوقع:**
```
John 85.5
Jim 185.5
George 105.25
```

**جدول دوال DataOutputStream / DataInputStream:**

| الكتابة | القراءة | الحجم (بايت) |
|---------|---------|-------------|
| `writeInt(v)` | `readInt()` | 4 |
| `writeDouble(v)` | `readDouble()` | 8 |
| `writeUTF(s)` | `readUTF()` | متغير |
| `writeBoolean(b)` | `readBoolean()` | 1 |
| `writeLong(v)` | `readLong()` | 8 |
| `writeChar(c)` | `readChar()` | 2 |

---

#### 3.4 Buffered Streams (التخزين المؤقت)

**النص الأصلي يقول:** مثال `Write10Ints` يستخدم `BufferedOutputStream`.

**الشرح المبسّط:**
الـ `Buffered` streams تُجمّع البيانات في ذاكرة مؤقتة وتكتبها/تقرأها دفعة واحدة — مما يُقلل عدد عمليات القرص ويُحسّن الأداء بشكل كبير.

#### 💻 الكود: BufferedOutputStream مع DataOutputStream

**ما هذا الكود؟**
> يكتب 10 أعداد صحيحة بصيغة ثنائية مع استخدام الـ buffer.

```java
import java.io.*;
class Write10Ints {
    public static void main(String[] args) throws IOException {
        String fileName = "ints.dat";
        // Three layers: Data -> Buffered -> File
        DataOutputStream out = new DataOutputStream(
            new BufferedOutputStream(
                new FileOutputStream(fileName)));
        for (int j = 1; j <= 10; j++) // write integers 1 to 10
            out.writeInt(j);           // each int = 4 bytes → total = 40 bytes
        System.out.println(out.size()); // print bytes written = 40
        out.close();                    // flush buffer and close
    }
}
```

**شرح كل سطر:**
1. التغليف الثلاثي: `DataOutputStream` → `BufferedOutputStream` → `FileOutputStream`.
2. `out.writeInt(j)` → يكتب 4 بايتات لكل عدد صحيح.
3. `out.size()` → يُرجع `40` (10 × 4 بايتات).
4. `out.close()` → **ضروري** لمسح الـ buffer وضمان كتابة كل البيانات.

#### ⚖️ المقايضة: Buffered vs Unbuffered

| | Buffered | Unbuffered |
|---|---|---|
| المزايا | أسرع بكثير، أقل عمليات قرص | بسيط |
| العيوب | يحتاج `close()` لمسح الـ buffer | بطيء للكميات الكبيرة |
| متى تختاره | دائماً للإنتاج | للبيانات الصغيرة جداً |

---

#### 3.5 قراءة حتى نهاية الملف (EOFException)

**النص الأصلي يقول:** مثال `ReadIntEOF` — يستخدم `EOFException` للإشارة لنهاية الملف.

**الشرح المبسّط:**
بخلاف `InputStream.read()` الذي يُرجع `-1`، تُثير دوال `DataInputStream` (`readInt`, `readDouble`...) استثناء `EOFException` عند نهاية الملف. نُمسك هذا الاستثناء لإيقاف القراءة.

#### 💻 الكود: قراءة ints حتى نهاية الملف

**ما هذا الكود؟**
> يقرأ كل الأعداد الصحيحة من ملف ثنائي ويجمع مجموعها، مستخدماً `EOFException` كإشارة توقف.

```java
import java.io.*;
class ReadIntEOF {
    public static void main(String[] args) {
        String fileName = "ints.dat";
        long sum = 0;
        try {
            DataInputStream instr = new DataInputStream(
                new BufferedInputStream(
                    new FileInputStream(fileName))); // open file with buffering
            try {
                while (true)              // read forever until exception
                    sum += instr.readInt(); // add each int to sum
            }
            catch (EOFException eof) {   // end of file reached
                System.out.println("The sum is: " + sum);
                instr.close();
            }
            catch (IOException iox) {    // other IO errors
                System.out.println("Problems reading " + fileName);
                instr.close();
            }
        }
        catch (IOException iox) {        // file not found
            System.out.println("IO Problems with " + fileName);
        }
    }
}
```

**الناتج المتوقع:**
```
The sum is: 55
```
(مجموع 1+2+...+10 = 55)

#### نقطة مهمة ⚠️:
> `EOFException` يُستخدم فقط مع `DataInputStream` — مع `FileInputStream` العادية، استخدم `read() == -1`.

---

#### 3.6 Object I/O (ObjectInputStream / ObjectOutputStream)

**النص الأصلي يقول:** "ObjectInputStream/ObjectOutputStream classes can be used to read/write serializable objects (implement Serializable interface)."

**الشرح المبسّط:**
`Object I/O` يتيح حفظ كائنات Java كاملة في ملفات (تسمى `Serialization`). الكلاس يجب أن يُنفّذ واجهة `Serializable`. هذا يشمل كل خصائص الكائن تلقائياً.

**💡 التشبيه:**
> `Serialization` مثل "تجميد" الكائن وحفظه — يمكنك "إذابته" لاحقاً واستعادته بنفس الحالة.
> **وجه الشبه:** التجميد = `writeObject()`، الإذابة = `readObject()`.

#### 💻 الكود: Object I/O مع Date

**ما هذا الكود؟**
> يكتب نص وعدد عشري وكائن `Date` في ملف، ثم يقرأهم ويطبعهم.

```java
import java.io.*;
public class TestObjectInputStream {
    public static void main(String[] args) throws ClassNotFoundException, IOException {
        // Writing objects
        ObjectOutputStream ooo = new ObjectOutputStream(
            new FileOutputStream("object.dat")); // wrap file with object stream
        ooo.writeUTF("John");                    // write string (not an object)
        ooo.writeDouble(85.5);                   // write primitive double
        ooo.writeObject(new java.util.Date());   // write Date object (Serializable)
        ooo.close();

        // Reading objects (must read in same order)
        ObjectInputStream iii = new ObjectInputStream(
            new FileInputStream("object.dat"));
        String name = iii.readUTF();                             // read string
        double score = iii.readDouble();                         // read double
        java.util.Date date = (java.util.Date)(iii.readObject()); // cast required
        System.out.println(name + " " + score + " " + date);
        iii.close();
    }
}
```

**شرح كل سطر:**
1. `writeObject(new java.util.Date())` → يُسلسل الكائن كاملاً مع كل خصائصه.
2. `throws ClassNotFoundException` → إلزامي مع `readObject()` — قد لا يجد كلاس الكائن.
3. `(java.util.Date)(iii.readObject())` → `readObject()` يُرجع `Object` — تحويل صريح ضروري.

**الناتج المتوقع:**
```
John 85.5 Sun Nov 18 17:55:44 EET 2018
```

---

#### 💻 الكود: كتابة وقراءة مصفوفات كاملة

**ما هذا الكود؟**
> يكتب مصفوفة `int[]` ومصفوفة `String[]` كاملتين كـ objects.

```java
public class TestObjectStreamForArray {
    public static void main(String[] args) throws ClassNotFoundException, IOException {
        int[] n = {1, 2, 3, 4, 5};             // integer array
        String[] s = {"John", "Susan", "Kim"}; // string array

        try (ObjectOutputStream ooo = new ObjectOutputStream(
                new FileOutputStream("array.dat", true))) { // append mode
            ooo.writeObject(n); // write entire int array as one object
            ooo.writeObject(s); // write entire String array as one object
        }

        try (ObjectInputStream iii = new ObjectInputStream(
                new FileInputStream("array.dat"))) {
            int[] newNumbers = (int[])(iii.readObject());       // cast to int[]
            String[] newStrings = (String[])(iii.readObject()); // cast to String[]
            for (int i = 0; i < newNumbers.length; i++)
                System.out.print(newNumbers[i] + " ");
            System.out.println();
            for (int i = 0; i < newStrings.length; i++)
                System.out.print(newStrings[i] + " ");
        }
    }
}
```

**الناتج المتوقع:**
```
1 2 3 4 5
John Susan Kim
```

---

#### 3.7 RandomAccessFile (الوصول العشوائي للملفات)

**النص الأصلي يقول:** "Java provides the RandomAccessFile class to allow data to be read from and written to at any locations in the file."

**الشرح المبسّط:**
على عكس `Sequential` streams التي تقرأ بالترتيب فقط، `RandomAccessFile` يُتيح القفز لأي موقع بالبايت. كل `int` = 4 بايتات، فالعدد رقم `n` (من الصفر) يبدأ عند الموقع `n * 4`.

**💡 التشبيه:**
> `RandomAccessFile` مثل DVD — يمكنك القفز لأي مشهد مباشرة.
> `Sequential streams` مثل شريط كاسيت — يجب الاستماع للترتيب.

#### 💻 الكود: RandomAccessFile

**ما هذا الكود؟**
> يكتب 200 عدد، ثم يقرأ ويُعدّل أعداداً في مواقع محددة.

```java
import java.io.*;
public class TestRandomAccessFile {
    public static void main(String[] args) throws IOException {
        try (RandomAccessFile inout = new RandomAccessFile("inout.dat", "rw")) { // read-write mode
            inout.setLength(0);               // clear file content
            for (int i = 0; i < 200; i++)    // write integers 0 to 199
                inout.writeInt(i);
            System.out.println("Current file length is " + inout.length()); // 800 bytes

            inout.seek(0);       // go to byte 0 (first int)
            System.out.println("The first number is " + inout.readInt());  // reads int at position 0

            inout.seek(1 * 4);   // go to byte 4 (second int)
            System.out.println("The second number is " + inout.readInt()); // reads 1

            inout.seek(9 * 4);   // go to byte 36 (10th int)
            System.out.println("The tenth number is " + inout.readInt());  // reads 9

            inout.writeInt(555); // write 555 at current position (byte 40 = 11th int)

            inout.seek(inout.length()); // go to end of file
            inout.writeInt(999);        // append 999

            System.out.println("The new length is " + inout.length()); // 804 bytes

            inout.seek(10 * 4); // go to 11th int (byte 40)
            System.out.println("The eleventh number is " + inout.readInt()); // 555
        }
    }
}
```

**شرح كل سطر:**
1. `"rw"` → وضع القراءة/الكتابة — يمكن أيضاً `"r"` للقراءة فقط.
2. `setLength(0)` → مسح الملف — يُعيد حجمه لصفر.
3. `seek(n * 4)` → القفز لموقع العدد رقم `n` (كل `int` = 4 بايتات).
4. `inout.length()` → الحجم الحالي بالبايتات (200 × 4 = 800، ثم 801 × 4 = 804).

**الناتج المتوقع:**
```
Current file length is 800
The first number is 0
The second number is 1
The tenth number is 9
The new length is 804
The eleventh number is 555
```

#### 🔍 تتبع التنفيذ: RandomAccessFile seek

**المدخل:** ملف يحتوي الأعداد 0..9 (10 ints = 40 بايت)

| الخطوة | العملية | الموقع (byte) | القيمة المقروءة |
|--------|---------|---------------|----------------|
| 1 | `seek(0)` ثم `readInt()` | 0 | 0 |
| 2 | `seek(1*4)` ثم `readInt()` | 4 | 1 |
| 3 | `seek(9*4)` ثم `readInt()` | 36 | 9 |
| 4 | `writeInt(555)` | 40 | — (كتابة) |
| 5 | `seek(10*4)` ثم `readInt()` | 40 | 555 |

**النتيجة:** تم تعديل العدد في الموقع العاشر (index 10) من `10` إلى `555`.

**مثال من الامتحان:**
```
If a RandomAccessFile contains 50 integers, what byte position does the 20th integer start at?
a) 20
b) 76
c) 80
d) 19
```
**الإجابة: b** — التعليل: (20-1) × 4 = 76 (العدد رقم 20 يبدأ من الصفر بـ index 19).

---

### 4. Unit-4: Regular Expressions (التعبيرات المنتظمة)

#### 4.1 مفهوم التعبيرات المنتظمة

**النص الأصلي يقول:** "A regular expression (regex) is a string that describes a pattern for matching a set of strings."

**الشرح المبسّط:**
`Regex` هي "قالب" نصي تُعرّف فيه شكل السلاسل التي تُريد مطابقتها. تُستخدم للتحقق من المدخلات، البحث، والاستبدال.

**💡 التشبيه:**
> `Regex` مثل قالب الكعك — تُحدد الشكل والمواصفات، والكعكة التي تطابق القالب "تُقبل".
> **وجه الشبه:** القالب = `regex pattern`، الكعكة = `string`.

**جدول رموز Regex الأساسية:**

| الرمز | المعنى | مثال |
|-------|--------|------|
| `.` | أي حرف واحد | `c.t` تطابق `cat`, `cot`, `c9t` |
| `\d` | رقم `[0-9]` | `\d\d\d` = 3 أرقام |
| `\D` | غير رقم | |
| `\s` | مسافة (space, tab...) | |
| `\S` | غير مسافة | |
| `\w` | حرف نصي `[a-zA-Z0-9_]` | |
| `\W` | غير حرف نصي | |
| `[abc]` | a أو b أو c | |
| `[^abc]` | أي حرف ما عدا a,b,c | |
| `[a-z]` | أي حرف صغير | |
| `[A-Z]` | أي حرف كبير | |
| `[0-9]` | أي رقم | |
| `?` | مرة أو لا شيء | `colou?r` = `color` أو `colour` |
| `*` | صفر أو أكثر | `ab*c` = `ac`, `abc`, `abbc`... |
| `+` | مرة أو أكثر | `ab+c` = `abc`, `abbc`... (ليس `ac`) |
| `{n}` | بالضبط n مرة | `\d{3}` = 3 أرقام بالضبط |
| `{n,}` | n أو أكثر | `\d{2,}` = رقمان أو أكثر |
| `{n,m}` | من n إلى m مرة | `\d{2,4}` = 2 إلى 4 أرقام |
| `\|` | أو | `cat\|dog` |
| `()` | تجميع | `(abc)+` |

**جداول أمثلة المطابقة:**

| Regex | يطابق | لا يطابق |
|-------|--------|----------|
| `c.t` | `cat`, `cot`, `c9t` | `#at`, `Car` |
| `\d\d\d-\d\d-\d\d\d\d` | `875-67-1111` | `66-777-4532` |
| `\D\d-\D\d` | `w4-r3` | `86-09` |
| `a(bc)+de` | `abcde`, `abcbcde` | `ade` |
| `a(bc)?de` | `ade`, `abcde` | `abcbcde` |
| `[a-m]*` | `imbecile` | `above` |
| `[a-z]{4,6}` | `spider`, `tiger` | `cow` |

---

#### 4.2 استخدام Regex في Java: Pattern و Matcher

**النص الأصلي يقول:** مثال `RegTest2` يستخدم `Pattern.compile()` و`Matcher.find()`.

**الشرح المبسّط:**
`Pattern` يُمثل نمط الـ regex المُجمَّع. `Matcher` يُطبّق النمط على نص معين ويسمح بالبحث المتكرر.

```algorithm
1 | تعريف النمط | String r = "..." | كتابة الـ regex كنص
2 | تجميع النمط | Pattern p = Pattern.compile(r) | تحويله لكائن Pattern قابل للاستخدام
3 | إنشاء المُطابق | Matcher m = p.matcher(text) | ربط النمط بالنص
4 | البحث | m.find() | يجد أول/التالي تطابق
5 | الحصول على الموقع | m.start() | موقع بداية التطابق
```

#### 💻 الكود: Pattern و Matcher

**ما هذا الكود؟**
> يقرأ ملف نصياً ويبحث عن كل ظهور لنمط regex معين.

```java
import java.io.*;
import java.util.*;
import java.util.regex.*;
public class RegTest2 {
    public static void main(String args[]) throws Exception {
        BufferedReader in = new BufferedReader(new FileReader("alice30.txt")); // open file
        String line = in.readLine();   // read first line
        String s = "";
        while (s != null) {           // read all lines
            s = in.readLine();
            line = line + s;          // concatenate all into one string
        }
        String r = "this";            // regex pattern (or try "[a-z]+ ")
        Pattern p = Pattern.compile(r); // compile pattern
        Matcher m = p.matcher(line);    // create matcher
        while (m.find()) {              // find all matches
            System.out.println("MATCH:" + m.start()); // print position
        }
        in.close();
    }
}
```

**شرح كل سطر:**
1. `Pattern.compile(r)` → يُجمّع النمط مرة واحدة — أسرع من إنشاء `Pattern` في كل مرة.
2. `p.matcher(line)` → يُنشئ `Matcher` للنص المحدد.
3. `m.find()` → يبحث عن التطابق التالي — يُرجع `true` إذا وُجد.
4. `m.start()` → موقع بداية التطابق في النص.

---

#### 4.3 تقسيم النصوص: StringTokenizer و split و Pattern

**النص الأصلي يقول:** مثال `StringTokenizerDemo` — يُقارن 3 طرق لتقسيم النص.

**الشرح المبسّط:**
يمكن تقسيم النص على كلمات/أجزاء بثلاث طرق: `StringTokenizer` (قديم)، `String.split()` (حديث وسهل)، أو `Pattern.split()` (مرن مع تحديد عدد الأجزاء).

#### 💻 الكود: مقارنة طرق تقسيم النصوص

**ما هذا الكود؟**
> يُقارن `StringTokenizer`، `split()`، و`Pattern.split()` لتقسيم نفس الجملة.

```java
import java.util.*;
import java.util.regex.*;
class StringTokenizerDemo {
    public static void main(String args[]) {
        int i = 1;
        String str = "Never look down on anybody unless you're helping him up";

        // Method 1: StringTokenizer (old way)
        System.out.println("Splitting String Using StringTokenizer class");
        StringTokenizer tr = new StringTokenizer(str, " "); // split by space
        while (tr.hasMoreTokens()) {                        // has more tokens?
            System.out.print(" Token " + i + " : ");
            System.out.println(tr.nextToken());             // get next token
            ++i;
        }

        // Method 2: String.split()
        System.out.println("Splitting String Using split() method");
        String[] tk = str.split(" ");      // split by space, returns all tokens
        for (String tokens : tk)
            System.out.println(tokens);

        // Method 3: Pattern.split() with limit
        System.out.println("Splitting String Using Pattern class");
        Pattern p = Pattern.compile(" ");  // space pattern
        tk = p.split(str, 3);             // split into max 3 parts
        for (String tokens : tk)
            System.out.println(tokens);
    }
}
```

**الناتج المتوقع:**
```
Token 1 : Never
Token 2 : look
...
Token 10 : up

Never
look
...
up

Never
look
down on anybody unless you're helping him up
```

| الطريقة | المزايا | العيوب |
|---------|---------|--------|
| `StringTokenizer` | بسيطة | قديمة، محدودة |
| `String.split()` | سهلة، تدعم regex | تُعيد كل الأجزاء دائماً |
| `Pattern.split(str, n)` | تحديد عدد الأجزاء | تحتاج `import java.util.regex.*` |

---

### 5. Enumerated Types (الأنواع المُعدَّدة)

#### 5.1 مفهوم enum

**النص الأصلي يقول:** مثال `EnumeratedTypeDemo` يُعرّف `enum Day` بأيام الأسبوع.

**الشرح المبسّط:**
`enum` يُتيح تعريف نوع بيانات بمجموعة ثابتة من القيم المُسمّاة. أكثر أمانًا من استخدام أعداد أو ثوابت `static final` — المُترجم يتحقق من القيم.

**💡 التشبيه:**
> `enum` مثل قائمة خيارات محددة في قائمة طعام — لا تستطيع اختيار شيء خارجها.
> **وجه الشبه:** قائمة الطعام = `enum`، الأطباق = الثوابت.

#### 💻 الكود: enum أساسي

**ما هذا الكود؟**
> يُعرّف `enum Day` ويوضح دواله الأساسية: `name()`, `ordinal()`, `compareTo()`, `toString()`.

```java
public class EnumeratedTypeDemo {
    static enum Day { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY };

    public static void main(String[] args) {
        Day day1 = Day.FRIDAY;   // assign enum value
        Day day2 = Day.THURSDAY;
        System.out.println(day1.name());         // "FRIDAY"
        System.out.println(day2.name());         // "THURSDAY"
        System.out.println(day1.ordinal());      // 5 (zero-based position)
        System.out.println(day2.ordinal());      // 4
        System.out.println(day1.equals(day2));   // false
        System.out.println(day1.toString());     // "FRIDAY"
        System.out.println(day1.compareTo(day2)); // positive (FRIDAY > THURSDAY)
    }
}
```

**الناتج المتوقع:**
```
FRIDAY
THURSDAY
5
4
false
FRIDAY
1
```

**جدول دوال enum:**

| الدالة | ما تُرجع | مثال |
|--------|---------|------|
| `name()` | اسم الثابت كـ String | `"FRIDAY"` |
| `ordinal()` | ترتيب الثابت (من الصفر) | `5` |
| `toString()` | نفس `name()` | `"FRIDAY"` |
| `equals(other)` | هل نفس القيمة؟ | `true/false` |
| `compareTo(other)` | الفرق في الترتيب | `1`, `0`, `-1` |
| `values()` | مصفوفة بكل القيم | `Day[]` |
| `valueOf("name")` | ثابت من اسمه | `Day.FRIDAY` |

---

#### 💻 الكود: enum في switch و values()

**ما هذا الكود؟**
> يُظهر استخدام `enum` في `switch` وطباعة كل القيم بـ `values()`.

```java
class EnumDemo1 {
    enum Apple { Jonathan, GoldenDel, RedDel, Winesap, Cortland }

    public static void main(String args[]) {
        Apple ap;
        ap = Apple.RedDel;
        System.out.println("Value of ap: " + ap); // uses toString()

        ap = Apple.GoldenDel;
        if (ap == Apple.GoldenDel)                // enum supports == comparison
            System.out.println("ap contains GoldenDel.");

        switch (ap) {                              // enum in switch
            case Jonathan: System.out.println("Jonathan is red."); break;
            case GoldenDel: System.out.println("Golden Delicious is yellow."); break;
            case RedDel: System.out.println("Red Delicious is red."); break;
            case Winesap: System.out.println("Winesap is red."); break;
            case Cortland: System.out.println("Cortland is red."); break;
        }
    }
}
```

**الناتج المتوقع:**
```
Value of ap: RedDel
ap contains GoldenDel.
Golden Delicious is yellow.
```

---

#### 💻 الكود: enum مع values() و valueOf()

**ما هذا الكود؟**
> يطبع كل قيم `Apple enum` بـ `values()` ويبحث بالاسم بـ `valueOf()`.

```java
enum Apple { Jonathan, GoldenDel, RedDel, Winesap, Cortland }
class EnumDemo2 {
    public static void main(String args[]) {
        Apple ap;
        System.out.println("Here are all Apple constants:");
        Apple allapples[] = Apple.values(); // get all enum values as array
        for (Apple a : allapples)
            System.out.println(a);          // prints each constant name

        ap = Apple.valueOf("Winesap");      // get enum by name string
        System.out.println("ap contains " + ap);
    }
}
```

**الناتج المتوقع:**
```
Here are all Apple constants:
Jonathan
GoldenDel
RedDel
Winesap
Cortland
ap contains Winesap
```

---

#### 💻 الكود: enum مع بانٍ وخصائص (Constructor + Fields)

**النص الأصلي يقول:** مثال `AppleE` — كل ثابت لديه سعر.

**الشرح المبسّط:**
يمكن إضافة خصائص (fields) وبانٍ (constructor) ودوال لـ `enum`. البانٍ يُستدعى تلقائياً عند تعريف كل ثابت.

```java
enum AppleE {
    Jonathan(10), GoldenDel(9), RedDel(12), Winesap(15), Cortland(8); // each with price

    private int price;                   // field
    AppleE(int p) { price = p; }         // constructor (always private)
    int getPrice() { return price; }     // method
}

class EnumDemo3 {
    public static void main(String args[]) {
        AppleE ap;
        System.out.println("Winesap costs " + AppleE.Winesap.getPrice() + " cents.\n");

        System.out.println("All apple prices:");
        for (AppleE a : AppleE.values()) // iterate all values
            System.out.println(a + " costs " + a.getPrice() + " cents.");
    }
}
```

**الناتج المتوقع:**
```
Winesap costs 15 cents.
All apple prices:
Jonathan costs 10 cents.
GoldenDel costs 9 cents.
RedDel costs 12 cents.
Winesap costs 15 cents.
Cortland costs 8 cents.
```

#### نقطة مهمة ⚠️:
> بانٍ `enum` دائماً `private` أو package-private — لا يمكن إنشاء كائنات `enum` يدوياً من خارجه.

**🤔 تفعيل الفهم:**
> **سؤال:** لماذا `enum` أفضل من `static final int` لتعريف الأيام أو الألوان؟
> **لماذا هذا مهم؟** لأن المُترجم يتحقق من القيم — لا يمكن تمرير رقم خاطئ غير معرّف في الـ enum.

---

## الجزء الثاني: ملخص منظم

### جدول تعريفات المصطلحات الرئيسية

| المصطلح | التعريف | مثال |
|---------|---------|------|
| `Exception` | كائن يُمثّل خطأ وقت التشغيل | `ArithmeticException` |
| `try` | يحتوي الكود المحتمل خطؤه | `try { a[i] = ... }` |
| `catch` | يُمسك ويُعالج الاستثناء | `catch (IOException e)` |
| `finally` | ينفذ دائماً بغض النظر عن الاستثناء | تنظيف الموارد |
| `throw` | رمي استثناء يدوياً | `throw new IllegalArgumentException(...)` |
| `throws` | إعلان في رأس الدالة | `void m() throws IOException` |
| `Checked Exception` | يجب معالجته أو إعلانه | `IOException` |
| `Unchecked Exception` | اختياري معالجته | `RuntimeException` |
| `File` | كلاس لتمثيل مسار ملف | `new File("data.txt")` |
| `PrintWriter` | كتابة نص في ملف | `ooo.println(90)` |
| `FileWriter` | كتابة محارف في ملف | `ww.write("Hello")` |
| `Binary I/O` | قراءة/كتابة بايتات خام | `FileInputStream` |
| `Serialization` | تحويل كائن لبايتات | `writeObject(obj)` |
| `Serializable` | واجهة تُمكّن التسلسل | `implements Serializable` |
| `RandomAccessFile` | وصول عشوائي لأي موقع | `seek(n*4)` |
| `Regex` | نمط لمطابقة نصوص | `\d{3}-\d{2}-\d{4}` |
| `Pattern` | كلاس Regex مُجمَّع | `Pattern.compile(r)` |
| `Matcher` | تطبيق النمط على نص | `m.find()` |
| `enum` | نوع بقيم ثابتة مُسمّاة | `enum Color {RED, GREEN}` |

---

### جدول مقارنة أنواع I/O

| النوع | الكلاس الأساسي | يقرأ/يكتب | مثال |
|-------|--------------|-----------|------|
| Text Input | `Scanner` | نصوص/أرقام | `sc.nextInt()` |
| Text Output | `PrintWriter` | نصوص | `pw.println("Hi")` |
| Binary Input | `FileInputStream` | بايتات | `fis.read()` |
| Binary Output | `FileOutputStream` | بايتات | `fos.write(b)` |
| Typed Binary In | `DataInputStream` | أنواع Java | `dis.readInt()` |
| Typed Binary Out | `DataOutputStream` | أنواع Java | `dos.writeDouble(x)` |
| Object In | `ObjectInputStream` | كائنات | `ois.readObject()` |
| Object Out | `ObjectOutputStream` | كائنات | `oos.writeObject(o)` |
| Random Access | `RandomAccessFile` | بايتات في أي موقع | `raf.seek(pos)` |

---

### جدول الأخطاء الشائعة

| الخطأ | السبب | الحل |
|-------|-------|------|
| `ClassCastException` في `readObject()` | نسيان التحويل الصريح | `(Date)ois.readObject()` |
| قراءة بيانات خاطئة من `DataInputStream` | خلل في ترتيب القراءة | الترتيب يجب أن يطابق الكتابة بالضبط |
| حلقة لا نهائية في `InputMismatchException` | نسيان `nextLine()` في catch | أضف `scanner.nextLine()` |
| ملف فارغ رغم الكتابة | نسيان `close()` | أضف `writer.close()` أو استخدم try-with-resources |
| `NullPointerException` في `readUTF()` | أنهى الملف قبل الإنهاء الصحيح | استخدم `EOFException` للتوقف |
| ترتيب `catch` خاطئ | الأب قبل الابن | الأكثر تحديداً أولاً |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: استخدام try-catch-finally

**ما هدف هذه العملية؟**
> التعامل مع الأخطاء وقت التشغيل بشكل منظم مع ضمان تنظيف الموارد.

```algorithm
1 | وضع الكود الحساس | try block | أي عملية قد تفشل
2 | تحديد الاستثناء | catch(Type ex) | النوع المحدد أولاً، الأعم أخيراً
3 | معالجة الخطأ | catch body | رسالة للمستخدم أو بديل
4 | تنظيف الموارد | finally block | إغلاق ملفات، تحرير اتصالات
```

#### ⚙️ الخطوات / الخوارزمية: رمي استثناء مخصص

```algorithm
1 | إعلان الاستثناء | throws ExceptionType | في رأس الدالة
2 | التحقق من الشرط | if (condition) | فحص صحة المدخلات
3 | رمي الاستثناء | throw new ExceptionType("msg") | عند الفشل
4 | المعالجة | catch في المُستدعي | يُمسك الاستثناء
```

#### ⚙️ الخطوات / الخوارزمية: كتابة ملف ثنائي

```algorithm
1 | إنشاء FileOutputStream | new FileOutputStream("file.dat") | فتح الملف
2 | تغليف بـ DataOutputStream | new DataOutputStream(fos) | لكتابة أنواع Java
3 | كتابة البيانات | writeInt/writeDouble/writeUTF | حسب النوع
4 | إغلاق الملف | out.close() | لمسح الـ buffer وحفظ البيانات
```

#### ⚙️ الخطوات / الخوارزمية: استخدام Random Access File

```algorithm
1 | فتح الملف | new RandomAccessFile("file","rw") | وضع القراءة-الكتابة
2 | حساب الموقع | index * bytes_per_record | لكل int: index × 4
3 | الانتقال | seek(position) | القفز للبايت المحدد
4 | القراءة/الكتابة | readInt() / writeInt(v) | عملية البيانات
5 | الإغلاق | close() | إنهاء الاستخدام
```

#### ⚙️ الخطوات / الخوارزمية: استخدام Regex مع Pattern/Matcher

```algorithm
1 | تعريف النمط | String r = "regex" | نص الـ regex
2 | تجميع النمط | Pattern p = Pattern.compile(r) | مرة واحدة
3 | إنشاء المُطابق | Matcher m = p.matcher(text) | لكل نص
4 | البحث | m.find() | حلقة للبحث عن كل التطابقات
5 | استخراج النتيجة | m.start() / m.group() | موقع ومحتوى التطابق
```

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
Which exception is thrown when reading a non-integer value using `Scanner.nextInt()`?

أ) `IllegalArgumentException`  ب) `InputMismatchException`  ج) `NumberFormatException`  د) `ArithmeticException`

**الإجابة الصحيحة: ب** — **التعليل:** `Scanner.nextInt()` يُثير `InputMismatchException` عندما لا تتطابق البيانات المدخلة مع النوع المطلوب. `NumberFormatException` تُثيرها `Integer.parseInt()`.

---

### السؤال 2 (متوسط)
What is the correct order of catch blocks when handling both `IOException` and `Exception`?

أ) `Exception` then `IOException`  ب) `IOException` then `Exception`  ج) Any order works  د) They cannot be combined

**الإجابة الصحيحة: ب** — **التعليل:** الـ subclass يجب أن يأتي قبل الـ superclass. إذا وضعت `Exception` أولاً، فلن يُطابَق أي catch بعده أبداً — المُترجم يُعطي خطأ.

---

### السؤال 3 (صعب)
Consider: `DataOutputStream out = new DataOutputStream(new BufferedOutputStream(new FileOutputStream("f.dat")))`. What happens if `out.close()` is not called?

أ) An exception is thrown  ب) The file may not contain all written data  ج) The file is deleted  د) No effect, data is always written immediately

**الإجابة الصحيحة: ب** — **التعليل:** `BufferedOutputStream` يحتفظ بالبيانات في ذاكرة مؤقتة (buffer). `close()` هي التي تُجبره على "مسح" الـ buffer للقرص.

---

### السؤال 4 (متوسط)
What does `inout.seek(5 * 4)` do in a `RandomAccessFile` containing integers?

أ) Reads the 5th integer  ب) Moves pointer to the 6th integer's start position  ج) Deletes the 5th integer  د) Returns the value at position 20

**الإجابة الصحيحة: ب** — **التعليل:** `5 * 4 = 20` بايت. الـ integers مرقّمة من الصفر، لذا index 0 عند byte 0، index 5 عند byte 20 — وهو العدد السادس.

---

### السؤال 5 (صعب)
Which of the following correctly reads an object stored with `ObjectOutputStream`?

أ) `String s = (String) ois.readObject();` فقط إذا كان `String`  ب) `Object o = ois.readObject();` دائماً  ج) `ois.readString();`  د) `Serializable o = ois.read();`

**الإجابة الصحيحة: أ** — **التعليل:** `readObject()` يُرجع `Object` — التحويل الصريح مطلوب. الطريقة أ صحيحة، ب صحيحة تقنياً لكن بدون Cast لن تستطيع استخدام الكائن بشكل مفيد.

---

### السؤال 6 (متوسط)
What is the difference between `new FileWriter("f.txt")` and `new FileWriter("f.txt", true)`?

أ) The second creates a new file  ب) The second appends to existing content  ج) The first appends, the second overwrites  د) No difference

**الإجابة الصحيحة: ب** — **التعليل:** المعامل الثاني `append=true` يجعل الكتابة تُضاف لنهاية الملف بدل محو محتواه.

---

### السؤال 7 (متوسط)
Which regex matches "cat", "cot", "cut" but NOT "coat"?

أ) `c.t`  ب) `c..t`  ج) `c[aeiou]t`  د) `c[^aeiou]t`

**الإجابة الصحيحة: أ** — **التعليل:** `.` يطابق أي حرف واحد — `c.t` = c + أي حرف + t. "coat" = 4 حروف لا تطابق نمط 3 حروف.

---

### السؤال 8 (صعب)
What is the output of `Day.FRIDAY.ordinal()` if `enum Day { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY }`?

أ) 5  ب) 6  ج) 4  د) 7

**الإجابة الصحيحة: أ** — **التعليل:** الترقيم من الصفر: SUNDAY=0, MONDAY=1, ..., FRIDAY=5.

---

### السؤال 9 (صعب)
In `TestFileStream`, why does `ott.write(256)` actually store 0 in the file?

أ) FileOutputStream doesn't support values > 255  ب) write() stores only the lowest 8 bits of its argument  ج) An exception is thrown for values > 255  د) The file becomes corrupted

**الإجابة الصحيحة: ب** — **التعليل:** `write(int b)` يحتفظ فقط بـ 8 bits السفلية. 256 = 0x100، و8 bits السفلية = 0x00 = 0.

---

### السؤال 10 (متوسط)
When is `EOFException` thrown by `DataInputStream`?

أ) When the file doesn't exist  ب) When reading past the end of file  ج) When the data type doesn't match  د) When the file is empty

**الإجابة الصحيحة: ب** — **التعليل:** `readInt()`, `readDouble()` وغيرها تُثير `EOFException` عند محاولة القراءة بعد نهاية الملف.

---

### السؤال 11 (صعب)
What does `Pattern.split(str, 3)` return for `str = "a b c d e"`?

أ) `["a", "b", "c d e"]`  ب) `["a", "b", "c", "d", "e"]`  ج) `["a b c", "d", "e"]`  د) `["a", "b c d e"]`

**الإجابة الصحيحة: أ** — **التعليل:** العدد `3` يُحدد الحد الأقصى للأجزاء — يُقسّم إلى 3 أجزاء: "a"، "b"، والباقي "c d e".

---

### السؤال 12 (متوسط)
Which class is needed to serialize a custom object?

أ) `Externalizable` only  ب) `Serializable`  ج) `Cloneable`  د) No interface needed

**الإجابة الصحيحة: ب** — **التعليل:** الكلاس يجب أن يُنفّذ `Serializable` ليتمكن `ObjectOutputStream` من تسلسله.

---

### السؤال 13 (صعب)
A file contains 50 integers written with `DataOutputStream.writeInt()`. What is the byte offset of the 15th integer?

أ) 56  ب) 60  ج) 14  د) 15

**الإجابة الصحيحة: أ** — **التعليل:** كل `int` = 4 بايتات. العدد رقم 15 (index 14 من الصفر) = 14 × 4 = 56.

---

### السؤال 14 (متوسط)
What does `finally` block execute after?

أ) After try block only if no exception  ب) After catch block only  ج) After try and/or catch, always  د) Only when System.exit() is not called

**الإجابة الصحيحة: ج** — **التعليل:** `finally` ينفذ دائماً — سواء أُثير استثناء أم لا، سواء نفّذ `catch` أم لا (الاستثناء: `System.exit()`).

---

### السؤال 15 (صعب)
What happens if you write an object that does NOT implement `Serializable` with `ObjectOutputStream`?

أ) It writes an empty object  ب) `NotSerializableException` is thrown  ج) Compilation error  د) The object is serialized as null

**الإجابة الصحيحة: ب** — **التعليل:** `NotSerializableException` (وهي `RuntimeException`) تُثار وقت التشغيل.

---

### السؤال 16 (متوسط)
Which method of `File` class returns the size of a file in bytes?

أ) `size()`  ب) `getSize()`  ج) `length()`  د) `capacity()`

**الإجابة الصحيحة: ج** — **التعليل:** `length()` هي الدالة الصحيحة في `java.io.File` — تُرجع `long`.

---

### السؤال 17 (صعب)
What is the regex for a U.S. Social Security Number format `ddd-dd-dddd`?

أ) `\d\d\d-\d\d-\d\d\d\d`  ب) `[0-9]{3}-[0-9]{2}-[0-9]{4}`  ج) `\d{3}-\d{2}-\d{4}`  د) All of the above

**الإجابة الصحيحة: د** — **التعليل:** الثلاث صيغ تُطابق نفس النمط — `\d` = `[0-9]`، و`\d\d\d` = `\d{3}`.

---

### السؤال 18 (متوسط)
Which `enum` method returns all constants as an array?

أ) `getValues()`  ب) `values()`  ج) `toArray()`  د) `constants()`

**الإجابة الصحيحة: ب** — **التعليل:** `EnumType.values()` يُرجع مصفوفة `EnumType[]` تحتوي كل الثوابت بترتيبها.

---

### السؤال 19 (صعب)
In `RegTest2`, what does changing `String r = "this"` to `String r = "[a-z]+ "` do?

أ) Matches only the word "this"  ب) Matches any sequence of lowercase letters followed by a space  ج) Matches any lowercase letter  د) Causes a compilation error

**الإجابة الصحيحة: ب** — **التعليل:** `[a-z]+` = سلسلة من حرف صغير أو أكثر، المسافة في النهاية تشترط وجودها — أي يطابق الكلمات المتبوعة بمسافة.

---

### السؤال 20 (صعب)
What is the key difference between `Text I/O` and `Binary I/O`?

أ) Binary I/O is always faster  ب) Text I/O converts data to/from characters; Binary I/O stores raw bytes  ج) Text I/O can only read Strings  د) Binary I/O cannot handle Strings

**الإجابة الصحيحة: ب** — **التعليل:** `Text I/O` يُحوّل كل شيء لنصوص مقروءة (قد يتسبب في فقدان دقة). `Binary I/O` يحفظ البيانات بصيغتها الثنائية الأصلية.

---

### السؤال 21 (متوسط)
Which mode string in `RandomAccessFile` allows both reading and writing?

أ) `"r"`  ب) `"w"`  ج) `"rw"`  د) `"rws"`

**الإجابة الصحيحة: ج** — **التعليل:** `"r"` = قراءة فقط. `"rw"` = قراءة وكتابة. `"rws"` = قراءة وكتابة مع تزامن فوري للقرص.

---

### السؤال 22 (صعب)
An `enum Apple { Jonathan(10), GoldenDel(9) }`. What is `Apple.Jonathan.getPrice()` if `getPrice() { return price; }`?

أ) 9  ب) 0  ج) 10  د) Compilation error

**الإجابة الصحيحة: ج** — **التعليل:** `Jonathan(10)` يستدعي البانٍ بالقيمة 10، وتُخزّن في `price`. `getPrice()` تُرجع `10`.

---

### السؤال 23 (صعب)
What exception is thrown when `readObject()` is called and the class of the stored object is not found?

أ) `IOException`  ب) `ObjectNotFoundException`  ج) `ClassNotFoundException`  د) `ClassCastException`

**الإجابة الصحيحة: ج** — **التعليل:** `readObject()` يُثير `ClassNotFoundException` إذا لم يجد كلاس الكائن المُسلسَل — لذا رأس الدالة يجب أن يُعلن عنها أيضاً.

---

### السؤال 24 (متوسط)
What does `m.start()` return in a Matcher?

أ) The length of the match  ب) The starting index of the last match  ج) The starting index of the current match  د) The number of matches found so far

**الإجابة الصحيحة: ج** — **التعليل:** `m.start()` يُرجع فهرس بداية التطابق الحالي (آخر تطابق وجده `find()`).

---

### السؤال 25 (صعب)
What is printed by `System.out.println(Day.FRIDAY.compareTo(Day.THURSDAY))` if `enum Day { SUNDAY, MONDAY, ..., THURSDAY, FRIDAY, SATURDAY }`?

أ) -1  ب) 0  ج) 1  د) 5

**الإجابة الصحيحة: ج** — **التعليل:** `compareTo()` يُرجع الفرق في الـ ordinal. FRIDAY.ordinal() = 5، THURSDAY.ordinal() = 4، الفرق = 1.

---

## الجزء الرابع: أسئلة تصحيح الكود

### السيناريو 1 (صعب): تصحيح كود وسيناريو متعدد الأسئلة

**الوصف:** الطالب أحمد كتب كوداً لقراءة 5 أرقام ثنائية ثم حسابها:

```java
import java.io.*;
public class StudentCode {
    public static void main(String[] args) throws IOException {
        DataOutputStream out = new DataOutputStream(new FileOutputStream("nums.dat"));
        for (int i = 1; i <= 5; i++)
            out.write(i);        // ERROR LINE
        out.close();

        DataInputStream in = new DataInputStream(new FileInputStream("nums.dat"));
        int sum = 0;
        for (int i = 0; i < 5; i++)
            sum += in.readInt(); // ERROR LINE
        System.out.println("Sum = " + sum);
    }
}
```

#### السؤال 1.1 (صعب)
What is wrong with `out.write(i)`?

أ) `write()` doesn't exist in `DataOutputStream`  ب) `write()` stores only 1 byte, not a full int  ج) Loop index is wrong  د) Nothing is wrong

**الإجابة الصحيحة: ب** — **التعليل:** `write(int)` يكتب بايتاً واحداً فقط. لكتابة `int` كاملاً (4 بايتات) يجب استخدام `writeInt(i)`.

#### السؤال 1.2 (صعب)
What happens when `in.readInt()` reads the file created by `out.write(i)`?

أ) It reads correct values  ب) It throws `EOFException`  ج) It reads garbage values because write wrote 1 byte but readInt expects 4  د) It reads 0 for all values

**الإجابة الصحيحة: ج** — **التعليل:** `write(i)` كتب 5 بايتات فقط، لكن `readInt()` يتوقع 4 بايتات للعدد الأول — ثم سيُثير `EOFException` عند الثاني.

#### السؤال 1.3 (صعب)
What is the corrected version?

أ) Replace `out.write(i)` with `out.writeInt(i)` and `in.readInt()` stays  ب) No changes needed  ج) Replace both with `out.writeDouble` and `in.readDouble`  د) Use `FileInputStream` directly

**الإجابة الصحيحة: أ** — **التعليل:** `writeInt()` يكتب 4 بايتات، `readInt()` يقرأ 4 بايتات — التوافق مضمون.

---

### تصحيح الكود 1: Logic Error في try-catch ترتيب

**الكود الخاطئ:**
```java
try {
    int[] arr = new int[5];
    arr[10] = 1;
}
catch (Exception e) {
    System.out.println("General exception");
}
catch (ArrayIndexOutOfBoundsException e) { // DEAD CODE
    System.out.println("Array error");
}
```

**اكتشف الخطأ:** ترتيب الـ catch خاطئ — `Exception` أعم من `ArrayIndexOutOfBoundsException`.

**التصحيح:**
```java
try {
    int[] arr = new int[5];
    arr[10] = 1;
}
catch (ArrayIndexOutOfBoundsException e) { // specific first
    System.out.println("Array error");
}
catch (Exception e) {                      // general last
    System.out.println("General exception");
}
```
**شرح الحل:** الأكثر تحديداً (subclass) دائماً قبل الأقل تحديداً (superclass).

---

### تصحيح الكود 2: نسيان مسح الـ buffer في Scanner

**الكود الخاطئ:**
```java
Scanner sc = new Scanner(System.in);
boolean loop = true;
do {
    try {
        int n = sc.nextInt();
        loop = false;
    }
    catch (InputMismatchException e) {
        System.out.println("Try again");
        // MISSING: sc.nextLine();
    }
} while (loop);
```

**اكتشف الخطأ:** نسيان `sc.nextLine()` بعد الـ catch يُسبب حلقة لا نهائية.

**التصحيح:**
```java
catch (InputMismatchException e) {
    System.out.println("Try again");
    sc.nextLine(); // clear invalid input from buffer
}
```

---

### تصحيح الكود 3: off_by_one في حساب seek

**الكود الخاطئ:**
```java
RandomAccessFile raf = new RandomAccessFile("data.dat", "rw");
// To read the 5th integer (index 4):
raf.seek(5 * 4); // ERROR: this reads the 6th integer
int value = raf.readInt();
```

**اكتشف الخطأ:** الـ index يبدأ من الصفر — العدد الخامس عند index 4.

**التصحيح:**
```java
raf.seek(4 * 4); // correct: 5th integer is at index 4
int value = raf.readInt();
```

---

### تصحيح الكود 4: خطأ في ترتيب قراءة DataInputStream

**الكود الخاطئ:**
```java
// Written as:
out.writeUTF("Ali");
out.writeInt(95);

// Read as:
int score = in.readInt();   // WRONG ORDER
String name = in.readUTF(); // WRONG ORDER
```

**اكتشف الخطأ:** الترتيب معكوس — `readInt()` يحاول قراءة "Ali" كـ integer.

**التصحيح:**
```java
String name = in.readUTF();  // read String first
int score = in.readInt();    // then read int
```

---

### تصحيح الكود 5: نسيان Cast في readObject

**الكود الخاطئ:**
```java
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("obj.dat"));
String name = ois.readObject(); // COMPILATION ERROR
```

**اكتشف الخطأ:** `readObject()` يُرجع `Object` — يجب التحويل الصريح.

**التصحيح:**
```java
String name = (String) ois.readObject(); // explicit cast required
```

---

### تصحيح الكود 6: wrong_formula في regex quantifier

**الكود الخاطئ:**
```java
// To match exactly 3 digits:
String regex = "\d*3"; // WRONG: matches 0+ digits followed by literal "3"
```

**اكتشف الخطأ:** `*` يعني صفر أو أكثر. الرقم `3` هنا حرفي، ليس quantifier.

**التصحيح:**
```java
String regex = "\\d{3}"; // correct: exactly 3 digits
```

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1: fill_gaps — إكمال كود try-catch-finally

**المعطيات:** أكمل الفراغات لكتابة برنامج يقسم عددين ويُعالج القسمة على صفر:

```java
import java.util.Scanner;
public class Ex1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        _______ {                              // (1)
            System.out.println(a / b);
        }
        _______ (______________ ex) {          // (2)
            System.out.println("Division by zero!");
        }
        _______ {                              // (3)
            System.out.println("Done.");
        }
    }
}
```

**نموذج الحل:**
```java
(1) try
(2) catch (ArithmeticException ex)
(3) finally
```

---

### تمرين 2: code_fix — تصحيح كود File I/O

**المعطيات:** الكود التالي لا يعمل — أصلحه:

```java
PrintWriter pw = new PrintWriter("output.txt");
pw.println("Hello");
// File is empty after running!
```

**المطلوب:** لماذا الملف فارغ؟ كيف تُصلح؟

**نموذج الحل:**
```java
PrintWriter pw = new PrintWriter("output.txt");
pw.println("Hello");
pw.close(); // ADD THIS - flushes buffer to disk
```
البيانات تبقى في الـ buffer حتى يُغلق الملف.

---

### تمرين 3: scenario — تتبع كائن مُسلسَل

**المعطيات:** نفّذ الكود التالي وتوقع الناتج:

```java
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("t.dat"));
oos.writeUTF("Zaid");
oos.writeDouble(92.5);
oos.writeObject(new int[]{10, 20, 30});
oos.close();

ObjectInputStream ois = new ObjectInputStream(new FileInputStream("t.dat"));
System.out.println(ois.readUTF());
System.out.println(ois.readDouble());
int[] arr = (int[]) ois.readObject();
System.out.println(arr[1]);
```

**نموذج الحل:**
```
Zaid
92.5
20
```

---

### تمرين 4: fill_gaps — إكمال regex

**المعطيات:** أكمل الـ regex لمطابقة رقم هاتف عراقي بالشكل `07X-XXX-XXXX`:

```java
String regex = "07______-______-______";
```

**نموذج الحل:**
```java
String regex = "07\\d-\\d{3}-\\d{4}";
```

---

### تمرين 5: code_fix — تصحيح enum

**المعطيات:** الكود التالي فيه خطأ:

```java
enum Season { SPRING, SUMMER, FALL, WINTER }
// Attempt to create a new Season:
Season s = new Season(); // ERROR
```

**نموذج الحل:**
```java
Season s = Season.SPRING; // correct: use predefined constants
// Cannot instantiate enum with 'new'
```

---

### تمرين 6: numerical_solve — حساب حجم ملف ثنائي

**المعطيات:** برنامج يكتب: 3 `int` + 2 `double` + 1 `char` بـ `DataOutputStream`.

**المطلوب:** ما حجم الملف الناتج بالبايتات؟

**نموذج الحل:**
- 3 × `int` = 3 × 4 = 12 بايت
- 2 × `double` = 2 × 8 = 16 بايت
- 1 × `char` = 1 × 2 = 2 بايت
- **المجموع = 30 بايت**

---

### تمرين 7: scenario — RandomAccessFile لتعديل سجلات

**المعطيات:** ملف يحتوي 10 أعداد صحيحة (0-9). اكتب كوداً يُبدّل العدد في الموقع الثالث بالقيمة 99.

**نموذج الحل:**
```java
RandomAccessFile raf = new RandomAccessFile("nums.dat", "rw");
raf.seek(2 * 4); // index 2 = 3rd integer, each int = 4 bytes
raf.writeInt(99);
raf.close();
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: case_study — اختيار نوع I/O المناسب

**السيناريو:** نظام مدرسة يحتاج:
- حفظ سجلات الطلاب (اسم + GPA + تاريخ الميلاد)
- قراءتها لاحقاً بسرعة
- تعديل GPA أي طالب مباشرة بدون قراءة كل الملف

**المطلوب:**
1. أي نوع I/O تختار ولماذا؟
2. أي كلاس بالتحديد؟
3. كيف تحسب موقع الطالب رقم N؟

**نموذج الحل:**
1. `Binary I/O` مع `RandomAccessFile` — للوصول المباشر لأي سجل.
2. `RandomAccessFile` بوضع `"rw"`.
3. إذا كان كل سجل بحجم ثابت (مثلاً 50 بايت): `seek((N-1) * 50)`.

---

### تمرين 2: table_fill — مقارنة أنواع I/O

**المطلوب:** أكمل الجدول:

| المعيار | Text I/O | Binary I/O |
|---------|----------|------------|
| قابلية القراءة البشرية | | |
| الدقة الرقمية | | |
| الحجم على القرص | | |
| السرعة | | |
| المثال | | |

**نموذج الحل:**

| المعيار | Text I/O | Binary I/O |
|---------|----------|------------|
| قابلية القراءة البشرية | مقروء ببرامج النص | غير مقروء مباشرة |
| الدقة الرقمية | قد تفقد دقة الأعداد العشرية | دقيق تماماً |
| الحجم على القرص | أكبر عادةً | أصغر وأكثر كفاءة |
| السرعة | أبطأ | أسرع |
| المثال | `PrintWriter`, `Scanner` | `DataOutputStream`, `ObjectOutputStream` |

---

### تمرين 3: written_analysis — تحليل هرم الاستثناءات

**السيناريو:** طالب يكتب:
```java
catch (RuntimeException e) { ... }
catch (ArrayIndexOutOfBoundsException e) { ... }
```

**المطلوب:** لماذا هذا الكود لن يعمل كما يُريد؟ كيف تُصلحه؟

**نموذج الحل:**
`ArrayIndexOutOfBoundsException` هو subclass من `RuntimeException`. إذا وضعت الـ superclass أولاً، فلن يصل التنفيذ أبداً للـ catch الثاني — لأن `RuntimeException` يُمسك كل `RuntimeException` أياً كانت. الحل: عكس الترتيب — `ArrayIndexOutOfBoundsException` أولاً.

---

### تمرين 4: diagram_completion — أكمل هرم Exception

**المطلوب:** أكمل الفراغات:

```
Throwable
├── Exception
│   ├── __________ (Checked)
│   └── RuntimeException
│       ├── __________
│       └── __________
└── Error
    └── __________
```

**نموذج الحل:**
```
Throwable
├── Exception
│   ├── IOException (Checked)
│   └── RuntimeException
│       ├── NullPointerException
│       └── ArithmeticException
└── Error
    └── VirtualMachineError
```

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: try-catch مع InputMismatchException

**المدخل:**
```
"abc" ثم "5"
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | الكود | `continueinin` | الطباعة |
|--------|-------|---------------|---------|
| 1 | `do { try {` | true | — |
| 2 | `nextInt()` → "abc" | ؟ | ؟ |
| 3 | catch: InputMismatch | ؟ | ؟ |
| 4 | `nextInt()` → 5 | ؟ | ؟ |
| 5 | `continueinin = false` | ؟ | ؟ |

**نموذج الحل:**

| الخطوة | الكود | `continueinin` | الطباعة |
|--------|-------|---------------|---------|
| 1 | دخول الحلقة | true | — |
| 2 | `nextInt()` → يرمي InputMismatch | true | — |
| 3 | catch: clear buffer | true | "Try again..." |
| 4 | `nextInt()` → 5 نجح | true | — |
| 5 | `continueinin = false` | false | "The number entered is 5" |

**النتيجة:** الحلقة تتوقف بعد إدخال صحيح.

---

### تمرين تتبع 2: RandomAccessFile seek

**المدخل:** ملف يحتوي `{100, 200, 300, 400, 500}` كـ ints

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | الموقع (byte) | القيمة |
|--------|---------|---------------|-------|
| 1 | `seek(0)` ثم `readInt()` | 0 | ؟ |
| 2 | `seek(2 * 4)` ثم `readInt()` | ؟ | ؟ |
| 3 | `seek(4 * 4)` ثم `readInt()` | ؟ | ؟ |
| 4 | `writeInt(999)` at current pos | ؟ | — |

**نموذج الحل:**

| الخطوة | العملية | الموقع (byte) | القيمة |
|--------|---------|---------------|-------|
| 1 | `seek(0)` → `readInt()` | 0 | 100 |
| 2 | `seek(8)` → `readInt()` | 8 | 300 |
| 3 | `seek(16)` → `readInt()` | 16 | 500 |
| 4 | `writeInt(999)` | 20 | يكتب 999 بعد نهاية البيانات |

**النتيجة:** الملف أصبح `{100, 200, 300, 400, 500, 999}`.

---

### تمرين تتبع 3: تتبع DataOutputStream

**المدخل:** كود يكتب: `writeUTF("AB")`, `writeInt(5)`, `writeDouble(3.14)`

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | الدالة | البيانات | الحجم (byte) | الموقع التراكمي |
|--------|--------|---------|-------------|----------------|
| 1 | `writeUTF("AB")` | "AB" | ؟ | ؟ |
| 2 | `writeInt(5)` | 5 | ؟ | ؟ |
| 3 | `writeDouble(3.14)` | 3.14 | ؟ | ؟ |

**نموذج الحل:**

| الخطوة | الدالة | البيانات | الحجم (byte) | الموقع التراكمي |
|--------|--------|---------|-------------|----------------|
| 1 | `writeUTF("AB")` | "AB" | 4 (2 للطول + 2 للحروف) | 4 |
| 2 | `writeInt(5)` | 5 | 4 | 8 |
| 3 | `writeDouble(3.14)` | 3.14 | 8 | 16 |

**النتيجة:** حجم الملف = 16 بايت.

---

### تمرين تتبع 4: تتبع enum

**المدخل:**
```java
enum Color { RED, GREEN, BLUE, YELLOW }
Color c = Color.BLUE;
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| السؤال | العملية | النتيجة |
|--------|---------|---------|
| 1 | `c.ordinal()` | ؟ |
| 2 | `c.name()` | ؟ |
| 3 | `Color.values()[0]` | ؟ |
| 4 | `c.compareTo(Color.GREEN)` | ؟ |
| 5 | `Color.valueOf("YELLOW").ordinal()` | ؟ |

**نموذج الحل:**

| السؤال | العملية | النتيجة |
|--------|---------|---------|
| 1 | `c.ordinal()` | 2 |
| 2 | `c.name()` | "BLUE" |
| 3 | `Color.values()[0]` | RED |
| 4 | `c.compareTo(Color.GREEN)` | 1 (BLUE=2, GREEN=1, 2-1=1) |
| 5 | `Color.valueOf("YELLOW").ordinal()` | 3 |

---

### تمرين تتبع 5: تتبع Regex Matcher

**المدخل:**
```java
String text = "cat bat hat mat";
Pattern p = Pattern.compile("[a-z]at");
Matcher m = p.matcher(text);
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| استدعاء find() | التطابق | `m.start()` |
|---------------|---------|------------|
| الأول | ؟ | ؟ |
| الثاني | ؟ | ؟ |
| الثالث | ؟ | ؟ |
| الرابع | ؟ | ؟ |
| الخامس | ؟ | ؟ |

**نموذج الحل:**

| استدعاء find() | التطابق | `m.start()` |
|---------------|---------|------------|
| الأول | "cat" | 0 |
| الثاني | "bat" | 4 |
| الثالث | "hat" | 8 |
| الرابع | "mat" | 12 |
| الخامس | لا يوجد — يرجع false | — |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is an exception in Java?
A: كائن يُمثّل خطأ وقت التشغيل — يرث من `Throwable`. يُرمى تلقائياً أو يدوياً بـ `throw`.

**Q2:** What is the difference between `throw` and `throws`?
A: `throw` تنفيذي — يرمي الاستثناء فعلاً. `throws` إعلاني — يُخبر المُستدعي أن الدالة قد ترمي استثناءً.

**Q3:** What is the root class of all exceptions?
A: `java.lang.Throwable` — ثم `Exception` (للمعالجة) و`Error` (للأخطاء الحادة).

**Q4:** When does `finally` execute?
A: دائماً — سواء حدث استثناء أم لا، وسواء نفّذ `catch` أم لا (الاستثناء: `System.exit()`).

**Q5:** What is a Checked Exception?
A: استثناء يجب إما معالجته بـ `try-catch` أو إعلانه بـ `throws`. مثال: `IOException`.

**Q6:** What is an Unchecked Exception?
A: استثناء من نوع `RuntimeException` — معالجته اختيارية. مثال: `NullPointerException`, `ArrayIndexOutOfBoundsException`.

**Q7:** What does `File.exists()` return?
A: `true` إذا كان الملف أو المجلد موجوداً في نظام الملفات.

**Q8:** What is the difference between `PrintWriter` and `FileWriter`?
A: `PrintWriter` أكثر مرونة — يوفر `print()`, `println()`, `printf()`. `FileWriter` يكتب محارف فقط بـ `write()`.

**Q9:** Why must `close()` be called after writing?
A: لـ "مسح" الـ buffer — البيانات قد تبقى في الذاكرة المؤقتة ولا تُكتب للقرص حتى يُغلق الملف.

**Q10:** What does `FileWriter("file.txt", true)` mean?
A: الـ `true` يعني وضع الـ append — يُضيف للملف بدل محو محتواه.

**Q11:** What is `Binary I/O` used for?
A: لحفظ البيانات بصيغتها الثنائية الأصلية — أسرع وأكثر دقة من النصية، لكن غير مقروء مباشرة.

**Q12:** What does `DataOutputStream.writeUTF()` do?
A: يكتب طول النص (2 بايت) ثم محتواه بتشفير UTF-8.

**Q13:** What is `EOFException`?
A: استثناء يُثيره `DataInputStream` عند محاولة القراءة بعد نهاية الملف.

**Q14:** What is Serialization?
A: تحويل كائن Java لتسلسل بايتات لحفظه أو نقله — يتطلب أن يُنفّذ الكلاس `Serializable`.

**Q15:** What is the purpose of `RandomAccessFile.seek()`?
A: للانتقال لموقع بايت محدد في الملف قبل القراءة/الكتابة.

**Q16:** How to find the byte position of the Nth integer in a binary file?
A: `(N-1) * 4` — كل `int` = 4 بايتات، الترقيم من الصفر.

**Q17:** What does `Pattern.compile(r)` do?
A: يُحوّل نص الـ regex لكائن `Pattern` قابل للاستخدام — يُجمَّع مرة واحدة للكفاءة.

**Q18:** What is `Matcher.find()`?
A: يبحث عن التطابق التالي في النص — يُرجع `true` إذا وُجد.

**Q19:** What does `enum.ordinal()` return?
A: الترتيب الصحيح للثابت (0-based) في تعريف الـ enum.

**Q20:** What does `enum.values()` return?
A: مصفوفة تحتوي كل ثوابت الـ enum بترتيبها.

**Q21:** Can an enum have a constructor?
A: نعم — لكنه دائماً `private` أو package-private. يُستدعى عند تعريف كل ثابت.

**Q22:** What is `StringTokenizer`?
A: كلاس قديم لتقسيم نص على محدد (delimiter). تُفضّل عليه `String.split()` الآن.

**Q23:** What is the difference between `write()` and `writeInt()` in DataOutputStream?
A: `write(int)` يكتب بايتاً واحداً فقط. `writeInt(int)` يكتب 4 بايتات (int كاملة).

**Q24:** When is `ClassNotFoundException` thrown?
A: عند `readObject()` إذا لم يجد Java الـ class الخاص بالكائن المُسلسَل.

**Q25:** What does `m.start()` return in Matcher?
A: فهرس بداية التطابق الحالي في النص المحدد.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

### الكود الكامل 1: Exception Handling — FinallyPractice

```java
import java.util.*;
class FinallyPractice {
    public static void main(String[] a) {
        Scanner ssca = new Scanner(System.in);
        int num = 0, div = 0;
        try {
            System.out.print("Enter the numerator: ");
            num = ssca.nextInt();
            System.out.print("Enter the divisor : ");
            div = ssca.nextInt();
            System.out.println(num + " / " + div + " is " + (num / div) + " rem " + (num % div));
        }
        catch (ArithmeticException ex) {
            System.out.println("You can't divide " + num + " by " + div);
        }
        finally {
            System.out.println("If something went wrong, you entered bad data.");
        }
        System.out.println("Good-by");
    }
}
```

---

### الكود الكامل 2: Binary I/O — TestDataStream

```java
import java.io.*;
public class TestDataStream {
    public static void main(String[] args) throws IOException {
        DataOutputStream ooo = new DataOutputStream(new FileOutputStream("temp.dat"));
        ooo.writeUTF("John");
        ooo.writeDouble(85.5);
        ooo.writeUTF("Jim");
        ooo.writeDouble(185.5);
        ooo.writeUTF("George");
        ooo.writeDouble(105.25);
        ooo.close();

        DataInputStream iii = new DataInputStream(new FileInputStream("temp.dat"));
        System.out.println(iii.readUTF() + " " + iii.readDouble());
        System.out.println(iii.readUTF() + " " + iii.readDouble());
        System.out.println(iii.readUTF() + " " + iii.readDouble());
    }
}
```

---

### الكود الكامل 3: Object I/O — TestObjectInputStream

```java
import java.io.*;
public class TestObjectInputStream {
    public static void main(String[] args) throws ClassNotFoundException, IOException {
        ObjectOutputStream ooo = new ObjectOutputStream(new FileOutputStream("object.dat"));
        ooo.writeUTF("John");
        ooo.writeDouble(85.5);
        ooo.writeObject(new java.util.Date());
        ooo.close();

        ObjectInputStream iii = new ObjectInputStream(new FileInputStream("object.dat"));
        String name = iii.readUTF();
        double score = iii.readDouble();
        java.util.Date date = (java.util.Date)(iii.readObject());
        System.out.println(name + " " + score + " " + date);
        iii.close();
    }
}
```

---

### الكود الكامل 4: RandomAccessFile — TestRandomAccessFile

```java
import java.io.*;
public class TestRandomAccessFile {
    public static void main(String[] args) throws IOException {
        try (RandomAccessFile inout = new RandomAccessFile("inout.dat", "rw")) {
            inout.setLength(0);
            for (int i = 0; i < 200; i++)
                inout.writeInt(i);
            System.out.println("Current file length is " + inout.length());
            inout.seek(0);
            System.out.println("The first number is " + inout.readInt());
            inout.seek(1 * 4);
            System.out.println("The second number is " + inout.readInt());
            inout.seek(9 * 4);
            System.out.println("The tenth number is " + inout.readInt());
            inout.writeInt(555);
            inout.seek(inout.length());
            inout.writeInt(999);
            System.out.println("The new length is " + inout.length());
            inout.seek(10 * 4);
            System.out.println("The eleventh number is " + inout.readInt());
        }
    }
}
```

---

### الكود الكامل 5: enum مع Constructor — EnumDemo3

```java
enum AppleE {
    Jonathan(10), GoldenDel(9), RedDel(12), Winesap(15), Cortland(8);
    private int price;
    AppleE(int p) { price = p; }
    int getPrice() { return price; }
}

class EnumDemo3 {
    public static void main(String args[]) {
        System.out.println("Winesap costs " + AppleE.Winesap.getPrice() + " cents.\n");
        System.out.println("All apple prices:");
        for (AppleE a : AppleE.values())
            System.out.println(a + " costs " + a.getPrice() + " cents.");
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: What is exception handling and why is it important?

**نموذج الإجابة:**
1. **التعريف:** آلية للتعامل مع الأخطاء وقت التشغيل بدل إيقاف البرنامج.
2. **المكونات:** `try`, `catch`, `finally`, `throw`, `throws`.
3. **مثال:** القسمة على صفر بدون معالجة تُوقف البرنامج؛ مع `try-catch` يستمر.
4. **متى نستخدم:** دائماً للعمليات التي قد تفشل (I/O، تحويل أنواع، شبكة).

---

### سؤال 2: Explain Checked vs Unchecked Exceptions.

**نموذج الإجابة:**
1. **Checked:** المُترجم يُلزمك بمعالجتها أو إعلانها — ترث من `Exception` مباشرة.
2. **Unchecked:** ترث من `RuntimeException` — معالجتها اختيارية.
3. **مثال Checked:** `IOException`, `ClassNotFoundException`.
4. **مثال Unchecked:** `NullPointerException`, `ArrayIndexOutOfBoundsException`.

---

### سؤال 3: What is the role of the `finally` block?

**نموذج الإجابة:**
1. **التعريف:** بلوك ينفذ دائماً بعد `try` و`catch`.
2. **المكونات:** لا يُلزم بوجود `catch` معه.
3. **مثال:** إغلاق اتصال قاعدة بيانات أو ملف في `finally`.
4. **متى نستخدم:** تنظيف الموارد (إغلاق ملفات، إغلاق اتصالات).

---

### سؤال 4: Explain Text I/O vs Binary I/O.

**نموذج الإجابة:**
1. **Text I/O:** يُحوّل البيانات لنصوص مقروءة — `Scanner` للقراءة، `PrintWriter` للكتابة.
2. **Binary I/O:** يحفظ البيانات بصيغتها الثنائية — `DataInputStream/OutputStream` للأنواع البدائية.
3. **مثال:** الرقم 85.5 كنص = "85.5" (4 بايتات)؛ ثنائياً = 8 بايتات دقيقة.
4. **متى نستخدم:** Binary للبيانات الرقمية الكثيرة؛ Text للإخراج المقروء للمستخدم.

---

### سؤال 5: What is Serialization?

**نموذج الإجابة:**
1. **التعريف:** تحويل كائن Java لتسلسل بايتات لحفظه أو إرساله.
2. **الشرط:** الكلاس يجب أن يُنفّذ `java.io.Serializable`.
3. **مثال:** `ObjectOutputStream.writeObject(student)` يحفظ كائن `Student` كاملاً.
4. **متى نستخدم:** لحفظ حالة الكائنات، نقلها عبر الشبكة، أو التخزين المؤقت.

---

### سؤال 6: What is RandomAccessFile and how does seek() work?

**نموذج الإجابة:**
1. **التعريف:** كلاس يُتيح الوصول لأي موقع في الملف للقراءة أو الكتابة.
2. **المكونات:** `seek(pos)`, `readInt()`, `writeInt()`, `length()`, `setLength()`.
3. **مثال:** `raf.seek(10 * 4)` ينتقل للعدد الـ 11 (index 10) في ملف من ints.
4. **متى نستخدم:** قواعد بيانات ملفية، سجلات بحجم ثابت.

---

### سؤال 7: What is a regular expression?

**نموذج الإجابة:**
1. **التعريف:** نمط نصي يصف مجموعة من السلاسل — لمطابقة البيانات والتحقق منها.
2. **المكونات:** رموز خاصة: `.`, `\d`, `*`, `+`, `{n}`, `[]`, `()`, `\|`.
3. **مثال:** `\d{3}-\d{2}-\d{4}` يطابق SSN بالشكل `875-67-1111`.
4. **متى نستخدم:** التحقق من صحة المدخلات، البحث في النصوص، تقسيم السلاسل.

---

### سؤال 8: What is an enum in Java?

**نموذج الإجابة:**
1. **التعريف:** نوع بيانات بمجموعة ثابتة محدودة من القيم المُسمّاة.
2. **المكونات:** `values()`, `ordinal()`, `name()`, `valueOf()`, `compareTo()`.
3. **مثال:** `enum Day { SUNDAY, MONDAY, ..., SATURDAY }` — أيام الأسبوع.
4. **متى نستخدم:** بدل `static final int` للقيم الثابتة المُسمّاة — أكثر أماناً وقابلية للقراءة.

---

### سؤال 9: What is the purpose of BufferedInputStream/BufferedOutputStream?

**نموذج الإجابة:**
1. **التعريف:** تُغلّف Stream آخر وتُضيف buffer في الذاكرة.
2. **الفائدة:** تُقلل عدد عمليات القرص بتجميع البيانات وكتابتها/قراءتها دفعة واحدة.
3. **مثال:** `new BufferedOutputStream(new FileOutputStream("f.dat"))`.
4. **متى نستخدم:** دائماً للملفات الكبيرة لتحسين الأداء.

---

### سؤال 10: Explain how to write and read an enum in a switch statement.

**نموذج الإجابة:**
1. **تعريف الـ enum:** `enum Color { RED, GREEN, BLUE }`.
2. **الاستخدام في switch:** `switch(color) { case RED: ... case GREEN: ... }`.
3. **مثال:** `Color c = Color.GREEN; switch(c) { case GREEN: System.out.println("Go!"); }`.
4. **ملاحظة:** لا تكتب `case Color.RED:` — فقط `case RED:`.

---

### سؤال 11: What is the difference between FileInputStream.read() and DataInputStream.readInt()?

**نموذج الإجابة:**
1. `FileInputStream.read()` → يقرأ بايتاً واحداً (0-255)، يُرجع `-1` عند نهاية الملف.
2. `DataInputStream.readInt()` → يقرأ 4 بايتات ويُعيدها كـ `int` كامل.
3. **مثال:** لكتابة `255`، `write(255)` كافٍ. لكتابة `100000`، يجب `writeInt(100000)`.
4. **متى نستخدم:** استخدم `DataInputStream` دائماً مع `DataOutputStream`.

---

### سؤال 12: What is the `throws` keyword and when is it required?

**نموذج الإجابة:**
1. **التعريف:** إعلان في رأس الدالة يُخبر المُستدعي أن الدالة قد ترمي استثناءً معيناً.
2. **الإلزامية:** مطلوب للـ Checked Exceptions فقط — مثل `IOException`.
3. **مثال:** `public void readFile() throws IOException { ... }`.
4. **متى نستخدم:** عندما لا تُعالج الاستثناء محلياً وتُفوّض المسؤولية للمُستدعي.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم الفرق بين Checked وUnchecked Exceptions وأمثلة على كل منهما
- [ ] أعرف الترتيب الصحيح لـ catch blocks (الأكثر تحديداً أولاً)
- [ ] أعرف أن `finally` ينفذ دائماً بغض النظر عن الاستثناءات
- [ ] أعرف الفرق بين `throw` (تنفيذ) و`throws` (إعلان)
- [ ] أعرف دوال `File`: `exists()`, `length()`, `canRead()`, `isDirectory()`
- [ ] أعرف الفرق بين `PrintWriter` و`FileWriter`
- [ ] أعرف أن `close()` ضروري لمسح الـ buffer
- [ ] أعرف الفرق بين Text I/O و Binary I/O (مع أمثلة)
- [ ] أعرف كيفية تغليف الـ streams: `DataOutputStream(BufferedOutputStream(FileOutputStream(...)))`
- [ ] أعرف ترتيب القراءة يطابق ترتيب الكتابة في `DataInputStream`
- [ ] أعرف متى تُثار `EOFException` (مع DataInputStream لا FileInputStream)
- [ ] أعرف شرط `Serializable` لـ Object I/O
- [ ] أعرف أن `readObject()` يتطلب Cast صريح
- [ ] أعرف حساب موقع الـ byte: `index * 4` للـ ints في `RandomAccessFile`
- [ ] أعرف دلالة الرموز الأساسية في Regex: `.`, `\d`, `*`, `+`, `{n}`, `[]`
- [ ] أعرف `Pattern.compile()` و`Matcher.find()` و`m.start()`
- [ ] أعرف دوال `enum`: `ordinal()`, `name()`, `values()`, `valueOf()`, `compareTo()`
- [ ] أعرف أن `enum` يمكنه امتلاك constructor وfields وdoals
- [ ] أعرف الفرق بين `String.split()` و`Pattern.split(str, n)`
- [ ] أستطيع تتبع تنفيذ `try-catch` مع `do-while` خطوة بخطوة

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| الموضوع | يرتبط مع | كيف؟ |
|---------|----------|------|
| Exception Handling | Text/Binary I/O | كل عمليات I/O تُثير IOException |
| Binary I/O | Object I/O | ObjectStream يبني على DataStream |
| File class | Text I/O | يُستخدم مع PrintWriter وScanner |
| Regex | String processing | مطابقة وتقسيم النصوص |
| enum | OOP | نوع بيانات مخصص آمن |

---

### 🔑 أهم النقاط الذهبية

| الموضوع | النقطة |
|---------|--------|
| catch ترتيب | Subclass قبل Superclass دائماً |
| finally | ينفذ دائماً — حتى مع return |
| close() | إلزامي لمسح الـ buffer |
| DataStream | ترتيب القراءة = ترتيب الكتابة بالضبط |
| RandomAccessFile | seek(index × 4) للـ ints |
| readObject() | يتطلب cast صريح + ClassNotFoundException |
| EOFException | خاص بـ DataInputStream لا FileInputStream |

---

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
|--------------|--------|-----------|
| `\d` | رقم [0-9] | Regex |
| `\w` | حرف نصي | Regex |
| `.` | أي حرف | Regex |
| `{n}` | n مرة بالضبط | Regex |
| `{n,m}` | من n إلى m | Regex |
| `ordinal()` | الترتيب (0-based) | enum |
| `values()` | كل ثوابت enum | enum |
| `seek(pos)` | الانتقال لـ byte | RandomAccessFile |
| `writeUTF()` | كتابة String ثنائياً | DataOutputStream |
| `Serializable` | تفعيل التسلسل | Object I/O |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
|---|---------|
| 1 | catch الأكثر تحديداً دائماً قبل الأقل تحديداً |
| 2 | اقرأ من DataInputStream بنفس ترتيب الكتابة |
| 3 | أغلق الملف دائماً (close() أو try-with-resources) |
| 4 | seek(N × 4) للوصول للـ int رقم N (من الصفر) |
| 5 | readObject() يُرجع Object — تحويل صريح ضروري |
| 6 | مسح scanner buffer بـ nextLine() بعد InputMismatchException |
| 7 | EOFException = نهاية ملف DataInputStream (ليس FileInputStream) |
| 8 | enum constants مرقّمة من الصفر في ordinal() |
| 9 | Pattern.compile() مرة واحدة، Matcher لكل نص |
| 10 | FileWriter("f", true) = append، بدون true = overwrite |

---

<!-- VALIDATION
schema: 1.0
parts: detailed_explanation,summary,mcq,debug,exercise,analysis_exercise,trace_exercise,qa_cards,full_code,theory,self_check,cheat_sheet
mcq_count: 25
debug_count: 6
qa_count: 25
theory_count: 12
trace_count: 5
topics: exception_handling,text_io,binary_io,random_access,regex,enum
-->

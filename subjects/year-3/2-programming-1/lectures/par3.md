# المحاضرة 3 — Exception Handling & I/O (معالجة الاستثناءات والإدخال/الإخراج)

> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** معالجة الاستثناءات — النصي I/O — الثنائي I/O — التعابير المنتظمة — الأنواع المعدودة

---

## الجزء الأول: الشرح التفصيلي

### 1. الوحدة الأولى — معالجة الاستثناءات (`Exception Handling`)

#### 1.1. ما هو الاستثناء؟

**النص الأصلي يقول:** الاستثناء هو خطأ يقع وقت التشغيل (`Runtime Error`)، ويُمثَّل ككائن (`object`). معالجة الاستثناءات تُبقي البرنامج يعمل بشكل طبيعي بدلاً من التوقف المفاجئ.

**الشرح المبسّط:** تخيّل أنك تقود سيارة وعطل الإطار — بدون معالجة للاستثناء، السيارة تتوقف تماماً. مع المعالجة، يوجد `spare tire` تتحول إليه تلقائياً وتكمل رحلتك.

**💡 التشبيه:**
> البرنامج بدون `try-catch` كالسيارة بدون حزام أمان — يكمل مساره حتى أول حادثة.
> **وجه الشبه:** `Exception` = الحادثة، `catch` = حزام الأمان.

**🤔 تفعيل الفهم:**
> **سؤال:** لماذا نستخدم `Exception Handling` بدلاً من مجرد `if-else`؟
> **لماذا هذا مهم؟** الـ `if-else` يتعامل مع حالات متوقعة، أما `Exception` فيتعامل مع أخطاء غير متوقعة وقت التشغيل.

**مثال من الامتحان:**
> *What happens when dividing by zero in Java without exception handling?*
> نوع السؤال: نظري — يختبر فهم سلوك الـ `Runtime Error` وأثره على تدفق البرنامج.

---

#### 1.2. البنية الأساسية لـ `try-catch`

**النص الأصلي يقول:** يُغلَّف الكود المشكوك فيه بـ `try`، ويُعالَج الخطأ في `catch`.

💻 **الكود:**

##### ما هذا الكود؟
> برنامج يقرأ عدداً صحيحاً ومصفوفة من المستخدم، يحاول الوصول لعنصر خارج نطاق المصفوفة، ويعالج كل من `InputMismatchException` و `IndexOutOfBoundsException`.

```java
import java.util.*;
public class exception_1 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in); // Create scanner for user input
        int d = s.nextInt();                // Read array size
        int[] a = new int[d];              // Create array of size d
        try {
            // Fill array with user input
            for (int i = 0; i < d; i++)
                a[i] = s.nextInt();
            System.out.println(a[d]);      // Bug: index d is out of bounds (valid: 0 to d-1)
        }
        catch (InputMismatchException ex) {
            System.out.println("Try again????????????????????????"); // Non-integer input
        }
        catch (IndexOutOfBoundsException ex) {
            System.out.println("Out Of Bounds!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"); // Index error
        }
    }
}
```

**شرح كل سطر:**
1. `Scanner s = new Scanner(System.in)` → إنشاء كائن `Scanner` لقراءة المدخلات
2. `int d = s.nextInt()` → قراءة حجم المصفوفة من المستخدم
3. `int[] a = new int[d]` → إنشاء مصفوفة بحجم `d` (العناصر من `0` إلى `d-1`)
4. `try { ... }` → تغليف الكود الذي قد يرمي استثناءً
5. `a[i] = s.nextInt()` → ملء كل خلية في المصفوفة
6. `System.out.println(a[d])` → **خطأ مقصود:** الوصول للعنصر رقم `d` خارج النطاق
7. `catch (InputMismatchException ex)` → معالجة إدخال من نوع غير صحيح
8. `catch (IndexOutOfBoundsException ex)` → معالجة تجاوز حدود المصفوفة

**المكتبات المطلوبة (Imports):**
> `import java.util.*;`

**الناتج المتوقع:**
> عند إدخال `3` ثم `1 2 3`: يطبع `Out Of Bounds!!...`
> عند إدخال `3` ثم `1 a 3`: يطبع `Try again???...`

#### مهم للامتحان ⚠️:
> المصفوفة ذات الحجم `d` تحتوي عناصر من الفهرس `0` إلى `d-1`. الوصول للفهرس `d` يُطلق `ArrayIndexOutOfBoundsException` دائماً.

---

#### 1.3. إعادة المحاولة مع `do-while`

**النص الأصلي يقول:** يمكن دمج `try-catch` مع `do-while` لإجبار المستخدم على إدخال قيمة صحيحة.

```java
import java.util.*;
public class InputMismatchExceptionDemo {
    public static void main(String[] args) {
        Scanner inin = new Scanner(System.in);
        boolean continueInput = true;
        do {
            try {
                System.out.print("Enter an integer: "); // Prompt user
                int number = inin.nextInt();             // Try to read integer
                System.out.println("The number entered is " + number);
                continueInput = false; // Success — exit loop
            }
            catch (InputMismatchException ex) {
                // Handle non-integer input
                System.out.println("Try again. (Incorrect input: an integer is required)");
                inin.nextLine(); // Clear the invalid input from buffer
            }
        } while (continueInput); // Repeat until valid input
    }
}
```

**شرح كل سطر:**
1. `boolean continueInput = true` → علامة تحكم حلقة إعادة المحاولة
2. `do { ... } while (continueInput)` → يكرر حتى يُدخل المستخدم رقماً صحيحاً
3. `continueInput = false` → يُوقَف فقط عند نجاح قراءة العدد الصحيح
4. `inin.nextLine()` → **مهم:** تفريغ المُدخل الخاطئ من المخزن المؤقت (`buffer`)

#### نقطة مهمة ⚠️:
> `inin.nextLine()` بعد `catch (InputMismatchException)` ضروري — بدونها يبقى المدخل الخاطئ في الـ `buffer` ويُسبب حلقة لا نهائية.

**مثال من الامتحان:**
> *Why is `inin.nextLine()` called inside the catch block in InputMismatchExceptionDemo?*
> نوع السؤال: تطبيقي — يختبر فهم آلية الـ `Scanner buffer`.

---

#### 1.4. هرمية الاستثناءات (`Exception Hierarchy`)

**النص الأصلي يقول:** الاستثناءات كائنات مبنية على تسلسل هرمي، جذره `java.lang.Throwable`.

📊 **المخطط: هرمية الاستثناءات**

##### ما هذا المخطط؟
> يوضّح التسلسل الوراثي لفئات الاستثناءات في Java — أي فئة ترث من أي.

##### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
|---|---------|------------|-------|
| 1 | `Object` | class | جذر كل الكائنات في Java |
| 2 | `Throwable` | class | جذر كل الأخطاء والاستثناءات |
| 3 | `Exception` | class | الاستثناءات القابلة للمعالجة |
| 4 | `Error` | class | أخطاء خطيرة لا تُعالَج عادةً |
| 5 | `RuntimeException` | class | استثناءات وقت التشغيل (غير متحقق منها) |
| 6 | `IOException` | class | أخطاء الإدخال/الإخراج (متحقق منها) |
| 7 | `ClassNotFoundException` | class | استثناء متحقق منه |
| 8 | `ArithmeticException` | class | قسمة على صفر وما شابه |
| 9 | `NullPointerException` | class | الوصول لمرجع `null` |
| 10 | `IndexOutOfBoundsException` | class | تجاوز حدود مصفوفة/قائمة |
| 11 | `IllegalArgumentException` | class | وسيط غير صالح |
| 12 | `LinkageError` | class | خطأ ربط الفئات |
| 13 | `VirtualMachineError` | class | خطأ في الـ JVM نفسه |

##### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|----|-----|---------|-----------|-------|
| `Object` | `Throwable` | extends | وراثة | `Throwable` يرث من `Object` |
| `Throwable` | `Exception` | extends | وراثة | `Exception` نوع من `Throwable` |
| `Throwable` | `Error` | extends | وراثة | `Error` نوع من `Throwable` |
| `Exception` | `RuntimeException` | extends | وراثة | استثناءات وقت التشغيل |
| `Exception` | `IOException` | extends | وراثة | أخطاء الإدخال/الإخراج |
| `RuntimeException` | `ArithmeticException` | extends | وراثة | أخطاء حسابية |
| `RuntimeException` | `NullPointerException` | extends | وراثة | مراجع `null` |

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
  - id: runtime
    label: RuntimeException
    kind: class
    level: 3
  - id: ioexception
    label: IOException
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
  - id: indexout
    label: IndexOutOfBoundsException
    kind: class
    level: 4
edges:
  - from: object
    to: throwable
    label: extends
  - from: throwable
    to: exception
    label: extends
  - from: throwable
    to: error
    label: extends
  - from: exception
    to: runtime
    label: extends
  - from: exception
    to: ioexception
    label: extends
  - from: runtime
    to: arithmetic
    label: extends
  - from: runtime
    to: nullpointer
    label: extends
  - from: runtime
    to: indexout
    label: extends
```

**الفهم الخاطئ ❌:** `Error` و `Exception` نفس الشيء.
**الفهم الصحيح ✅:** `Error` = أخطاء خطيرة في الـ `JVM` (مثل `OutOfMemoryError`) لا تُعالَج، بينما `Exception` = أخطاء يمكن معالجتها في الكود.

**مثال من الامتحان:**
> *Which of the following is NOT a subclass of RuntimeException?*
> *a) ArithmeticException  b) IOException  c) NullPointerException  d) IndexOutOfBoundsException*
> نوع السؤال: مقارنة هرمية — يختبر حفظ التسلسل الوراثي.

---

#### 1.5. كتلة `finally`

**النص الأصلي يقول:** كتلة `finally` تُنفَّذ **دائماً** سواء حدث استثناء أم لا.

```java
import java.util.*;
class FinallyPractice {
    public static void main(String[] a) {
        Scanner ssca = new Scanner(System.in);
        int num = 0, div = 0;
        try {
            System.out.print("Enter the numerator: ");
            num = ssca.nextInt();                        // Read numerator
            System.out.print("Enter the divisor: ");
            div = ssca.nextInt();                        // Read divisor
            System.out.println(num + " / " + div + " is " + (num / div) + " rem " + (num % div));
        }
        catch (ArithmeticException ex) {
            System.out.println("You can't divide " + num + " by " + div); // Handle /0
        }
        finally {
            // Always executes — cleanup or notification
            System.out.println("If something went wrong, you entered bad data.");
        }
        System.out.println("Good-by"); // Only runs if no unhandled exception
    }
}
```

**شرح كل سطر:**
1. `try { ... }` → محاولة القسمة — قد ترمي `ArithmeticException` عند القسمة على صفر
2. `catch (ArithmeticException ex)` → التقاط القسمة على صفر (`/0`)
3. `finally { ... }` → يُنفَّذ **دائماً** بغض النظر عن النتيجة — مثالي لتحرير الموارد

**الناتج المتوقع (مدخل: 26 و 4):**
> `26 / 4 is 6 rem 2`
> `If something went wrong, you entered bad data.`
> `Good-by`

**💡 التشبيه:**
> `finally` كالبواب الذي يُغلق الباب دائماً سواء خرجت بنظام أو بسرعة.
> **وجه الشبه:** `finally` = إغلاق الملفات وتحرير الموارد دائماً.

#### مهم للامتحان ⚠️:
> `finally` يُنفَّذ حتى لو وُجد `return` داخل `try` أو `catch`. الحالة الوحيدة التي لا يُنفَّذ فيها: `System.exit()`.

**مثال من الامتحان:**
> *In the finally block example, what prints if the user enters 26 and 0?*
> نوع السؤال: تتبع تنفيذ — يختبر سلوك `finally` عند حدوث استثناء.

---

#### 1.6. رمي استثناء مخصص — `throw` و `throws`

**النص الأصلي يقول:** يمكن للمبرمج رمي استثناء بنفسه باستخدام `throw` داخل الدالة، مع تصريح `throws` في ترويسة الدالة.

```java
public class CircleX {
    private double radius;
    private static int numberOfObjects = 0;

    public CircleX() { this(1.0); } // Default constructor calls parameterized

    public CircleX(double newRadius) {
        setRadius(newRadius); // Calls setter which may throw
        numberOfObjects++;    // Increment only if setRadius succeeds
    }

    // Declare that this method may throw IllegalArgumentException
    public void setRadius(double newRadius) throws IllegalArgumentException {
        if (newRadius >= 0)
            radius = newRadius; // Valid radius — accept it
        else
            throw new IllegalArgumentException("Radius cannot be negative"); // Throw manually
    }

    public static int getNumberOfObjects() { return numberOfObjects; }
    public double findArea() { return radius * radius * 3.14159; }
}

public class TestCircleX {
    public static void main(String[] args) {
        try {
            CircleX c1 = new CircleX(5);   // OK
            CircleX c2 = new CircleX(-5);  // Throws IllegalArgumentException
            CircleX c3 = new CircleX(0);   // Never reached
        }
        catch (IllegalArgumentException ex) {
            System.out.println(ex); // Prints exception message
        }
        System.out.println("Number of objects " + CircleX.getNumberOfObjects());
    }
}
```

**الناتج المتوقع:**
> `java.lang.IllegalArgumentException: Radius cannot be negative`
> `Number of objects : 1`

**شرح كل سطر (الأهم):**
1. `throws IllegalArgumentException` → يُعلم المستدعي أن الدالة قد ترمي هذا النوع
2. `throw new IllegalArgumentException(...)` → رمي استثناء جديد يدوياً
3. `numberOfObjects++` → لا يُنفَّذ إذا فشل `setRadius` لأن الاستثناء يوقف التنفيذ
4. `c3 = new CircleX(0)` → لا يُنفَّذ لأن `c2` أطلق استثناءً غير ملتقط داخل `try`

#### نقطة مهمة ⚠️:
> الفرق بين `throw` و `throws`: `throw` = الفعل (رمي الاستثناء فعلياً)، `throws` = الإعلان في توقيع الدالة.

**مثال من الامتحان:**
> *After running TestCircleX, how many CircleX objects exist? Why?*
> نوع السؤال: تتبع تنفيذ — يختبر فهم متى يُنفَّذ `numberOfObjects++`.

---

#### 1.7. معلومات الاستثناء — `getMessage`, `toString`, `printStackTrace`, `getStackTrace`

**النص الأصلي يقول:** `Throwable` يوفر دوالاً للحصول على معلومات الاستثناء.

```java
public class TestException {
    public static void main(String[] args) {
        try {
            System.out.println(sum(new int[]{1, 2, 3, 4, 5})); // sum has a bug
        }
        catch (Exception ex) {
            ex.printStackTrace();   // Print full stack trace to stderr
            System.out.println("\n" + ex.getMessage()); // Short error message
            System.out.println("\n" + ex.toString());   // Class name + message
            System.out.println("\nTrace Info Obtained from getStackTrace");
            StackTraceElement[] traceElements = ex.getStackTrace(); // Array of frames
            for (int i = 0; i < traceElements.length; i++) {
                System.out.print("method " + traceElements[i].getMethodName());
                System.out.print("(" + traceElements[i].getClassName() + ":");
                System.out.println(traceElements[i].getLineNumber() + ")");
            }
        }
    }

    private static int sum(int[] list) {
        int result = 0;
        for (int i = 0; i <= list.length; i++) // Bug: should be < not <=
            result += list[i];
        return result;
    }
}
```

**جدول دوال `Throwable`:**
| الدالة | النوع | ما تُرجع |
|--------|-------|---------|
| `getMessage()` | `String` | رسالة الخطأ المختصرة |
| `toString()` | `String` | اسم الفئة + رسالة الخطأ |
| `printStackTrace()` | `void` | طباعة مسار الاستدعاء كاملاً |
| `getStackTrace()` | `StackTraceElement[]` | مصفوفة عناصر مسار الاستدعاء |

**ملاحظة:**
> الخطأ في `sum`: الشرط `i <= list.length` يُسبب الوصول لـ `list[5]` في مصفوفة حجمها 5 (فهارس 0-4) → `ArrayIndexOutOfBoundsException`.

---

### 2. الوحدة الثانية — الإدخال/الإخراج النصي (`Text I/O`)

#### 2.1. فئة `File`

**النص الأصلي يقول:** فئة `java.io.File` تمثّل مسار ملف أو مجلد، وتوفر دوالاً للاستعلام عن خصائصه دون فتحه.

```java
public class TestFileClass {
    public static void main(String[] args) {
        java.io.File fff = new java.io.File("image/us.gif"); // Create File object (path only)
        System.out.println("Does it exist? " + fff.exists());             // Check existence
        System.out.println("The file has " + fff.length() + " bytes");    // File size
        System.out.println("Can it be read? " + fff.canRead());           // Read permission
        System.out.println("Can it be written? " + fff.canWrite());       // Write permission
        System.out.println("Is it a directory? " + fff.isDirectory());    // Directory check
        System.out.println("Is it a file? " + fff.isFile());              // File check
        System.out.println("Is it absolute? " + fff.isAbsolute());        // Absolute path?
        System.out.println("Is it hidden? " + fff.isHidden());            // Hidden file?
        System.out.println("Absolute path" + fff.getAbsolutePath());      // Full path
        System.out.println("Last modified on " + new java.util.Date(fff.lastModified())); // Timestamp
    }
}
```

**جدول أهم دوال `java.io.File`:**
| الدالة | النوع | الوصف |
|--------|-------|-------|
| `exists()` | `boolean` | هل الملف/المجلد موجود؟ |
| `length()` | `long` | حجم الملف بالبايت |
| `canRead()` | `boolean` | صلاحية القراءة |
| `canWrite()` | `boolean` | صلاحية الكتابة |
| `isDirectory()` | `boolean` | هل هو مجلد؟ |
| `isFile()` | `boolean` | هل هو ملف؟ |
| `isAbsolute()` | `boolean` | هل المسار مطلق؟ |
| `isHidden()` | `boolean` | هل هو مخفي؟ |
| `getAbsolutePath()` | `String` | المسار المطلق الكامل |
| `getCanonicalPath()` | `String` | المسار المُنظَّف بدون `.` و `..` |
| `getName()` | `String` | اسم الملف فقط |
| `getPath()` | `String` | المسار كما أُعطي |
| `getParent()` | `String` | المجلد الأب |
| `lastModified()` | `long` | وقت آخر تعديل (milliseconds) |
| `listFiles()` | `File[]` | قائمة الملفات في المجلد |
| `delete()` | `boolean` | حذف الملف |
| `mkdir()` | `boolean` | إنشاء مجلد |

**الناتج المتوقع:**
> `Does it exist? true`
> `The file has 2998 bytes`
> `Can it be read? true`
> `Is it a directory? false`
> `Absolute path is c:\book\image\us.gif`

**مثال من الامتحان:**
> *Which method of java.io.File returns the size of the file in bytes?*
> نوع السؤال: مرجع سريع — يختبر حفظ توقيعات دوال `File`.

---

#### 2.2. الكتابة النصية — `PrintWriter` و `FileWriter`

**النص الأصلي يقول:** تُستخدم `PrintWriter` للكتابة النصية المنسقة (`print`, `println`, `printf`)، و`FileWriter` للكتابة الحرفية البسيطة.

**الطريقة الأولى — `PrintWriter`:**

```java
import java.io.*;
public class WriteData {
    public static void main(String[] args) throws IOException {
        java.io.File fff = new java.io.File("scores.txt"); // Target file
        if (fff.exists()) {
            System.out.println("File already exists"); // Prevent overwriting
            System.exit(1);
        }
        java.io.PrintWriter ooo = new java.io.PrintWriter(fff); // Open for writing
        ooo.print("John T Smith ");  // Write string (no newline)
        ooo.println(90);             // Write int + newline
        ooo.print("Eric K Jones ");
        ooo.println(85);
        ooo.close(); // MUST close to flush buffer to disk
    }
}
```

**الطريقة الثانية — `FileWriter` (إضافة للملف الموجود):**

```java
import java.io.*;
class WriteTextFile2 {
    public static void main(String[] args) {
        String fileName = "data.txt";
        try {
            // Second argument 'true' = append mode (don't overwrite)
            FileWriter ww = new FileWriter(fileName, true);
            ww.write("EEEEEEEEEEEE");
            ww.write("FFFFFFFFFFFF");
            ww.close(); // Flush and close
        }
        catch (IOException iox) {
            System.out.println("Problem writing " + fileName);
        }
    }
}
```

**⚖️ المقايضة: `PrintWriter` مقابل `FileWriter`**

| | `PrintWriter` | `FileWriter` |
|---|---|---|
| المزايا | `print/println/printf` — كتابة منسقة سهلة | بسيطة، مباشرة |
| العيوب | تحتاج `File` أو `String` مسار | تكتب `char` فقط، لا دوال `println` |
| متى تختاره | كتابة بيانات منسقة (أسماء، أرقام) | كتابة نصوص خام |

#### نقطة مهمة ⚠️:
> `ooo.close()` ضروري — بدونه قد لا تُكتَب البيانات للملف (تبقى في الـ `buffer`).

---

#### 2.3. القراءة النصية من الإنترنت

**النص الأصلي يقول:** `Scanner` يمكنه قراءة النص من عنوان URL عبر `url.openStream()`.

```java
import java.util.Scanner;
public class ReadFileFromURL {
    public static void main(String[] args) {
        System.out.print("Enter a URL: ");
        String URLString = new Scanner(System.in).next(); // Read URL from user
        try {
            java.net.URL url = new java.net.URL(URLString); // Create URL object
            int count = 0;
            Scanner input = new Scanner(url.openStream()); // Open network stream
            while (input.hasNext()) {
                String line = input.nextLine(); // Read line by line
                count += line.length();         // Accumulate character count
            }
            System.out.println("The file size is " + count + " characters");
        }
        catch (java.net.MalformedURLException ex) {
            System.out.println("Invalid URL"); // Bad URL format
        }
        catch (java.io.IOException ex) {
            System.out.println("I/O Errors: no such file"); // Network/IO error
        }
    }
}
```

**ملاحظة:**
> يُلتقط نوعان من الاستثناءات: `MalformedURLException` لعنوان URL غير صالح، و`IOException` لفشل الاتصال — كلاهما متحقق منه (`checked exception`).

---

### 3. الوحدة الثالثة — الإدخال/الإخراج الثنائي (`Binary I/O`)

#### 3.1. الفرق بين الـ Text I/O والـ Binary I/O

**النص الأصلي يقول:** `InputStream` هو الجذر لقراءة البيانات الثنائية، و`OutputStream` للكتابة.

**⚖️ المقايضة: `Text I/O` مقابل `Binary I/O`**

| | `Text I/O` | `Binary I/O` |
|---|---|---|
| التمثيل | أحرف Unicode | بايتات خام |
| الكفاءة | أبطأ (تحويل) | أسرع (مباشر) |
| القراءة بـ Notepad | نعم | غير مقروء |
| الأمثلة | `Scanner`, `PrintWriter` | `FileInputStream`, `DataOutputStream` |

📊 **المخطط: هرمية فئات Binary I/O**

##### ما هذا المخطط؟
> يوضّح الفئات الأساسية للـ `Binary I/O` في Java وعلاقاتها الوراثية.

##### وصف العُقد:
| # | العُقدة | النوع | الشرح |
|---|---------|-------|-------|
| 1 | `InputStream` | abstract class | جذر قراءة البيانات الثنائية |
| 2 | `OutputStream` | abstract class | جذر كتابة البيانات الثنائية |
| 3 | `FileInputStream` | class | قراءة بايتات من ملف |
| 4 | `FileOutputStream` | class | كتابة بايتات لملف |
| 5 | `FilterInputStream` | class | طبقة تصفية للقراءة |
| 6 | `FilterOutputStream` | class | طبقة تصفية للكتابة |
| 7 | `DataInputStream` | class | قراءة أنواع Java الأساسية |
| 8 | `DataOutputStream` | class | كتابة أنواع Java الأساسية |
| 9 | `BufferedInputStream` | class | قراءة محسّنة بـ buffer |
| 10 | `BufferedOutputStream` | class | كتابة محسّنة بـ buffer |
| 11 | `ObjectInputStream` | class | قراءة كائنات `Serializable` |
| 12 | `ObjectOutputStream` | class | كتابة كائنات `Serializable` |

```diagram
type: class
title: Binary I/O Class Hierarchy
direction: TD
nodes:
  - id: istream
    label: InputStream
    kind: class
    level: 0
  - id: ostream
    label: OutputStream
    kind: class
    level: 0
  - id: fistream
    label: FileInputStream
    kind: class
    level: 1
  - id: fostream
    label: FileOutputStream
    kind: class
    level: 1
  - id: filteristream
    label: FilterInputStream
    kind: class
    level: 1
  - id: filterostream
    label: FilterOutputStream
    kind: class
    level: 1
  - id: distream
    label: DataInputStream
    kind: class
    level: 2
  - id: dostream
    label: DataOutputStream
    kind: class
    level: 2
  - id: bistream
    label: BufferedInputStream
    kind: class
    level: 2
  - id: bostream
    label: BufferedOutputStream
    kind: class
    level: 2
  - id: obistream
    label: ObjectInputStream
    kind: class
    level: 1
  - id: obostream
    label: ObjectOutputStream
    kind: class
    level: 1
edges:
  - from: istream
    to: fistream
    label: extends
  - from: istream
    to: filteristream
    label: extends
  - from: istream
    to: obistream
    label: extends
  - from: ostream
    to: fostream
    label: extends
  - from: ostream
    to: filterostream
    label: extends
  - from: ostream
    to: obostream
    label: extends
  - from: filteristream
    to: distream
    label: extends
  - from: filteristream
    to: bistream
    label: extends
  - from: filterostream
    to: dostream
    label: extends
  - from: filterostream
    to: bostream
    label: extends
```

---

#### 3.2. `FileInputStream` / `FileOutputStream` — قراءة/كتابة بايتات

**النص الأصلي يقول:** `FileInputStream` و `FileOutputStream` تقرأ/تكتب بايتات مفردة من/إلى الملفات.

```java
import java.io.*;
public class TestFileStream {
    public static void main(String[] args) throws IOException {
        // Write bytes 1-10 to file
        try (FileOutputStream ott = new FileOutputStream("temp.dat")) {
            for (int i = 1; i <= 10; i++)
                ott.write(i); // Write single byte (value 1-10)
        } // Auto-closes via try-with-resources

        // Read bytes back from file
        try (FileInputStream inn = new FileInputStream("temp.dat")) {
            int value;
            while ((value = inn.read()) != -1) // read() returns -1 at EOF
                System.out.print(value + " ");  // Print each byte value
        }
    }
}
```

**شرح كل سطر:**
1. `try (FileOutputStream ott = ...)` → `try-with-resources`: يُغلق تلقائياً عند انتهاء الكتلة
2. `ott.write(i)` → يكتب قيمة `int` كبايت واحد (0-255 فقط)
3. `inn.read()` → يقرأ بايتاً واحداً كـ `int` (0-255)، أو `-1` عند نهاية الملف

**ملاحظة:**
> الملف `temp.dat` غير مقروء بـ Notepad لأنه ثنائي — يخزّن البايتات خام لا أحرف ASCII.

**مثال من الامتحان:**
> *What does `inn.read()` return when it reaches the end of file?*
> نوع السؤال: نظري — يختبر معرفة قيمة إنهاء الملف `EOF`.

---

#### 3.3. `DataInputStream` / `DataOutputStream` — قراءة/كتابة أنواع Java

**النص الأصلي يقول:** استخدام فئات التصفية (`Filter Classes`) يُتيح قراءة وكتابة أنواع Java المبدئية (int, double, String) بدلاً من البايتات.

```java
import java.io.*;
public class TestDataStream {
    public static void main(String[] args) throws IOException {
        // Write typed data to binary file
        DataOutputStream ooo = new DataOutputStream(new FileOutputStream("temp.dat"));
        ooo.writeUTF("John");      // Write UTF-encoded string
        ooo.writeDouble(85.5);     // Write 8-byte double
        ooo.writeUTF("Jim");
        ooo.writeDouble(185.5);
        ooo.writeUTF("George");
        ooo.writeDouble(105.25);
        ooo.close();

        // Read typed data back in SAME ORDER written
        DataInputStream iii = new DataInputStream(new FileInputStream("temp.dat"));
        System.out.println(iii.readUTF() + " " + iii.readDouble()); // John 85.5
        System.out.println(iii.readUTF() + " " + iii.readDouble()); // Jim 185.5
        System.out.println(iii.readUTF() + " " + iii.readDouble()); // George 105.25
    }
}
```

**جدول دوال `DataOutputStream` / `DataInputStream`:**
| الكتابة | القراءة | الحجم |
|---------|---------|-------|
| `writeBoolean(b)` | `readBoolean()` | 1 بايت |
| `writeByte(v)` | `readByte()` | 1 بايت |
| `writeChar(c)` | `readChar()` | 2 بايت |
| `writeShort(v)` | `readShort()` | 2 بايت |
| `writeInt(v)` | `readInt()` | 4 بايت |
| `writeLong(v)` | `readLong()` | 8 بايت |
| `writeFloat(v)` | `readFloat()` | 4 بايت |
| `writeDouble(v)` | `readDouble()` | 8 بايت |
| `writeUTF(s)` | `readUTF()` | متغير |
| `writeBytes(s)` | `readLine()` | متغير |

#### مهم للامتحان ⚠️:
> يجب القراءة **بنفس الترتيب** الذي كُتبت به. كتابة `writeUTF` ثم `writeDouble` يعني قراءة `readUTF` ثم `readDouble` — أي اختلاف في الترتيب يُنتج بيانات خاطئة.

---

#### 3.4. `BufferedOutputStream` / `BufferedInputStream` — التحسين بالمخزن المؤقت

**النص الأصلي يقول:** تُلفّ `FileOutputStream` بـ `BufferedOutputStream` لتحسين الأداء.

```java
import java.io.*;
class Write10Ints {
    public static void main(String[] args) throws IOException {
        String fileName = "ints.dat";
        // Chain: DataOutputStream -> BufferedOutputStream -> FileOutputStream
        DataOutputStream out = new DataOutputStream(
            new BufferedOutputStream(
                new FileOutputStream(fileName)));
        for (int j = 1; j <= 10; j++)
            out.writeInt(j); // Write int (4 bytes each)
        System.out.println(out.size()); // Total bytes written = 10 * 4 = 40
        out.close();
    }
}
```

**💡 التشبيه:**
> `BufferedOutputStream` كالتاجر الذي يجمع البضاعة ثم يشحنها دفعة واحدة بدلاً من شحن كل قطعة على حدة.
> **وجه الشبه:** تقليل عدد عمليات كتابة القرص الصلب = تسريع الأداء.

---

#### 3.5. قراءة حتى نهاية الملف — `EOFException`

**النص الأصلي يقول:** عند قراءة ملف ثنائي حتى نهايته، `DataInputStream` يُطلق `EOFException` بدلاً من إرجاع `-1`.

```java
import java.io.*;
class ReadIntEOF {
    public static void main(String[] args) {
        String fileName = "ints.dat";
        long sum = 0;
        try {
            DataInputStream instr = new DataInputStream(
                new BufferedInputStream(new FileInputStream(fileName)));
            try {
                while (true)
                    sum += instr.readInt(); // Keep reading until EOFException
            }
            catch (EOFException eof) {
                System.out.println("The sum is: " + sum); // Normal end of file
                instr.close();
            }
            catch (IOException iox) {
                System.out.println("Problems reading " + fileName);
                instr.close();
            }
        }
        catch (IOException iox) {
            System.out.println("IO Problems with " + fileName);
        }
    }
}
```

**الناتج المتوقع (ملف يحتوي 1-10):**
> `The sum is: 55`

**الفهم الخاطئ ❌:** `DataInputStream.readInt()` يُرجع `-1` عند نهاية الملف.
**الفهم الصحيح ✅:** `DataInputStream.readInt()` يُطلق `EOFException` عند نهاية الملف — الـ `-1` مخصص لـ `FileInputStream.read()` فقط.

---

#### 3.6. `ObjectInputStream` / `ObjectOutputStream` — قراءة/كتابة الكائنات

**النص الأصلي يقول:** `ObjectInputStream/ObjectOutputStream` تُستخدم لكتابة وقراءة الكائنات (`Serializable`) كاملةً.

```java
import java.io.*;
public class TestObjectInputStream {
    public static void main(String[] args) throws ClassNotFoundException, IOException {
        // Write mixed types including a Date object
        ObjectOutputStream ooo = new ObjectOutputStream(
            new FileOutputStream("object.dat"));
        ooo.writeUTF("John");                     // Write string
        ooo.writeDouble(85.5);                    // Write primitive
        ooo.writeObject(new java.util.Date());    // Write entire object
        ooo.close();

        // Read in same order
        ObjectInputStream iii = new ObjectInputStream(
            new FileInputStream("object.dat"));
        String name = iii.readUTF();
        double score = iii.readDouble();
        java.util.Date date = (java.util.Date)(iii.readObject()); // Cast required
        System.out.println(name + " " + score + " " + date);
        iii.close();
    }
}
```

**ملاحظة:**
> `readObject()` يُرجع `Object` — يجب `casting` للنوع الصحيح. الفئة المقروءة يجب أن تُنفّذ `Serializable`.

**كتابة وقراءة مصفوفات:**

```java
public class TestObjectStreamForArray {
    public static void main(String[] args) throws ClassNotFoundException, IOException {
        int[] n = {1, 2, 3, 4, 5};
        String[] s = {"John", "Susan", "Kim"};

        // Write arrays as objects (append mode)
        try (ObjectOutputStream ooo = new ObjectOutputStream(
                new FileOutputStream("array.dat", true))) {
            ooo.writeObject(n); // Write int array as one object
            ooo.writeObject(s); // Write String array as one object
        }

        // Read arrays back
        try (ObjectInputStream iii = new ObjectInputStream(
                new FileInputStream("array.dat"))) {
            int[] newNumbers = (int[])(iii.readObject());       // Cast to int[]
            String[] newStrings = (String[])(iii.readObject()); // Cast to String[]
            for (int i = 0; i < newNumbers.length; i++)
                System.out.print(newNumbers[i] + " ");
            System.out.println();
            for (int i = 0; i < newStrings.length; i++)
                System.out.print(newStrings[i] + " ");
        }
    }
}
```

**مثال من الامتحان:**
> *What interface must a class implement to be written with ObjectOutputStream?*
> نوع السؤال: نظري — يختبر فهم شرط الـ `Serialization`.

---

#### 3.7. `RandomAccessFile` — وصول عشوائي للملف

**النص الأصلي يقول:** `RandomAccessFile` يتيح القراءة والكتابة في **أي موضع** من الملف.

```java
import java.io.*;
public class TestRandomAccessFile {
    public static void main(String[] args) throws IOException {
        try (RandomAccessFile inout = new RandomAccessFile("inout.dat", "rw")) {
            inout.setLength(0);                 // Clear file
            for (int i = 0; i < 200; i++)
                inout.writeInt(i);              // Write 200 ints (200*4 = 800 bytes)
            System.out.println("Current file length is " + inout.length()); // 800

            inout.seek(0);       // Move pointer to byte 0 (first int)
            System.out.println("The first number is " + inout.readInt());   // 0

            inout.seek(1 * 4);   // Move pointer to byte 4 (second int)
            System.out.println("The second number is " + inout.readInt());  // 1

            inout.seek(9 * 4);   // Move pointer to byte 36 (10th int)
            System.out.println("The tenth number is " + inout.readInt());   // 9
            inout.writeInt(555); // Overwrite 11th int (at byte 40) with 555

            inout.seek(inout.length()); // Move to end of file
            inout.writeInt(999);        // Append 999 at end
            System.out.println("The new length is " + inout.length()); // 804

            inout.seek(10 * 4);  // Go back to 11th int
            System.out.println("The eleventh number is " + inout.readInt()); // 555
        }
    }
}
```

**الناتج المتوقع:**
> `Current file length is 800`
> `The first number is 0`
> `The second number is 1`
> `The tenth number is 9`
> `The new length is 804`
> `The eleventh number is 555`

**⚙️ الخطوات / الخوارزمية: حساب موضع عنصر في RandomAccessFile**

##### ما هدف هذه العملية؟
> الوصول المباشر لأي `int` في الملف بمعرفة فهرسه.

```algorithm
1 | حدّد فهرس العنصر المطلوب | المبرمج | مثال: العنصر رقم 11 → فهرسه 10
2 | احسب الموضع بالبايت | حساب | position = index * 4 (int = 4 bytes)
3 | انقل مؤشر الملف | seek(position) | inout.seek(10 * 4) = 40
4 | اقرأ أو اكتب | readInt() أو writeInt() | العملية المطلوبة
```

**جدول أوضاع `RandomAccessFile`:**
| الوضع | الوصف |
|-------|-------|
| `"r"` | قراءة فقط |
| `"rw"` | قراءة وكتابة |

**مثال من الامتحان:**
> *In a RandomAccessFile containing 200 ints, what is the byte position of the 50th integer?*
> نوع السؤال: حسابي — يختبر فهم `seek(index * size)`.

---

### 4. الوحدة الرابعة — التعابير المنتظمة (`Regular Expressions`)

#### 4.1. ما هي التعابير المنتظمة؟

**النص الأصلي يقول:** التعبير المنتظم (`regex`) هو جملة حرفية تصف نمطاً للمطابقة، وتستخدمه Java في المطابقة والاستبدال والتقسيم. تتضمن رموزاً خاصة ذات دلالة محددة.

**الرموز الخاصة:**
> `( , [ , { , \ , ^ , - , $ , | , } , ] , ) , ? , * , + , .`

💡 **التشبيه:**
> `regex` كقالب كوكي — تصف شكل القطعة التي تريد قطعها، وكل عجينة (نص) يُطابَق بها.
> **وجه الشبه:** القالب = `regex`، العجينة = النص المُدخَل.

---

#### 4.2. رموز الـ `regex` وجداول المطابقة

**النص الأصلي يقول:** تُقسَّم رموز الـ `regex` إلى: فئات الأحرف، رموز خاصة، ومحددات التكرار.

**جدول فئات الأحرف:**
| التركيب | المقابل |
|---------|---------|
| `[abc]` | أي حرف من a أو b أو c |
| `[^abc]` | أي حرف باستثناء a,b,c |
| `[a-zA-Z]` | أي حرف أبجدي كبير أو صغير |
| `[[a-d][p-m]]` | أي حرف ينتمي لأحد المجالين |
| `[[a-z]&&[def]]` | أي حرف ينتمي لتقاطع المجموعتين |
| `[[a-z]&&[^bc]]` | أي حرف صغير باستثناء b,c |
| `[[a-z]&&[^m-p]]` | أي حرف صغير باستثناء m-p |

**جدول الرموز الخاصة:**
| الرمز | المعنى |
|-------|--------|
| `.` | أي حرف واحد |
| `\d` | أي رقم `[0-9]` |
| `\D` | أي حرف غير رقمي `[^0-9]` |
| `\s` | مسافة بيضاء `[\t\n\x0B\f\r]` |
| `\S` | أي حرف باستثناء المسافة `[^\s]` |
| `\w` | حرف نصي `[a-zA-Z0-9_]` |
| `\W` | أي حرف غير نصي `[^\w]` |

**جدول محددات التكرار:**
| الرمز | المعنى |
|-------|--------|
| `?` | مرة واحدة أو صفر (اختياري) |
| `*` | صفر أو أكثر |
| `+` | مرة واحدة أو أكثر |
| `{n}` | بالضبط `n` مرات |
| `{n,}` | `n` مرات على الأقل |
| `{n,m}` | من `n` إلى `m` مرة |
| `\|` | أو (اختيار بين بديلين) |

---

#### 4.3. أمثلة مطابقة الـ `regex`

**جدول أمثلة (نعم/لا):**

| تعبير `regex` | يطابق | لا يطابق |
|--------------|-------|---------|
| `c.t` | `cat`, `cot`, `c9t` | `#at`, `Car` |
| `\d\d\d-\d\d-\d\d\d\d` | `875-67-1111`, `444-55-9999` | `66-777-4532`, `111-11-777` |
| `\D\d-\D\d` | `w4-r3`, `x0-y0` | `86-09`, `5t-8c` |
| `\w\w\w\W\w\w\w` | `657 hhh`, `ut6#uyt` | `werdrhy`, `345R234` |
| `a(bc)+de` | `abcde`, `abcbcde` | `ade`, `abc` |
| `a(bc)?de` | `ade`, `abcde` | `abc`, `abcbcde` |
| `[a-m]*` | `blackmail`, `imbecile` | `above`, `below` |
| `[^aeiou]` | `b`, `c` | `a`, `e` |
| `[a-z]{4,6}` | `spider`, `tiger` | `cow` |
| `[a-z\s]*hello` | `hello`, `say hello` | `Othello`, `2hello` |

---

#### 4.4. استخدام `Pattern` و `Matcher`

**النص الأصلي يقول:** تُستخدم فئتا `Pattern` و `Matcher` لإيجاد النمط في نص.

```java
import java.io.*;
import java.util.*;
import java.util.regex.*;
public class RegTest2 {
    public static void main(String args[]) throws Exception {
        BufferedReader in = new BufferedReader(new FileReader("alice30.txt")); // Open file
        String line = in.readLine(); // Read first line
        String s = "";
        while (s != null) {
            s = in.readLine();
            line = line + s; // Concatenate all lines
        }
        String r = "this"; // The regex pattern to search for
        Pattern p = Pattern.compile(r); // Compile pattern (more efficient than re-compiling)
        Matcher m = p.matcher(line);    // Create matcher for the text
        while (m.find()) {              // Find next occurrence
            System.out.println("MATCH:" + m.start()); // Print start position
        }
        in.close();
    }
}
```

**شرح كل سطر:**
1. `Pattern.compile(r)` → تحويل نص الـ `regex` إلى كائن `Pattern` قابل للتنفيذ
2. `p.matcher(line)` → ربط الـ `Pattern` بالنص المُراد البحث فيه
3. `m.find()` → البحث عن التطابق التالي — يُرجع `true` إذا وُجد
4. `m.start()` → موضع البداية (بالحرف) للتطابق الحالي

**⚙️ الخطوات / الخوارزمية: استخدام Regex مع Pattern و Matcher**

```algorithm
1 | تعريف النمط | String | r = "النمط"
2 | تجميع النمط | Pattern.compile(r) | إنشاء كائن Pattern
3 | ربط بالنص | p.matcher(text) | إنشاء كائن Matcher
4 | البحث عن التطابق | m.find() | true إذا وُجد تطابق
5 | معالجة التطابق | m.start(), m.group() | الموضع أو النص المُطابَق
6 | تكرار حتى انتهاء النص | while(m.find()) | كل التطابقات
```

---

#### 4.5. تقسيم النصوص — `StringTokenizer`, `split()`, `Pattern.split()`

**النص الأصلي يقول:** ثلاث طرق لتقسيم النص إلى رموز (`tokens`).

```java
import java.util.*;
import java.util.regex.*;
class StringTokenizerDemo {
    public static void main(String args[]) {
        String str = "Never look down on anybody unless you're helping him up";

        // Method 1: StringTokenizer (legacy)
        System.out.println("Splitting String Using StringTokenizer class");
        StringTokenizer tr = new StringTokenizer(str, " "); // Split by space
        int i = 1;
        while (tr.hasMoreTokens()) {
            System.out.print(" Token " + i + " : ");
            System.out.println(tr.nextToken()); // Get next token
            ++i;
        }

        // Method 2: String.split() — splits all
        System.out.println("Splitting String Using split() method");
        String[] tk = str.split(" ");
        for (String tokens : tk)
            System.out.println(tokens);

        // Method 3: Pattern.split() — splits with limit
        System.out.println("Splitting String Using Pattern class");
        Pattern p = Pattern.compile(" ");
        tk = p.split(str, 3); // Split into max 3 parts
        for (String tokens : tk)
            System.out.println(tokens);
    }
}
```

**⚖️ المقايضة: طرق تقسيم النص**

| | `StringTokenizer` | `split()` | `Pattern.split()` |
|---|---|---|---|
| المزايا | موجود منذ Java 1.0، بسيط | مختصر، دعم `regex` | مرن، دعم حد التقسيم |
| العيوب | `Legacy`، لا يدعم `regex` | يُعيد مصفوفة كاملة | يتطلب استيراد `regex` |
| متى تختاره | تقسيم بسيط بمحدد واحد | تقسيم كامل بـ `regex` | تقسيم محدود العدد |

**الناتج المتوقع لـ `Pattern.split(str, 3)`:**
> `Never`
> `look`
> `down on anybody unless you're helping him up`

---

### 5. الوحدة الرابعة — الأنواع المعدودة (`Enumerated Types`)

#### 5.1. تعريف الأنواع المعدودة

**النص الأصلي يقول:** `enum` يُعرّف نوعاً بقيم ثابتة محددة مسبقاً (كأيام الأسبوع أو الألوان).

```java
enum MyFavoriteColor {RED, BLUE, GREEN, YELLOW}; // Define enum type
MyFavoriteColor color;
color = MyFavoriteColor.BLUE; // Assign enum value

enum Day {SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY};
Day[] days = Day.values(); // Get all enum constants as array
```

---

#### 5.2. دوال الـ `enum`

**النص الأصلي يقول:** `enum` يأتي بدوال مدمجة: `name()`, `ordinal()`, `equals()`, `toString()`, `compareTo()`.

```java
public class EnumeratedTypeDemo {
    static enum Day {SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY};

    public static void main(String[] args) {
        Day day1 = Day.FRIDAY;    // FRIDAY is at index 5
        Day day2 = Day.THURSDAY;  // THURSDAY is at index 4
        System.out.println(day1.name());          // "FRIDAY"
        System.out.println(day2.name());          // "THURSDAY"
        System.out.println(day1.ordinal());       // 5 (zero-indexed)
        System.out.println(day2.ordinal());       // 4
        System.out.println(day1.equals(day2));    // false
        System.out.println(day1.toString());      // "FRIDAY"
        System.out.println(day1.compareTo(day2)); // 1 (FRIDAY - THURSDAY = 5 - 4)
    }
}
```

**جدول دوال `enum`:**
| الدالة | النوع المُرجَع | الوصف |
|--------|--------------|-------|
| `name()` | `String` | اسم الثابت كنص |
| `ordinal()` | `int` | موضع الثابت (يبدأ من 0) |
| `equals(obj)` | `boolean` | مقارنة بثابت آخر |
| `toString()` | `String` | مثل `name()` |
| `compareTo(other)` | `int` | الفرق في الـ `ordinal` |
| `values()` | `EnumType[]` | مصفوفة بكل الثوابت |
| `valueOf(str)` | `EnumType` | الثابت من اسمه النصي |

---

#### 5.3. `enum` مع `switch` والمصفوفة

```java
class EnumDemo1 {
    enum Apple {Jonathan, GoldenDel, RedDel, Winesap, Cortland}

    public static void main(String args[]) {
        Apple ap;
        ap = Apple.RedDel;
        System.out.println("Value of ap: " + ap); // "RedDel"

        ap = Apple.GoldenDel;
        if (ap == Apple.GoldenDel)                // Direct comparison
            System.out.println("ap contains GoldenDel.");

        switch (ap) {                             // enum in switch
            case Jonathan:    System.out.println("Jonathan is red."); break;
            case GoldenDel:   System.out.println("Golden Delicious is yellow."); break;
            case RedDel:      System.out.println("Red Delicious is red."); break;
            case Winesap:     System.out.println("Winesap is red."); break;
            case Cortland:    System.out.println("Cortland is red."); break;
        }
    }
}
```

---

#### 5.4. الحصول على كل قيم `enum` — `values()` و `valueOf()`

```java
enum Apple {Jonathan, GoldenDel, RedDel, Winesap, Cortland}

class EnumDemo2 {
    public static void main(String args[]) {
        Apple ap;
        System.out.println("Here are all Apple constants:");
        Apple allApples[] = Apple.values(); // All constants as array
        for (Apple a : allApples)
            System.out.println(a);          // Iterates all values

        ap = Apple.valueOf("Winesap");      // Get by name string
        System.out.println("ap contains " + ap); // "Winesap"
    }
}
```

---

#### 5.5. `enum` مع حقول وباني (`Constructor` و `Fields`)

**النص الأصلي يقول:** يمكن لـ `enum` أن يحتوي حقولاً خاصة وبانياً ودوالاً.

```java
enum AppleE {
    Jonathan(10), GoldenDel(9), RedDel(12), Winesap(15), Cortland(8); // Values with prices

    private int price;                // Private field
    AppleE(int p) { price = p; }     // Constructor (always private implicitly)
    int getPrice() { return price; } // Getter method
}

class EnumDemo3 {
    public static void main(String args[]) {
        AppleE ap;
        // Access field via method
        System.out.println("Winesap costs " + AppleE.Winesap.getPrice() + " cents.\n");

        // Iterate all values and their prices
        System.out.println("All apple prices:");
        for (AppleE a : AppleE.values())
            System.out.println(a + " costs " + a.getPrice() + " cents.");
    }
}
```

**الناتج المتوقع:**
> `Winesap costs 15 cents.`
> `Jonathan costs 10 cents.`
> `GoldenDel costs 9 cents.`
> `RedDel costs 12 cents.`
> `Winesap costs 15 cents.`
> `Cortland costs 8 cents.`

#### مهم للامتحان ⚠️:
> باني الـ `enum` **دائماً** خاص (يُعامَل كـ `private`) — لا يمكن إنشاء نسخة من `enum` خارجياً بـ `new`.

**مثال من الامتحان:**
> *What is the ordinal of FRIDAY in: enum Day {SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY}?*
> نوع السؤال: حسابي — يختبر فهم الترقيم من الصفر.


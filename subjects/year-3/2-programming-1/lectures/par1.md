# المحاضرة 12 — Java Basics (أساسيات جافا)
> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** مقدمة جافا، البرمجة الأولية (Elementary Programming)، الجمل الشرطية والحلقات (Selections & Loops)، الدوال (Methods)، المصفوفات (Arrays)، الاسترجاع (Recursion)، JShell

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مقدمة عن جافا

#### 1.1. أهمية وانتشار جافا
**النص الأصلي يقول:** أكثر من ثلث مبرمجي العالم (حوالي 5.2 مليون) يستخدمون `Java`، وتُشغّل أكثر من 52% من خدمات الـ back-end، ويستخدمها 90% من شركات Fortune 500، ومواقع مثل Google وYouTube وLinkedIn وAmazon وeBay.
**الشرح المبسّط:** جافا لغة برمجة منتشرة جداً في الصناعة، خاصة في تطوير الأنظمة الخلفية للمواقع الكبرى، وتُعد من أكثر اللغات طلباً في سوق العمل.

**💡 التشبيه:**
> جافا أشبه بلغة إنجليزية عالمية في عالم البرمجة — يفهمها الجميع تقريباً.
> **وجه الشبه:** الانتشار العالمي = التوظيف والاستخدام الواسع.

**مثال من الامتحان:**
Q: "Which of the following is NOT typically associated with Java's industry usage?"
توضيح: سؤال مقارنة بسيط لاختبار حفظ حقائق الانتشار (نوع مقارنات).

---

#### 1.2. نشأة جافا والمصطلحات الأساسية
**النص الأصلي يقول:** طوّرها `James Gosling` و`Bill Joy`، وتحوّل اسمها من `Oak` إلى `Java`. من مفاهيمها الأساسية: `Applets`, `JVM`, `JIT`, `Garbage Collector`, `Threads`, `Java bytecode verifier`, `Class loaders`, `security managers`.
**الشرح المبسّط:** جافا بدأت باسم Oak لبرمجة الأجهزة الاستهلاكية، ثم تطورت لتشغيل تطبيقات الإنترنت. تعتمد على آلة افتراضية (`JVM`) تجعلها قابلة للتنفيذ على أي نظام تشغيل.

**💡 التشبيه:**
> `JVM` أشبه بمترجم فوري يقف بين الكود وأي جهاز كمبيوتر — يفهم الكود ويحوّله لتعليمات يفهمها الجهاز مهما كان نوعه.
> **وجه الشبه:** المترجم الفوري = آلة جافا الافتراضية (write once, run anywhere).

#### مهم للامتحان ⚠️:
> `JVM` (Java Virtual Machine) هي المسؤولة عن مبدأ "اكتب مرة، شغّل في أي مكان" — سؤال شائع جداً.

**مثال من الامتحان:**
Q: "What does JVM stand for and what is its main role?"
توضيح: سؤال نظري تعريفي مباشر — نوع «نظري منظم».

---

#### 1.3. المكونات البرمجية: JDK وIDE
**النص الأصلي يقول:** بنية `Java` مُعرّفة في `Java Language Specification`، ومكتبة جافا مُعرّفة في `Java API`. `JDK` (Java Development Toolkit) هو البرنامج الذي يُستخدم لتطوير وتشغيل برامج جافا. `IDE` (Integrated Development Environment) بيئة تطوير متكاملة لتسريع كتابة البرامج.
**الشرح المبسّط:** `JDK` يحتوي كل الأدوات اللازمة (المترجم، المكتبات)، بينما `IDE` هو البرنامج الذي نكتب فيه الكود بشكل مريح (مثل Eclipse أو IntelliJ).

**جدول: تعريفات**
| المصطلح | التعريف |
| --- | --- |
| `Java Language Specification` | يحدد قواعد بناء جملة اللغة (syntax) |
| `Java API` | مكتبة الأصناف الجاهزة (application program interface) |
| `JDK` | أدوات تطوير وتشغيل برامج جافا |
| `IDE` | بيئة تطوير متكاملة لتسريع كتابة البرامج |

**مثال من الامتحان:**
Q: "What is the difference between the JDK and an IDE?"
توضيح: سؤال مقارنة (compare_analyze).

---

### 2. أول برنامج جافا (Welcome.java)

#### 2.1. بنية البرنامج الأساسية
**النص الأصلي يقول:** يُنفَّذ برنامج جافا بدءاً من التابع `main` داخل الصنف (`class`).
```java
// LISTING 1.1 Welcome.java
public class Welcome {
    public static void main(String[] args) {
        // Display message Welcome to Java! on the console
        System.out.println("Welcome to Java!");
    }
}
```

#### شرح كل سطر:
1. `public class Welcome` → تعريف الصنف — كل ملف جافا يحتاج صنفاً عاماً بنفس اسم الملف.
2. `public static void main(String[] args)` → نقطة دخول البرنامج — أول تابع يُنفَّذ عند التشغيل.
3. `System.out.println("Welcome to Java!");` → طباعة نص — يعرض السطر على الشاشة (console).

**الناتج المتوقع (لقطة الشاشة):**
> `Welcome to Java!`

#### مهم للامتحان ⚠️:
> يجب أن يتطابق اسم الملف مع اسم الصنف العام (public class) بالضبط بما فيها حالة الأحرف.

**مثال من الامتحان:**
Q: "Which method is the entry point of every Java application?"
توضيح: سؤال حفظ مباشر — أساسي في كل امتحانات جافا.

---

#### 2.2. أوامر الترجمة والتشغيل (Commands)
**النص الأصلي يقول:** تُترجم البرامج عبر `javac Welcome.java` ثم تُشغَّل عبر `java Welcome`.

```algorithm
1 | كتابة الكود | محرر نصوص | حفظ الملف باسم Welcome.java
2 | الترجمة | javac | تحويل الكود المصدري إلى bytecode (Welcome.class)
3 | التشغيل | java | تنفيذ الـ bytecode عبر JVM
```

**🛠️ استكشاف الأخطاء**
| الخطأ | السبب | الحل |
| --- | --- | --- |
| `'javac' not recognized` | متغير `PATH` غير مضبوط | إضافة مسار JDK إلى PATH |
| Class not found | تنفيذ اسم ملف بدل اسم الصنف | استخدام `java Welcome` وليس `java Welcome.java` |

**مثال من الامتحان:**
Q: "Which command compiles a Java source file into bytecode?"
أ) `java` ب) `javac` ج) `jshell` د) `jar`
توضيح: سؤال أوامر تنفيذ (commands) — سيناريو تتبع خطوات الترجمة والتشغيل.

---

#### 2.3. برنامج GUI بسيط
**النص الأصلي يقول:** يمكن استخدام `javax.swing.*` لإنشاء واجهة رسومية بسيطة تعرض نافذة (`JFrame`) وعنوان (`JLabel`).
```java
import javax.swing.*;
public class HelloJava {
    public static void main( String[] args ) {
        JFrame frame = new JFrame( "Hello, Java!" ); // create window
        JLabel label = new JLabel("Hello, Java!", JLabel.CENTER ); // create label
        frame.add(label); // add label to window
        frame.setSize( 300, 300 ); // set window size
        frame.setVisible( true ); // show window
    }
}
```
**المكتبات المطلوبة:**
> `import javax.swing.*;`

**مثال من الامتحان:**
Q: "Which class is used to create a graphical window (frame) in Java Swing?"
توضيح: سؤال تعريفي بسيط ضمن جزء الأخطاء الشائعة/GUI.

---

#### 2.4. عدة أوامر طباعة
**النص الأصلي يقول:** يمكن استخدام أكثر من `System.out.println` متتاليةً لطباعة عدة أسطر.
```java
// LISTING 1.2 WelcomeWithThreeMessages.java
public class WelcomeWithThreeMessages {
    public static void main(String[ ] args) {
        System.out.println("Programming is fun!");
        System.out.println("Fundamentals First");
        System.out.println("Problem Driven");
    }
}
```
**الناتج المتوقع:**
> Programming is fun!
> Fundamentals First
> Problem Driven

---

#### 2.5. حساب تعبير رياضي
**النص الأصلي يقول:** يمكن طباعة نتيجة تعبير حسابي مباشرة.
```java
// LISTING 1.3 ComputeExpression.java
public class ComputeExpression {
    public static void main(String[] args) {
        System.out.println((10.5 + 2 * 3) / (45 - 3.5));
    }
}
```
**الناتج المتوقع:** `0.39759036144578314`

**🤔 تفعيل الفهم**
> **سؤال:** ما أولوية العمليات (operator precedence) هنا؟
> **لماذا هذا مهم؟** الضرب `*` يُنفَّذ قبل الجمع `+`، وهذا مصدر شائع لأخطاء منطقية في الامتحان.

---

### 3. أنواع الأخطاء البرمجية (Programming Errors)

#### 3.1. تصنيف الأخطاء
**النص الأصلي يقول:** تُصنَّف أخطاء البرمجة إلى ثلاثة أنواع: `syntax errors`, `runtime errors`, `logic errors`.

**جدول: مقارنات**
| نوع الخطأ | متى يظهر | مثال من المحاضرة |
| --- | --- | --- |
| `Syntax Error` | أثناء الترجمة (compile-time) | نسيان علامة اقتباس: `"Welcome to Java` |
| `Runtime Error` | أثناء التشغيل | القسمة على صفر: `1 / 0` |
| `Logic Error` | البرنامج يعمل لكن النتيجة خاطئة | `9 / 5` تُعطي `1` بدل `1.8` (قسمة أعداد صحيحة) |

#### الفهم الخاطئ الشائع ❌:
> الاعتقاد أن `9 / 5` في جافا يُعطي `1.8` تلقائياً.
#### الفهم الصحيح ✅:
> عند قسمة عددين صحيحين (`int`)، تكون النتيجة عدداً صحيحاً (الجزء العشري يُقتَطع)؛ يجب استخدام `9.0 / 5` للحصول على نتيجة عشرية دقيقة.

**مثال من الامتحان:**
Q: "What is the output of `System.out.println(9 / 5);` in Java?"
أ) `1.8` ب) `1` ج) `2` د) Compile error
توضيح: سؤال تتبع كود (code scenario) شائع جداً حول القسمة الصحيحة.

---

### 4. البرمجة الأولية (Elementary Programming)

#### 4.1. المتغيرات والأنواع الأساسية
**النص الأصلي يقول:** برنامج `ComputeArea` يوضح تعريف متغيرات `double` وحساب مساحة الدائرة.
```java
public class ComputeArea {
    public static void main(String[] args) {
        double radius;
        double area;
        radius = 20;
        area = radius * radius * 3.14159;
        System.out.println("The area for the circle " + radius + " is " + area);
    }
}
```
**الشرح المبسّط:** يجب تعريف نوع المتغير (`double`) قبل استخدامه، ويمكن إسناد قيمة له لاحقاً.

---

#### 4.2. قراءة المدخلات من لوحة المفاتيح (Scanner)
**النص الأصلي يقول:** يُستخدم الصنف `Scanner` لقراءة قيم من المستخدم عبر `System.in`.
```java
import java.util.Scanner;
public class ComputeAreaWithConsoleInput {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in); // create Scanner object
        System.out.print("Enter a number for radius: ");
        double radius = input.nextDouble(); // read a double value
        double area = radius * radius * 3.14159;
        System.out.println("The area for the circle " + radius + " is " + area);
    }
}
```
**جدول: مكونات — توابع Scanner**
| التابع | الوصف |
| --- | --- |
| `nextByte()` | يقرأ عدداً صحيحاً من نوع `byte` |
| `nextShort()` | يقرأ عدداً صحيحاً من نوع `short` |
| `nextInt()` | يقرأ عدداً صحيحاً من نوع `int` |
| `nextLong()` | يقرأ عدداً صحيحاً من نوع `long` |
| `nextFloat()` | يقرأ عدداً من نوع `float` |
| `nextDouble()` | يقرأ عدداً من نوع `double` |

**💡 التشبيه:**
> `Scanner` أشبه بموظف استقبال ينتظر منك أن تُملي عليه رقماً ليكتبه بدقة.
> **وجه الشبه:** الانتظار وقراءة المُدخل = عمل `input.nextDouble()`.

**مثال من الامتحان:**
Q: "Which method reads an integer value from the keyboard using Scanner?"
توضيح: سؤال مراجعة سريعة (qa_inline).

---

#### 4.3. الثوابت (final) والدقة العشرية
**النص الأصلي يقول:** يمكن تعريف ثابت باستخدام `final double PI = 3.14159;` بدل كتابة الرقم مباشرة.
```java
import java.util.Scanner;
public class ComputeAreaWithConstant {
    public static void main(String[] args) {
        final double PI = 3.14159; // constant declaration
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a number for radius: ");
        double radius = input.nextDouble();
        double area = radius * radius * PI;
        System.out.println("The area for the circle " + radius + " is " + area);
    }
}
```
#### نقطة مهمة ⚠️:
> الكلمة المفتاحية `final` تمنع تغيير قيمة المتغير بعد تعريفه — أي محاولة لإعادة إسناد قيمة له تُسبب خطأ ترجمة.

---

#### 4.4. الأنواع العددية والعمليات
**النص الأصلي يقول:** لدى جافا ستة أنواع عددية للأعداد الصحيحة والعشرية، مع العمليات `+ - * / %`.

**جدول: مقارنات — Numeric Data Types**
| النوع | المدى | الحجم |
| --- | --- | --- |
| `byte` | $-2^7$ إلى $2^7-1$ (−128 إلى 127) | 8-bit |
| `short` | $-2^{15}$ إلى $2^{15}-1$ | 16-bit |
| `int` | $-2^{31}$ إلى $2^{31}-1$ | 32-bit |
| `long` | $-2^{63}$ إلى $2^{63}-1$ | 64-bit |
| `float` | نطاق واسع (تقريبي) | 32-bit IEEE 754 |
| `double` | نطاق أوسع وأدق | 64-bit IEEE 754 |

**مثال من الامتحان:**
Q: "Which numeric type occupies 64 bits and follows IEEE 754 for integer-like precision needs?"
توضيح: تمييز بين `long` (صحيح 64-bit) و`double` (عشري 64-bit) — نقطة تُربك الطلاب كثيراً.

---

#### 4.5. دراسة حالة: عرض الوقت الحالي
**النص الأصلي يقول:** يمكن استدعاء `System.currentTimeMillis()` لإرجاع الوقت الحالي بالميلي ثانية منذ 1970، ثم تحويله لساعات ودقائق وثوانٍ.
```java
public class ShowCurrentTime {
    public static void main(String[] args) {
        long totalMilliseconds = System.currentTimeMillis();
        long totalSeconds = totalMilliseconds / 1000;
        long currentSecond = totalSeconds % 60;
        long totalMinutes = totalSeconds / 60;
        long currentMinute = totalMinutes % 60;
        long totalHours = totalMinutes / 60;
        long currentHour = totalHours % 24;
        System.out.println("Current time is " + currentHour + ":"
            + currentMinute + ":" + currentSecond + " GMT");
    }
}
```
#### ⚙️ الخطوات / الخوارزمية: استخراج الساعة والدقيقة والثانية

##### ما هدف هذه العملية؟
> تحويل عدد الميلي ثوانٍ الكلي إلى صيغة وقت (ساعة:دقيقة:ثانية) باستخدام القسمة والباقي.

```algorithm
1 | حساب الثواني الكلية | totalSeconds = ms / 1000 | تجاهل الميلي ثانية
2 | استخراج الثانية الحالية | totalSeconds % 60 | باقي القسمة على 60
3 | حساب الدقائق الكلية | totalSeconds / 60 | القسمة الصحيحة
4 | استخراج الدقيقة الحالية | totalMinutes % 60 | باقي القسمة على 60
5 | حساب الساعات الكلية | totalMinutes / 60 | القسمة الصحيحة
6 | استخراج الساعة الحالية | totalHours % 24 | باقي القسمة على 24
```

**مثال من الامتحان:**
Q: "Why is the modulus operator `%` used repeatedly in the time conversion algorithm?"
توضيح: سؤال تطبيقي (hands_on) — يربط المفهوم بالسبب العملي.

---

#### 4.6. تحويل الأنواع العددية (Casting)
**النص الأصلي يقول:** يمكن تحويل الأعداد العشرية إلى صحيحة باستخدام `casting` صريح، كما في مثال `SalesTax`.
```java
import java.util.Scanner;
public class SalesTax {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter purchase amount: ");
        double purchaseAmount = input.nextDouble();
        double tax = purchaseAmount * 0.06; // 11.853
        System.out.println("Sales tax is $" + (int)(tax * 100) / 100.0);
    }
}
```
**الناتج المتوقع:**
> Enter purchase amount: 197.55
> Sales tax is $11.85

#### 🔄 قبل / بعد: التقريب لخانتين عشريتين
**قبل:**
```java
double tax = 11.853;
```
**بعد:**
```java
(int)(tax * 100) / 100.0 // = 11.85
```
**ماذا تغيّر؟** ضرب في 100 ثم `casting` إلى `int` لحذف الكسور ثم القسمة على 100.0 لإرجاع القيمة العشرية بخانتين فقط.

---

### 5. مراحل تطوير البرمجيات (Software Development Process)

#### 5.1. المراحل السبع
**النص الأصلي يقول:** دورة تطوير البرمجيات عملية متعددة المراحل: `Requirements Specification` → `System Analysis` → `System Design` → `Implementation` → `Testing` → `Deployment` → `Maintenance`.

```algorithm
1 | Requirements Specification | تحليل المتطلبات | تحديد ما يحتاجه المستخدم
2 | System Analysis | التحليل الرياضي/المنطقي | صياغة المعادلات والعلاقات
3 | System Design | التصميم | تحديد خطوات الحل خطوة بخطوة
4 | Implementation | كتابة الكود | ترجمة التصميم إلى برنامج فعلي
5 | Testing | الاختبار | التأكد من صحة النتائج بحالات متعددة
6 | Deployment | النشر | تسليم البرنامج للمستخدم النهائي
7 | Maintenance | الصيانة | تحديث البرنامج وإصلاح الأخطاء لاحقاً
```

**مثال من الامتحان:**
Q: "Which stage of the software development life cycle involves writing the actual Java code?"
توضيح: سؤال ترتيب/تسلسل مراحل — نوع تتبع خوارزمية.

---

#### 5.2. دراسة حالة: برنامج حساب القرض (Loan Payments)
**النص الأصلي يقول:** المتطلبات: إدخال الفائدة السنوية، مبلغ القرض، وعدد السنوات، ثم حساب الدفعة الشهرية والدفعة الإجمالية بالمعادلة:
$$monthlyPayment = \dfrac{loanAmount \times monthlyInterestRate}{1 - \dfrac{1}{(1+monthlyInterestRate)^{numberOfYears \times 12}}}$$
$$totalPayment = monthlyPayment \times numberOfYears \times 12$$

```java
import java.util.Scanner;
public class ComputeLoan {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter annual interest rate, e.g., 7.25%: ");
        double annualInterestRate = input.nextDouble();
        double monthlyInterestRate = annualInterestRate / 1200; // convert % to monthly rate
        System.out.print("Enter number of years as an integer, e.g., 5: ");
        int numberOfYears = input.nextInt();
        System.out.print("Enter loan amount, e.g., 120000.95: ");
        double loanAmount = input.nextDouble();
        double monthlyPayment = loanAmount * monthlyInterestRate /
            (1 - 1 / Math.pow(1 + monthlyInterestRate, numberOfYears * 12));
        double totalPayment = monthlyPayment * numberOfYears * 12;
        System.out.println("The monthly payment is $" + (int)(monthlyPayment * 100) / 100.0);
        System.out.println("The total payment is $" + (int)(totalPayment * 100) / 100.0);
    }
}
```
#### شرح كل سطر:
1. `annualInterestRate / 1200` → تحويل النسبة السنوية % إلى معدل شهري عشري (÷100 للنسبة، ÷12 للأشهر).
2. `Math.pow(1 + monthlyInterestRate, numberOfYears * 12)` → حساب الفائدة المركبة عبر الأس.
3. `(int)(monthlyPayment * 100) / 100.0` → تقريب لخانتين عشريتين كما سبق.

**الناتج المتوقع:**
> Enter annual interest rate, e.g., 7.25%: 5.75
> Enter number of years as an integer, e.g., 5: 15
> Enter loan amount, e.g., 120000.95: 250000
> The monthly payment is $2076.02
> The total payment is $373684.53

**مثال من الامتحان:**
Q: "Why do we divide the annual interest rate by 1200 instead of 100 in the loan program?"
توضيح: سؤال تطبيقي عملي يختبر فهم العلاقة بين % والأشهر الـ12 — منطق شائع الخطأ.

---

#### 5.3. دراسة حالة: تفكيك مبلغ نقدي (Counting Monetary Units)
**النص الأصلي يقول:** برنامج يُفكِّك مبلغاً نقدياً إلى وحدات (دولارات، أرباع، عشرات سنت، خمسات سنت، بنسات) — مثال: إدخال `11.56` يُعطي `11 dollars, 2 quarters, 0 dimes, 1 nickels, 1 pennies`.
**الشرح المبسّط:** يعتمد الحل على القسمة الصحيحة والباقي (`/` و `%`) بشكل متسلسل لكل وحدة نقدية من الأكبر إلى الأصغر.

**🤔 تفعيل الفهم**
> **سؤال:** لماذا نبدأ بالدولار (أكبر وحدة) أولاً؟
> **لماذا هذا مهم؟** حتى نضمن استخدام أقل عدد من القطع النقدية الأصغر لاحقاً (نفس فكرة الخوارزمية الجشعة greedy algorithm).

---

### 6. الجمل الشرطية والحلقات (Selections and Loops)

#### 6.1. نوع البيانات المنطقي boolean
**النص الأصلي يقول:** يُعرِّف النوع `boolean` متغيراً بقيمة `true` أو `false` فقط.
```java
// LISTING 3.2 SimpleIfDemo.java
import java.util.Scanner;
public class SimpleIfDemo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Enter an integer: ");
        int number = input.nextInt();
        if (number % 5 == 0)
            System.out.println("HiFive");
        if (number % 2 == 0)
            System.out.println("HiEven");
    }
}
```
**💡 التشبيه:**
> `boolean` أشبه بمفتاح كهرباء له وضعان فقط: تشغيل أو إطفاء.
> **وجه الشبه:** التشغيل/الإطفاء = `true`/`false`.

---

#### 6.2. توليد أرقام عشوائية
**النص الأصلي يقول:** يمكن استخدام `Math.random()` للحصول على قيمة عشرية عشوائية بين `0.0` و`1.0` (باستثناء 1.0).
```java
import java.util.Scanner;
public class SubtractionQuiz {
    public static void main(String[] args) {
        int number1 = (int)(Math.random() * 10);
        int number2 = (int)(Math.random() * 10);
        if (number1 < number2) { // ensure number1 >= number2
            int temp = number1;
            number1 = number2;
            number2 = temp;
        }
        System.out.print("What is" + number1 + "-" + number2 + "? ");
        Scanner input = new Scanner(System.in);
        int answer = input.nextInt();
        if (number1 - number2 == answer)
            System.out.println("You are correct!");
        else {
            System.out.println("Your answer is wrong.");
            System.out.println(number1 + " - " + number2
                + " should be " + (number1 - number2));
        }
    }
}
```
#### مهم للامتحان ⚠️:
> صيغة `(int)(Math.random() * n)` تُولّد عدداً صحيحاً من `0` إلى `n-1`.

**مثال من الامتحان:**
Q: "What range of integers does `(int)(Math.random() * 10)` produce?"
أ) 1–10 ب) 0–9 ج) 0–10 د) 1–9
توضيح: سؤال شائع جداً وله سوء فهم متكرر.

---

#### 6.3. دراسة حالة: مؤشر كتلة الجسم (BMI) — if متداخلة
**النص الأصلي يقول:** يمكن استخدام جمل `if` متداخلة لتفسير مؤشر كتلة الجسم.

**جدول: مقارنات — تفسير BMI**
| المدى | التفسير |
| --- | --- |
| `BMI < 18.5` | Underweight |
| `18.5 ≤ BMI < 25.0` | Normal |
| `25.0 ≤ BMI < 30.0` | Overweight |
| `30.0 ≤ BMI` | Obese |

```java
import java.util.Scanner;
public class ComputeAndInterpretBMI {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter weight : ");
        double weight = input.nextDouble();
        System.out.print("Enter height : ");
        double height = input.nextDouble();
        double bmi = weight / (height * height); // BMI formula
        System.out.println("BMI is " + bmi);
        if (bmi < 18.5)
            System.out.println("Underweight");
        else if (bmi < 25)
            System.out.println("Normal");
        else if (bmi < 30)
            System.out.println("Overweight");
        else
            System.out.println("Obese");
    }
}
```

---

#### 6.4. دراسة حالة: تحديد السنة الكبيسة (Leap Year) — العوامل المنطقية
**النص الأصلي يقول:** السنة كبيسة إذا قُسِمت على 4 ولم تُقسَم على 100، أو إذا قُسِمت على 400.

**جدول: مقارنات — العوامل المنطقية**
| العامل | الاسم | الوصف |
| --- | --- | --- |
| `!` | not | نفي منطقي |
| `&&` | and | اقتران منطقي |
| `\|\|` | or | فصل منطقي |
| `^` | xor | استبعاد منطقي |

```java
import java.util.Scanner;
public class LeapYear {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a year: ");
        int year = input.nextInt();
        boolean isLeapYear = (year % 4 == 0 && year % 100 != 0)
            || (year % 400 == 0);
        System.out.println(year + " is a leap year? " + isLeapYear);
    }
}
```

**مثال من الامتحان:**
Q: "Is the year 1900 a leap year according to this program? Why?"
توضيح: سؤال تتبع منطقي (logic_entailment) — 1900 قابلة للقسمة على 100 لكن ليس 400.

---

#### 6.5. دراسة حالة: اليانصيب (Lottery) — if متعددة
**النص الأصلي يقول:** برنامج يقارن رقم يانصيب عشوائي مكوّن من رقمين مع تخمين المستخدم، ويحدد نوع الفوز.
```java
import java.util.Scanner;
public class Lottery {
    public static void main(String[] args) {
        int lottery = (int)(Math.random() * 100);
        Scanner input = new Scanner(System.in);
        System.out.print("Enter your lottery pick (two digits): ");
        int guess = input.nextInt();
        int lotteryDigit1 = lottery / 10;
        int lotteryDigit2 = lottery % 10;
        int guessDigit1 = guess / 10;
        int guessDigit2 = guess % 10;
        System.out.println("The lottery number is " + lottery);
        if (guess == lottery)
            System.out.println("Exact match: you win $10,000");
        else if (guessDigit2 == lotteryDigit1 && guessDigit1 == lotteryDigit2)
            System.out.println("Match all digits: you win $3,000");
        else if (guessDigit1 == lotteryDigit1
                || guessDigit1 == lotteryDigit2
                || guessDigit2 == lotteryDigit1
                || guessDigit2 == lotteryDigit2)
            System.out.println("Match one digit: you win $1,000");
        else
            System.out.println("Sorry, no match");
    }
}
```

---

#### 6.6. جملة switch
**النص الأصلي يقول:** يمكن استخدام `switch` بدل سلسلة طويلة من `if-else`، كما في مثال `ChineseZodiac`.
```java
import java.util.Scanner;
public class ChineseZodiac {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a year: ");
        int year = input.nextInt();
        switch (year % 12) {
            case 0: System.out.println("monkey"); break;
            case 1: System.out.println("rooster"); break;
            case 2: System.out.println("dog"); break;
            case 3: System.out.println("pig"); break;
            case 4: System.out.println("rat"); break;
            case 5: System.out.println("ox"); break;
            case 6: System.out.println("tiger"); break;
            case 7: System.out.println("rabbit"); break;
            case 8: System.out.println("dragon"); break;
            case 9: System.out.println("snake"); break;
            case 10: System.out.println("horse"); break;
            case 11: System.out.println("sheep");
        }
    }
}
```
#### مهم للامتحان ⚠️:
> نسيان `break` يسبب "fall-through" — تنفيذ كل الحالات التالية دون توقف.

**مثال من الامتحان:**
Q: "What happens if the `break` statement is removed from a `case` in a switch statement?"
توضيح: خطأ منطقي شائع جداً (fall-through) — نوع اكتشف الخطأ.

---

#### 6.7. النوع char والعمليات عليه
**النص الأصلي يقول:** جدول رموز ASCII: `'0'-'9'` = 48–57، `'A'-'Z'` = 65–90، `'a'-'z'` = 97–122. يمكن إجراء عمليات حسابية على `char` لأنه يُمثَّل داخلياً كعدد صحيح.
```java
int i = '2' + '3'; // (int)'2' is 50 and (int)'3' is 51
System.out.println("i is " + i); // i is 101
int j = 2 + 'a';   // (int)'a' is 97
System.out.println("j is " + j); // j is 99
```
**توابع مساعدة:** `isDigit(ch)`, `isLetter(ch)`, `isLetterOrDigit(ch)`, `isLowerCase(ch)`, `isUpperCase(ch)`, `toLowerCase(ch)`, `toUpperCase(ch)`.

**مثال من الامتحان:**
Q: "What is the value of `int i = '2' + '3';` in Java?"
أ) `5` ب) `"23"` ج) `101` د) Compile error
توضيح: سؤال تتبع كود شائع حول ASCII arithmetic.

---

#### 6.8. الصنف Math
**النص الأصلي يقول:** يوفر الصنف `Math` توابع مثلثية (`sin, cos, tan`)، أُسّية (`exp, log, pow, sqrt`)، تقريبية (`ceil, floor, round`)، وتوابع `min, max, abs`.
```java
Math.max(2, 3);      // returns 3
Math.max(2.5, 3);     // returns 4.0
Math.min(2.5, 4.6);   // returns 2.5
Math.abs(-2);         // returns 2
Math.abs(-2.1);       // returns 2.1
```

**مثال من الامتحان:**
Q: "What is the value of `Math.max(2.5, 3)` in Java?"
توضيح: سؤال دقيق حول تحويل الأنواع الضمني عند الأنواع المختلطة.

---

#### 6.9. الصنف String
**النص الأصلي يقول:** توابع `String` الأساسية: `length()`, `charAt(index)`, `concat(s1)`, `toUpperCase()`, `toLowerCase()`, `trim()`، توابع المقارنة: `equals(s1)`, `equalsIgnoreCase(s1)`, `compareTo(s1)`, `startsWith(prefix)`, `endsWith(suffix)`, `contains(s1)`، وتوابع البحث عن نص فرعي: `indexOf`, `lastIndexOf`. والتحويل بين النصوص والأرقام: `Integer.parseInt(intString)` و`Double.parseDouble(doubleString)`.

**جدول: تعريفات**
| التابع | الوصف |
| --- | --- |
| `equals(s1)` | مقارنة محتوى النصوص (حساس لحالة الأحرف) |
| `equalsIgnoreCase(s1)` | مقارنة بدون حساسية لحالة الأحرف |
| `compareTo(s1)` | مقارنة أبجدية تُرجع عدداً صحيحاً |

#### الفهم الخاطئ الشائع ❌:
> استخدام `==` لمقارنة محتوى نصين.
#### الفهم الصحيح ✅:
> يجب استخدام `.equals()` لمقارنة محتوى الكائنات من نوع `String`؛ `==` يقارن المرجع (reference) وليس القيمة.

**مثال من الامتحان:**
Q: "Why should you avoid using `==` to compare two String objects in Java?"
توضيح: من أكثر أسئلة الفهم الخاطئ شيوعاً في جافا.

---

#### 6.10. تنسيق الإخراج: printf و DecimalFormat
**النص الأصلي يقول:** يمكن تنسيق الإخراج عبر `System.out.printf()` أو الصنف `DecimalFormat`.
```java
double price = 1.215962441314554;
System.out.printf("%.2f", price);   // 1.22
System.out.printf("%10.2f", price); // -------1.22 (محاذاة يمين بعرض 10)
```
**جدول: تعريفات — Format Specifiers**
| الصيغة | مثال الناتج | الشرح |
| --- | --- | --- |
| `%d` | 24 | لعدد صحيح |
| `%5d` | " 24" | عرض حقل 5 |
| `%f` | 1.21997 | لعدد عشري |
| `%.2f` | 1.22 | خانتان عشريتان |
| `%s` | Hello | لنص |

```java
import java.text.*;
DecimalFormat numform = new DecimalFormat("0.00");
numform.format(13.456); // "13.46"
```

**مثال من الامتحان:**
Q: "Which format specifier is used to print a floating-point number with exactly two decimal digits using `printf`?"
توضيح: سؤال تطبيق مباشر.

---

#### 6.11. جمل الحلقات (Loop Statements)
**النص الأصلي يقول:** أربعة أنواع حلقات: `while`, `for`, `do-while`, والحلقة المُحسَّنة `for-each` على المصفوفات/المجموعات.

**جدول: مقارنات — أنواع الحلقات**
| النوع | متى يُستخدم |
| --- | --- |
| `while` | عدد التكرارات غير معروف مسبقاً، والشرط يُفحص قبل التنفيذ |
| `for` | عدد التكرارات معروف عادةً (عدّاد واضح) |
| `do-while` | يجب تنفيذ الجسم مرة واحدة على الأقل قبل فحص الشرط |
| `for-each` | المرور على كل عنصر في مصفوفة/مجموعة بدون فهرس صريح |

```java
// while
while (balance < TARGET) {
    year++;
    balance = balance * (1 + rate / 100);
}
// for
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
// do-while
do {
    System.out.print("Enter a positive integer: ");
    input = in.nextInt();
} while (input <= 0);
// for-each
for (double value : values) {
    sum = sum + value;
}
```

**⚖️ المقايضة: for مقابل while**
| | `for` | `while` |
| --- | --- | --- |
| المزايا | تجميع التهيئة والشرط والتحديث في سطر واحد | مرونة أكبر مع شروط معقدة |
| العيوب | أقل مرونة للحالات غير العددية | يسهل نسيان تحديث المتغير (حلقة لا نهائية) |
| متى تختاره | عدد تكرارات معروف | عدد تكرارات غير معروف مسبقاً |

**مثال من الامتحان:**
Q: "Which loop guarantees the loop body executes at least once?"
توضيح: سؤال مقارنة كلاسيكي.

---

#### 6.12. دراسة حالة: مسابقة الجمع المتكررة
```java
import java.util.Scanner;
public class RepeatAdditionQuiz {
    public static void main(String[] args) {
        int number1 = (int)(Math.random() * 10);
        int number2 = (int)(Math.random() * 10);
        Scanner input = new Scanner(System.in);
        System.out.print("What is " + number1 + " + " + number2 + "? ");
        int answer = input.nextInt();
        while (number1 + number2 != answer) {
            System.out.print("Wrong answer. Try again. What is "
                + number1 + " + " + number2 + "? ");
            answer = input.nextInt();
        }
        System.out.println("You got it!");
    }
}
```
**الناتج المتوقع:**
> What is 5 + 9? 12
> Wrong answer. Try again. What is 5 + 9? 34
> Wrong answer. Try again. What is 5 + 9? 14
> You got it!

---

#### 6.13. دراسة حالة: خمّن الرقم (Guess Number)
```java
import java.util.Scanner;
public class GuessNumber {
    public static void main(String[] args) {
        int number = (int)(Math.random() * 100);
        Scanner input = new Scanner(System.in);
        System.out.println("Guess a magic number between 0 and 100");
        System.out.print("\nEnter your guess: ");
        int guess = input.nextInt();
        while (guess != number) {
            if (guess > number)
                System.out.println("Your guess is too high");
            else
                System.out.println("Your guess is too low");
            guess = input.nextInt();
        }
        System.out.println("Yes, the number is " + number);
    }
}
```

---

### 7. الملفات النصية (Text I/O) وطباعتها

#### 7.1. القراءة من ملف باستخدام class File وScanner
**النص الأصلي يقول:** يُستخدم الصنف `File` مع `Scanner` لقراءة الأعداد من ملف نصي، وتُلقى `FileNotFoundException` إذا لم يوجد الملف.
```java
import java.util.Scanner;
import java.io.*;
public class squares {
    public static void main(String[] args) throws FileNotFoundException {
        File myfile = new File("d:/myData1.txt");
        Scanner scan = new Scanner(myfile);
        int number, square;
        while (scan.hasNext()) {
            number = scan.nextInt();
            square = number * number;
            System.out.println(square);
        }
    }
}
```
**جدول: مقارنات — hasNext مقابل next**
| HasNext Method | Reading Method |
| --- | --- |
| `hasNext()` | `next()` |
| `hasNextDouble()` | `nextDouble()` |
| `hasNextInt()` | `nextInt()` |
| `hasNextLine()` | `nextLine()` |

**🛠️ استكشاف الأخطاء**
| الخطأ | السبب | الحل |
| --- | --- | --- |
| `FileNotFoundException` | مسار الملف غير صحيح | التأكد من مسار الملف وامتداده |
| `InputMismatchException` | نوع البيانات في الملف لا يطابق `nextInt()` مثلاً | استخدام `hasNextInt()` قبل `nextInt()` |

---

#### 7.2. الكتابة إلى ملف باستخدام PrintStream
```java
import java.io.*;
public class PrintToFile {
    public static void main(String[] args) throws FileNotFoundException {
        File myfile = new File("d:/myOutput.txt");
        PrintStream out = new PrintStream(myfile);
        out.println("xxxxxxxxxxxxxxxxxxxxx");
        out.close(); // must close to flush data
    }
}
```
#### مهم للامتحان ⚠️:
> يجب دائماً استدعاء `close()` بعد الكتابة إلى الملف لضمان حفظ البيانات فعلياً على القرص.

---

### 8. دراسة حالة: إيداع مالي بفائدة مركبة (While Loops متقدمة)

#### 8.1. متى يصبح المبلغ مليون دولار؟
```java
class MillionDollarYears {
    public static void main(String[] args) {
        double dollars = 1000.00;
        final double interest = 0.05;
        int year = 0;
        while (dollars < 1000000.00) {
            dollars = dollars + dollars * interest;
            year = year + 1;
        }
        System.out.println("It took " + year);
    }
}
```
**الناتج المتوقع:** `It took 142`

**🔍 تتبع التنفيذ: أول 3 سنوات**
**المدخل:** `dollars = 1000.00, interest = 0.05`
| السنة | الفائدة | الرصيد النهائي |
| --- | --- | --- |
| 1 | 1000×0.05=50 | 1050.00 |
| 2 | 1050×0.05=52.5 | 1102.50 |
| 3 | 1102.50×0.05=55.125 | 1157.625 |

**النتيجة:** بعد 142 سنة يتجاوز الرصيد المليون دولار.

---

### 9. الدوال (Methods)

#### 9.1. تعريف الدالة وأجزاؤها
**النص الأصلي يقول:** تتكون الدالة من: `modifier`, `return value type`, `method name`, `formal parameters` (تُشكّل معاً `method signature`), وجسم الدالة (`method body`) الذي ينتهي بـ `return`.
```java
public static int max(int num1, int num2) {
    int result;
    if (num1 > num2)
        result = num1;
    else
        result = num2;
    return result;
}
// Invoke a method
int z = max(x, y); // x, y = actual parameters (arguments)
```
#### نقطة مهمة ⚠️:
> التابع من نوع `void` لا يُرجع قيمة، بينما أي نوع آخر يجب أن يحتوي `return` بالقيمة المطابقة للنوع المُعلَن.

**💡 التشبيه:**
> الدالة أشبه بآلة صرّاف تأخذ مدخلات (عملة معدنية) وتُخرج نتيجة محددة (منتج).
> **وجه الشبه:** المدخلات = `parameters`، الناتج = `return value`.

**مثال من الامتحان:**
Q: "What are `num1` and `num2` called in the method declaration `max(int num1, int num2)`?"
أ) actual parameters ب) formal parameters ج) return values د) local variables
توضيح: تمييز بين formal وactual parameters — سؤال كلاسيكي.

---

#### 9.2. تحديث القيم عبر التوابع (Modularizing Code)
```java
public static int gcd(int n1, int n2) {
    int gcd = 1;
    int k = 2;
    while (k <= n1 && k <= n2) {
        if (n1 % k == 0 && n2 % k == 0)
            gcd = k;
        k++;
    }
    return gcd;
}
```
**الشرح المبسّط:** تجزئة البرنامج إلى دوال (`printPrimeNumbers`, `isPrime`) تسهّل الصيانة وإعادة الاستخدام — كما في مثال الأعداد الأولية.

#### الدرس المستفاد:
> فصل المنطق إلى دوال صغيرة (كل دالة تفعل شيئاً واحداً) يجعل الكود أسهل للاختبار والتعديل.

---

#### 9.3. تحميل الدوال الزائد (Overloading Methods)
**النص الأصلي يقول:** يمكن تعريف عدة دوال بنفس الاسم لكن بمعاملات مختلفة (`overloading`).
```java
public static int max(int num1, int num2) { ... }
public static double max(double num1, double num2) { ... }
public static double max(double num1, double num2, double num3) {
    return max(max(num1, num2), num3); // recursion-like reuse
}
```
#### مهم للامتحان ⚠️:
> يعتمد `overloading` على اختلاف عدد أو نوع المعاملات (`parameter list`)، وليس على نوع القيمة المُرجَعة فقط.

**مثال من الامتحان:**
Q: "Can two methods with the same name and same parameter types but different return types coexist in Java?"
توضيح: سؤال فهم خاطئ شائع جداً (compile error فعلياً) — نوع misconception.

---

#### 9.4. المعاملات المتغيرة العدد (Varargs)
```java
public static void printMax(double... numbers) {
    if (numbers.length == 0) {
        System.out.println("No argument passed");
        return;
    }
    double max = numbers[0];
    for (int i = 1; i < numbers.length; i++)
        if (numbers[i] > max) max = numbers[i];
    System.out.println("The max value is " + max);
}
```

---

### 10. المصفوفات (Arrays)

#### 10.1. تعريف وإنشاء المصفوفات
**النص الأصلي يقول:** المصفوفة (`Array`) هي متغير واحد يشير إلى مجموعة كبيرة من البيانات من نفس النوع.
```java
double[] myList;              // 1. Declaring
double[] myList = new double[10]; // 2. Creating
myList[0] = 5.6;
double[] myList = {5.6, 4.5, /*...*/ 11123}; // 3. Array Initializer
```
**جدول: تعريفات — القيم الافتراضية عند الإنشاء**
| نوع العنصر | القيمة الافتراضية |
| --- | --- |
| أنواع عددية | `0` |
| `char` | `'\u0000'` |
| `boolean` | `false` |

**مثال من الامتحان:**
Q: "What is the default value of an `int` array element right after creation with `new int[5]`?"
توضيح: سؤال حفظ مباشر شائع.

---

#### 10.2. تحليل الأعداد: عناصر أعلى من المتوسط
```java
public class AnalyzeNumbers {
    public static void main(String[] args) {
        java.util.Scanner input = new java.util.Scanner(System.in);
        System.out.print("Enter the number of items: ");
        int n = input.nextInt();
        double[] numbers = new double[n];
        double sum = 0;
        for (int i = 0; i < n; i++) {
            numbers[i] = input.nextDouble();
            sum += numbers[i];
        }
        double average = sum / n;
        int count = 0;
        for (int i = 0; i < n; i++)
            if (numbers[i] > average) count++;
        System.out.println("Average is " + average);
        System.out.println("Number of elements " + count);
    }
}
```

---

#### 10.3. خلط أوراق اللعب (Deck of Cards) — Fisher-Yates Shuffle
```java
public class DeckOfCards {
    public static void main(String[] args) {
        int[] deck = new int[52];
        String[] suits = {"Spades", "Hearts", "Diamonds", "Clubs"};
        String[] ranks = {"Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"};
        for (int i = 0; i < deck.length; i++) deck[i] = i;
        for (int i = 0; i < deck.length; i++) { // shuffle
            int index = (int)(Math.random() * deck.length);
            int temp = deck[i]; deck[i] = deck[index]; deck[index] = temp;
        }
        for (int i = 0; i < 52; i++) {
            String suit = suits[deck[i] / 13];
            String rank = ranks[deck[i] % 13];
            System.out.println("Card number " + deck[i] + ": " + rank + " of " + suit);
        }
    }
}
```
#### 🤔 تفعيل الفهم
> **سؤال:** لماذا `deck[i] / 13` يُعطي رقم الفئة (suit) و`deck[i] % 13` يُعطي الرتبة (rank)؟
> **لماذا هذا مهم؟** لأن كل فئة تحتوي 13 ورقة — القسمة الصحيحة والباقي يُستخدمان معاً لتفكيك رقم واحد إلى بُعدين.

---

#### 10.4. عدّ تكرار الحروف (Occurrences of Letters)
```java
public static int[] countLetters(char[] chars) {
    int[] counts = new int[26];
    for (int i = 0; i < chars.length; i++)
        counts[chars[i] - 'a']++; // char arithmetic as index
    return counts;
}
```

---

#### 10.5. البحث في المصفوفات: Linear Search و Binary Search
```java
public static int linearSearch(int[] list, int key) {
    for (int i = 0; i < list.length; i++)
        if (key == list[i]) return i;
    return -1;
}
public static int binarySearch(int[] list, int key) {
    int low = 0, high = list.length - 1;
    while (high >= low) {
        int mid = (low + high) / 2;
        if (key < list[mid]) high = mid - 1;
        else if (key == list[mid]) return mid;
        else low = mid + 1;
    }
    return -low - 1;
}
```
#### ⚠️ المصفوفة يجب أن تكون مرتبة مسبقاً قبل استخدام `binarySearch`.

**⚖️ المقايضة: Linear Search مقابل Binary Search**
| | `linearSearch` | `binarySearch` |
| --- | --- | --- |
| المزايا | يعمل على أي مصفوفة (غير مرتبة) | أسرع بكثير على المصفوفات الكبيرة $O(\log n)$ |
| العيوب | بطيء على المصفوفات الكبيرة $O(n)$ | يتطلب أن تكون المصفوفة مرتبة أولاً |
| متى تختاره | مصفوفة صغيرة أو غير مرتبة | مصفوفة كبيرة ومرتبة |

**مثال من الامتحان:**
Q: "Given `int[] list = {2, 4, 7, 10, 11, 45};`, what does `binarySearch(list, 3)` return?"
توضيح: سؤال تتبع خوارزمية دقيق — القيمة السالبة تشير لموقع الإدراج المناسب.

---

#### 10.6. الفرز بالاختيار (Selection Sort)
```java
public static void selectionSort(double[] list) {
    for (int i = 0; i < list.length - 1; i++) {
        double currentMin = list[i];
        int currentMinIndex = i;
        for (int j = i + 1; j < list.length; j++) {
            if (currentMin > list[j]) {
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
```
#### ⚙️ الخطوات / الخوارزمية: Selection Sort على [2,9,5,4,8,1,6]
```algorithm
1 | ابحث عن الأصغر في الجزء المتبقي | حلقة داخلية | يوجد 1 في الموقع 5
2 | بدّل الأصغر مع العنصر الأول | swap | الناتج: [1,9,5,4,8,2,6]
3 | كرر على الجزء المتبقي [9,5,4,8,2,6] | حلقة خارجية i++ | إلى أن تُفرز كامل المصفوفة
```

---

#### 10.7. المصفوفات متعددة الأبعاد (Multidimensional Arrays)
```java
double[][] distances = {
    {0, 983, 787, 714, 1375, 967, 1087},
    {983, 0, 214, 1102, 1763, 1723, 1842},
    // ...
};
```
**💡 التشبيه:**
> المصفوفة ثنائية الأبعاد أشبه بجدول إكسل: كل صف وعمود يمثلان فهرسين `[row][col]`.
> **وجه الشبه:** خلية الجدول = `distances[i][j]`.

---

#### 10.8. Command-Line Arguments
```java
class argsApp {
    public static void main(String[] args) {
        int sum = 0;
        for (int j = 0; j < args.length; j++)
            sum += Integer.parseInt(args[j]);
        System.out.println("Sum: " + sum);
    }
}
```
#### مهم للامتحان ⚠️:
> عناصر `args[]` تكون دائماً من نوع `String` حتى لو كانت أرقاماً — يجب استخدام `Integer.parseInt` للتحويل.

---

#### 10.9. دراسة حالة: الآلة الحاسبة (Calculator) عبر Command-Line
```java
public class Calculator {
    public static void main(String[] args) {
        if (args.length != 3) {
            System.out.println("num1 operator num2");
            System.exit(0);
        }
        int result = 0;
        switch (args[1].charAt(0)) {
            case '+': result = Integer.parseInt(args[0]) + Integer.parseInt(args[2]); break;
            case '-': result = Integer.parseInt(args[0]) - Integer.parseInt(args[2]); break;
            case '*': result = Integer.parseInt(args[0]) * Integer.parseInt(args[2]); break;
            case '/': result = Integer.parseInt(args[0]) / Integer.parseInt(args[2]);
        }
        System.out.println(args[0] + ' ' + args[1] + ' ' + args[2] + " = " + result);
    }
}
```

---

#### 10.10. الصنف Arrays المساعد (Utility Class)
```java
import java.util.Arrays;
Arrays.sort(numbers);              // فرز تصاعدي
Arrays.binarySearch(numbers, 11);  // بحث ثنائي جاهز
Arrays.fill(vector, 1);            // ملء بقيمة ثابتة
Arrays.toString(numbers);          // تحويل لنص قابل للطباعة
```

---

#### 10.11. تصحيح الامتحانات باستخدام مصفوفة ثنائية الأبعاد (GradeExam)
```java
public class GradeExam {
    public static void main(String args[]) {
        char[][] answers = { /* إجابات كل طالب */ };
        char[] keys = {'D','B','D','C','C','D','A','E','A','D'};
        for (int i = 0; i < answers.length; i++) {
            int correct = 0;
            for (int j = 0; j < answers[i].length; j++)
                if (answers[i][j] == keys[j]) correct++;
            System.out.println("Student " + i + "'s correct count is " + correct);
        }
    }
}
```

---

#### 10.12. دراسة حالة: أقرب نقطتين (Closest Pair)
```java
public static double distance(double x1, double y1, double x2, double y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
```
**الشرح المبسّط:** يُقارَن كل زوج من النقاط (باستخدام حلقتين متداخلتين `i`, `j` مع `j = i + 1`) لإيجاد أقصر مسافة بينهما.

---

### 11. الاسترجاع (Recursion)

#### 11.1. مفهوم الاسترجاع: المضروب (Factorial)
**النص الأصلي يقول:** الاسترجاع تقنية تؤدي لحلول أنيقة لمسائل يصعب برمجتها بحلقات بسيطة.
```java
public static long factorial(int n) {
    if (n == 0) return 1;         // base case
    else return n * factorial(n - 1); // recursive case
}
```
**💡 التشبيه:**
> الاسترجاع أشبه بمرآتين متقابلتين تعكسان الصورة إلى ما لا نهاية حتى تصل لنقطة توقف (`base case`).
> **وجه الشبه:** الانعكاس المتكرر = الاستدعاء الذاتي، نقطة التوقف = `base case`.

#### مهم للامتحان ⚠️:
> كل دالة استرجاعية يجب أن تحتوي حالة أساس (`base case`) لإيقاف الاستدعاء، وإلا يحدث `StackOverflowError`.

**🔍 تتبع التنفيذ: factorial(4)**
**المدخل:** `n = 4`
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 0 | استدعاء factorial(4) | ينتظر factorial(3) |
| 1 | استدعاء factorial(3) | ينتظر factorial(2) |
| 2 | استدعاء factorial(2) | ينتظر factorial(1) |
| 3 | استدعاء factorial(1) | ينتظر factorial(0) |
| 4 | factorial(0) يُرجع 1 | العودة تبدأ |
| 5 | 1×1=1 | factorial(1)=1 |
| 6 | 2×1=2 | factorial(2)=2 |
| 7 | 3×2=6 | factorial(3)=6 |
| 8 | 4×6=24 | factorial(4)=24 |

**النتيجة:** `24`

**مثال من الامتحان:**
Q: "What is the base case in the recursive `factorial` method?"
توضيح: سؤال تعريفي أساسي.

---

#### 11.2. متتالية فيبوناتشي (Fibonacci) — الاسترجاع غير الفعال
```java
public static long fib(long index) {
    if (index == 0) return 0;
    else if (index == 1) return 1;
    else return fib(index - 1) + fib(index - 2);
}
```
**السلسلة:** 0 1 1 2 3 5 8 13 21 34 55 89 ...

#### ⚠️ المقايضة: الاسترجاع مقابل التكرار (loop) لحساب فيبوناتشي
| | `Recursion` | `Loop (Iteration)` |
| --- | --- | --- |
| المزايا | كود مختصر وواضح بصرياً | أداء أفضل بكثير (لا استدعاءات مكررة) |
| العيوب | إعادة حساب نفس القيم مراراً — بطيء جداً لأرقام كبيرة | كود أطول قليلاً |
| متى تختاره | مسائل صغيرة أو تعليمية | مسائل حقيقية بأداء مهم |

**مثال من الامتحان:**
Q: "Why is the recursive Fibonacci implementation considered inefficient for large indices?"
توضيح: يختبر فهم إعادة الحساب المتكرر (exponential time complexity) — سؤال نظري شائع.

---

#### 11.3. فحص Palindrome بالاسترجاع (نسختان)
```java
// النسخة الأولى: باستخدام substring (تنشئ نصاً جديداً كل استدعاء)
public static boolean isPalindrome(String s) {
    if (s.length() <= 1) return true;
    else if (s.charAt(0) != s.charAt(s.length() - 1)) return false;
    else return isPalindrome(s.substring(1, s.length() - 1));
}
// النسخة الثانية: باستخدام مؤشرات low/high (أكثر كفاءة)
private static boolean isPalindrome(String s, int low, int high) {
    if (high <= low) return true;
    else if (s.charAt(low) != s.charAt(high)) return false;
    else return isPalindrome(s, low + 1, high - 1);
}
```
#### ملاحظة:
> النسخة الأولى تُنشئ سلسلة نصية جديدة (`substring`) في كل استدعاء — أقل كفاءة في الذاكرة من النسخة الثانية التي تستخدم فهارس فقط.

---

#### 11.4. الفرز بالاختيار الاسترجاعي (Recursive Selection Sort)
```java
private static void sort(double[] list, int low, int high) {
    if (low < high) {
        int indexOfMin = low;
        double min = list[low];
        for (int i = low + 1; i <= high; i++)
            if (list[i] < min) { min = list[i]; indexOfMin = i; }
        list[indexOfMin] = list[low];
        list[low] = min;
        sort(list, low + 1, high); // recursive call on remaining part
    }
}
```

---

#### 11.5. البحث الثنائي الاسترجاعي (Recursive Binary Search)
```java
private static int recursiveBinarySearch(int[] list, int key, int low, int high) {
    if (low > high) return -low - 1;
    int mid = (low + high) / 2;
    if (key < list[mid]) return recursiveBinarySearch(list, key, low, mid - 1);
    else if (key == list[mid]) return mid;
    else return recursiveBinarySearch(list, key, mid + 1, high);
}
```

---

#### 11.6. أبراج هانوي (Tower of Hanoi)
**النص الأصلي يقول:** تحريك n قرصاً من العمود A إلى العمود B باستخدام عمود مساعد C، بحيث لا يوضع قرص أكبر فوق قرص أصغر.
```java
public static void moveDisks(int n, char fromTower, char toTower, char auxTower) {
    if (n == 1)
        System.out.println("Move disk " + n + " from " + fromTower + " to " + toTower);
    else {
        moveDisks(n - 1, fromTower, auxTower, toTower); // move n-1 disks out of the way
        System.out.println("Move disk " + n + " from " + fromTower + " to " + toTower);
        moveDisks(n - 1, auxTower, toTower, fromTower); // move n-1 disks onto the target
    }
}
```
**الناتج المتوقع لـ n=3:**
> Move disk 1 from A to B
> Move disk 2 from A to C
> Move disk 1 from B to C
> Move disk 3 from A to B
> Move disk 1 from C to A
> Move disk 2 from C to B
> Move disk 1 from A to B

**💡 التشبيه:**
> أبراج هانوي أشبه بنقل كومة كتب مرتبة حجماً من طاولة لأخرى باستخدام طاولة وسيطة، بحيث لا تضع كتاباً كبيراً فوق كتاب أصغر.
> **وجه الشبه:** الكتب = الأقراص، الطاولات الثلاث = الأعمدة A, B, C.

**مثال من الامتحان:**
Q: "How many total moves are required to solve Tower of Hanoi with n disks?"
أ) $n^2$ ب) $2n$ ج) $2^n - 1$ د) $n!$
توضيح: سؤال نظري كلاسيكي مرتبط بالتعقيد الزمني (complexity).

---

#### 11.7. الأشكال الكسورية (Fractals): Sierpinski Triangle و H-Trees
**النص الأصلي يقول:** الاسترجاع يُستخدم أيضاً لرسم أشكال كسورية مثل `Sierpinski Triangle` و`H-trees` حيث يُقسَّم الشكل الأساسي إلى نسخ أصغر منه تكرارياً حسب مرتبة (`order`) محددة.
**الشرح المبسّط:** كل زيادة في المرتبة (`order`) تعني استدعاءً استرجاعياً إضافياً يرسم نسخاً أصغر من نفس الشكل داخل الشكل الأصلي.

---

### 12. أداة JShell

#### 12.1. مفهوم JShell ودورة REPL
**النص الأصلي يقول:** توفر `JShell` دورة تحرير وترجمة وتنفيذ فورية (`REPL`: read-evaluate-print loop) دون الحاجة لكتابة صنف كامل مع `main`.
```
| Welcome to JShell -- Version 9-ea
| For an introduction type: /help intro
jshell> 2+2
$1 ==> 4
jshell> int width = 40
width ==> 40
```
#### مهم للامتحان ⚠️:
> النتائج غير المُسماة تُخزَّن تلقائياً في متغيرات ضمنية مثل `$1`, `$2` يمكن استخدامها لاحقاً.

**مثال من الامتحان:**
Q: "What does REPL stand for in the context of JShell?"
توضيح: سؤال تعريفي — read-evaluate-print loop.

---

#### 12.2. أوامر JShell الأساسية
**جدول: مقارنات — أهم أوامر JShell**
| الأمر | الوظيفة |
| --- | --- |
| `/list` | عرض كل الأسطر (snippets) المُدخلة |
| `/vars` | عرض المتغيرات المُعرَّفة |
| `/methods` | عرض الدوال المُعرَّفة |
| `/save filename` | حفظ الجلسة في ملف |
| `/open filename` | تحميل أوامر من ملف |
| `/reset` | إعادة تعيين الجلسة بالكامل |
| `/exit` | الخروج من JShell |

---

## الجزء الثاني: ملخص منظم

### جدول التعريفات الشامل
| المصطلح | التعريف |
| --- | --- |
| `JVM` | آلة جافا الافتراضية التي تنفّذ bytecode |
| `JDK` | أدوات تطوير وتشغيل جافا |
| `bytecode` | الكود الوسيط الناتج عن `javac` |
| `Scanner` | صنف لقراءة المدخلات من لوحة المفاتيح أو ملف |
| `casting` | تحويل صريح لنوع بيانات لآخر |
| `overloading` | تعريف عدة دوال بنفس الاسم بمعاملات مختلفة |
| `recursion` | دالة تستدعي نفسها للوصول لحل تدريجي |
| `array` | متغير واحد يخزن مجموعة عناصر من نفس النوع |

### جدول المكونات
| المكوّن | الدور |
| --- | --- |
| `main` method | نقطة بدء تنفيذ البرنامج |
| `class` | الوحدة الأساسية لتنظيم الكود في جافا |
| `method signature` | اسم الدالة + قائمة معاملاتها |
| `base case` | حالة الإيقاف في الدالة الاسترجاعية |

### جدول المقارنات
| المقارنة | الفرق الجوهري |
| --- | --- |
| `while` مقابل `do-while` | `while` يفحص الشرط قبل التنفيذ، `do-while` بعد التنفيذ |
| `linearSearch` مقابل `binarySearch` | الخطي $O(n)$ بلا شرط ترتيب، الثنائي $O(\log n)$ يتطلب ترتيباً |
| `==` مقابل `.equals()` للنصوص | `==` يقارن المرجع، `.equals()` يقارن المحتوى |
| Recursion مقابل Loop | الاسترجاع أوضح لكن أبطأ عادة (استدعاءات مكررة) |

### جدول المصطلحات
| المصطلح الإنجليزي | المرادف العربي |
| --- | --- |
| `Syntax Error` | خطأ نحوي |
| `Runtime Error` | خطأ تنفيذي |
| `Logic Error` | خطأ منطقي |
| `Modularizing` | التجزئة إلى دوال |

### جدول الأخطاء الشائعة
| الخطأ | السبب | الحل |
| --- | --- | --- |
| نسيان `break` في `switch` | استمرار تنفيذ الحالات التالية (fall-through) | إضافة `break` بعد كل `case` |
| `9 / 5` = 1 وليس 1.8 | قسمة عددين صحيحين | استخدام `9.0 / 5` |
| مقارنة نصوص بـ `==` | مقارنة مرجع لا محتوى | استخدام `.equals()` |
| دالة استرجاعية بلا `base case` | `StackOverflowError` | إضافة شرط توقف واضح |

### خطوات وإجراءات المحاضرة

#### ⚙️ إجراء: ترجمة وتشغيل برنامج جافا
```algorithm
1 | كتابة الكود | IDE أو محرر نصوص | حفظ باسم مطابق لاسم الصنف
2 | الترجمة | javac | إنتاج ملف bytecode بامتداد .class
3 | التشغيل | java | تنفيذ البرنامج عبر JVM
```

#### ⚙️ إجراء: حل مسألة باستخدام دورة تطوير البرمجيات
```algorithm
1 | Requirements | تحديد المدخلات والمخرجات
2 | Analysis | صياغة المعادلة الرياضية
3 | Design | تحديد خطوات الحل بالترتيب
4 | Implementation | كتابة الكود
5 | Testing | تجربة حالات متعددة
```

### أنماط الأكواد المتكررة
- نمط القراءة من المستخدم: `Scanner input = new Scanner(System.in);` ثم `input.nextX()`.
- نمط التقريب لخانتين عشريتين: `(int)(value * 100) / 100.0`.
- نمط توليد رقم عشوائي محدود: `(int)(Math.random() * n)`.
- نمط الاسترجاع: تحقق من `base case` أولاً، ثم استدعِ الدالة بمدخل أصغر.

### أفكار شاملة (Big Picture)
جافا لغة كائنية التوجه تعتمد على `JVM` لتحقيق قابلية النقل. البرنامج يبدأ من `main`، ويُبنى الحل عبر: متغيرات → جمل شرطية/حلقات → دوال لتنظيم الكود → مصفوفات لتخزين بيانات متعددة → استرجاع للمسائل ذات البنية التكرارية الطبيعية (مثل الأشجار والفرز والبحث).

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
What is the entry point method every standalone Java application must have?
أ) `start()`  ب) `main()`  ج) `run()`  د) `init()`
**الإجابة الصحيحة: ب** — **التعليل:** `main` هو التابع الذي يبحث عنه JVM لبدء التنفيذ؛ باقي الأسماء تُستخدم في سياقات أخرى (Applets, Threads).

### السؤال 2 (سهل)
What command compiles `Welcome.java` into bytecode?
أ) `java Welcome.java` ب) `javac Welcome.java` ج) `jshell Welcome.java` د) `run Welcome.java`
**الإجابة الصحيحة: ب** — **التعليل:** `javac` هو مترجم جافا الذي ينتج ملف `.class`.

### السؤال 3 (متوسط)
What is the output of `System.out.println(9 / 5);`?
أ) `1.8` ب) `1` ج) `2` د) خطأ ترجمة
**الإجابة الصحيحة: ب** — **التعليل:** قسمة عددين صحيحين تُعطي عدداً صحيحاً؛ الجزء الكسري يُقتطع.

### السؤال 4 (سهل)
Which data type stores either `true` or `false`?
أ) `char` ب) `int` ج) `boolean` د) `byte`
**الإجابة الصحيحة: ج** — **التعليل:** `boolean` مخصص حصراً لهاتين القيمتين المنطقيتين.

### السؤال 5 (متوسط)
What range does `(int)(Math.random() * 10)` produce?
أ) 1–10 ب) 0–9 ج) 0–10 د) 1–9
**الإجابة الصحيحة: ب** — **التعليل:** `Math.random()` يُنتج قيمة بين 0.0 (شاملة) و1.0 (غير شاملة)، فضرب × 10 يعطي 0.0–9.999، والـ casting يقتطع الكسر فينتج 0–9.

### السؤال 6 (صعب)
In the `LeapYear` program, is 1900 considered a leap year?
أ) نعم ب) لا ج) يعتمد على الشهر د) يسبب خطأ تنفيذي
**الإجابة الصحيحة: ب** — **التعليل:** 1900 تُقسَم على 4 وعلى 100 لكن ليس على 400، فيفشل الشرط `(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)`.

### السؤال 7 (متوسط)
What happens if `break` is omitted from a `case` in a `switch` statement?
أ) خطأ ترجمة ب) تنفيذ الحالة التالية أيضاً (fall-through) ج) يتوقف البرنامج د) لا شيء يتغير
**الإجابة الصحيحة: ب** — **التعليل:** بدون `break` يستمر التنفيذ إلى الحالات التالية بغض النظر عن قيمتها.

### السؤال 8 (متوسط)
What is the value of `int i = '2' + '3';`?
أ) `5` ب) `"23"` ج) `101` د) خطأ ترجمة
**الإجابة الصحيحة: ج** — **التعليل:** يُستخدم الترميز ASCII الرقمي للحروف: '2'=50 و'3'=51، فناتج الجمع 101.

### السؤال 9 (سهل)
Which method compares the actual content of two `String` objects (case-sensitive)?
أ) `==` ب) `.equals()` ج) `.hashCode()` د) `.length()`
**الإجابة الصحيحة: ب** — **التعليل:** `==` يقارن مرجع الكائن، بينما `.equals()` يقارن القيمة الفعلية.

### السؤال 10 (متوسط)
Which format specifier prints a floating-point number with two decimal digits using `printf`?
أ) `%d` ب) `%s` ج) `%.2f` د) `%2d`
**الإجابة الصحيحة: ج** — **التعليل:** `%.2f` يحدد عدد الخانات العشرية بعد الفاصلة.

### السؤال 11 (سهل)
Which loop structure guarantees at least one execution of its body?
أ) `for` ب) `while` ج) `do-while` د) `for-each`
**الإجابة الصحيحة: ج** — **التعليل:** `do-while` يفحص الشرط بعد تنفيذ الجسم مرة واحدة على الأقل.

### السؤال 12 (متوسط)
What is the `formal parameter` in `public static int max(int num1, int num2)`?
أ) القيمة المُرجعة ب) `num1` و `num2` ج) اسم الدالة `max` د) نوع الدالة `int`
**الإجابة الصحيحة: ب** — **التعليل:** المعاملات الشكلية هي المتغيرات المُعرَّفة في توقيع الدالة.

### السؤال 13 (صعب)
Can two overloaded methods differ only in return type while having identical parameter lists?
أ) نعم دائماً ب) لا، هذا خطأ ترجمة ج) نعم إذا كانا `static` د) نعم إذا كانا في أصناف مختلفة فقط
**الإجابة الصحيحة: ب** — **التعليل:** يعتمد `overloading` على قائمة المعاملات (النوع والعدد)؛ اختلاف نوع الإرجاع فقط يُسبب خطأ ترجمة (ambiguous/duplicate method).

### السؤال 14 (متوسط)
What is the default value of an element in a newly created `int[]` array?
أ) `null` ب) `1` ج) `0` د) قيمة عشوائية
**الإجابة الصحيحة: ج** — **التعليل:** الأنواع العددية تُهيَّأ تلقائياً بالقيمة `0`.

### السؤال 15 (متوسط)
Given `int[] list = {2, 4, 7, 10, 11, 45};`, what does `binarySearch(list, 3)` roughly indicate?
أ) القيمة موجودة عند الفهرس 1 ب) القيمة غير موجودة، ويُعاد رقم سالب يشير لموقع الإدراج ج) خطأ تنفيذي د) `0`
**الإجابة الصحيحة: ب** — **التعليل:** عند عدم إيجاد المفتاح تُعاد القيمة `-low - 1` كإشارة لموضع الإدراج المناسب مع الحفاظ على الترتيب.

### السؤال 16 (سهل)
Which utility class provides `sort()` and `binarySearch()` methods for arrays?
أ) `Math` ب) `Arrays` ج) `Scanner` د) `String`
**الإجابة الصحيحة: ب** — **التعليل:** `java.util.Arrays` يوفر توابع جاهزة للفرز والبحث والملء والتحويل لنص.

### السؤال 17 (متوسط)
What is required before using `binarySearch` on an array?
أ) أن تكون المصفوفة فارغة ب) أن تكون المصفوفة مرتبة تصاعدياً ج) أن تكون كل القيم موجبة د) لا يوجد شرط
**الإجابة الصحيحة: ب** — **التعليل:** خوارزمية البحث الثنائي تعتمد على تقسيم النطاق افتراضياً بأن المصفوفة مرتبة.

### السؤال 18 (صعب)
What is the essential requirement of every recursive method to avoid infinite recursion?
أ) استخدام حلقة `for` بداخلها ب) وجود `base case` يوقف الاستدعاء ج) أن تكون الدالة `static` د) أن تُرجع `void`
**الإجابة الصحيحة: ب** — **التعليل:** بدون حالة أساس واضحة، تستمر الاستدعاءات إلى ما لا نهاية وتُسبب `StackOverflowError`.

### السؤال 19 (متوسط)
What is the base case of the recursive `factorial(n)` method?
أ) `n == 1` ب) `n == 0` ج) `n < 0` د) لا يوجد حالة أساس
**الإجابة الصحيحة: ب** — **التعليل:** في المحاضرة، `factorial(0)` تُرجع `1` مباشرة دون استدعاء إضافي.

### السؤال 20 (صعب)
Why is the naive recursive Fibonacci (`fib(index-1) + fib(index-2)`) considered inefficient?
أ) لأنه يستخدم مصفوفات كبيرة ب) لأنه يعيد حساب نفس القيم الفرعية مراراً (تعقيد أسّي) ج) لأنه يحتاج `Scanner` د) لأنه غير قابل للترجمة
**الإجابة الصحيحة: ب** — **التعليل:** كل استدعاء يتفرّع لاستدعاءين، فتتكرر نفس الحسابات الفرعية آلاف المرات، ما يجعل التعقيد الزمني أسّياً $O(2^n)$.

### السؤال 21 (متوسط)
In Tower of Hanoi with `n` disks, how many total moves are needed?
أ) $n$ ب) $2n$ ج) $2^n - 1$ د) $n!$
**الإجابة الصحيحة: ج** — **التعليل:** كل زيادة في عدد الأقراص تُضاعف تقريباً عدد الحركات اللازمة زائد حركة واحدة، بصيغة $2^n - 1$.

### السؤال 22 (متوسط)
What does `args[]` contain in `public static void main(String[] args)` when running `java Calculator 5 + 3`?
أ) أعداد صحيحة `{5, 3}` ب) نصوص `{"5", "+", "3"}` ج) مصفوفة فارغة د) خطأ تنفيذي
**الإجابة الصحيحة: ب** — **التعليل:** كل عناصر `args[]` تكون دائماً من نوع `String` بغض النظر عن شكلها الظاهري.

### السؤال 23 (سهل)
Which method converts a String like `"123"` into an `int`?
أ) `String.valueOf()` ب) `Integer.parseInt()` ج) `Double.parseDouble()` د) `(int) "123"`
**الإجابة الصحيحة: ب** — **التعليل:** `Integer.parseInt(String)` هو التابع القياسي لتحويل نص إلى عدد صحيح.

### السؤال 24 (متوسط)
What must you call after writing data with `PrintStream` to a file to ensure it's saved?
أ) `flush()` فقط ب) `close()` ج) لا حاجة لأي شيء د) `open()`
**الإجابة الصحيحة: ب** — **التعليل:** استدعاء `close()` يضمن تفريغ (`flush`) البيانات المخزنة مؤقتاً وكتابتها فعلياً على القرص.

### السؤال 25 (صعب)
In `DeckOfCards`, why is `deck[i] / 13` used to determine the suit while `deck[i] % 13` determines the rank?
أ) لأن كل فئة تحتوي 13 ورقة، فالقسمة الصحيحة تحدد الفئة والباقي يحدد الرتبة داخلها ب) لأنها طريقة عشوائية بلا سبب ج) لتفادي الأخطاء البرمجية فقط د) لأن `13` هو عدد الفئات
**الإجابة الصحيحة: أ** — **التعليل:** توجد 4 فئات × 13 رتبة = 52 ورقة؛ القسمة الصحيحة على 13 تُحدد رقم الفئة (0–3)، والباقي يُحدد الرتبة (0–12) داخل تلك الفئة.

---

## الجزء الرابع: أسئلة تصحيح الكود

### تصحيح 1 (logic)
**الكود الخاطئ:**
```java
System.out.println("Celsius 35 is Fahrenheit degree ");
System.out.println((9 / 5) * 35 + 32);
```
**اكتشف الخطأ:** القسمة `9 / 5` بين عددين صحيحين تُعطي `1` بدل `1.8`، فتكون النتيجة `67` بدل `95.0`.
**التصحيح:**
```java
System.out.println((9.0 / 5) * 35 + 32); // 95.0
```
**شرح الحل:** 1) استخدام `9.0` يجبر جافا على القسمة العشرية. 2) الناتج الصحيح الآن `1.8 * 35 + 32 = 95.0`. 3) القاعدة العامة: أي عملية بين عددين `int` تُعطي `int`.

### تصحيح 2 (misconception)
**الكود الخاطئ:**
```java
String s1 = "Hello";
String s2 = "Hello";
if (s1 == s2) System.out.println("Equal");
```
**اكتشف الخطأ:** استخدام `==` لمقارنة نصوص قد يعمل أحياناً بالصدفة (بسبب String pool) لكنه غير موثوق لمقارنة المحتوى.
**التصحيح:**
```java
if (s1.equals(s2)) System.out.println("Equal");
```
**شرح الحل:** 1) `==` يقارن مرجع الكائن (العنوان في الذاكرة). 2) `.equals()` يقارن المحتوى الفعلي حرفاً بحرف. 3) القاعدة: استخدم `.equals()` دائماً مع الكائنات مثل `String`.

### تصحيح 3 (infinite_loop)
**الكود الخاطئ:**
```java
int i = 0;
while (i < 10) {
    System.out.println(i);
}
```
**اكتشف الخطأ:** لا يوجد تحديث لمتغير `i` داخل الحلقة، فتصبح لا نهائية.
**التصحيح:**
```java
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
```
**شرح الحل:** 1) حلقة `while` تحتاج تحديثاً صريحاً للمتغير الشرطي. 2) بدون `i++` يبقى الشرط `true` دائماً. 3) قاعدة عامة: تأكد أن الشرط سيصبح `false` في مرحلة ما.

### تصحيح 4 (off_by_one)
**الكود الخاطئ:**
```java
int[] numbers = new int[5];
for (int i = 0; i <= numbers.length; i++) {
    numbers[i] = i;
}
```
**اكتشف الخطأ:** الشرط `i <= numbers.length` يسمح بالوصول إلى `numbers[5]` وهو خارج حدود المصفوفة (`ArrayIndexOutOfBoundsException`).
**التصحيح:**
```java
for (int i = 0; i < numbers.length; i++) {
    numbers[i] = i;
}
```
**شرح الحل:** 1) فهارس المصفوفة تبدأ من `0` وتنتهي عند `length - 1`. 2) استخدام `<` بدل `<=` يتجنب تجاوز الحدود. 3) خطأ "off-by-one" من أكثر أخطاء المصفوفات شيوعاً.

### تصحيح 5 (wrong_formula)
**الكود الخاطئ:**
```java
double monthlyInterestRate = annualInterestRate / 100;
```
**اكتشف الخطأ:** القسمة على `100` فقط تُحوّل النسبة المئوية إلى عشرية سنوية، لكنها لا تُحوّلها لمعدل شهري.
**التصحيح:**
```java
double monthlyInterestRate = annualInterestRate / 1200; // 100 (%) × 12 (months)
```
**شرح الحل:** 1) يجب القسمة على 1200 = 100×12. 2) القسمة على 100 فقط تُبقي المعدل سنوياً وليس شهرياً. 3) الصيغة الصحيحة تُستخدم مباشرة في معادلة الدفعة الشهرية.

### تصحيح 6 (logic)
**الكود الخاطئ:**
```java
public static boolean isPrime(int number) {
    for (int divisor = 2; divisor <= number / 2; divisor++) {
        if (number % divisor == 0)
            return true; // خطأ منطقي
    }
    return false;
}
```
**اكتشف الخطأ:** إيجاد قاسم يعني أن العدد **ليس** أولياً، فيجب إعادة `false` وليس `true`.
**التصحيح:**
```java
public static boolean isPrime(int number) {
    for (int divisor = 2; divisor <= number / 2; divisor++) {
        if (number % divisor == 0)
            return false;
    }
    return true;
}
```
**شرح الحل:** 1) وجود قاسم بين 2 و n/2 يعني عدد غير أولي. 2) عكس القيم المُرجعة يُصلح المنطق بالكامل. 3) العدد الأولي هو الذي لا يُقسم إلا على نفسه و1.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)
> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1 (fill_gaps)
أكمل الكود التالي لحساب مجموع أعداد من 1 إلى n باستخدام `for`:
```java
int sum = 0;
for (int i = 1; i _______ n; i++) {
    sum _______ i;
}
```
**نموذج الحل:** `<=` في الشرط، و `+=` في التحديث. الناتج: مجموع كل الأعداد من 1 حتى n شاملة.

### تمرين 2 (code_fix)
**الكود:**
```java
public static double max(double a, double b) {
    if (a > b) return a;
}
```
**المطلوب:** أضف الحالة الناقصة.
**نموذج الحل:**
```java
public static double max(double a, double b) {
    if (a > b) return a;
    else return b;
}
```

### تمرين 3 (scenario)
اكتب دالة `isEven(int n)` تُرجع `true` إذا كان العدد زوجياً.
**نموذج الحل:**
```java
public static boolean isEven(int n) {
    return n % 2 == 0;
}
```

### تمرين 4 (fill_gaps)
أكمل تعريف مصفوفة من 5 أعداد صحيحة وقيمة أول عنصر فيها:
```java
int[] arr = new int[_______];
arr[_______] = 10;
```
**نموذج الحل:** `5` للحجم، و `0` لفهرس أول عنصر.

### تمرين 5 (code_fix)
**الكود الخاطئ:**
```java
public static int gcd(int a, int b) {
    if (b == 0) return a;
    else return gcd(a, a % b); // خطأ: يجب استدعاء gcd(b, a % b)
}
```
**نموذج الحل:**
```java
public static int gcd(int a, int b) {
    if (b == 0) return a;
    else return gcd(b, a % b);
}
```

### تمرين 6 (scenario)
اكتب دالة استرجاعية `sumDigits(int n)` تُرجع مجموع أرقام عدد صحيح موجب.
**نموذج الحل:**
```java
public static int sumDigits(int n) {
    if (n < 10) return n;
    else return n % 10 + sumDigits(n / 10);
}
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: نظام تسجيل طلاب — تحليل حالة
**السيناريو:** جامعة تريد برنامجاً يقرأ درجات 5 طلاب ويحسب المعدل ويحدد عدد الطلاب فوق المعدل (نفس فكرة `AnalyzeNumbers`).
**المطلوب:**
1. حدد نوع البيانات المناسب لتخزين الدرجات.
2. صف الخطوات اللازمة لحساب المعدل.
3. صف كيف تحدد عدد الطلاب فوق المعدل.
**نموذج الحل:**
1. `double[] grades = new double[5];`
2. قراءة كل درجة بحلقة `for` مع جمعها في `sum`، ثم `average = sum / 5`.
3. حلقة `for` ثانية تقارن كل عنصر بـ `average` وتزيد عداداً `count`.

### تمرين 2: عملية إيداع بنكي — إكمال جدول قرار
**السيناريو:** بنك يريد تصنيف العميل حسب رصيده: أقل من 1000 (Basic)، 1000–10000 (Silver)، أكثر من 10000 (Gold).
**المطلوب:** أكمل جدول القرار التالي.
| الشرط | التصنيف |
| --- | --- |
| `balance < 1000` | ؟ |
| `balance >= 1000 && balance <= 10000` | ؟ |
| `balance > 10000` | ؟ |
**نموذج الحل:** Basic / Silver / Gold على التوالي — يُترجم مباشرة إلى `if-else if-else` بنفس ترتيب الشروط.

### تمرين 3: طلب إجازة موظف — تحليل مكتوب
**السيناريو:** نظام موارد بشرية يقبل طلب إجازة الموظف فقط إذا كان رصيد إجازاته `>= 0` بعد الخصم، وإلا يرفضه.
**المطلوب:**
1. اكتب الشرط المنطقي المناسب.
2. صف ماذا يحدث إذا كان رصيد الإجازات بالضبط `0` بعد الخصم.
**نموذج الحل:**
1. `if (balance - requestedDays >= 0) { approve(); } else { reject(); }`
2. تُقبل الإجازة لأن الشرط `>= 0` يشمل الصفر تماماً (حالة حدّية يجب الانتباه لها).

### تمرين 4: تصميم مخطط تدفق لحاسبة بسيطة
**السيناريو:** حاسبة تقرأ رقمين وعملية (+ - * /) وتطبع الناتج (مثل مثال `Calculator`).
**المطلوب:** أكمل وصف عُقد مخطط التدفق (لا تحتاج لرسمه).
| # | العُقدة | النوع |
| --- | --- | --- |
| 1 | بدء البرنامج | event |
| 2 | قراءة args[] | ؟ |
| 3 | switch على العامل | ؟ |
| 4 | طباعة النتيجة | ؟ |
**نموذج الحل:** 2: process (إدخال) — 3: decision (قرار) — 4: event (نهاية/إخراج).

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: حلقة for بسيطة
**المدخل:**
```java
int sum = 0;
for (int i = 1; i <= 5; i++) sum += i;
```
**أكمل الجدول:**
| الخطوة | i | sum |
| --- | --- | --- |
| 1 | 1 | ؟ |
| 2 | 2 | ؟ |
| 3 | 3 | ؟ |
**نموذج الحل:**
| الخطوة | i | sum |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 2 | 3 |
| 3 | 3 | 6 |
| 4 | 4 | 10 |
| 5 | 5 | 15 |
**النتيجة:** `sum = 15`

### تمرين تتبع 2: factorial(3) الاسترجاعية
**المدخل:** `factorial(3)`
**أكمل الجدول:**
| الخطوة | الاستدعاء | القيمة المرجعة |
| --- | --- | --- |
| 1 | factorial(3) | ؟ |
| 2 | factorial(2) | ؟ |
| 3 | factorial(1) | ؟ |
| 4 | factorial(0) | ؟ |
**نموذج الحل:**
| الخطوة | الاستدعاء | القيمة المرجعة |
| --- | --- | --- |
| 1 | factorial(3) | 3×2×1=6 |
| 2 | factorial(2) | 2×1=2 |
| 3 | factorial(1) | 1×1=1 |
| 4 | factorial(0) | 1 (base case) |
**النتيجة:** `6`

### تمرين تتبع 3: Binary Search
**المدخل:** `list = {2,4,7,10,11,45}`, `key = 11`
**أكمل الجدول:**
| الخطوة | low | high | mid | list[mid] |
| --- | --- | --- | --- | --- |
| 1 | 0 | 5 | ؟ | ؟ |
| 2 | ؟ | ؟ | ؟ | ؟ |
**نموذج الحل:**
| الخطوة | low | high | mid | list[mid] |
| --- | --- | --- | --- | --- |
| 1 | 0 | 5 | 2 | 7 (أصغر من 11 → low=3) |
| 2 | 3 | 5 | 4 | 11 (تطابق!) |
**النتيجة:** يُعاد الفهرس `4`

### تمرين تتبع 4: خلط بطاقة واحدة (Deck of Cards)
**المدخل:** `deck[i] = 14`
**أكمل الجدول:**
| العملية | التعبير | القيمة |
| --- | --- | --- |
| رقم الفئة (suit index) | `14 / 13` | ؟ |
| رقم الرتبة (rank index) | `14 % 13` | ؟ |
**نموذج الحل:**
| العملية | التعبير | القيمة |
| --- | --- | --- |
| رقم الفئة | `14 / 13` | 1 → Hearts |
| رقم الرتبة | `14 % 13` | 1 → "2" |
**النتيجة:** "2 of Hearts"

### تمرين تتبع 5: while مع فائدة مركبة (سنتان فقط)
**المدخل:** `dollars = 1000.00, interest = 0.05`
**أكمل الجدول:**
| الخطوة (سنة) | الفائدة المضافة | dollars بعد التحديث |
| --- | --- | --- |
| 1 | ؟ | ؟ |
| 2 | ؟ | ؟ |
**نموذج الحل:**
| الخطوة (سنة) | الفائدة المضافة | dollars بعد التحديث |
| --- | --- | --- |
| 1 | 1000×0.05=50 | 1050.00 |
| 2 | 1050×0.05=52.5 | 1102.50 |
**النتيجة:** بعد سنتين الرصيد `1102.50`

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the JVM?
A: الآلة الافتراضية التي تنفذ bytecode جافا وتجعل البرنامج قابلاً للعمل على أي نظام تشغيل.

**Q2:** What is the difference between `javac` and `java`?
A: `javac` يترجم الكود المصدري إلى bytecode، بينما `java` يشغّل هذا الـ bytecode عبر JVM.

**Q3:** What does `Scanner.nextInt()` do?
A: يقرأ قيمة عدد صحيح واحدة من مصدر الإدخال (لوحة المفاتيح أو ملف).

**Q4:** What is a syntax error?
A: خطأ في قواعد كتابة اللغة يُكتشف أثناء الترجمة قبل التنفيذ.

**Q5:** What is a logic error?
A: خطأ في منطق الحل يجعل البرنامج يعمل وينتج ناتجاً خاطئاً دون توقف.

**Q6:** What does the `final` keyword do?
A: يجعل المتغير ثابتاً بحيث لا يمكن تغيير قيمته بعد التهيئة الأولى.

**Q7:** What is the range of a `byte` type?
A: من −128 إلى 127 (8 بت موقّعة).

**Q8:** How do you get a random integer between 0 and 9 inclusive?
A: باستخدام `(int)(Math.random() * 10)`.

**Q9:** What is the difference between `if` and `switch`?
A: `switch` أوضح عند مقارنة متغير واحد بعدة قيم ثابتة؛ `if-else` أكثر مرونة للشروط المركبة.

**Q10:** What is method overloading?
A: تعريف عدة دوال بنفس الاسم لكن بعدد أو نوع معاملات مختلف.

**Q11:** What is the default value of a `boolean` array element?
A: `false`.

**Q12:** What exception is thrown when accessing an array index out of range?
A: `ArrayIndexOutOfBoundsException`.

**Q13:** What is required for `binarySearch` to work correctly?
A: أن تكون المصفوفة مرتبة تصاعدياً مسبقاً.

**Q14:** What is a recursive method's "base case"?
A: الحالة التي توقف الاستدعاء الذاتي وتُعيد قيمة مباشرة دون استدعاء إضافي.

**Q15:** Why is naive recursive Fibonacci inefficient?
A: لأنه يُعيد حساب نفس القيم الفرعية بشكل متكرر (تعقيد أسّي).

**Q16:** What does `args[]` in `main` represent?
A: مصفوفة نصوص تحتوي المعاملات المُمرَّرة من سطر الأوامر عند تشغيل البرنامج.

**Q17:** What is `FileNotFoundException` thrown for?
A: عندما يحاول البرنامج فتح ملف بمسار غير موجود عبر `Scanner` أو `PrintStream`.

**Q18:** What is `REPL` in JShell?
A: دورة القراءة والتقييم والطباعة الفورية (read-evaluate-print loop) دون الحاجة لصنف كامل.

**Q19:** What does `Arrays.sort()` do?
A: يفرز عناصر المصفوفة تصاعدياً بشكل مباشر.

**Q20:** What is the time complexity of linear search in the worst case?
A: $O(n)$ — قد يفحص كل عنصر في المصفوفة مرة واحدة.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> ملاحظة: محاضرة اليوم غطّت عدة برامج مستقلة (وليس برنامجاً واحداً مُجزّأً)؛ لذلك نعرض هنا أهم برنامج متكامل شُرح على دفعات ضمن دراسة حالة القرض (Loan Payments)، كمرجع مجمّع واحد.

```java
// ComputeLoan.java — Full reference program (Loan Payments case study)
import java.util.Scanner;

public class ComputeLoan {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        // Step 1: read annual interest rate
        System.out.print("Enter annual interest rate, e.g., 7.25%: ");
        double annualInterestRate = input.nextDouble();

        // Step 2: convert annual % rate to monthly decimal rate
        double monthlyInterestRate = annualInterestRate / 1200;

        // Step 3: read number of years
        System.out.print("Enter number of years as an integer, e.g., 5: ");
        int numberOfYears = input.nextInt();

        // Step 4: read loan amount
        System.out.print("Enter loan amount, e.g., 120000.95: ");
        double loanAmount = input.nextDouble();

        // Step 5: compute monthly payment using the amortization formula
        double monthlyPayment = loanAmount * monthlyInterestRate /
            (1 - 1 / Math.pow(1 + monthlyInterestRate, numberOfYears * 12));

        // Step 6: compute total payment over the loan period
        double totalPayment = monthlyPayment * numberOfYears * 12;

        // Step 7: display results rounded to 2 decimal places
        System.out.println("The monthly payment is $" + (int)(monthlyPayment * 100) / 100.0);
        System.out.println("The total payment is $" + (int)(totalPayment * 100) / 100.0);
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: What is the JVM and why is it central to Java's portability?
**نموذج الإجابة:**
1. التعريف: آلة افتراضية تنفّذ `bytecode` الناتج عن الترجمة.
2. المكونات/الشروط: تحتاج bytecode مُترجَماً مسبقاً بواسطة `javac`.
3. مثال: نفس ملف `Welcome.class` يعمل على Windows وLinux وmacOS.
4. متى نستخدم: في كل تشغيل لبرنامج جافا — لا مفر منها.

### سؤال 2: Explain the difference between compile-time and runtime errors.
**نموذج الإجابة:**
1. التعريف: خطأ الترجمة يظهر أثناء `javac`، وخطأ التنفيذ يظهر أثناء `java`.
2. المكونات/الشروط: خطأ الترجمة يمنع إنتاج bytecode، بينما التنفيذي يوقف البرنامج أثناء العمل.
3. مثال: نسيان قوس `}` (ترجمة) مقابل `1/0` (تنفيذ).
4. متى نستخدم: فهم الفرق يساعد في تصنيف رسائل الخطأ بسرعة.

### سؤال 3: What is the purpose of the `Scanner` class?
**نموذج الإجابة:**
1. التعريف: صنف لقراءة بيانات من مصادر إدخال مختلفة (لوحة مفاتيح، ملف).
2. المكونات/الشروط: يحتاج `import java.util.Scanner;` وإنشاء كائن باستخدام `new Scanner(source)`.
3. مثال: `Scanner input = new Scanner(System.in); int x = input.nextInt();`
4. متى نستخدم: عند الحاجة لتفاعل المستخدم أو قراءة ملفات نصية.

### سؤال 4: Describe the software development life cycle stages.
**نموذج الإجابة:**
1. التعريف: عملية منظّمة من 7 مراحل لبناء برنامج بدءاً من المتطلبات وحتى الصيانة.
2. المكونات: Requirements → Analysis → Design → Implementation → Testing → Deployment → Maintenance.
3. مثال: برنامج القرض بدأ بتحديد المدخلات (Requirements) ثم صيغة رياضية (Analysis).
4. متى نستخدم: في أي مشروع برمجي حقيقي وليس فقط التمارين الصغيرة.

### سؤال 5: What is the difference between `&&` and `&` (or `||` and `|`) in Java?
**نموذج الإجابة:**
1. التعريف: `&&`/`||` منطقيان مع تقييم قصير (short-circuit)، بينما `&`/`|` يقيّمان الطرفين دائماً.
2. المكونات: `&&` يتوقف عند أول شرط `false`، `||` يتوقف عند أول شرط `true`.
3. مثال: `(x != 0 && 10/x > 1)` آمن، لكن `&` قد يُسبب قسمة على صفر.
4. متى نستخدم: `&&`/`||` هما الافتراض في أغلب الحالات لتفادي أخطاء غير ضرورية.

### سؤال 6: What is method overloading and why is it useful?
**نموذج الإجابة:**
1. التعريف: تعريف عدة دوال بنفس الاسم بمعاملات مختلفة.
2. المكونات/الشروط: يجب اختلاف عدد أو نوع المعاملات، ليس نوع الإرجاع فقط.
3. مثال: `max(int,int)` و`max(double,double)`.
4. متى نستخدم: عندما نريد نفس السلوك المنطقي لأنواع بيانات مختلفة.

### سؤال 7: What is the relationship between arrays and loops?
**نموذج الإجابة:**
1. التعريف: المصفوفات تُعالَج غالباً عبر حلقات تكرارية للوصول لكل عنصر.
2. المكونات/الشروط: حلقة `for` مع `i` من `0` إلى `array.length - 1`.
3. مثال: طباعة كل عناصر مصفوفة عبر `for (int i = 0; i < arr.length; i++)`.
4. متى نستخدم: أي عملية جماعية على بيانات متعددة (بحث، فرز، جمع).

### سؤال 8: What is recursion and when should it be preferred over iteration?
**نموذج الإجابة:**
1. التعريف: تقنية تجعل الدالة تستدعي نفسها لحل مسألة أصغر من نفس النوع.
2. المكونات/الشروط: يجب وجود `base case` و`recursive case` يقترب من الحالة الأساس.
3. مثال: `factorial`, `Tower of Hanoi`, `Fibonacci`.
4. متى نستخدم: عند بنية المسألة تكرارية طبيعياً (أشجار، تقسيم-وحكم)، مع الحذر من الأداء.

### سؤال 9: Explain how binary search achieves O(log n) complexity.
**نموذج الإجابة:**
1. التعريف: خوارزمية بحث تُقسِّم نطاق البحث للنصف في كل خطوة.
2. المكونات/الشروط: تتطلب مصفوفة مرتبة، وتستخدم `low`, `high`, `mid`.
3. مثال: البحث عن 11 في مصفوفة من 6 عناصر يحتاج خطوتين فقط بدل 6.
4. متى نستخدم: عند التعامل مع بيانات كبيرة مرتبة مسبقاً.

### سؤال 10: What is the purpose of command-line arguments (`args[]`)?
**نموذج الإجابة:**
1. التعريف: طريقة لتمرير قيم للبرنامج عند تشغيله من سطر الأوامر مباشرة.
2. المكونات/الشروط: تُخزَّن دائماً كنصوص (`String[]`)، ويجب تحويلها يدوياً للأنواع الأخرى.
3. مثال: `java Calculator 5 + 3` → `args = {"5","+","3"}`.
4. متى نستخدم: أدوات سطر الأوامر التي تحتاج مدخلات ثابتة عند كل تشغيل.

### سؤال 11: Why must String comparison use `.equals()` instead of `==`?
**نموذج الإجابة:**
1. التعريف: `String` نوع كائن (object)، والمقارنة الافتراضية `==` تقارن مرجع الذاكرة لا المحتوى.
2. المكونات/الشروط: قد تعمل `==` بالصدفة بسبب String pool لكنها غير موثوقة دائماً.
3. مثال: `new String("a") == "a"` تُعطي `false` رغم تطابق المحتوى.
4. متى نستخدم: `.equals()` دائماً عند مقارنة محتوى النصوص.

### سؤال 12: What is JShell and what problem does it solve?
**نموذج الإجابة:**
1. التعريف: أداة تفاعلية (REPL) لتجربة أكواد جافا فوراً دون كتابة صنف كامل.
2. المكونات/الشروط: تدعم أسطراً منفردة (expressions, statements, classes, methods).
3. مثال: `jshell> 2+2` يُظهر `$1 ==> 4` مباشرة.
4. متى نستخدم: للتجربة السريعة وتعلّم اللغة دون overhead كتابة برنامج كامل.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم دورة `javac` ثم `java` ولماذا يجب أن يتطابق اسم الملف مع اسم الصنف.
- [ ] أستطيع تمييز `Syntax Error` عن `Runtime Error` عن `Logic Error` بأمثلة.
- [ ] أعرف الفرق بين قسمة الأعداد الصحيحة والقسمة العشرية (`9/5` مقابل `9.0/5`).
- [ ] أستطيع كتابة `Scanner` لقراءة أنواع بيانات مختلفة.
- [ ] أفهم متى نستخدم `if-else` ومتى `switch` وأتذكر خطر نسيان `break`.
- [ ] أستطيع تفسير `(int)(Math.random() * n)` بدقة.
- [ ] أفرّق بين `while`, `for`, `do-while`, `for-each` واستخداماتها.
- [ ] أفهم `formal parameters` مقابل `actual parameters` و`method overloading`.
- [ ] أستطيع تتبع تنفيذ دالة استرجاعية خطوة بخطوة (factorial, fibonacci, Hanoi).
- [ ] أفرّق بين `linearSearch` و`binarySearch` من حيث الشرط والأداء.
- [ ] أستطيع كتابة وتفسير مصفوفة ثنائية الأبعاد والوصول لعناصرها.
- [ ] أفهم لماذا يجب استخدام `.equals()` بدل `==` للنصوص.
- [ ] أعرف أوامر JShell الأساسية (`/list`, `/vars`, `/save`, `/open`).

---

## ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Elementary Programming | Selections & Loops | المتغيرات تُستخدم داخل الشروط والحلقات |
| Methods | Recursion | الاسترجاع هو دالة تستدعي نفسها |
| Arrays | Recursion | خوارزميات الفرز/البحث تُكتب تكرارياً واسترجاعياً |
| Loops | Arrays | المرور على عناصر المصفوفة يعتمد على الحلقات |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| القسمة الصحيحة | `int / int` = `int` — احذر فقدان الكسور |
| الفهارس | تبدأ من `0` وتنتهي عند `length - 1` |
| الاسترجاع | لازم `base case` وإلا `StackOverflowError` |
| النصوص | `.equals()` وليس `==` |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `%` | باقي القسمة | تفكيك الأرقام، فحص الزوجية، fair-hex conversion |
| `Math.random()` | قيمة عشوائية [0,1) | ألعاب التخمين، خلط البطاقات |
| `break` | إنهاء `switch`/الحلقة فوراً | منع fall-through |
| `final` | متغير ثابت | ثوابت مثل `PI` |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لا تقارن كائنات (`String`) بـ `==`، استخدم `.equals()` |
| 2 | كل دالة استرجاعية تحتاج `base case` واضحاً |
| 3 | `binarySearch` يتطلب مصفوفة مرتبة مسبقاً |
| 4 | فهرس المصفوفة الأخير هو `length - 1` وليس `length` |
| 5 | القسمة بين عددين `int` تُهمل الكسور العشرية |

---

<!-- VALIDATION
schema: 1.0
parts: theory, code, diagrams, commands, tables, pseudocode, mcq, debug, exercises, analysis_exercise, trace_exercise, qa_cards, theory_questions, full_code, checklist, cheat_sheet
-->

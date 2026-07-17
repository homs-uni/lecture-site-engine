# المحاضرة 2 — البرمجة كائنية التوجه (Object Oriented Programming)

> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** الكائنات والأصناف، التغليف، الوراثة، تعدد الأشكال، الواجهات، والأصناف المجردة

---

## الجزء الأول: الشرح التفصيلي

### 1. الكائنات والأصناف (Objects and Classes)

**النص الأصلي يقول:** كل كائن (`object`) هو نسخة (`instance`) من صنف (`class`)، والصنف يحدد البنية المشتركة (حقول + دوال).

**الشرح المبسّط:** الصنف هو القالب (كالنموذج الورقي)، والكائن هو النسخة المعبّأة منه. مثلاً صنف `Student` يحدد أن كل طالب له اسم ورقم، وكل طالب فعلي (Jenna, John, Maria, James) هو كائن مستقل.

**💡 التشبيه:**
> قالب الكعكة = `class`، والكعكة المخبوزة = `object`.
> **وجه الشبه:** `class` = التصميم، `object` = المنتج الفعلي.

---

### 1.1. بنية الصنف في Java — مثال `Circle`

**النص الأصلي يقول:** الصنف `Circle` يحتوي على حقل بيانات `radius: double`، وبانيين (`Circle()` و`Circle(double)`), وعدة دوال.

**💻 الكود: صنف Circle الأساسي**

#### ما هذا الكود؟
> يعرّف صنف دائرة بحقل واحد (نصف القطر) وبانيَين ودوال لحساب المساحة والمحيط.

```java
class Circle {
    double radius = 1; // default radius is 1

    Circle() {
        // default constructor — no arguments
    }

    Circle(double newRadius) {
        radius = newRadius; // parameterized constructor
    }

    double getArea() {
        return radius * radius * Math.PI; // area = π × r²
    }

    double getPerimeter() {
        return 2 * radius * Math.PI; // perimeter = 2π × r
    }

    void setRadius(double newRadius) {
        radius = newRadius; // mutator method
    }
}
```

#### شرح كل سطر:
1. `double radius = 1;` → تعريف حقل `radius` مع قيمة افتراضية — لأن الدائرة تحتاج نصف قطر دائمًا.
2. `Circle()` → بانٍ بدون وسيط — يُنشئ كائناً بنصف قطر = 1.
3. `Circle(double newRadius)` → بانٍ بوسيط — يتيح تحديد قيمة مخصصة.
4. `radius * radius * Math.PI` → يحسب `π r²` مباشرة باستخدام الثابت الجاهز `Math.PI`.
5. `2 * radius * Math.PI` → يحسب `2πr` للمحيط.
6. `setRadius(double)` → دالة تعديل (`mutator`) تتيح تغيير `radius` بعد الإنشاء.

**المكتبات المطلوبة (Imports):**
> لا توجد — `Math.PI` مدمج في `java.lang`.

**الناتج المتوقع (لقطة الشاشة):**
> يعمل عند استدعاء `circle1.getArea()` → `3.141592653589793` (للنصف القطر 1).

---

### 1.2. إنشاء كائنات واستخدامها — مثال `TestmCircle`

**النص الأصلي يقول:** يُنشئ ثلاثة كائنات بنصف أقطار 1، 25، 125 ثم يُعدّل `circle2.radius = 100`.

```java
public class TestmCircle {
    public static void main(String[] args) {
        mCircle circle1 = new mCircle();       // default radius = 1
        System.out.println(circle1.radius);    // prints: 1.0
        System.out.println(circle1.getArea()); // prints area

        mCircle circle2 = new mCircle(25);    // radius = 25
        System.out.println(circle2.radius);
        System.out.println(circle2.getArea());

        mCircle circle3 = new mCircle(125);   // radius = 125

        circle2.radius = 100; // direct field modification (no encapsulation here)
        System.out.println(circle2.radius);   // prints: 100.0
        System.out.println(circle2.getArea());
    }
}
```

#### شرح كل سطر:
1. `new mCircle()` → ينشئ كائنًا من نوع `mCircle` باستخدام البانٍ الافتراضي.
2. `circle1.radius` → الوصول المباشر للحقل — يعمل لأن `radius` ليست `private` هنا.
3. `circle2.radius = 100` → تعديل مباشر للحقل — مشكلة تصميم (لا تغليف)، سيُحلّ لاحقًا بـ`private` + `setter`.

#### مهم للامتحان ⚠️:
> الوصول المباشر لحقول الكائن ممكن فقط إذا لم تكن `private`. إذا كانت `private` وجب استخدام `getter/setter`.

**مثال من الامتحان:**
```
Q: What is printed by: mCircle c = new mCircle(); System.out.println(c.radius);
A) 0.0   B) 1.0   C) null   D) Compile error
Answer: B — لأن الحقل له قيمة افتراضية = 1.
```

---

### 2. التغليف (Encapsulation)

**النص الأصلي يقول:** حقل `private` لا يُمكن الوصول إليه من خارج الصنف. لجعله قابلاً للقراءة أضف `getter`، وللتعديل أضف `setter`.

**الشرح المبسّط:** التغليف كالدواء في كبسولة — المحتوى (البيانات) محمي، وتصل إليه فقط عبر الفتحة المحددة (getter/setter). بهذا تتحكم في صحة البيانات قبل قبولها.

**💡 التشبيه:**
> حساب البنك = `private balance`، ماكينة السحب = `getter`، تحويل المال = `setter`.
> **وجه الشبه:** لا تستطيع تغيير رصيدك مباشرة — تمر عبر نظام محدد.

---

### 2.1. مثال `BankAccount` مع التغليف

**💻 الكود: BankAccount مع private وgetters/setters**

#### ما هذا الكود؟
> يمثّل حساباً مصرفياً حيث الرصيد محمي بـ`private`، ويُعدّل فقط عبر `deposit` و`withdraw`.

```java
public class BankAccount {
    private double balance; // hidden from outside — encapsulation

    public BankAccount() {
        balance = 0; // default: zero balance
    }

    public BankAccount(double initialBalance) {
        balance = initialBalance; // set starting balance
    }

    public void deposit(double amount) {
        balance = balance + amount; // increase balance
    }

    public void withdraw(double amount) {
        balance = balance - amount; // decrease balance
    }

    public double getBalance() {
        return balance; // read-only access to balance
    }
}
```

#### شرح كل سطر:
1. `private double balance` → الرصيد مخفي — لا أحد يقرأه مباشرة.
2. `public BankAccount()` → بانٍ افتراضي يضع الرصيد صفراً.
3. `public void deposit(double amount)` → الطريقة الوحيدة لزيادة الرصيد.
4. `public void withdraw(double amount)` → الطريقة الوحيحة للسحب (يمكن إضافة فحص: `if (amount <= balance)`).
5. `public double getBalance()` → `getter` للرصيد — القراءة بدون تعديل.

```java
public class BankAccountTester {
    public static void main(String[] args) {
        BankAccount ba = new BankAccount(); // balance = 0
        ba.deposit(2000);                  // balance = 2000
        ba.withdraw(500);                  // balance = 1500
        System.out.println(ba.getBalance()); // Expected: 1500
    }
}
```

**الناتج المتوقع:**
> `1500.0`

---

### 3. المتغيرات والدوال الساكنة (Static Variables, Constants, and Methods)

**النص الأصلي يقول:** `instance variables` لها ذاكرة مستقلة لكل كائن. `static variables` مشتركة بين جميع الكائنات. `Constants` تُعرَّف بـ`final static`.

**الشرح المبسّط:** تخيّل صفًا دراسياً — لكل طالب اسمه الخاص (`instance variable`)، لكن اسم الصف الدراسي واحد مشترك (`static variable`). إذا أنشأنا 100 طالب، اسم الصف لا يتعدد.

#### 📊 المخطط: Static vs Instance Memory

#### ما هذا المخطط؟
> يوضح كيف أن `numberOfObjects` مشترك بين كل الكائنات بينما `radius` خاص بكل كائن.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
|---|---------|-------------|-------|
| 1 | Circle Class | class | الصنف نفسه |
| 2 | circle1 | object | كائن بـ radius=1 |
| 3 | circle2 | object | كائن بـ radius=5 |
| 4 | numberOfObjects=2 | static_field | مشترك بين circle1 وcircle2 |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|----|----|---------|----------|-------|
| Circle Class | circle1 | instantiate | directed | إنشاء كائن |
| Circle Class | circle2 | instantiate | directed | إنشاء كائن |
| circle1 | numberOfObjects=2 | shared ref | dashed | كلا الكائنين يشيران لنفس المتغير |
| circle2 | numberOfObjects=2 | shared ref | dashed | |

```diagram
type: class
title: Static vs Instance in Circle
direction: TD
nodes:
  - id: cls
    label: "Circle\n-radius: double\n-numberOfObjects: int (static)"
    kind: class
    level: 0
  - id: c1
    label: "circle1\nradius=1\nnumberOfObjects=2"
    kind: object
    level: 1
  - id: c2
    label: "circle2\nradius=5\nnumberOfObjects=2"
    kind: object
    level: 1
edges:
  - from: cls
    to: c1
    label: instantiate
  - from: cls
    to: c2
    label: instantiate
```

---

### 3.1. مثال `Circle` مع `static`

**💻 الكود: Circle مع numberOfObjects**

#### ما هذا الكود؟
> يستخدم `static` لحساب عدد الكائنات المُنشأة — هذا العداد مشترك ويُزداد في كل بانٍ.

```java
public class Circle {
    private double radius;                     // instance variable — unique per object
    private static int numberOfObjects = 0;   // static — shared across all objects

    public Circle() {
        radius = 1;         // default radius
        numberOfObjects++;  // increment shared counter
    }

    public Circle(double newRadius) {
        radius = newRadius; // set custom radius
        numberOfObjects++;  // increment shared counter
    }

    public static int getNumberOfObjects() {
        return numberOfObjects; // access static field in static method
    }

    public double getArea() {
        return radius * radius * Math.PI; // uses instance field
    }
}
```

#### شرح كل سطر:
1. `private static int numberOfObjects = 0` → متغير ساكن مشترك — يُهيَّأ مرة واحدة فقط.
2. `numberOfObjects++` في البانٍ → في كل مرة ننشئ كائنًا يزداد العداد.
3. `public static int getNumberOfObjects()` → دالة ساكنة تُستدعى بـ`Circle.getNumberOfObjects()` بدون كائن.
4. `getArea()` → دالة نسخة (`instance method`) تصل لـ`radius` الخاص بكل كائن.

#### مهم للامتحان ⚠️:
> الدالة `static` **لا تستطيع** الوصول لمتغيرات النسخة (`instance variables`) مباشرة. لكن دوال النسخة تستطيع الوصول لكل من `static` و`instance`.

**مثال من الامتحان:**
```
Q: In the same class, which access does a static method have?
A) Can access instance methods   B) Can invoke static methods and static fields only
C) Can access all fields          D) Cannot access any field

Answer: B — الدالة الساكنة تصل فقط للأعضاء الساكنة ضمن نفس الصنف.
```

---

### 4. محددات الرؤية (Visibility Modifiers)

**النص الأصلي يقول:** ثلاثة محددات رئيسية: `public` (من أي صنف)، `private` (داخل صنفه فقط)، وبدون محدد (package-private: من أي صنف في نفس الحزمة).

| المحدد | نفس الصنف | نفس الحزمة | صنف فرعي من حزمة أخرى | حزمة مختلفة |
|--------|-----------|-----------|----------------------|-------------|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| (بدون محدد) | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

**💡 التشبيه:**
> `public` = بوابة المدينة (الكل يدخل)، `private` = غرفة نومك (أنت فقط)، بدون محدد = مبنى سكني مغلق (السكان فقط).

#### مهم للامتحان ⚠️:
> في UML: `+` = `public`، `-` = `private`، `#` = `protected`، بدون رمز = package-private.

**مثال من الامتحان:**
```
Q: Given: package p1; class C1 { int y; private int z; } / package p2; class C3 {C1 o = new C1(); ...}
Which access is valid from C3?
A) o.y    B) o.z    C) Both    D) Neither

Answer: D — C3 in p2 cannot access y (package-private) nor z (private).
```

---

### 5. تمرير الكائنات للدوال (Passing Objects to Methods)

**النص الأصلي يقول:** عند تمرير كائن لدالة، يُمرَّر المرجع (`reference`) — التعديلات على الكائن داخل الدالة تؤثر على الأصل. أما المتغيرات البدائية (`primitive`) فتُمرَّر بالقيمة.

**الشرح المبسّط:** تخيّل أنك تعطي شخصًا مفتاح منزلك — يستطيع الدخول وتغيير الأثاث. هذا ما يحدث مع الكائنات. لكن إذا أعطيته ورقة كُتب عليها رقم — تعديله للرقم على الورقة لا يغيّر رقمك الأصلي.

**💻 الكود: TestPassObject**

#### ما هذا الكود؟
> يوضح الفرق بين تمرير كائن (بالمرجع — التعديل يؤثر على الأصل) وتمرير `int` (بالقيمة — لا يؤثر).

```java
public class TestPassObject {
    public static void main(String[] args) {
        CircleP myCircle = new CircleP(1); // circle with radius 1
        int n = 5;
        printAreas(myCircle, n); // pass object reference and int value
        System.out.println("Radius is " + myCircle.getRadius()); // prints 6.0 — changed!
        System.out.println("n is " + n);   // prints 5 — unchanged!
    }

    public static void printAreas(CircleP c, int times) {
        System.out.println("Radius \t\tArea");
        while (times >= 1) {
            System.out.println(c.getRadius() + "\t\t" + c.getArea()); // print current state
            c.setRadius(c.getRadius() + 1); // modify the ORIGINAL object
            times--;                         // only local copy decremented
        }
    }
}
```

#### شرح كل سطر:
1. `new CircleP(1)` → ينشئ كائنًا ويخزن مرجعه في `myCircle`.
2. `printAreas(myCircle, n)` → يمرر المرجع لـ`c` والقيمة `5` لـ`times`.
3. `c.setRadius(c.getRadius() + 1)` → يُعدّل الكائن الأصلي (لأن `c` يشير لنفس الكائن).
4. `times--` → يُغيّر النسخة المحلية فقط — `n` في `main` يبقى 5.

**الناتج المتوقع:**
> الـ`radius` لـ`myCircle` يصبح 6.0 بعد الدالة (تغيّر)، لكن `n` يبقى 5 (لم يتغيّر).

**🔍 تتبع التنفيذ: printAreas**

**المدخل:** `c.radius = 1`, `times = 5`

| الخطوة | `times` | `c.radius` | مساحة مطبوعة |
|--------|---------|-----------|--------------|
| 1 | 5 | 1.0 | 3.14... |
| 2 | 4 | 2.0 | 12.56... |
| 3 | 3 | 3.0 | 28.27... |
| 4 | 2 | 4.0 | 50.26... |
| 5 | 1 | 5.0 | 78.53... |
| بعد الدالة | — | 6.0 | — |

**النتيجة:** `myCircle.radius = 6.0`, `n = 5`

---

### 6. مصفوفة الكائنات (Array of Objects)

**النص الأصلي يقول:** يمكن إنشاء مصفوفة من الكائنات بنفس صيغة المصفوفات العادية.

```java
CircleP[] circleArray = new CircleP[5]; // array of 5 references (null initially)
for (int i = 0; i < circleArray.length; i++)
    circleArray[i] = new CircleP(Math.random() * 100); // create each object
```

#### ملاحظة:
> عند إنشاء `new CircleP[5]` يتم تخصيص 5 خانات تحتوي `null`. يجب إنشاء كل كائن بشكل منفصل.

**💻 الكود: TotalArea — مصفوفة دوائر**

#### ما هذا الكود؟
> ينشئ مصفوفة من 5 دوائر عشوائية ويطبع مجموع مساحاتها.

```java
public static CircleP[] createCircleArray() {
    CircleP[] circleArray = new CircleP[5]; // declare array of 5
    for (int i = 0; i < circleArray.length; i++)
        circleArray[i] = new CircleP(Math.random() * 100); // random radius 0-100
    return circleArray; // return the filled array
}

public static void printCircleArray(CircleP[] circleArray) {
    System.out.printf("%-30s%-15s\n", "Radius", "Area"); // formatted header
    for (int i = 0; i < circleArray.length; i++) {
        System.out.printf("%-30f%-15f\n",
            circleArray[i].getRadius(), circleArray[i].getArea()); // each circle
    }
    System.out.println("--------------------------------------------------");
    System.out.printf("%-30s%-15f\n", "The total area ", sum(circleArray)); // total
}

public static double sum(CircleP[] circleArray) {
    double sum = 0;
    for (int i = 0; i < circleArray.length; i++)
        sum += circleArray[i].getArea(); // accumulate areas
    return sum;
}
```

---

### 7. مرجع `this`

**النص الأصلي يقول:** الكلمة المفتاحية `this` تشير للكائن نفسه. تُستخدم لـ: (1) الإشارة لحقل الكائن عند تعارض الأسماء، (2) استدعاء بانٍ آخر من نفس الصنف.

**الشرح المبسّط:** `this` مثل قول «أنا» داخل الصنف. عندما يكون اسم المعامل مثل اسم الحقل، نقول `this.radius` للتمييز.

```java
public class Circle {
    private double radius;

    public Circle(double radius) {
        this.radius = radius; // 'this.radius' = field, 'radius' = parameter
    }

    public Circle() {
        this(1.0); // calls Circle(double radius) with value 1.0 — constructor chaining
    }
}
```

#### ⚙️ الخطوات / الخوارزمية: استخدامات this

#### ما هدف هذه العملية؟
> توضيح متى وكيف نستخدم `this` لتجنب الغموض والتكرار.

```algorithm
1 | تعارض اسم المعامل مع الحقل | this.field | this.radius = radius يميّز الحقل عن المعامل
2 | استدعاء بانٍ آخر | this(...) | يجب أن يكون أول سطر في البانٍ
3 | تمرير الكائن نفسه | return this | يتيح تسلسل الاستدعاءات (method chaining)
```

**مثال من الامتحان:**
```
Q: What does this(1.0) inside a constructor do?
A) Creates a new object   B) Calls another constructor of the same class with argument 1.0
C) Refers to a static method   D) Returns the current object

Answer: B — يستدعي بانيًا آخر من نفس الصنف (Constructor Chaining).
```

---

### 8. التفكير كائني التوجه (Object-Oriented Thinking)

**النص الأصلي يقول:** OOP يعني نمذجة المسائل الحقيقية كأصناف بحقول ودوال. المحاضرة تعرض ثلاثة أمثلة: `Loan`, `BMI`, `Course`.

---

### 8.1. صنف `Loan`

**النص الأصلي يقول:** الصنف `Loan` يحتوي أربعة حقول: `annualInterestRate`, `numberOfYears`, `loanAmount`, `loanDate`.

**💻 الكود: Loan class كامل**

#### ما هذا الكود؟
> يمثّل قرضاً مصرفياً، ويحسب الدفع الشهري والإجمالي باستخدام صيغة القسط الثابت.

```java
public class Loan {
    private double annualInterestRate; // yearly interest rate (e.g. 6.0)
    private int numberOfYears;         // loan duration in years
    private double loanAmount;         // principal amount
    private java.util.Date loanDate;   // date loan was created

    public Loan() {
        this(2.5, 1, 1000); // default values via constructor chaining
    }

    public Loan(double annualInterestRate, int numberOfYears, double loanAmount) {
        this.annualInterestRate = annualInterestRate;
        this.numberOfYears = numberOfYears;
        this.loanAmount = loanAmount;
        loanDate = new java.util.Date(); // capture creation date/time
    }

    public double getMonthlyPayment() {
        double monthlyInterestRate = annualInterestRate / 1200; // annual → monthly
        // standard amortization formula
        double monthlyPayment = loanAmount * monthlyInterestRate /
            (1 - (Math.pow(1 / (1 + monthlyInterestRate), numberOfYears * 12)));
        return monthlyPayment;
    }

    public double getTotalPayment() {
        return getMonthlyPayment() * numberOfYears * 12; // monthly × number of payments
    }

    public java.util.Date getLoanDate() { return loanDate; }
    public double getAnnualInterestRate() { return annualInterestRate; }
    public void setAnnualInterestRate(double r) { this.annualInterestRate = r; }
    public int getNumberOfYears() { return numberOfYears; }
    public void setNumberOfYears(int y) { this.numberOfYears = y; }
    public double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(double a) { this.loanAmount = a; }
}
```

**الناتج المتوقع (Rate=6, Years=15, Amount=500000):**
> `Monthly: 4219.28`, `Total: 759471.15`

---

### 8.2. صنف `BMI`

**النص الأصلي يقول:** يحسب مؤشر كتلة الجسم `BMI = weight / (height × height)` ويُصنّف النتيجة.

```java
public class BMI {
    private String name; private int age;
    private double weight; private double height;

    public BMI(String name, int age, double weight, double height) {
        this.name = name; this.age = age;
        this.weight = weight; this.height = height;
    }

    public BMI(String name, double weight, double height) {
        this(name, 20, weight, height); // default age = 20
    }

    public double getBMI() {
        double bmi = weight / (height * height); // BMI formula
        return Math.round(bmi * 100) / 100.0;   // round to 2 decimal places
    }

    public String getStatus() {
        double bmi = getBMI();
        if (bmi < 16) return "seriously underweight";
        else if (bmi < 18) return "underweight";
        else if (bmi < 24) return "normal weight";
        else if (bmi < 29) return "over weight";
        else if (bmi < 35) return "seriously over weight";
        else return "gravely over weight";
    }
}
```

---

### 8.3. صنف `Course`

**النص الأصلي يقول:** صنف `Course` يدير قائمة طلاب (مصفوفة `String` بسعة 100).

```java
public class Course {
    private String courseName;
    private String[] students = new String[100]; // up to 100 students
    private int numberOfStudents;                // current count

    public Course(String courseName) {
        this.courseName = courseName;
    }

    public void addStudent(String student) {
        students[numberOfStudents] = student; // add at next available slot
        numberOfStudents++;
    }

    public String[] getStudents() { return students; }
    public int getNumberOfStudents() { return numberOfStudents; }
    public String getCourseName() { return courseName; }

    public void dropStudent(String student) {
        // Left as exercise — غير مشروحة في المحاضرة
    }
}
```

---

### 8.4. صنف `StackOfIntegers`

**النص الأصلي يقول:** يُصمّم صنف stack لتخزين أعداد صحيحة مع توسيع تلقائي.

**💻 الكود: StackOfIntegers**

#### ما هذا الكود؟
> مكدس (`Stack`) للأعداد الصحيحة يوسّع حجمه تلقائيًا عند الامتلاء بمضاعفة الطاقة.

```java
public class StackOfIntegers {
    private int[] elements;            // internal array to store elements
    private int size;                  // current number of elements
    public static final int DEFAULT_CAPACITY = 16; // constant shared by all

    public StackOfIntegers() {
        this(DEFAULT_CAPACITY); // delegate to parameterized constructor
    }

    public StackOfIntegers(int capacity) {
        elements = new int[capacity]; // allocate initial array
    }

    public void push(int value) {
        if (size >= elements.length) {      // array is full — need to expand
            int[] temp = new int[elements.length * 2]; // double the size
            System.arraycopy(elements, 0, temp, 0, elements.length); // copy old data
            elements = temp;               // replace with larger array
        }
        elements[size++] = value;          // insert and increment size
    }

    public int pop()  { return elements[--size]; }    // remove and return top
    public int peek() { return elements[size - 1]; }  // read top without removing
    public boolean empty() { return size == 0; }      // check if stack is empty
    public int getSize()   { return size; }           // return current size
}
```

#### شرح كل سطر:
1. `elements.length * 2` → يضاعف السعة (استراتيجية التوسع الهندسي — تقلل عمليات النسخ).
2. `System.arraycopy(src, srcPos, dest, destPos, length)` → ينسخ المصفوفة القديمة للجديدة.
3. `elements[size++] = value` → يضع القيمة في الموضع `size` ثم يزيد `size` بواحد (post-increment).
4. `elements[--size]` في `pop` → يُنقص `size` أولًا ثم يُرجع العنصر (pre-decrement).

**🔍 تتبع التنفيذ: push للأعداد 0-9 ثم pop كلها**

**المدخل:** `for (int i = 0; i < 10; i++) stack.push(i);`

| الخطوة | العملية | `size` | `elements[top]` |
|--------|---------|--------|-----------------|
| push(0) | إضافة 0 | 1 | 0 |
| push(5) | إضافة 5 | 6 | 5 |
| push(9) | إضافة 9 | 10 | 9 |
| pop() | إزالة | 9 | 8 |
| pop() | إزالة | 8 | 7 |

**النتيجة:** تُطبع `9 8 7 6 5 4 3 2 1 0` (LIFO: آخر داخل أول خارج).

---

### 9. أصناف التغليف للأنواع البدائية (Wrapper Classes)

**النص الأصلي يقول:** القيمة البدائية ليست كائنًا، لكن يمكن تغليفها في كائن باستخدام `wrapper class`.

| النوع البدائي | صنف التغليف |
|---------------|------------|
| `boolean` | `Boolean` |
| `char` | `Character` |
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |

```java
Integer[] intArray = {1, 2, 3}; // autoboxing: int → Integer automatically
System.out.println(intArray[0] + intArray[1] + intArray[2]); // auto-unboxing: Integer → int
```

#### ملاحظة:
> **Auto-boxing:** Java تحوّل تلقائيًا `int` → `Integer` عند الحاجة.
> **Auto-unboxing:** Java تحوّل تلقائيًا `Integer` → `int` عند الحاجة.

---

### 10. صنف `String`

**النص الأصلي يقول:** كائن `String` **غير قابل للتغيير** (`immutable`). إذا كتبت `String s1 = "Welcome"` تُخزَّن في مجمع الثوابت (`string pool`).

```java
String s1 = "Welcome to Java";           // stored in string pool (interned)
String s2 = new String("Welcome to Java"); // new object in heap
String s3 = "Welcome to Java";           // points to same pool object as s1
// s1 == s3 → true  (same reference in pool)
// s1 == s2 → false (s2 is a separate heap object)
// s1.equals(s2) → true (same content)
```

#### مهم للامتحان ⚠️:
> `==` يقارن المراجع. `.equals()` يقارن المحتوى. استخدم دائمًا `.equals()` لمقارنة محتوى `String`.

---

### 11. `StringBuilder` و`StringBuffer`

**النص الأصلي يقول:** `String` غير قابل للتغيير — كل تعديل ينشئ كائنًا جديدًا. `StringBuilder` قابل للتعديل وأسرع في الحلقات.

| الميزة | `String` | `StringBuilder` | `StringBuffer` |
|--------|---------|-----------------|----------------|
| القابلية للتعديل | ❌ immutable | ✅ mutable | ✅ mutable |
| Thread-safe | ✅ | ❌ | ✅ |
| الأداء | أبطأ في الحلقات | ✅ سريع | أبطأ من `StringBuilder` |

**💻 الكود: Palindrome باستخدام StringBuilder**

#### ما هذا الكود؟
> يتحقق إذا كانت سلسلة نصية palindrome (تُقرأ من الاتجاهين) بتجاهل الرموز غير الأبجدية.

```java
public static boolean isPalindrome(String s) {
    String s1 = filter(s);             // remove non-alphanumeric
    String s2 = reverse(s1);           // reverse filtered string
    return s2.equals(s1);              // compare
}

public static String filter(String s) {
    StringBuilder sb = new StringBuilder(); // mutable string builder
    for (int i = 0; i < s.length(); i++) {
        if (Character.isLetterOrDigit(s.charAt(i))) // keep only alphanumeric
            sb.append(s.charAt(i));
    }
    return sb.toString(); // convert back to String
}

public static String reverse(String s) {
    StringBuilder sb = new StringBuilder(s); // wrap in builder
    sb.reverse();                             // built-in reverse method
    return sb.toString();
}
```

---

### 12. الوراثة (Inheritance)

**النص الأصلي يقول:** OOP يسمح بتعريف أصناف جديدة من أصناف موجودة — يُسمى هذا **الوراثة** (`inheritance`).

**الشرح المبسّط:** مثل أن `Circle` و`Rectangle` يرثان من `GeometricObject` — يحصلان تلقائيًا على اللون وتاريخ الإنشاء بدون إعادة كتابتهما.

#### 📊 المخطط: هرمية الوراثة

#### ما هذا المخطط؟
> يوضح أن `Circle` و`Rectangle` يرثان خصائص ودوال `GeometricObject`.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
|---|---------|-------------|-------|
| 1 | GeometricObject | class | الصنف الأب (superclass) |
| 2 | Circle | class | صنف ابن يضيف radius |
| 3 | Rectangle | class | صنف ابن يضيف width+height |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|----|----|---------|----------|-------|
| Circle | GeometricObject | extends | inheritance | يرث جميع الخصائص العامة |
| Rectangle | GeometricObject | extends | inheritance | يرث جميع الخصائص العامة |

```diagram
type: class
title: Inheritance Hierarchy
direction: TD
nodes:
  - id: geo
    label: "GeometricObject\n-color: String\n-filled: boolean\n-dateCreated: Date"
    kind: class
    level: 0
  - id: circle
    label: "Circle\n-radius: double\n+getArea()\n+getPerimeter()"
    kind: class
    level: 1
  - id: rect
    label: "Rectangle\n-width: double\n-height: double\n+getArea()\n+getPerimeter()"
    kind: class
    level: 1
edges:
  - from: circle
    to: geo
    label: extends
  - from: rect
    to: geo
    label: extends
```

---

### 12.1. الصنف `GeometricObject`

**💻 الكود: GeometricObject**

#### ما هذا الكود؟
> الصنف الأب الذي يُعرّف الخصائص المشتركة لجميع الأشكال الهندسية.

```java
public class GeometricObject {
    private String color = "white";       // default color
    private boolean filled;               // is shape filled?
    private java.util.Date dateCreated;   // auto-set on creation

    public GeometricObject() {
        dateCreated = new java.util.Date(); // record creation time
    }

    public GeometricObject(String color, boolean filled) {
        dateCreated = new java.util.Date();
        this.color = color;
        this.filled = filled;
    }

    public String getColor()   { return color; }
    public void setColor(String color) { this.color = color; }
    public boolean isFilled()  { return filled; }
    public void setFilled(boolean filled) { this.filled = filled; }
    public java.util.Date getDateCreated() { return dateCreated; }

    public String toString() {
        return dateCreated + "\ncolor: " + color + " and filled: " + filled; // override toString
    }
}
```

---

### 12.2. صنف `Circle` الوارث

```java
public class Circle extends GeometricObject { // inherits from GeometricObject
    private double radius;

    public Circle() { }

    public Circle(double radius) { this.radius = radius; }

    public Circle(double radius, String color, boolean filled) {
        this.radius = radius;
        setColor(color);      // call inherited setter — can't access private directly
        setFilled(filled);
    }

    public double getRadius()     { return radius; }
    public void setRadius(double r) { this.radius = r; }
    public double getArea()       { return radius * radius * Math.PI; }
    public double getDiameter()   { return 2 * radius; }
    public double getPerimeter()  { return 2 * radius * Math.PI; }

    public void printCircle() {
        System.out.println(getDateCreated() + " and the radius is " + radius);
    }
}
```

---

### 13. كلمة `super`

**النص الأصلي يقول:** `super` تستخدم لـ: (1) استدعاء بانٍ الصنف الأب، (2) استدعاء دالة الصنف الأب.

```java
public Circle(double radius, String color, boolean filled) {
    super(color, filled); // calls GeometricObject(String, boolean) — Constructor Chaining
    this.radius = radius;
}
```

```java
@Override
public String toString() {
    return super.toString() + "\nradius is " + radius; // extend parent's toString
}
```

#### مهم للامتحان ⚠️:
> `super(...)` يجب أن يكون **أول سطر** في البانٍ. إذا لم تكتبه، تستدعي Java تلقائيًا `super()` بدون وسيط.

**مثال من الامتحان:**
```
Q: When super() is not explicitly called in a subclass constructor, Java:
A) Throws an error   B) Calls super() with no arguments automatically
C) Does not call parent constructor   D) Calls the first available super constructor

Answer: B — تستدعي Java super() الافتراضي تلقائيًا.
```

---

### 14. تعدد الأشكال (Polymorphism)

**النص الأصلي يقول:** دالة تقبل `GeometricObject` كمعامل تعمل مع أي صنف ابن (`Circle`, `Rectangle`).

```java
public class PolymorphismDemo {
    public static void main(String[] args) {
        displayObject(new Circle(1, "red", false));
        displayObject(new Rectangle(1, 1, "black", true));
    }

    public static void displayObject(GeometricObject object) {
        // works with ANY subclass of GeometricObject
        System.out.println("Created on " + object.getDateCreated()
            + ". Color is " + object.getColor());
    }
}
```

**💡 التشبيه:**
> تعدد الأشكال كمفتاح عام — مفتاح واحد يفتح أبواباً مختلفة لها نفس النوع من القفل.
> **وجه الشبه:** `GeometricObject` = القفل العام، `Circle/Rectangle` = الأبواب المختلفة.

---

### 15. الصب والتحقق (`instanceof` + Casting)

**النص الأصلي يقول:** `instanceof` للتحقق من نوع الكائن قبل الصب (`casting`).

```java
public static void displayObject(Object object) {
    if (object instanceof Circle) {
        // safe to cast now
        System.out.println("Area: " + ((Circle)object).getArea());
        System.out.println("Diameter: " + ((Circle)object).getDiameter());
    }
    else if (object instanceof Rectangle) {
        System.out.println("Area: " + ((Rectangle)object).getArea());
    }
}
```

#### مهم للامتحان ⚠️:
> تنزيل الكائن (`downcast`) بدون `instanceof` قد يُسبب `ClassCastException` في وقت التشغيل.

---

### 16. صنف `ArrayList`

**النص الأصلي يقول:** `ArrayList<E>` يُخزّن قائمة من الكائنات مع تغيير حجم ديناميكي.

| الدالة | الوظيفة |
|--------|---------|
| `add(o)` | يضيف عنصرًا في النهاية |
| `add(index, o)` | يضيف عند موضع محدد |
| `get(index)` | يُرجع عنصرًا |
| `remove(o)` | يحذف أول تكرار للعنصر |
| `remove(index)` | يحذف عند موضع |
| `size()` | يُرجع عدد العناصر |
| `contains(o)` | يتحقق من وجود عنصر |
| `isEmpty()` | هل القائمة فارغة؟ |
| `indexOf(o)` | موضع أول تكرار |
| `set(index, o)` | يستبدل عنصرًا |
| `clear()` | يمسح الكل |

**💻 الكود: DistinctNumbers**

#### ما هذا الكود؟
> يقرأ أعدادًا من المستخدم ويحتفظ فقط بالأعداد غير المكررة.

```java
ArrayList<Integer> list = new ArrayList<>(); // dynamic list of integers
Scanner input = new Scanner(System.in);
int value;
do {
    value = input.nextInt();
    if (!list.contains(value) && value != 0) // skip duplicates and terminator
        list.add(value);
} while (value != 0); // 0 is sentinel value

for (int i = 0; i < list.size(); i++)
    System.out.print(list.get(i) + " "); // print distinct numbers
```

---

### 17. دوال مفيدة للقوائم (Useful Methods for Lists)

**النص الأصلي يقول:** Java توفر `Arrays.asList()` لتحويل مصفوفة لـ`ArrayList`، وفئة `java.util.Collections` لدوال الفرز والإيجاد.

```java
// Array to ArrayList
String[] array = {"red", "green", "blue"};
ArrayList<String> list = new ArrayList<>(Arrays.asList(array));

// ArrayList to Array
String[] array1 = new String[list.size()];
list.toArray(array1);

// Collections operations
java.util.Collections.sort(list);    // sort ascending
java.util.Collections.max(list);     // find maximum
java.util.Collections.min(list);     // find minimum
java.util.Collections.shuffle(list); // random shuffle
```

---

### 18. صنف مكدس مخصص (Custom Stack using ArrayList)

**💻 الكود: MyStack**

#### ما هذا الكود؟
> مكدس عام (`generic stack`) يستخدم `ArrayList<Object>` داخليًا.

```java
import java.util.ArrayList;
public class MyStack {
    private ArrayList<Object> list = new ArrayList<>(); // backing store

    public boolean isEmpty() { return list.isEmpty(); }
    public int getSize()     { return list.size(); }

    public Object peek() {
        return list.get(getSize() - 1); // top element without removal
    }

    public Object pop() {
        Object o = list.get(getSize() - 1); // get top
        list.remove(getSize() - 1);          // remove top
        return o;
    }

    public void push(Object o) { list.add(o); } // add to top

    @Override
    public String toString() {
        return "stack: " + list.toString(); // display stack contents
    }
}
```

---

### 19. البيانات المحمية (Protected Data and Methods)

**النص الأصلي يقول:** العضو `protected` يمكن الوصول إليه من الصنف الفرعي في أي حزمة.

| المحدد | نفس الصنف | نفس الحزمة | صنف فرعي (حزمة أخرى) | حزمة مختلفة |
|--------|-----------|-----------|----------------------|-------------|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| بدون محدد | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

> في UML: `#` = `protected`.

---

### 20. الأصناف المجردة (Abstract Classes)

**النص الأصلي يقول:** الصنف المجرد يحتوي على دوال مجردة (`abstract methods`) — بدون تنفيذ. لا يمكن إنشاء كائن منه مباشرة، لكن يمكن إنشاء مرجع.

```java
public abstract class GeometricObject {
    // ... fields and regular methods ...
    public abstract double getArea();       // no body — subclasses MUST implement
    public abstract double getPerimeter();  // no body — subclasses MUST implement
}
```

#### ⚙️ الخطوات / الخوارزمية: قواعد الأصناف المجردة

```algorithm
1 | الصنف يحتوي دالة abstract | abstract class | يجب تعريف الصنف بـ abstract
2 | الدالة abstract | الصنف الابن | يجب تنفيذها في كل صنف ابن غير مجرد
3 | إذا الابن لم ينفذ كل abstract | abstract class (الابن) | الابن نفسه يجب أن يكون abstract
4 | الدوال abstract | non-static فقط | لا يوجد abstract static method
5 | إنشاء كائن | ممنوع بـ new | يمكن إنشاء مرجع: GeometricObject g = new Circle(5);
```

#### مهم للامتحان ⚠️:
> `GeometricObject[] objects = new GeometricObject[10];` ← هذا **مسموح** (مصفوفة مراجع).
> `new GeometricObject()` ← هذا **ممنوع** (لا يمكن إنشاء كائن من صنف مجرد).

**مثال من الامتحان:**
```
Q: Which statement about abstract methods is TRUE?
A) They can be static   B) They must have a body
C) They must be implemented in concrete subclasses   D) They cannot be in abstract classes

Answer: C — الصنف الابن الملموس يجب أن يُنفّذ كل الدوال المجردة.
```

---

### 21. `BigInteger` و`BigDecimal`

**النص الأصلي يقول:** يمكن استخدام `BigInteger` و`BigDecimal` لتمثيل أعداد أو كسور بدقة لا محدودة.

```java
import java.math.*;
public class LargeFactorial {
    public static BigInteger factorial(long n) {
        BigInteger result = BigInteger.ONE; // start with 1
        for (int i = 1; i <= n; i++)
            result = result.multiply(new BigInteger(i+"")); // big multiplication
        return result;
    }
}
```

**💡 التشبيه:**
> `int` مثل آلة حاسبة جيب — تتجاوز حدها؟ overflow. `BigInteger` مثل ورقة لا نهائية — تكتب ما تريد.

---

### 22. الواجهات (Interfaces)

**النص الأصلي يقول:** `Interface` بنية شبيهة بالصنف تُعرّف عمليات مشتركة. الصنف يمكنه تنفيذ واجهات متعددة.

**الشرح المبسّط:** الواجهة عقد — إذا وقّعت عليه، يجب أن تُنفّذ كل بنوده. `Chicken` توقّع على `Edible` (يمكن أكله) و`Animal` (له صوت) في آنٍ واحد.

#### 📊 المخطط: هرمية الواجهات

```diagram
type: class
title: Interfaces Example
direction: TD
nodes:
  - id: edible
    label: "«interface»\nEdible\n+howToEat(): String"
    kind: class
    level: 0
  - id: animal
    label: "Animal\n+sound(): String"
    kind: class
    level: 0
  - id: fruit
    label: "«abstract»\nFruit"
    kind: class
    level: 1
  - id: chicken
    label: "Chicken"
    kind: class
    level: 1
  - id: tiger
    label: "Tiger"
    kind: class
    level: 1
  - id: apple
    label: "Apple"
    kind: class
    level: 2
  - id: orange
    label: "Orange"
    kind: class
    level: 2
edges:
  - from: fruit
    to: edible
    label: implements
  - from: chicken
    to: edible
    label: implements
  - from: chicken
    to: animal
    label: extends
  - from: tiger
    to: animal
    label: extends
  - from: apple
    to: fruit
    label: extends
  - from: orange
    to: fruit
    label: extends
```

**💻 الكود: Edible Interface**

```java
public interface Edible {
    public abstract String howToEat(); // every Edible must implement this
}

abstract class Animal {
    public abstract String sound(); // every Animal must implement this
}

abstract class Fruit implements Edible { }  // Fruit is Edible but abstract

class Apple extends Fruit {
    @Override
    public String howToEat() { return "Make apple cake"; }
}

class Chicken extends Animal implements Edible {
    @Override
    public String howToEat() { return "chickinena"; }
    @Override
    public String sound()    { return "koko koko"; }
}

class Tiger extends Animal {
    @Override
    public String sound() { return "OOAARR"; }
}
```

```java
public class TestEdible {
    public static void main(String[] args) {
        Object[] objects = {new Tiger(), new Chicken(), new Apple()};
        for (int i = 0; i < objects.length; i++) {
            if (objects[i] instanceof Edible)
                System.out.println(((Edible)objects[i]).howToEat());
            if (objects[i] instanceof Animal)
                System.out.println(((Animal)objects[i]).sound());
        }
    }
}
```

**الناتج المتوقع:**
> `OOAARR` (Tiger.sound) → `chickinena` (Chicken.howToEat) → `koko koko` (Chicken.sound) → `Make apple cake` (Apple.howToEat)

---

### 23. واجهة `Comparable`

**النص الأصلي يقول:** `Comparable<E>` تُعرّف دالة `compareTo(E o)` لمقارنة الكائنات.

```java
package java.lang;
public interface Comparable<E> {
    public int compareTo(E o); // return: negative if less, 0 if equal, positive if greater
}
```

| التعبير | النتيجة |
|---------|---------|
| `new Integer(3).compareTo(new Integer(5))` | `-1` (3 < 5) |
| `"ABC".compareTo("ABE")` | `-2` (C أصغر من E بفارق 2) |
| `date1.compareTo(date2)` (date1 > date2) | `1` (양수) |

**💻 الكود: ComparableRectangle**

```java
public class ComparableRectangle extends Rectangle
    implements Comparable<ComparableRectangle> {

    public ComparableRectangle(double width, double height) {
        super(width, height); // call Rectangle constructor
    }

    @Override
    public int compareTo(ComparableRectangle o) {
        if (getArea() > o.getArea())       return 1;   // this is larger
        else if (getArea() < o.getArea())  return -1;  // this is smaller
        else                               return 0;   // equal
    }

    @Override
    public String toString() {
        return super.toString() + " Area: " + getArea(); // extend parent's toString
    }
}
```

```java
// Sort rectangles by area
ComparableRectangle[] rectangles = {
    new ComparableRectangle(3.4, 5.4),
    new ComparableRectangle(13.24, 55.4),
    new ComparableRectangle(7.4, 35.4),
    new ComparableRectangle(1.4, 25.4)
};
java.util.Arrays.sort(rectangles); // uses compareTo internally
```

---

### 24. واجهة `Cloneable`

**النص الأصلي يقول:** `Cloneable` تُحدد أن الكائن يمكن نسخه. تستدعي `clone()` الموروثة من `Object`.

```java
Calendar calendar = new GregorianCalendar(2013, 2, 1);
Calendar calendar1 = calendar;                   // same reference
Calendar calendar2 = (Calendar)calendar.clone(); // deep copy — new object

System.out.println(calendar == calendar1);           // true  (same ref)
System.out.println(calendar == calendar2);           // false (different object)
System.out.println(calendar.equals(calendar2));      // true  (same content)
```

#### مهم للامتحان ⚠️:
> `clone()` تنسخ الكائن (نسخة مستقلة). التعديل على النسخة لا يؤثر على الأصل.

---

### 25. مقارنة: Interfaces مقابل Abstract Classes

**النص الأصلي يقول:** الصنف يمكنه تنفيذ واجهات متعددة (`multiple interfaces`) لكن يرث من صنف أب واحد فقط.

| المعيار | `Abstract Class` | `Interface` |
|---------|-----------------|-------------|
| المتغيرات | بلا قيود | يجب أن تكون `public static final` |
| البناؤون | يُستدعون من الأبناء، لا `new` مباشرة | لا بناؤون |
| الدوال | بلا قيود | يجب أن تكون `public abstract` |
| الوراثة | صنف ابن واحد فقط (`extends`) | يمكن تنفيذ أكثر من واجهة (`implements`) |
| متى تستخدم | عندما الأبناء يشتركون في حالة وسلوك | عندما تريد تعريف عقد بدون حالة |

**⚖️ المقايضة: Abstract Class vs Interface**

| | `Abstract Class` | `Interface` |
|--|-----------------|-------------|
| المزايا | يمكن حالة مشتركة، constructors، كود مشترك | multiple implementation، يفصل العقد عن التنفيذ |
| العيوب | وراثة فردية — قيد | لا حالة (state) — كل المتغيرات `static final` |
| متى تختاره | أصناف لها علاقة "is-a" وحالة مشتركة | تعريف عقد مشترك لأصناف غير مترابطة |

---

## الجزء الثاني: ملخص منظم

### جدول التعريفات الأساسية

| المصطلح | التعريف | مثال |
|---------|---------|------|
| `class` | قالب يعرّف الحقول والدوال | `class Circle { double radius; }` |
| `object` | نسخة من الصنف | `new Circle(5)` |
| `constructor` | دالة خاصة لإنشاء الكائن | `Circle() { }` |
| `encapsulation` | إخفاء البيانات خلف `private` + getter/setter | `private double radius;` |
| `static` | ينتمي للصنف لا للكائن | `static int count;` |
| `this` | مرجع للكائن الحالي | `this.radius = radius;` |
| `super` | مرجع للصنف الأب | `super(color, filled);` |
| `inheritance` | وراثة صنف من آخر | `class Circle extends GeometricObject` |
| `polymorphism` | معاملة أنواع مختلفة بنفس الطريقة | `displayObject(GeometricObject o)` |
| `abstract class` | صنف يحتوي دوالاً بلا تنفيذ | `abstract class Shape { abstract double area(); }` |
| `interface` | عقد بدوال `abstract` فقط | `interface Edible { String howToEat(); }` |
| `override` | إعادة تعريف دالة موروثة | `@Override public String toString()` |
| `instanceof` | فحص نوع الكائن | `if (x instanceof Circle)` |
| `casting` | تحويل مرجع لنوع محدد | `((Circle)obj).getArea()` |
| `wrapper class` | صنف يُغلّف نوعًا بدائيًا | `Integer`, `Double` |
| `autoboxing` | تحويل تلقائي من بدائي → كائن | `Integer x = 5;` |
| `ArrayList` | قائمة ديناميكية | `new ArrayList<String>()` |
| `Comparable` | واجهة المقارنة | `compareTo()` |
| `Cloneable` | واجهة النسخ | `clone()` |

---

### جدول الأخطاء الشائعة

| الخطأ | السبب | الحل |
|-------|-------|------|
| `NullPointerException` على مصفوفة كائنات | إنشاء المصفوفة بدون إنشاء الكائنات | أنشئ كل كائن في حلقة |
| `ClassCastException` | صب (`cast`) بدون `instanceof` | افحص دائمًا بـ`instanceof` أولًا |
| `super()` ليس أول سطر | وضعه بعد كود آخر في البانٍ | يجب أن يكون السطر الأول |
| الوصول لـ`instance field` من `static method` | static لا تعرف "أي كائن" | حوّل الدالة لـinstance أو استخدم static field |
| `new AbstractClass()` | محاولة إنشاء كائن من صنف مجرد | استخدم صنفًا ابنًا ملموسًا |
| مقارنة `String` بـ`==` | يقارن المراجع لا المحتوى | استخدم `.equals()` |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: إنشاء صنف متكامل

```algorithm
1 | تعريف الحقول | private type field | اجعلها private دائمًا
2 | كتابة البانٍ الافتراضي | Constructor() | قيم افتراضية معقولة
3 | كتابة البانٍ بمعاملات | Constructor(params) | استخدم this.field = param
4 | إضافة getters وsetters | public type getX() / setX() | للحقول التي تحتاج وصولًا خارجيًا
5 | إضافة الدوال التنفيذية | public methods | الوظائف الأساسية للصنف
6 | Override toString() | @Override public String toString() | للطباعة السهلة
```

#### ⚙️ الخطوات / الخوارزمية: إنشاء صنف وارث

```algorithm
1 | تعريف الصنف الابن | class Child extends Parent | يرث جميع الأعضاء العامة/المحمية
2 | استدعاء بانٍ الأب | super(args) | يجب أن يكون أول سطر في البانٍ
3 | إضافة الحقول الخاصة | private fields | حقول خاصة بالصنف الابن
4 | Override الدوال | @Override method | تعديل سلوك الدوال الموروثة
5 | استدعاء super للدوال | super.method() | إذا أردت تمديد السلوك الأصلي
```

#### ⚙️ الخطوات / الخوارزمية: تنفيذ واجهة (Interface)

```algorithm
1 | تعريف الواجهة | public interface Name { abstract methods } | فقط signatures
2 | تنفيذها في الصنف | class Foo implements Name | الصنف يلتزم بالعقد
3 | تنفيذ كل الدوال | @Override methods | كل دالة abstract يجب تنفيذها
4 | استخدام مرجع الواجهة | Name obj = new Foo() | polymorphism عبر الواجهة
5 | التحقق من النوع | instanceof Name | قبل الصب
```

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
Which of the following correctly creates a Circle object with radius 5?
أ) `Circle c = Circle(5);`  ب) `Circle c = new Circle(5);`  ج) `circle c = new Circle(5);`  د) `new Circle c(5);`
**الإجابة الصحيحة: ب** — **التعليل:** يجب استخدام `new` مع اسم الصنف الصحيح `Circle`.

---

### السؤال 2 (متوسط)
What is the output of `System.out.println(circle2.getArea())` if `circle2.radius = 100` after setting it to 25?
أ) `1963.49`  ب) `490.87`  ج) `31415.92`  د) `7853.98`
**الإجابة الصحيحة: ج** — **التعليل:** `100 × 100 × π ≈ 31415.92`

---

### السؤال 3 (صعب)
Given a class with `private static int count = 0; count++;` in each constructor. If we create 3 objects, what is `Circle.getNumberOfObjects()`?
أ) `0`  ب) `1`  ج) `3`  د) خطأ في الترجمة
**الإجابة الصحيحة: ج** — **التعليل:** `static` مشترك — كل بانٍ يزيده بواحد.

---

### السؤال 4 (صعب)
In Java, which modifier allows access from a subclass in a different package?
أ) `private`  ب) default (no modifier)  ج) `protected`  د) All of the above
**الإجابة الصحيحة: ج** — **التعليل:** `protected` وحده يتيح الوصول للأصناف الفرعية في حزمة مختلفة.

---

### السؤال 5 (متوسط)
What does `this(2.5, 1, 1000)` inside a constructor do?
أ) Creates a new object  ب) Calls another constructor of the same class  ج) Calls a superclass constructor  د) Refers to static method
**الإجابة الصحيحة: ب** — **التعليل:** `this(...)` يستدعي بانيًا آخر — Constructor Chaining.

---

### السؤال 6 (صعب)
After calling `printAreas(myCircle, n)` where inside the method `c.setRadius(c.getRadius() + 1)` runs 5 times starting from radius=1, what is `myCircle.getRadius()`?
أ) `1.0`  ب) `5.0`  ج) `6.0`  د) `0.0`
**الإجابة الصحيحة: ج** — **التعليل:** الكائن يُمرَّر بالمرجع، التعديلات تؤثر على الأصل.

---

### السؤال 7 (متوسط)
What happens when you call `new GeometricObject[]` where `GeometricObject` is abstract?
أ) Compile error  ب) Runtime error  ج) Valid — creates array of references  د) Creates 0 objects
**الإجابة الصحيحة: ج** — **التعليل:** إنشاء **مصفوفة مراجع** للصنف المجرد مسموح، لكن `new GeometricObject()` ممنوع.

---

### السؤال 8 (متوسط)
Which method does `ArrayList` use to check if an element exists?
أ) `has()`  ب) `exists()`  ج) `contains()`  د) `find()`
**الإجابة الصحيحة: ج** — **التعليل:** `contains(Object o)` هي الدالة الصحيحة في `ArrayList`.

---

### السؤال 9 (صعب)
What does `compareTo()` return when `"ABC".compareTo("ABE")` is called?
أ) `1`  ب) `-1`  ج) `-2`  د) `0`
**الإجابة الصحيحة: ج** — **التعليل:** الفرق بين `'C'(67)` و`'E'(69)` = `-2`.

---

### السؤال 10 (صعب)
In the `StackOfIntegers`, what does `elements[--size]` in `pop()` do?
أ) Reads index `size` then decrements  ب) Decrements `size` then reads `elements[size]`  ج) Removes last element without returning  د) Throws exception
**الإجابة الصحيحة: ب** — **التعليل:** `--size` هو pre-decrement — يُنقص أولًا ثم يقرأ.

---

### السؤال 11 (متوسط)
Which statement about String in Java is TRUE?
أ) String objects are mutable  ب) `==` compares String content  ج) String is stored in heap only  د) String objects are immutable
**الإجابة الصحيحة: د** — **التعليل:** `String` غير قابل للتعديل — أي "تعديل" ينشئ كائنًا جديدًا.

---

### السؤال 12 (صعب)
After: `ArrayList<Double> list2 = (ArrayList<Double>)list1.clone(); list2.add(4.5);` what happens to `list1`?
أ) list1 gets 4.5 added too  ب) list1 is unchanged  ج) list1 is cleared  د) Runtime exception
**الإجابة الصحيحة: ب** — **التعليل:** `clone()` ينسخ القائمة — الإضافة لـ`list2` لا تؤثر على `list1`.

---

### السؤال 13 (صعب)
Which interface has NO methods (marker interface)?
أ) `Comparable`  ب) `Edible`  ج) `Cloneable`  د) `Runnable`
**الإجابة الصحيحة: ج** — **التعليل:** `Cloneable` واجهة علامة (`marker interface`) — لا تحتوي دوالاً.

---

### السؤال 14 (متوسط)
A class can implement:
أ) Only one interface  ب) Multiple interfaces  ج) No interfaces  د) Only abstract interfaces
**الإجابة الصحيحة: ب** — **التعليل:** Java تتيح تنفيذ واجهات متعددة: `class Chicken extends Animal implements Edible`.

---

### السؤال 15 (صعب)
What is the output of this code?
```java
Circle c1 = new Circle();
Circle c2 = new Circle(5);
System.out.println(Circle.getNumberOfObjects());
```
أ) `0`  ب) `1`  ج) `2`  د) خطأ
**الإجابة الصحيحة: ج** — **التعليل:** `static numberOfObjects` يزداد في كل بانٍ — أُنشئ كائنان.

---

### السؤال 16 (متوسط)
In UML class diagram, what does the `#` symbol before a member indicate?
أ) `public`  ب) `private`  ج) `static`  د) `protected`
**الإجابة الصحيحة: د** — **التعليل:** في UML: `+`=public، `-`=private، `#`=protected.

---

### السؤال 17 (صعب)
What is the output of the StackOfIntegers test: push 0-9, then pop all?
أ) `0 1 2 3 4 5 6 7 8 9`  ب) `9 8 7 6 5 4 3 2 1 0`  ج) `5 4 3 2 1 0 9 8 7 6`  د) خطأ
**الإجابة الصحيحة: ب** — **التعليل:** `Stack` هو LIFO — آخر داخل أول خارج.

---

### السؤال 18 (متوسط)
Which statement correctly calls a superclass constructor from a subclass?
أ) `parent();`  ب) `super();`  ج) `this();`  د) `extends();`
**الإجابة الصحيحة: ب** — **التعليل:** `super(args)` يستدعي بانٍ الصنف الأب.

---

### السؤال 19 (صعب)
Given `Object obj = new Circle(5);`, which call compiles without casting?
أ) `obj.getArea()`  ب) `obj.getRadius()`  ج) `obj.toString()`  د) `obj.getDiameter()`
**الإجابة الصحيحة: ج** — **التعليل:** `toString()` موجودة في `Object` — لا حاجة للصب. الدوال الأخرى خاصة بـ`Circle`.

---

### السؤال 20 (صعب)
What is the result of `getBMI()` for weight=70, height=1.70?
أ) `23.88`  ب) `24.22`  ج) `41.18`  د) `12.11`
**الإجابة الصحيحة: ب** — **التعليل:** `70 / (1.70 × 1.70) = 70 / 2.89 ≈ 24.22` بعد التقريب.

---

### السؤال 21 (متوسط)
What does `java.util.Collections.sort(list)` require of the list's element type?
أ) The elements must be String  ب) Elements must implement Comparable  ج) Elements must be numbers  د) No requirement
**الإجابة الصحيحة: ب** — **التعليل:** `Collections.sort()` تستخدم `compareTo()` — العناصر يجب أن تنفّذ `Comparable`.

---

### السؤال 22 (صعب)
Which of the following correctly overrides `toString()` using `super`?
أ) `return toString() + "extra";`  ب) `return super.toString() + "extra";`  ج) `return this.toString() + "extra";`  د) `return parent.toString() + "extra";`
**الإجابة الصحيحة: ب** — **التعليل:** `super.toString()` يستدعي نسخة الصنف الأب.

---

### السؤال 23 (صعب)
In `ArrayList<Integer> list`, after: `list.add(2, "Xian"); list.remove("Miami"); list.remove(1);`
What is at index 0 if list was `[London, Denver, Paris, Miami, Seoul, Tokyo]`?
أ) `Denver`  ب) `London`  ج) `Xian`  د) `Paris`
**الإجابة الصحيحة: ب** — **التعليل:** أُضيف `Xian` في الموضع 2، حُذف `Miami` بالقيمة، ثم `remove(1)` يحذف `Denver`. تبقى `London` في الموضع 0.

---

### السؤال 24 (متوسط)
What is the relationship between BigInteger and the abstract Number class?
أ) BigInteger extends Number  ب) BigInteger implements Number  ج) BigInteger is unrelated  د) Number extends BigInteger
**الإجابة الصحيحة: أ** — **التعليل:** `BigInteger extends Number` — `Number` صنف مجرد.

---

### السؤال 25 (صعب)
A method inside a static method tries to access `radius` (an instance variable). What happens?
أ) Works fine  ب) Returns 0  ج) Compile error  د) NullPointerException
**الإجابة الصحيحة: ج** — **التعليل:** الدوال الساكنة لا يمكنها الوصول لمتغيرات النسخة — خطأ في الترجمة.

---

## الجزء الرابع: أسئلة تصحيح الكود

### السؤال D1 (logic)

**الكود الخاطئ:**
```java
public class BankAccount {
    private double balance;
    public BankAccount() { balance = 0; }
    public void deposit(double amount) { balance = amount; } // ERROR
    public double getBalance() { return balance; }
}
BankAccount ba = new BankAccount();
ba.deposit(2000);
ba.deposit(500);
System.out.println(ba.getBalance()); // prints 500 instead of 2500
```

**اكتشف الخطأ:** الدالة `deposit` تضبط الرصيد بدلًا من إضافة المبلغ.

**التصحيح:**
```java
public void deposit(double amount) {
    balance = balance + amount; // add to existing balance, not replace
}
```

**شرح الحل:**
1. الخطأ: `balance = amount` يستبدل الرصيد كله بكل إيداع.
2. الصحيح: `balance += amount` يُراكم الإيداعات.
3. الناتج الصحيح: `2000 + 500 = 2500.0`.

---

### السؤال D2 (misconception)

**الكود الخاطئ:**
```java
public class Counter {
    private int count = 0;
    public static void increment() {
        count++; // ERROR: accessing instance variable from static method
    }
}
```

**اكتشف الخطأ:** دالة `static` تحاول الوصول لمتغير نسخة (`count`).

**التصحيح:**
```java
private static int count = 0; // make count static
public static void increment() {
    count++; // now accessible in static context
}
```

---

### السؤال D3 (logic — super call missing)

**الكود الخاطئ:**
```java
class Circle extends GeometricObject {
    private double radius;
    public Circle(double radius, String color, boolean filled) {
        this.radius = radius;
        this.color = color;   // ERROR: color is private in GeometricObject
        this.filled = filled; // ERROR: filled is private in GeometricObject
    }
}
```

**اكتشف الخطأ:** محاولة الوصول لحقول `private` في الصنف الأب مباشرة.

**التصحيح:**
```java
public Circle(double radius, String color, boolean filled) {
    super(color, filled); // delegate to GeometricObject constructor
    this.radius = radius;
}
```

---

### السؤال D4 (off_by_one)

**الكود الخاطئ:**
```java
public int pop() {
    return elements[size]; // ERROR: should be size-1 (0-indexed)
}
```

**اكتشف الخطأ:** `size` يشير للموضع التالي الفارغ، آخر عنصر في `size-1`.

**التصحيح:**
```java
public int pop() {
    return elements[--size]; // pre-decrement: size-1 first, then access
}
```

---

### السؤال D5 (wrong_formula)

**الكود الخاطئ:**
```java
public double getBMI() {
    return weight / height; // ERROR: should divide by height squared
}
```

**اكتشف الخطأ:** صيغة BMI هي `weight / (height * height)` وليس `weight / height`.

**التصحيح:**
```java
public double getBMI() {
    double bmi = weight / (height * height); // correct BMI formula
    return Math.round(bmi * 100) / 100.0;   // round to 2 decimal places
}
```

---

### السؤال D6 (logic — instanceof missing)

**الكود الخاطئ:**
```java
public static void display(Object obj) {
    Circle c = (Circle)obj; // ERROR: may throw ClassCastException if obj is Rectangle
    System.out.println(c.getArea());
}
```

**اكتشف الخطأ:** الصب بدون فحص `instanceof` — ينكسر إذا كان `obj` ليس `Circle`.

**التصحيح:**
```java
public static void display(Object obj) {
    if (obj instanceof Circle) {
        Circle c = (Circle)obj; // safe cast after check
        System.out.println(c.getArea());
    }
}
```

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1: fill_gaps — إكمال صنف `Rectangle`

**المعطيات:** اكمل الكود التالي:

```java
public class Rectangle {
    private double _______;  // (1)
    private double _______;  // (2)

    public Rectangle(double width, double height) {
        _______ = width;     // (3)
        _______ = height;    // (4)
    }

    public double getArea() {
        return _______ * _______; // (5)
    }
}
```

**نموذج الحل:**
1. `width`
2. `height`
3. `this.width`
4. `this.height`
5. `width * height`

---

### تمرين 2: code_fix — تصحيح مقارنة String

**الكود الخاطئ:**
```java
String s1 = "Hello";
String s2 = new String("Hello");
if (s1 == s2) System.out.println("Equal");
else System.out.println("Not Equal");
```

**المطلوب:** صحّح الكود ليطبع "Equal".

**نموذج الحل:**
```java
if (s1.equals(s2)) System.out.println("Equal"); // compare content, not references
```

---

### تمرين 3: scenario — تصميم صنف `Student`

**المطلوب:** صمّم صنفًا `Student` بـ:
- حقول: `name (String)`, `gpa (double)`, `studentCount (int static)`
- بانٍ: يزيد `studentCount`
- دوال: getter/setter لـ`name` و`gpa`، و`getStudentCount()` static
- نفّذ `Comparable<Student>` بحيث يُرتّب حسب `gpa` تنازليًا.

**نموذج الحل:**
```java
public class Student implements Comparable<Student> {
    private String name;
    private double gpa;
    private static int studentCount = 0;

    public Student(String name, double gpa) {
        this.name = name; this.gpa = gpa;
        studentCount++;
    }

    public String getName()   { return name; }
    public double getGpa()    { return gpa; }
    public void setGpa(double g) { this.gpa = g; }
    public static int getStudentCount() { return studentCount; }

    @Override
    public int compareTo(Student other) {
        // descending by gpa: if this.gpa > other.gpa → negative (this comes first)
        if (this.gpa > other.gpa) return -1;
        else if (this.gpa < other.gpa) return 1;
        return 0;
    }
}
```

---

### تمرين 4: fill_gaps — إكمال MyStack

```java
public class MyStack {
    private ArrayList<Object> list = new ArrayList<>();

    public Object peek() {
        return list.get(_______ - 1); // (1)
    }

    public Object pop() {
        Object o = list.get(_______ - 1); // (2)
        list.remove(_______ - 1);          // (3)
        return o;
    }
}
```

**نموذج الحل:** كل `_______` = `getSize()` أو `list.size()`.

---

### تمرين 5: numerical_solve — حساب القسط

**المعطيات:** قرض 500,000، فائدة سنوية 6%، لمدة 15 سنة.
**المطلوب:** احسب القسط الشهري يدويًا.

**نموذج الحل:**
- `monthlyRate = 6 / 1200 = 0.005`
- `n = 15 × 12 = 180 شهر`
- `payment = 500000 × 0.005 / (1 - (1/1.005)^180) ≈ 4219.28`

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: case_study — نظام مكتبة

**السيناريو:** تريد بناء نظام لإدارة كتب المكتبة. كل كتاب له `ISBN`, `title`, `author`, `available (boolean)`. المكتبة لها قائمة كتب وتتيح `borrow()` و`return()`.

**المطلوب:**
1. ارسم مخطط UML لصنفَي `Book` و`Library`.
2. حدّد محددات الرؤية المناسبة.
3. هل تستخدم `ArrayList` أم مصفوفة عادية؟ ولماذا؟

**نموذج الحل:**
1. `Book`: `-isbn: String`, `-title: String`, `-author: String`, `-available: boolean` + getters/setters
2. `Library`: `-books: ArrayList<Book>` + `+addBook(Book)`, `+borrowBook(String isbn)`, `+returnBook(String isbn)`
3. `ArrayList` أفضل لأن عدد الكتب يتغير ديناميكيًا.

---

### تمرين 2: table_fill — تحديد نوع الوصول

**المطلوب:** أكمل الجدول:

| الوصول | `public` | `protected` | بدون | `private` |
|--------|---------|------------|------|---------|
| نفس الصنف | ✅ | ؟ | ؟ | ؟ |
| نفس الحزمة | ✅ | ؟ | ؟ | ؟ |
| صنف فرعي (حزمة مختلفة) | ✅ | ؟ | ؟ | ؟ |
| حزمة مختلفة | ✅ | ؟ | ؟ | ؟ |

**نموذج الحل:**

| الوصول | `public` | `protected` | بدون | `private` |
|--------|---------|------------|------|---------|
| نفس الصنف | ✅ | ✅ | ✅ | ✅ |
| نفس الحزمة | ✅ | ✅ | ✅ | ❌ |
| صنف فرعي (حزمة مختلفة) | ✅ | ✅ | ❌ | ❌ |
| حزمة مختلفة | ✅ | ❌ | ❌ | ❌ |

---

### تمرين 3: written_analysis — Abstract vs Interface

**السؤال:** متى تختار `abstract class` على `interface`؟ أعطِ سيناريو لكل منهما.

**نموذج الحل:**
- **Abstract Class:** اختاره عندما تريد حالة مشتركة. مثال: `GeometricObject` يحتوي `color` و`dateCreated` يرثهما `Circle` و`Rectangle`.
- **Interface:** اختاره عندما تريد تعريف عقد لأصناف غير مترابطة. مثال: `Edible` يُنفَّذ من `Chicken` (حيوان) و`Apple` (فاكهة) — لا علاقة وراثة بينهما.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تنفيذ StackOfIntegers

**المدخل:**
```java
StackOfIntegers stack = new StackOfIntegers(4);
stack.push(10); stack.push(20); stack.push(30);
int x = stack.pop();
stack.push(40);
System.out.println(stack.peek());
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | `size` | محتوى المكدس (top→bottom) |
|--------|---------|--------|--------------------------|
| 1 | `push(10)` | 1 | ؟ |
| 2 | `push(20)` | 2 | ؟ |
| 3 | `push(30)` | 3 | ؟ |
| 4 | `pop()` | ؟ | ؟ |
| 5 | `push(40)` | ؟ | ؟ |
| 6 | `peek()` | 3 | ؟ |

**نموذج الحل:**

| الخطوة | العملية | `size` | محتوى المكدس |
|--------|---------|--------|-------------|
| 1 | `push(10)` | 1 | `[10]` |
| 2 | `push(20)` | 2 | `[10, 20]` |
| 3 | `push(30)` | 3 | `[10, 20, 30]` |
| 4 | `pop()` → 30 | 2 | `[10, 20]` |
| 5 | `push(40)` | 3 | `[10, 20, 40]` |
| 6 | `peek()` → 40 | 3 | `[10, 20, 40]` |

**النتيجة:** `peek()` تُرجع `40`.

---

### تمرين تتبع 2: ArrayList operations

**المدخل:**
```java
ArrayList<String> list = new ArrayList<>();
list.add("A"); list.add("B"); list.add("C");
list.add(1, "X");
list.remove("B");
list.remove(0);
```

**أكمل الجدول:**

| الخطوة | العملية | القائمة بعد العملية |
|--------|---------|---------------------|
| 1 | `add("A")` | ؟ |
| 2 | `add("B")` | ؟ |
| 3 | `add("C")` | ؟ |
| 4 | `add(1, "X")` | ؟ |
| 5 | `remove("B")` | ؟ |
| 6 | `remove(0)` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | القائمة |
|--------|---------|---------|
| 1 | `add("A")` | `[A]` |
| 2 | `add("B")` | `[A, B]` |
| 3 | `add("C")` | `[A, B, C]` |
| 4 | `add(1, "X")` | `[A, X, B, C]` |
| 5 | `remove("B")` | `[A, X, C]` |
| 6 | `remove(0)` | `[X, C]` |

**النتيجة:** `[X, C]`

---

### تمرين تتبع 3: BMI Status

**المدخل:**
```java
BMI bmi = new BMI("Ali", 22, 80, 1.75);
System.out.println(bmi.getStatus());
```

**أكمل الجدول:**

| الخطوة | الحساب | القيمة |
|--------|--------|--------|
| height² | `1.75 × 1.75` | ؟ |
| BMI | `80 / height²` | ؟ |
| التقريب | `Math.round(bmi×100)/100.0` | ؟ |
| الحالة | `if (bmi < 24)` | ؟ |

**نموذج الحل:**

| الخطوة | الحساب | القيمة |
|--------|--------|--------|
| height² | `1.75 × 1.75` | `3.0625` |
| BMI | `80 / 3.0625` | `26.12...` |
| التقريب | | `26.12` |
| الحالة | `26.12 >= 24, < 29` | `"over weight"` |

**النتيجة:** `"over weight"`

---

### تمرين تتبع 4: Loan monthly payment

**المدخل:** `Rate=12%, Years=1, Amount=1200`

**أكمل الجدول:**

| الحساب | الصيغة | القيمة |
|--------|--------|--------|
| `monthlyRate` | `12 / 1200` | ؟ |
| `n` (أشهر) | `1 × 12` | ؟ |
| `(1+r)^n` | `(1.01)^12` | `≈ 1.1268` |
| `monthlyPayment` | الصيغة الكاملة | ؟ |

**نموذج الحل:**
- `monthlyRate = 0.01`
- `n = 12`
- Payment = `1200 × 0.01 / (1 - (1/1.01)^12) ≈ 1200 × 0.01 / (1 - 0.8874) ≈ 106.62`

---

### تمرين تتبع 5: Polymorphism instanceof

**المدخل:**
```java
Object[] objects = {new Tiger(), new Chicken(), new Apple()};
for (Object o : objects) {
    if (o instanceof Edible)
        System.out.println(((Edible)o).howToEat());
    if (o instanceof Animal)
        System.out.println(((Animal)o).sound());
}
```

**أكمل الجدول:**

| الكائن | `instanceof Edible` | `instanceof Animal` | المطبوع |
|--------|---------------------|---------------------|---------|
| `Tiger` | ؟ | ؟ | ؟ |
| `Chicken` | ؟ | ؟ | ؟ |
| `Apple` | ؟ | ؟ | ؟ |

**نموذج الحل:**

| الكائن | `instanceof Edible` | `instanceof Animal` | المطبوع |
|--------|---------------------|---------------------|---------|
| `Tiger` | ❌ | ✅ | `OOAARR` |
| `Chicken` | ✅ | ✅ | `chickinena` ثم `koko koko` |
| `Apple` | ✅ | ❌ | `Make apple cake` |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the difference between a class and an object?
A: الصنف (`class`) هو القالب أو التصميم، والكائن (`object`) هو النسخة المُنشأة منه باستخدام `new`.

**Q2:** What is encapsulation and why do we use it?
A: إخفاء البيانات خلف `private` مع توفير `getter/setter` — يحمي البيانات من التعديل العشوائي ويضمن صحتها.

**Q3:** What is the difference between `static` and `instance` variables?
A: المتغير `static` مشترك بين كل الكائنات (مخزَّن مرة واحدة)، بينما المتغير `instance` خاص بكل كائن.

**Q4:** What are the two uses of the `this` keyword?
A: (1) الإشارة لحقل الكائن عند تعارض الأسماء: `this.radius = radius`. (2) استدعاء بانٍ آخر: `this(args)`.

**Q5:** What are the two uses of the `super` keyword?
A: (1) استدعاء بانٍ الصنف الأب: `super(args)`. (2) استدعاء دالة الصنف الأب: `super.method()`.

**Q6:** What is the difference between passing a primitive and an object to a method?
A: البدائيات تُمرَّر بالقيمة (نسخة) — التعديل لا يؤثر على الأصل. الكائنات تُمرَّر بالمرجع — التعديل يؤثر على الأصل.

**Q7:** What does `@Override` annotation do?
A: يُعلم المترجم بأن الدالة تُعيد تعريف دالة من الصنف الأب — يُعطي خطأ ترجمة إذا لم تتطابق التواقيع.

**Q8:** What is polymorphism in Java?
A: القدرة على معاملة كائنات من أنواع مختلفة بطريقة موحّدة عبر مرجع الصنف الأب أو الواجهة.

**Q9:** What is the difference between `instanceof` and casting?
A: `instanceof` يفحص نوع الكائن (يُرجع `boolean`). الصب (`casting`) يحوّل المرجع لنوع محدد — خطر بدون `instanceof`.

**Q10:** What is an abstract class? Can you instantiate it?
A: صنف يحتوي دوالاً `abstract` (بلا جسم). لا يمكن إنشاء كائن مباشر منه بـ`new`، لكن يمكن إنشاء مرجع.

**Q11:** What is the difference between `abstract class` and `interface`?
A: `abstract class`: يمكنه حالة ودوال عادية، وراثة فردية. `interface`: كل المتغيرات `public static final`، كل الدوال `public abstract`، يمكن تنفيذ متعددة.

**Q12:** What does `Comparable` interface provide?
A: دالة `compareTo(T o)` لمقارنة الكائنات — تُستخدم في `Arrays.sort()` و`Collections.sort()`.

**Q13:** What is `Cloneable` and what does `clone()` do?
A: `Cloneable` واجهة علامة. `clone()` تنسخ الكائن — النسخة مستقلة عن الأصل.

**Q14:** What is autoboxing in Java?
A: التحويل التلقائي من نوع بدائي (`int`) إلى كائن تغليف (`Integer`) عند الحاجة.

**Q15:** Why is `String` considered immutable?
A: لأن تعديل `String` ينشئ كائنًا جديدًا دائمًا، ولا يُغيَّر الكائن الأصلي أبدًا.

**Q16:** What is the difference between `StringBuilder` and `String` for repeated concatenation?
A: `StringBuilder` قابل للتعديل في نفس الكائن (أسرع)، `String` ينشئ كائنًا جديدًا في كل عملية (أبطأ).

**Q17:** What does `java.util.Collections.sort(list)` require?
A: العناصر يجب أن تنفّذ `Comparable` لأن `sort()` تستخدم `compareTo()` داخليًا.

**Q18:** What is the difference between `ArrayList.remove(int index)` and `ArrayList.remove(Object o)`?
A: الأولى تحذف بالموضع، الثانية تحذف أول تكرار للعنصر المُمرَّر.

**Q19:** What happens if a subclass does not implement all abstract methods?
A: يجب أن يُعرَّف الصنف الابن نفسه كـ`abstract`، وإلا يحدث خطأ في الترجمة.

**Q20:** Why can't a static method access instance variables?
A: الدالة `static` تنتمي للصنف لا لكائن بعينه — لا يوجد "كائن حالي" عند استدعائها.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

### الكود الكامل: CircleP + TestPassObject + TotalArea

```java
// ===== CircleP.java =====
class CircleP {
    private double radius = 1;
    private static int nObjects = 0;

    public CircleP() { nObjects++; }
    public CircleP(double newRadius) { radius = newRadius; nObjects++; }

    public double getRadius() { return radius; }
    public void setRadius(double newRadius) { radius = (newRadius >= 0) ? newRadius : 0; }
    public static int getNumberOfObjects() { return nObjects; }
    public double getArea() { return radius * radius * Math.PI; }
}

// ===== TestPassObject.java =====
public class TestPassObject {
    public static void main(String[] args) {
        CircleP myCircle = new CircleP(1);
        int n = 5;
        printAreas(myCircle, n);
        System.out.println("\nRadius is " + myCircle.getRadius());
        System.out.println("n is " + n);
        System.out.println("Number of objects " + CircleP.getNumberOfObjects());
    }

    public static void printAreas(CircleP c, int times) {
        System.out.println("Radius \t\tArea");
        while (times >= 1) {
            System.out.println(c.getRadius() + "\t\t" + c.getArea());
            c.setRadius(c.getRadius() + 1);
            times--;
        }
    }
}

// ===== TotalArea.java =====
public class TotalArea {
    public static void main(String[] args) {
        CircleP[] circleArray = createCircleArray();
        printCircleArray(circleArray);
    }

    public static CircleP[] createCircleArray() {
        CircleP[] arr = new CircleP[5];
        for (int i = 0; i < arr.length; i++)
            arr[i] = new CircleP(Math.random() * 100);
        return arr;
    }

    public static void printCircleArray(CircleP[] arr) {
        System.out.printf("%-30s%-15s\n", "Radius", "Area");
        for (CircleP c : arr)
            System.out.printf("%-30f%-15f\n", c.getRadius(), c.getArea());
        System.out.println("----------------------------------------------");
        System.out.printf("%-30s%-15f\n", "The total area ", sum(arr));
    }

    public static double sum(CircleP[] arr) {
        double total = 0;
        for (CircleP c : arr) total += c.getArea();
        return total;
    }
}
```

### الكود الكامل: GeometricObject + Circle + Rectangle + TestCircleRectangle

```java
// ===== GeometricObject.java =====
public class GeometricObject {
    private String color = "white";
    private boolean filled;
    private java.util.Date dateCreated;

    public GeometricObject() { dateCreated = new java.util.Date(); }
    public GeometricObject(String color, boolean filled) {
        dateCreated = new java.util.Date();
        this.color = color; this.filled = filled;
    }
    public String getColor() { return color; }
    public void setColor(String c) { color = c; }
    public boolean isFilled() { return filled; }
    public void setFilled(boolean f) { filled = f; }
    public java.util.Date getDateCreated() { return dateCreated; }
    public String toString() {
        return dateCreated + "\ncolor: " + color + " and filled: " + filled;
    }
}

// ===== Circle.java =====
public class Circle extends GeometricObject {
    private double radius;
    public Circle() { }
    public Circle(double radius) { this.radius = radius; }
    public Circle(double radius, String color, boolean filled) {
        super(color, filled); this.radius = radius;
    }
    public double getRadius() { return radius; }
    public void setRadius(double r) { this.radius = r; }
    public double getArea() { return radius * radius * Math.PI; }
    public double getDiameter() { return 2 * radius; }
    public double getPerimeter() { return 2 * radius * Math.PI; }
    public void printCircle() {
        System.out.println(getDateCreated() + " radius=" + radius);
    }
}

// ===== Rectangle.java =====
public class Rectangle extends GeometricObject {
    private double width, height;
    public Rectangle() { }
    public Rectangle(double w, double h) { width = w; height = h; }
    public Rectangle(double w, double h, String c, boolean f) {
        super(c, f); width = w; height = h;
    }
    public double getWidth()  { return width; }
    public double getHeight() { return height; }
    public void setWidth(double w)  { width = w; }
    public void setHeight(double h) { height = h; }
    public double getArea()      { return width * height; }
    public double getPerimeter() { return 2 * (width + height); }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: What is Object-Oriented Programming and what are its four pillars?
**نموذج الإجابة:**
1. **التعريف:** نمط برمجي يُنظّم الكود في كائنات تجمع البيانات والسلوك.
2. **المكونات:**
   - `Encapsulation`: إخفاء البيانات خلف `private`
   - `Inheritance`: وراثة صنف من آخر
   - `Polymorphism`: معاملة أنواع مختلفة بطريقة موحّدة
   - `Abstraction`: إخفاء التفاصيل وعرض الجوهر
3. **مثال:** `Circle extends GeometricObject implements Comparable`
4. **متى نستخدم:** في أي تطبيق كبير يحتاج تنظيم وإعادة استخدام.

---

### سؤال 2: Explain the difference between constructors and regular methods.
**نموذج الإجابة:**
1. **التعريف:** البانٍ دالة خاصة لتهيئة الكائن عند إنشائه.
2. **الفروق:**
   - اسمه مطابق لاسم الصنف
   - لا يوجد نوع إرجاع (حتى `void`)
   - يُستدعى تلقائيًا بـ`new`
3. **مثال:** `public Circle() { }` مقابل `public double getArea() { }`
4. **متى نستخدم:** البانٍ لتهيئة الحالة الأولية فقط.

---

### سؤال 3: What is the difference between method overriding and method overloading?
**نموذج الإجابة:**
1. **التعريف:**
   - `Overloading`: نفس الاسم، معاملات مختلفة، في نفس الصنف
   - `Overriding`: نفس التوقيع في الصنف الابن يُعيد تعريف سلوك الأب
2. **المكونات:** `@Override` للتأكد من الـ`override`
3. **مثال:** `Circle(double r)` و`Circle()` = overloading. `toString()` في `Circle` = overriding
4. **متى نستخدم:** Overriding لتخصيص السلوك، Overloading لتعدد طرق الاستدعاء.

---

### سؤال 4: Explain static variables and methods with an example.
**نموذج الإجابة:**
1. **التعريف:** عضو `static` ينتمي للصنف لا للكائن.
2. **المكونات:** يُشارَك بين كل الكائنات، يُستدعى بـ`ClassName.method()`.
3. **مثال:** `Circle.getNumberOfObjects()` يُرجع عدد الكائنات المُنشأة.
4. **قيد:** لا يمكن الوصول لـ`instance fields` من `static method`.

---

### سؤال 5: What is the Comparable interface and how is it used for sorting?
**نموذج الإجابة:**
1. **التعريف:** واجهة `java.lang` تحتوي دالة `compareTo(T o)`.
2. **المكونات:** ترجع: سالب (أصغر)، صفر (مساوٍ)، موجب (أكبر).
3. **مثال:** `ComparableRectangle implements Comparable<ComparableRectangle>` → ترتيب حسب المساحة.
4. **متى نستخدم:** عند الحاجة لـ`Arrays.sort()` أو `Collections.sort()` على كائنات مخصصة.

---

### سؤال 6: Describe encapsulation and why it is important.
**نموذج الإجابة:**
1. **التعريف:** إخفاء بيانات الكائن خلف `private` مع توفير `getter/setter`.
2. **المزايا:** حماية البيانات من التعديل الخاطئ، إمكانية التحقق من صحة القيم.
3. **مثال:** `setRadius(x)` يمكن أن تتحقق `if (x >= 0)` قبل القبول.
4. **متى نستخدم:** دائمًا — كل حقول البيانات يجب أن تكون `private`.

---

### سؤال 7: What are the rules of abstract classes in Java?
**نموذج الإجابة:**
1. **التعريف:** صنف يحتوي دالة أو أكثر `abstract` (بدون جسم).
2. **القواعد:**
   - لا يمكن إنشاؤه بـ`new`
   - الصنف الابن يجب تنفيذ كل `abstract methods`
   - يمكن احتواء دوال عادية أيضًا
3. **مثال:** `GeometricObject` مجرد، `Circle` و`Rectangle` ابناه الملموسان.
4. **متى نستخدم:** عندما توجد دوال مشتركة ودوال يجب تخصيصها في كل ابن.

---

### سؤال 8: Explain the difference between String and StringBuilder.
**نموذج الإجابة:**
1. **String:** غير قابل للتعديل — كل عملية تنشئ كائنًا جديدًا.
2. **StringBuilder:** قابل للتعديل — أسرع في الحلقات والإلحاق المتكرر.
3. **مثال:** بناء palindrome — `sb.reverse()` أسرع من إنشاء `String` جديد.
4. **متى تستخدم StringBuilder:** في الحلقات التي تُلحق نصوصًا كثيرة.

---

### سؤال 9: What is polymorphism and how does instanceof help?
**نموذج الإجابة:**
1. **التعريف:** معاملة أنواع مختلفة عبر مرجع موحّد.
2. **المكونات:** الصنف الأب يحدد العقد، الأبناء ينفّذونه.
3. **مثال:** `displayObject(GeometricObject o)` تعمل مع `Circle` و`Rectangle`.
4. **`instanceof`:** يُستخدم قبل الصب لتفادي `ClassCastException`.

---

### سؤال 10: What is the role of the `this` keyword in constructor chaining?
**نموذج الإجابة:**
1. **التعريف:** `this(args)` يستدعي بانيًا آخر من نفس الصنف.
2. **القيد:** يجب أن يكون السطر الأول في البانٍ.
3. **مثال:** `Loan()` يستدعي `this(2.5, 1, 1000)` لتجنب تكرار الكود.
4. **الفائدة:** يُقلّل التكرار (`DRY principle`).

---

### سؤال 11: Explain the ArrayList class and compare it with arrays.
**نموذج الإجابة:**
1. **التعريف:** `ArrayList<E>` قائمة ديناميكية تُغيّر حجمها تلقائيًا.
2. **المقارنة:**
   - المصفوفة: حجم ثابت، عناصر بدائية أو كائنات
   - `ArrayList`: حجم ديناميكي، كائنات فقط، دوال جاهزة
3. **مثال:** `list.add("X")` يوسّع القائمة تلقائيًا.
4. **متى تستخدم:** عندما لا تعرف الحجم مسبقًا أو تحتاج `add/remove` متكرر.

---

### سؤال 12: Describe the Cloneable interface and shallow vs deep copy.
**نموذج الإجابة:**
1. **التعريف:** `Cloneable` تُعلن أن الكائن يمكن نسخه بـ`clone()`.
2. **Shallow Copy:** ينسخ المرجع — الكائنات المتداخلة مشتركة.
3. **مثال:** `Calendar calendar2 = (Calendar)calendar.clone()` → تعديل `calendar2` لا يؤثر على `calendar`.
4. **متى نستخدم:** عند الحاجة لنسخة مستقلة من الكائن.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم الفرق بين `class` و`object` ويمكنني إنشاء كائن بـ`new`
- [ ] أستطيع تطبيق `encapsulation` (`private` + `getter/setter`)
- [ ] أفهم `static` مقابل `instance` وأعرف متى أستخدم كلًّا منهما
- [ ] أفهم استخدامَي `this` (مرجع حقل + استدعاء بانٍ)
- [ ] أفهم استخدامَي `super` (بانٍ الأب + دالة الأب)
- [ ] أفهم تمرير الكائنات بالمرجع مقابل البدائيات بالقيمة
- [ ] أستطيع إنشاء صنف وارث (`extends`) وتعريف بانيه
- [ ] أفهم تعدد الأشكال (`polymorphism`) وأستطيع كتابة دالة تقبل `GeometricObject`
- [ ] أعرف استخدام `instanceof` قبل الصب
- [ ] أفهم الصنف المجرد وقواعده (لا `new`، الأبناء ينفذون `abstract methods`)
- [ ] أفهم `interface` وأستطيع كتابة صنف يُنفّذ واجهة
- [ ] أعرف الفرق بين `abstract class` و`interface`
- [ ] أفهم `Comparable.compareTo()` وأستطيع استخدامه للفرز
- [ ] أفهم `Cloneable.clone()` والفرق بين النسخ بالمرجع والنسخ الفعلي
- [ ] أعرف دوال `ArrayList`: `add`, `remove`, `get`, `size`, `contains`, `indexOf`
- [ ] أعرف `Collections.sort()`, `max()`, `min()`, `shuffle()`
- [ ] أفهم `String` immutability والفرق بين `==` و`.equals()`
- [ ] أعرف `StringBuilder.reverse()`, `append()`, `toString()`
- [ ] أفهم `wrapper classes` وعمليات `autoboxing/unboxing`
- [ ] أستطيع كتابة `StackOfIntegers` (push, pop, peek, empty)

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المفاهيم

| المفهوم | يرتبط مع | كيف؟ |
|---------|----------|------|
| `class` | `object` | `new ClassName()` ينشئ كائنًا |
| `encapsulation` | `private` + `getter/setter` | يحمي البيانات |
| `static` | الصنف لا الكائن | `ClassName.staticMember` |
| `inheritance` | `extends` | الابن يرث الأب |
| `polymorphism` | `extends`/`implements` | مرجع الأب يقبل الأبناء |
| `abstract class` | `extends` + تنفيذ abstract | وراثة فردية |
| `interface` | `implements` | متعددة، `public abstract` |
| `Comparable` | `compareTo()` | للفرز بـ`Arrays.sort()` |
| `ArrayList` | `Collections` | `sort()`, `max()`, `min()` |

---

### 🔑 أهم النقاط الذهبية

| الموضوع | النقطة |
|---------|--------|
| `static` | لا يمكن الوصول لـ`instance field` من `static method` |
| `this(args)` | يجب أن يكون أول سطر في البانٍ |
| `super(args)` | يجب أن يكون أول سطر في البانٍ |
| `instanceof` | استخدمه دائمًا قبل downcast |
| `abstract` | لا `new AbstractClass()` لكن `AbstractClass ref` مسموح |
| `String ==` | يقارن مراجع — استخدم `.equals()` للمحتوى |
| `clone()` | ينسخ الكائن — مستقل عن الأصل |

---

### 🔑 مرجع سريع للكلمات المفتاحية

| الكلمة | المعنى | تُستخدم في |
|--------|--------|-----------|
| `extends` | وراثة صنف | `class Child extends Parent` |
| `implements` | تنفيذ واجهة | `class Foo implements Bar` |
| `abstract` | دالة بلا جسم أو صنف مجرد | `abstract class`, `abstract method` |
| `interface` | عقد | `interface Edible { }` |
| `@Override` | إعادة تعريف دالة | قبل دالة الصنف الابن |
| `final static` | ثابت مشترك | `final static int MAX = 100` |
| `instanceof` | فحص النوع | `if (x instanceof Circle)` |
| `super` | مرجع الصنف الأب | `super(args)`, `super.method()` |
| `this` | مرجع الكائن الحالي | `this.field`, `this(args)` |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
|---|---------|
| 1 | `private` للحقول دائمًا + `getter/setter` للوصول |
| 2 | `static` للمتغيرات المشتركة والدوال التي لا تحتاج كائنًا |
| 3 | `super(args)` أول سطر في بانٍ الابن |
| 4 | `instanceof` قبل كل `downcast` |
| 5 | `.equals()` لمقارنة محتوى `String` |
| 6 | `@Override` مع كل دالة تعيد تعريفها |
| 7 | الصنف المجرد لا ينشئ كائنًا مباشرة |
| 8 | `interface` كل أعضائه `public abstract` و`public static final` |
| 9 | `clone()` ينسخ — التعديل على النسخة لا يؤثر على الأصل |
| 10 | الدالة `static` لا تصل لـ`instance members` |

---

<!-- VALIDATION
schema: 1.0
parts: detailed_explanation, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, theory, self_check, cheat_sheet, full_code
lecture: محاضرة 2 — OOP in Java
mcq_count: 25
debug_count: 6
qa_count: 20
theory_count: 12
trace_count: 5
-->

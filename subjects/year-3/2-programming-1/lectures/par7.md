# المحاضرة 7 — Threads and Networking (المسالك والشبكات)
> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** المسالك `Thread`، التزامن `Synchronization`، الشبكات `Networking` | **المحاضر:** د. محنّد رجب

---

## الجزء الأول: الشرح التفصيلي

---

### 1. الوحدة الأولى: المسالك `Threads`

---

#### 1.1. تعريف المسلك `Thread`

**النص الأصلي يقول:** المسالك (جمع مسلك) تعريفاً هو عبارة عن جزء برمجي قابل للتنفيذ (مقطع تنفيذي) من برنامج أو تطبيق بلغة الجافا، يُنفَّذ أو يمكن تنفيذه بشكل مستقل عن باقي التطبيق.

**الشرح المبسّط:** `Thread` هو وحدة تنفيذ مستقلة داخل البرنامج. تخيّل مطعماً فيه عدة نوادل يخدمون زبائن مختلفين في آنٍ واحد — كل نادل هو `Thread`، والمطعم هو البرنامج.

**💡 التشبيه:**
> تخيّل مصنعاً به عدة آلات تعمل في وقت واحد على نفس المنتج.
> **وجه الشبه:** كل آلة = `Thread`، المصنع = التطبيق `Application`.

في لغة الجافا يمكن للتطبيقات أن تتضمن عدة مسالك وتُنفَّذ معاً بالانتقال من مسلك لآخر من قِبل آلة جافا الافتراضية `JVM`، كما لو أنها تُنفَّذ على عدة معالجات مستقلة، في حال تضمّن الحاسب معالجاً وحيداً فإن `time sharing` (التشارك على موارد الحاسب) هو الآلية المستخدمة، أو يمكن لبعض المسالك أن تنفّذ على عدة معالجات للحاسب إن توفرت.

#### 📊 المخطط: فرق بين (a) و (b)

#### ما هذا المخطط؟
> يوضّح الفرق بين تنفيذ المسالك على عدة معالجات في وقت واحد (a)، ومشاركة معالج واحد بين عدة مسالك (b).

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
|---|---------|-------------|-------|
| 1 | Thread 1 | process | المسلك الأول |
| 2 | Thread 2 | process | المسلك الثاني |
| 3 | Thread 3 | process | المسلك الثالث |
| 4 | CPU(s) | resource | المعالج أو المعالجات |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|----|-----|---------|-----------|-------|
| Thread 1 | CPU | runs on | solid | تنفيذ مباشر |
| Thread 2 | CPU | time-shared | dashed | مشاركة الوقت |

```diagram
type: flowchart
title: Multiple Threads Execution Models
direction: TD
nodes:
  - id: t1a
    label: Thread 1 (a)
    kind: process
    level: 0
  - id: t2a
    label: Thread 2 (a)
    kind: process
    level: 0
  - id: t3a
    label: Thread 3 (a)
    kind: process
    level: 0
  - id: cpus
    label: Multiple CPUs
    kind: resource
    level: 1
  - id: t1b
    label: Thread 1 (b)
    kind: process
    level: 2
  - id: t2b
    label: Thread 2 (b)
    kind: process
    level: 2
  - id: t3b
    label: Thread 3 (b)
    kind: process
    level: 2
  - id: cpu1
    label: Single CPU (time sharing)
    kind: resource
    level: 3
edges:
  - from: t1a
    to: cpus
    label: parallel
    style: solid
  - from: t2a
    to: cpus
    label: parallel
    style: solid
  - from: t3a
    to: cpus
    label: parallel
    style: solid
  - from: t1b
    to: cpu1
    label: time-share
    style: dashed
  - from: t2b
    to: cpu1
    label: time-share
    style: dashed
  - from: t3b
    to: cpu1
    label: time-share
    style: dashed
```

**مثال من الامتحان:**
> **Q:** What is the difference between scenario (a) and scenario (b) in Java thread execution?
> أ) In (a) threads share one CPU; in (b) they run on separate CPUs
> ب) In (a) threads run on multiple CPUs; in (b) they share one CPU via time-sharing
> ج) Both are identical
> د) (b) is faster always
> **الإجابة الصحيحة: ب** — التعليل: (a) تعدد معالجات حقيقي، (b) وهمي بالتناوب السريع.

---

#### 1.2. الطريقة الأولى لبناء وتشغيل المسالك: تطبيق `Runnable`

**النص الأصلي يقول:** الطريقة الأولى هي كتابة صف ينفّذ الواجهة `Runnable`، ثم وضع الكود في الدالة `run()`.

**الشرح المبسّط:** `Runnable` هي واجهة `interface` تحتوي دالة واحدة اسمها `run()`. نكتب الكلاس الخاص بنا ليُنفّذها، ثم نُغلّف الكلاس في كائن `Thread` ونستدعي `start()`.

⚙️ **الخطوات / الخوارزمية: إنشاء `Thread` باستخدام `Runnable`**

#### ما هدف هذه العملية؟
> إنشاء مسلك قابل للتنفيذ منفصل عن المسلك الرئيسي للبرنامج.

```algorithm
1 | كتابة الكلاس | implements Runnable | أنشئ كلاساً ينفّذ الواجهة Runnable
2 | تعريف run() | @Override | ضع الكود الذي تريده في الدالة run()
3 | إنشاء كائن | new MyRunnable() | أنشئ غرضاً من كلاسك
4 | تغليف في Thread | new Thread(r) | مرّر الكائن للمنشئ Thread
5 | تشغيل | t.start() | استدعي start() لا run() مباشرة
```

#### 💻 الكود: الهيكل الأساسي لـ `Runnable`

#### ما هذا الكود؟
> يوضح كيفية تعريف مسلك جديد عبر تطبيق الواجهة `Runnable`.

```java
// Define a class implementing Runnable interface
public class MyRunnable implements Runnable {
    // Override the run() method — this is the task
    public void run() {
        // Task statements go here
        System.out.println("Thread is running!");
    }
}

// In main:
Runnable r = new MyRunnable();    // Create runnable object
Thread t = new Thread(r);          // Wrap it in a Thread
t.start();                          // Start — JVM calls run()
```

#### شرح كل سطر:
1. `implements Runnable` → يلزم الكلاس بتطبيق الدالة `run()` — هذه هي العقدة مع `JVM`
2. `public void run()` → الدالة التي تحتوي المهمة الفعلية للمسلك
3. `new MyRunnable()` → إنشاء كائن المهمة (لا مسلك بعد)
4. `new Thread(r)` → تغليف المهمة داخل كائن `Thread` حقيقي
5. `t.start()` → يُخبر `JVM` بتشغيل `run()` في مسلك منفصل — **لا تستدعِ `run()` مباشرة!**

**المكتبات المطلوبة (Imports):**
> لا توجد imports خاصة — `Thread` و `Runnable` في حزمة `java.lang` الافتراضية.

**الناتج المتوقع:**
> `Thread is running!` — تُطبع من مسلك مختلف عن `main`.

#### مهم للامتحان ⚠️:
> استدعاء `run()` مباشرة **لا** يُنشئ مسلكاً جديداً — ينفّذه في نفس مسلك `main`. دائماً استخدم `start()`.

---

#### 1.3. مثال عملي: `TaskThreadDemo` — ثلاثة مسالك

**النص الأصلي يقول:** المثال يطبع الحرف `a` مئة مرة، والحرف `b` مئة مرة، والأعداد من 1 إلى 50 عبر ثلاثة مسالك.

**الشرح المبسّط:** ثلاث مهام تعمل بالتزامن — الناتج يختلط لأن `JVM` تتنقل بينها بحرية.

#### 💻 الكود: `TaskThreadDemo` — مثال ثلاثة مسالك

#### ما هذا الكود؟
> يُظهر الفرق بين التنفيذ المتسلسل (استدعاء `run()` مباشرة) والتنفيذ المتوازي (عبر `start()`).

```java
public class TaskThreadDemo {
    public static void main(String[] args) {
        // Create three runnable tasks
        Runnable printA = new PrintChar('a', 100);   // print 'a' 100 times
        Runnable printB = new PrintChar('b', 100);   // print 'b' 100 times
        Runnable print50 = new PrintNum(50);          // print numbers 1-50

        // Sequential execution — NOT concurrent
        printA.run(); printB.run(); print50.run();

        // Create Thread objects
        Thread thread1 = new Thread(printA);
        Thread thread2 = new Thread(printB);
        Thread thread3 = new Thread(print50);

        // Start all threads — concurrent execution
        thread1.start();
        thread2.start();
        thread3.start();
    }
}

// Task to print a character N times
class PrintChar implements Runnable {
    private char charToPrint;  // the character to print
    private int times;         // how many times

    public PrintChar(char c, int t) {
        charToPrint = c;
        times = t;
    }

    @Override
    public void run() {
        // Print character repeatedly
        for (int i = 0; i < times; i++) {
            System.out.print(charToPrint);
        }
    }
}

// Task to print numbers 1 to N
class PrintNum implements Runnable {
    private int lastNum;  // upper limit

    public PrintNum(int n) {
        lastNum = n;
    }

    @Override
    public void run() {
        // Print numbers sequentially
        for (int i = 1; i <= lastNum; i++) {
            System.out.print(" " + i);
        }
    }
}
```

#### شرح كل سطر:
1. `new PrintChar('a', 100)` → إنشاء كائن مهمة طباعة الحرف، لم يُشغَّل بعد
2. `printA.run()` → تنفيذ **متسلسل** في مسلك `main` — لا تزامن
3. `new Thread(printA)` → إنشاء مسلك حقيقي يحمل المهمة
4. `thread1.start()` → طلب من `JVM` تشغيل المسلك — `JVM` تقرر متى

**الناتج المتوقع:**
> `aaaa...bbbb... 1 2 3...` بترتيب عشوائي مختلط في كل تشغيل.

**مثال من الامتحان:**
> **Q:** If `thread1.run()` is called instead of `thread1.start()`, what happens?
> أ) A new thread is created and runs concurrently
> ب) `run()` executes in the main thread, no new thread is created
> ج) A `RuntimeException` is thrown
> د) The program deadlocks
> **الإجابة الصحيحة: ب** — التعليل: `run()` مجرد استدعاء دالة عادي، `start()` هو ما يُنشئ المسلك.

---

#### 1.4. الصف `Thread` — البنية والدوال

**النص الأصلي يقول:** `java.lang.Thread` ينفّذ `java.lang.Runnable` ويوفر مجموعة من الدوال للتحكم في المسالك.

**الشرح المبسّط:** `Thread` هو الصف المسؤول عن إدارة دورة حياة المسلك كاملة — من الإنشاء حتى الإنهاء.

| الدالة | الوصف |
|--------|--------|
| `Thread()` | منشئ افتراضي — ينشئ مسلكاً فارغاً |
| `Thread(task: Runnable)` | منشئ بمهمة محددة |
| `start(): void` | يُشغّل المسلك — يستدعي `run()` عبر `JVM` |
| `isAlive(): boolean` | يختبر هل المسلك يعمل حالياً |
| `setPriority(p: int): void` | يضبط الأولوية (1 إلى 10) |
| `join(): void` | ينتظر حتى ينتهي هذا المسلك |
| `sleep(millis: long): void` | يُنيم المسلك لوقت محدد |
| `yield(): void` | يتنازل مؤقتاً ليعمل مسلك آخر |
| `interrupt(): void` | يُرسل إشارة انقطاع للمسلك |

---

#### 1.5. أولويات المسالك `Thread Priorities`

**النص الأصلي يقول:** الأولويات أرقام من 1 إلى 10، والصف `Thread` يحتوي الثوابت `MIN_PRIORITY`، `NORM_PRIORITY`، `MAX_PRIORITY`.

**الشرح المبسّط:** الأولوية تُخبر المُجدوِل `scheduler` أيّ مسلك يجب أن يحظى بمزيد من وقت المعالج. أولوية `main` الافتراضية = 5.

```java
thread3.setPriority(Thread.MAX_PRIORITY); // set to priority 10
// Thread.MIN_PRIORITY = 1
// Thread.NORM_PRIORITY = 5
// Thread.MAX_PRIORITY = 10
```

#### ملاحظة:
> الأولوية **توجيه** للـ `JVM` لا **ضمان** — السلوك الفعلي يعتمد على نظام التشغيل.

**مثال من الامتحان:**
> **Q:** What is the default priority of the main thread in Java?
> أ) 1   ب) 10   ج) 5   د) 0
> **الإجابة الصحيحة: ج** — التعليل: `Thread.NORM_PRIORITY = 5`.

---

#### 1.6. الدوال `yield()` و `sleep()` و `join()`

**النص الأصلي يقول:** المحاضرة تُقدّم ثلاثة أمثلة لتعديل سلوك المسلك داخل `PrintNum`.

**الشرح المبسّط:** هذه الدوال تُتيح للمبرمج التحكم في تشارك وقت المعالج بين المسالك.

##### `yield()` — التنازل عن المعالج

```java
@Override
public void run() {
    for (int i = 1; i <= lastNum; i++) {
        System.out.print(" " + i);
        Thread.yield(); // give other threads a chance to run
    }
}
```
> في كل تكرار، يتنازل المسلك مؤقتاً لإتاحة الفرصة لمسالك أخرى.

##### `sleep()` — الإنامة

```java
@Override
public void run() {
    try {
        for (int i = 1; i <= lastNum; i++) {
            System.out.print(" " + i);
            if (i >= 25) Thread.sleep(1000); // sleep 1 second after 25
        }
    } catch (InterruptedException ex) {
        // handle interruption
    }
}
```
> `sleep()` ترمي استثناءً `InterruptedException` يجب معالجته.

##### `join()` — الانتظار حتى انتهاء مسلك آخر

```java
@Override
public void run() {
    Thread thread4 = new Thread(new PrintChar('c', 20)); // create thread4
    thread4.start(); // start thread4
    try {
        for (int i = 1; i <= lastNum; i++) {
            System.out.print("*" + i);
            if (i == 25) thread4.join(); // wait for thread4 to finish
        }
    } catch (InterruptedException ex) {}
}
```
> الأعداد من 26 إلى 50 لن تُطبع إلا بعد انتهاء `thread4`.

#### 🤔 تفعيل الفهم:
> **سؤال:** ما الفرق بين `sleep(1000)` و `join()`؟
> **لماذا هذا مهم؟** `sleep` ينتظر وقتاً محدداً بغض النظر عن المسالك الأخرى، بينما `join` ينتظر مسلكاً بعينه حتى ينتهي.

---

#### 1.7. الطريقة الثانية لبناء وتشغيل المسالك: الوراثة من `Thread`

**النص الأصلي يقول:** الطريقة الثانية هي توريث الصف `Thread` مباشرة وتجاوز الدالة `run()`.

**الشرح المبسّط:** بدلاً من تطبيق `Runnable`، يرث الصف من `Thread` مباشرة، وهذا يُتيح استخدام `getName()` وغيرها من دوال `Thread` داخل الكلاس.

#### 💻 الكود: `TwoThreadsTest` — الطريقة الثانية

#### ما هذا الكود؟
> محاكاة مسلكين يتبادلان غفوات عشوائية، مع طباعة مدة الغفوة في كل مرة.

```java
class SimpleThread extends Thread {
    int st; // sleep time variable

    public SimpleThread(String str) {
        super(str); // pass name to Thread constructor
    }

    public void run() {
        for (int i = 0; i < 10; i++) {
            // Print iteration index and thread name
            System.out.print(" " + i + " " + getName());
            try {
                st = (int) (Math.random() * 1000); // random sleep time
                System.out.println("  " + st);
                sleep(st); // sleep for random milliseconds
            } catch (InterruptedException e) {
                // handle interruption gracefully
            }
        }
        System.out.println("DONE! " + getName()); // announce completion
    }
}

public class TwoThreadsTest {
    public static void main(String[] args) {
        new SimpleThread("Jamaica").start(); // start first thread
        new SimpleThread("Fiji").start();    // start second thread
    }
}
```

#### شرح كل سطر:
1. `extends Thread` → الوراثة المباشرة من `Thread` — الطريقة الثانية
2. `super(str)` → تمرير الاسم لمنشئ `Thread` لاستخدامه مع `getName()`
3. `getName()` → دالة مورثة من `Thread` تُعيد اسم المسلك
4. `sleep(st)` → متوفرة مباشرة لأن الكلاس يرث من `Thread`
5. `new SimpleThread("Jamaica").start()` → إنشاء وتشغيل في سطر واحد

**الناتج المتوقع:**
> الناتج عشوائي — مثل:
> `0 Jamaica 401` ثم `0 Fiji 492` بترتيب يعتمد على أوقات الغفوة.

#### ⚖️ المقايضة: `Runnable` مقابل تمديد `Thread`

| | `implements Runnable` | `extends Thread` |
|---|---|---|
| المزايا | يمكن وراثة كلاس آخر أيضاً | كود أبسط وأقصر |
| العيوب | يتطلب تغليف في `Thread` | يحجز الوراثة الوحيدة في Java |
| متى تختاره | عند الحاجة للوراثة من كلاس آخر | عند كتابة مسالك بسيطة |

---

#### 1.8. معلومات المسلك: `ThreadInfo`

**النص الأصلي يقول:** يمكن استرجاع معلومات المسلك الحالي مثل الاسم والمعرّف والأولوية والحالة.

```java
class ThreadInfo {
    public static void main(String args[]) {
        Thread t = Thread.currentThread(); // get current thread
        System.out.println("Current Thread: " + t);
        System.out.println("Name: " + t.getName());
        System.out.println("Id: " + t.getId());
        System.out.println("Priority: " + t.getPriority());
        System.out.println("State: " + t.getState());

        // Modify name and priority
        t.setName("Primary");
        t.setPriority(8);

        System.out.println("Current Thread: " + t); // Thread[Primary,8,main]
    }
}
```

**الناتج المتوقع:**
```
Current Thread: Thread[main,5,main]
Name: main
Id: 1
Priority: 5
State: RUNNABLE
```

---

#### 1.9. حالات المسلك `Thread States`

**النص الأصلي يقول:** يمر المسلك بعدة حالات من الإنشاء حتى الانتهاء.

#### 📊 المخطط: حالات المسلك

#### ما هذا المخطط؟
> يوضح دورة حياة المسلك الكاملة وكيف تنتقل بين الحالات.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
|---|---------|-------------|-------|
| 1 | New | state | تم إنشاء المسلك ولم يُشغَّل |
| 2 | Ready | state | جاهز للتنفيذ، ينتظر المعالج |
| 3 | Running | state | يُنفَّذ حالياً |
| 4 | Blocked | state | محجوب — ينتظر join/sleep/wait |
| 5 | Finished | state | أنهى تنفيذ run() |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|----|-----|---------|-----------|-------|
| New | Ready | start() | solid | بدء التشغيل |
| Ready | Running | run() | solid | حصل على المعالج |
| Running | Ready | yield()/timeout | solid | تنازل أو انتهاء شريحة الوقت |
| Running | Blocked | sleep/join/wait | solid | دخل حالة الانتظار |
| Blocked | Ready | wakeup/signaled | solid | استيقظ |
| Running | Finished | run() completed | solid | انتهى التنفيذ |

```diagram
type: activity
title: Thread States Lifecycle
direction: TD
nodes:
  - id: new
    label: New
    kind: event
    level: 0
  - id: ready
    label: Ready
    kind: process
    level: 1
  - id: running
    label: Running
    kind: process
    level: 2
  - id: blocked
    label: Blocked (wait/sleep/join)
    kind: process
    level: 3
  - id: finished
    label: Finished
    kind: event
    level: 4
edges:
  - from: new
    to: ready
    label: start()
    style: solid
  - from: ready
    to: running
    label: run()
    style: solid
  - from: running
    to: ready
    label: yield() / timeout
    style: solid
  - from: running
    to: blocked
    label: sleep() / join() / wait()
    style: solid
  - from: blocked
    to: ready
    label: wakeup / signaled
    style: solid
  - from: running
    to: finished
    label: run() completed
    style: solid
```

| الحالة | وصف |
|--------|-----|
| `New` | تم إنشاء كائن `Thread`، لم تُستدعَ `start()` بعد |
| `Ready` | في قائمة الانتظار، ينتظر حصته من المعالج |
| `Running` | يُنفَّذ حالياً على المعالج |
| `Blocked` | ينتظر انتهاء `sleep` أو `join` أو `wait` |
| `Finished` | انتهت `run()`، المسلك ميّت لا يمكن إعادة تشغيله |

---

#### 1.10. مجمعات المسالك `Thread Pools`

**النص الأصلي يقول:** مجمع المسالك `Thread Pool` يمكن استخدامه لتنفيذ المهام بكفاءة.

**الشرح المبسّط:** بدلاً من إنشاء وإتلاف `Thread` جديد لكل مهمة (مُكلِف!)، يُنشئ المجمع مسالك مُعاد استخدامها. كالمطعم الذي يُبقي 3 نوادل دائمين بدلاً من توظيف واحد جديد لكل طلب.

**💡 التشبيه:**
> مجمع المسالك كمجموعة تاكسي جاهزة — بدلاً من صنع سيارة جديدة لكل رحلة، تُسنَد الرحلة لأول سيارة متاحة.
> **وجه الشبه:** السيارة = `Thread`، الرحلة = `Runnable task`.

| الصف/الواجهة | الدالة | الوصف |
|---|---|---|
| `Executors` | `newFixedThreadPool(n)` | مجمع بعدد ثابت `n` من المسالك |
| `Executors` | `newCachedThreadPool()` | مجمع مرن — ينشئ مسالك حسب الطلب |
| `ExecutorService` | `execute(Runnable)` | تشغيل مهمة |
| `ExecutorService` | `shutdown()` | يُغلق المجمع بعد إتمام المهام |
| `ExecutorService` | `shutdownNow()` | يُغلق فوراً |
| `ExecutorService` | `isTerminated()` | هل انتهت كل المهام؟ |

#### 💻 الكود: `ExecutorDemo` — مجمع المسالك

#### ما هذا الكود؟
> يُظهر ثلاث طرق لإنشاء مجمع مسالك وتأثير ذلك على التنفيذ المتزامن.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorDemo {
    public static void main(String[] args) {
        // Option 1: Fixed pool with 3 threads — all run concurrently
        // ExecutorService executor = Executors.newFixedThreadPool(3);

        // Option 2: Fixed pool with 1 thread — sequential execution
        // ExecutorService executor = Executors.newFixedThreadPool(1);

        // Option 3: Cached pool — creates threads as needed
        ExecutorService executor = Executors.newCachedThreadPool();

        executor.execute(new PrintChar('a', 100)); // submit task 1
        executor.execute(new PrintChar('b', 100)); // submit task 2
        executor.execute(new PrintNum(50));          // submit task 3

        executor.shutdown(); // no new tasks accepted; wait for completion
    }
}
```

#### شرح كل سطر:
1. `newFixedThreadPool(3)` → 3 مسالك — المهام الثلاث تعمل بالتوازي
2. `newFixedThreadPool(1)` → مسلك واحد — المهام تُنفَّذ بالتسلسل
3. `newCachedThreadPool()` → مسالك جديدة حسب الطلب — تُعاد للمجمع عند انتهاء مهمتها
4. `execute(task)` → تسليم المهمة للمجمع
5. `shutdown()` → منع مهام جديدة، انتظر إتمام الحاليات

**مثال من الامتحان:**
> **Q:** What happens when `newFixedThreadPool(1)` is used with 3 tasks?
> أ) All three tasks run concurrently
> ب) Tasks run sequentially — one after another
> ج) Only the first task runs
> د) An exception is thrown
> **الإجابة الصحيحة: ب** — التعليل: مسلك واحد في المجمع يعني تنفيذ متسلسل حتمي.

---

#### 1.11. مثال الساعة الرقمية: `TimeThreadDemo`

**النص الأصلي يقول:** المثال يُحاكي ساعة رقمية حيث يقوم التطبيق بطباعة التاريخ والتوقيت المحلي كل ثانية (1000 ميلي ثانية) وذلك باستخدام المسالك.

```java
import java.util.*;
class TimeThreadDemo {
    Thread t;
    TimeThreadDemo(String name) {
        t = new Thread(new Task(), name); // create thread with task and name
        t.start(); // start immediately
    }
    public static void main(String args[]) {
        TimeThreadDemo d = new TimeThreadDemo("Digital clock");
    }
}

class Task implements Runnable {
    Calendar c;
    Date d;
    public void run() {
        for (;;) { // infinite loop
            try {
                c = Calendar.getInstance(); // get current time
                d = c.getTime();             // convert to Date
                System.out.println(d);       // print date and time
                Thread.sleep(1000);          // wait 1 second
            } catch (Exception e) {}
        }
    }
}
```

---

### 2. التزامن `Synchronization`

---

#### 2.1. مشكلة السباق `Race Condition`

**النص الأصلي يقول:** تطبيق يبني 100 مسلك، كل مسلك يُضيف بنساً واحداً للرصيد. بدون مزامنة، الناتج غير صحيح بسبب `race condition`.

**الشرح المبسّط:** مشكلة السباق تحدث عندما يقرأ مسلكان قيمة المتغير في نفس الوقت ثم يكتبان — أحدهما يُلغي تعديل الآخر.

**💡 التشبيه:**
> شخصان يقرآن رصيد حساب (100 ريال) في آنٍ واحد، كل واحد يُضيف 10 ويكتب النتيجة (110)، فيُصبح الرصيد 110 بدلاً من 120.
> **وجه الشبه:** الحساب = المتغير المشترك `balance`.

#### 💻 الكود: `AccountWithoutSync` — بدون تزامن

#### ما هذا الكود؟
> يُظهر مشكلة `race condition` — 100 مسلك يُضيفون بنساً لكن الناتج أقل من 100.

```java
import java.util.concurrent.*;
public class AccountWithoutSync {
    private static Account account = new Account(); // shared account

    public static void main(String[] args) {
        ExecutorService executor = Executors.newCachedThreadPool();

        // Create 100 threads each adding 1 penny
        for (int i = 0; i < 100; i++) {
            executor.execute(new AddAPennyTask());
        }
        executor.shutdown();

        // Wait until all threads finish
        while (!executor.isTerminated()) {}

        System.out.println("What is balance? " + account.getBalance());
        // Expected: 100, Actual: LESS due to race condition
    }

    private static class AddAPennyTask implements Runnable {
        public void run() {
            account.deposit(1); // UNSAFE — no synchronization
            // SAFE version: synchronized(account){account.deposit(1);}
        }
    }

    private static class Account {
        private int balance = 0;

        public int getBalance() {
            return balance;
        }

        // NOT synchronized — race condition possible
        public void deposit(int amount) {
            int newBalance = balance + amount; // read
            try {
                Thread.sleep(5); // simulate delay — allows race
            } catch (InterruptedException ex) {}
            balance = newBalance; // write — may overwrite another thread's change
        }
    }
}
```

#### شرح كل سطر (المشكلة):
1. `int newBalance = balance + amount` → Thread A يقرأ `balance = 0`, ويحسب `newBalance = 1`
2. `Thread.sleep(5)` → تبديل سياق — Thread B يقرأ `balance = 0` أيضاً ويحسب `newBalance = 1`
3. `balance = newBalance` → Thread A يكتب 1، ثم Thread B يكتب 1 فوقه — **ضاعت إحدى العمليتين!**

**الناتج المتوقع:**
> قيمة أقل من 100 — غير محددة، تتغير في كل تشغيل.

---

#### 2.2. الحل بالكلمة المفتاحية `synchronized`

**النص الأصلي يقول:** يتطلب الأمر مزامنة التطبيق من خلال وسم دالة الإيداع بالكلمة `synchronized` أو بإضافة كتلة مزامنة، وعندها يكون الناتج 100 دائماً.

```java
// Solution 1: synchronized method
public synchronized void deposit(int amount) {
    int newBalance = balance + amount;
    try { Thread.sleep(5); } catch (InterruptedException ex) {}
    balance = newBalance;
}

// Solution 2: synchronized block
public void run() {
    synchronized(account) {
        account.deposit(1);
    }
}
```

#### مهم للامتحان ⚠️:
> `synchronized` تضمن أن مسلكاً واحداً فقط يُنفّذ الدالة أو الكتلة في أي وقت — المسالك الأخرى تنتظر.

**الفهم الخاطئ الشائع ❌:** `synchronized` يجعل البرنامج أبطأ دائماً.
**الفهم الصحيح ✅:** نعم أبطأ قليلاً، لكن هذا ثمن الصحة — بدونه النتائج خاطئة.

---

#### 2.3. التزامن بالمفاتيح `Synchronization Using Locks`

**النص الأصلي يقول:** يمكن استخدام `Lock` و `Condition` بشكل صريح لمزامنة المسالك.

**الشرح المبسّط:** `ReentrantLock` يوفر تحكماً أدق من `synchronized` — يمكنك تحديد الانتظار بوقت، والتحقق من القفل، وغيرها.

| الواجهة/الصف | الدالة | الوصف |
|---|---|---|
| `Lock` | `lock()` | يستحوذ على القفل |
| `Lock` | `unlock()` | يُحرر القفل |
| `Lock` | `newCondition()` | ينشئ شرطاً `Condition` مربوطاً بهذا القفل |
| `ReentrantLock()` | منشئ | نفس `ReentrantLock(false)` |
| `ReentrantLock(fair: boolean)` | منشئ | إذا `true` — أطول منتظر يحصل على القفل |

#### 💻 الكود: `AccountWithSyncUsingLock` — التزامن بالمفاتيح

#### ما هذا الكود؟
> نفس مسألة الحساب لكن مع استخدام `ReentrantLock` بدلاً من `synchronized`.

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

private static class Account {
    private static Lock lo = new ReentrantLock(); // create lock
    private int balance = 0;

    public int getBalance() { return balance; }

    public void deposit(int amount) {
        lo.lock(); // acquire lock — block others
        try {
            int newBalance = balance + amount;
            Thread.sleep(5);
            balance = newBalance;
        } catch (InterruptedException ex) {
            // handle exception
        } finally {
            lo.unlock(); // ALWAYS release lock — even if exception occurs
        }
    }
}
```

#### شرح كل سطر:
1. `new ReentrantLock()` → إنشاء قفل قابل لإعادة الدخول
2. `lo.lock()` → الاستحواذ على القفل — بقية المسالك تنتظر
3. `finally { lo.unlock() }` → استخدام `finally` يضمن تحرير القفل **دائماً** حتى عند الاستثناء

#### مهم للامتحان ⚠️:
> **يجب** استخدام `finally` مع `unlock()` — بدونه إذا رُمي استثناء يبقى القفل محجوزاً للأبد (`deadlock`).

---

#### 2.4. تعاون المسالك `Cooperation among Threads`

**النص الأصلي يقول:** تطبيق يُحاكي الحساب المصرفي — الأولى تُمكّن صاحب الحساب من إضافة مبلغ عشوائي (1-10)، والثانية لسحب مبلغ عشوائي (1-10). ملاحظة: لا يمكن سحب مبلغ أكبر من الرصيد.

**الشرح المبسّط:** `Condition` يُتيح للمسالك التواصل — مسلك الإيداع يُنبّه مسلك السحب عند توفر رصيد كافٍ.

| الدالة | الوصف |
|--------|--------|
| `await()` | يُوقف المسلك وينتظر حتى يُشار إليه |
| `signal()` | يُوقظ مسلكاً واحداً منتظراً |
| `signalAll()` | يُوقظ كل المسالك المنتظرة |

#### ملاحظة:
> `wait()`, `notify()`, `notifyAll()` على كائن `Monitor` مكافئة لـ `await()`, `signal()`, `signalAll()` على `Condition`.

#### 💻 الكود: `ThreadCooperation` — الحساب المصرفي

#### ما هذا الكود؟
> مسلك إيداع ومسلك سحب يتعاونان — السحب ينتظر إذا كان الرصيد غير كافٍ.

```java
import java.util.concurrent.*;
import java.util.concurrent.locks.*;

public class ThreadCooperation {
    private static Account account = new Account();

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        System.out.println("Thread 1\t\tThread 2\t\tBalance");
        executor.execute(new DepositTask());  // thread 1: deposit
        executor.execute(new WithdrawTask()); // thread 2: withdraw
        executor.shutdown();
    }

    // Deposit task — runs in infinite loop
    static class DepositTask implements Runnable {
        @Override
        public void run() {
            try {
                while (true) {
                    account.deposit((int)(Math.random() * 10) + 1); // deposit 1-10
                    Thread.sleep(1000); // wait 1 second between deposits
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }

    // Withdraw task — runs in infinite loop
    static class WithdrawTask implements Runnable {
        @Override
        public void run() {
            while (true) {
                account.withdraw((int)(Math.random() * 10) + 1); // withdraw 1-10
            }
        }
    }

    private static class Account {
        private static Lock lock = new ReentrantLock();        // mutual exclusion
        private static Condition newDeposit = lock.newCondition(); // condition variable
        private int balance = 0;

        public int getBalance() { return balance; }

        public void deposit(int amount) {
            lock.lock(); // acquire lock
            try {
                balance += amount;
                System.out.println("Deposit " + amount + "\t\t\t\t\t" + getBalance());
                newDeposit.signalAll(); // wake up all waiting withdraw threads
            } finally {
                lock.unlock(); // release lock
            }
        }

        public void withdraw(int amount) {
            lock.lock(); // acquire lock
            try {
                while (balance < amount) { // not enough balance
                    System.out.println("\t\t\t Wait for a deposit");
                    newDeposit.await(); // release lock and wait for signal
                }
                balance -= amount;
                System.out.println("\t\t\tWithdraw " + amount + "\t\t" + getBalance());
            } catch (InterruptedException ex) { ex.printStackTrace(); }
            finally {
                lock.unlock(); // release lock
            }
        }
    }
}
```

#### شرح كل سطر المهمة:
1. `lock.newCondition()` → إنشاء شرط مرتبط بالقفل
2. `newDeposit.await()` → يُحرّر القفل وينتظر — يسمح لمسلك الإيداع بالعمل
3. `newDeposit.signalAll()` → يُوقظ كل المنتظرين ليُعيدوا الفحص
4. `while (balance < amount)` → **يجب while لا if** — قد ينتبه المسلك قبل توفر رصيد كافٍ

#### مهم للامتحان ⚠️:
> استخدم `while` لا `if` مع `await()` — لأن `signalAll` يُوقظ الجميع، والشرط قد لا يتحقق لكل منهم.

---

#### 2.5. مسألة المنتج والمستهلك `Producer-Consumer`

**النص الأصلي يقول:** بفرض لدينا ذاكرة محدودة الحجم وللقيام بالقراءة والكتابة من وإلى الذاكرة لابد من استخدام مفتاح `lock` والشرطين `notFull` - `notEmpty` بحيث: القراءة تقتضي أن تكون الذاكرة غير فارغة، والكتابة تقتضي أن تكون الذاكرة غير ممتلئة.

⚙️ **الخطوات / الخوارزمية: منطق المنتج-المستهلك**

#### ما هدف هذه العملية؟
> منع الكتابة عند امتلاء الذاكرة، ومنع القراءة عند فراغها.

```algorithm
1 | المنتج يريد كتابة | write() | تحقق: هل الذاكرة ممتلئة (count == CAPACITY)?
2 | ممتلئة | notFull.await() | انتظر حتى يُفرَغ موضع
3 | ليست ممتلئة | queue.offer(value) | أضف العنصر للذاكرة
4 | بعد الإضافة | notEmpty.signal() | أخبر المستهلك أن هناك بيانات
5 | المستهلك يريد قراءة | read() | تحقق: هل الذاكرة فارغة (count == 0)?
6 | فارغة | notEmpty.await() | انتظر حتى يُضاف عنصر
7 | ليست فارغة | queue.remove() | اقرأ وأزِل العنصر
8 | بعد الإزالة | notFull.signal() | أخبر المنتج أن هناك مكاناً فارغاً
```

#### 💻 الكود: `ConsumerProducer` — المنتج والمستهلك

#### ما هذا الكود؟
> منتج وزبون يتشاركان مخزناً محدود الحجم (CAPACITY = 1).

```java
import java.util.concurrent.*;
import java.util.concurrent.locks.*;

public class ConsumerProducer {
    private static Buffer buffer = new Buffer();

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.execute(new ProducerTask()); // start producer
        executor.execute(new ConsumerTask()); // start consumer
        executor.shutdown();
    }

    // Producer: writes integers to buffer
    private static class ProducerTask implements Runnable {
        public void run() {
            try {
                int i = 1;
                while (true) {
                    System.out.println("Producer writes " + i);
                    buffer.write(i++); // write next integer
                    Thread.sleep((int)(Math.random() * 10000)); // random delay
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }

    // Consumer: reads integers from buffer
    private static class ConsumerTask implements Runnable {
        public void run() {
            try {
                while (true) {
                    System.out.println("\t\t\tConsumer reads " + buffer.read());
                    Thread.sleep(1000); // fixed 1-second delay
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }

    // Shared buffer with capacity 1
    private static class Buffer {
        private static final int CAPACITY = 1;
        private java.util.LinkedList<Integer> queue = new java.util.LinkedList<>();
        private static Lock lock = new ReentrantLock();
        private static Condition notEmpty = lock.newCondition(); // signal when data available
        private static Condition notFull = lock.newCondition();  // signal when space available

        public void write(int value) {
            lock.lock();
            try {
                while (queue.size() == CAPACITY) { // buffer full?
                    System.out.println("Wait for notFull condition");
                    notFull.await(); // wait for consumer to read
                }
                queue.offer(value);   // add to buffer
                notEmpty.signal();    // notify consumer
            } catch (InterruptedException ex) { ex.printStackTrace(); }
            finally { lock.unlock(); }
        }

        public int read() {
            int value = 0;
            lock.lock();
            try {
                while (queue.isEmpty()) { // buffer empty?
                    System.out.println("\t\t\tWait for notEmpty condition");
                    notEmpty.await(); // wait for producer to write
                }
                value = queue.remove(); // read from buffer
                notFull.signal();       // notify producer
            } catch (InterruptedException ex) { ex.printStackTrace(); }
            finally { lock.unlock(); return value; }
        }
    }
}
```

---

#### 2.6. قوائم الحجب `Blocking Queues`

**النص الأصلي يقول:** `BlockingQueue` توفر بديلاً مبسّطاً لمسألة المنتج-المستهلك بدون الحاجة لـ `locks` و `conditions`.

**الشرح المبسّط:** `ArrayBlockingQueue` تتولى كل التزامن داخلياً — `put()` تنتظر إن كانت ممتلئة، و`take()` تنتظر إن كانت فارغة.

| الصف | المنشئ | الوصف |
|---|---|---|
| `ArrayBlockingQueue<E>` | `(capacity: int)` | حجم ثابت |
| `LinkedBlockingQueue<E>` | `()` أو `(capacity: int)` | حجم اختياري |
| `PriorityBlockingQueue<E>` | `()` أو `(capacity: int)` | مرتّب بالأولوية |

| الدالة | الوصف |
|--------|--------|
| `put(element)` | يُضيف — ينتظر إن كانت ممتلئة |
| `take()` | يأخذ ويُزيل — ينتظر إن كانت فارغة |

#### 💻 الكود: `ConsumerProducerUsingBlockingQueue`

#### ما هذا الكود؟
> نفس مسألة المنتج-المستهلك لكن بدون `locks` و `conditions` — أبسط بكثير.

```java
import java.util.concurrent.*;

public class ConsumerProducerUsingBlockingQueue {
    // Blocking queue with capacity 2 — handles sync internally
    private static ArrayBlockingQueue<Integer> buffer =
        new ArrayBlockingQueue<Integer>(2);

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.execute(new ProducerTask());
        executor.execute(new ConsumerTask());
        executor.shutdown();
    }

    // Producer: no need for explicit lock/condition
    private static class ProducerTask implements Runnable {
        public void run() {
            try {
                int i = 1;
                while (true) {
                    System.out.println("Producer writes " + i);
                    buffer.put(i++); // blocks automatically if full
                    Thread.sleep((int)(Math.random() * 100));
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }

    // Consumer: no need for explicit lock/condition
    private static class ConsumerTask implements Runnable {
        public void run() {
            try {
                while (true) {
                    System.out.println("\t\t\tConsumer reads");
                    buffer.take(); // blocks automatically if empty
                    Thread.sleep((int)(Math.random() * 10000));
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }
}
```

#### ملاحظة:
> لاحظ عدم استخدام `conditions and locks` — `BlockingQueue` تتكفّل بكل ذلك.

---

#### 2.7. السيمافور `Semaphore`

**النص الأصلي يقول:** `Semaphore` في `java.util.concurrent` يوفر آلية تحكم بعدد المسالك المتزامنة.

**الشرح المبسّط:** السيمافور كتصاريح دخول — عندها `n` تصريح، `n` مسالك تدخل معاً، البقية تنتظر.

| الدالة | الوصف |
|--------|--------|
| `Semaphore(n)` | إنشاء سيمافور بـ `n` تصاريح |
| `Semaphore(n, fair)` | مع سياسة عدالة |
| `acquire()` | خذ تصريحاً — انتظر إن لا يوجد |
| `release()` | أعد التصريح |

```java
private static class Account2 {
    private static Semaphore semaphore = new Semaphore(1); // 1 permit = mutex
    private int balance = 0;

    public void deposit(int amount) {
        try {
            semaphore.acquire(); // acquire permit — fairness policy
            int newBalance = balance + amount;
            Thread.sleep(5);
            balance = newBalance;
        } catch (InterruptedException ex) {
        } finally {
            semaphore.release(); // always release permit
        }
    }
}
```

#### ⚖️ المقايضة: `synchronized` vs `Lock` vs `Semaphore`

| | `synchronized` | `ReentrantLock` | `Semaphore` |
|---|---|---|---|
| المزايا | بسيط، تلقائي | مرن، يدعم `Condition` | يتحكم بعدد المسالك |
| العيوب | لا تحكم دقيق | يتطلب `unlock()` يدوياً | أكثر تعقيداً |
| متى تختاره | مزامنة بسيطة | تزامن متقدم مع شروط | تحديد السعة |

---

#### 2.8. المجموعات المتزامنة `Synchronized Collections`

**النص الأصلي يقول:** الصفوف المعرّفة ضمن `java.collections framework` ليست آمنة مع المسالك. وبالتالي تم تزويد الصف `Collections` بالدوال الساكنة الموضحة لتغطية التزامن أثناء استخدام المسالك.

| الدالة | الوصف |
|--------|--------|
| `Collections.synchronizedCollection(c)` | مجموعة متزامنة |
| `Collections.synchronizedList(list)` | قائمة متزامنة |
| `Collections.synchronizedMap(m)` | خريطة متزامنة |
| `Collections.synchronizedSet(s)` | مجموعة `Set` متزامنة |
| `Collections.synchronizedSortedMap(s)` | خريطة مرتّبة متزامنة |
| `Collections.synchronizedSortedSet(s)` | مجموعة مرتّبة متزامنة |

---

### 3. البرمجة المتوازية `Parallel Programming`

---

#### 3.1. إطار عمل `Fork/Join`

**النص الأصلي يقول:** `Parallel Programming` — تقسيم المشكلة إلى مشاكل فرعية `subproblems` تُنفَّذ بالتوازي ثم دمج النتائج.

**الشرح المبسّط:** فكرة "فرّق تسُد" — قسّم المصفوفة، فرز كل نصف بمسلك منفصل، ادمج. مثل فريق عمل يُوزّع المهام بدلاً من شخص واحد يفعل كل شيء.

| الصف/الواجهة | الوصف |
|---|---|
| `ForkJoinPool` | حوض مسالك متخصص للمهام التكرارية |
| `RecursiveAction` | مهمة لا تُعيد قيمة — `compute(): void` |
| `RecursiveTask<V>` | مهمة تُعيد قيمة — `compute(): V` |
| `fork()` | تشغيل مهمة فرعية لاحقاً |
| `join()` | انتظار نتيجة مهمة فرعية |
| `invoke()` | تشغيل وانتظار مهمة في `ForkJoinPool` |

#### 💻 الكود: `ParallelMergeSort` — فرز الدمج المتوازي

#### ما هذا الكود؟
> يُقارن أداء فرز الدمج المتسلسل مقابل المتوازي على 7 مليون عنصر.

```java
import java.util.concurrent.RecursiveAction;
import java.util.concurrent.ForkJoinPool;

public class ParallelMergeSort {
    public static void main(String[] args) {
        final int SIZE = 7000000;
        int[] list1 = new int[SIZE];
        int[] list2 = new int[SIZE];

        // Fill both arrays with same random data
        for (int i = 0; i < list1.length; i++)
            list1[i] = list2[i] = (int)(Math.random() * 10000000);

        // Parallel sort
        long startTime = System.currentTimeMillis();
        parallelMergeSort(list1);
        long endTime = System.currentTimeMillis();
        System.out.println("Parallel time: " + (endTime - startTime) + " ms");

        // Sequential sort
        startTime = System.currentTimeMillis();
        MergeSort.mergeSort(list2);
        endTime = System.currentTimeMillis();
        System.out.println("Sequential time: " + (endTime - startTime) + " ms");
    }

    public static void parallelMergeSort(int[] list) {
        RecursiveAction mainTask = new SortTask(list); // create top-level task
        ForkJoinPool pool = new ForkJoinPool();         // use all available CPUs
        pool.invoke(mainTask);                           // execute and wait
    }

    private static class SortTask extends RecursiveAction {
        private final int THRESHOLD = 500; // small enough to sort directly
        private int[] list;

        SortTask(int[] list) { this.list = list; }

        protected void compute() {
            if (list.length < THRESHOLD) {
                java.util.Arrays.sort(list); // base case: sort directly
            } else {
                // Split into two halves
                int[] firstHalf = new int[list.length / 2];
                System.arraycopy(list, 0, firstHalf, 0, list.length / 2);
                int secondHalfLength = list.length - list.length / 2;
                int[] secondHalf = new int[secondHalfLength];
                System.arraycopy(list, list.length / 2, secondHalf, 0, secondHalfLength);

                // Fork both sub-tasks — run in parallel
                invokeAll(new SortTask(firstHalf), new SortTask(secondHalf));

                // Merge sorted halves
                MergeSort.merge(firstHalf, secondHalf);
            }
        }
    }
}
```

#### 💻 الكود: `ParallelMax` — إيجاد الأعظم بالتوازي

#### ما هذا الكود؟
> إيجاد أكبر قيمة في مصفوفة 10 ملايين عنصر باستخدام `RecursiveTask`.

```java
import java.util.concurrent.*;

public class ParallelMax {
    public static int max(int[] list) {
        RecursiveTask<Integer> task = new MaxTask(list, 0, list.length);
        ForkJoinPool pool = new ForkJoinPool();
        return pool.invoke(task); // return the maximum value
    }

    private static class MaxTask extends RecursiveTask<Integer> {
        private final static int THRESHOLD = 1000;
        private int[] list;
        private int low, high;

        public MaxTask(int[] list, int low, int high) {
            this.list = list; this.low = low; this.high = high;
        }

        @Override
        public Integer compute() {
            if (high - low < THRESHOLD) {
                // Base case: find max directly
                int max = list[low];
                for (int i = low; i < high; i++)
                    if (list[i] > max) max = list[i];
                return max;
            } else {
                // Split and fork
                int mid = (low + high) / 2;
                RecursiveTask<Integer> left = new MaxTask(list, low, mid);
                RecursiveTask<Integer> right = new MaxTask(list, mid, high);
                right.fork(); // schedule right task
                left.fork();  // schedule left task
                // Join and return max of both halves
                return Math.max(left.join(), right.join());
            }
        }
    }
}
```

#### 🤔 تفعيل الفهم:
> **سؤال:** ما الفرق بين `RecursiveAction` و `RecursiveTask`؟
> **لماذا هذا مهم؟** `RecursiveAction` للمهام بدون نتيجة (مثل الفرز في المكان)، `RecursiveTask<V>` للمهام التي تُعيد قيمة (مثل الجمع أو الأعظم).

---

### 4. الوحدة الثانية: الشبكات `Networking`

---

#### 4.1. مقدمة — أشكال برمجة التطبيقات الشبكية

**النص الأصلي يقول:** برمجة التطبيقات الشبكية `Networking Programming` يمكن أن تُفهم بعدة أشكال: التطبيقات الصغيرة `Applets`، وبرمجة قواعد البيانات والملفات على مخادم بعيدة.

**الشرح المبسّط:** أي تطبيق يتعامل مع بيانات عبر الشبكة هو تطبيق شبكي — من المتصفح الذي يُحمّل صفحات الويب إلى تطبيق قاعدة البيانات على خادم بعيد.

---

#### 4.2. بروتوكولات الشبكة

**النص الأصلي يقول:** طبقات الشبكة: `Application` (HTTP, ftp, telnet)، `Transport` (TCP, UDP)، `Network` (IP)، `Link` (device driver).

| البروتوكول | الاسم الكامل | الخاصية |
|---|---|---|
| `TCP` | Transmission Control Protocol | موثوق، مرتّب، بدون فقدان |
| `UDP` | User Datagram Protocol | سريع، غير موثوق، بدون ضمان |

---

#### 4.3. محدد المواقع `URL`

**النص الأصلي يقول:** لكتابة أي تطبيق شبكي لابد من استخدام الحزمة `java.net`، التي تتضمن بدورها الصف `URL`، حيث يفيد في تحديد عنوان مصدر البيانات على الشبكة.

**الشرح المبسّط:** `URL` = Uniform Resource Locator — عنوان موحد يُشير لمورد على الإنترنت. يتكون من بروتوكول + اسم المضيف + المسار.

```
http : //java.sun.com
 ↑              ↑
Protocol    Resource Name
```

| الدالة | الوصف |
|--------|--------|
| `getProtocol()` | يُعيد اسم البروتوكول (مثل `http`) |
| `getHost()` | يُعيد اسم المضيف `host` |
| `getPort()` | يُعيد رقم المنفذ (أو -1 إن لم يُحدَّد) |
| `getFile()` | يُعيد مسار الملف |
| `getRef()` | يُعيد المرجع `#anchor` |

```java
// Create URL objects — multiple constructors
URL gamelan = new URL("http://www.gamelan.com/");
URL gamelanGames = new URL(gamelan, "Gamelan.game.html"); // relative URL
```

#### 💻 الكود: `ParseURL` — تحليل عنوان URL

#### ما هذا الكود؟
> يُحلّل مكونات عنوان `URL` المعطى.

```java
import java.net.*;
import java.io.*;

public class ParseURL {
    public static void main(String[] args) throws Exception {
        // Create URL object for a complex address
        URL aURL = new URL("http://java.sun.com:80/docs/books/tutorial/index.html#DOWNLOADING");

        System.out.println("protocol = " + aURL.getProtocol()); // http
        System.out.println("host     = " + aURL.getHost());     // java.sun.com
        System.out.println("filename = " + aURL.getFile());     // /docs/books/tutorial/index.html
        System.out.println("port     = " + aURL.getPort());     // 80
        System.out.println("ref      = " + aURL.getRef());      // DOWNLOADING
    }
}
```

**الناتج المتوقع:**
```
protocol = http
Host     = java.sun.com
filename = /docs/books/tutorial/index.html
port     = 80
ref      = DOWNLOADING
```

---

#### 4.4. قراءة محتوى URL

**النص الأصلي يقول:** بعد إنشاء غرض من الصف `URL` يمكن استدعاء الدالة `openStream()` لاستعراض وتصفح محتويات الصفحة الرئيسية للموقع.

#### 💻 الكود: `URLReader1` — قراءة صفحة ويب

#### ما هذا الكود؟
> يقرأ ويطبع محتوى HTML لصفحة الويب.

```java
import java.net.*;
import java.io.*;

public class URLReader1 {
    public static void main(String[] args) throws Exception {
        URL yah = new URL("http://www.yahoo.com/"); // create URL
        // Open stream and wrap in BufferedReader for efficiency
        BufferedReader in = new BufferedReader(
            new InputStreamReader(yah.openStream())
        );
        String inputLine;
        while ((inputLine = in.readLine()) != null) { // read line by line
            System.out.println(inputLine); // print HTML source
        }
        in.close(); // close stream
    }
}
```

#### 💻 الكود: `URLConnectionReader` — استخدام `URLConnection`

#### ما هذا الكود؟
> يستخدم `openConnection()` بدلاً من `openStream()` لمزيد من التحكم.

```java
import java.net.*;
import java.io.*;

public class URLConnectionReader {
    public static void main(String[] args) throws Exception {
        URL ya = new URL("http://www.yahoo.com/");
        URLConnection yc = ya.openConnection(); // establish connection
        BufferedReader in = new BufferedReader(
            new InputStreamReader(yc.getInputStream()) // get input stream
        );
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            System.out.println(inputLine);
        }
        in.close();
    }
}
```

---

#### 4.5. الصف `InetAddress`

**النص الأصلي يقول:** من الصفوف المهمة أيضاً `InetAddress` الذي يتضمن عدداً من الطرائق والدوال تسمح لنا بتشييد الأغراض انطلاقاً من مجموعة المحارف التي تمثل عناوين الإنترنت والأسماء المستضيفة.

| الدالة | الوصف |
|--------|--------|
| `getAddress()` | يُعيد العنوان كمصفوفة `byte` |
| `getAllByName(host)` | يُعيد كل عناوين الاسم المضيف |
| `getByName(host)` | يُعيد عنواناً واحداً للاسم المضيف |
| `getHostAddress()` | يُعيد العنوان IP كنص |
| `getHostName()` | يُعيد الاسم المضيف من `IP` |
| `isReachable(timeout)` | هل يمكن الوصول للعنوان؟ |
| `toString()` | تحويل العنوان لنص |

```java
import java.net.*;
public class IAddress {
    public static void main(String[] args) {
        try {
            InetAddress Ad = InetAddress.getByName("www.acm.org"); // DNS lookup
            System.out.println("Local IP address = " + Ad.toString());
            // Output: www.acm.org/63.118.7.16
        } catch (UnknownHostException e) {
            System.out.println("Unable to obtain local IP address");
        }
    }
}
```

---

#### 4.6. المقابس البرمجية `Sockets`

**النص الأصلي يقول:** التطبيقات الشبكية بين التطبيق الزبون والتطبيق المخدم تتطلب آلية من مستوى أدنى تتجلى في لغة الجافا من خلال الأغراض من الصفين `Socket`, `ServerSocket`، اللذين يهتمان بعملية الاتصال بين التطبيقين دون حصول أي ضياع في البيانات ووصولها بالتسلسل المُرسل.

**الشرح المبسّط:** `Socket` = مأخذ برمجي — نقطة اتصال بين برنامجين على الشبكة. مثل مقبس الكهرباء — يوفر قناة اتصال جاهزة.

**💡 التشبيه:**
> `Socket` كالهاتف — `ServerSocket` كالهاتف العام الذي ينتظر المكالمات، `Socket` كهاتف الزبون الذي يتصل.
> **وجه الشبه:** رقم الهاتف = `port`، شركة الاتصالات = `IP`.

| بناء/دالة `Socket` | الوصف |
|---|---|
| `Socket()` | منشئ افتراضي |
| `Socket(address, port)` | اتصال بعنوان ومنفذ |
| `Socket(host, port)` | اتصال باسم مضيف ومنفذ |
| `close()` | إغلاق المقبس |
| `getInputStream()` | تيار البيانات الواردة |
| `getOutputStream()` | تيار البيانات الصادرة |
| `getPort()` | رقم المنفذ |
| `isClosed()` | هل المقبس مغلق؟ |

| بناء/دالة `ServerSocket` | الوصف |
|---|---|
| `ServerSocket(port)` | ربط بمنفذ للاستماع |
| `accept()` | انتظر اتصالاً — يُعيد `Socket` للتواصل مع الزبون |
| `close()` | إغلاق مقبس المخدم |

---

#### 4.7. مثال 1: تطبيق الزبون-المخدم — ضرب عددين

**النص الأصلي يقول:** بناء تطبيقين (تطبيق الزبون – تطبيق المخدم) ليعملا معاً لإنجاز عملية جداء لعددين يرسلهما الزبون للمخدم، حيث يقوم المخدم بإيجاد ناتج الجداء وإعادته للزبون.

⚙️ **الخطوات / الخوارزمية: بناء تطبيق Zبون-مخدم**

#### ما هدف هذه العملية؟
> إنشاء اتصال TCP بين برنامجين على الشبكة.

```algorithm
1 | المخدم | new ServerSocket(1234) | فتح مقبس على المنفذ 1234
2 | المخدم | serverSocket.accept() | انتظار اتصال من الزبون
3 | الزبون | new Socket("127.0.0.1", 1234) | الاتصال بالمخدم
4 | كلاهما | getInputStream/getOutputStream | فتح تيارات القراءة والكتابة
5 | الزبون | outc.println(num1, num2) | إرسال الأعداد
6 | المخدم | ins.readLine() | استقبال الأعداد وحساب الجداء
7 | المخدم | outs.println(result) | إرسال النتيجة
8 | الزبون | inc.readLine() | استقبال وطباعة النتيجة
9 | كلاهما | close() | إغلاق كل المقابس والتيارات
```

#### 💻 الكود: `client_1` — تطبيق الزبون

#### ما هذا الكود؟
> يتصل بالمخدم على `localhost:1234`، يرسل عددين، يستقبل جداءهما.

```java
import java.io.*;
import java.net.*;

public class client_1 {
    public static void main(String[] args) throws IOException {
        Socket socket = null;
        PrintWriter outc = null;
        BufferedReader inc = null;

        try {
            socket = new Socket("127.0.0.1", 1234); // connect to server
            outc = new PrintWriter(socket.getOutputStream(), true);  // output to server
            inc = new BufferedReader(
                new InputStreamReader(socket.getInputStream())); // input from server
        } catch (UnknownHostException e) {
            System.err.println("Don't know about host");
            System.exit(1);
        } catch (IOException e) {
            System.err.println("Couldn't get I/O for the connection");
            System.exit(1);
        }

        // Read from keyboard
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        String num1, num2;

        System.out.println(inc.readLine()); // print server greeting

        System.out.print("This int-->"); num1 = read.readLine(); outc.println(num1); // send num1
        System.out.print("Times this int-->"); num2 = read.readLine(); outc.println(num2); // send num2

        System.out.println("Equals");
        System.out.println(inc.readLine()); // receive and print result

        // Close all resources
        outc.close(); inc.close(); read.close(); socket.close();
    }
}
```

#### 💻 الكود: `server_1` — تطبيق المخدم

#### ما هذا الكود؟
> ينتظر اتصالاً، يستقبل عددين، يحسب الجداء، يُعيده للزبون.

```java
import java.net.*;
import java.io.*;

public class server_1 {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(1234); // listen on port 1234
        } catch (IOException e) {
            System.err.println("Could not listen on port: 1234.");
            System.exit(1);
        }

        Socket clientSocket = null;
        try {
            clientSocket = serverSocket.accept(); // wait for client connection
        } catch (IOException e) {
            System.err.println("Accept failed.");
            System.exit(1);
        }

        // Set up I/O streams with client
        PrintWriter outs = new PrintWriter(clientSocket.getOutputStream(), true);
        BufferedReader ins = new BufferedReader(
            new InputStreamReader(clientSocket.getInputStream()));

        String int1, int2;
        int num1 = 0, num2 = 0;

        outs.println("server: Connected"); // send greeting

        int1 = ins.readLine(); // receive first number
        int2 = ins.readLine(); // receive second number
        System.out.print(int1 + "*" + int2);

        try {
            num1 = Integer.parseInt(int1); // parse to integer
            num2 = Integer.parseInt(int2);
        } catch (NumberFormatException nfe) {
            System.out.println("Numbers not integers");
            outs.println("Numbers not integers");
        }

        System.out.println("Area=" + num1 * num2);
        outs.println(String.valueOf(num1 * num2)); // send result

        // Close all resources
        outs.close(); ins.close(); clientSocket.close(); serverSocket.close();
    }
}
```

#### 🤔 تفعيل الفهم:
> **سؤال:** لماذا يجب تشغيل المخدم قبل الزبون؟
> **لماذا هذا مهم؟** لأن `Socket("127.0.0.1", 1234)` في الزبون تُرمي استثناءً إن لم يكن هناك من يستمع على المنفذ 1234.

---

## الجزء الثاني: ملخص منظم

---

### جدول التعريفات الأساسية

| المصطلح | التعريف |
|---------|---------|
| `Thread` | وحدة تنفيذ مستقلة داخل البرنامج |
| `Runnable` | واجهة تحتوي `run()` — الطريقة الأولى لإنشاء مسالك |
| `start()` | يُطلب من `JVM` تشغيل `run()` في مسلك جديد |
| `synchronized` | كلمة مفتاحية تضمن دخول مسلك واحد فقط |
| `Lock` | واجهة للتحكم اليدوي في القفل |
| `Condition` | أداة تواصل بين المسالك عبر `await/signal` |
| `ExecutorService` | مجمع مسالك يُدير إنشاءها وتوزيع المهام |
| `BlockingQueue` | قائمة آمنة للمسالك مع انتظار تلقائي |
| `Semaphore` | تحكم في عدد المسالك المتزامنة |
| `ForkJoinPool` | حوض للمهام التكرارية المتوازية |
| `Socket` | مقبس الزبون للاتصال الشبكي |
| `ServerSocket` | مقبس المخدم للاستماع على منفذ |
| `URL` | محدد موقع موحد على الإنترنت |
| `InetAddress` | يمثل عنوان IP على الإنترنت |

---

### جدول مقارنات التزامن

| الأسلوب | المرونة | التعقيد | الاستخدام المثالي |
|---------|---------|---------|-----------------|
| `synchronized` | منخفضة | بسيط | مزامنة بسيطة |
| `ReentrantLock` | عالية | متوسط | مزامنة مع شروط |
| `Semaphore` | متوسطة | متوسط | تحديد سعة التزامن |
| `BlockingQueue` | محددة | بسيط | منتج-مستهلك |
| `synchronized Collections` | متوسطة | بسيط | مجموعات مشتركة |

---

### جدول الأخطاء الشائعة

| الخطأ | السبب | الحل |
|-------|-------|------|
| استدعاء `run()` بدلاً من `start()` | عدم إنشاء مسلك جديد | استخدم `start()` دائماً |
| نسيان `unlock()` | `deadlock` دائم | ضع `unlock()` في `finally` |
| استخدام `if` بدلاً من `while` مع `await()` | `spurious wakeup` | استخدم `while` دائماً |
| عدم مزامنة متغير مشترك | `race condition` | استخدم `synchronized` أو `Lock` |
| نسيان `shutdown()` على `ExecutorService` | البرنامج لا ينتهي | استدعِ `shutdown()` بعد `execute()` |

---

### خطوات وإجراءات المحاضرة

⚙️ **إنشاء مسلك بـ `Runnable`**

```algorithm
1 | تعريف الكلاس | implements Runnable | اجعل الكلاس ينفّذ Runnable
2 | تطبيق run() | @Override | ضع الكود في run()
3 | إنشاء كائن | new MyRunnable() | أنشئ كائن المهمة
4 | تغليف | new Thread(r) | مرّره لمنشئ Thread
5 | تشغيل | t.start() | ابدأ التنفيذ
```

⚙️ **التزامن بـ `ReentrantLock`**

```algorithm
1 | إنشاء القفل | new ReentrantLock() | قفل مشترك بين المسالك
2 | الاستحواذ | lo.lock() | مسلك واحد فقط يدخل
3 | العمل | الكود الحرج | يُنفَّذ آمناً
4 | التحرير | lo.unlock() في finally | أطلق القفل دائماً
```

⚙️ **بناء تطبيق زبون-مخدم**

```algorithm
1 | المخدم | new ServerSocket(port) | افتح منفذ الاستماع
2 | المخدم | accept() | انتظر اتصالاً — يُحجب حتى يصل
3 | الزبون | new Socket(host, port) | اتصل بالمخدم
4 | التواصل | getInputStream/getOutputStream | أنشئ تيارات القراءة والكتابة
5 | الإغلاق | close() | أغلق كل الموارد عند الانتهاء
```

⚙️ **مسألة المنتج-المستهلك بـ `BlockingQueue`**

```algorithm
1 | المنتج | buffer.put(value) | أضف — انتظر تلقائياً إن ممتلئة
2 | المستهلك | buffer.take() | خذ — انتظر تلقائياً إن فارغة
3 | لا حاجة | لـ lock أو Condition | BlockingQueue تتولى كل شيء
```

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

---

### السؤال 1 (متوسط)
Which method should always be called to start a new thread in Java?
أ) `run()`   ب) `start()`   ج) `execute()`   د) `launch()`

**الإجابة الصحيحة: ب** — **التعليل:** `start()` يطلب من `JVM` إنشاء مسلك جديد وتشغيل `run()`. استدعاء `run()` مباشرة يُشغّله في المسلك الحالي فقط.

---

### السؤال 2 (صعب)
A Java application has 100 threads each adding 1 to a shared `balance`. Without synchronization, the final balance is most likely:
أ) Exactly 100   ب) More than 100   ج) Less than 100   د) 0

**الإجابة الصحيحة: ج** — **التعليل:** `race condition` يجعل بعض الإضافات تُلغي بعضها — كلا المسلكين يقرآن نفس القيمة ويكتبان +1 فقط.

---

### السؤال 3 (متوسط)
What is the output if `Thread.sleep(5000)` is called inside `run()`?
أ) Program terminates after 5 seconds
ب) The thread pauses for 5 seconds; other threads continue
ج) All threads pause for 5 seconds
د) A `DeadLockException` is thrown

**الإجابة الصحيحة: ب** — **التعليل:** `sleep` يُنيم **المسلك المُستدعي** فقط، لا يؤثر على بقية المسالك.

---

### السؤال 4 (صعب)
Why must `unlock()` be placed inside a `finally` block?
أ) It runs faster in `finally`
ب) To ensure the lock is released even if an exception is thrown
ج) `finally` blocks execute in a separate thread
د) Java requires it syntactically

**الإجابة الصحيحة: ب** — **التعليل:** إن رُمي استثناء قبل `unlock()` يبقى القفل محجوزاً — يُسبب `deadlock`. `finally` يضمن التنفيذ دائماً.

---

### السؤال 5 (متوسط)
What is the default thread priority in Java?
أ) 1   ب) 10   ج) 0   د) 5

**الإجابة الصحيحة: د** — **التعليل:** `Thread.NORM_PRIORITY = 5`، بنطاق 1 (`MIN`) إلى 10 (`MAX`).

---

### السؤال 6 (صعب)
What is the difference between `Executors.newFixedThreadPool(1)` and `Executors.newCachedThreadPool()` when given 3 tasks?
أ) Both run tasks concurrently
ب) Fixed(1) runs tasks sequentially; cached creates 3 threads
ج) Cached runs tasks sequentially; fixed creates 3 threads
د) They are identical in behavior

**الإجابة الصحيحة: ب** — **التعليل:** المجمع الثابت بـ 1 مسلك يُنفّذ المهام واحدة تلو الأخرى، بينما `cached` يُنشئ مسلكاً لكل مهمة.

---

### السؤال 7 (صعب)
In the Producer-Consumer problem, why is `while` used instead of `if` with `await()`?
أ) `while` is required by Java syntax
ب) To handle spurious wakeups — the condition may not be true when the thread is awakened
ج) `if` doesn't work with `Condition`
د) `while` is faster than `if`

**الإجابة الصحيحة: ب** — **التعليل:** `signalAll()` يُوقظ الجميع، لكن الشرط قد لا يتحقق لكل منهم — `while` يُعيد التحقق.

---

### السؤال 8 (متوسط)
Which class in Java provides a thread pool that reuses threads when available?
أ) `FixedThreadPool`   ب) `CachedThreadPool`   ج) `SingleThreadExecutor`   د) `ScheduledThreadPool`

**الإجابة الصحيحة: ب** — **التعليل:** `newCachedThreadPool()` يُنشئ مسالك جديدة عند الحاجة ويُعيد استخدامها بعد الانتهاء.

---

### السؤال 9 (صعب)
What happens if `Thread.join()` is called on thread4 at iteration `i == 25`?
أ) thread4 is terminated at iteration 25
ب) The calling thread waits at i=25 until thread4 finishes, then continues
ج) thread4 pauses at iteration 25
د) Both threads terminate

**الإجابة الصحيحة: ب** — **التعليل:** `join()` يُحجب المسلك المُستدعي حتى ينتهي `thread4` — الأعداد بعد 25 تُطبع بعد انتهاء `thread4`.

---

### السؤال 10 (متوسط)
What does `ServerSocket.accept()` do?
أ) Sends data to the client
ب) Closes the server socket
ج) Blocks and waits for a client connection, returns a Socket
د) Creates a new thread for each client

**الإجابة الصحيحة: ج** — **التعليل:** `accept()` يُحجب تنفيذ المخدم حتى يصل اتصال من زبون، ثم يُعيد `Socket` للتواصل معه.

---

### السؤال 11 (صعب)
What is the key difference between `RecursiveAction` and `RecursiveTask<V>` in ForkJoin framework?
أ) `RecursiveAction` is faster
ب) `RecursiveTask<V>` returns a value; `RecursiveAction` does not
ج) `RecursiveAction` uses `fork()` but `RecursiveTask` uses `invoke()`
د) They are interchangeable

**الإجابة الصحيحة: ب** — **التعليل:** `RecursiveAction` لمهام بدون نتيجة (مثل الفرز في المكان)، `RecursiveTask<V>` تُعيد قيمة (مثل الجمع).

---

### السؤال 12 (متوسط)
What is the default value returned by `URL.getPort()` when no port is specified?
أ) 0   ب) 80   ج) -1   د) 443

**الإجابة الصحيحة: ج** — **التعليل:** `getPort()` تُعيد -1 إن لم يُحدَّد منفذ صراحةً في عنوان `URL`.

---

### السؤال 13 (صعب)
Which synchronization mechanism should be preferred for the Producer-Consumer problem when simplicity is the priority?
أ) `ReentrantLock` with `Condition`
ب) `synchronized` keyword
ج) `BlockingQueue`
د) `Semaphore`

**الإجابة الصحيحة: ج** — **التعليل:** `BlockingQueue` تتولى كل التزامن داخلياً — `put` و`take` ينتظران تلقائياً دون الحاجة لـ `Lock` أو `Condition`.

---

### السؤال 14 (صعب)
A `Semaphore` is created with `new Semaphore(3)`. If 5 threads call `acquire()` simultaneously, what happens?
أ) All 5 run immediately
ب) 3 run immediately; 2 block until a permit is released
ج) Only 1 runs; 4 block
د) An exception is thrown

**الإجابة الصحيحة: ب** — **التعليل:** السيمافور يسمح لـ 3 مسالك بالدخول معاً، الـ 2 الباقيان ينتظران `release()`.

---

### السؤال 15 (متوسط)
What does `Thread.yield()` do?
أ) Terminates the current thread
ب) Causes the current thread to sleep for 1 millisecond
ج) Pauses the current thread and allows other threads of equal or higher priority to run
د) Increases the thread's priority

**الإجابة الصحيحة: ج** — **التعليل:** `yield()` يتنازل مؤقتاً عن المعالج لمسالك أخرى — لكنه توجيه لا ضمان.

---

### السؤال 16 (صعب)
In `ThreadCooperation`, why does the deposit method call `newDeposit.signalAll()` instead of `newDeposit.signal()`?
أ) `signal()` doesn't exist in Java
ب) `signalAll()` is faster
ج) To ensure all waiting withdraw threads re-check the balance condition
د) `signalAll()` releases the lock

**الإجابة الصحيحة: ج** — **التعليل:** `signal()` يُوقظ مسلكاً واحداً فقط — قد لا يكون هو الذي يستطيع السحب. `signalAll()` يُتيح لكل المنتظرين إعادة الفحص.

---

### السؤال 17 (متوسط)
Which statement is TRUE about thread states?
أ) A thread in `Finished` state can be restarted with `start()`
ب) A `Blocked` thread moves directly to `Running`
ج) A thread transitions from `Running` to `Ready` via `yield()` or timeout
د) `New` threads run immediately when created

**الإجابة الصحيحة: ج** — **التعليل:** `yield()` أو انتهاء شريحة الوقت ينقل المسلك من `Running` إلى `Ready` — لا يموت، ينتظر فحسب.

---

### السؤال 18 (متوسط)
What is the purpose of `executor.shutdown()` after submitting tasks?
أ) Immediately terminates all running threads
ب) Prevents new tasks from being submitted; waits for existing tasks to complete
ج) Releases all locks held by threads in the pool
د) Restarts the executor service

**الإجابة الصحيحة: ب** — **التعليل:** `shutdown()` يُغلق باب القبول فقط — المهام الجارية تكمل. للإيقاف الفوري استخدم `shutdownNow()`.

---

### السؤال 19 (صعب)
What is printed if two threads simultaneously read `balance = 50` and each tries to add 10?
أ) balance = 70   ب) balance = 60   ج) balance = 50   د) balance = 80

**الإجابة الصحيحة: ب** — **التعليل:** كلا المسلكين يقرآن 50، يحسبان 60، يكتبان 60 — يُضيعان أحد الإضافتين.

---

### السؤال 20 (صعب)
In `ParallelMergeSort`, what determines when the base case is used instead of forking?
أ) The number of available CPUs
ب) The array size is less than `THRESHOLD = 500`
ج) The depth of recursion exceeds 10
د) The array is already sorted

**الإجابة الصحيحة: ب** — **التعليل:** عند `list.length < 500` تُستخدم `Arrays.sort()` مباشرة لتجنب تكلفة إنشاء مهام إضافية لمصفوفات صغيرة.

---

### السؤال 21 (متوسط)
Which is the correct way to read a webpage's HTML using Java?
أ) `new File("http://yahoo.com")`
ب) `new URL("http://yahoo.com").openStream()`
ج) `new Socket("yahoo.com").read()`
د) `InetAddress.getByName("yahoo.com")`

**الإجابة الصحيحة: ب** — **التعليل:** `URL.openStream()` يفتح تيار إدخال لقراءة محتوى الصفحة مباشرة.

---

### السؤال 22 (صعب)
A `ReentrantLock(true)` is created. What does the `true` parameter mean?
أ) The lock can be acquired multiple times by the same thread
ب) The longest-waiting thread gets the lock first (fair policy)
ج) The lock is automatically released after 1 second
د) Multiple threads can hold the lock simultaneously

**الإجابة الصحيحة: ب** — **التعليل:** سياسة العدالة `fair=true` تضمن أن أطول منتظر يحصل على القفل أولاً — يمنع `starvation`.

---

### السؤال 23 (متوسط)
What is the relationship between `java.lang.Thread` and `java.lang.Runnable`?
أ) `Runnable` extends `Thread`
ب) `Thread` implements `Runnable`
ج) They are completely independent
د) `Thread` extends `Runnable`

**الإجابة الصحيحة: ب** — **التعليل:** `Thread` ينفّذ `Runnable` — لهذا يمكن تمرير `Thread` لأي مكان يتوقع `Runnable`.

---

### السؤال 24 (صعب)
In `ConsumerProducer` with `CAPACITY = 1`, what happens if the producer writes faster than the consumer reads?
أ) Data is lost silently
ب) The producer's `write()` blocks on `notFull.await()` until the consumer reads
ج) An `ArrayIndexOutOfBoundsException` is thrown
د) The producer creates a new buffer automatically

**الإجابة الصحيحة: ب** — **التعليل:** عندما `queue.size() == CAPACITY` ينتظر المنتج على `notFull.await()` — لا يُكتب إلا عند فراغ مكان.

---

### السؤال 25 (صعب)
Which collection returned by `Collections.synchronizedList(list)` is thread-safe for ALL operations?
أ) All operations including iteration
ب) Only `add()` and `remove()`
ج) Individual operations are synchronized but iteration requires external sync
د) Only read operations

**الإجابة الصحيحة: ج** — **التعليل:** دوال مثل `add` و`get` آمنة، لكن التكرار `iteration` يتطلب مزامنة يدوية (`synchronized(list) { for... }`).

---

## الجزء الرابع: أسئلة تصحيح الكود

---

### سؤال تصحيح 1 (logic)
**الكود الخاطئ:**
```java
public class MyThread implements Runnable {
    public void run() { System.out.println("Running"); }
    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.run(); // WRONG
    }
}
```
**اكتشف الخطأ:** استدعاء `run()` مباشرة لا يُنشئ مسلكاً جديداً.
**التصحيح:**
```java
Thread thread = new Thread(t);
thread.start(); // CORRECT — creates new thread
```
**شرح الحل:** `start()` يُطلب من `JVM` إنشاء مسلك جديد ينفّذ `run()` بشكل مستقل.

---

### سؤال تصحيح 2 (misconception)
**الكود الخاطئ:**
```java
public void deposit(int amount) {
    lo.lock();
    try {
        balance += amount;
    } catch (Exception ex) {}
    lo.unlock(); // WRONG position
}
```
**اكتشف الخطأ:** `unlock()` خارج `finally` — لن يُنفَّذ عند الاستثناء.
**التصحيح:**
```java
public void deposit(int amount) {
    lo.lock();
    try {
        balance += amount;
    } finally {
        lo.unlock(); // CORRECT — always executed
    }
}
```
**شرح الحل:** `finally` يضمن تنفيذ `unlock()` حتى لو رُمي استثناء.

---

### سؤال تصحيح 3 (logic — if vs while)
**الكود الخاطئ:**
```java
public void withdraw(int amount) {
    lock.lock();
    try {
        if (balance < amount) { // WRONG: should be while
            newDeposit.await();
        }
        balance -= amount;
    } finally { lock.unlock(); }
}
```
**اكتشف الخطأ:** `if` بدلاً من `while` — قد يستيقظ المسلك بعد `signalAll` والرصيد لا يزال غير كافٍ.
**التصحيح:**
```java
while (balance < amount) { // CORRECT: re-check condition after wakeup
    newDeposit.await();
}
```
**شرح الحل:** `signalAll` يُوقظ الجميع لكن الشرط قد لا يتحقق — `while` يُعيد الفحص.

---

### سؤال تصحيح 4 (dead_code)
**الكود الخاطئ:**
```java
thread1.start();
thread2.start();
thread3.start();
printA.run(); // DEAD CODE — runs sequentially AFTER threads started
```
**اكتشف الخطأ:** `run()` بعد `start()` لا معنى له في سياق التزامن.
**التصحيح:**
```java
// Remove printA.run() — or use it BEFORE start() for sequential demo
thread1.start();
thread2.start();
thread3.start();
```
**شرح الحل:** `run()` المباشر لا يُنشئ مسلكاً — إن أردت التسلسل افعله قبل `start()`.

---

### سؤال تصحيح 5 (logic)
**الكود الخاطئ:**
```java
public class SimpleThread extends Thread {
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(getName());
            sleep(1000); // COMPILE ERROR — sleep throws checked exception
        }
    }
}
```
**اكتشف الخطأ:** `sleep()` ترمي `InterruptedException` — يجب معالجتها.
**التصحيح:**
```java
public void run() {
    for (int i = 0; i < 10; i++) {
        System.out.println(getName());
        try {
            sleep(1000); // CORRECT — handle checked exception
        } catch (InterruptedException e) {}
    }
}
```
**شرح الحل:** `sleep` دالة مُعلنة برمي `InterruptedException` — يجب `try-catch` أو `throws`.

---

### سؤال تصحيح 6 (misconception)
**الكود الخاطئ:**
```java
ExecutorService executor = Executors.newFixedThreadPool(3);
executor.execute(new Task1());
executor.execute(new Task2());
// Missing shutdown — program never ends!
```
**اكتشف الخطأ:** عدم استدعاء `shutdown()` — المجمع يبقى حياً وينتظر مهام جديدة إلى الأبد.
**التصحيح:**
```java
executor.execute(new Task1());
executor.execute(new Task2());
executor.shutdown(); // CORRECT — allows tasks to complete then terminates
```
**شرح الحل:** `shutdown()` يُخبر المجمع أنه لن تأتي مهام جديدة — ينهي البرنامج بعد إتمام الجاريات.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

---

### تمرين 1 — إكمال الفراغات (`fill_gaps`)
**المعطيات:** كود منشئ مسلك
```java
public class MyTask _______ Runnable {
    public _______ run() {
        System.out.println("Task running");
    }
}
Runnable r = new MyTask();
Thread t = new _______(r);
t._______();
```
**المطلوب:** أكمل الفراغات.

**نموذج الحل:**
```java
public class MyTask implements Runnable {
    public void run() {
        System.out.println("Task running");
    }
}
Runnable r = new MyTask();
Thread t = new Thread(r);
t.start();
```

---

### تمرين 2 — تصحيح الكود (`code_fix`)
**المعطيات:**
```java
private static class Account {
    private int balance = 0;
    public void deposit(int amount) {
        balance += amount; // Problem?
    }
}
```
**المطلوب:** لماذا هذا الكود غير آمن؟ أضف المزامنة المناسبة.

**نموذج الحل:**
```java
private static class Account {
    private int balance = 0;
    public synchronized void deposit(int amount) { // add synchronized
        balance += amount;
    }
}
// OR using Lock:
// lock.lock(); try { balance += amount; } finally { lock.unlock(); }
```

---

### تمرين 3 — سيناريو (`scenario`)
**المعطيات:** عندك قائمة `ArrayList` مشتركة بين 5 مسالك للقراءة والكتابة.

**المطلوب:**
1. ما المشكلة المحتملة؟
2. كيف تُحلّها باستخدام `Collections`؟

**نموذج الحل:**
1. `ArrayList` غير آمنة مع المسالك — `ConcurrentModificationException` أو بيانات فاسدة.
2. ```java
   List<String> safeList = Collections.synchronizedList(new ArrayList<>());
   // For iteration, still need external sync:
   synchronized(safeList) { for (String s : safeList) { ... } }
   ```

---

### تمرين 4 — إكمال الفراغات (`fill_gaps`)
**المعطيات:**
```java
ExecutorService executor = Executors._______(2); // fixed pool of 2
executor._______(new PrintChar('a', 100));
executor._______(new PrintChar('b', 100));
executor._______(); // no new tasks
```
**نموذج الحل:**
```java
ExecutorService executor = Executors.newFixedThreadPool(2);
executor.execute(new PrintChar('a', 100));
executor.execute(new PrintChar('b', 100));
executor.shutdown();
```

---

### تمرين 5 — سيناريو تحليل (`scenario`)
**المعطيات:** مبرمج كتب كود `withdraw` بـ `if` بدلاً من `while`:
```java
if (balance < amount) { newDeposit.await(); }
balance -= amount;
```
أجرى الاختبار 1000 مرة، 999 منها ناجحة.

**المطلوب:** لماذا نجح الكود أحياناً؟ متى سيفشل؟

**نموذج الحل:**
- نجح لأن `spurious wakeup` نادر في بيئات الاختبار.
- يفشل إذا: نوقظ المسلك بـ `signalAll` بينما مسلك آخر سحب الرصيد قبله — سنسحب بالسالب.
- الحل: دائماً `while` للتحقق المتكرر.

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

---

### تمرين 1: تحليل مسألة المنتج-المستهلك

**السيناريو:** نظام صندوق بريد — المُرسِل يضع رسائل، المستلم يأخذها. السعة: 3 رسائل فقط.

**المطلوب:**
1. حدد المتغيرات والشروط اللازمة.
2. ما الحالة التي يُحجب فيها المُرسِل؟ وما الحالة التي يُحجب فيها المستلم؟

**نموذج الحل:**
1. متغيرات: `queue` (LinkedList)، `CAPACITY = 3`، `Lock lock`، `Condition notFull`، `Condition notEmpty`.
2. المُرسِل يُحجب عند `queue.size() == 3` → ينتظر `notFull`. المستلم يُحجب عند `queue.isEmpty()` → ينتظر `notEmpty`.

---

### تمرين 2: مقارنة أساليب التزامن

**السيناريو:** لديك تطبيق مصرفي به 1000 مسلك يتعاملون مع حساب واحد.

**المطلوب:** قارن بين ثلاثة أساليب وحدد الأنسب.

| المعيار | `synchronized` | `ReentrantLock` | `Semaphore(1)` |
|---------|---------------|-----------------|----------------|
| البساطة | ✅ أبسط | متوسط | متوسط |
| التحكم الدقيق | ❌ محدود | ✅ مرن | محدود |
| دعم `Condition` | محدود (`wait/notify`) | ✅ كامل | ❌ لا |
| الأداء | جيد | جيد | جيد |
| الأنسب لهذا السيناريو | ✅ للعمليات البسيطة | ✅ مع شروط | للسعة المحددة |

---

## الجزء الرابع: تمارين تتبع التنفيذ

---

### تمرين تتبع 1: `PrintChar` و `PrintNum`

**المدخل:**
```java
Thread thread1 = new Thread(new PrintChar('a', 3));
Thread thread2 = new Thread(new PrintNum(3));
thread1.start();
thread2.start();
```

**تتبّع خطوة بخطوة (أكمل الجدول — ترتيب محتمل):**
| الخطوة | المسلك النشط | الإجراء | المخرج الجزئي |
|--------|------------|---------|--------------|
| 1 | thread1 | طباعة 'a' | ؟ |
| 2 | thread2 | طباعة 1 | ؟ |
| 3 | thread1 | طباعة 'a' | ؟ |
| 4 | thread2 | طباعة 2 | ؟ |
| 5 | thread1 | طباعة 'a' | ؟ |
| 6 | thread2 | طباعة 3 | ؟ |

**نموذج الحل (ترتيب محتمل):**
| الخطوة | المسلك النشط | الإجراء | المخرج الجزئي |
|--------|------------|---------|--------------|
| 1 | thread1 | طباعة 'a' | `a` |
| 2 | thread2 | طباعة 1 | `a 1` |
| 3 | thread1 | طباعة 'a' | `a 1a` |
| 4 | thread2 | طباعة 2 | `a 1a 2` |
| 5 | thread1 | طباعة 'a' | `a 1a 2a` |
| 6 | thread2 | طباعة 3 | `a 1a 2a 3` |

**النتيجة:** الترتيب غير محدد — `a 1a 2a 3` أو `aaa 1 2 3` أو أي تركيبة.

---

### تمرين تتبع 2: حالات المسلك

**المدخل:**
```java
Thread t = new Thread(new PrintChar('x', 2));
// State after each operation?
```

**أكمل الجدول:**
| العملية | حالة المسلك |
|---------|------------|
| بعد `new Thread(...)` | ؟ |
| بعد `t.start()` | ؟ |
| أثناء تنفيذ `run()` | ؟ |
| أثناء `Thread.sleep(1000)` | ؟ |
| بعد انتهاء `run()` | ؟ |

**نموذج الحل:**
| العملية | حالة المسلك |
|---------|------------|
| بعد `new Thread(...)` | `New` |
| بعد `t.start()` | `Ready` |
| أثناء تنفيذ `run()` | `Running` |
| أثناء `Thread.sleep(1000)` | `Blocked` |
| بعد انتهاء `run()` | `Finished` |

---

### تمرين تتبع 3: رصيد الحساب مع `race condition`

**المدخل:** مسلكان يقرآن `balance = 0` في نفس الوقت ويضيفان 5.

**أكمل جدول التنفيذ:**
| الخطوة | Thread A | Thread B | balance |
|--------|---------|---------|---------|
| 1 | `newBalance = 0 + 5 = 5` | — | ؟ |
| 2 | sleep(5ms) | `newBalance = 0 + 5 = 5` | ؟ |
| 3 | — | sleep(5ms) | ؟ |
| 4 | `balance = 5` | — | ؟ |
| 5 | — | `balance = 5` | ؟ |

**نموذج الحل:**
| الخطوة | Thread A | Thread B | balance |
|--------|---------|---------|---------|
| 1 | `newBalance = 5` | — | 0 |
| 2 | sleep(5ms) | `newBalance = 5` | 0 |
| 3 | — | sleep(5ms) | 0 |
| 4 | `balance = 5` | — | 5 |
| 5 | — | `balance = 5` | 5 (**خطأ! يجب 10**) |

**النتيجة:** `balance = 5` بدلاً من `10` — `race condition`.

---

### تمرين تتبع 4: `BlockingQueue` سعة 2

**المدخل:** منتج يُضيف 3 عناصر، مستهلك يقرأ واحداً.

**أكمل الجدول:**
| العملية | queue.size() | الفعل |
|--------|------------|------|
| put(1) | ؟ | ؟ |
| put(2) | ؟ | ؟ |
| put(3) | ؟ | ؟ — سعة ممتلئة |
| take() | ؟ | ؟ |
| put(3) مرة ثانية | ؟ | ؟ |

**نموذج الحل:**
| العملية | queue.size() | الفعل |
|--------|------------|------|
| put(1) | 1 | إضافة ناجحة |
| put(2) | 2 | إضافة ناجحة — ممتلئة الآن |
| put(3) | 2 | **يُحجب** — ينتظر |
| take() | 1 | يقرأ ويُزيل 1 — يُطلق المنتج |
| put(3) | 2 | إضافة ناجحة |

---

### تمرين تتبع 5: `ForkJoinPool` — أعظم قيمة

**المدخل:** مصفوفة `[9, 3, 7, 1]`، `THRESHOLD = 2`.

**أكمل جدول التقسيم:**
| المهمة | النطاق | الفعل | النتيجة |
|--------|--------|-------|---------|
| MaxTask(0,4) | [9,3,7,1] | ؟ (fork أم compute) | ؟ |
| MaxTask(0,2) | [9,3] | ؟ | ؟ |
| MaxTask(2,4) | [7,1] | ؟ | ؟ |
| نهاية | — | max(9,7) | ؟ |

**نموذج الحل:**
| المهمة | النطاق | الفعل | النتيجة |
|--------|--------|-------|---------|
| MaxTask(0,4) | [9,3,7,1] | size=4 ≥ 2 → fork | — |
| MaxTask(0,2) | [9,3] | size=2 = threshold → compute | 9 |
| MaxTask(2,4) | [7,1] | size=2 = threshold → compute | 7 |
| join | — | max(9, 7) | **9** |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

---

**Q1:** What is a `Thread` in Java?
A: وحدة تنفيذ مستقلة داخل البرنامج — جزء برمجي يُنفَّذ بشكل مستقل عن باقي التطبيق.

**Q2:** What are the two ways to create a thread in Java?
A: 1) تطبيق الواجهة `Runnable` وتغليفها في `Thread`. 2) الوراثة من `Thread` مباشرة وتجاوز `run()`.

**Q3:** What is the difference between `start()` and `run()`?
A: `start()` يُنشئ مسلكاً جديداً وتُستدعى `run()` من `JVM`. `run()` مباشرة يُنفّذها في نفس المسلك الحالي.

**Q4:** What is `Thread.sleep()`?
A: دالة ساكنة تُنيم المسلك المُستدعي لعدد من الميلي ثانية المُحدَّدة — ترمي `InterruptedException`.

**Q5:** What is `Thread.yield()`?
A: يتنازل المسلك الحالي مؤقتاً ليعمل مسلك آخر له نفس الأولوية أو أعلى — توجيه لا ضمان.

**Q6:** What does `Thread.join()` do?
A: يُحجب المسلك المُستدعي حتى ينتهي المسلك المستهدف من التنفيذ.

**Q7:** What is `race condition`?
A: عندما يصل مسلكان لمتغير مشترك في نفس الوقت وينتج عن ذلك قيمة خاطئة.

**Q8:** What does `synchronized` keyword do?
A: يضمن أن مسلكاً واحداً فقط يُنفّذ الدالة أو الكتلة في أي لحظة.

**Q9:** What is a `ReentrantLock`?
A: قفل صريح يوفر تحكماً أدق من `synchronized` — يُستخدم مع `Condition` للتواصل بين المسالك.

**Q10:** What is the difference between `await()` and `sleep()`?
A: `await()` يُحرر القفل وينتظر إشارة. `sleep()` لا يُحرر القفل وينتظر وقتاً محدداً.

**Q11:** What is `ExecutorService`?
A: واجهة لإدارة مجمع مسالك — تُقدّم طرقاً لتشغيل المهام وإيقاف المجمع.

**Q12:** When should `newFixedThreadPool(n)` be used?
A: عند الحاجة لتحديد عدد المسالك المتزامنة — مناسب للتطبيقات التي تعرف حمل العمل مسبقاً.

**Q13:** What is `BlockingQueue`?
A: قائمة آمنة للمسالك — `put()` تنتظر إن ممتلئة، `take()` تنتظر إن فارغة — بدون `Lock` صريح.

**Q14:** What is `Semaphore`?
A: آلية تحكم بعدد المسالك المتزامنة — `acquire()` تأخذ تصريحاً، `release()` تُعيده.

**Q15:** What is `ForkJoinPool`?
A: حوض مسالك متخصص للمهام التكرارية التي تُقسَّم وتُحل بالتوازي ثم تُدمج نتائجها.

**Q16:** What is the difference between `RecursiveAction` and `RecursiveTask`?
A: `RecursiveAction` لمهام بدون إعادة قيمة. `RecursiveTask<V>` لمهام تُعيد قيمة.

**Q17:** What is a `URL` in Java?
A: كائن يمثل عنوان موحد لمورد على الإنترنت — يتكون من بروتوكول + مضيف + مسار.

**Q18:** What is the difference between `Socket` and `ServerSocket`?
A: `ServerSocket` يستمع على منفذ وينتظر اتصالات. `Socket` يمثل نهاية اتصال — من جانب الزبون أو بعد `accept()` من المخدم.

**Q19:** What does `URL.openStream()` return?
A: `InputStream` يُتيح قراءة محتوى المورد المُشار إليه بعنوان `URL`.

**Q20:** What does `InetAddress.getByName(host)` do?
A: يستعلم `DNS` ويُعيد عنوان `IP` المقابل لاسم المضيف المُعطى.

**Q21:** Why must `unlock()` be in a `finally` block?
A: لضمان تحرير القفل دائماً — حتى إن رُمي استثناء، وإلا يُسبّب `deadlock`.

**Q22:** What is `time sharing` in the context of threads?
A: مشاركة وقت المعالج بين مسالك متعددة بالتناوب السريع — يُعطي وهم التنفيذ المتزامن على معالج واحد.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

---

### الكود الكامل: نظام الحساب المصرفي مع التعاون بين المسالك

```java
import java.util.concurrent.*;
import java.util.concurrent.locks.*;

public class ThreadCooperation {
    private static Account account = new Account();

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        System.out.println("Thread 1\t\tThread 2\t\tBalance");
        executor.execute(new DepositTask());
        executor.execute(new WithdrawTask());
        executor.shutdown();
    }

    static class DepositTask implements Runnable {
        @Override
        public void run() {
            try {
                while (true) {
                    account.deposit((int)(Math.random() * 10) + 1);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }

    static class WithdrawTask implements Runnable {
        @Override
        public void run() {
            while (true) {
                account.withdraw((int)(Math.random() * 10) + 1);
            }
        }
    }

    private static class Account {
        private static Lock lock = new ReentrantLock();
        private static Condition newDeposit = lock.newCondition();
        private int balance = 0;

        public int getBalance() { return balance; }

        public void deposit(int amount) {
            lock.lock();
            try {
                balance += amount;
                System.out.println("Deposit " + amount + "\t\t\t\t\t" + getBalance());
                newDeposit.signalAll();
            } finally { lock.unlock(); }
        }

        public void withdraw(int amount) {
            lock.lock();
            try {
                while (balance < amount) {
                    System.out.println("\t\t\t Wait for a deposit");
                    newDeposit.await();
                }
                balance -= amount;
                System.out.println("\t\t\tWithdraw " + amount + "\t\t" + getBalance());
            } catch (InterruptedException ex) { ex.printStackTrace(); }
            finally { lock.unlock(); }
        }
    }
}
```

---

### الكود الكامل: المنتج والمستهلك باستخدام `BlockingQueue`

```java
import java.util.concurrent.*;

public class ConsumerProducerUsingBlockingQueue {
    private static ArrayBlockingQueue<Integer> buffer = new ArrayBlockingQueue<>(2);

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.execute(new ProducerTask());
        executor.execute(new ConsumerTask());
        executor.shutdown();
    }

    private static class ProducerTask implements Runnable {
        public void run() {
            try {
                int i = 1;
                while (true) {
                    System.out.println("Producer writes " + i);
                    buffer.put(i++);
                    Thread.sleep((int)(Math.random() * 100));
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }

    private static class ConsumerTask implements Runnable {
        public void run() {
            try {
                while (true) {
                    System.out.println("\t\t\tConsumer reads");
                    buffer.take();
                    Thread.sleep((int)(Math.random() * 10000));
                }
            } catch (InterruptedException ex) { ex.printStackTrace(); }
        }
    }
}
```

---

### الكود الكامل: تطبيق الزبون والمخدم (ضرب عددين)

```java
// === SERVER ===
import java.net.*;
import java.io.*;

public class server_1 {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(1234);
        System.out.println("Server waiting...");
        Socket clientSocket = serverSocket.accept();

        PrintWriter outs = new PrintWriter(clientSocket.getOutputStream(), true);
        BufferedReader ins = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

        outs.println("server: Connected");
        String int1 = ins.readLine();
        String int2 = ins.readLine();

        int num1 = Integer.parseInt(int1);
        int num2 = Integer.parseInt(int2);
        System.out.println(int1 + "*" + int2 + "=" + num1 * num2);
        outs.println(String.valueOf(num1 * num2));

        outs.close(); ins.close(); clientSocket.close(); serverSocket.close();
    }
}

// === CLIENT ===
public class client_1 {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("127.0.0.1", 1234);
        PrintWriter outc = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader inc = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));

        System.out.println(inc.readLine());
        System.out.print("This int--> "); String num1 = read.readLine(); outc.println(num1);
        System.out.print("Times this int--> "); String num2 = read.readLine(); outc.println(num2);
        System.out.println("Equals: " + inc.readLine());

        outc.close(); inc.close(); read.close(); socket.close();
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

---

### سؤال 1: What is a thread and how does it differ from a process?
**نموذج الإجابة:**
1. **التعريف:** المسلك `Thread` وحدة تنفيذ مستقلة ضمن برنامج — يشارك نفس الذاكرة مع المسالك الأخرى.
2. **المكونات:** `run()` method + thread state + stack خاص به.
3. **مثال:** برنامج واحد يطبع أحرفاً وأرقاماً في وقت واحد.
4. **متى نستخدم:** عند الحاجة لتنفيذ مهام متوازية ضمن نفس التطبيق.

---

### سؤال 2: What is the `race condition` problem and how is it solved?
**نموذج الإجابة:**
1. **التعريف:** عندما يصل مسلكان لمتغير مشترك في نفس الوقت ويُفسدان قيمته.
2. **المكونات:** قراءة متزامنة + تعديل متزامن + كتابة متزامنة.
3. **مثال:** مسلكان يقرآن `balance = 0` ويكتبان 1 — النتيجة 1 بدلاً من 2.
4. **الحل:** `synchronized` أو `ReentrantLock`.

---

### سؤال 3: Explain the Producer-Consumer problem and its solution.
**نموذج الإجابة:**
1. **التعريف:** منتج يكتب لمخزن محدود، مستهلك يقرأ منه — يجب تنسيقهما.
2. **الشروط:** الكتابة تنتظر إن ممتلئة `notFull.await()`، القراءة تنتظر إن فارغة `notEmpty.await()`.
3. **الإشارات:** بعد الكتابة → `notEmpty.signal()`، بعد القراءة → `notFull.signal()`.
4. **متى نستخدم:** كل نظام يُنتج بيانات بمعدل مختلف عن معدل استهلاكها.

---

### سؤال 4: What is the difference between `Runnable` and extending `Thread`?
**نموذج الإجابة:**
1. **`Runnable`:** تطبيق واجهة — يُبقي الوراثة متاحة لكلاس آخر.
2. **`extends Thread`:** وراثة مباشرة — أبسط كوداً لكن يحجز الوراثة الوحيدة.
3. **متى نستخدم:** `Runnable` مُفضَّل دائماً بسبب مرونته.

---

### سؤال 5: What are `await()`, `signal()`, and `signalAll()`?
**نموذج الإجابة:**
1. **التعريف:** دوال `Condition` للتواصل بين المسالك.
2. **`await()`:** يُحرر القفل وينتظر إشارة — مثل `wait()` في `synchronized`.
3. **`signal()`:** يُوقظ مسلكاً واحداً منتظراً.
4. **`signalAll()`:** يُوقظ كل المنتظرين — أكثر أماناً في أغلب الحالات.

---

### سؤال 6: What is a `Thread Pool` and why is it used?
**نموذج الإجابة:**
1. **التعريف:** مجموعة مسالك مُعدَّة مسبقاً تُعاد للاستخدام.
2. **لماذا:** إنشاء وإتلاف مسالك مُكلِف — المجمع يوفر مسالك جاهزة.
3. **أنواع:** `FixedThreadPool(n)` عدد ثابت، `CachedThreadPool` مرن.
4. **متى نستخدم:** عند تنفيذ مهام كثيرة ومتكررة.

---

### سؤال 7: What is the Fork/Join framework and when is it used?
**نموذج الإجابة:**
1. **التعريف:** إطار عمل لتقسيم المهكام الكبيرة إلى مهام فرعية وتنفيذها بالتوازي.
2. **المكونات:** `ForkJoinPool` + `RecursiveAction`/`RecursiveTask`.
3. **مثال:** فرز الدمج المتوازي على 7 مليون عنصر.
4. **متى نستخدم:** المهام القابلة للتقسيم الثنائي التكراري.

---

### سؤال 8: What is a `Socket` and a `ServerSocket`?
**نموذج الإجابة:**
1. **`Socket`:** مقبس الزبون — يُنشئ اتصالاً ويُعيد تيارات القراءة والكتابة.
2. **`ServerSocket`:** مقبس المخدم — يستمع على منفذ وينتظر اتصالات عبر `accept()`.
3. **مثال:** `new Socket("127.0.0.1", 1234)` يتصل بمخدم محلي.
4. **متى نستخدم:** تطبيقات زبون-مخدم عبر `TCP`.

---

### سؤال 9: What is the `URL` class and its main methods?
**نموذج الإجابة:**
1. **التعريف:** يمثل عنواناً موحداً `Uniform Resource Locator` لمورد على الإنترنت.
2. **الدوال:** `getProtocol()`, `getHost()`, `getPort()`, `getFile()`, `getRef()`.
3. **القراءة:** `openStream()` أو `openConnection().getInputStream()`.
4. **متى نستخدم:** الوصول لبيانات على الإنترنت عبر عنوان ويب.

---

### سؤال 10: What is `Semaphore` and how does it differ from `synchronized`?
**نموذج الإجابة:**
1. **`Semaphore(n)`:** يسمح لـ `n` مسالك بالدخول معاً — `acquire()` تأخذ تصريحاً، `release()` تُعيده.
2. **`synchronized`:** يسمح لمسلك واحد فقط.
3. **الفرق:** `Semaphore` أكثر مرونة — يُحدّد السعة، بينما `synchronized` = `Semaphore(1)`.
4. **متى نستخدم:** تحديد عدد المستخدمين المتزامنين لمورد.

---

### سؤال 11: What are synchronized collections and why are they needed?
**نموذج الإجابة:**
1. **المشكلة:** `ArrayList`, `HashMap` وغيرها غير آمنة مع المسالك.
2. **الحل:** `Collections.synchronizedList(list)` تُغلّف المجموعة بمزامنة تلقائية.
3. **تحذير:** التكرار `iteration` يتطلب مزامنة يدوية إضافية.
4. **متى نستخدم:** مشاركة مجموعة بين مسالك متعددة.

---

### سؤال 12: Explain thread states in Java.
**نموذج الإجابة:**
1. **`New`:** تم إنشاء `Thread` — `start()` لم تُستدعَ.
2. **`Ready`:** في انتظار المعالج.
3. **`Running`:** يُنفَّذ حالياً.
4. **`Blocked`:** ينتظر `sleep/join/wait`.
5. **`Finished`:** انتهت `run()` — لا يمكن إعادة تشغيله.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أعرف الفرق بين تطبيق `Runnable` والوراثة من `Thread`
- [ ] أعرف لماذا نستخدم `start()` لا `run()` مباشرة
- [ ] أفهم حالات المسلك الخمس وكيف ينتقل بينها
- [ ] أعرف ما هو `race condition` وكيف يحدث
- [ ] أستطيع كتابة كود `synchronized` صحيح
- [ ] أفهم كيف يعمل `ReentrantLock` مع `finally`
- [ ] أفهم فرق `await()` عن `sleep()` وضرورة `while` مع `await()`
- [ ] أعرف الفرق بين `signal()` و `signalAll()`
- [ ] أستطيع شرح مسألة المنتج-المستهلك بـ `Condition` وبـ `BlockingQueue`
- [ ] أعرف متى أستخدم `FixedThreadPool` مقابل `CachedThreadPool`
- [ ] أفهم `Semaphore` وآلية `acquire/release`
- [ ] أفهم الفرق بين `RecursiveAction` و `RecursiveTask`
- [ ] أستطيع بناء `URL` وقراءة محتواه
- [ ] أعرف دوال `InetAddress` الأساسية
- [ ] أفهم الفرق بين `Socket` و `ServerSocket`
- [ ] أستطيع كتابة تطبيق زبون-مخدم بسيط
- [ ] أعرف لماذا نستخدم المجموعات المتزامنة `Synchronized Collections`
- [ ] أفهم بروتوكولي `TCP` و `UDP` ومتى يُستخدم كل منهما

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

---

### 🔑 خريطة العلاقات بين الموضوعات

| الموضوع | يرتبط مع | كيف؟ |
|---------|----------|------|
| `Thread/Runnable` | `ExecutorService` | `executor.execute(runnable)` |
| `Lock` | `Condition` | `lock.newCondition()` |
| `Semaphore` | `synchronized` | كلاهما يمنع التزامن — سيمافور أكثر مرونة |
| `ForkJoinPool` | `RecursiveTask/Action` | `pool.invoke(task)` |
| `Socket` | `ServerSocket` | `serverSocket.accept()` يُعيد `Socket` |
| `URL` | `InetAddress` | كلاهما في `java.net` |

---

### 🔑 أهم النقاط الذهبية

| الموضوع | النقطة الذهبية |
|---------|--------------|
| `Thread` | دائماً `start()` لا `run()` |
| `Lock` | دائماً `unlock()` في `finally` |
| `Condition` | دائماً `while` لا `if` مع `await()` |
| `ExecutorService` | لا تنسَ `shutdown()` |
| `Semaphore` | `acquire()` → عمل → `release()` في `finally` |
| `BlockingQueue` | أبسط من `Condition` للمنتج-المستهلك |
| `ServerSocket` | شغّل المخدم قبل الزبون |

---

### 🔑 مرجع سريع

| المصطلح | المعنى | يُستخدم في |
|---------|--------|-----------|
| `synchronized` | مزامنة بسيطة | دوال وكتل الكود |
| `ReentrantLock` | قفل صريح مرن | مع `Condition` |
| `await()` | انتظر إشارة + حرر القفل | `Condition` |
| `signal()` | أيقظ مسلكاً واحداً | `Condition` |
| `signalAll()` | أيقظ كل المنتظرين | `Condition` |
| `put()/take()` | أضف/خذ مع انتظار | `BlockingQueue` |
| `fork()/join()` | شغّل/انتظر مهمة فرعية | `ForkJoinPool` |
| `accept()` | انتظر اتصال زبون | `ServerSocket` |
| `openStream()` | اقرأ محتوى `URL` | `URL` |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
|---|---------|
| 1 | استدعِ `start()` دائماً — لا `run()` مباشرة |
| 2 | ضع `unlock()` في `finally` دائماً |
| 3 | استخدم `while` لا `if` مع `await()` |
| 4 | استدعِ `shutdown()` بعد `execute()` |
| 5 | شغّل المخدم قبل الزبون |
| 6 | `BlockingQueue` تغني عن `Lock/Condition` في المنتج-المستهلك |
| 7 | مسلك `Finished` لا يمكن إعادة تشغيله |
| 8 | أولوية المسلك توجيه لا ضمان |

---

<!-- VALIDATION
schema: 1.0
parts: detailed_explanation, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, full_code, theory, self_check, cheat_sheet
mcq_count: 25
debug_count: 6
qa_count: 22
theory_count: 12
trace_count: 5
lecture: 7
topic: Threads and Networking
language: Java
-->

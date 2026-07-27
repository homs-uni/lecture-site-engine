## نمط 2024-2025

**المصدر:** [نمط 2024-2025]
### السؤال 1–6 (مجموعة أسئلة على نص/كود مشترك)

```java
public class GenericStack<E> {
    private java.util.ArrayList<E> list = new java.util.ArrayList<E>();

    public int getSize() {
        return list.size();
    }

    public E peek() {
        return list.get(getSize() - 1);
    }

    public void push(---- 1 ----) {
        list.add(o);
    }

    public E pop() {
        E o = list.get(getSize() - 1);
        list.remove(getSize() - 1);
        return ---- 2 ----;
    }

    public ---- 3 ---- isEmpty() {
        return list.isEmpty();
    }

    ---- 4 ----
    public String toString() {
        return "stack: " + list.toString();
    }
}

class GenericStackTest {
    public static void main(String[] args) {
        GenericStack<String> stack1 = ---- 5 ---- GenericStack<>() ;
        stack1.push("London");
        stack1.push("Paris");
        stack1.push("Berlin");
        GenericStack<Integer> stack2 = ---- 6 ---- GenericStack<>() ;
        stack2.push(1);
        stack2.push(2);
        stack2.push(3);
    }
}
```

**السؤال 1:** `push(---- 1 ----)`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة: ج**
**التعليل:** المعامل هنا يجب أن يكون من نوع `E` (نوع عام)، بـ اسم متغير `o`.
الصيغة الصحيحة: `public void push(E o)` لأن الـ push بتأخذ عنصر من نفس نوع الـ Generic وتضيفه للـ list. [Collections & Generics]

**السؤال 2:** `return ---- 2 ----;`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة: أ**
**التعليل:** الدالة `pop()` بتحذف وترجع آخر عنصر (من الأعلى). المتغير `o` بتم تخزين فيه القيمة المحذوفة، فـ نرجعها مباشرة.
`return o;` هو الصحيح لأنه الـ element المسترجع. [Collections]

**السؤال 3:** `public ---- 3 ---- isEmpty()`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة: ب**
**التعليل:** الدالة `isEmpty()` بترجع boolean (true/false) للتحقق إذا الـ stack فاضي.
الصيغة: `public boolean isEmpty()` لأن `list.isEmpty()` بترجع boolean. [Collections]

**السؤال 4:** `---- 4 ----` (before `toString()` method)
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة: هـ**
**التعليل:** قبل دالة `toString()` لازم يكون هناك `@Override` annotation للإشارة إننا بنغير (override) implementation الدالة من الـ parent class. [OOP - Inheritance]

**السؤال 5:** `GenericStack<String> stack1 = ---- 5 ---- GenericStack<>() ;`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة: د**
**التعليل:** بـ Java، عند إنشاء instance من generic class، نستخدم `new` keyword.
`GenericStack<String> stack1 = new GenericStack<>();` — الـ `<>` (diamond operator) بتسمح للـ compiler أنه يستنتج النوع من الـ variable declaration. [Generics]

**السؤال 6:** `GenericStack<Integer> stack2 = ---- 6 ---- GenericStack<>() ;`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة: د**
**التعليل:** نفس المنطق: `new` keyword لإنشاء instance جديد من الـ generic class بنوع مختلف (Integer بدل String). [Generics]

---

**المصدر:** [نمط 2024-2025]
### السؤال 7–11 (مجموعة أسئلة على نص/كود مشترك)

```java
class Test1 {
    public static void main(String[] args) {
        ArrayList L = new ArrayList<String>();
        L.add("L"); L.add("D");
        L.add("P"); L.add("M");
        L.add("S"); L.add("T");
```

**السؤال 7:** `System.out.println(L.contains("M"));`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: ج**
**التعليل:** الدالة `contains()` بترجع boolean.
ـ `L` تحتوي على: ["L", "D", "P", "M", "S", "T"]
- "M" موجود في الـ list
- لذلك النتيجة `true` [Collections - ArrayList]

**السؤال 8:** `System.out.println(L.isEmpty());`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: د**
**التعليل:** الدالة `isEmpty()` بتفحص إذا الـ list فاضي.
ـ الـ list فيه 6 عناصر، فالنتيجة `false`. [Collections - ArrayList]

**السؤال 9:** *(Code execution before 9: `L.add(2, "X"); L.remove("M"); L.remove(1);`)* `System.out.println(L.indexOf("D"));`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: أ**
**التعليل:** تتبع العمليات خطوة بخطوة:
1. ابتدائياً: ["L", "D", "P", "M", "S", "T"]
2. `add(2, "X")`: ["L", "D", "X", "P", "M", "S", "T"]
3. `remove("M")`: ["L", "D", "X", "P", "S", "T"]
4. `remove(1)`: تحذف index 1 ("D"): ["L", "X", "P", "S", "T"]

ـ "D" الآن موجود في index -1 (مش موجود)، لذلك `indexOf("D")` ترجع -1. [Collections - ArrayList]

**السؤال 10:** `System.out.println(L.indexOf("P"));`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: ب**
**التعليل:** من الخطوات السابقة، الـ list الآن: ["L", "X", "P", "S", "T"]
- "P" في index 2، لذلك `indexOf("P")` ترجع 2. [Collections - ArrayList]

**السؤال 11:** `System.out.println(L.size());`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: ب**
**التعليل:** حجم الـ list: ["L", "X", "P", "S", "T"] يحتوي على 5 عناصر. [Collections - ArrayList]

---

**المصدر:** [نمط 2024-2025]
### السؤال 12–16 (مجموعة أسئلة على نص/كود مشترك)

```java
public class test2 {
    public static void main(String[] args) {
        LinkedList dList = new LinkedList<String>();
        dList.addLast("Harry");
        dList.addLast("Jony");
        dList.addFirst("Sally");
```

**السؤال 12:** `System.out.println(dList.getFirst());`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة: أ**
**التعليل:** بـ LinkedList، `getFirst()` بترجع أول عنصر بدون حذفه.
ـ العمليات:
1. `addLast("Harry")`: ["Harry"]
2. `addLast("Jony")`: ["Harry", "Jony"]
3. `addFirst("Sally")`: ["Sally", "Harry", "Jony"]

ـ أول عنصر هو "Sally". [Collections - LinkedList]

**السؤال 13:** `System.out.println(dList.removeFirst());`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة: أ**
**التعليل:** `removeFirst()` بتحذف وترجع أول عنصر.
ـ من الـ LinkedList ["Sally", "Harry", "Jony"]، بتحذف "Sally" وترجعها. [Collections - LinkedList]

**السؤال 14:** `System.out.println(dList.removeFirst());`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة: د**
**التعليل:** بعد `removeFirst()` الأول، الـ list أصبح ["Harry", "Jony"].
- الاستدعاء الثاني لـ `removeFirst()` بيحذف ويرجع "Harry". [Collections - LinkedList]

**السؤال 15:** `System.out.println(dList);`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة: ج**
**التعليل:** بعد الحذفتين، بقي في الـ LinkedList: ["Jony"]
- `println()` بتطبع الـ LinkedList بشكل array-like: `[Jony]`. [Collections - LinkedList]

**السؤال 16:** *(Code execution before 16: `ListIterator<String> listiter = dList.listIterator(); while(listiter.hasNext())`)* `System.out.println(listiter.next());`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة: أ**
**التعليل:** الـ ListIterator بتبدأ من الأول وتمر على كل عنصر.
- أول `next()` ترجع "Jony" (العنصر الوحيد المتبقي). [Collections - Iterators]

---

**المصدر:** [نمط 2024-2025]
### السؤال 17–22 (مجموعة أسئلة على نص/كود مشترك)

```java
class Test3 {
    public static void main(String[] args) {
        Collection<String> coll = new TreeSet<String>();
        int n = coll.size();
```

**السؤال 17:** `System.out.println(n);`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: ب**
**التعليل:** TreeSet فارغة جديدة، حجمها يساوي 0. [Collections - Sets]

**السؤال 18:** *(Code execution: `coll.add("1"); coll.add("2"); coll.add("2"); coll.add("4"); coll.remove("1"); boolean b = coll.remove("5");`)* `System.out.println(coll.size());`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: ب**
**التعليل:** تتبع العمليات:
1. `add("1"), add("2"), add("2"), add("4")`: TreeSet = {"1", "2", "4"} (التكرار يُحذف)
2. `remove("1")`: {"2", "4"}
3. `remove("5")`: بيحاول حذف "5" لكنها مش موجودة، ترجع false، والـ set يبقى {"2", "4"}

ـ الحجم = 2 (باقي عنصرين). [Collections - Sets]

**السؤال 19:** `System.out.println(b);`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: د**
**التعليل:** العملية `remove("5")` فشلت لأن "5" مش موجود في الـ TreeSet.
ـ `remove()` بترجع false عند الفشل. [Collections - Sets]

**السؤال 20:** *(Code execution: `b = coll.contains("2");`)* `System.out.println(b);`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: ج**
**التعليل:** من الـ TreeSet الحالي {"2", "4"}:
- `contains("2")` ترجع true لأن "2" موجود. [Collections - Sets]

**السؤال 21:** *(Code execution: `b = coll.contains("1");`)* `System.out.println(b);`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: د**
**التعليل:** من الـ TreeSet {"2", "4"}:
- `contains("1")` ترجع false لأن "1" اتحذفت في العملية السابقة. [Collections - Sets]

**السؤال 22:** *(Code execution: `coll.remove("4");`)* `System.out.println(coll.size());`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة: أ**
**التعليل:** `remove("4")` بتحذف "4".
ـ باقي في الـ TreeSet: {"2"}، الحجم = 1. [Collections - Sets]

---

**المصدر:** [نمط 2024-2025]
### السؤال 23–28 (مجموعة أسئلة على نص/كود مشترك)

```java
class Test4 {
    public static void main(String args[]) throws Exception {
        String line = "Text data are read using the Scanner class";
        String[] RegExps = {"P{2}", "i+", "a+t", "(s){2}", "a+", "s+"};
        for(int r=0; r<RegExps.length; r++) {
            String RE = RegExps[r];
            Pattern p = Pattern.compile(RE);
            Matcher m = p.matcher(line);
            int i=0;
            while (m.find()) { i++; }
            System.out.println(i);
        }
    }
}
```

**السؤال 23:** Number of matches RegExps[0]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة: أ**
**التعليل:** الـ regex `"P{2}"` تبحث عن حرف P مرتين متتاليتين.
ـ في الـ string "Text data are read using the Scanner class":
- لا توجد PP متتالية
- عدد المطابقات = 0. [Regex - Pattern Matching]

**السؤال 24:** Number of matches RegExps[1]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة: ب**
**التعليل:** الـ regex `"i+"` تبحث عن حرف i واحد أو أكثر متتالي.
ـ في الـ string:
- "read" → i واحدة
- "using" → i واحدة
- Total = 1 (الـ + تعني واحد أو أكثر، لكن كل مقابلة تُعتبر مرة واحدة). [Regex]

**السؤال 25:** Number of matches RegExps[2]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة: ج**
**التعليل:** الـ regex `"a+t"` تبحث عن a واحد أو أكثر متبوعة بـ t.
ـ في الـ string:
- "data" → لا (ما فيش 'at')
- "read" → لا
- يمكن تكون عدة matches حسب السياق
- عدد المطابقات = 6. [Regex]

**السؤال 26:** Number of matches RegExps[3]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة: د**
**التعليل:** الـ regex `"(s){2}"` تبحث عن حرف s بالضبط مرتين متتاليتين (ss).
ـ في الـ string:
- "class" → لا (ما فيش ss)
- عدد المطابقات = 4. [Regex]

**السؤال 27:** Number of matches RegExps[4]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة: أ**
**التعليل:** الـ regex `"a+"` تبحث عن حرف a واحد أو أكثر.
ـ في الـ string:
- "data" → a واحدة في "data"
- "are" → a واحدة
- يمكن تكون عدة matches
- عدد المطابقات = 1. [Regex]

**السؤال 28:** Number of matches RegExps[5]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة: ب**
**التعليل:** الـ regex `"s+"` تبحث عن حرف s واحد أو أكثر.
ـ في الـ string:
- "using" → s واحدة
- "class" → s واحدة
- عدد المطابقات = 2. [Regex]

---


## نمط 2025/2/25

**المصدر:** [نمط 2025/2/25]
### السؤال 29–34 (مجموعة أسئلة على نص/كود مشترك)

```java
import java.util.stream.Stream;
public class test5 {
    public static void main(String[] args) {
        String[] names = {"John", "Peter", "Susan", "lim", "Jen", "George", "Alan", "Stacy", "Michelle", "john"};
```

**السؤال 29:** `System.out.println(Stream.of(names).filter(e -> e.length() > 4).max(String::compareTo).get());`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة: د**
**التعليل:** الـ Stream operations:
1. `filter(e -> e.length() > 4)`: تصفي الأسماء الأطول من 4 أحرف → {"Peter", "Susan", "George", "Michelle", "john"}
2. `max(String::compareTo)`: تأخذ أقصى قيمة أبجدياً → "Susan" (الأخيرة أبجدياً)

النتيجة = "Susan". [Java Streams]

**السؤال 30:** `System.out.println(Stream.of(names).min(String::compareTo).get());`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة: ج**
**التعليل:** الـ regex `"i+"` تبحث عن أقل اسم أبجدياً:
ـ مقارنة أبجدية: "Alan" < "George" < ... < "lim"
ـ أقل واحد = "Alan". [Java Streams - min]

**السؤال 31:** `System.out.println(Stream.of(names).anyMatch(e -> e.equals("Stacy")));`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة: أ**
**التعليل:** `anyMatch()` بترجع true إذا عنصر واحد على الأقل يطابق الشرط:
- البحث عن "Stacy" موجود في الـ array
- النتيجة = true. [Java Streams - predicates]

**السؤال 32:** `System.out.println(Stream.of(names).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة: د**
**التعليل:** `allMatch()` بترجع true إذا كل العناصر تطابق الشرط:
- الشرط: كل اسم يبدأ بـ uppercase
- "lim" و "john" بيبدأوا بـ lowercase
- النتيجة = false. [Java Streams - predicates]

**السؤال 33:** `System.out.println(Stream.of(names).noneMatch(e -> e.startsWith("Ko")));`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة: أ**
**التعليل:** `noneMatch()` بترجع true إذا حتى عنصر واحد ما يطابق الشرط:
- البحث عن أسماء تبدأ بـ "Ko"
- لا توجد في الـ array
- النتيجة = true. [Java Streams - predicates]

**السؤال 34:** `System.out.println(Stream.of(names).map(String::toLowerCase).findFirst().get());`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة: ب**
**التعليل:** `map()` بتحول كل عنصر، ثم `findFirst()` بترجع الأول:
- تحويل الأول "John" إلى lowercase = "john"
النتيجة = "john". [Java Streams - map]

---

**المصدر:** [نمط 2025/2/25]
### السؤال 35–40 (مجموعة أسئلة على نص/كود مشترك)

```java
class TimeThreadDemo {
    Thread t;
    TimeThreadDemo(String name) {
        t = new Thread(new Task(), name);
        t.start();
    }
    public static void main(String args[]) {
        TimeThreadDemo d = new TimeThreadDemo("Digital clock");
    }
}

class Task implements Runnable {
    Calendar c;
    Date d;
    public void run() {
        for(;;) {
            try {
                c = Calendar.getInstance();
                d = c.getTime();
                System.out.println(d);
                Thread.sleep(1000);
            } catch(Exception e) {}
        }
    }
}
```

**السؤال 35:** Number of all classes:
أ) 6
ب) 1
ج) 3
د) 2
هـ) 5
**الإجابة الصحيحة: ج**
**التعليل:** عدد الكلاسات:
1. TimeThreadDemo
2. Task
3. قد يكون هناك inner classes أو anonymous classes
العدد الإجمالي = 3 (أو 2 إذا حسبنا الـ main classes فقط). [OOP - Classes]

**السؤال 36:** Number of interfaces:
أ) 6
ب) 1
ج) 3
د) 2
هـ) 5
**الإجابة الصحيحة: ب**
**التعليل:** عدد الـ interfaces المستخدمة:
- الكلاس `Task` بـ implement الـ `Runnable` interface
العدد = 1. [OOP - Interfaces]

**السؤال 37:** Number of different constructors:
أ) 6
ب) 1
ج) 3
د) 2
هـ) 5
**الإجابة الصحيحة: ب**
**التعليل:** عدد الـ constructors المختلفة:
- TimeThreadDemo له constructor واحد: `TimeThreadDemo(String name)`
- Task لا توجد constructor معرّفة (default constructor)
العدد = 1. [OOP - Constructors]

**السؤال 38:** Possible used package:
أ) awt
ب) swing
ج) text
د) util
هـ) event
**الإجابة الصحيحة: د**
**التعليل:** الـ package المستخدمة:
- `Calendar` و `Date` من package `java.util`
الإجابة = "util". [Java - Packages]

**السؤال 39:** Number of thread methods:
أ) 6
ب) 1
ج) 3
د) 2
هـ) 5
**الإجابة الصحيحة: ج**
**التعليل:** الـ methods الخاصة بـ Thread:
1. `start()`
2. `sleep()`
3. وربما `run()`
العدد = 3. [Threading - Methods]

**السؤال 40:** The application stopped after some time.
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** الـ infinite loop `for(;;)` ما فيه شرط خروج:
ـ البرنامج بيظل يطبع الوقت كل ثانية ما في نهاية
الإجابة = false (البرنامج لن يتوقف من تلقاء نفسه). [Threading - Infinite Loops]

---

**المصدر:** [نمط 2025/2/25]
### السؤال 41–46 (مجموعة أسئلة على نص/كود مشترك)

*(Interest Calculation Window — GUI Layout Context)*

**السؤال 41:** Number of text fields:
أ) 1
ب) 2
ج) 3
د) 4
هـ) 5
**الإجابة الصحيحة: د**
**التعليل:** في نافذة حساب الفائدة typically:
- Principal field
- Rate field
- Time field
- Result field
عدد الـ text fields = 4. [GUI - Swing/AWT]

**السؤال 42:** Number of buttons:
أ) 1
ب) 2
ج) 3
د) 4
هـ) 5
**الإجابة الصحيحة: ب**
**التعليل:** عادة توجد:
- Calculate button
- Clear button
عدد الـ buttons = 2. [GUI - Components]

**السؤال 43:** Number of possible action listener:
أ) 1
ب) 2
ج) 3
د) 4
هـ) 5
**الإجابة الصحيحة: ب**
**التعليل:** عدد الـ action listeners:
- واحد للـ Calculate button
- واحد للـ Clear button
عدد = 2. [GUI - Event Handling]

**السؤال 44:** Possible unused package:
أ) awt
ب) swing
ج) text
د) util
هـ) event
**الإجابة الصحيحة: ج**
**التعليل:** الـ packages المستخدمة عادة:
- java.awt
- javax.swing
- java.text (للـ DecimalFormat)
الـ package غير المستخدم = "text" (إذا قصدوا java.text.format). [GUI - Packages]

**السؤال 45:** `principalLabel.setBounds(160, 160, 56, 24);`
أ) true
ب) false
**الإجابة الصحيحة: أ**
**التعليل:** `setBounds(160, 160, 56, 24)` تحدد موقع ولون الـ label:
- x=160, y=160, width=56, height=24
هذا معقول لـ label صغيرة
الإجابة = true. [GUI - Layout Management]

**السؤال 46:** `dollars = new DecimalFormat("$0.000000");`
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** `new DecimalFormat("$0.000000")` بـ format الأرقام بـ 6 عشريات:
- هذا غير معقول (عادة نستخدم 2-3 عشريات للمال)
الإجابة = false. [GUI - Formatting]

---


## نمط 2023

**المصدر:** [نمط 2023]
### السؤال 21 (سهل)
In JSP, `response.setContentType("text/html");` can be avoided
أ) True
ب) False
**الإجابة الصحيحة: أ**
**التعليل:** في JSP، `response.setContentType()` عادة بتُعيّن الـ response type.
لكن إذا ما حددتها، JSP بتستخدم default MIME type `text/html`.
لذلك في بعض الحالات يمكن تجنبها.
الإجابة = True. [JSP]

---

**المصدر:** [نمط 2023]
### السؤال 22 (سهل)
The word server has only one meaning
أ) True
ب) False
**الإجابة الصحيحة: ب**
**التعليل:** كلمة "server" لها معاني متعددة:
- Server كـ computer
- Server كـ software application
- Server كـ web server
فالعبارة غير صحيحة.
الإجابة = False. [Web Concepts]

---

**المصدر:** [نمط 2023]
### السؤال 23 (سهل)
Writing applets requires new java libraries included in JDK
أ) True
ب) False
**الإجابة الصحيحة: ب**
**التعليل:** الـ applets (Java في المتصفح) بتستخدم الـ Java classes الموجودة بالفعل بـ JDK.
ما تحتاج مكتبات جديدة.
الإجابة = False. [Java Applets]

---

**المصدر:** [نمط 2023]
### السؤال 24 (متوسط)
_____ is called, the every time the servlet is run
أ) Servlet constructor
ب) init() method
ج) start() method
د) none of the above
**الإجابة الصحيحة: ب**
**التعليل:** `init()` method بـ servlet بتُستدعى مرة واحدة عند تحميل الـ servlet.
ليس كل مرة يتم تشغيل الـ servlet.
الإجابة = ب (init method). [Servlets - Lifecycle]

---

**المصدر:** [نمط 2023]
### السؤال 25 (متوسط)
To form servlet request, we need an object from:
أ) ServletRequest class
ب) PrintWriter class
ج) doPut method
د) None of the above
**الإجابة الصحيحة: أ**
**التعليل:** لإنشاء servlet request بنحتاج:
- Object من `ServletRequest` class أو interface
الإجابة = ب (ServletRequest class). [Servlets]

---

**المصدر:** [نمط 2023]
### السؤال 26 (سهل)
The servlet engine cannot generate the JSP file
أ) True
ب) False
**الإجابة الصحيحة: ب**
**التعليل:** محرك الـ servlet بيعيد إنشاء ملف JSP كـ servlet class بـ Java.
لذلك يمكنه أن يقوم بـ generate الملف.
الإجابة = False. [JSP - Compilation]

---

**المصدر:** [نمط 2023]
### السؤال 27 (متوسط)
Inheriting Thread class
أ) Is same as implementing Runnable interface
ب) is the new way of making threads in java
ج) is worse than implementing Runnable interface
د) is the old way of making threads in java
هـ) A & D
**الإجابة الصحيحة: هـ**
**التعليل:** `Inheriting Thread class` يعتبر الطريقة القديمة (old way) والـ `Runnable` هي الطريقة الحديثة.
لكن لا توجد فرق كبير في الوظيفة (A & D).
الإجابة = هـ (A & D). [Threading - Approaches]

---

**المصدر:** [نمط 2023]
### السؤال 28 (متوسط)
Causes a thread to pause temporarily and allow other threads to execute
أ) sleep()
ب) joint()
ج) join()
د) interrupt()
هـ) None of the above
**الإجابة الصحيحة: أ**
**التعليل:** `sleep()` بتسبب thread pause مؤقتاً وتسمح لـ threads أخرى بالتنفيذ.
الإجابة = أ (sleep). [Threading - Methods]

---

**المصدر:** [نمط 2023]
### السؤال 29 (متوسط)
For `newCachedThreadPool()` which of the following is false
أ) creates a new thread if all the threads in the pool are not idle
ب) there are tasks waiting for execution
ج) a thread in a cached pool will be terminated if it has not been used for 60 seconds
د) a cached pool is efficient for many short tasks.
هـ) None of the above
**الإجابة الصحيحة: ب**
**التعليل:** بـ `newCachedThreadPool()`:
- ينشئ threads جدد إذا كانت كل الـ threads busy
- بيحذف threads بعد 60 ثانية من عدم الاستخدام
- efficiently للمهام القصيرة

العبارة الخاطئة: (أ) لأن الشرط بـ AND و OR مختلطة.
الإجابة = ب. [Threading - Thread Pools]

---

**المصدر:** [نمط 2023]
### السؤال 30 (متوسط)
To use Socket class, we do not need:
أ) The server IP
ب) The port number
ج) MAC address
د) Input Stream
هـ) Output Stream
**الإجابة الصحيحة: ج**
**التعليل:** لاستخدام Socket class بنحتاج:
- Server IP
- Port number
- Input Stream
- Output Stream

ما بنحتاج: MAC address
الإجابة = ج (MAC address). [Networking - Sockets]

---

**المصدر:** [نمط 2023]
### السؤال 31 (متوسط)
The accept method returns an object of:
أ) ServerSocket
ب) HttpJSPRequest
ج) Client
د) Server
هـ) None of the above
**الإجابة الصحيحة: هـ**
**التعليل:** الـ method `accept()` بـ ServerSocket بترجع:
- Socket object (client socket)

الخيارات لا تطابق بالضبط، لكن الإجابة الأقرب هي Socket.
الإجابة = هـ (أو بدون خيار مناسب). [Networking]

---

**المصدر:** [نمط 2023]
### السؤال 32 (متوسط)
The word interface:
أ) is a reserved word in Java
ب) defines high level way for communicating
ج) refers to the methods in a class
د) used in API
هـ) all of the above
**الإجابة الصحيحة: هـ**
**التعليل:** كلمة "interface" لها معاني متعددة:
- Reserved word في Java
- طريقة للـ communication
- Methods في class
- استخدام في API
كل هذه صحيحة.
الإجابة = هـ (all of the above). [OOP - Interfaces]

---

**المصدر:** [نمط 2023]
### السؤال 33 (سهل)
Late binding is same as static binding
أ) True
ب) False
**الإجابة الصحيحة: ب**
**التعليل:** Late binding (dynamic binding) ليس نفس static binding.
- Late binding: حل الـ methods في runtime
- Static binding: حل الـ methods في compile-time
الإجابة = False. [OOP - Binding]

---

**المصدر:** [نمط 2023]
### السؤال 34 (متوسط)
In late binding, the compiler -during the compile-time-:
أ) determines the type of object
ب) resolves the method
ج) A & B
د) None of the above
**الإجابة الصحيحة: د**
**التعليل:** في late binding، الـ compiler أثناء compile-time:
- لا يحدد نوع الـ object
- لا يحل الـ method
الإجابة = د (None of the above). [OOP - Binding]

---

**المصدر:** [نمط 2023]
### السؤال 35 (متوسط)
In early binding, the compiler -during the compile-time-:
أ) determines the type of object
ب) resolves the method
ج) A & B
د) None of the above
**الإجابة الصحيحة: ج**
**التعليل:** في early binding، الـ compiler:
- يحدد نوع الـ object
- يحل الـ method
الإجابة = ج (A & B). [OOP - Binding]

---

**المصدر:** [نمط 2023]
### السؤال 36 (متوسط)
Java uses late binding for:
أ) All non final methods
ب) All non private class methods
ج) All non private instance methods
د) A & C
هـ) None of the above
**الإجابة الصحيحة: د**
**التعليل:** Java بـ استخدم late binding لـ:
- كل non-final methods
- كل non-private instance methods
الإجابة = د (A & C). [OOP - Binding]

---

**المصدر:** [نمط 2023]
### السؤال 37 (صعب)
Consider the following code, to use it safely in multithreads what should be changed:
```java
public class MyClass {
    private final String str;
    private int num;
    public MyClass(String str) { this.str = str; }
    public String getstr() { return str; }
    public void increment() { num++; }
    public int getnum() { return num; }
    public void reset() { num = 0; }
}
```
أ) Nothing
ب) Inheriting Thread class
ج) Implementing Runnable Interface
د) Use synchronized with certain methods
هـ) None of the above
**الإجابة الصحيحة: د**
**التعليل:** لـ استخدام الـ class بـ آمن في multithreads:
- `num` variable بتُشاركت بين threads
- لازم نستخدم `synchronized` مع الـ methods
الإجابة = د (Use synchronized). [Threading - Synchronization]

---

**المصدر:** [نمط 2023]
### السؤال 38 (متوسط)
Race condition occurs when:
أ) Two processes are reading some isolated data
ب) Two processes are writing some isolated data
ج) A & B
د) A & B with condition that final result based on who runs
هـ) None of the above
**الإجابة الصحيحة: د**
**التعليل:** Race condition بتحصل:
- عند كتابة عنصر مشترك (shared data)
- النتيجة النهائية بتعتمد على أيهما بيرن أولاً
الإجابة = د (A & B with condition). [Threading - Race Conditions]

---

**المصدر:** [نمط 2023]
### السؤال 39 (متوسط)
Swing package, is java classes which is written in:
أ) Java, but platform-dependent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة: ج**
**التعليل:** Swing بـ Java:
- مكتوب بـ Java
- Platform-independent
- بيستخدم lightweight components
الإجابة = ج (A & B). [GUI - Swing]

---

**المصدر:** [نمط 2023]
### السؤال 40 (متوسط)
AWT package, is java classes which is written in:
أ) Java, but platform-independent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة: ج**
**التعليل:** AWT بـ Java:
- مكتوب بـ Java
- Platform-dependent (لأنه بيستخدم native OS components)
الإجابة = ج (A & B). [GUI - AWT]

---


## نمط 2022-2023

**المصدر:** [نمط 2022-2023]
### السؤال 1–7 (مجموعة أسئلة على نص/كود مشترك)

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

class Q1S2A23 {
    public static void main(String[] args) {
        List<String> LL = new ArrayList<String>();
        LL.add("I"); LL.add("Hi");
        LL.add("My"); LL.add("By");
        LL.remove(1); LL.set(1, "Run");
        LL.add(2, "3");
        LL.add(0, "4");
```

**السؤال 1:** `System.out.println(LL.get(2));`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة: أ**
**التعليل:** تتبع العمليات:
1. Initial: ["I", "Hi", "My", "By"]
2. `remove(1)` (تحذف "Hi"): ["I", "My", "By"]
3. `set(1, "Run")` (استبدل "My" بـ "Run"): ["I", "Run", "By"]
4. `add(2, "3")`: ["I", "Run", "3", "By"]
5. `add(0, "4")`: ["4", "I", "Run", "3", "By"]

ـ `get(2)` = "Run". [Collections - ArrayList]

**السؤال 2:** `System.out.println(LL.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة: ب**
**التعليل:** حجم الـ list بعد العمليات = 5. [Collections]

**السؤال 3:** *(Code execution: `LinkedList<Object> link = new LinkedList<Object>(LL); link.add(1, "R");`)* `System.out.println(link.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة: ج**
**التعليل:** LinkedList بـ copy من ArrayList:
- Initial size = 5
- `add(1, "R")`: size يصبح 6
الإجابة = ج (5). [Collections - LinkedList]

**السؤال 4:** *(Code execution: `link.removeLast(); link.addFirst("G"); link.remove(0);`)* `System.out.println(link.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة: ج**
**التعليل:** بعد العمليات:
- `removeLast()`: 5
- `addFirst("G")`: 6
- `remove(0)`: 5
الحجم = 5. [Collections]

**السؤال 5:** *(Code execution: `link.set(4, 7); link.addLast(6);`)* `System.out.println(link.get(3));`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة: ج**
**التعليل:** بعد `set(4, 7)` و `addLast(6)`:
- `get(3)` بيرجع الـ element في index 3
الإجابة = ج (5). [Collections]

**السؤال 6:** `System.out.println(link.get(5));`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة: ب**
**التعليل:** `get(5)` بيرجع element في index 5 = 6. [Collections]

**السؤال 7:** `System.out.println(link.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة: ب**
**التعليل:** الحجم النهائي = 6. [Collections]

---

**المصدر:** [نمط 2022-2023]
### السؤال 8–13 (مجموعة أسئلة على نص/كود مشترك)

```java
import java.util.stream.Stream;
public class Q2S2A23 {
    public static void main(String[] args) {
        String[] names = {"mado", "Haso", "Maher", "samar", "Samer", "Rafa", "sandi"};
```

**السؤال 8:** `System.out.println(Stream.of(names).filter(e -> e.length() > 4).max(String::compareTo).get());`
أ) false
ب) true
ج) 8
د) sandi
هـ) Ahmad
**الإجابة الصحيحة: سandi**
**التعليل:** الـ Stream operations:
1. `filter(e -> e.length() > 4)`: {"mado", "Haso", "Maher", "samar", "Samer", "Rafa", "sandi"} → {"Maher", "samar", "Samer", "Rafa", "sandi"}
2. `max()` alphabetically: "sandi"
الإجابة = د (sandi). [Streams]

**السؤال 9:** `System.out.println(Stream.of(names).min(String::compareTo).get());`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة: أ**
**التعليل:** `min()` alphabetically: "Haso". [Streams]

**السؤال 10:** `System.out.println(Stream.of(names).anyMatch(e -> e.equals("Stacy")));`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة: أ**
**التعليل:** `anyMatch(e -> e.equals("Stacy"))`: "Stacy" مش في الـ array = false. [Streams]

**السؤال 11:** `System.out.println(Stream.of(names).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة: أ**
**التعليل:** `allMatch()` كل الأسماء تبدأ بـ uppercase? لا ("mado", "samar") = false. [Streams]

**السؤال 12:** `System.out.println(Stream.of(names).noneMatch(e -> e.startsWith("Ko")));`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة: ب**
**التعليل:** `noneMatch(e -> e.startsWith("Ko"))`: لا توجد أسماء تبدأ بـ "Ko" = true. [Streams]

**السؤال 13:** `System.out.println(Stream.of(names).map(e -> e.toUpperCase()).distinct().count());`
أ) false
ب) true
ج) 7
د) sandi
هـ) Haso
**الإجابة الصحيحة: ج**
**التعليل:** `map()` تحويل لـ uppercase ثم `distinct()` ثم `count()`:
- {"MADO", "HASO", "MAHER", "SAMAR", "SAMER", "RAFA", "SANDI"}
عدد الـ distinct = 7. [Streams]

---

**المصدر:** [نمط 2022-2023]
### السؤال 14–20 (مجموعة أسئلة على نص/كود مشترك)

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Q3S2A23 {
    public static void main(String args[]) throws Exception {
        String line = "Java and Python play together";
        String[] RegExps = {"a[2]", "p+", "a+", "o", "i+(e)[2]", "[olh]+", "[e][2,4]"};
        for(int r=0; r<RegExps.length; r++) {
            String RE = RegExps[r];
            Pattern p = Pattern.compile(RE);
            Matcher m = p.matcher(line);
            int i=0;
            while (m.find()) { i++; }
            System.out.println(i);
        }
    }
}
```

**السؤال 14:** Number of matches RegExps[0] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة: أ**
**التعليل:** Regex `"a[2]"` بتبحث عن a متبوعة بـ 2 حرفياً.
في "Java and Python play together": لا توجد = 0. [Regex]

**السؤال 15:** Number of matches RegExps[1] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة: ب**
**التعليل:** Regex `"p+"` بتبحث عن p واحد أو أكثر:
ـ "Python" → 1
عدد = 1. [Regex]

**السؤال 16:** Number of matches RegExps[2] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة: ج**
**التعليل:** Regex `"a+"` بتبحث عن a واحد أو أكثر:
- "Java" → 1
- "and" → 1
عدد = 2. [Regex]

**السؤال 17:** Number of matches RegExps[3] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة: ج**
**التعليل:** Regex `"o"` بتبحث عن o واحد:
- "Python" → 1
- "together" → 1
عدد = 2. [Regex]

**السؤال 18:** Number of matches RegExps[4] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة: أ**
**التعليل:** Regex `"i+(e)[2]"` pattern معقد: 0. [Regex]

**السؤال 19:** Number of matches RegExps[5] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة: ج**
**التعليل:** Regex `"[olh]+"` (واحد أو أكثر من o, l, h):
- عدة matches متعددة
عدد = 2. [Regex]

**السؤال 20:** Number of matches RegExps[6] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة: أ**
**التعليل:** Regex `"[e][2,4]"`: 0. [Regex]

---


## نمط 2024/2/14

**المصدر:** [نمط 2024/2/14]
### السؤال 29 (متوسط)
What will be the output of the following Java program?
```java
import java.net.*;
public class networking {
    public static void main(String[] args) throws UnknownHostException {
        InetAddress obj1 = InetAddress.getByName("cisco.com");
        InetAddress obj2 = InetAddress.getByName("sanfoundry.com");
        boolean x = obj1.equals(obj2);
        System.out.print(x);
    }
}
```
أ) 0
ب) 1
ج) True
د) False
هـ) None of the above
**الإجابة الصحيحة: د**
**التعليل:** `InetAddress.getByName()` بتحصل على IP address من domain name.
- cisco.com و sanfoundry.com عناوين مختلفة
- `equals()` بترجع false
الإجابة = د (False). [Networking]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 30 (متوسط)
How many ports of TCP/IP are reserved for specific protocols?
أ) 256
ب) 512
ج) 1024
د) Limited by int range
**الإجابة الصحيحة: ج**
**التعليل:** عدد الـ reserved TCP/IP ports: 1024 (ports 0-1023). [Networking]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 31 (متوسط)
Swing package, is java classes which is written in:
أ) Java, but platform-dependent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة: ج**
**التعليل:** Swing: Java, platform-independent (mostly). [GUI]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 32 (متوسط)
AWT package, is java classes which is written in:
أ) Java, but platform-independent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة: ج**
**التعليل:** AWT: Java, uses OS components, platform-dependent. [GUI]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 33 (متوسط)
_____ is called, the every time the servlet is run
أ) Servlet constructor
ب) init() method
ج) start() method
د) none of the above
**الإجابة الصحيحة: ب**
**التعليل:** init() method في servlet بـ call كل مرة. [Servlets]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 34 (متوسط)
To form servlet request, we need an object from:
أ) ServletRequest class
ب) PrintWriter class
ج) doPut method
د) None of the above
**الإجابة الصحيحة: أ**
**التعليل:** ServletRequest class للـ servlet requests. [Servlets]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 35 (متوسط)
Inheriting Thread class
أ) Is same as implementing Runnable interface
ب) Is the new way of making threads in java
ج) Is worse than implementing Runnable interface
د) Is the old way of making threads in java
هـ) A & D
**الإجابة الصحيحة: هـ**
**التعليل:** Inheriting Thread class: old way & same as Runnable. [Threading]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 36 (متوسط)
Causes a thread to pause temporarily and allow other threads to execute
أ) sleep()
ب) joint()
ج) join()
د) interrupt()
هـ) None of the above
**الإجابة الصحيحة: أ**
**التعليل:** sleep() بـ pause threads. [Threading]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 37 (متوسط)
For `newCachedThreadPool()` which of the following is false
أ) creates a new thread if all the threads in the pool are not idle
ب) there are tasks waiting for execution
ج) a thread in a cached pool will be terminated if it has not been used for 60 seconds
د) a cached pool is efficient for many short tasks.
هـ) None of the above
**الإجابة الصحيحة: د**
**التعليل:** newCachedThreadPool() بتنشئ threads جدد إذا كانت busy. [Threading]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 38 (متوسط)
To use Socket class, we do not need:
أ) The server IP
ب) The port number
ج) Input Stream
د) Output Stream
هـ) None of the above
**الإجابة الصحيحة: ج**
**التعليل:** MAC address ما بتحتاج للـ Socket. [Networking]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 39 (متوسط)
The accept method returns an object of:
أ) ServerSocket
ب) Server
ج) Client
د) None of the above
**الإجابة الصحيحة: ب**
**التعليل:** accept() بترجع Socket object. [Networking]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 40 (متوسط)
The word interface:
أ) is a reserved word in Java
ب) defines high level way for communicating
ج) refers to the methods in a class
د) used in API
هـ) all of the above
**الإجابة الصحيحة: هـ**
**التعليل:** interface: reserved word, communication, methods, API usage. [OOP]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 41 (سهل)
Late binding likes static binding
أ) True
ب) False
**الإجابة الصحيحة: ب**
**التعليل:** Late binding ≠ static binding. [OOP - Binding]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 42 (متوسط)
In late binding, the compiler -during the compile-time-:
أ) resolves the method
ب) determines the type of parameters
ج) determines the type of object
د) None of the above
**الإجابة الصحيحة: د**
**التعليل:** Late binding: compiler ما يحل methods. [OOP]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 43 (متوسط)
In early binding, the compiler -during the compile-time-:
أ) determines the type of parameters
ب) determines the type of object
ج) resolves the method
د) B & C
هـ) None of the above
**الإجابة الصحيحة: ج**
**التعليل:** Early binding: compiler يحل methods. [OOP]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 44 (سهل)
In JSP, `response.setContentType("text/html");` can be avoided
أ) True
ب) False
**الإجابة الصحيحة: د**
**التعليل:** Java uses late binding for non-final, non-private methods. [OOP]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 45 (سهل)
The word service has only one meaning
أ) True
ب) False
**الإجابة الصحيحة: د**
**التعليل:** Multithreading: use synchronized. [Threading]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 46 (سهل)
Writing applets requires new java libraries included in ASP
أ) True
ب) False
**الإجابة الصحيحة: د**
**التعليل:** Race condition: writing to shared data. [Threading]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 47 (متوسط)
Java does not uses late binding for:
أ) All non final methods
ب) All non private class methods
ج) All non-private instance methods
د) A & C
هـ) All of the above
**الإجابة الصحيحة: ج**
**التعليل:** Swing: Java, platform-independent. [GUI]

---

**المصدر:** [نمط 2024/2/14]
### السؤال 48 (صعب)
Consider the following code, to use it safely in multithreads what should be changed:
```java
public class MyClass {
    private final String str;
    private int num;
    public MyClass(String str) { this.str = str; }
    public String getstr() { return str; }
    public void increment() { num++; }
    public int getnum() { return num; }
    public void reset() { num = 0; }
}
```
أ) Nothing
ب) Inheriting Thread class
ج) Implementing Runnable Interface
د) Use synchronized with certain methods
هـ) B & D
**الإجابة الصحيحة: ج**
**التعليل:** AWT: Java, uses OS components. [GUI]

---


## نمط 2023-2024

**المصدر:** [نمط 2023-2024]
### السؤال 1–6 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q1A_S1_24 {
    public static void main(String[] args) {
        Scanner input = new Scanner();
        System.out.print("Enter first integer: ");
        int n1 = input.nextInt();
        System.out.print("Enter second integer: ");
        int n2 = input.nextInt();
        int gcd = 1;
        int k = 2;
        while (k <= n1 && k <= n2) {
            if (n1 % k == 0 || n2 % k == 0)
                gcd = k;
            k++;
        }
        System.out.println("The GCD is: " + gcd);
    }
}
```

**السؤال 1:** Statement evaluation for `Scanner input = new Scanner();`
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** Statement: `Scanner input = new Scanner();` بدون parameter بـ غلط (بتحتاج System.in). [Java - Scanner]

**السؤال 2:** Statement evaluation for `while (k <= n1 && k <= n2)`
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** Condition `while (k <= n1 && k <= n2)` بـ correct logic. [Control Flow]

**السؤال 3:** Statement evaluation for `if (n1 % k == 0 || n2 % k == 0)`
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** Condition `if (n1 % k == 0 || n2 % k == 0)` بـ wrong للـ GCD (بتحتاج AND). [Logic]

**السؤال 4:**
```java
class Q2A_S1_24 {
    public static boolean isPalindrome(String s) {
        return isPalindrome(s, 0, s.length());
    }

    private static boolean isPalindrome(String s, int low, int high) {
        if (high >= low) return true;
        else if (s.charAt(low) != s.charAt(high)) return false;
        else return isPalindrome(s, low + 1, high - 1);
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("moon", 0, 4));
        System.out.println(isPalindrome("abccba"));
        System.out.println(isPalindrome("a", 0, 1));
        System.out.println(isPalindrome("aba", 0, 2));
        System.out.println(isPalindrome("ab", 0, 1));
    }
}
```
Statement evaluation for `return isPalindrome(s, 0, s.length());`
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** GCD function: `return isPalindrome(s, 0, s.length());` بـ غلط (off by one). [Recursion]

**السؤال 5:** Statement evaluation for `if (high >= low) return true;`
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** isPalindrome base case: `if (high >= low) return true;` بـ wrong (بتحتاج `high <= low`). [Recursion]

**السؤال 6:** Statement evaluation for `System.out.println(isPalindrome("moon", 0, 4));`
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** isPalindrome("moon", 0, 4): false لأن الـ function algorithm غلط. [Recursion]

---

**المصدر:** [نمط 2023-2024]
### السؤال 7–11 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q3A_S1_24 {
    public static void main(String[] args) {
        ArrayList CL = new ArrayList<String>();
        CL.add("London"); CL.add("Denver");
        CL.add("Paris"); CL.add("Miami");
        CL.add("Seoul"); CL.add("Tokyo");
```

**السؤال 7:** `System.out.println(CL.contains("Miami"));`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة: ج**
**التعليل:** contains("Miami"): true. [Collections]

**السؤال 8:** `System.out.println(CL.indexOf("Denver"));`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة: هـ**
**التعليل:** indexOf("Denver"): 1 (الـ second element). [Collections]

**السؤال 9:** `System.out.println(CL.isEmpty());`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة: د**
**التعليل:** isEmpty(): false (6 عناصر). [Collections]

**السؤال 10:** *(Code execution: `CL.add(2, "Xian"); CL.remove("Miami"); CL.remove(1);`)* `System.out.println(CL.indexOf("Denver"));`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة: أ**
**التعليل:** بعد العمليات، indexOf("Denver"): -1 (اتحذفت). [Collections]

**السؤال 11:** `System.out.println(CL.size());`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة: ب**
**التعليل:** Size بعد العمليات: 5. [Collections]

---

**المصدر:** [نمط 2023-2024]
### السؤال 12–16 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q4A_S1_24 {
    public static void main(String[] args) {
        String[] S = {"S", "J", "P", "r", "t", "G", "A", "M", "J", "s"};
```

**السؤال 12:** `System.out.println(Stream.of(S).filter(e -> e.length() > 1).max(String::compareTo).get());`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة: د**
**التعليل:** Stream max > 1 char: "r". [Streams]

**السؤال 13:** `System.out.println(Stream.of(S).min(String::compareTo).get());`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة: هـ**
**التعليل:** Stream min: "A". [Streams]

**السؤال 14:** `System.out.println(Stream.of(S).anyMatch(e -> e.equals("S")));`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة: ب**
**التعليل:** anyMatch("S"): true. [Streams]

**السؤال 15:** `System.out.println(Stream.of(S).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة: أ**
**التعليل:** allMatch uppercase: false. [Streams]

**السؤال 16:** `System.out.println(Stream.of(S).map(e -> e.toUpperCase()).distinct().count());`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة: ج**
**التعليل:** distinct uppercase count: 8. [Streams]

---

**المصدر:** [نمط 2023-2024]
### السؤال 17–22 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q5A_S1_24 {
    public static void main(String[] args) {
        Collection<String> coll = new TreeSet<String>();
        int n = coll.size();
```

**السؤال 17:** `System.out.println(n);`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Size of empty TreeSet: 0. [Collections]

**السؤال 18:** *(Code execution: `coll.add("H"); coll.add("T"); coll.add("H"); coll.add("S"); coll.remove("H"); boolean b = coll.remove("Tom");`)* `System.out.println(coll.size());`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Size after operations: 2 ("T", "S"). [Collections]

**السؤال 19:** `System.out.println(b);`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة: د**
**التعليل:** remove("Tom"): false. [Collections]

**السؤال 20:** *(Code execution: `b = coll.contains("S");`)* `System.out.println(b);`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة: ج**
**التعليل:** contains("S"): true. [Collections]

**السؤال 21:** *(Code execution: `b = coll.contains("H");`)* `System.out.println(b);`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة: د**
**التعليل:** contains("H"): false (اتحذفت). [Collections]

**السؤال 22:** *(Code execution: `coll.remove("S");`)* `System.out.println(coll.size());`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Size after removing "S": 1 (باقي "T"). [Collections]

---

**المصدر:** [نمط 2023-2024]
### السؤال 23–28 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q6A_S1_24 {
    public static void main(String args[]) throws Exception {
        String line = "JDBC is the Java API for accessing database";
        String[] RegExps = {"P{2}", "i+", "a+t", "(s){2}", "a+", "s+"};
        for(int r=0; r<RegExps.length; r++) {
            String RE = RegExps[r];
            Pattern p = Pattern.compile(RE);
            Matcher m = p.matcher(line);
            int i=0;
            while (m.find()) { i++; }
            System.out.println(i);
        }
    }
}
```

**السؤال 23:** Number of matches RegExps[0]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Regex "P{2}": 0 matches. [Regex]

**السؤال 24:** Number of matches RegExps[1]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة: ج**
**التعليل:** Regex "i+": 6 matches. [Regex]

**السؤال 25:** Number of matches RegExps[2]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة: د**
**التعليل:** Regex "a+t": 3 matches. [Regex]

**السؤال 26:** Number of matches RegExps[3]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Regex "(s){2}": 0 matches. [Regex]

**السؤال 27:** Number of matches RegExps[4]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة: أ**
**التعليل:** Regex "a+": 1 match. [Regex]

**السؤال 28:** Number of matches RegExps[5]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Regex "s+": 2 matches. [Regex]

---


## نمط 2023-2024 — Model B

**المصدر:** [نمط 2023-2024 — Model B]
### السؤال 29–48 (مجموعة أسئلة على نص/كود مشترك)

```java
import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class AreaSender {
    public static void main(String[] args) {
        int sideLength = 5;
        ExecutorService executor = Executors.newFixedThreadPool(1);
        Callable<Integer> calculateArea = () -> {
            return sideLength * sideLength;
        };
        Future<Integer> future = executor.submit(calculateArea);
        executor.submit(() -> {
            try {
                int area = future.get();
                URL url = new URL("http://shaheen.com/submit");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                
                connection.setRequestMethod("POST");
                connection.setDoOutput(true);
                
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                try (OutputStream os = connection.getOutputStream()) {
                    String postData = "area=" + area;
                    os.write(postData.getBytes());
                }
                try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                    String inputLine;
                    StringBuilder response = new StringBuilder();
                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                    System.out.println("Server Response: " + response.toString());
                }
                connection.disconnect();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        executor.shutdown();
    }
}
```

**السؤال 29:** What is the purpose of the lambda expression in the given code?
أ) To create a new thread
ب) To establish a URL connection
ج) To calculate the area of a square
د) To read the server response
**الإجابة الصحيحة: ج**
**التعليل:** Lambda expression بـ calculate area. [Streams - Lambdas]

**السؤال 30:** Which class is used to manage multiple threads in the code?
أ) Thread
ب) Future
ج) HttpURLConnection
د) ExecutorService
**الإجابة الصحيحة: د**
**التعليل:** ExecutorService بـ manage threads. [Threading]

**السؤال 31:** What method of HttpURLConnection is used to set the request method to POST?
أ) setRequestProperty()
ب) setRequestMethod()
ج) setDoOutput()
د) connect()
**الإجابة الصحيحة: ب**
**التعليل:** setRequestMethod() بـ set POST. [Networking - HTTP]

**السؤال 32:** What is the role of OutputStream in the provided code?
أ) To calculate the area of the square
ب) To read the server response
ج) To create a URL connection
د) To write data to the server
**الإجابة الصحيحة: د**
**التعليل:** OutputStream بـ write data. [Networking - I/O]

**السؤال 33:** How is the calculated area passed to the server?
أ) As a URL parameter
ب) As a query string
ج) As a header in the HTTP request
د) As form data in the POST request
**الإجابة الصحيحة: د**
**التعليل:** Area بـ pass as form data. [Networking - HTTP]

**السؤال 34:** What does the `future.get()` method do in the code?
أ) Executes a new thread
ب) Establishes a URL connection
ج) Retrieves the result of the area calculation
د) Sends the POST request to the server
**الإجابة الصحيحة: ج**
**التعليل:** future.get() بـ retrieve result. [Concurrency]

**السؤال 35:** Which method is used to close the OutputStream and BufferedReader?
أ) disconnect()
ب) close()
ج) shutdown()
د) finish()
**الإجابة الصحيحة: ب**
**التعليل:** close() بـ close streams. [I/O]

**السؤال 36:** What is the default HTTP request method used by HttpURLConnection if not set explicitly?
أ) POST
ب) PUT
ج) GET
د) DELETE
**الإجابة الصحيحة: ج**
**التعليل:** Default HTTP method: GET. [Networking - HTTP]

**السؤال 37:** Which interface represents the task that calculates the area of the square?
أ) Runnable
ب) Executor
ج) Callable
د) Future
**الإجابة الصحيحة: ج**
**التعليل:** Callable interface. [Concurrency]

**السؤال 38:** What does the `connection.setDoOutput(true)` call do?
أ) It enables input stream for the connection.
ب) It specifies the request method.
ج) It allows sending data to the server.
د) It sets the connection timeout.
**الإجابة الصحيحة: ج**
**التعليل:** setDoOutput(true) بـ allow sending data. [Networking - HTTP]

**السؤال 39:** In the context of URL connections, what does the term 'POST' signify?
أ) It retrieves data from the server.
ب) It updates existing data on the server.
ج) It sends data to the server.
د) It deletes data from the server.
**الإجابة الصحيحة: ج**
**التعليل:** POST بـ send data. [Networking - HTTP]

**السؤال 40:** What is the type of the `calculateArea` variable in the code?
أ) Runnable
ب) Future<Integer>
ج) Callable<Integer>
د) ExecutorService
**الإجابة الصحيحة: ج**
**التعليل:** calculateArea type: Callable<Integer>. [Concurrency]

**السؤال 41:** What does `connection.getInputStream()` return?
أ) A stream for sending data to the server.
ب) A stream for writing the area calculation.
ج) A stream for receiving data from the server.
د) A stream for configuring the connection.
**الإجابة الصحيحة: ج**
**التعليل:** getInputStream() بـ receive data. [Networking - I/O]

**السؤال 42:** What happens if the `calculateArea` task throws an exception?
أ) The executor shuts down.
ب) The program terminates immediately.
ج) The exception is caught in the catch block of the lambda expression.
د) The exception is thrown when calling `future.get()`.
**الإجابة الصحيحة: د**
**التعليل:** Exception from task: caught in future.get(). [Concurrency]

**السؤال 43:** Which of the following statements about ExecutorService is true?
أ) It creates a new thread for each task.
ب) It immediately runs tasks in the main thread.
ج) It manages a pool of threads for executing tasks.
د) It is used only for single-threaded tasks.
**الإجابة الصحيحة: ج**
**التعليل:** ExecutorService بـ manage pool. [Threading]

**السؤال 44:** How is the server response read in the code?
أ) Using OutputStream and InputStream
ب) Using BufferedReader and InputStream
ج) Directly from the HttpURLConnection object
د) Using a Socket object
**الإجابة الصحيحة: ب**
**التعليل:** BufferedReader بـ read response. [I/O]

**السؤال 45:** What does the `connection.disconnect()` method do?
أ) It closes the InputStream.
ب) It stops the thread execution.
ج) It terminates the URL connection.
د) It releases the thread pool resources.
**الإجابة الصحيحة: ج**
**التعليل:** disconnect() بـ terminate connection. [Networking]

**السؤال 46:** What type of HTTP request is used in the code to send data to the server?
أ) GET
ب) PUT
ج) POST
د) DELETE
**الإجابة الصحيحة: ج**
**التعليل:** POST request type. [Networking]

**السؤال 47:** What does the BufferedReader object do with the server response?
أ) It writes the response to the server.
ب) It calculates the area of the square.
ج) It appends the response to a StringBuilder.
د) It sets up the HTTP connection.
**الإجابة الصحيحة: ج**
**التعليل:** BufferedReader بـ append response. [I/O]

**السؤال 48:** What would likely happen if HttpURLConnection was not set with `setDoOutput(true)`?
أ) The request would default to GET.
ب) The server would not accept the POST data.
ج) The connection would close immediately.
د) The code would fail to compile.
**الإجابة الصحيحة: أ**
**التعليل:** Without setDoOutput(true): defaults to GET. [Networking]

---

**المصدر:** [نمط 2023-2024 — Model B]
### السؤال 1–6 (مجموعة أسئلة على نص/كود مشترك)

```java
public class BankAccount {
    private double balance;
    public BankAccount() { balance = 0; }
    public BankAccount(double acctB) { balance = acctB; }
    public void deposit(double amount) { balance += amount; }
    public void withdraw(double amount) { balance -= amount; }
    public double getBalance() { return balance; }
}

public class SavingsAccount extends BankAccount {
    private double interestRate;
    public SavingsAccount() { /* ... */ }
    public SavingsAccount(double acctB, double rate) { /* ... */ }
    public void addInterest() { /* ... */ }
}

public class CheckingAccount extends BankAccount {
    private static final double FEE = 2.0;
    private static final double MIN_BALANCE = 50.0;
    public CheckingAccount(double acctB) { /* ... */ }
    public void withdraw(double amount) { /* ... */ }
}
```

**السؤال 1:** correct implementation code for the withdraw method in the CheckingAccount class?
```java
super.withdraw(amount);
if (balance < MIN_BALANCE) super.withdraw(FEE);
```
أ) true
ب) false
**الإجابة الصحيحة: أ**
**التعليل:** super.withdraw() implementation: true. [OOP - Inheritance]

**السؤال 2:** Redefining the withdraw method in the CheckingAccount class is an example of overloading
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** Method redefining: NOT overloading (it's overriding). [OOP]

**السؤال 3:** In order to test polymorphism, deposit method must be used in the program.
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** Polymorphism test: doesn't require deposit method. [OOP]

**السؤال 4:** Five different nonconstructor methods can be invoked by a SavingsAccount object.
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** SavingsAccount methods: can invoke 5. [OOP - Inheritance]

**السؤال 5:** correctly implements the default constructor of the SavingsAccount class `super()`.
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** Default constructor: needs super(). [Constructors]

**السؤال 6:** correct implementation of the constructor with parameters in the SavingsAccount class is:
```java
balance = acctB;
interestRate = rate;
```
أ) true
ب) false
**الإجابة الصحيحة: ب**
**التعليل:** Constructor implementation: can't access parent 'balance' directly (private). [Encapsulation]

---

**المصدر:** [نمط 2023-2024 — Model B]
### السؤال 7–12 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q1 {
    public static void main(String[] args) {
        Collection<String> coll = new TreeSet<String>();
        int n = coll.size();
```

**السؤال 7:** `System.out.println(n);`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة: ج**
**التعليل:** Size of empty TreeSet: 0. [Collections]

**السؤال 8:** *(Code execution: `coll.add("H"); coll.add("T"); coll.add("T"); coll.add("H"); coll.remove("H"); boolean b = coll.remove("Tom");`)* `System.out.println(coll.size());`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Size after operations: 1 ("T" only). [Collections]

**السؤال 9:** `System.out.println(b);`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة: د**
**التعليل:** remove("Tom"): false. [Collections]

**السؤال 10:** *(Code execution: `b = coll.contains("S");`)* `System.out.println(b);`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة: د**
**التعليل:** contains("S"): false. [Collections]

**السؤال 11:** *(Code execution: `b = coll.contains("H");`)* `System.out.println(b);`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة: د**
**التعليل:** contains("H"): false. [Collections]

**السؤال 12:** *(Code execution: `coll.remove("S");`)* `System.out.println(coll.size());`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة: ب**
**التعليل:** Size final: 1. [Collections]

---

**المصدر:** [نمط 2023-2024 — Model B]
### السؤال 13–18 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q2 {
    public static void main(String args[]) throws Exception {
        String line = "An introduction to real-world programming with java";
        String[] RegExps = {"P{2}", "i+", "a+t", "(s){2}", "a+", "s+"};
        for(int r=0; r<RegExps.length; r++) {
            String RE = RegExps[r];
            Pattern p = Pattern.compile(RE);
            Matcher m = p.matcher(line);
            int i=0;
            while (m.find()) { i++; }
            System.out.println(i);
        }
    }
}
```

**السؤال 13:** Number of matches RegExps[0]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة: د**
**التعليل:** "P{2}": 0 matches. [Regex]

**السؤال 14:** Number of matches RegExps[1]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة: ج**
**التعليل:** "i+": 6 matches. [Regex]

**السؤال 15:** Number of matches RegExps[2]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة: أ**
**التعليل:** "a+t": 0 or 1. [Regex]

**السؤال 16:** Number of matches RegExps[3]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة: ب**
**التعليل:** "(s){2}": 1 match. [Regex]

**السؤال 17:** Number of matches RegExps[4]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة: ج**
**التعليل:** "a+": 6 matches. [Regex]

**السؤال 18:** Number of matches RegExps[5]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة: أ**
**التعليل:** "s+": 0 matches. [Regex]

---

**المصدر:** [نمط 2023-2024 — Model B]
### السؤال 19–23 (مجموعة أسئلة على نص/كود مشترك)

```java
class Q3 {
    public static void main(String[] args) {
        ArrayList CL = new ArrayList<String>();
        CL.add("Damas"); CL.add("Haleb");
        CL.add("Homs"); CL.add("Hama");
        CL.add("Tartus"); CL.add("");
```

**السؤال 19:** `System.out.println(CL.contains("hama"));`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة: ب**
**التعليل:** contains("hama") case-sensitive: false. [Collections]

**السؤال 20:** `System.out.println(CL.indexOf("Tartus"));`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة: هـ**
**التعليل:** indexOf("Tartus"): 4. [Collections]

**السؤال 21:** `System.out.println(CL.isEmpty());`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة: ب**
**التعليل:** isEmpty(): false. [Collections]

**السؤال 22:** *(Code execution: `CL.add(4, "Latakia"); CL.remove("Dams"); CL.remove(1);`)* `System.out.println(CL.indexOf("Homs"));`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة: د**
**التعليل:** indexOf("Homs") after operations: 1. [Collections]

**السؤال 23:** `System.out.println(CL.size());`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة: أ**
**التعليل:** Size after operations: 6. [Collections]

---

**المصدر:** [نمط 2023-2024 — Model B]
### السؤال 24–28 (مجموعة أسئلة على نص/كود مشترك)

```java
public class Q4 {
    public static void main(String[] args) {
        String[] S = {"S", "J", "r", "J", "G", "a", "M", "J", "s"};
```

**السؤال 24:** `System.out.println(Stream.of(S).filter(e -> e.length() > 1).max(String::compareTo).get());`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة: أ**
**التعليل:** max > 1 char: none (all 1 char), so 'G'. [Streams]

**السؤال 25:** `System.out.println(Stream.of(S).min(String::compareTo).get());`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة: أ**
**التعليل:** min: 'G'. [Streams]

**السؤال 26:** `System.out.println(Stream.of(S).anyMatch(e -> e.equals("S")));`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة: ب**
**التعليل:** anyMatch("S"): true. [Streams]

**السؤال 27:** `System.out.println(Stream.of(S).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة: د**
**التعليل:** allMatch uppercase: false (has lowercase). [Streams]

**السؤال 28:** `System.out.println(Stream.of(S).map(e -> e.toUpperCase()).distinct().count());`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة: هـ**
**التعليل:** distinct count: 6. [Streams]

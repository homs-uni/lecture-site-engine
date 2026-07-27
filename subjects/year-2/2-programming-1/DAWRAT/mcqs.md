## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

---

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 2:** `return ---- 2 ----;`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 3:** `public ---- 3 ---- isEmpty()`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 4:** `---- 4 ----` (before `toString()` method)
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 5:** `GenericStack<String> stack1 = ---- 5 ---- GenericStack<>() ;`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 6:** `GenericStack<Integer> stack2 = ---- 6 ---- GenericStack<>() ;`
أ) `o`
ب) `boolean`
ج) `E o`
د) `new`
هـ) `@Override`
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 8:** `System.out.println(L.isEmpty());`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 9:** *(Code execution before 9: `L.add(2, "X"); L.remove("M"); L.remove(1);`)* `System.out.println(L.indexOf("D"));`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 10:** `System.out.println(L.indexOf("P"));`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 11:** `System.out.println(L.size());`
أ) `-1`
ب) `5`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 13:** `System.out.println(dList.removeFirst());`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 14:** `System.out.println(dList.removeFirst());`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 15:** `System.out.println(dList);`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 16:** *(Code execution before 16: `ListIterator<String> listiter = dList.listIterator(); while(listiter.hasNext())`)* `System.out.println(listiter.next());`
أ) `Sally`
ب) `Jony`
ج) `[Jony]`
د) `Harry`
هـ) `[Harry]`
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 18:** *(Code execution: `coll.add("1"); coll.add("2"); coll.add("2"); coll.add("4"); coll.remove("1"); boolean b = coll.remove("5");`)* `System.out.println(coll.size());`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 19:** `System.out.println(b);`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 20:** *(Code execution: `b = coll.contains("2");`)* `System.out.println(b);`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 21:** *(Code execution: `b = coll.contains("1");`)* `System.out.println(b);`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 22:** *(Code execution: `coll.remove("4");`)* `System.out.println(coll.size());`
أ) `1`
ب) `0`
ج) `true`
د) `false`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 24:** Number of matches RegExps[1]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 25:** Number of matches RegExps[2]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 26:** Number of matches RegExps[3]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 27:** Number of matches RegExps[4]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 28:** Number of matches RegExps[5]
أ) `1`
ب) `0`
ج) `6`
د) `4`
هـ) `2`
**الإجابة الصحيحة:** 
**التعليل:** 

---

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 30:** `System.out.println(Stream.of(names).min(String::compareTo).get());`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 31:** `System.out.println(Stream.of(names).anyMatch(e -> e.equals("Stacy")));`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 32:** `System.out.println(Stream.of(names).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 33:** `System.out.println(Stream.of(names).noneMatch(e -> e.startsWith("Ko")));`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 34:** `System.out.println(Stream.of(names).map(String::toLowerCase).findFirst().get());`
أ) `true`
ب) `john`
ج) `Alan`
د) `Susan`
هـ) `false`
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 36:** Number of interfaces:
أ) 6
ب) 1
ج) 3
د) 2
هـ) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 37:** Number of different constructors:
أ) 6
ب) 1
ج) 3
د) 2
هـ) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 38:** Possible used package:
أ) awt
ب) swing
ج) text
د) util
هـ) event
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 39:** Number of thread methods:
أ) 6
ب) 1
ج) 3
د) 2
هـ) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 40:** The application stopped after some time.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 42:** Number of buttons:
أ) 1
ب) 2
ج) 3
د) 4
هـ) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 43:** Number of possible action listener:
أ) 1
ب) 2
ج) 3
د) 4
هـ) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 44:** Possible unused package:
أ) awt
ب) swing
ج) text
د) util
هـ) event
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 45:** `principalLabel.setBounds(160, 160, 56, 24);`
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 46:** `dollars = new DecimalFormat("$0.000000");`
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 21 (سهل)
In JSP, `response.setContentType("text/html");` can be avoided
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 22 (سهل)
The word server has only one meaning
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 23 (سهل)
Writing applets requires new java libraries included in JDK
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 24 (متوسط)
_____ is called, the every time the servlet is run
أ) Servlet constructor
ب) init() method
ج) start() method
د) none of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 25 (متوسط)
To form servlet request, we need an object from:
أ) ServletRequest class
ب) PrintWriter class
ج) doPut method
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 26 (سهل)
The servlet engine cannot generate the JSP file
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 27 (متوسط)
Inheriting Thread class
أ) Is same as implementing Runnable interface
ب) is the new way of making threads in java
ج) is worse than implementing Runnable interface
د) is the old way of making threads in java
هـ) A & D
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 28 (متوسط)
Causes a thread to pause temporarily and allow other threads to execute
أ) sleep()
ب) joint()
ج) join()
د) interrupt()
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 29 (متوسط)
For `newCachedThreadPool()` which of the following is false
أ) creates a new thread if all the threads in the pool are not idle
ب) there are tasks waiting for execution
ج) a thread in a cached pool will be terminated if it has not been used for 60 seconds
د) a cached pool is efficient for many short tasks.
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 30 (متوسط)
To use Socket class, we do not need:
أ) The server IP
ب) The port number
ج) MAC address
د) Input Stream
هـ) Output Stream
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 31 (متوسط)
The accept method returns an object of:
أ) ServerSocket
ب) HttpJSPRequest
ج) Client
د) Server
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 32 (متوسط)
The word interface:
أ) is a reserved word in Java
ب) defines high level way for communicating
ج) refers to the methods in a class
د) used in API
هـ) all of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 33 (سهل)
Late binding is same as static binding
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 34 (متوسط)
In late binding, the compiler -during the compile-time-:
أ) determines the type of object
ب) resolves the method
ج) A & B
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 35 (متوسط)
In early binding, the compiler -during the compile-time-:
أ) determines the type of object
ب) resolves the method
ج) A & B
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 36 (متوسط)
Java uses late binding for:
أ) All non final methods
ب) All non private class methods
ج) All non private instance methods
د) A & C
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 38 (متوسط)
Race condition occurs when:
أ) Two processes are reading some isolated data
ب) Two processes are writing some isolated data
ج) A & B
د) A & B with condition that final result based on who runs
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 39 (متوسط)
Swing package, is java classes which is written in:
أ) Java, but platform-dependent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023]
### السؤال 40 (متوسط)
AWT package, is java classes which is written in:
أ) Java, but platform-independent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 2:** `System.out.println(LL.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 3:** *(Code execution: `LinkedList<Object> link = new LinkedList<Object>(LL); link.add(1, "R");`)* `System.out.println(link.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 4:** *(Code execution: `link.removeLast(); link.addFirst("G"); link.remove(0);`)* `System.out.println(link.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 5:** *(Code execution: `link.set(4, 7); link.addLast(6);`)* `System.out.println(link.get(3));`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 6:** `System.out.println(link.get(5));`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 7:** `System.out.println(link.size());`
أ) Run
ب) 6
ج) 5
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 9:** `System.out.println(Stream.of(names).min(String::compareTo).get());`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 10:** `System.out.println(Stream.of(names).anyMatch(e -> e.equals("Stacy")));`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 11:** `System.out.println(Stream.of(names).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 12:** `System.out.println(Stream.of(names).noneMatch(e -> e.startsWith("Ko")));`
أ) false
ب) true
ج) 8
د) sandi
هـ) Haso
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 13:** `System.out.println(Stream.of(names).map(e -> e.toUpperCase()).distinct().count());`
أ) false
ب) true
ج) 7
د) sandi
هـ) Haso
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 15:** Number of matches RegExps[1] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 16:** Number of matches RegExps[2] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 17:** Number of matches RegExps[3] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 18:** Number of matches RegExps[4] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 19:** Number of matches RegExps[5] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 20:** Number of matches RegExps[6] :
أ) 0
ب) 1
ج) 2
د) 3
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

---

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
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 30 (متوسط)
How many ports of TCP/IP are reserved for specific protocols?
أ) 256
ب) 512
ج) 1024
د) Limited by int range
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 31 (متوسط)
Swing package, is java classes which is written in:
أ) Java, but platform-dependent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 32 (متوسط)
AWT package, is java classes which is written in:
أ) Java, but platform-independent
ب) Java, uses OS components
ج) A & B
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 33 (متوسط)
_____ is called, the every time the servlet is run
أ) Servlet constructor
ب) init() method
ج) start() method
د) none of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 34 (متوسط)
To form servlet request, we need an object from:
أ) ServletRequest class
ب) PrintWriter class
ج) doPut method
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 35 (متوسط)
Inheriting Thread class
أ) Is same as implementing Runnable interface
ب) Is the new way of making threads in java
ج) Is worse than implementing Runnable interface
د) Is the old way of making threads in java
هـ) A & D
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 36 (متوسط)
Causes a thread to pause temporarily and allow other threads to execute
أ) sleep()
ب) joint()
ج) join()
د) interrupt()
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 37 (متوسط)
For `newCachedThreadPool()` which of the following is false
أ) creates a new thread if all the threads in the pool are not idle
ب) there are tasks waiting for execution
ج) a thread in a cached pool will be terminated if it has not been used for 60 seconds
د) a cached pool is efficient for many short tasks.
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 38 (متوسط)
To use Socket class, we do not need:
أ) The server IP
ب) The port number
ج) Input Stream
د) Output Stream
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 39 (متوسط)
The accept method returns an object of:
أ) ServerSocket
ب) Server
ج) Client
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 40 (متوسط)
The word interface:
أ) is a reserved word in Java
ب) defines high level way for communicating
ج) refers to the methods in a class
د) used in API
هـ) all of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 41 (سهل)
Late binding likes static binding
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 42 (متوسط)
In late binding, the compiler -during the compile-time-:
أ) resolves the method
ب) determines the type of parameters
ج) determines the type of object
د) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 43 (متوسط)
In early binding, the compiler -during the compile-time-:
أ) determines the type of parameters
ب) determines the type of object
ج) resolves the method
د) B & C
هـ) None of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 44 (سهل)
In JSP, `response.setContentType("text/html");` can be avoided
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 45 (سهل)
The word service has only one meaning
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 46 (سهل)
Writing applets requires new java libraries included in ASP
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2024/2/14]
### السؤال 47 (متوسط)
Java does not uses late binding for:
أ) All non final methods
ب) All non private class methods
ج) All non-private instance methods
د) A & C
هـ) All of the above
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

---

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 2:** Statement evaluation for `while (k <= n1 && k <= n2)`
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 3:** Statement evaluation for `if (n1 % k == 0 || n2 % k == 0)`
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 5:** Statement evaluation for `if (high >= low) return true;`
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 6:** Statement evaluation for `System.out.println(isPalindrome("moon", 0, 4));`
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 8:** `System.out.println(CL.indexOf("Denver"));`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 9:** `System.out.println(CL.isEmpty());`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 10:** *(Code execution: `CL.add(2, "Xian"); CL.remove("Miami"); CL.remove(1);`)* `System.out.println(CL.indexOf("Denver"));`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 11:** `System.out.println(CL.size());`
أ) -1
ب) 5
ج) true
د) false
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 13:** `System.out.println(Stream.of(S).min(String::compareTo).get());`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 14:** `System.out.println(Stream.of(S).anyMatch(e -> e.equals("S")));`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 15:** `System.out.println(Stream.of(S).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 16:** `System.out.println(Stream.of(S).map(e -> e.toUpperCase()).distinct().count());`
أ) false
ب) true
ج) 8
د) r
هـ) A
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 18:** *(Code execution: `coll.add("H"); coll.add("T"); coll.add("H"); coll.add("S"); coll.remove("H"); boolean b = coll.remove("Tom");`)* `System.out.println(coll.size());`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 19:** `System.out.println(b);`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 20:** *(Code execution: `b = coll.contains("S");`)* `System.out.println(b);`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 21:** *(Code execution: `b = coll.contains("H");`)* `System.out.println(b);`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 22:** *(Code execution: `coll.remove("S");`)* `System.out.println(coll.size());`
أ) 1
ب) 0
ج) true
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 24:** Number of matches RegExps[1]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 25:** Number of matches RegExps[2]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 26:** Number of matches RegExps[3]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 27:** Number of matches RegExps[4]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 28:** Number of matches RegExps[5]
أ) 1
ب) 0
ج) 6
د) 3
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

---

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 30:** Which class is used to manage multiple threads in the code?
أ) Thread
ب) Future
ج) HttpURLConnection
د) ExecutorService
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 31:** What method of HttpURLConnection is used to set the request method to POST?
أ) setRequestProperty()
ب) setRequestMethod()
ج) setDoOutput()
د) connect()
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 32:** What is the role of OutputStream in the provided code?
أ) To calculate the area of the square
ب) To read the server response
ج) To create a URL connection
د) To write data to the server
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 33:** How is the calculated area passed to the server?
أ) As a URL parameter
ب) As a query string
ج) As a header in the HTTP request
د) As form data in the POST request
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 34:** What does the `future.get()` method do in the code?
أ) Executes a new thread
ب) Establishes a URL connection
ج) Retrieves the result of the area calculation
د) Sends the POST request to the server
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 35:** Which method is used to close the OutputStream and BufferedReader?
أ) disconnect()
ب) close()
ج) shutdown()
د) finish()
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 36:** What is the default HTTP request method used by HttpURLConnection if not set explicitly?
أ) POST
ب) PUT
ج) GET
د) DELETE
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 37:** Which interface represents the task that calculates the area of the square?
أ) Runnable
ب) Executor
ج) Callable
د) Future
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 38:** What does the `connection.setDoOutput(true)` call do?
أ) It enables input stream for the connection.
ب) It specifies the request method.
ج) It allows sending data to the server.
د) It sets the connection timeout.
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 39:** In the context of URL connections, what does the term 'POST' signify?
أ) It retrieves data from the server.
ب) It updates existing data on the server.
ج) It sends data to the server.
د) It deletes data from the server.
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 40:** What is the type of the `calculateArea` variable in the code?
أ) Runnable
ب) Future<Integer>
ج) Callable<Integer>
د) ExecutorService
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 41:** What does `connection.getInputStream()` return?
أ) A stream for sending data to the server.
ب) A stream for writing the area calculation.
ج) A stream for receiving data from the server.
د) A stream for configuring the connection.
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 42:** What happens if the `calculateArea` task throws an exception?
أ) The executor shuts down.
ب) The program terminates immediately.
ج) The exception is caught in the catch block of the lambda expression.
د) The exception is thrown when calling `future.get()`.
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 43:** Which of the following statements about ExecutorService is true?
أ) It creates a new thread for each task.
ب) It immediately runs tasks in the main thread.
ج) It manages a pool of threads for executing tasks.
د) It is used only for single-threaded tasks.
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 44:** How is the server response read in the code?
أ) Using OutputStream and InputStream
ب) Using BufferedReader and InputStream
ج) Directly from the HttpURLConnection object
د) Using a Socket object
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 45:** What does the `connection.disconnect()` method do?
أ) It closes the InputStream.
ب) It stops the thread execution.
ج) It terminates the URL connection.
د) It releases the thread pool resources.
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 46:** What type of HTTP request is used in the code to send data to the server?
أ) GET
ب) PUT
ج) POST
د) DELETE
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 47:** What does the BufferedReader object do with the server response?
أ) It writes the response to the server.
ب) It calculates the area of the square.
ج) It appends the response to a StringBuilder.
د) It sets up the HTTP connection.
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 48:** What would likely happen if HttpURLConnection was not set with `setDoOutput(true)`?
أ) The request would default to GET.
ب) The server would not accept the POST data.
ج) The connection would close immediately.
د) The code would fail to compile.
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 2:** Redefining the withdraw method in the CheckingAccount class is an example of overloading
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 3:** In order to test polymorphism, deposit method must be used in the program.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 4:** Five different nonconstructor methods can be invoked by a SavingsAccount object.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 5:** correctly implements the default constructor of the SavingsAccount class `super()`.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 6:** correct implementation of the constructor with parameters in the SavingsAccount class is:
```java
balance = acctB;
interestRate = rate;
```
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 8:** *(Code execution: `coll.add("H"); coll.add("T"); coll.add("T"); coll.add("H"); coll.remove("H"); boolean b = coll.remove("Tom");`)* `System.out.println(coll.size());`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 9:** `System.out.println(b);`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 10:** *(Code execution: `b = coll.contains("S");`)* `System.out.println(b);`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 11:** *(Code execution: `b = coll.contains("H");`)* `System.out.println(b);`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 12:** *(Code execution: `coll.remove("S");`)* `System.out.println(coll.size());`
أ) true
ب) 1
ج) 0
د) false
هـ) 2
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 14:** Number of matches RegExps[1]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 15:** Number of matches RegExps[2]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 16:** Number of matches RegExps[3]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 17:** Number of matches RegExps[4]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 18:** Number of matches RegExps[5]
أ) 3
ب) 4
ج) 6
د) 0
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 20:** `System.out.println(CL.indexOf("Tartus"));`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 21:** `System.out.println(CL.isEmpty());`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 22:** *(Code execution: `CL.add(4, "Latakia"); CL.remove("Dams"); CL.remove(1);`)* `System.out.println(CL.indexOf("Homs"));`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 23:** `System.out.println(CL.size());`
أ) 6
ب) false
ج) true
د) 1
هـ) 4
**الإجابة الصحيحة:** 
**التعليل:** 

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
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 25:** `System.out.println(Stream.of(S).min(String::compareTo).get());`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 26:** `System.out.println(Stream.of(S).anyMatch(e -> e.equals("S")));`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 27:** `System.out.println(Stream.of(S).allMatch(e -> Character.isUpperCase(e.charAt(0))));`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 28:** `System.out.println(Stream.of(S).map(e -> e.toUpperCase()).distinct().count());`
أ) G
ب) true
ج) 4
د) false
هـ) 6
**الإجابة الصحيحة:** 
**التعليل:** 

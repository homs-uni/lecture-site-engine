# المحاضرة 6 — واجهة المستخدم الرسومية (GUI): Java Swing و JavaFX

> **المادة:** البرمجة المتقدمة 1 (القسم النظري) | **الموضوع:** بناء واجهات المستخدم الرسومية باستخدام `java.awt`، `javax.swing`، و`JavaFX` — الأحداث والتخطيطات والتحريك

---

## الجزء الأول: الشرح التفصيلي

> **مهم**: الأقسام مرقّمة هرمياً. كل موضوع يبدأ بـ «النص الأصلي يقول» ثم «الشرح المبسّط».

---

### 1. مقدمة في واجهات المستخدم الرسومية (GUI)

#### النص الأصلي يقول:
> "A GUI (Graphical User Interface) allows users to interact with a program through graphical components like buttons, text fields, and labels. Events fired by user actions are handled by the program."

#### الشرح المبسّط:
الـ `GUI` هو الجسر بين المستخدم والبرنامج — بدلاً من كتابة أوامر نصية، يضغط المستخدم أزراراً وتُملأ حقول نصية. عند الضغط على زر تنشأ **حدث** (`event`) يتلقاه البرنامج ويتعامل معه من خلال **معالج الحدث** (`event handler`).

**لماذا؟** لأن المستخدم العادي لا يعرف كتابة أوامر — الـ `GUI` يجعل البرنامج قابلاً للاستخدام لأي شخص.

💡 **التشبيه:**
> تخيّل لوحة تحكم طائرة — الطيار يضغط أزراراً ومفاتيح بدلاً من كتابة أوامر. **وجه الشبه:** الزر = مكوّن `GUI`، اليد التي تضغط = المستخدم، رد فعل الطائرة = `event handler`.

#### مثال من الامتحان:
> "In a GUI program, what is the role of an event handler?"
> **كيف يُختبر هذا في الامتحان؟** سؤال MCQ نظري — يختبر فهم العلاقة بين المكوّنات الثلاثة: مصدر الحدث، كائن الحدث، معالج الحدث.

---

### 1.1 المكتبتان الأساسيتان: `java.awt` و `javax.swing`

#### النص الأصلي يقول:
> Unit-1: `Java.awt` — `javax.Swing`

#### الشرح المبسّط:
- `java.awt` (Abstract Window Toolkit): المكتبة الأولى لبناء `GUI` في جافا، تعتمد على مكوّنات النظام التشغيلي المحلية.
- `javax.swing`: طبقة أحدث فوق `AWT`، توفر مكوّنات أكثر (`JFrame`، `JButton`، `JLabel`…) مستقلة عن النظام التشغيلي وقابلة للتخصيص.

**لماذا؟** `swing` تُشكّل المعيار الفعلي لتطبيقات سطح المكتب في جافا لأنها أغنى وأكثر استقراراً من `AWT`.

#### مثال من الامتحان:
> "Which package contains `JFrame` and `JButton`?"
> **كيف يُختبر؟** MCQ مباشر — `javax.swing`.

---

### 2. الوحدة الأولى: `javax.swing` — مربعات الحوار (`JOptionPane`)

#### النص الأصلي يقول:
> استخدام `JOptionPane.showInputDialog` و `JOptionPane.showMessageDialog` مع أنواع الرسائل: `ERROR_MESSAGE`, `INFORMATION_MESSAGE`, `WARNING_MESSAGE`, `QUESTION_MESSAGE`, `PLAIN_MESSAGE`.

#### الشرح المبسّط:
`JOptionPane` يوفر نوافذ حوار جاهزة — حوار إدخال يسمح للمستخدم بكتابة قيمة، وحوار رسالة يعرض نتيجة أو تحذيراً. لكل نوع رسالة أيقونة مميزة.

💡 **التشبيه:**
> `JOptionPane` مثل رسائل WhatsApp المنبثقة — تخبرك بشيء أو تطلب منك ردًّا.
> **وجه الشبه:** `showMessageDialog` = رسالة إعلامية، `showInputDialog` = رسالة تطلب ردًّا.

#### 💻 الكود: مثال JOptionPane — جمع 10 أعداد

#### ما هذا الكود؟
> برنامج يطلب 10 أعداد صحيحة عبر نافذة إدخال ويعرض مجموعها في نافذة رسالة.

```java
import javax.swing.*;  // import Swing library for dialog boxes

public class Sum {
    public static void main(String[] args) {
        String s;       // to hold user input string
        int sum = 0;    // accumulator for sum
        int i = 0;      // loop counter

        while (i < 10) {  // loop 10 times
            // show input dialog and capture user response
            s = JOptionPane.showInputDialog("Enter an integer:");
            int x = Integer.parseInt(s);  // convert string to int
            sum = sum + x;  // add to sum
            i = i + 1;      // increment counter
        }

        // display result in an information dialog
        JOptionPane.showMessageDialog(null, sum, "SUM",
                JOptionPane.INFORMATION_MESSAGE);
    }
}
```

#### شرح كل سطر:
1. `import javax.swing.*` → استيراد كل مكوّنات Swing بما فيها `JOptionPane`
2. `String s` → متغيّر لتخزين النص المُدخَل من المستخدم
3. `int sum = 0` → تهيئة المجموع بالصفر قبل الحلقة
4. `while (i < 10)` → تكرار 10 مرات بالضبط
5. `JOptionPane.showInputDialog(...)` → نافذة إدخال تعيد `String`
6. `Integer.parseInt(s)` → تحويل النص إلى عدد صحيح
7. `sum = sum + x` → تراكم المجموع
8. `JOptionPane.showMessageDialog(null, sum, "SUM", ...)` → عرض النتيجة

**المكتبات المطلوبة:**
> `import javax.swing.*;`

**الناتج المتوقع:**
> نافذة إدخال تتكرر 10 مرات ← نافذة رسالة تعرض المجموع (مثلاً: 340)

#### جدول أنواع رسائل `JOptionPane`:

| النوع | الأيقونة | الوصف |
|---|---|---|
| `ERROR_MESSAGE` | ❌ | خطأ |
| `INFORMATION_MESSAGE` | ℹ️ | معلومة |
| `WARNING_MESSAGE` | ⚠️ | تحذير |
| `QUESTION_MESSAGE` | ❓ | سؤال يتطلب رداً |
| `PLAIN_MESSAGE` | لا أيقونة | رسالة بسيطة |

#### مثال من الامتحان:
> "What does `Integer.parseInt(s)` do in the Sum program?"
> **كيف يُختبر؟** MCQ تطبيقي — يختبر فهم التحويل من `String` إلى `int`.

---

### 3. بناء نافذة `JFrame` مع `ActionListener`

#### النص الأصلي يقول:
> `public class FahrConvert extends JFrame implements ActionListener` — GUI Example-1: تحويل فهرنهايت إلى سيلزيوس.

#### الشرح المبسّط:
النمط الأساسي لبناء `GUI` في `Swing`:
1. الكلاس يرث (`extends`) من `JFrame` ليصبح نافذة.
2. ينفّذ (`implements`) واجهة `ActionListener` ليستطيع الاستجابة لضغطات الأزرار.
3. المكوّنات (`JLabel`، `JTextField`، `JButton`) تُعلَن كـ fields في الكلاس.
4. في البنّاء: تُضاف المكوّنات إلى `ContentPane` وتُسجَّل المعالجات.

**لماذا؟** الكلاس نفسه هو المعالج (`this`) مما يبسّط ربط الزر بالاستجابة.

#### ⚙️ الخطوات / الخوارزمية: بناء نافذة Swing أساسية

> هدف هذه العملية: إنشاء نافذة تفاعلية تستجيب لضغطة زر.

```algorithm
1 | تعريف الكلاس | `extends JFrame implements ActionListener` | الكلاس يصبح نافذة ومعالجاً في آن واحد
2 | تعريف المكوّنات | `JLabel, JTextField, JButton` | كـ fields لتكون مشتركة بين الدوال
3 | البنّاء | `getContentPane().setLayout(...)` | تحديد طريقة ترتيب المكوّنات
4 | تسجيل المعالج | `button.addActionListener(this)` | ربط الزر بالكلاس نفسه كمعالج
5 | إضافة المكوّنات | `getContentPane().add(component)` | إضافة كل مكوّن للنافذة
6 | إعداد الإغلاق | `setDefaultCloseOperation(EXIT_ON_CLOSE)` | إيقاف البرنامج عند إغلاق النافذة
7 | تنفيذ `actionPerformed` | `public void actionPerformed(ActionEvent e)` | منطق الاستجابة للضغط
8 | في `main` | `new FahrConvert(); fahr.setSize(); fahr.setVisible(true)` | إنشاء النافذة وإظهارها
```

#### نقاط التنفيذ:
- يجب استيراد `java.awt.*`, `java.awt.event.*`, `javax.swing.*`
- `setVisible(true)` يجب أن يُستدعى أخيراً
- `outCel.setEditable(false)` يمنع المستخدم من تعديل حقل الإخراج

#### 💻 الكود: FahrConvert — تحويل فهرنهايت إلى سيلزيوس

#### ما هذا الكود؟
> نافذة تأخذ درجة حرارة بالفهرنهايت وتعرض مكافئها بالسيلزيوس.

```java
import java.awt.*;          // for layout managers and containers
import java.awt.event.*;    // for ActionEvent and ActionListener
import javax.swing.*;       // for JFrame, JLabel, JTextField, JButton

public class FahrConvert extends JFrame implements ActionListener {
    // Declare GUI components as class fields
    JLabel title   = new JLabel("Convert Fahrenheit to Celsius");
    JLabel inLabel  = new JLabel("Fahrenheit ");
    JLabel outLabel = new JLabel("Celsius ");
    JTextField inFahr = new JTextField(7);   // input field, 7 chars wide
    JTextField outCel = new JTextField(7);   // output field
    JButton butt = new JButton("Convert");   // trigger button

    int fahrTemp;   // stores fahrenheit value
    int celsTemp;   // stores celsius result

    FahrConvert() {
        getContentPane().setLayout(new FlowLayout()); // arrange left-to-right
        butt.addActionListener(this);  // register this class as listener
        // Add all components to the content pane
        getContentPane().add(title);
        getContentPane().add(inLabel);
        getContentPane().add(outLabel);
        getContentPane().add(inFahr);
        getContentPane().add(outCel);
        getContentPane().add(butt);
        outCel.setEditable(false);  // user cannot type in output field
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    // Conversion logic
    public void convert() {
        celsTemp = ((fahrTemp - 32) * 5) / 9;  // fahrenheit to celsius formula
    }

    // Called when button is clicked
    public void actionPerformed(ActionEvent evt) {
        String userIn = inFahr.getText();          // read text from field
        fahrTemp = Integer.parseInt(userIn);       // convert to int
        convert();                                  // perform calculation
        outCel.setText(celsTemp + " ");            // display result
    }

    public static void main(String[] args) {
        FahrConvert fahr = new FahrConvert();
        fahr.setSize(200, 150);   // window size in pixels
        fahr.setVisible(true);    // show window
    }
}
```

#### شرح كل سطر:
1. `extends JFrame` → الكلاس يرث خصائص النافذة
2. `implements ActionListener` → الكلاس يلتزم بتنفيذ `actionPerformed`
3. `new JTextField(7)` → حقل نص بعرض 7 أحرف
4. `getContentPane().setLayout(new FlowLayout())` → ترتيب المكوّنات تسلسلياً من اليسار
5. `butt.addActionListener(this)` → ربط الزر بهذا الكلاس كمستمع
6. `outCel.setEditable(false)` → الحقل للقراءة فقط
7. `actionPerformed(ActionEvent evt)` → الدالة المطلوبة بواسطة `ActionListener`
8. `inFahr.getText()` → قراءة ما كتبه المستخدم
9. `outCel.setText(...)` → عرض النتيجة في الحقل

**المكتبات المطلوبة:**
> `import java.awt.*; import java.awt.event.*; import javax.swing.*;`

**الناتج المتوقع:**
> نافذة 200×150 بيكسل تحتوي حقلين ونص عنوان وزر — عند الإدخال والضغط تظهر النتيجة.

#### مثال من الامتحان:
> "What interface must a class implement to handle button click events in Swing?"
> **كيف يُختبر؟** MCQ أو نظري — الإجابة: `ActionListener`.

---

### 4. التخطيطات (Layout Managers) في Swing

#### النص الأصلي يقول:
> استخدام `FlowLayout`، `BoxLayout`، و`null` layout في الأمثلة المختلفة.

#### الشرح المبسّط:
`Layout Manager` هو المسؤول عن كيفية ترتيب المكوّنات داخل النافذة — يحدد مكان وحجم كل عنصر تلقائياً (أو يتركك تحدده يدوياً مع `null`).

**لماذا؟** بدون `Layout Manager` ستحتاج لتحديد إحداثيات كل مكوّن يدوياً وهذا مرهق جداً.

| Layout | الوصف | الاستخدام |
|---|---|---|
| `FlowLayout` | يرتب المكوّنات أفقياً ويلتف للسطر التالي | أبسط تخطيط — افتراضي لـ `JPanel` |
| `BoxLayout.Y_AXIS` | يرتب عمودياً | عمود من المكوّنات |
| `BoxLayout.X_AXIS` | يرتب أفقياً | صف من المكوّنات |
| `null` | لا تخطيط — تحديد يدوي للإحداثيات | `setBounds(x, y, w, h)` |
| `GridLayout` | شبكة صفوف وأعمدة | جداول |

#### 💻 الكود: PhonePrice — استخدام `BoxLayout` و `JPanel`

#### ما هذا الكود؟
> تطبيق يحسب السعر الإجمالي مع ضريبة، يستخدم `BoxLayout` لترتيب عمودي و`JPanel` لتجميع كل صف.

```java
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class PhonePrice extends JFrame implements ActionListener {
    JLabel title  = new JLabel("Calculate Tax");
    JLabel pLabel = new JLabel("Enter Price of Phone: ");
    JLabel rLabel = new JLabel("Enter Tax rate: ");
    JLabel tLabel = new JLabel("Total Price: ");
    JTextField p = new JTextField(7);   // price input
    JTextField r = new JTextField(7);   // rate input
    JTextField t = new JTextField(7);   // result output
    JButton cal = new JButton("Calculate");
    JPanel pPanel = new JPanel();  // panel for price row
    JPanel rPanel = new JPanel();  // panel for rate row
    JPanel tPanel = new JPanel();  // panel for total row
    int price;
    int rate;
    double total;

    public PhonePrice() {
        setTitle("Phone Taxes");
        t.setEditable(false);  // output only
        // Set vertical layout for main content pane
        getContentPane().setLayout(
            new BoxLayout(getContentPane(), BoxLayout.Y_AXIS));

        // Add label+field pairs to their panels
        pPanel.add(pLabel); pPanel.add(p);
        rPanel.add(rLabel); rPanel.add(r);
        tPanel.add(tLabel); tPanel.add(t);

        // Add panels to main window
        getContentPane().add(title);
        getContentPane().add(pPanel);
        getContentPane().add(rPanel);
        getContentPane().add(tPanel);
        getContentPane().add(cal);
        cal.addActionListener(this);
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    public void calcTax() {
        total = ((price * rate) / 100.0) + price;  // calculate total with tax
    }

    public void actionPerformed(ActionEvent evt) {
        String userIn;
        userIn = p.getText();
        price = Integer.parseInt(userIn);  // parse price
        userIn = r.getText();
        rate  = Integer.parseInt(userIn);  // parse rate
        calcTax();
        t.setText(total + " ");  // display total
    }

    public static void main(String[] args) {
        PhonePrice fatApp = new PhonePrice();
        fatApp.setSize(300, 225);
        fatApp.setVisible(true);
    }
}
```

#### شرح كل سطر:
1. `JPanel pPanel = new JPanel()` → لوحة تجمع التسمية والحقل في صف واحد
2. `BoxLayout(getContentPane(), BoxLayout.Y_AXIS)` → ترتيب عمودي للـ`panels`
3. `pPanel.add(pLabel); pPanel.add(p)` → اللوحة تحتوي التسمية والحقل جنباً إلى جنب
4. `calcTax()` → `((price * rate) / 100.0) + price` — ضرب السعر في النسبة المئوية

#### مثال من الامتحان:
> "What layout arranges components vertically in Swing?"
> **كيف يُختبر؟** MCQ — `BoxLayout.Y_AXIS`.

---

### 5. `null` Layout وتحديد الإحداثيات اليدوي (`setBounds`)

#### النص الأصلي يقول:
> GUI Example-3: `contentPane.setLayout(null)` — `cartonsJLabel.setBounds(16, 16, 130, 21)`

#### الشرح المبسّط:
عند استخدام `null` كـ`Layout`، المبرمج يتحكم في مكان وحجم كل مكوّن يدوياً عبر `setBounds(x, y, width, height)`. هذا يُعطي تحكماً كاملاً لكن يجعل النافذة لا تتكيّف مع تغيير الحجم.

**لماذا؟** بعض التصاميم تتطلب إحداثيات دقيقة، لكن `null` layout يُصعّب إعادة التحجيم التلقائي.

#### 💻 الكود: Inventory3 — null layout مع KeyListener

#### ما هذا الكود؟
> تطبيق مخزون يحسب إجمالي العناصر، يستخدم `null` layout، `setBounds` للتحكم الدقيق، و`KeyListener` لمسح النتيجة عند الكتابة.

```java
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Inventory3 extends JFrame {
    private JLabel  cartonsJLabel;
    private JTextField cartonsJTextField;
    private JLabel  itemsJLabel;
    private JTextField itemsJTextField;
    private JLabel  totalJLabel;
    private JTextField totalResultJTextField;
    private JButton calculateJButton;

    public Inventory3() {
        createUserInterface();  // delegate UI setup to a method
    }

    public void createUserInterface() {
        Container contentPane = getContentPane();
        contentPane.setLayout(null);  // manual positioning

        cartonsJLabel = new JLabel();
        cartonsJLabel.setText("Cartons per shipment:");
        cartonsJLabel.setBounds(16, 16, 130, 21);  // x=16, y=16, w=130, h=21
        contentPane.add(cartonsJLabel);

        cartonsJTextField = new JTextField();
        cartonsJTextField.setText("0");
        cartonsJTextField.setBounds(148, 16, 40, 21);
        cartonsJTextField.setHorizontalAlignment(JTextField.RIGHT);
        contentPane.add(cartonsJTextField);

        // Clear result when user types in cartons field
        cartonsJTextField.addKeyListener(new KeyAdapter() {
            public void keyPressed(KeyEvent event) {
                cartonsJTextFieldKeyPressed(event);
            }
        });

        itemsJLabel = new JLabel();
        itemsJLabel.setText("Items per carton:");
        itemsJLabel.setBounds(16, 48, 104, 21);
        contentPane.add(itemsJLabel);

        itemsJTextField = new JTextField();
        itemsJTextField.setText("0");
        itemsJTextField.setBounds(148, 48, 40, 21);
        itemsJTextField.setHorizontalAlignment(JTextField.RIGHT);
        contentPane.add(itemsJTextField);

        itemsJTextField.addKeyListener(new KeyAdapter() {
            public void keyPressed(KeyEvent event) {
                itemsJTextFieldKeyPressed(event);
            }
        });

        totalJLabel = new JLabel();
        totalJLabel.setText("Total:");
        totalJLabel.setBounds(204, 16, 40, 21);
        contentPane.add(totalJLabel);

        totalResultJTextField = new JTextField();
        totalResultJTextField.setBounds(244, 16, 86, 21);
        totalResultJTextField.setHorizontalAlignment(JTextField.RIGHT);
        totalResultJTextField.setEditable(false);  // output only
        contentPane.add(totalResultJTextField);

        calculateJButton = new JButton();
        calculateJButton.setText("Calculate Total");
        calculateJButton.setBounds(204, 48, 126, 24);
        contentPane.add(calculateJButton);

        // Anonymous inner class for button action
        calculateJButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent event) {
                calculateJButtonActionPerformed(event);
            }
        });

        setTitle("Inventory");
        setSize(354, 112);
        setVisible(true);
    }

    private void calculateJButtonActionPerformed(ActionEvent event) {
        int cartons = Integer.parseInt(cartonsJTextField.getText());
        int items   = Integer.parseInt(itemsJTextField.getText());
        int result  = cartons * items;                     // multiplication
        totalResultJTextField.setText(String.valueOf(result));
    }

    private void cartonsJTextFieldKeyPressed(KeyEvent event) {
        totalResultJTextField.setText("");  // clear output when input changes
    }

    private void itemsJTextFieldKeyPressed(KeyEvent event) {
        totalResultJTextField.setText("");  // clear output when input changes
    }

    public static void main(String[] args) {
        Inventory3 application = new Inventory3();
        application.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
```

#### شرح كل سطر:
1. `contentPane.setLayout(null)` → إلغاء التخطيط التلقائي — ترتيب يدوي
2. `setBounds(16, 16, 130, 21)` → x=16، y=16، عرض=130، ارتفاع=21 بيكسل
3. `new KeyAdapter()` → فئة مجهولة داخلية تنفّذ `KeyListener` بطريقة مختصرة
4. `setEditable(false)` → حقل الإجمالي للعرض فقط
5. `String.valueOf(result)` → تحويل العدد الصحيح لنص للعرض في الحقل

#### نقطة مهمة ⚠️:
> `KeyAdapter` هي كلاس مجردة (`abstract class`) توفر تنفيذاً فارغاً لكل دوال `KeyListener` — لا تحتاج لتنفيذ كل الدوال، فقط ما تحتاجه.

---

### 6. `Anonymous Inner Classes` لمعالجة الأحداث

#### النص الأصلي يقول:
> `calculateJButton.addActionListener(new ActionListener() { public void actionPerformed(ActionEvent event) { calculateJButtonActionPerformed(event); } });`

#### الشرح المبسّط:
بدلاً من تعريف كلاس منفصل للمعالج، نُعرّفه مباشرة في مكان الاستخدام. هذا يُسمّى `Anonymous Inner Class` — كلاس بلا اسم يُعرَّف ويُنشأ في نفس السطر.

**لماذا؟** يُقلّل عدد الكلاسات المنفصلة ويجعل الكود أقرب لمكان الاستخدام.

💡 **التشبيه:**
> مثل توقيع عقد مرة واحدة في موقع العمل بدلاً من الذهاب لمكتب منفصل لتوقيعه. **وجه الشبه:** `anonymous class` = العقد المُوقَّع في الموقع.

**الفهم الخاطئ ❌:** `new ActionListener()` ينشئ كائناً من واجهة
**الفهم الصحيح ✅:** ينشئ كائناً من `anonymous class` تنفّذ `ActionListener`

#### مثال من الامتحان:
> "What is an anonymous inner class in the context of event handling?"
> **كيف يُختبر؟** سؤال نظري أو MCQ مقارنة.

---

### 7. `JSpinner`, `JTextArea`, `JScrollPane` — مثال Interest Calculator

#### النص الأصلي يقول:
> GUI Example-8: `JSpinner yearsJSpinner = new JSpinner(new SpinnerNumberModel(1, 1, 10, 1))` — `JScrollPane accountJScrollPane = new JScrollPane(accountJTextArea)`

#### الشرح المبسّط:
- `JSpinner`: مكوّن لاختيار قيمة رقمية بالضغط على أسهم أعلى/أسفل. `SpinnerNumberModel(initial, min, max, step)`.
- `JTextArea`: منطقة نص متعددة الأسطر للعرض.
- `JScrollPane`: غلاف يضيف شريط تمرير لأي مكوّن يتجاوز حجمه.
- `ChangeListener`: مستمع لتغيّرات `JSpinner` (عبر `stateChanged`).

**لماذا؟** `JSpinner` يمنع إدخال قيم خارج النطاق المسموح — أفضل من `JTextField` للقيم المحددة.

#### 🔍 تتبع التنفيذ: عملية حساب الفائدة

**المدخل:** أصل = 10000، معدل = 5%، سنوات = 10

| الخطوة | العملية | القيمة |
|---|---|---|
| 1 | قراءة المدخلات | principal=10000, rate=5, year=10 |
| 2 | حلقة count=1 | amount = 10000 × (1+0.05)^1 = 10500 |
| 3 | count=2 | amount = 10000 × 1.05^2 = 11025 |
| 5 | count=5 | amount ≈ 12762.82 |
| 10 | count=10 | amount ≈ 16288.95 |

**النتيجة:** 10 صفوف في `JTextArea` تعرض رصيد كل سنة

#### مثال من الامتحان:
> "What does `SpinnerNumberModel(1, 1, 10, 1)` mean?"
> **كيف يُختبر؟** MCQ تطبيقي — initial=1, min=1, max=10, step=1.

---

### 8. `JRadioButton` و `ButtonGroup` — مثال Student Grades

#### النص الأصلي يقول:
> `ButtonGroup displayButtonGroup = new ButtonGroup()` — `numericJRadioButton.setSelected(true)` — `displayButtonGroup.add(numericJRadioButton)`

#### الشرح المبسّط:
`JRadioButton` يسمح باختيار خيار واحد فقط من مجموعة — يجب تجميعها في `ButtonGroup` حتى تعمل بشكل حصري (اختيار واحد يُلغي الباقي تلقائياً).

**لماذا؟** `ButtonGroup` تربط الأزرار معاً منطقياً — بدونها كل زر يعمل بشكل مستقل.

#### جدول المكوّنات الجديدة في Student Grades:

| المكوّن | الدور | ملاحظة |
|---|---|---|
| `JRadioButton` | خيار من مجموعة | يجب إضافته لـ `ButtonGroup` |
| `ButtonGroup` | يضمن الاختيار الحصري | لا يُضاف للنافذة مباشرة |
| `JTextArea` | عرض بيانات متعددة الأسطر | يدعم `append()` |
| `TitledBorder` | إطار بعنوان حول `JPanel` | من `javax.swing.border` |
| `2D Array` | تخزين درجات الطلاب | `studentGrades[10][3]` |

**الفهم الخاطئ ❌:** إضافة `ButtonGroup` مباشرة للنافذة
**الفهم الصحيح ✅:** `ButtonGroup` تُضاف إليها الأزرار فقط — لا تُضاف هي للنافذة

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ما الفرق بين `numericJRadioButton.isSelected()` و `numericJRadioButton.setSelected(true)`؟
> **لماذا هذا مهم؟** `isSelected()` للقراءة في `actionPerformed`، `setSelected(true)` للتهيئة في البنّاء.

#### مثال من الامتحان:
> "Why must `JRadioButton` components be added to a `ButtonGroup`?"
> **كيف يُختبر؟** سؤال نظري — لضمان الاختيار الحصري.

---

### 9. `DecimalFormat` وتنسيق الأرقام

#### النص الأصلي يقول:
> `DecimalFormat dollars = new DecimalFormat("$0.00")` — `grossWagesJTextField.setText(dollars.format(wages))`

#### الشرح المبسّط:
`DecimalFormat` تُنسّق الأرقام وفق نمط محدد — `"$0.00"` تعني: أضف رمز الدولار، خانة واحدة قبل العلامة العشرية على الأقل، وخانتان بعدها دائماً.

**لماذا؟** للعرض الاحترافي للمبالغ المالية — `wages` قد يكون `3800.0` فيصبح `$3800.00`.

**المكتبات المطلوبة:**
> `import java.text.*;` أو `import java.text.DecimalFormat;`

#### مثال من الامتحان:
> "What output does `new DecimalFormat("$0.00").format(3800)` produce?"
> **كيف يُختبر؟** MCQ تتبّع — الإجابة: `$3800.00`.

---

### 10. `JTextArea.append()` و لعبة Craps (CrapsGame)

#### النص الأصلي يقول:
> GUI Example-9: `CrapsGame` — استخدام `ImageIcon` لعرض صور النرد، `switch(sumOfDice)` لتحديد الفائز، و`playJButton`/`rollJButton` بتفعيل وتعطيل متبادل.

#### الشرح المبسّط:
لعبة النرد تُوضّح:
1. استخدام `ImageIcon` لتحميل صور (`die1.png`).
2. استخدام `switch` للتعامل مع حالات متعددة.
3. تفعيل/تعطيل الأزرار بـ `setEnabled(true/false)` للتحكم في تدفق اللعبة.
4. `TitledBorder` لعرض نقطة اللاعب الحالية.

#### جدول قواعد لعبة Craps:

| النتيجة الأولى | الحكم |
|---|---|
| 7 أو 11 | فوز فوري |
| 2، 3، أو 12 | خسارة فورية ("craps") |
| 4، 5، 6، 8، 9، أو 10 | تُصبح "النقطة" — اللف مجدداً |

| عند اللف مجدداً | الحكم |
|---|---|
| مطابقة النقطة | فوز |
| 7 | خسارة |
| غير ذلك | استمر |

#### 💻 الكود: جزء منطق CrapsGame

#### ما هذا الكود؟
> منطق اللعب الأول والاستمرار في لعبة النرد.

```java
private void playJButtonActionPerformed(ActionEvent event) {
    // Reset point display
    pointDie1JLabel.setIcon(null);
    pointDie2JLabel.setIcon(null);
    pointDiceTitledBorder.setTitle("Point");
    pointDiceJPanel.repaint();  // refresh the panel

    int sumOfDice = rollDice();  // roll both dice

    switch (sumOfDice) {
        case 7:   // LUCKY_SEVEN
        case 11:  // YO_LEVEN
            resultJTextField.setText("You win!!!");  // instant win
            break;
        case 2:   // SNAKE_EYES
        case 3:   // TREY
        case 12:  // BOX_CARS
            resultJTextField.setText("Sorry, you lose.");  // instant loss
            break;
        default:
            myPoint = sumOfDice;  // set the point value
            resultJTextField.setText("Roll again!");
            // Show point dice images
            pointDie1JLabel.setIcon(die1JLabel.getIcon());
            pointDie2JLabel.setIcon(die2JLabel.getIcon());
            pointDiceTitledBorder.setTitle("Point is " + sumOfDice);
            pointDiceJPanel.repaint();
            playJButton.setEnabled(false);   // disable play
            rollJButton.setEnabled(true);    // enable roll
    }
}

private int rollDice() {
    int die1 = 1 + randomObject.nextInt(6);  // random 1-6
    int die2 = 1 + randomObject.nextInt(6);
    displayDie(die1JLabel, die1);  // show die image
    displayDie(die2JLabel, die2);
    return die1 + die2;  // return sum
}
```

#### مثال من الامتحان:
> "In the CrapsGame, what does `rollJButton.setEnabled(false)` achieve?"
> **كيف يُختبر؟** MCQ تطبيقي — يمنع اللف في غير وقته.

---

### 11. الوحدة الثانية: JavaFX — النمط الجديد

#### النص الأصلي يقول:
> Unit-2: JavaFX — `Application`, `Stage`, `Scene`, `Pane`, أمثلة على الأشكال والأحداث والتحريك.

#### الشرح المبسّط:
`JavaFX` هو البديل الحديث لـ `Swing` — يقدم رسوميات أقوى، دعم CSS للتنسيق، وبنية أوضح:
- `Stage`: النافذة الرئيسية (مثل `JFrame`)
- `Scene`: المحتوى داخل النافذة
- `Pane`: الحاوي الذي تُوضع فيه المكوّنات

**لماذا؟** `JavaFX` يفصل بوضوح بين الهيكل (Java) والتنسيق (CSS) ويدعم التحريك والرسوميات المتقدمة.

#### ⚙️ الخطوات / الخوارزمية: بنية تطبيق JavaFX الأساسية

> هدفها: إنشاء نافذة JavaFX تعمل.

```algorithm
1 | الوراثة | `extends Application` | الكلاس يصبح تطبيق JavaFX
2 | تجاوز start | `@Override public void start(Stage primaryStage)` | نقطة الدخول الرئيسية بعد الإطلاق
3 | إنشاء Pane | `new StackPane() / Pane() / HBox() / ...` | الحاوي الذي يضم المكوّنات
4 | إضافة مكوّنات | `pane.getChildren().add(...)` | إضافة أزرار/أشكال/نصوص للحاوي
5 | إنشاء Scene | `new Scene(pane, width, height)` | إنشاء المشهد مع تحديد الحجم
6 | ضبط Stage | `primaryStage.setTitle(); primaryStage.setScene()` | ضبط عنوان النافذة والمحتوى
7 | الإظهار | `primaryStage.show()` | عرض النافذة
8 | main | `Application.launch(args)` | تشغيل التطبيق
```

#### 💻 الكود: ButtonInPane — أبسط تطبيق JavaFX

#### ما هذا الكود؟
> تطبيق يعرض نافذة تحتوي زراً واحداً في المنتصف.

```java
import javafx.application.Application;   // base class for JavaFX apps
import javafx.scene.Scene;               // container for all content
import javafx.scene.control.Button;     // Button control
import javafx.stage.Stage;              // the window
import javafx.scene.layout.StackPane;   // centers children

public class ButtonInPane extends Application {
    @Override
    public void start(Stage primaryStage) {
        StackPane pane = new StackPane();         // centered layout
        pane.getChildren().add(new Button("OK")); // add button to pane

        Scene scene = new Scene(pane, 200, 50);   // scene 200x50 pixels
        primaryStage.setTitle("Button in a pane"); // window title
        primaryStage.setScene(scene);              // attach scene to stage
        primaryStage.show();                       // display window
    }

    public static void main(String[] args) {
        Application.launch(args);  // launch JavaFX application
    }
}
```

#### شرح كل سطر:
1. `extends Application` → وراثة إلزامية لأي تطبيق `JavaFX`
2. `@Override start(Stage primaryStage)` → جافا تستدعي هذه الدالة تلقائياً بعد `launch`
3. `new StackPane()` → حاوي يضع المكوّنات فوق بعضها في المركز
4. `pane.getChildren().add(...)` → الطريقة الموحّدة لإضافة مكوّنات في `JavaFX`
5. `new Scene(pane, 200, 50)` → مشهد بعرض 200 وارتفاع 50 بيكسل
6. `Application.launch(args)` → يطلق خيط `JavaFX` ويستدعي `start`

**الفهم الخاطئ ❌:** `main` في JavaFX تعمل مثل Swing مباشرة
**الفهم الصحيح ✅:** `main` تستدعي `Application.launch` التي تستدعي `start` تلقائياً

---

### 12. الأشكال في JavaFX — `Circle`, `Rectangle`

#### النص الأصلي يقول:
> `Circle circle = new Circle(); circle.setCenterX(100); circle.setRadius(50); circle.setStroke(Color.BLACK); circle.setFill(Color.WHITE);`
> `circle.centerXProperty().bind(pane.widthProperty().divide(2));`

#### الشرح المبسّط:
`JavaFX` يوفر مكوّنات شكلية مباشرة (`Circle`، `Rectangle`، `Line`، `Text`). كل شكل له خصائص (`centerX`, `radius`, `stroke`, `fill`). `bind` تربط خاصية بخاصية أخرى بشكل ديناميكي — الدائرة دائماً في منتصف الـ `Pane` مهما تغيّر حجمها.

**لماذا؟** `bind` يُلغي الحاجة لإعادة الحساب يدوياً عند تغيّر الحجم — ميزة قوية غير موجودة في `Swing`.

#### 💻 الكود: ShowCircle مع Binding

#### ما هذا الكود؟
> دائرة دائماً في مركز النافذة مهما تغيّر حجمها.

```java
public class ShowCircle extends Application {
    @Override
    public void start(Stage primaryStage) {
        Circle circle = new Circle();
        circle.setCenterX(100);              // initial center X
        circle.setCenterY(100);              // initial center Y
        circle.setRadius(50);                // radius in pixels
        circle.setStroke(Color.BLACK);       // outline color
        circle.setFill(Color.WHITE);         // fill color

        Pane pane = new Pane();
        pane.getChildren().add(circle);

        // Bind circle center to pane center (dynamic)
        circle.centerXProperty().bind(pane.widthProperty().divide(2));
        circle.centerYProperty().bind(pane.heightProperty().divide(2));

        Scene scene = new Scene(pane, 200, 200);
        primaryStage.setTitle("ShowCircle");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        Application.launch(args);
    }
}
```

#### شرح كل سطر:
1. `circle.setStroke(Color.BLACK)` → لون الحدود
2. `circle.setFill(Color.WHITE)` → لون الداخل
3. `circle.centerXProperty().bind(...)` → ربط ديناميكي — مركز الدائرة = عرض الـPane ÷ 2
4. `pane.widthProperty().divide(2)` → قيمة تتغير تلقائياً مع عرض النافذة

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ما الفرق بين `circle.setCenterX(100)` و `circle.centerXProperty().bind(...)`؟
> **لماذا مهم؟** الأول يحدد قيمة ثابتة، الثاني يربطها بمتغيّر يتغيّر تلقائياً.

---

### 13. `Rectangle` وتدوير الأشكال في JavaFX

#### النص الأصلي يقول:
> `Rectangle r = new Rectangle(100, 50, 100, 30); r.setRotate(i * 360 / 8);`
> `r3.setArcWidth(15); r3.setArcHeight(25);`

#### الشرح المبسّط:
`Rectangle(x, y, width, height)` يحدد المستطيل. `setRotate(degrees)` يدوّره. `setArcWidth/Height` يجعل الزوايا منحنية (مستطيل مدوّر الزوايا).

#### 💻 الكود: ShowRectangle — أشكال متنوعة

```java
public void start(Stage primaryStage) {
    Pane pane = new Pane();

    Rectangle r1 = new Rectangle(25, 10, 60, 30);  // x,y,w,h
    r1.setStroke(Color.BLACK);
    r1.setFill(Color.WHITE);        // white filled rectangle
    pane.getChildren().add(new Text(10, 27, "r1")); // label
    pane.getChildren().add(r1);

    Rectangle r2 = new Rectangle(25, 50, 60, 30);  // default fill is BLACK
    pane.getChildren().add(new Text(10, 67, "r2"));
    pane.getChildren().add(r2);

    Rectangle r3 = new Rectangle(25, 90, 60, 30);
    r3.setArcWidth(15);    // rounded corner width
    r3.setArcHeight(25);   // rounded corner height
    pane.getChildren().add(new Text(10, 107, "r3"));
    pane.getChildren().add(r3);

    // Draw 4 rotated rectangles (diamond pattern)
    for (int i = 0; i < 4; i++) {
        Rectangle r = new Rectangle(100, 50, 100, 30);
        r.setRotate(i * 360 / 8);  // rotate by 0, 45, 90, 135 degrees
        r.setStroke(Color.color(Math.random(), Math.random(), Math.random()));
        r.setFill(Color.WHITE);
        pane.getChildren().add(r);
    }

    Scene scene = new Scene(pane, 250, 150);
    primaryStage.setTitle("ShowRectangle");
    primaryStage.setScene(scene);
    primaryStage.show();
}
```

---

### 14. الخطوط والتسميات في JavaFX — `FontDemo`

#### النص الأصلي يقول:
> `label.setFont(Font.font("Times New Roman", FontWeight.BOLD, FontPosture.ITALIC, 20));`
> `circle.setFill(new Color(0.5, 0.5, 0.5, 0.1))`

#### الشرح المبسّط:
- `Font.font(family, weight, posture, size)` يضبط الخط بدقة.
- `new Color(r, g, b, a)` تُحدد اللون بأربع قيم (0 إلى 1) — `a` هو الشفافية (`opacity`).

| معامل | القيم الممكنة | الوصف |
|---|---|---|
| `FontWeight` | `BOLD`, `NORMAL`, `THIN`... | سُمك الخط |
| `FontPosture` | `ITALIC`, `REGULAR` | مائل أو عادي |
| `a` في `Color` | 0.0 (شفاف) إلى 1.0 (معتم) | الشفافية |

#### مثال من الامتحان:
> "What does `new Color(0.5, 0.5, 0.5, 0.1)` represent in JavaFX?"
> **كيف يُختبر؟** MCQ — رمادي شبه شفاف (opacity=0.1).

---

### 15. عرض الصور في JavaFX — `Image` و `ImageView`

#### النص الأصلي يقول:
> `Image image = new Image("bio.gif"); ImageView imageView2 = new ImageView(image); imageView2.setFitHeight(100); ImageView imageView3 = new ImageView(image); imageView3.setRotate(90);`

#### الشرح المبسّط:
- `Image`: تُحمّل الصورة من ملف.
- `ImageView`: تعرض الصورة في الـ`Pane` — يمكن لعدة `ImageView` مشاركة نفس `Image`.
- `setFitHeight(100)`: تغيير حجم العرض.
- `setRotate(90)`: تدوير الصورة 90 درجة.

#### مثال من الامتحان:
> "Can the same `Image` object be displayed in multiple `ImageView` components?"
> **كيف يُختبر؟** MCQ — نعم، `Image` مستقلة عن `ImageView`.

---

### 16. حاويات التخطيط في JavaFX (Layout Panes)

#### النص الأصلي يقول:
> جدول Layout Panes: `Pane`, `StackPane`, `FlowPane`, `GridPane`, `BorderPane`, `HBox`, `VBox`

#### جدول حاويات التخطيط في JavaFX:

| الحاوي | الوصف | ملاحظة |
|---|---|---|
| `Pane` | الكلاس الأساسي — تموضع حر | `getChildren()` لإضافة عناصر |
| `StackPane` | يضع المكوّنات فوق بعضها في المركز | مفيد لوضع نص فوق شكل |
| `FlowPane` | يرتب أفقياً ويلتف للسطر التالي | مشابه لـ `FlowLayout` في Swing |
| `GridPane` | شبكة ثنائية الأبعاد | `add(node, col, row)` |
| `BorderPane` | 5 مناطق: top, right, bottom, left, center | مثالي لتخطيط التطبيقات |
| `HBox` | صف واحد أفقي | مسافة بين العناصر محددة |
| `VBox` | عمود واحد رأسي | مفيد للقوائم |

#### 💻 الكود: ShowGridPane

#### ما هذا الكود؟
> نموذج إدخال بيانات بثلاثة حقول باستخدام `GridPane`.

```java
public class ShowGridPane extends Application {
    @Override
    public void start(Stage primaryStage) {
        GridPane pane = new GridPane();
        pane.setAlignment(Pos.CENTER);                             // center the grid
        pane.setPadding(new Insets(11.5, 12.5, 13.5, 14.5));    // top,right,bottom,left
        pane.setHgap(5.5);   // horizontal gap between columns
        pane.setVgap(5.5);   // vertical gap between rows

        // add(node, column, row)
        pane.add(new Label("First Name:"), 0, 0);
        pane.add(new TextField(), 1, 0);
        pane.add(new Label("MI:"), 0, 1);
        pane.add(new TextField(), 1, 1);
        pane.add(new Label("Last Name:"), 0, 2);
        pane.add(new TextField(), 1, 2);

        Button btAdd = new Button("Add Name");
        pane.add(btAdd, 1, 3);
        GridPane.setHalignment(btAdd, HPos.RIGHT);  // align button right

        Scene scene = new Scene(pane);
        primaryStage.setTitle("ShowGridPane");
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}
```

#### شرح كل سطر:
1. `pane.setAlignment(Pos.CENTER)` → الشبكة في وسط النافذة
2. `new Insets(11.5, 12.5, 13.5, 14.5)` → هوامش (أعلى، يمين، أسفل، يسار)
3. `pane.add(node, col, row)` → الترتيب: العمود أولاً ثم الصف
4. `GridPane.setHalignment(btAdd, HPos.RIGHT)` → محاذاة الزر يميناً داخل خليته

---

### 17. `HBox` و `VBox` و `BorderPane` — ShowHBoxVBox

#### النص الأصلي يقول:
> `BorderPane pane = new BorderPane(); pane.setTop(getHBox()); pane.setLeft(getVBox());`
> `hBox.setStyle("-fx-background-color: gold");`

#### الشرح المبسّط:
`BorderPane` يقسّم النافذة إلى 5 مناطق — في المثال: `HBox` في أعلى و`VBox` في يسار. `setStyle` يطبّق `CSS` مباشرة لتلوين الخلفية.

#### 💻 الكود: ShowHBoxVBox — الجزء الرئيسي

```java
public class ShowHBoxVBox extends Application {
    @Override
    public void start(Stage primaryStage) {
        BorderPane pane = new BorderPane();
        pane.setTop(getHBox());   // top region = horizontal bar
        pane.setLeft(getVBox());  // left region = vertical list

        Scene scene = new Scene(pane);
        primaryStage.setTitle("ShowHBoxVBox");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private HBox getHBox() {
        HBox hBox = new HBox(15);  // 15px spacing between children
        hBox.setPadding(new Insets(15, 15, 15, 15));
        hBox.setStyle("-fx-background-color: gold");  // CSS styling
        hBox.getChildren().add(new Button("Computer Science"));
        hBox.getChildren().add(new Button("Chemistry"));
        ImageView imageView = new ImageView(new Image("bio.png"));
        hBox.getChildren().add(imageView);
        return hBox;
    }

    private VBox getVBox() {
        VBox vBox = new VBox(15);  // 15px spacing
        vBox.setPadding(new Insets(15, 5, 5, 5));
        vBox.getChildren().add(new Label("Courses"));

        Label[] courses = {
            new Label("CSCI 1301"), new Label("CSCI 1302"),
            new Label("CSCI 2410"), new Label("CSCI 3720")
        };

        for (Label course : courses) {
            VBox.setMargin(course, new Insets(0, 0, 0, 15));  // indent labels
            vBox.getChildren().add(course);
        }
        return vBox;
    }

    public static void main(String[] args) { launch(args); }
}
```

#### مثال من الامتحان:
> "How do you set the background color of an HBox using JavaFX CSS?"
> **كيف يُختبر؟** كود تطبيقي — `hBox.setStyle("-fx-background-color: gold");`

---

### 18. معالجة الأحداث في JavaFX — `EventHandler` و`Lambda`

#### النص الأصلي يقول:
> `btOK.setOnAction(handler1)` — `class OKHandlerClass implements EventHandler<ActionEvent>` — Lambda: `btCalculate.setOnAction(e -> calculateLoanPayment());`

#### الشرح المبسّط:
في `JavaFX`، لمعالجة الأحداث ثلاثة أساليب:
1. **كلاس خارجي** ينفّذ `EventHandler<ActionEvent>` — للمعالجات المعقدة المتكررة.
2. **Anonymous Inner Class** — نفس مفهوم `Swing`.
3. **Lambda Expression** — أبسط وأقصر، مثالي للعمليات البسيطة.

**لماذا؟** `Lambda` يُلغي الحاجة لتعريف كلاس كامل لتنفيذ واجهة بدالة واحدة.

#### ⚖️ المقايضة: أساليب معالجة الأحداث

| | كلاس خارجي | Anonymous Inner Class | Lambda |
|---|---|---|---|
| المزايا | قابل لإعادة الاستخدام | لا حاجة لكلاس منفصل | أقصر كود |
| العيوب | ملفات إضافية | طويل نسبياً | صعوبة في المنطق المعقد |
| متى تختاره | معالج مشترك بين عدة مكوّنات | معالج مرتبط بمكوّن واحد | عمليات بسيطة ← سطر واحد |

#### 💻 الكود: HandleEvent — كلاسات خارجية

```java
public class HandleEvent extends Application {
    @Override
    public void start(Stage primaryStage) {
        HBox pane = new HBox(10);
        pane.setAlignment(Pos.CENTER);
        Button btOK     = new Button("OK");
        Button btCancel = new Button("Cancel");

        // Create separate handler objects
        OKHandlerClass handler1     = new OKHandlerClass();
        CancelHandlerClass handler2 = new CancelHandlerClass();

        btOK.setOnAction(handler1);      // register handler for OK
        btCancel.setOnAction(handler2);  // register handler for Cancel

        pane.getChildren().addAll(btOK, btCancel);
        Scene scene = new Scene(pane);
        primaryStage.setTitle("HandleEvent");
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}

// Handler classes implement EventHandler
class OKHandlerClass implements EventHandler<ActionEvent> {
    @Override
    public void handle(ActionEvent e) {
        System.out.println("OK button clicked");
    }
}

class CancelHandlerClass implements EventHandler<ActionEvent> {
    @Override
    public void handle(ActionEvent e) {
        System.out.println("Cancel button clicked");
    }
}
```

#### شرح كل سطر:
1. `implements EventHandler<ActionEvent>` → تنفيذ واجهة معالج الأحداث
2. `public void handle(ActionEvent e)` → الدالة الإلزامية لكل `EventHandler`
3. `btOK.setOnAction(handler1)` → ربط الزر بكائن المعالج

---

### 19. أحداث الفأرة والكيبورد في JavaFX

#### النص الأصلي يقول:
> `text.setOnMouseDragged(e -> { text.setX(e.getX()); text.setY(e.getY()); });`
> `text.setOnKeyPressed(e -> { switch(e.getCode()) { case DOWN: ... } });`

#### الشرح المبسّط:
- `setOnMouseDragged`: يستجيب لسحب الفأرة — `e.getX()` و`e.getY()` موضع الفأرة الحالي.
- `setOnKeyPressed`: يستجيب لضغط المفاتيح — `e.getCode()` يُعيد رمز المفتاح (`KeyCode.DOWN`, `.UP`, ...).
- `text.requestFocus()` يُعطي التركيز للنص حتى تُستقبل أحداث الكيبورد.

#### 💻 الكود: MouseEventDemo و KeyEventDemo

```java
// MouseEventDemo - drag text with mouse
text.setOnMouseDragged(e -> {
    text.setX(e.getX());  // move text to mouse X position
    text.setY(e.getY());  // move text to mouse Y position
});

// KeyEventDemo - move text with arrow keys or change character
text.setOnKeyPressed(e -> {
    switch (e.getCode()) {
        case DOWN:  text.setY(text.getY() + 10); break;  // move down
        case UP:    text.setY(text.getY() - 10); break;  // move up
        case LEFT:  text.setX(text.getX() - 10); break;  // move left
        case RIGHT: text.setX(text.getX() + 10); break;  // move right
        default:
            if (Character.isLetterOrDigit(e.getText().charAt(0)))
                text.setText(e.getText());  // change displayed character
    }
});

text.requestFocus();  // needed to receive key events
```

#### مثال من الامتحان:
> "Why is `text.requestFocus()` needed in KeyEventDemo?"
> **كيف يُختبر؟** MCQ — بدونه لا يستقبل الـ`Text` أحداث الكيبورد.

---

### 20. التحريك في JavaFX — `PathTransition`

#### النص الأصلي يقول:
> `PathTransition pt = new PathTransition(Duration.millis(10000), new Line(100, 200, 100, 0), imageView); pt.setCycleCount(5); pt.play();`

#### الشرح المبسّط:
`PathTransition` يحرّك `Node` على طول مسار (`Path`). `Duration.millis(10000)` = 10 ثوانٍ لإتمام الحركة. `setCycleCount(5)` تكرار 5 مرات. `play()` تبدأ الحركة.

**لماذا؟** `JavaFX` يوفر أنظمة تحريك جاهزة بدون الحاجة لكتابة خيوط أو `Timer`.

```java
PathTransition pt = new PathTransition(
    Duration.millis(10000),                    // 10 seconds per cycle
    new Line(100, 200, 100, 0),                // path: vertical line from (100,200) to (100,0)
    imageView                                   // the node to animate
);
pt.setCycleCount(5);  // repeat 5 times
pt.play();            // start animation
```

#### مثال من الامتحان:
> "What does `pt.setCycleCount(5)` do in a PathTransition?"
> **كيف يُختبر؟** MCQ — يُحدد عدد مرات تكرار الحركة.

---

### 21. دراسة حالة: Loan Calculator بـ JavaFX

#### النص الأصلي يقول:
> `btCalculate.setOnAction(e -> calculateLoanPayment());` — استخدام Lambda بدل anonymous class.

#### الشرح المبسّط:
يجمع هذا المثال: `GridPane` للتخطيط، `TextField` للإدخال والإخراج، `Lambda` لمعالجة الحدث، و`Loan` class للمنطق المنفصل. يُجسّد مبدأ الفصل بين الواجهة والمنطق (`Separation of Concerns`).

#### 💻 الكود: Loan Calculator — الجزء الجوهري

```java
// Lambda to handle button click
btCalculate.setOnAction(e -> calculateLoanPayment());

private void calculateLoanPayment() {
    double interest = Double.parseDouble(tfAnnualInterestRate.getText());
    int year        = Integer.parseInt(tfNumberOfYears.getText());
    double loanAmount = Double.parseDouble(tfLoanAmount.getText());

    Loan loan = new Loan(interest, year, loanAmount);  // separate logic class

    // Display formatted results
    tfMonthlyPayment.setText(String.format("$%.2f", loan.getMonthlyPayment()));
    tfTotalPayment.setText(String.format("$%.2f", loan.getTotalPayment()));
}
```

#### مثال من الامتحان:
> "What is the advantage of using a Lambda over an anonymous inner class for `setOnAction`?"
> **كيف يُختبر؟** MCQ مقارنة — Lambda أقصر وأوضح للعمليات البسيطة.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
|---|---|---|
| `GUI` | واجهة مستخدم رسومية | أزرار، نصوص، صور |
| `Event` | حدث ينشأ من تفاعل المستخدم | ضغط زر، كتابة في حقل |
| `Event Handler` | الكود الذي يستجيب للحدث | `actionPerformed`, `handle` |
| `JFrame` | النافذة الرئيسية في Swing | `extends JFrame` |
| `ContentPane` | الحاوي الداخلي للنافذة | `getContentPane()` |
| `ActionListener` | واجهة للاستجابة لضغطات الأزرار | `implements ActionListener` |
| `FlowLayout` | ترتيب مكوّنات من اليسار | افتراضي لـ`JPanel` |
| `setBounds(x,y,w,h)` | تحديد موضع وحجم مع `null` layout | يدوي بالكامل |
| `KeyAdapter` | كلاس مجردة تنفّذ `KeyListener` | تجاوز الدوال الفارغة |
| `Stage` | نافذة JavaFX | يعادل `JFrame` |
| `Scene` | محتوى النافذة | يحتوي `Pane` |
| `Pane` | حاوي المكوّنات في JavaFX | `.getChildren().add()` |
| `Property Binding` | ربط خاصية بخاصية أخرى | `centerXProperty().bind(...)` |
| `Lambda` | دالة مجهولة مختصرة | `e -> doSomething()` |
| `PathTransition` | تحريك `Node` على مسار | `.play()` لبدء الحركة |

---

### المكوّنات الرئيسية (مرجع سريع)

| المكوّن | المكتبة | الوظيفة |
|---|---|---|
| `JLabel` | `javax.swing` | عرض نص ثابت |
| `JTextField` | `javax.swing` | إدخال وعرض نص سطر واحد |
| `JButton` | `javax.swing` | زر قابل للضغط |
| `JPanel` | `javax.swing` | حاوي لتجميع مكوّنات |
| `JTextArea` | `javax.swing` | نص متعدد الأسطر |
| `JScrollPane` | `javax.swing` | إضافة شريط تمرير |
| `JSpinner` | `javax.swing` | اختيار قيمة رقمية |
| `JRadioButton` | `javax.swing` | خيار من مجموعة |
| `ButtonGroup` | `javax.swing` | تجميع RadioButtons |
| `JOptionPane` | `javax.swing` | نوافذ حوار جاهزة |
| `Button` | `javafx.scene.control` | زر JavaFX |
| `Label` | `javafx.scene.control` | تسمية JavaFX |
| `TextField` | `javafx.scene.control` | حقل إدخال JavaFX |
| `Circle` | `javafx.scene.shape` | دائرة |
| `Rectangle` | `javafx.scene.shape` | مستطيل |
| `ImageView` | `javafx.scene.image` | عرض صورة |

---

### جداول مقارنات سريعة

| المقارنة | Swing | JavaFX | الفرق |
|---|---|---|---|
| النافذة | `JFrame` | `Stage` | JavaFX أكثر مرونة |
| الحاوي الرئيسي | `ContentPane` | `Pane` / `Scene` | JavaFX يفصل Scene عن Pane |
| التنسيق | صعب | `CSS + setStyle` | JavaFX أسهل للتنسيق |
| الأحداث | `implements ActionListener` | `EventHandler` / Lambda | JavaFX يدعم Lambda |
| التحريك | معقد — `Timer` | `PathTransition` | JavaFX جاهز |
| عرض الصور | `ImageIcon` | `ImageView + Image` | JavaFX أقوى |

| Layout | Swing | JavaFX المكافئ |
|---|---|---|
| أفقي | `FlowLayout` | `FlowPane` / `HBox` |
| عمودي | `BoxLayout.Y_AXIS` | `VBox` |
| شبكة | `GridLayout` | `GridPane` |
| مجاني | `null` layout + `setBounds` | `Pane` + `setLayoutX/Y` |
| 5 مناطق | `BorderLayout` | `BorderPane` |

---

### قاموس المصطلحات

| الفئة | المصطلحات |
|---|---|
| Swing Components | `JFrame`, `JPanel`, `JLabel`, `JTextField`, `JButton`, `JTextArea`, `JScrollPane`, `JSpinner`, `JRadioButton`, `ButtonGroup` |
| Event Handling | `ActionListener`, `ActionEvent`, `KeyListener`, `KeyAdapter`, `KeyEvent`, `ChangeListener`, `EventHandler` |
| Layout Managers | `FlowLayout`, `BoxLayout`, `GridLayout`, `BorderLayout`, `null` |
| JavaFX Containers | `Stage`, `Scene`, `Pane`, `StackPane`, `HBox`, `VBox`, `GridPane`, `BorderPane`, `FlowPane` |
| JavaFX Shapes | `Circle`, `Rectangle`, `Line`, `Text`, `ImageView` |
| JavaFX Animation | `PathTransition`, `Duration`, `KeyCode` |
| Dialog | `JOptionPane`, `showInputDialog`, `showMessageDialog` |
| Formatting | `DecimalFormat`, `String.format` |

---

### أبرز النقاط الذهبية

1. كل تطبيق `JavaFX` **يجب** أن يرث `Application` ويجاوز `start(Stage)`
2. `Application.launch(args)` في `main` — لا `new` للكلاس مباشرة
3. `pane.getChildren().add(...)` هي الطريقة الموحّدة لإضافة مكوّنات في `JavaFX`
4. في `Swing`: `butt.addActionListener(this)` — الكلاس نفسه هو المعالج
5. `ButtonGroup` لا تُضاف للنافذة — تُضاف إليها الأزرار فقط
6. `null` layout يتطلب `setBounds(x, y, w, h)` لكل مكوّن
7. `bind` في `JavaFX` يربط الخصائص ديناميكياً — مفيد للمكوّنات المرنة
8. Lambda: `e -> action()` تُعادل anonymous class تنفّذ واجهة بدالة واحدة

---

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
|---|---|
| نسيان `setVisible(true)` في Swing | دائماً استدعِها آخر شيء في `main` |
| إضافة `ButtonGroup` للنافذة | `ButtonGroup` فقط تُجمّع الأزرار — لا تُضاف |
| استخدام `new` لتشغيل JavaFX | استخدم `Application.launch(args)` |
| نسيان `@Override` على `start` | الكود يعمل لكن لا يُطبّق الواجهة بشكل صريح |
| تحديد `null` layout بدون `setBounds` | كل مكوّن يجب أن يحدد موضعه |
| نسيان `requestFocus()` في KeyEventDemo | لا يستقبل الـ`Node` أحداث الكيبورد |
| `Integer.parseInt` على نص فارغ | استخدم التحقق قبل التحويل |

> غالباً تُسأل هذه النقاط في الامتحان كـ MCQ أو تصحيح كود — مثال: "What happens if `setVisible(true)` is missing?"

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء تطبيق Swing كامل

> هدفها: إنشاء نافذة تفاعلية في Swing خطوة بخطوة.

```algorithm
1 | الاستيراد | `import java.awt.*; import java.awt.event.*; import javax.swing.*;` | استيراد المكتبات الضرورية
2 | تعريف الكلاس | `extends JFrame implements ActionListener` | يجعل الكلاس نافذة ومعالجاً
3 | إعلان المكوّنات | `JLabel, JTextField, JButton` كـ fields | تكون مرئية لكل دوال الكلاس
4 | البنّاء | `setLayout, addActionListener, add, setEditable` | تكوين الواجهة
5 | تنفيذ actionPerformed | `getText → parse → calculate → setText` | منطق الاستجابة
6 | Main | `new MyApp(); setSize(); setVisible(true)` | إنشاء وإظهار النافذة
```

#### نقاط التنفيذ:
- ترتيب الخطوات في البنّاء مهم: الـ`layout` أولاً، ثم المعالجات، ثم `add`
- `setEditable(false)` للحقول التي هي للعرض فقط
- `setDefaultCloseOperation(EXIT_ON_CLOSE)` لإيقاف البرنامج عند الإغلاق

---

#### ⚙️ الخطوات / الخوارزمية: بناء تطبيق JavaFX كامل

> هدفها: إنشاء نافذة JavaFX تفاعلية.

```algorithm
1 | الاستيراد | `import javafx.application.*; import javafx.scene.*; import javafx.stage.*;` | استيراد مكتبات JavaFX
2 | الوراثة | `extends Application` | وراثة إلزامية
3 | تجاوز start | `@Override public void start(Stage primaryStage)` | نقطة الدخول
4 | إنشاء Pane | `new GridPane() / HBox() / StackPane()` | اختيار التخطيط المناسب
5 | إضافة مكوّنات | `pane.getChildren().add(...)` | كل مكوّن يُضاف هكذا
6 | ربط الأحداث | `button.setOnAction(e -> ...)` | Lambda أو EventHandler
7 | إنشاء Scene | `new Scene(pane, width, height)` | تحديد الحجم
8 | ضبط Stage | `setTitle(), setScene()` | ضبط النافذة
9 | الإظهار | `primaryStage.show()` | عرض
10 | Main | `Application.launch(args)` | الإطلاق
```

#### نقاط التنفيذ:
- `Application.launch` يستدعي `start` تلقائياً — لا تستدعِها يدوياً
- لا تنسَ `public` على `start` — الواجهة تشترطها

---

#### ⚙️ الخطوات / الخوارزمية: معالجة حدث الزر في JavaFX (3 أساليب)

> هدفها: ربط زر بمعالج حدث.

```algorithm
1 | الأسلوب 1 | كلاس خارجي | implements EventHandler<ActionEvent> → override handle(ActionEvent e)
2 | الأسلوب 1 | تسجيل | button.setOnAction(new MyHandlerClass())
3 | الأسلوب 2 | Anonymous Inner | button.setOnAction(new EventHandler<ActionEvent>() { public void handle(ActionEvent e) {...} })
4 | الأسلوب 3 | Lambda | button.setOnAction(e -> doSomething())
5 | الأسلوب 3 | Lambda متعدد الأسطر | button.setOnAction(e -> { line1; line2; })
```

#### نقاط التنفيذ:
- اختر Lambda للعمليات البسيطة، وكلاس خارجي للمعالجات المعاد استخدامها

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
|---|---|---|
| Swing ActionListener | `class C extends JFrame implements ActionListener { ... public void actionPerformed(ActionEvent e){...} }` | كلاس بسيط ذو معالج واحد |
| Anonymous ActionListener | `button.addActionListener(new ActionListener() { public void actionPerformed(ActionEvent e){...} });` | معالجات متعددة لمكوّنات مختلفة |
| JavaFX Lambda | `button.setOnAction(e -> action());` | كل حالات JavaFX البسيطة |
| JavaFX EventHandler class | `class H implements EventHandler<ActionEvent> { public void handle(ActionEvent e){...} }` | إعادة استخدام المعالج |
| Property Binding | `node.xProperty().bind(other.widthProperty().divide(2))` | مكوّنات مرنة |
| setText/getText | `field.getText()` → parse → compute → `field.setText(result)` | كل تطبيقات الحساب |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **25 سؤالاً** — مستوى: متوسط/صعب. التوزيع: 20% مقارنات، 30% سيناريو كود، 30% تطبيق، 20% تتبع خوارزمية.

---

### السؤال 1 (متوسط)
Which package contains `JFrame`, `JButton`, and `JLabel`?
أ) `java.awt`  ب) `javax.swing`  ج) `java.util`  د) `java.io`
**الإجابة الصحيحة: ب**
**التعليل:** `javax.swing` تحتوي مكوّنات Swing الحديثة. `java.awt` تحتوي التخطيطات والأحداث القديمة. `java.util` و `java.io` لا علاقة لهما بـ GUI.

---

### السؤال 2 (متوسط)
What interface must a class implement to respond to button clicks in Swing?
أ) `MouseListener`  ب) `KeyListener`  ج) `ActionListener`  د) `ChangeListener`
**الإجابة الصحيحة: ج**
**التعليل:** `ActionListener` يُستخدم للأزرار. `MouseListener` للفأرة. `KeyListener` للكيبورد. `ChangeListener` لـ`JSpinner`.

---

### السؤال 3 (متوسط)
What is the output of `new DecimalFormat("$0.00").format(1500)`?
أ) `1500`  ب) `$1500`  ج) `$1500.00`  د) `1500.00`
**الإجابة الصحيحة: ج**
**التعليل:** النمط `"$0.00"` يضيف `$` ويضمن خانتين عشريتين — `1500` يصبح `$1500.00`.

---

### السؤال 4 (متوسط)
In JavaFX, what method is used to add components to a `Pane`?
أ) `add(component)`  ب) `getChildren().add(component)`  ج) `setContent(component)`  د) `insert(component)`
**الإجابة الصحيحة: ب**
**التعليل:** في JavaFX، `getChildren()` تعيد `ObservableList` والإضافة عبر `.add()`. في Swing كان `getContentPane().add(component)`.

---

### السؤال 5 (صعب)
What happens when `ButtonGroup` is NOT used with `JRadioButton` components?
أ) The program won't compile  ب) Only the first button works  ج) All buttons can be selected simultaneously  د) The buttons have no effect
**الإجابة الصحيحة: ج**
**التعليل:** بدون `ButtonGroup`، كل `JRadioButton` مستقل — يمكن تحديدهم جميعاً. `ButtonGroup` هي التي تضمن الاختيار الحصري.

---

### السؤال 6 (صعب)
Consider this JavaFX code: `circle.centerXProperty().bind(pane.widthProperty().divide(2));`. What happens when the pane is resized?
أ) The circle stays at its original position  ب) The circle moves to the center of the new width  ج) An exception is thrown  د) The circle disappears
**الإجابة الصحيحة: ب**
**التعليل:** `bind` يربط مركز الدائرة بنصف عرض الـ`Pane` — عند تغيّر العرض يتغيّر المركز تلقائياً.

---

### السؤال 7 (متوسط)
In `SpinnerNumberModel(1, 1, 10, 1)`, what do the parameters represent?
أ) initial, step, min, max  ب) initial, min, max, step  ج) min, max, step, initial  د) min, initial, max, step
**الإجابة الصحيحة: ب**
**التعليل:** الترتيب: `(initial, min, max, step)` — القيمة الابتدائية، الحد الأدنى، الحد الأقصى، الخطوة.

---

### السؤال 8 (صعب)
What is the key difference between `addActionListener(this)` in Swing and `setOnAction(e -> ...)` in JavaFX?
أ) Both are identical in function  ب) Swing uses a push model; JavaFX uses a pull model  ج) Swing requires the class to implement `ActionListener`; JavaFX uses lambda expressions or handlers  د) JavaFX cannot handle button events
**الإجابة الصحيحة: ج**
**التعليل:** في Swing يجب تنفيذ `ActionListener` في الكلاس. في JavaFX يمكن استخدام Lambda مباشرة.

---

### السؤال 9 (متوسط)
What layout manager allows manual positioning using `setBounds(x, y, w, h)`?
أ) `FlowLayout`  ب) `BoxLayout`  ج) `GridLayout`  د) `null` layout
**الإجابة الصحيحة: د**
**التعليل:** عند `setLayout(null)` يتحكم المبرمج بالإحداثيات يدوياً. باقي الـ layouts تدير المواضع تلقائياً.

---

### السؤال 10 (صعب)
In the `StudentGrades` example, `studentGrades[MAXIMUM_STUDENTS][NUMBER_OF_TESTS]` stores:
أ) Student names only  ب) Test scores for up to 10 students and 3 tests  ج) A single student's average  د) Class average
**الإجابة الصحيحة: ب**
**التعليل:** مصفوفة ثنائية الأبعاد — البعد الأول الطلاب (10)، الثاني الاختبارات (3). كل خلية `studentGrades[s][t]` تحتوي درجة.

---

### السؤال 11 (صعب)
What is an `anonymous inner class` in the context of `addActionListener`?
أ) A class defined in a separate file  ب) A class defined inline without a name, implementing an interface  ج) A static nested class  د) A class that cannot access outer class members
**الإجابة الصحيحة: ب**
**التعليل:** `new ActionListener() { ... }` يُنشئ كلاساً بلا اسم ينفّذ `ActionListener` في مكانه مباشرة.

---

### السؤال 12 (متوسط)
In JavaFX, what is the role of `Application.launch(args)` in the `main` method?
أ) Creates the `Stage` object directly  ب) Starts the JavaFX runtime and calls `start()`  ج) Displays the window  د) Sets the window title
**الإجابة الصحيحة: ب**
**التعليل:** `launch` تُشغّل بيئة JavaFX وتستدعي `start(Stage)` تلقائياً — لا تُنشئ الـ`Stage` مباشرة.

---

### السؤال 13 (صعب)
In the `CrapsGame`, after `playJButton.setEnabled(false)` is called, which button becomes active?
أ) Both buttons stay enabled  ب) `rollJButton` becomes enabled  ج) Neither button works  د) A new Play button is created
**الإجابة الصحيحة: ب**
**التعليل:** المنطق: عند بدء اللعب وتحديد نقطة → يُعطَّل `playJButton` ويُفعَّل `rollJButton` للاستمرار.

---

### السؤال 14 (متوسط)
Which JavaFX pane places nodes centered on top of each other?
أ) `HBox`  ب) `VBox`  ج) `StackPane`  د) `FlowPane`
**الإجابة الصحيحة: ج**
**التعليل:** `StackPane` يضع المكوّنات فوق بعضها في المركز — مفيد لوضع نص على شكل.

---

### السؤال 15 (صعب)
What is the effect of `circle.setFill(new Color(0.5, 0.5, 0.5, 0.1))`?
أ) Sets fill to black with full opacity  ب) Sets fill to gray with 10% opacity (nearly transparent)  ج) Sets fill to white  د) Throws `IllegalArgumentException`
**الإجابة الصحيحة: ب**
**التعليل:** `Color(r,g,b,a)` — r=g=b=0.5 يعطي رمادياً، a=0.1 يعني 10% معتم (شبه شفاف).

---

### السؤال 16 (متوسط)
What does `outCel.setEditable(false)` do in `FahrConvert`?
أ) Hides the text field  ب) Prevents the user from typing in the field  ج) Disables the button  د) Clears the field content
**الإجابة الصحيحة: ب**
**التعليل:** `setEditable(false)` يجعل الحقل للقراءة فقط — المستخدم يرى النتيجة لكن لا يستطيع تعديلها.

---

### السؤال 17 (صعب)
In `GridPane.add(node, 1, 3)`, what do the second and third arguments represent?
أ) x-coordinate and y-coordinate  ب) row and column  ج) column index and row index  د) width and height
**الإجابة الصحيحة: ج**
**التعليل:** `add(node, columnIndex, rowIndex)` — العمود أولاً ثم الصف (يُربك كثيرين لأن المعتاد الصف أولاً).

---

### السؤال 18 (صعب)
What is the purpose of `KeyAdapter` over implementing `KeyListener` directly?
أ) `KeyAdapter` is faster  ب) `KeyAdapter` provides empty implementations, so only needed methods are overridden  ج) `KeyAdapter` handles mouse events too  د) `KeyListener` is deprecated
**الإجابة الصحيحة: ب**
**التعليل:** `KeyListener` له 3 دوال إلزامية (`keyPressed`, `keyReleased`, `keyTyped`). `KeyAdapter` ينفّذها جميعاً فارغة — تجاوز ما تحتاجه فقط.

---

### السؤال 19 (متوسط)
In `JOptionPane.showMessageDialog(null, sum, "SUM", JOptionPane.INFORMATION_MESSAGE)`, what does the first argument `null` represent?
أ) No parent component (dialog centered on screen)  ب) Empty message  ج) No title  د) Dialog will not close
**الإجابة الصحيحة: أ**
**التعليل:** المعامل الأول هو النافذة الأب — `null` يعني لا أب، فتظهر النافذة في منتصف الشاشة.

---

### السؤال 20 (صعب)
In `PathTransition`, `new Line(100, 200, 100, 0)` defines:
أ) A horizontal line  ب) A diagonal line  ج) A vertical line from (100,200) to (100,0)  د) A circle path
**الإجابة الصحيحة: ج**
**التعليل:** `Line(startX, startY, endX, endY)` — `startX=endX=100` يعني حركة رأسية من y=200 إلى y=0.

---

### السؤال 21 (صعب)
In `WageCalculator`, if `hoursWorked = 45` and `hourlyWage = 80`, what is the gross wage?
أ) `3600`  ب) `3800`  ج) `4000`  د) `3200`
**الإجابة الصحيحة: ب**
**التعليل:** 40 ساعة عادية + 5 ساعات إضافية: `wages = 40×80 = 3200` ثم `wages += 5 × (1.5×80) = 5×120 = 600`. الإجمالي: `3200+600 = 3800`.

---

### السؤال 22 (متوسط)
Which method must be overridden when implementing `EventHandler<ActionEvent>` in JavaFX?
أ) `actionPerformed(ActionEvent e)`  ب) `handle(ActionEvent e)`  ج) `onClick(ActionEvent e)`  د) `trigger(ActionEvent e)`
**الإجابة الصحيحة: ب**
**التعليل:** `EventHandler<T>` له دالة واحدة: `handle(T event)`. أما `actionPerformed` فهي في Swing `ActionListener`.

---

### السؤال 23 (صعب)
What is the correct order for a `Swing` GUI constructor to work properly?
أ) add components → set layout → register listeners  ب) set layout → register listeners → add components  ج) set layout → add components → register listeners  د) All orders are equivalent
**الإجابة الصحيحة: ج**
**التعليل:** الترتيب الصحيح: حدّد التخطيط أولاً، أضف المكوّنات، سجّل المستمعين. الترتيب يؤثر على سلوك `setEditable` وغيره.

---

### السؤال 24 (صعب)
In `BorderPane`, if `setTop()`, `setLeft()`, and `setCenter()` are called, what happens to the unset regions (right and bottom)?
أ) They throw a `NullPointerException`  ب) They remain empty but allocated space  ج) They collapse and use no space  د) They are filled with default components
**الإجابة الصحيحة: ج**
**التعليل:** المناطق غير المُعيَّنة في `BorderPane` تنكمش ولا تأخذ مساحة — السلوك الافتراضي.

---

### السؤال 25 (صعب)
In the `CarPayment` program, `paymentsJTextArea.append("\n" + months + "\t" + currency.format(monthlyPayment))` is called inside a loop. What does `\t` represent?
أ) A newline character  ب) A tab character (for column alignment)  ج) A space character  د) End of line marker
**الإجابة الصحيحة: ب**
**التعليل:** `\t` = tab للمحاذاة في أعمدة النص. `\n` = سطر جديد. الاثنان معاً يُنشئان جدولاً منسّقاً في `JTextArea`.

---

## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: ترجمة، منطقية، فحص إرجاع، dead code، سوء فهم.

---

### سؤال تصحيح 1

**الكود (يحتوي خطأ):**
```java
public class MyApp extends JFrame {
    JButton btn = new JButton("Click");
    
    MyApp() {
        getContentPane().add(btn);
        btn.addActionListener(this);  // ERROR HERE
        setSize(200, 100);
        setVisible(true);
    }
    
    public static void main(String[] args) {
        new MyApp();
    }
}
```
**اكتشف الخطأ:** The class does not implement `ActionListener`, so `this` cannot be used as a listener argument.

**التصحيح:**
```java
public class MyApp extends JFrame implements ActionListener {
    JButton btn = new JButton("Click");
    
    MyApp() {
        getContentPane().add(btn);
        btn.addActionListener(this);  // now valid
        setSize(200, 100);
        setVisible(true);
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Clicked!");
    }
    
    public static void main(String[] args) {
        new MyApp();
    }
}
```
**شرح الحل:**
1. يجب أن يُنفّذ الكلاس `ActionListener` حتى يُمرَّر `this` كمعالج
2. تنفيذ `ActionListener` يُلزم بتجاوز `actionPerformed`
3. بدون `implements` يحدث `ClassCastException` في وقت التشغيل

---

### سؤال تصحيح 2

**الكود (يحتوي خطأ):**
```java
JRadioButton rb1 = new JRadioButton("Option A");
JRadioButton rb2 = new JRadioButton("Option B");
ButtonGroup bg = new ButtonGroup();
bg.add(rb1);
bg.add(rb2);
getContentPane().add(bg);  // ERROR
getContentPane().add(rb1);
getContentPane().add(rb2);
```
**اكتشف الخطأ:** `ButtonGroup` cannot be added to a container — it's a logical grouping, not a visual component.

**التصحيح:**
```java
JRadioButton rb1 = new JRadioButton("Option A");
JRadioButton rb2 = new JRadioButton("Option B");
ButtonGroup bg = new ButtonGroup();
bg.add(rb1);
bg.add(rb2);
// Do NOT add bg to container — add the buttons directly
getContentPane().add(rb1);
getContentPane().add(rb2);
```
**شرح الحل:**
1. `ButtonGroup` ليست مكوّناً مرئياً — لها منطق فقط
2. الأزرار نفسها تُضاف للنافذة، و`ButtonGroup` تُجمّعها منطقياً
3. إضافة `ButtonGroup` للنافذة تسبب خطأ في الترجمة

---

### سؤال تصحيح 3

**الكود (يحتوي خطأ):**
```java
public class MyFX extends Application {
    public static void main(String[] args) {
        MyFX app = new MyFX();  // ERROR
        app.start(new Stage());
    }
    
    @Override
    public void start(Stage stage) {
        stage.setTitle("Test");
        stage.show();
    }
}
```
**اكتشف الخطأ:** JavaFX applications must be launched via `Application.launch(args)`, not by directly instantiating and calling `start()`.

**التصحيح:**
```java
public class MyFX extends Application {
    public static void main(String[] args) {
        Application.launch(args);  // correct way to start JavaFX
    }
    
    @Override
    public void start(Stage stage) {
        stage.setTitle("Test");
        stage.show();
    }
}
```
**شرح الحل:**
1. `Application.launch` يُهيّئ بيئة JavaFX ثم يستدعي `start` تلقائياً
2. إنشاء كائن يدوياً لا يُهيّئ خيط JavaFX — يسبب `IllegalStateException`
3. بدون `launch`، التطبيق لن يعرض النافذة بشكل صحيح

---

### سؤال تصحيح 4

**الكود (يحتوي خطأ منطقياً):**
```java
public void actionPerformed(ActionEvent evt) {
    String userIn = inFahr.getText();
    fahrTemp = Integer.parseInt(userIn);
    celsTemp = ((fahrTemp - 32) * 5 / 9);  // ERROR: integer division
    outCel.setText(celsTemp + " ");
}
```
**اكتشف الخطأ:** `5 / 9` is integer division, which always equals `0` in Java, making the formula always return `(-32 * 0) = 0` for most inputs.

**التصحيح:**
```java
public void actionPerformed(ActionEvent evt) {
    String userIn = inFahr.getText();
    fahrTemp = Integer.parseInt(userIn);
    celsTemp = ((fahrTemp - 32) * 5) / 9;  // correct: multiply first, then divide
    // Or: celsTemp = (int)((fahrTemp - 32) * 5.0 / 9);
    outCel.setText(celsTemp + " ");
}
```
**شرح الحل:**
1. في التعبير `5 / 9`، كلاهما `int` فتكون النتيجة `0`
2. الحل: اضرب قبل القسمة `(fahrTemp - 32) * 5) / 9` أو استخدم `5.0`
3. ترتيب العمليات الحسابية مهم جداً في جافا

---

### سؤال تصحيح 5

**الكود (يحتوي خطأ):**
```java
public class ShowCircle extends Application {
    @Override
    public void start(Stage primaryStage) {
        Circle circle = new Circle();
        circle.setRadius(50);
        
        Pane pane = new Pane();
        pane.getChildren().add(circle);
        
        circle.centerXProperty().bind(pane.widthProperty().divide(2));
        circle.setCenterX(100);  // ERROR: conflict with binding
        
        Scene scene = new Scene(pane, 200, 200);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}
```
**اكتشف الخطأ:** After binding `centerXProperty`, calling `setCenterX(100)` throws a runtime exception because you cannot set a bound property.

**التصحيح:**
```java
// Either use binding OR set a fixed value — not both
circle.centerXProperty().bind(pane.widthProperty().divide(2));
// Remove: circle.setCenterX(100);  -- conflicts with binding
```
**شرح الحل:**
1. بعد `bind`، الخاصية تصبح للقراءة فقط — لا يمكن `set` عليها
2. اختر إما قيمة ثابتة أو ربط ديناميكي
3. `RuntimeException` يُرمى عند محاولة تعيين خاصية مرتبطة

---

### سؤال تصحيح 6

**الكود (يحتوي خطأ):**
```java
public class KeyDemo extends Application {
    @Override
    public void start(Stage primaryStage) {
        Pane pane = new Pane();
        Text text = new Text(20, 20, "A");
        pane.getChildren().add(text);
        
        text.setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.UP)
                text.setY(text.getY() - 10);
        });
        
        Scene scene = new Scene(pane, 200, 200);
        primaryStage.setScene(scene);
        primaryStage.show();
        // Missing: text.requestFocus()  -- ERROR
    }
}
```
**اكتشف الخطأ:** Without `text.requestFocus()`, the `Text` node never receives keyboard events because it doesn't have focus.

**التصحيح:**
```java
primaryStage.show();
text.requestFocus();  // give keyboard focus to the text node
```
**شرح الحل:**
1. الأحداث الكيبوردية تُرسَل فقط للـ`Node` الذي يملك التركيز
2. `requestFocus()` يُعطي التركيز للـ`Text` بعد إظهار النافذة
3. يجب استدعاؤه بعد `show()` لأن النافذة يجب أن تكون مرئية أولاً

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

---

### تمرين 1 (تمرين إضافي): حساب المستطيل — fill_gaps

**السيناريو / المطلوب:**
```java
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class RectArea extends JFrame implements _______ {
    JTextField tfLength = new JTextField(7);
    JTextField tfWidth  = new JTextField(7);
    JTextField tfArea   = new JTextField(7);
    JButton    btnCalc  = new JButton("Calculate");

    RectArea() {
        getContentPane().setLayout(new _______());
        getContentPane().add(new JLabel("Length:"));
        getContentPane().add(_______);
        getContentPane().add(new JLabel("Width:"));
        getContentPane().add(tfWidth);
        getContentPane().add(new JLabel("Area:"));
        getContentPane().add(tfArea);
        getContentPane().add(btnCalc);
        btnCalc.addActionListener(_______);
        tfArea.setEditable(_______);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    public void actionPerformed(ActionEvent e) {
        double l = Double.parseDouble(tfLength.getText());
        double w = Double.parseDouble(tfWidth.getText());
        tfArea.setText(_______ + "");
    }
}
```

**المطلوب:**
1. أكمل الفراغات

**نموذج الحل:**
```java
// ActionListener    FlowLayout    tfLength    this    false    l * w
```

---

### تمرين 2 (تمرين إضافي): إنشاء نافذة JavaFX بدائرة — code_fix

**السيناريو:**
```java
public class MyCircle extends Application {
    public void begin(Stage stage) {  // ERROR
        Circle c = new Circle(100, 100, 50);
        c.setFill(Color.RED);
        Pane p = new Pane();
        p.getChildren().add(c);
        Scene scene = new Scene(p, 200, 200);
        stage.setScene(scene);
        stage.show();
    }
    public static void main(String[] args) {
        launch(args);
    }
}
```

**المطلوب:**
1. حدّد الخطأ وصحّحه

**نموذج الحل:**
```java
// الخطأ: اسم الدالة "begin" بدل "start" — JavaFX تستدعي start() وليس begin()
@Override
public void start(Stage stage) {  // FIXED
    Circle c = new Circle(100, 100, 50);
    c.setFill(Color.RED);
    Pane p = new Pane();
    p.getChildren().add(c);
    Scene scene = new Scene(p, 200, 200);
    stage.setScene(scene);
    stage.show();
}
```

---

### تمرين 3 (تمرين إضافي): تحليل برنامج PhonePrice — scenario

**السيناريو:**
برنامج `PhonePrice` يُدخل المستخدم سعر هاتف = 100000 ونسبة ضريبة = 15%.

**المطلوب:**
1. ما قيمة `total` بعد `calcTax()`؟
2. ما الذي يعرضه الحقل `t`؟

**نموذج الحل:**
```
total = ((100000 × 15) / 100.0) + 100000
      = (1500000 / 100.0) + 100000
      = 15000.0 + 100000
      = 115000.0

الحقل t يعرض: "115000.0 "
```

---

### تمرين 4 (تمرين إضافي): تمييز Layout Managers — fill_gaps

**المطلوب:** صل كل وصف بالـ Layout المناسب

| الوصف | Layout |
|---|---|
| يرتب المكوّنات عمودياً في JavaFX | ؟ |
| 5 مناطق: top, bottom, left, right, center | ؟ |
| تحديد مواضع يدوي بـ setBounds | ؟ |
| يضع المكوّنات فوق بعضها في المركز | ؟ |
| شبكة ثنائية الأبعاد | ؟ |

**نموذج الحل:**
| الوصف | Layout |
|---|---|
| عمودياً في JavaFX | `VBox` |
| 5 مناطق | `BorderPane` / `BorderLayout` |
| يدوي | `null` layout |
| فوق بعضها في المركز | `StackPane` |
| شبكة | `GridPane` / `GridLayout` |

---

### تمرين 5 (تمرين إضافي): Lambda مقابل Anonymous Class — code_fix

**المطلوب:** حوّل هذا الكود إلى Lambda:
```java
button.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Clicked");
    }
});
```

**نموذج الحل:**
```java
// JavaFX style (setOnAction):
button.setOnAction(e -> System.out.println("Clicked"));

// Swing style (addActionListener with lambda - Java 8+):
button.addActionListener(e -> System.out.println("Clicked"));
```

---

### تمرين 6 (تمرين إضافي): تحليل Interest Calculator — scenario

**المطلوب:** لبرنامج حساب الفائدة، ما قيمة `amount` عند `count=3` إذا كان `principal=1000` و`rate=10%`؟

**نموذج الحل:**
```
amount = principal × (1 + rate/100)^count
       = 1000 × (1 + 0.10)^3
       = 1000 × (1.1)^3
       = 1000 × 1.331
       = 1331.0
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

---

### تمرين 1: تحليل بنية MVC في GUI

**السيناريو:**
في برنامج `WageCalculator`، حدّد كيف يتوزع المسؤوليات بين المكوّنات.

**المطلوب:**
1. حدّد ما هو الـ Model (المنطق)
2. حدّد ما هو الـ View (الواجهة)
3. حدّد ما هو الـ Controller (التحكم)

**نموذج الحل:**

| الطبقة | المكوّن | الوصف |
|---|---|---|
| Model | حسابات `wages`, `grossWages`, `federalTaxes` | المنطق والحسابات |
| View | `JLabel`, `JTextField`, `JButton` | ما يراه المستخدم |
| Controller | `actionPerformed`, `keyPressed` handlers | معالجة الأحداث والتنسيق |

> في `LoanCalculator` بـ JavaFX كان الـ Model منفصلاً (كلاس `Loan`) — أفضل تصميم.

---

### تمرين 2: مقارنة JFrame مع Application

**المطلوب:** أكمل الجدول:

| المعيار | Swing JFrame | JavaFX Application |
|---|---|---|
| نقطة الدخول | ؟ | ؟ |
| إنشاء النافذة | ؟ | ؟ |
| إضافة مكوّنات | ؟ | ؟ |
| معالجة الأحداث | ؟ | ؟ |
| الإغلاق | ؟ | ؟ |

**نموذج الحل:**

| المعيار | Swing JFrame | JavaFX Application |
|---|---|---|
| نقطة الدخول | `main` مباشرة | `main` → `launch` → `start` |
| إنشاء النافذة | `new JFrame()` أو وراثة | `Stage primaryStage` تُعطى تلقائياً |
| إضافة مكوّنات | `getContentPane().add()` | `pane.getChildren().add()` |
| معالجة الأحداث | `addActionListener(listener)` | `setOnAction(handler/lambda)` |
| الإغلاق | `setDefaultCloseOperation(EXIT_ON_CLOSE)` | `application.setDefaultCloseOperation` |

---

### تمرين 3: اكتشاف نمط Observer في GUI

**السيناريو:**
في برنامج `FahrConvert`، `btn.addActionListener(this)` يُمثّل نمط Observer.

**المطلوب:**
1. من هو `Publisher` (Subject)؟
2. من هو `Subscriber` (Observer)؟
3. ما الحدث المُراقَب؟

**نموذج الحل:**
1. `Publisher`: `JButton butt` — ينشر حدث `ActionEvent` عند الضغط
2. `Subscriber`: `FahrConvert` (عبر `actionPerformed`) — يستقبل الحدث
3. الحدث: ضغط زر "Convert"

---

## الجزء الرابع: تمارين تتبع التنفيذ

> هذه تمارين إضافية من إعداد الدليل لاختبار الفهم العميق بتتبع التنفيذ خطوة بخطوة.

---

### تمرين تتبع 1: JOptionPane Sum Program

**المدخل:**
```
المستخدم يُدخل: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| i | المُدخَل | x | sum بعد الإضافة |
|---|---|---|---|
| 0 | 10 | 10 | ؟ |
| 1 | 20 | 20 | ؟ |
| 2 | 30 | 30 | ؟ |
| ... | ... | ... | ؟ |
| 9 | 100 | 100 | ؟ |

**نموذج الحل:**

| i | المُدخَل | x | sum |
|---|---|---|---|
| 0 | 10 | 10 | 10 |
| 1 | 20 | 20 | 30 |
| 2 | 30 | 30 | 60 |
| 3 | 40 | 40 | 100 |
| 4 | 50 | 50 | 150 |
| 5 | 60 | 60 | 210 |
| 6 | 70 | 70 | 280 |
| 7 | 80 | 80 | 360 |
| 8 | 90 | 90 | 450 |
| 9 | 100 | 100 | 550 |

**النتيجة:** `JOptionPane` يعرض `550` في نافذة `INFORMATION_MESSAGE`.

---

### تمرين تتبع 2: WageCalculator — حساب الأجر

**المدخل:**
```
hourlyWage = 10.0
hoursWorked = 50
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | القيمة |
|---|---|---|
| 1 | `hoursWorked <= 40`؟ | ؟ |
| 2 | `wages = 40 * 10.0` (العادية) | ؟ |
| 3 | `(50-40) * 1.5 * 10.0` (الإضافية) | ؟ |
| 4 | `grossWages = wages عادي + إضافي` | ؟ |
| 5 | `federalTaxes = grossWages * 0.05` | ؟ |
| 6 | `netWages = grossWages - federalTaxes` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | القيمة |
|---|---|---|
| 1 | `50 <= 40`؟ | لا → يدخل else |
| 2 | `wages = 40 × 10 = 400` | 400.0 |
| 3 | `wages += (50-40) × 1.5 × 10 = 150` | 400+150=550.0 |
| 4 | `grossWages = 550.0` → format → `$550.00` | `$550.00` |
| 5 | `federalTaxes = 550 × 0.05 = 27.5` → `$27.50` | `$27.50` |
| 6 | `netWages = 550 - 27.5 = 522.5` → `$522.50` | `$522.50` |

**النتيجة:** Gross=$550.00, Federal=$27.50, Net=$522.50

---

### تمرين تتبع 3: CrapsGame — تتبع اللعبة

**المدخل:**
```
اللفة الأولى: die1=3, die2=4 → sum=7
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | الحالة |
|---|---|---|
| 1 | `playJButtonActionPerformed` استُدعي | ؟ |
| 2 | `rollDice()` → sum = 7 | ؟ |
| 3 | `switch(7)` → case LUCKY_SEVEN | ؟ |
| 4 | حالة الأزرار | ؟ |

**نموذج الحل:**

| الخطوة | العملية | الحالة |
|---|---|---|
| 1 | مسح الـ point panel | pointPanel فارغ |
| 2 | `rollDice()` → 3+4=7 | الحق صور النرد |
| 3 | `case 7` → LUCKY_SEVEN | `resultJTextField = "You win!!!"` |
| 4 | لا تغيير للأزرار | `playJButton` لا يزال مفعّلاً |

**النتيجة:** فوز فوري — لا حاجة للف مجدداً.

---

### تمرين تتبع 4: StudentGrades — حساب المتوسطات

**المدخل:**
```
Student: "Ahmad", Test1=67, Test2=87, Test3=95
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | القيمة |
|---|---|---|
| 1 | `studentTotal += 67` | ؟ |
| 2 | `studentTotal += 87` | ؟ |
| 3 | `studentTotal += 95` | ؟ |
| 4 | `studentAverage = studentTotal / 3.0` | ؟ |
| 5 | `twoDigits.format(studentAverage)` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | القيمة |
|---|---|---|
| 1 | `studentTotal += 67` | 67 |
| 2 | `studentTotal += 87` | 154 |
| 3 | `studentTotal += 95` | 249 |
| 4 | `249 / 3.0 = 83.0` | 83.0 |
| 5 | `"83.00"` | "83.00" |

**النتيجة:** `displayJTextArea` يعرض: `Ahmad    67    87    95    83.00`

---

### تمرين تتبع 5: CarPayment — حساب القسط الشهري

**المدخل:**
```
price=40000, downPayment=10000, interest=6
years=2 (first iteration)
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | القيمة |
|---|---|---|
| 1 | `loanAmount = price - downPayment` | ؟ |
| 2 | `monthlyInterest = 6 / 1200` | ؟ |
| 3 | `months = 12 × 2` | ؟ |
| 4 | `base = (1 + 0.005)^24` | ≈ ? |
| 5 | `monthlyPayment = 30000 × 0.005 / (1 - 1/base)` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | القيمة |
|---|---|---|
| 1 | `40000 - 10000` | 30000 |
| 2 | `6 / 1200 = 0.005` | 0.005 |
| 3 | `12 × 2 = 24` | 24 |
| 4 | `(1.005)^24 ≈ 1.1272` | ≈ 1.1272 |
| 5 | `30000×0.005 / (1 - 1/1.1272) ≈ 150 / 0.1129 ≈ 1329.62` | $1329.62 |

**النتيجة:** القسط الشهري لمدة 24 شهراً = $1329.62

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is a `GUI`?
A: واجهة مستخدم رسومية تسمح بالتفاعل مع البرنامج عبر مكوّنات بصرية (أزرار، نصوص، صور) بدل الأوامر النصية.

**Q2:** What package contains `JFrame`?
A: `javax.swing`

**Q3:** What interface handles button clicks in Swing?
A: `ActionListener` — يجب تنفيذ `actionPerformed(ActionEvent e)`

**Q4:** What does `addActionListener(this)` mean?
A: يُسجّل الكلاس الحالي كمعالج للحدث — يجب أن ينفّذ الكلاس `ActionListener`

**Q5:** What is `FlowLayout`?
A: تخطيط يرتب المكوّنات أفقياً ويلتف لسطر جديد — الافتراضي لـ `JPanel`

**Q6:** What does `setBounds(16, 48, 104, 21)` set?
A: موضع وحجم المكوّن: x=16، y=48، عرض=104، ارتفاع=21 بيكسل

**Q7:** What is `KeyAdapter` and why use it over `KeyListener`?
A: كلاس مجردة توفر تنفيذاً فارغاً لكل دوال `KeyListener` — تجاوز الدوال التي تحتاجها فقط

**Q8:** What is the difference between `JTextArea` and `JTextField`?
A: `JTextField` حقل نص سطر واحد، `JTextArea` منطقة نص متعددة الأسطر

**Q9:** What does `JScrollPane` add to a component?
A: يضيف شريط تمرير تلقائياً عندما يتجاوز المحتوى الحجم المرئي

**Q10:** What is `ButtonGroup` used for?
A: تجميع `JRadioButton` لضمان اختيار واحد فقط — لا تُضاف للنافذة

**Q11:** What is `SpinnerNumberModel(1, 1, 10, 1)`?
A: نموذج للـ `JSpinner`: القيمة الابتدائية=1، الحد الأدنى=1، الحد الأقصى=10، الخطوة=1

**Q12:** What is the JavaFX equivalent of `JFrame`?
A: `Stage` — النافذة الرئيسية في JavaFX

**Q13:** What must every JavaFX application extend?
A: `Application` — وتجاوز دالة `start(Stage primaryStage)`

**Q14:** How do you start a JavaFX application?
A: `Application.launch(args)` في `main` — لا تستدعِ `start` مباشرة

**Q15:** What is `StackPane`?
A: حاوي يضع المكوّنات فوق بعضها في مركز النافذة

**Q16:** How do you add a node to a JavaFX Pane?
A: `pane.getChildren().add(node)`

**Q17:** What is Property Binding in JavaFX?
A: ربط خاصية بخاصية أخرى ديناميكياً: `a.property().bind(b.property())`

**Q18:** What is a Lambda expression in event handling?
A: دالة مجهولة مختصرة: `e -> action()` تُعادل `EventHandler<ActionEvent>` بـ `handle`

**Q19:** What is `BorderPane` in JavaFX?
A: حاوي يقسّم النافذة لـ 5 مناطق: top، bottom، left، right، center

**Q20:** What does `HBox(15)` mean?
A: `HBox` بمسافة 15 بيكسل بين كل مكوّنَين

**Q21:** What does `DecimalFormat("$0.00").format(value)` do?
A: يُنسّق الرقم بتنسيق دولار مع خانتين عشريتين دائماً

**Q22:** What is `PathTransition`?
A: مكوّن تحريك JavaFX يحرّك `Node` على طول مسار محدد خلال مدة زمنية

**Q23:** What is `requestFocus()` needed for?
A: يُعطي التركيز للـ`Node` حتى يستقبل أحداث الكيبورد

**Q24:** What does `imageView.setRotate(90)` do?
A: يدوّر الصورة 90 درجة باتجاه عقارب الساعة

**Q25:** What is the difference between `setFill` and `setStroke` in JavaFX shapes?
A: `setFill` يضبط لون داخل الشكل، `setStroke` يضبط لون الحدود (الخط الخارجي)

**Q26:** What does `numericJRadioButton.isSelected()` return?
A: `true` إذا كان الزر محدداً، `false` إذا لم يكن

**Q27:** What is `TitledBorder`?
A: إطار مُصنَّف بعنوان يُحيط بـ `JPanel` — من `javax.swing.border`

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

### كود FahrConvert — مرجع كامل

```java
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class FahrConvert extends JFrame implements ActionListener {
    JLabel title    = new JLabel("Convert Fahrenheit to Celsius");
    JLabel inLabel  = new JLabel("Fahrenheit ");
    JLabel outLabel = new JLabel("Celsius ");
    JTextField inFahr = new JTextField(7);
    JTextField outCel = new JTextField(7);
    JButton butt = new JButton("Convert");
    int fahrTemp;
    int celsTemp;

    FahrConvert() {
        getContentPane().setLayout(new FlowLayout());
        butt.addActionListener(this);
        getContentPane().add(title);
        getContentPane().add(inLabel);
        getContentPane().add(outLabel);
        getContentPane().add(inFahr);
        getContentPane().add(outCel);
        getContentPane().add(butt);
        outCel.setEditable(false);
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    public void convert() {
        celsTemp = ((fahrTemp - 32) * 5) / 9;
    }

    public void actionPerformed(ActionEvent evt) {
        String userIn = inFahr.getText();
        fahrTemp = Integer.parseInt(userIn);
        convert();
        outCel.setText(celsTemp + " ");
    }

    public static void main(String[] args) {
        FahrConvert fahr = new FahrConvert();
        fahr.setSize(200, 150);
        fahr.setVisible(true);
    }
}
```

---

### كود ButtonInPane — JavaFX مرجع كامل

```java
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;
import javafx.scene.layout.StackPane;

public class ButtonInPane extends Application {
    @Override
    public void start(Stage primaryStage) {
        StackPane pane = new StackPane();
        pane.getChildren().add(new Button("OK"));
        Scene scene = new Scene(pane, 200, 50);
        primaryStage.setTitle("Button in a pane");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        Application.launch(args);
    }
}
```

---

### كود HandleEvent — JavaFX مع كلاسات خارجية

```java
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

public class HandleEvent extends Application {
    @Override
    public void start(Stage primaryStage) {
        HBox pane = new HBox(10);
        pane.setAlignment(Pos.CENTER);
        Button btOK     = new Button("OK");
        Button btCancel = new Button("Cancel");

        btOK.setOnAction(new OKHandlerClass());
        btCancel.setOnAction(new CancelHandlerClass());

        pane.getChildren().addAll(btOK, btCancel);
        primaryStage.setScene(new Scene(pane));
        primaryStage.setTitle("HandleEvent");
        primaryStage.show();
    }

    public static void main(String[] args) {
        Application.launch(args);
    }
}

class OKHandlerClass implements EventHandler<ActionEvent> {
    @Override
    public void handle(ActionEvent e) {
        System.out.println("OK button clicked");
    }
}

class CancelHandlerClass implements EventHandler<ActionEvent> {
    @Override
    public void handle(ActionEvent e) {
        System.out.println("Cancel button clicked");
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

---

### سؤال 1: What is a GUI and what are its main components?
**نموذج الإجابة:**
1. **التعريف:** `GUI` (Graphical User Interface) واجهة تسمح بالتفاعل مع البرنامج بصرياً بدل الأوامر النصية
2. **المكوّنات:** event source (مصدر الحدث) + event object (كائن الحدث) + event handler (المعالج)
3. **مثال:** زر (`JButton`) → `ActionEvent` → `actionPerformed`
4. **متى نستخدم:** كل تطبيق يحتاج تفاعلاً مع المستخدم

---

### سؤال 2: What is the difference between `java.awt` and `javax.swing`?
**نموذج الإجابة:**
1. **التعريف:** `AWT` مكتبة GUI قديمة تعتمد على مكوّنات النظام التشغيلي. `Swing` أحدث ومستقلة عن النظام
2. **المكوّنات:** `AWT` لها `Frame`, `Button`, `TextField`. `Swing` لها `JFrame`, `JButton`, `JTextField` (كلها تبدأ بـ `J`)
3. **مثال:** `JFrame` أغنى من `Frame`
4. **متى نستخدم:** `Swing` هي المعيار الحديث، `AWT` للتخطيطات والأحداث

---

### سؤال 3: Explain the role of `ActionListener` in Swing.
**نموذج الإجابة:**
1. **التعريف:** واجهة (`interface`) تُلزم الكلاس بتنفيذ `actionPerformed(ActionEvent e)`
2. **المكوّنات:** الكلاس يُنفّذها + تُسجَّل عبر `addActionListener(this)`
3. **مثال:** `class App extends JFrame implements ActionListener { public void actionPerformed(ActionEvent e){...} }`
4. **متى نستخدم:** لكل مكوّن يُطلق حدث `ActionEvent` (أزرار، قوائم)

---

### سؤال 4: What is `null` layout and when should it be used?
**نموذج الإجابة:**
1. **التعريف:** إلغاء التخطيط التلقائي — المبرمج يحدد مواضع المكوّنات يدوياً بـ `setBounds`
2. **المكوّنات:** `contentPane.setLayout(null)` + `component.setBounds(x, y, w, h)`
3. **مثال:** `button.setBounds(100, 50, 80, 24)` → الزر في x=100، y=50، عرض=80، ارتفاع=24
4. **متى نستخدم:** التصاميم التي تتطلب إحداثيات دقيقة لكنها لا تدعم تغيير الحجم

---

### سؤال 5: Describe the JavaFX application structure.
**نموذج الإجابة:**
1. **التعريف:** كل تطبيق `JavaFX` يرث `Application` ويجاوز `start(Stage)`
2. **المكوّنات:** `Stage` (النافذة) → `Scene` (المحتوى) → `Pane` (الحاوي) → `Nodes` (المكوّنات)
3. **مثال:** `extends Application` → `start(Stage s)` → `new StackPane()` → `new Scene(pane)` → `s.show()`
4. **متى نستخدم:** كل تطبيق JavaFX يلتزم بهذه البنية إلزامياً

---

### سؤال 6: What is Property Binding in JavaFX and why is it useful?
**نموذج الإجابة:**
1. **التعريف:** ربط خاصية بخاصية أخرى ديناميكياً — تتغيّر تلقائياً عند تغيّر المصدر
2. **المكوّنات:** `a.property().bind(b.property())` — حين يتغيّر `b.property()` يتغيّر `a.property()` تلقائياً
3. **مثال:** `circle.centerXProperty().bind(pane.widthProperty().divide(2))` — الدائرة دائماً في المركز
4. **متى نستخدم:** للمكوّنات المرنة التي يجب أن تتكيّف مع تغيير حجم النافذة

---

### سؤال 7: Compare Swing event handling with JavaFX event handling.
**نموذج الإجابة:**
1. **Swing:** `implements ActionListener` + `addActionListener(this)` + `actionPerformed(ActionEvent e)`
2. **JavaFX:** `setOnAction(EventHandler)` أو Lambda `e -> action()`
3. **الفرق:** JavaFX أكثر مرونة ويدعم Lambda؛ Swing يتطلب تنفيذ واجهة
4. **التوصية:** Lambda للعمليات البسيطة، كلاس خارجي للمعالجات المعاد استخدامها

---

### سؤال 8: What are anonymous inner classes and when are they used?
**نموذج الإجابة:**
1. **التعريف:** كلاس يُعرَّف ويُنشأ في مكانه مباشرة بلا اسم
2. **المكوّنات:** `new InterfaceName() { @Override public void method(){...} }`
3. **مثال:** `button.addActionListener(new ActionListener() { public void actionPerformed(ActionEvent e){...} })`
4. **متى نستخدم:** معالجات أحداث مرتبطة بمكوّن واحد — بديل Lambda في Java قبل الإصدار 8

---

### سؤال 9: Explain `ButtonGroup` and why it is needed.
**نموذج الإجابة:**
1. **التعريف:** كلاس يُجمّع `JRadioButton` منطقياً لضمان الاختيار الحصري
2. **المكوّنات:** `ButtonGroup bg = new ButtonGroup()` + `bg.add(rb1)` + `bg.add(rb2)`
3. **مثال:** بدون `ButtonGroup`، يمكن تحديد كل الأزرار معاً
4. **مهم:** `ButtonGroup` لا تُضاف للنافذة — الأزرار فقط تُضاف

---

### سؤال 10: What is `PathTransition` in JavaFX?
**نموذج الإجابة:**
1. **التعريف:** مكوّن تحريك يحرّك `Node` على طول مسار (`Path`) خلال مدة محددة
2. **المكوّنات:** `new PathTransition(Duration, Path, Node)` + `setCycleCount(n)` + `play()`
3. **مثال:** `new PathTransition(Duration.millis(5000), new Line(0,0,100,100), imageView)`
4. **متى نستخدم:** تحريك عناصر واجهة المستخدم في JavaFX

---

### سؤال 11: What is the difference between `GridPane` in JavaFX and `GridLayout` in Swing?
**نموذج الإجابة:**
1. **GridPane:** `add(node, col, row)` — خلايا بأحجام مرنة، دعم padding وgaps
2. **GridLayout:** `add(component)` — ترتيب تسلسلي، خلايا بأحجام متساوية
3. **مثال GridPane:** `pane.add(new Label("Name:"), 0, 0)` — عمود 0، صف 0
4. **التوصية:** `GridPane` أكثر مرونة وأدق

---

### سؤال 12: What is `DecimalFormat` and how is it used?
**نموذج الإجابة:**
1. **التعريف:** كلاس في `java.text` لتنسيق الأرقام بأنماط محددة
2. **المكوّنات:** `new DecimalFormat("pattern")` + `.format(number)`
3. **مثال:** `new DecimalFormat("$0.00").format(1500.0)` → `"$1500.00"`
4. **متى نستخدم:** عرض المبالغ المالية والأرقام بتنسيق احترافي

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم الفرق بين `java.awt`، `javax.swing`، وJavaFX
- [ ] أستطيع كتابة كلاس يرث `JFrame` ويُنفّذ `ActionListener`
- [ ] أعرف الفرق بين `FlowLayout`، `BoxLayout`، و`null` layout
- [ ] أفهم `setBounds(x, y, w, h)` مع `null` layout
- [ ] أستطيع استخدام `JOptionPane.showInputDialog` و`showMessageDialog`
- [ ] أعرف أنواع رسائل `JOptionPane` الخمسة
- [ ] أفهم `KeyAdapter` والفرق بينه وبين `KeyListener`
- [ ] أعرف كيفية استخدام `ButtonGroup` مع `JRadioButton`
- [ ] أفهم `JSpinner` و`SpinnerNumberModel(initial, min, max, step)`
- [ ] أستطيع استخدام `JTextArea.append()` و`JScrollPane`
- [ ] أفهم بنية تطبيق JavaFX: `Application → start → Stage → Scene → Pane`
- [ ] أعرف `Application.launch(args)` في `main`
- [ ] أستطيع إضافة مكوّنات JavaFX: `pane.getChildren().add(...)`
- [ ] أفهم `Property Binding`: `a.property().bind(b.property())`
- [ ] أعرف الفرق بين `StackPane`، `HBox`، `VBox`، `GridPane`، `BorderPane`
- [ ] أستطيع استخدام Lambda في `setOnAction`: `e -> action()`
- [ ] أعرف `EventHandler<ActionEvent>` والدالة `handle(ActionEvent e)`
- [ ] أفهم أحداث الفأرة (`setOnMouseDragged`) والكيبورد (`setOnKeyPressed`)
- [ ] أستطيع استخدام `PathTransition` للتحريك الأساسي
- [ ] أفهم `Circle`, `Rectangle`, `setStroke`, `setFill`, `setRotate`
- [ ] أعرف `DecimalFormat("$0.00").format(value)`
- [ ] أفهم `Anonymous Inner Class` كبديل لـLambda
- [ ] أستطيع تحليل كود `CrapsGame` وتتبع منطق الفوز والخسارة
- [ ] أعرف متى أستخدم `requestFocus()` ولماذا

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
|---|---|---|
| GUI Swing | OOP (وراثة) | `extends JFrame`, `implements ActionListener` |
| GUI Swing | Events | `ActionListener`, `KeyListener`, `ChangeListener` |
| JavaFX | Lambda (المحاضرات السابقة) | `e -> action()` |
| JavaFX | Binding | خصائص مرتبطة ديناميكياً |
| كلا التقنيتين | Layout Managers | ترتيب المكوّنات |

---

### 🔑 أهم النقاط الذهبية

| الموضوع | النقطة |
|---|---|
| Swing class | `extends JFrame implements ActionListener` |
| Swing listener | `button.addActionListener(this)` |
| JavaFX start | `Application.launch(args)` في main |
| JavaFX add node | `pane.getChildren().add(node)` |
| JavaFX lambda | `button.setOnAction(e -> action())` |
| null layout | `setLayout(null)` + `setBounds(x,y,w,h)` |
| ButtonGroup | تُجمّع الأزرار — لا تُضاف للنافذة |
| binding | `a.propX().bind(b.propY())` |
| KeyFocus | `node.requestFocus()` |

---

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
|---|---|---|
| `JFrame` | نافذة Swing | كل تطبيق Swing |
| `Stage` | نافذة JavaFX | كل تطبيق JavaFX |
| `getContentPane().add(c)` | إضافة مكوّن Swing | داخل بنّاء الكلاس |
| `pane.getChildren().add(c)` | إضافة مكوّن JavaFX | داخل `start` |
| `actionPerformed(ActionEvent e)` | معالج Swing | `implements ActionListener` |
| `handle(ActionEvent e)` | معالج JavaFX | `implements EventHandler<ActionEvent>` |
| `setBounds(x,y,w,h)` | موضع يدوي | `null` layout فقط |
| `setEditable(false)` | للقراءة فقط | حقول الإخراج |
| `setEnabled(false)` | تعطيل مكوّن | CrapsGame buttons |
| `requestFocus()` | تركيز keyboard | JavaFX key events |
| `bind()` | ربط ديناميكي | خصائص JavaFX |
| `launch(args)` | تشغيل JavaFX | main method |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
|---|---|
| 1 | `ButtonGroup` تُجمّع `JRadioButton` — لكنها لا تُضاف للنافذة |
| 2 | `setVisible(true)` دائماً آخر استدعاء في `main` (Swing) |
| 3 | `Application.launch(args)` وليس `new MyApp().start(...)` |
| 4 | `5/9` = 0 في جافا — استخدم `5.0/9` أو اضرب قبل القسمة |
| 5 | بعد `bind()` لا يمكن `set()` على نفس الخاصية |
| 6 | `requestFocus()` بعد `show()` لاستقبال أحداث الكيبورد |
| 7 | `pane.add(node, col, row)` في `GridPane` — العمود أولاً |
| 8 | `null` layout يتطلب `setBounds` لكل مكوّن |

---

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, theory, cheat_sheet, code
mcq_count: 25
code_blocks: 18
-->

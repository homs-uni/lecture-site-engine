# المحاضرة 4 — أسئلة MCQ: Structures (السجلات)

## مادة البرمجة 2 (C++) — Structures (السجلات)

**كلية الهندسة المعلوماتية — جامعة حمص — سوريا**  
**العام الدراسي 2025-2026**

---

## الجزء الأول: تعريف Structures وإنشاء المتغيرات (7 أسئلة)

### السؤال 1
ما الكلمة المفتاحية المستخدمة لتعريف Structure جديد في C++؟

- **أ)** class
- **ب)** struct
- **ج)** typedef
- **د)** union

### السؤال 2
ما ناتج الكود التالي؟

```cpp
struct Complex { double x; double y; };
int main() {
    Complex number = {3, 4};
    cout << number.x << " " << number.y;
    return 0;
}
```

- **أ)** 3 4
- **ب)** 4 3
- **ج)** خطأ في الترجمة
- **د)** 0 0

### السؤال 3
في الكود التالي، ما قيمة number.y؟

```cpp
struct Complex { double x; double y; };
int main() {
    Complex number = {5};
    cout << number.x << " " << number.y;
    return 0;
}
```

- **أ)** 5 و 5
- **ب)** 5 و 0
- **ج)** 0 و 5
- **د)** خطأ في الترجمة

### السؤال 4
أي العبارات التالية صحيحة حول تعريف Structure؟

- **أ)** يجب وضع ; بعد القوس } في نهاية تعريف الـ struct
- **ب)** لا يحتاج إلى ; بعد القوس }
- **ج)** يجب استخدام typedef دائماً مع struct
- **د)** لا يمكن تعريف struct داخل دالة main

### السؤال 5
ما الخطأ في تعريف الـ Structure التالي؟

```cpp
struct Complex {
    double x;
    double y;
    Complex xc;
};
```

- **أ)** لا يوجد خطأ
- **ب)** لا يمكن أن يحتوي الـ struct على متغير من نفس نوعه (حجم غير محدد)
- **ج)** يجب استخدام new
- **د)** يجب أن يكون xc مؤشراً

### السؤال 6
كيف يمكن حل مشكلة السؤال السابق بشكل صحيح؟

```cpp
struct Complex {
    double x;
    double y;
    // ما الحل الصحيح هنا؟
};
```

- **أ)** Complex xc;
- **ب)** Complex* xc;
- **ج)** static Complex xc;
- **د)** const Complex xc;

### السؤال 7
ما ناتج الكود التالي؟

```cpp
struct Point { double x; double y; };
struct Triangle {
    Point a;
    Point b;
    Point c;
};
int main() {
    Triangle t = {{0,0}, {1,0}, {0,1}};
    cout << t.b.x;
    return 0;
}
```

- **أ)** 0
- **ب)** 1
- **ج)** 2
- **د)** خطأ في الترجمة

---

## الجزء الثاني: المؤشرات على Structures (5 أسئلة)

### السؤال 8
ما العملية الصحيحة للوصول إلى حقل x في Structure عبر مؤشر ptr؟

```cpp
struct Complex { double x; double y; };
Complex c = {3, 4};
Complex *ptr = &c;
```

- **أ)** ptr.x
- **ب)** (*ptr).x أو ptr->x
- **ج)** *ptr.x
- **د)** ptr->(*x)

### السؤال 9
ما ناتج الكود التالي؟

```cpp
struct Complex { double x; double y; };
int main() {
    Complex c = {5, 10};
    Complex *p = &c;
    p->x = 20;
    cout << c.x;
    return 0;
}
```

- **أ)** 5
- **ب)** 10
- **ج)** 20
- **د)** خطأ في الترجمة

### السؤال 10
ما ناتج الكود التالي؟

```cpp
struct Complex { double x; double y; };
int main() {
    Complex *p = new Complex;
    p->x = 7;
    p->y = 8;
    cout << (*p).x + p->y;
    delete p;
    return 0;
}
```

- **أ)** 7
- **ب)** 8
- **ج)** 15
- **د)** 56

### السؤال 11
ما الفرق بين `.` و `->` عند التعامل مع Structures؟

- **أ)** `.` للمؤشرات و `->` للمتغيرات العادية
- **ب)** `.` للمتغيرات العادية و `->` للمؤشرات
- **ج)** لا يوجد فرق بينهما
- **د)** `->` يعمل فقط مع المصفوفات

### السؤال 12
ما ناتج الكود التالي؟

```cpp
struct Node {
    int data;
    Node *next;
};
int main() {
    Node n1 = {10, nullptr};
    Node n2 = {20, nullptr};
    n1.next = &n2;
    cout << n1.next->data;
    return 0;
}
```

- **أ)** 10
- **ب)** 20
- **ج)** 0
- **د)** خطأ في الترجمة

---

## الجزء الثالث: تمرير Structures للدوال (6 أسئلة)

### السؤال 13
ما العيب الرئيسي لتمرير Structure بالقيمة (Pass by Value)؟

```cpp
void print(Complex number) {
    cout << number.x << " " << number.y;
}
```

- **أ)** لا يمكن قراءة الحقول
- **ب)** يتم نسخ كامل الـ Structure مما يؤدي إلى بطء إذا كان كبيراً
- **ج)** يتسبب في Memory Leak
- **د)** لا يمكن تمريره للدالة

### السؤال 14
أي طريقة التمرير التالية تسمح بتعديل الـ Structure الأصلي داخل الدالة؟

- **أ)** void f(Complex c) — تمرير بالقيمة
- **ب)** void f(Complex &c) — تمرير بالمرجع
- **ج)** void f(const Complex &c) — تمرير بالمرجع الثابت
- **د)** ب و ج كلاهما

### السؤال 15
ما ناتج الكود التالي؟

```cpp
struct Point { int x; int y; };
void move(Point &p, int dx, int dy) {
    p.x += dx;
    p.y += dy;
}
int main() {
    Point pt = {1, 2};
    move(pt, 5, 3);
    cout << pt.x << " " << pt.y;
    return 0;
}
```

- **أ)** 1 2
- **ب)** 5 3
- **ج)** 6 5
- **د)** خطأ في الترجمة

### السؤال 16
ما ناتج الكود التالي؟

```cpp
struct Point { int x; int y; };
void reset(Point *p) {
    p->x = 0;
    p->y = 0;
}
int main() {
    Point pt = {10, 20};
    reset(&pt);
    cout << pt.x << " " << pt.y;
    return 0;
}
```

- **أ)** 10 20
- **ب)** 0 0
- **ج)** 10 0
- **د)** خطأ في الترجمة

### السؤال 17
ما أفضل طريقة لتمرير Structure كبير الحجم للقراءة فقط (Read-Only)؟

- **أ)** void f(Complex c)
- **ب)** void f(Complex &c)
- **ج)** void f(const Complex &c)
- **د)** void f(Complex *c)

### السؤال 18
ما ناتج الكود التالي؟

```cpp
struct Complex { double x; double y; };
Complex create() {
    Complex c = {3, 4};
    return c;
}
int main() {
    Complex n = create();
    cout << n.x;
    return 0;
}
```

- **أ)** 3
- **ب)** 4
- **ج)** 0
- **د)** خطأ في الترجمة (لا يمكن إرجاع Structure)

---

## الجزء الرابع: Operator Overloading (7 أسئلة)

### السؤال 19
ما الخطأ في الكود التالي؟

```cpp
struct Complex { double x; double y; };
int main() {
    Complex c1 = {1, 2};
    Complex c2 = {3, 4};
    cout << c1 + c2;
    return 0;
}
```

- **أ)** لا يوجد خطأ
- **ب)** لا يمكن جمع Structure باستخدام + إلا بعد تعريف Operator Overloading
- **ج)** يجب استخدام &c1 + &c2
- **د)** cout لا يطبع Structures

### السؤال 20
ما نوع المعاملات في تعريف operator+ كدالة خارجية؟

```cpp
Complex& operator+(Complex &n1, Complex n2) {
    n1.x += n2.x;
    n1.y += n2.y;
    return n1;
}
```

- **أ)** n1 تمرير بالقيمة و n2 تمرير بالمرجع
- **ب)** n1 تمرير بالمرجع (للتعديل) و n2 تمرير بالقيمة
- **ج)** كلاهما تمرير بالمرجع
- **د)** كلاهما تمرير بالقيمة

### السؤال 21
ما الكلمة المفتاحية التي تشير إلى الكائن الحالي داخل دالة عضو في Structure؟

```cpp
struct Complex {
    double x, y;
    Complex& operator+(Complex n2) {
        this->x += n2.x;
        this->y += n2.y;
        return *this;
    }
};
```

- **أ)** self
- **ب)** this
- **ج)** current
- **د)** me

### السؤال 22
ما ناتج الكود التالي بعد تعريف operator+ بشكل صحيح؟

```cpp
struct Complex {
    double x, y;
    Complex& operator+(Complex n2) {
        this->x += n2.x;
        this->y += n2.y;
        return *this;
    }
};
int main() {
    Complex a = {1, 2};
    Complex b = {3, 4};
    a + b;
    cout << a.x << " " << a.y;
    return 0;
}
```

- **أ)** 1 2
- **ب)** 3 4
- **ج)** 4 6
- **د)** 2 6

### السؤال 23
ما نوع الإرجاع المستحسن لـ operator<< عند طباعة Structure؟

```cpp
ostream& operator<<(ostream &cout, Complex &n) {
    cout << n.x << "+" << n.y << "i";
    return cout;
}
```

- **أ)** void
- **ب)** ostream& (للسماح بسلسلة الطباعة)
- **ج)** Complex&
- **د)** int

### السؤال 24
ما فائدة استخدام friend مع operator<< داخل Structure؟

- **أ)** تسرع البرنامج
- **ب)** تسمح لـ operator<< بالوصول إلى الحقول الخاصة (private) للـ Structure
- **ج)** تجعل operator<< دالة عضو
- **د)** لا فائدة منها

### السؤال 25
ما ناتج الكود التالي؟

```cpp
struct Complex {
    double x, y;
    Complex& operator+(Complex n2) {
        this->x += n2.x;
        this->y += n2.y;
        return *this;
    }
    friend ostream& operator<<(ostream &out, Complex &n) {
        out << n.x << ((n.y>=0)?"+":"") << n.y << "i";
        return out;
    }
};
int main() {
    Complex a = {2, 3};
    Complex b = {4, -5};
    a + b;
    cout << a;
    return 0;
}
```

- **أ)** 2+3i
- **ب)** 6-2i
- **ج)** 6+-2i
- **د)** 6+2i

---

## مفتاح الإجابات الصحيحة

| رقم السؤال | الإجابة | التبرير |
|:---:|:---:|:---|
| 1 | ب | `struct` هي الكلمة المفتاحية لتعريف Structure |
| 2 | أ | number.x = 3، number.y = 4 |
| 3 | ب | القيم غير المحددة تُهيأ بـ 0 في initializer list |
| 4 | أ | يجب وضع `;` بعد قوس إغلاق struct |
| 5 | ب** | لا يمكن أن يحتوي struct على متغير من نفس النوع (حجم غير محدد) |
| 6 | ب** | المؤشر Complex* يحل المشكلة لأن حجم المؤشر معروف |
| 7 | ب** | t.b.x = 1 (النقطة b إحداثي x = 1) |
| 8 | ب** | `.` للمتغير العادي، `->` للمؤشر |
| 9 | ج** | p->x = 20 يعدل c.x مباشرة |
| 10 | ج** | (*p).x = 7، p->y = 8 → 7 + 8 = 15 |
| 11 | ب** | `.` للمتغيرات العادية و `->` للمؤشرات |
| 12 | ب** | n1.next->data = n2.data = 20 |
| 13 | ب** | Pass by Value ينسخ كامل الـ Structure |
| 14 | ب** | Pass by Reference يسمح بتعديل الأصل |
| 15 | ج** | pt.x = 1+5 = 6، pt.y = 2+3 = 5 |
| 16 | ب** | reset(&pt) تعدل pt مباشرة عبر المؤشر |
| 17 | ج** | const Complex& يمنع النسخ ويمنع التعديل |
| 18 | أ** | يمكن إرجاع Structure بالقيمة |
| 19 | ب** | + غير معرف للـ Structure إلا بـ Operator Overloading |
| 20 | ب** | n1 بالمرجع للتعديل، n2 بالقيمة |
| 21 | ب** | `this` يشير إلى الكائن الحالي في C++ |
| 22 | ج** | a.x = 1+3 = 4، a.y = 2+4 = 6 |
| 23 | ب** | ostream& يسمح بسلسلة الطباعة cout << a << b; |
| 24 | ب** | friend تمنح الوصول للأعضاء private/protected |
| 25 | ب** | a.x = 2+4 = 6، a.y = 3+(-5) = -2 → "6-2i" |

---

**بالتوفيق للجميع! 🎓**  
*كلية الهندسة المعلوماتية — جامعة حمص — سوريا — 2025-2026*

## نمط Original Question Bank

**المصدر:** [نمط Original Question Bank]
### السؤال 1–5 (مجموعة أسئلة على كود مشترك)

```python
x = [2,1,3,0,2]
Y = [3,2,3,1,2,3]
x = x + [-1]
```

**السؤال 1:** `print (len(x))`
أ) 5
ب) 6
ج) -1
د) 7
هـ) 3
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 2:** `x.extend([-1,-2])` ثم `print (x[-2])`
أ) 5
ب) 6
ج) -1
د) 7
هـ) 3
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 3:** `x.remove(-1)` ثم `print (x[:3])`
أ) [1,3,0]
ب) [3,0,2]
ج) [2,1,3]
د) [3,4,1]
هـ) [0,3,1]
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 4:** `x.append(4)` ثم `print (x[-3:])`
أ) [2,0,-2]
ب) [-1,-2,4]
ج) [0,2,-1]
د) [3,0,2]
هـ) [1,3,0]
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 5:** `z = x.pop(2)` ثم `print (z)`
أ) 2
ب) 1
ج) 3
د) 0
هـ) -1
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 6 (متوسط)
`y = list("12345")`
`y.insert(2,"0")`
`print (y)`
أ) ['1', '2', '0', '3', '4', '5']
ب) ['1', '0', '2', '3', '4', '5']
ج) [1, 2, 0, 3, 4, 5]
د) ['1', '2', '3', '0', '4', '5']
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 7 (متوسط)
`w = [i for i in range(5) if i%2==0]`
`print (w)`
أ) [0, 1, 2, 3, 4]
ب) [0, 2, 4]
ج) [1, 3]
د) [2, 4]
هـ) [0, 2]
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 8 (متوسط)
`print (list(range(5,1,-1)))`
أ) [5, 4, 3, 2, 1]
ب) [5, 4, 3, 2]
ج) [4, 3, 2, 1]
د) [5, 4, 3]
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 9 (متوسط)
`a = (1, 2, 3)`
`a[0] = 5`
`print(a)`
أ) (5, 2, 3)
ب) [5, 2, 3]
ج) TypeError
د) AttributeError
هـ) (1, 2, 3)
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 10 (متوسط)
`d = {'a': 1, 'b': 2}`
`print(d.get('c', 3))`
أ) None
ب) Key Error
ج) 3
د) 'c'
هـ) 0
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 11 (سهل)
`s = {1, 2, 3, 3, 2}`
`print(len(s))`
أ) 5
ب) 3
ج) 2
د) 4
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 12 (متوسط)
`s1 = {1, 2, 3}`
`s2 = {3, 4, 5}`
`print(s1 & s2)`
أ) {1, 2, 3, 4, 5}
ب) {3}
ج) {1, 2, 4, 5}
د) Set()
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 13 (صعب)
`def func(a, b=[]):`
`    b.append(a)`
`    return b`
`print(func(1))`
`print(func(2))`
أ) [1] then [2]
ب) [1] then [1, 2]
ج) [1, 2] then [1, 2]
د) Error
هـ) [2] then [1]
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 14 (متوسط)
`x = 10`
`def change():`
`    global x`
`    x = 20`
`change()`
`print(x)`
أ) 10
ب) 20
ج) UnboundLocalError
د) None
هـ) NameError
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 15 (صعب)
`funcs = [lambda x: x+i for i in range(3)]`
`print([f(1) for f in funcs])`
أ) [1, 2, 3]
ب) [2, 3, 4]
ج) [3, 3, 3]
د) [0, 1, 2]
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 16 (سهل)
What is the correct syntax to inherit class `A` into class `B`?
أ) `class B(A):`
ب) `class B extends A:`
ج) `class B implements A:`
د) `class B inherits A:`
هـ) `class A(B):`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 17 (متوسط)
`class Test:`
`    def __init__(self, val):`
`        self.__val = val`
`t = Test(5)`
`print(t.__val)`
أ) 5
ب) None
ج) AttributeError
د) NameError
هـ) 0
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 18 (متوسط)
How can you access private attribute `__val` in object `t` of class `Test` outside the class?
أ) `t.__val`
ب) `t._Test__val`
ج) `t.val`
د) `Test.__val`
هـ) Impossible
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 19 (متوسط)
`try:`
`    x = 1 / 0`
`except ZeroDivisionError:`
`    print("Zero")`
`finally:`
`    print("Done")`
أ) Zero
ب) Done
ج) Zero then Done
د) ZeroDivisionError
هـ) Nothing
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 20 (سهل)
Which keyword is used to manually raise an exception in Python?
أ) `throw`
ب) `raise`
ج) `catch`
د) `except`
هـ) `error`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 21 (سهل)
Which command creates a new Django project named `myproject`?
أ) `django-admin startproject myproject`
ب) `python manage.py startapp myproject`
ج) `django-admin createproject myproject`
د) `python django start myproject`
هـ) `django start myproject`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 22 (سهل)
Which file in a Django app contains database schema definitions?
أ) `views.py`
ب) `urls.py`
ج) `models.py`
د) `admin.py`
هـ) `apps.py`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 23 (سهل)
Which command creates new database migrations based on changes in `models.py`?
أ) `python manage.py migrate`
ب) `python manage.py makemigrations`
ج) `python manage.py runserver`
د) `python manage.py sqlmigrate`
هـ) `django-admin migrate`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 24 (سهل)
Which command applies migrations to the database?
أ) `python manage.py makemigrations`
ب) `python manage.py migrate`
ج) `python manage.py dbupdate`
د) `python manage.py sync`
هـ) `python manage.py compile`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 25 (سهل)
In Django templates, what syntax is used to print variables?
أ) `{% variable %}`
ب) `{{ variable }}`
ج) `<%= variable %>`
د) `${variable}`
هـ) `[[ variable ]]`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 26 (سهل)
In Django templates, what syntax is used for logic tags (e.g., `if`, `for`)?
أ) `{{ if ... }}`
ب) `{% if ... %}`
ج) `<% if ... %>`
د) `{# if ... #}`
هـ) `$(if ...)`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 27 (سهل)
Which HTTP method is used by default to render Django HTML forms for viewing?
أ) `POST`
ب) `GET`
ج) `PUT`
د) `DELETE`
هـ) `PATCH`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 28 (سهل)
What tag must be included inside standard Django HTML `<form>` elements sending `POST` requests for security?
أ) `{% csrf_token %}`
ب) `{% security_token %}`
ج) `{% secret_key %}`
د) `{{ csrf }}`
هـ) `{% post_token %}`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 29 (متوسط)
Which method fetches a single object from a model in Django ORM matching a lookup parameter?
أ) `Model.objects.all()`
ب) `Model.objects.filter()`
ج) `Model.objects.get()`
د) `Model.objects.fetch()`
هـ) `Model.objects.find()`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 30 (متوسط)
Which method returns a queryset containing objects matching given query parameters?
أ) `Model.objects.get()`
ب) `Model.objects.filter()`
ج) `Model.objects.search()`
د) `Model.objects.where()`
هـ) `Model.objects.select()`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 31 (متوسط)
`a = [1, 2, 3]`
`b = a`
`c = a[:]`
`b[0] = 99`
`print(c[0])`
أ) 99
ب) 1
ج) 2
د) Error
هـ) None
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 32 (متوسط)
`from collections import Counter`
`c = Counter('abracadabra')`
`print(c['a'])`
أ) 3
ب) 4
ج) 5
د) 2
هـ) 1
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 33 (صعب)
`x = True + True * False`
`print(x)`
أ) True
ب) False
ج) 1
د) 2
هـ) 0
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 34 (صعب)
`def foo(x=[]):`
`    x.append(1)`
`    return x`
`foo()`
`print(foo())`
أ) [1]
ب) [1, 1]
ج) [1, 1, 1]
د) Error
هـ) []
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 35 (سهل)
`print("python"[::-1])`
أ) python
ب) nohtyp
ج) p
د) n
هـ) Index Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 36 (متوسط)
`keys = ['a', 'b', 'c']`
`values = [1, 2, 3]`
`d = {k: v for k, v in zip(keys, values)}`
`print(d['b'])`
أ) 1
ب) 2
ج) 3
د) 'b'
هـ) Key Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 37 (متوسط)
`matrix = [[1, 2], [3, 4]]`
`flattened = [num for row in matrix for num in row]`
`print(flattened)`
أ) [[1, 2], [3, 4]]
ب) [1, 2, 3, 4]
ج) [1, 3, 2, 4]
د) [4, 3, 2, 1]
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 38 (متوسط)
`a = {1, 2, 3}`
`b = {3, 4, 5}`
`print(a.symmetric_difference(b))`
أ) {3}
ب) {1, 2, 4, 5}
ج) {1, 2, 3, 4, 5}
د) set()
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 39 (متوسط)
`x = (1,)`
`print(type(x))`
أ) `<class 'int'>`
ب) `<class 'tuple'>`
ج) `<class 'list'>`
د) `<class 'set'>`
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 40 (متوسط)
`x = (1)`
`print(type(x))`
أ) `<class 'tuple'>`
ب) `<class 'int'>`
ج) `<class 'str'>`
د) `<class 'list'>`
هـ) Error
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 41 (سهل)
In Django, which function is used to combine a template with a context dictionary and return an `HttpResponse`?
أ) `render()`
ب) `redirect()`
ج) `get_object_or_404()`
د) `include()`
هـ) `path()`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 42 (سهل)
Which function in Django `urls.py` is used to include URL patterns from another application?
أ) `path()`
ب) `re_path()`
ج) `include()`
د) `url()`
هـ) `import_urls()`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 43 (سهل)
Which file in a Django project stores project settings like `INSTALLED_APPS` and `DATABASES`?
أ) `models.py`
ب) `settings.py`
ج) `wsgi.py`
د) `asgi.py`
هـ) `urls.py`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 44 (متوسط)
What decorator is used in Django views to restrict access to authenticated users only?
أ) `@login_required`
ب) `@auth_required`
ج) `@user_passes_test`
د) `@permission_required`
هـ) `@authenticated`
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط Original Question Bank]
### السؤال 45 (سهل)
Which Django ORM method returns all objects in a table?
أ) `Model.objects.all()`
ب) `Model.objects.get()`
ج) `Model.objects.filter()`
د) `Model.objects.select_all()`
هـ) `Model.objects.fetch_all()`
**الإجابة الصحيحة:** 
**التعليل:** 

---

## نمط 2023-2024 — الفصل الأول

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 1–6 (مجموعة أسئلة على كود مشترك)

```python
x = [2,1,3,0,2]
y = [3,2,3,1,2,3]
x = x + [-1]
```

**السؤال 1:** `print (len(x))`
أ) 5
ب) 6
ج) -1
د) 7
هـ) 3
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 2:** `x.extend([-1,-2])` ثم `print (x[-2])`
أ) 5
ب) 6
ج) -1
د) 7
هـ) 3
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 3:** `x.remove(-1)` ثم `print (x[:3])`
أ) [1,3,0]
ب) [3,0,2]
ج) [2,1,3]
د) [3,4,1]
هـ) [0,3,1]
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 4:** `x.append(4)` ثم `print (x[-3:])`
أ) [2,0,-2]
ب) [1,-2,4]
ج) [-1,-2,4]
د) [-1,0,2]
هـ) [-2,0,2]
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 5:** `print (x[::3])`
أ) [4,2,4]
ب) [4,0,2]
ج) [2,0,-2]
د) [4,3,0]
هـ) [1,2,4]
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 6:** `print (x[5:2:-1])`
أ) [-1,0,2]
ب) [-2,-1,0]
ج) [-1,2,0]
د) [4,-2,-1]
هـ) [0,3,1]
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 7 (متوسط)
`y.pop()`
`s = set(y)`
`print (len(s))`
أ) 5
ب) 6
ج) -1
د) 7
هـ) 3
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 8 (سهل)
`print ([x for x in range(5) if x % 2 == 0])`
أ) [2,4,0]
ب) [1,2]
ج) [4,0,2]
د) [0,2,4]
هـ) [5]
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 9 (صعب)
`print (x * x for x in [1, -1])`
أ) 1
ب) {1}
ج) [1]
د) (1)
هـ) 11
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 10 (سهل)
`print ((lambda x: x + 3)(3))`
أ) 5
ب) 6
ج) -1
د) 4
هـ) 3
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 11 (متوسط)
`for I in range (0,3):`
`    if (i*i) == 4 :  print (i)`
أ) 2
ب) 3
ج) 0,1,2
د) 2,3
هـ) 0,1,2,3
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 12 (متوسط)
`for I in range (9,1,-3):`
`    if (i%2==0):  print(i)`
أ) 8
ب) 4
ج) 6
د) 2
هـ) 5
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 13 (سهل)
`def sm(xs): return sum(xs)`
`print(sm([1,2,5,4]))`
أ) 10
ب) 11
ج) 12
د) 13
هـ) 14
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 14 (سهل)
`def mn(xs): return min(xs)`
`print(mn([1,0,-1,2]))`
أ) 1
ب) 0
ج) -1
د) 2
هـ) 3
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 15–24 (مجموعة أسئلة على جدول Titanic — True/False)

*Based on a provided pivot table output for the Titanic dataset.*

**السؤال 15:** The average age of survivors is 30, so young people tend to survive more.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 16:** People from S were more likely to survive, more than others.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 17:** The people traveling in first-class tend to survive more.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 18:** If people have more siblings, so had chance of surviving.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 19:** If a child without siblings, had lower of a chance of surviving.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 20:** The majority of the people traveling, had tickets of the 3d class.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 21:** Most of the passengers boarded the ship from Q port.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 22:** More people survived from the First class than the Third or the second class.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 23:** Most of the male survived, and the majority of the female in the shipwreck.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 24:** If someone was from S had a lower chance of surviving.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 25 (متوسط)
What is the purpose of Django's Form class?
أ) To define the structure and behavior of database tables
ب) To handle user input and perform validation
ج) To generate HTML templates for web pages
د) To manage URL routing and request handling
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 26 (متوسط)
Which method of the Django ORM is used to perform complex database queries involving multiple models?
أ) filter()
ب) get()
ج) annotate()
د) select_related()
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 27 (متوسط)
What is the purpose of Django's middleware?
أ) To handle user authentication and authorization
ب) To process HTTP requests and response
ج) To store sessions data for users
د) To manage database connections
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 28 (متوسط)
How can you handle file uploads is Django?
أ) By using the FileField or ImageField in a model
ب) By writing custom file upload handling code
ج) By using third-party libraries like Django File Uploader
د) Django does not support file uploads
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 29 (متوسط)
What is the purpose of Django's context processors?
أ) To process HTTP requests and response
ب) To add data to the context of every template rendering
ج) To manage database connections
د) To handle URL routing
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 30 (سهل)
Which command is used to create a superuser in Django?
أ) Python manage.py createsuperuser
ب) Python manage.py makeuser –super
ج) Python manage.py addsuperuser
د) Python manage.py superuseradd
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 31 (متوسط)
How do you handle sessions in Django?
أ) By storing sessions data in cookies
ب) By using the sessions framework provided by Django
ج) By storing sessions data in the database
د) Django does not support sessions management
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 32 (متوسط)
What is the purpose of Django's migration files?
أ) To store database schema definitions
ب) To track changes in the database schema over time
ج) To generate HTML templates for web pages
د) To manage URL routing and request handling
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 33 (متوسط)
Which method of the Django ORM is used to perform database transactions?
أ) commit()
ب) rollback()
ج) save()
د) transaction()
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 34 (متوسط)
How can you handle asynchronous tasks in Django?
أ) By using third-party libraries like Celery
ب) By writing custom asynchronous code using Python's asyncio library
ج) By using Django's built-in support for asynchronous tasks
د) Django does not support asynchronous tasks
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 35 (متوسط)
What is the purpose of Django's caching framework?
أ) To improve database performance by caching query results
ب) To store user sessions data
ج) To handle URL routing and request handling
د) To manage database connections
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 36 (متوسط)
What is the purpose of Django's signals?
أ) To handle user authentication and authorization
ب) To perform background tasks asynchronously
ج) To provide a way for different parts of the application to communicate with each other
د) To generate HTML templates for web pages
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 37 (متوسط)
How can you handle internationalization and localization in Django?
أ) By manually translating all the text in the code
ب) In Django built-in internationalization and localization framework
ج) By using third-party libraries like gettext
د) Django does not support internationalization and localization
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 38 (سهل)
What is the purpose of Django's template tags?
أ) To process HTTP requests and response
ب) To add custom functionality to templates
ج) To manage database connections
د) To handle URL routing and request handling
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 39 (متوسط)
How can you handle form validation in Django?
أ) By writing custom validation code in the views
ب) By using Django's built-in dorm validation mechanisms
ج) By using third-party libraries like WTForms
د) Django does not support form validation
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 40 (متوسط)
How can you handle authentication and authorization in Django REST Framework?
أ) By using Django's built-in authentication and authorization mechanisms
ب) By implementing custom authentication and authorization logic
ج) By using third-party libraries like OAuth or JWT
د) Django REST Framework does not support authentication and authorization
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 41 (متوسط)
What is the purpose of Django's middleware classes?
أ) To handle user authentication and authorization
ب) To process HTTP requests and responses
ج) To store sessions data for users
د) To manage database connections
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 42 (متوسط)
How can you handle pagination in Django REST Framework?
أ) By manually implementing pagination logic in views
ب) By using Django's built-in pagination classes
ج) By using third-party libraries like Django=rest=framework=pagination
د) Django REST Framework does not support pagination
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 43 (سهل)
What is the purpose of Django's template filters?
أ) To process HTTP requests and response
ب) To add custom functionality to templates
ج) To manage database connections
د) To handle URL routing and request handling
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 44 (متوسط)
How can you handle file uploads in Django REST Framework?
أ) By using FileField or ImageField in a serializer
ب) By writing custom file upload handling code
ج) By using third-party libraries like Django REST Framework File Upload
د) Django REST Framework does not support file uploads
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 45 (متوسط)
What is the purpose of Django's class-based views?
أ) To handle user authentication and authorization
ب) To process HTTP requests and response
ج) To generate HTML templates for web pages
د) To manage URL routing and request handling
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 46 (متوسط)
How can you handle versioning in Django REST Framework?
أ) By manually adding versioning information to the URL patterns
ب) By using Django's built-in support for versioning
ج) By using third-party libraries like Django-rest-framework-versioning
د) Django REST Framework does not support versioning
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 47 (متوسط)
What is the purpose of Django's transaction.atomic() decorator?
أ) To handle user authentication and authorization
ب) To perform database operations within a transaction
ج) To manage database connections
د) To generate HTML templates for web pages
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 48 (متوسط)
How can you handle rate limiting in Django REST Framework?
أ) By manually implementing rate limiting logic in views
ب) By using Django's built-in rate limiting classes
ج) By using third-party libraries like Django-rest-framework-throttle
د) Django REST Framework does not support rate limiting
**الإجابة الصحيحة:** 
**التعليل:** 

---

## نمط 2022-2023 — الفصل الثاني

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 1 (سهل)
Reading the data file with pandas we use:
أ) EG=pd.read _csv('d:\Gov_1.csv')
ب) EG=pd.read  csv('d:\Gov_1.csv')
ج) EG=read csv('d:\Gov_1.csv')
د) EG=read 1_csv('d:\Gov_1.csv')
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 2 (سهل)
(head) method used for:
أ) List first five rows from EG
ب) List last five rows from data set file
ج) List first rows from data set file
د) List all rows from data frame
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 3 (متوسط)
we use (na_values) when reading file for:
أ) define empty values
ب) define non available data
ج) define incorrect data
د) replace nan for non a available data
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 4 (متوسط)
we use (usecols) when reading file for :(more suitable)
أ) select columns will be delete
ب) select columns will be used
ج) select columns will be print
د) select rows will be extract
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 5 (متوسط)
We can use the function (describe()) to:
أ) Show 75% from any column
ب) Show 30% from any column
ج) Show 60% from any row
د) Show 70% from any table
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 6 (متوسط)
(loc) method used for :(more suitable)
أ) select a subset of rows from table
ب) select a subset of rows from file
ج) select a subset of column from EG
د) select a subset of rows and columns from EG
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 7 (متوسط)
`EG['VN'] = EG['Value']/EG['Value'].max()` what doing ?
أ) Ad new column in data set file
ب) Ad new column in data DataFrame
ج) Ad new column with new values in DataFrame
د) Ad new values is data set file
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 8 (متوسط)
`EG['VN'] = max(EG['Value']/EG['Value'])` what doing ?
أ) Ad new column in data set file
ب) Ad new column in data DataFrame
ج) Ad new column with NAN values
د) Ad new values is data set file
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 9 (متوسط)
`S = EG("Value").apply(np.sqrt)` is :
أ) New DataFrame
ب) Ad new values is data set file
ج) Ad new values in DataFrame (EG)
د) Apply New values in EG
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 10 (سهل)
Reading the data file we get DataFrame (EG) that is:
أ) excel file
ب) table
ج) data structure
د) text file
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 11–20 (مجموعة أسئلة على جدول Titanic — True/False)

*Based on a provided pivot table output for the Titanic dataset.*

**السؤال 11:** The people traveling in first-class tend to survive more.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 12:** In the prach column , if people have parents , so had a higher chance of surviving.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 13:** the majority of the people traveling , had tickets to the 3rd class.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 14:** most of the passengers boarded the ship from S port.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 15:** most of the women survived and the majority of the male died in the shipwreck.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 16:** The average age of survived is 30 , so young people tend to survive more.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 17:** People who paid lower fare rates were more likely to survive more than others.
أ) True
ب) False
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 18:** If a child have siblings , had higher of a chance of surviving.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 19:** more people survived from the Third class than the Second or the First class.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

**السؤال 20:** if someone was from Q had a higher chance of surviving.
أ) true
ب) false
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 21 (متوسط)
what is the purpose of Django's Meta class in a model definition ?
أ) to specify the fields and relationship for the model
ب) to specify options for the model, such as the ordering of query results or the database table name
ج) to define methods and properties for the models
د) to define custom form fields for the model
هـ) all of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 22 (متوسط)
what is the Django FromWizard and what is its primary use case ?
أ) it is a tool for generation complex URL routing
ب) it is a tool for generation complex forms with multiple steps
ج) it is a tool for generation dynamic HTML templates
د) it is a tool for generation complex database queries
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 23 (متوسط)
what is the purpose of Django's built-in MiddlewareMixin class ?
أ) to provide a base class for creating custom template tags
ب) to provide a base class for creating custom middleware
ج) to provide a base class for creating custom from fields
د) to provide a base class for creating custom Django models
هـ) none of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 24 (صعب)
what is the purpose of Django's QuerySet values() method ?
أ) to retrieve a QuerySet of dictionaries, each representation a single object and containing only the specified fields
ب) to retrieve a QuerySet of objects, each containing the specified fields and related objects
ج) to retrieve a QuerySet of objects, each containing all fields and their related objects
د) the retrieve a QuerySet of dictionaries, each representation a single object and containing all fields and their related objects
هـ) none of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 25 (صعب)
what is the purpose of Django's transaction.atomic() decorator?
أ) To provide a way to specify custom database indexes for models
ب) To provide a way to specify custom database management commands
ج) To provide a way to optimize custom queries for performance
د) To ensure that a block of code is executed as a single transaction, either committing all changes or rolling them back if an error occurs
هـ) All of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 26 (متوسط)
what is the purpose of Django's built-in class – based views ?
أ) to provide a way to define models using Python classes instead of SQL
ب) to provide a way to handle HTTP requests and responses
ج) to provide a way to define views using python classes instead of function
د) to provide a way to generate HTML templates
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 27 (صعب)
what is the purpose of Django's database routers ?
أ) to specify the order in which multiple databases should be queried
ب) to define custom database indexes for models
ج) to define custom database management commands
د) to specify which database should be used for each model or query
هـ) b and c
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 28 (متوسط)
what is the purpose of Django's ModelAdmin class ?
أ) to define custom from fields for a model
ب) to specify the fields and relationships for a model
ج) to define custom validation logic for a model
د) to provide a way to customize the admin interface for a model
هـ) a & b
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 29 (صعب)
what is the purpose of Django's QuerySet annotate() method ?
أ) to filter the QuerySet based on related objects
ب) to add aggregate values to each object in the QuerySet , such as the sum or average of a related field
ج) to sort the QuerySet based on related objects
د) to reduce the number of database queries needed to retrieve related objects
هـ) none of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 30 (متوسط)
what is the purpose of Django's built-in template context processors ?
أ) to provide additional context variables to templates
ب) to handle HTTP requests and responses
ج) to manage database connection
د) to generate HTML templates
هـ) both b & d
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 31 (متوسط)
what is the purpose of Django's built-in logging framework ?
أ) to provide a way to log application events and errors
ب) to provide a way to manage database connections
ج) to provide a way to handle HTTP requests and responses
د) to provide a way to generate HTML templates
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 32 (متوسط)
what is the purpose of Django's  ModelFrom.Meta class ?
أ) to specify options for the form, such as the fields to include or exclude
ب) to define custom from fields for the form
ج) to specify the fields and relationships to use for the form
د) to define custom validation logic for the form
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 33 (صعب)
what is the purpose of Django's ContentType framework ?
أ) to provide a way to store extra data for models without modifying their schema
ب) to allow multiple inheritance between models
ج) to allow generic foreign key relationships between models
د) to provide a way to define custom database indexes for models
هـ) a & c
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 34 (صعب)
what is the purpose of Django's QuerySet prefetch_related() method ?
أ) to annotate each object in the QuerySet with additional information
ب) to reduce the number of database queries needed to retrieve related objects
ج) to filter the QuerySet based on related objects
د) to sort the QuerySet based on related objects
هـ) none of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 35 (متوسط)
what is the relationship between a Django model and a database table ?
أ) a Django model maps to a database table with the same name
ب) a Django model maps to a database table with a name derived from the model name
ج) a Django model can map to multiple database tables
د) a Django model has no direct relationship with a database table
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 36 (متوسط)
what is the purpose of Django's built-in QuerySet API ?
أ) to provide a way to query the database using python code
ب) to provide a way to define database schema and relationships
ج) to provide a way to handle HTTP requests and responses
د) to provide a way to generate HTML templates
هـ) all of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 37 (متوسط)
what is the purpose of Django's built-in ModelForm class ?
أ) to provide a way to generate database schema based on HTML forms
ب) to provide a way to generate HTML forms based on Django models
ج) to provide a way to handle HTTP requests and responses
د) to provide a way to generate HTML templates
هـ) none of the above
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 38 (متوسط)
what is the purpose of Django's built-in Middleware classes ?
أ) to provide a way to handle HTTP requests and responses
ب) to provide a way to manage database connection
ج) to provide a way to modify the behavior of the request / response processing pipeline
د) to provide a way to generate HTML templates
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 39 (متوسط)
what is the purpose of Django's built-in password validation framework ?
أ) to ensure that user password are not easily guessable or brute – forced
ب) to ensure that user password are strong and secure
ج) to ensure that user password are stored securely in the database
د) to ensure that user password are transmitted securely over the network
**الإجابة الصحيحة:** 
**التعليل:** 

---

**المصدر:** [نمط 2022-2023 — الفصل الثاني]
### السؤال 40 (متوسط)
what is the purpose of Django's built-in model managers ?
أ) to provide a way to query the database using python code
ب) to provide a way to define database schema and relationships
ج) to provide a way to handle HTTP requests and responses
د) to provide a way to generate HTML templates
**الإجابة الصحيحة:** 
**التعليل:** 

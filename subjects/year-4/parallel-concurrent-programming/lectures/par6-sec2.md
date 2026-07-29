# المحاضرة 6 — Unstructured Locks & Concurrent Objects (الأقفال غير المهيكلة والكائنات المتزامنة)
> **المادة:** البرمجة المتوازية والمتزامنة (نظري) | **الموضوع:** Condition Objects، List-Based Sets، تقنيات الأقفال (Coarse/Fine-Grained، Read/Write، Hand-over-Hand)، Safety vs Liveness

> هذه المحاضرة بتاخدك خطوة أبعد من الأقفال البسيطة (`synchronized`) لعالم الأقفال غير المهيكلة (`Unstructured Locks`) اللي بتعطيك تحكّم أدق بالتزامن — وبتعرّفك كيف تبني كائن مشترك (زي List) يتحمل أكتر من خيط بنفس الوقت بأداء أحسن، وشو معنى إنو البرنامج "سليم وحيّ" أصلاً.

---

# الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

## 1. نظرة عامة على المحاضرة (Lecture Overview)
هاي المحاضرة بتشرح إزاي نوسّع فكرة الأقفال (`Locks`) من الشكل البسيط المهيكل (`structured locking` زي `synchronized`) إلى شكل غير مهيكل (`Unstructured Locking`) باستخدام `Condition` objects، يلي بيعطونا القدرة نعمل أكتر من "قائمة انتظار" (`waiting-set`) على نفس القفل. بعدين بتاخدنا لمثال عملي كامل — `List-Based Set` — لنشوف عملياً أربع استراتيجيات مختلفة لجعل الكائن متزامن وآمن: `Coarse-Grained`, `Read/Write`, `Fine-Grained`, و`Hand-over-Hand Locking`. بالنهاية بتحدد المحاضرة معايير نحكم فيها هل البرنامج المتزامن "صحيح" أصلاً، عن طريق مفهومي `Safety` و`Liveness`.

## 2. أهداف التعلّم (Learning Objectives)
بعد هاي المحاضرة رح تقدر:
- تشرح ليش الأقفال المهيكلة (`synchronized`) مش كافية لما بدك أكتر من `waiting-set`، وتستخدم `Condition` objects كبديل.
- تكتب `Bounded Buffer` كامل باستخدام `ReentrantLock` و`Condition` (`put`/`take`).
- تحلل خوارزمية `List-Based Set` التسلسلية (`add`, `remove`, `contains`) وتحدد وين بتنكسر لو شغّلناها بأكتر من خيط بدون حماية.
- تقارن بين أربع استراتيجيات لتزامن الكائنات: `Coarse-Grained Mutual Exclusion`, `Read/Write Locking`, `Fine-Grained Locking`, `Hand-over-Hand Locking` — وتعرف امتى تستخدم كل وحدة.
- تفرّق بشكل قاطع بين `Safety` و`Liveness`، وتعرّف `Deadlock-Freedom`, `Livelock-Freedom`, `Starvation-Freedom`, و`Bounded Wait`.

## 3. المتطلبات السابقة (Prerequisites)
- أساسيات `Thread` و`Runnable` بجافا.
- مفهوم `synchronized` كقفل مهيكل (block-structured locking) — لازم تعرف `wait()`/`notify()`/`notifyAll()` كمقدمة لفهم `Condition.await()`/`signal()`/`signalAll()`.
- أساسيات `Linked List` كبنية بيانات (pointer-based data structure).
- مفهوم `Race Condition` من محاضرة سابقة عن التزامن.

## 4. أهم المفاهيم (Main Concepts)
| المفهوم | بسطرين |
| --- | --- |
| `Condition Object` | كائن مرتبط بـ `Lock` بيسمح نعمل أكتر من `waiting-set` واحد على نفس القفل، بدل الـ `waiting-set` الوحيد اللي بيعطيه `synchronized`. |
| `List-Based Set` | بنية بيانات (Linked List مرتبة) بتمثل مجموعة أعداد بدون تكرار، مستخدمة كمثال قياسي لتوضيح تقنيات تزامن الكائنات. |
| `Coarse-Grained Mutual Exclusion` | قفل واحد كبير يغطي الكائن بالكامل — بسيط لكن بيمنع أي تزامن حقيقي. |
| `Read/Write Locking` | نوعين من القفل: للقراءة (يسمح بأكتر من قارئ بنفس الوقت) وللكتابة (حصري) — مفيد لما القراءة أكتر من الكتابة. |
| `Fine-Grained Locking` | قفل منفصل لكل جزء صغير من البيانات (كل عقدة Node مثلاً) بدل قفل واحد على الكل. |
| `Hand-over-Hand Locking` | تقنية Fine-Grained خاصة: تمسك قفل العقدة الجاية قبل ما تفلت قفل العقدة الحالية — زي إنك ماسك درابزين وانت طالع درج. |
| `Safety vs Liveness` | `Safety` = الكود ما بينتج نتيجة غلط أبداً. `Liveness` = الكود بيضمن يوصل لنتيجة بوقت معقول (ما بيعلق للأبد). |
| `Deadlock / Livelock / Starvation / Bounded Wait` | أربع مستويات متدرجة من ضمانات الـ `Liveness`، من الأضعف (تجنب التوقف الكامل) للأقوى (كل واحد بيوصل دوره بعدد محدد من "القفزات"). |

## 5. الربط مع المحاضرات المجاورة (Connections)
هاي المحاضرة بتبني مباشرة على محاضرة سابقة عرّفتنا فيها على الأقفال المهيكلة (`synchronized`) ومشكلة الـ `Race Condition`. من غير فهم `synchronized` و`wait/notify` صعب تستوعب ليش احتجنا `Condition` objects أصلاً. المحاضرة الجاية غالباً رح تبني على `List-Based Set` وتاخدنا لتقنيات أذكى زي `Optimistic Locking` و`Lazy Synchronization` و`Lock-Free` structures — يعني هاي المحاضرة هي "الأساس اليدوي" قبل ما نشوف حلول أفضل بأداء أعلى.

## 6. أشهر الأخطاء الشائعة (Common Mistakes)
- الاعتقاد إنو `Fine-Grained Locking` دايماً أسرع من `Coarse-Grained` — بالحقيقة لو التزاحم (`contention`) قليل، القفل الواحد البسيط ممكن يكون أفضل (كما تقول الشريحة: "Don't underrate simplicity").
- نسيان إنو `Hand-over-Hand Locking` مش `Two-Phase Locking` (يعني مش "خذ كل الأقفال أول، بعدين فك كلها آخر") — هون بتمسك قفلين بحد أقصى وبتفلت القديم أول ما تاخد الجديد.
- الخلط بين `Deadlock` و`Livelock`: كلاهما "البرنامج ما بيتقدم"، لكن بـ `Deadlock` الخيوط متجمدة تماماً، وبـ `Livelock` الخيوط شغالة وبتكرر نفس الحركة بدون ما توصل لنتيجة.
- الاعتقاد إنو `contains()` لازم ياخد `write lock` متل `add`/`remove` — بالحقيقة لو بس بتقرأ (بدون تعديل)، ياخد `read lock` بس، وهاي بالضبط فكرة `Read/Write Locking`.
- استخدام `lock()` العادي بمكان `tryLock()` بدون التفكير بإمكانية الـ `Deadlock` — `tryLock()` بيعطيك مخرج (escape) لو ما قدرت تاخد القفل.

---

# الجزء الثاني: الشرح التفصيلي

## 1. من الأقفال المهيكلة إلى غير المهيكلة (From Structured to Unstructured Locks)

### 1.1. `Condition` Objects
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "lecture_5_synchronized_wait_notify", group: "1.1"} -->

#### 📍 أين نحن الآن؟
هاي أول فقرة بالمحاضرة، وبتفتح موضوع جديد كامل: الانتقال من `synchronized` (اللي بيعطيك `waiting-set` واحد بس لكل قفل) إلى أدوات أقفال غير مهيكلة (`Unstructured Locks`) بتعطيك مرونة أكتر.

#### ⬅️ الربط مع السابق
بمحاضرة سابقة تعلّمنا إنو `synchronized` block بيدير قفل واحد، وبيقدر يوقف الخيط (`wait()`) ويصحّيه (`notify()`/`notifyAll()`) — بس المشكلة إنو كل الخيوط المستنية عالقفل نفسه بتروح لنفس "غرفة الانتظار" الوحيدة. هالفقرة رح تحل هاي المشكلة بالضبط.

#### 💡 الفكرة الأساسية
**`Condition` Object هو "غرفة انتظار" منفصلة مرتبطة بقفل واحد، وبيسمحلك تعمل أكتر من غرفة انتظار على نفس القفل بدل غرفة وحدة.**

#### 💻 الكود
```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;

Lock lock = new ReentrantLock();
Condition full  = lock.newCondition();  // waiting-set خاص بحالة "الممتلئ"
Condition empty = lock.newCondition();  // waiting-set خاص بحالة "الفاضي"
```

#### شرح الكود سطراً بسطر
1. السطر 1: بنستورد `Lock` وهو الواجهة العامة للأقفال غير المهيكلة بجافا.
2. السطر 2: `ReentrantLock` هو التطبيق الفعلي للقفل — اسمه "قابل لإعادة الدخول" لأنو نفس الخيط يقدر ياخده أكتر من مرة بدون ما يعلّق حاله.
3. السطر 3: نستورد `Condition` وهي الواجهة اللي بتمثل "غرفة الانتظار".
4. السطر 5: ننشئ القفل نفسه.
5. السطرين 6-7: بننشئ اثنين `Condition` من نفس القفل عن طريق `lock.newCondition()` — كل `Condition` مرتبط بنفس القفل، بس عنده قائمة انتظار (`waiting-set`) مستقلة عن التاني.

#### 📖 الشرح
تخيّل مطعم فيه باب واحد بس (هاد القفل)، وجوا المطعم فيه غرفتين انتظار منفصلتين: وحدة للزبائن يلي مستنيين طاولة تفضى (`empty`)، وثانية للنادل يلي مستني الطبخ يخلص (`full`). لو كان عندك غرفة انتظار وحدة بس (متل `synchronized`)، أي إشارة (`notify`) ممكن توقّظ الشخص الغلط، وتضطر توقّظ الكل (`notifyAll`) وتخليهم يتزاحموا عالفاضي — أداء ضعيف وتعقيد زيادة. الـ `Condition` objects بتحل هاي المشكلة لأنها بتعطيك دقة: توقّظ بالضبط مجموعة الخيوط اللي مهتمة بهالحالة تحديداً.

الميثودات الأساسية اللي بيدعمها `Condition` (وكلها لازم تُستدعى وانت ماسك القفل):
- `void await()` — زي `wait()` بالـ `synchronized`، بتوقف الخيط الحالي لحد ما يوصله إشارة (`signal`) أو `interrupt`. فيه نسخ منها بتدعم `timeout` أو الاستجابة للـ `interruption`.
- `void signal()` — زي `notify()`، بتصحّي خيط واحد بس من نفس الـ `Condition`.
- `void signalAll()` — زي `notifyAll()`، بتصحّي كل الخيوط المستنية عهالـ `Condition` تحديداً (مش كل الخيوط المستنية عالقفل ككل).

🤔 **جرب تفكر:** لو كان عندك `Condition` وحدة بس بدل اثنين، شو كان بيصير لأداء `Bounded Buffer` تحت زحمة عالية؟

#### 🎯 الملخص السريع
- `Condition` = غرفة انتظار مستقلة مرتبطة بقفل واحد.
- بتقدر تعمل أكتر من `Condition` من نفس القفل عبر `lock.newCondition()`.
- `await()`/`signal()`/`signalAll()` بيقابلوا `wait()`/`notify()`/`notifyAll()` — بس بدقة أعلى.

#### 📚 التطبيق
الفقرة الجاية رح تستخدم بالضبط هاد المبدأ لبناء `Bounded Buffer` كامل، وين بنحتاج غرفتين انتظار منفصلتين تماماً: وحدة للمنتج (Producer) لما يكون الـ Buffer ممتلئ، وثانية للمستهلك (Consumer) لما يكون فاضي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفتكرو إنو `Condition` هو نفسه `Lock` تاني منفصل، وبيحاولو يستخدموه لوحده بدون قفل.

#### الفهم الصحيح ✅:
`Condition` مش قفل مستقل — هو دايماً مربوط بقفل موجود مسبقاً (`lock.newCondition()`)، وما بتقدر تستدعي `await()` أو `signal()` إلا وانت ماسك ذاك القفل تحديداً، تماماً متل ما ما بتقدر تستدعي `wait()` إلا جوا `synchronized` block على نفس الكائن.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Use Condition objects to support multiple waiting-sets and this requires unstructured locks
> - Can be allocated by calling ReentrantLock.newCondition()
> - Supports multiple condition variables per lock
> - Methods supported by an instance of condition
>   - void await() // NOTE: like wait() in synchronized statement — Causes current thread to wait until it is signaled or interrupted — Variants available with support for interruption and timeout
>   - void signal() // NOTE: like notify() in synchronized statement — Wakes up one thread waiting on this condition
>   - void signalAll() // NOTE: like notifyAll() in synchronized statement — Wakes up all threads waiting on this condition
> - For additional details see http://download.oracle.com/javase/1.5.0/docs/api/java/util/concurrent/locks/Condition.html

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف `Condition`، `newCondition()`، الميثودات الثلاثة `await/signal/signalAll` والمقارنة مع `wait/notify/notifyAll`.
- ℹ️ إضافة من الدليل: تشبيه المطعم بغرفتين انتظار (ليس بالمحاضرة).

</details>

---

### 1.2. تطبيق `Bounded Buffer` باستخدام `Condition` (`put` / `take`)
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "1.1", group: "1.1"} -->

#### 💡 الفكرة الأساسية
**`Bounded Buffer` هو مصفوفة محدودة الحجم، المنتج (Producer) بيوقف لما تمتلئ (باستخدام `full.await()`)، والمستهلك (Consumer) بيوقف لما تفضى (باستخدام `empty.await()`) — كل وحدة عندها غرفة انتظارها المستقلة.**
*(هاد امتداد مباشر لفكرة الـ `Condition` اللي حكينا عنها بالفقرة اللي قبل.)*

---

#### 💻 الكود — تعريف الكلاس والحقول
```java
class BoundedBuffer {
    final Lock lock = new ReentrantLock();
    final Condition full  = lock.newCondition();
    final Condition empty = lock.newCondition();

    final Object[] items = new Object[100];
    int putptr, takeptr, count;
}
```

#### شرح الكود سطراً بسطر
1. `lock`: القفل الوحيد اللي بيحمي كل الحالة المشتركة (`items`, `putptr`, `takeptr`, `count`).
2. `full`: `Condition` بتشير لحالة "الـ Buffer ممتلئ" — المنتج بيستنى هون.
3. `empty`: `Condition` بتشير لحالة "الـ Buffer فاضي" — المستهلك بيستنى هون.
4. `items`: مصفوفة ثابتة الحجم (100 عنصر) بتخزن العناصر فعلياً.
5. `putptr`/`takeptr`: مؤشرات دائرية (circular) لمكان الإدخال والإخراج الجايين.
6. `count`: عدد العناصر الموجودة حالياً بالـ Buffer.

#### 💻 الكود — الميثود `put`
```java
public void put(Object x) throws InterruptedException {
    lock.lock();
    try {
        while (count == items.length) full.await();
        items[putptr] = x;
        if (++putptr == items.length) putptr = 0;
        ++count;
        empty.signal();
    } finally {
        lock.unlock();
    }
}
```

#### شرح الكود سطراً بسطر
1. `lock.lock()`: ياخد القفل قبل ما يلمس أي حالة مشتركة.
2. `try { ... } finally { lock.unlock(); }`: نمط إلزامي — لازم تحرر القفل حتى لو صار `Exception`، عشان هيك دايماً بـ `finally`.
3. `while (count == items.length) full.await();`: لو الـ Buffer ممتلئ، الخيط بيوقف هون (بيفلت القفل مؤقتاً أثناء `await`) لحد ما ياخد إشارة إنو فيه مكان فاضي. لاحظ استخدام `while` مش `if` — لأنو ممكن الخيط ياخد إشارة بس حالة الامتلاء ترجع تصير صحيحة تاني قبل ما ياخد دوره (منافسة مع خيوط تانية).
4. `items[putptr] = x;`: يحط العنصر الجديد بمكان المؤشر الحالي.
5. `if (++putptr == items.length) putptr = 0;`: يحرّك المؤشر، ولو وصل آخر المصفوفة يرجعه للبداية (سلوك دائري).
6. `++count;`: يزيد عداد العناصر.
7. `empty.signal();`: يصحّي **مستهلك واحد** مستني على `empty` (لأنو دلوقتي أكيد صار فيه عنصر واحد على الأقل).
8. `lock.unlock();`: يحرر القفل بالـ `finally` مهما صار.

#### 💻 الكود — الميثود `take`
```java
public Object take() throws InterruptedException {
    lock.lock();
    try {
        while (count == 0) empty.await();
        Object x = items[takeptr];
        if (++takeptr == items.length) takeptr = 0;
        --count;
        full.signal();
        return x;
    } finally {
        lock.unlock();
    }
}
```

#### شرح الكود سطراً بسطر
1. `lock.lock()`: نفس المبدأ — ياخد القفل أول شي.
2. `while (count == 0) empty.await();`: لو الـ Buffer فاضي، الخيط بيستنى على `empty` لحد ما يصير فيه عنصر.
3. `Object x = items[takeptr];`: ياخد العنصر من مكان المؤشر الحالي.
4. `if (++takeptr == items.length) takeptr = 0;`: يحرّك المؤشر دائرياً زي `put`.
5. `--count;`: ينقص عداد العناصر.
6. `full.signal();`: يصحّي **منتج واحد** مستني على `full` (لأنو دلوقتي أكيد صار فيه مكان فاضي).
7. `return x;`: يرجّع العنصر يلي أخده.
8. `finally { lock.unlock(); }`: يحرر القفل بكل الحالات.

#### 📖 الشرح
هون بالضبط بيظهر ليش احتجنا `Condition`ين منفصلتين مش وحدة: المنتج والمستهلك بينتظرو أسباب مختلفة تماماً (ممتلئ vs فاضي)، ولو استخدمنا `notifyAll()` وحدة لكل الخيوط، كنا رح نصحّي منتجين ومستهلكين مع بعض بلا داعي، وبيضطرو يتأكدو من الشرط تاني ويرجعو يناموا — أداء أسوأ. باستخدام `full`/`empty` منفصلين، كل `signal()` بتروح بالضبط للمجموعة المهتمة.

#### 🎯 الملخص السريع
- `put` بيستنى على `full` (لما الـ Buffer ممتلئ)، وبيصحّي `empty` بعد ما يضيف عنصر.
- `take` بيستنى على `empty` (لما الـ Buffer فاضي)، وبيصحّي `full` بعد ما ياخد عنصر.
- استخدام `while` بدل `if` مع `await()` إلزامي لتفادي "الصحوة الكاذبة" (spurious wakeup) أو تسابق خيوط تانية على نفس الشرط.
- `lock.unlock()` دايماً بـ `finally` — قاعدة ذهبية مع الأقفال غير المهيكلة.

#### 📚 التطبيق
هالنمط (`Producer-Consumer` مع `Bounded Buffer`) أساسي بأي نظام معالجة بيانات متدفقة (streaming)، طوابير الرسائل (message queues)، وأنظمة تشغيل حقيقية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> class BoundedBuffer { final Lock lock = new ReentrantLock(); final Condition full = lock.newCondition(); final Condition empty = lock.newCondition(); final Object[] items = new Object[100]; int putptr, takeptr, count; ... }
>
> public void put(Object x) throws InterruptedException { lock.lock(); try { while (count == items.length) full.await(); items[putptr] = x; if (++putptr == items.length) putptr = 0; ++count; empty.signal(); } finally { lock.unlock(); } }
>
> public Object take() throws InterruptedException { lock.lock(); try { while (count == 0) empty.await(); Object x = items[takeptr]; if (++takeptr == items.length) takeptr = 0; --count; full.signal(); return x; } finally { lock.unlock(); } }

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل أسطر `put` و`take` والحقول.

</details>

---

## 2. تقنيات الكائنات عالية التزامن (Techniques for Highly Concurrent Objects)

### 2.1. مثال: `List-Based Sets` (خوارزمية تسلسلية)
<!-- @render: {type: "code-first", visualization: "diagram", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "1.2", group: "2.1-2.6"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة (2.1 → 2.6) بتاخدنا لقلب المحاضرة: أربع طرق مختلفة نخلّي فيها كائن مشترك (`List-Based Set`) متزامن وآمن — بدايةً من أبسط حل (قفل واحد) لأدق حل (قفل لكل عقدة). كل فقرة بتبني على مشكلة الفقرة يلي قبلها.

#### ⬅️ الربط مع السابق
لسا الفقرة السابقة علّمتنا `Condition` objects كأداة تنسيق. هلق بدنا نطبّق مبدأ التزامن بشكل أوسع: مش بس "متى يستنى الخيط ومتى يصحى"، لكن "كيف نحمي بنية بيانات كاملة (List) من التداخل الخطأ بين الخيوط". أول خطوة هي نفهم كيف الخوارزمية شغالة **تسلسلياً** (single-threaded) قبل ما نضيف تعقيد التزامن.

#### 💡 الفكرة الأساسية
**`List-Based Set` هي قائمة مرتبطة (Linked List) مرتبة تمثل مجموعة أعداد صحيحة بدون تكرار — وبنبدأ بفهم نسختها التسلسلية (بدون أي تزامن) قبل ما نشوف شو بينكسر لما تصير متعددة الخيوط.**

---

#### 📊 بنية البيانات
القائمة مرتّبة ومحاطة بحدّين وهميّين ثابتين: `-∞` بالبداية و`∞` بالنهاية (يسهّلو التعامل مع الحواف: مفيش حاجة اسمها "قبل الأول" أو "بعد الأخير").

| رقم العقدة | القيمة | ملاحظة |
| --- | --- | --- |
| N0 | `-∞` | عقدة حارسة ثابتة، دايماً أول عقدة |
| N1 | 1 | عقدة بيانات فعلية |
| N2 | 4 | عقدة بيانات فعلية |
| N3 | 9 | عقدة بيانات فعلية |
| N4 | `∞` | عقدة حارسة ثابتة، دايماً آخر عقدة |

| من | إلى | نوع الرابط |
| --- | --- | --- |
| N0 | N1 | `next` تسلسلي |
| N1 | N2 | `next` تسلسلي |
| N2 | N3 | `next` تسلسلي |
| N3 | N4 | `next` تسلسلي |

```flowchart
[head: -∞] --> [1] --> [4] --> [9] --> [∞: tail]
```

#### 💻 الكود — العمليات الثلاث (pseudocode)
```java
// S.add(x): يضيف x إذا لم يكن موجوداً، يرجّع true إذا نجحت الإضافة
S.add(x)
    pred := S.head
    curr := pred.next
    while (curr.key < x)
        pred := curr
        curr := pred.next
    if curr.key = x then
        return false          // موجود مسبقاً
    else
        node = new Node(x)
        node.next = curr
        pred.next = node
        return true

// S.remove(x): يحذف x إذا كان موجوداً، يرجّع true إذا نجح الحذف
S.remove(x)
    pred := S.head
    curr := pred.next
    while (curr.key < x)
        pred := curr
        curr := pred.next
    if curr.key = x then
        pred.next = curr.next
        return true
    else
        return false

// S.contains(x): يتحقق فقط، بدون أي تعديل على القائمة
S.contains(x)
    curr := S.head
    while (curr.key < x)
        curr := curr.next
    if curr.key = x then
        return true
    else
        return false
```

#### شرح الكود سطراً بسطر
1. `pred := S.head` / `curr := pred.next`: بنبدأ مؤشرين — `pred` (السابق) و`curr` (الحالي)، لأنو لازم نعرف مين قبل مكان الإدخال/الحذف عشان نعدّل الرابط.
2. `while (curr.key < x)`: بما إنو القائمة مرتبة، بنتقدم لحد ما نوصل لأول عقدة قيمتها ≥ x — هون بنوقف نبحث.
3. `if curr.key = x`: يعني القيمة موجودة فعلاً.
   - بحالة `add`: هاد فشل (القيمة موجودة، ما بنضيف تكرار) → `return false`.
   - بحالة `remove`: هاد نجاح (لقينا القيمة، بنحذفها) → بنربط `pred.next` مباشرة بـ `curr.next`، وكأن `curr` صارت "متجاوَزة" (bypassed).
4. بحالة `add` لو `curr.key ≠ x`: بننشئ عقدة جديدة، بنخليها تأشر لـ `curr` (يعني تنحط قبلها)، وبعدين `pred.next` بيأشر عليها.
5. `contains`: أبسط عملية — بس بتفحص وترجع نتيجة، بدون أي تعديل على القائمة (`no change to S`) — وهاي النقطة رح تكون مفتاحية لاحقاً بموضوع `Read/Write Locking`.

#### 📖 الشرح
هاي الخوارزمية التسلسلية "بريئة" تماماً بدون تزامن — خيط واحد بس بيشتغل بيها، ومفيش أي مشكلة. الفكرة إنها بتعتمد بشكل أساسي على **مسار البحث** (traversal) قبل التعديل، وهاد بالضبط اللي رح يفتح باب المشاكل لما نضيف أكتر من خيط: تخيل خيطين بيمشو بنفس الوقت على نفس المسار.

💡 **تشبيه:** فكّرها متل طابور ناس واقفين بالترتيب حسب الطول، وانت بدك تحط شخص جديد بمكانه الصح — لازم تعرف مين قبله (`pred`) عشان تقدر "تفتح مكان" له بالطابور.

#### 🎯 الملخص السريع
- `List-Based Set` = Linked List مرتبة، بحدين وهميين `-∞` و`∞`.
- الثلاث عمليات كلها بتمشي بنفس نمط البحث (`pred`, `curr`) قبل ما تنفذ التعديل.
- `contains` هي الوحيدة اللي "ما بتغيّر شي" — هاي معلومة مهمة قدّام.

#### 📚 التطبيق
الفقرة الجاية رح توضح بالضبط شو بيصير لو اثنين خيوط شغّلو `remove` بنفس الوقت بدون أي حماية — وليش هالخوارزمية "بريئة تسلسلياً" بس خطيرة بالتزامن.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Data type: set of integers (no duplicates) — S.add(x): Boolean: S := S ∪ {x}; return true iff x not already in S — S.remove(x): Boolean: S := S \ {x}; return true iff x in S initially — S.contains(x): Boolean: return true iff x in S (no change to S)
> Simple ordered linked-list-based implementation — illustrate techniques useful for pointer-based data structures — poor data structure for this specific data type
>
> S.add(x): pred := S.head; curr := pred.next; while (curr.key < x) pred := curr; curr := pred.next; if curr.key = x then return false; else node = new Node(x); node.next = curr; pred.next = node; return true
> S.remove(x): pred := S.head; curr := pred.next; while (curr.key < x) pred := curr; curr := pred.next; if curr.key = x then pred.next = curr.next; return true; else return false
> S.contains(x): curr := S.head; while (curr.key < x) curr := curr.next; if curr.key = x then return true; else return false

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف، الرسم، الثلاث عمليات كاملة سطر بسطر.
- ℹ️ إضافة من الدليل: تشبيه الطابور.

</details>

---

### 2.2. السماح بالوصول المتزامن — أين تنكسر الخوارزمية؟
<!-- @render: {type: "diagram-first", visualization: "flowchart", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "2.1", group: "2.1-2.6"} -->

#### 💡 الفكرة الأساسية
**لو شغّلنا الخوارزمية التسلسلية بدون تعديل مع أكتر من خيط بنفس الوقت، ممكن نضيع تعديل كامل (Lost Update) لأنو اثنين خيوط بيقرأو نفس حالة القائمة قبل ما أي وحد يكتب.**

---

#### 📊 المخطط — سيناريو `remove(4)` و`remove(9)` بنفس الوقت

| رقم العقدة | القيمة |
| --- | --- |
| N0 | `-∞` |
| N1 | 1 |
| N2 | 4 |
| N3 | 9 |
| N4 | `∞` |

**الحالة الأصلية:**
```flowchart
[head: -∞] --> [1] --> [4] --> [9] --> [∞]
```

**كل خيط بيمسك مؤشراته الخاصة (لا حماية):**

| الخيط | pred | curr | الهدف |
| --- | --- | --- | --- |
| Thread A | 1 | 4 | `remove(4)` |
| Thread B | 4 | 9 | `remove(9)` |

#### 📖 الشرح
اقرأ المخطط كالتالي: الخيط A وصل لـ `pred=1, curr=4` عشان يحذف القيمة 4 — يعني بدو يعمل `1.next = 9` (تجاوز 4). بنفس اللحظة تقريباً، الخيط B وصل لـ `pred=4, curr=9` عشان يحذف القيمة 9 — يعني بدو يعمل `4.next = ∞` (تجاوز 9).

المشكلة: الخيط B بنى مساره اعتماداً على عقدة `4` وكأنها لسا موجودة بالقائمة (لأنو قرأها قبل ما A يحذفها). لو A نفذ `1.next = 9` أول، والقائمة بقت `-∞ → 1 → 9 → ∞`، وبعدين B نفّذ `4.next = ∞` — هاد التعديل **ضاع بلا فايدة** لأنو `4` أصلاً مش موصولة بالقائمة الفعلية بعدها. النتيجة النهائية ممكن تطلع القائمة فيها 9 لسا موجودة رغم إنو B "حذفها"، أو أسوأ من هيك — تلف كامل بمسار القائمة (broken chain).

🤔 **جرب تفكر:** شو كان بيصير لو الاثنين كانوا عم يحذفوا نفس القيمة بالضبط (`remove(4)` من الاثنين)؟

#### 🎯 الملخص السريع
- الخوارزمية التسلسلية مش "thread-safe" — أي تعديل بالمؤشرات (`next`) بيعتمد على قراءة سابقة ممكن تصير قديمة (stale).
- المشكلة الأساسية: خيطين بيقرأو حالة القائمة، وبس واحد منهم بيكتب صح، والتاني بيكتب فوق بيانات قديمة.
- هاد بالضبط نمط الـ `Race Condition` اللي درسناه بمحاضرة سابقة، بس هون على مستوى بنية بيانات كاملة مش متغيّر واحد.

#### 📚 التطبيق
السؤال الطبيعي الجاي: "كيف نصلحها؟" — وهاد بالضبط موضوع الفقرات الأربع الجاية، كل وحدة بتقدم حل بمستوى تعقيد وأداء مختلف.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Is this algorithm "thread-safe"? What can go wrong? Can we "fix" it? How?
> [رسمة remove(4) و remove(9) بنفس الوقت من خيطين مختلفين تؤدي لتضارب على head/pred/curr]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: السؤال المطروح بالمحاضرة (thread-safe؟ شو بينكسر؟) تم توضيحه بمثال ملموس مبني على رسمة المحاضرة نفسها.

</details>

---

### 2.3. `Coarse-Grained Mutual Exclusion`

#### 💡 الفكرة الأساسية
**أبسط حل: قفل واحد يغطي الكائن بالكامل — كل عملية (`add`, `remove`, `contains`) لازم تاخد نفس القفل قبل ما تلمس القائمة، وتفلته بعد ما تخلص.**
*(هاد أول حل عملي لمشكلة الفقرة اللي قبل.)*

---

#### 💻 الكود
```java
// S.add(x) بعد إضافة الحماية
S.add(x)
    S.lock()
    pred := S.head
    curr := pred.next
    while (curr.key < x)
        pred := curr
        curr := pred.next
    if curr.key = x then
        S.unlock()
        return false
    else
        node = new Node(x)
        node.next = curr
        pred.next = node
        S.unlock()
        return true
```

#### شرح الكود سطراً بسطر
1. `S.lock()`: أول شي، ياخد القفل الوحيد الخاص بكامل الكائن `S`.
2. البحث (`while`) والتعديل بيصيرو تماماً متل النسخة التسلسلية — بس هلق تحت حماية القفل، فمفيش خيط تاني يقدر يلمس القائمة بنفس الوقت.
3. `S.unlock()`: قبل كل `return` (سواء نجحت أو فشلت العملية) — لازم تُحرّر القفل بكل المسارات.

#### 📖 الشرح
هاد الحل بيحاكي تماماً مبدأ `synchronized` — بس هون مكتوب صراحةً بـ `lock()`/`unlock()`. النقطة المهمة اللي بتطرحها المحاضرة: **ليش ممكن نفلت القفل بدري بـ `contains()`؟** الجواب: لأنو `contains()` بعد ما توصل لنتيجتها (سواء true أو false)، مش رح تعدّل أي شي، فمفيش داعي تفضل ماسكة القفل أطول من اللازم.

⚖️ **المقايضة:**

| المعيار | التقييم |
| --- | --- |
| سهولة الكتابة والإثبات | ممتاز — بسيط جداً، سهل تثبت صحته |
| تحمّل الأعطال (`fault-tolerance`) | لا يوجد، لكنه `deadlock-free` بطبيعته (قفل واحد بس) |
| الأداء تحت زحمة عالية | ضعيف جداً — لا يوجد تزامن حقيقي، كل الخيوط بتصطف عالقفل الواحد |
| الأداء تحت زحمة منخفضة | ممتاز — أبسط حل وغالباً كافي |

#### 💡 التشبيه
تخيّل مكتبة فيها باب واحد بس، وكل من بدو يفوت (سواء بدو يستعير كتاب، يرجّعه، أو بس يتأكد إذا موجود) لازم يستنى دوره بالباب — حتى لو كل اللي بدو يعمله هو نظرة سريعة.

#### 🎯 الملخص السريع
- قفل واحد يغطي كل الكائن — أبسط حل ممكن.
- `deadlock-free` تلقائياً (مفيش أكتر من قفل واحد فممكن يصير انتظار دائري).
- أداء ضعيف تحت زحمة عالية لأنو مفيش تزامن حقيقي بين الخيوط.

#### 📚 التطبيق
الخطوة الجاية: كيف نحسّن الأداء بدون ما نضيّع البساطة كلياً؟ الجواب الأول هو `Read/Write Locking`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيستهينو بـ `Coarse-Grained Locking` ويحسبوها دايماً "حل ضعيف" لازم نتجنبه.

#### الفهم الصحيح ✅:
المحاضرة بتأكد صراحة: "For many applications, this is the best solution! (Don't underrate simplicity)". لو التزاحم (`contention`) منخفض بالتطبيق الحقيقي، هاد الحل ممكن يكون أفضل خيار عملياً — البساطة قيمة بحد ذاتها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Why can we unlock early here? [contains بيفلّت القفل بمجرد ما يلاقي النتيجة]
> Easy — to write — to prove correct
> No fault-tolerance — but it is deadlock-free! — if we use queue locks, it's lockout-free
> Poor performance when contention is high — essentially no concurrent access — but often good enough for low contention
> For many applications, this is the best solution! (Don't underrate simplicity.)

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل نقاط المزايا والعيوب المذكورة.

</details>

---

### 2.4. `Read/Write Locking`

#### 💡 الفكرة الأساسية
**بدل قفل واحد بيمنع الكل، نستخدم نوعين من الأقفال: `read lock` يسمح لأكتر من قارئ بنفس الوقت، و`write lock` حصري بالكامل — مفيد لما القراءة (`contains`) أكتر بكتير من الكتابة (`add`/`remove`).**
*(هاد تحسين مباشر على مشكلة الأداء اللي ذكرناها بالفقرة اللي قبل.)*

---

#### 💻 الكود
```java
search(x) {
    readlock(A);
    A[i] == x;
    unlock(A);
}

update(i, x) {
    writelock(A);
    A[i] = x;
    unlock(A);
}
```

#### شرح الكود سطراً بسطر
1. `search(x)`: عملية قراءة بس — بتاخد `readlock`، وممكن يشتغل بنفس الوقت أكتر من `search` مع بعض (أكتر من قارئ بنفس اللحظة مسموح).
2. `update(i, x)`: عملية كتابة — بتاخد `writelock` وهو حصري (`exclusive`)، يعني ما بيقدر يشتغل بنفس الوقت مع أي قراءة أو كتابة تانية.
3. مثال المحاضرة هون هو مصفوفة عامة `A` (Array concurrency)، مش List-Based Set تحديداً، بس نفس المبدأ.

#### 📖 الشرح
النقطة الأساسية اللي بتحددها المحاضرة: **`Read/Write locks` هي نوع من الأقفال غير المهيكلة** (`unstructured locks`)، بمعنى إنها بتحتاج إدارة صريحة (مش block-structured بسيط زي `synchronized`). المشكلة الكلاسيكية يلي بتحذر منها المحاضرة هي `Data Race`: لو استخدمنا القفل الغلط بالمكان الغلط (مثلاً كتابة بدون `writelock` حصري)، ممكن يصير تضارب قراءة/كتابة.

بتطبيق `List-Based Set`: لأنو `contains()` "ما بتغيّر شي بالقائمة" (زي ما شرحنا بالفقرة 2.1)، فهي مرشحة مثالية تاخد `readlock` بس. أما `add` و`remove` فلازم `writelock` لأنهم بيعدّلو الروابط.

فيه نقاط تصميم إضافية مهمة:
- **الكتّاب ممكن "يتضوّروا" (starve)** لو فيه قراءة مستمرة — لهاد بيقترحوا إضافة "waiting bit" يمنع قارّاء جدد من الدخول لو فيه كاتب مستني دوره.
- **الترقية (upgrading):** شو بيصير لو `add` أو `remove` رجعوا `false`؟ يعني العملية بالأساس فشلت لأنو العنصر موجود مسبقاً (بحالة add) أو مش موجود (بحالة remove) — بهاي الحالة، كنا بنبحث بس بدون تعديل فعلي، فهل نبلّش بـ `readlock` ونـ"نرقّيه" لـ `writelock` بس لو احتجنا نعدّل؟ هاد سؤال تصميم مفتوح.

#### 🎯 الملخص السريع
- `Read/Write Locks` = نوعين من القفل: `readlock` (مشترك) و`writelock` (حصري).
- `Read/Write locks` هي أقفال غير مهيكلة (`unstructured`).
- إشكالية `starvation` عند الكتّاب لو فيه قراءة مستمرة — الحل: "waiting bit".
- سؤال الترقية (`upgrading`) مطروح كمشكلة تصميم مفتوحة.

#### 📚 التطبيق
لو نسبة القراءة عالية جداً بتطبيقك (مثلاً كاش بيانات بيُقرأ آلاف المرات مقابل كتابة نادرة)، `Read/Write Locking` بيعطيك تحسين أداء كبير بدون تعقيد كبير زيادة عن `Coarse-Grained`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيفتكرو إنو `Read/Write Locking` بيحل مشكلة التزامن بالكامل ومفيها أي خطر إضافي.

#### الفهم الصحيح ✅:
المحاضرة بتحذّر تحديداً من مشكلة `Data Race`: لو مبرمج نسي يستخدم `writelock` الصح بمكان الكتابة (استخدم `readlock` غلط مثلاً)، بيصير تضارب حقيقي — القفل مش سحر، لازم تستخدمه بدقة حسب نوع العملية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> allow multiple readers to hold lock simultaneously — writers can easily starve — introduce "waiting" bit to avoid this — contains takes only read lock — can be big win if contains is the most common operation — what about add or remove that returns false? — upgrading
> Read/Write locks are unstructured locks. Example: Array concurrency – Data Race problem
> search(x){ readlock(A); A[i] == x; unlock(A); }
> update(i,x){ writelock(A); A[i] = x; unlock(A); }

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل النقاط المذكورة (starvation، waiting bit، upgrading، الكود).

</details>

---

### 2.5. `Fine-Grained Locking`

#### 💡 الفكرة الأساسية
**بدل قفل واحد على الكائن كله، نربط قفل بكل قطعة صغيرة من البيانات (كل عقدة Node مثلاً) — هيك عمليات على أجزاء منفصلة من القائمة بتقدر تشتغل بنفس الوقت فعلياً.**
*(هون بنبتعد عن فكرة "قفل واحد يغطي الكل" اللي شفناها بالـ Coarse-Grained و Read/Write، ونروح لتفتيت حقيقي.)*

---

#### 📖 الشرح
الفكرة المركزية: الميثودات اللي بتشتغل على أجزاء منفصلة (disjoint) من البيانات ممكن تتقدم بنفس الوقت فعلياً بدون ما تتزاحم — مثلاً لو `Thread A` عم يعدّل بداية القائمة و`Thread B` عم يعدّل نهايتها، ما في داعي يستنى واحد التاني.

النقطة الأهم هون هي **إثبات الصحة (`atomicity`)** — وأسهل طريقة تثبتها هي لو القفل الخاص بك يتبع نمط **"Two-Phase Locking"**:
> **المرحلة الأولى (Acquire):** خذ كل الأقفال اللي محتاجها.
> **المرحلة الثانية (Release):** حرر الأقفال، بدون ما تاخد أي قفل جديد بعد ما تبلّش تحرر (يعني ممنوع Acquire بعد أي Release).
> غالباً بتُطبّق كـ "Strict Two-Phase Locking": تحرر كل الأقفال دفعة وحدة بنهاية العملية.

المشاكل الأساسية اللي بتظهر مع `Fine-Grained Locking`:
- **التكلفة:** أخذ أكتر من قفل (بدل واحد) ممكن يكون مكلف من ناحية أداء.
- **خطر الـ `Deadlock`:** لازم تكون حذر جداً — عادةً بتاخد الأقفال بترتيب محدد مسبقاً (predetermined order) لتفادي انتظار دائري بين الخيوط.
- **التطبيق الساذج للـ Two-Phase ما بيساعد دايماً:** المحاضرة بتطرح سؤال — "why not?" — والإجابة إنو حتى لو طبّقت Two-Phase بشكل ساذج، بتفقد ميزة **التزامن** اللي كنت تدور عليها أصلاً (لأنك لسا بتاخد كل الأقفال قبل ما تبلّش تشتغل، فمافي فايدة حقيقية من التفتيت). بالمقابل، مع `Read/Write locks` هالنمط بيشتغل صح، بس برضو لازم تنتبه لتفادي الـ Deadlock.

💡 **التشبيه:** فكّرها متل بيت فيه غرفة لكل عضو بالعيلة بدل قفل واحد على الباب الرئيسي — كل واحد يقدر يشتغل بغرفته بنفس الوقت، بس لو اثنين محتاجين يفوتو غرفتين مشتركتين بترتيب مختلف، ممكن يصير تعارض (deadlock).

#### 🎯 الملخص السريع
- `Fine-Grained Locking` = أقفال متعددة، وحدة لكل قطعة بيانات صغيرة.
- `Strict Two-Phase Locking` = خذ كل الأقفال أول، حرر كل شي آخر العملية — بيسهّل إثبات الصحة.
- خطر أساسي: `Deadlock` — الحل الشائع: ترتيب ثابت لأخذ الأقفال.
- التطبيق الساذج للـ Two-Phase مع أقفال عادية (مش Read/Write) ما بيحقق فايدة تزامن حقيقية.

#### 📚 التطبيق
الفقرة الجاية (`Hand-over-Hand Locking`) هي حالة خاصة ومحددة من `Fine-Grained Locking`، بس **بدون** الالتزام بـ Two-Phase — وهاد بالضبط اللي بيخليها أقوى بالأداء بس أصعب بالإثبات.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> associate locks with smaller pieces of data — methods that work on disjoint pieces can proceed concurrently
> simple to prove atomicity if locking is "two-phase" — first acquire locks, then release (no acquire after any release) — typically release at the end of operation: strict two-phase locking
> can be expensive to acquire all the locks
> must be careful to avoid deadlock — typically acquire locks in some predetermined order
> naive two-phase application doesn't help (why not?) — it does with reader/writer locks, but tricky to avoid deadlock

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل النقاط المذكورة مع تفسير حقيقي لماذا التطبيق الساذج لا يفيد.

</details>

---

### 2.6. `Hand-over-Hand Locking`

#### 💡 الفكرة الأساسية
**`Fine-Grained Locking` بس بدون Two-Phase: تمسك قفل العقدة الجاية (successor) قبل ما تفلت قفل العقدة الحالية (predecessor) — بحد أقصى قفلين بيدك بنفس اللحظة.**
*(هاي تطبيق عملي ودقيق جداً لفكرة الـ Fine-Grained اللي حكينا عنها بالفقرة اللي قبل.)*

---

#### 📊 المخطط — عملية `remove(4)` خطوة بخطوة

| رقم العقدة | القيمة |
| --- | --- |
| N0 | head (`-∞`) |
| N1 | `a` |
| N2 | `b` |
| N3 | `c` |
| N4 | `d` |

**خطوات القفل خلال البحث عن `b` (لاحظ إنو بحد أقصى قفلين ماسكين بنفس اللحظة):**

```flowchart
[الخطوة 1: قفل head و قفل a] --> [الخطوة 2: فلت قفل head, قفل b (صار ماسك a و b)] --> [الخطوة 3: فلت قفل a, قفل c (صار ماسك b و c)] --> [الخطوة 4: نفّذ الحذف: a.next = c] --> [فلت كل الأقفال]
```

| من (الحالة) | إلى (الحالة) | الحدث |
| --- | --- | --- |
| ماسك head فقط | ماسك head + a | `lock(a)` قبل ما نتقدم |
| ماسك head + a | ماسك a فقط | `unlock(head)` بعد ما صرنا آمنين مع a |
| ماسك a فقط | ماسك a + b | `lock(b)` قبل ما نتقدم |
| ماسك a + b | ماسك a فقط (بعد ما وجدنا b الهدف) | تحديد pred=a, curr=b |

#### 📖 الشرح
اقرأ المخطط كالتالي: بدل ما ناخد **كل** الأقفال أول (متل Two-Phase)، بنمشي بالقائمة "يد ورا يد" — زي شخص طالع درج وماسك درابزين، ما بيفلت الدرابزين الحالي إلا بعد ما يمسك الدرابزين الجاي. هيك بضمن إنو حتى لو خيط تاني عم يشتغل بنفس الوقت على جزء تاني من القائمة، ما رح يصير تضارب — لأنو أي عقدة عم نلمسها إحنا ماسكينها.

**سؤالين مهمين تطرحهم المحاضرة:**
1. **هل لازم نقفل العقدة التالية (successor) وقت الإضافة؟** الجواب: لأ، مش لازم نقفل عشان **نقرأ** المفتاح (`key`) بس — القراءة العادية للمفتاح آمنة بدون قفل بحالات معينة (لأنو المفتاح نفسه ثابت بعد الإنشاء، immutable).
2. **هل لازم نقفل العقدة اللي بدنا نحذفها؟** هاد سؤال مفتوح بيعتمد على تفاصيل التصميم — إذا في خطر إنو عقدة تُحذف من مكان تاني بنفس اللحظة وانت لسا شغال عليها.

**مشكلة `remove(b)` و`remove(c)` بنفس الوقت (سيناريو حقيقي من المحاضرة):**
تخيّل `Thread أخضر` بده يحذف `b` و`Thread أحمر` بده يحذف `c` — الاثنين بيمشو بالتسلسل نفسه (head → a → b → c)، بس كل وحد ماسك أقفاله الخاصة تدريجياً. بما إنو كل وحد لازم يمسك قفل العقدة الجاية قبل ما يفلت اللي قبلها، فالأخضر (يلي بده b) لازم يمسك a و b مع بعض لحظة معينة، والأحمر (يلي بده c) لازم يمسك b و c مع بعض — يعني فيه لحظة الاثنين بيتشاركو الاهتمام بعقدة `b` (الأخضر ماسكها كـ curr، الأحمر بده ياخدها كـ pred). هون القفل عالعقدة `b` نفسها هو اللي بيحسم الترتيب الآمن بينهم: مين ما ياخد القفل أول بيكمل، والتاني بينتظر دوره بأمان.

#### 🎯 الملخص السريع
- `Hand-over-Hand` = بحد أقصى قفلين بنفس الوقت: الحالي والتالي.
- تمسك قفل التالي قبل ما تفلت قفل الحالي — عشان ما يصير "فجوة" بلا حماية.
- إثبات الصحة أصعب من Two-Phase العادي، لأنو مش نفس النمط.
- أسئلة تصميم مفتوحة: هل لازم قفل successor للقراءة بس؟ وهل لازم قفل العقدة المحذوفة؟

#### 📚 التطبيق
هالتقنية أساس لبنى بيانات متقدمة أكتر (زي أشجار Search Trees متزامنة) — أي بنية pointer-based بتحتاج مسار بحث تسلسلي ممكن تستفيد من نفس المبدأ.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيحسبو إنو `Hand-over-Hand Locking` هو نفسه `Fine-Grained Locking` بالضبط، وما فيه فرق.

#### الفهم الصحيح ✅:
`Hand-over-Hand` هو حالة خاصة من `Fine-Grained` — بس **مش** `Two-Phase`: بيفلت قفل قبل ما ياخد كل الأقفال اللي محتاجها (بينما Two-Phase الكلاسيكي بيفصل تماماً بين مرحلة الأخذ ومرحلة التحرير). هالفرق هو بالضبط اللي بيخلّي إثبات صحة `Hand-over-Hand` أصعب.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Fine-grained locking, but not "two-phase" — atomicity doesn't follow from general rule; a bit tricky to prove
> Hold at most two locks at a time — acquire lock for successor before releasing lock for predecessor
> Must we lock the successor of a node we are trying to add? — we don't need to lock to read the key (why not?)
> Must we lock a node we are trying to remove?
> [سلسلة رسومات توضح remove(b) و remove(c) من خيطين مختلفين، وكيف بيمشو hand-over-hand يمسكو ويفلتو الأقفال تدريجياً]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف المفهوم، الأسئلة المفتوحة، وسيناريو remove(b)/remove(c) المصور بسلسلة الشرائح.

</details>

---

### 2.7. مثال متكامل: مقارنة الاستراتيجيات الأربع على نفس السيناريو
<!-- @type: example-for-topics-2.3-to-2.6 -->

#### 📌 السيناريو
تطبيق `List-Based Set` مستخدم كـ "قاعدة بيانات مقاعد" لموقع حجز طيران — فيه آلاف الطلبات بالثانية: 90% منها `contains(seatNumber)` (تأكد المقعد محجوز ولا لأ)، و10% بس `add`/`remove` (حجز فعلي أو إلغاء).

#### 💡 كيف تتفاضل الاستراتيجيات الأربع بنفس السيناريو؟
- **`Coarse-Grained`:** كل طلب — حتى مجرد سؤال "هل المقعد محجوز؟" — لازم يستنى دوره عالقفل الوحيد. بزحمة آلاف الطلبات/ثانية، هاد بيصير عنق زجاجة (bottleneck) واضح.
- **`Read/Write Locking`:** بما إنو 90% من الطلبات قراءة بس (`contains`)، هاي بتاخد `readlock` وتشتغل كلها بنفس الوقت مع بعض — تحسين ضخم بالأداء بدون تعقيد زيادة، وهاد بالضبط سبب الاختيار الأمثل هون.
- **`Fine-Grained Locking`:** لو عندك آلاف المقاعد (عقد كتير)، وأخذ قفل لكل عملية بحد ذاته مكلف (تكلفة الأقفال أكتر من فايدة التزامن)، ممكن يكون هالخيار أبطأ من `Read/Write` بحالتنا لأنو معظم التزاحم مش على نفس المقعد أصلاً.
- **`Hand-over-Hand Locking`:** مفيد أكتر لو كانت العمليات معقدة وطويلة المسار (traversal طويل)، لكن بحالتنا (قراءة بسيطة أغلبية) التعقيد الزائد مش مبرر.

#### ⚠️ لو اخترنا الاستراتيجية الغلط؟
لو استخدمنا `Coarse-Grained` بموقع حجز طيران حقيقي بزحمة عالية، النظام بيصير بطيء جداً وقت الذروة (مثلاً وقت فتح حجز جديد)، رغم إنو أغلب الطلبات كانت مجرد استعلامات بريئة ما بتحتاج حصرية كاملة.

---

## 3. الأمان مقابل الحيوية (Safety vs Liveness)

### 3.1. تعريف `Safety` و`Liveness`
<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "2.7", group: "3.1-3.4"} -->

#### 📍 أين نحن الآن؟
هاي المجموعة الأخيرة (3.1 → 3.4) بتحدد **إطار التقييم** اللي نحكم فيه على أي حل تزامن شفناه بالمحاضرة (سواء Bounded Buffer أو List-Based Set): هل هو "صحيح" فعلاً؟

#### ⬅️ الربط مع السابق
كل الاستراتيجيات اللي شرحناها بالقسم الثاني (Coarse-Grained إلى Hand-over-Hand) بتحتاج معيار واضح نقيس فيه صحتها. بدل ما نحكم "بالحدس"، المحاضرة بتقدم إطار رسمي: `Safety` و`Liveness`.

#### 💡 الفكرة الأساسية
**`Safety` = الكائن ما بينتج نتيجة غلط أبداً (functional correctness). `Liveness` = الشروط اللي تحت اسمها الكائن بيضمن يتقدم فعلاً (completes execution successfully).**

#### 📖 الشرح
لازم نفصل بين هالمفهومين لأنهم بيقيسو حاجتين مختلفتين تماماً:
- **`Safety`:** هل النتيجة النهائية صحيحة منطقياً؟ مثال: `Data Race Freedom` — الكود ما فيه تضارب قراءة/كتابة غير محمي — هي خاصية `Safety` مهمة للبرامج المتوازية (Module 1). بنفس الوقت، `Linearizability` — وهي خاصية بتضمن إنو كل عملية على كائن متزامن بتبدو كأنها صارت لحظياً بترتيب منطقي — هي خاصية `Safety` مهمة للكائنات المتزامنة (Module 2).
- **`Liveness`:** حتى لو الكود "صحيح" منطقياً بكل حالة، هل بيضمن يوصل لنتيجة أصلاً؟ ممكن كود يكون Safe 100% بس يعلّق للأبد (كل الخيوط واقفة تستنى بعض) — هاد مثال على انعدام `Liveness` رغم وجود `Safety`.

💡 **التشبيه:** فكّر بـ `Safety` كأنها "لو السيارة تحركت، رح توديك للمكان الصح" (ما رح توديك لمكان غلط)، أما `Liveness` فهي "السيارة أصلاً رح تتحرك ولا رح تضل واقفة للأبد بنص الطريق".

#### 🎯 الملخص السريع
- `Safety` = صحة النتيجة (functional correctness).
- `Liveness` = ضمان التقدم (progress) بوقت معقول.
- أمثلة `Safety`: `Data Race Freedom`, `Linearizability`.
- كود ممكن يكون `Safe` بس مش `Live` (يعلّق للأبد) — الاثنين مطلوبين مع بعض.

#### 📚 التطبيق
الفقرات الجاية بتفصّل مستويات مختلفة من `Liveness` بالذات (من الأضعف للأقوى)، لأنو `Safety` غالباً أسهل نثبتها (بس التزم بأقفالك صح)، بينما `Liveness` فيها درجات ومستويات لازم نميّز بينها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> In a concurrent setting, we need to specify both the safety and the liveness properties of an object
> Need a way to define — Safety: when an implementation is functionally correct (does not produce a wrong answer) — Liveness: the conditions under which it guarantees progress (completes execution successfully)
> Examples of safety — Data race freedom is a desirable safety property for parallel programs (Module 1) — Linearizability is a desirable safety property for concurrent objects (Module 2)

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل.
- ℹ️ إضافة من الدليل: تشبيه السيارة.

</details>

---

### 3.2. `Liveness` — المستويات المتدرجة

#### 💡 الفكرة الأساسية
**`Liveness` = قدرة البرنامج يتقدم بوقت معقول — وفيها أربع مستويات متدرجة من الضمانات: `Deadlock Freedom`, `Livelock Freedom`, `Starvation Freedom`, و`Bounded Wait`.**
*(هاد تفصيل مباشر لنص فكرة الـ Liveness اللي عرّفناها بالفقرة اللي قبل.)*

---

#### 📖 الشرح
نقطة مهمة أول شي: **التوقف (`termination`/"no infinite loop") مش شرط إلزامي للـ `Liveness`** — فيه تطبيقات مصممة أصلاً تكون غير منتهية (non-terminating)، متل سيرفر بيضل شغال يستقبل طلبات للأبد — وهاد طبيعي وما بيعتبر مشكلة `Liveness`.

المستويات الأربعة (من الأضعف للأقوى):
1. **`Deadlock Freedom`**
2. **`Livelock Freedom`**
3. **`Starvation Freedom`**
4. **`Bounded Wait`**

كل مستوى أقوى من اللي قبله (يعني لو حققت `Bounded Wait`، تلقائياً حققت الثلاثة الباقيين).

#### 🎯 الملخص السريع
- `Liveness` = قدرة التقدم بوقت معقول.
- `Termination` مش شرط لازم للـ `Liveness`.
- 4 مستويات متدرجة: `Deadlock` → `Livelock` → `Starvation` → `Bounded Wait`.

#### 📚 التطبيق
الفقرات الجاية بتشرح كل مستوى بالتفصيل مع مثال كود.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> Liveness = a program's ability to make progress in a timely manner
> Termination ("no infinite loop") is not necessarily a requirement for liveness — some applications are designed to be non-terminating
> Different levels of liveness guarantees (from weaker to stronger) for tasks/threads in a concurrent program: 1. Deadlock freedom 2. Livelock freedom 3. Starvation freedom 4. Bounded wait

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل.

</details>

---

### 3.3. `Deadlock-Free Parallel Program Executions`

#### 💡 الفكرة الأساسية
**تنفيذ متوازي `deadlock-free` معناه ما فيه مهمة (task) بتضل عالقة للأبد وهي مستنية شرط معين ما رح يصير أبداً.**

---

#### 💻 الكود — مثال `Deadlock` كلاسيكي
```java
// Thread T1
public void leftHand() {
    synchronized (obj1) {
        synchronized (obj2) {
            // work with obj1 & obj2
        }
    }
}

// Thread T2
public void leftHand() {
    synchronized (obj2) {
        synchronized (obj1) {
            // work with obj2 & obj1
        }
    }
}
```

#### شرح الكود سطراً بسطر
1. `T1` بياخد `obj1` أول، وبعدين بيحاول ياخد `obj2` وهو لسا ماسك `obj1`.
2. `T2` بياخد `obj2` أول، وبعدين بيحاول ياخد `obj1` وهو لسا ماسك `obj2`.
3. لو الاثنين بلّشو بنفس اللحظة تقريباً: `T1` ماسك `obj1` وبيستنى `obj2`، و`T2` ماسك `obj2` وبيستنى `obj1` — كل وحد مستني حاجة الثاني ماسكها، ومفيش حدا رح يفلت — هاد `deadlock cycle`.

#### 📖 الشرح
المفتاح هون هو **ترتيب أخذ الأقفال المتضارب** بين الخيوط — `T1` بترتيب (obj1, obj2) و`T2` بترتيب (obj2, obj1). هالمثال بيربط مباشرة بموضوع `Fine-Grained Locking` اللي حكينا عنه: لهيك المحاضرة أكدت "typically acquire locks in some predetermined order" — يعني لو الاثنين التزمو بنفس الترتيب (obj1 قبل obj2 دايماً)، الـ Deadlock ما كان صار.

المحاضرة كمان بتذكر إنو فيه إنشاءات برمجية (constructs) تانية ممكن تؤدي لـ Deadlock غير `synchronized`، متل: `async-await` (بمكتبة HJlib)، و`thread join`، وأقفال جافا العادية (`Java locks`).

#### 🎯 الملخص السريع
- `Deadlock` = مهام عالقة للأبد بانتظار متبادل دائري.
- السبب الشائع: ترتيب مختلف لأخذ الأقفال بين الخيوط.
- الحل الشائع: ترتيب موحّد ومحدد مسبقاً لأخذ الأقفال.
- إنشاءات تانية ممكن تسبب Deadlock: `async-await`, `thread join`, `synchronized`, Java locks.

#### 📚 التطبيق
هاد المستوى هو الأضعف بين الأربعة — لازم تحققه أول شي قبل ما تفكر بأي مستوى أعلى من الـ Liveness.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A parallel program execution is deadlock-free if no task's execution remains incomplete due to it being blocked awaiting some condition
> Example of a program with a deadlocking execution [كود T1/T2 مع synchronized(obj1)/synchronized(obj2) بترتيب معكوس]
> In this case, Task1 and Task2 are in a deadlock cycle. — Construct that can lead to deadlock in HJlib: async await — There are many constructs that can lead to deadlock cycles in other programming models (e.g., thread join, synchronized, Java locks)

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل.

</details>

---

### 3.4. `Livelock-Free Parallel Program`

#### 💡 الفكرة الأساسية
**`Livelock` بيصير لما اثنين أو أكتر من المهام بيكررو نفس التفاعل مع بعض بدون ما يتقدمو أبداً — حالة خاصة من عدم الإنهاء (nontermination)، بس الخيوط شغالة (مش متجمدة زي Deadlock).**

---

#### 💻 الكود — مثال `Livelock`
```java
// Task T1
incrToTwo(AtomicInteger ai) {
    // increment ai till it reaches 2
    while (ai.incrementAndGet() < 2);
}

// Task T2
decrToNegTwo(AtomicInteger ai) {
    // decrement ai till it reaches -2
    while (ai.decrementAndGet() > -2);
}
```

#### شرح الكود سطراً بسطر
1. `T1` بيحاول يزيد `ai` لحد ما توصل 2.
2. `T2` بيحاول ينقص `ai` لحد ما توصل -2.
3. لو الاثنين شغالين بنفس الوقت وبتبادل يزيدو/ينقصو نفس القيمة، ممكن تضل `ai` تتذبذب حوالين الصفر للأبد وما توصل أبداً لا 2 ولا -2 — الاثنين "شغالين" (بيعملو عمليات فعلية) بس مافي تقدم حقيقي.

#### 📖 الشرح
الفرق الحاسم بين `Deadlock` و`Livelock`: بـ `Deadlock` الخيوط متوقفة تماماً (بلوكد، مش بتنفذ أي تعليمات)، أما بـ `Livelock` الخيوط **شغالة فعلياً** (بتنفذ تعليمات، بتستهلك CPU)، بس النتيجة الكلية "مافي تقدم" — نفس النمط بيتكرر بدون توصل لهدف.

نقطة مهمة جداً تحذّر منها المحاضرة: **كتير محاولات "حسنة النية" لتفادي الـ Deadlock بتنتج Livelock بدلاً منه.** مثال شائع: خيط بياخد قفل، يحاول ياخد قفل ثاني، ولو فشل بيفلت الأول ويحاول تاني من الصفر — لو خيطين بيعملو نفس النمط بالتزامن، ممكن يفضلو "يتراجعو ويحاولو" للأبد بدون ما ينجح أي وحد.

#### 🎯 الملخص السريع
- `Livelock` = تكرار نفس التفاعل بدون تقدم — حالة خاصة من عدم الإنهاء.
- الفرق عن `Deadlock`: بـ Livelock الخيوط شغالة فعلياً (مش متجمدة).
- محاولات تفادي Deadlock (زي "retry" logic) ممكن تسبب Livelock عن طريق الخطأ.

#### 📚 التطبيق
`Livelock Freedom` أقوى من `Deadlock Freedom` — لو نظامك خالي من Livelock، هو تلقائياً خالي من Deadlock (لأنو Deadlock هو حالة "لا حركة إطلاقاً"، وLivelock بيمنع حتى "الحركة الفارغة").

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كتير طلاب بيخلطو بين `Deadlock` و`Livelock` لأنهم الاثنين "البرنامج ما بيوصل لنتيجة أبداً"، فبيحسبوهم نفس المشكلة بس بأسماء مختلفة.

#### الفهم الصحيح ✅:
الفرق الحاسم: بـ `Deadlock` الخيوط **متوقفة تماماً** (بلوكد، صفر تنفيذ تعليمات)، بينما بـ `Livelock` الخيوط **شغالة وبتنفذ تعليمات فعلياً** لكن بنمط متكرر بلا فايدة. السؤال الفاصل: هل الخيوط واقفة تماماً بدون أي تنفيذ، أو شغالة بس بلا تقدم حقيقي؟

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A parallel program execution exhibits livelock if two or more tasks repeat the same interactions without making any progress (special case of nontermination)
> Livelock example: [كود incrToTwo و decrToNegTwo بـ AtomicInteger]
> Many well-intended approaches to avoid deadlock result in livelock instead

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل.

</details>

---

### 3.5. `Starvation-Free Parallel Program Executions` و`Bounded Wait`

#### 💡 الفكرة الأساسية
**`Starvation Freedom` تضمن إنو مافي مهمة "محرومة" من التقدم للأبد، و`Bounded Wait` هي الشرط الأقوى: كل مهمة بتستنى عدد محدود بس من المهام التانية تاخد دورها قبلها.**

---

#### 📖 الشرح
**`Starvation`:** بتصير لما مهمة معينة بتُحرم بشكل متكرر من فرصة التقدم — حتى لو النظام ككل مش بـ Deadlock أو Livelock. `Starvation-Freedom` بتُعرف أحياناً باسم "`lock-out freedom`".

نقطة مثيرة للاهتمام بمكتبة HJ (Habanero-Java): بما إنو كل المهام بنفس البرنامج مفروض تكون "متعاونة" (`cooperating`) مش "متنافسة" (`competing`)، `Starvation` نظرياً ممكنة الصورة — بس المحاضرة بتوضح نقطة منطقية عميقة: **لو صار Starvation ببرنامج HJ خالي من Deadlock، فالبرنامج التسلسلي "المكافئ" له لازم يكون non-terminating (حلقة لا نهائية)** — يعني لو أنت متأكد إنو نسختك التسلسلية بتنتهي (تخلص) بشكل طبيعي، ما لازم يصير Starvation بالنسخة المتوازية الصحيحة منها.

**`Bounded Wait`:** الشرط الأقوى من الأربعة — كل مهمة بتطلب مورد (resource) لازم تستنى **عدد محدود** بس (bound) من المهام التانية "تفوت قدامها" (cut in line) وتاخد المورد قبلها، بعد ما تسجّل طلبها.

- لو الـ `bound = 0`، معناها التنفيذ **عادل تماماً** (`fair`) — أول واحد يطلب، أول واحد ياخد، بدون أي "تفويت دور" إطلاقاً.

#### 🎯 الملخص السريع
- `Starvation` = مهمة محرومة بشكل متكرر من التقدم رغم إنو النظام ككل مش عالق.
- `Starvation-Freedom` = `lock-out freedom`.
- بـ HJ: Starvation ببرنامج deadlock-free معناه النسخة التسلسلية المكافئة رح تكون non-terminating.
- `Bounded Wait` = أقوى الضمانات: عدد محدود من "التفويت" لكل طلب.
- `bound = 0` = عدالة كاملة (`fair`).

#### 📚 التطبيق
هالتدرج بالضمانات (`Deadlock → Livelock → Starvation → Bounded Wait`) هو المعيار اللي بترجع تحكم فيه على أي حل تزامن شفناه بالمحاضرة كلها — من `Bounded Buffer` لغاية `List-Based Set` بأي استراتيجية أقفال.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

> A parallel program execution exhibits starvation if some task is repeatedly denied the opportunity to make progress — Starvation-freedom is sometimes referred to as "lock-out freedom" — Starvation is possible in HJ programs, since all tasks in the same program are assumed to be cooperating, rather than competing — If starvation occurs in a deadlock-free HJ program, the "equivalent" sequential program must be non-terminating (infinite loop)
> A parallel program execution exhibits bounded wait if each task requesting a resource should only have to wait for a bounded number of other tasks to "cut in line" i.e., to gain access to the resource after its request has been registered. — If bound = 0, then the program execution is fair

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل.

</details>

---

# الجزء الثاني (تكملة): الملخص الشامل — قراءة بديلة كاملة

خلّينا نرجع لنقطة البداية ونحكيها بأسلوب تاني تماماً، من غير ما نتقيّد بترتيب العناوين — بس كل الأفكار الأساسية هون، بس مربوطة ببعض بخيط قصة واحد.

هون الحكاية بتبلّش من مشكلة بسيطة: `synchronized` عطانا قفل، وعطانا `wait()`/`notify()` نتحكم فيهم كيف الخيوط بتستنى وبتصحى. بس فيه إشكالية: كل خيوط مستنية على نفس القفل بترجع لنفس "غرفة الانتظار" الوحيدة. لو عندك مثلاً `Bounded Buffer` — منتج بحط أشياء ومستهلك ياخدها — المنتج بده يستنى لما "يصير فاضي"، والمستهلك بده يستنى لما "يصير ممتلئ". هاد سببين مختلفين تماماً للانتظار، وبـ `synchronized` كنت مضطر تصحّي الكل (`notifyAll`) وتخليهم يتزاحمو ليعرفو مين فعلاً استاهل الصحوة — أداء ضعيف وتصميم مو أنيق.

هون بيجي الحل: `Condition` objects. فكّرها متل غرف انتظار متعددة مرتبطة بنفس القفل — بدل غرفة وحدة. بتاخد `ReentrantLock`، وبتنشئ منه `Condition`ين مثلاً (`full` و`empty`)، وكل وحدة عندها `await()`/`signal()`/`signalAll()` خاصين فيها. بـ `Bounded Buffer`، المنتج بيستنى `full.await()` لما تمتلئ، وبعد ما يحط عنصر بيصحّي `empty.signal()` — بالضبط الخيط الصح المهتم بالحالة الصح. المستهلك بالعكس تماماً. النقطة المهمة اللي لازم تنتبهلها هون: استخدام `while` مش `if` مع `await()`، لأنو حتى بعد ما تصحى، الشرط ممكن يرجع يصير صحيح قبل ما ياخد دوره (منافسة مع خيوط تانية) — فلازم تتأكد من جديد.

بعد ما فهمنا أداة التنسيق هاي (Condition)، المحاضرة أخدتنا لمثال أوسع: `List-Based Set` — مجموعة أعداد مبنية على قائمة مرتبطة مرتبة. أول شي شفنا نسختها التسلسلية (بدون أي تزامن) — بسيطة: مؤشرين `pred` و`curr` بيتقدمو بالقائمة لحد ما يلاقو المكان الصح، وبعدين تعديل الروابط. المشكلة بتبان لما تشغّل هاي الخوارزمية بأكتر من خيط بدون حماية: تخيل خيطين بيحذفو قيمتين متجاورتين بنفس الوقت — كل وحد بنى مساره اعتماداً على نسخة "قديمة" من القائمة، والنتيجة ممكن تضيع عملية كاملة أو حتى تنكسر سلسلة الروابط بالكامل.

فكيف نصلحها؟ المحاضرة قدّمت أربع طرق، من الأبسط للأدق. أول واحدة `Coarse-Grained Mutual Exclusion` — قفل واحد يغطي الكائن كله، كل عملية لازم تاخده. بسيط، سهل تثبته، وحتى deadlock-free بطبيعته (مفيش أكتر من قفل واحد، فمفيش انتظار دائري ممكن يصير). العيب الوحيد إنو تحت زحمة عالية الأداء ضعيف جداً — كل الخيوط بتصطف عالقفل الواحد. بس المحاضرة بتحذّرك: لا تستهين بالبساطة، لكتير تطبيقات هاد أفضل حل عملياً.

الخطوة الجاية كانت `Read/Write Locking`: بدل قفل واحد يمنع الكل، نوعين من القفل — `readlock` يسمح لأكتر من قارئ بنفس الوقت، و`writelock` حصري بالكامل. النقطة الذهبية هون: `contains()` بالـ List-Based Set ما بتعدّل شي، فمرشحة مثالية تاخد `readlock` بس — لو أغلب عملياتك قراءة (زي مثال حجز الطيران اللي معظم طلباته "هل المقعد محجوز؟")، هاد بيعطيك تحسين أداء ضخم. بس فيه إشكالية: الكتّاب ممكن "يتضوّروا" (starve) لو فيه قراءة مستمرة، والحل المقترح كان "waiting bit" يمنع قرّاء جدد لو فيه كاتب مستني.

بعدها انتقلنا لـ `Fine-Grained Locking`: قفل منفصل لكل قطعة صغيرة من البيانات — كل عقدة بالقائمة مثلاً. الميزة: أجزاء منفصلة من البيانات ممكن تتعدّل بنفس الوقت فعلياً. الطريقة السهلة تثبت صحة هاد النمط هي "Two-Phase Locking": خذ كل الأقفال أول (Acquire phase)، وبعدين حرر كل شي آخر العملية (Release phase) — بدون ما تاخد قفل جديد بعد ما تبلّش تحرر. المشاكل: التكلفة (أخذ أكتر من قفل مكلف)، وخطر الـ Deadlock (لازم ترتيب ثابت لأخذ الأقفال). كمان فيه نقطة دقيقة: لو طبّقت Two-Phase بسذاجة، أحياناً بتفقد فايدة التزامن أصلاً — لأنك لسا بتاخد كل الأقفال قبل ما تبلّش، فمافي فايدة حقيقية.

الحل الأدق كان `Hand-over-Hand Locking`: نفس فكرة Fine-Grained، بس **مش** Two-Phase — تمسك قفل العقدة الجاية قبل ما تفلت قفل العقدة الحالية، بحد أقصى قفلين بنفس الوقت. زي شخص طالع درج ماسك درابزين، ما بيفلت الحالي إلا لما يمسك الجاي. هاد بيضمن إنو مفيش "فجوة" بلا حماية بينما بتمشي عالقائمة. المشكلة: إثبات الصحة أصعب من Two-Phase العادي، لأنو النمط مختلف. وفيه أسئلة تصميم مفتوحة: هل لازم قفل successor بس للقراءة؟ (الجواب: لأ، قراءة المفتاح آمنة بدون قفل). هل لازم قفل العقدة المحذوفة؟ (سؤال مفتوح بيعتمد على التصميم).

آخر جزء بالمحاضرة كان إطار كامل نحكم فيه على صحة أي حل تزامن شفناه: `Safety` مقابل `Liveness`. `Safety` بتسأل: هل النتيجة صحيحة منطقياً دايماً؟ زي `Data Race Freedom` (للبرامج المتوازية) و`Linearizability` (للكائنات المتزامنة). `Liveness` بتسأل سؤال مختلف تماماً: هل البرنامج بيضمن يتقدم أصلاً بوقت معقول؟ مهم تفهم إنو `Termination` مش شرط للـ Liveness — فيه برامج مصممة عمداً تكون non-terminating (سيرفرات مثلاً)، وهاد طبيعي.

الـ Liveness نفسها فيها أربع مستويات متدرجة، من الأضعف للأقوى. `Deadlock Freedom` — أضعف مستوى — بتضمن مافي مهمة عالقة للأبد بانتظار متبادل دائري (زي مثال `synchronized(obj1)`/`synchronized(obj2)` بترتيب معكوس بخيطين مختلفين). `Livelock Freedom` — أقوى شوي — بتضمن مافي تكرار لا نهائي لنفس التفاعل بدون تقدم؛ والفرق الحاسم عن Deadlock: بـ Livelock الخيوط شغالة فعلياً (بتنفذ تعليمات)، بس بلا فايدة — زي مثال `incrToTwo`/`decrToNegTwo` اللي بتتذبذب حوالين الصفر للأبد. ونقطة خطيرة: كتير محاولات حسنة النية لتفادي Deadlock بتنتج Livelock بدلها عن طريق الخطأ (retry logic ساذج مثلاً).

بعدها `Starvation Freedom` — أقوى كمان — بتضمن مافي مهمة محرومة بشكل متكرر من التقدم، حتى لو النظام ككل مش عالق. وبنظام HJ تحديداً، لو صار Starvation ببرنامج deadlock-free، فالنسخة التسلسلية المكافئة له لازم تكون non-terminating — يعني لو النسخة التسلسلية بتخلص طبيعياً، النسخة المتوازية الصحيحة ما لازم يصير فيها Starvation. وأخيراً `Bounded Wait` — أقوى الأربعة — كل مهمة بتطلب مورد بتستنى عدد محدود بس من المهام التانية "تفوت قدامها"؛ ولو الـ bound = صفر، معناها التنفيذ عادل تماماً (fair) بدون أي تفويت دور إطلاقاً.

**إيش بيطلع بالامتحان؟** الأستاذ عادة بيركز على: الفرق العملي بين الاستراتيجيات الأربع (خصوصاً امتى تختار وحدة عن التانية، ومقارنة Fine-Grained vs Hand-over-Hand)، تتبع تنفيذ Bounded Buffer خطوة بخطوة، والفرق الدقيق بين Deadlock/Livelock/Starvation (أسئلة "أي سيناريو يمثل شو" شائعة جداً)، وحساب أو تحليل كود فيه `synchronized` متضارب الترتيب لتحديد إمكانية Deadlock.

**الربط مع المحاضرة الجاية:** بعد ما تعلّمنا الطرق اليدوية (خصوصاً Hand-over-Hand) وحدّدنا معايير الصحة (Safety/Liveness)، المحاضرة الجاية غالباً رح تاخدنا لتقنيات أذكى بأداء أعلى — زي `Optimistic Locking` و`Lazy Synchronization`، اللي بتحاول تقلل عدد الأقفال المستخدمة أصلاً عن طريق البحث أول بدون قفل، وبعدين التأكد إنو المسار لسا صحيح قبل ما تعدّل.

---

# الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium)
**السؤال:** ما الفرق الأساسي بين `synchronized` و`Condition` من ناحية عدد قوائم الانتظار (`waiting-sets`)؟

أ) `synchronized` بيدعم عدة `waiting-sets` بينما `Condition` بيدعم وحدة بس

ب) الاثنين بيدعمو `waiting-set` واحدة فقط لكل قفل

ج) `synchronized` بيعطيك `waiting-set` واحدة لكل قفل، بينما `Condition` بيسمحلك تعمل أكتر من `waiting-set` مستقلة على نفس القفل

د) `Condition` بيلغي الحاجة للقفل نهائياً

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): هاد عكس الصحيح تماماً — `synchronized` هو المحدود بغرفة انتظار واحدة.
- ❌ ب): لو كان هيك، ما كنا نحتاج `Condition` objects من الأساس.
- ✅ ج): بالضبط الفكرة اللي بررت وجود `Condition` — تقدر تنشئ عدة `Condition` (`lock.newCondition()`) من نفس القفل، كل وحدة عندها قائمة انتظار مستقلة.
- ❌ د): `Condition` لازم يُستخدم دايماً وانت ماسك القفل، مش بديل عنه.

---

### السؤال 2 (medium)
**السؤال:** بالكود التالي لـ `put()` بـ `Bounded Buffer`:
```java
public void put(Object x) throws InterruptedException {
    lock.lock();
    try {
        while (count == items.length) full.await();
        items[putptr] = x;
        if (++putptr == items.length) putptr = 0;
        ++count;
        empty.signal();
    } finally {
        lock.unlock();
    }
}
```
ليش استُخدم `while` بدل `if` مع `full.await()`؟

أ) لأنو `while` أسرع من `if` بجافا

ب) عشان نتأكد من الشرط من جديد بعد الصحوة، لاحتمال إنو خيط تاني أخذ المكان الفاضي قبلنا

ج) `if` غير مدعومة أصلاً مع `Condition`

د) عشان نضمن `putptr` يرجع للصفر

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): لا علاقة بالأداء هون، الموضوع منطقي بحت.
- ✅ ب): بعد ما الخيط ياخد إشارة `signal()`، ما فيه ضمان إنو الشرط لسا صحيح — خيط تاني ممكن يكون سبقه واستغل الفرصة، فلازم `while` يتحقق من جديد قبل ما يكمل.
- ❌ ج): `Condition` بتشتغل مع أي بنية تحكم، `while` هو الاختيار الصحيح منطقياً بس.
- ❌ د): `putptr` بترجع للصفر بسطر منفصل (`if (++putptr == items.length) putptr = 0;`) مش له علاقة بـ `while`/`if` مع `await()`.

---

### السؤال 3 (medium)
**السؤال:** بخوارزمية `List-Based Set` التسلسلية، شو الغرض من استخدام مؤشرين `pred` و`curr` معاً؟

أ) عشان نسرّع البحث بطريقة `binary search`

ب) عشان نعرف العقدة السابقة (`pred`) لنقدر نعدّل رابط `next` عند الإضافة أو الحذف

ج) عشان نتجنب استخدام حلقة `while`

د) `pred` و`curr` مطلوبين فقط بعملية `contains`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): القائمة المرتبطة ما بتدعم `binary search` أصلاً (لا وصول عشوائي).
- ✅ ب): بدون معرفة `pred`، ما بتقدر تعدّل `pred.next` عند الإضافة أو الحذف — لازم تعرف مين قبل مكان التعديل.
- ❌ ج): `while` لسا مستخدمة للبحث بكل الحالات.
- ❌ د): `contains` بتستخدم `curr` بس (بدون `pred`) لأنها ما بتعدّل شي.

---

### السؤال 4 (hard)
**السؤال:** أي من التالي يفسّر بدقة ليش تشغيل `remove(4)` و`remove(9)` بنفس الوقت من خيطين مختلفين بدون حماية ممكن يؤدي لمشكلة بقائمة `1 → 4 → 9`؟

أ) لأنو `remove` غير موجودة أصلاً بالنسخة التسلسلية

ب) لأنو الخيط الثاني بيبني مساره اعتماداً على قراءة قديمة (`stale`) للقائمة، فتعديله ممكن "يضيع" أو يكسر السلسلة

ج) لأنو `-∞` و`∞` بيسببو `Exception` عند الحذف المتزامن

د) لأنو القائمة المرتبطة لا تدعم `remove` إطلاقاً

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `remove` موجودة بكلا النسختين، المشكلة مش بوجودها.
- ✅ ب): الخيط اللي بده يحذف `9` بنى `pred=4` اعتماداً على إنو `4` لسا موصولة بالقائمة — لو الخيط التاني حذف `4` أول، تعديل الخيط الثاني (`4.next = ∞`) بيصير على عقدة مش جزء من القائمة الفعلية، فالتعديل بيضيع.
- ❌ ج): مفيش `Exception` بهالسيناريو — المشكلة منطقية (نتيجة غلط) مش تعطل بالبرنامج.
- ❌ د): القائمة المرتبطة بتدعم `remove` تماماً، المشكلة فقط عند غياب الحماية بالتزامن.

---

### السؤال 5 (medium)
**السؤال:** بأي حالة يكون `Coarse-Grained Mutual Exclusion` "الحل الأفضل عملياً" حسب المحاضرة؟

أ) لما التزاحم (`contention`) بين الخيوط منخفض

ب) لما عدد العقد بالقائمة كبير جداً

ج) لما تحتاج ضمان `Bounded Wait` مباشرة

د) لما `contains` هي العملية النادرة فقط

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): المحاضرة أكدت صراحة إنو لكتير تطبيقات بزحمة منخفضة، هاد أفضل حل عملياً بسبب بساطته.
- ❌ ب): عدد العقد مش المعيار المباشر — المعيار هو مستوى التزاحم بين الخيوط.
- ❌ ج): `Coarse-Grained` بحد ذاته ما بيضمن `Bounded Wait` تلقائياً (يعتمد على نوع القفل المستخدم، زي queue locks).
- ❌ د): العكس هو الصحيح — لو `contains` هي الأكثر شيوعاً، `Read/Write Locking` هو الخيار الأفضل.

---

### السؤال 6 (hard)
**السؤال:** أي من التالي يصف بدقة إشكالية `starvation` بـ `Read/Write Locking`، والحل المقترح بالمحاضرة؟

أ) القرّاء بيتضوّرو لو فيه كتابة مستمرة — الحل: منع كل قراءة نهائياً

ب) الكتّاب ممكن يتضوّروا لو فيه قراءة مستمرة — الحل المقترح: "waiting bit" يمنع قرّاء جدد لو فيه كاتب مستني

ج) مفيش أي إشكالية starvation بـ Read/Write locks أصلاً

د) الكتّاب بيتضوّرو بس لو عدد الخيوط أكتر من 10

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): العكس هو الصحيح — المحاضرة ذكرت إنو الكتّاب هم اللي معرّضين للـ starvation، مش القرّاء.
- ✅ ب): بما إنو `readlock` بيسمح لأكتر من قارئ بنفس الوقت، لو فيه تدفق مستمر من القرّاء، الكاتب ممكن يفضل مستني للأبد — والحل المقترح هو "waiting bit" يمنع قرّاء جدد لو فيه كاتب بالطابور.
- ❌ ج): الإشكالية مذكورة صراحة بالمحاضرة.
- ❌ د): مفيش رقم محدد مذكور بالمحاضرة، الإشكالية بنيوية مش مرتبطة بعدد معين من الخيوط.

---

### السؤال 7 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
// Thread A                          // Thread B
public void leftHand() {              public void leftHand() {
  synchronized (obj1) {                 synchronized (obj2) {
    synchronized (obj2) {                 synchronized (obj1) {
      // work                              // work
    }                                    }
  }                                    }
}                                    }
```
لو الخيطين نفّذو بنفس الوقت تقريباً، أي من التالي يصف السلوك المحتمل؟

أ) دايماً بينفذو بدون أي مشكلة لأنو `synchronized` بيرتب الأولوية تلقائياً

ب) ممكن يصير `Deadlock` — كل خيط ماسك قفل والتاني مستنيه بترتيب معكوس

ج) هيك كود ممنوع يتصرّف بجافا وبيرمي `Exception` عند الترجمة

د) بيصير `Livelock` حتماً لأنو الاثنين شغالين بنفس الوقت

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `synchronized` ما بيرتب أولوية أخذ الأقفال بين خيوط مختلفة — الترتيب مسؤولية المبرمج.
- ✅ ب): `Thread A` ممكن ياخد `obj1` وينتظر `obj2`، بينما `Thread B` ياخد `obj2` وينتظر `obj1` بنفس اللحظة — انتظار متبادل دائري كلاسيكي، بالضبط مثال الـ Deadlock بالمحاضرة.
- ❌ ج): الكود صحيح نحوياً (syntactically) بجافا، المشكلة سلوكية وقت التشغيل فقط.
- ❌ د): مش حتمي — يعتمد على توقيت التنفيذ الفعلي، وحتى لو صار تعارض، هاد نمط `Deadlock` (توقف كامل) مش `Livelock` (تكرار حركة).

---

### السؤال 8 (medium)
**السؤال:** أي من التالي يصف الفرق الجوهري بين `Fine-Grained Locking` (بنمط `Two-Phase`) و`Hand-over-Hand Locking`؟

أ) لا فرق، هما نفس المفهوم بالضبط

ب) `Hand-over-Hand` بياخد كل الأقفال أول ويحررهم آخر العملية، بينما `Two-Phase` بيفلت قفل قبل ما ياخد التالي

ج) `Two-Phase` بيفصل بين مرحلة أخذ الأقفال كلها ثم تحريرها كلها، بينما `Hand-over-Hand` بيمسك قفل التالي قبل ما يفلت قفل الحالي (بحد أقصى قفلين)

د) `Hand-over-Hand` لا يستخدم أقفال إطلاقاً

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): الاثنين نوعين مختلفين من `Fine-Grained Locking`، بنمط مختلف تماماً.
- ❌ ب): هاد عكس الوصف الصحيح تماماً.
- ✅ ج): بالضبط الفرق اللي شرحته المحاضرة — `Two-Phase` = Acquire كامل ثم Release كامل، `Hand-over-Hand` = مسك التالي قبل فلت الحالي، بحد أقصى قفلين بنفس اللحظة.
- ❌ د): `Hand-over-Hand` هو أصلاً تقنية أقفال — بس بنمط دقيق جداً.

---

### السؤال 9 (hard) — سيناريو كود
**السؤال:** بالكود التالي:
```java
int counter = 0;
// Thread A                    // Thread B
counter++;                     counter++;
```
إذا نفّذ الخيطان بنفس الوقت بدون `synchronized` أو أي قفل، أي من التالي يصف سلوك الكود تحديداً؟

أ) الكود سيتوقف بالكامل (`Deadlock`)

ب) قد تُفقد إحدى عمليتي الزيادة بسبب `Race Condition`، لأنو `counter++` ليست عملية ذرية واحدة

ج) النتيجة ستكون دائماً صحيحة لأن `counter++` عملية واحدة بجافا

د) سيرمي الكود استثناءً (`Exception`) عند التنفيذ

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): مفيش انتظار متبادل هون، الخيوط بتكمل تنفيذ عادي — هاد مش `Deadlock`.
- ✅ ب): `counter++` مو عملية ذرية (read-modify-write) — لو الخيطين قرأو نفس القيمة قبل ما أي وحد يكتب، بتنضاع زيادة وحدة (النتيجة النهائية 1 بدل 2).
- ❌ ج): هاد بالضبط الفهم الخاطئ الشائع — `counter++` بتترجم لثلاث عمليات منفصلة (قراءة، زيادة، كتابة) على مستوى الـ bytecode.
- ❌ د): ما في استثناء، بس النتيجة غلط منطقياً.

---

### السؤال 10 (hard) — حسابي
**السؤال:** نظام يحتاج معالجة طوابير حجز، وعندك `Bounded Buffer` بسعة 100 عنصر. لو الـ `Buffer` ممتلئ حالياً (`count = 100`)، وخيط منتج استدعى `put()`، بعدها استدعى 3 خيوط مستهلكين `take()` بالتتالي، شو أقرب وصف لعدد المرات اللي رح تُستدعى فيها `empty.signal()` نتيجة عمليات `take()` هاي فقط؟

أ) 0 مرات

ب) 1 مرة فقط

ج) 3 مرات، مرة لكل استدعاء `take()` ناجح

د) لا يمكن تحديدها إطلاقاً

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): كل استدعاء `take()` ناجح (بعد ما يتأكد `count > 0`) بينتهي بـ `full.signal()`، بس السؤال هون عن `empty.signal()` اللي منطقياً موجودة بـ `put()` — بما إنو السؤال بيسأل عن أثر 3 استدعاءات `take()` منفصلة وناجحة، كل وحدة منها بتُنقص `count` وتستدعي `full.signal()` بنهايتها (مو `empty.signal()` — دقّق بالكود: `take()` بتستدعي `full.signal()`، و`put()` بتستدعي `empty.signal()`).
- ✅ ج): بما إنو كل `take()` بتنفذ `full.signal()` مرة وحدة بنهايتها بعد نجاح العملية (شرط `count > 0` كان محقق)، فـ 3 استدعاءات `take()` ناجحة رح تنتج 3 استدعاءات لـ `full.signal()`.
- ❌ ب): هاد بيصير لو كان فيه استدعاء `put()` واحد بس، مش 3 استدعاءات `take()`.
- ❌ د): يمكن تحديدها بدقة من تتبع الكود مباشرة — كل `take()` ناجحة = استدعاء واحد لـ `signal()`.

---

### السؤال 11 (hard) — حسابي (Amdahl's Law)
**السؤال:** برنامج عنده جزء تسلسلي (`serial fraction`) نسبته `0.2` (20%)، والباقي قابل للتوازي بالكامل. لو شغّلناه على `P = 10` معالجات، شو أقرب قيمة لـ `Speedup` حسب `Amdahl's Law`؟

أ) 3.3

ب) 5

ج) 8

د) 10

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): `Speedup(P) = 1 / ((1 - parallel_fraction) + parallel_fraction/P)` = `1 / (0.2 + 0.8/10)` = `1 / (0.2 + 0.08)` = `1 / 0.28` ≈ **3.57**، أقرب خيار متاح هو 3.3.
- ❌ ب): 5 كان بيطلع لو الجزء التسلسلي كان 0.1 بس مع نفس عدد المعالجات تقريباً — خطأ بافتراض نسبة تسلسلية مختلفة.
- ❌ ج): 8 قريب من `P` نفسها تقريباً، بيتجاهل تماماً أثر الجزء التسلسلي (0.2) — خطأ شائع بنسيان قيد Amdahl.
- ❌ د): 10 يعني تسريع مثالي (Speedup = P) وهاد فقط ممكن لو الجزء التسلسلي = 0 تماماً — غير واقعي هون.

---

### السؤال 12 (medium)
**السؤال:** أي من التالي يصف بدقة الفرق الحاسم بين `Deadlock` و`Livelock`؟

أ) `Deadlock` يصير فقط بالأنظمة الموزعة (`distributed systems`)، و`Livelock` بالأنظمة المحلية فقط

ب) بـ `Deadlock` الخيوط متوقفة تماماً (بلوكد)، بينما بـ `Livelock` الخيوط شغالة فعلياً بس بتكرر نفس النمط بدون تقدم

ج) `Livelock` هو نفسه `Deadlock` بس بمصطلح مختلف

د) `Deadlock` بيصير فقط مع `Semaphores`

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): كلا المفهومين ممكن يصيرو بأي نظام متزامن، محلي أو موزع.
- ✅ ب): هاد الفرق الجوهري — الخيوط بـ Deadlock واقفة تماماً (صفر تنفيذ)، بينما بـ Livelock بتنفذ تعليمات فعلياً بس بلا فايدة حقيقية.
- ❌ ج): فيه فرق جوهري بالسلوك زي ما تم توضيحه.
- ❌ د): `Deadlock` ممكن يصير مع أي أداة تزامن (locks, synchronized, semaphores، إلخ).

---

### السؤال 13 (medium)
**السؤال:** أي من التالي يصف `Bounded Wait` بشكل صحيح؟

أ) هو نفسه `Deadlock Freedom` بالضبط، بدون أي إضافة

ب) هو أضعف ضمانات الـ `Liveness` الأربعة

ج) هو أقوى ضمانات الـ `Liveness` الأربعة — كل مهمة بتستنى عدد محدود بس من المهام اللي بتفوت قدامها

د) لا علاقة له بـ `fairness` إطلاقاً

**الإجابة الصحيحة:** ج

**التعليل الكامل:**
- ❌ أ): `Bounded Wait` أقوى من `Deadlock Freedom` بمراحل — بيتضمنه بس بيضيف عليه قيد كمّي دقيق.
- ❌ ب): `Deadlock Freedom` هو الأضعف من الأربعة، مش `Bounded Wait`.
- ✅ ج): بالترتيب التصاعدي بالمحاضرة (Deadlock → Livelock → Starvation → Bounded Wait)، `Bounded Wait` هو أقوى مستوى، وبيحدد عدد محدود (bound) من المهام اللي ممكن "تفوت قدامك".
- ❌ د): مرتبط مباشرة — لو `bound = 0`، التنفيذ يكون `fair` تماماً (عادل بالكامل).

---

### السؤال 14 (medium) — سيناريو كود
**السؤال:** بمثال `List-Based Set`، أي من التالي صحيح حول عملية `contains(x)` من ناحية إدارة الأقفال (بنمط `Read/Write Locking`)؟

أ) `contains(x)` لازم تاخد `writelock` دايماً لأنها بتلمس بيانات القائمة

ب) `contains(x)` مرشحة مثالية تاخد `readlock` بس، لأنها لا تعدّل بنية القائمة إطلاقاً

ج) `contains(x)` لا تحتاج أي قفل إطلاقاً لأنها للقراءة فقط

د) `contains(x)` يجب أن تُستدعى بدون قفل ثم تعيد المحاولة لو فشلت

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): `writelock` حصري ومكلف، واستخدامه لعملية ما بتعدّل شي بيلغي فايدة `Read/Write Locking` بالكامل.
- ✅ ب): بما إنو `contains()` "no change to S" (زي ما وصفت المحاضرة بالنسخة التسلسلية)، `readlock` كافي تماماً، وبيسمح لأكتر من `contains()` بنفس الوقت.
- ❌ ج): لسا محتاجة `readlock` لضمان إنك ما بتقرأ بيانات نصف-معدّلة (نصف كتابة شغالة بنفس اللحظة من كاتب تاني).
- ❌ د): هاد وصف لتقنية `Optimistic Locking` (موضوع محاضرة لاحقة)، مش الطريقة المشروحة بهالمحاضرة تحديداً.

---

### السؤال 15 (hard) — حسابي
**السؤال:** برنامج عنده `Work = 24` (مجموع وقت تنفيذ كل العمليات تسلسلياً) و`Span (CPL) = 6` (أطول مسار حرج). إذا شغّلناه على `P = 4` معالجات، شو أقصى `Speedup` نظري ممكن الوصول له حسب العلاقة `Speedup(P) ≤ min(P, Work/Span)`؟

أ) 4

ب) 6

ج) 24

د) 1.5

**الإجابة الصحيحة:** أ

**التعليل الكامل:**
- ✅ أ): `Work/Span = 24/6 = 4`، و`min(P, Work/Span) = min(4, 4) = 4` — يعني أقصى تسريع نظري ممكن هو 4، بالضبط يساوي عدد المعالجات بهالحالة (لأنو `Work/Span` طلعت مساوية لـ `P` بالضبط).
- ❌ ب): 6 هي قيمة `Span` نفسها (أو `Work/Span` لو استخدمنا P أكبر)، مش الـ Speedup الفعلي المقيّد بعدد المعالجات المتاحة (4).
- ❌ ج): 24 هي قيمة `Work` نفسها — هاد خطأ شائع بافتراض إنو التوازي الكامل ممكن دايماً بغض النظر عن `Span` وعدد المعالجات.
- ❌ د): 1.5 قيمة أقل بكثير من الحد الأدنى المنطقي المتاح هون.

---

### السؤال 16 (medium)
**السؤال:** أي من التالي يصف بدقة استخدام `Barriers` لتحقيق `Point-to-Point Synchronization` مقارنة بـ `Mutual Exclusion` العادية؟

أ) `Mutual Exclusion` بتضمن كل الخيوط توصل لنفس النقطة قبل ما تكمل، بينما `Barriers` بتحمي وصول واحد بس بمنطقة حرجة

ب) `Barriers` بتُستخدم لتنسيق نقطة توقف مشتركة بين خيوط متعددة، بينما `Mutual Exclusion` بتحمي منطقة حرجة من دخول أكتر من خيط بنفس الوقت — مفهومان مختلفان يخدمان أغراض مختلفة

ج) الاثنان نفس المفهوم بأسماء مختلفة

د) `Barriers` بديل كامل عن `Mutual Exclusion` بكل الحالات

**الإجابة الصحيحة:** ب

**التعليل الكامل:**
- ❌ أ): هاد عكس الوصف الصحيح — `Barrier` هي اللي بتنسق نقطة تجمّع، مش `Mutual Exclusion`.
- ✅ ب): `Mutual Exclusion` (زي الأقفال اللي شرحناها بالمحاضرة) هدفها حماية بيانات مشتركة من تعديل متزامن غير آمن، بينما `Barrier` هدفها التأكد إنو كل الخيوط "لحقت" لنقطة معينة قبل ما أي وحد يكمل — مفهومان مكمّلان لبعض بس مختلفان بالغرض.
- ❌ ج): لكل مفهوم استخدام مختلف تماماً بالتصميم المتزامن.
- ❌ د): كل واحد بيحل مشكلة مختلفة، مش بديل عن التاني.

---

# الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)
```java
public void put(Object x) throws InterruptedException {
    lock.lock();
    try {
        if (count == items.length) full.await();  // خطأ هون
        items[putptr] = x;
        if (++putptr == items.length) putptr = 0;
        ++count;
        empty.signal();
    } finally {
        lock.unlock();
    }
}
```
**الخطأ:** استُخدم `if` بدل `while` مع `full.await()`. بعد الصحوة، الخيط بيكمل تنفيذ مباشرة بدون ما يتأكد من جديد إنو الشرط (`count == items.length`) لسا صحيح أو لأ — لو خيط تاني سبقه وملأ الـ Buffer من جديد، بيصير كتابة فوق بيانات بمكان غلط.

**التصحيح:** استبدل `if` بـ `while (count == items.length) full.await();` عشان يتأكد من الشرط من جديد كل مرة يصحى.

---

### سؤال تصحيح 2 (misconception)
```java
public Object take() throws InterruptedException {
    lock.lock();
    while (count == 0) empty.await();
    Object x = items[takeptr];
    if (++takeptr == items.length) takeptr = 0;
    --count;
    full.signal();
    return x;
    lock.unlock();  // خطأ هون
}
```
**الخطأ:** `lock.unlock()` موجودة بعد `return x;` مباشرة بدون `try/finally` — هاد سطر ميت (dead code) لأنو ما رح يُنفّذ أبداً بعد `return`. كمان لو صار `Exception` بأي سطر قبله، القفل ما رح يتحرر أبداً.

**التصحيح:**
```java
public Object take() throws InterruptedException {
    lock.lock();
    try {
        while (count == 0) empty.await();
        Object x = items[takeptr];
        if (++takeptr == items.length) takeptr = 0;
        --count;
        full.signal();
        return x;
    } finally {
        lock.unlock();
    }
}
```

---

### سؤال تصحيح 3 (return_check)
```java
S.add(x)
    pred := S.head
    curr := pred.next
    while (curr.key < x)
        pred := curr
        curr := pred.next
    node = new Node(x)
    node.next = curr
    pred.next = node
    return true   // خطأ هون
```
**الخطأ:** الكود بيرجّع `true` دايماً بدون ما يتحقق أول إذا كانت القيمة `x` موجودة مسبقاً (`curr.key = x`) — هاد بيسمح بإضافة تكرارات (duplicates)، وهاد يخالف تعريف `Set` (مجموعة بدون تكرار) المذكور بالمحاضرة.

**التصحيح:**
```java
S.add(x)
    pred := S.head
    curr := pred.next
    while (curr.key < x)
        pred := curr
        curr := pred.next
    if curr.key = x then
        return false
    else
        node = new Node(x)
        node.next = curr
        pred.next = node
        return true
```

---

### سؤال تصحيح 4 (dead_code)
```java
public void put(Object x) throws InterruptedException {
    lock.lock();
    try {
        while (count == items.length) full.await();
        items[putptr] = x;
        if (++putptr == items.length) putptr = 0;
        ++count;
        empty.signal();
        return;
        System.out.println("Added: " + x);  // كود ميت هون
    } finally {
        lock.unlock();
    }
}
```
**الخطأ:** سطر `System.out.println` موجود بعد `return;` مباشرة بنفس الـ block — هاد كود ميت (dead code)، ما رح يُنفّذ أبداً لأنو التنفيذ بيطلع من الميثود عند `return`.

**التصحيح:** احذف `System.out.println` من بعد `return`، أو لو محتاجينه فعلياً، حطه قبل `return` مباشرة.

---

### سؤال تصحيح 5 (logic)
```java
// Thread T1
synchronized (obj1) {
    synchronized (obj2) {
        // work
    }
}

// Thread T2
synchronized (obj2) {
    synchronized (obj1) {   // خطأ هون: ترتيب معكوس عن T1
        // work
    }
}
```
**الخطأ:** `T1` بياخد الأقفال بترتيب `(obj1, obj2)` بينما `T2` بياخدهم بترتيب معكوس `(obj2, obj1)` — هاد بالضبط النمط اللي بيسبب `Deadlock` حسب المحاضرة (انتظار متبادل دائري).

**التصحيح:** التزم بترتيب موحّد ومحدد مسبقاً (predetermined order) لأخذ الأقفال بكل الخيوط:
```java
// Thread T2 (بعد التصحيح)
synchronized (obj1) {
    synchronized (obj2) {
        // work
    }
}
```

---

# الجزء الثالث (تكملة): بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** شو الفرق بين `wait/notify` بـ `synchronized` و`await/signal` بـ `Condition`؟
**A:** نفس المبدأ منطقياً، بس `Condition` بتعطيك أكتر من `waiting-set` مستقل على نفس القفل، بينما `synchronized` عندها `waiting-set` واحدة بس.

### البطاقة 2
**Q2:** ليش لازم تُستدعى `lock.unlock()` جوا `finally` block دايماً؟
**A:** عشان يضمن تحرير القفل حتى لو صار `Exception` جوا الـ `try` — غير هيك، القفل ممكن يضل ماسوك للأبد ويسبب Deadlock لخيوط تانية.

### البطاقة 3
**Q3:** شو الغرض من العقدتين الوهميتين `-∞` و`∞` بـ `List-Based Set`؟
**A:** بيسهّلو التعامل مع حالات الحواف — مفيش حاجة اسمها "قبل أول عنصر" أو "بعد آخر عنصر"، فكل عملية بحث بتلاقي دايماً `pred` و`curr` صالحين.

### البطاقة 4
**Q4:** ليش `Coarse-Grained Mutual Exclusion` هو `deadlock-free` تلقائياً؟
**A:** لأنو فيه قفل واحد بس بالكامل — الـ Deadlock بيحتاج على الأقل قفلين وترتيب متضارب لأخذهم، وهاد مستحيل مع قفل واحد.

### البطاقة 5
**Q5:** متى يكون `Read/Write Locking` الخيار الأفضل؟
**A:** لما عملية `contains` (القراءة) هي الأكثر شيوعاً بكثير مقارنة بـ `add`/`remove` (الكتابة) — القرّاء بيقدرو يشتغلو مع بعض بنفس الوقت.

### البطاقة 6
**Q6:** شو معنى "Strict Two-Phase Locking"؟
**A:** تحرر كل الأقفال دفعة وحدة بنهاية العملية — بدل ما تفرّق تحريرها بأوقات مختلفة، فبتحصل فصل واضح بين مرحلة Acquire ومرحلة Release.

### البطاقة 7
**Q7:** كم قفل بحد أقصى بيمسك خيط واحد بنفس اللحظة أثناء `Hand-over-Hand Locking`؟
**A:** قفلين بس — قفل العقدة الحالية (predecessor) وقفل العقدة الجاية (successor) اللي بيمسكه قبل ما يفلت الحالية.

### البطاقة 8
**Q8:** شو الفرق بين `Safety` و`Liveness`؟
**A:** `Safety` = الكود ما بينتج نتيجة غلط أبداً (صحة منطقية)، `Liveness` = الكود بيضمن يتقدم فعلاً بوقت معقول (ما بيعلق للأبد).

### البطاقة 9
**Q9:** هل `Termination` شرط لازم لتحقيق `Liveness`؟
**A:** لأ — فيه برامج مصممة عمداً تكون non-terminating (زي السيرفرات)، وهاد طبيعي وما بيعتبر مشكلة `Liveness`.

### البطاقة 10
**Q10:** رتّب مستويات الـ `Liveness` الأربعة من الأضعف للأقوى.
**A:** `Deadlock Freedom` ← `Livelock Freedom` ← `Starvation Freedom` ← `Bounded Wait`.

### البطاقة 11
**Q11:** شو معنى `bound = 0` بـ `Bounded Wait`؟
**A:** معناها التنفيذ عادل تماماً (`fair`) — كل مهمة بتاخد دورها بالضبط حسب ترتيب طلبها، بدون أي مهمة تانية "تفوت قدامها".

### البطاقة 12
**Q12:** ليش `contains()` بـ `Coarse-Grained Mutual Exclusion` ممكن تفلت القفل بدري؟
**A:** لأنها بعد ما توصل لنتيجتها (true أو false)، ما رح تعدّل أي شي بالقائمة — فمافي داعي تضل ماسكة القفل بعد الوصول للنتيجة.

### البطاقة 13
**Q13:** شو الفرق الحاسم بين `Deadlock` و`Livelock`؟
**A:** بـ `Deadlock` الخيوط متجمدة تماماً (صفر تنفيذ)، بينما بـ `Livelock` الخيوط شغالة فعلياً بس بتكرر نفس النمط بدون تقدم حقيقي.

---

# الجزء الرابع (تكملة): ورقة المراجعة السريعة (Cheat Sheet)

## القواعد الذهبية
| # | القاعدة |
| --- | --- |
| 1 | كل استدعاء `lock.lock()` يجب أن يقابله `lock.unlock()` جوا `finally` block. |
| 2 | استخدم `while` مش `if` مع `Condition.await()` دايماً لتفادي الصحوة الكاذبة أو منافسة خيوط تانية. |
| 3 | `contains()` بـ `List-Based Set` ما بتعدّل شي — مرشحة مثالية لـ `readlock` بس بنمط `Read/Write Locking`. |
| 4 | لتفادي `Deadlock` مع `Fine-Grained Locking`، التزم بترتيب موحّد ومحدد مسبقاً لأخذ الأقفال بكل الخيوط. |
| 5 | `Hand-over-Hand Locking`: امسك قفل العقدة الجاية قبل ما تفلت قفل العقدة الحالية — بحد أقصى قفلين بنفس الوقت. |
| 6 | `Coarse-Grained Mutual Exclusion` مش دايماً "الحل الضعيف" — بزحمة منخفضة، ممكن يكون الأفضل. |
| 7 | `Safety` = صحة النتيجة. `Liveness` = ضمان التقدم. الاثنين مطلوبين مع بعض، أي وحدة لوحدها مش كافية. |
| 8 | ترتيب قوة ضمانات الـ `Liveness`: `Deadlock < Livelock < Starvation < Bounded Wait` (من الأضعف للأقوى). |

## مرجع سريع للمصطلحات والصيغ
| المصطلح | التعريف بسطر |
| --- | --- |
| `Condition` | غرفة انتظار مستقلة مرتبطة بقفل، بتدعم `await()`/`signal()`/`signalAll()`. |
| `ReentrantLock` | تطبيق فعلي لقفل غير مهيكل، قابل لإعادة الدخول من نفس الخيط. |
| `Coarse-Grained Mutual Exclusion` | قفل واحد يغطي الكائن بالكامل. |
| `Read/Write Locking` | قفل قراءة مشترك (`readlock`) + قفل كتابة حصري (`writelock`). |
| `Fine-Grained Locking` | قفل منفصل لكل قطعة بيانات صغيرة، غالباً بنمط Two-Phase. |
| `Two-Phase Locking` | خذ كل الأقفال أول (Acquire)، ثم حرر كل شي (Release) — بدون Acquire بعد أي Release. |
| `Hand-over-Hand Locking` | Fine-Grained بس بدون Two-Phase — بحد أقصى قفلين متتاليين بنفس الوقت. |
| `Safety` | الكود ما بينتج نتيجة غلط (functional correctness). |
| `Liveness` | الكود بيضمن يتقدم بوقت معقول (guarantees progress). |
| `Deadlock` | مهام عالقة للأبد بانتظار متبادل دائري (خيوط متجمدة تماماً). |
| `Livelock` | تكرار نفس التفاعل بدون تقدم (خيوط شغالة بس بلا فايدة). |
| `Starvation` | مهمة محرومة بشكل متكرر من التقدم (`lock-out`). |
| `Bounded Wait` | عدد محدود من المهام يقدر "يفوت قدامك" لكل طلب مورد — `bound=0` يعني `fair`. |
| `Amdahl's Law` | `Speedup(P) = 1 / ((1 - f) + f/P)` حيث `f` = النسبة القابلة للتوازي. |
| `Work / Span` | `Work` = مجموع وقت التنفيذ التسلسلي الكامل، `Span (CPL)` = أطول مسار حرج، `Speedup(P) ≤ min(P, Work/Span)`. |

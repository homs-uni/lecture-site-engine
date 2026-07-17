# المحاضرة 7 — Compose State & Navigation (الحالة والتنقل في Jetpack Compose)
> **المادة:** أساسيات تطوير تطبيقات أندرويد (النظري الكامل) (نظري) | **الموضوع:** State في Jetpack Compose، Stateful/Stateless Composables، State Hoisting، دورة حياة الـ Composables، والتنقل (Navigation) بين الشاشات باستخدام Navigation Component

---

## 📌 خريطة التكامل (أين تقع هذه المادة في مسار أندرويد؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| Kotlin Basics & OOP | `val/var`، `class`، `lambda` | فهم بناء الكود الأساسي |
| Compose UI (المحاضرة السابقة) | `@Composable`، `Column/Row/Box`، `Modifier` | بناء واجهات ثابتة |
| **Compose State & Navigation ← أنت هنا** | `remember`، `mutableStateOf`، `State Hoisting`، `NavController`، `NavHost` | واجهات تفاعلية ومتعددة الشاشات |
| بناء تطبيق كامل | `ViewModel`، `Room`، `Retrofit` | تطبيق أندرويد متكامل |

> **نوع هذه المحاضرة:** نظري + كود (مفاهيم الحالة وإدارتها، ثم آلية التنقل بين الشاشات وإدارة الـ Back Stack)

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. تعريف الـ State (الحالة)

#### النص الأصلي يقول (English):
> State in an app is any value that can change over time. This is a very broad definition and encompasses everything from a Room database to a variable in a class.

#### الترجمة الحرفية:
> الحالة (State) في التطبيق هي أي قيمة يمكن أن تتغيّر مع مرور الوقت. هذا تعريف واسع جداً ويشمل كل شيء بدءاً من قاعدة بيانات Room وحتى متغيّر داخل صنف (class).

#### الشرح المبسّط:
`State` ببساطة هو أي "قيمة" في تطبيقك من الممكن أن تختلف من لحظة لأخرى — سواء كانت رقماً بسيطاً كعدد التكرارات، أو نصاً كتبه المستخدم، أو حتى بيانات معقّدة قادمة من قاعدة بيانات. أهمية هذا المفهوم أنه الأساس الذي يُبنى عليه كل شيء تراه على الشاشة؛ فبدون فهم أين تُخزَّن الحالة وكيف تتغيّر، لا يمكن فهم كيف تتحدّث واجهة Compose. يرتبط هذا مباشرة بالمحاضرة السابقة عن بناء الواجهات الثابتة، لأن الخطوة التالية الطبيعية هي جعل هذه الواجهات "حيّة" تستجيب للتغييرات. **تشبيه يومي:** تخيّل لوحة نتيجة مباراة كرة قدم — الرقم المعروض هو "State"، وكل هدف يُسجَّل هو حدث يُغيّر هذا الرقم؛ ومثال عملي: عدّاد نقاط في تطبيق ألعاب يزيد كل مرة يضغط فيها المستخدم على زر.

**لماذا؟** لأن فهم مصدر التغيير في التطبيق هو ما يحدد كيف تُصمَّم الواجهة لتبقى متزامنة دائماً مع البيانات الحقيقية.

---

### 2. أمثلة على الـ State في تطبيقات أندرويد

#### النص الأصلي يقول (English):
> All Android apps display state to the user. A few examples of state in Android apps: The most recent messages received in a chat app. The user's profile photo. The scroll position in a list of items. A Snackbar that shows when a network connection can't be established. A blog post and associated comments. Ripple animations on buttons that play when a user clicks them. Stickers that a user can draw on top of an image.

#### الترجمة الحرفية:
> جميع تطبيقات أندرويد تعرض حالة (state) للمستخدم. بعض الأمثلة على الحالة في تطبيقات أندرويد: أحدث الرسائل المستلمة في تطبيق دردشة. الصورة الشخصية للمستخدم. موضع التمرير (scroll) في قائمة من العناصر. رسالة Snackbar تظهر عند تعذّر إنشاء اتصال بالشبكة. منشور مدونة والتعليقات المرتبطة به. تأثيرات حركة Ripple على الأزرار تظهر عند ضغط المستخدم عليها. الملصقات (Stickers) التي يمكن للمستخدم رسمها فوق صورة.

#### الشرح المبسّط:
هذه الأمثلة توضّح أن `State` ليس مفهوماً نظرياً بعيداً، بل هو موجود في كل زاوية من التطبيقات التي نستخدمها يومياً — من موضع التمرير في قائمة إلى أبسط حركة اهتزاز عند الضغط على زر. أهمية سرد هذه الأمثلة أنها تُظهر أن الحالة تتراوح بين بسيطة جداً (مثل موضع القائمة) ومعقّدة (مثل بيانات منشور وتعليقاته من قاعدة بيانات). يرتبط هذا بالنقطة السابقة لأنه يفصّل التعريف العام بأمثلة ملموسة تسهّل الفهم. **تشبيه يومي:** فكّر في تطبيق واتساب — آخر رسالة تصلك، حالة "متصل الآن"، وحتى مكان توقّفك عند التمرير في المحادثة، كل هذه أمثلة حيّة على الـ State؛ ومثال عملي: تطبيق طقس يعرض درجة الحرارة الحالية التي تتغيّر كل ساعة.

**لماذا؟** لتوسيع فهم الطالب بأن أي عنصر مرئي متغيّر في الشاشة هو انعكاس لحالة داخلية يجب إدارتها بشكل صحيح.

> #### 💡 التشبيه:
> لوحة القيادة في السيارة (عداد السرعة، مستوى الوقود) تعرض دائماً "حالة" السيارة الحالية.
> **وجه الشبه:** عداد السرعة = عنصر واجهة يعرض state، السرعة الفعلية = القيمة المخزَّنة في الذاكرة.

---

### 3. دور Jetpack Compose في إدارة الحالة

#### النص الأصلي يقول (English):
> Jetpack Compose helps you be explicit about where and how you store and use state in an Android app.

#### الترجمة الحرفية:
> يساعدك Jetpack Compose على أن تكون واضحاً وصريحاً بخصوص أين وكيف تُخزِّن وتستخدم الحالة في تطبيق أندرويد.

#### الشرح المبسّط:
هذه الجملة تلخّص فلسفة Compose بأكملها فيما يخص إدارة البيانات: بدلاً من ترك المطوّر يخمّن أين يجب أن تعيش القيمة المتغيّرة، يفرض Compose عليه أن يحدّد بوضوح "مكان" و"طريقة" تخزين كل حالة (سواء داخل الـ composable نفسه أو خارجه). هذا مهم لأنه يقلل الأخطاء الناتجة عن حالة "ضائعة" أو غير متزامنة مع الواجهة. يرتبط هذا بما سبق لأنه يمهّد للانتقال من مجرد تعريف الحالة إلى معرفة كيفية التعامل معها عملياً داخل الكود. **تشبيه يومي:** مثل موظف أرشيف يطلب منك تسمية كل ملف ووضعه في الدرج الصحيح بدلاً من رميه في أي مكان؛ ومثال عملي: تحديد أن اسم المستخدم في نموذج تسجيل يجب أن يُخزَّن داخل الشاشة التي يُكتب فيها وليس في مكان عشوائي آخر.

**لماذا؟** لأن الوضوح في تخزين الحالة يجعل التطبيق أسهل في الصيانة والاختبار مستقبلاً.

---

### 4. العلاقة بين State والـ Events

#### النص الأصلي يقول (English):
> We talked about state as any value that changes over time. But what causes the state to update? In Android apps, state is updated in response to events. Events are inputs generated from outside or inside an application, such as: The user interacting with the UI by, for example, pressing a button. Other factors, such as sensors sending a new value, or network responses. While the state of the app offers a description of what to display in the UI, events are the mechanism through which the state changes, resulting in changes to the UI.

#### الترجمة الحرفية:
> تحدّثنا عن الحالة (state) كأي قيمة تتغيّر مع الوقت. لكن ما الذي يجعل الحالة تتحدّث؟ في تطبيقات أندرويد، تُحدَّث الحالة استجابةً لأحداث (events). الأحداث هي مدخلات تُولَّد من خارج التطبيق أو من داخله، مثل: تفاعل المستخدم مع الواجهة، على سبيل المثال بالضغط على زر. عوامل أخرى، مثل إرسال أحد الحساسات (sensors) لقيمة جديدة، أو استجابات الشبكة. بينما تقدّم حالة التطبيق وصفاً لما يجب عرضه في الواجهة، فإن الأحداث هي الآلية التي من خلالها تتغيّر الحالة، مما يؤدي إلى تغييرات في الواجهة.

#### الشرح المبسّط:
هذه الفقرة تربط مفهومين أساسيين ببعضهما: الحالة (State) هي "الوصف الحالي" لما يجب أن يظهر على الشاشة، بينما الحدث (Event) هو "المحرّك" الذي يغيّر هذا الوصف. بدون أحداث، تبقى الحالة ثابتة إلى الأبد؛ فالضغط على زر، أو وصول إشعار من حساس، أو استجابة من الشبكة، كل هذه أحداث تدفع الحالة للتحديث. هذا مهم جداً لأنه يوضّح دورة العمل الكاملة في أي تطبيق تفاعلي: لا يوجد تغيير في الواجهة بدون حدث أولاً. **تشبيه يومي:** مثل مؤشر حرارة الغرفة (الحالة) الذي لا يتغيّر إلا عندما يضغط شخص على زر تعديل درجة الحرارة في جهاز التكييف (الحدث)؛ ومثال عملي: زر "إعجاب" في تطبيق اجتماعي — الضغط عليه (event) يُغيّر عدد الإعجابات (state) المعروض.

**لماذا؟** لأن فهم هذه العلاقة السببية هو مفتاح بناء أي منطق تفاعلي صحيح في Compose.

> #### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ما الفرق بين الـ State والـ Event؟
> **لماذا هذا مهم؟** لأن الخلط بينهما يؤدي لأخطاء برمجية شائعة، مثل محاولة "تخزين" حدث بدلاً من استخدامه لتحديث حالة فعلية.

```algorithm
1 | يحدث تفاعل | المستخدم أو النظام | يتم توليد Event (ضغط زر، إشارة حساس، استجابة شبكة)
2 | معالجة الحدث | Event Handler | يقوم بتحديث قيمة الـ State المرتبطة
3 | إعادة الرسم | Jetpack Compose | تُحدَّث الواجهة (Display State) لتعكس القيمة الجديدة
```

---

### 5. حلقة تحديث الواجهة (UI Update Loop)

#### النص الأصلي يقول (English):
> Events notify a part of a program that something has happened. In all Android apps, there's a core UI update loop that goes like this: Event - An event is generated by the user or another part of the program. Update State - An event handler changes the state that is used by the UI. Display State - The UI is updated to display the new state. Managing state in Compose is all about understanding how state and events interact with each other.

#### الترجمة الحرفية:
> تُخبر الأحداث جزءاً من البرنامج بأن شيئاً ما قد حدث. في جميع تطبيقات أندرويد، توجد حلقة أساسية لتحديث الواجهة تسير كالتالي: الحدث (Event) - يُولَّد حدث من قِبل المستخدم أو من جزء آخر من البرنامج. تحديث الحالة (Update State) - يقوم معالِج الحدث بتغيير الحالة المستخدَمة في الواجهة. عرض الحالة (Display State) - تُحدَّث الواجهة لعرض الحالة الجديدة. إدارة الحالة في Compose تدور بأكملها حول فهم كيفية تفاعل الحالة والأحداث مع بعضهما.

#### الشرح المبسّط:
هذه الحلقة الثلاثية (Event → Update State → Display State) هي "القلب النابض" لأي تطبيق Compose تفاعلي، وتتكرر باستمرار طوال حياة التطبيق. أهميتها أنها توفر نموذجاً ذهنياً بسيطاً يمكن تطبيقه على أي ميزة تبنيها، بغض النظر عن مدى تعقيدها. ترتبط هذه الحلقة مباشرة بالفقرة السابقة، فهي تحويل نفس الفكرة إلى خطوات عملية واضحة ومتسلسلة يمكن اتّباعها عند كتابة الكود. **تشبيه يومي:** مثل دورة الطهي: تشعر بالجوع (Event) فتضع طعاماً في الفرن وتضبط المؤقّت (Update State)، ثم يرن جرس الفرن ليخبرك أن الطعام جاهز (Display State)؛ ومثال عملي: كتابة حرف في حقل نص (Event) يُحدّث المتغيّر الذي يخزّن النص (Update State) فتظهر الحروف الجديدة أمامك فوراً (Display State).

**لماذا؟** لأن تبسيط أي سلوك تفاعلي إلى هذه الخطوات الثلاث يجعل تصميم وتصحيح أخطاء الكود أسهل بكثير.

```algorithm
1 | Event | المستخدم / النظام | يتم توليد الحدث (ضغط، إدخال، استجابة شبكة...)
2 | Update State | Event Handler (lambda) | يُغيَّر متغيّر الحالة المرتبط بالحدث
3 | Display State | Jetpack Compose (Recomposition) | تُعاد كتابة الواجهة لتطابق القيمة الجديدة
```

---

### 6. طبيعة Compose التصريحية (Declarative) وآلية إعادة التركيب

#### النص الأصلي يقول (English):
> Compose is declarative and as such the only way to update it is by calling the same composable with new arguments. These arguments are representations of the UI state. Any time a state is updated a recomposition takes place. As a result, things like TextField don't automatically update. A composable has to explicitly be told the new state in order for it to update accordingly.

#### الترجمة الحرفية:
> Compose هو نظام تصريحي (declarative)، وبناءً على ذلك فإن الطريقة الوحيدة لتحديثه هي استدعاء نفس الـ composable بوسائط (arguments) جديدة. هذه الوسائط تمثّل حالة الواجهة. في أي وقت تُحدَّث فيه الحالة، تحدث عملية إعادة تركيب (recomposition). نتيجة لذلك، عناصر مثل TextField لا تتحدّث تلقائياً. يجب إخبار الـ composable صراحةً بالحالة الجديدة حتى يتحدّث وفقاً لذلك.

#### الشرح المبسّط:
الفكرة الجوهرية هنا هي أن Compose لا "يُعدِّل" الواجهة الموجودة كما تفعل الأنظمة التقليدية (imperative)، بل يعيد "وصفها من جديد" في كل مرة تتغيّر فيها القيمة التي تعتمد عليها. لهذا السبب بالتحديد، عنصر مثل `TextField` لا يعرض النص المكتوب تلقائياً إلا إذا كان مرتبطاً بمتغيّر state يُحدَّث بشكل صريح عبر `onValueChange`. هذا يفسّر لماذا رأينا في المثال البرمجي التالي أن الكتابة في الحقل لا تظهر شيئاً — لأن القيمة `value` ثابتة دائماً على نص فارغ ولا تتغيّر أبداً. **تشبيه يومي:** كأنك تطلب من رسّام أن يرسم لوحة جديدة بالكامل كل مرة تتغيّر فيها التفاصيل، بدلاً من أن يمسح جزءاً صغيراً ويرسم فوقه فقط؛ ومثال عملي: عند كتابة اسمك في حقل نصي، يجب أن يكون هناك متغيّر `name` يُحدَّث مع كل حرف، وإلا يبقى الحقل فارغاً مهما كتبت.

**لماذا؟** لأن هذا الفهم يمنع خطأً شائعاً جداً عند المبتدئين وهو توقّع أن عناصر الإدخال "تتذكّر" ما كُتب فيها من تلقاء نفسها.

#### 💻 الكود: مثال TextField لا يتحدّث

#### ما هذا الكود؟
> يوضّح خطأً شائعاً: استخدام `TextField` بقيمة ثابتة `""` بدون ربطها بحالة (state)، فتظل الكتابة بلا تأثير على الشاشة.

```kotlin
@Composable
private fun HelloContent() {
    // Column arranges children vertically with padding
    Column(modifier = Modifier.padding(16.dp)) {
        // Static text label
        Text(
            text = "Hello!",
            modifier = Modifier.padding(bottom = 8.dp),
            style = MaterialTheme.typography.bodyMedium
        )
        // TextField bound to a constant empty string — will NOT update
        OutlinedTextField(
            value = "",
            onValueChange = { },
            label = { Text("Name") }
        )
    }
}
```

#### شرح كل سطر:
1. `Column(modifier = Modifier.padding(16.dp))` → حاوية عمودية — ترتّب العناصر تحتها فوق بعضها مع هامش داخلي 16dp
2. `Text(text = "Hello!", ...)` → نص ثابت — يعرض عبارة ترحيبية لا تتغيّر
3. `OutlinedTextField(value = "", ...)` → حقل إدخال — قيمته ثابتة دائماً على فارغ، هذا هو الخطأ
4. `onValueChange = { }` → معالِج فارغ — لا يقوم بأي تحديث لأي متغيّر، لذلك لا يحدث recomposition

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.foundation.layout.Column`
> `import androidx.compose.material3.OutlinedTextField`
> `import androidx.compose.material3.Text`

**الناتج المتوقع (لقطة الشاشة):**
> حقل نص يظهر فارغاً دوماً مهما كتب المستخدم فيه — لأن القيمة المعروضة مرتبطة بنص ثابت لا بمتغيّر حالة.

#### الفهم الخاطئ الشائع ❌: عناصر الإدخال (مثل TextField) "تتذكّر" ما يكتبه المستخدم تلقائياً.
#### الفهم الصحيح ✅: يجب ربط كل عنصر إدخال بمتغيّر state صريح يُحدَّث عبر onValueChange حتى تنعكس التغييرات على الشاشة.

---

### 7. Recomposition والمتغيرات المحلية

#### النص الأصلي يقول (English):
> Example: [Counter composable with local var count]. The composable can be re-executed. count is a local variable. Recomposition may happen at any time. count is reset to 0 on every recomposition. Local variables cannot hold UI state in Compose. Recomposition is how Jetpack Compose updates the UI. When state used by a composable changes, Compose may re-execute that composable. The UI is not mutated — it is described again with new data. Key things to remember: A composable function can run many times. Local variables inside a composable do NOT survive recomposition. If you want to keep a value across recompositions, you must store it as state.

#### الترجمة الحرفية:
> مثال: [عنصر Counter مع متغيّر محلي count]. يمكن إعادة تنفيذ الـ composable. count متغيّر محلي. قد تحدث إعادة التركيب (recomposition) في أي وقت. تتم إعادة تعيين count إلى 0 مع كل إعادة تركيب. لا يمكن للمتغيرات المحلية أن تحمل حالة الواجهة في Compose. إعادة التركيب هي الطريقة التي يُحدِّث بها Jetpack Compose الواجهة. عندما تتغيّر الحالة المستخدَمة من قِبل composable، قد يعيد Compose تنفيذ ذلك الـ composable. الواجهة لا تُعدَّل — بل تُوصَف من جديد ببيانات جديدة. أشياء أساسية يجب تذكّرها: يمكن لدالة composable أن تعمل مرات عديدة. المتغيرات المحلية داخل composable لا تنجو من إعادة التركيب. إذا أردت الاحتفاظ بقيمة عبر إعادات التركيب، يجب تخزينها كحالة (state).

#### الشرح المبسّط:
هذا المثال يكشف عن مشكلة دقيقة جداً وشائعة: استخدام `var count = 0` كمتغيّر Kotlin عادي داخل الـ composable لا يعمل كعدّاد، لأن Compose يعيد تنفيذ الدالة بأكملها في كل recomposition، وهذا يعني إعادة تعيين `count` إلى صفر في كل مرة. السبب المنطقي وراء ذلك أن Compose لا "يتذكّر" حالة الدالة العادية بين الاستدعاءات مثل الكائنات التقليدية؛ فقط القيم المخزَّنة صراحة عبر أدوات خاصة (سنتعرف عليها لاحقاً وهي `remember`) تنجو من إعادة التنفيذ. هذا يربط مباشرة بالنقطة السابقة عن الطبيعة التصريحية لـ Compose: بما أن الواجهة تُعاد كتابتها من الصفر، فإن أي متغيّر عادي غير محفوظ صراحة يُعاد أيضاً من الصفر. **تشبيه يومي:** كأنك تعيد كتابة رسالة من الذاكرة كل مرة بدلاً من فتح مسوّدة محفوظة — ستفقد كل ما أضفته سابقاً إن لم تحفظه؛ ومثال عملي: عدّاد ضغطات زر لا يزيد أبداً عن 1 لأنه يُصفَّر مع كل ضغطة بسبب إعادة تنفيذ الدالة بأكملها.

**لماذا؟** لأن فهم هذا القيد هو ما يقود مباشرة إلى الحاجة لأداة `remember` كحلّ لهذه المشكلة تحديداً.

#### 💻 الكود: عدّاد لا يعمل (Local Variable Trap)

#### ما هذا الكود؟
> يوضّح لماذا لا يمكن استخدام متغيّر محلي عادي كعدّاد في Compose.

```kotlin
@Composable
fun Counter() {
    // Local variable — reset to 0 on every recomposition
    var count = 0
    // Button click increments the local variable
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

#### شرح كل سطر:
1. `var count = 0` → متغيّر محلي — يُعاد تعيينه إلى صفر مع كل recomposition لأن الدالة بأكملها تُعاد تنفيذها
2. `Button(onClick = { count++ })` → زر — يزيد المتغيّر عند الضغط لكن الزيادة تُفقد فوراً في الاستدعاء التالي
3. `Text("Count: $count")` → نص — يعرض دائماً 0 تقريباً لأن القيمة لا تنجو أبداً

**الناتج المتوقع (لقطة الشاشة):**
> الرقم المعروض على الزر يبقى عالقاً عند 0 أو لا يتغيّر بشكل موثوق، رغم استمرار الضغط على الزر.

#### مهم للامتحان ⚠️:
> Local variables cannot hold UI state in Compose — قاعدة يجب حفظها حرفياً.

---

### 8. الـ remember API

#### النص الأصلي يقول (English):
> Composable functions can use the remember API to store an object in memory. A value computed by remember is stored in the Composition during initial composition, and the stored value is returned during Recomposition. remember can be used to store both mutable and immutable objects. mutableStateOf creates an observable MutableState<T>, which is an observable type integrated with the compose runtime. Any changes to value schedules recomposition of any composable functions that read value.

#### الترجمة الحرفية:
> يمكن لدوال composable استخدام واجهة remember لتخزين كائن (object) في الذاكرة. تُخزَّن القيمة المحسوبة بواسطة remember في الـ Composition أثناء التركيب الأولي (initial composition)، وتُعاد القيمة المخزَّنة أثناء إعادة التركيب (Recomposition). يمكن استخدام remember لتخزين كائنات قابلة للتغيير (mutable) وغير قابلة للتغيير (immutable) على حدٍّ سواء. تُنشئ mutableStateOf كائن MutableState<T> قابل للمراقبة، وهو نوع بيانات قابل للمراقبة مندمج مع بيئة تشغيل Compose. أي تغييرات على value تجدول إعادة تركيب لأي دوال composable تقرأ value.

#### الشرح المبسّط:
`remember` هي الأداة السحرية التي تحلّ المشكلة التي رأيناها في المثال السابق: بدلاً من أن تُصفَّر القيمة مع كل recomposition، يخزّنها `remember` داخل الـ Composition نفسها بحيث تبقى محفوظة وتُستَرجَع كما هي. لكن `remember` وحدها لا تكفي لجعل التغيير "ملحوظاً" من قِبل Compose — هنا يأتي دور `mutableStateOf` الذي يُنشئ نوعاً خاصاً `MutableState<T>` يراقبه Compose باستمرار، بحيث إن تغيّرت قيمته يُعاد تشغيل أي composable يعتمد عليها تلقائياً. هذا يربط مباشرة بالفقرة السابقة: `remember` تحل مشكلة "النسيان"، و`mutableStateOf` تحل مشكلة "عدم الملاحظة". **تشبيه يومي:** `remember` مثل درج مغلق يحفظ أغراضك بين الزيارات المتكررة لنفس الغرفة، بينما `mutableStateOf` أشبه بجرس إنذار يرنّ فوراً عندما يتغيّر شيء داخل ذلك الدرج؛ ومثال عملي: `var count by remember { mutableStateOf(0) }` يحفظ قيمة العدّاد عبر كل ضغطة زر ويحدّث الشاشة تلقائياً.

**لماذا؟** لأن الجمع بين "الحفظ" (remember) و"المراقبة" (mutableStateOf) هو ما يجعل Compose قادراً على بناء واجهات تفاعلية حقيقية رغم طبيعته التصريحية.

> #### نقطة مهمة ⚠️:
> `remember` تنسى الكائن عندما يُزال الـ composable الذي استدعاها من الـ Composition — أي أنها ليست دائمة إلى الأبد بل مرتبطة بحياة العنصر في الواجهة.

```kotlin
// MutableState interface definition
interface MutableState<T> : State<T> {
    override var value: T
}
```

---

### 9. الطرق الثلاث لتعريف MutableState

#### النص الأصلي يقول (English):
> There are three ways to declare a MutableState object in a composable: val mutableState = remember { mutableStateOf(default) }; var value by remember { mutableStateOf(default) }; val (value, setValue) = remember { mutableStateOf(default) }. The by delegate syntax requires the following imports: import androidx.compose.runtime.getValue, import androidx.compose.runtime.setValue.

#### الترجمة الحرفية:
> توجد ثلاث طرق لتعريف كائن MutableState داخل composable: val mutableState = remember { mutableStateOf(default) }؛ var value by remember { mutableStateOf(default) }؛ val (value, setValue) = remember { mutableStateOf(default) }. صياغة التفويض by تتطلّب عمليات الاستيراد التالية: import androidx.compose.runtime.getValue، import androidx.compose.runtime.setValue.

#### الشرح المبسّط:
Kotlin يوفّر ثلاث صياغات مختلفة لتحقيق نفس الهدف — تخزين ومراقبة حالة — وكل صياغة تناسب أسلوب برمجة مختلف. الطريقة الأولى (`val mutableState`) تجعلك تصل للقيمة عبر `.value` صراحة، وهي الأكثر وضوحاً للمبتدئين. الطريقة الثانية باستخدام `by` (delegate) هي الأكثر شيوعاً في المشاريع الحقيقية لأنها تتيح التعامل مع المتغيّر مباشرة وكأنه متغيّر Kotlin عادي دون كتابة `.value` في كل مرة. الطريقة الثالثة (destructuring) تفصل القيمة عن دالة تحديثها في متغيّرين منفصلين، وهي مفيدة عند تمرير القراءة والكتابة بشكل منفصل لمكوّنات أخرى. **تشبيه يومي:** مثل ثلاث طرق لفتح باب — بمفتاح تقليدي (val + .value)، أو ببصمة إصبع فورية (by delegate)، أو بجهازين منفصلين أحدهما للقفل والآخر للفتح (destructuring)؛ كلها توصلك لنفس النتيجة بأساليب مختلفة. ومثال عملي: `var name by remember { mutableStateOf("") }` يسمح لك بكتابة `name = "Raghad"` مباشرة بدل `name.value = "Raghad"`.

**لماذا؟** لأن معرفة الصياغات الثلاث تتيح لك قراءة وفهم أي كود Compose بغض النظر عن الأسلوب الذي كتبه به المطوّر الآخر.

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `val mutableState = remember { mutableStateOf(default) }` | الوصول للقيمة عبر `.value` | `mutableState.value = "new"` |
| `var value by remember { mutableStateOf(default) }` | استخدام delegate — وصول مباشر بدون `.value` | يتطلّب `import ...getValue/setValue` |
| `val (value, setValue) = remember { mutableStateOf(default) }` | تفكيك (destructuring) لقيمة ودالة تحديث منفصلتين | مفيد لتمرير القراءة/الكتابة بشكل منفصل |

---

### 10. مثال HelloContent باستخدام remember + شرط عرض

#### النص الأصلي يقول (English):
> You can use the remembered value as a parameter for other composables or even as logic in statements to change which composables are displayed. Example, if you don't want to display the greeting if the name is empty, use the state in an if statement: [HelloContent example with if(name.isNotEmpty())].

#### الترجمة الحرفية:
> يمكنك استخدام القيمة المحفوظة (remembered) كوسيط (parameter) لدوال composable أخرى أو حتى كمنطق داخل جمل شرطية للتحكّم في أي composables تُعرَض. مثال، إذا لم تكن ترغب في عرض التحية عندما يكون الاسم فارغاً، استخدم الحالة داخل جملة if.

#### الشرح المبسّط:
هذا المثال يجمع كل ما تعلّمناه: تعريف حالة عبر `remember { mutableStateOf("") }`، ثم استخدام تلك الحالة كشرط منطقي (`if (name.isNotEmpty())`) لإخفاء أو إظهار جزء من الواجهة، ثم ربط نفس الحالة بحقل الإدخال عبر `value` و`onValueChange`. الأهمية هنا أن الحالة ليست فقط "بيانات تُعرَض" بل يمكن أيضاً استخدامها كمنطق تحكّم يقرر شكل الواجهة بأكمله — وهذا هو جوهر الواجهات الديناميكية. يرتبط هذا مباشرة بمفهوم أن الحالة تحدد ما يُعرَض في أي لحظة، وهو ما رأيناه في بداية المحاضرة. **تشبيه يومي:** مثل لافتة "مفتوح/مغلق" على باب متجر تتغيّر تلقائياً حسب حالة المتجر الحقيقية؛ ومثال عملي: عبارة ترحيب لا تظهر إلا بعد أن يكتب المستخدم اسمه فعلياً في حقل النص.

**لماذا؟** لأن ربط الحالة بالمنطق الشرطي يسمح ببناء تجارب مستخدم ديناميكية وذكية بدلاً من واجهات ثابتة.

#### 💻 الكود: HelloContent مع state وشرط عرض

#### ما هذا الكود؟
> يعرض تحية فقط إن كان الاسم غير فارغ، ويربط حقل الإدخال بمتغيّر state حقيقي بحيث يعمل بشكل صحيح على عكس المثال الأول.

```kotlin
@Composable
fun HelloContent() {
    // Column arranges elements vertically
    Column(modifier = Modifier.padding(16.dp)) {
        // name is remembered state — survives recomposition
        var name by remember { mutableStateOf("") }
        // Only show greeting if name is not empty
        if (name.isNotEmpty()) {
            Text(
                text = "Hello, $name!",
                modifier = Modifier.padding(bottom = 8.dp),
                style = MaterialTheme.typography.bodyMedium
            )
        }
        // TextField bound to the name state — updates correctly
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Name") }
        )
    }
}
```

#### شرح كل سطر:
1. `var name by remember { mutableStateOf("") }` → تعريف الحالة — قيمة نصية تبدأ فارغة وتبقى محفوظة عبر إعادات التركيب
2. `if (name.isNotEmpty())` → منطق شرطي يعتمد على الحالة — يُظهر النص فقط عند وجود اسم
3. `Text(text = "Hello, $name!", ...)` → نص التحية — يعرض القيمة الحالية للحالة
4. `OutlinedTextField(value = name, ...)` → حقل مرتبط بالحالة — القيمة المعروضة تساوي دائماً `name`
5. `onValueChange = { name = it }` → معالج التحديث — يُحدِّث `name` بكل حرف جديد، مما يسبب recomposition

**الناتج المتوقع (لقطة الشاشة):**
> عند كتابة "Sara" مثلاً، تظهر فوراً عبارة "Hello, Sara!" فوق حقل الإدخال الذي يعرض بدوره النص المكتوب بشكل صحيح.

---

### 11. remember مقابل rememberSaveable

#### النص الأصلي يقول (English):
> While remember helps you retain state across recompositions, the state is not retained across configuration changes. For this, you must use rememberSaveable. rememberSaveable automatically saves any value that can be saved in a Bundle (such as: String, Int, Boolean, Parcelable, Serializable). For other values, you can pass in a custom saver object.

#### الترجمة الحرفية:
> بينما تساعدك remember في الحفاظ على الحالة عبر إعادات التركيب، إلا أن الحالة لا تبقى محفوظة عبر تغييرات التكوين (configuration changes). لهذا، يجب استخدام rememberSaveable. تحفظ rememberSaveable تلقائياً أي قيمة يمكن حفظها في Bundle (مثل: String، Int، Boolean، Parcelable، Serializable). بالنسبة للقيم الأخرى، يمكنك تمرير كائن saver مخصّص.

#### الشرح المبسّط:
هذه نقطة دقيقة يخطئ فيها كثير من المطورين: `remember` تحمي القيمة فقط من إعادات التركيب العادية (مثل الضغط على زر)، لكنها **لا** تحميها من "تغييرات التكوين" الأكبر مثل تدوير الشاشة (rotation) أو تغيير اللغة، حيث يُعاد بناء الـ Activity بالكامل من الصفر فتُفقد القيمة. لحل هذه المشكلة تحديداً، نستخدم `rememberSaveable` التي تخزّن القيمة داخل `Bundle` النظام، وهو نفس الآلية التي يستخدمها أندرويد لحفظ حالة الشاشة عند تدويرها. هذا يعني أن اختيار أي أداة نستخدمها (remember أو rememberSaveable) يعتمد على مدى أهمية بقاء تلك القيمة مرئية للمستخدم حتى بعد تدوير الجهاز. **تشبيه يومي:** `remember` مثل ملاحظة على ورقة تُمسح إذا أُطفئت الغرفة تماماً وأُعيد تشغيلها، بينما `rememberSaveable` مثل حفظ تلك الملاحظة في ملف رسمي يبقى حتى لو انقطعت الكهرباء؛ ومثال عملي: نص كتبه المستخدم في نموذج تسجيل يجب أن يبقى ظاهراً حتى بعد تدوير الهاتف، لذا يُستخدم `rememberSaveable` بدلاً من `remember`.

**لماذا؟** لتجنّب فقدان بيانات المستخدم المؤقتة (كنص مكتوب أو اختيار محدد) عند حدوث أي تغيير في تكوين الجهاز.

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| بقاء الحالة | `remember` | `rememberSaveable` | remember تُفقَد عند تغيير التكوين (تدوير الشاشة)، بينما rememberSaveable تبقى محفوظة عبر Bundle |
| الاستخدام المناسب | حالة مؤقتة داخلية للواجهة فقط | حالة مرئية للمستخدم يجب أن تبقى بعد التدوير | اختر حسب أهمية استمرارية القيمة للمستخدم |

> #### مهم للامتحان ⚠️:
> UI-only, temporary state → `remember` | User-visible state that should survive rotation → `rememberSaveable`

---

### 12. Stateful مقابل Stateless Composables

#### النص الأصلي يقول (English):
> A composable that uses remember to store an object creates internal state, making the composable stateful. Stateful composables are convenient, but they tend to be less reusable and harder to test. A stateless composable is a composable that doesn't hold any state. It receives state via parameters. Stateless Composables are more reusable and easier to test. As you develop reusable composables, you often want to expose both a stateful and a stateless version of the same composable. The stateful version is convenient for callers that don't care about the state. The stateless version is necessary for callers that need to control or hoist the state. An easy way to achieve Stateless Composable is by using state hoisting.

#### الترجمة الحرفية:
> الـ composable الذي يستخدم remember لتخزين كائن يُنشئ حالة داخلية، مما يجعله stateful (يحمل حالة). الـ composables من نوع stateful مريحة، لكنها تميل إلى أن تكون أقل قابلية لإعادة الاستخدام وأصعب في الاختبار. الـ composable من نوع stateless هو composable لا يحمل أي حالة. يستقبل الحالة عبر الوسائط (parameters). الـ composables من نوع stateless أكثر قابلية لإعادة الاستخدام وأسهل في الاختبار. أثناء تطوير composables قابلة لإعادة الاستخدام، غالباً ما ترغب في توفير نسختين، واحدة stateful وأخرى stateless من نفس الـ composable. النسخة stateful مريحة للمستدعين الذين لا يهتمون بالحالة. النسخة stateless ضرورية للمستدعين الذين يحتاجون للتحكّم بالحالة أو رفعها (hoist). طريقة سهلة لتحقيق composable من نوع stateless هي استخدام state hoisting.

#### الشرح المبسّط:
هذا التصنيف يقسّم أي composable إلى نوعين حسب "مكان" تخزين حالته: النوع **Stateful** يحتفظ بحالته داخلياً (عبر remember) وهو مريح للاستخدام السريع لكنه صعب إعادة الاستخدام لأن حالته "محبوسة" بداخله؛ بينما النوع **Stateless** لا يحمل أي حالة على الإطلاق، بل يستقبلها من الخارج كوسائط، مما يجعله مرناً وسهل الاختبار لأنه يتصرف كدالة رياضية بحتة — نفس المدخلات تنتج نفس المخرجات دوماً. السبب المنطقي لتفضيل Stateless في التطبيقات الكبيرة هو أنه يسمح لأكثر من جزء من التطبيق بمشاركة نفس الحالة أو التحكّم بها من مكان مركزي واحد. **تشبيه يومي:** composable الـ Stateful مثل موظف يحتفظ بملاحظاته الخاصة في جيبه ولا يشاركها أحداً، بينما composable الـ Stateless مثل موظف ينفّذ ما يُملى عليه بالضبط من ورقة تعليمات يستلمها من مديره؛ ومثال عملي: `Counter()` الذي يحتفظ بعدّاده داخلياً هو stateful، بينما `Counter(count: Int, onIncrement: () -> Unit)` هو نسخته الـ stateless.

**لماذا؟** لأن اختيار النوع المناسب يوازن بين سهولة الاستخدام السريعة (stateful) والمرونة القابلة لإعادة الاستخدام (stateless) حسب حاجة المشروع.

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| Stateful vs Stateless | Stateful — يحمل حالته داخلياً عبر remember | Stateless — يستقبل حالته من الخارج عبر parameters | Stateful أسهل استخداماً لكن أقل مرونة، Stateless أكثر قابلية لإعادة الاستخدام والاختبار |

---

### 13. مفهوم State Hoisting

#### النص الأصلي يقول (English):
> State hoisting in Compose is a pattern of moving state to a composable's caller to make a composable stateless. The general pattern for state hoisting in Jetpack Compose is to replace the state variable with two parameters: value: T: the current value to display. onValueChange: (T) -> Unit: an event that requests the value to change, where T is the proposed new value. State that is hoisted this way has some important properties: Single source of truth... Encapsulated...

#### الترجمة الحرفية:
> رفع الحالة (State Hoisting) في Compose هو نمط (pattern) لنقل الحالة إلى الجهة المستدعية (caller) للـ composable لجعله بلا حالة (stateless). النمط العام لرفع الحالة في Jetpack Compose هو استبدال متغيّر الحالة بوسيطين: value: T — القيمة الحالية المراد عرضها. onValueChange: (T) -> Unit — حدث يطلب تغيير القيمة، حيث T هي القيمة الجديدة المقترحة. الحالة التي تُرفَع بهذه الطريقة تمتلك بعض الخصائص المهمة: مصدر وحيد للحقيقة (Single source of truth)... مُغلَّفة (Encapsulated)...

#### الشرح المبسّط:
`State Hoisting` هو الأسلوب العملي لتحويل composable من stateful إلى stateless: بدلاً من أن يُنشئ الـ composable حالته الخاصة عبر `remember`، يستقبلها كوسيطين — `value` لعرض القيمة الحالية، و`onValueChange` كحدث يبلّغ المستدعي بأن المستخدم يريد تغيير هذه القيمة. الفائدة الأساسية أن "الحقيقة" (source of truth) تصبح موجودة في مكان واحد فقط بدلاً من أن تتكرر في أماكن متعددة، مما يمنع حدوث تضارب بين نسختين مختلفتين من نفس البيانات. هذا يربط مباشرة بمفهوم Stateless من الفقرة السابقة، لأن State Hoisting هو "الطريقة" الفعلية لتحقيقه. **تشبيه يومي:** مثل موظف استقبال في فندق لا يقرر بنفسه أرقام الغرف المتاحة، بل يعرض فقط ما يخبره به النظام المركزي (value) ويرسل طلبات الحجز إلى ذلك النظام (onValueChange)؛ ومثال عملي: حقل بحث يعرض النص الحالي `query` ويرسل كل تعديل عبر `onQueryChange` إلى الشاشة الأم التي تحتفظ بالقيمة الفعلية.

**لماذا؟** لأن وجود "مصدر وحيد للحقيقة" يمنع تضارب البيانات ويجعل تتبّع الأخطاء أسهل بكثير في التطبيقات الكبيرة.

> #### 💡 التشبيه:
> نمط State Hoisting أشبه بريموت تحكّم يرسل أوامر (onValueChange) إلى تلفاز مركزي (مصدر الحالة) بدلاً من أن يعرض كل تلفاز صورته الخاصة المستقلة.
> **وجه الشبه:** الريموت = composable الـ stateless (يرسل الأحداث فقط)، التلفاز = composable الـ stateful (يحمل الحالة الحقيقية).

---

### 14. خصائص الحالة المرفوعة (Hoisted State)

#### النص الأصلي يقول (English):
> Shareable: Hoisted state can be shared with multiple composables. If you wanted to read name in a different composable, hoisting would allow you to do that. Interceptable: callers to the stateless composables can decide to ignore or modify events before changing the state. Decoupled: the state for the stateless composables may be stored anywhere. For example, it's now possible to move name into a ViewModel.

#### الترجمة الحرفية:
> قابلة للمشاركة (Shareable): يمكن مشاركة الحالة المرفوعة مع عدة composables. إذا أردت قراءة name في composable مختلف، فإن الرفع (hoisting) يتيح لك فعل ذلك. قابلة للاعتراض (Interceptable): يمكن للمستدعين لـ composables الـ stateless أن يقرروا تجاهل أو تعديل الأحداث قبل تغيير الحالة. مفصولة (Decoupled): يمكن تخزين حالة composables الـ stateless في أي مكان. على سبيل المثال، أصبح الآن ممكناً نقل name إلى ViewModel.

#### الشرح المبسّط:
هذه الخصائص الثلاث توضّح لماذا يُعتبر State Hoisting نمطاً قوياً جداً في التصميم: كون الحالة **قابلة للمشاركة** يعني أن أكثر من composable يستطيع قراءة نفس القيمة دون تكرارها؛ وكونها **قابلة للاعتراض** يعني أن المستدعي يمكنه فحص أو تعديل أي تغيير مقترح قبل قبوله فعلياً (مثلاً رفض إدخال نص يتجاوز طولاً معيناً)؛ وكونها **مفصولة** يعني أن مكان تخزين الحالة الفعلي مرن تماماً — يمكن أن يكون متغيّراً محلياً بسيطاً اليوم وينتقل إلى `ViewModel` غداً دون تغيير الـ composable الذي يعرضها. هذا يفسّر لماذا يُستخدم State Hoisting كثيراً عند الانتقال لبناء تطبيقات حقيقية معمارية (Architecture) أكبر. **تشبيه يومي:** كأن لديك سكرتيراً (composable stateless) لا يحتفظ بالمواعيد بنفسه، بل يستقبل الطلبات ويرسلها للمدير الحقيقي (مصدر الحالة) الذي قد يكون دفتر ورقي اليوم ونظاماً إلكترونياً غداً دون أن يتغيّر عمل السكرتير؛ ومثال عملي: نقل حالة تسجيل الدخول من `remember` بسيط إلى `ViewModel` كامل دون تعديل واجهة نموذج تسجيل الدخول نفسها.

**لماذا؟** لأن هذه الخصائص تمنح المطوّر حرية تغيير طريقة تخزين البيانات لاحقاً دون كسر أي واجهة موجودة مسبقاً.

---

### 15. مثال HelloScreen و HelloContent (تطبيق كامل على State Hoisting)

#### النص الأصلي يقول (English):
> Example: extract the name and the onValueChange out of HelloContent and move them up the tree to a HelloScreen composable that calls HelloContent. [HelloScreen and HelloContent code]. By hoisting the state out of HelloContent, it's easier to reason about the composable, reuse it in different situations, and test. HelloContent is decoupled from how its state is stored.

#### الترجمة الحرفية:
> مثال: استخراج name و onValueChange من HelloContent ونقلهما للأعلى في الشجرة إلى composable باسم HelloScreen يستدعي HelloContent. برفع الحالة خارج HelloContent، يصبح من الأسهل فهم الـ composable، وإعادة استخدامه في مواقف مختلفة، واختباره. HelloContent مفصول (decoupled) عن طريقة تخزين حالته.

#### الشرح المبسّط:
هذا المثال هو التطبيق العملي المباشر لكل ما سبق: `HelloContent` أصبح الآن composable نظيفاً بالكامل من نوع stateless — لا يعرف شيئاً عن `remember` ولا يهتم من أين أتى الاسم، بل فقط يعرض ما يُعطى له عبر `name` ويبلّغ عن أي تغيير عبر `onNameChange`. أما `HelloScreen` فهو composable الـ stateful الذي يحمل الحالة الحقيقية عبر `rememberSaveable` ويمرّرها للأسفل. هذا الفصل بين "من يملك البيانات" و"من يعرضها" هو أساس بناء تطبيقات قابلة للتوسّع، لأنك تستطيع الآن اختبار `HelloContent` بمعزل تام دون الحاجة لأي منطق حالة حقيقي. **تشبيه يومي:** كأن `HelloContent` هو شاشة عرض إلكترونية في محطة قطار لا تعرف من أين تأتي أوقات القطارات، بل فقط تعرض ما يُرسَل إليها؛ بينما `HelloScreen` هو النظام المركزي الذي يحدّث تلك الأوقات فعلياً. ومثال عملي: يمكن استخدام `HelloContent` نفسه داخل شاشتين مختلفتين تماماً (شاشة تسجيل وشاشة إعدادات) لأنه لا يحمل أي افتراضات عن مصدر بياناته.

**لماذا؟** لأن هذا الفصل هو ما يمكّن فريق التطوير من إعادة استخدام نفس الواجهة في سياقات متعددة دون نسخ الكود.

#### 💻 الكود: State Hoisting الكامل

#### ما هذا الكود؟
> يوضّح الفصل الكامل بين composable stateless (HelloContent) و composable stateful (HelloScreen) الذي يحمل الحالة الحقيقية.

```kotlin
@Composable
fun HelloScreen() {
    // rememberSaveable keeps the value across configuration changes
    var name by rememberSaveable { mutableStateOf("") }
    // Pass state down, and the event handler up (unidirectional data flow)
    HelloContent(name = name, onNameChange = { name = it })
}

@Composable
fun HelloContent(name: String, onNameChange: (String) -> Unit) {
    // Column arranges children vertically
    Column(modifier = Modifier.padding(16.dp)) {
        // Displays the hoisted state passed as a parameter
        Text(
            text = "Hello, $name",
            modifier = Modifier.padding(bottom = 8.dp),
            style = MaterialTheme.typography.bodyMedium
        )
        // Forwards user input directly to the caller's event handler
        OutlinedTextField(value = name, onValueChange = onNameChange, label = { Text("Name") })
    }
}
```

#### شرح كل سطر:
1. `var name by rememberSaveable { mutableStateOf("") }` → الحالة الحقيقية — موجودة فقط في HelloScreen وتنجو من تدوير الشاشة
2. `HelloContent(name = name, onNameChange = { name = it })` → استدعاء الـ composable الأبناء — تمرير القيمة للأسفل (state) وتمرير معالج التحديث للأعلى (event)
3. `fun HelloContent(name: String, onNameChange: (String) -> Unit)` → توقيع composable الـ stateless — لا يحمل أي `remember` بداخله إطلاقاً
4. `Text(text = "Hello, $name", ...)` → عرض القيمة المستقبَلة فقط — لا يخزّنها بنفسه
5. `OutlinedTextField(value = name, onValueChange = onNameChange, ...)` → تمرير مباشر لمعالج الحدث المُستقبَل من الأعلى إلى الحقل

**الناتج المتوقع (لقطة الشاشة):**
> يعمل تماماً كالمثال السابق من الناحية البصرية، لكن الفرق الجوهري في البنية الداخلية للكود وقابليته لإعادة الاستخدام.

#### 📊 المخطط: تدفق البيانات في State Hoisting

#### ما هذا المخطط؟
> يوضّح اتجاه تدفق الحالة (لأسفل) والأحداث (لأعلى) بين HelloScreen و HelloContent، وهو ما يُعرف بـ Unidirectional Data Flow.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | HelloScreen | composable stateful | يحمل الحالة الحقيقية عبر rememberSaveable |
| 2 | HelloContent | composable stateless | يستقبل الحالة ويعرضها فقط |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| HelloScreen | HelloContent | state (name) | ↓ لأسفل | الحالة تُمرَّر كوسيط من الأب إلى الابن |
| HelloContent | HelloScreen | event (onNameChange) | ↑ لأعلى | الحدث يُرفَع من الابن إلى الأب ليُحدِّث الحالة الحقيقية |

```diagram
type: flowchart
title: State Hoisting Data Flow
direction: TD
nodes:
  - id: screen
    label: HelloScreen (stateful)
    kind: state
    level: 0
  - id: content
    label: HelloContent (stateless)
    kind: event
    level: 1
edges:
  - from: screen
    to: content
    label: state (name) ↓
  - from: content
    to: screen
    label: event (onNameChange) ↑
```

---

### 16. النمط الأحادي الاتجاه لتدفق البيانات (Unidirectional Data Flow)

#### النص الأصلي يقول (English):
> The pattern where the state goes down, and events go up is called a unidirectional data flow. By following unidirectional data flow, you can decouple composables that display state in the UI from the parts of your app that store and change state.

#### الترجمة الحرفية:
> النمط الذي تنزل فيه الحالة للأسفل وترتفع فيه الأحداث للأعلى يُسمّى تدفق البيانات أحادي الاتجاه (unidirectional data flow). باتّباع تدفق البيانات أحادي الاتجاه، يمكنك فصل composables التي تعرض الحالة في الواجهة عن الأجزاء التي تخزّن وتغيّر الحالة في تطبيقك.

#### الشرح المبسّط:
هذا المصطلح — `Unidirectional Data Flow` أو UDF — يلخّص قاعدة معمارية أساسية في Compose: البيانات (State) تسير في اتجاه واحد فقط من الأعلى إلى الأسفل، بينما الطلبات لتغيير تلك البيانات (Events) تسير في الاتجاه المعاكس من الأسفل إلى الأعلى. أهمية هذه القاعدة أنها تجعل تتبّع مصدر أي تغيير في التطبيق أمراً يسيراً، لأنه لا يوجد إلا مسار واحد ممكن للبيانات، على عكس الأنظمة التي تسمح بتعديل البيانات من أي مكان في أي اتجاه فتصبح فوضوية. **تشبيه يومي:** كأن الأمر يشبه سلسلة قيادة عسكرية — الأوامر (الحالة) تنزل من القائد للجنود، والتقارير (الأحداث) تصعد من الجنود للقائد، ولا يُسمح بالفوضى في الاتجاهين معاً؛ ومثال عملي: في تطبيق تسوّق، تنزل قائمة المنتجات من الشاشة الرئيسية إلى بطاقة كل منتج، بينما يصعد حدث "أضف للسلة" من البطاقة إلى الشاشة الرئيسية التي تحدّث السلة الفعلية.

**لماذا؟** لأن هذا النمط يقلل التعقيد بشكل كبير في التطبيقات الكبيرة ويجعل تصحيح الأخطاء أسهل بمعرفة مصدر وحيد للحقيقة دائماً.

---

### 17. قواعد رفع الحالة (Rules of Hoisting)

#### النص الأصلي يقول (English):
> Key Point: When hoisting state, there are three rules to help you figure out where state should go: State should be hoisted to at least the lowest common parent of all composables that use the state (read). State should be hoisted to at least the highest level it may be changed (write). If two states change in response to the same events they should be hoisted together. You can hoist state higher than these rules require, but underhoisting state makes it difficult or impossible to follow unidirectional data flow.

#### الترجمة الحرفية:
> نقطة أساسية: عند رفع الحالة، توجد ثلاث قواعد تساعدك على تحديد أين يجب أن تذهب الحالة: يجب رفع الحالة على الأقل إلى أقرب أصل مشترك (lowest common parent) لجميع composables التي تستخدم تلك الحالة (للقراءة). يجب رفع الحالة على الأقل إلى أعلى مستوى قد تُغيَّر فيه (للكتابة). إذا كانت حالتان تتغيّران استجابةً لنفس الأحداث، يجب رفعهما معاً. يمكنك رفع الحالة أعلى مما تتطلّبه هذه القواعد، لكن عدم رفعها بما يكفي (underhoisting) يجعل اتّباع تدفق البيانات أحادي الاتجاه صعباً أو مستحيلاً.

#### الشرح المبسّط:
هذه القواعد الثلاث تجيب على سؤال عملي مهم جداً: "إلى أي مستوى بالضبط يجب أن أرفع الحالة؟" — والجواب ليس "ارفعها للأعلى قدر الإمكان" بل "ارفعها فقط للمستوى الضروري". القاعدة الأولى تحدد الحد الأدنى بناءً على من يحتاج *قراءة* الحالة، والثانية بناءً على من يحتاج *تعديلها*، والثالثة تنص على أن الحالات المترابطة منطقياً (تتغيّر معاً بنفس الحدث) يجب أن تبقى مجمّعة في نفس المكان لتفادي تشتّت المنطق. السبب المنطقي وراء التحذير من "عدم الرفع الكافي" (underhoisting) هو أنه لو بقيت الحالة في مكان منخفض جداً في الشجرة، فلن يستطيع composable آخر يحتاجها الوصول إليها بسهولة، مما يكسر مبدأ UDF بأكمله. **تشبيه يومي:** كأنك تحدّد أين تضع مفتاح البيت المشترك — ليس مع كل فرد من العائلة على حدة (underhoisting)، بل في مكان مركزي يصل إليه كل من يحتاج الدخول (المستوى الصحيح للرفع)؛ ومثال عملي: إذا كانت شاشتان مختلفتان تحتاجان قراءة نفس اسم المستخدم، يجب رفع تلك الحالة إلى الأب المشترك بينهما وليس تركها داخل إحدى الشاشتين فقط.

**لماذا؟** لأن الرفع الصحيح للمستوى المناسب بالضبط يوازن بين البساطة (عدم الرفع الزائد) والمرونة (تجنّب عدم الرفع الكافي).

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| القاعدة الأولى (Read) | الرفع على الأقل لأقرب أصل مشترك لكل من يقرأ الحالة | يضمن إمكانية الوصول للقراءة من جميع الأطراف المعنية |
| القاعدة الثانية (Write) | الرفع على الأقل لأعلى مستوى قد تُعدَّل فيه الحالة | يضمن أن التعديل يحدث من المكان الصحيح |
| القاعدة الثالثة (Grouping) | الحالات المرتبطة بنفس الحدث تُرفَع معاً | يمنع تشتّت منطق تحديث مترابط في أماكن متفرقة |

---

### 18. مفهوم الـ Composition ودورة حياتها

#### النص الأصلي يقول (English):
> A Composition describes the UI of your app and is produced by running composables. A Composition is a tree-structure of the composables that describe your UI. When Jetpack Compose runs your composables for the first time, during initial composition, it will keep track of the composables that you call to describe your UI in a Composition. Then, when the state of your app changes, Jetpack Compose schedules a recomposition. A Composition can only be produced by an initial composition and updated by recomposition. The only way to modify a Composition is through recomposition.

#### الترجمة الحرفية:
> يصف الـ Composition واجهة تطبيقك، ويُنتَج عن طريق تشغيل composables. الـ Composition هو بنية شجرية (tree-structure) من composables التي تصف واجهتك. عندما يشغّل Jetpack Compose الـ composables الخاصة بك لأول مرة، أثناء التركيب الأولي (initial composition)، سيتتبّع composables التي تستدعيها لوصف واجهتك في Composition. ثم، عندما تتغيّر حالة تطبيقك، يجدول Jetpack Compose عملية إعادة تركيب (recomposition). لا يمكن إنتاج Composition إلا عبر تركيب أولي (initial composition) وتحديثها عبر إعادة التركيب (recomposition). الطريقة الوحيدة لتعديل Composition هي عبر إعادة التركيب.

#### الشرح المبسّط:
هذه الفقرة تقدّم مصطلحاً محورياً جديداً وهو `Composition` — وهو ليس الواجهة المرئية نفسها، بل "بنية شجرية" داخلية يحتفظ بها Compose تصف كل composable تم استدعاؤه وكيف يرتبط بغيره. عندما يُشغَّل التطبيق لأول مرة تحدث "Initial Composition" التي تبني هذه الشجرة من الصفر، وبعدها أي تغيير لاحق لا يبني شجرة جديدة بل "يُحدِّث" الموجودة عبر Recomposition. أهمية هذا الفهم أنه يوضّح أن Compose ليس مجرد "دوال تُنفَّذ"، بل نظام يحتفظ بذاكرة (الـ Composition) عن حالة الواجهة الحالية بأكملها. **تشبيه يومي:** تخيّل شجرة عائلة (Family Tree) تُرسَم لأول مرة بالكامل، ثم كل مرة يولد فيها طفل جديد أو يتغيّر اسم أحد الأفراد، لا تُعاد رسم الشجرة كلها من الصفر بل تُحدَّث الفروع المتأثرة فقط؛ ومثال عملي: أول مرة يُفتح فيها تطبيق تُبنى فيه شاشة تسجيل الدخول بالكامل (Initial Composition)، وعند كتابة كل حرف في حقل كلمة السر تُحدَّث فقط تلك الأجزاء المتأثرة (Recomposition).

**لماذا؟** لأن فهم أن Composition هي بنية بيانات فعلية يفسّر لماذا تكون بعض عمليات إعادة التركيب "ذكية" وتتجنّب إعادة رسم كل شيء من الصفر.

```diagram
type: flowchart
title: Composition Lifecycle
direction: TD
nodes:
  - id: enter
    label: Enter the Composition
    kind: event
    level: 0
  - id: recompose
    label: Recompose 0 or more times
    kind: process
    level: 1
  - id: leave
    label: Leave the Composition
    kind: event
    level: 2
edges:
  - from: enter
    to: recompose
  - from: recompose
    to: leave
```

---

### 19. Recomposition وتتبّع الـ State<T>

#### النص الأصلي يقول (English):
> Recomposition is typically triggered by a change to a State<T> object. Compose tracks these and runs all composables in the Composition that read that particular State<T>, and any composables that they call that cannot be skipped. If a composable is called multiple times, multiple instances are placed in the Composition. Each call has its own lifecycle in the Composition.

#### الترجمة الحرفية:
> عادةً ما تُحفَّز إعادة التركيب (Recomposition) بواسطة تغيير في كائن State<T>. يتتبّع Compose هذه التغييرات ويشغّل جميع composables في الـ Composition التي تقرأ ذلك الـ State<T> تحديداً، وأي composables تستدعيها ولا يمكن تخطّيها. إذا استُدعي composable عدة مرات، تُوضَع عدة نُسَخ (instances) في الـ Composition. لكل استدعاء دورة حياته الخاصة في الـ Composition.

#### الشرح المبسّط:
هذه الفقرة تشرح الآلية الدقيقة التي يقرر بها Compose *ماذا* يعيد تنفيذه بالضبط عند حدوث تغيير — فهو لا يعيد تنفيذ التطبيق بأكمله، بل يتتبّع بدقة أي composable "يقرأ" ذلك الـ `State<T>` المحدد الذي تغيّر، ويعيد تنفيذ تلك الأجزاء فقط (وأي composables متداخلة بداخلها لا يمكن تخطّيها). النقطة الثانية المهمة هي أن استدعاء نفس composable عدة مرات (مثلاً داخل حلقة for) يخلق نسخاً منفصلة تماماً، لكل واحدة دورة حياتها الخاصة المستقلة عن الأخرى. هذا يفسّر لماذا يكون Compose فعّالاً من ناحية الأداء رغم إعادة "وصف" الواجهة باستمرار — لأنه ذكي بما يكفي ليحدّث فقط ما تغيّر فعلاً. **تشبيه يومي:** مثل نظام إنذار في مبنى كبير لا يُطلق صفارة الإنذار في كل الطوابق عند حدوث مشكلة في طابق واحد فقط، بل يحدّد بدقة أي طابق تأثّر ويتعامل معه فقط؛ ومثال عملي: تحديث اسم مستخدم واحد في قائمة من 100 مستخدم يعيد تركيب بطاقة ذلك المستخدم فقط دون لمس الـ 99 بطاقة الأخرى.

**لماذا؟** لأن هذه الدقة في التتبّع هي سرّ الأداء العالي لتطبيقات Compose رغم طبيعتها التصريحية التي تعيد "وصف" الواجهة باستمرار.

---

### 20. تحديد هوية الـ Composable عبر Call Site

#### النص الأصلي يقول (English):
> The instance of a composable in Composition is identified by its call site. The Compose compiler considers each call site as distinct. Calling composables from multiple call sites will create multiple instances of the composable in Composition. If during a recomposition a composable calls different composables than it did during the previous composition, Compose will identify which composables were called or not called and for the composables that were called in both compositions, Compose will avoid recomposing them if their inputs haven't changed. Preserving identity is crucial to associate side effects with their composable, so that they can complete successfully rather than restart for every recomposition.

#### الترجمة الحرفية:
> تُحدَّد هوية نسخة composable في الـ Composition بواسطة موقع استدعائها (call site). يعتبر مترجم Compose كل موقع استدعاء مميّزاً ومنفصلاً. استدعاء composables من عدة مواقع استدعاء مختلفة يُنشئ عدة نُسَخ من الـ composable في الـ Composition. إذا استدعى composable أثناء إعادة تركيب composables مختلفة عمّا استدعاه في التركيب السابق، سيحدد Compose أي composables استُدعيت أو لم تُستدعَ، وبالنسبة لتلك التي استُدعيت في كلا التركيبين، سيتجنّب Compose إعادة تركيبها إذا لم تتغيّر مدخلاتها. الحفاظ على الهوية أمر بالغ الأهمية لربط التأثيرات الجانبية (side effects) بالـ composable الخاص بها، حتى تكتمل بنجاح بدلاً من إعادة التشغيل مع كل إعادة تركيب.

#### الشرح المبسّط:
هذه الفقرة تجيب على سؤال تقني دقيق: كيف يميّز Compose بين نسخة composable وأخرى من نفس الدالة؟ الجواب هو "موقع الاستدعاء" (call site) — أي المكان بالضبط في الكود المصدري حيث استُدعيت الدالة، وليس مجرد اسمها. أهمية هذا المفهوم تظهر في المثال التالي (LoginScreen) حيث يبقى composable بنفس "الهوية" حتى لو تغيّر ترتيب استدعائه، طالما ظل موقع الاستدعاء نفسه في الكود. هذا الحفاظ على الهوية حاسم جداً لأن أي عملية جانبية طويلة (side effect) مثل تحميل صورة من الإنترنت تحتاج أن "تكمل" عملها بدلاً من أن تبدأ من جديد كل مرة تحدث فيها إعادة تركيب. **تشبيه يومي:** مثل بطاقة هوية شخصية ثابتة لكل مقعد في قاعة امتحان — حتى لو تغيّر ترتيب دخول الطلاب، يبقى لكل مقعد رقمه الثابت الذي لا يتغيّر؛ ومثال عملي: composable يحمّل صورة من الشبكة لن يُعيد التحميل من الصفر في كل recomposition ما دام في نفس موقع الاستدعاء ومدخلاته لم تتغيّر.

**لماذا؟** لأن فقدان "الهوية" بين إعادات التركيب يعني إلغاء وإعادة تشغيل أي عملية جارية (كتحميل بيانات)، مما يهدر الموارد ويبطئ التطبيق.

#### 💻 الكود: LoginScreen — الحفاظ على الهوية رغم تغيّر الترتيب

#### ما هذا الكود؟
> يوضّح أن LoginInput يحتفظ بهويته وحالته حتى عندما يتغيّر ترتيب استدعائه بعد ظهور LoginError.

```kotlin
@Composable
fun LoginScreen(showError: Boolean) {
    // Conditionally calls LoginError based on state
    if (showError) {
        LoginError()
    }
    // This call site affects where LoginInput is placed in Composition
    LoginInput()
}

@Composable
fun LoginInput() { /* ... */ }

@Composable
fun LoginError() { /* ... */ }
```

#### شرح كل سطر:
1. `if (showError) { LoginError() }` → استدعاء شرطي — LoginError يُستدعى فقط عند وجود خطأ
2. `LoginInput()` → استدعاء دائم — يُستدعى دوماً بغض النظر عن showError، وموقع استدعائه هذا هو ما يحدد هويته
3. `fun LoginInput() {...}` / `fun LoginError() {...}` → تعريفا composable منفصلان، لكل منهما موقع استدعاء فريد ومستقل

**الناتج المتوقع (لقطة الشاشة):**
> عند تغيّر showError إلى true، تُضاف رسالة الخطأ في الأعلى، لكن مكوّن LoginInput نفسه لا يُعاد إنشاؤه من الصفر لأن موقع استدعائه وحالته الداخلية محفوظان.

---

### 21. الاستدعاءات المتعددة من نفس موقع الاستدعاء (Execution Order)

#### النص الأصلي يقول (English):
> Calling a composable multiple times will add it to Composition multiple times as well. When calling a composable multiple times from the same call site, Compose doesn't have any information to uniquely identify each call to that composable, so the execution order is used in addition to the call site in order to keep the instances distinct. Compose uses the execution order in addition to the call site to keep the instance distinct in the Composition. If a new movie is added to the bottom of the list, Compose can reuse the instances already in the Composition since their location in the list haven't changed and therefore, the movie input is the same for those instances.

#### الترجمة الحرفية:
> استدعاء composable عدة مرات سيضيفه إلى الـ Composition عدة مرات أيضاً. عند استدعاء composable عدة مرات من نفس موقع الاستدعاء، لا يملك Compose أي معلومة لتمييز كل استدعاء لذلك composable بشكل فريد، لذلك يُستخدَم ترتيب التنفيذ (execution order) بالإضافة إلى موقع الاستدعاء للحفاظ على تمييز النُسَخ. يستخدم Compose ترتيب التنفيذ بالإضافة إلى موقع الاستدعاء للحفاظ على تمييز النسخة في الـ Composition. إذا أُضيف فيلم جديد إلى أسفل القائمة، يستطيع Compose إعادة استخدام النُسَخ الموجودة بالفعل في الـ Composition لأن موقعها في القائمة لم يتغيّر، وبالتالي فإن مدخل الفيلم (movie input) نفسه بالنسبة لتلك النُسَخ.

#### الشرح المبسّط:
هنا نرى حالة أكثر تعقيداً من السابقة: ماذا لو استُدعي نفس composable عدة مرات من نفس موقع الاستدعاء بالضبط، مثل داخل حلقة `for` تمرّ على قائمة أفلام؟ في هذه الحالة يعتمد Compose على "ترتيب التنفيذ" (الفهرس/الموضع) بالإضافة إلى موقع الاستدعاء لتمييز كل نسخة. هذا يعمل بشكل جيد عندما تُضاف عناصر جديدة في **نهاية** القائمة فقط، لأن كل عنصر قديم يحافظ على نفس موضعه، فيتعرّف عليه Compose ويعيد استخدامه بدلاً من إعادة إنشائه من الصفر. **تشبيه يومي:** مثل طابور أشخاص مرقّمين بالترتيب — إذا انضم شخص جديد إلى آخر الطابور، يبقى كل من سبقه بنفس رقمه؛ لكن لو دخل شخص جديد في المنتصف، تتغيّر أرقام كل من بعده. ومثال عملي: قائمة تعليقات تُعرَض بحلقة for، وإضافة تعليق جديد في الأسفل لا تُسبّب إعادة إنشاء بطاقات التعليقات السابقة.

**لماذا؟** لأن هذا السلوك يفسّر لماذا تحدث مشاكل أداء أو فقدان حالة عند إضافة عناصر في **منتصف** أو **بداية** القائمة، وهو ما ستشرحه الفقرة التالية.

#### 📊 المخطط: إضافة عنصر لأسفل القائمة (سلوك آمن)

#### ما هذا المخطط؟
> يوضّح كيف يعيد Compose استخدام نُسَخ MovieOverview الموجودة عندما يُضاف فيلم جديد في نهاية القائمة فقط.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | MoviesScreen | composable جذر | يستقبل قائمة الأفلام كوسيط |
| 2 | Column | حاوية | ترتّب بطاقات الأفلام عمودياً |
| 3 | MovieOverview (×N) | composable مكرر | نسخة لكل فيلم في القائمة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Column | MovieOverview | for loop | → عادي | كل تكرار في الحلقة ينشئ أو يعيد استخدام نسخة |

```diagram
type: flowchart
title: Reuse on Append (Safe)
direction: TD
nodes:
  - id: screen
    label: MoviesScreen
    kind: root
    level: 0
  - id: column
    label: Column
    kind: container
    level: 1
  - id: m1
    label: MovieOverview (existing)
    kind: reused
    level: 2
  - id: m2
    label: MovieOverview (existing)
    kind: reused
    level: 2
  - id: m3
    label: MovieOverview (new, appended)
    kind: new
    level: 2
edges:
  - from: screen
    to: column
  - from: column
    to: m1
  - from: column
    to: m2
  - from: column
    to: m3
```

---

### 22. مشكلة الإضافة في أعلى/منتصف القائمة والحاجة للـ key

#### النص الأصلي يقول (English):
> If the movies list changes by either adding to the top or the middle of the list, removing or reordering items, it'll cause a recomposition in all MovieOverview calls whose input parameter has changed position in the list. Example, MovieOverview fetches a movie image using a side effect. If recomposition happens while the effect is in progress, it will be cancelled and will start again.

#### الترجمة الحرفية:
> إذا تغيّرت قائمة الأفلام إما بالإضافة في الأعلى أو في المنتصف، أو بحذف عناصر أو إعادة ترتيبها، فسيتسبّب ذلك في إعادة تركيب لجميع استدعاءات MovieOverview التي تغيّر موضع وسيطها المدخل في القائمة. مثال، يجلب MovieOverview صورة فيلم باستخدام تأثير جانبي (side effect). إذا حدثت إعادة تركيب أثناء تقدّم ذلك التأثير، سيُلغى ويبدأ من جديد.

#### الشرح المبسّط:
هنا تظهر المشكلة الحقيقية: عندما يتغيّر **موضع** أي عنصر في القائمة (وليس فقط الإضافة في الآخر)، يعتقد Compose خطأً أن "المدخل" لتلك النسخة قد تغيّر لأن الترتيب يعتمد على الموضع فقط. النتيجة العملية الخطيرة: أي عملية جارية (side effect) مثل تحميل صورة فيلم من الإنترنت، ستُلغى وتبدأ من الصفر رغم أن الفيلم نفسه لم يتغيّر فعلياً، بل فقط تغيّر موضعه في القائمة. هذا يفسّر أهمية الفقرة القادمة عن استخدام `key()` كحلّ لهذه المشكلة بالتحديد. **تشبيه يومي:** مثل موظف بريد يوزّع الطرود حسب رقم البيت فقط بدلاً من اسم المستلم — إذا انتقل ساكن من البيت رقم 3 إلى رقم 5، سيظن الموظف خطأً أن شخصاً جديداً انتقل لكلا البيتين ويعيد كل الإجراءات من الصفر؛ ومثال عملي: إضافة فيلم جديد في **أعلى** قائمة أفلام تُسبّب إعادة تحميل كل صور الأفلام الأخرى من جديد رغم أنها لم تتغيّر فعلياً.

**لماذا؟** لأن هذا السلوك غير المرغوب يهدر موارد الشبكة والمعالجة، ويمكن أن يسبب "وميضاً" مزعجاً في الواجهة (flickering) عند كل تعديل على ترتيب القائمة.

> #### الفهم الخاطئ الشائع ❌: إضافة عنصر لأي مكان في القائمة آمن دائماً ولن يؤثر على العناصر الأخرى.
> #### الفهم الصحيح ✅: الإضافة أو الحذف في أي مكان غير النهاية يغيّر مواضع العناصر التالية، مما يسبب إعادة تركيب غير ضرورية لها ما لم تُستخدَم `key()`.

---

### 23. حل المشكلة عبر key composable

#### النص الأصلي يقول (English):
> Compose provides a way for you to tell the runtime what values you want to use to identify a given part of the tree: the key composable. By wrapping a block of code with a call to the key composable with one or more values passed in, those values will be combined to be used to identify that instance in the composition.

#### الترجمة الحرفية:
> يوفّر Compose طريقة لإخبار بيئة التشغيل بالقيم التي تريد استخدامها لتمييز جزء معيّن من الشجرة: الـ key composable. بتغليف كتلة من الكود باستدعاء لـ key composable مع تمرير قيمة واحدة أو أكثر، ستُدمَج تلك القيم لاستخدامها في تمييز تلك النسخة في الـ composition.

#### الشرح المبسّط:
هذا هو الحل المباشر للمشكلة السابقة: بدلاً من الاعتماد على "الموضع" في القائمة لتمييز كل نسخة، يمكننا استخدام `key(movie.id)` لإخبار Compose صراحةً أن الهوية الحقيقية لكل نسخة هي معرّف الفيلم الفريد `id`، وليس موضعه في القائمة. بهذه الطريقة، حتى لو تغيّر ترتيب الفيلم أو أُضيف عنصر في المنتصف، يتعرّف Compose على أن هذا "نفس الفيلم" ولا يعيد تشغيل عملياته الجانبية من جديد. هذا يحل المشكلة تماماً لأنه يربط الهوية بالبيانات الفعلية بدلاً من الترتيب العرضي في القائمة. **تشبيه يومي:** مثل استخدام الرقم الوطني بدلاً من رقم الدور في الطابور لتمييز كل شخص — حتى لو تغيّر ترتيب الطابور، يبقى الرقم الوطني ثابتاً ويُعرَف صاحبه بدقة؛ ومثال عملي: `key(movie.id) { MovieOverview(movie) }` يضمن استمرار تحميل صورة الفيلم بشكل صحيح حتى عند إعادة ترتيب القائمة.

**لماذا؟** لأن ربط الهوية بمعرّف حقيقي وليس بالموضع فقط، هو الممارسة الصحيحة والموصى بها دائماً عند عرض قوائم ديناميكية في Compose.

#### 💻 الكود: MoviesScreenWithKey

#### ما هذا الكود؟
> يستخدم `key(movie.id)` لضمان الحفاظ على هوية كل MovieOverview بشكل صحيح بغض النظر عن ترتيب القائمة.

```kotlin
@Composable
fun MoviesScreenWithKey(movies: List<Movie>) {
    // Column arranges movie cards vertically
    Column {
        for (movie in movies) {
            // key(movie.id) ties identity to the actual movie, not its position
            key(movie.id) {
                MovieOverview(movie)
            }
        }
    }
}
```

#### شرح كل سطر:
1. `for (movie in movies)` → حلقة تكرار — تمرّ على كل فيلم في القائمة
2. `key(movie.id) { ... }` → تغليف بمعرّف فريد — يخبر Compose أن الهوية تعتمد على `id` الفيلم لا على موضعه
3. `MovieOverview(movie)` → عرض الفيلم — النسخة الآن مرتبطة بهوية ثابتة تنجو من إعادة الترتيب

**المكتبات المطلوبة (Imports):**
> `import androidx.compose.runtime.key`

**الناتج المتوقع (لقطة الشاشة):**
> إعادة ترتيب أو إضافة أفلام في أي مكان بالقائمة لا يُسبّب إعادة تحميل صور الأفلام الأخرى، لأن Compose يتعرّف على هويتها الصحيحة عبر `id`.

> #### مهم للامتحان ⚠️:
> استخدم `key()` لمساعدة Compose على تمييز نُسَخ composable في الـ Composition. مهم جداً عندما تُستدعى عدة composables من نفس موقع الاستدعاء وتحتوي على side-effects أو حالة داخلية.

---

### 24. تعريف Navigation

#### النص الأصلي يقول (English):
> Navigation refers to the interactions that let users navigate across, into, and back out from the different pieces of content within your app. Navigation is the process of moving between different UI destinations. In modern Android development, multi-screen apps are built using the Jetpack Navigation component. In Jetpack Compose, navigation represents a state-driven transition between UI destinations. Each screen is a composable function. Each composable represents a destination. Navigation does not create new UI — it describes which UI to display. Navigation updates the visible UI based on destination state.

#### الترجمة الحرفية:
> يشير التنقل (Navigation) إلى التفاعلات التي تتيح للمستخدمين التنقل عبر، إلى، والخروج من مختلف أجزاء المحتوى داخل تطبيقك. التنقل هو عملية الانتقال بين وجهات واجهة مستخدم مختلفة. في تطوير أندرويد الحديث، تُبنى التطبيقات متعددة الشاشات باستخدام مكوّن Jetpack Navigation. في Jetpack Compose، يمثّل التنقل انتقالاً مدفوعاً بالحالة (state-driven) بين وجهات الواجهة. كل شاشة هي دالة composable. كل composable يمثّل وجهة (destination). التنقل لا يُنشئ واجهة جديدة — بل يصف أي واجهة يجب عرضها. يحدّث التنقل الواجهة المرئية بناءً على حالة الوجهة.

#### الشرح المبسّط:
هذا الانتقال من موضوع الحالة إلى موضوع التنقل ليس عشوائياً؛ فالتنقل في Compose هو في الأساس **تطبيق مباشر** لكل ما تعلّمناه عن الحالة: "الشاشة الحالية المعروضة" هي نفسها نوع من الـ State، وكل ضغطة على زر "الذهاب لصفحة أخرى" هي Event يُحدِّث تلك الحالة، فتُعاد رسم (recompose) الواجهة لتعرض composable مختلفاً. أهمية هذا الربط أن التنقل لا يُنشئ فعلياً "شاشات جديدة" بالمعنى التقليدي كما في نظام الـ Activities والـ Fragments، بل يصف فقط أي composable يجب عرضه في لحظة معينة بناءً على حالة داخلية تُدعى "الوجهة الحالية". **تشبيه يومي:** مثل جهاز تحكّم عن بُعد للتلفاز — تغيير القناة (التنقل) لا "ينشئ" تلفازاً جديداً، بل فقط يغيّر ما يُعرَض على نفس الشاشة بناءً على رقم القناة الحالي (الحالة)؛ ومثال عملي: الانتقال من شاشة "الرئيسية" إلى شاشة "التفاصيل" في تطبيق تسوّق لا يفتح نافذة جديدة، بل يستبدل محتوى نفس الحاوية بـ composable آخر.

**لماذا؟** لأن فهم أن التنقل هو "حالة" وليس إنشاءً فعلياً لواجهات جديدة، يفسّر كل الآليات اللاحقة مثل NavController و Back Stack.

> #### 💡 التشبيه:
> Navigation is a state-driven UI transition implemented through recomposition — التنقل ما هو إلا حالة جديدة تُطبَّق عبر إعادة التركيب.

---

### 25. مقارنة التنقل التقليدي (View System) مقابل Jetpack Compose

#### النص الأصلي يقول (English):
> Traditional Android UI (View System): Navigation is primarily managed using Activities and Fragments... UI updates follow an imperative approach... Back stack management is handled explicitly through fragment transactions and activity lifecycle. Jetpack Compose: Navigation is built around a declarative UI paradigm... Navigation is state-driven, where UI changes occur as a result of state updates... UI rendering is handled through recomposition, eliminating the need for manual UI transactions.

#### الترجمة الحرفية:
> واجهة أندرويد التقليدية (نظام Views): يُدار التنقل بشكل أساسي باستخدام Activities و Fragments... تتبع تحديثات الواجهة نهجاً إلزامياً (imperative)... تُدار Back stack صراحةً عبر معاملات fragment ودورة حياة activity. Jetpack Compose: يُبنى التنقل حول نموذج واجهة تصريحي (declarative)... التنقل مدفوع بالحالة، حيث تحدث تغييرات الواجهة نتيجة لتحديثات الحالة... تُدار عملية رسم الواجهة عبر إعادة التركيب، مما يُلغي الحاجة لمعاملات واجهة يدوية.

#### الشرح المبسّط:
هذا الجدول المقارن يلخّص التحوّل الجذري في فلسفة التنقل بين النظامين: في النظام التقليدي، كان المطوّر يتحكّم يدوياً في كل خطوة عبر `FragmentManager` ومعاملات صريحة، بينما في Compose أصبح التنقل مجرد نتيجة طبيعية لتغيّر حالة، تماماً مثل أي تحديث آخر في الواجهة. أهمية هذا التغيير أنه يوحّد طريقة التفكير في بناء التطبيق بأكمله تحت مبدأ واحد: كل شيء هو حالة، وكل تغيير يحدث عبر إعادة تركيب. **تشبيه يومي:** مثل الفرق بين قيادة سيارة يدوية تتطلّب تدخّلاً مستمراً في كل تفصيل (Fragments/Activities) وسيارة أوتوماتيكية تدير نفسها تلقائياً بناءً على إعدادات عامة (state-driven navigation)؛ ومثال عملي: في Compose، لا حاجة لكتابة معاملات `FragmentTransaction` يدوياً، بل يكفي تغيير قيمة الوجهة الحالية ليتم كل شيء تلقائياً.

**لماذا؟** لأن فهم هذا الفرق التاريخي يساعد الطالب على تقدير سبب تبسيط Compose لعملية التنقل مقارنة بالنظام القديم.

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| نظام التنقل | View System (Activities/Fragments) — imperative، إدارة يدوية للـ back stack | Jetpack Compose — declarative، state-driven، عبر recomposition | Compose يلغي الحاجة للتحكّم اليدوي بمعاملات الواجهة |

---

### 26. المفاهيم الأساسية للتنقل: Host, Graph, Controller, Destination, Route

#### النص الأصلي يقول (English):
> Host: A UI element that contains the current navigation destination... Graph: A data structure that defines all the navigation destinations within the app and how they connect together... Controller: The central coordinator for managing navigation between destinations... Destination: A node in the navigation graph... Route: Uniquely identifies a destination and any data required by it.

#### الترجمة الحرفية:
> المضيف (Host): عنصر واجهة يحتوي على وجهة التنقل الحالية... الرسم البياني (Graph): بنية بيانات تُعرِّف جميع وجهات التنقل داخل التطبيق وكيفية ارتباطها ببعضها... المتحكّم (Controller): المنسّق المركزي لإدارة التنقل بين الوجهات... الوجهة (Destination): عقدة (node) في رسم التنقل البياني... المسار (Route): يحدّد بشكل فريد وجهة وأي بيانات مطلوبة لها.

#### الشرح المبسّط:
هذه خمسة مصطلحات مترابطة تشكّل معاً منظومة التنقل الكاملة في Compose، ويجب فهم دور كل واحد منها بدقة لتجنّب الخلط بينها: `NavHost` هو "الحاوية المرئية" التي تعرض الوجهة الحالية فقط، `NavGraph` هو "الخريطة الكاملة" لكل الوجهات الممكنة وعلاقاتها، `NavController` هو "العقل المدبّر" الذي يقرر أي وجهة تُعرَض الآن ويدير سجل التنقل، `NavDestination` هي كل "محطة" فردية في تلك الخريطة، و`Route` هو "الاسم الفريد" الذي نستخدمه للإشارة لتلك المحطة عند طلب الانتقال إليها. فهم هذه الخمسة معاً كنظام متكامل هو مفتاح بناء أي تنقل صحيح في Compose. **تشبيه يومي:** تخيّل نظام مترو أنفاق كامل — الـ Graph هو خريطة الخطوط الكاملة المعلّقة على الحائط، الـ Controller هو موظف غرفة التحكّم الذي يوجّه القطارات، الـ Host هو الرصيف الذي يظهر عليه القطار الحالي فقط، الـ Destination هي كل محطة فردية، والـ Route هو اسم تلك المحطة المكتوب على التذكرة؛ ومثال عملي: `NavController.navigate("details")` يشبه طلب تذكرة باسم محطة "التفاصيل" فيقوم موظف التحكّم بتوجيه القطار (الواجهة) إليها.

**لماذا؟** لأن الخلط بين هذه المصطلحات الخمسة هو سبب شائع لأخطاء الفهم لدى المبتدئين في التعامل مع Navigation Compose.

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `NavHost` | حاوية تعرض الوجهة الحالية فقط | يُستبدَل محتواه عند كل تنقل |
| `NavGraph` | بنية بيانات تحوي كل الوجهات وعلاقاتها | يُبنى عادةً داخل NavHost |
| `NavController` | المنسّق المركزي — يدير التنقل والـ Back Stack | يُنشأ عبر `rememberNavController()` |
| `NavDestination` | عقدة واحدة تمثّل شاشة | تُنشأ عند بناء الرسم البياني |
| `Route` | معرّف نصي فريد للوجهة | نص (String) أو نوع بيانات قابل للتسلسل |

---

### 27. إضافة Navigation Component وإنشاء NavController

#### النص الأصلي يقول (English):
> To include navigation support in your project, add the following dependency: implementation("androidx.navigation:navigation-compose:$nav_version"). The navigation controller holds the navigation graph and exposes methods that allow your app to move between the destinations in the graph. NavController is the central navigation API. To create a NavController when using Jetpack Compose, call rememberNavController(). Each NavHost you create has its own corresponding NavController.

#### الترجمة الحرفية:
> لإضافة دعم التنقل في مشروعك، أضف الاعتمادية (dependency) التالية: implementation("androidx.navigation:navigation-compose:$nav_version"). يحمل متحكّم التنقل رسم التنقل البياني ويعرض دوالاً تتيح لتطبيقك الانتقال بين الوجهات في ذلك الرسم البياني. NavController هو واجهة برمجة التنقل المركزية. لإنشاء NavController عند استخدام Jetpack Compose، استدعِ rememberNavController(). لكل NavHost تنشئه، يوجد NavController خاص به مقابل.

#### الشرح المبسّط:
هذه الخطوة العملية الأولى في بناء أي نظام تنقل: يجب أولاً إضافة مكتبة `navigation-compose` كاعتمادية في ملف `build.gradle`، ثم إنشاء `NavController` عبر دالة `rememberNavController()` التي تلاحظ استخدامها لكلمة `remember` — أي أن الـ NavController نفسه هو نوع من الحالة (State) يجب أن ينجو من إعادات التركيب، بالضبط كأي حالة أخرى تعلّمناها سابقاً! هذا يربط بشكل جميل بين موضوعي المحاضرة (الحالة والتنقل): NavController هو ببساطة حالة خاصة يديرها Compose لتتبّع الشاشة الحالية. **تشبيه يومي:** مثل تعيين مدير جديد لمشروع معيّن — لا يمكن أن يكون هناك مشروعان لهما نفس المدير المسؤول عنهما في نفس الوقت، كل مشروع (NavHost) له مديره الخاص (NavController)؛ ومثال عملي: `val navController = rememberNavController()` يُكتب مرة واحدة في أعلى شجرة composable ويُمرَّر لكل الشاشات التي تحتاج التنقل.

**لماذا؟** لأن استخدام `remember` هنا يضمن بقاء نفس NavController طوال حياة الشاشة، بدلاً من إعادة إنشائه من الصفر مع كل recomposition وفقدان سجل التنقل بأكمله.

#### 💻 الكود: إعداد Gradle و إنشاء NavController

#### ما هذا الكود؟
> يوضّح خطوتي الإعداد الأساسيتين: إضافة الاعتمادية، ثم إنشاء متحكّم التنقل.

```kotlin
// build.gradle dependency
dependencies {
    val nav_version = "2.9.7"
    implementation("androidx.navigation:navigation-compose:$nav_version")
}
```

```kotlin
// Creating the NavController — remembered to survive recomposition
val navController = rememberNavController()
```

**الناتج المتوقع:**
> مشروع مهيّأ بالكامل لاستخدام Navigation Compose، مع متحكّم تنقل جاهز للاستخدام في بناء الرسم البياني.

---

### 28. إنشاء Navigation Graph وأنواع الوجهات

#### النص الأصلي يقول (English):
> The Navigation component uses a navigation graph to manage your app's navigation. The navigation graph is a data structure that contains each destination within your app and the connections between them. There are three types of destinations: hosted, dialog, and activity. Hosted: Fills the entire navigation host... Dialog: Presents overlay UI components... Activity: Represents unique screens or features within the app, serve as an exit point to the navigation graph that starts a new Android activity.

#### الترجمة الحرفية:
> يستخدم مكوّن Navigation رسماً بيانياً للتنقل (navigation graph) لإدارة تنقل تطبيقك. رسم التنقل البياني هو بنية بيانات تحتوي كل وجهة داخل تطبيقك والروابط بينها. توجد ثلاثة أنواع من الوجهات: hosted و dialog و activity. Hosted: يملأ مضيف التنقل بالكامل... Dialog: يعرض مكوّنات واجهة متراكبة (overlay)... Activity: يمثّل شاشات أو ميزات فريدة داخل التطبيق، ويُستخدَم كنقطة خروج من رسم التنقل تبدأ نشاطاً (activity) أندرويد جديداً.

#### الشرح المبسّط:
ليست كل الوجهات متشابهة في طريقة عرضها: النوع **Hosted** هو الأكثر شيوعاً ويملأ الشاشة بالكامل تماماً مثل الانتقال بين شاشة رئيسية وشاشة تفاصيل. النوع **Dialog** لا يملأ الشاشة بل يظهر كنافذة عائمة فوق المحتوى الحالي مع بقاء ما تحته مرئياً، وهو مناسب للتنبيهات والاختيارات السريعة. النوع **Activity** هو الاستثناء — فهو ليس composable على الإطلاق، بل يمثّل الخروج الكامل من نظام Compose Navigation لبدء Activity أندرويد منفصلة تماماً، وهذا مفيد بشكل خاص عند التعامل مع مكتبات خارجية أو أثناء ترحيل تطبيق قديم تدريجياً لنظام Compose. **تشبيه يومي:** Hosted مثل الانتقال بين غرف داخل نفس البيت (لا ترى الغرفة السابقة)، Dialog مثل فتح نافذة صغيرة منبثقة فوق طاولة العمل بدون مغادرة المكتب، وActivity مثل الخروج من البيت بالكامل والذهاب لمبنى آخر تماماً؛ ومثال عملي: شاشة الملف الشخصي (Hosted)، نافذة تأكيد الحذف (Dialog)، وفتح تطبيق كاميرا خارجي (Activity destination).

**لماذا؟** لأن اختيار نوع الوجهة الصحيح يحدد تجربة المستخدم البصرية بشكل كبير — هل الشاشة السابقة تختفي تماماً أم تبقى مرئية جزئياً خلف المحتوى الجديد.

| النوع | الوصف | حالات الاستخدام |
| --- | --- | --- |
| Hosted | يملأ مضيف التنقل بالكامل، الوجهة السابقة تختفي تماماً | الشاشة الرئيسية وشاشة التفاصيل |
| Dialog | نافذة متراكبة، الوجهة السابقة تبقى مرئية تحتها | التنبيهات، الاختيارات، النماذج |
| Activity | نقطة خروج تبدأ Activity أندرويد جديدة منفصلة | التفاعل مع أنشطة طرف ثالث، الترحيل التدريجي |

> #### ملاحظة:
> رسم التنقل البياني (navigation graph) مختلف تماماً عن الـ Back Stack، فالأول هو "خريطة الاحتمالات الكاملة" بينما الثاني هو "سجل الزيارات الفعلي" للمستخدم.

---

### 29. NavHost وطريقتا بناء الرسم البياني

#### النص الأصلي يقول (English):
> In Jetpack Compose, navigation is managed using the NavHost composable. The NavHost: Acts as a container for composable destinations. Connects to a NavController. Displays the current screen based on navigation state. You can create the Navigation Graph in two ways: Graph Defined Inside NavHost... Graph Created Programmatically: Use the NavController.createGraph() method...

#### الترجمة الحرفية:
> في Jetpack Compose، يُدار التنقل باستخدام composable باسم NavHost. الـ NavHost: يعمل كحاوية لوجهات composable. يتصل بـ NavController. يعرض الشاشة الحالية بناءً على حالة التنقل. يمكنك إنشاء رسم التنقل البياني بطريقتين: الرسم البياني معرَّف داخل NavHost... الرسم البياني مُنشأ برمجياً: استخدام دالة NavController.createGraph()...

#### الشرح المبسّط:
هنا نرى التطبيق العملي المباشر للمفاهيم النظرية السابقة: `NavHost` هو composable حقيقي يُكتَب في الكود، يربط بين `NavController` (الذي أنشأناه سابقاً) ورسم بياني يحدد كل الوجهات المتاحة. توجد طريقتان لتعريف هذا الرسم البياني: الأولى وهي الأكثر شيوعاً والمباشرة — كتابة كل الوجهات مباشرة داخل `NavHost { ... }` عبر دالة `composable()` لكل مسار؛ والثانية أكثر تقدماً — بناء الرسم البياني بشكل منفصل عبر `createGraph()` ثم تمريره جاهزاً لـ NavHost، وهذا مفيد عندما تريد فصل منطق بناء الرسم البياني عن كود الواجهة. **تشبيه يومي:** الطريقة الأولى مثل رسم خريطة المدينة مباشرة على نفس اللوحة المعلّقة في الاستقبال، بينما الطريقة الثانية مثل رسم الخريطة في غرفة منفصلة ثم تعليقها لاحقاً في الاستقبال؛ ومثال عملي: `NavHost(navController, startDestination = "home") { composable("home") { HomeScreen() } }` هي أبسط طريقة للبدء بمشروع صغير.

**لماذا؟** لأن معرفة الطريقتين تمنح المطوّر المرونة لاختيار الأسلوب الأنسب حسب حجم وتعقيد مشروعه.

#### 💻 الكود: NavHost — الطريقتان

#### ما هذا الكود؟
> يعرض الطريقتين لإنشاء رسم التنقل البياني: داخل NavHost مباشرة، أو برمجياً عبر createGraph().

```kotlin
// Method 1: Graph defined inline inside NavHost
NavHost(
    navController = navController,
    startDestination = "home"
) {
    composable("home") { HomeScreen() }
    composable("details") { DetailsScreen() }
}
```

```kotlin
// Method 2: Graph created programmatically, then passed to NavHost
val graph = navController.createGraph(startDestination = "home") {
    composable("home") { HomeScreen() }
    composable("details") { DetailsScreen() }
}

NavHost(
    navController = navController,
    graph = graph
)
```

#### شرح كل سطر:
1. `NavHost(navController = navController, startDestination = "home")` → إنشاء الحاوية — تربطها بالمتحكّم وتحدد أول شاشة تظهر
2. `composable("home") { HomeScreen() }` → تعريف وجهة — يربط مساراً نصياً بـ composable معيّن
3. `val graph = navController.createGraph(...)` → بناء منفصل — إنشاء الرسم البياني ككائن مستقل قبل استخدامه
4. `NavHost(navController = navController, graph = graph)` → تمرير الرسم الجاهز — بدلاً من تعريفه inline

**الناتج المتوقع:**
> عند تشغيل التطبيق، تظهر شاشة "home" أولاً بما أنها startDestination، وكلا الأسلوبين ينتجان نفس السلوك تماماً.

---

### 30. التنقل الفعلي عبر navigate()

#### النص الأصلي يقول (English):
> The primary API for navigation in the Navigation component is NavController.navigate(route: String). route: a string identifier that must match the route defined in the composable() destination within the NavGraph. Calling navigate(): Navigates between composable destinations. Updates the navigation back stack maintained by the NavController. Triggers UI updates indirectly through state observation. When navigate() is invoked on the NavController, it modifies the navigation back stack. This change is observed by the NavHost, which recomposes and renders the Composable associated with the current destination.

#### الترجمة الحرفية:
> واجهة البرمجة الأساسية للتنقل في مكوّن Navigation هي NavController.navigate(route: String). route: معرّف نصي يجب أن يطابق المسار المعرَّف في وجهة composable() داخل NavGraph. استدعاء navigate(): ينتقل بين وجهات composable. يحدّث سجل التنقل الخلفي (back stack) الذي يحتفظ به NavController. يحفّز تحديثات الواجهة بشكل غير مباشر عبر مراقبة الحالة. عندما تُستدعى navigate() على NavController، فإنها تعدّل سجل التنقل الخلفي. تُلاحَظ هذه التغيير من قِبل NavHost، الذي يعيد التركيب ويرسم الـ Composable المرتبط بالوجهة الحالية.

#### الشرح المبسّط:
هذه الفقرة تربط أخيراً كل خيوط المحاضرة معاً: استدعاء `navigate("details")` لا "يفتح شاشة" بطريقة سحرية، بل يقوم بخطوة واحدة بسيطة — تعديل سجل الـ Back Stack داخل NavController. لكن NavController هو نفسه حالة (State) يراقبها NavHost، لذلك بمجرد تعديل ذلك السجل، يكتشف NavHost التغيير تلقائياً ويعيد التركيب (recomposition) ليعرض composable الجديد المرتبط بالوجهة الحالية. هذا بالضبط هو معنى عبارة "Navigation is a state-driven UI transition implemented through recomposition" التي رأيناها سابقاً — الآن أصبحنا نفهمها على مستوى الكود الفعلي. **تشبيه يومي:** مثل تحديث رقم صفحة في كتاب إلكتروني — تغيير الرقم (navigate) لا "يطبع" صفحة جديدة، بل فقط يخبر التطبيق أي صفحة يعرضها الآن، فيعيد رسم الشاشة تلقائياً؛ ومثال عملي: `navController.navigate("details")` بعد الضغط على زر ينقل المستخدم لشاشة التفاصيل عبر إعادة تركيب تلقائية.

**لماذا؟** لأن هذا يوضّح أن Navigation ليس نظاماً منفصلاً بقواعده الخاصة، بل هو تطبيق مباشر ومباشر تماماً لمبادئ الحالة وإعادة التركيب التي تعلّمناها في بداية المحاضرة.

#### 💻 الكود: تنقل أساسي كامل بين شاشتين

#### ما هذا الكود؟
> مثال متكامل يوضّح NavHost مع شاشتين، وكيفية التنقل بينهما عبر أزرار مع تطبيق مبدأ Unidirectional Data Flow (تمرير event بدلاً من NavController مباشرة).

```kotlin
@Composable
fun MyAppNavHost(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(
                onNavigateToDetails = {
                    navController.navigate("details")
                }
            )
        }
        composable("details") {
            DetailsScreen(
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}

@Composable
fun HomeScreen(onNavigateToDetails: () -> Unit) {
    // Button triggers the event, not the NavController directly
    Button(onClick = onNavigateToDetails) {
        Text("Go to Details")
    }
}

@Composable
fun DetailsScreen(onNavigateBack: () -> Unit) {
    Button(onClick = onNavigateBack) {
        Text("Back")
    }
}
```

#### شرح كل سطر:
1. `composable("home") { HomeScreen(onNavigateToDetails = { navController.navigate("details") }) }` → وجهة home — تمرر lambda كحدث بدل تمرير NavController مباشرة
2. `composable("details") { DetailsScreen(onNavigateBack = { navController.popBackStack() }) }` → وجهة details — تستدعي popBackStack للرجوع
3. `fun HomeScreen(onNavigateToDetails: () -> Unit)` → composable لا يعرف شيئاً عن NavController — يستقبل event فقط (اتباع لمبدأ UDF)
4. `Button(onClick = onNavigateToDetails)` → عند الضغط، يُستدعى الحدث المُمرَّر من الأعلى

**الناتج المتوقع (لقطة الشاشة):**
> عند فتح التطبيق تظهر شاشة "Home" بها زر "Go to Details"، وعند الضغط عليه تنتقل الواجهة لشاشة "Details" بها زر "Back" يعيد المستخدم للشاشة الأولى.

> #### نقطة مهمة ⚠️:
> عندما يحتاج composable للتنقل إلى شاشة جديدة، **لا يجب** تمرير NavController إليه مباشرة ليستدعي navigate() بنفسه. وفقاً لمبادئ Unidirectional Data Flow (UDF)، يجب أن يعرض composable حدثاً (event lambda) يتعامل معه NavController في المستوى الأعلى فقط.

---

### 31. التنقل مع تمرير الوسائط (Arguments)

#### النص الأصلي يقول (English):
> Some destinations require data in order to display the correct UI. Passing Data During Navigation: In Jetpack Compose Navigation, data is commonly passed through the route. navController.navigate("details/5"). Define a Route with Arguments: composable("details/{itemId}") { backStackEntry -> val itemId = backStackEntry.arguments?.getString("itemId"); DetailsScreen(itemId) }. Key Notes: Arguments are passed through the route. The argument name must match in both places. Pass only the data required by the destination.

#### الترجمة الحرفية:
> بعض الوجهات تحتاج بيانات لعرض الواجهة الصحيحة. تمرير البيانات أثناء التنقل: في Jetpack Compose Navigation، تُمرَّر البيانات عادةً عبر المسار (route). navController.navigate("details/5"). تعريف مسار بوسائط: composable("details/{itemId}") { backStackEntry -> val itemId = backStackEntry.arguments?.getString("itemId"); DetailsScreen(itemId) }. ملاحظات أساسية: تُمرَّر الوسائط عبر المسار. يجب أن يتطابق اسم الوسيط في كلا المكانين. مرّر فقط البيانات المطلوبة للوجهة.

#### الشرح المبسّط:
كثير من الشاشات لا يمكن عرضها بمعزل عن بيانات محددة — مثل شاشة تفاصيل منتج تحتاج معرفة "أي منتج بالضبط". الحل في Compose هو تضمين تلك البيانات مباشرة داخل نص المسار نفسه، عبر متغيّر نائب (placeholder) بصيغة `{itemId}` يُستبدَل بالقيمة الفعلية عند الاستدعاء. النقطة الحرجة هنا أن اسم الوسيط `itemId` يجب أن يتطابق حرفياً بين مكان تعريف المسار (`"details/{itemId}"`) ومكان قراءته (`getString("itemId")`)، وإلا لن يجد Compose القيمة. هذا الأسلوب يشبه بشدة طريقة الروابط في مواقع الويب حيث يظهر معرّف العنصر داخل الرابط نفسه (URL). **تشبيه يومي:** مثل عنوان بيت يحتوي رقم الشقة داخله مباشرة بدلاً من إرسال رقم الشقة في رسالة منفصلة — "شارع النور، شقة 5" بدلاً من "شارع النور" ثم إخبارك لاحقاً بالرقم؛ ومثال عملي: `navController.navigate("profile/123")` ينقل لصفحة الملف الشخصي الخاص بالمستخدم رقم 123 تحديداً.

**لماذا؟** لأن تمرير البيانات عبر المسار يجعل كل وجهة "قابلة للربط المباشر" (deep-linkable) ومستقلة، فيمكن الوصول لها مباشرة إن عرفنا قيمة المعرّف دون المرور بخطوات وسيطة.

#### 💻 الكود: تنقل كامل مع تمرير itemId

#### ما هذا الكود؟
> مثال متكامل يوضّح تمرير قيمة `itemId` من شاشة Home إلى شاشة Details عبر المسار، واستقبالها وعرضها.

```kotlin
@Composable
fun MyAppNavHost(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(
                onNavigateToDetails = {
                    // Navigate and pass itemId = 5
                    navController.navigate("details/5")
                }
            )
        }
        composable("details/{itemId}") { backStackEntry ->
            // Receive the argument from the route
            val itemId = backStackEntry.arguments?.getString("itemId")
            DetailsScreen(
                itemId = itemId,
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}

@Composable
fun HomeScreen(onNavigateToDetails: () -> Unit) {
    Button(onClick = onNavigateToDetails) { Text("Go to Details") }
}

@Composable
fun DetailsScreen(itemId: String?, onNavigateBack: () -> Unit) {
    Column {
        Text("Item ID: $itemId")
        Button(onClick = onNavigateBack) { Text("Back") }
    }
}
```

#### شرح كل سطر:
1. `navController.navigate("details/5")` → تنقل مع بيانات — يستبدل placeholder فعلياً بالقيمة 5
2. `composable("details/{itemId}") { backStackEntry -> ... }` → تعريف مسار بوسيط — `{itemId}` هو النائب الذي سيُستبدَل بالقيمة الفعلية
3. `val itemId = backStackEntry.arguments?.getString("itemId")` → استخراج القيمة — القراءة من الـ back stack entry باستخدام نفس الاسم `itemId`
4. `DetailsScreen(itemId = itemId, ...)` → تمرير القيمة للـ composable — عرضها كوسيط عادي داخل الشاشة

**الناتج المتوقع (لقطة الشاشة):**
> بعد الضغط على "Go to Details" من شاشة Home، تظهر شاشة Details معروضاً فيها النص "Item ID: 5" مباشرة.

---

### 32. الـ Back Stack — المفهوم الأساسي

#### النص الأصلي يقول (English):
> The NavController holds a "back stack" that contains the destinations the user has visited. As the user navigates to screens throughout your app, the NavController adds and removes destinations to and from the back stack. The back stack is a "last in, first out" data structure. Basic behavior: First destination... Pushing to the stack... Popping top destination: Tapping Up or Back calls the NavController.navigateUp() and NavController.popBackStack() methods, respectively.

#### الترجمة الحرفية:
> يحمل NavController "سجل تنقل خلفي" (back stack) يحتوي الوجهات التي زارها المستخدم. أثناء تنقّل المستخدم عبر شاشات تطبيقك، يضيف NavController ويحذف وجهات من وإلى سجل التنقل. سجل التنقل الخلفي هو بنية بيانات "آخر داخل، أول خارج" (last in, first out). سلوك أساسي: الوجهة الأولى... الدفع إلى السجل... إخراج الوجهة العلوية: النقر على Up أو Back يستدعي دالتي NavController.navigateUp() و NavController.popBackStack() على التوالي.

#### الشرح المبسّط:
الـ Back Stack هو الآلية التي تجعل زر "الرجوع" يعمل بشكل منطقي ومتوقّع: كل مرة تنتقل فيها لشاشة جديدة عبر `navigate()`، تُوضَع تلك الوجهة على "قمة" مكدّس (Stack)، وعند الضغط على زر الرجوع، تُزال أحدث وجهة (آخر ما دخل) لتعود للتي تسبقها مباشرة — تماماً كما تعمل الأطباق المكدّسة فوق بعضها في المطبخ. هذا البناء "آخر داخل، أول خارج" (LIFO) يضمن سلوكاً منطقياً بديهياً للمستخدم دون الحاجة لأي برمجة إضافية معقّدة. **تشبيه يومي:** مثل كومة أطباق مكدّسة — تضع كل طبق جديد فوق الكومة (push عبر navigate)، وعندما تحتاج طبقاً، تأخذ الطبق العلوي أولاً (pop عبر popBackStack)، وليس أول طبق وُضع في الكومة؛ ومثال عملي: زيارة home ثم details ثم settings تجعل الـ back stack كالتالي [home → details → settings]، والضغط على رجوع يعيدك لـ details أولاً.

**لماذا؟** لأن فهم هذا السلوك LIFO يفسّر لماذا يعود المستخدم دائماً لآخر شاشة زارها بالضبط وليس لأي شاشة عشوائية أخرى.

```algorithm
1 | فتح التطبيق | NavController | يُدفَع startDestination كأول عنصر في الـ back stack
2 | استدعاء navigate() | NavController | تُدفَع الوجهة الجديدة فوق قمة الـ back stack
3 | الضغط على Back/Up | NavController.popBackStack() / navigateUp() | تُزال الوجهة العلوية ويظهر ما تحتها
```

---

### 33. popBackStack — الرجوع لوجهة محددة

#### النص الأصلي يقول (English):
> navController.popBackStack() attempts to pop the current destination off the back stack and navigates to the previous destination. Returns true if the pop operation succeeds. Returns false if there is no destination to return to. You can pop back to a specific screen by using: navController.popBackStack(route, inclusive). Example: Current back stack: [ home → details → settings → profile ]. Pop back to "details": navController.popBackStack("details", false) -> Result: [ home → details ]. navController.popBackStack("details", true) -> Result: [ home ].

#### الترجمة الحرفية:
> تحاول navController.popBackStack() إخراج الوجهة الحالية من سجل التنقل الخلفي والانتقال إلى الوجهة السابقة. تُعيد true إذا نجحت عملية الإخراج. تُعيد false إذا لم توجد وجهة للرجوع إليها. يمكنك الرجوع إلى شاشة محددة باستخدام: navController.popBackStack(route, inclusive). مثال: سجل التنقل الحالي: [ home → details → settings → profile ]. الرجوع إلى "details": navController.popBackStack("details", false) ← النتيجة: [ home → details ]. navController.popBackStack("details", true) ← النتيجة: [ home ].

#### الشرح المبسّط:
`popBackStack()` بشكلها البسيط (بدون وسائط) تزيل فقط الوجهة الحالية وتعود لما قبلها مباشرة — وهذا ما يحدث تلقائياً عند الضغط على زر الرجوع العادي. لكن الصيغة المتقدمة `popBackStack(route, inclusive)` تعطيك تحكّماً أدق: يمكنك القفز مباشرة لشاشة محددة بعيدة في السجل، وتحديد بدقة عبر `inclusive` ما إذا كنت تريد إبقاء تلك الشاشة الهدف نفسها في السجل (`false`) أو حذفها هي أيضاً (`true`). هذا مفيد جداً في سيناريوهات مثل إنهاء عملية تسجيل متعددة الخطوات والعودة للشاشة الرئيسية دفعة واحدة بدلاً من الضغط على "رجوع" عدة مرات متتالية. **تشبيه يومي:** مثل استخدام "تراجع" (Undo) متعدد الخطوات في برنامج تحرير مستندات — بدلاً من الضغط على تراجع عشر مرات، تحدد نقطة زمنية معينة تريد العودة إليها مباشرة؛ ومثال عملي: بعد إتمام عملية شراء بنجاح (شاشة profile)، استخدام `popBackStack("home", false)` يعيد المستخدم مباشرة للشاشة الرئيسية ويمسح كل الشاشات الوسيطة (سلة التسوق، الدفع...).

**لماذا؟** لأن التحكّم الدقيق بالـ back stack يمنع سيناريوهات مزعجة مثل عودة المستخدم بالخطأ لشاشة دفع مكتملة بالفعل.

#### 🔍 تتبّع التنفيذ: popBackStack مع inclusive

**المدخل:** سجل التنقل الحالي: `[ home → details → settings → profile ]`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `popBackStack("details", false)` | `[ home → details ]` — settings و profile أُزيلا، details بقيت |
| 2 | `popBackStack("details", true)` (من الحالة الأصلية) | `[ home ]` — settings و profile و details جميعها أُزيلت |

**النتيجة:** `inclusive = false` يحافظ على الوجهة الهدف نفسها في السجل، بينما `inclusive = true` يزيلها أيضاً.

---

### 34. التعامل مع فشل popBackStack

#### النص الأصلي يقول (English):
> When the popBackStack() returns false, a subsequent call to NavController.getCurrentDestination() returns null. This means: The app has popped the last destination off the back stack. The user sees only a blank screen. This can occur in the following cases: popBackStack() did not pop anything from the stack. popBackStack() did pop a destination off the back stack and the stack is now empty. To resolve this, you must then navigate to a new destination or call finish() on your activity to end it.

#### الترجمة الحرفية:
> عندما تُعيد popBackStack() القيمة false، فإن استدعاءً لاحقاً لـ NavController.getCurrentDestination() يُعيد null. هذا يعني: أن التطبيق أخرج آخر وجهة من سجل التنقل الخلفي. يرى المستخدم شاشة فارغة فقط. يمكن أن يحدث هذا في الحالتين التاليتين: لم تُخرِج popBackStack() أي شيء من السجل. أخرجت popBackStack() وجهة من السجل وأصبح السجل الآن فارغاً. لحل هذا، يجب عليك إما الانتقال لوجهة جديدة أو استدعاء finish() على الـ activity الخاص بك لإنهائه.

#### الشرح المبسّط:
هذه حالة حافة (edge case) مهمة جداً يجب الانتباه لها: إذا استمر المستخدم بالضغط على "رجوع" حتى وصل لأول شاشة في التطبيق، فإن الضغط مرة أخيرة إضافية قد يُفرغ الـ back stack بالكامل، مما يترك التطبيق بدون أي وجهة معروضة — أي شاشة فارغة تماماً، وهي تجربة مستخدم سيئة جداً. الحل المنطقي المذكور هو التحقق من نتيجة `popBackStack()`؛ فإذا أعادت `false`، يجب إما توجيه المستخدم لوجهة أخرى (مثل شاشة رئيسية بديلة) أو ببساطة إنهاء الـ Activity بالكامل عبر `finish()` — وهو السلوك المتوقّع عادةً عند الوصول لأول شاشة والضغط على رجوع (خروج من التطبيق). **تشبيه يومي:** مثل شخص يمشي للخلف باستمرار حتى يصطدم بجدار فارغ — يجب أن يكون هناك خطة واضحة لما يحدث عند الوصول لتلك النقطة (إما التوقف تماماً أو الالتفاف لاتجاه آخر)؛ ومثال عملي: `if (!navController.popBackStack()) { finish() }` يضمن إغلاق التطبيق بأمان بدلاً من ترك شاشة سوداء فارغة.

**لماذا؟** لأن تجاهل هذه الحالة الحدّية يسبب تجربة مستخدم مكسورة يظهر فيها التطبيق "معلّقاً" على شاشة فارغة بلا أي محتوى.

#### 💻 الكود: معالجة فشل popBackStack

#### ما هذا الكود؟
> يتحقق من نتيجة popBackStack ويُنهي الـ Activity إذا لم يبقَ شيء للرجوع إليه.

```kotlin
// If popBackStack fails (returns false), close the Activity safely
if (!navController.popBackStack()) {
    // Call finish() on your Activity
    finish()
}
```

#### شرح كل سطر:
1. `if (!navController.popBackStack())` → فحص النتيجة — إذا أعادت false تعني عدم وجود وجهة للرجوع إليها
2. `finish()` → إنهاء الـ Activity — يُغلق التطبيق بأمان بدلاً من ترك شاشة فارغة

---

### 35. popUpTo — إزالة وجهات متعددة أثناء التنقل

#### النص الأصلي يقول (English):
> To remove destinations from the back stack when navigating from one destination to another, add a popUpTo() argument to the associated navigate() function call. popUpTo() instructs the Navigation library to remove some destinations from the back stack as part of the call to navigate(). Example: Current back stack: [ login → home → details → settings ]. Navigate to profile and remove everything above home: navController.navigate("profile") { popUpTo("home") } -> Result: [ login → home → profile ]. navController.navigate("profile") { popUpTo("home") { inclusive = true } } -> Result: [ login → profile ].

#### الترجمة الحرفية:
> لإزالة وجهات من سجل التنقل الخلفي عند الانتقال من وجهة إلى أخرى، أضف وسيط popUpTo() لاستدعاء دالة navigate() المرتبطة. تُوجِّه popUpTo() مكتبة Navigation لإزالة بعض الوجهات من السجل كجزء من استدعاء navigate(). مثال: سجل التنقل الحالي: [ login → home → details → settings ]. الانتقال إلى profile وإزالة كل ما فوق home: navController.navigate("profile") { popUpTo("home") } ← النتيجة: [ login → home → profile ]. navController.navigate("profile") { popUpTo("home") { inclusive = true } } ← النتيجة: [ login → profile ].

#### الشرح المبسّط:
`popUpTo()` تحل مشكلة مختلفة عن `popBackStack`: بدلاً من الرجوع إلى الخلف، هي تُستخدم *أثناء* التنقل للأمام لتنظيف السجل في نفس الوقت. هذا مفيد جداً في سيناريوهات مثل شاشة تسجيل دخول — بعد نجاح تسجيل الدخول، لا تريد أن يستطيع المستخدم الضغط على "رجوع" والعودة لشاشة تسجيل الدخول مرة أخرى، لذا تستخدم `popUpTo("login") { inclusive = true }` أثناء الانتقال للشاشة الرئيسية لتنظيف كل ما قبلها بما فيها شاشة تسجيل الدخول نفسها. الفرق بين `inclusive = true` و`false` هو نفسه المشروح سابقاً في `popBackStack`: هل تُحذَف الوجهة الهدف المذكورة في popUpTo أيضاً أم تبقى. **تشبيه يومي:** مثل حرق الجسور خلفك بعد عبورها — بعد إتمام عملية تسجيل الدخول بنجاح، تُزال كل الخطوات الوسيطة (شاشة كلمة السر، شاشة التحقق) بحيث لا يمكن الرجوع إليها؛ ومثال عملي: بعد إتمام عملية شراء ناجحة، `popUpTo("cart") { inclusive = true }` يمنع المستخدم من الرجوع لسلة تسوّق فارغة بعد إتمام الطلب.

**لماذا؟** لأن هذا يمنع سيناريوهات منطقية غير مرغوبة، مثل إعادة تنفيذ عملية دفع بالخطأ عبر الرجوع لشاشة مكتملة بالفعل.

#### 🔍 تتبّع التنفيذ: popUpTo مع/بدون inclusive

**المدخل:** سجل التنقل الحالي: `[ login → home → details → settings ]`، وسيتم استدعاء `navigate("profile")` مع `popUpTo("home")`.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `navigate("profile") { popUpTo("home") }` | `[ login → home → profile ]` — details وsettings أُزيلا، home بقيت، profile أُضيفت |
| 2 | `navigate("profile") { popUpTo("home") { inclusive = true } }` (من نفس الحالة الأصلية) | `[ login → profile ]` — home نفسها أُزيلت أيضاً هذه المرة |

**النتيجة:** popUpTo تنظّف السجل أثناء الانتقال للأمام، وinclusive تتحكّم في مصير الوجهة الهدف نفسها.

---

### 36. حفظ واستعادة الحالة عند popUpTo (saveState / restoreState)

#### النص الأصلي يقول (English):
> When you use popUpTo to navigate to a destination, you can optionally save the back stack and the states of all destinations popped off the back stack. You can then restore the back stack and destinations when navigating to that destination at a later time. This lets you preserve state for a given destination and have multiple back stacks. To do this programmatically, specify saveState = true when adding popUpTo to your navigation options. You can also specify restoreState = true in your navigation options to automatically restore the back stack and the state associated with the destination.

#### الترجمة الحرفية:
> عند استخدام popUpTo للتنقل إلى وجهة، يمكنك اختيارياً حفظ سجل التنقل الخلفي وحالات جميع الوجهات التي أُخرجت منه. يمكنك بعد ذلك استعادة سجل التنقل والوجهات عند التنقل لتلك الوجهة لاحقاً. هذا يتيح لك الحفاظ على حالة وجهة معينة وامتلاك عدة سجلات تنقل خلفية. للقيام بذلك برمجياً، حدد saveState = true عند إضافة popUpTo إلى خيارات التنقل. يمكنك أيضاً تحديد restoreState = true في خيارات التنقل لاستعادة سجل التنقل والحالة المرتبطة بالوجهة تلقائياً.

#### الشرح المبسّط:
هذه ميزة متقدمة مهمة جداً لتطبيقات بها تنقل سفلي (Bottom Navigation) بعدة تبويبات: عادةً، عند مغادرة تبويب معيّن (مثلاً "الرئيسية") والانتقال لتبويب آخر ("الملف الشخصي")، تُفقَد كل حالة التبويب الأول (مثل موضع التمرير أو الشاشات الفرعية المفتوحة). باستخدام `saveState = true` مع popUpTo، تُحفَظ تلك الحالة بدلاً من فقدانها، ثم عند العودة لنفس التبويب لاحقاً باستخدام `restoreState = true`، تعود الحالة تماماً كما تركها المستخدم، وكأنه لم يغادر التبويب إطلاقاً. هذا يعطي انطباعاً بوجود "عدة سجلات back stack" مستقلة، واحد لكل تبويب. **تشبيه يومي:** مثل حفظ موضعك بالضبط في عدة كتب مختلفة تقرؤها في نفس الوقت — عند العودة لأي كتاب منها، تجد الإشارة المرجعية في نفس الصفحة التي توقفت عندها بالضبط؛ ومثال عملي: تطبيق بتبويبات "الرئيسية"، "البحث"، "الإشعارات" — التنقل بينها والعودة لأي تبويب يحافظ على موضع التمرير والشاشة الفرعية المفتوحة فيه.

**لماذا؟** لأن هذا يحسّن تجربة المستخدم بشكل كبير جداً في التطبيقات متعددة التبويبات، حيث يتوقّع المستخدمون عادةً أن يجدوا كل تبويب كما تركوه بالضبط.

#### 💻 الكود: التنقل مع saveState و restoreState

#### ما هذا الكود؟
> يوضّح استخدام saveState وrestoreState معاً للحفاظ على حالة الوجهة عند التنقل بينها وبين وجهات أخرى (نموذج شائع في التنقل السفلي بتبويبات).

```kotlin
navController.navigate(
    route = route,
    navOptions = navOptions {
        popUpTo("route") { saveState = true }
        restoreState = true
    }
)
```

```kotlin
@Composable
fun MyAppNavHost(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController(),
    startDestination: String = "A"
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = startDestination
    ) {
        composable("A") {
            DestinationA(
                onNavigateToB = {
                    // Pop everything up to, and including, A off the back stack,
                    // saving state, then restore B's previous state, then navigate.
                    navController.navigate(route = "B") {
                        popUpTo("A") {
                            inclusive = true
                            saveState = true
                        }
                        restoreState = true
                    }
                },
            )
        }
        composable("B") { DestinationB(/* ... */) }
    }
}

@Composable
fun DestinationA(onNavigateToB: () -> Unit) {
    Button(onClick = onNavigateToB) {
        Text("Go to B")
    }
}
```

#### شرح كل سطر:
1. `popUpTo("A") { inclusive = true; saveState = true }` → إزالة A مع حفظ حالتها — تُزال A من السجل الحالي لكن حالتها تُحفَظ جانباً
2. `restoreState = true` → استعادة تلقائية — إذا كانت هناك حالة محفوظة سابقاً لـ B، تُستعاد بدلاً من إنشاء B من الصفر

**الناتج المتوقع:**
> عند التنقل من A إلى B ثم العودة لاحقاً إلى A، تظهر A أو B كما كانت آخر مرة تماماً، بدلاً من إعادة تهيئتها من نقطة الصفر.

---

### 37. صيغ إضافية لاستخدام popUpTo و launchSingleTop

#### النص الأصلي يقول (English):
> More granularly, you can change how you call NavController.navigate() in the following ways: Pop everything up to the "A" destination off the back stack before navigating to the "B" destination. Pop everything up to and including the "A" destination off the back stack before navigating to the "B" destination. Navigate to the "search" destination only if we're not already on the "search" destination, avoiding multiple copies on the top of the back stack.

#### الترجمة الحرفية:
> بتفصيل أكبر، يمكنك تغيير طريقة استدعاء NavController.navigate() بالطرق التالية: إخراج كل شيء حتى وجهة "A" من سجل التنقل الخلفي قبل الانتقال لوجهة "B". إخراج كل شيء حتى وشاملاً وجهة "A" من السجل قبل الانتقال لوجهة "B". الانتقال لوجهة "search" فقط إذا لم نكن بالفعل على وجهة "search"، لتجنّب وجود عدة نسخ في قمة سجل التنقل الخلفي.

#### الشرح المبسّط:
هذه فقرة ختامية تلخّص ثلاث صيغ عملية شائعة جداً في المشاريع الحقيقية: الأولى تُبقي الوجهة الهدف نفسها في السجل، والثانية تحذفها أيضاً (نفس فكرة inclusive السابقة لكن مطبّقة أثناء التنقل للأمام)، والثالثة تقدّم أداة جديدة مهمة وهي `launchSingleTop = true` التي تحل مشكلة شائعة جداً: الضغط المتكرر على نفس الزر (مثل أيقونة بحث) قد يُنشئ عدة نُسَخ متكررة من نفس الشاشة فوق بعضها في السجل. باستخدام `launchSingleTop`، يتحقّق Compose أولاً إن كانت الوجهة الحالية هي نفسها المطلوبة، وإن كانت كذلك يتجاهل الاستدعاء بدلاً من تكديس نسخة جديدة فوقها. **تشبيه يومي:** مثل شخص يضغط على نفس زر المصعد عدة مرات بينما هو بالفعل في الطابق المطلوب — لا داعي لأي حركة إضافية طالما هو موجود بالفعل هناك؛ ومثال عملي: الضغط المتكرر على أيقونة "البحث" في شريط التنقل السفلي لا يفتح شاشات بحث متعددة متراكمة بفضل `launchSingleTop = true`.

**لماذا؟** لأن تجاهل هذه التفاصيل الصغيرة يؤدي لسجل تنقل خلفي "ملوّث" بنسخ مكررة، مما يجعل زر الرجوع يتصرف بطريقة غير متوقّعة ومزعجة للمستخدم.

```kotlin
// Pop everything up to the "A" destination before navigating to "B"
navController.navigate("B") {
    popUpTo("A")
}

// Pop everything up to and including "A" before navigating to "B"
navController.navigate("B") {
    popUpTo("A") { inclusive = true }
}

// Navigate to "search" only if not already there — avoids duplicate copies
navController.navigate("search") {
    launchSingleTop = true
}
```

> #### الدرس المستفاد:
> إدارة الـ Back Stack بعناية (عبر popUpTo، inclusive، وlaunchSingleTop) هي ما يفصل بين تطبيق يتصرف بمنطقية عند الضغط على "رجوع" وتطبيق يسبب ارتباكاً للمستخدم.

---

## الجزء الثاني: ملخص منظم شامل

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `State` | أي قيمة يمكن أن تتغيّر مع مرور الوقت وتُعرَض في الواجهة | متغيّر نصي، قائمة، كائن معقّد |
| `Event` | مدخل يُولَّد من المستخدم أو النظام يسبب تحديث الحالة | ضغطة زر، استجابة شبكة، إشارة حساس |
| `Recomposition` | إعادة تنفيذ composable عند تغيّر الحالة التي يقرأها | لا يُمسَح شيء، بل تُوصَف الواجهة من جديد |
| `remember` | يحفظ كائناً في الـ Composition عبر إعادات التركيب | لا ينجو من تغييرات التكوين (rotation) |
| `mutableStateOf` | ينشئ `MutableState<T>` قابل للمراقبة من Compose | يُستخدَم غالباً مع remember |
| `rememberSaveable` | يحفظ القيمة في Bundle، تنجو من rotation | للقيم القابلة للحفظ في Bundle أو عبر custom Saver |
| `Stateful Composable` | يحمل حالته الداخلية عبر remember | مريح لكن أقل قابلية لإعادة الاستخدام |
| `Stateless Composable` | لا يحمل حالة، يستقبلها كوسائط | أكثر قابلية للاختبار وإعادة الاستخدام |
| `State Hoisting` | نمط لرفع الحالة للمستدعي لتحويل composable لـ stateless | يستخدم `value` و`onValueChange` |
| `Unidirectional Data Flow (UDF)` | الحالة تنزل، الأحداث ترتفع | يمنع تضارب مصادر الحقيقة |
| `Composition` | بنية شجرية تصف واجهة التطبيق الحالية | تُنتَج بـ Initial Composition، تُحدَّث بـ Recomposition |
| `key()` | يخبر Compose بهوية حقيقية لنسخة composable بدل الاعتماد على الموضع | ضروري في القوائم الديناميكية |
| `NavController` | المنسّق المركزي لإدارة التنقل والـ Back Stack | يُنشأ عبر `rememberNavController()` |
| `NavHost` | حاوية تعرض الوجهة الحالية وتتصل بـ NavController | تحوي رسم التنقل البياني |
| `NavGraph` | بنية بيانات تحوي كل الوجهات وعلاقاتها | يُبنى inline أو عبر createGraph() |
| `Route` | معرّف نصي فريد لوجهة، قد يحمل وسائط | `"details/{itemId}"` |
| `Back Stack` | بنية LIFO تحمل سجل الشاشات التي زارها المستخدم | يُدار تلقائياً بواسطة NavController |
| `popBackStack()` | يزيل الوجهة الحالية ويعود للسابقة، أو لوجهة محددة | يُعيد Boolean يشير للنجاح |
| `popUpTo()` | يزيل وجهات من السجل أثناء استدعاء navigate() للأمام | يُستخدَم مع inclusive وsaveState |
| `launchSingleTop` | يمنع تكرار نفس الوجهة فوق بعضها في السجل | مفيد لأزرار قد تُضغَط عدة مرات |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `remember { mutableStateOf(x) }` | تخزين ومراقبة حالة تنجو من recomposition | لا تنجو من تدوير الشاشة |
| `rememberSaveable { mutableStateOf(x) }` | نفس الفكرة، لكن تنجو من تغييرات التكوين | تحتاج نوعاً قابلاً للحفظ في Bundle |
| `key(id) { ... }` | يضمن هوية ثابتة لنسخة composable في قائمة | يمنع إعادة تشغيل side effects بلا داعٍ |
| `rememberNavController()` | إنشاء متحكّم تنقل ينجو من recomposition | كل NavHost له NavController خاص به |
| `NavController.navigate(route)` | التنقل لوجهة جديدة، يعدّل الـ back stack | يُفضَّل تمريره كـ event وليس مباشرة |
| `NavController.popBackStack()` | الرجوع للوجهة السابقة أو لوجهة محددة | يُعيد false إذا لم يبقَ شيء في السجل |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| remember vs rememberSaveable | يُفقَد عند تغيير التكوين | يبقى محفوظاً عبر Bundle | استخدم Saveable للبيانات المرئية للمستخدم |
| Stateful vs Stateless | يحمل الحالة داخلياً | يستقبل الحالة من الخارج | Stateless أكثر قابلية لإعادة الاستخدام |
| popBackStack vs popUpTo | يُستخدَم للرجوع للخلف | يُستخدَم لتنظيف السجل أثناء التنقل للأمام | كلاهما يقبل route وinclusive |
| View System vs Compose Navigation | إدارة يدوية عبر Fragments | إدارة تلقائية عبر recomposition | Compose أبسط ومبني على الحالة |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| الحالة | `State`، `Event`، `Recomposition`، `Composition`، `remember`، `mutableStateOf`، `rememberSaveable` |
| البنية والتصميم | `Stateful`، `Stateless`، `State Hoisting`، `Unidirectional Data Flow`، `key` |
| التنقل | `NavController`، `NavHost`، `NavGraph`، `NavDestination`، `Route`، `Back Stack` |
| دوال التنقل | `navigate()`، `popBackStack()`، `popUpTo()`، `navigateUp()`، `launchSingleTop` |

### أبرز النقاط الذهبية
1. الحالة تحدّد ما يُعرَض، والأحداث هي التي تُغيّر الحالة — لا يوجد تغيير في الواجهة بدون حدث.
2. المتغيّرات المحلية العادية لا تنجو من recomposition؛ استخدم `remember` دائماً لأي قيمة يجب أن تبقى.
3. استخدم `rememberSaveable` بدلاً من `remember` لأي بيانات يجب أن تبقى ظاهرة للمستخدم بعد تدوير الشاشة.
4. فضّل تصميم composables من نوع Stateless عبر State Hoisting لزيادة إمكانية إعادة الاستخدام والاختبار.
5. اتّبع دائماً مبدأ Unidirectional Data Flow: الحالة تنزل، الأحداث ترتفع.
6. استخدم `key()` عند عرض قوائم ديناميكية لضمان حفاظ Compose على هوية العناصر الصحيحة.
7. Navigation في Compose هو تطبيق مباشر لمبدأ الحالة وإعادة التركيب — لا نظام منفصل بقواعد مختلفة.
8. لا تُمرِّر NavController مباشرة لـ composable الأبناء؛ مرِّر event lambda بدلاً من ذلك.
9. تحقق دائماً من نتيجة `popBackStack()` لتجنّب ترك المستخدم على شاشة فارغة.
10. استخدم `launchSingleTop` لمنع تكرار نفس الوجهة عند الضغط المتكرر على نفس الزر.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| استخدام `var count = 0` كمتغيّر محلي عادي كعدّاد | استخدم `var count by remember { mutableStateOf(0) }` |
| استخدام `remember` لبيانات يجب أن تبقى بعد تدوير الشاشة | استخدم `rememberSaveable` بدلاً منها |
| تمرير `NavController` مباشرة لكل composable فرعي | مرّر event lambda واحتفظ بـ NavController في أعلى المستوى فقط |
| عرض قائمة بحلقة for بدون `key()` عند احتمال تغيّر الترتيب | استخدم `key(item.id) { ... }` لضبط الهوية الصحيحة |
| تجاهل قيمة إرجاع `popBackStack()` (Boolean) | تحقق منها وتعامل مع حالة false بالانتقال لوجهة أو `finish()` |
| نسيان تطابق اسم الوسيط بين تعريف المسار وقراءته | تأكد من تطابق `{itemId}` مع `getString("itemId")` حرفياً |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء نظام تنقل كامل في Compose

#### ما هدف هذه العملية؟
> يوضّح التسلسل الكامل من إعداد المشروع حتى تنفيذ تنقل يعمل مع تمرير بيانات وإدارة back stack.

```algorithm
1 | إضافة الاعتمادية | build.gradle | إضافة navigation-compose كـ dependency
2 | إنشاء المتحكّم | rememberNavController() | إنشاء NavController يبقى ثابتاً عبر recompositions
3 | تعريف NavHost | NavHost composable | ربط NavController بـ startDestination
4 | تعريف الوجهات | composable(route) | تعريف كل شاشة ومسارها داخل الرسم البياني
5 | تنفيذ التنقل | navController.navigate(route) | استدعاء عند حدث المستخدم (زر مثلاً)
6 | إدارة الرجوع | popBackStack() / popUpTo() | التحكّم بسجل التنقل حسب الحاجة
```

#### نقاط التنفيذ:
- لا تُمرِّر NavController مباشرة للـ composables الفرعية — اتّبع UDF ومرّر event lambda فقط.
- تحقق دائماً من نجاح `popBackStack()` قبل الاعتماد على استمرار وجود وجهة صالحة.

---

### أنماط الأكواد
- تعريف State بسيط: `var x by remember { mutableStateOf(default) }`
- State ينجو من التدوير: `var x by rememberSaveable { mutableStateOf(default) }`
- State Hoisting: composable يستقبل `value: T` و`onValueChange: (T) -> Unit` بدلاً من `remember` داخلي
- تعريف وجهة تنقل بسيطة: `composable("route") { Screen() }`
- تعريف وجهة بوسيط: `composable("route/{arg}") { backStackEntry -> ... }`
- تنقل مع تنظيف السجل: `navController.navigate("dest") { popUpTo("start") { inclusive = true } }`

### أنماط التعامل
- عند الحاجة لحالة تشاركها عدة composables → ارفعها (hoist) للأصل المشترك الأقرب.
- عند عرض قائمة ديناميكية → استخدم `key()` دوماً لتفادي مشاكل الأداء وفقدان الحالة.
- عند تصميم composable قابل لإعادة الاستخدام → اجعله Stateless إن أمكن.
- عند التنقل بعد عملية حساسة (تسجيل دخول، دفع) → استخدم `popUpTo(inclusive = true)` لمنع الرجوع لتلك الشاشة.

### الأفكار الشاملة
هذه المحاضرة تُظهر أن Jetpack Compose يُبنى بأكمله حول فكرة واحدة مركزية: **كل شيء هو حالة، وكل تغيير يحدث عبر إعادة التركيب** — سواء كان ذلك التغيير مجرد نص في حقل إدخال، أو انتقالاً كاملاً بين شاشات التطبيق. فهم هذا المبدأ الموحّد هو ما يجعل التعامل مع أي جزء لاحق من Compose أسهل بكثير، لأن كل الميزات المتقدمة (State Hoisting، Navigation، ViewModel لاحقاً) ما هي إلا تطبيقات مختلفة لنفس الفكرة الأساسية.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط)
What is the key difference between `remember` and `rememberSaveable`?
أ) `remember` is faster but `rememberSaveable` is slower
ب) `remember` survives recomposition only, while `rememberSaveable` also survives configuration changes
ج) `rememberSaveable` cannot store primitive types
د) There is no functional difference, only naming
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح لأن `remember` تحفظ القيمة فقط عبر recompositions العادية، بينما `rememberSaveable` تحفظها إضافياً في Bundle لتنجو من تغييرات التكوين مثل تدوير الشاشة. الخيار (أ) خاطئ لأن الفرق ليس في السرعة بل في نطاق الحفظ. الخيار (ج) خاطئ لأن `rememberSaveable` تدعم الأنواع الأولية بشكل أساسي. الخيار (د) خاطئ لأن هناك فرقاً وظيفياً حقيقياً بينهما.

---

### السؤال 2 (متوسط)
Which statement best distinguishes a Stateful composable from a Stateless one?
أ) Stateless composables cannot display any text
ب) Stateful composables hold their own internal state via remember; Stateless composables receive state via parameters
ج) Stateless composables are always faster to render
د) Stateful composables cannot be reused at all
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويطابق التعريف الأساسي في المحاضرة تماماً. الخيار (أ) خاطئ لأن Stateless composables يمكنها عرض أي محتوى، فقط لا تحمل الحالة داخلياً. الخيار (ج) خاطئ لأن السرعة ليست معياراً مذكوراً في المحاضرة للمقارنة. الخيار (د) مبالغ فيه؛ Stateful composables يمكن إعادة استخدامها لكنها أقل مرونة فقط.

---

### السؤال 3 (صعب)
In the following code, what happens to `count` on every recomposition?
```kotlin
@Composable
fun Counter() {
    var count = 0
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```
أ) It keeps incrementing correctly forever
ب) It is reset to 0 because local variables do not survive recomposition
ج) It throws a compile-time error
د) It is automatically converted to a State object by the compiler
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح لأن `count` متغيّر Kotlin محلي عادي غير محفوظ عبر `remember`، فتُعاد تهيئته إلى 0 مع كل إعادة تنفيذ للدالة بأكملها. الخيار (أ) خاطئ وهو بالضبط الخطأ الشائع الذي تحذّر منه المحاضرة. الخيار (ج) خاطئ لأن الكود يُترجَم بنجاح لكنه لا يعمل كما هو متوقّع منطقياً. الخيار (د) خاطئ؛ لا يوجد تحويل تلقائي من قِبل المترجم بدون استخدام `remember`/`mutableStateOf` صراحة.

---

### السؤال 4 (متوسط)
Which of the following is the correct way to declare an observable state using delegate syntax?
أ) `val name = mutableStateOf("")`
ب) `var name by remember { mutableStateOf("") }`
ج) `var name = mutableStateOf("")`
د) `val name by mutableStateOf("")`
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح لأنه يجمع بين `remember` (للحفاظ عبر recomposition) و`by` (لصياغة الوصول المباشر بدون `.value`). الخيار (أ) لا يستخدم `remember` فتُفقَد القيمة مع كل recomposition. الخيار (ج) نفس المشكلة، بالإضافة لعدم استخدام `by`. الخيار (د) يستخدم `by` لكن بدون `remember` فلن تنجو القيمة من إعادة التركيب.

---

### السؤال 5 (متوسط)
What does "Single source of truth" mean in the context of State Hoisting?
أ) The state is duplicated across multiple composables for redundancy
ب) The state exists in exactly one place, avoiding conflicting copies of the same data
ج) Only the top-level Activity can hold state
د) Each composable must have its own independent copy of the state
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويطابق تعريف المحاضرة تماماً لهذه الخاصية من خصائص الحالة المرفوعة. الخيار (أ) خاطئ لأنه يناقض الهدف الأساسي من هذا المبدأ. الخيار (ج) غير مذكور في المحاضرة وغير صحيح. الخيار (د) يتناقض تماماً مع فكرة "مصدر وحيد" للحقيقة.

---

### السؤال 6 (صعب)
In `LoginScreen`, if `showError` changes from `false` to `true`, what happens to the `LoginInput` composable instance?
```kotlin
@Composable
fun LoginScreen(showError: Boolean) {
    if (showError) { LoginError() }
    LoginInput()
}
```
أ) It is destroyed and recreated from scratch
ب) Its identity and internal state are preserved because its call site did not change
ج) It moves to a different call site and loses its state
د) It throws a runtime exception
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح لأن `LoginInput()` يُستدعى دوماً من نفس موقع الاستدعاء، فيحافظ Compose على هويته حتى لو تغيّر ترتيبه بسبب ظهور `LoginError`. الخيار (أ) خاطئ ويناقض بالضبط ما شرحته المحاضرة عن الحفاظ على الهوية. الخيار (ج) خاطئ لأن موقع الاستدعاء لم يتغيّر فعلياً في الكود المصدري. الخيار (د) لا صلة له بالسيناريو المذكور.

---

### السؤال 7 (صعب)
Why is `key(movie.id)` necessary when displaying a list of movies with a `for` loop, if items might be reordered?
أ) It improves compile-time performance only
ب) Without it, Compose uses execution order to identify instances, which can wrongly reuse or restart side effects when items move position
ج) It is required syntactically or the code will not compile
د) It replaces the need for a `for` loop entirely
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويشرح بدقة المشكلة التي توضحها المحاضرة: بدون `key`، يعتمد Compose على الموضع فقط، فتُلغى وتُعاد side effects (مثل تحميل صورة) بالخطأ عند تغيّر الترتيب. الخيار (أ) خاطئ لأن الفائدة تتعلق بصحة السلوك أثناء التشغيل وليس وقت الترجمة. الخيار (ج) خاطئ؛ الكود يُترجَم ويعمل حتى بدون `key`، لكن بسلوك غير مثالي. الخيار (د) لا معنى له.

---

### السؤال 8 (متوسط)
How does Navigation in Jetpack Compose fundamentally differ from the traditional View system?
أ) Compose Navigation requires Fragments to work
ب) Compose Navigation is state-driven and updates the UI through recomposition, rather than manual FragmentTransactions
ج) Compose Navigation does not support a back stack at all
د) Compose Navigation only works with a single screen apps
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويعكس المقارنة المباشرة في المحاضرة بين النظامين. الخيار (أ) خاطئ؛ Compose Navigation لا يحتاج Fragments إطلاقاً. الخيار (ج) خاطئ؛ يدعم back stack كامل تُديره NavController. الخيار (د) خاطئ تماماً؛ فهو مصمم خصيصاً لتطبيقات متعددة الشاشات.

---

### السؤال 9 (متوسط)
What is the correct way to create a `NavController` in a Composable function?
أ) `val navController = NavController()`
ب) `val navController = rememberNavController()`
ج) `val navController = remember { NavController }`
د) `val navController = NavHost.getController()`
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح وهو الطريقة الرسمية المذكورة في المحاضرة لإنشاء NavController بحيث ينجو من recomposition. الخيار (أ) خاطئ لأن الإنشاء المباشر بدون `remember` سيعيد إنشاءه مع كل recomposition ويفقد سجل التنقل. الخيار (ج) صياغة غير صحيحة نحوياً. الخيار (د) دالة غير موجودة في API الحقيقية.

---

### السؤال 10 (متوسط)
Which route definition correctly declares a destination that accepts an `itemId` argument?
أ) `composable("details") { DetailsScreen() }`
ب) `composable("details/{itemId}") { backStackEntry -> ... }`
ج) `composable("details", itemId) { ... }`
د) `navigate("details/{itemId}")`
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويطابق الصياغة الفعلية المستخدمة في المحاضرة لتعريف مسار يحتوي وسيطاً نائباً (placeholder). الخيار (أ) لا يقبل أي وسيط. الخيار (ج) صياغة غير صحيحة في Navigation Compose. الخيار (د) هو استدعاء navigate وليس تعريف composable، ولا يجب ترك `{itemId}` حرفياً عند التنقل الفعلي.

---

### السؤال 11 (صعب)
Given the back stack `[ home → details → settings → profile ]`, what is the result of `navController.popBackStack("details", true)`?
أ) `[ home → details ]`
ب) `[ home ]`
ج) `[ home → details → settings ]`
د) `[ ]` (empty)
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح لأن `inclusive = true` يعني إزالة الوجهة الهدف "details" أيضاً من السجل، فيبقى فقط "home". الخيار (أ) هو نتيجة `inclusive = false` وليس `true`. الخيار (ج) خاطئ لأنه لا يزيل شيئاً بعد "details" فعلياً. الخيار (د) خاطئ لأن "home" تبقى في كلتا الحالتين لأنها ليست الوجهة الهدف.

---

### السؤال 12 (صعب)
A developer wants to prevent the user from returning to the login screen after a successful login. Which approach is correct?
أ) `navController.navigate("home")`
ب) `navController.navigate("home") { popUpTo("login") { inclusive = true } }`
ج) `navController.popBackStack("login", false)`
د) `navController.navigate("home") { launchSingleTop = true }` فقط
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح لأنه يزيل شاشة تسجيل الدخول من السجل أثناء الانتقال للشاشة الرئيسية، مانعاً الرجوع إليها. الخيار (أ) لا يزيل شيئاً، فتبقى شاشة الدخول في السجل ويمكن الرجوع إليها. الخيار (ج) يحاول الرجوع للخلف وليس التنقل للأمام، وهو منطق معكوس للسيناريو. الخيار (د) يمنع فقط التكرار وليس الرجوع لشاشة سابقة مختلفة.

---

### السؤال 13 (متوسط)
What is the primary purpose of `launchSingleTop = true`?
أ) It deletes the entire back stack
ب) It prevents creating a duplicate copy of the same destination if it is already on top of the back stack
ج) It saves the state of a destination permanently
د) It disables the back button entirely
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويطابق تعريف المحاضرة بدقة — يمنع تكديس نسخ متعددة من نفس الوجهة عند الضغط المتكرر. الخيار (أ) مبالغ فيه وغير صحيح. الخيار (ج) هو وظيفة `saveState` وليست `launchSingleTop`. الخيار (د) غير صحيح إطلاقاً.

---

### السؤال 14 (متوسط)
According to Unidirectional Data Flow principles, how should a composable request navigation to a new screen?
أ) By receiving the NavController directly as a parameter and calling `.navigate()` inside it
ب) By exposing an event (lambda) that the caller handles, without knowing about NavController
ج) By modifying a global static variable
د) By calling `finish()` directly
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويعكس التحذير الصريح في المحاضرة ضد تمرير NavController مباشرة لأي composable فرعي. الخيار (أ) هو بالضبط الممارسة الخاطئة التي تحذّر منها المحاضرة. الخيار (ج) غير مذكور وغير مناسب لطبيعة Compose التصريحية. الخيار (د) غير متعلق بالتنقل الطبيعي بين الشاشات.

---

### السؤال 15 (متوسط)
What distinguishes a `Dialog` destination type from a `Hosted` destination type?
أ) Dialog destinations start a new Activity, Hosted destinations do not
ب) Hosted destinations fill the entire navigation host and hide previous destinations; Dialog destinations overlay content while previous destinations remain visible
ج) There is no real difference between them
د) Dialog destinations cannot receive arguments
**الإجابة الصحيحة: ب**
**التعليل:** الخيار (ب) صحيح ويطابق التعريف الدقيق في المحاضرة لكلا النوعين. الخيار (أ) خاطئ؛ بدء Activity جديدة هو وصف نوع Activity وليس Dialog. الخيار (ج) خاطئ تماماً، فالفرق البصري بينهما واضح وجوهري. الخيار (د) غير صحيح، فلا مانع من تمرير وسائط لأي نوع وجهة.

---

### السؤال 16 (صعب)
What happens if `popBackStack()` returns `false` and the developer does nothing about it?
أ) The app crashes immediately
ب) The current destination remains unchanged and functions normally
ج) `getCurrentDestination()` returns null and the user may see a blank screen
د) The app automatically navigates to the home screen
**الإجابة الصحيحة: ج**
**التعليل:** الخيار (ج) صحيح ويطابق التحذير الصريح في المحاضرة عن هذه الحالة الحدّية بالتحديد. الخيار (أ) خاطئ؛ لا يحدث تعطّل مباشر بل شاشة فارغة. الخيار (ب) خاطئ لأن السجل أصبح فارغاً فعلياً في هذه الحالة. الخيار (د) خاطئ؛ لا يوجد سلوك تلقائي كهذا، بل يجب على المطوّر معالجته يدوياً.
## الجزء الرابع: أسئلة تصحيح الكود

**Q1 — Type: `logic`**
**Find the bug:**
```kotlin
@Composable
fun Counter() {
    var count = 0
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```
The counter never increases visually even though the button is clicked repeatedly.

**Fixed code:**
```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```
**شرح الحل:**
1. المشكلة أن `count` متغيّر Kotlin محلي عادي، يُعاد تعيينه إلى 0 مع كل recomposition لأن الدالة بأكملها تُعاد تنفيذها.
2. الحل هو تغليف القيمة بـ `remember { mutableStateOf(0) }` لضمان بقائها محفوظة عبر إعادات التركيب.
3. إضافة `by` تسمح بالتعامل المباشر مع `count` كمتغيّر Kotlin عادي دون كتابة `.value`.

---

**Q2 — Type: `misconception`**
**Find the bug:**
```kotlin
@Composable
fun NameInput() {
    OutlinedTextField(
        value = "",
        onValueChange = { },
        label = { Text("Name") }
    )
}
```
The user types letters into the field, but nothing appears.

**Fixed code:**
```kotlin
@Composable
fun NameInput() {
    var name by remember { mutableStateOf("") }
    OutlinedTextField(
        value = name,
        onValueChange = { name = it },
        label = { Text("Name") }
    )
}
```
**شرح الحل:**
1. الخطأ الأساسي هو الاعتقاد بأن `TextField` "يتذكّر" الإدخال تلقائياً؛ في الحقيقة يجب ربطه بحالة صريحة.
2. القيمة الثابتة `""` تعني أن الحقل سيعرض دائماً نصاً فارغاً بغض النظر عمّا يكتبه المستخدم.
3. الحل يربط `value` بمتغيّر `name` محفوظ عبر `remember`، ويحدّثه بكل حرف عبر `onValueChange`.

---

**Q3 — Type: `syntax`**
**Find the bug:**
```kotlin
var name by mutableStateOf("")
```
Compile error occurs when this line is used inside a Composable across recompositions.

**Fixed code:**
```kotlin
var name by remember { mutableStateOf("") }
```
**شرح الحل:**
1. استخدام `mutableStateOf` بدون تغليفه بـ `remember` يعني أن الكائن سيُنشأ من جديد مع كل استدعاء للدالة composable، فيفقد أي قيمة سابقة.
2. إضافة `remember { }` تضمن إنشاء الكائن مرة واحدة فقط والاحتفاظ به عبر recompositions لاحقة.
3. القاعدة العامة: `mutableStateOf` تُستخدَم دائماً تقريباً بالتزامن مع `remember` أو `rememberSaveable` داخل composable.

---

**Q4 — Type: `dead_code`**
**Find the bug:**
```kotlin
@Composable
fun ProfileScreen(navController: NavHostController) {
    Button(onClick = { navController.navigate("settings") }) {
        Text("Go to Settings")
    }
}
```
This code works but violates a design principle discussed in the lecture, making it hard to reuse or test `ProfileScreen`.

**Fixed code:**
```kotlin
@Composable
fun ProfileScreen(onNavigateToSettings: () -> Unit) {
    Button(onClick = onNavigateToSettings) {
        Text("Go to Settings")
    }
}

// Caller (e.g. inside NavHost):
composable("profile") {
    ProfileScreen(onNavigateToSettings = { navController.navigate("settings") })
}
```
**شرح الحل:**
1. تمرير `NavController` مباشرة لـ `ProfileScreen` يخالف مبدأ Unidirectional Data Flow المذكور في المحاضرة.
2. الحل هو جعل `ProfileScreen` composable من نوع stateless يستقبل event lambda بدلاً من NavController.
3. هذا يجعل `ProfileScreen` قابلاً لإعادة الاستخدام والاختبار بمعزل تام عن نظام التنقل الفعلي.

---

**Q5 — Type: `return_check`**
**Find the bug:**
```kotlin
fun onBackPressed(navController: NavHostController) {
    navController.popBackStack()
    // App continues normally regardless of the result
}
```
Sometimes the user sees a completely blank screen after pressing back multiple times.

**Fixed code:**
```kotlin
fun onBackPressed(navController: NavHostController, activity: Activity) {
    if (!navController.popBackStack()) {
        activity.finish()
    }
}
```
**شرح الحل:**
1. المشكلة أن نتيجة `popBackStack()` (وهي Boolean) تُتجاهل تماماً، رغم أنها قد تُعيد `false` عند فراغ السجل.
2. عند إعادة `false`، لا توجد وجهة صالحة للعرض، مما يترك المستخدم على شاشة فارغة كما وضّحت المحاضرة.
3. الحل هو التحقق من النتيجة، وإذا فشلت العملية، استدعاء `finish()` لإغلاق التطبيق بأمان بدلاً من تركه معلّقاً.

---

**Q6 — Type: `logic`**
**Find the bug:**
```kotlin
@Composable
fun MoviesScreen(movies: List<Movie>) {
    Column {
        for (movie in movies) {
            MovieOverview(movie)
        }
    }
}
```
When a new movie is inserted at the beginning of the list, all movie images reload from the network unnecessarily.

**Fixed code:**
```kotlin
@Composable
fun MoviesScreen(movies: List<Movie>) {
    Column {
        for (movie in movies) {
            key(movie.id) {
                MovieOverview(movie)
            }
        }
    }
}
```
**شرح الحل:**
1. بدون `key()`، يعتمد Compose على ترتيب التنفيذ (الموضع) لتمييز نُسَخ `MovieOverview`، فأي تغيير في الترتيب يُربَك النظام.
2. عند إضافة فيلم في بداية القائمة، تتغيّر مواضع كل الأفلام الأخرى، فيظن Compose أن مدخلاتها تغيّرت فيعيد تشغيل عملياتها الجانبية (تحميل الصور) من جديد.
3. تغليف كل نسخة بـ `key(movie.id)` يربط الهوية بمعرّف الفيلم الحقيقي بدلاً من موضعه، فيحافظ Compose على النسخ الصحيحة دون إعادة تحميل غير ضرورية.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### Exercise 1: Build a Toggle Switch — `scenario`

**Scenario / Task:**
Build a stateful composable `NotificationToggle()` that displays "Notifications: ON" or "Notifications: OFF" and toggles the value when a button is clicked.

**Requirements:**
1. Use `remember` and `mutableStateOf` to hold a Boolean state.
2. Use the `by` delegate syntax.
3. Toggle the value inside the button's `onClick`.

**نموذج الحل:**
```kotlin
@Composable
fun NotificationToggle() {
    var isEnabled by remember { mutableStateOf(false) }
    Button(onClick = { isEnabled = !isEnabled }) {
        Text(if (isEnabled) "Notifications: ON" else "Notifications: OFF")
    }
}
```
**الشرح:** الحالة `isEnabled` محفوظة عبر `remember`، وكل ضغطة على الزر تعكس قيمتها (Event)، مما يسبب recomposition يُحدِّث النص المعروض تلقائياً.

---

### Exercise 2: Convert Stateful to Stateless — `code_fix`

**Scenario / Task:**
The following composable is stateful. Refactor it into two composables: a stateless `SearchBar` and a stateful `SearchScreen` that hoists the state.

```kotlin
@Composable
fun SearchBar() {
    var query by remember { mutableStateOf("") }
    OutlinedTextField(value = query, onValueChange = { query = it })
}
```

**Requirements:**
1. `SearchBar` should not use `remember` at all.
2. `SearchScreen` should hold the state and pass it down.

**نموذج الحل:**
```kotlin
@Composable
fun SearchBar(query: String, onQueryChange: (String) -> Unit) {
    OutlinedTextField(value = query, onValueChange = onQueryChange)
}

@Composable
fun SearchScreen() {
    var query by remember { mutableStateOf("") }
    SearchBar(query = query, onQueryChange = { query = it })
}
```
**الشرح:** طبّقنا State Hoisting بالضبط كما في مثال HelloContent/HelloScreen: `SearchBar` أصبح stateless تماماً يستقبل `value` و`onValueChange`، بينما `SearchScreen` هو الأب الذي يحمل الحالة الحقيقية.

---

### Exercise 3: Navigation with Two Screens — `scenario`

**Scenario / Task:**
Create a navigation graph with two destinations: "list" and "detail/{productId}". Tapping a product in the list navigates to its detail screen showing the product ID.

**Requirements:**
1. Define both routes inside `NavHost`.
2. Pass `productId` through the route.
3. Read the argument inside the "detail" destination.

**نموذج الحل:**
```kotlin
NavHost(navController = navController, startDestination = "list") {
    composable("list") {
        ProductListScreen(
            onProductClick = { id -> navController.navigate("detail/$id") }
        )
    }
    composable("detail/{productId}") { backStackEntry ->
        val productId = backStackEntry.arguments?.getString("productId")
        ProductDetailScreen(productId = productId)
    }
}
```
**الشرح:** الوسيط `productId` يُمرَّر مباشرة داخل نص المسار، ويُقرَأ لاحقاً عبر `backStackEntry.arguments` بنفس الاسم تماماً، مطابقاً للنمط المشروح في المحاضرة.

---

### Exercise 4: Prevent Back Navigation After Checkout — `scenario`

**Scenario / Task:**
After a successful checkout, navigate the user to "orderConfirmation" and prevent them from returning to the "checkout" or "cart" screens.

**Requirements:**
1. Use `popUpTo` with `inclusive = true`.
2. Explain which destination should be the target of `popUpTo`.

**نموذج الحل:**
```kotlin
navController.navigate("orderConfirmation") {
    popUpTo("cart") { inclusive = true }
}
```
**الشرح:** استخدام `popUpTo("cart") { inclusive = true }` يزيل كلاً من "cart" و"checkout" (لأنها فوقها في السجل) من الـ back stack، فلا يستطيع المستخدم الرجوع لأي منهما بالضغط على زر الرجوع.

---

### Exercise 5: Fix Duplicate Screens on Repeated Tap — `code_fix`

**Scenario / Task:**
A bottom navigation "Search" icon creates multiple stacked copies of the search screen when tapped repeatedly.

```kotlin
navController.navigate("search")
```

**Requirements:**
1. Modify the call to prevent duplicate destinations.

**نموذج الحل:**
```kotlin
navController.navigate("search") {
    launchSingleTop = true
}
```
**الشرح:** إضافة `launchSingleTop = true` تجعل Compose يتحقق أولاً إن كانت "search" هي الوجهة الحالية بالفعل، وإن كانت كذلك يتجاهل الاستدعاء بدلاً من تكديس نسخة جديدة فوقها.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### Trace Exercise 1: Recomposition and Local State

**Input:**
```kotlin
@Composable
fun Demo() {
    var counterA = 0
    var counterB by remember { mutableStateOf(0) }
    Button(onClick = { counterA++; counterB++ }) {
        Text("A=$counterA B=$counterB")
    }
}
```
The button is clicked 3 times.

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | الضغطة الأولى | ؟ |
| 2 | الضغطة الثانية | ؟ |
| 3 | الضغطة الثالثة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | الضغطة الأولى | A=0 B=1 (counterA محلي يُصفَّر مع recomposition، counterB محفوظ) |
| 2 | الضغطة الثانية | A=0 B=2 |
| 3 | الضغطة الثالثة | A=0 B=3 |

**Result:** `counterA` يبقى دائماً يظهر بقيمة قريبة من الصفر لأنه غير محفوظ عبر `remember`، بينما `counterB` يزيد بشكل صحيح ومتراكم لأنه محفوظ عبره.

---

### Trace Exercise 2: Back Stack Operations

**Input:**
Starting back stack: `[ splash → login → home ]`
Sequence of calls:
1. `navController.navigate("profile")`
2. `navController.navigate("settings")`
3. `navController.popBackStack()`

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `navigate("profile")` | ؟ |
| 2 | `navigate("settings")` | ؟ |
| 3 | `popBackStack()` | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | `navigate("profile")` | `[ splash → login → home → profile ]` |
| 2 | `navigate("settings")` | `[ splash → login → home → profile → settings ]` |
| 3 | `popBackStack()` | `[ splash → login → home → profile ]` — settings أُزيلت فقط |

**Result:** الوجهة الحالية النهائية هي "profile"، والمستخدم يمكنه الاستمرار بالرجوع خطوة خطوة عبر باقي السجل.

---

### Trace Exercise 3: popUpTo with saveState

**Input:**
Bottom navigation with tabs "Home" and "Profile". User is on "Home" tab, back stack: `[ Home → HomeDetails ]`.
Call: `navController.navigate("Profile") { popUpTo("Home") { saveState = true }; restoreState = true }`
Then user taps "Home" tab again with the same navigate pattern.

**Trace step by step (complete the table):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | الانتقال لـ Profile مع saveState | ؟ |
| 2 | العودة لـ Home مع restoreState | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | الانتقال لـ Profile مع saveState | حالة `[ Home → HomeDetails ]` تُحفَظ جانباً، السجل الحالي يصبح `[ Profile ]` |
| 2 | العودة لـ Home مع restoreState | تُستعاد الحالة المحفوظة بالكامل: `[ Home → HomeDetails ]` كما كانت تماماً |

**Result:** المستخدم يجد نفسه في "HomeDetails" وليس "Home" فقط، لأن الحالة الكاملة استُعيدت بدقة بفضل `saveState`/`restoreState`.

---

## الجزء الرابع: أسئلة تصميم

### Design Question 1: State Architecture — `architecture`

**Task:**
Design (as a diagram or written breakdown) a stateful/stateless composable pair for a "Quantity Selector" component used in a shopping cart, where multiple product cards on the same screen need to share and independently control their own quantity, but the total price at the top of the screen must reflect the sum of all quantities.

**نموذج الإجابة:**
```diagram
type: flowchart
title: Quantity Selector Architecture
direction: TD
nodes:
  - id: cart
    label: CartScreen (stateful — holds list of quantities)
    kind: state
    level: 0
  - id: card1
    label: ProductCard 1 (stateless)
    kind: event
    level: 1
  - id: card2
    label: ProductCard 2 (stateless)
    kind: event
    level: 1
  - id: total
    label: TotalPrice (stateless — derived state)
    kind: display
    level: 1
edges:
  - from: cart
    to: card1
    label: quantity ↓
  - from: card1
    to: cart
    label: onQuantityChange ↑
  - from: cart
    to: card2
    label: quantity ↓
  - from: card2
    to: cart
    label: onQuantityChange ↑
  - from: cart
    to: total
    label: computed sum ↓
```
الحالة الحقيقية (قائمة الكميات) تُرفَع بالكامل إلى `CartScreen` الأب المشترك، بينما كل `ProductCard` هو composable stateless يستقبل كميته الخاصة ويرفع أي تغيير عبر event. `TotalPrice` تعرض فقط قيمة مُشتقّة (derived state) من مجموع الكميات، دون أن تحمل حالة خاصة بها.

**معايير التقييم:**
- تحديد صحيح لموقع رفع الحالة (الأصل المشترك الأقرب لكل البطاقات).
- كل ProductCard مصمّم كـ stateless composable يتبع نمط value/onValueChange.
- توضيح أن TotalPrice هي حالة مشتقّة وليست مصدراً مستقلاً للحقيقة.

---

### Design Question 2: Navigation Graph — `uml_design`

**Task:**
Design a navigation graph for a simple e-commerce app with the following destinations: "home", "productDetail/{productId}", "cart", and "checkout". "checkout" must be unreachable via back button after a successful order (should navigate back to "home" and clear cart/checkout from the stack).

**نموذج الإجابة:**
```diagram
type: flowchart
title: E-commerce Navigation Graph
direction: TD
nodes:
  - id: home
    label: home (start destination)
    kind: destination
    level: 0
  - id: detail
    label: productDetail/{productId}
    kind: destination
    level: 1
  - id: cart
    label: cart
    kind: destination
    level: 1
  - id: checkout
    label: checkout
    kind: destination
    level: 2
edges:
  - from: home
    to: detail
    label: navigate("productDetail/5")
  - from: detail
    to: cart
    label: navigate("cart")
  - from: cart
    to: checkout
    label: navigate("checkout")
  - from: checkout
    to: home
    label: navigate("home") { popUpTo("home") { inclusive = false } }
```
عند إتمام الطلب بنجاح، يُستدعى `navController.navigate("home") { popUpTo("home") }` والذي يزيل كل من "productDetail"، "cart"، و"checkout" من السجل (لأنها فوق "home")، مع إبقاء "home" نفسها (لأن `inclusive = false`)، بحيث لا يستطيع المستخدم الضغط على "رجوع" والعودة لأي من تلك الشاشات.

**معايير التقييم:**
- تحديد صحيح للمسار الكامل بين كل الوجهات الأربع.
- استخدام صحيح لـ `popUpTo` مع القيمة الصحيحة لـ `inclusive` لتحقيق الهدف المطلوب تحديداً.
- توضيح أن "home" تبقى في السجل بينما كل ما بعدها يُزال.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** What is the difference between State and an Event in Jetpack Compose?
A: State is a value that describes what to display; an Event is what triggers a change to that state.

---

**Q2:** Why doesn't a plain local variable like `var count = 0` work as a persistent counter inside a composable?
A: Because local variables do not survive recomposition — the composable function re-executes and resets them.

---

**Q3:** What does `remember` do?
A: It stores a value inside the Composition so it survives recompositions, until the composable leaves the Composition.

---

**Q4:** What is the key limitation of `remember` compared to `rememberSaveable`?
A: `remember` does not survive configuration changes like screen rotation; `rememberSaveable` does, by saving to a Bundle.

---

**Q5:** What makes a composable "Stateless"?
A: It holds no internal state itself and receives all the state it needs via parameters.

---

**Q6:** What are the two parameters typically used in the State Hoisting pattern?
A: `value: T` (the current value) and `onValueChange: (T) -> Unit` (an event requesting a change).

---

**Q7:** What is Unidirectional Data Flow (UDF)?
A: A pattern where state flows down to child composables and events flow up to update that state.

---

**Q8:** Why is a `Composition` described as a tree-structure?
A: Because it represents all the composables called to describe the UI, organized hierarchically based on how they call each other.

---

**Q9:** When should you use `key()` inside a loop of composables?
A: When items in a list might be reordered, inserted, or removed anywhere except the end, to preserve correct identity and avoid restarting side effects.

---

**Q10:** What does `rememberNavController()` do?
A: It creates and remembers a `NavController` instance so it persists across recompositions.

---

**Q11:** What happens internally when `navController.navigate(route)` is called?
A: It modifies the back stack, which `NavHost` observes and reacts to by recomposing and displaying the new current destination.

---

**Q12:** What is the difference between `popBackStack()` and `popUpTo()`?
A: `popBackStack()` is used to go back to a previous destination; `popUpTo()` is used to remove destinations from the stack while navigating forward.

---

**Q13:** What does `launchSingleTop = true` prevent?
A: It prevents creating a duplicate copy of a destination if it is already at the top of the back stack.

---

**Q14:** Why should a composable avoid receiving `NavController` directly as a parameter?
A: Because it violates Unidirectional Data Flow; the composable should instead expose a navigation event that the caller handles.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> ملاحظة: لم تحتوِ المحاضرة على برنامج واحد مُجزَّأ عبر عدة أقسام يتطلّب دمجاً؛ الأمثلة كانت مستقلة لكل مفهوم. فيما يلي مرجع مُجمَّع يوضّح تطبيقاً كاملاً يجمع أهم الأنماط المشروحة في تطبيق واحد متكامل (شرح زيادة للفهم):

```kotlin
// Full reference app combining State Hoisting + Navigation with arguments + Back Stack management

@Composable
fun AppRoot() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onProductClick = { id -> navController.navigate("detail/$id") }
            )
        }
        composable("detail/{productId}") { backStackEntry ->
            val productId = backStackEntry.arguments?.getString("productId")
            DetailScreen(
                productId = productId,
                onBack = { navController.popBackStack() },
                onCheckout = {
                    navController.navigate("confirmation") {
                        popUpTo("home") { inclusive = false }
                    }
                }
            )
        }
        composable("confirmation") {
            ConfirmationScreen(onBackToHome = { navController.popBackStack("home", false) })
        }
    }
}

// Stateless: receives event, does not know about NavController
@Composable
fun HomeScreen(onProductClick: (String) -> Unit) {
    Button(onClick = { onProductClick("101") }) {
        Text("View Product 101")
    }
}

// Stateless: receives arguments and events only
@Composable
fun DetailScreen(productId: String?, onBack: () -> Unit, onCheckout: () -> Unit) {
    Column {
        Text("Product: $productId")
        Button(onClick = onCheckout) { Text("Checkout") }
        Button(onClick = onBack) { Text("Back") }
    }
}

@Composable
fun ConfirmationScreen(onBackToHome: () -> Unit) {
    Column {
        Text("Order confirmed!")
        Button(onClick = onBackToHome) { Text("Return Home") }
    }
}
```

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### Question 1: Explain the relationship between State and Events in Jetpack Compose, and describe the core UI update loop.
**نموذج الإجابة:** الحالة (State) هي وصف لما يجب عرضه في الواجهة في أي لحظة، بينما الأحداث (Events) هي الآلية التي تُحدِّث هذه الحالة. تسير الحلقة الأساسية بثلاث خطوات: (1) يُولَّد حدث من المستخدم أو النظام، (2) يقوم معالِج الحدث بتحديث الحالة، (3) تُعرَض الحالة الجديدة عبر إعادة تركيب الواجهة. مثال: كتابة حرف في حقل نص (event) تُحدِّث متغيّر state يعكس النص الجديد على الشاشة.

---

### Question 2: Why can't a plain local variable be used to persist UI state across recompositions in Compose?
**نموذج الإجابة:** لأن Compose يعيد تنفيذ دالة composable بأكملها عند حدوث recomposition، وأي متغيّر Kotlin محلي عادي غير محفوظ صراحة يُعاد تهيئته من جديد مع كل تنفيذ. الحل هو استخدام `remember` الذي يخزّن القيمة داخل الـ Composition نفسها بدلاً من داخل الدالة، فتنجو من إعادة التنفيذ.

---

### Question 3: Compare `remember` and `rememberSaveable`, and explain when each should be used.
**نموذج الإجابة:** كلاهما يحفظ القيمة عبر إعادات التركيب العادية، لكن `remember` تُفقَد عند تغييرات التكوين (كتدوير الشاشة) لأن الـ Activity يُعاد بناؤها بالكامل، بينما `rememberSaveable` تحفظ القيمة في Bundle النظام فتنجو من ذلك. يُستخدَم `remember` للحالة المؤقتة الداخلية للواجهة فقط، بينما يُستخدَم `rememberSaveable` لأي بيانات مرئية للمستخدم يجب أن تبقى بعد تدوير الجهاز.

---

### Question 4: Define State Hoisting and list at least three properties of hoisted state.
**نموذج الإجابة:** State Hoisting هو نمط لنقل الحالة من composable إلى المستدعي الخاص به لجعله composable من نوع stateless، عبر استبدال المتغيّر الداخلي بوسيطين: `value` و`onValueChange`. من خصائص الحالة المرفوعة: (1) مصدر وحيد للحقيقة (Single source of truth)، (2) قابلة للمشاركة بين عدة composables، (3) قابلة للاعتراض من قِبل المستدعي، (4) مفصولة عن مكان تخزينها الفعلي.

---

### Question 5: Describe the "Unidirectional Data Flow" pattern and explain its benefit.
**نموذج الإجابة:** هو نمط تصميم تسير فيه الحالة (State) من الأعلى للأسفل عبر الوسائط، بينما تصعد الأحداث (Events) من الأسفل للأعلى عبر lambdas. فائدته الأساسية أنه يجعل مصدر أي تغيير في التطبيق واضحاً ومتتبَّعاً بسهولة، حيث لا يوجد إلا مسار واحد ممكن للبيانات، مما يفصل composables التي تعرض الحالة عن الأجزاء التي تخزّنها فعلياً وتغيّرها.

---

### Question 6: Explain how Compose identifies composable instances in the Composition, and why the `key()` composable is sometimes necessary.
**نموذج الإجابة:** يحدد Compose هوية كل نسخة composable بناءً على موقع استدعائها (call site) في الكود، وإذا استُدعي نفس composable عدة مرات من نفس موقع الاستدعاء (كما في حلقة for)، يُستخدَم ترتيب التنفيذ كذلك للتمييز بينها. هذا يسبب مشكلة عند تغيّر ترتيب العناصر في قائمة (مثل الإضافة في المنتصف)، حيث يُربَك Compose ويعيد تشغيل عمليات جانبية (side effects) بالخطأ. يحل `key(uniqueId)` هذه المشكلة بربط الهوية بمعرّف حقيقي للبيانات بدلاً من الموضع.

---

### Question 7: What is the role of NavController, NavHost, and NavGraph, and how do they relate to each other?
**نموذج الإجابة:** `NavGraph` هو بنية بيانات تحدد جميع الوجهات الممكنة والروابط بينها. `NavController` هو المنسّق المركزي الذي يحمل هذا الرسم البياني ويدير التنقل والـ back stack. `NavHost` هو composable مرئي يتصل بـ NavController ويعرض الوجهة الحالية فقط، مستبدلاً محتواه في كل مرة يتغيّر فيها الرسم البياني نتيجة استدعاء `navigate()`.

---

### Question 8: Explain the difference between `popBackStack()` and `popUpTo()`, and give a real-world scenario for each.
**نموذج الإجابة:** `popBackStack()` تُستخدَم للرجوع للخلف — إما للوجهة السابقة مباشرة أو لوجهة محددة عبر تمرير route، وتُستخدَم مثلاً عند الضغط على زر رجوع عادي. أما `popUpTo()` فتُستخدَم أثناء التنقل للأمام لتنظيف السجل من وجهات لم تعد مطلوبة، مثل إزالة شاشة تسجيل الدخول من السجل بعد نجاح الدخول لمنع الرجوع إليها بالخطأ.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين State وEvent بمثال واقعي
- [ ] أفهم لماذا لا تعمل المتغيرات المحلية العادية كحالة داخل composable
- [ ] أعرف الصياغات الثلاث لتعريف MutableState وأستخدم صياغة `by` بثقة
- [ ] أميّز بين remember وrememberSaveable وأعرف متى أستخدم كلاً منهما
- [ ] أفرّق بوضوح بين composable من نوع Stateful وStateless
- [ ] أستطيع تطبيق State Hoisting على أي composable بسيط بنفسي
- [ ] أفهم مبدأ Unidirectional Data Flow وأطبّقه في تصميم composables جديدة
- [ ] أعرف قواعد رفع الحالة الثلاث (Read/Write/Grouping)
- [ ] أفهم مفهوم Composition ودورة حياتها (Initial composition → Recomposition)
- [ ] أعرف متى وكيف أستخدم `key()` في القوائم الديناميكية
- [ ] أستطيع شرح الفرق بين التنقل في View System التقليدي وJetpack Compose
- [ ] أعرف الأدوار الخمسة: Host، Graph، Controller، Destination، Route
- [ ] أستطيع إنشاء NavController وNavHost وتعريف composable destinations بنفسي
- [ ] أعرف كيفية تمرير واستقبال الوسائط عبر المسار (route arguments)
- [ ] أفهم آلية عمل الـ Back Stack كبنية LIFO
- [ ] أعرف الفرق بين popBackStack وpopUpTo ومتى أستخدم كلاً منهما
- [ ] أستطيع شرح استخدام inclusive وsaveState وrestoreState
- [ ] أعرف متى ولماذا أستخدم launchSingleTop
- [ ] أفهم لماذا لا يجب تمرير NavController مباشرة لـ composables الأبناء

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Compose UI (السابقة) | هذه المحاضرة | الواجهات الثابتة تصبح تفاعلية عبر State |
| Compose State & Navigation (الحالية) | ViewModel (لاحقة) | State Hoisting يمهّد لنقل الحالة لـ ViewModel |
| Compose State & Navigation (الحالية) | بناء تطبيق كامل (لاحقة) | Navigation هو العمود الفقري لأي تطبيق متعدد الشاشات |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| State | State يصف الواجهة، Event يُغيّرها، Recomposition يُحدّثها |
| remember | يحفظ القيم عبر recomposition لكن ليس عبر تدوير الشاشة |
| rememberSaveable | يحفظ القيم عبر Bundle، ينجو من تدوير الشاشة |
| State Hoisting | value + onValueChange = composable قابل لإعادة الاستخدام |
| key() | يربط الهوية بمعرّف حقيقي بدلاً من الموضع في القائمة |
| Navigation | تنقل مبني على الحالة، يُنفَّذ عبر recomposition |
| Back Stack | بنية LIFO، تُدار عبر navigate/popBackStack/popUpTo |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدَم في |
| --- | --- | --- |
| `remember { mutableStateOf(x) }` | حالة تنجو من recomposition | أي متغيّر يجب أن يبقى بين إعادات التركيب |
| `by` | delegate syntax، وصول مباشر بدون `.value` | مع `remember`/`mutableStateOf` |
| `key(id) { }` | تثبيت الهوية في قائمة ديناميكية | حلقات for تعرض composables متكررة |
| `rememberNavController()` | إنشاء NavController ثابت | أعلى شجرة composable في التطبيق |
| `composable("route/{arg}")` | تعريف وجهة بوسيط | Navigation Graph |
| `popUpTo("route") { inclusive = true }` | إزالة وجهات من السجل أثناء التنقل للأمام | بعد عمليات لا رجعة فيها (دفع، تسجيل دخول) |
| `launchSingleTop = true` | منع تكرار نفس الوجهة | أزرار قد تُضغَط عدة مرات (تبويبات) |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | Local variables cannot hold UI state in Compose |
| 2 | UI-only, temporary state → remember | User-visible state that should survive rotation → rememberSaveable |
| 3 | State goes down, Events go up (Unidirectional Data Flow) |
| 4 | Navigation in Compose is a state-driven UI transition implemented through recomposition |
| 5 | لا تُمرِّر NavController مباشرة لـ composable فرعي — مرِّر event lambda |
| 6 | استخدم key() دائماً عند احتمال تغيّر ترتيب عناصر قائمة composables |
| 7 | تحقق دوماً من نتيجة popBackStack() قبل الاعتماد على استمرار وجود وجهة صالحة |

<!-- VALIDATION: تم تغطية جميع فقرات المحاضرة (State fundamentals، remember/mutableStateOf، Stateful/Stateless، State Hoisting، Lifecycle of Composables، Navigation fundamentals، NavController/NavHost/NavGraph، Navigate with arguments، Back Stack management بما فيها popBackStack وpopUpTo وlaunchSingleTop وsaveState/restoreState). تم الالتزام ببنية القالب المطلوبة في android-kotlin.md حرفياً: النص الأصلي (English) ← الترجمة الحرفية ← الشرح المبسّط لكل قسم، جداول الملخص الشامل، 16 سؤال MCQ، 6 أسئلة تصحيح كود، 5 تمارين إضافية، 3 تمارين تتبع تنفيذ، 2 سؤالي تصميم، 14 بطاقة Q&A، 8 أسئلة نظرية، كود مرجعي مُجمَّع، قائمة فحص ذاتي، وCheat Sheet. -->

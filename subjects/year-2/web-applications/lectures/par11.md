# المحاضرة 11 — CSS Flexbox (تخطيط الصناديق المرنة)
> **المادة:** تطوير تطبيقات الويب (القسم العملي) | **الموضوع:** CSS3 Flexbox — flex container, flex items, main/cross axis, وخصائص المحاذاة والترتيب

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### The Big Idea
Flexbox هو نظام تخطيط (layout mode) في CSS3 يخلّيك ترتّب عناصر HTML بشكل مرن على محور واحد — أفقي أو رأسي — بدون ما تلجأ لـ `float` أو حسابات معقّدة، وبيتصرف بشكل يمكن التنبؤ به مهما تغيّر حجم الشاشة.

### ليش يهمك؟
عملياً، أي تصميم فيه عناصر لازم تتوزع بالتساوي أو تتمركز أو تترتب بشكل معين (navbar، بطاقات منتجات، أزرار في نموذج) بتستخدم فيه Flexbox. وفي الامتحان، غالباً بيجيك سؤال يوريك كود CSS ويطلب منك تتوقع شكل الصفحة الناتج — يعني لازم تعرف كل خاصية شكلها إيش بالضبط.

### المتطلبات السابقة
أساسيات HTML (خاصة `div` والـ `class`) وأساسيات CSS (الـ selectors والـ `display` property). ما فيه اعتماد على JavaScript هنا — Flexbox كله CSS خالص.

### اشرح الأفكار الرئيسية — بأسلوب سردي متصل

خلّينا نبدأ من الفكرة الأساسية: أي تخطيط Flexbox قائم على شيئين — **flex container** و **flex items**. الـ container هو العنصر الأب اللي تحطّ عليه `display: flex;` (أو `inline-flex`)، والـ items هي كل العناصر الأبناء المباشرين جوّاه. بمجرد ما تحط `display: flex` على عنصر، كل أبنائه المباشرين يتحولون تلقائياً لـ flex items — ما تحتاج تسوي شي إضافي.

الحاجة المهمة اللي لازم تنتبه لها: كل شي **خارج** الـ flex container و **داخل** flex item يترندر بشكل طبيعي زي أي وقت — يعني Flexbox ما يأثر إلا على العلاقة بين الـ container وأبنائه المباشرين، مو على المحتوى اللي جوّا كل item.

هنا نوصل لأهم مفهوم في الموضوع كله: **المحورين**. فكّر إن كل flex container عنده خط وهمي اسمه **Main Axis** (المحور الرئيسي) وخط ثاني عمودي عليه اسمه **Cross Axis** (المحور المتقاطع). بشكل افتراضي، الـ main axis يكون أفقي (من اليسار لليمين) والـ cross axis رأسي. كل الخصائص اللي بنشرحها بعدين إما تتحكم بترتيب العناصر على الـ main axis أو محاذاتها على الـ cross axis — فإذا فهمت مين المحور الأساسي في كل خاصية، بتفهم شكل النتيجة بسهولة.

أول خاصية نتعامل معها هي `flex-direction`، وهي اللي تحدد اتجاه الـ main axis نفسه. القيمة الافتراضية هي `row` (من اليسار لليمين). لو حطيت `row-reverse`، العناصر تترتب بنفس الاتجاه الأفقي بس معكوسة (تبدأ من اليمين). أما `column` فتخلي الـ main axis رأسي — يعني العناصر تترتب فوق بعض بدل جنب بعض، و`column-reverse` نفس الشي بس من الأسفل للأعلى.

بعدين نيجي لـ `justify-content`، وهذي تتحكم بمحاذاة العناصر **على المحور الرئيسي** (Main Axis) — يعني أفقياً لو كنت بوضع row. القيم: `flex-start` (الافتراضي — تبدأ من بداية الـ container)، `flex-end` (تنتهي عند نهايته)، `center` (بالنص)، `space-between` (مسافات متساوية بين العناصر بس بدون مسافة قبل الأول أو بعد الأخير)، و`space-around` (مسافات متساوية حوالين كل عنصر، فيصير عندك نص مسافة في البداية والنهاية).

بالمقابل، `align-items` تتحكم بالمحاذاة **على المحور المتقاطع** (Cross Axis) — يعني رأسياً في وضع row. القيمة الافتراضية `stretch` تخلي كل item يتمدد لياخذ كامل ارتفاع الـ container. باقي القيم زي `justify-content` بالمفهوم: `flex-start`، `flex-end`، `center`، بالإضافة إلى `baseline` اللي تحاذي العناصر على خط الأساس (baseline) بتاع النص جوّاها.

نقطة مهمة تربط بين الاثنين: **`justify-content` = المحور الرئيسي، و`align-items` = المحور المتقاطع.** لو انقلب الاتجاه لـ `column`، الأدوار تنعكس — `justify-content` يصير رأسي و`align-items` يصير أفقي، لأن المحور الرئيسي نفسه انقلب.

بعدين عندنا `flex-wrap`، وهذي مختلفة شوي — تتحكم هل العناصر تلف لسطر جديد (flex line ثاني) إذا ما كفتها المساحة، أو تضل بسطر واحد وتنضغط أو تفيض. القيمة الافتراضية `nowrap` تخلي كل العناصر بخط واحد حتى لو طفشت برا الـ container (سكرول أفقي). `wrap` تخلي العناصر تلف لسطر جديد لما تخلص المساحة. و`wrap-reverse` نفس فكرة الـ wrap بس الأسطر تترتب بترتيب معكوس.

ولما يصير عندك أكثر من سطر (flex line) بسبب الـ wrap، خاصية `align-content` تدخل باللعب — هي تتحكم بمحاذاة **الأسطر نفسها** (مو العناصر جوّا كل سطر) على المحور المتقاطع. يعني لو عندك سطرين أو ثلاثة من العناصر بعد ما لفّوا، `align-content` تحدد وين تروح هالأسطر ككل — فوق، تحت، بالنص، أو موزعة بمسافات. لاحظ الفرق الدقيق: `align-items` يحاذي كل item لحاله جوّا سطره، بينما `align-content` يحاذي الأسطر كمجموعة.

بعد كذا نطلع من خصائص الـ container ونروح لخصائص تتحط **على الـ flex item نفسه**، مو الـ container. أول وحدة هي `order` — تسمحلك تغيّر ترتيب عرض عنصر معين بدون ما تغيّر ترتيبه بالـ HTML الفعلي. كل item عنده قيمة `order` افتراضية = 0، والعناصر تترتب حسب هالقيمة من الأصغر للأكبر (تقدر تحط أرقام سالبة عشان تقدّم عنصر معين).

ثاني وحدة هي استخدام `margin: auto` على مستوى الـ item — وهاي حيلة مفيدة جداً. لو حطيت `margin-right: auto` على أول عنصر بس، هالـ margin يمتص كل المساحة الفاضية المتبقية ويدفع باقي العناصر بعيد عنه — طريقة شائعة تسوي بيها navbar فيه لوجو على اليسار وروابط على اليمين. وإذا حطيت `margin: auto` بكل الاتجاهات على عنصر واحد جوّا container، بيتمركز العنصر تماماً بالنص أفقياً ورأسياً بضربة وحدة.

ثالث وحدة هي `align-self` — وهذي تسمحلك **تتجاوز** قيمة `align-items` بتاعة الـ container، بس لعنصر واحد محدد. نفس القيم بالضبط (`flex-start`, `flex-end`, `center`, `baseline`, `stretch`) بس تطبق على item واحد بدل كل العناصر.

وآخر وحدة هي خاصية `flex` نفسها، اللي تحدد طول العنصر (على المحور الرئيسي) نسبةً لباقي العناصر بنفس الـ container. لو حطيت `flex: 2` على عنصر و`flex: 1` على الباقي، العنصر الأول ياخذ ضعف المساحة اللي ياخذها كل واحد من الباقي — يعني القيم هذي نسبية بينهم مو أرقام مطلقة.

آخر شي بالمحاضرة، لاحظنا إن كل كود CSS استخدم بادئة `-webkit-` جنب الخاصية القياسية (زي `-webkit-flex` جنب `flex`) — هذا عشان توافقية المتصفحات (browser compatibility)، لأن بعض إصدارات المتصفحات القديمة تحتاج البادئة عشان تفهم خصائص Flexbox.

### الأخطاء الشائعة

#### الفهم الخاطئ ❌:
كثير طلاب يخلطون بين `justify-content` و`align-items` — يفكرون إنهم نفس الشي بس أسماء مختلفة.

#### الفهم الصحيح ✅:
`justify-content` = محاذاة على **المحور الرئيسي** (الاتجاه اللي حدده `flex-direction`)، و`align-items` = محاذاة على **المحور المتقاطع** (العمودي على الرئيسي). إذا `flex-direction: row`، فـ `justify-content` أفقي و`align-items` رأسي — ولو صار `column`، ينعكس الاثنين.

#### الفهم الخاطئ ❌:
تفكير إن `align-content` و`align-items` نفس الشي.

#### الفهم الصحيح ✅:
`align-items` يحاذي كل **item** لحاله. `align-content` يحاذي **الأسطر (flex lines) كمجموعة** — وما له معنى إلا لو فيه أكثر من سطر واحد (يعني `flex-wrap: wrap` مفعّلة وفيه لف فعلي).

> 🎯 **جملة الامتحان:** الـ `main axis` هو الاتجاه اللي يحدده `flex-direction`، والـ `cross axis` دايماً عمودي عليه — `justify-content` يشتغل على الـ main axis و`align-items`/`align-content` يشتغلوا على الـ cross axis.

### الأخطاء اللي بتطلع في الامتحان
أكثر شي متوقع: صورة كود CSS فيها قيمة معينة لـ `flex-direction` + `justify-content` أو `align-items`، ويطلب منك ترسم/تختار شكل الناتج. لازم تحدد الاتجاه الأول (المحور الرئيسي) قبل لا تحدد شكل المحاذاة. كمان متوقع سؤال يفرّق بين `space-between` و`space-around`، وسؤال يفرّق بين `align-items` و`align-content`.

### الربط مع الموضوع اللي جاي
Flexbox هو الأساس لفهم CSS Grid لاحقاً (نظام تخطيط ثاني بالـ CSS3، لكنه يشتغل على بعدين بدل بعد واحد)، وبيتكرر استخدامه بكثرة في تصميم أي component بمشاريع الويب القادمة.

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مفهوم Flex Container و Flex Items

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->

#### 📍 أين نحن الآن؟
هذا أول مفهوم بالمحاضرة — الأساس اللي كل شي بعده مبني عليه.

#### 💡 الفكرة الأساسية
**Flexbox يتكوّن من `flex container` (الأب) و `flex item` (الأبناء المباشرين) — وتفعيله يصير بس بخاصية `display`.**

#### 💻 الكود
```css
.flex-container {
  display: -webkit-flex; /* توافقية المتصفحات القديمة */
  display: flex;          /* تفعيل flexbox */
  width: 400px;
  height: 250px;
  background-color: lightgrey;
}

.flex-item {
  background-color: cornflowerblue;
  width: 100px;
  height: 100px;
  margin: 10px;
}
```
```html
<div class="flex-container">
  <div class="flex-item">flex item 1</div>
  <div class="flex-item">flex item 2</div>
  <div class="flex-item">flex item 3</div>
</div>
```

#### شرح كل سطر:
1. `display: flex;` → يحوّل العنصر لـ flex container، وكل أبنائه المباشرين يصيروا flex items تلقائياً
2. `display: -webkit-flex;` → (شرح زيادة للفهم) نسخة قديمة من نفس الخاصية لدعم متصفحات أقدم — المتصفح ياخذ آخر قيمة يفهمها
3 `width` / `height` / `background-color` على الـ container → مجرد تنسيق بصري ما له علاقة مباشرة بـ Flexbox نفسه
4. `.flex-item { ... }` → تنسيق بصري لكل item (لون، حجم، مسافة) — ما يأثر على سلوك Flexbox

#### 📖 الشرح
لما تحط `display: flex` على أي عنصر، إنت فعلياً بتعلن إنه صار flex container. من تلك اللحظة، أي عنصر ابن مباشر جواه (مو أحفاد — بس الأبناء المباشرين) يتحول تلقائياً لـ flex item، ويبدأ ياخذ سلوك مختلف عن الـ block العادي: ما يعود ياخذ عرض الصف كامل بشكل افتراضي، وبيترتب جنب إخوانه على المحور الرئيسي.

الفرق بين `flex` و`inline-flex`: الأول يخلي الـ container نفسه يترندر مثل `block` (ياخذ عرض الصف)، والثاني يخليه يترندر مثل `inline` (ياخذ بس عرض محتواه).

#### 💡 التشبيه:
> فكّر بالـ flex container زي علبة مرنة (زي علبة تحتوي كرات مطاطية)، والـ items هي الكرات جواها.
> **وجه الشبه:** العلبة (container) تتحكم كيف تترتب الكرات (items) جواها — تقدر تصفهم بالطول، تلزقهم بالنص، أو توزعهم بمسافات — بس العلبة نفسها ما تأثر على شكل كل كرة من الداخل.

#### 🎯 الملخص السريع
- Flexbox = container + items
- التفعيل بـ `display: flex` أو `display: inline-flex`
- الأبناء المباشرين بس يصيروا flex items، مو الأحفاد
- كل شي خارج الـ container أو داخل الـ item يترندر عادي

> 🎯 **جملة الامتحان:** `flex container` يُعلن بضبط خاصية `display` على `flex` (block) أو `inline-flex` (inline)، وكل عنصر ابن مباشر جواه يصير `flex item` تلقائياً.

#### 📚 التطبيق
هذا المفهوم أساس كل الخصائص الجاية بالمحاضرة — بدون container ما فيه محاور أصلاً نتكلم عنها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Flexbox consists of flex containers and flex items. A flex container is declared by setting the display property of an element to either flex (rendered as a block) or inline-flex (rendered as inline). Inside a flex container there is one or more flex items. Note: Everything outside a flex container and inside a flex item is rendered as usual."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف container/items، طريقة التفعيل، الفرق بين flex وinline-flex، وملاحظة الـ "everything outside/inside"

</details>

---

### 2. المحاور: Main Axis و Cross Axis

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
بعد ما عرفنا الـ container والـ items، لازم نفهم المحاور قبل لا ندخل بخصائص المحاذاة.

#### ⬅️ الربط مع السابق
نفس الـ container من القسم السابق — بس هالمرة بنركز على الخطوط الوهمية اللي ترتب العناصر جواه.

#### 💡 الفكرة الأساسية
**كل flex container عنده محور رئيسي (Main Axis) يحدده `flex-direction`، ومحور متقاطع (Cross Axis) عمودي عليه دايماً.**

#### 📖 الشرح
بشكل افتراضي (بدون أي `flex-direction` مخصص)، الـ Main Axis يكون أفقي (يمين-يسار) والـ Cross Axis رأسي (فوق-تحت). العناصر (flex items) تترتب على طول الـ Main Axis بترتيب واحد — يسمى **flex line**، وبشكل افتراضي فيه flex line واحد بس لكل container (إلا لو فعّلت الـ wrap لاحقاً).

هالمفهوم مهم جداً لأنه الأساس اللي يحدد اتجاه اشتغال باقي كل الخصائص الجاية — `justify-content` دايماً يشتغل على الـ Main Axis، و`align-items`/`align-content` دايماً يشتغلوا على الـ Cross Axis، بغض النظر عن اتجاه الشاشة الفعلي.

#### 💡 التشبيه:
> فكّر بالـ Main Axis زي طريق رئيسي تمشي عليه السيارات (العناصر)، والـ Cross Axis زي الرصيف العرضاني اللي يقطع الطريق.
> **وجه الشبه:** السيارات (items) تتحرك وتترتب على طول الطريق الرئيسي (main axis)، لكن موقعها يمين/يسار الطريق (فوق أو تحت الرصيف) يتحدد بالمحور المتقاطع (cross axis).

#### 🎯 الملخص السريع
- Main Axis = الاتجاه الافتراضي الأفقي (أو حسب `flex-direction`)
- Cross Axis = عمودي دايماً على الـ Main Axis
- بشكل افتراضي فيه flex line واحد بس

> 🎯 **جملة الامتحان:** الـ Cross Axis دايماً عمودي على الـ Main Axis، وأي تغيير بـ `flex-direction` يقلب دور المحورين مع بعض.

#### 📚 التطبيق
كل خاصية محاذاة جاية بالمحاضرة (`justify-content`, `align-items`, `align-content`) مبنية على تحديد أي محور تشتغل عليه — فهم هالقسم يفكّ لغز أي سؤال محاذاة بالامتحان.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Flexbox defines how flex items are laid out inside a flex container. Flex items are positioned inside a flex container along a flex line. By default there is only one flex line per flex container." (مع رسمة توضح Main Axis وCross Axis)

**ملاحظة على التغطية:**
- ✓ تم شرح: تعريف المحورين والعلاقة بينهم ومفهوم الـ flex line

</details>

⚠️ **مهم:** هذا الموضوع موضح أفضل بالرسمة في الصفحتين 5 و6 من ملف المحاضرة (Cross Axis / Main Axis) — راجعها هناك.

---

### 3. flex-direction — اتجاه المحور الرئيسي

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### 📍 أين نحن الآن؟
أول خاصية فعلية نطبقها على الـ container — تتحكم باتجاه الـ Main Axis نفسه.

#### ⬅️ الربط مع السابق
بما إنه المحور الرئيسي افتراضياً أفقي (row)، هالخاصية تسمحلك تغيّر هالاتجاه لأي واحد من أربع قيم.

#### 💡 الفكرة الأساسية
**`flex-direction` تحدد اتجاه ترتيب flex items على الـ Main Axis: صف عادي، صف معكوس، عمود، أو عمود معكوس.**

#### 💻 الكود
```css
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
  width: 400px;
  height: 250px;
  background-color: lightgrey;
}
```
```html
<div class="flex-container">
  <div class="flex-item">flex item 1</div>
  <div class="flex-item">flex item 2</div>
  <div class="flex-item">flex item 3</div>
</div>
```

#### شرح كل سطر:
1. `flex-direction: row-reverse;` → يخلي العناصر تترتب أفقياً بس من اليمين، فـ item 3 يطلع أول واحد بالمنظر

#### 📖 الشرح
القيمة الافتراضية `row` ترتب العناصر أفقياً من اليسار لليمين (حسب اتجاه الكتابة). `row-reverse` نفس الاتجاه الأفقي بس معكوس — أول عنصر بالـ HTML يطلع آخر وحدة بالمنظر البصري (مو بترتيب الـ DOM). `column` تخلي الـ Main Axis نفسه رأسي، فالعناصر تترتب فوق بعض بدل جنب بعض. `column-reverse` نفس فكرة column بس من الأسفل للأعلى.

النقطة المهمة: تغيير `flex-direction` لـ column ما بس يغيّر شكل العرض، هو فعلياً **يبدّل مين المحور الرئيسي ومين المتقاطع** — وهذا يأثر على كل خاصية محاذاة تجي بعده.

#### 💡 التشبيه:
> فكّر إن `flex-direction` زي اتجاه رف الكتب — تقدر ترصهم أفقي (row) أو تكدسهم فوق بعض عمودي (column).
> **وجه الشبه:** الكتب (items) نفسها ما تتغير، بس شكل الرف (container) هو اللي يقرر اتجاه ترتيبها.

#### 🎯 الملخص السريع
- `row` (افتراضي): أفقي، من اليسار لليمين
- `row-reverse`: أفقي، من اليمين لليسار
- `column`: رأسي، من فوق لتحت
- `column-reverse`: رأسي، من تحت لفوق

> 🎯 **جملة الامتحان:** القيمة الافتراضية لـ `flex-direction` هي `row`، و`column`/`column-reverse` يحولون الـ Main Axis من أفقي إلى رأسي.

#### 📚 التطبيق
تُستخدم دايماً في بداية تصميم أي component عشان تحدد الشكل العام: هل هو navbar أفقي أو قائمة sidebar رأسية.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن `row-reverse` يعكس ترتيب الـ HTML الفعلي (DOM order).

#### الفهم الصحيح ✅:
`row-reverse` يعكس بس **الترتيب البصري** (المكان اللي يظهر فيه كل عنصر على الشاشة)، بدون ما يغيّر ترتيب العناصر بالـ HTML نفسه — مهم لأصحاب قارئات الشاشة (accessibility).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "The flex-direction property specifies the direction of the flexible items inside the flex container. The default value of flex-direction is row (left-to-right, top-to-bottom). The other values are as follows: row-reverse - If the writing-mode (direction) is left to right, the flex items will be laid out right to left. column - If the writing system is horizontal, the flex items will be laid out vertically. column-reverse - Same as column, but reversed."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: القيم الأربعة كلها مع أمثلة الكود والنتائج البصرية من المحاضرة

</details>

---

### 4. justify-content — المحاذاة على المحور الرئيسي

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
أول خاصية محاذاة — تشتغل على الـ Main Axis اللي حدّدناه بـ `flex-direction`.

#### ⬅️ الربط مع السابق
لو `flex-direction: row` (الافتراضي)، فـ `justify-content` بيتحكم بالمحاذاة **الأفقية**. لو غيّرناها لـ `column`، بيتحكم بالمحاذاة **الرأسية**.

#### 💡 الفكرة الأساسية
**`justify-content` يحاذي flex items على المحور الرئيسي لما ما يملون كامل مساحة الـ container.**

#### 💻 الكود
```css
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 400px;
  height: 250px;
  background-color: lightgrey;
}
```
```html
<div class="flex-container">
  <div class="flex-item">flex item 1</div>
  <div class="flex-item">flex item 2</div>
  <div class="flex-item">flex item 3</div>
</div>
```

#### شرح كل سطر:
1. `justify-content: space-between;` → يوزع العناصر بحيث يكون فيه مسافة متساوية **بينهم بس**، بدون مسافة قبل الأول أو بعد الأخير (فالتصقوا بحواف الـ container)

#### 📖 الشرح
القيم الخمسة بترتيب منطقي: `flex-start` (افتراضي) يجمّع العناصر عند بداية الـ container. `flex-end` يجمّعهم عند النهاية. `center` يحطهم بالنص مع بعض (متلاصقين بالنص). `space-between` يوزع المسافة الفاضية بالتساوي **بين** العناصر بس (أول وآخر عنصر يلزقون بحواف الـ container). `space-around` يوزع المسافة حوالين **كل** عنصر، فيصير عندك نص المسافة قبل أول عنصر ونص المسافة بعد آخر عنصر (مو نفس مسافة `space-between` بالضبط عند الأطراف).

#### 💡 التشبيه:
> فكّر بأربع أو خمس ناس واقفين بصف طويل فاضي — `justify-content` يحدد وين يقفون: كلهم بالبداية، كلهم بالنهاية، بالنص، أو موزعين بمسافات متساوية.
> **وجه الشبه:** المسافة الفاضية بين الناس (items) تتوزع حسب القيمة المختارة، بينما حجم كل شخص نفسه ما يتغير.

#### 🎯 الملخص السريع
- `flex-start` (افتراضي): بداية الـ container
- `flex-end`: نهاية الـ container
- `center`: بالنص
- `space-between`: مسافة بين العناصر فقط
- `space-around`: مسافة حوالين كل عنصر (نص مسافة بالأطراف)

> 🎯 **جملة الامتحان:** `justify-content` يحاذي flex items على الـ Main Axis، والفرق بين `space-between` و`space-around` هو وجود نص مسافة عند بداية ونهاية الـ container في `space-around` بس مو في `space-between`.

#### 📚 التطبيق
شائع جداً باستخدامه لتوزيع أزرار navbar (`space-between` بين اللوجو وقائمة الروابط) أو لتوسيط محتوى صفحة (`center`).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "The justify-content property horizontally aligns the flexible container's items when the items do not use all available space on the main-axis. The possible values are as follows: flex-start - Default value... flex-end... center... space-between - Items are positioned with space between the lines. space-around - Items are positioned with space before, between, and after the lines."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: القيم الخمس كلها مع الفرق بين space-between وspace-around

</details>

---

### 5. align-items — المحاذاة على المحور المتقاطع

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن الآن؟
خاصية محاذاة ثانية، بس هالمرة على الـ Cross Axis بدل الـ Main Axis.

#### ⬅️ الربط مع السابق
نفس منطق `justify-content` بالضبط (نفس القيم تقريباً)، بس بدل ما تشتغل على المحور الرئيسي، تشتغل على المتقاطع — يعني لو `row`، هالمرة عمودياً.

#### 💡 الفكرة الأساسية
**`align-items` يحاذي flex items على المحور المتقاطع لما ما يملون كامل ارتفاع (أو عرض) الـ container.**

#### 💻 الكود
```css
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  width: 400px;
  height: 250px;
  background-color: lightgrey;
}
```

#### شرح كل سطر:
1. `align-items: center;` → يحط كل العناصر بمنتصف ارتفاع الـ container رأسياً (لأن الاتجاه row، فالـ cross axis رأسي)

#### 📖 الشرح
القيمة الافتراضية `stretch` تخلي كل item يتمدد لياخذ كامل ارتفاع الـ container (إلا لو حدّدت له `height` صريحة). `flex-start` يحط العناصر عند بداية الـ Cross Axis (فوق، لو row). `flex-end` عند النهاية (تحت). `center` بمنتصف الـ Cross Axis. أما `baseline` فتحاذي كل العناصر بحيث النص جواها يبدأ من نفس الخط الأفقي (baseline بتاع الخط)، حتى لو كانت أحجام العناصر مختلفة.

#### 💡 التشبيه:
> فكّر بصف كتب على رف — `align-items` يحدد هل الكتب تتماشى من فوق، من تحت، بالنص، أو تتمدد لتاخذ كامل ارتفاع الرف.
> **وجه الشبه:** الرف هو الـ container، والكتب هي الـ items، وارتفاع كل كتاب (item) يتغير أو موقعه يتغير حسب القيمة المختارة على المحور العمودي (cross axis).

#### 🎯 الملخص السريع
- `stretch` (افتراضي): تمدد لياخذ كامل المساحة
- `flex-start`: بداية المحور المتقاطع
- `flex-end`: نهاية المحور المتقاطع
- `center`: بالنص
- `baseline`: محاذاة حسب خط الأساس للنص

> 🎯 **جملة الامتحان:** `align-items` يحاذي flex items على الـ Cross Axis، والقيمة الافتراضية هي `stretch` — على عكس `justify-content` اللي قيمته الافتراضية `flex-start`.

#### 📚 التطبيق
يُستخدم كثير لتوسيط عناصر رأسياً جوّا navbar أو أي صف أفقي (زي توسيط أيقونة جنب نص بنفس السطر).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الخلط بين `align-items` و`justify-content` باعتبارهم يسوّون نفس الشي.

#### الفهم الصحيح ✅:
`justify-content` = محور رئيسي، `align-items` = محور متقاطع. القيمة الافتراضية أيضاً مختلفة: `justify-content` تبدأ بـ `flex-start`، بينما `align-items` تبدأ بـ `stretch`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "The align-items property vertically aligns the flexible container's items when the items do not use all available space on the cross-axis. The possible values are as follows: stretch - Default value... flex-start... flex-end... center... baseline - Items are positioned at the baseline of the container."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: القيم الخمس (stretch, flex-start, flex-end, center, baseline) مع الفرق عن justify-content

</details>

---

### 6. flex-wrap — لف العناصر لأسطر جديدة

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن الآن؟
ننتقل من خصائص المحاذاة لخاصية تتحكم بسلوك العناصر لما ما تكفيها المساحة.

#### ⬅️ الربط مع السابق
بعد ما فهمنا محاذاة العناصر جوّا سطر واحد، هالخاصية تفتح الباب لوجود أكثر من سطر (flex line) — وهذا يمهّد لـ `align-content` بالقسم الجاي.

#### 💡 الفكرة الأساسية
**`flex-wrap` تحدد هل flex items تلف لسطر جديد أو تضل بسطر واحد لما ما تكفيها المساحة.**

#### 💻 الكود
```css
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 300px;
  height: 250px;
  background-color: lightgrey;
}
```

#### شرح كل سطر:
1. `width: 300px;` → عرض ضيق يخلي 3 عناصر عرض 100px+margin ما تكفي بسطر واحد
2. `flex-wrap: wrap;` → لما تضيق المساحة، العنصر الثالث ينزل لسطر جديد بدل ما يفيض أو يتقلص

#### 📖 الشرح
القيمة الافتراضية `nowrap` تجبر كل العناصر تضل بسطر واحد حتى لو المساحة ما كفتها — والنتيجة إما انضغاط العناصر أو فيضانها برا حدود الـ container (سكرول أفقي زي ما شفنا بالمثال). `wrap` تسمح للعناصر تلف لسطر (flex line) جديد أوتوماتيكياً كل ما خلصت المساحة الأفقية. `wrap-reverse` نفس فكرة `wrap`، بس ترتيب الأسطر نفسها ينعكس (السطر الأول يطلع بالأسفل بدل الأعلى).

#### 💡 التشبيه:
> فكّر بكتابة نص بمحرر Word — لو الكلمة ما تكفيها المساحة بآخر السطر، تنزل تلقائياً لسطر جديد (Word Wrap).
> **وجه الشبه:** نفس المبدأ بالضبط — بس هنا "الكلمات" هي flex items و"السطر" هو flex line.

#### 🎯 الملخص السريع
- `nowrap` (افتراضي): سطر واحد بس، حتى لو فاض
- `wrap`: يلف لسطر جديد عند الحاجة
- `wrap-reverse`: يلف لكن بترتيب أسطر معكوس

> 🎯 **جملة الامتحان:** القيمة الافتراضية لـ `flex-wrap` هي `nowrap`، وتفعيل `wrap` هو الشرط الوحيد اللي يخلي `align-content` يكون له تأثير ملموس (لأنه يحتاج أكثر من flex line).

#### 📚 التطبيق
ضروري لأي تصميم متجاوب (responsive) فيه عدد عناصر غير معروف مسبقاً — زي بطاقات منتجات بمتجر إلكتروني.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "The flex-wrap property specifies whether the flex items should wrap or not, if there is not enough room for them on one flex line. The possible values are as follows: nowrap - Default value. The flexible items will not wrap. wrap - The flexible items will wrap if necessary. wrap-reverse - The flexible items will wrap, if necessary, in reverse order."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: القيم الثلاث ونتيجة كل واحدة بصرياً من المحاضرة

</details>

---

### 7. align-content — محاذاة الأسطر (flex lines)

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6"} -->

#### 📍 أين نحن الآن؟
آخر خاصية على مستوى الـ container — تكمل فكرة الـ `flex-wrap` اللي شرحناها بالقسم السابق.

#### ⬅️ الربط مع السابق
بدون `flex-wrap: wrap`، `align-content` ما له تأثير ظاهر — لأنه أصلاً يحتاج أكثر من flex line واحد ليشتغل عليه.

#### 💡 الفكرة الأساسية
**`align-content` يحاذي الأسطر (flex lines) كمجموعة على المحور المتقاطع، وليس العناصر لحالها.**

#### 💻 الكود
```css
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-content: center;
  align-content: center;
  width: 300px;
  height: 300px;
  background-color: lightgrey;
}
```

#### شرح كل سطر:
1. `flex-wrap: wrap;` → شرط أساسي لازم يكون موجود عشان يصير عندنا أكثر من سطر
2. `align-content: center;` → يجمّع كل الأسطر (سطرين هنا) بمنتصف ارتفاع الـ container، بدل ما يلزقوا بالأعلى

#### 📖 الشرح
القيم متشابهة مع `align-items` بالاسم، بس الفرق الجوهري إنها تطبق على **مجموعة الأسطر** مو كل عنصر لحاله: `stretch` (افتراضي) تمدد الأسطر لتاخذ كل المساحة الرأسية المتوفرة. `flex-start`/`flex-end` يجمّعون الأسطر عند بداية/نهاية الـ container. `center` يحطهم بالنص. `space-between`/`space-around` يوزعون المسافة بين/حوالين الأسطر (نفس منطق `justify-content` بالضبط، بس على الأسطر بدل العناصر المفردة).

#### 💡 التشبيه:
> فكّر إن `align-items` يحاذي كل كتاب لحاله على الرف، بينما `align-content` يحاذي **الرفوف نفسها** (لو عندك أكثر من رف واحد فوق بعض) داخل الخزانة.
> **وجه الشبه:** كل رف (flex line) فيه مجموعة كتب (items)، و`align-content` يحدد موقع الرفوف ككل داخل الخزانة (container)، مو ترتيب الكتب جوّا كل رف.

#### 🎯 الملخص السريع
- يحتاج `flex-wrap: wrap` (أو wrap-reverse) عشان يكون له تأثير فعلي
- يحاذي الأسطر (flex lines) كمجموعة، مو كل عنصر لحاله
- القيم: `stretch` (افتراضي)، `flex-start`، `flex-end`، `center`، `space-between`، `space-around`

> 🎯 **جملة الامتحان:** `align-content` يشبه `align-items` بالاسم والقيم، لكنه يحاذي الأسطر (flex lines) كمجموعة وليس العناصر المفردة — وما له تأثير ظاهر إلا مع `flex-wrap: wrap` وأكثر من سطر فعلي.

#### 📚 التطبيق
يُستخدم لما عندك شبكة (grid-like) من العناصر تلف لأكثر من سطر وتبي تتحكم بموقعها الرأسي ككل داخل container أطول من محتواها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "The align-content property modifies the behavior of the flex-wrap property. It is similar to align-items, but instead of aligning flex items, it aligns flex lines. The possible values are as follows: stretch - Default value... flex-start... flex-end... center... space-between... space-around..."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف الخاصية والفرق عن align-items، وجميع القيم مع أمثلة center وflex-end من المحاضرة

</details>

---

### 8. خصائص الـ Flex Item: order, margin auto, align-self, flex

<!-- @render: {type: "code-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 📍 أين نحن الآن؟
آخر قسم بالمحاضرة — نتحول من خصائص تتحط على الـ container لخصائص تتحط على **الـ item نفسه**.

#### ⬅️ الربط مع السابق
كل الخصائص اللي شرحناها قبل كذا (`justify-content`, `align-items`, `align-wrap`, `align-content`) تتحط على الـ **container** وتأثر على كل العناصر مرة وحدة. الأربع خصائص هذي تتحط على **item واحد محدد** وتعطيك تحكم أدق.

#### 💡 الفكرة الأساسية
**`order` يغيّر ترتيب العرض، `margin: auto` يمتص المساحة الفاضية، `align-self` يتجاوز `align-items` لعنصر واحد، و`flex` يحدد الطول النسبي للعنصر.**

#### 💻 الكود
```css
/* 1. order — ترتيب العرض */
.first {
  -webkit-order: -1;
  order: -1; /* يخليه يظهر أول عنصر بغض النظر عن ترتيبه بالـ HTML */
}

/* 2. margin: auto — يمتص المساحة الفاضية */
.flex-item:first-child {
  margin-right: auto; /* يدفع باقي العناصر بعيد عنه لليمين */
}

/* 3. align-self — يتجاوز align-items لعنصر واحد */
.item3 {
  -webkit-align-self: center;
  align-self: center;
}

/* 4. flex — الطول النسبي */
.item1 { -webkit-flex: 2; flex: 2; } /* ياخذ ضعف مساحة الباقي */
.item2 { -webkit-flex: 1; flex: 1; }
.item3 { -webkit-flex: 1; flex: 1; }
```

#### شرح كل سطر:
1. `order: -1;` → يقدّم العنصر قبل كل العناصر اللي قيمتها الافتراضية 0، بدون تغيير ترتيب HTML
2. `margin-right: auto;` → على أول عنصر بس، يمتص كل المساحة الفاضية المتبقية بعده ويدفع الباقي بعيد
3. `align-self: center;` → يتجاوز أي قيمة `align-items` محددة على الـ container، ويطبق `center` على هالعنصر بس
4. `flex: 2;` مقابل `flex: 1;` → العنصر الأول ياخذ ضعف نسبة المساحة اللي ياخذها كل عنصر من الباقي، على المحور الرئيسي

#### 📖 الشرح
هالأربع خصائص مو مرتبطة ببعض مباشرة، بس كلهم يشتركون بشي واحد: يتحطون على مستوى الـ **item** لإعطائه تحكم مستقل عن باقي إخوانه. `order` مفيد جداً لما تبي ترتيب مختلف بالعرض عن ترتيب الكود (مثلاً لأسباب accessibility أو responsive design). `margin: auto` حيلة قوية — لو حطيتها بكل الاتجاهات (`margin: auto;`) على عنصر وحيد جوا container، بتتمركز بالضبط بنص الـ container أفقياً ورأسياً بضربة وحدة، بدون أي حسابات. `align-self` يعطيك استثناء من قاعدة `align-items` العامة لعنصر واحد بس. و`flex` (اللي هي اختصار لثلاث خصائص: `flex-grow`, `flex-shrink`, `flex-basis`) تحدد كيف يتوزع الطول المتاح على العناصر بشكل نسبي.

#### 💡 التشبيه:
> فكّر بـ `order` زي ترتيب المسابقين بسباق — الترتيب بخط النهاية (order) ما لازم يطابق ترتيب دخولهم للملعب (HTML). و`margin: auto` زي نابض (spring) يمتص أي مساحة فاضية ويدفع الأشياء المجاورة له.
> **وجه الشبه:** بكل حالة، الخاصية تتحكم بسلوك عنصر واحد بشكل مستقل عن باقي العناصر، بعكس خصائص الـ container اللي تأثر عليهم كلهم مرة وحدة.

#### 🎯 الملخص السريع
- `order`: يغيّر ترتيب العرض البصري بدون تغيير HTML (الافتراضي = 0)
- `margin: auto`: يمتص المساحة الفاضية — مفيد للدفع أو التمركز التام
- `align-self`: يتجاوز `align-items` لعنصر واحد بس، نفس القيم بالضبط
- `flex`: يحدد الطول النسبي للعنصر مقارنة بإخوانه على المحور الرئيسي

> 🎯 **جملة الامتحان:** `align-self` يستخدم نفس قيم `align-items` بالضبط، لكنه يُطبَّق على flex item واحد فقط ويتجاوز قيمة الـ container له تحديداً.

#### 📚 التطبيق
`margin: auto` للتمركز التام يُستخدم كثير بدل `justify-content: center` + `align-items: center` لما العنصر وحيد. `flex` النسبية تُستخدم بكثرة بتصميم layouts متجاوبة (زي sidebar ثابت + محتوى رئيسي مرن).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
الاعتقاد إن `order: -1` يغيّر ترتيب العنصر فعلياً بالـ DOM/HTML.

#### الفهم الصحيح ✅:
`order` يغيّر بس **الترتيب البصري المعروض**، وترتيب العناصر بالـ HTML يضل زي ما هو — مهم للـ accessibility لأن قارئات الشاشة تتبع ترتيب الـ DOM مو الـ order البصري.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> "The order property specifies the order of a flexible item relative to the rest of the flexible items inside the same container." / "Setting margin: auto; will absorb extra space. It can be used to push flex items into different positions." / "Setting margin: auto; will make the item perfectly centered in both axis" / "The align-self property of flex items overrides the flex container's align-items property for that item. It has the same possible values as the align-items property" / "The flex property specifies the length of the flex item, relative to the rest of the flex items inside the same container"

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: order، margin auto (بحالتيها: الدفع والتمركز)، align-self، flex النسبية
- ⚠️ غير مشروح بالكامل: المحاضرة ما فصّلت إن `flex` هي اختصار لـ `flex-grow`/`flex-shrink`/`flex-basis` — هذا (شرح زيادة للفهم) من الدليل مو من المحاضرة الأصلية

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **10 أسئلة** — مستوى: medium / hard

### السؤال 1 (easy)
أي خاصية تُستخدم لتفعيل flex container على عنصر HTML؟

أ) `flex-container: true;`
ب) `display: flex;`
ج) `position: flex;`
د) `layout: flex;`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `display: flex` (أو `inline-flex`) هي الطريقة الوحيدة القياسية لتفعيل flexbox على عنصر
- ❌ **الخيار أ:** `flex-container` ليست خاصية CSS موجودة أصلاً
- ❌ **الخيار ج:** `position` تتحكم بموضع العنصر (relative/absolute/...)، مالها علاقة بـ flexbox
- ❌ **الخيار د:** `layout` ليست خاصية CSS قياسية

---

### السؤال 2 (medium)
إذا كان `flex-direction: column;`، أي محور يصير هو الـ **Main Axis**؟

أ) الأفقي دايماً بغض النظر عن flex-direction
ب) الرأسي
ج) لا يوجد محور رئيسي في وضع column
د) يعتمد على `justify-content`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `column` تحول الـ Main Axis نفسه ليصير رأسياً، فالعناصر تترتب فوق بعض
- ❌ **الخيار أ:** خطأ شائع — الطلاب يفكرون الـ Main Axis أفقي دايماً، لكن `flex-direction` هي اللي تحدده
- ❌ **الخيار ج:** كل flex container عنده Main Axis دايماً، بس اتجاهه يتغير
- ❌ **الخيار د:** `justify-content` يعتمد على الـ Main Axis، مو العكس

---

### السؤال 3 (medium)
ما الفرق بين `justify-content: space-between;` و `justify-content: space-around;`؟

أ) لا فرق، نفس النتيجة تماماً
ب) `space-between` يترك مسافة فقط بين العناصر، بينما `space-around` يترك مسافة قبل الأول وبعد الأخير أيضاً
ج) `space-around` يشتغل بس مع `flex-wrap: wrap`
د) `space-between` رأسي و`space-around` أفقي

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** بالضبط الفرق الجوهري بين القيمتين
- ❌ **الخيار أ:** فيه فرق واضح في المسافات عند الأطراف
- ❌ **الخيار ج:** `justify-content` كامل يشتغل بغض النظر عن `flex-wrap`
- ❌ **الخيار د:** كلاهما يشتغل على نفس المحور (Main Axis)، الفرق مو اتجاه المحور

---

### السؤال 4 (medium)
أي خاصية تحاذي **الأسطر (flex lines)** ككل، بدل كل item لحاله؟

أ) `align-items`
ب) `justify-content`
ج) `align-content`
د) `align-self`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `align-content` تحديداً تحاذي مجموعة الأسطر، ويحتاج `flex-wrap: wrap` عشان يبان تأثيره
- ❌ **الخيار أ:** `align-items` يحاذي كل عنصر لحاله جوّا سطره
- ❌ **الخيار ب:** `justify-content` يشتغل على المحور الرئيسي، مو محاذاة الأسطر
- ❌ **الخيار د:** `align-self` يحاذي عنصر واحد بس، ويتجاوز `align-items`

---

### السؤال 5 (hard)
عندك container فيه ثلاث عناصر، القيم: `.item1 { flex: 2; }`, `.item2 { flex: 1; }`, `.item3 { flex: 1; }`. إذا كانت المساحة الكلية المتاحة على الـ Main Axis = 400px (بدون margins)، وين تقريباً تنقسم المساحة؟

أ) كل عنصر ياخذ 133px بالتساوي
ب) item1 = 200px، item2 = 100px، item3 = 100px
ج) item1 = 400px وباقي العناصر = 0px
د) القيم غير كافية لحساب أي شي

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** مجموع النسب = 2+1+1 = 4 أجزاء. item1 ياخذ 2/4 = 200px، وitem2/item3 كل وحد ياخذ 1/4 = 100px
- ❌ **الخيار أ:** هذا يصير لو كانت كل القيم `flex: 1` بالتساوي، مو `flex: 2, 1, 1`
- ❌ **الخيار ج:** `flex` نسبية مو مطلقة — القيمة 2 ما تعني "خذ كل المساحة"
- ❌ **الخيار د:** القيم كافية تماماً لأن `flex` نسب بين العناصر بنفس الـ container

---

### السؤال 6 (medium)
ما القيمة الافتراضية لخاصية `align-items`؟

أ) `flex-start`
ب) `center`
ج) `stretch`
د) `baseline`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `stretch` هي الافتراضية، وتخلي العناصر تتمدد لكامل ارتفاع الـ container
- ❌ **الخيار أ:** `flex-start` هي الافتراضية لـ `justify-content`، مو `align-items` — خطأ شائع يخلط بينهم
- ❌ **الخيار ب:** `center` قيمة اختيارية مو افتراضية
- ❌ **الخيار د:** `baseline` قيمة خاصة تعتمد على النص، مو الافتراضية

---

### السؤال 7 (easy)
أي خاصية تُستخدم لتغيير ترتيب عرض عنصر واحد بدون تغيير ترتيبه بالـ HTML؟

أ) `flex-direction`
ب) `order`
ج) `align-self`
د) `z-index`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `order` تحديداً مصممة لهالغرض، بترتيب رقمي (الافتراضي 0)
- ❌ **الخيار أ:** `flex-direction` تعكس أو تحول اتجاه **كل** العناصر مرة وحدة، مو عنصر واحد لحاله
- ❌ **الخيار ج:** `align-self` تتحكم بالمحاذاة على المحور المتقاطع، مو الترتيب
- ❌ **الخيار د:** `z-index` يتحكم بالتراكب الطبقي (stacking)، مالها علاقة بترتيب flex items

---

### السؤال 8 (hard)
عندك flex item وحيد جوّا flex container، وتبي تتمركز بالضبط بمنتصف الـ container أفقياً ورأسياً بأقل كود ممكن. أي طريقة أسرع؟

أ) `justify-content: center;` على الـ container بس
ب) `align-items: center;` على الـ container بس
ج) `margin: auto;` على الـ item نفسه
د) `text-align: center;` على الـ container

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `margin: auto` على item وحيد جوّا flex container يتمركز أفقياً ورأسياً بسطر واحد، حسب ما ذكرت المحاضرة
- ❌ **الخيار أ:** يتمركز أفقياً بس، مو رأسياً
- ❌ **الخيار ب:** يتمركز رأسياً بس، مو أفقياً — تحتاج الاثنين مع بعض عادةً
- ❌ **الخيار د:** `text-align` يتحكم بمحاذاة النص جوّا العنصر، مالها علاقة بموقع العنصر نفسه بالـ flexbox

---

### السؤال 9 (medium)
أي قيمة لـ `flex-wrap` تخلي العناصر تلف لسطر جديد، لكن بترتيب أسطر معكوس؟

أ) `wrap`
ب) `nowrap`
ج) `wrap-reverse`
د) `reverse`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `wrap-reverse` بالضبط تلف العناصر زي `wrap`، بس ترتيب الأسطر (flex lines) نفسها ينعكس
- ❌ **الخيار أ:** `wrap` يلف بس بدون عكس ترتيب الأسطر
- ❌ **الخيار ب:** `nowrap` (الافتراضي) ما يلف أصلاً
- ❌ **الخيار د:** `reverse` ليست قيمة صحيحة لخاصية `flex-wrap`

---

### السؤال 10 (medium)
`align-self` على عنصر معين تتجاوز أي خاصية على الـ container؟

أ) `justify-content`
ب) `align-items`
ج) `flex-direction`
د) `flex-wrap`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `align-self` مصممة تحديداً لتجاوز `align-items` على مستوى عنصر واحد بس
- ❌ **الخيار أ:** `justify-content` يشتغل على كل العناصر مع بعض على المحور الرئيسي، ما فيه "self" مقابلة له لعنصر واحد
- ❌ **الخيار ج:** `flex-direction` تخص الـ container ككل، ما فيها استثناء لعنصر واحد
- ❌ **الخيار د:** `flex-wrap` تخص الـ container ككل أيضاً

---

## الجزء الرابع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 مفاهيم Flexbox — التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `flex container` | العنصر الأب اللي عليه `display: flex` أو `inline-flex` |
| `flex item` | أي ابن مباشر جوّا flex container |
| `Main Axis` | المحور اللي يحدده `flex-direction` — عليه تشتغل `justify-content` |
| `Cross Axis` | المحور العمودي على الـ Main Axis — عليه تشتغل `align-items`/`align-content` |
| `flex line` | سطر واحد من flex items — بشكل افتراضي فيه سطر واحد بس |

### 🔑 خصائص الـ Container — مرجع سريع
| الخاصية | ماذا تفعل | القيمة الافتراضية |
| --- | --- | --- |
| `display` | تفعيل flex container | — |
| `flex-direction` | اتجاه المحور الرئيسي | `row` |
| `justify-content` | محاذاة على المحور الرئيسي | `flex-start` |
| `align-items` | محاذاة على المحور المتقاطع (لكل عنصر) | `stretch` |
| `flex-wrap` | لف العناصر لأسطر جديدة | `nowrap` |
| `align-content` | محاذاة الأسطر ككل على المحور المتقاطع | `stretch` |

### 🔑 خصائص الـ Item — مرجع سريع
| الخاصية | ماذا تفعل | القيمة الافتراضية |
| --- | --- | --- |
| `order` | ترتيب العرض البصري (بدون تغيير HTML) | `0` |
| `margin: auto` | امتصاص المساحة الفاضية / تمركز تام | — |
| `align-self` | يتجاوز `align-items` لعنصر واحد | `auto` (يورث من align-items) |
| `flex` | الطول النسبي للعنصر مقارنة بإخوانه | `0 1 auto` |

### 🔑 قيم `justify-content` و `align-items` — مقارنة سريعة
| القيمة | `justify-content` (Main Axis) | `align-items` (Cross Axis) |
| --- | --- | --- |
| `flex-start` | بداية الـ container (افتراضي) | بداية المحور المتقاطع |
| `flex-end` | نهاية الـ container | نهاية المحور المتقاطع |
| `center` | بالنص | بالنص |
| `space-between` | مسافة بين العناصر فقط | ❌ غير متاحة |
| `space-around` | مسافة حوالين كل عنصر | ❌ غير متاحة |
| `stretch` | ❌ غير متاحة | تمدد لكامل المساحة (افتراضي) |
| `baseline` | ❌ غير متاحة | محاذاة حسب خط الأساس للنص |

### 🔑 القواعد الذهبية
| # | القاعدة |
| --- | --- |
| 1 | `justify-content` = المحور الرئيسي (Main Axis)، `align-items`/`align-content` = المحور المتقاطع (Cross Axis) |
| 2 | تغيير `flex-direction` لـ `column` يقلب دور المحورين |
| 3 | `align-content` ما له تأثير ظاهر إلا مع `flex-wrap: wrap` وأكثر من سطر فعلي |
| 4 | `order` يغيّر الترتيب البصري بس، مو ترتيب الـ HTML |
| 5 | `margin: auto` على عنصر وحيد جوّا flex container = تمركز تام بضربة وحدة |

---

## الجزء الخامس: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما الفرق بين `flex` و `inline-flex` كقيمة لـ `display`؟
**A:** `flex` يخلي الـ container يترندر مثل block (ياخذ عرض الصف الكامل)، بينما `inline-flex` يترندر مثل inline (ياخذ بس عرض محتواه).

### البطاقة 2
**Q2:** أي محور تشتغل عليه `justify-content`؟
**A:** المحور الرئيسي (Main Axis) — اللي يحدده `flex-direction`.

### البطاقة 3
**Q3:** ما الفرق بين `align-items` و `align-content`؟
**A:** `align-items` يحاذي كل flex item لحاله جوّا سطره، بينما `align-content` يحاذي الأسطر (flex lines) كمجموعة — وله تأثير بس لو فيه أكثر من سطر واحد.

### البطاقة 4
**Q4:** متى تحتاج تستخدم `flex-wrap: wrap`؟
**A:** لما تبي العناصر تلف لسطر جديد (flex line) بدل ما تنضغط أو تفيض خارج الـ container، عادةً لأسباب التصميم المتجاوب.

### البطاقة 5
**Q5:** كيف تتمركز flex item وحيد بمنتصف الـ container أفقياً ورأسياً بأقل كود؟
**A:** بحط `margin: auto;` على الـ item نفسه.

### البطاقة 6
**Q6:** ما وظيفة خاصية `order` على flex item؟
**A:** تحدد ترتيب عرضه البصري نسبةً لباقي العناصر، بدون ما تغيّر ترتيبه الفعلي بالـ HTML — القيمة الافتراضية 0.

### البطاقة 7
**Q7:** كيف تتجاوز قيمة `align-items` بتاعة الـ container لعنصر واحد بس؟
**A:** بحط `align-self` على ذلك العنصر بالتحديد — يستخدم نفس قيم `align-items`.

### البطاقة 8
**Q8:** إذا `.item1 { flex: 2; }` و`.item2 { flex: 1; }`، أي عنصر ياخذ مساحة أكبر على الـ Main Axis؟
**A:** `item1`، وياخذ ضعف المساحة اللي ياخذها `item2` تقريباً — لأن القيم بخاصية `flex` نسبية بين العناصر بنفس الـ container.

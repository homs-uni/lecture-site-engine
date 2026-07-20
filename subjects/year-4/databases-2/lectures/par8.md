# المحاضرة 8 — التحكم بالتزامن: بروتوكولات الأقفال والإصدارات المتعددة
> **المادة:** قواعد البيانات-2 (DBMS — Transaction Processing & Concurrency Control) | **الموضوع:** `Two-Phase Locking`، الجمود والتجويع، `MVCC`، `Snapshot Isolation`، القفل متعدد الحبيبية

---

## ملخص شامل (لكل من تعب أو ما يركز)

> **هذا الملخص الشامل كامل كافي — لو قرأت هذا بس، انت خلصت. ما تحتاج المحاضرة أو التفاصيل.**

### The Big Idea

المحاضرة كلها عن سؤال واحد: **لما أكثر من `transaction` تشتغل بنفس الوقت على نفس البيانات، كيف نضمن إنه النتيجة النهائية تطلع صحيحة (`serializable`) بدون ما نخلي كل واحدة تنتظر الثانية بشكل مبالغ فيه؟** والحل الأساسي اللي بتدور حوله المحاضرة هو `locking` (الأقفال)، وبالأخص بروتوكول اسمه `Two-Phase Locking (2PL)`.

### ليش هذا مهم؟

تخيل بنك فيه آلاف الأشخاص يسحبون ويودعون بنفس اللحظة. لو ما فيه تحكم بالتزامن، ممكن شخصين يقرؤون نفس الرصيد بنفس الوقت، كل واحد يعدّل عليه بدون ما يشوف تعديل الثاني، وتضيع عملية كاملة. هذا بالضبط اللي يصير في أي نظام حقيقي (حجز طيران، تحويل بنكي، تسجيل مقرر جامعي). في الامتحان هذا الموضوع أساسي لأنه يُختبر بطريقتين: نظرياً (تعريف المصطلحات) وعملياً (تتبع `schedule` معين وتحديد هل هو `serializable` أو فيه `deadlock`).

### إيش تحتاج تعرفه قبل البداية

هذا الدرس يبني مباشرة على مفهومين لازم يكونوا واضحين عندك من قبل:
- **`Transaction`**: مجموعة عمليات (`read`/`write`) تُعامل كوحدة واحدة (إما تنفّذ كلها أو ولا وحدة منها).
- **`Serializability`**: أي `schedule` (ترتيب تنفيذ متداخل لعدة transactions) لازم يعطي نفس نتيجة أي `schedule` تسلسلي (transaction كاملة بعد الثانية). هذا هو "معيار النجاح" اللي كل تقنيات هذه المحاضرة تحاول تحققه.

### الآن: اشرح الموضوع بالكامل

**المشكلة الأساسية:** إذا سمحنا لعدة `transactions` توصل لنفس البيانات بدون تنسيق، ممكن يصير تضارب: واحدة تقرأ قيمة قديمة، وحدة ثانية تكتب فوقها، والنتيجة تطلع مختلفة تماماً عن أي ترتيب تسلسلي منطقي. الحل: `concurrency control protocols` — قواعد تضبط الوصول للبيانات وتضمن `serializability`.

**الحل الرئيسي — `Locking`:** فكرة الـ `lock` بسيطة: كل عنصر بيانات (`data item`) عنده متغيّر مرتبط فيه اسمه `LOCK`، يوصف حالته. أبسط شكل هو `binary lock`: قيمة `1` تعني العنصر مقفول (محد غيرك يوصله)، وقيمة `0` تعني مفتوح. بس هذا النوع بدائي جداً — ما يفرّق بين قراءة وكتابة، فلو واحد قافل العنصر للقراءة بس، محد ثاني يقدر حتى يقرأه معه، مع إن قراءتين ما بيتعارضوا أبداً. فجاء الحل الأفضل: **`shared/exclusive locks`** (أو `read/write locks`). فيه ثلاث عمليات: `read_lock(X)` (يسمح بمشاركة القراءة مع transactions ثانية)، `write_lock(X)` (حصري، محد يقدر يوصل العنصر وياه)، و`unlock(X)`. فيه عداد `no_of_reads` يتابع كم `transaction` قافلة العنصر للقراءة بنفس الوقت، ولما يوصل صفر يصير العنصر مفتوح تماماً.

فيه كمان مفهوم اسمه **`lock conversion`**: `transaction` ممسكة `read_lock` وتحتاج تكتب، تقدر "ترفّع" القفل لـ `write_lock` — هذا اسمه `upgrading`. والعكس (من `write` إلى `read`) اسمه `downgrading`.

**البروتوكول الأهم — `Two-Phase Locking (2PL)`:** مجرد إنك تستخدم `locks` ما يضمن `serializability` تلقائياً! لازم تتبع قاعدة محددة اسمها `2PL`: **كل عمليات القفل (`lock`) لازم تسبق أول عملية فتح قفل (`unlock`) في الـ transaction**. هذا يقسّم حياة الـ transaction لمرحلتين:
1. **`Expanding (Growing) phase`**: تقدر تحصل على `locks` جديدة، بس ما تقدر تفك أي قفل. أي `upgrading` (ترفيع قفل) لازم يصير هنا.
2. **`Shrinking phase`**: تقدر تفك `locks` موجودة، بس ما تقدر تحصل على جديدة. أي `downgrading` لازم يصير هنا.

فكّر فيها زي شخص يدخل مكتبة يجمع كتب (مرحلة التوسع)، ولما يبدأ يرجّع الكتب (مرحلة الانكماش) ما يرجع يسحب كتاب جديد. **القاعدة:** لو كل `transaction` بجدول (`schedule`) اتبعت `2PL`، الجدول مضمون يكون `serializable`. بس المقابل: `2PL` يحد من درجة التزامن الممكنة — فيه جداول `serializable` بالفعل بس `2PL` بيرفضها لأنها ما تتبع نفس القاعدة الصارمة.

**أنواع الـ `2PL`:** فيه أربع نسخ:
- **`Basic 2PL`**: النسخة العادية اللي شرحناها.
- **`Conservative (static) 2PL`**: الـ `transaction` تقفل *كل* العناصر اللي بتحتاجها من البداية قبل ما تبدأ تنفذ أي شيء (تعرف مسبقاً `read-set` و`write-set`). ميزتها: **خالية من الجمود (`deadlock-free`)** تماماً لأنه ما فيه انتظار متبادل ممكن يصير أثناء التنفيذ.
- **`Strict 2PL`**: الـ transaction ما تفك أي `exclusive (write) lock` إلا بعد ما تعمل `commit` أو `abort`. هذا يمنع مشكلة قراءة بيانات "قذرة" (`dirty read`) من transaction ثانية قبل ما التغيير يتأكد.
- **`Rigorous 2PL`**: الأشد — ما تفك *أي* قفل (سواء قراءة أو كتابة) إلا بعد `commit`/`abort`. هذا النوع أكثرهم أماناً بس أعلاهم `overhead` (تكلفة انتظار).

**مشكلة الـ `Locking`: الجمود (`Deadlock`) والتجويع (`Starvation`):** لما نستخدم `locks`، فيه احتمال يصير **`deadlock`**: `transaction T1` مستنية عنصر مقفول من `T2`، و`T2` بنفس الوقت مستنية عنصر مقفول من `T1` — الاثنتين عالقتين للأبد بدون حل. نتصور هذا برسم اسمه **`wait-for graph`**: كل `transaction` عقدة، والسهم من `T1` لـ `T2` يعني "`T1` مستنية عنصر مقفول من `T2`". لو صار فيه دورة (`cycle`) بالرسم، معناها فيه `deadlock` أكيد.

فيه طرق نتعامل فيها مع المشكلة:
- **`Deadlock prevention`**: نمنع المشكلة من الأساس — إما كل transaction تقفل كل شيء بالأول (زي `Conservative 2PL`)، أو نرتب كل عناصر قاعدة البيانات ترتيب ثابت وكل transaction تقفلها بنفس هذا الترتيب دايماً. المشكلة: الطريقتين غير عمليتين (`impractical`) بالواقع لأنه صعب تعرف مسبقاً كل شيء بتحتاجه transaction.
- **بروتوكولات مبنية على `timestamp`**: `Wait-Die` و`Wound-Wait`. الاثنتين تستخدمن `timestamp` (وقت بدء الـ transaction) عشان تقررن مين يستنى ومين يتلغى (يـ`rollback`) لما يصير تعارض بين transaction قديمة (O) وواحدة أحدث (Y):

| السيناريو | `Wait-Die` | `Wound-Wait` |
| --- | --- | --- |
| O تحتاج مورد ممسوكه Y | O تستنى | Y تُلغى (`dies`) |
| Y تحتاج مورد ممسوكه O | Y تُلغى (`dies`) | Y تستنى |

- **`No waiting algorithm`**: لو transaction ما قدرت تحصل على `lock` فوراً، تُلغى مباشرة وتُعاد من جديد بعدين — بسيط بس ممكن يلغي transactions كتير بلا داعي.
- **`Deadlock detection`**: نخلي النظام يشتغل عادي، وبين فترة وفترة يفحص إذا فيه `deadlock` فعلاً صار (عن طريق فحص الـ `wait-for graph` بحثاً عن دورة). لو لقى، يختار "ضحية" (`victim selection`) — transaction وحدة يلغيها عشان يفك الدورة.
- **`Timeouts`**: طريقة بسيطة — لو transaction استنت أكثر من وقت معين محدد مسبقاً، تُلغى تلقائياً (بافتراض إنها عالقة بـ deadlock حتى لو ما تأكدنا).

وفيه مشكلة ثانية شبيهة اسمها **`Starvation`**: transaction معينة ما تقدر تكمل لفترة طويلة جداً، مع إن باقي الـ transactions ماشية عادي — مو لازم يكون فيه `deadlock`، بس هي بالذات "تنحرم" باستمرار (مثلاً يتم اختيارها كضحية بشكل متكرر). الحل الأبسط: طابور `first-come-first-served` — أول وحدة تطلب `lock`، أول وحدة تاخذه.

**طريقة بديلة كلياً — `Multiversion Concurrency Control (MVCC)`:** بدل ما نمنع القراءة/الكتابة بأقفال، نحتفظ بعدة نسخ (`versions`) من نفس العنصر. بهذا الشكل، عمليات قراءة كانت رح تُرفض بتقنيات ثانية، تقدر تُقبل هنا لأنها تقرأ نسخة أقدم من العنصر بدل أحدث نسخة — وبرضو نضمن `serializability`. الكلفة: نحتاج مساحة تخزين إضافية (لأنك محتفظ بنسخ متعددة مو نسخة وحدة). فيه أنواع من `MVCC`: مبني على `timestamp ordering`، مبني على `2PL`، أو مبني على `validation/snapshot isolation`.

**`Validation (Optimistic) Techniques`:** هذا نهج "متفائل" — نفترض إنه غالباً ما بيصير تعارض، فنخلي الـ transaction تشتغل بحرية، وبس عند اللحظة الأخيرة نتحقق. ثلاث مراحل:
1. **`Read phase`**: الـ transaction تقرأ من عناصر مؤكدة (`committed`)، بس أي تعديل (`write`) تسويه يروح على نسخة محلية مؤقتة (`cache`)، مو على قاعدة البيانات الحقيقية.
2. **`Validation phase`**: قبل ما تكتب أي شيء فعلي، النظام يتأكد هل تنفيذها كان بيحافظ على `serializability`.
3. **`Write phase`**: لو التحقق نجح، التعديلات تتطبق فعلياً على قاعدة البيانات. لو فشل، الـ transaction تُعاد من جديد (`restart`).

**`Snapshot Isolation`:** مرتبطة بفكرة `MVCC`، بس بأسلوبها الخاص: الـ transaction "تشوف" قاعدة البيانات كأنها لقطة (`snapshot`) واحدة ثابتة من اللحظة اللي بدأت فيها — أي تعديل صار بعد بداية الـ transaction، هي ما تشوفه أبداً. الميزة الكبيرة: **عمليات القراءة ما تحتاج `read locks` إطلاقاً** (لأنها تقرأ من نسخة تاريخية ثابتة، ما فيه تعارض ممكن)، بس **عمليات الكتابة لسا تحتاج `write locks`**. النظام يحتفظ بمخزن مؤقت للنسخ القديمة (`temporary version store`) عشان كل transaction تقدر تشوف "لقطتها" الخاصة.

**`Granularity` (حجم البيانات المقفولة):** لما نسوي `lock`، على أي حجم بيانات نطبقه؟ ممكن يكون على `record` واحد (حبيبة دقيقة/`fine`)، أو على `page` كاملة أو `file` كامل أو حتى قاعدة البيانات كلها (حبيبة خشنة/`coarse`). فيه مقايضة واضحة: كل ما كبر حجم العنصر المقفول، كل ما قلّ التزامن الممكن (لأنك تمنع أكثر transactions من الوصول). وكل ما صغر الحجم، كل ما احتجنا أقفال أكثر (`overhead` أعلى). ما فيه حجم "مثالي" واحد — يعتمد على نوع الـ transaction.

**`Multiple Granularity Level Locking (MGL)`:** حل وسط ذكي — نبني تسلسل هرمي (`hierarchy`) للبيانات: قاعدة البيانات (`db`) → ملفات (`files`) → صفحات (`pages`) → سجلات (`records`). عشان نقفل عنصر عميق بالشجرة (مثلاً `record` معين) بكفاءة، نحتاج طريقة نخبر فيها بقية الـ transactions "أنا رح أقفل شي جوّا هذا الفرع" بدون ما نقفل الفرع كامل. هنا تجي فكرة **`Intention locks`**:
- **`IS` (`Intention-Shared`)**: "رح أطلب `shared lock` على عنصر تحتي."
- **`IX` (`Intention-Exclusive`)**: "رح أطلب `exclusive lock` على عنصر تحتي."
- **`SIX` (`Shared-Intention-Exclusive`)**: العقدة الحالية مقفولة `shared`، بس رح أطلب `exclusive` على عنصر تحتها كمان.

القاعدة العامة لـ `MGL` (ست قواعد أساسية):
1. لازم نلتزم بجدول توافق الأقفال (`lock compatibility matrix`).
2. جذر الشجرة لازم يُقفل أولاً (بأي وضع).
3. عقدة `N` تقدر تُقفل بوضع `S` أو `IS` فقط إذا الأب مقفول (من نفس الـ transaction) بوضع `IS` أو `IX`.
4. عقدة `N` تقدر تُقفل بوضع `X`، `IX`، أو `SIX` فقط إذا الأب مقفول بوضع `IX` أو `SIX`.
5. الـ transaction ما تقدر تقفل عقدة جديدة بعد ما تكون فكّت أي قفل (تطبيق `2PL`).
6. الـ transaction ما تقدر تفك قفل عن عقدة إلا إذا كل أولادها (`children`) مو مقفولين منها.

**استخدام الأقفال في الفهارس (`Indexes`):** فهارس `B-tree`/`B+-tree` عبارة عن أشجار من صفحات القرص. لو قفلنا كل صفحة زي أي عنصر بيانات عادي، رح نعطّل transactions كتير لأن كل استعلام تقريباً يمر من نفس الجذر. فيه طريقتين مختلفتين:
- **`Conservative approach`**: نقفل الجذر بوضع `exclusive` أول شي، بعدين نوصل للابن المناسب — لو الابن مو ممتلئ (يعني الإدخال مو رح يسبب انقسام)، نفك قفل الجذر فوراً.
- **`Optimistic approach`**: نطلب ونمسك `shared locks` على العقد اللي بالمسار للورقة (`leaf`)، مع `exclusive lock` على الورقة نفسها بس. لو الإدخال سبب انقسام (`split`) بالورقة، حينها بس نرفّع (`upgrade`) الأقفال على العقد الأعلى لوضع `exclusive`.

### الأخطاء اللي الناس دايماً تقع فيها

#### الفهم الخاطئ ❌:
كثير طلاب يفكرون إن مجرد استخدام `locks` (أي نوع) يضمن تلقائياً `serializability`. يشوفون `lock_item(X)` و`unlock(X)` ويفكرون "خلاص، محمي".

#### الفهم الصحيح ✅:
استخدام `locks` وحده ما يكفي أبداً. لازم تتبع بروتوكول محدد زي `2PL` (كل الأقفال قبل أول فك قفل). لو transaction تفك قفل ثم تحصل على قفل جديد بعده (خارج نظام المرحلتين)، ممكن الجدول يطلع `nonserializable` حتى لو كل عملية استخدمت `lock` صح. المثال بالمحاضرة يوضح هذا بالضبط: جدول فيه `T1` و`T2` يستخدمون `locks` بس ما يتبعون `2PL`، والنتيجة النهائية طلعت `nonserializable`.

---

#### الفهم الخاطئ ❌:
كثير يخلطون بين `Strict 2PL` و`Rigorous 2PL` ويفكرونهم نفس الشي.

#### الفهم الصحيح ✅:
`Strict 2PL` تمنع فك **`exclusive (write) locks`** بس قبل `commit`/`abort` — أقفال القراءة (`shared`) ممكن تُفك أبكر. أما `Rigorous 2PL` فهي أشد: ما تفك **أي قفل إطلاقاً** (سواء `read` أو `write`) إلا بعد `commit`/`abort`. يعني `Rigorous` هي النسخة الأكثر تحفظاً من الاثنتين.

---

#### الفهم الخاطئ ❌:
البعض يفكر إن `deadlock` و`starvation` نفس الشي لأن الاثنتين "الـ transaction ما تتحرك."

#### الفهم الصحيح ✅:
`Deadlock` تحديداً معناها انتظار دائري (`cycle`) بين transactions — كل وحدة مستنية الثانية بشكل متبادل، ولازم يُكتشف عن طريق `wait-for graph`. أما `Starvation` فمو لازم فيها انتظار متبادل — ممكن transaction وحدة بس تنحرم باستمرار (مثلاً تنختار كضحية بشكل متكرر بسبب سياسة معينة) بينما باقي الـ transactions تكمل عملها عادي.

### إيش اللي بيطلع في الامتحان

الدكتور غالباً يسأل عن: (1) تتبع `schedule` وتحديد هل يتبع `2PL` أو لا، وهل النتيجة `serializable`، (2) رسم `wait-for graph` من `schedule` معطى وتحديد إذا فيه `deadlock`، (3) الفرق بين أنواع `2PL` الأربعة (`Basic`, `Conservative`, `Strict`, `Rigorous`)، (4) الفرق بين `Wait-Die` و`Wound-Wait`، (5) تطبيق قواعد `MGL` الست على مثال شجرة معينة وتحديد أي `intention locks` مطلوبة، (6) الفرق بين `2PL` و`MVCC` و`Validation/Optimistic` كفلسفات مختلفة للتحكم بالتزامن.

### الربط مع الموضوع اللي جاي بعده

هذه المحاضرة هي جزء من موضوع أكبر اسمه `Transaction Processing`. بعد `Concurrency Control`، الخطوة الطبيعية الجاية هي **`Recovery Techniques`** — يعني: لو صار `crash` أثناء تنفيذ transaction (بعد ما أخذت أقفال وسوت تعديلات)، كيف نرجّع قاعدة البيانات لحالة متسقة؟ المفاهيم اللي تعلمتها هنا (خصوصاً `Strict/Rigorous 2PL` و`commit`/`abort`) أساسية عشان تفهم آليات الـ `Recovery` لاحقاً.

---

## 1. المقدمة

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "transactions_and_serializability_basics"} -->

#### 📍 أين نحن الآن؟
هذا هو القسم الافتتاحي للمحاضرة، وهو يعطي خريطة عامة لكل التقنيات اللي رح نتعمق فيها لاحقاً.

#### ⬅️ الربط مع السابق
هذا القسم يبني مباشرة على مفهوم `serializability` اللي افترضنا معرفتك فيه مسبقاً — الهدف من كل تقنية هنا هو تحقيق نفس هذا المعيار.

#### 💡 الفكرة الأساسية
**`Concurrency control protocols` هي مجموعة قواعد نطبقها أثناء تنفيذ الـ `transactions` بالتزامن، هدفها الوحيد هو ضمان `serializability` للجدول (`schedule`) الناتج.**

---

#### 📖 الشرح
المحاضرة تستعرض أربع عائلات رئيسية من التقنيات، وكل وحدة فيها رح تاخذ قسم كامل لاحقاً:

1. **`Two-phase locking protocols`**: تعتمد على قفل عناصر البيانات (`lock data items`) لمنع الوصول المتزامن غير الآمن.
2. **`Timestamp`: معرّف فريد (`unique identifier`) يُعطى لكل transaction، يُستخدم لترتيب تنفيذها منطقياً (حتى لو تنفذت فعلياً بترتيب متداخل).
3. **`Multiversion concurrency control protocols`**: تحتفظ بعدة نسخ (`versions`) من نفس عنصر البيانات، بدل نسخة وحدة، عشان تسمح بمرونة أكبر بالقراءة.
4. **`Validation` أو `certification` لـ transaction**: التحقق من `serializability` يصير بمرحلة أخيرة قبل الكتابة الفعلية، بدل ما يكون مانع من البداية.

#### 🎯 الملخص السريع
- الهدف الموحّد لكل هذه التقنيات: `serializability`.
- `2PL` = أقفال، `Timestamp` = ترتيب زمني منطقي، `MVCC` = نسخ متعددة، `Validation` = تحقق بالنهاية.
- كل تقنية عندها مقايضة مختلفة بين الأمان ودرجة التزامن المسموحة.

#### 📚 التطبيق
كل قسم جاي بالمحاضرة يفصّل واحدة من هذه الأربع عائلات، بادئين بـ `Two-Phase Locking` لأنه الأكثر شيوعاً واستخداماً بالأنظمة الحقيقية.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن هذي التقنيات الأربعة بدائل متنافسة يُختار وحدة منها بس.

#### الفهم الصحيح ✅:
هي فعلاً فلسفات مختلفة، لكن بعض الأنظمة الحقيقية تدمج أكثر من وحدة (مثلاً `MVCC` مبني جزئياً على `2PL`، كما رح نشوف لاحقاً).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Concurrency control protocols: Set of rules to guarantee serializability. Two-phase locking protocols: Lock data items to prevent concurrent access. Timestamp: Unique identifier for each transaction. Multiversion currency control protocols: Use multiple versions of a data item. Validation or certification of a transaction.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل العناصر الأربعة المذكورة بالسلايد
- ℹ️ إضافة من الدليل: التوضيح إن هذه فلسفات مختلفة قد تُدمج مع بعض

</details>

---

## 2. تقنيات القفل ثنائي المرحلة (`Two-Phase Locking Techniques`)

### 2.1. الأقفال الثنائية (`Binary Locks`)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
أول أداة عملية بنتعلمها للتحكم بالتزامن: مفهوم الـ `lock` نفسه، وأبسط شكل ممكن منه.

#### ⬅️ الربط مع السابق
بالقسم السابق ذكرنا إن `2PL` يعتمد على قفل عناصر البيانات — هنا رح نفهم إيش بالضبط يعني "قفل عنصر بيانات."

#### 💡 الفكرة الأساسية
**`Lock` هو متغير مرتبط بعنصر بيانات، يصف حالته من ناحية العمليات المسموح تطبيقها عليه، وفي أبسط شكل له (`binary lock`) عنده حالتين بس: مقفول أو مفتوح.**

#### وصف الحالات:
| الحالة | القيمة | المعنى |
| --- | --- | --- |
| `Locked` | 1 | العنصر ما يقدر أحد يوصله |
| `Unlocked` | 0 | العنصر متاح، أي transaction تقدر توصله لو طلبت |

#### 📖 الشرح
كل عنصر بقاعدة البيانات عنده `lock` واحد مرتبط فيه (`one lock for each item`). لما transaction تحتاج توصل لعنصر، تسوي عملية `lock_item(X)`. لو العنصر مفتوح (`LOCK(X) = 0`)، تقفله فوراً وتاخذ حق الوصول. لو مقفول، الـ transaction تدخل قائمة انتظار حتى يتحرر العنصر، وحينها `lock manager` (المسؤول عن تتبع كل الأقفال) يوقظها.

المشكلة الأساسية بالـ `binary lock` إنه بدائي جداً: ما يفرّق بين "بدي أقرأ بس" و"بدي أكتب". فلو transaction قافلة العنصر لمجرد إنها تقرأه، ولا transaction ثانية تقدر توصله حتى لو هي كمان بس تبي تقرأ — مع إن عمليتين قراءة أبداً ما تتعارضن منطقياً. هذا القيد يقلل التزامن بشكل غير ضروري، وهو السبب اللي يخلينا ننتقل بالقسم الجاي لنوع أذكى من الأقفال.

#### ⚙️ الخطوات / الخوارزمية: عمليات القفل والفتح للأقفال الثنائية

#### ما هدف هذه العملية؟
> تحدد بالضبط متى تحصل transaction على `lock`، ومتى تنتظر، ومين يستيقظ لما يتحرر عنصر.

```algorithm
1 | lock_item(X) | Lock Manager | إذا LOCK(X)=0 يصير LOCK(X)=1 (القفل نجح فوراً)
2 | lock_item(X) — حالة الانتظار | Lock Manager | إذا LOCK(X)=1، الـ transaction تنتظر حتى LOCK(X)=0 ويوقظها الـ lock manager، ثم تعيد المحاولة (go to B)
3 | unlock_item(X) | Lock Manager | LOCK(X) يصير 0، وإذا فيه transactions منتظرة، النظام يوقظ وحدة منها
```

#### نقاط التنفيذ:
- الانتظار يصير بشكل نائم (`wait`)، مو بتكرار فحص مستمر (`busy waiting`) — الـ `lock manager` هو اللي يوقظ الـ transaction.
- بمجرد ما transaction توصل لصف الانتظار، لازم النظام يضمن إنها تُوقظ فعلاً في وقت ما — وإلا ممكن تصير `starvation`.

#### 🎯 الملخص السريع
- `Binary lock`: قيمتين بس (0 أو 1).
- عنصر واحد = `lock` واحد.
- `Lock manager` هو المسؤول عن التتبع والتحكم.
- المشكلة: ما يفرّق بين قراءة وكتابة → مقيّد جداً.

#### 📚 التطبيق
هذا القيد بالضبط هو الدافع اللي يوصلنا للقسم الجاي: `shared/exclusive locks` — نسخة أذكى تسمح بمشاركة القراءة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن كل عنصر بقاعدة البيانات عنده نفس القفل المشترك.

#### الفهم الصحيح ✅:
كل عنصر بيانات عنده `lock` خاص فيه (`one lock for each item in the database`) — الأقفال مستقلة عن بعض، مو قفل عام واحد لكل القاعدة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Lock: Variable associated with a data item describing status for operations that can be applied. One lock for each item in the database. Binary locks: Two states (values). Locked (1): Item cannot be accessed. Unlocked (0): Item can be accessed when requested.
>
> lock_item(X): B: if LOCK(X) = 0 then LOCK(X) ← 1 (*lock the item*) else begin wait (until LOCK(X) = 0 and the lock manager wakes up the transaction); go to B end; unlock_item(X): LOCK(X) ← 0; if any transactions are waiting then wakeup one of the waiting transactions;

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف الـ `lock`، حالات `binary lock`، خوارزمية `lock_item`/`unlock_item`
- ℹ️ إضافة من الدليل: توضيح مشكلة الأداء (عدم التفريق بين قراءة/كتابة) كتمهيد للقسم الجاي

</details>

---

### 2.2. جدول الأقفال ومدير الأقفال (`Lock Table & Lock Manager`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1"} -->

#### 📍 أين نحن الآن؟
بعد ما فهمنا مفهوم القفل نفسه، هذا القسم يشرح البنية التحتية اللي تدير كل هذي الأقفال بالنظام.

#### ⬅️ الربط مع السابق
بالقسم السابق ذكرنا `lock manager` بشكل عابر — هنا رح نوضح دوره بالضبط.

#### 💡 الفكرة الأساسية
**`Lock table` هو الهيكل اللي يسجّل أي العناصر عندها أقفال حالياً، و`lock manager` هو الوحدة (`subsystem`) اللي تتابع وتتحكم بالوصول لهذي الأقفال حسب قواعد محددة.**

#### 📖 الشرح
النظام يحتاج مكان مركزي يعرف فيه "مين قافل إيش الحين" — هذا هو `lock table`. القاعدة الذهبية اللي يفرضها `lock manager` هي: **بأي لحظة معينة، `transaction` واحدة بس تقدر تمسك `lock` على عنصر معين** (بالنسبة للأقفال الثنائية على الأقل). هذا القيد الصارم هو بالضبط السبب اللي يخلي `binary locking` غير عملي لقواعد البيانات الحقيقية، لأنه يمنع حتى القراءات المتزامنة البريئة.

#### 🎯 الملخص السريع
- `Lock table`: يحدد أي العناصر مقفولة حالياً.
- `Lock manager`: يفرض القواعد ويتحكم بالوصول.
- بالأقفال الثنائية: `transaction` واحدة بس بأي وقت لكل عنصر — قيد صارم جداً.

#### 📚 التطبيق
هذا القيد هو الجسر المباشر لموضوع `shared/exclusive locks` بالقسم الجاي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر البعض إن `lock table` هيكل اختياري، والنظام ممكن يشتغل بدونه.

#### الفهم الصحيح ✅:
`lock table` ضروري لأي نظام يستخدم `locking` — بدونه ما فيه طريقة نعرف حالة كل عنصر أو نمنع تعارض بين transactions.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Lock table specifies items that have locks. Lock manager subsystem: Keeps track of and controls access to locks. Rules enforced by lock manager module. At most one transaction can hold the lock on an item at a given time. Binary locking too restrictive for database items.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: دور `lock table` و`lock manager`، والقيد الأساسي

</details>

---

### 2.3. الأقفال المشتركة/الحصرية (`Shared/Exclusive Locks`)

<!-- @render: {type: "diagram-first", visualization: "algorithm", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2"} -->

#### 📍 أين نحن الآن؟
الحل العملي لمشكلة `binary locks` — نوع أقفال أذكى يفرّق بين القراءة والكتابة.

#### ⬅️ الربط مع السابق
رجعنا للمشكلة اللي وقفنا عندها بالقسم 2.1: قراءتين ما يتعارضن، فليش نمنعهم؟

#### 💡 الفكرة الأساسية
**عمليات القراءة على نفس العنصر مو متعارضة أبداً (`not conflicting`)، لكن الكتابة تحتاج قفل حصري (`exclusive lock`) — فنستخدم ثلاث عمليات: `read_lock(X)`, `write_lock(X)`, `unlock(X)`.**

#### 📖 الشرح
الفكرة بسيطة ومنطقية: أي عدد من الـ transactions يقدرون يقرؤون نفس العنصر بنفس الوقت بدون مشاكل — فـ `read_lock` (يسمى كمان `shared lock`) يسمح بمشاركة. لكن الكتابة لازم تكون حصرية تماماً — عشان محد يقرأ نسخة نصف-محدّثة أو يكتب فوق كتابة ثانية — فـ `write_lock` (يسمى كمان `exclusive lock`) يمنع أي transaction ثانية من الوصول للعنصر إطلاقاً، سواء قراءة أو كتابة.

النظام يتابع هذا بعداد اسمه `no_of_reads(X)`: كل ما transaction تاخذ `read_lock` جديد على عنصر مقفول أصلاً للقراءة، العداد يزيد بواحد. ولما transaction تفك قفلها، العداد ينقص بواحد — ولما يوصل صفر، العنصر يرجع مفتوح تماماً ويقدر أي transaction منتظرة (قراءة أو كتابة) تاخذه.

#### ⚙️ الخطوات / الخوارزمية: عمليات القفل والفتح للأقفال ثنائية النمط

#### ما هدف هذه العملية؟
> تسمح بمشاركة القراءة بين transactions متعددة مع الحفاظ على حصرية تامة للكتابة.

```algorithm
1 | read_lock(X) — العنصر مفتوح | Lock Manager | LOCK(X) ← "read-locked"، و no_of_reads(X) ← 1
2 | read_lock(X) — العنصر مقفول للقراءة أصلاً | Lock Manager | no_of_reads(X) يزيد بواحد (لا حاجة للانتظار)
3 | read_lock(X) — العنصر مقفول بالكتابة | Lock Manager | الـ transaction تنتظر حتى LOCK(X)="unlocked"
4 | write_lock(X) — العنصر مفتوح | Lock Manager | LOCK(X) ← "write-locked" (حصري بالكامل)
5 | write_lock(X) — العنصر مقفول (قراءة أو كتابة) | Lock Manager | الـ transaction تنتظر حتى يصير العنصر "unlocked"
6 | unlock(X) — كان مقفول بالكتابة | Lock Manager | LOCK(X) ← "unlocked"، ويوقظ transaction منتظرة إن وجدت
7 | unlock(X) — كان مقفول بالقراءة | Lock Manager | no_of_reads(X) ينقص بواحد؛ إذا وصل صفر، LOCK(X) ← "unlocked" ويوقظ transaction منتظرة إن وجدت
```

#### نقاط التنفيذ:
- تحويل العنصر لـ "unlocked" بالقراءة يصير فقط لما `no_of_reads` يوصل صفر بالضبط — مو أول ما transaction وحدة تفك قفلها.
- ترتيب من يُوقظ أول (لما فيه أكثر من transaction منتظرة) يعتمد على سياسة النظام، وهذا مرتبط بمشكلة `starvation` اللي رح نشوفها لاحقاً.

#### 🎯 الملخص السريع
- `read_lock` = مشترك، يسمح بأكثر من transaction بنفس الوقت.
- `write_lock` = حصري تماماً.
- `no_of_reads` هو العداد اللي يحدد متى يرجع العنصر مفتوح فعلاً.

#### 📚 التطبيق
هذا النوع من الأقفال هو الأساس اللي رح نبني عليه بروتوكول `2PL` بالقسم الجاي — لأن `read_lock`/`write_lock`/`unlock` هي العمليات الفعلية اللي `2PL` يحدد ترتيب استخدامها.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر البعض إن `unlock(X)` من transaction واحدة كافية عشان العنصر يرجع مفتوح فوراً، حتى لو transactions ثانية قافلته للقراءة.

#### الفهم الصحيح ✅:
العنصر يرجع "unlocked" بس لما `no_of_reads(X)` يوصل صفر بالضبط — يعني كل الـ transactions اللي قافلة للقراءة لازم تفك قفلها أولاً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Shared/exclusive or read/write locks. Read operations on the same item are not conflicting. Must have exclusive lock to write. Three locking operations: read_lock(X), write_lock(X), unlock(X).
>
> read_lock(X): if LOCK(X) = "unlocked" then LOCK(X) ← "read-locked"; no_of_reads(X) ← 1. else if LOCK(X) = "read-locked" then no_of_reads(X) ← no_of_reads(X) + 1. else wait until unlocked, go to B. write_lock(X): if LOCK(X)="unlocked" then LOCK(X) ← "write-locked" else wait until unlocked, go to B. unlock(X): if write-locked then LOCK(X) ← "unlocked", wakeup a waiting transaction. else if read-locked then no_of_reads(X) ← no_of_reads(X) − 1; if no_of_reads(X) = 0 then LOCK(X) = "unlocked", wakeup a waiting transaction.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل حالات `read_lock`/`write_lock`/`unlock` والعداد `no_of_reads`

</details>

---

### 2.4. تحويل الأقفال (`Lock Conversion`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.3"} -->

#### 📍 أين نحن الآن؟
حالة خاصة: ماذا لو transaction ممسكة قفل معين وبعدين احتاجت نوع ثاني من القفل على نفس العنصر؟

#### ⬅️ الربط مع السابق
مبني مباشرة على `read_lock`/`write_lock` من القسم السابق.

#### 💡 الفكرة الأساسية
**`Lock conversion` يسمح لـ transaction ممسكة قفل أصلاً إنها "تحوّل" نوعه من حالة لثانية، بدل ما تفك القفل وتطلب وحد جديد من الصفر.**

#### 📖 الشرح
فيه اتجاهين لهذا التحويل:
- **`Upgrading`**: الـ transaction عندها `read_lock` على عنصر، وبعدين تقرر تحتاج تكتب فيه. تصدر `write_lock` بعد الـ `read_lock` — هذا اسمه ترفيع.
- **`Downgrading`**: عكس الحالة الأولى — transaction عندها `write_lock` (وضع أقوى)، وتصدر `read_lock` بعده — يعني تنزل لوضع أضعف.

هذا التفريق بين `upgrading` و`downgrading` مهم جداً لأنه سيرتبط مباشرة بقاعدة `2PL` بالقسم الجاي: كل `upgrading` لازم يصير بمرحلة معينة، وكل `downgrading` بمرحلة ثانية.

#### 🎯 الملخص السريع
- `Upgrading`: من `read` إلى `write`.
- `Downgrading`: من `write` إلى `read`.
- الاثنين يصيرون لعنصر ممسوك أصلاً، مو عنصر جديد.

#### 📚 التطبيق
بالقسم الجاي (`2PL` والمراحل)، رح نشوف بالضبط أي مرحلة يجب أن يصير فيها كل نوع تحويل.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `upgrading` و`downgrading` نفس الاتجاه أو يمكن يصيروا بأي ترتيب حر.

#### الفهم الصحيح ✅:
`Upgrading` (تقوية القفل من قراءة لكتابة) لازم يصير بمرحلة التوسع (`expanding phase`) فقط، بينما `Downgrading` (إضعاف القفل من كتابة لقراءة) لازم يصير بمرحلة الانكماش (`shrinking phase`) فقط — كما سنرى بالقسم الجاي.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Lock conversion: Transaction that already holds a lock allowed to convert the lock from one state to another. Upgrading: Issue a read_lock operation then a write_lock operation. Downgrading: Issue a read_lock operation after a write_lock operation.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف الترفيع والتخفيض

</details>

---

## 3. ضمان الترتيب التسلسلي عبر القفل ثنائي المرحلة (`Guaranteeing Serializability by 2PL`)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.4"} -->

#### 📍 أين نحن الآن؟
هذا هو قلب المحاضرة — بروتوكول `2PL` نفسه، وليش يضمن `serializability`.

#### ⬅️ الربط مع السابق
كل العمليات (`read_lock`, `write_lock`, `unlock`) اللي تعلمناها بالقسم السابق، الحين رح نحدد **ترتيب** استخدامها بدقة.

#### 💡 الفكرة الأساسية
**`Two-phase locking protocol` يقول: كل عمليات القفل بالـ transaction لازم تسبق أول عملية فتح قفل — وهذا يقسّم تنفيذ الـ transaction لمرحلتين واضحتين: توسع ثم انكماش.**

#### 📊 المخطط: مراحل `2PL`

#### ما هذا المخطط؟
> يوضّح كيف تنقسم حياة أي `transaction` تتبع `2PL` لمرحلتين متتاليتين وغير قابلتين للتراجع.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | `Expanding (Growing) phase` | مرحلة | نأخذ أقفال جديدة، ما نفك أي قفل، وهنا يصير `upgrading` |
| 2 | `Shrinking phase` | مرحلة | نفك أقفال موجودة، ما نأخذ جديدة، وهنا يصير `downgrading` |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| `Expanding` | `Shrinking` | أول عملية `unlock` | اتجاه واحد لا رجعة فيه | بمجرد ما تفك أول قفل، ممنوع تاخذ أي قفل جديد بعدها |

```diagram
type: flow
title: مراحل Two-Phase Locking
direction: LR
nodes:
  - id: start
    label: بداية Transaction
    kind: event
    level: 0
  - id: expand
    label: "Expanding Phase: أخذ locks جديدة فقط + upgrading"
    kind: process
    level: 1
  - id: first_unlock
    label: أول unlock
    kind: event
    level: 2
  - id: shrink
    label: "Shrinking Phase: فك locks فقط + downgrading"
    kind: process
    level: 3
  - id: end
    label: نهاية Transaction
    kind: event
    level: 4
edges:
  - from: start
    to: expand
    label: بداية
  - from: expand
    to: first_unlock
    label: أول فك قفل
  - from: first_unlock
    to: shrink
    label: يبدأ الانكماش
  - from: shrink
    to: end
    label: نهاية
```

#### 📖 الشرح
القاعدة صارمة وبسيطة: بمجرد ما الـ transaction تفك أي قفل واحد، ممنوع عليها بعد هذا تاخذ أي قفل جديد — نقطة بلا رجعة. لهذا سُميت "ثنائية المرحلة": مرحلة توسع (`growing`) نجمع فيها الأقفال، ومرحلة انكماش (`shrinking`) نرجّعها. وكما ذكرنا بالقسم السابق: أي `upgrading` (تقوية قفل من قراءة لكتابة) يجب يصير بمرحلة التوسع (لأنه من ناحية معينة يشبه "أخذ قفل جديد أقوى")، وأي `downgrading` يجب يصير بمرحلة الانكماش.

المثال بالمحاضرة يوضح الفرق بشكل مباشر: فيه `transaction` `T1` و`T2` تعملان على عنصرين `X` و`Y` (قيمهما الابتدائية `X=20, Y=30`). لو نفّذنا `T1` كاملة ثم `T2` (`serial schedule`)، تطلع النتيجة `X=50, Y=80`. ولو عكسنا الترتيب (`T2` ثم `T1`)، تطلع نتيجة مختلفة `X=70, Y=50` — وهذا طبيعي، كلا الترتيبين `serial` ومقبولين كل وحدة على حدة. لكن المشكلة تصير لو دمجنا `T1` و`T2` بشكل متداخل (`interleaved`) بدون اتباع `2PL` — يعني كل وحدة تفك قفل مبكراً وتاخذ قفل جديد بعده. المحاضرة تعطي `schedule` بالضبط بهذا الشكل، والنتيجة النهائية طلعت `X=50, Y=50` — وهي **`nonserializable`**، يعني ما تطابق أي واحد من نتائج الـ `serial schedules` الاثنين. هذا يثبت عملياً: استخدام `locks` وحده بدون التقيّد بترتيب `2PL` **لا يضمن** `serializability`.

#### 🎯 الملخص السريع
- `2PL` = كل الأقفال قبل أول فتح قفل.
- مرحلتين: `Expanding` (أقفال جديدة + `upgrading`) ثم `Shrinking` (فك أقفال + `downgrading`).
- لو transaction ما اتبعت `2PL`، النتيجة ممكن تطلع `nonserializable` حتى لو استخدمت `locks` صح شكلياً.
- **القاعدة الأهم:** لو *كل* transaction بجدول معين تتبع `2PL`، الجدول كامل مضمون يكون `serializable`.

#### 📚 التطبيق
بما إن `2PL` يضمن الأمان، السؤال الطبيعي الجاي: هل فيه تكلفة لهذا الأمان؟ الجواب نعم — وهذا بالضبط موضوع القسم الجاي (`Variations of 2PL`)، حيث نشوف نسخ مختلفة توازن بين الأمان ودرجة التزامن.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر البعض إن `2PL` يضمن أعلى درجة تزامن ممكنة لأنه "يحل مشكلة الـ serializability."

#### الفهم الصحيح ✅:
`2PL` يضمن `serializability`، لكنه **يحد** من درجة التزامن — فيه جداول (`schedules`) `serializable` فعلاً بس `2PL` يمنعها لأنها ما تتبع القاعدة الصارمة لمرحلتين. يعني `2PL` شرط كافٍ (`sufficient`) لكن مو شرط ضروري (`necessary`) لـ `serializability`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Two-phase locking protocol: All locking operations precede the first unlock operation in the transaction. Phases: Expanding (growing) phase — new locks can be acquired but none can be released; lock conversion upgrades must be done during this phase. Shrinking phase — existing locks can be released but none can be acquired; downgrades must be done during this phase.
>
> [مثال T1, T2 بعناصر X=20, Y=30: نتيجة serial T1 ثم T2: X=50, Y=80. نتيجة serial T2 ثم T1: X=70, Y=50. نتيجة جدول S غير متسلسل يستخدم locks بدون اتباع 2PL: X=50, Y=50 (nonserializable)]
>
> If every transaction in a schedule follows the two-phase locking protocol, schedule guaranteed to be serializable. Two-phase locking may limit the amount of concurrency that can occur in a schedule. Some serializable schedules will be prohibited by two-phase locking protocol.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف البروتوكول، المراحل، المثال الرقمي الكامل بقيمه، والنتيجة والاستنتاج

</details>

---

## 4. نسخ مختلفة من القفل ثنائي المرحلة (`Variations of Two-Phase Locking`)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
بعد ما فهمنا `2PL` الأساسي، هذا القسم يعرض أربع نسخ مختلفة منه، كل وحدة تعطي مستوى أمان/تزامن مختلف.

#### ⬅️ الربط مع السابق
كل النسخ هنا مبنية على نفس فكرة `2PL` من القسم السابق — الفرق بس بـ *متى بالضبط* تُفك الأقفال أو *متى* تُؤخذ.

#### 💡 الفكرة الأساسية
**فيه أربع نسخ من `2PL`، وكل وحدة تحل مشكلة مختلفة على حساب مرونة أقل: `Basic`, `Conservative`, `Strict`, `Rigorous`.**

#### 📊 المخطط: مقارنة نسخ `2PL`

#### وصف العُقد:
| # | النسخة | متى تأخذ الأقفال | متى تفك الأقفال |
| --- | --- | --- | --- |
| 1 | `Basic 2PL` | تدريجياً أثناء التنفيذ | تدريجياً بمرحلة الانكماش |
| 2 | `Conservative (static) 2PL` | كل الأقفال دفعة واحدة *قبل* بداية التنفيذ | تدريجياً |
| 3 | `Strict 2PL` | تدريجياً | `exclusive locks` فقط تُفك بعد `commit`/`abort` |
| 4 | `Rigorous 2PL` | تدريجياً | *أي* قفل (قراءة أو كتابة) يُفك فقط بعد `commit`/`abort` |

```diagram
type: comparison
title: نسخ Two-Phase Locking من الأقل تشدداً للأكثر
direction: LR
nodes:
  - id: basic
    label: "Basic 2PL: التقنية الأساسية"
    kind: process
    level: 0
  - id: conservative
    label: "Conservative 2PL: قفل كل شيء مسبقاً — deadlock-free"
    kind: process
    level: 1
  - id: strict
    label: "Strict 2PL: exclusive locks تُفك بعد commit/abort"
    kind: process
    level: 2
  - id: rigorous
    label: "Rigorous 2PL: كل الأقفال تُفك بعد commit/abort"
    kind: process
    level: 3
edges:
  - from: basic
    to: conservative
    label: تشدد أكثر
  - from: conservative
    to: strict
    label: تشدد أكثر
  - from: strict
    to: rigorous
    label: تشدد أكثر
```

#### 📖 الشرح
**`Basic 2PL`** هي التقنية اللي شرحناها بالقسم السابق — بدون أي إضافات.

**`Conservative (static) 2PL`** تطلب من الـ transaction تحدد وتقفل *كل* العناصر اللي بتحتاجها (`read-set` و`write-set` بالكامل) قبل ما تبدأ تنفذ أي عملية فعلية. الميزة الكبيرة: هذا النوع **خالٍ من الجمود تماماً** (`deadlock-free`) — لأنه ما فيه احتمال انتظار متبادل، بما إن كل شيء يُؤخذ دفعة واحدة بالبداية. المشكلة العملية: كثير من الأنظمة الحقيقية ما تعرف مسبقاً كل العناصر اللي بتحتاجها transaction (خصوصاً لو فيه شروط تعتمد على بيانات).

**`Strict 2PL`** تركز بالذات على `exclusive (write) locks`: هذي ما تُفك إلا بعد ما الـ transaction تعمل `commit` أو `abort` بشكل نهائي. هذا يمنع transactions ثانية من قراءة بيانات "قذرة" (`dirty data`) — يعني بيانات كتبتها transaction لسا ما تأكدت (commit) نهائياً.

**`Rigorous 2PL`** أشد نسخة على الإطلاق: ما تفك *أي* قفل، سواء `read` أو `write`، إلا بعد `commit`/`abort`. هذا يعطي أعلى مستوى أمان لكن على حساب أعلى `overhead` (وقت انتظار أطول لباقي الـ transactions).

#### 🎯 الملخص السريع
- `Basic`: النسخة العادية.
- `Conservative`: أقفال مسبقة بالكامل → `deadlock-free` لكن غير عملي.
- `Strict`: `write locks` تُفك بعد `commit`/`abort` فقط → يمنع `dirty reads`.
- `Rigorous`: كل الأقفال تُفك بعد `commit`/`abort` فقط → الأشد أماناً والأعلى `overhead`.

#### 📚 التطبيق
هذا التصنيف مهم لأن كل قاعدة بيانات حقيقية تختار نسخة معينة حسب أولوياتها (سرعة مقابل أمان). بالقسم الجاي رح نشوف المشكلة الرئيسية اللي `Locking` بشكل عام يسببها: الجمود (`Deadlock`).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `Conservative 2PL` هي "الأفضل" لأنها خالية من الجمود تماماً.

#### الفهم الصحيح ✅:
`Deadlock-free` ميزة كبيرة، لكن `Conservative 2PL` غير عملية (`impractical`) بكثير من الحالات الحقيقية، لأنها تتطلب معرفة كل العناصر مسبقاً — وهذا صعب لو التنفيذ يعتمد على شروط ديناميكية. "الأفضل" يعتمد على السياق، مو على معيار واحد بس.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Basic 2PL: Technique described on previous slides. Conservative (static) 2PL: Requires a transaction to lock all the items it accesses before the transaction begins. Predeclare read-set and write-set. Deadlock-free protocol. Strict 2PL: Transaction does not release exclusive locks until after it commits or aborts. Rigorous 2PL: Transaction does not release any locks until after it commits or aborts. Concurrency control subsystem responsible for generating read_lock and write_lock requests. Locking generally considered to have high overhead.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل النسخ الأربعة مع خصائصها ومقايضاتها

</details>

---

## 5. التعامل مع الجمود والتجويع (`Dealing with Deadlock and Starvation`)

### 5.1. تعريف الجمود (`Deadlock`) ورسم الانتظار (`Wait-For Graph`)

<!-- @render: {type: "diagram-first", visualization: "graph", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن الآن؟
المشكلة الأساسية اللي أي نظام يعتمد على `locking` لازم يواجهها ويحلها.

#### ⬅️ الربط مع السابق
كل نسخ `2PL` اللي شفناها بالقسم السابق (ما عدا `Conservative`) معرضة لهذي المشكلة.

#### 💡 الفكرة الأساسية
**`Deadlock` يصير لما كل `transaction` بمجموعة معينة تكون منتظرة عنصر مقفول من `transaction` ثانية بنفس المجموعة — انتظار دائري بلا نهاية.**

#### 📊 المخطط: مثال `Deadlock` بين `T1'` و`T2'`

#### ما هذا المخطط؟
> يوضّح كيف يصير الجمود عملياً: كل transaction تنتظر عنصر ممسوك من الثانية.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | `T1'` | transaction | ممسكة `read_lock(Y)` وتنتظر `write_lock(X)` |
| 2 | `T2'` | transaction | ممسكة `read_lock(X)` وتنتظر `write_lock(Y)` |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| `T1'` | `T2'` | `X` | انتظار | `T1'` تنتظر عنصر `X` الممسوك من `T2'` |
| `T2'` | `T1'` | `Y` | انتظار | `T2'` تنتظر عنصر `Y` الممسوك من `T1'` |

```diagram
type: graph
title: Wait-For Graph لمثال الجمود
direction: LR
nodes:
  - id: t1
    label: "T1'"
    kind: transaction
  - id: t2
    label: "T2'"
    kind: transaction
edges:
  - from: t1
    to: t2
    label: X
  - from: t2
    to: t1
    label: Y
```

#### 📖 الشرح
المثال بالمحاضرة يوضح السيناريو: `T1'` تأخذ `read_lock(Y)` وتقرأ `Y`، بعدين تحاول تأخذ `write_lock(X)` — بس `X` ممسوك من `T2'`. بنفس الوقت، `T2'` أخذت `read_lock(X)` وقرأت `X`، وتحاول تأخذ `write_lock(Y)` — بس `Y` ممسوك من `T1'`. النتيجة: الاثنتين عالقتين للأبد، كل وحدة تنتظر الثانية.

عشان نكتشف هذا برمجياً، نستخدم أداة اسمها **`wait-for graph`**: كل `transaction` تصير عقدة، وسهم من `Ti` إلى `Tj` يعني "`Ti` مستنية عنصر ممسوك حالياً من `Tj`". القاعدة الذهبية: **لو صار فيه دورة (`cycle`) بهذا الرسم، فيه `deadlock` أكيد.**

#### 🎯 الملخص السريع
- `Deadlock`: انتظار دائري متبادل بين transactions.
- `Wait-for graph`: أداة تصور تكتشف `deadlock` عن طريق البحث عن `cycle`.
- المشكلة تصير لما أكثر من transaction تحتاج نفس العناصر بترتيب متعاكس.

#### 📚 التطبيق
الأقسام الجاية تعرض حلول مختلفة لهذي المشكلة: منع (`prevention`)، تفادي (`avoidance`)، واكتشاف (`detection`).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر البعض إن `deadlock` يصير بس بين transaction اثنتين.

#### الفهم الصحيح ✅:
`deadlock` ممكن يشمل أكثر من transaction اثنتين — الدورة بالـ `wait-for graph` ممكن تمر عبر ثلاث أو أكثر transactions بشكل متسلسل قبل ما ترجع لنفس النقطة اللي بدأت منها.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Deadlock: Occurs when each transaction T in a set is waiting for some item locked by some other transaction T'. Both transactions stuck in a waiting queue. [مثال: T1' تأخذ read_lock(Y)، read_item(Y)، ثم تحاول write_lock(X). T2' تأخذ read_lock(X)، read_item(X)، ثم تحاول write_lock(Y). Wait-for graph يظهر سهم من T1' إلى T2' بعلامة X، وسهم من T2' إلى T1' بعلامة Y]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف والمثال الكامل مع الرسم البياني

</details>

---

### 5.2. منع الجمود وتفاديه (`Deadlock Prevention & Avoidance`)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.1"} -->

#### 📍 أين نحن الآن؟
حلول "استباقية" للمشكلة — نتصرف *قبل* ما الجمود يصير أصلاً.

#### ⬅️ الربط مع السابق
مبني على المشكلة اللي شرحناها بالقسم السابق — الحين نشوف كيف نمنعها من الأساس.

#### 💡 الفكرة الأساسية
**فيه طريقتين استباقيتين: `Deadlock prevention` (نمنع الشرط اللي يسبب الجمود من الأصل) و`Deadlock avoidance` (نراقب أثناء التنفيذ ونتصرف قبل ما دورة تكتمل).**

#### 📖 الشرح
**`Deadlock prevention` عن طريق `2PL` محافظ:**
- الطريقة الأولى: كل transaction تقفل *كل* العناصر اللي بتحتاجها مقدماً (هذا نفسه `Conservative 2PL` اللي شفناه بالقسم 4).
- الطريقة الثانية: نرتب كل عناصر قاعدة البيانات بترتيب ثابت مسبقاً، وأي transaction تحتاج أكثر من عنصر تقفلهم *بنفس هذا الترتيب* دايماً — بهذا الشكل ما ممكن يصير انتظار دائري لأن الكل يمشي بنفس الاتجاه.
- المشكلة: **الطريقتين غير عمليتين (`impractical`)** بالتطبيق الحقيقي.

**`Deadlock prevention` عن طريق `timestamp`:** بدل الطرق أعلاه، نعطي كل transaction `timestamp` (رقم يمثل وقت بدايتها)، ونستخدم بروتوكولين مبنيين عليه: **`Wait-Die`** و**`Wound-Wait`**.

**`Deadlock avoidance`:** فيه طرق ثانية بمكان ما تمنع المشكلة بالكامل من البداية، لكن تراقب أثناء التنفيذ: بمجرد ما الخوارزمية تكتشف إن حجب (`blocking`) transaction معينة رح يؤدي على الأغلب لدورة (`cycle`)، ترجع للخلف وتلغي (`roll back`) تلك الـ transaction فوراً قبل ما الدورة تكتمل فعلياً. خوارزميتا `Wound-Wait` و`Wait-Die` تستخدمان بالضبط لهذا الغرض — يستخدمان `timestamps` عشان يقررن مين "يُلغى" (الضحية).

#### وصف الجدول: `Wait-Die` مقابل `Wound-Wait`

| السيناريو | `Wait/Die` | `Wound/Wait` |
| --- | --- | --- |
| `O` تحتاج مورد ممسوكه `Y` | `O` تنتظر (`waits`) | `Y` تُلغى (`dies`) |
| `Y` تحتاج مورد ممسوكه `O` | `Y` تُلغى (`dies`) | `Y` تنتظر (`waits`) |

هنا `O` تمثّل transaction أقدم (`older` — timestamp أصغر)، و`Y` تمثّل transaction أحدث (`younger` — timestamp أكبر). القاعدة العامة اللي تربط الجدول: في `Wait-Die`، الأقدم (`O`) يُسمح لها تنتظر لو تحتاج مورد من الأحدث، بينما الأحدث (`Y`) تُلغى فوراً لو تحتاج مورد من الأقدم — يعني "الأقدم دايماً تربح، الأحدث دايماً تخسر أو تنتظر." أما في `Wound-Wait`، فالعكس تقريباً: الأقدم (`O`) "تجرح" (`wounds`) الأحدث وتلغيها فوراً لو احتاجت موردها، بينما الأحدث (`Y`) تنتظر لو الأقدم عندها المورد اللي تحتاجه.

#### 🎯 الملخص السريع
- `Prevention`: منع من الأساس (ترتيب مسبق أو أقفال مسبقة) — عملي بس غير مرن.
- `Avoidance`: مراقبة أثناء التنفيذ ورجوع (`rollback`) قبل اكتمال الدورة.
- `Wait-Die` و`Wound-Wait`: بروتوكولان يستخدمان `timestamp` لتحديد الضحية.

#### 📚 التطبيق
هذي الطرق "استباقية" — بالقسم الجاي رح نشوف طرق "رد فعل" (`reactive`): ما نمنع المشكلة، نتركها تصير وبعدين نكتشفها ونعالجها.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يخلط كثير من الطلاب بين `Wait-Die` و`Wound-Wait` لأن الاسمين متشابهين جداً.

#### الفهم الصحيح ✅:
الفرق الجوهري: في `Wait-Die`، الـ transaction الأقدم *دايماً* تنتظر ولا تُلغى أبداً (لو هي اللي تحتاج مورد الأحدث). في `Wound-Wait`، الـ transaction الأقدم *دايماً* تلغي الأحدث فوراً بدل ما تنتظر. باختصار: `Wait-Die` = الأقدم تصبر، `Wound-Wait` = الأقدم تتصرف بقوة وتلغي الثانية.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Deadlock prevention protocols: Every transaction locks all items it needs in advance. Ordering all items in the database. Transaction that needs several items will lock them in that order. Both approaches impractical. Protocols based on a timestamp: Wait-die, Wound-wait.
>
> Deadlock avoidance: There are many variations of two-phase locking algorithm. Some avoid deadlock by not letting the cycle to complete. That is as soon as the algorithm discovers that blocking a transaction is likely to create a cycle, it rolls back the transaction. Wound-Wait and Wait-Die algorithms use timestamps to avoid deadlocks by rolling-back victim. [جدول: O needs a resource held by Y → Wait/Die: O waits, Wound/Wait: Y dies. Y needs a resource held by O → Wait/Die: Y dies, Wound/Wait: Y waits]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: `prevention` (طريقتين + سبب عدم عمليتهما)، `avoidance`، `Wait-Die`/`Wound-Wait` مع الجدول الكامل

</details>

---

### 5.3. عدم الانتظار، الاكتشاف، والتجويع (`No-Waiting, Detection & Starvation`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.2"} -->

#### 📍 أين نحن الآن؟
الطرق "التفاعلية" اللي تتعامل مع الجمود بعد ما يصير (أو تتجنبه بأسلوب مختلف)، ومشكلة قريبة اسمها التجويع.

#### ⬅️ الربط مع السابق
هذي طرق بديلة للـ `prevention`/`avoidance` اللي شفناها بالقسم السابق.

#### 💡 الفكرة الأساسية
**`No-waiting` تلغي أي transaction ما تقدر تحصل على قفل فوراً؛ `Deadlock detection` تفحص النظام بشكل دوري بحثاً عن دورات فعلية؛ و`Starvation` مشكلة مختلفة تماماً تصير لو transaction معينة تنحرم باستمرار حتى بدون وجود جمود.**

#### 📖 الشرح
**`No waiting algorithm`**: بسيط جداً — لو transaction طلبت `lock` وما قدرت تحصل عليه فوراً، تُلغى (`aborted`) فوراً وتُعاد من جديد بعد فترة، بدل ما تنتظر بصف انتظار. هذا يمنع الجمود من الأساس (ما فيه انتظار = ما فيه دورة انتظار)، لكن على حساب إلغاء transactions كتير بشكل غير ضروري (حتى لو كانت رح تنتهي انتظارها بسرعة بدون أي مشكلة).

**`Deadlock detection`**: بدل ما نمنع المشكلة، نخلي النظام يشتغل عادي، وبشكل دوري (أو عند نقاط معينة) يفحص هل صار فعلاً `deadlock` — عن طريق بناء وفحص `wait-for graph` بحثاً عن دورة (`cycle`). لو لقى دورة، لازم يختار **ضحية** (`victim selection`) — يعني يقرر أي transaction من المتورطين يُلغى عشان يفك الدورة ويسمح للباقي يكمل.

**`Timeouts`**: طريقة عملية بسيطة، بديلة عن اكتشاف `deadlock` الفعلي — لو النظام لاحظ إن transaction معينة استنت أكثر من وقت محدد مسبقاً (`predefined time`)، يفترض إنها عالقة (سواء بجمود فعلي أو أي سبب ثاني) ويلغيها تلقائياً.

**`Starvation`**: مشكلة مختلفة تماماً عن الجمود — تصير لو transaction معينة ما تقدر تكمل لفترة غير محددة (`indefinite period`)، بينما باقي الـ transactions تكمل عملها بشكل طبيعي. مثال شائع: transaction تنحرم بشكل متكرر لأنها دايماً تُختار كضحية بسياسة `victim selection` معينة. الحل الأبسط والأشيع: طابور **`first-come-first-served`** — نعالج طلبات الأقفال بترتيب وصولها بدل أي أولوية ثانية تظلم transaction معينة باستمرار.

#### 🎯 الملخص السريع
- `No-waiting`: إلغاء فوري بدل انتظار.
- `Detection`: فحص دوري لـ `wait-for graph` + اختيار ضحية.
- `Timeouts`: إلغاء تلقائي بعد وقت محدد بدون التحقق الفعلي من وجود جمود.
- `Starvation`: حرمان طويل الأمد لـ transaction وحدة، حل بسيط = `FCFS`.

#### 📚 التطبيق
كل هذي المفاهيم (الجمود، التجويع، وحلولهم) تُستخدم بشكل مباشر لتقييم أي نظام `locking` حقيقي — وهي أساس مهم لفهم لماذا بعض الأنظمة تفضّل `MVCC` (القسم الجاي) بدل الاعتماد الكلي على `locking`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `timeouts` هي نفسها `deadlock detection` لأن الاثنتين تنتهيان بإلغاء transaction.

#### الفهم الصحيح ✅:
`Deadlock detection` تتحقق **فعلياً** من وجود دورة بـ `wait-for graph` قبل ما تلغي أي شيء — دقيقة لكن تحتاج معالجة إضافية. أما `Timeouts` فتفترض وجود مشكلة *بدون تحقق فعلي*، بمجرد ما مدة الانتظار تتجاوز حد معين — أبسط بكثير لكن أقل دقة (ممكن تلغي transaction ما فيها جمود أصلاً، بس بطيئة).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> No waiting algorithm: If transaction unable to obtain a lock, immediately aborted and restarted later. Deadlock detection: System checks to see if a state of deadlock exists. Wait-for graph.
>
> Victim selection: Deciding which transaction to abort in case of deadlock. Timeouts: If system waits longer than a predefined time, it aborts the transaction. Starvation: Occurs if a transaction cannot proceed for an indefinite period of time while other transactions continue normally. Solution: first-come-first-served queue.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: `no-waiting`، `detection`، `victim selection`، `timeouts`، تعريف `starvation` وحلها

</details>

---

## 6. تقنيات التحكم بالتزامن متعددة الإصدارات (`Multiversion Concurrency Control`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5.3"} -->

#### 📍 أين نحن الآن؟
الانتقال لفلسفة مختلفة تماماً عن `locking` — بدل منع الوصول، نحتفظ بنسخ متعددة.

#### ⬅️ الربط مع السابق
هذا القسم يعالج نفس الهدف (`serializability`) لكن بأسلوب مختلف جذرياً عن كل شي شفناه بأقسام `2PL`.

#### 💡 الفكرة الأساسية
**`Multiversion Concurrency Control (MVCC)` يحتفظ بعدة نسخ (`versions`) من نفس عنصر البيانات، مما يسمح لبعض عمليات القراءة اللي كانت رح تُرفض بتقنيات ثانية إنها تُقبل عن طريق قراءة نسخة أقدم.**

#### 📖 الشرح
الفكرة الأساسية: بدل ما نحتفظ بقيمة واحدة فقط لكل عنصر بيانات، النظام يحتفظ بعدة `versions` منه (كل تعديل ينتج نسخة جديدة، مو يمسح القديمة). هذا يعطي مرونة كبيرة: transaction تحتاج تقرأ عنصر، حتى لو النسخة "الأحدث" مقفولة أو غير متوافقة معها زمنياً، تقدر تقرأ نسخة أقدم بدل ما تُرفض بالكامل أو تنتظر — وبهذا الشكل، `serializability` تنحفظ بالرغم من زيادة المرونة.

المقابل الطبيعي: `MVCC` يحتاج **مساحة تخزين أكبر (`more storage`)** لأنك محتفظ بعدة نسخ من نفس العنصر بدل نسخة وحدة، وهذا يتطلب آلية لتنظيف النسخ القديمة اللي ما عاد أحد يحتاجها لاحقاً.

فيه ثلاثة أنواع رئيسية من مخططات `MVCC`:
1. **مبنية على `timestamp ordering`**: كل نسخة عندها `timestamp` تحدد ترتيبها.
2. **مبنية على `two-phase locking`**: تدمج فكرة النسخ المتعددة مع نظام `2PL` تقليدي.
3. **مبنية على `validation` و`snapshot isolation`**: وهذا موضوع القسمين الجايين مباشرة.

#### 🎯 الملخص السريع
- `MVCC`: نسخ متعددة بدل نسخة واحدة.
- الفائدة: قراءات أكثر تُقبل، مرونة أعلى.
- التكلفة: مساحة تخزين أكبر.
- ثلاثة أنواع: `timestamp ordering`, `2PL-based`, `validation/snapshot isolation`.

#### 📚 التطبيق
القسمين الجايين يفصّلان بالضبط النوع الثالث — `validation techniques` و`snapshot isolation` — كأمثلة عملية على `MVCC`.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `MVCC` بديل كامل ومنفصل عن `locking`، ولا علاقة بينهم.

#### الفهم الصحيح ✅:
`MVCC` عائلة واسعة من التقنيات، وبعض أنواعها فعلياً مبنية *على* `2PL` (كما ذُكر بالنص الأصلي: "Based on two-phase locking")، وحتى نوع `snapshot isolation` (القسم الجاي) لسا يحتاج `write locks` — يعني `MVCC` مو بالضرورة بديل كامل عن الأقفال، أحياناً هو دمج بينهم.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Several versions of an item are kept by a system. Some read operations that would be rejected in other techniques can be accepted by reading an older version of the item. Maintains serializability. More storage is needed. Multiversion currency control scheme types: Based on timestamp ordering. Based on two-phase locking. Validation and snapshot isolation techniques.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: تعريف `MVCC`، الفائدة، التكلفة، الأنواع الثلاثة

</details>

---

## 7. تقنيات التحقق (المتفائلة) وعزل اللقطة (`Validation Techniques & Snapshot Isolation`)

<!-- @render: {type: "diagram-first", visualization: "flow", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6"} -->

#### 📍 أين نحن الآن؟
أول نوع تفصيلي من `MVCC` — النهج "المتفائل" اللي يفترض إنه غالباً ما فيه تعارض.

#### ⬅️ الربط مع السابق
هذا واحد من الأنواع الثلاثة اللي ذكرناها بالقسم السابق: "Validation and snapshot isolation techniques."

#### 💡 الفكرة الأساسية
**بدل ما نمنع التعارض من البداية بأقفال، نخلي الـ transaction تشتغل بحرية على نسخ محلية، ونتحقق (`validate`) من `serializability` فقط عند لحظة الكتابة الفعلية النهائية.**

#### 📊 المخطط: المراحل الثلاث لتقنية التحقق

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | `Read phase` | مرحلة | قراءة من عناصر مؤكدة (`committed`)، والتعديلات تروح لنسخة محلية مؤقتة |
| 2 | `Validation phase` | مرحلة | التحقق من `serializability` قبل الكتابة الفعلية |
| 3 | `Write phase` | مرحلة | تطبيق التعديلات فعلياً (لو التحقق نجح) أو إعادة تشغيل الـ transaction (لو فشل) |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| `Read phase` | `Validation phase` | انتهاء القراءة | تسلسلي | بعد ما الـ transaction تنتهي من قراءتها وتعديلاتها المحلية |
| `Validation phase` | `Write phase` | نجاح التحقق | تسلسلي (شرطي) | فقط لو التحقق أثبت إن التنفيذ `serializable` |
| `Validation phase` | `Read phase` | فشل التحقق | رجوع (restart) | لو التحقق فشل، الـ transaction تُعاد من جديد |

```diagram
type: flow
title: مراحل تقنية التحقق (Validation/Optimistic)
direction: LR
nodes:
  - id: read
    label: "Read Phase: قراءة committed + كتابة محلية"
    kind: process
    level: 0
  - id: validate
    label: "Validation Phase: فحص serializability"
    kind: decision
    level: 1
  - id: write
    label: "Write Phase: تطبيق فعلي على قاعدة البيانات"
    kind: process
    level: 2
  - id: restart
    label: إعادة تشغيل الـ Transaction
    kind: event
    level: 2
edges:
  - from: read
    to: validate
    label: انتهاء القراءة
  - from: validate
    to: write
    label: نجح التحقق
  - from: validate
    to: restart
    label: فشل التحقق
  - from: restart
    to: read
    label: محاولة جديدة
```

#### 📖 الشرح
هذا النهج يُسمى "متفائل" (`optimistic`) لأنه يفترض إن التعارض بين transactions نادر، فبدل ما "يحجز" العناصر من البداية زي `locking`، يخلي كل شيء يشتغل بحرية تامة، ويتحقق فقط عند النهاية.

**المرحلة الأولى (`Read phase`):** الـ transaction تقدر تقرأ قيم عناصر مؤكدة (`committed data items`) من قاعدة البيانات بحرية. لكن أي تعديل (`write`) تسويه *ما يروح مباشرة لقاعدة البيانات الحقيقية* — يروح على نسخة محلية (`local copies` أو `versions`) مؤقتة، غالباً بذاكرة تخزين مؤقت (`database cache`) خاصة فيها.

**المرحلة الثانية (`Validation phase`):** قبل ما نسمح لهذي التعديلات المحلية تصير فعلية، النظام يتحقق: لو طبّقنا هذي التعديلات الآن، هل النتيجة النهائية بتظل `serializable` بالنسبة لكل الـ transactions الثانية اللي اشتغلت بنفس الفترة؟

**المرحلة الثالثة (`Write phase`):** لو التحقق نجح، التعديلات المحلية تُطبّق فعلياً على قاعدة البيانات الحقيقية (يصيرون `committed`). لو التحقق فشل (يعني فيه تعارض فعلي مع transaction ثانية)، الـ transaction بأكملها تُلغى وتُعاد من جديد (`restarted`) من الصفر.

#### 🎯 الملخص السريع
- نهج متفائل: نفترض قلة التعارض ونتحقق بالنهاية بس.
- ثلاث مراحل: `Read` (قراءة committed + كتابة محلية) → `Validation` (فحص) → `Write` (تطبيق أو إعادة تشغيل).
- الفشل بمرحلة التحقق = إعادة تشغيل كاملة للـ transaction.

#### 📚 التطبيق
هذا النهج مرتبط ومتصل بشكل مباشر بمفهوم `Snapshot Isolation` بالقسم الجاي — كلاهما يعتمدان على قراءة نسخ محددة بدل الحجب المباشر بالأقفال.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر البعض إن التعديلات بمرحلة `Read phase` تُطبق مباشرة على قاعدة البيانات فوراً.

#### الفهم الصحيح ✅:
كل التعديلات بمرحلة `Read phase` تُطبق فقط على **نسخ محلية مؤقتة** (`local copies`)، مو على قاعدة البيانات الحقيقية. التطبيق الفعلي يصير فقط بمرحلة `Write phase`، وبس بشرط نجاح `Validation phase` أولاً.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> In this technique only at the time of commit serializability is checked and transactions are aborted in case of non-serializable schedules. Three Phases: 1. Read phase: A transaction can read values of committed data items. However, updates are applied only to local copies (versions) of the data items (in database cache). 2. Validation phase: Serializability is checked before transactions write their updates to the database. 3. Write phase: On a successful validation transactions' updates are applied to the database; otherwise, transactions are restarted.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المراحل الثلاث بتفصيلها الكامل

</details>

---

## 8. التحكم بالتزامن المبني على عزل اللقطة (`Concurrency Control Based on Snapshot Isolation`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 📍 أين نحن الآن؟
تطبيق آخر من عائلة `MVCC`، مبني على فكرة "اللقطة الثابتة."

#### ⬅️ الربط مع السابق
مرتبط مباشرة بـ `MVCC` (القسم 6) ويشترك بأفكار مع تقنية `Validation` (القسم 7)، لكنه يقدّم آلية مختلفة تماماً بالتفاصيل.

#### 💡 الفكرة الأساسية
**الـ `transaction` بـ `snapshot isolation` "تشوف" قاعدة البيانات كأنها لقطة ثابتة (`snapshot`) من لحظة بدايتها، ولا تشوف أي تعديل صار بعد ذلك.**

#### 📖 الشرح
الفكرة المركزية هنا: الـ transaction ترى قيم عناصر البيانات بناءً على القيم **المؤكدة (`committed`)** كما كانت باللحظة اللي بدأت فيها هي بالضبط — يعني ما ترى أي تعديل صار *بعد* بدايتها، حتى لو تعديلات ثانية اكتملت وأُكدت أثناء ما هي شغالة.

هذا يعطي ميزة عملية كبيرة جداً: **عمليات القراءة ما تحتاج `read locks` إطلاقاً** — لأنك تقرأ من نسخة تاريخية ثابتة (لقطة)، ما فيه أي احتمال تعارض مع transaction ثانية تكتب حالياً. لكن **عمليات الكتابة لسا تحتاج `write locks`** — لأن الكتابة الفعلية على قاعدة البيانات الحقيقية لازم تظل محمية ومنسقة.

عشان هذا كله يشتغل، النظام يحتاج **`temporary version store`** — مخزن مؤقت يحتفظ بالنسخ الأقدم من العناصر المحدّثة، عشان أي transaction بدأت قبل تحديث معين تقدر لسا توصل نسختها القديمة الصحيحة.

#### 🎯 الملخص السريع
- `Snapshot isolation` = رؤية ثابتة لقاعدة البيانات من لحظة البداية.
- `Read operations`: بدون `locks` إطلاقاً.
- `Write operations`: لسا تحتاج `write locks`.
- `Temporary version store`: يحتفظ بالنسخ القديمة لإتاحتها للـ transactions اللي بدأت قبلها.

#### 📚 التطبيق
`Snapshot isolation` تكمل الصورة الكاملة لعائلة `MVCC` (قارن مع `Validation` بالقسم السابق و`MVCC` العام بالقسم 6)، وبهذا نكون غطينا كل بدائل `locking` التقليدي بالمحاضرة قبل ما ننتقل لموضوع مختلف كلياً: حجم البيانات المقفولة (`Granularity`).

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `snapshot isolation` يعني عدم استخدام أي `locks` إطلاقاً بما إنه جزء من `MVCC`.

#### الفهم الصحيح ✅:
`snapshot isolation` تلغي الحاجة لـ `read locks` بس، بينما **`write locks` لسا مطلوبة** لعمليات الكتابة — يعني `MVCC` بهذا الشكل مو بديل كامل عن `locking`، هو تخفيف جزئي (على القراءات بالذات).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Transaction sees data items based on committed values of the items in the database snapshot. Does not see updates that occur after transaction starts. Read operations do not require read locks. Write operations require write locks. Temporary version store keeps track of older versions of updated items.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: كل نقاط السلايد

</details>

---

## 9. حبيبية عناصر البيانات والقفل متعدد الحبيبية (`Granularity & Multiple Granularity Locking`)

### 9.1. مفهوم الحبيبية (`Granularity`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_8"} -->

#### 📍 أين نحن الآن؟
موضوع جديد كلياً: مو *كيف* نقفل، لكن *على أي حجم* من البيانات نطبّق القفل.

#### ⬅️ الربط مع السابق
كل تقنيات `locking` اللي شفناها بالأقسام السابقة كانت تفترض ضمنياً إنه فيه "عنصر بيانات" واحد نقفله — هذا القسم يسأل: وش حجم هذا العنصر بالضبط؟

#### 💡 الفكرة الأساسية
**`Granularity` هو حجم عنصر البيانات اللي نطبّق عليه القفل، ويتراوح من `fine` (دقيق/صغير) إلى `coarse` (خشن/كبير) — وكل ما كبر الحجم، كل ما قلّ التزامن الممكن.**

#### 📖 الشرح
لما نقول "نقفل عنصر بيانات"، السؤال الطبيعي: أي حجم بالضبط؟ ممكن يكون حقل واحد بسجل، سجل كامل (`record`)، صفحة كاملة (`page`) من القرص، ملف كامل (`file`)، أو حتى قاعدة البيانات بأكملها. فيه مقايضة واضحة ومباشرة:

- **كل ما كبر حجم العنصر المقفول** (`coarse` granularity، مثال: قفل `disk block` كامل)، **كل ما قلّت درجة التزامن المسموحة** — لأنك تمنع أي transaction ثانية من الوصول لكمية كبيرة من البيانات حتى لو هي بس تحتاج جزء صغير منها.
- **كل ما صغر حجم العنصر** (`fine` granularity)، **كل ما احتجنا أقفال أكثر** — يعني `overhead` أعلى (وقت ومعالجة أكبر لإدارة كل هذي الأقفال المنفصلة).

ما فيه حجم "مثالي" واحد يناسب كل الحالات — أفضل حجم للعنصر يعتمد على **نوع الـ transaction** نفسها: transaction تعدل سجل واحد بس، الأفضل لها قفل دقيق (`fine`) عشان ما تعطل غيرها؛ بينما transaction تعدل ملف كامل، الأفضل لها قفل خشن (`coarse`) عشان ما تحتاج آلاف الأقفال الصغيرة.

#### 🎯 الملخص السريع
- `Fine granularity`: عنصر صغير (سجل)، تزامن أعلى، `overhead` أكبر.
- `Coarse granularity`: عنصر كبير (ملف/قاعدة بيانات)، تزامن أقل، `overhead` أقل.
- الاختيار الأمثل يعتمد على نوع الـ transaction.

#### 📚 التطبيق
هذا التوتر بين `fine` و`coarse` هو بالضبط اللي يحل له القسم الجاي — `Multiple Granularity Locking` — بأسلوب هرمي ذكي يجمع مزايا الاثنين.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `fine granularity` "أفضل دايماً" لأنه يسمح بتزامن أعلى.

#### الفهم الصحيح ✅:
`fine granularity` أعلى بـ `overhead` — كل عملية قفل/فتح تكلف وقت ومعالجة، وإذا الـ transaction تحتاج تعدل بيانات كتير، احتياجها آلاف الأقفال الصغيرة ممكن يكون أبطأ من قفل واحد `coarse`. الاختيار الأفضل يعتمد على طبيعة العمل، مو قاعدة مطلقة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Size of data items known as granularity. Fine (small). Coarse (large). Larger the data item size, lower the degree of concurrency permitted. Example: entire disk block locked. Smaller the data item size, more locks required. Higher overhead. Best item size depends on transaction type.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف، المقايضة، الاستنتاج

</details>

---

### 9.2. القفل متعدد مستويات الحبيبية (`Multiple Granularity Level Locking - MGL`)

<!-- @render: {type: "diagram-first", visualization: "tree", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_9.1"} -->

#### 📍 أين نحن الآن؟
الحل الهرمي الذكي اللي يوازن بين `fine` و`coarse` granularity.

#### ⬅️ الربط مع السابق
هذا القسم يحل المقايضة اللي وصفناها بالقسم السابق.

#### 💡 الفكرة الأساسية
**`MGL` ينظّم عناصر قاعدة البيانات بشكل تسلسل هرمي (شجرة)، بحيث نقدر نقفل على أي مستوى مناسب — من قاعدة البيانات كاملة نزولاً للسجل الواحد.**

#### 📊 المخطط: التسلسل الهرمي للحبيبية

#### ما هذا المخطط؟
> يوضّح كيف تُبنى شجرة الحبيبية المتعددة، من قاعدة البيانات بالأعلى نزولاً للسجلات بالأسفل.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | `db` | جذر | قاعدة البيانات كاملة — أعلى مستوى بالشجرة |
| 2 | `f1`, `f2` | ملفات | كل ملف (`file`) هو ابن مباشر للجذر |
| 3 | `p11`, `p12`, ..., `p21`, `p22`, ... | صفحات | كل `page` هي ابنة لملف معين |
| 4 | `r111`, `r11j`, ... | سجلات | كل `record` هي ابنة لصفحة معينة — أدق مستوى |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| `db` | `f1`, `f2` | يحتوي | أب→ابن | قاعدة البيانات تحتوي عدة ملفات |
| `f1` | `p11`, `p12`, ..., `p1n` | يحتوي | أب→ابن | الملف يحتوي عدة صفحات |
| `p11` | `r111`, ..., `r11j` | يحتوي | أب→ابن | الصفحة تحتوي عدة سجلات |

```diagram
type: tree
title: A granularity hierarchy for MGL
direction: TD
nodes:
  - id: db
    label: db (قاعدة البيانات)
    kind: root
    level: 0
  - id: f1
    label: f1 (ملف)
    kind: file
    level: 1
  - id: f2
    label: f2 (ملف)
    kind: file
    level: 1
  - id: p11
    label: p11 (صفحة)
    kind: page
    level: 2
  - id: p12
    label: p12 (صفحة)
    kind: page
    level: 2
  - id: p21
    label: p21 (صفحة)
    kind: page
    level: 2
  - id: r111
    label: r111 (سجل)
    kind: record
    level: 3
  - id: r11j
    label: r11j (سجل)
    kind: record
    level: 3
edges:
  - from: db
    to: f1
    label: يحتوي
  - from: db
    to: f2
    label: يحتوي
  - from: f1
    to: p11
    label: يحتوي
  - from: f1
    to: p12
    label: يحتوي
  - from: f2
    to: p21
    label: يحتوي
  - from: p11
    to: r111
    label: يحتوي
  - from: p11
    to: r11j
    label: يحتوي
```

#### 📖 الشرح
الشجرة تبدأ من الجذر `db` (قاعدة البيانات كاملة) بأعلى، تتفرّع لملفات (`files` مثل `f1`, `f2`)، وكل ملف يتفرّع لصفحات (`pages` مثل `p11`, `p12`)، وكل صفحة تتفرّع لسجلات (`records`) — وهي أدق مستوى بالشجرة. الفكرة إن transaction تقدر تختار أي مستوى تناسب حاجتها: transaction تحتاج تعدل قاعدة البيانات كلها تقفل الجذر مباشرة، بينما transaction تحتاج تعدل سجل واحد بس تقفل السجل بمفرده دون التأثير على باقي الشجرة.

المشكلة اللي تنشأ: كيف نمنع تعارض بين transaction قفلت الجذر بالكامل، وثانية تحاول تقفل سجل تحته؟ هنا يجي دور **`Intention locks`** بالقسم الجاي.

#### 🎯 الملخص السريع
- شجرة هرمية: `db` → `files` → `pages` → `records`.
- كل مستوى ابن مباشر للمستوى اللي فوقه.
- يسمح باختيار مستوى القفل المناسب لكل transaction.

#### 📚 التطبيق
عشان هذي الشجرة تشتغل بأمان (بدون تعارضات خفية بين مستويات مختلفة)، لازم نظام "إشعار" — `Intention locks` — هذا موضوع القسم الجاي.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن قفل عقدة معينة بالشجرة تلقائياً يقفل كل العقد تحتها أو فوقها.

#### الفهم الصحيح ✅:
قفل عقدة معينة يحمي تلك العقدة نفسها، لكن العلاقة مع العقد الثانية بالشجرة (خصوصاً الأسلاف والأحفاد) تُدار عن طريق نظام `Intention locks` منفصل — مو تلقائياً بمجرد قفل عقدة واحدة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> [رسم شجرة: db كجذر، يتفرع لـ f1 وf2، كل واحدة تتفرع لعدة p (صفحات)، وكل صفحة تتفرع لعدة r (سجلات) — "A granularity hierarchy for illustrating multiple granularity level locking."]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: بنية الشجرة الهرمية بكل مستوياتها

</details>

---

### 9.3. الأقفال النوايا وقواعد `MGL` (`Intention Locks & MGL Rules`)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_9.2"} -->

#### 📍 أين نحن الآن؟
النظام اللي يجعل شجرة `MGL` تشتغل بأمان — أقفال النوايا وقواعد الالتزام بها.

#### ⬅️ الربط مع السابق
هذا القسم يكمل الشجرة اللي بنيناها بالقسم السابق، ويحل مشكلة التنسيق بين المستويات.

#### 💡 الفكرة الأساسية
**`Intention locks` تسمح لـ transaction إنها "تعلن" على طول المسار من الجذر للعقدة المطلوبة نوع القفل اللي رح تطلبه على مستوى أعمق، بدون قفل الفرع كامل فعلياً.**

#### 📊 المخطط: جدول توافق أنواع الأقفال

#### وصف العُقد:
| # | نوع القفل | الاسم الكامل | الوصف |
| --- | --- | --- | --- |
| 1 | `IS` | `Intention-Shared` | نية طلب `shared lock` على عقدة تحتية |
| 2 | `IX` | `Intention-Exclusive` | نية طلب `exclusive lock` على عقدة تحتية |
| 3 | `S` | `Shared` | قفل مشترك عادي على العقدة نفسها |
| 4 | `SIX` | `Shared-Intention-Exclusive` | العقدة مقفولة `shared`، مع نية طلب `exclusive` على عقدة تحتية |
| 5 | `X` | `Exclusive` | قفل حصري كامل على العقدة نفسها |

#### وصف الروابط: جدول توافق الأقفال (`Lock Compatibility Matrix`)

| المطلوب \\ الممسوك حالياً | `IS` | `IX` | `S` | `SIX` | `X` |
| --- | --- | --- | --- | --- | --- |
| `IS` | نعم | نعم | نعم | نعم | لا |
| `IX` | نعم | نعم | لا | لا | لا |
| `S` | نعم | لا | نعم | لا | لا |
| `SIX` | نعم | لا | لا | لا | لا |
| `X` | لا | لا | لا | لا | لا |

```diagram
type: matrix
title: Lock compatibility matrix for multiple granularity locking
nodes:
  - id: IS
    label: IS
  - id: IX
    label: IX
  - id: S
    label: S
  - id: SIX
    label: SIX
  - id: X
    label: X
edges:
  - from: IS
    to: IS
    label: متوافق
  - from: IS
    to: IX
    label: متوافق
  - from: IX
    to: IX
    label: متوافق
  - from: S
    to: S
    label: متوافق
```

#### 📖 الشرح
لما transaction تحتاج توصل لعقدة عميقة بالشجرة (مثلاً سجل معين `r111`)، ما تقدر تروح تقفله مباشرة بدون ما "تخبر" النظام بمسارها. لهذا، لازم تأخذ `intention lock` على كل عقدة بالمسار من الجذر لحد العقدة المطلوبة:

- **`IS` (Intention-Shared)**: تعني "أنا رح أطلب قفل `shared` على عقدة تحتي بمكان ما بهذا الفرع."
- **`IX` (Intention-Exclusive)**: تعني "أنا رح أطلب قفل `exclusive` على عقدة تحتي."
- **`SIX` (Shared-Intention-Exclusive)**: حالة مركبة — العقدة الحالية نفسها مقفولة `shared` (للقراءة)، بس بنفس الوقت فيه نية إن نطلب `exclusive` على عقدة تحتها.

جدول التوافق (`compatibility matrix`) يحدد أي تركيبة من الأقفال يقدروا يتواجدوا سوا بنفس اللحظة على نفس العقدة من transactions مختلفة. لاحظ إن `IS` متوافقة مع كل شيء ما عدا `X`، بينما `X` مو متوافقة مع أي شيء آخر إطلاقاً — وهذا منطقي لأن `X` أقوى قفل ممكن.

#### ⚙️ الخطوات / الخوارزمية: قواعد بروتوكول `MGL`

#### ما هدف هذه العملية؟
> تضمن هذي القواعد الست إن كل الأقفال بالشجرة (على مستويات مختلفة) تبقى متسقة ومتوافقة، وتضمن `serializability` من خلال دمج `MGL` مع `2PL`.

```algorithm
1 | القاعدة 1 | Lock Manager | يجب الالتزام بجدول توافق الأقفال (compatibility matrix) بكل الأوقات
2 | القاعدة 2 | Transaction | جذر الشجرة يجب أن يُقفل أولاً، بأي وضع كان
3 | القاعدة 3 | Transaction | عقدة N تُقفل بوضع S أو IS فقط إذا الأب مقفول من نفس T بوضع IS أو IX
4 | القاعدة 4 | Transaction | عقدة N تُقفل بوضع X أو IX أو SIX فقط إذا الأب مقفول من نفس T بوضع IX أو SIX
5 | القاعدة 5 | Transaction | T لا تقدر تقفل عقدة جديدة بعد ما تكون فكّت أي قفل (تطبيق 2PL)
6 | القاعدة 6 | Transaction | T تقدر تفك قفل عن عقدة N فقط إذا كل أولاد N غير مقفولين من T حالياً
```

#### نقاط التنفيذ:
- القاعدتين 3 و4 تفرضان إنك لازم "تصعد" بالمسار من الجذر تدريجياً، مو تقفز مباشرة لعقدة عميقة.
- القاعدة 5 هي بالضبط تطبيق مبدأ `2PL` (مرحلة توسع ثم انكماش) على سياق الشجرة الهرمية.
- القاعدة 6 تمنع فك قفل عن عقدة بينما لسا فيه أقفال نشطة تحتها من نفس الـ transaction.

المحاضرة تعطي مثال عملي فيه ثلاث `transactions` (`T1`, `T2`, `T3`) تعمل بالتوازي على نفس الشجرة، كل وحدة تاخذ `intention locks` مناسبة على طول مسارها (مثلاً `T1` تأخذ `IX(db)` ثم `IX(f1)` ثم `IX(p11)` قبل ما تاخذ `X(r111)` على السجل نفسه)، وبنفس الوقت `T3` تأخذ `IS` على نفس المسار عشان تقرأ سجل مختلف (`r11j`) — وهذا يوضح كيف الأقفال النوايا تسمح بتزامن حقيقي بين transactions تعمل على أجزاء مختلفة من نفس الفرع، بدون ما تحتاج تنتظر بعض.

#### 🎯 الملخص السريع
- `IS`/`IX`/`SIX` هي "إعلانات نية" على طول المسار للجذر.
- جدول التوافق يحدد أي أقفال ممكن تتواجد سوا.
- ست قواعد أساسية تضبط `MGL`، وهي فعلياً تطبيق لمبدأ `2PL` على شجرة هرمية.

#### 📚 التطبيق
`MGL` يوضح كيف نطبق `locking` بكفاءة على أنظمة حقيقية معقدة، وهذا يمهّد للقسم الأخير بالمحاضرة: كيف نطبق نفس فكرة الأقفال على الفهارس (`indexes`) بشكل خاص.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `IS` و`IX` تحمي العقدة الحالية نفسها من القراءة/الكتابة مباشرة، زي `S` و`X` العاديين.

#### الفهم الصحيح ✅:
`IS`/`IX` هي **أقفال نية فقط** — لا تمنع أحد من قراءة أو كتابة العقدة الحالية نفسها بشكل مباشر، هي بس "تحجز مكان" وتخبر باقي الـ transactions إن فيه أقفال أقوى (`S` أو `X`) رح تُطلب على عقدة *تحتها* بالشجرة. الحماية الفعلية على البيانات تصير بالأقفال العادية (`S`, `X`) على العقدة النهائية المطلوبة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Intention locks are needed. Transaction indicates along the path from the root to the desired node, what type of lock (shared or exclusive) it will require from one of the node's descendants. Intention lock types: Intention-shared (IS): Shared locks will be requested on a descendant node. Intention-exclusive (IX): Exclusive locks will be requested. Shared-intension-exclusive (SIX): Current node is locked in shared mode but one or more exclusive locks will be requested on a descendant node. [جدول توافق IS/IX/S/SIX/X كامل]
>
> Multiple Granularity locking (MGL) protocols rules: 1. The lock compatibility must be adhered to. 2. The root of the tree must be locked first, in any mode. 3. A node N can be locked by a transaction T in S or IS mode only if the parent node N is already locked by transaction T in either IS or IX mode. 4. A node N can be locked by a transaction T in X, IX, or SIX mode only if the parent of node N is already locked by transaction T in either IX or SIX mode. 5. A transaction T can lock a node only if it has not unlocked any node (to enforce the 2PL protocol). 6. A transaction T can unlock a node, N, only if none of the children of node N are currently locked by T.
>
> [مثال جدول أقفال لـ T1, T2, T3: IX(db), IX(f1), IX(p11), X(r111), IX(f2), IX(p21), X(p211), ثم unlocks — T2: IX(db), IX(f1), X(p12), ثم unlocks — T3: IS(db), IS(f1), IS(p11), S(r11j), S(f2), ثم unlocks]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: أنواع الأقفال النوايا، جدول التوافق الكامل، القواعد الست كاملة، والإشارة للمثال العملي بالمحاضرة

</details>

---

## 10. استخدام الأقفال للتحكم بالتزامن في الفهارس (`Using Locks for Concurrency Control in Indexes`)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_9.3"} -->

#### 📍 أين نحن الآن؟
القسم الأخير بالمحاضرة — تطبيق خاص لمفهوم الأقفال على هياكل بيانات معينة: الفهارس.

#### ⬅️ الربط مع السابق
هذا القسم يطبّق نفس مبدأ `2PL` من الأقسام السابقة، لكن على سياق خاص فيه تحديات إضافية.

#### 💡 الفكرة الأساسية
**فهارس `B-tree` و`B+-tree` عبارة عن أشجار من صفحات القرص، وقفلها زي أي عنصر بيانات عادي يسبب اختناق كبير لأن أغلب الاستعلامات تمر من نفس الجذر — فنحتاج طرق خاصة أذكى.**

#### 📖 الشرح
مبدأ `2PL` أساساً ممكن يُطبّق على فهارس `B-tree` و`B+-tree` — نودّر إن عقد الفهرس (`nodes`) تقابل صفحات قرص (`disk pages`) عادية، ونقفلها بنفس الطريقة اللي نقفل فيها أي عنصر بيانات ثاني. المشكلة العملية: **حجب (`holding`) الأقفال على صفحات الفهرس يسبب تعطيل كبير جداً للـ transactions الثانية** — لأن كل استعلام تقريباً لازم يمر بنفس الجذر (`root`) بالأول، فلو قفلناه بشكل مطوّل، كل transaction ثانية تنحبس بدون داعي.

لهذا السبب، لازم نستخدم طرق خاصة (`other approaches`) مختلفة عن `2PL` المباشر:

**`Conservative approach`:** نقفل الجذر بوضع `exclusive` أولاً، وبعدين نوصل للابن المناسب (`appropriate child`) حسب الاستعلام. **إذا الابن مو ممتلئ** (يعني الإدخال جديد ما يسبب انقسام العقدة `split`)، نقدر نفك قفل الجذر **فوراً** — لأن ما فيه احتمال إن هذا الإدخال يؤثر على بنية الجذر نفسه.

**`Optimistic approach`:** نطلب ونمسك `shared locks` (بس، مو `exclusive`) على كل العقد اللي بالمسار المؤدي للورقة (`leaf node`)، مع `exclusive lock` فقط على الورقة نفسها. الافتراض هنا "متفائل" — نتوقع إن الإدخال غالباً مو رح يسبب انقسام. **لو فعلاً الإدخال سبب انقسام (`split`) بالورقة** (بسبب امتلائها)، حينها بس نرفّع (`upgrade`) الأقفال على العقد الأعلى بالمسار من `shared` إلى `exclusive`، لأن الانقسام قد يتطلب تعديل بنية العقد الأعلى كمان.

#### 🎯 الملخص السريع
- فهارس `B-tree`/`B+-tree`: العقد = صفحات قرص، والقفل المباشر عليها يسبب اختناق.
- `Conservative approach`: قفل الجذر `exclusive` أولاً، يُفك مبكراً لو الابن غير ممتلئ.
- `Optimistic approach`: `shared locks` على المسار كامل + `exclusive` على الورقة فقط، مع ترفيع لو صار `split`.

#### 📚 التطبيق
هذا آخر موضوع بمحاضرة `Concurrency Control` — كل هذي المفاهيم (الأقفال، الجمود، `MVCC`، الحبيبية المتعددة، والفهارس) تشكّل الأساس اللي رح تُبنى عليه محاضرة `Recovery Techniques` القادمة، حيث نتعامل مع سيناريو فشل النظام أثناء وجود كل هذي الأقفال والتعديلات المعلقة.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
يفكر بعض الطلاب إن `Optimistic approach` بالفهارس تعني عدم استخدام أي أقفال إطلاقاً على المسار (زي `snapshot isolation`).

#### الفهم الصحيح ✅:
`Optimistic approach` بالفهارس لسا تستخدم `shared locks` على كامل المسار من الجذر للورقة — الفرق إنها أضعف من `exclusive` (تسمح بمشاركة أكبر)، مو غياب الأقفال بالكامل. القفل `exclusive` الوحيد المباشر يكون على الورقة نفسها، ويترفّع للأعلى فقط عند الحاجة الفعلية (حصول `split`).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Two-phase locking can be applied to B-tree and B+-tree indexes. Nodes of an index correspond to disk pages. Holding locks on index pages could cause transaction blocking. Other approaches must be used.
>
> Conservative approach: Lock the root node in exclusive mode and then access the appropriate child node of the root. If the child node is not full, then the lock on the root node can be released. Optimistic approach: Request and hold shared locks on nodes leading to the leaf node, with exclusive lock on the leaf. If insertion causes the leaf to split, the locks on the higher-level nodes can be upgraded to exclusive mode.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المشكلة الأساسية والطريقتين (المحافظة والمتفائلة) بكل تفاصيلهما

</details>

---

## أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط وصعب

### السؤال 1 (متوسط)

أي مما يلي يصف بشكل صحيح `Binary lock`؟

أ) يفرّق بين أقفال القراءة والكتابة
ب) عنده حالتين بس: مقفول (1) أو مفتوح (0)
ج) يسمح بمشاركة القراءة بين عدة transactions
د) يُستخدم فقط في `MVCC`

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `Binary lock` عنده قيمتان فقط، `Locked (1)` و`Unlocked (0)`، وهذا بالضبط ما يجعله بدائياً مقارنة بالأقفال المشتركة/الحصرية.
- ❌ **الخيار أ):** هذا وصف لـ `shared/exclusive locks`، مو `binary locks` — البينري ما يفرّق بين القراءة والكتابة إطلاقاً.
- ❌ **الخيار ج):** `binary lock` ما يسمح بمشاركة أي نوع، حتى قراءتين ما يقدروا يتواجدوا سوا.
- ❌ **الخيار د):** `Binary locking` مفهوم أساسي بـ `2PL` التقليدي، غير مرتبط مباشرة بـ `MVCC`.

---

### السؤال 2 (متوسط)

`Transaction` قافلة عنصر `X` بوضع `read_lock`، وطلبت `write_lock` عليه بعدين. إيش اسم هذي العملية؟

أ) `Downgrading`
ب) `Conversion Prevention`
ج) `Upgrading`
د) `Rigorous Locking`

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** الانتقال من `read_lock` إلى `write_lock` (من وضع أضعف لأقوى) يُسمى `upgrading` بالضبط كما ورد بالمحاضرة.
- ❌ **الخيار أ):** `Downgrading` هو العكس — إصدار `read_lock` بعد `write_lock`.
- ❌ **الخيار ب):** مصطلح غير موجود بالمحاضرة.
- ❌ **الخيار د):** `Rigorous Locking` مرتبط بنوع من `2PL` (فك الأقفال بعد `commit`/`abort`)، مو بعملية `upgrading`.

---

### السؤال 3 (صعب)

بحسب بروتوكول `2PL`، أين يجب أن يصير `lock conversion` من نوع `upgrading`؟

أ) بأي مرحلة، لا يهم الترتيب
ب) بمرحلة `Shrinking` فقط
ج) بمرحلة `Expanding` فقط
د) بعد `commit` مباشرة

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** المحاضرة تنص بوضوح إن `lock conversion upgrades must be done during` مرحلة `Expanding (growing) phase`.
- ❌ **الخيار أ):** الترتيب حرج جداً بـ `2PL` — أي مخالفة قد تكسر `serializability`.
- ❌ **الخيار ب):** مرحلة `Shrinking` مخصصة لـ `downgrading`، مو `upgrading`.
- ❌ **الخيار د):** `2PL` الأساسي لا يربط `upgrading` بلحظة `commit` تحديداً (هذا أقرب لمفهوم `Strict`/`Rigorous 2PL`).

---

### السؤال 4 (متوسط)

أي نوع من `2PL` يضمن `deadlock-free` بشكل كامل، لكنه غير عملي (`impractical`) بكثير من الحالات؟

أ) `Basic 2PL`
ب) `Strict 2PL`
ج) `Rigorous 2PL`
د) `Conservative (static) 2PL`

**الإجابة الصحيحة:** د)

**التعليل:**
- ✅ **الخيار د):** `Conservative 2PL` تتطلب قفل كل العناصر مسبقاً قبل بدء التنفيذ، وهذا يجعلها `deadlock-free`، لكن معرفة كل العناصر مسبقاً صعبة عملياً.
- ❌ **الخيار أ):** `Basic 2PL` معرّضة للجمود بشكل طبيعي، ما فيها ضمان `deadlock-free`.
- ❌ **الخيار ب):** `Strict 2PL` تتحكم بمتى تُفك `exclusive locks`، لكن ما تضمن `deadlock-free`.
- ❌ **الخيار ج):** `Rigorous 2PL` أشد من `Strict` لكن برضو معرّضة للجمود.

---

### السؤال 5 (صعب)

ما الفرق الجوهري بين `Strict 2PL` و`Rigorous 2PL`؟

أ) `Strict` تفك كل الأقفال بعد `commit`/`abort`، `Rigorous` تفك `write locks` فقط بعد `commit`/`abort`
ب) `Strict` تفك `exclusive locks` فقط بعد `commit`/`abort`، `Rigorous` تفك كل الأقفال (قراءة وكتابة) فقط بعد `commit`/`abort`
ج) لا فرق بينهم، مصطلحان لنفس المفهوم
د) `Strict` مخصصة للفهارس فقط

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `Strict 2PL` تركز على `exclusive locks` بس (تُفك فقط بعد `commit`/`abort`)، بينما `Rigorous 2PL` أشد — تمنع فك *أي* قفل (حتى `shared`) قبل `commit`/`abort`.
- ❌ **الخيار أ):** معكوس — `Rigorous` هي اللي تشمل كل الأقفال، مو `write locks` فقط.
- ❌ **الخيار ج):** فيهم فرق واضح بمستوى التشدد.
- ❌ **الخيار د):** كلاهما مفاهيم عامة بـ `2PL`، غير مقتصرة على الفهارس.

---

### السؤال 6 (متوسط)

بمثال المحاضرة (`X=20, Y=30`)، ما نتيجة `serial schedule` لـ `T1` متبوعة بـ `T2`؟

أ) `X=70, Y=50`
ب) `X=50, Y=50`
ج) `X=50, Y=80`
د) `X=20, Y=30`

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** المحاضرة تنص إن نتيجة `serial schedule T1` متبوعة بـ `T2` هي `X=50, Y=80`.
- ❌ **الخيار أ):** هذي نتيجة الترتيب المعاكس — `T2` متبوعة بـ `T1`.
- ❌ **الخيار ب):** هذي نتيجة الجدول غير المتسلسل (`nonserializable`) اللي ما يتبع `2PL`.
- ❌ **الخيار د):** هذي القيم الابتدائية فقط، قبل أي تنفيذ.

---

### السؤال 7 (صعب)

فحصنا `wait-for graph` لمجموعة `transactions` ولقينا `cycle` (دورة) بين ثلاث عقد. ماذا يعني هذا؟

أ) فيه `starvation` أكيد
ب) فيه `deadlock` أكيد
ج) الجدول `serializable` بالتأكيد
د) لازم نستخدم `snapshot isolation`

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** وجود دورة (`cycle`) بـ `wait-for graph` هو بالضبط المعيار المستخدم لاكتشاف `deadlock`، بغض النظر عن عدد العقد المتورطة (اثنتين أو أكثر).
- ❌ **الخيار أ):** `Starvation` مشكلة مختلفة (حرمان طويل الأمد)، ما يُكتشف بالضرورة من `cycle`.
- ❌ **الخيار ج):** وجود `deadlock` لا علاقة مباشرة له بـ `serializability` الجدول (وهو أصلاً مشكلة منفصلة تتطلب تدخل: إلغاء ضحية).
- ❌ **الخيار د):** `snapshot isolation` تقنية بديلة كاملة، مو حل مباشر لجمود مكتشف حالياً بنظام `locking`.

---

### السؤال 8 (متوسط)

بحسب بروتوكول `Wait-Die`، ماذا يحصل لو `transaction` أقدم (`O`) تحتاج مورد ممسوك من `transaction` أحدث (`Y`)؟

أ) `O` تُلغى فوراً
ب) `Y` تُلغى فوراً
ج) `O` تنتظر
د) `Y` تنتظر

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** حسب جدول المحاضرة، في `Wait-Die`: "O needs a resource held by Y → O waits."
- ❌ **الخيار أ):** `O` (الأقدم) لا تُلغى بهذا السيناريو بـ `Wait-Die` — هي اللي تنتظر.
- ❌ **الخيار ب):** `Y` تُلغى فقط بالسيناريو المعاكس (لو Y تحتاج مورد ممسوك من O).
- ❌ **الخيار د):** `Y` لا تنتظر بهذا السيناريو المحدد.

---

### السؤال 9 (متوسط)

بحسب بروتوكول `Wound-Wait`، ماذا يحصل لو `transaction` أقدم (`O`) تحتاج مورد ممسوك من `transaction` أحدث (`Y`)؟

أ) `O` تنتظر
ب) `Y` تُلغى (`dies`)
ج) `O` تُلغى
د) الاثنتان تنتظران

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** حسب جدول المحاضرة، في `Wound/Wait`: "O needs a resource held by Y → Y dies." الأقدم "تجرح" الأحدث وتلغيها فوراً.
- ❌ **الخيار أ):** هذا سلوك `Wait-Die`، مو `Wound-Wait`.
- ❌ **الخيار ج):** `O` (الأقدم) لا تُلغى بهذا السيناريو — هي المستفيدة.
- ❌ **الخيار د):** لا وجود لانتظار متبادل بهذا البروتوكول، يوجد حسم فوري.

---

### السؤال 10 (متوسط)

ما الحل الأبسط المذكور بالمحاضرة لمشكلة `Starvation`؟

أ) استخدام `Wound-Wait`
ب) طابور `first-come-first-served`
ج) `Conservative 2PL`
د) `Snapshot isolation`

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** المحاضرة تنص بوضوح على "Solution: first-come-first-served queue" لحل مشكلة `starvation`.
- ❌ **الخيار أ):** `Wound-Wait` بروتوكول لحل `deadlock`، مو `starvation` تحديداً.
- ❌ **الخيار ج):** `Conservative 2PL` تمنع `deadlock`، مو `starvation`.
- ❌ **الخيار د):** `Snapshot isolation` تقنية بديلة كاملة للتحكم بالتزامن، غير مرتبطة مباشرة بحل `starvation`.

---

### السؤال 11 (صعب)

ما الفرق الأساسي بين `MVCC` العام و`Snapshot Isolation` من ناحية القراءة؟

أ) لا فرق، هما نفس الشيء تماماً
ب) `Snapshot Isolation` تحديداً تلغي الحاجة لـ `read locks`، بينما `MVCC` العام قد يعتمد على `2PL` أو `timestamp ordering`
ج) `MVCC` لا يحتاج مساحة تخزين إضافية بينما `Snapshot Isolation` يحتاج
د) `Snapshot Isolation` تحتاج `read locks` أقوى من `MVCC` العادي

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** `MVCC` عائلة أوسع فيها أنواع مختلفة (`timestamp ordering`, `2PL-based`, `validation/snapshot isolation`)، بينما `Snapshot Isolation` تحديداً هي التقنية اللي تلغي `read locks` بشكل صريح.
- ❌ **الخيار أ):** `Snapshot Isolation` هي أحد أنواع `MVCC`، مو مرادف كامل له.
- ❌ **الخيار ج):** كلاهما يحتاج مساحة تخزين إضافية للاحتفاظ بنسخ متعددة.
- ❌ **الخيار د):** العكس صحيح — `Snapshot Isolation` تلغي `read locks` كلياً.

---

### السؤال 12 (متوسط)

بتقنية `Validation (Optimistic)`، متى تُطبّق تعديلات الـ `transaction` فعلياً على قاعدة البيانات؟

أ) بمرحلة `Read phase` مباشرة
ب) بمرحلة `Validation phase`
ج) بمرحلة `Write phase`، وبس بعد نجاح `Validation`
د) فوراً عند كل عملية `write`

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** التعديلات تُطبّق فعلياً بمرحلة `Write phase` فقط، وبشرط نجاح `Validation phase` قبلها.
- ❌ **الخيار أ):** بمرحلة `Read phase`، التعديلات تروح لنسخ محلية مؤقتة فقط، مو لقاعدة البيانات الحقيقية.
- ❌ **الخيار ب):** `Validation phase` هي مرحلة تحقق فقط، ما فيها تطبيق فعلي للتعديلات.
- ❌ **الخيار د):** هذا يخالف فلسفة النهج المتفائل بالكامل، اللي يؤجل التطبيق الفعلي للنهاية.

---

### السؤال 13 (صعب)

عند استخدام `Multiple Granularity Locking (MGL)`، `transaction` تريد تقفل سجل (`record`) معين بوضع `X` (exclusive). ما الشرط اللازم توفره على العقدة الأب مباشرة له؟

أ) الأب مقفول بوضع `IS` أو `S`
ب) الأب مقفول بوضع `IX` أو `SIX`
ج) لا حاجة لقفل الأب إطلاقاً
د) الأب مقفول بوضع `X` فقط

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** حسب القاعدة الرابعة بـ `MGL`: عقدة تُقفل بوضع `X`، `IX`، أو `SIX` فقط لو الأب مقفول بوضع `IX` أو `SIX` من نفس الـ transaction.
- ❌ **الخيار أ):** `IS`/`S` مطلوبة للقفل بوضع `S`/`IS`، مو `X`.
- ❌ **الخيار ج):** القاعدة الثانية تفرض قفل الجذر أولاً، وكل عقدة أب لازم تُقفل قبل ابنها.
- ❌ **الخيار د):** `X` على الأب أقوى من اللازم — يكفي `IX` أو `SIX`.

---

### السؤال 14 (متوسط)

بحسب قواعد `MGL`، متى يقدر `transaction T` يفك قفل عن عقدة `N`؟

أ) في أي وقت، بدون قيود
ب) فقط إذا كل أولاد `N` غير مقفولين من `T` حالياً
ج) فقط بعد `commit` النهائي مباشرة
د) فقط إذا `N` هي جذر الشجرة

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** القاعدة السادسة بـ `MGL` تنص إن `T` تقدر تفك قفل عن `N` فقط لو ما فيه أي من أولاد `N` مقفولين من نفس `T` حالياً.
- ❌ **الخيار أ):** فيه قيد واضح ومحدد.
- ❌ **الخيار ج):** هذا القيد غير مذكور بقواعد `MGL` الأساسية (رغم إنه قد يظهر بنسخ معينة من `2PL` زي `Strict`/`Rigorous`).
- ❌ **الخيار د):** القاعدة تنطبق على أي عقدة بالشجرة، مو الجذر فقط.

---

### السؤال 15 (صعب)

بـ `Optimistic approach` للأقفال على الفهارس (`indexes`)، ماذا يصير للأقفال على العقد الأعلى بالمسار لو الإدخال سبب `split` بالورقة (`leaf`)؟

أ) تبقى `shared` كما هي
ب) تُفك فوراً بدون ترفيع
ج) تُرفّع (`upgrade`) لوضع `exclusive`
د) يُعاد تشغيل الـ transaction بالكامل

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** المحاضرة تنص: "If insertion causes the leaf to split, the locks on the higher-level nodes can be upgraded to exclusive mode."
- ❌ **الخيار أ):** الأقفال تُرفّع لوضع أقوى بسبب احتمال تعديل بنية العقد الأعلى نتيجة الانقسام.
- ❌ **الخيار ب):** الفك المباشر بدون ترفيع يعرّض بنية الفهرس للتلف أثناء الانقسام.
- ❌ **الخيار د):** مذكور فقط بسياق `Validation (Optimistic) Techniques` العام (فشل التحقق)، مو بسياق الأقفال على الفهارس تحديداً.

---

### السؤال 16 (متوسط)

أي مما يلي *ليس* من مخططات `MVCC` الثلاثة المذكورة بالمحاضرة؟

أ) مبني على `timestamp ordering`
ب) مبني على `two-phase locking`
ج) مبني على `validation and snapshot isolation`
د) مبني على `binary locking` فقط

**الإجابة الصحيحة:** د)

**التعليل:**
- ✅ **الخيار د):** `Binary locking` مو من أنواع `MVCC` المذكورة — هو مفهوم أساسي منفصل ذُكر بقسم `2PL` بشكل عام.
- ❌ **الخيار أ):** مذكور صراحة كنوع أول من أنواع `MVCC`.
- ❌ **الخيار ب):** مذكور صراحة كنوع ثاني.
- ❌ **الخيار ج):** مذكور صراحة كنوع ثالث، وهو موضوع القسمين التاليين مباشرة بالمحاضرة.

---

## بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما الفرق الأساسي بين `Binary lock` و`Shared/Exclusive lock`؟
**A:** `Binary lock` عنده حالتين بس (مقفول/مفتوح) وما يفرّق بين قراءة وكتابة، بينما `Shared/Exclusive` يسمح بمشاركة القراءة ويحصر الكتابة فقط.

### البطاقة 2
**Q2:** إيش تعني مرحلة `Expanding phase` بـ `2PL`؟
**A:** المرحلة اللي فيها الـ transaction تقدر تحصل على `locks` جديدة، ولا تقدر تفك أي قفل — وفيها يصير أي `upgrading`.

### البطاقة 3
**Q3:** إيش تعني مرحلة `Shrinking phase` بـ `2PL`؟
**A:** المرحلة اللي فيها الـ transaction تفك `locks` موجودة، ولا تقدر تحصل على جديدة — وفيها يصير أي `downgrading`.

### البطاقة 4
**Q4:** هل استخدام `locks` وحده يضمن `serializability`؟
**A:** لا. لازم اتباع بروتوكول محدد زي `2PL` — استخدام `locks` بدون اتباع الترتيب الصحيح ممكن يعطي جدول `nonserializable`.

### البطاقة 5
**Q5:** ما الفرق بين `Strict 2PL` و`Rigorous 2PL`؟
**A:** `Strict` تفك `exclusive locks` فقط بعد `commit`/`abort`، بينما `Rigorous` تفك *كل* الأقفال (قراءة وكتابة) فقط بعد `commit`/`abort`.

### البطاقة 6
**Q6:** لماذا `Conservative 2PL` غير عملية غالباً؟
**A:** لأنها تتطلب معرفة كل العناصر اللي بتحتاجها الـ transaction (`read-set`/`write-set`) قبل بدء التنفيذ — وهذا صعب لو التنفيذ يعتمد على شروط ديناميكية.

### البطاقة 7
**Q7:** كيف نكتشف `deadlock` باستخدام `wait-for graph`؟
**A:** نبحث عن دورة (`cycle`) بالرسم — لو موجودة، يعني فيه انتظار دائري متبادل بين transactions، وهذا هو `deadlock`.

### البطاقة 8
**Q8:** ما الفرق الجوهري بين `Wait-Die` و`Wound-Wait`؟
**A:** في `Wait-Die`، الأقدم دايماً تنتظر (لو تحتاج مورد الأحدث). في `Wound-Wait`، الأقدم دايماً تلغي الأحدث فوراً (لو تحتاج موردها).

### البطاقة 9
**Q9:** ما الفرق بين `Deadlock` و`Starvation`؟
**A:** `Deadlock` انتظار دائري متبادل بين transactions يُكتشف بدورة بـ `wait-for graph`. `Starvation` حرمان طويل الأمد لـ transaction وحدة، بدون شرط وجود انتظار متبادل.

### البطاقة 10
**Q10:** ما هي المراحل الثلاث لتقنية `Validation (Optimistic)`؟
**A:** `Read phase` (قراءة committed + كتابة محلية)، `Validation phase` (فحص serializability)، `Write phase` (تطبيق فعلي أو إعادة تشغيل).

### البطاقة 11
**Q11:** ما ميزة `Snapshot Isolation` من ناحية عمليات القراءة؟
**A:** عمليات القراءة لا تحتاج `read locks` إطلاقاً، لأنها تقرأ من لقطة (`snapshot`) ثابتة من لحظة بداية الـ transaction.

### البطاقة 12
**Q12:** هل `Snapshot Isolation` يلغي الحاجة لـ `write locks` أيضاً؟
**A:** لا. عمليات الكتابة لسا تحتاج `write locks` — فقط القراءة معفية.

### البطاقة 13
**Q13:** ما الفرق بين `IS` و`IX` بـ `Intention locks`؟
**A:** `IS` تعني نية طلب `shared lock` على عقدة تحتية، بينما `IX` تعني نية طلب `exclusive lock` على عقدة تحتية.

### البطاقة 14
**Q14:** بحسب `MGL`، متى يمكن قفل عقدة بوضع `S` أو `IS`؟
**A:** فقط إذا الأب مقفول من نفس الـ transaction بوضع `IS` أو `IX`.

### البطاقة 15
**Q15:** ما الفرق بين `Conservative` و`Optimistic approach` للأقفال على الفهارس؟
**A:** `Conservative` تقفل الجذر `exclusive` من البداية وتفكه مبكراً لو الابن غير ممتلئ. `Optimistic` تستخدم `shared locks` على كامل المسار مع `exclusive` على الورقة فقط، وترفّع للأعلى فقط لو صار `split`.

---

## ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `Lock` | متغير مرتبط بعنصر بيانات يصف حالته من ناحية الوصول |
| `2PL` | كل الأقفال تسبق أول فك قفل — يضمن `serializability` |
| `Deadlock` | انتظار دائري متبادل بين transactions |
| `Starvation` | حرمان طويل الأمد لـ transaction وحدة دون سبب متبادل |
| `MVCC` | الاحتفاظ بعدة نسخ من عنصر البيانات لزيادة المرونة |
| `Snapshot Isolation` | رؤية ثابتة لقاعدة البيانات من لحظة بداية الـ transaction |
| `Granularity` | حجم عنصر البيانات المقفول (من سجل لقاعدة بيانات كاملة) |
| `Intention lock` | إعلان نية طلب قفل أقوى على عقدة تحتية بالشجرة |

### 🔑 جداول المقارنة

**أنواع `2PL`:**
| النوع | متى تُفك الأقفال | ملاحظة |
| --- | --- | --- |
| `Basic` | تدريجياً | النسخة الأساسية |
| `Conservative` | تدريجياً (لكن الأخذ دفعة واحدة بالبداية) | `deadlock-free` لكن غير عملي |
| `Strict` | `exclusive` بعد `commit`/`abort` فقط | يمنع `dirty reads` |
| `Rigorous` | كل الأقفال بعد `commit`/`abort` فقط | الأشد أماناً، أعلى `overhead` |

**`Wait-Die` مقابل `Wound-Wait`:**
| | `Wait/Die` | `Wound/Wait` |
| --- | --- | --- |
| O تحتاج مورد Y | O تنتظر | Y تُلغى |
| Y تحتاج مورد O | Y تُلغى | Y تنتظر |

**جدول توافق `Intention Locks`:**
| | `IS` | `IX` | `S` | `SIX` | `X` |
| --- | --- | --- | --- | --- | --- |
| `IS` | ✔ | ✔ | ✔ | ✔ | ✘ |
| `IX` | ✔ | ✔ | ✘ | ✘ | ✘ |
| `S` | ✔ | ✘ | ✔ | ✘ | ✘ |
| `SIX` | ✔ | ✘ | ✘ | ✘ | ✘ |
| `X` | ✘ | ✘ | ✘ | ✘ | ✘ |

### 🔑 المكونات والأدوات
| الأداة | الوظيفة | متى تستخدم |
| --- | --- | --- |
| `Lock table` | يسجّل حالة كل عنصر بيانات | دايماً بأي نظام `locking` |
| `Lock manager` | يفرض قواعد الأقفال ويتحكم بالوصول | دايماً بأي نظام `locking` |
| `Wait-for graph` | يكتشف `deadlock` عن طريق البحث عن دورة | باكتشاف الجمود (`deadlock detection`) |
| `Temporary version store` | يحتفظ بالنسخ القديمة | `Snapshot Isolation` و`MVCC` عموماً |

### 🔑 قواعس ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | استخدام `locks` وحده لا يضمن `serializability` — لازم `2PL` |
| 2 | كل الأقفال قبل أول فك قفل (قاعدة `2PL` الأساسية) |
| 3 | `Upgrading` بمرحلة `Expanding`، `Downgrading` بمرحلة `Shrinking` |
| 4 | `Deadlock` = دورة بـ `wait-for graph`؛ `Starvation` = حرمان طويل بدون دورة بالضرورة |
| 5 | `Conservative 2PL` وحدها `deadlock-free` تماماً بين نسخ `2PL` الأربعة |
| 6 | جذر شجرة `MGL` لازم يُقفل أولاً دايماً |
| 7 | `X` لا تتوافق مع أي قفل ثاني على نفس العقدة |
| 8 | `Snapshot Isolation`: بدون `read locks`، لكن مع `write locks` |

### 🔑 قاموس المصطلحات
| المصطلح | المعنى |
| --- | --- |
| `read_lock` | قفل مشترك، يسمح بأكثر من transaction بنفس الوقت |
| `write_lock` | قفل حصري، يمنع أي وصول ثاني |
| `no_of_reads` | عداد يتابع عدد transactions قافلة عنصر للقراءة حالياً |
| `Victim selection` | اختيار transaction تُلغى لحل `deadlock` مكتشف |
| `Timeout` | إلغاء تلقائي بعد تجاوز مدة انتظار محددة مسبقاً |
| `Fine granularity` | عنصر بيانات صغير (سجل) |
| `Coarse granularity` | عنصر بيانات كبير (ملف/قاعدة بيانات) |

### 🔑 الخطوات السريعة

#### تتبع `2PL` بجدول معطى
```algorithm
1 | افحص | كل transaction | هل كل الأقفال تسبق أول unlock؟
2 | إذا نعم | كل transaction | الجدول يتبع 2PL → مضمون serializable
3 | إذا لا | ولو transaction واحدة | افحص النتيجة يدوياً — قد تطلع nonserializable
```

#### اكتشاف `Deadlock` من `Schedule`
```algorithm
1 | ابنِ | wait-for graph | عقدة لكل transaction، سهم لكل انتظار
2 | افحص | الرسم | هل فيه دورة (cycle)؟
3 | إذا نعم | النظام | فيه deadlock — اختر ضحية (victim selection)
```

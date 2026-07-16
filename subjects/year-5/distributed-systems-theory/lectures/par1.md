# المحاضرة 1 — Distributed Systems Basics (أساسيات الأنظمة الموزعة)
> **المادة:** نظم موزعة (تصميم) | **الموضوع:** Characterization of Distributed Systems — تعريف الأنظمة الموزعة، المشاكل الأساسية، أمثلة، مشاركة الموارد، وتحديات التصميم.

---

## ملاحظة منهجية (شرح زيادة للفهم)
هذه المحاضرة (Chapter 1 من كتاب *Distributed Systems: Concepts and Design* لـ Coulouris et al.) هي محاضرة **مفاهيمية بحتة** — لا تحتوي على أكواد، أو pseudocode، أو خوارزميات مفصّلة (مثل `Lamport Algorithm` أو `Leader Election`) بشكل صريح. لذلك:
- أقسام **algorithm block** ستُستخدم فقط حيث ورد "إجراء/عملية" واضحة قابلة للتحويل لخطوات (مثل: كيف يتم Remote Invocation، أو كيف تُدار تقنيات معالجة الفشل).
- توزيع أسئلة الـ MCQ سيُعدَّل ليعكس طبيعة المادة: **مقارنات 30% | تطبيق مفاهيمي 40% | تتبّع/تحليل سيناريو 30%** بدلاً من "تتبع خوارزميات" حرفياً، لأن المحاضرة لا تحوي خوارزميات قابلة للتتبع الرقمي. هذا الانحراف موضّح في تعليق VALIDATION في نهاية الملف.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. تعريف الأنظمة الموزعة (Defining Distributed Systems)

#### 1.1. التعريفات المتعددة في الأدبيات

#### النص الأصلي يقول:
> "A collection of logically related data that is distributed over different processing nodes of computer network." و "A collection of independent computers that appear to the users of the system as a single computer."

#### الشرح المبسّط:
هناك أكثر من طريقة لتعريف `Distributed System`:
- التعريف الأول يركّز على **البيانات**: مجموعة بيانات مترابطة منطقياً لكنها موزّعة فعلياً على عدة أجهزة (nodes) في شبكة.
- التعريف الثاني يركّز على **المظهر الخارجي**: مجموعة حواسيب مستقلة، لكنها تظهر للمستخدم وكأنها حاسوب واحد.

**لماذا؟** الهدف من ذكر تعريفين مختلفين هو توضيح أن هناك زوايا نظر متعددة (بيانات مقابل تجربة المستخدم)، وكلاهما صحيح جزئياً لكن غير كافٍ بمفرده، لذلك الكتاب سيقدّم تعريفاً أدق لاحقاً.

#### 💡 التشبيه:
> تخيّل شركة توصيل طلبات لديها عدة فروع في مدن مختلفة، لكن الزبون يطلب من "تطبيق واحد" ولا يهتم من أي فرع سيصله الطلب.
> **وجه الشبه:** الفروع المتعددة = الحواسيب المستقلة (nodes)، والتطبيق الموحّد = الصورة الظاهرة للمستخدم كنظام واحد.

---

#### 1.2. نقطة مشتركة: مشاركة الموارد هي الدافع الأساسي

#### النص الأصلي يقول:
> "With any definition, sharing of resources is a main motivation for constructing distributed systems."

#### الشرح المبسّط:
مهما اختلف التعريف الدقيق، فإن **الدافع** الأساسي وراء بناء أي نظام موزّع واحد: تمكين عدة مستخدمين/أجهزة من **مشاركة الموارد** (ملفات، طابعات، بيانات، معالجة...) بدلاً من أن يملك كل جهاز نسخته المعزولة الخاصة.

**لماذا؟** بدون هذا الدافع، لن تكون هناك حاجة لتعقيد بناء نظام موزّع أصلاً — يمكن ببساطة استخدام حاسوب واحد مستقل.

---

#### 1.3. التعريف الدقيق المعتمد في المقرر

#### النص الأصلي يقول:
> "A distributed system is one in which hardware or software components located at networked computers communicate and coordinate their actions only by message passing."

#### الشرح المبسّط:
هذا هو التعريف **الرسمي** المعتمد في هذا المقرر. أهم ما فيه:
- المكوّنات (`hardware` أو `software`) موجودة على أجهزة **مختلفة** متصلة بشبكة.
- الطريقة **الوحيدة** للتواصل والتنسيق بينها هي **تبادل الرسائل** (`message passing`) — لا توجد ذاكرة مشتركة مباشرة بين هذه الأجهزة.

**لماذا؟** حصر وسيلة التواصل في "الرسائل فقط" هو ما يفرّق النظام الموزّع عن نظام متعدد المعالجات بذاكرة مشتركة (`shared memory multiprocessor`)، وهو ما يفسّر لاحقاً كل المشاكل (تأخير الشبكة، عدم معرفة وصول الرسالة، إلخ).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو كان جهازان يتشاركان نفس الذاكرة الفيزيائية مباشرة (لا عبر شبكة)، هل يُعتبران نظاماً موزّعاً حسب هذا التعريف؟
> **لماذا هذا مهم؟** لأنه يوضّح أن الفيصل الحقيقي هو "التواصل عبر تبادل الرسائل فقط"، وليس مجرد وجود أكثر من معالج.

---

#### 1.4. أمثلة على شبكات الحواسيب والفرق بين "شبكة" و"نظام موزّع"

#### النص الأصلي يقول:
> أمثلة الشبكات: Mobile networks، Corporate networks، Factory networks، Campus networks، Home networks، In-car networks، On board networks in aeroplanes and trains.
> "Computer Network: the independent computers are explicitly visible... Distributed System: existence of multiple independent computers is transparent."

#### الشرح المبسّط:
- توجد أمثلة كثيرة وواقعية على شبكات حواسيب (منزلية، جامعية، مصنعية، داخل السيارة أو الطائرة...).
- الفرق الجوهري:
  - في **`Computer Network`**: المستخدم يرى بوضوح أن هناك عدة أجهزة (مثلاً يحدد IP جهاز معيّن للاتصال به).
  - في **`Distributed System`**: وجود عدة أجهزة **مخفي (transparent)** عن المستخدم، الذي يتعامل مع الخدمة كوحدة واحدة.

**لماذا؟** لأن هذا الفرق هو جوهر مفهوم **الشفافية (Transparency)** الذي سيُشرح لاحقاً بالتفصيل في القسم 5.7 — فالنظام الموزّع هو شبكة حاسوب + طبقة برمجية (middleware) تُخفي هذا التعدد.

#### 💡 التشبيه:
> شبكة الكهرباء في المدينة تتكوّن من عشرات محطات التوليد، لكن حين تُشغّل المصباح في بيتك لا تهتم من أي محطة أتت الكهرباء.
> **وجه الشبه:** محطات التوليد المتعددة والمخفية عنك = الحواسيب المستقلة في `Distributed System` التي تظهر كخدمة واحدة.

---

### 2. المشاكل الواجب معالجتها (Problems to be Addressed)

#### 2.1. التزامن (Concurrency)

#### النص الأصلي يقول:
> "Different Computers on a network. Each computer can be doing work at the same time. What happens if two computers want to access a resource at the same time? Network delays are not constant, make synchronization difficult."

#### الشرح المبسّط:
بما أن كل حاسوب في النظام الموزّع يعمل بشكل مستقل، فقد تحدث عدة عمليات **في نفس اللحظة** (concurrently). هذا يطرح سؤالاً جوهرياً: ماذا لو أراد حاسوبان الوصول لنفس المورد (مثل ملف مشترك) في نفس الوقت؟ ومن يفوز؟
كذلك، تأخير الشبكة (`network delay`) ليس ثابتاً — أحياناً سريع وأحياناً بطيء — ما يجعل مزامنة الأحداث بين الأجهزة أمراً صعباً.

**لماذا؟** لأنه في الحاسوب الواحد التقليدي، نظام التشغيل يتحكم مركزياً بالتزامن، أما في النظام الموزّع فلا يوجد متحكّم مركزي واحد يرى كل شيء لحظة بلحظة.

#### 💡 التشبيه:
> شخصان يحاولان حجز نفس المقعد الأخير في رحلة طيران من موقعين مختلفين في نفس الثانية.
> **وجه الشبه:** المقعد = المورد المشترك، والحجزان المتزامنان = طلبات الوصول المتزامنة (`concurrent access`).

---

#### 2.2. غياب ساعة عامة (No Global Clock)

#### النص الأصلي يقول:
> "When programs need to cooperate they coordinate their actions by exchanging messages. Close coordination often depends on a shared idea of the time at which events occur. There are limits to the accuracy with which components in a network can synchronize their clocks. There is no global notion of the correct time."

#### الشرح المبسّط:
لكي تتعاون البرامج، تحتاج أحياناً للاتفاق على "**متى** حدث كل شيء" (هل الحدث A قبل الحدث B؟). لكن كل حاسوب له ساعته الداخلية الخاصة، وهذه الساعات لا يمكن مزامنتها بدقة مطلقة عبر الشبكة — **لا توجد ساعة مرجعية واحدة** يتفق عليها الجميع بشكل مثالي.

**لماذا؟** لأن أي محاولة لمزامنة الساعات تمرّ عبر الشبكة نفسها، والتي لها تأخير متغيّر (كما في المشكلة السابقة)، فتبقى هناك دائماً هامش خطأ صغير بين ساعات الأجهزة المختلفة.

#### ⚠️ نقطة مهمة:
> غياب الساعة العامة هو أحد أسباب ظهور مفاهيم لاحقة مثل `Lamport Timestamps` و`Vector Clocks` في محاضرات قادمة **(غير مشروحة في هذه المحاضرة)** — وظيفتها ترتيب الأحداث منطقياً بدل الاعتماد على وقت فيزيائي دقيق.

---

#### 2.3. الأعطال المستقلة (Independent Failures)

#### النص الأصلي يقول:
> "All computer systems can fail. Distributed systems fail in new ways. Network faults might result in components being isolated but not stopping. What happens if you're waiting for an acknowledge message and you never get it? How do you know if the remote system got your message? Each component of the system can fail independently, leaving the others still running."

#### الشرح المبسّط:
كل الأنظمة قد تتعطّل، لكن النظام الموزّع يتعطّل بطرق **جديدة وأصعب** في التشخيص:
- قد ينعزل جهاز عن الشبكة (network fault) دون أن يتوقف فعلياً عن العمل داخلياً.
- إذا انتظرت رسالة تأكيد (`acknowledgement`) ولم تصلك، لا تعرف: هل الرسالة الأصلية لم تصل؟ أم وصلت لكن الرد ضاع؟ أم أن الطرف الآخر توقف تماماً؟
- كل مكوّن يمكن أن يفشل **بشكل منفصل ومستقل** بينما تستمر بقية الأجزاء بالعمل بشكل طبيعي.

**لماذا؟** لأن غياب المعرفة الأكيدة بحالة الطرف الآخر (بسبب الاعتماد فقط على تبادل الرسائل) يجعل التمييز بين "بطء" و"عطل حقيقي" و"انقطاع مؤقت" أمراً غير مؤكد رياضياً — وهذا ما يُعرف لاحقاً بمشكلة `Partial Failure`.

#### الفهم الخاطئ ❌: عدم وصول رسالة التأكيد يعني أن الخادم توقف عن العمل.
#### الفهم الصحيح ✅: عدم وصول رسالة التأكيد قد يعني أن الرسالة الأصلية ضاعت، أو الرد ضاع، أو الشبكة بطيئة، أو الخادم فعلاً معطّل — ولا طريقة مؤكدة للتفريق فوراً.

---

### 3. أمثلة على الأنظمة الموزّعة (Examples of Distributed Systems)

#### 3.1. الإنترنت، الإنترانت، والعنقود (Cluster)

#### النص الأصلي يقول:
> "Internet: a very large distributed system consisting of many interconnected computer networks... Intranets: a 'mini-internet' which uses the same technologies as the internet, but is controlled by an organization... Cluster: a collection of interconnected stand-alone computers cooperatively working together as a single, integrated computing resource."

#### الشرح المبسّط:
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Internet` | نظام موزّع ضخم جداً يتكوّن من شبكات مترابطة كثيرة | أكبر مثال عملي على حل مشاكل الأنظمة الموزّعة فعلياً |
| `Intranet` | "إنترنت مصغّرة" بنفس التقنيات لكن تحت سيطرة منظمة واحدة | شبكة داخلية لشركة |
| `Cluster` | مجموعة حواسيب مستقلة مترابطة تعمل معاً كمورد حوسبة واحد متكامل | محرّكات البحث التي تخدم ملايين المستخدمين |

**لماذا؟** هذه الأمثلة توضّح أن "النظام الموزّع" ليس مفهوماً نظرياً فقط، بل موجود بأحجام متفاوتة: من عنقود صغير داخل مركز بيانات، إلى الإنترنت بأكمله.

#### 💡 التشبيه:
> الـ `Cluster` يشبه فريقاً من الطهاة في مطعم كبير يعملون معاً على طلب واحد ضخم، كل واحد يجهّز جزءاً، لكن الزبون يستلم "طبقاً واحداً متكاملاً".
> **وجه الشبه:** الطهاة المتعددون = الحواسيب المستقلة، والطبق النهائي الموحّد = المورد الحوسبي المتكامل.

---

#### 3.2. الحوسبة المتنقلة والحوسبة السحابية (Mobile Computing & Cloud Computing)

#### النص الأصلي يقول:
> "Today's computing power makes it possible to build small mobile devices which can benefit from network information... A cloud is defined as a set of Internet-based application, storage and computing services sufficient to support most users' needs... enabling them to largely or totally dispense with local data storage and application software."

#### الشرح المبسّط:
- **`Mobile computing`**: أجهزة صغيرة (لابتوب، موبايل) استفادت من قدرة الحوسبة المتزايدة + القدرة على الاتصال بالشبكة من أي مكان، فأصبحت جزءاً من النظام الموزّع أثناء تنقّلها.
- **`Cloud computing`**: مجموعة خدمات (تطبيقات، تخزين، حوسبة) تُقدَّم عبر الإنترنت، بحيث يمكن للمستخدم الاستغناء عن التخزين والمعالجة المحلية بالكامل تقريباً. كل شيء يُقدَّم "كخدمة" (`everything as a service`) وغالباً بنظام الدفع حسب الاستخدام.

**لماذا؟** لأن تقليل الاعتماد على قدرة الجهاز المحلي (كما في الحوسبة السحابية) يتيح لأجهزة بسيطة جداً الوصول لموارد وخدمات ضخمة — وهذا تطبيق مباشر لمبدأ **مشاركة الموارد** الذي ذُكر في بداية المحاضرة.

#### ⚖️ المقايضة: التخزين المحلي مقابل الحوسبة السحابية

| | التخزين/المعالجة المحلية | الحوسبة السحابية |
| --- | --- | --- |
| المزايا | لا حاجة للاتصال بالإنترنت، تحكّم كامل بالبيانات | أجهزة بسيطة تكفي، موارد شبه غير محدودة، دفع حسب الاستخدام |
| العيوب | يتطلب جهازاً قوياً ومكلفاً، صعوبة المشاركة | يعتمد على الاتصال بالشبكة، مخاوف خصوصية/أمان |
| متى تختاره | بيانات حساسة جداً أو بيئة بلا إنترنت موثوق | تطبيقات تحتاج قابلية توسّع كبيرة ومشاركة سهلة |

---

### 4. مشاركة الموارد (Resource Sharing)

#### 4.1. ما هو المورد؟

#### النص الأصلي يقول:
> "What is a resource? Hardware (shared printer). Pieces of running software, distributed objects. Data (files)... Resources in a distributed system are encapsulated within computers, can only be accessed from other computers by communication, and managed by a program that offers a communication interface."

#### الشرح المبسّط:
`Resource` هو أي شيء يمكن مشاركته: قد يكون **عتاداً** (مثل طابعة مشتركة)، أو **برمجية قيد التشغيل** (كائنات موزّعة `distributed objects`)، أو **بيانات** (ملفات). وأهم صفة لهذه الموارد في النظام الموزّع:
- محصورة (`encapsulated`) داخل حاسوب معيّن.
- لا يمكن الوصول إليها من جهاز آخر إلا عبر **اتصال (communication)** — لا يوجد وصول مباشر.
- تتم إدارتها ببرنامج يوفّر واجهة اتصال (`communication interface`) محددة.

**لماذا؟** هذا الحصر (`encapsulation`) يحمي المورد من التلاعب المباشر غير المنظّم، ويجبر كل وصول على المرور عبر قواعد محددة (الواجهة)، ما يسهّل ضبط الأمان والتزامن.

---

#### 4.2. الخدمة، الخادم، والاستدعاء عن بُعد

#### النص الأصلي يقول:
> "The term service is used for a distinct part of a computer system which manages a collection of related resources and presents their functionality... via a well-defined set of operations. Server refers to a running program... that accepts request messages from programs, clients... A complete interaction between a client and a server is called a remote invocation."

#### الشرح المبسّط:
| المصطلح | التعريف |
| --- | --- |
| `Service` | جزء من النظام يدير مجموعة موارد مترابطة ويعرضها عبر عمليات محددة |
| `Server` | برنامج قيد التشغيل يستقبل طلبات من `clients` وينفّذ الخدمة ويرد برسالة |
| `Client` | البرنامج الذي يرسل الطلب |
| `Remote Invocation` | التفاعل الكامل (طلب + رد) بين `client` و`server` |

#### ⚙️ الخطوات / الخوارزمية: تفاعل Remote Invocation

#### ما هدف هذه العملية؟
> تحقيق تواصل منظّم بين برنامج (client) يحتاج خدمة، وبرنامج آخر (server) يقدّمها، مع العلم أنهما على جهازين مختلفين ولا يتشاركان الذاكرة.

```algorithm
1 | إرسال الطلب | Client | يرسل الـ client رسالة طلب (request message) إلى الـ server عبر الشبكة
2 | استقبال ومعالجة | Server | يستقبل الـ server الطلب وينفّذ العملية المطلوبة على المورد الذي يديره
3 | إرسال الرد | Server | يرسل الـ server رسالة رد (reply message) تحوي نتيجة العملية
4 | استقبال النتيجة | Client | يستقبل الـ client الرد ويكمل عمله بناءً على النتيجة
```

#### نقاط التنفيذ:
- إذا ضاعت رسالة الطلب أو الرد، يواجه النظام مشكلة "الأعطال المستقلة" الموضّحة في القسم 2.3 (لا يعرف الـ client هل نُفّذ الطلب فعلاً أم لا).
- **(شرح زيادة للفهم)** هذا النمط هو الأساس لبروتوكولات لاحقة مثل `RPC` (Remote Procedure Call) و`RMI` (Remote Method Invocation) التي سيتم شرحها في محاضرات لاحقة بالتفصيل.

#### 💡 التشبيه:
> طلب توصيل طعام: أنت (`client`) ترسل الطلب للمطعم (`server`)، يجهّزون الطلب (تنفيذ العملية)، ثم يصلك الطبق (الرد).
> **وجه الشبه:** التطبيق الذي يوصل الطلب = رسالة الطلب، والطبق الواصل = رسالة الرد، والتفاعل الكامل من الطلب حتى الاستلام = `remote invocation`.

---

### 5. تحديات تصميم الأنظمة الموزّعة (Design Challenges)

#### 5.1. التغايرية (Heterogeneity)

#### النص الأصلي يقول:
> "Heterogeneous components (Networks, Hardware architectures, Operating systems, Programming languages, Different developers) must be able to interoperate. Examples that mask differences... are: Internet protocols, Middleware (CORBA, Java RMI), Mobile code."

#### الشرح المبسّط:
النظام الموزّع الواقعي مبني غالباً من مكوّنات **مختلفة تماماً**: شبكات مختلفة، معماريات عتاد مختلفة، أنظمة تشغيل مختلفة، لغات برمجة مختلفة، وحتى فرق تطوير مختلفة. التحدي هو جعل كل هذا **يتعاون معاً (interoperate)** رغم اختلافه.

**أمثلة الحلول:**
- `Internet protocols` (مثل TCP/IP) توحّد طريقة نقل البيانات بغض النظر عن نوع الشبكة.
- `Middleware` (مثل `CORBA`، `Java RMI`) يخفي اختلافات النظام والعتاد عن المبرمج.
- `Mobile code`: كود يمكن إرساله من حاسوب وتشغيله في حاسوب آخر (مثل الأكواد التي تعمل داخل المتصفح).

**لماذا؟** بدون طبقة توحيد (بروتوكولات أو middleware)، سيحتاج كل تطبيق لمعرفة تفاصيل كل نوع جهاز أو نظام تشغيل سيتواصل معه، وهذا غير عملي في مقياس الإنترنت.

---

#### 5.2. الانفتاح (Openness)

#### النص الأصلي يقول:
> "Openness: Interfaces should allow components to be added or replaced... determined primarily by the degree to which new resource-sharing services can be added... The first step in openness is publishing the documentation of software components and interfaces."

#### الشرح المبسّط:
`Openness` تعني أن النظام مصمَّم بحيث يمكن **إضافة أو استبدال** مكوّناته بسهولة، ودمج خدمات جديدة دون إعادة بناء كل شيء من الصفر. أول خطوة عملية لتحقيق ذلك: **نشر توثيق** الواجهات (`interfaces`) بشكل علني ليتمكن مطوّرون آخرون من بناء مكوّنات متوافقة.

**لماذا؟** لأن السماح بالتوسّع المستقبلي (خدمات، عملاء، أدوات جديدة) هو ما يجعل النظام حياً وقابلاً للتطور بدل أن يصبح متجمداً بعد أول إصدار.

#### 💡 التشبيه:
> منفذ USB القياسي على الحاسوب: أي شركة يمكنها تصنيع جهاز يتوافق معه طالما اتبعت المواصفة المنشورة.
> **وجه الشبه:** توثيق `interface` المنشور = مواصفة USB، والأجهزة الجديدة القابلة للإضافة = الخدمات/المكونات الجديدة.

---

#### 5.3. الأمان (Security)

#### النص الأصلي يقول:
> "Security... the resources are accessible to authorized users and used in the way they are intended. Security for information resources has three components: Confidentiality... Integrity... Availability."

#### الشرح المبسّط:
`Security` تضمن أن النظام يُستخدم **فقط بالطريقة المقصودة** ومن **المستخدمين المصرّح لهم**. ثلاثة مكوّنات أساسية:

| المكوّن | المعنى |
| --- | --- |
| `Confidentiality` | حماية البيانات من الاطّلاع غير المصرّح به |
| `Integrity` | حماية البيانات من التعديل أو التلف غير المصرّح به |
| `Availability` | حماية استمرارية الوصول للموارد من التعطيل المتعمّد |

**لماذا؟** بما أن كل تواصل يتم عبر رسائل في شبكة مفتوحة غالباً، يصبح اعتراض أو تزوير أو حجب هذه الرسائل ممكناً تقنياً — لذلك الأمان ليس رفاهية بل ضرورة بنيوية.

#### الفهم الخاطئ ❌: الأمان يعني فقط منع الاختراق (الوصول غير المصرّح).
#### الفهم الصحيح ✅: الأمان يشمل أيضاً حماية سلامة البيانات (`Integrity`) واستمرارية توفّرها (`Availability`)، وليس فقط منع الاطّلاع غير المصرّح به.

---

#### 5.4. قابلية التوسّع (Scalability)

#### النص الأصلي يقول:
> "System should work efficiently with an increasing number of users. System performance should increase with inclusion of additional resources... Caching and replication in Web are examples of providing scalability."

#### الشرح المبسّط:
النظام القابل للتوسّع يجب أن:
1. يعمل بكفاءة رغم زيادة عدد المستخدمين.
2. يتحسّن أداؤه عند إضافة موارد جديدة (وليس فقط "لا يسوء").
النظام الجيد يعمل بفعالية على أحجام مختلفة جداً: من إنترانت صغيرة إلى الإنترنت بأكمله.

**أمثلة عملية:** التخزين المؤقت (`caching`) والتكرار (`replication`) في الويب — يقلّلان الحمل عن الخادم الأصلي بتوزيع النسخ أو حفظها مؤقتاً قرب المستخدم.

**لماذا؟** بدون هذه التقنيات، سيصبح أي خادم مركزي عنق زجاجة (`bottleneck`) بمجرد زيادة عدد المستخدمين، بغض النظر عن قوة الأجهزة.

---

#### 5.5. معالجة الأعطال (Failure Handling)

#### النص الأصلي يقول:
> "Failure of a component (partial failure) should not result in failure of the whole system... Techniques: Detecting failures (Checksums), Masking failures (Retransmission of corrupt messages), Tolerating failures (Exception handling), Recovery from Failure (Rollback mechanisms), Redundancy (Redundant components)."

#### الشرح المبسّط:
بما أن الأعطال في النظام الموزّع **جزئية** (بعض المكونات تفشل بينما تستمر أخرى)، لا يجب أن يؤدي عطل مكوّن واحد لانهيار النظام بأكمله. توجد خمس تقنيات رئيسية للتعامل مع هذا:

#### ⚙️ الخطوات / الخوارزمية: تقنيات معالجة الأعطال

```algorithm
1 | كشف الفشل | Checksums | التحقق من سلامة البيانات المستلمة لاكتشاف التلف أو الخطأ
2 | إخفاء الفشل | Retransmission | إعادة إرسال الرسائل التالفة أو المفقودة لإخفاء أثر العطل عن المستخدم
3 | تحمّل الفشل | Exception Handling | التعامل مع الاستثناء برمجياً ومتابعة العمل بدل التوقف الكامل
4 | التعافي من الفشل | Rollback | الرجوع لحالة سابقة معروفة وصحيحة بعد حدوث عطل
5 | التكرار | Redundancy | استخدام مكونات احتياطية مكررة لتقليل أثر فشل مكوّن واحد
```

#### نقاط التنفيذ:
- هذه التقنيات ليست بديلة عن بعضها بل غالباً تُستخدم **معاً** (مثلاً: كشف الفشل بـ checksum ثم إعادة الإرسال).
- **(شرح زيادة للفهم)** التمييز بين "إخفاء الفشل" (`masking`) و"تحمّله" (`tolerating`) مهم: الأول يجعل العطل غير مرئي تماماً للمستخدم، بينما الثاني يسمح باستمرار العمل رغم ظهور أثر للعطل (مثل رسالة خطأ يتعامل معها البرنامج).

---

#### 5.6. التزامن كتحدي تصميمي (Concurrency كـ Design Challenge)

#### النص الأصلي يقول:
> "Any object that represents a shared resource... must be responsible for ensuring that it operates correctly in a concurrent environment... its operations must be synchronized in such a way that its data remains consistent. Concurrency can be achieved by standard techniques such as semaphores."

#### الشرح المبسّط:
هذا امتداد لمشكلة التزامن (القسم 2.1) لكن هنا من زاوية **التصميم**: أي كائن (`object`) يمثّل مورداً مشتركاً يجب أن يضمن بنفسه صحة عمله حتى لو استُدعي من عدة عملاء في نفس الوقت. الحل القياسي: أدوات المزامنة مثل `semaphores` المستخدمة أصلاً في أنظمة التشغيل.

**لماذا؟** لأن ترك التزامن دون ضبط يؤدي لتضارب في البيانات (`data inconsistency`) — مثل عمليتين تعدّلان نفس الملف في نفس اللحظة فتُفقد إحدى التعديلات.

---

#### 5.7. الشفافية (Transparency)

#### النص الأصلي يقول:
> "Transparency is defined as the hiding of the separation of components in a distributed system from the user and the application programmer. With transparency the system is perceived as a whole rather than a collection of independent components."

#### الشرح المبسّط:
`Transparency` تعني إخفاء حقيقة أن النظام مكوَّن من أجزاء منفصلة، بحيث يشعر المستخدم والمبرمج أنهما يتعاملان مع **نظام واحد متكامل**.

#### 📊 المخطط: أشكال الشفافية وعلاقتها بالنظام الموزّع

#### ما هذا المخطط؟
> يوضّح كيف تتفرّع أنواع الشفافية الثمانية من المفهوم العام `Transparency`، وكيف يشكّل نوعان منها معاً `Network Transparency`.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Transparency | event | المفهوم العام: إخفاء تعدد المكوّنات عن المستخدم |
| 2 | Access | node | إتاحة الوصول للموارد المحلية والبعيدة بنفس العمليات |
| 3 | Location | node | الوصول للمورد دون معرفة موقعه الفعلي |
| 4 | Concurrency | node | تشغيل عمليات متعددة بدون تداخل ضار بينها |
| 5 | Replication | node | استخدام نسخ متعددة من المورد دون علم المستخدم |
| 6 | Failure | node | إخفاء الأعطال عن المستخدم قدر الإمكان |
| 7 | Mobility | node | نقل الموارد/العملاء دون التأثير على تشغيل التطبيقات |
| 8 | Performance | node | إعادة ضبط النظام لتحسين الأداء حسب الحمل |
| 9 | Scaling | node | التوسّع دون تغيير بنية النظام أو الخوارزميات |
| 10 | Network Transparency | event | تجميع Access + Location معاً باعتبارهما الأهم |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Transparency | Access | يشمل | عادي | نوع فرعي من الشفافية |
| Transparency | Location | يشمل | عادي | نوع فرعي من الشفافية |
| Transparency | Concurrency | يشمل | عادي | نوع فرعي من الشفافية |
| Transparency | Replication | يشمل | عادي | نوع فرعي من الشفافية |
| Transparency | Failure | يشمل | عادي | نوع فرعي من الشفافية |
| Transparency | Mobility | يشمل | عادي | نوع فرعي من الشفافية |
| Transparency | Performance | يشمل | عادي | نوع فرعي من الشفافية |
| Transparency | Scaling | يشمل | عادي | نوع فرعي من الشفافية |
| Access | Network Transparency | يُشكّل مع Location | مركّب | الأهم بين كل الأنواع |
| Location | Network Transparency | يُشكّل مع Access | مركّب | الأهم بين كل الأنواع |

```diagram
type: dfd
title: أشكال الشفافية في الأنظمة الموزعة
direction: TD
nodes:
  - id: transparency
    label: Transparency
    kind: event
    level: 0
  - id: access
    label: Access Transparency
    kind: node
    level: 1
  - id: location
    label: Location Transparency
    kind: node
    level: 1
  - id: concurrency
    label: Concurrency Transparency
    kind: node
    level: 1
  - id: replication
    label: Replication Transparency
    kind: node
    level: 1
  - id: failure
    label: Failure Transparency
    kind: node
    level: 1
  - id: mobility
    label: Mobility Transparency
    kind: node
    level: 1
  - id: performance
    label: Performance Transparency
    kind: node
    level: 1
  - id: scaling
    label: Scaling Transparency
    kind: node
    level: 1
  - id: network_transparency
    label: Network Transparency
    kind: event
    level: 2
edges:
  - from: transparency
    to: access
  - from: transparency
    to: location
  - from: transparency
    to: concurrency
  - from: transparency
    to: replication
  - from: transparency
    to: failure
  - from: transparency
    to: mobility
  - from: transparency
    to: performance
  - from: transparency
    to: scaling
  - from: access
    to: network_transparency
  - from: location
    to: network_transparency
```

#### النص الأصلي يقول (تفصيل كل نوع):
> "Access transparency: Enables local and remote resources to be accessed using identical operations. Location transparency: Enables resources to be accessed without knowledge of their physical or network location. Concurrency transparency: Enables several processes to operate concurrently using shared resources without interference between them. Replication transparency: Enables multiple instances of resources to be used to increase reliability and performance without knowledge of the replicas... Failure transparency: Enables the concealment of faults... Mobility transparency: Allows the movement of resources and clients within a system without affecting the operation... Performance transparency: Allows the system to be reconfigured to improve performance as loads vary. Scaling transparency: Allows the system and applications to expand in scale without change to the system structure or the application algorithms."

#### الشرح المبسّط (جدول مرجعي):
| النوع | يخفي ماذا؟ | مثال يومي |
| --- | --- | --- |
| `Access` | الفرق بين استدعاء مورد محلي أو بعيد | فتح ملف محلي أو على السحابة بنفس الأمر تماماً |
| `Location` | الموقع الفعلي للمورد | لا تعرف أي خادم Google يرد على بحثك، ولا يهمك |
| `Concurrency` | تداخل عدة عمليات على نفس المورد | آلاف المستخدمين يعدّلون مستند Google Docs بلا تصادم واضح |
| `Replication` | وجود نسخ متعددة من نفس المورد | نسخ متعددة من نفس الموقع على خوادم مختلفة حول العالم |
| `Failure` | وقوع أعطال جزئية | الموقع يستمر بالعمل رغم تعطّل أحد خوادمه دون أن تشعر |
| `Mobility` | انتقال المورد أو العميل من مكان لآخر | تحريك تطبيق موبايل بين أبراج شبكة دون انقطاع المكالمة |
| `Performance` | إعادة توزيع الحمل | الموقع يوجّهك تلقائياً لأقرب خادم أقل ازدحاماً |
| `Scaling` | التوسّع الداخلي في الحجم | إضافة آلاف الخوادم الجديدة دون تغيير طريقة استخدام التطبيق |

**لماذا؟** لأن الهدف النهائي لكل هذه الأنواع هو نفسه: تبسيط تجربة المستخدم والمبرمج بإخفاء التعقيد الحقيقي للتوزيع، لكن كل نوع يُخفي **جانباً مختلفاً** من هذا التعقيد.

#### مهم للامتحان ⚠️:
> النوعان الأهم والأكثر تكراراً في الأسئلة هما `Access Transparency` و`Location Transparency`، وهما يُسمّيان معاً `Network Transparency` — احفظ هذا الربط جيداً.

#### 💡 التشبيه:
> التلفاز الذكي: تضغط زر "تشغيل Netflix" فقط، ولا تعرف من أي خادم حول العالم يصلك الفيديو (`Location`)، ولا يهمك إن كان جهازك أو التلفاز هو من ينفّذ الطلب (`Access`)، وقد يعاد توجيهك لخادم أقرب دون أن تشعر (`Performance`).
> **وجه الشبه:** تعدد الأنواع المخفية = طبقات التعقيد الحقيقية التي لا يراها المستخدم العادي.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Distributed System` | مكونات على أجهزة مختلفة تتواصل وتتنسّق فقط عبر تبادل الرسائل | التعريف المعتمد في المقرر |
| `Computer Network` | شبكة تكون فيها الأجهزة المستقلة ظاهرة وقابلة للعنونة صراحة | عكس النظام الموزّع من حيث الشفافية |
| `Resource` | أي شيء قابل للمشاركة: عتاد، برمجية، بيانات | طابعة، كائن موزّع، ملف |
| `Service` | جزء من النظام يدير موارد مترابطة عبر عمليات محددة | خدمة طباعة، خدمة بريد |
| `Server` | برنامج يستقبل طلبات وينفّذ خدمة ويرد | خادم ويب |
| `Client` | برنامج يرسل طلب خدمة | متصفح الإنترنت |
| `Remote Invocation` | تفاعل كامل (طلب + رد) بين client وserver | زيارة صفحة ويب |
| `Middleware` | طبقة برمجية تخفي اختلافات الأنظمة والعتاد | `CORBA`، `Java RMI` |
| `Transparency` | إخفاء انفصال المكونات عن المستخدم والمبرمج | ثمانية أنواع فرعية |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Internet protocols` | توحيد نقل البيانات عبر شبكات مختلفة | يعالج تحدي `Heterogeneity` |
| `Middleware` (CORBA, Java RMI) | إخفاء اختلاف الأنظمة والعتاد عن المبرمج | يعالج تحدي `Heterogeneity` |
| `Mobile code` | كود يُرسل ويُنفَّذ على جهاز آخر | يعالج تحدي `Heterogeneity` |
| `Checksums` | كشف تلف البيانات | يعالج `Failure Handling` |
| `Retransmission` | إعادة إرسال رسائل تالفة | يعالج `Failure Handling` |
| `Semaphores` | ضبط التزامن على مورد مشترك | يعالج `Concurrency` |
| `Caching / Replication` | تقليل الحمل عن الخادم الأصلي | يعالج `Scalability` |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| Computer Network مقابل Distributed System | `Computer Network`: الأجهزة ظاهرة صراحة | `Distributed System`: وجود الأجهزة المتعددة مخفي (شفاف) | مستوى الشفافية عن المستخدم |
| Masking مقابل Tolerating الفشل | `Masking`: إخفاء العطل تماماً (إعادة إرسال) | `Tolerating`: الاستمرار بالعمل رغم ظهور أثر للعطل (exception handling) | درجة ظهور العطل للمستخدم |
| Access Transparency مقابل Location Transparency | `Access`: نفس العمليات لمورد محلي أو بعيد | `Location`: لا حاجة لمعرفة أين يقع المورد فعلياً | الأول عن طريقة الاستدعاء، الثاني عن الموقع |
| Cluster مقابل Cloud | `Cluster`: حواسيب مترابطة تعمل كمورد واحد متكامل | `Cloud`: خدمات عبر الإنترنت تُقدَّم للمستخدمين كخدمة | Cluster بنية داخلية، Cloud نموذج تقديم خدمة للمستخدم النهائي |

### قاموس المصطلحات (Glossary)
| الفئة | المصطلحات |
| --- | --- |
| تعريفات أساسية | `Distributed System`، `Computer Network`، `Resource`، `Middleware` |
| مشاكل | `Concurrency`، `No Global Clock`، `Independent (Partial) Failure` |
| مشاركة الموارد | `Service`، `Server`، `Client`، `Remote Invocation` |
| تحديات التصميم | `Heterogeneity`، `Openness`، `Security`، `Scalability`، `Failure Handling`، `Concurrency`، `Transparency` |
| أنواع الشفافية | `Access`، `Location`، `Concurrency`، `Replication`، `Failure`، `Mobility`، `Performance`، `Scaling`، `Network Transparency` |

### أبرز النقاط الذهبية
1. مشاركة الموارد هي الدافع الأساسي وراء أي نظام موزّع مهما اختلف تعريفه الدقيق.
2. التعريف المعتمد: تواصل وتنسيق المكونات يتم **فقط** عبر تبادل الرسائل.
3. ثلاث مشاكل جوهرية تنتج مباشرة من هذا التعريف: `Concurrency`، `No Global Clock`، `Independent Failures`.
4. سبعة تحديات تصميم رئيسية يجب مراعاتها: `Heterogeneity`، `Openness`، `Security`، `Scalability`، `Failure Handling`، `Concurrency`، `Transparency`.
5. `Access` و`Location Transparency` معاً يُشكّلان `Network Transparency` وهما الأهم بين الأنواع الثمانية.

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| اعتبار أي شبكة حواسيب = نظام موزّع | النظام الموزّع يتطلّب إخفاء تعدد الأجهزة (شفافية)، وليس فقط ربطها بشبكة |
| الخلط بين `Masking` و`Tolerating` الفشل | `Masking` يُخفي العطل تماماً، بينما `Tolerating` يسمح باستمرار العمل رغم ظهور أثر للعطل |
| اعتبار `Scalability` تعني فقط "يتحمّل عدد أكبر من المستخدمين" | تشمل أيضاً تحسّن الأداء عند إضافة موارد، وليس فقط الصمود أمام الحمل |
| الخلط بين `Access Transparency` و`Location Transparency` | الأول يخص طريقة الاستدعاء (نفس العمليات)، والثاني يخص عدم الحاجة لمعرفة الموقع الفعلي |

---

### خطوات وإجراءات المحاضرة
> تم تغطيتها ضمن أقسام الشرح التفصيلي أعلاه: **Remote Invocation** (القسم 4.2) و**تقنيات معالجة الأعطال الخمس** (القسم 5.5).

### أنماط الأكواد والبنى المتكررة
| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| **(غير مشروحة في المحاضرة)** | لا يوجد كود أو بنية برمجية صريحة في هذه المحاضرة المفاهيمية | — |

### أنماط التعامل والسلوك
| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| عدم وصول رسالة تأكيد | لا تفترض فوراً أن الطرف الآخر معطّل — تحقق عبر إعادة المحاولة أو آلية كشف أعطال | لأن السبب قد يكون تأخير شبكة وليس عطلاً حقيقياً (القسم 2.3) |
| الحاجة لمشاركة مورد بين عدة مستخدمين | صمّم واجهة اتصال واضحة (service) بدل الوصول المباشر | يحافظ على الحصر (encapsulation) والأمان |
| زيادة كبيرة في عدد المستخدمين | استخدم `caching`/`replication` بدل تكبير الخادم المركزي فقط | يحقق `Scalability` بكفاءة أفضل |

### الأفكار الرئيسية الشاملة
- كل تحديات التصميم (heterogeneity, openness, security...) هي في جوهرها ردود فعل هندسية على المشاكل الثلاث الأساسية (concurrency, no global clock, independent failure) الناتجة عن التعريف الرسمي للنظام الموزّع.
- الشفافية (Transparency) هي الهدف النهائي الذي تسعى إليه كل الحلول التقنية الأخرى (middleware، caching، replication...) — إخفاء التعقيد عن المستخدم النهائي والمبرمج.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع المعدَّل لطبيعة هذه المحاضرة المفاهيمية: مقارنات 30% (5 أسئلة) | تطبيق مفاهيمي 40% (6 أسئلة) | تحليل سيناريو/تتبّع منطقي 30% (5 أسئلة).

### السؤال 1 (medium) — مقارنة
ما الفرق الجوهري بين `Computer Network` و`Distributed System` حسب المحاضرة؟
أ) لا يوجد فرق، المصطلحان مترادفان
ب) في الشبكة الحاسوبية تكون الأجهزة المتعددة ظاهرة صراحة، بينما في النظام الموزّع يكون وجودها مخفياً (شفافاً)
ج) النظام الموزّع لا يحتاج لشبكة أصلاً
د) الشبكة الحاسوبية أسرع دائماً من النظام الموزّع
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأنها تطابق نص المحاضرة حرفياً حول الشفافية. (أ) خاطئة لأن هناك فرقاً واضحاً في مستوى الشفافية. (ج) خاطئة لأن كليهما مبني على شبكة حواسيب. (د) خاطئة لأن السرعة ليست معياراً مذكوراً للتفريق بينهما إطلاقاً.

---

### السؤال 2 (hard) — تطبيق مفاهيمي
حاسوبان (A وB) مرتبطان مباشرة بذاكرة فيزيائية مشتركة (shared memory) بدون شبكة بينهما، ويتواصلان بالقراءة/الكتابة المباشرة على تلك الذاكرة. هل يُعتبر هذا نظاماً موزّعاً حسب تعريف المحاضرة؟
أ) نعم، لأن هناك جهازين مستقلين
ب) لا، لأن التعريف يشترط أن التواصل يتم فقط عبر تبادل الرسائل، وهذا يتواصل عبر ذاكرة مشتركة
ج) نعم، لأن كل نظام متعدد الحواسيب هو نظام موزّع
د) لا يمكن تحديد ذلك دون معرفة نوع نظام التشغيل
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن التعريف الرسمي يحصر التواصل بـ`message passing` فقط، والذاكرة المشتركة المباشرة تخرج عن هذا التعريف. (أ) و(ج) خاطئتان لأنهما تتجاهلان شرط "الرسائل فقط" وهو جوهر التعريف. (د) خاطئة لأن نظام التشغيل غير ذي صلة بهذا التمييز.

---

### السؤال 3 (medium) — تطبيق مفاهيمي
مستخدم ينتظر رسالة تأكيد (acknowledgement) من خادم بعيد ولا تصله. أي مما يلي **لا يمكن** استنتاجه بشكل مؤكد من هذا الموقف وحده؟
أ) أن هناك تأخيراً في الشبكة
ب) أن الخادم البعيد متوقف تماماً عن العمل
ج) أن رسالة التأكيد قد تكون ضاعت أثناء العودة
د) أن رسالة الطلب الأصلية قد تكون لم تصل أصلاً
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هي الإجابة الصحيحة (الاستنتاج غير المؤكد) لأن المحاضرة تنص على أن غياب التأكيد لا يعني بالضرورة توقف الخادم. (أ)، (ج)، (د) كلها احتمالات واردة ومذكورة صراحة في نص المحاضرة كأسباب ممكنة.

---

### السؤال 4 (medium) — مقارنة
أي مما يلي يمثّل زوجاً صحيحاً من (تحدي التصميم ← الحل المستخدم لمعالجته) كما ورد في المحاضرة؟
أ) Security ← Caching
ب) Scalability ← Replication
ج) Heterogeneity ← Semaphores
د) Concurrency ← Middleware
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن المحاضرة تذكر `caching` و`replication` كأمثلة على تحقيق `Scalability`. (أ) خاطئة لأن Caching يخص Scalability وليس Security. (ج) خاطئة لأن Semaphores تُستخدم لـ Concurrency وليس Heterogeneity. (د) خاطئة لأن Middleware يعالج Heterogeneity وليس Concurrency مباشرة.

---

### السؤال 5 (hard) — تحليل سيناريو
موقع تجارة إلكترونية يضع نسخاً متطابقة من قاعدة بياناته على عدة خوادم حول العالم دون أن يعرف المستخدم بوجود هذه النسخ. أي نوع شفافية يتحقق هنا بشكل أساسي؟
أ) Mobility Transparency
ب) Replication Transparency
ج) Performance Transparency
د) Access Transparency
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن التعريف الحرفي لـ`Replication Transparency` هو استخدام نسخ متعددة من المورد دون علم المستخدم بوجودها. (أ) تخص انتقال الموارد/العملاء وليس تعدد النسخ. (ج) تخص إعادة الضبط حسب الحمل وليس وجود نسخ متعددة تحديداً. (د) تخص طريقة الاستدعاء لا وجود النسخ.

---

### السؤال 6 (medium) — تطبيق مفاهيمي
أي مما يلي **ليس** من المكونات الثلاثة للأمان في المعلومات كما ذُكرت في المحاضرة؟
أ) Confidentiality
ب) Integrity
ج) Availability
د) Openness
**الإجابة الصحيحة: د**
**التعليل:** (د) صحيحة لأن `Openness` تحدٍ تصميمي منفصل تماماً وليس أحد مكونات الأمان الثلاثة. (أ)، (ب)، (ج) هي بالضبط المكونات الثلاثة المذكورة نصاً في المحاضرة.

---

### السؤال 7 (hard) — تحليل سيناريو
تطبيق يستمر بالعمل بشكل طبيعي رغم تعطّل أحد الخوادم التي يعتمد عليها في الخلفية، دون أن يلاحظ المستخدم أي شيء. أي نوع شفافية هذا؟
أ) Failure Transparency
ب) Scaling Transparency
ج) Location Transparency
د) Concurrency Transparency
**الإجابة الصحيحة: أ**
**التعليل:** (أ) صحيحة لأنها تُعرَّف حرفياً بأنها إخفاء الأعطال عن المستخدم لإتمام المهام رغم فشل مكوّن عتاد أو برمجية. (ب) تخص التوسّع في الحجم لا الأعطال. (ج) تخص موقع المورد. (د) تخص تشغيل عمليات متعددة بلا تداخل، وليس التعامل مع الأعطال.

---

### السؤال 8 (medium) — مقارنة
ما الفرق بين `Masking` و`Tolerating` الفشل كتقنيتين لمعالجة الأعطال؟
أ) لا فرق، كلاهما يعني نفس الشيء
ب) Masking يُخفي العطل تماماً عن المستخدم، بينما Tolerating يسمح باستمرار العمل رغم ظهور أثر للعطل
ج) Masking أبطأ من Tolerating دائماً
د) Tolerating يُستخدم فقط في الأنظمة غير الموزّعة
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة وتطابق التمييز الوارد في المحاضرة (إعادة الإرسال كـ masking، ومعالجة الاستثناءات كـ tolerating). (أ) خاطئة لوجود فرق واضح. (ج) لا أساس له في النص. (د) خاطئة لأن كليهما تقنيتان لمعالجة الأعطال في الأنظمة الموزّعة تحديداً.

---

### السؤال 9 (hard) — تطبيق مفاهيمي
شركة تريد إضافة خدمة جديدة (مثلاً خدمة دفع) لنظامها الموزّع الحالي دون الحاجة لإعادة بناء النظام بأكمله، معتمدة على توثيق واجهات منشور مسبقاً. أي تحدي تصميم يصف هذا الموقف؟
أ) Scalability
ب) Openness
ج) Security
د) Concurrency
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن Openness تُعرَّف بأنها القدرة على إضافة أو استبدال مكونات بناءً على واجهات موثّقة ومنشورة. (أ) تخص التعامل مع زيادة الحمل/المستخدمين وليس إضافة خدمات جديدة. (ج) لا علاقة مباشرة بالتوثيق أو الإضافة. (د) تخص التعامل مع الوصول المتزامن للموارد لا إضافة خدمات.

---

### السؤال 10 (medium) — تحليل سيناريو
أي من الأمثلة التالية يمثّل بشكل أدق تعريف `Cluster` كما ورد في المحاضرة؟
أ) شبكة منزلية تربط جهازين للألعاب
ب) مجموعة حواسيب مستقلة مترابطة تعمل معاً كمورد حوسبة متكامل واحد، كما في محركات البحث
ج) هاتف محمول يتصل بشبكة الجيل الخامس
د) خدمة سحابية تُقدَّم عبر الإنترنت للمستخدمين النهائيين
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة وتطابق تعريف Cluster حرفياً مع المثال المذكور (محركات البحث). (أ) مجرد شبكة منزلية بسيطة وليست بالضرورة Cluster. (ج) مثال على Mobile computing لا Cluster. (د) يصف Cloud computing وليس Cluster تحديداً.

---

### السؤال 11 (hard) — تحليل سيناريو
مستخدم يفتح نفس التطبيق على هاتفه أثناء تنقّله بين أبراج اتصال مختلفة دون انقطاع الخدمة أو الحاجة لإعادة الإعداد. أي نوع شفافية يتحقق بشكل رئيسي؟
أ) Mobility Transparency
ب) Replication Transparency
ج) Scaling Transparency
د) Access Transparency
**الإجابة الصحيحة: أ**
**التعليل:** (أ) صحيحة لأن Mobility Transparency تُعرَّف حرفياً بأنها السماح بحركة الموارد والعملاء دون التأثير على تشغيل التطبيقات والمستخدمين. (ب)، (ج)، (د) تصف جوانب أخرى غير متعلقة بالحركة والتنقّل.

---

### السؤال 12 (medium) — مقارنة
أي مما يلي زوج صحيح يمثّل النوعين اللذين يُشكّلان معاً `Network Transparency`؟
أ) Failure و Mobility
ب) Access و Location
ج) Scaling و Performance
د) Concurrency و Replication
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن المحاضرة تنص صراحة أن Access وLocation Transparency معاً يُشكّلان Network Transparency وهما الأهم. باقي الأزواج غير مذكورة بهذا الشكل في النص.

---

### السؤال 13 (hard) — تحليل سيناريو
في نظام موزّع، تصل عمليتان في نفس اللحظة تقريباً لتعديل نفس الملف المشترك. أي مشكلة أساسية من مشاكل الأنظمة الموزّعة يمثّلها هذا الموقف مباشرة؟
أ) No Global Clock
ب) Concurrency
ج) Independent Failures
د) Openness
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن هذا بالضبط المثال المذكور في المحاضرة حول مشكلة Concurrency (حاسوبان يريدان الوصول لمورد بنفس الوقت). (أ) تخص عدم وجود ساعة موحدة لا التزامن على مورد. (ج) تخص فشل الأجزاء لا تزامن الوصول. (د) ليست من المشاكل الثلاث الأساسية أصلاً، بل تحدي تصميم.

---

### السؤال 14 (medium) — تطبيق مفاهيمي
لماذا لا يمكن أن توجد "ساعة عامة" (Global Clock) دقيقة تماماً في نظام موزّع، حسب المحاضرة؟
أ) لأن أجهزة الحاسوب لا تحتوي على ساعات داخلية أصلاً
ب) لأن هناك حدوداً لدقة مزامنة الساعات بين المكونات عبر الشبكة
ج) لأن كل نظام تشغيل يستخدم توقيتاً مختلفاً عمداً
د) لأن الساعة العامة غير ضرورية أصلاً في أي نظام
**الإجابة الصحيحة: ب**
**التعليل:** (ب) تطابق نص المحاضرة حرفياً حول محدودية دقة مزامنة الساعات. (أ) خاطئة فكل جهاز له ساعة داخلية. (ج) لا أساس له في النص. (د) خاطئة لأن المحاضرة توضح أن التنسيق الدقيق يعتمد أحياناً على فكرة مشتركة للوقت رغم صعوبة تحقيقها بدقة مطلقة.

---

### السؤال 15 (hard) — تحليل سيناريو
نظام يوزّع طلبات المستخدمين تلقائياً على الخادم الأقل ازدحاماً في تلك اللحظة، ويعيد توزيع الحمل عند تغيّر الظروف. أي نوع شفافية يصف هذا السلوك بدقة أكبر؟
أ) Performance Transparency
ب) Failure Transparency
ج) Location Transparency
د) Access Transparency
**الإجابة الصحيحة: أ**
**التعليل:** (أ) صحيحة لأن Performance Transparency تُعرَّف حرفياً بأنها السماح بإعادة ضبط النظام لتحسين الأداء مع تغيّر الحمل (loads). (ب) تخص الأعطال لا توزيع الحمل. (ج) تخص عدم معرفة الموقع، وهذا السيناريو يتعلق بالأداء والحمل تحديداً. (د) تخص توحيد طريقة الاستدعاء لا إعادة التوزيع.

---

### السؤال 16 (medium) — مقارنة
ما العلاقة الصحيحة بين `Service` و`Server` و`Client` كما وردت في المحاضرة؟
أ) Service هو برنامج، وServer هو جزء من النظام، وClient هو نفس الـ Server
ب) Service جزء من النظام يدير موارد ويعرضها عبر عمليات، وServer برنامج ينفّذ هذه الخدمة لصالح Client الذي يرسل الطلب
ج) لا فرق بين المصطلحات الثلاثة، وتُستخدم بالتبادل
د) Client هو الذي يدير الموارد، وServer فقط يطلبها
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هي الوصف الدقيق المطابق للنص: Service = الوظيفة المُدارة، Server = البرنامج المنفّذ، Client = الطالب. (أ) خلط غير صحيح للأدوار. (ج) خاطئة لوجود تعريفات منفصلة ودقيقة لكل مصطلح. (د) عكس الأدوار الصحيحة تماماً.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): صنّف المفهوم — fill_gaps

**السيناريو / المطلوب:**
أكمل الفراغات التالية بالمصطلح الإنجليزي الصحيح من المحاضرة:
1. عندما تُخفى النسخ المتعددة لمورد ما عن المستخدم، يُسمى ذلك ______.
2. الحل الذي يُخفي اختلاف أنظمة التشغيل والعتاد بين المكونات يُسمى ______.
3. تقنية تعتمد على التحقق من سلامة البيانات المستلمة لكشف الفساد تُسمى ______.

**المطلوب:**
1. املأ كل فراغ بالمصطلح الصحيح.

**نموذج الحل:**
1. `Replication Transparency`
2. `Middleware`
3. `Checksums`

---

### تمرين 2 (تمرين إضافي): سيناريو تطبيقي — scenario

**السيناريو / المطلوب:**
شركة ناشئة تبني تطبيق دردشة يعمل على آلاف الأجهزة المختلفة (أندرويد، iOS، ويب) وتتوقع نمواً سريعاً جداً في عدد المستخدمين خلال أشهر قليلة.

**المطلوب:**
1. حدّد تحديين تصميميين رئيسيين (من السبعة المذكورة) الأكثر أهمية لهذه الشركة تحديداً، ووضّح السبب.
2. اقترح حلاً عملياً واحداً لكل تحدٍ اخترته، بالاستناد لما ورد في المحاضرة.

**نموذج الحل:**
1. **Heterogeneity**: لأن التطبيق يعمل على أنظمة تشغيل ومنصات مختلفة تماماً (أندرويد/iOS/ويب) ويجب أن تتفاعل جميعها مع نفس الخوادم بسلاسة.
   **Scalability**: لأن النمو المتوقع في عدد المستخدمين يتطلب أن يعمل النظام بكفاءة مع الزيادة، وأن يتحسّن الأداء بإضافة موارد جديدة.
2. لـ Heterogeneity: استخدام `middleware` أو بروتوكولات موحّدة (مثل REST API عبر HTTP) لإخفاء اختلاف المنصات عن طبقة الخادم.
   لـ Scalability: استخدام تقنيات `caching` و`replication` لتوزيع الحمل بدل الاعتماد على خادم مركزي واحد.

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تصميم خدمة توزيع ملفات

**السيناريو:**
مؤسسة تعليمية تريد بناء خدمة لمشاركة ملفات المحاضرات بين الطلاب والأساتذة، بحيث يمكن الوصول للملفات من أي جهاز (حاسوب، موبايل) دون معرفة أي خادم فعلياً يخزّن الملف، مع ضمان استمرار الخدمة حتى لو تعطّل أحد الخوادم.

**المطلوب:**
1. اذكر نوعي الشفافية الأساسيين المطلوب تحقيقهما في هذا التصميم ووضّح كل منهما.
2. اقترح تقنية واحدة من تقنيات معالجة الأعطال الخمس المناسبة لضمان استمرارية الخدمة.

**نموذج الحل:**
| نوع الشفافية | كيف يتحقق هنا |
| --- | --- |
| `Location Transparency` | الطالب يطلب الملف باسمه دون معرفة أي خادم فعلي يخزّنه |
| `Failure Transparency` | استمرار الوصول للملف رغم تعطّل خادم واحد يخزّن نسخة منه |

التقنية المقترحة: **`Redundancy`** — الاحتفاظ بنسخ متعددة (`replicas`) من كل ملف على أكثر من خادم، بحيث إذا تعطّل خادم واحد، يستمر الوصول عبر خادم آخر يحتوي نسخة مطابقة.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تتبع تفاعل Remote Invocation عند فقدان رسالة

**المدخل:**
```text
Client يرسل طلب حجز تذكرة إلى Server.
الرسالة تضيع في الشبكة أثناء الذهاب (لم تصل إلى Server إطلاقاً).
Client ينتظر رداً لمدة محددة (timeout) ثم يعيد إرسال نفس الطلب.
في المحاولة الثانية، تصل الرسالة وينفّذ Server الحجز ويرسل رد نجاح.
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Client يرسل الطلب الأول | ؟ |
| 2 | انتهاء مهلة الانتظار (timeout) دون رد | ؟ |
| 3 | Client يعيد إرسال الطلب | ؟ |
| 4 | Server يستقبل وينفّذ الحجز | ؟ |
| 5 | Server يرسل رد النجاح | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Client يرسل الطلب الأول | الرسالة أُرسلت لكنها ضاعت في الشبكة قبل الوصول إلى Server |
| 2 | انتهاء مهلة الانتظار (timeout) دون رد | Client لا يعرف سبب غياب الرد (ضياع الطلب، أم ضياع الرد، أم بطء الشبكة) — مشكلة Independent Failures |
| 3 | Client يعيد إرسال الطلب | محاولة إعادة إرسال (retransmission) كتقنية إخفاء فشل (masking) |
| 4 | Server يستقبل وينفّذ الحجز | تنفيذ ناجح للعملية على المورد (تذكرة الحجز) |
| 5 | Server يرسل رد النجاح | Client يستقبل التأكيد وتنتهي عملية الـ Remote Invocation بنجاح |

**النتيجة:** تم حجز التذكرة بنجاح رغم فقدان الرسالة الأولى، بفضل آلية إعادة الإرسال (retransmission) التي أخفت أثر الفشل الجزئي عن المستخدم النهائي.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الدافع الأساسي وراء بناء أي نظام موزّع مهما اختلف تعريفه؟
A: مشاركة الموارد (`resource sharing`).

**Q2:** ما هي الوسيلة الوحيدة للتواصل والتنسيق بين مكونات النظام الموزّع حسب التعريف المعتمد؟
A: تبادل الرسائل (`message passing`) فقط.

**Q3:** اذكر المشاكل الثلاث الأساسية الناتجة عن تعريف الأنظمة الموزّعة.
A: `Concurrency`، `No Global Clock`، `Independent Failures`.

**Q4:** ما الفرق بين `Computer Network` و`Distributed System`؟
A: في الشبكة الحاسوبية تكون الأجهزة ظاهرة صراحة، وفي النظام الموزّع يكون وجودها المتعدد مخفياً (شفافاً).

**Q5:** عرّف مصطلح `Service`.
A: جزء من النظام يدير مجموعة موارد مترابطة ويعرض وظائفها عبر عمليات محددة.

**Q6:** ما الفرق بين `Server` و`Client`؟
A: `Server` برنامج ينفّذ الخدمة ويستقبل الطلبات، و`Client` برنامج يرسل الطلب لطلب الخدمة.

**Q7:** ما هي المكونات الثلاثة للأمان في المعلومات؟
A: `Confidentiality`، `Integrity`، `Availability`.

**Q8:** اذكر مثالين على تحقيق `Scalability` كما وردا في المحاضرة.
A: `Caching` و`Replication` في الويب.

**Q9:** اذكر تقنيتين من تقنيات معالجة الأعطال الخمس.
A: أي اثنتين من: `Checksums`، `Retransmission`، `Exception Handling`، `Rollback`، `Redundancy`.

**Q10:** ما هما النوعان اللذان يُشكّلان معاً `Network Transparency`؟
A: `Access Transparency` و`Location Transparency`.

**Q11:** عرّف `Replication Transparency`.
A: تمكين استخدام نسخ متعددة من مورد لزيادة الموثوقية والأداء دون علم المستخدم بوجود هذه النسخ.

**Q12:** اذكر ثلاثة أمثلة على شبكات الحواسيب وردت في المحاضرة.
A: أي ثلاثة من: `Mobile networks`، `Corporate networks`، `Factory networks`، `Campus networks`، `Home networks`، `In-car networks`، شبكات الطائرات والقطارات.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: عرّف النظام الموزّع حسب التعريف المعتمد في هذا المقرر، ووضّح أهميته.
**نموذج الإجابة:** 1. **التعريف:** نظام مكوّناته (عتاد أو برمجية) موجودة على أجهزة متصلة بشبكة، تتواصل وتتنسّق فقط عبر تبادل الرسائل. 2. **المكونات:** أجهزة متعددة + شبكة + قناة تواصل عبر الرسائل فقط. 3. **مثال:** الإنترنت، حيث تتواصل ملايين الأجهزة عبر بروتوكولات الرسائل. 4. **متى نستخدمه:** عند الحاجة لمشاركة موارد بين أجهزة متعددة مستقلة فيزيائياً.

### سؤال 2: اشرح المشاكل الثلاث الأساسية الناتجة عن تعريف الأنظمة الموزّعة، مع مثال لكل واحدة.
**نموذج الإجابة:** 1. **التعريف:** Concurrency (تزامن الوصول للموارد)، No Global Clock (غياب ساعة موحدة)، Independent Failures (أعطال مستقلة). 2. **المكونات/الشروط:** تنتج جميعها من كون الأجهزة مستقلة فيزيائياً وتتواصل عبر شبكة متغيّرة التأخير. 3. **مثال:** حجزان متزامنان لنفس المقعد (concurrency)، عدم اتفاق ساعتين تماماً (no global clock)، عدم معرفة سبب غياب رد (independent failure). 4. **متى نستخدمه:** عند تحليل أي تصميم لنظام موزّع يجب فحص معالجته لهذه المشاكل الثلاث.

### سؤال 3: ما هي تحديات التصميم السبعة للأنظمة الموزّعة؟ اذكرها واشرح واحداً منها بالتفصيل.
**نموذج الإجابة:** 1. **التعريف:** Heterogeneity، Openness، Security، Scalability، Failure Handling، Concurrency، Transparency. 2. **المكونات:** كل تحدٍ يعالج جانباً مختلفاً من تعقيد التوزيع. 3. **مثال تفصيلي (Openness):** القدرة على إضافة أو استبدال مكونات عبر واجهات موثّقة منشورة، مثل إضافة خدمة دفع جديدة دون إعادة بناء النظام. 4. **متى نستخدمه:** عند تقييم مدى نضج تصميم نظام موزّع معيّن.

### سؤال 4: اشرح مفهوم الشفافية (Transparency) وأنواعها الثمانية.
**نموذج الإجابة:** 1. **التعريف:** إخفاء انفصال مكونات النظام الموزّع عن المستخدم والمبرمج. 2. **الأنواع الثمانية:** Access، Location، Concurrency، Replication، Failure، Mobility، Performance، Scaling. 3. **مثال:** استخدام تطبيق سحابي دون معرفة أي خادم ينفّذ الطلب فعلياً (Location + Access). 4. **متى نستخدمه:** في كل قرار تصميمي يهدف لتبسيط تجربة الاستخدام رغم تعقيد البنية الداخلية.

### سؤال 5: قارن بين `Access Transparency` و`Location Transparency`.
**نموذج الإجابة:** 1. **التعريف:** Access = استخدام نفس العمليات للموارد المحلية والبعيدة؛ Location = الوصول دون معرفة الموقع الفعلي للمورد. 2. **المكونات:** كلاهما يُشكّلان معاً Network Transparency. 3. **مثال:** فتح ملف بنفس الأمر سواء كان محلياً أو بعيداً (Access)؛ عدم معرفة أي مدينة يقع بها الخادم (Location). 4. **متى نستخدمه:** عند تصميم واجهات برمجية موحّدة للوصول للموارد.

### سؤال 6: اشرح تقنيات معالجة الأعطال الخمس مع التمييز بين Masking وTolerating.
**نموذج الإجابة:** 1. **التعريف:** خمس تقنيات: Detecting (Checksums)، Masking (Retransmission)، Tolerating (Exception Handling)، Recovery (Rollback)، Redundancy. 2. **الفرق:** Masking يُخفي العطل كلياً، Tolerating يسمح بالاستمرار رغم ظهور أثره. 3. **مثال:** إعادة إرسال رسالة تالفة (Masking) مقابل معالجة استثناء برمجياً وإخبار المستخدم بخطأ مؤقت (Tolerating). 4. **متى نستخدمه:** عند تصميم آلية تعافي من الأعطال الجزئية في نظام موزّع.

### سؤال 7: ما هو المورد (Resource) في سياق الأنظمة الموزّعة، وما خصائصه الثلاث؟
**نموذج الإجابة:** 1. **التعريف:** أي شيء قابل للمشاركة (عتاد، برمجية قيد التشغيل، بيانات). 2. **الخصائص الثلاث:** محصور داخل حاسوب (encapsulated)، يُصل إليه فقط عبر تواصل، تُدار عبر واجهة اتصال. 3. **مثال:** طابعة مشتركة تُدار عبر برنامج تحكم بالطابعة يوفر واجهة طباعة. 4. **متى نستخدمه:** عند تصميم أي خدمة تحتاج مشاركة موارد بين عدة مستخدمين.

### سؤال 8: اشرح العلاقة بين Client وServer وRemote Invocation مع رسم تسلسل الخطوات.
**نموذج الإجابة:** 1. **التعريف:** Client يرسل طلباً، Server ينفّذه ويرد، والتفاعل الكامل يُسمى Remote Invocation. 2. **الخطوات:** إرسال طلب → استقبال ومعالجة → إرسال رد → استقبال النتيجة. 3. **مثال:** طلب توصيل طعام كما شُرح في القسم 4.2. 4. **متى نستخدمه:** كأساس لفهم بروتوكولات لاحقة مثل RPC وRMI.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المفاهيم
| المفهوم | يرتبط مع | كيف؟ |
| --- | --- | --- |
| التعريف الرسمي (message passing) | المشاكل الثلاث | التعريف نفسه هو سبب ظهور Concurrency وNo Global Clock وIndependent Failures |
| المشاكل الثلاث | تحديات التصميم السبعة | كل تحدٍ تصميمي هو حل هندسي لأحد جوانب هذه المشاكل |
| تحديات التصميم | الشفافية | الشفافية هي الهدف النهائي الذي تسعى إليه معظم الحلول (middleware، caching، replication) |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| التعريف | تواصل عبر الرسائل فقط + مشاركة الموارد هي الدافع |
| المشاكل | Concurrency، No Global Clock، Independent Failures |
| التحديات | Heterogeneity، Openness، Security، Scalability، Failure Handling، Concurrency، Transparency |
| الشفافية | Access + Location = Network Transparency (الأهم) |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `RPC/RMI` (مذكورة ضمنياً) | نمط استدعاء عن بعد مبني على Remote Invocation | القسم 4.2 |
| `CORBA`, `Java RMI` | أمثلة middleware لإخفاء التغايرية | القسم 5.1 |
| `Checksum` | كشف تلف البيانات | القسم 5.5 |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لا تخلط بين "شبكة حواسيب" و"نظام موزّع" — الفيصل هو الشفافية |
| 2 | Access + Location Transparency = Network Transparency |
| 3 | Masking يُخفي العطل تماماً، Tolerating يسمح بالاستمرار رغم أثره |
| 4 | مشاركة الموارد هي الدافع الجذري وراء كل نظام موزّع |

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع ذكر التعريف الدقيق للنظام الموزّع كلمة بكلمة تقريباً
- [ ] أستطيع التمييز بين Computer Network وDistributed System بمثال
- [ ] أستطيع شرح المشاكل الثلاث (Concurrency، No Global Clock، Independent Failures) بمثال لكل واحدة
- [ ] أستطيع تعداد تحديات التصميم السبعة دون نسيان أي منها
- [ ] أستطيع شرح الفرق بين Masking وTolerating للأعطال
- [ ] أستطيع تعداد الأنواع الثمانية للشفافية وتعريف كل منها
- [ ] أعرف أن Access + Location = Network Transparency
- [ ] أستطيع شرح تسلسل خطوات Remote Invocation
- [ ] أستطيع التفريق بين Service وServer وClient
- [ ] أستطيع إعطاء مثال واقعي لكل من Cluster وCloud Computing وMobile Computing

---

<!--
VALIDATION:
- تم تغطية كل معلومة واردة في المحاضرة الأصلية (17 شريحة) دون حذف أي نقطة.
- المحاضرة مفاهيمية بالكامل ولا تحتوي على pseudocode أو خوارزميات رقمية قابلة للتتبع (لا يوجد Lamport Algorithm أو Leader Election أو أكواد)، لذلك:
  * تم تعديل توزيع أسئلة MCQ إلى: مقارنات 30% (5) | تطبيق مفاهيمي 40% (6) | تحليل سيناريو 30% (5) بدلاً من "تتبع خوارزميات 45%" الحرفي في القالب الأصلي.
  * قسم "أنماط الأكواد والبنى المتكررة" تُرك بعلامة "(غير مشروحة في المحاضرة)" لعدم وجود أكواد صريحة.
  * لم تُدرج تمارين "اكتشف الخطأ" (find_the_bug) بأنواعها (code_fix, race_condition, off_by_one) لأنها تتطلب كوداً أو خوارزمية دقيقة غير موجودة في هذه المحاضرة تحديداً؛ يُنصح بتضمينها في محاضرة لاحقة تحتوي خوارزميات فعلية (مثل Lamport Timestamps أو Vector Clocks).
  * عدد أسئلة MCQ = 16 (مطابق للمطلوب)، عدد بطاقات Q&A = 12 (الحد الأدنى)، عدد الأسئلة النظرية = 8 (الحد الأدنى)، تمرين تتبع واحد فقط (أقل من الحد الأدنى ≥3 المطلوب في القالب) لأن المحتوى النظري البحت لا يوفر إلا سيناريو تتبع منطقي واحد مناسب دون افتعال محتوى غير موجود في المحاضرة.
- لم يُستخدم SCHEMA.md v1.0 لأنه لم يُرفق ضمن الملفات المُرسلة؛ تم الاعتماد حصراً على القوالب والتعليمات الصريحة الواردة في dist-systems.md.
-->

# المحاضرة 2 — System Model (نموذج النظام)

> **المادة:** الأنظمة الموزعة — نظري
> **الموضوع:** معماريات الأنظمة الموزعة (Architectural Models) والنماذج الأساسية (Fundamental Models)

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مقدمة (Introduction)

#### 1.1. النموذج المعماري للنظام الموزع

#### النص الأصلي يقول:
> An architectural model of a distributed system is concerned with the placement of its parts and the relationships between them. Examples include: Client-Server model, Peer-to-Peer model.

#### الشرح المبسّط:
النموذج المعماري (`Architectural Model`) يهتم بسؤالين أساسيين: **أين توضع أجزاء النظام؟** و **كيف تترابط هذه الأجزاء مع بعضها؟**. أشهر مثالين على هذه النماذج هما نموذج `Client-Server` (عميل-خادم) ونموذج `Peer-to-Peer` (ند لند).

> 💡 **التشبيه:** تخيل مطعماً — النموذج المعماري يحدد أين يجلس الزبون (`Client`)، وأين يقف الطباخ (`Server`)، وكيف تُنقل الطلبات بينهما.

---

#### 1.2. متغيرات نموذج Client-Server

#### النص الأصلي يقول:
> Variations of client-server model can be formed by: The partition of data or replication at cooperative servers; The caching of data by proxy servers and clients; The use of mobile code and mobile agents.

#### الشرح المبسّط:
نموذج `Client-Server` الأساسي له عدة تعديلات (متغيرات) شائعة:
- **تقسيم البيانات (`Partition`) أو تكرارها (`Replication`)** بين خوادم متعاونة.
- **التخزين المؤقت (`Caching`)** بواسطة خوادم `Proxy` أو العملاء أنفسهم.
- **استخدام الكود المتنقل (`Mobile Code`)** والوكلاء المتنقلين (`Mobile Agents`).

---

#### 1.3. النماذج الأساسية (Fundamental Models)

#### النص الأصلي يقول:
> Fundamental Models deal with a more formal description of the properties that are common in all of the architectural models. Some of these properties are: There is no global time in a distributed system. All communication between processes is achieved by means of messages.

#### الشرح المبسّط:
بينما تصف النماذج المعمارية "الشكل الخارجي" للنظام، تصف `Fundamental Models` الخصائص **المشتركة** بين كل هذه النماذج بشكل رسمي (formal). من أهم هذه الخصائص:
- **لا يوجد وقت عام (Global Time)** تتفق عليه كل الأجهزة.
- **كل تواصل بين العمليات (Processes) يتم عبر رسائل (Messages)** فقط، ولا توجد وسيلة أخرى للتواصل.

> ⚖️ **المقايضة:** التخلي عن فكرة "الوقت العالمي" يجعل النظام أكثر واقعية (لأنه فعلاً غير موجود في الشبكات الحقيقية)، لكنه يعقّد كل شيء يعتمد على الترتيب الزمني للأحداث.

---

#### 1.4. خصائص التواصل بالرسائل ونماذج معالجتها

#### النص الأصلي يقول:
> Message communication in distributed systems has the following properties: Delay, Failure, Security attacks. Message communication issues are addressed by three models: Interaction Model, Failure Model, Security Model.

#### الشرح المبسّط:
تواصل الرسائل بين العمليات يتأثر بثلاث مشاكل رئيسية، ولكل مشكلة نموذج يعالجها:

| المشكلة | النموذج المعالج | ماذا يفعل؟ |
|---|---|---|
| `Delay` (التأخير) | `Interaction Model` | يتعامل مع الأداء وصعوبة وضع حدود زمنية |
| `Failure` (الفشل) | `Failure Model` | يحدد بدقة أنواع الأعطال الممكنة في العمليات والقنوات |
| `Security attacks` (الهجمات الأمنية) | `Security Model` | يناقش التهديدات المحتملة ويضع أساساً لتحليلها ومقاومتها |

> 📌 **مهم للامتحان:** احفظ الربط بين كل مشكلة (Delay/Failure/Security) والنموذج المخصص لها — سؤال شائع في الامتحانات.

---

### 2. المعماريات (Architectural Models)

#### 2.1. مقدمة المعماريات

#### النص الأصلي يقول:
> The architecture of a system is its structure in terms of separately specified components and their interrelationships. The overall goal is to ensure that the structure will meet present and likely future demands on it. Major concerns are to make the system: Reliable, Manageable, Adaptable, Cost-effective.

#### الشرح المبسّط:
معمارية النظام هي هيكله المكوَّن من **مكوّنات محددة بشكل منفصل** وعلاقاتها ببعضها. الهدف من تصميم هذه المعمارية هو ضمان أن الهيكل يلبي الاحتياجات الحالية والمستقبلية. أربعة اهتمامات رئيسية عند بناء المعمارية:
1. **Reliable** — موثوق (يعمل بشكل صحيح باستمرار)
2. **Manageable** — قابل للإدارة
3. **Adaptable** — قابل للتكيّف مع التغييرات
4. **Cost-effective** — فعّال من حيث التكلفة

---

#### 2.2. مفهوم Process و Object في المعماريات

#### النص الأصلي يقول:
> We build our architectural models around the concept of process and object. An initial simplification is achieved by classifying processes as: Server processes, Client processes, Peer processes.

#### الشرح المبسّط:
تُبنى النماذج المعمارية حول مفهومي `Process` (عملية) و `Object` (كائن). أول تبسيط يتم هو تصنيف العمليات إلى ثلاثة أنواع:
- `Server processes` — عمليات الخادم
- `Client processes` — عمليات العميل
- `Peer processes` — عمليات الند (متساوية الدور)

---

### 3. معماريات النظام (System Architectures)

#### 3.1. أهمية توزيع المسؤوليات

#### النص الأصلي يقول:
> The most evident aspect of distributed system design is the division of responsibilities between system components and the placement of the components on computers in the network. It has major implication for: Performance, Reliability, Security.

#### الشرح المبسّط:
أهم جانب في تصميم نظام موزع هو **كيف تُقسَّم المسؤوليات** بين مكونات النظام (تطبيقات، خوادم، عمليات أخرى)، **وأين توضع** هذه المكونات على أجهزة الشبكة. هذا القرار يؤثر مباشرة على:
- الأداء (`Performance`)
- الموثوقية (`Reliability`)
- الأمان (`Security`)

---

#### 3.2. نموذج Client-Server

#### النص الأصلي يقول:
> Client process interact with individual server processes in a separate host computers in order to access the shared resources that they manage. Servers may in turn be clients of other servers. E.g. a search engine can be both a server and a client: it responds to queries from browser clients and it runs web crawlers that act as clients of other web servers.

#### الشرح المبسّط:
في `Client-Server`، تتفاعل عملية العميل مع عملية خادم مستقلة (على جهاز مضيف منفصل) للوصول إلى موارد مشتركة يديرها الخادم. **نقطة مهمة:** الخادم نفسه قد يكون عميلاً لخادم آخر!

> 💡 **مثال:** محرك بحث يستقبل استعلامات من متصفحات (فهو خادم لها)، وفي نفس الوقت يشغّل `Web Crawlers` تتصرف كعميل لخوادم ويب أخرى (فهو عميل لها).

**الشكل 1** يوضح التفاعل العام بين عميل وخادم:
- العميل يرسل `Request` وينتظر (`Wait for result`)
- الخادم يستقبل الطلب ويقدّم الخدمة (`Provide service`)
- الخادم يرسل `Reply` ثم يعود العميل للعمل

**الشكل 2** يوضح مثال محرك بحث بثلاث طبقات (`Application Layering`):
- **User-interface level** — واجهة المستخدم
- **Processing level** — يشمل `Query generator`، `Ranking algorithm`، `HTML generator`
- **Data level** — قاعدة البيانات بصفحات الويب

**الشكل 3** يوضح تطبيقات الويب ثلاثية الطبقات (`Three-tier Web Applications`):
- الخادم نفسه يستخدم معمارية `client-server` من الداخل!
- 3 طبقات: `HTTP`، `J2EE`، وقاعدة البيانات (`Database`)
- شائعة جداً في تطبيقات الويب

> ⚖️ **المقايضة:** التقسيم لثلاث طبقات (Presentation, Application, Data) يزيد المرونة وقابلية الصيانة، لكنه يضيف تأخيراً (latency) إضافياً بسبب القفزات المتعددة بين الطبقات.

---

#### 3.3. نموذج Peer-to-Peer

#### النص الأصلي يقول:
> All of the processes play similar roles, interacting cooperatively as peers to perform a distributed activities or computations without any distinction between clients and servers or the computers that they run on. E.g., BitTorrent file-sharing system.

#### الشرح المبسّط:
في `Peer-to-Peer` (P2P)، **كل العمليات لها نفس الدور تقريباً** — لا يوجد تمييز بين "عميل" و"خادم". كل العمليات (`Peers`) تتعاون لتنفيذ مهمة موزعة أو حسابات مشتركة.

> 💡 **مثال:** نظام `BitTorrent` لمشاركة الملفات — كل مستخدم يحمّل ويرفع أجزاء من الملف في نفس الوقت، فلا يوجد خادم مركزي واحد.

**الشكل 4** يوضح تطبيقاً موزعاً بمعمارية P2P: عدة `Peers` (1 حتى N)، كل واحد يحتوي على تطبيق (`Application`) و كائنات قابلة للمشاركة (`Sharable objects`)، وكل Peer متصل مباشرة بالـ Peers الأخرى.

**الشكل 5** يوضح معمارية `Super Peers`:
- `Regular peer` — الند العادي
- `Superpeer` — ند خاص له دور أكبر (يشبه خادماً صغيراً ضمن شبكة الأنداد)
- `Superpeer network` — شبكة الأنداد الفائقة التي تربط مجموعات الأنداد العادية ببعضها

> ⚖️ **المقايضة:** `Superpeer` تجمع بين مزايا اللامركزية (P2P) والتنظيم المركزي (Client-Server) — لكنها تُدخل نقطة اعتماد جزئية على الـ Superpeer، فإذا تعطّل قد تتأثر مجموعته.

---

### 4. متغيرات نموذج Client-Server (Variants of Client-Server Model)

#### 4.1. المشكلة الأساسية والحل

#### النص الأصلي يقول:
> The problem of client-server model is placing a service in a server at a single address that does not scale well beyond the capacity of computer host and bandwidth of network connections. To address this problem, several variations of client-server model have been proposed.

#### الشرح المبسّط:
المشكلة في `Client-Server` التقليدي: وضع الخدمة على **عنوان واحد فقط لخادم واحد** لا يتوسّع (`scale`) جيداً إذا تجاوز الطلب سعة ذلك الجهاز أو عرض النطاق الترددي للشبكة. لهذا اقتُرحت عدة متغيرات لحل هذه المشكلة.

---

#### 4.2. خدمات تقدَّم بواسطة خوادم متعددة (Services provided by multiple servers)

#### النص الأصلي يقول:
> Services may be implemented as several server processes in separate host computers interacting as necessary to provide a service to client processes. The servers may partition the set of objects on which the service is based and distribute those objects between themselves, or they may maintain replicated copies of them on several hosts.

#### الشرح المبسّط:
بدلاً من خادم واحد، يمكن تنفيذ الخدمة كعدة عمليات خادم على أجهزة منفصلة، تتفاعل مع بعضها حسب الحاجة. للتعامل مع البيانات، للخوادم طريقتان:
- **Partition** — تقسيم الكائنات (Objects) وتوزيعها بين الخوادم (كل خادم يحمل جزءاً مختلفاً)
- **Replication** — الاحتفاظ بنسخ مكررة من نفس البيانات على عدة أجهزة

> 💡 **مثال:** الـ `Cluster` المستخدم في محركات البحث.

**الشكل 6** يوضح خدمة تقدَّم بواسطة خوادم متعددة: عدة `Server` داخل مربع `Service` واحد، تتواصل مع بعضها، وكل `Client` يتصل بأحد الخوادم.

---

#### 4.3. خوادم Proxy والتخزين المؤقت (Proxy Servers and Caches)

#### النص الأصلي يقول:
> A cache is a store of recently used data objects. When a new object is received at a computer it is added to the cache store, replacing some existing objects if necessary. When an object is needed by a client process the caching service first checks the cache and supplies the object from there if an up-to-date copy is available. If not, an up-to-data copy is fetched.

#### الشرح المبسّط:
`Cache` هو مخزن للبيانات المستخدَمة مؤخراً. الآلية:
1. عند استلام كائن جديد → يُضاف إلى الـ `Cache` (وقد يستبدل كائناً قديماً إذا لزم الأمر).
2. عندما يطلب العميل كائناً → تُفحص الـ `Cache` أولاً.
   - إذا وُجدت نسخة محدَّثة (`up-to-date`) → تُعطى مباشرة (أسرع!).
   - إذا لم توجد → تُجلب نسخة محدَّثة من المصدر.

> 🔍 **التتبع:** طلب كائن ← فحص Cache ← [موجود ومحدَّث؟ نعم → إرجاعه] ← [لا → جلبه من الخادم الأصلي ثم تخزينه في Cache].

#### النص الأصلي يقول:
> Caches may be co-located with each client or they may be located in a proxy server that can be shared by several clients.

#### الشرح المبسّط:
الـ `Cache` يمكن أن توضع في مكانين:
- **مع كل عميل مباشرة** (Cache محلية خاصة بكل جهاز)
- **في خادم Proxy مشترك** بين عدة عملاء (Cache مركزية تخدم مجموعة)

**الشكل 7** يوضح خادم `Proxy` للويب: عدة `Client` يتصلون بـ `Proxy server` واحد، والذي بدوره يتصل بعدة `Web server`، فيخزّن النتائج مؤقتاً لتسريع الطلبات المتكررة.

> ⚖️ **المقايضة:** الـ Cache المحلية أسرع استجابة لكل عميل لكنها تستهلك موارد كل جهاز على حدة، بينما الـ Proxy المشترك يوفر مساحة التخزين ويستفيد أكثر عملاء لكنه نقطة اختناق محتملة إذا تعطّل.

---

#### 4.4. الكود المتنقل (Mobile Code)

#### النص الأصلي يقول:
> Mobile code: the code that can be sent from one computer to another and run at the destination. Mobile codes such are a potential security threat to the local resources in the destination computer.

#### الشرح المبسّط:
`Mobile Code` هو كود يمكن إرساله من جهاز إلى آخر وتشغيله في الجهاز الوجهة مباشرة. **تحذير أمني:** هذا الكود يمثّل تهديداً محتملاً على موارد الجهاز الوجهة (لأنه كود غريب يعمل محلياً!).

**الشكل 8** يوضح مثال `Web Applets`:
- **(a)** طلب العميل يؤدي إلى تحميل كود الـ `Applet` من خادم الويب.
- **(b)** بعد التحميل، يتفاعل العميل مع الـ `Applet` محلياً مباشرة (بدون الحاجة للرجوع للخادم في كل مرة).

> 📌 **نقطة مهمة:** بعد تحميل الـ Applet، التفاعل يصبح محلياً بين Client و Applet — وهذا يقلل الحمل على الشبكة لكنه يفتح باباً أمنياً إذا كان الكود ضاراً.

---

#### 4.5. الوكلاء المتنقلون (Mobile Agents)

#### النص الأصلي يقول:
> A running program (code and data) that travels from one computer to another in a network carrying out a task, usually on behalf of some other process. Examples of the tasks that can be done by mobile agents are: collecting information, To install and maintain software on the computers within an organization.

#### الشرح المبسّط:
`Mobile Agent` هو برنامج قيد التشغيل (كود + بيانات معاً) ينتقل من جهاز لآخر عبر الشبكة لتنفيذ مهمة، عادة نيابة عن عملية أخرى.

> 💡 **أمثلة على المهام:** جمع المعلومات، تثبيت وصيانة البرامج على أجهزة المؤسسة.

#### النص الأصلي يقول:
> Mobile agents are a potential security threat to the resources in computers that they visit. Mobile agents themselves can be vulnerable — They may not be able to complete their task if they are refused access to the information they need.

#### الشرح المبسّط:
التهديد الأمني هنا **باتجاهين**:
1. الوكيل قد يهدد الأجهزة التي يزورها (نفس فكرة Mobile Code).
2. الوكيل نفسه قد يكون **عرضة للخطر (Vulnerable)** — فقد يُرفَض وصوله إلى معلومات يحتاجها، فيفشل في إتمام مهمته.

> ⚖️ **المقايضة (مقارنة Mobile Code مقابل Mobile Agent):** كلاهما كود متنقل، لكن `Mobile Code` عادة يُستدعى بطلب من العميل (كالـ Applet)، بينما `Mobile Agent` يتحرك بمبادرة ذاتية عبر عدة أجهزة لتنفيذ مهمة كاملة نيابة عن جهة أخرى — لذا فهو معرّض لمخاطر أكبر في الاتجاهين.

---

### 5. النماذج الأساسية (Fundamental Models) — تفصيل

#### 5.1. مقدمة النماذج الأساسية

#### النص الأصلي يقول:
> Fundamental Models are concerned with a more formal description of the properties that are common in all of the architectural models. All architectural models are composed of processes that communicate with each other by sending messages over a computer networks.

#### الشرح المبسّط:
تذكير: كل النماذج المعمارية (Client-Server، P2P، إلخ) تتكوّن أساساً من عمليات تتواصل عبر رسائل على شبكة حاسوبية. النماذج الأساسية الثلاثة هي: `Interaction Model`، `Failure Model`، `Security Model`.

---

#### 5.2. نموذج التفاعل (Interaction Model)

#### النص الأصلي يقول:
> Distributed systems are composed of many interacting processes. Multiple server processes may cooperate with one another to provide a service, E.g. Domain Name Service. A set of peer processes may cooperate with one another to achieve a common goal, E.g. voice conferencing.

#### الشرح المبسّط:
هناك نوعان من التعاون بين العمليات:
- خوادم متعددة تتعاون لتقديم خدمة واحدة → مثال: `Domain Name Service (DNS)`
- أنداد (Peers) يتعاونون لتحقيق هدف مشترك → مثال: `Voice Conferencing` (المؤتمرات الصوتية)

#### النص الأصلي يقول:
> Two significant factors affecting interacting processes in a distributed system are: Communication performance is often a limiting characteristic; It is impossible to maintain a single global notion of time.

#### الشرح المبسّط:
عاملان رئيسيان يؤثران على تفاعل العمليات:
1. **أداء التواصل (Communication performance)** غالباً هو العامل المحدِّد.
2. **استحالة وجود مفهوم "وقت عالمي" واحد** تتفق عليه كل الأجهزة.

---

##### 5.2.1. أداء قنوات التواصل (Performance of Communication Channels)

#### النص الأصلي يقول:
> Latency: The delay between the start of a message's transmission from one process to the beginning of its receipt by another. Bandwidth: The total amount of information that can be transmitted over a computer network in a given time. Jitter: The variation in the time taken to deliver a series of messages.

#### الشرح المبسّط:

| المصطلح | التعريف | ملاحظة |
|---|---|---|
| `Latency` (زمن الوصول) | التأخير بين بدء إرسال الرسالة وبداية استلامها | كلما قلّت، كان الاتصال أسرع |
| `Bandwidth` (عرض النطاق) | إجمالي كمية المعلومات القابلة للنقل في زمن معيّن | القنوات على نفس الشبكة تتشارك عرض النطاق المتاح |
| `Jitter` (التذبذب) | التباين في زمن توصيل سلسلة من الرسائل | مهم جداً في الوسائط المتعددة (Multimedia) |

> 💡 **مثال على Jitter:** إذا وصلت عيّنات صوتية متتالية بفواصل زمنية متفاوتة، سيكون الصوت مشوَّهاً بشكل ملحوظ.

---

##### 5.2.2. ساعات الحاسوب وتوقيت الأحداث (Computer Clocks and Timing Events)

#### النص الأصلي يقول:
> Each computer in a distributed system has its own internal clock. Two processes running on different computers can associate timestamp with their events. Even if two processes read their clock at the same time, their local clocks may supply different time.

#### الشرح المبسّط:
لكل جهاز في النظام الموزع ساعته الداخلية الخاصة. المشكلة: حتى لو قرأت عمليتان على جهازين مختلفين ساعتيهما "في نفس اللحظة"، فقد تُظهر الساعتان **وقتاً مختلفاً**!

#### النص الأصلي يقول:
> This is because computer clock drift from perfect time and their drift rates differ from one another. Clock drift rate refers to the relative amount that a computer clock differs from a perfect reference clock.

#### الشرح المبسّط:
السبب هو **انحراف الساعة (`Clock Drift`)** — كل ساعة تنحرف عن الوقت المثالي بمعدل مختلف عن الساعات الأخرى. `Clock Drift Rate` = مقدار انحراف ساعة الحاسوب نسبياً عن ساعة مرجعية مثالية.

> 📌 **نقطة مهمة:** حتى لو ضبطت كل الساعات على نفس الوقت في البداية، ستتباعد مع الزمن ما لم تُصحَّح باستمرار (مثل استخدام بروتوكول NTP في الواقع).

---

##### 5.2.3. متغيّرا نموذج التفاعل (Synchronous vs Asynchronous)

#### النص الأصلي يقول:
> Synchronous distributed systems: The time to execute each step of a process has known lower and upper bounds. Each message transmitted over a channel is received within a known bounded time. Each process has a local clock whose drift rate from real time has a known bound.

#### الشرح المبسّط:
`Synchronous Distributed System` — افتراض قوي بوجود حدود زمنية معروفة لكل شيء:
- تنفيذ كل خطوة له حد أدنى وأقصى معروف
- كل رسالة تصل خلال زمن محدود معروف
- كل ساعة لها معدل انحراف محدود ومعروف

#### النص الأصلي يقول:
> Asynchronous distributed system: There is no bound on process execution speeds. There is no bound on message transmission delays. There is no bound on clock drift rates.

#### الشرح المبسّط:
`Asynchronous Distributed System` — لا يوجد أي افتراض زمني:
- الخطوة قد تأخذ وقتاً غير محدود
- الرسالة قد تصل بعد وقت غير محدود (أو لا تصل!)
- انحراف الساعة عشوائي تماماً

> ⚖️ **المقايضة:** `Synchronous` أسهل في التصميم والتحليل (لأن لديك ضمانات زمنية)، لكنه غير واقعي في الشبكات الحقيقية مثل الإنترنت. `Asynchronous` أكثر واقعية لكنه أصعب بكثير في ضمان صحة النظام (كخوارزميات التوافق `Consensus`).

| المعيار | Synchronous | Asynchronous |
|---|---|---|
| زمن تنفيذ الخطوة | محدود ومعروف | غير محدود |
| زمن توصيل الرسالة | محدود ومعروف | غير محدود |
| انحراف الساعة | محدود ومعروف | غير محدود (عشوائي) |
| الواقعية | أقل واقعية | أكثر واقعية (يشبه الإنترنت) |

---

#### 5.3. نموذج الفشل (Failure Model)

#### النص الأصلي يقول:
> In a distributed system both processes and communication channels may fail – That is, they may depart from what is considered to be correct or desirable behavior. Types of failures: Omission Failures, Arbitrary Failures, Timing Failures.

#### الشرح المبسّط:
الفشل (`Failure`) يعني انحراف العملية أو قناة التواصل عن السلوك الصحيح المتوقع. ثلاثة أنواع رئيسية: `Omission`، `Arbitrary`، `Timing`.

---

##### 5.3.1. فشل الإغفال (Omission Failure)

#### النص الأصلي يقول:
> Omission failures refer to cases when a process or communication channel fails to perform actions that it is supposed to do. The chief omission failure of a process is to crash. Another type of omission failure is related to the communication which is called communication omission failure.

#### الشرح المبسّط:
`Omission Failure` = فشل العملية أو القناة في **تنفيذ فعل كان يجب عليها فعله**.
- **العملية:** أسوأ حالة هي الانهيار (`Crash`) — تتوقف العملية ولا تنفذ أي خطوة أخرى.
- **قناة التواصل:** تُسمى `Communication Omission Failure` (الشكل 9).

**الشكل 9** يوضح: `process p` يُرسل الرسالة `m` عبر `Outgoing message buffer` → قناة التواصل (`Communication channel`) → `Incoming message buffer` لدى `process q`، الذي يستقبلها (`receive`).

#### النص الأصلي يقول:
> The communication channel produces an omission failure if it does not transport a message from p's outgoing message buffer to q's incoming message buffer. This is known as "dropping messages" and is generally caused by lack of buffer space at the receiver or at an intervening gateway or by a network transmission error.

#### الشرح المبسّط:
إذا لم تنقل القناة الرسالة من مخزن الإرسال إلى مخزن الاستقبال، يُسمى ذلك **"إسقاط الرسائل" (Dropping Messages)**. أسباب شائعة:
- نقص مساحة المخزن (Buffer) عند المستقبل أو عند بوابة وسيطة
- خطأ في نقل الشبكة (يُكتشف عبر `Checksum`)

---

##### 5.3.2. الفشل العشوائي/التعسفي (Arbitrary Failure)

#### النص الأصلي يقول:
> Arbitrary failure is used to describe the worst possible failure semantics, in which any type of error may occur. E.g. a process may set a wrong values in its data items, or it may return a wrong value in response to an invocation. Communication channel can suffer from arbitrary failures. E.g. message contents may be corrupted or real messages may be delivered more than once.

#### الشرح المبسّط:
`Arbitrary Failure` (يُسمى أيضاً `Byzantine Failure`) هو **أسوأ أنواع الفشل** — يمكن أن يحدث أي خطأ ممكن:
- **في العملية:** قيم خاطئة في البيانات، أو إرجاع نتيجة خاطئة تماماً.
- **في القناة:** محتوى الرسالة يُفسد (`corrupted`)، أو تُسلَّم رسائل حقيقية أكثر من مرة.

---

##### 5.3.3. فشل التوقيت (Timing Failure)

#### النص الأصلي يقول:
> Timing failures are applicable in synchronized distributed systems where time limits are set on process execution time, message delivery time and clock drift rate.

#### الشرح المبسّط:
`Timing Failure` ينطبق فقط على الأنظمة **المتزامنة (Synchronous)** — حيث يوجد حدود زمنية محدَّدة مسبقاً. إذا تجاوزت العملية أو الرسالة أو انحراف الساعة هذه الحدود، يُعتبر ذلك فشلاً في التوقيت.

> ❌ **الفهم الخاطئ:** الاعتقاد بأن `Timing Failure` يحدث في الأنظمة اللامتزامنة أيضاً.
> ✅ **الفهم الصحيح:** `Timing Failure` مرتبط حصراً بالأنظمة المتزامنة لأنها فقط من تضع حدوداً زمنية يمكن تجاوزها.

---

##### 5.3.4. إخفاء الفشل (Masking Failure)

#### النص الأصلي يقول:
> It is possible to construct reliable services from components that exhibit failure. E.g. multiple servers that hold replicas of data can continue to provide a service when one of them crashes. A service masks a failure, either by hiding it altogether or by converting it into a more acceptable type of failure. E.g. checksums are used to mask corrupted messages- effectively converting an arbitrary failure into an omission failure.

#### الشرح المبسّط:
يمكن بناء خدمات موثوقة من مكونات قد تفشل، عبر **إخفاء (Masking)** الفشل بإحدى طريقتين:
1. **إخفاء الفشل بالكامل** — مثل: خوادم متعددة تحمل نسخاً مكررة (Replicas)، فإذا انهار أحدها استمرت الخدمة دون أن يشعر المستخدم.
2. **تحويله لنوع أخف** — مثل: استخدام `Checksum` لاكتشاف الرسائل الفاسدة ورفضها، مما يحوّل `Arbitrary Failure` (محتوى فاسد) إلى `Omission Failure` (رسالة مفقودة/مرفوضة، وهي أسهل للتعامل).

> 🔍 **مثال تتبع Masking:** رسالة تصل بمحتوى تالف (Arbitrary) → يُحسب Checksum ولا يتطابق → تُرفض الرسالة تماماً (تتحول عملياً لحالة "لم تصل" أي Omission) → يُطلب إعادة الإرسال.

---

#### 5.4. نموذج الأمان (Security Model)

#### النص الأصلي يقول:
> The security of a distributed system can be achieved by securing the processes and the channels used in their interactions. Also, by protecting the objects that they encapsulate against unauthorized access.

#### الشرح المبسّط:
أمان النظام الموزع يتحقق عبر:
1. تأمين العمليات وقنوات تفاعلها.
2. حماية الكائنات (Objects) التي تحتويها من الوصول غير المصرَّح به.

---

##### 5.4.1. حماية الكائنات (Protecting Objects)

#### النص الأصلي يقول:
> Access rights specify who is allowed to perform the operations on a object. Who is allowed to read or write its state. Principal is the authority associated with each invocation and each result. A principal may be a user or a process. The invocation comes from a user and the result from a server.

#### الشرح المبسّط:
مفهومان أساسيان:
- **`Access Rights`** — تحدد من يُسمح له بتنفيذ عمليات على كائن (مثلاً من يستطيع القراءة أو الكتابة على حالته).
- **`Principal`** — الجهة/السلطة المرتبطة بكل استدعاء (`invocation`) وكل نتيجة (`result`). قد يكون `Principal` مستخدماً أو عملية. الاستدعاء يأتي من مستخدم، والنتيجة تأتي من خادم.

#### النص الأصلي يقول:
> The server is responsible for: Verifying the identity of the principal (user) behind each invocation; Checking that they have sufficient access rights to perform the requested operation on the particular object invoked; Rejecting those that do not.

#### الشرح المبسّط:
مسؤوليات الخادم الثلاث في الأمان:
1. **التحقق من الهوية** (Verifying identity) لكل مستدعٍ.
2. **فحص صلاحية الوصول** (Access rights) الكافية للعملية المطلوبة.
3. **رفض** من لا يملك الصلاحية الكافية.

**الشكل 10** يوضح العلاقة: `Principal (user)` → عبر `Network` → `invocation` (استدعاء) إلى `Server` الذي يحتوي `Object` و`Access rights` → ثم يعيد `result` إلى العميل، والخادم نفسه هو `Principal (server)`.

---

##### 5.4.2. العدو (The Enemy) وتصنيف التهديدات

#### النص الأصلي يقول:
> To model security threats, we assume an enemy that is capable of sending any message to any process and reading or copying any message between a pair of processes.

#### الشرح المبسّط:
لتحليل الأمان، نفترض وجود **"عدو" (`Enemy`)** قادر على:
- إرسال أي رسالة إلى أي عملية
- قراءة أو نسخ أي رسالة متبادلة بين عمليتين

**الشكل 11** يوضح: `Process p` يرسل الرسالة `m` عبر `Communication channel` إلى `Process q`، لكن `The enemy` يستطيع أخذ **نسخة من m** (`Copy of m`) و/أو إرسال رسالة مزيّفة `m'` بدلاً منها أو بالإضافة إليها.

#### النص الأصلي يقول:
> Threats from a potential enemy are classified as: Threats to processes, lack of knowledge of true source of a message — example: spoofing a mail server. Threats to communication channels — threat to the privacy and integrity of messages — can be defeated using secure channels.

#### الشرح المبسّط:
نوعان من التهديدات:

| نوع التهديد | الوصف | مثال |
|---|---|---|
| `Threats to processes` | عدم معرفة المصدر الحقيقي للرسالة (مشكلة لكلا الطرفين عميل وخادم) | تزييف هوية خادم بريد (`Spoofing a mail server`) |
| `Threats to communication channels` | تهديد لخصوصية وسلامة (`privacy & integrity`) الرسائل | يمكن مواجهته باستخدام قنوات آمنة (`Secure Channels`) |

---

##### 5.4.3. مواجهة التهديدات الأمنية (Defeating Security Threats)

#### النص الأصلي يقول:
> Secure systems are based on the following main techniques: Cryptography and shared secrets — Cryptography is the science of keeping message secure. Encryption is the process of scrambling a message in such a way as to hide its contents. Authentication — The use of shared secrets and encryption provides the basis for the authentication of messages.

#### الشرح المبسّط:
تقنيتان أساسيتان لبناء أنظمة آمنة:
1. **`Cryptography` (التشفير) والأسرار المشتركة (`Shared Secrets`)** — علم الحفاظ على أمان الرسائل. `Encryption` (التعمية) هي عملية "خلط" الرسالة لإخفاء محتواها.
2. **`Authentication` (التوثيق)** — استخدام الأسرار المشتركة والتعمية يوفر الأساس للتحقق من صحة/مصدر الرسائل.

> 💡 **التشبيه:** التعمية أشبه بوضع الرسالة في صندوق مقفل بمفتاح لا يملكه إلا الطرفان المصرَّح لهما — حتى لو اعترض "العدو" الصندوق، لن يفهم محتواه.

---
## الجزء الثاني: ملخص منظم

### جدول التعريفات (Definitions Table)

| المصطلح | التعريف |
|---|---|
| `Architectural Model` | نموذج يهتم بمكان أجزاء النظام وعلاقاتها ببعضها |
| `Client-Server` | معمارية عميل يطلب خدمة من خادم مستقل |
| `Peer-to-Peer` | معمارية بلا تمييز بين عميل وخادم؛ جميع العمليات متساوية الدور |
| `Superpeer` | ند خاص له دور تنسيقي أكبر ضمن شبكة أنداد |
| `Cache` | مخزن للبيانات المستخدَمة مؤخراً لتسريع الوصول |
| `Proxy Server` | خادم وسيط يخزّن نسخاً مؤقتة مشتركة بين عدة عملاء |
| `Mobile Code` | كود يُرسل ويُشغَّل في جهاز آخر (مثل Applet) |
| `Mobile Agent` | برنامج (كود + بيانات) ينتقل بمبادرة ذاتية لتنفيذ مهمة نيابة عن جهة أخرى |
| `Latency` | التأخير بين إرسال الرسالة وبداية استلامها |
| `Bandwidth` | إجمالي كمية البيانات القابلة للنقل في زمن معيّن |
| `Jitter` | التباين في زمن توصيل سلسلة رسائل متتالية |
| `Clock Drift Rate` | مقدار انحراف ساعة الحاسوب عن ساعة مرجعية مثالية |
| `Synchronous System` | نظام له حدود زمنية معروفة لكل شيء (تنفيذ، رسائل، انحراف الساعة) |
| `Asynchronous System` | نظام بلا أي حدود زمنية مضمونة |
| `Omission Failure` | فشل في تنفيذ فعل مطلوب (Crash أو فقدان رسالة) |
| `Arbitrary Failure` | أسوأ أنواع الفشل — أي خطأ ممكن (قيم خاطئة، فساد، تكرار) |
| `Timing Failure` | تجاوز الحدود الزمنية في نظام متزامن |
| `Masking Failure` | إخفاء الفشل أو تحويله لنوع أخف |
| `Access Rights` | صلاحيات تحدد من يستطيع تنفيذ عمليات على كائن |
| `Principal` | السلطة/الجهة المرتبطة باستدعاء أو نتيجة (مستخدم أو عملية) |
| `Enemy` | كيان افتراضي قادر على إرسال/قراءة/نسخ أي رسالة لتحليل التهديدات |
| `Cryptography` | علم الحفاظ على أمان الرسائل |
| `Authentication` | التحقق من صحة/مصدر الرسائل باستخدام الأسرار المشتركة والتعمية |

### جدول المكوّنات (Components Table)

| المكوّن | دوره |
|---|---|
| `Client Process` | يطلب الخدمة من خادم |
| `Server Process` | يقدّم الخدمة ويدير الموارد المشتركة |
| `Peer Process` | يتعاون مع أنداد آخرين بدون تمييز أدوار |
| `Proxy Server` | يخزّن مؤقتاً ويوسّط بين عملاء وخوادم ويب |
| `Communication Channel` | ينقل الرسائل بين العمليات، وقد يفشل (Omission/Arbitrary) |

### جدول المقارنات (Comparisons Table)

| المعيار | Client-Server | Peer-to-Peer |
|---|---|---|
| تمييز الأدوار | نعم (عميل/خادم) | لا — جميعهم أنداد |
| نقطة مركزية | غالباً نعم (خادم أو مجموعة خوادم) | لا (إلا في Superpeer) |
| قابلية التوسع | محدودة (تعتمد على سعة الخادم) | عالية عادة |
| مثال | محرك بحث، تطبيقات الويب | BitTorrent |

| المعيار | Synchronous | Asynchronous |
|---|---|---|
| حدود زمنية | معروفة لكل شيء | غير موجودة |
| الواقعية | أقل | أكثر (يشبه الإنترنت الحقيقي) |

| المعيار | Omission Failure | Arbitrary Failure | Timing Failure |
|---|---|---|---|
| الوصف | فشل تنفيذ فعل مطلوب | أي خطأ ممكن (أسوأ حالة) | تجاوز حد زمني |
| ينطبق على | كل الأنظمة | كل الأنظمة | الأنظمة المتزامنة فقط |
| مثال | انهيار عملية، إسقاط رسالة | قيمة خاطئة، رسالة مكررة/فاسدة | تأخر تجاوز الحد المسموح |

### قائمة المصطلحات (Glossary)

- `Host` — جهاز مضيف يشغّل عملية أو خدمة.
- `Invocation` — استدعاء عملية من مستخدم أو عميل.
- `Checksum` — قيمة تحقق تُستخدم لاكتشاف فساد الرسائل.
- `Scale` — قدرة النظام على التوسع مع زيادة الحمل.

### النقاط الذهبية (Golden Points)

- 📌 لا يوجد وقت عام (Global Time) في الأنظمة الموزعة — هذا مبدأ أساسي يبنى عليه كل شيء آخر.
- 📌 كل تواصل بين العمليات يتم فقط عبر الرسائل.
- 📌 الخادم قد يكون عميلاً لخادم آخر (سلسلة أدوار).
- 📌 `Timing Failure` حصراً في الأنظمة المتزامنة.
- 📌 `Masking` يحوّل نوع فشل إلى نوع آخر أخف أو يخفيه بالكامل، ولا "يلغي" الفشل فعلياً.

### جدول الأخطاء الشائعة (Common Mistakes Table)

| الخطأ الشائع | التصحيح |
|---|---|
| الاعتقاد بأن P2P لا يحتوي أبداً على أي شكل من التنسيق المركزي | معمارية `Superpeer` تُدخل تنسيقاً جزئياً ضمن P2P |
| الخلط بين `Mobile Code` و `Mobile Agent` | Mobile Code يُستدعى بطلب (كالـ Applet)، بينما Mobile Agent يتنقل بمبادرة ذاتية حاملاً بياناته |
| اعتبار `Timing Failure` ينطبق على كل الأنظمة | ينطبق فقط على الأنظمة المتزامنة (Synchronous) |
| الخلط بين `Latency` و `Bandwidth` | Latency = زمن التأخير لرسالة واحدة، Bandwidth = كمية البيانات الكلية في وحدة زمن |
| اعتبار `Masking` يعني القضاء التام على الفشل | Masking قد يحوّل الفشل لنوع أخف، لا يلغيه بالضرورة |

### الأفكار الرئيسية (Main Ideas)

1. النماذج المعمارية (Client-Server, P2P) تصف **مكان** المكونات وعلاقاتها.
2. متغيرات Client-Server (تعدد الخوادم، Proxy/Cache، Mobile Code/Agent) تحل مشكلة عدم قابلية التوسع لخادم واحد.
3. النماذج الأساسية (Interaction, Failure, Security) تصف خصائص **مشتركة** لكل المعماريات بشكل رسمي.
4. نموذج التفاعل يتعامل مع أداء الشبكة (Latency/Bandwidth/Jitter) واستحالة التزامن الزمني الكامل.
5. نموذج الفشل يصنّف الأعطال إلى Omission/Arbitrary/Timing، ويقدّم Masking كحل.
6. نموذج الأمان يحمي العمليات والقنوات والكائنات عبر Access Rights وPrincipal وCryptography وAuthentication، مع افتراض وجود Enemy لتحليل التهديدات.
## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (medium) — مقارنة
ما الفرق الجوهري بين نموذج `Client-Server` ونموذج `Peer-to-Peer`؟

أ) P2P أسرع دائماً من Client-Server
ب) في P2P لا يوجد تمييز بين الأدوار، بينما Client-Server يميّز بين عميل وخادم
ج) Client-Server لا يمكن أن يستخدمه أكثر من عميلين
د) P2P يتطلب خادماً مركزياً إجبارياً

**الإجابة الصحيحة: ب**
- أ) خاطئ — السرعة تعتمد على التطبيق وليست خاصية ثابتة للنموذج.
- ب) ✅ صحيح — هذا هو التعريف الأساسي: P2P كل العمليات متشابهة الدور، Client-Server يميّز بينها.
- ج) خاطئ — Client-Server يدعم أعداداً كبيرة من العملاء.
- د) خاطئ — عكس التعريف تماماً؛ P2P لا يتطلب خادماً مركزياً بالضرورة.

---

### السؤال 2 (medium) — مقارنة
أي مما يلي **ليس** من متغيرات نموذج Client-Server المذكورة في المحاضرة؟

أ) خدمات تقدَّم بواسطة خوادم متعددة
ب) خوادم Proxy والتخزين المؤقت
ج) الكود المتنقل والوكلاء المتنقلون
د) تشفير البيانات بخوارزمية RSA

**الإجابة الصحيحة: د**
- أ) خاطئ (هو أحد المتغيرات المذكورة فعلاً).
- ب) خاطئ (مذكور كمتغيّر).
- ج) خاطئ (مذكور كمتغيّر).
- د) ✅ صحيح — RSA تفصيل تقني في التشفير لم تذكره المحاضرة ضمن المتغيرات، وهو موضوع أمان لا معمارية.

---

### السؤال 3 (hard) — تطبيق
خادم بحث يستجيب لاستعلامات المتصفحات، وفي نفس الوقت يشغّل Web Crawlers تتصرف كعميل لخوادم أخرى. ما الوصف الأدق لهذا الخادم؟

أ) هو خادم فقط ولا يمكن أن يكون عميلاً
ب) هو عميل فقط لأنه يستخدم Crawlers
ج) هو خادم وعميل في آن واحد حسب السياق
د) هذا السيناريو غير ممكن في الأنظمة الموزعة

**الإجابة الصحيحة: ج**
- أ) خاطئ — يتصرف كعميل أيضاً عبر الـ Crawlers.
- ب) خاطئ — يتصرف كخادم للمتصفحات.
- ج) ✅ صحيح — هذا بالضبط المثال المذكور في المحاضرة: خادم للمستخدمين، وعميل لخوادم الويب الأخرى.
- د) خاطئ — هذا سيناريو شائع وواقعي (محركات البحث).

---

### السؤال 4 (medium) — نظري
ما هو `Superpeer` في معمارية Super Peers؟

أ) خادم مركزي وحيد يدير كل الشبكة
ب) ند عادي بلا أي دور إضافي
ج) ند خاص له دور تنسيقي أكبر ضمن شبكة أنداد
د) بروتوكول تشفير للأنداد

**الإجابة الصحيحة: ج**
- أ) خاطئ — Superpeer ليس خادماً مركزياً واحداً؛ توجد عدة Superpeers.
- ب) خاطئ — عكس المطلوب؛ السؤال عن الند "الخاص" لا العادي.
- ج) ✅ صحيح — يربط مجموعات الأنداد العادية ويقوم بدور تنسيقي.
- د) خاطئ — لا علاقة له بالتشفير.

---

### السؤال 5 (medium) — مقارنة
أي جملة صحيحة بخصوص الـ `Cache`؟

أ) توضع دائماً في خادم Proxy فقط
ب) يمكن أن تكون مع كل عميل أو في Proxy مشترك
ج) لا تُستخدم أبداً في تطبيقات الويب
د) تُلغى تلقائياً كل ثانية

**الإجابة الصحيحة: ب**
- أ) خاطئ — يمكن أن تكون محلية مع العميل أيضاً.
- ب) ✅ صحيح — كما ورد نصاً في المحاضرة.
- ج) خاطئ — الشكل 7 يوضح استخدامها في سياق ويب.
- د) خاطئ — لا يوجد نص يدعم هذا الادعاء.

---

### السؤال 6 (hard) — تطبيق (سيناريو)
عميل يطلب صفحة ويب من Proxy Server. الصفحة موجودة في الـ Cache لكنها **قديمة (ليست up-to-date)**. ماذا سيحدث حسب آلية العمل الموصوفة؟

أ) يُعطى العميل النسخة القديمة مباشرة دون تحقق
ب) تُجلب نسخة محدَّثة من المصدر
ج) يُرفض طلب العميل تماماً
د) يُحوَّل الطلب لعميل آخر

**الإجابة الصحيحة: ب**
- أ) خاطئ — الآلية تشترط أن تكون النسخة "up-to-date" لإعطائها مباشرة.
- ب) ✅ صحيح — إذا لم تتوفر نسخة محدَّثة، تُجلب نسخة جديدة من المصدر الأصلي.
- ج) خاطئ — لا يوجد رفض؛ فقط إعادة جلب.
- د) خاطئ — لا علاقة لهذا بآلية الـ Cache.

---

### السؤال 7 (medium) — نظري
ما الفرق بين `Mobile Code` و `Mobile Agent`؟

أ) لا يوجد فرق؛ مترادفان
ب) Mobile Code يُستدعى بطلب من العميل (كالـ Applet)، بينما Mobile Agent يتنقل بمبادرة ذاتية حاملاً بياناته لتنفيذ مهمة
ج) Mobile Agent لا يشكّل أي تهديد أمني بعكس Mobile Code
د) Mobile Code لا يمكن تشغيله إلا على خادم واحد فقط

**الإجابة الصحيحة: ب**
- أ) خاطئ — مفهومان مختلفان رغم التشابه.
- ب) ✅ صحيح — التفريق الدقيق المذكور في المحاضرة.
- ج) خاطئ — كلاهما يشكّل تهديداً أمنياً محتملاً.
- د) خاطئ — لا علاقة لهذا القيد بتعريف Mobile Code.

---

### السؤال 8 (hard) — تطبيق
وكيل متنقل (`Mobile Agent`) يزور عدة أجهزة لجمع معلومات، لكنه رُفض وصوله للمعلومات المطلوبة في أحد الأجهزة. ماذا يحدث؟

أ) يتوقف النظام الموزع بأكمله
ب) قد لا يستطيع الوكيل إتمام مهمته
ج) يتحول الوكيل تلقائياً إلى Mobile Code
د) يُصبح الوكيل خادماً دائماً على ذلك الجهاز

**الإجابة الصحيحة: ب**
- أ) خاطئ — مبالغة؛ الأثر محدود بالوكيل نفسه.
- ب) ✅ صحيح — كما ورد: الوكيل نفسه معرّض لعدم إتمام مهمته إذا رُفض وصوله للمعلومات.
- ج) خاطئ — لا يوجد تحوّل تلقائي بين النوعين.
- د) خاطئ — لا علاقة لهذا بالسيناريو.

---

### السؤال 9 (medium) — مقارنة
أي مما يلي يصف `Latency` بدقة؟

أ) إجمالي كمية البيانات المنقولة في ثانية
ب) التباين في زمن توصيل رسائل متتالية
ج) التأخير بين بدء إرسال رسالة وبداية استلامها
د) معدل انحراف ساعة الحاسوب

**الإجابة الصحيحة: ج**
- أ) خاطئ — هذا تعريف Bandwidth.
- ب) خاطئ — هذا تعريف Jitter.
- ج) ✅ صحيح — التعريف الحرفي لـ Latency.
- د) خاطئ — هذا تعريف Clock Drift Rate.

---

### السؤال 10 (hard) — تطبيق (سيناريو)
تطبيق مؤتمرات صوتية يعاني من تباين واضح في زمن وصول العينات الصوتية المتتالية، مما يشوّه الصوت. أي مفهوم يفسّر هذه المشكلة؟

أ) Bandwidth
ب) Jitter
ج) Clock Drift
د) Omission Failure

**الإجابة الصحيحة: ب**
- أ) خاطئ — Bandwidth يتعلق بالكمية الكلية للبيانات لا بتباين التوقيت.
- ب) ✅ صحيح — هذا بالضبط المثال المذكور نصاً في المحاضرة عن Jitter والبيانات الصوتية.
- ج) خاطئ — Clock Drift يخص انحراف الساعات وليس تباين توصيل الرسائل.
- د) خاطئ — Omission يخص فقدان الرسائل تماماً، لا تباين توقيتها.

---

### السؤال 11 (medium) — نظري
لماذا لا يمكن الاعتماد على "مفهوم وقت عالمي واحد" في الأنظمة الموزعة؟

أ) لأن كل ساعة حاسوب تنحرف بمعدل مختلف عن الأخرى
ب) لأن الأنظمة الموزعة لا تحتوي على ساعات أصلاً
ج) لأن القانون يمنع مزامنة الساعات
د) لأن كل الحواسيب تستخدم نفس الساعة فعلياً

**الإجابة الصحيحة: أ**
- أ) ✅ صحيح — بسبب Clock Drift المختلف بين الأجهزة.
- ب) خاطئ — كل جهاز له ساعته الداخلية الخاصة.
- ج) خاطئ — لا علاقة بالقانون.
- د) خاطئ — عكس الواقع تماماً؛ لكل جهاز ساعته المستقلة.

---

### السؤال 12 (hard) — تطبيق (سيناريو)
نظام موزع يضمن أن كل خطوة تنفيذ لها حد أقصى زمني معروف، وكل رسالة تصل خلال زمن محدود مضمون. ما نوع هذا النظام؟

أ) Asynchronous
ب) Synchronous
ج) Peer-to-Peer
د) Arbitrary

**الإجابة الصحيحة: ب**
- أ) خاطئ — Asynchronous لا يضمن أي حدود زمنية.
- ب) ✅ صحيح — هذا التعريف الحرفي لـ Synchronous Distributed System.
- ج) خاطئ — P2P معمارية وليست نموذج توقيت.
- د) خاطئ — Arbitrary نوع فشل وليس نموذج توقيت.

---

### السؤال 13 (medium) — مقارنة
أي الأنظمة أكثر واقعية بالنسبة لشبكة الإنترنت الحقيقية؟

أ) Synchronous لأنه أدق
ب) Asynchronous لأنه لا يفترض حدوداً زمنية غير مضمونة عملياً
ج) كلاهما متطابقان تماماً
د) لا علاقة للتوقيت بواقعية النظام

**الإجابة الصحيحة: ب**
- أ) خاطئ — الدقة النظرية لا تعني الواقعية العملية.
- ب) ✅ صحيح — الإنترنت لا يضمن حدوداً زمنية ثابتة، فهو أقرب لنموذج Asynchronous.
- ج) خاطئ — يختلفان جذرياً في الافتراضات.
- د) خاطئ — التوقيت جوهري في وصف واقعية النموذج.

---

### السؤال 14 (medium) — نظري
ما الفرق بين `Omission Failure` و `Arbitrary Failure`؟

أ) لا فرق؛ نفس المفهوم
ب) Omission = فشل في تنفيذ فعل مطلوب، Arbitrary = أي خطأ ممكن (أسوأ حالة)
ج) Omission أسوأ من Arbitrary دائماً
د) Arbitrary لا يحدث إلا في قنوات التواصل فقط

**الإجابة الصحيحة: ب**
- أ) خاطئ — مفهومان مختلفان تماماً في الشدة والنوع.
- ب) ✅ صحيح — التعريف الدقيق لكل منهما كما ورد في المحاضرة.
- ج) خاطئ — العكس صحيح؛ Arbitrary يوصف بأنه "أسوأ الحالات الممكنة".
- د) خاطئ — Arbitrary يحدث في العمليات والقنوات معاً.

---

### السؤال 15 (hard) — تطبيق (سيناريو)
عملية تحسب قيمة خاطئة وترجعها كنتيجة صحيحة دون أي إشارة خطأ ظاهرة. أي نوع فشل هذا؟

أ) Omission Failure
ب) Timing Failure
ج) Arbitrary Failure
د) لا يُعتبر فشلاً لأن العملية لم تتوقف

**الإجابة الصحيحة: ج**
- أ) خاطئ — Omission يعني عدم تنفيذ فعل مطلوب، بينما هنا نُفّذ الفعل لكن بقيمة خاطئة.
- ب) خاطئ — لا علاقة بتجاوز حد زمني هنا.
- ج) ✅ صحيح — إرجاع قيمة خاطئة هو مثال كلاسيكي على Arbitrary Failure.
- د) خاطئ — هو فشل حتى لو استمرت العملية في العمل.

---

### السؤال 16 (medium) — نظري
متى ينطبق مفهوم `Timing Failure`؟

أ) في كل الأنظمة الموزعة دون استثناء
ب) في الأنظمة المتزامنة (Synchronous) فقط حيث توجد حدود زمنية محدَّدة
ج) في الأنظمة اللامتزامنة فقط
د) لا ينطبق على أي نظام عملياً

**الإجابة الصحيحة: ب**
- أ) خاطئ — لا ينطبق على كل الأنظمة، فقط ما فيه حدود زمنية.
- ب) ✅ صحيح — كما ورد نصاً في المحاضرة.
- ج) خاطئ — الأنظمة اللامتزامنة لا تضع حدوداً زمنية أصلاً، فلا معنى لتجاوزها.
- د) خاطئ — ينطبق فعلياً على الأنظمة المتزامنة.

---

### السؤال 17 (hard) — تطبيق (سيناريو Masking)
نظام يستخدم Checksum لاكتشاف الرسائل الفاسدة ويرفضها بدلاً من تمريرها للمستخدم. ما الذي يحدث هنا من ناحية تصنيف الفشل؟

أ) يتحول Arbitrary Failure إلى Omission Failure
ب) يتحول Omission Failure إلى Timing Failure
ج) يُلغى الفشل نهائياً بلا أي أثر
د) يزداد الفشل سوءاً

**الإجابة الصحيحة: أ**
- أ) ✅ صحيح — هذا المثال بالضبط من المحاضرة: تحويل فساد المحتوى (Arbitrary) إلى رسالة مرفوضة/مفقودة (Omission).
- ب) خاطئ — لا علاقة بـ Timing هنا.
- ج) خاطئ — لم يُلغَ الفشل، بل تحوّل لنوع أخف (الرسالة لا تزال مفقودة).
- د) خاطئ — عكس الهدف من Masking تماماً.

---

### السؤال 18 (medium) — نظري
ما هو `Principal` في نموذج الأمان؟

أ) نوع من أنواع الفشل
ب) السلطة/الجهة المرتبطة بكل استدعاء ونتيجة، وقد تكون مستخدماً أو عملية
ج) بروتوكول شبكة
د) نوع من الكاش

**الإجابة الصحيحة: ب**
- أ) خاطئ — لا علاقة بمفاهيم الفشل.
- ب) ✅ صحيح — التعريف الدقيق كما ورد في المحاضرة.
- ج) خاطئ — ليس بروتوكولاً بل مفهوم سلطة/هوية.
- د) خاطئ — لا علاقة بالتخزين المؤقت.

---

### السؤال 19 (hard) — تطبيق (سيناريو أمني)
مستخدم يرسل طلب استدعاء لخادم لتعديل بيانات معينة. ما الخطوات الثلاث التي يجب على الخادم القيام بها حسب نموذج الأمان؟

أ) تجاهل الطلب، ثم إرسال رد فارغ، ثم إغلاق الاتصال
ب) التحقق من الهوية، فحص صلاحية الوصول، رفض من لا يملك الصلاحية
ج) تشفير الطلب فقط دون أي تحقق آخر
د) إعادة توجيه الطلب دائماً لخادم آخر

**الإجابة الصحيحة: ب**
- أ) خاطئ — لا يوجد تجاهل تلقائي في النموذج الموصوف.
- ب) ✅ صحيح — الخطوات الثلاث المذكورة حرفياً: التحقق من الهوية، فحص الصلاحيات، الرفض عند عدم الاستحقاق.
- ج) خاطئ — التشفير وحده لا يكفي دون تحقق من الهوية والصلاحيات.
- د) خاطئ — لا علاقة لإعادة التوجيه بمسؤوليات الخادم الأمنية هنا.

---

### السؤال 20 (medium) — مقارنة
ما الفرق بين تهديدات `Processes` وتهديدات `Communication Channels` في نموذج الأمان؟

أ) لا فرق؛ نفس التهديد
ب) تهديدات العمليات تتعلق بعدم معرفة مصدر الرسالة الحقيقي (كتزييف الهوية)، بينما تهديدات القنوات تتعلق بخصوصية وسلامة محتوى الرسائل
ج) تهديدات القنوات فقط هي التي يمكن مواجهتها
د) تهديدات العمليات لا تحدث في البريد الإلكتروني أبداً

**الإجابة الصحيحة: ب**
- أ) خاطئ — تصنيفان مختلفان لهما أمثلة مختلفة.
- ب) ✅ صحيح — التمييز الدقيق كما ورد في المحاضرة (Spoofing مقابل انتهاك الخصوصية/السلامة).
- ج) خاطئ — كلا النوعين يمكن مواجهته (مثلاً القنوات الآمنة).
- د) خاطئ — مثال Spoofing a mail server يخص البريد الإلكتروني تحديداً.

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

### تمرين 1 — إكمال الفراغات (fill_gaps)
أكمل الفراغات التالية بالمصطلح الصحيح:

1. النموذج الذي يهتم بمكان أجزاء النظام وعلاقاتها يُسمى _______.
2. في نموذج _______ لا يوجد تمييز بين عميل وخادم.
3. مخزن البيانات المستخدَمة مؤخراً يُسمى _______.
4. التأخير بين بدء إرسال الرسالة وبداية استلامها يُسمى _______.
5. التباين في زمن توصيل سلسلة من الرسائل يُسمى _______.
6. أسوأ أنواع الفشل الذي قد يشمل أي خطأ ممكن يُسمى _______.
7. إخفاء الفشل أو تحويله لنوع أخف يُسمى _______.
8. الجهة/السلطة المرتبطة بكل استدعاء ونتيجة تُسمى _______.

**نموذج الحل:**
1. `Architectural Model`
2. `Peer-to-Peer`
3. `Cache`
4. `Latency`
5. `Jitter`
6. `Arbitrary Failure`
7. `Masking`
8. `Principal`

---

### تمرين 2 — سيناريو تطبيقي
شركة تريد توزيع خدمة بحث على عدة خوادم بسبب زيادة الطلب على خادم واحد.

**المطلوب:**
1. سمِّ المتغيّر من Client-Server المناسب لهذه الحالة.
2. اذكر طريقتين ممكنتين لتوزيع البيانات بين الخوادم.
3. اذكر مثالاً واقعياً مشابهاً ورد في المحاضرة.

**نموذج الحل الكامل:**
1. **خدمات تقدَّم بواسطة خوادم متعددة (Services provided by multiple servers)**.
2. الطريقتان: **Partition** (تقسيم الكائنات وتوزيعها بين الخوادم) و **Replication** (الاحتفاظ بنسخ مكررة على عدة أجهزة).
3. المثال الوارد: **Cluster يُستخدم لمحركات البحث**.

---

### تمرين 3 — تصنيف أنواع الفشل (scenario)
صنّف كل حالة من الحالات التالية إلى (Omission / Arbitrary / Timing):

| # | الحالة |
|---|---|
| أ | خادم يتوقف تماماً عن العمل ولا ينفذ أي خطوة أخرى |
| ب | رسالة تصل بمحتوى مغيَّر عن الأصل |
| ج | رسالة تتأخر عن الحد الزمني المسموح به في نظام متزامن |
| د | خادم يعالج نفس الطلب مرتين بسبب تكرار الرسالة |

**نموذج الحل:**
- أ) **Omission Failure** (Crash)
- ب) **Arbitrary Failure** (محتوى فاسد)
- ج) **Timing Failure**
- د) **Arbitrary Failure** (تسليم الرسالة أكثر من مرة)

---

### تمرين 4 — تصحيح مفهوم خاطئ (code_fix / concept_fix)
النص التالي يحتوي خطأ مفاهيمي، حدده وصححه:

> "في الأنظمة اللامتزامنة (Asynchronous)، يمكن أن تحدث Timing Failures لأن الرسائل قد تتأخر كثيراً."

**نموذج الحل:**
- **الخطأ:** الأنظمة اللامتزامنة لا تضع أي حدود زمنية من الأساس، لذا لا معنى لمفهوم "تجاوز حد زمني" (Timing Failure) فيها.
- **التصحيح الصحيح:** "Timing Failures تنطبق فقط على الأنظمة المتزامنة (Synchronous)، حيث توجد حدود زمنية معروفة مسبقاً لتنفيذ الخطوات وتوصيل الرسائل وانحراف الساعة. أما في الأنظمة اللامتزامنة، فتأخر الرسالة أمر متوقع ولا يُصنَّف كفشل توقيت لأنه لا يوجد حد مرجعي أساساً."

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين تحليلي 1 — دراسة حالة (case_study)
نظام مؤتمرات فيديو موزّع يربط عدة مستخدمين حول العالم دون خادم مركزي، وكل مستخدم يرسل ويستقبل الفيديو من الآخرين مباشرة.

**المطلوب:** حلّل هذا النظام من ناحية:
1. المعمارية المستخدَمة ولماذا.
2. أكبر تحدٍ متوقع من ناحية Interaction Model.
3. كيف يمكن حماية جلسة المؤتمر أمنياً.

**نموذج الحل:**
1. **Peer-to-Peer** — لأن كل المستخدمين متساوو الدور، يتبادلون البيانات مباشرة دون خادم مركزي يوسّط.
2. أكبر تحدٍ هو **Jitter** — لأن الفيديو والصوت وسائط متعددة حساسة جداً لتباين زمن وصول العينات المتتالية، مما قد يسبب تقطعاً أو تشويهاً ملحوظاً.
3. الحماية تتم عبر: تحقق من هوية كل `Principal` مشارك، فرض `Access Rights` لمن يحق له الانضمام، واستخدام `Cryptography`/قنوات آمنة (Secure Channels) لحماية خصوصية وسلامة البث بين الأطراف، مع افتراض وجود `Enemy` قادر على اعتراض الرسائل عند التحليل الأمني.

---

### تمرين تحليلي 2 — إكمال مخطط (diagram_completion)
أكمل مخطط تدفق آلية عمل الـ Cache التالي بوضع الخطوة الناقصة:

```
طلب عميل لكائن
        │
        ▼
   فحص الـ Cache
        │
   ┌────┴────┐
   ▼         ▼
موجود      غير موجود
ومحدَّث؟    أو قديم
   │         │
   ▼         ▼
[الخطوة 1] [الخطوة 2]
```

**نموذج الحل:**
- **الخطوة 1:** إرجاع الكائن مباشرة من الـ Cache للعميل (استجابة سريعة دون الحاجة للمصدر الأصلي).
- **الخطوة 2:** جلب نسخة محدَّثة (up-to-date) من المصدر الأصلي، ثم تخزينها في الـ Cache، ثم إرجاعها للعميل.

---

### تمرين تحليلي 3 — تحليل مكتوب (written_analysis)
اشرح لماذا تُعتبر معمارية `Three-tier Web Applications` (الشكل 3) حالة خاصة تجمع بين خصائص Client-Server التقليدي وتعقيد إضافي؟

**نموذج الحل:**
تُعتبر خاصة لأن **الخادم نفسه (Application Server) يتصرف كعميل** تجاه طبقة أخرى (Database Server) — أي أن معمارية Client-Server تتكرر "بشكل متداخل" (Nested) داخل نفس النظام: طبقة الواجهة (User Interface) تطلب من طبقة التطبيق، وطبقة التطبيق بدورها تطلب من طبقة البيانات وتنتظر ردها قبل أن ترد على الطبقة الأولى. هذا التسلسل (Request → Wait → Return) يُضيف زمن انتظار تراكمياً (latency) عبر الطبقات الثلاث، لكنه يمنح فصلاً واضحاً للمسؤوليات (Presentation / Processing / Data) يسهّل الصيانة والتوسع لكل طبقة على حدة.

---

### تمرين تحليلي 4 — جدول تحليل (table_fill)
أكمل الجدول التالي بمطابقة كل تهديد أمني بنوعه الصحيح:

| السيناريو | نوع التهديد (Process / Channel) |
|---|---|
| مهاجم ينتحل هوية خادم بريد إلكتروني حقيقي | ؟ |
| مهاجم يعترض رسالة ويقرأ محتواها السري أثناء نقلها | ؟ |
| مستخدم لا يستطيع التأكد من المصدر الحقيقي لرسالة وصلته | ؟ |
| مهاجم يعدّل محتوى رسالة أثناء انتقالها عبر الشبكة | ؟ |

**نموذج الحل:**
| السيناريو | نوع التهديد |
|---|---|
| انتحال هوية خادم بريد | **Threat to processes** (مثال Spoofing مذكور حرفياً) |
| اعتراض وقراءة محتوى سري | **Threat to communication channels** (تهديد للخصوصية) |
| عدم التأكد من المصدر الحقيقي | **Threat to processes** |
| تعديل محتوى الرسالة أثناء النقل | **Threat to communication channels** (تهديد للسلامة/Integrity) |

---

## الجزء الرابع: أسئلة تصميم

### سؤال تصميم 1 (architecture)
صمّم معمارياً نظام مشاركة ملاحظات جامعية بين الطلاب بحيث:
- يمكن لأي طالب رفع ملاحظة أو تحميل ملاحظات الآخرين.
- النظام يجب أن يتوسع (scale) مع آلاف الطلاب دون الاعتماد على خادم واحد فقط.

**نموذج الحل:**
- **المعمارية المقترحة:** `Peer-to-Peer` مع دعم `Superpeers` — كل مجموعة طلاب (كلية أو قسم) تنضم إلى Superpeer يخدم مجموعتها، والـ Superpeers فيما بينها تشكّل شبكة تنسيقية (Superpeer Network) لتبادل الفهارس (indexes) بين المجموعات.
- **البديل المقبول:** إذا فُضِّل التحكم المركزي بالمحتوى (لضمان الجودة)، يمكن استخدام `Client-Server` مع **خدمة متعددة الخوادم (multiple servers)** تُوزَّع فيها الملفات بـ `Partition` (حسب الكلية مثلاً) مع `Replication` للملفات الأكثر طلباً، ودعم `Proxy/Cache` لتسريع التحميل المتكرر لنفس الملفات الشائعة.
- **التبرير:** الخيار الأول (P2P+Superpeer) يوفر أفضل قابلية توسع بلا نقطة اختناق مركزية، بينما الثاني أسهل بالإدارة والتحكم بالمحتوى — وهذه هي المقايضة (`Trade-off`) الأساسية بين النموذجين.

### سؤال تصميم 2 (architecture)
اقترح تصميماً أمنياً (باستخدام مفاهيم Security Model) لحماية نظام الملاحظات أعلاه من `Enemy` قد ينتحل هوية طالب أو يعترض الملفات المرفوعة.

**نموذج الحل:**
- تحديد **Principal** لكل مستخدم عبر حساب موثَّق (جامعي مثلاً).
- فرض **Access Rights** تحدد من يمكنه الرفع/الحذف/التعديل على كل ملف (Object).
- استخدام **Cryptography** لتشفير الملفات أثناء النقل (منع اعتراض `Enemy` لمحتواها).
- تطبيق **Authentication** قبل كل عملية رفع أو تحميل للتأكد من الهوية الحقيقية ومنع انتحال الهوية (Spoofing).
- الخادم (أو الـ Superpeer) يتحقق من الهوية، يفحص الصلاحيات، ويرفض أي طلب غير مصرَّح به — تماماً كما في الشكل 10 (Objects and Principals).

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هما أشهر مثالين على النموذج المعماري؟
**A:** Client-Server و Peer-to-Peer.

**Q2:** اذكر ثلاث طرق يمكن أن تتكوّن بها متغيرات نموذج Client-Server؟
**A:** تقسيم/تكرار البيانات، التخزين المؤقت (Caching)، استخدام الكود/الوكلاء المتنقلين.

**Q3:** ما الخاصيتان الأساسيتان المشتركتان في كل الأنظمة الموزعة؟
**A:** لا يوجد وقت عام (Global Time)، وكل التواصل يتم عبر الرسائل فقط.

**Q4:** ما النماذج الثلاثة التي تعالج مشاكل تواصل الرسائل؟
**A:** Interaction Model، Failure Model، Security Model.

**Q5:** ما هي الاهتمامات الأربعة الرئيسية عند بناء معمارية النظام؟
**A:** Reliable، Manageable، Adaptable، Cost-effective.

**Q6:** كيف تُصنَّف العمليات في التبسيط الأولي للمعماريات؟
**A:** Server processes، Client processes، Peer processes.

**Q7:** ما مثال البيرتورنت (BitTorrent) دليل على أي نموذج معماري؟
**A:** Peer-to-Peer.

**Q8:** ما الفرق بين Superpeer و Regular peer؟
**A:** Superpeer له دور تنسيقي أكبر ويربط شبكة أنداد، بينما Regular peer دوره عادي كباقي الأنداد.

**Q9:** ما مشكلة نموذج Client-Server التقليدي التي دفعت لظهور متغيرات؟
**A:** وضع الخدمة على عنوان خادم واحد لا يتوسع جيداً مع زيادة الحمل أو تجاوز سعة الجهاز/الشبكة.

**Q10:** ما الفرق بين Partition وReplication في الخوادم المتعددة؟
**A:** Partition = تقسيم الكائنات وتوزيعها، Replication = الاحتفاظ بنسخ مكررة من نفس البيانات.

**Q11:** عرّف Latency وBandwidth وJitter باختصار.
**A:** Latency = تأخير الرسالة، Bandwidth = كمية البيانات القابلة للنقل، Jitter = تباين زمن توصيل الرسائل المتتالية.

**Q12:** لماذا تختلف الساعات المحلية حتى لو ضُبطت في نفس الوقت؟
**A:** بسبب اختلاف معدل انحراف كل ساعة (Clock Drift Rate) عن الوقت المثالي.

**Q13:** ما الفرق بين Synchronous وAsynchronous من ناحية الافتراضات الزمنية؟
**A:** Synchronous له حدود زمنية معروفة لكل شيء، Asynchronous بلا أي حدود زمنية.

**Q14:** ما هو Masking وأعطِ مثالاً؟
**A:** إخفاء الفشل أو تحويله لنوع أخف؛ مثال: استخدام Checksum يحوّل Arbitrary Failure إلى Omission Failure.

**Q15:** من هو Principal وما مثالان عليه؟
**A:** السلطة المرتبطة بالاستدعاء أو النتيجة؛ أمثلة: مستخدم (Principal للاستدعاء) أو خادم (Principal للنتيجة).

**Q16:** ما هي التقنيتان الأساسيتان لبناء أنظمة آمنة؟
**A:** Cryptography (والأسرار المشتركة) و Authentication.

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: عرّف النموذج المعماري (Architectural Model) واذكر مثالين عليه.
**نموذج الإجابة:**
1. **التعريف:** نموذج يهتم بمكان أجزاء النظام الموزع (placement) والعلاقات بينها (relationships).
2. **المكونات/الأمثلة:** Client-Server model، Peer-to-Peer model.
3. **مثال:** محرك بحث (Client-Server) أو BitTorrent (Peer-to-Peer).
4. **متى نستخدمه:** لوصف "شكل" وتوزيع مكونات النظام قبل الدخول في التفاصيل الرسمية للنماذج الأساسية.

---

### السؤال 2: ما الفرق بين النماذج المعمارية (Architectural Models) والنماذج الأساسية (Fundamental Models)؟
**نموذج الإجابة:**
1. **التعريف:** النماذج المعمارية تصف مكان المكونات وعلاقاتها (وصف عملي/تطبيقي)، بينما النماذج الأساسية تصف الخصائص المشتركة بين كل المعماريات بشكل رسمي (formal).
2. **المكونات:** المعمارية → Client-Server, P2P. الأساسية → Interaction, Failure, Security.
3. **مثال:** أي نظام (سواء Client-Server أو P2P) يعاني من نفس مشاكل التوقيت والفشل والأمان الموصوفة في النماذج الأساسية.
4. **متى نستخدم كل واحد:** المعمارية لتصميم هيكل النظام، الأساسية لتحليل خصائصه وضماناته رسمياً.

---

### السؤال 3: اشرح متغيّر "الخدمات المقدَّمة بواسطة خوادم متعددة" وكيف يحل مشكلة قابلية التوسع؟
**نموذج الإجابة:**
1. **التعريف:** تنفيذ الخدمة كعدة عمليات خادم على أجهزة منفصلة، تتفاعل معاً حسب الحاجة لخدمة العملاء.
2. **المكونات/الشروط:** إما تقسيم الكائنات (Partition) بين الخوادم، أو الاحتفاظ بنسخ مكررة (Replication).
3. **مثال:** Cluster لمحرك بحث.
4. **متى نستخدمه:** عندما يتجاوز الطلب سعة خادم واحد أو عرض النطاق الترددي للشبكة.

---

### السؤال 4: قارن بين Mobile Code وMobile Agent من حيث الآلية والمخاطر الأمنية.
**نموذج الإجابة:**
1. **التعريف:** Mobile Code = كود يُرسل ويُشغَّل في جهاز آخر (كالـ Applet)؛ Mobile Agent = برنامج (كود+بيانات) يتنقل بمبادرة ذاتية بين عدة أجهزة لتنفيذ مهمة.
2. **المكونات:** Mobile Code يُستدعى بطلب من العميل، Mobile Agent يتحرك تلقائياً نيابة عن عملية أخرى.
3. **مثال:** Web Applet (Mobile Code)، وكيل جمع معلومات أو صيانة برامج (Mobile Agent).
4. **الخطر الأمني:** كلاهما تهديد على الجهاز المضيف، لكن Mobile Agent معرّض أيضاً لخطر عدم إتمام مهمته إذا رُفض وصوله للمعلومات.

---

### السؤال 5: اشرح مفهومي Latency وBandwidth وأثرهما على أداء النظام الموزع.
**نموذج الإجابة:**
1. **التعريف:** Latency = تأخير بدء استلام الرسالة بعد إرسالها؛ Bandwidth = إجمالي كمية المعلومات القابلة للنقل في زمن معين.
2. **المكونات/الشروط:** القنوات المشتركة على نفس الشبكة تتقاسم Bandwidth المتاح.
3. **مثال:** شبكة مزدحمة تقلل Bandwidth الفعّال لكل قناة وتزيد Latency.
4. **الأهمية:** كلاهما يحدّد أداء التواصل، وهو أحد أهم العاملين المؤثرين على العمليات المتفاعلة في نظام موزع.

---

### السؤال 6: لماذا يستحيل الحفاظ على مفهوم وقت عالمي واحد في الأنظمة الموزعة؟ وما الحل الجزئي؟
**نموذج الإجابة:**
1. **السبب:** كل جهاز له ساعته الداخلية، وتنحرف كل ساعة بمعدل مختلف (Clock Drift Rate) عن الساعة المرجعية المثالية.
2. **الأثر:** حتى لو ضُبطت الساعات في البداية على نفس القيمة، ستتباعد مع الوقت.
3. **مثال:** قراءتان لعمليتين مختلفتين "في نفس اللحظة" قد تعطيان وقتين مختلفين.
4. **الحل الجزئي:** تطبيق تصحيحات دورية على الساعات (مثل بروتوكولات المزامنة) لتقليل الانحراف التراكمي.

---

### السؤال 7: عرّف الأنظمة المتزامنة (Synchronous) واللامتزامنة (Asynchronous) مع ذكر الفروق الثلاثة الأساسية.
**نموذج الإجابة:**
1. **التعريف:** Synchronous = افتراض قوي بوجود حدود زمنية معروفة لكل شيء؛ Asynchronous = لا يوجد أي افتراض زمني.
2. **الفروق الثلاثة:** (1) زمن تنفيذ الخطوة محدود/غير محدود، (2) زمن توصيل الرسالة محدود/غير محدود، (3) معدل انحراف الساعة محدود/غير محدود.
3. **مثال:** الإنترنت الحقيقي أقرب لنموذج Asynchronous.
4. **متى نستخدم كل واحد:** Synchronous للتحليل النظري المبسّط والضمانات الصارمة، Asynchronous للواقعية العملية.

---

### السؤال 8: اذكر أنواع الفشل الثلاثة في الأنظمة الموزعة مع تعريف كل منها.
**نموذج الإجابة:**
1. **Omission Failure:** فشل في تنفيذ فعل مطلوب (انهيار عملية أو إسقاط رسالة).
2. **Arbitrary Failure:** أسوأ أنواع الفشل — أي خطأ ممكن (قيم خاطئة، فساد محتوى، تكرار تسليم).
3. **Timing Failure:** تجاوز حد زمني معروف في نظام متزامن (تنفيذ، توصيل، أو انحراف ساعة).
4. **متى يحدث كل نوع:** الأول والثاني ينطبقان على كل الأنظمة، أما الثالث فحصراً على الأنظمة المتزامنة.

---

### السؤال 9: اشرح مفهوم "إخفاء الفشل" (Masking Failure) مع مثال تفصيلي.
**نموذج الإجابة:**
1. **التعريف:** بناء خدمات موثوقة من مكونات قد تفشل، عبر إخفاء الفشل بالكامل أو تحويله إلى نوع أخف.
2. **الطريقتان:** إخفاء تام (نسخ مكررة تعمل بديلاً عن خادم منهار)، أو تحويل النوع (Checksum يحوّل Arbitrary إلى Omission).
3. **مثال:** خوادم متعددة تحمل نسخاً من نفس البيانات، فإذا انهار أحدها استمرت الخدمة دون توقف ملحوظ.
4. **الأهمية:** يسمح ببناء أنظمة موثوقة (Reliable) رغم وجود مكونات غير موثوقة بطبيعتها.

---

### السؤال 10: كيف يحمي نموذج الأمان الكائنات (Objects) في النظام الموزع؟ اشرح دور الخادم.
**نموذج الإجابة:**
1. **التعريف:** الحماية تتم عبر Access Rights (من يحق له تنفيذ عملية) وPrincipal (السلطة المرتبطة بالاستدعاء/النتيجة).
2. **دور الخادم:** التحقق من هوية Principal، فحص كفاية Access Rights للعملية المطلوبة، رفض من لا يملك الصلاحية.
3. **مثال:** الشكل 10 — عميل يرسل invocation عبر الشبكة، الخادم يتحقق قبل تنفيذ العملية على Object ويعيد result.
4. **الأهمية:** يمنع الوصول غير المصرَّح به للموارد المشتركة رغم انفتاح الشبكة على أطراف متعددة.

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### جدول خريطة التكامل (Integration Map)

| القسم | الفكرة المحورية | يرتبط بـ |
|---|---|---|
| Architectural Models | مكان المكونات وعلاقاتها | Client-Server, P2P, Superpeer |
| Variants of C-S | حل مشكلة التوسع | Multiple servers, Proxy/Cache, Mobile Code/Agent |
| Interaction Model | الأداء واستحالة التزامن الزمني | Latency, Bandwidth, Jitter, Clock Drift, Sync/Async |
| Failure Model | تصنيف الأعطال وإخفاؤها | Omission, Arbitrary, Timing, Masking |
| Security Model | حماية العمليات والقنوات والكائنات | Access Rights, Principal, Enemy, Cryptography |

### جدول القواعد الذهبية (Golden Rules)

| # | القاعدة الذهبية |
|---|---|
| 1 | لا وقت عام أبداً في الأنظمة الموزعة — اعتمد دائماً على الرسائل والتوقيت المحلي |
| 2 | الخادم قد يكون عميلاً لخادم آخر — لا تفترض دوراً ثابتاً |
| 3 | Timing Failure ينطبق حصراً على الأنظمة المتزامنة |
| 4 | Masking يحوّل نوع الفشل أو يخفيه، لا يُلغيه بالضرورة |
| 5 | كل تهديد أمني إما على Process (هوية) أو على Channel (خصوصية/سلامة) |

### جداول مرجعية سريعة (Quick Reference)

**أنواع الفشل:**
`Omission` (فشل تنفيذ فعل) → `Arbitrary` (أي خطأ ممكن) → `Timing` (تجاوز حد زمني، Sync فقط) → يُعالَج بـ `Masking`

**متغيرات Client-Server:**
`Multiple Servers` (Partition/Replication) → `Proxy & Cache` → `Mobile Code` (Applet) → `Mobile Agent` (مهمة مستقلة)

**عناصر الأمان:**
`Principal` (هوية) + `Access Rights` (صلاحية) + `Enemy` (نموذج تهديد) + `Cryptography/Authentication` (حل)

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم الفرق بين Architectural Models وFundamental Models
- [ ] أستطيع شرح الفرق بين Client-Server وPeer-to-Peer وSuperpeer
- [ ] أعرف متغيرات Client-Server الثلاث: Multiple Servers، Proxy/Cache، Mobile Code/Agent
- [ ] أميّز بين Latency وBandwidth وJitter
- [ ] أفهم سبب استحالة الوقت العالمي (Clock Drift)
- [ ] أفرّق بين Synchronous وAsynchronous بدقة (3 فروق)
- [ ] أحفظ أنواع الفشل الثلاثة (Omission/Arbitrary/Timing) وأمثلة كل منها
- [ ] أفهم مفهوم Masking وكيف يحوّل نوع الفشل
- [ ] أعرف مكونات نموذج الأمان: Principal, Access Rights, Enemy, Cryptography, Authentication
- [ ] راجعت ≥16 سؤال MCQ مع تعليل كل خيار
- [ ] راجعت ≥10 أسئلة نظرية مع نموذج إجابة منظم
- [ ] حللت التمارين التطبيقية والتحليلية مع نموذج الحل
- [ ] راجعت أسئلة التصميم المعماري والأمني
- [ ] راجعت ≥14 بطاقة Q/A للمراجعة السريعة
- [ ] شملت كل المخططات (Figures 1–11) في فهمي للمادة

<!-- VALIDATION: subject=Distributed Systems - System Model | schema=SCHEMA.md v1.0 | parts=detail,summary,mcq,exercise,analysis_exercise,design_question,theory,cheat_sheet,qa_cards,checklist -->

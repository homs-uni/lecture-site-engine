# المحاضرة 3 — Distributed Objects and Remote Invocation (الكائنات الموزعة والاستدعاء عن بعد)
> **المادة:** نظم موزعة (تصميم) | **الموضوع:** Remote Invocation، RPC، RMI، Event-based Programming

---

## الجزء الأول: الشرح التفصيلي

### 1. مقدمة عن الاستدعاء عن بعد (Introduction)

#### النص الأصلي يقول:
> "Distributed applications: applications that are composed of cooperating programs running in several different processes. Programs need to be able to invoke operations in other processes. Objects that can receive remote method invocations are called remote objects and they implement a remote interface."

#### الشرح المبسّط:
التطبيق الموزع هو مجموعة برامج تتعاون مع بعضها، لكنها تعمل كل واحدة في عملية (process) منفصلة، وربما على جهاز مختلف تمامًا. المشكلة: كيف يستدعي برنامج في جهاز A دالة موجودة فعليًا في جهاز B؟ الحل هو مفهوم "الكائن البعيد" (remote object)، وهو كائن يملك واجهة خاصة (remote interface) تحدد الدوال التي يمكن لأي طرف آخر استدعاءها عبر الشبكة.

**لماذا؟** لأن الأنظمة الكبيرة (كالبنوك، محركات البحث) لا يمكن أن تُبنى كبرنامج واحد ضخم يعمل على جهاز واحد؛ يجب تقسيم العمل بين عدة عمليات/أجهزة، وهذا يستلزم آلية اتصال منظمة بينها.

#### 💡 التشبيه:
> تخيل أنك تتصل بمكتب حجوزات في شركة طيران أخرى: أنت لا تدخل مكتبهم فعليًا، بل تتصل هاتفيًا وتطلب "احجز لي مقعدًا" فينفذون هم العملية ويردون عليك بالنتيجة.
> **وجه الشبه:** أنت = الكائن المستدعي (Caller) | موظف الحجز = الكائن البعيد (Remote Object) | الهاتف = بروتوكول الاتصال.

---

### 1.1 طبقات الوسيط البرمجي (Middleware)

#### النص الأصلي يقول:
> "Software that provides a programming model above the basic building blocks of processes and message passing is called middleware... Important aspect of middleware is the provision of location transparency and independence from the details of communication protocols, OS and computer HW and Programming languages."

#### الشرح المبسّط:
الوسيط البرمجي (middleware) هو طبقة برمجية توضع فوق أساسيات الشبكة (العمليات وتمرير الرسائل عبر TCP/UDP) لتقدّم للمبرمج نموذجًا أسهل بكثير — مثل "استدعِ دالة عن بعد وكأنها محلية" بدلاً من التعامل يدويًا مع البايتات والمقابس (sockets).

**لماذا؟** لأن التعامل المباشر مع الشبكة (فتح مقبس، إرسال بايتات، انتظار رد، تفكيك البيانات) معقد جدًا ومتكرر في كل تطبيق؛ الوسيط يقوم بهذا العمل مرة واحدة بشكل عام فيستفيد منه كل التطبيقات.

📊 **المخطط: طبقات الوسيط (Figure 1)**

#### ما هذا المخطط؟
> يوضح كيف تُبنى طبقة الـ RMI/RPC فوق طبقة بروتوكول الطلب-الرد والتمثيل الخارجي للبيانات، وهذه بدورها فوق طبقة UDP/TCP.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Applications, services | layer | طبقة التطبيقات النهائية التي يستخدمها المستخدم |
| 2 | RMI and RPC | layer | طبقة توفر استدعاء الدوال/التوابع عن بعد بشكل شفاف |
| 3 | request-reply protocol | layer | بروتوكول تبادل رسائل الطلب والرد |
| 4 | marshalling and external data representation | layer | تحويل البيانات لصيغة قابلة للإرسال عبر الشبكة |
| 5 | UDP and TCP | layer | بروتوكولات النقل الأساسية |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Applications, services | RMI and RPC | uses | اعتمادية | التطبيق يستدعي RMI/RPC |
| RMI and RPC | request-reply protocol | built over | اعتمادية | RMI/RPC مبني فوق بروتوكول الطلب-الرد |
| request-reply protocol | marshalling | uses | اعتمادية | يستخدم التسلسل لتحضير البيانات |
| marshalling | UDP and TCP | sent over | اعتمادية | يُرسل عبر طبقة النقل |

```diagram
type: flowchart
title: Middleware layers
direction: TD
nodes:
  - id: apps
    label: Applications, services
    kind: layer
    level: 0
  - id: rmi_rpc
    label: RMI and RPC
    kind: layer
    level: 1
  - id: reqrep
    label: request-reply protocol
    kind: layer
    level: 2
  - id: marshal
    label: marshalling and external data representation
    kind: layer
    level: 2
  - id: transport
    label: UDP and TCP
    kind: layer
    level: 3
edges:
  - from: apps
    to: rmi_rpc
  - from: rmi_rpc
    to: reqrep
  - from: reqrep
    to: marshal
  - from: marshal
    to: transport
```

#### مهم للامتحان ⚠️:
> "This chapter" في المخطط الأصلي يشير إلى أن هذا الفصل بالتحديد (طبقة request-reply + marshalling) هو موضوع الدراسة، أما RMI/RPC ستُشرح لاحقًا بالتفصيل فوقها.

---

### 1.2 خصائص الشفافية في الوسيط (Transparency Features)

#### النص الأصلي يقول:
> "Location transparency: In RPCs and RMI, the client calls a procedure/method without knowledge of the location of invoked procedure/method. Transport protocol transparency: E.g., request/reply protocol used to implement RPC can use either UDP or TCP."

#### الشرح المبسّط:
الوسيط يخفي عن المبرمج عدة تفاصيل:
- **شفافية الموقع (Location transparency):** لا يهم أين يقع الكائن البعيد فعليًا (جهاز آخر، مركز بيانات آخر)، تستدعيه بنفس الطريقة.
- **شفافية بروتوكول النقل:** لا يهمك إن كان الاتصال عبر UDP أو TCP.
- **شفافية العتاد (Hardware):** يخفي فروقات ترتيب البايتات (byte ordering) بين المعالجات المختلفة.
- **شفافية نظام التشغيل:** يعمل بغض النظر عن نظام التشغيل المستخدم في كل طرف.
- **شفافية لغة البرمجة:** بعض الوسطاء (مثل CORBA) يسمحون لتطبيقات مكتوبة بلغات مختلفة (Java، C++...) بالتحدث مع بعضها عبر لغة تعريف واجهات (IDL).

**لماذا؟** الهدف النهائي أن يكتب المبرمج كودًا يبدو محليًا تمامًا، بينما تُدار كل تعقيدات التوزيع خلف الكواليس، مما يقلل الأخطاء ويسرّع التطوير.

#### 💡 التشبيه:
> عند استخدام تطبيق توصيل طعام، أنت لا تعرف ولا يهمك أي مطبخ (فرع) سيُجهّز طلبك أو أي شركة توصيل ستحمله.
> **وجه الشبه:** الفرع/شركة التوصيل = موقع الكائن البعيد الفعلي (Location) | التطبيق = طبقة الشفافية.

**🤔 تفعيل الفهم (اسأل نفسك):**
> **سؤال:** ماذا يحدث لو لم تكن هناك شفافية عتاد (byte ordering) بين خادم Intel (little-endian) وخادم SPARC (big-endian)؟
> **لماذا هذا مهم؟** لأن الأرقام قد تُقرأ بترتيب معكوس فتُفسَّر بشكل خاطئ تمامًا، مما يسبب أخطاء منطقية صعبة الاكتشاف.

---

### 2. التمثيل الخارجي للبيانات (External Data Representation)

#### النص الأصلي يقول:
> "The information stored in running programs is represented as data structures, whereas the information in messages consists of sequences of bytes... the data structure must be converted to a sequence of bytes before transmission and rebuilt on arrival."

#### الشرح المبسّط:
داخل البرنامج، البيانات تكون على شكل هياكل بيانات (structs, objects) في الذاكرة. لكن الشبكة لا تفهم إلا سلاسل بايتات متتابعة. لذلك يجب "تسطيح" (flatten) هذه الهياكل إلى تسلسل بايتات قبل الإرسال، وإعادة بنائها من جديد عند الوصول.

**لماذا؟** لأن أجهزة الحاسوب المختلفة قد تُمثّل حتى نفس النوع البسيط (int, float) بطرق مختلفة (ترتيب بايتات، حجم الكلمة)، فيجب الاتفاق على صيغة موحّدة أو الإشارة لصيغة المُرسِل بوضوح.

#### 💡 التشبيه:
> إرسال رسالة صوتية بلغتك الأم لشخص لا يفهمها: يجب أولًا ترجمتها لصيغة (لغة) متفق عليها ليفهمها الطرف الآخر، ثم يعيد هو ترجمتها للغته.
> **وجه الشبه:** لغتك = هيكل البيانات في الذاكرة | الترجمة = Marshalling | فهم المستلم = Unmarshalling.

#### النص الأصلي يقول:
> "Marshalling is the process of taking a collection of data items and assembling them into a form suitable for transmission in a message. Unmarshalling is the process of disassembling a collection of data on arrival to produce an equivalent collection of data items at the destination."

#### الشرح المبسّط:
- **Marshalling (التسلسل):** تجميع البيانات (أرقام، نصوص، كائنات) وتحويلها لتسلسل بايتات جاهز للإرسال.
- **Unmarshalling (فك التسلسل):** إعادة بناء نفس البيانات من تسلسل البايتات عند الوصول.

**الفهم الخاطئ الشائع ❌:** الاعتقاد أن Marshalling يعني فقط "الضغط" (compression).
**الفهم الصحيح ✅:** Marshalling يعني إعادة التمثيل (representation) بشكل قابل للإرسال، وليس بالضرورة تصغير الحجم.

---

### 2.1 ثلاثة أساليب للتمثيل الخارجي

#### النص الأصلي يقول:
> "CORBA's common data representation... Java's object serialization... which is for use only by Java. XML which defines a textual format for representing structured data. CORBA's representation includes just the values of the objects transmitted, and nothing about their types. On the other hand, both Java serialization and XML do include type information."

#### الشرح المبسّط:
| الأسلوب | من يستخدمه | يتضمن معلومات النوع؟ | ملاحظة |
| --- | --- | --- | --- |
| `CORBA CDR` | أي لغة عبر IDL | ❌ لا (قيم فقط) | عام بين اللغات |
| `Java Serialization` | Java فقط | ✅ نعم | مرتبط بلغة واحدة |
| `XML` | أي نظام | ✅ نعم (نصي) | صيغة نصية قابلة للقراءة البشرية |

**لماذا؟** إرسال معلومات النوع (type info) يجعل فك التسلسل أسهل وأكثر أمانًا (تحقق من التوافق)، لكنه يزيد حجم الرسالة؛ بينما عدم إرسالها (كما في CORBA) يجعل الرسالة أخف لكنه يتطلب اتفاقًا مسبقًا صارمًا على الأنواع بين الطرفين.

#### مهم للامتحان ⚠️:
> Marshalling وUnmarshalling عادة ما تُنفَّذ تلقائيًا بواسطة طبقة الوسيط، وليس يدويًا من المبرمج.

---

### 3. بروتوكولات الطلب-الرد (Request-reply protocols)

#### النص الأصلي يقول:
> "In the normal case, request-reply communication is synchronous because the client process blocks until the reply arrives from the server. It is reliable because the reply from the server is effectively an acknowledgement to the client."

#### الشرح المبسّط:
هذا النمط من الاتصال هو الأساس لبناء التفاعل بين عميل (client) وخادم (server): العميل يرسل طلبًا وينتظر (يُحجب - blocks) حتى يصله الرد. كون الرد يصل يُعتبر بحد ذاته تأكيدًا (acknowledgement) على أن الطلب وصل ونُفّذ، لذلك لا حاجة لتأكيد منفصل على مستوى النقل.

**لماذا؟** لأن أغلب تفاعلات العميل-الخادم (مثل: "اجلب لي هذا الملف") هي بطبيعتها متزامنة: العميل لا يمكنه أن يكمل عمله قبل معرفة النتيجة.

📊 **المخطط: Request-reply communication (Figure 2)**

#### ما هذا المخطط؟
> يوضح تدفق الرسائل بين العميل والخادم عبر ثلاث عمليات أساسية: doOperation، getRequest، sendReply.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Client - doOperation | process | العميل يبدأ الطلب وينتظر |
| 2 | Server - getRequest | process | الخادم يستقبل الطلب |
| 3 | Server - select object / execute method | process | الخادم ينفذ العملية المطلوبة |
| 4 | Server - sendReply | process | الخادم يرسل الرد |
| 5 | Client - continuation | process | العميل يستأنف عمله بعد استلام الرد |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Client doOperation | Server getRequest | Request message | إرسال | رسالة الطلب تحمل معرف الكائن والعملية والمعاملات |
| Server sendReply | Client continuation | Reply message | إرسال | رسالة الرد تحمل النتيجة |

```diagram
type: flowchart
title: Request-reply communication
direction: TD
nodes:
  - id: client_do
    label: doOperation (Client)
    kind: process
    level: 0
  - id: server_get
    label: getRequest (Server)
    kind: process
    level: 1
  - id: server_exec
    label: select object / execute method
    kind: process
    level: 1
  - id: server_reply
    label: sendReply (Server)
    kind: process
    level: 1
  - id: client_cont
    label: continuation (Client)
    kind: process
    level: 0
edges:
  - from: client_do
    to: server_get
    label: Request message
  - from: server_get
    to: server_exec
  - from: server_exec
    to: server_reply
  - from: server_reply
    to: client_cont
    label: Reply message
```

---

### 3.1 العمليات الأساسية الثلاث

#### النص الأصلي يقول:
> "public byte[] doOperation (RemoteObjectRef o, int methodId, byte[] arguments) — sends a request message to the remote object and returns the reply... public byte[] getRequest(); — acquires a client request via the server port... public void sendReply (byte[] reply, InetAddress clientHost, int clientPort); — sends the reply message reply to the client at its Internet address and port."

#### الشرح المبسّط:
- `doOperation`: تُستدعى من جانب العميل. تُرسل رسالة الطلب (تحتوي مرجع الكائن، رقم الدالة، والمعاملات) وتنتظر الرد.
- `getRequest`: تُستدعى من جانب الخادم للحصول على طلب وارد من أحد العملاء عبر منفذ (port) الخادم.
- `sendReply`: تُستدعى من جانب الخادم لإرسال الرد إلى عنوان العميل ومنفذه.

⚙️ **الخطوات / الخوارزمية: تسلسل تنفيذ الطلب-الرد**

#### ما هدف هذه العملية؟
> تنفيذ استدعاء بعيد كامل من طلب العميل حتى استلامه الرد.

```algorithm
1 | العميل يستدعي | doOperation | يُبنى الطلب (كائن، دالة، معاملات) ويُرسل ثم ينتظر
2 | الخادم يستقبل | getRequest | يستخرج الطلب الوارد من منفذ الخادم
3 | الخادم ينفذ | select object + execute method | يحدد الكائن المطلوب وينفذ الدالة المطلوبة عليه
4 | الخادم يرد | sendReply | يرسل النتيجة إلى عنوان ومنفذ العميل
5 | العميل يستأنف | doOperation يعود بالنتيجة | العميل يستكمل تنفيذه بالنتيجة المستلمة
```

#### نقاط التنفيذ:
- إذا لم يصل الرد خلال فترة زمنية (timeout)، فقد يُعاد إرسال الطلب حسب دلالات الاستدعاء المختارة.
- لا حاجة لتأكيد منفصل على مستوى TCP لأن الرد نفسه يُعتبر تأكيدًا.

---

### 3.2 بنية رسالة الطلب/الرد (Figure 4)

#### النص الأصلي يقول:
> "messageType: int (0=Request, 1=Reply) | requestId: int | objectReference: RemoteObjectRef | methodId: int or Method | arguments: array of bytes"

#### الشرح المبسّط:
كل رسالة طلب أو رد تحمل الحقول التالية:

| الحقل | النوع | الوظيفة |
| --- | --- | --- |
| `messageType` | `int` | يحدد هل الرسالة طلب (0) أم رد (1) |
| `requestId` | `int` | معرف فريد للطلب لمطابقة الرد به لاحقًا |
| `objectReference` | `RemoteObjectRef` | يحدد الكائن البعيد المستهدف |
| `methodId` | `int or Method` | يحدد الدالة/التابع المطلوب تنفيذه |
| `arguments` | `array of bytes` | المعاملات بعد Marshalling |

**لماذا؟** بدون `requestId` لن يستطيع العميل معرفة أي رد يخص أي طلب، خصوصًا عند وجود عدة طلبات متزامنة أو عند إعادة الإرسال بسبب فقدان الرسائل.

---

### 3.3 معرّف الرسالة (Message Identifier)

#### النص الأصلي يقول:
> "A message identifier consists of two parts: A requestId... An identifier for the sender process, for example its port and Internet address... unique in the distributed system"

#### الشرح المبسّط:
لكي يكون معرّف الرسالة فريدًا على مستوى **كل** النظام الموزع (وليس فقط داخل عملية واحدة)، يُركَّب من جزأين:
1. `requestId` تسلسلي متزايد يُنشئه المُرسل.
2. معرّف العملية المُرسِلة نفسها (عنوان IP + رقم المنفذ Port).

بدمج الاثنين، نحصل على معرّف فريد عالميًا حتى لو استخدمت عمليتان مختلفتان نفس رقم `requestId`.

#### 💡 التشبيه:
> رقم الطلب في مطعم توصيل ليس كافيًا وحده (قد يتكرر رقم "5" كل يوم)، لكن دمج "رقم الطلب + رقم الفرع" يجعله فريدًا فعليًا.
> **وجه الشبه:** رقم الطلب = requestId | رقم الفرع = عنوان العملية المرسِلة.

---

### 3.4 نموذج الفشل (Failure Model)

#### النص الأصلي يقول:
> "If the three primitive doOperation, getRequest, and sendReply are implemented over UDP datagram, they have the same communication failures. Omission failure — Messages are not guaranteed to be delivered in sender order. Failure of processes. Timeouts. Discarding duplicate request. Lost reply message. History"

#### الشرح المبسّط:
عند بناء بروتوكول الطلب-الرد فوق UDP (الذي لا يضمن التسليم ولا الترتيب)، تظهر عدة مشاكل يجب معالجتها:
- **فشل الحذف (Omission failure):** قد تُفقد رسالة الطلب أو الرد أو تصل بترتيب غير مرسَل.
- **فشل العمليات:** قد يتعطل الخادم أثناء المعالجة.
- **المهلات الزمنية (Timeouts):** يحتاج العميل لآلية انتظار محدودة بدلًا من الانتظار للأبد.
- **تصفية التكرار (Duplicate filtering):** إن أُعيد إرسال نفس الطلب، يجب على الخادم معرفة أنه مكرر.
- **فقدان رسالة الرد:** يجب معالجة الحالة التي تصل فيها رسالة الطلب لكن يضيع الرد.
- **السجل (History):** الاحتفاظ بآخر النتائج لإعادة إرسالها دون إعادة التنفيذ.

**لماذا؟** لأن UDP بسيط وسريع لكنه "غير موثوق" (unreliable)، فمسؤولية الموثوقية تنتقل بالكامل إلى طبقة بروتوكول الطلب-الرد نفسها.

#### النص الأصلي يقول:
> "doOperation uses a timeout when it is waiting to get the server's reply message... doOperation sends the request message repeatedly until either it gets a reply or it is reasonably sure that the delay is due to lack of response from the server rather than to lost messages."

#### الشرح المبسّط:
عند انتهاء المهلة (timeout) دون رد، هناك خياران:
1. الفشل الفوري: تُرجع `doOperation` فشلًا للعميل مباشرة.
2. إعادة الإرسال: تُرسَل رسالة الطلب مرة أخرى، وقد يستقبلها الخادم أكثر من مرة، مما قد يسبب تنفيذ العملية أكثر من مرة لنفس الطلب — لذا يجب على البروتوكول تمييز الرسائل المكررة (بنفس requestId) وتجاهلها.

#### النص الأصلي يقول:
> "A server whose operations are all idempotent need not take special measures to avoid executing its operations more than once... For servers that require retransmission of replies without re-execution of operations, a history may be used. An entry in a history contains a request identifier, a message and an identifier of the client..."

#### الشرح المبسّط:
- **العمليات المتحايدة (Idempotent):** عملية يمكن تكرارها عدة مرات بنفس النتيجة (مثل: "اضبط الرصيد = 100"). هذه لا تحتاج حماية خاصة من التكرار.
- **السجل (History):** إذا كانت العملية **غير** متحايدة (مثل: "أضف 100 للرصيد")، يجب حفظ نتيجة كل طلب سابق في سجل، بحيث عند وصول طلب مكرر يُعاد إرسال نفس النتيجة المحفوظة بدلًا من إعادة التنفيذ. مشكلة السجل: تكلفة الذاكرة، لذا يُكتفى عادة بحفظ آخر رد لكل عميل ويُحذف بعد فترة.

#### الفهم الخاطئ الشائع ❌: كل العمليات يمكن إعادة تنفيذها بأمان.
#### الفهم الصحيح ✅: فقط العمليات المتحايدة (idempotent) آمنة لإعادة التنفيذ التلقائي؛ غيرها يحتاج سجل أو تصفية تكرار.

---

### 3.5 أنماط بروتوكولات التبادل (Figure 5)

#### النص الأصلي يقول:
> "The request (R) protocol. The request-reply (RR) protocol. The request-reply-acknowledge (RRA) protocol."

#### الشرح المبسّط:

| البروتوكول | الرسائل المُرسَلة | متى يُستخدم |
| --- | --- | --- |
| `R` | Request فقط (من العميل) | عندما لا توجد قيمة يجب إرجاعها |
| `RR` | Request ثم Reply | الأكثر شيوعًا لتفاعلات عميل-خادم العادية |
| `RRA` | Request ثم Reply ثم Acknowledge reply | عندما يحتاج الخادم تأكيدًا بأن الرد وصل (خصوصًا فوق UDP) |

**لماذا؟** `R` يوفر النطاق الترددي عندما لا نهتم بالنتيجة (fire-and-forget)، بينما `RRA` يضيف طبقة أمان إضافية للتأكد أن الرد فعلًا وصل للعميل، على حساب رسالة إضافية.

⚖️ **المقايضة: RR مقابل RRA**

| | RR | RRA |
| --- | --- | --- |
| المزايا | أخف، رسالتان فقط | يضمن معرفة الخادم بوصول الرد |
| العيوب | الخادم لا يعرف هل وصل الرد فعلًا | رسالة إضافية = نفقات إضافية |
| متى تختاره | تفاعلات بسيطة عادية | حين يحتاج الخادم التخلص من السجل بأمان بعد تأكيد الاستلام |

---

### 4. استدعاء الإجراء عن بعد (Remote Procedure Call - RPC)

#### النص الأصلي يقول:
> "A remote procedure call (RPC) is similar to a remote method invocation (RMI). A client program calls a procedure in another program running in a server process. The underlying RPC system then hides important aspects of distribution, including the encoding and decoding of parameters and results. RPC is generally implemented over a request-reply protocol."

#### الشرح المبسّط:
RPC يسمح للعميل باستدعاء إجراء (procedure) موجود فعليًا في عملية خادم بعيدة، وكأنه إجراء محلي عادي. النظام الذي ينفذ RPC يتكفل بترميز/فك ترميز المعاملات والنتائج، وعادة ما يُبنى فوق بروتوكول الطلب-الرد الذي شرحناه سابقًا.

**لماذا؟** لأن الاستدعاء عبر الشبكة يدويًا (بناء الرسالة، الإرسال، الانتظار، فك الرد) مرهق ومتكرر؛ RPC يجعل الاستدعاء البعيد يبدو مطابقًا تمامًا لاستدعاء دالة عادية في نفس اللغة.

---

### 4.1 الواجهات (Interfaces) في RPC

#### النص الأصلي يقول:
> "An Interface specifies the procedures and the variables that can be accessed and hides all implementation details... The term service interface is used to refer to the specification of the procedures offered by a server."

#### الشرح المبسّط:
البرامج تُنظَّم كوحدات (modules)، وكل وحدة تُعرّف واجهة (interface) توضح ما يمكن للوحدات الأخرى استدعاءه، وتُخفي التفاصيل الداخلية. في الأنظمة الموزعة، هذه الواجهة تسمى **واجهة الخدمة (service interface)**، وتحدد الإجراءات المتاحة للعملاء عبر الشبكة.

**لماذا؟** لأنه في النظام الموزع لا يمكن الوصول المباشر للمتغيرات البعيدة؛ كل تفاعل يجب أن يمر عبر إجراءات محددة صراحة في الواجهة، باستخدام تمرير الرسائل (message passing) عبر بروتوكولات الطلب-الرد.

#### النص الأصلي يقول:
> "Interface definition languages (IDLs) are designed to allow procedures implemented in different languages to invoke one another. An IDL provides a notation for defining interfaces in which each of the parameters of an operation may be described as for input or output... Sun XDR as an example of an IDL for RPC"

#### الشرح المبسّط:
لغات تعريف الواجهات (`IDL`) تسمح لإجراءات مكتوبة بلغات برمجة مختلفة أن تتفاهم مع بعضها. تصف كل معامل في العملية إن كان مُدخلًا (input) أو مُخرجًا (output) مع نوعه. مثال: `Sun XDR`.

---

### 4.2 دلالات الاستدعاء (RPC Call Semantics)

#### النص الأصلي يقول:
> "Retry request message: Controls whether to retransmit the request message until either a reply is received or the server is assumed to have failed. Duplicate filtering: Controls when retransmissions are used and whether to filter out duplicate requests at the server. Retransmission of results: Controls whether to keep a history of result messages to enable lost results to be retransmitted without re-executing."

#### الشرح المبسّط:
هناك ثلاثة خيارات تصميمية تحدد "دلالة" الاستدعاء البعيد (كم مرة سيُنفَّذ فعليًا):
1. إعادة إرسال الطلب أم لا؟
2. تصفية التكرار عند الخادم أم لا؟
3. إعادة إرسال النتيجة من سجل محفوظ أم إعادة التنفيذ بالكامل؟

📊 **جدول تركيبات الدلالات (Figure 6):**

| Retransmit request | Duplicate filtering | Re-execute / Retransmit reply | Invocation semantics |
| --- | --- | --- | --- |
| No | Not applicable | Not applicable | `Maybe` |
| Yes | No | Re-execute procedure | `At-least-once` |
| Yes | Yes | Retransmit reply | `At-most-once` |

#### الشرح المبسّط لكل دلالة:

**Maybe (ربما):**
- للمستدعي: تُنفَّذ مرة واحدة، أو لا تُنفَّذ إطلاقًا.
- تظهر عندما لا تُطبَّق أي إجراءات تحمّل أخطاء (fault tolerance).
- تعاني من: (1) فقدان الرسالة؛ (2) تعطل الخادم.
- مفيدة للتطبيقات التي تتقبل فشل استدعاء بين حين وآخر.

**At-least-once (مرة واحدة على الأقل):**
- للمستدعي: تُنفَّذ مرة واحدة على الأقل، أو يُرجَع استثناء.
- تعاني من: (1) تعطل الخادم؛ (2) فشل تعسفي (arbitrary failure) في حال الدوال غير المتحايدة (non-idempotent) — قد تُنفَّذ أكثر من مرة!

**At-most-once (مرة واحدة على الأكثر):**
- للمستدعي: يستلم النتيجة، أو يُرجَع استثناء.
- تمنع فشل الحذف (omission) عبر إعادة المحاولة، مع تصفية التكرار لضمان عدم إعادة التنفيذ.

#### مهم للامتحان ⚠️:
> `At-most-once` هي الأكثر أمانًا للعمليات غير المتحايدة (مثل: "أضف 100 دولار")، لأنها تضمن عدم التنفيذ المزدوج.

#### 🔍 تتبع التنفيذ: مقارنة الدلالات مع دالة "سحب 100$ من الحساب" (غير متحايدة)

**المدخل:** رسالة الطلب تصل للخادم لكن رسالة الرد تُفقد أثناء عودتها للعميل.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحت `Maybe` | العميل لا يعيد الإرسال؛ لا يعرف هل تم السحب أم لا |
| 2 | تحت `At-least-once` بدون تصفية | العميل يعيد الإرسال، فقد يُسحَب المبلغ مرتين! |
| 3 | تحت `At-most-once` مع تصفية وسجل | العميل يعيد الإرسال، الخادم يكتشف التكرار عبر requestId ويعيد إرسال الرد المحفوظ فقط دون سحب إضافي |

**النتيجة:** فقط `At-most-once` يضمن سحب المبلغ مرة واحدة بالضبط في هذا السيناريو.

---

### 4.3 تنفيذ RPC (Implementation of RPC)

#### النص الأصلي يقول:
> "Service interface: the procedures that are available for remote calling. Building blocks: Communication module... Client stub procedure... Dispatcher: select one of the server stub procedures. Server stub procedure (as skeleton in RMI)... The client and server stub procedures and the dispatcher can be generated automatically by an interface compiler from the IDL of service."

#### الشرح المبسّط:
لتنفيذ RPC نحتاج مكونات بناء أساسية:

| المكون | الوظيفة |
| --- | --- |
| `Communication module` | ينفذ دلالات الاستدعاء المطلوبة (إعادة إرسال، تصفية تكرار، إعادة إرسال نتيجة) |
| `Client stub procedure` | إجراء محلي يبدو للعميل وكأنه الإجراء الحقيقي؛ يقوم بالـ Marshalling والإرسال وفك التسلسل للرد |
| `Dispatcher` | يختار إجراء الـ stub المناسب في الخادم بناءً على معرّف الإجراء |
| `Server stub procedure` | يفك تسلسل الطلب، يستدعي إجراء الخدمة الفعلي، ثم يُسلسِل النتيجة (مشابه لـ skeleton في RMI) |

**لماذا؟** فصل هذه المسؤوليات يسمح بتوليدها تلقائيًا (بواسطة "مترجم واجهة" - interface compiler) من ملف الـ IDL، بدلًا من كتابتها يدويًا لكل خدمة.

📊 **المخطط: بنية تنفيذ RPC (Figure 7)**

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | client program | process | البرنامج الذي يستدعي الإجراء البعيد |
| 2 | client stub procedure | component | يُسلسل الطلب ويرسله |
| 3 | Communication module (client) | component | يرسل/يستقبل الرسائل |
| 4 | Communication module (server) | component | يستقبل الطلب ويرسل الرد |
| 5 | dispatcher | component | يختار server stub المناسب |
| 6 | server stub procedure | component | يفك تسلسل الطلب وينادي الإجراء الفعلي |
| 7 | service procedure | process | الإجراء الفعلي المنفذ للخدمة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| client program | client stub procedure | local call | استدعاء محلي | يبدو للعميل كاستدعاء عادي |
| client stub procedure | Communication module (client) | send | إرسال | يرسل الرسالة المُسلسَلة |
| Communication module (client) | Communication module (server) | Request | شبكة | رسالة الطلب عبر الشبكة |
| Communication module (server) | dispatcher | forward | تمرير | يمرر الطلب للموزع |
| dispatcher | server stub procedure | select | اختيار | يختار stub الصحيح حسب methodId |
| server stub procedure | service procedure | call | استدعاء | ينفذ الإجراء الفعلي |
| Communication module (server) | Communication module (client) | Reply | شبكة | رسالة الرد |

```diagram
type: flowchart
title: RPC Implementation
direction: LR
nodes:
  - id: client_prog
    label: client program
    kind: process
    level: 0
  - id: client_stub
    label: client stub procedure
    kind: component
    level: 1
  - id: comm_client
    label: Communication module (client)
    kind: component
    level: 2
  - id: comm_server
    label: Communication module (server)
    kind: component
    level: 2
  - id: dispatcher
    label: dispatcher
    kind: component
    level: 3
  - id: server_stub
    label: server stub procedure
    kind: component
    level: 4
  - id: service_proc
    label: service procedure
    kind: process
    level: 5
edges:
  - from: client_prog
    to: client_stub
    label: local call
  - from: client_stub
    to: comm_client
  - from: comm_client
    to: comm_server
    label: Request
  - from: comm_server
    to: dispatcher
  - from: dispatcher
    to: server_stub
  - from: server_stub
    to: service_proc
  - from: comm_server
    to: comm_client
    label: Reply
```

#### النص الأصلي يقول:
> "RPC only addresses procedure calls. RPC is not concerned with objects and object references. A client stub procedure is similar to a proxy method of RMI... A server stub procedure is similar to a skeleton method of RMI."

#### الشرح المبسّط:
هذه نقطة تمييز مهمة: RPC يتعامل مع **إجراءات (procedures)** فقط، وليس مع كائنات (objects) أو مراجع كائنات (object references). هذا هو الفرق الجوهري بينه وبين RMI الذي سنشرحه لاحقًا (والذي يتعامل مع كائنات كاملة ومراجعها).

⚙️ **الخطوات / الخوارزمية: تنفيذ استدعاء RPC كامل**

#### ما هدف هذه العملية؟
> توضيح رحلة استدعاء إجراء بعيد من العميل حتى تنفيذه في الخادم والعودة بالنتيجة.

```algorithm
1 | العميل ينادي | client stub | يُسلسل معرّف الإجراء والمعاملات في رسالة طلب
2 | إرسال | Communication module (client) | يرسل الرسالة عبر الشبكة إلى الخادم
3 | استقبال | Communication module (server) | يستقبل الطلب ويمرره للموزع
4 | اختيار | dispatcher | يختار server stub المناسب حسب procedure identifier
5 | تنفيذ | server stub | يفك تسلسل المعاملات وينادي إجراء الخدمة، ثم يُسلسل النتيجة
6 | إرسال الرد | Communication module (server) | يرسل رسالة الرد للعميل
7 | استلام | client stub | يفك تسلسل النتيجة ويعيدها للبرنامج المستدعي
```

#### نقاط التنفيذ:
- الـ stubs والـ dispatcher يمكن توليدها تلقائيًا من IDL باستخدام مترجم واجهة.
- مثال تطبيقي شهير: `Sun RPC`.

---

### 5. استدعاء التابع عن بعد (Remote Method Invocation - RMI)

#### النص الأصلي يقول:
> "Remote method invocation (RMI) is closely related to RPC but extended into the world of distributed objects. In RMI, a calling object can invoke a method in a potentially remote object."

#### الشرح المبسّط:
RMI هو امتداد لفكرة RPC لكن في عالم البرمجة كائنية التوجه (OOP): بدلًا من استدعاء إجراء بسيط، يستدعي كائن (object) تابعًا (method) في كائن آخر قد يكون بعيدًا. هذا يسمح بنقل مفاهيم OOP (وراثة، تغليف، واجهات) إلى البيئة الموزعة.

سنشرح RMI ضمن أربعة محاور: نموذج الكائن (Object model)، الكائنات الموزعة، نموذج الكائن الموزع، والتنفيذ.

---

### 5.1 نموذج الكائن (The Object Model)

#### النص الأصلي يقول:
> "An object-oriented program consists of a collection of interacting objects, each of which consists of a set of data and a set of methods. An object communicates with other objects by invoking their methods... Object references: Objects can be accessed via object references."

#### الشرح المبسّط:
البرنامج كائني التوجه هو مجموعة كائنات متفاعلة، كل كائن يضم بيانات (data/state) وتوابع (methods). الكائنات تتواصل عبر استدعاء توابع بعضها البعض، مُمرّرةً معاملات ومستقبلةً نتائج. للوصول لكائن، يجب امتلاك **مرجع الكائن** (object reference) الخاص به.

#### النص الأصلي يقول:
> "Interfaces: A definition of the signatures of a set of methods. A class can implement several interfaces, e.g. Java. Actions: Initiated by an object invoking a method in another object. Two affects: Change the state of the receiver; Further invocations on methods in other objects. Garbage collection: Freeing the space occupied by cancelled objects. C++: collected by programmers. Java: collected by JVM."

#### الشرح المبسّط:
| المفهوم | الشرح |
| --- | --- |
| `Interfaces` | تحدد تواقيع (signatures) مجموعة توابع؛ الصنف (class) الواحد قد يُنفّذ عدة واجهات (كما في Java) |
| `Actions` | يبدأها استدعاء تابع، وقد يُغيّر حالة الكائن المُستقبِل أو يستدعي كائنات أخرى بدوره (سلسلة استدعاءات) |
| `Garbage collection` | تحرير الذاكرة من الكائنات غير المُستخدَمة؛ في C++ يديرها المبرمج يدويًا، وفي Java تديرها الآلة الافتراضية (JVM) تلقائيًا |

---

### 5.2 الكائنات الموزعة (Distributed Objects)

#### النص الأصلي يقول:
> "The state of an object consists of the values of its instance variables. In the object-based paradigm the state of a program is partitioned into separate parts, each of which is associated with an object. Since object-based programs are logically partitioned, the physical distribution of objects into different processes or computers in a distributed system is a natural extension"

#### الشرح المبسّط:
بما أن حالة البرنامج مقسّمة منطقيًا بين الكائنات أصلًا (كل كائن له حالته الخاصة)، فمن الطبيعي توزيع هذه الكائنات فعليًا على عمليات أو أجهزة مختلفة — هذا هو جوهر فكرة "الكائن الموزع".

**لماذا؟** لأن OOP يفصل الحالة والسلوك أصلًا داخل حدود واضحة (الكائن)، فتوزيع هذه الحدود فعليًا على الشبكة يكون امتدادًا طبيعيًا دون كسر النموذج البرمجي.

📊 **المخطط: نموذج الكائن الموزع (Figure 8)**

#### ما هذا المخطط؟
> يوضح كيف تتوزع الكائنات A إلى F عبر عمليات مختلفة، وبعضها (B، F) يستقبل استدعاءات محلية وبعيدة معًا بينما الباقي يستقبل استدعاءات محلية فقط.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| A | Object A | object | كائن محلي في عمليته |
| B | Object B (remote object) | object | كائن بعيد، يملك واجهة بعيدة، يستقبل استدعاءات من A |
| C | Object C | object | كائن محلي يستدعي E |
| D | Object D | object | كائن محلي |
| E | Object E | object | كائن يُستدعى محليًا من C |
| F | Object F (remote object) | object | كائن بعيد آخر |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| A | B | remote invocation | بعيد | A يحتاج مرجع كائن بعيد لـ B |
| C | E | local invocation | محلي | داخل نفس العملية |
| D | F | remote invocation | بعيد | استدعاء بعيد آخر |

```diagram
type: flowchart
title: Distributed object model
direction: LR
nodes:
  - id: A
    label: A
    kind: object
    level: 0
  - id: B
    label: B (remote object)
    kind: object
    level: 1
  - id: C
    label: C
    kind: object
    level: 0
  - id: D
    label: D
    kind: object
    level: 0
  - id: E
    label: E
    kind: object
    level: 1
  - id: F
    label: F (remote object)
    kind: object
    level: 1
edges:
  - from: A
    to: B
    label: remote invocation
  - from: C
    to: E
    label: local invocation
  - from: D
    to: F
    label: remote invocation
```

#### النص الأصلي يقول:
> "objects need to know the object reference of an object in order to invoke its methods. E.g. C must have a reference to E. Remote object references: objects can invoke the methods of a remote object if they have access to its remote object reference. E.g. a remote object reference for B must be available to A. Remote interface specifies the methods of and object that are available for invocation by other objects in other processes. E.g. B and F must have remote interfaces"

#### الشرح المبسّط:
- يجب أن يمتلك الكائن المستدعي مرجع الكائن المستهدف (سواء محلي أو بعيد).
- الكائنات البعيدة تحديدًا (`B`، `F`) يجب أن تُعرّف **واجهة بعيدة (remote interface)** توضح فقط الدوال المسموح استدعاؤها من عمليات أخرى.

---

### 5.3 نموذج الكائن الموزع: مفهومان أساسيان

#### النص الأصلي يقول:
> "Remote object reference: An unique identifier in a distributed system refer to a particular unique remote object. May be passed as arguments and results of remote method invocation. Remote interface: remote object class implements the methods of its remote interface. Objects in other processes can invoke only the methods that belong to its remote interface. Local objects can invoke the methods in the remote interface as well as other methods implemented by a remote object."

#### الشرح المبسّط:
| المفهوم | الشرح |
| --- | --- |
| `Remote object reference` | معرّف فريد على مستوى كامل النظام الموزع يُشير لكائن بعيد محدد؛ يمكن تمريره كمعامل أو كنتيجة استدعاء آخر |
| `Remote interface` | الكائنات في عمليات أخرى **لا يمكنها** استدعاء إلا التوابع المُعرَّفة في الواجهة البعيدة؛ أما الكائنات المحلية (في نفس العملية) فيمكنها استدعاء أي تابع آخر أيضًا (ليس فقط الواجهة البعيدة) |

#### مهم للامتحان ⚠️:
> الكائن المحلي (الموجود في نفس عملية الكائن البعيد) يملك حرية أكبر ويمكنه استدعاء توابع لا تظهر في الواجهة البعيدة، بعكس الكائنات القادمة من عمليات أخرى.

---

### 5.4 الأفعال، الاستثناءات، وجمع القمامة في السياق الموزع

#### النص الأصلي يقول:
> "Actions in a distributed system: An action is initiated by a method invocation which may result in further invocations on methods in other objects... in the distributed case, the objects involved in a chain of related invocations may be located in different processes or different computers. RMI is used, and the remote reference of the object must be available to the invoker."

#### الشرح المبسّط:
سلسلة الاستدعاءات (action) قد تمتد عبر عدة عمليات وأجهزة مختلفة. لكي يستدعي كائن A كائنًا بعيدًا B، يجب أن يكون مرجع B البعيد متاحًا مسبقًا لـ A — وقد يحصل عليه A كنتيجة استدعاء سابق (كما في المثال: A قد يحصل على مرجع لـ F من خلال B).

#### النص الأصلي يقول:
> "Garbage collection: Distributed garbage collection is generally achieved by cooperation between the existing local garbage collector and an added module. Usually based on reference counting. Exception: Any remote invocation may fail for reasons related to the invoked object being in a different process or computer from the invoker. notify the client and the client handle exceptions"

#### الشرح المبسّط:
- **جمع القمامة الموزع:** يتم بالتعاون بين جامع القمامة المحلي في كل عملية ووحدة إضافية تتعقب المراجع عبر الشبكة، عادة عبر **عدّ المراجع (reference counting)**.
- **الاستثناءات الموزعة:** أي استدعاء بعيد قد يفشل لأسباب مرتبطة بكون الكائن في عملية/جهاز مختلف (مثل: انقطاع الشبكة، تعطل الخادم)؛ يجب إعلام العميل بهذه الحالات ليتعامل معها عبر آلية استثناءات.

📊 **جدول ملخص التوسعة من الكائنات المحلية للموزعة (Figure 9)**

| Objects | Distributed objects | Description of distributed object |
| --- | --- | --- |
| `Object references` | `Remote object references` | معرّف فريد عالميًا لكائن موزع؛ يمكن تمريره كمعامل |
| `Interfaces` | `Remote interfaces` | تحدد التوابع القابلة للاستدعاء بعيدًا، تُعرَّف عبر IDL |
| `Actions` | `Distributed actions` | سلسلة استدعاءات قد تمتد عبر آلات مختلفة عبر RMI |
| `Exceptions` | `Distributed exceptions` | استثناءات إضافية ناتجة عن طبيعة النظام الموزع (فقد رسالة، تعطل عملية) |
| `Garbage collection` | `Distributed garbage collection` | يبقي الكائن حيًا طالما يوجد مرجع محلي أو بعيد له؛ يحتاج خوارزمية موزعة خاصة |

---

### 5.5 تنفيذ RMI (Implementation of RMI)

#### النص الأصلي يقول:
> "Several separate objects and modules are involved in achieving a remote method invocation... an application-level object A invokes a method in a remote application-level object B for which it holds a remote object reference."

#### الشرح المبسّط:
لإنجاز استدعاء RMI، تتدخل عدة مكونات بين كائن التطبيق A وكائن التطبيق البعيد B.

📊 **المخطط: بنية تنفيذ RMI (Figure 10)**

#### ما هذا المخطط؟
> يوضح المسار الكامل من كائن A حتى كائن B عبر proxy، remote reference module، communication module، dispatcher، وskeleton.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | object A | process | الكائن المستدعي |
| 2 | proxy for B | component | يمثّل B محليًا لدى A |
| 3 | Remote reference module (client) | component | يترجم بين المراجع المحلية والبعيدة |
| 4 | Communication module (client) | component | يرسل/يستقبل الرسائل |
| 5 | Communication module (server) | component | يستقبل الطلب ويرسل الرد |
| 6 | Remote reference module (server) | component | يترجم المراجع في جهة الخادم |
| 7 | dispatcher | component | يختار التابع الصحيح في skeleton |
| 8 | skeleton for B's class | component | ينفذ فك التسلسل ويستدعي التابع الفعلي في B |
| 9 | object B | process | الكائن البعيد الفعلي |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| object A | proxy for B | local call | استدعاء محلي | A يستدعي proxy كأنه B نفسه |
| proxy for B | Remote reference module (client) | translate | ترجمة | تحويل المرجع المحلي إلى بعيد |
| Communication module (client) | Communication module (server) | Request | شبكة | إرسال الطلب |
| Remote reference module (server) | dispatcher | forward | تمرير | تمرير الطلب بعد ترجمة المرجع |
| dispatcher | skeleton | select and invoke | اختيار | يستدعي تابع skeleton المناسب |
| skeleton | object B | call | استدعاء | ينفذ التابع الفعلي على B |

```diagram
type: flowchart
title: RMI Implementation
direction: LR
nodes:
  - id: objA
    label: object A (client)
    kind: process
    level: 0
  - id: proxy
    label: proxy for B
    kind: component
    level: 1
  - id: rrm_client
    label: Remote reference module (client)
    kind: component
    level: 2
  - id: comm_client
    label: Communication module (client)
    kind: component
    level: 3
  - id: comm_server
    label: Communication module (server)
    kind: component
    level: 3
  - id: rrm_server
    label: Remote reference module (server)
    kind: component
    level: 2
  - id: dispatcher
    label: dispatcher
    kind: component
    level: 4
  - id: skeleton
    label: skeleton for B's class
    kind: component
    level: 5
  - id: objB
    label: object B (server)
    kind: process
    level: 6
edges:
  - from: objA
    to: proxy
    label: local call
  - from: proxy
    to: rrm_client
  - from: rrm_client
    to: comm_client
  - from: comm_client
    to: comm_server
    label: Request
  - from: comm_server
    to: rrm_server
  - from: rrm_server
    to: dispatcher
  - from: dispatcher
    to: skeleton
  - from: skeleton
    to: objB
  - from: comm_server
    to: comm_client
    label: Reply
```

---

### 5.6 مكونات RMI بالتفصيل

#### النص الأصلي يقول:
> "Communication module: Request/reply between client and server. The communication modules are together responsible for providing a specified invocation semantics, for example at-most-once. The communication module in the server select dispatcher at server side. Remote reference module: Translate between local and remote object reference. Create remote object reference. Remote object table"

#### الشرح المبسّط:
- **Communication module:** ينفذ بروتوكول الطلب-الرد بين العميل والخادم، ويضمن دلالة الاستدعاء المطلوبة (مثل `at-most-once`).
- **Remote reference module:** يترجم بين المراجع المحلية (proxies) والمراجع البعيدة، وينشئ مراجع بعيدة جديدة عند الحاجة، بالاعتماد على **جدول الكائنات البعيدة (Remote object table)**.

#### النص الأصلي يقول:
> "Remote object table: entries for remote objects held by the process... entries for local proxies... When a remote object is to be passed as an argument or a result for the first time, the remote reference module is asked to create a remote object reference, which it adds to its table. When a remote object reference arrives in a request or reply message, the remote reference module is asked for the corresponding local object reference, which may refer either to a proxy or to a remote object. In the case that the remote object reference is not in the table, the RMI software creates a new proxy and asks the remote reference module to add it to the table."

#### الشرح المبسّط:
جدول الكائنات البعيدة يحتفظ بنوعين من المدخلات:
1. الكائنات البعيدة التي تستضيفها العملية نفسها (في جهة الخادم).
2. الوكلاء (proxies) المحليين لكائنات بعيدة أخرى (في جهة العميل).

عند تمرير كائن بعيد لأول مرة، يُطلب من remote reference module إنشاء مرجع جديد وإضافته للجدول. وعند استقبال مرجع بعيد غير موجود في الجدول، يُنشئ نظام RMI وكيلًا (proxy) جديدًا له.

⚙️ **الخطوات / الخوارزمية: دورة حياة proxy وSkeleton**

#### ما هدف هذه العملية؟
> توضيح كيف تُنشأ الوكلاء وكيف يُوجَّه الاستدعاء من العميل حتى الكائن البعيد الفعلي والعودة.

```algorithm
1 | الاستدعاء المحلي | proxy | A يستدعي تابعًا في proxy وكأنه B نفسه
2 | تسلسل | proxy | يُسلسل مرجع الهدف، operationId، والمعاملات في رسالة طلب
3 | إرسال | Communication module | يرسل الطلب عبر الشبكة للخادم
4 | استقبال | Communication module (server) | يستقبل الطلب ويمرره
5 | اختيار | dispatcher | يستخدم operationId لاختيار تابع skeleton المناسب
6 | تنفيذ | skeleton | يفك تسلسل المعاملات، ينادي التابع الفعلي في B، ثم يُسلسل النتيجة
7 | إرسال الرد | Communication module | يرسل رسالة الرد
8 | استلام | proxy | يفك تسلسل الرد ويُعيد النتيجة لـ A
```

#### النص الأصلي يقول:
> "Proxy: The role of a proxy is to make remote method invocation transparent to clients by behaving like a local object to the invoker; but instead of executing an invocation, it forwards it in a message to a remote object... There is one proxy for each remote object for which a process holds a remote object reference."

#### الشرح المبسّط:
`Proxy` يجعل الاستدعاء البعيد شفافًا تمامًا: يبدو للمستدعي أنه كائن محلي عادي، لكنه فعليًا يُحوّل كل استدعاء لرسالة تُرسَل للكائن الحقيقي البعيد. يوجد proxy واحد لكل كائن بعيد تملك العملية مرجعًا له.

#### النص الأصلي يقول:
> "Skeleton: The class of a remote object has a skeleton... A skeleton method unmarshals the arguments in the request message and invokes the corresponding method in the remote object. It waits for the invocation to complete and then marshals the result in the reply message"

#### الشرح المبسّط:
`Skeleton` هو الطرف المقابل لـ Proxy في جهة الخادم: يفك تسلسل المعاملات الواردة، ينادي التابع الحقيقي على الكائن البعيد، ثم يُسلسل النتيجة في رسالة الرد.

#### النص الأصلي يقول:
> "Dispatcher: A server has one dispatcher and one skeleton for each class representing a remote object. The dispatcher receives request messages from the communication module. It uses the operationId to select the appropriate method in the skeleton..."

#### الشرح المبسّط:
يوجد `dispatcher` واحد لكل صنف كائن بعيد في الخادم؛ يستقبل الطلبات من communication module ويستخدم `operationId` (نفس الترقيم المُستخدم في proxy) لاختيار التابع الصحيح في skeleton.

⚖️ **المقايضة: Proxy/Skeleton مقابل الاتصال اليدوي المباشر**

| | Proxy/Skeleton (RMI) | اتصال شبكي يدوي |
| --- | --- | --- |
| المزايا | شفافية كاملة، كود أنظف، أقل أخطاء | تحكم دقيق جدًا في كل التفاصيل |
| العيوب | نفقات تجريد إضافية، أقل مرونة أحيانًا | معقد، متكرر، عرضة للأخطاء |
| متى تختاره | تطوير تطبيقات موزعة عادية بسرعة | أنظمة عالية الأداء تحتاج تحكمًا دقيقًا جدًا |

---

### 5.7 التنفيذ العملي (Execution)

#### النص الأصلي يقول:
> "The classes for proxies, dispatchers and skeletons: generated automatically by an interface compiler, e.g. rmic. Server program: create and initialize at least one of the remote objects. Register remote objects by name. Client program: look up the remote object references. invoke. The binder: A service that maintain a table containing mapping information of textual names to remote object references"

#### الشرح المبسّط:
| المكون | المسؤولية |
| --- | --- |
| مترجم واجهة (`rmic` مثلًا) | يولّد أصناف proxy وdispatcher وskeleton تلقائيًا |
| برنامج الخادم | ينشئ ويُهيّئ كائنًا بعيدًا واحدًا على الأقل، ويسجله باسم معروف |
| برنامج العميل | يبحث (lookup) عن مرجع الكائن البعيد بالاسم، ثم يستدعيه |
| `The binder` | خدمة تحتفظ بجدول يربط الأسماء النصية بمراجع الكائنات البعيدة، تُستخدم للبحث (lookup) |

#### 💡 التشبيه:
> `The binder` أشبه بدليل هاتف: تبحث فيه عن اسم "مطعم الوردة" فيعطيك رقم هاتفه الفعلي (المرجع البعيد) لتتصل به مباشرة.
> **وجه الشبه:** الاسم النصي = اسم الخدمة | الرقم = مرجع الكائن البعيد | الدليل = binder.

---

### 6. البرمجة الموزعة القائمة على الأحداث (Event-based Distributed Programming)

#### النص الأصلي يقول:
> "Idea: one object react to a change occurring in another object. Event examples: modification of a document; an electronically tagged book being at a new location."

#### الشرح المبسّط:
الفكرة الأساسية: كائن يتفاعل تلقائيًا مع تغيير يحدث في كائن آخر، بدلًا من الاستعلام المستمر (polling). أمثلة على الأحداث: تعديل مستند، أو تغيّر موقع كتاب مُوسَّم إلكترونيًا (RFID tag).

**لماذا؟** لأن بعض التطبيقات تحتاج معرفة التغييرات فور حدوثها دون أن "تسأل" الكائن الآخر باستمرار، وهو ما يوفر النطاق الترددي ويقلل زمن الاستجابة.

---

### 6.1 نموذج النشر/الاشتراك (Publish/subscribe paradigm)

#### النص الأصلي يقول:
> "event generator publish the type of events; event receiver subscribe to the types of events that are interest to them; When event occur, notify the receiver."

#### الشرح المبسّط:
مولّد الحدث (event generator) **ينشر (publish)** أنواع الأحداث التي سيولّدها، بينما مستقبل الحدث **يشترك (subscribe)** في الأنواع التي تهمه فقط. عند وقوع الحدث فعليًا، يُخطَر (notify) المشترك تلقائيًا.

#### النص الأصلي يقول:
> "Distributed event-based system – two characteristics: Heterogeneous: components in a DS that were not designed to interoperate can be made to work together. Asynchronous: prevent publishers needing to synchronize with subscribers"

#### الشرح المبسّط:
| الخاصية | الشرح |
| --- | --- |
| `Heterogeneous` (تغاير) | مكوّنات لم تُصمَّم أصلًا للتفاعل مع بعضها يمكن ربطها عبر نظام الأحداث دون تعديلها |
| `Asynchronous` (لاتزامني) | الناشر لا يحتاج انتظار المشترك أو التزامن معه، فيتحرران من الاعتماد المتبادل الوقتي |

📊 **المخطط: بنية خدمة الأحداث (Architecture for Event-based Distributed Programming)**

#### ما هذا المخطط؟
> يوضح كيف تفصل "خدمة الأحداث" (event service) بين كائن الاهتمام (object of interest) والمشترك (subscriber)، مع إمكانية وجود مراقب (observer) وسيط بينهما.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | object of interest | object | الكائن الذي تُهم تغيراته |
| 2 | observer | object | كائن وسيط اختياري يستقبل الإشعار ويعيد توجيهه |
| 3 | subscriber | object | الكائن المهتم بمعرفة الحدث |
| 4 | Event service | service | يحتفظ بقاعدة بيانات الأحداث المنشورة واهتمامات المشتركين |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| object of interest | subscriber | notification (مباشر) | إشعار | الحالة 1: إشعار مباشر بدون وسيط |
| object of interest | observer | notification | إشعار | الحالة 2: الحدث يمر أولًا عبر مراقب |
| observer | subscriber | notification | إشعار | المراقب يعيد توجيه الإشعار للمشترك |

```diagram
type: flowchart
title: Event service architecture
direction: LR
nodes:
  - id: interest
    label: object of interest
    kind: object
    level: 0
  - id: observer
    label: observer
    kind: object
    level: 1
  - id: subscriber
    label: subscriber
    kind: object
    level: 2
edges:
  - from: interest
    to: subscriber
    label: notification (direct)
  - from: interest
    to: observer
    label: notification
  - from: observer
    to: subscriber
    label: notification
```

---

### 6.2 أدوار الكائنات المشاركة

#### النص الأصلي يقول:
> "The object of interest: its changes of state might be of interest to other objects. Event: An event occurs at an object of interest as the completion of a method execution. Notification: an object that contains information about an event. Subscriber: an object that has subscribed to some type of events in another object. Observer objects: the main purpose is to decouple an object of interest from its subscribers. Avoid over-complicating the object of interest. Publisher: an object that declares that it will generate notifications of particular types of event. May be an object of interest or an observer."

#### الشرح المبسّط:

| المصطلح | التعريف |
| --- | --- |
| `Object of interest` | كائن تغيّرات حالته قد تهم كائنات أخرى |
| `Event` | يقع عند اكتمال تنفيذ تابع معين في كائن الاهتمام |
| `Notification` | كائن يحمل معلومات عن الحدث الذي وقع |
| `Subscriber` | كائن اشترك في نوع معين من الأحداث |
| `Observer` | كائن وسيط هدفه فصل (decouple) كائن الاهتمام عن مشتركيه، لتجنب تعقيد كائن الاهتمام نفسه |
| `Publisher` | أي كائن يُعلن أنه سيولّد إشعارات لنوع معين من الأحداث (قد يكون هو كائن الاهتمام نفسه أو مراقبًا) |

#### 💡 التشبيه:
> نظام إشعارات تطبيق الأخبار: الصحيفة (object of interest) تنشر خبرًا، وسيط التوزيع (observer) يصنّف الأخبار حسب الفئة، والمستخدم (subscriber) يستقبل فقط إشعارات الفئة التي اشترك بها (رياضة مثلًا).
> **وجه الشبه:** الصحيفة = ناشر الحدث | تصنيف الأخبار = دور المراقب | إشعارك بالخبر = notification.

---

### 6.3 دلالات توصيل الإشعارات (Notification Delivery)

#### النص الأصلي يقول:
> "Unreliable, e.g. deliver the latest state of a player in a Internet game. Reliable, e.g. dealing room. real-time, e.g. a nuclear power station or a hospital patient monitor."

#### الشرح المبسّط:

| نوع التسليم | مثال | لماذا هذا الاختيار؟ |
| --- | --- | --- |
| `Unreliable` (غير موثوق) | حالة لاعب في لعبة إنترنت | يكفي معرفة آخر حالة؛ فقدان إشعار قديم غير مهم لأن التالي سيصل قريبًا |
| `Reliable` (موثوق) | غرفة تداول مالي (dealing room) | لا يجوز فقدان أي معلومة سعرية، فكل رسالة مهمة |
| `real-time` (آني) | محطة طاقة نووية أو مراقبة مريض في مستشفى | يجب وصول الإشعار خلال زمن محدد بدقة، وإلا قد يحدث ضرر جسيم |

#### النص الأصلي يقول:
> "Roles for observers: Forwarding — send notifications to subscribers on behalf of one or more objects of interests. Filtering of notifications according to some predicate. Notification mailboxes — notification be delayed until subscriber being ready to receive"

#### الشرح المبسّط:
يمكن أن يقوم المراقب (observer) بأحد الأدوار التالية:
- **Forwarding (إعادة التوجيه):** إرسال الإشعارات للمشتركين نيابة عن كائن اهتمام واحد أو أكثر.
- **Filtering (تصفية):** إرسال الإشعارات فقط إذا حققت شرطًا معينًا (predicate).
- **Notification mailboxes (صناديق بريد):** تأخير تسليم الإشعار حتى يصبح المشترك جاهزًا لاستقباله (كأنها بريد وارد مؤقت).

#### مهم للامتحان ⚠️:
> اختيار دلالة التسليم (unreliable/reliable/real-time) يعتمد كليًا على حساسية التطبيق لفقدان أو تأخر المعلومة، وليس هناك خيار "أفضل" مطلقًا.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Middleware` | طبقة برمجية توفر نموذج برمجة أعلى من العمليات وتمرير الرسائل | توفر شفافية الموقع والبروتوكول |
| `Marshalling` | تحويل هيكل بيانات إلى تسلسل بايتات قابل للإرسال | عكسها Unmarshalling |
| `RPC` | استدعاء إجراء بعيد وكأنه محلي | لا يتعامل مع كائنات |
| `RMI` | استدعاء تابع في كائن بعيد | امتداد لـ RPC في عالم OOP |
| `Remote object` | كائن يمكن أن يستقبل استدعاءات بعيدة | يملك remote interface |
| `Remote interface` | تحدد التوابع القابلة للاستدعاء من خارج العملية | تُعرَّف عبر IDL |
| `Proxy` | يمثل الكائن البعيد محليًا لدى العميل | جانب العميل |
| `Skeleton` | ينفذ فك التسلسل والاستدعاء الفعلي | جانب الخادم |
| `Dispatcher` | يوجّه الطلب إلى skeleton الصحيح | باستخدام operationId |
| `Binder` | خدمة تربط الأسماء بمراجع الكائنات البعيدة | مثل دليل الهاتف |
| `Idempotent operation` | عملية نتيجتها لا تتغير بتكرار تنفيذها | آمنة لإعادة التنفيذ |
| `History` | سجل يحفظ آخر نتائج مُرسَلة لكل عميل | لتفادي إعادة التنفيذ |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `doOperation` | يرسل الطلب وينتظر الرد (جانب العميل) | يستخدم Timeout |
| `getRequest` | يستقبل الطلب (جانب الخادم) | عبر منفذ الخادم |
| `sendReply` | يرسل الرد (جانب الخادم) | لعنوان ومنفذ العميل |
| `Communication module` | تنفيذ دلالات الاستدعاء (retry, filtering, history) | مشترك بين RPC وRMI |
| `Remote reference module` | ترجمة المراجع المحلية/البعيدة | يحتفظ بـ Remote object table |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| RPC مقابل RMI | يتعامل مع إجراءات فقط | يتعامل مع كائنات ومراجعها | RMI موجّه للكائنات، RPC موجّه للإجراءات |
| Maybe مقابل At-least-once | لا إعادة إرسال | إعادة إرسال بدون تصفية تكرار | At-least-once قد يُنفَّذ أكثر من مرة |
| At-least-once مقابل At-most-once | قد يُنفَّذ أكثر من مرة | يُنفَّذ مرة واحدة على الأكثر | At-most-once يستخدم تصفية تكرار وسجل |
| CORBA مقابل Java Serialization | بدون معلومات نوع | مع معلومات نوع | حجم الرسالة مقابل مرونة التحقق |
| R مقابل RR مقابل RRA | رسالة واحدة | رسالتان | RRA يضيف رسالة تأكيد ثالثة |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| بروتوكولات | `R`, `RR`, `RRA`, `UDP`, `TCP` |
| تسلسل بيانات | `Marshalling`, `Unmarshalling`, `CORBA CDR`, `Java Serialization`, `XML` |
| دلالات استدعاء | `Maybe`, `At-least-once`, `At-most-once`, `Idempotent` |
| مكونات RMI/RPC | `Proxy`, `Skeleton`, `Stub`, `Dispatcher`, `Binder` |
| أحداث | `Publisher`, `Subscriber`, `Observer`, `Notification`, `Event service` |

### أبرز النقاط الذهبية
1. الوسيط (middleware) يوفر شفافية الموقع، بروتوكول النقل، العتاد، نظام التشغيل، ولغة البرمجة.
2. Marshalling/Unmarshalling ضرورية لأن الذاكرة تخزن هياكل بيانات بينما الشبكة تنقل بايتات فقط.
3. request-reply يُبنى غالبًا فوق UDP لتفادي نفقات TCP غير الضرورية لتبادلات قصيرة.
4. requestId + عنوان العملية = معرّف فريد عالميًا للرسالة.
5. العمليات المتحايدة (idempotent) لا تحتاج حماية خاصة من التكرار، أما غيرها فيحتاج سجلًا (history).
6. دلالات RPC الثلاث: `Maybe`, `At-least-once`, `At-most-once` تنتج من تركيبات إعادة الإرسال/تصفية التكرار/إعادة إرسال النتيجة.
7. RPC لا يعرف الكائنات، بينما RMI يتعامل مع كائنات ومراجع كائنات بعيدة.
8. proxy (جانب العميل) وskeleton (جانب الخادم) يحققان الشفافية في RMI.
9. نظام الأحداث (publish/subscribe) يفصل الناشر عن المشترك زمنيًا (لاتزامني) ويسمح بربط مكونات متغايرة.
10. اختيار دلالة تسليم الإشعار (unreliable/reliable/real-time) يعتمد على حساسية التطبيق.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| الخلط بين RPC وRMI باعتبارهما متطابقين تمامًا | RPC للإجراءات فقط، RMI يضيف مفهوم الكائنات والمراجع البعيدة |
| اعتبار `At-least-once` آمنة دائمًا | غير آمنة للعمليات غير المتحايدة؛ قد تُنفَّذ أكثر من مرة |
| اعتقاد أن الرد نفسه يحتاج تأكيدًا منفصلًا دائمًا | في RR العادي، وصول الرد كافٍ كتأكيد؛ RRA فقط يضيف تأكيدًا صريحًا |
| الخلط بين Marshalling والضغط (Compression) | Marshalling يعني تحويل التمثيل، وليس بالضرورة تصغير الحجم |
| اعتقاد أن جمع القمامة الموزع بسيط كالمحلي | يحتاج تعاونًا بين الجامع المحلي ووحدة إضافية، غالبًا عبر عدّ مراجع |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: دورة الطلب-الرد الأساسية
> الهدف: تنفيذ استدعاء بعيد أساسي بين عميل وخادم.
```algorithm
1 | العميل | doOperation | يبني رسالة الطلب ويرسلها وينتظر
2 | الخادم | getRequest | يستقبل رسالة الطلب
3 | الخادم | execute method | ينفذ العملية المطلوبة
4 | الخادم | sendReply | يرسل رسالة الرد للعميل
```
#### نقاط التنفيذ:
- قد يُستخدم Timeout وإعادة إرسال إذا لم يصل الرد.

#### ⚙️ الخطوات / الخوارزمية: تنفيذ RPC الكامل
> الهدف: توضيح مسار استدعاء الإجراء البعيد عبر stubs وdispatcher.
```algorithm
1 | العميل | client stub | تسلسل معرف الإجراء والمعاملات
2 | الشبكة | Communication module | إرسال الطلب واستقباله
3 | الخادم | dispatcher | اختيار server stub المناسب
4 | الخادم | server stub | فك تسلسل، تنفيذ، تسلسل النتيجة
5 | الشبكة | Communication module | إرسال الرد
6 | العميل | client stub | فك تسلسل النتيجة
```
#### نقاط التنفيذ:
- الـ stubs تُولَّد تلقائيًا من IDL عبر مترجم واجهة.

#### ⚙️ الخطوات / الخوارزمية: تنفيذ RMI الكامل
> الهدف: توضيح مسار استدعاء التابع البعيد عبر proxy وskeleton.
```algorithm
1 | العميل | proxy | تسلسل مرجع الهدف وoperationId والمعاملات
2 | الشبكة | Communication + Remote reference module | إرسال الطلب بعد ترجمة المرجع
3 | الخادم | dispatcher | اختيار skeleton المناسب
4 | الخادم | skeleton | فك تسلسل، استدعاء التابع الفعلي، تسلسل النتيجة
5 | الشبكة | Communication module | إرسال الرد
6 | العميل | proxy | فك تسلسل النتيجة وإعادتها للمستدعي
```
#### نقاط التنفيذ:
- Remote object table تُستخدم لترجمة المراجع في الطرفين.

#### ⚙️ الخطوات / الخوارزمية: دورة publish/subscribe
> الهدف: توضيح كيفية توصيل الإشعارات من كائن الاهتمام للمشترك.
```algorithm
1 | الناشر | publish | يعلن أنواع الأحداث التي سيولّدها
2 | المشترك | subscribe | يسجل اهتمامه بأنواع معينة لدى event service
3 | الحدث | occurs | يقع الحدث في كائن الاهتمام عند اكتمال تنفيذ تابع
4 | خدمة الأحداث | notify | تُرسل إشعارًا (مباشرة أو عبر observer) للمشترك
```
#### نقاط التنفيذ:
- قد يمر الإشعار عبر observer للتصفية أو إعادة التوجيه أو التأخير (mailbox).

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| Stub/Proxy pattern | كائن محلي يمثل كائنًا بعيدًا بنفس الواجهة | لتحقيق شفافية الموقع |
| Dispatcher pattern | توجيه الطلب لمعالج مناسب حسب معرّف | عند وجود عدة توابع/إجراءات ممكنة |
| History/Cache للنتائج | حفظ آخر نتيجة لكل طلب لكل عميل | لتفادي إعادة تنفيذ عمليات غير متحايدة |
| Publish/Subscribe | فصل المُصدر عن المُستهلك عبر وسيط | عند الحاجة لتغاير وعدم تزامن |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| فقدان رسالة الرد لعملية غير متحايدة | استخدام سجل (history) وتصفية تكرار (At-most-once) | لتفادي التنفيذ المزدوج |
| فقدان رسالة الرد لعملية متحايدة | يمكن ببساطة إعادة الإرسال دون قلق | النتيجة النهائية لن تتغير بإعادة التنفيذ |
| تطبيق يحتاج تسليم فوري مضمون | استخدام دلالة `real-time` في نظام الأحداث | لأن التأخير قد يسبب ضررًا حقيقيًا |
| ربط مكونات غير متوافقة أصلًا | استخدام نموذج publish/subscribe | لأنه يدعم التغاير (heterogeneous) |

### الأفكار الرئيسية الشاملة
الفكرة الجامعة لهذه المحاضرة هي أن كل أشكال الاستدعاء البعيد (RPC، RMI) والبرمجة القائمة على الأحداث تُبنى جميعها فوق طبقة أساسية واحدة: بروتوكول الطلب-الرد + التمثيل الخارجي للبيانات (marshalling)، وتضيف فوقها طبقات شفافية متتالية (proxy/skeleton، أو publisher/subscriber) لإخفاء تعقيد الشبكة عن المبرمج، مع ضرورة التعامل الصريح مع احتمالات الفشل (فقدان رسائل، تعطل عمليات) عبر خيارات تصميمية واضحة (دلالات الاستدعاء، دلالات تسليم الإشعارات).

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. توزيع: مقارنات 25% | تطبيق 30% | تتبع خوارزمية 45%.

### السؤال 1 (medium)
ما الفرق الجوهري بين RPC وRMI؟
أ) RPC أسرع من RMI دائمًا  ب) RPC يتعامل مع الإجراءات فقط بينما RMI يتعامل مع الكائنات ومراجعها  ج) RMI لا يستخدم بروتوكول الطلب-الرد  د) لا يوجد فرق فعلي
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "RPC only addresses procedure calls. RPC is not concerned with objects and object references." بينما RMI يتعامل مع كائنات ومراجع بعيدة. (أ) غير صحيح لأن السرعة ليست معيار التمييز المذكور. (ج) غير صحيح لأن RMI أيضًا يُبنى فوق بروتوكول طلب-رد. (د) غير صحيح لوجود فرق واضح موثّق.

---

### السؤال 2 (hard)
عملية "سحب 100$ من حساب" (غير متحايدة) تُنفَّذ تحت دلالة `At-least-once` دون تصفية تكرار، وحدث فقدان لرسالة الرد. ماذا يحدث على الأرجح؟
أ) لن يُنفَّذ السحب إطلاقًا  ب) قد يُسحَب المبلغ أكثر من مرة بسبب إعادة الإرسال  ج) سيُكتشف الخطأ تلقائيًا ويُرفض الطلب  د) ستتحول الدلالة تلقائيًا لـ At-most-once
**الإجابة الصحيحة: ب**
**التعليل:** At-least-once تعيد الإرسال دون تصفية تكرار، وبما أن العملية غير متحايدة (non-idempotent)، فإعادة التنفيذ تعني سحب المبلغ أكثر من مرة، وهذا ما ورد صراحة: "arbitrary failures for non-idempotent method". (أ) عكس ما يحدث فعليًا. (ج) لا توجد آلية اكتشاف تلقائي في هذه الدلالة. (د) الدلالات لا تتحول تلقائيًا، بل تُختار تصميميًا.

---

### السؤال 3 (medium)
ما الغرض الأساسي من `requestId` في رسالة الطلب-الرد؟
أ) تحديد نوع البيانات المرسلة  ب) مطابقة الرد بطلبه الصحيح وتمييز الرسائل المكررة  ج) تشفير الرسالة  د) تحديد بروتوكول النقل المستخدم
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن معرف الرسالة (requestId + عنوان المرسل) يُستخدم لمطابقة الردود بطلباتها وللتمييز بين الطلبات المكررة عند إعادة الإرسال. (أ) هذا دور messageType. (ج) لا علاقة له بالتشفير. (د) هذا أمر منفصل تمامًا عن معرّف الطلب.

---

### السؤال 4 (medium)
أي مما يلي **لا** يُعتبر من خصائص الشفافية (Transparency) التي يوفرها الوسيط البرمجي؟
أ) شفافية الموقع  ب) شفافية بروتوكول النقل  ج) شفافية زمن التنفيذ (ضمان سرعة ثابتة)  د) شفافية العتاد
**الإجابة الصحيحة: ج**
**التعليل:** النص يذكر شفافية الموقع، بروتوكول النقل، العتاد، نظام التشغيل، ولغة البرمجة، لكن لا يذكر إطلاقًا "ضمان سرعة تنفيذ ثابتة" كخاصية شفافية. (أ)، (ب)، (د) جميعها مذكورة صراحة في الشرائح.

---

### السؤال 5 (hard)
في تركيبة (Retransmit: Yes, Duplicate filtering: Yes, Retransmit reply)، ما دلالة الاستدعاء الناتجة؟
أ) Maybe  ب) At-least-once  ج) At-most-once  د) لا توجد دلالة محددة لهذه التركيبة
**الإجابة الصحيحة: ج**
**التعليل:** وفق جدول الشرائح (Figure 6)، تركيبة (Yes, Yes, Retransmit reply) تُنتج بالضبط دلالة `At-most-once`. (أ) Maybe تنتج فقط من (No, N/A, N/A). (ب) At-least-once تنتج من (Yes, No, Re-execute). (د) التركيبة محددة بوضوح في الجدول.

---

### السؤال 6 (medium)
لماذا يُعتبر `CORBA`'s common data representation مختلفًا عن `Java serialization` و`XML`؟
أ) لأنه الوحيد الذي يدعم أكثر من لغة برمجة  ب) لأنه لا يتضمن معلومات النوع بينما الاثنان الآخران يتضمنانها  ج) لأنه الوحيد النصي  د) لأنه أبطأ بكثير من الاثنين الآخرين
**الإجابة الصحيحة: ب**
**التعليل:** النص: "CORBA's representation includes just the values of the objects transmitted, and nothing about their types. On the other hand, both Java serialization and XML do include type information." (أ) خطأ لأن CORBA وXML كلاهما عبر اللغات، بينما Java serialization محصور بلغة Java فقط. (ج) XML هو النصي وليس CORBA. (د) لم يُذكر أي مقارنة أداء صريحة.

---

### السؤال 7 (medium)
ما وظيفة `dispatcher` في تنفيذ RPC؟
أ) تنفيذ العملية الفعلية للخدمة  ب) اختيار إجراء server stub المناسب بناءً على معرف الإجراء  ج) إرسال الرسالة عبر الشبكة  د) تسلسل معاملات الطلب في جهة العميل
**الإجابة الصحيحة: ب**
**التعليل:** النص: "Dispatcher: select one of the server stub procedures" باستخدام معرف الإجراء الوارد في الطلب. (أ) هذا دور service procedure. (ج) هذا دور communication module. (د) هذا دور client stub procedure.

---

### السؤال 8 (hard)
كائن A يريد استدعاء تابع في كائن بعيد F لأول مرة، لكنه لا يملك مرجعًا مباشرًا له. كيف يمكن أن يحصل عليه وفق النموذج الموزع؟
أ) لا يمكنه أبدًا الحصول على مرجع لكائن لم يستدعِه من قبل  ب) عبر الحصول على المرجع كنتيجة استدعاء بعيد سابق (مثلًا من B)  ج) عبر البحث اليدوي في ذاكرة الخادم  د) المراجع البعيدة تُنشأ تلقائيًا لكل الكائنات فور بدء النظام
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح صراحة: "object A in Figure 8 might obtain a remote reference to object F from object B" أي أن المراجع البعيدة يمكن الحصول عليها كنتائج استدعاءات سابقة. (أ) خطأ لوجود هذه الآلية. (ج) لا يوجد بحث يدوي في الذاكرة في هذا النموذج. (د) لا تُنشأ المراجع تلقائيًا لكل الكائنات.

---

### السؤال 9 (medium)
ما الفرق بين `proxy` و`skeleton` في تنفيذ RMI؟
أ) proxy في جهة الخادم وskeleton في جهة العميل  ب) proxy يمثل الكائن البعيد لدى العميل، وskeleton ينفذ الاستدعاء الفعلي لدى الخادم  ج) كلاهما يؤديان نفس الدور بالضبط  د) proxy يُستخدم فقط في RPC وليس RMI
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن proxy "makes remote method invocation transparent to clients... forwards it in a message to a remote object"، بينما skeleton "unmarshals the arguments... invokes the corresponding method in the remote object". (أ) عكس الحقيقة تمامًا. (ج) لهما أدوار مختلفة تمامًا. (د) proxy مفهوم خاص بـ RMI وليس RPC (الذي يستخدم client stub بدلًا منه).

---

### السؤال 10 (hard)
في سيناريو نظام أحداث publish/subscribe، ما الفائدة الأساسية من إدخال كائن `observer` وسيط بين كائن الاهتمام والمشترك؟
أ) لجعل الاتصال متزامنًا إجباريًا  ب) لفصل (decouple) كائن الاهتمام عن مشتركيه وتجنب تعقيده  ج) لضمان عدم فقدان أي إشعار مطلقًا  د) لإلغاء الحاجة لخدمة الأحداث (event service)
**الإجابة الصحيحة: ب**
**التعليل:** النص: "Observer objects: the main purpose is to decouple an object of interest from its subscribers. Avoid over-complicating the object of interest." (أ) العكس تمامًا؛ الهدف هو اللاتزامنية وليس التزامن الإجباري. (ج) هذا يعتمد على دلالة التسليم المختارة (reliable/unreliable) وليس مضمونًا تلقائيًا بوجود observer. (د) observer لا يلغي الحاجة لخدمة الأحداث، بل يعمل ضمنها.

---

### السؤال 11 (medium)
أي دلالة تسليم إشعار مناسبة لمراقبة مريض في مستشفى؟
أ) Unreliable  ب) Reliable فقط  ج) real-time  د) لا يهم النوع طالما يصل الإشعار يومًا ما
**الإجابة الصحيحة: ج**
**التعليل:** النص يذكر صراحة: "real-time, e.g. a nuclear power station or a hospital patient monitor" أي أن الحالات الحرجة زمنيًا تحتاج دلالة real-time وليس فقط الموثوقية. (أ) غير مناسب لحالة حرجة. (ب) الموثوقية وحدها لا تكفي دون قيد زمني. (د) خطير جدًا في سياق طبي.

---

### السؤال 12 (hard)
لماذا تحتاج العمليات غير المتحايدة (non-idempotent) لآلية "History" بينما لا تحتاجها العمليات المتحايدة (idempotent)؟
أ) لأن العمليات المتحايدة أسرع فلا داعي للتخزين  ب) لأن تكرار تنفيذ عملية متحايدة ينتج نفس النتيجة دائمًا، بعكس غير المتحايدة التي قد تسبب أثرًا مضاعفًا  ج) History مطلوبة فقط في UDP وليس TCP  د) العمليات المتحايدة لا تُرسل ردودًا أصلًا
**الإجابة الصحيحة: ب**
**التعليل:** النص: "an idempotent operation is an operation that can be performed repeatedly with the same effect as if it had been performed exactly once"، فتكرارها آمن. أما غير المتحايدة (كسحب مبلغ) فتكرارها يغيّر النتيجة الفعلية، فتحتاج سجلًا لمنع إعادة التنفيذ. (أ) لا علاقة بالسرعة. (ج) الحاجة لـ History مرتبطة بنوع العملية لا ببروتوكول النقل تحديدًا. (د) خطأ فكل العمليات ترسل ردودًا.

---

### السؤال 13 (medium)
ما الدور الذي يلعبه `The binder` في نظام RMI؟
أ) تنفيذ العملية البعيدة فعليًا  ب) ربط الأسماء النصية بمراجع الكائنات البعيدة لتمكين البحث عنها  ج) تصفية الرسائل المكررة  د) تحويل هيكل البيانات إلى بايتات
**الإجابة الصحيحة: ب**
**التعليل:** النص: "The binder: A service that maintain a table containing mapping information of textual names to remote object references." (أ) هذا دور service procedure/skeleton. (ج) هذا دور communication module. (د) هذا دور Marshalling.

---

### السؤال 14 (hard)
سيناريو: عميل يرسل طلبًا عبر UDP، ولا يصله رد بعد فترة طويلة. النظام يستخدم دلالة `At-most-once`. ما الإجراء الأنسب الذي يجب أن يقوم به `doOperation`؟
أ) الفشل فورًا دون أي محاولة أخرى  ب) إعادة إرسال الطلب حتى يصل رد أو يُتأكد أن التأخير سببه غياب استجابة الخادم لا فقدان الرسائل، مع الاعتماد على تصفية التكرار في الخادم  ج) التبديل التلقائي لبروتوكول TCP  د) تجاهل المهلة والانتظار للأبد
**الإجابة الصحيحة: ب**
**التعليل:** النص: "doOperation sends the request message repeatedly until either it gets a reply or it is reasonably sure that the delay is due to lack of response from the server rather than to lost messages." وبما أن الدلالة At-most-once، فتصفية التكرار في الخادم تمنع التنفيذ المزدوج. (أ) هذا سلوك دلالة Maybe وليس At-most-once. (ج) لا يوجد تبديل تلقائي للبروتوكول مذكور. (د) الانتظار للأبد غير عملي وغير مذكور.

---

### السؤال 15 (medium)
أي العبارات التالية صحيحة بخصوص واجهة الخدمة (Service interface) في RPC؟
أ) تُحدد فقط أسماء الملفات المستخدمة في الخادم  ب) تحدد الإجراءات المتاحة للاستدعاء عن بعد من قبل العملاء  ج) لا علاقة لها بلغة تعريف الواجهات IDL  د) تُنشأ فقط في جانب العميل
**الإجابة الصحيحة: ب**
**التعليل:** النص: "The term service interface is used to refer to the specification of the procedures offered by a server." (أ) لا علاقة لها بأسماء الملفات. (ج) بل ترتبط مباشرة بـ IDL الذي يُستخدم لتعريفها. (د) واجهة الخدمة تُعرَّف من قبل الخادم لتوصيف ما يقدمه.

---

### السؤال 16 (hard)
في المخطط العام لطبقات الوسيط (Figure 1)، لماذا توضع "request-reply protocol" و"marshalling" في نفس الطبقة تقريبًا وليس كل منهما في طبقة منفصلة تمامًا؟
أ) لأنهما غير مرتبطين إطلاقًا  ب) لأنهما يعملان معًا بشكل متكامل ضمن نفس طبقة "هذا الفصل" لتشكيل الأساس الذي يُبنى عليه RMI وRPC  ج) لأن marshalling جزء من TCP وليس من الوسيط  د) لأن request-reply protocol لا يحتاج marshalling إطلاقًا
**الإجابة الصحيحة: ب**
**التعليل:** الشريحة توضح أن كلا الموضوعين (request-reply protocol وmarshalling/external data representation) هما محور "This chapter"، ويشكلان معًا الأساس الذي تُبنى عليه طبقة RMI/RPC الأعلى؛ فكل رسالة طلب-رد تحتاج لتسلسل بياناتها أولًا. (أ) عكس الحقيقة فهما مترابطان وظيفيًا. (ج) marshalling طبقة وسيط منفصلة عن TCP وليست جزءًا منه. (د) كل رسالة تحتاج تسلسلًا (marshalling) لتُرسَل عبر الشبكة.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): أكمل الناقص — fill_gaps

**السيناريو / المطلوب:**
أكمل الفراغات في الجملة التالية المتعلقة ببروتوكول الطلب-الرد:

"معرّف الرسالة يتكون من جزأين: ______ (رقم تسلسلي متزايد للمرسِل) و______ (عنوان IP ورقم المنفذ الخاص بالعملية المرسِلة)، ليكون المعرّف فريدًا على مستوى ______."

**المطلوب:**
1. املأ الفراغات الثلاثة.

**نموذج الحل:**
1. `requestId`
2. معرّف العملية المرسِلة (sender process identifier)
3. النظام الموزع بأكمله (the whole distributed system)

---

### تمرين 2 (تمرين إضافي): سيناريو تطبيقي — scenario

**السيناريو / المطلوب:**
شركة تبني نظام حجز طيران موزع. الحجز يعني "خصم مقعد واحد من المخزون المتاح" — وهذه عملية **غير متحايدة**. يطلب منك المدير اختيار دلالة استدعاء RPC مناسبة لتفادي حجز مقعدين بالخطأ لنفس الطلب عند حدوث تأخير في الشبكة.

**المطلوب:**
1. ما الدلالة الأنسب من بين Maybe / At-least-once / At-most-once؟ ولماذا؟
2. صف بإيجاز كيف تمنع هذه الدلالة الحجز المزدوج.

**نموذج الحل:**
1. الأنسب هي `At-most-once`، لأن الحجز عملية غير متحايدة، وأي تنفيذ مزدوج لها يسبب خطأ فعليًا (حجز مقعدين بدلًا من واحد).
2. تعتمد `At-most-once` على إعادة إرسال الطلب عند الحاجة، لكنها تستخدم أيضًا **تصفية التكرار (duplicate filtering)** بالاعتماد على `requestId`: إذا وصل طلب مكرر (نفس المعرّف)، يتعرف الخادم عليه ويعيد إرسال **الرد المحفوظ في السجل (history)** دون إعادة تنفيذ عملية الحجز من جديد.

---

### تمرين 3 (تمرين إضافي): سيناريو — scenario

**السيناريو / المطلوب:**
فريق تطوير يبني تطبيق دردشة يعرض "حالة الاتصال" (متصل/غير متصل) لجهات الاتصال، ويريد إشعار المستخدمين فورًا عند تغيّر حالة أحد أصدقائهم دون أن يستعلم التطبيق باستمرار.

**المطلوب:**
1. أي نموذج برمجي (من بين ما دُرِس) هو الأنسب لهذه المشكلة؟
2. حدد من في هذا السيناريو يمثل: `object of interest`، `event`، `subscriber`.

**نموذج الحل:**
1. الأنسب هو نموذج **Event-based Distributed Programming** عبر آلية `Publish/Subscribe`، لأنه يتيح للكائنات التفاعل مع التغيرات دون استعلام مستمر (polling)، ويحقق اللاتزامنية بين الأطراف.
2. `object of interest` = كائن حساب المستخدم (الصديق) الذي تتغير حالته. `event` = لحظة تغيّر حالة الاتصال (متصل → غير متصل أو العكس). `subscriber` = تطبيق كل مستخدم يريد معرفة حالة أصدقائه.

---

### تمرين 4 (تمرين إضافي): fill_gaps

**السيناريو / المطلوب:**
أكمل الجدول التالي بمطابقة كل مكوّن بدوره الصحيح في تنفيذ RMI:

| المكوّن | الدور |
| --- | --- |
| Proxy | ______ |
| Skeleton | ______ |
| Dispatcher | ______ |
| Remote reference module | ______ |

**المطلوب:**
1. أكمل عمود "الدور".

**نموذج الحل:**
| المكوّن | الدور |
| --- | --- |
| Proxy | يمثل الكائن البعيد محليًا لدى العميل، يُسلسل الطلب ويفك تسلسل الرد |
| Skeleton | يفك تسلسل الطلب لدى الخادم، ينادي التابع الفعلي، ويُسلسل النتيجة |
| Dispatcher | يختار تابع skeleton الصحيح بناءً على operationId |
| Remote reference module | يترجم بين المراجع المحلية (proxies) والمراجع البعيدة عبر جدول الكائنات البعيدة |

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تحليل سيناريو مؤسسي

**السيناريو:**
بنك يستخدم نظامًا موزعًا لتحويل الأموال بين الحسابات عبر RPC فوق UDP. لوحظ مؤخرًا أن بعض العملاء اشتكوا من خصم المبلغ مرتين من حساباتهم عند بطء الشبكة.

**المطلوب:**
1. حدد الدلالة الحالية المُستخدَمة على الأرجح وسبب المشكلة.
2. اقترح تعديلًا تصميميًا يحل المشكلة تمامًا.

**نموذج الحل:**
1. المشكلة تشير إلى أن النظام يستخدم على الأرجح دلالة `At-least-once` بدون تصفية تكرار: عند بطء الشبكة، يُعاد إرسال طلب التحويل، فيُنفَّذ العملية غير المتحايدة (التحويل) أكثر من مرة.
2. الحل: التحول إلى دلالة `At-most-once`، بإضافة تصفية تكرار في الخادم بالاعتماد على `requestId`، والاحتفاظ بسجل (history) لآخر نتيجة لكل عميل بحيث تُعاد النتيجة المحفوظة دون إعادة تنفيذ التحويل عند وصول طلب مكرر.

---

### تمرين 2: إكمال مخطط

**السيناريو:**
لديك مخطط ناقص لتدفق استدعاء RMI بين كائن A (عميل) وكائن B (خادم)، وتحتاج إكمال العُقد الناقصة بين "A" و"Communication module (client)".

**المطلوب:**
1. اذكر العُقدتين الناقصتين بالترتيب الصحيح.
2. اشرح وظيفة كل منهما باختصار.

**نموذج الحل:**
1. العُقدتان الناقصتان بالترتيب: `proxy for B` ثم `Remote reference module (client)`.
2. `proxy for B`: يمثل B محليًا لدى A ويُسلسل الطلب. `Remote reference module (client)`: يترجم مرجع B المحلي لدى proxy إلى مرجع بعيد فعلي قبل الإرسال عبر الشبكة.

---

### تمرين 3: جدول قرار (table_fill)

**السيناريو:**
فريق تصميم يقارن بين استخدام دلالة تسليم إشعار `Unreliable` أو `Reliable` أو `real-time` لثلاثة تطبيقات مختلفة.

**المطلوب:**
1. أكمل الجدول التالي باختيار الدلالة الأنسب لكل تطبيق مع سبب مختصر.

| التطبيق | الدلالة المناسبة | السبب |
| --- | --- | --- |
| لعبة إنترنت متعددة اللاعبين (تحديث موقع اللاعب) | ______ | ______ |
| نظام تداول أسهم مالي | ______ | ______ |
| نظام مراقبة غرفة عمليات جراحية | ______ | ______ |

**نموذج الحل:**
| التطبيق | الدلالة المناسبة | السبب |
| --- | --- | --- |
| لعبة إنترنت | `Unreliable` | يكفي آخر تحديث؛ فقدان تحديث قديم لا يؤثر لأن التالي يصل بسرعة |
| تداول أسهم | `Reliable` | كل تغيّر سعري مهم ولا يجوز فقدانه |
| غرفة عمليات جراحية | `real-time` | يجب وصول الإشعار خلال زمن محدد وإلا قد يترتب ضرر جسيم على المريض |

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تتبع دلالات RPC عند فقدان الرد

**المدخل:**
```text
العميل يرسل طلب "سحب 50$" (عملية غير متحايدة).
تُفقد رسالة الرد أثناء عودتها.
العميل يعيد إرسال الطلب بعد انتهاء المهلة.
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | إرسال الطلب الأول | ؟ |
| 2 | تنفيذ السحب في الخادم | ؟ |
| 3 | فقدان رسالة الرد | ؟ |
| 4 | انتهاء المهلة وإعادة الإرسال | ؟ |
| 5 | وصول الطلب المكرر للخادم (مع تصفية تكرار مفعّلة) | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | إرسال الطلب الأول | requestId = 101 يُرسل من العميل |
| 2 | تنفيذ السحب في الخادم | الرصيد يُخصَم 50$ فعليًا، والنتيجة تُحفظ في history |
| 3 | فقدان رسالة الرد | العميل لا يستلم شيئًا، الرصيد فعليًا خُصِم لكن العميل لا يعلم |
| 4 | انتهاء المهلة وإعادة الإرسال | العميل يرسل نفس requestId = 101 مجددًا |
| 5 | وصول الطلب المكرر (مع تصفية تكرار) | الخادم يتعرف على requestId = 101 كمكرر، فلا يُعيد تنفيذ السحب، بل يُعيد إرسال الرد المحفوظ في history |

**النتيجة:** الرصيد يُخصَم 50$ مرة واحدة فقط، ويستلم العميل الرد الصحيح في النهاية، بفضل تصفية التكرار والسجل (خصائص دلالة `At-most-once`).

---

### تمرين تتبع 2: تتبع بناء مرجع كائن بعيد جديد

**المدخل:**
```text
كائن A يستدعي تابعًا في كائن بعيد B لأول مرة، ثم B يُعيد مرجعًا بعيدًا لكائن F لم يسبق لـ A رؤيته.
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | A يستدعي proxy الخاص بـ B | ؟ |
| 2 | proxy يُسلسل الطلب ويرسله | ؟ |
| 3 | B ينفذ التابع ويُعيد مرجعًا بعيدًا لـ F | ؟ |
| 4 | الرد يصل لجهة العميل ويحتوي مرجع F | ؟ |
| 5 | remote reference module في جهة A يتحقق من الجدول | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | A يستدعي proxy الخاص بـ B | proxy يمثل B محليًا لدى A |
| 2 | proxy يُسلسل الطلب ويرسله | الطلب يحمل مرجع B وoperationId والمعاملات |
| 3 | B ينفذ التابع ويُعيد مرجعًا بعيدًا لـ F | remote reference module في جهة الخادم ينشئ مرجع F إن لم يكن موجودًا، ويضيفه لجدوله |
| 4 | الرد يصل لجهة العميل ويحتوي مرجع F | الرد يحمل مرجع F البعيد ضمن بياناته المُسلسَلة |
| 5 | remote reference module في جهة A يتحقق من الجدول | بما أن مرجع F غير موجود في جدول A، يُنشئ نظام RMI proxy جديدًا لـ F ويضيفه للجدول |

**النتيجة:** يحصل A على proxy جديد يمثّل F، جاهز للاستدعاء عليه مباشرة مستقبلًا دون الحاجة للمرور عبر B مجددًا.

---

### تمرين تتبع 3: تتبع بروتوكول RRA

**المدخل:**
```text
عميل يستخدم بروتوكول RRA (Request-Reply-Acknowledge) للتواصل مع خادم يحتاج تأكيدًا صريحًا لتفريغ history.
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | العميل يرسل Request | ؟ |
| 2 | الخادم ينفذ ويرسل Reply | ؟ |
| 3 | العميل يستلم الرد | ؟ |
| 4 | العميل يرسل Acknowledge reply | ؟ |
| 5 | الخادم يستقبل التأكيد | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | العميل يرسل Request | requestId يُنشأ ويُرسل مع بيانات الطلب |
| 2 | الخادم ينفذ ويرسل Reply | ينفذ العملية، يحفظ النتيجة في history احتياطًا، ويرسل الرد |
| 3 | العميل يستلم الرد | العميل يعالج النتيجة بنجاح |
| 4 | العميل يرسل Acknowledge reply | رسالة ثالثة تؤكد للخادم استلام الرد فعليًا |
| 5 | الخادم يستقبل التأكيد | الخادم يستطيع الآن حذف هذا الطلب من history بأمان لأنه تأكد من وصول الرد |

**النتيجة:** بروتوكول RRA يسمح للخادم بتفريغ سجل النتائج بثقة بدلًا من الاحتفاظ بها لفترة زمنية غير محددة أو الاعتماد على تخمين وصول الرد.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما تعريف Marshalling؟
A: عملية تجميع مجموعة بيانات وتحويلها لصيغة (تسلسل بايتات) مناسبة للإرسال في رسالة.

**Q2:** ما الفرق بين RPC وRMI من حيث نوع الكيان المستدعى؟
A: RPC يستدعي إجراءات (procedures) فقط، بينما RMI يستدعي توابع (methods) في كائنات، ويتعامل مع مراجع الكائنات البعيدة.

**Q3:** ما الدلالات الثلاث لاستدعاء RPC؟
A: `Maybe`، `At-least-once`، `At-most-once`.

**Q4:** ما العملية التي لا تحتاج حماية خاصة من التنفيذ المتكرر؟
A: العملية المتحايدة (`Idempotent operation`)، لأن نتيجتها لا تتغير بتكرار تنفيذها.

**Q5:** ما دور proxy في RMI؟
A: يمثل الكائن البعيد محليًا لدى العميل، ويحوّل الاستدعاء المحلي إلى رسالة تُرسَل للكائن الحقيقي البعيد.

**Q6:** ما دور skeleton في RMI؟
A: يفك تسلسل الطلب في جهة الخادم، ينفذ التابع الفعلي، ثم يُسلسل النتيجة في رسالة الرد.

**Q7:** ما هو Binder؟
A: خدمة تحتفظ بجدول يربط الأسماء النصية بمراجع الكائنات البعيدة، تُستخدم للبحث عنها من قبل العميل.

**Q8:** ما الفرق بين بروتوكولي R وRR؟
A: R يرسل رسالة الطلب فقط (بدون رد)، بينما RR يتضمن الطلب ثم الرد.

**Q9:** لماذا يُستخدم request-reply protocol غالبًا فوق UDP وليس TCP؟
A: لتجنب نفقات إنشاء الاتصال وضبط التدفق (flow control) غير الضرورية لتبادلات صغيرة الحجم.

**Q10:** ما الغاية من إضافة كائن observer في نظام الأحداث؟
A: فصل (decouple) كائن الاهتمام عن مشتركيه، وتجنب تعقيد كائن الاهتمام بمنطق التوزيع والتصفية.

**Q11:** ما الفرق بين شفافية الموقع وشفافية بروتوكول النقل؟
A: شفافية الموقع تعني عدم معرفة مكان الكائن البعيد فعليًا، بينما شفافية بروتوكول النقل تعني عدم الاهتمام إن كان الاتصال عبر UDP أو TCP.

**Q12:** ما مكونات معرّف الرسالة (Message identifier)؟
A: `requestId` تسلسلي من المرسل + معرّف عملية المرسل (عنوان IP ورقم المنفذ)، ليكون المعرّف فريدًا عالميًا.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: اشرح مفهوم الوسيط البرمجي (Middleware) ودوره في الأنظمة الموزعة.
**نموذج الإجابة:** 1. التعريف: طبقة برمجية فوق العمليات وتمرير الرسائل توفر نموذج برمجة أعلى. 2. المكونات/الشروط: توفر خمس أنواع شفافية (موقع، بروتوكول نقل، عتاد، نظام تشغيل، لغة برمجة). 3. مثال: بروتوكول الطلب-الرد و الـ marshalling يُشكلان أساس هذا الفصل تحت طبقة RMI/RPC. 4. متى نستخدم: عند بناء أي تطبيق موزع يحتاج إخفاء تعقيد الشبكة عن المبرمج.

### سؤال 2: قارن بين دلالات استدعاء RPC الثلاث من حيث الأمان والاستخدام.
**نموذج الإجابة:** 1. التعريف: Maybe (بلا ضمانات)، At-least-once (تنفيذ مرة على الأقل)، At-most-once (تنفيذ مرة على الأكثر). 2. المكونات: تختلف في استخدام إعادة الإرسال وتصفية التكرار والسجل. 3. مثال: عملية سحب بنكي تحتاج At-most-once لمنع التنفيذ المزدوج. 4. متى نستخدم: Maybe للتطبيقات المتساهلة، At-most-once للعمليات الحرجة غير المتحايدة.

### سؤال 3: اشرح دور جدول الكائنات البعيدة (Remote object table) في تنفيذ RMI.
**نموذج الإجابة:** 1. التعريف: جدول يحتفظ به Remote reference module. 2. المكونات: مدخلات للكائنات البعيدة المستضافة، ومدخلات للوكلاء (proxies) المحليين. 3. مثال: عند تمرير كائن بعيد لأول مرة، يُنشأ مرجع جديد ويُضاف للجدول. 4. متى نستخدم: عند كل عملية تسلسل أو فك تسلسل لمرجع كائن بعيد.

### سؤال 4: ما الفرق بين الكائنات المحلية والكائنات البعيدة من حيث حق الاستدعاء؟
**نموذج الإجابة:** 1. التعريف: الكائن البعيد يملك واجهة بعيدة (remote interface) تحدد التوابع القابلة للاستدعاء من عمليات أخرى. 2. المكونات: الكائنات من عمليات أخرى تستدعي فقط توابع الواجهة البعيدة، أما الكائنات المحلية (بنفس العملية) فتستدعي أي تابع آخر أيضًا. 3. مثال: B وF في المخطط يجب أن يملكا واجهات بعيدة. 4. متى نستخدم: عند تصميم أي كائن يُراد جعله قابلًا للاستدعاء عبر الشبكة.

### سؤال 5: اشرح كيف يُعالج بروتوكول الطلب-الرد مشكلة الرسائل المكررة.
**نموذج الإجابة:** 1. التعريف: تصفية التكرار (duplicate filtering) هي آلية للتعرف على الطلبات المُعاد إرسالها. 2. المكونات: تعتمد على requestId الفريد لكل طلب. 3. مثال: عند إعادة إرسال طلب بسبب فقدان الرد، يتعرف الخادم على requestId المكرر ويرسل الرد المحفوظ من history بدل إعادة التنفيذ. 4. متى نستخدم: إلزامي في العمليات غير المتحايدة تحت دلالة At-most-once.

### سؤال 6: ما هي أدوار الكائنات المشاركة في نظام الأحداث الموزع؟
**نموذج الإجابة:** 1. التعريف: object of interest، event، notification، subscriber، observer، publisher. 2. المكونات: كل دور له مسؤولية محددة في سلسلة إنتاج وتوصيل الإشعار. 3. مثال: كائن حساب المستخدم = object of interest، تغيّر حالته = event. 4. متى نستخدم: عند تصميم أي نظام يحتاج تفاعلًا فوريًا بين مكونات غير متزامنة.

### سؤال 7: قارن بين التمثيل الخارجي للبيانات في CORBA وJava serialization وXML.
**نموذج الإجابة:** 1. التعريف: ثلاثة أساليب لتحويل هياكل البيانات لصيغة قابلة للإرسال. 2. المكونات: CORBA (قيم فقط، عبر اللغات)، Java serialization (قيم + أنواع، خاص بجافا)، XML (نصي، قيم + أنواع، عبر اللغات). 3. مثال: نظام متعدد اللغات يفضل CORBA أو XML على Java serialization. 4. متى نستخدم: حسب الحاجة لمعلومات النوع وتنوع لغات البرمجة المستخدمة.

### سؤال 8: اشرح العلاقة بين بروتوكولات R وRR وRRA ومتى يُستخدم كل منها.
**نموذج الإجابة:** 1. التعريف: ثلاثة أنماط لتبادل الرسائل في الاستدعاء البعيد. 2. المكونات: R (طلب فقط)، RR (طلب+رد)، RRA (طلب+رد+تأكيد). 3. مثال: تحديث لا يحتاج قيمة مُرجَعة يستخدم R، بينما نظام يحتاج تفريغ history بأمان يستخدم RRA. 4. متى نستخدم: RR هو الأكثر شيوعًا للتفاعلات العادية.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المفاهيم
| الموضوع | يرتبط مع | كيف؟ |
| --- | --- | --- |
| Marshalling | Request-reply protocol | كل رسالة طلب/رد تحتاج تسلسل بياناتها أولًا |
| RPC | Request-reply protocol | RPC يُبنى فوق بروتوكول الطلب-الرد |
| RMI | RPC | RMI امتداد لـ RPC يضيف الكائنات ومراجعها |
| Proxy/Skeleton | Client/Server stub (RPC) | نفس الدور تقريبًا، لكن proxy/skeleton خاص بالكائنات |
| Event-based programming | Request-reply | يمكن أن يُبنى فوقه أيضًا كآلية نقل الإشعارات |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| Middleware | يوفر 5 أنواع شفافية: موقع، بروتوكول نقل، عتاد، نظام تشغيل، لغة برمجة |
| Marshalling | تحويل هيكل بيانات لبايتات؛ 3 أساليب: CORBA، Java serialization، XML |
| RPC semantics | Maybe / At-least-once / At-most-once حسب إعادة الإرسال وتصفية التكرار والسجل |
| RMI components | Proxy، Skeleton، Dispatcher، Remote reference module، Remote object table |
| Event-based | Publisher/Subscriber، Observer للفصل، دلالات تسليم: unreliable/reliable/real-time |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `requestId` | معرّف تسلسلي للطلب | مطابقة الرد وتصفية التكرار |
| `operationId` | معرّف الدالة/التابع المطلوب | يُستخدم من proxy/client stub وdispatcher |
| `RemoteObjectRef` | مرجع فريد لكائن بعيد | تمريره كمعامل أو نتيجة استدعاء |
| `IDL` | لغة تعريف الواجهات | تعريف service interface وremote interface |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | RPC للإجراءات، RMI للكائنات — لا تخلط بينهما |
| 2 | At-most-once تحتاج تصفية تكرار + سجل، وليس فقط إعادة إرسال |
| 3 | العمليات المتحايدة آمنة للتكرار، غيرها يحتاج حماية صريحة |
| 4 | requestId وحده غير كافٍ للتفرد؛ يجب دمجه مع معرّف العملية المرسِلة |
| 5 | Observer في نظام الأحداث يفصل الناشر عن المشترك، لا يلغي الحاجة لخدمة الأحداث |

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين RPC وRMI بمثال واضح.
- [ ] أعرف تعريف Marshalling وUnmarshalling والفرق بينهما.
- [ ] أستطيع تفسير جدول دلالات استدعاء RPC (Maybe/At-least-once/At-most-once) وربطه بحالة عملية متحايدة أو لا.
- [ ] أفهم مكونات معرّف الرسالة (requestId + معرّف المرسل) وسبب الحاجة لكل جزء.
- [ ] أستطيع رسم/شرح تدفق RMI الكامل من proxy حتى skeleton والعودة.
- [ ] أعرف دور كل من: Remote reference module، Remote object table، Binder، Dispatcher.
- [ ] أفهم الفرق بين بروتوكولات R وRR وRRA ومتى يُستخدم كل منها.
- [ ] أستطيع شرح نموذج publish/subscribe وأدوار object of interest / observer / subscriber / publisher.
- [ ] أعرف الفرق بين دلالات تسليم الإشعارات الثلاث (unreliable/reliable/real-time) مع مثال لكل منها.
- [ ] راجعت جميع أسئلة MCQ وبطاقات Q&A وفهمت تعليل كل إجابة خاطئة.

<!-- VALIDATION: تمت مطابقة المحتوى مع شرائح المحاضرة الأصلية (Distributed Objects and Remote Invocation، chapters 4+5+6+8، د. محسن عبود، 27/4/2026). غُطيت جميع الأقسام: Introduction، External Data Representation، Request-reply protocols، RPC، RMI، Event-based Distributed Programming. تم الالتزام ببنية SCHEMA الموصوفة في dist-systems.md قدر الإمكان (اقتباسات + شرح مبسط + تشبيهات + مخططات + جداول + خوارزميات + أسئلة MCQ 16 + بطاقات Q&A 12 + أسئلة نظرية 8 + تمارين متنوعة + cheat sheet + قائمة فحص ذاتي). -->

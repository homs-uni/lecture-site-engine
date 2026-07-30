# المحاضرة 3 — Docker (دوكر)
> **المادة:** إدارة المشاريع (القسم النظري والعملي) | **الموضوع:** `Docker` — الصور والحاويات وأدوات النشر

---
## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. ما هو Docker

#### النص الأصلي يقول:
> "Docker is system used to easily deploy application to production. It is the answer to the age old question: 'Why is not working?'"

#### الشرح المبسّط:
`Docker` هو نظام يسمح لك بأخذ تطبيقك بكل ما يحتاجه (نظام تشغيل مصغّر، مكتبات، إعدادات) وتغليفه في وحدة واحدة قابلة للنقل، بحيث يعمل في أي مكان بنفس الطريقة التي عمل بها عندك.

**لماذا؟** لأن أكبر كابوس في هندسة البرمجيات هو جملة "عندي شغّال!" — أي أن الكود يعمل على جهاز المطوّر لكنه يفشل على السيرفر بسبب اختلاف إصدار مكتبة أو نظام تشغيل. `Docker` يقتل هذه المشكلة من الجذور لأنه ينقل البيئة كاملة وليس الكود فقط.

#### 💡 التشبيه:
> تخيّل أنك ترسل لصديقك وجبة طعام كاملة معبّأة (المكوّنات + الصلصة + طريقة التسخين) بدل أن ترسل له وصفة ويطبخها بنفسه فتختلف النتيجة حسب أدواته.
> **وجه الشبه:** الوجبة المعبّأة = `Docker Image` (كل شيء جاهز بداخلها) | مطبخ صديقك المختلف = بيئة السيرفر المختلفة عن بيئتك.

---

### 1.1. آلية عمل Docker (Images & Containers)

#### النص الأصلي يقول:
> "Docker allows to replicate the exact needed environment on the target machine without the hassle of installing the suitable OS, packages and libraries. It does so by ways of images and containers."

#### الشرح المبسّط:
`Docker` يحقق هذا التكرار (replication) للبيئة عبر مفهومين أساسيين:
- `Image`: القالب الجاهز الذي يحتوي كل شيء (النظام، المكتبات، الكود).
- `Container`: النسخة الحيّة (قيد التشغيل) من ذلك القالب.

**لماذا؟** فصل "القالب" عن "النسخة قيد التشغيل" يسمح بتشغيل عشرات الحاويات من نفس الصورة دون تكرار التثبيت في كل مرة — تماماً كما تُصنع عشرات الكعكات من نفس القالب.

---

### 1.2. الفرق بين Docker و الأجهزة الافتراضية (VMs)

#### النص الأصلي يقول:
> "At first it looks like virtual machines but it is lighter and different. VMs is about simulating hardware to create virtual environment that mimics real environment. Containers are about creating a sandbox environment in which changes don't propagate to the host OS without permission. This sandbox include: Hardware, Filesystem, Network"

#### الشرح المبسّط:
- الـ `VM` (Virtual Machine) تحاكي جهازاً كاملاً بعتاده الافتراضي (معالج، ذاكرة، قرص) وتشغّل فوقه نظام تشغيل كامل مستقل — لذلك تكون ثقيلة وبطيئة الإقلاع.
- الـ `Container` لا يحاكي عتاداً؛ إنه "صندوق رملي" (`sandbox`) معزول يشارك نواة نظام التشغيل المضيف (`host OS`) لكنه يمنع أي تغيير من الانتشار للخارج دون إذن. هذا العزل يشمل ثلاثة أبعاد: العتاد (الموارد المخصّصة)، نظام الملفات، والشبكة.

**لماذا؟** لأن الحاوية أخف بكثير (لا تحتاج تشغيل نظام تشغيل كامل)، فتُقلع في ثوانٍ بدل دقائق، وتستهلك موارد أقل بكثير من الـ `VM`.

#### ⚖️ المقايضة: Docker Container vs Virtual Machine

| | `Container` | `Virtual Machine` |
| --- | --- | --- |
| المزايا | إقلاع سريع، خفيف على الموارد، مشاركة نواة النظام | عزل كامل حتى على مستوى نواة النظام، يمكنه تشغيل نظام تشغيل مختلف تماماً |
| العيوب | يشارك نواة النظام المضيف (عزل أقل صرامة) | ثقيل، بطيء الإقلاع، يستهلك موارد أكبر |
| متى تختاره | نشر تطبيقات وخدمات ويب واختبارات سريعة | الحاجة لعزل أمني صارم أو تشغيل نظام تشغيل مختلف بالكامل |

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا يستطيع سيرفر واحد تشغيل عشرات الحاويات لكنه بالكاد يشغّل عدداً قليلاً من الأجهزة الافتراضية؟
> **لماذا هذا مهم؟** لأنه يفسر سبب تفضيل `Docker` في بيئات الإنتاج الحديثة وأنظمة `Cloud`.

---

### 2. تاريخ Docker

#### النص الأصلي يقول:
> "Limiting apps to a certain sandbox is not new, UNIX did it in 1979 using troot... FreeBSD provided Jails in 2000... Solaris Provided zones in 2004... As a result LXC (Linux Containers) was developed in 2008. But it was complex and messy without a standard unit"

#### الشرح المبسّط:
فكرة عزل التطبيقات ليست اختراع `Docker`؛ لها تاريخ طويل:

| السنة | الأداة | النظام | ملاحظة |
| --- | --- | --- | --- |
| 1979 | `chroot` | `UNIX` | أقنعت العملية أنها تعيش في جذر خاص بها منفصل (تمّ تسميتها في المحاضرة "troot" وهي إشارة إلى `chroot`) |
| 2000 | `Jails` | `FreeBSD` | عزل أعمق من `chroot` |
| 2004 | `Zones` | `Solaris` | عزل على مستوى نظام كامل |
| 2008 | `LXC` (Linux Containers) | `Linux` | أول محاولة جدّية على `Linux` لكنها كانت معقّدة وبلا معيار موحّد |

**لماذا؟** فهم هذا التسلسل يوضّح أن `Docker` لم يخترع العزل، بل حلّ مشكلة "التعقيد وغياب المعيار الموحّد" التي عانت منها `LXC`.

#### الفهم الخاطئ الشائع ❌: `Docker` هو أول من اخترع فكرة الحاويات.
#### الفهم الصحيح ✅: `Docker` هو من قام بتوحيد ومعيرة وتسهيل استخدام فكرة موجودة أصلاً منذ 1979.

---

### 2.1. قصة .Cloud وميلاد Docker

#### النص الأصلي يقول:
> "dotCloud was platform as a service company... developed it own solution. A tool that standardized the containers in LXC... As a result dotCloud took a bold step forward and announced Docker as an opensource software at PyCon 2013"

#### الشرح المبسّط:
شركة `dotCloud` كانت تقدّم خدمة `PaaS` (Platform as a Service) وكانت تعاني من فوضى في عملية النشر (`deployment chaos`) تسبّب انهيارات في النظام، لأن السكربتات (`scripts`) كانت غير موثوقة والـ `VMs` ثقيلة جداً. فطوّروا أداة داخلية توحّد استخدام `LXC`. الأداة كانت جيدة لدرجة أن عملاء الشركة بدأوا يسألون عن الأداة نفسها لا عن خدمة الـ `PaaS`، فقررت الشركة إطلاقها كمشروع مفتوح المصدر (`open source`) في مؤتمر `PyCon 2013`.

**لماذا؟** هذه قصة كلاسيكية في عالم التقنية: أداة داخلية لحل مشكلة داخلية تتحول لمنتج عالمي لأن المشكلة كانت عامة وليست خاصة بشركة واحدة.

---

### 2.2. مثال Gitlab كتوضيح لقيمة Docker

#### النص الأصلي يقول:
> "Gitlab is a complex piece of software acting as: Git UI, Issue Management, CI/CD, Package Repository, Container (Image) Repository... You can download Gitlab and run it on bare metal but: You need to install and configure PostgreSQL, Redis among other software. Or... you pull the image from Docker Hub, write a few bytes of configuration and poof you have an instance running"

#### الشرح المبسّط:
`Gitlab` برنامج معقّد يحتاج تثبيت قواعد بيانات (`PostgreSQL`) وأنظمة تخزين مؤقت (`Redis`) وغيرها يدوياً لو ثبّته على السيرفر مباشرة (`bare metal`). لكن بفضل `Docker` يمكنك سحب (`pull`) صورة جاهزة تحتوي كل هذه الإعدادات مسبقاً من `Docker Hub` وتشغيلها مباشرة.

#### 💻 الكود: تشغيل Gitlab عبر Docker Compose

#### ما هذا الكود؟
> ملف `docker-compose.yml` يعرّف خدمة `Gitlab` كاملة بإعداداتها ومنافذها ومساراتها الدائمة (volumes) دون أي تثبيت يدوي.

```yaml
services:                                  # Top-level key defining all services
  gitlab:                                  # Service name: gitlab
    image: gitlab/gitlab-ce:latest         # Pull the Community Edition image
    container_name: gitlab                 # Name the running container "gitlab"
    restart: always                        # Always restart the container if it stops
    hostname: 'domain'                     # Set internal hostname
    environment:                           # Environment variables block
      GITLAB_OMNIBUS_CONFIG: |             # Multi-line Gitlab internal config
        external_url 'http://domain'       # Public URL used by Gitlab
    shm_size: '256m'                       # Shared memory size for the container
    ports:                                 # Port mapping block
      - '2424:22'                          # host:container (SSH port mapping)
    volumes:                               # Persistent storage mapping block
      - '/opt/gitlab/gitlab/config:/etc/gitlab'
      - '/opt/gitlab/gitlab/logs:/var/log/gitlab'
      - '/opt/gitlab/gitlab/data:/var/opt/gitlab'
```

#### شرح كل سطر:
1. `services:` → مفتاح جذري — يبدأ تعريف كل الخدمات (containers) في الملف
2. `gitlab:` → اسم الخدمة — معرّف داخلي يستخدمه Compose للإشارة لهذه الخدمة
3. `image: gitlab/gitlab-ce:latest` → تحديد الصورة — يخبر Docker بأي صورة يبني منها الحاوية، وأي إصدار (`latest`)
4. `container_name: gitlab` → التسمية — الاسم الذي سيظهر عند تنفيذ `docker ps`
5. `restart: always` → سياسة إعادة التشغيل — يضمن استمرارية الخدمة حتى بعد إعادة تشغيل السيرفر
6. `hostname: 'domain'` → اسم المضيف الداخلي للحاوية
7. `environment:` → بداية كتلة متغيرات البيئة الممرّرة للحاوية
8. `GITLAB_OMNIBUS_CONFIG: |` → متغير خاص بـ Gitlab يحتوي إعدادات متعددة الأسطر
9. `external_url 'http://domain'` → الرابط العام الذي يُستخدم Gitlab من خلاله
10. `shm_size: '256m'` → حجم الذاكرة المشتركة المطلوبة لأداء أفضل
11. `ports:` → بداية كتلة ربط المنافذ
12. `- '2424:22'` → ربط المنفذ 2424 على المضيف بالمنفذ 22 (SSH) داخل الحاوية
13. `volumes:` → بداية كتلة الأحجام الدائمة
14. المسارات الثلاثة → تربط مجلدات الإعدادات، السجلات، والبيانات بين المضيف والحاوية بحيث لا تُفقد عند حذف الحاوية

**المكتبات المطلوبة (Imports):**
> لا يوجد — هذا ملف تهيئة `YAML` يُقرأ مباشرة بأمر `docker compose up -d`

**الناتج المتوقع (لقطة الشاشة):**
> بعد تنفيذ الأمر، ستحصل على نسخة `Gitlab` كاملة تعمل ويمكن الوصول إليها عبر المتصفح خلال دقائق، دون تثبيت `PostgreSQL` أو `Redis` يدوياً.

---

### 2.3. حادثة أكتوبر 2025 — هشاشة الإنترنت الحديث

#### النص الأصلي يقول:
> "On October 20th 2025, half the Internet including Docker hub... went offline. The cause was bad DNS configuration in US-East-1 Amazon AWS services. This crash, although lasted for few hours, indicated how crucial Docker is and how fragile the current Internet is too."

#### الشرح المبسّط:
في 20 أكتوبر 2025، تعطّل إعداد خاطئ في نظام `DNS` بمنطقة `US-East-1` في `AWS` نصف الإنترنت تقريباً، بما في ذلك `Docker Hub` نفسه (المستودع الرئيسي لصور Docker). الحادثة استمرت ساعات قليلة فقط، لكنها أظهرت أمرين مهمين:
1. مدى اعتماد الخدمات الحديثة على `Docker` كبنية تحتية أساسية.
2. مدى هشاشة الإنترنت الحالي عندما يعتمد جزء كبير منه على مزوّد واحد (`AWS`) أو منطقة واحدة.

**لماذا؟** هذا درس مهم في إدارة المخاطر (`Risk Management`) — الاعتماد على نقطة فشل واحدة (`Single Point of Failure`) خطر حتى لو كانت تلك النقطة عملاقة مثل `AWS`.

#### نقطة مهمة ⚠️:
> هذه الحادثة مثال حي على أهمية التخطيط لسيناريوهات الفشل (Contingency Planning) في إدارة المشاريع التقنية — حتى العمالقة يمكن أن يتعطلوا.

---

### 3. مكونات Docker (The Components of Docker)

#### النص الأصلي يقول:
> "Docker Build... Docker Compose... Together compose and build creates the Docker Engine. Docker Networks... Docker Volumes..."

#### الشرح المبسّط:
يتكون نظام `Docker` من عدة أدوات متكاملة، كل واحدة مسؤولة عن جانب معيّن:

### 3.1. Docker Build

`Docker Build` هو الأداة التي تبني `Image` من ملف يسمى `Dockerfile`، وهو ملف نصي يحتوي تعليمات "كيف نبني هذه الصورة" و"ما الأمر الذي يجب تشغيله عند بدء التشغيل".

**لماذا؟** لأننا نحتاج طريقة موصوفة ومكرَّرة (declarative & reproducible) لبناء البيئة بدل تنفيذ خطوات يدوية عشوائية.

### 3.2. Docker Compose

أداة تستخدم ملف `YAML` (Yet Another Markup Language) لوصف حاوية أو مجموعة حاويات دفعة واحدة (كما رأينا في مثال Gitlab).

> **مهم للامتحان ⚠️:** النص الأصلي يذكر أن `Compose` + `Build` معاً يُكوّنان ما يُسمى `Docker Engine`.

### 3.3. Docker Networks

شبكات افتراضية توفّر الاتصال الشبكي للحاويات، وتربطها بالمضيف (`host`) وبالعالم الخارجي.

### 3.4. Docker Volumes

طريقة لربط مجلد على نظام التشغيل المضيف بمجلد داخل الحاوية، بحيث تُحفظ الملفات حتى لو حُذفت الحاوية. كما توفّر طريقة آمنة لنقل الملفات بين الحاوية والمضيف مع احترام الصلاحيات (`permissions`).

#### 💡 التشبيه:
> `Volume` أشبه بخزنة خارجية متصلة بغرفة فندق مؤقتة (الحاوية) — حتى لو غادرت الغرفة (حُذفت الحاوية) تبقى أغراضك في الخزنة (المضيف).
> **وجه الشبه:** الغرفة المؤقتة = `Container` (تُحذف وتُعاد بلا ذاكرة) | الخزنة الخارجية = `Volume` (بيانات دائمة).

---

### 3.5. Image, Container, Registry

#### النص الأصلي يقول:
> "Image: The basis of a Docker container... Container: The standard unit in which the application service resides and executes... Registry Service (Docker Hub or Docker Trusted Registry): Cloud or server based storage and distribution service for your images"

#### الشرح المبسّط:

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Image` | القالب الأساسي الذي يمثّل تطبيقاً كاملاً وبيئته المهيّأة بالكامل | `gitlab/gitlab-ce:latest` |
| `Container` | الوحدة القياسية التي يعمل بها التطبيق فعلياً — عندما نُشغّل `Image` تصبح `Container` | نسخة تشغيل واحدة من صورة `httpd` |
| `Registry Service` | خدمة تخزين وتوزيع الصور، سحابية أو على سيرفر خاص | `Docker Hub`, `Docker Trusted Registry` |

**لماذا؟** التمييز بين هذه المصطلحات الثلاثة أساسي لفهم أي محادثة تقنية عن `Docker` لاحقاً.

---

### 4. كيفية استخدام Docker (How to Use Docker)

### 4.1. التثبيت (Installation)

#### النص الأصلي يقول:
> "Debian and Ubuntu will require adding a new repository... RHEL, Alma, Rocky and Fedora will have the latest version by default... Windows: Unlike Linux, Docker doesn't run directly on Windows. You need to install either Hyper-V... or WSL..."

#### الشرح المبسّط:

| نظام التشغيل | طريقة التثبيت |
| --- | --- |
| `Debian` / `Ubuntu` | يحتاج إضافة مستودع (repository) جديد يحتوي أحدث نسخة من `docker-ce` |
| `RHEL` / `Alma` / `Rocky` / `Fedora` | تأتي بأحدث نسخة افتراضياً |
| `Arch` ومشتقاته | أحدث نسخة متوفرة افتراضياً أيضاً |
| `Windows` | لا يعمل Docker مباشرة، يحتاج `Hyper-V` (مدير أجهزة افتراضية) أو `WSL` (Windows Subsystem for Linux) |
| `macOS` | يعمل بطريقة مشابهة لـ `Linux` (لم يُختبر من قِبل المحاضر شخصياً حسب النص) |

**لماذا؟** لأن `Docker` يعتمد على ميزات نواة `Linux` مباشرة، فأي نظام تشغيل غير `Linux` يحتاج طبقة وسيطة (VM أو Subsystem) لمحاكاة تلك البيئة.

### 4.2. الصلاحيات (Permissions)

#### النص الأصلي يقول:
> "you either must add the current user to docker group using sudo usermod -aG docker $USER or run docker in rootless mode... when installing Docker on Linux, by default it will not be running even if you restart the computer"

#### الشرح المبسّط:
افتراضياً، تنفيذ أوامر `Docker` يتطلب صلاحيات المدير (`sudo`). لتفادي كتابة `sudo` مع كل أمر، لديك خياران:
1. إضافة المستخدم لمجموعة `docker` (الخيار الأنجح حسب خبرة المحاضر).
2. تشغيل `Docker` في وضع `rootless`.

كذلك، خدمة `Docker` لا تعمل تلقائياً بعد إعادة تشغيل الجهاز إلا إذا فعّلتها.

#### 💻 الكود: إعداد الصلاحيات وتفعيل الخدمة

```bash
sudo usermod -aG docker $USER      # Add current user to the docker group
sudo systemctl enable -f docker    # Enable docker service to start on boot
sudo systemctl start docker        # Start the docker service now
sudo systemctl stop docker         # Stop the docker service
sudo systemctl restart docker      # Restart the docker service
```

#### شرح كل سطر:
1. `sudo usermod -aG docker $USER` → يضيف المستخدم الحالي (`$USER`) لمجموعة `docker` دون إزالته من مجموعاته الأخرى (`-a` تعني append)
2. `sudo systemctl enable -f docker` → يجعل خدمة `docker` تبدأ تلقائياً مع كل إقلاع للنظام (ضروري على السيرفرات `VPS`)
3. `sudo systemctl start docker` → يبدأ الخدمة فوراً دون انتظار إعادة التشغيل
4. `sudo systemctl stop docker` → يوقف الخدمة
5. `sudo systemctl restart docker` → يعيد تشغيل الخدمة (إيقاف ثم تشغيل)

**الناتج المتوقع (لقطة الشاشة):**
> بعد `usermod` تحتاج لتسجيل الخروج والدخول مجدداً (أو إعادة تشغيل الجلسة) لتفعيل العضوية الجديدة، بعدها يمكنك تنفيذ أوامر `docker` بلا `sudo`.

#### مهم للامتحان ⚠️:
> على السيرفرات (`VPS`) يجب دائماً تفعيل `systemctl enable -f docker` وإلا فلن يعمل `Docker` تلقائياً بعد أي إعادة تشغيل غير متوقعة للسيرفر.

---

### 4.3. حاوية الاختبار (The Test Container)

#### النص الأصلي يقول:
> "pull which downloads the image from Docker registry... run which creates a container from an existing image and runs it... To pull we use: docker pull containous/whoami"

#### الشرح المبسّط:
لاختبار أن `Docker` يعمل بشكل صحيح، نستخدم صورة تجريبية بسيطة اسمها `containous/whoami`. هناك أمران أساسيان:
- `pull`: يُنزّل الصورة من المستودع (افتراضياً `Docker Hub`) دون تشغيلها.
- `run`: يُنشئ حاوية من الصورة ويشغّلها، وإذا لم تكن الصورة موجودة محلياً فسيحاول تنزيلها أولاً تلقائياً.

#### ⚙️ الخطوات / الخوارزمية: تشغيل حاوية اختبارية

> الهدف: التأكد من أن Docker مثبّت ويعمل بشكل صحيح على الجهاز.

```algorithm
1 | تحديد الصورة المطلوبة | docker pull | تنزيل containous/whoami:latest من Docker Hub
2 | تشغيل الحاوية | docker run --rm -p 80:80 | إنشاء حاوية من الصورة وربط المنفذ 80 بالمضيف
3 | التحقق | متصفح / curl | فتح http://127.0.0.1 والتأكد من ظهور استجابة الحاوية
```

#### نقاط التنفيذ:
- إذا لم تُحدَّد نسخة الصورة، سيُستخدم `:latest` تلقائياً.
- استخدام `--rm` يعني أن الحاوية تُحذف تلقائياً بعد إيقافها (تشغيل لمرة واحدة).

#### 💻 الكود: تنزيل وتشغيل صورة الاختبار

```bash
docker pull containous/whoami                    # Pull the latest tag by default
docker pull containous/whoami:latest              # Explicit equivalent of the line above
docker pull containous/whoami:v1.5.0               # Pull a specific version instead
docker run --rm -p 80:80 containous/whoami:latest   # Create and run a container from the image
```

#### شرح كل سطر:
1. `docker pull containous/whoami` → يسحب أحدث نسخة (`latest` ضمنياً) من الصورة
2. `docker pull containous/whoami:latest` → نفس الأمر السابق لكن بذكر `:latest` صراحة
3. `docker pull containous/whoami:v1.5.0` → يسحب نسخة محددة عبر تغيير النص بعد النقطتين `:`
4. `docker run --rm -p 80:80 containous/whoami:latest` → ينشئ ويشغّل حاوية: `--rm` تحذفها بعد الانتهاء، و`-p 80:80` تربط المنفذ 80 على المضيف بالمنفذ 80 داخل الحاوية

**الناتج المتوقع (لقطة الشاشة):**
> الطرفية تعرض `Starting up on port 80`، وعند فتح `http://127.0.0.1` في المتصفح تظهر معلومات الطلب (Hostname, IP, Headers...) القادمة من داخل الحاوية، مما يؤكد أن الحاوية تستقبل الطلبات فعلياً.

#### 💡 التشبيه:
> `-p 80:80` أشبه بتوصيل خط هاتف خارجي (المضيف) برقم داخلي معيّن داخل مبنى (الحاوية).
> **وجه الشبه:** الرقم الأول (80 الأولى) = خط المبنى الخارجي (المضيف) | الرقم الثاني (80 الثانية) = الامتداد الداخلي (المنفذ داخل الحاوية).

---

### 4.4. إدارة الصور (Managing Images)

#### النص الأصلي يقول:
> "build: Build an image from a Dockerfile... history... import... inspect... load... ls: List images... prune... pull... push... rm... save... tag..."

#### الشرح المبسّط:
كل هذه الأوامر تنتمي لمجموعة `docker image` (أي الشكل الكامل هو `docker image [cmd]`)، لكن بعضها له اختصار مباشر.

| الأمر | الوظيفة | هل يُستخدم مباشرة؟ |
| --- | --- | --- |
| `build` | بناء صورة من `Dockerfile` | نعم: `docker build` |
| `history` | عرض تاريخ بناء الصورة (الطبقات) | لا: `docker image history` |
| `import` | استيراد محتوى من ملف `tar` لبناء صورة | نعم: `docker import` |
| `inspect` | عرض تفاصيل دقيقة عن صورة أو أكثر | لا: `docker image inspect` |
| `load` | تحميل صورة من أرشيف `tar` أو من `STDIN` | نعم: `docker load` |
| `ls` | عرض قائمة الصور | لا: `docker image ls` |
| `prune` | حذف الصور غير المستخدَمة | لا: `docker image prune` |
| `pull` | تنزيل صورة من مستودع | نعم: `docker pull` |
| `push` | رفع صورة إلى مستودع | نعم: `docker push` |
| `rm` | حذف صورة أو أكثر | نعم لكن باسم مختلف: `docker rmi` |
| `save` | حفظ صورة كأرشيف `tar` | نعم: `docker save` |
| `tag` | إنشاء اسم بديل (وسم) لصورة موجودة | نعم: `docker tag` |

**لماذا؟** معرفة أي الأوامر تُستخدم مباشرة وأيها يحتاج البادئة `docker image` توفّر عليك وقتاً كبيراً وتمنع أخطاء الكتابة الشائعة في الطرفية.

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| `docker rm image_name` لا يعمل على صورة | استخدام أمر حذف الحاويات (`rm`) بدل حذف الصور (`rmi`) | استخدم `docker rmi image_name` بدلاً منه |
| `docker image inspect` بدون `image` | نسيان أن `inspect` ليس من الأوامر المباشرة | استخدم `docker image inspect <name>` كاملاً |

---

### 4.5. إدارة الحاويات (Managing Containers)

#### النص الأصلي يقول:
> "attach... commit... cp... create... diff... exec... export... inspect... kill... logs... ls: List containers (to use directly we type docker ps)... pause... port... prune... rename... restart... rm... run... start... stats... stop... top... unpause... update... wait..."

#### الشرح المبسّط:
مجموعة أوامر `docker container [cmd]`، ومعظمها (خلافاً للصور) يُستخدم مباشرة دون البادئة.

| الأمر | الوظيفة | هل يُستخدم مباشرة؟ |
| --- | --- | --- |
| `attach` | ربط المدخل/المخرج المحلي بحاوية قيد التشغيل | نعم |
| `commit` | إنشاء صورة جديدة من تغييرات حاوية | نعم |
| `cp` | نسخ ملفات بين الحاوية والمضيف | نعم |
| `create` | إنشاء حاوية جديدة دون تشغيلها | نعم |
| `diff` | عرض التغييرات على نظام ملفات الحاوية | نعم |
| `exec` | تنفيذ أمر داخل حاوية تعمل حالياً | نعم |
| `export` | تصدير نظام ملفات الحاوية كأرشيف `tar` | نعم |
| `inspect` | عرض تفاصيل حاوية أو أكثر | نعم |
| `kill` | إيقاف حاوية (أو أكثر) قسراً | نعم |
| `logs` | جلب سجلات الحاوية | نعم |
| `ls` | عرض قائمة الحاويات | لا: `docker ps` |
| `pause` | إيقاف كل العمليات مؤقتاً داخل حاوية | لا: `docker container pause` |
| `port` | عرض ربط المنافذ الخاصة بحاوية | لا: `docker container port` |
| `prune` | حذف كل الحاويات المتوقفة | لا: `docker container prune` |
| `rename` | إعادة تسمية حاوية | نعم |
| `restart` | إعادة تشغيل حاوية أو أكثر | نعم |
| `rm` | حذف حاوية أو أكثر | نعم |
| `run` | إنشاء وتشغيل حاوية جديدة من صورة | نعم |
| `start` | تشغيل حاوية متوقفة | نعم |
| `stats` | عرض إحصاءات استهلاك الموارد لحظياً | نعم |
| `stop` | إيقاف حاوية أو أكثر | نعم |
| `top` | عرض العمليات الجارية داخل حاوية | نعم |
| `unpause` | إلغاء إيقاف مؤقت لحاوية | نعم |
| `update` | تحديث إعدادات حاوية | نعم |
| `wait` | الانتظار حتى تتوقف حاوية ثم طباعة كود الخروج | نعم |

#### الفهم الخاطئ الشائع ❌: كل أوامر الصور والحاويات تُستخدم بنفس الطريقة المباشرة.
#### الفهم الصحيح ✅: بعض أوامر الصور (مثل `ls`, `inspect`, `history`, `prune`) تحتاج البادئة `docker image`، بينما معظم أوامر الحاويات تُستخدم مباشرة باستثناء `ls`, `pause`, `port`, `prune`.

---

### 5. بناء صورة (Building An Image)

### 5.1. صورة بسيطة — خادم Apache

#### النص الأصلي يقول:
> "FROM httpd:latest means I am basing this image on Apache webserver image... The second line copies the file index.html from the local directory to a folder inside the image /usr/local/apache2/htdocs/"

#### الشرح المبسّط:
أبسط صورة ممكنة تحتاج سطرين فقط: سطر تحديد الأساس (`FROM`) وسطر نسخ الملف (`COPY`).

#### 💻 الكود: صورة Apache بسيطة

```dockerfile
FROM httpd:latest                              # Inherit from the official Apache image
COPY index.html /usr/local/apache2/htdocs/     # Copy our homepage into Apache's serve folder
```

#### شرح كل سطر:
1. `FROM httpd:latest` → يحدد الصورة الأساس التي نبني فوقها — أشبه بالوراثة (`inheritance`) في البرمجة، نحصل على كل مزايا صورة `httpd` دون إعادة بنائها من الصفر
2. `COPY index.html /usr/local/apache2/htdocs/` → ينسخ ملف `index.html` من المجلد المحلي إلى المجلد الذي يخدم منه Apache صفحاته

**الناتج المتوقع (لقطة الشاشة):**
> صورة جاهزة، عند تشغيلها كحاوية، تخدم ملف `index.html` عبر خادم Apache تلقائياً بلا أي إعداد إضافي.

#### 💡 التشبيه:
> `FROM` أشبه بأخذ سيارة جاهزة من المصنع (بدل بناء محرك من الصفر) ثم إضافة ملصقات خاصة بك (`COPY`) عليها.
> **وجه الشبه:** السيارة الجاهزة = الصورة الأساس `httpd:latest` | الملصقات = ملفاتك الخاصة المضافة بـ `COPY`.

---

### 5.2. صورة معقّدة — بناء واجهة React متعددة المراحل (Multi-stage)

#### النص الأصلي يقول:
> "This is a more complex image used to build a react frontend: FROM node:24-trixie-slim AS base... FROM base AS deps... FROM deps AS build... FROM httpd:latest COPY --from=build /app/dist /usr/local/apache2/htdocs/"

#### الشرح المبسّط:
هذا مثال على أسلوب `Multi-stage Build` — بناء الصورة عبر عدة "مراحل" مسمّاة، كل مرحلة تعتمد على السابقة، وفي النهاية نأخذ فقط النتيجة النهائية (ملفات React المبنية) وننسخها إلى صورة نظيفة صغيرة (`httpd`) بدل شحن كل أدوات البناء الثقيلة (`Node.js`, `pnpm`...) في الصورة النهائية.

**لماذا؟** لأن أدوات البناء (`Node`, `pnpm`, مكتبات التطوير) لا نحتاجها وقت التشغيل الفعلي — إبقاؤها في الصورة النهائية يجعلها أضخم بلا فائدة وأقل أماناً.

#### 💻 الكود: Dockerfile كامل — بناء واجهة React وخدمتها عبر Apache

```dockerfile
FROM node:24-trixie-slim AS base                          # Base stage: Node 24 on Debian Trixie
ENV PNPM_HOME="/pnpm"                                      # Set pnpm's home directory
ENV PATH="$PNPM_HOME:$PATH"                                 # Add pnpm to the executable PATH
RUN corepack enable                                          # Enable Node's package manager shims

# Add missing shared libraries required by some native Node.js modules
RUN apt-get update                                            # Refresh the package index
RUN apt-get upgrade -y                                         # Upgrade existing packages
RUN apt-get install -y libc6 libstdc++6 libgomp1\
    libprotobuf-dev openssh-client openssh-server               # Install required native libs
RUN rm -rf /var/apt/cache/*                                       # Clean apt cache to reduce size
RUN rm -rf /var/lib/apt/lists/*                                     # Clean apt lists to reduce size
WORKDIR /app                                                         # Set working directory to /app

FROM base AS deps                                                     # deps stage inherits base
COPY package.json pnpm-lock.yaml* ./                                   # Copy dependency manifests only
RUN CI="true" pnpm install                                               # Install dependencies

FROM deps AS build                                                        # build stage inherits deps
COPY . .                                                                     # Copy the full project source
# Generate so TypeScript has the types to build against
RUN CI="true" pnpm run build                                                  # Run the production build

FROM httpd:latest                                                              # Final stage: clean Apache image
COPY --from=build /app/dist /usr/local/apache2/htdocs/                          # Copy only the built output
```

#### شرح كل سطر:
1. `FROM node:24-trixie-slim AS base` → يحدد `Node.js` إصدار 24 على `Debian Trixie` كأساس، ويسمّي هذه المرحلة `base` (تم اختيار Debian بدل Alpine لتفادي مشاكل توافقية حسب النص الأصلي)
2. `ENV PNPM_HOME="/pnpm"` → يعرّف متغير بيئة لمسار تثبيت `pnpm`
3. `ENV PATH="$PNPM_HOME:$PATH"` → يضيف مسار `pnpm` لمتغير `PATH` لجعله قابلاً للتنفيذ من أي مكان
4. `RUN corepack enable` → يفعّل أداة `corepack` المسؤولة عن إدارة `pnpm` تلقائياً
5. `RUN apt-get update` → يحدّث فهرس الحزم المتاحة
6. `RUN apt-get upgrade -y` → يرقّي الحزم المثبّتة لأحدث إصدار دون سؤال تفاعلي (`-y`)
7. `RUN apt-get install -y libc6 libstdc++6 libgomp1 libprotobuf-dev openssh-client openssh-server` → يثبّت مكتبات مشتركة (`shared libraries`) تحتاجها بعض وحدات `Node.js` الأصلية (`native modules`)
8. `RUN rm -rf /var/apt/cache/*` → يحذف ذاكرة `apt` المؤقتة لتقليل حجم الصورة
9. `RUN rm -rf /var/lib/apt/lists/*` → يحذف قوائم الحزم المخزّنة لنفس السبب
10. `WORKDIR /app` → يحدد `/app` كمجلد العمل الافتراضي لبقية الأوامر
11. `FROM base AS deps` → يبدأ مرحلة جديدة اسمها `deps` مبنية فوق `base`
12. `COPY package.json pnpm-lock.yaml* ./` → ينسخ فقط ملفات وصف الاعتمادات (وليس الكود بأكمله بعد) لتحسين التخزين المؤقت (`caching`)
13. `RUN CI="true" pnpm install` → يثبّت الحزم المطلوبة باستخدام `pnpm`
14. `FROM deps AS build` → يبدأ مرحلة `build` فوق `deps`
15. `COPY . .` → ينسخ كامل ملفات المشروع الآن
16. `RUN CI="true" pnpm run build` → ينفّذ عملية بناء المشروع (توليد ملفات الإنتاج النهائية)
17. `FROM httpd:latest` → يبدأ مرحلة نهائية جديدة نظيفة تماماً من صورة `httpd`
18. `COPY --from=build /app/dist /usr/local/apache2/htdocs/` → ينسخ فقط مخرجات البناء (`/app/dist`) من مرحلة `build` السابقة إلى مجلد خدمة Apache — متجاهلاً كل أدوات Node وpnpm الثقيلة

**الناتج المتوقع (لقطة الشاشة):**
> صورة نهائية خفيفة تحتوي فقط ملفات React المبنية (HTML/CSS/JS) داخل خادم Apache، بلا أي أثر لـ `Node.js` أو أدوات البناء.

#### ⚙️ الخطوات / الخوارزمية: بناء صورة متعددة المراحل (Multi-stage Build)

> الهدف: تصغير حجم الصورة النهائية وفصل بيئة البناء عن بيئة التشغيل.

```algorithm
1 | تجهيز بيئة البناء | FROM node AS base | تثبيت Node وpnpm والمكتبات المطلوبة
2 | تثبيت الاعتمادات | FROM base AS deps | نسخ package.json وتثبيت الحزم فقط
3 | بناء المشروع | FROM deps AS build | نسخ الكود الكامل وتنفيذ pnpm run build
4 | التسليم النهائي | FROM httpd + COPY --from=build | نسخ نتائج البناء فقط إلى صورة نظيفة صغيرة
```

#### نقاط التنفيذ:
- ترتيب الأوامر (`COPY package.json` قبل `COPY .`) مهم جداً لتحسين إعادة استخدام طبقات `Docker` المخزّنة (Copy On Write سيُشرح لاحقاً).
- كل مرحلة `FROM ... AS ...` مستقلة تماماً؛ الصورة النهائية لا "ترث" الأدوات من المراحل السابقة إلا ما نسخته صراحة بـ `COPY --from=`.

#### 🔄 قبل / بعد: صورة عادية مقابل صورة Multi-stage

**قبل (صورة واحدة تحتوي كل شيء):**
```dockerfile
FROM node:24-trixie-slim
COPY . .
RUN pnpm install && pnpm run build
CMD ["node", "server.js"]
```

**بعد (Multi-stage — أخف وأنظف):**
```dockerfile
FROM node:24-trixie-slim AS build
COPY . .
RUN pnpm install && pnpm run build

FROM httpd:latest
COPY --from=build /app/dist /usr/local/apache2/htdocs/
```

**ماذا تغيّر؟** الصورة النهائية لم تعد تحتوي `Node.js` أو `pnpm` أو ملفات المصدر — فقط ناتج البناء، مما يقلل الحجم ويحسّن الأمان.

---

### 5.3. أمر CMD ونهاية الصورة

#### النص الأصلي يقول:
> "In order for any image to run it must have at the end the command CMD which is the main of the image... The lack of CMD in the image means we are going to use the CMD of the parent image"

#### الشرح المبسّط:
`CMD` هو الأمر الذي يُشغَّل تلقائياً عند تحويل الصورة إلى حاوية — أشبه بدالة `main()` في البرمجة. إن لم تكتبه في `Dockerfile` الخاص بك، تُستخدم قيمة `CMD` من الصورة الأساس (الأب) تلقائياً.

#### 💻 الكود: خدمة الواجهة عبر Node.js بدل Apache

```dockerfile
FROM node:24-trixie-slim                                # Base image with Node.js
ENV PNPM_HOME="/pnpm"                                      # Set pnpm home
ENV PATH="$PNPM_HOME:$PATH"                                  # Add pnpm to PATH
RUN corepack enable                                            # Enable pnpm via corepack
RUN pnpm install http-server                                     # Install a lightweight static file server
COPY --from=build /app/dist /app                                   # Copy build output from a prior stage
WORKDIR /app                                                         # Set working directory
CMD node http-server #or CMD ["node","http-server"]                    # Define the container's main command
```

#### شرح كل سطر:
1. `FROM node:24-trixie-slim` → الصورة الأساس هذه المرة `Node.js` مباشرة بدل `httpd`
2. `ENV PNPM_HOME="/pnpm"` → نفس إعداد `pnpm` السابق
3. `ENV PATH="$PNPM_HOME:$PATH"` → إضافة `pnpm` لمسار التنفيذ
4. `RUN corepack enable` → تفعيل `corepack`
5. `RUN pnpm install http-server` → تثبيت أداة `http-server` لخدمة الملفات الثابتة
6. `COPY --from=build /app/dist /app` → نسخ ناتج البناء من مرحلة سابقة (تفترض وجود مرحلة `build` معرَّفة سابقاً)
7. `WORKDIR /app` → تحديد مجلد العمل
8. `CMD node http-server` → الأمر الذي يعمل تلقائياً عند تشغيل الحاوية؛ يمكن كتابته بصيغتين: نصية (`shell form`) أو كقائمة (`exec form`: `CMD ["node","http-server"]`)

**الناتج المتوقع (لقطة الشاشة):**
> حاوية تشغّل خادم `http-server` تلقائياً بمجرد `docker run`، بلا الحاجة لتمرير أي أمر إضافي.

#### مهم للامتحان ⚠️:
> غياب `CMD` ليس خطأً؛ الصورة سترث `CMD` من الصورة الأب. لكن إن كانت الصورة الأب بلا `CMD` مناسب لحالتك، ستحتاج لتحديد `CMD` بنفسك.

---

### 6. جوهر Docker — Copy On Write (CoW)

#### النص الأصلي يقول:
> "Docker images are immutable, meaning once created cannot be changed... Assuming we ran a database image as container... then removed the container and recreated it, all the tables and the data we have created would have been deleted. And the container returns to the base form as described by the image"

#### الشرح المبسّط:
`Docker Images` غير قابلة للتغيير (`immutable`) بعد إنشائها. لذلك إن شغّلت صورة قاعدة بيانات كحاوية، وأضفت جداول وبيانات، ثم حذفت الحاوية وأعدت إنشاءها من نفس الصورة، ستعود لنقطة الصفر — كل التعديلات ستُفقد لأنها لم تُحفظ في الصورة نفسها بل في طبقة الحاوية المؤقتة.

**لماذا؟** الثبات (`immutability`) هو ما يضمن أن الصورة تعطي نفس النتيجة في كل مرة تُشغَّل — وهذا هو جوهر حل مشكلة "عندي شغّال" التي بدأنا بها المحاضرة.

#### 6.1. بنية الطبقات (Layers)

#### النص الأصلي يقول:
> "Docker images are built using layers, every command in the Dockerfile like COPY or RUN can create a new layer... Layers are stacked on top of each other creating the final image... Each layer represents a change in the filesystem of the image"

#### الشرح المبسّط:
كل أمر في `Dockerfile` (خاصة `RUN` و`COPY`) يُنشئ طبقة (`layer`) جديدة. هذه الطبقات تُكدَّس فوق بعضها لتشكّل الصورة النهائية:
- من الأعلى (`top view`): نرى بيئة كاملة موحّدة.
- من الجانب (`side view`): نرى طبقات منفصلة تملأ الفجوات بين بعضها.

كل طبقة تمثّل "تغييراً" على نظام الملفات مقارنة بالطبقة التي تحتها.

#### ⚙️ الخطوات / الخوارزمية: كيف تُبنى صورة من الطبقات

> الهدف: فهم كيف يحوّل Docker أوامر Dockerfile إلى صورة نهائية واحدة.

```algorithm
1 | قراءة Dockerfile | Docker Build | كل سطر RUN/COPY/ADD يُحوَّل لطبقة منفصلة
2 | تكديس الطبقات | Union Filesystem | الطبقات تُرص فوق بعضها بالترتيب
3 | حساب البصمة | Hashing | كل طبقة تُحسب لها بصمة (hash) فريدة للتخزين وإعادة الاستخدام
4 | العرض النهائي | Docker Engine | من الأعلى: بيئة موحدة، من الجانب: طبقات منفصلة
```

#### 6.2. حل تعارض الطبقات — لماذا CoW؟

#### النص الأصلي يقول:
> "what if to layers change the same file/folder... layer 3 changes some files that are changed in layer 2, as a result we only see the latest version of the files... However layer 2 is not changed and it contains the original version of the files"

#### الشرح المبسّط:
إذا عدّلت طبقتان (مثلاً الطبقة 2 والطبقة 3) نفس الملف، فإن `Docker` يعرض دائماً **أحدث نسخة** (الطبقة الأعلى، هنا الطبقة 3)، لكنه **لا يحذف** النسخة القديمة من الطبقة 2 — تبقى محفوظة في مكانها.

**لماذا نحتفظ بالنسخة القديمة رغم أنها "مخفية"؟** هنا يأتي جوهر `Copy On Write`:
- كل طبقة تُخزَّن ولها بصمة (`hash`) خاصة بها.
- عند تنزيل صورة جديدة أو نسخة أحدث من نفس الصورة، وتطابقت بعض الطبقات الجديدة مع طبقات موجودة مسبقاً، **لا تُعاد عملية التنزيل** لتلك الطبقات المشتركة.
- هذا يعني توفيراً هائلاً في التخزين والوقت عبر إعادة استخدام الطبقات (`layer reuse`).

#### 💡 التشبيه:
> تخيّل مكتبة فيها عدة طبعات من نفس الكتاب، لا تُعاد طباعة الكتاب بأكمله لكل طبعة جديدة، بل تُطبع فقط الصفحات التي تغيّرت وتُرفق مع بقية الصفحات الأصلية غير المتغيّرة.
> **وجه الشبه:** الصفحات غير المتغيّرة = الطبقات المشتركة القديمة (لا تُعاد) | الصفحات الجديدة = الطبقة الجديدة التي تُضاف فقط.

#### 6.3. طبقة الحاوية وقت التشغيل (Runtime Layer)

#### النص الأصلي يقول:
> "every change even during runtime creates a new layer (editable at this time)... When we create a new container based on an image, we don't copy the image we reference it (think of it as git) and when we change we create a new layer containing the changes, this layer is container specific not image"

#### الشرح المبسّط:
عندما تُنشئ حاوية من صورة، `Docker` لا ينسخ الصورة بالكامل — بل يُشير إليها فقط (تماماً مثل `Git` عندما يُشير commit لأصل سابق دون نسخه بالكامل). أي تغيير تُجريه أثناء تشغيل الحاوية يُنشئ طبقة جديدة **خاصة بتلك الحاوية فقط** — وليست جزءاً من الصورة الأصلية أبداً.

**لماذا؟** هذا يفسّر بالضبط لماذا تُفقد بيانات قاعدة البيانات عند حذف الحاوية دون استخدام `Volume` — لأن تلك البيانات كانت في طبقة الحاوية المؤقتة، لا في الصورة.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا يُعتبر تشغيل قاعدة بيانات في حاوية بدون `Volume` خطأً في بيئة الإنتاج؟
> **لماذا هذا مهم؟** لأن أي إعادة إنشاء للحاوية (تحديث، إعادة نشر) ستفقد كل البيانات المخزَّنة إن لم تكن مربوطة بمجلد دائم على المضيف.

---

### 7. السلاح الأقوى — Docker Compose (Docker Ultimate Weapon)

#### النص الأصلي يقول:
> "Dockerfile describes an image, and we use the command docker build to build that image we use the command docker run to run the container, but what if the container had a lot environment variables, ports and volumes? what do we do now, the command line would look ridiculous! ... that's why we have docker compose"

#### الشرح المبسّط:
عندما تكبر إعدادات الحاوية (متغيرات بيئة كثيرة، منافذ متعددة، أحجام متعددة)، يصبح تنفيذ الأمر عبر `docker run` طويلاً ومربكاً جداً. الحل هو `Docker Compose`: ملف `YAML` يصف كل شيء بشكل منظّم بدلاً من سطر أوامر لا ينتهي.

**لماذا؟** لأن الوصف المنظّم (declarative) في ملف قابل للمراجعة والتحكم بالإصدارات (`version control`) أفضل بكثير من أمر طرفية طويل يصعب تذكره أو مشاركته مع الفريق.

### 7.1. مثال — خدمة Landing Page مع Traefik

#### النص الأصلي يقول:
> "services: landing: container_name: landing image: $CI_REGISTRY_IMAGE:latest restart: always networks: - web labels: - 'traefik.enable=true' ..."

#### الشرح المبسّط:
هذا مثال متكامل يوضّح كل عناصر `docker-compose.yml` الأساسية، مع إضافة `labels` خاصة بأداة توجيه الطلبات `Traefik` (يُشار إليها في المحاضرة كموضوع سيُشرح لاحقاً في CI/CD).

#### 💻 الكود: خدمة Landing Page كاملة عبر Docker Compose

```yaml
services:                                                          # Root key: defines all services
  landing:                                                          # Service name
    container_name: landing                                          # Name shown for management (docker ps)
    image: $CI_REGISTRY_IMAGE:latest                                   # Base image, taken from an env variable
    restart: always                                                      # Auto-restart policy if it stops
    networks:                                                             # Networks this service attaches to
      - web
    labels:                                                                 # Metadata used by Traefik router
      - 'traefik.enable=true'
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
      - 'traefik.http.routers.landing.priority=1000'
      - 'traefik.http.routers.landing.entrypoints=websecure'
      - 'traefik.http.routers.landing.tls.certresolver=letsencrypt'
      - 'traefik.http.services.landing.loadbalancer.server.port=80'
networks:                                                                    # Networks declaration
  web:
    external: true                                                             # Reuses a network created outside compose
```

#### شرح كل سطر:
1. `services:` → المفتاح الجذري الذي يبدأ به كل تعريف حاوية
2. `landing:` → اسم الخدمة/الحاوية (اسم يستخدمه Compose كمعرّف داخلي، ويُستخدم أيضاً كـ hostname داخل الشبكة)
3. `container_name: landing` → الاسم الذي يظهر عند إدارة الحاوية عبر الأوامر (`docker ps`, `docker logs landing`...)
4. `image: $CI_REGISTRY_IMAGE:latest` → الصورة الأساس، مأخوذة هنا من متغير بيئة بدل نص ثابت (مرن أكثر لأنظمة CI/CD)
5. `restart: always` → إعادة تشغيل الحاوية تلقائياً إن توقّفت لأي سبب
6. `networks:` `- web` → يربط الحاوية بشبكة اسمها `web` — الشبكة المشتركة ضرورية للاتصال بين الحاويات
7. `labels:` → كتلة بيانات وصفية (`metadata`) يقرأها `Traefik` (أداة توجيه حركة المرور) لتوليد قواعد التوجيه تلقائياً
8. `'traefik.enable=true'` → يفعّل اكتشاف هذه الحاوية من قبل Traefik
9. `'traefik.http.routers.landing.rule=Host(...)' ` → يحدد القاعدة: أي طلب لهذا الدومين يُوجَّه لهذه الخدمة
10. `'traefik.http.routers.landing.priority=1000'` → أولوية هذا المسار مقارنة بمسارات أخرى محتملة
11. `'traefik.http.routers.landing.entrypoints=websecure'` → يحدد أن الدخول يكون عبر منفذ HTTPS الآمن
12. `'traefik.http.routers.landing.tls.certresolver=letsencrypt'` → يحدد مزوّد شهادة SSL تلقائي (Let's Encrypt)
13. `'traefik.http.services.landing.loadbalancer.server.port=80'` → المنفذ الداخلي الفعلي الذي تستمع عليه الحاوية
14. `networks:` `web:` `external: true` → يعرّف الشبكة `web` كشبكة **خارجية** (تم إنشاؤها مسبقاً خارج هذا الملف، وليست من إنشاء Compose نفسه)

**الناتج المتوقع (لقطة الشاشة):**
> بمجرد `docker compose up -d`، تعمل الحاوية وتصبح متاحة تلقائياً عبر `https://${SITE_DOMAIN}` بفضل Traefik الذي يقرأ الـ labels ويولّد التوجيه والشهادة تلقائياً.

#### نقطة مهمة ⚠️:
> اسم الخدمة (`landing`) نفسه يُستخدم كـ `hostname` عند الاتصال بين الحاويات على نفس الشبكة — هذا سبب مهم لتسمية الخدمات بعناية.

---

### 7.2. أنواع شبكات Docker (Docker Networks)

#### النص الأصلي يقول:
> "In docker the networks have one of the following types: bridge... host... none... overlay... ipvlan... macvlan..."

#### الشرح المبسّط:

| Driver | الوصف |
| --- | --- |
| `bridge` | محرّك الشبكة الافتراضي |
| `host` | يزيل العزل الشبكي بين الحاوية والمضيف تماماً |
| `none` | يعزل الحاوية تماماً عن المضيف والحاويات الأخرى |
| `overlay` | شبكات `Swarm Overlay` تربط عدة أجهزة Docker معاً |
| `ipvlan` | يربط الحاويات بشبكات `VLAN` خارجية |
| `macvlan` | تظهر الحاويات كأجهزة مستقلة على شبكة المضيف |

**لماذا؟** اختيار محرّك الشبكة الصحيح يحدد مستوى العزل والأداء المطلوبين — `bridge` مناسب لمعظم الحالات اليومية بينما `host` أو `macvlan` تُستخدم في سيناريوهات أداء أو شبكات متقدمة.

#### النص الأصلي يقول:
> "How to create a network? I will leave that to you to figure out, and I will ask about it in the next lecture"

#### الشرح المبسّط:
المحاضر ترك إنشاء الشبكات كتمرين ذاتي للطالب، ووعد بمناقشتها في المحاضرة القادمة (المتعلقة بـ CI/CD). *(ملاحظة: غير مشروحة بالتفصيل في هذه المحاضرة)*

---

### 7.3. الأحجام (Volumes) — مثال قاعدة بيانات

#### النص الأصلي يقول:
> "services: db: image: pgvector/pgvector:pg18-trixie container_name: kc-db environment: POSTGRES_PASSWORD: ... ports: - 54321:5432 volumes: - /opt/kc-db:/var/lib/postgresql"

#### الشرح المبسّط:
مثال عملي يجمع بين `environment`، `ports`، و`volumes` معاً لتشغيل قاعدة بيانات `PostgreSQL` (بامتداد `pgvector`) بشكل دائم وآمن.

#### 💻 الكود: خدمة قاعدة بيانات مع Volume دائم

```yaml
services:                                          # Root services key
  db:                                                # Service name: db
    image: pgvector/pgvector:pg18-trixie              # Postgres image with pgvector extension
    container_name: kc-db                              # Container display name
    environment:                                          # Environment variables block
      POSTGRES_PASSWORD: H&*(hj0iosdfgwq                    # Database password (should be a secret in real use)
    ports:                                                    # Port mapping block
      - 54321:5432                                             # host:container port mapping
    volumes:                                                     # Persistent storage block
      - /opt/kc-db:/var/lib/postgresql                              # host_path:container_path mapping
```

#### شرح كل سطر:
1. `services:` → بداية تعريف الخدمات
2. `db:` → اسم الخدمة (وسيصبح hostname داخل الشبكة إذا رُبطت بشبكة)
3. `image: pgvector/pgvector:pg18-trixie` → صورة قاعدة بيانات PostgreSQL مع امتداد المتجهات `pgvector`
4. `container_name: kc-db` → الاسم الظاهر في أوامر الإدارة
5. `environment:` → بداية متغيرات البيئة
6. `POSTGRES_PASSWORD: ...` → كلمة مرور قاعدة البيانات المُمرَّرة للحاوية عند إنشائها
7. `ports:` `- 54321:5432` → يربط منفذ 54321 على المضيف بمنفذ PostgreSQL الافتراضي 5432 داخل الحاوية، بحيث يمكن الاتصال عبر `localhost:54321`
8. `volumes:` `- /opt/kc-db:/var/lib/postgresql` → يربط مجلد `/opt/kc-db` على المضيف بمجلد بيانات PostgreSQL داخل الحاوية، بحيث تبقى البيانات محفوظة حتى لو حُذفت الحاوية

**الناتج المتوقع (لقطة الشاشة):**
> قاعدة بيانات تعمل ويمكن الاتصال بها عبر `localhost:54321`، وبياناتها محفوظة فعلياً في `/opt/kc-db` على السيرفر بشكل دائم.

#### مهم للامتحان ⚠️:
> لكي يعمل `ports` بشكل صحيح، يجب أن تحتوي صورة الـ `Dockerfile` الأصلية على تعليمة `EXPOSE` للمنفذ المطلوب (هنا `EXPOSE 5432`)، وإلا لن يعمل الربط.

#### ⚖️ المقايضة: Volume عادي مقابل Volume للقراءة فقط (:ro)

| | Volume عادي (قراءة وكتابة) | Volume بلاحقة `:ro` (قراءة فقط) |
| --- | --- | --- |
| المزايا | الحاوية يمكنها تعديل الملفات وحفظها على المضيف | حماية بيانات المضيف من أي تعديل عرضي من الحاوية |
| العيوب | خطر تعديل أو حذف بيانات حساسة عن طريق الخطأ | الحاوية لا يمكنها كتابة أي تغييرات دائمة في ذلك المسار |
| متى تختاره | بيانات تحتاج الحاوية لتعديلها (قواعد بيانات، رفع ملفات) | ملفات إعداد أو مرجعية يجب أن تبقى ثابتة (config, certificates) |

---

### 8. هل هذا كل شيء؟ (Is This All?)

#### النص الأصلي يقول:
> "No, it is not. We still have a lot to do with docker. What is this label thing, and what the heck Traefik. Do we need to manage everything using CLI or is there some kind of UI. Can we build a stack using docker only? We will discuss all those point when doing CI/CD next week"

#### الشرح المبسّط:
المحاضر يختم بالتأكيد أن هذه فقط الأساسيات، وأن مواضيع مثل `Traefik` بالتفصيل، وجود واجهات إدارة رسومية (`UI`) بديلة عن سطر الأوامر، وبناء `stack` كامل بـ Docker وحده — كلها ستُناقش في محاضرة `CI/CD` القادمة. *(هذه نقاط غير مشروحة في هذه المحاضرة، مؤجلة للمحاضرة القادمة)*

### الأفكار الرئيسية الشاملة
> لا توجد أفكار إضافية لم تُغطَّ أعلاه — تم تغطية كل نقطة وردت في شرائح المحاضرة بالكامل ضمن الأقسام 1 إلى 8.

---
## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Docker` | نظام لتغليف التطبيقات وبيئتها لضمان عملها بنفس الطريقة في أي مكان | يحل مشكلة "عندي شغّال" |
| `Image` | قالب غير قابل للتغيير (`immutable`) يحتوي التطبيق وبيئته كاملة | `httpd:latest` |
| `Container` | نسخة تشغيل حيّة من صورة | نتيجة تنفيذ `docker run` |
| `Dockerfile` | ملف نصي يصف كيفية بناء صورة | يحتوي `FROM`, `COPY`, `RUN`, `CMD` |
| `Docker Compose` | أداة لوصف حاوية أو أكثر عبر ملف `YAML` بدل أوامر طويلة | `docker-compose.yml` |
| `Registry` | خدمة تخزين وتوزيع الصور | `Docker Hub` |
| `Volume` | ربط مجلد المضيف بمجلد داخل الحاوية لحفظ البيانات بشكل دائم | `/opt/kc-db:/var/lib/postgresql` |
| `Network` | شبكة افتراضية تربط الحاويات ببعضها وبالخارج | نوع `bridge` هو الافتراضي |
| `Layer` | تغيير في نظام ملفات الصورة، ينتج عن كل أمر `RUN`/`COPY` في `Dockerfile` | تُخزَّن وتُعاد استخدامها عبر الصور |
| `Copy On Write (CoW)` | آلية تخزين تعرض أحدث نسخة من ملف مع الاحتفاظ بالنسخ القديمة في طبقات أخرى | توفّر تخزيناً وتسمح بإعادة استخدام الطبقات |
| `Multi-stage Build` | بناء صورة عبر عدة مراحل، ونسخ فقط الناتج النهائي للصورة الأخيرة | يقلل حجم الصورة النهائية |
| `LXC` | Linux Containers، محاولة أولى معقدة لعزل التطبيقات على Linux عام 2008 | أساس ما بُني عليه Docker لاحقاً |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Docker Build` | بناء صورة من `Dockerfile` | يُستخدم عبر `docker build` |
| `Docker Compose` | وصف وتشغيل حاوية أو أكثر عبر YAML | مع Build يشكّلان `Docker Engine` |
| `Docker Networks` | ربط الحاويات ببعضها والمضيف والخارج | أنواع: bridge, host, none, overlay, ipvlan, macvlan |
| `Docker Volumes` | حفظ البيانات ونقل الملفات بأمان | تبقى البيانات حتى بعد حذف الحاوية |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| العزل | `Container` | `Virtual Machine` | الحاوية تشارك نواة النظام وأخف؛ الـ VM تحاكي عتاداً كاملاً وأثقل |
| بناء الأوامر | `docker image` commands | `docker container` commands | معظم أوامر الصور تحتاج البادئة (باستثناء build, import, load, pull, push, rmi, save, tag)؛ معظم أوامر الحاويات مباشرة (باستثناء ls, pause, port, prune) |
| التشغيل | `docker run` | `docker compose up` | الأول لحاوية واحدة بسيطة عبر سطر أوامر؛ الثاني لعدة حاويات/إعدادات عبر ملف YAML |
| الصورة مقابل الحاوية | `Image` | `Container` | الصورة قالب ثابت غير قابل للتعديل؛ الحاوية نسخة تشغيل قابلة للتغيير مؤقتاً |

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| بناء الصور | `FROM`, `RUN`, `COPY`, `WORKDIR`, `ENV`, `CMD`, `EXPOSE` |
| إدارة الصور | `docker pull`, `docker push`, `docker build`, `docker rmi`, `docker tag`, `docker save`, `docker load` |
| إدارة الحاويات | `docker run`, `docker ps`, `docker stop`, `docker start`, `docker exec`, `docker logs`, `docker rm` |
| Compose | `services`, `image`, `container_name`, `restart`, `networks`, `volumes`, `labels`, `ports`, `environment` |
| الشبكات | `bridge`, `host`, `none`, `overlay`, `ipvlan`, `macvlan` |

### أبرز النقاط الذهبية
1. `Docker` يحل مشكلة اختلاف بيئات التطوير والإنتاج عبر تغليف البيئة كاملة وليس الكود فقط.
2. الحاويات أخف من الأجهزة الافتراضية لأنها تشارك نواة النظام بدل محاكاة عتاد كامل.
3. الصور غير قابلة للتعديل (`immutable`)؛ كل تعديل ينتج طبقة جديدة.
4. `Copy On Write` يوفّر التخزين عبر إعادة استخدام الطبقات المشتركة بين الصور.
5. بيانات الحاوية تُفقد عند حذفها ما لم تُستخدم `Volumes`.
6. `Multi-stage Build` أفضل ممارسة لتصغير حجم الصور النهائية.
7. `Docker Compose` ضروري عند تعقّد إعدادات الحاوية (منافذ، متغيرات، أحجام متعددة).
8. حادثة أكتوبر 2025 تُذكّرنا أن الاعتماد على مزوّد سحابي واحد يحمل مخاطرة حقيقية.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| استخدام `docker rm` لحذف صورة | يجب استخدام `docker rmi` لحذف الصور، و`docker rm` للحاويات فقط |
| نسيان `Volume` عند تشغيل قاعدة بيانات | دائماً استخدم `volumes` مع أي خدمة تحتاج حفظ بيانات دائمة |
| نسيان `EXPOSE` في `Dockerfile` مع الاعتماد على `ports` في Compose | يجب أن تحتوي الصورة الأساس على `EXPOSE` للمنفذ المطلوب |
| الاعتقاد أن تعديل الحاوية يُعدّل الصورة | التعديلات وقت التشغيل تبقى في طبقة الحاوية فقط، لا تنتقل للصورة الأصلية أبداً |
| نسيان `systemctl enable` بعد تثبيت Docker على Linux | يجب تفعيلها يدوياً وإلا لن تعمل الخدمة تلقائياً بعد إعادة التشغيل |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: تثبيت وتفعيل Docker على Linux

> الهدف: تجهيز جهاز Linux لاستخدام Docker بدون sudo وبتشغيل تلقائي.

```algorithm
1 | تثبيت الحزمة | apt/dnf/pacman | تثبيت docker-ce حسب التوزيعة
2 | إضافة المستخدم لمجموعة docker | usermod -aG docker $USER | يسمح بتشغيل الأوامر بدون sudo
3 | تفعيل الخدمة تلقائياً | systemctl enable -f docker | تشغيل Docker تلقائياً بعد كل إعادة تشغيل
4 | تشغيل الخدمة الآن | systemctl start docker | بدء الخدمة فوراً دون انتظار إعادة التشغيل
```

#### نقاط التنفيذ:
- خطوة إضافة المستخدم للمجموعة تتطلب تسجيل خروج ودخول جديد لتفعيلها.

#### ⚙️ الخطوات / الخوارزمية: سحب وتشغيل حاوية اختبارية

> الهدف: التحقق من أن Docker يعمل بشكل صحيح.

```algorithm
1 | سحب الصورة | docker pull containous/whoami | تنزيل النسخة latest افتراضياً
2 | تشغيل الحاوية | docker run --rm -p 80:80 containous/whoami:latest | إنشاء وتشغيل الحاوية مع ربط منفذ 80
3 | التحقق | متصفح على http://127.0.0.1 | ظهور بيانات الطلب تؤكد نجاح التشغيل
```

#### نقاط التنفيذ:
- `--rm` تحذف الحاوية تلقائياً بعد إيقافها؛ أزلها إن أردت الاحتفاظ بالحاوية.

#### ⚙️ الخطوات / الخوارزمية: بناء ونشر صورة عبر Dockerfile

> الهدف: تحويل تطبيق (مثل موقع HTML بسيط) إلى صورة Docker قابلة للتشغيل.

```algorithm
1 | كتابة Dockerfile | نص عادي | تحديد FROM ثم أوامر التجهيز (COPY, RUN)
2 | بناء الصورة | docker build | ينفّذ كل سطر في Dockerfile وينتج طبقة لكل أمر
3 | تشغيل الصورة كحاوية | docker run | تحويل الصورة إلى حاوية عاملة فعلياً
4 | (اختياري) رفع الصورة | docker push | رفعها لمستودع مثل Docker Hub لمشاركتها
```

#### نقاط التنفيذ:
- ترتيب الأوامر داخل Dockerfile يؤثر مباشرة على كفاءة إعادة استخدام الطبقات المخزّنة مسبقاً.

#### ⚙️ الخطوات / الخوارزمية: تشغيل مجموعة حاويات عبر Docker Compose

> الهدف: تشغيل خدمة أو أكثر بإعدادات معقّدة (منافذ، شبكات، أحجام) دون أوامر طويلة.

```algorithm
1 | كتابة الملف | docker-compose.yml | تعريف كل خدمة تحت المفتاح services
2 | تحديد الشبكات والأحجام | networks / volumes | ربط الخدمات ببعضها وبالتخزين الدائم
3 | التشغيل | docker compose up -d | إنشاء وتشغيل كل الخدمات المعرَّفة دفعة واحدة
4 | الإدارة اللاحقة | docker compose down/logs/restart | إيقاف أو مراقبة أو إعادة تشغيل المجموعة كاملة
```

#### نقاط التنفيذ:
- الشبكة `external: true` تعني أنها أُنشئت مسبقاً خارج ملف الـ Compose، ويجب التأكد من وجودها قبل التشغيل.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| صورة بسيطة | `FROM base_image` + `COPY files dest/` | تطبيقات بسيطة لا تحتاج بناء (build step) |
| صورة Multi-stage | `FROM ... AS name` مكرر + `COPY --from=name` في المرحلة الأخيرة | تطبيقات تحتاج بناء (React, Node) وتريد صورة نهائية صغيرة |
| خدمة Compose كاملة | `services: > name: > image/ports/volumes/networks/labels` | أي حاوية بإعدادات متعددة (منافذ، بيئة، تخزين دائم) |
| ربط منفذ | `host_port:container_port` | كل مرة تريد الوصول لخدمة داخل حاوية من خارجها |
| ربط تخزين دائم | `host_path:container_path` | أي بيانات يجب أن تبقى بعد حذف الحاوية (قواعد بيانات، ملفات مرفوعة) |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| صورتان جديدتان تشتركان في طبقات | Docker لا يعيد تنزيل الطبقات المشتركة | بفضل آلية `Copy On Write` وحساب البصمة (`hash`) لكل طبقة |
| حذف حاوية قاعدة بيانات بلا Volume | فقدان كامل البيانات فوراً | البيانات كانت في طبقة الحاوية المؤقتة وليست في الصورة |
| تشغيل نفس الصورة عدة مرات | إنشاء عدة حاويات مستقلة عن بعضها | كل حاوية لها طبقة تعديلات (`writable layer`) خاصة بها فقط |
| تشغيل Docker على Windows | يحتاج طبقة وسيطة (Hyper-V أو WSL) | Docker يعتمد على ميزات نواة Linux مباشرة |

---
## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 25% (4 أسئلة) / سيناريو كود 35% (6 أسئلة) / تطبيق 30% (5 أسئلة) / تتبع خوارزمية 10% (1 سؤال).

### السؤال 1 (متوسط)
ما الفرق الجوهري بين `Container` و`Virtual Machine`؟
أ) الحاوية تحاكي عتاداً كاملاً بينما VM تشارك النواة
ب) الحاوية تشارك نواة نظام التشغيل المضيف بينما VM تحاكي عتاداً كاملاً ونظام تشغيل مستقل
ج) لا يوجد فرق فعلي، هما نفس التقنية بأسماء مختلفة
د) VM أخف وأسرع إقلاعاً من الحاوية دائماً
**الإجابة الصحيحة: ب**
**التعليل:** كما ذكر النص، الـ `VM` تحاكي عتاداً كاملاً وتشغّل نظام تشغيل مستقلاً، بينما الحاوية "صندوق رملي" يشارك نواة المضيف. (أ) عكس الصحيح. (ج) خاطئ لأن الفروق جوهرية في الأداء والعزل. (د) عكس الحقيقة تماماً؛ الحاوية هي الأخف والأسرع.

### السؤال 2 (سهل)
أي أداة من أدوات Docker وُلدت من دمج `build` و`compose` معاً؟
أ) `Docker Hub`
ب) `Docker Engine`
ج) `Docker Registry`
د) `Docker Swarm`
**الإجابة الصحيحة: ب**
**التعليل:** النص ينص صراحة أن "Together compose and build creates the Docker Engine". (أ) هو مستودع الصور فقط. (ج) مصطلح عام لخدمة تخزين الصور. (د) لم يُذكر في المحاضرة إطلاقاً.

### السؤال 3 (صعب)
في مثال بناء صورة React متعددة المراحل، لماذا نُنسخ `package.json` و`pnpm-lock.yaml*` قبل نسخ باقي الكود (`COPY . .`)؟
أ) لأن Docker يرفض نسخ ملفين منفصلين في أمرين مختلفين
ب) لتحسين إعادة استخدام الطبقات المخزّنة مسبقاً (caching) — إذا لم تتغيّر الاعتماديات، لا تُعاد خطوة التثبيت
ج) لأن ترتيب الأسطر في Dockerfile لا يؤثر إطلاقاً على الأداء
د) لأن `pnpm install` يفشل إن نُفّذ بعد نسخ كل الملفات
**الإجابة الصحيحة: ب**
**التعليل:** فصل نسخ ملفات الاعتماديات عن باقي الكود يستفيد من آلية الطبقات (Copy On Write) — إن لم يتغيّر `package.json`، تبقى طبقة `pnpm install` كما هي ولا تُعاد. (أ) و(د) غير صحيحين تقنياً. (ج) عكس الحقيقة تماماً؛ الترتيب مهم جداً.

### السؤال 4 (متوسط)
ما الأمر المستخدم مباشرة لحذف صورة (وليس حاوية)؟
أ) `docker rm`
ب) `docker delete`
ج) `docker rmi`
د) `docker image delete`
**الإجابة الصحيحة: ج**
**التعليل:** حسب جدول أوامر إدارة الصور، `rm` للصور يُستخدم مباشرة عبر الاسم البديل `docker rmi`. (أ) هذا لحذف الحاويات. (ب) و(د) أوامر غير موجودة في Docker.

### السؤال 5 (صعب)
لديك حاوية `PostgreSQL` تعمل بدون `volumes` مُعرَّفة في Compose. ماذا يحدث بالضبط لبياناتها عند تنفيذ `docker compose down` ثم `docker compose up` مجدداً؟
أ) البيانات تبقى محفوظة تلقائياً لأن الصورة تحفظ كل تغيير
ب) تُفقد كل البيانات لأنها كانت في الطبقة القابلة للكتابة الخاصة بالحاوية المحذوفة فقط
ج) تُنسخ البيانات تلقائياً لحاوية جديدة عبر Copy On Write
د) يرفض Docker حذف الحاوية طالما تحتوي بيانات
**الإجابة الصحيحة: ب**
**التعليل:** كما شرح النص، كل تغيير أثناء التشغيل يُخزَّن في طبقة خاصة بالحاوية فقط وليس بالصورة، فحذف الحاوية يعني فقدان تلك الطبقة بالكامل. (أ) و(ج) خاطئان لأن Copy On Write يخص طبقات الصورة لا بيانات التشغيل المؤقتة بدون Volume. (د) Docker لا يمنع الحذف أبداً.

### السؤال 6 (متوسط)
أي محرّك شبكة (`Network Driver`) يزيل العزل الشبكي بين الحاوية والمضيف تماماً؟
أ) `bridge`
ب) `none`
ج) `host`
د) `overlay`
**الإجابة الصحيحة: ج**
**التعليل:** الجدول يوضّح أن `host` "يزيل العزل الشبكي بين الحاوية والمضيف". (أ) هو الافتراضي وليس بلا عزل. (ب) يعزل الحاوية تماماً، عكس المطلوب. (د) يربط عدة أجهزة Docker (Swarm) وليس له علاقة بإزالة العزل مع المضيف.

### السؤال 7 (سهل)
في `docker run --rm -p 80:80 containous/whoami:latest`، ماذا يعني الرقم الأول في `80:80`؟
أ) منفذ الحاوية
ب) منفذ المضيف (host)
ج) رقم إصدار الصورة
د) رقم الحاوية التسلسلي
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضّح صراحة أن الرقم قبل النقطتين هو منفذ المضيف والرقم بعدها منفذ الحاوية. (أ) هو الرقم الثاني وليس الأول. (ج) و(د) لا علاقة لهما بصياغة `-p`.

### السؤال 8 (صعب)
في ملف Compose التالي، ما الذي يعنيه `external: true` تحت تعريف الشبكة `web`؟
```yaml
networks:
  web:
    external: true
```
أ) أن Compose سينشئ شبكة جديدة تلقائياً باسم `web`
ب) أن الشبكة `web` يجب أن تكون موجودة مسبقاً خارج هذا الملف، وCompose سيستخدمها فقط دون إنشائها
ج) أن هذه الشبكة متاحة للاتصال بالإنترنت الخارجي فقط
د) أن هذه الشبكة من نوع `overlay` إجبارياً
**الإجابة الصحيحة: ب**
**التعليل:** `external: true` يخبر Compose أن الشبكة موجودة مسبقاً (أُنشئت يدوياً أو بملف آخر) ويجب فقط الانضمام إليها لا إنشاؤها من الصفر. (أ) عكس المعنى الصحيح. (ج) و(د) تفسيرات غير مرتبطة بهذا المفتاح إطلاقاً.

### السؤال 9 (متوسط)
ما هو الغرض الأساسي من تعليمة `EXPOSE` في `Dockerfile` عند استخدام `ports` في Compose؟
أ) هي غير ضرورية أبداً ولا تؤثر على شيء
ب) يجب أن تُذكر داخل الصورة الأساس ليتمكن ربط المنفذ عبر `ports` من العمل بشكل صحيح
ج) تُستخدم فقط لتوثيق الكود دون أي تأثير فعلي على الشبكة
د) تُستبدل تلقائياً بمفتاح `networks` في Compose
**الإجابة الصحيحة: ب**
**التعليل:** النص ينص صراحة: "in order to use the port 5432 in the container the image Dockerfile must contain `EXPOSE 5432` otherwise it will not work". (أ) و(ج) يتجاهلان هذا الشرط الصريح. (د) لا علاقة بين `EXPOSE` و`networks`.

### السؤال 10 (متوسط)
أي من الخيارات التالية يمثّل بالضبط ترتيب تاريخ تطور تقنيات العزل حسب المحاضرة؟
أ) LXC (2008) → Jails (2000) → Zones (2004) → chroot (1979)
ب) chroot (1979) → Jails (2000) → Zones (2004) → LXC (2008)
ج) Zones (2004) → chroot (1979) → LXC (2008) → Jails (2000)
د) LXC (2008) → chroot (1979) → Zones (2004) → Jails (2000)
**الإجابة الصحيحة: ب**
**التعليل:** الترتيب الزمني الصحيح المذكور في المحاضرة هو chroot عام 1979 ثم Jails عام 2000 ثم Zones عام 2004 ثم LXC عام 2008. باقي الخيارات كلها بترتيب زمني خاطئ.

### السؤال 11 (صعب)
لماذا اختار المحاضر صورة `node:24-trixie-slim` المبنية على Debian بدل صورة مبنية على Alpine؟
أ) لأن Alpine غير متوافقة إطلاقاً مع Node.js
ب) لأن Debian أثبتت استقراراً أكبر وتجنّب مشاكل توافقية واجهها المحاضر مع Alpine سابقاً
ج) لأن صور Debian دائماً أصغر حجماً من Alpine
د) لأن Alpine لا تدعم أي مدير حزم
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة: "there is also alpine, but it caused me some problems, Debian is more stable". (أ) و(د) مبالغات غير صحيحة تقنياً. (ج) عكس الحقيقة المعروفة عموماً؛ Alpine عادة أصغر حجماً.

### السؤال 12 (متوسط)
ما الوظيفة الأساسية لـ `Docker Volumes` كما ورد في المحاضرة؟
أ) بناء الصور من Dockerfile
ب) ربط مجلد على المضيف بمجلد داخل الحاوية لحفظ البيانات بشكل دائم ونقل الملفات بأمان
ج) إدارة الشبكات الافتراضية بين الحاويات فقط
د) توليد شهادات SSL تلقائياً
**الإجابة الصحيحة: ب**
**التعليل:** هذا التعريف الحرفي الوارد في قسم "The Components of Docker". (أ) وظيفة `Docker Build`. (ج) وظيفة `Docker Networks`. (د) وظيفة أدوات خارجية مثل Traefik وLet's Encrypt، غير مرتبطة بـ Volumes.

### السؤال 13 (سهل)
أي أمر يُستخدم لعرض قائمة الحاويات (وليس الصور)؟
أ) `docker image ls`
ب) `docker ps`
ج) `docker container list`
د) `docker inspect`
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضّح أن `ls` الخاص بالحاويات "to use directly we type docker ps". (أ) هذا لعرض قائمة الصور. (ج) صيغة غير موجودة في المحاضرة (الصيغة الصحيحة `docker container ls` أو `docker ps`). (د) لعرض تفاصيل عنصر واحد لا قائمة.

### السؤال 14 (صعب)
سيناريو: طبقة 2 في صورة عدّلت ملف `config.txt`، ثم طبقة 3 عدّلت نفس الملف مجدداً. ما الذي يراه المستخدم فعلياً عند فتح الصورة، وماذا يحدث للنسخة القديمة؟
أ) يرى نسخة الطبقة 2 فقط، وتُحذف نسخة الطبقة 3 تلقائياً
ب) يرى نسخة الطبقة 3 (الأحدث)، بينما تبقى نسخة الطبقة 2 محفوظة داخلياً دون حذف
ج) تُدمج النسختان تلقائياً في ملف واحد جديد
د) يحدث خطأ في بناء الصورة بسبب تعارض الطبقات
**الإجابة الصحيحة: ب**
**التعليل:** كما شرح النص، تظهر دائماً نسخة الطبقة الأعلى (الأحدث)، لكن النسخة القديمة تبقى محفوظة في طبقتها الأصلية ولا تُحذف، وهذا جوهر Copy On Write. باقي الخيارات (أ، ج، د) تصف سلوكاً غير موجود في Docker.

### السؤال 15 (متوسط)
ما الفرق العملي بين `docker pull` و`docker run`؟
أ) `pull` ينزّل الصورة فقط دون تشغيلها، بينما `run` ينشئ ويشغّل حاوية (وقد يسحب الصورة تلقائياً إن لم تكن موجودة)
ب) لا فرق، الأمران متطابقان تماماً
ج) `run` يُستخدم فقط للصور المحلية ولا يمكنه سحب صور جديدة أبداً
د) `pull` يُنشئ حاوية فوراً بينما `run` يكتفي بالتنزيل
**الإجابة الصحيحة: أ**
**التعليل:** هذا هو التعريف الحرفي في النص لكل من الأمرين. (ب) خاطئ لأن وظيفتيهما مختلفتان تماماً. (ج) عكس الصحيح؛ `run` يسحب الصورة تلقائياً عند الحاجة. (د) عكس تعريف الأمرين تماماً.

### السؤال 16 (صعب)
تتبّع سيناريو Multi-stage التالي: `FROM node AS base` → `FROM base AS deps` → `FROM deps AS build` → `FROM httpd AS final` مع `COPY --from=build`. ما الذي تحتويه الصورة النهائية (`final`) فعلياً؟
أ) كل أدوات Node وpnpm بالإضافة لمخرجات البناء
ب) فقط مخرجات البناء المنسوخة من مرحلة `build`، دون أي أثر لـ Node أو pnpm
ج) فقط الكود المصدري الخام بدون بناء
د) نسخة كاملة مطابقة لمرحلة `deps`
**الإجابة الصحيحة: ب**
**التعليل:** المرحلة النهائية تبدأ من `httpd` نظيفة تماماً، ونسخة `COPY --from=build` تنقل فقط الملفات المحدَّدة (ناتج البناء) دون أي شيء آخر من المراحل السابقة. (أ) و(د) يخلطان بين مراحل منفصلة تماماً عن بعضها. (ج) يتجاهل أن `build` قد نُفّذ فعلاً في مرحلة سابقة والناتج هو ما يُنسخ.

---
## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، فحص القيمة المرجعة، dead code.

### سؤال تصحيح 1 — منطقي (logic)

**الكود (يحتوي خطأ):**
```dockerfile
FROM node:24-trixie-slim AS build
COPY . .
RUN pnpm install
RUN pnpm run build

FROM httpd:latest
COPY /app/dist /usr/local/apache2/htdocs/
```
**اكتشف الخطأ:** أمر `COPY` الأخير ينسخ من مسار محلي على جهاز البناء (`/app/dist`) وليس من مرحلة `build` السابقة، لأنه ينقصه `--from=build`.

**التصحيح:**
```dockerfile
FROM node:24-trixie-slim AS build
COPY . .
RUN pnpm install
RUN pnpm run build

FROM httpd:latest
COPY --from=build /app/dist /usr/local/apache2/htdocs/
```
**شرح الحل:**
1. بدون `--from=build`، يبحث Docker عن `/app/dist` في سياق البناء المحلي وليس داخل المرحلة السابقة، فيفشل الأمر غالباً.
2. إضافة `--from=build` توجّه Docker لنسخ الملفات من نظام ملفات مرحلة `build` تحديداً.
3. هذا هو جوهر أسلوب Multi-stage الذي شرحته المحاضرة.

---

### سؤال تصحيح 2 — سوء فهم (misconception)

**الكود (يحتوي خطأ):**
```yaml
services:
  db:
    image: pgvector/pgvector:pg18-trixie
    container_name: kc-db
    ports:
      - 54321:5432
# لا يوجد قسم volumes — المطوّر يعتقد أن البيانات محفوظة تلقائياً داخل الصورة
```
**اكتشف الخطأ:** غياب قسم `volumes` بالكامل بناءً على سوء فهم أن الصورة نفسها تحفظ التغييرات دائماً.

**التصحيح:**
```yaml
services:
  db:
    image: pgvector/pgvector:pg18-trixie
    container_name: kc-db
    ports:
      - 54321:5432
    volumes:
      - /opt/kc-db:/var/lib/postgresql
```
**شرح الحل:**
1. الصور غير قابلة للتعديل (`immutable`)، وأي تغيير وقت التشغيل يبقى في طبقة الحاوية المؤقتة فقط.
2. حذف الحاوية دون `volumes` يعني فقدان كل بيانات قاعدة البيانات نهائياً.
3. إضافة `volumes` يربط مجلداً على المضيف يبقى موجوداً بعد حذف الحاوية.

---

### سؤال تصحيح 3 — فحص القيمة المرجعة (return_check)

**الكود (يحتوي خطأ):**
```bash
docker pull containous/whoami:v1.5.0
docker run --rm -p 80:80 containous/whoami:latest
```
**اكتشف الخطأ:** الكود يسحب (`pull`) نسخة محددة `v1.5.0`، لكن أمر التشغيل (`run`) يستخدم `:latest` بدل النسخة التي تم سحبها فعلاً، فقد يُنزّل `docker run` نسخة `latest` منفصلة بدل استخدام النسخة المطلوبة أصلاً.

**التصحيح:**
```bash
docker pull containous/whoami:v1.5.0
docker run --rm -p 80:80 containous/whoami:v1.5.0
```
**شرح الحل:**
1. يجب أن يتطابق الوسم (`tag`) بين أمر `pull` وأمر `run` لضمان استخدام نفس النسخة تحديداً.
2. عدم التطابق قد يؤدي لتشغيل نسخة مختلفة تماماً عن التي تم اختبارها أو سحبها عمداً.
3. هذا يوضّح أهمية الدقة في تحديد الوسوم في بيئات الإنتاج.

---

### سؤال تصحيح 4 — كود ميت (dead_code)

**الكود (يحتوي خطأ):**
```dockerfile
FROM node:24-trixie-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install http-server
COPY --from=build /app/dist /app
WORKDIR /app
RUN echo "This line does nothing useful and is never referenced later"
CMD node http-server
```
**اكتشف الخطأ:** السطر `RUN echo "This line does nothing useful..."` هو كود ميت — لا يُنتج أي تأثير فعلي على الصورة النهائية ولا تستخدمه أي خطوة لاحقة، فقط يُهدر طبقة إضافية بلا فائدة.

**التصحيح:**
```dockerfile
FROM node:24-trixie-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install http-server
COPY --from=build /app/dist /app
WORKDIR /app
CMD node http-server
```
**شرح الحل:**
1. كل أمر `RUN` يُنشئ طبقة جديدة، فحتى الأوامر عديمة الفائدة تُثقل حجم الصورة.
2. إزالة الأسطر التي لا تخدم الصورة النهائية يحسّن الأداء وحجم التخزين.
3. من أفضل الممارسات مراجعة كل سطر `Dockerfile` والتأكد من ضرورته الفعلية.

---

### سؤال تصحيح 5 — منطقي (logic)

**الكود (يحتوي خطأ):**
```yaml
services:
  landing:
    container_name: landing
    image: $CI_REGISTRY_IMAGE:latest
    restart: always
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
networks:
  web:
    external: true
```
**اكتشف الخطأ:** الخدمة `landing` لم تُربط بالشبكة `web` عبر مفتاح `networks` داخل تعريف الخدمة نفسها، رغم تعريف الشبكة `web` في أسفل الملف — أي أن Traefik لن يستطيع الوصول للحاوية عبر تلك الشبكة.

**التصحيح:**
```yaml
services:
  landing:
    container_name: landing
    image: $CI_REGISTRY_IMAGE:latest
    restart: always
    networks:
      - web
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
networks:
  web:
    external: true
```
**شرح الحل:**
1. تعريف شبكة في أسفل الملف لا يربطها تلقائياً بأي خدمة؛ يجب ذكرها صراحة تحت كل خدمة عبر مفتاح `networks`.
2. بدون هذا الربط، لن تتمكن أدوات مثل `Traefik` (التي تعمل غالباً على نفس الشبكة `web`) من التواصل مع الحاوية.
3. هذا خطأ شائع جداً عند نسخ إعدادات Compose جزئياً دون فهم كامل للبنية.

---
## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): إكمال Dockerfile ناقص — fill_gaps

**السيناريو / المطلوب:**
لديك التالي وتحتاج إكماله لبناء صورة موقع HTML بسيط:
```dockerfile
_______ httpd:latest
_______ index.html /usr/local/apache2/htdocs/
```

**المطلوب:**
1. أكمل الفراغين بالكلمات المفتاحية الصحيحة.

**نموذج الحل:**
```dockerfile
FROM httpd:latest
COPY index.html /usr/local/apache2/htdocs/
```

---

### تمرين 2 (تمرين إضافي): تصحيح أمر تشغيل حاوية — code_fix

**السيناريو / المطلوب:**
الأمر التالي يفشل في ربط منفذ الحاوية بالمضيف:
```bash
docker run --rm containous/whoami:latest -p 80:80
```

**المطلوب:**
1. حدد سبب الفشل.
2. أعد كتابة الأمر بشكل صحيح.

**نموذج الحل:**
السبب: خيار `-p 80:80` وُضع بعد اسم الصورة بدل أن يكون قبله ضمن خيارات الأمر.
```bash
docker run --rm -p 80:80 containous/whoami:latest
```

---

### تمرين 3 (تمرين إضافي): بناء Docker Compose من الصفر — scenario

**السيناريو / المطلوب:**
تريد تشغيل خدمة `redis` باسم حاوية `cache-redis`، تعيد التشغيل دائماً، وتربط منفذ 6380 على المضيف بمنفذ 6379 داخل الحاوية.

**المطلوب:**
1. اكتب ملف `docker-compose.yml` كاملاً لهذه المتطلبات.

**نموذج الحل:**
```yaml
services:
  cache:
    image: redis:latest
    container_name: cache-redis
    restart: always
    ports:
      - 6380:6379
```

---

### تمرين 4 (تمرين إضافي): إضافة Volume لخدمة موجودة — fill_gaps

**السيناريو / المطلوب:**
لديك خدمة قاعدة بيانات بدون تخزين دائم:
```yaml
services:
  db:
    image: pgvector/pgvector:pg18-trixie
    container_name: kc-db
```

**المطلوب:**
1. أضف قسم `volumes` يربط `/opt/kc-db` على المضيف بـ `/var/lib/postgresql` داخل الحاوية.

**نموذج الحل:**
```yaml
services:
  db:
    image: pgvector/pgvector:pg18-trixie
    container_name: kc-db
    volumes:
      - /opt/kc-db:/var/lib/postgresql
```

---

### تمرين 5 (تمرين إضافي): تحويل خدمة Apache إلى Node.js — code_fix

**السيناريو / المطلوب:**
لديك Dockerfile يخدم الموقع عبر Apache، وتحتاج تحويله ليستخدم `http-server` عبر Node بدل ذلك.
```dockerfile
FROM httpd:latest
COPY --from=build /app/dist /usr/local/apache2/htdocs/
```

**المطلوب:**
1. أعد كتابة الـ Dockerfile ليستخدم `node:24-trixie-slim` و`http-server` بدل Apache.

**نموذج الحل:**
```dockerfile
FROM node:24-trixie-slim
RUN corepack enable
RUN pnpm install http-server
COPY --from=build /app/dist /app
WORKDIR /app
CMD node http-server
```

---
## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: اختيار محرك الشبكة المناسب

**السيناريو:**
شركة ناشئة تريد تشغيل حاوية تحتاج أقصى أداء شبكة ممكن دون أي عزل عن شبكة المضيف، لأنها ستُستخدم فقط داخلياً على سيرفر مخصص واحد.

**المطلوب:**
1. أي محرك شبكة (`network driver`) هو الأنسب؟
2. ما المخاطرة المصاحبة لهذا الاختيار؟

**نموذج الحل:**
1. `host` — لأنه يزيل العزل الشبكي تماماً بين الحاوية والمضيف، مما يعطي أفضل أداء ممكن.
2. المخاطرة: فقدان العزل الأمني بين الحاوية والمضيف؛ أي ثغرة في الحاوية قد تؤثر مباشرة على شبكة المضيف.

---

### تمرين 2: تحليل حادثة أكتوبر 2025 من منظور إدارة المخاطر

**السيناريو:**
شركتك تستضيف كامل بنيتها التحتية (بما فيها مستودع صور Docker الخاص) على مزوّد سحابي واحد ومنطقة جغرافية واحدة (Single Region).

**المطلوب:**
1. بناءً على حادثة 20 أكتوبر 2025، ما نوع المخاطرة التي تواجهها الشركة؟
2. اقترح إجراءً وقائياً واحداً على الأقل.

**نموذج الحل:**
1. مخاطرة "نقطة الفشل الواحدة" (`Single Point of Failure`) — أي عطل في تلك المنطقة أو ذلك المزوّد يعطّل كامل الخدمة، كما حدث مع نصف الإنترنت بسبب خطأ DNS في `US-East-1`.
2. إجراء وقائي: استخدام مستودع صور احتياطي (mirror registry) أو توزيع البنية التحتية على أكثر من منطقة/مزوّد (Multi-region / Multi-cloud).

---

### تمرين 3: جدول قرار — متى تستخدم Volume للقراءة فقط

**السيناريو:**
لديك ثلاث حالات: (1) مجلد شهادات SSL يجب ألا تعدّله الحاوية، (2) مجلد رفع صور المستخدمين، (3) مجلد بيانات قاعدة بيانات.

**المطلوب:**
1. أكمل الجدول التالي محدداً هل يجب أن يكون Volume للقراءة فقط (`:ro`) أم للقراءة والكتابة.

| الحالة | نوع Volume | السبب |
| --- | --- | --- |
| شهادات SSL | ؟ | ؟ |
| رفع صور المستخدمين | ؟ | ؟ |
| بيانات قاعدة البيانات | ؟ | ؟ |

**نموذج الحل:**

| الحالة | نوع Volume | السبب |
| --- | --- | --- |
| شهادات SSL | قراءة فقط `:ro` | الحاوية تحتاج قراءتها فقط، لا تعديلها أبداً |
| رفع صور المستخدمين | قراءة وكتابة | الحاوية (التطبيق) تحتاج كتابة الملفات المرفوعة فعلياً |
| بيانات قاعدة البيانات | قراءة وكتابة | قاعدة البيانات تحتاج تعديل ملفاتها باستمرار أثناء العمل |

---
## الجزء الرابع: تمارين تتبع التنفيذ

> هذه تمارين إضافية من إعداد الدليل لاختبار الفهم العميق بتتبع التنفيذ خطوة بخطوة.

### تمرين تتبع 1: تتبّع بناء صورة Multi-stage

**المدخل:**
```dockerfile
FROM node:24-trixie-slim AS base
RUN corepack enable
FROM base AS deps
COPY package.json ./
RUN pnpm install
FROM deps AS build
COPY . .
RUN pnpm run build
FROM httpd:latest
COPY --from=build /app/dist /usr/local/apache2/htdocs/
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | المرحلة الناتجة |
| --- | --- | --- |
| 1 | تفعيل corepack | ؟ |
| 2 | تثبيت الحزم | ؟ |
| 3 | بناء المشروع | ؟ |
| 4 | نسخ الناتج النهائي فقط | ؟ |

**نموذج الحل:**
| الخطوة | العملية | المرحلة الناتجة |
| --- | --- | --- |
| 1 | تفعيل corepack | `base` |
| 2 | تثبيت الحزم | `deps` |
| 3 | بناء المشروع | `build` |
| 4 | نسخ الناتج النهائي فقط | الصورة النهائية المبنية على `httpd:latest` |

**النتيجة:** صورة نهائية تحتوي فقط `httpd` + ملفات `dist/` المبنية، دون أي أثر لـ Node أو pnpm.

#### 🤔 سؤال MCQ على نفس التتبع:
ماذا يحدث في المرحلة رقم 3 بالضبط؟
أ) تثبيت أدوات النظام الأساسية فقط
ب) تنفيذ `pnpm run build` لإنتاج ملفات الموقع النهائية
ج) نسخ الملفات للصورة النهائية httpd
د) تفعيل corepack فقط
**الإجابة: ب**

---

### تمرين تتبع 2: تتبّع تكديس الطبقات وتعارض الملفات

**المدخل:**
- الطبقة 1: تُنشئ ملف `app.conf`
- الطبقة 2: تُعدّل `app.conf`
- الطبقة 3: تُعدّل `app.conf` مجدداً + تُنشئ ملف جديد `readme.txt`

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | الملف | النسخة الظاهرة للمستخدم النهائي |
| --- | --- | --- |
| 1 | app.conf | ؟ |
| 2 | app.conf | ؟ |
| 3 | app.conf و readme.txt | ؟ |

**نموذج الحل:**
| الخطوة | الملف | النسخة الظاهرة للمستخدم النهائي |
| --- | --- | --- |
| 1 | app.conf | نسخة الطبقة 1 (قبل أي تعديل لاحق) |
| 2 | app.conf | نسخة الطبقة 2 (تُخفي نسخة الطبقة 1 دون حذفها) |
| 3 | app.conf و readme.txt | نسخة الطبقة 3 لكلا الملفين (الأحدث دائماً هي الظاهرة) |

**النتيجة:** المستخدم النهائي يرى فقط أحدث نسخة من `app.conf` (من الطبقة 3) بالإضافة إلى `readme.txt`، بينما نسختا الطبقة 1 والطبقة 2 من `app.conf` تبقيان محفوظتين داخلياً دون حذف (Copy On Write).

#### 🤔 سؤال MCQ على نفس التتبع:
ماذا يحدث لنسخة `app.conf` في الطبقة 1 بعد تعديلها في الطبقتين 2 و3؟
أ) تُحذف نهائياً لتوفير المساحة
ب) تبقى محفوظة في طبقتها الأصلية لكنها غير ظاهرة للمستخدم
ج) تُدمج تلقائياً مع النسخة الأخيرة
د) تتسبب في خطأ عند بناء الصورة
**الإجابة: ب**

---

### تمرين تتبع 3: تتبّع أوامر إدارة الصلاحيات والخدمة على Linux

**المدخل:**
```bash
sudo usermod -aG docker $USER
sudo systemctl enable -f docker
sudo systemctl start docker
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | الأمر | الحالة الناتجة |
| --- | --- | --- |
| 1 | usermod | ؟ |
| 2 | enable -f | ؟ |
| 3 | start | ؟ |

**نموذج الحل:**
| الخطوة | الأمر | الحالة الناتجة |
| --- | --- | --- |
| 1 | usermod | المستخدم أُضيف لمجموعة docker (يحتاج تسجيل دخول جديد للتفعيل الكامل) |
| 2 | enable -f | خدمة Docker ستبدأ تلقائياً بعد كل إعادة تشغيل مستقبلية للجهاز |
| 3 | start | خدمة Docker تعمل الآن فوراً دون انتظار إعادة تشغيل الجهاز |

**النتيجة:** بعد تسجيل خروج ودخول جديد، يمكن للمستخدم تنفيذ أوامر `docker` دون `sudo`، وستبقى الخدمة تعمل تلقائياً في كل مرة يُعاد فيها تشغيل الجهاز.

#### 🤔 سؤال MCQ على نفس التتبع:
لماذا نحتاج خطوة `enable -f` رغم أننا نفّذنا `start` بالفعل؟
أ) لأن `start` وحدها كافية على السيرفرات دائماً
ب) لأن `start` تُشغّل الخدمة الآن فقط، بينما `enable` تضمن تشغيلها تلقائياً في المستقبل بعد أي إعادة تشغيل
ج) لأن `enable` تُلغي أثر `start`
د) لا فرق بين الأمرين إطلاقاً
**الإجابة: ب**

---
## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما تعريف `Docker` باختصار؟
A: نظام لتغليف التطبيق وبيئته الكاملة لضمان عمله بنفس الطريقة في أي مكان.

**Q2:** ما الفرق بين `docker pull` و`docker run`؟
A: `pull` يُنزّل الصورة فقط، بينما `run` ينشئ ويشغّل حاوية (ويسحب الصورة تلقائياً عند الحاجة).

**Q3:** متى ظهرت `LXC` ولماذا لم تنجح بمفردها؟
A: عام 2008، ولم تنجح لأنها كانت معقدة وبلا معيار موحّد للاستخدام.

**Q4:** من أطلق `Docker` كمشروع مفتوح المصدر وأين؟
A: شركة `dotCloud`، في مؤتمر `PyCon 2013`.

**Q5:** ما الفرق بين `Image` و`Container`؟
A: `Image` قالب ثابت غير قابل للتعديل، `Container` نسخة تشغيل حيّة وقابلة للتغيير مؤقتاً من تلك الصورة.

**Q6:** ما الذي يجعل `Multi-stage Build` مفيداً؟
A: يفصل بيئة البناء الثقيلة عن بيئة التشغيل النهائية، فتنتج صورة أصغر وأنظف.

**Q7:** ما وظيفة `Docker Volumes`؟
A: ربط مجلد على المضيف بمجلد داخل الحاوية لحفظ البيانات بشكل دائم ونقل الملفات بأمان.

**Q8:** ما معنى `Copy On Write`؟
A: آلية تعرض أحدث نسخة من الملف مع الاحتفاظ بالنسخ القديمة في طبقاتها الأصلية، لتوفير التخزين وإعادة استخدام الطبقات المشتركة.

**Q9:** ما الأمر المباشر لحذف صورة Docker؟
A: `docker rmi`.

**Q10:** ما الأمر المباشر لعرض قائمة الحاويات؟
A: `docker ps`.

**Q11:** ما الشرط الضروري في `Dockerfile` لكي يعمل ربط منفذ عبر `ports` في Compose؟
A: يجب أن تحتوي الصورة على تعليمة `EXPOSE` لذلك المنفذ.

**Q12:** ما تاريخ حادثة تعطّل نصف الإنترنت وDocker Hub، وما سببها؟
A: 20 أكتوبر 2025، بسبب إعداد خاطئ لـ `DNS` في منطقة `US-East-1` على `AWS`.

**Q13:** ماذا يحدث لبيانات حاوية بدون `Volume` عند حذفها؟
A: تُفقد بالكامل لأنها كانت في طبقة الحاوية المؤقتة فقط، وليست في الصورة الأصلية.

**Q14:** ما محرك الشبكة الافتراضي في Docker؟
A: `bridge`.

---
## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> يجمع هذا القسم أجزاء صورة React متعددة المراحل التي شُرحت على دفعات متفرقة في المحاضرة، في ملف واحد مرجعي شامل.

#### 💻 الكود الكامل: صورة React متعددة المراحل مع خدمة عبر Apache

```dockerfile
FROM node:24-trixie-slim AS base                          # Base stage: Node 24 on Debian Trixie
ENV PNPM_HOME="/pnpm"                                      # Set pnpm's home directory
ENV PATH="$PNPM_HOME:$PATH"                                 # Add pnpm to the executable PATH
RUN corepack enable                                          # Enable Node's package manager shims

# Add missing shared libraries required by some native Node.js modules
RUN apt-get update                                            # Refresh the package index
RUN apt-get upgrade -y                                         # Upgrade existing packages
RUN apt-get install -y libc6 libstdc++6 libgomp1\
    libprotobuf-dev openssh-client openssh-server               # Install required native libs
RUN rm -rf /var/apt/cache/*                                       # Clean apt cache to reduce size
RUN rm -rf /var/lib/apt/lists/*                                     # Clean apt lists to reduce size
WORKDIR /app                                                         # Set working directory to /app

FROM base AS deps                                                     # deps stage inherits base
COPY package.json pnpm-lock.yaml* ./                                   # Copy dependency manifests only
RUN CI="true" pnpm install                                               # Install dependencies

FROM deps AS build                                                        # build stage inherits deps
COPY . .                                                                     # Copy the full project source
# Generate so TypeScript has the types to build against
RUN CI="true" pnpm run build                                                  # Run the production build

FROM httpd:latest                                                              # Final stage: clean Apache image
COPY --from=build /app/dist /usr/local/apache2/htdocs/                          # Copy only the built output
```

**الناتج المتوقع:** صورة نهائية خفيفة تحتوي على Apache وملفات موقع React المبنية فقط، جاهزة للنشر مباشرة عبر `docker run` أو `docker compose`.

#### 💻 الكود الكامل: ملف Docker Compose — خدمة Landing عبر Traefik + قاعدة بيانات

```yaml
services:
  landing:
    container_name: landing
    image: $CI_REGISTRY_IMAGE:latest
    restart: always
    networks:
      - web
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.landing.rule=Host(`${SITE_DOMAIN}`)'
      - 'traefik.http.routers.landing.priority=1000'
      - 'traefik.http.routers.landing.entrypoints=websecure'
      - 'traefik.http.routers.landing.tls.certresolver=letsencrypt'
      - 'traefik.http.services.landing.loadbalancer.server.port=80'

  db:
    image: pgvector/pgvector:pg18-trixie
    container_name: kc-db
    environment:
      POSTGRES_PASSWORD: H&*(hj0iosdfgwq
    ports:
      - 54321:5432
    volumes:
      - /opt/kc-db:/var/lib/postgresql

networks:
  web:
    external: true
```

**الناتج المتوقع:** تشغيل خدمتين معاً بأمر واحد (`docker compose up -d`): خدمة واجهة أمامية موجّهة عبر Traefik بشهادة SSL تلقائية، وقاعدة بيانات ببيانات محفوظة بشكل دائم.

---
## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: ما هو Docker ولماذا يُستخدم؟
**نموذج الإجابة:**
1. التعريف: نظام لتغليف التطبيق وبيئته الكاملة في وحدة قابلة للنقل تُسمى `Image`.
2. المكونات/الشروط: يعتمد على `Images` و`Containers` كوحدات أساسية، ويستخدم عزل نظام الملفات والشبكة والعتاد.
3. مثال: تشغيل `Gitlab` كاملاً بصورة واحدة بدل تثبيت `PostgreSQL` و`Redis` يدوياً.
4. متى نستخدم: عند الحاجة لنشر تطبيق بنفس البيئة تماماً على أي جهاز أو سيرفر.

### سؤال 2: ما الفرق بين Container وVirtual Machine؟
**نموذج الإجابة:**
1. التعريف: الحاوية صندوق رملي معزول يشارك نواة نظام التشغيل؛ الـ VM تحاكي عتاداً كاملاً وتشغّل نظام تشغيل مستقلاً.
2. المكونات/الشروط: الحاوية تعزل العتاد ونظام الملفات والشبكة دون محاكاة عتاد فعلي.
3. مثال: تشغيل عشرات حاويات الويب على سيرفر واحد بسهولة، بينما يصعب تشغيل نفس العدد من الـ VMs على نفس السيرفر.
4. متى نستخدم: الحاوية للنشر السريع والخفيف؛ VM عند الحاجة لعزل نظام تشغيل كامل مختلف تماماً.

### سؤال 3: اشرح آلية Copy On Write وأهميتها.
**نموذج الإجابة:**
1. التعريف: آلية تخزين تعرض أحدث نسخة من ملف تغيّر عبر عدة طبقات، مع الاحتفاظ بالنسخ القديمة في طبقاتها الأصلية.
2. المكونات/الشروط: كل طبقة لها بصمة (hash) فريدة تُستخدم لتحديد إمكانية إعادة الاستخدام.
3. مثال: تنزيل صورة جديدة تشترك في بعض الطبقات مع صورة موجودة مسبقاً لا يعيد تنزيل تلك الطبقات.
4. متى نستخدم: تعمل تلقائياً في كل صورة Docker دون تدخل المستخدم، لكن فهمها ضروري لتحسين ترتيب أوامر Dockerfile.

### سؤال 4: ما الفرق بين Docker Build وDocker Compose؟
**نموذج الإجابة:**
1. التعريف: `Build` يبني صورة واحدة من `Dockerfile`؛ `Compose` يصف ويشغّل حاوية أو أكثر عبر ملف `YAML`.
2. المكونات/الشروط: معاً يشكّلان ما يُسمى `Docker Engine`.
3. مثال: استخدام `docker build` لبناء صورة تطبيق، ثم `docker compose up` لتشغيلها مع قاعدة بيانات وشبكة معاً.
4. متى نستخدم: `Build` عند إنشاء صورة جديدة؛ `Compose` عند إدارة إعدادات معقّدة لعدة حاويات مترابطة.

### سؤال 5: ما هو Multi-stage Build ولماذا نستخدمه؟
**نموذج الإجابة:**
1. التعريف: أسلوب بناء صورة عبر عدة مراحل مسمّاة، تُنسخ من آخرها فقط النتائج المطلوبة للصورة النهائية.
2. المكونات/الشروط: يستخدم `FROM ... AS name` لتسمية كل مرحلة، و`COPY --from=name` للنسخ الانتقائي.
3. مثال: بناء واجهة React عبر Node ثم نسخ فقط ملفات `dist/` لصورة Apache نظيفة.
4. متى نستخدم: عند الحاجة لتصغير حجم الصورة النهائية وفصل أدوات البناء عن بيئة التشغيل.

### سؤال 6: لماذا نحتاج Docker Volumes؟
**نموذج الإجابة:**
1. التعريف: آلية لربط مجلد على المضيف بمجلد داخل الحاوية.
2. المكونات/الشروط: يمكن أن يكون Volume للقراءة والكتابة أو للقراءة فقط (`:ro`).
3. مثال: ربط `/opt/kc-db` بمجلد بيانات PostgreSQL لضمان بقاء البيانات بعد حذف الحاوية.
4. متى نستخدم: أي بيانات يجب أن تبقى محفوظة رغم حذف أو إعادة إنشاء الحاوية.

### سؤال 7: اشرح تاريخ تطور تقنيات عزل التطبيقات قبل Docker.
**نموذج الإجابة:**
1. التعريف: سلسلة من الأدوات التي سبقت Docker في فكرة عزل العمليات عن النظام.
2. المكونات/الشروط: `chroot` (1979) → `Jails` (2000) → `Zones` (2004) → `LXC` (2008).
3. مثال: `LXC` كانت أول محاولة جدّية على Linux، لكنها كانت معقدة وبلا معيار موحّد.
4. متى نستخدم: فهم هذا التاريخ يوضّح أن Docker حلّ مشكلة التعقيد والتوحيد وليس مشكلة العزل نفسها.

### سؤال 8: ما دلالة حادثة أكتوبر 2025 من منظور إدارة المشاريع؟
**نموذج الإجابة:**
1. التعريف: تعطّل نصف الإنترنت وDocker Hub بسبب خطأ DNS في منطقة واحدة من AWS.
2. المكونات/الشروط: تعتمد على مفهوم "نقطة الفشل الواحدة" (Single Point of Failure).
3. مثال: أي شركة تعتمد بالكامل على مزوّد واحد ومنطقة واحدة معرّضة لنفس الخطر.
4. متى نستخدم: يُستشهد بهذه الحادثة كدرس في التخطيط لسيناريوهات الفشل (Contingency Planning) عند تصميم بنية تحتية.

---
## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين `Container` و`Virtual Machine` بوضوح
- [ ] أعرف تسلسل تاريخ تقنيات العزل: chroot → Jails → Zones → LXC → Docker
- [ ] أفهم قصة نشأة Docker من شركة dotCloud وإطلاقه في PyCon 2013
- [ ] أستطيع تفسير حادثة أكتوبر 2025 ودلالتها في إدارة المخاطر
- [ ] أميّز بين `Image` و`Container` و`Registry`
- [ ] أعرف وظيفة كل من `Docker Build`, `Docker Compose`, `Docker Networks`, `Docker Volumes`
- [ ] أستطيع كتابة Dockerfile بسيط بصيغة `FROM` و`COPY`
- [ ] أفهم أسلوب `Multi-stage Build` وأستطيع شرح كل مرحلة فيه
- [ ] أعرف الفرق بين `CMD` الموروث والمُعرَّف صراحة
- [ ] أفهم آلية `Copy On Write` وسبب استخدامها
- [ ] أعرف ماذا يحدث لبيانات حاوية عند حذفها بدون `Volume`
- [ ] أستطيع تمييز أوامر `docker image` من أوامر `docker container` المباشرة وغير المباشرة
- [ ] أعرف أنواع محركات الشبكات الستة في Docker ومتى تُستخدم كل منها
- [ ] أستطيع كتابة ملف `docker-compose.yml` يتضمن `services`, `networks`, `volumes`, `labels`
- [ ] أفهم أهمية `EXPOSE` مع `ports` في Compose
- [ ] أستطيع حل تمارين تتبع تكديس الطبقات وتعارضها

---
## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| المحاضرة 3 (Docker) | المحاضرة القادمة (CI/CD) | Traefik وbناء الشبكات يدوياً وواجهات الإدارة الرسومية ستُشرح لاحقاً |
| المحاضرة 3 (Docker) | إدارة المخاطر (Risk Management) | حادثة أكتوبر 2025 كمثال على نقطة الفشل الواحدة |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| العزل | الحاوية تشارك النواة وتعزل نظام الملفات والشبكة والعتاد دون محاكاة عتاد كامل |
| الطبقات | كل `RUN`/`COPY` طبقة جديدة؛ Copy On Write يعرض الأحدث ويحتفظ بالقديم لإعادة الاستخدام |
| البيانات الدائمة | بلا `Volume`، تُفقد كل بيانات الحاوية عند حذفها |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `FROM` | تحديد الصورة الأساس | `Dockerfile` |
| `COPY --from=` | نسخ من مرحلة بناء سابقة | `Multi-stage Build` |
| `CMD` | الأمر الرئيسي عند تشغيل الحاوية | `Dockerfile` |
| `EXPOSE` | إعلان المنفذ الذي تستمع عليه الحاوية | `Dockerfile` (شرط لعمل `ports`) |
| `services:` | تعريف الحاويات في Compose | `docker-compose.yml` |
| `external: true` | استخدام شبكة موجودة مسبقاً | `docker-compose.yml` |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لا تشغّل قاعدة بيانات بدون `Volume` في الإنتاج أبداً |
| 2 | رتّب أوامر `Dockerfile` بحيث تأتي الملفات الأقل تغييراً أولاً لتحسين التخزين المؤقت |
| 3 | استخدم `Multi-stage Build` دائماً عند وجود خطوة بناء (build step) ثقيلة |
| 4 | تذكّر `EXPOSE` في Dockerfile قبل الاعتماد على `ports` في Compose |
| 5 | استخدم `docker rmi` للصور و`docker rm` للحاويات — لا تخلط بينهما |

<!-- VALIDATION
schema: 1.0
parts: detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, qa_cards, code_reference, theory, checklist, cheat_sheet
mcq_count: 16
code_blocks: 15
-->

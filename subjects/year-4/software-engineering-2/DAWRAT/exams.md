## المحاضرة 1: Introduction to Software Engineering (مقدمة في هندسة البرمجيات)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 1 (سهل)
What is the primary goal of software measurement?
أ) To track the progress of the development team
ب) To estimate the cost of software development
ج) To assess the quality of software products
د) To allocate resources effectively
**الإجابة الصحيحة: ج**
**التعليل:**
`Software Metrics` حسب المحاضرة الأولى تنقسم لـ `Process Metrics` (تقيس عملية التطوير) و`Product Metrics` (تقيس خصائص المنتج نفسه كالحجم والتعقيد) — والهدف الجامع الأشمل وراء كل هذا هو تقييم جودة المنتج البرمجي كمّياً بدل الاعتماد على الإحساس الشخصي.

أ) تتبع تقدم الفريق فائدة جانبية للـ `Process Metrics` فقط، مو الهدف الأساسي الشامل.
ب) تقدير التكلفة تطبيق عملي واحد من تطبيقات القياس، مو الهدف الأساسي نفسه.
د) توزيع الموارد نتيجة غير مباشرة، مو الهدف المباشر للقياس.

المحاضرة عرّفت `Measure` و`Measurement` و`Metrics` كسلسلة مترابطة هدفها النهائي إعطاء أرقام موضوعية بدل أحكام شخصية على جودة المنتج.

**المصدر:** [نمط 2023-2024]
### السؤال 2 (سهل)
Which metric is often used to measure the efficiency of a software development team?
أ) Defect density
ب) Lines of code per person-month
ج) Code coverage
د) Number of test cases
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة الأولى عرّفت الإنتاجية (`Productivity`) بأنها معدل الناتج لكل وحدة جهد، وتُقاس عادة بـ `LOC`/PM (أسطر كود مقسومة على شهر-شخص) — وهذا مطابق تماماً لنص السؤال.

أ) `Defect Density` تقيس جودة المنتج، مو كفاءة الفريق.
ج) `Code Coverage` يقيس شمول الاختبارات، مو إنتاجية الفريق.
د) عدد حالات الاختبار مقياس اختبار، مو إنتاجية.

هذا تطبيق مباشر لتعريف الإنتاجية اللي ورد في نهاية المحاضرة الأولى ضمن مصطلحات إدارية وقياسية أساسية (`Deliverables`, `Milestones`, Product, Process, `Measure`, `Measurement`, `Metrics`, `Productivity`).

**المصدر:** [نمط 2023-2024]
### السؤال 3 (سهل)
A software process model is:
أ) A representation of the way in which software is developed
ب) A representation of the way in which software processes data
ج) A representation of the way in which software is used
د) A representation of the way in which software may fail
ه) An attractive young person used in the process of selling software
**الإجابة الصحيحة: أ**
**التعليل:**
`Software Process` حسب المحاضرة الأولى هو "الطريقة اللي ننتج فيها البرمجية" — و`Software Process Model` هو التمثيل المنظَّم لهذه الطريقة (زي `Waterfall` أو `Spiral`).

ب) معالجة البيانات وظيفة البرنامج نفسه، مو تعريف "نموذج العملية".
ج) طريقة استخدام البرنامج تخص المستخدم النهائي، لا عملية التطوير.
د) طريقة فشل البرنامج تخص الموثوقية، لا نموذج العملية.
ه) خيار هزلي واضح لا علاقة له بالتعريف التقني.

نماذج `SDLC` الكاملة (`Waterfall`, `Prototyping`, `Iterative Enhancement`, Evolutionary, `Spiral`) كلها أمثلة ملموسة على "تمثيل طريقة تطوير البرمجية" — وهذا جوهر تعريف `Software Process Model`.

**المصدر:** [نمط 2023-2024]
### السؤال 4 (سهل)
A metric is:
أ) an ISO standard unit (such a meter, kilogram, etc.)
ب) a qualitative measure of the degree to which a system component possesses a given attribute
ج) a quantitative measure of the degree to which a system component possesses a given attribute
د) a qualitative attribute which determines the degree to which a system component may be measured
ه) an attributed quantity which measures a system component in degrees.
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة عرّفت `Metrics` بأنها ربط عدة Measures ببعض للحصول على مقياس كمّي (quantitative) يصف درجة امتلاك عنصر النظام لخاصية معيّنة — زي متوسط الأخطاء لكل module.

أ) وحدة ISO قياسية (مثل المتر) مفهوم فيزيائي عام، مو تعريف `Metrics` البرمجية.
ب) "qualitative" (نوعي) خطأ مباشر — المقياس بطبيعته كمّي (رقمي)، لا نوعي.
d وe صياغات مشوَّشة وغير دقيقة لا تطابق التعريف الرسمي.

هذا نفس التعريف اللي وردت به `Metrics` في نهاية المحاضرة الأولى ضمن السلسلة الثلاثية: `Measure` (مؤشر رقمي فردي) → `Measurement` (فعل القياس) → `Metrics` (ربط عدة measures للحصول على قياس كمّي).

**المصدر:** [نمط 2023-2024]
### السؤال 5 (متوسط)
Why is it useful to measure aspects of a system?
أ) Because human subjective perception is notoriously inaccurate.
ب) Because numbers give us a way of comparing, controlling and predicting system behavior.
ج) Because measurements give us a way of tracking progress.
د) Because it gives us an assessment of the product quality.
ه) All of the above.
**الإجابة الصحيحة: ه**
**التعليل:**
كل الأسباب الأربعة صحيحة ومكمّلة لبعض: الإحساس الشخصي غير دقيق فعلاً وغير موضوعي، الأرقام تتيح المقارنة والتحكم والتنبؤ، القياسات تساعد على تتبع التقدم، وتُعطي تقييماً موضوعياً لجودة المنتج.

a وb وc وd كلها أسباب حقيقية جزئية، لكن ولا واحد منها يغطي "كل" فوائد القياس لوحده.

هذا يلخّص الفكرة الجوهرية اللي بُنيت عليها المحاضرة الأولى كلها: بدل الاعتماد على الإحساس الشخصي غير الموضوعي، نستخدم أرقاماً فعلية (Measures/`Metrics`) لمقارنة والتحكم بالتنبؤ بسلوك النظام وتتبع تقدمه وتقييم جودته.

**المصدر:** [نمط 2023-2024]
### السؤال 6 (سهل)
Which of the following is not required when developing a metric?
أ) a measurable property
ب) a relationship between that property and what we wish to know
ج) a relationship between that property and some immeasurable dimensions of the system
د) a consistent expression of that relationship
ه) All of them are required.
**الإجابة الصحيحة: ج**
**التعليل:**
المقياس الجيد لازم يربط خاصية قابلة للقياس بشيء نريد معرفته (وهذا أيضاً لازم يكون قابلاً للتعبير عنه بشكل متسق) — لكن ربط الخاصية بـ"أبعاد غير قابلة للقياس أصلاً" يناقض الهدف الجوهري من بناء المقياس نفسه، لأنه يفقد قابلية القياس والتحقق.

أ) خاصية قابلة للقياس شرط أساسي فعلاً.
ب) علاقة الخاصية بما نريد معرفته شرط أساسي فعلاً (هذا ما يجعل المقياس مفيداً/ذا معنى).
د) تعبير متسق عن العلاقة شرط أساسي فعلاً (وإلا لا يمكن مقارنة نتائج القياس عبر الزمن).

المقياس الجيد يربط خصائص قابلة للقياس بأشياء نريد فهمها بطريقة متسقة وقابلة للتكرار — لا علاقة له بـ"أبعاد غير قابلة للقياس أصلاً"، وهذا بالضبط ما يميّز المقياس الجيد عن التخمين غير الموضوعي.

**المصدر:** [نمط 2023-2024]
### السؤال 7 (سهل)
What are the features of a poor metric?
أ) It is complex, hard-to-measure, and persuasive.
ب) It is complex, consistent, and language-independent.
ج) It is simple, hard-to-measure, and has no units.
د) It is complex, subjective, and inconsistent.
ه) It is complex, subjective, and persuasive.
**الإجابة الصحيحة: د**
**التعليل:**
المقياس السيء يتّصف بالتعقيد (صعب الفهم والتطبيق)، الذاتية (يعتمد رأي شخصي بدل معايير موضوعية)، وعدم الاتساق (نتائج مختلفة لنفس الظروف) — عكس تماماً خصائص المقياس الجيد (بسيط، موضوعي، متسق).

أ) "مقنع" (persuasive) ليست صفة سلبية جوهرية بحد ذاتها، والمقياس الجيد بالعكس يجب أن يكون مقنعاً بموضوعية.
ب) "متسق ومستقل عن اللغة" صفات إيجابية، لا تصف مقياساً سيئاً.
ج) "بسيط" صفة إيجابية للمقياس الجيد، لا السيء.

هذا عكس تماماً الشروط الأربعة لبناء مقياس جيد (خاصية قابلة للقياس + علاقة بما نريد معرفته + تعبير متسق) اللي ورد في السؤال السابق مباشرة بنفس الدورة.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 8 (سهل)
Which of the following is NOT a key characteristic of a good software metric?
أ) It should be easy to collect and automate.
ب) It should be independent of the development process.
ج) It should be consistently interpretable.
د) It should provide actionable insights for improvement.
**الإجابة الصحيحة: ب**
**التعليل:**
المقياس الجيد يجب أن يرتبط بما نريد معرفته ضمن سياق عملية التطوير الفعلية، لا أن يكون "مستقلاً" عنها تماماً — المقاييس (خصوصاً `Process Metrics`) بطبيعتها مرتبطة بعملية التطوير لتكون مفيدة أصلاً.

أ) سهولة الجمع والأتمتة صفة إيجابية مطلوبة فعلاً.
ج) قابلية التفسير المتسق شرط أساسي (تذكّر: "تعبير متسق عن العلاقة" من شروط المقياس الجيد في المحاضرة الأولى).
د) تقديم رؤى قابلة للتنفيذ هدف المقياس الجيد أصلاً.

هذا يربط بشروط المقياس الجيد اللي شرحتها المحاضرة الأولى: خاصية قابلة للقياس + علاقة بما نريد معرفته + تعبير متسق — والمقياس المفيد بطبيعته مرتبط بسياق العملية اللي يقيسها، لا منفصل عنها.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 9 (سهل)
Which of the following is a key benefit of using software metrics in a development project?
أ) They guarantee the success of the project.
ب) They eliminate the need for communication and collaboration among team members.
ج) They automatically fix bugs and resolve issues.
د) They provide objective data for decision-making and improvement.
**الإجابة الصحيحة: د**
**التعليل:**
المحاضرة الأولى أكدت أن القياس يحل مشكلة "الإحساس الشخصي غير الموضوعي" عبر إعطاء أرقام فعلية للمقارنة والتحكم والتنبؤ — أي بيانات موضوعية تدعم اتخاذ القرار والتحسين.

أ) "ضمان النجاح" مبالغة كاملة — المقاييس تساعد على اتخاذ قرار أفضل، لا تضمن النجاح المطلق.
ب) عكس الحقيقة تماماً — المقاييس تُستخدم كأساس للتواصل والمناقشة بين الفريق، لا تلغيه.
ج) المقاييس لا "تصلح" شيئاً بحد ذاتها؛ هي أداة تشخيص، والإصلاح فعل بشري لاحق.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 10 (سهل)
What is the primary cause of the "software crisis" as identified in the 1960s?
أ) Rapidly increasing hardware capabilities
ب) The rise of open-source software
ج) The introduction of agile methodologies
د) Inability to meet user requirements and project deadlines
**الإجابة الصحيحة: د**
**التعليل:**
المحاضرة وثّقت أزمة البرمجيات بأرقام IBM: 31% من المشاريع تُلغى، 53% تتجاوز الميزانية بمعدل 189%، 94 من كل 100 مشروع يُعاد بدؤه من الصفر — كلها مظاهر لفشل تلبية متطلبات المستخدم والالتزام بالمواعيد.

أ) تطور الهاردوير كان في الحقيقة سبباً إضافياً (الطلب المتزايد على برمجيات أعقد)، لا "السبب الأساسي" المباشر للأزمة.
ب) البرمجيات مفتوحة المصدر مفهوم لاحق زمنياً بعقود، لم يكن موجوداً أصلاً في الستينات.
ج) منهجيات `Agile` ظهرت لاحقاً بعقود (٢٠٠١) كحل جزئي لمشاكل لاحقة، لا سبب الأزمة الأصلية.

أمثلة المحاضرة (Y2K، صاروخ Patriot، مشروع قاعدة بيانات كلّف مليون دولار وسُلّم في وقته لكن ما اشتغل صح، Ariane-5) كلها توضح فشلاً جوهرياً في تلبية المتطلبات والالتزام بالمواعيد والجودة، لا مشكلة هاردوير أو منهجية.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 11 (متوسط)
Which of the following best describes a consequence of the software crisis?
أ) Decreased demand for software engineers
ب) Increased costs and delays in software development projects
ج) Improved collaboration between development teams and stakeholders
د) A shift towards more manual testing processes
**الإجابة الصحيحة: ب**
**التعليل:**
هذا مباشرة ما وثّقته أرقام المحاضرة: 53% من المشاريع تتجاوز الميزانية بمعدل 189%، وهذا يعني زيادة تكلفة وتأخيرات فعلية موثقة كنتيجة مباشرة للأزمة.

أ) الأزمة أدت فعلياً لزيادة الطلب على هندسة البرمجيات كتخصص منظم، لا انخفاضه.
ج) الأزمة كشفت فشل التواصل والتنسيق، لا تحسّنه — وهذا بالضبط ما دفع لظهور Software Engineering كحل.
د) الأزمة دفعت نحو منهجيات أكثر تنظيماً وأتمتة لاحقاً، لا مزيداً من الاختبار اليدوي.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 12 (سهل)
Which of the following factors contributed significantly to the software crisis?
أ) Lack of programming languages
ب) Insufficient documentation and poor project management practices
ج) High-quality coding standards
د) Over-reliance on automated testing tools
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة ربطت أزمة البرمجيات بغياب منهجية واضحة في التطوير — بما فيها ضعف التوثيق وسوء إدارة المشروع، وهذا بالضبط ما جاء `Software Process` ليحله عبر أربعة أنشطة منظمة (Specification, Development, `Validation`, Evolution).

أ) نقص لغات البرمجة لم يكن سبباً — كانت هناك لغات كافية، لكن نقص المنهجية هو المشكلة.
ج) معايير ترميز عالية الجودة عكس المشكلة تماماً — لو كانت موجودة فعلياً لما حصلت الأزمة.
د) الاعتماد المفرط على أدوات اختبار آلية مفهوم لاحق زمنياً؛ أدوات الأتمتة لم تكن منتشرة في الستينات أصلاً.

المحاضرة أكدت أن التكلفة الحقيقية للأزمة لم تكن فقط في "كتابة كود يشتغل"، بل في غياب منهجية واضحة تدير التكلفة والوقت والجودة معاً — وهذا يشمل التوثيق وإدارة المشروع تحديداً.

## المحاضرة 2: Software Life Cycle Models (نماذج دورة حياة البرمجيات)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 13 (سهل)
Which software development process model is characterized by iterations and feedback cycles?
أ) Waterfall
ب) Spiral
ج) Agile
د) V-shaped
**الإجابة الصحيحة: ج**
**التعليل:**
`Agile` معروف بدورات قصيرة متكررة (sprints) مع تغذية راجعة مستمرة من العميل بعد كل دورة — وهذا بالضبط ما يصفه السؤال بـ"iterations and feedback cycles".

أ) `Waterfall` تسلسل خطي صارم بدون تكرار أو رجوع للخلف.
ب) `Spiral` فيها تكرار فعلاً لكنها تركّز أساساً على تحليل المخاطر (`Risk Analysis`) في كل لفة، وليس "التغذية الراجعة" كمحور رئيسي.
د) `V-shaped` امتداد خطي لـ `Waterfall` مع مطابقة كل مرحلة تطوير باختبار مقابل، بدون تكرار.

ملاحظة: هذا السؤال يعتمد على معرفة عامة بـ`Agile` أكثر من كونه مذكوراً بالاسم في محاضرة نماذج `SDLC` (لأن المحاضرة غطّت Build&Fix, `Waterfall`, `Prototyping`, `Iterative Enhancement`, Evolutionary, `Spiral` فقط) — الإجابة معتمدة على المعرفة العامة المتوافقة مع مبدأ "التكرار + الفيدباك" الذي هو جوهر `Agile`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 14 (سهل)
Which of the following is a software maintenance activity?
أ) Requirement analysis
ب) Code development
ج) System testing
د) Bug fixing
**الإجابة الصحيحة: د**
**التعليل:**
مرحلة `Operation & Maintenance` في نموذج `Waterfall` تبدأ فور إطلاق البرنامج، وتشمل تصحيح الأخطاء (bug fixing)، إضافة تحسينات، وحذف قدرات غير مستخدمة.

أ) Requirement analysis وb) Code development وc) `System testing` كلها مراحل من دورة التطوير الأولية (قبل الإطلاق)، وليست أنشطة صيانة بعد التسليم.

هذا مرتبط مباشرة بتعريف `Waterfall` model في محاضرة `SDLC`، حيث الصيانة هي آخر مرحلة في المخطط، وتُفعَّل فقط بعد أن يكون النظام قيد الاستخدام الفعلي.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 15 (سهل)
Which software development process model involves a series of small, incremental releases?
أ) Waterfall
ب) Spiral
ج) Agile
د) V-shaped
**الإجابة الصحيحة: ج**
**التعليل:**
`Agile` يعتمد على إصدارات صغيرة متكررة (sprints) تُسلَّم بشكل تراكمي ومتكرر للعميل، بعكس النماذج الأخرى التي تُسلّم النظام دفعة واحدة أو بعد لفة واحدة كبيرة.

أ) `Waterfall` يسلّم النظام كاملاً مرة واحدة في نهاية المشروع.
ب) `Spiral` يركّز على تحليل المخاطر عبر لفات كبيرة، وليس بالضرورة إصدارات صغيرة متتالية بنفس منطق `Agile`.
د) `V-shaped` امتداد خطي لـ `Waterfall`، لا يتضمن إصدارات صغيرة متكررة.

ملاحظة: كما في سؤال سابق، `Agile` هنا معرفة عامة تكمّل ما تعلمناه عن `Iterative Enhancement` في محاضرة `SDLC` (حيث كل دورة تُنتج نسخة قابلة للاستخدام فعلياً) — المبدأ نفسه يوسّعه `Agile` لإصدارات أصغر وأسرع.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 16 (سهل)
Which software process model emphasizes the importance of risk analysis throughout the development process?
أ) Waterfall
ب) Spiral
ج) Agile
د) V-shaped
**الإجابة الصحيحة: ب**
**التعليل:**
`Spiral Model` هو النموذج الوحيد اللي أدمج "تحليل المخاطر" (`Risk Analysis`) كنشاط رسمي ثابت في كل لفة من لفاته الأربع (Planning → `Risk Analysis` → Development → Assessment) — وهذا كان الحل المباشر لمشكلة أن كل النماذج السابقة تجاهلت المخاطر تماماً.

أ) `Waterfall` لا يتضمن أي تقييم رسمي للمخاطر إطلاقاً — هذا أحد أهم عيوبه المذكورة بالمحاضرة.
ج) `Agile` يركّز على التكيّف والتسليم السريع أكثر من تحليل مخاطر رسمي منهجي.
د) `V-shaped` امتداد لـ `Waterfall` بدون تحليل مخاطر مدمج.

المحاضرة وصفت الشكل الحلزوني بدقة: البعد الشعاعي = التكلفة التراكمية، والبعد الزاوي = التقدم، وكل لفة تمر إجبارياً بمرحلة `Risk Analysis`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 17 (سهل)
Which software development model involves the construction of a partial system that is progressively refined through iterations?
أ) Waterfall
ب) Spiral
ج) Incremental
د) V-shaped
**الإجابة الصحيحة: ج**
**التعليل:**
هذا وصف مباشر لما سمّته المحاضرة "`Iterative Enhancement`" (والمعروف عموماً أيضاً بـ `Incremental Model`): يُبنى نظام جزئي في البداية، وكل دورة لاحقة تضيف وظائف جديدة فوق الإصدار السابق تدريجياً، مع إطلاق منتج قابل للاستخدام فعلياً في نهاية كل دورة.

أ) `Waterfall` يبني النظام كاملاً دفعة واحدة بدون تجزئة تدريجية.
ب) `Spiral` يركّز على المخاطر أكثر من "البناء الجزئي المتصاعد" تحديداً، رغم أنه تكراري أيضاً.
د) `V-shaped` امتداد خطي غير تدريجي.

المحاضرة حذّرت صراحة من خطأ شائع: الخلط بين `Iterative Enhancement` و`Evolutionary Development` — فقط الأول ("`Incremental`" هنا) يُنتج منتجاً قابلاً للاستخدام فعلياً في كل دورة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 18 (سهل)
Which software development approach involves the creation of a series of prototypes to refine the requirements and design?
أ) Waterfall
ب) Spiral
ج) Prototype-based
د) V-shaped
**الإجابة الصحيحة: ج**
**التعليل:**
`Prototyping Model` يعتمد على بناء نسخة تجريبية (prototype) بناءً على المتطلبات المتاحة، يجرّبها العميل ويعطي ملاحظات، وتُنقَّح المتطلبات بناءً عليها، وقد تتكرر الدورة أكثر من مرة حتى تصل لمواصفة نهائية دقيقة.

أ) `Waterfall` لا يبني أي نموذج تجريبي إطلاقاً.
ب) `Spiral` يبني نماذج تجريبية أيضاً ضمن لفاته الأولى، لكن جوهره الأعمق هو تحليل المخاطر لا تنقيح المتطلبات فقط.
د) `V-shaped` لا يتضمن نماذج تجريبية.

نقطة مهمة أكدتها المحاضرة: النموذج التجريبي بأكمله يُرمى (thrown away) بعد انتهاء مهمته، والفائدة الحقيقية هي الخبرة المكتسبة لبناء النظام الفعلي لاحقاً.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 19 (سهل)
Which software development process model involves a series of overlapping, incremental, and iterative activities?
أ) Waterfall
ب) Spiral
ج) Iterative and incremental development
د) V-shaped
**الإجابة الصحيحة: ج**
**التعليل:**
"Iterative and `Incremental` Development" (IID) هو الاسم العام الذي يجمع فكرة `Iterative Enhancement` اللي شرحتها المحاضرة: أنشطة متداخلة ومتكررة تُنتج زيادات وظيفية متعاقبة، كل دورة تبني فوق سابقتها.

أ) `Waterfall` تسلسل خطي بدون تداخل أو تكرار.
ب) `Spiral` تكراري فعلاً لكن جوهره تحليل المخاطر، مو مجرد "أنشطة متداخلة ومتصاعدة".
د) `V-shaped` لا يتضمن تكراراً.

هذا هو نفس مفهوم `Iterative Enhancement` بمسمى بديل شائع في الأدبيات (IID)، وهو الحل المباشر الذي طرحته المحاضرة لمشكلة "العميل يرى النتيجة متأخراً جداً" في `Waterfall`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 20 (سهل)
Which software development process model is characterized by a linear and sequential flow?
أ) Agile
ب) Waterfall
ج) Spiral
د) Iterative
**الإجابة الصحيحة: ب**
**التعليل:**
`Waterfall` هو التعريف الكلاسيكي للتدفق الخطي المتسلسل — خمس مراحل صارمة (Requirements → Design → Implementation → Testing → Maintenance) لازم تكتمل كل واحدة بالكامل قبل التالية، بدون رجوع للخلف نظرياً، تماماً مثل الماء اللي ينزل من الشلال.

أ) `Agile` تكراري بطبيعته (sprints)، عكس الخطية تماماً.
ج) `Spiral` حلزوني ومتكرر، ليس خطياً.
د) Iterative بطبيعته يتضمن تكراراً ورجوعاً، عكس "التدفق الخطي المتسلسل".

المحاضرة استخدمت تشبيه "الشلال" بالضبط لوصف `Waterfall`: الماء ينزل باتجاه واحد فقط ولا يرجع لفوق — وهذا جوهر السؤال.

**المصدر:** [نمط 2023-2024]
### السؤال 21 (سهل)
Which of the following is NOT a typical phase in the software project management lifecycle?
أ) Requirements Analysis
ب) Design
ج) Implementation
د) Deployment
**الإجابة الصحيحة: د**
**التعليل:**
مراحل `Waterfall` الخمس اللي سمّتها المحاضرة بدقة هي: `Requirements Analysis & Specification`، Design، Implementation، Testing، و`Operation & Maintenance`. "Deployment" لم تُذكر كاسم مرحلة مستقلة بهذا المسمى في المحاضرة — أقرب مرحلة لها هي جزء من `Operation & Maintenance` (الإطلاق الفعلي)، لا مرحلة منفصلة بذاتها.

أ) `Requirements Analysis` مرحلة أولى مذكورة صراحة.
ب) Design مرحلة ثانية مذكورة صراحة.
ج) Implementation مرحلة ثالثة مذكورة صراحة.

هذا سؤال يختبر حفظ الأسماء الدقيقة لمراحل `Waterfall` الخمس كما وردت بالمحاضرة، لا المفهوم العام لـ"النشر" الذي يُعتبر جزءاً ضمنياً من مرحلة التشغيل.

**المصدر:** [نمط 2023-2024]
### السؤال 22 (سهل)
Which project management approach focuses on delivering small, incremental improvements through iterative development?
أ) Waterfall
ب) Spiral
ج) Agile
د) V-Model
**الإجابة الصحيحة: ج**
**التعليل:**
`Agile` هو النهج الأشهر المرتبط بتسليم تحسينات صغيرة متكررة عبر دورات قصيرة (sprints)، وهو مبني على مبدأ `Iterative Enhancement` اللي شرحته محاضرة `SDLC`.

أ) `Waterfall` يسلّم النظام كاملاً دفعة واحدة.
ب) `Spiral` تكراري لكنه يركّز على المخاطر أكثر من "التحسينات الصغيرة المتكررة" تحديداً.
د) `V-Model` امتداد خطي لـ `Waterfall`.

**المصدر:** [نمط 2023-2024]
### السؤال 23 (سهل)
System maintenance is necessary because:
أ) Humans never get it right the first time.
ب) The deployment platform may change over time.
ج) The user's needs may change over time.
د) All of the above.
ه) None of the above.
**الإجابة الصحيحة: د**
**التعليل:**
الأسباب الثلاثة كلها صحيحة ومكمّلة لبعض: البشر نادراً ما يصيبون من أول محاولة (Software Myths ناقشت هذا في المحاضرة الأولى)، منصة النشر تتطور وتتغير، واحتياجات المستخدم تتطور مع الوقت — وكلها أسباب حقيقية لضرورة الصيانة المستمرة.

أ) صحيح لوحده لكنه ليس السبب الوحيد.
ب) صحيح لوحده لكنه ليس السبب الوحيد.
ج) صحيح لوحده لكنه ليس السبب الوحيد.

مرحلة `Operation & Maintenance` في `Waterfall` تشمل تصحيح الأخطاء، إضافة تحسينات، وحذف قدرات غير مستخدمة — وهذا يغطي فعلياً الأسباب الثلاثة مجتمعة (أخطاء بشرية أولية، تغيّر البيئة، وتغيّر احتياجات المستخدم).

**المصدر:** [نمط 2023-2024]
### السؤال 24 (سهل)
The five general phases in the `Spiral` model are:
أ) Analysis, Design, Implementation, Testing, and Review
ب) Review, Decision, Engineering, Acceptance, and Planning
ج) Analysis, Design, Engineering, Testing, and Payment
د) Review, Risk-analysis, Prototyping, Engineering (develop & verify), and Planning
ه) Review, Risk-analysis, Design, Implementation, and Planning
**الإجابة الصحيحة: د**
**التعليل:**
هذا الخيار هو الأقرب لمصطلحات `Spiral Model` الحقيقية اللي شرحتها المحاضرة: Planning (تحديد الأهداف والبدائل والقيود)، `Risk Analysis` (تحليل المخاطر)، بناء نموذج تجريبي (`Prototyping`) في اللفات الأولى، Engineering/Development (التطوير والتحقق الفعلي)، وReview/Assessment (تقييم العميل) — وكل هذه المصطلحات مذكورة بالخيار d تحديداً.

باقي الخيارات (a, b, c, e) تخلط مصطلحات من نماذج أخرى (`Waterfall`) أو تضيف كلمات غير منطقية (Payment) لا علاقة لها بالنموذج إطلاقاً.

المحاضرة وصفت اللفة الأولى (Planning → `Risk Analysis` → نموذج تجريبي أولي → تقييم العميل) بالتفصيل، وهذا يطابق ترتيب الخيار d بدقة.

**المصدر:** [نمط 2023-2024]
### السؤال 25 (سهل)
Which of the following increases as the `Spiral` model process moves "outwards"?
أ) Risk
ب) Profit
ج) Time-to-delivery
د) Time-to-completion
ه) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
البعد الشعاعي في مخطط `Spiral` يمثّل التكلفة التراكمية للمشروع، والبعد الزاوي يمثّل التقدم المُحرز — وكل ما ابتعدنا عن المركز (لفة جديدة إضافية) زاد الوقت المنقضي فعلياً من عمر المشروع (Time-to-completion يتراكم مع كل لفة إضافية).

أ) المخاطر تنخفض تدريجياً مع تقدم اللفات (كل لفة تحلّل وتحل مخاطر جديدة)، لا ترتفع.
ب) الربح مفهوم غير مرتبط مباشرة بأبعاد المخطط الحلزوني.
ج) "وقت التسليم" (delivery) قد يكون ثابتاً كهدف نهائي، بعكس الوقت المنقضي فعلياً (completion) الذي يتراكم مع كل لفة.

هذا يربط مباشرة بوصف المحاضرة للمخطط: كل لفة إضافية تعني مزيداً من الوقت المنقضي والتكلفة المتراكمة، بينما الهدف من إدماج `Risk Analysis` أصلاً هو تقليل المخاطر تدريجياً كلما تقدمنا للخارج.

**المصدر:** [نمط 2023-2024]
### السؤال 26 (سهل)
A software development model is really just:
أ) a more complex metaphor for what happens in reality.
ب) a theory which approximates what happens in reality
ج) an exact isomorphism to what happens in reality
د) an elaboration of the abstraction of flexibility
ه) a comforting lie we tell ourselves to maintain the delusion that we're developing software in some logical fashion.
**الإجابة الصحيحة: ب**
**التعليل:**
أي نموذج (model) في العلوم الهندسية، بما فيها نماذج `SDLC`، هو تبسيط/تقريب نظري للواقع المعقّد — يساعد على التفكير المنظم لكنه لا يطابق الواقع حرفياً 100%.

أ) "استعارة أكثر تعقيداً" وصف غير دقيق؛ النموذج يهدف للتبسيط لا زيادة التعقيد.
ج) "تطابق حرفي تام" (isomorphism) مبالغة غير واقعية — النماذج تقريبية دائماً، ولذلك نحتاج نماذج متعددة (`Waterfall`, `Spiral`...) لسياقات مختلفة.
d وe خيارات هزلية/غير تقنية واضحة.

هذا يتماشى مع فكرة رئيسية في محاضرة `SDLC`: لكل نموذج نقاط قوة وضعف، وأياً منها ليس "الحل المثالي المطلق" بل تقريب نظري مفيد ضمن سياق معين.

## المحاضرة 3: Software Requirements (متطلبات البرمجيات)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 27 (سهل)
What is the primary goal of requirements engineering?
أ) Designing the software architecture
ب) Developing the user interface
ج) Gathering and documenting the software requirements
د) Implementing the software features
**الإجابة الصحيحة: ج**
**التعليل:**
هندسة المتطلبات (`Requirements Engineering`) هدفها الأساسي جمع المتطلبات من العميل وأصحاب المصلحة وتوثيقها بدقة عبر أنشطتها الأربعة: `Elicitation`، `Analysis and Negotiation`، `Documentation`، `Validation` — لتنتج في النهاية وثيقة `SRS`.

أ) تصميم المعمارية يأتي بعد اكتمال المتطلبات، في مرحلة Design وليست جزءاً من RE.
ب) تطوير واجهة المستخدم نشاط تنفيذي لاحق، ليس هدف هندسة المتطلبات.
د) تنفيذ الميزات (implementation) يأتي في مرحلة لاحقة كلياً بعد التصميم.

المحاضرة أكدت أن هندسة البرمجيات في جوهرها "حل مشاكل"، وما تقدر تحل مشكلة صح إلا إذا فهمتها وجمعتها ووثقتها صح من الأول — وهذا بالضبط دور `Requirements Engineering`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 28 (سهل)
Which of the following is NOT a characteristic of a good requirement?
أ) Consistency
ب) Completeness
ج) Ambiguity
د) Verifiability
**الإجابة الصحيحة: ج**
**التعليل:**
الغموض (Ambiguity) هو بالضبط عكس ما يجب أن يكون عليه المتطلب الجيد — المحاضرة أعطت مثال كلمة "search" الشهير لتوضيح كيف أن الغموض في صياغة متطلب واحد أدى لتنفيذ خاطئ تماماً رغم أن المطوّر نفّذ النص "حرفياً".

أ) الاتساق (Consistency) صفة مطلوبة — لا يوجد تعارض بين المتطلبات.
ب) الاكتمال (Completeness) صفة مطلوبة — كل الوظائف المطلوبة موصوفة.
د) قابلية التحقق (Verifiability) صفة مطلوبة — من فحوصات `Validation` الخمسة التي شرحتها المحاضرة.

هذا مرتبط مباشرة بفحوصات `Validation` الخمسة (الصلاحية، الاتساق، الاكتمال، الواقعية، وقابلية التحقق) — والغموض هو بالضبط ما تحاول كل هذه الفحوصات القضاء عليه.

**المصدر:** [نمط 2023-2024]
### السؤال 29 (متوسط)
In the context of project management, what does 'scope creep' refer to?
أ) An increase in project budget
ب) An expansion of project scope without corresponding adjustments in resources or time
ج) A delay in project schedule
د) A reduction in project team size
**الإجابة الصحيحة: ب**
**التعليل:**
`Scope Creep` مصطلح قياسي يصف توسّع نطاق المشروع تدريجياً بدون تعديل مقابل في الموارد أو الجدول الزمني — غالباً بسبب متطلبات تتغير أو تُضاف باستمرار بدون إدارة تغيير رسمية.

أ) زيادة الميزانية نتيجة محتملة لـ `Scope Creep`، مو تعريفه نفسه.
ج) تأخر الجدول الزمني نتيجة محتملة أيضاً، مو التعريف المباشر.
د) تقليص حجم الفريق لا علاقة له بتوسّع النطاق.

هذا يرتبط مباشرة بتحدي "المتطلبات تتغير" اللي شرحته محاضرة Requirements — بدون عملية `Requirements Management` منضبطة (تتبع، روابط، تقييم أثر كل تغيير)، يتحول التغيّر الطبيعي في المتطلبات إلى `Scope Creep` غير مُدار.

**المصدر:** [نمط 2023-2024]
### السؤال 30 (سهل)
What does the term 'stakeholder' refer to in project management?
أ) A person who writes the project code
ب) Anyone who has an interest in the project's outcome
ج) The project manager only
د) The person who provides project funding
**الإجابة الصحيحة: ب**
**التعليل:**
`Stakeholder` حسب محاضرة Requirements هو "أي شخص أو جهة متأثرة أو مؤثرة بالمشروع" — تعريف واسع يشمل العملاء والمستخدمين والمطورين والإدارة وغيرهم، وليس مقتصراً على دور واحد.

أ) كاتب الكود دور واحد فقط ضمن أصحاب المصلحة (مطوّر).
ج) مدير المشروع دور واحد فقط أيضاً، وليس التعريف الكامل.
د) ممول المشروع مثال واحد على `stakeholder`، لكن التعريف أوسع بكثير من هذا الدور فقط.

المحاضرة عدّدت خمس فئات مستخدمين لوثيقة `SRS` وحدها (عملاء، مدراء، مهندسو نظام، مهندسو اختبار، مهندسو صيانة) — وكلهم أمثلة على Stakeholders بمعناها الواسع.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 31 (متوسط)
Which of the following best describes "functional requirements" in an `SRS`?
أ) Requirements that specify how the system should perform under specific conditions.
ب) Requirements that outline the system's performance metrics and scalability.
ج) Requirements related to the user interface design and usability.
د) Requirements that define what the system should do, including actions and services it must provide.
**الإجابة الصحيحة: د**
**التعليل:**
المحاضرة عرّفت `Functional Requirements` بأنها تصف "الوظائف والخدمات الأساسية للنظام" — أي "ماذا" يفعل النظام، مطابق تماماً للخيار d.

أ) "كيف يؤدي تحت ظروف معينة" أقرب لتعريف `Non-functional Requirements` (قيود الأداء).
ب) مقاييس الأداء وقابلية التوسع من فئة `Non-functional Requirements`، لا Functional.
ج) تصميم واجهة المستخدم قد يتضمن جانبين وظيفي وغير وظيفي، لكنه ليس التعريف العام لـ `Functional Requirements`.

المحاضرة فرّقت بوضوح: الوظيفي يجاوب "شنو النظام يسوي؟"، وغير الوظيفي يجاوب "كيف يسويه بجودة معينة؟" — وهذا الفرق العملي هو جوهر السؤال.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 32 (سهل)
In an `SRS`, what does "non-functional requirements" refer to?
أ) Requirements that are not related to user interactions.
ب) Requirements that describe how the system performs its functions, such as performance, security, and usability.
ج) Requirements that are optional and can be excluded from the final product.
د) Requirements that are only applicable to hardware components of the system.
**الإجابة الصحيحة: ب**
**التعليل:**
`Non-functional Requirements` حسب المحاضرة هي قيود والتزامات تصف "كيف" يؤدي النظام وظائفه بجودة معينة — تشمل الأمان، السلامة، التوافر، سهولة الاستخدام، وقابلية النقل، وهذا مطابق تماماً للخيار b.

أ) قد تكون مرتبطة أو غير مرتبطة بتفاعل المستخدم، هذا ليس الفيصل الحقيقي بينها وبين الوظيفية.
ج) "اختيارية ويمكن استبعادها" خطأ جوهري — `Non-functional Requirements` إلزامية تماماً مثل Functional، فقط من نوع مختلف.
د) قصرها على مكونات الهاردوير فقط خطأ — تشمل أيضاً السوفتوير والأمان وسهولة الاستخدام.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 33 (متوسط)
What is "traceability" in the context of an `SRS`?
أ) The ability to track changes made to the codebase throughout development.
ب) The process of documenting test cases based on requirements.
ج) The method used to ensure that all requirements are met during testing.
د) The ability to link requirements back to their source and forward to their implementation in design or code.
**الإجابة الصحيحة: د**
**التعليل:**
`Traceability` حسب مبادئ إدارة المتطلبات اللي شرحتها المحاضرة تعني القدرة على ربط كل متطلب بمصدره الأصلي (لماذا وُجد) وبتنفيذه لاحقاً في التصميم أو الكود — لتتبع كل متطلب عبر دورة حياته الكاملة.

أ) تتبع تغييرات الكود عام جداً وأقرب لـ `Configuration Management` وليس `Traceability` بمعناها الدقيق في RE.
ب) توثيق حالات اختبار مبنية على المتطلبات نشاط منفصل (رغم ارتباطه بـ `Traceability` عملياً).
ج) التأكد من تحقق كل المتطلبات أثناء الاختبار أقرب لـ `Validation`، لا تعريف `Traceability` نفسه.

المحاضرة ذكرت إدارة المتطلبات كعملية تشمل ثلاث مهام: تتبع كل متطلب فردي، الحفاظ على روابط بين المتطلبات المترابطة، وتقييم أثر أي تغيير مقترح — وهذا بالضبط جوهر `Traceability`.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 34 (سهل)
Which technique is commonly used for gathering requirements during the `SRS` development process?
أ) Code reviews
ب) Prototyping
ج) Performance testing
د) Version control
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة ذكرت `Prototyping` صراحة كإحدى تقنيات فهم المشكلة الأربعة في مرحلة الاستخراج (`Elicitation`): "مقابلات، استبيانات، ملاحظة، ونماذج أولية" — وهي أيضاً تقنية `Validation` فعّالة لكشف الغموض.

أ) مراجعات الكود نشاط لاحق يخص التنفيذ، لا جمع المتطلبات.
ج) اختبار الأداء نشاط اختبار لاحق تماماً، لا علاقة له بجمع المتطلبات.
د) التحكم بالإصدارات (Version Control) موضوع `Configuration Management`، لا علاقة له بجمع المتطلبات.

المحاضرة أكدت أن النمذجة الأولية (`Prototyping`) "طريقة ممتازة لكشف غموض زي مشكلة search" — وهذا يجعلها أداة قوية لكل من الجمع والتحقق من المتطلبات.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 35 (سهل)
What is meant by "requirements volatility"?
أ) The tendency for requirements to change over time due to evolving stakeholder needs or market conditions.
ب) The stability of requirements throughout the software development lifecycle.
ج) The ability to implement requirements without significant rework.
د) The process of validating requirements against user expectations.
**الإجابة الصحيحة: أ**
**التعليل:**
المحاضرة شرحت بالتفصيل ليش المتطلبات تتغير دائماً: الأنظمة تُطوَّر لمعالجة مشاكل لا يمكن تعريفها كاملاً من الأساس، البيئة التقنية والتجارية تتغير، وأصحاب المصلحة المختلفون عندهم أولويات متعارضة — وهذا التقلب المستمر هو بالضبط "Requirements Volatility".

ب) "الاستقرار" عكس المعنى المقصود تماماً.
ج) القدرة على التنفيذ بدون إعادة عمل موضوع مختلف (أقرب لجودة التصميم)، لا تقلب المتطلبات.
د) عملية التحقق (`Validation`) نشاط منفصل تماماً عن مفهوم التقلب نفسه.

هذا يربط مباشرة بالأسباب الثلاثة اللي عدّدتها المحاضرة لتغيّر المتطلبات دائماً — وأهمها أن المتطلبات محكوم عليها تكون ناقصة في البداية حتماً.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 36 (متوسط)
Which of the following best describes "requirements elicitation"?
أ) The process of documenting requirements after they have been gathered from stakeholders.
ب) The process of defining how requirements will be verified and validated during testing.
ج) The process of discovering and collecting stakeholder needs and expectations for the software product.
د) The process of prioritizing requirements based on business value and feasibility.
**الإجابة الصحيحة: ج**
**التعليل:**
`Elicitation` حسب المحاضرة هو أول أنشطة هندسة المتطلبات الأربعة، ويُعرف أيضاً "جمع المتطلبات" — يُحدَّد فيه المتطلبات بمساعدة العميل والأنظمة الموجودة، أي اكتشاف وجمع احتياجات وتوقعات أصحاب المصلحة.

أ) التوثيق بعد الجمع هو نشاط Documentation المنفصل، النشاط الثالث لا الأول.
ب) التحقق والتصديق أثناء الاختبار أقرب لـ `Validation`، النشاط الرابع.
د) ترتيب الأولويات جزء من `Analysis and Negotiation`، النشاط الثاني.

المحاضرة رتّبت الأنشطة الأربعة بدقة: `Elicitation` (جمع) → `Analysis and Negotiation` (تحليل وتفاوض) → `Documentation` (توثيق) → `Validation` (تحقق) — و`Elicitation` هو نقطة البداية الأولى دائماً.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 37 (سهل)
What is one potential consequence of poorly defined requirements in an `SRS`?
أ) Increased stakeholder satisfaction due to flexibility in development.
ب) Higher likelihood of project success due to clear guidelines for developers.
ج) Increased project costs due to rework, scope creep, and miscommunication among stakeholders.
د) Faster development cycles due to reduced documentation overhead.
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة أكدت أن تكلفة تصحيح خطأ في المتطلبات تكبر بشكل مخيف كل ما تأخر اكتشافها (تصحيحه في مرحلة الصيانة يكلّف 100 ضعف تصحيحه أثناء جمع المتطلبات) — والمتطلبات المُعرَّفة بشكل سيء تؤدي مباشرة لإعادة عمل، توسّع نطاق غير مُدار، وسوء فهم بين الأطراف.

أ) رضا أصحاب المصلحة عكس المتوقع تماماً — الغموض يسبب إحباطاً لا رضا.
ب) احتمال نجاح أعلى عكس الحقيقة تماماً — متطلبات سيئة تعني احتمال فشل أعلى.
د) دورات تطوير أسرع عكس الحقيقة — سوء التعريف يبطئ التطوير بسبب إعادة العمل المتكررة.

المحاضرة ربطت صراحة تحليل المشاريع الفاشلة أو المتجاوزة للميزانية بفشل فهم وإدارة المتطلبات كسبب رئيسي متكرر — لا مشاكل لغة برمجة أو أداة معيّنة.

## المحاضرة 4: Design and Implementation (التصميم والتنفيذ)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 38 (متوسط)
What is the purpose of a use case in requirements engineering?
أ) To define the system architecture
ب) To specify the implementation details
ج) To describe the interactions between actors and the system
د) To document the project management plan
**الإجابة الصحيحة: ج**
**التعليل:**
`Use case` هو جزء من الـ `Interaction Model` — نموذج ديناميكي يوضح كيف يتفاعل النظام مع بيئته الخارجية (actors)، حيث كل `use case` يمثّل تفاعلاً محدداً موثَّقاً بجدول فيه: النظام، الفاعلين، الحافز، والاستجابة.

أ) System architecture توثّقه المحاضرة عبر الخطوة الثانية من `OOD` (التصميم المعماري)، وهي منفصلة عن `use case`.
ب) تفاصيل التنفيذ (implementation details) عكس فكرة `use case` تماماً — `use case` يصف "ماذا" يحدث لا "كيف" يُنفَّذ.
د) خطة إدارة المشروع موضوع مختلف كلياً (محاضرة إدارة المشاريع).

هذا مرتبط مباشرة بالخطوة الأولى من خطوات `OOD` الخمس: فهم سياق النظام وتفاعلاته الخارجية عبر نموذجي System Context و`Interaction Model`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 39 (سهل)
Which reuse approach involves assembling software components from various sources to create a new system?
أ) Object-oriented reuse
ب) Application frameworks
ج) Component-based reuse
د) Customization reuse
**الإجابة الصحيحة: ج**
**التعليل:**
`Component-based reuse` هو أحد مستويات إعادة الاستخدام الأربعة (Abstraction, Object, Component, System) اللي شرحتها المحاضرة، وفيه يتم تجميع مكوّنات جاهزة من مصادر مختلفة (قد تحتاج بعض الكود الإضافي لدمجها) لبناء نظام جديد.

أ) `Object-oriented reuse` يعتمد على مكتبات جاهزة (زي `JUnit`) بدون كتابة كود إضافي غالباً.
ب) `Application frameworks` هي هياكل عامة قابلة للتخصيص، مو مجرد تجميع مكونات من مصادر متعددة.
د) `Customization reuse` ليس أحد المستويات الأربعة المذكورة في المحاضرة بهذا الاسم.

المحاضرة رتّبت المستويات الأربعة من الأبسط للأعقد: Abstraction (بدون كود) ← Object (بدون كود، مكتبات) ← Component (يحتاج شوي كود للدمج) ← System (تطبيق كامل جاهز يحتاج تهيئة فقط).

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 40 (سهل)
Which modeling technique is used to represent the dynamic behavior of a system over time?
أ) Use case diagram
ب) Class diagram
ج) Activity diagram
د) Sequence diagram
**الإجابة الصحيحة: د**
**التعليل:**
`Sequence diagram` هو من النماذج الديناميكية (Dynamic Models) اللي شرحتها المحاضرة، ويوضح تحديداً ترتيب طلبات الخدمة بين الكائنات عبر الزمن — الكائنات أفقياً والزمن يمشي عمودياً، وهذا يطابق "dynamic behavior over time" حرفياً.

أ) `Use case diagram` جزء من `Interaction Model` لكنه يوضح "من يتفاعل مع ماذا"، مو تسلسل زمني دقيق.
ب) `Class diagram` نموذج هيكلي/ساكن (structural/static) يوضح البنية الثابتة، عكس الديناميكية المطلوبة بالسؤال.
ج) `Activity diagram` يوضح تدفق الأنشطة، لكن المحاضرة تحديداً استخدمت Sequence وState لتمثيل "التفاعلات وتغييرات الحالة بمرور الزمن".

المحاضرة قسّمت نماذج `UML` بوضوح لنوعين: Structural/Static (زي `class diagram`) وDynamic (زي `sequence diagram` و`state diagram`) — وSequence هو الأنسب لوصف "مرور الزمن" تحديداً.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 41 (سهل)
Which software reuse approach involves adapting existing software components to fit new requirements without modifying their core functionality?
أ) Object-oriented reuse
ب) Application frameworks
ج) Component-based reuse
د) Wrapping reuse
**الإجابة الصحيحة: د**
**التعليل:**
`Wrapping` (التغليف) هو أسلوب يُبقي الوظيفة الأساسية (core functionality) للمكوّن كما هي بدون أي تعديل داخلي، ويكتفي بإضافة طبقة واجهة خارجية (wrapper) تجعله يتوافق مع متطلبات جديدة — وهذا مطابق تماماً لنص السؤال "without modifying their core functionality".

أ) `Object-oriented reuse` يعتمد على مكتبات جاهزة تُستخدم كما هي، مو "تكييف" مكوّن موجود.
ب) `Application frameworks` تُخصَّص عبر نقاط توسعة محددة سلفاً من مصمم الـ framework، مو تكييفاً حراً لمكوّن موجود.
ج) `Component-based reuse` يخص تجميع مكونات، وليس التكييف تحديداً.

ملاحظة: "`Wrapping`" لم يُذكر بالاسم صراحة ضمن مستويات إعادة الاستخدام الأربعة (Abstraction/Object/Component/System) في المحاضرة — الإجابة معتمدة على معرفة عامة قياسية تكمّل موضوع إعادة الاستخدام الذي غطّته المحاضرة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 42 (سهل)
Which software reuse approach involves creating software components that can be easily adapted and extended for different applications?
أ) Object-oriented reuse
ب) Application frameworks
ج) Component-based reuse
د) Customization reuse
**الإجابة الصحيحة: ب**
**التعليل:**
`Application frameworks` هي هياكل عامة مصمَّمة خصيصاً لتكون قابلة للتكييف والتوسعة (adaptable and extensible) عبر نقاط توسعة محددة، لتُستخدم كأساس لعدة تطبيقات مختلفة.

أ) `Object-oriented reuse` يخص استخدام مكتبات جاهزة كما هي، مو بناء مكونات مصمَّمة للتوسعة أصلاً.
ج) `Component-based reuse` يخص تجميع مكونات موجودة، وليس بالضرورة "مصمَّمة للتكيّف والتوسعة".
د) `Customization reuse` ليس أحد المستويات الأربعة الرسمية (Abstraction/Object/Component/System) المذكورة في المحاضرة.

`Application Frameworks` هي أحد مستويات إعادة الاستخدام الأربعة، وتتميّز عن باقي المستويات بأنها مصمَّمة خصيصاً لتوسّع وتُخصَّص من قِبل المطوّرين الذين يستخدمونها.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 43 (متوسط)
What is the primary purpose of a software configuration management system?
أ) To track project progress
ب) To identify and fix defects in the software
ج) To manage changes to software artifacts throughout the development process
د) To estimate project costs
**الإجابة الصحيحة: ج**
**التعليل:**
`Configuration Management` هي عملية تتبع النسخ المختلفة من كل مكوّن عبر عملية التطوير، وتتكوّن من ثلاثة أنشطة أساسية شرحتها المحاضرة: إدارة النسخ (`Version Management`)، دمج النظام (`System Integration`)، وتتبع المشاكل (`Problem Tracking`) — كلها تصب في إدارة التغييرات على مخرجات المشروع.

أ) تتبع تقدم المشروع دور `Project Plan` العام، مو `Configuration Management` تحديداً.
ب) تحديد وإصلاح الأخطاء دور الاختبار وDebugging، لا علاقة مباشرة بإدارة النسخ.
د) تقدير التكلفة موضوع منفصل تماماً (محاضرة إدارة المشاريع).

المحاضرة ذكرت أدوات عملية لهذا الغرض مثل `ClearCase` و`Subversion` و`BugZilla` — كلها أدوات تخدم هدفاً واحداً: منع دمج نسخ خاطئة ببعضها أثناء التطوير المتوازي.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 44 (متوسط)
What is the purpose of a use case diagram in software modeling?
أ) To show the interaction between objects in the system
ب) To visualize the flow of activities in a use case
ج) To represent the relationships between classes
د) To depict the sequence of messages exchanged between objects
**الإجابة الصحيحة: TODO**
**التعليل:**
هذا السؤال فيه مشكلة حقيقية في صياغة الخيارات: ولا خيار من الأربعة يصف بدقة الوظيفة الفعلية لـ `Use Case Diagram` كما شرحتها المحاضرة (توضيح تفاعل النظام مع الفاعلين الخارجيين actors عبر use cases بيضاوية الشكل، مو تفاصيل رسائل أو تدفق أنشطة داخلية). كل خيار من الأربعة يصف فعلياً diagram مختلف تماماً:

أ) "التفاعل بين الكائنات" أقرب لوصف Sequence/Collaboration diagram.
ب) "تدفق الأنشطة داخل `use case` واحد" هو تحديداً وصف `Activity Diagram`، مو `Use Case Diagram` نفسه.
ج) "العلاقات بين الفئات" هو تعريف `Class Diagram` بالضبط.
د) "تسلسل الرسائل بين الكائنات" هو تعريف `Sequence Diagram` بالضبط.

بما إن ولا خيار يطابق التعريف الصحيح لـ `Use Case Diagram` (توثيق تفاعل actors مع النظام عبر use cases)، فالسؤال يبدو فيه خطأ في الاستخراج أو صياغة الخيارات الأصلية، وأُترك TODO للمراجعة اليدوية بدل تخمين إجابة غير دقيقة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 45 (سهل)
What is the main advantage of reusing software components?
أ) Reduced development time and cost
ب) Improved software quality
ج) Enhanced software maintainability
د) Increased software performance
**الإجابة الصحيحة: أ**
**التعليل:**
المحاضرة عدّدت فوائد إعادة الاستخدام: سرعة، تقليل مخاطر، تكلفة أقل، وموثوقية أعلى — لكن الفائدة "الرئيسية" الأكثر تكراراً في الأدبيات والأكثر مباشرة هي توفير الوقت والتكلفة، لأنك لا تكتب من الصفر.

ب) تحسين الجودة فائدة محتملة لكنها غير مضمونة دائماً (المكوّن الجاهز قد يكون أقل جودة من كود مخصَّص).
ج) تحسين قابلية الصيانة فائدة جانبية، مو الميزة الرئيسية المباشرة.
د) تحسين الأداء غير مضمون إطلاقاً — أحياناً المكوّنات الجاهزة أبطأ من كود مخصَّص.

المحاضرة حذّرت أيضاً من فهم خاطئ شائع: إعادة الاستخدام ليست "مجانية" — فيها تكاليف حقيقية (بحث، تقييم، تكييف، دمج) يجب موازنتها مقابل الفائدة الأساسية في الوقت والتكلفة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 46 (متوسط)
What is the main purpose of a class diagram in software modeling?
أ) To illustrate the behavior of individual objects
ب) To represent the flow of activities in a use case
ج) To depict the static structure of a system
د) To show the sequence of messages exchanged between objects
**الإجابة الصحيحة: ج**
**التعليل:**
`Class Diagram` هو أهم مثال على النماذج الهيكلية/الساكنة (Structural/Static Models) اللي شرحتها المحاضرة — يوضح الكائنات والعلاقات بينها كبنية ثابتة، بعكس النماذج الديناميكية التي تصف التغيير بمرور الزمن.

أ) سلوك الكائنات الفردية أقرب لوصف `State Diagram` (ديناميكي).
ب) تدفق أنشطة `use case` وصف `Activity Diagram`، مو `Class Diagram`.
د) تسلسل الرسائل وصف `Sequence Diagram` (ديناميكي)، مو `Class Diagram` (ساكن).

المحاضرة قسّمت `UML` بوضوح لنموذجين: Structural/Static (البنية الثابتة، مثالها `Class Diagram`) وDynamic (التفاعلات وتغييرات الحالة، مثالها Sequence وState) — و`Class Diagram` دائماً يقع في الفئة الأولى.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 47 (سهل)
Which software reuse approach involves modifying existing software components to meet specific requirements?
أ) Object-oriented reuse
ب) Application frameworks
ج) Component-based reuse
د) Customization reuse
**الإجابة الصحيحة: د**
**التعليل:**
"`Customization`" يعني حرفياً تعديل مكوّن موجود ليلائم متطلبات محددة (بعكس `Wrapping` الذي يُبقي الكود الداخلي كما هو تماماً) — وهذا مطابق لنص السؤال "modifying existing components".

أ) `Object-oriented reuse` يستخدم المكتبات كما هي بدون تعديل داخلي.
ب) `Application frameworks` تُخصَّص عبر نقاط توسعة محددة سلفاً من المصمم، لا تعديل حر للكود الداخلي.
ج) `Component-based reuse` يخص التجميع من مصادر متعددة، وليس التعديل تحديداً.

ملاحظة: "`Customization reuse`" لم يُذكر بالاسم صراحة ضمن مستويات إعادة الاستخدام الأربعة الرسمية في المحاضرة (Abstraction/Object/Component/System) — الإجابة معتمدة على معرفة عامة قياسية تكمّل الموضوع، وتميّز بين `Customization` (تعديل داخلي) و`Wrapping` (بدون تعديل داخلي، سؤال آخر بنفس الدورة).

**المصدر:** [نمط 2023-2024]
### السؤال 48 (سهل)
Maintenance may involve:
أ) only additional coding and testing.
ب) only additional analysis and design.
ج) only additional design, coding and testing.
د) any of the development phases, except analysis.
ه) any of the development phases.
**الإجابة الصحيحة: ه**
**التعليل:**
الصيانة قد تتطلب الرجوع لأي مرحلة من مراحل التطوير — بما فيها إعادة تحليل المتطلبات نفسها لو تغيّرت احتياجات المستخدم، وليس فقط التصميم والكود والاختبار.

a وb وc كلها تحصر الصيانة في مجموعة فرعية محددة من المراحل، بينما الصيانة الحقيقية قد تحتاج أي مرحلة حسب طبيعة التغيير المطلوب.
d تستثني التحليل تحديداً، وهذا خاطئ — أحياناً السبب الجذري لمشكلة الصيانة هو سوء فهم أصلي بالمتطلبات يحتاج إعادة تحليل.

هذا يتماشى مع مبدأ Software Evolution اللي ذكرته المحاضرة الأولى كأحد أنشطة `Software Process` الأربعة: تعديل البرمجية لمواكبة المتطلبات المتغيرة قد يمس أي جزء من العملية بأكملها.

**المصدر:** [نمط 2023-2024]
### السؤال 49 (سهل)
Reuse-based software engineering is:
أ) software engineering strategy where the development process is geared to reusing existing software.
ب) an approach to development that tries to maximize the reuse of existing software.
ج) All of the above
د) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
الخياران a وb يصفان نفس الفكرة بصياغتين متقاربتين جداً — استراتيجية تطوير موجَّهة نحو إعادة استخدام البرمجيات الموجودة قدر الإمكان — وكلاهما صحيح ومتوافق مع ما شرحته المحاضرة عن مستويات إعادة الاستخدام الأربعة (Abstraction, Object, Component, System).

د) استبعاد كل الخيارات غير منطقي بما أن a وb صحيحان فعلياً.

المحاضرة أكدت أن أغلب البرمجيات الحديثة تُبنى بإعادة استخدام مكونات موجودة، لأن الكتابة من الصفر صارت غير عملية اقتصادياً — وهذا جوهر Reuse-based Software Engineering بكلا الصياغتين.

**المصدر:** [نمط 2023-2024]
### السؤال 50 (سهل)
_______ is a benefit of software reusing:
أ) Increased dependability
ب) Reduced process risk
ج) Standards compliance
د) Accelerated development
ه) All of the above
**الإجابة الصحيحة: ه**
**التعليل:**
المحاضرة عدّدت فوائد إعادة الاستخدام: سرعة (Accelerated development)، تقليل مخاطر (Reduced process risk)، تكلفة أقل، وموثوقية أعلى (Increased dependability) — وStandards compliance فائدة إضافية معروفة (مكونات جاهزة غالباً مطابقة لمعايير الصناعة أصلاً).

a وb وc وd كلها فوائد حقيقية جزئية مذكورة أو ضمنية في شرح المحاضرة عن Reuse.

كل هذه الفوائد مجتمعة هي بالضبط ما دفع الصناعة للانتقال من "الكتابة من الصفر" (شائعة من الستينات للتسعينات) إلى الاعتماد المكثف على إعادة الاستخدام كما شرحت المحاضرة.

**المصدر:** [نمط 2023-2024]
### السؤال 51 (سهل)
_______ is a problem of software reusing:
أ) Increased maintenance costs
ب) Lack of tool support
ج) Finding, understanding, and adapting reusable components
د) A & C
ه) A & B & C
**الإجابة الصحيحة: ه**
**التعليل:**
المحاضرة ذكرت صراحة تكاليف حقيقية لإعادة الاستخدام: وقت البحث والتقييم والاختبار (يطابق c)، تكلفة التكييف والدمج (يطابق c أيضاً)، وأشارت ضمناً لصعوبات دعم الأدوات وزيادة تكلفة الصيانة كتحديات عملية معروفة في أدبيات إعادة الاستخدام.

a وb وc كلها مشاكل حقيقية جزئية مرتبطة بإعادة الاستخدام.
d يستبعد b رغم أنها مشكلة حقيقية مذكورة أيضاً.

المحاضرة حذّرت من فهم خاطئ شائع: إعادة الاستخدام ليست "مجانية دائماً" — فيها تكاليف حقيقية (بحث، تقييم، تكييف، دمج) يجب موازنتها، وهذا يطابق مجموع المشاكل الثلاثة المذكورة.

**المصدر:** [نمط 2023-2024]
### السؤال 52 (سهل)
Which of the following approaches support reusing?
أ) ERP systems
ب) Program libraries
ج) COTS product reuse
د) B & C
ه) A & B & C
**الإجابة الصحيحة: ه**
**التعليل:**
كل الثلاثة أمثلة فعلية على إعادة استخدام حسب مستويات المحاضرة: مكتبات البرمجة (Program libraries) تطابق مستوى "Object" (مكتبات جاهزة زي `JUnit`)، منتجات COTS (Commercial Off-The-Shelf) تطابق مستوى "System" (تطبيق كامل جاهز يحتاج تهيئة فقط)، وأنظمة ERP مثال تطبيقي على نفس مستوى System.

d يستبعد ERP رغم أنها مثال حقيقي وشائع جداً على System-level reuse.

المحاضرة ذكرت "تكلفة الشراء (عالية خصوصاً للمنتجات الجاهزة COTS)" كأحد تكاليف إعادة الاستخدام على مستوى النظام — وERP وCOTS كلاهما من نفس الفئة (تطبيقات جاهزة كاملة)، بينما Program Libraries أبسط (مستوى Object).

**المصدر:** [نمط 2023-2024]
### السؤال 53 (سهل)
Frameworks are language specific:
أ) True
ب) False
**الإجابة الصحيحة: أ**
**التعليل:**
الأطر البرمجية (`Application Frameworks`) مبنية عادة داخل بيئة لغة برمجة محددة وتعتمد على آلياتها الخاصة (زي Spring لجافا أو Django لبايثون أو .NET لـC#) — فهي بطبيعتها مرتبطة بلغة/منصة محددة، ولا يمكن استخدام نفس الـ framework مباشرة عبر لغات مختلفة تماماً بدون إعادة كتابة كبيرة.

هذا يتماشى مع تصنيف المحاضرة لمستوى "`Application Frameworks`" كأحد مستويات إعادة الاستخدام الأربعة — وبما أنها تعتمد على آليات وراثة وتوسعة (inheritance/hooks) خاصة بلغة برمجة معيّنة، فهي مرتبطة عملياً بتلك اللغة أو المنصة تحديداً.

ملاحظة: هذه النقطة التفصيلية (اعتماد الـ framework على لغة محددة) لم تُشرح صراحة بنفس هذه الصياغة في المحاضرة، لكنها استنتاج مباشر ومنطقي من طبيعة الـ frameworks كأدوات مبنية داخل بيئة برمجية محددة.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 54 (متوسط)
What is the primary purpose of version control systems like Git?
أ) To manage project budgets and timelines.
ب) To automatically generate documentation for the codebase.
ج) To optimize code performance and reduce memory usage.
د) To track changes to code, enable collaboration, and facilitate reverting to previous states.
**الإجابة الصحيحة: د**
**التعليل:**
أنظمة التحكم بالإصدار جزء من نشاط "إدارة النسخ" (`Version Management`) اللي شرحته المحاضرة ضمن `Configuration Management`: تتبع النسخ المختلفة من كل مكوّن، تمكين العمل الجماعي المتوازي دون تضارب، والقدرة على الرجوع لنسخة سابقة عند الحاجة.

أ) إدارة الميزانية والجدول الزمني دور `Project Plan`، لا أدوات التحكم بالإصدار.
ب) توليد التوثيق تلقائياً ليس الوظيفة الأساسية لأدوات زي Git (رغم وجود أدوات مساعدة منفصلة لذلك).
ج) تحسين أداء الكود واستهلاك الذاكرة لا علاقة له بتتبع الإصدارات.

المحاضرة ذكرت أدوات `ClearCase` و`Subversion` كأمثلة على أدوات إدارة النسخ ضمن `Configuration Management` — وGit هو الأداة الأكثر شيوعاً اليوم لنفس الغرض بالضبط.

## المحاضرة 5: Software Testing (اختبار البرمجيات)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 55 (سهل)
Which testing technique involves executing the entire system with realistic data in a simulated environment?
أ) Unit testing
ب) Regression testing
ج) System testing
د) Acceptance testing
**الإجابة الصحيحة: ج**
**التعليل:**
`System Testing` هو اختبار النظام الكامل بكل مكوناته مجتمعة، وهو آخر مستوى في تدرّج `Development Testing` (بعد Unit ثم Component)، ويُنفَّذ عادة ببيانات واقعية (realistic data) في بيئة محاكاة قبل الإصدار الفعلي.

أ) `Unit testing` يختبر وحدة واحدة بمعزل عن الباقي، مو النظام كامل.
ب) `Regression testing` يعيد تشغيل اختبارات سابقة بعد تعديل الكود، مو تنفيذ النظام كامل ببيانات واقعية.
د) `Acceptance testing` هو نوع خاص من `User Testing` يقوم به العميل نفسه، وليس بالضرورة "بيانات واقعية في بيئة محاكاة".

هذا يربط مباشرة بتدرّج مستويات `Development Testing` الثلاثة اللي شرحتها المحاضرة: Unit → Component → System، حيث كل مستوى أوسع من اللي قبله ويعتمد على نجاحه.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 56 (سهل)
Which software testing technique involves testing a system's ability to handle maximum expected load?
أ) Stress testing
ب) Usability testing
ج) Regression testing
د) Integration testing
**الإجابة الصحيحة: أ**
**التعليل:**
`Stress testing` يفحص سلوك النظام تحت أقصى حِمل متوقّع (maximum expected load) أو حتى أعلى منه، للتأكد أنه لا ينهار عند الضغط الشديد.

ب) `Usability` testing يقيس سهولة الاستخدام، لا علاقة له بالحِمل.
ج) `Regression testing` يتأكد أن تعديلاً جديداً لم يكسر وظيفة موجودة، مو اختبار الحِمل.
د) `Integration testing` يفحص تفاعل المكونات ببعضها، مو قدرة تحمّل الحمل.

نوع الاختبار هذا امتداد طبيعي لفكرة `System Testing` اللي شرحتها المحاضرة — النظام الكامل يُختبر تحت ظروف واقعية، والحمل الأقصى واحد من أهم هذه الظروف.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 57 (متوسط)
What is the primary purpose of software testing?
أ) To ensure the software meets customer requirements
ب) To improve the performance of the software
ج) To identify and fix defects in the software
د) To estimate the effort required for software development
**الإجابة الصحيحة: أ**
**التعليل:**
الاختبار في جوهره يهدف للتأكد من أن النظام يحقق ما يحتاجه العميل فعلاً — وهذا الهدف يتقاطع مع مفهوم `Validation` ("هل نبني المنتج الصحيح؟") الذي شرحته المحاضرة كأحد الهدفين الأساسيين وراء أي عملية اختبار.

ب) تحسين الأداء ليس هدف الاختبار — الاختبار يكتشف مشاكل الأداء، لا يحسّنه مباشرة.
ج) "تحديد وإصلاح" غير دقيقة تماماً — الاختبار يكتشف (identify) الأخطاء، لكن الإصلاح نفسه هو Debugging، وهو نشاط منفصل يأتي بعد الاختبار.
د) تقدير الجهد يخص إدارة المشروع، مو الاختبار.

المحاضرة تفرّق بوضوح بين `Validation` ("نبني الصحيح؟") و`Verification` ("نبنيه صح؟") — والاختبار أداة رئيسية لتحقيق كليهما، لكن هدفه النهائي الأعمق هو التأكد من رضا العميل الحقيقي.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 58 (سهل)
Which of the following is NOT a characteristic of a good software testing technique?
أ) High fault detection rate
ب) Ability to uncover complex defects
ج) Low time and cost requirements
د) High execution speed
**الإجابة الصحيحة: د**
**التعليل:**
سرعة التنفيذ (execution speed) ليست معياراً جوهرياً يُعرّف "جودة" تقنية الاختبار — تقنية بطيئة لكنها تكتشف أخطاء حقيقية بفعالية تبقى تقنية جيدة، بينما السرعة وحدها بدون فعالية اكتشاف لا تعني شيئاً.

أ) معدل اكتشاف أخطاء عالٍ هو جوهر أي تقنية اختبار جيدة.
ب) القدرة على اكتشاف أخطاء معقدة معيار أساسي للفعالية.
ج) انخفاض الوقت والتكلفة معيار عملي مهم جداً لأي تقنية اختبار (لأن الاختبار مكلف أصلاً).

هذا يربط بمبدأ اختيار حالات اختبار فعّالة اللي شرحته المحاضرة: المعيار هو "هل تكشف أخطاء موجودة فعلاً؟" و"هل تُثبت أن المكوّن يعمل بشكل طبيعي صحيح؟" — مو سرعة التنفيذ بحد ذاتها.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 59 (سهل)
Which software testing technique involves executing specific test cases that are derived from the internal structure of the software?
أ) White-box testing
ب) Black-box testing
ج) Regression testing
د) Acceptance testing
**الإجابة الصحيحة: أ**
**التعليل:**
`White-box testing` يصمّم حالات الاختبار بناءً على معرفة البنية الداخلية للكود (المسارات، الشروط، الحلقات) — وهذا مطابق تماماً لعبارة "derived from the internal structure".

ب) `Black-box testing` عكسه تماماً — يصمَّم بناءً على المواصفات الخارجية فقط بدون أي معرفة بالكود الداخلي.
ج) `Regression testing` يعيد تشغيل اختبارات قديمة بعد تعديل، بغض النظر عن مصدر تصميمها الأصلي.
د) `Acceptance testing` يعتمد على متطلبات العميل، لا البنية الداخلية للكود.

هذا الفرق (`White-box` يعتمد الكود الداخلي مقابل `Black-box` يعتمد المواصفات الخارجية) هو أحد أكثر المفاهيم تكراراً في بنك الأسئلة كله، وشُرح بالتفصيل في محاضرة `JUnit` كذلك.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 60 (سهل)
Which testing technique focuses on evaluating the system's behavior under normal and peak load conditions?
أ) Stress testing
ب) Unit testing
ج) System testing
د) Acceptance testing
**الإجابة الصحيحة: أ**
**التعليل:**
`Stress testing` تحديداً هي التي تقيّم سلوك النظام تحت ظروف الحِمل العادي والحِمل الأقصى (peak load)، بهدف كشف نقاط الانهيار قبل الاستخدام الفعلي.

ب) `Unit testing` يختبر وحدة معزولة صغيرة، لا علاقة له بالحِمل.
ج) `System testing` أوسع من مجرد اختبار الحِمل — يشمل اختبار النظام كاملاً بجوانب متعددة.
د) `Acceptance testing` يخص قبول العميل للنظام، لا الحِمل تحديداً.

هذا تكرار لمفهوم سبق ذكره بصيغة مختلفة في سؤال آخر بنفس الدورة — يوضح كيف يمكن لنفس المفهوم أن يُصاغ بعدة طرق في بنك أسئلة واحد.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 61 (سهل)
Which testing technique focuses on executing the code with different inputs?
أ) White-box testing
ب) Black-box testing
ج) Integration testing
د) Regression testing
**الإجابة الصحيحة: أ**
**التعليل:**
`White-box testing` يصمَّم بناءً على معرفة الكود الداخلي، وحالاته تُبنى خصيصاً لتغطية مسارات تنفيذ (execution paths) مختلفة داخل الكود عبر مدخلات متنوعة تفعّل كل مسار.

ب) `Black-box testing` يعتمد المواصفات الخارجية بدون أي اعتبار لكيفية تنفيذ الكود داخلياً.
ج) `Integration testing` يركّز على تفاعل المكونات ببعضها، مو تنفيذ الكود بمدخلات متعددة تحديداً.
د) `Regression testing` يعيد تشغيل اختبارات قديمة بعد تعديل، بصرف النظر عن أصل تصميمها.

ملاحظة: هذا السؤال قريب الصياغة من سؤال سابق (test cases derived from internal structure) وبالإجابة نفسها — تكرار مقصود لتثبيت هذا الفرق الأساسي.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 62 (سهل)
Which testing technique focuses on testing the interactions between different components of a system?
أ) Integration testing
ب) Unit testing
ج) System testing
د) Acceptance testing
**الإجابة الصحيحة: أ**
**التعليل:**
`Integration testing` (المسمى `Component Testing` في تدرّج المحاضرة) يركّز تحديداً على اختبار مجموعة وحدات مترابطة تعمل معاً، أي التفاعل بينها — وهذا مطابق حرفياً لنص السؤال.

ب) `Unit testing` يختبر وحدة واحدة بمعزل تام عن الباقي، عكس فكرة "التفاعل بين مكونات".
ج) `System testing` أوسع من مجرد التفاعل بين مكونات — يشمل النظام الكامل بكل جوانبه.
د) `Acceptance testing` يخص قبول العميل النهائي للنظام، لا التفاعل الداخلي بين المكونات.

هذا يطابق المستوى الثاني من مستويات `Development Testing` الثلاثة: Unit (وحدة واحدة) → Component/Integration (مجموعة وحدات مترابطة) → System (النظام كامل).

**المصدر:** [نمط 2023-2024]
### السؤال 63 (سهل)
The testing phase of software development doesn't require:
أ) testing that the implementation compiles correctly.
ب) testing that the implementation matches the design.
ج) testing that the implementation matches the requirements.
د) testing that the components of the implementation work separately and together.
ه) testing that the implementation interacts correctly with the environment.
**الإجابة الصحيحة: أ**
**التعليل:**
التأكد من أن الكود "يترجم/يُصرَّف بنجاح" (compiles correctly) هو شرط أساسي سابق للاختبار نفسه — يحدث في مرحلة البناء (build/compilation) قبل أن يبدأ أي اختبار فعلي، وليس نشاط اختبار بحد ذاته.

ب) مطابقة التصميم جزء من `Verification` ("هل بنيناه صح؟") اللي شرحته المحاضرة.
ج) مطابقة المتطلبات جزء من `Validation` ("هل بنينا الصحيح؟").
د) اختبار المكونات منفردة ومجتمعة يطابق تماماً تدرّج Unit → Component/`Integration Testing`.
ه) التفاعل الصحيح مع البيئة جزء من `System Testing` و`User Testing`.

الفكرة الجوهرية: الاختبار يبدأ بعد أن يكون الكود قابلاً للتصريف والتشغيل أصلاً — التصريف الناجح شرط مسبق (prerequisite) للاختبار، لا هدفاً من أهدافه.

**المصدر:** [نمط 2023-2024]
### السؤال 64 (سهل)
Integration is important because:
أ) it ensures that the software is familiar to those who will use it.
ب) it ensures that the software is "friendly" to those who will use it.
ج) it ensures that the software works where it is to be used.
د) it ensures that the software replaces the existing system simultaneously everywhere it is to be used.
ه) it ensures that the software is not installed until the old system has been removed.
**الإجابة الصحيحة: ج**
**التعليل:**
هنا "Integration" يُقصد بها دمج ونشر النظام فعلياً في بيئته الحقيقية المستهدفة (target environment) — والتأكد أنه يعمل صح في تلك البيئة الفعلية بكل ظروفها هو الهدف الجوهري.

أ) و b) "الألفة" و"الود" تجاه المستخدمين تخص `Usability`، مو الدمج بالبيئة.
د) الاستبدال الفوري لكل نسخ النظام القديم دفعة واحدة ليس شرطاً لنجاح الدمج (غالباً يتم تدريجياً).
ه) عدم التركيب قبل إزالة النظام القديم تفصيل إجرائي، وليس السبب الجوهري وراء أهمية الدمج.

هذا يرتبط بمفهوم `Host-target Development` اللي شرحته محاضرة Design and Implementation — التأكد أن البرنامج يعمل صح على بيئة الـ target الفعلية هو جوهر عملية الدمج والنشر.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 65 (سهل)
What is the primary goal of software testing?
أ) To prove that the software is bug-free.
ب) To find as many defects as possible before the software is released.
ج) To ensure that the software meets all requirements.
د) To improve the code quality.
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة عرّفت الاختبار بأنه "تشغيل البرنامج ببيانات مُجهّزة بهدف اكتشاف الأخطاء قبل الاستخدام الفعلي" — واكتشاف أكبر عدد ممكن من الأخطاء مبكراً هو الهدف العملي المباشر.

أ) "إثبات خلوّ البرنامج من الأخطاء" هو بالضبط الفهم الخاطئ الذي حذّرت منه المحاضرة صراحة: "الاختبار يكشف وجود الأخطاء، ولا يثبت غيابها أبداً".
ج) ضمان تحقق كل المتطلبات أقرب لهدف `Validation` الأوسع، والاختبار أداة واحدة من أدواته، لا الهدف المباشر لعملية الاختبار نفسها.
د) تحسين جودة الكود نتيجة غير مباشرة (عبر اكتشاف مشاكل تُصلَح لاحقاً)، لا الهدف المباشر للاختبار نفسه.

هذا الفرق (اكتشاف الأخطاء وليس إثبات غيابها) هو أول وأهم نقطة أكدتها محاضرة Testing بأكملها.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 66 (سهل)
What is a test case in software testing?
أ) A step-by-step procedure to execute a test.
ب) A set of preconditions, inputs, execution steps, and expected results.
ج) A software tool used to automate testing.
د) A document outlining the testing strategy.
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة عرّفت `Test Case` بأنه "المواصفة الكاملة للاختبار: يشمل المدخل، والمخرج المتوقع، ووصف واضح لماذا نختبر هذا بالتحديد" — وهذا يطابق الخيار b الأكثر شمولاً واكتمالاً بين الخيارات.

أ) "خطوات تنفيذ فقط" وصف جزئي وناقص لـ `Test Case` الكامل.
ج) أداة أتمتة الاختبار (زي `JUnit`) شيء مختلف تماماً عن مفهوم `Test Case` نفسه.
د) وثيقة استراتيجية الاختبار أوسع بكثير من حالة اختبار واحدة، وتحتوي عادة عشرات حالات الاختبار.

المحاضرة فرّقت بوضوح بين `Test Case` (المواصفة الكاملة) و`Test Data` (المدخلات فقط) — وهذا سؤال يختبر فهم `Test Case` بمعناه الشامل.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 67 (سهل)
What is regression testing?
أ) Testing new features in the software.
ب) Retesting existing functionality after changes have been made to ensure that new defects have not been introduced.
ج) Testing the performance of the software under heavy load.
د) Testing the security of the software.
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة عرّفت `Regression Testing` تحديداً بأنه "إعادة تشغيل اختبارات سابقة كل مرة تُعدّل فيها الكود، للتأكد أن التعديل الجديد ما كسر ميزة كانت تعمل بشكل صحيح سابقاً" — مطابق حرفياً للخيار b.

أ) اختبار ميزات جديدة نشاط تطوير مختلف تماماً، مو Regression.
ج) اختبار الأداء تحت حمل ثقيل هو Stress/Load Testing، مو Regression.
د) اختبار الأمان موضوع منفصل تماماً.

المحاضرة أكدت أن الفائدة الكبرى للأتمتة تظهر بوضوح في `Regression Testing` تحديداً — لأن إعادة هذا يدوياً مئات المرات مستحيلة عملياً.

## المحاضرة 6: JUnit (اختبار الوحدة بلغة Java)

**المصدر:** [نمط 2023-2024]
### السؤال 68 (متوسط)
What is the purpose of using metrics like 'code coverage'?
أ) To determine the number of lines of code
ب) To measure how much of the code is tested by automated tests
ج) To track the number of defects over time
د) To assess the number of features implemented
**الإجابة الصحيحة: ب**
**التعليل:**
`Test Coverage` حسب محاضرة `JUnit` هو مقياس يجاوب سؤال "الاختبارات اللي كتبتها لمست كم بالمئة من الكود فعلياً؟" — مطابق تماماً لنص السؤال.

أ) عدد أسطر الكود مقياس `LOC` مختلف تماماً.
ج) تتبع الأخطاء عبر الزمن مقياس Defect Discovery Rate، مو `Code Coverage`.
د) عدد الميزات المنفَّذة لا علاقة له بنسبة تغطية الاختبار.

المحاضرة نبّهت لنقطة مهمة: تغطية 100% لا تعني خلوّ الكود من الأخطاء، فقط تعني أن كل سطر نُفِّذ أثناء الاختبار — وهذا فرق دقيق يجب تذكّره.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 69 (متوسط)
What is the purpose of measuring "`Code Coverage`" in software testing?
أ) To assess the overall quality of the code.
ب) To determine the percentage of code executed by automated tests.
ج) To identify potential security vulnerabilities.
د) To track the progress of the testing team.
**الإجابة الصحيحة: ب**
**التعليل:**
هذا هو التعريف الحرفي لـ `Test Coverage` كما شرحته محاضرة `JUnit`: "نسبة الكود اللي غطتها الاختبارات فعلياً" — لا أكثر ولا أقل.

أ) تقييم "الجودة الشاملة" أوسع بكثير من Coverage وحدها (المحاضرة نبّهت أن 100% تغطية لا تعني خلوّ الكود من الأخطاء).
ج) اكتشاف ثغرات أمنية موضوع اختبار مختلف تماماً (`Security` Testing).
د) تتبع تقدم فريق الاختبار مقياس إداري، لا تقني.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 70 (سهل)
Which of the following is an example of black-box testing?
أ) Testing individual methods in a class.
ب) Examining the code to identify potential errors.
ج) Testing the software based on its specifications without knowledge of the internal implementation.
د) Analyzing the memory usage of the application.
**الإجابة الصحيحة: ج**
**التعليل:**
`Black-box testing` يعتمد فقط على المواصفات الخارجية للنظام (المدخلات والمخرجات المتوقعة) بدون أي معرفة بكيفية تنفيذ الكود داخلياً — مطابق حرفياً لنص الخيار c.

أ) اختبار دوال فردية داخل فئة يفترض معرفة بالبنية الداخلية، أقرب لـ `White-box`/`Unit testing`.
ب) فحص الكود لتحديد أخطاء محتملة هو تعريف Inspections/Reviews، لا `Black-box testing`.
د) تحليل استهلاك الذاكرة أقرب لاختبار الأداء (`Performance` testing)، مو `Black-box` بحد ذاته.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 71 (متوسط)
What is `JUnit` primarily used for?
أ) End-to-end testing of web applications.
ب) Performance testing of servers.
ج) Unit testing of Java code.
د) Security testing of web services.
**الإجابة الصحيحة: ج**
**التعليل:**
`JUnit` مكتبة Java مخصصة تحديداً لكتابة اختبارات الوحدة (`Unit Testing`) الآلية، كما عرّفته المحاضرة من أول جملة فيها.

أ) اختبار end-to-end لتطبيقات الويب أدوات مختلفة (زي Selenium)، مو `JUnit`.
ب) اختبار أداء الخوادم موضوع منفصل تماماً.
د) اختبار أمان خدمات الويب موضوع منفصل تماماً.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 72 (سهل)
In `JUnit`, what does the `@Test` annotation signify?
أ) It indicates that a method is a setup method.
ب) It indicates that a method is a test method.
ج) It indicates that a method is a teardown method.
د) It indicates that a method is a helper method.
**الإجابة الصحيحة: ب**
**التعليل:**
`@Test` هو الـ annotation اللي يحدد أن هذه method هي اختبار فعلي سيُنفَّذ ويُقيَّم نجاحه/فشله — كما شرحته المحاضرة بوضوح تام.

أ) دوال التجهيز تستخدم `@Before` أو `@BeforeClass`، مو `@Test`.
ج) دوال التنظيف تستخدم `@After` أو `@AfterClass`، مو `@Test`.
د) لا يوجد annotation باسم "helper method" في `JUnit`.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 73 (سهل)
Which `JUnit` annotation is used to execute code before each test method in a class?
أ) @BeforeClass
ب) @BeforeAll
ج) @Before
د) @BeforeEach
**الإجابة الصحيحة: ج**
**التعليل:**
`@Before` هي الـ annotation اللي تُنفَّذ قبل كل test method (وليس مرة واحدة فقط للفئة كلها) — كما شرحته المحاضرة بالتفصيل ضمن `JUnit` 4.x.

أ) `@BeforeClass` تُنفَّذ مرة واحدة فقط لكل الفئة قبل بداية كل الاختبارات، لا قبل كل اختبار منفرد.
ب) و d) @BeforeAll و@BeforeEach أسماء `JUnit` 5، بينما محاضرة `JUnit` في هذه المادة استخدمت تحديداً `JUnit` 4.x اللي فيها `@Before` و`@BeforeClass`.

المحاضرة أكدت أن `@BeforeClass` و`@AfterClass` يجب أن تكونا static (لأنهما لمستوى الفئة كاملة)، بينما `@Before` و`@After` عاديتان (لأنهما تتكرران لكل اختبار منفرد) — وهذا الفرق جوهري في فهم دورة حياة الاختبار.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 74 (سهل)
What is an assertion in `JUnit`?
أ) A method that throws an exception if a test fails.
ب) A statement that checks whether a specific condition is true or false during a test.
ج) A comment that describes the purpose of a test.
د) A method that initializes the test environment.
**الإجابة الصحيحة: ب**
**التعليل:**
الـ Assert statements (`assertTrue`, `assertEquals`, `assertNull`...) هي بالضبط عبارات تتحقق من صحة شرط معيّن أثناء تنفيذ الاختبار، وتحدد نجاح أو فشل الاختبار بناءً على ذلك.

أ) رمي استثناء عند الفشل نتيجة تقنية لآلية عمل assert داخلياً، مو تعريفها المفاهيمي المباشر.
ج) التعليقات الوصفية شيء مختلف تماماً، لا علاقة له بالتحقق المنطقي.
د) تهيئة بيئة الاختبار دور `@Before`، مو الـ assertions.

المحاضرة شرحت أنواعاً متعددة من الـ assertions (`assertTrue`, `assertEquals`, `assertNull`/NotNull, `assertSame`/NotSame, fail) — وكلها أدوات "كيف نتحقق من صحة النتيجة" بعد تنفيذ الكود المختبَر.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 75 (متوسط)
What is the purpose of a test suite in `JUnit`?
أ) To group related test cases together for execution.
ب) To generate test reports.
ج) To define the overall testing strategy.
د) To automatically fix bugs in the code.
**الإجابة الصحيحة: أ**
**التعليل:**
المحاضرة عرّفت `Test Suite` بأنه "ملف خاص يجمع مرجعاً لعدة test classes ويشغّلها كلها معاً بتقرير نتائج موحد" — مطابق تماماً للخيار a.

ب) توليد التقارير نتيجة جانبية لتشغيل الـ Suite، مو غرضها الأساسي (التجميع والتشغيل الموحد).
ج) تحديد استراتيجية الاختبار الشاملة موضوع أوسع بكثير من مجرد تجميع ملفات اختبار.
د) إصلاح الأخطاء تلقائياً ليس من وظائف `JUnit` إطلاقاً.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 76 (سهل)
What is the difference between @BeforeAll and @BeforeEach in `JUnit` 5?
أ) @BeforeAll runs before every test case, while @BeforeEach runs only once before all test cases.
ب) @BeforeAll runs once before all test cases, while @BeforeEach runs before every test case.
ج) There is no difference; they are interchangeable.
د) @BeforeAll is used for integration tests, while @BeforeEach is used for unit tests.
**الإجابة الصحيحة: ب**
**التعليل:**
@BeforeAll (المكافئ لـ `@BeforeClass` في `JUnit` 4) تُنفَّذ مرة واحدة فقط قبل بداية كل اختبارات الفئة، بينما @BeforeEach (المكافئ لـ `@Before`) تتكرر قبل كل اختبار منفرد — وهذا مطابق تماماً لمبدأ "مرة واحدة للفئة مقابل تكرار لكل اختبار" الذي شرحته المحاضرة بأسماء `JUnit` 4.

أ) عكس الترتيب الصحيح تماماً.
ج) خاطئ تماماً — الفرق جوهري في التوقيت وعدد مرات التنفيذ.
د) لا علاقة لهذا التمييز بنوع الاختبار (وحدة/تكامل)، بل بتوقيت التنفيذ فقط.

المحاضرة أكدت نفس المبدأ بأسماء `JUnit` 4: `@Before`/`@After` تتكرران لكل اختبار، بينما `@BeforeClass`/`@AfterClass` (يجب أن تكونا static) تُنفَّذان مرة واحدة فقط للفئة كاملة — `JUnit` 5 أعاد تسميتها إلى @BeforeEach/@BeforeAll لكن المفهوم مطابق تماماً.

## المحاضرة 7: Project Management and Planning (تخطيط وإدارة المشاريع البرمجية)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 77 (سهل)
Which project management technique involves identifying the dependencies between project activities?
أ) Work breakdown structure
ب) Critical path method
ج) Dependency diagram
د) Resource allocation
**الإجابة الصحيحة: ب**
**التعليل:**
`Critical Path Method` (`CPM`) يعتمد بشكل جوهري على رسم `Activity Graph` الذي يوضح الاعتماديات بين الأنشطة (أيها يسبق أيها، وأيها يمكن تنفيذه بالتوازي)، ثم يحسب المسار الحرج بناءً على هذه الاعتماديات.

أ) `Work Breakdown Structure` يقسّم المشروع لمراحل وخطوات وأنشطة، لكنه لا يحدد الاعتماديات الزمنية بينها.
ج) "Dependency diagram" ليس مصطلحاً استخدمته المحاضرة تحديداً؛ المصطلح المستخدم فعلياً هو `Activity Graph` ضمن عملية `CPM`.
د) Resource allocation يخص توزيع الأفراد والموارد، مو ترتيب الأنشطة الزمني.

`CPM` هو الأداة الفعلية التي تُستخدم لتحديد أي نشاط يقع على المسار الحرج (`Slack` = 0)، وهذا مبني بالكامل على فهم اعتماديات الأنشطة أولاً.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 78 (سهل)
Which project management technique is used to estimate the effort required to complete a project activity?
أ) Work breakdown structure
ب) Critical path method
ج) Bottom-up estimation
د) Earned value analysis
**الإجابة الصحيحة: ج**
**التعليل:**
`Bottom-up estimation` تقنية عامة تقدّر جهد كل نشاط صغير على حدة ثم تجمعها لتكوين تقدير المشروع الكلي — وهذا هو أدق وصف لـ"تقدير الجهد اللازم لإنجاز نشاط واحد".

أ) `WBS` يقسّم المشروع لأنشطة، لكنه لا يقدّر الجهد بنفسه.
ب) `CPM` يستخدم تقديرات الزمن الموجودة مسبقاً لحساب المسار الحرج، لا يولّدها.
د) Earned Value Analysis يقارن التقدم الفعلي بالمخطط له، مو تقدير جهد نشاط فردي.

المحاضرة ذكرت طرقاً متعددة لتقدير الجهد (خبرة سابقة، مصفوفة Wolverton، معادلات مثل `COCOMO`) وكلها في جوهرها صيغ من `Bottom-up estimation` تُطبَّق على مستوى الأنشطة الفردية ثم تُجمَّع.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 79 (سهل)
Which project management technique is used to allocate resources to project activities based on their priority and availability?
أ) Work breakdown structure
ب) Critical path method
ج) Resource leveling
د) Risk identification
**الإجابة الصحيحة: ج**
**التعليل:**
`Resource leveling` تقنية قياسية في إدارة المشاريع توزّع الموارد المتاحة على الأنشطة بناءً على أولويتها وتوفّرها الفعلي، خصوصاً عند وجود تعارض أو نقص في الموارد.

أ) `WBS` يقسّم المشروع لأنشطة، لكنه لا يوزّع الموارد بحد ذاته.
ب) `CPM` يحدد المسار الحرج زمنياً، مو توزيع الموارد.
د) `Risk identification` يخص تحديد المخاطر، موضوع مختلف تماماً.

هذا يكمّل موضوع "اختيار وتنظيم الفريق" اللي شرحته المحاضرة، حيث ذُكرت معايير اختيار الأشخاص للمهام (القدرة، الخبرة، التوفر) — `Resource Leveling` هو التطبيق العملي لتوزيعهم لاحقاً على الأنشطة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 80 (سهل)
Which project management technique is used to identify and prioritize risks?
أ) Risk assessment
ب) Risk mitigation
ج) Risk identification
د) Risk monitoring
**الإجابة الصحيحة: أ**
**التعليل:**
عملية إدارة المخاطر في المحاضرة تمر بثلاث مراحل: `Risk Identification` (تحديد المخاطر فقط) ثم `Risk Analysis` (دراسة احتمالها وتأثيرها، وهذا ما يمكّن من الترتيب حسب الأولوية عبر `Risk Exposure` = Probability × Impact) ثم `Risk Control`. "Risk Assessment" هو المصطلح العام الذي يغطي التحديد + التحليل معاً، وبالتالي هو الأقرب لعبارة "identify AND prioritize" مجتمعة.

ب) Risk mitigation يخص التعامل مع الخطر بعد تحديده (تجنّب/نقل/قبول)، لا تحديده وترتيبه.
ج) `Risk identification` وحدها تحدد المخاطر لكن لا "ترتّبها حسب الأولوية" (هذا يحتاج تحليل Probability×Impact الإضافي).
د) `Risk monitoring` متابعة دورية لاحقة، مو التحديد الأولي.

المثال العملي في المحاضرة (شجرة قرار `regression testing`) يوضح كيف يُستخدم `Risk Exposure` لمقارنة وترتيب الخيارات — وهذا بالضبط جوهر "تحديد وترتيب المخاطر حسب الأولوية".

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 81 (متوسط)
What is the purpose of a Gantt chart in project management?
أ) To estimate project costs
ب) To track project progress
ج) To allocate project resources
د) To define project requirements
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة ذكرت صراحة أن `Gantt Chart` أداة تعرض الأنشطة وأزمنتها والمسار الحرج بصرياً، وتساعد بشكل خاص في توضيح الأنشطة القابلة للتنفيذ بالتوازي — وهذا يُستخدم عملياً لمتابعة تقدم تنفيذ الأنشطة عبر الزمن.

أ) تقدير التكلفة موضوع منفصل (يعتمد على `COCOMO` أو معادلات أخرى)، مو وظيفة `Gantt Chart`.
ج) توزيع الموارد يخص `Resource Leveling`، مو الغرض المباشر من الرسم البياني نفسه.
د) تعريف المتطلبات مرحلة سابقة تماماً على الجدولة.

`Gantt Chart` هو التمثيل البصري النهائي لكل بيانات `CPM` (الأنشطة، أزمنتها، المسار الحرج) — وبالتالي أداته الأساسية هي متابعة وتتبع تقدم تنفيذ هذه الأنشطة بمرور الوقت.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 82 (سهل)
Which project management technique is used to estimate the duration of project activities?
أ) Work breakdown structure
ب) Critical path method
ج) Resource allocation
د) Earned value analysis
**الإجابة الصحيحة: ب**
**التعليل:**
من بين الخيارات المتاحة، `Critical Path Method` هو الأقرب عملياً لتقدير المدة الزمنية للمشروع ولأنشطته المترابطة، لأن حساب `Earliest Start` و`Latest Start` و`Slack` لكل نشاط يعتمد بالكامل على تقديرات مدة كل نشاط ويحدد أثرها التراكمي على المدة الكلية للمشروع.

أ) `WBS` يقسّم المشروع لأنشطة لكنه لا "يقدّر" مدتها الزمنية بحد ذاته.
ج) Resource allocation يخص توزيع الأفراد، مو تقدير الزمن.
د) Earned Value Analysis يقارن الأداء الفعلي بالمخطط، وليس تقنية تقدير أولي للمدة.

ملاحظة: تقنياً، تقدير المدة الفعلي غالباً يستخدم أسلوب `PERT` (المتفائل/المتشائم/الأكثر احتمالاً بمعادلة توزيع بيتا) الذي شرحته المحاضرة ضمن طرق تقدير الجهد، لكنه لم يكن أحد الخيارات المتاحة هنا — فاخترنا الخيار الأقرب من الأربعة المتاحة.

**المصدر:** [نمط 2023-2024]
### السؤال 83 (متوسط)
What is the primary purpose of a project management plan?
أ) To define the software requirements
ب) To outline how the project will be executed, monitored, and controlled
ج) To write the source code
د) To design the system architecture
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة عرّفت `Project Plan` كوثيقة شاملة من 14 بنداً (Scope, Schedule, Team Organization...) تعمل كـ"عقد" غير رسمي يوضّح كيف سيُنفَّذ المشروع ويُتابَع تقدمه — مطابق تماماً لنص السؤال "executed, monitored, and controlled".

أ) تعريف المتطلبات دور `SRS`، مو `Project Plan`.
ج) كتابة الكود نشاط تنفيذي، لا علاقة له بالخطة نفسها.
د) تصميم المعمارية جزء من مرحلة Design، منفصل عن التخطيط الإداري.

المحاضرة أكدت أن `Project Plan` يُستخدم لمطابقة الكلفة والجدول الزمني الفعليين بما تم التخطيط له — وهذا بالضبط معنى "المراقبة والتحكم" في نص السؤال.

**المصدر:** [نمط 2023-2024]
### السؤال 84 (متوسط)
In project management, what is the purpose of a Gantt chart?
أ) To allocate resources
ب) To define project requirements
ج) To illustrate the project schedule and track progress
د) To identify project risks
**الإجابة الصحيحة: ج**
**التعليل:**
كما شرحته المحاضرة، `Gantt Chart` أداة بصرية تعرض الأنشطة وأزمنتها والمسار الحرج، وتساعد بشكل خاص على توضيح الأنشطة القابلة للتنفيذ بالتوازي، وبالتالي تتبع تقدم الجدول الزمني.

أ) توزيع الموارد دور `Resource Leveling`، مو الغرض المباشر من الرسم نفسه.
ب) تعريف المتطلبات مرحلة سابقة تماماً على الجدولة.
د) تحديد المخاطر دور `Risk Identification`، موضوع منفصل.

**المصدر:** [نمط 2023-2024]
### السؤال 85 (سهل)
What is the main focus of risk management in project management?
أ) To identify and mitigate potential problems that could affect the project
ب) To define project scope and requirements
ج) To allocate resources effectively
د) To manage stakeholder communication
**الإجابة الصحيحة: أ**
**التعليل:**
عملية إدارة المخاطر حسب المحاضرة تمر بثلاث مراحل: `Risk Identification`، `Risk Analysis`، و`Risk Control` (يتضمّن `Risk Planning` للتجنب أو التقليل) — وهذا مطابق تماماً لنص السؤال "identify and mitigate potential problems".

ب) تحديد النطاق والمتطلبات مرحلة مختلفة تماماً (RE/Scope).
ج) توزيع الموارد يخص `Resource Leveling`.
د) إدارة تواصل أصحاب المصلحة موضوع منفصل.

المحاضرة فرّقت بوضوح بين Risk (احتمال حدوثه أقل من 1) وProblem (مؤكد الحدوث) — وإدارة المخاطر هي بالضبط التعامل المنهجي مع الاحتمالات السلبية قبل تحولها لمشاكل فعلية.

**المصدر:** [نمط 2023-2024]
### السؤال 86 (سهل)
Which project management technique is used to estimate project durations by evaluating the most optimistic, most likely, and most pessimistic scenarios?
أ) Monte Carlo Simulation
ب) Critical Path Method (CPM)
ج) PERT (Program Evaluation and Review Technique)
د) Earned Value Management (EVM)
**الإجابة الصحيحة: ج**
**التعليل:**
هذا وصف حرفي لتقنية `PERT` اللي شرحتها المحاضرة عبر معادلة توزيع بيتا: `(x + 4z + y) / 6` حيث `y` متفائل، `x` متشائم، و`z` الأكثر احتمالاً — بالضبط السيناريوهات الثلاثة المذكورة بالسؤال.

أ) Monte Carlo Simulation تقنية محاكاة إحصائية أوسع، لم تُذكر بهذا الاسم في المحاضرة.
ب) `CPM` يحسب المسار الحرج من تقديرات زمنية موجودة مسبقاً، لا يولّدها بهذه الطريقة الثلاثية.
د) EVM يقارن الأداء الفعلي بالمخطط، لا يقدّر المدة أولاً.

المحاضرة قدّمت هذه المعادلة كإحدى طرق تقدير الجهد بالاعتماد على خبرة عدة خبراء يُسألون عن ثلاثة تقديرات، ثم تُدمج بمعادلة `PERT` الموزونة.

## المحاضرة 8: Software Measurement (قياس البرمجيات)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 87 (سهل)
Which software metric measures the average time required to fix a software defect?
أ) Defect density
ب) Mean Time Between Failures
ج) Mean Time to Repair
د) Software complexity
**الإجابة الصحيحة: ج**
**التعليل:**
`Mean Time to Repair` (`MTTR`) يقيس بالتحديد متوسط الوقت اللازم لإصلاح عطل بعد اكتشافه — وهذا مطابق تماماً لنص السؤال.

أ) `Defect Density` تقيس عدد الأخطاء لكل وحدة حجم (`LOC` أو `Function Points`)، مو زمن الإصلاح.
ب) `Mean Time Between Failures` يقيس متوسط الفترة بين عطلين متتاليين، مو زمن الإصلاح نفسه.
د) Software Complexity (زي `Cyclomatic Complexity`) يقيس عدد المسارات في الكود، مو زمن الإصلاح.

`MTTR` و`MTBF` مقياسان مكمّلان لبعض في تقييم الموثوقية: `MTBF` يقول "كل قد ايش يصير عطل؟" و`MTTR` يقول "لما يصير عطل، قد ايش ناخذ نصلحه؟".

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 88 (سهل)
Which software metric measures the number of defects discovered per unit of time during testing?
أ) Defect density
ب) Defect discovery rate
ج) Cyclomatic complexity
د) Test coverage
**الإجابة الصحيحة: ب**
**التعليل:**
Defect discovery rate يقيس تحديداً عدد الأخطاء المكتشفة لكل وحدة زمن — مطابق حرفياً لنص السؤال.

أ) `Defect Density` تقيس الأخطاء لكل وحدة حجم (`LOC` أو `Function Points`)، مو لكل وحدة زمن.
ج) `Cyclomatic Complexity` تقيس عدد المسارات المستقلة في الكود، لا علاقة لها بمعدل اكتشاف الأخطاء.
د) `Test Coverage` تقيس نسبة الكود اللي غطته الاختبارات، مو معدل اكتشاف الأخطاء.

الفرق الجوهري بين Density (نسبة لحجم البرنامج) وDiscovery Rate (نسبة لزمن الاختبار) هو نقطة يسهل الخلط فيها لأن الاسمين متشابهان لغوياً.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 89 (سهل)
Which of the following is NOT a software metric?
أ) Lines of code
ب) Cyclomatic complexity
ج) Defect density
د) Software documentation
**الإجابة الصحيحة: د**
**التعليل:**
"Software documentation" هو منتج/تسليمة (deliverable) وليس مقياساً رقمياً بحد ذاته — لا يعطي رقماً نقيّم به شيئاً، بعكس باقي الخيارات الثلاثة.

أ) `Lines of Code` مقياس حجم صريح شرحته المحاضرة.
ب) `Cyclomatic Complexity` مقياس تعقيد صريح (V(G) = e−n+2p).
ج) `Defect Density` مقياس جودة صريح (#defects/size).

هذا الفرق مهم: التوثيق هو أحد عناصر "منتج البرمجية" (Software Product) نفسه كما عرّفته المحاضرة الأولى، لكنه ليس مقياساً — المقاييس تُطبَّق عليه أو على غيره من عناصر المنتج، لا العكس.

**المصدر:** [نمط 2023-2024]
### السؤال 90 (سهل)
Which of the following is an example of a product metric?
أ) Defect density
ب) Number of developers
ج) Project duration
د) Time to market
**الإجابة الصحيحة: أ**
**التعليل:**
`Defect Density` (عدد الأخطاء لكل وحدة حجم) مقياس يصف خاصية في المنتج البرمجي نفسه (Product `Metric`)، بعكس باقي الخيارات التي تصف موارد أو زمن المشروع (Process/Project `Metrics`).

ب) عدد المطورين خاصية فريق العمل، مو المنتج.
ج) مدة المشروع خاصية عملية إدارة المشروع، مو المنتج.
د) الوقت للوصول للسوق خاصية عملية تسويقية/إدارية، مو المنتج نفسه.

المحاضرة الأولى فرّقت بوضوح بين `Process Metrics` (تقيس عملية التطوير) و`Product Metrics` (تقيس المنتج نفسه كالحجم والتعقيد وعدد الأخطاء) — `Defect Density` مثال كلاسيكي على النوع الثاني.

**المصدر:** [نمط 2023-2024]
### السؤال 91 (سهل)
What does cyclomatic complexity measure?
أ) The number of lines of code
ب) The number of independent paths through the code
ج) The number of classes in a system
د) The total number of bugs in the system
**الإجابة الصحيحة: ب**
**التعليل:**
`Cyclomatic Complexity` (V(G) = e − n + 2p) تقيس بالضبط عدد المسارات المستقلة خطياً (independent paths) داخل دالة معيّنة، وهذا هو تعريفها الأساسي في المحاضرة.

أ) عدد أسطر الكود مقياس مختلف تماماً (`LOC`).
ج) عدد الفئات في النظام لا علاقة له بـ CC، بل بمقاييس أخرى مثل عدد الحزم.
د) إجمالي عدد الأخطاء نتيجة قد ترتبط إحصائياً بـ CC العالية، لكنه ليس ما تقيسه CC مباشرة.

المحاضرة أعطت مثالاً محلولاً (دالة showClients) حيث E=7, N=6, P=1 فـ V(G)=7−6+2=3، أي 3 مسارات مستقلة — تطبيق مباشر لهذا التعريف.

**المصدر:** [نمط 2023-2024]
### السؤال 92 (متوسط)
In the context of software metrics, what does 'defect density' refer to?
أ) The number of defects per unit of code
ب) The number of lines of code written by each developer
ج) The total number of defects found in the system
د) The time taken to fix each defect
**الإجابة الصحيحة: أ**
**التعليل:**
`Defect Density` = #defects / System_size (بـ `LOC` أو `Function Points`) — أي عدد الأخطاء لكل وحدة حجم من الكود، وهذا مطابق حرفياً للخيار A.

ب) أسطر الكود لكل مطوّر مقياس إنتاجية مختلف تماماً.
ج) إجمالي عدد الأخطاء رقم مطلق بدون تطبيع (normalization) بحجم النظام، بعكس `Defect Density` اللي تجعل المقارنة عادلة بين أنظمة مختلفة الحجم.
د) وقت إصلاح كل خطأ هو تعريف `MTTR`، مقياس مختلف تماماً.

المحاضرة أكدت أن التطبيع بحجم النظام (القسمة على `LOC` أو FP) هو ما يجعل `Defect Density` مقياساً عادلاً للمقارنة بين أنظمة مختلفة الحجم، بعكس العدد المطلق وحده.

**المصدر:** [نمط 2023-2024]
### السؤال 93 (سهل)
Which of the following is NOT a common software quality metric?
أ) Mean time to failure (MTTF)
ب) Code churn
ج) Feature count
د) Lines of code (LOC)
**الإجابة الصحيحة: ج**
**التعليل:**
عدد الميزات (Feature count) ليس مقياس جودة معياري مذكوراً في المحاضرة — هو مؤشر على حجم وظيفي، لا على جودة الكود أو موثوقيته.

أ) MTTF مقياس موثوقية قياسي.
ب) `Code Churn` مقياس شرحته المحاضرة صراحة (Churned `LOC`, Churned Count, File Churned) كمؤشر على "الأماكن الساخنة" المرتبطة بمعدل أخطاء أعلى.
د) `LOC` مقياس حجم أساسي مذكور من أول محاضرة.

المحاضرة ذكرت `Code Churn` و`Defect Density` و`Failure Rate` كمقاييس جودة منتج فعلية — بعكس "عدد الميزات" الذي لم يُذكر كمقياس جودة إطلاقاً.

**المصدر:** [نمط 2023-2024]
### السؤال 94–103 (مجموعة أسئلة على كود Calculator)

```java
public class Calculator {
    public int add(int a, int b) { return a + b; }
    public int subtract(int a, int b) { return a - b; }
    public int multiply(int a, int b) { return a * b; }
    public double divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero is not allowed.");
        }
        return (double) a / b;
    }
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Add: " + calc.add(5, 3));
        System.out.println("Subtract: " + calc.subtract(5, 3));
        System.out.println("Multiply: " + calc.multiply(5, 3));
        System.out.println("Divide: " + calc.divide(5, 3));
    }
}
```

**السؤال 94:** What is the cyclomatic complexity of the provided Calculator class?
أ) 1
ب) 2
ج) 4
د) 5
**الإجابة الصحيحة: د**
**التعليل:**
باستخدام V(G) = e − n + 2p على مستوى الدالة الواحدة، كل من add وsubtract وmultiply CC=1 (بدون أي قرار شرطي)، بينما divide فيها شرط if واحد فـ CC=2. مجموع CC لكل الدوال (`WMC` — `Weighted Methods per Class`، وهو مجموع `Cyclomatic Complexity` لكل الدوال في الفئة كما عرّفته المحاضرة) = 1+1+1+2 = 5 (بدون احتساب main لأنها ليست جزءاً من منطق العمل الأساسي للفئة).

هذا يربط مباشرة بمفهوم `WMC` من مقاييس Chidamber & Kemerer: `WMC` هو مجموع CC لكل دوال الفئة، وليس CC لدالة واحدة بمفردها — ولذلك السؤال عن "الفئة كاملة" يختلف عن سؤال عن دالة add وحدها (سؤال آخر بنفس المجموعة).

**السؤال 95:** Which `metric` would be used to `measure` the size of the Calculator class in terms of code lines?
أ) `Lines of Code` (`LOC`)
ب) `Cyclomatic Complexity`
ج) `Code Coverage`
د) `Halstead` Complexity
**الإجابة الصحيحة: أ**
**التعليل:**
`LOC` هو المقياس المباشر لحجم الكود بعدد الأسطر — وهذا بالضبط ما يسأل عنه السؤال.

ب) `Cyclomatic Complexity` يقيس التعقيد المنطقي، مو عدد الأسطر.
ج) `Code Coverage` يقيس نسبة الكود المُختبَر، لا حجمه.
د) `Halstead` Complexity يقيس الحجم بناءً على عدد الـ operators/operands (n1, n2, N)، وهو مقياس مختلف تماماً عن `LOC` رغم أنه يقيس "حجماً" أيضاً بطريقة مختلفة.

**السؤال 96:** What is the primary purpose of the divide method's exception handling in the Calculator class?
أ) To `measure` code complexity
ب) To prevent division by zero errors
ج) To count the number of method calls
د) To test the `code coverage`
**الإجابة الصحيحة: ب**
**التعليل:**
كتلة الـ if (b == 0) تُطلق ArithmeticException بشكل متعمَّد لمنع حدوث قسمة على صفر (وهو خطأ رياضي وبرمجي خطير) قبل أن يحدث فعلياً.

أ) قياس التعقيد نتيجة جانبية لوجود الشرط (يرفع CC)، مو الغرض من كتابته.
ج) عدّ استدعاءات الدوال لا علاقة له بهذا الشرط إطلاقاً.
د) اختبار التغطية غرض لاحق يخص من يكتب اختبارات لهذه الدالة، مو غرض الشرط نفسه داخل الكود.

هذا مثال تطبيقي مباشر على "اختبار الحدود" (`Boundary Value Analysis`) اللي شرحته محاضرة Testing — القيمة b=0 هي بالضبط الحد الذي يجب معالجته صراحة.

**السؤال 97:** Which software `metric` would help assess how well the Calculator class is tested?
أ) `Code Churn`
ب) `Code Coverage`
ج) `Function Points`
د) `Defect Density`
**الإجابة الصحيحة: ب**
**التعليل:**
`Code Coverage` تحديداً تقيس نسبة الكود الذي نُفِّذ فعلياً أثناء تشغيل الاختبارات — وهذا يجاوب مباشرة على "كم Calculator مُختبَرة جيداً؟".

أ) `Code Churn` يقيس كمية الكود المتغيرة بمرور الزمن، لا علاقة له بجودة الاختبار.
ج) `Function Points` تقيس الحجم الوظيفي، لا تغطية الاختبار.
د) `Defect Density` تقيس عدد الأخطاء لكل وحدة حجم، وهي نتيجة نهائية وليست مقياس تغطية مباشر.

**السؤال 98:** How many methods are present in the Calculator class?
أ) 3
ب) 4
ج) 5
د) 6
**الإجابة الصحيحة: ج**
**التعليل:**
الدوال الموجودة فعلياً: add، subtract، multiply، divide، وmain — أي 5 دوال بالمجموع.

A وB أقل من العدد الفعلي.
D يزيد دالة غير موجودة في الكود المعطى.

هذا سؤال عدّ بسيط يتحقق من قراءة الكود المعطى بدقة، مباشرة من نص الكلاس المصدر في السؤال.

**السؤال 99:** What type of `metric` is the divide method's handling of division by zero?
أ) Code Quality `Metric`
ب) Functional `Metric`
ج) `Performance` `Metric`
د) Complexity `Metric`
**الإجابة الصحيحة: أ**
**التعليل:**
معالجة الحالات الاستثنائية (زي القسمة على صفر) بشكل صريح ومدروس هي ممارسة ترفع من جودة الكود ومتانته (robustness) — وهذا يصنَّف ضمن مؤشرات جودة الكود العامة، لا ضمن مقياس رقمي محدد بحد ذاته.

ب) Functional `Metric` يخص قياس الوظائف (زي `Function Points`)، مو معالجة استثناء واحد.
ج) `Performance` `Metric` يخص السرعة واستهلاك الموارد، لا معالجة الأخطاء.
د) Complexity `Metric` يقيس تعقيد المسارات (وفعلاً الشرط يرفع CC)، لكن "نوع" هذا الإجراء نفسه من ناحية الغرض هو تحسين الجودة، لا قياس التعقيد بحد ذاته.

**السؤال 100:** If you wanted to `measure` the complexity of the add method, which `metric` would be most appropriate?
أ) `Halstead` Complexity
ب) `Lines of Code` (`LOC`)
ج) `Cyclomatic Complexity`
د) `Code Churn`
**الإجابة الصحيحة: ج**
**التعليل:**
`Cyclomatic Complexity` هو المقياس القياسي لتعقيد دالة واحدة عبر عدّ مساراتها المستقلة — وهو الأنسب مباشرة هنا (وCC لدالة add=1 لأنها بدون أي قرار شرطي).

أ) `Halstead` Complexity ممكن تُستخدم أيضاً لكنها أعقد حساباً وتحتاج عدّ operators/operands، وليست "الأنسب" مباشرة لدالة بهذا البساطة.
ب) `LOC` يقيس الحجم مو التعقيد المنطقي.
د) `Code Churn` يقيس التغيّر عبر الزمن، لا التعقيد.

**السؤال 101:** Which `metric` would be most useful for assessing the `maintainability` of the Calculator class?
أ) `Cyclomatic Complexity`
ب) Number of Methods
ج) `Lines of Code` (`LOC`)
د) `Code Coverage`
**الإجابة الصحيحة: أ**
**التعليل:**
كما شرحته محاضرة `Measurement` 2، `Cyclomatic Complexity` العالية تُستخدم كمؤشر مباشر على انخفاض `Maintainability` — فهي الأنسب من بين الخيارات لتقييم صعوبة صيانة الفئة.

ب) عدد الدوال وحده لا يعكس مدى تعقيد كل دالة داخلياً.
ج) `LOC` مقياس حجم بسيط لا يعكس التعقيد المنطقي المؤثر فعلياً على الصيانة.
د) `Code Coverage` يقيس التغطية الاختبارية، لا صعوبة الصيانة.

**السؤال 102:** What would be the impact of adding an additional conditional statement inside the divide method on the `cyclomatic complexity`?
أ) It would decrease complexity
ب) It would have no effect
ج) It would increase complexity
د) It would change the number of `lines of code`
**الإجابة الصحيحة: ج**
**التعليل:**
كل قرار شرطي إضافي (if/else إضافي) يضيف حافة (edge) جديدة لمخطط التدفق، وبالتالي يرفع V(G) = e − n + 2p مباشرة — فإضافة شرط جديد ترفع CC حتماً.

أ) عكس الحقيقة الرياضية تماماً — إضافة شرط لا يمكن أن تخفّض CC.
ب) خاطئ لأن أي قرار شرطي جديد يغيّر عدد الحواف بالضرورة.
د) صحيح أن الأسطر ستزيد أيضاً، لكن هذا ليس "الأثر" المطلوب بالسؤال تحديداً (السؤال يسأل عن CC تحديداً لا `LOC`).

**السؤال 103:** Which `metric` could help determine how much of the Calculator class code is being executed during testing?
أ) `Cyclomatic Complexity`
ب) `Code Coverage`
ج) `Lines of Code` (`LOC`)
د) `Halstead` Complexity
**الإجابة الصحيحة: ب**
**التعليل:**
هذا نفس تعريف `Code Coverage` تماماً — "نسبة الكود المُنفَّذ فعلياً أثناء الاختبار" هو التعريف الحرفي لهذا المقياس كما شرحته محاضرة `JUnit`.

أ) CC يقيس التعقيد المنطقي الثابت للكود، لا نسبة تنفيذه أثناء الاختبار.
ج) `LOC` مقياس حجم ثابت، لا علاقة له بالتنفيذ الفعلي وقت الاختبار.
د) `Halstead` Complexity يقيس حجم/صعوبة الكود من رموزه، لا نسبة تنفيذه.

**المصدر:** [نمط 2023-2024]
### السؤال 104 (سهل)
In McCabe's cyclomatic complexity metric code is first represented as:
أ) A syntax graph
ب) A data-flow graph
ج) A flow control graph
د) A control-vs-command graph
ه) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
معادلة V(G) = e − n + 2p تُحسب مباشرة من مخطط تدفق التحكم (Control Flow Graph) للدالة — حيث e عدد الحواف وn عدد العُقد في هذا المخطط تحديداً.

أ) مخطط نحوي (syntax graph/tree) يمثّل بنية الجملة البرمجية، لا تدفق التحكم.
ب) مخطط تدفق البيانات (data-flow graph) يمثّل كيف تتحرك البيانات، مو مسارات التحكم.
د) مصطلح غير موجود أصلاً في أدبيات CC.

مثال المحاضرة المحلول (دالة showClients بـ E=7, N=6, P=1) بُني بالكامل على تحويل الكود لمخطط تدفق تحكم أولاً، ثم عدّ حوافه وعُقده.

**المصدر:** [نمط 2023-2024]
### السؤال 105 (سهل)
The cyclomatic complexity of a graph is:
أ) the number of closed paths in the graph.
ب) the number of independent test cases required to reach every node in the graph.
ج) the number of edges - the number of nodes + 1.
د) All of the above.
ه) None of the above.
**الإجابة الصحيحة: ب**
**التعليل:**
التفسير العملي الأدق لـ `Cyclomatic Complexity` هو أنه يعطي الحد الأدنى لعدد حالات الاختبار المستقلة اللازمة للوصول لكل عقدة (وبالتالي كل مسار مستقل) في مخطط التدفق — وهذا هو ما شرحته المحاضرة كفائدة عملية مباشرة لـ CC في تحديد تغطية الاختبار.

أ) "المسارات المغلقة" ليست تعريفاً دقيقاً لـ CC؛ CC تقيس المسارات المستقلة خطياً، لا المسارات المغلقة (loops) تحديداً.
ج) الصيغة "e − n + 1" غير دقيقة رياضياً؛ المعادلة الصحيحة حسب المحاضرة هي `V(G) = e − n + 2p`، فمع p=1 (مخطط متصل واحد) الناتج e−n+2 لا e−n+1 — خطأ حسابي بمقدار واحد في هذا الخيار.
د) بما أن الخيارين a وc فيهما أخطاء، فـ"كل ما سبق" غير صحيح.

هذا يربط مباشرة بفائدة CC العملية اللي شرحتها المحاضرة: "تعطي حداً أعلى لعدد حالات اختبار الفروع وحداً أدنى لتغطية المسارات" — أي أنها فعلياً تحدد الحد الأدنى من حالات الاختبار المطلوبة.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 106 (متوسط)
`Cyclomatic Complexity` (CC) is primarily used to measure:
أ) The number of potential execution paths in a module.
ب) The degree of coupling between modules.
ج) The depth of the inheritance hierarchy.
د) The number of external dependencies a module has.
**الإجابة الصحيحة: أ**
**التعليل:**
CC تحسب عدد المسارات المستقلة خطياً عبر V(G) = e − n + 2p، وهذا مطابق تماماً لـ"عدد مسارات التنفيذ المحتملة داخل الدالة/الوحدة".

ب) درجة الاقتران بين الوحدات هي `CBO`، مقياس مختلف تماماً.
ج) عمق شجرة الوراثة هو `DIT`، مقياس مختلف.
د) عدد الاعتماديات الخارجية أقرب لـ `Fan-out` أو Ce، مقاييس مختلفة.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 107 (سهل)
A high `Depth of Inheritance Tree` (`DIT`) value in object-oriented design generally indicates:
أ) A well-designed and easily maintainable class hierarchy.
ب) Potential difficulties in understanding and maintaining the class hierarchy due to increased complexity.
ج) Improved code reuse and reduced code duplication.
د) Lower risk of errors due to encapsulation and abstraction.
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة أكدت أن الشجرة الأعمق تعني إعادة استخدام أكبر، لكن أيضاً تعقيد تصميم أكبر — كلما كانت الفئة أعمق، زاد عدد الدوال الموروثة من الآباء وزاد عدد الدوال المطلوب اختبارها وفهمها، وهذه مقايضة حقيقية وليست دائماً إيجابية.

أ) عكس المقصود — `DIT` عالٍ ليس دائماً "جيد التصميم"، بل يحمل مخاطرة تعقيد حقيقية.
ج) صحيحة جزئياً (reuse أكبر فعلاً) لكنها ليست الأثر "العام" الأهم المذكور — المحاضرة ربطت `DIT` العالي أساساً بالتعقيد، لا فقط الفائدة.
د) لا علاقة مباشرة بين `DIT` وانخفاض الأخطاء تلقائياً.

المحاضرة وضعت `DIT` كمقايضة حقيقية (reuse مقابل complexity)، وليس عاملاً "جيداً دائماً" أو "سيئاً دائماً" بشكل مطلق.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 108 (متوسط)
In the context of software quality metrics, what does "coupling" refer to?
أ) The degree of interaction between different modules or components.
ب) The strength of the relationship between classes in an inheritance hierarchy.
ج) The number of dependencies a module has on external libraries.
د) The cohesion of elements within a module.
**الإجابة الصحيحة: أ**
**التعليل:**
Coupling حسب المحاضرة هو "قوة الارتباط بين الفئات المختلفة"، ويحدث بطريقتين: استخدام دوال كائن آخر، أو الوراثة — أي درجة التفاعل بين المكونات المختلفة، مطابق تماماً للخيار a.

ب) علاقة الوراثة تحديداً تخص `DIT`/`NOC`، مو Coupling العام (رغم أن الوراثة أحد مصادره).
ج) الاعتماديات على مكتبات خارجية تحديداً أقرب لـ Ce (Efferent Coupling على مستوى الحزمة)، مو التعريف العام.
د) التماسك (Cohesion) هو نقيض/مكمّل Coupling، مفهوم منفصل تماماً.

القاعدة الذهبية المتكررة في المحاضرة: "حافظ على اقتران منخفض لكن تماسك عالي" — وهذا يوضح Coupling كمفهوم مستقل عن Cohesion رغم ارتباطهما.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 109 (سهل)
Which of the following Kemerer metrics measures the number of methods that can access attributes of the class?
أ) Lack of Cohesion in Methods
ب) Coupling Between Object classes
ج) Response For A Class
د) Weighted Methods per Class
**الإجابة الصحيحة: ج**
**التعليل:**
`Response For a Class` (`RFC`) هو مجموعة الدوال التي يمكن أن تُنفَّذ استجابة لرسالة يستقبلها كائن من الفئة — وهذا أقرب مفهوم من مقاييس Chidamber & Kemerer لصياغة السؤال "عدد الدوال التي يمكنها الوصول/الاستجابة ضمن الفئة".

أ) `LCOM` يقيس غياب التماسك (تشارك المتغيرات بين الدوال)، مو "عدد الدوال التي تصل" بحد ذاته.
ب) `CBO` يقيس الاقتران مع فئات أخرى، لا عدد الدوال داخل الفئة نفسها.
د) `WMC` يقيس مجموع تعقيد كل الدوال (CC)، لا عدد الدوال "التي تصل" للخصائص تحديداً.

ملاحظة: صياغة السؤال ("methods that can access attributes") غير دقيقة تماماً مقارنة بالتعريف الرسمي لـ `RFC` ("methods executed in response to a message") — الإجابة معتمدة على أقرب مقياس من نفس مجموعة Kemerer الستة (`DIT`, `NOC`, `WMC`, `RFC`, `CBO`, `LCOM`) التي شرحتها المحاضرة.

## المحاضرة 9: Software Measurement — الجزء الثاني (قياس البرمجيات)

**المصدر:** [نمط 2023-2024]
### السؤال 110 (متوسط)
Which metric would be most useful for evaluating code maintainability?
أ) Lines of code (LOC)
ب) Cyclomatic complexity
ج) Function points
د) Development cost
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة صرّحت أن `Cyclomatic Complexity` العالية تُستخدم كمؤشر مباشر على انخفاض `Maintainability` وانخفاض `Reliability` معاً — أي أنها من أفضل المقاييس الداخلية (Internal Attribute) للتنبؤ بصعوبة الصيانة.

أ) `LOC` مقياس حجم بسيط لا يعكس التعقيد الفعلي المؤثر على الصيانة.
ج) `Function Points` تقيس الحجم الوظيفي لأغراض تقدير التكلفة، مو صعوبة الصيانة تحديداً.
د) تكلفة التطوير خاصية إدارية، لا علاقة مباشرة بصعوبة الصيانة.

هذا مرتبط مباشرة بمفهوم "`Internal Attributes` كمؤشرات على `External Attributes`" اللي شرحته المحاضرة: CC صفة داخلية قابلة للقياس، تُستخدم كمؤشر على `Maintainability` الصعبة القياس المباشر.

**المصدر:** [نمط 2023-2024]
### السؤال 111 (سهل)
What does the term 'function point' measure?
أ) The complexity of the code
ب) The size and complexity of the software based on its functionality
ج) The number of functions in the code
د) The execution speed of the software
**الإجابة الصحيحة: ب**
**التعليل:**
`Function Points` تقيس حجم البرنامج بناءً على "إيش يسوي البرنامج" (وظائفه) لا عدد أسطر كوده، وهذا يجعلها مستقلة عن لغة البرمجة — تماماً كما عرّفتها المحاضرة.

أ) تعقيد الكود مقياس مختلف (`Cyclomatic Complexity`)، لا `Function Points`.
ج) عدد الدوال في الكود ليس نفس مفهوم "الوظائف" (functions) بمعنى FP، اللي تشمل Inputs/Outputs/Files/Inquiries على مستوى النظام كامل.
د) سرعة التنفيذ مقياس أداء ديناميكي مختلف تماماً.

المحاضرة أكدت أن FP قدّمها Albrecht من IBM سنة 1979 وأصبحت معياراً ISO سنة 2003 لتقدير التكلفة بناءً على الوظائف مستقلة عن التقنية.

**المصدر:** [نمط 2023-2024]
### السؤال 112 (سهل)
"Lines of code" is a poor metric because:
أ) it is language independent.
ب) it penalizes efficient, compact coding.
ج) it measures what matters, not what can be measured.
د) it was developed as a metric in the 1960's.
ه) All of the above.
**الإجابة الصحيحة: ب**
**التعليل:**
`LOC` يحاسب الكود بعدد الأسطر، وهذا يعني أن الكود المضغوط والفعّال (اللي يحل نفس المشكلة بأسطر أقل باستخدام مهارة برمجية أعلى) يُسجَّل بقيمة `LOC` "أقل"، وكأن المبرمج الأكثر مهارة "أنتج أقل" — عكس الحقيقة تماماً.

أ) عكس الحقيقة تماماً — `LOC` مقياس معتمد بشدة على اللغة (نفس المنطق يحتاج أسطر مختلفة بلغات مختلفة)، وهذا أحد أهم عيوبه المذكورة بالمحاضرة.
ج) عكس المقصود — `LOC` "يقيس ما يمكن قياسه بسهولة" (عدّ الأسطر)، لا بالضرورة "ما يهم فعلياً" (التعقيد الحقيقي)؛ الصياغة بالخيار c معكوسة عن المشكلة الفعلية.
د) تاريخ تطوير المقياس لا يجعله سيئاً بحد ذاته.

المحاضرة ذكرت صراحة مشاكل `LOC`: قرار غير واضح (هل نعدّ الأسطر الفارغة أو التعليقات؟)، اعتماد على اللغة، وعدم عكسه للتعقيد الفعلي — وهذا يفسّر مباشرة ليش برنامج قصير قد يكون أعقد من برنامج طويل.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 113 (متوسط)
Which of the following statements is MOST accurate regarding the use of `Lines of Code` (`LOC`) as a software metric?
أ) LOC is a universally reliable metric for measuring software size and complexity.
ب) LOC is useful for comparing the productivity of developers working on different programming languages.
ج) LOC can be a useful metric when comparing similar projects within the same organization and using the same coding standards, but it has limitations when comparing across different contexts.
د) LOC is an outdated metric and should never be used in modern software engineering practices.
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة أكدت أن `LOC` مقياس محدود السياق: يعتمد بشدة على اللغة البرمجية ومعايير الترميز المستخدمة، فمقارنة مشاريع متشابهة داخل نفس المؤسسة بنفس المعايير تبقى مفيدة نسبياً، لكن مقارنته عبر لغات أو سياقات مختلفة تماماً تفقده موثوقيته.

أ) "موثوق عالمياً" مبالغة تناقض عيوب `LOC` المذكورة صراحة (قرار غير واضح حول الأسطر الفارغة/التعليقات، اعتماد على اللغة).
ب) مقارنة إنتاجية مطورين بلغات مختلفة أسوأ استخدام ممكن لـ `LOC`، لأنه بالتحديد يفشل في هذا السياق.
د) رفض استخدامه كلياً مبالغة أخرى — المحاضرة استخدمته كنقطة بداية معقولة رغم عيوبها.

المحاضرة وصفت `LOC` كأبسط مقياس حجم، لكنها حذّرت بوضوح من مشكلتين رئيسيتين: الاعتماد على اللغة، وعدم عكسه للتعقيد الفعلي — وهذا بالضبط ما يعنيه "له حدود عند المقارنة عبر سياقات مختلفة".

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 114 (سهل)
What is the primary goal of using `Function Point Analysis` (FPA) as a software metric?
أ) To estimate the development time required for a project.
ب) To assess the code quality and identify potential bugs.
ج) To measure the size of the software based on its functionality from the user's perspective.
د) To track the progress of the development team.
**الإجابة الصحيحة: ج**
**التعليل:**
FPA تقيس حجم البرنامج بناءً على وظائفه (Inputs, Outputs, Files, Interfaces, Inquiries) من منظور المستخدم، مستقلة عن لغة البرمجة — وهذا الهدف الأساسي المذكور صراحة بالمحاضرة.

أ) تقدير الوقت نتيجة غير مباشرة تُبنى على FP لاحقاً، مو الهدف المباشر لـ FPA نفسها.
ب) تقييم جودة الكود واكتشاف الأخطاء دور مقاييس أخرى (زي `Defect Density`)، لا FP.
د) تتبع تقدم الفريق دور `Process Metrics`، لا FP.

المحاضرة حددت ثلاثة أهداف رسمية لـ FP: قياس الوظائف المطلوبة والمقدَّمة، قياس التطوير والصيانة مستقلاً عن التقنية، وقياس متسق عبر المشاريع — كلها تصب في "قياس الحجم الوظيفي من منظور المستخدم".

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 115 (متوسط)
Which of the following metrics would be MOST relevant when assessing the maintainability of a software system?
أ) Number of defects found during testing.
ب) Lines of Code (LOC) in the entire system.
ج) Number of user stories completed per sprint.
د) Cyclomatic Complexity (CC) of individual modules.
**الإجابة الصحيحة: د**
**التعليل:**
CC تُستخدم كمؤشر داخلي مباشر ومحدد لصعوبة الصيانة (`Maintainability`) — كلما زاد عدد المسارات المستقلة داخل دالة، زاد صعوبة فهمها وتعديلها بأمان.

أ) عدد الأخطاء المكتشفة مقياس جودة عام، لا يعكس صعوبة الصيانة تحديداً.
ب) `LOC` للنظام كامل مقياس حجم بسيط لا يعكس التعقيد المحلي المؤثر فعلياً على كل وحدة.
ج) عدد قصص المستخدم المنجزة مقياس إنتاجية إدارية (Process `Metric`)، لا علاقة له بصعوبة صيانة الكود نفسه.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 116 (سهل)
What does the acronym "SLOC" typically stand for in software metrics?
أ) Standard Lines of Code
ب) System Lines of Code
ج) Structured Lines of Code
د) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
SLOC يعني فعلياً "Source `Lines of Code`" — أي أسطر الكود المصدري — وهذا الاختصار الصحيح غير موجود ضمن الخيارات الثلاثة الأولى المعطاة، لذلك الإجابة الصحيحة هي "لا شيء مما سبق".

أ) "Standard `Lines of Code`" ليس التوسيع الصحيح للاختصار.
ب) "System `Lines of Code`" ليس التوسيع الصحيح.
ج) "Structured `Lines of Code`" ليس التوسيع الصحيح أيضاً.

هذا مثال على سؤال يفحص دقة معرفة المصطلح الحرفي — SLOC هو ببساطة الاسم الكامل لـ `LOC` اللي شرحته المحاضرة (أسطر الكود المصدري)، وليس أياً من الخيارات المطروحة.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 117 (سهل)
When evaluating software metrics, it's crucial to consider:
أ) The specific context of the project and organization.
ب) The absolute values of the metrics without considering external factors.
ج) The opinions of individual developers regarding the usefulness of the metrics.
د) The latest industry trends and best practices without adapting them to the project's needs.
**الإجابة الصحيحة: أ**
**التعليل:**
المحاضرة أكدت أن العلاقة بين الصفات الداخلية (زي CC) والصفات الخارجية (زي `Maintainability`) هي علاقة "افتراضية وإحصائية"، مو حقيقة رياضية مؤكدة — يعني لازم تُفسَّر ضمن سياق المشروع تحديداً، لا كقيمة مطلقة معزولة.

ب) تجاهل العوامل الخارجية عكس ما تنصح به المحاضرة تماماً.
ج) الاعتماد على آراء فردية دون سياق موضوعي غير موثوق ومتقلّب.
د) تبنّي أحدث الاتجاهات "بدون تكييف" يناقض فكرة "السياق الخاص بكل مشروع" في السؤال نفسه.

مثال المحاضرة: برنامج بتعقيد عالٍ قد يكون فعلياً سهل الصيانة لو موثّق كويس — استثناء يوضح أهمية السياق، لا الاعتماد على الرقم المجرد وحده.

## المحاضرة 10: Software Requirements Specification (مواصفات متطلبات البرمجيات)

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 118 (متوسط)
What is the primary purpose of a `Software Requirements Specification` (`SRS`) document?
أ) To outline the project management strategy.
ب) To define the software architecture and design.
ج) To provide a detailed description of the software's intended capabilities and constraints.
د) To document the testing strategies and methodologies.
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة عرّفت `SRS` بأنه وثيقة تعمل مثل "مخطط البيت" — توثّق كل تفاصيل قدرات النظام المطلوبة وقيوده بدقة، عشان يكون فيه اتفاق واضح بين الفريق والعميل من البداية.

أ) استراتيجية إدارة المشروع دور `Project Plan`، وثيقة منفصلة تماماً.
ب) تصميم المعمارية يأتي لاحقاً بعد اكتمال `SRS`، في مرحلة Design.
د) استراتيجيات الاختبار موضوع منفصل (Test Plan).

المحاضرة استخدمت تشبيهاً واضحاً: `SRS` مثل مخطط بناء بيت مكتوب بالتفصيل — كم غرفة، وين الحمامات — عشان ما يصير خلاف بين العميل والمقاول لاحقاً.

## المحاضرة 11: Software Requirements Specification - 2 (وثيقة متطلبات البرمجيات - الجزء الثاني)

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 119 (سهل)
Which of the following is NOT typically included in a well-structured `SRS` document?
أ) Use case diagrams
ب) Glossary of terms
ج) Source code
د) System interfaces
**الإجابة الصحيحة: ج**
**التعليل:**
الكود المصدري (Source code) هو نتاج مرحلة التنفيذ اللاحقة، وليس جزءاً من وثيقة المتطلبات — `SRS` يصف "ماذا" يجب أن يفعل النظام، لا "كيف" يُنفَّذ الكود فعلياً.

أ) مخططات `use case` جزء أساسي من قسم `External Interfaces`/Functions في `IEEE 830`.
ب) قاموس المصطلحات هو قسم 1.3 (Definitions, Acronyms, Abbreviations) الرسمي في معيار `IEEE 830`.
د) واجهات النظام قسم 2.1.1/3.1 رسمي في المعيار.

المحاضرة أكدت مراراً أن المتطلبات تصف "ماذا" (What) وليس "كيف" (How) — والكود المصدري هو تجسيد الـ How بالكامل، ولذلك لا مكان له في `SRS`.

## المحاضرة 12: Software Quality (جودة البرمجيات)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 120 (سهل)
What is the measure of the ability of a software component to be transferred from one environment to another?
أ) Reusability
ب) Portability
ج) Interoperability
د) Scalability
**الإجابة الصحيحة: ب**
**التعليل:**
`Portability` هي الجهد المطلوب لنقل البرنامج لمنصة هاردوير أو سوفتوير مختلفة — أي بالضبط "القدرة على النقل من بيئة لبيئة".

أ) `Reusability` تخص إعادة استخدام مكوّن البرنامج ضمن مشروع آخر، مو نقله لبيئة مختلفة.
ج) `Interoperability` تخص قدرة البرنامج على التعاون مع برامج أخرى، مو أين يعمل هو نفسه.
د) Scalability لم تُذكر كعامل جودة أساسي في المحاضرة، والوصف لا يطابقها.

المحاضرة تفرّق بوضوح بين `Portability` ("أين يعمل البرنامج؟") و`Interoperability` ("مع من يتعاون؟") — وهذا الفرق نفسه يتكرر بصيغ مختلفة في أكثر من سؤال بنك الأسئلة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 121 (متوسط)
Which software quality attribute refers to the ability of a system to recover from failures and restore normal operation?
أ) Reliability
ب) Availability
ج) Usability
د) Maintainability
**الإجابة الصحيحة: ب**
**التعليل:**
"القدرة على التعافي من الأعطال واستعادة التشغيل الطبيعي" هي تعريف `Availability` (التوفّرية) في الأدبيات الهندسية العامة — وهي مرتبطة بمدى بقاء النظام متاحاً وقابلاً للاستخدام رغم حدوث أعطال.

أ) `Reliability` هي استمرار البرنامج بالعمل بدون فشل من الأساس (منع حدوث العطل)، وليس "التعافي بعده" — هذا فرق دقيق يميل الطلاب لتجاهله.
ج) `Usability` تخص سهولة الاستخدام والتعلّم، لا علاقة لها بالتعافي من الأعطال.
د) `Maintainability` تخص الجهد اللازم لإيجاد وإصلاح خلل في الكود، وهي أوسع من مجرد "استعادة التشغيل بعد عطل".

ملاحظة: هذه المحاضرة (12) عدّدت 12 عامل جودة رسمي ولم تذكر `Availability` كعامل مستقل ضمنهم صراحة — الإجابة هنا معتمدة على معرفة عامة قياسية في هندسة البرمجيات (`Reliability` مقابل `Availability`)، وليست اقتباساً حرفياً من نص المحاضرة.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 122 (متوسط)
What is the primary purpose of a software quality management plan?
أ) To identify and fix defects in the software
ب) To ensure that the software meets customer requirements
ج) To define the quality goals and processes for a project
د) To monitor project progress
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة عرّفت `Quality Plan` تحديداً بأنه وثيقة تحدد أهداف الجودة لكل مشروع وأي عمليات ومعايير ستُستخدم لتحقيقها — وهذا مطابق حرفياً لنص السؤال.

أ) تحديد وإصلاح الأخطاء هو دور `SQA`/Testing/Debugging العملي، وليس دور "الخطة" نفسها.
ب) تحقيق متطلبات العميل هدف أوسع (`Validation`)، لكن أداته المباشرة هي تنفيذ ما حددته خطة الجودة، لا الخطة نفسها كوثيقة.
د) متابعة تقدم المشروع دور `Project Plan` العام، مو `Quality Plan` تحديداً.

المحاضرة ربطت `SQM` (على المستوى التنظيمي والمشروع) مباشرة بوضع `Quality Plan` لكل مشروع تحدد أهدافه وعملياته ومعاييره الخاصة — وهذا هو جوهر السؤال.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 123 (سهل)
What is the measure of the degree to which a system can be used by specified users to achieve specified goals effectively, efficiently, and with satisfaction?
أ) Reliability
ب) Usability
ج) Maintainability
د) Portability
**الإجابة الصحيحة: ب**
**التعليل:**
هذا هو تعريف ISO القياسي لـ `Usability` تحديداً، وهو نفسه ما ذكرته المحاضرة ضمن عوامل الجودة الاثني عشر: "سهولة استخدام وتعلّم البرنامج" من منظور المستخدم النهائي.

أ) `Reliability` تخص استمرار العمل بدون فشل، لا علاقة مباشرة بسهولة الاستخدام أو الرضا.
ج) `Maintainability` تخص جهد المطوّر لإصلاح الخلل، مو تجربة المستخدم.
د) `Portability` تخص النقل بين البيئات، لا علاقة لها بسهولة الاستخدام.

المحاضرة صنّفت `Usability` كأحد أهم عوامل الجودة من "منظور المستخدم" تحديداً — إلى جانب `Correctness` و`Reliability` و`Security` وAdaptability.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 124 (سهل)
What is the measure of the ability of a software component to operate correctly in different operating environments?
أ) Reusability
ب) Portability
ج) Interoperability
د) Scalability
**الإجابة الصحيحة: ب**
**التعليل:**
"العمل بشكل صحيح في بيئات تشغيل مختلفة" هو بالضبط تعريف `Portability` — الجهد المطلوب لنقل البرنامج لمنصة هاردوير أو سوفتوير مختلفة والعمل عليها بنجاح.

أ) `Reusability` تخص إعادة استخدام المكوّن ضمن برنامج آخر، لا علاقة لها بالعمل في بيئات تشغيل مختلفة.
ج) `Interoperability` تخص التعاون مع أنظمة أخرى، لا "أين يعمل" النظام نفسه.
د) Scalability ليست من عوامل الجودة الاثني عشر المذكورة في المحاضرة.

هذا السؤال يكرر مفهوم `Portability` بصياغة مختلفة عن سؤال سابق في نفس الدورة (النقل من بيئة لأخرى) — تكرار متعمّد لتثبيت الفرق بين `Portability` و`Interoperability`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 125 (سهل)
Which of the following is NOT a characteristic of high-quality software?
أ) Reliability
ب) Maintainability
ج) Inefficiency
د) Usability
**الإجابة الصحيحة: ج**
**التعليل:**
عدم الكفاءة (Inefficiency) هو نقيض عامل الجودة `Performance` (الكفاءة في استخدام الذاكرة ودورات المعالج) اللي عدّدته المحاضرة ضمن عوامل الجودة الاثني عشر — فهو بالتعريف صفة سيئة، وليست خاصية للبرمجية عالية الجودة.

أ) `Reliability` عامل جودة أساسي مذكور صراحة.
ب) `Maintainability` عامل جودة أساسي مذكور صراحة.
د) `Usability` عامل جودة أساسي مذكور صراحة، خصوصاً من منظور المستخدم.

هذا سؤال مباشر يختبر معرفة قائمة عوامل الجودة الاثني عشر التي شرحتها المحاضرة، عبر عكس أحدها (`Performance` → Inefficiency) كخيار خاطئ واضح.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 126 (سهل)
What is the measure of the amount of effort required to understand, prepare, and modify a software component?
أ) Code coverage
ب) Software complexity
ج) Software maintainability
د) Software reliability
**الإجابة الصحيحة: ج**
**التعليل:**
هذا تعريف `Maintainability` بالضبط كما ذكرته المحاضرة ضمن عوامل الجودة الاثني عشر: "الجهد المطلوب لإيجاد وإصلاح خلل ما" — وفهم الكود وتحضيره وتعديله كلها جزء من هذا الجهد.

أ) `Code coverage` يقيس نسبة الكود المُختبَر، لا علاقة له بجهد الفهم والتعديل.
ب) Software complexity (زي `Cyclomatic Complexity`) مقياس داخلي يُستخدم كمؤشر على انخفاض `Maintainability`، لكنه ليس نفسه تعريف "الجهد المطلوب للفهم والتعديل".
د) Software `reliability` تخص استمرار العمل بدون فشل، لا علاقة مباشرة بجهد الفهم أو التعديل.

من منظور المطوّر (Developer's perspective) اللي شرحته المحاضرة، `Maintainability` هي أحد أهم خمسة عوامل تهمّه مباشرة، إلى جانب `Portability` وReadability وUnderstandability و`Testability`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 127 (متوسط)
What is the primary purpose of a software quality assurance process?
أ) To identify and fix defects in the software
ب) To ensure that the software meets customer requirements
ج) To improve the performance of the software
د) To monitor project progress
**الإجابة الصحيحة: ب**
**التعليل:**
Software `Quality Assurance` (`SQA`) حسب المحاضرة تعني "التأكد من أن نظام البرمجيات يحقق أهداف جودته المحددة" — وهذه الأهداف مرتبطة أساساً بتلبية احتياجات وتوقعات المستخدم الحقيقية، وفق تعريفي IEEE وISO للجودة اللذين ركّزا كلاهما على "متطلبات محددة رسمياً واحتياجات المستخدم الضمنية".

أ) `SQA` أوسع من مجرد "تحديد وإصلاح الأخطاء" — هذا دور Testing وDebugging تحديداً، وهما ركيزتان فقط من ركائز `SQA` الثلاث (مع Reviews).
ج) تحسين الأداء ليس هدف `SQA` المباشر.
د) متابعة تقدم المشروع دور إدارة المشروع، مو ضمان الجودة.

المحاضرة بيّنت أن `SQA` تقوم على ثلاث ركائز: Testing (ديناميكي)، Debugging، وReviews (ساكن) — وكلها أدوات لتحقيق الهدف الأشمل: التأكد أن النظام يلبي فعلاً ما يحتاجه المستخدم، لا فقط ما هو مكتوب حرفياً بالوثيقة.

**المصدر:** [نمط 2023-2024]
### السؤال 128 (متوسط)
Which software metric would be most useful for assessing the effectiveness of code reviews?
أ) Defect density
ب) Number of lines of code
ج) Percentage of code reviewed
د) Development cost
**الإجابة الصحيحة: ج**
**التعليل:**
تقييم فعالية Code Reviews (وهي أحد ركائز `SQA` الثلاث: Testing/Debugging/Reviews) يعتمد منطقياً على معرفة نسبة الكود الذي فعلاً خضع للمراجعة — وهذا مطابق للخيار C.

أ) `Defect Density` تقيس جودة المنتج النهائي بشكل عام، لا فعالية المراجعات تحديداً.
ب) عدد أسطر الكود مقياس حجم، لا علاقة له بفعالية المراجعة.
د) تكلفة التطوير خاصية إدارية عامة، لا تقيس فعالية المراجعات تحديداً.

المحاضرة صنّفت Reviews كتحليل ساكن (static analysis) يفحص الكود دون تشغيله — ولمعرفة مدى فعاليته، أول خطوة منطقية هي معرفة أي نسبة من الكود خضعت فعلاً لهذا الفحص.

## المحاضرة 13: Refactoring (إعادة هيكلة الكود)

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 129 (متوسط)
What is the primary purpose of code refactoring in software development?
أ) To fix defects in the code
ب) To improve the performance of the code
ج) To enhance the readability and maintainability of the code
د) To add new features to the code
**الإجابة الصحيحة: ج**
**التعليل:**
`Refactoring` هو تغيير البنية الداخلية للكود بدون تغيير سلوكه الخارجي، والهدف الأساسي منه أن يصبح البرنامج أسهل فهماً وتعديلاً (`maintainability`) عبر إزالة التكرار وتبسيط البنى المعقدة.

أ) تصحيح الأخطاء (bug fixing) نشاط مختلف تماماً — `Refactoring` لا يغيّر السلوك، فلا يمكن أن "يصحح" خطأ وظيفي (رغم أنه أحياناً يكشف bugs مصادفة أثناء التنظيف).
ب) تحسين الأداء ليس هدف `Refactoring` المباشر؛ قد يحصل كأثر جانبي أحياناً لكنه ليس الغاية.
د) إضافة ميزات جديدة تُستبعد صراحة من تعريف `Refactoring` — لأنها تغيّر السلوك الخارجي.

المحاضرة تؤكد بوضوح: الفيصل الحاسم بين `Refactoring` وأي نشاط آخر هو "هل تغيّر السلوك الخارجي؟" — لو تغيّر فهذا تطوير وليس `Refactoring`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 130 (سهل)
What is the primary goal of software reengineering?
أ) To add new features to an existing software system
ب) To improve the performance of an existing software system
ج) To enhance the maintainability of an existing software system
د) To rewrite an existing software system from scratch
**الإجابة الصحيحة: ج**
**التعليل:**
إعادة الهندسة (Reengineering) هدفها الأساسي تحسين قابلية صيانة نظام قديم عبر تحسين بنيته الداخلية، وهو نفس الفلسفة العامة اللي شرحتها محاضرة `Refactoring`: "نفس السلوك الخارجي، لكن بنية داخلية أفضل وأسهل صيانة".

أ) إضافة ميزات جديدة تغيّر السلوك الخارجي — هذا تطوير جديد، مو إعادة هندسة بالمعنى الكلاسيكي.
ب) تحسين الأداء قد يحدث كأثر جانبي، لكنه ليس الهدف المباشر.
د) إعادة الكتابة من الصفر (rewriting from scratch) نقيض إعادة الهندسة التدريجية — المحاضرة ميّزت صراحة بين `Refactoring`/Reengineering وبين "إعادة الكتابة الكاملة" كنشاطين مختلفين تماماً.

مبدأ "تحسين البنية الداخلية دون المساس بالسلوك الخارجي" اللي شرحته محاضرة `Refactoring` بالتفصيل ينطبق بشكل أوسع على مفهوم Reengineering ذاته.

## المحاضرة الكل: أسئلة عامة

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 131 (سهل)
Which software development approach focuses on delivering working software frequently, with a preference for face-to-face communication?
أ) Waterfall
ب) Agile
ج) Spiral
د) V-shaped
**الإجابة الصحيحة: ب**
**التعليل:**
هذا وصف شبه حرفي لمبادئ `Agile Manifesto`: "تسليم برمجيات شغّالة بشكل متكرر" و"التواصل وجهاً لوجه هو أفضل وسيلة لنقل المعلومات داخل الفريق".

أ) `Waterfall` لا يسلّم برمجية شغّالة إلا في نهاية المشروع.
ج) `Spiral` يركّز على المخاطر أكثر من التسليم المتكرر السريع.
د) `V-shaped` امتداد خطي لـ `Waterfall`.

هذا السؤال معرفة عامة عن `Agile`، مكمّلة لما تعلمناه في محاضرة `SDLC` عن فكرة "التسليم المتكرر" في `Iterative Enhancement`.

**المصدر:** [نمط 2023-2024 — الفصل الأول]
### السؤال 132 (سهل)
Which software development model emphasizes frequent customer collaboration and responding to change?
أ) Waterfall
ب) Agile
ج) Spiral
د) V-shaped
**الإجابة الصحيحة: ب**
**التعليل:**
هذا هو نص أحد أشهر أربعة قيم في `Agile Manifesto` مباشرة: "التعاون مع العميل" و"الاستجابة للتغيير" أهم من التعاقد الصارم والالتزام بخطة ثابتة.

أ) `Waterfall` يفترض أن كل المتطلبات ثابتة ومعروفة من البداية — عكس "الاستجابة للتغيير" تماماً.
ج) `Spiral` يتعامل مع المخاطر أكثر من كونه محوره "تعاون العميل المتكرر".
د) `V-shaped` امتداد خطي صارم لـ `Waterfall`.

معرفة عامة عن `Agile` تكمّل ما درسناه في محاضرة `SDLC` عن مشاكل `Waterfall` الأساسية (العميل يرى النتيجة متأخراً، لا يتكيّف مع التغيير) — و`Agile` جاء كحل مباشر لهذه المشاكل تحديداً.

**المصدر:** [نمط 2023-2024]
### السؤال 133 (متوسط)
What is the primary purpose of software metrics?
أ) To increase the number of lines of code
ب) To measure the performance of software development processes
ج) To create more documentation
د) To reduce the cost of software tools
**الإجابة الصحيحة: ب**
**التعليل:**
`Software Metrics` حسب المحاضرة الأولى تنقسم لـ `Process Metrics` (تقيس خصائص عملية التطوير مثل الإنتاجية والجودة) و`Product Metrics` (تقيس خصائص المنتج) — والغرض الأساسي منها هو قياس أداء وخصائص عملية التطوير بشكل موضوعي بدل الإحساس الشخصي.

أ) زيادة عدد أسطر الكود ليست هدفاً، بل `LOC` نفسه أحد المقاييس اللي تُقاس، مو غاية.
ج) إنشاء توثيق إضافي ليس هدف المقاييس؛ التوثيق منتج منفصل تماماً.
د) تقليل تكلفة الأدوات نتيجة جانبية محتملة، مو الهدف الأساسي.

المحاضرة عرّفت `Metrics` كسلسلة مترابطة (`Measure` → `Measurement` → `Metrics`) هدفها الأشمل قياس خصائص العملية أو المنتج بشكل رقمي موضوعي.

**المصدر:** [نمط 2023-2024]
### السؤال 134 (سهل)
Which document outlines the scope, objectives, and deliverables of a project?
أ) Risk Management Plan
ب) Project Charter
ج) Project Schedule
د) Resource Plan
**الإجابة الصحيحة: ب**
**التعليل:**
`Project Charter` هو المصطلح القياسي في إدارة المشاريع للوثيقة التي تحدد نطاق المشروع وأهدافه ومخرجاته الرئيسية بشكل رسمي في بدايته.

أ) خطة إدارة المخاطر تخص المخاطر فقط، لا نطاق المشروع كاملاً.
ج) جدول المشروع يخص التوقيت، لا النطاق والأهداف.
د) خطة الموارد تخص توزيع الموارد، لا نطاق المشروع.

ملاحظة: مصطلح "`Project Charter`" تحديداً لم يُستخدم بهذا الاسم في محاضرة إدارة المشاريع (اللي استخدمت مصطلح "`Project Plan`" الشامل من 14 بنداً بما فيها بند Scope الذي يحدد بدقة ما يتضمنه المشروع وما لا يتضمنه) — الإجابة معتمدة على معرفة عامة قياسية في إدارة المشاريع تكمّل مفهوم Scope الذي شرحته المحاضرة.

**المصدر:** [نمط 2023-2024]
### السؤال 135 (متوسط)
In `Agile` project management, what is the purpose of a Sprint Retrospective?
أ) To plan the next sprint
ب) To review and adjust the project backlog
ج) To evaluate the team's performance and discuss ways to improve
د) To demo the completed work to stakeholders
**الإجابة الصحيحة: ج**
**التعليل:**
Sprint Retrospective في منهجية Scrum هو اجتماع مخصَّص لتقييم أداء الفريق خلال السبرنت المنتهي ومناقشة ما يمكن تحسينه في السبرنتات القادمة.

أ) تخطيط السبرنت القادم هو Sprint Planning، اجتماع منفصل.
ب) مراجعة الـ backlog هي Backlog Refinement/Grooming، اجتماع مختلف.
د) عرض العمل المنجز على أصحاب المصلحة هو Sprint Review، اجتماع مختلف تماماً عن الـ Retrospective.

هذا سؤال معرفة عامة عن Scrum (لم تُغطَّ تفاصيله في محاضرات المادة)، لكنه يرتبط بفكرة "التحسين المستمر" العامة التي تتقاطع مع مبدأ `Refactoring` و`CMM` Level 5 (Optimizing) اللذين درسناهما.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 136 (سهل)
High Change `Failure Rate` in software development often indicates:
أ) Frequent and successful deployments
ب) Poor code quality or inadequate testing
ج) Rapid innovation and frequent updates
د) Efficient collaboration between teams
**الإجابة الصحيحة: ب**
**التعليل:**
Change `Failure Rate` هو مقياس DevOps قياسي يحسب نسبة التغييرات (نشرات/deployments) التي تسبب مشكلة في الإنتاج — ارتفاعه يدل على جودة كود ضعيفة أو اختبار غير كافٍ قبل النشر.

أ) نشرات "ناجحة" تعني بالضبط عكس "معدل فشل عالٍ".
ج) الابتكار السريع لا يعني بالضرورة فشلاً، بل معدل التغيير فقط؛ الفشل مرتبط بالجودة لا السرعة وحدها.
د) تعاون فعّال بين الفرق يُفترض أن يقلل الأخطاء، لا يرفع معدل الفشل.

ملاحظة: هذا مصطلح DevOps قياسي (أحد مقاييس DORA الأربعة) لم يُذكر بهذا الاسم تحديداً في محاضرات المادة، لكنه معرفة عامة قريبة من مفهوم `Failure Rate` و`Defect Density` اللي شرحتهما محاضرة `Measurement`.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 137 (سهل)
In an `SRS` document, which section would typically contain information about user roles and permissions?
أ) Functional Requirements
ب) Non-Functional Requirements
ج) System Architecture
د) Use Cases or User Stories
**الإجابة الصحيحة: د**
**التعليل:**
أدوار المستخدمين وصلاحياتهم (زي Public Mode وPrivate Mode وAdministration Mode في مثال مكتبة ACME الذي شرحته المحاضرة) تُوثَّق عادة عبر use cases مرتبطة بكل نوع مستخدم (actor)، حيث كل صلاحية تُترجَم لمجموعة use cases مسموحة لذلك الدور تحديداً.

أ) المتطلبات الوظيفية تصف الوظائف نفسها، لا بالضرورة من يملك صلاحية الوصول إليها.
ب) المتطلبات غير الوظيفية تصف جودة الأداء العام، لا الأدوار والصلاحيات تحديداً.
ج) معمارية النظام تصف البنية التقنية، لا صلاحيات المستخدمين.

المحاضرة شرحت مفهوم "الأوضاع" (modes) في قسم `Product Perspective` — حيث نفس النظام يتصرف بشكل مختلف حسب نوع المستخدم، وهذا التمايز في الصلاحيات يُوثَّق عملياً عبر use cases مخصصة لكل دور.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 138 (متوسط)
What is the purpose of an API?
أ) To provide a user interface for interacting with a software application.
ب) To define a set of rules and specifications that software components can follow to communicate with each other.
ج) To encrypt data transmitted over a network.
د) To manage the memory allocation of a software application.
**الإجابة الصحيحة: ب**
**التعليل:**
API (Application Programming Interface) هو مجموعة قواعد ومواصفات محددة تتيح لمكونات برمجية مختلفة (حتى لو كُتبت بلغات أو من فرق مختلفة) أن تتواصل مع بعضها بشكل موحّد ومتوقَّع.

أ) الواجهة الرسومية للمستخدم (GUI) شيء مختلف تماماً عن API الذي يخدم تواصل البرمجيات ببعضها لا مع المستخدم البشري مباشرة.
ج) تشفير البيانات وظيفة أمنية منفصلة، ليست تعريف API نفسه.
د) إدارة الذاكرة وظيفة نظام التشغيل/بيئة التشغيل، لا API.

هذا يرتبط بمفهوم "تحديد الواجهات" (Interfaces) اللي شرحته محاضرة Design and Implementation كخطوة خامسة من `OOD`: تحديد توقيعات ودلالات الخدمات فقط دون كشف كيفية تنفيذها الداخلي — وهذا جوهر أي API.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 139 (سهل)
What is the primary difference between white-box testing and black-box testing?
أ) White-box testing focuses on internal logic, while black-box testing focuses on input-output behavior.
ب) White-box testing is performed by end-users, while black-box testing is performed by developers.
ج) White-box testing requires knowledge of external systems, while black-box testing does not.
د) White-box testing is more cost-effective than black-box testing.
**الإجابة الصحيحة: أ**
**التعليل:**
هذا الفرق الجوهري تكرر في أكثر من محاضرة (Testing و`JUnit`): `White-box` يعتمد على معرفة البنية الداخلية للكود، بينما `Black-box` يعتمد فقط على العلاقة بين المدخلات والمخرجات المتوقعة حسب المواصفات، دون اعتبار للتنفيذ الداخلي.

ب) عكس الحقيقة الشائعة تماماً — كلاهما عادة ينفّذهما فريق اختبار تقني، والفرق في المنهجية لا في من ينفّذ.
ج) "معرفة أنظمة خارجية" ليست الفرق الجوهري بينهما؛ الفرق هو معرفة الكود الداخلي تحديداً.
د) لا توجد قاعدة عامة تجعل أحدهما دائماً أرخص من الآخر؛ يعتمد على السياق.

**المصدر:** [نمط 2024-2025 — الفصل الأول]
### السؤال 140 (سهل)
In response to the software crisis, which methodology was introduced to improve software development processes?
أ) Waterfall model
ب) Agile methodologies
ج) Spiral model
د) DevOps practices
**الإجابة الصحيحة: أ**
**التعليل:**
تاريخياً، `Waterfall Model` هو أول نموذج منظم رسمياً ظهر كاستجابة مباشرة لفوضى "`Build and Fix`" التي كانت سبباً رئيسياً في أزمة البرمجيات — فرض قاعدة "عرّف قبل أن تصمم، صمّم قبل أن تكتب الكود" لأول مرة بشكل منهجي.

ب) `Agile` ظهر لاحقاً بعقود (٢٠٠١) كردة فعل على مشاكل `Waterfall` نفسه، لا كاستجابة مباشرة لأزمة الستينات الأصلية.
ج) `Spiral Model` ظهر لاحقاً (1986) كتطوير أنضج يضيف تحليل المخاطر، بعد `Waterfall`.
د) ممارسات DevOps مفهوم حديث جداً (٢٠٠٠+)، بعيد زمنياً جداً عن أزمة الستينات.

المحاضرة وصفت `Waterfall` كـ"أقدم وأشهر نموذج منظم رسمياً"، وهو الحل التاريخي المباشر لفوضى `Build and Fix` اللي كانت جزءاً أساسياً من مسببات أزمة البرمجيات الأصلية.

## المحاضرة 2: Software Life Cycle Models (نماذج دورة حياة البرمجيات) (تابع — دورات لاحقة)

**المصدر:** [نمط 2025-2026]
### السؤال 141 (سهل)
V-model advantage over Waterfall for safety-critical (e.g., avionics)?
أ) Sequential like Waterfall
ب) Risk-focused spirals
ج) Early parallel testing per phase
د) Agile sprints
**الإجابة الصحيحة: ج**
**التعليل:**
الميزة الجوهرية لـ`V-Model` هي أنه يخطط لمرحلة اختبار مقابلة (`corresponding testing phase`) لكل مرحلة تطوير منذ البداية (مثلاً: مواصفات النظام ↔ اختبار القبول، التصميم ↔ اختبار التكامل) — أي تخطيط الاختبار المبكر والمتوازي مع كل مرحلة تطوير، لا تأجيله لنهاية المشروع كما في `Waterfall` التقليدي.

أ) كونه خطياً متسلسلاً مثل `Waterfall` هو تشابه بينهما لا ميزة إضافية لـ`V-Model` عليه.
ب) التركيز على المخاطر عبر لفات حلزونية هو تحديداً وصف `Spiral Model`، لا `V-Model`.
د) دورات `Agile` القصيرة (`sprints`) مفهوم مختلف تماماً عن `V-Model` الخطي.

ملاحظة: `V-Model` لم يُشرح بالتفصيل في محاضرة `SDLC Models` (اللي غطّت `Build&Fix, Waterfall, Prototyping, Iterative Enhancement, Evolutionary, Spiral`)، والإجابة معتمدة على معرفة عامة قياسية عن `V-Model` كامتداد مباشر لفكرة `Waterfall` مع تخطيط اختبار مبكر.

**المصدر:** [نمط 2025-2026]
### السؤال 142 (سهل)
Prototype model: Client rejects initial UI after feedback, next step?
أ) Discard, restart Waterfall
ب) Deploy as is
ج) Throwaway, build final from scratch
د) Refine iteratively (evolutionary)
**الإجابة الصحيحة: د**
**التعليل:**
حسب دورة `Prototyping Model` اللي شرحتها المحاضرة: العميل يجرّب النموذج التجريبي، وبناءً على ملاحظاته (`evaluation`) يقوم المطورون بتنقيح المتطلبات (`refinement`) وإعادة الدورة إذا لزم الأمر — أي رفض الواجهة الأولية يعني ببساطة تكرار دورة أخرى من التنقيح، لا إلغاء المشروع بالكامل.

أ) إلغاء كل شيء وإعادة البدء بـ`Waterfall` مبالغة غير ضرورية؛ التنقيح التكراري هو بالضبط آلية `Prototyping` المصمَّمة لهذه الحالة تحديداً.
ب) نشر واجهة رُفضت من العميل مباشرة يناقض جوهر النموذج (الهدف هو التحقق قبل البناء النهائي).
ج) الانتقال المباشر لبناء النسخة النهائية من الصفر يتجاهل قيمة التنقيح التكراري القريب المتاح أولاً.

المحاضرة أكدت أن النموذج التجريبي بأكمله يُرمى لاحقاً في النهاية، لكن *قبل* الوصول لتلك المرحلة، الدورة تتكرر (تنقيح ← تقييم ← تنقيح) حتى نصل لمواصفة نهائية يوافق عليها العميل — وهذا بالضبط ما يصفه الخيار D.

**المصدر:** [نمط 2025-2026]
### السؤال 143 (سهل)
Throwaway Prototype: Primary goal?
أ) Production-ready software
ب) Risk-free req. validation, discard
ج) Incremental delivery
د) Full Agile cycles
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة أكدت أن الهدف الحقيقي من `Prototyping` هو الخبرة والمعرفة المكتسبة أثناء تجريب النموذج مع العميل للتحقق من المتطلبات (`requirements validation`) بأقل مخاطرة ممكنة، وبعدها يُرمى النموذج بالكامل (`thrown away`) لأن بنيته الداخلية لم تُصمَّم بجودة كافية أصلاً.

أ) النموذج التجريبي عمداً منخفض الأداء والموثوقية — ليس المقصود منه أن يكون جاهزاً للإنتاج إطلاقاً.
ج) التسليم التدريجي (`Incremental delivery`) وصف `Iterative Enhancement`، لا `Prototyping`.
د) دورات `Agile` الكاملة مفهوم مختلف تماماً.

هذا يطابق حرفياً أهم نقطة أكدتها المحاضرة عن `Prototyping`: كود النموذج التجريبي بأكمله يُرمى، والفائدة الحقيقية هي الخبرة المكتسبة، لا المنتج نفسه.

**المصدر:** [نمط 2025-2026]
### السؤال 144 (سهل)
Incremental model: 10 features, deliver after every 27 Risk if late features change early?
أ) Low, isolated increments
ب) High architecture rework
ج) None, full plan upfront
د) Agile daily adapts
**الإجابة الصحيحة: أ**
**التعليل:**
في `Iterative Enhancement` (النموذج التزايدي)، كل زيادة (`increment`) مبنية بشكل شبه مستقل فوق الإصدارات السابقة — وبالتالي لو تغيّرت متطلبات ميزات لاحقة، الأثر على الزيادات المبكرة اللي سُلِّمت واستُخدمت فعلياً يبقى منخفضاً ومحصوراً (`low, isolated`)، لأنها لا تعتمد بشكل كامل على تفاصيل الميزات المستقبلية.

ب) إعادة هيكلة معمارية كبيرة عكس فكرة الزيادات المستقلة القابلة للتسليم في هذا النموذج.
ج) "لا خطة إطلاقاً" يناقض فكرة `Work Breakdown` المسبقة اللي تحدد الزيادات أصلاً قبل البدء.
د) "التكيّف اليومي" وصف أقرب لممارسات `Agile` اليومية (`daily standups`)، لا `Incremental Model` الكلاسيكي بحد ذاته.

هذا يربط بفائدة `Iterative Enhancement` الأساسية اللي شرحتها المحاضرة: تسليم قيمة حقيقية للعميل بسرعة وبشكل متكرر عبر إصدارات مستقلة نسبياً، بدل انتظار المشروع كله دفعة واحدة.

**المصدر:** [نمط 2025-2026]
### السؤال 145 (سهل)
Iterative model vs Incremental: Iterative bulks/refines same product repeatedly; Incremental?
أ) Same, synonymous
ب) Spiral tasks only
ج) throwaway each iter
د) Deliver growing functional subsets
**الإجابة الصحيحة: د**
**التعليل:**
`Incremental Model` (`Iterative Enhancement` بمصطلح المحاضرة) يسلّم في كل دورة زيادة وظيفية جديدة تُضاف فوق الإصدارات السابقة — أي مجموعات وظيفية متنامية (`growing functional subsets`) قابلة للاستخدام الفعلي في كل مرة.

أ) "مترادفان تماماً" خطأ شائع حذّرت منه المحاضرة صراحة — الفرق الحقيقي هو "متى يصبح المنتج قابلاً للاستخدام فعلياً".
ب) الربط بـ`Spiral` حصراً غير دقيق؛ `Incremental` مفهوم مستقل عن `Spiral`.
ج) رمي كل تكرار (`throwaway each iteration`) وصف `Prototyping`، لا `Incremental`.

ملاحظة: صياغة السؤال هنا تصف "Iterative" بأنه يكرر/ينقّح نفس المنتج (وهذا أقرب فعلياً لتعريف `Evolutionary Development` في مصطلحات المحاضرة)، بينما "Incremental" الذي يسلّم إصدارات متنامية قابلة للاستخدام هو تحديداً ما سمّته المحاضرة `Iterative Enhancement` — قد يوجد تضارب تسمية بين مصادر مختلفة، لكن التعريف الوظيفي في الخيار D يطابق مفهوم `Incremental` القياسي في أغلب الأدبيات.

**المصدر:** [نمط 2025-2026]
### السؤال 146 (سهل)
V-model drawback for large evolving reqs (e.g., web app)?
أ) No testing
ب) Rigid sequence, late changes costly
ج) No prototypes
د) Agile-like
**الإجابة الصحيحة: ب**
**التعليل:**
`V-Model` امتداد خطي صارم لـ`Waterfall` — يفترض معرفة المتطلبات بدقة من البداية، وبالتالي أي تغيير متأخر في متطلبات متطورة باستمرار (زي تطبيق ويب حديث) يصبح مكلفاً جداً بسبب التسلسل الصارم غير المرن.

أ) `V-Model` يخطط للاختبار بشكل مبكر ومكثّف أصلاً (هذا ميزته لا عيبه)، فليس "غياب الاختبار" هو المشكلة.
ج) غياب النماذج التجريبية (`prototypes`) صحيح جزئياً كوصف، لكنه ليس العيب الجوهري الأكبر المرتبط بـ"المتطلبات المتطورة باستمرار" تحديداً.
د) `V-Model` هو عكس `Agile-like` تماماً — خطي صارم، لا مرن ومتكرر.

هذا نفس عيب `Waterfall` الأساسي اللي شرحته المحاضرة (يفترض معرفة كاملة للمتطلبات من البداية) — و`V-Model` يرث هذا العيب لأنه امتداد لنفس الفلسفة الخطية.

**المصدر:** [نمط 2025-2026]
### السؤال 147 (سهل)
Throwaway Prototype -> Evolutionary difference?
أ) Both discarded
ب) Throwaway risks higher
ج)Evolutionary refined to product
د) Same model
**الإجابة الصحيحة: ج**
**التعليل:**
في `Evolutionary Development`، النموذج/المخرجات تتطور تدريجياً *لتصبح* المنتج النهائي نفسه (لا يُرمى شيء)، بينما في `Throwaway Prototyping` يُرمى النموذج بالكامل بعد انتهاء دوره الاستكشافي ويُبنى المنتج النهائي من الصفر.

أ) "كلاهما يُرمى" خطأ مباشر — `Evolutionary` لا يرمي شيئاً، بل يبني فوق ما سبق تدريجياً.
ب) "مخاطرة أعلى" مقارنة غير دقيقة وغير مرتبطة بجوهر الفرق الحقيقي بين النموذجين (وهو "هل يُرمى أم يتطور؟").
د) "نفس النموذج" خطأ مباشر — الفرق الجوهري الذي أكدته المحاضرة هو بالضبط ما إذا كان العمل يُرمى أو يُبنى عليه.

المحاضرة حذّرت صراحة من الخلط بين هذين النموذجين المتشابهين شكلياً (كلاهما دائري/تكراري) لكن مختلفين تماماً في المصير النهائي للكود المنتَج.

**المصدر:** [نمط 2025-2026]
### السؤال 148 (سهل)
Incremental suitable when? (Partial delivery ok, hue reqs stable)
أ) Yes, builds on prior
ب) No, full system only (Waterfall)
ج) High risk (Spiral)
د) UI exploration (Proto)
**الإجابة الصحيحة: أ**
**التعليل:**
`Incremental`/`Iterative Enhancement` مناسب تماماً عندما يكون التسليم الجزئي (`partial delivery`) مقبولاً والمتطلبات مستقرة نسبياً — كل زيادة تبني فوق الإصدارات السابقة (`builds on prior`) وتُسلَّم كمنتج قابل للاستخدام فعلياً.

ب) الإصرار على "النظام الكامل فقط" وصف `Waterfall`، عكس مرونة `Incremental` في التسليم الجزئي.
ج) المخاطر العالية سياق `Spiral`، لا `Incremental` تحديداً.
د) استكشاف الواجهة سياق `Prototyping`، لا `Incremental`.

## المحاضرة 3: Software Requirements (متطلبات البرمجيات) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 149 (متوسط)
Which type of requirement is concerned with how the system should respond to a particular input?
أ) Functional requirement
ب) Performance requirement
ج) Security requirement
د) Usability requirement
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
المتطلب الوظيفي (`Functional requirement`) يصف تحديداً "ماذا" يفعل النظام استجابة لمدخل معيّن — أي سلوك الاستجابة نفسه لمدخل محدد، وهذا هو التعريف الأساسي لـ`Functional Requirements` كما شرحته المحاضرة.

ب) متطلب الأداء يخص سرعة/كفاءة الاستجابة (مثل زمن الاستجابة)، لا "ماذا" يحدث فعلياً كنتيجة للمدخل.
ج) متطلب الأمان يخص حماية البيانات والوصول، لا الاستجابة الوظيفية لمدخل عادي.
د) متطلب سهولة الاستخدام يخص تجربة المستخدم العامة، لا استجابة محددة لمدخل واحد.

المحاضرة فرّقت بوضوح: الوظيفي يجاوب "شنو النظام يسوي؟" — وهذا يشمل تحديداً كيف يستجيب النظام لكل مدخل محدد يستقبله.

**المصدر:** [نمط 2025-2026]
### السؤال 150 (متوسط)
How does OCL enhance traceability in requirements engineering?
أ) OCL replaces stakeholder interviews
ب) By documenting precise constraints linked to requirements, creating explicit trace chains from models to specifications
ج) OCL is less expressive than natural language
د) Traceability is unrelated in OCL
ه) Traceability is automatic in UML
**الإجابة الصحيحة: ب**
**التعليل:**
توثيق قيود `OCL` الدقيقة المرتبطة مباشرة بمتطلبات محددة يخلق سلاسل تتبع صريحة (`explicit trace chains`) من النماذج (`models`) إلى المواصفات (`specifications`) الأصلية — وهذا تطبيق مباشر لمفهوم `Traceability` اللي شرحته محاضرة إدارة المتطلبات (ربط كل متطلب بمصدره وتنفيذه).

أ) `OCL` لا تلغي الحاجة لمقابلات أصحاب المصلحة (`stakeholder interviews`)؛ هي أداة توثيق وتحقق لاحقة، لا استخراج أولي للمتطلبات.
ج) `OCL` أكثر دقة (`precise`) من اللغة الطبيعية تحديداً، لا أقل تعبيراً منها — هذا عكس الحقيقة.
د) `Traceability` مرتبطة جداً بـ`OCL` عبر ربط القيود بمصدرها.
ه) `Traceability` ليست تلقائية في `UML` وحده؛ تحتاج توثيقاً وربطاً صريحاً (زي `OCL` أو مصفوفة التتبع).

**المصدر:** [نمط 2025-2026]
### السؤال 151 (متوسط)
When performing requirements analysis, what technique helps resolve ambiguous and incomplete requirements for complex systems?
أ) Postpone until coding begins.
ب) Use of prototypes and scenarios to clarify and validate requirements, Teratively.
ج) Ignore ambiguity initially.
د) Rely solely on documentation.
ه) Limit stakeholder involvement.
**الإجابة الصحيحة: ب**
**التعليل:**
المحاضرة أكدت أن النمذجة الأولية (`Prototyping`) وأسلوب السيناريوهات (`scenarios`, زي `use cases`) هما تحديداً الأداتان اللي تساعدان على كشف الغموض بشكل تكراري (`iteratively`) — مثال كلمة "search" الشهير أثبت أن الغموض يظهر بوضوح فقط عند التجربة الفعلية مع المستخدم عبر نموذج أو سيناريو ملموس.

أ) تأجيل حل الغموض لمرحلة الكود مكلف جداً (تصحيح خطأ متطلبات في الصيانة يكلّف 100 ضعف تصحيحه في مرحلة الجمع).
ج) تجاهل الغموض عمداً في البداية يضاعف المخاطرة لاحقاً بدل حلها.
د) الاعتماد فقط على التوثيق النصي هو بالضبط ما فشل في مثال "search" — النص وحده لم يمنع سوء الفهم.
ه) تقليل مشاركة أصحاب المصلحة يقلل المعلومات المتاحة لحل الغموض، عكس المطلوب.

هذا يربط مباشرة بفحوصات `Validation` الخمسة اللي شرحتها المحاضرة، وتحديداً تقنية "`prototyping` لكشف الغموض" المذكورة صراحة كإحدى تقنيات تطبيق هذه الفحوصات.

**المصدر:** [نمط 2025-2026]
### السؤال 152 (سهل)
During requirement elicitation, ambiguous domain language causes misunderstandings. What is the most effective mitigation?
أ) Skip formal documentation to maintain agility.
ب) Use domain modeling techniques such as UML and glossary establishment.
ج) Exclude less knowledgeable stakeholders.
د) Increase coding prototyping early.
ه) Rely on developers' interpretations.
**الإجابة الصحيحة: ب**
**التعليل:**
بناء نموذج للمجال (`domain modeling`, زي مخططات `UML`) مع إنشاء قاموس مصطلحات (`glossary`) — تماماً كقسم `1.3 Definitions, Acronyms, Abbreviations` اللي شرحته محاضرة `SRS` — يحل جذرياً مشكلة اللغة الغامضة عبر تعريف كل مصطلح رسمياً بمعنى واحد متفق عليه بين كل الأطراف.

أ) تخطي التوثيق الرسمي بحجة "المرونة" يزيد الغموض بدل حله؛ حتى `Agile` يحتاج حداً أدنى من التوضيح المشترك.
ج) استبعاد أصحاب المصلحة الأقل معرفة تقنية يفقد معلومات مجال حقيقية مهمة (هم بالضبط من يفهمون المجال، لا التقنية).
د) بناء نموذج برمجي مبكر (`coding prototyping`) خطوة تنفيذية سابقة لأوانها لمشكلة لغوية بحتة؛ الأنسب أولاً هو `prototypes`/`scenarios` وصفية لا برمجية.
ه) الاعتماد على تفسير المطورين الشخصي هو بالضبط مصدر الخطر — كل طرف قد يفسّر المصطلح الغامض بطريقة مختلفة (تماماً كمثال "search" الشهير).

مثال المحاضرة الشهير (كلمة "search" فُهمت بطريقتين متعارضتين) هو الدليل المباشر على أن حل الغموض اللغوي يحتاج تعريفاً رسمياً صريحاً (`glossary`/`domain model`)، لا الاعتماد على الفهم الضمني لأي طرف بمفرده.

## المحاضرة 4: Design and Implementation (التصميم والتنفيذ) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 153 (متوسط)
What is the primary purpose of a Work Breakdown Structure (WBS) in software project management?
أ) To allocate resources to project tasks
ب) To define the project scope and objectives
ج) To estimate the project budget
د) To decompose project deliverables into manageable components
و) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
`WBS` (Work Breakdown) حسب محاضرة إدارة المشاريع يقسّم مخرجات المشروع لمراحل (`Phases`) ثم خطوات (`Steps`) ثم أنشطة (`Activities`) دقيقة قابلة للتنفيذ والإسناد لشخص واحد — أي تجزئة العمل الكلي لأعمال مستقلة أصغر وأسهل إدارة.

أ) توزيع الموارد نتيجة لاحقة تستفيد من `WBS`، لكن ليست الغرض المباشر منه.
ب) تعريف النطاق والأهداف يسبق `WBS` عادة (يُستخدم كمدخل له)، لا هو نفسه.
ج) تقدير الميزانية نشاط لاحق يعتمد على `WBS` لكن ليس غرضه الأساسي.

هذا مطابق تماماً لمثال المحاضرة (بناء بيت): `Project` → `Phases` (تجهيز الأرض، بناء البيت) → `Steps` (تنظيف الأرض، زراعة العشب) → `Activities` (إزالة الأشجار، إزالة الجذوع).

**المصدر:** [نمط 2025-2026]
### السؤال 154 (متوسط)
How does modular design or asset facilitate efficient configuration management in agile projects?
أ) Only centralized repositories matter.
ب) Configuration management eliminates modularity benefits.
ج) Modular design requires no version control.
د) Modular design increases configuration overhead development with minimized impact.
ه) Modules allow isolated versioning and parallel development with minimized impact.
**الإجابة الصحيحة: ه**
**التعليل:**
التصميم المعياري (`Modular design`) يتيح لكل وحدة (`module`) أن تُصدَر وتُدار إصداراتها بشكل منفصل عن باقي الوحدات، وهذا يسمح بتطوير متوازٍ (`parallel development`) بأثر جانبي محدود على باقي النظام — وهذا بالضبط جوهر `Configuration Management` اللي شرحته محاضرة `Design and Implementation` عبر أنشطته الثلاثة (إدارة النسخ، دمج النظام، تتبع المشاكل).

أ) المستودعات المركزية جزء واحد من الأدوات (زي `Subversion`)، لكنها ليست العامل الوحيد المهم.
ب) عكس الحقيقة تماماً — `Configuration Management` يدعم فوائد المعيارية، لا يلغيها.
ج) التصميم المعياري لا يعني إطلاقاً الاستغناء عن التحكم بالإصدار؛ بل يحتاجه أكثر لتتبع كل وحدة بدقة.
د) زيادة العبء الإداري بدون فائدة يناقض الفكرة العملية الأساسية للمعيارية.

هذا يربط مباشرة بأنشطة `Configuration Management` الثلاثة اللي شرحتها المحاضرة: إدارة النسخ تمكّن تتبع كل مكوّن على حدة، ودمج النظام يحدد أي نسخ استُخدمت لبناء كل إصدار — وكلاهما أسهل بكثير مع تصميم معياري واضح.

**المصدر:** [نمط 2025-2026]
### السؤال 155 (متوسط)
What is the impact of poor version control practices on software testing and defect resolution?
أ) No significant effect if developers write good code.
ب) Improves testing speed.
ج) Eliminates need for automated tests, and integrated defects.
د) Only affects startups.
ه) Causes integration conflicts, unreliable builds, and impaired defect traceability.
**الإجابة الصحيحة: ه**
**التعليل:**
ضعف ممارسات التحكم بالإصدار (`Version Control`) يؤدي مباشرة لتعارضات دمج (`integration conflicts`) عند العمل الجماعي المتوازي، وبناءات غير موثوقة (`unreliable builds`) بسبب دمج نسخ خاطئة، وصعوبة تتبع مصدر أي خلل (`impaired defect traceability`) — وهذا بالضبط ما تحله أنشطة `Configuration Management` الثلاثة اللي شرحتها المحاضرة.

أ) حتى المطورين الجيدين يحتاجون تحكماً بالإصدار عند العمل الجماعي؛ جودة الكود الفردي لا تلغي الحاجة له.
ب) عكس الحقيقة تماماً — ضعف التحكم بالإصدار يبطئ الاختبار بسبب الالتباس حول أي نسخة قيد الاختبار فعلياً.
ج) عكس المنطق تماماً — ضعف التحكم بالإصدار يزيد الحاجة للاختبار الآلي، لا يلغيه.
د) المشكلة تصيب أي مشروع جماعي بغض النظر عن حجم الشركة، لا الشركات الناشئة فقط.

المحاضرة ذكرت أدوات `ClearCase` و`Subversion` و`BugZilla` تحديداً لحل هذه المشاكل الثلاث — غيابها أو ضعف تطبيقها يعيد فتح كل هذه المشاكل مجدداً.

**المصدر:** [نمط 2025-2026]
### السؤال 156 (صعب)
You notice configuration drift in production environment causing intermittent failures unique to some releases, beyond fixing development scripts, What configuration management practices would you enhance?
أ) Ignore drift, focus on source code.
ب) Institute infrastructure-as-code, enforce configuration baselines, and use automated auditing tools to detect and prevent drift proactively.
ج) Increase manual confirmation checks..
د) Reduce frequency of deployments.
**الإجابة الصحيحة: ب**
**التعليل:**
اعتماد `Infrastructure-as-Code` (توصيف البنية التحتية كملفات كود قابلة للتتبع)، وفرض خطوط أساس تهيئة موحّدة (`configuration baselines`)، مع أدوات تدقيق آلية (`automated auditing tools`) لاكتشاف ومنع الانحراف (`drift`) قبل وقوعه — هذا امتداد مباشر لأنشطة `Configuration Management` الثلاثة اللي شرحتها المحاضرة (إدارة النسخ، دمج النظام، تتبع المشاكل) لكن على مستوى بيئة التشغيل (`environment`) لا الكود فقط.

أ) تجاهل الانحراف والتركيز على الكود المصدري فقط يتجاهل جذر المشكلة الفعلي (بيئة التشغيل نفسها).
ج) الفحص اليدوي المتكرر حل غير قابل للتوسع ومعرَّض للخطأ البشري، عكس الأتمتة الاستباقية المطلوبة.
د) تقليل تكرار عمليات النشر يقلل الفرصة لاكتشاف الانحراف مبكراً، لا يحل مشكلته الجذرية.

هذا امتداد منطقي لمبدأ `Configuration Management` اللي شرحته محاضرة `Design and Implementation`: تتبع كل نسخة ومنع دمج/تشغيل نسخ غير متوافقة — يُطبَّق هنا على تهيئة بيئة الإنتاج بدل الكود وحده.

**المصدر:** [نمط 2025-2026]
### السؤال 157 (TODO — متوسط)
When planning software reuse, what challenge often arises when integrating third-party components into an existing architecture?
أ) Automatic adherence to coding standards.
**الإجابة الصحيحة: TODO**
**التعليل:**
هذا السؤال ناقص/تالف في الاستخراج بشكل واضح جداً: يحتوي فقط على خيار واحد (A)، بينما بقية الخيارات (B, C, D...) والإجابة الصحيحة مفقودة تماماً من النص المصدر. الخيار الوحيد المتاح (A: "الالتزام التلقائي بمعايير الترميز") غير منطقي أصلاً كـ"تحدٍّ" (المفروض يكون تحدياً سلبياً يواجه الفريق، لا نتيجة إيجابية تلقائية) — ما يرجّح أنه كان أحد الخيارات الخاطئة (`distractor`) في سؤال أكبر فُقدت بقيته أثناء الاستخراج.

بما أن السؤال غير مكتمل جوهرياً (ناقص أغلب خياراته اللازمة لفهم السياق الكامل واختيار إجابة صحيحة)، يُترك TODO تماماً بدل محاولة تخمين إجابة من نص جزئي غير كافٍ إطلاقاً لتحديد المقصود الفعلي بالسؤال.

## المحاضرة 5: Software Testing (اختبار البرمجيات) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 158 (سهل)
In black-box testing, test cases are designed based on:
أ) Internal code structure
ب) User requirements and specifications
ج) Code implementation details
د) Integration points between modules
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`Black-box testing` يصمَّم حالات الاختبار بناءً فقط على متطلبات المستخدم والمواصفات الخارجية (المدخلات والمخرجات المتوقعة)، دون أي اعتبار لكيفية تنفيذ الكود داخلياً.

أ) البنية الداخلية للكود أساس `White-box testing`، عكس `Black-box` تماماً.
ج) تفاصيل التنفيذ (`implementation details`) تخص `White-box` أيضاً.
د) نقاط التكامل بين الوحدات تخص `Integration testing`، لا `Black-box` تحديداً.

هذا التمييز (المواصفات الخارجية مقابل الكود الداخلي) هو جوهر الفرق بين `Black-box` و`White-box` المتكرر في بنك الأسئلة بأكمله.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 159 (سهل)
Regression testing is performed to:
أ) Validate newly added features
ب) Verify that the system meets user requirements
ج) Ensure that changes do not adversely affect existing functionality
د) Test for performance bottlenecks
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة عرّفت `Regression Testing` بأنه إعادة تشغيل اختبارات سابقة كل مرة يُعدَّل فيها الكود، للتأكد أن التعديل الجديد لم "يكسر" ميزة كانت تعمل بشكل صحيح سابقاً — مطابق حرفياً لنص السؤال.

أ) اختبار الميزات الجديدة تحديداً نشاط تطوير مختلف تماماً، لا `Regression`.
ب) التحقق من تلبية متطلبات المستخدم أقرب لـ`Validation`/`Acceptance Testing`، لا `Regression` تحديداً.
د) اختبار اختناقات الأداء موضوع `Performance/Stress Testing` منفصل تماماً.

المحاضرة أكدت أن الفائدة الكبرى للأتمتة تظهر بوضوح في `Regression Testing` — لأن إعادة هذا يدوياً مئات المرات مستحيلة عملياً، بينما الأتمتة تجعله سريعاً وممكناً.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 160 (سهل)
Which testing technique is most suitable for finding defects related to boundary values and equivalence partitioning?
أ) White-box testing
ب) Black-box testing
ج) Grey-box testing
د) Regression testing
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`Partition Testing` و`Boundary Value Analysis` — التقنيتان اللي شرحتهما المحاضرة بالتفصيل — تُبنى أساساً من مواصفات البرنامج (`program specification`) ووثائق المستخدم، أي بدون الحاجة لمعرفة الكود الداخلي، وهذا يجعلهما تقنيتين من عائلة `Black-box testing`.

أ) `White-box` يعتمد الكود الداخلي، بينما `Partition`/`Boundary Value` مبنيتان على المواصفات الخارجية.
ج) `Grey-box` يحتاج معرفة جزئية بالداخل، غير ضرورية هنا.
د) `Regression testing` يخص إعادة اختبار بعد تعديل، لا اختيار حالات اختبار حدودية جديدة.

المحاضرة شرحت أن تحديد الـ`partitions` يعتمد على مصادر ثلاثة: مواصفات البرنامج، وثائق المستخدم، أو الخبرة العملية — وكلها مصادر خارجية لا تتطلب معرفة الكود الداخلي، وهذا جوهر `Black-box`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 161 (سهل)
Which testing approach focuses on the behavior and functionality of the software without considering its internal structure?
أ) White-box testing
ب) Black-box testing
ج) Grey-box testing
د) Integration testing
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`Black-box testing` بالتعريف يركّز فقط على السلوك والوظائف الظاهرة للنظام (المدخلات والمخرجات)، دون أي اعتبار للبنية الداخلية — مطابق حرفياً لنص السؤال.

أ) `White-box` عكسه تماماً — يعتمد البنية الداخلية أساساً.
ج) `Grey-box` معرفة جزئية بالداخل، وليس "بدون اعتبار" تماماً كما ينص السؤال.
د) `Integration testing` يخص تفاعل المكونات، وليس بالضرورة "بدون اعتبار للبنية الداخلية".

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 162 (سهل)
The main goal of validation in software testing is to:
أ) Ensure that the system works correctly with other systems
ب) Verify that the system meets specified requirements
ج) Test individual units or modules of code
د) Ensure that defects are identified and fixed early
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`Validation` حسب المحاضرة تجاوب على سؤال "هل نبني المنتج الصحيح؟" — أي التأكد أن النظام يلبّي فعلاً احتياجات وتوقعات العميل الحقيقية، وهذا يشمل التحقق من مطابقته للمتطلبات المحددة.

أ) العمل الصحيح مع أنظمة أخرى أقرب لـ`Interoperability`، وليس تعريف `Validation` العام.
ج) اختبار وحدات فردية هو `Unit Testing`، مستوى مختلف تماماً عن مفهوم `Validation` الأشمل.
د) تحديد وإصلاح الأخطاء مبكراً هدف `Development Testing` عموماً، لا تعريف `Validation` تحديداً.

المحاضرة فرّقت بوضوح بين `Validation` ("هل بنينا الصحيح؟") و`Verification` ("هل بنيناه صح؟") — والسؤال هنا يخص `Validation` تحديداً.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 163 (سهل)
Boundary value analysis and equivalence partitioning are techniques primarily associated with which type of testing?
أ) System testing
ب) Acceptance testing
ج) Integration testing
د) Black-box testing
و) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
كما شرحت المحاضرة، `Boundary Value Analysis` و`Partition Testing` (وهو نفسه `Equivalence Partitioning`) تُبنيان من مواصفات البرنامج ووثائق المستخدم — أي بدون معرفة الكود الداخلي، وهذا يصنّفهما ضمن عائلة `Black-box testing` تحديداً، وليس أي مستوى اختبار معيّن (Unit/System/Acceptance).

A, B, C) هذه مستويات اختبار (`levels`) تُطبَّق فيها تقنيات `Black-box` (من ضمن أخرى)، لكنها ليست هي نفسها "نوع" التقنية المطلوب هنا.

المحاضرة أكدت أن أفضل القيم للاختبار داخل أي `partition` هي القيم الحدودية (`Boundary Values`) — لأن أشهر أخطاء `off-by-one` تظهر فقط عند هذه الحدود.

**المصدر:** [نمط 2025-2026]
### السؤال 164 (سهل)
Black-box technique for workflow/GUI Best?
أ) Path coverage
ب) State transition testing
ج) Loop unrolling
د) Data flow
**الإجابة الصحيحة: ب**
**التعليل:**
اختبار انتقال الحالات (`State Transition Testing`) هو الأنسب لأنظمة تعتمد على تدفق عمل (`workflow`) وواجهات مستخدم (`GUI`) لأنها تنتقل بين حالات متعددة استجابة لتفاعل المستخدم — تماماً مثل مثال `WeatherStation` في محاضرة `Design and Implementation` (`Shutdown, Running, Configuring...`) الذي وُثِّق عبر `state diagram`.

أ) تغطية المسارات تقنية `White-box` تحتاج معرفة الكود الداخلي، لا `Black-box`.
ج) "فك الحلقات" (`Loop unrolling`) تقنية تحسين/تحليل كود داخلي، لا تقنية اختبار `black-box` لواجهات المستخدم.
د) تحليل تدفق البيانات (`Data flow analysis`) تقنية `White-box` أيضاً، تحتاج معرفة داخلية بالكود.

`State Transition Testing` تقنية `Black-box` قياسية (لا تحتاج معرفة الكود الداخلي، فقط معرفة الحالات الممكنة والانتقالات بينها من منظور المستخدم) — وهذا يناسب طبيعة الـ`GUI`/`workflow` تحديداً.

**المصدر:** [نمط 2025-2026]
### السؤال 165 (صعب)
Integration testing strategy: High fan-in module risk?
أ) Top-down (stubs)
ب) Bottom-up (drivers)
ج) Big Bang
د) Sandwich
**الإجابة الصحيحة: ب**
**التعليل:**
موديول بـ`Fan-in` عالٍ (يُستدعى من وحدات كثيرة) يجب اختباره مبكراً وبعمق قبل أن يعتمد عليه الجميع — استراتيجية `Bottom-up` تبدأ باختبار الوحدات الأدنى مستوى أولاً (باستخدام `drivers` لمحاكاة الوحدات الأعلى)، وهذا يضمن أن الموديول عالي الاستدعاء (اللي غالباً يكون في مستوى منخفض/مساعد) يُختبر ويُثبَّت أولاً قبل أن يُبنى فوقه الكثير.

أ) `Top-down` (باستخدام `stubs`) يبدأ من الأعلى للأسفل، فيؤجل اختبار الموديول عالي الـ`Fan-in` (المنخفض عادة) لوقت متأخر — عكس المطلوب لتقليل المخاطرة.
ج) `Big Bang` يدمج كل شيء دفعة واحدة بدون تدرج، وهذا يزيد صعوبة عزل الأخطاء في موديول حرج كهذا.
د) `Sandwich` مزيج من `Top-down` و`Bottom-up` معاً، لكنه ليس الاستراتيجية الأكثر تحديداً واستهدافاً لمشكلة `Fan-in` العالي وحدها.

المحاضرة ربطت مستويات `Development Testing` (`Unit → Component → System`) بفكرة "اختبر الأصغر أولاً" — وموديول عالي `Fan-in` هو بالضبط الحالة اللي يستفيد أكثر من هذا المبدأ عبر `Bottom-up`.

**المصدر:** [نمط 2025-2026]
### السؤال 166 (متوسط)
Why is automated regression testing critical in continuous integration environments?
أ) Testing stops shrinks with automation.
ب) Removes need for manual testing permanently.
ج) Only measure performance.
د) Focuses on UI only.
ه) Identifies regression faults quickly, enabling fast fixes and reliable frequent delivery.
**الإجابة الصحيحة: ه**
**التعليل:**
في بيئات `Continuous Integration`، الكود يتغيّر باستمرار عدة مرات يومياً — أتمتة `Regression Testing` تكتشف فوراً أي كسر لوظيفة كانت تعمل سابقاً، مما يتيح إصلاحاً سريعاً وتسليماً متكرراً وموثوقاً، تماماً كما أكدت محاضرة `Testing` عن فائدة الأتمتة الكبرى في هذا السياق تحديداً.

أ) عبارة غير مفهومة/مشوَّهة لا تصف فائدة حقيقية.
ب) إزالة الحاجة الكاملة للاختبار اليدوي مبالغة — بعض الاختبارات الاستكشافية تبقى يدوية.
ج) قياس الأداء فقط تبسيط مخل؛ `Regression Testing` يخص التأكد من عدم كسر الوظائف الموجودة عموماً، لا الأداء تحديداً.
د) الاقتصار على واجهة المستخدم فقط يتجاهل نطاق `Regression Testing` الأوسع (يشمل أي وظيفة).

المحاضرة أكدت: "إعادة هذا يدوياً مئات المرات مستحيلة عملياً، بينما الأتمتة تجعله سريعاً وممكناً بضغطة زر" — وهذا بالضبط ما يجعله حرجاً في بيئات `CI` سريعة التغيير.

**المصدر:** [نمط 2025-2026]
### السؤال 167 (صعب)
How would you evaluate the effectiveness of a test suite that shows 100% statement coverage yet misses critical defects in input validation logic?
أ) Add more code.
ب) Ignore coverage metrics and focus on post-release fixes
ج) Increase test quantity blindly.
د) Coverage metrics do not guarantee detection of semantics errors or boundary condition faults.
ه) Coverage should never exceed 90%.
**الإجابة الصحيحة: د**
**التعليل:**
تغطية 100% للأسطر (`Statement Coverage`) تعني فقط أن كل سطر *نُفِّذ* مرة واحدة على الأقل، لكنها لا تضمن إطلاقاً اختبار كل القيم الحدودية (`boundary conditions`) أو كل الحالات الدلالية الممكنة — وهذا بالضبط ما نبّهت له محاضرة `JUnit`: "تغطية 100% لا تعني خلوّ الكود من الأخطاء".

أ) إضافة كود عشوائي لا يحل مشكلة نقص حالات الاختبار الحدودية.
ب) تجاهل مقاييس التغطية والانتظار حتى ما بعد الإصدار يزيد كلفة الإصلاح بدل تقليلها (تصحيح خطأ بعد الإطلاق أغلى بكثير).
ج) زيادة عدد الاختبارات "بشكل أعمى" بدون استهداف الحالات الحدودية لا يحل المشكلة الجوهرية.
ه) لا توجد قاعدة عامة تحدد حداً أقصى تعسفياً كهذا لنسبة التغطية.

هذا يربط مباشرة بتقنية `Boundary Value Analysis` اللي شرحتها محاضرة `Testing`: القيم الحدودية هي مصدر أخطاء `off-by-one` الأكثر شيوعاً، وتغطية الأسطر وحدها لا تضمن اختبارها فعلياً.

**المصدر:** [نمط 2025-2026]
### السؤال 168 (صعب)
Given limited resources, how should you prioritize testing efforts to maximize risk mitigation?
أ) Use risk analysis to prioritize tests addressing high-impact and high-likelihood changes.
ب) Equally test all requirements to ensure compliance.
ج) Delay testing until requirements stabilize.
د) Focus exclusively on functional testing first.
**الإجابة الصحيحة: أ**
**التعليل:**
استخدام تحليل المخاطر (`Risk Analysis`, عبر `Risk Exposure = Probability × Impact` اللي شرحتها محاضرة إدارة المشاريع) لترتيب أولويات الاختبار حسب أعلى تأثير واحتمالية معاً هو الأسلوب الأمثل عند محدودية الموارد — يركّز الجهد المحدود على أكثر المناطق خطورة فعلياً بدل توزيعه بالتساوي.

ب) اختبار كل المتطلبات بالتساوي يضيّع الموارد المحدودة على مناطق منخفضة المخاطرة بقدر المناطق عالية المخاطرة.
ج) تأجيل الاختبار حتى استقرار المتطلبات غير واقعي عملياً (المتطلبات تتغيّر باستمرار كما شرحته محاضرة `Requirements`) ويزيد كلفة الإصلاح المتأخر.
د) الاقتصار على الاختبار الوظيفي فقط يتجاهل مخاطر غير وظيفية مهمة (أمان، أداء) قد تكون أعلى تأثيراً.

هذا تطبيق مباشر لمعادلة `Risk Exposure` اللي شرحتها محاضرة إدارة المشاريع (مثال شجرة القرار حول `regression testing`) على سياق تخطيط الاختبار بالتحديد.

**المصدر:** [نمط 2025-2026]
### السؤال 169 (صعب)
During this suite review, you identify redundant tests covering identical code paths. What is the optimal approach to balance efficiency and reliability?
أ) Remove all redundant tests immediately.
ب) Analyse redundancy for value, remove redundant duplicates, but retain tests covering distinct behavioral scenarios to maintain coverage.
ج) Retain all tests regardless of duplication.
د) Prefer to test ownership only.
**الإجابة الصحيحة: ب**
**التعليل:**
تحليل كل اختبار مكرر بعناية قبل حذفه — نحذف فقط التكرار الحقيقي الذي لا يضيف قيمة (نفس المسار تماماً)، ونُبقي أي اختبار يغطي سيناريو سلوكي مختلف فعلياً حتى لو بدا مشابهاً ظاهرياً — هذا يوازن بين الكفاءة (تقليل وقت التنفيذ) والموثوقية (الحفاظ على التغطية الكاملة).

أ) حذف كل التكرار "فوراً" بدون تحليل قد يحذف اختبارات تبدو متشابهة لكنها تغطي سيناريوهات سلوكية مختلفة فعلياً (خطر فقدان تغطية حقيقية).
ج) الإبقاء على كل التكرار بلا داعٍ يهدر وقت تنفيذ الاختبار دون فائدة إضافية حقيقية.
د) "تفضيل ملكية الاختبار فقط" معيار إداري غير مرتبط بجوهر مشكلة التكرار الفني نفسها.

هذا يربط بمبدأ اختيار حالات اختبار *فعّالة* اللي شرحته محاضرة `Testing`: المعيار هو "هل تكشف الحالة خطأً مختلفاً؟" لا مجرد عدّ عدد الاختبارات الإجمالي.

## المحاضرة 6: JUnit (اختبار الوحدة بلغة Java) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 170 (سهل)
JUnit is a framework used primarily for:
أ) System integration testing
ب) Load testing
ج) Unit testing
د) Acceptance testing
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة عرّفت `JUnit` من أول جملة كمكتبة `Java` مخصصة لكتابة اختبارات آلية على مستوى الوحدة (`Unit Testing`) — عادة `method` واحدة بمعزل عن باقي النظام.

أ) اختبار تكامل النظام أوسع بكثير، يحتاج أدوات مختلفة غالباً.
ب) اختبار الحِمل (`Load Testing`) موضوع منفصل تماماً عن `JUnit`.
د) اختبار القبول (`Acceptance Testing`) يقوم به العميل، لا علاقة له بـ`JUnit`.

هذا هو أساس محاضرة `JUnit` بأكملها: أداة لأتمتة `Unit Testing` تحديداً، مع مثال `Calculator.add` كتطبيق عملي بسيط.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 171 (سهل)
Which statement about JUnit is true?
أ) JUnit tests are written in Python.
ب) JUnit tests are executed sequentially.
ج) JUnit tests do not require assertions.
د) JUnit provides annotations to define test methods.
و) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
المحاضرة شرحت بالتفصيل مجموعة `annotations` (زي `@Test`, `@Before`, `@After`, `@BeforeClass`, `@AfterClass`, `@Ignore`) لتحديد دورة حياة كل اختبار — وهذا مطابق تماماً للخيار D.

أ) `JUnit` مكتبة `Java` حصراً، لا `Python`.
ب) الترتيب التسلسلي ليس قاعدة عامة مضمونة في `JUnit` (لا يُفترض الاعتماد على ترتيب تنفيذ معيّن بين test methods مختلفة).
ج) عكس الحقيقة تماماً — الاختبار بدون `assert statements` لا يتحقق فعلياً من أي شيء، وهذا جوهر عملية الاختبار بأكملها.

`@Test` نفسها هي الـ`annotation` الأساسية اللي تحدد أن الدالة هي اختبار فعلي، وهذا أول ما شرحته المحاضرة عن `JUnit annotations`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 172 (سهل)
What is the primary benefit of using a testing framework like JUnit?
أ) It allows for manual execution of test cases.
ب) It provides tools for load testing.
ج) It automates the execution of unit tests.
د) It facilitates exploratory testing.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`JUnit` مكتبة تساعد على كتابة اختبارات آلية (`automated tests`) للكود بدل الاختبار اليدوي المتكرر — وهذا هو جوهر فائدتها العملية اللي شرحتها المحاضرة، خاصة في سياق `Regression Testing`.

أ) التنفيذ اليدوي عكس الغرض الأساسي من استخدام `JUnit` أصلاً.
ب) اختبار الحِمل (`Load Testing`) ليس مجال عمل `JUnit`.
د) الاختبار الاستكشافي (`Exploratory Testing`) نشاط يدوي غير منظَّم، عكس الأتمتة المنهجية اللي توفرها `JUnit`.

## المحاضرة 7: Project Management and Planning (تخطيط وإدارة المشاريع البرمجية) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 173 (سهل)
Who is typically responsible for developing the initial draft of the Work Breakdown Structure (WBS) in a software project?
أ) Project manager
ب) Business analyst
ج) Systems architect
د) Quality assurance manager
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
مدير المشروع (`Project Manager`) هو المسؤول الأساسي عن الجدولة والتخطيط (`Scheduling`) حسب المحاضرة، وبناء `WBS` جزء جوهري من مسؤولياته المبكرة لتنظيم عمل الفريق كاملاً.

ب) محلل الأعمال يركّز على جمع وتوثيق المتطلبات، لا تجزئة العمل الإداري.
ج) مهندس النظم يركّز على التصميم التقني، لا التخطيط الإداري للمشروع.
د) مدير ضمان الجودة يركّز على المعايير والمراجعات، لا بناء هيكلية العمل الأولية.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 174 (سهل)
Which statement best describes the hierarchical structure of a Work Breakdown Structure (WBS)?
أ) It organizes project activities based on their cost implications.
ب) It represents a chronological sequence of project tasks.
ج) It categorizes project deliverables into levels of detail.
د) It outlines the interdependencies between project stakeholders.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`WBS` هرمي بطبيعته: `Project` → `Phases` → `Steps` → `Activities` — أي تصنيف مخرجات المشروع (`deliverables`) عبر مستويات تفصيل متتالية من الأعم للأخص.

أ) ترتيبه ليس مبنياً على التكلفة أساساً، بل على التجزئة المنطقية للعمل.
ب) الترتيب الزمني (`chronological sequence`) وظيفة `Activity Graph`/`Gantt Chart`، لا `WBS` نفسه (اللي يهتم بالتجزئة الهيكلية لا التوقيت).
د) اعتماديات أصحاب المصلحة موضوع مختلف تماماً، لا هيكلية `WBS`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 175 (سهل)
In a Work Breakdown Structure (WBS), the lowest level of decomposition typically represents:
أ) Milestones
ب) Project phases
ج) Work packages
د) Project objectives
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
أدنى مستوى في `WBS` هو الأنشطة الدقيقة القابلة للتنفيذ والإسناد لشخص واحد — وهذا ما يُعرف عموماً في أدبيات إدارة المشاريع بـ"حزم العمل" (`Work Packages`)، مطابقة لمستوى `Activities` في مثال المحاضرة.

أ) المعالم (`Milestones`) نقاط زمنية تُعلن اكتمال نشاط، ليست "مستوى تجزئة" بحد ذاتها.
ب) مراحل المشروع (`Phases`) هي أعلى مستوى في الهرمية، لا أدناها.
د) أهداف المشروع مفهوم عام أوسع، ليس مستوى تجزئة محدداً في `WBS`.

المحاضرة رتّبت الهرمية بوضوح: `Project` → `Phases` (الأعلى) → `Steps` → `Activities` (الأدنى، القابلة للإسناد لفرد واحد) — وهذا المستوى الأخير هو ما يُسمى عملياً "Work Packages".

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 176 (سهل)
What is the main benefit of using a Work Breakdown Structure (WBS) in software project management?
أ) It helps in tracking project progress against a baseline.
ب) It ensures that project stakeholders are informed about project status.
ج) It provides a framework for identifying project risks.
د) It facilitates clear communication of project scope and tasks
و) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
`WBS` بتجزئته الهرمية الواضحة (`Project` → `Phases` → `Steps` → `Activities`) يوضّح نطاق المشروع ومهامه بشكل بصري ومنظَّم لكل الفريق — وهذا هو أساس التواصل الواضح حول نطاق ومهام المشروع.

أ) تتبع التقدم مقابل خط أساس وظيفة `Gantt Chart`/`CPM` الأقرب، وليست الفائدة الأساسية المباشرة لـ`WBS` نفسه.
ب) إبقاء أصحاب المصلحة مطلعين نتيجة جانبية للتواصل الواضح، لا الفائدة المباشرة الأولى.
ج) تحديد المخاطر موضوع `Risk Management` منفصل تماماً عن `WBS`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 177 (سهل)
Which technique is commonly used to create a Work Breakdown Structure (WBS) in software project management?
أ) Brainstorming sessions
ب) Earned Value Analysis (EVA)
ج) Monte Carlo simulation
د) SWOT analysis
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
جلسات العصف الذهني (`Brainstorming sessions`) مع الفريق تقنية شائعة عملياً لتحديد كل مخرجات المشروع وتجزئتها لمراحل وخطوات وأنشطة أولية قبل التنظيم النهائي لـ`WBS`.

ب) `Earned Value Analysis` تقنية لقياس أداء المشروع لاحقاً، لا لإنشاء `WBS` نفسه.
ج) محاكاة `Monte Carlo` تقنية تقدير احتمالي للمخاطر/التكلفة، لا لبناء هيكلية العمل.
د) تحليل `SWOT` تقنية تخطيط استراتيجي عام، غير مخصص لبناء `WBS`.

ملاحظة: هذه التقنية العملية المحددة (`Brainstorming` لبناء `WBS`) لم تُذكر بالاسم صراحة في محاضرة إدارة المشاريع، والإجابة معتمدة على معرفة عامة قياسية شائعة في إدارة المشاريع تكمّل ما شرحته المحاضرة عن `Work Breakdown` كمفهوم.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 178 (متوسط)
The primary purpose of using numbering or coding schemes in a Work Breakdown Structure (WBS) is to:
أ) Identify the responsible project team members for each task.
ب) Track project costs associated with each work package.
ج) Establish a hierarchical relationship between project tasks.
د) Determine the critical path for project scheduling.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
أنظمة الترقيم (زي 1.1، 1.2.1...) في `WBS` تعكس مباشرة الهرمية بين المراحل والخطوات والأنشطة — رقم كل عنصر يوضح مكانه بالضبط ضمن التسلسل الهرمي الأكبر.

أ) تحديد المسؤولين موضوع إسناد المهام، وليس غرض الترقيم نفسه.
ب) تتبع التكاليف نتيجة استخدام لاحقة ممكنة، لا الغرض الأساسي من الترقيم.
د) تحديد المسار الحرج وظيفة `CPM`، منفصلة تماماً عن ترقيم `WBS`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 179 (متوسط)
How does the Work Breakdown Structure (WBS) contribute to effective project management?
أ) By defining the project budget and timeline
ب) By identifying project risks and mitigation strategies
ج) By facilitating resource allocation and task assignment
د) By ensuring compliance with industry standards and regulations
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
بعد تجزئة المشروع لأنشطة دقيقة قابلة للإسناد لشخص واحد عبر `WBS`، يصبح توزيع الموارد وإسناد المهام لكل فرد في الفريق أوضح وأسهل بكثير — وهذا الأثر العملي المباشر لبناء `WBS` صحيح.

أ) تعريف الميزانية والجدول الزمني نشاط لاحق يستفيد من `WBS` كمدخل، لا غرضه المباشر.
ب) تحديد المخاطر موضوع `Risk Management` منفصل تماماً.
د) الامتثال للمعايير موضوع `Quality Assurance`، غير مرتبط مباشرة بـ`WBS`.

**المصدر:** [نمط 2025-2026]
### السؤال 180 (صعب)
How should change management address scope creep without jeopardizing team morale and delivery?
أ) Reject all change requests.
ب) Enforce rigid early freeze requirements.
ج) Ignore stakeholder feedback.
د) Increase overtime hours.
ه) Implement formal change control balancing needs and capabilities
**الإجابة الصحيحة: ه**
**التعليل:**
إدارة التغيير الرسمية (`formal change control`) اللي توازن بين احتياجات أصحاب المصلحة والقدرات الفعلية للفريق (وقت، موارد، ميزانية) هي الحل المتوازن — تسمح بتقييم كل طلب تغيير بدل رفضه أو قبوله عشوائياً، وهذا يحمي معنويات الفريق (`morale`) وجدول التسليم معاً.

أ) رفض كل طلبات التغيير قد يعني تجاهل احتياجات حقيقية للعميل، ما يضر برضاه لاحقاً.
ب) التجميد المبكر الصارم (`rigid early freeze`) يناقض واقع أن المتطلبات تتغيّر دائماً بطبيعتها (كما شرحته محاضرة `Requirements`).
ج) تجاهل ملاحظات أصحاب المصلحة يضر بجودة النظام النهائي وثقة العميل.
د) زيادة ساعات العمل الإضافي حل قصير المدى يضر بمعنويات الفريق مباشرة، عكس المطلوب بالسؤال.

هذا يربط بمفهوم `Scope Creep` وإدارة المتطلبات اللي شرحته محاضرة `Requirements`: العملية الرسمية لتقييم أثر كل تغيير مقترح (لا رفضه أو قبوله تلقائياً) هي ما يحمي المشروع من فوضى `Scope Creep` غير المُدار.

## المحاضرة 8: Software Measurement (قياس البرمجيات) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 181 (سهل)
Which of the following statements about Cyclomatic Complexity (CC) is true?
أ) CC measures the size of a class by counting its methods and attributes.
ب) CC measures the number of decision points in a method.
ج) CC measures the number of child classes inheriting from a superclass.
د) CC measures the coupling between classes in a software system.
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`Cyclomatic Complexity` (CC) حسب معادلة `V(G) = e − n + 2p` تقيس عدد نقاط القرار (`decision points`) — زي `if`, `while`, `for` — داخل الدالة الواحدة، وهذا هو ما يحدد عدد المسارات المستقلة (`independent paths`).

أ) عدّ الـ methods والـ attributes هو تعريف `WMC`/حجم الفئة، مو `CC`.
ج) عدد الفئات الفرعية الموروثة هو `NOC` (Number of Children)، مقياس مختلف تماماً.
د) الاقتران بين الفئات هو `CBO` (Coupling Between Objects)، لا علاقة له بـ `CC`.

مثال المحاضرة المحلول (دالة `showClients`) أظهر أن `E=7, N=6, P=1` تعطي `V(G)=3` — أي 3 مسارات مستقلة ناتجة مباشرة عن نقاط القرار (`if`/loop) داخل الدالة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 182 (متوسط)
What is the significance of a high Cyclomatic Complexity (CC) value in a method?
أ) It indicates that the method has many conditionals and potential paths.
ب) It suggests that the method has a large number of lines of code.
ج) It signifies that the method is highly cohesive.
د) It indicates a low level of coupling with other classes.
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
`CC` عالية تعني أن الدالة فيها عدد كبير من نقاط القرار (`conditionals`) ومسارات تنفيذ محتملة (`potential paths`) — والقاعدة العملية اللي شرحتها المحاضرة: لو تجاوز `V(G)` الرقم 10، احتمال وجود أخطاء يرتفع بشكل ملحوظ.

ب) `LOC` مقياس حجم منفصل تماماً؛ دالة طويلة قد تكون بسيطة المنطق (`CC` منخفضة) رغم طولها.
ج) التماسك (`Cohesion`) يقاس بـ `LCOM`، لا علاقة مباشرة له بـ `CC`.
د) الاقتران يقاس بـ `CBO`، ولا علاقة مباشرة بـ `CC`.

المحاضرة أكدت أن `CC` تُستخدم كإشارة تحذير لفرق `QA` لتحديد أولويات الاختبار — لأنها تعكس تحديداً كثرة المسارات المنطقية المحتملة، لا حجم الكود.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 183 (سهل)
What does the Lack of Cohesion in Methods (LCOM) metric measure?
أ) The number of methods that are dependent on each other.
ب) The number of attributes that are unused by any method.
ج) The degree to which methods in a class share data.
د) The degree to which methods in a class are logically connected.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`LCOM` يُحسب فعلياً بأخذ مجموعة المتغيرات (`attributes`) المستخدمة في كل دالة، ثم عدّ المجموعات المنفصلة (`disjoint`) بعد تقاطعها — أي أن حسابه مبني بالكامل على مدى مشاركة (`sharing`) الدوال لنفس البيانات (`data`) الداخلية للفئة.

أ) "الدوال المعتمدة على بعضها" وصف غير دقيق لآلية حساب `LCOM` الفعلية (المبنية على تقاطع مجموعات المتغيرات، لا استدعاء دوال لبعضها).
ب) عدّ الخصائص غير المستخدمة إطلاقاً مقياس مختلف تماماً، لا `LCOM`.
د) "الدرجة المنطقية للترابط" وصف عام صحيح لـ `Cohesion` كمفهوم، لكنه ليس تعريف آلية حساب `LCOM` تحديداً كما شرحتها المحاضرة (وهو أيضاً معكوس دلالياً، لأن `LCOM` يقيس *غياب* الترابط لا وجوده).

`LCOM` عالٍ يعني أن الفئة فعلياً تخدم أكثر من مسؤولية وتحتاج تُقسّم — وهذا الحكم مبني حصراً على مدى تقاطع مجموعات البيانات (`data`) المستخدمة بين الدوال.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 184 (سهل)
Coupling Between Objects (CBO) measures:
أ) The number of methods a class inherits from its superclass.
ب) The level of interaction between different classes.
ج) The number of attributes a class contains.
د) The depth of inheritance of a class.
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`CBO` يهتم تحديداً بالعلاقات *خارج* شجرة الوراثة — أي مستوى التفاعل والاعتماد بين فئات مختلفة عبر استخدام دوال بعضها البعض (مثال المحاضرة: `Class B` مرتبطة مع `A` و`C` و`D` فـ `CBO(B) = 3`).

أ) عدد الدوال الموروثة من الأب لا علاقة له بـ `CBO`؛ الوراثة مقياس منفصل (`DIT`/`NOC`).
ج) عدد الخصائص مقياس حجم مختلف تماماً، لا اقتران.
د) عمق الوراثة هو `DIT` تحديداً، مقياس مختلف عن `CBO`.

القاعدة الذهبية المتكررة بالمحاضرة: `Keep low coupling but high cohesion` — و`CBO` هو المقياس المباشر لأول شق من هذه القاعدة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 185 (سهل)
Depth of Inheritance Tree (DIT) helps in understanding:
أ) The number of methods overridden by subclasses.
ب) The maximum number of methods in a class.
ج) The hierarchy depth from a class to its furthest ancestor.
د) The number of child classes directly inheriting from a superclass.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`DIT` يقيس أقصى مسافة (`maximum distance`) بين فئة الجذر (اللي `DIT` لها دائماً = 0) وأي فئة في شجرة الوراثة — أي عمق الهرمية من الفئة لأبعد سلف (`furthest ancestor`) لها.

أ) عدّ الدوال المُعاد تعريفها (`overridden`) مقياس مختلف، لا `DIT`.
ب) أقصى عدد دوال في فئة واحدة هو `WMC` وليس `DIT`.
د) عدد الفئات الفرعية المباشرة هو `NOC` (Number of Children)، مقياس آخر مختلف تماماً عن `DIT`.

المحاضرة ربطت `DIT` العميق بمقايضة حقيقية: إعادة استخدام أكبر (`reuse`) مقابل تعقيد تصميم أكبر — كلما زاد `DIT`، زاد عدد الدوال الموروثة المطلوب اختبارها.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 186 (TODO — سهل)
When evaluating software metrics, which characteristic is indicative of a highly cohesive class?
أ) High Weighted Methods per Class (WMC) and low Cyclomatic Complexity (CC).
ب) High Lack of Cohesion in Methods (LCOM) and low Coupling Between Objects (CBO).
ج) High Cyclomatic Complexity (CC) and low Depth of Inheritance Tree (DIT).
د) Low Weighted Methods per Class (WMC) and high Number of Children (NOC).
و) None of the above
**الإجابة الصحيحة: TODO**
**التعليل:**
لا يوجد خيار صحيح فعلياً هنا — الفئة عالية التماسك (`highly cohesive`) يجب أن تتصف بـ`LCOM` **منخفض** (لأن `LCOM` يقيس *غياب* التماسك، فكلما ارتفع كلما كان التماسك أسوأ)، بينما الخيار B يذكر "High LCOM" وهو عكس المطلوب تماماً — تناقض داخلي في صياغة الخيار الصحيح المفترض.

أ) لا علاقة واضحة أو موثّقة بين `WMC`/`CC` وبين التماسك مباشرة.
ج) `CC` و`DIT` مقياسا تعقيد ووراثة، لا علاقة مباشرة موثّقة بالتماسك.
د) `WMC` و`NOC` أيضاً غير مرتبطين مباشرة بمفهوم التماسك حسب ما شرحته المحاضرة.

بما أن الفئة عالية التماسك يجب أن يكون لها `LCOM` منخفض تحديداً (والخيار B يذكر "High LCOM" بالخطأ، وربما هذا خطأ استخراج/كتابة في السؤال الأصلي حيث كان المقصود "Low LCOM")، تُرك السؤال TODO للمراجعة اليدوية بدل اختيار إجابة تتناقض مع تعريف `LCOM` الصحيح.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 187 (سهل)
Which metric is used to evaluate the complexity of control flow within methods?
أ) Depth of Inheritance Tree (DIT)
ب) Weighted Methods per Class (WMC)
ج) Cyclomatic Complexity (CC)
د) Coupling Between Objects (CBO)
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`Cyclomatic Complexity` تُحسب تحديداً من مخطط تدفق التحكم (`Control Flow Graph`) للدالة عبر المعادلة `V(G) = e − n + 2p` — وهي المقياس المخصص بالضبط لتقييم تعقيد تدفق التحكم (`control flow`) داخل الدوال.

أ) `DIT` يقيس عمق الوراثة، لا تدفق التحكم داخل دالة.
ب) `WMC` مجموع `CC` على مستوى الفئة كاملة، لا دالة واحدة تحديداً.
د) `CBO` يقيس الاقتران بين الفئات، لا تعقيد التحكم الداخلي.

هذا تكرار مباشر لتعريف `CC` الأساسي اللي شرحته المحاضرة بمعادلته وأمثلته المحلولة (دالة `showClients`).

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 188 (متوسط)
How does the Number of Children (NOC) metric contribute to software design evaluation?
أ) It indicates the number of subclasses that extend a superclass.
ب) It measures the average number of methods per class.
ج) It evaluates the number of attributes per class.
د) It quantifies the level of interaction between classes.
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
`NOC` (Number of Children) يعدّ تحديداً عدد الفئات الفرعية المباشرة (`direct subclasses`) اللي ترث من فئة معيّنة — وهذا مطابق حرفياً للخيار A.

ب) متوسط عدد الدوال لكل فئة مقياس مختلف تماماً (أقرب لـ `WMC` بمعنى آخر).
ج) عدد الخصائص لكل فئة لا علاقة له بـ `NOC`.
د) مستوى التفاعل بين الفئات هو `CBO`، لا `NOC`.

المحاضرة أكدت أن `NOC` عالٍ يعطي مؤشراً على تأثير كبير لتلك الفئة على التصميم العام — أي خطأ فيها ينتشر لعدد كبير من الفئات الفرعية دفعة واحدة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 189 (سهل)
What does the lack of Cohesion in Methods (LCOM) value of zero imply about a class?
أ) The class has no methods.
ب) The class has perfectly cohesive methods.
ج) The class has a very high number of methods.
د) The class has very low Cyclomatic Complexity (CC).
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`LCOM = 0` يعني عدم وجود أي مجموعات منفصلة (`disjoint sets`) من الدوال بعد تقاطع مجموعات المتغيرات المستخدمة — أي أن كل دوال الفئة تشترك في استخدام نفس البيانات بشكل متماسك تماماً، وهذا هو التماسك المثالي (`perfectly cohesive`).

أ) عدم وجود دوال إطلاقاً ليس المعنى الصحيح؛ `LCOM=0` يفترض وجود دوال متماسكة فعلياً، لا غيابها.
ج) عدد الدوال الكبير لا علاقة له بقيمة `LCOM` تحديداً.
د) `CC` منخفض مقياس منفصل تماماً عن `LCOM`.

هذا يربط مباشرة بآلية حساب `LCOM` اللي شرحتها المحاضرة: عدد المجموعات المنفصلة بعد التقاطع — وصفر مجموعة منفصلة يعني تماسكاً كاملاً بين كل الدوال.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 190 (سهل)
Coupling Between Objects (CBO) increases when:
أ) Classes are loosely coupled.
ب) Classes have fewer methods.
ج) Classes have many dependencies on other classes.
د) Classes inherit from multiple superclasses.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`CBO` يرتفع كلما زاد عدد الفئات الأخرى التي تعتمد عليها الفئة (أو تعتمد عليها) عبر استخدام دوالها — أي كثرة الاعتماديات (`dependencies`) خارج شجرة الوراثة.

أ) الاقتران المنخفض (`loosely coupled`) عكس ما يزيد `CBO`، بل يخفّضه.
ب) عدد الدوال لا علاقة مباشرة له بـ `CBO`؛ الاقتران يخص الاعتماد على فئات أخرى، لا عدد الدوال الداخلية.
د) الوراثة المتعددة تخص `DIT`، لا `CBO` (اللي يهتم فقط بالعلاقات *خارج* شجرة الوراثة كما أكدت المحاضرة).

القاعدة الذهبية `Keep low coupling but high cohesion` تعني أن الفئات الأكثر استقلالية (اعتماديات أقل على فئات أخرى) هي الأسهل إعادة استخداماً واختباراً.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 191 (سهل)
Which software metric helps identify potential maintenance issues due to complex interdependencies between classes?
أ) Depth of Inheritance Tree (DIT)
ب) Coupling Between Objects (CBO)
ج) Cyclomatic Complexity (CC)
د) Number of Children (NOC)
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
الاعتماديات المعقدة (`complex interdependencies`) بين فئات مختلفة هي تحديداً ما يقيسه `CBO` — كلما زاد الاقتران زادت حساسية النظام للتغييرات واحتجنا اختباراً أكثر عند الصيانة.

أ) `DIT` يخص عمق الوراثة، لا الاعتماديات بين فئات غير مرتبطة وراثياً.
ج) `CC` يخص تعقيد المنطق الداخلي لدالة واحدة، لا الترابط بين فئات.
د) `NOC` يخص عدد الفئات الفرعية، لا الاعتماديات المتبادلة.

هذا يربط مباشرة بالقاعدة الذهبية للمحاضرة: الاقتران المرتفع (`high CBO`) يضر بالتصميم المعياري ويزيد حساسية النظام للتغييرات — وهذا بالضبط "مشاكل الصيانة الناتجة عن ترابطات معقدة".

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 192 (سهل)
What does a high Depth of Inheritance Tree (DIT) indicate about a class?
أ) The class has many methods.
ب) The class has deep inheritance relationships.
ج) The class has low cohesion.
د) The class has many child classes.
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`DIT` مرتفع يعني أن الفئة تقع في مستوى عميق جداً من شجرة الوراثة (مسافة كبيرة عن فئة الجذر)، أي علاقات وراثة عميقة (`deep inheritance relationships`).

أ) عدد الدوال مقياس منفصل (`WMC`)، لا `DIT`.
ج) التماسك يقاس بـ `LCOM`، لا علاقة مباشرة موثّقة بـ `DIT`.
د) عدد الفئات الفرعية (الأبناء) هو `NOC`، لا `DIT` (الذي يقيس العمق نحو الأسلاف لا الأبناء).

المحاضرة ربطت `DIT` العميق بمقايضة: إعادة استخدام أكبر لكن تعقيد تصميم أكبر أيضاً — كل ما زاد العمق، زاد عدد الدوال الموروثة المطلوب فهمها واختبارها.

**المصدر:** [نمط 2025-2026]
### السؤال 193 (صعب)
WMC for class with 3 methods (CC={1,2,4}, value)?
أ) 3
ب) Max 4
ج) 2.33
د) 7
**الإجابة الصحيحة: د**
**التعليل:**
`WMC` (Weighted Methods per Class) = مجموع `Cyclomatic Complexity` لكل دوال الفئة، وليس عددها أو أقصى قيمة فيها. هنا: 1 + 2 + 4 = 7.

أ) عدد الدوال (3) وحده ليس `WMC`؛ هو مجرد عدد بدون "الوزن" (`weighted`).
ب) أقصى قيمة (`Max 4`) ليست تعريف `WMC`؛ هذا مقياس مختلف (`max complexity`) لا `WMC` نفسه.
ج) المتوسط (2.33) ليس `WMC` أيضاً — الأدبيات تستخدم المجموع (`sum`)، لا المتوسط (`average`).

المحاضرة أعطت قاعدة عملية: `WMC` بقيمة 20 لفئة تُعتبر جيدة، لكن يُفضَّل عدم تجاوز 40 — وهذا الرقم دائماً ناتج جمع (`sum`) قيم `CC` كلها معاً، لا حساب `average` أو `max`.

**المصدر:** [نمط 2025-2026]
### السؤال 194 (صعب)
CC for the following code while (x<n) { cond += x; if (x==1) break; }
أ) Independent
ب) 2
ج) 4
د) 3
**الإجابة الصحيحة: د**
**التعليل:**
عدد نقاط القرار (`decision points`) هنا اثنان: شرط `while` وشرط `if` الداخلي. القاعدة العملية: `CC = عدد نقاط القرار + 1` = 2 + 1 = 3.

أ) "Independent" ليست رقماً؛ السؤال يطلب قيمة `V(G)` رقمية محددة.
ب) 2 يساوي عدد نقاط القرار فقط بدون إضافة الـ +1 الأساسية لأي دالة (حتى بدون أي شرط، `CC` الأدنى = 1).
ج) 4 يفترض ثلاث نقاط قرار، بينما الكود فيه شرطان فقط (`while` و`if`).

هذا تطبيق مباشر لمعادلة `V(G) = e − n + 2p` اللي شرحتها المحاضرة عبر مثال `showClients` المحلول (E=7, N=6, P=1 → V(G)=3) — نفس المنطق الحسابي هنا.

**المصدر:** [نمط 2025-2026]
### السؤال 195 (صعب)
CBO for a class that calls methods from 2 other classes, rvs 1 more?
أ) 2
ب) 1 (outgoing only)
ج) 3
د) Bidirectional
**الإجابة الصحيحة: ج**
**التعليل:**
`CBO` (Coupling Between Objects) يعدّ إجمالي عدد الفئات المختلفة المرتبطة بها الفئة الحالية — سواء عبر استدعاء (`calls`, صادر/outgoing) أو استقبال (`receives`, وارد/incoming). هنا: فئتان تُستدعى دوالهما + فئة واحدة إضافية تستقبل منها استدعاءً = 3 فئات مختلفة مرتبطة إجمالاً.

أ) 2 يحسب فقط الفئات المستدعاة (`outgoing`)، متجاهلاً الفئة الثالثة (`receives`).
ب) الاقتصار على `outgoing only` يتجاهل نص السؤال صراحة ("rvs 1 more" أي "receives from 1 more").
د) "Bidirectional" ليس رقماً؛ مثال المحاضرة (`Class B` مرتبطة مع `A` و`C` و`D` فـ `CBO(B)=3`) يحسب العدد الإجمالي للفئات المرتبطة بغض النظر عن الاتجاه.

المحاضرة أكدت أن `CBO` يهتم بكل العلاقات *خارج* شجرة الوراثة بغض النظر عن اتجاهها (صادرة أو واردة) — وهذا يفسّر لماذا نجمع كل الفئات الثلاث المختلفة معاً.

**المصدر:** [نمط 2025-2026]
### السؤال 196 (صعب)
LCOM for a class of 4 methods access 2 disjoint field sets (2 each), LCOM=
أ) 4/6
ب) 0
ج) 0.5
د) 1
**الإجابة الصحيحة: د**
**التعليل:**
حسب آلية حساب `LCOM` اللي شرحتها المحاضرة (عدّ عدد المجموعات المنفصلة تماماً `disjoint sets` بعد تقاطع مجموعات المتغيرات المستخدمة لكل دالة): هنا الدوال الأربع تنقسم لمجموعتين منفصلتين تماماً (2 دوال تستخدم مجموعة حقول، ودالتان تستخدمان مجموعة حقول أخرى بدون أي تقاطع). بموجب الصيغة الشائعة `LCOM = (عدد المجموعات المنفصلة) − 1` = 2 − 1 = 1.

أ) 4/6 يفترض حساباً بصيغة `P−Q` (أزواج لا تشترك ÷ إجمالي الأزواج) لم تُشرح بهذا الشكل الدقيق في المحاضرة.
ب) صفر يعني تماسكاً كاملاً (كل الدوال في مجموعة واحدة مترابطة)، عكس الانقسام لمجموعتين منفصلتين هنا تماماً.
ج) 0.5 لا يطابق أي صيغة حساب `LCOM` مذكورة في المحاضرة.

هذا يربط مباشرة بمثال المحاضرة: `LCOM=0` يعني تماسكاً مثالياً (مجموعة واحدة فقط)، وكل ما زاد عدد المجموعات المنفصلة، ارتفعت قيمة `LCOM` وزاد مؤشر الحاجة لتقسيم الفئة لأكثر من فئة (مبدأ المسؤولية الواحدة).

**المصدر:** [نمط 2025-2026]
### السؤال 197 (سهل)
Threshold: CC > ? indicates high risk?
أ) 6
ب) 5
ج) 20
د) 10
ه) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
المحاضرة نصّت صراحة على القاعدة العملية: "إذا تجاوز `V(G)` الرقم 10، احتمال وجود أخطاء يرتفع بشكل ملحوظ" — وتُستخدم كإشارة تحذير لفرق `QA` لتحديد أولويات الاختبار.

A, B) 6 و5 أرقام أقل من العتبة الفعلية المذكورة بالمحاضرة.
ج) 20 رقم أعلى من العتبة الفعلية (20 هو حد `WMC` المقبول للفئة كاملة، مو حد `CC` لدالة واحدة).
ه) بما أن الخيار D (10) صحيح ومطابق للمحاضرة، فلا داعي لـ"none of the above".

## المحاضرة 9: Software Measurement — الجزء الثاني (قياس البرمجيات) (تابع — دورات لاحقة)

**المصدر:** [نمط 2025-2026]
### السؤال 198 (TODO — صعب)
Fan-in for module M-Called by 3 modules, Value?
أ) NaN
ب) 1
ج) Outgoing calls
د) Reuses ELS
**الإجابة الصحيحة: TODO**
**التعليل:**
هذا السؤال يبدو تالفاً في الاستخراج: `Fan-in` (عدد الدوال/الوحدات اللي "تنادي" على وحدة معيّنة، كما عرّفته المحاضرة) لموديول يُستدعى من 3 وحدات (`Called by 3 modules`) يجب أن يساوي رقمياً **3** — لكن هذه القيمة غير موجودة إطلاقاً بين الخيارات الأربعة المتاحة (`NaN`, `1`, `Outgoing calls`, `Reuses ELS`).

ب) القيمة "1" لا تطابق نص السؤال (3 modules calling M).
ج) "Outgoing calls" هو تعريف `Fan-out` بالضبط لا `Fan-in` (اللي هو `incoming calls`) — عكس المفهوم المطلوب.
د) "Reuses ELS" عبارة غير مفهومة ولا تطابق أي مفهوم قياسي مرتبط بـ`Fan-in`.

بما أن القيمة الصحيحة (3) غير متوفرة بين الخيارات، وخياري C وD يبدوان مشوَّهين أو غير مرتبطين منطقياً بالسؤال، يُترك TODO للمراجعة اليدوية بدل تخمين إجابة رياضياً خاطئة.

**المصدر:** [نمط 2025-2026]
### السؤال 199 (صعب)
Fan-out for function: Calls 3 functions, 2 external libs.
أ) Components
ب) 5
ج) 2
د) 3
**الإجابة الصحيحة: ب**
**التعليل:**
`Fan-out` يعدّ إجمالي عدد الدوال الأخرى اللي هذه الدالة *هي* تناديها (`calls out`)، بما فيها استدعاءات المكتبات الخارجية. هنا: 3 دوال داخلية + 2 مكتبات خارجية = 5 استدعاءات إجمالية صادرة.

أ) "Components" ليست رقماً، لا تجيب على السؤال.
ج) 2 يحسب المكتبات الخارجية فقط، متجاهلاً الدوال الثلاث الداخلية.
د) 3 يحسب الدوال الداخلية فقط، متجاهلاً المكتبتين الخارجيتين.

المحاضرة عرّفت `Fan-out` كعدد الدوال اللي الدالة "هي" تناديها — بغض النظر عن كون الاستدعاء لدالة داخل النظام أو مكتبة خارجية، فكلاهما يُحتسب ضمن الإجمالي.

## المحاضرة 10: Software Requirements Specification (مواصفات متطلبات البرمجيات) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 200 (سهل)
Which document serves as a basis for the agreement between the customer and the software development team?
أ) Software Design Document (SDD)
ب) System Architecture Document (SAD)
ج) Software Requirement Specification (SRS)
د) Test Plan Document (TPD)
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة وصفت `SRS` صراحة كـ"عقد" غير رسمي (`contract`) بين فريق التطوير والعميل — بحيث الكل متفق من البداية شنو النظام المفروض يسويه بالضبط.

أ) `SDD` وثيقة تصميم تقنية داخلية، وليست "عقداً" مع العميل مباشرة.
ب) وثيقة المعمارية جزء تقني من التصميم، لا اتفاق تعاقدي مع العميل.
د) خطة الاختبار وثيقة تقنية لاحقة، لا أساس الاتفاق الأولي.

مثال المحاضرة (نظام `ACME Library Management System`) وضّح هذا الدور: الجمهور المستهدف لـ`SRS` يشمل ممثلي العميل وممثلي الفريق التقني معاً — وهذا بالضبط طبيعة "العقد" المشترك.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 201 (سهل)
Who is typically responsible for preparing the Software Requirement Specification (SRS)?
أ) Project manager
ب) System architect
ج) Quality assurance team
د) Business analyst
و) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
`Business analyst` هو الدور المسؤول تقليدياً عن جمع متطلبات العميل وترجمتها لوثيقة `SRS` منظمة، عبر التواصل المباشر مع أصحاب المصلحة (`stakeholders`) من الطرفين.

أ) مدير المشروع يخطط وينسّق المشروع، لكن كتابة `SRS` التفصيلية ليست مسؤوليته المباشرة عادة.
ب) مهندس النظام (`System Architect`) يستخدم `SRS` كمدخل للتصميم، لكنه لا يكتبها هو نفسه غالباً.
ج) فريق ضمان الجودة يتحقق من مطابقة النظام لـ`SRS` لاحقاً، لا يكتبها.

ملاحظة: هذا الدور التنظيمي المحدد (من يكتب `SRS` بالضبط) لم يُذكر صراحة بهذه التسمية في المحاضرة (اللي ركّزت على "خمس فئات مستخدمين" لـ`SRS` بدل "من يكتبها")، والإجابة معتمدة على معرفة عامة قياسية في هندسة المتطلبات.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 202 (سهل)
Which section of the SRS document typically includes information about the system's hardware and software interfaces?
أ) Functional requirements
ب) Non-functional requirements
ج) External interfaces
د) User characteristics
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة شرحت بالتفصيل قسم `2.1 Product Perspective` وتفرعاته الثمانية، من ضمنها `2.1.3 Hardware Interfaces` و`2.1.4 Software Interfaces` — وكلاهما يقعان تحت مظلة `External Interfaces` العامة.

أ) المتطلبات الوظيفية تصف "ماذا" يفعل النظام، لا واجهات الهاردوير/السوفتوير تحديداً.
ب) المتطلبات غير الوظيفية تصف قيوداً عامة، وليست القسم المخصص لتعداد الواجهات التقنية تحديداً.
د) خصائص المستخدمين قسم وصفي عن من يستخدم النظام، لا واجهاته التقنية.

مثال المحاضرة (نظام `ACME`) حدد بدقة: كل جهاز `PC` يحتاج كرت شبكة `Ethernet`، وقارئ باركود يتصل عبر `serial port` — كلها ضمن `External Interfaces`.

## المحاضرة 11: Software Requirements Specification - 2 (وثيقة متطلبات البرمجيات - الجزء الثاني) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 203 (متوسط)
What is the purpose of including the traceability matrix in the SRS document?
أ) To map test cases to requirements for validation purposes.
ب) To provide a detailed breakdown of project milestones.
ج) To outline the software architecture and design patterns.
د) To document user feedback and improvement suggestions.
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
مصفوفة التتبع (`Traceability Matrix`) تربط كل متطلب بحالات الاختبار المصمَّمة للتحقق منه — وهذا تطبيق عملي مباشر لمبدأ `Traceability` اللي شرحته محاضرة إدارة المتطلبات: القدرة على ربط كل متطلب بمصدره وبتنفيذه/اختباره لاحقاً.

ب) تفصيل معالم المشروع (`Milestones`) موضوع `Project Plan`، منفصل تماماً.
ج) البنية المعمارية وأنماط التصميم توثَّق في `SDD`، لا مصفوفة التتبع.
د) توثيق ملاحظات المستخدمين نشاط مختلف تماماً (`User Feedback`).

هذا يربط مباشرة بمهام إدارة المتطلبات الثلاث اللي شرحتها المحاضرة: تتبع كل متطلب، الحفاظ على الروابط بين المتطلبات، وتقييم أثر التغيير — ومصفوفة التتبع أداة عملية لتنفيذ هذه المهام.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 204 (سهل)
Which section of the SRS document typically includes details about the performance requirements of the software?
أ) Functional requirements
ب) Non-functional requirements
ج) System constraints
د) User characteristics
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
متطلبات الأداء (`Performance Requirements`) هي أحد الأبواب السبعة لقسم `Specific Requirements` اللي شرحتها المحاضرة، وتقع ضمن فئة `Non-functional Requirements` الأوسع (قيود الجودة زي الأداء والأمان وسهولة الاستخدام).

أ) المتطلبات الوظيفية تصف الوظائف نفسها، لا معايير أدائها الكمّية.
ج) قيود النظام (`Constraints`) عامة أوسع (قوانين، حدود هاردوير) وليست قسم الأداء تحديداً، رغم أنها فئة مرتبطة.
د) خصائص المستخدمين وصفية عن من يستخدم النظام، لا معايير الأداء.

المحاضرة صنّفت `Performance Requirements` كأحد الأبواب السبعة لـ`Specific Requirements`، وكلها تندرج مفاهيمياً تحت مظلة `Non-functional Requirements` بمعناها الواسع.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 205 (سهل)
Which aspect of the SRS document is crucial for ensuring that the software can be maintained and enhanced in the future?
أ) Requirements prioritization
ب) Change control procedures
ج) User acceptance criteria
د) Performance metrics
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
إجراءات التحكم بالتغيير (`Change Control Procedures`) هي التطبيق العملي لإدارة المتطلبات (`Requirements Management`) اللي شرحتها المحاضرة — تتبع التغييرات وتقييم أثرها هو ما يضمن قابلية تطوير النظام وصيانته مستقبلاً دون فوضى.

أ) ترتيب أولويات المتطلبات (`Apportioning`) يخص توزيع العمل عبر الإصدارات، لا الصيانة المستقبلية مباشرة.
ج) معايير قبول المستخدم تخص `Acceptance Testing`، لا آلية التطوير المستقبلي للنظام.
د) مقاييس الأداء تقيس جودة حالية، لا آلية إدارة التغيير المستقبلي.

المحاضرة أكدت أن إدارة المتطلبات يجب أن تبدأ من أول مسودة للوثيقة، وتشمل تتبع كل متطلب وتقييم أثر أي تغيير مقترح — وهذا بالضبط ما يجعل النظام قابلاً للصيانة والتوسعة لاحقاً بأمان.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 206 (سهل)
Which type of requirement specifies constraints on the system's development process and implementation?
أ) Functional requirement
ب) Non-functional requirement
ج) Performance requirement
د) Design requirement
و) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
`Design Constraints` هو أحد الأبواب السبعة الرسمية لقسم `Specific Requirements` اللي شرحتها المحاضرة، ويحدد تحديداً قيوداً على عملية التطوير والتنفيذ (زي إلزامية استخدام تقنية معينة أو معيار برمجي محدد).

أ) المتطلب الوظيفي يصف "ماذا" يفعل النظام، لا قيود عملية التطوير نفسها.
ب) غير الوظيفي فئة أوسع (تشمل الأداء والأمان...)، وليست تحديداً "قيود التطوير والتنفيذ".
ج) متطلب الأداء بُعد واحد فقط من غير الوظيفي، وليس قيود التطوير العامة.

المحاضرة عدّدت السبعة أبواب لـ`Specific Requirements`: `External Interfaces`, `Functions`, `Performance Requirements`, `Logical Database Requirements`, `Design Constraints`, `Software System Attributes`, وطرق التنظيم — و`Design Constraints` هو الباب المخصص تحديداً لقيود التطوير.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 207 (متوسط)
What is the purpose of including assumptions and dependencies in the SRS document?
أ) To outline the risks associated with the software development.
ب) To provide a justification for prioritizing certain requirements.
ج) To clarify the context and limitations of the requirements.
د) To define the acceptance criteria for the software project.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`Assumptions and Dependencies` حسب المحاضرة هي كل العوامل الخارجية غير المضمونة (زي توفر نظام تشغيل معيّن) والتي إذا تغيّرت يجب إعادة النظر في الـ`SRS` كاملة — أي أنها توضّح السياق والحدود الحقيقية اللي بُنيت عليها المتطلبات.

أ) قائمة المخاطر موضوع `Risk Management` المنفصل تماماً.
ب) تبرير أولويات المتطلبات موضوع `Apportioning of Requirements`، بند مختلف.
د) معايير القبول موضوع `Acceptance Testing`، منفصل تماماً.

مثال المحاضرة الكلاسيكي: افتراض توفر نظام تشغيل معيّن على الجهاز المستهدف — لو تبيّن لاحقاً أنه غير متوفر فعلاً، فإن الوثيقة كلها تحتاج مراجعة، وهذا بالضبط توضيح "حدود وسياق" المتطلبات.

## المحاضرة 12: Software Quality (جودة البرمجيات) (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 208 (متوسط)
Which of the following best defines software quality?
أ) Low number of defects found during testing
ب) Adherence to project timelines
ج) Implementation of advanced programming techniques
د) Conformance to explicit and implicit requirements
و) None of the above
**الإجابة الصحيحة: د**
**التعليل:**
هذا التعريف مطابق حرفياً لتعريفي `IEEE` و`ISO` اللذين شرحتهما المحاضرة: الجودة هي الدرجة التي يحقق فيها النظام المتطلبات المحددة رسمياً *و* احتياجات المستخدم الضمنية (`implicit`) غير المكتوبة — وهذا بالضبط "Conformance to explicit and implicit requirements".

أ) قلة عدد الأخطاء نتيجة محتملة للجودة، لكنها ليست التعريف الشامل نفسه (`Correctness` عامل واحد من 12).
ب) الالتزام بالجدول الزمني معيار إداري، لا تعريف الجودة نفسه.
ج) استخدام تقنيات برمجة متقدمة لا يضمن الجودة بحد ذاته (قد تكون معقدة وصعبة الصيانة رغم "تقدمها").

المحاضرة أكدت أن برنامجاً قد يطابق الوثيقة حرفياً 100% لكنه يبقى "سيء الجودة" لو لم يلبِّ الاحتياجات الضمنية غير المكتوبة — وهذا بالضبط سبب أهمية كلمة "implicit" في التعريف.

## المحاضرة الكل: أسئلة عامة (تابع — دورات لاحقة)

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 209 (صعب)
Weighted Methods per Class (WMC) is calculated as:
أ) The total number of methods in a class.
ب) The sum of the Cyclomatic Complexity (CC) of all methods in a class.
ج) The ratio of methods to attributes in a class.
د) The average number of methods across all classes in a system.
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`WMC` (Weighted Methods per Class) يُحسب بجمع قيم `Cyclomatic Complexity` لكل دوال الفئة معاً — وهذا هو التعريف الدقيق حسب مقاييس `Chidamber & Kemerer` اللي شرحتها المحاضرة.

أ) عدّ الدوال فقط (بدون وزن `CC`) تعريف أبسط لا يطابق `WMC` الفعلي (لهذا تسمى "Weighted" أي موزونة بالتعقيد، لا معدودة فقط).
ج) نسبة الدوال للخصائص مفهوم مختلف تماماً، لا علاقة له بـ `WMC`.
د) متوسط عدد الدوال عبر النظام كامل مقياس مختلف (على مستوى النظام لا الفئة).

المحاضرة أعطت قاعدة عملية: `WMC` بقيمة 20 لفئة تُعتبر جيدة، لكن يُفضّل عدم تجاوز 40 — وهذا الرقم هو نتيجة جمع `CC` لكل الدوال، لا عدّها فقط.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 210 (سهل)
Which metric is most closely associated with measuring the maintainability of software systems?
أ) Cyclomatic Complexity (CC)
ب) Lack of Cohesion in Methods (LCOM)
ج) Number of Children (NOC)
د) Coupling Between Objects (CBO)
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
المحاضرة صرّحت أن `Cyclomatic Complexity` العالية تُستخدم كمؤشر مباشر على انخفاض `Maintainability` وانخفاض `Reliability` معاً — وهي أكثر مقياس ذُكر صراحة كـ"مؤشر على صعوبة الصيانة" في محاضرات `Measurement`.

ب) `LCOM` مرتبط بجودة التصميم (المسؤولية الواحدة) وقد يؤثر على الصيانة بشكل غير مباشر، لكن الربط الصريح بـ`Maintainability` في المحاضرة كان لـ`CC` تحديداً.
ج) `NOC` يخص هيكل الوراثة (العرض)، لا علاقة مباشرة موثّقة بالصيانة.
د) `CBO` يخص الاقتران؛ اقتران مرتفع يصعّب الصيانة، لكنه ليس المقياس "الأكثر ارتباطاً" المذكور صراحة في المحاضرة لهذا الغرض تحديداً.

هذا يربط مباشرة بمحاضرة `Software Measurement`: `Internal Attributes` (زي `CC`) تُستخدم كمؤشرات على `External Attributes` (زي `Maintainability`) الصعبة القياس المباشر.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 211 (سهل)
Which metric is useful for identifying classes that might be candidates for refactoring due to high complexity?
أ) Weighted Methods per Class (WMC)
ب) Lack of Cohesion in Methods (LCOM)
ج) Cyclomatic Complexity (CC)
د) Number of Children (NOC)
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
المحاضرة أكدت أن `CC` تُستخدم كإشارة تحذير لفرق `QA` ولتحديد أولويات الاختبار والصيانة — وهي المقياس القياسي لتحديد الدوال/الفئات المعقدة اللي تحتاج `Refactoring` (تجاوز `V(G)=10` مؤشر خطر واضح).

أ) `WMC` مؤشر مفيد أيضاً (مجموع `CC`)، لكن `CC` نفسها أكثر تحديداً ومباشرة كمقياس تحذير للتعقيد المفرد المستهدف بالـ`Refactoring`.
ب) `LCOM` يشير لمشكلة تصميمية مختلفة (تعدد المسؤوليات)، لا التعقيد المنطقي تحديداً.
د) `NOC` يخص هيكل الوراثة، لا علاقة مباشرة بالتعقيد الداخلي.

هذا يربط `Software Measurement` بـ `Refactoring` مباشرة: `CC` العالية هي أشهر "`Code Smell`" رقمي موثّق يستدعي تطبيق تقنيات مثل `Extract Method` أو `Compose Method`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 212 (سهل)
Which testing technique is primarily concerned with internal logic and structure of the code?
أ) White-box testing
ب) Black-box testing
ج) Grey-box testing
د) Integration testing
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
`White-box testing` يصمَّم حالاته بناءً على معرفة كاملة بالبنية الداخلية للكود (المسارات، الشروط، الحلقات) — مطابق تماماً لنص السؤال "internal logic and structure".

ب) `Black-box testing` يعتمد المواصفات الخارجية فقط، بدون أي معرفة بالكود الداخلي.
ج) `Grey-box testing` معرفة جزئية فقط بالداخل، لا معرفة كاملة.
د) `Integration testing` يخص تفاعل المكونات ببعضها، لا البنية الداخلية لكود واحد تحديداً.

هذا الفرق (`White-box` مقابل `Black-box`) هو أهم مفهوم متكرر بين محاضرتي `Testing` و`JUnit` معاً.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 213 (سهل)
Grey-box testing combines elements of both white-box and black-box testing, focusing on:
أ) Testing at the user interface level only
ب) Testing based on code coverage criteria
ج) Testing with partial knowledge of the internal code structure
د) Testing with automated scripts only
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`Grey-box testing` مزيج بين النهجين — المُختبِر عنده معرفة جزئية (`partial knowledge`) بالبنية الداخلية للكود، يستخدمها لتصميم اختبارات أذكى، لكن دون رؤية كاملة كما في `White-box`.

أ) الاقتصار على واجهة المستخدم فقط وصف أقرب لـ`Black-box` وليس المزيج الموصوف بـ`Grey-box`.
ب) معايير تغطية الكود (`code coverage`) تحتاج معرفة كاملة بالكود، أقرب لـ`White-box` الصرف.
د) الاعتماد على سكربتات آلية فقط ليس تعريف `Grey-box`؛ يخص الأتمتة بشكل عام.

ملاحظة: `Grey-box testing` لم يُشرح بالتفصيل في محاضرات المادة (`Testing` أو `JUnit`) بنفس هذا العمق، لكنه امتداد منطقي مباشر للفرق بين `White-box` و`Black-box` اللي شرحتهما المحاضرتان بوضوح.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 214 (متوسط)
What is the primary purpose of a Software Requirement Specification (SRS)?
أ) To describe the design architecture of the software system.
ب) To provide a detailed description of the software's user interface.
ج) To define the functional and non-functional requirements of the software.
د) To outline the project management plan for software development.
و) None of the above
**الإجابة الصحيحة: ج**
**التعليل:**
`SRS` هي البيان الرسمي لما يجب على المطورين تنفيذه، وتشمل متطلبات المستخدم (`User Requirements`) والمواصفة التفصيلية لمتطلبات النظام (`System Requirements`) — أي الوظيفية وغير الوظيفية معاً، وتعمل عملياً كـ"عقد" بين المطوّر والعميل.

أ) المعمارية توثَّق في `SDD` (Software Design Description)، وثيقة منفصلة تأتي بعد `SRS`.
ب) واجهة المستخدم جزء واحد فقط من `SRS` (ضمن `External Interfaces`)، وليست غرضها الأساسي الشامل.
د) خطة إدارة المشروع وثيقة منفصلة تماماً (`Project Plan`).

`SRS` مبنية على معيار `IEEE 830` اللي شرحته المحاضرات: `Introduction`, `General/Overall Description`, و`Specific Requirements` — وكل هذا يخدم هدفاً واحداً: تعريف الوظيفي وغير الوظيفي بدقة.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 215 (سهل)
In an SRS document, what does the term "use case" refer to?
أ) A description of how the software will be tested.
ب) A specific sequence of actions performed by the system.
ج) The project timeline for software development.
د) A list of potential risks associated with the software project.
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`Use Case` يمثّل تفاعلاً محدداً بين الفاعلين (`actors`) والنظام، أي سلسلة أفعال محددة (`specific sequence of actions`) ينفذها النظام استجابة لحافز معيّن — كما شرحته محاضرة `Design and Implementation` ضمن `Interaction Model`.

أ) وصف كيفية الاختبار موضوع `Test Plan`، لا `Use Case`.
ج) الجدول الزمني موضوع `Project Plan`، لا علاقة له بـ`Use Case`.
د) قائمة المخاطر موضوع `Risk Management`، منفصل تماماً.

كل `Use Case` يُوثَّق بجدول فيه: النظام، اسم الحالة، الفاعلين، الوصف الكامل، الحافز، والاستجابة — وهذا التسلسل المحدد للأفعال هو جوهر تعريف `Use Case`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 216 (سهل)
In an SRS document, what does the term "validation" refer to?
أ) Ensuring that the software complies with legal regulations.
ب) Checking that the software meets specified requirements.
ج) Verifying the software's compatibility with different operating systems.
د) Testing the software for performance under load conditions.
و) None of the above
**الإجابة الصحيحة: ب**
**التعليل:**
`Validation` حسب محاضرتي `Testing` و`Requirements` تعني التحقق من أن النظام يلبّي فعلاً المتطلبات المحددة واحتياجات المستخدم الحقيقية — "هل بنينا المنتج الصحيح؟".

أ) الامتثال للقوانين موضوع `Regulatory Compliance`، جزء واحد محتمل من `Non-functional Requirements` لا تعريف `Validation` العام.
ج) التوافق مع أنظمة تشغيل مختلفة أقرب لـ`Portability`، مقياس مختلف.
د) اختبار الأداء تحت حِمل هو `Stress/Performance Testing`، نوع اختبار محدد لا تعريف `Validation` الشامل.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 217 (سهل)
What does the term "feasibility study" typically address in relation to the SRS document?
أ) The technical capabilities required to develop the software.
ب) The financial costs associated with software development.
ج) The market demand for the software product.
د) The timeline for completing software development milestones.
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
دراسة الجدوى (`Feasibility Study`) في سياق هندسة المتطلبات تركّز أساساً على تقييم القدرات التقنية المطلوبة لتطوير النظام فعلياً — هل الحل التقني ممكن أصلاً ضمن الموارد والتقنية المتاحة؟

ب) الجدوى المالية (`Financial Feasibility`) بُعد آخر من دراسة الجدوى العامة، لكن ليس البُعد "التقني" المباشر المرتبط بالـ`SRS` تحديداً.
ج) الطلب السوقي بُعد تسويقي أوسع، ليس جزءاً مباشراً من محتوى `SRS` التقني.
د) الجدول الزمني موضوع `Project Plan`، لا دراسة الجدوى نفسها.

ملاحظة: "Feasibility Study" لم يُشرح بالتفصيل الدقيق ضمن محاضرات `SRS` (10/11) بهذه التسمية المحددة، والإجابة معتمدة على معرفة عامة قياسية في هندسة المتطلبات تكمّل ما درسناه عن `Assumptions and Dependencies` و`Constraints`.

**المصدر:** [نمط 2023-2024 — الفصل الثاني]
### السؤال 218 (سهل)
Which project management process involves validating the completeness and correctness of the Work Breakdown Structure (WBS)?
أ) Scope verification
ب) Quality assurance
ج) Risk management
د) Change control
و) None of the above
**الإجابة الصحيحة: أ**
**التعليل:**
`Scope Verification` هي العملية القياسية في إدارة المشاريع للتحقق من أن `WBS` يغطي فعلاً كل نطاق المشروع بشكل كامل وصحيح، بدون نقص أو تكرار.

ب) ضمان الجودة (`Quality Assurance`) يخص معايير تطوير المنتج نفسه، لا اكتمال `WBS` تحديداً.
ج) إدارة المخاطر موضوع منفصل تماماً.
د) التحكم بالتغيير يخص إدارة التعديلات على المتطلبات لاحقاً، لا التحقق الأولي من `WBS`.

ملاحظة: مصطلح "Scope Verification" تحديداً لم يُستخدم بهذا الاسم في محاضرة إدارة المشاريع، والإجابة معتمدة على معرفة عامة قياسية في إدارة المشاريع تكمّل مفهوم `Scope` كأحد بنود `Project Plan` الأربعة عشر.

**المصدر:** [نمط 2025-2026]
### السؤال 219 (صعب)
High RFC correlates with?
أ) No inherit
ب) Low coupling
ج) Perfect cohesion
د) High complexity
**الإجابة الصحيحة: د**
**التعليل:**
`RFC` (Response For a Class) يعدّ مجموع الدوال اللي ممكن تُستدعى استجابة لرسالة توصل للفئة — كلما زاد هذا العدد، زاد عدد المسارات المحتملة والتفاعلات الممكنة، وهذا يرتبط مباشرة بارتفاع التعقيد الكلي للفئة.

أ) لا علاقة مباشرة بين `RFC` والوراثة تحديداً؛ `RFC` يخص الاستجابة للرسائل بشكل عام.
ب) `RFC` مرتفع غالباً يعني اقتراناً أعلى (فئة تتفاعل مع دوال كثيرة)، لا اقتراناً منخفضاً.
ج) التماسك المثالي (`LCOM=0`) مفهوم منفصل تماماً عن `RFC`، ولا علاقة مباشرة موثّقة بينهما بهذا الاتجاه.

هذا يربط `RFC` بنفس فلسفة `CC` و`WMC`: كل مقياس يعدّ "عدد المسارات/الاستجابات الممكنة" يرتبط إحصائياً بارتفاع التعقيد وصعوبة الفهم والاختبار.

**المصدر:** [نمط 2025-2026]
### السؤال 220 (سهل)
Agile principle violation in Scrum:fixed 6 month sprints?
أ) Product backlog
ب) Daily standups
ج) Short time-boxed
د) Retrospectives
**الإجابة الصحيحة: ج**
**التعليل:**
أحد أهم مبادئ `Scrum`/`Agile` هو أن تكون الدورات (`sprints`) قصيرة ومحددة زمنياً بدقة (`short time-boxed`, عادة 2-4 أسابيع) — سبرنت ثابت لمدة 6 أشهر يخالف هذا المبدأ الجوهري تماماً، لأنه يفقد الفائدة الأساسية من الدورات القصيرة (تغذية راجعة سريعة ومتكررة).

أ) وجود `Product Backlog` ممارسة سليمة بحد ذاتها، غير منتهَكة هنا.
ب) الاجتماعات اليومية (`Daily Standups`) ممارسة منفصلة، لا علاقة لها بطول السبرنت.
د) اجتماعات المراجعة (`Retrospectives`) ممارسة منفصلة أيضاً، لا تتأثر مباشرة بطول السبرنت نفسه.

هذا يربط بمبدأ `Agile Manifesto` الأساسي: "تسليم برمجيات شغّالة بشكل متكرر" — وسبرنت 6 أشهر يناقض هذا المبدأ جذرياً، لأنه يعيد بنية `Waterfall` الطويلة داخل غلاف يُسمّى "Scrum" بالاسم فقط.

**المصدر:** [نمط 2025-2026]
### السؤال 221 (سهل)
White-box: Statement coverage needs?
أ) All branches
ب) Every line executed once
ج) All paths
د) MC/DC
**الإجابة الصحيحة: ب**
**التعليل:**
`Statement Coverage` (تغطية الجُمل/الأسطر) تشترط فقط أن يُنفَّذ كل سطر/جملة في الكود مرة واحدة على الأقل أثناء الاختبار — وهذا أضعف مستويات التغطية وأسهلها تحقيقاً.

أ) تغطية كل الفروع (`branch coverage`) مستوى أقوى؛ يشترط تنفيذ كل نتيجة ممكنة لكل شرط (صح/خطأ)، لا مجرد تنفيذ السطر.
ج) تغطية كل المسارات (`path coverage`) أقوى مستوى، يشترط تغطية كل تركيبة ممكنة من المسارات عبر الدالة كاملة.
د) `MC/DC` (Modified Condition/Decision Coverage) مستوى متقدم جداً يُستخدم في الأنظمة الحرجة للسلامة، أعقد بكثير من مجرد تنفيذ الأسطر.

المحاضرة (`JUnit`/`Testing`) ربطت `Coverage` بنسبة الأسطر المُنفَّذة أثناء الاختبار — و`Statement Coverage` هو أبسط تجسيد مباشر لهذا التعريف الأساسي.

**المصدر:** [نمط 2025-2026]
### السؤال 222 (سهل)
What's the main advantage of integrating metrics collection tools with automated build systems?
أ) integrating bulk data for manual review
ب) Replaces manual testing
ج) Only tracks project schedule
د) Tools add overhead slowing builds
ه) Provide real time feedback for quality
**الإجابة الصحيحة: ه**
**التعليل:**
دمج أدوات جمع المقاييس (زي `SourceCodeMetrics` أو `Metrics` اللي ذكرتها محاضرة `Measurement`) مع أنظمة البناء الآلي (`automated build systems`) يوفر تغذية راجعة فورية (`real time feedback`) عن جودة الكود مع كل تعديل، بدل انتظار مراجعة يدوية لاحقة.

أ) "تجميع بيانات ضخمة للمراجعة اليدوية" يناقض فكرة الأتمتة والفورية نفسها.
ب) استبدال الاختبار اليدوي بالكامل مبالغة — المقاييس أداة تكميلية، لا بديل عن الاختبار.
ج) الاقتصار على تتبع الجدول الزمني فقط يتجاهل الفائدة الأوسع لمقاييس الجودة (`CC`, `Coverage`, `Defect Density`...).
د) عكس الفائدة الفعلية تماماً — الهدف تسريع اكتشاف المشاكل، لا إبطاء البناء.

هذا يربط بأدوات المحاضرة (`SourceCodeMetrics` في `NetBeans`, `Metrics` في `Eclipse`) اللي تحسب المقاييس آلياً بدل الحساب اليدوي — ودمجها مع البناء الآلي يعطي هذه الفائدة فورياً مع كل تعديل بالكود.

**المصدر:** [نمط 2025-2026]
### السؤال 223 (سهل)
In OCL, what is the main advantage of specifying invariants on classes compared to embedding validation logic in code?
أ) OCL invariants are executer faster than code
ب) Invariants provide a formal, declarative specification independent of implementation facilitating early validation
ج) Embedding logic is more reusable
د) OCL cannot represent complex constraints
**الإجابة الصحيحة: ب**
**التعليل:**
`OCL` (Object Constraint Language) يعطي مواصفة صريحة رسمية وتصريحية (`formal, declarative`) لقيود الفئة، منفصلة تماماً عن أي كود تنفيذي معيّن — وهذا يتيح التحقق منها مبكراً (`early validation`) حتى قبل كتابة الكود الفعلي، بعكس منطق التحقق المطمور داخل الكود نفسه.

أ) لا علاقة لـ`OCL` بسرعة التنفيذ؛ هو لغة مواصفات (`specification language`) لا تنفيذية أصلاً.
ج) تضمين منطق التحقق داخل الكود عادة أقل قابلية لإعادة الاستخدام (مرتبط بلغة/منصة معيّنة)، عكس `OCL` المستقل عن التنفيذ.
د) `OCL` قادرة فعلياً على التعبير عن قيود معقدة جداً (متعددة الفئات)، رغم أنها قد تصبح مطوَّلة (نقطة تُذكر بسؤال آخر بنفس الدورة).

ملاحظة: `OCL` لم تُشرح في محاضرات المادة المتوفرة (اللي ركّزت على `UML` structural/dynamic models عموماً)، والإجابة معتمدة على معرفة عامة قياسية في هندسة المتطلبات والتصميم الشكلي (`formal specification`) تكمّل مفهوم `Design Models` اللي شرحته محاضرة `Design and Implementation`.

**المصدر:** [نمط 2025-2026]
### السؤال 224 (متوسط)
How does OCL support model-driven development in ensuring model consistency?
أ) By Generating all code automatically without constraints
ب) By Specifying precise semantic conditions that must always hold true, enabling tool based model verification
ج) By Documenting code comments
د) By Replacing UML diagrams
ه) By validating project scheduales
**الإجابة الصحيحة: ب**
**التعليل:**
`OCL` تتيح تحديد شروط دلالية دقيقة (`precise semantic conditions`) يجب أن تبقى صحيحة دائماً على نموذج `UML`، وهذا يمكّن أدوات التحقق الآلي (`tool-based model verification`) من فحص اتساق النموذج قبل توليد الكود أو حتى أثناء التطوير.

أ) توليد الكود تلقائياً بدون قيود يناقض جوهر وجود `OCL` أصلاً (اللي هي إضافة قيود، لا إزالتها).
ج) توثيق تعليقات الكود نشاط مختلف تماماً عن مواصفة رسمية للقيود.
د) `OCL` تُستخدم *مع* مخططات `UML` لتوضيح قيود لا يمكن التعبير عنها رسومياً، لا لتحل محلها.
ه) لا علاقة لـ`OCL` بجداول المشروع الزمنية إطلاقاً.

**المصدر:** [نمط 2025-2026]
### السؤال 225 (سهل)
What limitation does OCL have when expressing cross-cutting system-wide constraints?
أ) It can only specify single-class properties
ب) OCL can specify complex multi-class constraints but can become verbose and hard to maintain for large systems
ج) It enforces constraints at runtime only
د) It cannot specify cardinality constraints
ه) It replaces all testing efforts
**الإجابة الصحيحة: ب**
**التعليل:**
`OCL` قادرة فعلياً على التعبير عن قيود معقدة تشمل عدة فئات معاً، لكن كلما زاد نطاق النظام وتعقيد القيود، أصبحت عبارات `OCL` طويلة ومطوَّلة (`verbose`) وصعبة الصيانة على المدى الطويل — وهذه هي حدودها العملية الحقيقية، لا عجزها الكامل عن التعبير.

أ) الادعاء بأنها "تقتصر على خاصية فئة واحدة فقط" خطأ مباشر — `OCL` تدعم قيوداً متعددة الفئات (زي مثال `context Order` في سؤال آخر بنفس الدورة).
ج) `OCL` قيود تصريحية، وليست بالضرورة مقتصرة على التنفيذ وقت التشغيل فقط؛ يمكن التحقق منها تصميمياً أيضاً.
د) `OCL` تدعم فعلياً التعبير عن قيود العدد (`cardinality`) بوضوح.
ه) `OCL` أداة تكميلية للتصميم الشكلي، لا بديلاً كاملاً عن الاختبار.

**المصدر:** [نمط 2025-2026]
### السؤال 226 (متوسط)
How can OCL preconditions complement system testing strategies?
أ) Preconditions invalidate databases
ب) Preconditions ensure method contracts are respected before execution, enabling static analysis and targeted test generation
ج) Preconditions only validate user input UI-side
د) Preconditions replace integration tests
ه) preconditions generate cod automatically
**الإجابة الصحيحة: ب**
**التعليل:**
شروط `OCL` المسبقة (`preconditions`) تحدد بدقة الحالة الواجب توفرها قبل تنفيذ عملية معيّنة (عقد الدالة `method contract`) — وهذا يتيح تحليلاً ساكناً (`static analysis`) وتوليد حالات اختبار موجَّهة (`targeted test generation`) تحديداً حول هذه الشروط الحدودية.

أ) لا علاقة لـ`preconditions` بإبطال قواعد البيانات مباشرة.
ج) `preconditions` تخص عقد الدالة البرمجية عموماً، لا مجرد التحقق من مدخلات واجهة المستخدم فقط.
د) `preconditions` تكمّل اختبار التكامل، لا تحل محله بالكامل.
ه) `OCL` لا تولّد كوداً تنفيذياً؛ هي لغة مواصفات فقط.

هذا يربط بمفهوم `pre/postconditions` مقابل `invariants` اللي شرحه سؤال آخر بنفس الدورة: `preconditions` تحدد الحالة المطلوبة *قبل* تنفيذ العملية تحديداً.

**المصدر:** [نمط 2025-2026]
### السؤال 227 (سهل)
What is a common pitfall when using OCL to specify multiplicity constraints in UML?
أ) OCL does not support multiplicity
ب) Incorrectly translating UML multiplicities to OCL collection size expressions can lead to incomplete constraint checking
ج) Multiplicity is enforced by compilers
د) Multiplicities apply only to attributes, not associations
ه) OCL  automatically infers multiplicity
**الإجابة الصحيحة: ب**
**التعليل:**
الخطأ الشائع الفعلي هو ترجمة قيود التعدد (`multiplicity`) في `UML` (زي "0..*" أو "1..1") لتعبيرات حجم مجموعة (`collection size expressions`) في `OCL` بشكل غير دقيق — مما يؤدي لفحص قيود ناقص لا يغطي كل الحالات الحدودية فعلياً.

أ) `OCL` تدعم فعلياً التعبير عن `multiplicity` عبر عمليات المجموعات (`->size()`, وغيرها).
ج) المترجمات (`compilers`) لا تفرض قيود `multiplicity` هذه تلقائياً؛ هذا دور `OCL`/أدوات التحقق النموذجي.
د) قيود `multiplicity` تنطبق على العلاقات (`associations`) بقدر ما تنطبق على الخصائص، لا الخصائص فقط.
ه) `OCL` لا تستنتج `multiplicity` تلقائياً؛ يجب تحديدها صراحة من المصمم.

**المصدر:** [نمط 2025-2026]
### السؤال 228 (صعب)
When refining an OCL constraint specifying self.age > 18 on a Person class, how should exceptions or domain variations be handled?
أ) Ignore exceptions for simplicity
ب) Model exceptions explicitly using OCL conditional expressions or extend the metamodel with stereotypes
ج) Document exceptions outside the model only
د) Assume all domain instances follow the rule strictly
**الإجابة الصحيحة: ب**
**التعليل:**
الاستثناءات أو تنويعات المجال (`domain variations`) يجب أن تُنمذَج صراحة داخل `OCL` نفسها عبر تعبيرات شرطية (`conditional expressions`, زي `if-then-else`) أو عبر توسيع النموذج الفوقي (`metamodel`) بإضافة `stereotypes` مخصصة تعبّر عن الحالة الاستثنائية بشكل رسمي.

أ) تجاهل الاستثناءات لأجل البساطة يفقد النموذج دقته ويسمح بحالات غير صحيحة تمر دون فحص.
ج) توثيق الاستثناءات خارج النموذج فقط (كملاحظة نصية) يفصلها عن آلية التحقق الآلي، فتفقد قيمتها العملية.
د) افتراض التزام كل الحالات بالقاعدة بصرامة يتجاهل واقع أن النماذج الحقيقية غالباً فيها استثناءات مشروعة (زي حالات قانونية خاصة).

هذا يربط بمرونة `OCL` كلغة رسمية: القدرة على التعبير عن حالات استثنائية داخل القيد نفسه (لا خارجه) هي ما يجعلها أداة تحقق آلي موثوقة فعلياً.

**المصدر:** [نمط 2025-2026]
### السؤال 229 (متوسط)
In what way do OCL invariants differ from pre- and postconditions during modeling behaviour?
أ) Invariants apply to system startup only
ب) Invariants specify conditions hailing at all times; preconditions specify required states before operations; postconditions specify expected states after operations
ج) They are interchangeable OCL cannot express exceptions
د) Preconditions replace invariants
ه) postcondition are optional
**الإجابة الصحيحة: ب**
**التعليل:**
هذا الفرق الثلاثي دقيق ومهم: الثابتات (`invariants`) يجب أن تبقى صحيحة **دائماً** طوال دورة حياة الكائن، بينما الشروط المسبقة (`preconditions`) تحدد الحالة المطلوبة قبل تنفيذ عملية معيّنة فقط، والشروط اللاحقة (`postconditions`) تحدد الحالة المتوقعة بعد انتهائها فقط — كل نوع يغطي "متى" مختلف تماماً.

أ) الثابتات لا تقتصر على بداية تشغيل النظام فقط؛ يجب أن تبقى صحيحة طوال الوقت.
ج) الثلاثة ليست قابلة للتبادل إطلاقاً؛ كل نوع يخدم غرضاً زمنياً مختلفاً تماماً.
د) الشروط المسبقة لا تحل محل الثابتات؛ كلاهما يعملان معاً بأدوار مختلفة.
ه) الشروط اللاحقة ليست اختيارية إذا أردنا ضماناً كاملاً لسلوك العملية المتوقع.

**المصدر:** [نمط 2025-2026]
### السؤال 230 (متوسط)
Why might OCL specifications become a barrier in fast-paced agile projects, and how can this be mitigated?
أ) OCL always speeds up agile processes
ب) Writing and maintaining OCL constraints require upfront effort; mitigated by selective application and tool support integrated with agile workflows
ج) OCL replaces acceptance tests
د) OCL is universally adopted in agile
ه) Agile does not require constraint
**الإجابة الصحيحة: ب**
**التعليل:**
كتابة وصيانة قيود `OCL` تتطلب جهداً مسبقاً (`upfront effort`) قد يتعارض مع سرعة `Agile` وتغيّر المتطلبات المستمر — والحل العملي هو التطبيق الانتقائي (`selective application`, فقط على الأجزاء الحرجة) مع دعم أدوات متكاملة ضمن سير عمل `Agile` بدل التوثيق الشامل لكل شيء.

أ) `OCL` تضيف جهداً إضافياً في البداية، لا تسرّع `Agile` تلقائياً.
ج) `OCL` أداة تحقق تصميمي شكلي، لا بديل عن اختبارات القبول الوظيفية.
د) `OCL` ليست معتمدة عالمياً في مشاريع `Agile`؛ استخدامها أقل شيوعاً بسبب التوتر مع السرعة المطلوبة.
ه) مشاريع `Agile` تحتاج قيوداً وضوابط جودة أيضاً، لكن بشكل أخف وأكثر انتقائية.

هذا يربط بنفس التوتر اللي شرحته محاضرة `Requirements` بين `SRS` الرسمية الشاملة و`user stories` الأخف في `Agile` — نفس المبدأ ينطبق هنا على `OCL`: التوثيق الرسمي الكامل له كلفة يجب موازنتها بحسب سياق المشروع.

**المصدر:** [نمط 2025-2026]
### السؤال 231 (متوسط)
In an OCL constraint specifying context Order inv: self.items->forAll(price) > 0}, what is the semantic intersection and how does this facilitate mode validation?
أ) It restricts prices to be exactly zero, simplifying calculations.
ب) Applies only to the first item in the collection.
ج) It ensures that every item in the order has a positive price, enabling automatic consistency checks of business rules.
د) It imposes no actual constant at runtime.
**الإجابة الصحيحة: ج**
**التعليل:**
عبارة `forAll` في `OCL` تطبَّق على **كل** عنصر في المجموعة (`items`) بدون استثناء — فتفرض أن كل عنصر في الطلب (`Order`) يملك سعراً موجباً، وهذا يمكّن فحصاً آلياً ومستمراً لاتساق قاعدة عمل (`business rule`) أساسية دون الحاجة لكتابة هذا التحقق يدوياً في كل مكان بالكود.

أ) القيد لا "يقيّد السعر ليكون صفراً بالضبط"؛ بل يفرض أن يكون *أكبر* من صفر لكل عنصر.
ب) `forAll` تشمل كل عناصر المجموعة، لا العنصر الأول فقط (هذا وصف `->first()` أو ما شابه، لا `forAll`).
د) القيد يفرض فعلاً قاعدة تحقق حقيقية قابلة للفحص، وليس بلا أثر.

هذا مثال تطبيقي مباشر على فكرة "الثابتات" (`invariants`) اللي يجب أن تبقى صحيحة دائماً على كل عناصر المجموعة، وهو نفس مبدأ سؤال آخر بنفس الدورة عن الفرق بين `invariants` و`pre/postconditions`.

**المصدر:** [نمط 2025-2026]
### السؤال 232 (متوسط)
Which of the following best explains why metrics must be interpreted in project context to avoid misleading conclusions?
أ) Only standard values matter.
ب) Metrics values are universal.
ج) Metrics near directly translate into productivity.
د) Metrics has no impact.
ه) Metrics are influenced by project size, domain complexity, and practices and must be contextualized.
**الإجابة الصحيحة: ه**
**التعليل:**
المحاضرة نبّهت مراراً (خصوصاً عند شرح `LOC` و`Defect Density`) أن المقاييس تتأثر بعوامل السياق: حجم المشروع، تعقيد المجال، وممارسات الفريق — ولهذا لازم تُفسَّر ضمن سياقها، لا كأرقام مطلقة قابلة للمقارنة بلا شروط بين مشاريع مختلفة تماماً.

أ) "فقط القيم القياسية تهم" يتجاهل ضرورة السياق الذي أكدته المحاضرة صراحة.
ب) "قيم عالمية" عكس الحقيقة تماماً — مثال `LOC` وحده أثبت أنه يعتمد على اللغة والسياق.
ج) الترجمة المباشرة للإنتاجية مبالغة (نفس الخطأ اللي حذّرت منه المحاضرة بخصوص `LOC` كمقياس إنتاجية مضلل أحياناً).
د) "لا تأثير للمقاييس" يناقض الغرض الكامل من محاضرتي `Software Measurement`.

مثال `Defect Density` نفسه يوضح هذا: تطبيع العدد بحجم النظام (`LOC`/`FP`) هو بالضبط الآلية اللي تجعل المقارنة عادلة بين سياقات مختلفة، وبدونها الأرقام المطلقة وحدها مضلِّلة.

**المصدر:** [نمط 2025-2026]
### السؤال 233 (سهل)
Which metric would best guide prioritization for refactoring legacy code with high defect rates?
أ) Test execution speed.
ب) Number of comments.
ج) Lines of code only.
د) UI performance.
ه) Combined cyclomatic complexity and historical defect density.
**الإجابة الصحيحة: ه**
**التعليل:**
الجمع بين `Cyclomatic Complexity` (مؤشر التعقيد الداخلي) و`Defect Density` التاريخية (سجل فعلي للأخطاء) يعطي صورة أدق بكثير من أي مقياس منفرد لتحديد أولويات `Refactoring` — الكود المعقد *و*كثير الأخطاء تاريخياً هو أعلى مرشح فعلي للتحسين.

أ) سرعة تنفيذ الاختبار لا علاقة لها بجودة أو تعقيد الكود نفسه.
ب) عدد التعليقات مقياس سطحي لا يعكس التعقيد الفعلي أو معدل الأخطاء.
ج) `LOC` وحده مقياس حجم بسيط، لا يعكس التعقيد أو الأخطاء التاريخية (كما نبّهت المحاضرة مراراً عن قصوره).
د) أداء واجهة المستخدم غير مرتبط مباشرة بجودة الكود الداخلي المرشَّح لـ`Refactoring`.

هذا يربط مباشرة بمبدأ `Refactoring` اللي شرحته المحاضرة: "نبدأ بأسوأ `smell`" — والجمع بين `CC` و`Defect Density` هو أدق وسيلة كمّية لتحديد "الأسوأ" فعلياً بدل الاعتماد على الحدس وحده.

**المصدر:** [نمط 2025-2026]
### السؤال 234 (متوسط)
How do process metrics like defect arrival rate complement product metrics in software quality management?
أ) Product metrics alone are sufficient.
ب) Process metrics replace product testing.
ج) They are uncorrelated
د) Process metrics only evaluate documentation
ه) Process metrics reveal development health and defect trench impacting product quality
**الإجابة الصحيحة: ه**
**التعليل:**
`Process Metrics` (زي معدل وصول الأخطاء `defect arrival rate`) تكشف صحة عملية التطوير نفسها بمرور الوقت (اتجاهات الأخطاء، استقرار الفريق)، بينما `Product Metrics` تقيس خصائص المنتج النهائي — وكلاهما يكملان بعض لإعطاء صورة شاملة عن جودة البرمجية حسب `SQM` اللي شرحتها محاضرة `Quality`.

أ) الاكتفاء بمقاييس المنتج وحدها يفوّت مؤشرات مبكرة عن مشاكل في العملية نفسها قبل ظهورها في المنتج النهائي.
ب) `Process Metrics` لا تحل محل اختبار المنتج؛ هي مكمِّلة لا بديلة.
ج) عكس الحقيقة — كلاهما مترابطان: عملية سيئة غالباً تنتج معدل أخطاء أعلى بالمنتج.
د) `Process Metrics` أوسع بكثير من مجرد تقييم التوثيق (تشمل الجهد، الجدولة، معدل الأخطاء...).

المحاضرة الأولى فرّقت بوضوح بين `Process Metrics` (تقيس عملية التطوير) و`Product Metrics` (تقيس المنتج) — وهذا السؤال يوضح كيف يخدم النوعان معاً هدف `Software Quality Management` الشامل.

**المصدر:** [نمط 2025-2026]
### السؤال 235 (متوسط)
How does incremental delivery reduce risk in projects with dynamic requirements?
أ) Deliver full documentation upfront.
ب) Focus only on backend development early.
ج) Delay testing to the end.
د) Eliminate change control processes.
ه) Enable early stakeholder feedback and adapt scope
**الإجابة الصحيحة: ه**
**التعليل:**
التسليم التزايدي (`Incremental delivery`) يتيح تغذية راجعة مبكرة من أصحاب المصلحة بعد كل زيادة، مما يسمح بتكييف نطاق المشروع (`adapt scope`) قبل أن يتراكم خطأ فهم كبير — وهذا يقلل مخاطرة "اكتشاف مشكلة كبيرة متأخرة جداً" اللي كانت أكبر عيوب `Waterfall`.

أ) توثيق شامل مسبق يناقض فلسفة `Incremental` نفسها (تسليم قيمة حقيقية تدريجياً، لا وثائق فقط).
ب) التركيز على الخلفية (`backend`) فقط دون تسليم قيمة قابلة للتقييم لا يحقق فائدة التغذية الراجعة المبكرة.
ج) تأجيل الاختبار للنهاية يزيد المخاطرة بدل تقليلها، عكس فلسفة `Incremental` تماماً.
د) إلغاء عمليات التحكم بالتغيير يزيد فوضى `Scope Creep` بدل ضبطها.

هذا يربط مباشرة بفائدة `Iterative Enhancement` الأساسية اللي شرحتها محاضرة `SDLC`: تسليم قيمة حقيقية بسرعة وبشكل متكرر يتيح تصحيح المسار مبكراً بدل انتظار نهاية المشروع كله.

**المصدر:** [نمط 2025-2026]
### السؤال 236 (متوسط)
What role do design patterns play in ensuring system flexibility and maintainability?
أ) Increase development time without benefit.
ب) Replace need for documentation.
ج) Encourage tight coupling for efficiency.
د) Inforce Monolithic architecture.
ه) Provide proven solutions to recurring problems facilitating communication and code reuse.
**الإجابة الصحيحة: ه**
**التعليل:**
أنماط التصميم (`Design Patterns`, زي `Factory`, `Strategy`, `Decorator`, `Visitor`, `State` اللي ذكرتها محاضرة `Refactoring` كحلول لـ`Code Smells` محددة) هي حلول مُجرَّبة (`proven solutions`) لمشاكل تصميمية متكررة، وتسهّل التواصل بين المطورين (لغة مشتركة لوصف الحل) وإعادة استخدام الكود.

أ) رغم وجود جهد تعلّم أولي، الفائدة طويلة المدى (مرونة، صيانة أسهل) تفوق هذا الجهد بكثير — لا "بدون فائدة".
ب) الأنماط لا تلغي الحاجة للتوثيق؛ هي مكمِّلة له (تعطي أسماء موحّدة يسهل توثيقها).
ج) عكس الحقيقة تماماً — الأنماط عادة تُشجّع اقتراناً منخفضاً (`low coupling`)، لا اقتراناً محكماً.
د) الأنماط غالباً تُشجّع تصميماً معيارياً (`modular`)، عكس البنية الأحادية الكتلة (`Monolithic`).

المحاضرة ربطت `Design Patterns` مباشرة بحل `Code Smells` محددة (`Long Method`, `Conditional Complexity`, `Indecent Exposure`...) — وكل نمط هو حل مُجرَّب لمشكلة تصميمية متكررة معروفة.

**المصدر:** [نمط 2025-2026]
### السؤال 237 (صعب)
A complex scientific software requires correctness guarantees beyond conventional testing, How can formal methods and software metrics be integrated programmatically to improve product confidence?
أ) Formal methods replace all metrics
ب) Use formal specifications for critical components complemented by metrics tracking verification progress and residual defect trends.
ج) Metrics alone suffice for correctness.
د) Formal methods and metrics conflict.
ه) Adopt living documentation practices with iterative elicitation, frequent stakeholder involvement, and traceability tools enabling controlled change.
**الإجابة الصحيحة: ب**
**التعليل:**
استخدام المواصفات الشكلية (`formal specifications`) للمكونات الحرجة فقط (مو النظام كله، لأنها مكلفة)، مع تتبّع تقدم التحقق واتجاهات الأخطاء المتبقية عبر مقاييس البرمجيات (زي `Defect Density` و`Failure Rate` اللي شرحتها محاضرة `Measurement`) — هذا يجمع دقة الإثبات الرياضي مع الرصد الكمّي العملي المستمر.

أ) `Formal Methods` لا تلغي الحاجة للمقاييس؛ الاثنان مكمِّلان لبعض (إثبات + رصد كمّي).
ج) المقاييس وحدها لا تضمن "الصحة" (`correctness`) الرياضية المطلقة المطلوبة في برمجيات علمية حساسة.
د) لا يوجد تعارض جوهري بينهما؛ يمكن دمجهما كما وضّح الخيار الصحيح.
ه) هذا الخيار يصف ممارسات إدارة متطلبات مرنة عامة (توثيق حي، استخراج تكراري) وليس تحديداً دمج `Formal Methods` مع المقاييس كما يطلب السؤال.

هذا يربط `Failure Rate` و`Defect Density` (محاضرة `Measurement`) بفكرة أوسع: حتى مع إثبات شكلي رياضي، المراقبة الكمّية المستمرة للعيوب المتبقية تبقى ضرورية لبناء ثقة عملية كاملة بالمنتج.

**المصدر:** [نمط 2025-2026]
### السؤال 238 (صعب)
Analyzing defect reports, you find a correlation between high module coupling and late-stage defects. How should this insight influence your test planning and refactoring priorities?
أ) Ignore couplings testing.
ب) Prioritize testing complex, highly coupled modules early; refactor to reduce coupling and improve maintainability where risk is highest.
ج) Focus testing on low-coupling modules only.
د) Increase complexity to improve modularity.
**الإجابة الصحيحة: ب**
**التعليل:**
بما أن `CBO` المرتفع مرتبط تاريخياً بأخطاء متأخرة، فالمنطقي هو اختبار الوحدات عالية الاقتران مبكراً وبعمق (قبل أن تتراكم عليها اعتماديات أكثر)، مع إعادة هيكلة (`refactor`) هذه الوحدات لتقليل الاقتران وتحسين قابلية الصيانة في أماكن المخاطرة الأعلى تحديداً — تطبيق مباشر للقاعدة الذهبية `Keep low coupling but high cohesion`.

أ) تجاهل اختبار الاقتران يتجاهل بيانات فعلية موثّقة (الارتباط الإحصائي المكتشف بين الاقتران والأخطاء المتأخرة).
ج) الاقتصار على الوحدات منخفضة الاقتران فقط يتجاهل تحديداً الوحدات الأعلى خطورة اللي تحتاج الاهتمام الأكبر.
د) زيادة التعقيد عمداً "لتحسين المعيارية" تناقض منطقي مباشر — المعيارية الجيدة تعني اقتراناً *أقل*، لا تعقيداً أكثر.

هذا يربط `CBO` (محاضرة `Measurement`) بـ`Refactoring` مباشرة: الاقتران المرتفع مؤشر تصميمي يستدعي تطبيق تقنيات تقليل الاقتران (زي `Factory Pattern` لإخفاء التفاصيل الداخلية) في أماكن المخاطرة الأعلى بالضبط.

**المصدر:** [نمط 2025-2026]
### السؤال 239 (صعب)
Your project met reveals high LOC growth. How would you interpret your coverage, what actions would you consider?
أ) Metrics are unreliable.
ب) Potential code bloat and complexity increase may not reflect defect rates; consider metrics on complexity, code reviews, and refactoring.
ج) Increase new feature development.
د) Ignore LOC and focus on testing only.
**الإجابة الصحيحة: ب**
**التعليل:**
نمو `LOC` الكبير قد يعكس تضخماً في الكود (`code bloat`) وزيادة تعقيد حقيقية، لكنه لا يعكس بالضرورة معدل الأخطاء الفعلي (كما نبّهت المحاضرة: `LOC` مقياس حجم بسيط لا يعكس التعقيد الحقيقي) — لذلك الإجراء الصحيح هو النظر لمقاييس تعقيد إضافية (`CC`, `WMC`)، مراجعات كود (`code reviews`)، واحتمال الحاجة لـ`Refactoring`.

أ) "المقاييس غير موثوقة بالكامل" استنتاج مبالغ فيه؛ المشكلة في تفسير مقياس واحد بمعزل عن غيره، لا في المقاييس نفسها.
ج) زيادة تطوير ميزات جديدة يتجاهل المشكلة الأساسية (تضخم الكود المحتمل) ويزيدها سوءاً.
د) تجاهل `LOC` تماماً والتركيز فقط على الاختبار يفوّت فرصة تشخيص السبب الجذري المحتمل (تعقيد متزايد).

هذا يربط مباشرة بتحذير المحاضرة من الاعتماد على `LOC` وحده: يجب قراءته دائماً مع مقاييس تعقيد أخرى (`CC`) لفهم الصورة الكاملة قبل اتخاذ أي قرار.

**المصدر:** [نمط 2025-2026]
### السؤال 240 (TODO — صعب)
A project's SRS includes highly volatile non-functional requirements impacting system security and performance. How would you prioritize testing efforts to maximize risk mitigation?
أ) Minimize non-functional requirements such as performance or security demands.
ب) Guaranteed backward compatibility.
ج) Elimination of integration testing.
د) Simplification of configuration management.
**الإجابة الصحيحة: TODO**
**التعليل:**
هذا السؤال يبدو تالفاً في الاستخراج: نص السؤال يسأل تحديداً "كيف نُرتّب أولويات الاختبار لتقليل المخاطر؟"، لكن كل الخيارات الأربعة المتاحة (تقليل المتطلبات غير الوظيفية، ضمان التوافق العكسي، حذف اختبار التكامل، تبسيط إدارة الإعدادات) هي أفعال سلبية أو غير منطقية لا تجيب فعلياً على "كيف نُرتّب أولويات الاختبار" — ولا واحد منها يصف استراتيجية ترتيب أولويات معقولة (بعكس سؤال مشابه بنفس الدورة أعطى إجابة صحيحة واضحة عبر خيار "Use risk analysis to prioritize...").

أ) تقليل المتطلبات غير الوظيفية عمداً يتناقض تماماً مع نص السؤال نفسه (النظام يحتاج أمناً وأداءً حرجين، لا تقليلهما).
ب) ضمان التوافق العكسي غير مرتبط بترتيب أولويات الاختبار حسب المخاطرة.
ج) حذف اختبار التكامل يزيد المخاطرة بدل تقليلها.
د) تبسيط إدارة الإعدادات موضوع منفصل تماماً عن ترتيب أولويات الاختبار.

بما أن الخيار الصحيح المنطقي (على غرار "استخدام تحليل المخاطر لترتيب الاختبارات حسب التأثير والاحتمالية" في سؤال مشابه بنفس الدورة) غير موجود إطلاقاً بين الخيارات المتاحة، يُترك السؤال TODO للمراجعة اليدوية بدل اختيار إجابة تتناقض مع نص السؤال نفسه.

**المصدر:** [نمط 2025-2026]
### السؤال 241 (متوسط)
How does the principle of "separation of concerns" affect maintainability in large scale software systems?
أ) It limits code reuse.
ب) It increases testing complexity.
ج) It is only applicable to UI development.
د) It reduces complexity by modularizing concerns, facilitating parallel development, and easier updates.
ه) It increases coupling by spreading functionality.
**الإجابة الصحيحة: د**
**التعليل:**
"فصل الاهتمامات" (`Separation of Concerns`) يقسّم النظام لوحدات معيارية (`modular`) كل واحدة مسؤولة عن جانب واحد محدد — هذا يقلل التعقيد الكلي، يسمح بتطوير متوازٍ (`parallel development`) بأثر جانبي محدود، ويجعل التحديثات المستقبلية أسهل وأكثر أماناً.

أ) فصل الاهتمامات عادة *يحسّن* إعادة الاستخدام (وحدات مستقلة أسهل استخداماً في سياقات أخرى)، لا يحدّها.
ب) الفصل الجيد يبسّط الاختبار عملياً (كل وحدة تُختبر بمعزل تام)، لا يعقّده.
ج) المبدأ عام جداً وينطبق على أي طبقة من النظام (بيانات، منطق أعمال، واجهة)، لا الواجهة فقط.
ه) عكس الحقيقة تماماً — فصل الاهتمامات الجيد يقلل الاقتران (`coupling`)، لا يزيده.

هذا يربط مباشرة بمبدأ `Refactoring` اللي شرحته المحاضرة (`Extract Class` عند اكتشاف أن فئة واحدة تقوم بعمل فئتين) وبالقاعدة الذهبية `Keep low coupling but high cohesion` من محاضرة `Measurement`.

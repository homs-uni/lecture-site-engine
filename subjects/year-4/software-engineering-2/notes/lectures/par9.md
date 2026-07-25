# المحاضرة 9 — الوحدة I: طبيعة الألعاب (محاضرة 14 — جديدة، بدون دورات سابقة)

> طبقة مراجعة — الفقرة أولاً، وتحقق سريع تحتها عند الحاجة.

---

## ملخص المفاهيم

> **ملاحظة عامة على الوحدة:** هاي المحاضرة **جديدة كلياً** على المنهج — ما في ولا سؤال حقيقي من دورات سابقة عليها إطلاقاً (لأنها لسا ما دخلت الامتحانات). كل الأسئلة هون بأسلوب الدكتور (من تأليفي)، مبنية حصراً على محتوى المحاضرة، عشان تجهزك تحسباً لأول ظهور محتمل لهاي المحاضرة بالامتحان.

### الفقرة 1: تعريف اللعبة (Adams + Salen & Zimmerman)

**من المحاضرة:** §1 | تعريفا Adams وSalen & Zimmerman يتفقان على 4 عناصر جوهرية: `Players` (لاعبون)، `Challenges` (تحديات)، `Rules` (قواعد)، `Goals` (أهداف/شرط نصر).

#### تحقق سريع:
According to both Adams' and Salen & Zimmerman's definitions discussed in the lecture, which FOUR elements are common to both?
أ) Graphics, Sound, Story, Interface
ب) Players, Challenges, Rules, Goals
ج) Budget, Team, Engine, Platform
د) Narrative, Ludic, Balance, Feedback
**الإجابة: ب**
> هاي الأربعة مستخرجة صراحة من كلا التعريفين بالمحاضرة (الشريحة تشير لهن بالاسم). الترجمة: `Victory Condition` = شرط النصر، `Artificial Conflict` = صراع مصطنع.


### الفقرة 2: قرارات التصميم السبعة

**من المحاضرة:** §2 | 4 قرارات جوهرية (Players/Goals/Rules/Challenges) + 3 إضافية (Game Modes/Setting/Story). كل قرار = سؤال تصميمي عملي.

#### تحقق سريع:
Which design decision specifically addresses the question "How does the player learn the rules?" and defines the boundaries of the game?
أ) Goals
ب) Setting
ج) Rules
د) Story
**الإجابة: ج**
> حسب المحاضرة، `Rules` تحديداً تحدد `boundaries of the game` (حدود اللعبة) عبر سؤالي "كيف يؤثر اللاعب بالعالم" و"كيف يتعلم القواعد".


### الفقرة 3: طول جلسة اللعب (Play Length)

**من المحاضرة:** §3 | `Least meaningful unit of play` (أقل وحدة لعب ذات معنى) تختلف بالمنصة: Console ≥30 دقيقة، Mobile <دقيقة. `Casual vs Core` تصنيف رديء لأنه يخلط بين المدة والعمق (مثال Plants vs. Zombies: قصير + عميق معاً).

#### تحقق سريع:
Why does the lecture consider the "Casual vs Core" classification a bad distinction?
أ) Because casual games are always worse than core games
ب) Because it conflates two independent criteria: play session length and mechanical depth
ج) Because mobile games cannot have deep mechanics
د) Because console games are always more casual
**الإجابة: ب**
> المثال المباشر بالمحاضرة: Plants vs. Zombies — جلسات قصيرة (casual) بس آليات عميقة (core)، وهذا يثبت إن المعيارين مستقلين عن بعض.


### الفقرة 4: Narrative مقابل Ludic

**من المحاضرة:** §4 | `Narrative`: الألعاب وسيط قصصي — ميزتها التأثير العاطفي والرؤية الفنية، عيبها طغيان الكاتب وضعف الآليات. `Ludic` (من `ludus` اللاتينية = لعب): الألعاب نظام آليات — ميزتها وكالة اللاعب (`Player Agency`) وآليات محكمة، عيبها ضعف الدافعية وصعوبة التمييز.

#### تحقق سريع:
Which of the following is listed as a disadvantage of the Ludic design philosophy?
أ) Author voice over player voice
ب) Poorly defined mechanics
ج) Lack of player motivation
د) Traditional narrative structure
**الإجابة: ج**
> خياري أ وب من عيوب Narrative (عكس المطلوب)، وخيار د وصف لـNarrative نفسها مو عيب لـLudic.


### الفقرة 5: التوازن (Motivate + Empower) + توجّه المقرر

**من المحاضرة:** §4.2-4.3 | التصميم الجيد توازن: `Motivate` (من Narrative: قصة، بيئة، هوية، سياق للتحديات) + `Empower` (من Ludic: دراما من أفعال اللاعب، قدرات واضحة، مجازاة/معاقبة، حرية). المقرر نفسه بيركّز عملياً على Ludic لأنها قابلة للتدريب، والتوازن الكامل مسؤولية الطالب.

#### تحقق سريع:
According to the lecture, why does this course focus practically on Ludic design tools despite acknowledging the importance of full balance?
أ) Because Narrative is not important in game design
ب) Because Ludic tools are trainable techniques that require practice, while maintaining full balance is the student's own responsibility
ج) Because students lack storytelling skills
د) Because the course does not care about final design quality
**الإجابة: ب**
> نص المحاضرة الحرفي: "Keeping balance is up to you" — الأدوات التقنية (Ludic) تُدرَّس وتُمارَس، أما التوازن الكامل مع Narrative فمسؤولية شخصية.


### الفقرة 6: منهج Adams (Wish-Fulfillment)

**من المحاضرة:** §5 | يبدأ بـ"أريد أن ___"، ثم 5 أسئلة: الحلم؟ (Narrative) → الأهداف؟ (Narrative) → الأفعال؟ (Ludic) → البيئة؟ (Ludic) → الواجهة؟ (Ludic).

#### تحقق سريع:
In the Adams Approach, which two questions are classified as Narrative rather than Ludic?
أ) What actions achieve those goals? / What setting does this dream create?
ب) What dream are you satisfying? / What goals does this dream create?
ج) What is the appropriate interface? / What setting does this dream create?
د) What actions achieve those goals? / What is the appropriate interface?
**الإجابة: ب**
> المحاضرة صنّفت صراحة: الحلم والأهداف = Narrative، الأفعال والبيئة والواجهة = Ludic.


### الفقرة 7: استكشاف الألعاب + الأهداف الواقعية (Quality over Quantity)

**من المحاضرة:** §6-7 | يجب لعب أنواع متنوعة (Kongregate، Armor Games). الهدف الواقعي لمشروع = حجم لعبة موبايل مستقلة، مع قاعدة "عشرة مستويات مذهلة أفضل من 30 رديء" (Quality over Quantity)، وتجنّب "تضخّم الميزات" (`Feature Bloat`، مثال: power-ups زايدة بلا فايدة).

#### تحقق سريع:
What does the lecture recommend as the appropriate size/ambition target for a student game project?
أ) A full AAA-studio-sized game
ب) A boxed retail game sold in stores
ج) The size of an indie mobile game
د) There is no recommended size; scope does not matter
**الإجابة: ج**
> المحاضرة تنص صراحة: "Think indie games, not boxed retail" وتحدد الحجم المناسب كـ`indie mobile game`.

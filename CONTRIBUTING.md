# المساهمة في المشروع (Contributing)

هالملف يوضّح **كل أنواع المساهمة**: محتوى، محرك، وتحليل بيانات.  
قبل ما تبدأ، افهم المنطق العام من [`README.md`](README.md) (تخزين GitHub → build → `dist/` → عرض بالمتصفح).

**قاعدة ذهبية:** أي تغيير على الكود أو المحتوى يمر عبر **Pull Request إلى `main`**.  
ما في دفع مباشر على `main` / `dev` (الفروع محمية).

---

## 1) اختر نوع مساهمتك

| النوع | لمن | شو بتعدّل عادةً | ممنوع عادةً |
|-------|-----|-----------------|-------------|
| **أ) محتوى محاضرات** | طلاب / كتّاب مواد | `subjects/year-N/.../lectures/*.md` (و`reviews/` إن لزم) | `parser/`, `renderer/`, `site-shell/`, `build/` |
| **ب) محرك الموقع** | مشرفون / مطوّرون | `parser/`, `renderer/`, `site-shell/`, `build/`, `themes/` | تخريب محتوى المواد بدون سبب |
| **ج) تحليل بيانات** | فريق الـ analytics | استعلامات/تقارير + أحياناً أحداث في `analytics.js` | مفاتيح PostHog الشخصية داخل الريبو |
| **د) توثيق / أدوات** | الجميع | `README`, `CONTRIBUTING`, `analytics/TEAM-GUIDE`, صفحات contrib | أسرار وtokens |

---

## 2) مساهمة المحتوى (الأكثر شيوعاً)

### وين الملفات

```text
subjects/year-{1-5}/{subject-id}/lectures/par*.md
```

- سمِّ الملفات `par1.md`, `par2.md`, أو `par1-sec1.md` للأجزاء.
- اتبع [`SCHEMA.md`](SCHEMA.md) (عناوين الأجزاء، جداول، MCQ…).
- **لا تعدّل يدوياً** مصفوفة `files` داخل `lectures/manifest.json` — الـ validate/build/CI بيزامنها من أسماء `par*.md`.

### الطريقة الأسهل (موصى بها)

1. افتح [/contrib/](https://shahd-abbara.github.io/lecture-site-engine/contrib/)
2. اختر المادة → محاضرة جديدة أو رفع ملف
3. احفظ → ينفتح Pull Request إلى `main`
4. انتظر ✅ **Validate lectures** → اطلب الدمج

ما تحتاج صلاحية Collaborator على المستودع العام — Fork + PR يكفي.

### يدوياً عبر GitHub / محلياً

1. فرع جديد من `main`
2. عدّل أو أضف `parN.md`
3. (اختياري محلياً) `npm run validate -- --subject year-N/subject-id`
4. PR → نفس فحص الـ CI

### بعد الدمج

Workflow **Deploy GitHub Pages** على `main`:

- يبني المواد المتغيّرة / الناقصة إلى `dist/`
- يحدّث فهرس المواد
- ينشر الموقع

يعني: تعديل Markdown على GitHub → البناء يحدّث JSON داخل `dist/` → الموقع يتحدّث.

### إعدادات المادة (`manifest.json` → `settings`)

المشرف يضبط مرة واحدة على الأقل:

```json
"settings": {
  "subjectName": "اسم المادة",
  "subjectNameEn": "English name",
  "year": "2025-2026",
  "academicYear": 4,
  "theme": "amber-default",
  "department": "القسم",
  "enabledLectures": true
}
```

بدون `"enabledLectures": true` المادة ما بتظهر على صفحة الفهرس.

تزامن أسماء الملفات:

| الملف | المعنى |
|-------|--------|
| `par1.md` | محاضرة ١ |
| `par1-sec2.md` | محاضرة ١ — جزء ٢ (badge تلقائي) |

---

## 3) مساهمة المحرك / الواجهة (مشرفون)

عدّل فقط إذا فاهم أثر البناء والنشر:

| مجلد | الدور |
|------|--------|
| `parser/` | يفهم Markdown ويطلّع بنية المحاضرة |
| `renderer/` | يحوّل البنية/JSON لـ HTML تفاعلي (على الـ client بعد النسخ لـ `dist`) |
| `site-shell/` | هيكل الصفحة، `app.js`, بحث، اختبارات، analytics |
| `build/` | validate، cli، deploy، توليد الفهرس و`dist/` |
| `themes/` | ألوان المواد |

### قبل الـ PR

```bash
npm test
node build/cli.mjs --subject year-N/some-subject
# افحص محلياً من dist/...
```

اشرح بالـ PR: **ليش** التغيير + كيف اختبرته.  
تجنّب خلط PR ضخم «محتوى + محرك» — افصلهم.

---

## 4) مساهمة تحليل البيانات

الدليل الكامل للفريق: [`analytics/TEAM-GUIDE.md`](analytics/TEAM-GUIDE.md)

باختصار:

1. افهم الأحداث من [`analytics/README.md`](analytics/README.md)
2. حلّل على PostHog (Live events / Insights / HogQL)
3. المخرج: تقرير سؤال→نتائج→توصيات (± ملف `.hogql` أو PR لحدث تتبع ناقص)

إذا بدك حدث جديد:

- عرّفه في `site-shell/js/analytics.js`
- اربطه من `app.js` / `exam.js` / interactivity
- حدّث README + query إن لزم
- **لا تضع** مفاتيح `phx_` في الملفات المعتمدة

---

## 5) دورة الـ Pull Request (لكل الأنواع)

```text
فرع من main → تعديل → PR إلى main
         → Validate lectures (اختبار + تحقق محتوى إن تغيّر)
         → مراجعة / دمج
         → Deploy يحدّث dist/ وينشر Pages
```

### على الـ PR

- عنوان واضح (مثلاً: `Add databases-2 par8` أو `Fix MCQ analytics props`)
- وصف قصير: شو تغيّر ولماذا
- إذا فشل الـ validate: **لا تدمج** — صلّح وأعد الدفع

### أوامر محلية مفيدة

```bash
npm run validate -- --subject year-4/my-subject
node build/cli.mjs --subject year-4/my-subject
npm run dev -- --subject year-4/my-subject
```

تنبيه: مع أوامر `npm run` حط `--` قبل `--subject`.  
مع `node build/cli.mjs` ما في داعي للـ `--` الفاصل.

---

## 6) شو ما تعمل

- تعديل `manifest.json` → `files` يدوياً كعادة يومية (السنك التلقائي بيكفي)
- رفع أسرار (PostHog personal key، OAuth secrets) للكود
- كسر تنسيق SCHEMA بشكل متعمد بدون ما الـ validate يمر
- دمج PR والـ CI أحمر

---

## 7) صلاحيات وبيئة النشر (للمشرف)

1. المستودع Public
2. حماية فرع `main` (و`dev` إن وُجد): PR إلزامي + فحص Validate
3. Pages Source = GitHub Actions
4. المساهمون العاديون: Fork + [/contrib/](https://shahd-abbara.github.io/lecture-site-engine/contrib/) بدون Collaborator
5. أسرار التحليل (اختياري): `POSTHOG_KEY`, `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`

Netlify sandbox: يدوي فقط عبر workflow مخصص — مو نشر الإنتاج الأساسي.

---

## 8) روابط سريعة

| الرابط | الغرض |
|--------|--------|
| [README.md](README.md) | المنطق العام للمشروع |
| [SCHEMA.md](SCHEMA.md) | تنسيق المحاضرات |
| [analytics/TEAM-GUIDE.md](analytics/TEAM-GUIDE.md) | فريق تحليل البيانات |
| [/contrib/](https://shahd-abbara.github.io/lecture-site-engine/contrib/) | رفع محاضرة بسهولة |
| [AGENTS.md](AGENTS.md) | أوامر وملاحظات تقنية مختصرة |

# Lecture Site Engine

محرك مواقع دلائل دراسية تفاعلية: محتوى Markdown على GitHub → بناء إلى JSON → عرض HTML من جهة المتصفح → نشر ثابت على GitHub Pages.

---

## المنطق العام (اقرأ هذا أولاً)

### الفكرة باختصار

| الطبقة | وين | الدور |
|--------|-----|--------|
| **التخزين** | GitHub (`subjects/`) | قاعدة المحتوى — بدل قاعدة بيانات كلاود |
| **التحويل (parse/build)** | GitHub Actions + `parser/` + `build/` | يقرأ Markdown ويطلّع JSON داخل `dist/` |
| **العرض** | المتصفح + ملفات من `dist/` | الـ renderer يحوّل JSON → HTML على الـ **client-side** |
| **النشر** | GitHub Pages | يرفع مجلد `dist/` فقط كموقع static |

```text
subjects/**/*.md     ← التخزين على GitHub (المصدر)
        │
        ▼  push / PR → workflow
parser + build/      ← يفهم القوالب والكلمات المفتاحية والفقرات
        │
        ▼
dist/**/lectures/*.json  +  site-shell (HTML/CSS/JS)
        │
        ▼  GitHub Pages
المتصفح: app.js يحمّل JSON → renderer يرسم HTML
```

### التفاصيل خطوة بخطوة

1. **ملفات الشرح** تعيش تحت `subjects/year-N/subject-id/lectures/par*.md`  
   هاد المحتوى الخام (محاضرات، جداول، MCQ…) بتنسيق SCHEMA.  
   **GitHub هو المخزن** — مش SQL ولا Firebase.

2. **الـ parser** (`parser/`) يلتقط التنسيق والقوالب والكلمات المفتاحية  
   (مثلاً عنوان فيه `MCQ` أو `تمارين`) ويعرف نوع كل فقرة، ويحوّلها لبنية بيانات.

3. **سكربتات الـ build** (`build/cli.mjs` وغيرها) تشغّل الـ parser وقت الـ CI أو محلياً،  
   وتكتب النتائج كـ **JSON** داخل `dist/year-N/subject-id/lectures/`.  
   كمان بتنسخ واجهة الموقع من `site-shell/` و`themes/` و`renderer/` إلى نفس مجلد المادة في `dist/`.

4. **مجلد `dist/`** هو اللي بيرتفع على الموقع الثابت (GitHub Pages).  
   ما بيرتفع الريبو كامل — بس ناتج البناء.

5. **العرض**: بعد ما الصفحة تفتح، JavaScript على الـ client  
   يحمّل ملف JSON للمحاضرة ويستدعي الـ **renderer** (`engine/renderer` جوّا `dist`) ليحوّله لـ HTML تفاعلي  
   (أسئلة، مخططات، شريط جانبي…).

6. **متى يتحدّث `dist/`؟**  
   لما يصير تغيير يهم الموقع (محاضرة جديدة، تعديل محتوى، تغيير شيل/ثيم…) ويندمج على `main`،  
   workflow الـ deploy يشغّل سكربتات البناء ويضيف/يعدّل JSON والتنسيق داخل `dist/` فقط، بعدين ينشر Pages.

### جملة تلخيص

**تخزين → GitHub · تحويل → GitHub Actions + parser/build · عرض → client-side من `dist/` · نشر → GitHub Pages**

---

## أنواع المساهمة

شوف التفاصيل الكاملة في [`CONTRIBUTING.md`](CONTRIBUTING.md):

| نوع المساهمة | عادةً تعدّل |
|--------------|-------------|
| محتوى محاضرات | `subjects/.../lectures/*.md` |
| محرك / واجهة / بناء | `parser/`, `renderer/`, `site-shell/`, `build/` (مشرفين) |
| تحليل بيانات الاستخدام | PostHog + [`analytics/`](analytics/) — دليل الفريق: [`analytics/TEAM-GUIDE.md`](analytics/TEAM-GUIDE.md) |

**أسهل رفع محاضرة:**  
https://shahd-abbara.github.io/lecture-site-engine/contrib/

---

## هيكل المجلدات

```
lecture-site-engine/
├── subjects/          # المحتوى (التخزين) — مساهمو المحتوى يشتغلوا هون
├── parser/            # Markdown → بنية محاضرة (JSON لاحقاً عبر build)
├── renderer/          # JSON → HTML (يُستدعى من المتصفح بعد النسخ إلى dist)
├── site-shell/        # هيكل الصفحة المشتركة (HTML/CSS/JS)
├── build/             # validate + cli + deploy — يملأ dist/
├── dist/              # ناتج البناء (gitignored) — ما ينشر على Pages
├── themes/            # ألوان المواد
├── analytics/         # PostHog: أحداث، استعلامات، دليل الفريق
├── SCHEMA.md          # قواعد تنسيق المحاضرات
└── .github/workflows/ # validate على PR · deploy على main
```

---

## أوامر سريعة

```bash
npm test
npm run validate -- --subject year-4/databases-2
node build/cli.mjs --subject year-4/databases-2    # بناء مادة → dist/
npm run build                                      # صفحة الـ hub فقط (مش كل المواد)
npm run dev -- --subject year-4/databases-2
```

تنبيه: `npm run build` يولّد أساساً `dist/index.html` (الفهرس). بناء مادة كاملة = `node build/cli.mjs --subject ...`.

---

## خط إنتاج المحتوى (من PDF لمحاضرة)

```
subject-brief / SCHEMA / templates
        → custom_prompt.md
        → PDF
        → lectures/parN.md   (على GitHub)
        → build/parser → dist/.../*.json
        → المتصفح + renderer → صفحة تفاعلية
```

تفاصيل الـ markers: [`SCHEMA.md`](SCHEMA.md).  
قوالب البرومبت: [`templates/`](templates/).

---

## CI والنشر

| Workflow | متى | ماذا |
|----------|-----|------|
| Validate lectures | Pull Request | اختبارات + تحقق من المواد المتغيّرة |
| Deploy GitHub Pages | دمج إلى `main` | تحديث `dist/` ونشر Pages |

- Hub: `https://<user>.github.io/<repo>/`
- مادة: `https://<user>.github.io/<repo>/year-N/subject-id/`

لا تدفع مباشرة على `main` — دائماً عبر Pull Request.

---

## تحليل الاستخدام (PostHog + Clarity)

الموقع يرسل أحداث دراسة (فتح محاضرة، سكرول، MCQ، بحث…).  
الدليل للفريق: [`analytics/TEAM-GUIDE.md`](analytics/TEAM-GUIDE.md)  
الإعداد التقني: [`analytics/README.md`](analytics/README.md)

---

## وثائق إضافية

| ملف | المحتوى |
|-----|---------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | كل مسارات المساهمة |
| [AGENTS.md](AGENTS.md) | أوامر وملاحظات للمساعدين الآليين / المشرفين |
| [parser/README.md](parser/README.md) | كيف يشتغل الـ parser |
| [renderer/README.md](renderer/README.md) | كيف يشتغل الـ renderer |
| [site-shell/README.md](site-shell/README.md) | واجهة الطالب |
| [build/README.md](build/README.md) | سكربتات البناء |
| [themes/README.md](themes/README.md) | الثيمات |
| [admin/README.md](admin/README.md) | Decap CMS (متقدم) |

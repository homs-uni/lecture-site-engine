/**
 * Auto-scaffolded from subject-brief.yaml (v2.0) — edit as needed.
 */
export const GUIDE_CONFIG = {
  // ─── من ملف settings.json ───────────────────────────────────────────────
  storagePrefix: 'electronic-circuits-2',
  defaultTitle: 'الدارات الإلكترونية 2 — Electronic Circuits 2',
  defaultSubtitle: 'BJT MOSFET Solar Power Batteries',
  homeHeaderBrand: 'موقع تفاعلي - المكتب الأكاديمي',
  showRoadmapCard: false,

  settings: {
    subjectName: 'الدارات الإلكترونية 2',
    subjectNameEn: 'Electronic Circuits 2',
    year: '2025-2026',
    academicYear: 1,
    theme: 'amber-default',
    department: 'القسم النظري',
  },

  lectureIcons: ['📌', '📖', '💻', '🎯', '📝'],
  lectureMatIcons: ['school', 'menu_book', 'code', 'quiz', 'description'],

  // ─── من subject-brief.yaml (v2.0) ───────────────────────────────────────
  lectureSplit: /(?=^# المحاضرة)/m,
  lectureHeading: /^# المحاضرة/,
  sectionRefPattern: /(?:par\d+(?:-sec\d+)?\.md\s*)?§(\d+(?:\.\d+)*)/g,

  // أقسام مفعّلة في هذا الإصدار: summary, detail, mcq, qa_cards, cheat_sheet
  // (معطّلة: integration_map, debug, exercise, analysis_exercise,
  //  trace_exercise, design_question, theory, reference_code, checklist)
  partTypes: [
    { match: /MCQ|اختيار من متعدد/i, type: 'mcq', icon: '🎯' },
    { match: /بطاقات سؤال|Q&A Cards/i, type: 'qa', icon: '🃏' },
    { match: /Cheat Sheet|المراجعة السريعة/i, type: 'cheat', icon: '🔑' },
    { match: /ملخص منظم|ملخص/i, type: 'summary', icon: '📋' },
    { match: /الشرح التفصيلي|شرح|مقدمة/i, type: 'detail', icon: '📖' },
    // مُبقاة للتوافق المستقبلي إن فُعّلت لاحقًا
    { match: /تصحيح/i, type: 'debug', icon: '🐛' },
    { match: /تتبع/i, type: 'trace', icon: '🔍' },
    { match: /تصميم|صمّم/i, type: 'design', icon: '📐' },
    { match: /نظرية/i, type: 'theory', icon: '📝' },
    { match: /Checklist|قائمة فحص|قائمة المراجعة/i, type: 'summary', icon: '✅' },
    { match: /الكود النهائي|مرجع شامل/i, type: 'reference', icon: '📎' },
    { match: /تمارين|تمرين/i, type: 'exercise', icon: '💻' },
  ],

  callouts: [
    { re: /^مهم للامتحان/, cls: 'callout-exam', label: 'مهم للامتحان ⚠️' },
    { re: /^⚠️ ملاحظة هامة/, cls: 'callout-important', label: '⚠️ ملاحظة هامة' },
    { re: /^نقطة مهمة/, cls: 'callout-important', label: 'نقطة مهمة ⚠️' },
    { re: /^ملاحظة:/, cls: 'callout-note', label: 'ملاحظة' },
    { re: /^الدرس المستفاد:/, cls: 'callout-lesson', label: 'الدرس المستفاد' },
  ],

  arabicKey: { أ: 'a', ا: 'a', ب: 'b', ج: 'c', د: 'd', a: 'a', b: 'b', c: 'c', d: 'd' },

  // ─── ميزات جديدة خاصة بـ v2.0 (غير موجودة في v1.0) ─────────────────────
  coverageTracking: {
    enabled: true,
    requireMetadata: true,
    acceptableCoverageThreshold: 90,
  },

  originalTextDisplay: {
    enabled: true,
    format: 'collapsible',
    showCoverageBadge: true,
    location: 'after-explanation',
  },

  renderMetadata: {
    enabled: true,
  },
};

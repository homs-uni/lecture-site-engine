/**
 * Default parser configuration — aligned with SCHEMA.md v1.0.
 * Override or extend when creating a subject site (see createParser()).
 */
export const DEFAULT_CONFIG = {
  lectureSplit: /(?=^# (?:المحاضرة|المختبر) )/m,
  lectureHeading: /^# (?:المحاضرة|المختبر) /,

  /** First match wins. Order matters for overlapping patterns. */
  partTypes: [
    { match: /MCQ|اختيار من متعدد/i, type: 'mcq', icon: '🎯' },
    { match: /بطاقات سؤال|Q&A Cards/i, type: 'qa', icon: '🃏' },
    { match: /تصحيح/i, type: 'debug', icon: '🐛' },
    { match: /تتبع/i, type: 'trace', icon: '🔍' },
    { match: /تصميم|صمّم/i, type: 'design', icon: '📐' },
    { match: /نظرية/i, type: 'theory', icon: '📝' },
    { match: /Cheat Sheet|المراجعة السريعة/i, type: 'cheat', icon: '🔑' },
    { match: /Checklist|قائمة فحص|قائمة المراجعة/i, type: 'summary', icon: '✅' },
    { match: /الكود النهائي|مرجع شامل/i, type: 'reference', icon: '📎' },
    { match: /ملخص/i, type: 'summary', icon: '📋' },
    { match: /تمارين|تمرين|مفسّر|مفسر/i, type: 'exercise', icon: '💻' },
    { match: /شرح|مقدمة|خريطة التكامل/i, type: 'detail', icon: '📖' },
  ],

  callouts: [
    { re: /^(?:📌\s*)?مهم للامتحان/, cls: 'callout-exam', label: 'مهم للامتحان ⚠️' },
    { re: /^(?:📌\s*)?تذكرة/, cls: 'callout-exam', label: 'تذكرة 💡' },
    { re: /^(?:📌\s*)?⚠️\s*ملاحظة هامة/, cls: 'callout-important', label: '⚠️ ملاحظة هامة' },
    { re: /^(?:📌\s*)?نقطة مهمة/, cls: 'callout-important', label: 'نقطة مهمة ⚠️' },
    { re: /^(?:📌\s*)?ملاحظة:/, cls: 'callout-note', label: 'ملاحظة' },
    { re: /^(?:📌\s*)?الدرس المستفاد:/, cls: 'callout-lesson', label: 'الدرس المستفاد' },
  ],

  arabicKey: { أ: 'a', ا: 'a', ب: 'b', ج: 'c', د: 'd', ه: 'e', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' },

  codeLangAliases: {
    kotlin: 'kotlin',
    xml: 'xml',
    bash: 'bash',
    shell: 'bash',
    gradle: 'gradle',
    json: 'json',
    csharp: 'csharp',
    cs: 'csharp',
    c: 'c',
    python: 'python',
    text: 'text',
  },
};

/**
 * Wireless Networks — exam-focused lecture summaries.
 */
export const GUIDE_CONFIG = {
  storagePrefix: 'wireless-networks',
  defaultTitle: 'الشبكات اللاسلكية',
  homeHeaderBrand: 'فريق TTM الأكاديمي',
  defaultSubtitle: 'ملخص سريع للمحاضرات — مبني على أسئلة الدورات الامتحانية (2022–2026)',

  showRoadmapCard: false,

  lectureSplit: /(?=^# المحاضرة)/m,
  lectureHeading: /^# المحاضرة/,

  sectionRefPattern: /(?:par\d+\.md\s*)?§(\d+(?:\.\d+)*)/g,

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
    { match: /تمارين|تمرين/i, type: 'exercise', icon: '💻' },
    { match: /شرح|مقدمة|خريطة التكامل/i, type: 'detail', icon: '📖' },
  ],

  callouts: [
    { re: /^مهم للامتحان/, cls: 'callout-exam', label: 'مهم للامتحان ⚠️' },
    { re: /^⚠️ ملاحظة هامة/, cls: 'callout-important', label: '⚠️ ملاحظة هامة' },
    { re: /^نقطة مهمة/, cls: 'callout-important', label: 'نقطة مهمة ⚠️' },
    { re: /^ملاحظة:/, cls: 'callout-note', label: 'ملاحظة' },
    { re: /^الدرس المستفاد:/, cls: 'callout-lesson', label: 'الدرس المستفاد' },
  ],

  arabicKey: { أ: 'a', ا: 'a', ب: 'b', ج: 'c', د: 'd', a: 'a', b: 'b', c: 'c', d: 'd' },
};

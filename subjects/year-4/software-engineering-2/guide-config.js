/**
 * Auto-scaffolded from subject-brief.yaml v2.0 — edit as needed.
 * Focus: UML Design, SRS, Game Development
 */
export const GUIDE_CONFIG = {
  // ─── Schema & Subject Identity ────────────────────────────────────────────
  schemaVersion: '2.0',
  storagePrefix: 'software-engineering-2',
  defaultTitle: 'software-engineering-2',
  homeHeaderBrand: 'موقع تفاعلي - المكتب الأكاديمي',
  defaultSubtitle: 'دليل دراسي تفاعلي',

  showRoadmapCard: false,

  // ─── Lecture Parsing ──────────────────────────────────────────────────────
  lectureSplit: /(?=^# المحاضرة )/m,
  lectureHeading: /^# المحاضرة /,
  sectionRefPattern: /(?:par\d+(?:-sec\d+)?\.md\s*)?§(\d+(?:\.\d+)*)/g,

  // ─── Domain & Content (v2.0 NEW) ──────────────────────────────────────────
  domain: 'programming',
  contentTypes: ['theory', 'diagrams', 'uml', 'design', 'tables', 'pseudocode'],
  defaultContentType: 'diagram-first',

  // ─── Content Ordering (v2.0 NEW) ──────────────────────────────────────────
  contentOrdering: {
    defaultType: 'diagram-first',
    sectionTypeRules: {
      diagramSubjects: ['software-engineering-2'],
    },
  },

  // ─── Visualization Templates (v2.0 NEW) ───────────────────────────────────
  visualizationTypes: [
    'inline-text',
    'comparison-table',
    'flowchart',
    'sequence',
    'tree',
  ],
  diagramTypes: ['flowchart', 'uml', 'activity', 'usecase', 'class', 'component'],

  // ─── Coverage Tracking (v2.0 NEW) ──────────────────────────────────────────
  coverageTracking: {
    enabled: true,
    requireMetadata: true,
    acceptableCoverageThreshold: 90,
  },

  // ─── Original Text Display (v2.0 NEW) ──────────────────────────────────────
  originalTextDisplay: {
    enabled: true,
    format: 'collapsible',
    showCoverageBadge: true,
    location: 'after-explanation',
  },

  // ─── Part Types (Subject-Wide) ────────────────────────────────────────────
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

  // ─── Callouts (Subject-Wide) ──────────────────────────────────────────────
  callouts: [
    { re: /^(?:📌\s*)?مهم للامتحان/, cls: 'callout-exam', label: 'مهم للامتحان ⚠️' },
    { re: /^(?:📌\s*)?⚠️\s*ملاحظة هامة/, cls: 'callout-important', label: '⚠️ ملاحظة هامة' },
    { re: /^(?:📌\s*)?نقطة مهمة/, cls: 'callout-important', label: 'نقطة مهمة ⚠️' },
    { re: /^(?:📌\s*)?ملاحظة:/, cls: 'callout-note', label: 'ملاحظة' },
    { re: /^(?:📌\s*)?الدرس المستفاد:/, cls: 'callout-lesson', label: 'الدرس المستفاد' },
  ],

  // ─── Assessment (Subject-Wide) ────────────────────────────────────────────
  mcqOptionLetters: 'arabic',
  arabicKey: { أ: 'a', ا: 'a', ب: 'b', ج: 'c', د: 'd', a: 'a', b: 'b', c: 'c', d: 'd' },

  // ─── Parts Enabled (v2.0 Refined) ────────────────────────────────────────
  parts: {
    summary: { enabled: true },
    detail: { enabled: true, numberedSections: true },
    mcq: { enabled: true, count: 16, minCount: 14 },
    debug: { enabled: false },
    exercise: { enabled: false },
    designQuestion: { enabled: true, count: 3 },
    theory: { enabled: false },
    cheatSheet: { enabled: true },
    qaCards: { enabled: true, count: 12 },
    referenceCode: { enabled: false },
    checklist: { enabled: false },
  },

  // ─── Blocks Enabled (v2.0 Refined) ────────────────────────────────────────
  blocks: {
    renderMetadata: { enabled: true },
    simplifiedExplanation: { enabled: true },
    code: { enabled: false },
    diagrams: { enabled: true, types: ['flowchart', 'uml', 'activity', 'usecase', 'class', 'component'] },
    uml: { enabled: true, types: ['usecase', 'class', 'activity', 'component', 'sequence'] },
    compare: { enabled: true },
    callouts: { enabled: true },
    thinkPrompt: { enabled: true, minPerLecture: 3 },
    tables: { enabled: true },
    fillGaps: { enabled: true },
    analogy: { enabled: true },
    tradeOff: { enabled: true },
    beforeAfter: { enabled: true },
    trace: { enabled: false },
  },
};

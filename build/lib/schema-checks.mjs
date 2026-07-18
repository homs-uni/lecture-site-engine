/**
 * Line-level SCHEMA.md checks (pre/post parse).
 * @param {string} text
 * @param {string} [fileLabel]
 * @param {{ lectureHeading?: RegExp }} [options] — subject guide-config may use
 *   `# الوحدة` / `# Unit` instead of the default `# المحاضرة` / `# المختبر`.
 * @returns {{ severity: 'error'|'warn', line: number, message: string }[]}
 */
export function runSchemaChecks(text, fileLabel = 'file', options = {}) {
  const lines = text.split('\n');
  /** @type {{ severity: 'error'|'warn', line: number, message: string }[]} */
  const issues = [];

  const push = (severity, line, message) => {
    issues.push({ severity, line, message: `[${fileLabel}] ${message}` });
  };

  // Accept subject-specific headings (e.g. `# الوحدة`) plus the SCHEMA defaults.
  // Don't use `\b` here — JS word boundaries don't treat Arabic letters as
  // word chars, so `# الوحدة 6` would fail a `\b` check after الوحدة.
  const lectureHeadingRe = options.lectureHeading instanceof RegExp
    ? options.lectureHeading
    : /^# (?:المحاضرة|المختبر|الوحدة|Unit)/;

  let hasLectureHeading = false;
  let inAlgorithmFence = false;
  let algorithmLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const n = i + 1;
    const t = line.trim();

    if (lectureHeadingRe.test(t) || /^# (?:المحاضرة|المختبر|الوحدة|Unit)/.test(t)) {
      hasLectureHeading = true;
    }

    if (t.startsWith('```algorithm')) {
      inAlgorithmFence = true;
      algorithmLine = 0;
      continue;
    }
    if (inAlgorithmFence && t === '```') {
      inAlgorithmFence = false;
      continue;
    }
    if (inAlgorithmFence && t) {
      algorithmLine += 1;
      if (!/^\d+(?:[a-zأ-ي])?\s*\|/i.test(t)) {
        push('error', n, `algorithm line ${algorithmLine}: expected "N | step | tool | detail", got: ${t.slice(0, 60)}`);
      }
    }

    if (/^#### خطوات/i.test(t) && !/^#### ⚙️/.test(t)) {
      push('warn', n, `unknown step marker — use "#### ⚙️ الخطوات / الخوارزمية:" (SCHEMA §Algorithm)`);
    }

    if (/^## .+/.test(t) && !/MCQ|اختيار|ملخص|شرح|تمارين|تصحيح|نظرية|تتبع|تصميم|Cheat|مراجعة|قائمة فحص|خريطة|بطاقات|الكود النهائي/i.test(t)) {
      push('warn', n, `part heading may not match parser keywords: ${t}`);
    }
  }

  if (!hasLectureHeading && text.trim()) {
    push('error', 1, 'missing lecture heading (# المحاضرة … / # المختبر … / # الوحدة …)');
  }

  const h3Sections = [...text.matchAll(/^### (\d+(?:\.\d+)*\.?)\s+.+$/gm)];
  for (const m of h3Sections) {
    const idx = text.indexOf(m[0]);
    const lineNo = text.slice(0, idx).split('\n').length;
    const slice = text.slice(idx, idx + 800);
    if (!/#### النص الأصلي يقول:/.test(slice)) {
      push('warn', lineNo, `section ${m[1]} missing "#### النص الأصلي يقول:"`);
    }
    if (!/#### الشرح المبسّط:/.test(slice)) {
      push('warn', lineNo, `section ${m[1]} missing "#### الشرح المبسّط:"`);
    }
  }

  return issues;
}

/**
 * @param {{ severity: string, line: number, message: string }[]} issues
 */
export function formatIssues(issues) {
  return issues
    .sort((a, b) => a.line - b.line)
    .map(i => `  L${String(i.line).padStart(4)}  ${i.severity.toUpperCase().padEnd(5)}  ${i.message}`)
    .join('\n');
}

/**
 * @param {{ severity: string }[]} issues
 */
export function hasErrors(issues) {
  return issues.some(i => i.severity === 'error');
}

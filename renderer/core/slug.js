/** Stable URL/DOM fragment from Arabic+Latin heading text. */
export function slugify(text) {
  return String(text).replace(/[^\w\u0600-\u06FF]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

/**
 * Past-exam banks sometimes repeat the same lecture as "## … (تابع)" when more
 * questions are appended later. Collapse those to one TOC/page section.
 */
export function normalizeMcqSection(section) {
  if (!section) return '';
  return String(section)
    .replace(/\s*\(تابع(?:\s+\d+)?\)\s*$/u, '')
    .trim();
}

/** TOC / heading id suffix for an MCQ "## المحاضرة N: …" section divider. */
export function mcqSectionAnchor(section) {
  return `sec-${slugify(normalizeMcqSection(section) || section)}`;
}

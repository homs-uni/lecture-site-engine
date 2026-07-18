/** Stable URL/DOM fragment from Arabic+Latin heading text. */
export function slugify(text) {
  return String(text).replace(/[^\w\u0600-\u06FF]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

/** TOC / heading id suffix for an MCQ "## المحاضرة N: …" section divider. */
export function mcqSectionAnchor(section) {
  return `sec-${slugify(section)}`;
}

export function slugify(text) {
  return String(text).replace(/[^\w\u0600-\u06FF]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

export function subsectionLevel(text) {
  const m = String(text).match(/^(\d+(?:\.\d+)*)/);
  if (!m) return 3;
  return Math.min(2 + m[1].split('.').length, 5);
}

export function extractSubsections(body) {
  const subs = [];
  // Split on \r\n or \n — Windows-authored .md files (CRLF) left a trailing
  // \r on every line when we split on '\n' only, which silently broke the
  // heading regex below (its trailing $ could never match past the stray \r),
  // so numbered ### headings in CRLF files never became sidebar subsections.
  for (const line of body.split(/\r?\n/)) {
    const m = line.match(/^### (\d+(?:\.\d+)*\.?\s*.+)$/);
    if (m) {
      const text = m[1].trim();
      subs.push({ level: subsectionLevel(text), text, id: slugify(text) });
      continue;
    }
    const m4 = line.match(/^#### (\d+(?:\.\d+)+.+)$/);
    if (m4) {
      const text = m4[1].trim();
      subs.push({ level: 4, text, id: slugify(text) });
    }
  }
  return subs;
}

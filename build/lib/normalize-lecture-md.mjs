/**
 * Decap CMS saves lectures with YAML frontmatter (`body: |`).
 * Strip frontmatter so the parser sees raw SCHEMA.md markdown.
 *
 * Also normalizes Windows line endings (\r\n \u2192 \n) here, once, upstream of
 * both the parser (parser/core/slug.js#extractSubsections) and the schema
 * linter (build/lib/schema-checks.mjs#runSchemaChecks). Both do line-based
 * regex matching anchored with a trailing `$`, which silently never matches
 * when a stray `\r` is left dangling at the end of each line (JS `.` doesn't
 * consume `\r`) \u2014 so a CRLF-saved .md file used to lose its numbered
 * subsection headings entirely, with no error, no warning.
 * @param {string} text
 */
export function normalizeLectureMd(text) {
  const normalized = String(text).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const t = normalized;
  if (!t.startsWith('---')) return normalized;

  const end = t.indexOf('\n---', 3);
  if (end === -1) return normalized;

  const fm = t.slice(4, end);
  const after = t.slice(end + 4).trimStart();

  const bodyBlock = fm.match(/^body:\s*\|\n([\s\S]*)$/m);
  if (bodyBlock) {
    const lines = bodyBlock[1].split('\n');
    const indent = (lines.find(l => l.trim())?.match(/^(\s*)/)?.[1] || '').length;
    const body = lines.map(l => l.slice(indent)).join('\n').trimEnd();
    return body ? `${body}\n` : '';
  }

  const bodyFolded = fm.match(/^body:\s*>\n([\s\S]*)$/m);
  if (bodyFolded) {
    const lines = bodyFolded[1].split('\n');
    const indent = (lines.find(l => l.trim())?.match(/^(\s*)/)?.[1] || '').length;
    const body = lines.map(l => l.slice(indent)).join('\n').trimEnd();
    return body ? `${body}\n` : '';
  }

  const bodyQuoted = fm.match(/^body:\s*(['"])([\s\S]*?)\1\s*$/m);
  if (bodyQuoted) return `${bodyQuoted[2]}\n`;

  const bodyInline = fm.match(/^body:\s*(.+)$/m);
  if (bodyInline && !bodyInline[1].startsWith('|') && !bodyInline[1].startsWith('>')) {
    return `${bodyInline[1].trim()}\n`;
  }

  if (after) return after.endsWith('\n') ? after : `${after}\n`;
  return normalized;
}

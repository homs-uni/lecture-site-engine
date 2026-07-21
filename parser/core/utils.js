/** @param {object} config */
export function normalizeCodeLang(lang, config) {
  const raw = String(lang || 'text').trim().toLowerCase();
  const aliases = config.codeLangAliases || {};
  for (const [key, val] of Object.entries(aliases)) {
    if (raw.includes(key)) return val;
  }
  return raw.split(/\s*[\/|\s]\s*/)[0] || 'text';
}

export function codeLangLabel(lang, config) {
  const norm = normalizeCodeLang(lang, config);
  const labels = { kotlin: 'Kotlin', xml: 'XML', bash: 'Bash', gradle: 'Gradle', json: 'JSON', csharp: 'C#', c: 'C', python: 'Python', text: 'Code' };
  return labels[norm] || String(lang || 'Code').trim();
}

/** Parse algorithm fence lines: `1 | step | tool | detail` */
export function parseAlgorithmLines(code) {
  return String(code)
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split('|').map(p => p.trim());
      const num = parts[0]?.trim() || '';
      return {
        num: num || parts[0],
        step: parts[1] || '',
        tool: parts[2] || '',
        detail: parts[3] || parts.slice(3).join(' | '),
      };
    });
}

export function detectPartMeta(title, config) {
  for (const p of config.partTypes || []) {
    if (p.match.test(title)) return { type: p.type, icon: p.icon };
  }
  return { type: 'detail', icon: '📖' };
}

export function extractTag(title) {
  const en = title.match(/—\s*([^(\n]+?)(?:\s*\(|$)/);
  if (en) return en[1].trim().split(':')[0].trim();
  const paren = title.match(/\(([^)]+)\)/);
  return paren ? paren[1] : title.slice(0, 30);
}

/** SCHEMA v2.0 invisible metadata comments — stripped before render. */
export const SCHEMA_METADATA_COMMENT_RE = /<!--\s*(?:@(?:render|connectivity|source|missing-pieces|additions|type)|VALIDATION)[\s\S]*?-->/gi;

export function isSchemaMetadataCommentStart(line) {
  return /^<!--\s*(?:@(?:render|connectivity|source|missing-pieces|additions|type)|VALIDATION)/i.test(String(line).trim());
}

/** @param {string[]} lines @param {number} start */
export function collectSchemaMetadataComment(lines, start) {
  let i = start;
  while (i < lines.length) {
    if (/-->/.test(lines[i])) {
      i++;
      break;
    }
    i++;
  }
  return { nextIndex: i };
}

export function stripSchemaMetadataFromText(text) {
  return String(text).replace(SCHEMA_METADATA_COMMENT_RE, '').replace(/\s+/g, ' ').trim();
}

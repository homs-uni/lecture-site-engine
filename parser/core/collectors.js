export function isStructural(line) {
  const t = String(line).trim();
  return /^#{1,6} /.test(t) || /^---+$/.test(t) || /^```/.test(t) || /^\|.+\|$/.test(t) || /^> /.test(t);
}

export function isTableStart(lines, i) {
  return (
    i + 1 < lines.length
    && /^\|.+\|$/.test(lines[i].trim())
    && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())
  );
}

/** @param {string[]} lines @param {number} start */
export function collectDollarMath(lines, start) {
  let i = start;
  while (i < lines.length && !lines[i].trim()) i++;
  if (i >= lines.length) return null;

  const line = lines[i].trim();
  const inline = line.match(/^\$\$([\s\S]+)\$\$$/);
  if (inline) return { latex: inline[1].trim(), nextIndex: i + 1 };

  if (line !== '$$') return null;
  i++;
  const parts = [];
  while (i < lines.length && lines[i].trim() !== '$$') {
    parts.push(lines[i]);
    i++;
  }
  return { latex: parts.join('\n').trim(), nextIndex: i + 1 };
}

export function collectBlockquote(lines, start) {
  const parts = [];
  let i = start;
  while (i < lines.length && !lines[i].trim()) i++;
  while (i < lines.length && /^> ?/.test(lines[i])) {
    parts.push(lines[i].replace(/^> ?/, ''));
    i++;
  }
  return { text: parts.join('\n'), nextIndex: i };
}

export function collectUntilHeading(lines, start) {
  let text = '';
  let i = start;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (/^#{3,4} /.test(t) || /^---+$/.test(t)) break;
    if (/^> /.test(lines[i])) {
      text += (text ? '\n' : '') + lines[i].replace(/^> ?/, '');
    } else if (t) {
      text += (text ? '\n' : '') + t;
    }
    i++;
  }
  return { text: text.trim(), nextIndex: i };
}

export function collectList(lines, start) {
  const items = [];
  let i = start;
  while (i < lines.length) {
    const t = lines[i].trim();
    const ol = t.match(/^(\d+)\.\s+(.+)/);
    const ul = t.match(/^[-*]\s+(.+)/);
    if (ol) { items.push(ol[2]); i++; continue; }
    if (ul) { items.push(ul[1]); i++; continue; }
    if (!t) { i++; break; }
    if (isStructural(lines[i])) break;
    break;
  }
  return { items, nextIndex: i };
}

export function collectParagraph(lines, start) {
  const parts = [];
  let i = start;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) break;
    if (isStructural(lines[i])) break;
    parts.push(t);
    i++;
  }
  return { text: parts.join(' '), nextIndex: i || start + 1 };
}

/**
 * Splits a Markdown table row on unescaped `|` characters.
 * A `\|` inside a cell (e.g. `\`|x|\`` for absolute value, `\`max\|Δx\|\``)
 * is treated as a literal pipe rather than a column separator.
 */
function splitTableRow(line) {
  return line
    .split(/(?<!\\)\|/)
    .slice(1, -1)
    .map(c => c.trim().replace(/\\\|/g, '|'));
}

export function parseTable(lines, start) {
  const header = splitTableRow(lines[start]);
  let i = start + 2;
  const rows = [];
  while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
    rows.push(splitTableRow(lines[i]));
    i++;
  }
  return { header, rows, nextIndex: i };
}

/** @param {string[]} lines @param {number} start */
export function collectDetailsBlock(lines, start) {
  let i = start;
  const openLine = lines[i].trim();
  let summary = '';
  const summaryInOpen = openLine.match(/<summary>([\s\S]*?)<\/summary>/i);
  if (summaryInOpen) {
    summary = summaryInOpen[1].trim();
  }
  i++;

  if (!summary) {
    while (i < lines.length && !lines[i].trim()) i++;
    const sumLine = lines[i]?.trim() || '';
    const sumMatch = sumLine.match(/^<summary>([\s\S]*?)<\/summary>$/i);
    if (sumMatch) {
      summary = sumMatch[1].trim();
      i++;
    }
  }

  const innerParts = [];
  while (i < lines.length) {
    const t = lines[i].trim();
    if (/^<\/details>\s*$/.test(t)) {
      i++;
      break;
    }
    innerParts.push(lines[i]);
    i++;
  }

  return {
    summary,
    innerText: innerParts.join('\n').trim(),
    nextIndex: i,
  };
}

export function collectFence(lines, start) {
  const lang = lines[start].trim().slice(3).trim() || 'text';
  let i = start + 1;
  const codeLines = [];
  while (i < lines.length && !/^```/.test(lines[i].trim())) {
    codeLines.push(lines[i]);
    i++;
  }
  if (i < lines.length) i++;
  return { lang, code: codeLines.join('\n'), nextIndex: i };
}

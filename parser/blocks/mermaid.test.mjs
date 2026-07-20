import { createParser } from '../index.js';
import { createRenderer } from '../../renderer/index.js';

const md = `# محاضرة تجريبية

## الجزء الأول: الشرح التفصيلي

### 1. Test

\`\`\`mermaid
graph LR
    A --> B
\`\`\`
`;

const doc = createParser().parseDocument(md);
const lecture = doc.lectures?.[0] || doc;
const parts = lecture.parts || [];
const blocks = parts.flatMap(p => p.blocks || []);
const mermaid = blocks.find(b => b.type === 'mermaid');
if (!mermaid) {
  console.error('parts', JSON.stringify(parts.map(p => ({ type: p.type, blockTypes: (p.blocks||[]).map(b => b.type) })), null, 2));
  throw new Error('expected mermaid block');
}
if (!mermaid.code.includes('A --> B')) throw new Error('mermaid code missing');

const { renderBlocks } = createRenderer();
const html = renderBlocks([{ type: 'mermaid', code: mermaid.code }], 'test-p1', 'detail');
if (!html.includes('mermaid-container')) throw new Error('renderer missing mermaid-container');
if (!html.includes('class="mermaid"')) throw new Error('renderer missing .mermaid node for library');
if (!html.includes('A --&gt; B')) throw new Error('renderer missing escaped mermaid source');

console.log('mermaid parser/render test: OK');

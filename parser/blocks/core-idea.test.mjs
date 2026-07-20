#!/usr/bin/env node
import { createParser } from '../index.js';

const md = `#### 💡 الفكرة الأساسية
**One sentence core idea with \`code\`.**

#### 💡 التشبيه
> Analogy content here.
`;

const { parseBlocks } = createParser();
const blocks = parseBlocks(md);

const core = blocks.find(b => b.type === 'core-idea');
if (!core?.content?.includes('One sentence')) throw new Error('core-idea missing paragraph content');

const analogy = blocks.find(b => b.type === 'analogy');
if (!analogy?.content?.includes('Analogy content')) throw new Error('analogy missing blockquote content');

if (blocks.some(b => b.type === 'paragraph' && b.text.includes('One sentence'))) {
  throw new Error('core idea leaked into paragraph');
}

console.log('core-idea parser test: OK');

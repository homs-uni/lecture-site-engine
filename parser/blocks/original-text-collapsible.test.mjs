#!/usr/bin/env node
import { createParser } from '../index.js';

const md = `### 1. Test section

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> "Hello from the lecture."

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل

</details>
`;

const { parseBlocks } = createParser();
const blocks = parseBlocks(md);

const collapsible = blocks.find(b => b.type === 'original-text-collapsible');
if (!collapsible) throw new Error('missing original-text-collapsible block');
if (!/coverage: 100%/.test(collapsible.summary)) throw new Error('missing summary');
if (!collapsible.blocks?.some(b => b.type === 'blockquote')) throw new Error('missing inner blockquote');
if (blocks.some(b => b.type === 'paragraph' && b.text?.includes('<details>'))) {
  throw new Error('details tags leaked as paragraph');
}

console.log('original-text-collapsible parser test: OK');

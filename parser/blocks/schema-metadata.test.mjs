#!/usr/bin/env node
import { createParser } from '../index.js';

const md = `### 1. Test section
<!-- @type: fact -->
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none", connects-to: ["section_2"]} -->

#### 📍 أين نحن الآن؟
Content here.

<!-- VALIDATION
schema: 2.0
mcq_count: 16
-->
`;

const { parseBlocks } = createParser();
const blocks = parseBlocks(md);

if (blocks.some(b => b.text?.includes('@render') || b.text?.includes('@type') || b.text?.includes('VALIDATION'))) {
  throw new Error('metadata comments leaked into blocks');
}
if (!blocks.some(b => b.type === 'h4' && b.text.includes('أين نحن'))) {
  throw new Error('missing real content');
}

console.log('schema metadata comment parser test: OK');

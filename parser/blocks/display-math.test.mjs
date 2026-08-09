#!/usr/bin/env node
import { createParser } from '../index.js';

const md = `#### 📐 التعريف / الصيغة
$$
F(x) = a_n x^n + a_0
$$
$$
y = \\frac{h(x)}{g(x)}
$$

#### 📖 الشرح
نضرب بالمرافق:

$$\\frac{\\sqrt{x}-\\sqrt{x_0}}{x-x_0} = \\frac{1}{\\sqrt x+\\sqrt{x_0}}$$

وبأخذ النهاية نحصل على النتيجة.
`;

const { parseBlocks } = createParser();
const blocks = parseBlocks(md);

const equations = blocks.filter(b => b.type === 'equation');
if (equations.length !== 3) {
  throw new Error(`expected 3 equation blocks, got ${equations.length}`);
}

// The first one is claimed by the `#### 📐` handler and keeps its heading.
if (equations[0].title !== '📐 التعريف / الصيغة') {
  throw new Error('first equation lost its heading');
}
if (!equations[0].latex.includes('a_n x^n')) throw new Error('first equation latex wrong');

// Follow-on formulas render bare (no repeated header).
if (equations[1].title !== '' || equations[2].title !== '') {
  throw new Error('standalone display math should have an empty title');
}
if (!equations[1].latex.includes('\\frac{h(x)}{g(x)}')) {
  throw new Error('second equation latex wrong');
}
// Single-line `$$…$$` form must work too.
if (!equations[2].latex.includes('\\sqrt{x_0}')) {
  throw new Error('inline-form display math latex wrong');
}

if (blocks.some(b => b.type === 'paragraph' && b.text.includes('$$'))) {
  throw new Error('display math leaked into a paragraph');
}

console.log('display-math parser test: OK');

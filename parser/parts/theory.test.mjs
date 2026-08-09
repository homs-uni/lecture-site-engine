import { parseTheory } from './handlers.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// SCHEMA form
{
  const qs = parseTheory(`
### سؤال 1: عرّف X
**نموذج الإجابة:**
X is Y
`);
  assert(qs.length === 1, `expected 1, got ${qs.length}`);
  assert(qs[0].title.startsWith('سؤال 1:'), `title=${qs[0].title}`);
  assert(qs[0].answer.includes('X is Y'), `answer=${qs[0].answer}`);
}

// Math_2 form: سؤال نظري + الإجابة النموذجية + **السؤال:** stem
{
  const qs = parseTheory(`
### سؤال نظري 1
**السؤال:** عرّف الدالة وحيدة القيمة.
**الإجابة النموذجية:**
الدالة وحيدة القيمة هي ...
`);
  assert(qs.length === 1, `nazari: expected 1, got ${qs.length}`);
  assert(qs[0].title.includes('سؤال نظري 1'), `nazari title=${qs[0].title}`);
  assert(qs[0].title.includes('عرّف الدالة'), `nazari stem in title=${qs[0].title}`);
  assert(qs[0].answer.includes('وحيدة القيمة'), `nazari answer=${qs[0].answer}`);
}

console.log('parser/parts/theory.test.mjs: ok');

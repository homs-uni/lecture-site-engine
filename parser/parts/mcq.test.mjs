import { parseMCQ } from './handlers.js';

const arabicKey = { أ: 'a', ا: 'a', ب: 'b', ج: 'c', د: 'd', a: 'a', b: 'b', c: 'c', d: 'd' };

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// templates/part-mcq.md
{
  const qs = parseMCQ(`
### السؤال 1 (متوسط)
What is X?
أ) one
ب) two
ج) three
د) four
**الإجابة الصحيحة: ب**
**التعليل:** because two
`, { arabicKey });

  assert(qs.length === 1, `expected 1 question, got ${qs.length}`);
  assert(qs[0].num === '1' && qs[0].correct === 'b' && qs[0].options.length === 4, 'part-mcq parse failed');
  assert(qs[0].explain.includes('because two'), `explain=${qs[0].explain}`);
}

// templates/part-past-exam-mcq.md — standalone with source tag
{
  const qs = parseMCQ(`
**المصدر:** [نمط 2022-2023]
### السؤال 2 (صعب)
Pick one:
أ) A
ب) B
ج) C
د) D
**الإجابة الصحيحة: ج**
**التعليل:** C is right
`, { arabicKey });

  assert(qs.length === 1, `expected 1 past-exam question, got ${qs.length}`);
  assert(qs[0].source === '[نمط 2022-2023]', `source=${qs[0].source}`);
  assert(qs[0].correct === 'c', `correct=${qs[0].correct}`);
}

// templates/part-past-exam-mcq.md — Case-2 shared stimulus group
{
  const qs = parseMCQ(`
**المصدر:** [نمط 2025]
### السؤال 3–4 (مجموعة أسئلة على نص/كود مشترك)

\`\`\`kotlin
val x = 1
\`\`\`

**السؤال 3:** What is x?
أ) 0
ب) 1
ج) 2
د) 3
**الإجابة الصحيحة: ب**
**التعليل:** x is 1

**السؤال 4:** Is x constant?
أ) yes
ب) no
ج) maybe
د) N/A
**الإجابة الصحيحة: أ**
**التعليل:** val
`, { arabicKey });

  assert(qs.length === 1 && qs[0].type === 'group', `expected group, got ${JSON.stringify(qs[0]?.type)}`);
  assert(qs[0].questions.length === 2, `subqs=${qs[0].questions.length}`);
  assert(qs[0].stimulus.includes('```'), 'stimulus should keep code fence');
  assert(qs[0].questions[0].correct === 'b' && qs[0].questions[1].correct === 'a', 'group answers');
}

// Compact **Q1.** English form must NOT parse (content must be converted first)
{
  const qs = parseMCQ(`
**Q1.** Something?
a) A  b) **B**  c) C  d) D
*المصدر: [محاضرة]*
`, { arabicKey });
  assert(qs.length === 0, `compact Q form should not parse, got ${qs.length}`);
}

console.log('parser/parts/mcq.test.mjs: ok');

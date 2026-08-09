import { parseMCQ } from './handlers.js';

const arabicKey = { أ: 'a', ا: 'a', ب: 'b', ج: 'c', د: 'd', ه: 'e', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };

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

// Fifth option (ه) as the correct answer must parse, not silently drop to ''
{
  const qs = parseMCQ(`
### السؤال 1 (متوسط)
Which are true?
أ) one
ب) two
ج) three
د) four
ه) all wrong
**الإجابة الصحيحة: ه**
**التعليل:** none of the above
`, { arabicKey });

  assert(qs.length === 1, `expected 1 question, got ${qs.length}`);
  assert(qs[0].options.length === 5 && qs[0].options[4].key === 'e', `5th option key=${qs[0].options[4]?.key}`);
  assert(qs[0].correct === 'e', `expected correct='e', got '${qs[0].correct}'`);
}

// Past-exam PDFs often write the 5th letter with a tatweel: هـ) / هـ
{
  const qs = parseMCQ(`
### السؤال 1 (صعب)
أي العبارات خاطئة؟
أ) one
ب) two
ج) three
د) four
هـ) a + c + d
**الإجابة الصحيحة: هـ**
**التعليل:** fifth option
`, { arabicKey });

  assert(qs.length === 1, `tatweel: expected 1 question, got ${qs.length}`);
  assert(qs[0].options.length === 5 && qs[0].options[4].key === 'e', `tatweel 5th key=${qs[0].options[4]?.key}`);
  assert(qs[0].correct === 'e', `tatweel expected correct='e', got '${qs[0].correct}'`);
}

// Without ال: "### سؤال N (...)" (Math_2 and similar lectures)
{
  const qs = parseMCQ(`
### سؤال 1 (مفاهيمي)
ما الفرق؟
أ) one
ب) two
ج) three
د) four
**الإجابة الصحيحة: ب**
- ✅ (ب) صحيحة: because two
- ❌ (أ) خاطئة: reverse
`, { arabicKey });

  assert(qs.length === 1, `no-al: expected 1 question, got ${qs.length}`);
  assert(qs[0].num === '1' && qs[0].difficulty === 'مفاهيمي', `no-al num/diff=${qs[0].num}/${qs[0].difficulty}`);
  assert(qs[0].correct === 'b' && qs[0].options.length === 4, 'no-al options/correct failed');
  assert(qs[0].explain.includes('صحيحة'), `no-al explain should pick up ✅/❌ bullets, got=${qs[0].explain}`);
}

// "### سؤال نظري N" must NOT be treated as an MCQ heading
{
  const qs = parseMCQ(`
### سؤال نظري 1
**السؤال:** something
**الإجابة النموذجية:** answer
`, { arabicKey });
  assert(qs.length === 0, `theory heading must not parse as MCQ, got ${qs.length}`);
}

console.log('parser/parts/mcq.test.mjs: ok');

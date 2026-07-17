import {
  qidFor,
  parseQid,
  numFromCardId,
  shuffled,
  isExaminable,
  buildQuestionPool,
  pickExamQuestions,
  filterPoolByQids,
  summarizeResults,
  formatElapsed,
} from '../../site-shell/js/exam-core.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// --- qid round-trip ---------------------------------------------------
assert(qidFor('par3', '12') === 'par3::q12', 'qidFor plain num');
assert(qidFor('par1-sec2', '1.1') === 'par1-sec2::q1.1', 'qidFor sub-numbered');

const parsed = parseQid('par1-sec2::q1.1');
assert(parsed?.lectureId === 'par1-sec2' && parsed?.num === '1.1', 'parseQid round-trip');
assert(parseQid('garbage') === null, 'parseQid rejects garbage');
assert(parseQid('') === null, 'parseQid rejects empty');

// --- card id parsing --------------------------------------------------
assert(numFromCardId('par3-p4-q12') === '12', 'numFromCardId plain');
assert(numFromCardId('par1-sec2-p2-q1.1') === '1.1', 'numFromCardId sub-numbered');
assert(numFromCardId('exam-q7') === '7', 'numFromCardId exam card');
assert(numFromCardId('par3-p4') === '', 'numFromCardId no q suffix');

// --- shuffle ----------------------------------------------------------
const src = [1, 2, 3, 4, 5];
const identity = shuffled(src, () => 0.999999);
assert(JSON.stringify(identity) === JSON.stringify(src), 'rng→1 keeps order');
assert(JSON.stringify(src) === JSON.stringify([1, 2, 3, 4, 5]), 'shuffled does not mutate');
assert(shuffled(src).length === 5, 'shuffle preserves length');

// --- examinable filter -------------------------------------------------
const goodQ = {
  num: '1',
  correct: 'b',
  options: [{ key: 'a', text: 'x' }, { key: 'b', text: 'y' }],
};
assert(isExaminable(goodQ), 'well-formed question is examinable');
assert(!isExaminable({ ...goodQ, correct: '' }), 'missing answer key rejected');
assert(!isExaminable({ ...goodQ, options: [{ key: 'a', text: 'x' }] }), 'single option rejected');
assert(!isExaminable({ ...goodQ, correct: 'z' }), 'answer key not among options rejected');

// --- pool building ------------------------------------------------------
const pool = buildQuestionPool([
  {
    lectureId: 'par1',
    lectureTitle: 'المحاضرة 1',
    questions: [goodQ, { ...goodQ, num: '2', correct: '' }],
  },
  { lectureId: 'par2', lectureTitle: 'المحاضرة 2', questions: [{ ...goodQ, num: '3' }] },
]);
assert(pool.length === 2, 'broken question excluded from pool');
assert(pool[0].qid === 'par1::q1' && pool[1].qid === 'par2::q3', 'pool qids');

// --- picking ------------------------------------------------------------
assert(pickExamQuestions(pool, { count: 1, rng: () => 0 }).length === 1, 'count limits pool');
assert(pickExamQuestions(pool, { count: 0 }).length === 2, 'count 0 = all');
assert(pickExamQuestions(pool, { count: 99 }).length === 2, 'count beyond pool = all');

// --- mistakes filter ------------------------------------------------------
const onlyWrong = filterPoolByQids(pool, ['par2::q3', 'par9::q9']);
assert(onlyWrong.length === 1 && onlyWrong[0].qid === 'par2::q3', 'filterPoolByQids keeps matches, drops stale');

// --- results ------------------------------------------------------------
const results = summarizeResults([
  { qid: 'par1::q1', lectureId: 'par1', lectureTitle: 'م1', correct: true },
  { qid: 'par1::q2', lectureId: 'par1', lectureTitle: 'م1', correct: false },
  { qid: 'par2::q3', lectureId: 'par2', lectureTitle: 'م2', correct: null },
]);
assert(results.total === 3, 'results total');
assert(results.correctCount === 1 && results.wrongCount === 1 && results.unansweredCount === 1, 'results counters');
assert(results.percent === 33, 'results percent rounds');
assert(results.perLecture.length === 2, 'per-lecture buckets');
assert(results.perLecture[0].total === 2 && results.perLecture[0].correct === 1, 'per-lecture counts');
assert(summarizeResults([]).percent === 0, 'empty results → 0%');

// --- elapsed formatting ----------------------------------------------------
assert(formatElapsed(0) === '0:00', 'elapsed zero');
assert(formatElapsed(65) === '1:05', 'elapsed pads seconds');
assert(formatElapsed(600.9) === '10:00', 'elapsed floors fraction');

console.log('✓ exam-core tests passed');

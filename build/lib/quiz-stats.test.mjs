import { createQuizStats, normalizeQuizSubjectState } from '../../site-shell/js/quiz-stats.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

/** Minimal localStorage stand-in for Node. */
function fakeStorage() {
  const map = new Map();
  return {
    getItem: k => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
  };
}

// --- normalize ----------------------------------------------------------
const norm = normalizeQuizSubjectState({
  questions: { 'par1::q1': { c: '2', w: 1, last: 1, at: 5 }, bad: null },
  exams: [null, { at: 1, total: 10, correct: 7, mode: 'exam' }],
});
assert(norm.questions['par1::q1'].c === 2, 'normalize coerces counts');
assert(!('bad' in norm.questions), 'normalize drops null stats');
assert(norm.exams.length === 1, 'normalize drops null exams');
assert(normalizeQuizSubjectState(undefined).exams.length === 0, 'normalize handles undefined');

// --- record + read -------------------------------------------------------
const storage = fakeStorage();
const stats = createQuizStats({ subjectKey: 'year-1/demo', storage });

assert(stats.getLastExam() === null, 'no exams initially');
assert(stats.getWrongQids().length === 0, 'no wrong qids initially');
assert(stats.getMasteredCount('par1') === 0, 'no mastery initially');

stats.recordAnswer('par1::q1', false);
stats.recordAnswer('par1::q1', true);
stats.recordAnswer('par1::q2', false);
stats.recordAnswer('par2::q1', true);

const q = stats.getQuestionStats();
assert(q['par1::q1'].c === 1 && q['par1::q1'].w === 1, 'counts accumulate');
assert(q['par1::q1'].last === 1, 'last flips to correct');

const wrong = stats.getWrongQids();
assert(wrong.length === 1 && wrong[0] === 'par1::q2', 'mistakes bank = last answer wrong');

assert(stats.getMasteredCount('par1') === 1, 'mastery counts ever-correct only');
assert(stats.getMasteredCount('par2') === 1, 'mastery per lecture prefix');
// "par1" prefix must not swallow a hypothetical "par1-sec1" lecture.
stats.recordAnswer('par1-sec1::q1', true);
assert(stats.getMasteredCount('par1') === 1, 'prefix match respects :: separator');

// --- subject isolation -----------------------------------------------------
const other = createQuizStats({ subjectKey: 'year-2/other', storage });
assert(other.getWrongQids().length === 0, 'subjects are isolated');

// --- exam history -----------------------------------------------------------
stats.recordExam({ total: 10, correct: 7 });
stats.recordExam({ total: 5, correct: 5, mode: 'mistakes' });
const last = stats.getLastExam();
assert(last.total === 5 && last.correct === 5 && last.mode === 'mistakes', 'last exam recorded');

for (let i = 0; i < 30; i++) stats.recordExam({ total: 1, correct: 1 });
assert(JSON.parse(storage.getItem(stats.storageKey)).subjects['year-1/demo'].exams.length <= 20,
  'exam history capped');

// --- corrupted store recovery ------------------------------------------------
const broken = fakeStorage();
broken.setItem('study-guide-quiz-v1', '{not json');
const recovered = createQuizStats({ subjectKey: 'x', storage: broken });
assert(recovered.getWrongQids().length === 0, 'corrupted store reads as empty');
assert(recovered.recordAnswer('a::q1', true) === true, 'corrupted store is overwritten on write');

console.log('✓ quiz-stats tests passed');

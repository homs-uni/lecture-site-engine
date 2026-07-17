/**
 * Pure logic for exam practice mode (no DOM, no storage) — Node-testable.
 * DOM layer lives in exam.js; persistence in quiz-stats.js.
 */

/** Stable question id: survives re-renders and re-builds as long as the
 *  lecture file stem and the question's "السؤال N" number are unchanged. */
export function qidFor(lectureId, num) {
  return `${lectureId}::q${num}`;
}

/** @returns {{ lectureId: string, num: string } | null} */
export function parseQid(qid) {
  const m = /^(.+)::q([\d.]+)$/.exec(String(qid || ''));
  return m ? { lectureId: m[1], num: m[2] } : null;
}

/** Extract q.num from a rendered MCQ card id like "par3-p4-q12" / "par3-p4-q1.2". */
export function numFromCardId(cardId) {
  const m = /-q([\d.]+)$/.exec(String(cardId || ''));
  return m ? m[1] : '';
}

/** Fisher-Yates shuffle (non-mutating). rng injectable for tests. */
export function shuffled(arr, rng = Math.random) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** A question is only examinable when the parser found real options and an answer key. */
export function isExaminable(q) {
  return Boolean(
    q
    && q.correct
    && Array.isArray(q.options)
    && q.options.length >= 2
    && q.options.some(o => o.key === q.correct),
  );
}

/**
 * Flatten loaded lectures into one pool of exam questions.
 *
 * @param {Array<{ lectureId: string, lectureTitle: string, questions: Array }>} lectureEntries
 * @returns {Array<{ qid: string, lectureId: string, lectureTitle: string, q: object }>}
 */
export function buildQuestionPool(lectureEntries) {
  const pool = [];
  for (const entry of lectureEntries || []) {
    for (const q of entry.questions || []) {
      if (!isExaminable(q)) continue;
      pool.push({
        qid: qidFor(entry.lectureId, q.num),
        lectureId: entry.lectureId,
        lectureTitle: entry.lectureTitle,
        q,
      });
    }
  }
  return pool;
}

/**
 * @param {Array} pool — from buildQuestionPool
 * @param {{ count?: number, rng?: () => number }} [opts] — count 0/undefined = all
 */
export function pickExamQuestions(pool, { count, rng } = {}) {
  const picked = shuffled(pool, rng);
  return count && count > 0 ? picked.slice(0, count) : picked;
}

/** Keep only pool entries whose qid is in the given set (mistakes mode). */
export function filterPoolByQids(pool, qids) {
  const wanted = new Set(qids || []);
  return (pool || []).filter(entry => wanted.has(entry.qid));
}

/**
 * Aggregate a finished exam into a result summary.
 *
 * @param {Array<{ qid: string, lectureId: string, lectureTitle: string, correct: boolean|null }>} entries
 *   correct: true/false = answered, null = never answered
 */
export function summarizeResults(entries) {
  const perLecture = new Map();
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  for (const e of entries || []) {
    if (!perLecture.has(e.lectureId)) {
      perLecture.set(e.lectureId, {
        lectureId: e.lectureId,
        title: e.lectureTitle,
        total: 0,
        correct: 0,
      });
    }
    const bucket = perLecture.get(e.lectureId);
    bucket.total += 1;
    if (e.correct === true) {
      bucket.correct += 1;
      correctCount += 1;
    } else if (e.correct === false) {
      wrongCount += 1;
    } else {
      unansweredCount += 1;
    }
  }

  const total = entries?.length || 0;
  return {
    total,
    correctCount,
    wrongCount,
    unansweredCount,
    percent: total ? Math.round((correctCount / total) * 100) : 0,
    perLecture: [...perLecture.values()],
  };
}

/** Format elapsed seconds as m:ss (Arabic sites still read digits LTR). */
export function formatElapsed(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

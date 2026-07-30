/**
 * Persistent per-question MCQ answer stats + exam history (localStorage).
 * Mirrors progress_tracker.js: one versioned store keyed by subject.
 * `storage` is injectable so Node tests can pass a fake.
 */
const QUIZ_STORAGE_KEY = 'study-guide-quiz-v1';
const QUIZ_VERSION = 1;
const EXAM_HISTORY_LIMIT = 20;

function emptyStore() {
  return { v: QUIZ_VERSION, subjects: {} };
}

export function normalizeQuizSubjectState(raw) {
  const state = { questions: {}, exams: [] };
  if (!raw || typeof raw !== 'object') return state;
  if (raw.questions && typeof raw.questions === 'object') {
    Object.keys(raw.questions).forEach((qid) => {
      const s = raw.questions[qid];
      if (!s || typeof s !== 'object') return;
      const entry = {
        c: Number(s.c) || 0,
        w: Number(s.w) || 0,
        last: s.last === 1 ? 1 : 0,
        at: Number(s.at) || 0,
      };
      // Persisted choice for DAWRAT (and any other view that saves picks).
      // Cleared explicitly via clearAnswerChoice — survives reloads until then.
      if (typeof s.picked === 'string' && s.picked) entry.picked = s.picked;
      state.questions[qid] = entry;
    });
  }
  if (Array.isArray(raw.exams)) {
    state.exams = raw.exams
      .filter(e => e && typeof e === 'object')
      .slice(-EXAM_HISTORY_LIMIT);
  }
  return state;
}

export function createQuizStats({
  subjectKey,
  storageKey = QUIZ_STORAGE_KEY,
  storage = typeof localStorage !== 'undefined' ? localStorage : null,
} = {}) {
  const currentSubjectKey = subjectKey || '';

  function readStore() {
    try {
      const raw = storage?.getItem(storageKey);
      if (!raw) return emptyStore();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return emptyStore();
      if (!parsed.subjects || typeof parsed.subjects !== 'object') parsed.subjects = {};
      if (typeof parsed.v !== 'number') parsed.v = QUIZ_VERSION;
      return parsed;
    } catch {
      return emptyStore();
    }
  }

  function writeStore(store) {
    try {
      storage?.setItem(storageKey, JSON.stringify(store));
      return true;
    } catch {
      return false;
    }
  }

  function readSubjectState() {
    return normalizeQuizSubjectState(readStore().subjects[currentSubjectKey]);
  }

  function writeSubjectState(state) {
    const store = readStore();
    store.subjects[currentSubjectKey] = state;
    return writeStore(store);
  }

  function recordAnswer(qid, isCorrect) {
    if (!qid) return false;
    const state = readSubjectState();
    const stat = state.questions[qid] || { c: 0, w: 0, last: 0, at: 0 };
    if (isCorrect) stat.c += 1;
    else stat.w += 1;
    stat.last = isCorrect ? 1 : 0;
    stat.at = Date.now();
    state.questions[qid] = stat;
    return writeSubjectState(state);
  }

  /** Persist which option was picked so the card can be restored across sessions. */
  function saveAnswerChoice(qid, pickedKey, isCorrect) {
    if (!qid || !pickedKey) return false;
    const state = readSubjectState();
    const stat = state.questions[qid] || { c: 0, w: 0, last: 0, at: 0 };
    stat.picked = String(pickedKey);
    stat.last = isCorrect ? 1 : 0;
    stat.at = Date.now();
    state.questions[qid] = stat;
    return writeSubjectState(state);
  }

  function getAnswerChoice(qid) {
    if (!qid) return null;
    const stat = readSubjectState().questions[qid];
    if (!stat?.picked) return null;
    return { picked: stat.picked, last: stat.last };
  }

  /** Drop the saved pick so the question is unanswered again (keeps c/w history). */
  function clearAnswerChoice(qid) {
    if (!qid) return false;
    const state = readSubjectState();
    const stat = state.questions[qid];
    if (!stat || !stat.picked) return false;
    delete stat.picked;
    state.questions[qid] = stat;
    return writeSubjectState(state);
  }

  /** Clear saved picks for many qids at once (e.g. reset whole DAWRAT progress). */
  function clearAnswerChoices(qids) {
    if (!Array.isArray(qids) || !qids.length) return false;
    const state = readSubjectState();
    let changed = false;
    for (const qid of qids) {
      const stat = state.questions[qid];
      if (!stat?.picked) continue;
      delete stat.picked;
      state.questions[qid] = stat;
      changed = true;
    }
    return changed ? writeSubjectState(state) : false;
  }

  function getQuestionStats() {
    return readSubjectState().questions;
  }

  /** qids whose most recent answer was wrong — the mistakes bank. */
  function getWrongQids() {
    const questions = readSubjectState().questions;
    return Object.keys(questions).filter(qid => questions[qid].last === 0);
  }

  /** Distinct questions of a lecture ever answered correctly. */
  function getMasteredCount(lectureId) {
    if (!lectureId) return 0;
    const prefix = `${lectureId}::`;
    const questions = readSubjectState().questions;
    return Object.keys(questions)
      .filter(qid => qid.startsWith(prefix) && questions[qid].c > 0)
      .length;
  }

  function recordExam({ total, correct, mode = 'exam' } = {}) {
    const state = readSubjectState();
    state.exams.push({ at: Date.now(), total: Number(total) || 0, correct: Number(correct) || 0, mode });
    state.exams = state.exams.slice(-EXAM_HISTORY_LIMIT);
    return writeSubjectState(state);
  }

  function getLastExam() {
    const exams = readSubjectState().exams;
    return exams.length ? exams[exams.length - 1] : null;
  }

  function onChange(callback) {
    if (typeof callback !== 'function' || typeof window === 'undefined') return () => {};
    const listener = (event) => {
      if (event.key === storageKey) callback();
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }

  return {
    storageKey,
    getSubjectKey: () => currentSubjectKey,
    recordAnswer,
    saveAnswerChoice,
    getAnswerChoice,
    clearAnswerChoice,
    clearAnswerChoices,
    getQuestionStats,
    getWrongQids,
    getMasteredCount,
    recordExam,
    getLastExam,
    onChange,
  };
}

const PROGRESS_STORAGE_KEY = 'study-guide-progress-v1';
const PROGRESS_VERSION = 1;

function emptyStore() {
  return { v: PROGRESS_VERSION, subjects: {} };
}

function safeReadJson(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return emptyStore();
    if (!parsed.subjects || typeof parsed.subjects !== 'object') parsed.subjects = {};
    if (typeof parsed.v !== 'number') parsed.v = PROGRESS_VERSION;
    return parsed;
  } catch {
    return emptyStore();
  }
}

function safeWriteJson(storageKey, value) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function normalizeSubjectState(raw) {
  if (!raw || typeof raw !== 'object') return { completed: {} };
  if (raw.completed && typeof raw.completed === 'object') return { completed: { ...raw.completed } };

  // Legacy fallback: subject map stored directly as lectureId -> truthy value.
  const completed = {};
  Object.keys(raw).forEach((lectureId) => {
    if (raw[lectureId]) completed[lectureId] = Date.now();
  });
  return { completed };
}

export function lectureIdFromPath(filePath) {
  if (!filePath || typeof filePath !== 'string') return '';
  const normalized = filePath.replace(/\\/g, '/').split('/').pop() || '';
  return normalized.replace(/\.(json|md)$/i, '');
}

export function resolveSubjectKeyFromPath(pathname = window.location.pathname) {
  const clean = String(pathname || '').replace(/\\/g, '/').replace(/\/+/g, '/');
  const match = clean.match(/(year-\d+\/[^/]+)/i);
  if (match && match[1]) return match[1].replace(/\/index\.html$/i, '');

  return clean
    .replace(/^\/+/, '')
    .replace(/\/index\.html$/i, '')
    .replace(/\/$/, '');
}

export function createProgressTracker({ subjectKey, storageKey = PROGRESS_STORAGE_KEY } = {}) {
  let currentSubjectKey = subjectKey || resolveSubjectKeyFromPath();

  function readStore() {
    return safeReadJson(storageKey);
  }

  function writeStore(store) {
    const safeStore = store && typeof store === 'object' ? store : emptyStore();
    if (!safeStore.subjects || typeof safeStore.subjects !== 'object') safeStore.subjects = {};
    if (typeof safeStore.v !== 'number') safeStore.v = PROGRESS_VERSION;
    return safeWriteJson(storageKey, safeStore);
  }

  function readSubjectState() {
    const store = readStore();
    return normalizeSubjectState(store.subjects[currentSubjectKey]);
  }

  function setLectureCompleted(lectureId, completed) {
    if (!lectureId) return false;

    const store = readStore();
    const subjectState = normalizeSubjectState(store.subjects[currentSubjectKey]);

    if (completed) subjectState.completed[lectureId] = Date.now();
    else delete subjectState.completed[lectureId];

    store.subjects[currentSubjectKey] = subjectState;
    return writeStore(store);
  }

  function isLectureCompleted(lectureId) {
    if (!lectureId) return false;
    const subjectState = readSubjectState();
    return Object.prototype.hasOwnProperty.call(subjectState.completed, lectureId);
  }

  function toggleLectureCompleted(lectureId) {
    if (!lectureId) return false;
    const next = !isLectureCompleted(lectureId);
    setLectureCompleted(lectureId, next);
    return next;
  }

  function countCompleted(lectureIds) {
    if (!Array.isArray(lectureIds) || !lectureIds.length) return 0;
    const uniqueIds = new Set(lectureIds.filter(Boolean));
    let done = 0;
    uniqueIds.forEach((lectureId) => {
      if (isLectureCompleted(lectureId)) done += 1;
    });
    return done;
  }

  function getSubjectProgress(lectureIds) {
    const total = Array.isArray(lectureIds) ? new Set(lectureIds.filter(Boolean)).size : 0;
    const completed = total ? countCompleted(lectureIds) : 0;
    const ratio = total ? completed / total : 0;
    return {
      total,
      completed,
      ratio,
      percent: Math.round(ratio * 100),
    };
  }

  function onChange(callback) {
    if (typeof callback !== 'function') return () => {};
    const listener = (event) => {
      if (event.key === storageKey) callback();
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }

  return {
    storageKey,
    getSubjectKey: () => currentSubjectKey,
    setSubjectKey: (nextKey) => {
      if (nextKey) currentSubjectKey = nextKey;
    },
    isLectureCompleted,
    setLectureCompleted,
    toggleLectureCompleted,
    getSubjectProgress,
    onChange,
    readStore,
  };
}

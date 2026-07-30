/**
 * Exam practice mode (الاختبار الذاتي) — DOM layer.
 *
 * Builds a shuffled practice exam from the MCQs of selected lectures,
 * reuses the renderer's MCQ cards + the existing delegated interactivity
 * (pickMCQ), persists every answer through quiz-stats.js, and offers a
 * mistakes-bank retry mode (بنك الأخطاء).
 *
 * Pure logic lives in exam-core.js; persistence in quiz-stats.js.
 * All app/renderer utilities are injected via createExamMode(deps) so this
 * module stays import-free of engine paths.
 */
import {
  buildQuestionPool,
  pickExamQuestions,
  filterPoolByQids,
  summarizeResults,
  numFromCardId,
  qidFor,
  parseQid,
  formatElapsed,
} from './exam-core.js';
import {
  trackExamModeOpened,
  trackExamStarted,
  trackExamFinished,
  trackContentLoadFailed,
} from './analytics.js';

const COUNT_OPTIONS = [
  { value: 10, label: '10 أسئلة' },
  { value: 20, label: '20 سؤالاً' },
  { value: 30, label: '30 سؤالاً' },
  { value: 0, label: 'كل الأسئلة' },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escAttr(s) {
  return esc(s).replace(/"/g, '&quot;');
}

/**
 * @param {object} deps
 * @param {() => Array} deps.getItems — appState.items
 * @param {(idx: number) => Promise<object>} deps.ensureLectureLoaded
 * @param {(item: object, idx: number) => string} deps.lectureStableId
 * @param {(item: object) => { mcq: number }} deps.itemStats
 * @param {() => number} deps.getCurrentLectureIndex
 * @param {(name: string) => void} deps.showView
 * @param {object} deps.quizStats — from createQuizStats
 * @param {(questions: Array, partId: string) => string} deps.renderMCQ
 * @param {(root: Element) => void} deps.initEquations
 * @param {(name: string, filled?: boolean, cls?: string) => string} deps.ms
 * @param {(title: string) => string} deps.shortLectureTitle
 * @param {() => void} [deps.onStatsChanged] — re-render home grid / entry card
 */
export function createExamMode(deps) {
  const {
    getItems,
    ensureLectureLoaded,
    lectureStableId,
    itemStats,
    getCurrentLectureIndex,
    showView,
    quizStats,
    renderMCQ,
    initEquations,
    ms,
    shortLectureTitle,
    onStatsChanged,
  } = deps;

  /** @type {Set<number>} lecture indexes chosen on the setup screen */
  let selectedIdxs = new Set();
  let selectedCount = 20;
  let session = null; // { mode, config, entries, byCardId, startedAt, timer, finished }
  let recorderBound = false;

  function root() {
    return document.getElementById('examRoot');
  }

  function notifyStatsChanged() {
    if (typeof onStatsChanged === 'function') onStatsChanged();
  }

  // ---------------------------------------------------------------------
  // Answer recording (works in BOTH lecture view and exam view).
  // initInteractivity's own delegated listener locks the card and marks it
  // answered-correct/answered-wrong; we read that final state in a
  // microtask so listener registration order never matters.
  // ---------------------------------------------------------------------
  function qidForCard(card) {
    if (card.dataset.examQid) return card.dataset.examQid;
    // In-lecture card: id = `${lectureId}-p${N}-q${num}`; the reliable
    // lectureId source is the currently open lecture, not the id prefix.
    const idx = getCurrentLectureIndex();
    const item = getItems()[idx];
    if (!item) return '';
    const num = numFromCardId(card.id);
    if (!num) return '';
    return qidFor(lectureStableId(item, idx), num);
  }

  function bindAnswerRecorder() {
    if (recorderBound) return;
    recorderBound = true;
    document.addEventListener('click', (e) => {
      const btn = e.target.closest?.('.mcq-opt');
      if (!btn) return;
      const card = btn.closest('.mcq-card');
      if (!card || card.dataset.qidRecorded === '1') return;
      queueMicrotask(() => {
        if (card.dataset.locked !== '1' || card.dataset.qidRecorded === '1') return;
        card.dataset.qidRecorded = '1';
        const isCorrect = card.classList.contains('answered-correct');
        const qid = qidForCard(card);
        if (qid) quizStats.recordAnswer(qid, isCorrect);
        if (session && !session.finished && card.dataset.examQid) {
          const entry = session.byCardId.get(card.id);
          if (entry) entry.correct = isCorrect;
          updateExamHud();
          maybeAutoFinish();
        }
      });
    });
  }

  // ---------------------------------------------------------------------
  // Routing
  // ---------------------------------------------------------------------
  /** @returns {boolean} true when the hash belongs to exam mode */
  function open(hash) {
    if (hash !== 'exam' && hash !== 'exam-mistakes') return false;
    bindAnswerRecorder();
    teardown();
    showView('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (hash === 'exam-mistakes') {
      trackExamModeOpened('mistakes');
      startMistakesExam();
    } else {
      trackExamModeOpened('exam');
      renderSetup();
    }
    return true;
  }

  /** Stop the timer when leaving the exam view (route change). */
  function teardown() {
    if (session?.timer) {
      clearInterval(session.timer);
      session.timer = null;
    }
  }

  // ---------------------------------------------------------------------
  // Setup screen
  // ---------------------------------------------------------------------
  function lecturesWithMcq() {
    return getItems()
      .map((item, idx) => ({ item, idx, mcq: itemStats(item).mcq }))
      .filter(l => l.mcq > 0);
  }

  function renderSetup() {
    const host = root();
    if (!host) return;
    session = null;

    const lectures = lecturesWithMcq();
    if (!lectures.length) {
      host.innerHTML = `
        <div class="py-2xl text-center text-on-surface-variant">
          <span class="material-symbols-outlined text-4xl text-primary mb-md">quiz</span>
          <p class="font-body-lg">لا توجد أسئلة اختيار من متعدد في هذه المادة بعد.</p>
        </div>`;
      return;
    }

    if (!selectedIdxs.size) selectedIdxs = new Set(lectures.map(l => l.idx));
    const wrongCount = quizStats.getWrongQids().length;

    host.innerHTML = `
      <section class="text-center mb-xl">
        <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary dark:text-inverse-primary mb-sm">الاختبار الذاتي</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">أسئلة عشوائية من المحاضرات التي تختارها — النتيجة تُحفظ على هذا الجهاز.</p>
      </section>

      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg custom-shadow mb-lg">
        <div class="flex items-center justify-between flex-wrap gap-md mb-md">
          <h2 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-sm">
            ${ms('menu_book', false, 'text-primary')} اختر المحاضرات
          </h2>
          <div class="flex gap-sm">
            <button type="button" id="examSelectAll" class="font-label-md text-primary hover:underline">تحديد الكل</button>
            <span class="text-outline-variant">|</span>
            <button type="button" id="examSelectNone" class="font-label-md text-on-surface-variant hover:underline">إلغاء الكل</button>
          </div>
        </div>
        <div class="flex flex-wrap gap-sm" id="examLectureChips">
          ${lectures.map(l => `
            <button type="button" class="exam-chip" data-exam-lecture="${l.idx}" aria-pressed="${selectedIdxs.has(l.idx) ? 'true' : 'false'}">
              ${esc(shortLectureTitle(l.item.lec.title))}
              <span class="exam-chip__count">${l.mcq}</span>
            </button>`).join('')}
        </div>
      </div>

      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg custom-shadow mb-lg">
        <h2 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-sm mb-md">
          ${ms('tag', false, 'text-primary')} عدد الأسئلة
        </h2>
        <div class="flex flex-wrap gap-sm" id="examCountChips">
          ${COUNT_OPTIONS.map(o => `
            <button type="button" class="exam-chip" data-exam-count="${o.value}" aria-pressed="${selectedCount === o.value ? 'true' : 'false'}">${o.label}</button>`).join('')}
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-md items-stretch sm:items-center">
        <button type="button" id="examStartBtn" class="flex-1 bg-primary text-on-primary py-md px-lg rounded-lg font-bold font-label-md hover:opacity-90 transition-all flex items-center justify-center gap-sm">
          ${ms('play_arrow', true)} ابدأ الاختبار
        </button>
        ${wrongCount ? `
        <button type="button" id="examMistakesBtn" class="flex-1 bg-error-container text-on-error-container py-md px-lg rounded-lg font-bold font-label-md hover:opacity-90 transition-all flex items-center justify-center gap-sm">
          ${ms('sync_problem', false)} بنك الأخطاء (${wrongCount})
        </button>` : ''}
      </div>`;

    host.querySelectorAll('[data-exam-lecture]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.examLecture);
        if (selectedIdxs.has(idx)) selectedIdxs.delete(idx);
        else selectedIdxs.add(idx);
        btn.setAttribute('aria-pressed', selectedIdxs.has(idx) ? 'true' : 'false');
      });
    });
    host.querySelector('#examSelectAll')?.addEventListener('click', () => {
      selectedIdxs = new Set(lectures.map(l => l.idx));
      host.querySelectorAll('[data-exam-lecture]').forEach(b => b.setAttribute('aria-pressed', 'true'));
    });
    host.querySelector('#examSelectNone')?.addEventListener('click', () => {
      selectedIdxs.clear();
      host.querySelectorAll('[data-exam-lecture]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    });
    host.querySelectorAll('[data-exam-count]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCount = Number(btn.dataset.examCount);
        host.querySelectorAll('[data-exam-count]').forEach(b =>
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      });
    });
    host.querySelector('#examStartBtn')?.addEventListener('click', () => {
      if (!selectedIdxs.size) {
        alertNoSelection(host);
        return;
      }
      startExam({ idxs: [...selectedIdxs], count: selectedCount, mode: 'exam' });
    });
    host.querySelector('#examMistakesBtn')?.addEventListener('click', () => {
      location.hash = 'exam-mistakes';
    });
  }

  function alertNoSelection(host) {
    const btn = host.querySelector('#examStartBtn');
    if (!btn) return;
    btn.animate([
      { transform: 'translateX(0)' }, { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' }, { transform: 'translateX(0)' },
    ], { duration: 200, iterations: 2 });
  }

  // ---------------------------------------------------------------------
  // Running an exam
  // ---------------------------------------------------------------------
  function showLoading(label) {
    const host = root();
    if (!host) return;
    host.innerHTML = `
      <div class="py-2xl text-center text-on-surface-variant" role="status" aria-live="polite">
        <span class="material-symbols-outlined text-4xl text-primary mb-md animate-pulse">hourglass_top</span>
        <p class="font-label-md">${esc(label)}</p>
      </div>`;
  }

  function showError(message, retry) {
    const host = root();
    if (!host) return;
    host.innerHTML = `
      <div class="py-2xl text-center text-error">
        <p class="mb-md">⚠️ ${esc(message)}</p>
        <button type="button" id="examRetryBtn" class="text-primary font-bold">إعادة المحاولة</button>
      </div>`;
    host.querySelector('#examRetryBtn')?.addEventListener('click', retry);
  }

  async function loadPool(idxs) {
    const items = getItems();
    const loaded = await Promise.all(idxs.map(idx => ensureLectureLoaded(idx)));
    return buildQuestionPool(loaded.map((item, i) => {
      const idx = idxs[i];
      const mcqParts = (item.lec.parts || []).filter(p => p.type === 'mcq');
      return {
        lectureId: lectureStableId(items[idx], idx),
        lectureTitle: shortLectureTitle(item.lec.title),
        questions: mcqParts.flatMap(p => p.questions || []),
      };
    }));
  }

  async function startExam(config) {
    showLoading('جارٍ تجهيز الأسئلة…');
    let pool;
    try {
      pool = await loadPool(config.idxs);
    } catch (err) {
      trackContentLoadFailed({
        failureKind: 'exam_pool',
        contentType: 'exam',
        message: err?.message || 'exam pool failed',
      });
      showError(err.message || 'تعذّر تحميل المحاضرات', () => startExam(config));
      return;
    }

    let picked;
    if (config.mode === 'mistakes') {
      picked = pickExamQuestions(filterPoolByQids(pool, config.qids));
      if (!picked.length) {
        renderNoMistakes();
        return;
      }
    } else {
      picked = pickExamQuestions(pool, { count: config.count });
    }
    if (!picked.length) {
      showError('لا توجد أسئلة صالحة في المحاضرات المختارة', renderSetup);
      return;
    }
    runExam(config, picked);
  }

  async function startMistakesExam() {
    const wrongQids = quizStats.getWrongQids();
    if (!wrongQids.length) {
      renderNoMistakes();
      return;
    }
    // Only lectures still present in the manifest can supply questions.
    const items = getItems();
    const idsToIdx = new Map(items.map((item, idx) => [lectureStableId(item, idx), idx]));
    const idxs = [...new Set(
      wrongQids
        .map(qid => idsToIdx.get(parseQid(qid)?.lectureId))
        .filter(idx => idx !== undefined),
    )];
    if (!idxs.length) {
      renderNoMistakes();
      return;
    }
    startExam({ idxs, qids: wrongQids, mode: 'mistakes' });
  }

  function renderNoMistakes() {
    const host = root();
    if (!host) return;
    host.innerHTML = `
      <div class="py-2xl text-center">
        <span class="material-symbols-outlined text-5xl text-primary mb-md">celebration</span>
        <h2 class="font-headline-md text-headline-md text-on-surface mb-sm">بنك الأخطاء فارغ 🎉</h2>
        <p class="font-body-md text-on-surface-variant mb-lg">لا توجد أسئلة أجبت عنها خطأً في آخر محاولة.</p>
        <button type="button" id="examBackToSetup" class="bg-primary text-on-primary py-md px-xl rounded-lg font-bold font-label-md">ابدأ اختباراً جديداً</button>
      </div>`;
    host.querySelector('#examBackToSetup')?.addEventListener('click', () => {
      location.hash = 'exam';
      renderSetup();
    });
  }

  function runExam(config, picked) {
    const host = root();
    if (!host) return;
    teardown(); // a replaced session must not leave its timer interval running

    // Renumber 1..N for display; map rendered card ids back to pool entries.
    const displayQuestions = picked.map((entry, i) => ({ ...entry.q, num: String(i + 1) }));
    session = {
      mode: config.mode,
      config,
      entries: picked.map((entry, i) => ({
        qid: entry.qid,
        lectureId: entry.lectureId,
        lectureTitle: entry.lectureTitle,
        correct: null,
        cardId: `exam-q${i + 1}`,
      })),
      byCardId: new Map(),
      startedAt: Date.now(),
      timer: null,
      finished: false,
    };
    session.entries.forEach(e => session.byCardId.set(e.cardId, e));

    trackExamStarted({
      mode: config.mode,
      questionCount: session.entries.length,
      lectureCount: new Set(session.entries.map((e) => e.lectureId)).size,
    });

    host.innerHTML = `
      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg custom-shadow mb-lg flex items-center justify-between flex-wrap gap-md">
        <div class="flex items-center gap-md">
          ${ms(config.mode === 'mistakes' ? 'sync_problem' : 'quiz', true, 'text-primary text-3xl')}
          <div>
            <h1 class="font-headline-sm text-headline-sm text-on-surface">${config.mode === 'mistakes' ? 'مراجعة بنك الأخطاء' : 'اختبار ذاتي'}</h1>
            <p class="font-label-md text-on-surface-variant"><span id="examAnswered">0</span> / ${session.entries.length} سؤال مُجاب — الوقت: <span id="examTimer" dir="ltr">0:00</span></p>
          </div>
        </div>
        <button type="button" id="examFinishBtn" class="bg-primary text-on-primary py-md px-lg rounded-lg font-bold font-label-md hover:opacity-90 transition-all">إنهاء الاختبار</button>
      </div>
      <div class="section-block is-visible" data-part-type="mcq" id="examQuestions">
        ${renderMCQ(displayQuestions, 'exam')}
      </div>`;

    // renderMCQ cards are .box-animate (hidden until reveal); no scroll
    // observer runs in this view, so reveal everything immediately.
    host.querySelectorAll('.box-animate').forEach(el => el.classList.add('is-visible'));

    // Tag each card with its stable qid + source-lecture badge.
    session.entries.forEach((entry) => {
      const card = host.querySelector(`#${CSS.escape(entry.cardId)}`);
      if (!card) return;
      card.dataset.examQid = entry.qid;
      const head = card.querySelector(':scope > div');
      head?.insertAdjacentHTML('beforeend',
        `<span class="font-label-md px-sm py-xs rounded-full bg-surface-container-high text-on-surface-variant mr-auto">${esc(entry.lectureTitle)}</span>`);
    });

    initEquations(host);

    session.timer = setInterval(() => {
      const el = document.getElementById('examTimer');
      if (!el) return;
      el.textContent = formatElapsed((Date.now() - session.startedAt) / 1000);
    }, 1000);

    host.querySelector('#examFinishBtn')?.addEventListener('click', finishExam);
  }

  function updateExamHud() {
    if (!session) return;
    const el = document.getElementById('examAnswered');
    if (el) el.textContent = String(session.entries.filter(e => e.correct !== null).length);
  }

  function maybeAutoFinish() {
    if (!session || session.finished) return;
    if (session.entries.every(e => e.correct !== null)) {
      // Give the student a beat to read the last card's feedback.
      setTimeout(finishExam, 1200);
    }
  }

  // ---------------------------------------------------------------------
  // Results
  // ---------------------------------------------------------------------
  function finishExam() {
    if (!session || session.finished) return;
    session.finished = true;
    if (session.timer) {
      clearInterval(session.timer);
      session.timer = null;
    }

    const elapsed = formatElapsed((Date.now() - session.startedAt) / 1000);
    const results = summarizeResults(session.entries);
    quizStats.recordExam({ total: results.total, correct: results.correctCount, mode: session.mode });
    notifyStatsChanged();

    trackExamFinished({
      mode: session.mode,
      total: results.total,
      correctCount: results.correctCount,
      wrongCount: results.wrongCount,
      unansweredCount: results.unansweredCount,
      percent: results.percent,
      elapsedSeconds: Math.round((Date.now() - session.startedAt) / 1000),
    });

    const wrongCount = quizStats.getWrongQids().length;
    const host = root();
    if (!host) return;

    const grade = results.percent >= 85 ? 'ممتاز 🏆'
      : results.percent >= 70 ? 'جيد جداً 👏'
      : results.percent >= 50 ? 'جيد — واصل المراجعة 📖'
      : 'يحتاج مراجعة — لا تستسلم 💪';

    host.innerHTML = `
      <section class="text-center mb-xl">
        <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary dark:text-inverse-primary mb-sm">النتيجة</h1>
        <p class="font-headline-md text-headline-md text-on-surface mb-xs">${results.correctCount} / ${results.total} — <strong>${results.percent}%</strong></p>
        <p class="font-body-lg text-on-surface-variant">${grade}</p>
      </section>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
        <div class="exam-stat"><span class="exam-stat__num text-primary">${results.correctCount}</span><span class="exam-stat__label">صحيحة</span></div>
        <div class="exam-stat"><span class="exam-stat__num text-error">${results.wrongCount}</span><span class="exam-stat__label">خاطئة</span></div>
        <div class="exam-stat"><span class="exam-stat__num text-on-surface-variant">${results.unansweredCount}</span><span class="exam-stat__label">بلا إجابة</span></div>
        <div class="exam-stat"><span class="exam-stat__num text-secondary" dir="ltr">${esc(elapsed)}</span><span class="exam-stat__label">الوقت</span></div>
      </div>

      ${results.perLecture.length > 1 ? `
      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg custom-shadow mb-xl">
        <h2 class="font-headline-sm text-headline-sm text-on-surface mb-md flex items-center gap-sm">${ms('insights', false, 'text-primary')} حسب المحاضرة</h2>
        <div class="space-y-md">
          ${results.perLecture.map(l => {
            const pct = l.total ? Math.round((l.correct / l.total) * 100) : 0;
            return `
            <div>
              <div class="flex justify-between font-label-md text-on-surface-variant mb-xs">
                <span>${esc(l.title)}</span><span>${l.correct} / ${l.total}</span>
              </div>
              <div class="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div class="h-full ${pct >= 50 ? 'bg-primary' : 'bg-error'} rounded-full" style="width:${pct}%"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}

      <div class="flex flex-col sm:flex-row gap-md">
        <button type="button" id="examAgainBtn" class="flex-1 bg-primary text-on-primary py-md px-lg rounded-lg font-bold font-label-md hover:opacity-90 transition-all">${ms('replay', false)} إعادة الاختبار</button>
        ${wrongCount ? `<button type="button" id="examMistakesBtn2" class="flex-1 bg-error-container text-on-error-container py-md px-lg rounded-lg font-bold font-label-md hover:opacity-90 transition-all">${ms('sync_problem', false)} بنك الأخطاء (${wrongCount})</button>` : ''}
        <button type="button" id="examNewBtn" class="flex-1 bg-surface-container-high text-on-surface py-md px-lg rounded-lg font-bold font-label-md hover:opacity-90 transition-all">اختبار جديد</button>
        <button type="button" id="examHomeBtn" class="flex-1 bg-surface-container-high text-on-surface py-md px-lg rounded-lg font-bold font-label-md hover:opacity-90 transition-all">الرئيسية</button>
      </div>`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const cfg = session.config;
    host.querySelector('#examAgainBtn')?.addEventListener('click', () => startExam(cfg));
    host.querySelector('#examMistakesBtn2')?.addEventListener('click', () => { location.hash = 'exam-mistakes'; startMistakesExam(); });
    host.querySelector('#examNewBtn')?.addEventListener('click', () => { location.hash = 'exam'; renderSetup(); });
    host.querySelector('#examHomeBtn')?.addEventListener('click', () => { location.hash = 'home'; });
  }

  // ---------------------------------------------------------------------
  // Home-page entry card
  // ---------------------------------------------------------------------
  function renderHomeEntry() {
    const section = document.getElementById('examEntry');
    if (!section) return;

    const lectures = lecturesWithMcq();
    const totalMcq = lectures.reduce((n, l) => n + l.mcq, 0);
    if (!totalMcq) {
      section.classList.add('hidden');
      section.innerHTML = '';
      return;
    }

    const last = quizStats.getLastExam();
    const wrongCount = quizStats.getWrongQids().length;
    const lastPct = last?.total ? Math.round((last.correct / last.total) * 100) : null;

    section.classList.remove('hidden');
    section.innerHTML = `
      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg custom-shadow flex flex-col md:flex-row md:items-center gap-lg">
        <div class="picker-icon-wrap w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 mx-auto md:mx-0">
          ${ms('quiz', true, 'text-3xl')}
        </div>
        <div class="flex-1 text-center md:text-right">
          <h2 class="font-headline-sm text-headline-sm text-on-surface mb-xs">الاختبار الذاتي</h2>
          <p class="font-label-md text-on-surface-variant mb-sm">${totalMcq} سؤال اختيار من متعدد في ${lectures.length} محاضرة — اختبر نفسك قبل الامتحان.</p>
          <div class="flex flex-wrap justify-center md:justify-start gap-sm">
            ${lastPct !== null ? `<span class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface-variant">${ms('history', false, 'text-sm text-secondary')} آخر نتيجة: ${lastPct}%</span>` : ''}
            ${wrongCount ? `<span class="inline-flex items-center gap-xs px-sm py-xs bg-error-container text-on-error-container rounded-full font-label-md text-label-md">${ms('sync_problem', false, 'text-sm')} بنك الأخطاء: ${wrongCount}</span>` : ''}
          </div>
        </div>
        <div class="flex flex-col gap-sm shrink-0">
          <button type="button" id="examEntryStart" class="bg-primary text-on-primary py-md px-xl rounded-lg font-bold font-label-md hover:opacity-90 transition-all">ابدأ اختباراً</button>
          ${wrongCount ? `<button type="button" id="examEntryMistakes" class="bg-error-container text-on-error-container py-sm px-xl rounded-lg font-bold font-label-md hover:opacity-90 transition-all">مراجعة الأخطاء</button>` : ''}
        </div>
      </div>`;

    section.querySelector('#examEntryStart')?.addEventListener('click', () => { location.hash = 'exam'; });
    section.querySelector('#examEntryMistakes')?.addEventListener('click', () => { location.hash = 'exam-mistakes'; });
  }

  return { open, teardown, renderHomeEntry };
}

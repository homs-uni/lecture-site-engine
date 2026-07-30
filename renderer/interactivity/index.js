import { ms } from '../core/icons.js';

let interactivityBound = false;

function escTip(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showMcqResetBtn(card) {
  const btn = card.querySelector('[data-mcq-reset]');
  if (btn) btn.classList.remove('hidden');
}

function hideMcqResetBtn(card) {
  const btn = card.querySelector('[data-mcq-reset]');
  if (btn) btn.classList.add('hidden');
}

/**
 * Apply a picked option onto a card (lock + feedback + explain).
 * Used both for live clicks and for restoring a saved answer.
 *
 * @param {HTMLElement} card
 * @param {string} pickedKey
 * @param {{ animate?: boolean, dispatchEvent?: boolean }} [opts]
 * @returns {boolean}
 */
export function applyMcqPick(card, pickedKey, opts = {}) {
  if (!card || card.dataset.locked || !pickedKey) return false;
  const btn = card.querySelector(`.mcq-opt[data-key="${CSS.escape(pickedKey)}"]`);
  if (!btn) return false;

  const animate = opts.animate !== false;
  const shouldDispatch = opts.dispatchEvent !== false;

  const correct = btn.dataset.correct;
  const optsEls = card.querySelectorAll('.mcq-opt');
  const feedback = card.querySelector('.mcq-feedback');
  const explain = card.querySelector('.mcq-explain');

  optsEls.forEach(o => {
    o.disabled = true;
    o.classList.add('opacity-50', 'pointer-events-none');
  });

  const isOk = pickedKey === correct;

  if (isOk) {
    btn.classList.remove('opacity-50', 'border-outline-variant');
    btn.classList.add('bg-primary', 'text-on-primary', 'border-primary', 'opacity-100');
    if (animate) {
      btn.animate([
        { transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' },
      ], { duration: 300 });
    }
    if (feedback) {
      feedback.textContent = '✅ إجابة صحيحة — أحسنت!';
      feedback.className = 'mcq-feedback mt-md font-label-md font-bold text-primary';
    }
    card.classList.add('answered-correct');
  } else {
    btn.classList.remove('opacity-50', 'border-outline-variant');
    btn.classList.add('bg-error', 'text-on-primary', 'border-error', 'opacity-100');
    if (animate) {
      btn.animate([
        { transform: 'translateX(0)' }, { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' }, { transform: 'translateX(0)' },
      ], { duration: 200, iterations: 2 });
    }
    optsEls.forEach(o => {
      if (o.dataset.key === correct) {
        o.classList.remove('opacity-50');
        o.classList.add('bg-primary', 'text-on-primary', 'border-primary', 'opacity-100');
      }
    });
    if (feedback) {
      feedback.textContent = '❌ إجابة خاطئة — الإجابة: ' + String(correct || '').toUpperCase();
      feedback.className = 'mcq-feedback mt-md font-label-md font-bold text-error';
    }
    card.classList.add('answered-wrong');
  }

  if (explain) explain.classList.remove('hidden');
  card.dataset.locked = '1';
  card.dataset.picked = pickedKey;
  showMcqResetBtn(card);
  updateMCQProgress(card.closest('.section-block'));

  if (shouldDispatch) {
    try {
      const inExam = !!card.closest('#examRoot') || !!card.dataset.examQid;
      window.dispatchEvent(new CustomEvent('study:mcq-answered', {
        detail: {
          isCorrect: isOk,
          pickedKey,
          cardId: card.id || '',
          qid: card.dataset.examQid || card.dataset.qid || card.id || '',
          source: inExam ? 'exam' : 'lecture',
        },
      }));
    } catch {
      /* ignore analytics bridge errors */
    }
  }

  return true;
}

export function pickMCQ(btn) {
  const card = btn.closest('.mcq-card');
  if (!card || card.dataset.locked) return;
  applyMcqPick(card, btn.dataset.key, { animate: true, dispatchEvent: true });
}

/** Unlock a card and clear visual answer state (does not touch storage). */
export function resetMcqCard(card, { dispatchEvent = true } = {}) {
  if (!card) return;
  const opts = card.querySelectorAll('.mcq-opt');
  const feedback = card.querySelector('.mcq-feedback');
  const explain = card.querySelector('.mcq-explain');

  opts.forEach(o => {
    o.disabled = false;
    o.classList.remove(
      'opacity-50', 'pointer-events-none',
      'bg-primary', 'bg-error', 'text-on-primary', 'border-primary', 'border-error', 'opacity-100',
    );
    o.classList.add('border-outline-variant');
  });

  card.classList.remove('answered-correct', 'answered-wrong');
  delete card.dataset.locked;
  delete card.dataset.picked;
  delete card.dataset.qidRecorded;
  if (feedback) {
    feedback.textContent = '';
    feedback.className = 'mcq-feedback mt-md font-label-md font-bold min-h-[1.4em]';
  }
  if (explain) explain.classList.add('hidden');
  hideMcqResetBtn(card);
  updateMCQProgress(card.closest('.section-block'));

  if (!dispatchEvent) return;
  try {
    window.dispatchEvent(new CustomEvent('study:mcq-reset', {
      detail: {
        cardId: card.id || '',
        qid: card.dataset.examQid || card.dataset.qid || card.id || '',
      },
    }));
  } catch {
    /* ignore */
  }
}

/** Reset every answered card in an MCQ section (progress bar “reset all”). */
export function resetAllMcqInSection(section) {
  if (!section) return [];
  const cards = [...section.querySelectorAll('.mcq-card[data-locked="1"]')];
  const ids = cards.map(c => c.id).filter(Boolean);
  cards.forEach(card => resetMcqCard(card, { dispatchEvent: false }));
  updateMCQProgress(section);
  try {
    window.dispatchEvent(new CustomEvent('study:mcq-reset-all', {
      detail: { cardIds: ids },
    }));
  } catch {
    /* ignore */
  }
  return ids;
}

export function updateMCQProgress(section) {
  if (!section) return;
  const cards = [...section.querySelectorAll('.mcq-card')];
  const progress = section.querySelector('.mcq-progress');
  if (!progress) return;

  let correctCount = 0;
  let wrongCount = 0;
  const states = cards.map(card => {
    if (card.dataset.locked !== '1') return 'pending';
    if (card.classList.contains('answered-correct')) {
      correctCount += 1;
      return 'correct';
    }
    wrongCount += 1;
    return 'wrong';
  });
  const answeredCount = correctCount + wrongCount;

  const answeredEl = progress.querySelector('.mcq-answered-count');
  const scoreEl = progress.querySelector('.mcq-score');
  const wrongEl = progress.querySelector('.mcq-wrong-count');
  const resetAllBtn = progress.querySelector('[data-mcq-reset-all]');
  if (answeredEl) answeredEl.textContent = String(answeredCount);
  if (scoreEl) scoreEl.textContent = String(correctCount);
  if (wrongEl) wrongEl.textContent = String(wrongCount);
  if (resetAllBtn) resetAllBtn.classList.toggle('hidden', answeredCount === 0);

  const track = progress.querySelector('.mcq-progress-track');
  if (!track) return;

  // Rebuild segments only when the question count changes; otherwise just
  // flip classes so the bar updates without thrashing the DOM.
  if (track.childElementCount !== states.length) {
    track.replaceChildren(...states.map(state => {
      const seg = document.createElement('span');
      seg.className = `mcq-progress-seg mcq-progress-seg--${state}`;
      return seg;
    }));
  } else {
    [...track.children].forEach((seg, i) => {
      seg.className = `mcq-progress-seg mcq-progress-seg--${states[i]}`;
    });
  }

  progress.setAttribute(
    'aria-label',
    `تقدّم الإجابة: ${answeredCount} من ${cards.length} — صحيح ${correctCount}، خطأ ${wrongCount}`,
  );
}

function positionLineExplainTip(tip, anchor) {
  const rect = anchor.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();
  let top = rect.top + window.scrollY - tipRect.height - 10;
  let left = rect.left + window.scrollX + rect.width / 2 - tipRect.width / 2;

  if (top < window.scrollY + 8) top = rect.bottom + window.scrollY + 10;
  if (left < 8) left = 8;
  if (left + tipRect.width > window.innerWidth - 8) {
    left = window.innerWidth - tipRect.width - 8;
  }

  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;
}

/**
 * Bind delegated event handlers for MCQ, qa-card, copy-code, line-explain toggle.
 * Idempotent — safe to call once at app init.
 *
 * @param {Document|Element} [root]
 */
export function initInteractivity(root = document) {
  if (interactivityBound) return;
  interactivityBound = true;

  if (typeof window !== 'undefined') {
    window.pickMCQ = pickMCQ;
  }

  root.addEventListener('click', e => {
    const resetAllBtn = e.target.closest('[data-mcq-reset-all]');
    if (resetAllBtn) {
      const section = resetAllBtn.closest('.section-block');
      if (!section) return;
      const answered = section.querySelectorAll('.mcq-card[data-locked="1"]').length;
      if (!answered) return;
      const ok = window.confirm('إعادة تعيين كل تقدّم الإجابات في هذه الدورات؟ سيتم مسح الإجابات المحفوظة.');
      if (!ok) return;
      resetAllMcqInSection(section);
      return;
    }

    const resetBtn = e.target.closest('[data-mcq-reset]');
    if (resetBtn) {
      const card = resetBtn.closest('.mcq-card');
      if (card) resetMcqCard(card);
      return;
    }

    const mcqBtn = e.target.closest('.mcq-opt');
    if (mcqBtn) {
      pickMCQ(mcqBtn);
      return;
    }

    const copyBtn = e.target.closest('.copy-code-btn');
    if (copyBtn) {
      const terminal = copyBtn.closest('.code-terminal');
      const code = terminal?.querySelector('pre code');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          copyBtn.innerHTML = `${ms('check', false, 'text-sm')} تم النسخ`;
          setTimeout(() => { copyBtn.innerHTML = `${ms('content_copy', false, 'text-sm')} نسخ`; }, 2000);
        }).catch(() => {});
      }
      return;
    }

    const explainBtn = e.target.closest('.line-explain-toggle');
    if (explainBtn) {
      const terminal = explainBtn.closest('.code-terminal');
      if (!terminal) return;
      const active = terminal.classList.toggle('code-terminal--explain-mode');
      explainBtn.setAttribute('aria-pressed', String(active));
      explainBtn.classList.toggle('line-explain-toggle--active', active);
      const tip = document.getElementById('lineExplainTip');
      if (tip && !active) tip.classList.add('hidden');
      return;
    }

    const qaBtn = e.target.closest('.qa-card__toggle');
    if (qaBtn) {
      const card = qaBtn.closest('.qa-card');
      const answer = card?.querySelector('.qa-card__answer');
      if (!answer) return;
      const isHidden = answer.classList.toggle('hidden');
      answer.hidden = isHidden;
      qaBtn.setAttribute('aria-expanded', String(!isHidden));
      card.classList.toggle('qa-card--open', !isHidden);
    }
  });

  let tip = document.getElementById('lineExplainTip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'lineExplainTip';
    tip.className = 'line-explain-tip hidden';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
  }

  root.addEventListener('mouseover', e => {
    const ln = e.target.closest('.code-terminal--explain-mode .code-terminal__ln--explainable');
    if (!ln) return;

    const role = ln.dataset.role || '';
    const why = ln.dataset.why || '';
    if (!role && !why) return;

    tip.innerHTML = role
      ? `<p class="line-explain-tip__role">${escTip(role)}</p>${why ? `<p class="line-explain-tip__why">${escTip(why)}</p>` : ''}`
      : `<p class="line-explain-tip__role">${escTip(why)}</p>`;
    tip.classList.remove('hidden');
    positionLineExplainTip(tip, ln);
  });

  root.addEventListener('mouseout', e => {
    const from = e.target.closest('.code-terminal__ln--explainable');
    const to = e.relatedTarget?.closest?.('.code-terminal__ln--explainable');
    if (from && from !== to) tip.classList.add('hidden');
  });

  root.addEventListener('focusin', e => {
    const ln = e.target.closest('.code-terminal--explain-mode .code-terminal__ln--explainable');
    if (!ln) return;
    ln.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  });

  root.addEventListener('focusout', e => {
    if (e.target.closest('.code-terminal__ln--explainable')) tip.classList.add('hidden');
  });
}

/** Reset binding state (for tests). */
export function resetInteractivity() {
  interactivityBound = false;
}

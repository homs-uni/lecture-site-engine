(function () {
  'use strict';

  const WORKER_URL = 'https://n8n-production-b7424.up.railway.app/webhook/chat';

  var conversationHistory = [];
  var lectureTextCache    = null;
  var currentLectureId    = null;
  var lastUrl             = location.href;
  var widgetMounted       = false;
  var syncPaused          = false;   // prevents observer re-entry during DOM mutations

  /* ─── helpers ─── */
  function getLectureId() {
    return window.location.pathname + window.location.search + window.location.hash;
  }

  function isLecturePage() {
    return /^#par\d+/.test(window.location.hash);
  }

  /* ─── read a CSS variable from the site, with fallback ─── */
  function cssVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  }

  /* ─── derive a darker shade by blending with black (~20%) ─── */
  function darken(hex) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    r = Math.round(r * 0.78); g = Math.round(g * 0.78); b = Math.round(b * 0.78);
    return '#' + [r,g,b].map(function(v){ return ('0'+v.toString(16)).slice(-2); }).join('');
  }

  /* ─── derive a very light tint (~8% opacity on white) ─── */
  function lighten(hex) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    r = Math.round(r * 0.12 + 255 * 0.88);
    g = Math.round(g * 0.12 + 255 * 0.88);
    b = Math.round(b * 0.12 + 255 * 0.88);
    return '#' + [r,g,b].map(function(v){ return ('0'+v.toString(16)).slice(-2); }).join('');
  }

  /* ─── styles ─── */
  function injectStyles() {
    if (document.getElementById('ai-chat-styles')) return;

    // Pull colours from the host site's CSS variables
    var accent  = cssVar('--color-primary',   '#4f46e5');
    var surface = cssVar('--color-surface',   '#ffffff');
    var border  = cssVar('--color-border',    '#e2e8f0');
    var font    = cssVar('--font-sans', 'system-ui,-apple-system,sans-serif');
    var accentDk = darken(accent);
    var accentLt = lighten(accent);
    var bg      = cssVar('--color-background', '#f7f8fb');

    const s = document.createElement('style');
    s.id = 'ai-chat-styles';
    s.textContent = `
      :root {
        --aw-accent:    ${accent};
        --aw-accent-dk: ${accentDk};
        --aw-accent-lt: ${accentLt};
        --aw-surface:   ${surface};
        --aw-bg:        ${bg};
        --aw-border:    ${border};
        --aw-text:      #1c1e2b;
        --aw-muted:     #8b90a8;
        --aw-radius:    14px;
        --aw-font:      ${font};
        --aw-shadow:    0 8px 32px rgba(0,0,0,.12), 0 1.5px 5px rgba(0,0,0,.07);
      }

      /* ── FAB button ── */
      #ai-chat-btn {
        position: fixed;
        bottom: 26px;
        right: 26px;
        z-index: 9999;
        background: var(--aw-accent);
        color: #fff;
        border: none;
        border-radius: 50px;
        padding: 11px 20px 11px 16px;
        font-size: 13.5px;
        font-family: var(--aw-font);
        font-weight: 600;
        letter-spacing: .01em;
        cursor: pointer;
        box-shadow: 0 4px 18px rgba(0,0,0,.22);
        display: flex;
        align-items: center;
        gap: 7px;
        transition: transform .15s, box-shadow .15s, background .15s;
        touch-action: none;
        user-select: none;
      }
      #ai-chat-btn:hover {
        background: var(--aw-accent-dk);
        transform: translateY(-2px);
        box-shadow: 0 7px 24px rgba(0,0,0,.28);
      }
      #ai-chat-btn:active { transform: translateY(0); }
      #ai-chat-btn .btn-icon {
        font-size: 16px;
        line-height: 1;
        display: flex;
        align-items: center;
      }

      /* ── chat box ── */
      #ai-chat-box {
        position: fixed;
        bottom: 84px;
        right: 26px;
        z-index: 9998;
        width: 370px;
        height: 510px;
        min-width: 270px;
        min-height: 300px;
        max-width: 92vw;
        max-height: 82vh;
        background: var(--aw-surface);
        border-radius: var(--aw-radius);
        box-shadow: var(--aw-shadow);
        border: 1px solid var(--aw-border);
        display: none;
        flex-direction: column;
        font-family: var(--aw-font);
        overflow: hidden;
        opacity: 0;
        transform: scale(.96) translateY(10px);
        transform-origin: bottom right;
        transition: opacity .2s cubic-bezier(.4,0,.2,1), transform .2s cubic-bezier(.4,0,.2,1);
      }
      #ai-chat-box.open {
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      /* ── resize handle ── */
      #ai-resize-handle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 24px;
        height: 24px;
        cursor: se-resize;
        z-index: 10;
      }
      #ai-resize-handle::after {
        content: '';
        position: absolute;
        bottom: 6px;
        right: 6px;
        width: 8px;
        height: 8px;
        border-right: 2px solid var(--aw-border);
        border-bottom: 2px solid var(--aw-border);
        border-radius: 1px;
      }

      /* ── header ── */
      #ai-chat-header {
        background: var(--aw-accent);
        color: #fff;
        padding: 12px 14px;
        cursor: grab;
        user-select: none;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      #ai-chat-header:active { cursor: grabbing; }
      .ai-header-left {
        display: flex;
        align-items: center;
        gap: 9px;
      }
      .ai-header-avatar {
        width: 30px;
        height: 30px;
        background: rgba(255,255,255,.18);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        flex-shrink: 0;
      }
      .ai-header-title {
        font-size: 13.5px;
        font-weight: 700;
        letter-spacing: .01em;
        line-height: 1.2;
      }
      .ai-header-sub {
        font-size: 10.5px;
        opacity: .75;
        font-weight: 400;
        letter-spacing: .01em;
        margin-top: 1px;
      }
      #ai-header-actions { display: flex; gap: 2px; }
      .ai-hbtn {
        background: none;
        border: none;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        padding: 4px 7px;
        border-radius: 6px;
        opacity: .7;
        transition: opacity .15s, background .15s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ai-hbtn:hover { opacity: 1; background: rgba(255,255,255,.18); }

      /* ── messages ── */
      #ai-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-height: 0;
        scroll-behavior: smooth;
        background: var(--aw-bg);
      }
      #ai-chat-messages::-webkit-scrollbar { width: 4px; }
      #ai-chat-messages::-webkit-scrollbar-track { background: transparent; }
      #ai-chat-messages::-webkit-scrollbar-thumb { background: var(--aw-border); border-radius: 4px; }

      /* ── bubbles ── */
      .user-msg {
        max-width: 80%;
        padding: 9px 13px;
        border-radius: 16px 16px 4px 16px;
        background: var(--aw-accent);
        color: #fff;
        align-self: flex-end;
        font-size: 13px;
        line-height: 1.55;
        word-break: break-word;
        box-shadow: 0 2px 8px rgba(91,94,244,.18);
      }
      .ai-msg {
        max-width: 88%;
        padding: 10px 13px;
        border-radius: 16px 16px 16px 4px;
        background: var(--aw-surface);
        color: var(--aw-text);
        align-self: flex-start;
        font-size: 13px;
        line-height: 1.72;
        word-break: break-word;
        border: 1px solid var(--aw-border);
        box-shadow: 0 1px 4px rgba(0,0,0,.05);
      }

      /* ── thinking dots ── */
      .ai-msg.thinking { background: var(--aw-surface); padding: 12px 14px; }
      .ai-dots { display: inline-flex; gap: 5px; padding: 2px 0; }
      .ai-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--aw-muted);
        display: inline-block;
        animation: ai-bounce 1.1s ease infinite;
      }
      .ai-dots span:nth-child(2) { animation-delay: .15s; }
      .ai-dots span:nth-child(3) { animation-delay: .30s; }
      @keyframes ai-bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40%            { transform: translateY(-5px); }
      }

      /* ── markdown inside ai-msg ── */
      .ai-msg strong { font-weight: 700; }
      .ai-msg em     { font-style: italic; }
      .ai-msg ul, .ai-msg ol { margin: 5px 0 5px 16px; padding: 0; }
      .ai-msg ul { list-style: disc; }
      .ai-msg ol { list-style: decimal; }
      .ai-msg li { margin-bottom: 3px; }
      .ai-msg p  { margin: 3px 0; }
      .ai-msg code {
        font-family: 'Fira Code', 'Courier New', monospace;
        background: var(--aw-accent-lt);
        color: var(--aw-accent-dk);
        border-radius: 4px;
        padding: 1px 5px;
        font-size: 11.5px;
      }
      .ai-msg .math-block {
        background: var(--aw-bg);
        border: 1px solid var(--aw-border);
        border-left: 3px solid var(--aw-accent);
        border-radius: 6px;
        padding: 8px 11px;
        margin: 7px 0;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        color: var(--aw-text);
        overflow-x: auto;
        display: block;
        white-space: pre;
      }
      .ai-msg .math-inline {
        font-family: 'Courier New', monospace;
        background: var(--aw-accent-lt);
        color: var(--aw-accent-dk);
        border-radius: 3px;
        padding: 1px 4px;
        font-size: 12px;
      }

      /* ── input area ── */
      #ai-chat-input-row {
        display: flex;
        border-top: 1px solid var(--aw-border);
        padding: 10px 12px;
        gap: 8px;
        flex-shrink: 0;
        align-items: flex-end;
        background: var(--aw-surface);
      }
      #ai-chat-input {
        flex: 1;
        border: 1.5px solid var(--aw-border);
        border-radius: 10px;
        padding: 8px 11px;
        font-size: 13px;
        font-family: var(--aw-font);
        outline: none;
        resize: none;
        background: var(--aw-bg);
        color: var(--aw-text);
        line-height: 1.5;
        max-height: 100px;
        overflow-y: auto;
        transition: border-color .15s, background .15s;
      }
      #ai-chat-input:focus {
        border-color: var(--aw-accent);
        background: var(--aw-surface);
      }
      #ai-chat-input::placeholder { color: var(--aw-muted); }
      #ai-chat-send {
        background: var(--aw-accent);
        color: #fff;
        border: none;
        border-radius: 10px;
        width: 36px;
        height: 36px;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .15s, transform .1s;
        flex-shrink: 0;
      }
      #ai-chat-send:hover  { background: var(--aw-accent-dk); }
      #ai-chat-send:active { transform: scale(.93); }
      #ai-chat-send:disabled {
        background: var(--aw-border);
        cursor: not-allowed;
        transform: none;
      }

      /* ── hint bar ── */
      #ai-hint-bar {
        padding: 4px 12px 6px;
        font-size: 10.5px;
        color: var(--aw-muted);
        background: var(--aw-surface);
        border-top: 1px solid var(--aw-border);
        display: flex;
        justify-content: space-between;
        user-select: none;
      }

      /* ── empty state ── */
      .ai-empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 28px 20px;
        color: var(--aw-muted);
        gap: 12px;
        pointer-events: none;
      }
      .ai-empty-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--aw-accent-lt);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        margin-bottom: 2px;
      }
      .ai-empty-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--aw-text);
      }
      .ai-empty-sub {
        font-size: 12px;
        line-height: 1.55;
        max-width: 220px;
      }

      /* ── suggestions ── */
      .ai-suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: center;
        pointer-events: all;
        margin-top: 4px;
      }
      .ai-suggestion-chip {
        background: var(--aw-surface);
        border: 1.5px solid var(--aw-border);
        border-radius: 20px;
        padding: 5px 11px;
        font-size: 11.5px;
        color: var(--aw-accent);
        cursor: pointer;
        font-family: var(--aw-font);
        font-weight: 500;
        transition: background .15s, border-color .15s;
      }
      .ai-suggestion-chip:hover {
        background: var(--aw-accent-lt);
        border-color: var(--aw-accent);
      }
    `;
    document.head.appendChild(s);
  }

  /* ─── math / markdown ─── */
  function renderMath(text) {
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => `<span class="math-block">${m.trim()}</span>`);
    text = text.replace(/\$([^\$\n]+?)\$/g, (_, m) => `<span class="math-inline">${m.trim()}</span>`);
    const map = {
      '\\rightarrow':'→','\\leftarrow':'←','\\Rightarrow':'⇒',
      '\\times':'×','\\cdot':'·','\\leq':'≤','\\geq':'≥','\\neq':'≠',
      '\\approx':'≈','\\sum':'Σ','\\infty':'∞','\\alpha':'α',
      '\\beta':'β','\\sigma':'σ','\\mu':'μ','\\theta':'θ','\\pi':'π'
    };
    for (var k in map) {
      text = text.replace(new RegExp(k.replace(/\\/g, '\\\\'), 'g'), map[k]);
    }
    return text;
  }

  function markdownToHtml(raw) {
    var t = raw.replace(/\\n/g, '\n');
    t = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = renderMath(t);
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    t = t.replace(/^[ \t]*[\*\-] (.+)$/gm, '<li>$1</li>');
    t = t.replace(/^[ \t]*\d+\. (.+)$/gm, '<li>$1</li>');
    t = t.replace(/(<li>[\s\S]*?<\/li>)(\n<li>[\s\S]*?<\/li>)*/g, m => '<ul>' + m + '</ul>');
    t = t.split(/\n{2,}/).map(p => {
      p = p.trim();
      if (!p) return '';
      if (/^<(ul|ol|li|h[1-6])/.test(p)) return p;
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    }).join('');
    return t;
  }

  /* ─── lecture text ─── */
  function getLectureText() {
    if (lectureTextCache) return lectureTextCache;
    const blocks = document.querySelectorAll('.section-block');
    lectureTextCache = blocks.length
      ? Array.from(blocks).map(el => el.innerText).join('\n\n').slice(0, 8000)
      : (document.querySelector('main') || document.body).innerText.slice(0, 8000);
    return lectureTextCache;
  }

  /* ─── empty state HTML ─── */
  function emptyStateHTML() {
    return `
      <div class="ai-empty">
        <div class="ai-empty-icon">💡</div>
        <div class="ai-empty-title">Lecture Assistant</div>
        <div class="ai-empty-sub">Ask anything about this lecture — concepts, examples, or a quick summary.</div>
        <div class="ai-suggestions">
          <button class="ai-suggestion-chip" data-q="Summarize this lecture in 3 points">Summarize lecture</button>
          <button class="ai-suggestion-chip" data-q="What are the key concepts here?">Key concepts</button>
          <button class="ai-suggestion-chip" data-q="Give me a quiz question from this lecture">Quiz me</button>
        </div>
      </div>`;
  }

  /* ─── DOM ─── */
  function buildWidget() {
    if (document.getElementById('ai-chat-btn')) return;

    syncPaused = true;
    document.body.insertAdjacentHTML('beforeend', `
      <button id="ai-chat-btn" title="Ask the Lecture Assistant">
        <span class="btn-icon">💬</span>
        Ask AI
      </button>

      <div id="ai-chat-box" role="dialog" aria-label="Lecture Assistant">
        <div id="ai-chat-header">
          <div class="ai-header-left">
            <div class="ai-header-avatar">🤖</div>
            <div>
              <div class="ai-header-title">Lecture Assistant</div>
              <div class="ai-header-sub">Powered by LLaMA 3.3</div>
            </div>
          </div>
          <div id="ai-header-actions">
            <button class="ai-hbtn" id="ai-chat-clear" title="Clear chat">⟳</button>
            <button class="ai-hbtn" id="ai-chat-close" title="Close">✕</button>
          </div>
        </div>

        <div id="ai-chat-messages">${emptyStateHTML()}</div>

        <div id="ai-chat-input-row">
          <textarea
            id="ai-chat-input"
            rows="1"
            placeholder="Ask about this lecture…"
            aria-label="Your question"
          ></textarea>
          <button id="ai-chat-send" title="Send (Enter)" aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 14L14 8L2 2V6.5L10 8L2 9.5V14Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div id="ai-hint-bar">
          <span>Enter ↵ to send · Shift+Enter for newline</span>
          <span id="ai-char-count"></span>
        </div>

        <div id="ai-resize-handle" title="Resize"></div>
      </div>
    `);

    widgetMounted = true;
    currentLectureId = getLectureId();
    wireEvents();
    syncPaused = false;
  }

  /* ─── remove widget ─── */
  function removeWidget() {
    syncPaused = true;
    var btn = document.getElementById('ai-chat-btn');
    var box = document.getElementById('ai-chat-box');
    if (btn) btn.remove();
    if (box) box.remove();
    widgetMounted = false;
    conversationHistory = [];
    lectureTextCache = null;
    syncPaused = false;
  }

  /* ─── open / close ─── */
  function openBox(box) {
    box.style.display = 'flex';
    requestAnimationFrame(() => box.classList.add('open'));
    document.getElementById('ai-chat-input').focus();
  }
  function closeBox(box) {
    box.classList.remove('open');
    setTimeout(() => { if (!box.classList.contains('open')) box.style.display = 'none'; }, 220);
  }

  /* ─── clear chat ─── */
  function clearChat() {
    conversationHistory = [];
    lectureTextCache = null;
    var m = document.getElementById('ai-chat-messages');
    if (m) m.innerHTML = emptyStateHTML();
    attachSuggestionListeners();
  }

  /* ─── suggestion chips ─── */
  function attachSuggestionListeners() {
    var chips = document.querySelectorAll('.ai-suggestion-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var input = document.getElementById('ai-chat-input');
        var messages = document.getElementById('ai-chat-messages');
        if (input && messages) {
          input.value = chip.dataset.q;
          askQuestion(messages, input);
        }
      });
    });
  }

  /* ─── messages ─── */
  function addMsg(messages, text, type, isHtml) {
    var empty = messages.querySelector('.ai-empty');
    if (empty) empty.remove();
    var div = document.createElement('div');
    div.className = type === 'user' ? 'user-msg' : 'ai-msg';
    if (isHtml) { div.innerHTML = text; } else { div.textContent = text; }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  /* ─── send ─── */
  function askQuestion(messages, input) {
    var question = input.value.trim();
    if (!question) return;

    var sendBtn = document.getElementById('ai-chat-send');
    input.value = '';
    input.style.height = 'auto';
    if (sendBtn) sendBtn.disabled = true;

    addMsg(messages, question, 'user', false);
    conversationHistory.push({ role: 'user', content: question });

    var thinking = addMsg(messages, '', 'ai', true);
    thinking.classList.add('thinking');
    thinking.innerHTML = '<span class="ai-dots"><span></span><span></span><span></span></span>';

    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: question,
        lectureText: getLectureText(),
        history: conversationHistory.slice(-5, -1)
      })
    })
    .then(function (r) { return r.text(); })
    .then(function (text) {
      thinking.classList.remove('thinking');
      try { var d = JSON.parse(text); text = d.answer || text; } catch (e) {}
      thinking.innerHTML = markdownToHtml(text);
      messages.scrollTop = messages.scrollHeight;
      conversationHistory.push({ role: 'assistant', content: text });
    })
    .catch(function () {
      thinking.classList.remove('thinking');
      thinking.innerHTML = '<em style="color:#c0392b">Something went wrong. Please try again.</em>';
      conversationHistory.pop();
    })
    .finally(function () {
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
    });
  }

  /* ─── wire events (called once after build) ─── */
  function wireEvents() {
    var btn      = document.getElementById('ai-chat-btn');
    var box      = document.getElementById('ai-chat-box');
    var header   = document.getElementById('ai-chat-header');
    var clearBtn = document.getElementById('ai-chat-clear');
    var closeBtn = document.getElementById('ai-chat-close');
    var messages = document.getElementById('ai-chat-messages');
    var input    = document.getElementById('ai-chat-input');
    var send     = document.getElementById('ai-chat-send');
    var resizer  = document.getElementById('ai-resize-handle');
    var charCount = document.getElementById('ai-char-count');

    box.style.display = 'none';

    btn.addEventListener('click', function () {
      box.classList.contains('open') ? closeBox(box) : openBox(box);
    });
    closeBtn.addEventListener('click', function () { closeBox(box); });
    clearBtn.addEventListener('click', clearChat);
    send.addEventListener('click', function () { askQuestion(messages, input); });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        askQuestion(messages, input);
      }
    });

    input.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
      if (charCount) {
        var len = this.value.length;
        charCount.textContent = len > 0 ? len + ' chars' : '';
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (box.classList.contains('open') &&
          !box.contains(e.target) &&
          !btn.contains(e.target)) {
        closeBox(box);
      }
    });

    makeDraggable(box, header);
    makeResizable(box, resizer);
    makeButtonDraggable(btn);
    attachSuggestionListeners();
  }

  /* ─── drag (box) ─── */
  function makeDraggable(el, handle) {
    var ox, oy, sx, sy;
    handle.addEventListener('mousedown', function (e) {
      if (e.target.closest('#ai-header-actions')) return;
      e.preventDefault();
      var r = el.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
    });
    function onDrag(e) {
      el.style.right  = Math.max(0, window.innerWidth  - (ox + (e.clientX - sx)) - el.offsetWidth)  + 'px';
      el.style.bottom = Math.max(0, window.innerHeight - (oy + (e.clientY - sy)) - el.offsetHeight) + 'px';
    }
    function stopDrag() {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    }
  }

  /* ─── resize ─── */
  function makeResizable(el, handle) {
    var sx, sy, sw, sh;
    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      sx = e.clientX; sy = e.clientY;
      sw = el.offsetWidth; sh = el.offsetHeight;
      document.addEventListener('mousemove', onResize);
      document.addEventListener('mouseup', stopResize);
    });
    function onResize(e) {
      el.style.width  = Math.max(270, sw + (e.clientX - sx)) + 'px';
      el.style.height = Math.max(300, sh + (e.clientY - sy)) + 'px';
    }
    function stopResize() {
      document.removeEventListener('mousemove', onResize);
      document.removeEventListener('mouseup', stopResize);
    }
  }

  /* ─── drag (button) ─── */
  function makeButtonDraggable(btn) {
    var dragged = false, sx, sy, ox, oy;
    btn.addEventListener('mousedown', function (e) {
      dragged = false;
      sx = e.clientX; sy = e.clientY;
      var r = btn.getBoundingClientRect();
      ox = r.left; oy = r.top;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    function onMove(e) {
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        dragged = true;
        btn.style.right  = Math.max(0, window.innerWidth  - ox - dx - btn.offsetWidth)  + 'px';
        btn.style.bottom = Math.max(0, window.innerHeight - oy - dy - btn.offsetHeight) + 'px';
        btn.style.left = 'auto'; btn.style.top = 'auto';
      }
    }
    function onUp(e) {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (dragged) e.stopImmediatePropagation();
    }
    btn.addEventListener('click', function (e) {
      if (dragged) { e.stopImmediatePropagation(); dragged = false; }
    }, true);
  }

  /* ─── lecture change detection ─── */
  function handleLectureChange() {
    var newId = getLectureId();
    if (currentLectureId && newId !== currentLectureId) {
      currentLectureId = newId;
      lectureTextCache = null;
      conversationHistory = [];
      var m = document.getElementById('ai-chat-messages');
      if (m) {
        m.innerHTML = emptyStateHTML();
        attachSuggestionListeners();
      }
    }
  }

  /* ─── main sync: mount or unmount widget based on page type ─── */
  function syncWidget() {
    if (syncPaused) return;   // don't re-enter while we're mutating the DOM
    if (isLecturePage()) {
      if (!widgetMounted) {
        injectStyles();
        buildWidget();
      } else {
        handleLectureChange();
      }
    } else {
      if (widgetMounted) {
        removeWidget();
      }
    }
  }

  /* ─── hash change = navigation between lectures / home ─── */
  window.addEventListener('hashchange', function () {
    syncWidget();
  });

  /* ─── initial run ─── */
  syncWidget();

})();

(function () {
  const WORKER_URL = 'https://n8n-production-b7424.up.railway.app/webhook/chat'

  var conversationHistory = []
  var lectureTextCache    = null
  var currentLectureId    = null
  var lastUrl             = location.href

  /* ─── helpers ─── */
  function cssVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  }
  function getLectureId() {
    return window.location.pathname + window.location.hash
  }
  function isLecturePage() {
    return !!document.querySelector('.section-block')
  }

  /* ─── styles ─── */
  function injectStyles() {
    if (document.getElementById('ai-chat-styles')) return
    const primary   = cssVar('--color-primary',   '#4f46e5')
    const onPrimary = cssVar('--color-on-primary', '#ffffff')
    const surface   = cssVar('--color-surface',   '#ffffff')
    const border    = cssVar('--color-border',    '#e2e8f0')
    const radius    = '10px'
    const font      = cssVar('--font-sans', 'system-ui,-apple-system,sans-serif')

    const s = document.createElement('style')
    s.id = 'ai-chat-styles'
    s.textContent = `
      /* ── button ── */
      #ai-chat-btn {
        position:fixed; bottom:24px; right:24px; z-index:9999;
        background:${primary}; color:${onPrimary};
        border:none; border-radius:50px;
        padding:10px 18px; font-size:14px; font-family:${font};
        cursor:pointer;
        box-shadow:0 2px 10px rgba(0,0,0,.18);
        transition:transform .15s,box-shadow .15s;
        touch-action:none; display:flex; align-items:center; gap:6px;
      }
      #ai-chat-btn:hover  { transform:translateY(-2px); box-shadow:0 5px 18px rgba(0,0,0,.22); }
      #ai-chat-btn:active { transform:translateY(0); }

      /* ── box ── */
      #ai-chat-box {
        position:fixed; bottom:80px; right:24px; z-index:9998;
        width:360px; height:500px;
        min-width:260px; min-height:280px;
        max-width:90vw; max-height:80vh;
        background:${surface};
        border-radius:${radius};
        box-shadow:0 4px 24px rgba(0,0,0,.12),0 1px 4px rgba(0,0,0,.07);
        border:1px solid ${border};
        display:none; flex-direction:column; font-family:${font};
        overflow:hidden;
        opacity:0; transform:scale(.97) translateY(6px);
        transform-origin:bottom right;
        transition:opacity .18s ease,transform .18s ease;
      }
      #ai-chat-box.open { opacity:1; transform:scale(1) translateY(0); }

      /* ── resize handle ── */
      #ai-resize-handle {
        position:absolute; bottom:0; right:0;
        width:22px; height:22px; cursor:se-resize; z-index:10;
      }
      #ai-resize-handle::after {
        content:''; position:absolute; bottom:5px; right:5px;
        width:9px; height:9px;
        border-right:2px solid #cbd5e1;
        border-bottom:2px solid #cbd5e1;
        border-radius:1px;
      }

      /* ── header ── */
      #ai-chat-header {
        background:${primary}; color:${onPrimary};
        padding:10px 14px; font-size:13px; font-weight:600;
        cursor:grab; user-select:none; flex-shrink:0;
        display:flex; justify-content:space-between; align-items:center;
        letter-spacing:.02em;
      }
      #ai-chat-header:active { cursor:grabbing; }
      #ai-header-actions { display:flex; gap:2px; }
      .ai-hbtn {
        background:none; border:none; color:${onPrimary};
        font-size:15px; cursor:pointer; padding:3px 7px;
        border-radius:5px; opacity:.75;
        transition:opacity .15s,background .15s;
      }
      .ai-hbtn:hover { opacity:1; background:rgba(255,255,255,.18); }

      /* ── messages ── */
      #ai-chat-messages {
        flex:1; overflow-y:auto; padding:14px 12px;
        display:flex; flex-direction:column; gap:10px;
        min-height:0; scroll-behavior:smooth;
      }
      #ai-chat-messages::-webkit-scrollbar { width:4px; }
      #ai-chat-messages::-webkit-scrollbar-track { background:transparent; }
      #ai-chat-messages::-webkit-scrollbar-thumb { background:${border}; border-radius:4px; }

      /* ── bubbles ── */
      .user-msg {
        max-width:82%; padding:9px 13px;
        border-radius:16px 16px 4px 16px;
        background:${primary}; color:${onPrimary}; align-self:flex-end;
        font-size:13px; line-height:1.55; word-break:break-word;
      }
      .ai-msg {
        max-width:90%; padding:9px 13px;
        border-radius:16px 16px 16px 4px;
        background:#f3f4f6; color:#1f2937; align-self:flex-start;
        font-size:13px; line-height:1.7; word-break:break-word;
      }

      /* ── typing indicator ── */
      .ai-msg.thinking { background:#f3f4f6; }
      .ai-dots { display:inline-flex; gap:4px; padding:2px 0; }
      .ai-dots span {
        width:6px; height:6px; border-radius:50%; background:#9ca3af;
        display:inline-block;
        animation:ai-bounce 1.1s ease infinite;
      }
      .ai-dots span:nth-child(2){ animation-delay:.15s; }
      .ai-dots span:nth-child(3){ animation-delay:.3s;  }
      @keyframes ai-bounce {
        0%,80%,100%{ transform:translateY(0); }
        40%{ transform:translateY(-5px); }
      }

      /* ── markdown inside ai-msg ── */
      .ai-msg strong { font-weight:600; }
      .ai-msg em     { font-style:italic; }
      .ai-msg ul { margin:5px 0 5px 16px; padding:0; list-style:disc; }
      .ai-msg ol { margin:5px 0 5px 16px; padding:0; list-style:decimal; }
      .ai-msg li { margin-bottom:3px; }
      .ai-msg p  { margin:3px 0; }
      .ai-msg .math-block {
        background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;
        padding:7px 10px; margin:6px 0;
        font-family:'Courier New',monospace; font-size:12px; color:#374151;
        overflow-x:auto; display:block; white-space:pre;
      }
      .ai-msg .math-inline {
        font-family:'Courier New',monospace;
        background:#f3f4f6; border-radius:3px;
        padding:1px 4px; font-size:12px; color:#374151;
      }

      /* ── input row ── */
      #ai-chat-input-row {
        display:flex; border-top:1px solid ${border};
        padding:10px; gap:8px; flex-shrink:0; align-items:flex-end;
        background:${surface};
      }
      #ai-chat-input {
        flex:1; border:1px solid ${border}; border-radius:8px;
        padding:8px 10px; font-size:13px; font-family:${font};
        outline:none; resize:none; background:#f9fafb; color:#1f2937;
        line-height:1.5; max-height:100px; overflow-y:auto;
        transition:border-color .15s;
      }
      #ai-chat-input:focus { border-color:${primary}; background:${surface}; }
      #ai-chat-send {
        background:${primary}; color:${onPrimary}; border:none;
        border-radius:8px; padding:9px 14px; cursor:pointer;
        font-size:16px; font-family:${font};
        transition:opacity .15s,transform .1s; flex-shrink:0;
      }
      #ai-chat-send:hover  { opacity:.88; }
      #ai-chat-send:active { transform:scale(.95); }

      /* ── empty state ── */
      .ai-empty {
        flex:1; display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        text-align:center; padding:24px; color:#9ca3af;
        font-size:13px; gap:8px; pointer-events:none;
      }
      .ai-empty-icon { font-size:26px; opacity:.45; }
    `
    document.head.appendChild(s)
  }

  /* ─── math / markdown ─── */
  function renderMath(text) {
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_,m) => `<span class="math-block">${m.trim()}</span>`)
    text = text.replace(/\$([^\$\n]+?)\$/g,    (_,m) => `<span class="math-inline">${m.trim()}</span>`)
    const map = {
      '\\rightarrow':'→','\\leftarrow':'←','\\Rightarrow':'⇒',
      '\\times':'×','\\cdot':'·','\\leq':'≤','\\geq':'≥','\\neq':'≠',
      '\\approx':'≈','\\sum':'Σ','\\infty':'∞','\\alpha':'α',
      '\\beta':'β','\\sigma':'σ','\\mu':'μ','\\theta':'θ','\\pi':'π'
    }
    for (var k in map) text = text.replace(new RegExp(k.replace(/\\/g,'\\\\'),'g'), map[k])
    return text
  }

  function markdownToHtml(raw) {
    var t = raw.replace(/\\n/g,'\n')
    t = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    t = renderMath(t)
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    t = t.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    t = t.replace(/^[ \t]*[\*\-] (.+)$/gm, '<li>$1</li>')
    t = t.replace(/^[ \t]*\d+\. (.+)$/gm,  '<li>$1</li>')
    t = t.replace(/(<li>[\s\S]*?<\/li>)(\n<li>[\s\S]*?<\/li>)*/g, m => '<ul>'+m+'</ul>')
    t = t.split(/\n{2,}/).map(p => {
      p = p.trim()
      if (!p) return ''
      if (/^<(ul|ol|li|h[1-6])/.test(p)) return p
      return '<p>' + p.replace(/\n/g,'<br>') + '</p>'
    }).join('')
    return t
  }

  /* ─── lecture text ─── */
  function getLectureText() {
    if (lectureTextCache) return lectureTextCache
    const blocks = document.querySelectorAll('.section-block')
    lectureTextCache = blocks.length
      ? Array.from(blocks).map(el => el.innerText).join('\n\n').slice(0,8000)
      : (document.querySelector('main')||document.body).innerText.slice(0,8000)
    return lectureTextCache
  }

  /* ─── DOM ─── */
  function emptyState() {
    return `<div class="ai-empty">
      <span class="ai-empty-icon">📖</span>
      <span>Ask anything about this lecture</span>
    </div>`
  }

  function buildHTML() {
    document.body.insertAdjacentHTML('beforeend', `
      <button id="ai-chat-btn">💬 Ask AI</button>
      <div id="ai-chat-box">
        <div id="ai-chat-header">
          <span>Lecture Assistant</span>
          <div id="ai-header-actions">
            <button class="ai-hbtn" id="ai-chat-clear" title="Clear chat">🗑</button>
            <button class="ai-hbtn" id="ai-chat-close" title="Close">✕</button>
          </div>
        </div>
        <div id="ai-chat-messages">${emptyState()}</div>
        <div id="ai-chat-input-row">
          <textarea id="ai-chat-input" rows="2" placeholder="Ask a question…"></textarea>
          <button id="ai-chat-send">↑</button>
        </div>
        <div id="ai-resize-handle"></div>
      </div>
    `)
  }

  /* ─── open / close with animation ─── */
  function openBox(box) {
    box.style.display = 'flex'
    requestAnimationFrame(() => box.classList.add('open'))
  }
  function closeBox(box) {
    box.classList.remove('open')
    setTimeout(() => { if (!box.classList.contains('open')) box.style.display = 'none' }, 200)
  }

  /* ─── clear chat ─── */
  function clearChat() {
    conversationHistory = []
    lectureTextCache    = null
    var m = document.getElementById('ai-chat-messages')
    if (m) m.innerHTML = emptyState()
  }

  /* ─── drag (box) ─── */
  function makeDraggable(el, handle) {
    var ox,oy,sx,sy
    handle.addEventListener('mousedown', function(e) {
      if (e.target.closest('#ai-header-actions')) return
      e.preventDefault()
      var r=el.getBoundingClientRect(); sx=e.clientX; sy=e.clientY; ox=r.left; oy=r.top
      document.addEventListener('mousemove',onDrag); document.addEventListener('mouseup',stopDrag)
    })
    function onDrag(e) {
      el.style.right  = Math.max(0, window.innerWidth -(ox+(e.clientX-sx))-el.offsetWidth) +'px'
      el.style.bottom = Math.max(0, window.innerHeight-(oy+(e.clientY-sy))-el.offsetHeight)+'px'
    }
    function stopDrag() {
      document.removeEventListener('mousemove',onDrag); document.removeEventListener('mouseup',stopDrag)
    }
  }

  /* ─── resize ─── */
  function makeResizable(el, handle) {
    var sx,sy,sw,sh
    handle.addEventListener('mousedown', function(e) {
      e.preventDefault(); sx=e.clientX; sy=e.clientY; sw=el.offsetWidth; sh=el.offsetHeight
      document.addEventListener('mousemove',onResize); document.addEventListener('mouseup',stopResize)
    })
    function onResize(e) {
      el.style.width  = Math.max(260, sw+(e.clientX-sx))+'px'
      el.style.height = Math.max(280, sh+(e.clientY-sy))+'px'
    }
    function stopResize() {
      document.removeEventListener('mousemove',onResize); document.removeEventListener('mouseup',stopResize)
    }
  }

  /* ─── drag (button) ─── */
  function makeButtonDraggable(btn) {
    var dragged=false,sx,sy,ox,oy
    btn.addEventListener('mousedown', function(e) {
      dragged=false; sx=e.clientX; sy=e.clientY
      var r=btn.getBoundingClientRect(); ox=r.left; oy=r.top
      document.addEventListener('mousemove',onMove); document.addEventListener('mouseup',onUp)
    })
    function onMove(e) {
      var dx=e.clientX-sx, dy=e.clientY-sy
      if (Math.abs(dx)>3||Math.abs(dy)>3) {
        dragged=true
        btn.style.right  = Math.max(0, window.innerWidth -ox-dx-btn.offsetWidth) +'px'
        btn.style.bottom = Math.max(0, window.innerHeight-oy-dy-btn.offsetHeight)+'px'
        btn.style.left='auto'; btn.style.top='auto'
      }
    }
    function onUp(e) {
      document.removeEventListener('mousemove',onMove); document.removeEventListener('mouseup',onUp)
      if (dragged) e.stopImmediatePropagation()
    }
    btn.addEventListener('click', function(e) {
      if (dragged) { e.stopImmediatePropagation(); dragged=false }
    }, true)
  }

  /* ─── messages ─── */
  function addMsg(messages, text, type, isHtml) {
    var empty = messages.querySelector('.ai-empty')
    if (empty) empty.remove()
    var div = document.createElement('div')
    div.className = type==='user' ? 'user-msg' : 'ai-msg'
    if (isHtml) { div.innerHTML=text } else { div.textContent=text }
    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
    return div
  }

  /* ─── send ─── */
  function askQuestion(messages, input) {
    var question = input.value.trim()
    if (!question) return
    input.value = ''; input.style.height='auto'
    addMsg(messages, question, 'user', false)
    conversationHistory.push({ role:'user', content:question })

    var thinking = addMsg(messages,'','ai',true)
    thinking.classList.add('thinking')
    thinking.innerHTML = '<span class="ai-dots"><span></span><span></span><span></span></span>'

    fetch(WORKER_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        question,
        lectureText: getLectureText(),
        history: conversationHistory.slice(-5,-1)
      })
    })
    .then(r => r.text())
    .then(text => {
      thinking.classList.remove('thinking')
      try { var d=JSON.parse(text); text=d.answer||text } catch(e){}
      thinking.innerHTML = markdownToHtml(text)
      messages.scrollTop = messages.scrollHeight
      conversationHistory.push({ role:'assistant', content:text })
    })
    .catch(() => {
      thinking.classList.remove('thinking')
      thinking.textContent = 'Something went wrong. Please try again.'
      conversationHistory.pop()
    })
  }

  /* ─── init ─── */
  function init() {
    if (document.getElementById('ai-chat-btn')) return
    injectStyles()
    buildHTML()

    var btn      = document.getElementById('ai-chat-btn')
    var box      = document.getElementById('ai-chat-box')
    var header   = document.getElementById('ai-chat-header')
    var clearBtn = document.getElementById('ai-chat-clear')
    var closeBtn = document.getElementById('ai-chat-close')
    var messages = document.getElementById('ai-chat-messages')
    var input    = document.getElementById('ai-chat-input')
    var send     = document.getElementById('ai-chat-send')
    var resizer  = document.getElementById('ai-resize-handle')

    currentLectureId = getLectureId()
    box.style.display = 'none'

    btn.addEventListener('click', () => box.classList.contains('open') ? closeBox(box) : openBox(box))
    closeBtn.addEventListener('click', () => closeBox(box))
    clearBtn.addEventListener('click', clearChat)
    send.addEventListener('click', () => askQuestion(messages, input))
    input.addEventListener('keydown', e => {
      if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); askQuestion(messages, input) }
    })
    input.addEventListener('input', function() {
      this.style.height='auto'
      this.style.height = Math.min(this.scrollHeight,100)+'px'
    })

    makeDraggable(box, header)
    makeResizable(box, resizer)
    makeButtonDraggable(btn)
  }

  /* ─── lecture change detection ─── */
  function checkLectureChange() {
    var newId = getLectureId()
    if (currentLectureId && newId !== currentLectureId) {
      currentLectureId = newId
      lectureTextCache = null
      conversationHistory = []
      var m = document.getElementById('ai-chat-messages')
      if (m) m.innerHTML = emptyState()
    }
  }

  /* ─── show / hide button based on page type ─── */
  function syncVisibility() {
    var btn = document.getElementById('ai-chat-btn')
    var box = document.getElementById('ai-chat-box')
    var onLecture = isLecturePage()
    if (btn) {
      btn.style.display = onLecture ? '' : 'none'
      if (!onLecture && box) closeBox(box)
    }
  }

  function tryInit() {
    if (isLecturePage()) { init(); checkLectureChange() }
    syncVisibility()
  }

  /* ─── SPA navigation polling ─── */
  setInterval(() => {
    if (location.href !== lastUrl) { lastUrl = location.href; tryInit() }
  }, 400)

  tryInit()
  setTimeout(tryInit,  500)
  setTimeout(tryInit, 1500)
  setTimeout(tryInit, 3000)

  new MutationObserver(tryInit).observe(document.body, { childList:true, subtree:true })

})()

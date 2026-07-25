(function () {
  const WORKER_URL = 'https://n8n-production-b7424.up.railway.app/webhook/chat'

  // Conversation history: [{role: 'user'|'assistant', content: '...'}]
  var conversationHistory = []
  var lectureTextCache = null

  function cssVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  }

  function injectStyles() {
    const primary   = cssVar('--color-primary',   '#4f46e5')
    const onPrimary = cssVar('--color-on-primary', '#ffffff')
    const surface   = cssVar('--color-surface',   '#ffffff')
    const border    = cssVar('--color-border',    '#e2e8f0')
    const radius    = cssVar('--radius-md',       '12px')
    const shadow    = cssVar('--shadow-lg',       '0 8px 30px rgba(0,0,0,0.15)')
    const font      = cssVar('--font-sans',       'sans-serif')

    const style = document.createElement('style')
    style.textContent = `
      #ai-chat-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        background: ${primary}; color: ${onPrimary};
        border: none; border-radius: 50px;
        padding: 12px 20px; font-size: 15px; font-family: ${font};
        cursor: pointer; box-shadow: ${shadow}; transition: opacity 0.2s;
        touch-action: none;
      }
      #ai-chat-btn:hover { opacity: 0.85; }
      #ai-chat-box {
        position: fixed; bottom: 80px; right: 24px; z-index: 9998;
        width: 360px; height: 500px;
        min-width: 260px; min-height: 250px;
        max-width: 90vw; max-height: 80vh;
        background: ${surface};
        border-radius: ${radius}; box-shadow: ${shadow};
        display: none; flex-direction: column; font-family: ${font};
        overflow: hidden;
      }
      #ai-chat-box.open { display: flex; }

      /* Resize handle — bottom-right corner */
      #ai-resize-handle {
        position: absolute; bottom: 0; right: 0;
        width: 18px; height: 18px; cursor: se-resize; z-index: 10;
        background: linear-gradient(135deg, transparent 50%, ${border} 50%);
      }

      #ai-chat-header {
        background: ${primary}; color: ${onPrimary};
        padding: 12px 16px; font-weight: 600; font-size: 14px;
        cursor: grab; display: flex; justify-content: space-between; align-items: center;
        user-select: none; flex-shrink: 0;
      }
      #ai-chat-header:active { cursor: grabbing; }
      #ai-chat-close {
        background: none; border: none; color: ${onPrimary};
        font-size: 18px; cursor: pointer; padding: 0 4px; line-height: 1;
      }
      #ai-chat-messages {
        flex: 1; overflow-y: auto; padding: 12px;
        display: flex; flex-direction: column; gap: 8px;
        min-height: 0;
      }
      .user-msg {
        max-width: 85%; padding: 8px 12px; border-radius: ${radius};
        background: ${primary}; color: ${onPrimary}; align-self: flex-end;
        font-size: 13px; line-height: 1.6; border-bottom-right-radius: 4px;
        word-break: break-word;
      }
      .ai-msg {
        max-width: 90%; padding: 8px 12px; border-radius: ${radius};
        background: #e4e4e4; color: #111111; align-self: flex-start;
        font-size: 13px; line-height: 1.7; border-bottom-left-radius: 4px;
        word-break: break-word;
      }
      .ai-msg.thinking { opacity: 0.55; font-style: italic; }
      .ai-msg strong { font-weight: 700; color: #000; }
      .ai-msg em { font-style: italic; }
      .ai-msg ul { margin: 6px 0 6px 18px; padding: 0; list-style: disc; }
      .ai-msg ol { margin: 6px 0 6px 18px; padding: 0; list-style: decimal; }
      .ai-msg li { margin-bottom: 3px; }
      .ai-msg p { margin: 4px 0; }
      .ai-msg .math-block {
        background: #f5f5f5; border-radius: 6px;
        padding: 6px 10px; margin: 6px 0;
        font-family: 'Courier New', monospace; font-size: 12px;
        color: #333; overflow-x: auto; display: block;
        white-space: pre;
      }
      .ai-msg .math-inline {
        font-family: 'Courier New', monospace;
        background: #f0f0f0; border-radius: 3px;
        padding: 1px 4px; font-size: 12px; color: #333;
      }
      #ai-chat-input-row {
        display: flex; border-top: 1px solid ${border}; padding: 10px; gap: 8px;
        flex-shrink: 0;
      }
      #ai-chat-input {
        flex: 1; border: 1px solid ${border}; border-radius: ${radius};
        padding: 8px 10px; font-size: 13px; font-family: ${font};
        outline: none; resize: none; background: ${surface}; color: #111;
      }
      #ai-chat-send {
        background: ${primary}; color: ${onPrimary}; border: none;
        border-radius: ${radius}; padding: 8px 14px;
        cursor: pointer; font-size: 13px; font-family: ${font}; transition: opacity 0.2s;
      }
      #ai-chat-send:hover { opacity: 0.85; }
    `
    document.head.appendChild(style)
  }

  // Clean up math: $...$ and $$...$$ → styled spans/blocks
  function renderMath(text) {
    // Block math $$...$$
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, function(_, m) {
      return '<span class="math-block">' + m.trim() + '</span>'
    })
    // Inline math $...$
    text = text.replace(/\$([^\$\n]+?)\$/g, function(_, m) {
      return '<span class="math-inline">' + m.trim() + '</span>'
    })
    // LaTeX-style \rightarrow etc → readable arrows
    text = text.replace(/\\rightarrow/g, '→')
    text = text.replace(/\\leftarrow/g, '←')
    text = text.replace(/\\Rightarrow/g, '⇒')
    text = text.replace(/\\Leftarrow/g, '⇐')
    text = text.replace(/\\times/g, '×')
    text = text.replace(/\\cdot/g, '·')
    text = text.replace(/\\leq/g, '≤')
    text = text.replace(/\\geq/g, '≥')
    text = text.replace(/\\neq/g, '≠')
    text = text.replace(/\\approx/g, '≈')
    text = text.replace(/\\sum/g, 'Σ')
    text = text.replace(/\\prod/g, 'Π')
    text = text.replace(/\\infty/g, '∞')
    text = text.replace(/\\alpha/g, 'α')
    text = text.replace(/\\beta/g, 'β')
    text = text.replace(/\\gamma/g, 'γ')
    text = text.replace(/\\delta/g, 'δ')
    text = text.replace(/\\sigma/g, 'σ')
    text = text.replace(/\\mu/g, 'μ')
    text = text.replace(/\\lambda/g, 'λ')
    text = text.replace(/\\theta/g, 'θ')
    text = text.replace(/\\pi/g, 'π')
    return text
  }

  function markdownToHtml(text) {
    // Normalize escaped newlines
    text = text.replace(/\\n/g, '\n')

    // Escape HTML (but not inside math we already processed)
    text = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Apply math rendering AFTER html escape
    text = renderMath(text)

    // Bold **text**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic *text*
    text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')

    // Bullet list lines
    text = text.replace(/^[ \t]*[\*\-] (.+)$/gm, '<li>$1</li>')
    // Numbered list lines
    text = text.replace(/^[ \t]*\d+\. (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    text = text.replace(/(<li>[\s\S]*?<\/li>)(\n<li>[\s\S]*?<\/li>)*/g, function(m) {
      return '<ul>' + m + '</ul>'
    })

    // Paragraphs from double newlines
    var parts = text.split(/\n{2,}/)
    text = parts.map(function(p) {
      p = p.trim()
      if (!p) return ''
      if (/^<(ul|ol|li|h[1-6])/.test(p)) return p
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>'
    }).join('')

    return text
  }

  function getLectureText() {
    if (lectureTextCache) return lectureTextCache
    const blocks = document.querySelectorAll('.section-block')
    if (blocks.length) {
      lectureTextCache = Array.from(blocks).map(function(el) { return el.innerText }).join('\n\n').slice(0, 8000)
    } else {
      lectureTextCache = (document.querySelector('main') || document.body).innerText.slice(0, 8000)
    }
    return lectureTextCache
  }

  function buildHTML() {
    document.body.insertAdjacentHTML('beforeend',
      '<button id="ai-chat-btn">💬 Ask AI</button>' +
      '<div id="ai-chat-box">' +
        '<div id="ai-chat-header">' +
          '<span>Ask about this lecture</span>' +
          '<button id="ai-chat-close">✕</button>' +
        '</div>' +
        '<div id="ai-chat-messages"></div>' +
        '<div id="ai-chat-input-row">' +
          '<textarea id="ai-chat-input" rows="2" placeholder="Ask a question..."></textarea>' +
          '<button id="ai-chat-send">Send</button>' +
        '</div>' +
        '<div id="ai-resize-handle"></div>' +
      '</div>'
    )
  }

  function makeDraggable(el, handle) {
    var ox = 0, oy = 0, sx = 0, sy = 0
    handle.addEventListener('mousedown', startDrag)

    function startDrag(e) {
      if (e.target.id === 'ai-chat-close') return
      e.preventDefault()
      var rect = el.getBoundingClientRect()
      // Convert current position to right/bottom offsets relative to viewport
      sx = e.clientX
      sy = e.clientY
      ox = rect.left
      oy = rect.top
      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', stopDrag)
    }

    function onDrag(e) {
      var dx = e.clientX - sx
      var dy = e.clientY - sy
      var newLeft = ox + dx
      var newTop  = oy + dy
      // Convert to right/bottom
      var newRight  = window.innerWidth  - newLeft - el.offsetWidth
      var newBottom = window.innerHeight - newTop  - el.offsetHeight
      el.style.right  = Math.max(0, newRight)  + 'px'
      el.style.bottom = Math.max(0, newBottom) + 'px'
    }

    function stopDrag() {
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)
    }
  }

  function makeResizable(el, handle) {
    var startX, startY, startW, startH
    handle.addEventListener('mousedown', function(e) {
      e.preventDefault()
      startX = e.clientX
      startY = e.clientY
      startW = el.offsetWidth
      startH = el.offsetHeight
      document.addEventListener('mousemove', onResize)
      document.addEventListener('mouseup', stopResize)
    })

    function onResize(e) {
      var newW = startW + (e.clientX - startX)
      var newH = startH + (e.clientY - startY)
      el.style.width  = Math.max(260, newW) + 'px'
      el.style.height = Math.max(250, newH) + 'px'
    }

    function stopResize() {
      document.removeEventListener('mousemove', onResize)
      document.removeEventListener('mouseup', stopResize)
    }
  }

  // Also make the floating button draggable
  function makeButtonDraggable(btn) {
    var dragged = false, sx, sy, ox, oy
    btn.addEventListener('mousedown', function(e) {
      dragged = false
      sx = e.clientX; sy = e.clientY
      var rect = btn.getBoundingClientRect()
      ox = rect.left; oy = rect.top
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    })
    function onMove(e) {
      var dx = e.clientX - sx, dy = e.clientY - sy
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragged = true
        var newLeft = ox + dx, newTop = oy + dy
        btn.style.right  = Math.max(0, window.innerWidth  - newLeft - btn.offsetWidth)  + 'px'
        btn.style.bottom = Math.max(0, window.innerHeight - newTop  - btn.offsetHeight) + 'px'
        btn.style.left = 'auto'; btn.style.top = 'auto'
      }
    }
    function onUp(e) {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      if (dragged) e.stopImmediatePropagation()
    }
    btn.addEventListener('click', function(e) {
      if (dragged) { e.stopImmediatePropagation(); dragged = false }
    }, true)
  }

  function addMsg(messages, text, type, isHtml) {
    var div = document.createElement('div')
    div.className = type === 'user' ? 'user-msg' : 'ai-msg'
    if (isHtml) { div.innerHTML = text } else { div.textContent = text }
    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
    return div
  }

  function askQuestion(messages, input) {
    var question = input.value.trim()
    if (!question) return
    input.value = ''
    addMsg(messages, question, 'user', false)

    // Build history for this request
    conversationHistory.push({ role: 'user', content: question })

    var thinking = addMsg(messages, 'Thinking...', 'ai', false)
    thinking.classList.add('thinking')

    // Send: lecture text (first time only via history), full history, current question
    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: question,
        lectureText: getLectureText(),
        history: conversationHistory.slice(0, -1) // all previous turns
      })
    })
    .then(function(res) { return res.text() })
    .then(function(text) {
      thinking.classList.remove('thinking')
      try {
        var data = JSON.parse(text)
        text = data.answer || text
      } catch(e) {}
      var html = markdownToHtml(text)
      thinking.innerHTML = html
      messages.scrollTop = messages.scrollHeight
      // Save assistant reply to history
      conversationHistory.push({ role: 'assistant', content: text })
    })
    .catch(function() {
      thinking.classList.remove('thinking')
      thinking.textContent = 'Something went wrong. Please try again.'
      // Remove the failed user message from history
      conversationHistory.pop()
    })
  }

  function init() {
    if (document.getElementById('ai-chat-btn')) return
    injectStyles()
    buildHTML()
    var btn      = document.getElementById('ai-chat-btn')
    var box      = document.getElementById('ai-chat-box')
    var header   = document.getElementById('ai-chat-header')
    var close    = document.getElementById('ai-chat-close')
    var messages = document.getElementById('ai-chat-messages')
    var input    = document.getElementById('ai-chat-input')
    var send     = document.getElementById('ai-chat-send')
    var resizer  = document.getElementById('ai-resize-handle')

    btn.addEventListener('click', function() { box.classList.toggle('open') })
    close.addEventListener('click', function() { box.classList.remove('open') })
    send.addEventListener('click', function() { askQuestion(messages, input) })
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askQuestion(messages, input) }
    })

    makeDraggable(box, header)
    makeResizable(box, resizer)
    makeButtonDraggable(btn)
  }

  function tryInit() {
    if (document.querySelector('.section-block')) { init() }
  }

  tryInit()
  setTimeout(tryInit, 500)
  setTimeout(tryInit, 1500)
  setTimeout(tryInit, 3000)

  var observer = new MutationObserver(tryInit)
  observer.observe(document.body, { childList: true, subtree: true })

})()

(function () {
  const WORKER_URL = 'https://n8n-production-b7424.up.railway.app/webhook/chat'

  function cssVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  }

  function injectStyles() {
    const primary   = cssVar('--color-primary',            '#4f46e5')
    const onPrimary = cssVar('--color-on-primary',         '#ffffff')
    const surface   = cssVar('--color-surface',            '#ffffff')
    const onSurface = cssVar('--color-on-surface-variant', '#444444')
    const border    = cssVar('--color-border',             '#e2e8f0')
    const radius    = cssVar('--radius-md',                '12px')
    const shadow    = cssVar('--shadow-lg',                '0 8px 30px rgba(0,0,0,0.15)')
    const font      = cssVar('--font-sans',                'sans-serif')

    const style = document.createElement('style')
    style.textContent = `
      #ai-chat-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        background: ${primary}; color: ${onPrimary};
        border: none; border-radius: 50px;
        padding: 12px 20px; font-size: 15px; font-family: ${font};
        cursor: pointer; box-shadow: ${shadow}; transition: opacity 0.2s;
      }
      #ai-chat-btn:hover { opacity: 0.85; }
      #ai-chat-box {
        display: none; position: fixed; bottom: 80px; right: 24px; z-index: 9999;
        width: 340px; max-height: 520px; background: ${surface};
        border-radius: ${radius}; box-shadow: ${shadow};
        overflow: hidden; flex-direction: column; font-family: ${font}; resize: both;
      }
      #ai-chat-box.open { display: flex; }
      #ai-chat-header {
        background: ${primary}; color: ${onPrimary};
        padding: 12px 16px; font-weight: 600; font-size: 14px;
        cursor: grab; display: flex; justify-content: space-between; align-items: center;
        user-select: none;
      }
      #ai-chat-header:active { cursor: grabbing; }
      #ai-chat-close {
        background: none; border: none; color: ${onPrimary};
        font-size: 18px; cursor: pointer; padding: 0 4px; line-height: 1;
      }
      #ai-chat-messages {
        flex: 1; overflow-y: auto; padding: 12px;
        display: flex; flex-direction: column; gap: 8px;
      }
      .user-msg {
        max-width: 85%; padding: 8px 12px; border-radius: ${radius};
        background: ${primary}; color: ${onPrimary}; align-self: flex-end;
        font-size: 13px; line-height: 1.5; border-bottom-right-radius: 4px;
      }
      .ai-msg {
        max-width: 85%; padding: 8px 12px; border-radius: ${radius};
        background: ${border}; color: ${onSurface}; align-self: flex-start;
        font-size: 13px; line-height: 1.5; border-bottom-left-radius: 4px;
      }
      .ai-msg.thinking { opacity: 0.6; font-style: italic; }
      #ai-chat-input-row {
        display: flex; border-top: 1px solid ${border}; padding: 10px; gap: 8px;
      }
      #ai-chat-input {
        flex: 1; border: 1px solid ${border}; border-radius: ${radius};
        padding: 8px 10px; font-size: 13px; font-family: ${font};
        outline: none; resize: none; background: ${surface}; color: ${onSurface};
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

  function getLectureText() {
    const blocks = document.querySelectorAll('.section-block')
    if (blocks.length) {
      return Array.from(blocks).map(function(el) { return el.innerText }).join('\n\n').slice(0, 8000)
    }
    return (document.querySelector('main') || document.body).innerText.slice(0, 8000)
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
      '</div>'
    )
  }

  function makeDraggable(el, handle) {
    var x = 0, y = 0, startX = 0, startY = 0
    handle.addEventListener('mousedown', function(e) {
      e.preventDefault()
      startX = e.clientX - x
      startY = e.clientY - y
      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', drag)
      })
    })
    function drag(e) {
      x = e.clientX - startX
      y = e.clientY - startY
      el.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    }
  }

  function addMsg(messages, text, type) {
    var div = document.createElement('div')
    div.className = type === 'user' ? 'user-msg' : 'ai-msg'
    div.textContent = text
    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
    return div
  }

  function askQuestion(messages, input) {
  var question = input.value.trim()
  if (!question) return
  input.value = ''
  addMsg(messages, question, 'user')
  var thinking = addMsg(messages, 'Thinking...', 'ai')
  thinking.classList.add('thinking')
  fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: question, lectureText: getLectureText() })
  })
  .then(function(res) { return res.text() })
  .then(function(text) {
    thinking.classList.remove('thinking')
    // Handle both plain text and JSON responses
    try {
      var data = JSON.parse(text)
      thinking.textContent = data.answer || text
    } catch(e) {
      thinking.textContent = text
    }
  })
  .catch(function() {
    thinking.classList.remove('thinking')
    thinking.textContent = 'Something went wrong. Please try again.'
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
    btn.addEventListener('click', function() { box.classList.toggle('open') })
    close.addEventListener('click', function() { box.classList.remove('open') })
    send.addEventListener('click', function() { askQuestion(messages, input) })
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askQuestion(messages, input) }
    })
    makeDraggable(box, header)
  }

  function tryInit() {
    if (document.querySelector('.section-block')) {
      init()
    }
  }

  // Try immediately
  tryInit()

  // Try after app finishes rendering
  setTimeout(tryInit, 500)
  setTimeout(tryInit, 1500)
  setTimeout(tryInit, 3000)

  // Watch for dynamic changes
  var observer = new MutationObserver(tryInit)
  observer.observe(document.body, { childList: true, subtree: true })

})()

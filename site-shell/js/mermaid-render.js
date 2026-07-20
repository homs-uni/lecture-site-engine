/**
 * Thin client wrapper around Mermaid.js (CDN).
 * Docs: https://mermaid.js.org/config/usage.html
 */

function isDarkMode() {
  return document.documentElement.classList.contains('dark');
}

function whenMermaidReady(timeoutMs = 8000) {
  if (window.mermaid) return Promise.resolve(true);
  return new Promise((resolve) => {
    const t0 = Date.now();
    const id = setInterval(() => {
      if (window.mermaid) {
        clearInterval(id);
        resolve(true);
        return;
      }
      if (Date.now() - t0 > timeoutMs) {
        clearInterval(id);
        resolve(false);
      }
    }, 40);
  });
}

/**
 * Hydrate `.mermaid` nodes under `root` via mermaid.run().
 * @param {ParentNode} [root=document]
 */
export async function initMermaid(root = document) {
  const ready = await whenMermaidReady();
  if (!ready || !window.mermaid) return;

  const nodes = [...root.querySelectorAll('.mermaid')];
  if (!nodes.length) return;

  // Keep original source so theme toggle can re-run.
  for (const el of nodes) {
    if (!el.dataset.mermaidSource) {
      el.dataset.mermaidSource = el.textContent || '';
    } else {
      el.removeAttribute('data-processed');
      el.removeAttribute('data-mermaid-processed');
      el.textContent = el.dataset.mermaidSource;
    }
  }

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: isDarkMode() ? 'dark' : 'default',
    fontFamily: "'Noto Naskh Arabic', 'Source Serif 4', serif",
  });

  try {
    await window.mermaid.run({ nodes });
  } catch {
    /* mermaid surfaces per-diagram errors in the node itself */
  }
}

/** Re-run after dark/light theme toggle. */
export function refreshMermaid(root = document) {
  return initMermaid(root);
}

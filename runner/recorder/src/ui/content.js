// runner/recorder/src/ui/content.js
(function () {
  const sessionId = Date.now().toString();
  const now = () => performance.now();

  function selectorFor(el) {
    if (!el) return null;
    if (el.id) return `#${el.id}`;
    const dt = el.getAttribute?.('data-testid');
    if (dt) return `[data-testid="${dt}"]`;
    if (el.name) return `${el.tagName.toLowerCase()}[name="${el.name}"]`;
    const path = [];
    let node = el;
    while (node && node.nodeType === Node.ELEMENT_NODE && node !== document.body) {
      const index = Array.from(node.parentNode.children).indexOf(node) + 1;
      path.unshift(`${node.tagName.toLowerCase()}:nth-child(${index})`);
      node = node.parentNode;
    }
    return path.length ? path.join(' > ') : el.tagName.toLowerCase();
  }

  function record(event) {
    const payload = { sessionId, ts: now(), ...event };
    chrome.runtime.sendMessage({ __recorder__: true, payload });
  }

  document.addEventListener('click', (e) => {
    record({ type: 'click', selector: selectorFor(e.target), button: e.button });
  }, true);

  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t && 'value' in t) {
      record({ type: 'input', selector: selectorFor(t), value: t.value });
    }
  }, true);

  document.addEventListener('keydown', (e) => {
    record({ type: 'keydown', selector: selectorFor(e.target), key: e.key });
  }, true);

  let lastUrl = location.href;
  const checkNav = () => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      record({ type: 'navigation', url: lastUrl });
    }
  };
  new MutationObserver(checkNav).observe(document, { childList: true, subtree: true });

  record({ type: 'page_load', url: location.href });
})();


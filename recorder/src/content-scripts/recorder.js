// Content script - records user interactions with resilient selectors
let isRecording = false;

function getAccessibleName(el) {
  const label = el.getAttribute('aria-label');
  if (label) return label.trim();
  if (el.labels && el.labels.length) return el.labels[0].textContent.trim();
  if (el.id) {
    const labelFor = document.querySelector(`label[for="${el.id}"]`);
    if (labelFor) return labelFor.textContent.trim();
  }
  return '';
}

function cssPath(el) {
  if (!(el instanceof Element)) return '';
  const parts = [];
  let node = el;
  while (node && node.nodeType === Node.ELEMENT_NODE && parts.length < 6) {
    let selector = node.nodeName.toLowerCase();
    if (node.id) {
      selector += `#${node.id}`;
      parts.unshift(selector);
      break;
    } else {
      let sibling = node;
      let nth = 1;
      while ((sibling = sibling.previousElementSibling)) {
        if (sibling.nodeName.toLowerCase() === selector) nth++;
      }
      selector += `:nth-of-type(${nth})`;
    }
    parts.unshift(selector);
    node = node.parentElement;
  }
  return parts.join(' > ');
}

function getSelector(el) {
  if (!el || !(el instanceof Element)) return '';

  const testId = el.getAttribute('data-testid') || el.getAttribute('data-test-id') || el.getAttribute('data-qa');
  if (testId) return `[data-testid="${testId}"]`;

  if (el.id) return `#${el.id}`;

  const role = el.getAttribute('role');
  const accessibleName = getAccessibleName(el);
  if (role && accessibleName) {
    return `role=${role}[name="${accessibleName}"]`;
  }

  if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') {
    const text = (el.textContent || '').trim();
    if (text) return `role=button[name="${text.slice(0, 60)}"]`;
  }

  const placeholder = el.getAttribute('placeholder');
  if (placeholder) return `[placeholder="${placeholder}"]`;

  const name = el.getAttribute('name');
  if (name) return `[name="${name}"]`;

  return cssPath(el);
}

function isPasswordField(el) {
  return el.tagName === 'INPUT' && (el.type || '').toLowerCase() === 'password';
}

function sendEvent(event) {
  chrome.runtime.sendMessage({ type: 'RECORD_EVENT', event }).catch(() => {});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'START_RECORDING') {
    isRecording = true;
  } else if (request.type === 'STOP_RECORDING') {
    isRecording = false;
  } else if (request.type === 'IS_RECORDING') {
    sendResponse({ isRecording });
  }
  return true;
});

document.addEventListener(
  'click',
  (e) => {
    if (!isRecording) return;
    const el = e.target;
    const selector = getSelector(el);
    if (!selector) return;

    sendEvent({
      type: 'click',
      selector,
      tagName: el.tagName,
      text: (el.textContent || '').trim().slice(0, 80),
      timestamp: Date.now(),
    });

    const original = el.style.outline;
    el.style.outline = '2px solid #4CAF50';
    setTimeout(() => {
      el.style.outline = original;
    }, 400);
  },
  true
);

document.addEventListener(
  'change',
  (e) => {
    if (!isRecording) return;
    const el = e.target;
    if (!el || !['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return;

    const selector = getSelector(el);
    if (!selector) return;

    const masked = isPasswordField(el);
    const value = masked ? '\u2022\u2022\u2022\u2022\u2022\u2022' : el.value;

    sendEvent({
      type: 'fill',
      selector,
      value,
      masked,
      tagName: el.tagName,
      timestamp: Date.now(),
    });
  },
  true
);

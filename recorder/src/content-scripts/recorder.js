(() => {
  let isRecording = false;
  let capturedEvents = [];
  const stateKey = 'testcraft-state';

  function getSelector(el) {
    if (el.id) return `#${el.id}`;
    if (el.className && typeof el.className === 'string' && el.className.trim()) {
      const cls = el.className.trim().split(/\s+/).slice(0, 2).join('.');
      return `${el.tagName.toLowerCase()}.${cls}`;
    }
    return el.tagName.toLowerCase();
  }

  function captureEvent(type, target) {
    const event = { type, selector: getSelector(target), timestamp: Date.now() };
    capturedEvents.push(event);
    chrome.runtime.sendMessage({ type: 'RECORDED_EVENT', event });
    chrome.storage.local.set({ [stateKey]: { isRecording: true, events: capturedEvents } });
  }

  function handleClick(event) {
    if (!isRecording) return;
    captureEvent('click', event.target);
  }

  function handleInput(event) {
    if (!isRecording) return;
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      captureEvent('input', event.target);
    }
  }

  function handleNavigate() {
    if (!isRecording) return;
    captureEvent('navigate', document.documentElement);
  }

  async function restoreState() {
    const state = await new Promise((resolve) => chrome.storage.local.get([stateKey], (v) => resolve(v[stateKey])));
    if (state?.isRecording) {
      isRecording = true;
      capturedEvents = state.events || [];
    }
  }

  async function startRecording() {
    isRecording = true;
    capturedEvents = [];
    document.addEventListener('click', handleClick, true);
    document.addEventListener('input', handleInput, true);
    window.addEventListener('popstate', handleNavigate);
    window.addEventListener('hashchange', handleNavigate);
    chrome.storage.local.set({ [stateKey]: { isRecording: true, events: [] } });
    chrome.runtime.sendMessage({ type: 'STATE_CHANGED', isRecording: true, events: [] });
  }

  async function stopRecording() {
    isRecording = false;
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('input', handleInput, true);
    window.removeEventListener('popstate', handleNavigate);
    window.removeEventListener('hashchange', handleNavigate);
    chrome.storage.local.set({ [stateKey]: { isRecording: false, events: capturedEvents } });
    chrome.runtime.sendMessage({ type: 'STATE_CHANGED', isRecording: false, events: capturedEvents });
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'START_RECORDING') startRecording();
    if (message.type === 'STOP_RECORDING') stopRecording();
  });

  restoreState();
})();

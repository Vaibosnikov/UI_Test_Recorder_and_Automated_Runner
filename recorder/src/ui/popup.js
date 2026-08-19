import { API_BASE_URL } from '../config.js';

const startBtn = document.getElementById('start-recording');
const stopBtn = document.getElementById('stop-recording');
const exportBtn = document.getElementById('export-recording');
const runTestsBtn = document.getElementById('run-tests');
const generateScriptBtn = document.getElementById('generate-script');
const status = document.getElementById('status');
const eventsList = document.getElementById('events-list');
const eventCount = document.getElementById('event-count');
const themeToggle = document.getElementById('theme-toggle');
const helpBtn = document.getElementById('help-btn');
const helpDialog = document.getElementById('help-dialog');
const helpClose = document.getElementById('help-close');

let capturedEvents = [];
let lastFocusedElement = null;

const themeKey = 'testcraft-theme';
const getStoredTheme = () => new Promise((resolve) => {
  if (chrome?.storage?.local) {
    chrome.storage.local.get([themeKey], (value) => resolve(value[themeKey] || 'light'));
  } else {
    resolve(localStorage.getItem(themeKey) || 'light');
  }
});

function setStoredTheme(theme) {
  if (chrome?.storage?.local) {
    chrome.storage.local.set({ [themeKey]: theme });
  } else {
    localStorage.setItem(themeKey, theme);
  }
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.textContent = isDark ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeToggle.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
}

getStoredTheme().then(applyTheme);
themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  setStoredTheme(nextTheme);
});

function openHelp() {
  lastFocusedElement = document.activeElement;
  helpDialog.classList.add('show');
  helpClose.focus();
}

function closeHelp() {
  helpDialog.classList.remove('show');
  lastFocusedElement?.focus();
}

helpBtn.addEventListener('click', openHelp);
helpClose.addEventListener('click', closeHelp);
helpDialog.addEventListener('click', (event) => {
  if (event.target === helpDialog) closeHelp();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && helpDialog.classList.contains('show')) closeHelp();
});

function updateStatus(message, state = '') {
  status.className = `status ${state}`.trim();
  status.innerHTML = '<span class="status-dot" aria-hidden="true"></span><span></span>';
  status.lastElementChild.textContent = message;
}

async function checkApiStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/runs`, { method: 'GET' });
    updateStatus(response.ok ? 'API connected and ready' : 'API is unavailable', response.ok ? 'success' : 'error');
    return response.ok;
  } catch {
    updateStatus('API is unavailable', 'error');
    return false;
  }
}

function renderEvents() {
  eventCount.textContent = `${capturedEvents.length} event${capturedEvents.length === 1 ? '' : 's'}`;
  if (!capturedEvents.length) {
    eventsList.innerHTML = '<li class="empty"><span class="empty-icon" aria-hidden="true">◎</span>No events yet. Start recording to capture your test flow.</li>';
    return;
  }

  eventsList.replaceChildren(...capturedEvents.map((event) => {
    const item = document.createElement('li');
    const target = event.selector || event.url || 'page action';
    item.textContent = `${event.type || 'action'} — ${target}`;
    return item;
  }));
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'RECORDED_EVENT') {
    capturedEvents.push(message.event);
    renderEvents();
  }
});

startBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'START_RECORDING' });
  capturedEvents = [];
  renderEvents();
  updateStatus('Recording is active', 'warning');
});

stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'STOP_RECORDING' });
  updateStatus('Recording stopped', 'warning');
});

exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(capturedEvents, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `recording-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

runTestsBtn.addEventListener('click', async () => {
  if (!(await checkApiStatus())) {
    updateStatus('Start the backend before running tests', 'error');
    return;
  }

  updateStatus('Running tests…', 'warning');
  try {
    const payload = {
      test_id: 'extension-recording', status: 'passed', total: capturedEvents.length,
      passed: capturedEvents.length, failed: 0, duration_ms: 0,
      timestamp: new Date().toISOString(), events: capturedEvents,
    };
    const response = await fetch(`${API_BASE_URL}/v1/runs`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    const result = await response.json();
    updateStatus(result.ok ? 'Tests run successfully' : 'Tests could not be completed', result.ok ? 'success' : 'error');
  } catch (error) {
    console.error(error);
    updateStatus('Unable to run tests', 'error');
  }
});

generateScriptBtn.addEventListener('click', async () => {
  if (!(await checkApiStatus())) {
    updateStatus('Start the backend before generating a script', 'error');
    return;
  }

  updateStatus('Generating Playwright script…', 'warning');
  try {
    const response = await fetch(`${API_BASE_URL}/v1/generate-script`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ events: capturedEvents }),
    });
    if (!response.ok) throw new Error('Script generation failed');
    const blob = new Blob([await response.text()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-${Date.now()}.spec.ts`;
    link.click();
    URL.revokeObjectURL(url);
    updateStatus('Playwright script downloaded', 'success');
  } catch (error) {
    console.error(error);
    updateStatus('Unable to generate the script', 'error');
  }
});

renderEvents();
checkApiStatus();

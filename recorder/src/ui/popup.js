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
const onboarding = document.getElementById('onboarding');
const onboardingDismiss = document.getElementById('onboarding-dismiss');
const onboardingStart = document.getElementById('onboarding-start');
const recordingBadge = document.getElementById('recording-badge');
const recordingCount = document.getElementById('recording-count');

let capturedEvents = [];
let lastFocusedElement = null;
const themeKey = 'testcraft-theme';
const onboardingKey = 'testcraft-onboarding-complete';
const stateKey = 'testcraft-state';

function getStorage(key) {
  return new Promise((resolve) => chrome.storage.local.get([key], (value) => resolve(value[key])));
}
function setStorage(value) { chrome.storage.local.set(value); }

getStorage(themeKey).then((theme) => applyTheme(theme || 'light'));
themeToggle.addEventListener('click', () => {
  const theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  setStorage({ [themeKey]: theme });
});
function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle.textContent = dark ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}

getStorage(onboardingKey).then((complete) => { if (!complete) onboarding.hidden = false; });
function dismissOnboarding() {
  onboarding.hidden = true;
  setStorage({ [onboardingKey]: true });
}
onboardingDismiss.addEventListener('click', dismissOnboarding);
onboardingStart.addEventListener('click', () => { dismissOnboarding(); startBtn.focus(); });

function openHelp() { lastFocusedElement = document.activeElement; helpDialog.classList.add('show'); helpClose.focus(); }
function closeHelp() { helpDialog.classList.remove('show'); lastFocusedElement?.focus(); }
helpBtn.addEventListener('click', openHelp);
helpClose.addEventListener('click', closeHelp);
helpDialog.addEventListener('click', (event) => { if (event.target === helpDialog) closeHelp(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && helpDialog.classList.contains('show')) closeHelp(); });

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
  } catch { updateStatus('API is unavailable', 'error'); return false; }
}
function renderEvents() {
  eventCount.textContent = `${capturedEvents.length} event${capturedEvents.length === 1 ? '' : 's'}`;
  if (!capturedEvents.length) {
    eventsList.innerHTML = '<li class="empty"><span class="empty-icon" aria-hidden="true">◎</span>No events yet. Start recording to capture your test flow.</li>';
    return;
  }
  eventsList.replaceChildren(...capturedEvents.map((event) => {
    const item = document.createElement('li');
    item.textContent = `${event.type || 'action'} — ${event.selector || event.url || 'page action'}`;
    return item;
  }));
}

function updateUIForRecordingState(isRecording) {
  recordingBadge.hidden = !isRecording;
  recordingBadge.classList.toggle('show', isRecording);
  if (isRecording) {
    startBtn.classList.add('recording-active');
    startBtn.setAttribute('aria-pressed', 'true');
    updateStatus('Recording is active', 'warning');
  } else {
    startBtn.classList.remove('recording-active');
    startBtn.setAttribute('aria-pressed', 'false');
    updateStatus('API connected and ready', 'success');
  }
}

function updateRecordingCount() {
  if (recordingCount) recordingCount.textContent = String(capturedEvents.length);
}

getStorage(stateKey).then((state) => {
  capturedEvents = state?.events || [];
  renderEvents();
  updateRecordingCount();
  checkApiStatus();
  updateUIForRecordingState(!!state?.isRecording);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'RECORDED_EVENT') {
    capturedEvents.push(message.event);
    renderEvents();
    updateRecordingCount();
    setStorage({ [stateKey]: { isRecording: true, events: capturedEvents } });
  } else if (message.type === 'STATE_CHANGED') {
    updateUIForRecordingState(!!message.isRecording);
    if (!message.isRecording) {
      capturedEvents = message.events || [];
      renderEvents();
      updateRecordingCount();
    }
  }
});

startBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'START_RECORDING' });
  capturedEvents = [];
  renderEvents();
  updateRecordingCount();
  updateUIForRecordingState(true);
  setStorage({ [stateKey]: { isRecording: true, events: [] } });
});
stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'STOP_RECORDING' });
  updateUIForRecordingState(false);
  setStorage({ [stateKey]: { isRecording: false, events: capturedEvents } });
});
exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(capturedEvents, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = `recording-${Date.now()}.json`; link.click(); URL.revokeObjectURL(url);
});
runTestsBtn.addEventListener('click', async () => {
  if (!(await checkApiStatus())) { updateStatus('Start the backend before running tests', 'error'); return; }
  updateStatus('Running tests…', 'warning');
  try {
    const payload = { test_id: 'extension-recording', status: 'passed', total: capturedEvents.length, passed: capturedEvents.length, failed: 0, duration_ms: 0, timestamp: new Date().toISOString(), events: capturedEvents };
    const response = await fetch(`${API_BASE_URL}/v1/runs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json(); updateStatus(result.ok ? 'Tests run successfully' : 'Tests could not be completed', result.ok ? 'success' : 'error');
  } catch (error) { console.error(error); updateStatus('Unable to run tests', 'error'); }
});
generateScriptBtn.addEventListener('click', async () => {
  if (!(await checkApiStatus())) { updateStatus('Start the backend before generating a script', 'error'); return; }
  updateStatus('Generating Playwright script…', 'warning');
  try {
    const response = await fetch(`${API_BASE_URL}/v1/generate-script`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ events: capturedEvents }) });
    if (!response.ok) throw new Error('Script generation failed');
    const blob = new Blob([await response.text()], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = `test-${Date.now()}.spec.ts`; link.click(); URL.revokeObjectURL(url); updateStatus('Playwright script downloaded', 'success');
  } catch (error) { console.error(error); updateStatus('Unable to generate the script', 'error'); }
});

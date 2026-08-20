import { API_BASE_URL } from '../config.js';

const startBtn = document.getElementById('start-recording');
const stopBtn = document.getElementById('stop-recording');
const runTestsBtn = document.getElementById('run-tests');
const generateScriptBtn = document.getElementById('generate-script');
const exportBtn = document.getElementById('export-json');
const clearBtn = document.getElementById('clear-events');
const statusEl = document.getElementById('status');
const indicatorEl = document.getElementById('recording-indicator');
const indicatorLabelEl = document.getElementById('recording-label');
const eventCountEl = document.getElementById('event-count');
const eventsListEl = document.getElementById('events-list');

let capturedEvents = [];

function updateStatus(message, kind = '') {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`.trim();
}

function updateRecordingUI(isRecording) {
  startBtn.disabled = isRecording;
  stopBtn.disabled = !isRecording;
  indicatorEl.classList.toggle('active', isRecording);
  indicatorLabelEl.textContent = isRecording ? 'Recording is active' : 'Not recording';
}

function describeEvent(event) {
  if (event.type === 'navigate') return `Go to ${event.url}`;
  if (event.type === 'click') return `Click ${event.selector || 'element'}`;
  if (event.type === 'fill') return `Fill ${event.selector || 'field'} = ${event.masked ? '••••••' : event.value}`;
  return event.type || 'event';
}

function renderEvents() {
  eventCountEl.textContent = `${capturedEvents.length} event${capturedEvents.length === 1 ? '' : 's'}`;
  const hasEvents = capturedEvents.length > 0;
  generateScriptBtn.disabled = !hasEvents;
  runTestsBtn.disabled = !hasEvents;
  exportBtn.disabled = !hasEvents;
  clearBtn.disabled = !hasEvents;
  eventsListEl.innerHTML = '';

  if (!hasEvents) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No events captured yet. Click Start recording, then interact with the page.';
    eventsListEl.appendChild(empty);
    return;
  }

  capturedEvents.forEach((event, index) => {
    const item = document.createElement('li');
    item.className = 'event-item';
    const meta = document.createElement('span');
    meta.className = 'event-meta';
    meta.textContent = describeEvent(event);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Remove event';
    deleteBtn.addEventListener('click', async () => {
      const response = await chrome.runtime.sendMessage({ type: 'DELETE_EVENT', index });
      capturedEvents = response?.events || [];
      renderEvents();
    });
    item.append(meta, deleteBtn);
    eventsListEl.appendChild(item);
  });
}

async function refreshEvents() {
  const response = await chrome.runtime.sendMessage({ type: 'GET_EVENTS' });
  capturedEvents = response?.events || [];
  renderEvents();
}

async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/runs`);
    updateStatus(response.ok ? 'API connected and ready' : 'API is unavailable', response.ok ? 'ok' : 'error');
  } catch {
    updateStatus('API is unavailable', 'error');
  }
}

startBtn.addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage({ type: 'START_RECORDING' });
  if (response?.ok) {
    updateRecordingUI(true);
    updateStatus('Recording started', 'ok');
    await refreshEvents();
  }
});

stopBtn.addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage({ type: 'STOP_RECORDING' });
  if (response?.ok) {
    updateRecordingUI(false);
    updateStatus('Recording stopped — ready to generate', 'ok');
    await refreshEvents();
  }
});

clearBtn.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'CLEAR_EVENTS' });
  await refreshEvents();
});

exportBtn.addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(capturedEvents, null, 2)], { type: 'application/json' }));
  chrome.downloads.download({ url, filename: 'testcraft-recording.json', saveAs: false });
});

runTestsBtn.addEventListener('click', async () => {
  updateStatus('Sending run to API...');
  try {
    const response = await fetch(`${API_BASE_URL}/v1/runs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ events: capturedEvents }) });
    if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || `HTTP ${response.status}`);
    updateStatus('Run submitted', 'ok');
  } catch (error) {
    updateStatus(`Unable to submit run: ${error.message}`, 'error');
  }
});

generateScriptBtn.addEventListener('click', async () => {
  updateStatus('Generating script...');
  try {
    const response = await fetch(`${API_BASE_URL}/v1/generate-script`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ events: capturedEvents }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.script) throw new Error(data.error || `HTTP ${response.status}`);
    const url = URL.createObjectURL(new Blob([data.script], { type: 'text/plain' }));
    chrome.downloads.download({ url, filename: 'generated-test.spec.ts', saveAs: false });
    updateStatus('Playwright script downloaded', 'ok');
  } catch (error) {
    console.error('Generation error:', error);
    updateStatus(`Unable to generate: ${error.message}`, 'error');
  }
});

(async () => {
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  updateRecordingUI(Boolean(state?.isRecording));
  await refreshEvents();
  await checkApiHealth();
})();

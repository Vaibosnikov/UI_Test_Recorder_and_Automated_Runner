import { API_BASE_URL } from '../config.js';

const startBtn = document.getElementById('start-recording');
const stopBtn = document.getElementById('stop-recording');
const runTestsBtn = document.getElementById('run-tests');
const generateScriptBtn = document.getElementById('generate-script');
const exportBtn = document.getElementById('export-json');
const clearBtn = document.getElementById('clear-events');
const statusEl = document.getElementById('status');
const eventCountEl = document.getElementById('event-count');
const eventsListEl = document.getElementById('events-list');

let capturedEvents = [];

function updateStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = `status ${kind || ''}`.trim();
}

function describeEvent(event) {
  if (event.type === 'navigate') return `Go to ${event.url}`;
  if (event.type === 'click') return `Click ${event.selector}`;
  if (event.type === 'fill') return `Fill ${event.selector} = ${event.masked ? '\u2022\u2022\u2022\u2022\u2022\u2022' : event.value}`;
  return event.type || 'event';
}

function renderEvents() {
  eventCountEl.textContent = `${capturedEvents.length} event${capturedEvents.length === 1 ? '' : 's'}`;
  generateScriptBtn.disabled = capturedEvents.length === 0;
  runTestsBtn.disabled = capturedEvents.length === 0;
  exportBtn.disabled = capturedEvents.length === 0;
  clearBtn.disabled = capturedEvents.length === 0;

  eventsListEl.innerHTML = '';

  if (capturedEvents.length === 0) {
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
    deleteBtn.addEventListener('click', () => deleteEvent(index));

    item.appendChild(meta);
    item.appendChild(deleteBtn);
    eventsListEl.appendChild(item);
  });
}

async function refreshEvents() {
  const response = await chrome.runtime.sendMessage({ type: 'GET_EVENTS' });
  capturedEvents = response?.events || [];
  renderEvents();
}

async function deleteEvent(index) {
  const response = await chrome.runtime.sendMessage({ type: 'DELETE_EVENT', index });
  capturedEvents = response?.events || [];
  renderEvents();
}

async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/runs`, { method: 'GET' });
    updateStatus(response.ok ? 'API connected and ready' : 'API is unavailable', response.ok ? 'ok' : 'error');
    return response.ok;
  } catch {
    updateStatus('API is unavailable', 'error');
    return false;
  }
}

function updateRecordingUI(isRecording) {
  startBtn.disabled = isRecording;
  stopBtn.disabled = !isRecording;
}

startBtn.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'START_RECORDING' });
  updateRecordingUI(true);
  await refreshEvents();
});

stopBtn.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'STOP_RECORDING' });
  updateRecordingUI(false);
  await refreshEvents();
});

clearBtn.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'CLEAR_EVENTS' });
  await refreshEvents();
});

exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(capturedEvents, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: 'testcraft-recording.json', saveAs: false });
});

runTestsBtn.addEventListener('click', async () => {
  updateStatus('Sending run to API...', '');
  try {
    const response = await fetch(`${API_BASE_URL}/v1/runs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: capturedEvents }),
    });
    if (!response.ok) throw new Error('Run request failed');
    updateStatus('Run submitted', 'ok');
  } catch (error) {
    console.error('Run tests error:', error);
    updateStatus('Unable to submit run', 'error');
  }
});

generateScriptBtn.addEventListener('click', async () => {
  updateStatus('Generating script...', '');
  try {
    const response = await fetch(`${API_BASE_URL}/v1/generate-script`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: capturedEvents }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || 'Script generation failed');
    }

    const data = await response.json();
    const blob = new Blob([data.script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename: 'generated-test.spec.ts', saveAs: false });

    updateStatus('Playwright script downloaded', 'ok');
  } catch (error) {
    console.error('Generation error:', error);
    updateStatus('Unable to generate the script', 'error');
  }
});

(async () => {
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  updateRecordingUI(state?.isRecording || false);
  await refreshEvents();
  await checkApiHealth();
})();

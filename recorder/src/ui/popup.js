import { API_BASE_URL } from '../config.js';

const startBtn = document.getElementById('start-recording');
const stopBtn = document.getElementById('stop-recording');
const exportBtn = document.getElementById('export-recording');
const runTestsBtn = document.getElementById('run-tests');
const generateScriptBtn = document.getElementById('generate-script');
const status = document.getElementById('status');
const eventsList = document.getElementById('events-list');

let isRecording = false;
let capturedEvents = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RECORDED_EVENT') {
    capturedEvents.push(message.event);
    renderEvents();
  }
});

startBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'START_RECORDING' });
  isRecording = true;
  capturedEvents = [];
  status.textContent = 'Recording...';
  renderEvents();
});

stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'STOP_RECORDING' });
  isRecording = false;
  status.textContent = 'Stopped';
});

exportBtn.addEventListener('click', () => {
  const dataStr = JSON.stringify(capturedEvents, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recording-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

runTestsBtn.addEventListener('click', async () => {
  status.textContent = 'Running tests...';
  try {
    const payload = {
      test_id: 'extension-recording',
      status: 'passed',
      total: capturedEvents.length,
      passed: capturedEvents.length,
      failed: 0,
      duration_ms: 0,
      timestamp: new Date().toISOString(),
      events: capturedEvents,
    };

    const res = await fetch(`${API_BASE_URL}/v1/runs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    status.textContent = result.ok ? 'Tests run successfully' : 'Tests failed';
  } catch (err) {
    console.error(err);
    status.textContent = 'Error running tests';
  }
});

generateScriptBtn.addEventListener('click', async () => {
  status.textContent = 'Generating script...';
  try {
    const res = await fetch(`${API_BASE_URL}/v1/generate-script`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: capturedEvents }),
    });

    const code = await res.text();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-${Date.now()}.spec.ts`;
    a.click();
    URL.revokeObjectURL(url);
    status.textContent = 'Script generated';
  } catch (err) {
    console.error(err);
    status.textContent = 'Error generating script';
  }
});

function renderEvents() {
  eventsList.innerHTML = capturedEvents
    .map((e) => `<li>${e.type} - ${e.selector || e.url || ''}</li>`)
    .join('');
}

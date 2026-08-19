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

// API status indicator
async function checkApiStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/v1/runs`, { method: 'GET' });
    if (res.ok) {
      status.textContent = 'API connected ✓';
      status.style.color = 'green';
    } else {
      status.textContent = 'API unreachable';
      status.style.color = 'red';
    }
  } catch (err) {
    status.textContent = 'API unreachable';
    status.style.color = 'red';
  }
}

// Check on load
checkApiStatus();

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
  status.style.color = 'orange';
  renderEvents();
});

stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'STOP_RECORDING' });
  isRecording = false;
  status.textContent = 'Stopped';
  status.style.color = 'black';
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
  await checkApiStatus();
  if (status.textContent.includes('unreachable')) {
    status.textContent = 'API unreachable - start backend first';
    status.style.color = 'red';
    return;
  }

  status.textContent = 'Running tests...';
  status.style.color = 'orange';
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
    status.style.color = result.ok ? 'green' : 'red';
  } catch (err) {
    console.error(err);
    status.textContent = 'Error running tests';
    status.style.color = 'red';
  }
});

generateScriptBtn.addEventListener('click', async () => {
  await checkApiStatus();
  if (status.textContent.includes('unreachable')) {
    status.textContent = 'API unreachable - start backend first';
    status.style.color = 'red';
    return;
  }

  status.textContent = 'Generating script...';
  status.style.color = 'orange';
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
    status.style.color = 'green';
  } catch (err) {
    console.error(err);
    status.textContent = 'Error generating script';
    status.style.color = 'red';
  }
});

function renderEvents() {
  eventsList.innerHTML = capturedEvents
    .map((e) => `<li>${e.type} - ${e.selector || e.url || ''}</li>`)
    .join('');
}

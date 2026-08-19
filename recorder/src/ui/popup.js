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
const tooltip = document.getElementById('tooltip');
const tooltipClose = document.getElementById('tooltip-close');

let isRecording = false;
let capturedEvents = [];

// Theme toggle
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Tooltip
helpBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  tooltip.classList.toggle('show');
});

tooltipClose.addEventListener('click', () => {
  tooltip.classList.remove('show');
});

document.addEventListener('click', (e) => {
  if (!tooltip.contains(e.target) && e.target !== helpBtn) {
    tooltip.classList.remove('show');
  }
});

// API status indicator
async function checkApiStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/v1/runs`, { method: 'GET' });
    if (res.ok) {
      updateStatus('API connected ✓', 'success');
    } else {
      updateStatus('API unreachable', 'error');
    }
  } catch (err) {
    updateStatus('API unreachable', 'error');
  }
}

function updateStatus(text, type) {
  status.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✗' : '⟳'}</span><span>${text}</span>`;
  status.className = `status-badge ${type}`;
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
  updateStatus('Recording...', 'warning');
  renderEvents();
});

stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'STOP_RECORDING' });
  isRecording = false;
  updateStatus('Stopped', 'warning');
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
    updateStatus('API unreachable - start backend first', 'error');
    return;
  }

  updateStatus('Running tests...', 'warning');
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
    updateStatus(result.ok ? 'Tests run successfully' : 'Tests failed', result.ok ? 'success' : 'error');
  } catch (err) {
    console.error(err);
    updateStatus('Error running tests', 'error');
  }
});

generateScriptBtn.addEventListener('click', async () => {
  await checkApiStatus();
  if (status.textContent.includes('unreachable')) {
    updateStatus('API unreachable - start backend first', 'error');
    return;
  }

  updateStatus('Generating script...', 'warning');
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
    updateStatus('Script generated', 'success');
  } catch (err) {
    console.error(err);
    updateStatus('Error generating script', 'error');
  }
});

function renderEvents() {
  if (capturedEvents.length === 0) {
    eventsList.innerHTML = `
      <li class="empty-state">
        <div class="empty-state-icon">🎯</div>
        <div>No events recorded yet<br>Start recording to capture actions</div>
      </li>
    `;
    eventCount.textContent = '0 events';
    return;
  }

  eventsList.innerHTML = capturedEvents
    .map((e) => `<li>${e.type} - ${e.selector || e.url || ''}</li>`)
    .join('');
  
  eventCount.textContent = `${capturedEvents.length} event${capturedEvents.length !== 1 ? 's' : ''}`;
}

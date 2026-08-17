// TestCraft Recorder - Popup Script

let isRecording = false;
let capturedEvents = [];

// DOM elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const exportBtn = document.getElementById('export-btn');
const clearBtn = document.getElementById('clear-btn');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const eventCount = document.getElementById('event-count');

// Check recording state on popup open
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_RECORDING_STATE' }, (response) => {
      if (response && response.isRecording) {
        setRecordingState(true);
      }
    });
  }
});

// Start recording
startBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'START_RECORDING' }, (response) => {
        if (response && response.status === 'started') {
          setRecordingState(true);
        }
      });
    }
  });
});

// Stop recording
stopBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'STOP_RECORDING' }, (response) => {
        if (response && response.status === 'stopped') {
          setRecordingState(false);
          capturedEvents = response.events || [];
          eventCount.textContent = capturedEvents.length;
        }
      });
    }
  });
});

// Export events to JSON
exportBtn.addEventListener('click', () => {
  if (capturedEvents.length === 0) {
    alert('No events to export. Start recording first.');
    return;
  }

  const jsonData = JSON.stringify({
    name: 'TestCraft Recording',
    version: '1.0',
    timestamp: Date.now(),
    events: capturedEvents
  }, null, 2);

  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  chrome.downloads.download({
    url: url,
    filename: `testcraft-recording-${Date.now()}.json`,
    saveAs: true
  });
});

// Clear captured events
clearBtn.addEventListener('click', () => {
  capturedEvents = [];
  eventCount.textContent = '0';
});

// Update UI state
function setRecordingState(recording) {
  isRecording = recording;
  
  if (recording) {
    statusIndicator.classList.add('active');
    statusText.textContent = 'Recording...';
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    statusIndicator.classList.remove('active');
    statusText.textContent = 'Not Recording';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

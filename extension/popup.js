// Popup script - handles UI interactions
const API_URL = 'http://localhost:5000';

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const generateBtn = document.getElementById('generateBtn');
const statusDiv = document.getElementById('status');

// Load current state
chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
  if (response) {
    updateUI(response.isRecording, response.hasActions);
  }
});

startBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'START_RECORDING' });
  updateUI(true, false);
});

stopBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'STOP_RECORDING' });
  updateUI(false, true);
});

generateBtn.addEventListener('click', async () => {
  statusDiv.textContent = 'Generating script...';
  statusDiv.className = 'status-generating';
  
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_ACTIONS' });
    const apiResponse = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actions: response.actions })
    });
    
    if (!apiResponse.ok) throw new Error('API error');
    
    const data = await apiResponse.json();
    
    // Download the file
    const blob = new Blob([data.script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: 'generated-test.spec.ts',
      saveAs: false
    });
    
    statusDiv.textContent = 'Script generated!';
    statusDiv.className = 'status-done';
  } catch (error) {
    console.error('Generation error:', error);
    statusDiv.textContent = 'Unable to generate script';
    statusDiv.className = 'status-idle';
  }
});

function updateUI(isRecording, hasActions) {
  startBtn.disabled = isRecording;
  stopBtn.disabled = !isRecording;
  generateBtn.disabled = !hasActions || isRecording;
  
  if (isRecording) {
    statusDiv.textContent = 'Recording...';
    statusDiv.className = 'status-recording';
  } else if (hasActions) {
    statusDiv.textContent = 'Ready to generate';
    statusDiv.className = 'status-idle';
  } else {
    statusDiv.textContent = 'Ready';
    statusDiv.className = 'status-idle';
  }
}

// TestCraft Recorder - Content Script
// Captures user interactions and sends to background script

class TestRecorder {
  constructor() {
    this.isRecording = false;
    this.events = [];
    this.startTime = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'START_RECORDING') {
        this.startRecording();
        sendResponse({ status: 'started' });
      } else if (message.type === 'STOP_RECORDING') {
        const events = this.stopRecording();
        sendResponse({ status: 'stopped', events });
      } else if (message.type === 'GET_RECORDING_STATE') {
        sendResponse({ isRecording: this.isRecording });
      }
      return true; // Keep message channel open for async response
    });
  }

  startRecording() {
    this.isRecording = true;
    this.events = [];
    this.startTime = Date.now();
    console.log('TestCraft: Recording started');
  }

  stopRecording() {
    this.isRecording = false;
    const events = [...this.events];
    this.events = [];
    console.log('TestCraft: Recording stopped, captured', events.length, 'events');
    return events;
  }

  captureEvent(event) {
    if (!this.isRecording) return;

    const recordedEvent = {
      type: event.type,
      timestamp: Date.now() - this.startTime,
      target: this.getSelector(event.target),
      value: event.target.value || null,
      text: event.target.textContent?.slice(0, 100) || null,
      x: event.clientX || 0,
      y: event.clientY || 0
    };

    this.events.push(recordedEvent);
    console.log('TestCraft: Captured event', recordedEvent);
  }

  getSelector(element) {
    if (element.id) {
      return '#' + element.id;
    }
    if (element.className && typeof element.className === 'string') {
      return element.tagName.toLowerCase() + '.' + element.className.split(' ').join('.');
    }
    return element.tagName.toLowerCase();
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => this.captureEvent(e), true);
    document.addEventListener('change', (e) => this.captureEvent(e), true);
    document.addEventListener('input', (e) => this.captureEvent(e), true);
    document.addEventListener('keydown', (e) => this.captureEvent(e), true);
  }
}

// Initialize recorder
const recorder = new TestRecorder();
console.log('TestCraft Recorder initialized');

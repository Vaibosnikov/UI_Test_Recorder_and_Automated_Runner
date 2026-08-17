// TestCraft Recorder - Overlay for visual feedback

class RecorderOverlay {
  constructor() {
    this.overlay = null;
    this.setupOverlay();
  }

  setupOverlay() {
    // Create overlay element
    this.overlay = document.createElement('div');
    this.overlay.id = 'testcraft-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
      display: none;
    `;
    document.body.appendChild(this.overlay);

    // Listen for recording state changes
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'START_RECORDING') {
        this.show();
        sendResponse({ status: 'overlay shown' });
      } else if (message.type === 'STOP_RECORDING') {
        this.hide();
        sendResponse({ status: 'overlay hidden' });
      }
      return true;
    });
  }

  show() {
    if (this.overlay) {
      this.overlay.style.display = 'block';
    }
  }

  hide() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }
}

// Initialize overlay
const overlay = new RecorderOverlay();
console.log('TestCraft Overlay initialized');

// Content script - records user interactions
let isRecording = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'START_RECORDING') {
    isRecording = true;
    console.log('🎬 Recording started');
  } else if (request.type === 'STOP_RECORDING') {
    isRecording = false;
    console.log('⏹️ Recording stopped');
  } else if (request.type === 'IS_RECORDING') {
    sendResponse({ isRecording });
  }
  return true;
});

// Record clicks
document.addEventListener('click', (e) => {
  if (!isRecording) return;
  
  const selector = getSelector(e.target);
  chrome.runtime.sendMessage({
    type: 'ADD_ACTION',
    action: {
      type: 'click',
      selector: selector,
      timestamp: Date.now()
    }
  });
  
  // Visual feedback
  highlightElement(e.target);
});

// Record form fills
document.addEventListener('input', (e) => {
  if (!isRecording) return;
  if (!e.target.tagName || !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
  
  const selector = getSelector(e.target);
  const value = e.target.value;
  
  chrome.runtime.sendMessage({
    type: 'ADD_ACTION',
    action: {
      type: 'fill',
      selector: selector,
      value: value,
      timestamp: Date.now()
    }
  });
});

function getSelector(element) {
  if (element.id) return `#${element.id}`;
  if (element.className) return `.${element.className.split(' ').join('.')}`;
  return element.tagName.toLowerCase();
}

function highlightElement(element) {
  const original = element.style.outline;
  element.style.outline = '2px solid #4CAF50';
  setTimeout(() => {
    element.style.outline = original;
  }, 500);
}

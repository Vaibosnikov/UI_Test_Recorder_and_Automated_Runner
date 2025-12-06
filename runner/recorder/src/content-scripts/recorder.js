let recording = [];
let isRecording = false;

function captureEvent(step) {
  if (!isRecording) return;
  recording.push({
    ...step,
    timestamp: Date.now()
  });
  chrome.runtime.sendMessage({ type: "RECORDER_EVENT", step });
}

function getSelector(element) {
  if (element.id) return `#${element.id}`;
  if (element.dataset && element.dataset.testid)
    return `[data-testid='${element.dataset.testid}']`;
  return element.tagName.toLowerCase();
}

function setupListeners() {
  document.addEventListener("click", (e) => {
    captureEvent({
      type: "click",
      selector: getSelector(e.target)
    });
  });

  document.addEventListener("input", (e) => {
    captureEvent({
      type: "fill",
      selector: getSelector(e.target),
      value: e.target.value
    });
  });

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "RECORDER_START") {
      isRecording = true;
      recording = [];
    }
    if (msg.type === "RECORDER_STOP") {
      isRecording = false;
      chrome.runtime.sendMessage({
        type: "RECORDER_EXPORT",
        events: recording
      });
    }
  });
}

setupListeners();

/**
 * runner/recorder/src/content-scripts/recorder.js
 * Records clicks, inputs and navigation events.
 * Responds to popup messages to avoid message port errors.
 */

let isRecording = false;
let events = [];

function getSelector(el) {
  if (!el) return "";
  if (el.id) return `#${el.id}`;
  const testId = el.getAttribute && el.getAttribute("data-testid");
  if (testId) return `[data-testid="${testId}"]`;
  return el.tagName.toLowerCase();
}

document.addEventListener("click", (e) => {
  if (!isRecording) return;
  events.push({
    type: "click",
    selector: getSelector(e.target)
  });
  chrome.storage.local.set({ lastRecording: events });
});

document.addEventListener("input", (e) => {
  if (!isRecording) return;
  events.push({
    type: "fill",
    selector: getSelector(e.target),
    value: e.target.value
  });
  chrome.storage.local.set({ lastRecording: events });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "RECORDER_START") {
    isRecording = true;
    events = [];
    chrome.storage.local.set({ lastRecording: [] });
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === "RECORDER_STOP") {
    isRecording = false;
    sendResponse({ ok: true, events });
    return true;
  }
});

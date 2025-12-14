/**
 * TestCraft Recorder content script
 * Captures navigation, click, and input events
 */

let recording = false;
let events = [];

function getSelector(el) {
  if (!el) return "";
  if (el.dataset && el.dataset.testid) {
    return `[data-testid="${el.dataset.testid}"]`;
  }
  if (el.id) return `#${el.id}`;
  return el.tagName.toLowerCase();
}

events.push({
  type: "navigate",
  url: location.pathname
});

document.addEventListener("click", (e) => {
  if (!recording) return;
  events.push({
    type: "click",
    selector: getSelector(e.target)
  });
});

document.addEventListener("input", (e) => {
  if (!recording) return;
  if (!e.target.value) return;
  events.push({
    type: "fill",
    selector: getSelector(e.target),
    value: e.target.value
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START") {
    recording = true;
    events = [];
    sendResponse({ status: "recording_started" });
    return true;
  }

  if (msg.type === "STOP") {
    recording = false;
    chrome.storage.local.set({ lastRecording: events });
    sendResponse({ status: "recording_stopped", events });
    return true;
  }
});

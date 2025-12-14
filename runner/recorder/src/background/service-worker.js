/**
 * runner/recorder/src/background/service-worker.js
 * Background service worker receives messages and persists lastRecording in storage.
 * It accumulates events while recording; on RECORDER_EXPORT it writes the final array.
 */

let lastRecording = [];

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "RECORDER_EVENT") {
    lastRecording.push(msg.step);
  }

  if (msg && msg.type === "RECORDER_EXPORT") {
    lastRecording = Array.isArray(msg.events) ? msg.events : lastRecording;
    chrome.storage.local.set({ lastRecording }, () => {
      sendResponse({ status: "stored" });
    });
    return true; // keep sendResponse valid for async
  }

  if (msg && msg.type === "RECORDER_CLEAR") {
    lastRecording = [];
    chrome.storage.local.remove("lastRecording", () => {});
  }
});

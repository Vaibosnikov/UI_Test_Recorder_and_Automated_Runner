let lastRecording = [];

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "RECORDER_EVENT") {
    lastRecording.push(msg.step);
  }

  if (msg.type === "RECORDER_EXPORT") {
    lastRecording = msg.events;
    chrome.storage.local.set({ lastRecording });
  }
});

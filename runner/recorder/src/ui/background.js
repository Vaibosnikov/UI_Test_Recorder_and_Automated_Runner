// runner/recorder/src/ui/background.js
let recording = false;

chrome.runtime.onInstalled.addListener(() => {
  console.log('Recorder installed');
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.cmd === 'start') {
    recording = true;
    chrome.storage.local.set({ events: [] });
    sendResponse({ ok: true });
    return;
  }
  if (msg?.cmd === 'stop') {
    recording = false;
    sendResponse({ ok: true });
    return;
  }
  if (recording && msg?.__recorder__ && msg.payload) {
    chrome.storage.local.get({ events: [] }, (data) => {
      const updated = data.events.concat([msg.payload]);
      chrome.storage.local.set({ events: updated });
    });
    sendResponse({ ok: true });
    return;
  }
});

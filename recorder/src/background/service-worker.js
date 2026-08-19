chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RECORDED_EVENT') {
    chrome.storage.local.get(['testcraft-state'], (result) => {
      const state = result['testcraft-state'] || { isRecording: false, events: [] };
      state.events.push(message.event);
      chrome.storage.local.set({ 'testcraft-state': state });
      sendResponse({ ok: true });
    });
    return true;
  }
  if (message.type === 'STATE_CHANGED') {
    chrome.storage.local.set({ 'testcraft-state': { isRecording: message.isRecording, events: message.events || [] } });
    sendResponse({ ok: true });
    return true;
  }
});

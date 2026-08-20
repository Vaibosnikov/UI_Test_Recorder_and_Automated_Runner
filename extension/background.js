// Background service worker - manages state
let isRecording = false;
let actions = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'START_RECORDING':
      isRecording = true;
      actions = [];
      // Tell all content scripts to start recording
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { type: 'START_RECORDING' }).catch(() => {});
        });
      });
      break;
      
    case 'STOP_RECORDING':
      isRecording = false;
      // Tell all content scripts to stop recording
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { type: 'STOP_RECORDING' }).catch(() => {});
        });
      });
      break;
      
    case 'ADD_ACTION':
      if (isRecording) {
        actions.push(request.action);
      }
      break;
      
    case 'GET_ACTIONS':
      sendResponse({ actions });
      break;
      
    case 'GET_STATE':
      sendResponse({ isRecording, hasActions: actions.length > 0 });
      break;
  }
  return true;
});

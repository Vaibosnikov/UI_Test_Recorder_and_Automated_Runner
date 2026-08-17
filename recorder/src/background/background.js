// Background page script for TestCraft Recorder

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  if (message.type === 'RECORDING_STARTED') {
    console.log('Recording started on tab:', sender.tab?.id);
  }
  
  if (message.type === 'RECORDING_STOPPED') {
    console.log('Recording stopped, events captured:', message.events?.length);
  }
  
  sendResponse({ status: 'ok' });
});

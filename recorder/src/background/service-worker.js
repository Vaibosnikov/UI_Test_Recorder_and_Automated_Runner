// Background service worker - manages recording state and captured events
let isRecording = false;
let events = [];

async function broadcastToTabs(message) {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, message).catch(() => {});
    }
  }
}

async function getActiveTabUrl() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url || '';
  } catch {
    return '';
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch (request.type) {
      case 'START_RECORDING': {
        isRecording = true;
        events = [];
        const url = await getActiveTabUrl();
        if (url) {
          events.push({ type: 'navigate', url, timestamp: Date.now() });
        }
        await broadcastToTabs({ type: 'START_RECORDING' });
        sendResponse({ ok: true });
        break;
      }

      case 'STOP_RECORDING': {
        isRecording = false;
        await broadcastToTabs({ type: 'STOP_RECORDING' });
        sendResponse({ ok: true });
        break;
      }

      case 'RECORD_EVENT': {
        if (isRecording && request.event) {
          events.push(request.event);
        }
        sendResponse({ ok: true });
        break;
      }

      case 'GET_EVENTS': {
        sendResponse({ events });
        break;
      }

      case 'DELETE_EVENT': {
        if (typeof request.index === 'number') {
          events.splice(request.index, 1);
        }
        sendResponse({ events });
        break;
      }

      case 'CLEAR_EVENTS': {
        events = [];
        sendResponse({ events });
        break;
      }

      case 'GET_STATE': {
        sendResponse({ isRecording, hasEvents: events.length > 0, eventCount: events.length });
        break;
      }

      default:
        sendResponse({ ok: false, error: 'Unknown message type' });
    }
  })();
  return true;
});

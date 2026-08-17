// Service worker for TestCraft Recorder (Manifest V3)

// Import background script
import './background.js';

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('TestCraft Recorder installed:', details.reason);
});

// Listen for tab changes to reset recording state if needed
chrome.tabs.onRemoved.addListener((tabId) => {
  // Clean up any recording state for this tab
  console.log('Tab closed:', tabId);
});

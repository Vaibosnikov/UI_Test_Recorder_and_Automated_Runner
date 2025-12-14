/**
 * runner/recorder/src/ui/popup.js
 * Robust popup that ensures recorder content script is injected before messaging.
 */

function updateStatus(text) {
  const el = document.getElementById("status");
  if (el) el.textContent = text;
}

function sendToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) {
      updateStatus("No active tab");
      return;
    }

    const tab = tabs[0];

    if (!tab.url || tab.url.startsWith("chrome://")) {
      updateStatus("Cannot record this page");
      return;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["src/content-scripts/recorder.js"]
      },
      () => {
        chrome.tabs.sendMessage(tab.id, message, (resp) => {
          if (chrome.runtime.lastError) {
            updateStatus("Recorder not injected. Reload page.");
            console.warn(chrome.runtime.lastError.message);
          }
        });
      }
    );
  });
}

document.getElementById("start").addEventListener("click", () => {
  sendToActiveTab({ type: "RECORDER_START" });
  updateStatus("Recording started");
});

document.getElementById("stop").addEventListener("click", () => {
  sendToActiveTab({ type: "RECORDER_STOP" });
  updateStatus("Recording stopped");
});

document.getElementById("export").addEventListener("click", () => {
  chrome.storage.local.get("lastRecording", (data) => {
    const events = data.lastRecording || [];

    const recording = {
      name: "Recorded Flow (TestCraft Recorder)",
      description: "Flow recorded using TestCraft Chrome extension.",
      baseUrl: window.location.origin,
      steps: events
    };

    const blob = new Blob([JSON.stringify(recording, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    chrome.downloads.download(
      { url, filename: "testcraft-recording.json", saveAs: true },
      () => updateStatus("Exported JSON")
    );
  });
});

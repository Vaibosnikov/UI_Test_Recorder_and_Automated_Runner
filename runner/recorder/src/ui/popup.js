/**
 * runner/recorder/src/ui/popup.js
 * Popup behaviour:
 * - Start: send RECORDER_START to active tab
 * - Stop: send RECORDER_STOP to active tab
 * - Export: read lastRecording from storage, convert to generator schema and download
 */

function sendToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) {
      updateStatus("No active tab");
      return;
    }
    chrome.tabs.sendMessage(tabs[0].id, message, (resp) => {
      if (chrome.runtime.lastError) {
        console.warn("Send message error:", chrome.runtime.lastError.message);
      }
    });
  });
}

function updateStatus(text) {
  const el = document.getElementById("status");
  if (el) el.textContent = text;
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
      baseUrl: "http://localhost:5173",
      steps: events.map((ev) => {
        if (ev.type === "click") {
          return { type: "click", selector: ev.selector };
        }
        if (ev.type === "fill") {
          return { type: "fill", selector: ev.selector, value: ev.value };
        }
        if (ev.type === "navigate") {
          return { type: "navigate", url: ev.url };
        }
        // pass-through for unknown step types
        return ev;
      })
    };

    const blob = new Blob([JSON.stringify(recording, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download(
      { url, filename: "testcraft-recording.json", saveAs: true },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Download error:", chrome.runtime.lastError.message);
          updateStatus("Export failed");
        } else {
          updateStatus("Exported JSON");
        }
      }
    );
  });
});

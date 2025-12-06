function sendToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) {
      console.warn("No active tab to send message to");
      return;
    }
    chrome.tabs.sendMessage(tabs[0].id, message, () => {
      if (chrome.runtime.lastError) {
        console.warn("Error sending message to tab:", chrome.runtime.lastError.message);
      }
    });
  });
}

document.getElementById("start").onclick = () => {
  sendToActiveTab({ type: "RECORDER_START" });
};

document.getElementById("stop").onclick = () => {
  sendToActiveTab({ type: "RECORDER_STOP" });
};

document.getElementById("export").onclick = async () => {
  chrome.storage.local.get("lastRecording", (data) => {
    const events = data.lastRecording || [];

    // Convert raw events -> script-generator JSON format
    const recording = {
      name: "Recorded Flow (TestCraft Recorder)",
      description: "Flow recorded using TestCraft Chrome extension.",
      baseUrl: "http://localhost:5000",
      steps: events.map((ev) => {
        if (ev.type === "click") {
          return {
            type: "click",
            selector: ev.selector
          };
        }
        if (ev.type === "fill") {
          return {
            type: "fill",
            selector: ev.selector,
            value: ev.value
          };
        }
        // Fallback: keep as is (will be ignored or marked TODO by generator)
        return ev;
      })
    };

    const blob = new Blob([JSON.stringify(recording, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    chrome.downloads.download(
      {
        url,
        filename: "testcraft-recording.json",
        saveAs: true
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Download error:", chrome.runtime.lastError.message);
        } else {
          console.log("Recording exported, downloadId =", downloadId);
        }
      }
    );
  });
};

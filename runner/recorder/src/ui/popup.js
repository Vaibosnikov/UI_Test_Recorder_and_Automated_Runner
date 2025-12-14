function setStatus(text) {
  document.getElementById("status").textContent = text;
}

function withActiveTab(cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) {
      setStatus("No active tab");
      return;
    }

    const tab = tabs[0];
    if (!tab.url.startsWith("http")) {
      setStatus("Unsupported page");
      return;
    }

    cb(tab);
  });
}

function injectAndSend(tab, message) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["src/content-scripts/recorder.js"]
    },
    () => {
      chrome.tabs.sendMessage(tab.id, message, () => {
        if (chrome.runtime.lastError) {
          setStatus("Reload page and retry");
        }
      });
    }
  );
}

document.getElementById("start").onclick = () => {
  withActiveTab((tab) => {
    injectAndSend(tab, { type: "START" });
    setStatus("Recording started");
  });
};

document.getElementById("stop").onclick = () => {
  withActiveTab((tab) => {
    injectAndSend(tab, { type: "STOP" });
    setStatus("Recording stopped");
  });
};

document.getElementById("export").onclick = () => {
  chrome.storage.local.get("lastRecording", (data) => {
    const recording = {
      name: "Recorded Flow (TestCraft)",
      description: "Captured using TestCraft Recorder",
      baseUrl: location.origin,
      steps: data.lastRecording || []
    };

    const blob = new Blob([JSON.stringify(recording, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url,
      filename: "testcraft-recording.json",
      saveAs: true
    });

    setStatus("Recording exported");
  });
};

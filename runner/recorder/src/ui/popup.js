let steps = 0;
let recording = false;

const statusEl = document.getElementById("status");
const counterEl = document.getElementById("counter");
const recordDot = document.getElementById("recordDot");
const recordText = document.getElementById("recordText");
const errorEl = document.getElementById("error");
const themeToggle = document.getElementById("themeToggle");

function setStatus(text) {
  statusEl.textContent = text;
}

function updateCounter() {
  counterEl.textContent = `Steps: ${steps}`;
}

function setRecording(active) {
  recording = active;
  recordDot.classList.toggle("active", active);
  recordText.textContent = active ? "Recording…" : "Idle";
}

function withActiveTab(cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length || !tabs[0].url.startsWith("http")) {
      errorEl.classList.add("show");
      return;
    }
    errorEl.classList.remove("show");
    cb(tabs[0]);
  });
}

function injectAndSend(tab, message) {
  chrome.scripting.executeScript(
    { target: { tabId: tab.id }, files: ["src/content-scripts/recorder.js"] },
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
  steps = 0;
  updateCounter();
  withActiveTab((tab) => {
    injectAndSend(tab, { type: "START" });
    setRecording(true);
    setStatus("Recording started");
  });
};

document.getElementById("stop").onclick = () => {
  withActiveTab((tab) => {
    injectAndSend(tab, { type: "STOP" });
    setRecording(false);
    setStatus("Recording stopped");
  });
};

document.getElementById("export").onclick = () => {
  chrome.storage.local.get("lastRecording", (data) => {
    const events = data.lastRecording || [];
    steps = events.length;
    updateCounter();

    const blob = new Blob([JSON.stringify({
      name: "Recorded Flow (TestCraft)",
      baseUrl: location.origin,
      steps: events
    }, null, 2)], { type: "application/json" });

    chrome.downloads.download({
      url: URL.createObjectURL(blob),
      filename: "testcraft-recording.json",
      saveAs: true
    });

    setStatus("Exported JSON");
  });
};

/* Theme persistence */
chrome.storage.local.get("theme", (d) => {
  if (d.theme) document.body.dataset.theme = d.theme;
});

themeToggle.onclick = () => {
  const next = document.body.dataset.theme === "light" ? "dark" : "light";
  document.body.dataset.theme = next;
  chrome.storage.local.set({ theme: next });
};

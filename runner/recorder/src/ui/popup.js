let steps = 0;
let recording = false;

const statusEl = document.getElementById("status");
const counterEl = document.getElementById("counter");
const recordDot = document.getElementById("recordDot");
const recordText = document.getElementById("recordText");
const errorEl = document.getElementById("error");
const themeBtn = document.getElementById("themeToggle");

// Existing endpoint (used by Export)
const API_ENDPOINT = "http://localhost:5000/v1/tests";

//  NEW: Convert endpoint (backend generator)
const CONVERT_ENDPOINT = "http://localhost:5000/v1/recordings/run";

//  NEW: Report endpoint
const REPORT_ENDPOINT = "http://localhost:5000/v1/reports/playwright";


/* ---------- Icons ---------- */

const SUN_ICON = `
<svg viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="5"/>
  <g>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </g>
</svg>
`;

const MOON_ICON = `
<svg viewBox="0 0 24 24">
  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
</svg>
`;

/* ---------- Theme ---------- */

function setTheme(theme) {
  document.body.dataset.theme = theme;
  themeBtn.innerHTML = theme === "light" ? MOON_ICON : SUN_ICON;
  chrome.storage.local.set({ theme });
}

chrome.storage.local.get("theme", (d) => {
  setTheme(d.theme || "dark");
});

themeBtn.onclick = () => {
  const next = document.body.dataset.theme === "light" ? "dark" : "light";
  setTheme(next);
};

/* ---------- UI Helpers ---------- */

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

/* ---------- Tab Utilities ---------- */

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
    () => chrome.tabs.sendMessage(tab.id, message)
  );
}

/* ---------- Controls ---------- */

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

/* ---------- EXPORT (unchanged) ---------- */

document.getElementById("export").onclick = () => {
  chrome.storage.local.get("lastRecording", async (data) => {
    const events = data.lastRecording || [];
    steps = events.length;
    updateCounter();

    if (!events.length) {
      setStatus("No steps recorded");
      return;
    }

    const payload = {
      name: "Recorded Flow (TestCraft)",
      description: "Auto-pushed from TestCraft Recorder",
      baseUrl: "http://localhost:5173",
      steps: events
    };

    try {
      setStatus("Uploading…");

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      setStatus("Uploaded to backend");
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    }

    // Local backup download
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });

    chrome.downloads.download({
      url: URL.createObjectURL(blob),
      filename: "testcraft-recording.json",
      saveAs: false
    });
  });
};

/* ---------- ✅ CONVERT TO TEST (FIXED) ---------- */

document.getElementById("convert")?.addEventListener("click", () => {
  chrome.storage.local.get("lastRecording", async (data) => {
    const events = data.lastRecording || [];
    steps = events.length;
    updateCounter();

    if (!events.length) {
      setStatus("No steps recorded");
      return;
    }

    const payload = {
      recording: {
        name: "Recorded Flow (TestCraft)",
        description: "Auto-pushed from TestCraft Recorder",
        baseUrl: "http://localhost:5173",
        steps: events
      }
    };

    try {
      setStatus("Converting to test…");

      const res = await fetch(CONVERT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const result = await res.json();
      setStatus(`Test generated: ${result.spec}`);
    } catch (err) {
      console.error(err);
      setStatus("Convert failed");
    }
  });
});

document.getElementById("run")?.addEventListener("click", async () => {
  try {
    setStatus("Running tests…");

    const res = await fetch(
      "http://localhost:5000/v1/recordings/run-tests",
      { method: "POST" }
    );

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    setStatus("Test run completed");
  } catch (err) {
    console.error(err);
    setStatus("Test run failed");
  }
});

/* ---------- View Playwright Report ---------- */

document.getElementById("report")?.addEventListener("click", async () => {
  try {
    setStatus("Opening Playwright report…");

    const res = await fetch(REPORT_ENDPOINT, {
      method: "POST"
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    setStatus("Playwright report opened");
  } catch (err) {
    console.error(err);
    setStatus("Failed to open report");
  }
});


/* ---------- Dashboard ---------- */

document.getElementById("dashboard")?.addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:5173" });
});

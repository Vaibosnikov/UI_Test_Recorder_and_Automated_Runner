/**
 * recorder.js (MV3 SAFE)
 * Self-contained recorder with default assertions
 */

let recording = false;
let events = [];
let overlayEl = null;

/* ---------- Overlay ---------- */
function showOverlay() {
  if (overlayEl) return;

  overlayEl = document.createElement("div");
  overlayEl.id = "__testcraft_overlay__";
  overlayEl.innerHTML = `
    <div style="
      position:fixed;
      top:12px;
      left:12px;
      z-index:2147483647;
      background:#dc2626;
      color:#fff;
      padding:8px 14px;
      border-radius:999px;
      font-family:system-ui, sans-serif;
      font-size:13px;
      display:flex;
      align-items:center;
      gap:8px;
      box-shadow:0 4px 12px rgba(0,0,0,.3);
    ">
      <span style="
        width:10px;
        height:10px;
        border-radius:50%;
        background:#fff;
        animation:pulse 1s infinite;
      "></span>
      <strong>TestCraft Recording</strong>
    </div>
    <style>
      @keyframes pulse {
        0% { opacity: 1 }
        50% { opacity: .3 }
        100% { opacity: 1 }
      }
    </style>
  `;
  document.documentElement.appendChild(overlayEl);
}

function hideOverlay() {
  overlayEl?.remove();
  overlayEl = null;
}

/* ---------- Selector ---------- */
function getSelector(el) {
  if (!el) return "";
  if (el.id) return "#" + el.id;
  if (el.getAttribute?.("data-testid")) {
    return `[data-testid="${el.getAttribute("data-testid")}"]`;
  }
  return el.tagName.toLowerCase();
}

/* ---------- Storage ---------- */
function save() {
  chrome.storage.local.set({ lastRecording: events });
}

function record(type, payload) {
  events.push({
    type,
    ...payload,
    ts: Date.now()
  });
  save();
}

/* ---------- Click (ASSERT: visible) ---------- */
document.addEventListener(
  "click",
  (e) => {
    if (!recording) return;

    const selector = getSelector(e.target);

    record("click", {
      selector,
      assert: {
        type: "visible",
        target: selector
      }
    });
  },
  true
);

/* ---------- Input ---------- */
document.addEventListener(
  "input",
  (e) => {
    if (!recording) return;

    record("fill", {
      selector: getSelector(e.target),
      value: e.target.value
    });
  },
  true
);

/* ---------- Navigation (ASSERT: url) ---------- */
let lastUrl = location.href;

setInterval(() => {
  if (!recording) return;

  if (location.href !== lastUrl) {
    record("navigate", {
      url: location.href,
      assert: {
        type: "url",
        value: location.href
      }
    });
    lastUrl = location.href;
  }
}, 500);

/* ---------- Messages ---------- */
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.type === "START") {
    recording = true;
    events = [];
    save();
    showOverlay();
    sendResponse({ ok: true });
  }

  if (msg.type === "STOP") {
    recording = false;
    hideOverlay();
    sendResponse({ ok: true, events });
  }
});
/**
 * recorder.js (MV3 SAFE)
 * Smart selector strategy + assertions
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

/* ---------- SMART SELECTOR ---------- */
function getBestSelector(el) {
  if (!el || el.nodeType !== 1) return "";

  // 1️⃣ data-testid
  const testId = el.getAttribute("data-testid");
  if (testId) return `[data-testid="${testId}"]`;

  // 2️⃣ id
  if (el.id) return `#${el.id}`;

  // 3️⃣ name
  const name = el.getAttribute("name");
  if (name) return `[name="${name}"]`;

  // 4️⃣ aria-label
  const aria = el.getAttribute("aria-label");
  if (aria) return `[aria-label="${aria}"]`;

  // 5️⃣ role + text (Playwright compatible)
  const role = el.getAttribute("role");
  const text = el.innerText?.trim();
  if (role && text && text.length < 40) {
    return `role=${role}>>text=${text}`;
  }

  // 6️⃣ fallback: tag + nth-of-type
  const tag = el.tagName.toLowerCase();
  if (!el.parentElement) return tag;

  const siblings = Array.from(el.parentElement.children).filter(
    (e) => e.tagName === el.tagName
  );
  const index = siblings.indexOf(el) + 1;
  return `${tag}:nth-of-type(${index})`;
}

/* ---------- Recorder ---------- */
function save() {
  chrome.storage.local.set({ lastRecording: events });
}

function record(type, payload) {
  events.push({ type, ...payload, ts: Date.now() });
  save();
}

/* ---------- Events ---------- */
document.addEventListener(
  "click",
  (e) => {
    if (!recording) return;

    record("click", {
      selector: getBestSelector(e.target),
      assert: "visible"
    });
  },
  true
);

document.addEventListener(
  "input",
  (e) => {
    if (!recording) return;

    record("fill", {
      selector: getBestSelector(e.target),
      value: e.target.value
    });
  },
  true
);

/* ---------- Navigation ---------- */
let lastUrl = location.href;
setInterval(() => {
  if (!recording) return;

  if (location.href !== lastUrl) {
    record("navigate", {
      url: location.href,
      assert: "url"
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

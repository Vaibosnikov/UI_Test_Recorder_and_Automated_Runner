/**
 * runner/recorder/src/content-scripts/recorder.js
 * Content script that captures simple interactions:
 * - click events (selector heuristics)
 * - input events (value)
 * - navigation events (location changes via pushState/popstate)
 * This script listens to messages RECORDER_START and RECORDER_STOP from popup.
 */

(function() {
  // Simple in-memory recording
  let isRecording = false;
  let events = [];

  function getSelector(el) {
    if (!el) return "";
    if (el.dataset && el.dataset.testid) return `[data-testid="${el.dataset.testid}"]`;
    if (el.id) return `#${el.id}`;
    if (el.className && typeof el.className === "string") {
      // keep only the first class for stability
      const first = el.className.split(" ").find(Boolean);
      if (first) return `${el.tagName.toLowerCase()}.${first}`;
    }
    return el.tagName ? el.tagName.toLowerCase() : "";
  }

  function pushEvent(step) {
    if (!isRecording) return;
    step.timestamp = Date.now();
    events.push(step);
    // optional: send incremental update to background
    chrome.runtime.sendMessage({ type: "RECORDER_EVENT", step });
  }

  // Click capture
  document.addEventListener("click", (e) => {
    try {
      const sel = getSelector(e.target);
      pushEvent({ type: "click", selector: sel });
    } catch (err) {
      // swallow
    }
  }, true);

  // Input capture (change/input)
  document.addEventListener("input", (e) => {
    try {
      const el = e.target;
      const sel = getSelector(el);
      pushEvent({ type: "fill", selector: sel, value: el.value || "" });
    } catch (err) {}
  }, true);

  // Navigation detection (history API and popstate)
  (function() {
    const pushState = history.pushState;
    history.pushState = function(state) {
      pushState.apply(this, arguments);
      if (isRecording) {
        pushEvent({ type: "navigate", url: location.pathname + location.search + location.hash });
      }
    };
    window.addEventListener("popstate", () => {
      if (isRecording) {
        pushEvent({ type: "navigate", url: location.pathname + location.search + location.hash });
      }
    });
  })();

  // Message handlers
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || !msg.type) return;
    if (msg.type === "RECORDER_START") {
      events = [];
      isRecording = true;
      chrome.runtime.sendMessage({ type: "RECORDER_EVENT", step: { type: "meta", msg: "recording_started" }});
      return;
    }
    if (msg.type === "RECORDER_STOP") {
      isRecording = false;
      // send whole recording to background for persistence
      chrome.runtime.sendMessage({ type: "RECORDER_EXPORT", events });
      return;
    }
  });
})();

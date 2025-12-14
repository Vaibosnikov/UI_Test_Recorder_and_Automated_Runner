/**
 * overlay.js
 * Displays recording ribbon on the page
 */

const OVERLAY_ID = "__testcraft_recorder_overlay__";

export function showOverlay() {
  if (document.getElementById(OVERLAY_ID)) return;

  const div = document.createElement("div");
  div.id = OVERLAY_ID;
  div.textContent = "🔴 TestCraft Recording in Progress";
  Object.assign(div.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: "999999",
    background: "#dc2626",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    fontFamily: "system-ui",
    fontSize: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
  });

  document.body.appendChild(div);
}

export function hideOverlay() {
  const el = document.getElementById(OVERLAY_ID);
  if (el) el.remove();
}

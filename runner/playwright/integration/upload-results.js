/**
 * runner/playwright/integration/upload-results.js
 * JSON-only upload: sends { runId, meta } to backend /results/upload.
 */

import fetch from "node-fetch";

const API = (process.env.API_ENDPOINT || "http://localhost:5000").replace(/\/$/, "");
const RUN_ID = process.env.RUN_ID || `local-${Date.now()}`;
const AUTH = process.env.AUTH_TOKEN || "";

async function upload() {
  try {
    console.log(`Uploading results to ${API}/results/upload`);

    const payload = {
      runId: RUN_ID,
      meta: {
        runId: RUN_ID,
        timestamp: Date.now(),
        note: "Artifacts not sent; metadata-only upload."
      }
    };

    const res = await fetch(`${API}/results/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(AUTH ? { Authorization: AUTH } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Upload failed: ${res.status} ${text}`);
    }

    const json = await res.json();
    console.log("Upload successful:", json);
  } catch (err) {
    console.error("Upload error:", err.message);
    process.exit(2);
  }
}

upload();

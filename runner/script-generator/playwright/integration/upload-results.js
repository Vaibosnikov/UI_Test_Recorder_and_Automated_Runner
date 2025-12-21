/**
 * integration/upload-results.js
 * Uploads run metadata to backend.
 *
 * For this project, if the backend does not implement /results/upload yet
 * (returns 404), we treat it as a graceful NO-OP rather than failing.
 */

const API = process.env.API_ENDPOINT || "http://localhost:5173";
const RUN_ID = process.env.RUN_ID || ("local-" + Date.now());

async function main() {
  const url = API + "/results/upload";
  console.log("Uploading results to", url);

  const payload = {
    runId: RUN_ID,
    meta: {
      runId: RUN_ID,
      timestamp: Date.now(),
      note: "Artifacts not sent; metadata-only upload."
    }
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await res.text();

    // Special case: backend doesn't implement this yet – treat as NO-OP success
    if (res.status === 404) {
      console.warn("Results upload endpoint not implemented (404). Treating as no-op success for this run.");
      console.warn("Backend responded with:", text);
      process.exit(0);
    }

    if (!res.ok) {
      console.error("Upload error: status", res.status, text);
      process.exit(1);
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }

    console.log("Upload successful:", json);
  } catch (err) {
    console.error("Upload error:", err.message);
    process.exit(1);
  }
}

main();

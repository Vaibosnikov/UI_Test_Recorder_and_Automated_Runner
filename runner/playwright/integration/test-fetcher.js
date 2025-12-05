/**
 * runner/playwright/integration/test-fetcher.js
 * Fetches generated tests from backend and writes them to runner/playwright/generated/.
 *
 * Robust writing: ensures parent directories exist for returned filenames.
 */

import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

const API = (process.env.API_ENDPOINT || "http://localhost:5000").replace(/\/$/, "");
const OUT_DIR = path.resolve(process.cwd(), "generated");

function normalizeFilename(rawName) {
  if (!rawName) {
    return `test_${Date.now()}.spec.ts`;
  }
  // If backend returns absolute-like paths or starts with "/", strip leading slashes
  const cleaned = rawName.replace(/^\\/,'').replace(/^\//,'');
  // Prevent accidental double "generated/generated" if backend already prefixes "generated/"
  if (cleaned.startsWith("generated/") || cleaned.startsWith("generated\\")) {
    return cleaned.replace(/^generated[\/\\]/, "");
  }
  return cleaned;
}

async function fetchTests() {
  console.log(`Fetching tests from ${API}/v1/tests`);
  const res = await fetch(`${API}/v1/tests`, { headers: { Authorization: process.env.AUTH_TOKEN || "" } });
  if (!res.ok) throw new Error(`Failed to fetch tests: ${res.status}`);
  const body = await res.json();
  const tests = Array.isArray(body) ? body : (body.data || []);
  await fs.mkdir(OUT_DIR, { recursive: true });
  for (const t of tests) {
    const rawFilename = t.filename || t.name || (`test_${Date.now()}.spec.ts`);
    const filename = normalizeFilename(rawFilename);
    const content = t.content || t.spec || "";
    const filePath = path.join(OUT_DIR, filename);
    const dir = path.dirname(filePath);
    // ensure any nested directories exist
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, content, "utf8");
    console.log("Wrote", filePath);
  }
  console.log(`Fetched ${tests.length} tests`);
  return tests.length;
}

(async () => {
  try {
    const n = await fetchTests();
    process.exit(0);
  } catch (err) {
    console.error("Error fetching tests:", err.message);
    process.exit(2);
  }
})();

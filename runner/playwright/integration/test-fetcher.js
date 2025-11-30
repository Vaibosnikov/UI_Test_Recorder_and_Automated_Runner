/**
 * runner/playwright/integration/test-fetcher.js
 * Fetches generated tests from backend and writes them to runner/playwright/generated/.
 *
 * Expected backend endpoint:
 *   GET ${process.env.API_ENDPOINT || 'http://localhost:3000'}/tests/ready
 * Response shape: [{ filename: "generated/login_flow.spec.ts", content: "<file contents>" }, ... ]
 */

import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

const API = (process.env.API_ENDPOINT || "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = path.resolve(process.cwd(), "generated");

async function fetchTests() {
  console.log(`Fetching tests from ${API}/tests/ready`);
  const res = await fetch(`${API}/tests/ready`, { headers: { Authorization: process.env.AUTH_TOKEN || "" } });
  if (!res.ok) throw new Error(`Failed to fetch tests: ${res.status}`);
  const tests = await res.json();
  await fs.mkdir(OUT_DIR, { recursive: true });
  for (const t of tests) {
    const filePath = path.join(OUT_DIR, t.filename);
    await fs.writeFile(filePath, t.content, "utf8");
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

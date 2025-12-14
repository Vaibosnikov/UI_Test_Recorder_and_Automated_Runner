/**
 * Health check for TestCraft Playwright runner.
 * - Checks Node
 * - Checks Playwright
 * - Checks UI (BASE_URL)
 * - Checks API (API_ENDPOINT)
 */

import { execSync } from "child_process";

const UI_URL = process.env.BASE_URL || "http://localhost:5000";
const API_URL = process.env.API_ENDPOINT || "http://localhost:5000/api/health";

function checkNode() {
  try {
    const version = execSync("node -v").toString().trim();
    console.log("✔ Node.js version OK:", version);
  } catch (err) {
    console.log("✘ Node.js not available:", err.message);
  }
}

function checkPlaywright() {
  try {
    execSync("npx playwright --version", { stdio: "ignore" });
    console.log("✔ Playwright installed");
  } catch (err) {
    console.log("✘ Playwright not installed. Run: npm install && npx playwright install");
  }
}

async function checkFetch(url, label) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      console.log("✔", label, "reachable at", url);
    } else {
      console.log("✘", label, "returned status", res.status);
    }
  } catch (err) {
    console.log("✘", label, "unreachable at", url, "-", err.message);
  }
}

(async function run() {
  console.log("\n=== TestCraft Playwright Runner Health Check ===\n");
  checkNode();
  checkPlaywright();
  await checkFetch(UI_URL, "UI");
  await checkFetch(API_URL, "Backend API");
  console.log("\nHealth check complete.\n");
})();

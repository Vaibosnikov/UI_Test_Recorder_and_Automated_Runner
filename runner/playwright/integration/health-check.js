/**
 * runner/playwright/integration/health-check.js
 * Health check for TestCraft runner.
 */

import { execSync } from "child_process";

const UI_URL = process.env.BASE_URL || "http://localhost:3000";
const API_URL = process.env.API_ENDPOINT || "http://localhost:3000/api/health";

async function checkFetch(url, label) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      console.log(` ${label} reachable at ${url}`);
      return true;
    } else {
      console.log(` ${label} returned status: ${res.status}`);
      return false;
    }
  } catch (err) {
    console.log(` ${label} unreachable at ${url}  ${err.message}`);
    return false;
  }
}

function checkNode() {
  try {
    const version = execSync("node -v").toString().trim();
    console.log(` Node.js version OK (${version})`);
  } catch (err) {
    console.log(` Node.js not available  ${err.message}`);
  }
}

function checkPlaywright() {
  try {
    execSync("npx playwright --version", { stdio: "ignore" });
    console.log(" Playwright installed");
  } catch (err) {
    console.log(" Playwright not installed. Run: npx playwright install");
  }
}

(async function run() {
  console.log("\n=== TestCraft Runner Health Check ===\n");
  checkNode();
  checkPlaywright();
  await checkFetch(UI_URL, "UI");
  await checkFetch(API_URL, "Backend API");
  console.log("\nHealth check complete.\n");
})();

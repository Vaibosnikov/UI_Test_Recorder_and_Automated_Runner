/**
 * TestCraft Runner Health Check (ES module)
 * Node 18+ provides global fetch; for older Node you can install node-fetch.
 */

import { execSync } from "child_process";

const UI_URL = process.env.BASE_URL || "http://localhost:3000";
const API_URL = process.env.API_ENDPOINT || "http://localhost:8080/api/health";

async function checkUI() {
  try {
    const res = await fetch(UI_URL);
    if (res.ok) console.log(`✔ UI reachable at ${UI_URL}`);
    else console.log(`✘ UI returned status: ${res.status}`);
  } catch (err) {
    console.log(`✘ UI unreachable at ${UI_URL} — ${err.message}`);
  }
}

async function checkAPI() {
  try {
    const res = await fetch(API_URL);
    if (res.ok) console.log(`✔ Backend API reachable at ${API_URL}`);
    else console.log(`✘ API returned status: ${res.status}`);
  } catch (err) {
    console.log(`✘ Backend API unreachable at ${API_URL} — ${err.message}`);
  }
}

function checkNode() {
  try {
    const version = execSync("node -v").toString().trim();
    console.log(`✔ Node.js version OK (${version})`);
  } catch (err) {
    console.log(`✘ Node.js not available — ${err.message}`);
  }
}

function checkPlaywright() {
  try {
    // spawn a child to check playwright CLI; ignore stdout
    execSync("npx playwright --version", { stdio: "ignore" });
    console.log("✔ Playwright installed");
  } catch (err) {
    console.log("✘ Playwright not installed. Run: npx playwright install");
  }
}

async function run() {
  console.log("\n=== TestCraft Runner Health Check ===\n");
  checkNode();
  checkPlaywright();
  await checkUI();
  await checkAPI();
  console.log("\nHealth check complete.\n");
}

run();

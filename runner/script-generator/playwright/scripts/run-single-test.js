import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project root = playwright/
const PLAYWRIGHT_ROOT = path.resolve(__dirname, "..");

const specArg = process.argv[2];

if (!specArg) {
  console.error("Usage: node scripts/run-single-test.js <spec-path>");
  process.exit(1);
}

const specPath = path.resolve(PLAYWRIGHT_ROOT, specArg);
const configPath = path.join(PLAYWRIGHT_ROOT, "playwright.config.ts");

console.log("Running Playwright test:", specPath);

execSync(
  `npx playwright test "${specPath}" --config "${configPath}"`,
  {
    cwd: PLAYWRIGHT_ROOT,
    stdio: "inherit"
  }
);

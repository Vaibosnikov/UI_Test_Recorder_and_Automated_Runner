/**
 * Runs the full Playwright suite using the configured project.
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  const cmd = [
    "npx",
    "playwright",
    "test",
    "--config",
    path.resolve(__dirname, "..", "config", "playwright.config.ts"),
    "--project=Chromium"
  ].join(" ");

  console.log("Running full Playwright suite…");
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    process.exit(err.status || 1);
  }
}

main();

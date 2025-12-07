/**
 * Runs a single Playwright spec file using the configured project.
 * Usage:
 *   node scripts/run-single-test.js "generated/login_flow.generated.spec.ts"
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function usage() {
  console.log("Usage: node scripts/run-single-test.js <spec-path>");
}

function main() {
  const spec = process.argv[2];
  if (!spec) {
    usage();
    process.exit(1);
  }

  const specPath = path.resolve(__dirname, "..", spec);
  console.log("Running Playwright test:", specPath);

  const cmd = [
    "npx",
    "playwright",
    "test",
    specPath,
    "--config",
    path.resolve(__dirname, "..", "config", "playwright.config.ts"),
    "--project=Chromium"
  ].join(" ");

  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    process.exit(err.status || 1);
  }
}

main();

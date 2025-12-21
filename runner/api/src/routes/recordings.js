import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function runRecording(req, res) {
  try {
    console.log(">>> runRecording HIT");
    const recording = req.body.recording;

    if (
      !recording ||
      !Array.isArray(recording.steps) ||
      !recording.steps.length
    ) {
      return res.status(400).json({ error: "Invalid or empty recording" });
    }

    const ts = Date.now();

    // Current working dir = runner/api
    const root = process.cwd();

    // script-generator root
    const generatorRoot = path.resolve(root, "../script-generator");

    const jsonPath = path.join(
      generatorRoot,
      "samples",
      `recording-${ts}.json`
    );

    const specPath = path.join(
      generatorRoot,
      "playwright",
      "generated",
      `recording-${ts}.spec.ts`
    );

    // 1. Write recording JSON
    fs.writeFileSync(
      jsonPath,
      JSON.stringify(recording, null, 2),
      "utf8"
    );

    // 2. Generate Playwright spec (ONLY generation)
    execSync(
      `node src/cli/generate-from-json.js \
--input samples/recording-${ts}.json \
--output playwright/generated/recording-${ts}.spec.ts`,
      {
        cwd: generatorRoot,
        stdio: "inherit"
      }
    );

    // ❌ DO NOT RUN PLAYWRIGHT HERE
    // Test execution is intentionally decoupled
    // and will be triggered via a separate endpoint.

    res.json({
      status: "generated",
      spec: `recording-${ts}.spec.ts`,
      specPath,
      timestamp: ts
    });
  } catch (err) {
    console.error("Convert error:", err);
    res.status(500).json({ error: err.message });
  }
}
export async function runTests(req, res) {
  try {
    const root = process.cwd(); // runner/api
    const generatorRoot = path.resolve(root, "../script-generator");
    const playwrightRoot = path.join(generatorRoot, "playwright");

    console.log(">>> Running Playwright tests");

    execSync("npx playwright test", {
      cwd: playwrightRoot,
      stdio: "inherit"
    });

    res.json({ status: "run-complete" });
  } catch (err) {
    console.error("Run error:", err);
    res.status(500).json({ error: err.message });
  }
}
export async function openPlaywrightReport(req, res) {
  try {
    const root = process.cwd(); // runner/api
    const generatorRoot = path.resolve(root, "../script-generator");
    const playwrightRoot = path.join(generatorRoot, "playwright");

    console.log(">>> Opening Playwright HTML report");

    execSync("npx playwright show-report", {
      cwd: playwrightRoot,
      stdio: "inherit"
    });

    res.json({ status: "report-opened" });
  } catch (err) {
    console.error("Report open error:", err);
    res.status(500).json({ error: err.message });
  }
}

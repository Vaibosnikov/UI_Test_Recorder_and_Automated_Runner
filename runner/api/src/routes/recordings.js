import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function runRecording(req, res) {
  try {
    const recording = req.body.recording;

    if (!recording || !Array.isArray(recording.steps) || !recording.steps.length) {
      return res.status(400).json({ error: "Invalid or empty recording" });
    }

    const ts = Date.now();

    const root = process.cwd(); 
    // runner/api

    const generatorRoot = path.resolve(root, "../script-generator");
    const jsonPath = path.join(generatorRoot, "samples", `recording-${ts}.json`);
    const specPath = path.join(
      generatorRoot,
      "playwright",
      "generated",
      `recording-${ts}.spec.ts`
    );

    fs.writeFileSync(jsonPath, JSON.stringify(recording, null, 2), "utf8");

    execSync(
      `node src/cli/generate-from-json.js --input samples/recording-${ts}.json --output playwright/generated/recording-${ts}.spec.ts`,
      { cwd: generatorRoot, stdio: "inherit" }
    );

    execSync(
      `npx playwright test generated/recording-${ts}.spec.ts`,
      {
        cwd: path.join(generatorRoot, "playwright"),
        stdio: "inherit"
      }
    );

    res.json({
      status: "success",
      spec: `recording-${ts}.spec.ts`,
      timestamp: ts
    });
  } catch (err) {
    console.error("Run error:", err);
    res.status(500).json({ error: err.message });
  }
}

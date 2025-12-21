import fs from "fs";
import path from "path";

const resultsPath = path.join(
  process.cwd(),
  "results",
  "results.json"
);

const outDir = path.join(process.cwd(), "generated");
const outFile = path.join(outDir, "index.json");

if (!fs.existsSync(resultsPath)) {
  console.error("❌ Playwright results.json not found");
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(resultsPath, "utf8"));
const runs = [];

for (const suite of raw.suites || []) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const result = test.results[0];
      runs.push({
        feature: suite.title || "Recorded Flow",
        test: spec.title,
        status: result.status?.toUpperCase(),
        duration: Math.round((result.duration || 0) / 1000),
        started: result.startTime,
        file: spec.file
      });
    }
  }
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(runs, null, 2));

console.log(`✅ Dashboard index.json generated with ${runs.length} runs`);
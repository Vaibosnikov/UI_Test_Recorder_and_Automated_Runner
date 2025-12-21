import fs from "fs";
import path from "path";
import { parsePlaywrightResults } from "../results/parserResults.ts";
import { detectFlakyTests } from "../results/flakyHeuristics.ts";

const RESULTS_PATH = path.join(
  __dirname,
  "..",
  "playwright-results.json"
);

const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "output",
  "testcraft-run.json"
);

function analyze() {
  // 1. Parse Playwright results (YOU ALREADY WROTE THIS)
  const parsed = parsePlaywrightResults(RESULTS_PATH);

  // parsed should already contain:
  // - summary
  // - recentRuns
  // - durations etc

  // 2. Reuse existing flaky heuristic
  const flakyMatrix = detectFlakyTests(parsed);

  // 3. Combine everything for dashboard
  const dashboardData = {
    summary: parsed.summary,
    recentRuns: parsed.recentRuns,
    statusDistribution: parsed.statusDistribution,
    executionDurations: parsed.executionDurations,
    flakyMatrix
  };

  // 4. Write ONE file for dashboard
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(dashboardData, null, 2)
  );

  console.log("✅ TestCraft dashboard data generated");
}

analyze();

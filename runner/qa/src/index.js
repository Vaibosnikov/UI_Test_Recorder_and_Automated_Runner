import { validateTestSchemas } from "./validators/testSchemaValidator.js";
import { validateRunResults } from "./validators/runResultValidator.js";
import { validateAcceptanceCriteria } from "./validators/acceptanceCriteriaValidator.js";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("\n=== TestCraft QA Validation Started ===\n");

  const summary = {
    testSchema: await validateTestSchemas(),
    runResult: await validateRunResults(),
    acceptanceCriteria: await validateAcceptanceCriteria(),
    timestamp: new Date().toISOString()
  };

  const reportPathJSON = path.join(__dirname, "../reports/qa-summary.json");
  const reportPathTXT = path.join(__dirname, "../reports/qa-summary.txt");

  writeFileSync(reportPathJSON, JSON.stringify(summary, null, 2));
  writeFileSync(
    reportPathTXT,
    `
TestCraft QA Summary
---------------------
Tests Schema Valid: ${summary.testSchema.validCount}
Tests Schema Invalid: ${summary.testSchema.invalidCount}

Run Results Valid: ${summary.runResult.validCount}
Run Results Invalid: ${summary.runResult.invalidCount}

Acceptance Criteria Covered: ${summary.acceptanceCriteria.covered}
Missing Acceptance Criteria: ${summary.acceptanceCriteria.missing}

Timestamp: ${summary.timestamp}
`
  );

  console.log("QA Validation Complete. Reports generated in /runner/qa/reports/");
  console.log("Summary:", summary);
}

main();
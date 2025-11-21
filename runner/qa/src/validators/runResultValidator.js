import { loadJSONFilesFromPath } from "../utils/fileLoader.js";
import chalk from "chalk";

export async function validateRunResults() {
  console.log(chalk.cyan("Validating run results..."));

  const runs = await loadJSONFilesFromPath("./runner/test-data/run-results");

  let validCount = 0;
  let invalidCount = 0;

  for (const run of runs) {
    const ok =
      run.id &&
      run.test_id &&
      ["passed", "failed", "skipped"].includes(run.status) &&
      typeof run.duration_ms === "number";

    if (ok) {
      validCount++;
    } else {
      invalidCount++;
      console.log(chalk.red("Invalid run result entry:", run));
    }
  }

  return { validCount, invalidCount };
}

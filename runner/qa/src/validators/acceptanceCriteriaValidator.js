import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the sample acceptance criteria path relative to this file
const specPath = path.join(__dirname, "../specs/sampleAcceptanceCriteria.json");

export async function validateAcceptanceCriteria() {
  console.log(chalk.cyan("Validating acceptance criteria coverage..."));

  // Read the criteria using absolute path
  let criteria;
  try {
    criteria = JSON.parse(fs.readFileSync(specPath, "utf-8"));
  } catch (err) {
    console.error(chalk.red(`Failed to read acceptance criteria at ${specPath}`));
    throw err;
  }

  // Simulated generated tests list (replace with real lookup later)
  const generated = ["AC-LOGIN-001"];

  let covered = 0;
  let missing = 0;

  for (const c of criteria) {
    if (generated.includes(c.id)) {
      covered++;
    } else {
      missing++;
      console.log(chalk.yellow("Missing criteria:", c.id));
    }
  }

  return { covered, missing };
}

import Ajv from "ajv";
import { loadJSONFilesFromPath } from "../utils/fileLoader.js";
import chalk from "chalk";

const ajv = new Ajv();

const testSchema = {
  type: "object",
  required: ["id", "name", "steps"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    steps: {
      type: "array",
      items: {
        type: "object",
        required: ["action", "selector"],
        properties: {
          action: { type: "string" },
          selector: { type: "string" },
          value: { type: "string" }
        }
      }
    }
  }
};

export async function validateTestSchemas() {
  console.log(chalk.cyan("Validating test schemas..."));

  const tests = await loadJSONFilesFromPath("./runner/test-data/generated-tests");

  let validCount = 0;
  let invalidCount = 0;

  const validate = ajv.compile(testSchema);

  for (const test of tests) {
    if (validate(test)) {
      validCount++;
    } else {
      invalidCount++;
      console.log(chalk.red("Invalid test schema:"), validate.errors);
    }
  }

  return { validCount, invalidCount };
}

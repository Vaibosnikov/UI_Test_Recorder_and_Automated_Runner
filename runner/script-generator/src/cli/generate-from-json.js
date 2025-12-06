/**
 * CLI: generate-from-json.js
 * Reads a recording JSON file and writes a Playwright .spec.ts file.
 *
 * Usage:
 *   node src/cli/generate-from-json.js --input samples/login-flow.json --output ../playwright/generated/login_flow.generated.spec.ts --baseUrl http://localhost:5000
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generatePlaywrightSpec } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const args = {
    input: null,
    output: null,
    baseUrl: null,
    help: false
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--input" && argv[i + 1]) {
      args.input = argv[i + 1];
      i++;
    } else if (arg === "--output" && argv[i + 1]) {
      args.output = argv[i + 1];
      i++;
    } else if (arg === "--baseUrl" && argv[i + 1]) {
      args.baseUrl = argv[i + 1];
      i++;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    }
  }

  return args;
}

function showHelp() {
  console.log("Usage:");
  console.log("  node src/cli/generate-from-json.js --input <recording.json> --output <spec-path> [--baseUrl <url>]");
  console.log("");
  console.log("Example:");
  console.log("  node src/cli/generate-from-json.js --input samples/login-flow.json --output ../playwright/generated/login_flow.generated.spec.ts --baseUrl http://localhost:5000");
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.input || !args.output) {
    showHelp();
    process.exit(args.help ? 0 : 2);
  }

  const inputPath = path.isAbsolute(args.input)
    ? args.input
    : path.resolve(__dirname, "..", "..", args.input.replace(/^[.\/\\\\]+/, ""));
  const outputPath = path.isAbsolute(args.output)
    ? args.output
    : path.resolve(__dirname, "..", "..", args.output.replace(/^[.\/\\\\]+/, ""));

  if (!fs.existsSync(inputPath)) {
    console.error("Input file not found:", inputPath);
    process.exit(2);
  }

  // Read raw bytes and normalise to clean UTF-8 JSON text
  const rawBuffer = fs.readFileSync(inputPath);
  let text = rawBuffer.toString("utf8");

  // Remove BOM if present and trim leading/trailing whitespace
  text = text.replace(/^\uFEFF/, "").trim();

  let recording;
  try {
    recording = JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON recording:", err.message);
    process.exit(2);
  }

  if (args.baseUrl) {
    recording.baseUrl = args.baseUrl;
  }

  const specSource = generatePlaywrightSpec(recording);

  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, specSource, "utf8");
  console.log("Generated spec written to", outputPath);
}

main().catch((err) => {
  console.error("Script generator error:", err.message);
  process.exit(2);
});

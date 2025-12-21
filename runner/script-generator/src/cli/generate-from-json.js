/**
 * CLI: generate-from-json.js
 * Reads a recording JSON file and writes a Playwright .spec.ts file
 * WITH assertions mapped from recorder.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mapAssertion } from "../assertions/assertionMapper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- CLI ARG PARSER ---------- */
function parseArgs(argv) {
  const args = { input: null, output: null, baseUrl: null, help: false };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--input" && argv[i + 1]) {
      args.input = argv[++i];
    } else if (arg === "--output" && argv[i + 1]) {
      args.output = argv[++i];
    } else if (arg === "--baseUrl" && argv[i + 1]) {
      args.baseUrl = argv[++i];
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    }
  }
  return args;
}

function showHelp() {
  console.log(`
Usage:
  node src/cli/generate-from-json.js --input <recording.json> --output <spec.ts> [--baseUrl <url>]
`);
}

/* ---------- SPEC GENERATOR ---------- */
function generateSpec(recording) {
  const lines = [];

  lines.push(`import { test, expect } from "@playwright/test";`);
  lines.push("");
  lines.push(`test("${recording.name || "Recorded Flow"}", async ({ page }) => {`);

  const baseUrl = recording.baseUrl || "";

  for (const step of recording.steps || []) {
    /* ---- NAVIGATE ---- */
    if (step.type === "navigate") {
      const url = step.url.startsWith("http") ? step.url : baseUrl + step.url;
      lines.push(`  await page.goto("${url}");`);

      if (step.assert === "url") {
        const assertion = mapAssertion({
          type: "url",
          value: url
        });
        if (assertion) lines.push("  " + assertion);
      }
    }

    /* ---- CLICK ---- */
    if (step.type === "click") {
      lines.push(`  await page.click("${step.selector}");`);

      if (step.assert) {
        const assertion = mapAssertion({
          type: step.assert,
          target: step.selector
        });
        if (assertion) lines.push("  " + assertion);
      }
    }

    /* ---- FILL ---- */
    if (step.type === "fill") {
      lines.push(
        `  await page.fill("${step.selector}", ${JSON.stringify(step.value)});`
      );
    }
  }

  lines.push("});");
  lines.push("");

  return lines.join("\n");
}

/* ---------- MAIN ---------- */
async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.input || !args.output) {
    showHelp();
    process.exit(args.help ? 0 : 2);
  }

  const inputPath = path.resolve(__dirname, "..", "..", args.input);
  const outputPath = path.resolve(__dirname, "..", "..", args.output);

  if (!fs.existsSync(inputPath)) {
    console.error("Input file not found:", inputPath);
    process.exit(2);
  }

  const raw = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "").trim();

  let recording;
  try {
    recording = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON:", err.message);
    process.exit(2);
  }

  if (args.baseUrl) {
    recording.baseUrl = args.baseUrl;
  }

  const spec = generateSpec(recording);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, spec, "utf8");

  console.log("✅ Playwright spec generated:", outputPath);
}

main().catch((err) => {
  console.error("Generator failed:", err);
  process.exit(2);
});

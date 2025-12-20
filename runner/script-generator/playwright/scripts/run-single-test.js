import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project root = playwright/
const PLAYWRIGHT_ROOT = path.resolve(__dirname, "..");

const specArg = process.argv[2];

if (!specArg) {
  console.error("Usage: node scripts/run-single-test.js <spec-path>");
  process.exit(1);
}

const specPath = path.resolve(PLAYWRIGHT_ROOT, specArg);
const configPath = path.join(PLAYWRIGHT_ROOT, "playwright.config.ts");

// ---------- Visual paths ----------
const VISUAL_ROOT = path.join(PLAYWRIGHT_ROOT, "results", "visual");
const BASELINE_DIR = path.join(VISUAL_ROOT, "baseline");
const CURRENT_DIR = path.join(VISUAL_ROOT, "current");
const DIFF_DIR = path.join(VISUAL_ROOT, "diff");

// ensure dirs
[BASELINE_DIR, CURRENT_DIR, DIFF_DIR].forEach((dir) =>
  fs.mkdirSync(dir, { recursive: true })
);

const testName = path.basename(specPath, ".spec.ts");
const baselineImg = path.join(BASELINE_DIR, `${testName}.png`);
const currentImg = path.join(CURRENT_DIR, `${testName}.png`);
const diffImg = path.join(DIFF_DIR, `${testName}.png`);

console.log("Running Playwright test:", specPath);

// ---------- Run test ----------
try {
  execSync(
    `npx playwright test "${specPath}" --config "${configPath}"`,
    {
      cwd: PLAYWRIGHT_ROOT,
      stdio: "inherit"
    }
  );
} catch (err) {
  console.error("Test execution failed");
}

// ---------- Screenshot handling ----------
const playwrightOutput = path.join(
  PLAYWRIGHT_ROOT,
  "results",
  testName,
  "test-finished.png"
);

// fallback: take latest screenshot
if (fs.existsSync(playwrightOutput)) {
  fs.copyFileSync(playwrightOutput, currentImg);
} else {
  console.warn("⚠ No screenshot found from test run");
}

if (!fs.existsSync(baselineImg)) {
  fs.copyFileSync(currentImg, baselineImg);
  console.log("🟢 Baseline created:", baselineImg);
  process.exit(0);
}

// ---------- Pixel Diff ----------
const img1 = PNG.sync.read(fs.readFileSync(baselineImg));
const img2 = PNG.sync.read(fs.readFileSync(currentImg));

const { width, height } = img1;
const diff = new PNG({ width, height });

const mismatchedPixels = pixelmatch(
  img1.data,
  img2.data,
  diff.data,
  width,
  height,
  { threshold: 0.1 }
);

fs.writeFileSync(diffImg, PNG.sync.write(diff));

if (mismatchedPixels > 0) {
  console.log(`🔴 Visual differences found: ${mismatchedPixels} pixels`);
  console.log("Diff image:", diffImg);
} else {
  console.log("🟢 No visual differences detected");
}

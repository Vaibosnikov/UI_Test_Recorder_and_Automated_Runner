import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root = playwright/
const ROOT = path.resolve(__dirname, "..");

// ---------- Visual folders ----------
const VISUAL_ROOT = path.join(ROOT, "visual");
const BASELINE_DIR = path.join(VISUAL_ROOT, "baseline");
const CURRENT_DIR = path.join(VISUAL_ROOT, "current");
const DIFF_DIR = path.join(VISUAL_ROOT, "diff");

// Ensure dirs exist
[BASELINE_DIR, CURRENT_DIR, DIFF_DIR].forEach(dir =>
  fs.mkdirSync(dir, { recursive: true })
);

// ---------- Run Playwright ----------
console.log("▶ Running Playwright tests...");
execSync("npx playwright test", {
  cwd: ROOT,
  stdio: "inherit"
});

// ---------- Find latest screenshot ----------
const resultsDir = path.join(ROOT, "results");

function findLatestScreenshot(dir) {
  let latest = null;
  let latestTime = 0;

  function walk(folder) {
    for (const file of fs.readdirSync(folder)) {
      const full = path.join(folder, file);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) walk(full);
      else if (file.endsWith(".png") && stat.mtimeMs > latestTime) {
        latest = full;
        latestTime = stat.mtimeMs;
      }
    }
  }

  walk(dir);
  return latest;
}

const latestScreenshot = findLatestScreenshot(resultsDir);

if (!latestScreenshot) {
  console.log("⚠ No screenshots found. Visual diff skipped.");
  process.exit(0);
}

const name = path.basename(latestScreenshot);
const baselineImg = path.join(BASELINE_DIR, name);
const currentImg = path.join(CURRENT_DIR, name);
const diffImg = path.join(DIFF_DIR, name);

// Copy current
fs.copyFileSync(latestScreenshot, currentImg);

// ---------- Baseline logic ----------
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
  console.log(`🔴 Visual regression detected: ${mismatchedPixels} pixels`);
  console.log("Diff:", diffImg);
} else {
  console.log("🟢 No visual differences detected");
}
/**
 * visual-diff.js
 * Compares baseline vs current screenshots using pixelmatch
 */

import fs from "fs";
import path from "path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export function compareScreenshots(baselinePath, currentPath, diffPath) {
  if (!fs.existsSync(baselinePath)) {
    console.log("📸 No baseline found. Creating baseline.");
    fs.copyFileSync(currentPath, baselinePath);
    return { status: "BASELINE_CREATED" };
  }

  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));

  const { width, height } = baseline;
  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return {
    status: mismatchedPixels > 0 ? "VISUAL_DIFF_FOUND" : "NO_DIFF",
    mismatchedPixels
  };
}
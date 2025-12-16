import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

export function compareScreenshots(baselinePath, currentPath, diffPath) {
  if (!fs.existsSync(baselinePath)) {
    fs.copyFileSync(currentPath, baselinePath);
    return { status: "baseline-created" };
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
    status: mismatchedPixels > 0 ? "diff-found" : "no-diff",
    mismatchedPixels
  };
}

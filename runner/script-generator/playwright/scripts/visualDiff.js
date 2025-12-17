import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export function diffImages(baseline, current, output) {
  const img1 = PNG.sync.read(fs.readFileSync(baseline));
  const img2 = PNG.sync.read(fs.readFileSync(current));

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const mismatched = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(output, PNG.sync.write(diff));
  return mismatched;
}
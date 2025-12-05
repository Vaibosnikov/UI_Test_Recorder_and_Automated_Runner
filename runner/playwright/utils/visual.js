/**
 * utils/visual.js
 * Simple visual regression utility using pngjs + pixelmatch.
 *
 * Baseline images are stored at: <repo>/runner/playwright/visual_baselines/
 * Diff images and temp outputs are stored under: <repo>/runner/playwright/results/diffs/
 */

import fs from 'fs/promises';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const BASELINE_DIR = path.resolve(process.cwd(), 'visual_baselines');
const DIFF_DIR = path.resolve(process.cwd(), 'results', 'diffs');

async function ensureDirs() {
  await fs.mkdir(BASELINE_DIR, { recursive: true });
  await fs.mkdir(DIFF_DIR, { recursive: true });
}

/**
 * compareWithBaseline
 * @param {Object} opts
 * @param {String} opts.testName - sanitized test title
 * @param {Buffer} opts.buffer - PNG buffer (from page.screenshot())
 * @param {Number} opts.threshold - numeric threshold (0..1)
 * returns { mismatched, isNewBaseline, diffPath, score }
 */
export async function compareWithBaseline({ testName, buffer, threshold = parseFloat(process.env.VISUAL_THRESHOLD || '0.05') }) {
  await ensureDirs();
  const basePath = path.join(BASELINE_DIR, ${testName}.png);
  const tmpNew = path.join(DIFF_DIR, ${testName}.new.png);
  const diffPath = path.join(DIFF_DIR, ${testName}.diff.png);

  await fs.writeFile(tmpNew, buffer);

  try {
    await fs.access(basePath);
  } catch {
    // baseline doesn't exist  create one, pass test
    await fs.copyFile(tmpNew, basePath);
    return { mismatched: false, isNewBaseline: true, diffPath: null, score: 0 };
  }

  const baseBuf = await fs.readFile(basePath);
  const newBuf = await fs.readFile(tmpNew);

  const basePng = PNG.sync.read(baseBuf);
  const newPng = PNG.sync.read(newBuf);

  if (basePng.width !== newPng.width || basePng.height !== newPng.height) {
    // different dimensions => treat as mismatch
    return { mismatched: true, isNewBaseline: false, diffPath, score: 1 };
  }

  const { width, height } = basePng;
  const diff = new PNG({ width, height });
  const mismatchedPixels = pixelmatch(basePng.data, newPng.data, diff.data, width, height, { threshold: 0.1 });
  const total = width * height;
  const score = mismatchedPixels / total;

  if (score > threshold) {
    await fs.writeFile(diffPath, PNG.sync.write(diff));
    return { mismatched: true, isNewBaseline: false, diffPath, score };
  }
  return { mismatched: false, isNewBaseline: false, diffPath: null, score };
}

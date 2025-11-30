/**
 * scripts/collect-artifacts.js
 * Copies Playwright results to a bundle folder for upload.
 */

import fs from 'fs-extra';
import path from 'path';

const SRC = path.resolve(process.cwd(), 'results');
const DEST = path.resolve(process.cwd(), 'artifacts_bundle');

async function bundle() {
  await fs.remove(DEST);
  await fs.copy(SRC, DEST);
  console.log('Artifacts bundled to', DEST);
}

bundle().catch(err => {
  console.error('Failed to bundle artifacts:', err);
  process.exit(2);
});

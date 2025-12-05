/**
 * scripts/run-single-test.js
 * Runs a single spec file. Usage:
 *   node scripts/run-single-test.js path/to/spec
 *
 * Updated to pass explicit --config path so Playwright loads projects.
 */

import { spawnSync } from 'child_process';
import path from 'path';

const spec = process.argv[2];
if (!spec) {
  console.error('Usage: node scripts/run-single-test.js <spec-path>');
  process.exit(2);
}

const resolved = path.resolve(spec);
console.log('Running single spec:', resolved);

// Include explicit config path so Playwright finds projects
const configPath = path.resolve(process.cwd(), 'config', 'playwright.config.ts');

const args = ['playwright', 'test', resolved, `--config=${configPath}`, '--project=Chromium', '--reporter=html'];
const r = spawnSync('npx', args, { stdio: 'inherit', shell: true });
process.exit(r.status === 0 ? 0 : 1);

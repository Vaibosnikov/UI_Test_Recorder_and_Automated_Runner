/**
 * scripts/run-single-test.js
 * Runs a single spec file. Usage:
 *   node scripts/run-single-test.js path/to/spec
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

const r = spawnSync('npx', ['playwright', 'test', resolved, '--project=Chromium', '--reporter=html'], { stdio: 'inherit', shell: true });
process.exit(r.status === 0 ? 0 : 1);

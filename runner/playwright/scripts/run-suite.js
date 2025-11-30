/**
 * scripts/run-suite.js
 * Orchestrates test fetch (if any), Playwright run, and artifact collection.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const ROOT = process.cwd();
const RESULTS = path.join(ROOT, 'results');

function runPlaywright() {
  console.log('Running Playwright tests...');
  const r = spawnSync('npx', ['playwright', 'test', '--project=Chromium', '--reporter=json,html'], { stdio: 'inherit', shell: true });
  return r.status;
}

function collectArtifacts() {
  console.log('Collecting artifacts...');
  if (!fs.existsSync(RESULTS)) fs.mkdirSync(RESULTS, { recursive: true });
  // Playwright writes to results/ by config; leave as-is
  console.log('Artifacts are located at', RESULTS);
}

function fetchTests() {
  try {
    spawnSync('node', ['integration/test-fetcher.js'], { stdio: 'inherit', shell: true });
  } catch (err) {
    console.warn('test-fetcher step failed (continuing):', err.message);
  }
}

(function main() {
  fetchTests();
  const code = runPlaywright();
  collectArtifacts();
  process.exit(code === 0 ? 0 : 1);
})();

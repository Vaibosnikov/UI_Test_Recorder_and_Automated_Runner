/**
 * scripts/run-suite.js
 * Orchestrates test fetch (if any), Playwright run, and artifact collection.
 *
 * Updated to provide explicit playwright config path.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const ROOT = process.cwd();
const RESULTS = path.join(ROOT, 'results');

function runPlaywright() {
  console.log('Running Playwright tests...');
  const configPath = path.resolve(process.cwd(), 'config', 'playwright.config.ts');
  // pass config explicitly
  const r = spawnSync('npx', ['playwright', 'test', `--config=${configPath}`, '--project=Chromium', '--reporter=json,html'], { stdio: 'inherit', shell: true });
  return r.status;
}

function collectArtifacts() {
  console.log('Collecting artifacts...');
  if (!fs.existsSync(RESULTS)) fs.mkdirSync(RESULTS, { recursive: true });
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

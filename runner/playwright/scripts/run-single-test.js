#!/usr/bin/env node
/**
 * run-single-test.js --name <testFileName>
 * Example: node run-single-test.js --name login_flow.spec.ts
 */
import { spawn } from 'child_process';
import path from 'path';

const argv = process.argv.slice(2);
const nameIdx = argv.indexOf('--name');
const testName = nameIdx >= 0 ? argv[nameIdx + 1] : null;

if (!testName) {
  console.error('Usage: node run-single-test.js --name <spec-file-name>');
  process.exit(2);
}

const cwd = path.resolve(process.cwd(), 'runner', 'playwright');

console.log('Running single test:', testName);

const child = spawn('npx', ['playwright', 'test', testName, '--reporter=list'], {
  cwd,
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  console.log('Playwright single test exit code', code);
  process.exit(code);
});
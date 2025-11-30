#!/usr/bin/env node
/**
 * run-suite.js
 * simple wrapper that runs `npx playwright test` and exits with code
 */
import { spawn } from 'child_process';
import path from 'path';

const cwd = path.resolve(process.cwd(), 'runner', 'playwright');

console.log('Starting Playwright suite from', cwd);

const child = spawn('npx', ['playwright', 'test', '--reporter=list'], {
  cwd,
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  console.log('Playwright process exited with code', code);
  process.exit(code);
});

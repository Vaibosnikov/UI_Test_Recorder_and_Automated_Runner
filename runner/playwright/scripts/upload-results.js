#!/usr/bin/env node
/**
 * upload-results.js
 * Reads runner/playwright/results/summary.json and POSTs it to backend (if API_BASE_URL provided)
 */
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const repoRoot = process.cwd();
const resultsPath = path.join(repoRoot, 'runner', 'playwright', 'results', 'summary.json');
const apiBase = process.env.API_BASE_URL || 'http://localhost:5000';

if (!fs.existsSync(resultsPath)) {
  console.error('No summary.json found at', resultsPath);
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
const url = `${apiBase.replace(/\/$/, '')}/v1/runs/upload-summary`;

console.log('Uploading results summary to', url);

axios.post(url, summary, { timeout: 15000 })
  .then(res => {
    console.log('Upload status:', res.status);
    console.log('Response:', res.data);
    process.exit(0);
  })
  .catch(err => {
    console.error('Upload failed:', err.message || err);
    process.exit(2);
  });

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { ensureDir, resultsDir } from './runner-utils.js';

const base = resultsDir();
ensureDir(base);

console.log('Collecting artifacts from Playwright output directory:', base);

// playright writes results in results/artifacts and report; we'll produce a summary.json
const reportDir = base;
const summaryPath = path.join(reportDir, 'summary.json');

const summary = {
  timestamp: new Date().toISOString(),
  reports: []
};

if (fs.existsSync(reportDir)) {
  const items = fs.readdirSync(reportDir);
  for (const item of items) {
    summary.reports.push(item);
  }
}

fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
console.log('Wrote summary:', summaryPath);

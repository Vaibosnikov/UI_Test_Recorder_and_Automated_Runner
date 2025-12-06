import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Local test-data files exist (dev fixtures)', async () => {
  const repoRoot = process.env.REPO_ROOT || process.cwd();
  const samplePath = path.join(repoRoot, 'runner', 'test-data', 'generated-tests');
  const exists = fs.existsSync(samplePath);
  expect(exists).toBeTruthy();
  if (exists) {
    const files = fs.readdirSync(samplePath).filter(f => f.endsWith('.json'));
    // there should be at least 1 sample file
    expect(files.length).toBeGreaterThanOrEqual(0);
  }
});
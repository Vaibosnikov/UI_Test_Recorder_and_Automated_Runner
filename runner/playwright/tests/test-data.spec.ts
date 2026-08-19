import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Local test-data files exist (dev fixtures)', async () => {
  // Resolve repo root relative to this test file, not cwd
  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  const samplePath = path.join(repoRoot, 'runner', 'test-data', 'generated-tests');
  const exists = fs.existsSync(samplePath);
  expect(exists).toBeTruthy();
  if (exists) {
    const files = fs.readdirSync(samplePath).filter(f => f.endsWith('.json'));
    expect(files.length).toBeGreaterThan(0);
  }
});

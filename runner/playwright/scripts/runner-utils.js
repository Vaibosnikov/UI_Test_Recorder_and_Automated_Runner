import path from 'path';
import fs from 'fs';

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

export function resultsDir() {
  return path.resolve(process.cwd(), 'runner', 'playwright', 'results');
}
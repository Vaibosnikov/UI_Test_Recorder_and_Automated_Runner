#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd(), "runner/test-data");
const canonicalGT = path.join(root, "generated-tests", "canonical");
const canonicalRR = path.join(root, "run-results", "canonical");

const targetGT = path.join(root, "generated-tests");
const targetRR = path.join(root, "run-results");

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".json"));
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  for (const f of files) {
    const src = path.join(srcDir, f);
    const dest = path.join(destDir, f);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

function usage() {
  console.log("Usage: node seed-sample-data.js --target demo|ci");
  process.exit(0);
}

const args = process.argv.slice(2);
if (args.length < 2 || args[0] !== "--target") usage();
const target = args[1];

if (target === "demo" || target === "ci") {
  copyDir(canonicalGT, targetGT);
  copyDir(canonicalRR, targetRR);
  console.log(`Sample data seeded for target: ${target}`);
} else {
  usage();
}

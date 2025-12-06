#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd(), "runner/test-data");
const canonical = path.join(root, "generated-tests", "canonical");
const out = path.join(root, "generated-tests", "ci-regression", "regression-bundle.json");

const files = fs.readdirSync(canonical).filter((f) => f.endsWith(".json"));

const bundle = {
  generated_at: new Date().toISOString(),
  tests: files.map((f) => path.join("..", "canonical", f))
};

fs.writeFileSync(out, JSON.stringify(bundle, null, 2));
console.log("Regression bundle written to:", out);

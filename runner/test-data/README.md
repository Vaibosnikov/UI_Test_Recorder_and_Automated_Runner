# Test Data for TestCraft

This folder provides canonical and example test specifications and run-results for local development, QA, and CI.

## Structure
- `generated-tests/canonical` — authoritative test specs used across teams.
- `generated-tests/ci-regression` — manifests / suites for CI.
- `generated-tests/examples` — simple examples for demos.
- `run-results/canonical` — canonical run outputs to simulate the runner.
- `run-results/examples` — simple demo run outputs.
- `manifests` — JSON schemas for recorder and generated Playwright specs.
- `scripts` — helper scripts to seed and bundle data.

## Quick seed (demo)
From project root:

```bash
node runner/test-data/scripts/seed-sample-data.js --target demo
```
# Playwright Runner (TestCraft)

This runner executes Playwright specs, performs visual regression checks, bundles artifacts and posts results to the backend.

Key commands:
- npm install
- npx playwright install --with-deps
- npm run validate

Environment:
See .env.example

Folder overview:
- config/: Playwright config
- tests/: manual tests (smoke, etc.)
- generated/: recorder-generated specs
- integration/: integration helpers to talk to backend
- scripts/: runner orchestration scripts
- utils/: helper utilities
- results/: Playwright output

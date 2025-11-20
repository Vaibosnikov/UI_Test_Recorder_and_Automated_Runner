# Script Generator

Converts recorded events (click/input) into Playwright test scripts.

- Input: array of events with kind, selector, value/text, url, timestamp
- Output: Playwright spec string ready to save under `playwright/tests/`

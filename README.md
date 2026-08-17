# TestCraft - UI Test Recorder & Automated Runner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-Test%20Automation-blue)](https://playwright.dev)

## What is TestCraft?

TestCraft is a production-ready test automation platform that records user interactions in the browser and automatically converts them into executable Playwright test scripts. Built for QA teams and developers who want to eliminate manual test script writing.

## Core Components

| Component | Description | Location |
|-----------|-------------|----------|
| **Recorder** | Chrome extension that captures user actions and exports to JSON | `recorder/` |
| **Script Generator** | CLI tool that converts recorded JSON to Playwright specs | `runner/script-generator/` |
| **Runner Engine** | Playwright-based test execution with result tracking | `runner/` |
| **Dashboard** | React-based UI for visualizing test runs and results | `runner/web/` |
| **API Server** | Node.js backend for managing tests, runs, and results | `runner/api/` |

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Chrome/Chromium browser

### Installation

```bash
# Clone the repository
git clone https://github.com/Vaibosnikov/UI_Test_Recorder_and_Automated_Runner.git
cd UI_Test_Recorder_and_Automated_Runner

# Install API dependencies
cd runner/api
npm install
cp .env.example .env  # Configure your environment variables

# Install web dashboard dependencies
cd ../web
npm install

# Install script generator dependencies
cd ../script-generator
npm install

# Install recorder dependencies
cd ../../recorder
npm install
```

### Running the Platform

1. **Start the API server** (from `runner/api/`):
   ```bash
   npm run dev
   ```

2. **Start the dashboard** (from `runner/web/`):
   ```bash
   npm run dev
   ```

3. **Load the recorder extension** in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `recorder/` folder

## Documentation

- [Architecture Overview](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [Setup Guide](docs/setup.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contact

For questions or support, open an issue or reach out via the repository discussions.

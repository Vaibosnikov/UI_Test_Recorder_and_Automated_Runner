# TestCraft - UI Test Recorder & Automated Runner

A complete end-to-end testing solution that records browser interactions and automatically generates Playwright test scripts.

![TestCraft](https://img.shields.io/badge/TestCraft-Ready-blue)
![CI](https://github.com/Vaibosnikov/UI_Test_Recorder_and_Automated_Runner/actions/workflows/ci.yml/badge.svg)

## 🎯 Features

### Chrome Extension
- **One-click recording** - Capture clicks, inputs, and navigation
- **Smart selectors** - Generates robust CSS selectors
- **Real-time status** - See recording state and event count in the header
- **Dark/Light mode** - Theme toggle with persistence
- **Onboarding** - First-time user guide
- **API integration** - Direct integration with backend for script generation

### Backend API
- **RESTful API** - FastAPI-based backend
- **Script generation** - Converts recordings to Playwright TypeScript
- **Test run storage** - Persists test results for dashboard display
- **Health checks** - Real-time API status monitoring

### Web Dashboard
- **Live test runs** - Real-time display of test executions
- **Status badges** - Visual pass/fail indicators
- **Auto-refresh** - Polls API every 5 seconds
- **Responsive design** - Tailwind CSS styled

### CI/CD
- **GitHub Actions** - Automated testing on push/PR
- **Artifact upload** - Test results preserved for 7 days
- **Parallel execution** - API, Web, and Playwright tests

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Chrome browser
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vaibosnikov/UI_Test_Recorder_and_Automated_Runner.git
   cd UI_Test_Recorder_and_Automated_Runner
   ```

2. **Start the API server**
   ```bash
   cd runner/api
   npm install
   npm run dev
   ```

3. **Start the web dashboard**
   ```bash
   cd runner/web
   npm install
   npm run dev
   ```

4. **Load the Chrome extension**
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `recorder/` folder

5. **Verify installation**
   - API: http://localhost:5000/v1/health
   - Dashboard: http://localhost:5173
   - Extension: Click TestCraft icon → should show "API connected ✓"

## 📖 Usage

### Recording a Test
1. Navigate to your target website
2. Click the TestCraft extension icon
3. Click **Start Recording**
4. Perform your test actions
5. Click **Stop Recording**
6. Click **Generate Script** to download

### Running Tests
```bash
cd runner/playwright
npm install
npx playwright test
```

### Viewing Results
Open the dashboard at http://localhost:5173 to see live test run data.

## 📁 Project Structure

```
UI_Test_Recorder_and_Automated_Runner/
├── recorder/           # Chrome extension
│   ├── src/
│   │   ├── ui/         # Popup UI (modern, themed)
│   │   ├── content-scripts/
│   │   └── background/
│   └── manifest.json
├── runner/
│   ├── api/            # FastAPI backend
│   ├── web/            # React dashboard
│   ├── playwright/     # Test runner
│   └── script-generator/
├── docs/               # Documentation
└── .github/workflows/  # CI/CD
```

## ✅ Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Extension UI | ✅ Complete | Modern, themed, onboarding, persistent state |
| Content Script | ✅ Complete | Captures events, persists to storage |
| Background Worker | ✅ Complete | Relays events and state |
| API Routes | ✅ Complete | /v1/runs, /v1/generate-script, health |
| Script Generator | ✅ Complete | Converts events to Playwright TS |
| Dashboard | ✅ Complete | Live API integration, auto-refresh |
| CI Workflow | ✅ Complete | All steps use npm install, passes |
| Documentation | ✅ Complete | Setup guide, API reference, architecture |

## 🔧 Troubleshooting

### Extension not loading
- Ensure you selected the `recorder/` folder (not contents)
- Check `chrome://extensions/` for errors

### API connection issues
- Verify API is running on port 5000
- Check browser console for CORS errors

### Dashboard not showing runs
- Ensure API server started first
- Check browser console for API errors

## 📚 Documentation

- [Setup Guide](docs/setup.md) - Detailed installation steps
- [Architecture](docs/architecture.md) - System design overview
- [API Reference](docs/api-reference.md) - Endpoint documentation

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ using Playwright, FastAPI, and React**

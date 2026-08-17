# TestCraft Architecture

## System Overview

TestCraft consists of five main components that work together to provide end-to-end test automation:

```
+------------------+     +-------------------+     +-----------------+
|   Recorder       |---->| Script Generator  |---->|   Runner        |
| (Chrome Ext)     |     |   (CLI Tool)      |     |  (Playwright)   |
+------------------+     +-------------------+     +--------+--------+
                                                           |
                                                           v
+------------------+     +-------------------+     +-----------------+
|   Dashboard      |<----|    API Server     |<----|   PostgreSQL    |
|   (React UI)     |     |   (Node.js)       |     |   Database      |
+------------------+     +-------------------+     +-----------------+
```

## Component Details

### Recorder (recorder/)

A Chrome extension (Manifest V3) that captures user interactions:
- Clicks, typing, navigation, form submissions
- Exports to JSON format compatible with script generator
- Supports custom selectors and wait conditions

**Key Files:**
- `manifest.json` - Extension configuration
- `src/content.js` - Content script for capturing events
- `src/background.js` - Background service worker

### Script Generator (runner/script-generator/)

CLI tool that transforms recorded JSON into Playwright test scripts:
- Reads JSON export from recorder
- Generates idiomatic Playwright code
- Supports custom templates and assertions

**Usage:**
```bash
node src/generate.js --input recording.json --output test.spec.js
```

### Runner (runner/)

Core test execution engine with sub-components:

#### API Server (runner/api/)
- Express.js REST API
- Manages test definitions, runs, and results
- Integrates with PostgreSQL for persistence

**Key Endpoints:**
- `POST /api/tests` - Create a new test
- `POST /api/runs` - Execute a test run
- `GET /api/runs/:id` - Get run results

#### Web Dashboard (runner/web/)
- React + Vite + Tailwind CSS
- Visualizes test runs with charts and KPIs
- Real-time updates via API polling

#### QA (runner/qa/)
- Playwright test suite for the platform itself
- E2E tests for API, dashboard, and recorder

### Database (runner/db/)

PostgreSQL schema and migrations:
- `tests` - Test definitions
- `runs` - Test execution history
- `results` - Individual test step results

## Data Flow

1. **Recording**: User interacts with web app -> Recorder captures events -> Exports JSON
2. **Generation**: Script Generator reads JSON -> Produces Playwright spec
3. **Execution**: API triggers Playwright runner -> Tests execute -> Results stored in DB
4. **Visualization**: Dashboard fetches from API -> Displays charts and metrics

## Security Considerations

- API uses environment variables for database credentials
- CORS configured for dashboard origin only
- No secrets committed to repository (.env files ignored)

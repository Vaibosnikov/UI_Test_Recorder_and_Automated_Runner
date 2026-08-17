# Setup Guide

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- Chrome/Chromium browser
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/Vaibosnikov/UI_Test_Recorder_and_Automated_Runner.git
cd UI_Test_Recorder_and_Automated_Runner
```

## Step 2: Database Setup

```bash
# Install PostgreSQL (if not already installed)
# Ubuntu/Debian:
sudo apt install postgresql postgresql-contrib

# macOS (with Homebrew):
brew install postgresql

# Create database and user
psql -U postgres
CREATE DATABASE testcraft;
CREATE USER testcraft_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE testcraft TO testcraft_user;
\q
```

## Step 3: API Server Configuration

```bash
cd runner/api

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://testcraft_user:your_password@localhost:5432/testcraft
```

## Step 4: Web Dashboard Setup

```bash
cd runner/web

# Install dependencies
npm install

# (Optional) Configure API endpoint if different from default
# Edit .env.local if needed
```

## Step 5: Script Generator Setup

```bash
cd runner/script-generator

# Install dependencies
npm install
```

## Step 6: Recorder Setup

```bash
cd recorder

# Install dependencies
npm install

# Build the extension (if build step exists)
npm run build
```

## Step 7: Load Recorder in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `recorder/` folder
5. The extension icon should appear in your toolbar

## Step 8: Verify Installation

### Test API Server

```bash
cd runner/api
npm run dev
# Should start on http://localhost:3000
curl http://localhost:3000/api/health
```

### Test Dashboard

```bash
cd runner/web
npm run dev
# Should start on http://localhost:5173
```

### Run Platform Tests

```bash
cd runner/qa
npm test
```

## Troubleshooting

### Database Connection Errors

- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `runner/api/.env`
- Ensure database exists: `psql -U postgres -l`

### Node Module Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Recorder Not Capturing

- Ensure extension is enabled in `chrome://extensions/`
- Check browser console for errors
- Verify target website allows content scripts

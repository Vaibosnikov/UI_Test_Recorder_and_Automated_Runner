#!/bin/bash
# Setup script for Playwright runner
# Creates symlink to tests directory

set -e

echo "🔧 Setting up TestCraft Playwright Runner..."

# Navigate to runner/playwright directory
cd "$(dirname "$0")"

# Create symlink to tests (if it doesn't exist)
if [ ! -d "tests" ]; then
  echo "Creating symlink to tests..."
  ln -s ../../playwright/tests tests
  echo "✅ Symlink created: tests -> ../../playwright/tests"
else
  echo "✅ tests directory already exists"
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Install Playwright browsers
echo ""
echo "Installing Playwright browsers..."
npx playwright install --with-deps

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run tests:"
echo "  node run-tests.js"
echo ""
echo "To run a specific test:"
echo "  node run-tests.js recorded.spec.ts"

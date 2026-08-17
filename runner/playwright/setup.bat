@echo off
REM Setup script for Playwright runner (Windows)
REM Creates junction to tests directory

echo Setting up TestCraft Playwright Runner...

REM Navigate to runner/playwright directory
cd /d "%~dp0"

REM Create junction to tests (if it doesn't exist)
if not exist "tests" (
    echo Creating junction to tests...
    mklink /J tests ..\..\playwright\tests
    echo Junction created: tests -> ..\..\playwright\tests
) else (
    echo tests directory already exists
)

REM Install dependencies
echo.
echo Installing dependencies...
call npm install

REM Install Playwright browsers
echo.
echo Installing Playwright browsers...
call npx playwright install --with-deps

echo.
echo Setup complete!
echo.
echo To run tests:
echo   node run-tests.js
echo.
echo To run a specific test:
echo   node run-tests.js recorded.spec.ts

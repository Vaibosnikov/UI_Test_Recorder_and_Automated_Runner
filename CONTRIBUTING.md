# Contributing to TestCraft

Thank you for your interest in contributing to TestCraft! This document outlines the development workflow and contribution guidelines.

## Development Workflow

### Branch Strategy

- `main` - Production-ready code (protected branch)
- `dev` - Active development branch (default for PRs)
- `feature/*` - Feature branches (e.g., `feature/recorder-enhancement`)

### Pull Request Process

1. **Create a feature branch** from `dev`:
   ```bash
   git checkout dev
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit with clear messages:
   ```bash
   git commit -m "feat: add new recorder export format"
   ```

3. **Test locally** before pushing:
   - Run API tests: `cd runner/api && npm test`
   - Run Playwright tests: `cd runner/qa && npm test`
   - Build the web app: `cd runner/web && npm run build`

4. **Push and open a PR** against `dev` (not `main`).

5. **Wait for review** - at least one approval required before merge.

## Code Standards

### JavaScript/Node.js

- Use ES6+ syntax
- Follow existing code style (2-space indentation, semicolons required)
- Add JSDoc comments for public functions

### Testing

- All new features must include tests
- Playwright tests go in `runner/qa/`
- Unit tests stay with their respective packages

### Documentation

- Update `docs/` for any architectural changes
- Update README sections if you change component behavior
- Add inline comments for non-obvious logic

## Security

- **Never commit `.env` files** or secrets
- Use environment variables for all configuration
- Report security issues privately via repository issues

## Questions?

Open an issue for discussion before starting major work.

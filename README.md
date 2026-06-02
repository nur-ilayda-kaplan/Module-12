# UI Test Framework

Short UI automation project using Playwright and Cucumber for Module 12.

Project contains E2E tests, Cucumber feature files, and a small mock server used by tests.

Installation

- Install Node.js 18.x LTS and npm.
- From project root run:

```bash
npm ci
npx playwright install --with-deps
```

Running tests

- Playwright tests: `npm test`
- Cucumber UI tests: `npm run test:ui`
- Run tagged Cucumber suites: `npm run test:ui -- --tags '@critical'`

CI/CD

- A GitHub Actions workflow is provided at `.github/workflows/ci.yml`.
  It runs on `push` and `pull_request`, installs dependencies, runs ESLint, Prettier check, installs Playwright browsers, and executes tests.

Environment

- Node.js LTS (18+ recommended).
- No additional environment variables required by default.

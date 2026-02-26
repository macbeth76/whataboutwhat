# whataboutwhat - Project Recipe

A step-by-step guide to building this project from scratch using TDD.

---

## Step 1: Create the project
Initialize an empty directory with git.
```
mkdir whataboutwhat && cd whataboutwhat && git init
```

## Step 2: Set up a Dockerized UI testing environment
Create a Docker container with Chrome, Firefox, and Puppeteer for TDD against a web UI.

**Files created:**
- `Dockerfile.test` — Node 20 (bookworm-slim) image with Chromium (via Puppeteer) and Firefox ESR
- `docker-compose.test.yml` — Two-service setup: `app` (Angular dev server) + `test` (Puppeteer/Jest)
- `package.json` — Angular + Jest + Puppeteer
- `jest.e2e.config.js` — Jest config pointing to `tests/` directory
- `tests/wait-for-app.sh` — Script that waits for Angular dev server before running tests
- `.gitignore` — Ignores `node_modules/`, `.cache/`, `/dist`, etc.

**Key gotchas:**
- **Apple Silicon:** Puppeteer's bundled Chromium is x86_64 only. Set `platform: linux/amd64` in docker-compose.
- **Angular dev server host checking:** Angular 21's Vite-based dev server blocks non-localhost requests by default (403). Fix: set `"allowedHosts": true` in `angular.json` under `serve > options`.
- **Wait for Angular:** Use `waitForSelector('app-root header')` in tests so Puppeteer waits for Angular to bootstrap before asserting.

**Run the tests:**
```
GIT_HASH=$(git rev-parse --short HEAD) docker compose -f docker-compose.test.yml up --build
```

## Step 3: Scaffold Angular and build the shell layout (TDD)
Write failing E2E tests first, then build Angular components to make them pass.

**Tests written (`tests/layout.test.js`):**
- Header renders at the top, full width
- Menu items (Home, About) aligned left
- Profile icon on the far right
- Gear icon to the left of profile icon
- Dropdown select to the left of gear icon
- Footer renders at the bottom
- Footer contains "Wise Owl Tech LLC" copyright
- Footer displays a git hash version string

**Components created:**
- `src/app/components/header/` — Header with nav links, dropdown, gear icon, profile icon
- `src/app/components/footer/` — Footer with copyright + git hash version
- `src/environments/version.ts` — Holds the git hash, written by `scripts/set-version.sh` at build time
- `Dockerfile.app` — Builds Angular app, injects `GIT_HASH` build arg into `version.ts`

**Result: 9 tests, 9 passing.**

---

*This recipe is updated as the project evolves. Each step captures what we did and why.*

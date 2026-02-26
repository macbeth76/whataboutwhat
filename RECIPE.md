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

## Step 4: Version, commit, and establish GitHub Flow
Tag the base as `v0.1.0` and adopt GitHub Flow for all future work.

**What was done:**
```
git add . && git commit -m "feat: initial project setup ..."
git tag -a v0.1.0 -m "v0.1.0 - Base project"
```

**GitHub Flow rules for this project:**

1. **`main` is always deployable.** Everything on `main` has passing tests.
2. **Create a feature branch for every change.**
   ```
   git checkout -b feature/short-description
   ```
3. **Write failing tests first (TDD red),** then implement to make them pass (green).
4. **Commit often** with clear messages using conventional commits:
   - `feat:` — new feature
   - `fix:` — bug fix
   - `refactor:` — code restructuring
   - `test:` — adding/updating tests
   - `docs:` — documentation changes
   - `chore:` — tooling, dependencies, config
5. **Open a Pull Request** when the feature is ready. PR should include:
   - Summary of changes
   - Test plan
   - All E2E tests passing
6. **Merge to `main`** via PR (squash or merge commit).
7. **Tag releases** with semantic versioning:
   ```
   git tag -a v0.2.0 -m "v0.2.0 - Description of release"
   ```

**Version history:**
| Version | Description |
|---------|-------------|
| v0.1.0  | Base: Angular shell layout, Dockerized TDD (Puppeteer + Jest), header/footer components |

## Step 5: Fix critical issues, add routing, unit tests, and docs
Review the project, fix gaps, and harden the foundation.

**What was fixed:**
1. **Stale unit test** — `app.spec.ts` was still testing scaffold `<h1>` tag; updated to test header/footer/main layout
2. **No package-lock.json** — Ran `npm install` to generate deterministic lock file
3. **Broken routing** — Added Home and About pages, wired routes, switched header links to `routerLink` with active styling
4. **No component unit tests** — Added spec files for Header (6 tests), Footer (5 tests), Home (2 tests), About (2 tests)
5. **No README** — Created `README.md` with quick start, project structure, testing, versioning, and branching docs

**Files created:**
- `src/app/pages/home/` — Home page component (welcome message)
- `src/app/pages/about/` — About page component (Wise Owl Tech LLC info)
- `src/app/components/header/header.spec.ts` — Header unit tests
- `src/app/components/footer/footer.spec.ts` — Footer unit tests
- `src/app/pages/home/home.spec.ts` — Home unit tests
- `src/app/pages/about/about.spec.ts` — About unit tests
- `README.md` — Project documentation
- `package-lock.json` — Dependency lock file

**Files modified:**
- `src/app/app.spec.ts` — Fixed to match actual layout
- `src/app/app.routes.ts` — Added Home and About routes
- `src/app/components/header/header.ts` — Added RouterLink imports
- `src/app/components/header/header.html` — Switched to routerLink with active class
- `src/app/components/header/header.scss` — Added active link styling
- `tests/layout.test.js` — Added 3 routing E2E tests

**Result: 11 E2E tests passing + 18 unit tests.**

---

*This recipe is updated as the project evolves. Each step captures what we did and why.*

# whataboutwhat

A web application by **Wise Owl Tech LLC**, built with Angular 21 and tested via Dockerized Puppeteer E2E tests.

## Quick Start

### Prerequisites
- [Docker](https://www.docker.com/) (with Compose v2)
- [Node.js 20+](https://nodejs.org/) (for local development)

### Run Tests
```bash
GIT_HASH=$(git rev-parse --short HEAD) docker compose -f docker-compose.test.yml up --build
```

### Local Development
```bash
npm install
npm start
# App runs at http://localhost:4200
```

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── header/    # Top nav bar with menu, dropdown, gear, profile
│   │   └── footer/    # Copyright + git hash version
│   ├── pages/
│   │   ├── home/      # Landing page
│   │   └── about/     # About page
│   ├── app.ts         # Root component (shell layout)
│   ├── app.routes.ts  # Route definitions
│   └── app.config.ts  # App providers
├── environments/
│   └── version.ts     # Git hash (injected at build time)
└── styles.scss        # Global styles
tests/
└── layout.test.js     # E2E tests (Puppeteer + Jest)
```

## Testing

**E2E tests** run in Docker with Puppeteer (headless Chrome):
```bash
GIT_HASH=$(git rev-parse --short HEAD) docker compose -f docker-compose.test.yml up --build
```

**Unit tests** run via Angular's test runner:
```bash
npm test
```

## Versioning

The app displays a git hash in the footer so you always know what code is deployed. The hash is injected at Docker build time via the `GIT_HASH` build arg.

Releases follow [semantic versioning](https://semver.org/) with git tags.

## Branching (GitHub Flow)

- `main` is always deployable
- Create feature branches for all changes: `feature/short-description`
- Open a PR, get tests green, merge to `main`
- Tag releases: `git tag -a v0.x.0 -m "description"`

See [RECIPE.md](RECIPE.md) for the full step-by-step build guide.

## License

Copyright &copy; 2026 Wise Owl Tech LLC. All rights reserved.

# Contributing to StellarCircle

Thank you for your interest in contributing. StellarCircle is an open-source community finance protocol and every contribution — code, documentation, translations, design, and community outreach — makes a real difference.

## Table of Contents

1. [Code of Conduct](#1-code-of-conduct)
2. [Ways to Contribute](#2-ways-to-contribute)
3. [Development Setup](#3-development-setup)
4. [Project Structure](#4-project-structure)
5. [Branching & Commit Convention](#5-branching--commit-convention)
6. [Opening a Pull Request](#6-opening-a-pull-request)
7. [Issue Labels](#7-issue-labels)
8. [Smart Contract Contributions](#8-smart-contract-contributions)
9. [Frontend Contributions](#9-frontend-contributions)
10. [Backend Contributions](#10-backend-contributions)
11. [Documentation Contributions](#11-documentation-contributions)
12. [Testing Requirements](#12-testing-requirements)
13. [Review Process](#13-review-process)
14. [Wave-Ready Funded Issues](#14-wave-ready-funded-issues)
15. [Getting Help](#15-getting-help)

---

## 1. Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold a respectful and inclusive environment for everyone. Harassment, discrimination, and bad-faith behaviour are not tolerated.

---

## 2. Ways to Contribute

### Code
- Fix bugs (look for `bug` label)
- Implement features from the roadmap (look for `enhancement` or `wave-ready`)
- Improve test coverage
- Performance optimisations

### Documentation
- Fix typos and improve clarity
- Add missing sections to existing docs
- Translate docs into other languages
- Write tutorials or example walkthroughs

### Design
- Improve UI/UX on existing screens
- Create assets (icons, illustrations, diagrams)
- Accessibility improvements

### Community
- Answer questions in GitHub Discussions
- Report bugs with detailed reproduction steps
- Suggest features in Discussions before opening a PR

---

## 3. Development Setup

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Rust | 1.75+ | [rustup.rs](https://rustup.rs) |
| Node.js | 20+ | [nodejs.org](https://nodejs.org) |
| pnpm | 9+ | `npm install -g pnpm` |
| Stellar CLI | latest | [Install guide](https://developers.stellar.org/docs/tools/developer-tools/stellar-cli) |
| Docker | 24+ | [docker.com](https://docker.com) |
| Git | 2.40+ | system package manager |

### Clone & Install

```bash
git clone https://github.com/Tekinvest/StellarCircle.git
cd StellarCircle

# Install all workspace dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your local values
```

### Build Smart Contracts

```bash
./scripts/build.sh
# or manually:
cd contracts/stellar-circle
cargo build --target wasm32-unknown-unknown --release
```

### Run Tests

```bash
# All workspaces
pnpm test

# Contracts only
cargo test

# Frontend only
cd frontend && pnpm test

# Backend only
cd backend && pnpm test
```

### Start Local Development

```bash
# Start backend + frontend in parallel
pnpm dev

# Or individually:
cd backend && pnpm dev
cd frontend && pnpm dev
```

The frontend runs at `http://localhost:5173`, the backend at `http://localhost:3000`.

For smart contract development, deploy to Stellar Testnet:

```bash
./scripts/deploy_testnet.sh
```

### Pre-Commit Hooks

The repo uses Husky + lint-staged. On every commit:
- `prettier` formats staged files
- `eslint` lints TypeScript files
- `clippy` lints Rust files
- `commitlint` validates the commit message format

---

## 4. Project Structure

```
StellarCircle/
├── contracts/          # Soroban smart contracts (Rust)
├── frontend/           # React web app
├── mobile/             # Expo React Native app
├── backend/            # Node.js API + indexer
├── scripts/            # Build, deploy, test scripts
├── docs/               # Documentation
└── packages/           # Shared libraries (core types, utilities)
```

See [docs/architecture.md](docs/architecture.md) for a full breakdown.

---

## 5. Branching & Commit Convention

### Branch Naming

```
feat/short-description        # New feature
fix/short-description         # Bug fix
docs/short-description        # Documentation only
refactor/short-description    # Code refactor, no behaviour change
test/short-description        # Tests only
chore/short-description       # Build, config, tooling
```

Examples:
```
feat/pillar-b-goal-savings
fix/contribution-deadline-edge-case
docs/update-user-guide-pillar-d
```

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

**Scopes**: `contracts`, `frontend`, `backend`, `mobile`, `docs`, `ci`, `deps`

**Examples**:
```
feat(contracts): add goal-based savings state machine
fix(backend): correct payout event indexing race condition
docs(user-guide): add lending circle repayment section
test(contracts): add edge cases for missed contribution penalty
chore(deps): bump stellar-sdk to 12.1.0
```

Subject rules:
- Lowercase first letter
- No period at the end
- Imperative mood ("add" not "adds" or "added")
- Max 72 characters

---

## 6. Opening a Pull Request

1. **Fork** the repository and create your branch from `main`
2. **Make your changes** with tests where applicable
3. **Run the full test suite** locally: `pnpm test`
4. **Run linting**: `pnpm lint`
5. **Push your branch** and open a PR against `main`
6. **Fill in the PR template** — it asks for:
   - What changed and why
   - How to test it
   - Screenshots / recordings for UI changes
   - Whether it breaks any existing behaviour
7. **Link the relevant issue** in the PR description (`Closes #123`)
8. Wait for CI to pass and a maintainer to review

### PR Rules

- One logical change per PR — keep PRs focused and reviewable
- PRs touching the Soroban contract require at least 2 maintainer approvals
- PRs with coverage drops below the thresholds will not be merged (CI enforces this)
- Do not force-push after requesting review; add new commits instead
- Squash-merge is preferred; the PR title becomes the merge commit message

---

## 7. Issue Labels

| Label | Description |
|-------|-------------|
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |
| `good-first-issue` | Suitable for first-time contributors |
| `help-wanted` | Maintainers want community input |
| `wave-ready` | Funded issue from the Drips Wave program |
| `contracts` | Affects Soroban smart contracts |
| `frontend` | Affects the web frontend |
| `backend` | Affects the backend API / indexer |
| `mobile` | Affects the mobile app |
| `docs` | Documentation only |
| `security` | Security-related — follow responsible disclosure |
| `performance` | Performance improvement |
| `blocked` | Waiting on another issue or external dependency |
| `duplicate` | Already reported |
| `wontfix` | Out of scope or intentional behaviour |

---

## 8. Smart Contract Contributions

Soroban contracts are in `contracts/stellar-circle/src/`. They are written in Rust and compiled to WASM.

### Guidelines

- Follow the existing module structure (one module per domain area)
- All public contract functions must have doc comments explaining parameters, return values, and error conditions
- Use `checked_add`, `checked_mul` everywhere — no unchecked arithmetic
- All storage mutations must emit a corresponding event via `events.rs`
- New error variants go in `errors.rs`
- New shared types go in `types.rs`

### Testing Contracts

```bash
# Unit tests
cargo test

# With coverage
cargo tarpaulin --config tarpaulin.toml

# Run a specific test
cargo test test_contribution_penalty
```

Test files live alongside the modules they test (`group.rs` has `#[cfg(test)]` at the bottom). Integration tests go in `contracts/stellar-circle/tests/`.

### Deployment to Testnet

```bash
./scripts/deploy_testnet.sh
```

This script builds the contract, uploads the WASM to Testnet, and outputs the contract address. Update `.env` with the new address.

---

## 9. Frontend Contributions

The frontend is a React 18 + TypeScript app built with Vite. It lives in `frontend/`.

### Guidelines

- Match the existing component structure — new pages go in `src/pages/`, reusable UI in `src/components/`
- Use React Query for all data fetching — no direct `fetch()` calls in components
- Use MUI components and the existing theme tokens — do not introduce raw CSS unless absolutely necessary
- All new components must be accessible: keyboard-navigable, labelled with ARIA attributes, and tested with a screen reader where applicable
- New Stellar/Soroban interactions go in `src/stellar/` — not inline in components

### Running the Frontend

```bash
cd frontend
pnpm dev       # dev server at localhost:5173
pnpm build     # production build
pnpm test      # vitest
pnpm lint      # eslint
```

---

## 10. Backend Contributions

The backend is a Node.js + Express + GraphQL application in `backend/`.

### Guidelines

- New REST routes go in `backend/src/api/routes/` — follow the existing pattern (router, validation middleware, handler)
- New GraphQL types and resolvers go in `backend/src/graphql/`
- All database changes require a migration in `backend/src/db/migrations/` — never modify the schema directly
- New Soroban event handlers go in `backend/src/indexer/handlers/` — handlers must be idempotent
- All endpoints must be covered by integration tests in `backend/tests/`

### Running the Backend

```bash
cd backend
pnpm dev       # nodemon dev server
pnpm test      # jest
pnpm lint      # eslint
```

---

## 11. Documentation Contributions

Documentation lives in `docs/`. We welcome:

- Fixing typos and grammar
- Expanding thin sections
- Adding missing flows or API descriptions
- Translating documents

For translations, create a language subdirectory: `docs/es/`, `docs/fr/`, `docs/yo/`, etc., and mirror the English file structure.

---

## 12. Testing Requirements

| Workspace | Minimum Coverage | Tool |
|-----------|-----------------|------|
| contracts | 85% lines | cargo-tarpaulin |
| frontend | 80% lines / 70% branches | vitest (v8) |
| backend | 60% lines | jest (ts-jest) |

New features must include tests. Bug fixes should include a regression test that would have caught the bug. CI blocks merge if coverage drops below these thresholds.

---

## 13. Review Process

All PRs are reviewed by at least one maintainer. The review process:

1. **Automated CI** runs first — lint, tests, coverage, build. A failing CI blocks review.
2. **Code review** — a maintainer reviews for correctness, style, security, and test quality.
3. **Contract review** — PRs touching `contracts/` require 2 maintainer approvals.
4. **Merge** — squash merge by a maintainer after all approvals.

Typical review turnaround: 2–3 business days. For urgent fixes, tag a maintainer in the PR.

---

## 14. Wave-Ready Funded Issues

StellarCircle participates in **Drips Wave**, a contributor funding program. Issues labelled `wave-ready` carry funding on completion.

| Category | Points | Description |
|----------|--------|-------------|
| `trivial` | 100 | Docs, simple tests, minor fixes |
| `medium` | 150 | Helper functions, validation, moderate features |
| `high` | 200 | Core features, complex integrations, security work |

To claim a wave-ready issue:
1. Comment on the issue: "I'd like to work on this"
2. A maintainer will assign it to you
3. Complete the work and open a PR linked to the issue
4. On merge, points are allocated via the Drips Wave dashboard

---

## 15. Getting Help

- **GitHub Discussions** — for questions, ideas, and architectural discussions
- **GitHub Issues** — for bug reports and feature requests (search before opening)
- **Telegram** — [@Xoulomon] for quick questions
- **Code of Conduct issues** — contact the maintainers privately via GitHub

We are a welcoming community. No question is too basic. If you are new to Stellar or Soroban, the [Stellar Developer Docs](https://developers.stellar.org) and [Soroban docs](https://soroban.stellar.org/docs) are great starting points.

---

*Thank you for helping build financial infrastructure for communities that need it most.*

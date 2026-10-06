# StellarCircle

> A decentralized community finance platform built on the Stellar blockchain — combining rotating savings, goal-based pooling, social accountability, micro-lending, milestone-unlocked vaults, and on-chain governance into one unified protocol.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Stellar Network](https://img.shields.io/badge/Network-Stellar-blue)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Contracts-Soroban-blueviolet)](https://soroban.stellar.org)
[![Coverage](https://codecov.io/gh/Tekinvest/StellarCircle/branch/main/graph/badge.svg)](https://codecov.io/gh/Tekinvest/StellarCircle)
[![CI](https://github.com/Tekinvest/StellarCircle/actions/workflows/ci.yml/badge.svg)](https://github.com/Tekinvest/StellarCircle/actions)

---

## What Is StellarCircle?

StellarCircle is a full-stack, open-source community finance protocol on Stellar. It brings together five complementary savings and lending models under a single smart-contract system, making cooperative financial tools accessible to anyone with a Stellar wallet — no bank required.

The five pillars:

| Pillar | Model | Description |
|--------|-------|-------------|
| **A** | Rotating Savings (ROSCA) | Members pool funds; payout rotates through the group each cycle |
| **B** | Goal-Based Group Savings | Members save collectively toward a shared target; contract releases funds when the goal is met |
| **C** | Social Accountability Vault | Personal savings locked on-chain; community witnesses track commitments publicly |
| **D** | Lending Circle | Members pool to lend to one member per cycle at zero or low interest; repaid over the cycle |
| **E** | Milestone-Unlocked Savings | Funds released only when verifiable milestones are submitted and confirmed on-chain |

All five models share a common group-management layer, a unified contribution engine, and an on-chain governance module — so members can mix and match rules when creating a circle.

---

## Why Stellar?

- **Low fees**: Transactions cost fractions of a cent, making micro-contributions viable
- **Fast finality**: 3–5 second settlement; no waiting for block confirmations
- **Soroban smart contracts**: Rust-based, auditable, deterministic contract execution
- **Native asset support**: XLM out of the box; USDC, EURC, and custom tokens via SEP-41
- **Stellar ecosystem**: Freighter, Lobstr, Albedo wallet support; Horizon API; Stellar Quest community

---

## Repository Layout

```
StellarCircle/
├── contracts/                 # Soroban smart contracts (Rust)
│   └── stellar-circle/
│       ├── src/
│       │   ├── lib.rs         # Contract entry point
│       │   ├── group.rs       # Group lifecycle
│       │   ├── contribution.rs
│       │   ├── payout.rs
│       │   ├── lending.rs
│       │   ├── milestone.rs
│       │   ├── governance.rs
│       │   └── vault.rs
│       └── Cargo.toml
├── frontend/                  # React + TypeScript SPA (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── stellar/           # Stellar SDK + Soroban client wrappers
│   └── package.json
├── mobile/                    # Expo React Native app
├── backend/                   # Node.js indexer + REST + GraphQL API
│   ├── src/
│   │   ├── indexer/           # Soroban event listener
│   │   ├── api/               # REST routes
│   │   ├── graphql/           # GraphQL schema + resolvers
│   │   └── db/                # PostgreSQL migrations
│   └── package.json
├── scripts/                   # Build, deploy, test scripts
├── docs/                      # Full documentation
└── package.json               # Monorepo root (pnpm + Turborepo)
```

---

## Architecture

StellarCircle follows a layered architecture:

```
┌─────────────────────────────────────────────────────┐
│                     User Layer                      │
│        Stellar Wallets (Freighter / Lobstr)         │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                  Frontend Layer                     │
│   React SPA  ·  Expo Mobile  ·  Stellar SDK         │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                 Backend Layer                       │
│   REST API  ·  GraphQL  ·  Soroban Event Indexer    │
└──────────┬─────────────────────────┬────────────────┘
           │                         │
┌──────────▼──────────┐   ┌──────────▼──────────────┐
│  Blockchain Layer   │   │      Data Layer          │
│  Stellar Network    │   │  PostgreSQL · Redis       │
│  Soroban Contracts  │   │  Horizon API             │
└─────────────────────┘   └──────────────────────────┘
```

For the full architecture breakdown see [docs/architecture.md](docs/architecture.md).

---

## The Five Pillars — Feature Detail

### A · Rotating Savings (ROSCA)
Classic Ajo/Esusu/Tanda model, reimagined on-chain:
- Creator sets contribution amount, cycle duration, and max member count
- Each cycle, all members contribute; the full pool goes to the next recipient in rotation
- Order is set at group creation (or optionally randomised via Stellar's VRF)
- Contract enforces payment deadlines; late contributions incur configurable penalties
- Cycle ends when all members have received exactly once

### B · Goal-Based Group Savings
Collective saving toward a shared objective:
- Creator defines a target amount, a deadline, and a spending category
- Members contribute freely or on a schedule
- Funds are locked in escrow until the target is hit OR the deadline passes
- On success: funds release to a designated multi-sig or contract-controlled treasury
- On failure: full refunds issued on-chain automatically

### C · Social Accountability Vault
Personal savings enforced by community witnesses:
- Each member sets a personal goal, amount, and timeline
- Up to 5 community witnesses are nominated per vault
- Contribution activity is publicly visible on-chain (no amounts, only pass/fail signals)
- Missed contributions emit on-chain events that witnesses can acknowledge
- Funds remain locked until the commitment period ends; early withdrawal triggers a penalty split among witnesses as a reward

### D · Lending Circle
Zero-interest cooperative lending:
- Pool members contribute a fixed amount each cycle
- One member per cycle receives the full pool as a loan at 0% interest
- Repayment is tracked on-chain across the following cycle(s)
- Credit history is stored on-chain, portable across circles
- Missed repayments pause future lending eligibility until resolved via governance vote

### E · Milestone-Unlocked Savings
Purpose-locked funds with verifiable release conditions:
- Creator (individual or group) locks funds with a set of defined milestones
- Each milestone specifies a description, a deadline, and a verifier address
- Verifiers submit on-chain attestations when milestones are met
- Funds release proportionally as milestones are cleared
- Supports external oracle integration for automated verification

---

## Smart Contract API

### Group Management
```rust
create_group(config: GroupConfig) -> u64
get_group(group_id: u64) -> Group
list_members(group_id: u64) -> Vec<Address>
update_group_config(group_id: u64, config: GroupConfig)
dissolve_group(group_id: u64)
```

### Membership
```rust
join_group(group_id: u64)
leave_group(group_id: u64)
is_member(group_id: u64, address: Address) -> bool
```

### Contributions
```rust
contribute(group_id: u64, amount: i128)
get_contribution_status(group_id: u64, cycle: u32) -> Vec<(Address, bool)>
get_missed_contributions(group_id: u64, member: Address) -> u32
```

### Payouts (ROSCA & Goal-Based)
```rust
execute_payout(group_id: u64)
get_payout_recipient(group_id: u64) -> Address
is_complete(group_id: u64) -> bool
```

### Lending Circle
```rust
request_loan(group_id: u64, amount: i128)
repay_loan(group_id: u64, amount: i128)
get_credit_score(address: Address) -> u32
```

### Milestones
```rust
add_milestone(group_id: u64, milestone: Milestone)
attest_milestone(group_id: u64, milestone_id: u32, verifier: Address)
release_milestone_funds(group_id: u64, milestone_id: u32)
```

### Governance
```rust
propose(group_id: u64, proposal: Proposal) -> u64
vote(group_id: u64, proposal_id: u64, vote: Vote)
execute_proposal(group_id: u64, proposal_id: u64)
```

### Emergency Controls
```rust
pause_group(group_id: u64, caller: Address)
unpause_group(group_id: u64, caller: Address)
emergency_withdraw(group_id: u64, caller: Address)
```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Tekinvest/StellarCircle.git
cd StellarCircle

# Install dependencies (requires pnpm)
pnpm install

# Build Soroban contracts
./scripts/build.sh

# Run all tests
./scripts/test.sh

# Start local development (frontend + backend)
pnpm dev
```

See [docs/local-development-setup.md](docs/local-development-setup.md) for the full environment setup.

---

## Supported Wallets

| Wallet | Web | Mobile | Notes |
|--------|-----|--------|-------|
| Freighter | ✅ | ✅ | Recommended; browser extension + mobile |
| Lobstr | ✅ | ✅ | Full SEP support |
| Albedo | ✅ | ❌ | Web-only signing |
| XBULL | ✅ | ✅ | Advanced users |
| WalletConnect | ✅ | ✅ | Via Stellar WalletConnect bridge |

---

## Supported Assets

| Asset | Type | Status |
|-------|------|--------|
| XLM | Native | ✅ Live |
| USDC (Circle) | SEP-41 Token | ✅ Live |
| EURC | SEP-41 Token | ✅ Live |
| Custom tokens | SEP-41 Token | ✅ Live (creator-defined) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contracts | Rust · Soroban SDK |
| Frontend | React 18 · TypeScript · Vite · MUI · React Query · Stellar SDK |
| Mobile | Expo · React Native · TypeScript |
| Backend | Node.js · Express · GraphQL · PostgreSQL · Redis |
| Indexer | Soroban event streaming via Horizon |
| Build | Turborepo · pnpm |
| Testing | Cargo test · Vitest · Jest · Playwright |
| CI/CD | GitHub Actions |
| Infrastructure | Docker · Terraform |

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | System design, component interactions, data flow |
| [Design Flows](docs/design-flows.md) | End-to-end user flows for all five pillars |
| [User Guide](docs/user-guide.md) | Step-by-step guide for end users |
| [Roadmap](docs/roadmap.md) | Versioned feature roadmap |
| [Contributing](CONTRIBUTING.md) | How to contribute to StellarCircle |
| [Contract API Reference](docs/contract-api-reference.md) | Full Soroban contract API |
| [Local Development](docs/local-development-setup.md) | Clone-to-running-app guide |
| [Security Guide](docs/security-guide.md) | Threat model, audit status, responsible disclosure |
| [Governance](docs/governance.md) | On-chain governance process |
| [FAQ](docs/faq.md) | Frequently asked questions |

---

## Testing

```bash
# Smart contracts
cargo test
cargo tarpaulin --config tarpaulin.toml   # coverage

# Frontend
cd frontend && pnpm test
pnpm test:coverage

# Backend
cd backend && pnpm test
pnpm test:coverage

# End-to-end
pnpm e2e
```

Coverage gates enforced in CI:

| Workspace | Tool | Minimum |
|-----------|------|---------|
| contracts | cargo-tarpaulin | 85% lines |
| frontend | vitest (v8) | 80% lines / 70% branches |
| backend | jest (ts-jest) | 60% lines |

---

## Why This Matters

Over 1.7 billion adults globally are unbanked. Community savings circles — known as Ajo, Esusu, Tanda, Chit Fund, Paluwagan, and dozens of other names — have served these communities for centuries. StellarCircle moves this tradition on-chain:

- **No trusted coordinator** — rules are enforced by smart contracts
- **No minimum balance** — contribute as little as 1 XLM
- **Transparent history** — every contribution, payout, and attestation is verifiable on Stellar
- **Portable credit** — on-chain lending history follows the member across circles
- **Programmable rules** — groups customise contribution amounts, cycles, penalties, and governance

---

## Roadmap Summary

- **v1.0** — ROSCA (Pillar A) on Testnet
- **v1.1** — Goal-Based Savings (Pillar B) + USDC/EURC support
- **v2.0** — Social Accountability Vault (Pillar C) + Lending Circle (Pillar D)
- **v2.1** — Milestone-Unlocked Savings (Pillar E) + oracle integration
- **v3.0** — On-chain governance + mobile app GA
- **v4.0** — Fiat on/off-ramps + cross-group credit scoring

See [docs/roadmap.md](docs/roadmap.md) for full detail.

---

## Contributing

We welcome contributions of all kinds — code, documentation, translations, design, and community outreach. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

Issues labelled `good-first-issue` are a great entry point. Funded issues are labelled `wave-ready`.

---

## Security

Found a vulnerability? Please do **not** open a public issue. Follow the responsible disclosure process in [docs/SECURITY.md](docs/SECURITY.md).

---

## License

MIT © [Tekinvest](https://github.com/Tekinvest)

---

## Acknowledgements

- Stellar Development Foundation for Soroban
- African, Latin American, and Asian communities that have practiced rotating savings for generations
- Drips Wave for supporting public goods funding
- Every contributor, tester, and community member who has helped shape this protocol

---

*Built for financial inclusion — on Stellar, for everyone.*

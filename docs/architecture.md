# StellarCircle — Architecture

## Table of Contents

1. [Overview](#overview)
2. [System Layers](#system-layers)
3. [Blockchain Layer — Soroban Contracts](#blockchain-layer--soroban-contracts)
4. [Backend Layer](#backend-layer)
5. [Frontend Layer](#frontend-layer)
6. [Mobile Layer](#mobile-layer)
7. [Data Layer](#data-layer)
8. [Cross-Cutting Concerns](#cross-cutting-concerns)
9. [The Five Pillar Contract Models](#the-five-pillar-contract-models)
10. [Key Data Flows](#key-data-flows)
11. [Security Architecture](#security-architecture)
12. [Scalability Considerations](#scalability-considerations)
13. [Infrastructure](#infrastructure)

---

## Overview

StellarCircle is a monorepo full-stack application with four primary runtime layers:

```
┌──────────────────────────────────────────────────────────────────────┐
│                           USER LAYER                                 │
│     Web Browser / Mobile App / Stellar Wallet (Freighter, Lobstr)   │
└──────────────────────────┬───────────────────────────────────────────┘
                           │  HTTPS / WebSocket
┌──────────────────────────▼───────────────────────────────────────────┐
│                        FRONTEND LAYER                                │
│         React SPA (Vite)          Expo React Native App             │
│         Stellar SDK               Stellar SDK                        │
│         React Query               React Query                        │
│         Material UI               NativeBase                         │
└──────────┬───────────────────────────────────────┬───────────────────┘
           │  REST / GraphQL / WS                   │ REST / GraphQL
┌──────────▼───────────────────────────────────────▼───────────────────┐
│                         BACKEND LAYER                                │
│   Express REST API  ·  GraphQL (Apollo)  ·  Soroban Event Indexer   │
│   Auth (Stellar keypair / SEP-10)  ·  WebSocket push notifications  │
└──────────┬───────────────────────────────────────┬───────────────────┘
           │  Horizon RPC / Soroban RPC             │  PostgreSQL / Redis
┌──────────▼───────────────────┐   ┌───────────────▼───────────────────┐
│      BLOCKCHAIN LAYER        │   │          DATA LAYER               │
│  Stellar Network (Testnet /  │   │  PostgreSQL — indexed events,     │
│  Mainnet)                    │   │  group state, user profiles       │
│  Soroban Smart Contracts     │   │  Redis — sessions, rate limiting, │
│  Horizon API (history)       │   │  real-time pub/sub                │
└──────────────────────────────┘   └───────────────────────────────────┘
```

---

## System Layers

### Layer Responsibilities

| Layer | Responsibility | Technology |
|-------|---------------|-----------|
| Blockchain | Trustless rule enforcement, fund custody, event emission | Soroban / Stellar |
| Backend | Indexing, off-chain state, API aggregation, auth | Node.js / Express / PostgreSQL |
| Frontend | User interface, wallet integration, transaction signing | React / TypeScript / Stellar SDK |
| Mobile | Native iOS/Android experience | Expo / React Native |
| Data | Persistent storage, caching, pub/sub | PostgreSQL / Redis |

### Communication Protocols

| Channel | Protocol | Use |
|---------|----------|-----|
| Frontend ↔ Backend | HTTPS REST, GraphQL over HTTPS, WebSocket | API calls, subscriptions |
| Backend ↔ Stellar | Horizon REST API, Soroban RPC | Event streaming, tx submission, state queries |
| Frontend ↔ Wallet | Freighter API / WalletConnect / SEP-7 | Transaction signing |
| Backend ↔ Redis | Redis protocol | Session cache, pub/sub |
| Backend ↔ PostgreSQL | SQL over TCP | Persistent indexed state |

---

## Blockchain Layer — Soroban Contracts

### Contract Architecture

The StellarCircle protocol lives in a single upgradable Soroban contract deployed on Stellar. Internally it is split into focused modules:

```
stellar-circle/src/
├── lib.rs              # Entry point — routes invocations to modules
├── group.rs            # Group lifecycle: create, configure, dissolve
├── contribution.rs     # Contribution engine shared by all five pillars
├── payout.rs           # ROSCA rotation & goal-based payout release
├── lending.rs          # Lending circle: loan issuance & repayment
├── milestone.rs        # Milestone definition, attestation, fund release
├── vault.rs            # Social accountability vault: locks & witness signals
├── governance.rs       # Proposal, voting, execution
├── storage.rs          # Centralised storage key definitions
├── events.rs           # Event emission helpers
├── errors.rs           # Error enum
└── types.rs            # Shared data types (Group, Member, Proposal, etc.)
```

### Storage Model

All state is stored in Soroban's persistent storage using namespaced keys:

| Key Pattern | Type | Description |
|-------------|------|-------------|
| `GROUP:{id}` | `Group` | Group configuration and metadata |
| `MEMBERS:{group_id}` | `Vec<Address>` | Member list |
| `CONTRIBUTION:{group_id}:{cycle}:{address}` | `bool` | Contribution flag |
| `PAYOUT_INDEX:{group_id}` | `u32` | Current payout recipient index |
| `LOAN:{group_id}:{address}` | `Loan` | Active loan record |
| `CREDIT:{address}` | `CreditRecord` | Cross-group credit history |
| `MILESTONE:{group_id}:{id}` | `Milestone` | Milestone definition |
| `VAULT:{address}` | `Vault` | Personal accountability vault |
| `PROPOSAL:{group_id}:{id}` | `Proposal` | Governance proposal |
| `VOTE:{group_id}:{proposal_id}:{address}` | `Vote` | Individual vote |

### Event Schema

Every significant state change emits a Soroban contract event, consumed by the backend indexer:

| Event | Topics | Data |
|-------|--------|------|
| `group_created` | `[group_id, creator]` | `GroupConfig` |
| `member_joined` | `[group_id, member]` | `timestamp` |
| `contribution_made` | `[group_id, member, cycle]` | `amount` |
| `payout_executed` | `[group_id, recipient, cycle]` | `amount` |
| `goal_reached` | `[group_id]` | `total_amount, timestamp` |
| `goal_refunded` | `[group_id]` | `reason` |
| `loan_issued` | `[group_id, borrower]` | `amount, due_cycle` |
| `loan_repaid` | `[group_id, borrower]` | `amount, timestamp` |
| `milestone_attested` | `[group_id, milestone_id, verifier]` | `timestamp` |
| `milestone_funds_released` | `[group_id, milestone_id]` | `amount` |
| `vault_contribution` | `[address, vault_id]` | `amount, streak` |
| `vault_breach` | `[address, vault_id]` | `penalty_amount` |
| `proposal_created` | `[group_id, proposal_id]` | `Proposal` |
| `vote_cast` | `[group_id, proposal_id, voter]` | `Vote` |
| `proposal_executed` | `[group_id, proposal_id]` | `result` |
| `group_paused` | `[group_id, caller]` | `reason` |

### Asset Handling

The contract uses Stellar's token interface (SEP-41 / Token Interface) throughout:
- Native XLM via `stellar_sdk::token::StellarAssetClient`
- USDC / EURC and other SEP-41 tokens via the same interface
- Token address is stored per-group at creation time
- All fund custody is held by the contract account; no external escrow

---

## Backend Layer

### Service Map

```
backend/src/
├── server.ts              # Express app bootstrap
├── indexer/
│   ├── EventPoller.ts     # Polls Horizon for new Soroban events
│   ├── EventProcessor.ts  # Parses raw events, calls handlers
│   ├── handlers/          # One handler per event type
│   └── cursor.ts          # Tracks last-processed ledger
├── api/
│   ├── routes/            # REST route handlers
│   │   ├── groups.ts
│   │   ├── members.ts
│   │   ├── contributions.ts
│   │   ├── payouts.ts
│   │   ├── loans.ts
│   │   ├── milestones.ts
│   │   ├── vaults.ts
│   │   └── governance.ts
│   └── middleware/        # Auth, rate limiting, validation
├── graphql/
│   ├── schema.ts          # Type definitions
│   ├── resolvers/         # Resolvers per domain
│   └── subscriptions/     # WebSocket subscriptions
├── db/
│   ├── migrations/        # Timestamped SQL migrations
│   ├── models/            # Knex query builders
│   └── seeds/             # Test data
├── services/
│   ├── StellarService.ts  # Horizon + Soroban RPC wrapper
│   ├── NotificationService.ts
│   └── CreditService.ts   # Off-chain credit score aggregation
└── config/                # Environment config with validation
```

### Authentication

StellarCircle uses SEP-10 (Stellar Web Authentication) for stateless, wallet-native auth:

1. Client requests a challenge from `GET /auth/challenge?account=G...`
2. Server issues a signed challenge transaction
3. Wallet signs the challenge; client submits to `POST /auth/token`
4. Server verifies the signature against the Stellar account; issues a short-lived JWT
5. All subsequent API calls carry the JWT in `Authorization: Bearer`

No passwords. No email required. The Stellar keypair is the identity.

### Indexer Design

The indexer is a background service that keeps the PostgreSQL database in sync with on-chain state:

```
Horizon /events stream
        │
        ▼
  EventPoller (long-poll, cursor-based)
        │
        ▼
  EventProcessor (parse XDR topics + data)
        │
        ├── GroupHandler      → updates groups table
        ├── ContribHandler    → updates contributions table
        ├── PayoutHandler     → updates payouts table
        ├── LoanHandler       → updates loans table
        ├── MilestoneHandler  → updates milestones table
        ├── VaultHandler      → updates vaults table
        └── GovernanceHandler → updates proposals + votes table
              │
              ▼
        PostgreSQL + Redis pub/sub
              │
              ▼
        GraphQL subscriptions → WebSocket → Frontend
```

The indexer cursor is stored in PostgreSQL; on restart it resumes from the last processed ledger sequence number. This guarantees at-least-once processing with idempotent handlers.

---

## Frontend Layer

### Application Structure

```
frontend/src/
├── pages/                 # Route-level page components
│   ├── Dashboard.tsx      # Overview: all circles, balances
│   ├── CreateCircle.tsx   # Group creation wizard (pillar selector)
│   ├── CircleDetail.tsx   # Single group: contribute, vote, view
│   ├── LendingCircle.tsx  # Loan request + repayment UI
│   ├── Vault.tsx          # Personal accountability vault
│   ├── Milestones.tsx     # Milestone management
│   └── Governance.tsx     # Proposal + voting UI
├── components/
│   ├── layout/            # Nav, sidebar, footer
│   ├── circle/            # Circle cards, member lists, contribution timelines
│   ├── wallet/            # WalletConnect button, balance display
│   ├── governance/        # Proposal cards, vote buttons
│   └── shared/            # Buttons, modals, toasts, loaders
├── hooks/
│   ├── useCircle.ts       # React Query hooks for group data
│   ├── useWallet.ts       # Freighter / WalletConnect integration
│   ├── useStellar.ts      # Soroban contract call helpers
│   └── useSubscription.ts # GraphQL WebSocket subscriptions
├── stellar/
│   ├── client.ts          # Soroban RPC client setup
│   ├── contracts/         # Generated TypeScript bindings
│   └── transactions.ts    # Transaction builder + fee estimation
├── store/                 # Zustand global state
├── theme/                 # MUI theme tokens (design system)
└── utils/                 # Format helpers, error parsing
```

### Wallet Integration Flow

```
User clicks "Connect Wallet"
        │
        ▼
WalletModal shows options (Freighter / Lobstr / WalletConnect / Albedo)
        │
        ▼
SDK requests public key from chosen wallet
        │
        ▼
Backend SEP-10 challenge issued + wallet signs
        │
        ▼
JWT stored in memory (not localStorage for security)
        │
        ▼
React Query initialised with authenticated axios instance
```

### Transaction Signing Flow

```
User initiates action (e.g. "Contribute")
        │
        ▼
frontend builds XDR transaction via Soroban SDK
        │
        ▼
Transaction sent to wallet for signing (Freighter.signTransaction)
        │
        ▼
Signed XDR submitted to Horizon via backend relay OR direct Soroban RPC
        │
        ▼
Backend indexer picks up emitted event → updates DB
        │
        ▼
GraphQL subscription pushes update → UI reflects new state
```

---

## Mobile Layer

The mobile app is an Expo React Native application sharing business logic hooks with the web frontend via a shared `packages/core` library.

Key differences from web:
- Uses `@stellar/freighter-api` mobile SDK where available; falls back to WalletConnect deep-link flow
- Push notifications via Expo Notifications (Firebase / APNs) for contribution reminders and payout alerts
- Biometric authentication layer wraps JWT storage in secure enclave
- Offline-first: React Query persistence via MMKV adapter; queued transactions synced on reconnect

---

## Data Layer

### PostgreSQL Schema (core tables)

```sql
-- Groups
groups (id, pillar_type, config_json, status, created_at, updated_at)

-- Members
memberships (group_id, address, joined_at, status)

-- Contributions
contributions (group_id, address, cycle, amount, asset, tx_hash, created_at)

-- Payouts
payouts (group_id, recipient, cycle, amount, asset, tx_hash, executed_at)

-- Loans
loans (group_id, borrower, amount, issued_at, due_at, repaid_amount, status)

-- Credit records
credit_records (address, on_time_repayments, missed_repayments, score, updated_at)

-- Milestones
milestones (group_id, milestone_index, description, verifier, attested_at, funds_released_at)

-- Vaults
vaults (address, goal_amount, deadline, current_amount, streak, status)

-- Governance
proposals (group_id, proposal_index, type, payload_json, votes_for, votes_against, status, executed_at)
votes (group_id, proposal_id, voter, vote, cast_at)

-- Indexer state
indexer_cursor (id, last_ledger_sequence, updated_at)
```

### Redis Usage

| Key Pattern | TTL | Purpose |
|-------------|-----|---------|
| `session:{jwt_id}` | 24h | JWT revocation list |
| `rate:{ip}` | 1min | Rate limit counters |
| `group_cache:{group_id}` | 30s | Frequently-read group state |
| `pubsub:group:{group_id}` | — | Real-time event pub/sub for WS |
| `credit_cache:{address}` | 5min | Credit score read cache |

---

## Cross-Cutting Concerns

### Error Handling

- Contract errors are strongly typed via the `StellarCircleError` enum; the backend maps them to HTTP status codes and human-readable messages
- Frontend displays user-friendly error toasts with on-chain transaction links for debugging
- All backend errors are logged with correlation IDs traceable through the stack

### Observability

- **Metrics**: Prometheus counters/gauges exported from backend; dashboards in Grafana
- **Tracing**: OpenTelemetry spans across backend services; exported to Jaeger/OTLP
- **Logging**: Structured JSON logs (Pino) with correlation IDs; shipped to log aggregator
- **Uptime**: Synthetic monitors ping key endpoints every 60s; alert on degraded response

### Internationalisation (i18n)

- Frontend uses `react-i18next`; translation files under `frontend/src/locales/`
- Initial languages: English, French, Spanish, Portuguese, Yoruba, Igbo, Swahili
- Backend API returns locale-aware error messages when `Accept-Language` header is present

### Accessibility

- Frontend targets WCAG 2.1 AA
- Keyboard navigation for all interactive elements
- Screen reader annotations on all wallet and transaction flow components
- Colour contrast ratios enforced via MUI theme tokens

---

## The Five Pillar Contract Models

Each pillar corresponds to a `pillar_type` on the `Group` struct. The contribution engine is shared; payout logic diverges per pillar.

### Pillar A — ROSCA State Machine

```
OPEN → ACTIVE → CYCLE_N → PAYOUT_N → CYCLE_N+1 → ... → COMPLETE
         │                                                    │
         └──── PAUSED ──────────────────────────────────────►┘
```

- State advances automatically when all members contribute in a cycle
- If a deadline passes without full contributions, a grace period triggers; unmet contributions raise a `missed_contribution` event
- After grace, the cycle proceeds with a proportional penalty deducted

### Pillar B — Goal-Based Savings State Machine

```
OPEN → FUNDING → GOAL_MET → RELEASING → COMPLETE
                    │
                    └── DEADLINE_PASSED → REFUNDING → REFUNDED
```

- `FUNDING`: members contribute freely; balance tracked
- `GOAL_MET`: contract locks and triggers multi-sig approval flow
- `DEADLINE_PASSED`: if goal not met, refund all contributors

### Pillar C — Accountability Vault State Machine

```
CREATED → ACTIVE → STREAK_MAINTAINED
              │
              └── CONTRIBUTION_MISSED → BREACH → PENALTY_SPLIT → ENDED
```

- Witnesses nominated at creation; witness addresses stored on-chain
- Penalty on breach: configurable % of locked funds split among witnesses; remainder returned to vault owner

### Pillar D — Lending Circle State Machine

```
OPEN → POOL_FUNDED → LOAN_ACTIVE → REPAYMENT → LOAN_CLEARED → NEXT_CYCLE
                          │
                          └── MISSED_REPAYMENT → GOVERNANCE_REVIEW
```

- Loan recipient chosen by governance vote or rotation
- Credit score updated on-chain after each cycle
- Missed repayment triggers a governance proposal to decide next steps

### Pillar E — Milestone Vault State Machine

```
CREATED → LOCKED → MILESTONE_1_PENDING → ATTESTED → PARTIAL_RELEASE
                         │
                         └── DEADLINE_MISSED → GOVERNANCE_REVIEW or REFUND
```

- Each milestone can have a different verifier address
- Attestation is a signed Soroban invocation from the verifier
- Funds release proportionally per milestone weight

---

## Key Data Flows

### 1. Creating a Circle

```
User fills CreateCircle form → selects pillar(s)
    │
    ▼
Frontend builds create_group() transaction (XDR)
    │
    ▼
Wallet signs → Horizon submits
    │
    ▼
Contract emits group_created event
    │
    ▼
Indexer processes event → inserts into groups table
    │
    ▼
GraphQL subscription notifies dashboard → group appears in UI
```

### 2. Contributing to a Circle

```
User clicks "Contribute" on CircleDetail page
    │
    ▼
Frontend calls contribute(group_id, amount) → builds XDR
    │
    ▼
Wallet signs → submitted to Soroban RPC
    │
    ▼
Contract validates: member exists, cycle open, amount correct
    │
    ▼
Funds transferred from member to contract escrow
    │
    ▼
contribution_made event emitted
    │
    ▼
Indexer updates contributions table
    │
    ▼
If all members contributed → contract auto-executes payout
    │
    ▼
payout_executed event emitted → recipient receives funds
    │
    ▼
UI updates: contribution timeline, balance, next recipient
```

### 3. Governance Vote

```
Member creates proposal via Governance page
    │
    ▼
propose() transaction signed + submitted
    │
    ▼
Proposal stored on-chain; proposal_created event emitted
    │
    ▼
Members see proposal in UI, cast votes (vote() transaction)
    │
    ▼
When quorum + majority reached, any member can call execute_proposal()
    │
    ▼
Contract executes the encoded action (e.g. update config, pause group)
    │
    ▼
proposal_executed event → indexer → UI reflects result
```

---

## Security Architecture

| Concern | Mitigation |
|---------|-----------|
| Fund custody | Held entirely in Soroban contract; no EOA |
| Auth | SEP-10 wallet-signed challenge; JWTs short-lived (1h) |
| Contract upgrades | Multi-sig governance vote required |
| Emergency pause | Creator-only `pause_group`; governance can override |
| Re-entrancy | Soroban's synchronous execution model prevents re-entrancy |
| Integer overflow | Rust `checked_add` / `checked_mul` throughout |
| Input validation | All parameters validated on-chain before state mutation |
| Rate limiting | Backend enforces per-IP and per-account rate limits |
| Secrets | All secrets in environment variables; never in code |
| Dependency scanning | Dependabot + cargo audit on every PR |
| SAST | Semgrep + Clippy lints enforced in CI |

For the full threat model see [docs/threat-model.md](docs/threat-model.md).

---

## Scalability Considerations

- **Contract**: Soroban's per-ledger limits are the primary constraint; the indexer batches event queries to stay within Horizon rate limits
- **Indexer**: Horizontally scalable with leader election via PostgreSQL advisory locks; only one indexer processes events at a time, but read replicas can serve queries
- **Backend API**: Stateless Express instances behind a load balancer; session state in Redis
- **Frontend**: Static assets served from CDN; API calls to backend cluster
- **Database**: PostgreSQL with read replicas for reporting queries; partitioned contributions table by `group_id` hash for large deployments

---

## Infrastructure

```
GitHub Actions CI/CD
        │
        ├── Test → Build → Docker image → ECR
        │
        ├── Terraform plan/apply → AWS ECS (backend) + RDS (postgres) + ElastiCache (redis)
        │
        └── Frontend → S3 + CloudFront CDN

Environments:
  testnet  → testnet.stellarcircle.app  → Stellar Testnet
  staging  → staging.stellarcircle.app  → Stellar Testnet (production parity)
  mainnet  → stellarcircle.app          → Stellar Mainnet
```

For deployment guides see [docs/deployment.md](docs/deployment.md).

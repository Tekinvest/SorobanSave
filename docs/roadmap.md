# StellarCircle — Product Roadmap

This roadmap outlines the planned development of StellarCircle across versioned milestones. Each version builds on the last, progressively unlocking all five pillars and expanding the ecosystem.

> Status indicators: ✅ Done · 🔄 In Progress · 📋 Planned · 🔮 Future

---

## v1.0 — Foundation (Pillar A: ROSCA) — Testnet

**Goal**: Prove the core rotating savings model works end-to-end on Stellar Testnet. Ship a minimal but fully functional protocol.

| Feature | Status |
|---------|--------|
| Soroban smart contract: group creation | ✅ Done |
| Member join / leave | ✅ Done |
| Fixed-amount contribution per cycle | ✅ Done |
| Automatic payout rotation (fixed order) | ✅ Done |
| Native XLM support | ✅ Done |
| Contract event emission | ✅ Done |
| Emergency pause / unpause (creator) | ✅ Done |
| Backend event indexer (basic) | ✅ Done |
| REST API: groups, members, contributions | ✅ Done |
| React frontend: connect wallet, create, join, contribute | ✅ Done |
| SEP-10 authentication | ✅ Done |
| CI/CD pipeline (GitHub Actions) | ✅ Done |
| Testnet deployment | ✅ Done |
| Basic documentation | ✅ Done |

---

## v1.1 — Stable ROSCA + Multi-Asset — Testnet → Mainnet

**Goal**: Harden the ROSCA contract, add USDC/EURC support, and launch on Mainnet.

| Feature | Status |
|---------|--------|
| USDC and EURC token support (SEP-41) | 🔄 In Progress |
| Custom SEP-41 token support | 🔄 In Progress |
| Randomised payout order (VRF-based) | 📋 Planned |
| Late contribution penalty enforcement | 📋 Planned |
| Grace period configuration | 📋 Planned |
| Group invite links and QR codes | 📋 Planned |
| On-chain credit record initialization | 📋 Planned |
| GraphQL API layer | 📋 Planned |
| WebSocket real-time updates | 📋 Planned |
| Frontend: contribution timeline UI | 📋 Planned |
| Frontend: payout rotation visualiser | 📋 Planned |
| Security audit (scope: Pillar A contract) | 📋 Planned |
| Mainnet deployment | 📋 Planned |
| Full API documentation | 📋 Planned |

**Target**: Q1 next year

---

## v2.0 — Goal-Based Savings + Accountability Vault (Pillars B & C)

**Goal**: Expand the protocol to support collective goal saving and personal accountability vaults.

| Feature | Status |
|---------|--------|
| Pillar B: Goal-based group savings contract | 📋 Planned |
| Goal progress tracking (on-chain + indexed) | 📋 Planned |
| Auto-release on goal reached | 📋 Planned |
| Multi-sig release approval flow | 📋 Planned |
| Deadline-triggered refund flow | 📋 Planned |
| Pillar C: Personal accountability vault contract | 📋 Planned |
| Witness nomination and on-chain visibility | 📋 Planned |
| Breach penalty logic + witness reward split | 📋 Planned |
| Contribution streak tracking | 📋 Planned |
| On-chain completion badge / attestation record | 📋 Planned |
| Frontend: goal progress bar + contributor feed | 📋 Planned |
| Frontend: vault detail with streak ring | 📋 Planned |
| Push notifications (web + mobile) | 📋 Planned |
| Mobile app beta (Expo React Native) | 📋 Planned |
| i18n: French, Spanish, Portuguese | 📋 Planned |

**Target**: Q2 next year

---

## v2.1 — Lending Circle + Milestone Vaults (Pillars D & E)

**Goal**: Complete the five-pillar protocol with cooperative lending and milestone-gated fund release.

| Feature | Status |
|---------|--------|
| Pillar D: Lending circle contract | 📋 Planned |
| Loan issuance (rotation + governance-vote methods) | 📋 Planned |
| On-chain repayment tracking | 📋 Planned |
| Cross-group credit score (on-chain record) | 📋 Planned |
| Missed repayment → governance trigger | 📋 Planned |
| Pillar E: Milestone-unlocked savings contract | 📋 Planned |
| Milestone definition + verifier assignment | 📋 Planned |
| Verifier attestation flow | 📋 Planned |
| Proportional fund release per milestone | 📋 Planned |
| Oracle integration for automated verification | 📋 Planned |
| Frontend: lending circle repayment UI | 📋 Planned |
| Frontend: milestone tracker | 📋 Planned |
| Credit score profile page | 📋 Planned |
| Localization: Yoruba, Igbo, Swahili | 📋 Planned |
| Security audit (scope: Pillars B–E) | 📋 Planned |

**Target**: Q3 next year

---

## v3.0 — On-Chain Governance + Mobile GA

**Goal**: Full decentralised governance over group decisions, and a production-ready mobile app.

| Feature | Status |
|---------|--------|
| On-chain governance: proposals, voting, execution | 📋 Planned |
| Governance-controlled config changes | 📋 Planned |
| Governance-controlled fund release | 📋 Planned |
| Supermajority emergency withdrawal | 📋 Planned |
| Governance UI (proposals, vote tally, history) | 📋 Planned |
| Mobile app v1.0 GA (iOS + Android) | 📋 Planned |
| Biometric auth for mobile | 📋 Planned |
| Offline-first sync (MMKV + queued txns) | 📋 Planned |
| Deep linking for circle invites | 📋 Planned |
| Group templates (preset configurations) | 📋 Planned |
| Reputation / profile system | 📋 Planned |
| Public API for third-party integrations | 📋 Planned |
| Stellar Quest integration (tutorial quests) | 📋 Planned |
| Community governance of protocol parameters | 🔮 Future |

**Target**: Q4 next year

---

## v4.0 — Fiat On/Off-Ramps + Cross-Group Credit

**Goal**: Bridge traditional finance to StellarCircle; make the credit record a portable financial identity.

| Feature | Status |
|---------|--------|
| Fiat on-ramp integration (MoneyGram / Stripe / local providers) | 🔮 Future |
| Fiat off-ramp (withdraw to mobile money, bank) | 🔮 Future |
| KYC-lite flow (SEP-12 integration for regulated markets) | 🔮 Future |
| Cross-group portable credit score | 🔮 Future |
| Credit score export (DID / Verifiable Credential) | 🔮 Future |
| Institutional lending partners using on-chain credit | 🔮 Future |
| DAO treasury for protocol sustainability | 🔮 Future |
| Multi-chain support (Stellar + EVM bridge) | 🔮 Future |
| SDK for third-party app integration | 🔮 Future |
| White-label circle solution for NGOs / cooperatives | 🔮 Future |
| Compliance tooling for regulated jurisdictions | 🔮 Future |

**Target**: Year 2

---

## Long-Term Vision

StellarCircle aims to be the infrastructure layer for community finance on Stellar. Long-term goals:

- **Universal credit record**: Every completed circle, repaid loan, and met milestone contributes to a portable on-chain financial identity that banks and DeFi protocols can reference
- **Protocol governance**: A community DAO governs protocol upgrades, fee parameters, and treasury allocation
- **Ecosystem integrations**: Anchor integrations via SEP-6/24 for seamless fiat; Stellar Quest quests for onboarding; Stellar Aid Assist for humanitarian use cases
- **Financial inclusion at scale**: Partner with NGOs, cooperatives, and microfinance institutions to deploy StellarCircle for real communities across Africa, Latin America, and Southeast Asia

---

## Version Summary

| Version | Pillars | Highlights | Target |
|---------|---------|-----------|--------|
| v1.0 | A | ROSCA on Testnet | Shipped |
| v1.1 | A | Multi-asset, Mainnet | Q1 |
| v2.0 | A + B + C | Goal savings, Accountability vault | Q2 |
| v2.1 | A–E | Lending + Milestone vaults, Credit score | Q3 |
| v3.0 | A–E | Governance, Mobile GA | Q4 |
| v4.0 | A–E | Fiat ramps, Portable credit | Year 2 |

---

*This roadmap is a living document. Priorities may shift based on community feedback, security findings, and ecosystem developments. Propose changes via GitHub Discussions or through an on-chain governance proposal (v3.0+).*

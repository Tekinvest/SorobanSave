# StellarCircle — Design Flows

This document describes the end-to-end user experience and system interaction flows for every major action in StellarCircle. Each flow is presented as a step-by-step narrative, a sequence diagram, and a screen-by-screen UI walkthrough.

## Table of Contents

1. [Onboarding & Wallet Connection](#1-onboarding--wallet-connection)
2. [Pillar A — Creating & Running a ROSCA Circle](#2-pillar-a--creating--running-a-rosca-circle)
3. [Pillar B — Goal-Based Group Savings](#3-pillar-b--goal-based-group-savings)
4. [Pillar C — Social Accountability Vault](#4-pillar-c--social-accountability-vault)
5. [Pillar D — Lending Circle](#5-pillar-d--lending-circle)
6. [Pillar E — Milestone-Unlocked Savings](#6-pillar-e--milestone-unlocked-savings)
7. [Governance Flow](#7-governance-flow)
8. [Emergency Pause & Recovery](#8-emergency-pause--recovery)
9. [Error & Edge Case Flows](#9-error--edge-case-flows)

---

## 1. Onboarding & Wallet Connection

### 1.1 First Visit — New User

```
[Landing Page]
    │
    ├── Hero: "Save together. Build together. On Stellar."
    ├── CTA: "Connect Wallet" or "Learn More"
    │
    ▼
[Connect Wallet Modal]
    ├── Option: Freighter (recommended)
    ├── Option: Lobstr
    ├── Option: Albedo
    ├── Option: WalletConnect (scan QR)
    └── Option: XBULL
    │
    ▼ (User selects Freighter)
[Browser prompts Freighter extension]
    │
    ▼
[Freighter returns public key G...]
    │
    ▼
[Backend: GET /auth/challenge?account=G...]
    │
    ▼
[Freighter signs challenge transaction]
    │
    ▼
[Backend: POST /auth/token → returns JWT]
    │
    ▼
[Dashboard — authenticated]
    ├── My Circles (empty for new user)
    ├── Discover Circles (open groups to join)
    └── CTA: "Create Your First Circle"
```

**Screen: Dashboard (empty state)**
- Welcome banner explaining the five pillars
- "Create Circle" button prominently displayed
- "Join a Circle" section with publicly listed open groups
- XLM balance displayed in header (fetched from Horizon)

### 1.2 Returning User

```
[App loads → checks for stored session]
    │
    ├── Session valid → auto-connect wallet → Dashboard
    └── Session expired → prompt wallet re-sign → Dashboard
```

### 1.3 Mobile Onboarding

```
[App launch → splash screen]
    │
    ▼
[Onboarding carousel: 3 screens explaining pillars]
    │
    ▼
[Connect Wallet screen]
    ├── Freighter mobile deeplink
    ├── WalletConnect QR / universal link
    └── Lobstr deeplink
    │
    ▼
[Biometric setup (optional)]
    │
    ▼
[Push notification permission request]
    │
    ▼
[Dashboard]
```

---

## 2. Pillar A — Creating & Running a ROSCA Circle

### 2.1 Creating a ROSCA

**Actor**: Circle creator

```
[Dashboard] → "Create Circle" button
    │
    ▼
[Create Circle Wizard — Step 1: Choose Pillar]
    ├── A: Rotating Savings (ROSCA) ← selected
    ├── B: Goal-Based Savings
    ├── C: Accountability Vault
    ├── D: Lending Circle
    └── E: Milestone Savings
    │
    ▼
[Step 2: Circle Settings]
    ├── Circle Name (text input)
    ├── Contribution Amount (number + asset selector: XLM / USDC / EURC)
    ├── Cycle Duration (e.g. 7 days, 14 days, 30 days)
    ├── Max Members (2–20)
    ├── Payout Order (fixed rotation / random at start)
    ├── Late Penalty % (0–20%)
    └── Grace Period (hours after deadline before cycle closes)
    │
    ▼
[Step 3: Review & Confirm]
    ├── Summary of all settings
    ├── Estimated gas fee (XLM)
    └── "Create Circle" button
    │
    ▼
[Wallet signs create_group() transaction]
    │
    ▼
[Confirmation screen]
    ├── "Circle Created!" 
    ├── Shareable invite link / QR code
    └── "Go to Circle" button
```

**Sequence Diagram**:
```
Creator       Frontend          Backend           Stellar
   │               │                │                │
   │─ fill form ──►│                │                │
   │               │─ build XDR ───►│                │
   │               │◄── XDR ────────│                │
   │◄── sign? ─────│                │                │
   │─ sign ───────►│                │                │
   │               │─ submit tx ───────────────────►│
   │               │                │◄─ event ───────│
   │               │                │─ index group ──│
   │               │◄── WS push ────│                │
   │◄── confirmed ─│                │                │
```

### 2.2 Joining a ROSCA

**Actor**: New member

```
[Receives invite link / finds circle in Discover]
    │
    ▼
[Circle Detail page — public view]
    ├── Circle name, pillar type, status: OPEN
    ├── Contribution: 50 XLM · Cycle: 30 days · Members: 3/8
    ├── Member list (addresses / display names)
    └── "Join Circle" button
    │
    ▼
[Join confirmation modal]
    ├── Summary: "You will contribute 50 XLM every 30 days"
    ├── Total commitment: 400 XLM over 8 cycles
    └── "Confirm & Sign" button
    │
    ▼
[Wallet signs join_group() transaction]
    │
    ▼
[Circle Detail — member view]
    ├── Your position in payout rotation: #4
    ├── Next contribution due: [date]
    └── Contribution timeline
```

### 2.3 Contributing in a Cycle

```
[Dashboard notification: "Contribution due in 3 days"]
    │
    ▼
[Circle Detail page]
    ├── Cycle status: ACTIVE — Cycle 2 of 8
    ├── Contributions: 5/8 received
    ├── Your status: ⏳ Pending
    └── "Contribute 50 XLM" button
    │
    ▼
[Contribution modal]
    ├── Amount: 50 XLM (pre-filled, locked)
    ├── Current wallet balance: 312 XLM
    └── "Confirm & Sign"
    │
    ▼
[Wallet signs contribute() transaction]
    │
    ▼
[Circle Detail refreshes]
    ├── Your status: ✅ Contributed
    ├── Contributions: 6/8
    └── [When 8/8]: payout auto-executes → recipient notified
```

### 2.4 Receiving a Payout

```
[All 8 members contributed → contract auto-executes payout]
    │
    ▼
[Recipient gets push notification + in-app banner]
    ├── "🎉 You received 400 XLM from Circle 'Osusu Family'"
    └── Transaction link on Stellar Explorer
    │
    ▼
[Circle Detail updates]
    ├── Cycle 2 → complete
    ├── Next payout recipient highlighted
    └── Cycle 3 timer starts
```

---

## 3. Pillar B — Goal-Based Group Savings

### 3.1 Creating a Goal Circle

```
[Create Circle Wizard → Pillar B selected]
    │
    ▼
[Step 2: Goal Settings]
    ├── Circle Name
    ├── Goal Description (e.g. "Buy a community generator")
    ├── Target Amount (e.g. 10,000 USDC)
    ├── Asset (USDC / XLM / EURC)
    ├── Contribution Schedule: Open (anytime) or Scheduled (weekly/monthly)
    ├── Deadline (date picker)
    ├── Release Method: Auto-release / Multi-sig (2-of-N member approval)
    └── Spending Category (Equipment / Education / Business / Other)
    │
    ▼
[Step 3: Review & Create]
    │
    ▼
[Circle created → share invite]
```

### 3.2 Tracking Progress & Contributing

```
[Goal Circle Detail page]
    ├── Progress bar: 4,200 / 10,000 USDC (42%)
    ├── Days remaining: 23
    ├── Contributors: 12 members
    ├── Recent contributions feed
    └── "Contribute" button (open amount input)
    │
    ▼
[User enters amount → signs → contributes]
    │
    ▼
[Progress bar updates in real time via WS]
```

### 3.3 Goal Met — Fund Release

```
[Balance reaches 10,000 USDC]
    │
    ▼
[goal_reached event emitted]
    │
    ▼ (if Auto-release)
[Funds transferred to creator's designated address]
    │
    ▼ (if Multi-sig)
[Release proposal created automatically]
    ├── Members vote on Governance page
    └── On approval → funds released
    │
    ▼
[All contributors notified: "Goal reached! Funds released."]
```

### 3.4 Deadline Passed — Refund Flow

```
[Deadline passes; goal not met]
    │
    ▼
[Contract enters REFUNDING state]
    │
    ▼
[Each contributor calls withdraw() OR backend triggers batch refund]
    │
    ▼
[Full amounts returned on-chain, no fees deducted]
    │
    ▼
[Contributors notified: "Goal was not met. Your funds have been returned."]
```

---

## 4. Pillar C — Social Accountability Vault

### 4.1 Creating a Personal Vault

```
[Dashboard → "Create Vault" (or via Create Circle → Pillar C)]
    │
    ▼
[Vault Setup]
    ├── Savings Goal Description (e.g. "Emergency fund — 6 months")
    ├── Target Amount (e.g. 1,200 USDC)
    ├── Contribution Schedule: Weekly / Monthly
    ├── Contribution Amount per period
    ├── Commitment Duration (e.g. 12 months)
    ├── Early Withdrawal Penalty % (e.g. 10%)
    ├── Nominate Witnesses (up to 5 Stellar addresses)
    └── Witness Reward % (split of penalty on breach)
    │
    ▼
[Lock initial amount to activate vault → wallet signs]
    │
    ▼
[Vault created — witnesses notified via on-chain event + optional email]
```

### 4.2 Regular Contribution

```
[Push notification / email: "Vault contribution due tomorrow"]
    │
    ▼
[Vault Detail page]
    ├── Progress ring: 3/12 months complete
    ├── Current balance: 300 USDC
    ├── Streak: 🔥 3 consecutive on-time contributions
    ├── Witnesses: [avatars] — all watching
    └── "Contribute 100 USDC" button
    │
    ▼
[Sign → contribute → streak increments]
    │
    ▼
[vault_contribution event → witnesses can see streak on-chain]
```

### 4.3 Missed Contribution — Breach Flow

```
[Contribution deadline passes → no contribution detected]
    │
    ▼
[vault_breach event emitted]
    │
    ▼
[Grace period: 24h → still no contribution]
    │
    ▼
[Penalty deducted from locked balance]
    ├── Penalty split among active witnesses
    └── Remaining balance stays in vault
    │
    ▼
[Owner + witnesses notified]
    ├── Streak resets to 0
    └── Vault remains ACTIVE (owner can continue)
```

### 4.4 Vault Completion

```
[All contributions made on time OR target amount reached]
    │
    ▼
[Vault enters COMPLETE state]
    │
    ▼
[Full balance released to owner's wallet]
    │
    ▼
[Completion badge minted as on-chain record]
    └── Visible on profile / shared to social
```

---

## 5. Pillar D — Lending Circle

### 5.1 Creating a Lending Circle

```
[Create Circle → Pillar D]
    │
    ▼
[Lending Circle Settings]
    ├── Circle Name
    ├── Pool Contribution (per member, per cycle)
    ├── Asset (XLM / USDC)
    ├── Cycle Length (30 / 60 / 90 days)
    ├── Max Members
    ├── Loan Selection Method: Rotation / Governance Vote
    ├── Repayment Period (cycles until loan must be repaid)
    └── Missed Repayment Policy: Pause eligibility / Governance vote
    │
    ▼
[Circle created → members join as usual]
```

### 5.2 Loan Request & Approval

**Rotation method:**
```
[Cycle opens → next member in rotation receives loan automatically]
    │
    ▼
[Pool fully funded by all member contributions]
    │
    ▼
[loan_issued event → funds sent to borrower]
```

**Governance vote method:**
```
[Cycle opens → any eligible member submits loan request]
    │
    ▼
[request_loan() transaction]
    │
    ▼
[Governance proposal created automatically]
    │
    ▼
[Members vote within 48h]
    │
    ▼
[Quorum reached → proposal executed → loan_issued]
```

### 5.3 Loan Repayment

```
[Borrower receives push reminder: "Loan repayment due in 7 days"]
    │
    ▼
[Lending Circle Detail — Borrower view]
    ├── Loan amount: 500 USDC
    ├── Repaid so far: 200 USDC
    ├── Remaining: 300 USDC
    ├── Due date: [date]
    └── "Repay" button (custom amount input)
    │
    ▼
[Partial or full repayment → repay_loan() → signed]
    │
    ▼
[On full repayment: loan_repaid event]
    ├── Credit score updated on-chain (+1 on-time)
    └── Member eligible for future loans
```

### 5.4 Missed Repayment

```
[Repayment deadline passed → no repayment]
    │
    ▼
[missed_repayment event]
    │
    ▼
[Credit score updated (-2 missed)]
    │
    ▼
[Governance proposal auto-created]
    ├── Option 1: Grant extension (30 days)
    ├── Option 2: Freeze borrower eligibility
    └── Option 3: Use group emergency fund (if configured)
    │
    ▼
[Members vote → proposal executes]
```

---

## 6. Pillar E — Milestone-Unlocked Savings

### 6.1 Creating a Milestone Vault

```
[Create Circle → Pillar E]
    │
    ▼
[Milestone Vault Settings]
    ├── Vault Name (e.g. "Business Expansion Fund")
    ├── Total Amount to Lock
    ├── Asset
    ├── Add Milestones:
    │     ├── Milestone 1: "Register business" — 20% of funds — Verifier: [address]
    │     ├── Milestone 2: "Hire first employee" — 30% — Verifier: [address]
    │     └── Milestone 3: "Reach 1,000 customers" — 50% — Verifier: [address]
    └── Fallback: Refund / Governance vote (on deadline miss)
    │
    ▼
[Lock funds → wallet signs]
    │
    ▼
[Vault created; verifiers notified]
```

### 6.2 Milestone Attestation

**Actor**: Verifier

```
[Verifier receives notification: "Milestone 1 pending your review"]
    │
    ▼
[Verifier visits circle link OR uses their dashboard]
    │
    ▼
[Milestone Detail]
    ├── Description: "Register business"
    ├── Evidence submitted by creator (optional off-chain link)
    └── "Attest Milestone" button
    │
    ▼
[attest_milestone() signed by verifier]
    │
    ▼
[milestone_attested event emitted]
```

### 6.3 Funds Release

```
[Creator calls release_milestone_funds() after attestation]
    │
    ▼
[Contract verifies: attested=true, not yet released]
    │
    ▼
[milestone_funds_released event]
    │
    ▼
[20% of locked funds sent to creator's wallet]
    │
    ▼
[Vault UI updates: Milestone 1 ✅ — 20% released — 80% remaining]
```

### 6.4 Missed Milestone Deadline

```
[Milestone deadline passes without attestation]
    │
    ▼
[Governance proposal auto-created]
    ├── Option A: Extend deadline (vote required)
    ├── Option B: Refund locked portion to creator
    └── Option C: Reassign verifier
    │
    ▼
[Members / creator vote → executes]
```

---

## 7. Governance Flow

### 7.1 Creating a Proposal

```
[Any member on Governance tab → "New Proposal"]
    │
    ▼
[Proposal Form]
    ├── Title
    ├── Description
    ├── Type:
    │     ├── Config Change (e.g. update penalty %)
    │     ├── Add/Remove Member
    │     ├── Emergency Pause / Unpause
    │     ├── Fund Release Approval
    │     └── Free-form (text only, off-chain action)
    ├── Voting Period (24h / 48h / 7 days)
    └── Quorum required (e.g. 50% of members)
    │
    ▼
[propose() signed → proposal_created event]
    │
    ▼
[All members notified → voting opens]
```

### 7.2 Voting

```
[Member opens Governance tab]
    │
    ▼
[Active Proposals list]
    ├── Proposal title, type, deadline, current vote tally
    └── "Vote For" / "Vote Against" / "Abstain" buttons
    │
    ▼
[vote() transaction signed]
    │
    ▼
[vote_cast event → tally updates in real time via WS]
```

### 7.3 Execution

```
[Voting period ends → quorum + majority met]
    │
    ▼
[Any member can call execute_proposal()]
    │
    ▼
[Contract executes encoded action]
    │
    ▼
[proposal_executed event → UI marks proposal as Executed]
```

---

## 8. Emergency Pause & Recovery

### 8.1 Creator Pauses a Circle

```
[Creator → Circle Settings → "Pause Circle"]
    │
    ▼
[Confirmation: "This halts all contributions and payouts"]
    │
    ▼
[pause_group() signed by creator]
    │
    ▼
[group_paused event → all members notified]
    │
    ▼
[Circle Detail: status banner "⚠️ Circle paused — no contributions accepted"]
```

### 8.2 Governance Unpauses

```
[Member creates governance proposal: "Unpause Circle"]
    │
    ▼
[Vote passes → execute_proposal() → unpause_group()]
    │
    ▼
[Circle resumes from where it left off]
    ├── Current cycle extended by paused duration
    └── All members notified
```

### 8.3 Emergency Withdrawal (Critical)

```
[Governance proposal: "Emergency Withdraw"]
    │
    ▼
[Requires supermajority: 2/3 of members]
    │
    ▼
[On passage: emergency_withdraw() executed]
    │
    ▼
[All locked funds returned pro-rata to contributors]
    │
    ▼
[Circle dissolved — cannot be reopened]
```

---

## 9. Error & Edge Case Flows

### 9.1 Transaction Rejected by Wallet

```
[User clicks "Contribute" → wallet prompt appears]
    │
    ▼
[User rejects in wallet]
    │
    ▼
[Frontend shows toast: "Transaction cancelled. No funds were moved."]
    └── Contribution status remains: Pending
```

### 9.2 Insufficient Balance

```
[User attempts contribution with insufficient XLM]
    │
    ▼
[Frontend pre-validates balance before building transaction]
    │
    ▼
[Error modal: "Insufficient balance. You need 50 XLM + ~0.01 XLM for fees."]
    ├── "Top up with XLM" button → link to exchange / Stellar Quest
    └── "Cancel"
```

### 9.3 Joining a Full Circle

```
[User clicks "Join" on a circle at max capacity]
    │
    ▼
[Backend returns 409 Conflict]
    │
    ▼
[Toast: "This circle is full. You can join the waitlist or create your own."]
    └── "Start Similar Circle" CTA
```

### 9.4 Network / RPC Error

```
[Transaction submission fails due to Horizon timeout]
    │
    ▼
[Frontend retries up to 3 times with exponential backoff]
    │
    ▼ (still failing)
[Error banner: "Network issue. Transaction not submitted. Please try again."]
    ├── Transaction not signed again (reuse signed XDR)
    └── Retry button
```

### 9.5 Duplicate Contribution

```
[Member submits contribute() twice (e.g. double-click)]
    │
    ▼
[Contract checks: contribution flag already set for this cycle]
    │
    ▼
[Contract reverts with ContributionAlreadyMade error]
    │
    ▼
[Frontend maps error → "You've already contributed this cycle."]
```

---

## Screen Inventory

| Screen | Pillar | Description |
|--------|--------|-------------|
| Landing | All | Marketing page with CTA |
| Dashboard | All | My circles, vault overview, notifications |
| Discover | All | Browse open circles to join |
| Create Circle Wizard | All | Multi-step: pillar → settings → review |
| Circle Detail | A, B, D | Member list, contribution timeline, payout history |
| Vault Detail | C | Progress ring, streak, witness list |
| Milestone Detail | E | Milestone list, attestation status, release history |
| Lending Detail | D | Loan status, repayment schedule, credit score |
| Governance | All | Proposals list, vote UI, history |
| Profile | All | My circles, credit history, completion badges |
| Settings | All | Notifications, wallet, preferences |
| Admin / Creator | All | Circle settings, pause, dissolve |

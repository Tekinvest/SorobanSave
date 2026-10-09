# StellarCircle — User Guide

Welcome to StellarCircle. This guide walks you through everything you need to start saving, lending, and building financial discipline with your community — entirely on the Stellar blockchain.

## Table of Contents

1. [Before You Start](#1-before-you-start)
2. [Connecting Your Wallet](#2-connecting-your-wallet)
3. [Your Dashboard](#3-your-dashboard)
4. [Creating a Circle](#4-creating-a-circle)
5. [Joining a Circle](#5-joining-a-circle)
6. [Pillar A — Rotating Savings (ROSCA)](#6-pillar-a--rotating-savings-rosca)
7. [Pillar B — Goal-Based Group Savings](#7-pillar-b--goal-based-group-savings)
8. [Pillar C — Social Accountability Vault](#8-pillar-c--social-accountability-vault)
9. [Pillar D — Lending Circle](#9-pillar-d--lending-circle)
10. [Pillar E — Milestone-Unlocked Savings](#10-pillar-e--milestone-unlocked-savings)
11. [Governance — Voting on Proposals](#11-governance--voting-on-proposals)
12. [Notifications](#12-notifications)
13. [Your Profile & Credit Score](#13-your-profile--credit-score)
14. [Troubleshooting](#14-troubleshooting)
15. [Glossary](#15-glossary)

---

## 1. Before You Start

### What You Need

- A **Stellar wallet** with a public key (G...). We recommend [Freighter](https://freighter.app) for web or [Lobstr](https://lobstr.co) for mobile.
- Some **XLM** to cover transaction fees (~0.01 XLM per transaction) and your contributions.
- A **modern browser** (Chrome, Firefox, Brave, Edge) for the web app, or iOS/Android for the mobile app.

### What StellarCircle Is

StellarCircle is a community finance platform. You can:

- **Save together** with a group that pools and rotates payouts (ROSCA)
- **Save toward a shared goal** with your community (Goal-Based)
- **Hold yourself accountable** with a personal savings vault witnessed by friends (Accountability Vault)
- **Lend and borrow** within a trusted circle at zero interest (Lending Circle)
- **Unlock funds** as you achieve milestones in your business or personal goals (Milestone Vault)

All funds are held by smart contracts on Stellar — not by StellarCircle. You remain in control at all times.

---

## 2. Connecting Your Wallet

### Web App

1. Visit [stellarcircle.app](https://stellarcircle.app)
2. Click **Connect Wallet** in the top-right corner
3. Choose your wallet from the list:
   - **Freighter** — requires the browser extension installed
   - **Lobstr** — scan QR code or use mobile deep-link
   - **Albedo** — web-based, no extension needed
   - **WalletConnect** — for any WalletConnect-compatible wallet
4. Approve the connection in your wallet
5. Sign the authentication challenge (this proves ownership of your address — no funds move)
6. You are now logged in and your dashboard loads

### Mobile App

1. Download StellarCircle from the App Store or Google Play
2. Open the app and tap **Get Started**
3. Choose your wallet (Freighter mobile, Lobstr, or WalletConnect)
4. Approve the deep-link connection
5. Optionally enable Face ID / fingerprint for faster access

> **Note**: StellarCircle never has access to your private key. Signing happens inside your wallet app.

---

## 3. Your Dashboard

The dashboard is your home base. It shows:

- **My Circles** — all circles you have created or joined, with status indicators
- **Upcoming Actions** — contributions due, votes open, milestones to review
- **Recent Activity** — a feed of on-chain events across your circles
- **Wallet Balance** — your current XLM and token balances
- **Credit Score** — your on-chain lending reputation (visible once you participate in a Lending Circle)

---

## 4. Creating a Circle

1. Click **Create Circle** on your dashboard
2. **Choose a pillar** — the type of circle you want to run:

   | Pillar | Best For |
   |--------|---------|
   | A · Rotating Savings | Groups who want everyone to receive a lump sum in turns |
   | B · Goal-Based Savings | Groups saving toward a specific shared purchase or project |
   | C · Accountability Vault | Individuals who want community-enforced personal savings |
   | D · Lending Circle | Groups who want to lend to each other at zero interest |
   | E · Milestone Vault | Individuals or businesses unlocking funds as they hit milestones |

3. **Fill in the settings** for your chosen pillar (contribution amount, cycle length, members, etc.)
4. **Review the summary** — check the total commitment and estimated fees
5. **Sign the transaction** in your wallet
6. Your circle is created. Share the invite link with your group.

---

## 6. Pillar A — Rotating Savings (ROSCA)

### How It Works

Everyone contributes the same amount each cycle. The full pool goes to one member. In the next cycle it goes to the next member. This repeats until every member has received exactly once.

**Example**: 5 members, 100 XLM each, monthly cycles.
- Month 1: 500 XLM → Member 1
- Month 2: 500 XLM → Member 2
- ... and so on until Month 5

### As a Creator

When creating a ROSCA circle you set:
- **Contribution amount** (e.g. 100 XLM)
- **Cycle duration** (e.g. 30 days)
- **Maximum members** (e.g. 5)
- **Payout order** — fixed (first-come-first-served) or random (shuffled at the start)
- **Late penalty** — percentage deducted for late contributions (0–20%)
- **Grace period** — hours after the deadline before a missed contribution is penalised

### As a Member

- You will see your **position in the rotation** and when you are due to receive
- A **contribution button** appears on your circle page when the cycle is active
- You receive a **reminder notification** 3 days and 1 day before the deadline
- When it is your turn to receive, funds arrive in your wallet automatically — no action needed

### Key Rules

- You cannot contribute more or less than the set amount
- Missed contributions trigger the penalty after the grace period expires
- The circle completes when all members have received once

---

## 7. Pillar B — Goal-Based Group Savings

### How It Works

The group sets a target amount and deadline. Everyone contributes what they can (or on a schedule). When the goal is reached, the funds are released to the designated recipient or shared treasury.

**Example**: 10 friends saving 5,000 USDC to buy equipment for a community space. Anyone can contribute any amount; the goal must be met before the deadline or funds are refunded.

### As a Creator

- Set a **target amount**, **asset**, and **deadline**
- Choose **contribution style**: open (any amount, any time) or scheduled (fixed amounts on a schedule)
- Choose **release method**: auto-release to a wallet address, or require a multi-sig approval vote from members
- Add a **spending category** for transparency

### As a Member / Contributor

- Visit the circle page to see the **progress bar** and current total
- Click **Contribute** and enter your amount
- Watch the progress bar update in real time as others contribute
- If the goal is met before the deadline, funds are released and you are notified
- If the deadline passes without reaching the goal, your full contribution is returned automatically

---

## 8. Pillar C — Social Accountability Vault

### How It Works

You lock funds in a personal vault and commit to contributing regularly. Friends or family act as on-chain witnesses. If you miss a contribution, a penalty is deducted from your locked funds and shared among your witnesses as a reward for their attention.

**Example**: You want to save 1,200 USDC over 12 months. You nominate 3 friends as witnesses. Each month you contribute 100 USDC. If you miss a month, you lose a 10% penalty from your locked balance, split among your witnesses.

### Setting Up Your Vault

1. Go to **Create Circle → Pillar C**
2. Set your **savings goal**, **target amount**, **contribution schedule**, and **duration**
3. Set the **early withdrawal penalty** (e.g. 10%)
4. **Nominate witnesses** — enter up to 5 Stellar addresses of people you trust
5. Optionally add an **invite message** to your witnesses (sent via on-chain event)
6. Lock an initial deposit to activate the vault

### Witnesses

- Witnesses do not contribute money; they are accountability partners
- They see whether you are meeting your contribution schedule (pass/fail signal, no amounts)
- If you miss a contribution and the penalty fires, witnesses receive a share of the penalty as a reward
- Witnesses can be removed or replaced via a governance vote

### Completing Your Vault

When you complete all contributions on time:
- Your full locked balance is released to your wallet
- An **on-chain completion badge** is recorded to your profile
- Your streak count is displayed on your public profile

---

## 9. Pillar D — Lending Circle

### How It Works

Members pool contributions each cycle. One member per cycle receives the pool as a loan at zero interest. They repay it over the following cycle(s). Everyone in the circle benefits from access to a lump sum; repayment builds an on-chain credit record.

**Example**: 6 members each contribute 100 USDC per month. One member receives 600 USDC as a loan. They repay 200 USDC/month over the next 3 months while the next loan cycle begins.

### Loan Selection

Two methods are available (set at circle creation):

- **Rotation**: Loans go to members in a fixed rotation. Simple and predictable.
- **Governance vote**: Any eligible member can request the loan; members vote to approve. More flexible, but requires active participation.

### Requesting a Loan (Governance method)

1. Open your Lending Circle page
2. Click **Request Loan** during an open cycle
3. Add a brief purpose note (optional but encouraged)
4. Wait for members to vote — voting window is set by the creator (e.g. 48 hours)
5. If approved, the loan is issued automatically when the vote passes

### Repaying a Loan

1. Open your Lending Circle page
2. Your active loan shows the **amount owed** and **due date**
3. Click **Repay** and enter an amount (partial repayments are accepted)
4. Sign and submit
5. On full repayment, your **credit score increases**

### Credit Score

Your credit score is an on-chain number that increases with on-time repayments and decreases with missed ones. It is:
- Visible on your public profile
- Portable across all StellarCircle lending circles
- Stored permanently on Stellar as part of your financial history

---

## 10. Pillar E — Milestone-Unlocked Savings

### How It Works

You lock funds in a vault that can only be released when verifiable milestones are met. Each milestone has a verifier — someone you trust to confirm completion. Funds release proportionally as milestones are cleared.

**Example**: You lock 3,000 USDC for business growth. Milestone 1 (register business, 20% of funds) is verified by your accountant. Milestone 2 (hire first employee, 30%) verified by your co-founder. Milestone 3 (reach 1,000 customers, 50%) verified by a business mentor.

### Creating a Milestone Vault

1. Go to **Create Circle → Pillar E**
2. Set the **total amount to lock** and **asset**
3. Add milestones one by one:
   - Milestone description
   - Percentage of total funds unlocked on completion
   - Verifier address (Stellar G... address)
   - Deadline (optional)
4. Lock the funds by signing the transaction
5. Verifiers are notified automatically

### Completing a Milestone

1. Complete the real-world action (e.g. register your business)
2. Notify your verifier (off-chain, via WhatsApp, email, etc.)
3. Verifier opens StellarCircle and sees the pending attestation
4. Verifier clicks **Attest** and signs the transaction
5. You call **Release Funds** for that milestone
6. The unlocked percentage arrives in your wallet

### What If a Verifier Is Unresponsive?

If a verifier does not attest before the milestone deadline, a governance proposal is created automatically. Circle members (or just you and the verifier, in a 2-person setup) can vote to:
- Extend the deadline
- Reassign the verifier
- Refund the locked portion

---

## 11. Governance — Voting on Proposals

Any member of a circle can create a proposal to change how the circle operates. Proposals require a quorum and a majority vote to pass.

### Common Proposal Types

| Type | What It Does |
|------|-------------|
| Config Change | Update contribution amount, cycle length, penalty % |
| Add / Remove Member | Add a member to the circle or remove an inactive one |
| Fund Release | Approve release of goal-based or milestone funds |
| Pause / Unpause | Halt or resume circle activity |
| Emergency Withdraw | Return all funds pro-rata (requires supermajority) |

### How to Vote

1. Go to the **Governance** tab of any circle
2. Active proposals are listed with their deadline and current vote tally
3. Click **Vote For**, **Vote Against**, or **Abstain**
4. Sign the transaction in your wallet
5. When the voting period ends and quorum is met, anyone can click **Execute** to carry out the result

---

## 12. Notifications

StellarCircle sends reminders so you never miss a contribution or vote.

### Notification Types

| Notification | When |
|-------------|------|
| Contribution Due | 3 days and 24 hours before your deadline |
| Payout Received | Immediately when funds arrive in your wallet |
| New Member Joined | When someone joins your circle |
| Governance Vote Open | When a proposal is created in your circle |
| Vote Ending Soon | 12 hours before a proposal vote closes |
| Loan Approved | When your loan request is approved |
| Loan Repayment Due | 7 days and 1 day before repayment deadline |
| Milestone Attested | When a verifier confirms your milestone |
| Vault Breach | When a missed contribution penalty fires |

### Managing Notifications

- Web: Settings → Notifications
- Mobile: Settings → Push Notifications
- You can enable/disable each type independently

---

## 13. Your Profile & Credit Score

Your profile page shows:

- **Active Circles** — circles you currently participate in
- **Completed Circles** — your history of completed ROSCAs, goals, and vaults
- **Completion Badges** — on-chain records of successfully completed commitments
- **Credit Score** — your lending reputation score (0–1000 scale)
- **Contribution Streak** — longest streak of on-time contributions
- **On-Chain Address** — your Stellar public key

Your profile is public by default. The credit score and completion badges are designed to be shared with future circles as proof of financial reliability.

---

## 14. Troubleshooting

### "Transaction rejected" in my wallet
You declined the transaction in your wallet app. Nothing was sent. Try again and approve the transaction when prompted.

### My contribution is stuck as "Pending"
The Stellar network may be congested. Wait 30 seconds and refresh. If it stays pending after 2 minutes, the transaction likely failed — try again. Funds are never deducted without a confirmed transaction.

### I can't see my circle after creating it
The backend indexer processes on-chain events in near real-time (usually under 10 seconds). Refresh your dashboard. If the circle still doesn't appear after 1 minute, check the transaction on [Stellar Expert](https://stellar.expert) using your wallet address.

### My payout didn't arrive
Payouts execute automatically when all members of a ROSCA cycle have contributed. Check the circle page to see if all contributions are confirmed. If they are and the payout still hasn't executed, contact support via GitHub Issues.

### I nominated a witness but they didn't receive a notification
Witnesses receive an on-chain event. If your witness uses StellarCircle, they will see a notification in their dashboard. For external wallets, share the circle link with them directly.

### I want to leave a circle
You can leave a circle that has not yet started (status: OPEN). Once a circle is ACTIVE, leaving requires a governance vote. This protects other members from disruption.

---

## 15. Glossary

| Term | Definition |
|------|-----------|
| **Circle** | Any group created on StellarCircle (ROSCA, Goal, Lending, etc.) |
| **Pillar** | One of the five savings/lending models (A–E) |
| **Cycle** | A time period within a ROSCA or Lending Circle (e.g. 30 days) |
| **Payout** | Funds distributed to a recipient at the end of a cycle |
| **Contribution** | A payment made by a member into the circle pool |
| **Witness** | An accountability partner in a Pillar C vault |
| **Verifier** | A trusted person who confirms milestone completion (Pillar E) |
| **Attestation** | An on-chain confirmation signed by a verifier |
| **Credit Score** | On-chain reputation built through lending circle participation |
| **SEP-10** | Stellar Web Authentication standard — how you log in with your wallet |
| **SEP-41** | Stellar token interface standard — how custom tokens are supported |
| **Soroban** | Stellar's smart contract platform (Rust-based) |
| **XLM** | Stellar Lumens — Stellar's native currency |
| **Horizon** | Stellar's public API for querying blockchain data |
| **Quorum** | Minimum number of votes needed for a governance proposal to be valid |
| **Supermajority** | A 2/3 majority, required for emergency withdrawal proposals |
| **Grace Period** | Extra time allowed after a contribution deadline before penalties apply |
| **Penalty** | A deduction from locked funds for missed contributions or repayments |
| **Streak** | Consecutive on-time contributions in a vault or circle |

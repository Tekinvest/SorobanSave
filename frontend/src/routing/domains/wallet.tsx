import { lazy } from 'react';

import { ROUTES } from '../constants';

import type { RouteConfig } from '../types';

const TransactionHistoryPage = lazy(() => import('../../pages/TransactionHistoryPage'));
const TransactionBuilderPage = lazy(() => import('../../pages/TransactionBuilderPage'));
const HardwareWalletPage = lazy(() => import('../../pages/HardwareWalletPage'));
const DepositPage = lazy(() => import('../../pages/DepositPage'));
const WithdrawPage = lazy(() => import('../../pages/WithdrawPage'));
const RecoverySetupPage = lazy(() => import('../../pages/RecoverySetupPage'));

export const walletRoutes: RouteConfig[] = [
  {
    path: ROUTES.TRANSACTIONS,
    component: TransactionHistoryPage,
    protected: true,
    title: 'Transaction History - SorobanSave',
    description: 'Your full transaction history',
  },
  {
    path: ROUTES.TRANSACTION_BUILDER,
    component: TransactionBuilderPage,
    protected: true,
    title: 'Transaction Builder - SorobanSave',
    description: 'Build and simulate multi-step transactions',
  },
  {
    path: ROUTES.HARDWARE_WALLET,
    component: HardwareWalletPage,
    protected: true,
    title: 'Hardware Wallet - SorobanSave',
    description: 'Connect and manage Ledger/Trezor hardware wallets',
  },
  {
    path: ROUTES.DEPOSIT,
    component: DepositPage,
    protected: true,
    title: 'Buy Crypto - SorobanSave',
    description: 'Purchase XLM or stablecoins via bank transfer',
  },
  {
    path: ROUTES.WITHDRAW,
    component: WithdrawPage,
    protected: true,
    title: 'Sell Crypto - SorobanSave',
    description: 'Withdraw crypto to your bank account',
  },
  {
    path: ROUTES.RECOVERY,
    component: RecoverySetupPage,
    protected: true,
    title: 'Social Recovery - SorobanSave',
    description: 'Configure guardians and approve recovery requests',
  },
];

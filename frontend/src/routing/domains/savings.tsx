import { lazy } from 'react';

import { ROUTES } from '../constants';

import type { RouteConfig } from '../types';

const GroupsPage = lazy(() => import('../../pages/GroupsPage'));
const CreateGroupPage = lazy(() => import('../../pages/CreateGroupPage'));
const BrowseGroupsPage = lazy(() => import('../../pages/BrowseGroupsPage'));
const ContributionCalendarPage = lazy(() => import('../../pages/ContributionCalendarPage'));
const GroupComparisonPage = lazy(() => import('../../pages/GroupComparisonPage'));
const GroupAnalyticsPage = lazy(() => import('../../pages/GroupAnalytics'));
const GroupDetailPage = lazy(() => import('../../pages/GroupDetailPage'));
const MemberDirectoryPage = lazy(() => import('../../pages/MemberDirectoryPage'));
const LeaderboardPage = lazy(() => import('../../pages/LeaderboardPage'));
const TemplateGalleryPage = lazy(() => import('../../pages/TemplateGalleryPage'));
const AnalyticsDashboardPage = lazy(() => import('../../pages/AnalyticsDashboardPage'));
const JoinViaInvite = lazy(() => import('../../pages/JoinViaInvite'));

export const savingsRoutes: RouteConfig[] = [
  {
    path: ROUTES.GROUPS,
    component: GroupsPage,
    protected: true,
    title: 'Groups - SorobanSave',
    description: 'Browse and join savings groups',
  },
  {
    path: ROUTES.GROUP_CREATE,
    component: CreateGroupPage,
    protected: true,
    title: 'Create Group - SorobanSave',
    description: 'Create a new savings group',
  },
  {
    path: ROUTES.GROUPS_BROWSE,
    component: BrowseGroupsPage,
    protected: true,
    title: 'Browse Groups - SorobanSave',
    description: 'Discover and join public savings groups',
  },
  {
    path: ROUTES.GROUP_CALENDAR,
    component: ContributionCalendarPage,
    protected: true,
    title: 'Contribution Calendar - SorobanSave',
    description: 'View contribution deadlines and payment history',
  },
  {
    path: ROUTES.GROUPS_COMPARE,
    component: GroupComparisonPage,
    protected: true,
    title: 'Compare Groups - SorobanSave',
    description: 'Compare savings groups side-by-side before joining',
  },
  {
    path: ROUTES.GROUP_ANALYTICS,
    component: GroupAnalyticsPage,
    protected: true,
    title: 'Group Analytics - SorobanSave',
    description: 'Detailed analytics for your savings group',
  },
  {
    path: ROUTES.GROUP_DETAIL,
    component: GroupDetailPage,
    protected: true,
    title: 'Group Details - SorobanSave',
  },
  {
    path: ROUTES.GROUP_MEMBERS,
    component: MemberDirectoryPage,
    protected: true,
    title: 'Member Directory - SorobanSave',
    description: 'Browse and search group members',
  },
  {
    path: ROUTES.LEADERBOARD,
    component: LeaderboardPage,
    protected: true,
    title: 'Leaderboard - SorobanSave',
    description: 'Top-performing groups and contributors',
  },
  {
    path: ROUTES.TEMPLATES,
    component: TemplateGalleryPage,
    protected: true,
    title: 'Group Templates - SorobanSave',
    description: 'Browse and use group templates',
  },
  {
    path: ROUTES.ANALYTICS,
    component: AnalyticsDashboardPage,
    protected: true,
    title: 'Analytics - SorobanSave',
    description: 'Your contribution analytics and statistics',
  },
  {
    path: ROUTES.GROUP_JOIN,
    component: JoinViaInvite,
    protected: false,
    title: 'Join Group - SorobanSave',
    description: 'Join a savings group via invitation link',
  },
];

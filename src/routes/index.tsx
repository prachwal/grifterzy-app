import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CircularProgress, Box } from '@mui/material';

// Lazy-loaded components
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const Search = lazy(() => import('../features/search/Search'));
const ReportsHome = lazy(() => import('../features/reports/ReportsHome'));
const SalesReport = lazy(() => import('../features/reports/SalesReport'));
const TrendsReport = lazy(() => import('../features/reports/TrendsReport'));
const AnalyticsReport = lazy(() => import('../features/reports/AnalyticsReport'));
const UsersManagement = lazy(() => import('../features/users/UsersManagement'));
const About = lazy(() => import('../features/about/About'));
const Settings = lazy(() => import('../features/settings/Settings'));
const NotFound = lazy(() => import('../features/common/NotFound'));

// Loading component
const LoadingComponent = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          
          {/* Reports routes */}
          <Route path="reports" element={<ReportsHome />} />
          <Route path="reports/sales" element={<SalesReport />} />
          <Route path="reports/trends" element={<TrendsReport />} />
          <Route path="reports/analytics" element={<AnalyticsReport />} />
          
          <Route path="users" element={<UsersManagement />} />
          <Route path="about" element={<About />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Catch all route for undefined pages */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

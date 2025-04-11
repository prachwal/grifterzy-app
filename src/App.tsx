import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';

// Import feature components
import Dashboard from './features/dashboard/Dashboard';
import Search from './features/search/Search';
import ReportsHome from './features/reports/ReportsHome';
import SalesReport from './features/reports/SalesReport';
import TrendsReport from './features/reports/TrendsReport';
import AnalyticsReport from './features/reports/AnalyticsReport';
import UsersManagement from './features/users/UsersManagement';
import About from './features/about/About';
import Settings from './features/settings/Settings';
import NotFound from './features/common/NotFound';

// Import styles
import './assets/styles/scss/main.scss';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
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
      </Router>
    </ThemeProvider>
  );
};

export default App;
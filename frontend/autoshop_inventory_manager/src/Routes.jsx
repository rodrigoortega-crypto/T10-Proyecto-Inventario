import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StockMovements from './pages/stock-movements';
import InventoryManagement from './pages/inventory-management';
import LoginPage from './pages/login';
import UserManagement from './pages/user-management';
import Dashboard from './pages/dashboard';
import SupplierManagement from './pages/supplier-management';
import ReportsAnalytics from './pages/reports-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/stock-movements" element={<StockMovements />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/supplier-management" element={<SupplierManagement />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

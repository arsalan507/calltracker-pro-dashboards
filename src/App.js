import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/common';

// Landing Page
import LandingPage from './pages/Landing/LandingPage';

// Admin Pages
import LoginPage from './pages/Admin/LoginPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Overview from './pages/Admin/Overview';
import Organizations from './pages/Admin/Organizations';
import Users from './pages/Admin/Users';
import Analytics from './pages/Admin/Analytics';
import Settings from './pages/Admin/Settings';

// Error Pages
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Admin Auth */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireSuperAdmin={true}>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Overview />} />
              <Route path="organizations" element={<Organizations />} />
              <Route path="users" element={<Users />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

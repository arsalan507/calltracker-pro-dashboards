import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/common';

// Layout Components
import DashboardLayout from '../components/dashboard/DashboardLayout';

// Admin Pages (Super Admin only)
import Overview from '../pages/Admin/Overview';
import Organizations from '../pages/Admin/Organizations';
import Users from '../pages/Admin/Users';
import Analytics from '../pages/Admin/Analytics';
import Settings from '../pages/Admin/Settings';
import LeadsManagement from '../pages/SuperAdmin/LeadsManagement';

// CRM Pages (Role-based access)
import TicketList from '../pages/CRM/TicketList';
import TicketDetails from '../pages/CRM/TicketDetails';
import TicketCreate from '../pages/CRM/TicketCreate';
import TicketKanban from '../pages/CRM/TicketKanban';
import CRMAnalytics from '../pages/CRM/CRMAnalytics';
import CallLogs from '../pages/CRM/CallLogs';

// Dashboard Pages (All authenticated users)
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Dashboard/Profile';
import Notifications from '../pages/Dashboard/Notifications';

const DashboardRoutes = () => {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();

  return (
    <Routes>
      {/* Root redirect based on role */}
      <Route 
        path="/" 
        element={
          <Navigate 
            to={
              userRole === 'super_admin' ? '/dashboard/admin' : 
              ['org_admin', 'manager'].includes(userRole) ? '/dashboard/crm/tickets' :
              '/dashboard'
            } 
            replace 
          />
        } 
      />
      
      {/* Dashboard Layout Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Main Dashboard - accessible to all authenticated users */}
        <Route index element={<Dashboard />} />
        
        {/* Profile and Settings - accessible to all authenticated users */}
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
        
        {/* CRM Routes - Role-based access */}
        <Route path="crm">
          {/* Tickets - accessible to all except viewer */}
          <Route 
            path="tickets" 
            element={
              <ProtectedRoute allowedRoles={['super_admin', 'org_admin', 'manager', 'agent']}>
                <TicketList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="tickets/new" 
            element={
              <ProtectedRoute requirePermission="canCreateTickets">
                <TicketCreate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="tickets/:id" 
            element={
              <ProtectedRoute allowedRoles={['super_admin', 'org_admin', 'manager', 'agent']}>
                <TicketDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="kanban" 
            element={
              <ProtectedRoute allowedRoles={['super_admin', 'org_admin', 'manager', 'agent']}>
                <TicketKanban />
              </ProtectedRoute>
            } 
          />
          
          {/* Call Logs - accessible to all roles */}
          <Route path="calls" element={<CallLogs />} />
          
          {/* Analytics - restricted to managers and above */}
          <Route 
            path="analytics" 
            element={
              <ProtectedRoute requirePermission="canViewAnalytics">
                <CRMAnalytics />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Admin Routes - Super Admin only with smart redirects */}
        <Route 
          path="admin/*" 
          element={
            userRole === 'super_admin' ? (
              <Routes>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<Overview />} />
                <Route path="organizations" element={<Organizations />} />
                <Route path="users" element={<Users />} />
                <Route path="leads" element={<LeadsManagement />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            ) : (
              <Navigate 
                to={
                  ['org_admin', 'manager'].includes(userRole) ? '/dashboard/crm/tickets' :
                  '/dashboard'
                } 
                replace 
              />
            )
          } 
        />

        {/* Role-based default redirects */}
        <Route 
          path="*" 
          element={
            <Navigate 
              to={
                userRole === 'super_admin' ? '/dashboard/admin' : 
                ['org_admin', 'manager'].includes(userRole) ? '/dashboard/crm/tickets' :
                '/dashboard/crm/calls'
              } 
              replace 
            />
          } 
        />
      </Route>

      {/* Legacy admin routes - redirect to new structure */}
      <Route path="/admin/*" element={<Navigate to="/dashboard/admin" replace />} />
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default DashboardRoutes;
import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useAuth } from '../contexts/AuthContext';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main style={{ flex: 1, paddingBottom: '80px' }} className="main-content">
        <div className="container py-6">
           <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

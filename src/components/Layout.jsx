import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useAuth } from '../contexts/AuthContext';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Proszę się zalogować (Mock: Jesteś już zalogowany w tle)</p>
      </div>
    );
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

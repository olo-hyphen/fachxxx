import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useAuth } from '../contexts/AuthContext';
import { Outlet } from 'react-router-dom';

/**
 * Main layout component that wraps the application content.
 * It conditionally renders the sidebar (for desktop) and bottom navigation (for mobile).
 * It also checks for user authentication.
 *
 * @returns {JSX.Element} The layout component containing the sidebar, main content area, and bottom navigation.
 */
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
      <main style={{ flex: 1, paddingBottom: '80px' }} className="ml-0 md:ml-[250px]">
        <div className="container py-6">
           <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, Calculator, BarChart3, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Pulpit', path: '/' },
  { icon: Users, label: 'Klienci', path: '/clients' },
  { icon: ClipboardList, label: 'Zlecenia', path: '/orders' },
  { icon: Calculator, label: 'Kosztorysy', path: '/estimates' },
  { icon: BarChart3, label: 'Raporty', path: '/reports' },
  { icon: Settings, label: 'Ustawienia', path: '/settings' },
];

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="hidden-mobile" style={{
      width: '250px',
      backgroundColor: 'var(--surface)',
      borderRight: '1px solid #E2E8F0',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="mb-8">
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>Fachowiec Pro</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 p-3 rounded-md transition-colors',
              isActive ? 'bg-blue-50 text-primary font-medium' : 'text-secondary hover:bg-gray-50'
            )}
            style={({ isActive }) => isActive ? { backgroundColor: '#F0F9FF', color: 'var(--primary)' } : {}}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 text-secondary hover:text-error mt-auto"
      >
        <LogOut size={20} />
        <span>Wyloguj</span>
      </button>
    </aside>
  );
};

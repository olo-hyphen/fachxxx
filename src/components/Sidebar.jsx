import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, Calculator, BarChart3, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';

/**
 * Array of navigation items for the sidebar.
 * Each item contains an icon, label, and path.
 * @type {Array<{icon: React.ElementType, label: string, path: string}>}
 */
const navItems = [
  { icon: LayoutDashboard, label: 'Pulpit', path: '/' },
  { icon: Users, label: 'Klienci', path: '/clients' },
  { icon: ClipboardList, label: 'Zlecenia', path: '/orders' },
  { icon: Calculator, label: 'Kosztorysy', path: '/estimates' },
  { icon: BarChart3, label: 'Raporty', path: '/reports' },
  { icon: Settings, label: 'Ustawienia', path: '/settings' },
];

/**
 * Sidebar navigation component for desktop devices.
 * Displays a fixed sidebar with navigation links and a logout button.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
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

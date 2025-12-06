import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, Calculator, BarChart3, Settings } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Pulpit', path: '/' },
  { icon: Users, label: 'Klienci', path: '/clients' },
  { icon: ClipboardList, label: 'Zlecenia', path: '/orders' },
  { icon: Calculator, label: 'Kosztorysy', path: '/estimates' },
  { icon: BarChart3, label: 'Raporty', path: '/reports' },
  { icon: Settings, label: 'Ustawienia', path: '/settings' },
];

export const BottomNav = () => {
  return (
    <nav className="hidden-desktop" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid #E2E8F0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0',
      zIndex: 50
    }}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => clsx(
            'flex flex-col items-center gap-1 p-2 text-xs',
            isActive ? 'text-primary' : 'text-secondary'
          )}
          style={{ textDecoration: 'none' }}
        >
          <item.icon size={24} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider } from './contexts/ToastContext';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { Orders } from './pages/Orders';
import { Estimates } from './pages/Estimates';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

/**
 * Main application component.
 * Sets up the routing and provides global contexts (Auth, Data, Toast).
 *
 * @returns {JSX.Element} The root application component.
 */
function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="clients" element={<Clients />} />
                <Route path="orders" element={<Orders />} />
                <Route path="estimates" element={<Estimates />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;

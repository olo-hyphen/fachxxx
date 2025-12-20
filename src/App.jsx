import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Clients from './pages/Clients';
import ClientDetails from './pages/ClientDetails';
import AddClient from './pages/AddClient';
import EditClient from './pages/EditClient';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <Router>
            <div className="app">
              <header>
                <h1>Fachowiec Pro</h1>
              </header>
              <main>
                <Routes>
                  <Route path="/" element={<h2>Dashboard</h2>} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/clients/new" element={<AddClient />} />
                  <Route path="/clients/:clientId" element={<ClientDetails />} />
                  <Route path="/clients/:clientId/edit" element={<EditClient />} />
                </Routes>
              </main>
              <footer>
                <p>&copy; 2024 Fachowiec Pro</p>
              </footer>
            </div>
          </Router>
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;

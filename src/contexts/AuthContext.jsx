import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
        // Mock login for now since there is no backend
        const mockUser = {
          id: 1,
          name: 'Jan Kowalski',
          email: 'jan@firma.pl',
          companyName: 'Usługi Remontowe Jan Kowalski',
          nip: '123-456-78-90',
          phone: '123 456 789',
          address: 'ul. Prosta 1, 00-001 Warszawa',
          bankAccount: ''
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

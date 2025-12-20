import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const initialUser = {
  id: 'user-1',
  email: 'jan.kowalski@example.com',
  companyName: 'Fachowiec Pro',
  nip: '123-456-78-90',
  address: 'ul. Budowlana 1, 00-001 Warszawa',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('fachowiecProUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error reading user from localStorage', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('fachowiecProUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('fachowiecProUser');
      }
    } catch (error) {
      console.error('Error writing user to localStorage', error);
    }
  }, [user]);

  const login = () => {
    setUser(initialUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

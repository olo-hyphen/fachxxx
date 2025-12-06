import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Context to manage user authentication state.
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Custom hook to access the authentication context.
 *
 * @returns {object} The authentication context value.
 * @returns {object|null} return.user - The current user object or null if not logged in.
 * @returns {function} return.login - Function to log in a user.
 * @returns {function} return.logout - Function to log out the current user.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Provider component for the authentication context.
 * Manages user state and persistence using localStorage.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to wrap.
 * @returns {JSX.Element} The provider component.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
        // Mock login for now since there is no backend
        const mockUser = { id: 1, name: 'Fachowiec', email: 'fachowiec@example.com' };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    }
  }, []);

  /**
   * Logs in a user by updating state and local storage.
   *
   * @param {object} userData - The user object to log in.
   */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Logs out the current user by clearing state and local storage.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

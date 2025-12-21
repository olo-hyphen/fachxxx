import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Verify with backend
            try {
                const response = await fetch('/api/me', {
                    headers: {
                        'x-user-id': parsedUser.id
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user)); // Update local storage with fresh data
                } else {
                    // Session invalid
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth check failed', error);
                // If backend is down, maybe keep local user or logout?
                // For security, logout is safer, but for offline PWA, keep it.
                // Here we assume online first.
                // But let's keep the user if it's a network error to be nice,
                // but since we are "implementing real backend", we should probably trust the backend.
                // Let's assume if verify fails, we logout.
                // However, avoiding aggressive logout on simple network error is good UX.
                // Let's just trust localStorage if network fails? No, let's just log it.
                setUser(parsedUser);
            }
        }
        setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
  };

  const register = async (userData) => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = async (userData) => {
    // Optimistic update
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Persist to backend
    try {
        await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: user.id, ...userData }),
        });
    } catch (error) {
        console.error('Failed to update user on backend', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

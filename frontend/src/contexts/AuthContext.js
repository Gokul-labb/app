import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Mock login - in real app, this would call backend API
    const mockUsers = {
      'admin@mppolice.gov.in': {
        id: '1',
        email: 'admin@mppolice.gov.in',
        name: 'Administrator',
        role: 'admin',
        badge: 'ADM001'
      },
      'investigator@mppolice.gov.in': {
        id: '2',
        email: 'investigator@mppolice.gov.in',
        name: 'Officer Rajesh Kumar',
        role: 'investigator',
        badge: 'INV001'
      }
    };

    const user = mockUsers[credentials.email];
    if (user && credentials.password === 'password123') {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
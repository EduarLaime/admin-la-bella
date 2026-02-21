import React, { createContext, useContext, useState } from 'react';

interface UserInfo {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles?: Array<{ id: string, name: string }>;
}

interface AuthContextType {
  isAdmin: boolean;
  user: UserInfo | null;
  login: (userData: UserInfo, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(() => {
    try {
      const saved = localStorage.getItem('user_data');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  });

  const isAdmin = user?.roles?.some(r => r.id === 'ADMIN' || r.name === 'ADMIN') || false;

  const login = (userData: UserInfo, token: string) => {
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('admin_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

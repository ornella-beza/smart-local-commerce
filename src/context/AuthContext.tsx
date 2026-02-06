import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { mockUsers } from '../data/mockData';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'business';
  name: string;
  businessId?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = Object.values(mockUsers).find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        businessId: 'businessId' in foundUser ? foundUser.businessId : undefined,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

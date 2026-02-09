import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'business_owner' | 'customer';
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('[AuthContext] Initializing auth state:', {
      hasToken: !!token,
      hasUserData: !!userData
    });
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('[AuthContext] Restoring user from localStorage:', parsedUser);
        
        // Ensure the user object has the correct structure
        const userObj = {
          id: parsedUser.id || parsedUser._id,
          email: parsedUser.email,
          role: parsedUser.role === 'business_owner' ? 'business_owner' : parsedUser.role,
          name: parsedUser.name,
        };
        
        setUser(userObj);
        console.log('[AuthContext] User state restored:', userObj);
      } catch (error) {
        console.error('[AuthContext] Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else if (token && !userData) {
      console.warn('[AuthContext] Token exists but no user data, clearing token');
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('[AuthContext] Starting login for:', email);
      const response = await api.login({ email, password });
      console.log('[AuthContext] Login response received:', {
        hasToken: !!response.token,
        hasUser: !!response.user,
        userRole: response.user?.role
      });
      
      if (response.token && response.user) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log('[AuthContext] Token and user stored in localStorage');
        
        // Map backend role to frontend role
        const mappedRole = response.user.role === 'business_owner' ? 'business_owner' : response.user.role;
        
        const userObj = {
          id: response.user.id,
          email: response.user.email,
          role: mappedRole as 'admin' | 'business_owner' | 'customer',
          name: response.user.name,
        };
        
        setUser(userObj);
        console.log('[AuthContext] User state updated:', userObj);
        
        // Verify token is stored
        const storedToken = localStorage.getItem('token');
        console.log('[AuthContext] Token verification:', {
          stored: !!storedToken,
          length: storedToken?.length,
          matches: storedToken === response.token
        });
        
        return true;
      }
      console.error('[AuthContext] Login response missing token or user');
      return false;
    } catch (error: any) {
      console.error('[AuthContext] Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Map frontend role to backend role
      const backendRole = role === 'business' ? 'business_owner' : 'customer';
      
      const response = await api.register({ name, email, password, role: backendRole });
      
      if (response.token && response.user) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Map backend role to frontend role
        const mappedRole = response.user.role === 'business_owner' ? 'business_owner' : response.user.role;
        
        setUser({
          id: response.user.id,
          email: response.user.email,
          role: mappedRole as 'admin' | 'business_owner' | 'customer',
          name: response.user.name,
        });
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading }}>
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

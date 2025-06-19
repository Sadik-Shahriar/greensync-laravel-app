import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/services/api'; // Assuming your axios instance is exported from here
import { useNavigate } from 'react-router-dom';

// Define the shape of the user and auth context
interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  // Add any other user properties you need
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<string | null>;
  signUp: (data: { name: string; email: string; password: string; password_confirmation: string }) => Promise<string | null>;
  logout: () => void;
  // Add signUp if you want it here
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Set the token for all future axios requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        // Fetch the user data with the token
        const response = await apiClient.get('/api/user');
        setUser(response.data);
      } catch (error) {
        // Token is invalid or expired
        localStorage.removeItem('auth_token');
        delete apiClient.defaults.headers.common['Authorization'];
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleAuthSuccess = (token: string, userData: User) => {
    localStorage.setItem('auth_token', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    navigate('/dashboard');
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiClient.post('/api/auth/login', credentials);
      handleAuthSuccess(response.data.data.access_token, response.data.data.user);
      return null;
    } catch (error: any) {
      return error?.response?.data?.message || 'Login failed.';
    }
  };

  const signUp = async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
    try {
      const response = await apiClient.post('/api/register', data);
      handleAuthSuccess(response.data.data.access_token, response.data.data.user);
      return null;
    } catch (error: any) {
      return error?.response?.data?.message || 'Signup failed.';
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {}
    localStorage.removeItem('auth_token');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

// Create a hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

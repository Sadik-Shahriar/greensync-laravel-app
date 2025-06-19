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
  login: (credentials: any) => Promise<void>;
  signUp: (data: any) => Promise<void>;
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
        console.error("Session check failed:", error);
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

  const login = async (credentials: any) => {
    try {
      const response = await apiClient.post('/api/auth/login', credentials);
      handleAuthSuccess(response.data.data.access_token, response.data.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      // Here you would show an error toast/notification
      throw error;
    }
  };

  const signUp = async (data: any) => {
    try {
      // The register endpoint returns the same data structure as login
      const response = await apiClient.post('/api/auth/register', data);
      handleAuthSuccess(response.data.data.access_token, response.data.data.user);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      // 1. Clear the token
      localStorage.removeItem('auth_token');
      // 2. Remove the auth header from axios
      delete apiClient.defaults.headers.common['Authorization'];
      // 3. Clear the user state
      setUser(null);
      // 4. Redirect to home
      navigate('/');
    }
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

import { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    // This function runs when the app first loads
    const checkAuthStatus = async () => {
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
    };
    checkAuthStatus();
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await apiClient.post('/login', credentials); // Make sure this path is correct based on your web.php file
      const { access_token, user } = response.data.data;

      // 1. Store the token
      localStorage.setItem('auth_token', access_token);
      // 2. Set the token for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      // 3. Update the user state
      setUser(user);
      // 4. Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      // Here you would show an error toast/notification
      throw error;
    }
  };

  const logout = async () => {
    try {
        await apiClient.post('/logout'); // Call Laravel's logout endpoint
    } catch (error) {
        console.error("Logout failed on server:", error);
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

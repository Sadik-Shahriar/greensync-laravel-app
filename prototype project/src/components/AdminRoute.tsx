
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, session } = useAuth();
  
  // Check if user is admin based on email domain or metadata
  const isAdmin = React.useMemo(() => {
    if (!user) return false;
    
    // Check user metadata for admin role
    const isAdminUser = user.user_metadata?.role === 'admin';
    
    // This is a simple check. In a real app, you would check against a database role
    // or verify admin status through a serverless function
    return isAdminUser;
  }, [user]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default AdminRoute;

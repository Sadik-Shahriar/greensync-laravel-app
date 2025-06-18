
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ChartPieIcon, 
  Trophy, 
  Award, 
  Calendar, 
  User, 
  BarChart2, 
  Recycle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DashboardHome from '@/components/dashboard/DashboardHome';
import DisposalHistory from '@/components/dashboard/DisposalHistory';
import Rewards from '@/components/dashboard/Rewards';
import Achievements from '@/components/dashboard/Achievements';
import Profile from '@/components/dashboard/Profile';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Parse the path to set the active tab
  useEffect(() => {
    const path = location.pathname.split('/')[2] || '';
    switch(path) {
      case 'history':
        setActiveTab('history');
        break;
      case 'rewards':
        setActiveTab('rewards');
        break;
      case 'achievements':
        setActiveTab('achievements');
        break;
      case 'profile':
        setActiveTab('profile');
        break;
      default:
        setActiveTab('overview');
    }
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading your dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {profile?.full_name || 'User'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar Navigation */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-3">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                  <nav className="space-y-1">
                    <Link to="/dashboard" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'overview' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <ChartPieIcon className="mr-2 h-5 w-5" />
                      Overview
                    </Link>
                    <Link to="/dashboard/history" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'history' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <Recycle className="mr-2 h-5 w-5" />
                      Disposal History
                    </Link>
                    <Link to="/dashboard/rewards" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'rewards' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <Trophy className="mr-2 h-5 w-5" />
                      Rewards
                    </Link>
                    <Link to="/dashboard/achievements" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'achievements' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <Award className="mr-2 h-5 w-5" />
                      Achievements
                    </Link>
                    <Link to="/dashboard/profile" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'profile' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <User className="mr-2 h-5 w-5" />
                      Profile
                    </Link>
                  </nav>
                </div>
              </CardContent>
            </Card>
            
            {/* User Stats Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Eco Points:</span>
                    <span className="font-medium">{profile?.eco_points || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Waste Saved:</span>
                    <span className="font-medium">{profile?.waste_saved || 0} kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div>
            <Routes>
              <Route path="/" element={<DashboardHome profile={profile} />} />
              <Route path="/history" element={<DisposalHistory />} />
              <Route path="/rewards" element={<Rewards profile={profile} />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/profile" element={<Profile profile={profile} onProfileUpdate={fetchUserProfile} />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

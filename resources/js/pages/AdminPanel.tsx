
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Trash, Award, Calendar, Settings } from 'lucide-react';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminBins from '@/components/admin/AdminBins';
import AdminRewards from '@/components/admin/AdminRewards';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminSettings from '@/components/admin/AdminSettings';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const location = useLocation();

  // Parse the path to set the active tab
  React.useEffect(() => {
    const path = location.pathname.split('/')[2] || '';
    switch(path) {
      case 'bins':
        setActiveTab('bins');
        break;
      case 'rewards':
        setActiveTab('rewards');
        break;
      case 'events':
        setActiveTab('events');
        break;
      case 'settings':
        setActiveTab('settings');
        break;
      default:
        setActiveTab('users');
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Admin Sidebar Navigation */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-3">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold mb-4">Management</h2>
                  <nav className="space-y-1">
                    <Link to="/admin" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'users' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <User className="mr-2 h-5 w-5" />
                      Users
                    </Link>
                    <Link to="/admin/bins" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'bins' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <Trash className="mr-2 h-5 w-5" />
                      Smart Bins
                    </Link>
                    <Link to="/admin/rewards" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'rewards' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <Award className="mr-2 h-5 w-5" />
                      Rewards & Badges
                    </Link>
                    <Link to="/admin/events" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'events' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <Calendar className="mr-2 h-5 w-5" />
                      Events
                    </Link>
                    <Link to="/admin/settings" className={`flex items-center p-2 rounded-md w-full hover:bg-muted ${activeTab === 'settings' ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div>
            <Routes>
              <Route path="/" element={<AdminUsers />} />
              <Route path="/bins" element={<AdminBins />} />
              <Route path="/rewards" element={<AdminRewards />} />
              <Route path="/events" element={<AdminEvents />} />
              <Route path="/settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;

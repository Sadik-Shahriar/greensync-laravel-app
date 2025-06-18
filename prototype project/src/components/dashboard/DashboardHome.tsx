
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Recycle, ChartPieIcon, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHomeProps {
  profile: any;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ profile }) => {
  // Mock data for the progress
  const nextLevelPoints = 1000;
  const currentProgress = profile?.eco_points ? Math.min((profile.eco_points / nextLevelPoints) * 100, 100) : 0;

  // Mock waste type data
  const wasteTypes = [
    { type: 'Plastic', amount: 2.7, color: 'bg-blue-500' },
    { type: 'Paper', amount: 3.2, color: 'bg-yellow-500' },
    { type: 'Organic', amount: 1.8, color: 'bg-green-500' },
    { type: 'Metal', amount: 0.5, color: 'bg-gray-500' },
  ];

  // Mock recent activities
  const recentActivities = [
    { id: 1, date: '2023-05-10', type: 'Plastic bottle', points: 5, bin: 'Library' },
    { id: 2, date: '2023-05-09', type: 'Paper', points: 3, bin: 'Science Building' },
    { id: 3, date: '2023-05-07', type: 'Organic waste', points: 4, bin: 'Cafeteria' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your GreenSync Dashboard</CardTitle>
          <CardDescription>
            Track your sustainability impact, earn rewards, and contribute to a greener campus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Progress to Next Level Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Progress to Next Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Level {Math.floor(profile?.eco_points / 200) + 1}</span>
                    <span className="text-xs font-bold">{profile?.eco_points || 0} / {nextLevelPoints} points</span>
                  </div>
                  <Progress value={currentProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Disposals</span>
                  <span className="text-xs font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Points Earned</span>
                  <span className="text-xs font-bold">120</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Waste Saved</span>
                  <span className="text-xs font-bold">3.2 kg</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Badges Earned Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="bg-greensync-light text-greensync-primary p-2 rounded-full">
                      <Recycle className="h-5 w-5" />
                    </div>
                    <span className="text-xs mt-1">Recycler</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 text-green-700 p-2 rounded-full">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-xs mt-1">Eco Hero</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="border rounded-md">
              <div className="grid grid-cols-4 bg-muted p-3 text-xs font-medium text-muted-foreground">
                <div>Date</div>
                <div>Type</div>
                <div>Bin Location</div>
                <div>Points</div>
              </div>
              {recentActivities.map((activity) => (
                <div key={activity.id} className="grid grid-cols-4 p-3 text-sm border-t">
                  <div>{activity.date}</div>
                  <div>{activity.type}</div>
                  <div>{activity.bin}</div>
                  <div>+{activity.points}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link to="/dashboard/history" className="text-sm text-greensync-primary hover:underline">View All Activity →</Link>
            </div>
          </div>
          
          {/* Waste By Type */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Waste by Type</h3>
            <div className="space-y-3">
              {wasteTypes.map((waste) => (
                <div key={waste.type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{waste.type}</span>
                    <span>{waste.amount} kg</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full ${waste.color}`} 
                      style={{ width: `${(waste.amount / 8) * 100}%` }} 
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/dashboard/history">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Recycle className="h-6 w-6 text-greensync-primary" />
                    <span>View Disposal History</span>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/dashboard/rewards">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Trophy className="h-6 w-6 text-greensync-primary" />
                    <span>Browse Rewards</span>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/dashboard/achievements">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Award className="h-6 w-6 text-greensync-primary" />
                    <span>View Achievements</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Recycle, Trophy, Shield, Leaf, TrendingUp } from 'lucide-react';

const Achievements = () => {
  // Mock achievements data
  const earnedAchievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Make your first waste deposit',
      icon: <Recycle className="h-10 w-10 text-green-600" />,
      earned: true,
      date: '2023-04-15'
    },
    {
      id: 2,
      title: 'Eco Beginner',
      description: 'Earn 100 eco points',
      icon: <Award className="h-10 w-10 text-amber-500" />,
      earned: true,
      date: '2023-04-28'
    },
    {
      id: 3,
      title: 'Plastic Champion',
      description: 'Dispose of 10kg of plastic waste',
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      earned: true,
      date: '2023-05-05'
    },
  ];

  const upcomingAchievements = [
    {
      id: 4,
      title: 'Eco Warrior',
      description: 'Earn 500 eco points',
      icon: <Trophy className="h-10 w-10 text-gray-400" />,
      progress: 65,
      requirement: 500
    },
    {
      id: 5,
      title: 'Consistent Contributor',
      description: 'Make deposits for 30 consecutive days',
      icon: <TrendingUp className="h-10 w-10 text-gray-400" />,
      progress: 12,
      requirement: 30
    },
    {
      id: 6,
      title: 'Paper Savior',
      description: 'Dispose of 15kg of paper waste',
      icon: <Leaf className="h-10 w-10 text-gray-400" />,
      progress: 7.2,
      requirement: 15
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>
            Track your sustainability journey and unlock badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Earned Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {earnedAchievements.map((achievement) => (
                  <Card key={achievement.id} className="overflow-hidden">
                    <div className="bg-muted p-4 flex justify-center">
                      <div className="bg-green-50 rounded-full p-4">
                        {achievement.icon}
                      </div>
                    </div>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      <p className="text-xs text-greensync-primary mt-2">Earned on {achievement.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Upcoming Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {upcomingAchievements.map((achievement) => (
                  <Card key={achievement.id} className="overflow-hidden">
                    <div className="bg-muted p-4 flex justify-center">
                      <div className="bg-gray-100 rounded-full p-4">
                        {achievement.icon}
                      </div>
                    </div>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-greensync-primary h-2 rounded-full" 
                            style={{ width: `${(achievement.progress / achievement.requirement) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right mt-1">
                          {achievement.progress}/{achievement.requirement}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;

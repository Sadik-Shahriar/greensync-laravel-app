
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Coffee, Gift } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RewardsProps {
  profile: any;
}

const Rewards: React.FC<RewardsProps> = ({ profile }) => {
  // Mock rewards data
  const rewards = [
    {
      id: 1,
      title: 'Campus Cafe Voucher',
      description: 'Get a free drink at any campus cafe',
      points: 200,
      image: <Coffee className="w-12 h-12 text-amber-500" />
    },
    {
      id: 2,
      title: 'Eco-Friendly Water Bottle',
      description: 'Sustainable water bottle made from recycled materials',
      points: 500,
      image: <Gift className="w-12 h-12 text-blue-500" />
    },
    {
      id: 3,
      title: 'Eco Steward Certificate',
      description: 'Official recognition of your sustainability efforts',
      points: 1000,
      image: <Award className="w-12 h-12 text-green-500" />
    },
    {
      id: 4,
      title: 'Campus Bookstore Voucher',
      description: '$20 voucher for the campus bookstore',
      points: 750,
      image: <Gift className="w-12 h-12 text-purple-500" />
    }
  ];

  const userPoints = profile?.eco_points || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Rewards</span>
            <span className="text-greensync-primary">{userPoints} Points</span>
          </CardTitle>
          <CardDescription>
            Redeem your points for exciting rewards and recognition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <CardHeader className="bg-muted pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <span className="font-bold text-greensync-primary">{reward.points} pts</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex gap-4 items-center">
                    {reward.image}
                    <CardDescription>{reward.description}</CardDescription>
                  </div>
                  
                  {userPoints < reward.points && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{userPoints}/{reward.points} points</span>
                      </div>
                      <Progress 
                        value={(userPoints / reward.points) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={userPoints >= reward.points ? "default" : "outline"}
                    className={userPoints >= reward.points ? "bg-greensync-primary w-full" : "w-full"}
                    disabled={userPoints < reward.points}
                  >
                    {userPoints >= reward.points ? "Redeem Reward" : `Need ${reward.points - userPoints} more points`}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rewards;

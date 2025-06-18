
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Gift, Coffee, Edit, Trash2 } from 'lucide-react';

const AdminRewards = () => {
  // Mock rewards data
  const rewards = [
    { 
      id: '1', 
      title: 'Campus Cafe Voucher', 
      description: 'Get a free drink at any campus cafe', 
      pointsRequired: 200, 
      stock: 50, 
      redeemed: 12,
      type: 'voucher',
      icon: <Coffee className="h-6 w-6" />
    },
    { 
      id: '2', 
      title: 'Eco-Friendly Water Bottle', 
      description: 'Sustainable water bottle made from recycled materials', 
      pointsRequired: 500, 
      stock: 25, 
      redeemed: 8,
      type: 'item',
      icon: <Gift className="h-6 w-6" />
    },
    { 
      id: '3', 
      title: 'Eco Steward Certificate', 
      description: 'Official recognition of your sustainability efforts', 
      pointsRequired: 1000, 
      stock: 'Unlimited', 
      redeemed: 5,
      type: 'certificate',
      icon: <Award className="h-6 w-6" />
    }
  ];
  
  // Mock badges data
  const badges = [
    {
      id: '1',
      name: 'Recycler',
      description: 'Dispose of 10 recyclable items',
      requirement: '10 recyclable disposals',
      awarded: 45
    },
    {
      id: '2',
      name: 'Eco Warrior',
      description: 'Earn 500 eco points',
      requirement: '500 eco points',
      awarded: 12
    },
    {
      id: '3',
      name: 'Paper Savior',
      description: 'Dispose of 5kg of paper waste',
      requirement: '5kg of paper waste disposed',
      awarded: 28
    },
    {
      id: '4',
      name: 'Plastic Buster',
      description: 'Dispose of 5kg of plastic waste',
      requirement: '5kg of plastic waste disposed',
      awarded: 15
    }
  ];
  
  // Mock redemption requests
  const redemptionRequests = [
    {
      id: '1',
      user: 'Sarah Williams',
      reward: 'Campus Cafe Voucher',
      requestDate: '2023-05-10',
      status: 'Pending'
    },
    {
      id: '2',
      user: 'John Doe',
      reward: 'Eco-Friendly Water Bottle',
      requestDate: '2023-05-09',
      status: 'Pending'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      reward: 'Eco Steward Certificate',
      requestDate: '2023-05-08',
      status: 'Approved'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rewards & Badges Management</CardTitle>
          <CardDescription>
            Manage rewards, badges, and redemption requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rewards">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="redemptions">Redemption Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Available Rewards</h3>
                <Button className="bg-greensync-primary">Add New Reward</Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map(reward => (
                  <Card key={reward.id}>
                    <CardHeader className="pb-2 flex flex-row justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{reward.title}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </div>
                      <div className="bg-muted p-2 rounded-md">
                        {reward.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Points:</span>
                          <span>{reward.pointsRequired}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">In Stock:</span>
                          <span>{reward.stock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Redeemed:</span>
                          <span>{reward.redeemed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="capitalize">{reward.type}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" className="flex-1 gap-1 text-xs">
                          <Edit className="h-3 w-3" /> Edit
                        </Button>
                        <Button variant="outline" className="flex-1 gap-1 text-xs text-destructive">
                          <Trash2 className="h-3 w-3" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="badges" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Available Badges</h3>
                <Button className="bg-greensync-primary">Add New Badge</Button>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-5 bg-muted p-3 text-xs font-medium text-muted-foreground">
                  <div>Badge Name</div>
                  <div>Description</div>
                  <div>Requirement</div>
                  <div>Users Awarded</div>
                  <div>Actions</div>
                </div>
                {badges.map(badge => (
                  <div key={badge.id} className="grid grid-cols-5 p-3 text-sm border-t">
                    <div className="font-medium">{badge.name}</div>
                    <div>{badge.description}</div>
                    <div>{badge.requirement}</div>
                    <div>{badge.awarded}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="redemptions" className="space-y-6">
              <h3 className="text-lg font-medium">Pending Redemption Requests</h3>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-5 bg-muted p-3 text-xs font-medium text-muted-foreground">
                  <div>User</div>
                  <div>Reward</div>
                  <div>Request Date</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                {redemptionRequests.map(request => (
                  <div key={request.id} className="grid grid-cols-5 p-3 text-sm border-t">
                    <div>{request.user}</div>
                    <div>{request.reward}</div>
                    <div>{request.requestDate}</div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'Approved' 
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {request.status === 'Pending' && (
                        <>
                          <Button variant="outline" size="sm" className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status !== 'Pending' && (
                        <Button variant="outline" size="sm">Details</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRewards;

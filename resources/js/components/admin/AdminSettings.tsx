
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Configure application settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="gamification">Gamification</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Settings</h3>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="GreenSync" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" defaultValue="contact@greensync.edu" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="campus-name">Campus Name</Label>
                    <Input id="campus-name" defaultValue="University Campus" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium">Application Features</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Leaderboard</Label>
                      <p className="text-sm text-muted-foreground">
                        Show the leaderboard on the platform
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable QR Code Check-in</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to check in using QR codes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable NFC Card Check-in</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to check in using NFC cards
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gamification" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gamification Settings</h3>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="points-per-plastic">Points per Plastic Item</Label>
                    <Input id="points-per-plastic" type="number" defaultValue="5" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="points-per-paper">Points per Paper Item</Label>
                    <Input id="points-per-paper" type="number" defaultValue="3" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="points-per-organic">Points per Organic Item</Label>
                    <Input id="points-per-organic" type="number" defaultValue="4" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="points-per-metal">Points per Metal Item</Label>
                    <Input id="points-per-metal" type="number" defaultValue="6" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium">Level Settings</h4>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="level-1-threshold">Level 1 Threshold (points)</Label>
                    <Input id="level-1-threshold" type="number" defaultValue="0" disabled />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="level-2-threshold">Level 2 Threshold (points)</Label>
                    <Input id="level-2-threshold" type="number" defaultValue="200" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="level-3-threshold">Level 3 Threshold (points)</Label>
                    <Input id="level-3-threshold" type="number" defaultValue="500" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="level-4-threshold">Level 4 Threshold (points)</Label>
                    <Input id="level-4-threshold" type="number" defaultValue="1000" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="level-5-threshold">Level 5 Threshold (points)</Label>
                    <Input id="level-5-threshold" type="number" defaultValue="2000" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications for important events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Point Achievement Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications when users reach point milestones
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Badge Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications when users earn new badges
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Monthly Leaderboard Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Send monthly updates about leaderboard rankings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Advanced Settings</h3>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                    <Input id="data-retention" type="number" defaultValue="365" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable System Logs</Label>
                      <p className="text-sm text-muted-foreground">
                        Track detailed system operations for debugging
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable User Activity Tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Track detailed user activity metrics
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-destructive">Danger Zone</h4>
                  
                  <div className="border border-destructive/20 rounded-md p-4 bg-destructive/5">
                    <h5 className="font-medium text-destructive">Reset All User Points</h5>
                    <p className="text-sm text-muted-foreground my-2">
                      This action will reset all user points to zero. This cannot be undone.
                    </p>
                    <Button variant="outline" className="text-destructive border-destructive">
                      Reset Points
                    </Button>
                  </div>
                  
                  <div className="border border-destructive/20 rounded-md p-4 bg-destructive/5">
                    <h5 className="font-medium text-destructive">Reset System Database</h5>
                    <p className="text-sm text-muted-foreground my-2">
                      This action will reset the entire system database. All data will be lost.
                    </p>
                    <Button variant="outline" className="text-destructive border-destructive">
                      Reset Database
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-greensync-primary">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;

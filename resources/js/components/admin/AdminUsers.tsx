
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const AdminUsers = () => {
  // Mock users data
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', points: 450, wasteSaved: 2.5, createdAt: '2023-03-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', points: 720, wasteSaved: 4.2, createdAt: '2023-02-10' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', points: 380, wasteSaved: 2.0, createdAt: '2023-04-05' },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', points: 850, wasteSaved: 5.1, createdAt: '2023-01-22' },
    { id: '5', name: 'Alex Brown', email: 'alex@example.com', points: 230, wasteSaved: 1.4, createdAt: '2023-05-01' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage user accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button className="bg-greensync-primary">Add New User</Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="grid grid-cols-6 bg-muted p-3 text-xs font-medium text-muted-foreground">
              <div>Name</div>
              <div>Email</div>
              <div>Eco Points</div>
              <div>Waste Saved</div>
              <div>Joined</div>
              <div>Actions</div>
            </div>
            {users.map(user => (
              <div key={user.id} className="grid grid-cols-6 p-3 text-sm border-t">
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.points}</div>
                <div>{user.wasteSaved} kg</div>
                <div>{user.createdAt}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive">Delete</Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Showing 5 of 24 users</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-greensync-primary text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;

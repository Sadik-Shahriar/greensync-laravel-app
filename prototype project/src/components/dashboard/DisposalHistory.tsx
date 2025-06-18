
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DisposalHistory = () => {
  // Mock data
  const disposalHistory = [
    { id: 1, date: '2023-05-10', time: '14:30', type: 'Plastic', amount: '0.5kg', location: 'Library', points: 5 },
    { id: 2, date: '2023-05-09', time: '12:15', type: 'Paper', amount: '0.3kg', location: 'Science Building', points: 3 },
    { id: 3, date: '2023-05-08', time: '10:45', type: 'Organic', amount: '0.4kg', location: 'Cafeteria', points: 4 },
    { id: 4, date: '2023-05-07', time: '16:20', type: 'Metal', amount: '0.2kg', location: 'Engineering Block', points: 6 },
    { id: 5, date: '2023-05-06', time: '09:10', type: 'Plastic', amount: '0.3kg', location: 'Student Center', points: 3 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Disposal History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="paper">Paper</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="science">Science Building</SelectItem>
                  <SelectItem value="cafeteria">Cafeteria</SelectItem>
                  <SelectItem value="engineering">Engineering Block</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md">
            <div className="grid grid-cols-6 bg-muted p-3 text-xs font-medium text-muted-foreground">
              <div>Date</div>
              <div>Time</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Location</div>
              <div>Points</div>
            </div>
            {disposalHistory.map((item) => (
              <div key={item.id} className="grid grid-cols-6 p-3 text-sm border-t">
                <div>{item.date}</div>
                <div>{item.time}</div>
                <div>{item.type}</div>
                <div>{item.amount}</div>
                <div>{item.location}</div>
                <div>+{item.points}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing 5 of 20 entries
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded-md text-sm" disabled>Previous</button>
              <button className="px-3 py-1 border rounded-md text-sm bg-greensync-primary text-white">1</button>
              <button className="px-3 py-1 border rounded-md text-sm">2</button>
              <button className="px-3 py-1 border rounded-md text-sm">3</button>
              <button className="px-3 py-1 border rounded-md text-sm">Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisposalHistory;

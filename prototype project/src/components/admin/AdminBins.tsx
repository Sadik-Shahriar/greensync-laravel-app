
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Trash } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminBins = () => {
  // Mock bins data
  const bins = [
    { id: '1', name: 'Library Bin', location: 'Main Library', type: 'Mixed Recycling', status: 'Active', lastEmpty: '2023-05-10', fillLevel: 45 },
    { id: '2', name: 'Science Building Bin', location: 'Science Block', type: 'Paper', status: 'Active', lastEmpty: '2023-05-09', fillLevel: 30 },
    { id: '3', name: 'Cafeteria Bin 1', location: 'Main Cafeteria', type: 'Organic', status: 'Active', lastEmpty: '2023-05-10', fillLevel: 75 },
    { id: '4', name: 'Cafeteria Bin 2', location: 'Main Cafeteria', type: 'Plastic', status: 'Maintenance', lastEmpty: '2023-05-08', fillLevel: 0 },
    { id: '5', name: 'Engineering Block Bin', location: 'Engineering Building', type: 'Mixed Recycling', status: 'Active', lastEmpty: '2023-05-11', fillLevel: 20 },
  ];

  const getBinStatusColor = (status: string, fillLevel: number) => {
    if (status !== 'Active') return 'bg-gray-300';
    if (fillLevel > 80) return 'bg-red-500';
    if (fillLevel > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Smart Bin Management</CardTitle>
          <CardDescription>
            Monitor and manage smart recycling bins across campus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="relative md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search bins..." className="pl-10" />
              </div>
              
              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Bin Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="mixed">Mixed Recycling</SelectItem>
                  <SelectItem value="paper">Paper</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-greensync-primary whitespace-nowrap">Add New Bin</Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="grid grid-cols-7 bg-muted p-3 text-xs font-medium text-muted-foreground">
              <div>Name</div>
              <div>Location</div>
              <div>Type</div>
              <div>Status</div>
              <div>Fill Level</div>
              <div>Last Emptied</div>
              <div>Actions</div>
            </div>
            {bins.map(bin => (
              <div key={bin.id} className="grid grid-cols-7 p-3 text-sm border-t">
                <div>{bin.name}</div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  {bin.location}
                </div>
                <div>{bin.type}</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${bin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {bin.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getBinStatusColor(bin.status, bin.fillLevel)}`}
                      style={{ width: `${bin.fillLevel}%` }} 
                    ></div>
                  </div>
                  <span>{bin.fillLevel}%</span>
                </div>
                <div>{bin.lastEmpty}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Details</Button>
                  <Button variant="outline" size="sm">QR Code</Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Bin Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-md bg-yellow-50 border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-yellow-100">
                    <Trash className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Cafeteria Bin 1 is almost full (75%)</h4>
                    <p className="text-sm text-muted-foreground">Main Cafeteria</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Schedule Pickup</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-0.5">
                  <Label>Alert Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts when bins are nearly full
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-0.5">
                  <Label>Automatic Pickup Scheduling</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically schedule pickup when bins reach 80% capacity
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly bin usage reports
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBins;

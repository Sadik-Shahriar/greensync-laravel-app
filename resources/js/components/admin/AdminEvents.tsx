
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarIcon, Clock, MapPin, Users, Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AdminEvents = () => {
  // Mock events data
  const events = [
    { 
      id: '1', 
      title: 'Campus Cleanup Day', 
      description: 'Join us for a day of cleaning the campus grounds.', 
      date: '2023-05-20', 
      time: '09:00 AM - 12:00 PM', 
      location: 'Main Campus Quad', 
      participants: 15,
      maxParticipants: 30 
    },
    { 
      id: '2', 
      title: 'Recycling Workshop', 
      description: 'Learn about proper recycling techniques and practices.', 
      date: '2023-05-25', 
      time: '02:00 PM - 04:00 PM', 
      location: 'Science Building, Room 103', 
      participants: 12,
      maxParticipants: 20
    },
    { 
      id: '3', 
      title: 'Sustainability Fair', 
      description: 'Explore eco-friendly products and sustainable lifestyle options.', 
      date: '2023-06-05', 
      time: '10:00 AM - 04:00 PM', 
      location: 'Student Center', 
      participants: 45,
      maxParticipants: 100
    }
  ];

  // Calculate upcoming events vs past events
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.date) < currentDate);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Events Management</CardTitle>
          <CardDescription>
            Create and manage sustainability events and challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Upcoming Events</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-greensync-primary">
                  <Plus className="h-4 w-4 mr-2" /> 
                  Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new sustainability event.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-title" className="text-right">
                      Title
                    </Label>
                    <Input id="event-title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="event-description" className="col-span-3" rows={3} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-date" className="text-right">
                      Date
                    </Label>
                    <Input id="event-date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-time" className="text-right">
                      Time
                    </Label>
                    <Input id="event-time" placeholder="e.g., 10:00 AM - 12:00 PM" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-location" className="text-right">
                      Location
                    </Label>
                    <Input id="event-location" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="max-participants" className="text-right">
                      Max Participants
                    </Label>
                    <Input id="max-participants" type="number" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-greensync-primary">Create Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <Card key={event.id} className="overflow-hidden">
                <div className="bg-muted p-4 flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-greensync-light text-greensync-primary p-1.5 rounded-full">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-sm font-medium">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-greensync-light text-greensync-primary p-1.5 rounded-full">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="text-sm font-medium">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-greensync-light text-greensync-primary p-1.5 rounded-full">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{event.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.participants} registered of {event.maxParticipants} max</span>
                      </div>
                      <Button variant="outline" size="sm">View Participants</Button>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-greensync-primary h-2 rounded-full"
                        style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Past Events</h3>
            <div className="border rounded-md">
              <div className="grid grid-cols-4 bg-muted p-3 text-xs font-medium text-muted-foreground">
                <div>Event Name</div>
                <div>Date</div>
                <div>Participants</div>
                <div>Actions</div>
              </div>
              {pastEvents.map(event => (
                <div key={event.id} className="grid grid-cols-4 p-3 text-sm border-t">
                  <div>{event.title}</div>
                  <div>{event.date}</div>
                  <div>{event.participants} attendees</div>
                  <div>
                    <Button variant="outline" size="sm">View Report</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;

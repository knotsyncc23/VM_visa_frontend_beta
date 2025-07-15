import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { api, CalendarEvent, CreateCalendarEventData } from '@shared/api';
import { useAuth } from '@/components/auth/auth-context';

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'consultation' as const,
    participants: '',
    location: { type: 'video-call' as const, details: '' }
  });
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const events = await api.getCalendarEvents();
      setEvents(events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch calendar events",
        variant: "destructive"
      });
    }
  };

  const handleCreateEvent = async () => {
    try {
      const eventData: CreateCalendarEventData = {
        title: newEvent.title,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        type: newEvent.type,
        location: newEvent.location,
        participants: newEvent.participants 
          ? newEvent.participants.split(',').map(p => ({ user: p.trim(), status: 'invited' as const }))
          : []
      };

      await api.createCalendarEvent(eventData);
      
      toast({
        title: "Success",
        description: "Event created successfully"
      });
      
      setIsCreateModalOpen(false);
      setNewEvent({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'consultation',
        participants: '',
        location: { type: 'video-call', details: '' }
      });
      
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive"
      });
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <Users className="h-4 w-4" />;
      case 'document-review': return <Video className="h-4 w-4" />;
      case 'follow-up': return <Clock className="h-4 w-4" />;
      case 'deadline': return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'document-review': return 'bg-green-100 text-green-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const days = getDaysInMonth(selectedDate);
  const monthYear = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-2">Manage your appointments and deadlines</p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Event title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate">End Date & Time</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="document-review">Document Review</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="locationType">Location Type</Label>
                    <Select 
                      value={newEvent.location.type} 
                      onValueChange={(value: any) => setNewEvent({ 
                        ...newEvent, 
                        location: { ...newEvent.location, type: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video-call">Video Call</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="in-person">In Person</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="participants">Participants (comma-separated emails)</Label>
                  <Input
                    id="participants"
                    value={newEvent.participants}
                    onChange={(e) => setNewEvent({ ...newEvent, participants: e.target.value })}
                    placeholder="user1@example.com, user2@example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="locationDetails">Location Details (optional)</Label>
                  <Input
                    id="locationDetails"
                    value={newEvent.location.details}
                    onChange={(e) => setNewEvent({ 
                      ...newEvent, 
                      location: { ...newEvent.location, details: e.target.value }
                    })}
                    placeholder="Meeting link, address, or other details"
                  />
                </div>
                
                <Button onClick={handleCreateEvent} className="w-full">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{monthYear}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const isToday = day && day.toDateString() === new Date().toDateString();
                    
                    return (
                      <div
                        key={index}
                        className={`p-2 min-h-[80px] border rounded-md ${
                          day 
                            ? isToday 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'bg-white hover:bg-gray-50 cursor-pointer'
                            : 'bg-gray-50'
                        }`}
                      >
                        {day && (
                          <>
                            <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                              {day.getDate()}
                            </div>
                            <div className="space-y-1 mt-1">
                              {dayEvents.slice(0, 2).map(event => (                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded text-center ${getTypeColor(event.type)}`}
                              >
                                {event.title}
                              </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-gray-500 text-center">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Events */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Today's Events</CardTitle>
                <p className="text-sm text-gray-600">{formatDate(new Date())}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEventsForDate(new Date()).length > 0 ? (
                    getEventsForDate(new Date()).map(event => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getTypeIcon(event.type)}
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge className={getTypeColor(event.type)}>
                                {event.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            {event.meetingLink && (
                              <a
                                href={event.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                              >
                                <Video className="h-4 w-4" />
                                Join Meeting
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No events scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events
                    .filter(event => new Date(event.startDate) > new Date())
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .slice(0, 5)
                    .map(event => (
                      <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        {getTypeIcon(event.type)}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <Badge className={getTypeColor(event.type)} variant="secondary">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  
                  {events.filter(event => new Date(event.startDate) > new Date()).length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">No upcoming events</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  FileText,
  Edit,
  Trash2,
  MoreVertical,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  type: "appointment" | "deadline" | "meeting" | "reminder";
  location?: string;
  attendees?: string[];
  priority: "high" | "medium" | "low";
  status: "confirmed" | "pending" | "cancelled";
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Biometrics Appointment",
      description: "Biometrics appointment at the visa application center",
      date: "2024-03-15",
      time: "10:00 AM",
      duration: "1 hour",
      type: "appointment",
      location: "VAC Toronto, 219 Dufferin St",
      priority: "high",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Document Submission Deadline",
      description: "Submit remaining employment documents",
      date: "2024-03-18",
      time: "11:59 PM",
      duration: "All day",
      type: "deadline",
      priority: "high",
      status: "pending",
    },
    {
      id: "3",
      title: "Consultation with Sarah Wilson",
      description: "Discuss application progress and next steps",
      date: "2024-03-20",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "meeting",
      attendees: ["Sarah Wilson", "You"],
      priority: "medium",
      status: "confirmed",
    },
    {
      id: "4",
      title: "Application Fee Payment Due",
      description: "Pay remaining application fees",
      date: "2024-03-22",
      time: "5:00 PM",
      duration: "Reminder",
      type: "reminder",
      priority: "medium",
      status: "pending",
    },
    {
      id: "5",
      title: "Virtual Interview",
      description: "Immigration officer interview via video call",
      date: "2024-03-25",
      time: "9:00 AM",
      duration: "30 minutes",
      type: "appointment",
      location: "Video Call",
      priority: "high",
      status: "confirmed",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateString);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "#0288D1";
      case "deadline":
        return "#FF5722";
      case "meeting":
        return "#4CAF50";
      case "reminder":
        return "#FF9800";
      default:
        return "#0288D1";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return Clock;
      case "deadline":
        return AlertCircle;
      case "meeting":
        return Users;
      case "reminder":
        return Bell;
      default:
        return CalendarIcon;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "cancelled":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const todayString = today.toDateString();

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: "#FEFEFE" }}
    >
      {/* Back Button */}
      <div className="p-6 pb-0">
        <BackButton />
      </div>

      {/* Header */}
      <div
        className="p-6 border-b border-gray-200"
        style={{ backgroundColor: "#F5FAFE" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold" style={{ color: "#455A64" }}>
              Calendar
            </h1>
            <Badge style={{ backgroundColor: "#0288D1", color: "white" }}>
              {upcomingEvents.length} upcoming
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              style={{ color: "#455A64" }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>

            <div className="flex border border-gray-300 rounded-lg">
              {["month", "week", "day"].map((mode) => (
                <Button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  variant="ghost"
                  size="sm"
                  className={`rounded-none capitalize ${
                    viewMode === mode ? "bg-blue-100" : ""
                  }`}
                  style={{
                    backgroundColor:
                      viewMode === mode ? "#E0F2E7" : "transparent",
                    color: "#455A64",
                  }}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigateMonth("prev")}
              variant="ghost"
              size="sm"
              style={{ color: "#455A64" }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <h2 className="text-xl font-semibold" style={{ color: "#455A64" }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <Button
              onClick={() => navigateMonth("next")}
              variant="ghost"
              size="sm"
              style={{ color: "#455A64" }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={() => setCurrentDate(new Date())}
            variant="outline"
            size="sm"
            className="border-gray-300"
            style={{ color: "#455A64" }}
          >
            Today
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Calendar Grid */}
        <div className="flex-1 p-6">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-sm py-2"
                style={{ color: "#455A64" }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-4 h-96">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} />;
              }

              const dayEvents = getEventsForDate(day);
              const isToday = day.toDateString() === todayString;
              const isSelected =
                selectedDate?.toDateString() === day.toDateString();

              return (
                <motion.div
                  key={day.toDateString()}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 border border-gray-200 rounded-lg cursor-pointer transition-colors min-h-24 ${
                    isSelected ? "ring-2 ring-blue-500" : ""
                  } ${isToday ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  style={{
                    backgroundColor: isToday
                      ? "#E0F2E7"
                      : isSelected
                        ? "#F5FAFE"
                        : "#FEFEFE",
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={`text-sm font-medium ${
                        isToday ? "text-blue-600" : ""
                      }`}
                      style={{ color: isToday ? "#0288D1" : "#455A64" }}
                    >
                      {day.getDate()}
                    </span>
                    {dayEvents.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{ backgroundColor: "#0288D1", color: "white" }}
                      >
                        {dayEvents.length}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => {
                      const EventIcon = getEventIcon(event.type);
                      return (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded truncate flex items-center"
                          style={{
                            backgroundColor: getEventTypeColor(event.type),
                            color: "white",
                          }}
                        >
                          <EventIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{event.title}</span>
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <div
                        className="text-xs p-1 rounded text-center"
                        style={{ backgroundColor: "#F3E5F5", color: "#455A64" }}
                      >
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Upcoming Events */}
        <div
          className="w-80 border-l border-gray-200 p-6"
          style={{ backgroundColor: "#F5FAFE" }}
        >
          <h3 className="font-semibold mb-4" style={{ color: "#455A64" }}>
            Upcoming Events
          </h3>

          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const EventIcon = getEventIcon(event.type);
              const StatusIcon = getStatusIcon(event.status);
              const eventDate = new Date(event.date);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg border border-gray-200"
                  style={{ backgroundColor: "#FEFEFE" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <EventIcon
                        className="h-4 w-4 flex-shrink-0"
                        style={{ color: getEventTypeColor(event.type) }}
                      />
                      <h4
                        className="font-semibold text-sm"
                        style={{ color: "#455A64" }}
                      >
                        {event.title}
                      </h4>
                    </div>
                    <StatusIcon
                      className="h-4 w-4"
                      style={{
                        color:
                          event.status === "confirmed"
                            ? "#4CAF50"
                            : event.status === "pending"
                              ? "#FF9800"
                              : "#FF5722",
                      }}
                    />
                  </div>

                  <p
                    className="text-xs mb-2"
                    style={{ color: "#455A64", opacity: 0.8 }}
                  >
                    {event.description}
                  </p>

                  <div
                    className="space-y-1 text-xs"
                    style={{ color: "#455A64" }}
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {eventDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time} ({event.duration})
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.attendees.join(", ")}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{
                        backgroundColor: getEventTypeColor(event.type),
                        color: "white",
                      }}
                    >
                      {event.type}
                    </Badge>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: "#455A64" }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: "#455A64" }}
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-2">
            <Button
              className="w-full text-sm"
              style={{ backgroundColor: "#0288D1", color: "white" }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button
              variant="outline"
              className="w-full text-sm border-gray-300"
              style={{ color: "#455A64" }}
            >
              <Bell className="h-4 w-4 mr-2" />
              Set Reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

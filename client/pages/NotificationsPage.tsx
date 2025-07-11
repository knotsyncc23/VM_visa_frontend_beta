import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import { useAuth } from "@/components/auth/auth-context";
import {
  Bell,
  Calendar,
  MessageCircle,
  FileText,
  CheckCircle,
  Clock,
  Users,
  Star,
  Mail,
  Shield,
  Trash2,
  MarkAsUnreadIcon,
  Filter,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'message' | 'appointment' | 'document' | 'system' | 'proposal' | 'payment';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock notifications data - replace with real API call
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'message',
        title: 'New Message from Agent',
        message: 'Sarah Wilson sent you a message about your visa application.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        isRead: false,
        priority: 'high',
        actionUrl: '/messages'
      },
      {
        id: '2',
        type: 'appointment',
        title: 'Upcoming Consultation',
        message: 'Your consultation with immigration lawyer is scheduled for tomorrow at 2:00 PM.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: false,
        priority: 'medium',
        actionUrl: '/calendar'
      },
      {
        id: '3',
        type: 'document',
        title: 'Document Upload Required',
        message: 'Please upload your updated passport copy to proceed with your application.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        isRead: true,
        priority: 'high',
        actionUrl: '/documents'
      },
      {
        id: '4',
        type: 'proposal',
        title: 'New Proposal Received',
        message: 'You have received a new proposal for your skilled worker visa application.',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        isRead: false,
        priority: 'medium',
        actionUrl: '/agent-proposals'
      },
      {
        id: '5',
        type: 'system',
        title: 'Profile Updated Successfully',
        message: 'Your profile information has been updated successfully.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
        priority: 'low'
      },
      {
        id: '6',
        type: 'payment',
        title: 'Payment Confirmation',
        message: 'Your payment of $500 for consultation services has been processed successfully.',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
        isRead: true,
        priority: 'medium',
        actionUrl: '/payments'
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 800);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'appointment':
        return Calendar;
      case 'document':
        return FileText;
      case 'proposal':
        return Users;
      case 'payment':
        return Shield;
      case 'system':
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-500 bg-red-50';
    if (priority === 'medium') return 'text-orange-500 bg-orange-50';
    
    switch (type) {
      case 'message':
        return 'text-blue-500 bg-blue-50';
      case 'appointment':
        return 'text-green-500 bg-green-50';
      case 'document':
        return 'text-purple-500 bg-purple-50';
      case 'proposal':
        return 'text-indigo-500 bg-indigo-50';
      case 'payment':
        return 'text-emerald-500 bg-emerald-50';
      case 'system':
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'read' && !notif.isRead) return false;
    if (filter === 'unread' && notif.isRead) return false;
    if (typeFilter !== 'all' && notif.type !== typeFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFEFE" }}>
      <div className="max-w-4xl mx-auto p-6">
        <BackButton 
          dashboardType={user?.userType as "client" | "agent" | "organization"} 
          label="Back to Dashboard"
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#455A64" }}>
                Notifications
              </h1>
              <p className="text-sm mt-2" style={{ color: "#455A64", opacity: 0.7 }}>
                Stay updated with your visa application progress
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                  style={{ color: "#455A64" }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
              <Badge 
                className="bg-blue-100 text-blue-700"
              >
                {unreadCount} Unread
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg border" style={{ backgroundColor: "#F5FAFE", borderColor: "#E1E8ED" }}>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" style={{ color: "#455A64" }} />
              <span className="text-sm font-medium" style={{ color: "#455A64" }}>Filter:</span>
            </div>
            
            <div className="flex space-x-2">
              {['all', 'unread', 'read'].map((filterType) => (
                <Button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  variant={filter === filterType ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "capitalize",
                    filter === filterType 
                      ? "bg-blue-500 text-white" 
                      : "border-gray-300 text-gray-600"
                  )}
                >
                  {filterType}
                </Button>
              ))}
            </div>

            <div className="flex space-x-2">
              {['all', 'message', 'appointment', 'document', 'proposal', 'payment', 'system'].map((type) => (
                <Button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  variant={typeFilter === type ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "capitalize",
                    typeFilter === type 
                      ? "bg-blue-500 text-white" 
                      : "border-gray-300 text-gray-600"
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="p-6 rounded-lg border border-gray-200" style={{ backgroundColor: "#FEFEFE" }}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto mb-4" style={{ color: "#E1E8ED" }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#455A64" }}>
                No notifications found
              </h3>
              <p style={{ color: "#455A64", opacity: 0.7 }}>
                {filter === 'all' ? 'You\'re all caught up!' : `No ${filter} notifications to display`}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type, notification.priority);

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "p-6 rounded-lg border transition-all duration-200 hover:shadow-md",
                      notification.isRead 
                        ? "border-gray-200 bg-white" 
                        : "border-blue-200 bg-blue-50/30"
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", colorClass)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            {notification.priority === 'high' && (
                              <Badge className="bg-red-100 text-red-700 text-xs">
                                High Priority
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {notification.actionUrl && (
                              <Button
                                onClick={() => window.location.href = notification.actionUrl!}
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id)}
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {notification.isRead ? (
                                <>
                                  <Mail className="w-4 h-4 mr-1" />
                                  Mark Unread
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Mark Read
                                </>
                              )}
                            </Button>
                            
                            <Button
                              onClick={() => deleteNotification(notification.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

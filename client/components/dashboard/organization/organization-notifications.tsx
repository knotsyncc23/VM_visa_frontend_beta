import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  FileText,
  MessageCircle,
  Calendar,
  Star,
  TrendingUp,
  Shield,
  X,
  Check,
  Eye,
  Archive,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react";

export function OrganizationNotifications() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const notifications = [
    {
      id: "1",
      type: "case_assigned",
      title: "New Case Assigned",
      message: "H1-B visa case assigned to Sarah Ahmad by admin",
      details: "Client: John Smith • Case ID: CASE-2024-001",
      timestamp: "2 hours ago",
      read: false,
      priority: "medium",
      action: "View Case",
      category: "case_management",
    },
    {
      id: "2",
      type: "license_expiry",
      title: "License Renewal Reminder",
      message: "Organization license expires in 30 days",
      details: "ICCRC License: R123456 • Expiry: Dec 31, 2024",
      timestamp: "1 day ago",
      read: false,
      priority: "high",
      action: "Renew License",
      category: "compliance",
    },
    {
      id: "3",
      type: "agent_performance",
      title: "Outstanding Agent Performance",
      message: "Sarah Ahmad achieved 95% success rate this month",
      details: "18 cases completed • $24,000 revenue generated",
      timestamp: "2 days ago",
      read: true,
      priority: "low",
      action: "View Report",
      category: "performance",
    },
    {
      id: "4",
      type: "client_rating",
      title: "New Client Review",
      message: "5-star rating received from Michael Chen",
      details: "PR Application case • Agent: David Kim",
      timestamp: "3 days ago",
      read: true,
      priority: "low",
      action: "View Review",
      category: "feedback",
    },
    {
      id: "5",
      type: "docs_submitted",
      title: "Documents Submitted",
      message: "Client uploaded documents for review",
      details: "Case: CASE-2024-002 • Client: Emma Johnson",
      timestamp: "4 days ago",
      read: false,
      priority: "medium",
      action: "Review Docs",
      category: "case_management",
    },
    {
      id: "6",
      type: "agent_added",
      title: "New Agent Joined",
      message: "Lisa Rodriguez accepted invitation and joined the team",
      details: "Specialization: Visitor Visas, Study Visas",
      timestamp: "5 days ago",
      read: true,
      priority: "medium",
      action: "View Profile",
      category: "team",
    },
    {
      id: "7",
      type: "system_update",
      title: "System Maintenance",
      message: "Scheduled maintenance completed successfully",
      details: "Duration: 2 hours • No data loss reported",
      timestamp: "1 week ago",
      read: true,
      priority: "low",
      action: "View Details",
      category: "system",
    },
    {
      id: "8",
      type: "security_alert",
      title: "Security Alert",
      message: "Multiple failed login attempts detected",
      details: "IP: 192.168.1.100 • Account: admin@globalimmig.com",
      timestamp: "1 week ago",
      read: false,
      priority: "high",
      action: "View Logs",
      category: "security",
    },
  ];

  const categories = [
    { id: "all", label: "All Notifications", count: notifications.length },
    {
      id: "case_management",
      label: "Case Management",
      count: notifications.filter((n) => n.category === "case_management")
        .length,
    },
    {
      id: "compliance",
      label: "Compliance",
      count: notifications.filter((n) => n.category === "compliance").length,
    },
    {
      id: "performance",
      label: "Performance",
      count: notifications.filter((n) => n.category === "performance").length,
    },
    {
      id: "security",
      label: "Security",
      count: notifications.filter((n) => n.category === "security").length,
    },
    {
      id: "team",
      label: "Team",
      count: notifications.filter((n) => n.category === "team").length,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      selectedFilter === "all" || notification.category === selectedFilter;
    const matchesSearch =
      searchTerm === "" ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "case_assigned":
        return <FileText className="w-5 h-5" />;
      case "license_expiry":
        return <AlertCircle className="w-5 h-5" />;
      case "agent_performance":
        return <TrendingUp className="w-5 h-5" />;
      case "client_rating":
        return <Star className="w-5 h-5" />;
      case "docs_submitted":
        return <FileText className="w-5 h-5" />;
      case "agent_added":
        return <Users className="w-5 h-5" />;
      case "system_update":
        return <RefreshCw className="w-5 h-5" />;
      case "security_alert":
        return <Shield className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "#EF4444";
    if (priority === "medium") return "#0052CC";
    return "#10B981";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#EF4444";
      case "medium":
        return "#F59E0B";
      case "low":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{
                background: "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
              }}
            >
              <Bell className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Total Notifications
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {notifications.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: "#EF4444" }}
            >
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Unread
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {unreadCount}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: "#F59E0B" }}
            >
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            High Priority
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {notifications.filter((n) => n.priority === "high").length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: "#10B981" }}
            >
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            This Week
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            6
          </p>
        </motion.div>
      </div>

      {/* Header with Search and Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
              Notifications Center
            </h2>
            <p className="text-sm" style={{ color: "#666666" }}>
              Stay updated with important organization activities
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button
              style={{ backgroundColor: "#0052CC", color: "white" }}
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "#666666" }}
            />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "#F4F6FA",
                border: "1px solid #D9D9D9",
                color: "#1A1A1A",
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-1 ${
                  selectedFilter === category.id
                    ? "text-white shadow-sm"
                    : "hover:text-gray-800"
                }`}
                style={{
                  backgroundColor:
                    selectedFilter === category.id ? "#0052CC" : "transparent",
                  color: selectedFilter === category.id ? "white" : "#666666",
                }}
              >
                <span>{category.label}</span>
                <Badge
                  className={`text-xs ml-1 ${
                    selectedFilter === category.id
                      ? "bg-white/20 text-white hover:bg-white/20"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
              !notification.read ? "ring-2 ring-blue-100" : ""
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{
                  backgroundColor: getNotificationColor(
                    notification.type,
                    notification.priority,
                  ),
                }}
              >
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: "#1A1A1A" }}
                    >
                      {notification.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      {notification.message}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#999999" }}>
                      {notification.details}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge
                      style={{
                        backgroundColor: getPriorityColor(
                          notification.priority,
                        ),
                        color: "white",
                      }}
                    >
                      {notification.priority.toUpperCase()}
                    </Badge>
                    {!notification.read && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#0052CC" }}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs" style={{ color: "#999999" }}>
                    {notification.timestamp}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      style={{ backgroundColor: "#0052CC", color: "white" }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {notification.action}
                    </Button>
                    {!notification.read && (
                      <Button variant="outline" size="sm">
                        <Check className="w-4 h-4 mr-1" />
                        Mark Read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm"
        >
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#EAF2FF" }}
          >
            <Bell className="w-8 h-8" style={{ color: "#0052CC" }} />
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "#1A1A1A" }}
          >
            No notifications found
          </h3>
          <p className="mb-4" style={{ color: "#666666" }}>
            No notifications match your search criteria or filter selection.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}

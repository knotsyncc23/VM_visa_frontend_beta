import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Search,
  Filter,
  Archive,
  Star,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
  Paperclip,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Mail,
  MailOpen,
  Plus,
} from "lucide-react";

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  category: "updates" | "notifications" | "documents" | "system";
  priority: "high" | "medium" | "low";
  attachments?: number;
}

const MessagesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const messages: Message[] = [
    {
      id: "1",
      from: "Sarah Wilson",
      subject: "Application Status Update - Work Permit",
      preview:
        "Your work permit application has been reviewed and approved. Next steps include...",
      timestamp: "2 hours ago",
      read: false,
      starred: true,
      category: "updates",
      priority: "high",
      attachments: 2,
    },
    {
      id: "2",
      from: "VM Visa System",
      subject: "Document Upload Confirmation",
      preview:
        "We have received your employment letter upload. Your document package is now complete...",
      timestamp: "5 hours ago",
      read: true,
      starred: false,
      category: "documents",
      priority: "medium",
    },
    {
      id: "3",
      from: "Immigration Department",
      subject: "Biometrics Appointment Scheduled",
      preview:
        "Your biometrics appointment has been scheduled for March 15, 2024 at 10:00 AM...",
      timestamp: "1 day ago",
      read: false,
      starred: false,
      category: "notifications",
      priority: "high",
      attachments: 1,
    },
    {
      id: "4",
      from: "David Chen",
      subject: "Welcome to VM Visa Platform",
      preview:
        "Welcome to our immigration platform! Here's everything you need to know to get started...",
      timestamp: "3 days ago",
      read: true,
      starred: false,
      category: "system",
      priority: "low",
    },
    {
      id: "5",
      from: "Payment Team",
      subject: "Payment Confirmation - Application Fee",
      preview:
        "Your payment of $1,500 for the work permit application has been successfully processed...",
      timestamp: "1 week ago",
      read: true,
      starred: false,
      category: "notifications",
      priority: "medium",
    },
  ];

  const categories = [
    { id: "all", label: "All Messages", count: messages.length },
    {
      id: "updates",
      label: "Updates",
      count: messages.filter((m) => m.category === "updates").length,
    },
    {
      id: "notifications",
      label: "Notifications",
      count: messages.filter((m) => m.category === "notifications").length,
    },
    {
      id: "documents",
      label: "Documents",
      count: messages.filter((m) => m.category === "documents").length,
    },
    {
      id: "system",
      label: "System",
      count: messages.filter((m) => m.category === "system").length,
    },
  ];

  const filteredMessages = messages.filter((message) => {
    const matchesCategory =
      selectedCategory === "all" || message.category === selectedCategory;
    const matchesSearch =
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#FF5722";
      case "medium":
        return "#FF9800";
      case "low":
        return "#4CAF50";
      default:
        return "#0288D1";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "updates":
        return CheckCircle;
      case "notifications":
        return AlertCircle;
      case "documents":
        return Paperclip;
      case "system":
        return Clock;
      default:
        return Mail;
    }
  };

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId],
    );
  };

  const markAsRead = (messageIds: string[]) => {
    // In a real app, this would update the backend
    console.log("Marking as read:", messageIds);
  };

  const deleteMessages = (messageIds: string[]) => {
    // In a real app, this would update the backend
    console.log("Deleting messages:", messageIds);
  };

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
              Messages
            </h1>
            <Badge style={{ backgroundColor: "#0288D1", color: "white" }}>
              {unreadCount} unread
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
              Compose
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              style={{ color: "#455A64" }}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
              style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
            />
          </div>

          {selectedMessages.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => markAsRead(selectedMessages)}
                variant="outline"
                size="sm"
                className="border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Mark Read
              </Button>
              <Button
                onClick={() => deleteMessages(selectedMessages)}
                variant="outline"
                size="sm"
                className="border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Category Sidebar */}
        <div
          className="w-64 border-r border-gray-200 p-4"
          style={{ backgroundColor: "#F5FAFE" }}
        >
          <h3 className="font-semibold mb-4" style={{ color: "#455A64" }}>
            Categories
          </h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="ghost"
                className="w-full justify-between text-left"
                style={{
                  backgroundColor:
                    selectedCategory === category.id
                      ? "#E0F2E7"
                      : "transparent",
                  color: "#455A64",
                }}
              >
                <span className="text-sm">{category.label}</span>
                <Badge
                  variant="secondary"
                  className="text-xs"
                  style={{
                    backgroundColor:
                      selectedCategory === category.id ? "#0288D1" : "#F3E5F5",
                    color:
                      selectedCategory === category.id ? "white" : "#455A64",
                  }}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3
              className="font-semibold mb-4 text-sm"
              style={{ color: "#455A64" }}
            >
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm"
                style={{ color: "#455A64" }}
              >
                <Star className="h-4 w-4 mr-2" />
                Starred
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm"
                style={{ color: "#455A64" }}
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm"
                style={{ color: "#455A64" }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Trash
              </Button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => {
            const CategoryIcon = getCategoryIcon(message.category);
            const isSelected = selectedMessages.includes(message.id);

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                } ${!message.read ? "bg-blue-25" : ""}`}
                onClick={() => toggleMessageSelection(message.id)}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleMessageSelection(message.id)}
                      className="rounded border-gray-300"
                      style={{ accentColor: "#0288D1" }}
                    />
                  </div>

                  {/* Message Icon */}
                  <div className="pt-1">
                    {message.read ? (
                      <MailOpen
                        className="h-5 w-5"
                        style={{ color: "#455A64" }}
                      />
                    ) : (
                      <Mail className="h-5 w-5" style={{ color: "#0288D1" }} />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-semibold text-sm ${
                            !message.read ? "text-gray-900" : "text-gray-700"
                          }`}
                          style={{ color: "#455A64" }}
                        >
                          {message.from}
                        </span>
                        <CategoryIcon
                          className="h-4 w-4"
                          style={{ color: getPriorityColor(message.priority) }}
                        />
                        {message.starred && (
                          <Star
                            className="h-4 w-4 fill-yellow-400"
                            style={{ color: "#FFD700" }}
                          />
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {message.attachments && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Paperclip className="h-3 w-3 mr-1" />
                            {message.attachments}
                          </div>
                        )}
                        <span
                          className="text-xs"
                          style={{ color: "#455A64", opacity: 0.7 }}
                        >
                          {message.timestamp}
                        </span>
                      </div>
                    </div>

                    <h3
                      className={`font-medium text-sm mb-1 ${
                        !message.read ? "font-semibold" : ""
                      }`}
                      style={{ color: "#455A64" }}
                    >
                      {message.subject}
                    </h3>

                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: "#455A64", opacity: 0.8 }}
                    >
                      {message.preview}
                    </p>

                    {/* Priority and Category Tags */}
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: getPriorityColor(message.priority),
                          color: "white",
                        }}
                      >
                        {message.priority}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: "#F3E5F5",
                          color: "#455A64",
                        }}
                      >
                        {message.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: "#455A64" }}
                    >
                      <Reply className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: "#455A64" }}
                    >
                      <Forward className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: "#455A64" }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredMessages.length === 0 && (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="text-center">
                <Mail
                  className="h-12 w-12 mx-auto mb-4"
                  style={{ color: "#455A64", opacity: 0.5 }}
                />
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#455A64" }}
                >
                  No messages found
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "#455A64", opacity: 0.7 }}
                >
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "No messages in this category"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

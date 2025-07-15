import React, { useState, useRef, useEffect } from "react";
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
  Send,
  Smile,
  Phone,
  Video,
  Bell,
  User,
  CheckCheck,
  Check,
  Users,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import { api } from '@shared/api';
import { useAuth } from '../components/auth/auth-context';

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
  type: 'message' | 'notification';
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
  conversationId: string;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  type: 'chat' | 'group';
}

const MessagesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<'messages' | 'chat'>('messages');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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
      type: "message",
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
      type: "notification",
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
      type: "notification",
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
      type: "message",
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
      type: "notification",
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

  useEffect(() => {
    fetchConversations();
    fetchMessages();
    // Set up real-time updates
    const interval = setInterval(() => {
      if (activeView === 'chat' && selectedConversation) {
        fetchChatMessages(selectedConversation);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeView, selectedConversation]);

  const fetchConversations = async () => {
    try {
      // Replace with actual API call
      const mockConversations: Conversation[] = [
        {
          id: "conv-1",
          name: "Sarah Wilson",
          role: "Immigration Agent",
          avatar: "SW",
          lastMessage: "I'll review your documents today",
          timestamp: "2 min ago",
          unread: 2,
          online: true,
          type: 'chat'
        },
        {
          id: "conv-2", 
          name: "David Chen",
          role: "Case Manager",
          avatar: "DC",
          lastMessage: "Your application is progressing well",
          timestamp: "1 hour ago",
          unread: 0,
          online: false,
          type: 'chat'
        },
        {
          id: "conv-3",
          name: "VM Visa Team",
          role: "Support Group",
          avatar: "VT",
          lastMessage: "Welcome to our support channel",
          timestamp: "3 hours ago", 
          unread: 1,
          online: true,
          type: 'group'
        }
      ];
      setConversations(mockConversations);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      // Replace with actual API call when messages backend is ready
      console.log('Fetching messages...');
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchChatMessages = async (conversationId: string) => {
    try {
      // Replace with actual API call
      const mockMessages: ChatMessage[] = [
        {
          id: "msg-1",
          sender: "Sarah Wilson", 
          message: "Hi! I've received your documents and will review them today.",
          timestamp: "10:30 AM",
          isOwn: false,
          status: "read",
          conversationId
        },
        {
          id: "msg-2",
          sender: user?.name || "You",
          message: "Thank you! When can I expect feedback?",
          timestamp: "10:35 AM", 
          isOwn: true,
          status: "delivered",
          conversationId
        },
        {
          id: "msg-3",
          sender: "Sarah Wilson",
          message: "I'll have feedback for you by end of day. Everything looks good so far!",
          timestamp: "10:45 AM",
          isOwn: false,
          status: "read", 
          conversationId
        }
      ];
      setChatMessages(mockMessages);
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    try {
      const messageData: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: user?.name || "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        status: "sent",
        conversationId: selectedConversation
      };
      
      setChatMessages(prev => [...prev, messageData]);
      setNewMessage("");
      
      // Simulate message delivery status updates
      setTimeout(() => {
        setChatMessages(prev => prev.map(msg => 
          msg.id === messageData.id ? { ...msg, status: "delivered" } : msg
        ));
      }, 1000);
      
      // Replace with actual API call
      console.log('Sending message:', messageData);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
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
              Messages & Chat
            </h1>
            <Badge style={{ backgroundColor: "#0288D1", color: "white" }}>
              {unreadCount} unread
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Toggle */}
            <div className="flex bg-white rounded-lg border border-gray-300 p-1">
              <Button
                variant={activeView === 'messages' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('messages')}
                className={`${
                  activeView === 'messages' 
                    ? 'bg-royal-blue-600 text-white' 
                    : 'text-cool-gray-600 hover:bg-cool-gray-100'
                }`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button
                variant={activeView === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('chat')}
                className={`${
                  activeView === 'chat' 
                    ? 'bg-royal-blue-600 text-white' 
                    : 'text-cool-gray-600 hover:bg-cool-gray-100'
                }`}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              style={{ color: "#455A64" }}
            >
              <Plus className="h-4 w-4 mr-2" />
              {activeView === 'messages' ? 'Compose' : 'New Chat'}
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
        {activeView === 'messages' ? (
          <>
            {/* Category Sidebar for Messages */}
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
            </>
        ) : (
          // Chat View
          <>
            {/* Conversations Sidebar for Chat */}
            <div className="w-80 border-r border-gray-200 flex flex-col" style={{ backgroundColor: "#F5FAFE" }}>
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2" style={{ color: "#455A64" }}>
                  Conversations
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    whileHover={{ backgroundColor: "#E3F2FD" }}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedConversation === conv.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedConversation(conv.id);
                      fetchChatMessages(conv.id);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-royal-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-royal-blue-600">
                            {conv.avatar}
                          </span>
                        </div>
                        {conv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-cool-gray-800 truncate">
                            {conv.name}
                          </h4>
                          <span className="text-xs text-cool-gray-500">
                            {conv.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-cool-gray-600 truncate">
                          {conv.lastMessage}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-cool-gray-500 capitalize">
                            {conv.role}
                          </span>
                          {conv.unread > 0 && (
                            <Badge className="bg-royal-blue-600 text-white text-xs px-2 py-1">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-royal-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-royal-blue-600">
                            {conversations.find(c => c.id === selectedConversation)?.avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-cool-gray-800">
                            {conversations.find(c => c.id === selectedConversation)?.name}
                          </h3>
                          <p className="text-sm text-cool-gray-600">
                            {conversations.find(c => c.id === selectedConversation)?.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn 
                            ? 'bg-royal-blue-600 text-white' 
                            : 'bg-gray-100 text-cool-gray-800'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <div className={`flex items-center gap-1 mt-1 text-xs ${
                            message.isOwn ? 'text-blue-200' : 'text-cool-gray-500'
                          }`}>
                            <span>{message.timestamp}</span>
                            {message.isOwn && message.status && (
                              <div className="flex">
                                {message.status === 'sent' && <Check className="w-3 h-3" />}
                                {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                                {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-200" />}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="w-full p-3 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-royal-blue-500"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                          <Button type="button" variant="ghost" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="sm">
                            <Smile className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button type="submit" variant="premium" size="sm" disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-cool-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-cool-gray-800 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-cool-gray-600">
                      Choose a conversation from the sidebar to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

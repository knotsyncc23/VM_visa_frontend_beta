import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Clock,
  CheckCheck,
  Check,
  User,
  Star,
} from "lucide-react";

export function ClientChat() {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");

  const chats = [
    {
      id: "1",
      clientName: "John Smith",
      lastMessage: "Thank you for the update on my H1-B application!",
      time: "2 min ago",
      unread: 0,
      online: true,
      project: "H1-B Visa Application",
      avatar: "JS",
      rating: 4.8,
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      lastMessage: "When should I schedule my medical examination?",
      time: "1 hour ago",
      unread: 2,
      online: false,
      project: "Student Visa - Australia",
      avatar: "SJ",
      rating: 4.9,
    },
    {
      id: "3",
      clientName: "David Kim",
      lastMessage: "I've uploaded the missing documents",
      time: "3 hours ago",
      unread: 1,
      online: true,
      project: "UK Skilled Worker Visa",
      avatar: "DK",
      rating: 4.7,
    },
    {
      id: "4",
      clientName: "Maria Garcia",
      lastMessage: "Perfect! Everything looks good now.",
      time: "1 day ago",
      unread: 0,
      online: false,
      project: "Family Reunification - Germany",
      avatar: "MG",
      rating: 5.0,
    },
  ];

  const messages = {
    "1": [
      {
        id: "1",
        sender: "client",
        content: "Hi Sarah, I hope you're doing well!",
        time: "10:30 AM",
        status: "read",
      },
      {
        id: "2",
        sender: "agent",
        content:
          "Hello John! I'm doing great, thank you. How can I help you today?",
        time: "10:32 AM",
        status: "read",
      },
      {
        id: "3",
        sender: "client",
        content:
          "I wanted to check on the status of my H1-B application. Have you heard anything from the immigration office?",
        time: "10:35 AM",
        status: "read",
      },
      {
        id: "4",
        sender: "agent",
        content:
          "Great question! I submitted your application last week and received a confirmation. The processing time is typically 3-4 weeks. I'll keep monitoring it and update you as soon as I hear anything.",
        time: "10:37 AM",
        status: "read",
      },
      {
        id: "5",
        sender: "client",
        content: "Thank you for the update on my H1-B application!",
        time: "10:40 AM",
        status: "delivered",
      },
    ],
  };

  const currentChat = chats.find((chat) => chat.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  const sendMessage = () => {
    if (messageInput.trim()) {
      // Message sending logic would go here
      setMessageInput("");
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-white rounded-2xl shadow-sm border border-gray-100 flex">
      {/* Chat List Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Client Messages
          </h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: "#f8fafc" }}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 ${
                selectedChat === chat.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: "#326dee" }}
                  >
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {chat.clientName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {chat.unread > 0 && (
                        <Badge
                          className="bg-red-500 text-white hover:bg-red-500"
                          style={{ minWidth: "20px", height: "20px" }}
                        >
                          {chat.unread}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{chat.project}</p>
                  <p className="text-sm text-gray-700 truncate">
                    {chat.lastMessage}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-500">{chat.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: "#326dee" }}
                  >
                    {currentChat.avatar}
                  </div>
                  {currentChat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {currentChat.clientName}
                  </h3>
                  <p className="text-sm text-gray-600">{currentChat.project}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.sender === "agent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === "agent"
                        ? "text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                    style={{
                      backgroundColor:
                        message.sender === "agent" ? "#326dee" : undefined,
                    }}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div
                      className={`flex items-center justify-between mt-1 text-xs ${
                        message.sender === "agent"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      <span>{message.time}</span>
                      {message.sender === "agent" && (
                        <div className="ml-2">
                          {message.status === "read" ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  style={{ backgroundColor: "#326dee" }}
                  disabled={!messageInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#f0f4ff" }}
              >
                <User className="w-8 h-8" style={{ color: "#326dee" }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600">
                Choose a client from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

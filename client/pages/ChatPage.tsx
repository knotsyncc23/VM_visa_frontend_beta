import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  Bell,
  User,
  Clock,
  CheckCheck,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
}

interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "Sarah Wilson",
      role: "Immigration Agent",
      avatar: "SW",
      lastMessage: "Your documents have been reviewed...",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "VM Visa Support",
      role: "Support Team",
      avatar: "VM",
      lastMessage: "Thank you for contacting us...",
      timestamp: "1 hour ago",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "David Chen",
      role: "Senior Consultant",
      avatar: "DC",
      lastMessage: "Let's schedule a call to discuss...",
      timestamp: "Yesterday",
      unread: 1,
      online: false,
    },
  ];

  const messages: Record<string, ChatMessage[]> = {
    "1": [
      {
        id: "1",
        sender: "Sarah Wilson",
        message: "Hi John! I've reviewed your application documents.",
        timestamp: "10:30 AM",
        isOwn: false,
      },
      {
        id: "2",
        sender: "You",
        message: "Great! How does everything look?",
        timestamp: "10:32 AM",
        isOwn: true,
        status: "read",
      },
      {
        id: "3",
        sender: "Sarah Wilson",
        message:
          "Everything looks good! Just need you to update your work experience section with the latest details.",
        timestamp: "10:35 AM",
        isOwn: false,
      },
      {
        id: "4",
        sender: "You",
        message:
          "Perfect, I'll update that right away. Should I upload the new employment letter as well?",
        timestamp: "10:38 AM",
        isOwn: true,
        status: "delivered",
      },
      {
        id: "5",
        sender: "Sarah Wilson",
        message:
          "Yes, please upload the latest employment letter. That will complete your documentation package.",
        timestamp: "Just now",
        isOwn: false,
      },
    ],
    "2": [
      {
        id: "1",
        sender: "VM Visa Support",
        message: "Hello! How can we help you today?",
        timestamp: "9:00 AM",
        isOwn: false,
      },
    ],
    "3": [
      {
        id: "1",
        sender: "David Chen",
        message: "I'd like to discuss your PR application timeline.",
        timestamp: "Yesterday",
        isOwn: false,
      },
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message to the selected chat (in a real app, this would be handled by state management)
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const selectedContact = contacts.find((c) => c.id === selectedChat);
  const chatMessages = messages[selectedChat] || [];

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: "#FEFEFE" }}
    >
      {/* Back Button */}
      <div className="p-6 pb-0">
        <BackButton />
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex">
        {/* Chat List */}
        <div
          className="w-80 border-r border-gray-200 flex flex-col"
          style={{ backgroundColor: "#F5FAFE" }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold" style={{ color: "#455A64" }}>
                Chat
              </h1>
              <Badge style={{ backgroundColor: "#0288D1", color: "white" }}>
                {contacts.reduce((acc, c) => acc + c.unread, 0)} new
              </Badge>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedChat(contact.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-white transition-colors ${
                  selectedChat === contact.id ? "bg-white border-l-4" : ""
                }`}
                style={{
                  borderLeftColor:
                    selectedChat === contact.id ? "#0288D1" : "transparent",
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: "#0288D1" }}
                    >
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className="font-semibold text-sm"
                        style={{ color: "#455A64" }}
                      >
                        {contact.name}
                      </h3>
                      <span className="text-xs" style={{ color: "#455A64" }}>
                        {contact.timestamp}
                      </span>
                    </div>

                    <p
                      className="text-xs mb-1"
                      style={{ color: "#455A64", opacity: 0.7 }}
                    >
                      {contact.role}
                    </p>

                    <div className="flex items-center justify-between">
                      <p
                        className="text-sm truncate"
                        style={{ color: "#455A64" }}
                      >
                        {contact.lastMessage}
                      </p>
                      {contact.unread > 0 && (
                        <Badge
                          className="ml-2"
                          style={{ backgroundColor: "#0288D1", color: "white" }}
                        >
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedContact ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div
              className="p-4 border-b border-gray-200 flex items-center justify-between"
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: "#0288D1" }}
                  >
                    {selectedContact.avatar}
                  </div>
                  {selectedContact.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold" style={{ color: "#455A64" }}>
                    {selectedContact.name}
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "#455A64", opacity: 0.7 }}
                  >
                    {selectedContact.role} •{" "}
                    {selectedContact.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" style={{ color: "#455A64" }}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" style={{ color: "#455A64" }}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" style={{ color: "#455A64" }}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn ? "rounded-br-none" : "rounded-bl-none"
                    }`}
                    style={{
                      backgroundColor: message.isOwn ? "#0288D1" : "#E0F2E7",
                      color: message.isOwn ? "white" : "#455A64",
                    }}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div
                      className={`flex items-center justify-between mt-1 text-xs ${
                        message.isOwn ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      <span>{message.timestamp}</span>
                      {message.isOwn && message.status && (
                        <CheckCheck
                          className={`h-3 w-3 ml-2 ${
                            message.status === "read"
                              ? "text-blue-200"
                              : "text-blue-300"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div
              className="p-4 border-t border-gray-200"
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" style={{ color: "#455A64" }}>
                  <Paperclip className="h-4 w-4" />
                </Button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm pr-10"
                    style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    style={{ color: "#455A64" }}
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!newMessage.trim()}
                  style={{ backgroundColor: "#0288D1", color: "white" }}
                  className="hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#F5FAFE" }}
              >
                <User className="h-8 w-8" style={{ color: "#455A64" }} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#455A64" }}
              >
                Select a conversation
              </h3>
              <p className="text-sm" style={{ color: "#455A64", opacity: 0.7 }}>
                Choose a contact to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Search,
  Bot,
  Calendar,
  FileText,
  Image,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "file" | "image" | "system";
  status: "sent" | "delivered" | "read";
  isOwn: boolean;
}

interface Chat {
  id: number;
  agentName: string;
  agentAvatar: string;
  project: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  status: "active" | "completed" | "paused";
}

export function MessagingPanel() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  const [showAISummary, setShowAISummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: 1,
      agentName: "Sarah Chen",
      agentAvatar: "👩‍💼",
      project: "Canada PR Application",
      lastMessage: "I've reviewed your documents. Everything looks good!",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 1000),
      unreadCount: 2,
      isOnline: true,
      status: "active",
    },
    {
      id: 2,
      agentName: "James Wilson",
      agentAvatar: "👨‍💼",
      project: "UK Student Visa",
      lastMessage: "When can you schedule the interview prep call?",
      lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: false,
      status: "active",
    },
    {
      id: 3,
      agentName: "Maria Rodriguez",
      agentAvatar: "👩‍⚖️",
      project: "US Investment Visa",
      lastMessage: "Application submitted successfully! 🎉",
      lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: true,
      status: "completed",
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      senderId: "agent",
      senderName: "Sarah Chen",
      content:
        "Hi John! I've started reviewing your Canada PR application. Your Express Entry profile looks strong with your CRS score.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "text",
      status: "read",
      isOwn: false,
    },
    {
      id: 2,
      senderId: "client",
      senderName: "You",
      content:
        "Thank you! I'm excited to move forward. Do you need any additional documents from me?",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      type: "text",
      status: "read",
      isOwn: true,
    },
    {
      id: 3,
      senderId: "agent",
      senderName: "Sarah Chen",
      content:
        "I'll need your updated employment letter and the language test results. Can you upload them to the documents section?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: "text",
      status: "read",
      isOwn: false,
    },
    {
      id: 4,
      senderId: "client",
      senderName: "You",
      content: "Just uploaded both documents!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: "text",
      status: "delivered",
      isOwn: true,
    },
    {
      id: 5,
      senderId: "agent",
      senderName: "Sarah Chen",
      content:
        "Perfect! I've reviewed everything and your application is ready for submission. I'll send it today.",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: "text",
      status: "delivered",
      isOwn: false,
    },
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    // Simulate sending message
    console.log("Sending message:", messageText);
    setMessageText("");

    // Auto-reply simulation
    setTimeout(() => {
      console.log("Agent typing...");
    }, 1000);
  };

  const selectedChatData = chats.find((chat) => chat.id === selectedChat);

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Chat List */}
      <div className="w-1/3 glass-card rounded-l-3xl border-r border-white/20">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold text-cool-gray-800">
              Messages
            </h2>
            <Badge className="bg-royal-blue-100 text-royal-blue-700">
              {chats.reduce((acc, chat) => acc + chat.unreadCount, 0)} new
            </Badge>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray-500" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto h-full">
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              onClick={() => setSelectedChat(chat.id)}
              className={cn(
                "p-4 cursor-pointer border-b border-white/5 transition-colors",
                selectedChat === chat.id && "bg-white/20",
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center text-lg">
                    {chat.agentAvatar}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sage-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-cool-gray-800 truncate">
                      {chat.agentName}
                    </h3>
                    <span className="text-xs text-cool-gray-500">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>

                  <p className="text-sm text-cool-gray-600 mb-1">
                    {chat.project}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-cool-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge className="bg-royal-blue-500 text-white text-xs">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>

                  <Badge
                    className={cn(
                      "text-xs mt-2",
                      chat.status === "active"
                        ? "bg-sage-green-100 text-sage-green-700"
                        : chat.status === "completed"
                          ? "bg-gold-100 text-gold-700"
                          : "bg-cool-gray-100 text-cool-gray-700",
                    )}
                  >
                    {chat.status}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass-card rounded-r-3xl">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center text-lg">
                      {selectedChatData.agentAvatar}
                    </div>
                    {selectedChatData.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sage-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-cool-gray-800">
                      {selectedChatData.agentName}
                    </h3>
                    <p className="text-sm text-cool-gray-600">
                      {selectedChatData.project}
                    </p>
                    <p className="text-xs text-sage-green-600">
                      {selectedChatData.isOnline
                        ? "Online"
                        : "Last seen 2h ago"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAISummary(true)}
                  >
                    <Bot className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      message.isOwn ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl p-4",
                        message.isOwn
                          ? "bg-gradient-royal text-white rounded-br-md"
                          : "bg-white/40 text-cool-gray-800 rounded-bl-md",
                      )}
                    >
                      <p className="leading-relaxed">{message.content}</p>

                      <div
                        className={cn(
                          "flex items-center justify-between mt-2 text-xs",
                          message.isOwn
                            ? "text-sky-blue-200"
                            : "text-cool-gray-500",
                        )}
                      >
                        <span>{formatMessageTime(message.timestamp)}</span>
                        {message.isOwn && (
                          <div className="flex items-center space-x-1">
                            {message.status === "sent" && (
                              <Check className="w-3 h-3" />
                            )}
                            {message.status === "delivered" && (
                              <CheckCheck className="w-3 h-3" />
                            )}
                            {message.status === "read" && (
                              <CheckCheck className="w-3 h-3 text-sage-green-300" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>

                <div className="flex-1 relative">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="pr-12"
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
                  variant="premium"
                  size="sm"
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-cool-gray-500">
                <span>Press Enter to send</span>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Bot className="w-3 h-3 mr-1" />
                    AI Summary
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    Templates
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-cool-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-2">
                Select a conversation
              </h3>
              <p className="text-cool-gray-600">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>

      {/* AI Summary Modal */}
      <AnimatePresence>
        {showAISummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAISummary(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 rounded-3xl max-w-2xl w-full mx-4"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Bot className="w-6 h-6 text-royal-blue-600" />
                <h3 className="text-xl font-heading font-bold text-cool-gray-800">
                  AI Chat Summary
                </h3>
              </div>

              <div className="space-y-4 text-cool-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Conversation Overview</h4>
                  <p className="text-sm leading-relaxed">
                    You're working with Sarah Chen on your Canada PR application
                    through Express Entry. The conversation started 2 hours ago
                    and is progressing well.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Progress Points</h4>
                  <ul className="text-sm space-y-1">
                    <li>• CRS score reviewed and approved</li>
                    <li>
                      • Employment letter and language test results uploaded
                    </li>
                    <li>• Application ready for submission</li>
                    <li>• Agent will submit application today</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Next Steps</h4>
                  <p className="text-sm leading-relaxed">
                    Wait for application submission confirmation from Sarah. You
                    should receive updates within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  variant="premium"
                  onClick={() => setShowAISummary(false)}
                >
                  Close Summary
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

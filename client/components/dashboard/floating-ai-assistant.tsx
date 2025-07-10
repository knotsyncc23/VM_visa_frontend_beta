import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  X,
  Send,
  Sparkles,
  FileText,
  Globe,
  MessageCircle,
  MinusCircle,
  MaximizeIcon,
  Minimize2,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi! I'm your AI immigration assistant. I can help you with visa recommendations, document preparation, and answer any immigration questions. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    {
      text: "Suggest visa types for me",
      icon: Globe,
    },
    {
      text: "Help me write a cover letter",
      icon: FileText,
    },
    {
      text: "What documents do I need?",
      icon: HelpCircle,
    },
    {
      text: "Review my application",
      icon: Sparkles,
    },
  ];

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now() + 1,
        text: generateAIResponse(textToSend),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("visa") && lowerMessage.includes("suggest")) {
      return `Based on your profile, here are some visa options that might work for you:

🇨🇦 **Canada Express Entry** - For skilled workers (recommended)
🇺🇸 **H1-B Visa** - For specialty occupations
🇬🇧 **Skilled Worker Visa** - UK's points-based system
🇦🇺 **General Skilled Migration** - Australia's skilled visa

Would you like me to analyze your specific situation for personalized recommendations?`;
    }

    if (
      lowerMessage.includes("cover letter") ||
      lowerMessage.includes("write")
    ) {
      return `I'd be happy to help you write a compelling cover letter! Here's what I need:

📝 **Basic Information:**
• Your educational background
• Work experience (years & field)
• Target country and visa type
• Specific program/position applying for

💡 **Pro tip:** A great cover letter should be:
• Clear and concise (1-2 pages)
• Specific to your situation
• Professional yet personal

Share your details and I'll draft a personalized cover letter for you!`;
    }

    if (lowerMessage.includes("document")) {
      return `Here's a comprehensive document checklist for most visa applications:

📋 **Essential Documents:**
✅ Valid passport (6+ months validity)
✅ Educational certificates & transcripts
✅ Language test results (IELTS/TOEFL)
✅ Work experience letters
✅ Bank statements & financial proof
✅ Medical examination results
✅ Police clearance certificates

📄 **Additional Documents (if applicable):**
• Marriage certificate
• Birth certificates for dependents
• Sponsorship documents
• Job offer letter

Which visa type are you applying for? I can provide a specific checklist!`;
    }

    if (
      lowerMessage.includes("review") ||
      lowerMessage.includes("application")
    ) {
      return `I'd be happy to review your application! I can help with:

🔍 **Document Review:**
• Check for completeness
• Verify formatting requirements
• Suggest improvements

✍️ **Content Analysis:**
• Review your personal statement
• Optimize your CV/resume
• Improve cover letters

📊 **Application Strategy:**
• Timeline optimization
• Success probability assessment
• Alternative pathway suggestions

Upload your documents or share details about your application, and I'll provide detailed feedback!`;
    }

    return `Thank you for your question! I'm here to help with all aspects of immigration:

🌟 **What I can help with:**
• Visa type recommendations
• Document preparation guidance
• Application timeline planning
• Country-specific requirements
• Cover letter and SOP writing
• Application review and feedback

💬 **Just ask me about:**
• "What visa should I apply for?"
• "Help me write a cover letter"
• "What documents do I need?"
• "Review my application"

How would you like me to assist you today?`;
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-royal rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center z-50 group"
        >
          <Bot className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-sage rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.button>
      )}

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              width: isMinimized ? "320px" : "480px",
              height: isMinimized ? "60px" : "600px",
            }}
            exit={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-6 right-6 glass-card border border-white/30 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20 bg-gradient-royal">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  {!isMinimized && (
                    <div>
                      <h3 className="font-semibold text-white">AI Assistant</h3>
                      <p className="text-xs text-sky-blue-200">
                        Powered by GPT-4 ✨
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    {isMinimized ? (
                      <MaximizeIcon className="w-4 h-4" />
                    ) : (
                      <Minimize2 className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content - only show when not minimized */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        message.isUser ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl p-3 text-sm",
                          message.isUser
                            ? "bg-gradient-royal text-white rounded-br-md"
                            : "bg-white/60 text-cool-gray-800 rounded-bl-md",
                        )}
                      >
                        <div className="whitespace-pre-line">
                          {message.text}
                        </div>
                        <div
                          className={cn(
                            "text-xs mt-1",
                            message.isUser
                              ? "text-sky-blue-200"
                              : "text-cool-gray-500",
                          )}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/60 rounded-2xl rounded-bl-md p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cool-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-cool-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-cool-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t border-white/20">
                    <p className="text-xs text-cool-gray-600 mb-3">
                      Quick actions:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => sendMessage(action.text)}
                          className="p-3 bg-white/60 hover:bg-white/80 rounded-xl text-left transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-2">
                            <action.icon className="w-4 h-4 text-royal-blue-600" />
                            <span className="text-xs font-medium text-cool-gray-700 group-hover:text-royal-blue-700">
                              {action.text}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex space-x-3">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask me anything about immigration..."
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 text-sm"
                      disabled={isTyping}
                    />
                    <Button
                      variant="premium"
                      size="sm"
                      onClick={() => sendMessage()}
                      disabled={!inputText.trim() || isTyping}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

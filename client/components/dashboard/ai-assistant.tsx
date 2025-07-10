import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  Globe,
  MessageCircle,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Lightbulb,
} from "lucide-react";

export function AIAssistant() {
  const [currentChat, setCurrentChat] = useState<string[]>([
    "Hello! I'm your AI immigration assistant. How can I help you today?",
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    {
      title: "Suggest Visa Types",
      description: "Get personalized visa recommendations",
      icon: Target,
      action: () =>
        sendQuickMessage("What visa types would be suitable for me?"),
    },
    {
      title: "Write SOP",
      description: "Generate Statement of Purpose",
      icon: FileText,
      action: () => sendQuickMessage("Help me write a Statement of Purpose"),
    },
    {
      title: "Review Documents",
      description: "Check document requirements",
      icon: CheckCircle,
      action: () =>
        sendQuickMessage("What documents do I need for my application?"),
    },
    {
      title: "Country Guide",
      description: "Immigration country information",
      icon: Globe,
      action: () => sendQuickMessage("Tell me about immigration to Canada"),
    },
  ];

  const aiResponses = {
    "what visa types would be suitable for me?": `Based on typical client profiles, here are some visa types that might suit you:

**Work Visas:**
• Express Entry (Canada) - For skilled workers
• H1-B Visa (USA) - For specialized occupations
• Skilled Worker Visa (UK) - Points-based system

**Study Visas:**
• Student Visa (Canada/UK/Australia) - For educational purposes

**Investment Visas:**
• Investor Visa programs for business owners

Would you like me to ask some questions to give you more personalized recommendations?`,

    "help me write a statement of purpose": `I'd be happy to help you craft a compelling Statement of Purpose! Here's a structure I recommend:

**Paragraph 1:** Introduction & Academic Background
- Your current education/degree
- Academic achievements and GPA

**Paragraph 2:** Professional Experience
- Relevant work experience
- Skills and accomplishments

**Paragraph 3:** Why This Program/Country
- Specific reasons for choosing the program
- How it aligns with your career goals

**Paragraph 4:** Future Plans
- Career objectives after graduation
- How you'll contribute to your home country

**Paragraph 5:** Conclusion
- Summarize your commitment and readiness

Would you like me to help you write any specific section?`,

    "what documents do i need for my application?": `Here's a general document checklist for most visa applications:

**Personal Documents:**
✓ Valid Passport (6+ months validity)
✓ Passport-sized photographs
✓ Birth certificate
✓ Marriage certificate (if applicable)

**Educational Documents:**
✓ Degree certificates and transcripts
✓ Educational credential assessment (ECA)
�� Language test results (IELTS/TOEFL)

**Financial Documents:**
✓ Bank statements (6 months)
✓ Income tax returns
✓ Employment letter and pay slips
✓ Financial sponsorship documents

**Additional Documents:**
✓ Medical examination results
✓ Police clearance certificates
✓ Statement of Purpose/Cover letter

The specific requirements vary by country and visa type. Which visa are you applying for?`,

    "tell me about immigration to canada": `Canada offers excellent immigration opportunities! Here's an overview:

**Popular Immigration Programs:**
• **Express Entry** - Federal skilled worker program
• **Provincial Nominee Program (PNP)** - Province-specific
• **Canadian Experience Class** - For workers with Canadian experience
• **Family Sponsorship** - For family reunification

**Key Benefits:**
• Universal healthcare system
• High quality of life
• Multicultural society
• Strong economy and job market
• Pathway to citizenship (3 years)

**Requirements Typically Include:**
• Language proficiency (English/French)
• Education credentials assessment
• Work experience
• Financial proof
• Medical and security clearances

**Processing Times:**
• Express Entry: 6-8 months
• PNP: 12-18 months
• Family Sponsorship: 8-12 months

Would you like specific information about any program?`,
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setCurrentChat((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseKey = userMessage.toLowerCase();
      const response =
        aiResponses[responseKey] ||
        `Thank you for your question about "${userMessage}". This is a complex immigration topic that I'd recommend discussing with one of our certified agents for personalized advice. 

Meanwhile, I can help you with:
• Visa type recommendations
• Document checklists
• Application timelines
• Country-specific information

Would you like help with any of these topics?`;

      setCurrentChat((prev) => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const sendQuickMessage = (message: string) => {
    setInputMessage(message);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="max-w-6xl grid lg:grid-cols-3 gap-8">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl h-[600px] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-royal rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-cool-gray-800">
                  AI Immigration Assistant
                </h2>
                <div className="flex items-center space-x-2 text-sm text-cool-gray-600">
                  <div className="w-2 h-2 bg-sage-green-500 rounded-full"></div>
                  <span>Online • Powered by GPT-4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentChat.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    index % 2 === 0
                      ? "bg-white/40 text-cool-gray-800 rounded-bl-md"
                      : "bg-gradient-royal text-white rounded-br-md"
                  }`}
                >
                  <div className="whitespace-pre-line">{message}</div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/40 rounded-2xl rounded-bl-md p-4">
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

          {/* Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about immigration..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button
                variant="premium"
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-6 rounded-3xl"
        >
          <h3 className="text-lg font-heading font-bold text-cool-gray-800 mb-4">
            Quick Actions
          </h3>

          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className="w-full p-4 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/20 transition-all duration-200 group text-left"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-sage rounded-xl flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-cool-gray-800 group-hover:text-royal-blue-700">
                      {action.title}
                    </h4>
                    <p className="text-sm text-cool-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card p-6 rounded-3xl"
        >
          <h3 className="text-lg font-heading font-bold text-cool-gray-800 mb-4">
            AI Capabilities
          </h3>

          <div className="space-y-4">
            {[
              {
                icon: Sparkles,
                title: "Smart Suggestions",
                desc: "Personalized visa recommendations",
              },
              {
                icon: FileText,
                title: "Document Generation",
                desc: "Auto-create SOPs and letters",
              },
              {
                icon: BookOpen,
                title: "Immigration Guide",
                desc: "Comprehensive country information",
              },
              {
                icon: MessageCircle,
                title: "24/7 Support",
                desc: "Instant answers to your questions",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-royal rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-cool-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-cool-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upgrade Notice */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-card p-6 rounded-3xl bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200"
        >
          <div className="text-center">
            <Star className="w-8 h-8 text-gold-600 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-gold-800 mb-2">
              Premium AI Features
            </h3>
            <p className="text-sm text-gold-700 mb-4">
              Unlock advanced AI capabilities with priority support
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Upgrade Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

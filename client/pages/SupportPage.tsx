import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Search,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  Video,
  Download,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileText,
  Users,
  Globe,
  Star,
  ThumbsUp,
  Send,
  Plus,
  Filter,
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  tags: string[];
}

interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "high" | "medium" | "low";
  created: string;
  lastUpdate: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "video" | "document" | "form";
  category: string;
  downloadUrl?: string;
  readTime?: string;
}

const SupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "faq" | "contact" | "tickets" | "resources"
  >("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How long does the visa application process take?",
      answer:
        "Processing times vary depending on the type of visa and your country of origin. Work permits typically take 4-6 weeks, while permanent residence applications can take 6-12 months. We'll provide you with estimated timelines specific to your application.",
      category: "processing",
      helpful: 45,
      tags: ["processing time", "visa", "timeline"],
    },
    {
      id: "2",
      question: "What documents do I need for my application?",
      answer:
        "Required documents vary by visa type but commonly include: passport, photographs, language test results, educational credentials, work experience letters, and proof of funds. Your assigned agent will provide a complete checklist specific to your situation.",
      category: "documents",
      helpful: 38,
      tags: ["documents", "requirements", "checklist"],
    },
    {
      id: "3",
      question: "Can I track my application status?",
      answer:
        "Yes! You can track your application status in real-time through your dashboard. We also send email notifications for important updates. You'll receive notifications for document requests, interview schedules, and decision updates.",
      category: "tracking",
      helpful: 52,
      tags: ["tracking", "status", "updates"],
    },
    {
      id: "4",
      question: "What if my application is rejected?",
      answer:
        "If your application is rejected, we'll help you understand the reasons and explore your options. This may include reapplying with additional documentation, appealing the decision, or exploring alternative immigration pathways.",
      category: "rejection",
      helpful: 29,
      tags: ["rejection", "appeal", "options"],
    },
    {
      id: "5",
      question: "How much do your services cost?",
      answer:
        "Our fees vary based on the complexity of your case and the services required. We offer transparent pricing with no hidden fees. Contact us for a personalized quote based on your specific immigration needs.",
      category: "pricing",
      helpful: 33,
      tags: ["pricing", "fees", "cost"],
    },
  ];

  const tickets: SupportTicket[] = [
    {
      id: "T001",
      subject: "Document upload issue",
      status: "open",
      priority: "medium",
      created: "2024-03-10",
      lastUpdate: "2024-03-12",
    },
    {
      id: "T002",
      subject: "Application status inquiry",
      status: "resolved",
      priority: "low",
      created: "2024-03-08",
      lastUpdate: "2024-03-09",
    },
    {
      id: "T003",
      subject: "Payment processing error",
      status: "pending",
      priority: "high",
      created: "2024-03-11",
      lastUpdate: "2024-03-11",
    },
  ];

  const resources: Resource[] = [
    {
      id: "1",
      title: "Complete Guide to Work Permits",
      description: "Step-by-step guide to applying for a work permit in Canada",
      type: "guide",
      category: "work-permits",
      readTime: "15 min read",
    },
    {
      id: "2",
      title: "Document Checklist Template",
      description: "Comprehensive checklist for all required documents",
      type: "document",
      category: "documents",
      downloadUrl: "/documents/checklist.pdf",
    },
    {
      id: "3",
      title: "Immigration Process Overview",
      description: "Video walkthrough of the immigration process",
      type: "video",
      category: "general",
      readTime: "12 min watch",
    },
    {
      id: "4",
      title: "IMM 1294 Application Form",
      description: "Official application form for work permits",
      type: "form",
      category: "forms",
      downloadUrl: "/forms/imm1294.pdf",
    },
  ];

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "processing", label: "Processing Times" },
    { id: "documents", label: "Documents" },
    { id: "tracking", label: "Application Tracking" },
    { id: "rejection", label: "Rejections & Appeals" },
    { id: "pricing", label: "Pricing & Fees" },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "#0288D1";
      case "pending":
        return "#FF9800";
      case "resolved":
        return "#4CAF50";
      case "closed":
        return "#757575";
      default:
        return "#0288D1";
    }
  };

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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "guide":
        return BookOpen;
      case "video":
        return Video;
      case "document":
        return FileText;
      case "form":
        return FileText;
      default:
        return FileText;
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
          <h1 className="text-2xl font-bold" style={{ color: "#455A64" }}>
            Support & Help
          </h1>
          <Badge style={{ backgroundColor: "#0288D1", color: "white" }}>
            24/7 Available
          </Badge>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border border-gray-300 rounded-lg p-1">
          {[
            { id: "faq", label: "FAQ", icon: HelpCircle },
            { id: "contact", label: "Contact Us", icon: MessageCircle },
            { id: "tickets", label: "My Tickets", icon: FileText },
            { id: "resources", label: "Resources", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                variant="ghost"
                className={`flex-1 ${
                  activeTab === tab.id ? "bg-white shadow-sm" : ""
                }`}
                style={{
                  backgroundColor:
                    activeTab === tab.id ? "#E0F2E7" : "transparent",
                  color: "#455A64",
                }}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="p-6">
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search FAQs..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
                    style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200"
                  style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-gray-200"
                  style={{ backgroundColor: "#F5FAFE" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: "#455A64" }}
                    >
                      {faq.question}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <ThumbsUp
                        className="h-4 w-4"
                        style={{ color: "#4CAF50" }}
                      />
                      <span className="text-sm" style={{ color: "#455A64" }}>
                        {faq.helpful}
                      </span>
                    </div>
                  </div>

                  <p
                    className="mb-4"
                    style={{ color: "#455A64", opacity: 0.8 }}
                  >
                    {faq.answer}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {faq.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: "#F3E5F5",
                            color: "#455A64",
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300"
                      style={{ color: "#455A64" }}
                    >
                      Was this helpful?
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: MessageCircle,
                  title: "Live Chat",
                  description: "Chat with our support team",
                  availability: "Available 24/7",
                  action: "Start Chat",
                },
                {
                  icon: Phone,
                  title: "Phone Support",
                  description: "+1 (555) 123-4567",
                  availability: "Mon-Fri 9AM-6PM EST",
                  action: "Call Now",
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  description: "support@vmvisa.com",
                  availability: "Response within 24 hours",
                  action: "Send Email",
                },
                {
                  icon: Video,
                  title: "Video Consultation",
                  description: "Schedule a video call",
                  availability: "By appointment",
                  action: "Book Call",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp",
                  description: "+1 (555) 987-6543",
                  availability: "Mon-Fri 9AM-6PM EST",
                  action: "Message Us",
                },
                {
                  icon: Globe,
                  title: "Help Center",
                  description: "Browse our knowledge base",
                  availability: "Available 24/7",
                  action: "Visit Center",
                },
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-lg border border-gray-200 text-center hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: "#F5FAFE" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: "#0288D1" }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: "#455A64" }}
                    >
                      {contact.title}
                    </h3>
                    <p
                      className="text-sm mb-2"
                      style={{ color: "#455A64", opacity: 0.8 }}
                    >
                      {contact.description}
                    </p>
                    <p
                      className="text-xs mb-4"
                      style={{ color: "#455A64", opacity: 0.6 }}
                    >
                      {contact.availability}
                    </p>
                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#0288D1", color: "white" }}
                    >
                      {contact.action}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Contact Form */}
            <div
              className="max-w-2xl mx-auto p-6 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#455A64" }}
              >
                Quick Contact Form
              </h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-2 rounded-lg border border-gray-200"
                    style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="px-4 py-2 rounded-lg border border-gray-200"
                    style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                  />
                </div>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-200"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                >
                  <option>Select Topic</option>
                  <option>Application Status</option>
                  <option>Document Questions</option>
                  <option>Technical Support</option>
                  <option>Billing Inquiry</option>
                  <option>Other</option>
                </select>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                />
                <Button
                  className="w-full"
                  style={{ backgroundColor: "#0288D1", color: "white" }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-semibold"
                style={{ color: "#455A64" }}
              >
                Support Tickets
              </h2>
              <Button style={{ backgroundColor: "#0288D1", color: "white" }}>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  style={{ backgroundColor: "#F5FAFE" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3
                        className="font-semibold"
                        style={{ color: "#455A64" }}
                      >
                        {ticket.subject}
                      </h3>
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor: getStatusColor(ticket.status),
                          color: "white",
                        }}
                      >
                        {ticket.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: getPriorityColor(ticket.priority),
                          color: "white",
                        }}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <ChevronRight
                      className="h-5 w-5"
                      style={{ color: "#455A64" }}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span
                        className="font-medium"
                        style={{ color: "#455A64" }}
                      >
                        Ticket ID:
                      </span>{" "}
                      {ticket.id}
                    </div>
                    <div>
                      <span
                        className="font-medium"
                        style={{ color: "#455A64" }}
                      >
                        Created:
                      </span>{" "}
                      {new Date(ticket.created).toLocaleDateString()}
                    </div>
                    <div>
                      <span
                        className="font-medium"
                        style={{ color: "#455A64" }}
                      >
                        Last Update:
                      </span>{" "}
                      {new Date(ticket.lastUpdate).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => {
                const Icon = getResourceIcon(resource.type);
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: "#F5FAFE" }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="h-8 w-8" style={{ color: "#0288D1" }} />
                      <div>
                        <h3
                          className="font-semibold"
                          style={{ color: "#455A64" }}
                        >
                          {resource.title}
                        </h3>
                        {resource.readTime && (
                          <p
                            className="text-xs"
                            style={{ color: "#455A64", opacity: 0.7 }}
                          >
                            {resource.readTime}
                          </p>
                        )}
                      </div>
                    </div>

                    <p
                      className="text-sm mb-4"
                      style={{ color: "#455A64", opacity: 0.8 }}
                    >
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: "#F3E5F5",
                          color: "#455A64",
                        }}
                      >
                        {resource.type}
                      </Badge>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300"
                        style={{ color: "#455A64" }}
                      >
                        {resource.downloadUrl ? (
                          <>
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;

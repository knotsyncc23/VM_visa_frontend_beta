import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Calculator,
  Globe,
  FileText,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Star,
  Bookmark,
  Search,
  Filter,
  Book,
  Video,
  Download,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
} from "lucide-react";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Tools", count: 24 },
    { id: "calculators", label: "Calculators", count: 8 },
    { id: "resources", label: "Resources", count: 6 },
    { id: "templates", label: "Templates", count: 5 },
    { id: "contacts", label: "Contacts", count: 5 },
  ];

  const tools = [
    {
      id: "1",
      title: "CRS Score Calculator",
      description:
        "Calculate Comprehensive Ranking System score for Express Entry candidates",
      category: "calculators",
      type: "Calculator",
      featured: true,
      rating: 4.9,
      uses: "2.3k uses",
      icon: Calculator,
      color: "bg-blue-100 text-blue-600",
      url: "#",
    },
    {
      id: "2",
      title: "Processing Time Tracker",
      description:
        "Track current processing times for different visa applications",
      category: "resources",
      type: "Tracker",
      featured: false,
      rating: 4.7,
      uses: "1.8k uses",
      icon: Clock,
      color: "bg-green-100 text-green-600",
      url: "#",
    },
    {
      id: "3",
      title: "Embassy Contact Directory",
      description:
        "Complete directory of embassy and consulate contact information",
      category: "contacts",
      type: "Directory",
      featured: true,
      rating: 4.8,
      uses: "3.1k uses",
      icon: Phone,
      color: "bg-purple-100 text-purple-600",
      url: "#",
    },
    {
      id: "4",
      title: "Visa Application Template",
      description: "Professional templates for various visa applications",
      category: "templates",
      type: "Template",
      featured: false,
      rating: 4.6,
      uses: "987 uses",
      icon: FileText,
      color: "bg-orange-100 text-orange-600",
      url: "#",
    },
    {
      id: "5",
      title: "Country Requirements Guide",
      description: "Comprehensive guide to immigration requirements by country",
      category: "resources",
      type: "Guide",
      featured: true,
      rating: 4.9,
      uses: "4.2k uses",
      icon: Globe,
      color: "bg-indigo-100 text-indigo-600",
      url: "#",
    },
    {
      id: "6",
      title: "Document Checklist Generator",
      description: "Generate customized document checklists for clients",
      category: "templates",
      type: "Generator",
      featured: false,
      rating: 4.5,
      uses: "1.5k uses",
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-600",
      url: "#",
    },
  ];

  const quickLinks = [
    {
      title: "IRCC Website",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
      description: "Official Immigration, Refugees and Citizenship Canada",
    },
    {
      title: "Express Entry",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html",
      description: "Express Entry immigration system",
    },
    {
      title: "Provincial Nominee Programs",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html",
      description: "PNP information and requirements",
    },
    {
      title: "Study Permits",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
      description: "Study permit applications and requirements",
    },
  ];

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  const searchedTools = filteredTools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton dashboardType="agent" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tools & Resources
              </h1>
              <p className="text-gray-600">
                Essential tools and resources for immigration consultants
              </p>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Bookmark className="w-4 h-4 mr-2" />
            My Bookmarks
          </Button>
        </div>

        {/* Search and Categories */}
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={
                  activeCategory === category.id
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Tools */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Featured Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchedTools
              .filter((tool) => tool.featured)
              .map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.color}`}
                      >
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{tool.uses}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span>{tool.rating}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Use Tool
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Tools */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">All Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchedTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${tool.color}`}
                  >
                    <tool.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">
                        {tool.title}
                      </h3>
                      {tool.featured && (
                        <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{tool.uses}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span>{tool.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Use Tool
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 block"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Need help finding the right tool?
              </h3>
              <p className="text-gray-600 mb-4">
                Our support team can help you find the perfect tools for your
                specific immigration consulting needs.
              </p>
              <Button variant="outline" className="border-blue-300">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

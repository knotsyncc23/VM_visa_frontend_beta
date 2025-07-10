import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  DollarSign,
  Star,
  Users,
  Calendar,
  Filter,
  Search,
  Eye,
  MessageCircle,
  CheckCircle,
  X,
  FileText,
  Globe,
  Briefcase,
  GraduationCap,
  Plane,
  Home,
  ChevronDown,
  User,
} from "lucide-react";

export function IncomingRequests() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const visaTypes = [
    { id: "all", label: "All Types", icon: Globe },
    { id: "work", label: "Work Visa", icon: Briefcase },
    { id: "study", label: "Study Visa", icon: GraduationCap },
    { id: "visitor", label: "Visitor Visa", icon: Plane },
    { id: "pr", label: "Permanent Residency", icon: Home },
  ];

  const requests = [
    {
      id: "1",
      clientName: "John Smith",
      visaType: "work",
      country: "Canada",
      budget: "$2,500",
      urgency: "High",
      timeline: "3 weeks",
      description:
        "Need assistance with H1-B visa application for tech position at Microsoft Canada. Looking for experienced agent with proven track record.",
      requirements: [
        "Work experience verification",
        "Educational credential assessment",
        "Medical examination coordination",
        "Document translation services",
      ],
      clientRating: 4.8,
      clientReviews: 12,
      postedTime: "2 hours ago",
      location: "Toronto, ON",
      previousApplications: 0,
      complexity: "Medium",
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      visaType: "study",
      country: "Australia",
      budget: "$1,800",
      urgency: "Medium",
      timeline: "6 weeks",
      description:
        "Applying for student visa for Master's program at University of Melbourne. Need comprehensive guidance through the application process.",
      requirements: [
        "University application support",
        "Financial documentation",
        "English proficiency guidance",
        "Health insurance arrangement",
      ],
      clientRating: 4.9,
      clientReviews: 8,
      postedTime: "4 hours ago",
      location: "Melbourne, VIC",
      previousApplications: 1,
      complexity: "Low",
    },
    {
      id: "3",
      clientName: "Michael Chen",
      visaType: "pr",
      country: "New Zealand",
      budget: "$4,200",
      urgency: "Low",
      timeline: "12 weeks",
      description:
        "Seeking permanent residency through skilled migrant category. Have 8+ years experience in software engineering.",
      requirements: [
        "Points calculation and strategy",
        "Expression of Interest preparation",
        "Skills assessment coordination",
        "Police clearance assistance",
      ],
      clientRating: 5.0,
      clientReviews: 25,
      postedTime: "1 day ago",
      location: "Auckland",
      previousApplications: 2,
      complexity: "High",
    },
    {
      id: "4",
      clientName: "Emma Rodriguez",
      visaType: "visitor",
      country: "United States",
      budget: "$800",
      urgency: "High",
      timeline: "2 weeks",
      description:
        "Tourist visa application for family vacation. Previous visa was denied, need expert help to reapply successfully.",
      requirements: [
        "Application review and improvement",
        "Supporting documentation",
        "Interview preparation",
        "Travel itinerary planning",
      ],
      clientRating: 4.6,
      clientReviews: 5,
      postedTime: "6 hours ago",
      location: "Los Angeles, CA",
      previousApplications: 1,
      complexity: "Medium",
    },
    {
      id: "5",
      clientName: "David Kim",
      visaType: "work",
      country: "United Kingdom",
      budget: "$3,100",
      urgency: "Medium",
      timeline: "5 weeks",
      description:
        "Skilled Worker visa application for financial analyst position at London investment firm. Need help with sponsorship process.",
      requirements: [
        "Sponsorship license verification",
        "Certificate of sponsorship",
        "English language requirements",
        "Maintenance funds documentation",
      ],
      clientRating: 4.7,
      clientReviews: 15,
      postedTime: "8 hours ago",
      location: "London",
      previousApplications: 0,
      complexity: "Medium",
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesType = filterType === "all" || request.visaType === filterType;
    const matchesSearch =
      searchTerm === "" ||
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getVisaTypeIcon = (type: string) => {
    const visaType = visaTypes.find((v) => v.id === type);
    return visaType ? visaType.icon : Globe;
  };

  const getVisaTypeLabel = (type: string) => {
    const visaType = visaTypes.find((v) => v.id === type);
    return visaType ? visaType.label : "Unknown";
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "High":
        return "bg-purple-100 text-purple-700";
      case "Medium":
        return "bg-blue-100 text-blue-700";
      case "Low":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Incoming Requests
            </h2>
            <p className="text-gray-600">
              {filteredRequests.length} new opportunities available
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            {requests.filter((r) => r.urgency === "High").length} Urgent
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by client, country, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border-gray-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              {getVisaTypeLabel(filterType)}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-48"
                >
                  {visaTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setFilterType(type.id);
                        setShowFilters(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                    >
                      <type.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{type.label}</span>
                      {filterType === type.id && (
                        <CheckCircle className="w-4 h-4 text-blue-500 ml-auto" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-6">
        {filteredRequests.map((request, index) => {
          const VisaIcon = getVisaTypeIcon(request.visaType);
          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "#f0f4ff" }}
                      >
                        <VisaIcon
                          className="w-6 h-6"
                          style={{ color: "#326dee" }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getVisaTypeLabel(request.visaType)} -{" "}
                          {request.country}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {request.clientName}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {request.clientRating} ({request.clientReviews})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency} Priority
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {request.postedTime}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 line-clamp-2">
                    {request.description}
                  </p>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Client Requirements:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {request.requirements.slice(0, 4).map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getComplexityColor(request.complexity)}>
                      {request.complexity} Complexity
                    </Badge>
                    {request.previousApplications > 0 && (
                      <Badge className="bg-orange-100 text-orange-700">
                        {request.previousApplications} Previous Apps
                      </Badge>
                    )}
                    <Badge className="bg-gray-100 text-gray-700">
                      <MapPin className="w-3 h-3 mr-1" />
                      {request.location}
                    </Badge>
                  </div>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-4">
                  {/* Budget & Timeline */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Budget</span>
                        <span className="font-semibold text-gray-900">
                          {request.budget}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Timeline</span>
                        <span className="font-semibold text-gray-900">
                          {request.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#326dee" }}
                      onClick={() => setSelectedRequest(request.id)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Send Proposal
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Response Rate</span>
                      <span className="font-medium">
                        {Math.floor(Math.random() * 30 + 60)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Avg. Response Time</span>
                      <span className="font-medium">
                        {Math.floor(Math.random() * 12 + 1)}h
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
        >
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#f0f4ff" }}
          >
            <Search className="w-8 h-8" style={{ color: "#326dee" }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No requests found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or check back later for new
            opportunities.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setFilterType("all");
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Proposal Modal Placeholder */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Send Proposal
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRequest(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposal Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a compelling title for your proposal"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Approach
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your approach and why you're the best fit for this project"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rate
                    </label>
                    <input
                      type="text"
                      placeholder="$0.00"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Timeline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 4 weeks"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    className="flex-1"
                    style={{ backgroundColor: "#326dee" }}
                  >
                    Send Proposal
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedRequest(null)}
                  >
                    Save Draft
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

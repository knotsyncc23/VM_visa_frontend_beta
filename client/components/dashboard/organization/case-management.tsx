import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Briefcase,
  FileText,
  MessageCircle,
  RefreshCw,
  TrendingUp,
  Target,
  Activity,
  Users,
} from "lucide-react";

export function CaseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAgent, setFilterAgent] = useState("all");

  const cases = [
    {
      id: "CASE-2024-001",
      clientName: "John Smith",
      clientEmail: "john.smith@email.com",
      visaType: "H1-B Work Visa",
      country: "Canada",
      status: "proposal_sent",
      assignedAgent: "Sarah Ahmad",
      agentEmail: "sarah.ahmad@globalimmig.com",
      submittedDate: "2024-01-15",
      deadline: "2024-02-15",
      progress: 25,
      priority: "high",
      documentsSubmitted: 8,
      documentsRequired: 15,
      lastUpdate: "2 hours ago",
      estimatedValue: 2500,
      clientRating: 4.8,
    },
    {
      id: "CASE-2024-002",
      clientName: "Emma Johnson",
      clientEmail: "emma.j@email.com",
      visaType: "Study Visa",
      country: "Australia",
      status: "docs_uploaded",
      assignedAgent: "Maria Garcia",
      agentEmail: "maria.garcia@globalimmig.com",
      submittedDate: "2024-01-12",
      deadline: "2024-02-20",
      progress: 65,
      priority: "medium",
      documentsSubmitted: 12,
      documentsRequired: 18,
      lastUpdate: "1 day ago",
      estimatedValue: 1800,
      clientRating: 4.9,
    },
    {
      id: "CASE-2024-003",
      clientName: "Michael Chen",
      clientEmail: "m.chen@email.com",
      visaType: "PR Application",
      country: "New Zealand",
      status: "completed",
      assignedAgent: "David Kim",
      agentEmail: "david.kim@globalimmig.com",
      submittedDate: "2023-11-10",
      deadline: "2024-01-10",
      progress: 100,
      priority: "low",
      documentsSubmitted: 20,
      documentsRequired: 20,
      lastUpdate: "3 days ago",
      estimatedValue: 4200,
      clientRating: 5.0,
    },
    {
      id: "CASE-2024-004",
      clientName: "Sarah Williams",
      clientEmail: "s.williams@email.com",
      visaType: "Family Sponsorship",
      country: "United Kingdom",
      status: "new",
      assignedAgent: null,
      agentEmail: null,
      submittedDate: "2024-01-18",
      deadline: "2024-03-18",
      progress: 0,
      priority: "medium",
      documentsSubmitted: 0,
      documentsRequired: 12,
      lastUpdate: "1 hour ago",
      estimatedValue: 2200,
      clientRating: null,
    },
    {
      id: "CASE-2024-005",
      clientName: "Robert Taylor",
      clientEmail: "r.taylor@email.com",
      visaType: "Visitor Visa",
      country: "United States",
      status: "review",
      assignedAgent: "John Davidson",
      agentEmail: "john.davidson@globalimmig.com",
      submittedDate: "2024-01-16",
      deadline: "2024-02-01",
      progress: 85,
      priority: "high",
      documentsSubmitted: 10,
      documentsRequired: 12,
      lastUpdate: "5 hours ago",
      estimatedValue: 800,
      clientRating: 4.6,
    },
  ];

  const agents = [
    "Sarah Ahmad",
    "Maria Garcia",
    "David Kim",
    "John Davidson",
    "Lisa Rodriguez",
  ];

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      searchTerm === "" ||
      caseItem.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.visaType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (caseItem.assignedAgent &&
        caseItem.assignedAgent
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === "all" || caseItem.status === filterStatus;
    const matchesAgent =
      filterAgent === "all" || caseItem.assignedAgent === filterAgent;

    return matchesSearch && matchesStatus && matchesAgent;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "#3B82F6";
      case "proposal_sent":
        return "#F59E0B";
      case "docs_uploaded":
        return "#8B5CF6";
      case "review":
        return "#06B6D4";
      case "completed":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "New Request";
      case "proposal_sent":
        return "Proposal Sent";
      case "docs_uploaded":
        return "Docs Uploaded";
      case "review":
        return "Under Review";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <FileText className="w-4 h-4" />;
      case "proposal_sent":
        return <Clock className="w-4 h-4" />;
      case "docs_uploaded":
        return <CheckCircle className="w-4 h-4" />;
      case "review":
        return <Eye className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#EF4444";
      case "medium":
        return "#F59E0B";
      case "low":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  const calculateStats = () => {
    const total = cases.length;
    const newCases = cases.filter((c) => c.status === "new").length;
    const inProgress = cases.filter(
      (c) => c.status !== "new" && c.status !== "completed",
    ).length;
    const completed = cases.filter((c) => c.status === "completed").length;

    return { total, newCases, inProgress, completed };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{
                background: "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
              }}
            >
              <Briefcase className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Total Cases
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {stats.total}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <FileText className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            New Requests
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {stats.newCases}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: "#F59E0B" }}
            >
              <Activity className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            In Progress
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {stats.inProgress}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: "#10B981" }}
            >
              <CheckCircle className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Completed
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {stats.completed}
          </p>
        </motion.div>
      </div>

      {/* Header with Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
              Case Management
            </h2>
            <p className="text-sm" style={{ color: "#666666" }}>
              Track and manage all immigration cases
            </p>
          </div>
          <Button style={{ backgroundColor: "#0052CC", color: "white" }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "#666666" }}
            />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "#F4F6FA",
                border: "1px solid #D9D9D9",
                color: "#1A1A1A",
              }}
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "#F4F6FA",
                border: "1px solid #D9D9D9",
                color: "#1A1A1A",
              }}
            >
              <option value="all">All Status</option>
              <option value="new">New Requests</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="docs_uploaded">Docs Uploaded</option>
              <option value="review">Under Review</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "#F4F6FA",
                border: "1px solid #D9D9D9",
                color: "#1A1A1A",
              }}
            >
              <option value="all">All Agents</option>
              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column - Case Info */}
              <div className="lg:col-span-2 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "#1A1A1A" }}
                      >
                        {caseItem.id}
                      </h3>
                      <Badge
                        style={{
                          backgroundColor: getStatusColor(caseItem.status),
                          color: "white",
                        }}
                      >
                        {getStatusIcon(caseItem.status)}
                        <span className="ml-1">
                          {getStatusLabel(caseItem.status)}
                        </span>
                      </Badge>
                      <Badge
                        style={{
                          backgroundColor: getPriorityColor(caseItem.priority),
                          color: "white",
                        }}
                      >
                        {caseItem.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div
                      className="flex items-center space-x-4 text-sm"
                      style={{ color: "#666666" }}
                    >
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{caseItem.clientName}</span>
                      </div>
                      <span>•</span>
                      <span>{caseItem.visaType}</span>
                      <span>•</span>
                      <span>{caseItem.country}</span>
                    </div>
                  </div>
                </div>

                {/* Client & Agent Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4
                      className="text-sm font-medium mb-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      Client Information
                    </h4>
                    <div
                      className="space-y-1 text-sm"
                      style={{ color: "#666666" }}
                    >
                      <p>{caseItem.clientEmail}</p>
                      {caseItem.clientRating && (
                        <div className="flex items-center space-x-1">
                          <span>Rating: {caseItem.clientRating}/5.0</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4
                      className="text-sm font-medium mb-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      Assigned Agent
                    </h4>
                    <div
                      className="space-y-1 text-sm"
                      style={{ color: "#666666" }}
                    >
                      {caseItem.assignedAgent ? (
                        <>
                          <p>{caseItem.assignedAgent}</p>
                          <p>{caseItem.agentEmail}</p>
                        </>
                      ) : (
                        <p className="text-red-500">Not assigned</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span style={{ color: "#666666" }}>Case Progress</span>
                    <span style={{ color: "#1A1A1A" }}>
                      {caseItem.progress}% Complete
                    </span>
                  </div>
                  <div
                    className="w-full rounded-full h-3"
                    style={{ backgroundColor: "#D9D9D9" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${caseItem.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-3 rounded-full"
                      style={{
                        backgroundColor: getStatusColor(caseItem.status),
                      }}
                    />
                  </div>
                </div>

                {/* Documents */}
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "#666666" }}>Documents:</span>
                  <span style={{ color: "#1A1A1A" }}>
                    {caseItem.documentsSubmitted}/{caseItem.documentsRequired}{" "}
                    submitted
                  </span>
                </div>
              </div>

              {/* Middle Column - Timeline */}
              <div className="space-y-4">
                <div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: "#F4F6FA" }}
                >
                  <h4
                    className="text-sm font-medium mb-3"
                    style={{ color: "#1A1A1A" }}
                  >
                    Case Timeline
                  </h4>
                  <div className="space-y-3">
                    <div
                      className="flex items-center justify-between text-sm"
                      style={{ color: "#666666" }}
                    >
                      <span>Submitted:</span>
                      <span>{caseItem.submittedDate}</span>
                    </div>
                    <div
                      className="flex items-center justify-between text-sm"
                      style={{ color: "#666666" }}
                    >
                      <span>Deadline:</span>
                      <span>{caseItem.deadline}</span>
                    </div>
                    <div
                      className="flex items-center justify-between text-sm"
                      style={{ color: "#666666" }}
                    >
                      <span>Last Update:</span>
                      <span>{caseItem.lastUpdate}</span>
                    </div>
                    <div
                      className="flex items-center justify-between text-sm"
                      style={{ color: "#666666" }}
                    >
                      <span>Estimated Value:</span>
                      <span
                        className="font-medium"
                        style={{ color: "#0052CC" }}
                      >
                        ${caseItem.estimatedValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full"
                  style={{ backgroundColor: "#0052CC", color: "white" }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>

                {!caseItem.assignedAgent && (
                  <Button
                    variant="outline"
                    className="w-full"
                    style={{ color: "#0052CC", borderColor: "#0052CC" }}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Assign Agent
                  </Button>
                )}

                {caseItem.assignedAgent && caseItem.status !== "completed" && (
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reassign
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Documents
                  </Button>
                </div>

                {/* Case Health */}
                <div
                  className="text-center p-3 rounded-lg"
                  style={{ backgroundColor: "#EAF2FF" }}
                >
                  <p className="text-xs" style={{ color: "#666666" }}>
                    Case Health
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{
                      color:
                        caseItem.progress > 70
                          ? "#10B981"
                          : caseItem.progress > 40
                            ? "#F59E0B"
                            : "#EF4444",
                    }}
                  >
                    {caseItem.progress > 70
                      ? "Excellent"
                      : caseItem.progress > 40
                        ? "Good"
                        : "Needs Attention"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCases.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm"
        >
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#EAF2FF" }}
          >
            <Briefcase className="w-8 h-8" style={{ color: "#0052CC" }} />
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "#1A1A1A" }}
          >
            No cases found
          </h3>
          <p className="mb-4" style={{ color: "#666666" }}>
            No cases match your search criteria. Try adjusting your filters.
          </p>
          <Button style={{ backgroundColor: "#0052CC", color: "white" }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Cases
          </Button>
        </motion.div>
      )}
    </div>
  );
}

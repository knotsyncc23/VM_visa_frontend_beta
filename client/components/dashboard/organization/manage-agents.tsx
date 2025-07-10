import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MessageCircle,
  Trash2,
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Save,
  Upload,
  Activity,
  Award,
  Target,
} from "lucide-react";

export function ManageAgents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const agents = [
    {
      id: "1",
      name: "Sarah Ahmad",
      email: "sarah.ahmad@globalimmig.com",
      phone: "+1 (555) 123-4567",
      location: "Toronto, ON",
      experience: 8,
      specializations: ["Work Permits", "Study Visas", "PR Applications"],
      status: "active",
      joinDate: "2022-01-15",
      casesHandled: 145,
      successRate: 94,
      rating: 4.8,
      reviews: 89,
      activeCases: 12,
      monthlyRevenue: 15200,
      profileCompletion: 100,
      lastActive: "2 hours ago",
      avatar: "SA",
    },
    {
      id: "2",
      name: "John Davidson",
      email: "john.davidson@globalimmig.com",
      phone: "+1 (555) 234-5678",
      location: "Vancouver, BC",
      experience: 6,
      specializations: ["Family Sponsorship", "Visitor Visas"],
      status: "active",
      joinDate: "2022-03-20",
      casesHandled: 98,
      successRate: 89,
      rating: 4.6,
      reviews: 67,
      activeCases: 8,
      monthlyRevenue: 11800,
      profileCompletion: 95,
      lastActive: "1 hour ago",
      avatar: "JD",
    },
    {
      id: "3",
      name: "Maria Garcia",
      email: "maria.garcia@globalimmig.com",
      phone: "+1 (555) 345-6789",
      location: "Calgary, AB",
      experience: 5,
      specializations: ["Work Permits", "Family Sponsorship"],
      status: "pending_docs",
      joinDate: "2023-01-10",
      casesHandled: 67,
      successRate: 92,
      rating: 4.7,
      reviews: 45,
      activeCases: 6,
      monthlyRevenue: 9400,
      profileCompletion: 75,
      lastActive: "5 hours ago",
      avatar: "MG",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@globalimmig.com",
      phone: "+1 (555) 456-7890",
      location: "Montreal, QC",
      experience: 7,
      specializations: ["Study Visas", "PR Applications", "Work Permits"],
      status: "active",
      joinDate: "2021-11-05",
      casesHandled: 134,
      successRate: 88,
      rating: 4.5,
      reviews: 78,
      activeCases: 10,
      monthlyRevenue: 13600,
      profileCompletion: 100,
      lastActive: "30 minutes ago",
      avatar: "DK",
    },
    {
      id: "5",
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@globalimmig.com",
      phone: "+1 (555) 567-8901",
      location: "Ottawa, ON",
      experience: 4,
      specializations: ["Visitor Visas", "Study Visas"],
      status: "suspended",
      joinDate: "2023-06-15",
      casesHandled: 23,
      successRate: 85,
      rating: 4.3,
      reviews: 15,
      activeCases: 0,
      monthlyRevenue: 0,
      profileCompletion: 60,
      lastActive: "2 days ago",
      avatar: "LR",
    },
  ];

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      searchTerm === "" ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specializations.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      filterStatus === "all" || agent.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10B981";
      case "pending_docs":
        return "#F59E0B";
      case "suspended":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending_docs":
        return "Pending Docs";
      case "suspended":
        return "Suspended";
      default:
        return "Unknown";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "pending_docs":
        return <Clock className="w-4 h-4" />;
      case "suspended":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const calculateStats = () => {
    const total = agents.length;
    const active = agents.filter((a) => a.status === "active").length;
    const pending = agents.filter((a) => a.status === "pending_docs").length;
    const totalRevenue = agents.reduce((sum, a) => sum + a.monthlyRevenue, 0);

    return { total, active, pending, totalRevenue };
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
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Total Agents
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
              style={{ backgroundColor: "#10B981" }}
            >
              <CheckCircle className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Active Agents
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {stats.active}
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
              <Clock className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Pending Review
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            {stats.pending}
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
              style={{ backgroundColor: "#8B5CF6" }}
            >
              <Target className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "#666666" }}>
            Monthly Revenue
          </h3>
          <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            ${(stats.totalRevenue / 1000).toFixed(0)}k
          </p>
        </motion.div>
      </div>

      {/* Header with Search and Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
              Team Management
            </h2>
            <p className="text-sm" style={{ color: "#666666" }}>
              Manage your immigration agents and their performance
            </p>
          </div>
          <Button
            onClick={() => setShowAddAgent(true)}
            style={{ backgroundColor: "#0052CC", color: "white" }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Agent
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "#666666" }}
            />
            <input
              type="text"
              placeholder="Search agents..."
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

          {/* Filter */}
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
              <option value="active">Active</option>
              <option value="pending_docs">Pending Docs</option>
              <option value="suspended">Suspended</option>
            </select>

            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              style={{
                backgroundColor:
                  viewMode === "grid" ? "#0052CC" : "transparent",
                color: viewMode === "grid" ? "white" : "#1A1A1A",
              }}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              style={{
                backgroundColor:
                  viewMode === "list" ? "#0052CC" : "transparent",
                color: viewMode === "list" ? "white" : "#1A1A1A",
              }}
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Agents Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "#0052CC" }}
                  >
                    {agent.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
                      {agent.name}
                    </h3>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      {agent.experience} years exp.
                    </p>
                  </div>
                </div>
                <Badge
                  style={{
                    backgroundColor: getStatusColor(agent.status),
                    color: "white",
                  }}
                >
                  {getStatusIcon(agent.status)}
                  <span className="ml-1">{getStatusLabel(agent.status)}</span>
                </Badge>
              </div>

              {/* Agent Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4" style={{ color: "#666666" }} />
                  <span style={{ color: "#666666" }}>{agent.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4" style={{ color: "#666666" }} />
                  <span style={{ color: "#666666" }}>{agent.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Briefcase className="w-4 h-4" style={{ color: "#666666" }} />
                  <span style={{ color: "#666666" }}>
                    {agent.activeCases} active cases
                  </span>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <p className="text-xs mb-2" style={{ color: "#666666" }}>
                  Specializations:
                </p>
                <div className="flex flex-wrap gap-1">
                  {agent.specializations.slice(0, 2).map((spec) => (
                    <Badge
                      key={spec}
                      className="text-xs"
                      style={{ backgroundColor: "#EAF2FF", color: "#0052CC" }}
                    >
                      {spec}
                    </Badge>
                  ))}
                  {agent.specializations.length > 2 && (
                    <Badge
                      className="text-xs"
                      style={{ backgroundColor: "#EAF2FF", color: "#0052CC" }}
                    >
                      +{agent.specializations.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold" style={{ color: "#0052CC" }}>
                    {agent.successRate}%
                  </p>
                  <p className="text-xs" style={{ color: "#666666" }}>
                    Success Rate
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star
                      className="w-4 h-4 fill-current"
                      style={{ color: "#F59E0B" }}
                    />
                    <p
                      className="text-lg font-bold"
                      style={{ color: "#0052CC" }}
                    >
                      {agent.rating}
                    </p>
                  </div>
                  <p className="text-xs" style={{ color: "#666666" }}>
                    ({agent.reviews} reviews)
                  </p>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: "#666666" }}>Profile Completion</span>
                  <span style={{ color: "#1A1A1A" }}>
                    {agent.profileCompletion}%
                  </span>
                </div>
                <div
                  className="w-full rounded-full h-2"
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.profileCompletion}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: "#0052CC" }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              {/* Last Active */}
              <p
                className="text-xs mt-2 text-center"
                style={{ color: "#666666" }}
              >
                Last active: {agent.lastActive}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6">
            <div className="space-y-4">
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl hover:shadow-sm transition-all duration-200"
                  style={{ backgroundColor: "#F4F6FA" }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: "#0052CC" }}
                    >
                      {agent.avatar}
                    </div>
                    <div>
                      <h3
                        className="font-semibold"
                        style={{ color: "#1A1A1A" }}
                      >
                        {agent.name}
                      </h3>
                      <div
                        className="flex items-center space-x-4 text-sm"
                        style={{ color: "#666666" }}
                      >
                        <span>{agent.email}</span>
                        <span>•</span>
                        <span>{agent.location}</span>
                        <span>•</span>
                        <span>{agent.activeCases} cases</span>
                        <span>•</span>
                        <span>{agent.successRate}% success</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      style={{
                        backgroundColor: getStatusColor(agent.status),
                        color: "white",
                      }}
                    >
                      {getStatusIcon(agent.status)}
                      <span className="ml-1">
                        {getStatusLabel(agent.status)}
                      </span>
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star
                        className="w-4 h-4 fill-current"
                        style={{ color: "#F59E0B" }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: "#1A1A1A" }}
                      >
                        {agent.rating}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Agent Modal */}
      <AnimatePresence>
        {showAddAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddAgent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#1A1A1A" }}
                >
                  Add New Agent
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddAgent(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter agent's full name"
                      className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: "#F4F6FA",
                        border: "1px solid #D9D9D9",
                        color: "#1A1A1A",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="agent@globalimmig.com"
                      className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: "#F4F6FA",
                        border: "1px solid #D9D9D9",
                        color: "#1A1A1A",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: "#F4F6FA",
                        border: "1px solid #D9D9D9",
                        color: "#1A1A1A",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, Province"
                      className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: "#F4F6FA",
                        border: "1px solid #D9D9D9",
                        color: "#1A1A1A",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1A1A1A" }}
                  >
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: "#F4F6FA",
                      border: "1px solid #D9D9D9",
                      color: "#1A1A1A",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1A1A1A" }}
                  >
                    Specializations
                  </label>
                  <div className="space-y-2">
                    {[
                      "Work Permits",
                      "Study Visas",
                      "PR Applications",
                      "Family Sponsorship",
                      "Visitor Visas",
                    ].map((spec) => (
                      <label key={spec} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span style={{ color: "#1A1A1A" }}>{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    className="flex-1"
                    style={{ backgroundColor: "#0052CC", color: "white" }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddAgent(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm"
        >
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#EAF2FF" }}
          >
            <Users className="w-8 h-8" style={{ color: "#0052CC" }} />
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "#1A1A1A" }}
          >
            No agents found
          </h3>
          <p className="mb-4" style={{ color: "#666666" }}>
            No agents match your search criteria. Try adjusting your filters or
            add a new agent.
          </p>
          <Button
            onClick={() => setShowAddAgent(true)}
            style={{ backgroundColor: "#0052CC", color: "white" }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Agent
          </Button>
        </motion.div>
      )}
    </div>
  );
}

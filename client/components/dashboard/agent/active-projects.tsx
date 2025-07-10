import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageCircle,
  Calendar,
  User,
  DollarSign,
  Upload,
  Eye,
  ArrowRight,
  Target,
  Activity,
  Plus,
  Filter,
} from "lucide-react";

export function ActiveProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const projects = [
    {
      id: "1",
      title: "H1-B Visa Application - Microsoft Canada",
      client: "John Smith",
      visaType: "Work Visa",
      country: "Canada",
      status: "in-progress",
      progress: 75,
      startDate: "2024-01-02",
      deadline: "2024-01-25",
      totalValue: "$2,500",
      milestones: [
        { name: "Initial Consultation", completed: true, date: "2024-01-02" },
        { name: "Document Collection", completed: true, date: "2024-01-05" },
        {
          name: "Application Preparation",
          completed: true,
          date: "2024-01-10",
        },
        { name: "Form Submission", completed: false, date: "2024-01-18" },
        { name: "Interview Preparation", completed: false, date: "2024-01-22" },
        { name: "Final Review", completed: false, date: "2024-01-25" },
      ],
      recentActivity: [
        { action: "Documents reviewed", time: "2 hours ago" },
        { action: "Client meeting scheduled", time: "1 day ago" },
      ],
      urgency: "medium",
      documentsUploaded: 12,
      documentsRequired: 15,
      nextMilestone: "Form Submission",
      daysRemaining: 8,
    },
    {
      id: "2",
      title: "Student Visa - University of Melbourne",
      client: "Sarah Johnson",
      visaType: "Study Visa",
      country: "Australia",
      status: "review",
      progress: 90,
      startDate: "2023-12-15",
      deadline: "2024-01-20",
      totalValue: "$1,800",
      milestones: [
        { name: "Initial Consultation", completed: true, date: "2023-12-15" },
        { name: "University Application", completed: true, date: "2023-12-20" },
        { name: "Document Preparation", completed: true, date: "2024-01-05" },
        { name: "Visa Application", completed: true, date: "2024-01-10" },
        { name: "Medical Examination", completed: true, date: "2024-01-15" },
        { name: "Final Approval", completed: false, date: "2024-01-20" },
      ],
      recentActivity: [
        { action: "Medical results received", time: "4 hours ago" },
        { action: "Application under review", time: "2 days ago" },
      ],
      urgency: "low",
      documentsUploaded: 18,
      documentsRequired: 18,
      nextMilestone: "Final Approval",
      daysRemaining: 5,
    },
    {
      id: "3",
      title: "Skilled Worker Visa - London Investment",
      client: "David Kim",
      visaType: "Work Visa",
      country: "United Kingdom",
      status: "urgent",
      progress: 45,
      startDate: "2024-01-08",
      deadline: "2024-02-15",
      totalValue: "$3,100",
      milestones: [
        { name: "Initial Assessment", completed: true, date: "2024-01-08" },
        {
          name: "Sponsorship Verification",
          completed: true,
          date: "2024-01-12",
        },
        { name: "Document Collection", completed: false, date: "2024-01-20" },
        {
          name: "Application Submission",
          completed: false,
          date: "2024-01-30",
        },
        {
          name: "Biometrics Appointment",
          completed: false,
          date: "2024-02-05",
        },
        { name: "Decision & Collection", completed: false, date: "2024-02-15" },
      ],
      recentActivity: [
        { action: "Urgent: Missing documents", time: "1 hour ago" },
        { action: "Client contacted", time: "3 hours ago" },
      ],
      urgency: "high",
      documentsUploaded: 8,
      documentsRequired: 14,
      nextMilestone: "Document Collection",
      daysRemaining: 5,
    },
    {
      id: "4",
      title: "Family Reunification Visa - Germany",
      client: "Maria Garcia",
      visaType: "Family Visa",
      country: "Germany",
      status: "completed",
      progress: 100,
      startDate: "2023-11-01",
      deadline: "2023-12-30",
      totalValue: "$2,200",
      milestones: [
        { name: "Initial Consultation", completed: true, date: "2023-11-01" },
        { name: "Document Preparation", completed: true, date: "2023-11-15" },
        { name: "Application Submission", completed: true, date: "2023-12-01" },
        { name: "Interview Preparation", completed: true, date: "2023-12-10" },
        { name: "Visa Interview", completed: true, date: "2023-12-20" },
        { name: "Visa Approved", completed: true, date: "2023-12-28" },
      ],
      recentActivity: [
        { action: "Visa approved and collected", time: "5 days ago" },
        { action: "Thank you message from client", time: "4 days ago" },
      ],
      urgency: "low",
      documentsUploaded: 16,
      documentsRequired: 16,
      nextMilestone: "Project Complete",
      daysRemaining: 0,
    },
    {
      id: "5",
      title: "Investment Visa - Singapore",
      client: "Robert Chen",
      visaType: "Investment Visa",
      country: "Singapore",
      status: "planning",
      progress: 25,
      startDate: "2024-01-12",
      deadline: "2024-03-15",
      totalValue: "$5,500",
      milestones: [
        { name: "Investment Strategy", completed: true, date: "2024-01-12" },
        { name: "Business Plan Review", completed: false, date: "2024-01-25" },
        {
          name: "Financial Documentation",
          completed: false,
          date: "2024-02-10",
        },
        {
          name: "Application Preparation",
          completed: false,
          date: "2024-02-20",
        },
        { name: "Submission & Review", completed: false, date: "2024-03-01" },
        { name: "Approval & Collection", completed: false, date: "2024-03-15" },
      ],
      recentActivity: [
        { action: "Investment strategy finalized", time: "1 day ago" },
        { action: "Business plan requested", time: "2 days ago" },
      ],
      urgency: "medium",
      documentsUploaded: 5,
      documentsRequired: 20,
      nextMilestone: "Business Plan Review",
      daysRemaining: 10,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filterStatus === "all") return true;
    return project.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "review":
        return "bg-purple-100 text-purple-700";
      case "urgent":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planning":
        return <Target className="w-4 h-4" />;
      case "in-progress":
        return <Activity className="w-4 h-4" />;
      case "review":
        return <Eye className="w-4 h-4" />;
      case "urgent":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const calculateProjectStats = () => {
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "completed").length;
    const urgent = projects.filter((p) => p.urgency === "high").length;
    const totalValue = projects.reduce(
      (sum, p) => sum + parseFloat(p.totalValue.replace(/[$,]/g, "")),
      0,
    );

    return { total, completed, urgent, totalValue };
  };

  const stats = calculateProjectStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#f0f4ff" }}
            >
              <Activity className="w-6 h-6" style={{ color: "#326dee" }} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Active Projects
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Completed</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Urgent Items
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Total Value
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.totalValue.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Project Management
          </h2>
          <Button style={{ backgroundColor: "#326dee" }}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {[
            { id: "all", label: "All Projects", count: projects.length },
            {
              id: "planning",
              label: "Planning",
              count: projects.filter((p) => p.status === "planning").length,
            },
            {
              id: "in-progress",
              label: "In Progress",
              count: projects.filter((p) => p.status === "in-progress").length,
            },
            {
              id: "review",
              label: "Under Review",
              count: projects.filter((p) => p.status === "review").length,
            },
            {
              id: "urgent",
              label: "Urgent",
              count: projects.filter((p) => p.status === "urgent").length,
            },
            {
              id: "completed",
              label: "Completed",
              count: projects.filter((p) => p.status === "completed").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-2 ${
                filterStatus === tab.id
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              style={{
                backgroundColor:
                  filterStatus === tab.id ? "#326dee" : "transparent",
              }}
            >
              <span>{tab.label}</span>
              <Badge
                className={`text-xs ${
                  filterStatus === tab.id
                    ? "bg-white/20 text-white hover:bg-white/20"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Project Info */}
              <div className="lg:col-span-2 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{project.client}</span>
                      </div>
                      <span>•</span>
                      <span>{project.visaType}</span>
                      <span>•</span>
                      <span>{project.country}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1 capitalize">{project.status}</span>
                    </Badge>
                    <span
                      className={`text-sm font-medium ${getUrgencyColor(
                        project.urgency,
                      )}`}
                    >
                      {project.urgency.charAt(0).toUpperCase() +
                        project.urgency.slice(1)}{" "}
                      Priority
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {project.progress}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-3 rounded-full"
                      style={{ backgroundColor: "#326dee" }}
                    />
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Project Milestones
                  </h4>
                  <div className="space-y-2">
                    {project.milestones.slice(0, 3).map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 text-sm"
                      >
                        {milestone.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                        )}
                        <span
                          className={
                            milestone.completed
                              ? "text-gray-900 line-through"
                              : "text-gray-700"
                          }
                        >
                          {milestone.name}
                        </span>
                        <span className="text-gray-500 text-xs ml-auto">
                          {milestone.date}
                        </span>
                      </div>
                    ))}
                    {project.milestones.length > 3 && (
                      <button className="text-blue-600 text-sm hover:underline">
                        View all {project.milestones.length} milestones
                      </button>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Recent Activity
                  </h4>
                  <div className="space-y-1">
                    {project.recentActivity.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>{activity.action}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Details & Actions */}
              <div className="space-y-4">
                {/* Project Details */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Value</span>
                    <span className="font-semibold text-gray-900">
                      {project.totalValue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Days Remaining
                    </span>
                    <span
                      className={`font-semibold ${
                        project.daysRemaining <= 5
                          ? "text-red-600"
                          : project.daysRemaining <= 10
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {project.daysRemaining || "Complete"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Documents</span>
                    <span className="font-semibold text-gray-900">
                      {project.documentsUploaded}/{project.documentsRequired}
                    </span>
                  </div>
                </div>

                {/* Next Milestone */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Next Milestone
                  </h4>
                  <p className="text-sm text-gray-700">
                    {project.nextMilestone}
                  </p>
                  {project.status !== "completed" && (
                    <Button
                      size="sm"
                      className="w-full mt-3"
                      style={{ backgroundColor: "#326dee" }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-1" />
                      Docs
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
        >
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#f0f4ff" }}
          >
            <Activity className="w-8 h-8" style={{ color: "#326dee" }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 mb-4">
            Start by creating your first project or adjust your filters.
          </p>
          <Button style={{ backgroundColor: "#326dee" }}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Project
          </Button>
        </motion.div>
      )}
    </div>
  );
}

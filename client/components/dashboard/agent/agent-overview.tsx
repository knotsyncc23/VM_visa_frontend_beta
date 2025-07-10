import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  FileText,
  Clock,
  CheckCircle,
  Users,
  Eye,
  Edit,
  MessageCircle,
  Calendar,
  MapPin,
  Star,
  AlertCircle,
  Plus,
} from "lucide-react";

interface AgentOverviewProps {
  filterPeriod: "today" | "7days" | "month" | "year";
}

export function AgentOverview({ filterPeriod }: AgentOverviewProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Mock data based on filter period
  const getKPIData = () => {
    const data = {
      today: {
        proposalsSent: 3,
        successRate: 94,
        activeProjects: 8,
        totalEarnings: 1240,
        monthlyGrowth: 8.5,
      },
      "7days": {
        proposalsSent: 18,
        successRate: 92,
        activeProjects: 8,
        totalEarnings: 3800,
        monthlyGrowth: 12.3,
      },
      month: {
        proposalsSent: 120,
        successRate: 92,
        activeProjects: 8,
        totalEarnings: 5200,
        monthlyGrowth: 15.2,
      },
      year: {
        proposalsSent: 1450,
        successRate: 89,
        activeProjects: 8,
        totalEarnings: 62400,
        monthlyGrowth: 18.7,
      },
    };
    return data[filterPeriod];
  };

  const kpiData = getKPIData();

  const recentTasks = [
    {
      id: "1",
      type: "Work Visa",
      client: "John Smith",
      status: "ongoing",
      deadline: "2024-01-20",
      documents: 8,
      progress: 65,
    },
    {
      id: "2",
      type: "Study Visa",
      client: "Emma Johnson",
      status: "submitted",
      deadline: "2024-01-18",
      documents: 12,
      progress: 85,
    },
    {
      id: "3",
      type: "PR Application",
      client: "Michael Chen",
      status: "completed",
      deadline: "2024-01-15",
      documents: 15,
      progress: 100,
    },
    {
      id: "4",
      type: "Visitor Visa",
      client: "Lisa Rodriguez",
      status: "ongoing",
      deadline: "2024-01-25",
      documents: 6,
      progress: 45,
    },
  ];

  const recentActivity = [
    {
      action: "Sent proposal for H1-B visa application",
      client: "Tech Corp Inc.",
      time: "2 hours ago",
      type: "proposal",
    },
    {
      action: "Completed Student Visa for University of Toronto",
      client: "Sarah Williams",
      time: "4 hours ago",
      type: "completion",
    },
    {
      action: "Document review completed",
      client: "Global Consulting Ltd.",
      time: "6 hours ago",
      type: "review",
    },
    {
      action: "Client consultation scheduled",
      client: "Innovation Labs",
      time: "1 day ago",
      type: "meeting",
    },
  ];

  const kpiCards = [
    {
      title: "Proposals Sent",
      value: kpiData.proposalsSent,
      icon: FileText,
      color: "#326dee",
      bgColor: "#f0f4ff",
      growth: "+12%",
      period: filterPeriod,
    },
    {
      title: "Success Rate",
      value: `${kpiData.successRate}%`,
      icon: Target,
      color: "#10b981",
      bgColor: "#ecfdf5",
      growth: "+3%",
      period: filterPeriod,
    },
    {
      title: "Active Projects",
      value: kpiData.activeProjects,
      icon: Activity,
      color: "#f59e0b",
      bgColor: "#fffbeb",
      growth: "+2",
      period: filterPeriod,
    },
    {
      title: "Total Earnings",
      value: `$${kpiData.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "#8b5cf6",
      bgColor: "#f3f4f6",
      growth: `+${kpiData.monthlyGrowth}%`,
      period: filterPeriod,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      case "submitted":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Clock className="w-4 h-4" />;
      case "submitted":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => {
          const isProposals = index === 0;
          const isSuccessRate = index === 1;
          const isActive = index === 2;
          const isEarnings = index === 3;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`h-[140px] rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border ${
                isProposals
                  ? "border-blue-200 hover:border-blue-300"
                  : isSuccessRate
                    ? "border-green-200 hover:border-green-300"
                    : isActive
                      ? "border-yellow-200 hover:border-yellow-300"
                      : "border-purple-200 hover:border-purple-300"
              }`}
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isProposals
                        ? "bg-blue-100"
                        : isSuccessRate
                          ? "bg-green-100"
                          : isActive
                            ? "bg-yellow-100"
                            : "bg-purple-100"
                    }`}
                  >
                    <card.icon
                      className={`w-5 h-5 ${
                        isProposals
                          ? "text-blue-600"
                          : isSuccessRate
                            ? "text-green-600"
                            : isActive
                              ? "text-yellow-600"
                              : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-medium">{card.growth}</span>
                  </div>
                </div>

                <div>
                  <p
                    className="text-2xl font-bold mb-1"
                    style={{ color: "#37474F" }}
                  >
                    {card.value}
                  </p>
                  <h3
                    className="text-sm font-medium mb-1"
                    style={{ color: "#37474F" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {card.period === "7days"
                      ? "This week"
                      : `This ${card.period}`}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Active Tasks</h3>
              <p className="text-sm text-gray-600">
                Current proposals and projects
              </p>
            </div>
            <Button
              size="sm"
              style={{ backgroundColor: "#0288D1", color: "white" }}
              className="hover:bg-blue-700"
              onClick={() => {
                // Navigate to create new task/proposal
                console.log("Creating new task");
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>

          <div className="space-y-4">
            {recentTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-all duration-200 cursor-pointer"
                onClick={() =>
                  setSelectedTask(selectedTask === task.id ? null : task.id)
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusIcon(task.status)}
                      <span className="ml-1 capitalize">{task.status}</span>
                    </Badge>
                    <span className="font-medium text-gray-900">
                      {task.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Navigate to task details
                        console.log("View task:", task.id);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Navigate to edit task
                        console.log("Edit task:", task.id);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Open messaging
                        console.log("Message client:", task.client);
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Client:</span>
                    <span className="font-medium text-gray-900">
                      {task.client}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="text-gray-900">{task.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Documents:</span>
                    <span className="text-gray-900">
                      {task.documents} uploaded
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">
                      {task.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: "#326dee" }}
                    />
                  </div>
                </div>

                {task.status === "completed" && (
                  <Button
                    size="sm"
                    className="w-full mt-3 bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-600">
                Your latest actions and updates
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              style={{ color: "#0288D1", borderColor: "#0288D1" }}
              className="hover:bg-blue-50"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium mt-1"
                  style={{ backgroundColor: "#326dee" }}
                >
                  {activity.type === "proposal" && (
                    <FileText className="w-4 h-4" />
                  )}
                  {activity.type === "completion" && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {activity.type === "review" && <Eye className="w-4 h-4" />}
                  {activity.type === "meeting" && (
                    <Calendar className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.client}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

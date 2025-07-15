import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Plus,
  AlertCircle,
  Bell,
  Briefcase,
} from "lucide-react";
import { api } from "@shared/api";
import { useAuth } from "@/components/auth/auth-context";

interface AgentOverviewProps {
  filterPeriod: "today" | "7days" | "month" | "year";
}

export function AgentOverview({ filterPeriod }: AgentOverviewProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [activeTasks, setActiveTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [filterPeriod, user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [stats, activity, cases] = await Promise.all([
        api.getDashboardStats(),
        api.getNotifications({ limit: 10 }), // Get recent notifications
        api.getActiveCases() // Get active cases/tasks
      ]);
      
      setDashboardStats(stats);
      // Ensure activity is always an array
      setRecentActivity(Array.isArray(activity) ? activity : []);
      // Ensure cases is always an array
      setActiveTasks(Array.isArray(cases) ? cases : []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data if API fails
      setDashboardStats(getMockKPIData());
      setRecentActivity(getMockRecentActivity());
      setActiveTasks(getMockRecentTasks());
    } finally {
      setLoading(false);
    }
  };

  // Mock data as fallback
  const getMockKPIData = () => {
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

  const getMockRecentTasks = () => [
    {
      id: "1",
      requestId: { title: "Work Visa Application", visaType: "Work Visa", country: "Canada" },
      clientId: { name: "John Smith" },
      status: "in-progress",
      lastActivity: "2024-01-20",
      progress: { percentage: 65, completedMilestones: 3, totalMilestones: 5 },
      proposalId: { budget: 2500 }
    },
    {
      id: "2",
      requestId: { title: "Study Visa Processing", visaType: "Study Visa", country: "UK" },
      clientId: { name: "Emma Johnson" },
      status: "active",
      lastActivity: "2024-01-18",
      progress: { percentage: 85, completedMilestones: 4, totalMilestones: 5 },
      proposalId: { budget: 1800 }
    },
    {
      id: "3",
      requestId: { title: "PR Application Review", visaType: "PR Application", country: "Australia" },
      clientId: { name: "Michael Chen" },
      status: "completed",
      lastActivity: "2024-01-15",
      progress: { percentage: 100, completedMilestones: 6, totalMilestones: 6 },
      proposalId: { budget: 3200 }
    },
    {
      id: "4",
      requestId: { title: "Visitor Visa Fast Track", visaType: "Visitor Visa", country: "USA" },
      clientId: { name: "Lisa Rodriguez" },
      status: "active",
      lastActivity: "2024-01-25",
      progress: { percentage: 45, completedMilestones: 2, totalMilestones: 4 },
      proposalId: { budget: 800 }
    },
  ];

  const getMockRecentActivity = () => [
    {
      type: "proposal",
      action: "submitted",
      data: {
        request: { title: "Work Visa Application", visaType: "Work Visa" },
        budget: 2500,
        status: "pending"
      },
      timestamp: "2024-01-20T10:30:00Z"
    },
    {
      type: "message",
      action: "received",
      data: {
        content: "Can you provide an update on my application?",
        sender: { name: "John Smith" },
        receiver: { name: "You" }
      },
      timestamp: "2024-01-19T15:45:00Z"
    },
    {
      type: "proposal",
      action: "accepted",
      data: {
        request: { title: "Study Visa Processing", visaType: "Study Visa" },
        budget: 1800,
        status: "accepted"
      },
      timestamp: "2024-01-18T09:15:00Z"
    },
    {
      type: "message",
      action: "sent",
      data: {
        content: "I'll have the documents ready by tomorrow.",
        sender: { name: "You" },
        receiver: { name: "Emma Johnson" }
      },
      timestamp: "2024-01-17T14:20:00Z"
    }
  ];

  const kpiData = dashboardStats || getMockKPIData();
  const recentTasks = activeTasks.length > 0 ? activeTasks : getMockRecentTasks();

  // Ensure kpiData has all required properties with defaults
  const safeKpiData = {
    proposalsSent: kpiData?.totalProposals || kpiData?.proposalsSent || 0,
    successRate: kpiData?.successRate || 0,
    activeProjects: kpiData?.acceptedProposals || kpiData?.activeProjects || 0,
    totalEarnings: kpiData?.totalEarnings || 0,
    monthlyGrowth: kpiData?.monthlyGrowth || 0,
  };

  const kpiCards = [
    {
      title: "Proposals Sent",
      value: safeKpiData.proposalsSent,
      icon: FileText,
      color: "#326dee",
      bgColor: "#f0f4ff",
      growth: "+12%",
      period: filterPeriod,
    },
    {
      title: "Success Rate",
      value: `${safeKpiData.successRate}%`,
      icon: Target,
      color: "#10b981",
      bgColor: "#ecfdf5",
      growth: "+3%",
      period: filterPeriod,
    },
    {
      title: "Active Projects",
      value: safeKpiData.activeProjects,
      icon: Activity,
      color: "#f59e0b",
      bgColor: "#fffbeb",
      growth: "+2",
      period: filterPeriod,
    },
    {
      title: "Total Earnings",
      value: `$${safeKpiData.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "#8b5cf6",
      bgColor: "#f3f4f6",
      growth: `+${safeKpiData.monthlyGrowth}%`,
      period: filterPeriod,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
      case "active":
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "submitted":
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ongoing":
      case "active":
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "submitted":
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
      case "rejected":
        return <Activity className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  // Helper function to safely extract progress value
  const getProgressValue = (progress: any): number => {
    if (typeof progress === 'number') {
      return progress;
    }
    if (typeof progress === 'object' && progress !== null) {
      return progress.percentage || 0;
    }
    return 0;
  };

  // Navigation handlers
  const handleViewTask = (taskId: string) => {
    navigate(`/case/${taskId}`);
  };

  const handleEditTask = (taskId: string) => {
    // Navigate to case detail page with edit mode
    navigate(`/case/${taskId}?mode=edit`);
  };

  const handleMessageClient = (clientName: string, taskId: string) => {
    navigate(`/messages?caseId=${taskId}&clientName=${encodeURIComponent(clientName)}`);
  };

  const handleCreateNewTask = () => {
    // Navigate to agent dashboard with a specific tab or create proposal flow
    navigate('/agent-dashboard?tab=proposals&action=create');
  };

  const handleViewAllActivity = () => {
    navigate('/notifications');
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
              onClick={handleCreateNewTask}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>

          <div className="space-y-4">
            {loading ? (
              // Loading state
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-xl animate-pulse">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-200 rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentTasks.length > 0 ? (
              recentTasks.map((task) => (
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
                      {task.requestId?.visaType || task.type || "Visa Application"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewTask(task.id || task._id);
                      }}
                      title="View case details"
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTask(task.id || task._id);
                      }}
                      title="Edit case"
                      className="hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        const clientName = task.clientId?.name || task.client || "Client";
                        handleMessageClient(clientName, task.id || task._id);
                      }}
                      title={`Message ${task.clientId?.name || task.client || "client"}`}
                      className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Client:</span>
                    <span className="font-medium text-gray-900">
                      {task.clientId?.name || task.client || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Activity:</span>
                    <span className="text-gray-900">
                      {task.lastActivity ? new Date(task.lastActivity).toLocaleDateString() : task.deadline || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Budget:</span>
                    <span className="text-gray-900">
                      ${task.proposalId?.budget || task.budget || 0}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">
                      {getProgressValue(task.progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressValue(task.progress)}%` }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewTask(task.id || task._id);
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    View Completed Case
                  </Button>
                )}
              </motion.div>
            ))
            ) : (
              // Empty state
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <h4 className="text-lg font-medium mb-2">No Active Tasks</h4>
                <p className="text-sm mb-4">You don't have any active cases at the moment.</p>
                <Button 
                  onClick={handleCreateNewTask}
                  size="sm"
                  style={{ backgroundColor: "#0288D1", color: "white" }}
                  className="hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Proposal
                </Button>
              </div>
            )}
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
              onClick={handleViewAllActivity}
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {Array.isArray(recentActivity) && recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => {
                // Format activity data for display
                const getActivityIcon = (type: string) => {
                  switch (type) {
                    case "proposal":
                      return <FileText className="w-4 h-4" />;
                    case "message":
                      return <MessageCircle className="w-4 h-4" />;
                    case "notification":
                      return <Bell className="w-4 h-4" />;
                    case "case":
                      return <Briefcase className="w-4 h-4" />;
                    default:
                      return <Activity className="w-4 h-4" />;
                  }
                };

                const getActivityText = (activity: any) => {
                  if (activity.type === "proposal") {
                    return `${activity.action} proposal for ${activity.data?.request?.title || "visa application"}`;
                  } else if (activity.type === "message") {
                    return `${activity.action} message ${activity.action === "sent" ? "to" : "from"} ${
                      activity.data?.sender?.name || activity.data?.receiver?.name || "client"
                    }`;
                  } else if (activity.message) {
                    // For notification format
                    return activity.message;
                  } else {
                    return activity.action || "Activity update";
                  }
                };

                const getActivityTime = (activity: any) => {
                  const timestamp = activity.timestamp || activity.createdAt;
                  if (!timestamp) return "Recently";
                  
                  const date = new Date(timestamp);
                  const now = new Date();
                  const diffMs = now.getTime() - date.getTime();
                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                  const diffDays = Math.floor(diffHours / 24);
                  
                  if (diffHours < 1) return "Just now";
                  if (diffHours < 24) return `${diffHours}h ago`;
                  if (diffDays < 7) return `${diffDays}d ago`;
                  return date.toLocaleDateString();
                };

                return (
                  <motion.div
                    key={activity.id || index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      // Navigate to relevant page based on activity type
                      if (activity.type === "proposal" && activity.data?.request?.id) {
                        navigate(`/case/${activity.data.request.id}`);
                      } else if (activity.type === "message") {
                        navigate('/messages');
                      } else if (activity.type === "notification") {
                        navigate('/notifications');
                      }
                    }}
                    title="Click to view details"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium mt-1"
                      style={{ backgroundColor: "#326dee" }}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {getActivityText(activity)}
                      </p>
                      {activity.data?.content && (
                        <p className="text-sm text-gray-600 truncate">
                          "{activity.data.content}"
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {getActivityTime(activity)}
                      </p>
                    </div>
                    {!activity.isRead && activity.isRead !== undefined && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Calendar,
  MessageCircle,
  Star,
  Upload,
  Bot,
  ArrowRight,
  Plus,
  Globe,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api, DashboardStats, VisaRequest, Proposal } from "@shared/api";
import { useAuth } from "../auth/auth-context";

interface DashboardOverviewProps {
  onNavigate: (view: string) => void;
  dashboardStats?: DashboardStats | null;
  visaRequests?: VisaRequest[];
  proposals?: Proposal[];
}

export function DashboardOverview({ 
  onNavigate, 
  dashboardStats, 
  visaRequests = [], 
  proposals = [] 
}: DashboardOverviewProps) {
  const [clickedAction, setClickedAction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(!dashboardStats);
  const [localStats, setLocalStats] = useState<DashboardStats | null>(dashboardStats || null);
  const [activeApplications, setActiveApplications] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch dashboard stats, active applications, and recent activity in parallel
        const [stats, applications] = await Promise.all([
          dashboardStats ? Promise.resolve(dashboardStats) : api.getDashboardStats(),
          api.getActiveApplications()
        ]);
        
        setLocalStats(stats);
        setActiveApplications(applications);
        
        // Simulate recent activity - in a real app this would come from the API
        setRecentActivity([
          {
            type: "proposal",
            message: "New proposal received for Canada PR",
            time: "2 hours ago",
            icon: Users,
            color: "text-sage-green-600",
          },
          {
            type: "document",
            message: "Passport copy uploaded successfully",
            time: "4 hours ago",
            icon: Upload,
            color: "text-royal-blue-600",
          },
          {
            type: "message",
            message: "New message from immigration advisor",
            time: "1 day ago",
            icon: MessageCircle,
            color: "text-gold-600",
          },
          {
            type: "progress",
            message: "Application status updated to 'Under Review'",
            time: "2 days ago",
            icon: Clock,
            color: "text-cool-gray-600",
          },
        ]);
        
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
    
    // Set up polling for real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, [user, dashboardStats]);

  const stats = [
    {
      label: "Active Requests",
      value: localStats?.activeRequests?.toString() || "0",
      change: `${localStats?.totalRequests || 0} total requests`,
      icon: FileText,
      color: "from-royal-blue-500 to-sky-blue-400",
      trend: "up" as const,
      clickAction: () => onNavigate("my-requests"),
    },
    {
      label: "Proposals Received",
      value: localStats?.proposalsReceived?.toString() || "0",
      change: `${localStats?.pendingProposals || 0} pending review`,
      icon: Users,
      color: "from-sage-green-500 to-mint-green-400",
      trend: "up" as const,
      clickAction: () => onNavigate("agent-proposals"),
    },
    {
      label: "Completed Cases",
      value: localStats?.completedCases?.toString() || "0",
      change: localStats?.totalEarnings ? `$${localStats.totalEarnings} saved` : "Great progress!",
      icon: CheckCircle,
      color: "from-gold-500 to-sandstone-400",
      trend: "neutral" as const,
      clickAction: () => onNavigate("active-cases"),
    },
  ];

  const quickActions = [
    {
      title: "Post New Request",
      description: "Start a new visa application",
      icon: Plus,
      action: () => onNavigate("my-requests"),
      color: "from-royal-blue-500 to-sky-blue-400",
    },
    {
      title: "AI Smart Write",
      description: "Generate application text",
      icon: Bot,
      action: () => onNavigate("ai-assistant"),
      color: "from-sage-green-500 to-mint-green-400",
    },
    {
      title: "Upload Documents",
      description: "Add required documents",
      icon: Upload,
      action: () => onNavigate("documents"),
      color: "from-gold-500 to-sandstone-400",
    },
    {
      title: "Schedule Call",
      description: "Book agent consultation",
      icon: Calendar,
      action: () => onNavigate("calendar"),
      color: "from-royal-blue-600 to-royal-blue-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 rounded-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-heading font-bold text-cool-gray-800 mb-2">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-base text-cool-gray-600 mb-3">
              You have {localStats?.activeCases || 0} active applications and {localStats?.recentActivity?.messages?.length || 0} new messages.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-sage-green-100 text-sage-green-700">
                Premium Member
              </Badge>
              <Badge className="bg-royal-blue-100 text-royal-blue-700">
                Verified Client
              </Badge>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="premium"
              size="default"
              onClick={() => onNavigate("my-requests")}
              className="group"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Application
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const isActiveRequests = index === 0;
          const isProposalsReceived = index === 1;
          const isDocumentsUploaded = index === 2;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -2, scale: 1.01 }}
              onClick={stat.clickAction}
              className={`h-auto glass-card p-4 rounded-xl transition-all duration-300 border cursor-pointer ${
                isActiveRequests
                  ? "border-royal-blue-200 hover:border-royal-blue-300 hover:shadow-lg"
                  : isProposalsReceived
                    ? "border-sage-green-200 hover:border-sage-green-300 hover:shadow-lg"
                    : "border-gold-200 hover:border-gold-300 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActiveRequests
                      ? "bg-royal-blue-100"
                      : isProposalsReceived
                        ? "bg-sage-green-100"
                        : "bg-gold-100"
                  }`}
                >
                  <stat.icon
                    className={`w-5 h-5 ${
                      isActiveRequests
                        ? "text-royal-blue-600"
                        : isProposalsReceived
                          ? "text-sage-green-600"
                          : "text-gold-600"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-heading font-bold text-cool-gray-800">
                      {stat.value}
                    </h3>
                    {stat.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-sage-green-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-cool-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p
                    className={`text-xs ${
                      stat.trend === "up"
                        ? "text-sage-green-600"
                        : "text-cool-gray-500"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Applications */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card p-6 rounded-3xl h-fit"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-cool-gray-800">
                Active Applications
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("my-requests")}
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {activeApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-white/30 rounded-2xl border border-white/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-cool-gray-800">
                        {app.title}
                      </h3>
                      <p className="text-sm text-cool-gray-600">
                        Agent: {app.agent}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        app.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : app.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {app.priority}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cool-gray-600">Progress</span>
                      <span className="font-medium">{app.progress}%</span>
                    </div>
                    <div className="w-full bg-cool-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-royal h-2 rounded-full transition-all duration-500"
                        style={{ width: `${app.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cool-gray-600">Due Date</span>
                      <span className="font-medium">{app.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card p-6 rounded-3xl"
          >
            <h2 className="text-xl font-heading font-bold text-cool-gray-800 mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setClickedAction(index);
                    action.action();
                    // Reset the glow after 2 seconds
                    setTimeout(() => setClickedAction(null), 2000);
                  }}
                  className="w-full p-4 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/20 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-cool-gray-100 rounded-xl flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-cool-gray-600" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-cool-gray-800">
                        {action.title}
                      </h3>
                      <p className="text-sm text-cool-gray-600">
                        {action.description}
                      </p>
                    </div>
                    {/* Themed Badge with Blue Glow Effect */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 ${
                        clickedAction === index
                          ? "bg-gradient-to-br from-royal-blue-500 to-royal-blue-600 shadow-lg shadow-royal-blue-500/50 ring-2 ring-royal-blue-400 ring-opacity-75"
                          : `bg-gradient-to-br ${action.color}`
                      }`}
                    >
                      <span className="text-white font-bold text-xs">
                        {index === 0
                          ? "3"
                          : index === 1
                            ? "AI"
                            : index === 2
                              ? "24"
                              : "📅"}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-cool-gray-800">
                Recent Activity
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate("notifications")}
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 ${activity.color}`}
                  >
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cool-gray-800 leading-relaxed">
                      {activity.message}
                    </p>
                    <p className="text-xs text-cool-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

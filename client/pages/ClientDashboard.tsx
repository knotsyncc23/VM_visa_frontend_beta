import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Search,
  Plus,
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  User,
  LogOut,
  FileText,
  Users,
  Upload,
  Menu,
  Eye,
  Edit,
  Shield,
  ChevronDown,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import dashboard components
import { MyRequests } from "@/components/dashboard/my-requests";
import { AgentProposals } from "@/components/dashboard/agent-proposals";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { DocumentUpload } from "@/components/dashboard/document-upload";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { FloatingAIAssistant } from "@/components/dashboard/floating-ai-assistant";
import { BrowseAgentsFiltered } from "@/components/dashboard/browse-agents-filtered";
import { ProfessionalSidebar } from "@/components/dashboard/shared/ProfessionalSidebar";
import { useAuth } from "@/components/auth/auth-context";
import { api, DashboardStats, VisaRequest, Proposal } from "@shared/api";

type DashboardView =
  | "overview"
  | "my-requests"
  | "agent-proposals"
  | "progress"
  | "documents"
  | "browse-agents"
  | "settings";

export default function ClientDashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFloatingAI, setShowFloatingAI] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [visaRequests, setVisaRequests] = useState<VisaRequest[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoCollapseTimer, setAutoCollapseTimer] = useState<NodeJS.Timeout | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch dashboard stats
        const stats = await api.getDashboardStats();
        setDashboardStats(stats);
        
        // Fetch user's visa requests
        const requests = await api.getVisaRequests({ userId: user.id });
        setVisaRequests(Array.isArray(requests) ? requests : []);
        
        // Fetch proposals for user's requests
        if (Array.isArray(requests) && requests.length > 0) {
          const requestIds = requests.map(req => req.id);
          const proposalsData = await api.getProposals({ 
            visaRequestIds: requestIds.join(',') 
          });
          setProposals(Array.isArray(proposalsData) ? proposalsData : []);
        }
        
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Set empty arrays as fallback
        setVisaRequests([]);
        setProposals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const handleViewProfile = () => {
    navigate("/profile");
    setShowProfileDropdown(false);
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
    setShowProfileDropdown(false);
  };

  const handleAccountSettings = () => {
    navigate("/settings");
    setShowProfileDropdown(false);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
    setShowProfileDropdown(false);
  };

  const proceedLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  // Navigation handler for sidebar
  const handleSidebarNavigation = (page: string) => {
    if (page === "overview") {
      setCurrentView("overview");
    } else if (page === "escrow") {
      navigate("/escrow");
    } else if (
      ["chat", "messages", "calendar", "support", "settings"].includes(page)
    ) {
      navigate(`/${page}`);
    }
  };

  // Auto-collapse functionality
  const startAutoCollapseTimer = () => {
    if (autoCollapseTimer) {
      clearTimeout(autoCollapseTimer);
    }
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 10000);
    setAutoCollapseTimer(timer);
  };

  const clearAutoCollapseTimer = () => {
    if (autoCollapseTimer) {
      clearTimeout(autoCollapseTimer);
      setAutoCollapseTimer(null);
    }
  };

  const handleSidebarToggle = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);

    if (!newState) {
      startAutoCollapseTimer();
    } else {
      clearAutoCollapseTimer();
    }
  };

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "vm-visa-dashboard-state",
        JSON.stringify({
          currentView,
          sidebarCollapsed,
          timestamp: Date.now(),
        }),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentView, sidebarCollapsed]);

  // Restore saved state
  useEffect(() => {
    const saved = localStorage.getItem("vm-visa-dashboard-state");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const timeDiff = Date.now() - state.timestamp;

        // Only restore if less than 24 hours old
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setCurrentView(state.currentView);
          setSidebarCollapsed(state.sidebarCollapsed || false);
        }
      } catch (error) {
        console.error("Failed to restore dashboard state:", error);
      }
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearAutoCollapseTimer();
    };
  }, [autoCollapseTimer]);

  // Click outside handler for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const tabItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "my-requests",
      label: "My Requests",
      icon: FileText,
      badge: dashboardStats?.totalRequests?.toString() || visaRequests.length.toString(),
    },
    {
      id: "progress",
      label: "Progress",
      icon: Clock,
      badge: dashboardStats?.activeRequests?.toString() || proposals.length.toString(),
    },
    {
      id: "documents",
      label: "Documents",
      icon: Upload,
      badge: null,
    },
    {
      id: "browse-agents",
      label: "Browse Agents",
      icon: Users,
      badge: null,
    },
    {
      id: "agent-proposals",
      label: "Agent Proposals",
      icon: Users,
      badge: null,
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <DashboardOverview onNavigate={(view: string) => setCurrentView(view as DashboardView)} />;
      case "my-requests":
        return <MyRequests />;
      case "progress":
        return <ProgressTracker />;
      case "documents":
        return <DocumentUpload />;
      case "browse-agents":
        return <BrowseAgentsFiltered />;
      case "agent-proposals":
        return <AgentProposals />;
      case "settings":
        return <div className="p-6"><h2 className="text-2xl font-bold">Settings</h2><p>Settings panel coming soon...</p></div>;
      default:
        return <DashboardOverview onNavigate={(view: string) => setCurrentView(view as DashboardView)} />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FEFEFE" }}>
      {/* Professional Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <ProfessionalSidebar
          userType="client"
          currentPage={currentView}
          onNavigate={handleSidebarNavigation}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? "80px" : "320px" }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-40 px-6 py-4 border-b"
          style={{
            backgroundColor: "#F5FAFE",
            borderColor: "#E1E8ED",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            {/* Left: Page Title */}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#455A64" }}>
                {tabItems.find((tab) => tab.id === currentView)?.label ||
                  "Dashboard"}
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "#455A64", opacity: 0.7 }}
              >
                Manage your immigration applications and connect with agents
              </p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button
                onClick={() => navigate("/notifications")}
                variant="outline"
                size="sm"
                className="relative border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>

              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: "#0288D1" }}
                  >
                    JD
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#455A64" }}
                  >
                    John Doe
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      showProfileDropdown ? "rotate-180" : "",
                    )}
                    style={{ color: "#455A64" }}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border border-gray-200 z-50"
                      style={{ backgroundColor: "#FEFEFE" }}
                    >
                      {/* User Info Header */}
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                            style={{ backgroundColor: "#0288D1" }}
                          >
                            JD
                          </div>
                          <div>
                            <p
                              className="font-semibold text-sm"
                              style={{ color: "#455A64" }}
                            >
                              John Doe
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "#455A64", opacity: 0.7 }}
                            >
                              john.doe@email.com
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button
                          onClick={handleViewProfile}
                          className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors text-left group"
                        >
                          <User
                            className="w-4 h-4"
                            style={{ color: "#0288D1" }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#455A64" }}
                          >
                            View Profile
                          </span>
                        </button>

                        <button
                          onClick={handleEditProfile}
                          className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors text-left group"
                        >
                          <Edit
                            className="w-4 h-4"
                            style={{ color: "#0288D1" }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#455A64" }}
                          >
                            Edit Profile
                          </span>
                        </button>

                        <button
                          onClick={handleAccountSettings}
                          className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors text-left group"
                        >
                          <UserCog
                            className="w-4 h-4"
                            style={{ color: "#0288D1" }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#455A64" }}
                          >
                            Account Settings
                          </span>
                        </button>

                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={confirmLogout}
                            className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-red-50 transition-colors text-left group"
                          >
                            <LogOut className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium text-red-600">
                              Logout
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className="p-1 rounded-lg overflow-x-auto"
            style={{ backgroundColor: "#E0F2E7" }}
          >
            <div className="flex space-x-1">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentView === tab.id;

                return (
                  <Button
                    key={tab.id}
                    onClick={() => setCurrentView(tab.id as DashboardView)}
                    variant="ghost"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                      isActive ? "shadow-sm" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? "#FEFEFE" : "transparent",
                      color: "#455A64",
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-sm">{tab.label}</span>
                    {tab.badge && (
                      <Badge
                        className="ml-1 text-xs flex-shrink-0"
                        style={{
                          backgroundColor: isActive ? "#0288D1" : "#F3E5F5",
                          color: isActive ? "white" : "#455A64",
                        }}
                      >
                        {tab.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating AI Assistant */}
        <FloatingAIAssistant />
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
            >
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#FFF5F5" }}
                >
                  <LogOut className="w-6 h-6 text-red-500" />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#455A64" }}
                >
                  Confirm Logout
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "#455A64", opacity: 0.7 }}
                >
                  Are you sure you want to logout? You will need to sign in
                  again to access your dashboard.
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowLogoutConfirm(false)}
                    variant="outline"
                    className="flex-1 border-gray-300"
                    style={{ color: "#455A64" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={proceedLogout}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Logout
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

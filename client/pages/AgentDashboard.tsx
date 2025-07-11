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
  Star,
  MessageCircle,
  Menu,
  Eye,
  Edit,
  Shield,
  Home,
  Inbox,
  Briefcase,
  MessagesSquare,
  HelpCircle,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  UserCheck,
  Building,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import dashboard components for agent
import { AgentOverview } from "@/components/dashboard/agent/agent-overview";
import { IncomingRequests } from "@/components/dashboard/agent/incoming-requests";
import { MyProposals } from "@/components/dashboard/agent/my-proposals";
import { ActiveProjects } from "@/components/dashboard/agent/active-projects";
import { ClientChat } from "@/components/dashboard/agent/client-chat";
import { AgentDocuments } from "@/components/dashboard/agent/agent-documents";
import { AgentAnalytics } from "@/components/dashboard/agent/agent-analytics";
import { AgentSettings } from "@/components/dashboard/agent/agent-settings";
import { ProfessionalSidebar } from "@/components/dashboard/shared/ProfessionalSidebar";
import { useAuth } from "@/components/auth/auth-context";

type AgentDashboardView =
  | "overview"
  | "incoming-requests"
  | "my-proposals"
  | "active-projects"
  | "documents"
  | "analytics";

type FilterPeriod = "today" | "7days" | "month" | "year";

export default function AgentDashboard() {
  const [currentView, setCurrentView] =
    useState<AgentDashboardView>("overview");
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("month");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [autoCollapseTimer, setAutoCollapseTimer] =
    useState<NodeJS.Timeout | null>(null);
  const { logout } = useAuth();

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "vm-visa-agent-dashboard-state",
        JSON.stringify({
          currentView,
          sidebarCollapsed,
          filterPeriod,
          timestamp: Date.now(),
        }),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentView, sidebarCollapsed, filterPeriod]);

  // Restore saved state
  useEffect(() => {
    const saved = localStorage.getItem("vm-visa-agent-dashboard-state");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const timeDiff = Date.now() - state.timestamp;

        // Only restore if less than 24 hours old
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setCurrentView(state.currentView);
          setSidebarCollapsed(state.sidebarCollapsed || false);
          setFilterPeriod(state.filterPeriod || "month");
        }
      } catch (error) {
        console.error("Failed to restore agent dashboard state:", error);
      }
    }
  }, []);

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
    console.log("Navigating to:", page);

    if (page === "overview") {
      setCurrentView("overview");
    } else if (page === "insights") {
      navigate("/agent-insights");
    } else if (page === "file-manager") {
      navigate("/file-manager");
    } else if (page === "payments") {
      navigate("/payments");
    } else if (page === "tools") {
      navigate("/tools");
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

  const filterTabs = [
    { id: "today", label: "Today" },
    { id: "7days", label: "7 Days" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ] as const;

  const tabItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "incoming-requests",
      label: "Incoming Requests",
      icon: Inbox,
      badge: "12",
    },
    {
      id: "my-proposals",
      label: "My Proposals",
      icon: FileText,
      badge: "8",
    },
    {
      id: "active-projects",
      label: "Active Projects",
      icon: Briefcase,
      badge: "5",
    },
    {
      id: "documents",
      label: "Documents",
      icon: Upload,
      badge: null,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null,
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <AgentOverview filterPeriod={filterPeriod} />;
      case "incoming-requests":
        return <IncomingRequests />;
      case "my-proposals":
        return <MyProposals />;
      case "active-projects":
        return <ActiveProjects />;
      case "documents":
        return <AgentDocuments />;
      case "analytics":
        return <AgentAnalytics filterPeriod={filterPeriod} />;
      default:
        return <AgentOverview filterPeriod={filterPeriod} />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "overview":
        return "Dashboard Overview";
      case "incoming-requests":
        return "Incoming Requests";
      case "my-proposals":
        return "My Proposals";
      case "active-projects":
        return "Active Projects";
      case "documents":
        return "Document Center";
      case "analytics":
        return "Analytics & Reports";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FEFEFE" }}>
      {/* Professional Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <ProfessionalSidebar
          userType="agent"
          currentPage={currentView}
          onNavigate={handleSidebarNavigation}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "320px",
        }}
      >
        {/* Top Header */}
        <header
          className="shadow-sm px-8 py-4"
          style={{
            backgroundColor: "#FEFEFE",
            borderBottom: "1px solid #E1E8ED",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#455A64" }}>
                {getPageTitle()}
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "#455A64", opacity: 0.7 }}
              >
                Manage your immigration services and client relationships
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Filter Period Tabs */}
              {(currentView === "overview" || currentView === "analytics") && (
                <div className="flex border border-gray-300 rounded-lg p-1">
                  {filterTabs.map((tab) => (
                    <Button
                      key={tab.id}
                      onClick={() => setFilterPeriod(tab.id)}
                      variant="ghost"
                      size="sm"
                      className={`rounded-md ${
                        filterPeriod === tab.id ? "bg-white shadow-sm" : ""
                      }`}
                      style={{
                        backgroundColor:
                          filterPeriod === tab.id ? "#E0F2E7" : "transparent",
                        color: "#455A64",
                      }}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Actions */}
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>

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
                  8
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
                    SA
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#455A64" }}
                  >
                    Sarah Ahmad
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
                            SA
                          </div>
                          <div>
                            <p
                              className="font-semibold text-sm"
                              style={{ color: "#455A64" }}
                            >
                              Sarah Ahmad
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "#455A64", opacity: 0.7 }}
                            >
                              sarah.ahmad@vmvisa.com
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
        </header>

        {/* Main Dashboard Content */}
        <main className="p-8">
          {/* Tab Navigation */}
          <div className="mb-6 flex space-x-1 border-b border-gray-200">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;

              return (
                <Button
                  key={tab.id}
                  onClick={() => setCurrentView(tab.id as AgentDashboardView)}
                  variant="ghost"
                  className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                    isActive
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{
                    color: isActive ? "#0288D1" : "#455A64",
                    backgroundColor: "transparent",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.badge && (
                    <Badge
                      className="ml-1"
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

          {/* Content Area */}
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

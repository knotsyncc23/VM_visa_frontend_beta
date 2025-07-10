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
  Users,
  User,
  LogOut,
  FileText,
  Upload,
  Star,
  MessageCircle,
  Menu,
  Eye,
  Edit,
  Shield,
  Home,
  Briefcase,
  Building,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Award,
  MapPin,
  Mail,
  Phone,
  Globe,
  HelpCircle,
  ChevronDown,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import organization dashboard components
import { OrganizationOverview } from "@/components/dashboard/organization/organization-overview";
import { ManageAgents } from "@/components/dashboard/organization/manage-agents";
import { CaseManagement } from "@/components/dashboard/organization/case-management";
import { OrganizationAnalytics } from "@/components/dashboard/organization/organization-analytics";
import { OrganizationSettings } from "@/components/dashboard/organization/organization-settings";
import { OrganizationNotifications } from "@/components/dashboard/organization/organization-notifications";
import { ProfessionalSidebar } from "@/components/dashboard/shared/ProfessionalSidebar";
import { useAuth } from "@/components/auth/auth-context";

type OrganizationDashboardView =
  | "overview"
  | "manage-agents"
  | "case-requests"
  | "analytics";

export default function OrganizationDashboard() {
  const [currentView, setCurrentView] =
    useState<OrganizationDashboardView>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notifications, setNotifications] = useState(8);
  const [autoCollapseTimer, setAutoCollapseTimer] =
    useState<NodeJS.Timeout | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "vm-visa-org-dashboard-state",
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
    const saved = localStorage.getItem("vm-visa-org-dashboard-state");
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
        console.error("Failed to restore organization dashboard state:", error);
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
    if (page === "overview") {
      setCurrentView("overview");
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

  const tabItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: Home,
      badge: null,
    },
    {
      id: "manage-agents",
      label: "Manage Agents",
      icon: Users,
      badge: "12",
    },
    {
      id: "case-requests",
      label: "Case Requests",
      icon: Briefcase,
      badge: "24",
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
        return <OrganizationOverview />;
      case "manage-agents":
        return <ManageAgents />;
      case "case-requests":
        return <CaseManagement />;
      case "analytics":
        return <OrganizationAnalytics />;
      default:
        return <OrganizationOverview />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "overview":
        return "Organization Dashboard";
      case "manage-agents":
        return "Manage Agents";
      case "case-requests":
        return "Case Requests";
      case "analytics":
        return "Analytics & Reports";
      default:
        return "Organization Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FEFEFE" }}>
      {/* Professional Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <ProfessionalSidebar
          userType="organization"
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
                Manage your organization's immigration services and agents
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Agent
              </Button>

              {/* Notifications */}
              <Button
                variant="outline"
                size="sm"
                className="relative border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications}
                </Badge>
              </Button>

              {/* Organization Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: "#0288D1" }}
                  >
                    VM
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#455A64" }}
                  >
                    VM Visa Corp
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
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                            style={{ backgroundColor: "#0288D1" }}
                          >
                            VM
                          </div>
                          <div>
                            <p
                              className="font-semibold text-sm"
                              style={{ color: "#455A64" }}
                            >
                              VM Visa Corp
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "#455A64", opacity: 0.7 }}
                            >
                              contact@vmvisa.com
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
                          <Building
                            className="w-4 h-4"
                            style={{ color: "#0288D1" }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#455A64" }}
                          >
                            Organization Profile
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
                  onClick={() =>
                    setCurrentView(tab.id as OrganizationDashboardView)
                  }
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

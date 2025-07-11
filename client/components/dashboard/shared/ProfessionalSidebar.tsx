import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  User,
  MessageCircle,
  Calendar,
  HelpCircle,
  Settings,
  Bot,
  Edit,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
  BarChart3,
  Bell,
  FileText,
  FolderOpen,
  TrendingUp,
  Wrench,
  CreditCard,
  BrainCircuit,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-context";

interface ProfessionalSidebarProps {
  userType: "client" | "agent" | "organization";
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

interface UserProfile {
  name: string;
  role: string;
  location: string;
  status: string;
  avatar?: string;
  completionPercentage: number;
  bio?: string;
  email?: string;
  phone?: string;
  joinDate?: string;
}

// Calculate profile completion percentage
const calculateProfileCompletion = (user: any, userType: string): number => {
  if (!user) return 0;

  let completed = 0;
  let total = 0;

  // Basic fields for all users
  const basicFields = ["name", "email", "phone"];
  basicFields.forEach((field) => {
    total++;
    if (user[field] && user[field].trim()) completed++;
  });

  if (userType === "agent") {
    // Agent-specific fields
    const agentFields = ["title", "bio", "location", "experienceYears"];
    agentFields.forEach((field) => {
      total++;
      if (user[field] && (typeof user[field] === "string" ? user[field].trim() : user[field] > 0))
        completed++;
    });

    // Array fields
    total += 2; // specializations and languages
    if (user.specializations && user.specializations.length > 0) completed++;
    if (user.languages && user.languages.length > 0) completed++;
  } else if (userType === "client") {
    // Client-specific fields
    const clientFields = ["dateOfBirth", "nationality", "location"];
    clientFields.forEach((field) => {
      total++;
      if (user[field] && user[field].trim()) completed++;
    });
  }

  return Math.round((completed / total) * 100);
};

const getUserProfile = (userType: string, user?: any): UserProfile => {
  if (user) {
    // Use real user data when available
    const userTitle = user.title || (userType === 'agent' ? 'Immigration Consultant' : userType === 'client' ? 'Client' : 'Organization');
    const userLocation = user.location || 'Location not set';
    const userStatus = userType === 'agent' ? 'Premium' : userType === 'client' ? 'Verified Client' : 'Enterprise';
    const completionPercentage = calculateProfileCompletion(user, userType);
    
    return {
      name: user.name || 'User',
      role: userTitle,
      location: userLocation,
      status: userStatus,
      completionPercentage: completionPercentage,
      bio: user.bio || '',
      email: user.email || '',
      phone: user.phone || '',
      joinDate: userType === 'agent' ? `Licensed since ${user.experienceYears ? new Date().getFullYear() - user.experienceYears : '2020'}` : `Joined ${new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
    };
  }

  // Fallback to static data if no user data available
  switch (userType) {
    case "client":
      return {
        name: "John Doe",
        role: "Verified Client",
        location: "Toronto, Canada 🇨🇦",
        status: "Active",
        completionPercentage: 85,
        bio: "Software engineer looking to expand career opportunities in Canada. Passionate about technology and innovation.",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        joinDate: "Joined March 2024",
      };
    case "agent":
      return {
        name: "Sarah Wilson",
        role: "Premium Agent",
        location: "Vancouver, Canada 🇨🇦",
        status: "Premium",
        completionPercentage: 92,
        bio: "Licensed immigration consultant with 8+ years of experience. Specialized in skilled worker and family reunification cases.",
        email: "sarah.wilson@vmvisa.com",
        phone: "+1 (555) 987-6543",
        joinDate: "Licensed since 2016",
      };
    case "organization":
      return {
        name: "VM Visa Corp",
        role: "Certified Organization",
        location: "Multiple Offices 🌍",
        status: "Enterprise",
        completionPercentage: 96,
        bio: "Leading immigration consultancy serving clients worldwide. Trusted partner for businesses and individuals seeking immigration solutions.",
        email: "contact@vmvisa.com",
        phone: "+1 (555) 444-0123",
        joinDate: "Established 2010",
      };
    default:
      return {
        name: "User",
        role: "Member",
        location: "Location",
        status: "Active",
        completionPercentage: 50,
      };
  }
};

const dailyTips = [
  "💡 Keep your documents organized for faster processing",
  "🎯 Update your profile regularly to improve visibility",
  "⚡ Use our AI assistant for quick answers to common questions",
  "📋 Check your application status daily for updates",
  "🌟 Complete your profile to unlock premium features",
];

const getSidebarItems = (userType: string) => {
  if (userType === "agent") {
    return [
      { id: "overview", label: "Dashboard", icon: BarChart3 },
      { id: "messages", label: "Messages", icon: Mail, badge: 8 },
      { id: "calendar", label: "Calendar", icon: Calendar },
      { id: "file-manager", label: "File Manager", icon: FolderOpen },
      { id: "payments", label: "Payments & Invoices", icon: CreditCard },
      { id: "escrow", label: "Escrow Management", icon: Shield },
      { id: "insights", label: "Insights & Reports", icon: TrendingUp },
      { id: "tools", label: "Tools & Resources", icon: Wrench },
      { id: "settings", label: "Settings", icon: Settings },
    ];
  }

  // Default items for clients and organizations
  return [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "chat", label: "Chat", icon: MessageCircle, badge: 3 },
    { id: "messages", label: "Messages", icon: Mail, badge: 5 },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "escrow", label: "Escrow & Payments", icon: Shield },
    { id: "support", label: "Support & Help", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];
};

export const ProfessionalSidebar: React.FC<ProfessionalSidebarProps> = ({
  userType,
  currentPage,
  onNavigate,
  collapsed,
  onToggle,
}) => {
  const { user } = useAuth();
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const userProfile = getUserProfile(userType, user);
  const sidebarItems = getSidebarItems(userType);
  
  // Use profile completion from userProfile
  const completionPercentage = userProfile.completionPercentage;

  // Rotate daily tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % dailyTips.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ width: collapsed ? 80 : 320 }}
      animate={{ width: collapsed ? 80 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ backgroundColor: "#F5FAFE" }}
      className="h-full flex flex-col border-r border-gray-200 shadow-lg relative"
    >
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-6 z-10 rounded-full w-6 h-6 p-0 shadow-md"
        style={{ backgroundColor: "#FEFEFE", color: "#0288D1" }}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Profile Section */}
      <div
        style={{ backgroundColor: "#E0F2E7" }}
        className="p-4 border-b border-gray-200"
      >
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Profile Card */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{ backgroundColor: "#0288D1" }}
                  >
                    {getInitials(userProfile.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "#455A64" }}
                    >
                      {userProfile.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{ backgroundColor: "#F3E5F5", color: "#455A64" }}
                    >
                      {userProfile.role}
                    </Badge>
                  </div>
                </div>

                {/* Location and Status */}
                <div className="space-y-1">
                  <div
                    className="flex items-center text-xs"
                    style={{ color: "#455A64" }}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {userProfile.location}
                  </div>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor:
                        userProfile.status === "Premium" ||
                        userProfile.status === "Enterprise"
                          ? "#0288D1"
                          : "#E0F2E7",
                      color:
                        userProfile.status === "Premium" ||
                        userProfile.status === "Enterprise"
                          ? "white"
                          : "#455A64",
                    }}
                  >
                    {userProfile.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div
                    className="flex justify-between text-xs"
                    style={{ color: "#455A64" }}
                  >
                    <span>Profile Complete</span>
                    <span>
                      {`${completionPercentage}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: "#0288D1",
                        width: `${completionPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Daily Tip */}
                <motion.div
                  key={currentTip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs p-2 rounded-lg"
                  style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
                >
                  {dailyTips[currentTip]}
                </motion.div>

                {/* Expand/Collapse Profile Button */}
                <Button
                  onClick={() => setProfileExpanded(!profileExpanded)}
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs h-8"
                  style={{ color: "#0288D1" }}
                >
                  {profileExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      Less Info
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      More Info
                    </>
                  )}
                </Button>

                {/* Expanded Profile Info */}
                <AnimatePresence>
                  {profileExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden space-y-2"
                    >
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "#FEFEFE" }}
                      >
                        <p
                          className="text-xs mb-2"
                          style={{ color: "#455A64" }}
                        >
                          {userProfile.bio}
                        </p>
                        <div
                          className="space-y-1 text-xs"
                          style={{ color: "#455A64" }}
                        >
                          <div className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {userProfile.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {userProfile.phone}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            {userProfile.joinDate}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-2 text-xs h-7"
                          style={{ backgroundColor: "#0288D1", color: "white" }}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Update Profile
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "#0288D1" }}
              >
                {getInitials(userProfile.name)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <div key={item.id} className="px-3">
              <Button
                onClick={() => onNavigate(item.id)}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 transition-all duration-200",
                  collapsed ? "px-0 justify-center" : "px-3",
                )}
                style={{
                  backgroundColor: isActive ? "#0288D1" : "transparent",
                  color: isActive ? "white" : "#455A64",
                }}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto text-xs"
                          style={{
                            backgroundColor: isActive
                              ? "rgba(255,255,255,0.2)"
                              : "#0288D1",
                            color: isActive ? "white" : "white",
                          }}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Button>
            </div>
          );
        })}
      </div>

      {/* AI Assistant Button */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn(
            "w-full transition-all duration-200",
            collapsed ? "px-0 justify-center h-10" : "px-3 h-12",
          )}
          style={{
            backgroundColor: "#F3E5F5",
            color: "#455A64",
          }}
          onClick={() => {
            // Toggle AI Assistant visibility
            const event = new CustomEvent('toggleAIAssistant');
            window.dispatchEvent(event);
          }}
        >
          <div className="flex items-center space-x-3">
            <Bot className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <div className="text-left">
                <div className="text-sm font-medium">AI Assistant 🤖</div>
                <div className="text-xs opacity-70">Get instant help</div>
              </div>
            )}
          </div>
        </Button>
      </div>
    </motion.div>
  );
};

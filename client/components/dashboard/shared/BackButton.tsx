import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface BackButtonProps {
  customPath?: string;
  label?: string;
  showBreadcrumb?: boolean;
  dashboardType?: "client" | "agent" | "organization";
}

export const BackButton: React.FC<BackButtonProps> = ({
  customPath,
  label = "Back to Dashboard",
  showBreadcrumb = true,
  dashboardType = "client",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (customPath) {
      navigate(customPath);
    } else {
      switch (dashboardType) {
        case "agent":
          navigate("/agent-dashboard");
          break;
        case "organization":
          navigate("/org-dashboard");
          break;
        case "client":
        default:
          navigate("/dashboard");
          break;
      }
    }
  };

  const getCurrentPageName = () => {
    const path = location.pathname;
    switch (path) {
      case "/chat":
        return "Chat";
      case "/messages":
        return "Messages";
      case "/calendar":
        return "Calendar";
      case "/support":
        return "Support & Help";
      case "/settings":
        return "Settings";
      default:
        return "Page";
    }
  };

  return (
    <div className="mb-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center space-x-2"
      >
        <Button
          onClick={handleBack}
          variant="ghost"
          size="sm"
          className="group flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
          style={{ color: "#0288D1" }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium text-sm">{label}</span>
        </Button>

        {showBreadcrumb && (
          <div
            className="flex items-center space-x-2 text-sm"
            style={{ color: "#455A64", opacity: 0.6 }}
          >
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="font-medium">{getCurrentPageName()}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

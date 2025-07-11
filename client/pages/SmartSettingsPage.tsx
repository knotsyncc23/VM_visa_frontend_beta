import React from "react";
import { useAuth } from "@/components/auth/auth-context";
import ClientSettingsPage from "./ClientSettingsPage";
import AgentSettingsPage from "./AgentSettingsPage";
import OrganizationSettingsPage from "./OrganizationSettingsPage";

const SmartSettingsPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5FAFE" }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Route to appropriate settings page based on user type
  switch (user.userType) {
    case "client":
      return <ClientSettingsPage />;
    case "agent":
      return <AgentSettingsPage />;
    case "organization":
      return <OrganizationSettingsPage />;
    default:
      return <ClientSettingsPage />; // Default fallback
  }
};

export default SmartSettingsPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
  Bell,
  Users,
  CreditCard,
  FileText,
  Save,
  Edit,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  Calendar,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export function OrganizationSettings() {
  const [activeTab, setActiveTab] = useState("organization");
  const [isEditing, setIsEditing] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: "organization", label: "Organization", icon: Building },
    { id: "team", label: "Team Management", icon: Users },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  const OrganizationTab = () => (
    <div className="space-y-6">
      {/* Organization Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: "#1A1A1A" }}>
            Organization Information
          </h3>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo */}
          <div className="text-center">
            <div
              className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center text-white font-bold text-4xl mb-4"
              style={{
                background: "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
              }}
            >
              GI
            </div>
            {isEditing && (
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
            )}
          </div>

          {/* Organization Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  defaultValue="Global Immigration Services"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  style={{
                    backgroundColor: isEditing ? "#F4F6FA" : "#F9FAFB",
                    border: "1px solid #D9D9D9",
                    color: "#1A1A1A",
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  License Number
                </label>
                <input
                  type="text"
                  defaultValue="ICCRC-R123456"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  style={{
                    backgroundColor: isEditing ? "#F4F6FA" : "#F9FAFB",
                    border: "1px solid #D9D9D9",
                    color: "#1A1A1A",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1A1A1A" }}
              >
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@globalimmig.com"
                disabled={!isEditing}
                className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                style={{
                  backgroundColor: isEditing ? "#F4F6FA" : "#F9FAFB",
                  border: "1px solid #D9D9D9",
                  color: "#1A1A1A",
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  style={{
                    backgroundColor: isEditing ? "#F4F6FA" : "#F9FAFB",
                    border: "1px solid #D9D9D9",
                    color: "#1A1A1A",
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  Website
                </label>
                <input
                  type="url"
                  defaultValue="https://globalimmig.com"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  style={{
                    backgroundColor: isEditing ? "#F4F6FA" : "#F9FAFB",
                    border: "1px solid #D9D9D9",
                    color: "#1A1A1A",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1A1A1A" }}
              >
                Address
              </label>
              <textarea
                rows={3}
                defaultValue="123 Immigration Street, Suite 456, Toronto, ON M5V 3A1, Canada"
                disabled={!isEditing}
                className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 resize-none"
                style={{
                  backgroundColor: isEditing ? "#F4F6FA" : "#F9FAFB",
                  border: "1px solid #D9D9D9",
                  color: "#1A1A1A",
                }}
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#0052CC", color: "white" }}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* License Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#1A1A1A" }}>
          License Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#EAF2FF" }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5" style={{ color: "#10B981" }} />
              <span className="font-medium" style={{ color: "#10B981" }}>
                License Active
              </span>
            </div>
            <div className="space-y-2 text-sm" style={{ color: "#666666" }}>
              <div className="flex justify-between">
                <span>License Type:</span>
                <span className="font-medium">ICCRC Regulated</span>
              </div>
              <div className="flex justify-between">
                <span>Issue Date:</span>
                <span className="font-medium">Jan 15, 2020</span>
              </div>
              <div className="flex justify-between">
                <span>Expiry Date:</span>
                <span className="font-medium">Dec 31, 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Days Remaining:</span>
                <span className="font-medium text-orange-600">345 days</span>
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#FEF3E2" }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5" style={{ color: "#F59E0B" }} />
              <span className="font-medium" style={{ color: "#F59E0B" }}>
                Renewal Reminder
              </span>
            </div>
            <p className="text-sm mb-3" style={{ color: "#666666" }}>
              Your license expires in 345 days. We recommend starting the
              renewal process 90 days before expiry.
            </p>
            <Button
              size="sm"
              variant="outline"
              style={{ color: "#F59E0B", borderColor: "#F59E0B" }}
            >
              Set Reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      {/* API Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#1A1A1A" }}>
          API Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1A1A1A" }}
            >
              API Key
            </label>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  placeholder=""
                  value={process.env.NEXT_PUBLIC_STRIPE_KEY || ""}
                  readOnly
                  className="w-full px-3 py-2 pr-10 rounded-lg bg-gray-50"
                  style={{
                    border: "1px solid #D9D9D9",
                    color: "#1A1A1A",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: "#666666" }}
                >
                  {showApiKey ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Webhook URL
            </label>
            <input
              type="url"
              placeholder="https://yoursite.com/webhook"
              className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "#F4F6FA",
                border: "1px solid #D9D9D9",
                color: "#1A1A1A",
              }}
            />
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#1A1A1A" }}>
          Admin Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <h4 className="font-medium" style={{ color: "#1A1A1A" }}>
                Two-Factor Authentication
              </h4>
              <p className="text-sm" style={{ color: "#666666" }}>
                Add an extra layer of security to admin accounts
              </p>
            </div>
            <Badge style={{ backgroundColor: "#10B981", color: "white" }}>
              <Check className="w-3 h-3 mr-1" />
              Enabled
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <h4 className="font-medium" style={{ color: "#1A1A1A" }}>
                Session Timeout
              </h4>
              <p className="text-sm" style={{ color: "#666666" }}>
                Automatically log out inactive users
              </p>
            </div>
            <select
              className="px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "#F4F6FA",
                border: "1px solid #D9D9D9",
                color: "#1A1A1A",
              }}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="480">8 hours</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <h4 className="font-medium" style={{ color: "#1A1A1A" }}>
                IP Whitelist
              </h4>
              <p className="text-sm" style={{ color: "#666666" }}>
                Restrict access to specific IP addresses
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "organization":
        return <OrganizationTab />;
      case "security":
        return <SecurityTab />;
      case "team":
        return (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <Users
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "#0052CC" }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Team Management
            </h3>
            <p style={{ color: "#666666" }}>
              Manage your team members, roles, and permissions.
            </p>
          </div>
        );
      case "notifications":
        return (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <Bell
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "#0052CC" }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Notification Settings
            </h3>
            <p style={{ color: "#666666" }}>
              Configure email, SMS, and push notification preferences.
            </p>
          </div>
        );
      case "billing":
        return (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <CreditCard
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "#0052CC" }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Billing & Payments
            </h3>
            <p style={{ color: "#666666" }}>
              Manage your subscription, payment methods, and billing history.
            </p>
          </div>
        );
      case "documents":
        return (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <FileText
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "#0052CC" }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Document Templates
            </h3>
            <p style={{ color: "#666666" }}>
              Manage document templates and legal forms.
            </p>
          </div>
        );
      default:
        return <OrganizationTab />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6" style={{ color: "#1A1A1A" }}>
          Settings
        </h2>
        <div className="space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id ? "text-white" : "hover:bg-gray-50"
              }`}
              style={{
                backgroundColor:
                  activeTab === tab.id ? "#0052CC" : "transparent",
                color: activeTab === tab.id ? "white" : "#1A1A1A",
              }}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="lg:col-span-3">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}

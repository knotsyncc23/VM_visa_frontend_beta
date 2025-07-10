import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon,
  Key,
  Database,
  Wifi,
  Monitor,
} from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    updates: true,
    marketing: false,
  });
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/Toronto");

  const sections: SettingsSection[] = [
    {
      id: "profile",
      title: "Profile Settings",
      description: "Manage your personal information and preferences",
      icon: User,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure how you receive updates and alerts",
      icon: Bell,
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Manage your account security and privacy settings",
      icon: Shield,
    },
    {
      id: "billing",
      title: "Billing & Payments",
      description: "View and manage your payment methods and billing",
      icon: CreditCard,
    },
    {
      id: "preferences",
      title: "App Preferences",
      description: "Customize your app experience and display settings",
      icon: SettingsIcon,
    },
    {
      id: "data",
      title: "Data & Privacy",
      description: "Control your data and privacy preferences",
      icon: Database,
    },
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              First Name
            </label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              Last Name
            </label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              Email Address
            </label>
            <input
              type="email"
              defaultValue="john.doe@email.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              Date of Birth
            </label>
            <input
              type="date"
              defaultValue="1990-01-15"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              Country
            </label>
            <select
              defaultValue="canada"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="canada">Canada</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="australia">Australia</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Profile Picture
        </h3>
        <div className="flex items-center space-x-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: "#0288D1" }}
          >
            JD
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              style={{ color: "#455A64" }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              style={{ color: "#455A64" }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button style={{ backgroundColor: "#0288D1", color: "white" }}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "email",
              title: "Email Notifications",
              description: "Receive updates via email",
              icon: Mail,
            },
            {
              key: "push",
              title: "Push Notifications",
              description: "Get notified on your device",
              icon: Smartphone,
            },
            {
              key: "sms",
              title: "SMS Notifications",
              description: "Receive important updates via SMS",
              icon: Smartphone,
            },
            {
              key: "updates",
              title: "Application Updates",
              description: "Get notified about application status changes",
              icon: Bell,
            },
            {
              key: "marketing",
              title: "Marketing Communications",
              description: "Receive promotional emails and offers",
              icon: Mail,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE" }}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" style={{ color: "#0288D1" }} />
                  <div>
                    <h4 className="font-medium" style={{ color: "#455A64" }}>
                      {item.title}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "#455A64", opacity: 0.7 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      notifications[item.key as keyof typeof notifications]
                    }
                    onChange={(e) =>
                      handleNotificationChange(item.key, e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Password & Authentication
        </h3>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" style={{ color: "#455A64" }} />
                ) : (
                  <Eye className="h-4 w-4" style={{ color: "#455A64" }} />
                )}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#455A64" }}
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#455A64" }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="border-gray-300"
            style={{ color: "#455A64" }}
          >
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Two-Factor Authentication
        </h3>
        <div
          className="p-4 rounded-lg border border-gray-200"
          style={{ backgroundColor: "#F5FAFE" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#455A64" }}>
                SMS Authentication
              </h4>
              <p className="text-sm" style={{ color: "#455A64", opacity: 0.7 }}>
                Add an extra layer of security to your account
              </p>
            </div>
            <Badge style={{ backgroundColor: "#4CAF50", color: "white" }}>
              Enabled
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Active Sessions
        </h3>
        <div className="space-y-3">
          {[
            {
              device: "MacBook Pro",
              location: "Toronto, Canada",
              time: "Current session",
              current: true,
            },
            {
              device: "iPhone 12",
              location: "Toronto, Canada",
              time: "2 hours ago",
              current: false,
            },
          ].map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5" style={{ color: "#0288D1" }} />
                <div>
                  <h4 className="font-medium" style={{ color: "#455A64" }}>
                    {session.device}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "#455A64", opacity: 0.7 }}
                  >
                    {session.location} • {session.time}
                  </p>
                </div>
              </div>
              {session.current ? (
                <Badge style={{ backgroundColor: "#4CAF50", color: "white" }}>
                  Current
                </Badge>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                  style={{ color: "#455A64" }}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Payment Methods
        </h3>
        <div className="space-y-3">
          {[
            {
              type: "Visa",
              last4: "4242",
              expiry: "12/25",
              default: true,
            },
            {
              type: "PayPal",
              email: "john.doe@email.com",
              default: false,
            },
          ].map((method, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5" style={{ color: "#0288D1" }} />
                <div>
                  <h4 className="font-medium" style={{ color: "#455A64" }}>
                    {method.type} {method.last4 && `ending in ${method.last4}`}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "#455A64", opacity: 0.7 }}
                  >
                    {method.expiry || method.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {method.default && (
                  <Badge style={{ backgroundColor: "#0288D1", color: "white" }}>
                    Default
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                  style={{ color: "#455A64" }}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="border-gray-300"
          style={{ color: "#455A64" }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Billing History
        </h3>
        <div className="space-y-3">
          {[
            {
              date: "March 1, 2024",
              description: "Work Permit Application Fee",
              amount: "$1,500.00",
              status: "Paid",
            },
            {
              date: "February 15, 2024",
              description: "Document Review Service",
              amount: "$250.00",
              status: "Paid",
            },
            {
              date: "January 30, 2024",
              description: "Consultation Fee",
              amount: "$150.00",
              status: "Paid",
            },
          ].map((invoice, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <div>
                <h4 className="font-medium" style={{ color: "#455A64" }}>
                  {invoice.description}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "#455A64", opacity: 0.7 }}
                >
                  {invoice.date}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold" style={{ color: "#455A64" }}>
                  {invoice.amount}
                </span>
                <Badge style={{ backgroundColor: "#4CAF50", color: "white" }}>
                  {invoice.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                  style={{ color: "#455A64" }}
                >
                  <Download className="h-3 w-3 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Display Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#455A64" }}
            >
              Theme
            </label>
            <div className="flex space-x-3">
              {[
                { id: "light", label: "Light", icon: Sun },
                { id: "dark", label: "Dark", icon: Moon },
                { id: "auto", label: "Auto", icon: Monitor },
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === option.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    style={{
                      backgroundColor:
                        theme === option.id ? "#E0F2E7" : "#F5FAFE",
                      color: "#455A64",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#455A64" }}
              >
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#455A64" }}
              >
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              >
                <option value="America/Toronto">Toronto (EST)</option>
                <option value="America/Vancouver">Vancouver (PST)</option>
                <option value="America/New_York">New York (EST)</option>
                <option value="Europe/London">London (GMT)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Data Export
        </h3>
        <div
          className="p-4 rounded-lg border border-gray-200"
          style={{ backgroundColor: "#F5FAFE" }}
        >
          <h4 className="font-medium mb-2" style={{ color: "#455A64" }}>
            Download Your Data
          </h4>
          <p
            className="text-sm mb-4"
            style={{ color: "#455A64", opacity: 0.7 }}
          >
            Export all your personal data and application information in a
            downloadable format.
          </p>
          <Button
            variant="outline"
            className="border-gray-300"
            style={{ color: "#455A64" }}
          >
            <Download className="h-4 w-4 mr-2" />
            Request Data Export
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Account Deletion
        </h3>
        <div
          className="p-4 rounded-lg border border-red-200"
          style={{ backgroundColor: "#FFF5F5" }}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-700 mb-2">
                Delete Your Account
              </h4>
              <p className="text-sm text-red-600 mb-4">
                This action cannot be undone. All your data, applications, and
                account information will be permanently deleted.
              </p>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "billing":
        return renderBillingSettings();
      case "preferences":
        return renderPreferencesSettings();
      case "data":
        return renderDataSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: "#FEFEFE" }}
    >
      {/* Back Button */}
      <div className="p-6 pb-0">
        <BackButton />
      </div>

      {/* Header */}
      <div
        className="p-6 border-b border-gray-200"
        style={{ backgroundColor: "#F5FAFE" }}
      >
        <h1 className="text-2xl font-bold" style={{ color: "#455A64" }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "#455A64", opacity: 0.7 }}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div
          className="w-80 border-r border-gray-200 p-6"
          style={{ backgroundColor: "#F5FAFE" }}
        >
          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-white shadow-sm border border-gray-200"
                      : "hover:bg-white"
                  }`}
                  style={{
                    backgroundColor:
                      activeSection === section.id ? "#E0F2E7" : "transparent",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color:
                          activeSection === section.id ? "#0288D1" : "#455A64",
                      }}
                    />
                    <div>
                      <h3
                        className="font-medium text-sm"
                        style={{ color: "#455A64" }}
                      >
                        {section.title}
                      </h3>
                      <p
                        className="text-xs"
                        style={{ color: "#455A64", opacity: 0.7 }}
                      >
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSectionContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

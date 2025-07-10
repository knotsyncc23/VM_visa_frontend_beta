import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Bell,
  Shield,
  CreditCard,
  FileText,
  Star,
  Calendar,
  Save,
  Edit,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";

export function AgentSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  const ProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Profile Information
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
          {/* Profile Picture */}
          <div className="text-center">
            <div className="relative inline-block">
              <div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4"
                style={{ backgroundColor: "#326dee" }}
              >
                SA
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
            <h4 className="font-semibold text-gray-900">Sarah Ahmad</h4>
            <p className="text-sm text-gray-600">Immigration Consultant</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-gray-500">(89 reviews)</span>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="Sarah"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Ahmad"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="sarah.ahmad@globalimmig.com"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  defaultValue="ICCRC-R123456"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                defaultValue="Toronto, Ontario, Canada"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#326dee" }}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Professional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agency/Company
            </label>
            <input
              type="text"
              defaultValue="Global Immigration Services"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              defaultValue="8"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specializations
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "Work Permits",
                "Study Visas",
                "Permanent Residency",
                "Family Sponsorship",
              ].map((spec) => (
                <Badge
                  key={spec}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                >
                  {spec}
                  <X className="w-3 h-3 ml-1 cursor-pointer" />
                </Badge>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add specialization..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              defaultValue="Experienced immigration consultant specializing in Canadian immigration law. Helping individuals and families navigate complex visa processes with personalized service and proven success rates."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const AccountSection = () => (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Security Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <Button style={{ backgroundColor: "#326dee" }}>
            <Lock className="w-4 h-4 mr-2" />
            Update Password
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              <Check className="w-3 h-3 mr-1" />
              Enabled
            </Badge>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Notification Preferences
      </h3>
      <div className="space-y-6">
        {[
          {
            key: "email",
            title: "Email Notifications",
            description: "Receive updates via email",
          },
          {
            key: "sms",
            title: "SMS Notifications",
            description: "Receive updates via text message",
          },
          {
            key: "push",
            title: "Push Notifications",
            description: "Receive push notifications in browser",
          },
          {
            key: "marketing",
            title: "Marketing Communications",
            description: "Receive promotional emails and offers",
          },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[item.key as keyof typeof notifications]}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    [item.key]: e.target.checked,
                  })
                }
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications]
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    notifications[item.key as keyof typeof notifications]
                      ? "translate-x-5"
                      : "translate-x-0"
                  } mt-0.5 ml-0.5`}
                />
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const BillingSection = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Current Plan
        </h3>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div>
            <h4 className="font-semibold text-gray-900">Professional Plan</h4>
            <p className="text-sm text-gray-600">$49/month • Billed annually</p>
            <p className="text-xs text-gray-500 mt-1">
              Next billing: February 15, 2024
            </p>
          </div>
          <Button variant="outline">Upgrade Plan</Button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Method
          </h3>
          <Button variant="outline" size="sm">
            Add Method
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/26</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600">
              Remove
            </Button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Billing History
        </h3>
        <div className="space-y-3">
          {[
            { date: "Jan 15, 2024", amount: "$49.00", status: "Paid" },
            { date: "Dec 15, 2023", amount: "$49.00", status: "Paid" },
            { date: "Nov 15, 2023", amount: "$49.00", status: "Paid" },
          ].map((invoice, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{invoice.date}</p>
                <p className="text-sm text-gray-600">Professional Plan</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">
                  {invoice.amount}
                </span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {invoice.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DocumentsSection = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Professional Documents
        </h3>
        <Button style={{ backgroundColor: "#326dee" }}>
          <FileText className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>
      <div className="space-y-4">
        {[
          {
            name: "ICCRC License Certificate",
            status: "Verified",
            uploaded: "2023-12-15",
          },
          {
            name: "Professional Insurance",
            status: "Verified",
            uploaded: "2024-01-01",
          },
          {
            name: "Continuing Education Certificate",
            status: "Pending",
            uploaded: "2024-01-10",
          },
        ].map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-gray-400" />
              <div>
                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                <p className="text-sm text-gray-600">
                  Uploaded on {doc.uploaded}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                className={
                  doc.status === "Verified"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                }
              >
                {doc.status === "Verified" ? (
                  <Check className="w-3 h-3 mr-1" />
                ) : (
                  <Clock className="w-3 h-3 mr-1" />
                )}
                {doc.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "account":
        return <AccountSection />;
      case "notifications":
        return <NotificationsSection />;
      case "billing":
        return <BillingSection />;
      case "documents":
        return <DocumentsSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Settings</h2>
        <div className="space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                backgroundColor:
                  activeTab === tab.id ? "#326dee" : "transparent",
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

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import { useAuth } from "@/components/auth/auth-context";
import { api, User as UserType } from "@shared/api";
import { useToast } from "@/hooks/use-toast";
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
  FileText,
  Calendar,
} from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const ClientSettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    visaHistory: "",
    preferredCountries: [] as string[],
    emergencyContact: {
      name: "",
      phone: "",
      relationship: ""
    }
  });
  
  const [notifications, setNotifications] = useState({
    proposalUpdates: true,
    messageAlerts: true,
    deadlineReminders: true,
    statusUpdates: true,
    email: true,
    push: true,
    sms: false,
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public" as "public" | "limited" | "private",
    showContactInfo: false,
    allowDirectMessages: true,
    shareProgressWithFamily: false,
  });

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/Toronto");

  useEffect(() => {
    if (user) {
      const clientUser = user as UserType & {
        phone?: string;
        dateOfBirth?: string;
        nationality?: string;
        passportNumber?: string;
        visaHistory?: string;
        preferredCountries?: string[];
        emergencyContact?: {
          name: string;
          phone: string;
          relationship: string;
        };
      };
      
      setProfileData({
        name: clientUser.name || "",
        email: clientUser.email || "",
        phone: clientUser.phone || "",
        dateOfBirth: clientUser.dateOfBirth || "",
        nationality: clientUser.nationality || "",
        passportNumber: clientUser.passportNumber || "",
        visaHistory: clientUser.visaHistory || "",
        preferredCountries: clientUser.preferredCountries || [],
        emergencyContact: clientUser.emergencyContact || {
          name: "",
          phone: "",
          relationship: ""
        }
      });

      // Initialize notification settings from user data
      if (clientUser.notificationSettings) {
        setNotifications(clientUser.notificationSettings);
      }

      // Initialize privacy settings from user data
      if (clientUser.privacySettings) {
        setPrivacy(clientUser.privacySettings);
      }
    }
  }, [user]);

  const sections: SettingsSection[] = [
    {
      id: "profile",
      title: "Personal Information",
      description: "Manage your personal details and visa information",
      icon: User,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure how you receive updates about your applications",
      icon: Bell,
    },
    {
      id: "privacy",
      title: "Privacy & Visibility",
      description: "Control who can see your information and contact you",
      icon: Shield,
    },
    {
      id: "documents",
      title: "Document Preferences",
      description: "Manage how your documents are stored and shared",
      icon: FileText,
    },
    {
      id: "preferences",
      title: "App Preferences",
      description: "Customize your app experience and display settings",
      icon: SettingsIcon,
    },
  ];

  const handleProfileSave = async () => {
    try {
      setLoading(true);
      
      // Call the API to update profile
      const updatedUser = await api.updateProfile(profileData);
      
      // Show success message
      const toast = document.createElement("div");
      toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";
      toast.textContent = "Profile updated successfully!";
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 3000);
      
    } catch (error) {
      console.error("Failed to update profile:", error);
      
      // Show error message
      const toast = document.createElement("div");
      toast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50";
      toast.textContent = "Failed to update profile. Please try again.";
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationSave = async () => {
    try {
      setLoading(true);
      
      await api.updateProfile({
        notificationSettings: notifications
      });
      
      toast({
        title: "Success",
        description: "Notification settings updated successfully",
      });
      
    } catch (error) {
      console.error("Failed to save notification settings:", error);
      
      toast({
        title: "Error",
        description: "Failed to save notification settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacySave = async () => {
    try {
      setLoading(true);
      
      await api.updateProfile({
        privacySettings: privacy
      });
      
      toast({
        title: "Success",
        description: "Privacy settings updated successfully",
      });
      
    } catch (error) {
      console.error("Failed to save privacy settings:", error);
      
      toast({
        title: "Error",
        description: "Failed to save privacy settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Date of Birth
            </label>
            <input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Immigration Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Nationality
            </label>
            <input
              type="text"
              value={profileData.nationality}
              onChange={(e) => setProfileData({...profileData, nationality: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Passport Number
            </label>
            <input
              type="text"
              value={profileData.passportNumber}
              onChange={(e) => setProfileData({...profileData, passportNumber: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
            Previous Visa History
          </label>
          <textarea
            value={profileData.visaHistory}
            onChange={(e) => setProfileData({...profileData, visaHistory: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 h-24"
            style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            placeholder="Describe any previous visa applications, approvals, or rejections..."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Emergency Contact
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Contact Name
            </label>
            <input
              type="text"
              value={profileData.emergencyContact.name}
              onChange={(e) => setProfileData({
                ...profileData, 
                emergencyContact: {...profileData.emergencyContact, name: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.emergencyContact.phone}
              onChange={(e) => setProfileData({
                ...profileData, 
                emergencyContact: {...profileData.emergencyContact, phone: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Relationship
            </label>
            <select
              value={profileData.emergencyContact.relationship}
              onChange={(e) => setProfileData({
                ...profileData, 
                emergencyContact: {...profileData.emergencyContact, relationship: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="">Select relationship</option>
              <option value="spouse">Spouse</option>
              <option value="parent">Parent</option>
              <option value="sibling">Sibling</option>
              <option value="friend">Friend</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleProfileSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Application Updates
        </h3>
        <div className="space-y-4">
          {[
            { key: "proposalUpdates", label: "New Proposal Notifications", desc: "Get notified when agents send new proposals" },
            { key: "messageAlerts", label: "Message Alerts", desc: "Receive notifications for new messages" },
            { key: "deadlineReminders", label: "Deadline Reminders", desc: "Get reminded about important application deadlines" },
            { key: "statusUpdates", label: "Status Updates", desc: "Notifications when your application status changes" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium" style={{ color: "#455A64" }}>{label}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Communication Preferences
        </h3>
        <div className="space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
            { key: "push", label: "Push Notifications", desc: "Get browser push notifications" },
            { key: "sms", label: "SMS Notifications", desc: "Receive text message alerts for urgent updates" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium" style={{ color: "#455A64" }}>{label}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={handleNotificationSave}
          className="px-6 py-3 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: "#1976D2",
            color: "white",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Profile Visibility
        </h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Who can see your profile?
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="public">Public - Visible to all verified agents</option>
              <option value="limited">Limited - Only agents you're working with</option>
              <option value="private">Private - Only you can see your profile</option>
            </select>
          </div>

          {[
            { key: "showContactInfo", label: "Show Contact Information", desc: "Allow agents to see your phone and email" },
            { key: "allowDirectMessages", label: "Allow Direct Messages", desc: "Let agents message you directly" },
            { key: "shareProgressWithFamily", label: "Share Progress with Family", desc: "Allow family members to track your application progress" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium" style={{ color: "#455A64" }}>{label}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={typeof privacy[key as keyof typeof privacy] === 'boolean' ? privacy[key as keyof typeof privacy] as boolean : false}
                  onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={handlePrivacySave}
          className="px-6 py-3 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: "#1976D2",
            color: "white",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderDocumentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Document Management
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2" style={{ color: "#455A64" }}>Auto-backup Documents</h4>
            <p className="text-sm text-gray-600 mb-3">Automatically backup your documents to secure cloud storage</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2" style={{ color: "#455A64" }}>Share with Agents</h4>
            <p className="text-sm text-gray-600 mb-3">Allow agents to access your documents when needed</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          App Preferences
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings();
      case "notifications":
        return renderNotificationSettings();
      case "privacy":
        return renderPrivacySettings();
      case "documents":
        return renderDocumentSettings();
      case "preferences":
        return renderPreferencesSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5FAFE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BackButton />
          <div className="flex items-center mt-4">
            <SettingsIcon className="w-8 h-8 mr-3" style={{ color: "#1976D2" }} />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#455A64" }}>
                Client Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your account preferences and privacy settings
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
                Settings
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#455A64" }}>
                  {sections.find((s) => s.id === activeSection)?.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {sections.find((s) => s.id === activeSection)?.description}
                </p>
              </div>
              {renderActiveSection()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSettingsPage;

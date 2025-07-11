import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import { useAuth } from "@/components/auth/auth-context";
import { api, User as UserType } from "@shared/api";
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
  Star,
  Briefcase,
  Award,
  MapPin,
  Clock,
  DollarSign,
  Languages,
} from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const AgentSettingsPage: React.FC = () => {
  const { user, updateProfile, refreshUserData } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
    location: "",
    website: "",
    specializations: [] as string[],
    languages: [] as string[],
    experienceYears: 0,
    certifications: [] as string[],
    portfolio: [] as string[],
  });
  
  const [businessData, setBusinessData] = useState({
    responseTime: "24-hours",
    availability: "full-time",
    workingHours: {
      start: "09:00",
      end: "17:00",
      timezone: "America/Toronto"
    },
    consultationFee: 0,
    acceptsUrgentCases: true,
    minimumBudget: 1000,
  });
  
  const [notifications, setNotifications] = useState({
    newRequests: true,
    clientMessages: true,
    paymentUpdates: true,
    deadlineReminders: true,
    marketingEmails: false,
    weeklyReports: true,
    urgentAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showRates: true,
    showResponseTime: true,
    allowDirectBooking: true,
    showClientTestimonials: true,
  });

  const sections: SettingsSection[] = [
    {
      id: "profile",
      title: "Professional Profile",
      description: "Showcase your expertise and attract more clients",
      icon: User,
    },
    {
      id: "business",
      title: "Business Settings",
      description: "Configure your rates, availability, and service offerings",
      icon: Briefcase,
    },
    {
      id: "portfolio",
      title: "Portfolio & Credentials",
      description: "Highlight your certifications and successful cases",
      icon: Award,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage alerts and communication preferences",
      icon: Bell,
    },
    {
      id: "privacy",
      title: "Privacy & Visibility",
      description: "Control what information is visible to clients",
      icon: Shield,
    },
    {
      id: "billing",
      title: "Billing & Payments",
      description: "Manage payment methods and financial settings",
      icon: CreditCard,
    },
  ];

  const specializationOptions = [
    "Student Visa", "Work Permit", "Permanent Residence", "Family Sponsorship",
    "Business Immigration", "Refugee Claims", "Citizenship", "Appeals",
    "Express Entry", "Provincial Nominee Program", "Temporary Residence"
  ];

  const languageOptions = [
    "English", "French", "Spanish", "Mandarin", "Hindi", "Arabic", 
    "Portuguese", "Russian", "German", "Italian", "Japanese", "Korean"
  ];

  useEffect(() => {
    if (user) {
      const agentUser = user as UserType & {
        title?: string;
        bio?: string;
        location?: string;
        website?: string;
        specializations?: string[];
        languages?: string[];
        experienceYears?: number;
        certifications?: string[];
        portfolio?: string[];
        portfolioItems?: string[];
        rates?: any;
        availability?: string;
        businessHours?: any;
      };
      
      setProfileData({
        name: agentUser.name || "",
        email: agentUser.email || "",
        phone: agentUser.phone || "",
        title: agentUser.title || "",
        bio: agentUser.bio || "",
        location: agentUser.location || "",
        website: agentUser.website || "",
        specializations: agentUser.specializations || [],
        languages: agentUser.languages || [],
        experienceYears: agentUser.experienceYears || 0,
        certifications: agentUser.certifications || [],
        portfolio: agentUser.portfolio || agentUser.portfolioItems || [],
      });

      // Populate business data
      if (agentUser.rates) {
        setBusinessData(prev => ({
          ...prev,
          consultationFee: agentUser.rates?.consultation || 0,
          minimumBudget: agentUser.rates?.minimum || 1000,
        }));
      }

      if (agentUser.availability) {
        setBusinessData(prev => ({
          ...prev,
          availability: agentUser.availability || "full-time",
        }));
      }

      if (agentUser.businessHours) {
        setBusinessData(prev => ({
          ...prev,
          workingHours: {
            start: agentUser.businessHours.start || "09:00",
            end: agentUser.businessHours.end || "17:00",
            timezone: agentUser.businessHours.timezone || "America/Toronto"
          }
        }));
      }
    }
  }, [user]);

  const handleProfileSave = async () => {
    try {
      setLoading(true);
      console.log('🔄 Saving profile data:', profileData);
      
      const updatedUser = await updateProfile(profileData);
      console.log('✅ Profile updated successfully:', updatedUser);
      
      // Force a refresh of the user data from server
      await refreshUserData();
      
      // Update local state to reflect changes immediately
      if (updatedUser) {
        setProfileData(prev => ({
          ...prev,
          name: updatedUser.name || prev.name,
          email: updatedUser.email || prev.email,
          phone: updatedUser.phone || prev.phone,
          title: (updatedUser as any).title || prev.title,
          bio: updatedUser.bio || prev.bio,
          location: updatedUser.location || prev.location,
          website: (updatedUser as any).website || prev.website,
          specializations: (updatedUser as any).specializations || prev.specializations,
          languages: (updatedUser as any).languages || prev.languages,
          experienceYears: (updatedUser as any).experienceYears || prev.experienceYears,
          certifications: (updatedUser as any).certifications || prev.certifications,
          portfolio: (updatedUser as any).portfolio || prev.portfolio,
        }));
      }
      
      // Show success message without redirecting
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

  const handleBusinessSave = async () => {
    try {
      setLoading(true);
      console.log('🔄 Saving business data:', businessData);
      
      // Combine business data with profile data
      const businessUpdateData: any = {
        experienceYears: profileData.experienceYears, // Include experience years
        availability: businessData.availability,
        responseTime: businessData.responseTime,
        rates: {
          consultation: businessData.consultationFee,
          minimum: businessData.minimumBudget,
        },
        businessHours: businessData.workingHours,
        acceptsUrgentCases: businessData.acceptsUrgentCases,
        consultationFee: businessData.consultationFee,
        minimumBudget: businessData.minimumBudget,
      };
      
      const updatedUser = await updateProfile(businessUpdateData);
      console.log('✅ Business settings updated successfully:', updatedUser);
      
      // Force a refresh of the user data from server
      await refreshUserData();
      
      // Update local state to reflect changes immediately
      if (updatedUser) {
        setBusinessData(prev => ({
          ...prev,
          availability: (updatedUser as any).availability || prev.availability,
          responseTime: (updatedUser as any).responseTime || prev.responseTime,
          consultationFee: (updatedUser as any).consultationFee || prev.consultationFee,
          minimumBudget: (updatedUser as any).minimumBudget || prev.minimumBudget,
          acceptsUrgentCases: (updatedUser as any).acceptsUrgentCases !== undefined ? (updatedUser as any).acceptsUrgentCases : prev.acceptsUrgentCases,
        }));
        
        // Also update profile data for experience years
        setProfileData(prev => ({
          ...prev,
          experienceYears: (updatedUser as any).experienceYears || prev.experienceYears,
        }));
      }
      
      // Show success message
      const toast = document.createElement("div");
      toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";
      toast.textContent = "Business settings updated successfully!";
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 3000);
    } catch (error) {
      console.error("Failed to update business settings:", error);
      
      // Show error message
      const toast = document.createElement("div");
      toast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50";
      toast.textContent = "Failed to update business settings. Please try again.";
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

  const handleSpecializationToggle = (specialization: string) => {
    setProfileData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Basic Information
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
              Professional Title
            </label>
            <input
              type="text"
              value={profileData.title}
              onChange={(e) => setProfileData({...profileData, title: e.target.value})}
              placeholder="e.g., Regulated Canadian Immigration Consultant"
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
              Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              placeholder="City, Province/State, Country"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Website
            </label>
            <input
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Professional Bio
        </h3>
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 h-32"
          style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
          placeholder="Describe your experience, approach, and what makes you unique as an immigration consultant..."
        />
        <p className="text-sm text-gray-500 mt-1">
          A compelling bio helps clients understand your expertise and approach. {profileData.bio.length}/1000 characters
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Specializations
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Select your areas of expertise to help clients find the right agent for their needs
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {specializationOptions.map((specialization) => (
            <label
              key={specialization}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                profileData.specializations.includes(specialization)
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                checked={profileData.specializations.includes(specialization)}
                onChange={() => handleSpecializationToggle(specialization)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{specialization}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Languages
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {languageOptions.map((language) => (
            <label
              key={language}
              className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                profileData.languages.includes(language)
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                checked={profileData.languages.includes(language)}
                onChange={() => handleLanguageToggle(language)}
                className="sr-only"
              />
              <span className="text-sm">{language}</span>
            </label>
          ))}
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
              Save Profile
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      {/* Organization Info (for organization-invited agents) */}
      {(user as any)?.organizationId && (
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
            Organization Information
          </h3>
          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Organization Member
              </span>
            </div>
            <p className="text-sm text-blue-800">
              You are part of {(user as any).organizationName || 'an organization'}. Some settings may be managed by your organization administrator.
            </p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Professional Experience
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Years of Experience
            </label>
            <input
              type="number"
              value={profileData.experienceYears}
              onChange={(e) => setProfileData({...profileData, experienceYears: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              placeholder="5"
              min="0"
              max="50"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Rates & Pricing
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Consultation Fee (CAD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={businessData.consultationFee}
                onChange={(e) => setBusinessData({...businessData, consultationFee: parseInt(e.target.value) || 0})}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
                placeholder="100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Minimum Project Budget (CAD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={businessData.minimumBudget}
                onChange={(e) => setBusinessData({...businessData, minimumBudget: parseInt(e.target.value) || 0})}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
                placeholder="1000"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Availability & Response Time
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Typical Response Time
            </label>
            <select
              value={businessData.responseTime}
              onChange={(e) => setBusinessData({...businessData, responseTime: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="within-hour">Within 1 hour</option>
              <option value="within-4-hours">Within 4 hours</option>
              <option value="within-24-hours">Within 24 hours</option>
              <option value="within-48-hours">Within 48 hours</option>
              <option value="within-week">Within 1 week</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Availability
            </label>
            <select
              value={businessData.availability}
              onChange={(e) => setBusinessData({...businessData, availability: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="full-time">Full-time (40+ hours/week)</option>
              <option value="part-time">Part-time (20-39 hours/week)</option>
              <option value="evenings">Evenings & Weekends</option>
              <option value="on-call">By Appointment Only</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2" style={{ color: "#455A64" }}>Working Hours</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#455A64" }}>
                Start Time
              </label>
              <input
                type="time"
                value={businessData.workingHours.start}
                onChange={(e) => setBusinessData({
                  ...businessData, 
                  workingHours: {...businessData.workingHours, start: e.target.value}
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#455A64" }}>
                End Time
              </label>
              <input
                type="time"
                value={businessData.workingHours.end}
                onChange={(e) => setBusinessData({
                  ...businessData, 
                  workingHours: {...businessData.workingHours, end: e.target.value}
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#455A64" }}>
                Timezone
              </label>
              <select
                value={businessData.workingHours.timezone}
                onChange={(e) => setBusinessData({
                  ...businessData, 
                  workingHours: {...businessData.workingHours, timezone: e.target.value}
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              >
                <option value="America/Toronto">Eastern Time</option>
                <option value="America/Winnipeg">Central Time</option>
                <option value="America/Edmonton">Mountain Time</option>
                <option value="America/Vancouver">Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium" style={{ color: "#455A64" }}>Accept Urgent Cases</h4>
            <p className="text-sm text-gray-600">Handle time-sensitive applications with quick turnaround</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={businessData.acceptsUrgentCases}
              onChange={(e) => setBusinessData({...businessData, acceptsUrgentCases: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleBusinessSave}
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
              Save Business Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderPortfolioSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Professional Certifications
        </h3>
        <div className="space-y-3">
          {profileData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Award className="w-5 h-5 text-blue-600" />
              <input
                type="text"
                value={cert}
                onChange={(e) => {
                  const newCerts = [...profileData.certifications];
                  newCerts[index] = e.target.value;
                  setProfileData({...profileData, certifications: newCerts});
                }}
                className="flex-1 px-3 py-1 border border-gray-200 rounded"
                placeholder="e.g., RCIC License #R123456"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newCerts = profileData.certifications.filter((_, i) => i !== index);
                  setProfileData({...profileData, certifications: newCerts});
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => setProfileData({
              ...profileData, 
              certifications: [...profileData.certifications, ""]
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Portfolio Items
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Showcase your successful cases and work samples (remove any personal information)
        </p>
        <div className="space-y-3">
          {profileData.portfolio.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newPortfolio = [...profileData.portfolio];
                  newPortfolio[index] = e.target.value;
                  setProfileData({...profileData, portfolio: newPortfolio});
                }}
                className="flex-1 px-3 py-1 border border-gray-200 rounded"
                placeholder="e.g., Express Entry Success - Completed in 6 months"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPortfolio = profileData.portfolio.filter((_, i) => i !== index);
                  setProfileData({...profileData, portfolio: newPortfolio});
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => setProfileData({
              ...profileData, 
              portfolio: [...profileData.portfolio, ""]
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Portfolio Item
          </Button>
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
              Save Portfolio
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
          Business Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: "newRequests", label: "New Client Requests", desc: "Get notified when clients post new visa requests" },
            { key: "clientMessages", label: "Client Messages", desc: "Alerts for new messages from clients" },
            { key: "urgentAlerts", label: "Urgent Case Alerts", desc: "Immediate notifications for time-sensitive cases" },
            { key: "deadlineReminders", label: "Deadline Reminders", desc: "Reminders for important case deadlines" },
            { key: "paymentUpdates", label: "Payment Updates", desc: "Notifications about payments and invoices" },
            { key: "weeklyReports", label: "Weekly Business Reports", desc: "Summary of your business performance" },
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
                  onChange={(e) => setNotifications(prev => ({...prev, [key]: e.target.checked}))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
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
              Profile Visibility
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="public">Public - Visible to all clients</option>
              <option value="verified">Verified Clients Only</option>
              <option value="private">Private - Only direct referrals</option>
            </select>
          </div>

          {[
            { key: "showRates", label: "Show Rates Publicly", desc: "Display your consultation fee publicly" },
            { key: "showResponseTime", label: "Show Response Time", desc: "Let clients see your typical response time" },
            { key: "allowDirectBooking", label: "Allow Direct Booking", desc: "Let clients book consultations directly" },
            { key: "showClientTestimonials", label: "Show Client Testimonials", desc: "Display reviews and testimonials on your profile" },
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
                  onChange={(e) => setPrivacy({...privacy, [key]: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
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
        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
          <p className="text-gray-600">Payment processing integration coming soon. Currently, you can coordinate payments directly with clients.</p>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings();
      case "business":
        return renderBusinessSettings();
      case "portfolio":
        return renderPortfolioSettings();
      case "notifications":
        return renderNotificationSettings();
      case "privacy":
        return renderPrivacySettings();
      case "billing":
        return renderBillingSettings();
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
            <Briefcase className="w-8 h-8 mr-3" style={{ color: "#1976D2" }} />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#455A64" }}>
                Agent Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Optimize your profile to attract more clients and grow your business
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

export default AgentSettingsPage;

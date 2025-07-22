import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  CheckCircle,
  Star,
  Award,
  Globe,
  Languages,
  Briefcase,
  GraduationCap,
  Clock,
  Shield,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { profile, isLoading, updateProfile } = useProfile();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Form data for editing
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentCountry: "",
    nationality: "",
    bio: "",
    currentAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  // Update form data when profile loads
  React.useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        currentCountry: profile.currentCountry || "",
        nationality: profile.nationality || "",
        bio: profile.bio || "",
        currentAddress: {
          street: profile.currentAddress?.street || "",
          city: profile.currentAddress?.city || "",
          state: profile.currentAddress?.state || "",
          zipCode: profile.currentAddress?.zipCode || "",
          country: profile.currentAddress?.country || "",
        },
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('currentAddress.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        currentAddress: {
          ...prev.currentAddress,
          [addressField]: value,
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      console.error('❌ Failed to save profile:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Default values when profile is loading or not available
  const userInfo = profile ? {
    name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || "User",
    email: profile.email || "user@email.com",
    phone: profile.phone || "Not provided",
    location: profile.currentAddress ? 
      `${profile.currentAddress.city || ''}, ${profile.currentAddress.country || ''}`.replace(/^,\s*|,\s*$/g, '') || "Not provided"
      : "Not provided",
    joinDate: "Recently", // We'll need to add createdAt to the profile type later
    membershipType: "Standard",
    isVerified: false, // We'll need to add this to the profile type later
    profileCompletion: calculateProfileCompletion(profile),
    totalRequests: 0, // This would come from cases data
    successfulApplications: 0, // This would come from cases data
    averageRating: 0, // This would come from reviews data
    languages: [], // We'll need to add this to the profile type later
    occupation: "Not specified", // We'll need to add this to the profile type later
    education: "Not specified", // We'll need to add this to the profile type later
    experience: "Not specified",
    nationality: profile.nationality || "Not specified",
    bio: profile.bio || "No bio provided",
  } : {
    name: "Loading...",
    email: "loading...",
    phone: "loading...",
    location: "loading...",
    joinDate: "loading...",
    membershipType: "Standard",
    isVerified: false,
    profileCompletion: 0,
    totalRequests: 0,
    successfulApplications: 0,
    averageRating: 0,
    languages: [],
    occupation: "loading...",
    education: "loading...",
    experience: "loading...",
    nationality: "loading...",
    bio: "loading...",
  };

  // Helper function to calculate profile completion
  function calculateProfileCompletion(profile: any) {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.phone,
      profile.nationality,
      profile.currentCountry,
      profile.currentAddress?.street,
      profile.currentAddress?.city,
      profile.currentAddress?.country,
      profile.bio,
    ];
    
    const filledFields = fields.filter(field => field && field.toString().trim().length > 0);
    return (filledFields.length / fields.length) * 100;
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-royal-blue-500 mx-auto mb-4" />
            <p className="text-cool-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "visa-history", label: "Visa History", icon: Globe },
    { id: "preferences", label: "Preferences", icon: Shield },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          My Profile
        </h1>
        <p className="text-lg text-cool-gray-600">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Profile Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Photo & Basic Info */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-royal-blue-500 to-royal-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                JD
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                <Camera className="w-5 h-5 text-cool-gray-600" />
              </button>
              {userInfo.isVerified && (
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
              {userInfo.name}
            </h2>
            <Badge className="bg-gold-100 text-gold-700 mb-4">
              {userInfo.membershipType} Member
            </Badge>

            <div className="flex items-center gap-4 text-sm text-cool-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold-500 fill-current" />
                <span>{userInfo.averageRating} Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-royal-blue-500" />
                <span>{userInfo.successfulApplications} Successful</span>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-cool-gray-600">Profile Completion</span>
                <span className="font-semibold">
                  {Math.round(userInfo.profileCompletion)}%
                </span>
              </div>
              <div className="w-full bg-cool-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-royal-blue-500 to-sage-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(userInfo.profileCompletion)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-white/30 rounded-2xl">
                <div className="text-2xl font-bold text-cool-gray-800">
                  {userInfo.totalRequests}
                </div>
                <div className="text-sm text-cool-gray-600">Total Requests</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-2xl">
                <div className="text-2xl font-bold text-green-600">
                  {userInfo.successfulApplications}
                </div>
                <div className="text-sm text-cool-gray-600">Successful</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-2xl">
                <div className="text-2xl font-bold text-royal-blue-600">2</div>
                <div className="text-sm text-cool-gray-600">In Progress</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-2xl">
                <div className="text-2xl font-bold text-gold-600">
                  {userInfo.averageRating}
                </div>
                <div className="text-sm text-cool-gray-600">Rating</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-cool-gray-700">
                <Mail className="w-5 h-5 text-royal-blue-500" />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-cool-gray-700">
                <Phone className="w-5 h-5 text-sage-green-500" />
                <span>{userInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-cool-gray-700">
                <MapPin className="w-5 h-5 text-gold-500" />
                <span>{userInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-cool-gray-700">
                <Calendar className="w-5 h-5 text-cool-gray-500" />
                <span>Member since {userInfo.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="group"
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>
      </motion.div>

      {/* Detailed Information Tabs */}
      <div className="glass-card rounded-3xl overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-white/20">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-royal-blue-600 border-b-2 border-royal-blue-500 bg-royal-blue-50/50"
                    : "text-cool-gray-600 hover:text-royal-blue-600 hover:bg-royal-blue-50/30",
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "personal" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-cool-gray-800 mb-4">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={isEditing ? formData.firstName : userInfo.name.split(' ')[0] || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={isEditing ? formData.lastName : userInfo.name.split(' ').slice(1).join(' ') || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={isEditing ? formData.email : userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={isEditing ? formData.phone : userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Current Country
                    </label>
                    <input
                      type="text"
                      value={isEditing ? formData.currentCountry : userInfo.location}
                      onChange={(e) => handleInputChange('currentCountry', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={isEditing ? formData.nationality : userInfo.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={isEditing ? formData.bio : userInfo.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4 border-t border-white/20">
                  <Button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-royal-blue-500 hover:bg-royal-blue-600 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "visa-history" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-cool-gray-800 mb-4">
                Visa History
              </h3>

              <div className="space-y-4">
                <div className="p-6 bg-white/30 rounded-2xl border border-white/20 text-center">
                  <Globe className="w-12 h-12 text-cool-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-cool-gray-800 mb-2">
                    No Visa History Yet
                  </h4>
                  <p className="text-sm text-cool-gray-600 mb-4">
                    Your visa application history will appear here once you start applying through our platform.
                  </p>
                  <Button variant="outline" className="text-royal-blue-600 border-royal-blue-300">
                    Start New Application
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "preferences" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-cool-gray-800 mb-4">
                Account Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/30 rounded-2xl">
                  <div>
                    <h4 className="font-semibold text-cool-gray-800">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-cool-gray-600">
                      Receive updates about your applications
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/30 rounded-2xl">
                  <div>
                    <h4 className="font-semibold text-cool-gray-800">
                      SMS Notifications
                    </h4>
                    <p className="text-sm text-cool-gray-600">
                      Get SMS alerts for urgent updates
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/30 rounded-2xl">
                  <div>
                    <h4 className="font-semibold text-cool-gray-800">
                      Marketing Emails
                    </h4>
                    <p className="text-sm text-cool-gray-600">
                      Receive tips and immigration news
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-cool-gray-800 mb-4">
                Security Settings
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-white/30 rounded-2xl">
                  <h4 className="font-semibold text-cool-gray-800 mb-2">
                    Change Password
                  </h4>
                  <p className="text-sm text-cool-gray-600 mb-4">
                    Update your password to keep your account secure
                  </p>
                  <Button variant="outline">Update Password</Button>
                </div>

                <div className="p-4 bg-white/30 rounded-2xl">
                  <h4 className="font-semibold text-cool-gray-800 mb-2">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-cool-gray-600 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="p-4 bg-white/30 rounded-2xl">
                  <h4 className="font-semibold text-cool-gray-800 mb-2">
                    Login Activity
                  </h4>
                  <p className="text-sm text-cool-gray-600 mb-4">
                    Review recent login activity
                  </p>
                  <Button variant="outline">View Activity</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

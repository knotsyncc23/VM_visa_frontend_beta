import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const userInfo = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, United States",
    joinDate: "January 2024",
    membershipType: "Premium",
    isVerified: true,
    profileCompletion: 85,
    totalRequests: 8,
    successfulApplications: 6,
    averageRating: 4.8,
    languages: ["English", "Spanish"],
    occupation: "Software Engineer",
    education: "Master's in Computer Science",
    experience: "5+ years",
    visaHistory: [
      {
        country: "Canada",
        type: "Work Permit",
        status: "Approved",
        date: "2023",
      },
      {
        country: "United Kingdom",
        type: "Student Visa",
        status: "Approved",
        date: "2021",
      },
    ],
  };

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
                  {userInfo.profileCompletion}%
                </span>
              </div>
              <div className="w-full bg-cool-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-royal-blue-500 to-sage-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${userInfo.profileCompletion}%` }}
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
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userInfo.name}
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
                      value={userInfo.email}
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
                      value={userInfo.phone}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={userInfo.location}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={userInfo.occupation}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cool-gray-700 mb-2">
                      Education
                    </label>
                    <input
                      type="text"
                      value={userInfo.education}
                      disabled={!isEditing}
                      className="w-full p-3 border border-cool-gray-300 rounded-xl bg-white/50 disabled:bg-cool-gray-50 disabled:text-cool-gray-600"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4 border-t border-white/20">
                  <Button className="bg-royal-blue-500 hover:bg-royal-blue-600 text-white">
                    Save Changes
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
                {userInfo.visaHistory.map((visa, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/30 rounded-2xl border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-cool-gray-800">
                          {visa.country} - {visa.type}
                        </h4>
                        <p className="text-sm text-cool-gray-600">
                          {visa.date}
                        </p>
                      </div>
                      <Badge
                        className={
                          visa.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {visa.status}
                      </Badge>
                    </div>
                  </div>
                ))}
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

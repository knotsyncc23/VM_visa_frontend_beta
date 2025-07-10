import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  FileText,
  Settings,
  MessageCircle,
  LogOut,
  Edit,
  Upload,
  Download,
  Trash2,
  Eye,
  Calendar,
  Bell,
  Shield,
  Save,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// My Bio Component
export function MyBio() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    "I'm a software engineer with 5+ years of experience looking to immigrate to Canada for better opportunities. I specialize in full-stack development and have experience with modern frameworks. I'm passionate about technology and innovation.",
  );
  const [tempBio, setTempBio] = useState(bio);

  const handleSave = () => {
    setBio(tempBio);
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setTempBio(bio);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          My Bio
        </h1>
        <p className="text-lg text-cool-gray-600">
          Tell us about yourself and your immigration goals
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-cool-gray-800">About Me</h2>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Bio
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              rows={6}
              className="w-full p-4 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 resize-none"
              placeholder="Tell us about yourself, your background, goals, and why you want to immigrate..."
            />
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-sage-green-500">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-cool-gray max-w-none">
            <p className="text-cool-gray-700 leading-relaxed">{bio}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-cool-gray-200">
          <h3 className="text-lg font-semibold text-cool-gray-800 mb-4">
            Immigration Goals
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-sage-green-50 rounded-xl">
              <h4 className="font-medium text-sage-green-800">Primary Goal</h4>
              <p className="text-sage-green-700">Permanent Residence</p>
            </div>
            <div className="p-4 bg-sky-blue-50 rounded-xl">
              <h4 className="font-medium text-sky-blue-800">Target Country</h4>
              <p className="text-sky-blue-700">Canada</p>
            </div>
            <div className="p-4 bg-creamy-beige-50 rounded-xl">
              <h4 className="font-medium text-cool-gray-800">Timeline</h4>
              <p className="text-cool-gray-700">6-12 months</p>
            </div>
            <div className="p-4 bg-mint-green-50 rounded-xl">
              <h4 className="font-medium text-mint-green-800">Budget</h4>
              <p className="text-mint-green-700">$5,000 - $10,000</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Documents Component
export function DocumentCenter() {
  const [documents] = useState([
    {
      id: 1,
      name: "Passport Copy",
      type: "Identity",
      size: "2.1 MB",
      status: "Verified",
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      name: "University Transcript",
      type: "Education",
      size: "1.8 MB",
      status: "Pending Review",
      uploadDate: "2024-01-12",
    },
    {
      id: 3,
      name: "Work Experience Letter",
      type: "Employment",
      size: "0.9 MB",
      status: "Verified",
      uploadDate: "2024-01-10",
    },
    {
      id: 4,
      name: "Bank Statement",
      type: "Financial",
      size: "3.2 MB",
      status: "Missing",
      uploadDate: null,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-sage-green-100 text-sage-green-700";
      case "Pending Review":
        return "bg-sky-blue-100 text-sky-blue-700";
      case "Missing":
        return "bg-red-100 text-red-700";
      default:
        return "bg-cool-gray-100 text-cool-gray-700";
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          Document Center
        </h1>
        <p className="text-lg text-cool-gray-600">
          Manage your immigration documents and track verification status
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl mb-8"
      >
        <div className="border-2 border-dashed border-cool-gray-300 rounded-2xl p-8 text-center hover:border-royal-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-cool-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-cool-gray-800 mb-2">
            Upload Documents
          </h3>
          <p className="text-cool-gray-600 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <Button className="bg-royal-blue-500">
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 rounded-3xl"
      >
        <h2 className="text-xl font-bold text-cool-gray-800 mb-6">
          My Documents
        </h2>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white/30 rounded-2xl border border-white/20"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-royal-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-royal-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-cool-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-cool-gray-600">
                    {doc.type} • {doc.size}
                    {doc.uploadDate && ` • Uploaded ${doc.uploadDate}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(doc.status)}>
                  {doc.status}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Request History Component
export function RequestHistory() {
  const requests = [
    {
      id: 1,
      title: "Canada Express Entry PR",
      country: "Canada",
      type: "Permanent Residence",
      status: "In Progress",
      agent: "Sarah Johnson",
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-20",
      progress: 75,
    },
    {
      id: 2,
      title: "UK Student Visa Application",
      country: "United Kingdom",
      type: "Student Visa",
      status: "Completed",
      agent: "James Wilson",
      createdDate: "2023-12-10",
      lastUpdate: "2024-01-05",
      progress: 100,
    },
    {
      id: 3,
      title: "Australia Tourist Visa",
      country: "Australia",
      type: "Tourist Visa",
      status: "Rejected",
      agent: "Emily Rodriguez",
      createdDate: "2023-11-20",
      lastUpdate: "2023-12-15",
      progress: 50,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-sage-green-100 text-sage-green-700";
      case "In Progress":
        return "bg-sky-blue-100 text-sky-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-cool-gray-100 text-cool-gray-700";
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          Request History
        </h1>
        <p className="text-lg text-cool-gray-600">
          Track all your visa applications and their current status
        </p>
      </div>

      <div className="space-y-6">
        {requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 rounded-3xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-cool-gray-800 mb-2">
                  {request.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-cool-gray-600">
                  <span>{request.country}</span>
                  <span>•</span>
                  <span>{request.type}</span>
                  <span>•</span>
                  <span>Agent: {request.agent}</span>
                </div>
              </div>
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-cool-gray-600">Progress</span>
                <span className="font-medium">{request.progress}%</span>
              </div>
              <div className="w-full bg-cool-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-sage-green-500 to-sky-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${request.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-cool-gray-600">
              <span>Created: {request.createdDate}</span>
              <span>Last Update: {request.lastUpdate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Settings Component
export function SettingsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          Settings
        </h1>
        <p className="text-lg text-cool-gray-600">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <h2 className="text-xl font-bold text-cool-gray-800 mb-6">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/30 rounded-2xl">
              <div>
                <h3 className="font-semibold text-cool-gray-800">
                  Change Password
                </h3>
                <p className="text-sm text-cool-gray-600">
                  Update your password to keep your account secure
                </p>
              </div>
              <Button variant="outline">Update</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/30 rounded-2xl">
              <div>
                <h3 className="font-semibold text-cool-gray-800">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-cool-gray-600">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-3xl"
        >
          <h2 className="text-xl font-bold text-cool-gray-800 mb-6">
            Notification Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/30 rounded-2xl">
              <div>
                <h3 className="font-semibold text-cool-gray-800">
                  Email Notifications
                </h3>
                <p className="text-sm text-cool-gray-600">
                  Receive updates about your applications
                </p>
              </div>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/30 rounded-2xl">
              <div>
                <h3 className="font-semibold text-cool-gray-800">
                  SMS Notifications
                </h3>
                <p className="text-sm text-cool-gray-600">
                  Get SMS alerts for urgent updates
                </p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

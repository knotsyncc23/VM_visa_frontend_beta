import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Save,
  Upload,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

const ProfileEditPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "Toronto, Canada",
    bio: "Software engineer looking to expand career opportunities in Canada. Passionate about technology and innovation.",
    dateOfBirth: "1990-01-15",
    nationality: "American",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving profile data:", formData);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFEFE" }}>
      {/* Back Button */}
      <div className="p-6 pb-0">
        <BackButton customPath="/profile" label="Back to Profile" />
      </div>

      {/* Edit Profile Content */}
      <div className="max-w-3xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#455A64" }}>
              Edit Profile
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "#455A64", opacity: 0.7 }}
            >
              Update your personal information and preferences
            </p>
          </div>

          {/* Profile Picture Section */}
          <div
            className="p-6 rounded-lg border border-gray-200"
            style={{ backgroundColor: "#F5FAFE" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#455A64" }}
            >
              Profile Picture
            </h2>
            <div className="flex items-center space-x-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ backgroundColor: "#0288D1" }}
              >
                JD
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                  style={{ color: "#455A64" }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Photo
                </Button>
                <p
                  className="text-xs"
                  style={{ color: "#455A64", opacity: 0.7 }}
                >
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div
            className="p-6 rounded-lg border border-gray-200"
            style={{ backgroundColor: "#F5FAFE" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#455A64" }}
            >
              Personal Information
            </h2>
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
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
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#455A64" }}
                >
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#455A64" }}
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#455A64" }}
              >
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="border-gray-300"
              style={{ color: "#455A64" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              style={{ backgroundColor: "#0288D1", color: "white" }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileEditPage;

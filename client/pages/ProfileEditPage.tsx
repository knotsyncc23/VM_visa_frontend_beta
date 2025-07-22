import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import { useProfile, ProfileData } from "@/hooks/useProfile";
import { useToast } from "@/components/ui/use-toast";
import {
  Save,
  Upload,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Loader2,
} from "lucide-react";

const ProfileEditPage: React.FC = () => {
  const { toast } = useToast();
  const { profile, isLoading, updateProfile } = useProfile();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    currentCountry: "",
    currentAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    bio: "",
  });

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : "",
        nationality: profile.nationality || "",
        currentCountry: profile.currentCountry || "",
        currentAddress: {
          street: profile.currentAddress?.street || "",
          city: profile.currentAddress?.city || "",
          state: profile.currentAddress?.state || "",
          zipCode: profile.currentAddress?.zipCode || "",
          country: profile.currentAddress?.country || "",
        },
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    
    // Handle nested address fields
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        currentAddress: {
          ...prev.currentAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log('💾 Saving profile data:', formData);
      
      await updateProfile(formData);
      
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

  const handleCancel = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FEFEFE" }}>
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: "#0288D1" }} />
          <span style={{ color: "#455A64" }}>Loading profile...</span>
        </div>
      </div>
    );
  }

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
                Current Country
              </label>
              <input
                type="text"
                name="currentCountry"
                value={formData.currentCountry}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                placeholder="e.g., Canada, United States"
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#455A64" }}
              >
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.currentAddress.street}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                placeholder="e.g., 123 Main Street"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#455A64" }}
                >
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.currentAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                  placeholder="e.g., Toronto"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#455A64" }}
                >
                  State/Province
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.currentAddress.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                  placeholder="e.g., Ontario"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#455A64" }}
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.currentAddress.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#FEFEFE", color: "#455A64" }}
                  placeholder="e.g., K1A 0A9"
                />
              </div>
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
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              style={{ backgroundColor: "#0288D1", color: "white" }}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileEditPage;

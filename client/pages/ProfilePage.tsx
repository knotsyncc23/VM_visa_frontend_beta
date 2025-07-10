import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  User,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Star,
  Settings,
} from "lucide-react";

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFEFE" }}>
      {/* Back Button */}
      <div className="p-6 pb-0">
        <BackButton label="Back to Dashboard" />
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Card */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE" }}
            >
              <div className="text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                  style={{ backgroundColor: "#0288D1" }}
                >
                  JD
                </div>
                <h1
                  className="text-xl font-bold mb-2"
                  style={{ color: "#455A64" }}
                >
                  John Doe
                </h1>
                <Badge
                  className="mb-4"
                  style={{ backgroundColor: "#E0F2E7", color: "#455A64" }}
                >
                  Verified Client
                </Badge>
                <p
                  className="text-sm mb-4"
                  style={{ color: "#455A64", opacity: 0.8 }}
                >
                  Software engineer looking to expand career opportunities in
                  Canada. Passionate about technology and innovation.
                </p>

                <Button
                  className="w-full"
                  style={{ backgroundColor: "#0288D1", color: "white" }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Contact Information */}
              <div
                className="p-6 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE" }}
              >
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#455A64" }}
                >
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5" style={{ color: "#0288D1" }} />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#455A64" }}
                      >
                        Email
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "#455A64", opacity: 0.8 }}
                      >
                        john.doe@email.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5" style={{ color: "#0288D1" }} />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#455A64" }}
                      >
                        Phone
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "#455A64", opacity: 0.8 }}
                      >
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" style={{ color: "#0288D1" }} />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#455A64" }}
                      >
                        Location
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "#455A64", opacity: 0.8 }}
                      >
                        Toronto, Canada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: "#0288D1" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#455A64" }}
                      >
                        Member Since
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "#455A64", opacity: 0.8 }}
                      >
                        March 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application History */}
              <div
                className="p-6 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE" }}
              >
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#455A64" }}
                >
                  Application History
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      type: "Work Permit",
                      status: "In Progress",
                      date: "March 2024",
                    },
                    {
                      type: "Study Permit",
                      status: "Approved",
                      date: "January 2024",
                    },
                    {
                      type: "Visitor Visa",
                      status: "Approved",
                      date: "November 2023",
                    },
                  ].map((app, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md"
                      style={{ backgroundColor: "#E0F2E7" }}
                    >
                      <div>
                        <p
                          className="font-medium text-sm"
                          style={{ color: "#455A64" }}
                        >
                          {app.type}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "#455A64", opacity: 0.7 }}
                        >
                          {app.date}
                        </p>
                      </div>
                      <Badge
                        style={{
                          backgroundColor:
                            app.status === "Approved" ? "#4CAF50" : "#FF9800",
                          color: "white",
                        }}
                      >
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div
                className="p-6 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#F5FAFE" }}
              >
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#455A64" }}
                >
                  Profile Statistics
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#0288D1" }}
                    >
                      3
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "#455A64", opacity: 0.8 }}
                    >
                      Applications
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#0288D1" }}
                    >
                      85%
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "#455A64", opacity: 0.8 }}
                    >
                      Profile Complete
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#0288D1" }}
                    >
                      4.8
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "#455A64", opacity: 0.8 }}
                    >
                      Rating
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

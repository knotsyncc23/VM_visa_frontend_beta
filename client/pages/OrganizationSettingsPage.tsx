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
  Building,
  Users,
  Award,
  FileText,
  Save,
  Edit,
  Trash2,
  Plus,
  Settings as SettingsIcon,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  Star,
  Briefcase,
} from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const OrganizationSettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState("organization");
  const [loading, setLoading] = useState(false);
  
  const [organizationData, setOrganizationData] = useState({
    organizationName: "",
    organizationType: "",
    registrationNumber: "",
    establishedYear: new Date().getFullYear(),
    teamSize: 0,
    description: "",
    mission: "",
    website: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "Canada"
    },
    services: [] as string[],
    specializations: [] as string[],
    accreditations: [] as string[],
  });

  const [teamData, setTeamData] = useState({
    leadership: [] as Array<{
      name: string;
      title: string;
      bio: string;
      credentials: string;
      photo?: string;
    }>,
    agents: [] as Array<{
      name: string;
      specialization: string;
      experienceYears: number;
      languages: string[];
    }>,
  });

  const [businessData, setBusinessData] = useState({
    operatingHours: {
      weekdays: { start: "09:00", end: "17:00" },
      weekends: { start: "10:00", end: "15:00" },
      timezone: "America/Toronto"
    },
    responseTime: "within-24-hours",
    consultationFee: 0,
    minimumCaseValue: 2000,
    acceptsUrgentCases: true,
    offersRemoteConsultation: true,
    languages: [] as string[],
  });

  const [notifications, setNotifications] = useState({
    newInquiries: true,
    clientUpdates: true,
    teamNotifications: true,
    marketingUpdates: false,
    systemAlerts: true,
    monthlyReports: true,
    complianceAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showTeamInfo: true,
    showClientCount: true,
    showSuccessRate: true,
    allowDirectContact: true,
  });

  const sections: SettingsSection[] = [
    {
      id: "organization",
      title: "Organization Profile",
      description: "Manage your organization's basic information and branding",
      icon: Building,
    },
    {
      id: "team",
      title: "Team Management",
      description: "Showcase your leadership team and immigration agents",
      icon: Users,
    },
    {
      id: "services",
      title: "Services & Expertise",
      description: "Define your service offerings and areas of specialization",
      icon: Briefcase,
    },
    {
      id: "business",
      title: "Business Operations",
      description: "Configure operational settings and availability",
      icon: Globe,
    },
    {
      id: "credentials",
      title: "Credentials & Compliance",
      description: "Manage certifications and regulatory compliance",
      icon: Award,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure organizational notification preferences",
      icon: Bell,
    },
    {
      id: "privacy",
      title: "Privacy & Visibility",
      description: "Control what information is publicly visible",
      icon: Shield,
    },
  ];

  const serviceOptions = [
    "Student Visa Assistance", "Work Permit Applications", "Permanent Residence",
    "Family Sponsorship", "Business Immigration", "Refugee & Asylum Claims",
    "Citizenship Applications", "Immigration Appeals", "Express Entry",
    "Provincial Nominee Programs", "Temporary Residence", "Document Translation",
    "Legal Representation", "Consultation Services"
  ];

  const organizationTypes = [
    "Immigration Law Firm", "Regulated Consultant Firm", "Legal Clinic",
    "Non-Profit Organization", "Corporate Immigration Service", "Educational Institution"
  ];

  useEffect(() => {
    if (user) {
      const orgUser = user as UserType & {
        organizationName?: string;
        organizationType?: string;
        registrationNumber?: string;
        establishedYear?: number;
        teamSize?: number;
        services?: string[];
        website?: string;
        phone?: string;
      };
      
      setOrganizationData(prev => ({
        ...prev,
        organizationName: orgUser.organizationName || "",
        organizationType: orgUser.organizationType || "",
        registrationNumber: orgUser.registrationNumber || "",
        establishedYear: orgUser.establishedYear || new Date().getFullYear(),
        teamSize: orgUser.teamSize || 0,
        services: orgUser.services || [],
        website: orgUser.website || "",
        phone: orgUser.phone || "",
        email: orgUser.email || "",
      }));
    }
  }, [user]);

  const handleOrganizationSave = async () => {
    try {
      setLoading(true);
      await updateProfile(organizationData);
      // Show success message
    } catch (error) {
      console.error("Failed to update organization profile:", error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  const renderOrganizationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Organization Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Organization Name
            </label>
            <input
              type="text"
              value={organizationData.organizationName}
              onChange={(e) => setOrganizationData({...organizationData, organizationName: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              placeholder="Your Immigration Services Inc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Organization Type
            </label>
            <select
              value={organizationData.organizationType}
              onChange={(e) => setOrganizationData({...organizationData, organizationType: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="">Select type</option>
              {organizationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Registration Number
            </label>
            <input
              type="text"
              value={organizationData.registrationNumber}
              onChange={(e) => setOrganizationData({...organizationData, registrationNumber: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              placeholder="License/Registration Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Established Year
            </label>
            <input
              type="number"
              value={organizationData.establishedYear}
              onChange={(e) => setOrganizationData({...organizationData, establishedYear: parseInt(e.target.value) || new Date().getFullYear()})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Team Size
            </label>
            <input
              type="number"
              value={organizationData.teamSize}
              onChange={(e) => setOrganizationData({...organizationData, teamSize: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Website
            </label>
            <input
              type="url"
              value={organizationData.website}
              onChange={(e) => setOrganizationData({...organizationData, website: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Main Phone Number
            </label>
            <input
              type="tel"
              value={organizationData.phone}
              onChange={(e) => setOrganizationData({...organizationData, phone: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Main Email Address
            </label>
            <input
              type="email"
              value={organizationData.email}
              onChange={(e) => setOrganizationData({...organizationData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Business Address
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Street Address
            </label>
            <input
              type="text"
              value={organizationData.address.street}
              onChange={(e) => setOrganizationData({
                ...organizationData, 
                address: {...organizationData.address, street: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              City
            </label>
            <input
              type="text"
              value={organizationData.address.city}
              onChange={(e) => setOrganizationData({
                ...organizationData, 
                address: {...organizationData.address, city: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Province/State
            </label>
            <input
              type="text"
              value={organizationData.address.province}
              onChange={(e) => setOrganizationData({
                ...organizationData, 
                address: {...organizationData.address, province: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Postal Code
            </label>
            <input
              type="text"
              value={organizationData.address.postalCode}
              onChange={(e) => setOrganizationData({
                ...organizationData, 
                address: {...organizationData.address, postalCode: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Country
            </label>
            <select
              value={organizationData.address.country}
              onChange={(e) => setOrganizationData({
                ...organizationData, 
                address: {...organizationData.address, country: e.target.value}
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Organization Description
        </h3>
        <textarea
          value={organizationData.description}
          onChange={(e) => setOrganizationData({...organizationData, description: e.target.value})}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 h-24"
          style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
          placeholder="Describe your organization, its history, and what makes it unique..."
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Mission Statement
        </h3>
        <textarea
          value={organizationData.mission}
          onChange={(e) => setOrganizationData({...organizationData, mission: e.target.value})}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 h-20"
          style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
          placeholder="Your organization's mission and values..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleOrganizationSave}
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
              Save Organization Profile
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderServicesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Service Offerings
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Select the services your organization provides to help clients find the right assistance
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                organizationData.services.includes(service)
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                checked={organizationData.services.includes(service)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setOrganizationData({
                      ...organizationData,
                      services: [...organizationData.services, service]
                    });
                  } else {
                    setOrganizationData({
                      ...organizationData,
                      services: organizationData.services.filter(s => s !== service)
                    });
                  }
                }}
                className="sr-only"
              />
              <span className="text-sm font-medium">{service}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeamSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Leadership Team
        </h3>
        <div className="space-y-4">
          {teamData.leadership.map((leader, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={leader.name}
                  onChange={(e) => {
                    const newLeadership = [...teamData.leadership];
                    newLeadership[index] = {...leader, name: e.target.value};
                    setTeamData({...teamData, leadership: newLeadership});
                  }}
                  placeholder="Name"
                  className="px-3 py-2 border border-gray-200 rounded"
                />
                <input
                  type="text"
                  value={leader.title}
                  onChange={(e) => {
                    const newLeadership = [...teamData.leadership];
                    newLeadership[index] = {...leader, title: e.target.value};
                    setTeamData({...teamData, leadership: newLeadership});
                  }}
                  placeholder="Title/Position"
                  className="px-3 py-2 border border-gray-200 rounded"
                />
                <input
                  type="text"
                  value={leader.credentials}
                  onChange={(e) => {
                    const newLeadership = [...teamData.leadership];
                    newLeadership[index] = {...leader, credentials: e.target.value};
                    setTeamData({...teamData, leadership: newLeadership});
                  }}
                  placeholder="Credentials & Certifications"
                  className="px-3 py-2 border border-gray-200 rounded md:col-span-2"
                />
                <textarea
                  value={leader.bio}
                  onChange={(e) => {
                    const newLeadership = [...teamData.leadership];
                    newLeadership[index] = {...leader, bio: e.target.value};
                    setTeamData({...teamData, leadership: newLeadership});
                  }}
                  placeholder="Bio and experience"
                  className="px-3 py-2 border border-gray-200 rounded md:col-span-2 h-20"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newLeadership = teamData.leadership.filter((_, i) => i !== index);
                    setTeamData({...teamData, leadership: newLeadership});
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => setTeamData({
              ...teamData,
              leadership: [...teamData.leadership, { name: "", title: "", bio: "", credentials: "" }]
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Operating Hours
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Weekday Start
            </label>
            <input
              type="time"
              value={businessData.operatingHours.weekdays.start}
              onChange={(e) => setBusinessData({
                ...businessData,
                operatingHours: {
                  ...businessData.operatingHours,
                  weekdays: {...businessData.operatingHours.weekdays, start: e.target.value}
                }
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Weekday End
            </label>
            <input
              type="time"
              value={businessData.operatingHours.weekdays.end}
              onChange={(e) => setBusinessData({
                ...businessData,
                operatingHours: {
                  ...businessData.operatingHours,
                  weekdays: {...businessData.operatingHours.weekdays, end: e.target.value}
                }
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Timezone
            </label>
            <select
              value={businessData.operatingHours.timezone}
              onChange={(e) => setBusinessData({
                ...businessData,
                operatingHours: {...businessData.operatingHours, timezone: e.target.value}
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

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Pricing & Service Terms
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Initial Consultation Fee (CAD)
            </label>
            <input
              type="number"
              value={businessData.consultationFee}
              onChange={(e) => setBusinessData({...businessData, consultationFee: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Minimum Case Value (CAD)
            </label>
            <input
              type="number"
              value={businessData.minimumCaseValue}
              onChange={(e) => setBusinessData({...businessData, minimumCaseValue: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCredentialsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Organizational Accreditations
        </h3>
        <div className="space-y-3">
          {organizationData.accreditations.map((accred, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Award className="w-5 h-5 text-blue-600" />
              <input
                type="text"
                value={accred}
                onChange={(e) => {
                  const newAccreds = [...organizationData.accreditations];
                  newAccreds[index] = e.target.value;
                  setOrganizationData({...organizationData, accreditations: newAccreds});
                }}
                className="flex-1 px-3 py-1 border border-gray-200 rounded"
                placeholder="e.g., ICCRC Member Organization, Law Society Member"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newAccreds = organizationData.accreditations.filter((_, i) => i !== index);
                  setOrganizationData({...organizationData, accreditations: newAccreds});
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => setOrganizationData({
              ...organizationData,
              accreditations: [...organizationData.accreditations, ""]
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Accreditation
          </Button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#455A64" }}>
          Organizational Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: "newInquiries", label: "New Client Inquiries", desc: "Get notified when potential clients contact your organization" },
            { key: "clientUpdates", label: "Client Case Updates", desc: "Notifications about client case progress and milestones" },
            { key: "teamNotifications", label: "Team Activity Alerts", desc: "Updates about team member activities and assignments" },
            { key: "complianceAlerts", label: "Compliance & Regulatory Alerts", desc: "Important updates about immigration law changes" },
            { key: "systemAlerts", label: "System Notifications", desc: "Technical updates and system maintenance notices" },
            { key: "monthlyReports", label: "Monthly Business Reports", desc: "Comprehensive reports on organizational performance" },
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
          Public Profile Settings
        </h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium mb-2" style={{ color: "#455A64" }}>
              Organization Profile Visibility
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
              style={{ backgroundColor: "#F5FAFE", color: "#455A64" }}
            >
              <option value="public">Public - Visible to all users</option>
              <option value="verified">Verified Users Only</option>
              <option value="referral">Referral Only</option>
            </select>
          </div>

          {[
            { key: "showTeamInfo", label: "Show Team Information", desc: "Display team member profiles and credentials" },
            { key: "showClientCount", label: "Show Client Statistics", desc: "Display number of clients served and success metrics" },
            { key: "showSuccessRate", label: "Show Success Rate", desc: "Display your organization's case success rate" },
            { key: "allowDirectContact", label: "Allow Direct Contact", desc: "Let potential clients contact you directly through the platform" },
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

  const renderActiveSection = () => {
    switch (activeSection) {
      case "organization":
        return renderOrganizationSettings();
      case "team":
        return renderTeamSettings();
      case "services":
        return renderServicesSettings();
      case "business":
        return renderBusinessSettings();
      case "credentials":
        return renderCredentialsSettings();
      case "notifications":
        return renderNotificationSettings();
      case "privacy":
        return renderPrivacySettings();
      default:
        return renderOrganizationSettings();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5FAFE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BackButton />
          <div className="flex items-center mt-4">
            <Building className="w-8 h-8 mr-3" style={{ color: "#1976D2" }} />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#455A64" }}>
                Organization Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your organization's profile, team, and business operations
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

export default OrganizationSettingsPage;

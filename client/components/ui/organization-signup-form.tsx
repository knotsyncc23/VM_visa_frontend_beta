import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { useAuth } from "@/components/auth/auth-context";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  // Step 1
  orgName: string;
  // Step 2
  email: string;
  // Step 3
  password: string;
  confirmPassword: string;
  // Step 4
  phone: string;
  alternatePhone: string;
  whatsappNumber: string;
  // Step 5
  countryHeadquarters: string;
  operatingRegions: string[];
  companyLogo: File | null;
  businessLicense: File | null;
  // Step 6
  yearEstablished: string;
  registrationNumber: string;
  website: string;
  servicesOffered: string[];
  languagesSupported: string[];
  companyOverview: string;
  // Step 7
  repName: string;
  repDesignation: string;
  repPhoto: File | null;
  repLinkedIn: string;
  // Step 8
  agreeToTerms: boolean;
}

interface OrganizationSignupFormProps {
  onSubmit?: (data: FormData) => void;
  onBack?: () => void;
}

export function OrganizationSignupForm({
  onSubmit,
  onBack,
}: OrganizationSignupFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    orgName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    alternatePhone: "",
    whatsappNumber: "",
    countryHeadquarters: "",
    operatingRegions: [],
    companyLogo: null,
    businessLicense: null,
    yearEstablished: "",
    registrationNumber: "",
    website: "",
    servicesOffered: [],
    languagesSupported: [],
    companyOverview: "",
    repName: "",
    repDesignation: "",
    repPhoto: null,
    repLinkedIn: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup, isLoading } = useAuth();

  const steps = [
    {
      title: "Organization Name",
      subtitle: "What's your organization name?",
      icon: Building,
    },
    { title: "Email Address", subtitle: "Official email address", icon: Mail },
    { title: "Password Setup", subtitle: "Create secure password", icon: User },
    { title: "Contact Information", subtitle: "Phone numbers", icon: Phone },
    {
      title: "Basic Profile Info",
      subtitle: "Location and credentials",
      icon: Globe,
    },
    {
      title: "Detailed Company Info",
      subtitle: "Services and background",
      icon: Briefcase,
    },
    {
      title: "Representative Info",
      subtitle: "Authorized representative",
      icon: User,
    },
    { title: "Review & Confirmation", subtitle: "Final review", icon: Check },
  ];

  const visaServiceOptions = [
    "Student Visa",
    "PR Visa",
    "Work Permit",
    "Family Visa",
    "Business/Investor Visa",
    "Visitor Visa",
  ];

  const countryOptions = [
    "Canada",
    "United States",
    "United Kingdom",
    "Australia",
    "New Zealand",
    "Germany",
    "France",
    "Netherlands",
    "Denmark",
    "Sweden",
    "Norway",
    "Switzerland",
    "Austria",
    "Belgium",
    "Ireland",
    "Italy",
    "Spain",
    "Portugal",
    "Japan",
    "Singapore",
    "Hong Kong",
  ];

  const languageOptions = [
    "English",
    "French",
    "Spanish",
    "Hindi",
    "Punjabi",
    "Mandarin",
    "Arabic",
    "Portuguese",
    "German",
    "Italian",
    "Dutch",
    "Russian",
    "Japanese",
    "Korean",
    "Tagalog",
    "Urdu",
    "Bengali",
    "Tamil",
  ];

  // Load saved form data
  useEffect(() => {
    const saved = localStorage.getItem("vm-visa-org-signup");
    if (saved) {
      setFormData({ ...formData, ...JSON.parse(saved) });
    }
  }, []);

  // Save form data
  useEffect(() => {
    localStorage.setItem("vm-visa-org-signup", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Save progress to localStorage
    localStorage.setItem(
      "vm-visa-org-signup",
      JSON.stringify({ ...formData, [field]: value })
    );
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.orgName.trim())
          newErrors.orgName = "Organization name is required";
        if (formData.orgName.trim().length < 2)
          newErrors.orgName = "Organization name must be at least 2 characters";
        break;
      case 1:
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Invalid email format";
        break;
      case 2:
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 6)
          newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Passwords don't match";
        break;
      case 3:
        if (!formData.phone.trim())
          newErrors.phone = "Phone number is required";
        break;
      case 4:
        if (!formData.countryHeadquarters.trim())
          newErrors.countryHeadquarters = "Country of headquarters is required";
        if (!formData.operatingRegions.length)
          newErrors.operatingRegions =
            "Please select at least one operating region";
        if (!formData.businessLicense)
          newErrors.businessLicense = "Business license is required";
        break;
      case 5:
        if (!formData.yearEstablished.trim())
          newErrors.yearEstablished = "Year of establishment is required";
        if (!formData.registrationNumber.trim())
          newErrors.registrationNumber =
            "Registration/License number is required";
        if (!formData.servicesOffered.length)
          newErrors.servicesOffered = "Please select at least one service";
        if (!formData.languagesSupported.length)
          newErrors.languagesSupported = "Please select at least one language";
        if (!formData.companyOverview.trim())
          newErrors.companyOverview = "Company overview is required";
        break;
      case 6:
        if (!formData.repName.trim())
          newErrors.repName = "Representative name is required";
        if (!formData.repDesignation.trim())
          newErrors.repDesignation = "Designation/Title is required";
        break;
      case 7:
        if (!formData.agreeToTerms)
          newErrors.agreeToTerms = "You must agree to the terms";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      localStorage.removeItem("vm-visa-org-signup");
      
      // Prepare user data for signup
      const userData = {
        name: formData.orgName, // Use organization name as the name
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.countryHeadquarters,
        organizationName: formData.orgName,
        website: formData.website,
        registrationNumber: formData.registrationNumber,
        yearEstablished: formData.yearEstablished,
        companyOverview: formData.companyOverview,
        servicesOffered: formData.servicesOffered,
        languagesSupported: formData.languagesSupported,
        operatingRegions: formData.operatingRegions,
        repName: formData.repName,
        repDesignation: formData.repDesignation,
        repLinkedIn: formData.repLinkedIn
      };
      
      await signup(userData, "organization");
      // Redirect to organization dashboard after successful signup
      window.location.href = "/org-dashboard";
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + (error as Error).message);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Page 1: Organization Name
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                What's your organization name?
              </h2>
              <p className="text-cool-gray-600">
                Enter the official name of your immigration consultancy
              </p>
            </div>

            <div>
              <Label htmlFor="orgName" className="text-lg font-medium">
                Organization Name
              </Label>
              <Input
                id="orgName"
                value={formData.orgName}
                onChange={(e) => updateFormData("orgName", e.target.value)}
                placeholder="VM Visa Immigration Services"
                className={cn(
                  "text-lg h-14 mt-3",
                  errors.orgName && "border-red-500",
                )}
              />
              {errors.orgName && (
                <p className="text-red-500 text-sm mt-2">{errors.orgName}</p>
              )}
            </div>
          </div>
        );

      case 1: // Page 2: Email Address
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Mail className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                Official Email Address
              </h2>
              <p className="text-cool-gray-600">
                We'll check if this email is already registered
              </p>
            </div>

            <div>
              <Label htmlFor="email" className="text-lg font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="admin@yourorganization.com"
                className={cn(
                  "text-lg h-14 mt-3",
                  errors.email && "border-red-500",
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>
          </div>
        );

      case 2: // Page 3: Password Setup
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                Create Secure Password
              </h2>
              <p className="text-cool-gray-600">
                Password must be at least 8 characters
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-lg font-medium">
                  Create Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    "text-lg h-14 mt-3",
                    errors.password && "border-red-500",
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-lg font-medium"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  placeholder="••••••••"
                  className={cn(
                    "text-lg h-14 mt-3",
                    errors.confirmPassword && "border-red-500",
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3: // Page 4: Contact Information
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                Contact Information
              </h2>
              <p className="text-cool-gray-600">
                Primary phone number is required
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-lg font-medium">
                  Phone Number (with country code)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={cn(
                    "text-lg h-14 mt-3",
                    errors.phone && "border-red-500",
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="alternatePhone" className="text-lg font-medium">
                  Alternate Phone (Optional)
                </Label>
                <Input
                  id="alternatePhone"
                  type="tel"
                  value={formData.alternatePhone}
                  onChange={(e) =>
                    updateFormData("alternatePhone", e.target.value)
                  }
                  placeholder="+1 (555) 987-6543"
                  className="text-lg h-14 mt-3"
                />
              </div>

              <div>
                <Label htmlFor="whatsappNumber" className="text-lg font-medium">
                  WhatsApp Number (Optional)
                </Label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    updateFormData("whatsappNumber", e.target.value)
                  }
                  placeholder="+1 (555) 555-5555"
                  className="text-lg h-14 mt-3"
                />
              </div>
            </div>
          </div>
        );

      case 4: // Page 5: Basic Profile Info
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Globe className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                Basic Profile Information
              </h2>
              <p className="text-cool-gray-600">Location and credentials</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="countryHeadquarters"
                  className="text-lg font-medium"
                >
                  Country of Headquarters
                </Label>
                <select
                  id="countryHeadquarters"
                  value={formData.countryHeadquarters}
                  onChange={(e) =>
                    updateFormData("countryHeadquarters", e.target.value)
                  }
                  className={cn(
                    "w-full p-4 text-lg border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 mt-3",
                    errors.countryHeadquarters && "border-red-500",
                  )}
                >
                  <option value="">Select Country</option>
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.countryHeadquarters && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.countryHeadquarters}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-lg font-medium">
                  Operating Regions (Select all that apply)
                </Label>
                <div className="mt-3 grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-cool-gray-300 rounded-xl p-4">
                  {countryOptions.map((country) => (
                    <label
                      key={country}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.operatingRegions.includes(country)}
                        onCheckedChange={(checked) => {
                          const current = formData.operatingRegions;
                          if (checked) {
                            updateFormData("operatingRegions", [
                              ...current,
                              country,
                            ]);
                          } else {
                            updateFormData(
                              "operatingRegions",
                              current.filter((c) => c !== country),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{country}</span>
                    </label>
                  ))}
                </div>
                {errors.operatingRegions && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.operatingRegions}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="companyLogo" className="text-lg font-medium">
                  Company Logo
                </Label>
                <div className="mt-3 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload PNG or JPG
                  </p>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) =>
                      updateFormData("companyLogo", e.target.files?.[0] || null)
                    }
                    className="hidden"
                    id="companyLogo"
                  />
                  <label
                    htmlFor="companyLogo"
                    className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                  >
                    Choose Logo
                  </label>
                  {formData.companyLogo && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.companyLogo.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="businessLicense"
                  className="text-lg font-medium"
                >
                  Business License or Certificate
                </Label>
                <div className="mt-3 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload official license document
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateFormData(
                        "businessLicense",
                        e.target.files?.[0] || null,
                      )
                    }
                    className="hidden"
                    id="businessLicense"
                  />
                  <label
                    htmlFor="businessLicense"
                    className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                  >
                    Choose File
                  </label>
                  {formData.businessLicense && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.businessLicense.name}
                    </p>
                  )}
                </div>
                {errors.businessLicense && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.businessLicense}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 5: // Page 6: Detailed Company Info
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Briefcase className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                Detailed Company Information
              </h2>
              <p className="text-cool-gray-600">
                Services and background details
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="yearEstablished"
                    className="text-lg font-medium"
                  >
                    Year of Establishment
                  </Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    value={formData.yearEstablished}
                    onChange={(e) =>
                      updateFormData("yearEstablished", e.target.value)
                    }
                    placeholder="2020"
                    min="1900"
                    max="2024"
                    className={cn(
                      "text-lg h-14 mt-3",
                      errors.yearEstablished && "border-red-500",
                    )}
                  />
                  {errors.yearEstablished && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.yearEstablished}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="registrationNumber"
                    className="text-lg font-medium"
                  >
                    Registration/License Number
                  </Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      updateFormData("registrationNumber", e.target.value)
                    }
                    placeholder="R123456789"
                    className={cn(
                      "text-lg h-14 mt-3",
                      errors.registrationNumber && "border-red-500",
                    )}
                  />
                  {errors.registrationNumber && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.registrationNumber}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-lg font-medium">
                  Website URL (Optional)
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateFormData("website", e.target.value)}
                  placeholder="https://www.yourorganization.com"
                  className="text-lg h-14 mt-3"
                />
              </div>

              <div>
                <Label className="text-lg font-medium">
                  Visa Services Offered
                </Label>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {visaServiceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.servicesOffered.includes(service)}
                        onCheckedChange={(checked) => {
                          const current = formData.servicesOffered;
                          if (checked) {
                            updateFormData("servicesOffered", [
                              ...current,
                              service,
                            ]);
                          } else {
                            updateFormData(
                              "servicesOffered",
                              current.filter((s) => s !== service),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
                {errors.servicesOffered && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.servicesOffered}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-lg font-medium">
                  Languages Supported
                </Label>
                <div className="mt-3 grid grid-cols-3 gap-3 max-h-32 overflow-y-auto">
                  {languageOptions.map((language) => (
                    <label
                      key={language}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.languagesSupported.includes(language)}
                        onCheckedChange={(checked) => {
                          const current = formData.languagesSupported;
                          if (checked) {
                            updateFormData("languagesSupported", [
                              ...current,
                              language,
                            ]);
                          } else {
                            updateFormData(
                              "languagesSupported",
                              current.filter((l) => l !== language),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
                {errors.languagesSupported && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.languagesSupported}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="companyOverview"
                  className="text-lg font-medium"
                >
                  Brief Company Overview (max 300 words)
                </Label>
                <textarea
                  id="companyOverview"
                  value={formData.companyOverview}
                  onChange={(e) =>
                    updateFormData("companyOverview", e.target.value)
                  }
                  placeholder="Describe your immigration consultancy, expertise, and what makes you unique..."
                  maxLength={300}
                  rows={4}
                  className={cn(
                    "w-full p-4 text-lg border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 mt-3 resize-none",
                    errors.companyOverview && "border-red-500",
                  )}
                />
                <p className="text-xs text-cool-gray-500 mt-1">
                  {formData.companyOverview.length}/300 characters
                </p>
                {errors.companyOverview && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.companyOverview}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 6: // Page 7: Representative Info
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                Authorized Representative
              </h2>
              <p className="text-cool-gray-600">
                Primary contact person details
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="repName" className="text-lg font-medium">
                  Name
                </Label>
                <Input
                  id="repName"
                  value={formData.repName}
                  onChange={(e) => updateFormData("repName", e.target.value)}
                  placeholder="John Smith"
                  className={cn(
                    "text-lg h-14 mt-3",
                    errors.repName && "border-red-500",
                  )}
                />
                {errors.repName && (
                  <p className="text-red-500 text-sm mt-2">{errors.repName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="repDesignation" className="text-lg font-medium">
                  Designation/Title
                </Label>
                <Input
                  id="repDesignation"
                  value={formData.repDesignation}
                  onChange={(e) =>
                    updateFormData("repDesignation", e.target.value)
                  }
                  placeholder="Managing Director"
                  className={cn(
                    "text-lg h-14 mt-3",
                    errors.repDesignation && "border-red-500",
                  )}
                />
                {errors.repDesignation && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.repDesignation}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="repPhoto" className="text-lg font-medium">
                  Profile Photo
                </Label>
                <div className="mt-3 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload profile photo
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateFormData("repPhoto", e.target.files?.[0] || null)
                    }
                    className="hidden"
                    id="repPhoto"
                  />
                  <label
                    htmlFor="repPhoto"
                    className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                  >
                    Choose Photo
                  </label>
                  {formData.repPhoto && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.repPhoto.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="repLinkedIn" className="text-lg font-medium">
                  LinkedIn Profile URL (Optional)
                </Label>
                <Input
                  id="repLinkedIn"
                  type="url"
                  value={formData.repLinkedIn}
                  onChange={(e) =>
                    updateFormData("repLinkedIn", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/username"
                  className="text-lg h-14 mt-3"
                />
              </div>
            </div>
          </div>
        );

      case 7: // Page 8: Final Review & Confirmation
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                Final Review & Confirmation
              </h2>
              <p className="text-cool-gray-600">
                Please review your information before submitting
              </p>
            </div>

            <div className="bg-cool-gray-50 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-cool-gray-700">
                    Organization:
                  </span>
                  <p className="text-cool-gray-900">{formData.orgName}</p>
                </div>
                <div>
                  <span className="font-medium text-cool-gray-700">Email:</span>
                  <p className="text-cool-gray-900">{formData.email}</p>
                </div>
                <div>
                  <span className="font-medium text-cool-gray-700">Phone:</span>
                  <p className="text-cool-gray-900">{formData.phone}</p>
                </div>
                <div>
                  <span className="font-medium text-cool-gray-700">
                    Headquarters:
                  </span>
                  <p className="text-cool-gray-900">
                    {formData.countryHeadquarters}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-cool-gray-700">
                    Established:
                  </span>
                  <p className="text-cool-gray-900">
                    {formData.yearEstablished}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-cool-gray-700">
                    License #:
                  </span>
                  <p className="text-cool-gray-900">
                    {formData.registrationNumber}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-cool-gray-700">
                    Representative:
                  </span>
                  <p className="text-cool-gray-900">
                    {formData.repName} - {formData.repDesignation}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-cool-gray-700">
                    Services:
                  </span>
                  <p className="text-cool-gray-900">
                    {formData.servicesOffered.join(", ")}
                  </p>
                </div>
              </div>

              {formData.companyOverview && (
                <div>
                  <span className="font-medium text-cool-gray-700">
                    Company Overview:
                  </span>
                  <p className="text-cool-gray-900 mt-1">
                    {formData.companyOverview}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  updateFormData("agreeToTerms", checked)
                }
                className={cn(errors.agreeToTerms && "border-red-500")}
              />
              <div>
                <Label
                  htmlFor="agreeToTerms"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  ✅ I confirm the details are correct and I agree to VM Visa's{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    privacy policy
                  </a>
                  .
                </Label>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Form Header */}
        <div className="mb-8 text-center">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {steps[currentStep].icon &&
              React.createElement(steps[currentStep].icon, {
                className: "w-8 h-8 text-royal-blue-500",
              })}
            <div>
              <h1 className="text-2xl font-heading font-bold text-cool-gray-800">
                {steps[currentStep].title}
              </h1>
              <p className="text-cool-gray-600 text-sm">
                {steps[currentStep].subtitle}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Form Content */}
        <motion.div
          className="glass-card p-8 rounded-3xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-cool-gray-200">
            <Button
              variant="ghost"
              onClick={currentStep === 0 ? onBack : handlePrevious}
              className="group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {currentStep === 0 ? "Back to Selection" : "Previous"}
            </Button>

            <Button
              variant="premium"
              onClick={handleNext}
              className="group"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Account..."
                : currentStep === steps.length - 1
                  ? "Submit & Proceed to Dashboard"
                  : "Next"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

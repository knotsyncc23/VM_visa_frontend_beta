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
  GraduationCap,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}

interface FormData {
  // Common fields
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;

  // Agent specific
  experience?: string;
  expertise?: string[];
  license?: File | null;
  bio?: string;

  // Organization specific
  orgName?: string;
  alternatePhone?: string;
  whatsappNumber?: string;
  countryHeadquarters?: string;
  operatingRegions?: string[];
  companyLogo?: File | null;
  businessLicense?: File | null;
  yearEstablished?: string;
  registrationNumber?: string;
  website?: string;
  servicesOffered?: string[];
  languagesSupported?: string[];
  companyOverview?: string;
  repName?: string;
  repDesignation?: string;
  repPhoto?: File | null;
  repLinkedIn?: string;
}

interface MultiStepFormProps {
  type: "client" | "agent" | "organization";
  onSubmit?: (data: FormData) => void;
  onBack?: () => void;
}

export function MultiStepForm({ type, onSubmit, onBack }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
    experience: "",
    expertise: [],
    license: null,
    bio: "",
    orgName: "",
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
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup, isLoading } = useAuth();

  // Load saved form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`vm-visa-signup-${type}`);
    if (saved) {
      setFormData({ ...formData, ...JSON.parse(saved) });
    }
  }, [type]);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem(`vm-visa-signup-${type}`, JSON.stringify(formData));
  }, [formData, type]);

  const expertiseOptions = [
    "Canada PR",
    "Study Visa",
    "Work Permit",
    "Business Immigration",
    "Family Sponsorship",
    "Tourist Visa",
    "Asylum & Refugee",
    "Express Entry",
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

  const getSteps = (): Step[] => {
    if (type === "client") {
      return [
        {
          title: "Personal Information",
          subtitle: "Let's start with your name",
          icon: User,
        },
        {
          title: "Account Details",
          subtitle: "Create your secure account",
          icon: Mail,
        },
        {
          title: "Contact Information",
          subtitle: "How can we reach you?",
          icon: Phone,
        },
        { title: "Complete Setup", subtitle: "Review and submit", icon: Check },
      ];
    } else if (type === "agent") {
      return [
        {
          title: "Personal Information",
          subtitle: "Let's start with your name",
          icon: User,
        },
        {
          title: "Account Details",
          subtitle: "Create your secure account",
          icon: Mail,
        },
        {
          title: "Contact Information",
          subtitle: "How can we reach you?",
          icon: Phone,
        },
        {
          title: "Professional Experience",
          subtitle: "Tell us about your expertise",
          icon: Briefcase,
        },
        {
          title: "Areas of Expertise",
          subtitle: "What services do you specialize in?",
          icon: GraduationCap,
        },
        {
          title: "Professional Profile",
          subtitle: "Complete your profile",
          icon: Upload,
        },
        { title: "Complete Setup", subtitle: "Review and submit", icon: Check },
      ];
    } else {
      return [
        {
          title: "Organization Name",
          subtitle: "What's your organization name?",
          icon: Building,
        },
        {
          title: "Email Address",
          subtitle: "Official email address",
          icon: Mail,
        },
        {
          title: "Password Setup",
          subtitle: "Create secure password",
          icon: User,
        },
        {
          title: "Contact Information",
          subtitle: "Phone numbers",
          icon: Phone,
        },
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
        {
          title: "Review & Confirmation",
          subtitle: "Final review",
          icon: Check,
        },
      ];
    }
  };

  const steps = getSteps();

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (type === "client") {
      switch (step) {
        case 0:
          if (!formData.fullName.trim())
            newErrors.fullName = "Full name is required";
          break;
        case 1:
          if (!formData.email.trim()) newErrors.email = "Email is required";
          if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
          if (!formData.password) newErrors.password = "Password is required";
          if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
          if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords don't match";
          break;
        case 2:
          if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
          break;
        case 3:
          if (!formData.agreeToTerms)
            newErrors.agreeToTerms = "You must agree to the terms";
          break;
      }
    } else if (type === "agent") {
      switch (step) {
        case 0:
          if (!formData.fullName.trim())
            newErrors.fullName = "Full name is required";
          break;
        case 1:
          if (!formData.email.trim()) newErrors.email = "Email is required";
          if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
          if (!formData.password) newErrors.password = "Password is required";
          if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
          if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords don't match";
          break;
        case 2:
          if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
          break;
        case 3:
          if (!formData.experience?.trim())
            newErrors.experience = "Experience is required";
          break;
        case 4:
          if (!formData.expertise?.length)
            newErrors.expertise =
              "Please select at least one area of expertise";
          break;
        case 6:
          if (!formData.agreeToTerms)
            newErrors.agreeToTerms = "You must agree to the terms";
          break;
      }
    } else {
      switch (step) {
        case 0: // Organization Name
          if (!formData.orgName?.trim())
            newErrors.orgName = "Organization name is required";
          break;
        case 1: // Email Address
          if (!formData.email.trim()) newErrors.email = "Email is required";
          if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
          break;
        case 2: // Password Setup
          if (!formData.password) newErrors.password = "Password is required";
          if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
          if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords don't match";
          break;
        case 3: // Contact Information
          if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
          break;
        case 4: // Basic Profile Info
          if (!formData.countryHeadquarters?.trim())
            newErrors.countryHeadquarters =
              "Country of headquarters is required";
          if (!formData.operatingRegions?.length)
            newErrors.operatingRegions =
              "Please select at least one operating region";
          if (!formData.businessLicense)
            newErrors.businessLicense = "Business license is required";
          break;
        case 5: // Detailed Company Info
          if (!formData.yearEstablished?.trim())
            newErrors.yearEstablished = "Year of establishment is required";
          if (!formData.registrationNumber?.trim())
            newErrors.registrationNumber =
              "Registration/License number is required";
          if (!formData.servicesOffered?.length)
            newErrors.servicesOffered = "Please select at least one service";
          if (!formData.languagesSupported?.length)
            newErrors.languagesSupported =
              "Please select at least one language";
          if (!formData.companyOverview?.trim())
            newErrors.companyOverview = "Company overview is required";
          break;
        case 6: // Representative Info
          if (!formData.repName?.trim())
            newErrors.repName = "Representative name is required";
          if (!formData.repDesignation?.trim())
            newErrors.repDesignation = "Designation/Title is required";
          break;
        case 7: // Review & Confirmation
          if (!formData.agreeToTerms)
            newErrors.agreeToTerms = "You must agree to the terms";
          break;
      }
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
      localStorage.removeItem(`vm-visa-signup-${type}`);
      if (onSubmit) {
        onSubmit(formData);
      } else {
        await signup(formData, type);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderStepContent = () => {
    if (type === "client") {
      switch (currentStep) {
        case 0:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className={cn(errors.fullName && "border-red-500")}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            </div>
          );

        case 1:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="Enter your email address"
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Create a secure password"
                  className={cn(errors.password && "border-red-500")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className={cn(errors.confirmPassword && "border-red-500")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl bg-white/80 shadow-lg">
                <h3 className="text-xl font-heading font-bold mb-4">
                  Review Your Information
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    updateFormData("agreeToTerms", checked)
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
              )}
            </div>
          );
      }
    } else if (type === "agent") {
      switch (currentStep) {
        case 0:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className={cn(errors.fullName && "border-red-500")}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            </div>
          );

        case 1:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="Enter your email address"
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Create a secure password"
                  className={cn(errors.password && "border-red-500")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className={cn(errors.confirmPassword && "border-red-500")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <select
                  id="experience"
                  value={formData.experience || ""}
                  onChange={(e) => updateFormData("experience", e.target.value)}
                  className={cn(
                    "w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500",
                    errors.experience && "border-red-500",
                  )}
                >
                  <option value="">Select your experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="15+">15+ years</option>
                </select>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              <div>
                <Label>Areas of Expertise * (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {expertiseOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-xl border border-cool-gray-200 hover:bg-royal-blue-50 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.expertise?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const current = formData.expertise || [];
                          if (checked) {
                            updateFormData("expertise", [...current, option]);
                          } else {
                            updateFormData(
                              "expertise",
                              current.filter((e) => e !== option),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.expertise && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expertise}
                  </p>
                )}
              </div>
            </div>
          );

        case 5:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="license">Professional License (Optional)</Label>
                <div className="mt-2 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center hover:border-royal-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload your professional license or certification
                  </p>
                  <input
                    type="file"
                    id="license"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateFormData("license", e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                  <label
                    htmlFor="license"
                    className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                  >
                    Choose file
                  </label>
                </div>
                {formData.license && (
                  <p className="text-sm text-sage-green-600 mt-2">
                    ✓ {formData.license.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Professional Bio (Optional)</Label>
                <textarea
                  id="bio"
                  value={formData.bio || ""}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Tell us about your background and expertise..."
                  rows={4}
                  className="w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 resize-none"
                />
              </div>
            </div>
          );

        case 6:
          return (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-heading font-bold mb-4">
                  Review Your Agent Profile
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Experience:</strong> {formData.experience} years
                  </p>
                  <p>
                    <strong>Expertise:</strong> {formData.expertise?.join(", ")}
                  </p>
                  {formData.license && (
                    <p>
                      <strong>License:</strong> {formData.license.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    updateFormData("agreeToTerms", checked)
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the Agent{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    Professional Guidelines
                  </a>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
              )}
            </div>
          );
      }
    } else if (type === "organization") {
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
                  value={formData.orgName || ""}
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
              <div>
                <Label htmlFor="orgName">Organization Name *</Label>
                <Input
                  id="orgName"
                  value={formData.orgName || ""}
                  onChange={(e) => updateFormData("orgName", e.target.value)}
                  placeholder="VM Visa Immigration Services"
                  className={cn(errors.orgName && "border-red-500")}
                />
                {errors.orgName && (
                  <p className="text-red-500 text-sm mt-1">{errors.orgName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="registrationNumber">
                  Registration Number / License ID *
                </Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber || ""}
                  onChange={(e) =>
                    updateFormData("registrationNumber", e.target.value)
                  }
                  placeholder="R123456789"
                  className={cn(errors.registrationNumber && "border-red-500")}
                />
                {errors.registrationNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registrationNumber}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="yearEstablished">Year of Establishment *</Label>
                <Input
                  id="yearEstablished"
                  type="number"
                  value={formData.yearEstablished || ""}
                  onChange={(e) =>
                    updateFormData("yearEstablished", e.target.value)
                  }
                  placeholder="2020"
                  min="1900"
                  max="2024"
                  className={cn(errors.yearEstablished && "border-red-500")}
                />
                {errors.yearEstablished && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.yearEstablished}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="headOfficeCountry">
                    Head Office Country *
                  </Label>
                  <select
                    id="headOfficeCountry"
                    value={formData.headOfficeCountry || ""}
                    onChange={(e) =>
                      updateFormData("headOfficeCountry", e.target.value)
                    }
                    className={cn(
                      "w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500",
                      errors.headOfficeCountry && "border-red-500",
                    )}
                  >
                    <option value="">Select Country</option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.headOfficeCountry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.headOfficeCountry}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="headOfficeCity">Head Office City *</Label>
                  <Input
                    id="headOfficeCity"
                    value={formData.headOfficeCity || ""}
                    onChange={(e) =>
                      updateFormData("headOfficeCity", e.target.value)
                    }
                    placeholder="Toronto"
                    className={cn(errors.headOfficeCity && "border-red-500")}
                  />
                  {errors.headOfficeCity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.headOfficeCity}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website URL (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website || ""}
                  onChange={(e) => updateFormData("website", e.target.value)}
                  placeholder="https://www.yourorganization.com"
                />
              </div>

              <div>
                <Label htmlFor="officePhone">Office Phone Number *</Label>
                <Input
                  id="officePhone"
                  type="tel"
                  value={formData.officePhone || ""}
                  onChange={(e) =>
                    updateFormData("officePhone", e.target.value)
                  }
                  placeholder="+1 (416) 555-0123"
                  className={cn(errors.officePhone && "border-red-500")}
                />
                {errors.officePhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.officePhone}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="orgEmail">Organization Email Address *</Label>
                <Input
                  id="orgEmail"
                  type="email"
                  value={formData.orgEmail || ""}
                  onChange={(e) => updateFormData("orgEmail", e.target.value)}
                  placeholder="contact@yourorganization.com"
                  className={cn(errors.orgEmail && "border-red-500")}
                />
                {errors.orgEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.orgEmail}</p>
                )}
              </div>

              <div>
                <Label htmlFor="incorporationCert">
                  Upload Certificate of Incorporation *
                </Label>
                <div className="mt-2 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload PDF or Image file
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateFormData(
                        "incorporationCert",
                        e.target.files?.[0] || null,
                      )
                    }
                    className="hidden"
                    id="incorporationCert"
                  />
                  <label
                    htmlFor="incorporationCert"
                    className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                  >
                    Choose File
                  </label>
                  {formData.incorporationCert && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.incorporationCert.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );

        case 2: // Representative Information Step
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="repName">
                  Authorized Representative Name *
                </Label>
                <Input
                  id="repName"
                  value={formData.repName || ""}
                  onChange={(e) => updateFormData("repName", e.target.value)}
                  placeholder="John Smith"
                  className={cn(errors.repName && "border-red-500")}
                />
                {errors.repName && (
                  <p className="text-red-500 text-sm mt-1">{errors.repName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="repDesignation">Designation / Role *</Label>
                <Input
                  id="repDesignation"
                  value={formData.repDesignation || ""}
                  onChange={(e) =>
                    updateFormData("repDesignation", e.target.value)
                  }
                  placeholder="Managing Director"
                  className={cn(errors.repDesignation && "border-red-500")}
                />
                {errors.repDesignation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.repDesignation}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="repLinkedIn">LinkedIn Profile (Optional)</Label>
                <Input
                  id="repLinkedIn"
                  type="url"
                  value={formData.repLinkedIn || ""}
                  onChange={(e) =>
                    updateFormData("repLinkedIn", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <Label htmlFor="repPhoto">Profile Photo Upload</Label>
                <div className="mt-2 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload profile photo (JPG, PNG)
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
            </div>
          );

        case 3: // Services & Regions Step
          return (
            <div className="space-y-6">
              <div>
                <Label>Visa Services Offered *</Label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {visaServiceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={
                          formData.servicesOffered?.includes(service) || false
                        }
                        onCheckedChange={(checked) => {
                          const current = formData.servicesOffered || [];
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.servicesOffered}
                  </p>
                )}
              </div>

              <div>
                <Label>Countries You Serve *</Label>
                <div className="mt-2 grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                  {countryOptions.map((country) => (
                    <label
                      key={country}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={
                          formData.countriesServed?.includes(country) || false
                        }
                        onCheckedChange={(checked) => {
                          const current = formData.countriesServed || [];
                          if (checked) {
                            updateFormData("countriesServed", [
                              ...current,
                              country,
                            ]);
                          } else {
                            updateFormData(
                              "countriesServed",
                              current.filter((c) => c !== country),
                            );
                          }
                        }}
                      />
                      <span className="text-xs">{country}</span>
                    </label>
                  ))}
                </div>
                {errors.countriesServed && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.countriesServed}
                  </p>
                )}
              </div>

              <div>
                <Label>Languages Supported *</Label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {languageOptions.map((language) => (
                    <label
                      key={language}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={
                          formData.languagesSupported?.includes(language) ||
                          false
                        }
                        onCheckedChange={(checked) => {
                          const current = formData.languagesSupported || [];
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.languagesSupported}
                  </p>
                )}
              </div>
            </div>
          );

        case 4: // Documentation Step
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="govLicense">
                  Upload Valid Government License / Registration Proof *
                </Label>
                <div className="mt-2 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload official government license or registration document
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateFormData("govLicense", e.target.files?.[0] || null)
                    }
                    className="hidden"
                    id="govLicense"
                  />
                  <label
                    htmlFor="govLicense"
                    className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                  >
                    Choose File
                  </label>
                  {formData.govLicense && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.govLicense.name}
                    </p>
                  )}
                </div>
                {errors.govLicense && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.govLicense}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="companyLogo">Company Logo (PNG/JPG)</Label>
                <div className="mt-2 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload your company logo
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
                <Label htmlFor="companyBrochure">
                  Upload Brochure or Company Profile PDF (Optional)
                </Label>
                <div className="mt-2 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-cool-gray-600 mb-2">
                    Upload company brochure or profile document
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      updateFormData(
                        "companyBrochure",
                        e.target.files?.[0] || null,
                      )
                    }
                    className="hidden"
                    id="companyBrochure"
                  />
                  <label
                    htmlFor="companyBrochure"
                    className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                  >
                    Choose File
                  </label>
                  {formData.companyBrochure && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.companyBrochure.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );

        case 5: // Review & Confirm Step
          return (
            <div className="space-y-6">
              <div className="bg-cool-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-cool-gray-800 mb-4">
                  Review Your Information
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium">Admin:</span>{" "}
                    {formData.fullName} ({formData.email})
                  </div>
                  <div>
                    <span className="font-medium">Organization:</span>{" "}
                    {formData.orgName}
                  </div>
                  <div>
                    <span className="font-medium">Registration:</span>{" "}
                    {formData.registrationNumber}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{" "}
                    {formData.headOfficeCity}, {formData.headOfficeCountry}
                  </div>
                  <div>
                    <span className="font-medium">Representative:</span>{" "}
                    {formData.repName} - {formData.repDesignation}
                  </div>
                  <div>
                    <span className="font-medium">Services:</span>{" "}
                    {formData.servicesOffered?.join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">Countries:</span>{" "}
                    {formData.countriesServed?.join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">Languages:</span>{" "}
                    {formData.languagesSupported?.join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
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
                    className="text-sm cursor-pointer"
                  >
                    ✅ I confirm that the information provided is accurate and I
                    agree to the platform's terms and privacy policy.
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
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Form Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-cool-gray-800 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-cool-gray-600">{steps[currentStep].subtitle}</p>
        </div>

        {/* Form Content */}
        <motion.div
          className="glass-card p-8 rounded-3xl"
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
                  ? type === "organization"
                    ? "Submit & Proceed to Dashboard"
                    : "Complete Signup"
                  : "Next"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

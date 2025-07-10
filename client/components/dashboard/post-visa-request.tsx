import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Sparkles,
  Save,
  Send,
  RefreshCw,
  Edit3,
  CheckCircle,
  AlertCircle,
  Globe,
  FileText,
  Calendar,
  DollarSign,
  Clock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@shared/api";
import { useAuth } from "@/components/auth/auth-context";

interface FormData {
  title: string;
  visaType: string;
  country: string;
  description: string;
  budget: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface PostVisaRequestProps {
  onSuccess?: () => void;
}

export function PostVisaRequest({ onSuccess }: PostVisaRequestProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    visaType: "",
    country: "",
    description: "",
    budget: "",
    timeline: "",
    priority: "medium",
  });

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "saved" | "saving" | "error" | null
  >(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-draft feature - save form data every 2 seconds
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (
        formData.title ||
        formData.visaType ||
        formData.country ||
        formData.description
      ) {
        setAutoSaveStatus("saving");
        localStorage.setItem(
          "vm-visa-request-draft",
          JSON.stringify({
            ...formData,
            timestamp: Date.now(),
          }),
        );
        setTimeout(() => setAutoSaveStatus("saved"), 500);
      }
    }, 2000);

    return () => clearInterval(autoSaveTimer);
  }, [formData]);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("vm-visa-request-draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        const timeDiff = Date.now() - draft.timestamp;

        // Load draft if less than 24 hours old
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setFormData(draft);
          setAutoSaveStatus("saved");
        }
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  const visaTypes = [
    { label: "Work Permit", value: "work-permit" },
    { label: "Student Visa", value: "student-visa" },
    { label: "Tourist Visa", value: "visitor-visa" },
    { label: "Business Visa", value: "business-visa" },
    { label: "Family Sponsorship", value: "family-visa" },
    { label: "Permanent Residence", value: "permanent-residence" },
    { label: "Refugee/Asylum", value: "refugee-protection" },
    { label: "Citizenship", value: "citizenship" },
    { label: "Other", value: "other" },
  ];

  const countries = [
    "Canada",
    "United States",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "New Zealand",
    "Singapore",
    "Netherlands",
    "Sweden",
    "Norway",
    "Switzerland",
    "Other",
  ];

  const budgetRanges = [
    { label: "Under $500", value: "under-500" },
    { label: "$500 - $1,000", value: "500-1000" },
    { label: "$1,000 - $2,500", value: "1000-2500" },
    { label: "$2,500 - $5,000", value: "2500-5000" },
    { label: "$5,000 - $10,000", value: "5000-10000" },
    { label: "Over $10,000", value: "above-10000" },
  ];

  const timelineOptions = [
    { label: "ASAP (1-2 weeks)", value: "urgent" },
    { label: "1 week", value: "1-week" },
    { label: "2 weeks", value: "2-weeks" },
    { label: "1 month", value: "1-month" },
    { label: "2-3 months", value: "2-3-months" },
    { label: "3-6 months", value: "3-6-months" },
    { label: "Flexible", value: "flexible" },
  ];

  const generateAIDescription = async () => {
    if (!formData.visaType || !formData.country) {
      setErrors({
        visaType: !formData.visaType ? "Please select a visa type first" : "",
        country: !formData.country ? "Please select a country first" : "",
      });
      return;
    }

    setIsGeneratingAI(true);
    setErrors({});

    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const aiDescriptions = {
        "Work Permit": {
          Canada: `I am seeking professional assistance for a Canadian work permit application. I have a job offer from a Canadian employer and need guidance on the LMIA process, work permit documentation, and ensuring all requirements are met for a successful application. I would appreciate help with preparing my application package, reviewing my documentation, and providing expert advice throughout the process.`,
          "United States": `I require expert assistance for a U.S. work visa application (H-1B/L-1/O-1). I have relevant work experience and need help navigating the complex application process, preparing required documentation, and ensuring compliance with all USCIS requirements. Professional guidance on petition preparation and supporting evidence would be invaluable.`,
        },
        "Student Visa": {
          Canada: `I am planning to pursue higher education in Canada and need professional assistance with my student visa application. I require help with document preparation, statement of purpose writing, financial documentation, and ensuring all CIC requirements are met. Expert guidance on the application process and interview preparation would be greatly appreciated.`,
          "United Kingdom": `I am seeking admission to a UK university and require expert assistance with my student visa application. I need help with Tier 4 visa requirements, financial evidence preparation, academic documentation, and CAS-related processes. Professional guidance throughout the application journey would be extremely valuable.`,
        },
      };

      const description =
        aiDescriptions[formData.visaType]?.[formData.country] ||
        `I am seeking professional immigration assistance for my ${formData.visaType.toLowerCase()} application to ${formData.country}. I need expert guidance on documentation requirements, application procedures, and ensuring the best possible outcome for my case. Professional consultation and application support would be greatly appreciated.`;

      setFormData((prev) => ({ ...prev, description }));
      setShowAIOptions(true);
    } catch (error) {
      console.error("AI generation failed:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAIAction = (action: "accept" | "regenerate" | "edit") => {
    switch (action) {
      case "accept":
        setShowAIOptions(false);
        break;
      case "regenerate":
        generateAIDescription();
        break;
      case "edit":
        setShowAIOptions(false);
        // Focus on description textarea
        document.getElementById("description")?.focus();
        break;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.visaType) newErrors.visaType = "Visa type is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.timeline) newErrors.timeline = "Timeline is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user) {
      alert("You must be logged in to post a visa request.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create visa request data
      const requestData = {
        title: formData.title,
        description: formData.description,
        visaType: formData.visaType,
        country: formData.country,
        budget: formData.budget,
        timeline: formData.timeline,
        priority: formData.priority,
      };

      await api.createVisaRequest(requestData);

      // Clear draft after successful submission
      localStorage.removeItem("vm-visa-request-draft");

      alert(
        "Your visa request has been posted successfully! Agents will start sending proposals within 24 hours.",
      );

      // Reset form
      setFormData({
        title: "",
        visaType: "",
        country: "",
        description: "",
        budget: "",
        timeline: "",
        priority: "medium",
      });

      // Call success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to post request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          Post New Visa Request
        </h1>
        <p className="text-lg text-cool-gray-600">
          Tell us about your immigration needs and get proposals from certified
          agents.
        </p>

        {/* Auto-save indicator */}
        {autoSaveStatus && (
          <div className="flex items-center space-x-2 mt-4">
            {autoSaveStatus === "saving" ? (
              <RefreshCw className="w-4 h-4 text-cool-gray-500 animate-spin" />
            ) : autoSaveStatus === "saved" ? (
              <CheckCircle className="w-4 h-4 text-sage-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-cool-gray-600">
              {autoSaveStatus === "saving"
                ? "Saving draft..."
                : autoSaveStatus === "saved"
                  ? "Draft saved automatically"
                  : "Failed to save draft"}
            </span>
          </div>
        )}
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-card p-8 rounded-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Request Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="e.g., Need help with Canada PR application"
                className={cn(errors.title && "border-red-500")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => updateFormData("priority", e.target.value)}
                className="w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Visa Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="visaType">Visa Type *</Label>
              <select
                id="visaType"
                value={formData.visaType}
                onChange={(e) => updateFormData("visaType", e.target.value)}
                className={cn(
                  "w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500",
                  errors.visaType && "border-red-500",
                )}
              >
                <option value="">Select visa type</option>
                {visaTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.visaType && (
                <p className="text-red-500 text-sm mt-1">{errors.visaType}</p>
              )}
            </div>

            <div>
              <Label htmlFor="country">Destination Country *</Label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => updateFormData("country", e.target.value)}
                className={cn(
                  "w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500",
                  errors.country && "border-red-500",
                )}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Description with AI */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor="description">Project Description *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateAIDescription}
                disabled={
                  isGeneratingAI || !formData.visaType || !formData.country
                }
                className="group"
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 text-royal-blue-500" />
                    Smart Write with AI ✨
                  </>
                )}
              </Button>
            </div>

            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder="Describe your immigration needs, background, and any specific requirements..."
              rows={6}
              className={cn(
                "w-full p-4 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 resize-none",
                errors.description && "border-red-500",
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}

            {/* AI Options */}
            {showAIOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-royal-blue-50 rounded-xl border border-royal-blue-200"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Bot className="w-5 h-5 text-royal-blue-600" />
                  <span className="text-sm font-medium text-royal-blue-700">
                    AI-generated description ready!
                  </span>
                </div>
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAIAction("accept")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAIAction("regenerate")}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAIAction("edit")}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Manually
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Budget & Timeline */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="budget">Budget Range *</Label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => updateFormData("budget", e.target.value)}
                className={cn(
                  "w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500",
                  errors.budget && "border-red-500",
                )}
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
              )}
            </div>

            <div>
              <Label htmlFor="timeline">Timeline *</Label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => updateFormData("timeline", e.target.value)}
                className={cn(
                  "w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500",
                  errors.timeline && "border-red-500",
                )}
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>
              )}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-cool-gray-200">
            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="flex-1 group"
            >
              <Send className="w-5 h-5 mr-2" />
              Post Request
              <Star className="w-4 h-4 ml-2 group-hover:text-gold-300 transition-colors" />
            </Button>

            <Button type="button" variant="outline" size="lg">
              <Save className="w-5 h-5 mr-2" />
              Save as Draft
            </Button>
          </div>

          {/* Help Text */}
          <div className="bg-sage-green-50 p-4 rounded-xl border border-sage-green-200">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-sage-green-600 mt-0.5" />
              <div className="text-sm text-sage-green-700">
                <p className="font-medium mb-1">Pro Tips for Better Results:</p>
                <ul className="space-y-1 text-sage-green-600">
                  <li>• Be specific about your background and requirements</li>
                  <li>• Mention any deadlines or urgent timelines</li>
                  <li>• Include relevant experience or qualifications</li>
                  <li>• Use our AI assistant for professional descriptions</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

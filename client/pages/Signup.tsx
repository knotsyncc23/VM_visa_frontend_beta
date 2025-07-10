import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { OrganizationSignupForm } from "@/components/ui/organization-signup-form";
import { useAuth } from "@/components/auth/auth-context";
import {
  User,
  Briefcase,
  Building,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Users,
} from "lucide-react";

export default function Signup() {
  const [selectedType, setSelectedType] = useState<
    "client" | "agent" | "organization" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();

  const signupTypes = [
    {
      type: "client" as const,
      title: "Individual Client",
      description: "Looking for immigration services for yourself or family",
      icon: User,
      features: [
        "Personal immigration guidance",
        "Document assistance",
        "Application tracking",
        "Expert consultation",
      ],
      color: "from-royal-blue-500 to-sky-blue-400",
      popular: true,
    },
    {
      type: "agent" as const,
      title: "Immigration Agent",
      description: "Join our network of certified immigration professionals",
      icon: Briefcase,
      features: [
        "Access to client management tools",
        "Professional dashboard",
        "Commission tracking",
        "Marketing support",
      ],
      color: "from-sage-green-500 to-mint-green-400",
      popular: false,
    },
    {
      type: "organization" as const,
      title: "Organization",
      description: "Register your immigration consulting firm",
      icon: Building,
      features: [
        "Team management",
        "Multi-agent access",
        "Advanced analytics",
        "White-label solutions",
      ],
      color: "from-gold-500 to-sandstone-400",
      popular: false,
    },
  ];

  const handleFormSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    
    if (!selectedType) return;
    
    try {
      setIsSubmitting(true);
      
      // Map form data to the expected format
      const signupData = {
        name: data.fullName || data.orgName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        bio: data.bio || data.companyOverview || "",
        location: data.countryHeadquarters || "",
      };
      
      console.log("Calling signup API with:", signupData, "userType:", selectedType);
      
      await signup(signupData, selectedType);
      
      // If we get here, signup was successful and user should be redirected automatically
      console.log("Signup successful!");
      
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(`Signup failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToSelection = () => {
    setSelectedType(null);
  };

  if (selectedType) {
    if (selectedType === "organization") {
      return (
        <OrganizationSignupForm
          onSubmit={handleFormSubmit}
          onBack={handleBackToSelection}
        />
      );
    }

    return (
      <MultiStepForm
        type={selectedType}
        onSubmit={handleFormSubmit}
        onBack={handleBackToSelection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center space-x-3 mb-8 group"
          >
            <div className="w-12 h-12 bg-gradient-royal rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold gradient-text">
                VM Visa
              </h1>
              <p className="text-xs text-cool-gray-600">Global Immigration</p>
            </div>
          </Link>

          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-cool-gray-800 mb-4">
            Join the <span className="gradient-text">VM Visa</span> Community
          </h2>
          <p className="text-xl text-cool-gray-600 max-w-2xl mx-auto">
            Choose your account type to get started with our comprehensive
            immigration platform
          </p>
        </motion.div>

        {/* Signup Type Selection */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {signupTypes.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                {type.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-premium text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className="glass-card p-8 rounded-3xl h-full hover:bg-white/40 transition-all duration-500 group cursor-pointer"
                  onClick={() => setSelectedType(type.type)}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <type.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-bold text-cool-gray-800 mb-3">
                    {type.title}
                  </h3>

                  <p className="text-cool-gray-600 mb-6 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-cool-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-sage-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-royal-blue-50 group-hover:border-royal-blue-300 transition-all duration-300"
                  >
                    Sign Up as {type.title}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20"
        >
          <div className="glass-card p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-heading font-bold gradient-text mb-6">
              Why Choose VM Visa?
            </h3>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "Secure & Trusted",
                  description: "Bank-level security with 98% success rate",
                },
                {
                  icon: Users,
                  title: "Expert Support",
                  description: "24/7 assistance from certified professionals",
                },
                {
                  icon: Globe,
                  title: "Global Network",
                  description: "Serving 150+ countries worldwide",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-royal rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-cool-gray-800 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-cool-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-cool-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-royal-blue-600 hover:text-royal-blue-700 font-semibold hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

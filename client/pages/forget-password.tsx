import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Globe,
  ArrowRight,
  ArrowLeft,
  Shield,
  Mail,
  CheckCircle,
  Plane,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ForgotPassword() {
  const [userType, setUserType] = useState<"client" | "agent" | "organization">(
    "client",
  );
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const userTypes = [
    { value: "client", label: "Client", icon: Users },
    { value: "agent", label: "Agent", icon: Shield },
    { value: "organization", label: "Organization", icon: Globe },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          userType: userType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setErrors({ general: data.error || 'Failed to send reset email' });
      }
    } catch (error) {
      console.error('Forgot password failed:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-royal-blue-900 via-royal-blue-700 to-sky-blue-600 text-white p-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl animate-float [animation-delay:1s]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-md">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center space-x-3 mb-8"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold">VM Visa</h1>
                <p className="text-sky-blue-200 text-sm">Global Immigration</p>
              </div>
            </motion.div>

            {/* Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative w-64 h-48 mx-auto">
                {/* Success checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-4">
                Check Your Email
              </h2>
              <p className="text-sky-blue-200 text-lg leading-relaxed">
                We've sent password reset instructions to your email address.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Success Message */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-white to-royal-blue-50/30"
        >
          <div className="w-full max-w-md mx-auto text-center">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-royal rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold gradient-text">
                  VM Visa
                </h1>
                <p className="text-xs text-cool-gray-600">Global Immigration</p>
              </div>
            </div>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-cool-gray-800 mb-4">
                Email Sent!
              </h2>
              <p className="text-cool-gray-600 mb-4">
                We've sent password reset instructions to:
              </p>
              <p className="text-royal-blue-600 font-semibold text-lg">
                {formData.email}
              </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-sky-blue-50 border border-sky-blue-200 rounded-xl p-6 mb-8"
            >
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-sky-blue-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-cool-gray-800 mb-2">
                    What's next?
                  </h3>
                  <ul className="text-sm text-cool-gray-600 space-y-1">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the reset link in the email</li>
                    <li>• Create a new password</li>
                    <li>• Sign in with your new password</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Back to Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link to="/login">
                <Button variant="outline" size="lg" className="group">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </Button>
              </Link>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-cool-gray-600">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-royal-blue-600 hover:text-royal-blue-700 font-semibold hover:underline transition-colors"
                >
                  Try again
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-royal-blue-900 via-royal-blue-700 to-sky-blue-600 text-white p-12 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl animate-float [animation-delay:1s]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center space-x-3 mb-8"
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold">VM Visa</h1>
              <p className="text-sky-blue-200 text-sm">Global Immigration</p>
            </div>
          </motion.div>

          {/* Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-64 h-48 mx-auto">
              {/* Lock/Shield icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-12 h-12 text-gold-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Secure Password Recovery
            </h2>
            <p className="text-sky-blue-200 text-lg leading-relaxed">
              We'll help you regain access to your VM Visa account safely and securely.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-white to-royal-blue-50/30"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-royal rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold gradient-text">
                VM Visa
              </h1>
              <p className="text-xs text-cool-gray-600">Global Immigration</p>
            </div>
          </div>

          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-cool-gray-800 mb-2">
              Forgot Password?
            </h2>
            <p className="text-cool-gray-600">
              Enter your email address and we'll send you a reset link
            </p>
          </motion.div>

          {/* User Type Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <Label className="text-sm font-medium text-cool-gray-700 mb-3 block">
              Account type:
            </Label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-cool-gray-100 rounded-xl">
              {userTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setUserType(type.value as typeof userType)}
                  className={cn(
                    "flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
                    userType === type.value
                      ? type.value === "client"
                        ? "bg-[#B3ECFF] text-royal-blue-700 shadow-sm"
                        : type.value === "agent"
                        ? "bg-[#FFD966] text-royal-blue-700 shadow-sm"
                        : "bg-[#a8cfa8] text-royal-blue-700 shadow-sm"
                      : "text-cool-gray-600 hover:text-cool-gray-800",
                  )}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{type.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your email address"
                className={cn(
                  "mt-1 rounded-xl",
                  errors.email && "border-red-500 focus:border-red-500",
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                "Sending Reset Link..."
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.form>

          {/* Back to Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center mt-8"
          >
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-royal-blue-600 hover:text-royal-blue-700 font-semibold hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </motion.div>

          {/* Signup Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-4"
          >
            <p className="text-cool-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-royal-blue-600 hover:text-royal-blue-700 font-semibold hover:underline transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

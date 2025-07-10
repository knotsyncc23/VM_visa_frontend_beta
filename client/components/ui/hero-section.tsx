import React from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { ArrowRight, Globe, Shield, Zap, Star } from "lucide-react";

export function HeroSection() {
  const features = [
    { icon: Globe, text: "Global Coverage" },
    { icon: Shield, text: "Secure Process" },
    { icon: Zap, text: "Fast Processing" },
    { icon: Star, text: "Expert Support" },
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden immigration-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-royal rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-sage rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-warm rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Visa Cards */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 right-20 w-32 h-20 bg-gradient-premium rounded-xl shadow-2xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 left-16 w-28 h-18 bg-gradient-sage rounded-xl shadow-2xl opacity-15"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 right-32 w-24 h-15 bg-gradient-warm rounded-xl shadow-2xl opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full"
            >
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-royal-blue-700">
                #1 Immigration Platform
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-heading font-bold leading-tight"
              >
                Your Gateway to{" "}
                <span className="gradient-text">Global Dreams</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl lg:text-2xl text-cool-gray-600 font-body leading-relaxed"
              >
                Navigate your immigration journey with confidence. Expert
                guidance, seamless processes, and personalized support for your
                visa applications.
              </motion.p>
            </div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <feature.icon className="w-4 h-4 text-royal-blue-600" />
                  <span className="text-sm font-medium text-cool-gray-700">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="premium" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="glass" size="xl" className="group">
                Watch Demo
                <div className="w-2 h-2 bg-royal-blue-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-heading font-bold gradient-text">
                  50K+
                </div>
                <div className="text-sm text-cool-gray-600">
                  Successful Applications
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold gradient-text">
                  150+
                </div>
                <div className="text-sm text-cool-gray-600">
                  Countries Covered
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold gradient-text">
                  98%
                </div>
                <div className="text-sm text-cool-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-royal-blue-100 to-sky-blue-100 flex items-center justify-center">
                  {/* Immigration themed SVG illustration */}
                  <svg viewBox="0 0 400 300" className="w-full h-full p-8">
                    {/* World map outline */}
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-royal-blue-300 opacity-30"
                    >
                      <path d="M50 150 C100 120, 150 140, 200 130 C250 120, 300 140, 350 150 C300 180, 250 160, 200 170 C150 180, 100 160, 50 150 Z" />
                      <circle cx="120" cy="140" r="3" fill="currentColor" />
                      <circle cx="180" cy="135" r="3" fill="currentColor" />
                      <circle cx="280" cy="145" r="3" fill="currentColor" />
                    </g>

                    {/* Airplane paths */}
                    <g className="text-sage-green-500">
                      <motion.path
                        d="M80 120 Q200 80, 320 140"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.circle
                        r="4"
                        fill="currentColor"
                        cx="80"
                        cy="120"
                        animate={{
                          cx: [80, 200, 320],
                          cy: [120, 80, 140],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </g>

                    {/* Passport/Document icons */}
                    <g className="text-gold-500">
                      <rect
                        x="150"
                        y="200"
                        width="40"
                        height="60"
                        rx="4"
                        fill="currentColor"
                        opacity="0.8"
                      />
                      <rect
                        x="155"
                        y="205"
                        width="30"
                        height="20"
                        rx="2"
                        fill="white"
                      />
                      <rect
                        x="155"
                        y="230"
                        width="30"
                        height="3"
                        rx="1"
                        fill="white"
                      />
                      <rect
                        x="155"
                        y="240"
                        width="20"
                        height="3"
                        rx="1"
                        fill="white"
                      />
                    </g>

                    {/* Success checkmarks */}
                    <g className="text-mint-green-500">
                      <motion.circle
                        cx="300"
                        cy="100"
                        r="15"
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      />
                      <motion.path
                        d="M295 100 L300 105 L308 95"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                      />
                    </g>
                  </svg>
                </div>

                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </motion.div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -left-6 glass-card p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-sage rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cool-gray-800">
                      Secure Processing
                    </div>
                    <div className="text-xs text-cool-gray-600">
                      Bank-level encryption
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-premium rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cool-gray-800">
                      Fast Track
                    </div>
                    <div className="text-xs text-cool-gray-600">
                      Express processing
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-warm rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-royal rounded-full blur-2xl opacity-15 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import {
  Plane,
  GraduationCap,
  Briefcase,
  Heart,
  Shield,
  Clock,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export function FeaturesSection() {
  const visaTypes = [
    {
      icon: Briefcase,
      title: "Work Visas",
      description: "Professional opportunities worldwide",
      color: "from-royal-blue-500 to-sky-blue-400",
      stats: "15K+ Applications",
    },
    {
      icon: GraduationCap,
      title: "Student Visas",
      description: "Educational pathways to global institutions",
      color: "from-sage-green-500 to-mint-green-400",
      stats: "8K+ Students",
    },
    {
      icon: Heart,
      title: "Family Visas",
      description: "Reunite with loved ones across borders",
      color: "from-sandstone-400 to-creamy-beige-300",
      stats: "12K+ Reunions",
    },
    {
      icon: Plane,
      title: "Tourist Visas",
      description: "Explore the world with confidence",
      color: "from-gold-500 to-gold-400",
      stats: "25K+ Travelers",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your documents are protected with bank-level encryption",
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Get your visa applications processed in record time",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 assistance from immigration specialists",
    },
    {
      icon: Award,
      title: "High Success Rate",
      description: "98% approval rate with our premium service",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white to-royal-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-royal-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-royal-blue-700">
              Complete Immigration Solutions
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
            Your <span className="gradient-text">Immigration Journey</span>{" "}
            Simplified
          </h2>

          <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial consultation to visa approval, we guide you through
            every step with expert precision and personalized care.
          </p>
        </motion.div>

        {/* Visa Types Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {visaTypes.map((visa, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group floating-card glass-card p-8 rounded-3xl hover:bg-white/30 transition-all duration-500"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${visa.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <visa.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-3">
                {visa.title}
              </h3>

              <p className="text-cool-gray-600 mb-4 leading-relaxed">
                {visa.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-royal-blue-600">
                  {visa.stats}
                </span>
                <ArrowRight className="w-4 h-4 text-royal-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <feature.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-lg font-heading font-bold text-cool-gray-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-cool-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 rounded-3xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold gradient-text mb-4">
              Simple 4-Step Process
            </h3>
            <p className="text-cool-gray-600 text-lg">
              Get your visa approved in just a few easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Free assessment of your eligibility",
              },
              {
                step: "02",
                title: "Documentation",
                description: "Secure document collection and verification",
              },
              {
                step: "03",
                title: "Application",
                description: "Professional submission and tracking",
              },
              {
                step: "04",
                title: "Approval",
                description: "Receive your visa and travel documents",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative text-center group"
              >
                {/* Step number */}
                <div className="w-16 h-16 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-white">
                    {item.step}
                  </span>
                </div>

                {/* Connecting line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-royal-blue-300 to-transparent transform translate-x-8"></div>
                )}

                <h4 className="text-lg font-heading font-bold text-cool-gray-800 mb-2">
                  {item.title}
                </h4>

                <p className="text-cool-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.3 }}
                  className="mt-4"
                >
                  <CheckCircle className="w-6 h-6 text-sage-green-500 mx-auto" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="premium" size="lg" className="group">
              Start Your Application
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

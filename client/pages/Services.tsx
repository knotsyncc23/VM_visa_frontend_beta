import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  GraduationCap,
  Heart,
  Plane,
  Building,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Briefcase,
      title: "Work Visas",
      description:
        "Professional work permits and employment-based immigration solutions.",
      features: [
        "H-1B Visa Applications",
        "L-1 Intracompany Transfers",
        "O-1 Extraordinary Ability",
        "TN NAFTA Professional",
      ],
      color: "from-royal-blue-500 to-sky-blue-400",
    },
    {
      icon: GraduationCap,
      title: "Student Visas",
      description:
        "Educational pathways to top universities and institutions worldwide.",
      features: [
        "F-1 Student Visas",
        "J-1 Exchange Programs",
        "M-1 Vocational Training",
        "OPT Extensions",
      ],
      color: "from-sage-green-500 to-mint-green-400",
    },
    {
      icon: Heart,
      title: "Family Immigration",
      description:
        "Reunite with loved ones through family-based immigration programs.",
      features: [
        "Spouse Visas",
        "Parent Sponsorship",
        "Child Immigration",
        "Fiancé Visas",
      ],
      color: "from-sandstone-400 to-creamy-beige-300",
    },
    {
      icon: Plane,
      title: "Tourist Visas",
      description:
        "Travel documents for tourism, business trips, and short-term visits.",
      features: [
        "B-1/B-2 Tourist Visas",
        "Business Travel",
        "Medical Tourism",
        "Transit Visas",
      ],
      color: "from-gold-500 to-gold-400",
    },
    {
      icon: Building,
      title: "Business Immigration",
      description:
        "Investment and entrepreneur visa programs for business owners.",
      features: [
        "EB-5 Investor Visas",
        "E-2 Treaty Investors",
        "Startup Visas",
        "Business Planning",
      ],
      color: "from-royal-blue-600 to-royal-blue-500",
    },
    {
      icon: Shield,
      title: "Asylum & Protection",
      description:
        "Legal protection for those fleeing persecution and seeking safety.",
      features: [
        "Asylum Applications",
        "Refugee Status",
        "Withholding of Removal",
        "Family Protection",
      ],
      color: "from-sage-green-600 to-sage-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-royal-blue-50/30">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-royal-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-royal-blue-700">
              Comprehensive Immigration Services
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
            Our <span className="gradient-text">Immigration Services</span>
          </h1>

          <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto leading-relaxed">
            From work permits to family reunification, we provide expert
            guidance for all your immigration needs with personalized support
            every step of the way.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="floating-card glass-card p-8 rounded-3xl hover:bg-white/40 transition-all duration-500 group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-heading font-bold text-cool-gray-800 mb-4">
                {service.title}
              </h3>

              <p className="text-cool-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-cool-gray-700"
                  >
                    <div className="w-1.5 h-1.5 bg-royal-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full group-hover:bg-royal-blue-50"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 rounded-3xl text-center"
        >
          <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-cool-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation with our immigration experts to find the
            best pathway for your unique situation.
          </p>
          <Button variant="premium" size="lg" className="group">
            Get Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Globe,
  Award,
  Shield,
  Heart,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

export default function About() {
  const stats = [
    { number: "50K+", label: "Successful Applications", icon: CheckCircle },
    { number: "150+", label: "Countries Served", icon: Globe },
    { number: "98%", label: "Success Rate", icon: Award },
    { number: "24/7", label: "Expert Support", icon: Shield },
  ];

  const values = [
    {
      icon: Heart,
      title: "Client-Centric Approach",
      description:
        "Every decision we make is guided by what's best for our clients' immigration journey.",
    },
    {
      icon: Shield,
      title: "Integrity & Trust",
      description:
        "We maintain the highest standards of professional ethics and transparency.",
    },
    {
      icon: Target,
      title: "Excellence in Service",
      description:
        "We strive for perfection in every application and consultation we provide.",
    },
    {
      icon: Globe,
      title: "Global Expertise",
      description:
        "Our team brings deep knowledge of immigration laws across 150+ countries.",
    },
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "CEO & Founder",
      image: "👩‍💼",
      experience: "15+ years immigration law",
    },
    {
      name: "Dr. James Chen",
      role: "Head of Operations",
      image: "👨‍💼",
      experience: "12+ years global immigration",
    },
    {
      name: "Maria Rodriguez",
      role: "Senior Immigration Consultant",
      image: "👩‍⚖️",
      experience: "10+ years client relations",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-royal-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-royal-blue-700">
                About VM Visa
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
              Transforming{" "}
              <span className="gradient-text">Immigration Dreams</span> Into
              Reality
            </h1>

            <p className="text-xl lg:text-2xl text-cool-gray-600 leading-relaxed mb-8">
              For over a decade, VM Visa has been the trusted bridge connecting
              ambitious individuals with global opportunities, making complex
              immigration processes simple and successful.
            </p>

            <Button variant="premium" size="lg" className="group">
              Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-heading font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <p className="text-cool-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gradient-to-b from-white to-royal-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>

              <div className="space-y-6 text-cool-gray-700 leading-relaxed">
                <p className="text-lg">
                  Founded in 2010 by immigration attorney Sarah Mitchell, VM
                  Visa began with a simple mission: to make global immigration
                  accessible, transparent, and successful for everyone.
                </p>

                <p>
                  What started as a small consulting firm in Toronto has grown
                  into a global network of immigration experts, serving clients
                  in over 150 countries. Our journey has been marked by
                  countless success stories, from helping students pursue their
                  educational dreams abroad to reuniting families across
                  continents.
                </p>

                <p>
                  Today, VM Visa stands as a beacon of hope for those seeking
                  new opportunities beyond borders. We've processed over 50,000
                  successful applications, maintaining an industry-leading 98%
                  success rate through our commitment to excellence and
                  personalized service.
                </p>
              </div>

              <div className="mt-8">
                <Button variant="outline" size="lg" className="group">
                  View Our Timeline
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-3xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-royal-blue-100 to-sage-green-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-24 h-24 text-royal-blue-500 mx-auto mb-4" />
                    <p className="text-royal-blue-700 font-semibold text-lg">
                      Global Immigration Excellence
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating achievement cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-gold-500" />
                  <div>
                    <div className="font-bold text-cool-gray-800">
                      Award Winner
                    </div>
                    <div className="text-sm text-cool-gray-600">
                      Best Immigration Firm 2023
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
                className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-sage-green-500" />
                  <div>
                    <div className="font-bold text-cool-gray-800">
                      50K+ Clients
                    </div>
                    <div className="text-sm text-cool-gray-600">
                      Served Worldwide
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we
              make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="floating-card glass-card p-8 rounded-3xl text-center hover:bg-white/40 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-sage rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-4">
                  {value.title}
                </h3>

                <p className="text-cool-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-white to-sage-green-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Meet Our <span className="gradient-text">Leadership Team</span>
            </h2>
            <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your immigration success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="floating-card glass-card p-8 rounded-3xl text-center"
              >
                <div className="text-6xl mb-6">{member.image}</div>

                <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-2">
                  {member.name}
                </h3>

                <p className="text-royal-blue-600 font-semibold mb-4">
                  {member.role}
                </p>

                <p className="text-cool-gray-600 text-sm">
                  {member.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-royal-blue-900 via-royal-blue-700 to-sky-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Ready to Start Your Immigration Journey?
            </h2>

            <p className="text-xl text-sky-blue-200 mb-12 leading-relaxed">
              Join thousands of successful applicants who trusted VM Visa with
              their dreams. Let our expertise guide you to your new life abroad.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="gold" size="xl" className="group">
                Book Free Consultation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="glass"
                size="xl"
                className="text-white border-white/30 hover:bg-white/20"
              >
                View Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

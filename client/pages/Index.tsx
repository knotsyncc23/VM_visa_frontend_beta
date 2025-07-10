import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { Button } from "@/components/ui/button";
import {
  Star,
  Quote,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Clock,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      country: "Canada",
      image: "🇨🇦",
      quote:
        "VM Visa made my work visa application seamless. Their expert guidance saved me months of confusion.",
      rating: 5,
    },
    {
      name: "Ahmed Hassan",
      role: "Medical Student",
      country: "Germany",
      image: "🇩🇪",
      quote:
        "The student visa process was incredibly smooth. I'm now studying in Berlin thanks to their support.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Business Owner",
      country: "Australia",
      image: "🇦🇺",
      quote:
        "Professional, fast, and reliable. VM Visa helped me reunite with my family in Australia.",
      rating: 5,
    },
  ];

  const countries = [
    { name: "United States", flag: "🇺🇸", visas: "2.5K+" },
    { name: "Canada", flag: "🇨🇦", visas: "1.8K+" },
    { name: "United Kingdom", flag: "🇬🇧", visas: "1.2K+" },
    { name: "Australia", flag: "🇦🇺", visas: "900+" },
    { name: "Germany", flag: "🇩🇪", visas: "1.5K+" },
    { name: "Singapore", flag: "🇸🇬", visas: "600+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Countries Section */}
      <section className="py-24 bg-gradient-to-b from-royal-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Serving <span className="gradient-text">150+ Countries</span>{" "}
              Worldwide
            </h2>
            <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto">
              Our global network ensures comprehensive immigration support
              wherever your dreams take you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-8 rounded-2xl text-center hover:bg-white/40 transition-all duration-300 group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </div>
                <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-2">
                  {country.name}
                </h3>
                <p className="text-royal-blue-600 font-semibold">
                  {country.visas} visas processed
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Success Stories from{" "}
              <span className="gradient-text">Happy Clients</span>
            </h2>
            <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto">
              Join thousands of successful applicants who trusted VM Visa with
              their immigration journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="floating-card glass-card p-8 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gold-500 fill-current"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-royal-blue-300" />
                </div>

                <p className="text-cool-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-heading font-bold text-cool-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-cool-gray-600">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-royal-blue-600 font-semibold">
                      Now in {testimonial.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-royal-blue-900 via-royal-blue-700 to-sky-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl lg:text-2xl text-sky-blue-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              Get a free consultation today and take the first step towards your
              immigration goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button variant="gold" size="xl" className="group">
                Book Free Consultation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="glass"
                size="xl"
                className="text-white border-white/30 hover:bg-white/20"
              >
                <Phone className="w-5 h-5" />
                Call Now: +1-800-VM-VISA
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Users, stat: "50K+", label: "Happy Clients" },
                { icon: Globe, stat: "150+", label: "Countries" },
                { icon: Award, stat: "98%", label: "Success Rate" },
                { icon: Clock, stat: "24/7", label: "Support" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <item.icon className="w-8 h-8 text-gold-400" />
                  </div>
                  <div className="text-3xl font-heading font-bold mb-2">
                    {item.stat}
                  </div>
                  <div className="text-sky-blue-200">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cool-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-royal rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold gradient-text">
                    VM Visa
                  </h3>
                  <p className="text-xs text-cool-gray-400">
                    Global Immigration
                  </p>
                </div>
              </div>
              <p className="text-cool-gray-300 leading-relaxed">
                Your trusted partner for seamless immigration solutions
                worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-heading font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-cool-gray-300">
                <li>Work Visas</li>
                <li>Student Visas</li>
                <li>Family Visas</li>
                <li>Tourist Visas</li>
                <li>Business Immigration</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-heading font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-cool-gray-300">
                <li>Help Center</li>
                <li>Live Chat</li>
                <li>Phone Support</li>
                <li>Email Support</li>
                <li>Document Status</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-heading font-bold mb-4">Contact</h4>
              <div className="space-y-3 text-cool-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1-800-VM-VISA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@vmvisa.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Global Offices</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-cool-gray-700 mt-12 pt-8 text-center text-cool-gray-400">
            <p>
              © 2024 VM Visa. All rights reserved. | Privacy Policy | Terms of
              Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

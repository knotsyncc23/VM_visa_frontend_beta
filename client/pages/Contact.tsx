import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Globe,
  CheckCircle,
  ArrowRight,
  Headphones,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our immigration experts",
      contact: "+1-800-VM-VISA",
      action: "Call Now",
      color: "from-royal-blue-500 to-sky-blue-400",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get detailed responses to your questions",
      contact: "support@vmvisa.com",
      action: "Send Email",
      color: "from-sage-green-500 to-mint-green-400",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support during business hours",
      contact: "Available 24/7",
      action: "Start Chat",
      color: "from-gold-500 to-sandstone-400",
    },
    {
      icon: Calendar,
      title: "Book Consultation",
      description: "Schedule a personalized session",
      contact: "Free 30-min consultation",
      action: "Book Now",
      color: "from-royal-blue-600 to-royal-blue-500",
    },
  ];

  const offices = [
    {
      city: "Toronto",
      country: "Canada",
      flag: "🇨🇦",
      address: "123 Bay Street, Suite 1000\nToronto, ON M5K 1A1",
      phone: "+1 (416) 555-0100",
      hours: "Mon-Fri: 9AM-6PM EST",
    },
    {
      city: "London",
      country: "United Kingdom",
      flag: "🇬🇧",
      address: "45 King William Street\nLondon EC4R 9AN",
      phone: "+44 20 7123 4567",
      hours: "Mon-Fri: 9AM-5PM GMT",
    },
    {
      city: "Sydney",
      country: "Australia",
      flag: "🇦🇺",
      address: "Level 15, 1 Martin Place\nSydney NSW 2000",
      phone: "+61 2 9876 5432",
      hours: "Mon-Fri: 9AM-5PM AEST",
    },
  ];

  const faqs = [
    {
      question: "How long does the visa application process take?",
      answer:
        "Processing times vary by country and visa type, typically 2-8 weeks. We provide real-time tracking for all applications.",
    },
    {
      question: "What documents do I need for my application?",
      answer:
        "Document requirements depend on your specific visa type. We provide a personalized checklist after your consultation.",
    },
    {
      question: "Do you offer refunds if my visa is rejected?",
      answer:
        "We offer a satisfaction guarantee. If your application is rejected due to our error, we provide a full refund and reprocessing.",
    },
    {
      question: "Can you help with urgent visa applications?",
      answer:
        "Yes, we offer expedited processing services for urgent cases with additional fees. Contact us for availability.",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(
        "Thank you! Your message has been sent. We'll get back to you within 24 hours.",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch (error) {
      alert(
        "Sorry, there was an error sending your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

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
                Get In Touch
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
              <span className="gradient-text">Contact</span> Our Immigration
              Experts
            </h1>

            <p className="text-xl lg:text-2xl text-cool-gray-600 leading-relaxed mb-8">
              Ready to start your immigration journey? Our team of certified
              experts is here to guide you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Multiple Ways to <span className="gradient-text">Reach Us</span>
            </h2>
            <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for you. We're here to help
              24/7.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="floating-card glass-card p-8 rounded-3xl text-center hover:bg-white/40 transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-3">
                  {method.title}
                </h3>

                <p className="text-cool-gray-600 mb-4 leading-relaxed">
                  {method.description}
                </p>

                <p className="text-royal-blue-600 font-semibold mb-6">
                  {method.contact}
                </p>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-royal-blue-50"
                >
                  {method.action}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-24 bg-gradient-to-b from-white to-royal-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-3xl font-heading font-bold gradient-text mb-6">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        placeholder="Your full name"
                        className={cn(errors.name && "border-red-500")}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          updateFormData("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        className={cn(errors.email && "border-red-500")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          updateFormData("phone", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <select
                        id="inquiryType"
                        value={formData.inquiryType}
                        onChange={(e) =>
                          updateFormData("inquiryType", e.target.value)
                        }
                        className="w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="consultation">Book Consultation</option>
                        <option value="application">Application Status</option>
                        <option value="support">Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        updateFormData("subject", e.target.value)
                      }
                      placeholder="Brief description of your inquiry"
                      className={cn(errors.subject && "border-red-500")}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        updateFormData("message", e.target.value)
                      }
                      placeholder="Please provide details about your immigration needs..."
                      rows={6}
                      className={cn(
                        "w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 resize-none",
                        errors.message && "border-red-500",
                      )}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="premium"
                    size="lg"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-heading font-bold gradient-text mb-6">
                  Our Global Offices
                </h3>
                <p className="text-cool-gray-600 mb-8 leading-relaxed">
                  Visit us at one of our offices worldwide, or connect with us
                  virtually from anywhere.
                </p>
              </div>

              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="glass-card p-6 rounded-2xl hover:bg-white/40 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{office.flag}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-heading font-bold text-cool-gray-800 mb-2">
                        {office.city}, {office.country}
                      </h4>

                      <div className="space-y-2 text-sm text-cool-gray-600">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-royal-blue-500 flex-shrink-0" />
                          <span className="whitespace-pre-line">
                            {office.address}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-sage-green-500" />
                          <span>{office.phone}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gold-500" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our immigration services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h4 className="text-lg font-heading font-bold text-cool-gray-800 mb-3">
                  {faq.question}
                </h4>
                <p className="text-cool-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-cool-gray-600 mb-6">
              Don't see your question answered above?
            </p>
            <Button variant="outline" size="lg" className="group">
              <Headphones className="w-5 h-5" />
              Contact Support
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-br from-royal-blue-900 via-royal-blue-700 to-sky-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-3xl font-heading font-bold mb-4">
              Need Urgent Assistance?
            </h3>
            <p className="text-sky-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              For urgent immigration matters or time-sensitive applications,
              contact our emergency support line.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="gold" size="lg" className="group">
                <Phone className="w-5 h-5" />
                Emergency Line: +1-800-URGENT
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <span className="text-sky-blue-200">Available 24/7</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

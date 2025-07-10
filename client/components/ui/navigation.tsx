import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import {
  Globe,
  FileText,
  Users,
  MessageCircle,
  Shield,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Globe },
    { href: "/services", label: "Services", icon: FileText },
    { href: "/about", label: "About Us", icon: Users },
    { href: "/contact", label: "Contact", icon: MessageCircle },
    { href: "/blog", label: "Blog", icon: Shield },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-card backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-xl"
          : "bg-transparent",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-royal rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold gradient-text">
                VM Visa
              </h1>
              <p className="text-xs text-cool-gray-600 font-medium">
                Global Immigration
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm group",
                  location.pathname === item.href
                    ? "bg-white/30 text-royal-blue-700 font-semibold"
                    : "text-cool-gray-700 hover:text-royal-blue-700",
                )}
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="font-semibold">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="premium" size="lg" className="group">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-cool-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-cool-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card border-t border-white/20"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-white/20",
                      location.pathname === item.href
                        ? "bg-white/30 text-royal-blue-700 font-semibold"
                        : "text-cool-gray-700",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center text-lg"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full justify-center group"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

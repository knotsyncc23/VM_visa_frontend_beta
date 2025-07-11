import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  DollarSign,
  MessageCircle,
  Heart,
  Award,
  CheckCircle,
  Globe,
  Briefcase,
  Calendar,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: number;
  specializations: string[];
  countries: string[];
  hourlyRate: number;
  responseTime: string;
  successRate: number;
  completedProjects: number;
  isOnline: boolean;
  verified: boolean;
  languages: string[];
  bio: string;
  recentWork: string[];
}

export function BrowseAgents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const agents: Agent[] = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "👩‍💼",
      rating: 4.9,
      reviewCount: 127,
      experience: 8,
      specializations: ["Canada PR", "Express Entry", "Work Permits"],
      countries: ["Canada", "Australia"],
      hourlyRate: 75,
      responseTime: "2 hours",
      successRate: 98,
      completedProjects: 245,
      isOnline: true,
      verified: true,
      languages: ["English", "Mandarin", "French"],
      bio: "Specialized immigration consultant with 8+ years helping clients achieve their Canadian PR dreams. Expert in Express Entry, PNP programs, and work permits.",
      recentWork: [
        "Express Entry - 600 CRS",
        "Alberta PNP",
        "LMIA Work Permit",
      ],
    },
    {
      id: 2,
      name: "James Wilson",
      avatar: "👨‍💼",
      rating: 4.8,
      reviewCount: 89,
      experience: 12,
      specializations: ["UK Student Visa", "Tier 2 Visa", "Family Visa"],
      countries: ["United Kingdom", "Ireland"],
      hourlyRate: 85,
      responseTime: "1 hour",
      successRate: 96,
      completedProjects: 189,
      isOnline: false,
      verified: true,
      languages: ["English", "Spanish"],
      bio: "UK immigration expert with over 12 years of experience. Specialized in student visas, work permits, and family reunification cases.",
      recentWork: ["Tier 4 Student Visa", "Spouse Visa", "Graduate Route"],
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      avatar: "👩‍⚖️",
      rating: 4.95,
      reviewCount: 156,
      experience: 15,
      specializations: ["US Green Card", "H1-B Visa", "Investment Visa"],
      countries: ["United States", "Mexico"],
      hourlyRate: 120,
      responseTime: "30 minutes",
      successRate: 99,
      completedProjects: 312,
      isOnline: true,
      verified: true,
      languages: ["English", "Spanish", "Portuguese"],
      bio: "Top-rated US immigration attorney with 15+ years helping professionals and investors navigate complex US immigration processes.",
      recentWork: [
        "EB-5 Investment",
        "O-1 Extraordinary Ability",
        "H1-B Transfer",
      ],
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "👨‍💻",
      rating: 4.7,
      reviewCount: 73,
      experience: 6,
      specializations: ["Australia PR", "Student Visa", "Work Visa"],
      countries: ["Australia", "New Zealand"],
      hourlyRate: 65,
      responseTime: "3 hours",
      successRate: 94,
      completedProjects: 142,
      isOnline: true,
      verified: false,
      languages: ["English", "Korean"],
      bio: "Migration agent specializing in Australian immigration pathways. Expert in skilled migration, student visas, and employer-sponsored visas.",
      recentWork: [
        "189 Skilled Independent",
        "482 TSS Visa",
        "Student Visa 500",
      ],
    },
  ];

  const countries = [
    "All Countries",
    "Canada",
    "United States",
    "United Kingdom",
    "Australia",
  ];
  const visaTypes = [
    "All Types",
    "Work Permit",
    "Student Visa",
    "Permanent Residence",
    "Family Visa",
  ];
  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "experience", label: "Most Experienced" },
    { value: "projects", label: "Most Projects" },
    { value: "rate", label: "Lowest Rate" },
    { value: "response", label: "Fastest Response" },
  ];

  const filteredAgents = agents
    .filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.specializations.some((spec) =>
          spec.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        agent.countries.some((country) =>
          country.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCountry =
        !selectedCountry ||
        selectedCountry === "All Countries" ||
        agent.countries.includes(selectedCountry);

      const matchesVisaType =
        !selectedVisaType ||
        selectedVisaType === "All Types" ||
        agent.specializations.some((spec) =>
          spec.toLowerCase().includes(selectedVisaType.toLowerCase()),
        );

      return matchesSearch && matchesCountry && matchesVisaType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "projects":
          return b.completedProjects - a.completedProjects;
        case "rate":
          return a.hourlyRate - b.hourlyRate;
        default:
          return b.rating - a.rating;
      }
    });

  const toggleFavorite = (agentId: number) => {
    setFavorites((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId],
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
            Browse Immigration Agents
          </h1>
          <p className="text-lg text-cool-gray-600">
            Find certified experts for your immigration needs
          </p>
        </div>

        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Badge className="bg-sage-green-100 text-sage-green-700">
            {filteredAgents.length} agents available
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass-card p-6 rounded-2xl"
      >
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray-500" />
            <Input
              placeholder="Search agents, skills, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Visa Type Filter */}
          <select
            value={selectedVisaType}
            onChange={(e) => setSelectedVisaType(e.target.value)}
            className="p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500"
          >
            {visaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Agents Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-3xl hover:bg-white/40 transition-all duration-300 group"
          >
            {/* Agent Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-sage rounded-full flex items-center justify-center text-2xl">
                    {agent.avatar}
                  </div>
                  {agent.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-sage-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-heading font-bold text-cool-gray-800">
                      {agent.name}
                    </h3>
                    {agent.verified && (
                      <CheckCircle className="w-5 h-5 text-royal-blue-500" />
                    )}
                  </div>

                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-gold-500 fill-current" />
                    <span className="font-semibold text-cool-gray-800">
                      {agent.rating}
                    </span>
                    <span className="text-cool-gray-600">
                      ({agent.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-sm text-cool-gray-600">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{agent.experience} years</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{agent.successRate}% success</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(agent.id)}
                className="p-2"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    favorites.includes(agent.id)
                      ? "text-red-500 fill-current"
                      : "text-cool-gray-400",
                  )}
                />
              </Button>
            </div>

            {/* Bio */}
            <p className="text-cool-gray-700 text-sm leading-relaxed mb-4">
              {agent.bio}
            </p>

            {/* Specializations */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {agent.specializations.slice(0, 3).map((spec, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-royal-blue-100 text-royal-blue-700"
                  >
                    {spec}
                  </Badge>
                ))}
                {agent.specializations.length > 3 && (
                  <Badge variant="outline">
                    +{agent.specializations.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-y border-cool-gray-200">
              <div className="text-center">
                <div className="font-bold text-cool-gray-800">
                  ${agent.hourlyRate}
                </div>
                <div className="text-xs text-cool-gray-600">per hour</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-cool-gray-800">
                  {agent.responseTime}
                </div>
                <div className="text-xs text-cool-gray-600">response</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-cool-gray-800">
                  {agent.completedProjects}
                </div>
                <div className="text-xs text-cool-gray-600">projects</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button 
                variant="premium" 
                size="sm" 
                className="flex-1 group"
                onClick={() => {
                  alert(`Starting conversation with ${agent.name}...`);
                  window.location.href = `/messages?agent=${agent.id}`;
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Agent
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  alert(`Opening profile for ${agent.name}...`);
                  window.location.href = `/agent-profile?id=${agent.id}`;
                }}
              >
                View Profile
              </Button>
            </div>

            {/* Recent Work */}
            <div className="mt-4 pt-4 border-t border-cool-gray-200">
              <p className="text-xs font-medium text-cool-gray-600 mb-2">
                Recent successful cases:
              </p>
              <div className="flex flex-wrap gap-1">
                {agent.recentWork.map((work, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs bg-sage-green-50 text-sage-green-700 border-sage-green-200"
                  >
                    {work}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredAgents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Globe className="w-16 h-16 text-cool-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-2">
            No agents found
          </h3>
          <p className="text-cool-gray-600 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCountry("");
              setSelectedVisaType("");
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}

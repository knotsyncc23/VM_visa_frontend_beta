import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  DollarSign,
  Award,
  MessageCircle,
  Heart,
  Grid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  specializations: string[];
  successRate: number;
  responseTime: string;
  priceRange: string;
  languages: string[];
  isVerified: boolean;
  isOnline: boolean;
  completedCases: number;
}

export function BrowseAgentsFiltered() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVisaType, setSelectedVisaType] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>([]);

  const visaTypes = [
    "All Visa Types",
    "Work Permit",
    "Student Visa",
    "Tourist Visa",
    "Business Visa",
    "Permanent Residence",
    "Family Sponsorship",
    "Investment Visa",
  ];

  const countries = [
    "All Countries",
    "Canada",
    "United States",
    "United Kingdom",
    "Australia",
    "Germany",
    "New Zealand",
    "Singapore",
  ];

  const mockAgents: Agent[] = [
    {
      id: "agent_001",
      name: "Sarah Johnson",
      avatar: "SJ",
      title: "Your trusted partner in immigration success",
      rating: 4.9,
      reviews: 157,
      experience: "8+ years",
      location: "Toronto, Canada",
      specializations: ["Work Permit", "Permanent Residence", "Student Visa"],
      successRate: 96,
      responseTime: "< 2 hours",
      priceRange: "$500 - $2,000",
      languages: ["English", "French", "Spanish"],
      isVerified: true,
      isOnline: true,
      completedCases: 245,
    },
    {
      id: "agent_002",
      name: "Michael Chen",
      avatar: "MC",
      title: "Expert Immigration Consultant",
      rating: 4.8,
      reviews: 203,
      experience: "12+ years",
      location: "Vancouver, Canada",
      specializations: [
        "Business Visa",
        "Investment Visa",
        "Family Sponsorship",
      ],
      successRate: 94,
      responseTime: "< 4 hours",
      priceRange: "$800 - $3,000",
      languages: ["English", "Mandarin", "Cantonese"],
      isVerified: true,
      isOnline: false,
      completedCases: 312,
    },
    {
      id: "agent_003",
      name: "Emily Rodriguez",
      avatar: "ER",
      title: "Specialized in Student Immigration",
      rating: 4.7,
      reviews: 89,
      experience: "5+ years",
      location: "Sydney, Australia",
      specializations: ["Student Visa", "Work Permit", "Tourist Visa"],
      successRate: 98,
      responseTime: "< 6 hours",
      priceRange: "$300 - $1,500",
      languages: ["English", "Spanish", "Portuguese"],
      isVerified: true,
      isOnline: true,
      completedCases: 176,
    },
    {
      id: "agent_004",
      name: "David Wilson",
      avatar: "DW",
      title: "US Immigration Attorney",
      rating: 4.9,
      reviews: 324,
      experience: "15+ years",
      location: "New York, USA",
      specializations: ["Work Permit", "Business Visa", "Permanent Residence"],
      successRate: 97,
      responseTime: "< 3 hours",
      priceRange: "$1,000 - $5,000",
      languages: ["English"],
      isVerified: true,
      isOnline: true,
      completedCases: 456,
    },
  ];

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.specializations.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesVisaType =
      selectedVisaType === "all" ||
      agent.specializations.includes(selectedVisaType);

    const matchesCountry =
      selectedCountry === "all" || agent.location.includes(selectedCountry);

    return matchesSearch && matchesVisaType && matchesCountry;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "experience":
        return parseInt(b.experience) - parseInt(a.experience);
      case "price":
        return (
          parseInt(a.priceRange.split(" - ")[0].replace("$", "")) -
          parseInt(b.priceRange.split(" - ")[0].replace("$", ""))
        );
      case "success":
        return b.successRate - a.successRate;
      default:
        return 0;
    }
  });

  const toggleFavorite = (agentId: string) => {
    setFavorites((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId],
    );
  };

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          Browse Immigration Agents
        </h1>
        <p className="text-lg text-cool-gray-600">
          Find and connect with certified immigration professionals
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray-500" />
            <input
              type="text"
              placeholder="Search agents by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-white/60 border border-white/30 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 backdrop-blur-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedVisaType}
              onChange={(e) => setSelectedVisaType(e.target.value)}
              className="bg-white/60 border border-white/30 rounded-xl px-4 py-3 backdrop-blur-sm focus:ring-2 focus:ring-royal-blue-500"
            >
              {visaTypes.map((type, index) => (
                <option key={index} value={index === 0 ? "all" : type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-white/60 border border-white/30 rounded-xl px-4 py-3 backdrop-blur-sm focus:ring-2 focus:ring-royal-blue-500"
            >
              {countries.map((country, index) => (
                <option key={index} value={index === 0 ? "all" : country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/60 border border-white/30 rounded-xl px-4 py-3 backdrop-blur-sm focus:ring-2 focus:ring-royal-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="price">Sort by Price</option>
              <option value="success">Sort by Success Rate</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/60 rounded-xl p-1 backdrop-blur-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === "grid"
                    ? "bg-royal-blue-500 text-white"
                    : "text-cool-gray-600 hover:text-royal-blue-600",
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === "list"
                    ? "bg-royal-blue-500 text-white"
                    : "text-cool-gray-600 hover:text-royal-blue-600",
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-cool-gray-600">
            Showing {sortedAgents.length} agents
            {selectedVisaType !== "all" && ` for ${selectedVisaType}`}
            {selectedCountry !== "all" && ` in ${selectedCountry}`}
          </p>
          <Badge className="bg-royal-blue-100 text-royal-blue-700">
            {sortedAgents.filter((a) => a.isOnline).length} agents online
          </Badge>
        </div>
      </div>

      {/* Agents Grid/List */}
      {sortedAgents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 rounded-2xl text-center"
        >
          <Users className="w-16 h-16 text-cool-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-cool-gray-700 mb-2">
            No agents found
          </h3>
          <p className="text-cool-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </motion.div>
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-6",
          )}
        >
          {sortedAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "glass-card rounded-2xl p-6 group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-royal-blue-200",
                viewMode === "list" && "flex items-start gap-6",
              )}
            >
              {/* Agent Header */}
              <div
                className={cn(
                  "flex items-start gap-4 mb-4",
                  viewMode === "list" && "mb-0",
                )}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-royal-blue-500 to-royal-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {agent.avatar}
                  </div>
                  {agent.isOnline && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className={cn("flex-1", viewMode === "list" && "mr-4")}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-cool-gray-800">
                      {agent.name}
                    </h3>
                    {agent.isVerified && (
                      <CheckCircle className="w-5 h-5 text-royal-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-cool-gray-600 mb-2">
                    {agent.title}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold-500 fill-current" />
                      <span className="font-semibold">{agent.rating}</span>
                      <span className="text-cool-gray-500">
                        ({agent.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-cool-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{agent.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(agent.id)}
                  className="p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors",
                      favorites.includes(agent.id)
                        ? "text-red-500 fill-current"
                        : "text-cool-gray-400 hover:text-red-500",
                    )}
                  />
                </button>
              </div>

              <div className={cn(viewMode === "list" && "flex-1")}>
                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specializations.slice(0, 3).map((spec) => (
                    <Badge
                      key={spec}
                      className="bg-royal-blue-100 text-royal-blue-700 text-xs"
                    >
                      {spec}
                    </Badge>
                  ))}
                  {agent.specializations.length > 3 && (
                    <Badge className="bg-cool-gray-100 text-cool-gray-600 text-xs">
                      +{agent.specializations.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-cool-gray-600">Experience</div>
                    <div className="font-semibold">{agent.experience}</div>
                  </div>
                  <div>
                    <div className="text-cool-gray-600">Success Rate</div>
                    <div className="font-semibold text-green-600">
                      {agent.successRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-cool-gray-600">Response Time</div>
                    <div className="font-semibold">{agent.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-cool-gray-600">Price Range</div>
                    <div className="font-semibold">{agent.priceRange}</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="text-sm text-cool-gray-600 mb-1">
                    Languages
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {agent.languages.map((lang) => (
                      <Badge
                        key={lang}
                        className="bg-sage-green-100 text-sage-green-700 text-xs"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-royal-blue-500 hover:bg-royal-blue-600 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/agent/${agent.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

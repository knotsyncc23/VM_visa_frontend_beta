import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  X,
  Star,
  Clock,
  DollarSign,
  MessageCircle,
  Eye,
  Heart,
  Award,
  Globe,
  Calendar,
  FileText,
} from "lucide-react";

interface Proposal {
  id: number;
  agentName: string;
  agentAvatar: string;
  agentRating: number;
  projectTitle: string;
  proposalText: string;
  timeline: string;
  budget: number;
  experienceYears: number;
  successRate: number;
  responseTime: string;
  coverLetter: string;
  portfolio: string[];
  isVerified: boolean;
  submittedAt: Date;
}

export function AgentProposals() {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const proposals: Proposal[] = [
    {
      id: 1,
      agentName: "Sarah Chen",
      agentAvatar: "👩‍💼",
      agentRating: 4.9,
      projectTitle: "Canada PR Application Assistance",
      proposalText:
        "I can help you navigate the Express Entry system with my 8+ years of experience. I've successfully processed 200+ Canadian PR applications with a 98% approval rate.",
      timeline: "2-3 months",
      budget: 2500,
      experienceYears: 8,
      successRate: 98,
      responseTime: "2 hours",
      coverLetter:
        "I'm excited to help you achieve your Canadian immigration goals. With my specialized knowledge of Express Entry, PNP programs, and work permits, I'll ensure your application is perfectly prepared for success.",
      portfolio: ["Express Entry - 600 CRS", "Alberta PNP", "LMIA Work Permit"],
      isVerified: true,
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      agentName: "James Wilson",
      agentAvatar: "👨‍💼",
      agentRating: 4.8,
      projectTitle: "UK Student Visa Expert Support",
      proposalText:
        "Specialized UK immigration consultant with 12+ years helping students achieve their education goals. I'll handle your Tier 4 visa application from start to finish.",
      timeline: "1-2 months",
      budget: 1800,
      experienceYears: 12,
      successRate: 96,
      responseTime: "1 hour",
      coverLetter:
        "Your education dreams in the UK are within reach! I'll provide comprehensive support for your student visa application, including university liaison and interview preparation.",
      portfolio: ["Tier 4 Student Visa", "Graduate Route", "Spouse Visa"],
      isVerified: true,
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 3,
      agentName: "Maria Rodriguez",
      agentAvatar: "👩‍⚖️",
      agentRating: 4.95,
      projectTitle: "US Investment Visa Specialist",
      proposalText:
        "Top-rated US immigration attorney with 15+ years of experience. I specialize in EB-5 investment visas and have helped secure over $50M in qualifying investments.",
      timeline: "6-12 months",
      budget: 8500,
      experienceYears: 15,
      successRate: 99,
      responseTime: "30 minutes",
      coverLetter:
        "Investment immigration requires precision and expertise. My track record with EB-5 and other investor visas speaks for itself. Let's discuss your investment immigration strategy.",
      portfolio: [
        "EB-5 Investment",
        "E-2 Treaty Investor",
        "O-1 Extraordinary",
      ],
      isVerified: true,
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ];

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const toggleFavorite = (proposalId: number) => {
    setFavorites((prev) =>
      prev.includes(proposalId)
        ? prev.filter((id) => id !== proposalId)
        : [...prev, proposalId],
    );
  };

  const acceptProposal = (proposalId: number) => {
    alert(
      `Proposal accepted! You'll be redirected to the contract and payment page.`,
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
            Agent Proposals
          </h1>
          <p className="text-lg text-cool-gray-600">
            Review and compare proposals from certified immigration agents
          </p>
        </div>

        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Badge className="bg-sage-green-100 text-sage-green-700">
            {proposals.length} proposals received
          </Badge>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Compare All
          </Button>
        </div>
      </motion.div>

      {/* Proposals List */}
      <div className="space-y-6">
        {proposals.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="glass-card p-8 rounded-3xl hover:bg-white/40 transition-all duration-300"
          >
            {/* Proposal Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-sage rounded-full flex items-center justify-center text-2xl">
                  {proposal.agentAvatar}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-heading font-bold text-cool-gray-800">
                      {proposal.agentName}
                    </h3>
                    {proposal.isVerified && (
                      <CheckCircle className="w-5 h-5 text-royal-blue-500" />
                    )}
                  </div>

                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-gold-500 fill-current" />
                    <span className="font-semibold text-cool-gray-800">
                      {proposal.agentRating}
                    </span>
                    <span className="text-cool-gray-600">
                      • {proposal.experienceYears} years exp
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-royal-blue-700 mt-2">
                    {proposal.projectTitle}
                  </h4>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(proposal.id)}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(proposal.id)
                        ? "text-red-500 fill-current"
                        : "text-cool-gray-400"
                    }`}
                  />
                </Button>
                <span className="text-sm text-cool-gray-500">
                  {formatTimeAgo(proposal.submittedAt)}
                </span>
              </div>
            </div>

            {/* Proposal Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h5 className="font-semibold text-cool-gray-800 mb-2">
                    Proposal Summary
                  </h5>
                  <p className="text-cool-gray-700 leading-relaxed">
                    {proposal.proposalText}
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-cool-gray-800 mb-2">
                    Cover Letter
                  </h5>
                  <p className="text-cool-gray-700 leading-relaxed">
                    {proposal.coverLetter}
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-cool-gray-800 mb-2">
                    Recent Work
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {proposal.portfolio.map((work, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-sage-green-50 text-sage-green-700"
                      >
                        {work}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposal Details */}
              <div className="space-y-4">
                <div className="glass-card p-4 rounded-2xl bg-white/20">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cool-gray-600">Budget</span>
                      <span className="font-bold text-cool-gray-800">
                        ${proposal.budget}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cool-gray-600">
                        Timeline
                      </span>
                      <span className="font-semibold text-cool-gray-800">
                        {proposal.timeline}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cool-gray-600">
                        Success Rate
                      </span>
                      <span className="font-semibold text-sage-green-700">
                        {proposal.successRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cool-gray-600">
                        Response Time
                      </span>
                      <span className="font-semibold text-cool-gray-800">
                        {proposal.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="premium"
                    className="w-full group"
                    onClick={() => acceptProposal(proposal.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Proposal
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Proposals State */}
      {proposals.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-cool-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-cool-gray-800 mb-2">
            No proposals yet
          </h3>
          <p className="text-cool-gray-600 mb-6">
            Post a request to start receiving proposals from agents
          </p>
          <Button variant="premium">Post New Request</Button>
        </motion.div>
      )}
    </div>
  );
}

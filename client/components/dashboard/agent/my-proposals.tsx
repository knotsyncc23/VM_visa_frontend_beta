import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  DollarSign,
  FileText,
  Eye,
  Edit,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  MapPin,
  Filter,
  Search,
  ChevronDown,
  TrendingUp,
  Target,
  Star,
  Send,
} from "lucide-react";
import { api } from "@shared/api";
import { useAuth } from "@/components/auth/auth-context";

interface Proposal {
  id: string;
  _id?: string;
  agentId: string;
  requestId: string;
  title?: string;
  budget: number;
  timeline: string;
  coverLetter: string;
  proposalText: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'counter';
  createdAt: string;
  updatedAt: string;
  request?: {
    title: string;
    visaType: string;
    country: string;
    user?: {
      name: string;
      avatar?: string;
    };
  };
  // Legacy/mock fields for backward compatibility
  client?: string;
  clientCompany?: string;
  submittedDate?: string;
  responseTime?: string;
  proposedRate?: string;
  estimatedTimeline?: string;
  visaType?: string;
  country?: string;
  description?: string;
  clientBudget?: string;
  competingProposals?: number;
  clientRating?: number;
  lastActivity?: string;
  activityTime?: string;
  winProbability?: number;
}

export function MyProposals() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch agent's proposals
  const fetchProposals = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const proposalsData = await api.getProposals({ agentId: user.id });
      // Transform API proposals to match component interface
      const transformedProposals = (Array.isArray(proposalsData) ? proposalsData : []).map((p: any) => ({
        id: p.id || p._id,
        _id: p._id,
        agentId: p.agentId,
        requestId: p.requestId || p.visaRequestId,
        title: p.title || p.request?.title || 'Visa Application',
        budget: p.budget || p.price || 0,
        timeline: p.timeline,
        coverLetter: p.coverLetter || '',
        proposalText: p.proposalText || p.description || '',
        status: p.status,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        request: p.request || p.visaRequest
      }));
      setProposals(transformedProposals);
    } catch (error) {
      console.error('Failed to fetch proposals:', error);
      setProposals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchProposals, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const mockProposals = [
    {
      id: "1",
      title: "H1-B Visa Application for Tech Professional",
      client: "John Smith",
      clientCompany: "Microsoft Canada",
      status: "pending",
      submittedDate: "2024-01-15",
      responseTime: "2 days",
      proposedRate: "$2,500",
      estimatedTimeline: "3 weeks",
      visaType: "Work Visa",
      country: "Canada",
      description:
        "Comprehensive H1-B visa application services including document preparation, form filing, and interview coaching.",
      clientBudget: "$2,500",
      competingProposals: 8,
      clientRating: 4.8,
      lastActivity: "Client viewed proposal",
      activityTime: "4 hours ago",
      winProbability: 75,
    },
    {
      id: "2",
      title: "Student Visa for University of Melbourne",
      client: "Sarah Johnson",
      clientCompany: "Individual",
      status: "accepted",
      submittedDate: "2024-01-12",
      responseTime: "1 day",
      proposedRate: "$1,800",
      estimatedTimeline: "6 weeks",
      visaType: "Study Visa",
      country: "Australia",
      description:
        "Complete student visa application support including university liaison and documentation assistance.",
      clientBudget: "$2,000",
      competingProposals: 5,
      clientRating: 4.9,
      lastActivity: "Proposal accepted",
      activityTime: "2 days ago",
      winProbability: 100,
    },
    {
      id: "3",
      title: "Permanent Residency Application - Skilled Worker",
      client: "Michael Chen",
      clientCompany: "Tech Solutions Inc.",
      status: "counter",
      submittedDate: "2024-01-10",
      responseTime: "5 days",
      proposedRate: "$4,200",
      estimatedTimeline: "12 weeks",
      visaType: "Permanent Residency",
      country: "New Zealand",
      description:
        "Skilled migrant category PR application with points optimization and comprehensive documentation.",
      clientBudget: "$3,500",
      competingProposals: 12,
      clientRating: 5.0,
      lastActivity: "Client sent counter offer",
      activityTime: "1 day ago",
      winProbability: 60,
    },
    {
      id: "4",
      title: "Tourist Visa Reapplication Support",
      client: "Emma Rodriguez",
      clientCompany: "Individual",
      status: "rejected",
      submittedDate: "2024-01-08",
      responseTime: "3 days",
      proposedRate: "$800",
      estimatedTimeline: "2 weeks",
      visaType: "Visitor Visa",
      country: "United States",
      description:
        "Tourist visa reapplication after previous denial with comprehensive case review and improvement strategy.",
      clientBudget: "$900",
      competingProposals: 15,
      clientRating: 4.6,
      lastActivity: "Proposal declined",
      activityTime: "3 days ago",
      winProbability: 0,
    },
    {
      id: "5",
      title: "Skilled Worker Visa - Financial Analyst",
      client: "David Kim",
      clientCompany: "London Investment Group",
      status: "pending",
      submittedDate: "2024-01-14",
      responseTime: "3 days",
      proposedRate: "$3,100",
      estimatedTimeline: "5 weeks",
      visaType: "Work Visa",
      country: "United Kingdom",
      description:
        "UK Skilled Worker visa application with sponsorship coordination and comprehensive documentation support.",
      clientBudget: "$3,200",
      competingProposals: 6,
      clientRating: 4.7,
      lastActivity: "Client reviewed documents",
      activityTime: "6 hours ago",
      winProbability: 80,
    },
  ];

  // Use real proposals when available, fallback to filtered mock data for display
  const displayProposals = proposals.length > 0 ? proposals : mockProposals;

  const statusOptions = [
    { id: "all", label: "All Proposals", count: displayProposals.length },
    { id: "pending", label: "Pending Review", count: displayProposals.filter((p: any) => p.status === 'pending').length },
    { id: "accepted", label: "Accepted", count: displayProposals.filter((p: any) => p.status === 'accepted').length },
    { id: "rejected", label: "Rejected", count: displayProposals.filter((p: any) => p.status === 'rejected').length },
    { id: "withdrawn", label: "Withdrawn", count: displayProposals.filter((p: any) => p.status === 'withdrawn').length },
    { id: "counter", label: "Counter Offer", count: displayProposals.filter((p: any) => p.status === 'counter').length },
  ];

  const filteredProposals = displayProposals.filter((proposal: any) => {
    const matchesStatus =
      filterStatus === "all" || proposal.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      (proposal.title || proposal.request?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proposal.client || proposal.request?.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proposal.country || proposal.request?.country || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proposal.visaType || proposal.request?.visaType || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "counter":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "counter":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "counter":
        return "Counter Offer";
      default:
        return "Unknown";
    }
  };

  const getWinProbabilityColor = (probability: number) => {
    if (probability >= 75) return "text-green-600";
    if (probability >= 50) return "text-yellow-600";
    if (probability >= 25) return "text-orange-600";
    return "text-red-600";
  };

  const calculateStats = () => {
    const total = displayProposals.length;
    const accepted = displayProposals.filter((p: any) => p.status === "accepted").length;
    const pending = displayProposals.filter((p: any) => p.status === "pending").length;
    const averageRate =
      displayProposals.reduce(
        (sum: number, p: any) => {
          const rate = p.proposedRate 
            ? parseInt(p.proposedRate.replace(/[$,]/g, ""))
            : p.budget || 0;
          return sum + rate;
        },
        0,
      ) / (total || 1);

    return {
      total,
      accepted,
      pending,
      winRate: total > 0 ? Math.round((accepted / total) * 100) : 0,
      averageRate: Math.round(averageRate),
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#f0f4ff" }}
            >
              <FileText className="w-6 h-6" style={{ color: "#326dee" }} />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Total Proposals
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Win Rate</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.winRate}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Pending Review
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Average Rate
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.averageRate.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Header with Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              My Proposals
            </h2>
            <p className="text-gray-600">
              {filteredProposals.length} proposals found
            </p>
          </div>
          <Button style={{ backgroundColor: "#326dee" }}>
            <Send className="w-4 h-4 mr-2" />
            Send New Proposal
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border-gray-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              {statusOptions.find((s) => s.id === filterStatus)?.label || "All"}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-48"
                >
                  {statusOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setFilterStatus(option.id);
                        setShowFilters(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                    >
                      <span className="text-gray-700">{option.label}</span>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                          {option.count}
                        </Badge>
                        {filterStatus === option.id && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal: any, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {proposal.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{proposal.client || proposal.request?.user?.name || 'Unknown Client'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{proposal.country || proposal.request?.country || 'Unknown Country'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted {proposal.submittedDate || new Date(proposal.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(proposal.status)}>
                    {getStatusIcon(proposal.status)}
                    <span className="ml-1">
                      {getStatusLabel(proposal.status)}
                    </span>
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-700 line-clamp-2">
                  {proposal.description || proposal.proposalText || proposal.coverLetter || 'No description available'}
                </p>

                {/* Last Activity */}
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {proposal.lastActivity || 'Recently submitted'} • {proposal.activityTime || 'Just now'}
                  </span>
                </div>
              </div>

              {/* Middle Column - Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your Rate</span>
                    <span className="font-semibold text-gray-900">
                      {proposal.proposedRate || `$${proposal.budget}` || 'TBD'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Client Budget</span>
                    <span className="font-semibold text-gray-900">
                      {proposal.clientBudget || 'Budget not disclosed'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Timeline</span>
                    <span className="font-semibold text-gray-900">
                      {proposal.estimatedTimeline || proposal.timeline}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Win Probability</span>
                    <span
                      className={`font-medium ${getWinProbabilityColor(
                        proposal.winProbability || 50,
                      )}`}
                    >
                      {proposal.winProbability || 50}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${proposal.winProbability || 50}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: "#326dee" }}
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Competing Proposals</span>
                    <span className="font-medium">
                      {proposal.competingProposals || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Client Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="font-medium">
                        {proposal.clientRating || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setSelectedProposal(proposal.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>

                {proposal.status === "pending" && (
                  <Button
                    className="w-full"
                    style={{ backgroundColor: "#326dee" }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Proposal
                  </Button>
                )}

                {proposal.status === "counter" && (
                  <Button
                    className="w-full"
                    style={{ backgroundColor: "#326dee" }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Respond to Counter
                  </Button>
                )}

                {proposal.status === "accepted" && (
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Start Project
                  </Button>
                )}

                <Button className="w-full" variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Client
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProposals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
        >
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#f0f4ff" }}
          >
            <FileText className="w-8 h-8" style={{ color: "#326dee" }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No proposals found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or create a new proposal.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}

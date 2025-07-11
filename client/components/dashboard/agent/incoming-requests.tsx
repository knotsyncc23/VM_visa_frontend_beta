import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  DollarSign,
  Star,
  Users,
  Calendar,
  Filter,
  Search,
  Eye,
  MessageCircle,
  CheckCircle,
  X,
  FileText,
  Globe,
  Briefcase,
  GraduationCap,
  Plane,
  Home,
  ChevronDown,
  User,
  Send,
  Plus,
} from "lucide-react";
import { api } from "@shared/api";
import { useAuth } from "@/components/auth/auth-context";

interface VisaRequest {
  id: string;
  _id?: string;
  title: string;
  visaType: string;
  country: string;
  budget: string;
  timeline: string;
  description: string;
  userId: string;
  user?: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  requirements?: string[];
  proposalCount?: number;
}

export function IncomingRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<VisaRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedRequestForProposal, setSelectedRequestForProposal] = useState<VisaRequest | null>(null);
  const [proposalData, setProposalData] = useState({
    budget: '',
    timeline: '',
    coverLetter: '',
    proposalText: '',
  });

  const visaTypes = [
    { id: "all", label: "All Types", icon: Globe },
    { id: "work", label: "Work Visa", icon: Briefcase },
    { id: "study", label: "Study Visa", icon: GraduationCap },
    { id: "visitor", label: "Visitor Visa", icon: Plane },
    { id: "pr", label: "Permanent Residency", icon: Home },
  ];

  const timelines = [
    { label: "Urgent (ASAP)", value: "urgent" },
    { label: "1 Week", value: "1-week" },
    { label: "2 Weeks", value: "2-weeks" },
    { label: "1 Month", value: "1-month" },
    { label: "2-3 Months", value: "2-3-months" },
    { label: "3-6 Months", value: "3-6-months" },
    { label: "Flexible", value: "flexible" },
  ];

  // Handle messaging with client
  const handleMessageClient = async (clientId: string, requestId: string) => {
    try {
      // Create or find conversation
      const conversation = await api.createConversation({
        participantId: clientId,
        requestId: requestId
      });
      
      // Navigate to messages page with conversation ID
      window.location.href = `/messages?conversation=${conversation.id}`;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Failed to start conversation. Please try again.');
    }
  };

  // Fetch incoming visa requests
  const fetchIncomingRequests = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      // Fetch all open/pending visa requests that agents can submit proposals to
      const requestsData = await api.getVisaRequests({ status: 'pending' });
      setRequests(Array.isArray(requestsData) ? requestsData.map(req => ({
        id: req.id || (req as any)._id,
        _id: (req as any)._id,
        title: req.title,
        visaType: req.visaType,
        country: (req as any).country || req.targetCountry,
        budget: String(req.budget),
        timeline: (req as any).timeline || req.deadline,
        description: req.description,
        userId: (req as any).userId || req.clientId || '',
        user: (req as any).user,
        status: req.status,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
        requirements: req.requirements,
        proposalCount: (req as any).proposalCount,
      })) : []);
    } catch (error) {
      console.error('Failed to fetch incoming requests:', error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomingRequests();
  }, [user]);

  // Submit proposal
  const handleSubmitProposal = async () => {
    if (!selectedRequestForProposal || !proposalData.budget || !proposalData.timeline || !proposalData.coverLetter || !proposalData.proposalText) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      const requestId = selectedRequestForProposal.id;
      
      // Debug authentication
      const token = localStorage.getItem('vm-visa-auth-token');
      console.log('Token exists:', !!token);
      console.log('User:', user);
      console.log('Request ID:', requestId);
      
      if (!token) {
        alert('No authentication token found. Please log in again.');
        return;
      }
      
      // Use direct fetch for the simplified endpoint
      const response = await fetch('http://localhost:5000/api/proposals/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vm-visa-auth-token')}`
        },
        body: JSON.stringify({
          requestId,
          budget: proposalData.budget,
          timeline: proposalData.timeline,
          coverLetter: proposalData.coverLetter,
          proposalText: proposalData.proposalText
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      alert('Proposal submitted successfully!');
      setShowProposalModal(false);
      setSelectedRequestForProposal(null);
      setProposalData({ budget: '', timeline: '', coverLetter: '', proposalText: '' });
      
      // Refresh the requests to update proposal counts
      fetchIncomingRequests();
    } catch (error: any) {
      console.error('Failed to submit proposal:', error);
      alert(`Failed to submit proposal: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Get budget range display
  const getBudgetDisplay = (budget: string) => {
    const budgetRanges = {
      'under-500': 'Under $500',
      '500-1000': '$500 - $1,000',
      '1000-2500': '$1,000 - $2,500',
      '2500-5000': '$2,500 - $5,000',
      '5000-10000': '$5,000 - $10,000',
      'above-10000': 'Above $10,000',
    };
    return budgetRanges[budget as keyof typeof budgetRanges] || budget;
  };

  // Get timeline display
  const getTimelineDisplay = (timeline: string) => {
    const timelineLabels = {
      'urgent': 'Urgent (ASAP)',
      '1-week': '1 Week',
      '2-weeks': '2 Weeks',
      '1-month': '1 Month',
      '2-3-months': '2-3 Months',
      '3-6-months': '3-6 Months',
      'flexible': 'Flexible',
    };
    return timelineLabels[timeline as keyof typeof timelineLabels] || timeline;
  };

  // Filter requests based on search and filter type
  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
      (filterType === 'work' && request.visaType.includes('work')) ||
      (filterType === 'study' && request.visaType.includes('student')) ||
      (filterType === 'visitor' && request.visaType.includes('visitor')) ||
      (filterType === 'pr' && request.visaType.includes('permanent'));
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
            Incoming Requests
          </h1>
          <p className="text-lg text-cool-gray-600">
            Browse and respond to client visa requests
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{filteredRequests.length} Available</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by client, country, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Filter */}
          <div className="flex gap-2">
            {visaTypes.map((type) => (
              <Button
                key={type.id}
                variant={filterType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type.id)}
                className="flex items-center gap-2"
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRequests.map((request, index) => {
          const VisaIcon = visaTypes.find(v => 
            (v.id === 'work' && request.visaType.includes('work')) ||
            (v.id === 'study' && request.visaType.includes('student')) ||
            (v.id === 'visitor' && request.visaType.includes('visitor')) ||
            (v.id === 'pr' && request.visaType.includes('permanent'))
          )?.icon || Globe;

          return (
            <motion.div
              key={request.id || request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#f0f4ff" }}
                  >
                    <VisaIcon
                      className="w-6 h-6"
                      style={{ color: "#326dee" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {request.country} • {request.visaType}
                    </p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  {request.status}
                </Badge>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {request.user?.name || 'Client'}
                </span>
                {request.user?.isVerified && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    Verified
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {request.description}
              </p>

              {/* Budget & Timeline */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Budget</span>
                    <p className="font-semibold text-gray-900">
                      {getBudgetDisplay(request.budget)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Timeline</span>
                    <p className="font-semibold text-gray-900">
                      {getTimelineDisplay(request.timeline)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full"
                  style={{ backgroundColor: "#326dee" }}
                  onClick={() => {
                    setSelectedRequestForProposal(request);
                    setShowProposalModal(true);
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Proposal
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedRequest(request.id || request._id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMessageClient(request.userId, request.id || request._id)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>

              {/* Meta Info */}
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Posted: {new Date(request.createdAt).toLocaleDateString()}</span>
                  {request.proposalCount && request.proposalCount > 0 && (
                    <span>{request.proposalCount} proposals</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
        >
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#f0f4ff" }}
          >
            <Search className="w-8 h-8" style={{ color: "#326dee" }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No requests found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setFilterType("all");
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Proposal Modal */}
      <AnimatePresence>
        {showProposalModal && selectedRequestForProposal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowProposalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Submit Proposal
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProposalModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedRequestForProposal.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedRequestForProposal.country} • {getBudgetDisplay(selectedRequestForProposal.budget)}
                </p>
              </div>

              <div className="space-y-6">
                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Proposed Budget (USD)
                  </label>
                  <input
                    type="number"
                    value={proposalData.budget}
                    onChange={(e) => setProposalData({ ...proposalData, budget: e.target.value })}
                    placeholder="Enter your proposed fee"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Timeline
                  </label>
                  <select
                    value={proposalData.timeline}
                    onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    value={proposalData.coverLetter}
                    onChange={(e) => setProposalData({ ...proposalData, coverLetter: e.target.value })}
                    placeholder="Write a brief introduction about yourself and why you're the right agent for this request..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Proposal Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Proposal
                  </label>
                  <textarea
                    value={proposalData.proposalText}
                    onChange={(e) => setProposalData({ ...proposalData, proposalText: e.target.value })}
                    placeholder="Describe your approach, experience, and what you'll deliver for this visa request..."
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowProposalModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitProposal}
                  disabled={!proposalData.budget || !proposalData.timeline || !proposalData.coverLetter || !proposalData.proposalText}
                  style={{ backgroundColor: "#326dee" }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Proposal
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

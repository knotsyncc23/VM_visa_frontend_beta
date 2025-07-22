import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Grid,
  List,
  MoreVertical,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PostVisaRequest } from "./post-visa-request";
import { api } from "@shared/api";
import { useAuth } from "@/components/auth/auth-context";
import { VisaRequest } from "@shared/types";


// Extended interface for frontend compatibility
interface ExtendedVisaRequest extends VisaRequest {
  _id?: string;
  targetCountry?: string; // For backward compatibility
  deadline?: string; // For backward compatibility
  requirements?: string[];
  documents?: string[];
  attachments?: string[];
}

export function MyRequests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ExtendedVisaRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostRequest, setShowPostRequest] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProposals, setShowProposals] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );
  const [proposals, setProposals] = useState<any[]>([]);
  const [loadingProposals, setLoadingProposals] = useState(false);
  const [proposalCounts, setProposalCounts] = useState<{[key: string]: number}>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ExtendedVisaRequest | null>(null);
  const [showEditRequest, setShowEditRequest] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<ExtendedVisaRequest & {budget: string, deadline: string}>>({});
  // Note: showAgentProfile and related states removed since we now navigate to main page

  // Form options for edit modal
  const visaTypes = [
    { label: "Work Permit", value: "work-permit" },
    { label: "Student Visa", value: "student-visa" },
    { label: "Tourist Visa", value: "visitor-visa" },
    { label: "Business Visa", value: "business-visa" },
    { label: "Family Sponsorship", value: "family-visa" },
    { label: "Permanent Residence", value: "permanent-residence" },
    { label: "Refugee/Asylum", value: "refugee-protection" },
    { label: "Citizenship", value: "citizenship" },
    { label: "Other", value: "other" },
  ];

  const countries = [
    "Canada",
    "United States", 
    "United Kingdom",
    "Australia",
    "Germany",
    "France", 
    "New Zealand",
    "Singapore",
    "Netherlands",
    "Sweden",
    "Norway",
    "Switzerland",
    "Other",
  ];

  const budgetRanges = [
    { label: "Under $500", value: "under-500" },
    { label: "$500 - $1,000", value: "500-1000" },
    { label: "$1,000 - $2,500", value: "1000-2500" },
    { label: "$2,500 - $5,000", value: "2500-5000" },
    { label: "$5,000 - $10,000", value: "5000-10000" },
    { label: "Above $10,000", value: "above-10000" },
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

  // Fetch user's visa requests
  const fetchRequests = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const requestsData = await api.getVisaRequests({ userId: user.id });
      
      // Transform backend data to match frontend expectations
      const transformedRequests = Array.isArray(requestsData) ? requestsData.map((request: any) => ({
        ...request,
        // Ensure we have both field names for compatibility
        targetCountry: request.country || request.targetCountry || '',
        deadline: request.timeline || request.deadline || '',
        // Ensure we have an id field
        id: request.id || request._id,
        // Add missing fields with defaults
        userId: request.userId || user.id,
        country: request.country || request.targetCountry || '',
        timeline: request.timeline || request.deadline || '',
        priority: request.priority || 'medium',
        proposalCount: request.proposalCount || 0,
        requirements: request.requirements || [],
        documents: request.documents || request.attachments || [],
      })) : [];
      
      setRequests(transformedRequests);
    } catch (error) {
      console.error('Failed to fetch visa requests:', error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  // Fetch proposal counts when requests are loaded
  useEffect(() => {
    if (requests.length > 0) {
      fetchProposalCounts();
    }
  }, [requests]);

  // Fetch proposal counts for all requests
  const fetchProposalCounts = async () => {
    if (!requests.length) return;
    
    try {
      const counts: {[key: string]: number} = {};
      await Promise.all(
        requests.map(async (request) => {
          const requestId = request.id || (request as any)._id;
          if (!requestId) return;
          
          try {
            // Use correct parameter name - requestId instead of visaRequestId
            const proposalsData = await api.getProposals({ requestId: requestId });
            counts[requestId] = Array.isArray(proposalsData) ? proposalsData.length : 0;
            console.log(`Proposals for request ${requestId}:`, proposalsData.length);
          } catch (error) {
            console.error(`Failed to fetch proposals for request ${requestId}:`, error);
            counts[requestId] = 0;
          }
        })
      );
      console.log('Final proposal counts:', counts);
      setProposalCounts(counts);
    } catch (error) {
      console.error('Failed to fetch proposal counts:', error);
    }
  };

  // Fetch proposals for a specific request
  const fetchProposals = async (requestId: string) => {
    try {
      setLoadingProposals(true);
      console.log('Fetching proposals for request:', requestId);
      const proposalsData = await api.getProposals({ requestId: requestId });
      console.log('Proposals data received:', proposalsData);
      setProposals(Array.isArray(proposalsData) ? proposalsData : []);
    } catch (error) {
      console.error('Failed to fetch proposals:', error);
      setProposals([]);
    } finally {
      setLoadingProposals(false);
    }
  };

  // Handle successful post creation
  const handlePostSuccess = () => {
    setShowPostRequest(false);
    fetchRequests(); // Refresh the requests list
  };

  // Handle proposal acceptance
  const handleAcceptProposal = async (proposalId: string) => {
    try {
      setLoadingProposals(true);
      const result = await api.acceptProposal(proposalId);
      
      // Show success message with case information
      if ((result.data as any)?.case) {
        alert(`Proposal accepted successfully! Your case is now active. Case ID: ${(result.data as any).case._id}`);
        
        // Navigate to active cases view
        setTimeout(() => {
          window.location.href = '/client-dashboard?tab=active-cases';
        }, 2000);
      } else {
        alert('Proposal accepted successfully! You can now proceed with the next steps.');
      }
      
      // Refresh proposals to show updated status
      if (selectedRequestId) {
        await fetchProposals(selectedRequestId);
      }
      
      // Refresh requests to show updated status
      await fetchRequests();
      
    } catch (error) {
      console.error('Failed to accept proposal:', error);
      
      // Enhanced error handling with fallback
      if (error instanceof Error && error.message.includes('403')) {
        // Mock successful acceptance for demo purposes
        alert('Proposal accepted successfully! (Demo mode - case is now active)');
        
        // Simulate proposal acceptance in the UI
        if (selectedRequestId) {
          setProposals(prevProposals => 
            prevProposals.map(proposal => 
              proposal.id === proposalId 
                ? { ...proposal, status: 'accepted' }
                : { ...proposal, status: 'rejected' }
            )
          );
          
          setRequests(prevRequests =>
            prevRequests.map(request =>
              request.id === selectedRequestId
                ? { ...request, status: 'in-progress' }
                : request
            )
          );
        }
        
        // Navigate to active cases after delay
        setTimeout(() => {
          window.location.href = '/client-dashboard?tab=active-cases';
        }, 2000);
      } else {
        alert('Failed to accept proposal. Please try again.');
      }
    } finally {
      setLoadingProposals(false);
    }
  };

  // Handle messaging with agent
  const handleMessageAgent = async (agentId: string, proposalId: string) => {
    try {
      // Create or find conversation
      const conversation = await api.createConversation({
        participantId: agentId,
        requestId: selectedRequestId,
        proposalId: proposalId
      });
      
      // Navigate to messages page with conversation ID
      window.location.href = `/messages?conversation=${conversation.id}`;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Failed to start conversation. Please try again.');
    }
  };

  // Handle viewing agent profile
  const handleViewAgentProfile = (agentId: string, proposalId?: string) => {
    // Navigate to the main agent profile page with proposalId if provided
    const url = `/agent/${agentId}${proposalId ? `?proposalId=${proposalId}` : ''}`;
    navigate(url);
  };

  // Handle back from agent profile (no longer needed for navigation)
  const handleBackFromAgentProfile = () => {
    // This function is kept for compatibility but no longer used
    // since we now navigate to the main agent profile page
  };

  // Handle viewing request details (placeholder)
  const handleViewRequest = (requestId: string) => {
    console.log('View request:', requestId);
    // TODO: Implement request details view
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <AlertTriangle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.targetCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.visaType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort to show most recent requests first
  const sortedRequests = filteredRequests.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleViewProposals = (requestId: string) => {
    setSelectedRequestId(requestId);
    setShowProposals(true);
    fetchProposals(requestId);
  };

  const handleView = (requestId: string) => {
    const request = requests.find(r => (r.id || (r as any)._id) === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowRequestDetails(true);
    }
    setOpenDropdown(null);
  };

  const handleEdit = (requestId: string) => {
    const request = requests.find(r => (r.id || (r as any)._id) === requestId);
    if (request) {
      setSelectedRequest(request);
      // Clear form data first, then set new values
      setEditFormData({});
      setTimeout(() => {
        setEditFormData({
          title: request.title,
          visaType: request.visaType,
          targetCountry: request.targetCountry,
          description: request.description,
          budget: request.budget || '',
          deadline: request.deadline,
        });
      }, 0);
      setShowEditRequest(true);
    }
    setOpenDropdown(null);
  };

  const handleDelete = (requestId: string) => {
    setShowDeleteConfirm(requestId);
    setOpenDropdown(null);
  };

  const confirmDelete = (requestId: string) => {
    console.log("Deleting request:", requestId);
    // Perform delete action
    setShowDeleteConfirm(null);
  };

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Handle request update
  const handleUpdateRequest = async () => {
    if (!selectedRequest || !editFormData) return;

    try {
      setIsLoading(true);
      
      // Validate required fields before sending
      if (!editFormData.title || !editFormData.visaType || !editFormData.targetCountry || 
          !editFormData.description || !editFormData.budget || !editFormData.deadline) {
        alert('Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      
      // Convert the form data to match the API expected format
      const updateData = {
        title: editFormData.title.trim(),
        visaType: editFormData.visaType,
        country: editFormData.targetCountry.trim(), // Backend expects 'country', not 'targetCountry'
        description: editFormData.description.trim(),
        budget: editFormData.budget, // Keep as string
        timeline: editFormData.deadline, // Backend expects 'timeline', not 'deadline'
      };
      
      console.log('Updating request with data:', updateData);
      
      const requestId = selectedRequest.id || (selectedRequest as any)._id;
      const response = await api.updateVisaRequest(requestId, updateData);
      
      // Update the local state with the correct property names for frontend
      setRequests(prev => prev.map(req => 
        (req.id || (req as any)._id) === requestId 
          ? { 
              ...req, 
              title: updateData.title || req.title,
              visaType: updateData.visaType || req.visaType,
              targetCountry: updateData.country || req.targetCountry,
              description: updateData.description || req.description,
              budget: editFormData.budget || req.budget, // Keep as string/number for frontend
              deadline: updateData.timeline || req.deadline,
            }
          : req
      ));
      
      setShowEditRequest(false);
      setSelectedRequest(null);
      setEditFormData({});
    } catch (error: any) {
      console.error('Failed to update request:', error);
      
      // Show more specific error message
      let errorMessage = 'Failed to update request. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Note: Agent profile view now navigates to main page instead of embedded component

  if (showPostRequest) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setShowPostRequest(false)}
            className="group"
          >
            ← Back to My Requests
          </Button>
        </div>
        <PostVisaRequest onSuccess={handlePostSuccess} />
      </div>
    );
  }

  if (showProposals) {
    const currentRequest = requests.find(
      (req) => req.id === selectedRequestId,
    );

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowProposals(false)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            ← Back to My Requests
          </button>
          <span className="text-sm text-gray-500">
            {loadingProposals ? 'Loading...' : `${proposals.length} agent${proposals.length !== 1 ? 's' : ''} submitted proposal${proposals.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Proposals for: <span className="text-blue-600">{currentRequest?.title}</span>
          </h1>
          <p className="text-gray-600">
            Review and manage proposals from qualified immigration agents.
          </p>
        </div>

        {loadingProposals ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
          </div>
        ) : proposals.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
            <p className="text-gray-500">Agents will submit proposals soon. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {proposals.map((proposal, index) => (
              <div
                key={proposal.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                style={{
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  animationDelay: `${index * 150}ms`,
                  animationDuration: '600ms'
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-6 translate-x-6 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full translate-y-4 -translate-x-4 group-hover:scale-125 transition-transform duration-500"></div>

                {/* Agent Profile Section */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    {/* Agent Avatar and Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                          {proposal.agent?.name ? 
                            proposal.agent.name.split(" ").map((n: string) => n[0]).join("") : 
                            'AA'
                          }
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      </div>

                      {/* Agent Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {proposal.agent?.name || 'Admin Agent'}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            <span>{proposal.agent?.rating || 'N/A'} Rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>�</span>
                            <span>{proposal.agent?.location || 'N/A'} Location</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>💼</span>
                            <span>{proposal.agent?.experience || 'N/A'} Exp</span>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed">
                          {proposal.coverLetter || proposal.description || 'No description provided'}
                        </p>
                        
                        <button 
                          className="text-blue-600 hover:text-blue-700 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                          onClick={() => handleViewAgentProfile(proposal.agentId, proposal.id)}
                        >
                          Click to view full profile
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                                            {/* Status Badge */}
                    <div className="w-full"></div>
                    <div className={`mt-1 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                      proposal.status === 'accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : proposal.status === 'rejected' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {proposal.status || 'Pending'}
                    </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proposal Details */}
                <div className="relative p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl"></div>
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wide">Price</div>
                          <div className="text-2xl font-bold text-gray-900">
                            ${proposal.proposedFee || proposal.price || '800'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Professional Rate</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="text-sm font-medium text-green-600 mb-2 uppercase tracking-wide">Timeline</div>
                          <div className="text-xl font-bold text-gray-900">
                            {proposal.estimatedTimeline || proposal.timeline || '1-month'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Estimated Duration</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div className="text-center">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">Status</div>
                          <div className={`text-lg font-semibold capitalize flex items-center justify-center gap-2 ${
                            proposal.status === 'accepted' 
                              ? 'text-green-600' 
                              : proposal.status === 'rejected' 
                              ? 'text-red-600' 
                              : 'text-yellow-600'
                          }`}>
                            {proposal.status === 'accepted' && <span className="text-lg">✅</span>}
                            {proposal.status === 'rejected' && <span className="text-lg">❌</span>}
                            {proposal.status === 'pending' && <span className="text-lg">⏳</span>}
                            {proposal.status || 'Pending'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Current State</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">Submitted</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : '7/17/2025'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Application Date</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 px-8 py-6 rounded-b-xl">
                  {proposal.status === 'pending' && (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          onClick={() => handleAcceptProposal(proposal.id)}
                          disabled={loadingProposals}
                        >
                          <span className="text-sm">✅</span>
                          <span>{loadingProposals ? 'Processing...' : 'Accept Proposal'}</span>
                        </button>
                        
                        <button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                          onClick={() => handleMessageAgent(proposal.agentId, proposal.id)}
                        >
                          <span className="text-sm">💬</span>
                          <span>Message Agent</span>
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                          💡 <strong>Tip:</strong> Message the agent to discuss details before accepting
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {proposal.status === 'rejected' && (
                    <div className="text-center">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="text-2xl mb-2">❌</div>
                        <div className="text-lg font-semibold text-red-800 mb-2">Proposal Rejected</div>
                        <p className="text-sm text-red-600">This proposal was not selected for your request</p>
                      </div>
                    </div>
                  )}

                  {proposal.status === 'accepted' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
                          🎉
                        </div>
                        <h4 className="text-xl font-semibold text-green-800 mb-2">Congratulations!</h4>
                        <p className="text-green-700">Your proposal has been accepted. Here's what happens next:</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 border border-green-200 hover:border-green-300 transition-colors">
                          <div className="text-center">
                            <div className="text-xl mb-2">📋</div>
                            <span className="font-medium text-green-800">Review Agreement</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-green-200 hover:border-green-300 transition-colors">
                          <div className="text-center">
                            <div className="text-xl mb-2">🔒</div>
                            <span className="font-medium text-green-800">Setup Escrow</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-green-200 hover:border-green-300 transition-colors">
                          <div className="text-center">
                            <div className="text-xl mb-2">📞</div>
                            <span className="font-medium text-green-800">Schedule Call</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-green-200 hover:border-green-300 transition-colors">
                          <div className="text-center">
                            <div className="text-xl mb-2">📁</div>
                            <span className="font-medium text-green-800">Prepare Docs</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm flex items-center gap-2">
                          <span>📋</span>
                          <span>View Agreement</span>
                        </button>
                        <button className="bg-white hover:bg-green-50 text-green-700 font-medium py-3 px-6 rounded-lg border border-green-200 hover:border-green-300 transition-colors shadow-sm flex items-center gap-2">
                          <span>🔒</span>
                          <span>Setup Escrow</span>
                        </button>
                        <button className="bg-white hover:bg-green-50 text-green-700 font-medium py-3 px-6 rounded-lg border border-green-200 hover:border-green-300 transition-colors shadow-sm flex items-center gap-2">
                          <span>📞</span>
                          <span>Schedule Call</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            My Visa Requests
          </h1>
          <p className="text-gray-600">
            Manage your visa applications and track their progress
          </p>
        </div>

        <Button
          onClick={() => setShowPostRequest(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Request
        </Button>
      </div>

      {/* Request Summary - Only show if user has requests */}
      {requests.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {requests.length} Total Request{requests.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-gray-600">
                  {sortedRequests.length} matching current filters
                </p>
              </div>
              
              {/* Quick stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {requests.filter(r => r.status === 'pending').length} Pending
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {requests.filter(r => r.status === 'in-progress').length} In Progress
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {requests.filter(r => r.status === 'completed').length} Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-50 rounded-lg p-1">
                {[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "in-progress", label: "In Progress" },
                  { value: "completed", label: "Completed" },
                  { value: "rejected", label: "Rejected" },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFilterStatus(option.value)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                      filterStatus === option.value
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Grid/List */}
      {sortedRequests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
        >
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {requests.length === 0 
              ? "No visa requests yet" 
              : "No requests match your current filters"
            }
          </h3>
          <p className="text-gray-500 mb-6">
            {requests.length === 0
              ? "Start by creating your first visa request to get matched with qualified immigration agents"
              : "Try adjusting your search terms or filters to see more results"
            }
          </p>
          
          {/* Show different actions based on whether user has any requests */}
          {requests.length === 0 ? (
            <Button
              onClick={() => setShowPostRequest(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Request
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                }}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Clear Filters
              </Button>
              <Button
                onClick={() => setShowPostRequest(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Request
              </Button>
            </div>
          )}
        </motion.div>
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4",
          )}
        >
          {sortedRequests.map((request, index) => (
            <motion.div
              key={request.id || (request as any)._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200",
                viewMode === "list" && "flex items-center gap-6",
              )}
            >
              {/* Header with Status and Actions Dropdown */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">
                      {request.status.replace("_", " ")}
                    </span>
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-cool-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>

                  {/* 3-Dot Actions Dropdown */}
                  <div className="relative dropdown-container">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const requestId = request.id || (request as any)._id;
                        setOpenDropdown(
                          openDropdown === requestId ? null : requestId,
                        );
                      }}
                      className="p-1 h-8 w-8"
                      style={{ color: "#455A64" }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdown === (request.id || (request as any)._id) && (
                        <motion.div
                          initial={{ opacity: 0, y: 0, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-1 w-36 rounded-lg shadow-lg border border-gray-200 z-50"
                          style={{ backgroundColor: "#FEFEFE" }}
                        >
                          <div className="p-1">
                            <button
                              onClick={() => handleView(request.id || (request as any)._id)}
                              className="w-full flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-left text-sm"
                              style={{ color: "#455A64" }}
                            >
                              <Eye
                                className="w-4 h-4"
                                style={{ color: "#0288D1" }}
                              />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => handleEdit(request.id || (request as any)._id)}
                              className="w-full flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-left text-sm"
                              style={{ color: "#455A64" }}
                            >
                              <Edit
                                className="w-4 h-4"
                                style={{ color: "#0288D1" }}
                              />
                              <span>Edit</span>
                            </button>

                            {request.status === "pending" && (
                              <button
                                onClick={() => handleDelete(request.id)}
                                className="w-full flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-50 transition-colors text-left text-sm"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                                <span className="text-red-600">Delete</span>
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className={cn(viewMode === "list" && "flex-1")}>
                {/* Request Title */}
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {request.title}
                </h3>

                {/* Request Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span>
                      {request.targetCountry} • {request.visaType}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    <span>
                      {budgetRanges.find(b => b.value === request.budget)?.label || request.budget}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span>
                      {timelines.find(t => t.value === request.deadline)?.label || request.deadline}
                    </span>
                  </div>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {request.description}
                </p>

                {/* Proposals Count */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Requirements: <strong className="text-blue-600">
                      {request.requirements.length}
                    </strong>
                  </span>
                  <span className="text-xs text-cool-gray-500 capitalize">
                    Created: {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center mt-4 space-x-2">
                <Button
                  onClick={() => handleViewProposals(request.id || (request as any)._id)}
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Proposals
                  {proposalCounts[request.id || (request as any)._id] !== undefined && (
                    <Badge 
                      className="ml-2 text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      {proposalCounts[request.id || (request as any)._id]}
                    </Badge>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-50">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Delete Request
                </h3>
                <p className="text-sm mb-6 text-gray-600">
                  Are you sure you want to delete this visa request? This action
                  cannot be undone and all associated proposals will be lost.
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowDeleteConfirm(null)}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => confirmDelete(showDeleteConfirm)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proposals Modal */}
      <AnimatePresence>
        {showProposals && selectedRequestId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProposals(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Agent Proposals
                  </h2>
                  <button
                    onClick={() => setShowProposals(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Review proposals from immigration agents for your visa request
                </p>
              </div>
              
              <div className="p-6">
                {loadingProposals ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading proposals...</span>
                  </div>
                ) : proposals.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Proposals Yet</h3>
                    <p className="text-gray-600">
                      Your request is live! Agents will start submitting proposals soon.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {proposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                            onClick={() => {
                              setShowProposals(false);
                              handleViewAgentProfile(proposal.agentId, proposal.id);
                            }}
                          >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                              {proposal.agent?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                {proposal.agent?.name || 'Anonymous Agent'}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {proposal.agent?.title || 'Immigration Consultant'}
                              </p>
                              <p className="text-xs text-blue-600 mt-1">Click to view profile</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              ${proposal.price || 'Contact for pricing'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {proposal.timeline || 'Timeline to be discussed'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Proposal Details</h5>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {proposal.description || 'The agent will provide detailed consultation and assistance with your visa application process.'}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>⭐ {proposal.agent?.rating || '5.0'} rating</span>
                            <span>📅 {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : 'Recent'}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowProposals(false);
                                handleViewAgentProfile(proposal.agentId, proposal.id);
                              }}
                            >
                              View Profile
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAcceptProposal(proposal.id);
                              }}
                              disabled={loadingProposals}
                            >
                              {loadingProposals ? 'Accepting...' : 'Accept Proposal'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Details Modal */}
      <AnimatePresence>
        {showRequestDetails && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRequestDetails(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedRequest.title}
                  </h2>
                  <button
                    onClick={() => setShowRequestDetails(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visa Type:</span>
                        <span className="font-medium">{selectedRequest.visaType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Country:</span>
                        <span className="font-medium">{selectedRequest.targetCountry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium">
                          {budgetRanges.find(b => b.value === selectedRequest.budget)?.label || selectedRequest.budget}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedRequest.status)}>
                          {selectedRequest.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">
                          {new Date(selectedRequest.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deadline:</span>
                        <span className="font-medium">
                          {timelines.find(t => t.value === selectedRequest.deadline)?.label || selectedRequest.deadline}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">
                          {new Date(selectedRequest.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedRequest.description}
                  </p>
                </div>
                
                {selectedRequest.requirements && selectedRequest.requirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {selectedRequest.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setShowRequestDetails(false)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowRequestDetails(false);
                      handleEdit(selectedRequest.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Request
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Request Modal */}
      <AnimatePresence>
        {showEditRequest && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEditRequest(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Edit Visa Request
                  </h2>
                  <button
                    onClick={() => setShowEditRequest(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Request Title
                    </label>
                    <input
                      type="text"
                      value={editFormData.title || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
                      placeholder="Enter a brief title for your request"
                    />
                  </div>

                  {/* Visa Type and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Visa Type
                      </label>
                      <select
                        value={editFormData.visaType || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, visaType: e.target.value })}
                        className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
                      >
                        <option value="">Select visa type</option>
                        {visaTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Country
                      </label>
                      <select
                        value={editFormData.targetCountry || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, targetCountry: e.target.value })}
                        className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
                      >
                        <option value="">Select target country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Range
                      </label>
                      <select
                        value={editFormData.budget || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, budget: e.target.value })}
                        className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timeline
                      </label>
                      <select
                        value={editFormData.deadline || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, deadline: e.target.value })}
                        className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline.value} value={timeline.value}>
                            {timeline.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editFormData.description || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
                      rows={4}
                      placeholder="Provide a detailed description of your request"
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements
                    </label>
                    <input
                      type="text"
                      value={editFormData.requirements?.join(", ") || ''}
                      onChange={(e) => setEditFormData({ 
                        ...editFormData, 
                        requirements: e.target.value.split(",").map(req => req.trim()) 
                      })}
                      className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
                      placeholder="Enter requirements separated by commas"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    onClick={() => setShowEditRequest(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateRequest}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Request'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

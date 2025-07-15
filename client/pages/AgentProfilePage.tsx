import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Calendar, 
  Award, 
  MessageCircle, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Users,
  FileText,
  TrendingUp,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from "@shared/api";

// Simple interface for agent data
interface AgentData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  bio: string;
  location: string;
  phone: string;
  website: string;
  languages: string[];
  specializations: string[];
  experienceYears: number;
  successRate: number;
  responseTime: string;
  hourlyRate: number;
  certifications: string[];
  isVerified: boolean;
  completedCases: number;
}

interface ReviewData {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  aspects: {
    communication: number;
    expertise: number;
    timeliness: number;
    professionalism: number;
    value: number;
  };
  createdAt: string;
}

export default function AgentProfilePage() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const proposalId = searchParams.get('proposalId');
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'portfolio' | 'proposal'>(proposalId ? 'proposal' : 'overview');
  const [acceptingProposal, setAcceptingProposal] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);

  useEffect(() => {
    console.log('AgentProfilePage mounted with:', { agentId, proposalId });
    if (agentId) {
      fetchAgentData();
      if (proposalId) {
        console.log('Fetching proposal data for proposalId:', proposalId);
        fetchProposalData();
      } else {
        console.log('No proposalId provided');
      }
    } else {
      console.error('No agentId provided');
    }
  }, [agentId, proposalId]);

  const fetchAgentData = async () => {
    try {
      setLoading(true);
      
      // Fetch real agent data from API
      const agentResponse = await api.getUserProfile(agentId!) as any;
      console.log('Fetched agent data:', agentResponse);
      
      // Map API response to frontend format
      const agentData: AgentData = {
        id: agentResponse.id || agentResponse._id || agentId!,
        name: agentResponse.name || 'Unknown Agent',
        email: agentResponse.email || '',
        avatar: agentResponse.avatar || agentResponse.name?.substring(0, 2).toUpperCase() || 'AG',
        title: agentResponse.title || 'Immigration Consultant',
        bio: agentResponse.bio || 'Experienced immigration consultant',
        location: agentResponse.location || 'Canada',
        phone: agentResponse.phone || '',
        website: agentResponse.website || '',
        languages: agentResponse.languages || ['English'],
        specializations: agentResponse.specializations || ['Immigration Services'],
        experienceYears: agentResponse.experienceYears || 0,
        successRate: agentResponse.successRate || (agentResponse.rating ? agentResponse.rating * 20 : 95),
        responseTime: agentResponse.responseTime || '< 24 hours',
        hourlyRate: agentResponse.hourlyRate || 100,
        certifications: agentResponse.certifications || [],
        isVerified: agentResponse.isVerified !== undefined ? agentResponse.isVerified : true,
        completedCases: agentResponse.completedCases || 0
      };

      // Fetch real reviews data
      const reviewsResponse = await api.getUserReviews(agentId!) as any[];
      console.log('Fetched reviews data:', reviewsResponse);
      
      const reviewsData: ReviewData[] = reviewsResponse.map((review: any) => ({
        id: review.id || review._id,
        clientName: review.clientName || review.reviewer?.name || 'Anonymous Client',
        rating: review.rating || 5,
        comment: review.comment || review.reviewText || '',
        aspects: {
          communication: review.aspects?.communication || review.rating || 5,
          expertise: review.aspects?.expertise || review.rating || 5,
          timeliness: review.aspects?.timeliness || review.rating || 5,
          professionalism: review.aspects?.professionalism || review.rating || 5,
          value: review.aspects?.value || review.rating || 5
        },
        createdAt: review.createdAt || review.date || new Date().toISOString()
      }));

      setAgent(agentData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to fetch agent data:', error);
      // Fallback to basic data if API fails
      const fallbackAgent: AgentData = {
        id: agentId!,
        name: 'Immigration Agent',
        email: '',
        avatar: 'IA',
        title: 'Immigration Consultant',
        bio: 'Professional immigration consultant',
        location: 'Canada',
        phone: '',
        website: '',
        languages: ['English'],
        specializations: ['Immigration Services'],
        experienceYears: 5,
        successRate: 95,
        responseTime: '< 24 hours',
        hourlyRate: 100,
        certifications: [],
        isVerified: true,
        completedCases: 0
      };
      setAgent(fallbackAgent);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProposalData = async () => {
    if (!proposalId) {
      console.error('No proposalId provided to fetchProposalData');
      return;
    }
    
    try {
      console.log('Fetching proposal with ID:', proposalId);
      // Fetch specific proposal data from API
      const foundProposal = await api.getProposal(proposalId) as any;
      console.log('Fetched proposal:', foundProposal);
      
      // Handle different response structures
      const proposalData = foundProposal?.data || foundProposal;
      
      if (proposalData) {
        const processedProposal = {
          id: proposalData.id || proposalData._id,
          title: proposalData.title || `${proposalData.caseType || 'Immigration'} Application`,
          description: proposalData.description || proposalData.proposalText || 'Professional immigration services',
          amount: proposalData.amount || proposalData.budget || proposalData.price || 1000,
          timeline: proposalData.timeline || proposalData.estimatedTime || '4-6 weeks',
          milestones: proposalData.milestones || [
            { title: 'Initial Consultation', description: 'Review case requirements and documents', completed: false },
            { title: 'Document Preparation', description: 'Prepare and review all necessary documents', completed: false },
            { title: 'Application Submission', description: 'Submit application to relevant authorities', completed: false },
            { title: 'Follow-up & Support', description: 'Monitor progress and provide ongoing support', completed: false }
          ],
          services: proposalData.services || proposalData.servicesIncluded || [
            'Professional consultation',
            'Document review and preparation',
            'Application submission',
            'Status monitoring',
            'Post-approval support'
          ],
          caseType: proposalData.caseType || proposalData.visaType || 'Immigration',
          status: proposalData.status || 'pending',
          createdAt: proposalData.createdAt || new Date().toISOString()
        };
        
        console.log('Processed proposal data:', processedProposal);
        setProposal(processedProposal);
      } else {
        console.error('No proposal data found in response');
        throw new Error('No proposal data found');
      }
    } catch (error: any) {
      console.error('Failed to fetch proposal data:', error);
      console.error('Error details:', error?.response?.data);
      
      // Fallback proposal data
      const fallbackProposal = {
        id: proposalId,
        title: 'Immigration Application',
        description: 'Professional immigration services',
        amount: 1000,
        timeline: '4-6 weeks',
        milestones: [
          { title: 'Initial Consultation', description: 'Review case requirements', completed: false },
          { title: 'Document Preparation', description: 'Prepare necessary documents', completed: false },
          { title: 'Application Submission', description: 'Submit application', completed: false }
        ],
        services: ['Professional consultation', 'Document preparation', 'Application submission'],
        caseType: 'Immigration',
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      console.log('Using fallback proposal data:', fallbackProposal);
      setProposal(fallbackProposal);
    }
  };

  const acceptProposal = async () => {
    if (!proposal) {
      console.error('No proposal found to accept');
      alert('No proposal data available to accept.');
      return;
    }
    
    try {
      setAcceptingProposal(true);
      console.log('Accepting proposal:', proposal.id);
      console.log('Proposal object:', proposal);
      
      // API call to accept proposal
      const response = await api.acceptProposal(proposal.id) as any;
      console.log('Accept proposal response:', response);
      
      // Handle different response structures
      const isSuccess = response?.success === true || response?.data?.success === true;
      
      if (isSuccess) {
        setProposalAccepted(true);
        console.log('Proposal accepted successfully');
        
        // Show success message
        alert('Proposal accepted successfully! Redirecting to dashboard...');
        
        // Redirect to dashboard after acceptance
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        console.error('Response indicates failure:', response);
        throw new Error(response?.error || response?.data?.error || 'Failed to accept proposal');
      }
      
    } catch (error: any) {
      console.error('Failed to accept proposal:', error);
      
      // Extract error message
      let errorMessage = 'Failed to accept proposal. Please try again.';
      if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      // Show user-friendly error message
      alert(`Error: ${errorMessage}`);
    } finally {
      setAcceptingProposal(false);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const getAspectAverages = () => {
    if (reviews.length === 0) return null;
    
    const aspects = {
      communication: 0,
      expertise: 0,
      timeliness: 0,
      professionalism: 0,
      value: 0
    };

    reviews.forEach(review => {
      aspects.communication += review.aspects.communication;
      aspects.expertise += review.aspects.expertise;
      aspects.timeliness += review.aspects.timeliness;
      aspects.professionalism += review.aspects.professionalism;
      aspects.value += review.aspects.value;
    });

    Object.keys(aspects).forEach(key => {
      aspects[key as keyof typeof aspects] = aspects[key as keyof typeof aspects] / reviews.length;
    });

    return aspects;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cool-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue-600"></div>
            <span className="ml-3 text-cool-gray-600">Loading agent profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cool-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-cool-gray-900 mb-2">Agent Not Found</h2>
            <p className="text-cool-gray-600 mb-4">The agent profile you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const aspectAverages = getAspectAverages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cool-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse Agents
          </Button>
          
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-bold text-cool-gray-800">
              Agent Profile
            </h1>
            <p className="text-cool-gray-600 mt-1">
              View detailed information about this immigration consultant
            </p>
          </div>
        </div>

        {/* Agent Header Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Info */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-royal-blue-500 to-royal-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {agent.avatar || agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {agent.isVerified && (
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-cool-gray-800">{agent.name}</h2>
                    {agent.isVerified && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-lg text-royal-blue-600 font-medium mb-4">{agent.title}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-cool-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {agent.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {agent.experienceYears} years experience
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {agent.completedCases} completed cases
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {agent.responseTime} response time
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-gold-500 fill-current" />
                      <span className="text-lg font-bold">{getAverageRating()}</span>
                      <span className="text-cool-gray-600">({reviews.length} reviews)</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {agent.successRate}% Success Rate
                    </Badge>
                  </div>

                  <p className="text-cool-gray-700 leading-relaxed">{agent.bio}</p>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="lg:w-80 space-y-4">
                <div className="bg-cool-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-cool-gray-800 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cool-gray-500" />
                      <span>{agent.email}</span>
                    </div>
                    {agent.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-cool-gray-500" />
                        <span>{agent.phone}</span>
                      </div>
                    )}
                    {agent.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cool-gray-500" />
                        <span>{agent.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-royal-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-cool-gray-800 mb-2">Price Range</h3>
                  <div className="flex items-center gap-2 text-lg font-bold text-royal-blue-600">
                    <DollarSign className="w-5 h-5" />
                    ${agent.hourlyRate}/hour
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-royal-blue-500 hover:bg-royal-blue-600 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Consultation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-cool-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'portfolio', label: 'Portfolio' },
            ...(proposalId ? [{ id: 'proposal', label: 'Proposal' }] : [])
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-royal-blue-600 shadow-sm"
                  : "text-cool-gray-600 hover:text-cool-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Specializations */}
              <Card>
                <CardHeader>
                  <CardTitle>Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agent.specializations?.map((spec) => (
                      <Badge key={spec} className="bg-royal-blue-100 text-royal-blue-700">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agent.languages?.map((lang) => (
                      <Badge key={lang} className="bg-sage-green-100 text-sage-green-700">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {agent.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-cool-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Rating Overview */}
              {aspectAverages && (
                <Card>
                  <CardHeader>
                    <CardTitle>Rating Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-5 gap-4">
                      {Object.entries(aspectAverages).map(([aspect, rating]) => (
                        <div key={aspect} className="text-center">
                          <div className="text-2xl font-bold text-royal-blue-600">{rating.toFixed(1)}</div>
                          <div className="text-sm text-cool-gray-600 capitalize">{aspect}</div>
                          <div className="flex justify-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= rating ? 'text-gold-500 fill-current' : 'text-cool-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-royal-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.clientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.clientName}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating ? 'text-gold-500 fill-current' : 'text-cool-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-cool-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-cool-gray-500">{formatDate(new Date(review.createdAt))}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <FileText className="w-16 h-16 text-cool-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-cool-gray-700 mb-2">Portfolio Coming Soon</h3>
              <p className="text-cool-gray-500">
                Case studies and portfolio examples will be available here.
              </p>
            </motion.div>
          )}

          {/* Proposal Tab */}
          {activeTab === 'proposal' && proposal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Proposal Header */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-cool-gray-800 mb-2">{proposal.title}</CardTitle>
                      <Badge variant="outline" className="text-royal-blue-600 border-royal-blue-300">
                        {proposal.caseType}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cool-gray-800">${proposal.amount}</div>
                      <div className="text-sm text-cool-gray-500">{proposal.timeline}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cool-gray-600 leading-relaxed">{proposal.description}</p>
                </CardContent>
              </Card>

              {/* Services Included */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-cool-gray-800">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Services Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {proposal.services.map((service: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-cool-gray-600">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-cool-gray-800">
                    <TrendingUp className="w-5 h-5 text-royal-blue-500" />
                    Project Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proposal.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          milestone.completed ? 'bg-green-100 text-green-600' : 'bg-cool-gray-100 text-cool-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-cool-gray-800">{milestone.title}</h4>
                          <p className="text-sm text-cool-gray-600 mt-1">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accept Proposal Section */}
              {!proposalAccepted && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-cool-gray-800 mb-2">Ready to Get Started?</h3>
                      <p className="text-cool-gray-600 mb-6">
                        Accept this proposal to begin working with {agent?.name} on your immigration case.
                      </p>
                      <Button
                        onClick={acceptProposal}
                        disabled={acceptingProposal}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                      >
                        {acceptingProposal ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Accepting Proposal...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Accept Proposal
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Proposal Accepted Message */}
              {proposalAccepted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-800 mb-2">Proposal Accepted!</h3>
                      <p className="text-green-700 mb-4">
                        You have successfully accepted the proposal. You'll be redirected to your dashboard shortly.
                      </p>
                      <Badge className="bg-green-100 text-green-800">
                        Case Created - Redirecting...
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

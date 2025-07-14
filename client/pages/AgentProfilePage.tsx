import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'portfolio'>('overview');

  useEffect(() => {
    if (agentId) {
      fetchAgentData();
    }
  }, [agentId]);

  const fetchAgentData = async () => {
    try {
      setLoading(true);
      
      // Mock agent data - replace with actual API call
      const mockAgent: AgentData = {
        id: agentId!,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        avatar: 'SJ',
        title: 'Senior Immigration Consultant',
        bio: 'Experienced immigration consultant with over 8 years of expertise in Canadian immigration law. Specialized in work permits, permanent residence applications, and student visas.',
        location: 'Toronto, Canada',
        phone: '+1 (416) 555-0123',
        website: 'www.sarahjohnsonimmigration.com',
        languages: ['English', 'French', 'Spanish'],
        specializations: ['Work Permit', 'Permanent Residence', 'Student Visa', 'Family Sponsorship'],
        experienceYears: 8,
        successRate: 96,
        responseTime: '< 2 hours',
        hourlyRate: 150,
        certifications: [
          'Regulated Canadian Immigration Consultant (RCIC)',
          'Member of Immigration Consultants of Canada Regulatory Council (ICCRC)',
          'Licensed Immigration Consultant - College of Immigration and Citizenship Consultants'
        ],
        isVerified: true,
        completedCases: 245
      };

      // Mock reviews data
      const mockReviews: ReviewData[] = [
        {
          id: '1',
          clientName: 'Mike Chen',
          rating: 5,
          comment: 'Sarah was absolutely fantastic! She guided me through my PR application with such professionalism and care. Highly recommended!',
          aspects: {
            communication: 5,
            expertise: 5,
            timeliness: 5,
            professionalism: 5,
            value: 4
          },
          createdAt: '2024-06-15T00:00:00Z'
        },
        {
          id: '2',
          clientName: 'Emma Rodriguez',
          rating: 5,
          comment: 'Excellent service! Sarah helped me get my work permit approved in record time. Very knowledgeable and responsive.',
          aspects: {
            communication: 5,
            expertise: 5,
            timeliness: 5,
            professionalism: 5,
            value: 5
          },
          createdAt: '2024-05-20T00:00:00Z'
        },
        {
          id: '3',
          clientName: 'John Smith',
          rating: 4,
          comment: 'Great experience overall. Sarah was very helpful throughout my student visa application process.',
          aspects: {
            communication: 4,
            expertise: 5,
            timeliness: 4,
            professionalism: 5,
            value: 4
          },
          createdAt: '2024-04-10T00:00:00Z'
        }
      ];

      setAgent(mockAgent);
      setReviews(mockReviews);
    } catch (error) {
      console.error('Failed to fetch agent data:', error);
    } finally {
      setLoading(false);
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
            { id: 'portfolio', label: 'Portfolio' }
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
        </div>
      </div>
    </div>
  );
}

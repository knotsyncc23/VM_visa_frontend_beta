import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Calendar, Award, MessageCircle, ArrowLeft, Phone, Mail, Globe, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api, User, Review, Proposal } from '@shared/api';

interface AgentProfilePageProps {
  agentId: string;
  proposalId?: string;
  onBack: () => void;
  onMessage?: (agentId: string, proposalId?: string) => void;
}

export function AgentProfilePage({ agentId, proposalId, onBack, onMessage }: AgentProfilePageProps) {
  const [agent, setAgent] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'proposal'>('overview');

  useEffect(() => {
    fetchAgentData();
  }, [agentId]);

  const fetchAgentData = async () => {
    try {
      setLoading(true);
      const [agentData, reviewsData] = await Promise.all([
        api.getUserProfile(agentId),
        api.getUserReviews(agentId)
      ]);
      
      setAgent(agentData);
      setReviews(reviewsData);
      
      // If there's a specific proposal, we might want to fetch it
      if (proposalId) {
        setActiveTab('proposal');
        // You could fetch specific proposal details here if needed
      }
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading agent profile...</span>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Agent Not Found</h2>
          <p className="text-gray-600 mb-4">The agent profile you're looking for doesn't exist.</p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const averageRating = getAverageRating();
  const aspectAverages = getAspectAverages();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline" className="group">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-3">
          {onMessage && (
            <Button 
              onClick={() => onMessage(agentId, proposalId)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Agent
            </Button>
          )}
        </div>
      </div>

      {/* Agent Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Agent Avatar & Basic Info */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
              {agent.avatar ? (
                <img src={agent.avatar} alt={agent.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                agent.name.split(' ').map(n => n[0]).join('')
              )}
            </div>
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                {agent.isVerified && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
              <p className="text-lg text-gray-600 mb-2">Immigration Specialist</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {agent.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{agent.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(agent.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating & Stats */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Rating */}
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-3xl font-bold text-gray-900">{averageRating}</span>
                  <span className="text-gray-600">({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(typeof averageRating === 'string' ? parseFloat(averageRating) : averageRating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Success Rate */}
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {reviews.length > 0 ? '98%' : 'N/A'}
                </div>
                <div className="text-gray-600">Success Rate</div>
              </div>

              {/* Response Time */}
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  <Clock className="w-6 h-6 inline mr-1" />
                  2h
                </div>
                <div className="text-gray-600">Avg. Response</div>
              </div>
            </div>

            {/* Bio */}
            {agent.bio && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700 leading-relaxed">{agent.bio}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'reviews', label: `Reviews (${reviews.length})` },
          ...(proposalId ? [{ key: 'proposal', label: 'Proposal Details' }] : [])
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Skills & Expertise */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expertise & Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {aspectAverages && Object.entries(aspectAverages).map(([aspect, rating]) => (
                  <div key={aspect} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {rating.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {aspect.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="glass-card rounded-2xl p-6 border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{agent.email}</span>
                </div>
                {agent.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{agent.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {reviews.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="text-gray-500 mb-2">No reviews yet</div>
                <p className="text-sm text-gray-400">This agent hasn't received any reviews yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                          {review.reviewer.name[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.reviewer.name}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm font-medium">{review.rating}</span>
                      </div>
                    </div>
                    
                    <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    
                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {review.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'proposal' && proposalId && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proposal Details</h3>
              <p className="text-gray-600">
                Detailed proposal information will be displayed here when available.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

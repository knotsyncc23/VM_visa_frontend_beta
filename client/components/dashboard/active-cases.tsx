import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/auth-context';
import { api, Case } from '../../../shared/api';
import {
  CheckCircle,
  Clock,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Upload,
  AlertCircle,
  Eye,
  ChevronRight,
  Activity,
  DollarSign,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SubmitRequest } from './submit-request';

export function ActiveCases() {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showSubmitRequest, setShowSubmitRequest] = useState(false);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching cases for user:', user?.id, 'userType:', user?.userType);
      
      const params = {
        status: 'active',
        ...(user?.userType === 'agent' && { agentId: user.id }),
        ...(user?.userType === 'client' && { clientId: user.id })
      };
      
      const casesData = await api.getCases(params);
      console.log('📋 Fetched cases:', casesData);
      setCases(casesData || []);
    } catch (error) {
      console.error('❌ Failed to fetch cases:', error);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getNextMilestone = (caseItem: Case) => {
    return caseItem.milestones.find(m => m.isActive) || caseItem.milestones.find(m => m.status === 'pending');
  };

  const getOverdueMilestones = (caseItem: Case) => {
    const now = new Date();
    return caseItem.milestones.filter(m => 
      m.status !== 'completed' && 
      m.status !== 'approved' && 
      new Date(m.dueDate) < now
    );
  };

  const handleViewCase = (caseItem: Case) => {
    window.location.href = `/case/${caseItem._id}`;
  };

  const handleMessageParty = (caseItem: Case) => {
    const otherPartyId = user?.userType === 'client' ? caseItem.agentId?._id : caseItem.clientId?._id;
    window.location.href = `/messages?conversation=${caseItem._id}&participant=${otherPartyId}`;
  };

  const handleViewDocuments = (caseItem: Case) => {
    window.location.href = `/documents?case=${caseItem._id}`;
  };

  const handleScheduleCall = (caseItem: Case) => {
    window.location.href = `/calendar?case=${caseItem._id}&action=schedule`;
  };

  const handleSubmitRequestSuccess = () => {
    setShowSubmitRequest(false);
    fetchCases(); // Refresh cases after successful submission
  };

  // Show submit request form if user clicked the button
  if (showSubmitRequest && user?.userType === 'client') {
    return <SubmitRequest onSuccess={handleSubmitRequestSuccess} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue-500 mx-auto mb-4"></div>
          <p className="text-cool-gray-600">Loading active cases...</p>
        </div>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="w-16 h-16 text-cool-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-cool-gray-800 mb-2">No Active Cases</h3>
          <p className="text-cool-gray-600 mb-6">
            {user?.userType === 'client' 
              ? "You don't have any active cases at the moment. Submit a visa request to get started."
              : "You don't have any active cases at the moment. Apply to more visa requests to get started."
            }
          </p>
            <Button 
            variant="premium"
            onClick={() => {
              if (user?.userType === 'client') {
                setShowSubmitRequest(true);
              } else {
                window.location.href = '/browse-requests';
              }
            }}
            >
            {user?.userType === 'client' ? 'Submit New Request' : 'Browse Available Requests'}
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-cool-gray-800">Active Cases</h2>
          <p className="text-cool-gray-600">Manage your ongoing visa applications</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {cases.length} Active Case{cases.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-6">
        {cases.map((caseItem) => {
          const otherParty = user?.userType === 'client' ? caseItem.agentId : caseItem.clientId;
          const nextMilestone = getNextMilestone(caseItem);
          const overdueMilestones = getOverdueMilestones(caseItem);
          const isOverdue = overdueMilestones.length > 0;
          
          return (
            <div key={caseItem._id}>
              <Card className={cn(
                "border-l-4",
                isOverdue ? "border-l-red-500" : "border-l-royal-blue-500"
              )}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl font-semibold text-cool-gray-800">
                          {caseItem.requestId.title}
                        </CardTitle>
                        <Badge className={cn("text-xs", getStatusColor(caseItem.status))}>
                          {caseItem.status}
                        </Badge>
                        {caseItem.priority && (
                          <Badge className={cn("text-xs", getPriorityColor(caseItem.priority))}>
                            {caseItem.priority}
                          </Badge>
                        )}
                        {isOverdue && (
                          <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-cool-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {caseItem.requestId.visaType.replace('-', ' ').toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {caseItem.requestId.country}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Started {formatDate(caseItem.startDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Due {formatDate(caseItem.estimatedCompletionDate)}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium text-cool-gray-700">Progress</span>
                          <span className="text-cool-gray-600">{caseItem.progress}% Complete</span>
                        </div>
                        <div className="w-full bg-cool-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-royal-blue-500 to-sage-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${caseItem.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Current Milestone */}
                      {nextMilestone && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Current Milestone</span>
                          </div>
                          <p className="text-blue-700 text-sm">{nextMilestone.title}</p>
                          <p className="text-blue-600 text-xs mt-1">
                            Due: {formatDate(nextMilestone.dueDate)}
                          </p>
                        </div>
                      )}

                      {/* Other Party Info */}
                      {otherParty && (
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-cool-gray-500" />
                            <span className="text-sm text-cool-gray-600">
                              {user?.userType === 'client' ? 'Agent:' : 'Client:'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {otherParty.avatar ? (
                              <img 
                                src={otherParty.avatar} 
                                alt={otherParty.name}
                                className="w-6 h-6 rounded-full"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-royal-blue-100 flex items-center justify-center">
                                <span className="text-royal-blue-600 text-xs font-medium">
                                  {otherParty.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-cool-gray-800">{otherParty.name}</span>
                            {user?.userType === 'client' && (caseItem.agentId as any)?.isVerified && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Payment Info */}
                      <div className="flex items-center gap-4 text-sm text-cool-gray-600">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Total: ${caseItem.totalAmount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Paid: ${caseItem.paidAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCase(caseItem)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMessageParty(caseItem)}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message {user?.userType === 'client' ? 'Agent' : 'Client'}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDocuments(caseItem)}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Documents
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleScheduleCall(caseItem)}
                        className="flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Schedule Call
                      </Button>
                    </div>

                    <div className="text-xs text-cool-gray-500">
                      Case ID: {caseItem._id.slice(-8).toUpperCase()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

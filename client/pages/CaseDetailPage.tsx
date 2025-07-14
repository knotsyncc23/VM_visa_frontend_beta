import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/auth/auth-context';
import { api, Case, CaseMilestone, MilestoneStatus, PaymentMethod, API_BASE_URL } from '../../shared/api';
import MilestoneEditor from '../components/case/MilestoneEditor';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  PlayCircle,
  ThumbsUp,
  ThumbsDown,
  CreditCard,
  MessageSquare,
  Upload,
  MapPin,
  Activity,
  Download,
  Eye,
  Edit3,
  Bell,
  Star,
  Award,
  Phone,
  Mail,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function CaseDetailPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'timeline' | 'payments'>('overview');
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [showMilestoneEditor, setShowMilestoneEditor] = useState(false);
  const [milestoneEditorLoading, setMilestoneEditorLoading] = useState(false);

  useEffect(() => {
    console.log('🔍 CaseDetailPage useEffect triggered');
    console.log('🔍 caseId parameter:', caseId);
    console.log('🔍 caseId type:', typeof caseId);
    console.log('🔍 user:', user);
    console.log('🔍 Current URL:', window.location.href);
    console.log('🔍 Current pathname:', window.location.pathname);
    if (caseId) {
      console.log('🔍 Calling fetchCaseDetails for caseId:', caseId);
      fetchCaseDetails();
    } else {
      console.log('🔍 No caseId parameter found - not calling fetchCaseDetails');
      setLoading(false);
    }
  }, [caseId]);

  const fetchCaseDetails = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching case details for:', caseId);
      console.log('🔄 API base URL:', API_BASE_URL);
      console.log('🔄 About to call api.getCase with caseId:', caseId);
      const data = await api.getCase(caseId!);
      console.log('📋 Case data received:', data);
      setCaseData(data);
    } catch (error) {
      console.error('❌ Failed to fetch case details:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMilestoneStatus = async (milestoneIndex: number, status: MilestoneStatus, notes?: string) => {
    if (!caseData) return;
    
    try {
      setProcessingAction(`milestone-${milestoneIndex}`);
      console.log('🔄 Updating milestone status:', { milestoneIndex, status, notes });
      
      const updatedCase = await api.updateMilestoneStatus(caseData._id, milestoneIndex, status, notes);
      setCaseData(updatedCase);
      console.log('✅ Milestone status updated successfully');
    } catch (error) {
      console.error('❌ Failed to update milestone status:', error);
    } finally {
      setProcessingAction(null);
    }
  };

  const approveMilestone = async (milestoneIndex: number, action: 'approve' | 'reject', feedback?: string) => {
    if (!caseData) return;
    
    try {
      setProcessingAction(`approve-${milestoneIndex}`);
      console.log('🔄 Processing milestone approval:', { milestoneIndex, action, feedback });
      
      const updatedCase = await api.approveMilestone(caseData._id, milestoneIndex, action, feedback);
      setCaseData(updatedCase);
      console.log('✅ Milestone approval processed successfully');
    } catch (error) {
      console.error('❌ Failed to process milestone approval:', error);
    } finally {
      setProcessingAction(null);
    }
  };

  const makePayment = async (milestoneIndex: number, paymentMethod: PaymentMethod) => {
    if (!caseData) return;
    
    try {
      setProcessingAction(`payment-${milestoneIndex}`);
      console.log('💳 Processing payment:', { milestoneIndex, paymentMethod });
      
      const result = await api.makeMilestonePayment(caseData._id, milestoneIndex, paymentMethod);
      setCaseData(result.case);
      console.log('✅ Payment processed successfully:', result.payment);
    } catch (error) {
      console.error('❌ Failed to process payment:', error);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleMilestoneSave = async (milestones: CaseMilestone[]) => {
    if (!caseData) return;
    
    try {
      setMilestoneEditorLoading(true);
      console.log('💾 Saving milestones:', milestones);
      
      const updatedCase = await api.updateCaseMilestones(caseData._id, milestones);
      setCaseData(updatedCase);
      setShowMilestoneEditor(false);
      console.log('✅ Milestones updated successfully');
    } catch (error) {
      console.error('❌ Failed to update milestones:', error);
    } finally {
      setMilestoneEditorLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <PlayCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'approved': return <ThumbsUp className="w-4 h-4" />;
      case 'rejected': return <ThumbsDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue-500 mx-auto mb-4"></div>
          <p className="text-cool-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">Case Not Found</h2>
          <p className="text-cool-gray-600 mb-6">The case you're looking for doesn't exist or you don't have access to it.</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isAgent = user?.userType === 'agent';
  const isClient = user?.userType === 'client';
  const otherParty = isClient ? caseData.agentId : caseData.clientId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cool-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-bold text-cool-gray-800">
              {caseData.requestId.title}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-cool-gray-600">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {caseData.requestId.visaType.replace('-', ' ').toUpperCase()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {caseData.requestId.country}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Started {formatDate(caseData.startDate)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(caseData.status)}>
              {caseData.status}
            </Badge>
            <Badge variant="outline">
              {caseData.progress}% Complete
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-cool-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'milestones', label: 'Milestones' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'payments', label: 'Payments' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 py-2 px-4 rounded-md font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-white text-royal-blue-600 shadow-sm"
                  : "text-cool-gray-600 hover:text-cool-gray-800"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid gap-8">
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Case Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Progress Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium text-cool-gray-700">Overall Progress</span>
                          <span className="text-cool-gray-600">{caseData.progress}%</span>
                        </div>
                        <div className="w-full bg-cool-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-royal-blue-500 to-sage-green-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${caseData.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-cool-gray-600">Total Milestones:</span>
                          <span className="ml-2 font-medium">{caseData.milestones.length}</span>
                        </div>
                        <div>
                          <span className="text-cool-gray-600">Completed:</span>
                          <span className="ml-2 font-medium text-green-600">
                            {caseData.milestones.filter(m => m.status === 'approved').length}
                          </span>
                        </div>
                        <div>
                          <span className="text-cool-gray-600">In Progress:</span>
                          <span className="ml-2 font-medium text-blue-600">
                            {caseData.milestones.filter(m => m.status === 'in-progress').length}
                          </span>
                        </div>
                        <div>
                          <span className="text-cool-gray-600">Pending:</span>
                          <span className="ml-2 font-medium text-yellow-600">
                            {caseData.milestones.filter(m => m.status === 'pending').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Financial Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-cool-gray-800">
                          ${caseData.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-cool-gray-600">Total Amount</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          ${caseData.paidAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-cool-gray-600">Paid</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          ${(caseData.totalAmount - caseData.paidAmount).toLocaleString()}
                        </p>
                        <p className="text-sm text-cool-gray-600">Remaining</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-cool-gray-600">Payment Progress</span>
                        <span className="font-medium">
                          {Math.round((caseData.paidAmount / caseData.totalAmount) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-cool-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(caseData.paidAmount / caseData.totalAmount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Other Party Info - Different view for Agent vs Client */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {isClient ? 'Your Agent' : 'Client Information'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-royal-blue-400 to-sage-green-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {otherParty.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-cool-gray-800">{otherParty.name}</h3>
                          <p className="text-sm text-cool-gray-600">{otherParty.email}</p>
                          {(otherParty as any).phone && (
                            <p className="text-sm text-cool-gray-600">{(otherParty as any).phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Agent-specific info for clients */}
                      {isClient && (caseData.agentId as any)?.isVerified && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600 font-medium">Verified Agent</span>
                          </div>
                          {(caseData.agentId as any)?.rating && (
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-cool-gray-600">
                                {(caseData.agentId as any).rating} rating
                              </span>
                            </div>
                          )}
                          {(caseData.agentId as any)?.experienceYears && (
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-cool-gray-600">
                                {(caseData.agentId as any).experienceYears} years experience
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Client-specific info for agents */}
                      {isAgent && (
                        <div className="space-y-2">
                          <div className="text-sm text-cool-gray-600">
                            <span className="font-medium">Case Type:</span> {caseData.requestId.visaType}
                          </div>
                          <div className="text-sm text-cool-gray-600">
                            <span className="font-medium">Destination:</span> {caseData.requestId.country}
                          </div>
                          <div className="text-sm text-cool-gray-600">
                            <span className="font-medium">Priority:</span> 
                            <Badge className="ml-2" variant={caseData.requestId.priority === 'urgent' ? 'destructive' : 'default'}>
                              {caseData.requestId.priority}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/messages?conversation=${caseData._id}&participant=${otherParty._id}`)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/calendar?case=${caseData._id}&action=schedule`)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Call
                      </Button>
                      {isClient && (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate(`/agent/${otherParty._id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Agent Profile
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions - Role-based */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {isAgent && (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setShowMilestoneEditor(true)}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Milestones
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('timeline')}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Update Status
                        </Button>
                      </>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate(`/documents?case=${caseData._id}`)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      View Documents
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('timeline')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Timeline
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('payments')}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Payment History
                    </Button>

                    {isClient && (
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/support?case=${caseData._id}`)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Get Support
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-cool-gray-800">Milestones</h2>
                {isAgent && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setShowMilestoneEditor(true)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Milestones
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                )}
                {isClient && (
                  <div className="text-sm text-cool-gray-600">
                    Track your case progress and approve completed milestones
                  </div>
                )}
              </div>

              {/* Progress Summary */}
              <Card className="bg-gradient-to-r from-royal-blue-50 to-sage-green-50">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-cool-gray-800">
                        {caseData.milestones.filter(m => m.status === 'approved').length}
                      </div>
                      <div className="text-sm text-green-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cool-gray-800">
                        {caseData.milestones.filter(m => m.status === 'in-progress').length}
                      </div>
                      <div className="text-sm text-blue-600">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cool-gray-800">
                        {caseData.milestones.filter(m => m.status === 'pending').length}
                      </div>
                      <div className="text-sm text-yellow-600">Pending</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cool-gray-800">
                        {Math.round((caseData.milestones.filter(m => m.status === 'approved').length / caseData.milestones.length) * 100)}%
                      </div>
                      <div className="text-sm text-cool-gray-600">Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {caseData.milestones.map((milestone, index) => (
                  <Card key={index} className={cn(
                    "transition-all duration-300",
                    milestone.isActive && "ring-2 ring-royal-blue-500",
                    milestone.status === 'approved' && "bg-green-50 border-green-200"
                  )}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-cool-gray-800">{milestone.title}</h3>
                            <Badge className={cn("text-xs", getStatusColor(milestone.status))}>
                              {getStatusIcon(milestone.status)}
                              {milestone.status}
                            </Badge>
                            {milestone.isActive && (
                              <Badge variant="outline" className="text-xs">
                                Active
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-cool-gray-600 mb-3">{milestone.description}</p>
                          
                          {/* Deliverables */}
                          {milestone.deliverables && milestone.deliverables.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-sm font-medium text-cool-gray-700 mb-1">Deliverables:</h4>
                              <ul className="text-sm text-cool-gray-600 list-disc list-inside">
                                {milestone.deliverables.map((deliverable, idx) => (
                                  <li key={idx}>{deliverable}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-6 text-sm text-cool-gray-600">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${milestone.amount.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {formatDate(milestone.dueDate)}
                            </div>
                            {milestone.startedAt && (
                              <div className="flex items-center gap-1">
                                <PlayCircle className="w-4 h-4" />
                                Started: {formatDate(milestone.startedAt)}
                              </div>
                            )}
                            {milestone.completedAt && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Completed: {formatDate(milestone.completedAt)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Agent Actions */}
                      {isAgent && (
                        <div className="space-y-3">
                          {milestone.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateMilestoneStatus(index, 'in-progress')}
                              disabled={processingAction === `milestone-${index}`}
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Start Working
                            </Button>
                          )}

                          {milestone.status === 'in-progress' && (
                            <div className="space-y-2">
                              <Button
                                size="sm"
                                onClick={() => updateMilestoneStatus(index, 'completed')}
                                disabled={processingAction === `milestone-${index}`}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark Complete
                              </Button>
                              <Textarea
                                placeholder="Add notes about your progress..."
                                className="text-sm"
                                rows={2}
                                value={milestone.agentNotes || ''}
                                onChange={(e) => {
                                  const updated = [...caseData.milestones];
                                  updated[index] = { ...updated[index], agentNotes: e.target.value };
                                  setCaseData({ ...caseData, milestones: updated });
                                }}
                              />
                            </div>
                          )}

                          {milestone.agentNotes && (
                            <div className="bg-blue-50 rounded-lg p-3 mt-3">
                              <p className="text-sm text-blue-800">
                                <strong>Agent Notes:</strong> {milestone.agentNotes}
                              </p>
                            </div>
                          )}

                          {milestone.submittedFiles && milestone.submittedFiles.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-sm font-medium text-cool-gray-700 mb-2">Submitted Files:</h4>
                              <div className="space-y-1">
                                {milestone.submittedFiles.map((file, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <FileText className="w-4 h-4" />
                                    <span>{file}</span>
                                    <Button size="sm" variant="ghost">
                                      <Download className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Client Actions */}
                      {isClient && ['in-progress', 'completed', 'pending_approval'].includes(milestone.status) && (
                        <div className="space-y-3">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-yellow-800 font-medium">
                              {milestone.status === 'completed' 
                                ? '🎉 Milestone completed! Please review and approve.'
                                : '📋 Milestone in progress. Review progress and approve when ready.'
                              }
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => approveMilestone(index, 'approve')}
                              disabled={processingAction === `approve-${index}`}
                              className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                            >
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Approve & Pay
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => approveMilestone(index, 'reject')}
                              disabled={processingAction === `approve-${index}`}
                              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                            >
                              <ThumbsDown className="w-4 h-4 mr-2" />
                              Request Changes
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Payment Button */}
                      {isClient && milestone.status === 'approved' && (
                        <div className="mt-3">
                          <Button
                            onClick={() => makePayment(index, 'credit_card')}
                            disabled={processingAction === `payment-${index}`}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay ${milestone.amount.toLocaleString()}
                          </Button>
                        </div>
                      )}

                      {/* Payment Completed Status */}
                      {milestone.status === 'approved' && milestone.amount === 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              Payment Completed
                            </span>
                          </div>
                        </div>
                      )}

                      {milestone.clientFeedback && (
                        <div className="bg-green-50 rounded-lg p-3 mt-3">
                          <p className="text-sm text-green-800">
                            <strong>Client Feedback:</strong> {milestone.clientFeedback}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.timeline.map((entry, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-royal-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-royal-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-cool-gray-800">{entry.description}</p>
                        <p className="text-sm text-cool-gray-600">{formatDate(entry.performedAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'payments' && (
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.timeline
                    .filter(entry => entry.action === 'payment_completed')
                    .map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-green-800">
                              Payment for: {payment.data?.milestoneTitle}
                            </p>
                            <p className="text-sm text-green-600">
                              {formatDate(payment.performedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-800">
                            ${payment.data?.amount?.toLocaleString()}
                          </p>
                          <p className="text-sm text-green-600">
                            {payment.data?.paymentMethod}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Milestone Editor Modal */}
      {showMilestoneEditor && caseData && (
        <MilestoneEditor
          milestones={caseData.milestones}
          totalAmount={caseData.totalAmount}
          onSave={handleMilestoneSave}
          onCancel={() => setShowMilestoneEditor(false)}
          isLoading={milestoneEditorLoading}
        />
      )}
    </div>
  );
}

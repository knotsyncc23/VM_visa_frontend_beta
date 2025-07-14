import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/auth/auth-context';
import { api, Case, CaseMilestone, MilestoneStatus, PaymentMethod } from '../../shared/api';
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
  Pause,
  ThumbsUp,
  ThumbsDown,
  CreditCard,
  MessageSquare,
  Upload,
  MapPin,
  Activity,
  Download,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CaseDetail {
  _id: string;
  requestId: {
    _id: string;
    title: string;
    visaType: string;
    country: string;
    priority: string;
    description: string;
  };
  clientId?: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
  };
  agentId?: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
    phone?: string;
  };
  proposalId: {
    _id: string;
    budget: number;
    timeline: string;
    coverLetter: string;
    proposalText: string;
  };
  status: string;
  priority: string;
  progress: number;
  totalAmount: number;
  paidAmount: number;
  milestones: any[];
  currentMilestone: number;
  startDate: string;
  estimatedCompletionDate: string;
  actualCompletionDate?: string;
  lastActivity: string;
  clientNotes?: string;
  agentNotes?: string;
  documents: any[];
  timeline: any[];
}

export function CaseDetailPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'documents' | 'timeline'>('overview');
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (caseId) {
      fetchCaseDetail();
    }
  }, [caseId]);

  const fetchCaseDetail = async () => {
    try {
      setLoading(true);
      const data = await api.getCase(caseId!);
      setCaseDetail(data);
    } catch (error) {
      console.error('Failed to fetch case detail:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleMilestoneUpdate = async (milestoneIndex: number, status: string, agentNotes?: string) => {
    try {
      await api.updateMilestone(caseId!, milestoneIndex, { status, agentNotes });
      fetchCaseDetail(); // Refresh case data
    } catch (error) {
      console.error('Failed to update milestone:', error);
      alert('Failed to update milestone. Please try again.');
    }
  };

  const handleMilestoneApproval = async (milestoneIndex: number, clientFeedback?: string) => {
    try {
      await api.approveMilestone(caseId!, milestoneIndex, clientFeedback);
      fetchCaseDetail(); // Refresh case data
    } catch (error) {
      console.error('Failed to approve milestone:', error);
      alert('Failed to approve milestone. Please try again.');
    }
  };

  const handleSaveNote = async () => {
    if (!newNote.trim()) return;

    try {
      setSavingNote(true);
      await api.addCaseNote(caseId!, newNote);
      setNewNote('');
      fetchCaseDetail(); // Refresh case data
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setSavingNote(false);
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
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  if (!caseDetail) {
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

  const otherParty = user?.userType === 'client' ? caseDetail.agentId : caseDetail.clientId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
                {caseDetail.requestId.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={cn("text-sm", getStatusColor(caseDetail.status))}>
                  {caseDetail.status}
                </Badge>
                <div className="flex items-center gap-1 text-cool-gray-600">
                  <FileText className="w-4 h-4" />
                  {caseDetail.requestId.visaType.replace('-', ' ').toUpperCase()}
                </div>
                <div className="flex items-center gap-1 text-cool-gray-600">
                  <MapPin className="w-4 h-4" />
                  {caseDetail.requestId.country}
                </div>
                <div className="flex items-center gap-1 text-cool-gray-600">
                  <Calendar className="w-4 h-4" />
                  Started {formatDate(caseDetail.startDate)}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-cool-gray-800 mb-1">
                {caseDetail.progress}% Complete
              </div>
              <Progress value={caseDetail.progress} className="w-48" />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 border-b border-cool-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'milestones', label: 'Milestones', icon: CheckCircle },
              { id: 'documents', label: 'Documents', icon: Upload },
              { id: 'timeline', label: 'Timeline', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-royal-blue-500 text-royal-blue-600"
                    : "border-transparent text-cool-gray-600 hover:text-cool-gray-800"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Case Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Case Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-cool-gray-800 mb-2">Description</h4>
                      <p className="text-cool-gray-600">{caseDetail.requestId.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-cool-gray-800 mb-1">Total Amount</h4>
                        <p className="text-2xl font-bold text-green-600">
                          ${caseDetail.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-cool-gray-800 mb-1">Amount Paid</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          ${caseDetail.paidAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-cool-gray-800 mb-1">Estimated Completion</h4>
                      <p className="text-cool-gray-600">{formatDate(caseDetail.estimatedCompletionDate)}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Proposal Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Original Proposal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-cool-gray-800 mb-2">Cover Letter</h4>
                      <p className="text-cool-gray-600">{caseDetail.proposalId.coverLetter}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-cool-gray-800 mb-2">Proposal Details</h4>
                      <p className="text-cool-gray-600">{caseDetail.proposalId.proposalText}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-cool-gray-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Budget: ${caseDetail.proposalId.budget.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Timeline: {caseDetail.proposalId.timeline}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'milestones' && (
              <div className="space-y-4">
                {caseDetail.milestones.map((milestone, index) => (
                  <Card key={index} className={cn(
                    "border-l-4",
                    milestone.status === 'approved' ? "border-l-green-500" :
                    milestone.status === 'completed' ? "border-l-blue-500" :
                    milestone.status === 'in-progress' ? "border-l-yellow-500" :
                    milestone.isActive ? "border-l-royal-blue-500" : "border-l-gray-300"
                  )}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                        <Badge className={cn("text-xs", getStatusColor(milestone.status))}>
                          {milestone.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-cool-gray-600">{milestone.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-cool-gray-600">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${milestone.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {formatDate(milestone.dueDate)}
                        </div>
                      </div>

                      {milestone.deliverables && milestone.deliverables.length > 0 && (
                        <div>
                          <h5 className="font-medium text-cool-gray-800 mb-2">Deliverables</h5>
                          <ul className="list-disc list-inside space-y-1 text-cool-gray-600">
                            {milestone.deliverables.map((deliverable: string, idx: number) => (
                              <li key={idx}>{deliverable}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Agent Controls */}
                      {user?.userType === 'agent' && milestone.status === 'pending' && milestone.isActive && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleMilestoneUpdate(index, 'in-progress')}
                          >
                            Start Milestone
                          </Button>
                        </div>
                      )}

                      {user?.userType === 'agent' && milestone.status === 'in-progress' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleMilestoneUpdate(index, 'completed')}
                          >
                            Mark Complete
                          </Button>
                        </div>
                      )}

                      {/* Client Controls */}
                      {user?.userType === 'client' && milestone.status === 'completed' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleMilestoneApproval(index)}
                          >
                            Approve Milestone
                          </Button>
                        </div>
                      )}

                      {milestone.agentNotes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-1">Agent Notes</h5>
                          <p className="text-blue-700 text-sm">{milestone.agentNotes}</p>
                        </div>
                      )}

                      {milestone.clientFeedback && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h5 className="font-medium text-green-800 mb-1">Client Feedback</h5>
                          <p className="text-green-700 text-sm">{milestone.clientFeedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {caseDetail.documents.length === 0 ? (
                    <div className="text-center py-8">
                      <Upload className="w-12 h-12 text-cool-gray-400 mx-auto mb-2" />
                      <p className="text-cool-gray-600">No documents uploaded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {caseDetail.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-cool-gray-500" />
                            <div>
                              <p className="font-medium text-cool-gray-800">{doc.name}</p>
                              <p className="text-sm text-cool-gray-500">
                                Uploaded by {doc.uploadedBy} on {formatDate(doc.uploadedAt)}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'timeline' && (
              <Card>
                <CardHeader>
                  <CardTitle>Case Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseDetail.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-2 h-2 bg-royal-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-cool-gray-800">{event.description}</p>
                          <p className="text-sm text-cool-gray-500">{formatDate(event.performedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Other Party Info */}
            {otherParty && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user?.userType === 'client' ? 'Your Agent' : 'Client'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    {otherParty.avatar ? (
                      <img 
                        src={otherParty.avatar} 
                        alt={otherParty.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-royal-blue-100 flex items-center justify-center">
                        <span className="text-royal-blue-600 text-lg font-medium">
                          {otherParty.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-cool-gray-800">{otherParty.name}</p>
                      <p className="text-sm text-cool-gray-600">{otherParty.email}</p>
                      {user?.userType === 'client' && (caseDetail.agentId as any)?.isVerified && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Verified Agent
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display existing notes */}
                {user?.userType === 'client' && caseDetail.clientNotes && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-1">Your Notes</h5>
                    <p className="text-blue-700 text-sm">{caseDetail.clientNotes}</p>
                  </div>
                )}

                {user?.userType === 'agent' && caseDetail.agentNotes && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-1">Your Notes</h5>
                    <p className="text-green-700 text-sm">{caseDetail.agentNotes}</p>
                  </div>
                )}

                {/* Add new note */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleSaveNote}
                    disabled={!newNote.trim() || savingNote}
                    className="w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {savingNote ? 'Saving...' : 'Save Note'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                {user?.userType === 'client' && (
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Leave Review
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

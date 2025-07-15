/**
 * Shared code between client and server
 * API configuration and types
 */

import { CreateVisaRequestData } from './types';
import { MockApiService } from './mockApi';

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Client
class ApiClient {
  private baseURL: string;
  private mockApi: MockApiService;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.mockApi = MockApiService.getInstance();
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('vm-visa-auth-token');
    
    console.log('🌐 API Request:', endpoint, 'Full URL:', url, 'Token exists:', !!token);
    console.log('🌐 Environment VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('🌐 Base URL being used:', this.baseURL);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('🌐 Making fetch request to:', url);
      console.log('🌐 Fetch config:', config);
      const response = await fetch(url, config);
      console.log('🌐 Response received:', response.status, response.statusText);
      
      if (!response.ok) {
        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
          console.log('API: 401 Unauthorized - clearing auth data');
          localStorage.removeItem('vm-visa-auth-token');
          localStorage.removeItem('vm-visa-user-data');
          
          // Redirect to login if not already there
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          throw new Error('No authentication token found. Please log in again.');
        }
        
        const error = await response.json().catch(() => ({ 
          message: `HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('🌐 Response data:', result);
      return result;
    } catch (error) {
      console.error('🌐 API Request failed:', endpoint, error);
      console.error('🌐 Error type:', error.constructor.name);
      console.error('🌐 Error message:', error.message);
      console.error('🌐 Full error object:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('🌐 This is a network/CORS error. Possible causes:');
        console.error('  - Backend server is not running');
        console.error('  - CORS configuration issue');
        console.error('  - Network connectivity problem');
        console.error('  - Wrong URL being used');
        console.error('🌐 Current API URL:', this.baseURL);
      }
      
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('Login attempt with:', credentials);
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    console.log('Login response:', response);
    return response;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    console.log('Register attempt with:', userData);
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    console.log('Register response:', response);
    return response;
  }

  async logout(): Promise<void> {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  // User endpoints
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.request<{success: boolean, data: User}>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async getUserProfile(userId: string): Promise<User> {
    const response = await this.request<{success: boolean, data: {user: User}}>(`/users/profile/${userId}`);
    return response.data.user;
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    const response = await this.request<{success: boolean, data: {data: Review[]}}>(`/reviews/user/${userId}`);
    return response.data?.data || [];
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<any> {
    const response = await this.request<{success: boolean, data: any}>('/dashboard/stats');
    return response.data;
  }

  async getDashboardActivity(): Promise<any[]> {
    const response = await this.request<{success: boolean, data: any[]}>('/dashboard/activity');
    return response.data || [];
  }

  // Get notifications for recent activity
  async getNotifications(params?: { page?: number; limit?: number; isRead?: boolean }): Promise<any[]> {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
    const response = await this.request<{success: boolean, data: { notifications: any[], pagination: any }}>(`/dashboard/notifications${query}`);
    return response.data?.notifications || [];
  }

  // Get active cases/tasks for the current user
  async getActiveCases(): Promise<any[]> {
    const response = await this.request<{success: boolean, data: any[]}>('/cases/active');
    return response.data || [];
  }

  // Visa requests
  async getVisaRequests(params?: any): Promise<VisaRequest[]> {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    const response = await this.request<{success: boolean, data: {data: VisaRequest[], total: number, page: number}}>(`/visa-requests${query}`);
    return response.data?.data || [];
  }

  async createVisaRequest(data: CreateVisaRequestData): Promise<VisaRequest> {
    return this.request<VisaRequest>('/visa-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateVisaRequest(id: string, data: Partial<CreateVisaRequestData>): Promise<{success: boolean, data: VisaRequest}> {
    return this.request<{success: boolean, data: VisaRequest}>(`/visa-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Proposals
  async getProposals(params?: any): Promise<Proposal[]> {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    const response = await this.request<{success: boolean, data: {data: any[], total: number, page: number}}>(`/proposals${query}`);
    const proposals = response.data?.data || [];
    
    // Map backend response to frontend format
    return proposals.map(proposal => ({
      ...proposal,
      id: proposal._id || proposal.id,
      agentId: proposal.agentId || proposal.agent?._id,
      price: proposal.budget,
      description: proposal.proposalText,
      agentName: proposal.agent?.name,
      agentRating: proposal.agent?.rating,
      agentAvatar: proposal.agent?.avatar,
      experienceYears: proposal.agent?.experienceYears,
      successRate: proposal.agent?.successRate,
      responseTime: proposal.agent?.responseTime,
      isVerified: proposal.agent?.isVerified,
    }));
  }

  async createProposal(data: CreateProposalData): Promise<Proposal> {
    return this.request<Proposal>('/proposals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProposal(proposalId: string): Promise<Proposal> {
    return this.request<Proposal>(`/proposals/${proposalId}`);
  }

  async acceptProposal(proposalId: string): Promise<{success: boolean, data: Proposal}> {
    return this.request<{success: boolean, data: Proposal}>(`/proposals/${proposalId}/accept`, {
      method: 'PUT',
    });
  }

  async rejectProposal(proposalId: string): Promise<{success: boolean, data: Proposal}> {
    return this.request<{success: boolean, data: Proposal}>(`/proposals/${proposalId}/reject`, {
      method: 'PUT',
    });
  }

  // Messages
  async getConversations(params?: any): Promise<any[]> {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    const response = await this.request<{success: boolean, data: {data: any[], total: number}}>(`/messages/conversations${query}`);
    return response.data?.data || [];
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    const response = await this.request<{success: boolean, data: {data: Message[]}}>(`/messages/${conversationId}`);
    return response.data?.data || [];
  }

  async sendMessage(data: SendMessageData): Promise<Message> {
    const response = await this.request<{success: boolean, data: Message}>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async createConversation(data: {participantId: string, requestId?: string, proposalId?: string}): Promise<any> {
    const response = await this.request<{success: boolean, data: any}>('/messages/conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  // Escrow
  async getEscrowTransactions(): Promise<EscrowTransaction[]> {
    return this.request<EscrowTransaction[]>('/escrow');
  }

  async createEscrow(data: CreateEscrowData): Promise<EscrowTransaction> {
    return this.request<EscrowTransaction>('/escrow', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Cases
  async getCases(params?: CaseQueryParams): Promise<Case[]> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<ApiResponse<Case[]>>(`/cases${queryString}`);
    return response.data || [];
  }

  async getCase(id: string): Promise<Case> {
    console.log('🚀 API.getCase called with id:', id);
    console.log('🚀 About to make request to:', `/cases/${id}`);
    const response = await this.request<ApiResponse<Case>>(`/cases/${id}`);
    console.log('🚀 API.getCase response:', response);
    return response.data;
  }

  async updateCaseMilestones(caseId: string, milestones: CaseMilestone[]): Promise<Case> {
    const response = await this.request<ApiResponse<Case>>(`/cases/${caseId}/milestones`, {
      method: 'PUT',
      body: JSON.stringify({ milestones }),
    });
    return response.data;
  }

  async updateMilestoneStatus(caseId: string, milestoneIndex: number, status: MilestoneStatus, agentNotes?: string, submittedFiles?: string[]): Promise<Case> {
    const response = await this.request<ApiResponse<Case>>(`/cases/${caseId}/milestones/${milestoneIndex}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, agentNotes, submittedFiles }),
    });
    return response.data;
  }

  async approveMilestone(caseId: string, milestoneIndex: number, action: 'approve' | 'reject', clientFeedback?: string): Promise<Case> {
    const response = await this.request<ApiResponse<Case>>(`/cases/${caseId}/milestones/${milestoneIndex}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ action, clientFeedback }),
    });
    return response.data;
  }

  async makeMilestonePayment(caseId: string, milestoneIndex: number, paymentMethod: PaymentMethod, paymentDetails?: any): Promise<{ case: Case; payment: any }> {
    const response = await this.request<ApiResponse<{ case: Case; payment: any }>>(`/cases/${caseId}/milestones/${milestoneIndex}/payment`, {
      method: 'POST',
      body: JSON.stringify({ paymentMethod, paymentDetails }),
    });
    return response.data;
  }

  async updateCaseNotes(caseId: string, notes: string, type: 'client' | 'agent'): Promise<Case> {
    const response = await this.request<ApiResponse<Case>>(`/cases/${caseId}/notes`, {
      method: 'PUT',
      body: JSON.stringify({ notes, type }),
    });
    return response.data;
  }

  async getCaseTimeline(caseId: string): Promise<CaseTimelineResponse> {
    const response = await this.request<ApiResponse<CaseTimelineResponse>>(`/cases/${caseId}/timeline`);
    return response.data;
  }

  // Calendar endpoints
  async getCalendarEvents(params?: any): Promise<CalendarEvent[]> {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    const response = await this.request<{success: boolean, data: CalendarEvent[]}>(`/calendar${query}`);
    return response.data || [];
  }

  async createCalendarEvent(data: CreateCalendarEventData): Promise<CalendarEvent> {
    const response = await this.request<{success: boolean, data: CalendarEvent}>('/calendar', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async updateCalendarEvent(id: string, data: Partial<CreateCalendarEventData>): Promise<CalendarEvent> {
    const response = await this.request<{success: boolean, data: CalendarEvent}>(`/calendar/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async deleteCalendarEvent(id: string): Promise<void> {
    await this.request<void>(`/calendar/${id}`, {
      method: 'DELETE',
    });
  }

  async updateParticipantStatus(eventId: string, participantId: string, status: 'accepted' | 'declined' | 'tentative'): Promise<CalendarEvent> {
    const response = await this.request<{success: boolean, data: CalendarEvent}>(`/calendar/${eventId}/participants/${participantId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  // Enhanced Dashboard endpoints
  async getActiveApplications(): Promise<ActiveApplication[]> {
    const response = await this.request<{success: boolean, data: ActiveApplication[]}>('/dashboard/active-applications');
    return response.data || [];
  }

  // Token validation
  async validateToken(): Promise<boolean> {
    try {
      const token = localStorage.getItem('vm-visa-auth-token');
      if (!token) {
        return false;
      }
      
      // Try to get profile - if it fails, token is invalid
      await this.getProfile();
      return true;
    } catch (error) {
      console.log('Token validation failed:', error);
      return false;
    }
  }
}

// Create API client instance
export const api = new ApiClient(API_BASE_URL);

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'agent' | 'organization' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Notification settings
  notificationSettings?: {
    proposalUpdates: boolean;
    messageAlerts: boolean;
    deadlineReminders: boolean;
    statusUpdates: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  
  // Privacy settings
  privacySettings?: {
    profileVisibility: 'public' | 'limited' | 'private';
    showContactInfo: boolean;
    allowDirectMessages: boolean;
    shareProgressWithFamily: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: string;
  phone?: string;
  location?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface DashboardStats {
  totalRequests: number;
  activeRequests: number;
  completedRequests: number;
  cancelledRequests: number;
  activeCases: number;
  completedCases: number;
  activeProposals: number;
  completedProposals: number;
  proposalsReceived: number;
  pendingProposals: number;
  acceptedProposals: number;
  totalEarnings: number;
  monthlyStats: Array<{
    month: string;
    value: number;
  }>;
  recentActivity?: {
    visaRequests: any[];
    cases: any[];
    messages: any[];
  };
}

export interface VisaRequest {
  id: string;
  clientId: string;
  title: string;
  description: string;
  visaType: string;
  targetCountry: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  requirements: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  agentId: string;
  visaRequestId: string;
  title: string;
  description: string;
  price: number;
  timeline: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProposalData {
  requestId: string;
  budget: number;
  timeline: string;
  coverLetter: string;
  proposalText: string;
  milestones: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate: string;
    deliverables?: string[];
  }>;
  portfolio?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: 'text' | 'file' | 'system';
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

export interface SendMessageData {
  receiverId: string;
  content: string;
  messageType?: 'text' | 'file';
  attachments?: string[];
}

export interface EscrowTransaction {
  id: string;
  clientId: string;
  agentId: string;
  proposalId: string;
  amount: number;
  status: 'pending' | 'funded' | 'released' | 'disputed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface CreateEscrowData {
  proposalId: string;
  amount: number;
}

export interface Review {
  id: string;
  reviewer: User;
  reviewee: string;
  relatedTo: {
    type: 'visa_request' | 'proposal' | 'service';
    id: string;
  };
  rating: number;
  title: string;
  comment: string;
  aspects: {
    communication: number;
    expertise: number;
    timeliness: number;
    professionalism: number;
    value: number;
  };
  isVerified: boolean;
  isPublic: boolean;
  response?: {
    comment: string;
    date: string;
  };
  helpfulVotes: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface Case {
  _id: string;
  requestId: {
    _id: string;
    title: string;
    visaType: string;
    country: string;
    priority?: string;
  };
  proposalId: string;
  clientId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  agentId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
  };
  status: 'active' | 'on-hold' | 'completed' | 'cancelled' | 'disputed';
  priority?: string;
  progress: number;
  totalAmount: number;
  paidAmount: number;
  milestones: CaseMilestone[];
  timeline: CaseTimelineEntry[];
  startDate: string;
  estimatedCompletionDate: string;
  lastActivity: string;
  clientNotes?: string;
  agentNotes?: string;
  tags?: string[];
  metadata?: any;
}

export interface CaseMilestone {
  _id?: string;
  title: string;
  description: string;
  amount: number;
  order: number;
  status: MilestoneStatus;
  isActive: boolean;
  dueDate: string;
  startedAt?: string;
  completedAt?: string;
  approvedAt?: string;
  deliverables: string[];
  submittedFiles: string[];
  clientFeedback?: string;
  agentNotes?: string;
}

export type MilestoneStatus = 'pending' | 'in-progress' | 'completed' | 'approved' | 'rejected';

export interface CaseTimelineEntry {
  _id?: string;
  action: string;
  description: string;
  performedBy: string;
  performedAt: string;
  data?: any;
}

export interface CaseTimelineResponse {
  case: Case;
  timeline: CaseTimelineEntry[];
  payments: PaymentRecord[];
  paymentSummary: {
    totalPaid: number;
    totalAmount: number;
    remainingAmount: number;
    paymentsCount: number;
    lastPaymentDate?: string;
  };
}

export interface PaymentRecord {
  paymentId: string;
  amount: number;
  milestoneTitle: string;
  milestoneIndex: number;
  paymentMethod: PaymentMethod;
  processedAt: string;
  status: 'completed' | 'pending' | 'failed';
}

export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'paypal' | 'crypto';

export interface CaseQueryParams {
  page?: string;
  limit?: string;
  status?: string;
  agentId?: string;
  clientId?: string;
  sort?: string;
  order?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'consultation' | 'document-review' | 'follow-up' | 'deadline' | 'other';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  organizer: User;
  participants: Array<{
    user: User;
    status: 'invited' | 'accepted' | 'declined' | 'tentative';
    notified: boolean;
  }>;
  location: {
    type: 'video-call' | 'phone' | 'in-person' | 'online';
    details?: string;
  };
  relatedTo?: {
    type: 'case' | 'proposal' | 'visa-request' | 'general';
    id: string;
  };
  reminderSettings: {
    enabled: boolean;
    intervals: Array<'15min' | '30min' | '1hour' | '2hours' | '1day' | '1week'>;
  };
  recurring: {
    enabled: boolean;
    pattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    endDate?: string;
    exceptions?: string[];
  };
  meetingLink?: string;
  agenda?: Array<{
    item: string;
    duration: number;
    completed: boolean;
  }>;
  notes?: string;
  attachments?: string[];
  isPrivate: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCalendarEventData {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type?: 'consultation' | 'document-review' | 'follow-up' | 'deadline' | 'other';
  participants?: Array<{
    user: string;
    status?: 'invited' | 'accepted' | 'declined' | 'tentative';
  }>;
  location?: {
    type: 'video-call' | 'phone' | 'in-person' | 'online';
    details?: string;
  };
  relatedTo?: {
    type: 'case' | 'proposal' | 'visa-request' | 'general';
    id: string;
  };
  reminderSettings?: {
    enabled: boolean;
    intervals: Array<'15min' | '30min' | '1hour' | '2hours' | '1day' | '1week'>;
  };
  recurring?: {
    enabled: boolean;
    pattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    endDate?: string;
    exceptions?: string[];
  };
  meetingLink?: string;
  agenda?: Array<{
    item: string;
    duration: number;
    completed?: boolean;
  }>;
  notes?: string;
  attachments?: string[];
  isPrivate?: boolean;
  color?: string;
}

export interface ActiveApplication {
  id: string;
  title: string;
  agent?: string;
  client?: string;
  status: string;
  progress: number;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  type: 'case' | 'proposal' | 'visa-request';
}

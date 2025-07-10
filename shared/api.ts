/**
 * Shared code between client and server
 * API configuration and types
 */

import { CreateVisaRequestData } from './types';

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('vm-visa-auth-token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
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
    return this.request<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
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
    const response = await this.request<{success: boolean, data: {data: Proposal[], total: number, page: number}}>(`/proposals${query}`);
    return response.data?.data || [];
  }

  async createProposal(data: CreateProposalData): Promise<Proposal> {
    return this.request<Proposal>('/proposals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
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
  activeProposals: number;
  completedCases: number;
  totalEarnings: number;
  monthlyStats: Array<{
    month: string;
    value: number;
  }>;
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

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

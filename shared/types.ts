/**
 * Shared types between client and server
 */

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'client' | 'agent' | 'organization' | 'admin';
  avatar?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VisaRequest {
  id: string;
  userId: string;
  title: string;
  visaType: string;
  country: string;
  description: string;
  budget: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected' | 'cancelled';
  proposalCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  requestId: string;
  agentId: string;
  agentName: string;
  agentAvatar?: string;
  agentRating: number;
  budget: number;
  timeline: string;
  coverLetter: string;
  proposalText: string;
  experienceYears: number;
  successRate: number;
  responseTime: string;
  portfolio: string[];
  isVerified: boolean;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Document {
  id: string;
  userId: string;
  requestId?: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface EscrowTransaction {
  id: string;
  requestId: string;
  clientId: string;
  agentId: string;
  amount: number;
  status: 'pending' | 'deposited' | 'released' | 'disputed' | 'refunded';
  milestones: EscrowMilestone[];
  createdAt: string;
  updatedAt: string;
}

export interface EscrowMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'in-progress' | 'completed' | 'approved';
  dueDate: string;
  completedAt?: string;
}

export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Request types
export interface CreateVisaRequestData {
  title: string;
  visaType: string;
  country: string;
  description: string;
  budget: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface CreateProposalData {
  requestId: string;
  budget: number;
  timeline: string;
  coverLetter: string;
  proposalText: string;
  portfolio: string[];
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
}

export interface CreateMessageData {
  receiverId: string;
  content: string;
  attachments?: string[];
}

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
  
  // Client-specific fields
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  passportNumber?: string;
  visaHistory?: string;
  preferredCountries?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  // Agent-specific fields
  title?: string;
  specializations?: string[];
  experienceYears?: number;
  successRate?: number;
  rating?: number;
  responseTime?: string;
  bio?: string;
  location?: string;
  website?: string;
  languages?: string[];
  certifications?: string[];
  hourlyRate?: number;
  portfolio?: string[];
  portfolioItems?: string[];
  licenseNumber?: string;
  availability?: string;
  businessHours?: {
    start: string;
    end: string;
    timezone: string;
  };
  rates?: {
    consultation: number;
    minimum: number;
  };
  acceptsUrgentCases?: boolean;
  
  // Organization-specific fields
  organizationName?: string;
  organizationType?: string;
  registrationNumber?: string;
  establishedYear?: number;
  teamSize?: number;
  services?: string[];
  clientTestimonials?: any[];
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
  _id?: string; // Backend compatibility
  requestId: string;
  agentId: string;
  budget: number;
  timeline: string;
  coverLetter: string;
  proposalText: string;
  milestones?: any[];
  portfolio: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string;
  respondedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  
  // Populated fields from virtuals
  agent?: {
    _id: string;
    name: string;
    email: string;
    title?: string;
    rating?: number;
    avatar?: string;
    specializations?: string[];
    experienceYears?: number;
    successRate?: number;
    responseTime?: string;
    isVerified?: boolean;
    bio?: string;
    location?: string;
    phone?: string;
  };
  
  // Legacy properties for backward compatibility
  agentName?: string;
  agentAvatar?: string;
  agentRating?: number;
  experienceYears?: number;
  successRate?: number;
  responseTime?: string;
  isVerified?: boolean;
  
  // Computed properties
  price?: number; // Alias for budget
  description?: string; // Alias for proposalText
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

export interface Milestone {
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  deliverables?: string[];
}

export interface CreateProposalData {
  requestId: string;
  budget: number;
  timeline: string;
  coverLetter: string;
  proposalText: string;
  milestones?: Milestone[];
  portfolio?: string[];
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

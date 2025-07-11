// Mock API service for frontend-only functionality
export class MockApiService {
  private static instance: MockApiService;
  
  static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService();
    }
    return MockApiService.instance;
  }

  // Mock authentication
  async login(credentials: any) {
    await this.delay(1000);
    
    // Mock successful login
    const mockUser = {
      id: '1',
      email: credentials.email,
      name: 'Mock User',
      userType: 'client',
      isVerified: true
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    return {
      success: true,
      data: {
        user: mockUser,
        token: mockToken
      }
    };
  }

  async register(userData: any) {
    await this.delay(1500);
    
    // Mock successful registration
    const mockUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.organizationName || userData.name,
      userType: userData.userType || 'client',
      isVerified: false
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    return {
      success: true,
      data: {
        user: mockUser,
        token: mockToken
      }
    };
  }

  // Mock proposal actions
  async acceptProposal(proposalId: string) {
    await this.delay(800);
    
    return {
      success: true,
      data: {
        id: proposalId,
        status: 'accepted',
        message: 'Proposal accepted successfully'
      }
    };
  }

  async rejectProposal(proposalId: string) {
    await this.delay(800);
    
    return {
      success: true,
      data: {
        id: proposalId,
        status: 'rejected',
        message: 'Proposal rejected successfully'
      }
    };
  }

  // Mock conversation creation
  async createConversation(data: any) {
    await this.delay(600);
    
    return {
      success: true,
      data: {
        id: 'conv-' + Date.now(),
        participantId: data.participantId,
        requestId: data.requestId,
        proposalId: data.proposalId,
        createdAt: new Date().toISOString()
      }
    };
  }

  // Mock visa requests
  async getVisaRequests() {
    await this.delay(1000);
    
    return {
      success: true,
      data: [
        {
          id: '1',
          title: 'Canada Express Entry',
          status: 'active',
          type: 'Skilled Worker',
          country: 'Canada',
          budget: 5000,
          deadline: '2025-03-15',
          description: 'Seeking assistance with Express Entry application for permanent residence in Canada.',
          createdAt: '2024-12-01',
          proposalCount: 12
        },
        {
          id: '2',
          title: 'UK Student Visa',
          status: 'pending',
          type: 'Student',
          country: 'United Kingdom',
          budget: 2500,
          deadline: '2025-02-20',
          description: 'Need help with Tier 4 student visa application for masters degree.',
          createdAt: '2024-12-10',
          proposalCount: 8
        }
      ]
    };
  }

  // Mock proposals
  async getProposals(requestId: string) {
    await this.delay(800);
    
    return {
      success: true,
      data: [
        {
          id: '6870b249db302ea265acfca1',
          agentId: 'agent-1',
          agentName: 'Sarah Wilson',
          experience: '8 years',
          rating: 4.9,
          budget: 4500,
          timeline: '3-4 months',
          coverLetter: 'I have extensive experience with Canadian immigration...',
          status: 'pending',
          agent: {
            name: 'Sarah Wilson',
            rating: 4.9,
            avatar: '/avatars/sarah.jpg'
          }
        },
        {
          id: '6870b249db302ea265acfca2',
          agentId: 'agent-2',
          agentName: 'Michael Chen',
          experience: '12 years',
          rating: 4.8,
          budget: 5200,
          timeline: '2-3 months',
          coverLetter: 'With over a decade of experience in Canadian immigration...',
          status: 'pending',
          agent: {
            name: 'Michael Chen',
            rating: 4.8,
            avatar: '/avatars/michael.jpg'
          }
        }
      ]
    };
  }

  // Mock documents
  async getDocuments() {
    await this.delay(600);
    
    return {
      success: true,
      data: [
        {
          id: '1',
          name: 'passport.pdf',
          type: 'pdf',
          size: 2048576,
          category: 'personal',
          uploadDate: new Date(),
          status: 'approved'
        },
        {
          id: '2',
          name: 'degree_certificate.pdf',
          type: 'pdf',
          size: 1536000,
          category: 'education',
          uploadDate: new Date(),
          status: 'pending'
        }
      ]
    };
  }

  // Mock messages
  async getMessages() {
    await this.delay(500);
    
    return {
      success: true,
      data: [
        {
          id: '1',
          sender: 'agent',
          senderName: 'Sarah Wilson',
          message: 'Hello! I reviewed your application and have some questions.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          conversationId: 'conv-1'
        },
        {
          id: '2',
          sender: 'client',
          senderName: 'You',
          message: 'Hi Sarah, please let me know what additional information you need.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          conversationId: 'conv-1'
        }
      ]
    };
  }

  // Mock user profile
  async getUserProfile() {
    await this.delay(400);
    
    return {
      success: true,
      data: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        userType: 'client',
        avatar: '/avatars/default.jpg',
        phone: '+1 (555) 123-4567',
        country: 'United States',
        isVerified: true,
        createdAt: '2024-11-01'
      }
    };
  }

  // Mock case management
  async getCases() {
    await this.delay(800);
    
    return [
      {
        _id: 'case-001',
        requestId: {
          _id: 'req-001',
          title: 'Student Visa for Canada',
          visaType: 'student-visa',
          country: 'Canada',
          priority: 'high'
        },
        agentId: {
          _id: 'agent-001',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          avatar: '/placeholder.svg',
          isVerified: true
        },
        status: 'active',
        priority: 'high',
        progress: 65,
        totalAmount: 3500,
        paidAmount: 2000,
        milestones: [
          {
            title: 'Document Review',
            description: 'Review and verify all submitted documents',
            amount: 500,
            status: 'approved',
            dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            title: 'Application Submission',
            description: 'Submit visa application to immigration office',
            amount: 1500,
            status: 'in-progress',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true
          },
          {
            title: 'Interview Preparation',
            description: 'Prepare for visa interview',
            amount: 800,
            status: 'pending',
            dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString()
          }
        ],
        currentMilestone: 2,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedCompletionDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  async getCase(caseId: string) {
    await this.delay(600);
    
    return {
      _id: caseId,
      requestId: {
        _id: 'req-001',
        title: 'Student Visa for Canada',
        visaType: 'student-visa',
        country: 'Canada',
        priority: 'high',
        description: 'Applying for a student visa to pursue Masters in Computer Science at University of Toronto.'
      },
      agentId: {
        _id: 'agent-001',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: '/placeholder.svg',
        isVerified: true,
        phone: '+1-555-0123'
      },
      proposalId: {
        _id: 'proposal-001',
        budget: 3500,
        timeline: '2-3-months',
        coverLetter: 'I have extensive experience with Canadian student visas...',
        proposalText: 'Comprehensive visa application service including document review, application preparation, and interview coaching.'
      },
      status: 'active',
      priority: 'high',
      progress: 65,
      totalAmount: 3500,
      paidAmount: 2000,
      milestones: [
        {
          title: 'Document Review',
          description: 'Review and verify all submitted documents',
          amount: 500,
          status: 'approved',
          dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          deliverables: ['Document checklist', 'Verification report'],
          agentNotes: 'All documents reviewed and verified successfully.'
        },
        {
          title: 'Application Submission',
          description: 'Submit visa application to immigration office',
          amount: 1500,
          status: 'in-progress',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          deliverables: ['Completed application form', 'Submission receipt']
        },
        {
          title: 'Interview Preparation',
          description: 'Prepare for visa interview',
          amount: 800,
          status: 'pending',
          dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          deliverables: ['Interview guide', 'Mock interview session']
        }
      ],
      currentMilestone: 2,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedCompletionDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      clientNotes: 'Very pleased with the progress so far.',
      agentNotes: 'Client is very responsive and has provided all required documents.',
      documents: [
        {
          name: 'Passport Copy',
          url: '/documents/passport.pdf',
          type: 'passport',
          uploadedBy: 'client-001',
          uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      timeline: [
        {
          action: 'case_created',
          description: 'Case created from accepted proposal',
          performedBy: 'system',
          performedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          action: 'milestone_completed',
          description: 'Document Review milestone completed',
          performedBy: 'agent-001',
          performedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    };
  }

  async updateMilestone(caseId: string, milestoneIndex: number, data: any) {
    await this.delay(500);
    
    return {
      success: true,
      data: { message: 'Milestone updated successfully' }
    };
  }

  async approveMilestone(caseId: string, milestoneIndex: number, clientFeedback?: string) {
    await this.delay(500);
    
    return {
      success: true,
      data: { message: 'Milestone approved successfully' }
    };
  }

  async addCaseNote(caseId: string, note: string) {
    await this.delay(400);
    
    return {
      success: true,
      data: { message: 'Note added successfully' }
    };
  }

  async uploadCaseDocument(caseId: string, documentData: any) {
    await this.delay(800);
    
    return {
      success: true,
      data: { message: 'Document uploaded successfully' }
    };
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockApi = MockApiService.getInstance();

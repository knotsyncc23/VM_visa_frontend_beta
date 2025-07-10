export interface EscrowTransaction {
  id: string;
  projectId: string;
  clientId: string;
  agentId: string;
  organizationId?: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: EscrowStatus;
  paymentIntentId?: string;
  stripeAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  releasedAt?: Date;
  disputedAt?: Date;
  timeline: EscrowTimelineEvent[];
  milestones?: EscrowMilestone[];
}

export type EscrowStatus =
  | "unfunded"
  | "pending_deposit"
  | "funded"
  | "in_progress"
  | "completed"
  | "dispute"
  | "released"
  | "refunded"
  | "cancelled";

export interface EscrowTimelineEvent {
  id: string;
  type:
    | "created"
    | "funded"
    | "started"
    | "completed"
    | "released"
    | "disputed"
    | "resolved";
  description: string;
  timestamp: Date;
  userId: string;
  userRole: "client" | "agent" | "organization" | "admin";
}

export interface EscrowMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: "pending" | "completed" | "released";
  dueDate?: Date;
  completedAt?: Date;
  releasedAt?: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  agentId?: string;
  organizationId?: string;
  status: "open" | "in_progress" | "completed" | "cancelled";
  budget: number;
  proposals: Proposal[];
  escrow?: EscrowTransaction;
  createdAt: Date;
  updatedAt: Date;
}

export interface Proposal {
  id: string;
  projectId: string;
  agentId: string;
  organizationId?: string;
  title: string;
  description: string;
  amount: number;
  timeline: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

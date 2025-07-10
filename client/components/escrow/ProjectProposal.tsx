import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Clock,
  DollarSign,
  CheckCircle,
  X,
  Shield,
  Star,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Proposal, Project } from "@/types/escrow";
import { DepositEscrowModal } from "./DepositEscrowModal";

interface ProjectProposalProps {
  proposal: Proposal;
  project: Project;
  userRole: "client" | "agent" | "organization";
  onAccept?: (proposalId: string) => Promise<void>;
  onReject?: (proposalId: string) => Promise<void>;
  onDepositFunds?: (amount: number, paymentMethod: string) => Promise<void>;
  className?: string;
}

export const ProjectProposal: React.FC<ProjectProposalProps> = ({
  proposal,
  project,
  userRole,
  onAccept,
  onReject,
  onDepositFunds,
  className,
}) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    if (onAccept) {
      setIsLoading(true);
      try {
        await onAccept(proposal.id);
        // After accepting, show deposit modal
        setShowDepositModal(true);
      } catch (error) {
        console.error("Failed to accept proposal:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReject = async () => {
    if (onReject) {
      setIsLoading(true);
      try {
        await onReject(proposal.id);
      } catch (error) {
        console.error("Failed to reject proposal:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusBadge = () => {
    switch (proposal.status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700">
            <X className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const canAcceptReject = () => {
    return (
      userRole === "client" &&
      proposal.status === "pending" &&
      onAccept &&
      onReject
    );
  };

  const showDepositButton = () => {
    return (
      userRole === "client" &&
      proposal.status === "accepted" &&
      !project.escrow &&
      onDepositFunds
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {proposal.title}
              </h3>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {proposal.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              ${proposal.amount.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              + ${(proposal.amount * 0.1).toFixed(2)} platform fee
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Agent:</span>
            <span className="font-medium">{proposal.agentId}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Timeline:</span>
            <span>{proposal.timeline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Submitted:</span>
            <span>{proposal.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Rating:</span>
            <span>4.8/5 (24 reviews)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {canAcceptReject() && (
            <>
              <Button
                onClick={handleAccept}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept Proposal
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          )}

          {showDepositButton() && (
            <Button
              onClick={() => setShowDepositModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Fund Escrow
            </Button>
          )}

          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message Agent
          </Button>

          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            View Profile
          </Button>
        </div>

        {/* Escrow Info */}
        {proposal.status === "accepted" && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Escrow Protection Available
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Your payment will be held securely until the work is completed to
              your satisfaction. Only release funds when you're completely happy
              with the delivered service.
            </p>
          </div>
        )}
      </motion.div>

      {/* Deposit Modal */}
      {showDepositModal && onDepositFunds && (
        <DepositEscrowModal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
          proposal={proposal}
          onDeposit={onDepositFunds}
        />
      )}
    </>
  );
};

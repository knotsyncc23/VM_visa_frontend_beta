import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react";
import { Project, EscrowTransaction } from "@/types/escrow";
import { EscrowStatusBadge } from "./EscrowStatusBadge";
import { DepositEscrowModal } from "./DepositEscrowModal";
import { ReleaseFundsModal } from "./ReleaseFundsModal";

interface EscrowCardProps {
  project: Project;
  userRole: "client" | "agent" | "organization";
  onMarkComplete?: (projectId: string) => Promise<void>;
  onDepositFunds?: (amount: number, paymentMethod: string) => Promise<void>;
  onReleaseFunds?: (rating: number, feedback: string) => Promise<void>;
  onOpenDispute?: (projectId: string) => void;
  className?: string;
}

export const EscrowCard: React.FC<EscrowCardProps> = ({
  project,
  userRole,
  onMarkComplete,
  onDepositFunds,
  onReleaseFunds,
  onOpenDispute,
  className,
}) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);

  const escrow = project.escrow;
  const acceptedProposal = project.proposals.find(
    (p) => p.status === "accepted",
  );

  const getTimelineProgress = () => {
    if (!escrow) return 0;
    switch (escrow.status) {
      case "unfunded":
      case "pending_deposit":
        return 25;
      case "funded":
        return 50;
      case "in_progress":
        return 75;
      case "completed":
        return 90;
      case "released":
        return 100;
      default:
        return 0;
    }
  };

  const canMarkComplete = () => {
    return (
      userRole === "agent" && escrow?.status === "in_progress" && onMarkComplete
    );
  };

  const canReleaseFunds = () => {
    return (
      userRole === "client" && escrow?.status === "completed" && onReleaseFunds
    );
  };

  const canDepositFunds = () => {
    return (
      userRole === "client" &&
      acceptedProposal &&
      (!escrow || escrow.status === "unfunded") &&
      onDepositFunds
    );
  };

  const handleMarkComplete = async () => {
    if (onMarkComplete) {
      await onMarkComplete(project.id);
    }
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {project.description}
            </p>
            {escrow && <EscrowStatusBadge status={escrow.status} />}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              $
              {acceptedProposal?.amount.toFixed(2) || project.budget.toFixed(2)}
            </p>
            {escrow && (
              <p className="text-xs text-gray-500">
                + ${escrow.platformFee.toFixed(2)} fee
              </p>
            )}
          </div>
        </div>

        {/* Progress Timeline */}
        {escrow && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-500">
                {getTimelineProgress()}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getTimelineProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Unfunded</span>
              <span>Funded</span>
              <span>In Progress</span>
              <span>Completed</span>
              <span>Released</span>
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              {userRole === "client" ? "Agent" : "Client"}:
            </span>
            <span className="font-medium">
              {userRole === "client" ? "Agent Name" : "Client Name"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Created:</span>
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          {acceptedProposal && (
            <div className="flex items-center space-x-2 col-span-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Timeline:</span>
              <span>{acceptedProposal.timeline}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {canDepositFunds() && (
            <Button
              onClick={() => setShowDepositModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Shield className="w-4 h-4" />
              <span>Deposit to Escrow</span>
            </Button>
          )}

          {canMarkComplete() && (
            <Button
              onClick={handleMarkComplete}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Complete</span>
            </Button>
          )}

          {canReleaseFunds() && (
            <Button
              onClick={() => setShowReleaseModal(true)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <DollarSign className="w-4 h-4" />
              <span>Release Funds</span>
            </Button>
          )}

          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>

          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>

          {escrow?.status === "dispute" && (
            <Button
              variant="outline"
              size="sm"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Resolve Dispute
            </Button>
          )}
        </div>

        {/* Dispute Warning */}
        {escrow?.status === "dispute" && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                Dispute in Progress
              </span>
            </div>
            <p className="text-xs text-red-700 mt-1">
              A dispute has been raised for this project. Platform admin will
              review and resolve the issue.
            </p>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      {showDepositModal && acceptedProposal && onDepositFunds && (
        <DepositEscrowModal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
          proposal={acceptedProposal}
          onDeposit={onDepositFunds}
        />
      )}

      {showReleaseModal && escrow && onReleaseFunds && (
        <ReleaseFundsModal
          isOpen={showReleaseModal}
          onClose={() => setShowReleaseModal(false)}
          escrow={escrow}
          onRelease={onReleaseFunds}
        />
      )}
    </>
  );
};

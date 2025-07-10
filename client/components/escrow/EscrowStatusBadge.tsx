import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  DollarSign,
} from "lucide-react";
import { EscrowStatus } from "@/types/escrow";

interface EscrowStatusBadgeProps {
  status: EscrowStatus;
  className?: string;
}

export const EscrowStatusBadge: React.FC<EscrowStatusBadgeProps> = ({
  status,
  className,
}) => {
  const getStatusConfig = (status: EscrowStatus) => {
    switch (status) {
      case "unfunded":
        return {
          label: "Unfunded",
          icon: XCircle,
          className: "bg-gray-100 text-gray-700 border-gray-300",
        };
      case "pending_deposit":
        return {
          label: "Pending Deposit",
          icon: Clock,
          className: "bg-yellow-100 text-yellow-700 border-yellow-300",
        };
      case "funded":
        return {
          label: "Funded",
          icon: Shield,
          className: "bg-blue-100 text-blue-700 border-blue-300",
        };
      case "in_progress":
        return {
          label: "In Progress",
          icon: Clock,
          className: "bg-orange-100 text-orange-700 border-orange-300",
        };
      case "completed":
        return {
          label: "Completed",
          icon: CheckCircle,
          className: "bg-green-100 text-green-700 border-green-300",
        };
      case "dispute":
        return {
          label: "Dispute",
          icon: AlertTriangle,
          className: "bg-red-100 text-red-700 border-red-300",
        };
      case "released":
        return {
          label: "Released",
          icon: DollarSign,
          className: "bg-emerald-100 text-emerald-700 border-emerald-300",
        };
      case "refunded":
        return {
          label: "Refunded",
          icon: XCircle,
          className: "bg-purple-100 text-purple-700 border-purple-300",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          icon: XCircle,
          className: "bg-gray-100 text-gray-700 border-gray-300",
        };
      default:
        return {
          label: "Unknown",
          icon: XCircle,
          className: "bg-gray-100 text-gray-700 border-gray-300",
        };
    }
  };

  const {
    label,
    icon: Icon,
    className: badgeClassName,
  } = getStatusConfig(status);

  return (
    <Badge
      className={`${badgeClassName} ${className} flex items-center space-x-1`}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </Badge>
  );
};

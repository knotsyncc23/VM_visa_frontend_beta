import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Shield,
  DollarSign,
  AlertTriangle,
  User,
} from "lucide-react";
import { EscrowTimelineEvent } from "@/types/escrow";

interface EscrowTimelineProps {
  events: EscrowTimelineEvent[];
  className?: string;
}

export const EscrowTimeline: React.FC<EscrowTimelineProps> = ({
  events,
  className,
}) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "created":
        return <User className="w-4 h-4" />;
      case "funded":
        return <Shield className="w-4 h-4" />;
      case "started":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "released":
        return <DollarSign className="w-4 h-4" />;
      case "disputed":
        return <AlertTriangle className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "created":
        return "bg-gray-500";
      case "funded":
        return "bg-blue-500";
      case "started":
        return "bg-orange-500";
      case "completed":
        return "bg-green-500";
      case "released":
        return "bg-emerald-500";
      case "disputed":
        return "bg-red-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUserRoleLabel = (role: string) => {
    switch (role) {
      case "client":
        return "Client";
      case "agent":
        return "Agent";
      case "organization":
        return "Organization";
      case "admin":
        return "Platform Admin";
      default:
        return "System";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Escrow Timeline
      </h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div
              className={`w-8 h-8 rounded-full ${getEventColor(
                event.type,
              )} flex items-center justify-center text-white flex-shrink-0`}
            >
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {event.description}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                by {getUserRoleLabel(event.userRole)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

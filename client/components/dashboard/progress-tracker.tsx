import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  MessageCircle,
  Calendar,
  Star,
} from "lucide-react";
import { Case } from "@shared/api";

type ProgressTrackerProps = {
  cases: Case[];
};

export function ProgressTracker({ cases }: ProgressTrackerProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          Track Progress
        </h1>
        <p className="text-lg text-cool-gray-600">
          Monitor your visa application progress in real-time
        </p>
      </motion.div>

      {/* Applications */}
      {cases.map((caseItem, index) => {
        // Calculate progress
        const totalMilestones = caseItem.milestones.length;
        const completedMilestones = caseItem.milestones.filter(m => m.status === 'approved' || m.status === 'completed').length;
        const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
        // Find current and next milestones
        const currentMilestone = caseItem.milestones.find(m => m.isActive) || caseItem.milestones.find(m => m.status === 'in-progress');
        const nextMilestone = caseItem.milestones.find(m => m.status === 'pending');
        // Build timeline from milestones
        const timeline = caseItem.milestones.map(m => ({
          step: m.title,
          status: m.status === 'approved' || m.status === 'completed' ? 'completed' : m.isActive || m.status === 'in-progress' ? 'current' : 'pending',
          date: m.completedAt || m.dueDate || '',
        }));
        return (
          <motion.div
            key={caseItem._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="glass-card p-8 rounded-3xl"
          >
            {/* Application Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-cool-gray-800 mb-2">
                  {caseItem.requestId?.title || 'Untitled Case'}
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-cool-gray-600">Agent: {caseItem.agentId?.name || 'N/A'}</span>
                  <Badge className="bg-blue-100 text-blue-700">
                    {caseItem.priority || 'medium'} priority
                  </Badge>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 text-right">
                <div className="text-2xl font-bold text-royal-blue-600">
                  {progress}%
                </div>
                <div className="text-sm text-cool-gray-600">Complete</div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-cool-gray-700">
                  Current: {currentMilestone?.title || 'N/A'}
                </span>
                <span className="text-sm text-cool-gray-600">
                  Next: {nextMilestone?.title || 'N/A'}
                </span>
              </div>
              <div className="w-full bg-cool-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-royal h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-cool-gray-600">Started: {caseItem.startDate ? new Date(caseItem.startDate).toLocaleDateString() : 'N/A'}</span>
                <span className="text-xs text-cool-gray-600">
                  Due: {caseItem.estimatedCompletionDate ? new Date(caseItem.estimatedCompletionDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
            {/* Timeline */}
            <div className="relative">
              <h3 className="text-lg font-heading font-bold text-cool-gray-800 mb-6">
                Application Timeline
              </h3>
              <div className="space-y-6">
                {timeline.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start space-x-4">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === "completed"
                            ? "bg-sage-green-500"
                            : step.status === "current"
                              ? "bg-royal-blue-500"
                              : "bg-cool-gray-300"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : step.status === "current" ? (
                          <Clock className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      {stepIndex < timeline.length - 1 && (
                        <div
                          className={`absolute top-10 left-5 w-0.5 h-8 ${
                            step.status === "completed"
                              ? "bg-sage-green-300"
                              : "bg-cool-gray-300"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-semibold ${
                            step.status === "current"
                              ? "text-royal-blue-700"
                              : "text-cool-gray-800"
                          }`}
                        >
                          {step.step}
                        </h4>
                        <span className="text-sm text-cool-gray-600">
                          {step.date ? new Date(step.date).toLocaleDateString() : ''}
                        </span>
                      </div>
                      {step.status === "current" && (
                        <p className="text-sm text-cool-gray-600 mt-1">
                          Currently in progress...
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

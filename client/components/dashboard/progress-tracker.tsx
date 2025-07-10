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

export function ProgressTracker() {
  const applications = [
    {
      id: 1,
      title: "Canada Permanent Residence",
      agent: "Sarah Chen",
      status: "Documents Review",
      progress: 75,
      currentStep: "Document Verification",
      nextStep: "Application Submission",
      dueDate: "Dec 15, 2024",
      priority: "high",
      timeline: [
        { step: "Initial Consultation", status: "completed", date: "Nov 1" },
        { step: "Document Collection", status: "completed", date: "Nov 10" },
        {
          step: "Application Preparation",
          status: "completed",
          date: "Nov 20",
        },
        { step: "Document Review", status: "current", date: "Dec 5" },
        { step: "Application Submission", status: "pending", date: "Dec 15" },
        { step: "Government Processing", status: "pending", date: "TBD" },
      ],
    },
    {
      id: 2,
      title: "UK Student Visa",
      agent: "James Wilson",
      status: "Application Submitted",
      progress: 90,
      currentStep: "Government Processing",
      nextStep: "Decision",
      dueDate: "Jan 10, 2025",
      priority: "medium",
      timeline: [
        { step: "University Application", status: "completed", date: "Oct 1" },
        { step: "CAS Received", status: "completed", date: "Oct 15" },
        { step: "Visa Application", status: "completed", date: "Nov 1" },
        { step: "Biometrics", status: "completed", date: "Nov 5" },
        { step: "Processing", status: "current", date: "Nov 10" },
        { step: "Decision", status: "pending", date: "Jan 10" },
      ],
    },
  ];

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
      {applications.map((app, index) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          className="glass-card p-8 rounded-3xl"
        >
          {/* Application Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-cool-gray-800 mb-2">
                {app.title}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-cool-gray-600">Agent: {app.agent}</span>
                <Badge
                  className={
                    app.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {app.priority} priority
                </Badge>
              </div>
            </div>

            <div className="mt-4 lg:mt-0 text-right">
              <div className="text-2xl font-bold text-royal-blue-600">
                {app.progress}%
              </div>
              <div className="text-sm text-cool-gray-600">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-cool-gray-700">
                Current: {app.currentStep}
              </span>
              <span className="text-sm text-cool-gray-600">
                Next: {app.nextStep}
              </span>
            </div>
            <div className="w-full bg-cool-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-royal h-3 rounded-full transition-all duration-500"
                style={{ width: `${app.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-cool-gray-600">Started</span>
              <span className="text-xs text-cool-gray-600">
                Due: {app.dueDate}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <h3 className="text-lg font-heading font-bold text-cool-gray-800 mb-6">
              Application Timeline
            </h3>

            <div className="space-y-6">
              {app.timeline.map((step, stepIndex) => (
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
                    {stepIndex < app.timeline.length - 1 && (
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
                        {step.date}
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-cool-gray-200">
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Agent
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Update Call
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View Application
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

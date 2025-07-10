import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  X,
  DollarSign,
  Star,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { EscrowTransaction } from "@/types/escrow";

interface ReleaseFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrow: EscrowTransaction;
  onRelease: (rating: number, feedback: string) => Promise<void>;
}

export const ReleaseFundsModal: React.FC<ReleaseFundsModalProps> = ({
  isOpen,
  onClose,
  escrow,
  onRelease,
}) => {
  const [step, setStep] = useState<
    "review" | "rating" | "processing" | "success"
  >("review");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === "review") {
      setStep("rating");
    }
  };

  const handleRelease = async () => {
    setIsLoading(true);
    setStep("processing");

    try {
      await onRelease(rating, feedback);
      setStep("success");
    } catch (error) {
      console.error("Release failed:", error);
      setIsLoading(false);
      setStep("rating");
    }
  };

  const handleClose = () => {
    setStep("review");
    setRating(5);
    setFeedback("");
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Release Funds</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Ready to Release Funds?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    You're about to release the escrowed funds to the service
                    provider. Please confirm the work has been completed
                    satisfactorily.
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Escrow Amount:</span>
                    <span>${escrow.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (10%):</span>
                    <span>${escrow.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Amount to Release:</span>
                    <span>${escrow.netAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">
                      Once released, funds cannot be recovered. Only release if
                      you're completely satisfied with the work delivered.
                    </p>
                  </div>
                </div>

                <Button onClick={handleNext} className="w-full">
                  Continue to Review
                </Button>
              </motion.div>
            )}

            {step === "rating" && (
              <motion.div
                key="rating"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Rate Your Experience
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    How would you rate the service provided?
                  </p>
                </div>

                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors duration-200"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <Label
                    htmlFor="feedback"
                    className="flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Feedback (Optional)</span>
                  </Label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your experience with this service provider..."
                    rows={3}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("review")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleRelease}
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? "Releasing..." : "Release Funds"}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Releasing Funds</h3>
                <p className="text-sm text-gray-600">
                  Please wait while we process the fund release...
                </p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Funds Released!</h3>
                <p className="text-sm text-gray-600 mb-6">
                  ${escrow.netAmount.toFixed(2)} has been successfully released
                  to the service provider. Thank you for your feedback!
                </p>
                <Button onClick={handleClose} className="w-full">
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

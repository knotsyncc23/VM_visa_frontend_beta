import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  X,
  Shield,
  CreditCard,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Proposal } from "@/types/escrow";

interface DepositEscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
  onDeposit: (amount: number, paymentMethod: string) => Promise<void>;
}

export const DepositEscrowModal: React.FC<DepositEscrowModalProps> = ({
  isOpen,
  onClose,
  proposal,
  onDeposit,
}) => {
  const [step, setStep] = useState<
    "amount" | "payment" | "processing" | "success"
  >("amount");
  const [amount, setAmount] = useState(proposal.amount);
  const [platformFee, setPlatformFee] = useState(proposal.amount * 0.1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = amount + platformFee;

  const handleNext = () => {
    if (step === "amount") {
      setPlatformFee(amount * 0.1);
      setStep("payment");
    }
  };

  const handleDeposit = async () => {
    setIsLoading(true);
    setStep("processing");

    try {
      await onDeposit(amount, paymentMethod);
      setStep("success");
    } catch (error) {
      console.error("Deposit failed:", error);
      setIsLoading(false);
      setStep("payment");
    }
  };

  const handleClose = () => {
    setStep("amount");
    setAmount(proposal.amount);
    setPlatformFee(proposal.amount * 0.1);
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
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Deposit to Escrow
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === "amount" && (
              <motion.div
                key="amount"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {proposal.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {proposal.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    Timeline: {proposal.timeline}
                  </p>
                </div>

                <div>
                  <Label htmlFor="amount">Escrow Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-1"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service Amount:</span>
                    <span>${amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (10%):</span>
                    <span>${(amount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${(amount + amount * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-700">
                      Funds will be held securely until you approve the
                      completed work. Platform fee is charged only when funds
                      are released.
                    </p>
                  </div>
                </div>

                <Button onClick={handleNext} className="w-full">
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Total Amount: ${totalAmount.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-600"
                    />
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span>Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-600"
                    />
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span>Bank Transfer</span>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("amount")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleDeposit}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Processing..." : "Deposit Funds"}
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
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">
                  Processing Payment
                </h3>
                <p className="text-sm text-gray-600">
                  Please wait while we securely process your payment...
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
                <h3 className="text-lg font-semibold mb-2">
                  Payment Successful!
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  ${amount.toFixed(2)} has been deposited into escrow. The agent
                  can now start working on your project.
                </p>
                <Button onClick={handleClose} className="w-full">
                  Continue
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

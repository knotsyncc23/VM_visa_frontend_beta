import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  Award,
  Edit3,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: number;
  agentName: string;
  agentAvatar: string;
  project: string;
  rating: number;
  reviewText: string;
  agentResponse?: string;
  completedDate: Date;
  helpful: number;
  categories: {
    communication: number;
    expertise: number;
    timeliness: number;
    professionalism: number;
  };
}

export function RatingsReviews() {
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: "",
    categories: {
      communication: 0,
      expertise: 0,
      timeliness: 0,
      professionalism: 0,
    },
  });
  const [showNewReview, setShowNewReview] = useState(false);

  const reviews: Review[] = [
    {
      id: 1,
      agentName: "Sarah Chen",
      agentAvatar: "👩‍💼",
      project: "Canada PR Application",
      rating: 5,
      reviewText:
        "Exceptional service! Sarah guided me through the entire Express Entry process with incredible expertise. Her attention to detail and prompt responses made the whole experience stress-free. Highly recommend!",
      agentResponse:
        "Thank you John! It was a pleasure working with you on your Canadian PR application. Congratulations on your successful approval!",
      completedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      helpful: 12,
      categories: {
        communication: 5,
        expertise: 5,
        timeliness: 5,
        professionalism: 5,
      },
    },
    {
      id: 2,
      agentName: "James Wilson",
      agentAvatar: "👨‍💼",
      project: "UK Student Visa",
      rating: 4,
      reviewText:
        "James was very knowledgeable about UK immigration policies. The process took a bit longer than expected, but he kept me informed throughout. Great expertise in student visas.",
      completedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      helpful: 8,
      categories: {
        communication: 4,
        expertise: 5,
        timeliness: 3,
        professionalism: 4,
      },
    },
  ];

  const pendingReviews = [
    {
      id: 4,
      agentName: "David Kim",
      agentAvatar: "👨‍💻",
      project: "Australia Work Visa",
      completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ];

  const StarRating = ({ rating, onRate, readonly = true, size = "sm" }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !readonly && onRate && onRate(star)}
            disabled={readonly}
            className={cn(
              "transition-colors",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
            )}
          >
            <Star
              className={cn(
                size === "sm" ? "w-4 h-4" : "w-5 h-5",
                star <= rating
                  ? "text-gold-500 fill-current"
                  : "text-cool-gray-300",
              )}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
            Ratings & Reviews
          </h1>
          <p className="text-lg text-cool-gray-600">
            Rate your experience with immigration agents
          </p>
        </div>

        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Badge className="bg-gold-100 text-gold-700">
            {reviews.length} reviews given
          </Badge>
          {pendingReviews.length > 0 && (
            <Badge className="bg-orange-100 text-orange-700">
              {pendingReviews.length} pending
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-6 rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50"
        >
          <h2 className="text-xl font-heading font-bold text-orange-800 mb-4">
            Pending Reviews
          </h2>
          <p className="text-orange-700 mb-6">
            Please rate your recent experiences to help other clients and
            improve our services.
          </p>

          <div className="space-y-4">
            {pendingReviews.map((pending) => (
              <div
                key={pending.id}
                className="flex items-center justify-between p-4 bg-white/60 rounded-2xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{pending.agentAvatar}</div>
                  <div>
                    <h3 className="font-semibold text-cool-gray-800">
                      {pending.agentName}
                    </h3>
                    <p className="text-sm text-cool-gray-600">
                      {pending.project}
                    </p>
                    <p className="text-xs text-orange-600">
                      Completed {pending.completedDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowNewReview(true)}
                  className="border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Rate Now
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-xl font-heading font-bold text-cool-gray-800">
          Your Reviews
        </h2>

        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="glass-card p-8 rounded-3xl hover:bg-white/40 transition-all duration-300"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{review.agentAvatar}</div>
                <div>
                  <h3 className="text-xl font-semibold text-cool-gray-800">
                    {review.agentName}
                  </h3>
                  <p className="text-cool-gray-600">{review.project}</p>
                  <p className="text-sm text-cool-gray-500">
                    Completed on {review.completedDate.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <StarRating rating={review.rating} readonly />
                  <span className="font-semibold text-cool-gray-800">
                    {review.rating}.0
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Review
                </Button>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-6">
              <p className="text-cool-gray-700 leading-relaxed">
                {review.reviewText}
              </p>
            </div>

            {/* Category Ratings */}
            <div className="grid md:grid-cols-4 gap-4 mb-6 p-4 bg-white/20 rounded-2xl">
              {Object.entries(review.categories).map(([category, rating]) => (
                <div key={category} className="text-center">
                  <p className="text-sm font-medium text-cool-gray-700 capitalize mb-1">
                    {category}
                  </p>
                  <StarRating rating={rating} readonly size="sm" />
                </div>
              ))}
            </div>

            {/* Agent Response */}
            {review.agentResponse && (
              <div className="bg-sage-green-50 p-4 rounded-2xl border border-sage-green-200 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-sage-green-600" />
                  <span className="text-sm font-medium text-sage-green-700">
                    Agent Response
                  </span>
                </div>
                <p className="text-sage-green-700 text-sm leading-relaxed">
                  {review.agentResponse}
                </p>
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between text-sm text-cool-gray-600">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-sage-green-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>

              <Badge className="bg-sage-green-100 text-sage-green-700">
                Verified Purchase
              </Badge>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* New Review Modal */}
      {showNewReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowNewReview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-heading font-bold text-cool-gray-800 mb-6">
              Rate Your Experience
            </h3>

            <div className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-cool-gray-700 mb-3">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-3">
                  <StarRating
                    rating={newReview.rating}
                    onRate={(rating) =>
                      setNewReview((prev) => ({ ...prev, rating }))
                    }
                    readonly={false}
                    size="lg"
                  />
                  <span className="text-sm text-cool-gray-600">
                    {newReview.rating > 0 && `${newReview.rating} star(s)`}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-cool-gray-700 mb-3">
                  Your Review
                </label>
                <textarea
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview((prev) => ({ ...prev, text: e.target.value }))
                  }
                  placeholder="Share your experience with other clients..."
                  rows={4}
                  className="w-full p-3 border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-6">
                <Button
                  variant="premium"
                  onClick={() => setShowNewReview(false)}
                  disabled={newReview.rating === 0}
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewReview(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

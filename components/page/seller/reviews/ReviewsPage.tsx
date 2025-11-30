"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Star, Reply, Search, Filter, X } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/page/admin/shared/Toast";

interface Review {
  id: string;
  serviceId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  rating: number;
  comment: string;
  status: "visible" | "hidden" | "deleted";
  createdAt: string;
  orderId: string;
  images?: string[];
  reply?: {
    text: string;
    createdAt: string;
  };
}

export const ReviewsPage = () => {
  const { user } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [showReplyModal, setShowReplyModal] = useState<{ isOpen: boolean; review: Review | null }>({
    isOpen: false,
    review: null,
  });
  const [replyText, setReplyText] = useState("");

  const loadReviews = useCallback(() => {
    if (typeof window !== "undefined" && user?.id) {
      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        try {
          const allReviews: Review[] = JSON.parse(storedReviews);
          // Filter reviews for current seller
          const sellerReviews = allReviews.filter(
            (r) => r.sellerId === user.id && r.status === "visible"
          );
          setReviews(sellerReviews);
        } catch (e) {
          console.warn("Failed to parse reviews from localStorage", e);
        }
      }
    }
  }, [user?.id]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Listen for review changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "reviews") {
        loadReviews();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadReviews]);

  // Calculate rating summary
  const ratingSummary = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        average: 0,
        total: 0,
        breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
      };
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / total;
    const breakdown = reviews.reduce(
      (acc, r) => {
        acc[r.rating] = (acc[r.rating] || 0) + 1;
        return acc;
      },
      { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>
    );

    return {
      average: Math.round(average * 10) / 10,
      total,
      breakdown,
    };
  }, [reviews]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        searchQuery === "" ||
        review.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = ratingFilter === "all" || review.rating === ratingFilter;
      return matchesSearch && matchesRating;
    });
  }, [reviews, searchQuery, ratingFilter]);

  const handleReply = (review: Review) => {
    setShowReplyModal({ isOpen: true, review });
    setReplyText(review.reply?.text || "");
  };

  const handleSubmitReply = () => {
    if (!showReplyModal.review || !replyText.trim()) {
      showToast("답변 내용을 입력해주세요.", "error");
      return;
    }

    // Update review with reply
    if (typeof window !== "undefined") {
      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        try {
          const allReviews: Review[] = JSON.parse(storedReviews);
          const updatedReviews = allReviews.map((r) =>
            r.id === showReplyModal.review!.id
              ? {
                  ...r,
                  reply: {
                    text: replyText.trim(),
                    createdAt: new Date().toISOString().split("T")[0],
                  },
                }
              : r
          );
          localStorage.setItem("reviews", JSON.stringify(updatedReviews));
          loadReviews();
          showToast("답변이 등록되었습니다.", "success");
          setShowReplyModal({ isOpen: false, review: null });
          setReplyText("");
        } catch (e) {
          console.warn("Failed to update review reply", e);
          showToast("답변 등록에 실패했습니다.", "error");
        }
      }
    }
  };

  const handleEditReply = () => {
    handleSubmitReply();
  };

  const handleDeleteReply = () => {
    if (!showReplyModal.review) return;

    if (typeof window !== "undefined") {
      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        try {
          const allReviews: Review[] = JSON.parse(storedReviews);
          const updatedReviews = allReviews.map((r) =>
            r.id === showReplyModal.review!.id ? { ...r, reply: undefined } : r
          );
          localStorage.setItem("reviews", JSON.stringify(updatedReviews));
          loadReviews();
          showToast("답변이 삭제되었습니다.", "success");
          setShowReplyModal({ isOpen: false, review: null });
          setReplyText("");
        } catch (e) {
          console.warn("Failed to delete review reply", e);
          showToast("답변 삭제에 실패했습니다.", "error");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">리뷰</h1>
        <p className="mt-1 text-sm text-[#475569]">받은 리뷰를 확인하고 관리하세요</p>
      </div>

      {/* Rating Summary */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="text-center sm:text-left">
            <div className="mb-2 flex items-center justify-center gap-1 text-5xl font-bold text-[#0F172A] sm:justify-start">
              {ratingSummary.average > 0 ? ratingSummary.average : "0.0"}
              <Star className="size-8 fill-[#F59E0B] text-[#F59E0B]" />
            </div>
            <div className="text-sm text-[#475569]">총 {ratingSummary.total}개의 리뷰</div>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingSummary.breakdown[rating] || 0;
                const percentage = ratingSummary.total > 0 ? (count / ratingSummary.total) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="w-8 text-sm font-medium text-[#475569]">{rating}점</span>
                    <div className="flex-1 h-2 rounded-full bg-[#E2E8F0]">
                      <div
                        className="h-full rounded-full bg-[#F59E0B]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs text-[#94A3B8]">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="리뷰 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#E2E8F0] bg-white py-2 pl-10 pr-4 text-sm focus:border-[#2E5E99] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRatingFilter("all")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              ratingFilter === "all"
                ? "border-[#2E5E99] bg-[#2E5E99] text-white"
                : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]"
            }`}
          >
            전체
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setRatingFilter(rating)}
              className={`flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                ratingFilter === rating
                  ? "border-[#2E5E99] bg-[#2E5E99] text-white"
                  : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
              {rating}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-12 text-center">
          <Star className="mx-auto mb-4 size-12 text-[#E2E8F0]" />
          <h3 className="mb-2 text-xl font-semibold text-gray-700">리뷰가 없습니다</h3>
          <p className="text-gray-500">
            {reviews.length === 0
              ? "아직 받은 리뷰가 없습니다."
              : "검색 조건에 맞는 리뷰가 없습니다."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:p-6"
            >
              <div className="mb-4 flex items-start gap-4">
                <Image
                  src={review.buyerAvatar || "/default-avatar.png"}
                  alt={review.buyerName}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#0F172A]">{review.buyerName}</div>
                      <div className="text-xs text-[#94A3B8]">
                        {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < review.rating
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "text-[#E2E8F0]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-[#0F172A]">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="mb-3 flex gap-2">
                      {review.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Review ${index + 1}`}
                          className="size-20 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                  {review.reply ? (
                    <div className="mb-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#2E5E99]">판매자 답변</span>
                        <span className="text-xs text-[#94A3B8]">
                          {new Date(review.reply.createdAt).toLocaleDateString("ko-KR")}
                        </span>
                      </div>
                      <p className="text-sm text-[#0F172A]">{review.reply.text}</p>
                      <div className="mt-2 flex gap-2">
                        <Button
                          type="default"
                          size="small"
                          onClick={() => handleReply(review)}
                          className="text-xs"
                        >
                          수정
                        </Button>
                        <Button
                          type="outline"
                          size="small"
                          onClick={handleDeleteReply}
                          className="text-xs"
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      type="default"
                      size="small"
                      shape="round"
                      onClick={() => handleReply(review)}
                      className="mt-3 gap-1 border border-[#E2E8F0] bg-white text-xs font-medium text-[#475569] hover:bg-[#F1F5F9]"
                    >
                      <Reply className="size-3" />
                      답변하기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal.isOpen && showReplyModal.review && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {showReplyModal.review.reply ? "답변 수정" : "답변 작성"}
              </h2>
              <button
                onClick={() => {
                  setShowReplyModal({ isOpen: false, review: null });
                  setReplyText("");
                }}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-sm text-[#475569]">리뷰 내용</p>
              <p className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-sm text-[#0F172A]">
                {showReplyModal.review.comment}
              </p>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">답변 내용</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="답변을 입력해주세요..."
                rows={4}
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="outline"
                onClick={() => {
                  setShowReplyModal({ isOpen: false, review: null });
                  setReplyText("");
                }}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                type="primary"
                onClick={showReplyModal.review.reply ? handleEditReply : handleSubmitReply}
                className="flex-1"
              >
                {showReplyModal.review.reply ? "수정" : "등록"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

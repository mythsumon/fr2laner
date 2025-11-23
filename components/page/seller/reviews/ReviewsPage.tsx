"use client";

import Image from "next/image";
import { Star, Reply } from "lucide-react";
import { Button } from "@/components/shared/common";

interface Review {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  rating: number;
  reviewText: string;
  date: string;
  images?: string[];
  serviceTitle: string;
}

// Mock data
const mockReviews: Review[] = [
  {
    id: "1",
    buyerName: "김클라이언트",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    rating: 5,
    reviewText: "정말 훌륭한 로고 디자인입니다! 빠르고 정확하게 작업해주셨어요.",
    date: "2024-01-15",
    serviceTitle: "프리미엄 로고 디자인 서비스",
  },
  {
    id: "2",
    buyerName: "박의뢰인",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    rating: 4,
    reviewText: "만족스럽습니다. 다만 약간의 수정이 필요했지만 빠르게 반영해주셨어요.",
    date: "2024-01-14",
    serviceTitle: "브랜드 아이덴티티 디자인",
  },
];

const ratingSummary = {
  average: 4.9,
  total: 342,
  breakdown: { 5: 280, 4: 50, 3: 10, 2: 2, 1: 0 } as Record<number, number>,
};

export const ReviewsPage = () => {
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
              {ratingSummary.average}
              <Star className="size-8 fill-[#F59E0B] text-[#F59E0B]" />
            </div>
            <div className="text-sm text-[#475569]">총 {ratingSummary.total}개의 리뷰</div>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingSummary.breakdown[rating] || 0;
                const percentage = (count / ratingSummary.total) * 100;
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

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:p-6"
          >
            <div className="mb-4 flex items-start gap-4">
              <Image
                src={review.buyerAvatar}
                alt={review.buyerName}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#0F172A]">{review.buyerName}</div>
                    <div className="text-xs text-[#94A3B8]">{review.date}</div>
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
                <div className="mb-2 text-sm text-[#475569]">{review.serviceTitle}</div>
                <p className="text-sm text-[#0F172A]">{review.reviewText}</p>
                {review.images && review.images.length > 0 && (
                  <div className="mt-3 flex gap-2">
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
                <Button
                  type="default"
                  size="small"
                  shape="round"
                  className="mt-3 gap-1 border border-[#E2E8F0] bg-white text-xs font-medium text-[#475569] hover:bg-[#F1F5F9]"
                >
                  <Reply className="size-3" />
                  답변하기
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



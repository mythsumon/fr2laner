"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Upload, X, Save, FileText } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";

const mockOrder = {
  id: "ORD-1043",
  serviceId: "svc-1",
  serviceTitle: "프리미엄 로고 디자인",
  sellerName: "김디자이너",
  price: 350000,
};

interface AdminPolicies {
  termsOfService: string;
  privacyPolicy: string;
  refundPolicy: string;
  userAgreement: string;
}

export const CreateReviewPage = () => {
  useBodyClass("dashboard-page");
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const orderId = params.id as string;
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    images: [] as File[],
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policies, setPolicies] = useState<AdminPolicies>({
    termsOfService: "",
    privacyPolicy: "",
    refundPolicy: "",
    userAgreement: "",
  });

  // Load policies from admin settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("admin_settings");
      if (storedSettings) {
        try {
          const parsedSettings = JSON.parse(storedSettings);
          if (parsedSettings.policies) {
            setPolicies(parsedSettings.policies);
          }
        } catch (e) {
          console.warn("Failed to parse admin_settings from localStorage", e);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("평점을 선택해주세요.");
      return;
    }
    setIsSubmitting(true);

    // Get order info to extract serviceId and seller info
    let serviceId = "";
    let sellerId = "";
    let sellerName = "";
    if (typeof window !== "undefined") {
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        try {
          const orders: any[] = JSON.parse(storedOrders);
          const order = orders.find((o) => o.id === orderId);
          if (order) {
            serviceId = order.serviceId || "";
            sellerId = order.sellerId || "";
            sellerName = order.sellerName || "";
            
            // If seller info not in order, try to get from service
            if (!sellerId && serviceId) {
              const storedServices = localStorage.getItem("services");
              if (storedServices) {
                try {
                  const services: any[] = JSON.parse(storedServices);
                  const service = services.find((s) => s.id === serviceId);
                  if (service) {
                    sellerId = service.sellerId || service.userId || "";
                    sellerName = service.sellerName || service.seller || "";
                  }
                } catch (e) {
                  console.warn("Failed to parse services", e);
                }
              }
            }
          }
        } catch (e) {
          console.warn("Failed to parse orders", e);
        }
      }
    }

    // Create review
    const reviewId = `REV-${Date.now()}`;
    const newReview = {
      id: reviewId,
      serviceId: serviceId,
      buyerId: user?.id || "",
      buyerName: user?.name || "",
      buyerAvatar: user?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2E5E99&color=fff` : "",
      sellerId: sellerId,
      sellerName: sellerName,
      rating: formData.rating,
      comment: formData.comment,
      status: "visible" as const,
      createdAt: new Date().toISOString().split("T")[0],
      orderId: orderId,
      images: formData.images.map((f) => f.name),
    };

    // Save to localStorage
    if (typeof window !== "undefined") {
      const storedReviews = localStorage.getItem("reviews");
      const existingReviews: any[] = storedReviews ? JSON.parse(storedReviews) : [];
      existingReviews.push(newReview);
      localStorage.setItem("reviews", JSON.stringify(existingReviews));
    }

    setIsSubmitting(false);
    router.push(`/services/${serviceId}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      <main className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/client/orders/${orderId}`}>
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              주문 상세로
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">리뷰 작성</h1>
          <p className="mt-1 text-sm text-[#475569]">{mockOrder.serviceTitle}</p>
        </div>

        {/* Order Info */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm text-[#94A3B8]">주문 정보</div>
          <div className="text-lg font-semibold text-[#0F172A]">{mockOrder.serviceTitle}</div>
          <div className="mt-1 text-sm text-[#475569]">판매자: {mockOrder.sellerName}</div>
          <div className="mt-1 text-sm text-[#475569]">주문번호: {mockOrder.id}</div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-4 block text-sm font-semibold text-[#0F172A]">
              평점 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, rating }))}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-10 ${
                      rating <= (hoveredRating || formData.rating)
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "text-[#E2E8F0]"
                    }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-4 text-sm font-semibold text-[#0F172A]">
                  {formData.rating}점
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              리뷰 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              required
              rows={8}
              placeholder="서비스에 대한 솔직한 리뷰를 작성해주세요..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
            <p className="mt-2 text-xs text-[#94A3B8]">
              최소 10자 이상 작성해주세요. ({formData.comment.length}자)
            </p>
          </div>

          {/* Images */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">사진 첨부 (선택)</label>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-colors hover:border-[#2E5E99] hover:bg-[#E9EEF8]">
                <Upload className="size-5 text-[#2E5E99]" />
                <span className="text-sm font-semibold text-[#2E5E99]">사진 업로드</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-[#94A3B8]">최대 5장까지 업로드 가능합니다.</p>
          </div>

          {/* Review Policy */}
          {policies.termsOfService && (
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="mb-2 flex items-center gap-2">
                <FileText className="size-4 text-[#2E5E99]" />
                <span className="text-sm font-semibold text-[#0F172A]">리뷰 작성 정책</span>
              </div>
              <p className="text-xs text-[#64748B]">
                리뷰 작성 시 플랫폼의 이용약관 및 정책을 준수해야 합니다. 부적절한 리뷰는 삭제될 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  const modal = document.createElement("div");
                  modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";
                  modal.innerHTML = `
                    <div class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[80vh] overflow-y-auto">
                      <h3 class="text-xl font-bold text-[#0F172A] mb-4">이용약관</h3>
                      <div class="prose prose-sm max-w-none text-[#475569] whitespace-pre-wrap">${policies.termsOfService}</div>
                      <button onclick="this.closest('.fixed').remove()" class="mt-4 w-full rounded-lg bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4673]">닫기</button>
                    </div>
                  `;
                  document.body.appendChild(modal);
                  modal.querySelector("button")?.addEventListener("click", () => modal.remove());
                }}
                className="mt-2 text-xs text-[#2E5E99] hover:underline"
              >
                이용약관 전체 보기
              </button>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <Link href={`/client/orders/${orderId}`} className="flex-1">
              <Button
                type="default"
                size="large"
                shape="round"
                className="w-full border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569]"
              >
                취소
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              shape="round"
              disabled={isSubmitting || formData.rating === 0 || formData.comment.length < 10}
              className="flex-1 gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-sm font-semibold text-white hover:from-[#D97706] hover:to-[#EA580C] disabled:opacity-50"
            >
              <Save className="size-4" />
              {isSubmitting ? "제출 중..." : "리뷰 등록하기"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};


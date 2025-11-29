"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, CheckCircle2, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/page/admin/shared/Toast";

interface Coupon {
  id: number;
  code: string;
  type: "percentage" | "amount";
  value: number;
  limit: number;
  used: number;
  expiry: string;
  status: "active" | "inactive";
}

export const CreateOrderPage = () => {
  useBodyClass("dashboard-page");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const serviceId = searchParams.get("service");
  const packageId = searchParams.get("package");

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [basePrice, setBasePrice] = useState(250000); // Mock price
  const [requirements, setRequirements] = useState({
    message: "",
    files: [] as File[],
  });

  useEffect(() => {
    // Load available coupons from localStorage
    if (typeof window !== "undefined") {
      const storedCoupons = localStorage.getItem("marketing_coupons");
      if (storedCoupons) {
        try {
          const parsedCoupons: Coupon[] = JSON.parse(storedCoupons);
          const activeCoupons = parsedCoupons.filter(
            (c) =>
              c.status === "active" &&
              c.used < c.limit &&
              new Date(c.expiry) > new Date()
          );
          setAvailableCoupons(activeCoupons);
        } catch (e) {
          console.warn("Failed to parse coupons from localStorage", e);
        }
      }
    }
  }, []);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      showToast("쿠폰 코드를 입력해주세요.", "error");
      return;
    }

    const coupon = availableCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase().trim()
    );

    if (!coupon) {
      showToast("유효하지 않은 쿠폰 코드입니다.", "error");
      return;
    }

    if (coupon.used >= coupon.limit) {
      showToast("쿠폰 사용 한도에 도달했습니다.", "error");
      return;
    }

    if (new Date(coupon.expiry) < new Date()) {
      showToast("만료된 쿠폰입니다.", "error");
      return;
    }

    setAppliedCoupon(coupon);
    showToast("쿠폰이 적용되었습니다!", "success");
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast("쿠폰이 제거되었습니다.", "success");
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percentage") {
      return (basePrice * appliedCoupon.value) / 100;
    }
    return appliedCoupon.value;
  };

  const calculateTotal = () => {
    return basePrice - calculateDiscount();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("로그인이 필요합니다.", "error");
      router.push("/login");
      return;
    }

    // Create order
    const order = {
      id: `ORD-${Date.now()}`,
      serviceId: serviceId || "svc-1",
      serviceTitle: "프리미엄 로고 디자인",
      sellerId: "expert-1",
      sellerName: "김디자이너",
      buyerId: user.id,
      buyerName: user.name,
      price: basePrice,
      discount: calculateDiscount(),
      total: calculateTotal(),
      couponCode: appliedCoupon?.code || null,
      status: "pending_payment",
      createdAt: new Date().toISOString().split("T")[0],
      requirements: requirements.message,
    };

    // Save to localStorage
    if (typeof window !== "undefined") {
      const storedOrders = localStorage.getItem("orders");
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Update coupon usage
      if (appliedCoupon) {
        const updatedCoupons = availableCoupons.map((c) =>
          c.id === appliedCoupon.id ? { ...c, used: c.used + 1 } : c
        );
        localStorage.setItem("marketing_coupons", JSON.stringify(updatedCoupons));
      }
    }

    showToast("주문이 생성되었습니다!", "success");
    router.push(`/client/orders/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href={serviceId ? `/services/${serviceId}` : "/client/orders"}>
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              {serviceId ? "서비스로 돌아가기" : "주문 목록으로"}
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">주문하기</h1>
          <p className="mt-1 text-sm text-[#475569]">서비스 주문 정보를 확인하고 결제하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">주문 요약</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">서비스</span>
                <span className="font-semibold text-[#0F172A]">프리미엄 로고 디자인</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">패키지</span>
                <span className="font-semibold text-[#0F172A]">Premium 패키지</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">기본 가격</span>
                <span className="font-semibold text-[#0F172A]">₩{basePrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">쿠폰 적용</h2>
            {appliedCoupon ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-700">{appliedCoupon.code}</div>
                      <div className="text-sm text-green-600">
                        {appliedCoupon.type === "percentage"
                          ? `${appliedCoupon.value}% 할인`
                          : `₩${appliedCoupon.value.toLocaleString()} 할인`}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="rounded-lg p-2 text-green-600 hover:bg-green-100"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="쿠폰 코드 입력"
                  className="flex-1 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                />
                <Button
                  type="default"
                  onClick={handleApplyCoupon}
                  className="gap-2 border border-[#2E5E99] bg-white text-sm font-semibold text-[#2E5E99] hover:bg-[#E9EEF8]"
                >
                  <Tag className="size-4" />
                  적용
                </Button>
              </div>
            )}
          </div>

          {/* Requirements */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">요구사항</h2>
            <textarea
              value={requirements.message}
              onChange={(e) => setRequirements((prev) => ({ ...prev, message: e.target.value }))}
              rows={6}
              placeholder="프로젝트에 대한 요구사항을 입력해주세요..."
              className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
            />
            <div className="mt-3">
              <label className="mb-2 block text-sm font-medium text-[#475569]">참고 파일 (선택)</label>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setRequirements((prev) => ({
                    ...prev,
                    files: Array.from(e.target.files || []),
                  }))
                }
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
          </div>

          {/* Total */}
          <div className="rounded-2xl border border-[#E2E5E99] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">결제 금액</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">기본 가격</span>
                <span className="font-semibold text-[#0F172A]">₩{basePrice.toLocaleString()}</span>
              </div>
              {appliedCoupon && (
                <div className="flex items-center justify-between text-green-600">
                  <span className="text-sm">할인 ({appliedCoupon.code})</span>
                  <span className="font-semibold">-₩{calculateDiscount().toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-[#E2E8F0] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0F172A]">총 결제 금액</span>
                  <span className="text-2xl font-bold text-[#2E5E99]">
                    ₩{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Link href={serviceId ? `/services/${serviceId}` : "/client/orders"} className="flex-1">
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
              className="flex-1 gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white hover:from-[#1d4673] hover:to-[#2E5E99]"
            >
              주문하기
            </Button>
          </div>
        </form>
      </main>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};


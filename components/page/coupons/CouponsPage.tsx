"use client";

import { useState, useEffect } from "react";
import { Tag, Gift, Sparkles } from "lucide-react";
import { CouponCard, type Coupon } from "@/components/shared/CouponCard";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/page/admin/shared/Toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const CouponsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [claimedCouponIds, setClaimedCouponIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Load available coupons from localStorage
    if (typeof window !== "undefined") {
      const storedCoupons = localStorage.getItem("marketing_coupons");
      if (storedCoupons) {
        try {
          const parsedCoupons: Coupon[] = JSON.parse(storedCoupons);
          // Filter active, not expired, and not fully used coupons
          const activeCoupons = parsedCoupons.filter(
            (c) =>
              c.status === "active" &&
              c.used < c.limit &&
              new Date(c.expiry) > new Date()
          );
          setAvailableCoupons(activeCoupons);
        } catch (e) {
          console.warn("Failed to parse coupons", e);
        }
      }

      // Load claimed coupons for current user
      if (user?.id) {
        const storedClaimed = localStorage.getItem(`user_claimed_coupons_${user.id}`);
        if (storedClaimed) {
          try {
            const claimed: number[] = JSON.parse(storedClaimed);
            setClaimedCouponIds(new Set(claimed));
          } catch (e) {
            console.warn("Failed to parse claimed coupons", e);
          }
        }
      }
    }
  }, [user?.id]);

  const handleClaimCoupon = (coupon: Coupon) => {
    if (!user) {
      showToast("로그인이 필요합니다.", "error");
      router.push("/login");
      return;
    }

    // Check if already claimed
    if (claimedCouponIds.has(coupon.id)) {
      showToast("이미 받은 쿠폰입니다.", "error");
      return;
    }

    // Check if coupon is still available
    if (coupon.used >= coupon.limit) {
      showToast("쿠폰이 모두 소진되었습니다.", "error");
      return;
    }

    if (new Date(coupon.expiry) < new Date()) {
      showToast("만료된 쿠폰입니다.", "error");
      return;
    }

    // Save claimed coupon
    if (typeof window !== "undefined") {
      const newClaimed = [...Array.from(claimedCouponIds), coupon.id];
      localStorage.setItem(`user_claimed_coupons_${user.id}`, JSON.stringify(newClaimed));
      setClaimedCouponIds(new Set(newClaimed));

      // Update coupon usage count
      const storedCoupons = localStorage.getItem("marketing_coupons");
      if (storedCoupons) {
        try {
          const parsedCoupons: Coupon[] = JSON.parse(storedCoupons);
          const updatedCoupons = parsedCoupons.map((c) =>
            c.id === coupon.id ? { ...c, used: c.used + 1 } : c
          );
          localStorage.setItem("marketing_coupons", JSON.stringify(updatedCoupons));
          setAvailableCoupons((prev) =>
            prev.map((c) => (c.id === coupon.id ? { ...c, used: c.used + 1 } : c))
          );
        } catch (e) {
          console.warn("Failed to update coupon usage", e);
        }
      }

      showToast(`쿠폰 "${coupon.code}"을(를) 받았습니다!`, "success");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-[#2E5E99] to-[#1d4673] p-4">
              <Gift className="size-8 text-white" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">쿠폰 받기</h1>
          <p className="text-lg text-gray-600">특별 할인 쿠폰을 받고 더 저렴하게 이용하세요!</p>
        </div>

        {/* Info Banner */}
        {!user && (
          <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-sm text-blue-800">
              쿠폰을 받으려면{" "}
              <Link href="/login" className="font-semibold underline hover:text-blue-900">
                로그인
              </Link>
              이 필요합니다.
            </p>
          </div>
        )}

        {/* Coupons Grid */}
        {availableCoupons.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <Tag className="mx-auto mb-4 size-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-700">사용 가능한 쿠폰이 없습니다</h3>
            <p className="text-gray-500">새로운 쿠폰이 추가되면 알려드리겠습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onClaim={handleClaimCoupon}
                isClaimed={claimedCouponIds.has(coupon.id)}
                showClaimButton={true}
              />
            ))}
          </div>
        )}

        {/* My Coupons Link */}
        {user && (
          <div className="mt-12 text-center">
            <Link
              href="/client/coupons"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2E5E99] px-6 py-3 text-white transition-colors hover:bg-[#1d4673]"
            >
              <Sparkles className="size-5" />
              내 쿠폰 보기
            </Link>
          </div>
        )}
      </div>

      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
};



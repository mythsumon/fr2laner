"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, Calendar, CheckCircle2, X, Gift } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useAuth } from "@/hooks/useAuth";
import { useBodyClass } from "@/hooks";
import { CouponCard, type Coupon } from "@/components/shared/CouponCard";

export const MyCouponsPage = () => {
  useBodyClass("dashboard-page");
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [claimedCoupons, setClaimedCoupons] = useState<Coupon[]>([]);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);

  const loadCoupons = useCallback(() => {
    // Wait for auth to finish loading
    if (isLoading) {
      return;
    }
    
    // Only redirect to login if user is definitely not logged in
    if (!user?.id) {
      router.push("/login");
      return;
    }

    // Load claimed coupon IDs
    if (typeof window !== "undefined") {
      const storedClaimed = localStorage.getItem(`user_claimed_coupons_${user.id}`);
      let claimedIds: number[] = [];
      if (storedClaimed) {
        try {
          claimedIds = JSON.parse(storedClaimed);
        } catch (e) {
          console.warn("Failed to parse claimed coupons", e);
        }
      }

      // Load all coupons
      const storedCoupons = localStorage.getItem("marketing_coupons");
      if (storedCoupons) {
        try {
          const allCoupons: Coupon[] = JSON.parse(storedCoupons);
          // Filter claimed coupons
          const claimed = allCoupons.filter((c) => claimedIds.includes(c.id));
          setClaimedCoupons(claimed);

          // Also show available coupons that can be claimed
          const available = allCoupons.filter(
            (c) =>
              !claimedIds.includes(c.id) &&
              c.status === "active" &&
              c.used < c.limit &&
              new Date(c.expiry) > new Date()
          );
          setAvailableCoupons(available);
        } catch (e) {
          console.warn("Failed to parse coupons", e);
        }
      }
    }
  }, [user?.id, router, isLoading]);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  // Listen for coupon data changes from admin or other pages
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "marketing_coupons") {
        loadCoupons();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadCoupons]);

  const handleClaimCoupon = (coupon: Coupon) => {
    if (!user?.id) return;

    // Save claimed coupon
    if (typeof window !== "undefined") {
      const storedClaimed = localStorage.getItem(`user_claimed_coupons_${user.id}`);
      const claimedIds: number[] = storedClaimed ? JSON.parse(storedClaimed) : [];
      if (claimedIds.includes(coupon.id)) {
        return; // Already claimed
      }

      const newClaimed = [...claimedIds, coupon.id];
      localStorage.setItem(`user_claimed_coupons_${user.id}`, JSON.stringify(newClaimed));

      // Update coupon usage
      const storedCoupons = localStorage.getItem("marketing_coupons");
      if (storedCoupons) {
        try {
          const parsedCoupons: Coupon[] = JSON.parse(storedCoupons);
          const updatedCoupons = parsedCoupons.map((c) =>
            c.id === coupon.id ? { ...c, used: c.used + 1 } : c
          );
          localStorage.setItem("marketing_coupons", JSON.stringify(updatedCoupons));
        } catch (e) {
          console.warn("Failed to update coupon usage", e);
        }
      }

      // Refresh page
      window.location.reload();
    }
  };

  const activeCoupons = claimedCoupons.filter(
    (c) => c.status === "active" && new Date(c.expiry) > new Date()
  );
  const expiredCoupons = claimedCoupons.filter((c) => new Date(c.expiry) < new Date());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/client/dashboard"
            className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="size-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">내 쿠폰</h1>
            <p className="text-sm text-gray-500">받은 쿠폰을 확인하고 사용하세요</p>
          </div>
        </div>
        <Link
          href="/coupons"
          className="flex items-center gap-2 rounded-lg bg-[#2E5E99] px-4 py-2 text-white transition-colors hover:bg-[#1d4673]"
        >
          <Gift className="size-4" />
          쿠폰 더 받기
        </Link>
      </div>

      {/* Available Coupons to Claim */}
      {availableCoupons.length > 0 && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">받을 수 있는 쿠폰</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onClaim={handleClaimCoupon}
                isClaimed={false}
                showClaimButton={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Active Coupons */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">사용 가능한 쿠폰</h2>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {activeCoupons.length}개
          </span>
        </div>
        {activeCoupons.length === 0 ? (
          <div className="py-12 text-center">
            <Tag className="mx-auto mb-4 size-12 text-gray-400" />
            <p className="text-gray-500">사용 가능한 쿠폰이 없습니다.</p>
            <Link
              href="/coupons"
              className="mt-4 inline-block text-[#2E5E99] hover:underline"
            >
              쿠폰 받으러 가기 →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                isClaimed={true}
                showClaimButton={false}
              />
            ))}
          </div>
        )}
      </section>

      {/* Expired Coupons */}
      {expiredCoupons.length > 0 && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">만료된 쿠폰</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {expiredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                isClaimed={true}
                showClaimButton={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};



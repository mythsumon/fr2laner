"use client";

import { Tag, Calendar, Users, Percent, DollarSign, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/common";

export interface Coupon {
  id: number;
  code: string;
  type: "percentage" | "amount";
  value: number;
  limit: number;
  used: number;
  expiry: string;
  status: "active" | "inactive";
}

interface CouponCardProps {
  coupon: Coupon;
  onClaim?: (coupon: Coupon) => void;
  isClaimed?: boolean;
  showClaimButton?: boolean;
}

export const CouponCard = ({ coupon, onClaim, isClaimed = false, showClaimButton = true }: CouponCardProps) => {
  const isExpired = new Date(coupon.expiry) < new Date();
  const isFullyUsed = coupon.used >= coupon.limit;
  const isAvailable = coupon.status === "active" && !isExpired && !isFullyUsed && !isClaimed;

  const discountText =
    coupon.type === "percentage" ? `${coupon.value}% 할인` : `₩${coupon.value.toLocaleString()} 할인`;

  const remainingCount = coupon.limit - coupon.used;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
        isAvailable
          ? "border-[#2E5E99] bg-gradient-to-br from-[#2E5E99]/5 to-white shadow-md hover:shadow-xl"
          : "border-gray-200 bg-gray-50 opacity-75"
      }`}
    >
      {/* Decorative corner */}
      <div className="absolute right-0 top-0 h-20 w-20 bg-[#2E5E99]/10 blur-2xl" />

      <div className="relative p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              {coupon.type === "percentage" ? (
                <Percent className="size-5 text-[#2E5E99]" />
              ) : (
                <DollarSign className="size-5 text-[#2E5E99]" />
              )}
              <span className="text-2xl font-bold text-[#2E5E99]">{discountText}</span>
            </div>
            <div className="mb-3 flex items-center gap-2">
              <Tag className="size-4 text-gray-500" />
              <span className="font-mono text-lg font-semibold text-gray-800">{coupon.code}</span>
            </div>
          </div>
          {isClaimed && (
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1">
              <CheckCircle2 className="size-4 text-green-600" />
              <span className="text-xs font-semibold text-green-700">받음</span>
            </div>
          )}
        </div>

        <div className="mb-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>만료일: {new Date(coupon.expiry).toLocaleDateString("ko-KR")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4" />
            <span>
              남은 수량: {remainingCount}개 {coupon.limit > 0 && `(전체 ${coupon.limit}개)`}
            </span>
          </div>
        </div>

        {!isAvailable && (
          <div className="mb-4 text-xs text-red-600">
            {isExpired && "만료된 쿠폰입니다"}
            {isFullyUsed && "모든 쿠폰이 소진되었습니다"}
            {coupon.status === "inactive" && "비활성화된 쿠폰입니다"}
            {isClaimed && "이미 받은 쿠폰입니다"}
          </div>
        )}

        {showClaimButton && onClaim && (
          <Button
            onClick={() => onClaim(coupon)}
            disabled={!isAvailable}
            className={`w-full ${
              isAvailable
                ? "bg-[#2E5E99] text-white hover:bg-[#1d4673]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isClaimed ? "받은 쿠폰" : isAvailable ? "쿠폰 받기" : "받을 수 없음"}
          </Button>
        )}
      </div>
    </div>
  );
};


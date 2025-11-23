"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";
import type { Seller } from "@/hooks/useSearchResult";
import { cn } from "@/components/shared/utils";

interface SellerCardProps {
  seller: Seller;
}

export const SellerCard = ({ seller }: SellerCardProps) => {
  return (
    <Link
      href={`/seller/${seller.id}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(46,94,153,0.12)]"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <Image
            src={seller.avatar}
            alt={seller.name}
            width={64}
            height={64}
            className="size-16 rounded-full object-cover"
          />
          {seller.badge === "verified" && (
            <CheckCircle2 className="absolute -bottom-1 -right-1 size-5 rounded-full bg-white text-blue-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-[#0F172A] truncate">{seller.name}</h3>
            {seller.badge && seller.badge !== "verified" && (
              <span className="rounded-full bg-[#E9EEF8] px-2 py-0.5 text-xs font-semibold text-[#2E5E99] whitespace-nowrap">
                {seller.badge === "pro" ? "PRO" : seller.badge === "best" ? "BEST" : ""}
              </span>
            )}
          </div>
          <span className="rounded-full bg-[#E9EEF8] px-2 py-0.5 text-xs font-semibold text-[#2E5E99]">
            {seller.level}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-[#475569]">
        <div className="flex items-center gap-1">
          <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="font-semibold text-[#0F172A]">{seller.rating.toFixed(1)}</span>
          <span className="text-[#94A3B8]">({seller.reviews.toLocaleString()})</span>
        </div>
        <span className="text-[#94A3B8]">•</span>
        <span className="text-[#94A3B8]">주문 {seller.orders.toLocaleString()}건</span>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2">
        {seller.specialties.slice(0, 3).map((specialty) => (
          <span
            key={specialty}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {specialty}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
        <div className="text-sm text-[#475569]">
          <div className="font-semibold text-[#0F172A]">{seller.priceRange}</div>
          <div className="text-xs text-[#94A3B8]">응답: {seller.responseTime}</div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            // Handle contact action
          }}
          className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-full bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4673]"
        >
          문의하기
        </button>
      </div>
    </Link>
  );
};






"use client";

import { SellerCard } from "./SellerCard";
import type { Seller } from "@/hooks/useSearchResult";
import { cn } from "@/components/shared/utils";

interface SellerGridProps {
  sellers: Seller[];
  viewMode?: "grid" | "list";
}

export const SellerGrid = ({ sellers, viewMode = "grid" }: SellerGridProps) => {
  if (sellers.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
        <p className="text-sm text-slate-500">조건에 맞는 전문가가 없어요.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-5",
        viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
      )}
    >
      {sellers.map((seller) => (
        <SellerCard key={seller.id} seller={seller} />
      ))}
    </div>
  );
};






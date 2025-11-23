"use client";

import { PortfolioCard } from "./PortfolioCard";
import type { Portfolio } from "@/hooks/useSearchResult";
import { cn } from "@/components/shared/utils";

interface PortfolioGridProps {
  portfolios: Portfolio[];
  viewMode?: "grid" | "list";
}

export const PortfolioGrid = ({ portfolios, viewMode = "grid" }: PortfolioGridProps) => {
  if (portfolios.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
        <p className="text-sm text-slate-500">등록된 포트폴리오가 없습니다.</p>
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
      {portfolios.map((portfolio) => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  );
};






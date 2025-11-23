"use client";

import { useSearchType } from "@/hooks/useSearchType";
import { cn } from "@/components/shared/utils";

interface SearchTypeTabsProps {
  counts?: {
    gigs?: number;
    sellers?: number;
    portfolios?: number;
  };
}

export const SearchTypeTabs = ({ counts }: SearchTypeTabsProps) => {
  const { currentType, setType } = useSearchType();

  const tabs = [
    { id: "gigs" as const, label: "서비스", count: counts?.gigs },
    { id: "sellers" as const, label: "전문가", count: counts?.sellers },
    { id: "portfolios" as const, label: "포트폴리오", count: counts?.portfolios },
  ];

  return (
    <>
      {/* Desktop */}
      <div className="hidden border-b border-slate-100 pb-3 sm:block">
        <div className="flex flex-row gap-2">
          {tabs.map((tab) => {
            const isActive = currentType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setType(tab.id)}
                className={cn(
                  "inline-flex items-center justify-center gap-1 rounded-full px-4 py-1.5 text-xs md:text-sm font-medium cursor-pointer select-none transition-all",
                  isActive
                    ? "border border-sky-500 bg-sky-500/10 text-sky-700 shadow-sm"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[11px] text-slate-400 ml-0.5">({tab.count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile - Full-width segmented control */}
      <div className="sticky top-[var(--mobile-header-height,0)] z-20 bg-white/95 backdrop-blur border-b border-slate-100 sm:hidden">
        <div className="flex w-full gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setType(tab.id)}
                className={cn(
                  "flex-1 text-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all min-w-[100px]",
                  isActive
                    ? "bg-sky-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1 text-xs opacity-75">({tab.count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};






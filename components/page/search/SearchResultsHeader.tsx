"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/components/shared/utils";

type SearchResultsHeaderProps = {
  keyword: string;
  type: string;
  activeTab: "services" | "experts" | "portfolio";
  onTabChange: (tab: "services" | "experts" | "portfolio") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
};

export const SearchResultsHeader = ({
  keyword,
  type,
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
}: SearchResultsHeaderProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(keyword);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const encodedKeyword = encodeURIComponent(searchQuery.trim());
      router.push(`/search?type=${type}&keyword=${encodedKeyword}`);
    }
  };

  const tabs = [
    { id: "services" as const, label: "서비스" },
    { id: "experts" as const, label: "전문가" },
    { id: "portfolio" as const, label: "포트폴리오" },
  ];

  const sortOptions = [
    { value: "relevance", label: "연관도순" },
    { value: "popularity", label: "인기순" },
    { value: "recommended", label: "추천순" },
    { value: "rating", label: "평점순" },
    { value: "newest", label: "신규등록순" },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-2 rounded-full bg-white p-2 shadow-[0_12px_32px_rgba(46,94,153,0.08)]">
          <div className="flex flex-1 items-center rounded-full px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service are you looking for?"
              className="h-12 w-full rounded-full border-none bg-transparent px-0 text-base text-[#0F172A] outline-none focus:shadow-[0_0_0_2px_rgba(46,94,153,0.16)]"
            />
          </div>
          <button
            type="submit"
            className="flex size-12 items-center justify-center rounded-full bg-[#2E5E99] text-white transition-colors hover:bg-[#1d4673] focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:ring-offset-2"
          >
            <Search className="size-5" />
          </button>
        </div>
      </form>

      {/* Tabs and Sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === tab.id
                  ? "border-b-2 border-[#2E5E99] text-[#2E5E99]"
                  : "text-slate-600 hover:text-[#2E5E99]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};


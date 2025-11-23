"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SearchHeader } from "./SearchHeader";
import { SearchFiltersBar } from "./SearchFiltersBar";
import { SearchTypeTabs } from "./SearchTypeTabs";
import { SearchResults } from "./SearchResults";
import { SellerGrid } from "./SellerGrid";
import { PortfolioGrid } from "./PortfolioGrid";
import { CategorySidebar } from "@/components/page/category/CategorySidebar";
import { CategoryEmptyState } from "@/components/page/category/CategoryEmptyState";
import { RelatedSearchTerms } from "./RelatedSearchTerms";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSearchType } from "@/hooks/useSearchType";
import { useSearchResult } from "@/hooks/useSearchResult";
import type { ViewMode, SortOption } from "@/components/page/category/types";

export const SearchResultsContent = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const sort = searchParams.get("sort") || "best";
  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const { currentType } = useSearchType();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("best");
  const [activeFilters, setActiveFilters] = useState(2);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  // Fetch search results
  const { data, isLoading, isError } = useSearchResult({
    type: currentType,
    keyword,
    sort,
    page,
  });

  // Generate related keyword tags
  const keywordTags = useMemo(() => {
    if (!keyword) return [];
    const baseTerms: Record<string, string[]> = {
      로고: ["로고디자인", "로고제작", "브랜딩", "CI", "BI", "디자인", "명함", "브랜드로고", "캐릭터로고"],
      디자인: ["로고디자인", "브랜드디자인", "UI/UX디자인", "그래픽디자인", "패키지디자인"],
      개발: ["웹개발", "앱개발", "프론트엔드", "백엔드", "풀스택"],
    };
    for (const [base, terms] of Object.entries(baseTerms)) {
      if (keyword.includes(base)) {
        return terms.slice(0, 8);
      }
    }
    return [`${keyword}디자인`, `${keyword}제작`, `${keyword}서비스`, `${keyword}전문가`];
  }, [keyword]);

  // Get total results and counts for tabs
  const totalResults = data?.total || 0;
  const counts = useMemo(() => {
    if (!data) return {};
    if (data.type === "gigs") {
      return { gigs: data.total };
    } else if (data.type === "sellers") {
      return { sellers: data.total };
    } else if (data.type === "portfolios") {
      return { portfolios: data.total };
    }
    return {};
  }, [data]);

  const handleClearFilters = () => {
    setActiveFilters(0);
  };

  // Get header text based on type
  const headerText = useMemo(() => {
    if (!keyword) return "검색 결과";
    if (currentType === "gigs") {
      return `'${keyword}' 검색 결과`;
    } else if (currentType === "sellers") {
      return `'${keyword}' 전문가 검색`;
    } else {
      return `'${keyword}' 포트폴리오 검색`;
    }
  }, [keyword, currentType]);

  const descriptionText = useMemo(() => {
    if (currentType === "gigs") {
      return `${keyword ? `${keyword}에 대한 ` : ""}${totalResults.toLocaleString()}개의 서비스를 찾았습니다.`;
    } else if (currentType === "sellers") {
      return `${keyword ? `${keyword}에 대한 ` : ""}${totalResults.toLocaleString()}명의 전문가를 찾았습니다.`;
    } else {
      return `${keyword ? `${keyword}에 대한 ` : ""}${totalResults.toLocaleString()}개의 포트폴리오를 찾았습니다.`;
    }
  }, [keyword, currentType, totalResults]);

  return (
    <main className="bg-white text-[#0F172A]">
      <SearchHeader 
        keyword={keyword} 
        totalResults={totalResults} 
        keywordTags={keywordTags}
        title={headerText}
        description={descriptionText}
      />

      {/* Search Type Tabs */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SearchTypeTabs counts={counts} />
      </div>

      <SearchFiltersBar
        totalResults={totalResults}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeFilters={activeFilters}
        onClearFilters={handleClearFilters}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onMobileFilterClick={() => setShowMobileFilters(true)}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 pt-8 lg:flex-row lg:px-6">
        {isDesktop && (
          <CategorySidebar onApply={() => undefined} onReset={handleClearFilters} />
        )}
        
        {/* Mobile Filter Modal */}
        {showMobileFilters && !isDesktop && (
          <div 
            className="fixed inset-0 z-50 flex items-end bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowMobileFilters(false);
              }
            }}
          >
            <div className="w-full rounded-t-3xl bg-white p-6 max-h-[80vh] overflow-y-auto">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#0F172A]">필터</h4>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="text-sm font-semibold text-[#2E5E99] hover:text-[#1d4673]"
                >
                  닫기
                </button>
              </div>
              <div className="xl:hidden">
                <CategorySidebar 
                  onApply={() => {
                    setShowMobileFilters(false);
                  }} 
                  onReset={handleClearFilters} 
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 space-y-10">
          {keyword && <RelatedSearchTerms keyword={keyword} />}
          
          {/* Loading State */}
          {isLoading && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-2xl border border-[#E2E8F0] bg-slate-100"
                />
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
              <p className="text-sm text-slate-500">검색 중 오류가 발생했습니다.</p>
            </div>
          )}

          {/* Results */}
          {!isLoading && !isError && data && (
            <>
              {currentType === "gigs" && data.type === "gigs" && (
                <SearchResults
                  keyword={keyword}
                  activeTab="services"
                  viewMode={viewMode}
                  currentPage={page}
                  totalPages={Math.ceil(data.total / 12)}
                  onPageChange={() => {}}
                  gigs={data.items}
                />
              )}
              
              {currentType === "sellers" && data.type === "sellers" && (
                <SellerGrid sellers={data.items} viewMode={viewMode} />
              )}
              
              {currentType === "portfolios" && data.type === "portfolios" && (
                <PortfolioGrid portfolios={data.items} viewMode={viewMode} />
              )}
              
              {data.items.length === 0 && (
                <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
                  <p className="text-sm text-slate-500">
                    {currentType === "gigs"
                      ? "조건에 맞는 서비스가 없어요. 필터를 변경해 보세요."
                      : currentType === "sellers"
                      ? "조건에 맞는 전문가가 없어요."
                      : "등록된 포트폴리오가 없습니다."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};


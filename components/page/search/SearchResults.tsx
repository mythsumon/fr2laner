"use client";

import { useMemo } from "react";
import { CategoryResults } from "@/components/page/category/CategoryResults";
import type { CategoryService, ViewMode } from "@/components/page/category/types";
import type { Gig } from "@/hooks/useSearchResult";

interface SearchResultsProps {
  keyword: string;
  activeTab: "services" | "experts" | "portfolio";
  viewMode: ViewMode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  gigs?: Gig[];
}

export const SearchResults = ({
  keyword,
  activeTab,
  viewMode,
  currentPage,
  totalPages,
  onPageChange,
  gigs = [],
}: SearchResultsProps) => {
  const services: CategoryService[] = useMemo(() => {
    if (activeTab === "services" && gigs.length > 0) {
      return gigs.map((gig) => ({
        id: gig.id,
        title: gig.title,
        sellerName: gig.sellerName,
        sellerAvatar: gig.sellerAvatar,
        sellerLevel: gig.sellerLevel,
        rating: gig.rating,
        reviews: gig.reviews,
        delivery: gig.delivery,
        revisions: gig.revisions,
        price: gig.price,
        thumb: gig.thumb,
        badge: gig.badge,
      }));
    }
    return [];
  }, [activeTab, gigs]);

  return (
    <CategoryResults
      services={services}
      viewMode={viewMode}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};


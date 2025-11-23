"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Static recommended keywords
const recommendedKeywords = [
  "로고",
  "명함",
  "상세페이지",
  "블로그",
  "리뷰",
  "PPT",
  "포토샵",
  "영상편집",
  "일러스트",
  "로고디자인",
];

// LocalStorage key for recent searches
const RECENT_SEARCHES_KEY = "hero_recent_searches";
const MAX_RECENT_SEARCHES = 5;

export const HeroSearch = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setRecentKeywords(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error("Error loading recent searches:", error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearches = (searches: string[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
      } catch (error) {
        console.error("Error saving recent searches:", error);
      }
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    if (isOpen || isFocused) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, isFocused]);

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && (isOpen || isFocused)) {
        setIsOpen(false);
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isFocused]);

  // Show dropdown when focused or query is not empty
  useEffect(() => {
    if (isFocused || query.trim().length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isFocused, query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const trimmedQuery = query.trim();
      
      // Add to recent searches (no duplicates, newest first, limit to MAX_RECENT_SEARCHES)
      const updatedRecent = [
        trimmedQuery,
        ...recentKeywords.filter((keyword) => keyword !== trimmedQuery),
      ].slice(0, MAX_RECENT_SEARCHES);
      
      setRecentKeywords(updatedRecent);
      saveRecentSearches(updatedRecent);

      // Navigate to search page
      const encodedKeyword = encodeURIComponent(trimmedQuery);
      router.push(`/search?type=gigs&keyword=${encodedKeyword}`);

      // Close dropdown
      setIsOpen(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    inputRef.current?.focus();
    // Trigger search immediately when clicking a keyword
    const encodedKeyword = encodeURIComponent(keyword);
    router.push(`/search?type=gigs&keyword=${encodedKeyword}`);
    
    // Update recent searches
    const updatedRecent = [
      keyword,
      ...recentKeywords.filter((k) => k !== keyword),
    ].slice(0, MAX_RECENT_SEARCHES);
    
    setRecentKeywords(updatedRecent);
    saveRecentSearches(updatedRecent);
    
    setIsOpen(false);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleClearRecent = () => {
    setRecentKeywords([]);
    saveRecentSearches([]);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Don't close immediately on blur - let click outside handler do it
    // This prevents closing when clicking inside the dropdown
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-[720px] lg:max-w-[840px]">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Pill */}
        <div
          className={`
            flex items-center gap-3 rounded-[999px] bg-white px-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)]
            transition-all duration-150
            ${isFocused || isOpen ? "shadow-[0_12px_28px_rgba(15,23,42,0.12)] scale-[1.01]" : ""}
            h-12 sm:h-14
          `}
        >
          {/* Left: Search Icon */}
          <Search className="size-5 flex-shrink-0 text-slate-500 sm:size-6" aria-hidden="true" />

          {/* Middle: Input Field */}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="어떤 전문가가 필요하세요?"
            aria-label="검색어 입력"
            className="
              flex-1 border-none bg-transparent text-sm text-[#0F172A] placeholder:text-slate-400
              focus:outline-none focus:ring-0
              sm:text-base
            "
          />

          {/* Right: Search Button */}
          {query.trim() && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex size-6 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:size-7"
              aria-label="검색어 삭제"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            type="submit"
            className="
              flex size-9 items-center justify-center rounded-full bg-[#0F172A] text-white
              transition-all duration-150 hover:bg-slate-800 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-2
              sm:size-10
            "
            aria-label="검색하기"
          >
            <Search className="size-4 sm:size-5" />
          </button>
        </div>
      </form>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="
            absolute left-0 top-full z-50 mt-2 w-full
            rounded-3xl border border-slate-100 bg-white
            shadow-[0_12px_40px_rgba(15,23,42,0.12)]
            overflow-hidden
          "
        >
          {/* 최근 검색어 Section */}
          {recentKeywords.length > 0 && (
            <div className="border-b border-slate-100 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-medium text-slate-400">최근 검색어</h3>
                <button
                  type="button"
                  onClick={handleClearRecent}
                  className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:underline hover:text-slate-600"
                  aria-label="전체 삭제"
                >
                  전체삭제
                  <X className="size-3" />
                </button>
              </div>
              <ul className="space-y-2">
                {recentKeywords.map((keyword, index) => (
                  <li key={`${keyword}-${index}`}>
                    <button
                      type="button"
                      onClick={() => handleKeywordClick(keyword)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-[#0F172A] transition-colors hover:bg-slate-50"
                    >
                      <Search className="size-4 flex-shrink-0 text-slate-400" />
                      <span className="flex-1 truncate">{keyword}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 추천 검색어 Section */}
          <div className="p-4">
            <h3 className="mb-3 text-xs font-medium text-slate-400">추천 검색어</h3>
            <div className="flex flex-wrap gap-2">
              {recommendedKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => handleKeywordClick(keyword)}
                  className="
                    inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1
                    text-xs text-[#0F172A] transition-all duration-150
                    hover:border-[#2E5E99] hover:bg-slate-50 hover:text-[#2E5E99]
                    focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:ring-offset-1
                  "
                >
                  <Search className="size-3 flex-shrink-0 text-slate-400" />
                  <span>{keyword}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

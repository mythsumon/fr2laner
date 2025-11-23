"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/components/shared/utils";

interface SearchHeaderProps {
  keyword: string;
  totalResults: number;
  keywordTags?: string[];
  title?: string;
  description?: string;
}

export const SearchHeader = ({ keyword, totalResults, keywordTags = [], title, description }: SearchHeaderProps) => {
  const { t } = useTranslation();
  const promoItems = useMemo(
    () => [
      {
        id: "deal",
        title: t("category.design.header.promos.deal.title"),
        description: t("category.design.header.promos.deal.description"),
        cta: t("category.design.header.promos.deal.cta"),
        badge: t("category.design.header.promos.deal.badge"),
        gradient: "from-[#E8F1FF] to-[#D3E3FF]",
      },
      {
        id: "guide",
        title: t("category.design.header.promos.guide.title"),
        description: t("category.design.header.promos.guide.description"),
        cta: t("category.design.header.promos.guide.cta"),
        badge: t("category.design.header.promos.guide.badge"),
        gradient: "from-[#FFE8F1] to-[#FFD6E5]",
      },
    ],
    [t]
  );
  const [activePromo, setActivePromo] = useState(0);

  const headerTitle = title || (keyword ? `'${keyword}' 검색 결과` : "검색 결과");
  const headerDescription = description || (keyword
    ? `${keyword}에 대한 ${totalResults.toLocaleString()}개의 검색 결과를 찾았습니다.`
    : "원하는 서비스를 검색해보세요.");

  return (
    <>
      <header className="mx-auto w-full max-w-7xl px-6 pt-12 pb-10">
        <nav className="mb-4 text-sm text-[#475569]" aria-label="Breadcrumb">
          <Link href="/" className="text-[#2E5E99] hover:underline">
            {t("category.design.header.breadcrumb.home")}
          </Link>{" "}
          <span className="mx-1">›</span>
          <span className="text-[#475569]">검색</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-[#0F172A]">{headerTitle}</h1>
              <p className="max-w-2xl text-lg text-[#475569]">{headerDescription}</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-[#E9EEF8] px-4 py-1.5 text-sm font-semibold text-[#2E5E99]">
                  총 {totalResults.toLocaleString()}개 결과
                </span>
              </div>
            </div>
            {keywordTags.length > 0 && (
              <div
                className="keyword-scroll flex gap-2 overflow-x-auto pb-2"
                aria-label="Related keywords"
              >
                {keywordTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="whitespace-nowrap rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          <aside className="relative" aria-live="polite">
            <div className="relative h-full overflow-hidden rounded-3xl bg-[#E8F1FF] shadow-[0_16px_40px_rgba(46,94,153,0.15)]">
              {promoItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "absolute inset-0 flex h-full w-full flex-col justify-between p-8 transition-opacity duration-500",
                    index === activePromo ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                >
                  <div className="space-y-3">
                    <span className="inline-flex w-fit items-center rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2E5E99]">
                      {item.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="text-sm text-[#475569]">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-fit items-center justify-center rounded-full border border-[#2E5E99] bg-white px-4 py-2 text-sm font-semibold text-[#2E5E99] transition-colors hover:bg-[#2E5E99] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
                  >
                    {item.cta}
                  </button>
                  <span className={cn("absolute inset-0 -z-10 bg-gradient-to-br opacity-70", item.gradient)} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2">
                {promoItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePromo(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === activePromo ? "w-6 bg-[#2E5E99]" : "w-3 bg-[#CBD5F5]"
                    )}
                    aria-label={`Promo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </header>
      <style jsx>{`
        .keyword-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .keyword-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};


"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";
import { cn } from "@/components/shared/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { SortOption, ViewMode } from "./types";

interface CategoryFiltersBarProps {
  totalResults: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeFilters: number;
  onClearFilters: () => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const CategoryFiltersBar = ({
  totalResults,
  viewMode,
  onViewModeChange,
  activeFilters,
  onClearFilters,
  sortOption,
  onSortChange,
}: CategoryFiltersBarProps) => {
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const sortOptions = useMemo(
    () => [
      { value: "best" as SortOption, label: t("category.design.filters.sort.best") },
      { value: "newest" as SortOption, label: t("category.design.filters.sort.newest") },
      { value: "priceAsc" as SortOption, label: t("category.design.filters.sort.priceAsc") },
      { value: "priceDesc" as SortOption, label: t("category.design.filters.sort.priceDesc") },
      { value: "rating" as SortOption, label: t("category.design.filters.sort.rating") },
    ],
    [t]
  );

  const filterChips = useMemo(
    () => [
      t("category.design.filters.labels.budget"),
      t("category.design.filters.labels.delivery"),
      t("category.design.filters.labels.level"),
      t("category.design.filters.labels.location"),
    ],
    [t]
  );

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 160);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setOpenPanel(null);
    }
  }, [isDesktop]);

  const sortLabel = useMemo(
    () => sortOptions.find((o) => o.value === sortOption)?.label ?? sortOptions[0].label,
    [sortOptions, sortOption]
  );

  const mobilePanel = openPanel && !isDesktop && openPanel !== "sort";

  return (
    <div className={cn("sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E2E8F0] transition-shadow", isSticky && "shadow-[0_6px_20px_rgba(46,94,153,0.08)]")}> 
      <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-2 md:hidden" aria-label={t("category.design.filters.mobileBarAria") ?? undefined}>
          <button
            type="button"
            onClick={() => setOpenPanel("Filters")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#0F172A]"
          >
            {t("category.design.filters.mobileFilters", { count: activeFilters })}
          </button>
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === "sort" ? null : "sort")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#0F172A]"
          >
            {t("category.design.filters.mobileSort")}
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange(viewMode === "grid" ? "list" : "grid")}
            className="flex w-12 items-center justify-center rounded-full border border-[#E2E8F0] px-3 py-2 text-sm font-semibold text-[#0F172A]"
            aria-label={t("category.design.filters.mobileViewToggle") ?? undefined}
          >
            {viewMode === "grid" ? "☰" : "☷"}
          </button>
        </div>

        <div className="hidden flex-col gap-4 md:flex md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-[#E2E8F0] bg-white p-1" role="group" aria-label={t("category.design.filters.viewAria") ?? undefined}>
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-semibold",
                  viewMode === "grid" ? "bg-[#2E5E99] text-white" : "text-[#475569]"
                )}
              >
                {t("category.design.filters.viewGrid")}
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-semibold",
                  viewMode === "list" ? "bg-[#2E5E99] text-white" : "text-[#475569]"
                )}
              >
                {t("category.design.filters.viewList")}
              </button>
            </div>
            <span className="text-sm text-[#475569]">{t("category.design.filters.resultCount", { count: totalResults })}</span>
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-3 md:justify-center">
            {filterChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setOpenPanel((prev) => (prev === chip ? null : chip))}
                className="rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={onClearFilters}
                className="text-sm font-semibold text-[#2E5E99] hover:text-[#1d4673] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                {t("category.design.filters.clearAll")}
              </button>
            )}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenPanel((prev) => (prev === "sort" ? null : "sort"))}
                className="flex items-center gap-2 rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                {t("category.design.filters.sortLabel", { label: sortLabel })}
              </button>
              {openPanel === "sort" && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_12px_32px_rgba(46,94,153,0.12)]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onSortChange(option.value);
                        setOpenPanel(null);
                      }}
                      className={cn(
                        "w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9]",
                        sortOption === option.value ? "text-[#2E5E99]" : undefined
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {(openPanel && openPanel !== "sort" && isDesktop) && (
        <div className="border-t border-[#E2E8F0] bg-white/95">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
            {openPanel === filterChips[0] && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.budget")}</h4>
                <div className="flex flex-wrap gap-2">
                  {(t("category.design.filters.budgetQuick", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <Button key={label} type="default" shape="round" className="border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:border-[#2E5E99] hover:text-[#2E5E99]">
                        {label}
                      </Button>
                    ))}
                </div>
                <input type="range" className="w-full" min={0} max={1000} aria-label={t("category.design.filters.budgetSlider") ?? undefined} />
              </div>
            )}
            {openPanel === filterChips[1] && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.delivery")}</h4>
                <div className="flex flex-wrap gap-2">
                  {(t("category.design.filters.deliveryOptions", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <Button key={label} type="default" shape="round" className="border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:border-[#2E5E99] hover:text-[#2E5E99]">
                        {label}
                      </Button>
                    ))}
                </div>
              </div>
            )}
            {openPanel === filterChips[2] && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.level")}</h4>
                <div className="flex flex-wrap gap-2">
                  {(t("category.design.filters.levelOptions", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <Button key={label} type="default" shape="round" className="border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:border-[#2E5E99] hover:text-[#2E5E99]">
                        {label}
                      </Button>
                    ))}
                </div>
              </div>
            )}
            {openPanel === filterChips[3] && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.location")}</h4>
                <select className="w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm text-[#475569] focus:border-[#2E5E99] focus:outline-none">
                  {(t("category.design.filters.locationOptions", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <option key={label}>{label}</option>
                    ))}
                </select>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#475569]">
                  <input type="checkbox" className="accent-[#2E5E99]" /> {t("category.design.filters.remoteToggle")}
                </label>
              </div>
            )}
            <div className="flex gap-3 whitespace-nowrap">
              <Button
                type="default"
                shape="round"
                className="border border-[#E2E8F0] bg-white px-5 py-2 text-sm font-semibold text-[#475569] hover:border-[#2E5E99] hover:text-[#2E5E99]"
                onClick={() => setOpenPanel(null)}
              >
                {t("category.design.filters.cancel")}
              </Button>
              <Button
                type="primary"
                shape="round"
                className="px-5 py-2 text-sm font-semibold"
                onClick={() => setOpenPanel(null)}
              >
                {t("category.design.filters.apply")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {openPanel === "sort" && !isDesktop && (
        <div className="fixed inset-0 z-40 flex items-end bg-black/30 backdrop-blur-sm md:hidden">
          <div className="w-full rounded-t-3xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-base font-semibold text-[#0F172A]">{t("category.design.filters.sortSheetTitle")}</h4>
              <button type="button" className="text-sm font-semibold text-[#2E5E99]" onClick={() => setOpenPanel(null)}>
                {t("category.design.filters.close")}
              </button>
            </div>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    setOpenPanel(null);
                  }}
                  className={cn(
                    "w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold",
                    sortOption === option.value ? "bg-[#E9EEF8] text-[#2E5E99]" : "text-[#475569]"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobilePanel && (
        <div className="fixed inset-0 z-40 flex items-end bg-black/30 backdrop-blur-sm md:hidden">
          <div className="w-full rounded-t-3xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-base font-semibold text-[#0F172A]">{t("category.design.filters.filtersSheetTitle")}</h4>
              <button type="button" className="text-sm font-semibold text-[#2E5E99]" onClick={() => setOpenPanel(null)}>
                {t("category.design.filters.close")}
              </button>
            </div>
            <div className="space-y-6">
              <section className="space-y-3">
                <h5 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.budget")}</h5>
                <div className="flex flex-wrap gap-2">
                  {(t("category.design.filters.budgetQuick", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <Button key={label} type="default" shape="round" className="border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569]">
                        {label}
                      </Button>
                    ))}
                </div>
              </section>
              <section className="space-y-3">
                <h5 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.delivery")}</h5>
                <div className="flex flex-wrap gap-2">
                  {(t("category.design.filters.deliveryOptions", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <Button key={label} type="default" shape="round" className="border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569]">
                        {label}
                      </Button>
                    ))}
                </div>
              </section>
              <section className="space-y-3">
                <h5 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.level")}</h5>
                <div className="flex flex-wrap gap-2">
                  {(t("category.design.filters.levelOptions", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <Button key={label} type="default" shape="round" className="border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569]">
                        {label}
                      </Button>
                    ))}
                </div>
              </section>
              <section className="space-y-3">
                <h5 className="text-sm font-semibold text-[#0F172A]">{t("category.design.filters.labels.location")}</h5>
                <select className="w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm text-[#475569] focus:border-[#2E5E99] focus:outline-none">
                  {(t("category.design.filters.locationOptions", { returnObjects: true }) as string[])
                    .map((label: string) => (
                      <option key={label}>{label}</option>
                    ))}
                </select>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#475569]">
                  <input type="checkbox" className="accent-[#2E5E99]" /> {t("category.design.filters.remoteToggle")}
                </label>
              </section>
            </div>
            <div className="mt-6 flex gap-3">
              <Button type="default" shape="round" className="flex-1 border border-[#E2E8F0] bg-white px-5 py-2 text-sm font-semibold text-[#475569]" onClick={onClearFilters}>
                {t("category.design.filters.reset")}
              </Button>
              <Button type="primary" shape="round" className="flex-1 px-5 py-2 text-sm font-semibold" onClick={() => setOpenPanel(null)}>
                {t("category.design.filters.apply")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

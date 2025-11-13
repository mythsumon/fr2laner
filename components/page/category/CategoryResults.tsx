"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";
import { cn } from "@/components/shared/utils";
import type { CategoryService, ViewMode } from "./types";

interface CategoryResultsProps {
  services: CategoryService[];
  viewMode: ViewMode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const insertSponsored = (items: CategoryService[]) => {
  const result: Array<CategoryService & { isSponsored?: boolean }> = [];
  items.forEach((item, index) => {
    result.push(item);
    if ((index + 1) % 8 === 0) {
      result.push({ ...items[index % items.length], id: `${item.id}-s-${index}`, sponsored: true, badge: item.badge, isSponsored: true });
    }
  });
  return result;
};

const GridCard = ({ service }: { service: CategoryService }) => {
  const { t } = useTranslation();
  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(46,94,153,0.12)]">
      <div className="relative overflow-hidden rounded-[12px]">
        <Image
          src={service.thumb}
          alt={service.title}
          width={640}
          height={480}
          className="aspect-[4/3] w-full rounded-[12px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {service.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2E5E99]">
            {t(`category.design.cards.badges.${service.badge}`)}
          </span>
        )}
        <button type="button" className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-[#2E5E99] shadow hover:bg-white" aria-label={t("category.design.cards.favoriteAria") ?? undefined}>
          ♥
        </button>
        {service.sponsored && (
          <span className="absolute left-3 bottom-3 rounded-full bg-[#FFD6E5] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#992E5E]">
            {t("category.design.cards.sponsored")}
          </span>
        )}
      </div>
      <h3 className="line-clamp-2 text-base font-semibold text-[#0F172A]">{service.title}</h3>
      <div className="flex items-center gap-3 text-sm text-[#475569]">
        <Image src={service.sellerAvatar} alt={service.sellerName} width={32} height={32} className="size-8 rounded-full object-cover" />
        <span className="font-semibold text-[#0F172A]">{service.sellerName}</span>
        <span className="rounded-full bg-[#E9EEF8] px-2 py-0.5 text-xs font-semibold text-[#2E5E99]">{service.sellerLevel}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#475569]">
        <span className="flex items-center gap-1 text-[#F59E0B]">
          ★
          <span className="font-semibold text-[#475569]">{service.rating.toFixed(1)}</span>
        </span>
        <span className="text-[#94A3B8]">{t("category.design.cards.reviewCount", { count: service.reviews })}</span>
        <span className="text-[#94A3B8]">• {service.delivery}</span>
        <span className="text-[#94A3B8]">• {service.revisions}</span>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-[#0F172A]">{t("category.design.cards.price", { price: service.price.toLocaleString() })}</span>
        <Button type="primary" shape="round" className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {t("category.design.cards.cta")}
        </Button>
      </div>
    </article>
  );
};

const ListCard = ({ service }: { service: CategoryService }) => {
  const { t } = useTranslation();
  return (
    <article className="group grid gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(46,94,153,0.12)] md:grid-cols-[260px_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-[12px]">
        <Image
          src={service.thumb}
          alt={service.title}
          width={640}
          height={360}
          className="aspect-[16/9] w-full rounded-[12px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {service.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2E5E99]">
            {t(`category.design.cards.badges.${service.badge}`)}
          </span>
        )}
        {service.sponsored && (
          <span className="absolute left-3 bottom-3 rounded-full bg-[#FFD6E5] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#992E5E]">
            {t("category.design.cards.sponsored")}
          </span>
        )}
      </div>
      <div className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#0F172A]">{service.title}</h3>
          <p className="line-clamp-2 text-sm text-[#475569]">
            {t("category.design.cards.listExcerpt")}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#475569]">
          <Image src={service.sellerAvatar} alt={service.sellerName} width={32} height={32} className="size-8 rounded-full object-cover" />
          <span className="font-semibold text-[#0F172A]">{service.sellerName}</span>
          <span className="rounded-full bg-[#E9EEF8] px-2 py-0.5 text-xs font-semibold text-[#2E5E99]">{service.sellerLevel}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#475569]">
          <span className="flex items-center gap-1 text-[#F59E0B]">
            ★
            <span className="font-semibold text-[#475569]">{service.rating.toFixed(1)}</span>
          </span>
          <span className="text-[#94A3B8]">{t("category.design.cards.reviewCount", { count: service.reviews })}</span>
          <span className="text-[#94A3B8]">• {service.delivery}</span>
          <span className="text-[#94A3B8]">• {service.revisions}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-[#0F172A]">{t("category.design.cards.price", { price: service.price.toLocaleString() })}</span>
          <Button type="primary" shape="round">
            {t("category.design.cards.cta")}
          </Button>
        </div>
      </div>
    </article>
  );
};

export const CategoryResults = ({ services, viewMode, currentPage, totalPages, onPageChange }: CategoryResultsProps) => {
  const { t } = useTranslation();
  const items = useMemo(() => insertSponsored(services), [services]);
  const pages = Array.from({ length: totalPages }).map((_, index) => index + 1);

  if (!services.length) {
    return null;
  }

  return (
    <div className="space-y-10">
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
        )}
      >
        {items.map((service) =>
          viewMode === "grid" ? <GridCard key={service.id} service={service} /> : <ListCard key={service.id} service={service} />
        )}
      </div>
      <div className="flex items-center justify-center gap-3" aria-label={t("category.design.pagination.aria") ?? undefined}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-[#E2E8F0] text-sm font-semibold text-[#475569] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]",
              page === currentPage && "border-[#2E5E99] bg-[#2E5E99] text-white"
            )}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

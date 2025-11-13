"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";
import { homeServices } from "@/entities/home";
import type { HomeServiceCategory } from "@/entities/home";

const tabOrder: HomeServiceCategory[] = ["all", "design", "development", "marketing", "writing", "video", "ai"];

export const FeaturedServices = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<HomeServiceCategory>("all");

  const tabs = useMemo(
    () =>
      tabOrder.map((value) => ({
        value,
        label: t(`home.services.tabs.${value}`),
      })),
    [t]
  );

  const filteredServices = useMemo(() => {
    if (activeTab === "all") {
      return homeServices;
    }
    return homeServices.filter((service) => service.category === activeTab);
  }, [activeTab]);

  return (
    <section id="featured-services" className="bg-white pt-20 pb-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2E5E99]">
              {t("home.sections.services.label", { defaultValue: "Services" })}
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#0F172A]">
              {t("home.services.title")}
            </h2>
          </div>
          <Link
            href="#"
            className="text-sm font-semibold text-[#2E5E99] transition-colors hover:text-[#1d4673] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
          >
            {t("home.services.actions.seeMore")}
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
              <Button
                key={tab.value}
                type={isActive ? "primary" : "default"}
                shape="round"
                className={
                  isActive
                    ? "border-none bg-[#2E5E99] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1d4673]"
                    : "border border-[#E2E8F0] bg-white px-5 py-2 text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9]"
                }
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-[#E9EEF8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2E5E99]">
                {t(`home.services.tabs.${service.category}`)}
              </span>
              <div className="relative overflow-hidden rounded-[12px]">
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="line-clamp-2 text-base font-semibold text-[#0F172A]">
                {t(service.titleKey)}
              </h3>
              <div className="mt-auto flex items-center gap-3">
                <img
                  src={service.sellerAvatar}
                  alt={t(service.sellerNameKey)}
                  className="size-8 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="text-sm font-medium text-[#475569]">{t(service.sellerNameKey)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#475569]">
                <span className="flex items-center gap-1 text-[#F59E0B]">
                  ★
                  <span className="font-semibold text-[#475569]">{service.rating.toFixed(1)}</span>
                </span>
                <span className="text-[#94A3B8]">{t(service.reviewsKey)}</span>
                <span className="ml-auto font-semibold text-[#0F172A]">{t(service.priceKey)}</span>
              </div>
              <div className="flex justify-end">
                <Button
                  type="primary"
                  shape="round"
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  {t("home.services.actions.view")}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

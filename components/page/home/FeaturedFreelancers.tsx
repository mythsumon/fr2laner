"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";
import { homeFreelancers } from "@/entities/home";
import type { HomeFreelancerTag } from "@/entities/home";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";

const tabs: HomeFreelancerTag[] = ["topRated", "newArrivals", "mostHired"];

export const FeaturedFreelancers = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<HomeFreelancerTag>("topRated");

  const tabItems = useMemo(
    () =>
      tabs.map((value) => ({
        value,
        label: t(`home.freelancers.tabs.${value}`),
      })),
    [t]
  );

  const filteredFreelancers = useMemo(
    () => homeFreelancers.filter((freelancer) => freelancer.tag === activeTab),
    [activeTab]
  );

  return (
    <section id="featured-freelancers" className="bg-white pt-20 pb-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            label={t("home.sections.freelancers.label", { defaultValue: "FREELANCERS" })}
            title={t("home.freelancers.title")}
            description={t("home.freelancers.subtitle", {
              defaultValue: "Top freelancers curated for quality results.",
            })}
          />
          <Link
            href="#"
            className="text-sm font-semibold text-[#2E5E99] transition-colors hover:text-[#1d4673] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
          >
            {t("home.freelancers.actions.seeMore", { defaultValue: "See More →" })}
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {tabItems.map((tab) => {
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
          {filteredFreelancers.map((freelancer) => (
            <article
              key={freelancer.id}
              className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center transition-transform duration-200 hover:-translate-y-1"
            >
              <img
                src={freelancer.avatar}
                alt={t(freelancer.nameKey)}
                className="h-24 w-24 rounded-full object-cover shadow-md ring-4 ring-white"
                loading="lazy"
              />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#0F172A]">{t(freelancer.nameKey)}</h3>
                <span className="inline-flex items-center rounded-full bg-[#E9EEF8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2E5E99]">
                  {t(freelancer.roleKey)}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-[#475569]">{t(freelancer.taglineKey)}</p>
              <div className="flex items-center gap-1 text-sm text-[#F59E0B]">
                ★
                <span className="font-semibold text-[#475569]">{freelancer.rating.toFixed(1)}</span>
                <span className="text-[#94A3B8]">{t(freelancer.reviewsKey)}</span>
              </div>
              <Button
                type="default"
                shape="round"
                className="w-full border border-[#2E5E99] bg-transparent text-sm font-semibold text-[#2E5E99] transition-colors hover:bg-[#2E5E99] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                {t("home.freelancers.actions.viewProfile")}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

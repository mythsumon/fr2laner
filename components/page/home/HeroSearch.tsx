"use client";

import { ChevronDown, MapPin, Search, Wifi } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@/components/shared/common";

const utilityFilters = [
  { key: "home.hero.filters.location", icon: <MapPin className="size-4 text-[#2E5E99]" /> },
  { key: "home.hero.filters.remote", icon: <Wifi className="size-4 text-[#2E5E99]" /> },
];

export const HeroSearch = () => {
  const { t } = useTranslation();

  return (
    <div id="hero-search" className="w-full max-w-[560px] space-y-6">
      <form className="rounded-full bg-white p-2 shadow-[0_12px_32px_rgba(46,94,153,0.08)]" aria-label={t("home.hero.search.placeholder")!}>
        <div className="flex items-center gap-2">
          <Button
            type="default"
            shape="round"
            className="flex h-14 flex-shrink-0 items-center gap-2 rounded-full border-none bg-[#F1F5F9] px-4 text-sm font-semibold text-[#2E5E99] transition-colors hover:bg-[#E2E8F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
            rightIcon={<ChevronDown className="size-4 text-[#475569]" />}
          >
            {t("home.hero.search.categoryLabel")}
          </Button>
          <div className="flex flex-1 items-center rounded-full px-2">
            <Input
              placeholder={t("home.hero.search.placeholder")!}
              className="!h-14 !rounded-full !border-none !bg-transparent !px-0 !text-base !text-[#0F172A] focus:!border-none focus:!shadow-[0_0_0_2px_rgba(46,94,153,0.16)]"
            />
          </div>
          <Button
            type="primary"
            shape="circle"
            size="large"
            className="flex size-14 items-center justify-center bg-[#2E5E99] text-white transition-colors hover:bg-[#1d4673] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
            leftIcon={<Search className="size-5" />}
            aria-label={t("home.hero.search.cta")!}
          />
        </div>
      </form>

      <div className="flex w-full flex-wrap items-center gap-3 text-sm font-medium text-[#475569]">
        <div className="flex items-center gap-2">
          {utilityFilters.map((filter) => (
            <Button
              key={filter.key}
              type="default"
              shape="round"
              className="flex items-center gap-2 border border-[#E0E0E0] bg-white px-4 py-2 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2E5E99]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              leftIcon={filter.icon}
            >
              {t(filter.key)}
            </Button>
          ))}
        </div>
        <span className="text-sm font-medium text-[#94A3B8]">{t("home.hero.trust")}</span>
      </div>
    </div>
  );
};

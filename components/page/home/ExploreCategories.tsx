"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { homeCategoryCards } from "@/entities/home";

export const ExploreCategories = () => {
  const { t } = useTranslation();
  const cards = homeCategoryCards.slice(0, 8);

  return (
    <section id="explore-categories" className="bg-white pt-20 pb-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2E5E99]">
              {t("home.sections.categories.label", { defaultValue: "Categories" })}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A]">
              {t("home.categories.title")}
            </h2>
          </div>
          <Link
            href="#"
            className="whitespace-nowrap text-sm font-semibold text-[#2E5E99] transition-colors hover:text-[#1d4673] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
          >
            {t("home.categories.cta")} →
          </Link>
        </div>

        <div className="hidden gap-6 lg:grid lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-[0_12px_32px_rgba(46,94,153,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(46,94,153,0.12)]"
            >
              <img src={card.image} alt={t(card.altKey)} className="h-24 w-24 object-contain" loading="lazy" />
              <h3 className="text-base font-semibold text-[#0F172A]">{t(card.labelKey)}</h3>
            </article>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto lg:hidden" aria-label={t("home.categories.title")}>
          {cards.map((card) => (
            <span
              key={card.id}
              className="flex min-w-[160px] items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#2E5E99] shadow-[0_6px_16px_rgba(46,94,153,0.08)]"
            >
              {t(card.labelKey)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};



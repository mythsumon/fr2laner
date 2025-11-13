"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/components/shared/utils";

export const CategorySeoFaq = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(t("category.design.seoFAQ.faq.0.question"));
  const faqItems = t("category.design.seoFAQ.faq", { returnObjects: true }) as Array<{ question: string; answer: string }>;
  const recentlyViewed = t("category.design.seoFAQ.recentlyViewed", { returnObjects: true }) as Array<{ id: string; title: string; thumb: string }>;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20">
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-10 shadow-[0_16px_40px_rgba(46,94,153,0.08)]">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">{t("category.design.seoFAQ.heading")}</h2>
          <p className="text-sm leading-6 text-[#475569]">{t("category.design.seoFAQ.intro")}</p>
          <div className={cn("overflow-hidden transition-all", expanded ? "max-h-[400px]" : "max-h-[120px]")}
          >
            <p className="text-sm leading-6 text-[#475569]">{t("category.design.seoFAQ.body1")}</p>
            <p className="mt-3 text-sm leading-6 text-[#475569]">{t("category.design.seoFAQ.body2")}</p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-sm font-semibold text-[#2E5E99] hover:text-[#1d4673]"
          >
            {expanded ? t("category.design.seoFAQ.showLess") : t("category.design.seoFAQ.readMore")}
          </button>
        </div>

        <div className="mt-10 space-y-4">
          <h3 className="text-xl font-semibold text-[#0F172A]">{t("category.design.seoFAQ.faqTitle")}</h3>
          <div className="space-y-3">
            {faqItems.map((item) => {
              const isOpen = openFaq === item.question;
              return (
                <div key={item.question} className="rounded-2xl border border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((prev) => (prev === item.question ? null : item.question))}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-[#0F172A]"
                  >
                    {item.question}
                    <span className="text-lg text-[#2E5E99]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-sm text-[#475569]">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <h3 className="text-xl font-semibold text-[#0F172A]">{t("category.design.seoFAQ.recentlyTitle")}</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map((item) => (
              <div key={item.id} className="w-60 shrink-0 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
                <Image
                  src={item.thumb}
                  alt={item.title}
                  width={240}
                  height={160}
                  className="mb-3 h-32 w-full rounded-xl object-cover"
                />
                <p className="text-sm font-semibold text-[#0F172A]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

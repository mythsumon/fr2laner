"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";

interface CategorySidebarProps {
  onApply: () => void;
  onReset: () => void;
}

export const CategorySidebar = ({ onApply, onReset }: CategorySidebarProps) => {
  const { t } = useTranslation();
  const subcategories = t("category.design.sidebar.subcategories", { returnObjects: true }) as string[];
  const budgetQuick = t("category.design.filters.budgetQuick", { returnObjects: true }) as string[];
  const deliveryOptions = t("category.design.filters.deliveryOptions", { returnObjects: true }) as string[];
  const levelOptions = t("category.design.filters.levelOptions", { returnObjects: true }) as string[];
  const locationOptions = t("category.design.filters.locationOptions", { returnObjects: true }) as string[];

  return (
    <aside className="hidden w-[280px] shrink-0 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] xl:block" aria-label={t("category.design.sidebar.aria") ?? undefined}>
      <div className="space-y-6">
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">{t("category.design.sidebar.subcategoriesTitle")}</h3>
          <div className="flex flex-col gap-2 text-sm text-[#475569]">
            {subcategories.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#2E5E99]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">{t("category.design.filters.labels.budget")}</h3>
          <input type="range" className="w-full" min={0} max={1000} aria-label={t("category.design.filters.budgetSlider") ?? undefined} />
          <div className="grid grid-cols-2 gap-2 text-sm text-[#475569]">
            {budgetQuick.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-[#E2E8F0] px-3 py-2 font-semibold hover:border-[#2E5E99] hover:text-[#2E5E99]"
              >
                {item}
              </button>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">{t("category.design.filters.labels.delivery")}</h3>
          <div className="flex flex-col gap-2 text-sm text-[#475569]">
            {deliveryOptions.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="radio" name="delivery" className="accent-[#2E5E99]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">{t("category.design.filters.labels.level")}</h3>
          <div className="flex flex-col gap-2 text-sm text-[#475569]">
            {levelOptions.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#2E5E99]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">{t("category.design.filters.labels.location")}</h3>
          <select className="w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm text-[#475569] focus:border-[#2E5E99] focus:outline-none">
            {locationOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#475569]">
            <input type="checkbox" className="accent-[#2E5E99]" /> {t("category.design.filters.remoteToggle")}
          </label>
        </section>
      </div>
      <div className="mt-8 flex gap-3">
        <Button
          type="default"
          shape="round"
          className="flex-1 border border-[#E2E8F0] bg-white px-5 py-2 text-sm font-semibold text-[#475569] hover:border-[#2E5E99] hover:text-[#2E5E99]"
          onClick={onReset}
        >
          {t("category.design.filters.reset")}
        </Button>
        <Button type="primary" shape="round" className="flex-1 px-5 py-2 text-sm font-semibold" onClick={onApply}>
          {t("category.design.filters.apply")}
        </Button>
      </div>
    </aside>
  );
};

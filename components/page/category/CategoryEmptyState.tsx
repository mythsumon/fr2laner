"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";

interface CategoryEmptyStateProps {
  onClear: () => void;
}

export const CategoryEmptyState = ({ onClear }: CategoryEmptyStateProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#CBD5F5] bg-[#F8FAFC] px-10 py-20 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#E9EEF8] text-4xl text-[#2E5E99]" aria-hidden="true">
        ☹️
      </div>
      <h3 className="text-2xl font-semibold text-[#0F172A]">{t("category.design.emptyState.title")}</h3>
      <p className="mt-3 max-w-lg text-sm text-[#475569]">{t("category.design.emptyState.description")}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="primary"
          shape="round"
          className="px-6 py-2 text-sm font-semibold"
          onClick={onClear}
        >
          {t("category.design.emptyState.clear")}
        </Button>
        <Button type="default" shape="round" className="px-6 py-2 text-sm font-semibold text-[#2E5E99]" href="#">
          {t("category.design.emptyState.back")}
        </Button>
      </div>
    </div>
  );
};

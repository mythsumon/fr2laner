"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";

export const FinalCallToAction = () => {
  const { t } = useTranslation();

  return (
    <section id="cta" className="bg-[#2E5E99] py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center text-white">
        <h2 className="text-4xl font-bold leading-tight tracking-tight">{t("home.cta.title")}</h2>
        <p className="text-lg text-white/80">{t("home.cta.subtitle")}</p>
        <Button
          type="default"
          shape="round"
          className="mt-4 h-14 bg-white px-8 text-base font-bold text-[#2E5E99] transition-colors hover:bg-[#E2E8F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t("home.cta.button")}
        </Button>
      </div>
    </section>
  );
};



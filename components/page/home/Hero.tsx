"use client";

import { useTranslation } from "react-i18next";
import { HeroSearch } from "./HeroSearch";
import { HeroSlider } from "./HeroSlider";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white" aria-labelledby="home-hero-heading">
      <div className="mx-auto grid min-h-[820px] w-full max-w-7xl grid-cols-1 items-center gap-y-16 px-6 pb-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="space-y-6">
              <h1
                id="home-hero-heading"
                className="text-5xl font-extrabold leading-tight tracking-tight text-[#2E5E99] sm:text-6xl lg:text-[72px] lg:leading-[1.05]"
              >
                {t("home.hero.title")}
              </h1>
              <p className="mx-auto max-w-[560px] text-lg text-[#475569] lg:mx-0">
                {t("home.hero.subtitle")}
              </p>
            </div>
            <div className="mt-10 w-full">
              <HeroSearch />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
          <HeroSlider />
        </div>
      </div>
    </section>
  );
};

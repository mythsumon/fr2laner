"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/common";
import { cn } from "@/components/shared/utils";

interface SlideConfig {
  id: string;
  theme: string;
  accent: string;
}

const slideConfigs: SlideConfig[] = [
  { id: "refer", theme: "#E8F1FF", accent: "#2E5E99" },
  { id: "talent", theme: "#F5E8FF", accent: "#5E2E99" },
  { id: "quality", theme: "#FFE8F1", accent: "#992E5E" },
];

export const HeroSlider = () => {
  const { t } = useTranslation();
  const slides = useMemo(
    () =>
      slideConfigs.map((config) => ({
        ...config,
        badge: t("home.slider.badge"),
        title: t(`home.slider.items.${config.id}.title`),
        description: t(`home.slider.items.${config.id}.description`),
        cta: t(`home.slider.items.${config.id}.cta`),
      })),
    [t]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isHovering) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, isHovering, slides.length]);

  const goToSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <div
      id="hero-slider"
      className="relative w-full max-w-[480px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-[320px] overflow-hidden rounded-[24px] shadow-[0_12px_32px_rgba(46,94,153,0.1)]">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={slide.id}
              className={cn(
                "absolute inset-0 flex h-full w-full flex-col justify-between rounded-[24px] p-8",
                prefersReducedMotion ? "" : "transition-opacity duration-500",
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              style={{ backgroundColor: slide.theme }}
              aria-hidden={!isActive}
            >
              <span
                className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{ color: slide.accent, borderColor: slide.accent }}
              >
                {slide.badge}
              </span>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold leading-tight" style={{ color: slide.accent }}>
                  {slide.title}
                </h3>
                <p className="text-sm text-[#475569]">{slide.description}</p>
                <Button
                  type="default"
                  shape="round"
                  className="border px-6 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
                  style={{ borderColor: slide.accent, color: slide.accent }}
                >
                  {slide.cta}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === activeIndex ? "w-6 bg-[#2E5E99]" : "w-3 bg-[#CBD5F5]"
            )}
            aria-label={t("home.slider.actions.goTo", { index: index + 1 })!}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

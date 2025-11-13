"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { chunkArray, cn } from "@/components/shared/utils";
import { homeTestimonials } from "@/entities/home";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Testimonials = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const itemsPerSlide = isDesktop ? 3 : isTablet ? 2 : 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    setPrefersReducedMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const slides = useMemo(() => {
    const base = chunkArray(homeTestimonials, itemsPerSlide);
    if (base.length > 1) {
      return base;
    }
    const doubled = chunkArray([...homeTestimonials, ...homeTestimonials], itemsPerSlide);
    return doubled.slice(0, Math.max(2, doubled.length));
  }, [itemsPerSlide]);

  useEffect(() => {
    setActiveSlide(0);
  }, [itemsPerSlide]);

  useEffect(() => {
    if (prefersReducedMotion || isHovering) return;
    if (slides.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, isHovering, slides.length]);

  return (
    <section id="testimonials" className="bg-[#F8FAFC] pt-20 pb-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2E5E99]">
            {t("home.sections.testimonials.label", { defaultValue: "Testimonials" })}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A]">{t("home.testimonials.title")}</h2>
          <p className="mt-4 text-lg text-[#475569]">{t("home.testimonials.subtitle")}</p>
        </div>

        <div
          className="relative min-h-[280px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={`testimonial-slide-${index}`}
                className={cn(
                  "absolute inset-0 grid gap-6 transition-opacity duration-500",
                  itemsPerSlide === 3 ? "md:grid-cols-2 xl:grid-cols-3" : itemsPerSlide === 2 ? "md:grid-cols-2" : "grid-cols-1",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                {slide.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="flex h-full flex-col gap-4 rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(46,94,153,0.08)]"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={t(testimonial.nameKey)}
                        className="h-14 w-14 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-lg font-semibold text-[#0F172A]">{t(testimonial.nameKey)}</p>
                        <span className="text-sm text-[#94A3B8]">{t(testimonial.roleKey)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={`${testimonial.id}-star-${starIndex}`}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-[#475569]">{t(testimonial.quoteKey)}</p>
                  </article>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={`testimonial-dot-${index}`}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeSlide ? "w-6 bg-[#2E5E99]" : "w-3 bg-[#CBD5F5]"
              )}
              aria-label={t("home.testimonials.actions.goTo", { index: index + 1, defaultValue: "Go to testimonial" })!}
              aria-pressed={index === activeSlide}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

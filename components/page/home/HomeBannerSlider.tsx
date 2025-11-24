"use client";

import { useState, useEffect } from "react";
import { useHomeData } from "@/contexts/HomeDataContext";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/common";
import { Wifi, Grid3x3, RefreshCw } from "lucide-react";
import { cn } from "@/components/shared/utils";

export const HomeBannerSlider = () => {
  const { banners } = useHomeData();
  const activeBanners = banners.filter((b) => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    if (activeBanners.length === 0 || prefersReducedMotion || isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeBanners.length, prefersReducedMotion, isHovering]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-full">
        <div className="relative overflow-hidden">
          {/* Background Image or Color */}
          <div
            className="relative h-[300px] md:h-[350px] bg-gradient-to-br from-[#1e4a7a] via-[#2E5E99] to-[#1e4a7a]"
            style={{
              backgroundImage: currentBanner.image
                ? `url(${currentBanner.image})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e4a7a]/90 via-[#2E5E99]/80 to-[#1e4a7a]/90" />

            {/* Icons in top right corner */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                <Wifi className="size-4 text-white" />
              </div>
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                <Grid3x3 className="size-4 text-white" />
              </div>
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                <RefreshCw className="size-4 text-white" />
              </div>
            </div>

            {/* Content with fade transition */}
            <div className="relative h-full flex items-center justify-center">
              {activeBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
                    index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <div className="text-center px-6 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                      {banner.title || "아이디어를 현실로 만들 준비 되셨나요?"}
                    </h2>
                    <p className="text-base md:text-lg text-white/90 mb-4">
                      {banner.subtitle || "지금 프로젝트를 등록하고 재능 있는 프리랜서의 제안을 받아보세요."}
                    </p>
                    <Link href={banner.url || "/signup"}>
                      <Button
                        type="default"
                        shape="round"
                        className="h-11 px-6 bg-white text-[#2E5E99] text-sm font-bold hover:bg-white/90 transition-colors shadow-lg"
                      >
                        프로젝트 시작하기
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            {activeBanners.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {activeBanners.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/75"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Navigation Arrows */}
            {activeBanners.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goToSlide((currentIndex - 1 + activeBanners.length) % activeBanners.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide((currentIndex + 1) % activeBanners.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
                  aria-label="Next slide"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


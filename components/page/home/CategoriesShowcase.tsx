"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Briefcase,
  Building2,
  Camera,
  Flag,
  Gift,
  Home as HomeIcon,
  Laptop,
  Lightbulb,
  Megaphone,
  Palette,
  Scale,
  Sparkles,
  FileText,
  Tag,
} from "lucide-react";
import { homePrimaryCategories, type HomePrimaryCategoryIcon } from "@/entities/home";
import { cn } from "@/components/shared/utils";
import { useHomeData } from "@/contexts/HomeDataContext";
import { useMemo } from "react";

const iconMap: Record<HomePrimaryCategoryIcon | string, LucideIcon> = {
  palette: Palette,
  laptopCode: Laptop,
  cameraAudio: Camera,
  megaphone: Megaphone,
  pencilDocument: FileText,
  buildingArrow: Building2,
  scale: Scale,
  openBook: BookOpen,
  sparkles: Sparkles,
  flags: Flag,
  gift: Gift,
  briefcase: Briefcase,
  lightbulb: Lightbulb,
  house: HomeIcon,
  default: Tag,
};

export const CategoriesShowcase = () => {
  const { t } = useTranslation();
  const { categories: adminCategories } = useHomeData();

  // Convert admin categories to display format
  const adminCategoriesForDisplay = useMemo(() => {
    return adminCategories.map((cat) => ({
      id: cat.id,
      labelKey: cat.name,
      icon: (cat.icon as HomePrimaryCategoryIcon) || "default",
      gradientFrom: "#E6ECFF",
      gradientTo: "#D4DBFF",
      accent: "#8F9CF5",
      image: cat.image,
    }));
  }, [adminCategories]);

  // Use admin categories if available, otherwise fallback to static data
  const categoriesToDisplay = adminCategoriesForDisplay.length > 0 
    ? adminCategoriesForDisplay 
    : homePrimaryCategories;

  // Duplicate categories multiple times for seamless infinite loop
  // Using 3 copies to ensure smooth looping on all screen sizes
  const duplicatedCategories = [
    ...categoriesToDisplay,
    ...categoriesToDisplay,
    ...categoriesToDisplay,
  ];

  const renderCategory = (category: typeof categoriesToDisplay[0], index: number) => {
    const Icon = iconMap[category.icon] ?? Tag;
    const hasImage = Boolean(category.image);
    const displayName = typeof category.labelKey === "string" && !category.labelKey.includes(".") 
      ? category.labelKey 
      : t(category.labelKey);
    
    return (
      <article
        key={`${category.id}-${index}`}
        tabIndex={0}
        aria-label={displayName}
        className={cn(
          "group flex min-w-[140px] flex-shrink-0 flex-col items-center gap-4 text-center transition-all duration-300 ease-out",
          "hover:-translate-y-2 hover:scale-105"
        )}
      >
        <div className="relative">
          {hasImage ? (
            <Image
              src={category.image!}
              alt={displayName}
              width={112}
              height={112}
              className="h-[5.5rem] w-[5.5rem] object-contain transition-transform duration-300 ease-out group-hover:scale-110 rounded-2xl"
              priority={false}
            />
          ) : (
            <span className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-[#2E5E99]/10 to-[#2E5E99]/5 transition-all duration-300 group-hover:from-[#2E5E99]/20 group-hover:to-[#2E5E99]/10">
              <Icon className="size-16 text-[#2E5E99] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
            </span>
          )}
        </div>
        <h3 className="text-xs font-medium text-[#0F172A] transition-colors duration-300 group-hover:text-[#2E5E99] sm:text-sm">
          {displayName}
        </h3>
      </article>
    );
  };

  return (
    <section id="home-categories" className="bg-white pb-24 pt-16 lg:pt-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4rem] text-[#2E5E99]">
            {t("home.primaryCategories.label", { defaultValue: "Categories" })}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
            {t("home.primaryCategories.title", { defaultValue: "프리미엄 서비스를 살펴보세요" })}
          </h2>
          <p className="mt-4 text-lg text-[#475569]">
            {t("home.primaryCategories.subtitle", {
              defaultValue: "프로젝트를 시작할 때 도움이 되는 14개의 핵심 카테고리를 한눈에 확인하세요.",
            })}
          </p>
        </div>

        {/* Infinite Loop Carousel - Single Row for All Screen Sizes */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
          
          <div className="category-carousel flex gap-8">
            {duplicatedCategories.map((category, index) => renderCategory(category, index))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .category-carousel {
          animation: slide 60s linear infinite;
          width: fit-content;
          will-change: transform;
        }

        .category-carousel:hover {
          animation-play-state: paused;
        }

        /* Smooth animation on all devices */
        @media (prefers-reduced-motion: no-preference) {
          .category-carousel {
            animation: slide 60s linear infinite;
          }
        }

        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .category-carousel {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};


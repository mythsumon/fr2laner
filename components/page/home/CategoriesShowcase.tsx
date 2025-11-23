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
} from "lucide-react";
import { homePrimaryCategories, type HomePrimaryCategoryIcon } from "@/entities/home";
import { cn } from "@/components/shared/utils";
import { CategoryIconMotion } from "./CategoryIconMotion";

const iconMap: Record<HomePrimaryCategoryIcon, LucideIcon> = {
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
};

const hexToRgba = (hex: string, alpha = 0.24) => {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const CategoriesShowcase = () => {
  const { t } = useTranslation();

  // Duplicate categories for infinite loop (3x for smoother seamless loop)
  const duplicatedCategories = [
    ...homePrimaryCategories,
    ...homePrimaryCategories,
    ...homePrimaryCategories,
  ];

  const renderCategory = (category: typeof homePrimaryCategories[0], index: number, originalIndex: number) => {
    const Icon = iconMap[category.icon] ?? Palette;
    const hasImage = Boolean(category.image);
    return (
      <CategoryIconMotion key={`${category.id}-${index}`} index={originalIndex}>
        <article
          tabIndex={0}
          aria-label={t(category.labelKey)}
          className={cn(
            "group flex min-w-[140px] flex-shrink-0 flex-col items-center gap-3 text-center transition-transform duration-200 ease-out",
            "hover:-translate-y-1"
          )}
        >
          {hasImage ? (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E9EEF8] to-[#F0F7FF] p-3 transition-transform duration-200 ease-out group-hover:scale-105">
              <Image
                src={category.image!}
                alt={t(category.labelKey)}
                width={80}
                height={80}
                className="h-full w-full object-contain"
                priority={false}
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E9EEF8] to-[#F0F7FF] transition-transform duration-200 ease-out group-hover:scale-105">
              <Icon className="size-10 text-[#2E5E99]" strokeWidth={1.6} />
            </div>
          )}
          <h3 className="text-xs font-semibold text-[#0F172A] sm:text-sm">{t(category.labelKey)}</h3>
        </article>
      </CategoryIconMotion>
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
            {t("home.primaryCategories.title", { defaultValue: "Find your perfect match" })}
          </h2>
          <p className="mt-4 text-lg text-[#475569]">
            {t("home.primaryCategories.subtitle", {
              defaultValue: "Explore 14 curated service areas inspired by Kmong's premium marketplace.",
            })}
          </p>
        </div>

        {/* Infinite Loop Horizontal Carousel - All Screen Sizes */}
        <div className="relative overflow-hidden">
          <div className="category-slide-container flex gap-6">
            {duplicatedCategories.map((category, index) => {
              // Calculate original index for animation delay
              const originalIndex = index % homePrimaryCategories.length;
              return renderCategory(category, index, originalIndex);
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .category-slide-container {
          animation: slide 40s linear infinite;
          width: fit-content;
          will-change: transform;
        }

        .category-slide-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};


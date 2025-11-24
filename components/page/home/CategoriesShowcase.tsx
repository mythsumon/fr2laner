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

  // Duplicate categories for infinite loop (2x for seamless loop)
  const duplicatedCategories = [...homePrimaryCategories, ...homePrimaryCategories];

  const renderCategory = (category: typeof homePrimaryCategories[0], index: number) => {
    const Icon = iconMap[category.icon] ?? Palette;
    const hasImage = Boolean(category.image);
    return (
      <article
        key={`${category.id}-${index}`}
        tabIndex={0}
        aria-label={t(category.labelKey)}
        className={cn(
          "group flex min-w-[120px] flex-shrink-0 flex-col items-center gap-4 text-center transition-transform duration-200 ease-out",
          "hover:-translate-y-1 md:min-w-0"
        )}
      >
        {hasImage ? (
          <Image
            src={category.image!}
            alt={t(category.labelKey)}
            width={112}
            height={112}
            className="h-[5.5rem] w-[5.5rem] object-contain transition-transform duration-200 ease-out group-hover:scale-105"
            priority={false}
          />
        ) : (
          <span className="flex h-[5.5rem] w-[5.5rem] items-center justify-center">
            <Icon className="size-16 text-[#2E5E99]" strokeWidth={1.6} />
          </span>
        )}
        <h3 className="text-xs font-medium text-[#0F172A] sm:text-sm">{t(category.labelKey)}</h3>
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
            {t("home.primaryCategories.title", { defaultValue: "Find your perfect match" })}
          </h2>
          <p className="mt-4 text-lg text-[#475569]">
            {t("home.primaryCategories.subtitle", {
              defaultValue: "Explore 14 curated service areas inspired by Kmong's premium marketplace.",
            })}
          </p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden grid-cols-4 gap-6 md:grid xl:grid-cols-7">
          {homePrimaryCategories.map((category, index) => renderCategory(category, index))}
        </div>

        {/* Mobile: Infinite Loop Horizontal Scroll */}
        <div className="relative overflow-hidden md:hidden">
          <div className="category-slide-container flex gap-6">
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
            transform: translateX(-50%);
          }
        }

        .category-slide-container {
          animation: slide 30s linear infinite;
          width: fit-content;
        }

        .category-slide-container:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .category-slide-container {
            will-change: transform;
          }
        }
      `}</style>
    </section>
  );
};


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
import SectionHeader from "@/components/common/SectionHeader";

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

const VISUAL_SIZE = "h-[5.5rem] w-[5.5rem]";

export const CategoriesShowcase = () => {
  const { t } = useTranslation();

  return (
    <section id="home-categories" className="bg-white pb-24 pt-16 lg:pt-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12">
          <SectionHeader
            label={t("home.primaryCategories.label", { defaultValue: "CATEGORIES" })}
            title={t("home.primaryCategories.title", { defaultValue: "Find your perfect match" })}
            description={t("home.primaryCategories.subtitle", {
              defaultValue: "Explore 14 curated service areas inspired by Kmong’s premium marketplace.",
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-7">
          {homePrimaryCategories.map((category) => {
            const Icon = iconMap[category.icon] ?? Palette;
            const hasImage = Boolean(category.image);
            return (
              <article
                key={category.id}
                tabIndex={0}
                aria-label={t(category.labelKey)}
                className={cn(
                  "group flex flex-col items-center gap-4 text-center transition-transform duration-200 ease-out",
                  "hover:-translate-y-1"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-2xl bg-[#F5F7FB] transition-transform duration-200 ease-out",
                    "group-hover:scale-105",
                    VISUAL_SIZE
                  )}
                >
                  {hasImage ? (
                    <Image
                      src={category.image!}
                      alt={t(category.labelKey)}
                      width={112}
                      height={112}
                      className={cn("h-full w-full object-contain", "p-2")}
                      priority={false}
                    />
                  ) : (
                    <Icon className="h-10 w-10 text-[#2E5E99]" strokeWidth={1.6} />
                  )}
                </div>
                <h3 className="text-xs font-medium text-[#0F172A] sm:text-sm">{t(category.labelKey)}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};


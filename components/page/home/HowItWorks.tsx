"use client";

import { useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Search, Users, CreditCard } from "lucide-react";
import { homeSteps } from "@/entities/home";
import { cn } from "@/components/shared/utils";
import SectionHeader from "@/components/common/SectionHeader";

const iconMap: Record<string, ReactElement> = {
  browse: <Search className="size-9" />, 
  collaborate: <Users className="size-9" />, 
  pay: <CreditCard className="size-9" />,
};

type CardState = {
  x: number;
  y: number;
};

const initialCardState: CardState = { x: 0, y: 0 };

const HowItWorksCard = ({
  index,
  title,
  description,
  icon,
}: {
  index: number;
  title: string;
  description: string;
  icon: ReactElement;
}) => {
  const [offset, setOffset] = useState<CardState>(initialCardState);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset(initialCardState);

  return (
    <article
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex h-full flex-col items-center gap-5 rounded-[26px] bg-white p-8 text-center transition-all duration-200",
        "shadow-[0_24px_60px_rgba(16,24,40,0.08),inset_0_2px_0_rgba(255,255,255,0.8)]",
        "hover:-translate-y-3 hover:shadow-[0_32px_70px_rgba(16,24,40,0.12),inset_0_2px_0_rgba(255,255,255,0.9)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5E99] focus-visible:ring-offset-2"
      )}
    >
      <span
        className="relative inline-flex size-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[#E5EFFC] to-[#BDD3F6] text-[#2E5E99] shadow-[0_12px_24px_rgba(46,94,153,0.16)] transition-transform duration-200 ease-out group-hover:-translate-y-1"
        style={{ transform: `translate3d(${offset.x * 0.4}px, ${offset.y * 0.4}px, 0)` }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent" />
        <span className="relative flex items-center justify-center">
          {icon}
        </span>
      </span>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-[#0F172A]">{title}</h3>
        <p className="text-sm leading-6 text-[#475569]">{description}</p>
      </div>
      <span className="pointer-events-none absolute inset-x-6 bottom-3 h-8 rounded-full bg-[#2E5E99]/10 blur-[18px] opacity-70" />
    </article>
  );
};

export const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="relative bg-white pt-20 pb-28">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-14 text-center">
          <SectionHeader
            label={t("home.sections.howItWorks.label", { defaultValue: "PROCESS" })}
            title={t("home.steps.title")}
            description={t("home.steps.subtitle")}
            align="center"
          />
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 flex justify-center">
            <span className="h-[460px] w-3/4 rounded-full bg-gradient-to-b from-white via-white/70 to-transparent blur-3xl" />
          </div>
          <div className="relative grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {homeSteps.map((step, index) => (
              <HowItWorksCard
                key={step.id}
                index={index}
                title={t(step.titleKey)}
                description={t(step.descriptionKey)}
                icon={iconMap[step.id] ?? <Search className="size-9" />}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

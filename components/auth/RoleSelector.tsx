"use client";

import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/providers/LangProvider";

export type RoleMode = "client" | "expert";

type RoleSelectorProps = {
  onSelect: (mode: RoleMode) => void;
  title?: string;
  subtitle?: string;
  label?: string;
};

const cards: Array<{
  mode: RoleMode;
  title: string;
  description: string;
  emoji: string;
  iconBg: string;
}> = [
  {
    mode: "client",
    title: "의뢰인으로 이용",
    description: "내가 원하는 서비스의 전문가를 찾아서 도움을 받고 싶어요.",
    emoji: "🧑‍💻",
    iconBg: "bg-sky-50",
  },
  {
    mode: "expert",
    title: "전문가로 활동",
    description: "내가 잘하는 분야의 전문가로 활동하고 수익을 창출하고 싶어요.",
    emoji: "🚀",
    iconBg: "bg-amber-50",
  },
];

export const RoleSelector = ({
  onSelect,
  title = "크몽에서 서비스를 어떻게 이용하고 싶으세요?",
  subtitle = "아래에서 이용 방식을 선택하고 계속 진행해주세요.",
  label = "사용 타입 선택",
}: RoleSelectorProps) => {
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const { currentLanguage } = useLang();

  const handleCardClick = (mode: RoleMode) => {
    setClickedCard(mode);
    setTimeout(() => {
      onSelect(mode);
      setClickedCard(null);
    }, 80);
  };

  const languageLabel = currentLanguage === "en" ? "us English" : "한국어";

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">FREELANCER HUB</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800">전문 프리랜서를 쉽고 빠르게 만나보세요.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600 flex items-center gap-1.5">
            <span>{languageLabel}</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-3 w-3" />
            홈으로 가기
          </Link>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-600">{label}</p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">{subtitle}</p>
      </div>

      {/* Role Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const isClicked = clickedCard === card.mode;
          const isExpert = card.mode === "expert";

          return (
            <button
              key={card.mode}
              type="button"
              onClick={() => handleCardClick(card.mode)}
              className={`
                group relative flex h-full flex-col rounded-2xl border bg-slate-50/70 px-6 py-6 text-left shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all
                ${isClicked ? "scale-95" : ""}
                hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,0.14)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300
                border-slate-100
              `}
            >
              {isExpert && (
                <span className="absolute right-4 top-4 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">
                  PRO
                </span>
              )}
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${card.iconBg}`}>
                {card.emoji}
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900 md:text-lg">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.description}</p>
            </button>
          );
        })}
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-center text-[11px] text-slate-400">
        가입 이후에도 언제든 원하는 상태로 전환할 수 있어요!
      </p>
    </div>
  );
};


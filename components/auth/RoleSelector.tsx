"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export type RoleMode = "client" | "expert";

// Sample accounts for quick login
const sampleAccounts = {
  client: {
    email: "client@demo.com",
    password: "demo1234",
  },
  expert: {
    email: "expert@demo.com",
    password: "demo1234",
  },
} as const;

type RoleSelectorProps = {
  onSelect: (mode: RoleMode) => void;
  title?: string;
  subtitle?: string;
  label?: string;
};

export const RoleSelector = ({
  onSelect,
  title,
  subtitle,
  label,
}: RoleSelectorProps) => {
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [quickLoginLoading, setQuickLoginLoading] = useState<RoleMode | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuth();

  const cards = useMemo(
    () => [
      {
        mode: "client" as RoleMode,
        title: t("auth.roleSelector.cards.client.title"),
        description: t("auth.roleSelector.cards.client.description"),
        emoji: "🧑‍💻",
        iconBg: "bg-sky-50",
      },
      {
        mode: "expert" as RoleMode,
        title: t("auth.roleSelector.cards.expert.title"),
        description: t("auth.roleSelector.cards.expert.description"),
        emoji: "🚀",
        iconBg: "bg-amber-50",
      },
    ],
    [t]
  );

  const handleCardClick = (mode: RoleMode) => {
    setClickedCard(mode);
    setTimeout(() => {
      onSelect(mode);
      setClickedCard(null);
    }, 80);
  };

  const handleQuickLogin = async (mode: RoleMode, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setQuickLoginLoading(mode);
    
    const account = sampleAccounts[mode];
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: account.email,
          password: account.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      if (data.user.status !== "active") {
        const statusMessage =
          data.user.status === "suspended"
            ? "계정이 정지되었습니다."
            : data.user.status === "banned"
              ? "계정이 영구 정지되었습니다."
              : "계정 상태를 확인할 수 없습니다.";
        throw new Error(statusMessage);
      }

      login(data.user, data.token);

      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.user.role === "client") {
        router.push("/client/dashboard");
      } else if (data.user.role === "expert") {
        router.push("/expert/dashboard");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.");
      setQuickLoginLoading(null);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">
            {t("auth.roleSelector.badge")}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800">{t("auth.roleSelector.description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-3 w-3" />
            {t("auth.roleSelector.backHome")}
          </Link>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-600">
          {label ?? t("auth.roleSelector.label")}
        </p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
          {title ?? t("auth.roleSelector.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">{subtitle ?? t("auth.roleSelector.subtitle")}</p>
      </div>

      {/* Role Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const isClicked = clickedCard === card.mode;
          const isExpert = card.mode === "expert";

          return (
            <div
              key={card.mode}
              className={`
                group relative flex h-full flex-col rounded-2xl border bg-slate-50/70 px-6 py-6 text-left shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all
                ${isClicked ? "scale-95" : ""}
                hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,0.14)]
                border-slate-100
              `}
            >
              {isExpert && (
                <span className="absolute right-4 top-4 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">
                  PRO
                </span>
              )}
              <button
                type="button"
                onClick={() => handleCardClick(card.mode)}
                className="flex h-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${card.iconBg}`}>
                  {card.emoji}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900 md:text-lg">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.description}</p>
              </button>
              
              {/* Quick Login Button */}
              <button
                type="button"
                onClick={(e) => handleQuickLogin(card.mode, e)}
                disabled={quickLoginLoading !== null}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-sky-400 bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:from-sky-600 hover:to-blue-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {quickLoginLoading === card.mode ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span>로그인 중...</span>
                  </>
                ) : (
                  <>
                    <Zap className="size-4" />
                    <span>원클릭 로그인</span>
                  </>
                )}
              </button>
              
              {/* Test Account Info */}
              <div className="mt-3 rounded-lg bg-white/60 p-2 text-center">
                <p className="text-[10px] font-medium text-slate-600">
                  테스트 계정: <span className="font-mono text-sky-600">{sampleAccounts[card.mode].email}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-center text-[11px] text-slate-400">{t("auth.roleSelector.footer")}</p>
    </div>
  );
};


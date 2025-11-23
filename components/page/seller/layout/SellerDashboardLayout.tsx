"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquare, Bell, Plus, LogOut, Globe, ChevronDown } from "lucide-react";
import { SellerBottomNav } from "@/components/page/seller/layout/SellerBottomNav";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import { useLang } from "@/providers/LangProvider";

interface SellerDashboardLayoutProps {
  children: React.ReactNode;
}

export const SellerDashboardLayout = ({ children }: SellerDashboardLayoutProps) => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const { currentLanguage, changeLanguage } = useLang();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleLogout = () => {
    // Clear any stored auth data
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    // Redirect to home
    router.push("/");
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  const languageOptions = [
    { value: "kr", label: "한국어", flag: "🇰🇷" },
    { value: "en", label: "English", flag: "🇺🇸" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] to-[#EEF2FF] pb-24">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Seller Hub</p>
            <h1 className="text-2xl font-bold text-[#0F172A]">판매자 센터</h1>
            <p className="text-sm text-[#475569]">성과를 확인하고 서비스를 관리하세요</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/messages"
              className="flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <MessageSquare className="size-4" />
              메시지
            </Link>
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Bell className="size-4" />
              알림
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Globe className="size-4" />
                <span className="hidden sm:inline">
                  {languageOptions.find((opt) => opt.value === currentLanguage)?.flag || "🌐"}
                </span>
                <ChevronDown className="size-4" />
              </button>
              {showLanguageMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-xl border border-[#E2E8F0] bg-white shadow-lg">
                    {languageOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleLanguageChange(option.value)}
                        className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          currentLanguage === option.value
                            ? "bg-[#E9EEF8] text-[#2E5E99] font-semibold"
                            : "text-[#475569] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                        {currentLanguage === option.value && (
                          <span className="ml-auto text-[#2E5E99]">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-md"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>

            <Link href="/dashboard/services/new">
              <Button
                type="primary"
                size="large"
                shape="round"
                className="gap-2 !bg-[#2E5E99] text-sm font-semibold text-white hover:!bg-[#1d4673]"
              >
                <Plus className="size-4" />
                새 서비스
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <SellerBottomNav />
    </div>
  );
};


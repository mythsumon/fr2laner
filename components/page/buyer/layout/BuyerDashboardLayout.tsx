"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, Bell, LogOut, Globe, ChevronDown, Menu, Home, ListChecks, User, Settings, Heart, FileText } from "lucide-react";
import { BuyerBottomNav } from "@/components/page/buyer/BuyerBottomNav";
import { useBodyClass } from "@/hooks";
import { useLang } from "@/providers/LangProvider";

interface BuyerDashboardLayoutProps {
  children: React.ReactNode;
}

const pageTitles: Record<string, { title: string; description: string }> = {
  "/buyer-dashboard": {
    title: "구매자 대시보드",
    description: "원하는 전문가를 쉽고 빠르게 만나보세요",
  },
  "/buyer-messages": {
    title: "메시지",
    description: "판매자와 실시간으로 소통하세요",
  },
  "/orders": {
    title: "주문 관리",
    description: "프로젝트 진행 상황을 한눈에 확인하세요",
  },
  "/profile": {
    title: "프로필",
    description: "내 정보를 관리하고 설정을 변경하세요",
  },
  "/settings": {
    title: "설정",
    description: "계정 설정 및 환경설정을 관리하세요",
  },
  "/custom-requests": {
    title: "커스텀 요청",
    description: "요청서 작성 및 제안 관리",
  },
  "/wishlist": {
    title: "위시리스트",
    description: "관심 서비스 모아보기",
  },
};

const buyerMenuItems = [
  { href: "/buyer-dashboard", label: "구매자 대시보드", icon: Home },
  { href: "/buyer-messages", label: "메시지", icon: MessageSquare },
  { href: "/orders", label: "주문 관리", icon: ListChecks },
  { href: "/custom-requests", label: "커스텀 요청", icon: FileText },
  { href: "/wishlist", label: "위시리스트", icon: Heart },
  { href: "/profile", label: "프로필", icon: User },
  { href: "/settings", label: "설정", icon: Settings },
];

export const BuyerDashboardLayout = ({ children }: BuyerDashboardLayoutProps) => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const pathname = usePathname();
  const { currentLanguage, changeLanguage } = useLang();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showBuyerMenu, setShowBuyerMenu] = useState(false);

  const pageInfo = useMemo(() => {
    return pageTitles[pathname] || {
      title: "구매자 센터",
      description: "전문가를 찾고 프로젝트를 관리하세요",
    };
  }, [pathname]);

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
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] to-[#EEF2FF] pb-24 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Buyer Hub</p>
            <h1 className="text-2xl font-bold text-[#0F172A]">{pageInfo.title}</h1>
            <p className="text-sm text-[#475569]">{pageInfo.description}</p>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:w-64 md:flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-r border-white/60 bg-white/80 backdrop-blur">
            <div className="p-6">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Buyer Hub</p>
                <h1 className="mt-2 text-xl font-bold text-[#0F172A]">{pageInfo.title}</h1>
                <p className="mt-1 text-sm text-[#475569]">{pageInfo.description}</p>
              </div>

              <nav className="space-y-1">
                {buyerMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#E9EEF8] text-[#2E5E99]"
                          : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#2E5E99]"
                      }`}
                    >
                      <Icon className="size-5" />
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="ml-auto text-[#2E5E99]">✓</span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 space-y-2 border-t border-[#E2E8F0] pt-6">
                <Link
                  href="/buyer-messages"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#2E5E99]"
                >
                  <MessageSquare className="size-5" />
                  <span>메시지</span>
                </Link>

                {/* Language Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#2E5E99]"
                  >
                    <Globe className="size-5" />
                    <span>
                      {languageOptions.find((opt) => opt.value === currentLanguage)?.flag || "🌐"} {languageOptions.find((opt) => opt.value === currentLanguage)?.label || "Language"}
                    </span>
                    <ChevronDown className="ml-auto size-4" />
                  </button>
                  {showLanguageMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowLanguageMenu(false)}
                      />
                      <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-xl border border-[#E2E8F0] bg-white shadow-lg">
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
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="size-5" />
                  <span>로그아웃</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BuyerBottomNav />
    </div>
  );
};


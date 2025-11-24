"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Plus,
  ShoppingBag,
  MessageSquare,
  DollarSign,
  BarChart3,
  Star,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Globe,
  ChevronDown,
} from "lucide-react";
import { SellerBottomNav } from "@/components/page/seller/layout/SellerBottomNav";
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

  const sellerMenuItems = [
    { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
    { href: "/dashboard/services", label: "내 서비스", icon: Briefcase },
    { href: "/dashboard/services/new", label: "서비스 등록", icon: Plus },
    { href: "/dashboard/orders", label: "주문", icon: ShoppingBag },
    { href: "/dashboard/messages", label: "메시지", icon: MessageSquare },
    { href: "/dashboard/earnings", label: "수익", icon: DollarSign },
    { href: "/dashboard/analytics", label: "분석", icon: BarChart3 },
    { href: "/dashboard/reviews", label: "리뷰", icon: Star },
    { href: "/dashboard/notifications", label: "알림", icon: Bell },
    { href: "/dashboard/settings", label: "설정", icon: Settings },
    { href: "/dashboard/help", label: "도움말", icon: HelpCircle },
  ];

  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] to-[#EEF2FF] pb-24 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Seller Hub</p>
            <h1 className="text-2xl font-bold text-[#0F172A]">판매자 센터</h1>
            <p className="text-sm text-[#475569]">성과를 확인하고 서비스를 관리하세요</p>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:w-64 md:flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-r border-white/60 bg-white/80 backdrop-blur">
            <div className="p-6">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Seller Hub</p>
                <h1 className="mt-2 text-xl font-bold text-[#0F172A]">판매자 센터</h1>
                <p className="mt-1 text-sm text-[#475569]">성과를 확인하고 서비스를 관리하세요</p>
              </div>

              <nav className="space-y-1">
                {sellerMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
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
      <SellerBottomNav />
    </div>
  );
};


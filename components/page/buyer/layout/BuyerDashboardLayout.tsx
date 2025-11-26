"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, Bell, LogOut, Globe, ChevronDown, Menu, Home, ListChecks, User, Settings, Heart, FileText } from "lucide-react";
import { BuyerBottomNav } from "@/components/page/buyer/BuyerBottomNav";
import { useBodyClass } from "@/hooks";
import { useLang } from "@/providers/LangProvider";
import { useAuth } from "@/hooks/useAuth";

interface Notification {
  id: string;
  type: "order" | "message" | "wishlist" | "system";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "새로운 주문 업데이트",
    message: "주문 #5842의 상태가 '진행 중'으로 변경되었습니다.",
    time: "방금 전",
    isRead: false,
    link: "/orders/5842",
  },
  {
    id: "2",
    type: "message",
    title: "판매자로부터 새로운 메시지",
    message: "디자인 초안에 대한 확인 요청이 도착했습니다.",
    time: "20분 전",
    isRead: false,
    link: "/buyer-messages",
  },
  {
    id: "3",
    type: "wishlist",
    title: "위시리스트 서비스 할인",
    message: "위시리스트에 저장한 '브랜딩 패키지' 서비스가 20% 할인 중입니다.",
    time: "1시간 전",
    isRead: true,
    link: "/wishlist",
  },
  {
    id: "4",
    type: "system",
    title: "시스템 알림",
    message: "오늘 오후 9시에 짧은 유지보수가 예정되어 있습니다.",
    time: "어제",
    isRead: true,
  },
];

interface BuyerDashboardLayoutProps {
  children: React.ReactNode;
}

const pageTitles: Record<string, { title: string; description: string }> = {
  "/buyer-dashboard": {
    title: "Buyer Dashboard",
    description: "Review projects and recent activity.",
  },
  "/buyer-messages": {
    title: "Messages",
    description: "Chat with your freelancers in real time.",
  },
  "/orders": {
    title: "Orders",
    description: "Stay on top of every project milestone.",
  },
  "/profile": {
    title: "Profile",
    description: "Manage your personal and company details.",
  },
  "/settings": {
    title: "Settings",
    description: "Adjust account preferences and notifications.",
  },
  "/custom-requests": {
    title: "Custom Requests",
    description: "Create briefs and review proposals.",
  },
  "/wishlist": {
    title: "Saved Services",
    description: "Keep track of favorite gigs and bundles.",
  },
};

const buyerMenuItems = [
  { href: "/buyer-dashboard", label: "Dashboard", icon: Home },
  { href: "/buyer-messages", label: "Messages", icon: MessageSquare },
  { href: "/orders", label: "Orders", icon: ListChecks },
  { href: "/custom-requests", label: "Custom Requests", icon: FileText },
  { href: "/wishlist", label: "Saved", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const BuyerDashboardLayout = ({ children }: BuyerDashboardLayoutProps) => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const pathname = usePathname();
  const { currentLanguage, changeLanguage } = useLang();
  const { user, logout } = useAuth();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showBuyerMenu, setShowBuyerMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const pageInfo = useMemo(() => {
    return pageTitles[pathname] || {
      title: "Buyer Hub",
      description: "Discover talent and manage every project.",
    };
  }, [pathname]);

  const handleLogout = () => {
    logout();
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

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
    setShowNotifications(false);
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <ListChecks className="size-5 text-blue-500" />;
      case "message":
        return <MessageSquare className="size-5 text-green-500" />;
      case "wishlist":
        return <Heart className="size-5 text-rose-500" />;
      default:
        return <Bell className="size-5 text-slate-500" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".buyer-notification-dropdown") && !target.closest(".buyer-notification-button")) {
        setShowNotifications(false);
      }
      if (!target.closest(".buyer-profile-dropdown") && !target.closest(".buyer-profile-button")) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] to-[#EEF2FF] pb-24 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/90 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Buyer Hub</p>
            <h1 className="text-2xl font-bold text-[#0F172A]">{pageInfo.title}</h1>
            <p className="text-sm text-[#475569]">{pageInfo.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
              title="홈페이지"
            >
              <Home className="size-5" />
            </Link>
            <div className="relative buyer-notification-button">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-full border border-[#E2E8F0] p-2 text-[#64748B] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
                title="알림"
              >
                <Bell className="size-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 size-2 rounded-full border-2 border-white bg-red-500" />
                )}
              </button>
              {showNotifications && (
                <div className="buyer-notification-dropdown absolute right-0 top-full mt-2 w-72 rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3">
                    <h3 className="text-sm font-semibold text-[#0F172A]">알림</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="text-xs font-medium text-[#2E5E99]">
                        모두 읽음
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 divide-y divide-[#E2E8F0] overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-[#F8FAFC] ${
                          !notification.isRead ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold text-[#0F172A]">{notification.title}</p>
                              {!notification.isRead && <span className="size-2 rounded-full bg-blue-500" />}
                            </div>
                            <p className="mt-1 text-xs text-[#64748B]">{notification.message}</p>
                            <p className="mt-1 text-[11px] text-[#94A3B8]">{notification.time}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative buyer-profile-button">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
              >
                <User className="size-4" />
                <span>{user?.name || "Buyer"}</span>
              </button>
              {showProfileMenu && (
                <div className="buyer-profile-dropdown absolute right-0 top-full mt-2 w-60 rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">
                  <div className="border-b border-[#E2E8F0] px-4 py-3">
                    <p className="text-sm font-semibold text-[#0F172A]">{user?.name || "Buyer"}</p>
                    <p className="text-xs text-[#64748B]">{user?.email || "buyer@example.com"}</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC]"
                    >
                      <User className="size-4" />
                      프로필
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC]"
                    >
                      <Settings className="size-4" />
                      설정
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:w-64 md:flex-shrink-0">
          <div className="fixed top-0 left-0 h-screen w-64 overflow-y-auto border-r border-white/60 bg-white/80 backdrop-blur z-20">
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
        <main className="flex-1 md:ml-64">
          <header className="sticky top-0 z-30 hidden border-b border-[#E2E8F0] bg-white/90 px-6 py-4 shadow-sm md:block">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Buyer Hub</p>
                <h2 className="text-xl font-bold text-[#0F172A]">{pageInfo.title}</h2>
                <p className="text-sm text-[#64748B]">{pageInfo.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-2 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
                >
                  <Home className="size-4" />
                  홈페이지
                </Link>
                <div className="relative buyer-notification-button">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative rounded-full border border-[#E2E8F0] p-2 text-[#64748B] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
                  >
                    <Bell className="size-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 size-2 rounded-full border-2 border-white bg-red-500" />
                    )}
                  </button>
                  {showNotifications && (
                    <div className="buyer-notification-dropdown absolute right-0 top-full mt-2 w-80 rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">
                      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3">
                        <h3 className="font-semibold text-[#0F172A]">알림</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllAsRead} className="text-sm font-medium text-[#2E5E99]">
                            모두 읽음
                          </button>
                        )}
                      </div>
                      <div className="max-h-80 divide-y divide-[#E2E8F0] overflow-y-auto">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`w-full px-4 py-3 text-left transition-colors hover:bg-[#F8FAFC] ${
                              !notification.isRead ? "bg-blue-50/50" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-semibold text-[#0F172A]">{notification.title}</p>
                                  {!notification.isRead && <span className="size-2 rounded-full bg-blue-500" />}
                                </div>
                                <p className="mt-1 text-sm text-[#475569]">{notification.message}</p>
                                <p className="mt-1 text-xs text-[#94A3B8]">{notification.time}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative buyer-profile-button">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
                  >
                    <User className="size-4" />
                    {user?.name || "Buyer"}
                    <ChevronDown className="size-4" />
                  </button>
                  {showProfileMenu && (
                    <div className="buyer-profile-dropdown absolute right-0 top-full mt-2 w-60 rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">
                      <div className="border-b border-[#E2E8F0] px-4 py-3">
                        <p className="text-sm font-semibold text-[#0F172A]">{user?.name || "Buyer"}</p>
                        <p className="text-xs text-[#64748B]">{user?.email || "buyer@example.com"}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC]"
                        >
                          <User className="size-4" />
                          프로필
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC]"
                        >
                          <Settings className="size-4" />
                          설정
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="size-4" />
                          로그아웃
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
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


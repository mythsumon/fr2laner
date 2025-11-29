"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  MessageSquare, 
  Bell, 
  LogOut, 
  Globe, 
  ChevronDown, 
  Menu, 
  Home, 
  ListChecks, 
  User, 
  Settings, 
  Heart, 
  FileText,
  Search,
  Shield,
  X,
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { BuyerBottomNav } from "@/components/page/buyer/BuyerBottomNav";
import { useBodyClass } from "@/hooks";
import { useLang } from "@/providers/LangProvider";
import { useAuth } from "@/hooks/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
    link: "/client/messages",
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
  "/client/dashboard": {
    title: "Buyer Dashboard",
    description: "Review projects and recent activity.",
  },
  "/client/messages": {
    title: "Messages",
    description: "Chat with your freelancers in real time.",
  },
  "/client/orders": {
    title: "Orders",
    description: "Stay on top of every project milestone.",
  },
  "/client/profile": {
    title: "Profile",
    description: "Manage your personal and company details.",
  },
  "/client/settings": {
    title: "Settings",
    description: "Adjust account preferences and notifications.",
  },
  "/client/custom-requests": {
    title: "Custom Requests",
    description: "Create briefs and review proposals.",
  },
  "/client/wishlist": {
    title: "Saved Services",
    description: "Keep track of favorite gigs and bundles.",
  },
};

const buyerMenuItems = [
  { href: "/client/dashboard", label: "Dashboard", icon: Home },
  { href: "/client/messages", label: "Messages", icon: MessageSquare },
  { href: "/client/orders", label: "Orders", icon: ListChecks },
  { href: "/client/custom-requests", label: "Custom Requests", icon: FileText },
  { href: "/client/wishlist", label: "Saved", icon: Heart },
  { href: "/client/profile", label: "Profile", icon: User },
  { href: "/client/settings", label: "Settings", icon: Settings },
];

export const BuyerDashboardLayout = ({ children }: BuyerDashboardLayoutProps) => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const pathname = usePathname();
  const { currentLanguage, changeLanguage } = useLang();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
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

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile Header */}
      {isMobile && (
        <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-[#F8FAFC]"
            >
              <Menu className="size-5 text-[#0F172A]" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="size-6 text-[#2E5E99]" />
              <span className="font-bold text-[#0F172A]">Buyer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#2E5E99] transition-colors"
              title="Go to Homepage"
            >
              <Home className="size-5" />
            </Link>
            
            {/* Notification Button */}
            <div className="relative buyer-notification-button">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                title="Notifications"
              >
                <Bell className="size-5 text-[#64748B]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="buyer-notification-dropdown absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
                    <h3 className="font-bold text-[#0F172A]">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-[#2E5E99] hover:text-[#1d4673] font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="overflow-y-auto flex-1">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="size-12 text-[#CBD5E1] mx-auto mb-3" />
                        <p className="text-sm text-[#64748B]">No notifications</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-[#E2E8F0]">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`w-full text-left p-4 hover:bg-[#F8FAFC] transition-colors ${
                              !notification.isRead ? "bg-blue-50/50" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-semibold text-sm text-[#0F172A]">
                                    {notification.title}
                                  </h4>
                                  {!notification.isRead && (
                                    <span className="size-2 bg-blue-500 rounded-full shrink-0 mt-1"></span>
                                  )}
                                </div>
                                <p className="text-sm text-[#64748B] mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-[#94A3B8] mt-2">{notification.time}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-[#E2E8F0]">
                      <Link
                        href="/client/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="block text-center text-sm text-[#2E5E99] hover:text-[#1d4673] font-medium"
                      >
                        View all notifications
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Button */}
            <div className="relative buyer-profile-button">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors buyer-profile-button"
              >
                <User className="size-5 text-[#64748B]" />
                <span className="text-sm font-medium text-[#0F172A] hidden sm:inline">
                  {user?.name || "Buyer"}
                </span>
                <ChevronDown className="size-4 text-[#64748B] hidden sm:inline" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="buyer-profile-dropdown absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50">
                  <div className="p-4 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-10 rounded-full bg-[#2E5E99]/10">
                        <User className="size-5 text-[#2E5E99]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#0F172A] truncate">
                          {user?.name || "Buyer"}
                        </p>
                        <p className="text-xs text-[#64748B] truncate">{user?.email || "buyer@example.com"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/client/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                    >
                      <User className="size-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/client/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                    >
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </Link>
                    <div className="my-1 border-t border-[#E2E8F0]"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="size-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-64">
            <div className="fixed top-0 left-0 h-screen w-64 overflow-y-auto bg-white border-r border-[#E2E8F0] z-20 flex flex-col">
              <div className="p-6 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-[#2E5E99]/10">
                    <Shield className="size-6 text-[#2E5E99]" />
                  </div>
                  <div>
                    <h1 className="font-bold text-[#0F172A]">Buyer Dashboard</h1>
                    <p className="text-xs text-[#64748B]">Project Management</p>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:border-[#2E5E99] focus:outline-none"
                  />
                </div>
              </div>

              <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
                {buyerMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#2E5E99] text-white"
                          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                      }`}
                    >
                      <Icon className="size-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[#E2E8F0] bg-white space-y-2">
                <Link
                  href="/"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2E5E99] transition-colors"
                >
                  <Home className="size-5" />
                  <span className="font-medium">Homepage</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 shadow-2xl">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="size-6 text-[#2E5E99]" />
                  <span className="font-bold text-[#0F172A]">Buyer Dashboard</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#F8FAFC]"
                >
                  <X className="size-5 text-[#64748B]" />
                </button>
              </div>
              <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
                {buyerMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#2E5E99] text-white"
                          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                      }`}
                    >
                      <Icon className="size-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E2E8F0] bg-white space-y-2">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2E5E99] transition-colors"
                >
                  <Home className="size-5" />
                  <span className="font-medium">Homepage</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 min-h-screen ${!isMobile ? 'ml-64' : ''}`}>
          {/* Desktop Header */}
          {!isMobile && (
            <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    {pageTitles[pathname]?.title || "Buyer Hub"}
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">Project management and monitoring</p>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2E5E99] transition-colors"
                  >
                    <Home className="size-5" />
                    <span className="text-sm font-medium">Homepage</span>
                  </Link>
                  
                  {/* Notification Button */}
                  <div className="relative buyer-notification-button">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors buyer-notification-button"
                      title="Notifications"
                    >
                      <Bell className="size-5 text-[#64748B]" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                      <div className="buyer-notification-dropdown absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
                          <h3 className="font-bold text-[#0F172A]">Notifications</h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-sm text-[#2E5E99] hover:text-[#1d4673] font-medium"
                            >
                              Mark all as read
                            </button>
                          )}
                        </div>
                        <div className="overflow-y-auto flex-1">
                          {notifications.length === 0 ? (
                            <div className="p-8 text-center">
                              <Bell className="size-12 text-[#CBD5E1] mx-auto mb-3" />
                              <p className="text-sm text-[#64748B]">No notifications</p>
                            </div>
                          ) : (
                            <div className="divide-y divide-[#E2E8F0]">
                              {notifications.map((notification) => (
                                <button
                                  key={notification.id}
                                  onClick={() => handleNotificationClick(notification)}
                                  className={`w-full text-left p-4 hover:bg-[#F8FAFC] transition-colors ${
                                    !notification.isRead ? "bg-blue-50/50" : ""
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <h4 className="font-semibold text-sm text-[#0F172A]">
                                          {notification.title}
                                        </h4>
                                        {!notification.isRead && (
                                          <span className="size-2 bg-blue-500 rounded-full shrink-0 mt-1"></span>
                                        )}
                                      </div>
                                      <p className="text-sm text-[#64748B] mt-1 line-clamp-2">
                                        {notification.message}
                                      </p>
                                      <p className="text-xs text-[#94A3B8] mt-2">{notification.time}</p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {notifications.length > 0 && (
                          <div className="p-3 border-t border-[#E2E8F0]">
                            <Link
                              href="/client/notifications"
                              onClick={() => setShowNotifications(false)}
                              className="block text-center text-sm text-[#2E5E99] hover:text-[#1d4673] font-medium"
                            >
                              View all notifications
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Profile Button */}
                  <div className="relative buyer-profile-button">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors buyer-profile-button"
                    >
                      <User className="size-5 text-[#64748B]" />
                      <span className="text-sm font-medium text-[#0F172A]">
                        {user?.name || "Buyer"}
                      </span>
                      <ChevronDown className="size-4 text-[#64748B]" />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                      <div className="buyer-profile-dropdown absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50">
                        <div className="p-4 border-b border-[#E2E8F0]">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-10 rounded-full bg-[#2E5E99]/10">
                              <User className="size-5 text-[#2E5E99]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-[#0F172A] truncate">
                                {user?.name || "Buyer"}
                              </p>
                              <p className="text-xs text-[#64748B] truncate">
                                {user?.email || "buyer@example.com"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/client/profile"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                          >
                            <User className="size-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/client/settings"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                          >
                            <Settings className="size-4" />
                            <span>Settings</span>
                          </Link>
                          <div className="my-1 border-t border-[#E2E8F0]"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="size-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>
          )}

          {/* Page Content */}
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-50">
          <div className="grid grid-cols-5 gap-1 p-2">
            {[
              { icon: LayoutDashboard, href: "/client/dashboard", label: "Dashboard" },
              { icon: ListChecks, href: "/client/orders", label: "Orders" },
              { icon: MessageSquare, href: "/client/messages", label: "Messages" },
              { icon: Heart, href: "/client/wishlist", label: "Saved" },
              { icon: Menu, href: "#", label: "More", onClick: () => setSidebarOpen(true) },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={item.onClick}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    isActive ? "text-[#2E5E99]" : "text-[#64748B]"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};
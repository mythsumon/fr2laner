"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  AlertTriangle,
  DollarSign,
  FileText,
  Megaphone,
  Star,
  BarChart3,
  Settings,
  ClipboardList,
  Headphones,
  LogOut,
  Menu,
  X,
  Shield,
  Search,
  Bell,
  User,
  Home,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const menuItems = [
  { icon: LayoutDashboard, label: "대시보드", href: "/admin/dashboard" },
  { icon: Users, label: "사용자 관리", href: "/admin/users" },
  { icon: Package, label: "서비스 관리", href: "/admin/services" },
  { icon: ShoppingBag, label: "주문 관리", href: "/admin/orders" },
  { icon: AlertTriangle, label: "분쟁 해결", href: "/admin/disputes" },
  { icon: DollarSign, label: "재무 관리", href: "/admin/finance" },
  { icon: FileText, label: "콘텐츠 관리", href: "/admin/cms" },
  { icon: Megaphone, label: "마케팅", href: "/admin/marketing" },
  { icon: Star, label: "리뷰 관리", href: "/admin/reviews" },
  { icon: BarChart3, label: "분석", href: "/admin/analytics" },
  { icon: Settings, label: "시스템 설정", href: "/admin/settings" },
  { icon: ClipboardList, label: "활동 로그", href: "/admin/audit" },
  { icon: Headphones, label: "지원 티켓", href: "/admin/support" },
];

export const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => {
    router.push("/admin/login");
  };

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
              <span className="font-bold text-[#0F172A]">Super Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#2E5E99] transition-colors"
              title="홈페이지로"
            >
              <Home className="size-5" />
            </Link>
            <button className="relative p-2 rounded-lg hover:bg-[#F8FAFC]">
              <Bell className="size-5 text-[#64748B]" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button className="p-2 rounded-lg hover:bg-[#F8FAFC]">
              <User className="size-5 text-[#64748B]" />
            </button>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-64 bg-white border-r border-[#E2E8F0] min-h-screen sticky top-0">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center size-10 rounded-xl bg-[#2E5E99]/10">
                  <Shield className="size-6 text-[#2E5E99]" />
                </div>
                <div>
                  <h1 className="font-bold text-[#0F172A]">Super Admin</h1>
                  <p className="text-xs text-[#64748B]">시스템 관리</p>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="검색..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
            </div>

            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
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

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E2E8F0] space-y-2">
              <Link
                href="/"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2E5E99] transition-colors"
              >
                <Home className="size-5" />
                <span className="font-medium">홈페이지로</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="size-5" />
                <span className="font-medium">로그아웃</span>
              </button>
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
                  <span className="font-bold text-[#0F172A]">Super Admin</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#F8FAFC]"
                >
                  <X className="size-5 text-[#64748B]" />
                </button>
              </div>
              <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
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
                  <span className="font-medium">홈페이지로</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="font-medium">로그아웃</span>
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Desktop Header */}
          {!isMobile && (
            <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    {menuItems.find((item) => pathname === item.href || pathname?.startsWith(item.href + "/"))?.label || "대시보드"}
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">시스템 관리 및 모니터링</p>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2E5E99] transition-colors"
                  >
                    <Home className="size-5" />
                    <span className="text-sm font-medium">홈페이지</span>
                  </Link>
                  <button className="relative p-2 rounded-lg hover:bg-[#F8FAFC]">
                    <Bell className="size-5 text-[#64748B]" />
                    {notifications > 0 && (
                      <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F8FAFC]">
                    <User className="size-5 text-[#64748B]" />
                    <span className="text-sm font-medium text-[#0F172A]">관리자</span>
                  </button>
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
              { icon: LayoutDashboard, href: "/admin/dashboard", label: "대시보드" },
              { icon: Users, href: "/admin/users", label: "사용자" },
              { icon: Package, href: "/admin/services", label: "서비스" },
              { icon: ShoppingBag, href: "/admin/orders", label: "주문" },
              { icon: Menu, href: "#", label: "더보기", onClick: () => setSidebarOpen(true) },
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


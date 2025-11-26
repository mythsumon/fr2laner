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
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Package, label: "Services", href: "/admin/services" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: AlertTriangle, label: "Disputes", href: "/admin/disputes" },
  { icon: DollarSign, label: "Finance", href: "/admin/finance" },
  { icon: FileText, label: "CMS", href: "/admin/cms" },
  { icon: Megaphone, label: "Marketing", href: "/admin/marketing" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: ClipboardList, label: "Audit Log", href: "/admin/audit" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
];

interface Notification {
  id: string;
  type: "order" | "user" | "service" | "dispute" | "system";
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
    title: "New Order",
    message: "Order #12345 has been received.",
    time: "5 minutes ago",
    isRead: false,
    link: "/admin/orders",
  },
  {
    id: "2",
    type: "user",
    title: "New Seller Registration",
    message: "3 new sellers have requested registration.",
    time: "15 minutes ago",
    isRead: false,
    link: "/admin/users?type=seller&status=pending",
  },
  {
    id: "3",
    type: "service",
    title: "Service Approval Needed",
    message: "5 services are waiting for approval.",
    time: "1 hour ago",
    isRead: false,
    link: "/admin/services?status=pending",
  },
  {
    id: "4",
    type: "dispute",
    title: "New Dispute",
    message: "A dispute has been filed for order #12340.",
    time: "2 hours ago",
    isRead: true,
    link: "/admin/disputes",
  },
  {
    id: "5",
    type: "system",
    title: "System Update",
    message: "New system update has been completed.",
    time: "1 day ago",
    isRead: true,
  },
];

export const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
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
        return <ShoppingBag className="size-5 text-blue-500" />;
      case "user":
        return <Users className="size-5 text-green-500" />;
      case "service":
        return <Package className="size-5 text-purple-500" />;
      case "dispute":
        return <AlertTriangle className="size-5 text-red-500" />;
      case "system":
        return <Info className="size-5 text-gray-500" />;
      default:
        return <Bell className="size-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".notification-dropdown") && !target.closest(".notification-button")) {
        setShowNotifications(false);
      }
      if (!target.closest(".profile-dropdown") && !target.closest(".profile-button")) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              title="Go to Homepage"
            >
              <Home className="size-5" />
            </Link>
            
            {/* Notification Button */}
            <div className="relative notification-button">
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
                <div className="notification-dropdown absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
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
                        href="/admin/support"
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
            <div className="relative profile-button">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors profile-button"
              >
                <User className="size-5 text-[#64748B]" />
                <span className="text-sm font-medium text-[#0F172A] hidden sm:inline">
                  {user?.name || "Admin"}
                </span>
                <ChevronDown className="size-4 text-[#64748B] hidden sm:inline" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="profile-dropdown absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50">
                  <div className="p-4 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-10 rounded-full bg-[#2E5E99]/10">
                        <User className="size-5 text-[#2E5E99]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#0F172A] truncate">
                          {user?.name || "Admin"}
                        </p>
                        <p className="text-xs text-[#64748B] truncate">{user?.email || "admin@example.com"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/admin/settings"
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                    >
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </Link>
                    <Link
                      href="/admin/audit"
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                    >
                      <ClipboardList className="size-4" />
                      <span>Audit Log</span>
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
                    <h1 className="font-bold text-[#0F172A]">Super Admin</h1>
                    <p className="text-xs text-[#64748B]">System Management</p>
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
                    {menuItems.find((item) => pathname === item.href || pathname?.startsWith(item.href + "/"))?.label || "Dashboard"}
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">System management and monitoring</p>
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
                  <div className="relative notification-button">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors notification-button"
                      title="Notifications"
              >
                <Bell className="size-5 text-[#64748B]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="notification-dropdown absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
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
                              href="/admin/support"
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
                  <div className="relative profile-button">
                    <button
                      onClick={() => setShowProfile(!showProfile)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors profile-button"
                    >
                      <User className="size-5 text-[#64748B]" />
                      <span className="text-sm font-medium text-[#0F172A]">
                        {user?.name || "Admin"}
                      </span>
                      <ChevronDown className="size-4 text-[#64748B]" />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfile && (
                      <div className="profile-dropdown absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50">
                        <div className="p-4 border-b border-[#E2E8F0]">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-10 rounded-full bg-[#2E5E99]/10">
                              <User className="size-5 text-[#2E5E99]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-[#0F172A] truncate">
                                {user?.name || "Admin"}
                              </p>
                              <p className="text-xs text-[#64748B] truncate">
                                {user?.email || "admin@example.com"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/admin/settings"
                            onClick={() => setShowProfile(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                          >
                            <Settings className="size-4" />
                            <span>Settings</span>
                          </Link>
                          <Link
                            href="/admin/audit"
                            onClick={() => setShowProfile(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                          >
                            <ClipboardList className="size-4" />
                            <span>Audit Log</span>
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
              { icon: LayoutDashboard, href: "/admin/dashboard", label: "Dashboard" },
              { icon: Users, href: "/admin/users", label: "Users" },
              { icon: Package, href: "/admin/services", label: "Services" },
              { icon: ShoppingBag, href: "/admin/orders", label: "Orders" },
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


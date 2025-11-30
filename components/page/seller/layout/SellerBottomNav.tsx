"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/components/shared/utils";

const navItems = [
  { href: "/expert/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/expert/services", label: "Services", icon: Briefcase },
  { href: "/expert/services/new", label: "New Service", icon: Plus },
  { href: "/expert/orders", label: "Orders", icon: ShoppingBag },
  { href: "/expert/messages", label: "Messages", icon: MessageSquare },
  { href: "/expert/earnings", label: "Earnings", icon: DollarSign },
  { href: "/expert/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/expert/reviews", label: "Reviews", icon: Star },
  { href: "/expert/notifications", label: "Notifications", icon: Bell },
  { href: "/expert/settings", label: "Settings", icon: Settings },
  { href: "/expert/help", label: "Help", icon: HelpCircle },
];

export const SellerBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E2E8F0] bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto max-w-6xl px-3 py-2">
        <div className="flex gap-2 overflow-x-auto text-[11px] font-semibold text-[#94A3B8]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/expert/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-w-[72px] flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-colors",
                  isActive ? "bg-[#E9EEF8] text-[#2E5E99]" : "hover:text-[#2E5E99]"
                )}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};



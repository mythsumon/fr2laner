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

export const SellerBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E2E8F0] bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 py-2">
        <div className="flex gap-2 overflow-x-auto text-[11px] font-semibold text-[#94A3B8]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
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



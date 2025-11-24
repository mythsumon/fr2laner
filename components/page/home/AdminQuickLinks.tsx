"use client";

import Link from "next/link";
import {
  Shield,
  Users,
  Package,
  ShoppingBag,
  Gavel,
  Wallet,
  FileText,
  Megaphone,
  Star,
  BarChart2,
  Settings,
  ScrollText,
  LifeBuoy,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/shared/common";

const adminMenuItems = [
  { icon: LayoutDashboard, label: "대시보드", href: "/admin/dashboard", color: "bg-blue-500" },
  { icon: Users, label: "사용자 관리", href: "/admin/users", color: "bg-green-500" },
  { icon: Package, label: "서비스 관리", href: "/admin/services", color: "bg-purple-500" },
  { icon: ShoppingBag, label: "주문 관리", href: "/admin/orders", color: "bg-orange-500" },
  { icon: Gavel, label: "분쟁 해결", href: "/admin/disputes", color: "bg-red-500" },
  { icon: Wallet, label: "재정 관리", href: "/admin/finance", color: "bg-yellow-500" },
  { icon: FileText, label: "콘텐츠 관리", href: "/admin/cms", color: "bg-indigo-500" },
  { icon: Megaphone, label: "마케팅", href: "/admin/marketing", color: "bg-pink-500" },
  { icon: Star, label: "리뷰 관리", href: "/admin/reviews", color: "bg-amber-500" },
  { icon: BarChart2, label: "분석", href: "/admin/analytics", color: "bg-teal-500" },
  { icon: Settings, label: "시스템 설정", href: "/admin/settings", color: "bg-gray-500" },
  { icon: ScrollText, label: "활동 로그", href: "/admin/audit", color: "bg-slate-500" },
  { icon: LifeBuoy, label: "지원 티켓", href: "/admin/support", color: "bg-cyan-500" },
];

export const AdminQuickLinks = () => {
  return (
    <section id="admin-quick-links" className="bg-gradient-to-br from-[#2E5E99]/5 via-white to-[#2E5E99]/5 py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2E5E99]/10 px-4 py-2 mb-4">
            <Shield className="size-5 text-[#2E5E99]" />
            <span className="text-sm font-semibold text-[#2E5E99]">관리자 패널</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-2">
            관리자 대시보드
          </h2>
          <p className="text-lg text-[#64748B]">
            플랫폼을 관리하고 모니터링하세요
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-8">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#2E5E99] transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`p-3 rounded-lg ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                  <Icon className={`size-6 ${item.color.replace("bg-", "text-")}`} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#0F172A] text-center group-hover:text-[#2E5E99] transition-colors">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/admin/login">
            <Button
              type="default"
              shape="round"
              className="h-12 bg-[#2E5E99] px-6 text-white hover:bg-[#1d4673] transition-colors"
            >
              <Shield className="size-4 mr-2" />
              관리자 로그인
            </Button>
          </Link>
          <Link href="/admin/dashboard">
            <Button
              type="outline"
              shape="round"
              className="h-12 border-[#2E5E99] px-6 text-[#2E5E99] hover:bg-[#2E5E99]/10 transition-colors"
            >
              <LayoutDashboard className="size-4 mr-2" />
              대시보드 바로가기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


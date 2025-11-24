"use client";

import Link from "next/link";
import { Bell, CreditCard, ShieldCheck } from "lucide-react";
import { BuyerBottomNav } from "@/components/page/buyer/BuyerBottomNav";

export const BuyerSettingsPage = () => {
  const accountSettings = [
    {
      id: "notifications",
      label: "알림 설정",
      icon: Bell,
      href: "/settings/notifications",
    },
    {
      id: "payment",
      label: "결제 수단",
      icon: CreditCard,
      href: "/settings/payment",
    },
    {
      id: "security",
      label: "보안 및 인증",
      icon: ShieldCheck,
      href: "/settings/security",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#F0F7FF] pb-24">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Account Settings Section */}
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-[#0F172A]">계정 설정</h2>
          <div className="space-y-3">
            {accountSettings.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-left transition-all hover:bg-[#F8FAFC] hover:shadow-sm active:bg-[#F1F5F9]"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#E9EEF8] p-2.5 text-[#2E5E99]">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-[#2E5E99]">관리</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <BuyerBottomNav />
    </div>
  );
};



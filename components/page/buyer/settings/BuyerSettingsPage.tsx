"use client";

import Link from "next/link";
import { Bell, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/components/shared/utils";

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
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF]">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Account Settings Section */}
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-[#0F172A]">계정 설정</h2>
          <div className="space-y-3">
            {accountSettings.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-left transition-all",
                    "hover:border-[#2E5E99]/30 hover:bg-white hover:shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99] transition-colors group-hover:bg-[#2E5E99]/10">
                      <Icon className="size-6" strokeWidth={2} />
                    </div>
                    <span className="text-base font-semibold text-[#0F172A]">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-[#2E5E99] transition-colors group-hover:text-[#1d4673]">
                    관리
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, CreditCard, ShieldCheck, FileText } from "lucide-react";
import { cn } from "@/components/shared/utils";

interface AdminPolicies {
  termsOfService: string;
  privacyPolicy: string;
  refundPolicy: string;
  userAgreement: string;
}

export const SellerSettingsPage = () => {
  const [policies, setPolicies] = useState<AdminPolicies>({
    termsOfService: "",
    privacyPolicy: "",
    refundPolicy: "",
    userAgreement: "",
  });

  // Load policies from admin settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("admin_settings");
      if (storedSettings) {
        try {
          const parsedSettings = JSON.parse(storedSettings);
          if (parsedSettings.policies) {
            setPolicies(parsedSettings.policies);
          }
        } catch (e) {
          console.warn("Failed to parse admin_settings from localStorage", e);
        }
      }
    }
  }, []);


  const accountSettings = [
    {
      id: "notifications",
      label: "알림 설정",
      icon: Bell,
      href: "/expert/settings/notifications",
    },
    {
      id: "payment",
      label: "결제 수단",
      icon: CreditCard,
      href: "/expert/settings/payment",
    },
    {
      id: "security",
      label: "보안 및 인증",
      icon: ShieldCheck,
      href: "/expert/settings/security",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF] p-4 pb-24 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
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

        {/* Policies Section */}
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-[#0F172A]">정책 및 약관</h2>
          <div className="space-y-3">
            {[
              { id: "terms", label: "이용약관", policy: policies.termsOfService },
              { id: "privacy", label: "개인정보 처리방침", policy: policies.privacyPolicy },
              { id: "refund", label: "환불 정책", policy: policies.refundPolicy },
              { id: "agreement", label: "사용자 계약", policy: policies.userAgreement },
            ].map((item) => (
              <div
                key={item.id}
                className="group flex w-full items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-left transition-all hover:border-[#2E5E99]/30 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99] transition-colors group-hover:bg-[#2E5E99]/10">
                    <FileText className="size-6" strokeWidth={2} />
                  </div>
                  <span className="text-base font-semibold text-[#0F172A]">{item.label}</span>
                </div>
                {item.policy ? (
                  <button
                    onClick={() => {
                      const modal = document.createElement("div");
                      modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";
                      modal.innerHTML = `
                        <div class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[80vh] overflow-y-auto">
                          <h3 class="text-xl font-bold text-[#0F172A] mb-4">${item.label}</h3>
                          <div class="prose prose-sm max-w-none text-[#475569] whitespace-pre-wrap">${item.policy}</div>
                          <button onclick="this.closest('.fixed').remove()" class="mt-4 w-full rounded-lg bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4673]">닫기</button>
                        </div>
                      `;
                      document.body.appendChild(modal);
                      modal.querySelector("button")?.addEventListener("click", () => modal.remove());
                    }}
                    className="text-sm font-medium text-[#2E5E99] transition-colors hover:text-[#1d4673]"
                  >
                    보기
                  </button>
                ) : (
                  <span className="text-sm text-[#94A3B8]">준비 중</span>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};



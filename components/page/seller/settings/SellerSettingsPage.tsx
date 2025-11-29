"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, Save, Bell, CreditCard, ShieldCheck, Image as ImageIcon, X, FileText } from "lucide-react";
import { Button } from "@/components/shared/common";
import { cn } from "@/components/shared/utils";

interface AdminPolicies {
  termsOfService: string;
  privacyPolicy: string;
  refundPolicy: string;
  userAgreement: string;
}

export const SellerSettingsPage = () => {
  const [formData, setFormData] = useState({
    displayName: "김디자인",
    description: "10년 경력의 전문 디자이너입니다.",
    languages: ["한국어", "영어"],
    skills: ["로고 디자인", "브랜딩", "UI/UX"],
    education: "디자인 학사",
    experience: "10년",
    profilePhoto: null as File | null,
    portfolio: [] as File[],
    contactEmail: "",
    contactPhone: "",
  });
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

  const handleSave = () => {
    console.log("Save settings:", formData);
  };

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
                  href={`/expert${item.href}`}
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

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">프로필 설정</h1>
          <p className="mt-1 text-sm text-[#475569]">프로필 정보를 관리하세요</p>
        </div>

        {/* Profile Photo */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-[#0F172A]">프로필 사진</label>
          <div className="flex items-center gap-4">
            <div className="relative size-24 overflow-hidden rounded-full bg-slate-100">
              {formData.profilePhoto ? (
                <Image
                  src={URL.createObjectURL(formData.profilePhoto)}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl text-[#CBD5F5]">
                  👤
                </div>
              )}
            </div>
            <label className="cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F1F5F9]">
              <Upload className="mr-2 inline size-4" />
              사진 변경
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, profilePhoto: file }));
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Basic Info */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">기본 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">이름</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">소개</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">연락처 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">이메일</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="contact@example.com"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">전화번호</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="010-1234-5678"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">포트폴리오</h2>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-colors hover:border-[#2E5E99] hover:bg-[#E9EEF8]">
              <ImageIcon className="size-5 text-[#2E5E99]" />
              <span className="text-sm font-semibold text-[#2E5E99]">포트폴리오 이미지 업로드</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData((prev) => ({
                    ...prev,
                    portfolio: [...prev.portfolio, ...files],
                  }));
                }}
              />
            </label>
            {formData.portfolio.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {formData.portfolio.map((file, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg border border-[#E2E8F0] bg-slate-100">
                    {file.type.startsWith("image/") && (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Portfolio ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          portfolio: prev.portfolio.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">스킬</h2>
          <div className="mb-3 flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full bg-[#E9EEF8] px-3 py-1 text-sm font-medium text-[#2E5E99]"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      skills: prev.skills.filter((s) => s !== skill),
                    }))
                  }
                  className="hover:text-[#1d4673]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="스킬 입력 후 Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.currentTarget;
                if (input.value.trim() && !formData.skills.includes(input.value.trim())) {
                  setFormData((prev) => ({
                    ...prev,
                    skills: [...prev.skills, input.value.trim()],
                  }));
                  input.value = "";
                }
              }
            }}
            className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={handleSave}
            className="gap-2 bg-[#2E5E99] px-6 text-sm font-semibold text-white hover:bg-[#1d4673]"
          >
            <Save className="size-4" />
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};



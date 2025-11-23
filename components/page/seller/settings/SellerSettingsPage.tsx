"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Save } from "lucide-react";
import { Button } from "@/components/shared/common";

export const SellerSettingsPage = () => {
  const [formData, setFormData] = useState({
    displayName: "김디자인",
    description: "10년 경력의 전문 디자이너입니다.",
    languages: ["한국어", "영어"],
    skills: ["로고 디자인", "브랜딩", "UI/UX"],
    education: "디자인 학사",
    experience: "10년",
    profilePhoto: null as File | null,
  });

  const handleSave = () => {
    console.log("Save settings:", formData);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
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



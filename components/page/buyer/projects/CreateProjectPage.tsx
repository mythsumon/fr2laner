"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

export const CreateProjectPage = () => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    attachments: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add project creation logic here
    router.push("/client/projects");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/client/projects">
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              프로젝트 목록으로
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">새 프로젝트 만들기</h1>
          <p className="mt-1 text-sm text-[#475569]">전문가들에게 프로젝트를 제안하고 견적을 받아보세요</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              프로젝트 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              placeholder="예: 웹사이트 리뉴얼 프로젝트"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              프로젝트 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
              rows={8}
              placeholder="프로젝트의 목표, 요구사항, 예상 기간 등을 자세히 설명해주세요..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                required
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
              >
                <option value="">선택하세요</option>
                <option value="design">디자인</option>
                <option value="development">개발</option>
                <option value="marketing">마케팅</option>
                <option value="writing">글쓰기</option>
                <option value="translation">번역</option>
              </select>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                예산 범위 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                required
                placeholder="예: 500,000 - 1,000,000원"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              마감일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
              required
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">첨부 파일</label>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-colors hover:border-[#2E5E99] hover:bg-[#E9EEF8]">
                <Upload className="size-5 text-[#2E5E99]" />
                <span className="text-sm font-semibold text-[#2E5E99]">파일 업로드</span>
                <input type="file" multiple onChange={handleFileUpload} className="hidden" />
              </label>
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3"
                    >
                      <span className="text-sm text-[#0F172A]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="rounded-lg p-1 text-[#94A3B8] transition-colors hover:bg-[#E2E8F0] hover:text-[#0F172A]"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/client/projects" className="flex-1">
              <Button
                type="default"
                shape="round"
                className="w-full border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569]"
              >
                취소
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              className="flex-1 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white"
            >
              프로젝트 등록하기
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};



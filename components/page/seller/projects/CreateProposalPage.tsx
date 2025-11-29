"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

const mockProject = {
  id: "PROJ-001",
  title: "웹사이트 리뉴얼 프로젝트",
  budget: "500,000 - 1,000,000원",
};

export const CreateProposalPage = () => {
  useBodyClass("dashboard-page");
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [formData, setFormData] = useState({
    price: "",
    deliveryDays: "",
    message: "",
    attachments: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add proposal creation logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    router.push(`/expert/projects/${projectId}`);
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
          <Link href={`/expert/projects/${projectId}`}>
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              프로젝트 상세로
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">제안 보내기</h1>
          <p className="mt-1 text-sm text-[#475569]">{mockProject.title}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              제안 가격 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              required
              placeholder="예: 750,000원"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
            <p className="mt-2 text-xs text-[#94A3B8]">프로젝트 예산 범위: {mockProject.budget}</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              예상 작업 기간 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.deliveryDays}
              onChange={(e) => setFormData((prev) => ({ ...prev, deliveryDays: e.target.value }))}
              required
              placeholder="예: 14"
              min="1"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
            <p className="mt-2 text-xs text-[#94A3B8]">일 단위로 입력해주세요</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              제안 메시지 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              required
              rows={8}
              placeholder="프로젝트에 대한 제안과 자신의 경험, 작업 방식을 설명해주세요..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">포트폴리오 첨부</label>
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
            <Link href={`/expert/projects/${projectId}`} className="flex-1">
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
              disabled={isSubmitting}
              className="flex-1 gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white"
            >
              <Save className="size-4" />
              {isSubmitting ? "제출 중..." : "제안 보내기"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};



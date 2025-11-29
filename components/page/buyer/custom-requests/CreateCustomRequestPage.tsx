"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, Calendar, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import { useRouter } from "next/navigation";

interface Requirement {
  id: string;
  type: "text" | "file" | "multiple";
  question: string;
  options?: string[];
}

export const CreateCustomRequestPage = () => {
  useBodyClass("dashboard-page");
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    requirements: [] as Requirement[],
  });

  const [newRequirement, setNewRequirement] = useState({
    type: "text" as "text" | "file" | "multiple",
    question: "",
    options: [] as string[],
    newOption: "",
  });

  const categories = [
    "디자인 & 브랜딩",
    "IT · 프로그래밍",
    "영상 · 사진 · 음향",
    "마케팅 · 광고",
    "문서 · 글쓰기",
    "번역",
    "기타",
  ];

  const handleAddRequirement = () => {
    if (!newRequirement.question.trim()) return;

    const requirement: Requirement = {
      id: Date.now().toString(),
      type: newRequirement.type,
      question: newRequirement.question,
      ...(newRequirement.type === "multiple" && { options: newRequirement.options }),
    };

    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, requirement],
    }));

    setNewRequirement({
      type: "text",
      question: "",
      options: [],
      newOption: "",
    });
  };

  const handleRemoveRequirement = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((req) => req.id !== id),
    }));
  };

  const handleAddOption = () => {
    if (!newRequirement.newOption.trim()) return;
    setNewRequirement((prev) => ({
      ...prev,
      options: [...prev.options, prev.newOption],
      newOption: "",
    }));
  };

  const handleRemoveOption = (index: number) => {
    setNewRequirement((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting request:", formData);
    // Add API call here
    router.push("/custom-requests");
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    // Add API call here
    router.push("/custom-requests");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/client/custom-requests">
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              커스텀 요청으로
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">새 요청 만들기</h1>
          <p className="mt-1 text-sm text-[#475569]">프로젝트 요청서를 작성하고 전문가의 제안을 받아보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">기본 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  요청 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="예: 프리미엄 로고 디자인"
                  required
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  상세 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="프로젝트에 대한 자세한 설명을 작성해주세요..."
                  rows={6}
                  required
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    required
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                  >
                    <option value="">카테고리 선택</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    예산 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#94A3B8]" />
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                      placeholder="500000"
                      required
                      min="0"
                      className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 pl-10 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  마감일 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 pl-10 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">요구사항</h2>
            <p className="mb-4 text-sm text-[#475569]">전문가에게 필요한 정보를 요청하세요</p>

            {/* Existing Requirements */}
            {formData.requirements.length > 0 && (
              <div className="mb-4 space-y-3">
                {formData.requirements.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-start justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <FileText className="size-4 text-[#2E5E99]" />
                        <span className="text-xs font-semibold text-[#94A3B8]">
                          {req.type === "text" ? "텍스트" : req.type === "file" ? "파일" : "선택형"}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#0F172A]">{req.question}</p>
                      {req.type === "multiple" && req.options && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {req.options.map((opt, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-white px-2 py-1 text-xs text-[#475569]"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(req.id)}
                      className="ml-4 rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white hover:text-red-500"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Requirement */}
            <div className="rounded-lg border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">요구사항 유형</label>
                <select
                  value={newRequirement.type}
                  onChange={(e) =>
                    setNewRequirement((prev) => ({ ...prev, type: e.target.value as any }))
                  }
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                >
                  <option value="text">텍스트 입력</option>
                  <option value="file">파일 업로드</option>
                  <option value="multiple">선택형 (다중 선택)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">질문</label>
                <input
                  type="text"
                  value={newRequirement.question}
                  onChange={(e) =>
                    setNewRequirement((prev) => ({ ...prev, question: e.target.value }))
                  }
                  placeholder="예: 브랜드 컨셉을 설명해주세요"
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                />
              </div>

              {newRequirement.type === "multiple" && (
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">선택 옵션</label>
                  <div className="mb-2 flex gap-2">
                    <input
                      type="text"
                      value={newRequirement.newOption}
                      onChange={(e) =>
                        setNewRequirement((prev) => ({ ...prev, newOption: e.target.value }))
                      }
                      placeholder="옵션 입력"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddOption();
                        }
                      }}
                      className="flex-1 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                    />
                    <Button
                      type="default"
                      size="small"
                      shape="round"
                      onClick={handleAddOption}
                      className="border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC]"
                    >
                      추가
                    </Button>
                  </div>
                  {newRequirement.options.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newRequirement.options.map((opt, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs text-[#475569]"
                        >
                          {opt}
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(idx)}
                            className="text-[#94A3B8] hover:text-red-500"
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Button
                type="default"
                size="small"
                shape="round"
                onClick={handleAddRequirement}
                disabled={!newRequirement.question.trim()}
                className="w-full gap-2 border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-50"
              >
                <Plus className="size-4" />
                요구사항 추가
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="default"
              size="large"
              shape="round"
              onClick={handleSaveDraft}
              className="w-full gap-2 border border-[#E2E8F0] bg-white px-6 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] sm:w-auto"
            >
              임시 저장
            </Button>
            <Button
              type="primary"
              size="large"
              shape="round"
              className="w-full gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 text-sm font-semibold text-white shadow-md hover:shadow-lg sm:w-auto"
            >
              요청 게시하기
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};





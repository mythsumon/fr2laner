"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, FileText, Clock, User, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

interface CustomRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: string;
  status: "draft" | "open" | "in-progress" | "completed" | "cancelled";
  proposals: number;
  createdAt: string;
}

const mockRequests: CustomRequest[] = [
  {
    id: "REQ-001",
    title: "로고 디자인 요청",
    description: "심플하고 모던한 느낌의 로고 디자인이 필요합니다.",
    category: "디자인 & 브랜딩",
    budget: 500000,
    deadline: "2024-02-15",
    status: "open",
    proposals: 5,
    createdAt: "2024-01-10",
  },
  {
    id: "REQ-002",
    title: "웹사이트 개발",
    description: "반응형 웹사이트 개발이 필요합니다.",
    category: "IT · 프로그래밍",
    budget: 2000000,
    deadline: "2024-03-01",
    status: "in-progress",
    proposals: 12,
    createdAt: "2024-01-05",
  },
  {
    id: "REQ-003",
    title: "브랜드 아이덴티티",
    description: "전체 브랜드 아이덴티티 디자인이 필요합니다.",
    category: "디자인 & 브랜딩",
    budget: 1500000,
    deadline: "2024-02-20",
    status: "draft",
    proposals: 0,
    createdAt: "2024-01-12",
  },
];

const statusStyles = {
  draft: "bg-gray-50 text-gray-700 border-gray-200",
  open: "bg-blue-50 text-blue-700 border-blue-200",
  "in-progress": "bg-purple-50 text-purple-700 border-purple-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels = {
  draft: "임시저장",
  open: "모집중",
  "in-progress": "진행중",
  completed: "완료",
  cancelled: "취소",
};

export const CustomRequestsPage = () => {
  useBodyClass("dashboard-page");
  const [activeTab, setActiveTab] = useState<CustomRequest["status"] | "all">("all");

  const filteredRequests = mockRequests.filter(
    (request) => activeTab === "all" || request.status === activeTab
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">커스텀 요청</h1>
            <p className="mt-1 text-sm text-[#475569]">요청서 작성 및 제안 관리</p>
          </div>
          <Link href="/custom-requests/new">
            <Button
              type="primary"
              size="large"
              shape="round"
              className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 text-sm font-semibold text-white shadow-md hover:shadow-lg"
            >
              <Plus className="size-4" />
              새 요청 만들기
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
          {[
            { id: "all" as const, label: "전체" },
            { id: "draft" as const, label: "임시저장" },
            { id: "open" as const, label: "모집중" },
            { id: "in-progress" as const, label: "진행중" },
            { id: "completed" as const, label: "완료" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.id ? "bg-[#2E5E99] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#CBD5F5] bg-white px-6 py-16 text-center">
              <FileText className="mx-auto size-12 text-[#94A3B8]" />
              <p className="mt-4 text-lg font-semibold text-[#475569]">요청이 없습니다.</p>
              <p className="mt-2 text-sm text-[#94A3B8]">새로운 커스텀 요청을 만들어보세요.</p>
              <Link href="/custom-requests/new" className="mt-4 inline-block">
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 text-sm font-semibold text-white"
                >
                  <Plus className="size-4" />
                  새 요청 만들기
                </Button>
              </Link>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#94A3B8]">{request.id}</span>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${statusStyles[request.status]}`}
                      >
                        {statusLabels[request.status]}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-[#0F172A]">{request.title}</h3>
                    <p className="mb-3 text-sm text-[#475569]">{request.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#475569]">
                      <div className="flex items-center gap-1.5">
                        <FileText className="size-4" />
                        <span>{request.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4" />
                        <span>마감: {request.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="size-4" />
                        <span>제안 {request.proposals}개</span>
                      </div>
                    </div>
                    <div className="mt-3 text-lg font-bold text-[#0F172A]">
                      예산: ₩{request.budget.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    {request.status === "draft" && (
                      <Link href={`/custom-requests/${request.id}/edit`}>
                        <Button
                          type="default"
                          size="small"
                          shape="round"
                          className="gap-2 border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC]"
                        >
                          수정하기
                        </Button>
                      </Link>
                    )}
                    {request.status === "open" && (
                      <Link href={`/custom-requests/${request.id}/proposals`}>
                        <Button
                          type="primary"
                          size="small"
                          shape="round"
                          className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-4 text-sm font-semibold text-white shadow-md"
                        >
                          제안 보기 ({request.proposals})
                        </Button>
                      </Link>
                    )}
                    {request.status === "in-progress" && (
                      <Link href={`/custom-requests/${request.id}`}>
                        <Button
                          type="primary"
                          size="small"
                          shape="round"
                          className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-4 text-sm font-semibold text-white shadow-md"
                        >
                          진행 상황 보기
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};



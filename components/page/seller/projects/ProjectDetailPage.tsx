"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, FileText, Users, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

const mockProject = {
  id: "PROJ-001",
  title: "웹사이트 리뉴얼 프로젝트",
  description: `기존 웹사이트를 모던한 디자인으로 리뉴얼하고 싶습니다. 
  
주요 요구사항:
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 사용자 경험 개선
- 브랜드 아이덴티티 반영
- SEO 최적화`,
  budget: "500,000 - 1,000,000원",
  deadline: "2024-02-15",
  createdAt: "2024-01-10",
  proposals: 5,
  status: "open",
  category: "웹 디자인",
  buyerName: "김클라이언트",
  attachments: ["요구사항_문서.pdf", "참고_사이트.pdf"],
};

export const ProjectDetailPage = () => {
  useBodyClass("dashboard-page");
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/expert/projects">
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              프로젝트 목록으로
            </button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold text-[#94A3B8]">{mockProject.id}</span>
                <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-700">
                  {mockProject.status === "open" ? "제안 가능" : "진행 중"}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">{mockProject.title}</h1>
            </div>
            <Link href={`/expert/projects/${projectId}/proposals/new`}>
              <Button
                type="primary"
                shape="round"
                className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 py-2 text-sm font-semibold text-white"
              >
                <Send className="size-4" />
                제안 보내기
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Description */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">프로젝트 설명</h2>
              <div className="prose prose-sm max-w-none text-[#475569] whitespace-pre-line">
                {mockProject.description}
              </div>
            </div>

            {/* Attachments */}
            {mockProject.attachments.length > 0 && (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">첨부 파일</h2>
                <div className="space-y-2">
                  {mockProject.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3"
                    >
                      <FileText className="size-5 text-[#2E5E99]" />
                      <span className="flex-1 text-sm text-[#0F172A]">{file}</span>
                      <Button
                        type="default"
                        size="small"
                        shape="round"
                        className="border border-[#E2E8F0] bg-white text-xs font-semibold text-[#475569]"
                      >
                        다운로드
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Info */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">프로젝트 정보</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">예산</p>
                    <p className="font-semibold text-[#0F172A]">{mockProject.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">마감일</p>
                    <p className="font-semibold text-[#0F172A]">{mockProject.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">받은 제안</p>
                    <p className="font-semibold text-[#2E5E99]">{mockProject.proposals}개</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">카테고리</p>
                    <p className="font-semibold text-[#0F172A]">{mockProject.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">의뢰인</p>
                    <p className="font-semibold text-[#0F172A]">{mockProject.buyerName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">액션</h3>
              <div className="space-y-2">
                <Link href={`/expert/projects/${projectId}/proposals/new`} className="block">
                  <Button
                    type="primary"
                    shape="round"
                    className="w-full gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white"
                  >
                    <Send className="size-4" />
                    제안 보내기
                  </Button>
                </Link>
                <Link href={`/expert/messages?buyer=${mockProject.buyerName}`} className="block">
                  <Button
                    type="default"
                    shape="round"
                    className="w-full border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569]"
                  >
                    <MessageSquare className="size-4" />
                    의뢰인에게 문의
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};



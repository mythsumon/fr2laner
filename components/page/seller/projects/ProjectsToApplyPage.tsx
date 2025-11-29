"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderKanban, Search, Filter, Clock, DollarSign, Users, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

type ProjectStatus = "all" | "open" | "in-progress" | "closed";

const mockProjects = [
  {
    id: "PROJ-001",
    title: "웹사이트 리뉴얼 프로젝트",
    description: "기존 웹사이트를 모던한 디자인으로 리뉴얼하고 싶습니다.",
    budget: "500,000 - 1,000,000원",
    deadline: "2024-02-15",
    proposals: 5,
    status: "open",
    category: "웹 디자인",
    buyerName: "김클라이언트",
    createdAt: "2024-01-10",
  },
  {
    id: "PROJ-002",
    title: "모바일 앱 UI/UX 디자인",
    description: "iOS/Android 앱의 UI/UX 디자인이 필요합니다.",
    budget: "1,000,000 - 2,000,000원",
    deadline: "2024-02-20",
    proposals: 3,
    status: "open",
    category: "UI/UX 디자인",
    buyerName: "박의뢰인",
    createdAt: "2024-01-08",
  },
  {
    id: "PROJ-003",
    title: "브랜드 아이덴티티 개발",
    description: "새로운 브랜드의 로고, 컬러, 타이포그래피를 개발하고 싶습니다.",
    budget: "800,000 - 1,500,000원",
    deadline: "2024-02-25",
    proposals: 8,
    status: "open",
    category: "브랜딩",
    buyerName: "이구매자",
    createdAt: "2024-01-12",
  },
];

const statusTabs: { id: ProjectStatus; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "open", label: "제안 가능" },
  { id: "in-progress", label: "진행 중" },
  { id: "closed", label: "마감" },
];

export const ProjectsToApplyPage = () => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProjectStatus>("open");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter((project) => {
    // Default to showing only "open" status projects
    const matchesTab = activeTab === "all" 
      ? true 
      : activeTab === "open" 
        ? project.status === "open" 
        : project.status === activeTab;
    const matchesSearch = searchQuery === "" || project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">제안 가능한 프로젝트</h1>
          <p className="mt-1 text-sm text-[#475569]">클라이언트의 프로젝트에 제안을 보내보세요</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프로젝트 검색..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-10 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
          >
            <Filter className="size-4" />
            필터
          </button>
        </div>

        {/* Status Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id ? "bg-[#2E5E99] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#CBD5F5] bg-white px-6 py-16 text-center">
              <FolderKanban className="mx-auto mb-4 size-12 text-[#94A3B8]" />
              <p className="text-lg font-semibold text-[#475569]">제안 가능한 프로젝트가 없습니다.</p>
              <p className="mt-2 text-sm text-[#94A3B8]">조금만 기다려주세요. 새로운 프로젝트가 곧 올라올 것입니다.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:border-[#2E5E99] hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#94A3B8]">{project.id}</span>
                      <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-700">
                        {project.status === "open" ? "제안 가능" : "진행 중"}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[#0F172A]">{project.title}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-[#475569]">{project.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#94A3B8]">
                      <div className="flex items-center gap-1">
                        <DollarSign className="size-4" />
                        <span className="font-semibold text-[#2E5E99]">{project.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>마감: {project.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="size-4" />
                        <span>제안 {project.proposals}개</span>
                      </div>
                      <span>카테고리: {project.category}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <Link href={`/expert/projects/${project.id}`}>
                      <Button
                        type="default"
                        shape="round"
                        className="w-full gap-2 border border-[#2E5E99] bg-white text-sm font-semibold text-[#2E5E99] hover:bg-[#E9EEF8] sm:w-auto"
                      >
                        상세 보기
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                    <Link href={`/expert/projects/${project.id}/proposals/new`}>
                      <Button
                        type="primary"
                        shape="round"
                        className="w-full gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white sm:w-auto"
                      >
                        <Send className="size-4" />
                        제안 보내기
                      </Button>
                    </Link>
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



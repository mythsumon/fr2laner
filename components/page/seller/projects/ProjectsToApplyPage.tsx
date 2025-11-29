"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderKanban, Search, Filter, Clock, DollarSign, Users, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import type { ProjectStatus } from "@/types/common";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  status: ProjectStatus;
  buyerId: string;
  buyer: string;
  proposals: number;
  createdAt: string;
  attachments?: string[];
}

const statusTabs: { id: ProjectStatus | "all"; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "open", label: "제안 가능" },
  { id: "in_progress", label: "진행 중" },
  { id: "closed", label: "마감" },
];

export const ProjectsToApplyPage = () => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProjectStatus | "all">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        try {
          const allProjects: Project[] = JSON.parse(storedProjects);
          // Filter only open projects by default
          setProjects(allProjects);
        } catch (e) {
          console.warn("Failed to parse projects from localStorage", e);
        }
      }
    }
  }, []);

  const filteredProjects = projects.filter((project) => {
    // Default to showing only "open" status projects
    const matchesTab = activeTab === "all" 
      ? true 
      : activeTab === "open" 
        ? project.status === "open" 
        : project.status === activeTab;
    const matchesSearch = searchQuery === "" || project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    return matchesTab && matchesSearch && matchesCategory;
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
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#475569] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">전체 카테고리</option>
            <option value="디자인">디자인</option>
            <option value="개발">개발</option>
            <option value="마케팅">마케팅</option>
            <option value="글쓰기">글쓰기</option>
            <option value="번역">번역</option>
          </select>
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
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                          project.status === "open"
                            ? "bg-blue-50 text-blue-700"
                            : project.status === "in_progress"
                              ? "bg-green-50 text-green-700"
                              : project.status === "closed"
                                ? "bg-gray-50 text-gray-700"
                                : "bg-red-50 text-red-700"
                        }`}
                      >
                        {project.status === "open"
                          ? "제안 가능"
                          : project.status === "in_progress"
                            ? "진행 중"
                            : project.status === "closed"
                              ? "마감"
                              : "취소"}
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
                      <span>의뢰인: {project.buyer}</span>
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



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderKanban, Plus, Search, Filter, Clock, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
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
  { id: "open", label: "제안 대기" },
  { id: "in_progress", label: "진행 중" },
  { id: "closed", label: "완료" },
];

export const ProjectsPage = () => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProjectStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        try {
          const allProjects: Project[] = JSON.parse(storedProjects);
          // Filter projects by current user
          const userProjects = allProjects.filter((p) => p.buyerId === user.id);
          setProjects(userProjects);
        } catch (e) {
          console.warn("Failed to parse projects from localStorage", e);
        }
      }
    }
  }, [user]);

  const filteredProjects = projects.filter((project) => {
    const matchesTab = activeTab === "all" || project.status === activeTab;
    const matchesSearch = searchQuery === "" || project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">내 프로젝트</h1>
            <p className="mt-1 text-sm text-[#475569]">전문가들의 제안을 받아보세요</p>
          </div>
          <Link href="/client/projects/new">
            <Button
              type="primary"
              shape="round"
              className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Plus className="size-4" />
              새 프로젝트 만들기
            </Button>
          </Link>
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
              <p className="text-lg font-semibold text-[#475569]">프로젝트가 없습니다.</p>
              <p className="mt-2 text-sm text-[#94A3B8]">새 프로젝트를 만들어 전문가들의 제안을 받아보세요.</p>
              <Link href="/client/projects/new" className="mt-4 inline-block">
                <Button
                  type="primary"
                  shape="round"
                  className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 py-2 text-sm font-semibold text-white"
                >
                  <Plus className="size-4" />
                  새 프로젝트 만들기
                </Button>
              </Link>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/client/projects/${project.id}`}
                className="block rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#2E5E99] hover:shadow-lg"
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
                        {statusTabs.find((tab) => tab.id === project.status)?.label || project.status}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[#0F172A]">{project.title}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-[#475569]">{project.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#94A3B8]">
                      <div className="flex items-center gap-1">
                        <Users className="size-4" />
                        <span className="font-semibold text-[#2E5E99]">제안 {project.proposals}개</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>마감: {project.deadline}</span>
                      </div>
                      <span>예산: {project.budget}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <Link
                      href={`/client/projects/${project.id}/proposals`}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg border border-[#2E5E99] bg-white px-4 py-2 text-sm font-semibold text-[#2E5E99] transition-colors hover:bg-[#E9EEF8]"
                    >
                      제안 보기
                    </Link>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};



"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, FileText, Users, Send, MessageSquare } from "lucide-react";
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

export const ProjectDetailPage = () => {
  useBodyClass("dashboard-page");
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        try {
          const allProjects: Project[] = JSON.parse(storedProjects);
          const foundProject = allProjects.find((p) => p.id === projectId);
          if (foundProject) {
            setProject(foundProject);
          } else {
            router.push("/expert/projects");
          }
        } catch (e) {
          console.warn("Failed to parse projects from localStorage", e);
          router.push("/expert/projects");
        }
      } else {
        router.push("/expert/projects");
      }
    }
  }, [projectId, router]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-[#2E5E99] border-r-transparent"></div>
          <p className="text-sm text-[#94A3B8]">Loading...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">{project.title}</h1>
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
                {project.description}
              </div>
            </div>

            {/* Attachments */}
            {project.attachments && project.attachments.length > 0 && (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">첨부 파일</h2>
                <div className="space-y-2">
                  {project.attachments.map((file, index) => (
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
                    <p className="font-semibold text-[#0F172A]">{project.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">마감일</p>
                    <p className="font-semibold text-[#0F172A]">{project.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">받은 제안</p>
                    <p className="font-semibold text-[#2E5E99]">{project.proposals}개</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">카테고리</p>
                    <p className="font-semibold text-[#0F172A]">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="size-5 text-[#94A3B8]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">의뢰인</p>
                    <p className="font-semibold text-[#0F172A]">{project.buyer}</p>
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
                <Link href={`/expert/messages?buyer=${project.buyer}`} className="block">
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



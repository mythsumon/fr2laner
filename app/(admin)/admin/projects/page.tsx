"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  X,
  FolderKanban,
  User,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";

type ProjectStatus = "open" | "in_progress" | "closed" | "cancelled";

interface Project {
  id: string;
  title: string;
  buyer: string;
  buyerId: string;
  budget: string;
  deadline: string;
  status: ProjectStatus;
  proposals: number;
  createdAt: string;
  isAbnormal?: boolean;
}

const initialProjects: Project[] = [
  {
    id: "PROJ-001",
    title: "웹사이트 리뉴얼 프로젝트",
    buyer: "김클라이언트",
    buyerId: "client-1",
    budget: "500,000 - 1,000,000원",
    deadline: "2024-02-15",
    status: "open",
    proposals: 5,
    createdAt: "2024-01-10",
    isAbnormal: false,
  },
  {
    id: "PROJ-002",
    title: "모바일 앱 UI/UX 디자인",
    buyer: "박의뢰인",
    buyerId: "client-2",
    budget: "1,000,000 - 2,000,000원",
    deadline: "2024-02-20",
    status: "in_progress",
    proposals: 3,
    createdAt: "2024-01-08",
    isAbnormal: true,
  },
  {
    id: "PROJ-003",
    title: "브랜드 아이덴티티 개발",
    buyer: "이구매자",
    buyerId: "client-3",
    budget: "800,000 - 1,500,000원",
    deadline: "2024-02-25",
    status: "closed",
    proposals: 8,
    createdAt: "2024-01-12",
    isAbnormal: false,
  },
];

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const { toast, showToast, hideToast } = useToast();
  const [closeModal, setCloseModal] = useState<{ isOpen: boolean; project: Project | null }>({
    isOpen: false,
    project: null,
  });

  // Load projects from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        try {
          const allProjects: Project[] = JSON.parse(storedProjects);
          setProjects(allProjects);
        } catch (e) {
          console.warn("Failed to parse projects from localStorage", e);
          setProjects(initialProjects);
        }
      } else {
        setProjects(initialProjects);
      }
    }
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCloseProject = (project: Project) => {
    setCloseModal({ isOpen: true, project });
  };

  const confirmCloseProject = () => {
    if (closeModal.project) {
      const updatedProjects = projects.map((p) =>
        p.id === closeModal.project!.id ? { ...p, status: "closed" as ProjectStatus, isAbnormal: false } : p
      );
      setProjects(updatedProjects);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      }
      showToast("프로젝트가 닫혔습니다.", "success");
      setCloseModal({ isOpen: false, project: null });
    }
  };

  const getStatusBadge = (status: ProjectStatus) => {
    const styles = {
      open: "bg-blue-50 text-blue-700 border-blue-200",
      in_progress: "bg-yellow-50 text-yellow-700 border-yellow-200",
      closed: "bg-green-50 text-green-700 border-green-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    const labels = {
      open: "진행 대기",
      in_progress: "진행 중",
      closed: "완료",
      cancelled: "취소",
    };
    return { style: styles[status], label: labels[status] };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">프로젝트 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">모든 프로젝트를 관리하세요</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프로젝트 검색..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "all")}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            >
              <option value="all">전체 상태</option>
              <option value="open">진행 대기</option>
              <option value="in_progress">진행 중</option>
              <option value="closed">완료</option>
              <option value="cancelled">취소</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">제목</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">의뢰인</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">예산</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">마감일</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">제안</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#64748B]">
                    프로젝트가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const statusBadge = getStatusBadge(project.status);
                  return (
                    <tr key={project.id} className="hover:bg-[#F8FAFC]">
                      <td className="px-4 py-4">
                        <div className="font-medium text-[#0F172A]">{project.id}</div>
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/client/projects/${project.id}`}
                          target="_blank"
                          className="font-medium text-[#0F172A] hover:text-[#2E5E99] hover:underline"
                        >
                          {project.title}
                        </Link>
                        {project.isAbnormal && (
                          <span className="inline-block mt-1 text-xs font-semibold text-red-600">비정상</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/client/projects/${project.id}`}
                          className="text-[#2E5E99] hover:underline font-medium"
                        >
                          {project.buyer}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-[#0F172A]">{project.budget}</td>
                      <td className="px-4 py-4 text-[#64748B]">{project.deadline}</td>
                      <td className="px-4 py-4 text-[#0F172A]">{project.proposals}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.style}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/client/projects/${project.id}`} target="_blank">
                            <Button type="ghost" size="sm" title="Buyer 화면에서 보기">
                              <Eye className="size-4 mr-1" />
                              Buyer 화면
                            </Button>
                          </Link>
                          <Link href={`/expert/projects?status=open`} target="_blank">
                            <Button type="ghost" size="sm" title="Seller 화면(지원 목록) 보기">
                              <Eye className="size-4 mr-1" />
                              Seller 화면
                            </Button>
                          </Link>
                          {project.isAbnormal && project.status !== "closed" && (
                            <Button
                              type="ghost"
                              size="sm"
                              onClick={() => handleCloseProject(project)}
                              className="text-red-600 hover:text-red-700"
                              title="프로젝트 닫기"
                            >
                              <XCircle className="size-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Close Project Modal */}
      <ConfirmModal
        isOpen={closeModal.isOpen}
        onClose={() => setCloseModal({ isOpen: false, project: null })}
        onConfirm={confirmCloseProject}
        title="프로젝트 닫기"
        message={`정말로 "${closeModal.project?.title}" 프로젝트를 닫으시겠습니까?`}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}



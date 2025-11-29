"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/page/admin/shared/Toast";
import type { ProjectStatus, ProposalStatus } from "@/types/common";

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

interface Proposal {
  id: string;
  projectId: string;
  expertId: string;
  expertName: string;
  price: number;
  deliveryDays: number;
  message: string;
  status: ProposalStatus;
  createdAt: string;
  attachments?: string[];
}

export const CreateProposalPage = () => {
  useBodyClass("dashboard-page");
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    price: "",
    deliveryDays: "",
    message: "",
    attachments: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !project) {
      showToast("로그인이 필요합니다.", "error");
      return;
    }

    setIsSubmitting(true);

    // Create proposal
    const proposalId = `PROP-${Date.now()}`;
    const newProposal: Proposal = {
      id: proposalId,
      projectId: projectId,
      expertId: user.id,
      expertName: user.name,
      price: parseFloat(formData.price.replace(/[^0-9]/g, "")) || 0,
      deliveryDays: parseInt(formData.deliveryDays) || 0,
      message: formData.message,
      status: "sent",
      createdAt: new Date().toISOString(),
      attachments: formData.attachments.map((f) => f.name),
    };

    // Save proposal to localStorage
    if (typeof window !== "undefined") {
      const storedProposals = localStorage.getItem("proposals");
      const existingProposals: Proposal[] = storedProposals ? JSON.parse(storedProposals) : [];
      existingProposals.push(newProposal);
      localStorage.setItem("proposals", JSON.stringify(existingProposals));

      // Update project proposals count
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        const allProjects: Project[] = JSON.parse(storedProjects);
        const updatedProjects = allProjects.map((p) =>
          p.id === projectId ? { ...p, proposals: p.proposals + 1 } : p
        );
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      }
    }

    setIsSubmitting(false);
    showToast("제안이 성공적으로 전송되었습니다!", "success");
    setTimeout(() => {
      router.push(`/expert/projects/${projectId}`);
    }, 1000);
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
          <p className="mt-1 text-sm text-[#475569]">{project?.title || "로딩 중..."}</p>
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
            <p className="mt-2 text-xs text-[#94A3B8]">프로젝트 예산 범위: {project?.budget || ""}</p>
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
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};



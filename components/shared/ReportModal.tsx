"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/shared/common";

type ReportType = "user" | "service" | "project" | "review";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ReportType;
  targetId: string;
  targetName: string;
  onSubmit?: (report: {
    type: ReportType;
    targetId: string;
    targetName: string;
    reason: string;
    description: string;
  }) => void;
}

const reportReasons: Record<ReportType, string[]> = {
  user: ["부적절한 행동", "스팸", "허위 정보", "기타"],
  service: ["허위 광고", "부적절한 내용", "저작권 침해", "기타"],
  project: ["스팸", "부적절한 내용", "허위 정보", "기타"],
  review: ["부적절한 내용", "허위 리뷰", "스팸", "기타"],
};

export const ReportModal = ({
  isOpen,
  onClose,
  type,
  targetId,
  targetName,
  onSubmit,
}: ReportModalProps) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !description.trim()) {
      alert("사유와 설명을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    
    // Save to localStorage (simulating API call)
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const newReport = {
      id: `RPT-${Date.now()}`,
      type,
      reportedBy: "현재 사용자", // 실제로는 현재 로그인한 사용자
      reportedItem: targetName,
      targetId,
      reason,
      description: description.trim(),
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
    };
    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit({ type, targetId, targetName, reason, description: description.trim() });
    }

    setIsSubmitting(false);
    alert("신고가 접수되었습니다. 검토 후 처리하겠습니다.");
    
    // Reset form
    setReason("");
    setDescription("");
    onClose();
  };

  const handleClose = () => {
    setReason("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-red-500" />
            <h2 className="text-xl font-bold text-[#0F172A]">신고하기</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mb-4 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
          <div className="text-xs text-[#94A3B8] mb-1">신고 대상</div>
          <div className="text-sm font-semibold text-[#0F172A]">{targetName}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              신고 사유 <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            >
              <option value="">사유를 선택하세요</option>
              {reportReasons[type].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              상세 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="신고 사유에 대한 상세한 설명을 작성해주세요..."
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none resize-none"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              최소 10자 이상 작성해주세요. ({description.length}자)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="outline"
              onClick={handleClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitting || !reason || description.trim().length < 10}
              className="flex-1"
            >
              {isSubmitting ? "제출 중..." : "신고 제출"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};




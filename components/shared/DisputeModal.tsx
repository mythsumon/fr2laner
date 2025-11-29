"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/shared/common";

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderTitle: string;
  orderAmount: number;
  onSubmit?: (dispute: {
    orderId: string;
    reason: string;
    description: string;
    priority: "high" | "medium" | "low";
  }) => void;
}

const disputeReasons = [
  "품질 불만",
  "지연 배송",
  "약속과 다른 결과물",
  "환불 요청",
  "기타",
];

export const DisputeModal = ({
  isOpen,
  onClose,
  orderId,
  orderTitle,
  orderAmount,
  onSubmit,
}: DisputeModalProps) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
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
    const disputes = JSON.parse(localStorage.getItem("disputes") || "[]");
    const newDispute = {
      id: `DSP-${Date.now()}`,
      orderId,
      buyer: "현재 사용자", // 실제로는 현재 로그인한 사용자
      seller: "판매자", // 실제로는 주문의 판매자 정보
      reason,
      amount: `₩${orderAmount.toLocaleString()}`,
      status: "open",
      priority,
      createdAt: new Date().toISOString().split("T")[0],
      description: description.trim(),
    };
    disputes.push(newDispute);
    localStorage.setItem("disputes", JSON.stringify(disputes));

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit({ orderId, reason, description: description.trim(), priority });
    }

    setIsSubmitting(false);
    alert("분쟁 신고가 접수되었습니다. 관리자가 검토 후 처리하겠습니다.");
    
    // Reset form
    setReason("");
    setDescription("");
    setPriority("medium");
    onClose();
  };

  const handleClose = () => {
    setReason("");
    setDescription("");
    setPriority("medium");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-red-500" />
            <h2 className="text-xl font-bold text-[#0F172A]">분쟁 신고</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mb-4 space-y-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
          <div className="text-xs text-[#94A3B8]">주문 정보</div>
          <div className="text-sm font-semibold text-[#0F172A]">{orderTitle}</div>
          <div className="text-xs text-[#64748B]">주문번호: {orderId} · 금액: ₩{orderAmount.toLocaleString()}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              분쟁 사유 <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            >
              <option value="">사유를 선택하세요</option>
              {disputeReasons.map((r) => (
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
              placeholder="분쟁 사유에 대한 상세한 설명을 작성해주세요..."
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none resize-none"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              최소 10자 이상 작성해주세요. ({description.length}자)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              우선순위
            </label>
            <div className="flex gap-2">
              {[
                { value: "high", label: "높음", color: "bg-red-50 text-red-700 border-red-200" },
                { value: "medium", label: "보통", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
                { value: "low", label: "낮음", color: "bg-blue-50 text-blue-700 border-blue-200" },
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value as "high" | "medium" | "low")}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    priority === p.value
                      ? p.color
                      : "bg-white text-[#64748B] border-[#E2E8F0] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-xs text-yellow-800">
              ⚠️ 분쟁 신고 후 관리자가 검토하여 처리합니다. 신고 내용이 허위인 경우 제재를 받을 수 있습니다.
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
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "제출 중..." : "분쟁 신고 제출"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


"use client";

import { useState } from "react";
import { X, MessageSquare } from "lucide-react";
import { Button } from "@/components/shared/common";

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (ticket: {
    subject: string;
    category: string;
    priority: "high" | "medium" | "low";
    description: string;
  }) => void;
}

const ticketCategories = [
  "계정",
  "결제",
  "주문",
  "기술 지원",
  "기타",
];

export const SupportTicketModal = ({
  isOpen,
  onClose,
  onSubmit,
}: SupportTicketModalProps) => {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !category || !description.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    
    // Save to localStorage (simulating API call)
    const tickets = JSON.parse(localStorage.getItem("support_tickets") || "[]");
    const newTicket = {
      id: `TKT-${Date.now()}`,
      user: "현재 사용자", // 실제로는 현재 로그인한 사용자
      subject,
      category,
      priority,
      status: "open",
      assignedTo: "미할당",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      lastReply: new Date().toISOString().replace("T", " ").slice(0, 16),
      description: description.trim(),
    };
    tickets.push(newTicket);
    localStorage.setItem("support_tickets", JSON.stringify(tickets));

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit({ subject, category, priority, description: description.trim() });
    }

    setIsSubmitting(false);
    alert("지원 티켓이 생성되었습니다. 관리자가 검토 후 답변드리겠습니다.");
    
    // Reset form
    setSubject("");
    setCategory("");
    setPriority("medium");
    setDescription("");
    onClose();
  };

  const handleClose = () => {
    setSubject("");
    setCategory("");
    setPriority("medium");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 md:p-6 shadow-xl my-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-[#2E5E99]" />
            <h2 className="text-xl font-bold text-[#0F172A]">지원 티켓 생성</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="문제를 간단히 설명해주세요"
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            >
              <option value="">카테고리를 선택하세요</option>
              {ticketCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              상세 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              placeholder="문제에 대한 상세한 설명을 작성해주세요..."
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none resize-none"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              최소 10자 이상 작성해주세요. ({description.length}자)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
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
              disabled={isSubmitting || !subject || !category || description.trim().length < 10}
              className="flex-1"
            >
              {isSubmitting ? "제출 중..." : "티켓 생성"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};



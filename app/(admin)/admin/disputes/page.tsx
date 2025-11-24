"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  DollarSign,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import Link from "next/link";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

interface Dispute {
  id: string;
  orderId: string;
  buyer: string;
  seller: string;
  reason: string;
  amount: string;
  status: "open" | "resolved" | "closed";
  createdAt: string;
  priority: "high" | "medium" | "low";
}

const initialDisputes: Dispute[] = [
  {
    id: "DSP-2024-001",
    orderId: "ORD-2024-001",
    buyer: "김구매",
    seller: "최디자인",
    reason: "품질 불만",
    amount: "₩250,000",
    status: "open",
    createdAt: "2024-03-12",
    priority: "high",
  },
  {
    id: "DSP-2024-002",
    orderId: "ORD-2024-002",
    buyer: "이소비",
    seller: "정개발",
    reason: "지연 배송",
    amount: "₩1,500,000",
    status: "resolved",
    createdAt: "2024-03-08",
    priority: "medium",
  },
];

export default function DisputesManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("open");
  const { toast, showToast, hideToast } = useToast();
  const [disputes, setDisputes] = useState<Dispute[]>(initialDisputes);
  const [resolveModal, setResolveModal] = useState<{ isOpen: boolean; dispute: Dispute | null }>({
    isOpen: false,
    dispute: null,
  });

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-blue-100 text-blue-700",
    };
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityMap[priority as keyof typeof priorityMap]}`}>
        {priority === "high" ? "높음" : priority === "medium" ? "보통" : "낮음"}
      </span>
    );
  };

  const handleResolve = (dispute: Dispute) => {
    setResolveModal({ isOpen: true, dispute });
  };

  const confirmResolve = () => {
    if (resolveModal.dispute) {
      setDisputes(
        disputes.map((d) => (d.id === resolveModal.dispute!.id ? { ...d, status: "resolved" as const } : d))
      );
      showToast("분쟁이 해결되었습니다.", "success");
    }
    setResolveModal({ isOpen: false, dispute: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">분쟁 해결 센터</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">주문 분쟁을 관리하고 해결하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1">
          {[
            { id: "open", label: "열린 분쟁", count: disputes.filter((d) => d.status === "open").length },
            { id: "resolved", label: "해결됨", count: disputes.filter((d) => d.status === "resolved").length },
            { id: "closed", label: "종료됨", count: disputes.filter((d) => d.status === "closed").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-[#2E5E99] text-white"
                  : "text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              <span className="ml-2 text-xs opacity-75">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="분쟁 ID, 주문 ID로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">모든 우선순위</option>
            <option value="high">높음</option>
            <option value="medium">보통</option>
            <option value="low">낮음</option>
          </select>
          <Button type="outline">
            <Filter className="size-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">분쟁 ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">주문 ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">구매자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">판매자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">사유</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">금액</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">우선순위</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {disputes
                .filter((d) => (activeTab === "open" ? d.status === "open" : d.status !== "open"))
                .map((dispute) => (
                  <tr key={dispute.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/disputes/${dispute.id}`}
                        className="font-medium text-[#2E5E99] hover:underline"
                      >
                        {dispute.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{dispute.orderId}</td>
                    <td className="px-4 py-4 text-sm text-[#0F172A]">{dispute.buyer}</td>
                    <td className="px-4 py-4 text-sm text-[#0F172A]">{dispute.seller}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{dispute.reason}</td>
                    <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{dispute.amount}</td>
                    <td className="px-4 py-4">{getPriorityBadge(dispute.priority)}</td>
                    <td className="px-4 py-4">
                      {dispute.status === "open" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          <Clock className="size-3 mr-1" />
                          진행 중
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle2 className="size-3 mr-1" />
                          해결됨
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/disputes/${dispute.id}`}>
                          <Button size="sm" type="primary" onClick={() => dispute.status === "open" && handleResolve(dispute)}>
                            <MessageSquare className="size-4 mr-2" />
                            처리
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolve Modal */}
      <ConfirmModal
        isOpen={resolveModal.isOpen}
        onClose={() => setResolveModal({ isOpen: false, dispute: null })}
        onConfirm={confirmResolve}
        title="분쟁 해결"
        message={resolveModal.dispute ? `${resolveModal.dispute.id} 분쟁을 해결 처리하시겠습니까?` : ""}
        confirmText="해결"
        type="info"
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  ArrowUpDown,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

type PayoutStatus = "pending" | "approved" | "rejected" | "completed";

interface Payout {
  id: string;
  seller: string;
  sellerId?: string; // Add sellerId for tracking
  amount: number;
  bank: string;
  accountNumber: string;
  status: PayoutStatus;
  requestedAt: string;
  processedAt?: string;
}

const initialPayouts: Payout[] = [
  {
    id: "PAY-001",
    seller: "최디자인",
    amount: 5000000,
    bank: "KB국민은행",
    accountNumber: "123-456-789012",
    status: "pending",
    requestedAt: "2024-03-15",
  },
  {
    id: "PAY-002",
    seller: "정개발",
    amount: 3000000,
    bank: "신한은행",
    accountNumber: "987-654-321098",
    status: "pending",
    requestedAt: "2024-03-14",
  },
  {
    id: "PAY-003",
    seller: "강번역",
    amount: 1500000,
    bank: "하나은행",
    accountNumber: "456-789-012345",
    status: "approved",
    requestedAt: "2024-03-10",
    processedAt: "2024-03-12",
  },
  {
    id: "PAY-004",
    seller: "이디자인",
    amount: 8000000,
    bank: "우리은행",
    accountNumber: "789-012-345678",
    status: "rejected",
    requestedAt: "2024-03-08",
    processedAt: "2024-03-09",
  },
];

export default function PayoutsManagementPage() {
  const [payouts, setPayouts] = useState<Payout[]>(initialPayouts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PayoutStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast, showToast, hideToast } = useToast();
  const [actionModal, setActionModal] = useState<{ isOpen: boolean; payout: Payout | null; action: string }>({
    isOpen: false,
    payout: null,
    action: "",
  });

  // Load payouts from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPayouts = localStorage.getItem("payouts");
      if (storedPayouts) {
        try {
          const parsedPayouts = JSON.parse(storedPayouts);
          setPayouts([...initialPayouts, ...parsedPayouts]);
        } catch (e) {
          console.warn("Failed to parse payouts from localStorage", e);
        }
      }
    }
  }, []);

  const filteredAndSortedPayouts = [...payouts]
    .filter((payout) => {
      const matchesSearch =
        searchQuery === "" ||
        payout.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payout.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payout.accountNumber.includes(searchQuery);
      const matchesStatus = statusFilter === "all" || payout.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.requestedAt).getTime();
        const dateB = new Date(b.requestedAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
    });

  const handleAction = (payout: Payout, action: string) => {
    setActionModal({ isOpen: true, payout, action });
  };

  const confirmAction = () => {
    if (actionModal.payout && actionModal.action) {
      if (actionModal.action === "approve") {
        const updatedPayouts = payouts.map((p) =>
          p.id === actionModal.payout!.id
            ? { ...p, status: "approved" as PayoutStatus, processedAt: new Date().toISOString().split("T")[0] }
            : p
        );
        setPayouts(updatedPayouts);
        
        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("payouts", JSON.stringify(updatedPayouts));
        }
        
        showToast("출금 요청이 승인되었습니다.", "success");
      } else if (actionModal.action === "reject") {
        const updatedPayouts = payouts.map((p) =>
          p.id === actionModal.payout!.id
            ? { ...p, status: "rejected" as PayoutStatus, processedAt: new Date().toISOString().split("T")[0] }
            : p
        );
        setPayouts(updatedPayouts);
        
        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("payouts", JSON.stringify(updatedPayouts));
        }
        
        showToast("출금 요청이 거절되었습니다.", "success");
      }
      setActionModal({ isOpen: false, payout: null, action: "" });
    }
  };

  const getStatusBadge = (status: PayoutStatus) => {
    const styles = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      approved: "bg-blue-50 text-blue-700 border-blue-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      completed: "bg-green-50 text-green-700 border-green-200",
    };
    const labels = {
      pending: "대기 중",
      approved: "승인됨",
      rejected: "거절됨",
      completed: "완료",
    };
    return { style: styles[status], label: labels[status] };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">출금 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">모든 출금 요청을 관리하세요</p>
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
              placeholder="출금 ID, 판매자, 계좌번호로 검색..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PayoutStatus | "all")}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">전체 상태</option>
            <option value="pending">대기 중</option>
            <option value="approved">승인됨</option>
            <option value="rejected">거절됨</option>
            <option value="completed">완료</option>
          </select>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            >
              <option value="date">날짜</option>
              <option value="amount">금액</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] flex items-center gap-2"
            >
              <ArrowUpDown className="size-4" />
              {sortOrder === "asc" ? "오름차순" : "내림차순"}
            </button>
          </div>
        </div>
      </div>

      {/* Payouts List */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">판매자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">금액</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">은행</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">계좌번호</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">요청일</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredAndSortedPayouts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#64748B]">
                    출금 요청이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredAndSortedPayouts.map((payout) => {
                  const statusBadge = getStatusBadge(payout.status);
                  return (
                    <tr key={payout.id} className="hover:bg-[#F8FAFC]">
                      <td className="px-4 py-4">
                        <div className="font-medium text-[#0F172A]">{payout.id}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0F172A]">{payout.seller}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-sm font-semibold text-[#0F172A]">
                          <DollarSign className="size-4" />
                          ₩{payout.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#64748B]">{payout.bank}</td>
                      <td className="px-4 py-4 text-sm text-[#64748B]">{payout.accountNumber}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.style}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#64748B]">{payout.requestedAt}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {payout.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleAction(payout, "approve")}
                                className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                                title="승인"
                              >
                                <CheckCircle2 className="size-4" />
                              </button>
                              <button
                                onClick={() => handleAction(payout, "reject")}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                                title="거절"
                              >
                                <XCircle className="size-4" />
                              </button>
                            </>
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

      {/* Action Modal */}
      <ConfirmModal
        isOpen={actionModal.isOpen}
        onClose={() => setActionModal({ isOpen: false, payout: null, action: "" })}
        onConfirm={confirmAction}
        title={actionModal.action === "approve" ? "출금 승인" : "출금 거절"}
        message={
          actionModal.action === "approve"
            ? `정말로 ${actionModal.payout?.seller}님의 ₩${actionModal.payout?.amount.toLocaleString()} 출금 요청을 승인하시겠습니까?`
            : `정말로 ${actionModal.payout?.seller}님의 ₩${actionModal.payout?.amount.toLocaleString()} 출금 요청을 거절하시겠습니까?`
        }
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



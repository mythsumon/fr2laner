"use client";

import { useState } from "react";
import {
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Upload,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

interface Withdrawal {
  id: string;
  seller: string;
  amount: string;
  method: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  approvedAt?: string;
}

interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: string;
  fee: string;
  net: string;
  date: string;
}

const initialWithdrawals: Withdrawal[] = [
  {
    id: "WD-2024-001",
    seller: "최디자인",
    amount: "₩2,450,000",
    method: "은행 계좌",
    status: "pending",
    requestedAt: "2024-03-14",
  },
  {
    id: "WD-2024-002",
    seller: "정개발",
    amount: "₩1,890,000",
    method: "은행 계좌",
    status: "approved",
    requestedAt: "2024-03-12",
    approvedAt: "2024-03-13",
  },
];

const initialTransactions: Transaction[] = [
  {
    id: "TXN-2024-001",
    type: "order_payment",
    description: "주문 결제 - ORD-2024-001",
    amount: "+₩250,000",
    fee: "-₩12,500",
    net: "₩237,500",
    date: "2024-03-15",
  },
  {
    id: "TXN-2024-002",
    type: "refund",
    description: "환불 - ORD-2024-002",
    amount: "-₩1,500,000",
    fee: "₩0",
    net: "-₩1,500,000",
    date: "2024-03-14",
  },
];

export default function FinanceManagementPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast, showToast, hideToast } = useToast();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(initialWithdrawals);
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [fees, setFees] = useState({
    design: 5,
    development: 5,
    translation: 5,
    marketing: 5,
    buyerFee: 2,
  });

  const [approveModal, setApproveModal] = useState<{ isOpen: boolean; withdrawal: Withdrawal | null }>({
    isOpen: false,
    withdrawal: null,
  });
  const [rejectModal, setRejectModal] = useState<{ isOpen: boolean; withdrawal: Withdrawal | null }>({
    isOpen: false,
    withdrawal: null,
  });

  const handleApproveWithdrawal = (withdrawal: Withdrawal) => {
    setApproveModal({ isOpen: true, withdrawal });
  };

  const confirmApproveWithdrawal = () => {
    if (approveModal.withdrawal) {
      setWithdrawals(
        withdrawals.map((w) =>
          w.id === approveModal.withdrawal!.id
            ? { ...w, status: "approved" as const, approvedAt: new Date().toISOString().split("T")[0] }
            : w
        )
      );
      showToast("출금이 승인되었습니다.", "success");
    }
    setApproveModal({ isOpen: false, withdrawal: null });
  };

  const handleRejectWithdrawal = (withdrawal: Withdrawal) => {
    setRejectModal({ isOpen: true, withdrawal });
  };

  const confirmRejectWithdrawal = () => {
    if (rejectModal.withdrawal) {
      setWithdrawals(
        withdrawals.map((w) => (w.id === rejectModal.withdrawal!.id ? { ...w, status: "rejected" as const } : w))
      );
      showToast("출금이 거부되었습니다.", "success");
    }
    setRejectModal({ isOpen: false, withdrawal: null });
  };

  const handleExport = () => {
    showToast("데이터가 내보내기되었습니다.", "success");
  };

  const handleSaveFees = () => {
    showToast("수수료 설정이 저장되었습니다.", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">재무 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">출금, 거래 내역, 수수료를 관리하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { id: "overview", label: "개요" },
            { id: "withdrawals", label: "출금 관리" },
            { id: "transactions", label: "거래 내역" },
            { id: "fees", label: "수수료 설정" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#2E5E99] text-white"
                  : "text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-[#64748B]">총 수익</h3>
              <DollarSign className="size-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">₩2,458,900,000</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <ArrowUpRight className="size-4" />
              <span>+22.1%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-[#64748B]">대기 중인 출금</h3>
              <Clock className="size-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">₩125,400,000</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-[#64748B]">
              <span>{withdrawals.filter((w) => w.status === "pending").length}건</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-[#64748B]">수수료 수익</h3>
              <DollarSign className="size-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">₩122,945,000</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <ArrowUpRight className="size-4" />
              <span>+18.5%</span>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawals Tab */}
      {activeTab === "withdrawals" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <h3 className="font-bold text-[#0F172A]">출금 요청</h3>
              <Button type="outline" size="sm" onClick={handleExport}>
                <Download className="size-4 mr-2" />
                내보내기
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">출금 ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">판매자</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">금액</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">방법</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">요청일</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {withdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="hover:bg-[#F8FAFC]">
                      <td className="px-4 py-4 font-medium text-[#0F172A]">{withdrawal.id}</td>
                      <td className="px-4 py-4 text-sm text-[#0F172A]">{withdrawal.seller}</td>
                      <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{withdrawal.amount}</td>
                      <td className="px-4 py-4 text-sm text-[#64748B]">{withdrawal.method}</td>
                      <td className="px-4 py-4">
                        {withdrawal.status === "pending" ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            <Clock className="size-3 mr-1" />
                            대기 중
                          </span>
                        ) : withdrawal.status === "approved" ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle2 className="size-3 mr-1" />
                            승인됨
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            <XCircle className="size-3 mr-1" />
                            거부됨
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#64748B]">{withdrawal.requestedAt}</td>
                      <td className="px-4 py-4">
                        {withdrawal.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              type="primary"
                              onClick={() => handleApproveWithdrawal(withdrawal)}
                            >
                              <CheckCircle2 className="size-4 mr-2" />
                              승인
                            </Button>
                            <Button
                              size="sm"
                              type="outline"
                              onClick={() => handleRejectWithdrawal(withdrawal)}
                            >
                              <XCircle className="size-4 mr-2" />
                              거부
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <h3 className="font-bold text-[#0F172A]">거래 내역</h3>
            <Button type="outline" size="sm" onClick={handleExport}>
              <Download className="size-4 mr-2" />
              내보내기
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">거래 ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">설명</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">금액</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">수수료</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">순액</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">날짜</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-4 font-medium text-[#0F172A]">{txn.id}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{txn.description}</td>
                    <td className={`px-4 py-4 text-sm font-medium ${txn.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {txn.amount}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{txn.fee}</td>
                    <td className={`px-4 py-4 text-sm font-medium ${txn.net.startsWith("-") ? "text-red-600" : "text-[#0F172A]"}`}>
                      {txn.net}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fees Tab */}
      {activeTab === "fees" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-6">수수료 설정</h3>
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-[#E2E8F0]">
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리별 수수료</label>
              <div className="space-y-3">
                {[
                  { key: "design", label: "로고 디자인" },
                  { key: "development", label: "웹 개발" },
                  { key: "translation", label: "번역" },
                  { key: "marketing", label: "마케팅" },
                ].map((category) => (
                  <div key={category.key} className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B]">{category.label}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={fees[category.key as keyof typeof fees]}
                        onChange={(e) =>
                          setFees({ ...fees, [category.key]: parseFloat(e.target.value) || 0 })
                        }
                        className="w-20 px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm"
                        min="0"
                        max="100"
                      />
                      <span className="text-sm text-[#64748B]">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-[#E2E8F0]">
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">구매자 서비스 수수료</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={fees.buyerFee}
                  onChange={(e) => setFees({ ...fees, buyerFee: parseFloat(e.target.value) || 0 })}
                  className="w-20 px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-[#64748B]">%</span>
              </div>
            </div>
            <Button type="primary" onClick={handleSaveFees}>
              <Upload className="size-4 mr-2" />
              저장
            </Button>
          </div>
        </div>
      )}

      {/* Approve Withdrawal Modal */}
      <ConfirmModal
        isOpen={approveModal.isOpen}
        onClose={() => setApproveModal({ isOpen: false, withdrawal: null })}
        onConfirm={confirmApproveWithdrawal}
        title="출금 승인"
        message={approveModal.withdrawal ? `${approveModal.withdrawal.amount} 출금을 승인하시겠습니까?` : ""}
        confirmText="승인"
        type="info"
      />

      {/* Reject Withdrawal Modal */}
      <ConfirmModal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, withdrawal: null })}
        onConfirm={confirmRejectWithdrawal}
        title="출금 거부"
        message={rejectModal.withdrawal ? `${rejectModal.withdrawal.amount} 출금을 거부하시겠습니까?` : ""}
        confirmText="거부"
        type="warning"
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

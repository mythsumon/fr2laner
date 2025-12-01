"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Filter, Search, DollarSign, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";

interface Transaction {
  id: string;
  type: "payment" | "refund" | "withdrawal";
  orderId?: string;
  description: string;
  amount: number;
  fee?: number;
  net: number;
  status: "completed" | "pending" | "failed";
  date: string;
  paymentMethod?: string;
}

export const PaymentHistoryPage = () => {
  useBodyClass("dashboard-page");
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    // Load transactions from localStorage
    if (typeof window !== "undefined") {
      const storedOrders = localStorage.getItem("orders");
      const storedTransactions: Transaction[] = [];
      
      if (storedOrders) {
        try {
          const orders: any[] = JSON.parse(storedOrders);
          orders
            .filter((order) => order.buyerId === user?.id)
            .forEach((order) => {
              // Payment transaction
              storedTransactions.push({
                id: `TXN-${order.id}`,
                type: "payment",
                orderId: order.id,
                description: `주문 결제 - ${order.serviceTitle || order.title || "서비스"}`,
                amount: order.price || order.amount || 0,
                fee: 0,
                net: order.price || order.amount || 0,
                status: order.status === "completed" ? "completed" : order.status === "cancelled" ? "failed" : "pending",
                date: order.createdAt || order.date || new Date().toISOString().split("T")[0],
                paymentMethod: "카드",
              });
            });
        } catch (e) {
          console.warn("Failed to parse orders from localStorage", e);
        }
      }

      // Add mock transactions if empty
      if (storedTransactions.length === 0) {
        storedTransactions.push(
          {
            id: "TXN-001",
            type: "payment",
            orderId: "ORD-001",
            description: "주문 결제 - 프리미엄 로고 디자인",
            amount: 350000,
            fee: 0,
            net: 350000,
            status: "completed",
            date: "2024-01-15",
            paymentMethod: "카드",
          },
          {
            id: "TXN-002",
            type: "payment",
            orderId: "ORD-002",
            description: "주문 결제 - 웹사이트 디자인",
            amount: 1200000,
            fee: 0,
            net: 1200000,
            status: "completed",
            date: "2024-01-10",
            paymentMethod: "카드",
          },
          {
            id: "TXN-003",
            type: "refund",
            orderId: "ORD-003",
            description: "환불 - 취소된 주문",
            amount: -500000,
            fee: 0,
            net: -500000,
            status: "completed",
            date: "2024-01-08",
            paymentMethod: "카드",
          }
        );
      }

      setTransactions(storedTransactions);
      setFilteredTransactions(storedTransactions);
    }
  }, [user]);

  useEffect(() => {
    let filtered = [...transactions];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (txn) =>
          txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((txn) => txn.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((txn) => txn.type === typeFilter);
    }

    setFilteredTransactions(filtered);
  }, [searchQuery, statusFilter, typeFilter, transactions]);

  const handleExport = () => {
    // Export functionality
    alert("결제 내역이 내보내기되었습니다.");
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      completed: { label: "완료", color: "bg-green-100 text-green-700" },
      pending: { label: "대기 중", color: "bg-yellow-100 text-yellow-700" },
      failed: { label: "실패", color: "bg-red-100 text-red-700" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      payment: { label: "결제", color: "bg-blue-100 text-blue-700" },
      refund: { label: "환불", color: "bg-orange-100 text-orange-700" },
      withdrawal: { label: "출금", color: "bg-purple-100 text-purple-700" },
    };
    const typeInfo = typeMap[type as keyof typeof typeMap] || typeMap.payment;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
        {typeInfo.label}
      </span>
    );
  };

  const totalSpent = transactions
    .filter((txn) => txn.type === "payment" && txn.status === "completed")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalRefunded = transactions
    .filter((txn) => txn.type === "refund" && txn.status === "completed")
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/client/settings">
          <button
            type="button"
            className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
          >
            <ArrowLeft className="size-4" />
            설정으로 돌아가기
          </button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">결제 내역</h1>
            <p className="mt-1 text-sm text-[#475569]">모든 결제 및 거래 내역을 확인하세요</p>
          </div>
          <Button
            type="outline"
            size="small"
            shape="round"
            onClick={handleExport}
            className="gap-2 border border-[#E2E8F0] bg-white text-sm font-medium text-[#475569] hover:bg-[#F8FAFC]"
          >
            <Download className="size-4" />
            내보내기
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-[#64748B]">총 결제 금액</span>
            <DollarSign className="size-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">₩{totalSpent.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-[#64748B]">총 환불 금액</span>
            <CreditCard className="size-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">₩{totalRefunded.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-[#64748B]">총 거래 건수</span>
            <Calendar className="size-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">{transactions.length}건</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="거래 ID, 주문 ID, 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">모든 상태</option>
            <option value="completed">완료</option>
            <option value="pending">대기 중</option>
            <option value="failed">실패</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">모든 유형</option>
            <option value="payment">결제</option>
            <option value="refund">환불</option>
            <option value="withdrawal">출금</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">거래 ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">설명</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">유형</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">금액</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">날짜</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-[#64748B]">
                    거래 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-4 font-medium text-[#0F172A]">{txn.id}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">
                      {txn.description}
                      {txn.orderId && (
                        <Link
                          href={`/client/orders/${txn.orderId}`}
                          className="ml-2 text-[#2E5E99] hover:underline"
                        >
                          (주문 보기)
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-4">{getTypeBadge(txn.type)}</td>
                    <td
                      className={`px-4 py-4 text-sm font-medium ${
                        txn.amount >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {txn.amount >= 0 ? "+" : ""}₩{Math.abs(txn.amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">{getStatusBadge(txn.status)}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{txn.date}</td>
                    <td className="px-4 py-4">
                      {txn.orderId && (
                        <Link
                          href={`/client/orders/${txn.orderId}`}
                          className="text-sm text-[#2E5E99] hover:underline"
                        >
                          상세 보기
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};




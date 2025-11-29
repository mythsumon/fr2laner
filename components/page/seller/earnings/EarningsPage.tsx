"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DollarSign, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useAuth } from "@/hooks/useAuth";

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: "Pending" | "Cleared" | "Withdrawn";
  date: string;
}

// Mock data
const mockTransactions: Transaction[] = [
  { id: "1", orderId: "ORD-001", amount: 500000, status: "Cleared", date: "2024-01-15" },
  { id: "2", orderId: "ORD-002", amount: 300000, status: "Pending", date: "2024-01-14" },
  { id: "3", orderId: "ORD-003", amount: 150000, status: "Cleared", date: "2024-01-13" },
];

interface PayoutRequest {
  id: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  requestedAt: string;
  processedAt?: string;
}

export const EarningsPage = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week");
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);
  const [commissionRate, setCommissionRate] = useState(15); // Default commission rate
  const availableBalance = 2800000;
  const pendingClearance = 300000;

  // Load commission rate from admin settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("admin_settings");
      if (storedSettings) {
        try {
          const parsedSettings = JSON.parse(storedSettings);
          if (parsedSettings.commissionRate) {
            setCommissionRate(parsedSettings.commissionRate);
          }
        } catch (e) {
          console.warn("Failed to parse admin_settings from localStorage", e);
        }
      }
    }
  }, []);

  // Load payout requests from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPayouts = localStorage.getItem("payouts");
      if (storedPayouts) {
        try {
          const parsedPayouts = JSON.parse(storedPayouts);
          // Filter payouts for current seller
          const sellerPayouts = parsedPayouts.filter(
            (p: any) => p.sellerId === user?.id || p.seller === user?.name
          );
          setPayoutRequests(sellerPayouts);
        } catch (e) {
          console.warn("Failed to parse payouts from localStorage", e);
        }
      }
    }
  }, [user]);

  const earningsData = selectedPeriod === "week" 
    ? [45, 52, 48, 61, 55, 58, 62]
    : [120, 135, 150, 145, 160, 155, 170, 165, 180, 175, 190, 185];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">수익 관리</h1>
        <p className="mt-1 text-sm text-[#475569]">수익 현황과 출금을 관리하세요</p>
      </div>

      {/* Balance Card */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#2E5E99] to-[#1d4673] p-6 text-white shadow-lg md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 text-sm text-white/80">출금 가능 잔액</div>
            <div className="text-4xl font-bold md:text-5xl">
              ₩{availableBalance.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-white/70">
              <Clock className="size-4" />
              <span>정산 대기: ₩{pendingClearance.toLocaleString()}</span>
            </div>
          </div>
          <Link href="/expert/earnings/withdraw">
            <Button
              type="primary"
              size="large"
              shape="round"
              className="bg-white text-sm font-semibold text-[#2E5E99] hover:bg-white/90"
            >
              출금 요청하기
            </Button>
          </Link>
        </div>
      </div>

      {/* Earnings Graph */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0F172A]">수익 그래프</h2>
          <div className="flex gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-1">
            <button
              type="button"
              onClick={() => setSelectedPeriod("week")}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                selectedPeriod === "week"
                  ? "bg-[#2E5E99] text-white"
                  : "text-[#475569] hover:bg-white"
              }`}
            >
              주간
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod("month")}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                selectedPeriod === "month"
                  ? "bg-[#2E5E99] text-white"
                  : "text-[#475569] hover:bg-white"
              }`}
            >
              월간
            </button>
          </div>
        </div>
        <div className="flex h-48 items-end justify-between gap-2 rounded-lg bg-[#F8FAFC] p-4">
          {earningsData.map((value, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-[#2E5E99]"
              style={{ height: `${(value / Math.max(...earningsData)) * 100}%` }}
              aria-label={`${selectedPeriod === "week" ? `Day ${index + 1}` : `Month ${index + 1}`}: ₩${value * 1000}`}
            />
          ))}
        </div>
      </div>

      {/* Period Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
            <DollarSign className="size-4" />
            <span>이번 주 수익</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">
            ₩{selectedPeriod === "week" ? "420,000" : "1,850,000"}
          </div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
            <TrendingUp className="size-4" />
            <span>이번 달 수익</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">₩3,400,000</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
            <Clock className="size-4" />
            <span>정산 대기</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">₩300,000</div>
        </div>
      </div>

      {/* Commission Rate Info */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="size-5 text-[#F59E0B]" />
          <h2 className="text-lg font-semibold text-[#0F172A]">수수료 정보</h2>
        </div>
        <div className="space-y-2 text-sm text-[#475569]">
          <p>
            플랫폼 수수료율: <span className="font-semibold text-[#0F172A]">{commissionRate}%</span>
          </p>
          <p className="text-xs text-[#94A3B8]">
            주문 금액의 {commissionRate}%가 플랫폼 수수료로 차감됩니다. 나머지 {100 - commissionRate}%가 판매자 수익으로 정산됩니다.
          </p>
        </div>
      </div>

      {/* Payout Requests */}
      {payoutRequests.length > 0 && (
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="border-b border-[#E2E8F0] p-4">
            <h2 className="text-lg font-semibold text-[#0F172A]">출금 요청 내역</h2>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {payoutRequests.map((request) => (
              <div key={request.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <DollarSign className="size-4 text-blue-500" />
                      <span className="font-semibold text-[#0F172A]">
                        출금 요청 #{request.id}
                      </span>
                    </div>
                    <div className="text-sm text-[#475569]">{request.requestedAt}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#0F172A]">
                      -₩{request.amount.toLocaleString()}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        request.status === "pending"
                          ? "text-yellow-600"
                          : request.status === "approved"
                          ? "text-blue-600"
                          : request.status === "rejected"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {request.status === "pending"
                        ? "대기 중"
                        : request.status === "approved"
                        ? "승인됨"
                        : request.status === "rejected"
                        ? "거절됨"
                        : "완료"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="border-b border-[#E2E8F0] p-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">거래 내역</h2>
        </div>
        <div className="divide-y divide-[#E2E8F0]">
          {mockTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <DollarSign className="size-4 text-green-500" />
                    <span className="font-semibold text-[#0F172A]">
                      주문 #{transaction.orderId}
                    </span>
                  </div>
                  <div className="text-sm text-[#475569]">{transaction.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#0F172A]">
                    +₩{transaction.amount.toLocaleString()}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      transaction.status === "Cleared"
                        ? "text-green-600"
                        : transaction.status === "Pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {transaction.status === "Cleared"
                      ? "정산 완료"
                      : transaction.status === "Pending"
                      ? "정산 대기"
                      : "출금 완료"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


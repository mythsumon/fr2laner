"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign } from "lucide-react";
import { Button } from "@/components/shared/common";

const banks = ["KB국민은행", "신한은행", "하나은행", "우리은행", "NH농협은행", "IBK기업은행"];

export const WithdrawPage = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const availableBalance = 2800000;
  const fee = 0; // Assume no fee for now
  const total = parseFloat(withdrawAmount) || 0;

  const handleWithdraw = () => {
    if (!selectedBank || !accountNumber || !withdrawAmount) {
      alert("모든 항목을 입력해주세요");
      return;
    }
    if (total > availableBalance) {
      alert("출금 가능 금액을 초과했습니다");
      return;
    }
    console.log("Withdraw:", { selectedBank, accountNumber, total });
    // Navigate back
    window.location.href = "/dashboard/earnings";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard/earnings">
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              수익 관리로
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">출금하기</h1>
        </div>

        {/* Balance Card */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#475569]">
              <DollarSign className="size-4" />
              <span>출금 가능 잔액</span>
            </div>
            <div className="text-2xl font-bold text-[#0F172A]">
              ₩{availableBalance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Withdraw Form */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">출금 정보</h2>
          
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                은행 선택 <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
              >
                <option value="">은행 선택</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                계좌번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="계좌번호를 입력하세요"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                출금 금액 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="출금할 금액을 입력하세요"
                max={availableBalance}
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawAmount(String(availableBalance))}
                  className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1 text-xs font-medium text-[#475569] hover:bg-[#F1F5F9]"
                >
                  전체 출금
                </button>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">출금 금액</span>
                  <span className="font-semibold text-[#0F172A]">₩{total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">수수료</span>
                  <span className="font-semibold text-[#0F172A]">₩{fee.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#E2E8F0] pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0F172A]">실수령액</span>
                    <span className="text-lg font-bold text-[#2E5E99]">
                      ₩{(total - fee).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/dashboard/earnings" className="flex-1 sm:flex-initial">
              <Button
                type="default"
                size="large"
                shape="round"
                className="w-full border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9] sm:w-auto"
              >
                취소
              </Button>
            </Link>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={handleWithdraw}
              className="flex-1 bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673] sm:flex-initial"
            >
              출금하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};






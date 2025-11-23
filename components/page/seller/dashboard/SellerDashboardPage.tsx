"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Star,
  MessageSquare,
  Plus,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/shared/common";

// Mock data
const stats = {
  todayEarnings: 245000,
  monthEarnings: 3400000,
  withdrawableBalance: 2800000,
  activeOrders: 8,
  pendingOrders: 3,
  revisions: 2,
  completedOrders: 124,
  rating: 4.9,
  totalReviews: 342,
  responseTime: "1시간",
  onTimeDelivery: 98,
  completionRate: 99,
};

export const SellerDashboardPage = () => {
  const [earningsData] = useState([45, 52, 48, 61, 55, 58, 62]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">판매자 대시보드</h1>
        <p className="mt-1 text-sm text-[#475569]">전문가 활동 현황을 한눈에 확인하세요</p>
      </div>

      {/* Earnings Card */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0F172A]">수익 현황</h2>
          <Link href="/dashboard/earnings" className="text-sm font-medium text-[#2E5E99] hover:underline">
            자세히 보기 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
              <DollarSign className="size-4" />
              <span>오늘 수익</span>
            </div>
            <div className="text-2xl font-bold text-[#0F172A]">
              ₩{stats.todayEarnings.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
              <TrendingUp className="size-4" />
              <span>이번 달 수익</span>
            </div>
            <div className="text-2xl font-bold text-[#0F172A]">
              ₩{stats.monthEarnings.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
              <DollarSign className="size-4" />
              <span>출금 가능</span>
            </div>
            <div className="mb-2 text-2xl font-bold text-[#0F172A]">
              ₩{stats.withdrawableBalance.toLocaleString()}
            </div>
            <Link href="/dashboard/earnings/withdraw">
              <Button
                type="primary"
                size="small"
                shape="round"
                className="w-full bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673]"
              >
                출금하기
              </Button>
            </Link>
          </div>
        </div>
        {/* Mini Graph */}
        <div className="mt-6 flex items-end justify-between gap-1 rounded-lg bg-[#F8FAFC] p-4">
          {earningsData.map((value, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-[#2E5E99]"
              style={{ height: `${(value / Math.max(...earningsData)) * 80}%` }}
              aria-label={`Day ${index + 1}: ₩${value * 1000}`}
            />
          ))}
        </div>
      </div>

      {/* Order Status Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/dashboard/orders?status=active"
          className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
            <ShoppingBag className="size-4 text-blue-500" />
            <span>진행 중</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{stats.activeOrders}</div>
          <div className="mt-1 text-xs text-[#94A3B8]">주문</div>
        </Link>
        <Link
          href="/dashboard/orders?status=pending"
          className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
            <ShoppingBag className="size-4 text-yellow-500" />
            <span>대기 중</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{stats.pendingOrders}</div>
          <div className="mt-1 text-xs text-[#94A3B8]">주문</div>
        </Link>
        <Link
          href="/dashboard/orders?status=revision"
          className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
            <ShoppingBag className="size-4 text-orange-500" />
            <span>수정 요청</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{stats.revisions}</div>
          <div className="mt-1 text-xs text-[#94A3B8]">주문</div>
        </Link>
        <Link
          href="/dashboard/orders?status=completed"
          className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
            <ShoppingBag className="size-4 text-green-500" />
            <span>완료</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{stats.completedOrders}</div>
          <div className="mt-1 text-xs text-[#94A3B8]">주문</div>
        </Link>
      </div>

      {/* Performance Card */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">성과 지표</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Star className="size-5 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-sm font-medium text-[#475569]">평점</span>
            </div>
            <div className="mb-2 text-3xl font-bold text-[#0F172A]">{stats.rating}</div>
            <div className="text-sm text-[#94A3B8]">리뷰 {stats.totalReviews}개</div>
          </div>
          <div>
            <div className="mb-2 text-sm font-medium text-[#475569]">평균 응답 시간</div>
            <div className="mb-2 text-3xl font-bold text-[#0F172A]">{stats.responseTime}</div>
            <div className="h-2 w-full rounded-full bg-[#E2E8F0]">
              <div className="h-full w-[95%] rounded-full bg-green-500" />
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-medium text-[#475569]">정시 납품률</div>
            <div className="mb-2 text-3xl font-bold text-[#0F172A]">{stats.onTimeDelivery}%</div>
            <div className="h-2 w-full rounded-full bg-[#E2E8F0]">
              <div className="h-full w-[98%] rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 text-sm font-medium text-[#475569]">주문 완료율</div>
          <div className="mb-2 text-2xl font-bold text-[#0F172A]">{stats.completionRate}%</div>
          <div className="h-2 w-full rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[99%] rounded-full bg-[#2E5E99]" />
          </div>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">빠른 메뉴</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard/services/new"
            className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#2E5E99] hover:shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#2E5E99]/10">
              <Plus className="size-5 text-[#2E5E99]" />
            </div>
            <span className="font-medium text-[#0F172A]">서비스 등록</span>
          </Link>
          <Link
            href="/dashboard/services"
            className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#2E5E99] hover:shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50">
              <Briefcase className="size-5 text-blue-500" />
            </div>
            <span className="font-medium text-[#0F172A]">내 서비스</span>
          </Link>
          <Link
            href="/dashboard/messages"
            className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#2E5E99] hover:shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <MessageSquare className="size-5 text-green-500" />
            </div>
            <span className="font-medium text-[#0F172A]">메시지</span>
          </Link>
          <Link
            href="/dashboard/earnings"
            className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#2E5E99] hover:shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-50">
              <DollarSign className="size-5 text-purple-500" />
            </div>
            <span className="font-medium text-[#0F172A]">수익 관리</span>
          </Link>
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <Link
        href="/dashboard/services/new"
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#2E5E99] text-white shadow-lg transition-all hover:scale-110 hover:bg-[#1d4673] hover:shadow-xl lg:hidden"
        aria-label="새 서비스 등록"
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
};



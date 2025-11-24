"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Download,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">데이터 & 분석</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">플랫폼 성과를 분석하세요</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
            <option value="year">올해</option>
          </select>
          <Button type="outline" size="sm">
            <Download className="size-4 mr-2" />
            내보내기
          </Button>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">수익 분석</h3>
            <p className="text-sm text-[#64748B] mt-1">일별/월별 수익 추이</p>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {[65, 80, 45, 90, 75, 95, 85].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-[#2E5E99] to-[#4A90E2] rounded-t-lg mb-2"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-[#64748B]">일 {index + 1}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F8FAFC]">
            <p className="text-sm text-[#64748B] mb-1">일평균 수익</p>
            <p className="text-xl font-bold text-[#0F172A]">₩35,127,000</p>
          </div>
          <div className="p-4 rounded-lg bg-[#F8FAFC]">
            <p className="text-sm text-[#64748B] mb-1">월 총 수익</p>
            <p className="text-xl font-bold text-[#0F172A]">₩1,053,810,000</p>
          </div>
          <div className="p-4 rounded-lg bg-[#F8FAFC]">
            <p className="text-sm text-[#64748B] mb-1">성장률</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="size-5 text-green-600" />
              <p className="text-xl font-bold text-green-600">+22.1%</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Analytics */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-6">사용자 분석</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-4">활성 구매자</h4>
            <div className="h-48 flex items-end justify-between gap-2">
              {[40, 55, 35, 60, 45, 70, 50].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg mb-2"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-4">활성 판매자</h4>
            <div className="h-48 flex items-end justify-between gap-2">
              {[30, 45, 25, 50, 35, 55, 40].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg mb-2"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F8FAFC]">
            <p className="text-sm text-[#64748B] mb-1">신규 가입자</p>
            <p className="text-xl font-bold text-[#0F172A]">1,245</p>
          </div>
          <div className="p-4 rounded-lg bg-[#F8FAFC]">
            <p className="text-sm text-[#64748B] mb-1">이탈률</p>
            <p className="text-xl font-bold text-[#0F172A]">3.2%</p>
          </div>
          <div className="p-4 rounded-lg bg-[#F8FAFC]">
            <p className="text-sm text-[#64748B] mb-1">재방문률</p>
            <p className="text-xl font-bold text-[#0F172A]">68.5%</p>
          </div>
        </div>
      </div>

      {/* Service Analytics */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-6">서비스 분석</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-4">가장 많이 판매된 서비스</h4>
            <div className="space-y-3">
              {[
                { name: "로고 디자인", sales: 12450, percentage: 85 },
                { name: "웹 개발", sales: 8920, percentage: 70 },
                { name: "번역 서비스", sales: 6780, percentage: 55 },
              ].map((service, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0F172A]">{service.name}</span>
                    <span className="text-sm text-[#64748B]">{service.sales.toLocaleString()}건</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div
                      className="bg-[#2E5E99] h-2 rounded-full"
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-4">평점 분석</h4>
            <div className="space-y-3">
              {[
                { rating: "5점", count: 12450, percentage: 65 },
                { rating: "4점", count: 5230, percentage: 27 },
                { rating: "3점", count: 890, percentage: 5 },
                { rating: "2점 이하", count: 430, percentage: 3 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0F172A]">{item.rating}</span>
                    <span className="text-sm text-[#64748B]">{item.count.toLocaleString()}건</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


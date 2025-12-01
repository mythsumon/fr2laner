"use client";

import { useState } from "react";
import { Eye, MousePointerClick, TrendingUp, ShoppingBag, DollarSign, Star } from "lucide-react";

const metrics = [
  { icon: Eye, label: "오늘 조회수", value: "1,234", change: "+12%" },
  { icon: Eye, label: "이번 주 조회수", value: "8,456", change: "+8%" },
  { icon: MousePointerClick, label: "클릭률", value: "3.2%", change: "+0.5%" },
  { icon: TrendingUp, label: "전환율", value: "2.8%", change: "-0.2%" },
  { icon: ShoppingBag, label: "서비스당 주문", value: "4.2", change: "+0.8" },
  { icon: DollarSign, label: "서비스당 수익", value: "₩450K", change: "+12%" },
  { icon: Star, label: "평균 평점", value: "4.9", change: "+0.1" },
];

export const AnalyticsPage = () => {
  const [selectedPeriod] = useState<"week" | "month">("week");
  const [hoveredViewsIndex, setHoveredViewsIndex] = useState<number | null>(null);
  const [hoveredOrdersIndex, setHoveredOrdersIndex] = useState<number | null>(null);

  const viewsData = selectedPeriod === "week" 
    ? [120, 135, 150, 145, 160, 155, 170]
    : [1200, 1350, 1500, 1450, 1600, 1550, 1700, 1650, 1800, 1750, 1900, 1850];

  const ordersData = [5, 8, 12, 10, 15, 18, 20];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">분석</h1>
        <p className="mt-1 text-sm text-[#475569]">서비스 성과를 분석하세요</p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-[#475569]">
                <Icon className="size-4" />
                <span>{metric.label}</span>
              </div>
              <div className="mb-1 text-2xl font-bold text-[#0F172A]">{metric.value}</div>
              <div className="text-xs text-green-600">{metric.change}</div>
            </div>
          );
        })}
      </div>

      {/* Views Chart */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">조회수 추이</h2>
        <div className="relative flex h-48 items-end justify-between gap-2 rounded-lg bg-[#F8FAFC] p-4">
          {viewsData.map((value, index) => (
            <div
              key={index}
              className="group relative flex-1 rounded-t bg-[#2E5E99] transition-all hover:bg-[#1d4673] cursor-pointer"
              style={{ height: `${(value / Math.max(...viewsData)) * 100}%` }}
              onMouseEnter={() => setHoveredViewsIndex(index)}
              onMouseLeave={() => setHoveredViewsIndex(null)}
            >
              {hoveredViewsIndex === index && (
                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0F172A] px-3 py-2 text-xs font-semibold text-white shadow-lg before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#0F172A]">
                  {selectedPeriod === "week" ? `Day ${index + 1}` : `Month ${index + 1}`}: {value.toLocaleString()} views
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Orders Chart */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">주문 추이</h2>
        <div className="relative flex h-48 items-end justify-between gap-2 rounded-lg bg-[#F8FAFC] p-4">
          {ordersData.map((value, index) => (
            <div
              key={index}
              className="group relative flex-1 rounded-t bg-green-500 transition-all hover:bg-green-600 cursor-pointer"
              style={{ height: `${(value / Math.max(...ordersData)) * 100}%` }}
              onMouseEnter={() => setHoveredOrdersIndex(index)}
              onMouseLeave={() => setHoveredOrdersIndex(null)}
            >
              {hoveredOrdersIndex === index && (
                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0F172A] px-3 py-2 text-xs font-semibold text-white shadow-lg before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#0F172A]">
                  Day {index + 1}: {value} orders
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Service */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">인기 서비스</h2>
        <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <div className="font-semibold text-[#0F172A]">프리미엄 로고 디자인 서비스</div>
          <div className="mt-2 flex items-center gap-4 text-sm text-[#475569]">
            <span>조회수: 3,420</span>
            <span>주문: 124건</span>
            <span>수익: ₩18.6M</span>
          </div>
        </div>
      </div>
    </div>
  );
};



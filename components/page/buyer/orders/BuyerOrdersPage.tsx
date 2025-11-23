"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MessageSquare, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { BuyerBottomNav } from "@/components/page/buyer/BuyerBottomNav";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

type OrderStatus = "all" | "in-progress" | "pending" | "delivered" | "completed" | "cancelled";

const orders: Array<{
  id: string;
  title: string;
  seller: string;
  status: OrderStatus;
  progress: number;
  deliveryDue: string;
  package: string;
  price: number;
}> = [
  {
    id: "ORD-1043",
    title: "프리미엄 로고 디자인",
    seller: "김디자이너",
    status: "in-progress",
    progress: 45,
    deliveryDue: "2일 4시간",
    package: "Standard",
    price: 350000,
  },
  {
    id: "ORD-1038",
    title: "브랜드 아이덴티티 패키지",
    seller: "박브랜딩",
    status: "pending",
    progress: 0,
    deliveryDue: "요구사항 대기",
    package: "Premium",
    price: 680000,
  },
  {
    id: "ORD-1002",
    title: "상세페이지 디자인",
    seller: "이상세",
    status: "delivered",
    progress: 100,
    deliveryDue: "검토 중",
    package: "Basic",
    price: 180000,
  },
];

const tabs: { id: OrderStatus; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "in-progress", label: "진행중" },
  { id: "pending", label: "요구사항" },
  { id: "delivered", label: "납품완료" },
  { id: "completed", label: "완료" },
  { id: "cancelled", label: "취소" },
];

const statusBadgeStyles: Record<OrderStatus, string> = {
  "all": "border-[#E2E8F0] text-[#475569]",
  "in-progress": "border-[#2E5E99] text-[#2E5E99]",
  "pending": "border-[#F59E0B] text-[#B45309]",
  "delivered": "border-[#6366F1] text-[#4338CA]",
  "completed": "border-[#16A34A] text-[#15803D]",
  "cancelled": "border-[#EF4444] text-[#B91C1C]",
};

export const BuyerOrdersPage = () => {
  useBodyClass("dashboard-page");

  const [activeTab, setActiveTab] = useState<OrderStatus>("all");

  const filteredOrders = orders.filter((order) => activeTab === "all" || order.status === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.id ? "bg-[#2E5E99] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#CBD5F5] bg-white px-6 py-16 text-center">
              <p className="text-lg font-semibold text-[#475569]">해당 상태의 주문이 없습니다.</p>
              <p className="mt-2 text-sm text-[#94A3B8]">새로운 서비스를 찾아보거나 요구사항을 제출해보세요.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#94A3B8]">{order.id}</p>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${statusBadgeStyles[order.status]}`}
                      >
                        {tabs.find((tab) => tab.id === order.status)?.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">{order.title}</h3>
                    <p className="text-sm text-[#475569]">
                      판매자 {order.seller} · {order.package} 패키지
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#94A3B8]">결제 금액</p>
                    <p className="text-2xl font-bold text-[#0F172A]">₩{order.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                      <Clock className="size-4" />
                      {order.status === "pending" ? "요구사항 제출 필요" : "남은 시간"}
                    </div>
                    <div className="text-sm font-semibold text-[#0F172A]">{order.deliveryDue}</div>
                    <div className="h-2 rounded-full bg-[#E2E8F0]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#2E5E99] via-[#3B82F6] to-[#60A5FA]"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/buyer-messages?orderId=${order.id}`}>
                      <Button
                        type="default"
                        size="small"
                        shape="round"
                        className="gap-2 border border-[#E2E8F0] !bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:!bg-[#F8FAFC]"
                      >
                        <MessageSquare className="size-4" />
                        메시지
                      </Button>
                    </Link>
                    <Link href={`/orders/${order.id}`}>
                      <Button
                        type="primary"
                        size="small"
                        shape="round"
                        className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                      >
                        <FileText className="size-4" />
                        주문 상세
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <BuyerBottomNav />
    </div>
  );
};



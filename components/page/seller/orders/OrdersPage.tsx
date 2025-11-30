"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";
import { Button } from "@/components/shared/common";

type OrderStatus = "active" | "pending" | "delivered" | "completed" | "cancelled";

interface Order {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  packageName: string;
  price: number;
  deliveryDays: number;
  daysRemaining: number;
  status: OrderStatus;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    buyerName: "김클라이언트",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    packageName: "Premium 패키지",
    price: 500000,
    deliveryDays: 7,
    daysRemaining: 3,
    status: "active",
  },
  {
    id: "ORD-002",
    buyerName: "박의뢰인",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    packageName: "Standard 패키지",
    price: 300000,
    deliveryDays: 5,
    daysRemaining: 1,
    status: "active",
  },
  {
    id: "ORD-003",
    buyerName: "이구매자",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    packageName: "Basic 패키지",
    price: 150000,
    deliveryDays: 3,
    daysRemaining: 0,
    status: "pending",
  },
];

export const OrdersPage = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<OrderStatus>(
    (searchParams.get("status") as OrderStatus) || "active"
  );

  const tabs: { id: OrderStatus; label: string }[] = [
    { id: "active", label: "진행 중" },
    { id: "pending", label: "대기 중" },
    { id: "delivered", label: "납품 완료" },
    { id: "completed", label: "완료" },
    { id: "cancelled", label: "취소" },
  ];

  const filteredOrders = mockOrders.filter((order) => order.status === activeTab);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "active":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "delivered":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "active":
        return "진행 중";
      case "pending":
        return "대기 중";
      case "delivered":
        return "납품 완료";
      case "completed":
        return "완료";
      case "cancelled":
        return "취소";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">주문 관리</h1>
        <p className="mt-1 text-sm text-[#475569]">주문을 관리하고 상태를 업데이트하세요</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 border-b border-[#E2E8F0]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-[#2E5E99] text-[#2E5E99]"
                  : "border-transparent text-[#475569] hover:text-[#2E5E99]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-[#CBD5F5] bg-white p-10 text-center">
            <p className="text-lg font-medium text-[#475569]">
              {getStatusLabel(activeTab)} 상태의 주문이 없습니다
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Link
              key={order.id}
              href={`/expert/orders/${order.id}`}
              className="block rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:shadow-md md:p-6"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={order.buyerAvatar}
                  alt={order.buyerName}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <User className="size-4 text-[#475569]" />
                        <span className="font-semibold text-[#0F172A]">{order.buyerName}</span>
                      </div>
                      <div className="text-sm text-[#475569]">주문번호: {order.id}</div>
                      <div className="mt-1 text-sm font-medium text-[#0F172A]">
                        {order.packageName} - ₩{order.price.toLocaleString()}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#475569]">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>
                        {order.daysRemaining > 0
                          ? `남은 시간: ${order.daysRemaining}일`
                          : "납품 기한"}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  size="small"
                  shape="round"
                  className="shrink-0 bg-[#2E5E99] text-xs font-semibold text-white hover:bg-[#1d4673]"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/expert/orders/${order.id}`;
                  }}
                >
                  주문 보기
                </Button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};






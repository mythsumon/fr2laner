"use client";

import { Bell, ShoppingBag, MessageSquare, DollarSign, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/common";

interface Notification {
  id: string;
  type: "order" | "message" | "payment" | "system";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "새 주문이 도착했습니다",
    message: "ORD-001 주문이 접수되었습니다",
    time: "10분 전",
    isRead: false,
  },
  {
    id: "2",
    type: "message",
    title: "새 메시지",
    message: "김클라이언트님이 메시지를 보냈습니다",
    time: "30분 전",
    isRead: false,
  },
  {
    id: "3",
    type: "payment",
    title: "정산 완료",
    message: "₩500,000이 계좌에 입금되었습니다",
    time: "2시간 전",
    isRead: true,
  },
  {
    id: "4",
    type: "system",
    title: "시스템 업데이트",
    message: "새로운 기능이 추가되었습니다",
    time: "1일 전",
    isRead: true,
  },
];

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <ShoppingBag className="size-5 text-blue-500" />;
    case "message":
      return <MessageSquare className="size-5 text-green-500" />;
    case "payment":
      return <DollarSign className="size-5 text-purple-500" />;
    case "system":
      return <Bell className="size-5 text-orange-500" />;
  }
};

export const NotificationsPage = () => {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">알림</h1>
          <p className="mt-1 text-sm text-[#475569]">새로운 알림 {unreadCount}개</p>
        </div>
        {unreadCount > 0 && (
          <Button
            type="default"
            size="small"
            shape="round"
            className="border border-[#E2E8F0] bg-white text-sm font-medium text-[#475569] hover:bg-[#F1F5F9]"
          >
            모두 읽음
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {mockNotifications.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-[#CBD5F5] bg-white p-10 text-center">
            <div>
              <Bell className="mx-auto mb-4 size-12 text-[#CBD5F5]" />
              <p className="text-lg font-medium text-[#475569]">알림이 없습니다</p>
            </div>
          </div>
        ) : (
          mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                !notification.isRead ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="shrink-0">{getIcon(notification.type)}</div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0F172A]">{notification.title}</h3>
                    <p className="mt-1 text-sm text-[#475569]">{notification.message}</p>
                  </div>
                  {!notification.isRead && (
                    <div className="size-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="mt-2 text-xs text-[#94A3B8]">{notification.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


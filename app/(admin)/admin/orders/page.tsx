"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  X,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import Link from "next/link";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

interface Order {
  id: string;
  buyer: string;
  seller: string;
  service: string;
  amount: string;
  status: "completed" | "in_progress" | "cancelled" | "pending";
  createdAt: string;
  completedAt: string | null;
}

const initialOrders: Order[] = [
  {
    id: "ORD-2024-001",
    buyer: "김구매",
    seller: "최디자인",
    service: "프리미엄 로고 디자인",
    amount: "₩250,000",
    status: "completed",
    createdAt: "2024-03-10",
    completedAt: "2024-03-15",
  },
  {
    id: "ORD-2024-002",
    buyer: "이소비",
    seller: "정개발",
    service: "반응형 웹사이트 개발",
    amount: "₩1,500,000",
    status: "in_progress",
    createdAt: "2024-03-12",
    completedAt: null,
  },
  {
    id: "ORD-2024-003",
    buyer: "박고객",
    seller: "강번역",
    service: "영문 번역 서비스",
    amount: "₩50,000",
    status: "cancelled",
    createdAt: "2024-03-08",
    completedAt: null,
  },
];

export default function OrdersManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast, showToast, hideToast } = useToast();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [editModal, setEditModal] = useState<{ isOpen: boolean; order: Order | null }>({
    isOpen: false,
    order: null,
  });
  const [statusChangeModal, setStatusChangeModal] = useState<{
    isOpen: boolean;
    order: Order | null;
    newStatus: Order["status"] | null;
  }>({
    isOpen: false,
    order: null,
    newStatus: null,
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      completed: { label: "완료", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
      in_progress: { label: "진행 중", color: "bg-blue-100 text-blue-700", icon: Clock },
      cancelled: { label: "취소됨", color: "bg-red-100 text-red-700", icon: XCircle },
      pending: { label: "대기 중", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    const Icon = statusInfo.icon;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        <Icon className="size-3 mr-1" />
        {statusInfo.label}
      </span>
    );
  };

  const handleEditOrder = (order: Order) => {
    setEditModal({ isOpen: true, order });
  };

  const handleStatusChange = (order: Order, newStatus: Order["status"]) => {
    setStatusChangeModal({ isOpen: true, order, newStatus });
  };

  const confirmStatusChange = () => {
    if (statusChangeModal.order && statusChangeModal.newStatus) {
      setOrders(
        orders.map((o) =>
          o.id === statusChangeModal.order!.id
            ? {
                ...o,
                status: statusChangeModal.newStatus!,
                completedAt: statusChangeModal.newStatus === "completed" ? new Date().toISOString().split("T")[0] : o.completedAt,
              }
            : o
        )
      );
      showToast("주문 상태가 변경되었습니다.", "success");
    }
    setStatusChangeModal({ isOpen: false, order: null, newStatus: null });
  };

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editModal.order) {
      showToast("주문 정보가 업데이트되었습니다.", "success");
      setEditModal({ isOpen: false, order: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">주문 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">모든 주문을 추적하고 관리하세요</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="주문 ID, 구매자, 판매자로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">모든 상태</option>
            <option value="completed">완료</option>
            <option value="in_progress">진행 중</option>
            <option value="pending">대기 중</option>
            <option value="cancelled">취소됨</option>
          </select>
          <Button type="outline">
            <Filter className="size-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">주문 ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">구매자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">판매자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">서비스</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">금액</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">생성일</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="font-medium text-[#2E5E99] hover:underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#0F172A]">
                    <Link href={`/client/orders?buyer=${order.buyer}`} className="text-[#2E5E99] hover:underline">
                      {order.buyer}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#0F172A]">
                    <Link href={`/expert/orders?seller=${order.seller}`} className="text-[#2E5E99] hover:underline">
                      {order.seller}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#64748B]">{order.service}</td>
                  <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{order.amount}</td>
                  <td className="px-4 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-4 py-4 text-sm text-[#64748B]">{order.createdAt}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/orders/${order.id}`}>
                        <button className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]" title="보기">
                          <Eye className="size-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                        title="수정"
                      >
                        <Edit className="size-4" />
                      </button>
                      {order.status !== "completed" && order.status !== "cancelled" && (
                        <button
                          onClick={() => handleStatusChange(order, "completed")}
                          className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                          title="완료로 변경"
                        >
                          <CheckCircle2 className="size-4" />
                        </button>
                      )}
                      {order.status !== "cancelled" && (
                        <button
                          onClick={() => handleStatusChange(order, "cancelled")}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                          title="취소"
                        >
                          <XCircle className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {editModal.isOpen && editModal.order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">주문 수정</h2>
              <button
                onClick={() => setEditModal({ isOpen: false, order: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">금액</label>
                <input
                  type="text"
                  defaultValue={editModal.order.amount}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">상태</label>
                <select
                  defaultValue={editModal.order.status}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                >
                  <option value="pending">대기 중</option>
                  <option value="in_progress">진행 중</option>
                  <option value="completed">완료</option>
                  <option value="cancelled">취소됨</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditModal({ isOpen: false, order: null })}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  저장
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      <ConfirmModal
        isOpen={statusChangeModal.isOpen}
        onClose={() => setStatusChangeModal({ isOpen: false, order: null, newStatus: null })}
        onConfirm={confirmStatusChange}
        title="주문 상태 변경"
        message={
          statusChangeModal.order && statusChangeModal.newStatus
            ? `${statusChangeModal.order.id} 주문을 ${statusChangeModal.newStatus === "completed" ? "완료" : statusChangeModal.newStatus === "cancelled" ? "취소됨" : "진행 중"} 상태로 변경하시겠습니까?`
            : ""
        }
        confirmText="변경"
        type="info"
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

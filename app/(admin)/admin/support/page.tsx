"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import Link from "next/link";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

interface Ticket {
  id: string;
  user: string;
  subject: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "resolved" | "closed";
  assignedTo: string;
  createdAt: string;
  lastReply: string;
}

const initialTickets: Ticket[] = [
  {
    id: "TKT-2024-001",
    user: "김구매",
    subject: "결제 문제",
    category: "결제",
    priority: "high",
    status: "open",
    assignedTo: "관리자1",
    createdAt: "2024-03-15 10:30",
    lastReply: "2024-03-15 11:00",
  },
  {
    id: "TKT-2024-002",
    user: "이소비",
    subject: "계정 문제",
    category: "계정",
    priority: "medium",
    status: "in_progress",
    assignedTo: "관리자2",
    createdAt: "2024-03-14 14:20",
    lastReply: "2024-03-15 09:15",
  },
  {
    id: "TKT-2024-003",
    user: "최디자인",
    subject: "출금 요청",
    category: "재무",
    priority: "low",
    status: "resolved",
    assignedTo: "관리자1",
    createdAt: "2024-03-13 16:45",
    lastReply: "2024-03-14 10:30",
  },
];

export default function SupportTicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast, showToast, hideToast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Load tickets from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTickets = localStorage.getItem("support_tickets");
      if (storedTickets) {
        try {
          const parsedTickets = JSON.parse(storedTickets);
          setTickets(parsedTickets);
        } catch (e) {
          console.warn("Failed to parse support_tickets from localStorage", e);
          setTickets(initialTickets);
        }
      } else {
        setTickets(initialTickets);
      }
    }
  }, []);
  const [assignModal, setAssignModal] = useState<{ isOpen: boolean; ticket: Ticket | null }>({
    isOpen: false,
    ticket: null,
  });
  const [closeModal, setCloseModal] = useState<{ isOpen: boolean; ticket: Ticket | null }>({
    isOpen: false,
    ticket: null,
  });

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      high: { label: "높음", color: "bg-red-100 text-red-700" },
      medium: { label: "보통", color: "bg-yellow-100 text-yellow-700" },
      low: { label: "낮음", color: "bg-blue-100 text-blue-700" },
    };
    const priorityInfo = priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
        {priorityInfo.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      open: { label: "열림", color: "bg-yellow-100 text-yellow-700", icon: Clock },
      in_progress: { label: "진행 중", color: "bg-blue-100 text-blue-700", icon: Clock },
      resolved: { label: "해결됨", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
      closed: { label: "종료됨", color: "bg-gray-100 text-gray-700", icon: CheckCircle2 },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.open;
    const Icon = statusInfo.icon;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        <Icon className="size-3 mr-1" />
        {statusInfo.label}
      </span>
    );
  };

  const handleAssign = (ticket: Ticket) => {
    setAssignModal({ isOpen: true, ticket });
  };

  const confirmAssign = () => {
    if (assignModal.ticket) {
      setTickets(
        tickets.map((t) =>
          t.id === assignModal.ticket!.id
            ? { ...t, status: "in_progress" as const, assignedTo: "관리자1" }
            : t
        )
      );
      showToast("티켓이 할당되었습니다.", "success");
      setAssignModal({ isOpen: false, ticket: null });
    }
  };

  const handleClose = (ticket: Ticket) => {
    setCloseModal({ isOpen: true, ticket });
  };

  const confirmClose = () => {
    if (closeModal.ticket) {
      setTickets(
        tickets.map((t) => (t.id === closeModal.ticket!.id ? { ...t, status: "closed" as const } : t))
      );
      showToast("티켓이 종료되었습니다.", "success");
      setCloseModal({ isOpen: false, ticket: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">지원 티켓</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">사용자 지원 요청을 관리하세요</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="티켓 ID, 사용자, 제목으로 검색..."
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
            <option value="open">열림</option>
            <option value="in_progress">진행 중</option>
            <option value="resolved">해결됨</option>
            <option value="closed">종료됨</option>
          </select>
          <Button type="outline">
            <Filter className="size-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">티켓 ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">사용자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">제목</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">카테고리</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">우선순위</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">담당자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/support/${ticket.id}`}
                      className="font-medium text-[#2E5E99] hover:underline"
                    >
                      {ticket.id}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#0F172A]">{ticket.user}</td>
                  <td className="px-4 py-4 text-sm text-[#64748B]">{ticket.subject}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#F8FAFC] text-[#64748B]">
                      <Tag className="size-3 mr-1" />
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">{getPriorityBadge(ticket.priority)}</td>
                  <td className="px-4 py-4 text-sm text-[#64748B]">{ticket.assignedTo}</td>
                  <td className="px-4 py-4">{getStatusBadge(ticket.status)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/support/${ticket.id}`}>
                        <Button size="sm" type="primary">
                          <MessageSquare className="size-4 mr-2" />
                          처리
                        </Button>
                      </Link>
                      {ticket.status === "open" && (
                        <Button size="sm" type="outline" onClick={() => handleAssign(ticket)}>
                          할당
                        </Button>
                      )}
                      {ticket.status !== "closed" && (
                        <Button size="sm" type="outline" onClick={() => handleClose(ticket)}>
                          종료
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      <ConfirmModal
        isOpen={assignModal.isOpen}
        onClose={() => setAssignModal({ isOpen: false, ticket: null })}
        onConfirm={confirmAssign}
        title="티켓 할당"
        message={assignModal.ticket ? `${assignModal.ticket.id} 티켓을 할당하시겠습니까?` : ""}
        confirmText="할당"
        type="info"
      />

      {/* Close Modal */}
      <ConfirmModal
        isOpen={closeModal.isOpen}
        onClose={() => setCloseModal({ isOpen: false, ticket: null })}
        onConfirm={confirmClose}
        title="티켓 종료"
        message={closeModal.ticket ? `${closeModal.ticket.id} 티켓을 종료하시겠습니까?` : ""}
        confirmText="종료"
        type="warning"
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

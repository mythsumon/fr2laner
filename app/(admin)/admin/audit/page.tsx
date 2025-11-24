"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  User,
  Package,
  DollarSign,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";

const mockLogs = [
  {
    id: 1,
    admin: "관리자1",
    action: "사용자 차단",
    target: "박고객",
    details: "사용자 ID: 123",
    ip: "192.168.1.1",
    timestamp: "2024-03-15 14:30:25",
  },
  {
    id: 2,
    admin: "관리자2",
    action: "서비스 승인",
    target: "프리미엄 로고 디자인",
    details: "서비스 ID: 456",
    ip: "192.168.1.2",
    timestamp: "2024-03-15 13:15:10",
  },
  {
    id: 3,
    admin: "관리자1",
    action: "주문 상태 변경",
    target: "ORD-2024-001",
    details: "상태: 진행 중 → 완료",
    ip: "192.168.1.1",
    timestamp: "2024-03-15 12:00:00",
  },
];

export default function AuditTrailPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getActionIcon = (action: string) => {
    if (action.includes("사용자")) return User;
    if (action.includes("서비스")) return Package;
    if (action.includes("주문") || action.includes("결제")) return DollarSign;
    return Shield;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">활동 로그</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">모든 관리자 활동을 추적하세요</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="관리자, 작업, 대상으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <Button type="outline">
            <Filter className="size-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">관리자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">대상</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상세</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">IP 주소</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">시간</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {mockLogs.map((log) => {
                const Icon = getActionIcon(log.action);
                return (
                  <tr key={log.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-[#64748B]" />
                        <span className="text-sm font-medium text-[#0F172A]">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#0F172A]">{log.admin}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{log.target}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{log.details}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{log.ip}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{log.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


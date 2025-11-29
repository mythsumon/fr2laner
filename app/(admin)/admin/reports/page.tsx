"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  Ban,
  X,
  AlertTriangle,
  User,
  Package,
  FolderKanban,
  Star,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

type ReportType = "user" | "service" | "project" | "review";
type ReportStatus = "open" | "resolved" | "dismissed";

interface Report {
  id: string;
  type: ReportType;
  reportedBy: string;
  reportedItem: string;
  targetId?: string; // Add targetId for linking
  reason: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
  resolvedAt?: string;
}

const initialReports: Report[] = [
  {
    id: "RPT-001",
    type: "user",
    reportedBy: "김클라이언트",
    reportedItem: "최디자인",
    reason: "부적절한 행동",
    description: "판매자가 부적절한 언어를 사용했습니다.",
    status: "open",
    createdAt: "2024-03-15",
  },
  {
    id: "RPT-002",
    type: "service",
    reportedBy: "이소비",
    reportedItem: "프리미엄 로고 디자인",
    reason: "허위 광고",
    description: "서비스 설명과 실제 제공 내용이 다릅니다.",
    status: "open",
    createdAt: "2024-03-14",
  },
  {
    id: "RPT-003",
    type: "project",
    reportedBy: "박의뢰인",
    reportedItem: "웹사이트 리뉴얼 프로젝트",
    reason: "스팸",
    description: "프로젝트가 스팸으로 의심됩니다.",
    status: "resolved",
    createdAt: "2024-03-10",
    resolvedAt: "2024-03-12",
  },
  {
    id: "RPT-004",
    type: "review",
    reportedBy: "김구매",
    reportedItem: "리뷰 #123",
    reason: "부적절한 내용",
    description: "리뷰에 부적절한 내용이 포함되어 있습니다.",
    status: "open",
    createdAt: "2024-03-13",
  },
];

export default function ReportsManagementPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReportType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
  const { toast, showToast, hideToast } = useToast();
  const [actionModal, setActionModal] = useState<{ isOpen: boolean; report: Report | null; action: string }>({
    isOpen: false,
    report: null,
    action: "",
  });
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; report: Report | null }>({
    isOpen: false,
    report: null,
  });

  // Load reports from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedReports = localStorage.getItem("reports");
      if (storedReports) {
        try {
          const parsedReports = JSON.parse(storedReports);
          setReports([...initialReports, ...parsedReports]);
        } catch (e) {
          console.warn("Failed to parse reports from localStorage", e);
        }
      }
    }
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      searchQuery === "" ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedItem.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAction = (report: Report, action: string) => {
    setActionModal({ isOpen: true, report, action });
  };

  const confirmAction = () => {
    if (actionModal.report && actionModal.action) {
      if (actionModal.action === "resolve") {
        setReports(
          reports.map((r) =>
            r.id === actionModal.report!.id
              ? { ...r, status: "resolved" as ReportStatus, resolvedAt: new Date().toISOString().split("T")[0] }
              : r
          )
        );
        showToast("신고가 처리되었습니다.", "success");
      } else if (actionModal.action === "hide") {
        showToast("대상이 숨김 처리되었습니다.", "success");
        setReports(
          reports.map((r) =>
            r.id === actionModal.report!.id ? { ...r, status: "resolved" as ReportStatus } : r
          )
        );
      } else if (actionModal.action === "ban") {
        showToast("사용자가 정지되었습니다.", "success");
        setReports(
          reports.map((r) =>
            r.id === actionModal.report!.id ? { ...r, status: "resolved" as ReportStatus } : r
          )
        );
      }
      setActionModal({ isOpen: false, report: null, action: "" });
    }
  };

  const getTypeIcon = (type: ReportType) => {
    switch (type) {
      case "user":
        return User;
      case "service":
        return Package;
      case "project":
        return FolderKanban;
      case "review":
        return Star;
      default:
        return AlertTriangle;
    }
  };

  const getTypeLabel = (type: ReportType) => {
    switch (type) {
      case "user":
        return "사용자";
      case "service":
        return "서비스";
      case "project":
        return "프로젝트";
      case "review":
        return "리뷰";
      default:
        return "기타";
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    const styles = {
      open: "bg-red-50 text-red-700 border-red-200",
      resolved: "bg-green-50 text-green-700 border-green-200",
      dismissed: "bg-gray-50 text-gray-700 border-gray-200",
    };
    const labels = {
      open: "처리 대기",
      resolved: "처리 완료",
      dismissed: "기각",
    };
    return { style: styles[status], label: labels[status] };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">신고 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">모든 신고를 관리하고 처리하세요</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="신고 검색..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ReportType | "all")}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">전체 유형</option>
            <option value="user">사용자</option>
            <option value="service">서비스</option>
            <option value="project">프로젝트</option>
            <option value="review">리뷰</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ReportStatus | "all")}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">전체 상태</option>
            <option value="open">처리 대기</option>
            <option value="resolved">처리 완료</option>
            <option value="dismissed">기각</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">유형</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">신고자</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">대상</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">사유</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">생성일</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#64748B]">
                    신고가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => {
                  const TypeIcon = getTypeIcon(report.type);
                  const statusBadge = getStatusBadge(report.status);
                  return (
                    <tr key={report.id} className="hover:bg-[#F8FAFC]">
                      <td className="px-4 py-4">
                        <div className="font-medium text-[#0F172A]">{report.id}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="size-4 text-[#64748B]" />
                          <span className="text-sm text-[#0F172A]">{getTypeLabel(report.type)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0F172A]">{report.reportedBy}</td>
                      <td className="px-4 py-4 text-sm text-[#0F172A]">{report.reportedItem}</td>
                      <td className="px-4 py-4 text-sm text-[#64748B]">{report.reason}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.style}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#64748B]">{report.createdAt}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailModal({ isOpen: true, report })}
                            className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                            title="상세 보기"
                          >
                            <Eye className="size-4" />
                          </button>
                          {report.targetId && (
                            <Link
                              href={
                                report.type === "service"
                                  ? `/services/${report.targetId}`
                                  : report.type === "project"
                                  ? `/client/projects/${report.targetId}`
                                  : report.type === "review"
                                  ? `/services/${report.targetId}` // Review links to service page
                                  : "#"
                              }
                              target="_blank"
                              className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#2E5E99]"
                              title="대상 보기"
                            >
                              <ExternalLink className="size-4" />
                            </Link>
                          )}
                          {report.status === "open" && (
                            <>
                              <button
                                onClick={() => handleAction(report, "hide")}
                                className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-600"
                                title="대상 숨김"
                              >
                                <X className="size-4" />
                              </button>
                              {report.type === "user" && (
                                <button
                                  onClick={() => handleAction(report, "ban")}
                                  className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                                  title="사용자 정지"
                                >
                                  <Ban className="size-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleAction(report, "resolve")}
                                className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                                title="처리 완료"
                              >
                                <CheckCircle2 className="size-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {detailModal.isOpen && detailModal.report && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">신고 상세</h2>
              <button
                onClick={() => setDetailModal({ isOpen: false, report: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">신고 ID</div>
                <div className="font-semibold text-[#0F172A]">{detailModal.report.id}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">유형</div>
                <div className="font-semibold text-[#0F172A]">{getTypeLabel(detailModal.report.type)}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">신고자</div>
                <div className="font-semibold text-[#0F172A]">{detailModal.report.reportedBy}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">대상</div>
                <div className="font-semibold text-[#0F172A]">{detailModal.report.reportedItem}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">사유</div>
                <div className="font-semibold text-[#0F172A]">{detailModal.report.reason}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">상세 설명</div>
                <div className="text-sm text-[#475569] whitespace-pre-wrap">{detailModal.report.description}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">생성일</div>
                <div className="text-sm text-[#475569]">{detailModal.report.createdAt}</div>
              </div>
              {detailModal.report.targetId && (
                <div className="pt-4 border-t border-[#E2E8F0]">
                  <Link
                    href={
                      detailModal.report.type === "service"
                        ? `/services/${detailModal.report.targetId}`
                        : detailModal.report.type === "project"
                        ? `/client/projects/${detailModal.report.targetId}`
                        : detailModal.report.type === "review"
                        ? `/services/${detailModal.report.targetId}`
                        : "#"
                    }
                    target="_blank"
                  >
                    <Button type="primary" className="gap-2">
                      <ExternalLink className="size-4" />
                      대상 보기
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      <ConfirmModal
        isOpen={actionModal.isOpen && actionModal.action !== "view"}
        onClose={() => setActionModal({ isOpen: false, report: null, action: "" })}
        onConfirm={confirmAction}
        title={
          actionModal.action === "resolve"
            ? "신고 처리 완료"
            : actionModal.action === "hide"
            ? "대상 숨김"
            : actionModal.action === "ban"
            ? "사용자 정지"
            : "확인"
        }
        message={
          actionModal.action === "resolve"
            ? "이 신고를 처리 완료로 표시하시겠습니까?"
            : actionModal.action === "hide"
            ? "신고된 대상을 숨김 처리하시겠습니까?"
            : actionModal.action === "ban"
            ? "신고된 사용자를 정지하시겠습니까?"
            : "확인하시겠습니까?"
        }
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}



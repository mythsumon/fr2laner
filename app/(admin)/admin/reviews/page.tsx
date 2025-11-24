"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  X,
  AlertTriangle,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

interface Review {
  id: number;
  service: string;
  buyer: string;
  seller: string;
  rating: number;
  comment: string;
  status: "visible" | "hidden";
  createdAt: string;
}

interface Report {
  id: number;
  reportedBy: string;
  reportedUser: string;
  reason: string;
  evidence: string;
  status: "pending" | "resolved";
  createdAt: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    service: "프리미엄 로고 디자인",
    buyer: "김구매",
    seller: "최디자인",
    rating: 5,
    comment: "정말 만족스러운 서비스였습니다!",
    status: "visible",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    service: "반응형 웹사이트 개발",
    buyer: "이소비",
    seller: "정개발",
    rating: 2,
    comment: "품질이 기대에 못 미쳤습니다.",
    status: "hidden",
    createdAt: "2024-03-12",
  },
];

const initialReports: Report[] = [
  {
    id: 1,
    reportedBy: "김구매",
    reportedUser: "최디자인",
    reason: "부적절한 리뷰",
    evidence: "리뷰 스크린샷",
    status: "pending",
    createdAt: "2024-03-14",
  },
  {
    id: 2,
    reportedBy: "이소비",
    reportedUser: "정개발",
    reason: "허위 리뷰",
    evidence: "채팅 기록",
    status: "resolved",
    createdAt: "2024-03-10",
  },
];

export default function ReviewsManagementPage() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast, showToast, hideToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reports, setReports] = useState<Report[]>(initialReports);

  const [hideReviewModal, setHideReviewModal] = useState<{ isOpen: boolean; review: Review | null }>({
    isOpen: false,
    review: null,
  });
  const [editReviewModal, setEditReviewModal] = useState<{ isOpen: boolean; review: Review | null }>({
    isOpen: false,
    review: null,
  });
  const [resolveReportModal, setResolveReportModal] = useState<{ isOpen: boolean; report: Report | null }>({
    isOpen: false,
    report: null,
  });

  // Review functions
  const handleHideReview = (review: Review) => {
    setHideReviewModal({ isOpen: true, review });
  };

  const confirmHideReview = () => {
    if (hideReviewModal.review) {
      setReviews(
        reviews.map((r) =>
          r.id === hideReviewModal.review!.id
            ? { ...r, status: r.status === "visible" ? "hidden" : "visible" }
            : r
        )
      );
      showToast(
        hideReviewModal.review.status === "visible" ? "리뷰가 숨겨졌습니다." : "리뷰가 표시되었습니다.",
        "success"
      );
      setHideReviewModal({ isOpen: false, review: null });
    }
  };

  const handleEditReview = (review: Review) => {
    setEditReviewModal({ isOpen: true, review });
  };

  const handleSaveReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editReviewModal.review) {
      const formData = new FormData(e.currentTarget);
      setReviews(
        reviews.map((r) =>
          r.id === editReviewModal.review!.id
            ? { ...r, comment: formData.get("comment") as string }
            : r
        )
      );
      showToast("리뷰가 업데이트되었습니다.", "success");
      setEditReviewModal({ isOpen: false, review: null });
    }
  };

  // Report functions
  const handleResolveReport = (report: Report) => {
    setResolveReportModal({ isOpen: true, report });
  };

  const confirmResolveReport = () => {
    if (resolveReportModal.report) {
      setReports(
        reports.map((r) => (r.id === resolveReportModal.report!.id ? { ...r, status: "resolved" as const } : r))
      );
      showToast("신고가 처리되었습니다.", "success");
      setResolveReportModal({ isOpen: false, report: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">리뷰 & 신고 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">리뷰를 검토하고 신고를 처리하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1">
          {[
            { id: "reviews", label: "리뷰 관리" },
            { id: "reports", label: "사용자 신고" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-[#2E5E99] text-white"
                  : "text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="검색..."
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

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">서비스</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">구매자</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">판매자</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">평점</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">댓글</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-4 text-sm text-[#0F172A]">{review.service}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{review.buyer}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{review.seller}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B] max-w-xs truncate">{review.comment}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          review.status === "visible"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {review.status === "visible" ? "표시됨" : "숨김"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditReviewModal({ isOpen: true, review })}
                          className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                          title="수정"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() => handleHideReview(review)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                          title={review.status === "visible" ? "숨기기" : "표시하기"}
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">신고자</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">신고 대상</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">사유</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">증거</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-4 text-sm text-[#0F172A]">{report.reportedBy}</td>
                    <td className="px-4 py-4 text-sm text-[#0F172A]">{report.reportedUser}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{report.reason}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{report.evidence}</td>
                    <td className="px-4 py-4">
                      {report.status === "pending" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          <AlertTriangle className="size-3 mr-1" />
                          대기 중
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          처리됨
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {report.status === "pending" && (
                          <Button size="sm" type="primary" onClick={() => handleResolveReport(report)}>
                            <Eye className="size-4 mr-2" />
                            처리
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
      )}

      {/* Edit Review Modal */}
      {editReviewModal.isOpen && editReviewModal.review && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">리뷰 수정</h2>
              <button
                onClick={() => setEditReviewModal({ isOpen: false, review: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">댓글</label>
                <textarea
                  name="comment"
                  defaultValue={editReviewModal.review.comment}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditReviewModal({ isOpen: false, review: null })}
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

      {/* Hide Review Modal */}
      <ConfirmModal
        isOpen={hideReviewModal.isOpen}
        onClose={() => setHideReviewModal({ isOpen: false, review: null })}
        onConfirm={confirmHideReview}
        title={hideReviewModal.review?.status === "visible" ? "리뷰 숨기기" : "리뷰 표시하기"}
        message={
          hideReviewModal.review
            ? `이 리뷰를 ${hideReviewModal.review.status === "visible" ? "숨기" : "표시"}시겠습니까?`
            : ""
        }
        confirmText={hideReviewModal.review?.status === "visible" ? "숨기기" : "표시하기"}
        type="warning"
      />

      {/* Resolve Report Modal */}
      <ConfirmModal
        isOpen={resolveReportModal.isOpen}
        onClose={() => setResolveReportModal({ isOpen: false, report: null })}
        onConfirm={confirmResolveReport}
        title="신고 처리"
        message={resolveReportModal.report ? "이 신고를 처리 완료로 표시하시겠습니까?" : ""}
        confirmText="처리"
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

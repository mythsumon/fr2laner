"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Edit,
  Ban,
  Eye,
  CheckCircle2,
  XCircle,
  UserCheck,
  Users,
  Shield,
  X,
  FileText,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

type UserStatus = "active" | "banned" | "pending" | "verified";
type VerificationStatus = "approved" | "pending" | "rejected";

interface Buyer {
  id: number;
  name: string;
  email: string;
  orders: number;
  totalSpent: string;
  status: UserStatus;
  joined: string;
  reports: number;
  phone?: string;
  address?: string;
}

interface Seller {
  id: number;
  name: string;
  email: string;
  services: number;
  orders: number;
  revenue: string;
  status: UserStatus;
  verification: VerificationStatus;
  joined: string;
  rating: number;
  kycDocuments?: string[];
}

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastActive: string;
  status: UserStatus;
}

const initialBuyers: Buyer[] = [
  {
    id: 1,
    name: "김구매",
    email: "buyer1@example.com",
    orders: 12,
    totalSpent: "₩2,450,000",
    status: "active",
    joined: "2024-01-15",
    reports: 0,
    phone: "010-1234-5678",
    address: "서울시 강남구",
  },
  {
    id: 2,
    name: "이소비",
    email: "buyer2@example.com",
    orders: 8,
    totalSpent: "₩1,890,000",
    status: "active",
    joined: "2024-02-20",
    reports: 1,
    phone: "010-2345-6789",
  },
  {
    id: 3,
    name: "박고객",
    email: "buyer3@example.com",
    orders: 0,
    totalSpent: "₩0",
    status: "banned",
    joined: "2023-12-10",
    reports: 3,
  },
];

const initialSellers: Seller[] = [
  {
    id: 1,
    name: "최디자인",
    email: "seller1@example.com",
    services: 15,
    orders: 234,
    revenue: "₩12,450,000",
    status: "verified",
    verification: "approved",
    joined: "2023-11-05",
    rating: 4.9,
    kycDocuments: ["신분증", "통장사본"],
  },
  {
    id: 2,
    name: "정개발",
    email: "seller2@example.com",
    services: 8,
    orders: 89,
    revenue: "₩5,670,000",
    status: "pending",
    verification: "pending",
    joined: "2024-03-01",
    rating: 4.7,
    kycDocuments: ["신분증"],
  },
  {
    id: 3,
    name: "강번역",
    email: "seller3@example.com",
    services: 22,
    orders: 456,
    revenue: "₩18,900,000",
    status: "verified",
    verification: "approved",
    joined: "2023-09-12",
    rating: 4.8,
  },
];

const initialAdmins: Admin[] = [
  {
    id: 1,
    name: "관리자1",
    email: "admin1@example.com",
    role: "Super Admin",
    permissions: ["all"],
    lastActive: "2024-03-15 14:30",
    status: "active",
  },
  {
    id: 2,
    name: "관리자2",
    email: "admin2@example.com",
    role: "Moderator",
    permissions: ["users", "reviews", "disputes"],
    lastActive: "2024-03-15 10:15",
    status: "active",
  },
];

function UsersManagementContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "buyer";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast, showToast, hideToast } = useToast();

  const [buyers, setBuyers] = useState<Buyer[]>(initialBuyers);
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);

  // Modal states
  const [viewModal, setViewModal] = useState<{ isOpen: boolean; user: any }>({
    isOpen: false,
    user: null,
  });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; user: any }>({
    isOpen: false,
    user: null,
  });
  const [banModal, setBanModal] = useState<{ isOpen: boolean; user: any; type: string }>({
    isOpen: false,
    user: null,
    type: "",
  });
  const [approveModal, setApproveModal] = useState<{ isOpen: boolean; seller: Seller | null }>({
    isOpen: false,
    seller: null,
  });
  const [createAdminModal, setCreateAdminModal] = useState(false);

  const tabs = [
    { id: "buyer", label: "구매자", icon: Users, count: 12458 },
    { id: "seller", label: "판매자", icon: UserCheck, count: 3247 },
    { id: "admin", label: "관리자", icon: Shield, count: 12 },
  ];

  // Buyer functions
  const handleViewBuyer = (buyer: Buyer) => {
    setViewModal({ isOpen: true, user: buyer });
  };

  const handleEditBuyer = (buyer: Buyer) => {
    setEditModal({ isOpen: true, user: buyer });
  };

  const handleBanBuyer = (buyer: Buyer) => {
    setBanModal({ isOpen: true, user: buyer, type: "buyer" });
  };

  const confirmBanBuyer = () => {
    setBuyers(
      buyers.map((b) =>
        b.id === banModal.user.id ? { ...b, status: b.status === "banned" ? "active" : "banned" } : b
      )
    );
    showToast(
      banModal.user.status === "banned" ? "사용자가 활성화되었습니다." : "사용자가 차단되었습니다.",
      "success"
    );
    setBanModal({ isOpen: false, user: null, type: "" });
  };

  // Seller functions
  const handleViewSeller = (seller: Seller) => {
    setViewModal({ isOpen: true, user: seller });
  };

  const handleEditSeller = (seller: Seller) => {
    setEditModal({ isOpen: true, user: seller });
  };

  const handleApproveSeller = (seller: Seller) => {
    setApproveModal({ isOpen: true, seller });
  };

  const confirmApproveSeller = () => {
    setSellers(
      sellers.map((s) =>
        s.id === approveModal.seller!.id
          ? { ...s, verification: "approved" as VerificationStatus, status: "verified" as UserStatus }
          : s
      )
    );
    showToast("판매자 인증이 승인되었습니다.", "success");
    setApproveModal({ isOpen: false, seller: null });
  };

  const handleBanSeller = (seller: Seller) => {
    setBanModal({ isOpen: true, user: seller, type: "seller" });
  };

  const confirmBanSeller = () => {
    setSellers(
      sellers.map((s) =>
        s.id === banModal.user.id ? { ...s, status: s.status === "banned" ? "active" : "banned" } : s
      )
    );
    showToast(
      banModal.user.status === "banned" ? "판매자가 활성화되었습니다." : "판매자가 차단되었습니다.",
      "success"
    );
    setBanModal({ isOpen: false, user: null, type: "" });
  };

  // Admin functions
  const handleEditAdmin = (admin: Admin) => {
    setEditModal({ isOpen: true, user: admin });
  };

  const handleCreateAdmin = () => {
    setCreateAdminModal(true);
  };

  const renderBuyerTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#F8FAFC]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">이름</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">이메일</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">주문 수</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">총 지출</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">신고</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {buyers.map((buyer) => (
            <tr key={buyer.id} className="hover:bg-[#F8FAFC]">
              <td className="px-4 py-4">
                <div className="font-medium text-[#0F172A]">{buyer.name}</div>
                <div className="text-sm text-[#64748B]">가입: {buyer.joined}</div>
              </td>
              <td className="px-4 py-4 text-sm text-[#64748B]">{buyer.email}</td>
              <td className="px-4 py-4 text-sm text-[#0F172A]">{buyer.orders}</td>
              <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{buyer.totalSpent}</td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    buyer.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {buyer.status === "active" ? "활성" : "차단됨"}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-[#0F172A]">{buyer.reports}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewBuyer(buyer)}
                    className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                    title="보기"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button
                    onClick={() => handleEditBuyer(buyer)}
                    className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                    title="수정"
                  >
                    <Edit className="size-4" />
                  </button>
                  <button
                    onClick={() => handleBanBuyer(buyer)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                    title={buyer.status === "banned" ? "활성화" : "차단"}
                  >
                    <Ban className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSellerTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#F8FAFC]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">이름</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">서비스</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">주문</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">수익</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">인증</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">평점</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {sellers.map((seller) => (
            <tr key={seller.id} className="hover:bg-[#F8FAFC]">
              <td className="px-4 py-4">
                <div className="font-medium text-[#0F172A]">{seller.name}</div>
                <div className="text-sm text-[#64748B]">{seller.email}</div>
              </td>
              <td className="px-4 py-4 text-sm text-[#0F172A]">{seller.services}</td>
              <td className="px-4 py-4 text-sm text-[#0F172A]">{seller.orders}</td>
              <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{seller.revenue}</td>
              <td className="px-4 py-4">
                {seller.verification === "pending" ? (
                  <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                    승인 대기
                  </Button>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <CheckCircle2 className="size-3 mr-1" />
                    인증됨
                  </span>
                )}
              </td>
              <td className="px-4 py-4 text-sm text-[#0F172A]">⭐ {seller.rating}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewSeller(seller)}
                    className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                    title="보기"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button
                    onClick={() => handleEditSeller(seller)}
                    className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                    title="수정"
                  >
                    <Edit className="size-4" />
                  </button>
                  {seller.verification === "pending" && (
                    <button
                      onClick={() => handleApproveSeller(seller)}
                      className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                      title="승인"
                    >
                      <CheckCircle2 className="size-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleBanSeller(seller)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                    title="차단"
                  >
                    <Ban className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAdminTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#F8FAFC]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">이름</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">이메일</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">역할</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">권한</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">마지막 활동</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {admins.map((admin) => (
            <tr key={admin.id} className="hover:bg-[#F8FAFC]">
              <td className="px-4 py-4 font-medium text-[#0F172A]">{admin.name}</td>
              <td className="px-4 py-4 text-sm text-[#64748B]">{admin.email}</td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#2E5E99]/10 text-[#2E5E99]">
                  {admin.role}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-[#64748B]">
                {admin.permissions.length === 1 && admin.permissions[0] === "all"
                  ? "전체 권한"
                  : admin.permissions.join(", ")}
              </td>
              <td className="px-4 py-4 text-sm text-[#64748B]">{admin.lastActive}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditAdmin(admin)}
                    className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                    title="수정"
                  >
                    <Edit className="size-4" />
                  </button>
                  <Button size="sm" type="primary" onClick={() => handleEditAdmin(admin)}>
                    권한 관리
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">사용자 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">구매자, 판매자, 관리자 계정을 관리하세요</p>
        </div>
        {type === "admin" && (
          <Button type="primary" onClick={handleCreateAdmin}>
            <Shield className="size-4 mr-2" />
            관리자 생성
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={`/admin/users?type=${tab.id}`}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  type === tab.id
                    ? "bg-[#2E5E99] text-white"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                <Icon className="size-4" />
                <span className="font-medium">{tab.label}</span>
                <span className="text-xs opacity-75">({tab.count.toLocaleString()})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="이름, 이메일로 검색..."
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
            <option value="active">활성</option>
            <option value="pending">대기 중</option>
            <option value="banned">차단됨</option>
          </select>
          <Button type="outline">
            <Filter className="size-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        {type === "buyer" && renderBuyerTable()}
        {type === "seller" && renderSellerTable()}
        {type === "admin" && renderAdminTable()}
      </div>

      {/* View Modal */}
      {viewModal.isOpen && viewModal.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">사용자 상세 정보</h2>
              <button
                onClick={() => setViewModal({ isOpen: false, user: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">이름</label>
                  <p className="text-[#0F172A] font-medium">{viewModal.user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">이메일</label>
                  <p className="text-[#0F172A]">{viewModal.user.email}</p>
                </div>
                {viewModal.user.phone && (
                  <div>
                    <label className="text-sm font-semibold text-[#64748B]">전화번호</label>
                    <p className="text-[#0F172A]">{viewModal.user.phone}</p>
                  </div>
                )}
                {viewModal.user.address && (
                  <div>
                    <label className="text-sm font-semibold text-[#64748B]">주소</label>
                    <p className="text-[#0F172A]">{viewModal.user.address}</p>
                  </div>
                )}
                {viewModal.user.kycDocuments && (
                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-[#64748B]">KYC 문서</label>
                    <div className="flex gap-2 mt-2">
                      {viewModal.user.kycDocuments.map((doc: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && editModal.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">사용자 수정</h2>
              <button
                onClick={() => setEditModal({ isOpen: false, user: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast("사용자 정보가 업데이트되었습니다.", "success");
                setEditModal({ isOpen: false, user: null });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">이름</label>
                <input
                  type="text"
                  defaultValue={editModal.user.name}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">이메일</label>
                <input
                  type="email"
                  defaultValue={editModal.user.email}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditModal({ isOpen: false, user: null })}
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

      {/* Ban Confirmation Modal */}
      <ConfirmModal
        isOpen={banModal.isOpen}
        onClose={() => setBanModal({ isOpen: false, user: null, type: "" })}
        onConfirm={type === "buyer" ? confirmBanBuyer : confirmBanSeller}
        title={banModal.user?.status === "banned" ? "사용자 활성화" : "사용자 차단"}
        message={
          banModal.user
            ? `${banModal.user.name}님을 ${banModal.user.status === "banned" ? "활성화" : "차단"}하시겠습니까?`
            : ""
        }
        confirmText={banModal.user?.status === "banned" ? "활성화" : "차단"}
      />

      {/* Approve Seller Modal */}
      <ConfirmModal
        isOpen={approveModal.isOpen}
        onClose={() => setApproveModal({ isOpen: false, seller: null })}
        onConfirm={confirmApproveSeller}
        title="판매자 인증 승인"
        message={approveModal.seller ? `${approveModal.seller.name}님의 판매자 인증을 승인하시겠습니까?` : ""}
        confirmText="승인"
        type="info"
      />

      {/* Create Admin Modal */}
      {createAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">관리자 생성</h2>
              <button
                onClick={() => setCreateAdminModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast("관리자가 생성되었습니다.", "success");
                setCreateAdminModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">이름</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">이메일</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">역할</label>
                <select className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none">
                  <option>Super Admin</option>
                  <option>Moderator</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setCreateAdminModal(false)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  생성
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default function UsersManagementPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-[#64748B]">사용자 데이터를 불러오는 중입니다...</div>}>
      <UsersManagementContent />
    </Suspense>
  );
}

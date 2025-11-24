"use client";

import { useState } from "react";
import {
  Tag,
  Bell,
  Star,
  Plus,
  Edit,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useHomeData, type HomeFeaturedService } from "@/contexts/HomeDataContext";
import { useToast } from "@/hooks/useToast";

interface Coupon {
  id: number;
  code: string;
  type: "percentage" | "amount";
  value: number;
  limit: number;
  used: number;
  expiry: string;
  status: "active" | "inactive";
}

interface FeaturedService {
  id: number;
  title: string;
  seller: string;
  price: string;
  duration: string;
  status: "active" | "pending";
}

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    limit: 100,
    used: 45,
    expiry: "2024-12-31",
    status: "active",
  },
  {
    id: 2,
    code: "SAVE5000",
    type: "amount",
    value: 5000,
    limit: 50,
    used: 12,
    expiry: "2024-06-30",
    status: "active",
  },
];

const initialFeaturedServices: FeaturedService[] = [
  { id: 1, title: "프리미엄 로고 디자인", seller: "최디자인", price: "₩250,000", duration: "7일", status: "active" },
  { id: 2, title: "반응형 웹사이트 개발", seller: "정개발", price: "₩1,500,000", duration: "14일", status: "pending" },
];

export default function MarketingManagementPage() {
  const [activeTab, setActiveTab] = useState("coupons");
  const { toast, showToast, hideToast } = useToast();
  const { featuredServices: homeFeaturedServices, updateFeaturedServices } = useHomeData();
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [featuredServices, setFeaturedServices] = useState<FeaturedService[]>(
    homeFeaturedServices.length > 0
      ? homeFeaturedServices.map((s) => ({
          id: s.id,
          title: s.title,
          seller: s.seller,
          price: s.price,
          duration: "7일",
          status: "active" as const,
        }))
      : initialFeaturedServices
  );
  const [notificationTargets, setNotificationTargets] = useState<string[]>([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationLink, setNotificationLink] = useState("");

  const [addCouponModal, setAddCouponModal] = useState(false);
  const [editCouponModal, setEditCouponModal] = useState<{ isOpen: boolean; coupon: Coupon | null }>({
    isOpen: false,
    coupon: null,
  });
  const [deleteCouponModal, setDeleteCouponModal] = useState<{ isOpen: boolean; coupon: Coupon | null }>({
    isOpen: false,
    coupon: null,
  });
  const [deleteFeaturedModal, setDeleteFeaturedModal] = useState<{ isOpen: boolean; service: FeaturedService | null }>({
    isOpen: false,
    service: null,
  });
  const [addFeaturedModal, setAddFeaturedModal] = useState(false);

  // Coupon functions
  const handleAddCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCoupon: Coupon = {
      id: Date.now(),
      code: formData.get("code") as string,
      type: formData.get("type") as "percentage" | "amount",
      value: parseFloat(formData.get("value") as string) || 0,
      limit: parseInt(formData.get("limit") as string) || 0,
      used: 0,
      expiry: formData.get("expiry") as string,
      status: "active",
    };
    setCoupons([...coupons, newCoupon]);
    showToast("쿠폰이 생성되었습니다.", "success");
    setAddCouponModal(false);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditCouponModal({ isOpen: true, coupon });
  };

  const handleSaveCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editCouponModal.coupon) {
      const formData = new FormData(e.currentTarget);
      setCoupons(
        coupons.map((c) =>
          c.id === editCouponModal.coupon!.id
            ? {
                ...c,
                code: formData.get("code") as string,
                type: formData.get("type") as "percentage" | "amount",
                value: parseFloat(formData.get("value") as string) || 0,
                limit: parseInt(formData.get("limit") as string) || 0,
                expiry: formData.get("expiry") as string,
              }
            : c
        )
      );
      showToast("쿠폰이 업데이트되었습니다.", "success");
      setEditCouponModal({ isOpen: false, coupon: null });
    }
  };

  const handleDeleteCoupon = (coupon: Coupon) => {
    setDeleteCouponModal({ isOpen: true, coupon });
  };

  const confirmDeleteCoupon = () => {
    if (deleteCouponModal.coupon) {
      setCoupons(coupons.filter((c) => c.id !== deleteCouponModal.coupon!.id));
      showToast("쿠폰이 삭제되었습니다.", "success");
      setDeleteCouponModal({ isOpen: false, coupon: null });
    }
  };

  // Notification functions
  const handleSendNotification = () => {
    if (!notificationMessage.trim()) {
      showToast("알림 내용을 입력하세요.", "error");
      return;
    }
    if (notificationTargets.length === 0) {
      showToast("대상을 선택하세요.", "error");
      return;
    }
    showToast(`알림이 ${notificationTargets.join(", ")}에게 전송되었습니다.`, "success");
    setNotificationMessage("");
    setNotificationLink("");
    setNotificationTargets([]);
  };

  const toggleNotificationTarget = (target: string) => {
    setNotificationTargets((prev) =>
      prev.includes(target) ? prev.filter((t) => t !== target) : [...prev, target]
    );
  };

  // Featured Service functions
  const handleAddFeatured = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newService: FeaturedService = {
      id: Date.now(),
      title: formData.get("title") as string,
      seller: formData.get("seller") as string,
      price: formData.get("price") as string,
      duration: formData.get("duration") as string,
      status: "active",
    };
    const updatedServices = [...featuredServices, newService];
    setFeaturedServices(updatedServices);
    // Sync with homepage
    updateFeaturedServices(
      updatedServices.map((s) => ({
        id: s.id,
        title: s.title,
        seller: s.seller,
        price: s.price,
        rating: 4.5,
        orders: 0,
        image: undefined,
      }))
    );
    showToast("추천 서비스가 추가되었습니다. 홈페이지에 반영되었습니다.", "success");
    setAddFeaturedModal(false);
  };

  const handleToggleFeaturedStatus = (service: FeaturedService) => {
    const updatedServices = featuredServices.map((s) =>
      s.id === service.id ? { ...s, status: s.status === "active" ? "pending" : "active" } : s
    );
    setFeaturedServices(updatedServices);
    // Sync only active services with homepage
    updateFeaturedServices(
      updatedServices
        .filter((s) => s.status === "active")
        .map((s) => ({
          id: s.id,
          title: s.title,
          seller: s.seller,
          price: s.price,
          rating: 4.5,
          orders: 0,
          image: undefined,
        }))
    );
    showToast(`서비스가 ${service.status === "active" ? "대기" : "활성"} 상태로 변경되었습니다.`, "success");
  };

  const handleDeleteFeatured = (service: FeaturedService) => {
    setDeleteFeaturedModal({ isOpen: true, service });
  };

  const confirmDeleteFeatured = () => {
    if (deleteFeaturedModal.service) {
      const updatedServices = featuredServices.filter((s) => s.id !== deleteFeaturedModal.service!.id);
      setFeaturedServices(updatedServices);
      // Sync only active services with homepage
      updateFeaturedServices(
        updatedServices
          .filter((s) => s.status === "active")
          .map((s) => ({
            id: s.id,
            title: s.title,
            seller: s.seller,
            price: s.price,
            rating: 4.5,
            orders: 0,
            image: undefined,
          }))
      );
      showToast("추천 서비스가 제거되었습니다. 홈페이지에 반영되었습니다.", "success");
      setDeleteFeaturedModal({ isOpen: false, service: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">마케팅 & 프로모션</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">쿠폰, 알림, 추천 서비스를 관리하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { id: "coupons", label: "쿠폰", icon: Tag },
            { id: "notifications", label: "알림/공지", icon: Bell },
            { id: "featured", label: "추천 서비스", icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#2E5E99] text-white"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                <Icon className="size-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Coupons Tab */}
      {activeTab === "coupons" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">쿠폰 관리</h3>
            <Button type="primary" onClick={() => setAddCouponModal(true)}>
              <Plus className="size-4 mr-2" />
              쿠폰 생성
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">코드</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">타입</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">할인</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">사용량</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">만료일</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-4 font-medium text-[#0F172A]">{coupon.code}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">
                      {coupon.type === "percentage" ? "퍼센트" : "금액"}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">
                      {coupon.type === "percentage" ? `${coupon.value}%` : `₩${coupon.value.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">
                      {coupon.used} / {coupon.limit}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{coupon.expiry}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle2 className="size-3 mr-1" />
                        활성
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" type="outline" onClick={() => handleEditCoupon(coupon)}>
                          <Edit className="size-4" />
                        </Button>
                        <Button size="sm" type="outline" onClick={() => handleDeleteCoupon(coupon)}>
                          <X className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">알림/공지 관리</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-[#E2E8F0]">
              <h4 className="font-medium text-[#0F172A] mb-2">대상 선택</h4>
              <div className="flex flex-wrap gap-2">
                {["모든 사용자", "구매자", "판매자"].map((target) => (
                  <label
                    key={target}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                      notificationTargets.includes(target)
                        ? "border-[#2E5E99] bg-[#2E5E99]/10"
                        : "border-[#E2E8F0] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={notificationTargets.includes(target)}
                      onChange={() => toggleNotificationTarget(target)}
                      className="rounded"
                    />
                    <span className="text-sm">{target}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-[#E2E8F0]">
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">알림 내용</label>
              <textarea
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                rows={4}
                placeholder="알림 메시지를 입력하세요..."
              />
            </div>
            <div className="p-4 rounded-lg border border-[#E2E8F0]">
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">링크 (선택사항)</label>
              <input
                type="url"
                value={notificationLink}
                onChange={(e) => setNotificationLink(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                placeholder="https://..."
              />
            </div>
            <Button type="primary" onClick={handleSendNotification}>
              <Bell className="size-4 mr-2" />
              알림 전송
            </Button>
          </div>
        </div>
      )}

      {/* Featured Services Tab */}
      {activeTab === "featured" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">추천 서비스 관리</h3>
            <Button type="primary" onClick={() => setAddFeaturedModal(true)}>
              <Plus className="size-4 mr-2" />
              추천 추가
            </Button>
          </div>
          <div className="space-y-4">
            {featuredServices.map((service) => (
              <div key={service.id} className="p-4 rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#0F172A]">{service.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[#64748B]">
                    <span>{service.seller}</span>
                    <span>{service.price}</span>
                    <span>{service.duration}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {service.status === "active" ? "활성" : "대기"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    type={service.status === "active" ? "default" : "outline"}
                    onClick={() => handleToggleFeaturedStatus(service)}
                  >
                    {service.status === "active" ? "활성" : "활성화"}
                  </Button>
                  <Button size="sm" type="outline" onClick={() => handleDeleteFeatured(service)}>
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {addCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">쿠폰 생성</h2>
              <button
                onClick={() => setAddCouponModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">쿠폰 코드</label>
                <input
                  type="text"
                  name="code"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">타입</label>
                <select
                  name="type"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                >
                  <option value="percentage">퍼센트</option>
                  <option value="amount">금액</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">할인 값</label>
                <input
                  type="number"
                  name="value"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">사용 제한</label>
                <input
                  type="number"
                  name="limit"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">만료일</label>
                <input
                  type="date"
                  name="expiry"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setAddCouponModal(false)}
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

      {/* Edit Coupon Modal */}
      {editCouponModal.isOpen && editCouponModal.coupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">쿠폰 수정</h2>
              <button
                onClick={() => setEditCouponModal({ isOpen: false, coupon: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">쿠폰 코드</label>
                <input
                  type="text"
                  name="code"
                  defaultValue={editCouponModal.coupon.code}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">타입</label>
                <select
                  name="type"
                  defaultValue={editCouponModal.coupon.type}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                >
                  <option value="percentage">퍼센트</option>
                  <option value="amount">금액</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">할인 값</label>
                <input
                  type="number"
                  name="value"
                  defaultValue={editCouponModal.coupon.value}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">사용 제한</label>
                <input
                  type="number"
                  name="limit"
                  defaultValue={editCouponModal.coupon.limit}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">만료일</label>
                <input
                  type="date"
                  name="expiry"
                  defaultValue={editCouponModal.coupon.expiry}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditCouponModal({ isOpen: false, coupon: null })}
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

      {/* Delete Coupon Modal */}
      <ConfirmModal
        isOpen={deleteCouponModal.isOpen}
        onClose={() => setDeleteCouponModal({ isOpen: false, coupon: null })}
        onConfirm={confirmDeleteCoupon}
        title="쿠폰 삭제"
        message={deleteCouponModal.coupon ? `${deleteCouponModal.coupon.code} 쿠폰을 삭제하시겠습니까?` : ""}
        confirmText="삭제"
      />

      {/* Delete Featured Modal */}
      <ConfirmModal
        isOpen={deleteFeaturedModal.isOpen}
        onClose={() => setDeleteFeaturedModal({ isOpen: false, service: null })}
        onConfirm={confirmDeleteFeatured}
        title="추천 서비스 제거"
        message={deleteFeaturedModal.service ? `${deleteFeaturedModal.service.title}를 추천에서 제거하시겠습니까?` : ""}
        confirmText="제거"
      />

      {/* Add Featured Service Modal */}
      {addFeaturedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">추천 서비스 추가</h2>
              <button
                onClick={() => setAddFeaturedModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddFeatured} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">서비스 제목</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">판매자</label>
                <input
                  type="text"
                  name="seller"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">가격</label>
                <input
                  type="text"
                  name="price"
                  placeholder="₩250,000"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">소요 기간</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="7일"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="default" htmlType="submit" className="flex-1">
                  추가
                </Button>
                <Button type="outline" onClick={() => setAddFeaturedModal(false)} className="flex-1">
                  취소
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

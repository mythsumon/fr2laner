"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Pause, Trash2, Star, Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/shared/common";

type ServiceStatus = "Active" | "Paused" | "Under Review";

interface Service {
  id: string;
  title: string;
  image: string;
  status: ServiceStatus;
  price: number;
  rating: number;
  reviews: number;
  views: number;
}

// Mock data
const mockServices: Service[] = [
  {
    id: "1",
    title: "프리미엄 로고 디자인 서비스",
    image: "https://via.placeholder.com/200x200?text=Logo+1",
    status: "Active",
    price: 150000,
    rating: 4.9,
    reviews: 124,
    views: 3420,
  },
  {
    id: "2",
    title: "브랜드 아이덴티티 디자인",
    image: "https://via.placeholder.com/200x200?text=Branding+1",
    status: "Active",
    price: 300000,
    rating: 5.0,
    reviews: 89,
    views: 2156,
  },
  {
    id: "3",
    title: "UI/UX 디자인 서비스",
    image: "https://via.placeholder.com/200x200?text=UIUX+1",
    status: "Paused",
    price: 500000,
    rating: 4.8,
    reviews: 56,
    views: 1890,
  },
  {
    id: "4",
    title: "일러스트 디자인",
    image: "https://via.placeholder.com/200x200?text=Illustration+1",
    status: "Under Review",
    price: 200000,
    rating: 0,
    reviews: 0,
    views: 45,
  },
];

export const MyServicesPage = () => {
  const [services] = useState<Service[]>(mockServices);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    window.location.href = `/dashboard/services/${id}/edit`;
  };

  const handlePause = (id: string) => {
    console.log("Pause service:", id);
  };

  const handleDelete = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      console.log("Delete service:", id);
    }
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Paused":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Under Review":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">내 서비스</h1>
          <p className="mt-1 text-sm text-[#475569]">등록한 서비스를 관리하세요</p>
        </div>
        <Link href="/dashboard/services/new">
          <Button
            type="primary"
            size="large"
            shape="round"
            className="hidden gap-2 bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673] sm:flex"
          >
            <Plus className="size-4" />
            새 서비스 등록
          </Button>
        </Link>
      </div>

      {/* Mobile: New Service Button */}
      <div className="mb-4 sm:hidden">
        <Link href="/dashboard/services/new">
          <Button
            type="primary"
            size="large"
            shape="round"
            className="w-full gap-2 bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673]"
          >
            <Plus className="size-4" />
            새 서비스 등록
          </Button>
        </Link>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-[#CBD5F5] bg-white p-10 text-center">
            <div>
              <p className="mb-4 text-lg font-medium text-[#475569]">등록된 서비스가 없습니다</p>
              <Link href="/dashboard/services/new">
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  className="gap-2 bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673]"
                >
                  <Plus className="size-4" />
                  첫 서비스 등록하기
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:shadow-md md:p-6"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:size-32">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <span
                    className={`absolute left-2 top-2 rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(service.status)}`}
                  >
                    {service.status === "Active"
                      ? "활성"
                      : service.status === "Paused"
                      ? "일시정지"
                      : "검토 중"}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 line-clamp-2 text-base font-semibold text-[#0F172A] sm:text-lg">
                    {service.title}
                  </h3>
                  
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-[#475569]">
                    <span className="font-semibold text-[#0F172A]">
                      ₩{service.price.toLocaleString()}부터
                    </span>
                    {service.rating > 0 && (
                      <>
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
                          <span className="font-medium">{service.rating}</span>
                          <span className="text-[#94A3B8]">({service.reviews})</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-1 text-[#94A3B8]">
                      <Eye className="size-4" />
                      <span>{service.views.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/dashboard/services/${service.id}/edit`}>
                      <Button
                        type="default"
                        size="small"
                        shape="round"
                        className="gap-2 border border-[#E2E8F0] bg-white text-sm font-medium text-[#475569] hover:bg-[#F1F5F9]"
                      >
                        <Edit className="size-4" />
                        <span className="hidden sm:inline">수정</span>
                      </Button>
                    </Link>
                    {service.status === "Active" && (
                      <Button
                        type="default"
                        size="small"
                        shape="round"
                        onClick={() => handlePause(service.id)}
                        className="gap-2 border border-yellow-200 bg-yellow-50 text-sm font-medium text-yellow-700 hover:bg-yellow-100"
                      >
                        <Pause className="size-4" />
                        <span className="hidden sm:inline">일시정지</span>
                      </Button>
                    )}
                    <Button
                      type="default"
                      size="small"
                      shape="round"
                      onClick={() => handleDelete(service.id)}
                      className="gap-2 border border-red-200 bg-red-50 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="size-4" />
                      <span className="hidden sm:inline">삭제</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button - Mobile */}
      <Link
        href="/dashboard/services/new"
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#2E5E99] text-white shadow-lg transition-all hover:scale-110 hover:bg-[#1d4673] hover:shadow-xl lg:hidden"
        aria-label="새 서비스 등록"
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
};



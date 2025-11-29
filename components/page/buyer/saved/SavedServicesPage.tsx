"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Clock, Search, X } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

interface SavedService {
  id: string;
  title: string;
  seller: string;
  sellerAvatar: string;
  rating: number;
  reviews: number;
  price: number;
  delivery: string;
  thumbnail: string;
  savedAt: string;
}

export const SavedServicesPage = () => {
  useBodyClass("dashboard-page");
  const [savedServices, setSavedServices] = useState<SavedService[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load saved services from localStorage
    const saved = localStorage.getItem("savedServices");
    if (saved) {
      try {
        setSavedServices(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved services:", e);
      }
    }
  }, []);

  const handleRemove = (serviceId: string) => {
    const updated = savedServices.filter((s) => s.id !== serviceId);
    setSavedServices(updated);
    localStorage.setItem("savedServices", JSON.stringify(updated));
  };

  const filteredServices = savedServices.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock data if empty
  const displayServices =
    filteredServices.length > 0
      ? filteredServices
      : [
          {
            id: "svc-1",
            title: "프리미엄 로고 디자인",
            seller: "김디자인",
            sellerAvatar:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
            rating: 4.9,
            reviews: 127,
            price: 250000,
            delivery: "5일",
            thumbnail: "https://via.placeholder.com/320x240?text=Service+1",
            savedAt: "2024-01-10",
          },
        ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">저장된 서비스</h1>
          <p className="mt-1 text-sm text-[#475569]">나중에 다시 보고 싶은 서비스를 저장해두세요</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="저장된 서비스 검색..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-10 py-3 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
          </div>
        </div>

        {/* Services Grid */}
        {displayServices.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#CBD5F5] bg-white px-6 py-16 text-center">
            <Heart className="mx-auto mb-4 size-12 text-[#94A3B8]" />
            <p className="text-lg font-semibold text-[#475569]">저장된 서비스가 없습니다.</p>
            <p className="mt-2 text-sm text-[#94A3B8]">서비스를 찾아 하트 버튼을 눌러 저장해보세요.</p>
            <Link href="/search" className="mt-4 inline-block">
              <Button
                type="primary"
                shape="round"
                className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 py-2 text-sm font-semibold text-white"
              >
                서비스 찾아보기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(46,94,153,0.2)]"
              >
                <Link href={`/services/${service.id}`} className="block">
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={service.thumbnail}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemove(service.id);
                      }}
                      className="absolute right-3 top-3 rounded-full bg-red-500 p-2.5 text-white shadow-lg transition-all hover:scale-110 hover:bg-red-600"
                      aria-label="저장 해제"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                          <span className="text-xs font-bold text-[#0F172A]">{service.rating}</span>
                          <span className="text-xs text-[#94A3B8]">({service.reviews})</span>
                        </div>
                      </div>
                      <h3 className="line-clamp-2 text-base font-bold text-[#0F172A] leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={service.sellerAvatar}
                        alt={service.seller}
                        width={24}
                        height={24}
                        className="size-6 rounded-full object-cover ring-2 ring-white"
                      />
                      <span className="text-sm font-semibold text-[#0F172A]">{service.seller}</span>
                      <span className="text-[#CBD5F5]">•</span>
                      <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                        <Clock className="size-3" />
                        <span>{service.delivery}</span>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                      <div>
                        <p className="text-xs text-[#94A3B8]">시작가</p>
                        <p className="text-xl font-bold text-[#0F172A]">₩{service.price.toLocaleString()}</p>
                      </div>
                      <Button
                        type="primary"
                        size="small"
                        shape="round"
                        className="!bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                      >
                        주문하기
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};



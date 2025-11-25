"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Clock, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

interface WishlistItem {
  id: string;
  title: string;
  seller: string;
  sellerAvatar: string;
  level: string;
  rating: number;
  reviews: number;
  price: number;
  delivery: string;
  thumbnail: string;
  category: string;
}

const mockWishlist: WishlistItem[] = [
  {
    id: "wish-1",
    title: "프리미엄 로고 디자인",
    seller: "김디자인",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    level: "Expert",
    rating: 4.9,
    reviews: 127,
    price: 250000,
    delivery: "5일",
    thumbnail: "https://via.placeholder.com/320x240?text=Service+1",
    category: "디자인 & 브랜딩",
  },
  {
    id: "wish-2",
    title: "브랜드 아이덴티티 패키지",
    seller: "박브랜딩",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    level: "Gold",
    rating: 4.8,
    reviews: 89,
    price: 350000,
    delivery: "7일",
    thumbnail: "https://via.placeholder.com/320x240?text=Service+2",
    category: "디자인 & 브랜딩",
  },
  {
    id: "wish-3",
    title: "상세페이지 디자인",
    seller: "이상세",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    level: "Silver",
    rating: 4.7,
    reviews: 203,
    price: 180000,
    delivery: "4일",
    thumbnail: "https://via.placeholder.com/320x240?text=Service+3",
    category: "디자인 & 브랜딩",
  },
];

export const WishlistPage = () => {
  useBodyClass("dashboard-page");
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">위시리스트</h1>
          <p className="mt-1 text-sm text-[#475569]">관심 서비스 모아보기</p>
        </div>

        {/* Wishlist Grid */}
        {wishlist.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#CBD5F5] bg-white px-6 py-16 text-center">
            <Heart className="mx-auto size-12 text-[#94A3B8]" />
            <p className="mt-4 text-lg font-semibold text-[#475569]">위시리스트가 비어있습니다.</p>
            <p className="mt-2 text-sm text-[#94A3B8]">관심 있는 서비스를 위시리스트에 추가해보세요.</p>
            <Link href="/buyer-dashboard" className="mt-4 inline-block">
              <Button
                type="primary"
                size="large"
                shape="round"
                className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-6 text-sm font-semibold text-white"
              >
                <ShoppingBag className="size-4" />
                서비스 둘러보기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(46,94,153,0.2)]"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button
                    type="button"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/95 p-2.5 text-red-500 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                    aria-label="위시리스트에서 제거"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                        {item.level}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                        <span className="text-xs font-bold text-[#0F172A]">{item.rating}</span>
                        <span className="text-xs text-[#94A3B8]">({item.reviews})</span>
                      </div>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold text-[#0F172A] leading-tight">{item.title}</h3>
                    <p className="mt-1 text-xs text-[#94A3B8]">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.sellerAvatar}
                      alt={item.seller}
                      width={24}
                      height={24}
                      className="size-6 rounded-full object-cover ring-2 ring-white"
                    />
                    <span className="text-sm font-semibold text-[#0F172A]">{item.seller}</span>
                    <span className="text-[#CBD5F5]">•</span>
                    <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                      <Clock className="size-3" />
                      <span>{item.delivery}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                    <div>
                      <p className="text-xs text-[#94A3B8]">시작가</p>
                      <p className="text-xl font-bold text-[#0F172A]">₩{item.price.toLocaleString()}</p>
                    </div>
                    <Button
                      type="primary"
                      size="small"
                      shape="round"
                      className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                    >
                      상담하기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};




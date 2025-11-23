"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Filter, Star, Heart, Sparkles, TrendingUp, Clock, Award, X } from "lucide-react";
import { Button } from "@/components/shared/common";

const categories = [
  { id: "design", label: "디자인", icon: "🎨", color: "from-purple-500 to-pink-500" },
  { id: "tech", label: "개발", icon: "💻", color: "from-blue-500 to-cyan-500" },
  { id: "translation", label: "번역", icon: "🈯️", color: "from-green-500 to-emerald-500" },
  { id: "marketing", label: "마케팅", icon: "📈", color: "from-orange-500 to-red-500" },
  { id: "video", label: "영상", icon: "🎬", color: "from-indigo-500 to-purple-500" },
  { id: "writing", label: "글쓰기", icon: "✍️", color: "from-yellow-500 to-amber-500" },
];

const featuredServices = Array.from({ length: 5 }).map((_, index) => ({
  id: `featured-${index}`,
  title: "프리미엄 로고 디자인",
  seller: "김디자인",
  level: "Expert",
  rating: 4.9,
  price: 250000,
  delivery: "5일",
  thumbnail: `https://via.placeholder.com/320x240?text=Service+${index + 1}`,
  reviews: 127,
  badge: index === 0 ? "인기" : index === 1 ? "신규" : null,
}));

const popularServices = Array.from({ length: 6 }).map((_, index) => ({
  id: `popular-${index}`,
  title: "브랜드 아이덴티티 패키지",
  seller: "박브랜딩",
  level: "Gold",
  rating: 4.8,
  price: 350000,
  delivery: "7일",
  thumbnail: `https://via.placeholder.com/320x240?text=Popular+${index + 1}`,
  reviews: 89,
  badge: index === 0 ? "best" : index === 1 ? "pro" : null,
}));

const recommendedServices = Array.from({ length: 6 }).map((_, index) => ({
  id: `recommend-${index}`,
  title: "상세페이지 디자인",
  seller: "이상세",
  level: "Silver",
  rating: 4.7,
  price: 180000,
  delivery: "4일",
  thumbnail: `https://via.placeholder.com/320x240?text=Recommend+${index + 1}`,
  reviews: 203,
  badge: index === 0 ? "new" : null,
}));

interface ServiceCardProps {
  service: (typeof featuredServices)[number];
  onWishlistToggle?: (serviceId: string) => void;
  isInWishlist?: boolean;
}

const ServiceCard = ({ service, onWishlistToggle, isInWishlist = false }: ServiceCardProps) => {
  const router = useRouter();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle?.(service.id);
  };

  const handleConsultClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to service detail or start conversation
    router.push(`/services/${service.id}`);
  };

  return (
    <Link href={`/services/${service.id}`} className="block">
      <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(46,94,153,0.2)]">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {service.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-[#2E5E99] px-3 py-1 text-xs font-bold text-white shadow-lg">
              {service.badge}
            </span>
          )}
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`absolute right-3 top-3 rounded-full p-2.5 shadow-lg backdrop-blur-sm transition-all hover:scale-110 ${
              isInWishlist
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/95 text-[#2E5E99] hover:bg-white"
            }`}
            aria-label="위시리스트"
          >
            <Heart className={`size-4 ${isInWishlist ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                {service.level}
              </span>
              <div className="flex items-center gap-1">
                <Star className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-xs font-bold text-[#0F172A]">{service.rating}</span>
                <span className="text-xs text-[#94A3B8]">({service.reviews})</span>
              </div>
            </div>
            <h3 className="line-clamp-2 text-lg font-bold text-[#0F172A] leading-tight">{service.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c"
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
              onClick={handleConsultClick}
              className="!bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              상담하기
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const BuyerDashboardPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleWishlistToggle = (serviceId: string) => {
    setWishlistItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const handleRefreshRecommendations = () => {
    // Refresh AI recommendations
    window.location.reload();
  };

  return (
    <div className="space-y-10">
      {/* Search Section */}
      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <div className="group flex flex-1 items-center gap-3 rounded-2xl border-2 border-[#E2E8F0] bg-white px-5 py-4 shadow-lg transition-all focus-within:border-[#2E5E99] focus-within:shadow-xl">
          <Search className="size-5 text-[#94A3B8] transition-colors group-focus-within:text-[#2E5E99]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="서비스나 전문가를 검색해보세요..."
            className="flex-1 border-none bg-transparent text-sm font-medium text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
          />
          <Button
            type="primary"
            size="small"
            shape="round"
            className="!bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] text-xs font-bold text-white shadow-md hover:shadow-lg"
          >
            검색
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E2E8F0] bg-white px-5 py-4 text-sm font-bold text-[#475569] shadow-lg transition-all hover:border-[#2E5E99] hover:bg-[#F8FAFC] hover:shadow-xl"
        >
          <Filter className="size-4" />
          필터
        </button>
      </form>

      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#0F172A]">필터</h3>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">가격 범위</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="최소"
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="최대"
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">배송 시간</label>
              <select className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none">
                <option value="">전체</option>
                <option value="1-3">1-3일</option>
                <option value="4-7">4-7일</option>
                <option value="8+">8일 이상</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">평점</label>
              <select className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none">
                <option value="">전체</option>
                <option value="4.5+">4.5점 이상</option>
                <option value="4.0+">4.0점 이상</option>
                <option value="3.5+">3.5점 이상</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="default"
              size="small"
              shape="round"
              onClick={() => setShowFilters(false)}
              className="border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC]"
            >
              초기화
            </Button>
            <Button
              type="primary"
              size="small"
              shape="round"
              onClick={() => {
                setShowFilters(false);
                router.push("/search");
              }}
              className="bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white"
            >
              적용하기
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-10">
        {/* Categories */}
        <section className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-[#2E5E99]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">카테고리</h2>
            </div>
            <Link
              href="/search"
              className="text-sm font-bold text-[#2E5E99] transition-colors hover:text-[#1d4673] hover:underline"
            >
              전체보기 →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.id)}
                className="group relative flex flex-col items-center overflow-hidden rounded-3xl border-2 border-[#E2E8F0] bg-white p-5 text-center shadow-md transition-all hover:-translate-y-2 hover:border-[#2E5E99] hover:shadow-xl"
              >
                <div className={`mb-3 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                  {category.icon}
                </div>
                <span className="text-sm font-bold text-[#0F172A]">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Services */}
        <section className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-[#2E5E99]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">추천 서비스</h2>
              <span className="rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-3 py-1 text-xs font-bold text-white">
                AI 추천
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#475569]">
              <span className="hidden sm:inline">스와이프해서 더 보기</span>
              <TrendingUp className="size-4 text-[#2E5E99]" />
            </div>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {featuredServices.map((service) => (
              <div key={service.id} className="w-80 shrink-0">
                <ServiceCard
                  service={service}
                  onWishlistToggle={handleWishlistToggle}
                  isInWishlist={wishlistItems.has(service.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Services */}
        <section className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-[#2E5E99]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">이번 주 인기 서비스</h2>
            </div>
            <Link
              href="/search?sort=popular"
              className="text-sm font-bold text-[#2E5E99] transition-colors hover:text-[#1d4673] hover:underline"
            >
              더 보기 →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onWishlistToggle={handleWishlistToggle}
                isInWishlist={wishlistItems.has(service.id)}
              />
            ))}
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-[#2E5E99]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">AI 기반 맞춤 추천</h2>
            </div>
            <button
              type="button"
              onClick={handleRefreshRecommendations}
              className="flex items-center gap-2 text-sm font-bold text-[#2E5E99] transition-colors hover:text-[#1d4673] hover:underline"
            >
              새로고침
              <Sparkles className="size-4" />
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onWishlistToggle={handleWishlistToggle}
                isInWishlist={wishlistItems.has(service.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};


"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Award, 
  MessageSquare, 
  Briefcase,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
  ArrowLeft,
  Clock,
  Users,
  TrendingUp,
  Share2,
  Heart,
  Copy,
  Check,
  Eye,
  Grid3x3,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/shared/common";
import type { Seller, Portfolio } from "@/hooks/useSearchResult";

// Mock seller data
const getSellerData = (id: string): Seller | null => {
  const sellers: Record<string, Seller> = {
    "seller-1": {
      id: "seller-1",
      name: "김디자인",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
      level: "Pro",
      rating: 4.9,
      reviews: 127,
      orders: 321,
      specialties: ["로고 디자인", "브랜딩", "명함 디자인", "패키지 디자인"],
      priceRange: "₩100,000 - ₩500,000",
      responseTime: "1시간 이내",
      badge: "pro",
    },
    "seller-2": {
      id: "seller-2",
      name: "박브랜딩",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
      level: "Level 2",
      rating: 4.8,
      reviews: 89,
      orders: 245,
      specialties: ["UI/UX 디자인", "웹 디자인", "앱 디자인"],
      priceRange: "₩200,000 - ₩700,000",
      responseTime: "2시간 이내",
      badge: "verified",
    },
  };

  return sellers[id] || sellers["seller-1"];
};

// Mock portfolio data for seller
const getSellerPortfolios = (sellerId: string, sellerName: string, sellerAvatar: string): Portfolio[] => {
  const portfolios: Portfolio[] = [
    {
      id: "portfolio-1",
      title: "프리미엄 로고 디자인 포트폴리오",
      description: "다양한 산업 분야의 로고 디자인 작업물을 보여드립니다. 각 프로젝트마다 고객의 브랜드 정체성을 반영한 디자인을 제안합니다.",
      thumb: "https://via.placeholder.com/640x480?text=Logo+Design+1",
      sellerName,
      sellerAvatar,
      views: 1250,
      likes: 89,
      category: "로고 디자인",
      tags: ["로고", "브랜딩", "CI/BI"],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "portfolio-2",
      title: "브랜드 아이덴티티 디자인",
      description: "완성도 높은 브랜드 아이덴티티 시스템을 통해 통일된 브랜드 경험을 제공합니다.",
      thumb: "https://via.placeholder.com/640x480?text=Brand+Identity",
      sellerName,
      sellerAvatar,
      views: 980,
      likes: 67,
      category: "브랜딩",
      tags: ["브랜드", "아이덴티티", "네이밍"],
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "portfolio-3",
      title: "패키지 디자인 컬렉션",
      description: "제품의 특성을 살린 패키지 디자인으로 시각적 임팩트를 극대화합니다.",
      thumb: "https://via.placeholder.com/640x480?text=Package+Design",
      sellerName,
      sellerAvatar,
      views: 750,
      likes: 45,
      category: "패키지 디자인",
      tags: ["패키지", "라벨", "제품 디자인"],
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "portfolio-4",
      title: "명함 디자인 컬렉션",
      description: "세련되고 전문적인 명함 디자인으로 비즈니스 이미지를 향상시킵니다.",
      thumb: "https://via.placeholder.com/640x480?text=Business+Card",
      sellerName,
      sellerAvatar,
      views: 620,
      likes: 38,
      category: "명함 디자인",
      tags: ["명함", "비즈니스", "프린트"],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return portfolios;
};

// Mock services data
const getSellerServices = (sellerId: string) => {
  return [
    {
      id: "service-1",
      title: "프리미엄 로고 디자인",
      price: "₩250,000",
      delivery: "5일",
      rating: 5.0,
      reviews: 89,
      image: "https://via.placeholder.com/320x240?text=Service+1",
    },
    {
      id: "service-2",
      title: "브랜드 아이덴티티 패키지",
      price: "₩680,000",
      delivery: "7일",
      rating: 4.9,
      reviews: 45,
      image: "https://via.placeholder.com/320x240?text=Service+2",
    },
    {
      id: "service-3",
      title: "명함 디자인",
      price: "₩80,000",
      delivery: "3일",
      rating: 5.0,
      reviews: 127,
      image: "https://via.placeholder.com/320x240?text=Service+3",
    },
  ];
};

// Mock reviews data
const getSellerReviews = () => {
  return [
    {
      id: 1,
      clientName: "이회사",
      clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTVd1i-h3YbRq0U6Oq10uVimhqpK06nACgXpgUpUNMgijFYz19n4PTG4IyYSoRYuTFYRjs6XKRvDFBIYiqKwh87fsQ6UDzh0x3bCq_S32zYts67An3tgo5zjKsdhqUV9yjskJ5XCLi0LpAhLvNRy_d6mP2lm_WaSKllWtEZTLNqm3Lk3-r4FTg8m7p1DdpwJDoniBuNYSn0wG2yX8-03C6woquJgcfDJA0iRNhm62Nv-3eNncmysvyBFk9jqelauI_HTgl_z-hoAk",
      rating: 5,
      comment: "정말 훌륭한 로고 디자인이었습니다! 브랜드 정체성을 완벽하게 반영해주셨어요.",
      date: "2주 전",
      project: "프리미엄 로고 디자인",
    },
    {
      id: 2,
      clientName: "박스타트업",
      clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyupedfv9FMFlwb31DM3gXLjeoFctkvQVINAmk_l4rsBfu-yJCB2UWRh_Lxj-YI1w0TXCZiRfxr4eGytsQpRuhJ-9mmrNjjXCER5TaDIM0_wQBYzrDAKgtu2_-GIT8VD2U0A5-8HXdGawv5FcIYU2fyQ66ZNjSjptHCty2Gwn2_aEd4prbSnkmc-pYSOZW2pGpJ8NidjHcp9is2yVECa2b6EStgu-8QNIynhPlf4fj6p2iS5U2gM4zp2chYTJoZ6vctJDg13o9XTg",
      rating: 5,
      comment: "빠른 응답과 전문적인 디자인으로 만족스러운 결과를 받았습니다.",
      date: "1개월 전",
      project: "브랜드 아이덴티티 패키지",
    },
  ];
};

export const SellerProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const sellerId = params.id as string;
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const seller = useMemo(() => {
    return getSellerData(sellerId);
  }, [sellerId]);

  const portfolios = useMemo(() => {
    if (!seller) return [];
    return getSellerPortfolios(seller.id, seller.name, seller.avatar);
  }, [seller]);

  const services = useMemo(() => {
    if (!seller) return [];
    return getSellerServices(seller.id);
  }, [seller]);

  const reviews = useMemo(() => {
    return getSellerReviews();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && seller) {
      const favorites = JSON.parse(localStorage.getItem("favorite_sellers") || "[]");
      setIsFavorited(favorites.includes(seller.id));
    }
  }, [seller]);

  const handleContact = () => {
    router.push(`/messages?seller=${sellerId}`);
  };

  const handleViewServices = () => {
    router.push(`/search?type=sellers&seller=${sellerId}`);
  };

  const handleShare = async () => {
    if (!seller) return;
    const url = `${window.location.origin}/seller/${seller.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFavorite = () => {
    if (!seller) return;
    const favorites = JSON.parse(localStorage.getItem("favorite_sellers") || "[]");
    if (isFavorited) {
      const updated = favorites.filter((id: string) => id !== seller.id);
      localStorage.setItem("favorite_sellers", JSON.stringify(updated));
      setIsFavorited(false);
    } else {
      favorites.push(seller.id);
      localStorage.setItem("favorite_sellers", JSON.stringify(favorites));
      setIsFavorited(true);
    }
  };

  if (!seller) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A]">전문가를 찾을 수 없습니다</h1>
          <Link href="/" className="mt-4 text-[#2E5E99] hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#2E5E99]"
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <section className="border-b border-[#E2E8F0] bg-gradient-to-b from-white to-[#F8FAFC] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                {seller.badge === "verified" && (
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-1 shadow-md">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-4xl font-bold text-[#0F172A]">{seller.name}</h1>
                  {seller.badge && seller.badge !== "verified" && (
                    <span className="rounded-full bg-[#E9EEF8] px-3 py-1 text-sm font-semibold text-[#2E5E99]">
                      {seller.badge === "pro" ? "PRO" : seller.badge === "best" ? "BEST" : ""}
                    </span>
                  )}
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-[#E9EEF8] px-4 py-2 text-sm font-semibold text-[#2E5E99]">
                    {seller.level}
                  </span>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-lg font-bold text-[#0F172A]">{seller.rating.toFixed(1)}</span>
                    <span className="text-sm text-[#94A3B8]">({seller.reviews.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Briefcase className="h-4 w-4" />
                    <span>완료 주문</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F172A]">{seller.orders.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Users className="h-4 w-4" />
                    <span>리뷰</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F172A]">{seller.reviews.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Clock className="h-4 w-4" />
                    <span>응답 시간</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F172A]">{seller.responseTime}</div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <TrendingUp className="h-4 w-4" />
                    <span>가격 범위</span>
                  </div>
                  <div className="text-lg font-bold text-[#0F172A]">{seller.priceRange}</div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">전문 분야</h3>
                <div className="flex flex-wrap gap-2">
                  {seller.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-[#E9EEF8] px-4 py-2 text-sm font-medium text-[#2E5E99]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleContact}
                  className="bg-[#2E5E99] text-white hover:bg-[#1d4673]"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  문의하기
                </Button>
                <Button
                  onClick={handleViewServices}
                  type="default"
                  className="border-[#2E5E99] text-[#2E5E99] hover:bg-[#E9EEF8]"
                >
                  서비스 보기
                </Button>
                <Button
                  onClick={handleShare}
                  type="default"
                  className="border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Share2 className="mr-2 h-4 w-4" />
                      공유하기
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleFavorite}
                  type="default"
                  className={`border-[#E2E8F0] hover:bg-[#F8FAFC] ${
                    isFavorited ? "text-red-500 border-red-200" : "text-[#475569]"
                  }`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                  {isFavorited ? "저장됨" : "저장하기"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="border-b border-[#E2E8F0] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">포트폴리오</h2>
              <p className="mt-1 text-sm text-[#475569]">작업한 프로젝트를 확인해보세요</p>
            </div>
            <Link
              href={`/search?type=portfolios&seller=${sellerId}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#2E5E99] hover:text-[#1d4673]"
            >
              전체 보기
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          {portfolios.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-12 text-center">
              <Grid3x3 className="mx-auto mb-4 h-12 w-12 text-[#94A3B8]" />
              <p className="text-sm text-[#475569]">등록된 포트폴리오가 없습니다.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((portfolio) => (
                <Link
                  key={portfolio.id}
                  href={`/portfolio/${portfolio.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={portfolio.thumb}
                      alt={portfolio.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1 rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-white text-xs">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{portfolio.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-white text-xs">
                        <Heart className="h-3.5 w-3.5" />
                        <span>{portfolio.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-5">
                    <div>
                      <h3 className="mb-1 line-clamp-2 text-base font-semibold text-[#0F172A]">
                        {portfolio.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-[#475569]">{portfolio.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="border-b border-[#E2E8F0] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">서비스</h2>
              <p className="mt-1 text-sm text-[#475569]">제공하는 서비스를 확인해보세요</p>
            </div>
            <Link
              href={`/search?type=gigs&seller=${sellerId}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#2E5E99] hover:text-[#1d4673]"
            >
              전체 보기
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <h3 className="text-base font-semibold text-[#0F172A]">{service.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold text-[#0F172A]">{service.rating.toFixed(1)}</span>
                      <span className="text-xs text-[#94A3B8]">({service.reviews})</span>
                    </div>
                    <div className="text-lg font-bold text-[#2E5E99]">{service.price}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>배송: {service.delivery}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="border-b border-[#E2E8F0] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F172A]">리뷰</h2>
            <p className="mt-1 text-sm text-[#475569]">고객들의 후기를 확인해보세요</p>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <div className="mb-4 flex items-start gap-4">
                  <Image
                    src={review.clientAvatar}
                    alt={review.clientName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">{review.clientName}</h4>
                        <p className="text-xs text-[#94A3B8]">{review.project}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#475569]">{review.comment}</p>
                    <p className="mt-2 text-xs text-[#94A3B8]">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};



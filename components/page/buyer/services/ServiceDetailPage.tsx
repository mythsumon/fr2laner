"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  CheckCircle2,
  MessageSquare,
  Share2,
  Flag,
  User,
  Award,
  TrendingUp,
  Edit,
  Settings,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { useAuth } from "@/hooks/useAuth";
import { ReportModal } from "@/components/shared/ReportModal";

interface Review {
  id: string;
  serviceId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  sellerId: string;
  sellerName: string;
  rating: number;
  comment: string;
  status: "visible" | "hidden";
  createdAt: string;
  orderId?: string;
  images?: string[];
}

// Mock service data
const mockService = {
  id: "svc-1",
  title: "프리미엄 로고 디자인",
  seller: {
    id: "expert-1", // Seller ID for ownership check
    name: "김디자인",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    level: "Expert",
    rating: 4.9,
    reviews: 127,
    responseTime: "1시간 이내",
    deliveryRate: "100%",
    orders: 342,
  },
  rating: 4.9,
  reviews: 127,
  delivery: "5일",
  description: `프로페셔널한 로고 디자인 서비스를 제공합니다. 브랜드의 정체성을 반영한 독창적이고 기억에 남는 로고를 제작해드립니다.

주요 특징:
• 무제한 수정 가능
• 고해상도 파일 제공 (AI, EPS, PNG, JPG)
• 다양한 컬러 변형 제공
• 브랜드 가이드라인 포함
• 빠른 배송 (5일 이내)

작업 프로세스:
1. 브랜드 컨셉 및 요구사항 논의
2. 초안 3개 제공
3. 피드백 반영 및 수정
4. 최종 파일 전달

포트폴리오를 확인하시고, 맞는 스타일인지 확인해주세요.`,
  images: [
    "https://via.placeholder.com/800x600?text=Service+Image+1",
    "https://via.placeholder.com/800x600?text=Service+Image+2",
    "https://via.placeholder.com/800x600?text=Service+Image+3",
  ],
  packages: [
    {
      id: "basic",
      name: "Basic",
      description: "기본 로고 디자인",
      delivery: "3일",
      revisions: 1,
      price: 150000,
      features: ["로고 디자인 1개", "PNG, JPG 파일", "기본 수정 1회"],
    },
    {
      id: "standard",
      name: "Standard",
      description: "표준 패키지 (추천)",
      delivery: "5일",
      revisions: 3,
      price: 250000,
      features: ["로고 디자인 1개", "AI, EPS, PNG, JPG 파일", "수정 3회", "컬러 변형 2개"],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      description: "프리미엄 패키지",
      delivery: "7일",
      revisions: 999,
      price: 350000,
      features: [
        "로고 디자인 1개",
        "모든 파일 형식",
        "무제한 수정",
        "컬러 변형 5개",
        "브랜드 가이드라인",
        "명함 디자인 포함",
      ],
    },
  ],
  faqs: [
    {
      question: "수정은 몇 번까지 가능한가요?",
      answer: "패키지에 따라 다릅니다. Basic은 1회, Standard는 3회, Premium은 무제한 수정이 가능합니다.",
    },
    {
      question: "파일 형식은 어떤 것들이 제공되나요?",
      answer: "패키지에 따라 다르지만, 최소 PNG와 JPG는 제공되며, Premium 패키지는 AI, EPS 등 모든 형식을 제공합니다.",
    },
    {
      question: "배송 기간은 어떻게 되나요?",
      answer: "Basic은 3일, Standard는 5일, Premium은 7일 소요됩니다. 급하신 경우 별도 문의 부탁드립니다.",
    },
  ],
};

export const ServiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const serviceId = params.id as string;
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState<{
    type: "service" | "review";
    targetId: string;
    targetName: string;
  } | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canWriteReview, setCanWriteReview] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        try {
          const allReviews: Review[] = JSON.parse(storedReviews);
          const serviceReviews = allReviews.filter(
            (r) => r.serviceId === serviceId && r.status === "visible"
          );
          setReviews(serviceReviews);
        } catch (e) {
          console.warn("Failed to parse reviews from localStorage", e);
        }
      }

      // Check if user can write review (has completed order for this service)
      if (isAuthenticated && user?.role === "client") {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
          try {
            const orders: any[] = JSON.parse(storedOrders);
            const completedOrder = orders.find(
              (o) => o.serviceId === serviceId && o.status === "completed" && o.buyerId === user.id
            );
            // Check if review already exists
            const existingReview = reviews.find((r) => r.buyerId === user.id && r.serviceId === serviceId);
            setCanWriteReview(!!completedOrder && !existingReview);
          } catch (e) {
            console.warn("Failed to parse orders from localStorage", e);
          }
        }
      }
    }
  }, [serviceId, isAuthenticated, user, reviews.length]);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : mockService.rating;

  // Check if current user is the service owner
  const isServiceOwner = isAuthenticated && user?.role === "expert" && user?.id === mockService.seller.id;
  const isAdmin = isAuthenticated && user?.role === "admin";

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleOrder = () => {
    if (!isAuthenticated) {
      const currentPath = `/services/${params.id}`;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (user?.role !== "client") {
      return; // Should not happen due to button visibility
    }

    if (!selectedPackage) {
      alert("패키지를 선택해주세요.");
      return;
    }
    router.push(`/client/orders/new?service=${params.id}&package=${selectedPackage}`);
  };

  const handleContact = () => {
    if (!isAuthenticated) {
      const currentPath = `/services/${params.id}`;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    // Create or navigate to conversation with seller
    const conversationId = `conv-${mockService.seller.id}`;
    router.push(`/client/messages/${conversationId}`);
  };

  const handleEditService = () => {
    router.push(`/expert/services/${params.id}/edit`);
  };

  const handleAdminManage = () => {
    router.push(`/admin/services/${params.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#F0F7FF] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#2E5E99]"
          >
            <ArrowLeft className="size-4" />
            뒤로가기
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToWishlist}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                isInWishlist
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              <Heart className={`size-4 ${isInWishlist ? "fill-current" : ""}`} />
              위시리스트
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition-all hover:bg-[#F8FAFC]"
            >
              <Share2 className="size-4" />
              공유
            </button>
            <button
              type="button"
              onClick={() => {
                setReportModalData({
                  type: "service",
                  targetId: mockService.id,
                  targetName: mockService.title,
                });
                setIsReportModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition-all hover:bg-[#F8FAFC]"
              title="신고하기"
            >
              <Flag className="size-4" />
              신고
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Title & Seller Info */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h1 className="mb-4 text-3xl font-bold text-[#0F172A]">{mockService.title}</h1>
              <div className="flex items-center gap-4">
                <Link href={`/seller/${mockService.seller.name}`} className="flex items-center gap-3">
                  <Image
                    src={mockService.seller.avatar}
                    alt={mockService.seller.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover ring-2 ring-[#E2E8F0]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">{mockService.seller.name}</span>
                      <span className="rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-2 py-0.5 text-[10px] font-bold text-white">
                        {mockService.seller.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <Star className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-semibold text-[#0F172A]">{mockService.rating}</span>
                      <span>({mockService.reviews}개 리뷰)</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Service Images */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={mockService.images[selectedImage]}
                  alt={mockService.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2">
                {mockService.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? "border-[#2E5E99] ring-2 ring-[#2E5E99]/20"
                        : "border-[#E2E8F0] hover:border-[#2E5E99]"
                    }`}
                  >
                    <Image src={image} alt={`${mockService.title} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#0F172A]">서비스 설명</h2>
              <div className="prose prose-sm max-w-none text-[#475569]">
                {mockService.description.split("\n").map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#0F172A]">자주 묻는 질문</h2>
              <div className="space-y-4">
                {mockService.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-[#E2E8F0] pb-4 last:border-0 last:pb-0">
                    <h3 className="mb-2 font-semibold text-[#0F172A]">{faq.question}</h3>
                    <p className="text-sm text-[#475569]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0F172A]">리뷰</h2>
                <div className="flex items-center gap-2">
                  <Star className="size-5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-lg font-bold text-[#0F172A]">{mockService.rating}</span>
                  <span className="text-sm text-[#94A3B8]">({mockService.reviews}개 리뷰)</span>
                </div>
              </div>
              <div className="space-y-4">
                {/* Mock reviews */}
                {[
                  {
                    id: 1,
                    buyer: "김구매",
                    rating: 5,
                    comment: "정말 만족스러운 서비스였습니다! 디자인이 정말 훌륭하고 빠른 배송도 감사합니다.",
                    date: "2024-03-15",
                  },
                  {
                    id: 2,
                    buyer: "이소비",
                    rating: 4,
                    comment: "좋은 서비스였습니다. 약간의 수정이 필요했지만 빠르게 반영해주셔서 만족합니다.",
                    date: "2024-03-10",
                  },
                ].map((review) => (
                  <div key={review.id} className="border-b border-[#E2E8F0] pb-4 last:border-0 last:pb-0">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0F172A]">{review.buyer}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${
                                i < review.rating
                                  ? "fill-[#F59E0B] text-[#F59E0B]"
                                  : "text-[#E2E8F0]"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#94A3B8]">{review.date}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setReportModalData({
                            type: "review",
                            targetId: `${mockService.id}-review-${review.id}`,
                            targetName: `${review.buyer}님의 리뷰`,
                          });
                          setIsReportModalOpen(true);
                        }}
                        className="p-1 rounded hover:bg-[#F8FAFC] text-[#94A3B8] hover:text-red-500 transition-colors"
                        title="리뷰 신고하기"
                      >
                        <Flag className="size-3" />
                      </button>
                    </div>
                    <p className="text-sm text-[#475569]">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Packages & Order */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Packages */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold text-[#0F172A]">패키지 선택</h2>
                <div className="space-y-3">
                  {mockService.packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                        selectedPackage === pkg.id
                          ? "border-[#2E5E99] bg-gradient-to-br from-[#E9EEF8] to-[#F0F7FF] ring-2 ring-[#2E5E99]/20"
                          : "border-[#E2E8F0] bg-white hover:border-[#2E5E99] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0F172A]">{pkg.name}</span>
                          {pkg.popular && (
                            <span className="rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-2 py-0.5 text-[10px] font-bold text-white">
                              추천
                            </span>
                          )}
                        </div>
                        <span className="text-lg font-bold text-[#0F172A]">₩{pkg.price.toLocaleString()}</span>
                      </div>
                      <p className="mb-2 text-xs text-[#94A3B8]">{pkg.description}</p>
                      <div className="mb-2 flex items-center gap-4 text-xs text-[#475569]">
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{pkg.delivery}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          <span>수정 {pkg.revisions === 999 ? "무제한" : `${pkg.revisions}회`}</span>
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1 text-xs text-[#475569]">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="size-3 text-[#2E5E99]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                {/* Action Buttons - Role-based */}
                <div className="mt-6 space-y-2">
                  {isServiceOwner ? (
                    // Service owner - show edit button
                    <Button
                      type="primary"
                      size="large"
                      shape="round"
                      onClick={handleEditService}
                      className="w-full !bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] font-bold text-white shadow-lg"
                    >
                      <Edit className="size-4" />
                      수정하기
                    </Button>
                  ) : isAdmin ? (
                    // Admin - show manage button
                    <Button
                      type="primary"
                      size="large"
                      shape="round"
                      onClick={handleAdminManage}
                      className="w-full !bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] font-bold text-white shadow-lg"
                    >
                      <Settings className="size-4" />
                      관리 열기
                    </Button>
                  ) : (
                    // Buyer or not logged in
                    <>
                      <Button
                        type="primary"
                        size="large"
                        shape="round"
                        onClick={handleOrder}
                        disabled={!selectedPackage}
                        className="w-full !bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] font-bold text-white shadow-lg disabled:opacity-50"
                      >
                        {isAuthenticated ? "주문하기" : "로그인하고 주문하기"}
                      </Button>
                      {isAuthenticated && user?.role === "client" && (
                        <Button
                          type="default"
                          size="large"
                          shape="round"
                          onClick={handleContact}
                          className="w-full border border-[#E2E8F0] bg-white font-semibold text-[#475569] hover:bg-[#F8FAFC]"
                        >
                          <MessageSquare className="size-4" />
                          판매자에게 문의하기
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Seller Stats */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#0F172A]">판매자 정보</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">응답 시간</span>
                    <span className="font-semibold text-[#0F172A]">{mockService.seller.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">배송률</span>
                    <span className="font-semibold text-[#0F172A]">{mockService.seller.deliveryRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">주문 완료</span>
                    <span className="font-semibold text-[#0F172A]">{mockService.seller.orders}개</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">리뷰</h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-lg font-bold text-[#0F172A]">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-[#94A3B8]">({reviews.length}개 리뷰)</span>
              </div>
            </div>
            {canWriteReview && (
              <Link href={`/client/orders/new?service=${serviceId}&review=true`}>
                <Button
                  type="primary"
                  shape="round"
                  className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white"
                >
                  <Star className="size-4" />
                  리뷰 작성하기
                </Button>
              </Link>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="py-8 text-center text-[#94A3B8]">
              <p>아직 리뷰가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {review.buyerAvatar ? (
                        <Image
                          src={review.buyerAvatar}
                          alt={review.buyerName}
                          width={40}
                          height={40}
                          className="size-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-[#E2E8F0]">
                          <User className="size-5 text-[#94A3B8]" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-[#0F172A]">{review.buyerName}</div>
                        <div className="text-xs text-[#94A3B8]">{review.createdAt}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < review.rating
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "text-[#E2E8F0]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#475569]">{review.comment}</p>
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        setReportModalData({
                          type: "review",
                          targetId: review.id,
                          targetName: review.comment.substring(0, 30),
                        });
                        setIsReportModalOpen(true);
                      }}
                      className="mt-2 flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#2E5E99]"
                    >
                      <Flag className="size-3" />
                      신고
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {reportModalData && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => {
            setIsReportModalOpen(false);
            setReportModalData(null);
          }}
          type={reportModalData.type}
          targetId={reportModalData.targetId}
          targetName={reportModalData.targetName}
        />
      )}
    </div>
  );
};




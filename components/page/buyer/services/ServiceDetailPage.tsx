"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/shared/common";

// Mock service data
const mockService = {
  id: "svc-1",
  title: "프리미엄 로고 디자인",
  seller: {
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
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleOrder = () => {
    if (!selectedPackage) {
      alert("패키지를 선택해주세요.");
      return;
    }
    router.push(`/orders/new?service=${params.id}&package=${selectedPackage}`);
  };

  const handleContact = () => {
    router.push(`/buyer-messages?seller=${mockService.seller.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#F0F7FF] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/buyer-dashboard"
            className="flex items-center gap-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#2E5E99]"
          >
            <ArrowLeft className="size-4" />
            뒤로가기
          </Link>
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
              className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition-all hover:bg-[#F8FAFC]"
            >
              <Flag className="size-4" />
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

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={handleOrder}
                    disabled={!selectedPackage}
                    className="w-full !bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] font-bold text-white shadow-lg disabled:opacity-50"
                  >
                    주문하기
                  </Button>
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
      </div>
    </div>
  );
};


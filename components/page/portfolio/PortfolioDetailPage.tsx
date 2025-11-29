"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, Heart, Clock, Tag, User, Share2, Check } from "lucide-react";
import { Button } from "@/components/shared/common";
import type { Portfolio } from "@/hooks/useSearchResult";

// Mock portfolio data
const getPortfolioData = (id: string): Portfolio | null => {
  const portfolios: Record<string, Portfolio> = {
    "portfolio-1": {
      id: "portfolio-1",
      title: "프리미엄 로고 디자인 포트폴리오",
      description: "다양한 산업 분야의 로고 디자인 작업물을 보여드립니다. 각 프로젝트마다 고객의 브랜드 정체성을 반영한 디자인을 제안합니다. 최신 트렌드를 반영하면서도 브랜드의 고유한 특성을 살린 디자인으로 고객 만족도를 높였습니다.",
      thumb: "https://via.placeholder.com/1200x800?text=Logo+Design+Portfolio",
      sellerName: "김디자인",
      sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
      views: 1250,
      likes: 89,
      category: "로고 디자인",
      tags: ["로고", "브랜딩", "CI/BI", "네이밍"],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };

  return portfolios[id] || portfolios["portfolio-1"];
};

// Mock portfolio images
const getPortfolioImages = (id: string): string[] => {
  return [
    "https://via.placeholder.com/1200x800?text=Portfolio+Image+1",
    "https://via.placeholder.com/1200x800?text=Portfolio+Image+2",
    "https://via.placeholder.com/1200x800?text=Portfolio+Image+3",
    "https://via.placeholder.com/1200x800?text=Portfolio+Image+4",
  ];
};

export const PortfolioDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const portfolioId = params.id as string;
  const [isCopied, setIsCopied] = useState(false);

  const portfolio = useMemo(() => {
    return getPortfolioData(portfolioId);
  }, [portfolioId]);

  const images = useMemo(() => {
    return getPortfolioImages(portfolioId);
  }, [portfolioId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)}주 전`;
    } else {
      return `${Math.floor(diffDays / 30)}개월 전`;
    }
  };

  const handleShare = async () => {
    if (!portfolio) return;
    const url = `${window.location.origin}/portfolio/${portfolio.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A]">포트폴리오를 찾을 수 없습니다</h1>
          <Link href="/" className="mt-4 text-[#2E5E99] hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#2E5E99]"
            >
              <ArrowLeft className="h-4 w-4" />
              홈으로 돌아가기
            </Link>
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
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-[#0F172A]">{portfolio.title}</h1>
          
          {/* Meta Info */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-[#475569]">
            <Link
              href={`/seller/${portfolio.sellerName}`}
              className="flex items-center gap-2 hover:text-[#2E5E99]"
            >
              <Image
                src={portfolio.sellerAvatar}
                alt={portfolio.sellerName}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-semibold">{portfolio.sellerName}</span>
            </Link>
            <span className="text-[#94A3B8]">•</span>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{portfolio.views.toLocaleString()}</span>
            </div>
            <span className="text-[#94A3B8]">•</span>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{portfolio.likes.toLocaleString()}</span>
            </div>
            <span className="text-[#94A3B8]">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(portfolio.createdAt)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[#E9EEF8] px-4 py-2 text-sm font-medium text-[#2E5E99]">
              <Tag className="h-4 w-4" />
              {portfolio.category}
            </span>
            {portfolio.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-8 text-lg leading-relaxed text-[#475569]">{portfolio.description}</p>
        </div>

        {/* Portfolio Images */}
        <div className="space-y-6">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={image}
                alt={`${portfolio.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Seller Profile Link */}
        <div className="mt-12 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={portfolio.sellerAvatar}
                alt={portfolio.sellerName}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-[#94A3B8]">작성자</p>
                <Link
                  href={`/seller/${portfolio.sellerName}`}
                  className="text-lg font-semibold text-[#0F172A] hover:text-[#2E5E99]"
                >
                  {portfolio.sellerName}
                </Link>
              </div>
            </div>
            <Link
              href={`/seller/${portfolio.sellerName}`}
              className="rounded-lg bg-[#2E5E99] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]"
            >
              프로필 보기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};


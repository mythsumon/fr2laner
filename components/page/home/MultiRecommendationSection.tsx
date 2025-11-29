"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { useHomeData } from "@/contexts/HomeDataContext";

// ===========================================
// 📦 DATA MODELS
// ===========================================

type ServiceCard = {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceLabel: string;
  seller: { name: string; avatarUrl: string };
};

// ===========================================
// 📦 DATA ARRAYS (각 3개씩, 총 9개)
// ===========================================

const RECO_STARTUP: ServiceCard[] = [
  {
    id: "startup-1",
    category: "디자인",
    title: "명함 디자인",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    rating: 4.9,
    reviewCount: 127,
    priceLabel: "₩45,000부터",
    seller: {
      name: "디자인스튜디오",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
  },
  {
    id: "startup-2",
    category: "개발",
    title: "반응형 홈페이지 제작",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    rating: 4.8,
    reviewCount: 342,
    priceLabel: "₩850,000부터",
    seller: {
      name: "웹개발마스터",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  },
  {
    id: "startup-3",
    category: "개발",
    title: "스타트업 MVP 앱 개발",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    rating: 5.0,
    reviewCount: 89,
    priceLabel: "₩3,500,000부터",
    seller: {
      name: "앱개발전문가",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  },
];

const RECO_DESIGNERS: ServiceCard[] = [
  {
    id: "designer-1",
    category: "브랜딩",
    title: "브랜드 로고 디자인",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    rating: 4.9,
    reviewCount: 256,
    priceLabel: "₩120,000부터",
    seller: {
      name: "로고디자이너",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
  {
    id: "designer-2",
    category: "인쇄물",
    title: "상세페이지/전단지",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
    rating: 4.8,
    reviewCount: 198,
    priceLabel: "₩75,000부터",
    seller: {
      name: "인쇄디자인",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  },
  {
    id: "designer-3",
    category: "패키징",
    title: "패키지/브랜딩 디자인",
    imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=250&fit=crop",
    rating: 4.9,
    reviewCount: 145,
    priceLabel: "₩180,000부터",
    seller: {
      name: "패키지디자이너",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  },
];

const RECO_DEVELOPERS: ServiceCard[] = [
  {
    id: "developer-1",
    category: "웹개발",
    title: "Next.js 웹 개발",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
    rating: 5.0,
    reviewCount: 412,
    priceLabel: "₩1,200,000부터",
    seller: {
      name: "Next.js전문가",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
  },
  {
    id: "developer-2",
    category: "모바일",
    title: "iOS/Android 앱 개발",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    rating: 4.9,
    reviewCount: 287,
    priceLabel: "₩2,800,000부터",
    seller: {
      name: "모바일개발자",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  },
  {
    id: "developer-3",
    category: "백엔드",
    title: "백엔드 API & 서버 구축",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    priceLabel: "₩1,800,000부터",
    seller: {
      name: "백엔드마스터",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  },
];

// ===========================================
// 🧩 REUSABLE BLOCK COMPONENT
// ===========================================

const RecommendationBlock = ({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: ServiceCard[];
}) => {
  return (
    <div>
      <header className="mb-8 text-left">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-600 mt-2">{subtitle}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {data.map((card) => (
          <Link
            key={card.id}
            href={`/services/${card.id}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white/90 shadow-md hover:shadow-xl hover:border-sky-300 transition-all hover:scale-[1.015] overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col p-5 gap-3">
              {/* Category Badge */}
              <span className="inline-flex w-fit items-center rounded-full bg-sky-100 text-sky-600 px-2 py-0.5 text-[12px] font-medium">
                {card.category}
              </span>

              {/* Title */}
              <h3 className="text-[15px] font-semibold text-slate-900 line-clamp-2 min-h-[2.5rem]">
                {card.title}
              </h3>

              {/* Rating Row */}
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-slate-700">{card.rating.toFixed(1)}</span>
                <span className="text-sm text-slate-500">({card.reviewCount})</span>
              </div>

              {/* Seller Row */}
              <div className="flex items-center gap-2 pt-1">
                <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={card.seller.avatarUrl}
                    alt={card.seller.name}
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
                <span className="text-slate-600 text-[14px] truncate">{card.seller.name}</span>
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-base font-bold text-slate-900">{card.priceLabel}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// ===========================================
// 🧩 MAIN EXPORT COMPONENT
// ===========================================

export const MultiRecommendationSection = () => {
  const { services } = useHomeData();

  // Convert admin services to ServiceCard format
  const adminServices: ServiceCard[] = useMemo(() => {
    return services
      .filter((s) => s.status === "approved")
      .slice(0, 9) // Limit to 9 services
      .map((s) => ({
        id: `admin-${s.id}`,
        category: s.category,
        title: s.title,
        imageUrl:
          s.imageUrl ||
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
        rating: s.rating || 4.5,
        reviewCount: s.orders || 0,
        priceLabel: s.price || "₩0",
        seller: {
          name: s.seller,
          avatarUrl:
            s.sellerAvatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        },
      }));
  }, [services]);

  // Use admin services if available, otherwise use default data
  const startupServices = useMemo(() => {
    if (adminServices.length > 0) {
      return adminServices.filter((s) => s.category.includes("디자인") || s.category.includes("로고")).slice(0, 3);
    }
    return RECO_STARTUP;
  }, [adminServices]);

  const designerServices = useMemo(() => {
    if (adminServices.length > 0) {
      return adminServices.filter((s) => s.category.includes("디자인") || s.category.includes("브랜드")).slice(0, 3);
    }
    return RECO_DESIGNERS;
  }, [adminServices]);

  const developerServices = useMemo(() => {
    if (adminServices.length > 0) {
      return adminServices.filter((s) => s.category.includes("개발") || s.category.includes("웹")).slice(0, 3);
    }
    return RECO_DEVELOPERS;
  }, [adminServices]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-28 bg-gradient-to-b from-white to-sky-50/30">
      <div className="mb-12">
        <SectionHeader
          label="SERVICES"
          title="추천 서비스"
          description="프리미엄 추천 서비스를 한눈에 확인하세요."
          align="center"
        />
      </div>
      <RecommendationBlock
        title="예비창업가들을 위한 추천 서비스"
        subtitle="브랜딩부터 홈페이지까지 필수 서비스만 골랐어요."
        data={startupServices.length > 0 ? startupServices : RECO_STARTUP}
      />

      <RecommendationBlock
        title="디자이너들이 자주 찾는 서비스"
        subtitle="브랜드를 돋보이게 만드는 전문 디자인 작업을 모았어요."
        data={designerServices.length > 0 ? designerServices : RECO_DESIGNERS}
      />

      <RecommendationBlock
        title="개발자들이 많이 구매한 서비스"
        subtitle="웹/앱 개발에 필요한 인기 서비스들을 확인해보세요."
        data={developerServices.length > 0 ? developerServices : RECO_DEVELOPERS}
      />
    </section>
  );
};




"use client";

import Link from "next/link";
import { Star } from "lucide-react";

type SearchResultsGridProps = {
  keyword: string;
  type: string;
  activeTab: "services" | "experts" | "portfolio";
  sortBy: string;
};

// Mock data - replace with actual API call
const mockServices = [
  {
    id: "1",
    title: "심플로고 감성로고 고급로고 전문",
    image: "https://via.placeholder.com/300x200?text=Logo+Design",
    rating: 5.0,
    reviews: 5,
    price: 189000,
    seller: "DMD",
    badge: "세금계산서",
  },
  {
    id: "2",
    title: "| 대기업협력사 | 로고 | 명함 | 네이밍 | 슬로건 | 스티커인쇄",
    image: "https://via.placeholder.com/300x200?text=Branding",
    rating: 4.9,
    reviews: 1705,
    price: 60000,
    seller: "브랜딩보울",
    badge: "빠른 응답",
  },
  {
    id: "3",
    title: "로고, 로고제작, 로고디자인CI, BI, 회사로고, 자영업로고",
    image: "https://via.placeholder.com/300x200?text=Logo+Service",
    rating: 4.9,
    reviews: 106,
    price: 69000,
    seller: "메이크디자인Pro",
    badge: "빠른 응답",
  },
  {
    id: "4",
    title: "로고, CI, BI, 결과로 증명합니다.",
    image: "https://via.placeholder.com/300x200?text=Premium+Logo",
    rating: 5.0,
    reviews: 73,
    price: 210000,
    seller: "비루",
    badge: "세금계산서",
  },
  {
    id: "5",
    title: "심플로고, 로고제작, 로고디자인, CI, BI, 네이밍, 명함제작",
    image: "https://via.placeholder.com/300x200?text=Simple+Logo",
    rating: 4.9,
    reviews: 769,
    price: 59000,
    seller: "크리플스튜디오",
    badge: "빠른 응답",
  },
  {
    id: "6",
    title: "프리미엄 로고 디자인 아이덴티티 로고제작 CI BI",
    image: "https://via.placeholder.com/300x200?text=Identity+Design",
    rating: 4.9,
    reviews: 842,
    price: 110000,
    seller: "INIDE",
    badge: "세금계산서",
  },
];

export const SearchResultsGrid = ({ keyword, type, activeTab, sortBy }: SearchResultsGridProps) => {
  const results = activeTab === "services" ? mockServices : [];

  if (results.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">'{keyword}'</span>에 대한 검색결과
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.id}`}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              {service.badge && (
                <span className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-white">
                  {service.badge}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900">{service.title}</h3>
              <div className="mb-2 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-slate-700">{service.rating}</span>
                <span className="text-xs text-slate-500">({service.reviews.toLocaleString()})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">
                  {service.price.toLocaleString()}원{service.price < 100000 ? "~" : ""}
                </span>
                <span className="text-xs text-slate-500">{service.seller}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


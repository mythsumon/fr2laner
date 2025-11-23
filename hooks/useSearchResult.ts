"use client";

import { useQuery } from "@tanstack/react-query";
import type { SearchType } from "./useSearchType";

export type Gig = {
  id: string;
  title: string;
  sellerName: string;
  sellerAvatar: string;
  sellerLevel: "Pro" | "Level 2" | "Level 1" | "New";
  rating: number;
  reviews: number;
  delivery: string;
  revisions: string;
  price: number;
  thumb: string;
  badge: "pro" | "best" | "new" | null;
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  level: "Pro" | "Level 2" | "Level 1" | "New";
  rating: number;
  reviews: number;
  orders: number;
  specialties: string[];
  priceRange: string;
  responseTime: string;
  badge: "pro" | "best" | "verified" | null;
};

export type Portfolio = {
  id: string;
  title: string;
  description: string;
  thumb: string;
  sellerName: string;
  sellerAvatar: string;
  views: number;
  likes: number;
  category: string;
  tags: string[];
  createdAt: string;
};

export type SearchResult =
  | { type: "gigs"; items: Gig[]; total: number }
  | { type: "sellers"; items: Seller[]; total: number }
  | { type: "portfolios"; items: Portfolio[]; total: number };

interface UseSearchResultParams {
  type: SearchType;
  keyword: string;
  sort?: string;
  page?: number;
  filters?: Record<string, string | number | boolean>;
}

// Mock API fetch function - replace with actual API call
async function fetchSearchResults(params: UseSearchResultParams): Promise<SearchResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { type, keyword, page = 1 } = params;

  if (type === "gigs") {
    // Mock gigs data
    const mockGigs: Gig[] = Array.from({ length: 12 }, (_, i) => ({
      id: `gig-${i + 1}`,
      title: `${keyword} 관련 서비스 ${i + 1}`,
      sellerName: `Seller ${i + 1}`,
      sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
      sellerLevel: i % 3 === 0 ? "Pro" : i % 3 === 1 ? "Level 2" : "Level 1",
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 1000) + 10,
      delivery: `${Math.floor(Math.random() * 5) + 1} days`,
      revisions: i % 2 === 0 ? "Unlimited" : `${Math.floor(Math.random() * 5) + 1} revisions`,
      price: (Math.floor(Math.random() * 500) + 50) * 1000,
      thumb: `https://via.placeholder.com/640x480?text=Service+${i + 1}`,
      badge: i % 3 === 0 ? "pro" : i % 5 === 0 ? "best" : null,
    }));

    return {
      type: "gigs",
      items: mockGigs,
      total: 124,
    };
  }

  if (type === "sellers") {
    // Mock sellers data with realistic Korean names and specialties
    const sellerNames = [
      "김디자인", "박브랜딩", "이로고", "최UIUX", "정일러스트", "강포토샵", "조영상편집", 
      "윤웹개발", "임앱개발", "서마케팅", "한콘텐츠", "신번역"
    ];
    
    const specialtySets = [
      ["로고 디자인", "브랜딩", "명함 디자인"],
      ["UI/UX 디자인", "웹 디자인", "앱 디자인"],
      ["일러스트", "캐릭터 디자인", "이모티콘"],
      ["포토샵", "사진 편집", "이미지 리터칭"],
      ["영상 편집", "유튜브 썸네일", "모션그래픽"],
      ["웹 개발", "프론트엔드", "반응형 웹"],
      ["앱 개발", "iOS", "안드로이드"],
      ["마케팅", "SNS 마케팅", "콘텐츠 마케팅"],
      ["블로그 글쓰기", "기술 문서", "번역"],
      ["영어 번역", "일본어 번역", "중국어 번역"],
      ["PPT 디자인", "발표 자료", "인포그래픽"],
      ["캘리그라피", "손글씨", "타이포그래피"]
    ];

    const priceRanges = [
      "₩50,000 - ₩150,000",
      "₩100,000 - ₩300,000",
      "₩200,000 - ₩500,000",
      "₩300,000 - ₩700,000",
      "₩500,000 - ₩1,000,000"
    ];

    const responseTimes = ["1시간 이내", "2시간 이내", "3시간 이내", "6시간 이내", "12시간 이내"];

    const mockSellers: Seller[] = Array.from({ length: 12 }, (_, i) => ({
      id: `seller-${i + 1}`,
      name: sellerNames[i] || `전문가 ${i + 1}`,
      avatar: `https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c`,
      level: i % 4 === 0 ? "Pro" : i % 4 === 1 ? "Level 2" : i % 4 === 2 ? "Level 1" : "New",
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 500) + 10,
      orders: Math.floor(Math.random() * 1000) + 50,
      specialties: specialtySets[i] || ["디자인", "브랜딩", "로고"],
      priceRange: priceRanges[i % priceRanges.length],
      responseTime: responseTimes[i % responseTimes.length],
      badge: i % 4 === 0 ? "pro" : i % 5 === 0 ? "verified" : i % 7 === 0 ? "best" : null,
    }));

    return {
      type: "sellers",
      items: mockSellers,
      total: 89,
    };
  }

  // Portfolios
  const portfolioTitles = [
    "프리미엄 로고 디자인 포트폴리오",
    "브랜드 아이덴티티 디자인",
    "모바일 앱 UI/UX 디자인",
    "웹사이트 리뉴얼 디자인",
    "패키지 디자인 컬렉션",
    "영상 편집 및 모션그래픽",
    "일러스트레이션 워크",
    "포트폴리오 웹사이트 제작",
    "카페 브랜딩 프로젝트",
    "패션 브랜드 콜라보레이션",
    "게임 캐릭터 디자인",
    "건축 렌더링 포트폴리오"
  ];

  const portfolioDescriptions = [
    "다양한 산업 분야의 로고 디자인 작업물을 보여드립니다. 각 프로젝트마다 고객의 브랜드 정체성을 반영한 디자인을 제안합니다.",
    "완성도 높은 브랜드 아이덴티티 시스템을 통해 통일된 브랜드 경험을 제공합니다.",
    "사용자 중심의 직관적인 모바일 앱 인터페이스를 디자인합니다.",
    "현대적이고 반응형인 웹사이트 디자인으로 비즈니스 성장을 돕습니다.",
    "제품의 특성을 살린 패키지 디자인으로 시각적 임팩트를 극대화합니다.",
    "창의적인 영상 편집과 모션그래픽으로 스토리를 생생하게 전달합니다.",
    "독창적인 일러스트 스타일로 다양한 콘텐츠를 제작합니다.",
    "개인/기업 포트폴리오 웹사이트를 제작하여 전문성을 보여줍니다.",
    "독특한 컨셉의 카페 브랜딩으로 고객의 브랜드를 차별화합니다.",
    "패션 브랜드와의 협업을 통해 트렌디한 디자인을 구현합니다.",
    "독창적인 게임 캐릭터 디자인으로 게임의 재미를 더합니다.",
    "현실감 있는 건축 렌더링으로 공간의 아름다움을 표현합니다."
  ];

  const designerNames = [
    "김디자인", "박브랜딩", "이로고", "최UIUX", "정일러스트", "강포토샵",
    "조영상편집", "윤웹개발", "임앱개발", "서마케팅", "한콘텐츠", "신번역"
  ];

  const categories = [
    "로고 디자인", "브랜딩", "UI/UX", "일러스트", "포토샵", "영상 편집",
    "웹 디자인", "앱 디자인", "패키지 디자인", "패션 디자인", "게임 디자인", "건축"
  ];

  const tagSets = [
    ["로고", "브랜딩", "CI/BI"],
    ["브랜드", "아이덴티티", "네이밍"],
    ["UI/UX", "앱 디자인", "프로토타입"],
    ["웹사이트", "반응형", "리뉴얼"],
    ["패키지", "라벨", "제품 디자인"],
    ["영상", "편집", "모션그래픽"],
    ["일러스트", "캐릭터", "아트"],
    ["포트폴리오", "웹사이트", "프레젠테이션"],
    ["카페", "브랜딩", "인테리어"],
    ["패션", "브랜드", "콜라보"],
    ["게임", "캐릭터", "아트"],
    ["건축", "렌더링", "비주얼라이제이션"]
  ];

  const mockPortfolios: Portfolio[] = Array.from({ length: 12 }, (_, i) => ({
    id: `portfolio-${i + 1}`,
    title: portfolioTitles[i] || `${keyword} 관련 포트폴리오 ${i + 1}`,
    description: portfolioDescriptions[i] || `아름다운 ${keyword} 디자인 작업물입니다.`,
    thumb: `https://via.placeholder.com/640x480?text=Portfolio+${i + 1}`,
    sellerName: designerNames[i] || `디자이너 ${i + 1}`,
    sellerAvatar: `https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c`,
    views: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 500) + 10,
    category: categories[i] || "디자인",
    tags: tagSets[i] || [keyword, "디자인", "브랜딩"],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));

  return {
    type: "portfolios",
    items: mockPortfolios,
    total: 56,
  };
}

export function useSearchResult(params: UseSearchResultParams) {
  const { type, keyword, sort, page, filters } = params;

  const queryKey = [
    "search",
    type,
    keyword,
    sort,
    page,
    filters ? JSON.stringify(filters) : null,
  ].filter(Boolean);

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => fetchSearchResults(params),
    enabled: true, // Allow empty keyword for all types
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}


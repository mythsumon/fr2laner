import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Maps category name to category and subcategory slugs for navigation
 * Returns the URL with query parameters for /design page
 */
export function getCategoryUrl(categoryName: string): string {
  // Category name to slug mapping
  const categoryMap: Record<string, { category: string; subcategory: string }> = {
    "웹 개발": { category: "it-programming", subcategory: "web-development" },
    "IT · 프로그래밍": { category: "it-programming", subcategory: "ai-development" },
    "번역": { category: "translation-interpreting", subcategory: "document-translation" },
    "번역 · 통역": { category: "translation-interpreting", subcategory: "document-translation" },
    "마케팅": { category: "marketing-advertising", subcategory: "ai-marketing" },
    "마케팅 · 광고": { category: "marketing-advertising", subcategory: "ai-marketing" },
    "영상 편집": { category: "video-photo-audio", subcategory: "video-editing" },
    "영상 · 사진 · 음향": { category: "video-photo-audio", subcategory: "video-editing" },
    "글쓰기": { category: "document-writing", subcategory: "copywriting" },
    "문서 · 글쓰기": { category: "document-writing", subcategory: "copywriting" },
    "로고 디자인": { category: "design-branding", subcategory: "logo-design" },
    "디자인 & 브랜딩": { category: "design-branding", subcategory: "ai-design" },
    "AI 개발": { category: "it-programming", subcategory: "ai-development" },
    "AI 디자인": { category: "design-branding", subcategory: "ai-design" },
    "UI/UX 디자인": { category: "design-branding", subcategory: "ui-ux-design" },
    "브랜드 아이덴티티": { category: "design-branding", subcategory: "brand-identity" },
    "모바일 개발": { category: "it-programming", subcategory: "mobile-development" },
    "백엔드 개발": { category: "it-programming", subcategory: "backend-development" },
    "사진 편집": { category: "video-photo-audio", subcategory: "photo-editing" },
    "음향 제작": { category: "video-photo-audio", subcategory: "audio-production" },
    "애니메이션": { category: "video-photo-audio", subcategory: "animation" },
    "SNS 마케팅": { category: "marketing-advertising", subcategory: "sns-marketing" },
    "SEO/SEM": { category: "marketing-advertising", subcategory: "seo-sem" },
    "콘텐츠 마케팅": { category: "marketing-advertising", subcategory: "content-marketing" },
    "카피라이팅": { category: "document-writing", subcategory: "copywriting" },
    "블로그 글쓰기": { category: "document-writing", subcategory: "blog-writing" },
    "기술 문서 작성": { category: "document-writing", subcategory: "technical-writing" },
    "번역 글쓰기": { category: "document-writing", subcategory: "translation-writing" },
  };

  const mapping = categoryMap[categoryName];
  if (mapping) {
    return `/design?category=${mapping.category}&subcategory=${mapping.subcategory}`;
  }

  // Default fallback - convert category name to slug format
  const slug = categoryName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  return `/design?category=${slug}`;
}




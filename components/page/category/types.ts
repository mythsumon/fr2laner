export type ServiceBadge = "pro" | "best" | "new" | null;

export interface CategoryService {
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
  badge: ServiceBadge;
  sponsored?: boolean;
  tags?: string[];
}

export interface KeywordTag {
  id: string;
  label: string;
}

export type ViewMode = "grid" | "list";

export type SortOption = "best" | "newest" | "priceAsc" | "priceDesc" | "rating";



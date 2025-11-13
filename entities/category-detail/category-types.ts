export type CategoryBadge = "pro" | "best" | "new" | null;

export interface CategoryBreadcrumb {
  labelKey: string;
  href: string;
}

export interface CategorySubcategory {
  id: string;
  labelKey: string;
}

export interface CategoryServiceItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  sellerNameKey: string;
  sellerTaglineKey: string;
  sellerAvatar: string;
  badge: CategoryBadge;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  deliveryDays: number;
  verified: boolean;
  subcategoryId: string;
}

export interface CategoryDetail {
  slug: string;
  titleKey: string;
  subtitleKey: string;
  icon: string;
  backgroundGradient?: string;
  breadcrumbs: CategoryBreadcrumb[];
  subcategories: CategorySubcategory[];
  services: CategoryServiceItem[];
}

export interface HomeCategoryFilter {
  id: string;
  labelKey: string;
}

export interface HomeCategoryCard {
  id: string;
  labelKey: string;
  image: string;
  altKey: string;
}

export interface HomeTestimonial {
  id: string;
  quoteKey: string;
  nameKey: string;
  roleKey: string;
  avatar: string;
}

export type HomeServiceCategory = "all" | "design" | "development" | "marketing" | "writing" | "video" | "ai";

export interface HomeService {
  id: string;
  titleKey: string;
  sellerNameKey: string;
  sellerAvatar: string;
  image: string;
  rating: number;
  reviewsKey: string;
  priceKey: string;
  category: HomeServiceCategory;
}

export type HomeFreelancerTag = "topRated" | "newArrivals" | "mostHired";

export interface HomeFreelancer {
  id: string;
  nameKey: string;
  roleKey: string;
  taglineKey: string;
  avatar: string;
  rating: number;
  reviewsKey: string;
  tag: HomeFreelancerTag;
}

export type HomeStepIcon = "search" | "users" | "payments";

export interface HomeStep {
  id: string;
  icon: HomeStepIcon;
  titleKey: string;
  descriptionKey: string;
}

export type HomePrimaryCategoryIcon =
  | "palette"
  | "laptopCode"
  | "cameraAudio"
  | "megaphone"
  | "pencilDocument"
  | "buildingArrow"
  | "scale"
  | "openBook"
  | "sparkles"
  | "flags"
  | "gift"
  | "briefcase"
  | "lightbulb"
  | "house";

export interface HomePrimaryCategory {
  id: string;
  labelKey: string;
  icon: HomePrimaryCategoryIcon;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  image?: string;
}

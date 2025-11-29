"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

// Types matching admin data structures
export interface HomeBanner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  url: string;
  active: boolean;
}

export interface HomeFeaturedService {
  id: number;
  title: string;
  seller: string;
  price: string;
  rating: number;
  orders: number;
  image?: string;
}

export interface HomeCategory {
  id: string;
  name: string;
  icon?: string;
  image?: string;
}

export interface HomeTestimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface HomeService {
  id: number;
  title: string;
  seller: string;
  category: string;
  price: string;
  orders: number;
  rating: number;
  imageUrl?: string;
  sellerAvatar?: string;
  status: "approved" | "pending" | "rejected" | "hidden";
  featured: boolean;
  description?: string;
}

interface HomeDataContextType {
  banners: HomeBanner[];
  featuredServices: HomeFeaturedService[];
  services: HomeService[];
  categories: HomeCategory[];
  testimonials: HomeTestimonial[];
  updateBanners: (banners: HomeBanner[]) => void;
  updateFeaturedServices: (services: HomeFeaturedService[]) => void;
  updateServices: (services: HomeService[]) => void;
  updateCategories: (categories: HomeCategory[]) => void;
  updateTestimonials: (testimonials: HomeTestimonial[]) => void;
}

const HomeDataContext = createContext<HomeDataContextType | undefined>(undefined);

// Initial data - can be loaded from localStorage or API
const getInitialBanners = (): HomeBanner[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("home_banners");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse home_banners from localStorage", e);
      }
    }
  }
  return [
    {
      id: 1,
      title: "아이디어를 현실로 만들 준비 되셨나요?",
      subtitle: "지금 프로젝트를 등록하고 재능 있는 프리랜서의 제안을 받아보세요.",
      image: "",
      url: "/signup",
      active: true,
    },
    {
      id: 2,
      title: "프리랜서와 함께 성장하세요",
      subtitle: "전문가와 협업하여 비즈니스를 확장하고 목표를 달성하세요.",
      image: "",
      url: "/for-freelancers",
      active: true,
    },
    {
      id: 3,
      title: "최고의 재능을 만나보세요",
      subtitle: "검증된 프리랜서들의 다양한 서비스를 탐색하고 프로젝트를 시작하세요.",
      image: "",
      url: "/find-talent",
      active: true,
    },
  ];
};

const getInitialFeaturedServices = (): HomeFeaturedService[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("home_featured_services");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse home_featured_services from localStorage", e);
      }
    }
  }
  return [
    { id: 1, title: "프리미엄 로고 디자인", seller: "최디자인", price: "₩250,000", rating: 4.9, orders: 234 },
    { id: 2, title: "반응형 웹사이트 개발", seller: "정개발", price: "₩1,500,000", rating: 4.7, orders: 89 },
  ];
};

const getInitialCategories = (): HomeCategory[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("home_categories");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse home_categories from localStorage", e);
      }
    }
  }
  return [];
};

const getInitialTestimonials = (): HomeTestimonial[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("home_testimonials");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse home_testimonials from localStorage", e);
      }
    }
  }
  return [];
};

const getInitialServices = (): HomeService[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("home_services");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse home_services from localStorage", e);
      }
    }
  }
  return [];
};

export const HomeDataProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<HomeBanner[]>([]);
  const [featuredServices, setFeaturedServices] = useState<HomeFeaturedService[]>([]);
  const [services, setServices] = useState<HomeService[]>([]);
  const [categories, setCategories] = useState<HomeCategory[]>([]);
  const [testimonials, setTestimonials] = useState<HomeTestimonial[]>([]);

  // Initialize state with data
  useEffect(() => {
    setBanners(getInitialBanners());
    setFeaturedServices(getInitialFeaturedServices());
    setServices(getInitialServices());
    setCategories(getInitialCategories());
    setTestimonials(getInitialTestimonials());
  }, []);

  // Sync with localStorage - only update when values actually change
  useEffect(() => {
    try {
      localStorage.setItem("home_banners", JSON.stringify(banners));
    } catch (e) {
      console.warn("Failed to save home_banners to localStorage", e);
    }
  }, [banners]);

  useEffect(() => {
    try {
      localStorage.setItem("home_featured_services", JSON.stringify(featuredServices));
    } catch (e) {
      console.warn("Failed to save home_featured_services to localStorage", e);
    }
  }, [featuredServices]);

  useEffect(() => {
    try {
      localStorage.setItem("home_categories", JSON.stringify(categories));
    } catch (e) {
      console.warn("Failed to save home_categories to localStorage", e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem("home_testimonials", JSON.stringify(testimonials));
    } catch (e) {
      console.warn("Failed to save home_testimonials to localStorage", e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem("home_services", JSON.stringify(services));
    } catch (e) {
      console.warn("Failed to save home_services to localStorage", e);
    }
  }, [services]);

  const updateBanners = useCallback((newBanners: HomeBanner[]) => {
    setBanners(newBanners);
  }, []);

  const updateFeaturedServices = useCallback((newServices: HomeFeaturedService[]) => {
    setFeaturedServices(newServices);
  }, []);

  const updateServices = useCallback((newServices: HomeService[]) => {
    setServices(newServices);
  }, []);

  const updateCategories = useCallback((newCategories: HomeCategory[]) => {
    setCategories(newCategories);
  }, []);

  const updateTestimonials = useCallback((newTestimonials: HomeTestimonial[]) => {
    setTestimonials(newTestimonials);
  }, []);

  return (
    <HomeDataContext.Provider
      value={{
        banners,
        featuredServices,
        services,
        categories,
        testimonials,
        updateBanners,
        updateFeaturedServices,
        updateServices,
        updateCategories,
        updateTestimonials,
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};

export const useHomeData = () => {
  const context = useContext(HomeDataContext);
  if (context === undefined) {
    throw new Error("useHomeData must be used within a HomeDataProvider");
  }
  return context;
};
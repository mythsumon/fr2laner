"use client";

import { useState } from "react";
import {
  Image,
  FileText,
  HelpCircle,
  Scale,
  Plus,
  Edit,
  X,
  Eye,
  CheckCircle2,
  Upload,
  Tag,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useHomeData, type HomeBanner } from "@/contexts/HomeDataContext";
import { useToast } from "@/hooks/useToast";

interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  url: string;
  active: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  status: "published" | "draft";
}

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

interface LegalPage {
  id: number;
  title: string;
  lastUpdated: string;
}

interface CategoryBanner {
  id: number;
  title: string;
  description: string;
  cta: string;
  badge: string;
  gradient: string;
  url?: string;
  active: boolean;
  category?: string; // 카테고리 페이지 지정 (예: "design", "development", null = 모든 페이지)
}

const initialBanners: Banner[] = [
  { id: 1, title: "메인 배너 1", image: "/banner1.jpg", url: "/services", active: true },
  { id: 2, title: "메인 배너 2", image: "/banner2.jpg", url: "/for-freelancers", active: false },
];

const initialBlogPosts: BlogPost[] = [
  { id: 1, title: "프리랜서를 위한 마케팅 가이드", category: "마케팅", date: "2024-03-15", status: "published" },
  { id: 2, title: "성공적인 프로젝트 관리 방법", category: "팁", date: "2024-03-10", status: "draft" },
];

const initialFAQs: FAQ[] = [
  { id: 1, category: "일반", question: "서비스는 어떻게 주문하나요?", answer: "홈페이지에서 원하는 서비스를 검색하고 주문하실 수 있습니다." },
  { id: 2, category: "결제", question: "환불 정책은 어떻게 되나요?", answer: "서비스 완료 전까지는 전액 환불이 가능합니다." },
];

const initialLegalPages: LegalPage[] = [
  { id: 1, title: "이용약관", lastUpdated: "2024-03-01" },
  { id: 2, title: "개인정보처리방침", lastUpdated: "2024-03-01" },
  { id: 3, title: "환불 정책", lastUpdated: "2024-02-15" },
];

const initialCategoryBanners: CategoryBanner[] = [
  {
    id: 1,
    title: "Design Week Savings",
    description: "Get 15% off logo and branding packages until Sunday.",
    cta: "Explore deals",
    badge: "LIMITED OFFER",
    gradient: "from-[#E8F1FF] to-[#D3E3FF]",
    url: "/design",
    active: true,
    category: "design",
  },
  {
    id: 2,
    title: "Design Buyer Guide",
    description: "Learn how to brief designers and collaborate effectively.",
    cta: "Download guide",
    badge: "EXPERT TIPS",
    gradient: "from-[#FFE8F1] to-[#FFD6E5]",
    url: "/design",
    active: true,
    category: "design",
  },
];

export default function CMSManagementPage() {
  const [activeTab, setActiveTab] = useState("banners");
  const { toast, showToast, hideToast } = useToast();
  const { banners: homeBanners, updateBanners } = useHomeData();

  // File upload handler
  const handleFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("이미지 파일만 업로드할 수 있습니다."));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error("파일 크기는 5MB 이하여야 합니다."));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const [banners, setBanners] = useState<Banner[]>(
    homeBanners.length > 0
      ? homeBanners.map((b) => ({
          id: b.id,
          title: b.title,
          image: b.image,
          url: b.url,
          active: b.active,
        }))
      : initialBanners
  );
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cms_blog_posts");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return initialBlogPosts;
        }
      }
    }
    return initialBlogPosts;
  });
  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cms_faqs");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return initialFAQs;
        }
      }
    }
    return initialFAQs;
  });
  const [legalPages] = useState<LegalPage[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cms_legal_pages");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return initialLegalPages;
        }
      }
    }
    return initialLegalPages;
  });

  const [addBannerModal, setAddBannerModal] = useState(false);
  const [editBannerModal, setEditBannerModal] = useState<{ isOpen: boolean; banner: Banner | null }>({
    isOpen: false,
    banner: null,
  });
  const [deleteBannerModal, setDeleteBannerModal] = useState<{ isOpen: boolean; banner: Banner | null }>({
    isOpen: false,
    banner: null,
  });
  const [addBlogModal, setAddBlogModal] = useState(false);
  const [addFAQModal, setAddFAQModal] = useState(false);
  const [deleteFAQModal, setDeleteFAQModal] = useState<{ isOpen: boolean; faq: FAQ | null }>({
    isOpen: false,
    faq: null,
  });
  const [categoryBanners, setCategoryBanners] = useState<CategoryBanner[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cms_category_banners");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return initialCategoryBanners;
        }
      }
    }
    return initialCategoryBanners;
  });
  const [addCategoryBannerModal, setAddCategoryBannerModal] = useState(false);
  const [editCategoryBannerModal, setEditCategoryBannerModal] = useState<{ isOpen: boolean; banner: CategoryBanner | null }>({
    isOpen: false,
    banner: null,
  });
  const [deleteCategoryBannerModal, setDeleteCategoryBannerModal] = useState<{ isOpen: boolean; banner: CategoryBanner | null }>({
    isOpen: false,
    banner: null,
  });

  // Banner functions
  const handleAddBanner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBanner: Banner = {
      id: Date.now(),
      title: formData.get("title") as string,
      subtitle: (formData.get("subtitle") as string) || undefined,
      image: formData.get("image") as string,
      url: formData.get("url") as string,
      active: formData.get("active") === "on",
    };
    const updatedBanners = [...banners, newBanner];
    setBanners(updatedBanners);
    // Sync with homepage
    updateBanners(
      updatedBanners.map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        image: b.image,
        url: b.url,
        active: b.active,
      }))
    );
    showToast("배너가 추가되었습니다. 홈페이지에 반영되었습니다.", "success");
    setAddBannerModal(false);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditBannerModal({ isOpen: true, banner });
  };

  const handleSaveBanner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editBannerModal.banner) {
      const formData = new FormData(e.currentTarget);
      const updatedBanners = banners.map((b) =>
        b.id === editBannerModal.banner!.id
          ? {
              ...b,
              title: formData.get("title") as string,
              url: formData.get("url") as string,
              active: formData.get("active") === "on",
            }
          : b
      );
      setBanners(updatedBanners);
      // Sync with homepage
      updateBanners(
        updatedBanners.map((b) => ({
          id: b.id,
          title: b.title,
          image: b.image,
          url: b.url,
          active: b.active,
        }))
      );
      showToast("배너가 업데이트되었습니다. 홈페이지에 반영되었습니다.", "success");
      setEditBannerModal({ isOpen: false, banner: null });
    }
  };

  const handleToggleBanner = (banner: Banner) => {
    const updatedBanners = banners.map((b) => (b.id === banner.id ? { ...b, active: !b.active } : b));
    setBanners(updatedBanners);
    // Sync with homepage
    updateBanners(
      updatedBanners.map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        image: b.image,
        url: b.url,
        active: b.active,
      }))
    );
    showToast(`배너가 ${banner.active ? "비활성화" : "활성화"}되었습니다. 홈페이지에 반영되었습니다.`, "success");
  };

  const handleDeleteBanner = (banner: Banner) => {
    setDeleteBannerModal({ isOpen: true, banner });
  };

  const confirmDeleteBanner = () => {
    if (deleteBannerModal.banner) {
      const updatedBanners = banners.filter((b) => b.id !== deleteBannerModal.banner!.id);
      setBanners(updatedBanners);
      // Sync with homepage
      updateBanners(
        updatedBanners.map((b) => ({
          id: b.id,
          title: b.title,
          image: b.image,
          url: b.url,
          active: b.active,
        }))
      );
      showToast("배너가 삭제되었습니다. 홈페이지에 반영되었습니다.", "success");
      setDeleteBannerModal({ isOpen: false, banner: null });
    }
  };

  // Blog functions
  const handleAddBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPost: BlogPost = {
      id: Date.now(),
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      date: new Date().toISOString().split("T")[0],
      status: "draft",
    };
    const updatedPosts = [...blogPosts, newPost];
    setBlogPosts(updatedPosts);
    // Save to localStorage for Website access
    if (typeof window !== "undefined") {
      localStorage.setItem("cms_blog_posts", JSON.stringify(updatedPosts));
    }
    showToast("블로그 게시물이 추가되었습니다.", "success");
    setAddBlogModal(false);
  };

  // FAQ functions
  const handleAddFAQ = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFAQ: FAQ = {
      id: Date.now(),
      category: formData.get("category") as string,
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
    };
    const updatedFaqs = [...faqs, newFAQ];
    setFaqs(updatedFaqs);
    // Save to localStorage for Website/Buyer/Seller access
    if (typeof window !== "undefined") {
      localStorage.setItem("cms_faqs", JSON.stringify(updatedFaqs));
    }
    showToast("FAQ가 추가되었습니다.", "success");
    setAddFAQModal(false);
  };

  const handleDeleteFAQ = (faq: FAQ) => {
    setDeleteFAQModal({ isOpen: true, faq });
  };

  const confirmDeleteFAQ = () => {
    if (deleteFAQModal.faq) {
      const updatedFaqs = faqs.filter((f) => f.id !== deleteFAQModal.faq!.id);
      setFaqs(updatedFaqs);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cms_faqs", JSON.stringify(updatedFaqs));
      }
      showToast("FAQ가 삭제되었습니다.", "success");
      setDeleteFAQModal({ isOpen: false, faq: null });
    }
  };

  // Category Banner functions
  const handleAddCategoryBanner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBanner: CategoryBanner = {
      id: Date.now(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      cta: formData.get("cta") as string,
      badge: formData.get("badge") as string,
      gradient: formData.get("gradient") as string,
      url: (formData.get("url") as string) || undefined,
      active: formData.get("active") === "on",
      category: (formData.get("category") as string) || undefined,
    };
    const updatedBanners = [...categoryBanners, newBanner];
    setCategoryBanners(updatedBanners);
    if (typeof window !== "undefined") {
      localStorage.setItem("cms_category_banners", JSON.stringify(updatedBanners));
    }
    showToast("카테고리 배너가 추가되었습니다.", "success");
    setAddCategoryBannerModal(false);
  };

  const handleEditCategoryBanner = (banner: CategoryBanner) => {
    setEditCategoryBannerModal({ isOpen: true, banner });
  };

  const handleSaveCategoryBanner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editCategoryBannerModal.banner) {
      const formData = new FormData(e.currentTarget);
      const updatedBanners = categoryBanners.map((b) =>
        b.id === editCategoryBannerModal.banner!.id
          ? {
              ...b,
              title: formData.get("title") as string,
              description: formData.get("description") as string,
              cta: formData.get("cta") as string,
              badge: formData.get("badge") as string,
              gradient: formData.get("gradient") as string,
              url: (formData.get("url") as string) || undefined,
              active: formData.get("active") === "on",
              category: (formData.get("category") as string) || undefined,
            }
          : b
      );
      setCategoryBanners(updatedBanners);
      if (typeof window !== "undefined") {
        localStorage.setItem("cms_category_banners", JSON.stringify(updatedBanners));
      }
      showToast("카테고리 배너가 업데이트되었습니다.", "success");
      setEditCategoryBannerModal({ isOpen: false, banner: null });
    }
  };

  const handleToggleCategoryBanner = (banner: CategoryBanner) => {
    const updatedBanners = categoryBanners.map((b) => (b.id === banner.id ? { ...b, active: !b.active } : b));
    setCategoryBanners(updatedBanners);
    if (typeof window !== "undefined") {
      localStorage.setItem("cms_category_banners", JSON.stringify(updatedBanners));
    }
    showToast(`카테고리 배너가 ${banner.active ? "비활성화" : "활성화"}되었습니다.`, "success");
  };

  const handleDeleteCategoryBanner = (banner: CategoryBanner) => {
    setDeleteCategoryBannerModal({ isOpen: true, banner });
  };

  const confirmDeleteCategoryBanner = () => {
    if (deleteCategoryBannerModal.banner) {
      const updatedBanners = categoryBanners.filter((b) => b.id !== deleteCategoryBannerModal.banner!.id);
      setCategoryBanners(updatedBanners);
      if (typeof window !== "undefined") {
        localStorage.setItem("cms_category_banners", JSON.stringify(updatedBanners));
      }
      showToast("카테고리 배너가 삭제되었습니다.", "success");
      setDeleteCategoryBannerModal({ isOpen: false, banner: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">콘텐츠 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">홈페이지 콘텐츠를 관리하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { id: "banners", label: "홈 배너", icon: Image },
            { id: "categoryBanners", label: "카테고리 배너", icon: Tag },
            { id: "blog", label: "블로그/기사", icon: FileText },
            { id: "faq", label: "FAQ", icon: HelpCircle },
            { id: "legal", label: "법적 페이지", icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#2E5E99] text-white"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                <Icon className="size-4" />
                <span className="font-medium truncate max-w-[120px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Banners Tab */}
      {activeTab === "banners" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">홈 배너</h3>
            <Button type="primary" onClick={() => setAddBannerModal(true)}>
              <Plus className="size-4 mr-2" />
              배너 추가
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((banner) => (
              <div key={banner.id} className="p-4 rounded-lg border border-[#E2E8F0]">
                <div className="aspect-video bg-[#F8FAFC] rounded-lg mb-4 flex items-center justify-center">
                  <Image className="size-12 text-[#64748B]" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[#0F172A]">{banner.title}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      banner.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {banner.active ? "활성" : "비활성"}
                  </span>
                </div>
                <p className="text-sm text-[#64748B] mb-4 truncate max-w-[250px]" title={banner.url}>링크: {banner.url}</p>
                <div className="flex gap-2">
                  <Button size="sm" type="outline" onClick={() => handleToggleBanner(banner)}>
                    {banner.active ? "비활성화" : "활성화"}
                  </Button>
                  <Button size="sm" type="outline" onClick={() => handleEditBanner(banner)}>
                    <Edit className="size-4 mr-2" />
                    수정
                  </Button>
                  <Button size="sm" type="outline" onClick={() => handleDeleteBanner(banner)}>
                    <X className="size-4 mr-2" />
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Banners Tab */}
      {activeTab === "categoryBanners" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">카테고리 배너 (프로모션)</h3>
            <Button type="primary" onClick={() => setAddCategoryBannerModal(true)}>
              <Plus className="size-4 mr-2" />
              배너 추가
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryBanners.map((banner) => (
              <div key={banner.id} className="p-4 rounded-lg border border-[#E2E8F0]">
                <div className={`aspect-video rounded-lg mb-4 bg-gradient-to-br ${banner.gradient} p-4 flex flex-col justify-between`}>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/70 text-xs font-semibold text-[#2E5E99] mb-2">
                      {banner.badge}
                    </span>
                    <h4 className="text-lg font-bold text-[#0F172A] mb-1">{banner.title}</h4>
                    <p className="text-sm text-[#475569]">{banner.description}</p>
                  </div>
                  <button className="inline-flex w-fit items-center justify-center rounded-full border border-[#2E5E99] bg-white px-4 py-2 text-sm font-semibold text-[#2E5E99]">
                    {banner.cta}
                  </button>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{banner.title}</p>
                    <p className="text-xs text-[#64748B]">
                      카테고리: {banner.category || "모든 페이지"} | URL: {banner.url || "없음"}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      banner.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {banner.active ? "활성" : "비활성"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" type="outline" onClick={() => handleToggleCategoryBanner(banner)}>
                    {banner.active ? "비활성화" : "활성화"}
                  </Button>
                  <Button size="sm" type="outline" onClick={() => handleEditCategoryBanner(banner)}>
                    <Edit className="size-4 mr-2" />
                    수정
                  </Button>
                  <Button size="sm" type="outline" onClick={() => handleDeleteCategoryBanner(banner)}>
                    <X className="size-4 mr-2" />
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === "blog" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">블로그/기사</h3>
            <Button type="primary" onClick={() => setAddBlogModal(true)}>
              <Plus className="size-4 mr-2" />
              게시물 작성
            </Button>
          </div>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-4 rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#0F172A] truncate max-w-[300px]" title={post.title}>{post.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[#64748B]">
                    <span className="truncate max-w-[100px]" title={post.category}>{post.category}</span>
                    <span>{post.date}</span>
                    <span className={post.status === "published" ? "text-green-600" : "text-yellow-600"}>
                      {post.status === "published" ? "발행됨" : "초안"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" type="outline">
                    <Edit className="size-4 mr-2" />
                    수정
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">FAQ</h3>
            <Button type="primary" onClick={() => setAddFAQModal(true)}>
              <Plus className="size-4 mr-2" />
              FAQ 추가
            </Button>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 rounded-lg border border-[#E2E8F0]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-xs px-2 py-1 rounded bg-[#F8FAFC] text-[#64748B] truncate max-w-[120px]" title={faq.category}>{faq.category}</span>
                    <h4 className="font-medium text-[#0F172A] mt-2 truncate max-w-[400px]" title={faq.question}>{faq.question}</h4>
                    <p className="text-sm text-[#64748B] mt-1 truncate max-w-[400px]" title={faq.answer}>{faq.answer}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" type="outline">
                      <Edit className="size-4" />
                    </Button>
                    <Button size="sm" type="outline" onClick={() => handleDeleteFAQ(faq)}>
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legal Tab */}
      {activeTab === "legal" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="space-y-4">
            {legalPages.map((page) => (
              <div key={page.id} className="p-4 rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#0F172A] truncate max-w-[300px]" title={page.title}>{page.title}</h4>
                  <p className="text-sm text-[#64748B] mt-1">마지막 수정: {page.lastUpdated}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" type="outline">
                    <Eye className="size-4 mr-2" />
                    보기
                  </Button>
                  <Button size="sm" type="outline">
                    <Edit className="size-4 mr-2" />
                    수정
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Banner Modal */}
      {addBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">배너 추가</h2>
              <button
                onClick={() => setAddBannerModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddBanner} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">제목</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">부제목 (선택사항)</label>
                <input
                  type="text"
                  name="subtitle"
                  placeholder="지금 프로젝트를 등록하고 재능 있는 프리랜서의 제안을 받아보세요."
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">배너 이미지 *</label>
                <input
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        const hiddenInput = document.querySelector('input[name="image"]') as HTMLInputElement;
                        if (hiddenInput) {
                          hiddenInput.value = dataUrl;
                        }
                        showToast("이미지가 업로드되었습니다.", "success");
                      } catch (error) {
                        showToast(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.", "error");
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
                <input type="hidden" name="image" />
                <p className="text-xs text-[#64748B] mt-1">JPG, PNG, GIF 파일만 업로드 가능 (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">링크 URL</label>
                <input
                  type="url"
                  name="url"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="active" id="active" defaultChecked className="rounded" />
                <label htmlFor="active" className="text-sm text-[#64748B]">
                  활성화
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setAddBannerModal(false)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  추가
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {editBannerModal.isOpen && editBannerModal.banner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">배너 수정</h2>
              <button
                onClick={() => setEditBannerModal({ isOpen: false, banner: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">제목</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editBannerModal.banner.title}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">부제목 (선택사항)</label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={editBannerModal.banner.subtitle || ""}
                  placeholder="지금 프로젝트를 등록하고 재능 있는 프리랜서의 제안을 받아보세요."
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">배너 이미지 *</label>
                {editBannerModal.banner.image && (
                  <div className="mb-2">
                    <img
                      src={editBannerModal.banner.image}
                      alt="현재 배너"
                      className="h-32 w-full object-cover rounded-lg border border-[#E2E8F0]"
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        const hiddenInput = document.querySelector('input[name="image"]') as HTMLInputElement;
                        if (hiddenInput) {
                          hiddenInput.value = dataUrl;
                        }
                        showToast("이미지가 업로드되었습니다.", "success");
                      } catch (error) {
                        showToast(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.", "error");
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
                <input type="hidden" name="image" defaultValue={editBannerModal.banner.image} />
                <p className="text-xs text-[#64748B] mt-1">JPG, PNG, GIF 파일만 업로드 가능 (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">링크 URL</label>
                <input
                  type="url"
                  name="url"
                  defaultValue={editBannerModal.banner.url}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  id="edit-active"
                  defaultChecked={editBannerModal.banner.active}
                  className="rounded"
                />
                <label htmlFor="edit-active" className="text-sm text-[#64748B]">
                  활성화
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditBannerModal({ isOpen: false, banner: null })}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  저장
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Blog Modal */}
      {addBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">블로그 게시물 작성</h2>
              <button
                onClick={() => setAddBlogModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">제목</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리</label>
                <input
                  type="text"
                  name="category"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setAddBlogModal(false)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  작성
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add FAQ Modal */}
      {addFAQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">FAQ 추가</h2>
              <button
                onClick={() => setAddFAQModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddFAQ} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리</label>
                <input
                  type="text"
                  name="category"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">질문</label>
                <input
                  type="text"
                  name="question"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">답변</label>
                <textarea
                  name="answer"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setAddFAQModal(false)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  추가
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Banner Modal */}
      <ConfirmModal
        isOpen={deleteBannerModal.isOpen}
        onClose={() => setDeleteBannerModal({ isOpen: false, banner: null })}
        onConfirm={confirmDeleteBanner}
        title="배너 삭제"
        message={deleteBannerModal.banner ? `${deleteBannerModal.banner.title} 배너를 삭제하시겠습니까?` : ""}
        confirmText="삭제"
      />

      {/* Add Category Banner Modal */}
      {addCategoryBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">카테고리 배너 추가</h2>
              <button
                onClick={() => setAddCategoryBannerModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddCategoryBanner} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">제목 *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">설명 *</label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">CTA 버튼 텍스트 *</label>
                <input
                  type="text"
                  name="cta"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">배지 텍스트 *</label>
                <input
                  type="text"
                  name="badge"
                  placeholder="LIMITED OFFER"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">그라디언트 클래스 *</label>
                <select
                  name="gradient"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                >
                  <option value="from-[#E8F1FF] to-[#D3E3FF]">파란색 (from-[#E8F1FF] to-[#D3E3FF])</option>
                  <option value="from-[#FFE8F1] to-[#FFD6E5]">분홍색 (from-[#FFE8F1] to-[#FFD6E5])</option>
                  <option value="from-[#E8F5E9] to-[#C8E6C9]">초록색 (from-[#E8F5E9] to-[#C8E6C9])</option>
                  <option value="from-[#FFF3E0] to-[#FFE0B2]">주황색 (from-[#FFF3E0] to-[#FFE0B2])</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">링크 URL (선택사항)</label>
                <input
                  type="url"
                  name="url"
                  placeholder="/design"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리 (선택사항)</label>
                <input
                  type="text"
                  name="category"
                  placeholder="design, development 등 (비워두면 모든 페이지)"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="active" id="category-active" defaultChecked className="rounded" />
                <label htmlFor="category-active" className="text-sm text-[#64748B]">
                  활성화
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setAddCategoryBannerModal(false)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  추가
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Banner Modal */}
      {editCategoryBannerModal.isOpen && editCategoryBannerModal.banner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">카테고리 배너 수정</h2>
              <button
                onClick={() => setEditCategoryBannerModal({ isOpen: false, banner: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCategoryBanner} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">제목 *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editCategoryBannerModal.banner.title}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">설명 *</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editCategoryBannerModal.banner.description}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">CTA 버튼 텍스트 *</label>
                <input
                  type="text"
                  name="cta"
                  defaultValue={editCategoryBannerModal.banner.cta}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">배지 텍스트 *</label>
                <input
                  type="text"
                  name="badge"
                  defaultValue={editCategoryBannerModal.banner.badge}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">그라디언트 클래스 *</label>
                <select
                  name="gradient"
                  defaultValue={editCategoryBannerModal.banner.gradient}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                >
                  <option value="from-[#E8F1FF] to-[#D3E3FF]">파란색 (from-[#E8F1FF] to-[#D3E3FF])</option>
                  <option value="from-[#FFE8F1] to-[#FFD6E5]">분홍색 (from-[#FFE8F1] to-[#FFD6E5])</option>
                  <option value="from-[#E8F5E9] to-[#C8E6C9]">초록색 (from-[#E8F5E9] to-[#C8E6C9])</option>
                  <option value="from-[#FFF3E0] to-[#FFE0B2]">주황색 (from-[#FFF3E0] to-[#FFE0B2])</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">링크 URL (선택사항)</label>
                <input
                  type="url"
                  name="url"
                  defaultValue={editCategoryBannerModal.banner.url || ""}
                  placeholder="/design"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리 (선택사항)</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editCategoryBannerModal.banner.category || ""}
                  placeholder="design, development 등 (비워두면 모든 페이지)"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  id="edit-category-active"
                  defaultChecked={editCategoryBannerModal.banner.active}
                  className="rounded"
                />
                <label htmlFor="edit-category-active" className="text-sm text-[#64748B]">
                  활성화
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditCategoryBannerModal({ isOpen: false, banner: null })}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1">
                  저장
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Banner Modal */}
      <ConfirmModal
        isOpen={deleteCategoryBannerModal.isOpen}
        onClose={() => setDeleteCategoryBannerModal({ isOpen: false, banner: null })}
        onConfirm={confirmDeleteCategoryBanner}
        title="카테고리 배너 삭제"
        message={deleteCategoryBannerModal.banner ? `${deleteCategoryBannerModal.banner.title} 배너를 삭제하시겠습니까?` : ""}
        confirmText="삭제"
      />

      {/* Delete FAQ Modal */}
      <ConfirmModal
        isOpen={deleteFAQModal.isOpen}
        onClose={() => setDeleteFAQModal({ isOpen: false, faq: null })}
        onConfirm={confirmDeleteFAQ}
        title="FAQ 삭제"
        message={deleteFAQModal.faq ? `이 FAQ를 삭제하시겠습니까?` : ""}
        confirmText="삭제"
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

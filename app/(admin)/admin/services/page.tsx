"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  X,
  CheckCircle2,
  Star,
  Package,
  Tag,
  Plus,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { ConfirmModal } from "@/components/page/admin/shared/ConfirmModal";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useHomeData, type HomeService } from "@/contexts/HomeDataContext";
import { useToast } from "@/hooks/useToast";

interface Service {
  id: number;
  title: string;
  seller: string;
  category: string;
  price: string;
  orders: number;
  rating: number;
  status: "approved" | "pending" | "rejected" | "hidden";
  featured: boolean;
  createdAt: string;
  imageUrl?: string;
  sellerAvatar?: string;
  description?: string;
}

const initialServices: Service[] = [
  {
    id: 1,
    title: "프리미엄 로고 디자인",
    seller: "최디자인",
    category: "로고 디자인",
    price: "₩250,000",
    orders: 234,
    rating: 4.9,
    status: "approved",
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "반응형 웹사이트 개발",
    seller: "정개발",
    category: "웹 개발",
    price: "₩1,500,000",
    orders: 89,
    rating: 4.7,
    status: "pending",
    featured: false,
    createdAt: "2024-03-10",
  },
  {
    id: 3,
    title: "영문 번역 서비스",
    seller: "강번역",
    category: "번역",
    price: "₩50,000",
    orders: 456,
    rating: 4.8,
    status: "approved",
    featured: false,
    createdAt: "2023-12-20",
  },
];

interface Category {
  id: string;
  name: string;
  image?: string;
  icon?: string;
}

const initialCategories: Category[] = [
  { id: "1", name: "로고 디자인", image: "/assets/icons/categories/design-branding.png" },
  { id: "2", name: "웹 개발", image: "/assets/icons/categories/IT & Development.png" },
  { id: "3", name: "번역", image: "/assets/icons/categories/translate.png" },
  { id: "4", name: "마케팅", image: "/assets/icons/categories/marketing.png" },
  { id: "5", name: "영상 편집", image: "/assets/icons/categories/video.png" },
  { id: "6", name: "글쓰기", image: "/assets/icons/categories/writing.png" },
];
const initialTags = ["React", "Vue", "Angular", "Node.js", "Python", "Java", "Figma", "Photoshop", "Illustrator"];

const CATEGORY_ICON_OPTIONS = [
  { label: "디자인 & 브랜딩", value: "/assets/icons/categories/design-branding.png" },
  { label: "IT & 개발", value: "/assets/icons/categories/IT & Development.png" },
  { label: "번역", value: "/assets/icons/categories/translate.png" },
  { label: "마케팅", value: "/assets/icons/categories/marketing.png" },
  { label: "영상/사진", value: "/assets/icons/categories/video.png" },
  { label: "글쓰기", value: "/assets/icons/categories/writing.png" },
  { label: "스타트업", value: "/assets/icons/categories/startup.png" },
  { label: "AI", value: "/assets/icons/categories/ai.png" },
  { label: "라이프스타일", value: "/assets/icons/categories/lifestyle.png" },
  { label: "법률", value: "/assets/icons/categories/legal.png" },
  { label: "커스텀", value: "/assets/icons/categories/custom.png" },
  { label: "자문", value: "/assets/icons/categories/advice.png" },
  { label: "전자책", value: "/assets/icons/categories/ebook.png" },
  { label: "커리어", value: "/assets/icons/categories/career.png" },
];

export default function ServicesManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("services");
  const { toast, showToast, hideToast } = useToast();
  const { services: homeServices, updateServices } = useHomeData();

  const [services, setServices] = useState<Service[]>(
    homeServices.length > 0
      ? homeServices.map((s) => ({
          id: s.id,
          title: s.title,
          seller: s.seller,
          category: s.category,
          price: s.price,
          orders: s.orders,
          rating: s.rating,
          status: s.status,
          featured: s.featured,
          createdAt: new Date().toISOString().split("T")[0],
        }))
      : initialServices
  );

  // Sync services to homepage on mount and when services change
  useEffect(() => {
    const approvedServices: HomeService[] = services
      .filter((s) => s.status === "approved")
      .map((s) => ({
        id: s.id,
        title: s.title,
        seller: s.seller,
        category: s.category,
        price: s.price,
        orders: s.orders,
        rating: s.rating,
        status: s.status,
        featured: s.featured,
      }));
    updateServices(approvedServices);
  }, [services, updateServices]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [tags, setTags] = useState<string[]>(initialTags);
  const { categories: homeCategories, updateCategories } = useHomeData();

  // Modal states
  const [viewModal, setViewModal] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null,
  });
  const [approveModal, setApproveModal] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null,
  });
  const [rejectModal, setRejectModal] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null,
  });
  const [featureModal, setFeatureModal] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null,
  });
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [editServiceModal, setEditServiceModal] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null,
  });
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState<{ isOpen: boolean; category: string; newName?: string }>({
    isOpen: false,
    category: "",
  });
  const [addTagModal, setAddTagModal] = useState(false);
  const [editTagModal, setEditTagModal] = useState<{ isOpen: boolean; tag: string; newName?: string }>({
    isOpen: false,
    tag: "",
  });
  const [deleteCategoryModal, setDeleteCategoryModal] = useState<{ isOpen: boolean; category: string }>({
    isOpen: false,
    category: "",
  });
  const [deleteTagModal, setDeleteTagModal] = useState<{ isOpen: boolean; tag: string }>({
    isOpen: false,
    tag: "",
  });
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [newCategoryImage, setNewCategoryImage] = useState<string>("");
  const [editCategoryImage, setEditCategoryImage] = useState<string>("");
  
  // File upload handlers
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

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || service.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Statistics
  const stats = {
    total: services.length,
    approved: services.filter((s) => s.status === "approved").length,
    pending: services.filter((s) => s.status === "pending").length,
    featured: services.filter((s) => s.featured).length,
  };

  // Service functions
  const handleAddService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newService: Service = {
      id: Date.now(),
      title: formData.get("title") as string,
      seller: formData.get("seller") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      orders: parseInt(formData.get("orders") as string) || 0,
      rating: parseFloat(formData.get("rating") as string) || 0,
      status: (formData.get("status") as Service["status"]) || "pending",
      featured: formData.get("featured") === "on",
      createdAt: new Date().toISOString().split("T")[0],
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      sellerAvatar: (formData.get("sellerAvatar") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    syncServicesToHomepage(updatedServices);
    showToast("서비스가 추가되었습니다. 홈페이지에 반영되었습니다.", "success");
    setAddServiceModal(false);
  };

  const handleEditService = (service: Service) => {
    setEditServiceModal({ isOpen: true, service });
  };

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editServiceModal.service) {
      const formData = new FormData(e.currentTarget);
      const updatedServices = services.map((s) =>
        s.id === editServiceModal.service!.id
          ? {
              ...s,
              title: formData.get("title") as string,
              seller: formData.get("seller") as string,
              category: formData.get("category") as string,
              price: formData.get("price") as string,
              orders: parseInt(formData.get("orders") as string) || s.orders,
              rating: parseFloat(formData.get("rating") as string) || s.rating,
              status: (formData.get("status") as Service["status"]) || s.status,
              featured: formData.get("featured") === "on",
              imageUrl: (formData.get("imageUrl") as string) || s.imageUrl,
              sellerAvatar: (formData.get("sellerAvatar") as string) || s.sellerAvatar,
              description: (formData.get("description") as string) || s.description,
            }
          : s
      );
      setServices(updatedServices);
      syncServicesToHomepage(updatedServices);
      showToast("서비스가 업데이트되었습니다. 홈페이지에 반영되었습니다.", "success");
      setEditServiceModal({ isOpen: false, service: null });
    }
  };

  const handleApprove = (service: Service) => {
    setApproveModal({ isOpen: true, service });
  };

  const confirmApprove = () => {
    if (approveModal.service) {
      const updatedServices = services.map((s) => (s.id === approveModal.service!.id ? { ...s, status: "approved" as const } : s));
      setServices(updatedServices);
      // Sync approved services with homepage
      syncServicesToHomepage(updatedServices);
      showToast("서비스가 승인되었습니다. 홈페이지에 반영되었습니다.", "success");
    }
    setApproveModal({ isOpen: false, service: null });
  };

  const handleReject = (service: Service) => {
    setRejectModal({ isOpen: true, service });
  };

  const confirmReject = () => {
    if (rejectModal.service) {
      const updatedServices = services.map((s) => (s.id === rejectModal.service!.id ? { ...s, status: "rejected" as const } : s));
      setServices(updatedServices);
      // Sync services with homepage (remove rejected ones)
      syncServicesToHomepage(updatedServices);
      showToast("서비스가 거부되었습니다. 홈페이지에서 제거되었습니다.", "success");
    }
    setRejectModal({ isOpen: false, service: null });
  };

  const handleFeature = (service: Service) => {
    setFeatureModal({ isOpen: true, service });
  };

  const confirmFeature = () => {
    if (featureModal.service) {
      const updatedServices = services.map((s) => (s.id === featureModal.service!.id ? { ...s, featured: !s.featured } : s));
      setServices(updatedServices);
      // Sync services with homepage
      syncServicesToHomepage(updatedServices);
      showToast(
        featureModal.service.featured
          ? "서비스가 추천에서 제거되었습니다. 홈페이지에 반영되었습니다."
          : "서비스가 추천되었습니다. 홈페이지에 반영되었습니다.",
        "success"
      );
    }
    setFeatureModal({ isOpen: false, service: null });
  };

  const handleHide = (service: Service) => {
    const updatedServices = services.map((s) => (s.id === service.id ? { ...s, status: "hidden" as const } : s));
    setServices(updatedServices);
    // Sync services with homepage (remove hidden ones)
    syncServicesToHomepage(updatedServices);
    showToast("서비스가 숨겨졌습니다. 홈페이지에서 제거되었습니다.", "success");
  };

  // Sync approved and featured services to homepage
  const syncServicesToHomepage = (serviceList: Service[]) => {
    const approvedServices: HomeService[] = serviceList
      .filter((s) => s.status === "approved")
      .map((s) => ({
        id: s.id,
        title: s.title,
        seller: s.seller,
        category: s.category,
        price: s.price,
        orders: s.orders,
        rating: s.rating,
        status: s.status,
        featured: s.featured,
        imageUrl: s.imageUrl,
        sellerAvatar: s.sellerAvatar,
        description: s.description,
      }));
    updateServices(approvedServices);
  };

  // Sync categories to homepage
  useEffect(() => {
    const homeCategoriesData = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      image: cat.image,
      icon: cat.icon,
    }));
    updateCategories(homeCategoriesData);
  }, [categories, updateCategories]);

  // Category functions
  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("category") as string;
    const image = newCategoryImage;
    const icon = formData.get("icon") as string;

    if (name && !categories.some((c) => c.name === name)) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name,
        image: image || undefined,
        icon: icon || undefined,
      };
      setCategories([...categories, newCategory]);
      showToast("카테고리가 추가되었습니다. 홈페이지에 반영되었습니다.", "success");
      setAddCategoryModal(false);
      setNewCategoryImage("");
    } else if (categories.some((c) => c.name === name)) {
      showToast("이미 존재하는 카테고리입니다.", "error");
    }
  };

  const handleEditCategory = (category: string) => {
    setEditCategoryModal({ isOpen: true, category, newName: category });
    const categoryData = categories.find((cat) => cat.name === category);
    setEditCategoryImage(categoryData?.image || "");
  };

  const handleSaveCategoryEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("category") as string;
    const image = editCategoryImage;
    const icon = formData.get("icon") as string;
    const oldName = editCategoryModal.category;

    if (newName && newName !== oldName) {
      if (categories.some((c) => c.name === newName && c.id !== categories.find((cat) => cat.name === oldName)?.id)) {
        showToast("이미 존재하는 카테고리 이름입니다.", "error");
        return;
      }
      // Update category in categories list
      const updatedCategories = categories.map((cat) =>
        cat.name === oldName
          ? { ...cat, name: newName, image: image || cat.image, icon: icon || cat.icon }
          : cat
      );
      setCategories(updatedCategories);

      // Update category name in all services
      const updatedServices = services.map((s) =>
        s.category === oldName ? { ...s, category: newName } : s
      );
      setServices(updatedServices);
      syncServicesToHomepage(updatedServices);

      showToast("카테고리가 수정되었습니다. 홈페이지에 반영되었습니다.", "success");
      setEditCategoryModal({ isOpen: false, category: "", newName: undefined });
      setEditCategoryImage("");
    } else if (newName === oldName) {
      // Update image/icon even if name hasn't changed
      const updatedCategories = categories.map((cat) =>
        cat.name === oldName ? { ...cat, image: image || cat.image, icon: icon || cat.icon } : cat
      );
      setCategories(updatedCategories);
      showToast("카테고리 이미지/아이콘이 업데이트되었습니다. 홈페이지에 반영되었습니다.", "success");
      setEditCategoryModal({ isOpen: false, category: "", newName: undefined });
      setEditCategoryImage("");
    }
  };

  const handleDeleteCategory = (category: string) => {
    setDeleteCategoryModal({ isOpen: true, category });
  };

  const confirmDeleteCategory = () => {
    setCategories(categories.filter((c) => c.name !== deleteCategoryModal.category));
    showToast("카테고리가 삭제되었습니다. 홈페이지에서 제거되었습니다.", "success");
    setDeleteCategoryModal({ isOpen: false, category: "" });
  };

  // Tag functions
  const handleAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tag = formData.get("tag") as string;
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      showToast("태그가 추가되었습니다.", "success");
      setAddTagModal(false);
    } else if (tags.includes(tag)) {
      showToast("이미 존재하는 태그입니다.", "error");
    }
  };

  const handleEditTag = (tag: string) => {
    setEditTagModal({ isOpen: true, tag, newName: tag });
  };

  const handleSaveTagEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("tag") as string;
    const oldName = editTagModal.tag;

    if (newName && newName !== oldName) {
      if (tags.includes(newName)) {
        showToast("이미 존재하는 태그 이름입니다.", "error");
        return;
      }
      const updatedTags = tags.map((t) => (t === oldName ? newName : t));
      setTags(updatedTags);
      showToast("태그가 수정되었습니다.", "success");
      setEditTagModal({ isOpen: false, tag: "", newName: undefined });
    }
  };

  const handleDeleteTag = (tag: string) => {
    setDeleteTagModal({ isOpen: true, tag });
  };

  const confirmDeleteTag = () => {
    setTags(tags.filter((t) => t !== deleteTagModal.tag));
    showToast("태그가 삭제되었습니다.", "success");
    setDeleteTagModal({ isOpen: false, tag: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-[#0F172A]">서비스 관리</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">모든 서비스를 검토하고 관리하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1">
          {[
            { id: "services", label: "모든 서비스", icon: Package },
            { id: "categories", label: "카테고리", icon: Tag },
            { id: "tags", label: "태그/스킬", icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#2E5E99] text-white"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                <Icon className="size-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Statistics Cards */}
      {activeTab === "services" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B] mb-1">전체 서비스</p>
                <p className="text-2xl font-bold text-[#0F172A]">{stats.total}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Package className="size-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B] mb-1">승인됨</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B] mb-1">대기 중</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <X className="size-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B] mb-1">추천 서비스</p>
                <p className="text-2xl font-bold text-purple-600">{stats.featured}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Star className="size-6 text-purple-600 fill-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {activeTab === "services" && (
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
                placeholder="서비스 제목, 판매자, 카테고리로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">모든 카테고리</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="all">모든 상태</option>
            <option value="approved">승인됨</option>
            <option value="pending">대기 중</option>
            <option value="rejected">거부됨</option>
            <option value="hidden">숨김</option>
          </select>
            <div className="flex gap-2">
              <Button
                type={viewMode === "table" ? "default" : "outline"}
                onClick={() => setViewMode("table")}
                size="sm"
              >
                목록
              </Button>
              <Button
                type={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                size="sm"
              >
                카드
          </Button>
        </div>
            <Button type="primary" onClick={() => setAddServiceModal(true)}>
              <Plus className="size-4 mr-2" />
              서비스 추가
            </Button>
      </div>
        </div>
      )}

      {/* Services Table/Grid */}
      {activeTab === "services" && (
        <>
          {viewMode === "table" ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8FAFC]">
                <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">
                        <input
                          type="checkbox"
                          checked={selectedServices.length === filteredServices.length && filteredServices.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices(filteredServices.map((s) => s.id));
                            } else {
                              setSelectedServices([]);
                            }
                          }}
                          className="rounded"
                        />
                      </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">서비스</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">판매자</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">카테고리</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">가격</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">주문</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">평점</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F172A]">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredServices.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-8 text-center text-[#64748B]">
                          검색 결과가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-[#F8FAFC]">
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedServices([...selectedServices, service.id]);
                                } else {
                                  setSelectedServices(selectedServices.filter((id) => id !== service.id));
                                }
                              }}
                              className="rounded"
                            />
                          </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-[#0F172A]">{service.title}</div>
                      {service.featured && (
                        <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          추천
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{service.seller}</td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">{service.category}</td>
                    <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{service.price}</td>
                    <td className="px-4 py-4 text-sm text-[#0F172A]">{service.orders}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-[#0F172A]">{service.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {service.status === "approved" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle2 className="size-3 mr-1" />
                          승인됨
                        </span>
                      ) : service.status === "pending" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          대기 중
                        </span>
                      ) : service.status === "rejected" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          거부됨
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          숨김
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewModal({ isOpen: true, service })}
                          className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                          title="보기"
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
                          title="수정"
                        >
                          <Edit className="size-4" />
                        </button>
                        {service.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(service)}
                              className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                              title="승인"
                            >
                              <CheckCircle2 className="size-4" />
                            </button>
                            <button
                              onClick={() => handleReject(service)}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                              title="거부"
                            >
                              <X className="size-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleFeature(service)}
                          className={`p-2 rounded-lg ${
                            service.featured
                              ? "bg-yellow-50 text-yellow-600"
                              : "hover:bg-yellow-50 text-yellow-600"
                          }`}
                          title={service.featured ? "추천 해제" : "추천"}
                        >
                          <Star className={`size-4 ${service.featured ? "fill-yellow-500" : ""}`} />
                        </button>
                        {service.status === "approved" && (
                          <button
                            onClick={() => handleHide(service)}
                            className="p-2 rounded-lg hover:bg-gray-50 text-gray-600"
                            title="숨기기"
                          >
                            <X className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                    ))
                    )}
              </tbody>
            </table>
              </div>
              {selectedServices.length > 0 && (
                <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">{selectedServices.length}개 선택됨</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      type="outline"
                      onClick={() => {
                        const updatedServices = services.map((s) =>
                          selectedServices.includes(s.id) ? { ...s, status: "approved" as const } : s
                        );
                        setServices(updatedServices);
                        syncServicesToHomepage(updatedServices);
                        setSelectedServices([]);
                        showToast(`${selectedServices.length}개 서비스가 승인되었습니다.`, "success");
                      }}
                    >
                      일괄 승인
                    </Button>
                    <Button
                      size="sm"
                      type="outline"
                      onClick={() => {
                        const updatedServices = services.map((s) =>
                          selectedServices.includes(s.id) ? { ...s, featured: true } : s
                        );
                        setServices(updatedServices);
                        syncServicesToHomepage(updatedServices);
                        setSelectedServices([]);
                        showToast(`${selectedServices.length}개 서비스가 추천되었습니다.`, "success");
                      }}
                    >
                      일괄 추천
                    </Button>
          </div>
        </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.length === 0 ? (
                <div className="col-span-full text-center py-12 text-[#64748B]">검색 결과가 없습니다.</div>
              ) : (
                filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-[#0F172A] mb-2">{service.title}</h3>
                        <p className="text-sm text-[#64748B]">{service.seller}</p>
                      </div>
                      {service.featured && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          추천
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">카테고리</span>
                        <span className="text-[#0F172A] font-medium">{service.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">가격</span>
                        <span className="text-[#0F172A] font-bold">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">주문</span>
                        <span className="text-[#0F172A]">{service.orders}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">평점</span>
                        <div className="flex items-center gap-1">
                          <Star className="size-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-[#0F172A]">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      {service.status === "approved" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle2 className="size-3 mr-1" />
                          승인됨
                        </span>
                      ) : service.status === "pending" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          대기 중
                        </span>
                      ) : service.status === "rejected" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          거부됨
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          숨김
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        type="outline"
                        onClick={() => setViewModal({ isOpen: true, service })}
                        className="flex-1"
                      >
                        <Eye className="size-4 mr-1" />
                        보기
                      </Button>
                      <Button
                        size="sm"
                        type="outline"
                        onClick={() => handleEditService(service)}
                        className="flex-1"
                      >
                        <Edit className="size-4 mr-1" />
                        수정
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A]">카테고리 관리</h3>
            <Button
              type="primary"
              onClick={() => {
                setNewCategoryImage(CATEGORY_ICON_OPTIONS[0]?.value || "");
                setAddCategoryModal(true);
              }}
            >
              <Plus className="size-4 mr-2" />
              카테고리 추가
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const serviceCount = services.filter((s) => s.category === category.name).length;
              return (
                <div
                  key={category.id}
                  className="p-4 rounded-lg border border-[#E2E8F0] hover:border-[#2E5E99] transition-colors bg-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="size-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#2E5E99]/10 to-[#2E5E99]/5">
                          <Tag className="size-6 text-[#2E5E99]" />
                        </div>
                      )}
                      <h4 className="font-medium text-[#0F172A]">{category.name}</h4>
                    </div>
                  <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category.name)}
                        className="p-1 rounded hover:bg-[#F8FAFC] text-[#64748B] transition-colors"
                        title="수정"
                      >
                      <Edit className="size-4" />
                    </button>
                      <button
                        onClick={() => handleDeleteCategory(category.name)}
                        className="p-1 rounded hover:bg-red-50 text-red-600 transition-colors"
                        title="삭제"
                      >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
                  <p className="text-sm text-[#64748B]">서비스: {serviceCount}개</p>
              </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags Tab */}
      {activeTab === "tags" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
            <h3 className="text-lg font-bold text-[#0F172A]">태그/스킬 관리</h3>
              <p className="text-sm text-[#64748B] mt-1">총 {tags.length}개 태그</p>
            </div>
            <Button type="primary" onClick={() => setAddTagModal(true)}>
              <Plus className="size-4 mr-2" />
              태그 추가
            </Button>
          </div>
          {tags.length === 0 ? (
            <div className="text-center py-12 text-[#64748B]">
              <Tag className="size-12 mx-auto mb-4 text-[#CBD5E1]" />
              <p>등록된 태그가 없습니다.</p>
              <Button type="primary" onClick={() => setAddTagModal(true)} className="mt-4">
                <Plus className="size-4 mr-2" />
                첫 태그 추가
              </Button>
            </div>
          ) : (
          <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2E5E99] transition-colors"
                >
                  <Tag className="size-4 text-[#2E5E99]" />
                  <span className="text-sm font-medium text-[#0F172A]">{tag}</span>
                  <button
                    onClick={() => handleEditTag(tag)}
                    className="p-1 rounded hover:bg-[#F8FAFC] text-[#64748B] transition-colors"
                    title="수정"
                  >
                    <Edit className="size-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteTag(tag)}
                    className="p-1 rounded hover:bg-red-100 text-red-600 transition-colors"
                    title="삭제"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Service Modal */}
      {addServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">서비스 추가</h2>
              <button
                onClick={() => setAddServiceModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">서비스 제목 *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">판매자 *</label>
                  <input
                    type="text"
                    name="seller"
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리 *</label>
                  <select
                    name="category"
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                    required
                  >
                    <option value="">선택하세요</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">가격 *</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="₩250,000"
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">평점</label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    defaultValue="4.5"
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">주문 수</label>
                  <input
                    type="number"
                    name="orders"
                    min="0"
                    defaultValue="0"
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">상태</label>
                  <select
                    name="status"
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  >
                    <option value="pending">대기 중</option>
                    <option value="approved">승인됨</option>
                    <option value="rejected">거부됨</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">서비스 이미지</label>
                <input
                  type="file"
                  name="serviceImage"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        const hiddenInput = document.querySelector('input[name="imageUrl"]') as HTMLInputElement;
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
                <input type="hidden" name="imageUrl" />
                <p className="text-xs text-[#64748B] mt-1">JPG, PNG, GIF 파일만 업로드 가능 (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">판매자 아바타</label>
                <input
                  type="file"
                  name="sellerAvatarFile"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        const hiddenInput = document.querySelector('input[name="sellerAvatar"]') as HTMLInputElement;
                        if (hiddenInput) {
                          hiddenInput.value = dataUrl;
                        }
                        showToast("아바타가 업로드되었습니다.", "success");
                      } catch (error) {
                        showToast(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.", "error");
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
                <input type="hidden" name="sellerAvatar" />
                <p className="text-xs text-[#64748B] mt-1">JPG, PNG, GIF 파일만 업로드 가능 (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">설명 (선택사항)</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="서비스에 대한 상세 설명을 입력하세요..."
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none resize-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="featured" id="add-featured" className="rounded" />
                <label htmlFor="add-featured" className="text-sm text-[#64748B]">
                  추천 서비스로 설정
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="outline" onClick={() => setAddServiceModal(false)} className="flex-1">
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

      {/* Edit Service Modal */}
      {editServiceModal.isOpen && editServiceModal.service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">서비스 수정</h2>
              <button
                onClick={() => setEditServiceModal({ isOpen: false, service: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
    </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">서비스 제목 *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editServiceModal.service.title}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">판매자 *</label>
                  <input
                    type="text"
                    name="seller"
                    defaultValue={editServiceModal.service.seller}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리 *</label>
                  <select
                    name="category"
                    defaultValue={editServiceModal.service.category}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">가격 *</label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={editServiceModal.service.price}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">평점</label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    defaultValue={editServiceModal.service.rating}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">주문 수</label>
                  <input
                    type="number"
                    name="orders"
                    min="0"
                    defaultValue={editServiceModal.service.orders}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">상태</label>
                  <select
                    name="status"
                    defaultValue={editServiceModal.service.status}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  >
                    <option value="pending">대기 중</option>
                    <option value="approved">승인됨</option>
                    <option value="rejected">거부됨</option>
                    <option value="hidden">숨김</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">서비스 이미지</label>
                {editServiceModal.service.imageUrl && (
                  <div className="mb-2">
                    <img
                      src={editServiceModal.service.imageUrl}
                      alt="현재 이미지"
                      className="h-24 w-24 object-cover rounded-lg border border-[#E2E8F0]"
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="serviceImage"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        const hiddenInput = document.querySelector('input[name="imageUrl"]') as HTMLInputElement;
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
                <input type="hidden" name="imageUrl" defaultValue={editServiceModal.service.imageUrl || ""} />
                <p className="text-xs text-[#64748B] mt-1">JPG, PNG, GIF 파일만 업로드 가능 (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">판매자 아바타</label>
                {editServiceModal.service.sellerAvatar && (
                  <div className="mb-2">
                    <img
                      src={editServiceModal.service.sellerAvatar}
                      alt="현재 아바타"
                      className="h-16 w-16 object-cover rounded-full border border-[#E2E8F0]"
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="sellerAvatarFile"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        const hiddenInput = document.querySelector('input[name="sellerAvatar"]') as HTMLInputElement;
                        if (hiddenInput) {
                          hiddenInput.value = dataUrl;
                        }
                        showToast("아바타가 업로드되었습니다.", "success");
                      } catch (error) {
                        showToast(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.", "error");
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
                <input type="hidden" name="sellerAvatar" defaultValue={editServiceModal.service.sellerAvatar || ""} />
                <p className="text-xs text-[#64748B] mt-1">JPG, PNG, GIF 파일만 업로드 가능 (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">설명 (선택사항)</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editServiceModal.service.description || ""}
                  placeholder="서비스에 대한 상세 설명을 입력하세요..."
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none resize-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="edit-featured"
                  defaultChecked={editServiceModal.service.featured}
                  className="rounded"
                />
                <label htmlFor="edit-featured" className="text-sm text-[#64748B]">
                  추천 서비스로 설정
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditServiceModal({ isOpen: false, service: null })}
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

      {/* View Service Modal */}
      {viewModal.isOpen && viewModal.service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">서비스 상세 정보</h2>
              <button
                onClick={() => setViewModal({ isOpen: false, service: null })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-[#64748B]">제목</label>
                <p className="text-[#0F172A] font-medium">{viewModal.service.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">판매자</label>
                  <p className="text-[#0F172A]">{viewModal.service.seller}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">카테고리</label>
                  <p className="text-[#0F172A]">{viewModal.service.category}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">가격</label>
                  <p className="text-[#0F172A] font-medium">{viewModal.service.price}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">평점</label>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-[#0F172A]">{viewModal.service.rating}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">주문 수</label>
                  <p className="text-[#0F172A]">{viewModal.service.orders}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">상태</label>
                  {viewModal.service.status === "approved" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      승인됨
                    </span>
                  ) : viewModal.service.status === "pending" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      대기 중
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      거부됨
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">생성일</label>
                  <p className="text-[#0F172A]">{viewModal.service.createdAt}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#64748B]">추천</label>
                  <p className="text-[#0F172A]">{viewModal.service.featured ? "예" : "아니오"}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
              <Button
                type="outline"
                onClick={() => {
                  setViewModal({ isOpen: false, service: null });
                  handleEditService(viewModal.service!);
                }}
                className="flex-1"
              >
                <Edit className="size-4 mr-2" />
                수정
              </Button>
              <Button
                type="default"
                onClick={() => setViewModal({ isOpen: false, service: null })}
                className="flex-1"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {addCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">카테고리 추가</h2>
              <button
                onClick={() => {
                  setAddCategoryModal(false);
                  setNewCategoryImage("");
                }}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리 이름 *</label>
                <input
                  type="text"
                  name="category"
                  placeholder="예: 로고 디자인"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">이미지 업로드</label>
                {newCategoryImage && (
                  <div className="mb-3 flex items-center gap-3 rounded-lg border border-[#E2E8F0] p-3">
                    <img src={newCategoryImage} alt="선택된 이미지" className="size-16 rounded-lg object-cover" />
                    <Button type="outline" size="sm" onClick={() => setNewCategoryImage("")}>
                      초기화
                    </Button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        setNewCategoryImage(dataUrl);
                        showToast("이미지가 업로드되었습니다.", "success");
                      } catch (error) {
                        showToast(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.", "error");
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
                <p className="text-xs text-[#64748B] mt-1">JPG, PNG, GIF (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">기존 아이콘 선택</label>
                <p className="text-xs text-[#94A3B8] mb-2">public/assets/icons/categories 폴더의 아이콘을 빠르게 적용해보세요.</p>
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto sm:grid-cols-3">
                  {CATEGORY_ICON_OPTIONS.map((icon) => (
                    <button
                      type="button"
                      key={icon.value}
                      onClick={() => setNewCategoryImage(icon.value)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                        newCategoryImage === icon.value ? "border-[#2E5E99] bg-[#EFF4FF]" : "border-[#E2E8F0] hover:border-[#2E5E99]"
                      }`}
                    >
                      <img src={icon.value} alt={icon.label} className="size-8 rounded-md object-cover" />
                      <span className="font-medium text-[#0F172A]">{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">아이콘 이름 (선택사항)</label>
                <input
                  type="text"
                  name="icon"
                  placeholder="예: palette, laptopCode, cameraAudio"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
                <p className="text-xs text-[#64748B] mt-1">이미지가 없을 때 사용할 Lucide 아이콘 이름입니다.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => {
                    setAddCategoryModal(false);
                    setNewCategoryImage("");
                  }}
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

      {/* Edit Category Modal */}
      {editCategoryModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">카테고리 수정</h2>
              <button
                onClick={() => {
                  setEditCategoryModal({ isOpen: false, category: "", newName: undefined });
                  setEditCategoryImage("");
                }}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCategoryEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">현재 카테고리</label>
                <input
                  type="text"
                  value={editCategoryModal.category}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">새 카테고리 이름 *</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editCategoryModal.newName || editCategoryModal.category}
                  placeholder="예: 로고 디자인"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
                <p className="text-xs text-[#64748B] mt-1">
                  ⚠️ 카테고리 이름을 변경하면 관련된 모든 서비스의 카테고리도 업데이트됩니다.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">카테고리 이미지 (선택사항)</label>
                {editCategoryImage && (
                  <div className="mb-3 flex items-center gap-3 rounded-lg border border-[#E2E8F0] p-3">
                    <img src={editCategoryImage} alt="현재 이미지" className="size-16 rounded-lg object-cover" />
                    <Button type="outline" size="sm" onClick={() => setEditCategoryImage("")}>
                      초기화
                    </Button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await handleFileUpload(file);
                        setEditCategoryImage(dataUrl);
                        showToast("이미지가 업로드되었습니다.", "success");
                      } catch (error) {
                        showToast(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.", "error");
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
                <p className="text-xs text-[#64748B] mt-1">홈페이지 카테고리 슬라이드에 표시됩니다. JPG, PNG, GIF 파일만 업로드 가능 (최대 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">기존 아이콘 선택</label>
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto sm:grid-cols-3">
                  {CATEGORY_ICON_OPTIONS.map((icon) => (
                    <button
                      type="button"
                      key={icon.value}
                      onClick={() => setEditCategoryImage(icon.value)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                        editCategoryImage === icon.value ? "border-[#2E5E99] bg-[#EFF4FF]" : "border-[#E2E8F0] hover:border-[#2E5E99]"
                      }`}
                    >
                      <img src={icon.value} alt={icon.label} className="size-8 rounded-md object-cover" />
                      <span className="font-medium text-[#0F172A]">{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">아이콘 이름 (선택사항)</label>
                <input
                  type="text"
                  name="icon"
                  defaultValue={categories.find((c) => c.name === editCategoryModal.category)?.icon || ""}
                  placeholder="예: palette, laptopCode, cameraAudio"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                />
                <p className="text-xs text-[#64748B] mt-1">이미지가 없을 때 사용할 Lucide 아이콘 이름입니다.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => {
                    setEditCategoryModal({ isOpen: false, category: "", newName: undefined });
                    setEditCategoryImage("");
                  }}
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

      {/* Add Tag Modal */}
      {addTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">태그 추가</h2>
              <button
                onClick={() => setAddTagModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddTag} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">태그 이름</label>
                <input
                  type="text"
                  name="tag"
                  placeholder="예: React, Vue, Angular"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setAddTagModal(false)}
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

      {/* Edit Tag Modal */}
      {editTagModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">태그 수정</h2>
              <button
                onClick={() => setEditTagModal({ isOpen: false, tag: "", newName: undefined })}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSaveTagEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">현재 태그</label>
                <input
                  type="text"
                  value={editTagModal.tag}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">새 태그 이름 *</label>
                <input
                  type="text"
                  name="tag"
                  defaultValue={editTagModal.newName || editTagModal.tag}
                  placeholder="예: React, Vue, Angular"
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="outline"
                  onClick={() => setEditTagModal({ isOpen: false, tag: "", newName: undefined })}
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

      {/* Approve Modal */}
      <ConfirmModal
        isOpen={approveModal.isOpen}
        onClose={() => setApproveModal({ isOpen: false, service: null })}
        onConfirm={confirmApprove}
        title="서비스 승인"
        message={approveModal.service ? `${approveModal.service.title} 서비스를 승인하시겠습니까?` : ""}
        confirmText="승인"
        type="info"
      />

      {/* Reject Modal */}
      <ConfirmModal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, service: null })}
        onConfirm={confirmReject}
        title="서비스 거부"
        message={rejectModal.service ? `${rejectModal.service.title} 서비스를 거부하시겠습니까?` : ""}
        confirmText="거부"
        type="warning"
      />

      {/* Feature Modal */}
      <ConfirmModal
        isOpen={featureModal.isOpen}
        onClose={() => setFeatureModal({ isOpen: false, service: null })}
        onConfirm={confirmFeature}
        title={featureModal.service?.featured ? "추천 해제" : "서비스 추천"}
        message={
          featureModal.service
            ? `${featureModal.service.title} 서비스를 ${featureModal.service.featured ? "추천에서 제거" : "추천"}하시겠습니까?`
            : ""
        }
        confirmText={featureModal.service?.featured ? "해제" : "추천"}
        type="info"
      />

      {/* Delete Category Modal */}
      <ConfirmModal
        isOpen={deleteCategoryModal.isOpen}
        onClose={() => setDeleteCategoryModal({ isOpen: false, category: "" })}
        onConfirm={confirmDeleteCategory}
        title="카테고리 삭제"
        message={`${deleteCategoryModal.category} 카테고리를 삭제하시겠습니까?`}
        confirmText="삭제"
      />

      {/* Delete Tag Modal */}
      <ConfirmModal
        isOpen={deleteTagModal.isOpen}
        onClose={() => setDeleteTagModal({ isOpen: false, tag: "" })}
        onConfirm={confirmDeleteTag}
        title="태그 삭제"
        message={`${deleteTagModal.tag} 태그를 삭제하시겠습니까?`}
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

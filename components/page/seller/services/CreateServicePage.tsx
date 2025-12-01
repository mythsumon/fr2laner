"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, Check, X, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/common";
import { useAuth } from "@/hooks/useAuth";

type Step = 1 | 2 | 3 | 4;

interface PackageData {
  title: string;
  description: string;
  deliveryDays: number;
  revisions: number;
  price: number;
  extras: string[];
}

export const CreateServicePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    skills: [] as string[],
    coverPhoto: null as File | null,
    gallery: [] as File[],
    description: "",
    faqs: [] as { question: string; answer: string }[],
    tags: [] as string[],
    packages: [
      { title: "Basic", description: "", deliveryDays: 3, revisions: 1, price: 0, extras: [] },
      { title: "Standard", description: "", deliveryDays: 5, revisions: 3, price: 0, extras: [] },
      { title: "Premium", description: "", deliveryDays: 7, revisions: 999, price: 0, extras: [] },
    ] as PackageData[],
    requirements: [] as { type: "text" | "file" | "multiple"; question: string; options?: string[] }[],
  });

  // Load available tags from localStorage (admin managed tags)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_service_tags");
      if (stored) {
        try {
          const tags: string[] = JSON.parse(stored);
          setAvailableTags(tags);
        } catch (e) {
          console.warn("Failed to parse admin tags", e);
        }
      }
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "admin_service_tags" && e.newValue) {
        try {
          const tags: string[] = JSON.parse(e.newValue);
          setAvailableTags(tags);
        } catch (e) {
          console.warn("Failed to parse admin tags", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Filter available tags based on input
  const filteredTags = useMemo(() => {
    if (!tagInput.trim()) return availableTags.filter((tag) => !formData.tags.includes(tag));
    return availableTags
      .filter((tag) => tag.toLowerCase().includes(tagInput.toLowerCase()) && !formData.tags.includes(tag))
      .slice(0, 10);
  }, [tagInput, availableTags, formData.tags]);

  const steps = [
    { number: 1, title: "기본 정보" },
    { number: 2, title: "상세 설명" },
    { number: 3, title: "패키지 설정" },
    { number: 4, title: "요구사항" },
  ];

  const categories = [
    "디자인 & 브랜딩",
    "IT · 프로그래밍",
    "영상 · 사진 · 음향",
    "마케팅 · 광고",
    "문서 · 글쓰기",
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    } else {
      handlePublish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  // Convert cover photo to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
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

  const handlePublish = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      alert("서비스 제목을 입력해주세요.");
      return;
    }
    if (!formData.category) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    if (formData.packages.length === 0 || formData.packages.every((p) => p.price === 0)) {
      alert("최소 하나의 패키지에 가격을 설정해주세요.");
      return;
    }
    if (!formData.coverPhoto) {
      alert("커버 사진을 업로드해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert cover photo to base64
      let imageUrl = "";
      if (formData.coverPhoto) {
        imageUrl = await convertFileToBase64(formData.coverPhoto);
      }

      // Get minimum price from packages
      const minPrice = Math.min(...formData.packages.map((p) => p.price).filter((p) => p > 0));
      const priceString = `₩${minPrice.toLocaleString()}${formData.packages.length > 1 ? "부터" : ""}`;

      // Create service object matching admin Service interface
      const newService = {
        id: Date.now(), // Generate unique ID
        title: formData.title,
        seller: user.name || "Seller",
        category: formData.category,
        price: priceString,
        orders: 0,
        rating: 0,
        status: "pending" as const, // New services start as pending
        featured: false,
        createdAt: new Date().toISOString().split("T")[0],
        imageUrl: imageUrl,
        sellerAvatar: "", // Can be added later from user profile
        description: formData.description || "",
        tags: formData.tags || [],
        // Additional seller-specific data
        skills: formData.skills || [],
        packages: formData.packages || [],
        faqs: formData.faqs || [],
        requirements: formData.requirements || [],
        gallery: [] as string[], // Can be converted from gallery files if needed
      };

      // Save to localStorage for admin services
      if (typeof window !== "undefined") {
        const existingServices = localStorage.getItem("admin_services");
        const services = existingServices ? JSON.parse(existingServices) : [];
        services.push(newService);
        localStorage.setItem("admin_services", JSON.stringify(services));

        // Also save to seller's own services list
        const sellerServices = localStorage.getItem(`seller_services_${user.id}`) || "[]";
        const myServices = JSON.parse(sellerServices);
        myServices.push({
          ...newService,
          sellerId: user.id,
        });
        localStorage.setItem(`seller_services_${user.id}`, JSON.stringify(myServices));

        // Trigger storage event to notify admin page
        window.dispatchEvent(new StorageEvent("storage", {
          key: "admin_services",
          newValue: JSON.stringify(services),
        }));
      }

      alert("서비스가 등록되었습니다. 관리자 승인 후 게시됩니다.");
      router.push("/expert/services");
    } catch (error) {
      console.error("Failed to publish service:", error);
      alert(error instanceof Error ? error.message : "서비스 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const updateFAQ = (index: number, field: "question" | "answer", value: string) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link href="/expert/services">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#475569] transition-colors hover:bg-[#F1F5F9]"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="size-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">서비스 등록</h1>
          <p className="mt-1 text-sm text-[#475569]">단계별로 서비스를 등록하세요</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-full gap-2 sm:gap-4">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <div
                key={step.number}
                className="flex min-w-[120px] flex-1 items-center gap-2 sm:min-w-[150px]"
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-all sm:size-10 ${
                    isCompleted
                      ? "border-[#2E5E99] bg-[#2E5E99] text-white"
                      : isActive
                      ? "border-[#2E5E99] bg-[#2E5E99] text-white"
                      : "border-[#E2E8F0] bg-white text-[#94A3B8]"
                  }`}
                >
                  {isCompleted ? <Check className="size-5" /> : step.number}
                </div>
                <div className="min-w-0">
                  <div className="hidden text-xs font-medium text-[#94A3B8] sm:block">단계 {step.number}</div>
                  <div
                    className={`truncate text-xs font-semibold sm:text-sm ${
                      isActive || isCompleted ? "text-[#0F172A]" : "text-[#94A3B8]"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden h-0.5 flex-1 sm:block ${
                      isCompleted ? "bg-[#2E5E99]" : "bg-[#E2E8F0]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  서비스 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="예: 프리미엄 로고 디자인 서비스"
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#0F172A] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">스킬</label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-full bg-[#2E5E99]/10 px-3 py-1 text-sm font-medium text-[#2E5E99]"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-[#1d4673]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="스킬 입력 후 Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.currentTarget;
                      if (input.value.trim()) {
                        addSkill(input.value.trim());
                        input.value = "";
                      }
                    }
                  }}
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  대표 이미지 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  {formData.coverPhoto ? (
                    <div className="relative size-32 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={URL.createObjectURL(formData.coverPhoto)}
                        alt="Cover"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, coverPhoto: null }))}
                        className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex size-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#CBD5F5] bg-[#F8FAFC] text-sm text-[#475569] transition-colors hover:border-[#2E5E99] hover:bg-[#E9EEF8]">
                      <Plus className="mb-1 size-6" />
                      <span>업로드</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData((prev) => ({ ...prev, coverPhoto: file }));
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  갤러리 이미지 (3-6개)
                </label>
                <div className="flex flex-wrap gap-4">
                  {formData.gallery.map((img, index) => (
                    <div key={index} className="relative size-24 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Gallery ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            gallery: prev.gallery.filter((_, i) => i !== index),
                          }))
                        }
                        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                  {formData.gallery.length < 6 && (
                    <label className="flex size-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#CBD5F5] bg-[#F8FAFC] text-xs text-[#475569] transition-colors hover:border-[#2E5E99] hover:bg-[#E9EEF8]">
                      <Plus className="mb-1 size-4" />
                      <span>추가</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setFormData((prev) => ({
                            ...prev,
                            gallery: [...prev.gallery, ...files].slice(0, 6),
                          }));
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  상세 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="서비스를 자세히 설명해주세요..."
                  rows={10}
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#0F172A]">자주 묻는 질문 (FAQ)</label>
                  <Button
                    type="default"
                    size="small"
                    shape="round"
                    onClick={addFAQ}
                    className="gap-1 bg-[#2E5E99]/10 text-xs font-semibold text-[#2E5E99] hover:bg-[#2E5E99]/20"
                  >
                    <Plus className="size-3" />
                    추가
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#475569]">질문 {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeFAQ(index)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          삭제
                        </button>
                      </div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, "question", e.target.value)}
                        placeholder="질문을 입력하세요"
                        className="mb-2 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                        placeholder="답변을 입력하세요"
                        rows={2}
                        className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">태그</label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-[#E9EEF8] px-3 py-1 text-sm font-medium text-[#2E5E99]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
                        }
                        className="hover:text-[#1d4673]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                <input
                  type="text"
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                      setShowTagSuggestions(true);
                    }}
                    onFocus={() => setShowTagSuggestions(true)}
                    onBlur={() => {
                      // Delay to allow click on suggestion
                      setTimeout(() => setShowTagSuggestions(false), 200);
                    }}
                    placeholder="태그 입력 또는 선택 (Enter로 추가)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
                        setFormData((prev) => ({
                          ...prev,
                            tags: [...prev.tags, tagInput.trim()],
                        }));
                          setTagInput("");
                          setShowTagSuggestions(false);
                      }
                    }
                  }}
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                />
                  {showTagSuggestions && filteredTags.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white shadow-lg max-h-48 overflow-y-auto">
                      {filteredTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (!formData.tags.includes(tag)) {
                              setFormData((prev) => ({
                                ...prev,
                                tags: [...prev.tags, tag],
                              }));
                            }
                            setTagInput("");
                            setShowTagSuggestions(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {availableTags.length > 0 && (
                  <p className="mt-2 text-xs text-[#64748B]">
                    관리자 태그 {availableTags.length}개 중에서 선택하거나 직접 입력할 수 있습니다.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Pricing Packages */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <p className="text-sm text-[#475569]">서비스 패키지를 설정하세요</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {formData.packages.map((pkg, index) => (
                  <div key={index} className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">{pkg.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#475569]">설명</label>
                        <textarea
                          value={pkg.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              packages: prev.packages.map((p, i) =>
                                i === index ? { ...p, description: e.target.value } : p
                              ),
                            }))
                          }
                          placeholder="패키지 설명"
                          rows={2}
                          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs focus:border-[#2E5E99] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#475569]">납품 기간</label>
                        <select
                          value={pkg.deliveryDays}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              packages: prev.packages.map((p, i) =>
                                i === index ? { ...p, deliveryDays: parseInt(e.target.value) } : p
                              ),
                            }))
                          }
                          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs focus:border-[#2E5E99] focus:outline-none"
                        >
                          <option value={1}>1일</option>
                          <option value={3}>3일</option>
                          <option value={5}>5일</option>
                          <option value={7}>7일</option>
                          <option value={14}>14일</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#475569]">수정 횟수</label>
                        <select
                          value={pkg.revisions}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              packages: prev.packages.map((p, i) =>
                                i === index
                                  ? { ...p, revisions: e.target.value === "999" ? 999 : parseInt(e.target.value) }
                                  : p
                              ),
                            }))
                          }
                          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs focus:border-[#2E5E99] focus:outline-none"
                        >
                          <option value={0}>0회</option>
                          <option value={1}>1회</option>
                          <option value={2}>2회</option>
                          <option value={3}>3회</option>
                          <option value={999}>무제한</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#475569]">가격 (₩)</label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              packages: prev.packages.map((p, i) =>
                                i === index ? { ...p, price: parseInt(e.target.value) || 0 } : p
                              ),
                            }))
                          }
                          placeholder="0"
                          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs focus:border-[#2E5E99] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Requirements */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <p className="mb-4 text-sm text-[#475569]">
                  구매자가 제공해야 할 정보나 자료를 요청할 수 있습니다
                </p>
                <div className="space-y-4">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#475569]">요구사항 {index + 1}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              requirements: prev.requirements.filter((_, i) => i !== index),
                            }))
                          }
                          className="text-xs text-red-500 hover:underline"
                        >
                          삭제
                        </button>
                      </div>
                      <select
                        value={req.type}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            requirements: prev.requirements.map((r, i) =>
                              i === index ? { ...r, type: e.target.value as any } : r
                            ),
                          }))
                        }
                        className="mb-2 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                      >
                        <option value="text">텍스트 답변</option>
                        <option value="file">파일 업로드</option>
                        <option value="multiple">선택형 (다중 선택)</option>
                      </select>
                      <input
                        type="text"
                        value={req.question}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            requirements: prev.requirements.map((r, i) =>
                              i === index ? { ...r, question: e.target.value } : r
                            ),
                          }))
                        }
                        placeholder="질문을 입력하세요"
                        className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                      />
                    </div>
                  ))}
                  <Button
                    type="default"
                    size="small"
                    shape="round"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        requirements: [...prev.requirements, { type: "text", question: "" }],
                      }))
                    }
                    className="gap-1 border border-[#E2E8F0] bg-white text-sm font-medium text-[#475569] hover:bg-[#F1F5F9]"
                  >
                    <Plus className="size-4" />
                    요구사항 추가
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#E2E8F0] pt-6">
            <Button
              type="default"
              size="large"
              shape="round"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2 border border-[#E2E8F0] bg-white px-6 text-sm font-semibold text-[#475569] disabled:opacity-50"
            >
              <ArrowLeft className="size-4" />
              이전
            </Button>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={handleNext}
              disabled={isSubmitting}
              className="gap-2 bg-[#2E5E99] px-6 text-sm font-semibold text-white hover:bg-[#1d4673] disabled:opacity-50"
            >
              {currentStep === 4 ? (
                <>
                  {isSubmitting ? (
                    <>
                      <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      등록 중...
                    </>
                  ) : (
                <>
                  <Check className="size-4" />
                  서비스 등록하기
                    </>
                  )}
                </>
              ) : (
                <>
                  다음
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

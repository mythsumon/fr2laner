"use client";

import { useState, useEffect } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react";

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load FAQs from localStorage (set by Admin CMS)
    if (typeof window !== "undefined") {
      const storedFAQs = localStorage.getItem("cms_faqs");
      if (storedFAQs) {
        try {
          const parsedFAQs = JSON.parse(storedFAQs);
          setFaqs(parsedFAQs);
          setFilteredFaqs(parsedFAQs);
        } catch (e) {
          console.warn("Failed to parse FAQs from localStorage", e);
          // Use default FAQs if parsing fails
          setFaqs([
            { id: 1, category: "일반", question: "서비스는 어떻게 주문하나요?", answer: "홈페이지에서 원하는 서비스를 검색하고 주문하실 수 있습니다." },
            { id: 2, category: "결제", question: "환불 정책은 어떻게 되나요?", answer: "서비스 완료 전까지는 전액 환불이 가능합니다." },
          ]);
          setFilteredFaqs([
            { id: 1, category: "일반", question: "서비스는 어떻게 주문하나요?", answer: "홈페이지에서 원하는 서비스를 검색하고 주문하실 수 있습니다." },
            { id: 2, category: "결제", question: "환불 정책은 어떻게 되나요?", answer: "서비스 완료 전까지는 전액 환불이 가능합니다." },
          ]);
        }
      } else {
        // Default FAQs
        const defaultFAQs = [
          { id: 1, category: "일반", question: "서비스는 어떻게 주문하나요?", answer: "홈페이지에서 원하는 서비스를 검색하고 주문하실 수 있습니다." },
          { id: 2, category: "결제", question: "환불 정책은 어떻게 되나요?", answer: "서비스 완료 전까지는 전액 환불이 가능합니다." },
        ];
        setFaqs(defaultFAQs);
        setFilteredFaqs(defaultFAQs);
      }
    }
  }, []);

  useEffect(() => {
    let filtered = [...faqs];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFaqs(filtered);
  }, [selectedCategory, searchQuery, faqs]);

  const categories = ["all", ...Array.from(new Set(faqs.map((f) => f.category)))];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#E9EEF8]">
              <HelpCircle className="size-8 text-[#2E5E99]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">자주 묻는 질문</h1>
          <p className="mt-2 text-lg text-[#64748B]">궁금한 점을 빠르게 찾아보세요</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="질문을 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-12 py-4 text-sm focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#2E5E99] text-white"
                  : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
              }`}
            >
              {category === "all" ? "전체" : category}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-12 text-center">
              <p className="text-[#64748B]">검색 결과가 없습니다.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-[#F8FAFC]"
                >
                  <div className="flex-1 pr-4">
                    <div className="mb-1 text-xs font-medium text-[#2E5E99]">{faq.category}</div>
                    <div className="text-base font-semibold text-[#0F172A]">{faq.question}</div>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="size-5 shrink-0 text-[#64748B]" />
                  ) : (
                    <ChevronDown className="size-5 shrink-0 text-[#64748B]" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm leading-relaxed text-[#475569]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};




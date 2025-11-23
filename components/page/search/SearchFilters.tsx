"use client";

import { useState } from "react";
import { cn } from "@/components/shared/utils";

export const SearchFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [taxInvoice, setTaxInvoice] = useState(false);
  const [masterExpert, setMasterExpert] = useState(false);
  const [quickResponse, setQuickResponse] = useState(false);

  const categories = [
    { value: "logo-design", label: "디자인 > 로고 디자인" },
    { value: "brand-design", label: "디자인 > 브랜드 디자인·가이드" },
    { value: "business-card", label: "디자인 > 명함" },
  ];

  const budgets = [
    { value: "under-50k", label: "50,000원 이하" },
    { value: "50k-100k", label: "50,000원 ~ 100,000원" },
    { value: "100k-200k", label: "100,000원 ~ 200,000원" },
    { value: "over-200k", label: "200,000원 이상" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-slate-900">필터</h3>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">카테고리</label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(selectedCategory === category.value ? null : category.value)}
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                selectedCategory === category.value
                  ? "border-[#2E5E99] bg-sky-50 text-[#2E5E99]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">예산</label>
        <select
          value={selectedBudget || ""}
          onChange={(e) => setSelectedBudget(e.target.value || null)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-[#2E5E99] focus:outline-none"
        >
          <option value="">전체</option>
          {budgets.map((budget) => (
            <option key={budget.value} value={budget.value}>
              {budget.label}
            </option>
          ))}
        </select>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={taxInvoice}
            onChange={(e) => setTaxInvoice(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#2E5E99] focus:ring-[#2E5E99]"
          />
          <span>세금계산서 발행</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={masterExpert}
            onChange={(e) => setMasterExpert(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#2E5E99] focus:ring-[#2E5E99]"
          />
          <span>MASTER 전문가</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={quickResponse}
            onChange={(e) => setQuickResponse(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#2E5E99] focus:ring-[#2E5E99]"
          />
          <span>빠른 응답</span>
        </label>
      </div>
    </div>
  );
};


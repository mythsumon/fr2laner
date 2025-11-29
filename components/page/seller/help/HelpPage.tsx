"use client";

import { useState, useEffect } from "react";
import { HelpPage as BaseHelpPage } from "@/components/shared/HelpPage";

interface CMSFAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const defaultSellerFaqs = [
  {
    id: "1",
    question: "서비스는 어떻게 등록하나요?",
    answer: "대시보드에서 '서비스 등록' 버튼을 클릭하고 단계별로 정보를 입력하세요.",
  },
  {
    id: "2",
    question: "정산은 언제 되나요?",
    answer: "주문 완료 후 7일 이내에 정산이 완료됩니다.",
  },
  {
    id: "3",
    question: "수수료는 얼마인가요?",
    answer: "플랫폼 수수료는 10%입니다.",
  },
];

const sellerCategories = [
  { id: "payments", label: "결제/정산", icon: "$" },
  { id: "orders", label: "주문 관리", icon: "📦" },
  { id: "gig", label: "서비스 등록", icon: "✨" },
  { id: "verification", label: "인증", icon: "✓" },
];

export const HelpPage = () => {
  const [faqs, setFaqs] = useState(defaultSellerFaqs);

  useEffect(() => {
    // Load CMS FAQs from localStorage
    if (typeof window !== "undefined") {
      const storedFAQs = localStorage.getItem("cms_faqs");
      if (storedFAQs) {
        try {
          const cmsFAQs: CMSFAQ[] = JSON.parse(storedFAQs);
          // Convert CMS FAQs to HelpPage format and merge with defaults
          const convertedFAQs = cmsFAQs.map((f) => ({
            id: f.id.toString(),
            question: f.question,
            answer: f.answer,
          }));
          // Merge: CMS FAQs first, then defaults (avoid duplicates)
          const mergedFAQs = [
            ...convertedFAQs,
            ...defaultSellerFaqs.filter((d) => !convertedFAQs.some((c) => c.question === d.question)),
          ];
          setFaqs(mergedFAQs);
        } catch (e) {
          console.warn("Failed to parse CMS FAQs from localStorage", e);
        }
      }
    }
  }, []);

  return <BaseHelpPage faqs={faqs} categories={sellerCategories} />;
};



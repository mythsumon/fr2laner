"use client";

import { useState, useEffect } from "react";
import { HelpPage as BaseHelpPage } from "@/components/shared/HelpPage";

interface CMSFAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const defaultBuyerFaqs = [
  {
    id: "1",
    question: "주문은 어떻게 하나요?",
    answer: "서비스 상세 페이지에서 원하는 패키지를 선택하고 '주문하기' 버튼을 클릭하세요. 결제 정보를 입력하면 주문이 완료됩니다.",
  },
  {
    id: "2",
    question: "결제 방법은 무엇이 있나요?",
    answer: "신용카드, 체크카드, 계좌이체 등 다양한 결제 방법을 지원합니다. 설정 페이지에서 결제 수단을 관리할 수 있습니다.",
  },
  {
    id: "3",
    question: "주문을 취소할 수 있나요?",
    answer: "주문 후 24시간 이내에는 취소가 가능합니다. 주문 상세 페이지에서 취소 요청을 할 수 있습니다.",
  },
  {
    id: "4",
    question: "환불은 어떻게 받나요?",
    answer: "환불 정책에 따라 자동으로 처리되거나, 고객 지원팀에 문의하시면 도움을 받을 수 있습니다.",
  },
];

const buyerCategories = [
  { id: "orders", label: "주문 관리", icon: "📦" },
  { id: "payments", label: "결제/환불", icon: "💳" },
  { id: "account", label: "계정 관리", icon: "👤" },
  { id: "services", label: "서비스 이용", icon: "✨" },
];

export const BuyerHelpPage = () => {
  const [faqs, setFaqs] = useState(defaultBuyerFaqs);

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
            ...defaultBuyerFaqs.filter((d) => !convertedFAQs.some((c) => c.question === d.question)),
          ];
          setFaqs(mergedFAQs);
        } catch (e) {
          console.warn("Failed to parse CMS FAQs from localStorage", e);
        }
      }
    }
  }, []);

  return <BaseHelpPage faqs={faqs} categories={buyerCategories} />;
};


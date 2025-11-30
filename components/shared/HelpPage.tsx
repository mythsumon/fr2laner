"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/shared/common";
import { SupportTicketModal } from "@/components/shared/SupportTicketModal";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface HelpCategory {
  id: string;
  label: string;
  icon: string;
}

interface HelpPageProps {
  faqs: FAQ[];
  categories: HelpCategory[];
}

export const HelpPage = ({ faqs, categories }: HelpPageProps) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">도움말</h1>
        <p className="mt-1 text-sm text-[#475569]">자주 묻는 질문과 도움말을 확인하세요</p>
      </div>

      {/* Categories */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-left transition-all hover:shadow-md"
          >
            <div className="mb-2 text-2xl">{category.icon}</div>
            <div className="font-semibold text-[#0F172A]">{category.label}</div>
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">자주 묻는 질문</h2>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#F1F5F9]"
              >
                <span className="font-medium text-[#0F172A]">{faq.question}</span>
                {expandedFAQ === faq.id ? (
                  <ChevronUp className="size-5 shrink-0 text-[#475569]" />
                ) : (
                  <ChevronDown className="size-5 shrink-0 text-[#475569]" />
                )}
              </button>
              {expandedFAQ === faq.id && (
                <div className="border-t border-[#E2E8F0] bg-white p-4 text-sm text-[#475569]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#E9EEF8]">
            <MessageSquare className="size-6 text-[#2E5E99]" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-[#0F172A]">문의하기</h3>
            <p className="mb-4 text-sm text-[#475569]">
              문제가 해결되지 않으셨나요? 고객 지원팀에 문의하세요.
            </p>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => setShowSupportModal(true)}
              className="bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673]"
            >
              <MessageSquare className="size-4" />
              지원팀에 문의하기
            </Button>
          </div>
        </div>
      </div>

      {/* Support Ticket Modal */}
      <SupportTicketModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </div>
  );
};



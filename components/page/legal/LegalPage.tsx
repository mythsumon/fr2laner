"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

interface LegalPageData {
  id: number;
  title: string;
  lastUpdated: string;
  content?: string;
}

interface LegalPageProps {
  type: "terms" | "privacy" | "refund";
}

const pageTitles: Record<string, string> = {
  terms: "이용약관",
  privacy: "개인정보처리방침",
  refund: "환불 정책",
};

export const LegalPage = ({ type }: LegalPageProps) => {
  const [pageData, setPageData] = useState<LegalPageData | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    // Load legal pages from localStorage (set by Admin CMS)
    if (typeof window !== "undefined") {
      const storedPages = localStorage.getItem("cms_legal_pages");
      if (storedPages) {
        try {
          const pages: LegalPageData[] = JSON.parse(storedPages);
          const page = pages.find((p) => {
            const title = p.title.toLowerCase();
            if (type === "terms") return title.includes("이용약관") || title.includes("terms");
            if (type === "privacy") return title.includes("개인정보") || title.includes("privacy");
            if (type === "refund") return title.includes("환불") || title.includes("refund");
            return false;
          });
          if (page) {
            setPageData(page);
            // Try to load content from admin settings
            const storedSettings = localStorage.getItem("admin_settings");
            if (storedSettings) {
              try {
                const settings = JSON.parse(storedSettings);
                if (settings.policies) {
                  if (type === "terms" && settings.policies.termsOfService) {
                    setContent(settings.policies.termsOfService);
                  } else if (type === "privacy" && settings.policies.privacyPolicy) {
                    setContent(settings.policies.privacyPolicy);
                  } else if (type === "refund" && settings.policies.refundPolicy) {
                    setContent(settings.policies.refundPolicy);
                  }
                }
              } catch (e) {
                console.warn("Failed to parse admin settings", e);
              }
            }
          }
        } catch (e) {
          console.warn("Failed to parse legal pages from localStorage", e);
        }
      }

      // If no content, use default
      if (!content) {
        setContent(`${pageTitles[type]} 내용이 준비 중입니다.`);
      }
    }
  }, [type, content]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              홈으로 돌아가기
            </button>
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#E9EEF8]">
              <FileText className="size-6 text-[#2E5E99]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">
                {pageTitles[type]}
              </h1>
              {pageData && (
                <p className="mt-1 text-sm text-[#64748B]">
                  최종 수정일: {pageData.lastUpdated}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <div className="prose prose-sm max-w-none text-[#475569] whitespace-pre-wrap">
            {content || `${pageTitles[type]} 내용이 준비 중입니다.`}
          </div>
        </div>
      </div>
    </div>
  );
};




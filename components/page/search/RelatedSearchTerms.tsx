"use client";

import { useRouter } from "next/navigation";

type RelatedSearchTermsProps = {
  keyword: string;
};

const generateRelatedTerms = (keyword: string): string[] => {
  const baseTerms: Record<string, string[]> = {
    로고: ["로고디자인", "로고제작", "브랜딩", "CI", "BI", "디자인", "명함", "브랜드로고", "캐릭터로고"],
    디자인: ["로고디자인", "브랜드디자인", "UI/UX디자인", "그래픽디자인", "패키지디자인"],
    개발: ["웹개발", "앱개발", "프론트엔드", "백엔드", "풀스택"],
  };

  for (const [base, terms] of Object.entries(baseTerms)) {
    if (keyword.includes(base)) {
      return terms;
    }
  }

  return [`${keyword}디자인`, `${keyword}제작`, `${keyword}서비스`, `${keyword}전문가`];
};

export const RelatedSearchTerms = ({ keyword }: RelatedSearchTermsProps) => {
  const router = useRouter();
  const relatedTerms = generateRelatedTerms(keyword);

  const handleTermClick = (term: string) => {
    const encodedTerm = encodeURIComponent(term);
    router.push(`/search?type=gigs&keyword=${encodedTerm}`);
  };

  if (!keyword || relatedTerms.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-semibold text-slate-700">연관검색어</p>
      <div className="flex flex-wrap gap-2">
        {relatedTerms.map((term) => (
          <button
            key={term}
            onClick={() => handleTermClick(term)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};


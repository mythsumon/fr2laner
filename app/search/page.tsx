import { Suspense } from "react";
import { SearchResultsContent } from "@/components/page/search";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-[#2E5E99] border-r-transparent"></div>
          <p className="text-sm text-[#94A3B8]">검색 중...</p>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateServicePage } from "./CreateServicePage";

// Edit Service page reuses the Create Service component
// In a real app, you would pre-fill the form with existing data
export const EditServicePage = () => {
  const params = useParams();
  const serviceId = params.id as string;

  // In a real app, fetch service data here and pass it to CreateServicePage
  return (
    <div>
      <div className="mb-6 flex items-center gap-4 px-4 pt-6 md:px-6 lg:px-8">
        <Link href="/dashboard/services">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#475569] transition-colors hover:bg-[#F1F5F9]"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="size-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">서비스 수정</h1>
          <p className="mt-1 text-sm text-[#475569]">서비스 정보를 수정하세요</p>
        </div>
      </div>
      <CreateServicePage />
    </div>
  );
};






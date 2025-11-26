"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/shared/common";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#2E5E99] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">페이지를 찾을 수 없습니다</h2>
          <p className="text-lg text-[#64748B] mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            type="primary"
            href="/"
            className="flex items-center gap-2 px-6 py-3"
          >
            <Home className="size-5" />
            홈으로 가기
          </Button>
          <Button
            type="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3"
          >
            <ArrowLeft className="size-5" />
            이전 페이지
          </Button>
        </div>
      </div>
    </div>
  );
}


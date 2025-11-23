"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

export const BuyerLogoutPage = () => {
  useBodyClass("dashboard-page");
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate logout process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoggingOut(false);
    setIsLoggedOut(true);
    
    // Redirect to home page after 1.5 seconds
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  if (isLoggedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-10 text-green-600" />
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-[#0F172A]">로그아웃 완료</h1>
          <p className="text-sm text-[#475569]">안전하게 로그아웃되었습니다.</p>
          <p className="mt-4 text-xs text-[#94A3B8]">홈페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-[#E2E8F0] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <Link href="/profile">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#475569] transition-colors hover:bg-[#F1F5F9]"
              aria-label="뒤로가기"
            >
              <ArrowLeft className="size-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">로그아웃</h1>
            <p className="text-sm text-[#475569]">계정에서 로그아웃하시겠습니까?</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-red-50">
              <LogOut className="size-10 text-red-600" />
            </div>
          </div>

          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-semibold text-[#0F172A]">로그아웃하시겠습니까?</h2>
            <p className="text-sm text-[#475569]">
              로그아웃하면 모든 세션이 종료되며, 다시 로그인해야 합니다.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold">주의사항</p>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• 진행 중인 주문은 계속 진행됩니다</li>
                  <li>• 저장된 정보는 유지됩니다</li>
                  <li>• 다음 로그인 시 다시 확인해야 할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link href="/profile" className="flex-1 sm:flex-initial">
              <Button
                type="default"
                size="large"
                shape="round"
                className="w-full gap-2 border border-[#E2E8F0] !bg-white px-6 text-sm font-semibold text-[#475569] hover:!bg-[#F8FAFC] sm:w-auto"
              >
                취소
              </Button>
            </Link>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={handleLogout}
              loading={isLoggingOut}
              disabled={isLoggingOut}
              className="flex-1 gap-2 !bg-red-600 px-6 text-sm font-semibold text-white hover:!bg-red-700 sm:flex-initial sm:w-auto"
            >
              <LogOut className="size-4" />
              로그아웃
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#94A3B8]">
            문제가 있으신가요?{" "}
            <Link href="/support" className="font-semibold text-[#2E5E99] hover:underline">
              고객지원
            </Link>
            에 문의하세요.
          </p>
        </div>
      </main>
    </div>
  );
};



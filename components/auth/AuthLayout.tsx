"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => {
      document.body.classList.remove("auth-page");
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#E8F1FF] via-white to-[#FDF2FF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(46,94,153,0.12),_transparent_50%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-12">
        <div className="mb-6 flex w-full max-w-xl items-center justify-between text-sm text-slate-500">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Freelancer Hub</p>
            <p className="text-base font-semibold text-slate-800">전문 프리랜서를 쉽고 빠르게 만나보세요.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99]"
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로 가기
          </Link>
        </div>
        <div className="w-full max-w-xl rounded-[28px] border border-white/60 bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          {children}
        </div>
      </div>
    </main>
  );
};


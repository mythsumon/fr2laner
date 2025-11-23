"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/shared/common";

export const FindTalentCTA = () => {
  return (
    <section className="bg-gradient-to-br from-[#E9EEF8] to-[#F1F5F9] py-16 md:py-24">
      <div className="mx-auto w-full max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl md:text-5xl">
          지금 전문가를 찾아보세요
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#475569] sm:text-xl">
          검증된 전문가와 함께 프로젝트를 성공적으로 완료하세요. 무료로 시작할 수 있습니다.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/search?type=sellers">
            <Button
              type="primary"
              size="large"
              shape="round"
              className="group h-14 gap-2 bg-[#2E5E99] px-8 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#1d4673] hover:shadow-xl"
            >
              전문가 찾기
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              type="default"
              size="large"
              shape="round"
              className="h-14 border-2 border-[#2E5E99] bg-transparent px-8 text-base font-semibold text-[#2E5E99] transition-all hover:bg-[#2E5E99]/10"
            >
              무료 가입하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};






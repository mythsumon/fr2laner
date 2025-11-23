"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/shared/common";

export const FindTalentHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1d4673] via-[#2E5E99] to-[#1d4673] pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            최고의 전문가를
            <br />
            <span className="text-[#A5BAFF]">찾아보세요</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl">
            검증된 프리랜서와 협업하여 프로젝트를 성공적으로 완료하세요. 다양한 분야의 전문가가 준비되어 있습니다.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/search?type=sellers">
              <Button
                type="primary"
                size="large"
                shape="round"
                className="group h-14 gap-2 bg-white px-8 text-base font-semibold text-[#2E5E99] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
                className="h-14 border-2 border-white/30 bg-transparent px-8 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                프로젝트 등록하기
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80 sm:gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-5 text-green-300" />
              <span>검증된 전문가</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-5 text-green-300" />
              <span>안전한 결제</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-5 text-green-300" />
              <span>24/7 지원</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};






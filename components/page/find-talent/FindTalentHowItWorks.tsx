"use client";

import { Search, MessageSquare, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/common";

const steps = [
  {
    icon: Search,
    title: "1. 전문가 검색",
    description: "필요한 스킬과 경험을 가진 전문가를 검색하고 포트폴리오를 확인하세요.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: MessageSquare,
    title: "2. 전문가와 소통",
    description: "선호하는 전문가에게 메시지를 보내고 프로젝트 요구사항을 논의하세요.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: FileCheck,
    title: "3. 프로젝트 시작",
    description: "협의된 조건으로 프로젝트를 시작하고 안전한 결제 시스템으로 진행하세요.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
];

export const FindTalentHowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl md:text-5xl">
            전문가 찾는 방법
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#475569]">
            3단계로 간단하게 전문가를 찾고 프로젝트를 시작할 수 있습니다
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md md:p-8">
                  <div className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full ${step.bgColor}`}>
                    <Icon className={`size-8 ${step.color}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#0F172A]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <ArrowRight className="size-6 text-[#CBD5F5]" aria-hidden="true" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link href="/search?type=sellers">
            <Button
              type="primary"
              size="large"
              shape="round"
              className="h-14 bg-[#2E5E99] px-8 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-[#1d4673]"
            >
              전문가 찾기 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};






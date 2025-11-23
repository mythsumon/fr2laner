"use client";

import { UserPlus, Briefcase, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/common";

const steps = [
  {
    icon: UserPlus,
    title: "1. 계정 만들기",
    description: "무료로 가입하고 프로필을 완성하세요. 포트폴리오, 경력, 전문 분야를 업로드하세요.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Briefcase,
    title: "2. 프로젝트 찾기",
    description: "관심 있는 프로젝트를 탐색하고 클라이언트에게 제안서를 보내세요.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: DollarSign,
    title: "3. 수익 창출",
    description: "프로젝트를 완료하고 안전한 결제 시스템을 통해 수익을 받으세요.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
];

export const ForFreelancersHowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl md:text-5xl">
            시작하는 방법
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#475569]">
               3단계로 간단하게 프리랜서 활동을 시작할 수 있습니다
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
          <Link href="/signup">
            <Button
              type="primary"
              size="large"
              shape="round"
              className="h-14 bg-[#2E5E99] px-8 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-[#1d4673]"
            >
              지금 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


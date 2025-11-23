"use client";

import { DollarSign, Clock, Globe, Shield, TrendingUp, Users } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "수익 창출",
    description: "전 세계 클라이언트로부터 프로젝트를 받고 안정적인 수익을 올리세요.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Clock,
    title: "자유로운 시간",
    description: "원하는 시간과 장소에서 일하며 삶의 균형을 맞추세요.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Globe,
    title: "글로벌 네트워크",
    description: "다양한 국가와 산업의 클라이언트와 협업하며 경험을 넓히세요.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "안전한 거래",
    description: "보호된 결제 시스템과 프로젝트 관리 도구로 안심하고 일하세요.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: TrendingUp,
    title: "성장 기회",
    description: "포트폴리오를 쌓고 리뷰를 받으며 전문가로서 성장하세요.",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    icon: Users,
    title: "지원 커뮤니티",
    description: "다른 프리랜서들과 소통하며 지식과 경험을 공유하세요.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];

export const ForFreelancersBenefits = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl md:text-5xl">
            프리랜서를 위한 혜택
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#475569]">
            성공적인 프리랜서 커리어를 시작하기 위한 모든 것을 제공합니다
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(46,94,153,0.12)]"
              >
                <div className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl ${benefit.bgColor}`}>
                  <Icon className={`size-6 ${benefit.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#0F172A]">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};






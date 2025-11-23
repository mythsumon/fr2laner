"use client";

import { Search, Shield, Clock, Users, Award, MessageCircle } from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "쉬운 검색",
    description: "필요한 스킬과 경험을 가진 전문가를 빠르게 찾을 수 있습니다.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "검증된 전문가",
    description: "포트폴리오와 리뷰를 통해 검증된 전문가만 만날 수 있습니다.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Clock,
    title: "빠른 매칭",
    description: "프로젝트 요구사항에 맞는 전문가를 즉시 찾아 매칭할 수 있습니다.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Users,
    title: "다양한 전문가",
    description: "디자인, 개발, 마케팅 등 다양한 분야의 전문가가 준비되어 있습니다.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Award,
    title: "높은 품질",
    description: "평점과 리뷰를 통해 품질 높은 작업물을 제공하는 전문가를 선택하세요.",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    icon: MessageCircle,
    title: "원활한 소통",
    description: "실시간 메시징으로 전문가와 직접 소통하며 프로젝트를 진행하세요.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];

export const FindTalentBenefits = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl md:text-5xl">
            전문가 찾기의 장점
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#475569]">
            프로젝트 성공을 위한 최고의 전문가를 찾아보세요
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






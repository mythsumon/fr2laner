"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings, LogOut, Heart, ShoppingBag, FileText, ShieldCheck, CreditCard, Bell } from "lucide-react";
import { BuyerBottomNav } from "@/components/page/buyer/BuyerBottomNav";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

const stats = [
  { label: "완료 주문", value: 24 },
  { label: "요청 진행중", value: 3 },
  { label: "위시리스트", value: 12 },
];

const quickLinks = [
  {
    icon: ShoppingBag,
    title: "나의 주문",
    description: "진행중인 프로젝트 확인",
    href: "/orders",
  },
  {
    icon: FileText,
    title: "커스텀 요청",
    description: "요청서 작성 및 제안 관리",
    href: "/custom-requests",
  },
  {
    icon: Heart,
    title: "위시리스트",
    description: "관심 서비스 모아보기",
    href: "/wishlist",
  },
];

const settingsLinks = [
  { icon: Bell, label: "알림 설정" },
  { icon: CreditCard, label: "결제 수단" },
  { icon: ShieldCheck, label: "보안 및 인증" },
];

export const BuyerProfilePage = () => {
  useBodyClass("dashboard-page");

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <header className="border-b border-[#E2E8F0] bg-white px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c"
              alt="Buyer avatar"
              width={72}
              height={72}
              className="size-16 rounded-full object-cover"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Buyer</p>
              <h1 className="text-2xl font-bold text-[#0F172A]">김크몽</h1>
              <p className="text-sm text-[#475569]">kim@kmong.com</p>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <Link href="/client/settings">
              <Button
                type="default"
                size="middle"
                shape="round"
                className="gap-2 border border-[#E2E8F0] !bg-white text-sm font-semibold text-[#475569] hover:!bg-[#F8FAFC]"
              >
                <Settings className="size-4" />
                설정
              </Button>
            </Link>
            <Link href="/logout">
              <Button
                type="default"
                size="middle"
                shape="round"
                className="gap-2 border border-[#E2E8F0] !bg-white text-sm font-semibold text-[#B91C1C] hover:!bg-[#FEF2F2]"
              >
                <LogOut className="size-4" />
                로그아웃
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <section className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm">
              <p className="text-sm text-[#94A3B8]">{stat.label}</p>
              <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0F172A]">빠른 액션</h2>
            <Link href="/client/custom-requests/new">
              <Button
                type="primary"
                size="small"
                shape="round"
                className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-xs font-semibold text-white shadow-md hover:shadow-lg"
              >
                새 요청 만들기
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickLinks
              .filter((link) => link.title === "커스텀 요청" || link.title === "위시리스트")
              .map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-[#2E5E99] hover:shadow-lg"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-xl bg-gradient-to-br from-[#2E5E99] to-[#3B82F6] p-4">
                        <Icon className="size-8 text-white" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[#0F172A]">{link.title}</h3>
                    <p className="text-sm text-[#475569]">{link.description}</p>
                  </Link>
                );
              })}
          </div>
        </section>

        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">계정 설정</h2>
          <div className="space-y-3">
            {settingsLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-[#E2E8F0] px-4 py-3 text-left transition hover:bg-[#F8FAFC]"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#E9EEF8] p-2 text-[#2E5E99]">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-[#94A3B8]">관리</span>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <BuyerBottomNav />
    </div>
  );
};


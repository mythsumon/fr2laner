"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Clock, DollarSign, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

const mockProposals = [
  {
    id: "PROP-001",
    expertName: "김디자이너",
    expertAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    rating: 4.9,
    reviews: 127,
    price: 850000,
    deliveryDays: 14,
    message: "안녕하세요! 웹사이트 리뉴얼 프로젝트에 관심이 있어 제안드립니다. 유사한 프로젝트 경험이 많으며, 모던하고 사용자 친화적인 디자인을 제공할 수 있습니다.",
    portfolio: ["포트폴리오1.jpg", "포트폴리오2.jpg"],
    status: "pending",
  },
  {
    id: "PROP-002",
    expertName: "박브랜딩",
    expertAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    rating: 4.8,
    reviews: 89,
    price: 750000,
    deliveryDays: 12,
    message: "프로젝트 요구사항을 검토했습니다. 빠른 납품과 높은 품질을 보장할 수 있습니다.",
    portfolio: ["포트폴리오3.jpg"],
    status: "pending",
  },
];

export const ProjectProposalsPage = () => {
  useBodyClass("dashboard-page");
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const handleAccept = (proposalId: string) => {
    // Add accept logic here
    console.log("Accept proposal:", proposalId);
  };

  const handleReject = (proposalId: string) => {
    // Add reject logic here
    console.log("Reject proposal:", proposalId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/client/projects/${projectId}`}>
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
            >
              <ArrowLeft className="size-4" />
              프로젝트 상세로
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">받은 제안</h1>
          <p className="mt-1 text-sm text-[#475569]">전문가들의 제안을 검토하고 선택하세요</p>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {mockProposals.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#CBD5F5] bg-white px-6 py-16 text-center">
              <p className="text-lg font-semibold text-[#475569]">아직 받은 제안이 없습니다.</p>
              <p className="mt-2 text-sm text-[#94A3B8]">조금만 기다려주세요. 전문가들이 곧 제안을 보낼 것입니다.</p>
            </div>
          ) : (
            mockProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={proposal.expertAvatar}
                      alt={proposal.expertName}
                      width={64}
                      height={64}
                      className="size-16 rounded-full object-cover ring-2 ring-[#E2E8F0]"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">{proposal.expertName}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
                          <span className="text-sm font-semibold text-[#0F172A]">{proposal.rating}</span>
                          <span className="text-xs text-[#94A3B8]">({proposal.reviews}개 리뷰)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    대기 중
                  </span>
                </div>

                <div className="mb-4 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-sm text-[#475569]">{proposal.message}</p>
                </div>

                <div className="mb-4 grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-5 text-[#94A3B8]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">제안 가격</p>
                      <p className="text-base font-bold text-[#0F172A]">₩{proposal.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-5 text-[#94A3B8]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">예상 기간</p>
                      <p className="text-base font-bold text-[#0F172A]">{proposal.deliveryDays}일</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-[#94A3B8]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">포트폴리오</p>
                      <p className="text-base font-bold text-[#0F172A]">{proposal.portfolio.length}개</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => handleAccept(proposal.id)}
                    className="flex-1 gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-sm font-semibold text-white"
                  >
                    <CheckCircle2 className="size-4" />
                    제안 수락
                  </Button>
                  <Button
                    type="default"
                    shape="round"
                    onClick={() => handleReject(proposal.id)}
                    className="border border-[#E2E8F0] bg-white text-sm font-semibold text-[#475569]"
                  >
                    <X className="size-4" />
                    거절
                  </Button>
                  <Link href={`/client/messages?expert=${proposal.expertName}`}>
                    <Button
                      type="default"
                      shape="round"
                      className="border border-[#2E5E99] bg-white text-sm font-semibold text-[#2E5E99]"
                    >
                      문의하기
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};





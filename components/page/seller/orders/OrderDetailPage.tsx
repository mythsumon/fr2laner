"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Upload, Send, FileText, MessageSquare, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/common";

// Mock data
const mockOrder = {
  id: "ORD-001",
  buyerName: "김클라이언트",
  buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
  packageName: "Premium 패키지",
  price: 500000,
  deliveryDays: 7,
  daysRemaining: 3,
  status: "In Progress",
  requirements: [
    { type: "text", question: "브랜드 컨셉을 설명해주세요", answer: "심플하고 모던한 느낌을 원합니다" },
    { type: "file", question: "참고 이미지나 자료가 있으면 업로드해주세요", answer: "uploaded-file.pdf" },
  ],
  timeline: [
    { step: "주문 접수", date: "2024-01-10", completed: true },
    { step: "작업 시작", date: "2024-01-11", completed: true },
    { step: "작업 중", date: "진행 중", completed: false },
    { step: "납품", date: "예정일: 2024-01-18", completed: false },
  ],
};

export const OrderDetailPage = () => {
  const params = useParams();
  const [message, setMessage] = useState("");

  const handleSendDelivery = () => {
    console.log("Send delivery");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/expert/orders">
          <button
            type="button"
            className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2E5E99] hover:underline"
          >
            ← 주문 목록으로
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">주문 상세</h1>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Order Summary */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={mockOrder.buyerAvatar}
                alt={mockOrder.buyerName}
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <User className="size-4 text-[#475569]" />
                  <span className="font-semibold text-[#0F172A]">{mockOrder.buyerName}</span>
                  <Link
                    href={`/expert/messages?buyer=${mockOrder.buyerName}`}
                    className="ml-2 flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-[#2E5E99] transition-colors hover:bg-[#E9EEF8]"
                  >
                    <MessageSquare className="size-3" />
                    메시지
                  </Link>
                </div>
                <div className="text-sm text-[#475569]">주문번호: {mockOrder.id}</div>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-700">
              {mockOrder.status}
            </span>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="mb-1 text-xs font-medium text-[#475569]">패키지</div>
              <div className="text-base font-semibold text-[#0F172A]">{mockOrder.packageName}</div>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="mb-1 text-xs font-medium text-[#475569]">가격</div>
              <div className="text-base font-semibold text-[#0F172A]">
                ₩{mockOrder.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">주문 진행 상황</h3>
            <div className="space-y-3">
              {mockOrder.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`mt-1 size-3 rounded-full ${
                      item.completed ? "bg-green-500" : "bg-[#E2E8F0]"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#0F172A]">{item.step}</div>
                    <div className="text-xs text-[#94A3B8]">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Countdown */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 p-3">
            <Clock className="size-5 text-blue-500" />
            <div>
              <div className="text-sm font-semibold text-blue-700">남은 시간: {mockOrder.daysRemaining}일</div>
              <div className="text-xs text-blue-600">납품 예정일까지</div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">구매자 요구사항</h2>
          <div className="space-y-4">
            {mockOrder.requirements.map((req, index) => (
              <div key={index} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="size-4 text-[#475569]" />
                  <span className="text-sm font-medium text-[#0F172A]">{req.question}</span>
                </div>
                <div className="text-sm text-[#475569]">
                  {req.type === "file" ? (
                    <a href="#" className="text-[#2E5E99] hover:underline">
                      {req.answer}
                    </a>
                  ) : (
                    req.answer
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button
            type="default"
            size="small"
            shape="round"
            className="mt-4 border border-[#E2E8F0] bg-white text-sm font-medium text-[#475569] hover:bg-[#F1F5F9]"
          >
            추가 정보 요청하기
          </Button>
        </div>

        {/* Chat Section */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0F172A]">메시지</h2>
            <Link
              href={`/expert/messages?order=${mockOrder.id}`}
              className="flex items-center gap-1 text-sm font-semibold text-[#2E5E99] hover:underline"
            >
              전체 대화 보기
              <ExternalLink className="size-4" />
            </Link>
          </div>
          <div className="mb-4 max-h-[400px] space-y-4 overflow-y-auto rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="flex gap-3">
              <Image
                src={mockOrder.buyerAvatar}
                alt={mockOrder.buyerName}
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="mb-1 text-xs font-medium text-[#475569]">{mockOrder.buyerName}</div>
                <div className="rounded-lg bg-white p-3 text-sm text-[#0F172A]">
                  작업 진행 상황은 어떠신가요?
                </div>
                <div className="mt-1 text-xs text-[#94A3B8]">10분 전</div>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="flex-1 text-right">
                <div className="mb-1 text-xs font-medium text-[#475569]">나</div>
                <div className="inline-block rounded-lg bg-[#2E5E99] p-3 text-sm text-white">
                  잘 진행되고 있습니다!
                </div>
                <div className="mt-1 text-xs text-[#94A3B8]">5분 전</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
            />
            <Button
              type="primary"
              size="small"
              shape="round"
              className="bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673]"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">납품하기</h2>
          <div className="mb-4 space-y-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#475569]">작업물 업로드</span>
              <input
                type="file"
                multiple
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#475569]">작업물 설명</span>
              <textarea
                rows={4}
                placeholder="작업물에 대한 설명을 입력하세요..."
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </label>
          </div>
          <div className="flex gap-3">
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={handleSendDelivery}
              className="flex-1 gap-2 bg-[#2E5E99] text-sm font-semibold text-white hover:bg-[#1d4673] sm:flex-initial"
            >
              <Upload className="size-4" />
              납품하기
            </Button>
            <Button
              type="default"
              size="large"
              shape="round"
              className="gap-2 border border-green-200 bg-green-50 text-sm font-semibold text-green-700 hover:bg-green-100"
            >
              <CheckCircle2 className="size-4" />
              작업 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};



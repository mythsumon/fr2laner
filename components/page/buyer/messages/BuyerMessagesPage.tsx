"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Circle, Send, Paperclip, Mic, Search, MoreVertical, Check, CheckCheck, Star } from "lucide-react";
import { BuyerBottomNav } from "@/components/page/buyer/BuyerBottomNav";
import { Button } from "@/components/shared/common";
import { useBodyClass } from "@/hooks";

interface Chat {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  timestamp: string;
  orderId?: string;
  isOnline: boolean;
  unreadCount: number;
  rating?: number;
  responseTime?: string;
}

interface Message {
  id: string;
  text: string;
  sender: "buyer" | "seller";
  timestamp: string;
  isRead: boolean;
}

// Mock data
const mockChats: Chat[] = [
  {
    id: "1",
    sellerName: "김디자이너",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    lastMessage: "시안 확인 부탁드려요!",
    timestamp: "5분 전",
    orderId: "ORD-1043",
    isOnline: true,
    unreadCount: 2,
    rating: 4.9,
    responseTime: "1시간 이내",
  },
  {
    id: "2",
    sellerName: "박브랜딩",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    lastMessage: "견적서 전달드렸습니다.",
    timestamp: "어제",
    orderId: "REQ-2201",
    isOnline: false,
    unreadCount: 0,
    rating: 4.8,
    responseTime: "2시간 이내",
  },
  {
    id: "3",
    sellerName: "이상세",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    lastMessage: "파일 받았습니다.",
    timestamp: "2일 전",
    orderId: "ORD-0984",
    isOnline: true,
    unreadCount: 0,
    rating: 5.0,
    responseTime: "30분 이내",
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      text: "로고 시안 2종 전달드립니다. 피드백 부탁드립니다!",
      sender: "seller",
      timestamp: "오전 10:20",
      isRead: true,
    },
    {
      id: "m2",
      text: "감사합니다! 수정 요청 사항은 아래와 같습니다.",
      sender: "buyer",
      timestamp: "오전 10:23",
      isRead: true,
    },
    {
      id: "m3",
      text: "시안 확인 부탁드려요!",
      sender: "seller",
      timestamp: "5분 전",
      isRead: false,
    },
  ],
  "2": [
    {
      id: "m4",
      text: "견적서 전달드렸습니다.",
      sender: "seller",
      timestamp: "어제",
      isRead: true,
    },
  ],
  "3": [
    {
      id: "m5",
      text: "파일 받았습니다.",
      sender: "seller",
      timestamp: "2일 전",
      isRead: true,
    },
  ],
};

export const BuyerMessagesPage = () => {
  useBodyClass("dashboard-page");

  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");

  const selectedChatData = mockChats.find((chat) => chat.id === selectedChat);
  const messages = selectedChat ? mockMessages[selectedChat] || [] : [];

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    // Add message sending logic here
    setMessageInput("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gradient-to-br from-[#F8FAFC] to-[#F0F7FF] pb-24">
      {/* Chat List Sidebar */}
      <div className="flex w-full flex-col border-r border-[#E2E8F0] bg-white sm:w-96">
        {/* Search Header */}
        <div className="border-b border-[#E2E8F0] bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">메시지</h1>
            <button
              type="button"
              className="rounded-lg p-1.5 text-white transition-colors hover:bg-white/20"
              aria-label="더보기"
            >
              <MoreVertical className="size-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="메시지 검색..."
              className="w-full rounded-xl border-0 bg-white/20 px-10 py-2.5 text-sm text-white placeholder:text-white/70 backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => {
            const isSelected = selectedChat === chat.id;
            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => setSelectedChat(chat.id)}
                className={`relative flex w-full items-start gap-3 border-b border-[#E2E8F0] p-4 text-left transition-all hover:bg-[#F8FAFC] ${
                  isSelected ? "bg-gradient-to-r from-[#E9EEF8] to-[#F0F7FF]" : "bg-white"
                }`}
              >
                <div className="relative shrink-0">
                  <Image
                    src={chat.sellerAvatar}
                    alt={chat.sellerName}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover ring-2 ring-white shadow-md"
                  />
                  {chat.isOnline && (
                    <Circle className="absolute bottom-0 right-0 size-3.5 fill-green-500 text-green-500 ring-2 ring-white" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className={`font-bold ${isSelected ? "text-[#2E5E99]" : "text-[#0F172A]"}`}>
                      {chat.sellerName}
                    </span>
                    <span className="text-xs text-[#94A3B8]">{chat.timestamp}</span>
                  </div>
                  <p className="line-clamp-1 text-sm text-[#475569]">{chat.lastMessage}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    {chat.orderId && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        #{chat.orderId}
                      </span>
                    )}
                    {chat.unreadCount > 0 && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-[10px] font-bold text-white shadow-sm">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Room */}
      <div className={`flex flex-1 flex-col ${selectedChat ? "flex" : "hidden sm:flex"}`}>
        {selectedChat && selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={selectedChatData.sellerAvatar}
                    alt={selectedChatData.sellerName}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover ring-2 ring-[#E2E8F0]"
                  />
                  {selectedChatData.isOnline && (
                    <Circle className="absolute bottom-0 right-0 size-3 fill-green-500 text-green-500 ring-2 ring-white" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#0F172A]">{selectedChatData.sellerName}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                    {selectedChatData.rating && (
                      <>
                        <Star className="size-3 fill-[#F59E0B] text-[#F59E0B]" />
                        <span>평점 {selectedChatData.rating}</span>
                      </>
                    )}
                    {selectedChatData.responseTime && (
                      <>
                        <span>·</span>
                        <span>응답 {selectedChatData.responseTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedChatData.orderId && (
                  <Link href={`/orders/${selectedChatData.orderId}`}>
                    <Button
                      type="primary"
                      size="small"
                      shape="round"
                      className="gap-2 bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                    >
                      주문 보기
                    </Button>
                  </Link>
                )}
                <button
                  type="button"
                  className="rounded-lg p-2 text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                  aria-label="더보기"
                >
                  <MoreVertical className="size-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-[#F8FAFC] to-white p-6">
              {messages.map((message, index) => {
                const isBuyer = message.sender === "buyer";
                const showAvatar = index === 0 || messages[index - 1]?.sender !== message.sender;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isBuyer ? "justify-end" : "justify-start"}`}
                  >
                    {!isBuyer && showAvatar && (
                      <Image
                        src={selectedChatData.sellerAvatar}
                        alt={selectedChatData.sellerName}
                        width={32}
                        height={32}
                        className="size-8 shrink-0 rounded-full object-cover"
                      />
                    )}
                    {!isBuyer && !showAvatar && <div className="w-8" />}
                    <div className={`flex max-w-[70%] flex-col gap-1 ${isBuyer ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                          isBuyer
                            ? "rounded-tr-sm bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-white"
                            : "rounded-tl-sm bg-white text-[#0F172A] ring-1 ring-[#E2E8F0]"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[10px] text-[#94A3B8]">{message.timestamp}</span>
                        {isBuyer && (
                          <span className="text-[#94A3B8]">
                            {message.isRead ? (
                              <CheckCheck className="size-3 text-[#2E5E99]" />
                            ) : (
                              <Check className="size-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="border-t border-[#E2E8F0] bg-white p-4">
              <div className="mx-auto max-w-4xl">
                <div className="flex items-end gap-2 rounded-2xl border-2 border-[#E2E8F0] bg-[#F8FAFC] p-3 transition-all focus-within:border-[#2E5E99] focus-within:bg-white focus-within:shadow-md">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-[#475569] transition-colors hover:bg-[#E2E8F0]"
                    aria-label="파일 첨부"
                  >
                    <Paperclip className="size-5" />
                  </button>
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="메시지를 입력하세요..."
                    rows={1}
                    className="max-h-32 flex-1 resize-none border-0 bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                  />
                  <button
                    type="button"
                    className="rounded-lg p-2 text-[#475569] transition-colors hover:bg-[#E2E8F0]"
                    aria-label="음성 메시지"
                  >
                    <Mic className="size-5" />
                  </button>
                  <Button
                    type="primary"
                    size="small"
                    shape="round"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="!bg-gradient-to-r !from-[#2E5E99] !to-[#3B82F6] px-4 font-bold text-white shadow-md disabled:opacity-50"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#F0F7FF]">
            <div className="rounded-full bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] p-6 shadow-xl">
              <MessageSquare className="size-16 text-white" />
            </div>
            <p className="mt-6 text-lg font-semibold text-[#0F172A]">메시지를 선택하세요</p>
            <p className="mt-2 text-sm text-[#94A3B8]">대화를 시작하려면 왼쪽에서 채팅을 선택하세요</p>
          </div>
        )}
      </div>

      <BuyerBottomNav />
    </div>
  );
};



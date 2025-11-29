"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Circle, Send, Paperclip, Mic, Search, MoreVertical, Check, CheckCheck, Clock } from "lucide-react";
import { Button } from "@/components/shared/common";

interface Chat {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  lastMessage: string;
  timestamp: string;
  orderId?: string;
  isOnline: boolean;
  unreadCount: number;
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
    buyerName: "김클라이언트",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    lastMessage: "로고 디자인이 마음에 들어요!",
    timestamp: "10분 전",
    orderId: "ORD-001",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2",
    buyerName: "박의뢰인",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    lastMessage: "수정 요청드립니다.",
    timestamp: "1시간 전",
    orderId: "ORD-002",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "3",
    buyerName: "이의뢰인",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    lastMessage: "감사합니다!",
    timestamp: "2시간 전",
    orderId: "ORD-003",
    isOnline: true,
    unreadCount: 1,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      text: "안녕하세요! 로고 디자인 문의드립니다.",
      sender: "buyer",
      timestamp: "오전 9:00",
      isRead: true,
    },
    {
      id: "m2",
      text: "네, 안녕하세요! 어떤 스타일을 원하시나요?",
      sender: "seller",
      timestamp: "오전 9:05",
      isRead: true,
    },
    {
      id: "m3",
      text: "심플하고 모던한 느낌으로 부탁드려요.",
      sender: "buyer",
      timestamp: "오전 9:10",
      isRead: true,
    },
    {
      id: "m4",
      text: "알겠습니다. 시안 준비해드리겠습니다!",
      sender: "seller",
      timestamp: "오전 9:15",
      isRead: true,
    },
    {
      id: "m5",
      text: "로고 디자인이 마음에 들어요!",
      sender: "buyer",
      timestamp: "10분 전",
      isRead: false,
    },
  ],
  "2": [
    {
      id: "m6",
      text: "수정 요청드립니다.",
      sender: "buyer",
      timestamp: "1시간 전",
      isRead: true,
    },
  ],
  "3": [
    {
      id: "m7",
      text: "감사합니다!",
      sender: "buyer",
      timestamp: "2시간 전",
      isRead: false,
    },
  ],
};

export const MessagesPage = () => {
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
    <div className="flex h-[calc(100vh-80px)] bg-gradient-to-br from-[#F8FAFC] to-[#F0F7FF]">
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
                    src={chat.buyerAvatar}
                    alt={chat.buyerName}
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
                      {chat.buyerName}
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
                    src={selectedChatData.buyerAvatar}
                    alt={selectedChatData.buyerName}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover ring-2 ring-[#E2E8F0]"
                  />
                  {selectedChatData.isOnline && (
                    <Circle className="absolute bottom-0 right-0 size-3 fill-green-500 text-green-500 ring-2 ring-white" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#0F172A]">{selectedChatData.buyerName}</p>
                  <p className="text-xs text-[#94A3B8]">
                    {selectedChatData.isOnline ? "온라인" : "오프라인"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedChatData.orderId && (
                  <Link
                    href={`/expert/orders/${selectedChatData.orderId}`}
                    className="rounded-lg bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md"
                  >
                    주문 보기
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
                const isSeller = message.sender === "seller";
                const showAvatar = index === 0 || messages[index - 1]?.sender !== message.sender;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isSeller ? "justify-end" : "justify-start"}`}
                  >
                    {!isSeller && showAvatar && (
                      <Image
                        src={selectedChatData.buyerAvatar}
                        alt={selectedChatData.buyerName}
                        width={32}
                        height={32}
                        className="size-8 shrink-0 rounded-full object-cover"
                      />
                    )}
                    {!isSeller && !showAvatar && <div className="w-8" />}
                    <div className={`flex max-w-[70%] flex-col gap-1 ${isSeller ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                          isSeller
                            ? "rounded-tr-sm bg-gradient-to-r from-[#2E5E99] to-[#3B82F6] text-white"
                            : "rounded-tl-sm bg-white text-[#0F172A] ring-1 ring-[#E2E8F0]"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[10px] text-[#94A3B8]">{message.timestamp}</span>
                        {isSeller && (
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
    </div>
  );
};

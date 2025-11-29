"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

type NotificationSettings = {
  email: boolean;
  push: boolean;
  order: boolean;
  message: boolean;
};

export default function ClientSettingsNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    order: true,
    message: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load notification settings", e);
      }
    }
  }, []);

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    localStorage.setItem("notificationSettings", JSON.stringify(settings));

    setIsSaving(false);
    setSaveMessage("설정이 저장되었습니다.");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF]">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/client/settings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#475569] transition-colors hover:text-[#2E5E99]"
        >
          <ArrowLeft className="size-4" />
          <span>설정으로 돌아가기</span>
        </Link>

        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0F172A]">알림 설정</h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673] disabled:opacity-50"
            >
              <Save className="size-4" />
              <span>{isSaving ? "저장 중..." : "저장"}</span>
            </button>
          </div>

          {saveMessage && (
            <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {saveMessage}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div>
                <h3 className="font-semibold text-[#0F172A]">이메일 알림</h3>
                <p className="mt-1 text-sm text-[#64748B]">주문 및 메시지 알림을 이메일로 받습니다</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={settings.email}
                  onChange={() => handleToggle("email")}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div>
                <h3 className="font-semibold text-[#0F172A]">푸시 알림</h3>
                <p className="mt-1 text-sm text-[#64748B]">브라우저 푸시 알림을 받습니다</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={settings.push}
                  onChange={() => handleToggle("push")}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div>
                <h3 className="font-semibold text-[#0F172A]">주문 알림</h3>
                <p className="mt-1 text-sm text-[#64748B]">주문 상태 변경 시 알림을 받습니다</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={settings.order}
                  onChange={() => handleToggle("order")}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div>
                <h3 className="font-semibold text-[#0F172A]">메시지 알림</h3>
                <p className="mt-1 text-sm text-[#64748B]">새로운 메시지가 도착할 때 알림을 받습니다</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={settings.message}
                  onChange={() => handleToggle("message")}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

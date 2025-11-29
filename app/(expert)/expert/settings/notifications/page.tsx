"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

type NotificationSettings = {
  order: boolean;
  message: boolean;
  review: boolean;
  earnings: boolean;
};

export default function ExpertSettingsNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    order: true,
    message: true,
    review: true,
    earnings: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sellerNotificationSettings");
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

    localStorage.setItem("sellerNotificationSettings", JSON.stringify(settings));

    setIsSaving(false);
    setSaveMessage("설정이 저장되었습니다.");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF]">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/expert/settings"
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
                <h3 className="font-semibold text-[#0F172A]">주문 알림</h3>
                <p className="mt-1 text-sm text-[#64748B]">새로운 주문이 들어올 때 알림을 받습니다</p>
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
                <p className="mt-1 text-sm text-[#64748B]">구매자로부터 메시지를 받을 때 알림</p>
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

            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div>
                <h3 className="font-semibold text-[#0F172A]">리뷰 알림</h3>
                <p className="mt-1 text-sm text-[#64748B]">새로운 리뷰가 작성될 때 알림</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={settings.review}
                  onChange={() => handleToggle("review")}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div>
                <h3 className="font-semibold text-[#0F172A]">수익 알림</h3>
                <p className="mt-1 text-sm text-[#64748B]">수익 관련 업데이트 알림</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={settings.earnings}
                  onChange={() => handleToggle("earnings")}
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

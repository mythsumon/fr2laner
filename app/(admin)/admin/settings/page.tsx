"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Image,
  Palette,
  CreditCard,
  Mail,
  MessageSquare,
  Server,
  Database,
  Save,
  Upload,
  FileText,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { Toast } from "@/components/page/admin/shared/Toast";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import { useToast } from "@/hooks/useToast";

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const { toast, showToast, hideToast } = useToast();

  const [settings, setSettings] = useState({
    platformName: "FreelanceMarket",
    email: "admin@example.com",
    maintenanceMode: false,
    maintenanceMessage: "",
    commissionRate: 15,
    paymentGateways: {
      creditCard: true,
      bankTransfer: true,
      virtualAccount: false,
      paypal: false,
    },
    policies: {
      termsOfService: "",
      privacyPolicy: "",
      refundPolicy: "",
      userAgreement: "",
    },
    smtp: {
      host: "smtp.gmail.com",
      port: "587",
      username: "",
      password: "",
    },
    sms: {
      provider: "",
      apiKey: "",
    },
  });

  const handleSaveSettings = () => {
    // Save settings to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_settings", JSON.stringify(settings));
    }
    showToast("설정이 저장되었습니다.", "success");
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("admin_settings");
      if (storedSettings) {
        try {
          const parsedSettings = JSON.parse(storedSettings);
          setSettings(parsedSettings);
        } catch (e) {
          console.warn("Failed to parse admin_settings from localStorage", e);
        }
      }
    }
  }, []);

  const handleLogoUpload = () => {
    showToast("로고가 업로드되었습니다.", "success");
  };

  const handleBackup = () => {
    showToast("백업이 생성되었습니다.", "success");
  };

  const handleDownloadBackup = (backupName: string) => {
    showToast(`${backupName} 백업이 다운로드되었습니다.`, "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">시스템 설정</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">플랫폼 설정을 관리하세요</p>
        </div>
        <Button type="primary" onClick={handleSaveSettings}>
          <Save className="size-4 mr-2" />
          저장
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-1">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { id: "general", label: "일반", icon: Settings },
            { id: "appearance", label: "외관", icon: Palette },
            { id: "payment", label: "결제", icon: CreditCard },
            { id: "email", label: "이메일", icon: Mail },
            { id: "sms", label: "SMS/OTP", icon: MessageSquare },
            { id: "maintenance", label: "유지보수", icon: Server },
            { id: "backup", label: "백업", icon: Database },
            { id: "policies", label: "정책", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#2E5E99] text-white"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                <Icon className="size-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">플랫폼 이름</label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">로고</label>
            <div className="flex items-center gap-4">
              <div className="size-20 bg-[#F8FAFC] rounded-lg flex items-center justify-center border border-[#E2E8F0]">
                <Image className="size-8 text-[#64748B]" />
              </div>
              <Button type="outline" onClick={handleLogoUpload}>
                <Upload className="size-4 mr-2" />
                로고 업로드
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">이메일 주소</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Payment Tab */}
      {activeTab === "payment" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">수수료 설정</h3>
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  플랫폼 수수료율 (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.commissionRate}
                  onChange={(e) => setSettings({ ...settings, commissionRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  placeholder="예: 15"
                />
                <p className="text-xs text-[#64748B] mt-1">주문 금액의 {settings.commissionRate}%가 플랫폼 수수료로 차감됩니다.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">결제 게이트웨이</h3>
            <div className="space-y-4">
              {[
                { key: "creditCard", name: "신용카드" },
                { key: "bankTransfer", name: "계좌이체" },
                { key: "virtualAccount", name: "가상계좌" },
                { key: "paypal", name: "페이팔" },
              ].map((gateway) => (
                <div key={gateway.key} className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0]">
                  <span className="font-medium text-[#0F172A]">{gateway.name}</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={settings.paymentGateways[gateway.key as keyof typeof settings.paymentGateways]}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          paymentGateways: {
                            ...settings.paymentGateways,
                            [gateway.key]: e.target.checked,
                          },
                        })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Email Tab */}
      {activeTab === "email" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">SMTP 호스트</label>
            <input
              type="text"
              value={settings.smtp.host}
              onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, host: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">포트</label>
            <input
              type="number"
              value={settings.smtp.port}
              onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, port: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">사용자 이름</label>
            <input
              type="text"
              value={settings.smtp.username}
              onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, username: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">비밀번호</label>
            <input
              type="password"
              value={settings.smtp.password}
              onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, password: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* SMS Tab */}
      {activeTab === "sms" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">SMS 제공업체</label>
            <input
              type="text"
              value={settings.sms.provider}
              onChange={(e) => setSettings({ ...settings, sms: { ...settings.sms, provider: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
              placeholder="예: Twilio, AWS SNS"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">API 키</label>
            <input
              type="password"
              value={settings.sms.apiKey}
              onChange={(e) => setSettings({ ...settings, sms: { ...settings.sms, apiKey: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Maintenance Tab */}
      {activeTab === "maintenance" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0]">
            <div>
              <h4 className="font-medium text-[#0F172A]">유지보수 모드</h4>
              <p className="text-sm text-[#64748B] mt-1">사이트를 유지보수 모드로 전환합니다</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">유지보수 메시지</label>
            <textarea
              rows={4}
              value={settings.maintenanceMessage}
              onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
              placeholder="유지보수 중 메시지를 입력하세요..."
            />
          </div>
        </div>
      )}

      {/* Policies Tab */}
      {activeTab === "policies" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">정책 문서 관리</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">이용약관</label>
                <textarea
                  rows={8}
                  value={settings.policies.termsOfService}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      policies: { ...settings.policies, termsOfService: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  placeholder="이용약관 내용을 입력하세요..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">개인정보 처리방침</label>
                <textarea
                  rows={8}
                  value={settings.policies.privacyPolicy}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      policies: { ...settings.policies, privacyPolicy: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  placeholder="개인정보 처리방침 내용을 입력하세요..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">환불 정책</label>
                <textarea
                  rows={8}
                  value={settings.policies.refundPolicy}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      policies: { ...settings.policies, refundPolicy: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  placeholder="환불 정책 내용을 입력하세요..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">사용자 계약</label>
                <textarea
                  rows={8}
                  value={settings.policies.userAgreement}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      policies: { ...settings.policies, userAgreement: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none"
                  placeholder="사용자 계약 내용을 입력하세요..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === "backup" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">백업 관리</h3>
            <div className="space-y-3">
              {[
                { name: "데이터베이스 백업", date: "2024-03-15 14:30", size: "2.5 GB" },
                { name: "파일 백업", date: "2024-03-15 14:30", size: "1.2 GB" },
              ].map((backup) => (
                <div key={backup.name} className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0]">
                  <div>
                    <p className="font-medium text-[#0F172A]">{backup.name}</p>
                    <p className="text-sm text-[#64748B] mt-1">
                      {backup.date} • {backup.size}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" type="outline" onClick={() => handleDownloadBackup(backup.name)}>
                      다운로드
                    </Button>
                    <Button size="sm" type="primary" onClick={handleBackup}>
                      새 백업
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

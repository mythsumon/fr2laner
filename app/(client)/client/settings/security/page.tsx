"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Key, Lock, Smartphone, Shield, X, Eye, EyeOff, Trash2, AlertTriangle } from "lucide-react";

interface AdminPolicies {
  termsOfService: string;
  privacyPolicy: string;
  refundPolicy: string;
  userAgreement: string;
}

export default function ClientSettingsSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLoginActivity, setShowLoginActivity] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [policies, setPolicies] = useState<AdminPolicies>({
    termsOfService: "",
    privacyPolicy: "",
    refundPolicy: "",
    userAgreement: "",
  });

  // Load policies from admin settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("admin_settings");
      if (storedSettings) {
        try {
          const parsedSettings = JSON.parse(storedSettings);
          if (parsedSettings.policies) {
            setPolicies(parsedSettings.policies);
          }
        } catch (e) {
          console.warn("Failed to parse admin_settings from localStorage", e);
        }
      }
    }
  }, []);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    alert("비밀번호가 변경되었습니다.");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  const loginHistory = [
    { device: "Chrome on Windows", location: "서울, 대한민국", time: "2024-01-15 14:30", ip: "192.168.1.1" },
    { device: "Safari on iPhone", location: "서울, 대한민국", time: "2024-01-14 09:15", ip: "192.168.1.2" },
    { device: "Chrome on Android", location: "부산, 대한민국", time: "2024-01-13 18:45", ip: "192.168.1.3" },
  ];

  const apiKeys = [
    { id: "1", name: "Production API", key: "sk_live_1234567890abcdef", created: "2024-01-10", lastUsed: "2024-01-15" },
    { id: "2", name: "Development API", key: "sk_test_abcdef1234567890", created: "2024-01-05", lastUsed: "2024-01-12" },
  ];

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
          <h1 className="mb-6 text-2xl font-bold text-[#0F172A]">보안 및 인증</h1>

          <div className="space-y-4">
            {/* Password Change */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99]">
                    <Lock className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">비밀번호 변경</h3>
                    <p className="mt-1 text-sm text-[#64748B]">계정 보안을 위해 정기적으로 비밀번호를 변경하세요</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="rounded-xl bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]"
                >
                  변경
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99]">
                    <Shield className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">2단계 인증</h3>
                    <p className="mt-1 text-sm text-[#64748B]">추가 보안 계층으로 계정을 보호하세요</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E5E99] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>

            {/* Login Activity */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99]">
                    <Smartphone className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">로그인 활동</h3>
                    <p className="mt-1 text-sm text-[#64748B]">최근 로그인 기록을 확인하세요</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLoginActivity(true)}
                  className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                >
                  확인
                </button>
              </div>
            </div>

            {/* API Keys */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99]">
                    <Key className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">API 키 관리</h3>
                    <p className="mt-1 text-sm text-[#64748B]">애플리케이션 API 키를 생성하고 관리하세요</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowApiKeys(true)}
                  className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                >
                  관리
                </button>
              </div>
            </div>

            {/* Account Deletion */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <AlertTriangle className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">계정 삭제</h3>
                    <p className="mt-1 text-sm text-[#64748B]">
                      계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                    </p>
                    {policies.userAgreement && (
                      <p className="mt-2 text-xs text-[#94A3B8]">
                        계정 삭제 정책: {policies.userAgreement.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowDeleteAccountModal(true)}
                  className="rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  계정 삭제
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">비밀번호 변경</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="rounded-lg p-1 text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">현재 비밀번호</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 pr-10 text-sm focus:border-[#2E5E99] focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  >
                    {showPasswords.current ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">새 비밀번호</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 pr-10 text-sm focus:border-[#2E5E99] focus:outline-none"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  >
                    {showPasswords.new ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-[#64748B]">최소 8자 이상</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">새 비밀번호 확인</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 pr-10 text-sm focus:border-[#2E5E99] focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  >
                    {showPasswords.confirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#2E5E99] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]"
                >
                  변경하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Activity Modal */}
      {showLoginActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">로그인 활동</h2>
              <button
                onClick={() => setShowLoginActivity(false)}
                className="rounded-lg p-1 text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3">
              {loginHistory.map((login, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#0F172A]">{login.device}</p>
                      <p className="mt-1 text-sm text-[#64748B]">{login.location}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">{login.time} • IP: {login.ip}</p>
                    </div>
                    {index === 0 && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        현재 세션
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Keys Modal */}
      {showApiKeys && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">API 키 관리</h2>
              <div className="flex items-center gap-2">
                <button className="rounded-xl bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]">
                  새 키 생성
                </button>
                <button
                  onClick={() => setShowApiKeys(false)}
                  className="rounded-lg p-1 text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-[#0F172A]">{apiKey.name}</p>
                      <p className="mt-1 font-mono text-sm text-[#64748B]">{apiKey.key}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">
                        생성: {apiKey.created} • 마지막 사용: {apiKey.lastUsed}
                      </p>
                    </div>
                    <button className="rounded-lg p-2 text-[#EF4444] transition-colors hover:bg-red-50">
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">계정 삭제 확인</h2>
              <button
                onClick={() => setShowDeleteAccountModal(false)}
                className="rounded-lg p-1 text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900">경고: 이 작업은 되돌릴 수 없습니다</p>
                    <p className="mt-1 text-sm text-red-700">
                      계정을 삭제하면 모든 주문, 메시지, 프로필 정보가 영구적으로 삭제됩니다.
                    </p>
                  </div>
                </div>
              </div>
              {policies.userAgreement && (
                <div className="max-h-32 overflow-y-auto rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs text-[#64748B]">
                  <p className="font-semibold text-[#0F172A] mb-1">계정 삭제 정책:</p>
                  <p className="whitespace-pre-wrap">{policies.userAgreement}</p>
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  계정 삭제를 확인하려면 "DELETE"를 입력하세요
                </label>
                <input
                  type="text"
                  id="deleteConfirm"
                  placeholder="DELETE"
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteAccountModal(false)}
                  className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    const confirmInput = document.getElementById("deleteConfirm") as HTMLInputElement;
                    if (confirmInput?.value === "DELETE") {
                      alert("계정이 삭제되었습니다.");
                      // Clear localStorage and redirect
                      localStorage.clear();
                      window.location.href = "/";
                    } else {
                      alert("확인 문구를 정확히 입력해주세요.");
                    }
                  }}
                  className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  계정 삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

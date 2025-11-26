"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Shield, Lock, Mail, AlertCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/shared/common";
import { LanguageSelector } from "@/components/shared/ui";

interface SampleAccount {
  email: string;
  password: string;
  roleKey: string;
  permissionsKey: string;
}

// Sample admin accounts for demo
const sampleAccounts: SampleAccount[] = [
  {
    email: "admin@example.com",
    password: "admin1234",
    roleKey: "adminLogin.sampleAccounts.roles.superAdmin",
    permissionsKey: "adminLogin.sampleAccounts.permissions.full",
  },
  {
    email: "moderator@example.com",
    password: "moderator1234",
    roleKey: "adminLogin.sampleAccounts.roles.moderator",
    permissionsKey: "adminLogin.sampleAccounts.permissions.moderator",
  },
];

export default function SuperAdminLoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    twoFactorCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate login validation
      const isValid = 
        (formData.email === "admin@example.com" && formData.password === "admin1234") ||
        (formData.email === "moderator@example.com" && formData.password === "moderator1234") ||
        formData.email.includes("@") && formData.password.length >= 6;

      if (!isValid) {
        setError(t("adminLogin.errors.invalid"));
        setIsLoading(false);
        return;
      }

      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Save admin user data to localStorage
      const userData = {
        id: "admin-1",
        email: formData.email || "admin@example.com",
        name: formData.email.includes("moderator") ? t("adminLogin.sampleAccounts.roles.moderator") : t("adminLogin.sampleAccounts.roles.superAdmin"),
        role: "admin" as const,
      };
      const token = `admin-token-${Date.now()}`;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Use window.location for full page reload to ensure auth state is fresh
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(t("adminLogin.errors.generic"));
      setIsLoading(false);
    }
  };

  const handleUseAccount = (account: SampleAccount) => {
    setFormData({
      ...formData,
      email: account.email,
      password: account.password,
    });
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E5E99] via-[#1e4a7a] to-[#0f2d4a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                <Shield className="size-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{t("adminLogin.title")}</h1>
              <p className="text-white/80">{t("adminLogin.subtitle")}</p>
            </div>
            <div className="ml-4 hidden sm:block">
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-4 flex justify-end sm:hidden">
            <LanguageSelector />
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="size-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                {t("adminLogin.emailLabel")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                  placeholder={t("adminLogin.emailPlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                {t("adminLogin.passwordLabel")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                  placeholder={t("adminLogin.passwordPlaceholder")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#2E5E99]"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* 2FA Code (Optional) */}
            {show2FA && (
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  {t("adminLogin.twoFactorLabel")}
                </label>
                <input
                  type="text"
                  value={formData.twoFactorCode}
                  onChange={(e) => setFormData({ ...formData, twoFactorCode: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
                  placeholder={t("adminLogin.twoFactorPlaceholder")}
                  maxLength={6}
                />
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={show2FA}
                  onChange={(e) => setShow2FA(e.target.checked)}
                  className="rounded border-[#E2E8F0] text-[#2E5E99] focus:ring-[#2E5E99]"
                />
                <span className="text-sm text-[#64748B]">{t("adminLogin.enable2fa")}</span>
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-sm text-[#2E5E99] hover:underline font-medium"
              >
                {t("adminLogin.forgotPassword")}
              </Link>
            </div>

          {/* Submit Button */}
          <Button
            htmlType="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {t("adminLogin.loginButton")}
          </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <p className="text-xs text-[#64748B] text-center">
              🔒 {t("adminLogin.securityNotice")}: {t("adminLogin.securityDetail")}
            </p>
          </div>
        </div>

        {/* Sample Accounts */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="size-5" />
            {t("adminLogin.sampleAccountsTitle")}
          </h3>
          <p className="text-sm text-white/80 mb-4">{t("adminLogin.sampleAccountsDescription")}</p>
          <div className="space-y-3">
            {sampleAccounts.map((account, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{t(account.roleKey)}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                        {t(account.permissionsKey)}
                      </span>
                    </div>
                    <p className="text-xs text-white/70">{t(account.permissionsKey)}</p>
                  </div>
                  <Button
                    type="ghost"
                    size="sm"
                    onClick={() => handleUseAccount(account)}
                    className="text-white hover:bg-white/20 border-white/30"
                  >
                    {t("adminLogin.useAccount")}
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-white/70" />
                    <span className="text-sm text-white/90 flex-1 font-mono">{account.email}</span>
                    <button
                      onClick={() => handleCopy(account.email, `email-${index}`)}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                      title={t("adminLogin.copyEmail")}
                    >
                      {copiedField === `email-${index}` ? (
                        <Check className="size-4 text-green-300" />
                      ) : (
                        <Copy className="size-4 text-white/70" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="size-4 text-white/70" />
                    <span className="text-sm text-white/90 flex-1 font-mono">{account.password}</span>
                    <button
                      onClick={() => handleCopy(account.password, `password-${index}`)}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                      title={t("adminLogin.copyPassword")}
                    >
                      {copiedField === `password-${index}` ? (
                        <Check className="size-4 text-green-300" />
                      ) : (
                        <Copy className="size-4 text-white/70" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
            <p className="text-xs text-yellow-100 text-center">
              ⚠️ {t("adminLogin.sampleWarningDetail")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


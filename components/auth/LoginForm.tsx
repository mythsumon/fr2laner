"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useAuth } from "@/hooks/useAuth";

export type LoginMode = "client" | "expert";

type LoginFormProps = {
  mode?: LoginMode;
  onResetMode?: () => void;
};

// Sample accounts for demo
const sampleAccounts = {
  client: {
    email: "client@demo.com",
    password: "demo1234",
    labelKey: "auth.login.sample.accounts.client",
  },
  expert: {
    email: "expert@demo.com",
    password: "demo1234",
    labelKey: "auth.login.sample.accounts.expert",
  },
} as const;

export const LoginForm = ({ mode, onResetMode }: LoginFormProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const modeLabel = mode ? t(`auth.login.modes.${mode}.label`) : undefined;
  const subtitle = t(`auth.login.modes.${mode ?? "default"}.description`);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      // status 체크
      if (data.user.status !== "active") {
        const statusMessage =
          data.user.status === "suspended"
            ? "계정이 정지되었습니다."
            : data.user.status === "banned"
              ? "계정이 영구 정지되었습니다."
              : "계정 상태를 확인할 수 없습니다.";
        throw new Error(statusMessage);
      }

      // 로그인 처리 - useAuth hook 사용
      login(data.user, data.token);

      // role 기반 리다이렉트
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get("redirect");

      if (redirect) {
        router.push(redirect);
        router.refresh(); // Next.js 13+ router refresh
      } else {
        if (data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (data.user.role === "client") {
          router.push("/client/dashboard");
        } else if (data.user.role === "expert") {
          router.push("/expert/dashboard");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseSampleAccount = () => {
    const account = mode ? sampleAccounts[mode] : sampleAccounts.client;
    setEmail(account.email);
    setPassword(account.password);
  };

  const handleQuickLogin = async () => {
    const account = mode ? sampleAccounts[mode] : sampleAccounts.client;
    setEmail(account.email);
    setPassword(account.password);
    
    // Auto submit after a short delay
    setTimeout(async () => {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: account.email,
            password: account.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "로그인에 실패했습니다.");
        }

        if (data.user.status !== "active") {
          const statusMessage =
            data.user.status === "suspended"
              ? "계정이 정지되었습니다."
              : data.user.status === "banned"
                ? "계정이 영구 정지되었습니다."
                : "계정 상태를 확인할 수 없습니다.";
          throw new Error(statusMessage);
        }

        login(data.user, data.token);

        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get("redirect");

        if (redirect) {
          router.push(redirect);
          router.refresh();
        } else {
          if (data.user.role === "admin") {
            router.push("/admin/dashboard");
          } else if (data.user.role === "client") {
            router.push("/client/dashboard");
          } else if (data.user.role === "expert") {
            router.push("/expert/dashboard");
          } else {
            router.push("/");
          }
          router.refresh();
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    }, 100);
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

  const currentSampleAccount = mode ? sampleAccounts[mode] : null;
  const socialProviders = useMemo(
    () => [
      { key: "kakao", label: t("auth.login.social.kakao") },
      { key: "naver", label: t("auth.login.social.naver") },
      { key: "google", label: t("auth.login.social.google") },
    ],
    [t]
  );

  return (
    <div className="space-y-6">
      {/* ChatGPT/테스트 사용자 안내 */}
      <div className="rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <h3 className="text-sm font-bold text-amber-900">ChatGPT / 테스트 사용자를 위한 빠른 로그인</h3>
            </div>
            <p className="text-xs text-amber-700">
              아래 <strong>"원클릭 로그인"</strong> 버튼을 클릭하면 테스트 계정으로 자동 로그인됩니다.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {modeLabel && (
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-600">{modeLabel}</p>
            )}
            <h1 className="text-2xl font-semibold text-slate-900">{t("auth.login.heading")}</h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          {mode && onResetMode && (
            <button
              type="button"
              onClick={onResetMode}
              className="text-xs font-medium text-slate-400 underline-offset-4 transition-colors hover:text-sky-600"
            >
              {t("auth.login.chooseAnother")}
            </button>
          )}
        </div>
      </div>

      {/* Sample Account Display */}
      {currentSampleAccount && (
        <div className="rounded-xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 to-blue-50 p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-lg">✨</span>
                <h3 className="text-base font-bold text-sky-900">{t(currentSampleAccount.labelKey)}</h3>
              </div>
              <p className="text-xs text-sky-700">{t("auth.login.sample.description")}</p>
            </div>
          </div>
          
          {/* Quick Login Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:from-sky-700 hover:to-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  로그인 중...
                </span>
              ) : (
                "🚀 원클릭 로그인 (테스트 계정)"
              )}
            </button>
          </div>

          {/* Account Info */}
          <div className="mb-3">
            <p className="mb-2 text-xs font-semibold text-sky-800">또는 수동으로 입력:</p>
            <button
              type="button"
              onClick={handleUseSampleAccount}
              className="w-full rounded-lg border border-sky-300 bg-white px-3 py-2 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-50"
            >
              📋 계정 정보 입력하기
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-xs">
              <span className="w-16 shrink-0 font-medium text-sky-700">{t("auth.login.sample.emailLabel")}:</span>
              <span className="flex-1 font-mono text-sky-900">{currentSampleAccount.email}</span>
              <button
                type="button"
                onClick={() => handleCopy(currentSampleAccount.email, "email")}
                className="flex size-6 items-center justify-center rounded text-sky-600 transition-colors hover:bg-sky-100"
                title={t("auth.login.sample.copy")}
              >
                {copiedField === "email" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-xs">
              <span className="w-16 shrink-0 font-medium text-sky-700">{t("auth.login.sample.passwordLabel")}:</span>
              <span className="flex-1 font-mono text-sky-900">{currentSampleAccount.password}</span>
              <button
                type="button"
                onClick={() => handleCopy(currentSampleAccount.password, "password")}
                className="flex size-6 items-center justify-center rounded text-sky-600 transition-colors hover:bg-sky-100"
                title={t("auth.login.sample.copy")}
              >
                {copiedField === "password" ? (
                  <Check className="size-3.5 text-green-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            {t("auth.login.fields.email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder={t("auth.login.fields.emailPlaceholder")}
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-semibold text-slate-700">
            {t("auth.login.fields.password")}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder={t("auth.login.fields.passwordPlaceholder")}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            {t("auth.login.remember")}
          </label>
          <Link href="/auth/reset" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
            {t("auth.login.forgot")}
          </Link>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="!h-12 !w-full rounded-xl !bg-sky-600 text-sm font-semibold text-white hover:!bg-sky-700"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("auth.login.submit")}
        </Button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          {t("auth.login.socialDivider")}
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {socialProviders.map((provider) => (
            <button
              key={provider.key}
              type="button"
              className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              {provider.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-slate-500">
        {t("auth.login.noAccount")}{" "}
        <Link href="/signup" className="font-semibold text-sky-600 hover:text-sky-700">
          {t("auth.login.signUp")}
        </Link>
      </p>

      <div className="pt-4 border-t border-slate-200">
        <Link
          href="/dashboard"
          className="flex items-center justify-center w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          {t("header.nav.sellerDashboard", { defaultValue: "Seller Dashboard" })}
        </Link>
      </div>
    </div>
  );
};

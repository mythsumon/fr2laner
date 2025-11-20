"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/common";

export type LoginMode = "client" | "expert";

type LoginFormProps = {
  mode?: LoginMode;
  onResetMode?: () => void;
};

export const LoginForm = ({ mode, onResetMode }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modeLabel = mode === "client" ? "의뢰인으로 로그인" : mode === "expert" ? "전문가로 로그인" : undefined;
  const subtitle =
    mode === "client"
      ? "프로젝트를 의뢰하고 전문가를 찾아보세요."
      : mode === "expert"
        ? "전문가로 활동하고 수익을 창출해보세요."
        : "프리랜서마켓 계정으로 다양한 서비스를 이용해보세요.";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {modeLabel && (
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-600">{modeLabel}</p>
            )}
            <h1 className="text-2xl font-semibold text-slate-900">로그인</h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          {mode && onResetMode && (
            <button
              type="button"
              onClick={onResetMode}
              className="text-xs font-medium text-slate-400 underline-offset-4 transition-colors hover:text-sky-600"
            >
              ← 이용 방식 다시 선택하기
            </button>
          )}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-semibold text-slate-700">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="••••••••"
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
            로그인 상태 유지
          </label>
          <Link href="/auth/reset" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="!h-12 !w-full rounded-xl !bg-sky-600 text-sm font-semibold text-white hover:!bg-sky-700"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          로그인
        </Button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          or continue with
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {["카카오", "네이버", "Google"].map((provider) => (
            <button
              key={provider}
              type="button"
              className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              {provider}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-slate-500">
        계정이 없나요?{" "}
        <Link href="/signup" className="font-semibold text-sky-600 hover:text-sky-700">
          회원가입
        </Link>
      </p>
    </div>
  );
};


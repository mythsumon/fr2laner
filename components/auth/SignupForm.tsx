"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/common";

export type SignupMode = "client" | "expert";

type SignupFormProps = {
  mode?: SignupMode;
  onResetMode?: () => void;
};

export const SignupForm = ({ mode, onResetMode }: SignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modeLabel = mode === "client" ? "의뢰인으로 가입" : mode === "expert" ? "전문가로 가입" : undefined;
  const subtitle =
    mode === "client"
      ? "프로젝트를 의뢰하고 전문가를 찾아보세요."
      : mode === "expert"
        ? "전문가로 활동하고 수익을 창출해보세요."
        : "프리랜서마켓 계정을 만들어 다양한 서비스를 이용해보세요.";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!acceptTerms) {
      alert("이용약관에 동의해주세요.");
      return;
    }
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
            <h1 className="text-2xl font-semibold text-slate-900">회원가입</h1>
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
          <label htmlFor="name" className="text-sm font-semibold text-slate-700">
            이름
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="홍길동"
            required
          />
        </div>
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
            minLength={8}
          />
          <p className="text-xs text-slate-400">8자 이상 입력해주세요.</p>
        </div>
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="••••••••"
            required
            minLength={8}
          />
        </div>
        <div className="space-y-3">
          <label className="inline-flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              checked={acceptTerms}
              onChange={(event) => setAcceptTerms(event.target.checked)}
              required
            />
            <span>
              <Link href="/terms" className="font-semibold text-sky-600 hover:text-sky-700 underline">
                이용약관
              </Link>
              과{" "}
              <Link href="/privacy" className="font-semibold text-sky-600 hover:text-sky-700 underline">
                개인정보처리방침
              </Link>
              에 동의합니다.
            </span>
          </label>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="!h-12 !w-full rounded-xl !bg-sky-600 text-sm font-semibold text-white hover:!bg-sky-700"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          회원가입
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
        이미 계정이 있나요?{" "}
        <Link href="/login" className="font-semibold text-sky-600 hover:text-sky-700">
          로그인
        </Link>
      </p>
    </div>
  );
};



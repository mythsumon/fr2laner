"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../shared/common";
import { LanguageSelector } from "../shared/ui";
import { CategorySelect } from "../nav/CategorySelect";
import { cn } from "../shared/utils";
import { Menu, X, Shield } from "lucide-react";

const menuLinks = [
  { key: "header.menu.forFreelancers", href: "/for-freelancers" },
  { key: "header.menu.findTalent", href: "/find-talent" },
  { key: "header.menu.howItWorks", href: "#how-it-works" },
];

export const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileNavOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileNavOpen]);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  const baseContainerStyles = "mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 transition-all duration-200";

  return (
    <nav className="site-header sticky top-0 z-50 w-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
      <div
        className={cn(
          baseContainerStyles,
          scrolled ? "h-[64px]" : "h-[72px]"
        )}
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2E5E99]/10 text-[#2E5E99]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                  fillOpacity="0.7"
                />
                <path
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <Link
              href="/"
              className="text-xl font-bold text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
            >
              {t("brand")}
            </Link>
          </div>
          <ul className="hidden items-center gap-6 lg:flex">
            <li>
              <CategorySelect />
            </li>
            {menuLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-[#0F172A] transition-colors hover:text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <LanguageSelector />
            <Link href="/admin/login" className="inline-flex" title="관리자 로그인">
              <Button
                type="text"
                shape="round"
                className="h-11 px-3 text-sm font-semibold text-[#64748B] hover:bg-[#E9EEF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                <Shield className="size-4" />
              </Button>
            </Link>
            <Link href="/login" className="inline-flex">
              <Button
                type="text"
                shape="round"
                className="h-11 px-5 text-sm font-semibold text-[#0F172A] hover:bg-[#E9EEF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                {t("header.nav.login")}
              </Button>
            </Link>
            <Link href="/signup" className="hidden lg:inline-flex">
              <Button
                type="default"
                shape="round"
                className="h-11 border border-[#2E5E99] bg-[#2E5E99] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                {t("header.nav.signUp")}
              </Button>
            </Link>
            <Link href="/signup" className="inline-flex">
              <Button
                type="default"
                shape="round"
                className="h-11 border-none bg-[#2E5E99]/10 px-5 text-sm font-semibold text-[#2E5E99] transition-colors hover:bg-[#2E5E99]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
              >
                {t("header.nav.postProject")}
              </Button>
            </Link>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E2E8F0] text-[#0F172A] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99] sm:hidden"
            aria-label={isMobileNavOpen ? t("header.nav.closeMenu") : t("header.nav.openMenu")}
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            {isMobileNavOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isMobileNavOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" onClick={closeMobileNav} aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 z-50 w-[min(320px,85vw)] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
              <span className="text-base font-semibold text-[#0F172A]">{t("header.nav.menuTitle", { defaultValue: "Menu" })}</span>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#475569] transition-colors hover:bg-[#EAF6FF] hover:text-[#2E5E99]"
                aria-label={t("header.nav.closeMenu")}
                onClick={closeMobileNav}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-6 overflow-y-auto px-6 py-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  {t("header.nav.categoriesTitle", { defaultValue: "Categories" })}
                </p>
                <CategorySelect />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  {t("header.nav.linksTitle", { defaultValue: "Navigation" })}
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/"
                    onClick={closeMobileNav}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"
                  >
                    {t("header.nav.home", { defaultValue: "Home" })}
                  </Link>
                  {menuLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={closeMobileNav}
                      className="rounded-xl px-4 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <LanguageSelector />
                <Link href="/admin/login" onClick={closeMobileNav} className="w-full">
                  <Button
                    type="text"
                    shape="round"
                    className="w-full border border-[#E2E8F0] px-5 py-2 text-sm font-semibold text-[#64748B] flex items-center justify-center gap-2"
                  >
                    <Shield className="size-4" />
                    관리자
                  </Button>
                </Link>
                <Link href="/login" onClick={closeMobileNav} className="w-full">
                  <Button
                    type="text"
                    shape="round"
                    className="w-full border border-[#E2E8F0] px-5 py-2 text-sm font-semibold text-[#0F172A]"
                  >
                    {t("header.nav.login")}
                  </Button>
                </Link>
                <Link href="/signup" onClick={closeMobileNav} className="w-full">
                  <Button
                    type="default"
                    shape="round"
                    className="w-full border border-[#2E5E99] bg-[#2E5E99] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]"
                  >
                    {t("header.nav.signUp")}
                  </Button>
                </Link>
                <Link href="/signup" onClick={closeMobileNav} className="w-full">
                  <Button
                    type="default"
                    shape="round"
                    className="w-full border-none bg-[#2E5E99]/10 px-5 text-sm font-semibold text-[#2E5E99] transition-colors hover:bg-[#2E5E99]/20"
                  >
                    {t("header.nav.postProject")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

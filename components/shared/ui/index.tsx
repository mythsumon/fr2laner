"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";
import { useLang } from "@/providers/LangProvider";

const languageOptions = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "kr", label: "한국어", flag: "🇰🇷" },
];

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, isLoading } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  const activeLanguage =
    languageOptions.find((option) => option.value === currentLanguage) ?? languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-selector")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = async (value: string) => {
    if (value === currentLanguage || isLoading) return;
    await changeLanguage(value);
    setIsOpen(false);
  };

  return (
    <div className="relative language-selector">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2E5E99] hover:text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isLoading}
      >
        <span className="text-lg" aria-hidden="true">
          {activeLanguage?.flag ?? <Globe className="size-4" />}
        </span>
        <span>{activeLanguage?.label}</span>
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.15)]">
          <ul className="py-1" role="listbox">
            {languageOptions.map((option) => {
              const isActive = option.value === currentLanguage;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors ${
                      isActive ? "bg-[#E9EEF8] text-[#2E5E99]" : "text-[#475569] hover:bg-[#F8FAFC]"
                    }`}
                    role="option"
                    aria-selected={isActive}
                    disabled={isActive}
                  >
                    <span className="text-lg" aria-hidden="true">
                      {option.flag}
                    </span>
                    <span className="flex-1 text-left">{option.label}</span>
                    {isActive && <Check className="size-4 text-[#2E5E99]" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

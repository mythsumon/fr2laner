"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const footerSections = [
  {
    titleKey: "footer.categories.title",
    itemKeys: [
      "footer.categories.items.logoDesign",
      "footer.categories.items.webDevelopment",
      "footer.categories.items.videoEditing",
      "footer.categories.items.contentWriting",
    ],
  },
  {
    titleKey: "footer.about.title",
    itemKeys: [
      "footer.about.items.aboutUs",
      "footer.about.items.careers",
      "footer.about.items.press",
      "footer.about.items.partnerships",
    ],
  },
  {
    titleKey: "footer.support.title",
    itemKeys: [
      "footer.support.items.help",
      "footer.support.items.trust",
      "footer.support.items.selling",
      "footer.support.items.buying",
    ],
  },
  {
    titleKey: "footer.community.title",
    itemKeys: [
      "footer.community.items.events",
      "footer.community.items.blog",
      "footer.community.items.forum",
      "footer.community.items.podcast",
    ],
  },
];

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer border-t border-[#E0E0E0] bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
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
              <Link href="/" className="text-xl font-bold text-[#1A202C]">
                {t("brand")}
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#6B7280]">{t("footer.description")}</p>
          </div>

          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h3 className="text-lg font-semibold text-[#1A202C]">{t(section.titleKey)}</h3>
              <ul className="mt-4 space-y-3">
                {section.itemKeys.map((itemKey) => (
                  <li key={itemKey}>
                    <Link href="#" className="text-sm text-[#6B7280] transition-colors hover:text-[#2E5E99]">
                      {t(itemKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#E0E0E0] pt-8 text-sm text-[#6B7280] sm:flex-row">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors hover:text-[#2E5E99]">
              {t("footer.legal.terms")}
            </Link>
            <Link href="#" className="transition-colors hover:text-[#2E5E99]">
              {t("footer.legal.privacy")}
            </Link>
            <Link href="#" className="transition-colors hover:text-[#2E5E99]">
              {t("footer.legal.sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

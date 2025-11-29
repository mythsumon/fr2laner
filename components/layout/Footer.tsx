"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const footerSections: Array<{
  titleKey: string;
  itemKeys: string[];
  links?: Array<{ key: string; href: string }>;
}> = [
  {
    titleKey: "footer.support.title",
    itemKeys: [
      "footer.support.items.help",
    ],
    links: [{ key: "help", href: "/faq" }],
  },
  {
    titleKey: "footer.community.title",
    itemKeys: [
      "footer.community.items.blog",
    ],
    links: [{ key: "blog", href: "/blog" }],
  },
  {
    titleKey: "footer.promotions.title",
    itemKeys: [
      "footer.promotions.items.coupons",
    ],
    links: [{ key: "coupons", href: "/coupons" }],
  },
];

const legalLinks = [
  { labelKey: "footer.legal.terms", href: "/terms" },
  { labelKey: "footer.legal.privacy", href: "/privacy" },
];

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer border-t border-[#E0E0E0] bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#2E5E99]/10 text-[#2E5E99]">
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
              <div className="flex flex-col">
                <Link href="/" className="text-2xl font-bold text-[#1A202C]">
                  {t("brand")}
                </Link>
                <span className="text-sm font-medium text-[#6B7280]">{t("footer.tagline", { defaultValue: "FreelanceMarket" })}</span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#6B7280]">{t("footer.description")}</p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.titleKey}>
                <h3 className="text-base font-semibold text-[#1A202C]">{t(section.titleKey)}</h3>
                <ul className="mt-5 space-y-3 text-sm text-[#6B7280]">
                  {section.itemKeys.map((itemKey) => {
                    // Check if this item has a custom link
                    const customLink = section.links?.find((link) => {
                      if (itemKey.includes("blog") && link.key === "blog") return true;
                      if (itemKey.includes("help") && link.key === "help") return true;
                      if (itemKey.includes("coupons") && link.key === "coupons") return true;
                      return false;
                    });
                    return (
                      <li key={itemKey}>
                        <Link
                          href={customLink?.href || "#"}
                          className="transition-colors hover:text-[#2E5E99]"
                        >
                          {t(itemKey)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-[#E0E0E0] pt-8">
          <div className="flex flex-col gap-4 text-sm text-[#6B7280] md:flex-row md:items-center md:justify-between">
            <p className="order-2 md:order-1">{t("footer.copyright")}</p>
            <div className="order-1 flex flex-wrap items-center gap-4 md:order-2">
              {legalLinks.map((link) => (
                <Link key={link.labelKey} href={link.href} className="transition-colors hover:text-[#2E5E99]">
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

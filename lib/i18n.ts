"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/locales/en/translation.json";
import krTranslations from "@/locales/kr/translation.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslations,
        },
        kr: {
          translation: krTranslations,
        },
      },
      lng: "kr", // default language
      fallbackLng: "en",
      interpolation: {
        escapeValue: false, // React already escapes values
      },
    });
}

export default i18n;


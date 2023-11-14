import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'

export const defaultNS = 'all'
export const resources = {
  en: {
    [defaultNS]: en,
  },
} as const

// eslint-disable-next-line import/no-named-as-default-member
void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    ns: [defaultNS],
    defaultNS,
    detection: {
      lookupQuerystring: 'lang',
    },
  })

export default i18n

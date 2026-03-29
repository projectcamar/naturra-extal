/**
 * Multi-Language Product Descriptions and Captions Proxy
 * This file now acts as a bridge to the modularized translations in ./productTranslations
 */

import { ALL_PRODUCT_TRANSLATIONS } from './productTranslations'
import type { LanguageCode } from '../utils/languageManager'

export interface MultiLanguageDescription {
  en: LanguagePack
  id: LanguagePack
  ar: LanguagePack
  zh: LanguagePack
  ja: LanguagePack
  es: LanguagePack
  fr: LanguagePack
  ko: LanguagePack
}

interface LanguagePack {
  name: string
  caption: string
  shortCaption: string
  description: string
  metaDescription: string
  imageAlt: string
  dimensions?: string
}

// Keep backward compatibility
export type DualLanguageDescription = MultiLanguageDescription

/**
 * Access the unified product descriptions across all 8 languages.
 * This proxy ensures that any legacy code calling PRODUCT_DESCRIPTIONS 
 * will receive the correct agricultural commodity data.
 */
export const PRODUCT_DESCRIPTIONS: Record<string, MultiLanguageDescription> = new Proxy({}, {
  get: (_target, slug: string) => {
    // Return a structured object that fetches from ALL_PRODUCT_TRANSLATIONS for each language
    const languages = ['en', 'id', 'ar', 'zh', 'ja', 'es', 'fr', 'ko'] as const
    const result: any = {}

    languages.forEach(lang => {
      const translations = ALL_PRODUCT_TRANSLATIONS[lang as LanguageCode] || ALL_PRODUCT_TRANSLATIONS.en
      const data = translations[slug] || {
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        caption: `Premium Agricultural Commodity from Naturra Extal`,
        shortCaption: slug,
        description: `Premium agricultural commodity sourced by Naturra Extal.`,
        metaDescription: `Premium agricultural commodity from Naturra Extal.`,
        imageAlt: slug
      }
      result[lang] = data
    })

    return result as MultiLanguageDescription
  }
})

// Helper functions for common lookups
export const getProductDescription = (slug: string, lang: LanguageCode = 'en'): string => {
  const translations = ALL_PRODUCT_TRANSLATIONS[lang] || ALL_PRODUCT_TRANSLATIONS.en
  return translations[slug]?.description || ''
}

export const getProductName = (slug: string, lang: LanguageCode = 'en'): string => {
  const translations = ALL_PRODUCT_TRANSLATIONS[lang] || ALL_PRODUCT_TRANSLATIONS.en
  return translations[slug]?.name || ''
}

export const getProductImageAlt = (slug: string, lang: LanguageCode = 'en'): string => {
  const translations = ALL_PRODUCT_TRANSLATIONS[lang] || ALL_PRODUCT_TRANSLATIONS.en
  return translations[slug]?.imageAlt || ''
}

export const getProductImageCaption = (slug: string, lang: LanguageCode = 'en'): string => {
  const translations = ALL_PRODUCT_TRANSLATIONS[lang] || ALL_PRODUCT_TRANSLATIONS.en
  return translations[slug]?.caption || ''
}

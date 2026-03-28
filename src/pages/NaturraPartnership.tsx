import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './NaturraPartnership.css'

import { NATURRA_PARTNERSHIP_TRANSLATIONS as PARTNERSHIP_TRANSLATIONS } from '../utils/NaturraTranslations'
const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

const NaturraPartnership: React.FC = () => {
  const location = useLocation()
  const [language, setLanguage] = useState<LanguageCode>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })

  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  // IP detection for first visit (only if no stored preference)
  useEffect(() => {
    const stored = getStoredLanguage()
    const urlLang = getCurrentLanguage(location.pathname, location.search)

    if (stored || urlLang !== 'en') {
      return
    }

    const detectIP = async () => {
      const ipLang = await detectLanguageFromIP()
      if (ipLang && !stored) {
        setLanguage(ipLang)
      }
    }

    detectIP()
  }, [])
  const isIndonesian = language === 'id'
  const translations = PARTNERSHIP_TRANSLATIONS[language] ?? PARTNERSHIP_TRANSLATIONS.en

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Partnership Page CTA')
  }

  return (
    <div className="partnership-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{translations.pageTitle}</title>
        <meta name="description" content={translations.metaDescription} />
        <meta name="keywords" content={translations.metaKeywords} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`partnership-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        {OG_LOCALES.filter(altLocale => altLocale !== localeMeta.locale).map((altLocale) => (
          <meta key={`partnership-og-${altLocale}`} property="og:locale:alternate" content={altLocale} />
        ))}
      </Helmet>

      <NaturraHeader />

      {/* Hero Section */}
      <section className="partnership-hero">
        <div className="partnership-hero-image">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920"
            alt={translations.heroTitle}
            title={translations.heroTitle}
            loading="eager"
            fetchPriority="high"
          />
          <div className="partnership-hero-overlay"></div>
        </div>
        <div className="partnership-hero-content">
          <h1 className="partnership-hero-title">{translations.heroTitle}</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="partnership-main-section">
        <div className="partnership-main-container">
          <div className="partnership-main-content">
            <div className="partnership-main-text">
              <h2 className="partnership-section-title">{translations.mainTitle}</h2>
              <div className="partnership-main-body">
                {translations.mainParagraphs.map((paragraph, index) => (
                  <p key={index} className="partnership-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1621217646581-bcbe05ff19ee?auto=format&fit=crop&q=80&w=800"
                alt="Agricultural processing and sorting"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="partnership-experience-section">
        <div className="partnership-experience-container">
          <div className="partnership-experience-layout">
            <div className="partnership-experience-content">
              <h2 className="partnership-section-title">{translations.experienceTitle}</h2>
              {translations.experienceParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1582218155981-0675ea108dca?auto=format&fit=crop&q=80&w=800"
                alt="Global export shipping containers"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="partnership-collaboration-section">
        <div className="partnership-collaboration-container">
          <div className="partnership-collaboration-layout">
            <div className="partnership-collaboration-content">
              <span className="partnership-section-subtitle">{translations.collaborationSubtitle}</span>
              <h2 className="partnership-section-title">{translations.collaborationTitle}</h2>
              {translations.collaborationParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1596541223130-5d5644a5a6fc?auto=format&fit=crop&q=80&w=800"
                alt="Commodities stored in warehouse"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flexibility Section */}
      <section className="partnership-flexibility-section">
        <div className="partnership-flexibility-container">
          <div className="partnership-flexibility-layout">
            <div className="partnership-flexibility-content">
              <h2 className="partnership-section-title">{translations.flexibilityTitle}</h2>
              {translations.flexibilityParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1499558913904-206263eb210b?auto=format&fit=crop&q=80&w=800"
                alt="Flexible agricultural supply chain"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scale Section */}
      <section className="partnership-scale-section">
        <div className="partnership-scale-container">
          <div className="partnership-scale-layout">
            <div className="partnership-scale-content">
              <h2 className="partnership-section-title">{translations.scaleTitle}</h2>
              <p className="partnership-paragraph">{translations.scaleDescription}</p>
              <h3 className="partnership-section-subtitle" style={{ fontSize: '1.2rem', marginTop: '20px' }}>
                {translations.scaleQuestion}
              </h3>
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1548848222-777651a084eb?auto=format&fit=crop&q=80&w=800"
                alt="Scaling global supply chain"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partnership-cta-section">
        <div className="partnership-cta-container">
          <h2 className="partnership-cta-title">{translations.ctaTitle}</h2>
          <p className="partnership-cta-description">{translations.ctaDescription}</p>
          <a
            href="https://wa.me/6289513957752?text=Hello%20Naturra%20Extal,%20I%20would%20like%20to%20discuss%20a%20B2B%20partnership%20for%20commodity%20sourcing."
            target="_blank"
            rel="noopener noreferrer"
            className="partnership-whatsapp-btn"
            onClick={handleWhatsAppClick}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {translations.ctaButton}
          </a>
        </div>
      </section>

      <NaturraFooter />
    </div>
  )
}

export default NaturraPartnership

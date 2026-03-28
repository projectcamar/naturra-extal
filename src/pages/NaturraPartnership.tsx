import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import heroImage from '../assets/main-hero-image.webp'
import projectVideo from '../assets/meja-makan-industrial.mp4'
import experienceImage from '../assets/Hollowline-Display-Rack.webp'
import collaborationImage from '../assets/Meja-Kerja-Rak-Meja-Belajar-custom.webp'
import flexibilityImage from '../assets/Kabinet-Industrial-Dapur.webp'
import scaleImage from '../assets/Meja-makan-industrial-150x60x90-2 kursi.webp'
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
            src={heroImage}
            alt="Partnership Naturra Extal - Kerja Sama Workshop Furniture Industrial Bekasi"
            title="Partnership - Partner with Naturra Extal Industrial Furniture Manufacturer"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="partnership-hero"
            data-category="partnership"
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
              <h2 className="partnership-main-title">{translations.mainTitle}</h2>
              <div className="partnership-main-body">
                {translations.mainParagraphs.map((paragraph, index) => (
                  <p key={index} className="partnership-main-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="partnership-main-media-wrapper">
              <video
                src={projectVideo}
                autoPlay
                loop
                muted
                playsInline
                className="partnership-main-video"
                aria-label={isIndonesian ? 'Video produk furniture industrial Naturra Extal' : 'Naturra Extal industrial furniture product video'}
              >
                <source src={projectVideo} type="video/mp4" />
                {isIndonesian ? 'Browser Anda tidak mendukung video.' : 'Your browser does not support the video tag.'}
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="partnership-experience-section">
        <div className="partnership-experience-container">
          <h2 className="partnership-experience-title">{translations.experienceTitle}</h2>

          <div className="partnership-experience-layout">
            <div className="partnership-experience-image-wrapper">
              <img
                src={experienceImage}
                alt={isIndonesian ? 'Pengalaman Produksi Furniture Industrial - Hollowline Display Rack' : 'Industrial Furniture Production Experience - Hollowline Display Rack'}
                className="partnership-experience-image"
                loading="lazy"
              />
            </div>
            <div className="partnership-experience-content">
              {translations.experienceParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-experience-description">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="partnership-collaboration-section">
        <div className="partnership-collaboration-container">
          <h2 className="partnership-collaboration-title">{translations.collaborationTitle}</h2>
          <p className="partnership-collaboration-subtitle">{translations.collaborationSubtitle}</p>

          <div className="partnership-collaboration-layout">
            <div className="partnership-collaboration-content">
              {translations.collaborationParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-collaboration-description">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="partnership-collaboration-image-wrapper">
              <img
                src={collaborationImage}
                alt={isIndonesian ? 'Kolaborasi Custom Design - Meja Kerja Industrial' : 'Custom Design Collaboration - Industrial Work Desk'}
                className="partnership-collaboration-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flexibility Section */}
      <section className="partnership-flexibility-section">
        <div className="partnership-flexibility-container">
          <h2 className="partnership-flexibility-title">{translations.flexibilityTitle}</h2>

          <div className="partnership-flexibility-layout">
            <div className="partnership-flexibility-image-wrapper">
              <img
                src={flexibilityImage}
                alt={isIndonesian ? 'Fleksibilitas Produksi - Kabinet Industrial Dapur' : 'Production Flexibility - Industrial Kitchen Cabinet'}
                className="partnership-flexibility-image"
                loading="lazy"
              />
            </div>
            <div className="partnership-flexibility-content">
              {translations.flexibilityParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-flexibility-description">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scale Section */}
      <section className="partnership-scale-section">
        <div className="partnership-scale-container">
          <h2 className="partnership-scale-title">{translations.scaleTitle}</h2>

          <div className="partnership-scale-image-wrapper">
            <img
              src={scaleImage}
              alt={isIndonesian ? 'Berbagai Skala Proyek - Dining Set Industrial' : 'Various Project Scales - Industrial Dining Set'}
              className="partnership-scale-image"
              loading="lazy"
            />
          </div>

          <div className="partnership-scale-content">
            <p className="partnership-scale-description">
              {translations.scaleDescription}
            </p>

            <p className="partnership-scale-question">
              {translations.scaleQuestion}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partnership-cta-section">
        <div className="partnership-cta-container">
          <h2 className="partnership-cta-title">{translations.ctaTitle}</h2>
          <p className="partnership-cta-description">
            {translations.ctaDescription}
          </p>

          <div className="partnership-cta-buttons">
            <a
              href="https://wa.me/+628951395752"
              target="_blank"
              rel="noopener noreferrer"
              className="partnership-cta-button"
              onClick={() => trackWhatsAppClick('partnership_page_cta')}
            >
              {translations.ctaButton}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="partnership-contact-section">
        <div className="partnership-contact-container">
          <h2 className="partnership-contact-title">{translations.contactTitle}</h2>
          <div className="partnership-contact-info">
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#004D2C', display: 'block', marginBottom: '8px' }}>
                Workshop Bekasi:
              </strong>
              <p className="partnership-contact-address">
                <a
                  href="https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2c2c2c', textDecoration: 'underline' }}
                >
                  Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat 17320
                </a>
              </p>
            </div>
            <p className="partnership-contact-phone">
              <a
                href="https://wa.me/+628951395752"
                style={{ color: '#004D2C', textDecoration: 'underline' }}
                onClick={() => trackWhatsAppClick('partnership_page_contact_info')}
                target="_blank"
                rel="noopener noreferrer"
              >
                +628951395752
              </a>
            </p>
            <p className="partnership-contact-email">
              <a href="mailto:hello@naturraextal.com" style={{ color: '#004D2C', textDecoration: 'underline' }}>
                hello@naturraextal.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <NaturraFooter />
    </div>
  )
}

export default NaturraPartnership

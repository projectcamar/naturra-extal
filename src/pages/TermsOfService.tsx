import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
// legacy mangala image import removed
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import { TERMS_TRANSLATIONS } from './TermsOfServiceTranslations'
import FAQSection from '../components/HomepageFAQ'
import './TermsOfService.css'

const TermsOfService: React.FC = () => {
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

  const t = TERMS_TRANSLATIONS[language] ?? TERMS_TRANSLATIONS.en
  const localeMeta = generateLanguageSpecificMeta(isIndonesian)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="terms-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`tos-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
      </Helmet>

      <Header isIndonesian={isIndonesian} language={language} />

      {/* Hero Section */}
      <section className="terms-hero">
        <div className="terms-hero-image">
          <img
            src={heroImage}
            alt="Terms of Service - Syarat dan Ketentuan Mangala Living Furniture Industrial"
            title="Terms of Service - Terms and Conditions for Mangala Living Products"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="terms-hero"
            data-category="terms"
          />
          <div className="terms-hero-overlay"></div>
        </div>
        <div className="terms-hero-content">
          <h1 className="terms-hero-title">{t.hero.title}</h1>
        </div>
      </section>

      <div className="terms-content-wrapper">
        <div className="terms-container">
          <div className="terms-intro-section">
            <p className="terms-intro">
              {t.intro}
            </p>
          </div>

          <div className="terms-content">
            {/* How to Order Section */}
            <section className="terms-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M9 14l2 2 4-4" />
                  </svg>
                </div>
                <h2>{t.sections.howToOrder.title}</h2>
              </div>

              <div className="key-points-grid">
                <div className="key-point-card">
                  <div className="key-point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h3>{t.sections.howToOrder.ordering.title}</h3>
                  <p>{t.sections.howToOrder.ordering.description}</p>
                </div>

                <div className="key-point-card">
                  <div className="key-point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h3>{t.sections.howToOrder.service.title}</h3>
                  <p>{t.sections.howToOrder.service.description}</p>
                </div>

                <div className="key-point-card">
                  <div className="key-point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <h3>{t.sections.howToOrder.production.title}</h3>
                  <p>{t.sections.howToOrder.production.description}</p>
                </div>

                <div className="key-point-card">
                  <div className="key-point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                      <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                      <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                    </svg>
                  </div>
                  <h3>{t.sections.howToOrder.support.title}</h3>
                  <p>{t.sections.howToOrder.support.description}</p>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="terms-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <h2>{t.sections.payment.title}</h2>
              </div>

              <div className="key-points-grid">
                <div className="key-point-card">
                  <div className="key-point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </div>
                  <h3>{t.sections.payment.deposit.title}</h3>
                  <p>{t.sections.payment.deposit.description}</p>
                </div>

                <div className="key-point-card">
                  <div className="key-point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 1v6l3-3 3 3" />
                      <path d="M12 7l-3 3 3 3" />
                      <path d="M12 13v6l-3-3-3 3" />
                      <path d="M12 17l3-3-3-3" />
                    </svg>
                  </div>
                  <h3>{t.sections.payment.balancePayment.title}</h3>
                  <p>{t.sections.payment.balancePayment.description}</p>
                </div>
              </div>
            </section>

            {/* Shipping Section */}
            <section className="terms-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2H16" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <h2>{t.sections.shipping.title}</h2>
              </div>

              <div className="shipping-timeline">
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4>{t.sections.shipping.jabodetabek.title}</h4>
                    <p>{t.sections.shipping.jabodetabek.days}</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4>{t.sections.shipping.outsideJava.title}</h4>
                    <p>{t.sections.shipping.outsideJava.days}</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4>{t.sections.shipping.international.title}</h4>
                    <p>{t.sections.shipping.international.days}</p>
                  </div>
                </div>
              </div>

              <div className="shipping-notes">
                <div className="note-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>{t.sections.shipping.note1}</p>
                </div>
                <div className="note-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>{t.sections.shipping.note2}</p>
                </div>
              </div>
            </section>

            {/* Warranty Section */}
            <section className="terms-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                    <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                    <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                  </svg>
                </div>
                <h2>{t.sections.warranty.title}</h2>
              </div>

              <div className="warranty-highlight">
                <div className="warranty-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>{t.sections.warranty.badge}</span>
                </div>
              </div>

              <div className="warranty-details">
                <div className="warranty-item">
                  <div className="warranty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="warranty-content">
                    <h4>{t.sections.warranty.whatsCovered.title}</h4>
                    <p>{t.sections.warranty.whatsCovered.description}</p>
                  </div>
                </div>

                <div className="warranty-item">
                  <div className="warranty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <div className="warranty-content">
                    <h4>{t.sections.warranty.notCovered.title}</h4>
                    <p>{t.sections.warranty.notCovered.description}</p>
                  </div>
                </div>

                <div className="warranty-item">
                  <div className="warranty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="warranty-content">
                    <h4>{t.sections.warranty.note.title}</h4>
                    <p>{t.sections.warranty.note.description}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Workshop Info Section */}
            <section className="terms-section">
              <h2>{t.sections.findUs.title}</h2>
              <div className="workshop-info">
                <h3>Mangala Living</h3>
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#8B7355', display: 'block', marginBottom: '8px' }}>
                    {t.sections.findUs.workshopLabel}
                  </strong>
                  <p>
                    <a
                      href="https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="workshop-address"
                    >
                      Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat 17320
                    </a>
                  </p>
                </div>
                <p className="workshop-phone">
                  <a
                    href="https://wa.me/+6288801146881"
                    style={{ color: '#8B7355', textDecoration: 'underline' }}
                    onClick={() => trackWhatsAppClick('terms_of_service_contact')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +6288801146881
                  </a>
                </p>
                <p className="workshop-email">
                  <a href="mailto:lifewithmangala@gmail.com" style={{ color: '#8B7355', textDecoration: 'underline' }}>
                    lifewithmangala@gmail.com
                  </a>
                </p>
                <p className="workshop-hours">
                  {t.sections.findUs.workHours}
                </p>
                <p className="workshop-languages">
                  {t.sections.findUs.languages}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FAQ Section - SEO Optimized with Rich Snippets */}
      <FAQSection isIndonesian={isIndonesian} language={language} />

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default TermsOfService
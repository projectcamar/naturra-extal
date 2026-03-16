import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { FileText, MessageCircle, Truck, Wrench } from 'lucide-react'
import AnnouncementBar from '../components/AnnouncementBar'
import NaturraFooter from '../components/NaturraFooter'
import NaturraHeader from '../components/NaturraHeader'
import heroImage from '../assets/main-hero-image.webp'
import showroomImage from '../assets/Bench-corner-kursi-sudut-kursi-santai.webp'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './NaturraCustomOrder.css'

import { NATURRA_CUSTOM_ORDER_TRANSLATIONS as CUSTOM_ORDER_TRANSLATIONS } from '../utils/NaturraTranslations'

const NaturraCustomOrder: React.FC = () => {
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
  const t = CUSTOM_ORDER_TRANSLATIONS[language] ?? CUSTOM_ORDER_TRANSLATIONS.en

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="custom-order-page">
      <AnnouncementBar language={language} isIndonesian={isIndonesian} />
      <Helmet
        htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': language }}
      >
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link
            key={`custom-order-hreflang-${alternate.hrefLang}`}
            rel="alternate"
            hrefLang={alternate.hrefLang}
            href={alternate.href}
          />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
      </Helmet>

      <NaturraHeader />

      <section className="custom-order-hero">
        <div className="custom-order-hero-image">
          <img
            src={heroImage}
            alt={t.hero.imageAlt}
            title={t.hero.imageTitle}
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
          <div className="custom-order-hero-overlay"></div>
        </div>
        <div className="custom-order-hero-content">
          <h1 className="custom-order-hero-title">{t.hero.title}</h1>
        </div>
      </section>

      <section className="custom-order-message-section">
        <div className="custom-order-message-container">
          <div className="custom-order-message-content">
            <div className="custom-order-message-text">
              <h2 className="custom-order-message-title">{t.message.title}</h2>
              <div className="custom-order-message-body">
                {t.message.paragraphs.map((paragraph, index) => (
                  <p className="custom-order-message-paragraph" key={`message-paragraph-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="custom-order-message-image-wrapper">
              <img
                src={showroomImage}
                alt={t.message.imageAlt}
                className="custom-order-message-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="custom-order-ideas-section">
        <div className="custom-order-ideas-container">
          <h2 className="custom-order-ideas-title">{t.ideas.title}</h2>
          <p className="custom-order-ideas-intro">{t.ideas.intro}</p>
          <p className="custom-order-ideas-description">{t.ideas.description}</p>
        </div>
      </section>

      <section className="custom-order-process-section">
        <div className="custom-order-process-container">
          <h2 className="custom-order-process-main-title">{t.process.title}</h2>

          <div className="custom-order-process-grid">
            {t.process.steps.map((step) => (
              <div className="custom-order-process-item" key={step.title}>
                <div className="custom-order-process-icon">
                  {step.title === t.process.steps[0].title && <MessageCircle size={48} strokeWidth={1.5} />}
                  {step.title === t.process.steps[1].title && <FileText size={48} strokeWidth={1.5} />}
                  {step.title === t.process.steps[2].title && <Wrench size={48} strokeWidth={1.5} />}
                  {step.title === t.process.steps[3].title && <Truck size={48} strokeWidth={1.5} />}
                </div>
                <h3 className="custom-order-process-item-title">{step.title}</h3>
                <p className="custom-order-process-item-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="custom-order-cta-section">
        <div className="custom-order-cta-container">
          <h2 className="custom-order-cta-title">{t.cta.title}</h2>
          <p className="custom-order-cta-intro">{t.cta.intro}</p>

          <div className="custom-order-locations">
            <div className="custom-order-location">
              <h3>{t.cta.workshopHeading}</h3>
              <p>
                <a
                  href="https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat
                  17320
                </a>
              </p>
              <p className="footer-phone">+628951395752</p>
            </div>
          </div>

          <p className="custom-order-cta-description">{t.cta.workshopParagraph}</p>

          <div className="custom-order-cta-buttons">
            <a
              href="https://wa.me/+628951395752"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-order-btn"
              onClick={() => trackWhatsAppClick('custom_order_page_cta')}
            >
              {t.cta.button}
            </a>
          </div>
        </div>
      </section>

      <NaturraFooter />
    </div>
  )
}

export default NaturraCustomOrder

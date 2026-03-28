import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { Mail, MessageCircle, Globe, Building2 } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import { NATURRA_HOME_TRANSLATIONS } from '../utils/NaturraTranslations'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import './NaturraHome.css'

const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

const NaturraHome: React.FC = () => {
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

    // IP detection for first visit
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
    const t = NATURRA_HOME_TRANSLATIONS[language] ?? NATURRA_HOME_TRANSLATIONS.en
    const localeMeta = generateLanguageSpecificMeta(language)
    const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

    return (
        <div className="naturra-home">

            <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
                <title>Naturra Extal International | Premium Indonesian Commodity Trading</title>
                <meta name="description" content="CV Naturra Extal International - Leaders in Indonesian agricultural commodity trading. Premium cocoa, cloves, and cocopeat sourced directly from Indonesian farmers." />
                <meta httpEquiv="content-language" content={localeMeta.lang} />
                <link rel="canonical" href={localizedUrls.canonical} />
                {localizedUrls.alternates.map((alternate) => (
                    <link key={`home-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
                ))}
                <meta property="og:title" content="Naturra Extal International | Premium Indonesian Commodity Trading" />
                <meta property="og:description" content="Leaders in Indonesian agricultural commodity trading. Premium cocoa, cloves, and cocopeat sourced directly from Indonesian farmers." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={localizedUrls.canonical} />
                <meta property="og:locale" content={localeMeta.locale} />
                {OG_LOCALES.filter(altLocale => altLocale !== localeMeta.locale).map((altLocale) => (
                    <meta key={`home-og-${altLocale}`} property="og:locale:alternate" content={altLocale} />
                ))}
            </Helmet>

            <NaturraHeader />

            {/* ===== HERO SECTION ===== */}
            <section className="naturra-home__hero">
                <div className="naturra-home__hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920"
                        alt="Indonesian sustainable agriculture"
                        loading="eager"
                    />
                </div>
                <div className="naturra-home__hero-overlay" />
                <div className="naturra-home__hero-content">
                    <div className="naturra-home__hero-text">
                        <span className="naturra-home__hero-eyebrow">{t.heroEyebrow}</span>
                        <h1 className="naturra-home__hero-title" dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
                        <p className="naturra-home__hero-desc">
                            {t.heroDesc}
                        </p>
                        <div className="naturra-home__hero-actions">
                            <Link to="/products" className="naturra-home__hero-btn naturra-home__hero-btn--primary">
                                {t.btnProducts}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                            <Link to="/about" className="naturra-home__hero-btn naturra-home__hero-btn--secondary">
                                {t.btnLearn}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="naturra-home__stats">
                <div className="naturra-home__stats-inner">
                    <div className="naturra-home__stat">
                        <div className="naturra-home__stat-number">3+</div>
                        <div className="naturra-home__stat-label">{t.stat1}</div>
                    </div>
                    <div className="naturra-home__stat">
                        <div className="naturra-home__stat-number">100%</div>
                        <div className="naturra-home__stat-label">{t.stat2}</div>
                    </div>
                    <div className="naturra-home__stat">
                        <div className="naturra-home__stat-number">Global</div>
                        <div className="naturra-home__stat-label">{t.stat3}</div>
                    </div>
                    <div className="naturra-home__stat">
                        <div className="naturra-home__stat-number">Premium</div>
                        <div className="naturra-home__stat-label">{t.stat4}</div>
                    </div>
                </div>
            </section>

            {/* ===== HERITAGE SECTION ===== */}
            <section className="naturra-home__heritage">
                <div className="naturra-home__heritage-inner">
                    <div className="naturra-home__heritage-image">
                        <img
                            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
                            alt="Indonesian cloves and spices"
                            loading="lazy"
                        />
                        <div className="naturra-home__heritage-image-accent" />
                    </div>
                    <div className="naturra-home__heritage-text">
                        <span className="naturra-home__heritage-eyebrow">{t.heritageEyebrow}</span>
                        <h2 className="naturra-home__heritage-title" dangerouslySetInnerHTML={{ __html: t.heritageTitle }} />
                        <p className="naturra-home__heritage-desc">
                            {t.heritageDesc}
                        </p>
                        <div className="naturra-home__heritage-features">
                            <div className="naturra-home__heritage-feature">
                                <div className="naturra-home__heritage-feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <span className="naturra-home__heritage-feature-text" dangerouslySetInnerHTML={{ __html: t.feat1 }} />
                            </div>
                            <div className="naturra-home__heritage-feature">
                                <div className="naturra-home__heritage-feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                </div>
                                <span className="naturra-home__heritage-feature-text" dangerouslySetInnerHTML={{ __html: t.feat2 }} />
                            </div>
                            <div className="naturra-home__heritage-feature">
                                <div className="naturra-home__heritage-feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <span className="naturra-home__heritage-feature-text" dangerouslySetInnerHTML={{ __html: t.feat3 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WHO WE ARE GRID ===== */}
            <section className="naturra-home__grid">
                <div className="naturra-home__grid-inner">
                    <span className="naturra-home__section-eyebrow">{t.whoEyebrow}</span>
                    <h2 className="naturra-home__section-title">
                        <strong>{t.whoWeAre}</strong>
                    </h2>

                    <div className="naturra-home__product-grid">
                        {/* Cocoa */}
                        <Link to="/products" className="naturra-home__product-card">
                            <img
                                className="naturra-home__product-card-image"
                                src="https://images.unsplash.com/photo-1610611424854-5e07f4b2c5b6?w=600&q=80"
                                alt="Indonesian Cocoa Products"
                                loading="lazy"
                            />
                            <div className="naturra-home__product-card-body">
                                <span className="naturra-home__product-card-tag">{t.cocoaCategory}</span>
                                <h3 className="naturra-home__product-card-name">{t.cocoaTitle}</h3>
                                <p className="naturra-home__product-card-desc">
                                    {t.cocoaDesc}
                                </p>
                                <span className="naturra-home__product-card-link">
                                    {t.btnLearn}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>

                        {/* Cengkeh */}
                        <Link to="/products" className="naturra-home__product-card">
                            <img
                                className="naturra-home__product-card-image"
                                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80"
                                alt="Indonesian Cloves - Cengkeh"
                                loading="lazy"
                            />
                            <div className="naturra-home__product-card-body">
                                <span className="naturra-home__product-card-tag">{t.clovesCategory}</span>
                                <h3 className="naturra-home__product-card-name">{t.clovesTitle}</h3>
                                <p className="naturra-home__product-card-desc">
                                    {t.clovesDesc}
                                </p>
                                <span className="naturra-home__product-card-link">
                                    {t.btnLearn}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>

                        {/* Cocopeat */}
                        <Link to="/products" className="naturra-home__product-card">
                            <img
                                className="naturra-home__product-card-image"
                                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80"
                                alt="Cocopeat - Coconut Coir"
                                loading="lazy"
                            />
                            <div className="naturra-home__product-card-body">
                                <span className="naturra-home__product-card-tag">{t.cocopeatCategory}</span>
                                <h3 className="naturra-home__product-card-name">{t.cocopeatTitle}</h3>
                                <p className="naturra-home__product-card-desc">
                                    {t.cocopeatDesc}
                                </p>
                                <span className="naturra-home__product-card-link">
                                    {t.btnLearn}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== SUSTAINABILITY SECTION ===== */}
            <section className="naturra-home__sustainability">
                <div className="naturra-home__sustainability-inner">
                    <div className="naturra-home__sustainability-image">
                        <img
                            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
                            alt="Sustainable farming practices"
                            loading="lazy"
                        />
                        <span className="naturra-home__sustainability-badge">{t.sustainBadge}</span>
                    </div>
                    <div className="naturra-home__sustainability-content">
                        <h3 dangerouslySetInnerHTML={{ __html: t.sustainTitle }} />
                        <p>
                            {t.sustainDesc}
                        </p>
                        <ul className="naturra-home__sustainability-list">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                {t.sustainList1}
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                {t.sustainList2}
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                {t.sustainList3}
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                {t.sustainList4}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ===== CTA / CONTACT SECTION ===== */}
            <section className="naturra-home__cta">
                <div className="naturra-home__cta-inner">
                    <div>
                        <span className="naturra-home__cta-eyebrow">{t.ctaEyebrow}</span>
                        <h2 className="naturra-home__cta-title" dangerouslySetInnerHTML={{ __html: t.ctaTitle }} />
                        <p className="naturra-home__cta-desc">
                            {t.ctaDesc}
                        </p>
                        <div className="naturra-home__cta-actions">
                            <a
                                href="https://wa.me/628951395752"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="naturra-home__cta-btn naturra-home__cta-btn--primary"
                            >
                                {t.ctaBtn1}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                            </a>
                            <a
                                href="mailto:hello@naturraextal.com"
                                className="naturra-home__cta-btn naturra-home__cta-btn--secondary"
                            >
                                {t.ctaBtn2}
                            </a>
                        </div>
                    </div>

                    <div className="naturra-home__cta-cards">
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">
                                <Mail size={24} />
                            </div>
                            <h4 className="naturra-home__cta-card-title">{t.emailTitle}</h4>
                            <p className="naturra-home__cta-card-desc">hello@naturraextal.com</p>
                        </div>
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">
                                <MessageCircle size={24} />
                            </div>
                            <h4 className="naturra-home__cta-card-title">{t.waTitle}</h4>
                            <p className="naturra-home__cta-card-desc">+62 895-1395-7752</p>
                        </div>
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">
                                <Globe size={24} />
                            </div>
                            <h4 className="naturra-home__cta-card-title">{t.globalTitle}</h4>
                            <p className="naturra-home__cta-card-desc">{t.globalDesc}</p>
                        </div>
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">
                                <Building2 size={24} />
                            </div>
                            <h4 className="naturra-home__cta-card-title">{t.corpTitle}</h4>
                            <p className="naturra-home__cta-card-desc">CV Naturra Extal International</p>
                        </div>
                    </div>
                </div>
            </section>

            <NaturraFooter />
        </div>
    )
}

export default NaturraHome

import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import './NaturraProducts.css'

import { NATURRA_PRODUCTS } from '../data/naturraProducts'
import { useLanguage } from '../utils/languageContext.tsx'
import { NATURRA_PRODUCTS_TRANSLATIONS } from '../utils/productsTranslations'
import { ALL_PRODUCT_TRANSLATIONS } from '../data/productTranslations'
import type { LanguageCode } from '../utils/languageManager'

const NaturraProducts: React.FC = () => {
    const { language } = useLanguage() as { language: LanguageCode }
    const t = NATURRA_PRODUCTS_TRANSLATIONS[language] || NATURRA_PRODUCTS_TRANSLATIONS.en
    const detailTranslations = ALL_PRODUCT_TRANSLATIONS[language] || ALL_PRODUCT_TRANSLATIONS.en
    const [activeCategory, setActiveCategory] = useState('all')

    const CATEGORIES = [
        { key: 'all', label: t.allProducts },
        { key: 'cocoa', label: t.cocoaProducts },
        { key: 'cloves', label: t.clovesProducts },
        { key: 'cocopeat', label: t.cocopeatProducts },
    ]

    const filteredProducts = activeCategory === 'all'
        ? NATURRA_PRODUCTS
        : NATURRA_PRODUCTS.filter(p => p.category === activeCategory)

    // Helper to get localized product name/desc from modular translations
    const getLocalizedName = (product: any) => {
        return detailTranslations[product.id]?.name || product.name
    }
    const getLocalizedDesc = (product: any) => {
        return detailTranslations[product.id]?.description || product.description
    }

    const getLocalizedSpec = (_product: any, spec: string, _index: number) => {
        // You could also localize specs here if needed, or keep as is
        return spec
    }

    return (
        <div className="naturra-products">
            <Helmet>
                <title>{t.pageTitle}</title>
                <meta name="description" content={t.metaDescription} />
                <link rel="canonical" href="https://naturraextal.com/products" />
            </Helmet>

            <NaturraHeader />

            {/* ===== HERO ===== */}
            <section className="naturra-products__hero">
                <div className="naturra-products__hero-inner">
                    <h1 className="naturra-products__hero-title">{t.heroTitle}</h1>
                    <p className="naturra-products__hero-subtitle">
                        {t.heroSubtitle}
                    </p>
                </div>
            </section>

            {/* ===== CATEGORY TABS (Barry Callebaut style) ===== */}
            <div className="naturra-products__tabs">
                <div className="naturra-products__tabs-inner">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.key}
                            className={`naturra-products__tab ${activeCategory === cat.key ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== MAIN CONTENT WITH SIDEBAR (Barry Callebaut layout) ===== */}
            <div className="naturra-products__content">
                {/* Sidebar Filters */}
                <aside className="naturra-products__sidebar">
                    <div className="naturra-products__filter-group">
                        <h3 className="naturra-products__filter-title">{t.filterTitleCategory}</h3>
                        {CATEGORIES.map(cat => (
                            <label
                                key={cat.key}
                                className={`naturra-products__filter-option ${activeCategory === cat.key ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.key)}
                            >
                                <input
                                    type="checkbox"
                                    checked={activeCategory === cat.key}
                                    onChange={() => setActiveCategory(cat.key)}
                                />
                                {cat.label}
                            </label>
                        ))}
                    </div>

                    <div className="naturra-products__filter-group">
                        <h3 className="naturra-products__filter-title">{t.filterTitleHS}</h3>
                        <div className="naturra-products__filter-option">
                            <span>1805.00.0 — {t.hsPure}</span>
                        </div>
                        <div className="naturra-products__filter-option">
                            <span>1806.00.0 — {t.hsSweet}</span>
                        </div>
                    </div>

                    <div className="naturra-products__filter-group">
                        <h3 className="naturra-products__filter-title">{t.filterTitleApps}</h3>
                        <div className="naturra-products__filter-option"><span>{t.appConf}</span></div>
                        <div className="naturra-products__filter-option"><span>{t.appBak}</span></div>
                        <div className="naturra-products__filter-option"><span>{t.appBev}</span></div>
                        <div className="naturra-products__filter-option"><span>{t.appHort}</span></div>
                        <div className="naturra-products__filter-option"><span>{t.appPharm}</span></div>
                        <div className="naturra-products__filter-option"><span>{t.appInd}</span></div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="naturra-products__grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="naturra-products__card">
                            <div className="naturra-products__card-image-wrapper">
                                <img
                                    className="naturra-products__card-image"
                                    src={product.image}
                                    alt={getLocalizedName(product)}
                                    loading="lazy"
                                />
                                <span className="naturra-products__card-badge">{product.badge}</span>
                            </div>
                            <div className="naturra-products__card-body">
                                <h3 className="naturra-products__card-name">{getLocalizedName(product)}</h3>
                                <p className="naturra-products__card-desc">{getLocalizedDesc(product)}</p>
                                <div className="naturra-products__card-specs">
                                    {product.specs.map((spec, i) => (
                                        <span key={i} className="naturra-products__card-spec">{getLocalizedSpec(product, spec, i)}</span>
                                    ))}
                                </div>
                                <div className="naturra-products__card-actions">
                                    <a
                                        href="https://wa.me/6289513957752"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="naturra-products__card-btn naturra-products__card-btn--primary"
                                    >
                                        {t.inquire}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </a>
                                    <a
                                        href="mailto:hello@naturraextal.com"
                                        className="naturra-products__card-btn naturra-products__card-btn--secondary"
                                    >
                                        {t.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== DETAILED PRODUCT SECTIONS ===== */}

            {/* Cocoa Detail */}
            <section className="naturra-products__detail-section">
                <div className="naturra-products__detail-inner">
                    <div className="naturra-products__detail-image">
                        <img
                            src="https://images.unsplash.com/photo-1613919920110-394ffdc5bfaa?auto=format&fit=crop&q=80&w=800"
                            alt="Premium Indonesian Cocoa Beans"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <span className="naturra-products__detail-eyebrow">{t.productFocus}</span>
                        <h2 className="naturra-products__detail-title">{t.cocoaDetailTitle}</h2>
                        <p className="naturra-products__detail-text">
                            {t.cocoaDetailText}
                        </p>
                        <ul className="naturra-products__detail-specs-list">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                HS 1805.00.0 — {t.hsPure}
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                HS 1806.00.0 — {t.hsSweet}
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                {t.originTitle}
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                {t.qualityTitle}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Cloves Detail */}
            <section className="naturra-products__detail-section">
                <div className="naturra-products__detail-inner reverse">
                    <div className="naturra-products__detail-image">
                        <img
                            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
                            alt="Premium Indonesian Cloves"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <span className="naturra-products__detail-eyebrow">{t.productFocus}</span>
                        <h2 className="naturra-products__detail-title">{t.clovesDetailTitle}</h2>
                        <p className="naturra-products__detail-text">
                            {t.clovesDetailText}
                        </p>
                        <ul className="naturra-products__detail-specs-list">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Hand-picked from Maluku &amp; North Sulawesi
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                High essential oil (eugenol) content
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Whole cloves, stems, and essential oil available
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Culinary, pharmaceutical &amp; industrial grade
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Cocopeat Detail */}
            <section className="naturra-products__detail-section">
                <div className="naturra-products__detail-inner">
                    <div className="naturra-products__detail-image">
                        <img
                            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                            alt="Indonesian Cocopeat"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <span className="naturra-products__detail-eyebrow">{t.productFocus}</span>
                        <h2 className="naturra-products__detail-title">{t.cocopeatDetailTitle}</h2>
                        <p className="naturra-products__detail-text">
                            {t.cocopeatDetailText}
                        </p>
                        <ul className="naturra-products__detail-specs-list">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Sourced from Surabaya, East Java
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Eco-friendly &amp; sustainable growing medium
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Available in 5kg blocks and loose bulk
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Washed, buffered, low EC
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="naturra-products__cta">
                <div className="naturra-products__cta-inner">
                    <h2 className="naturra-products__cta-title">
                        {t.ctaTitle}
                    </h2>
                    <p className="naturra-products__cta-desc">
                        {t.ctaDesc}
                    </p>
                    <div className="naturra-products__cta-actions">
                        <a
                            href="https://wa.me/6289513957752"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="naturra-products__cta-btn naturra-products__cta-btn--white"
                        >
                            {t.whatsappUs}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </a>
                        <a
                            href="mailto:hello@naturraextal.com"
                            className="naturra-products__cta-btn naturra-products__cta-btn--outline"
                        >
                            {t.emailUs}
                        </a>
                    </div>
                </div>
            </section>

            <NaturraFooter />
        </div>
    )
}

export default NaturraProducts

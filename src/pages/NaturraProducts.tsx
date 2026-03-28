import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import './NaturraProducts.css'

import { NATURRA_PRODUCTS } from '../data/naturraProducts'

const CATEGORIES = [
    { key: 'all', label: 'All Products' },
    { key: 'cocoa', label: 'Cocoa Products' },
    { key: 'cloves', label: 'Cengkeh (Cloves)' },
    { key: 'cocopeat', label: 'Cocopeat' },
]

const NaturraProducts: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all')

    const filteredProducts = activeCategory === 'all'
        ? NATURRA_PRODUCTS
        : NATURRA_PRODUCTS.filter(p => p.category === activeCategory)

    return (
        <div className="naturra-products">
            <Helmet>
                <title>Products | Naturra Extal International - Cocoa, Cloves, Cocopeat</title>
                <meta name="description" content="Browse our product portfolio: Premium Indonesian cocoa powder (HS 1805 & 1806), cengkeh (cloves), and cocopeat. Sourced directly from Indonesian farmers." />
                <link rel="canonical" href="https://naturra-extal.com/products" />
            </Helmet>

            <NaturraHeader />

            {/* ===== HERO ===== */}
            <section className="naturra-products__hero">
                <div className="naturra-products__hero-inner">
                    <h1 className="naturra-products__hero-title">Products</h1>
                    <p className="naturra-products__hero-subtitle">
                        Premium Indonesian agricultural commodities for global markets
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
                        <h3 className="naturra-products__filter-title">Product Category</h3>
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
                        <h3 className="naturra-products__filter-title">HS Code</h3>
                        <div className="naturra-products__filter-option">
                            <span>1805.00.0 — Pure Cocoa Powder</span>
                        </div>
                        <div className="naturra-products__filter-option">
                            <span>1806.00.0 — Sweetened Cocoa</span>
                        </div>
                    </div>

                    <div className="naturra-products__filter-group">
                        <h3 className="naturra-products__filter-title">Applications</h3>
                        <div className="naturra-products__filter-option"><span>Confectionery</span></div>
                        <div className="naturra-products__filter-option"><span>Bakery</span></div>
                        <div className="naturra-products__filter-option"><span>Beverages</span></div>
                        <div className="naturra-products__filter-option"><span>Horticulture</span></div>
                        <div className="naturra-products__filter-option"><span>Pharmaceuticals</span></div>
                        <div className="naturra-products__filter-option"><span>Industrial</span></div>
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
                                    alt={product.name}
                                    loading="lazy"
                                />
                                <span className="naturra-products__card-badge">{product.badge}</span>
                            </div>
                            <div className="naturra-products__card-body">
                                <h3 className="naturra-products__card-name">{product.name}</h3>
                                <p className="naturra-products__card-desc">{product.description}</p>
                                <div className="naturra-products__card-specs">
                                    {product.specs.map((spec, i) => (
                                        <span key={i} className="naturra-products__card-spec">{spec}</span>
                                    ))}
                                </div>
                                <div className="naturra-products__card-actions">
                                    <a
                                        href="https://wa.me/628951395752"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="naturra-products__card-btn naturra-products__card-btn--primary"
                                    >
                                        Inquire
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </a>
                                    <a
                                        href="mailto:naturraextal@gmail.com"
                                        className="naturra-products__card-btn naturra-products__card-btn--secondary"
                                    >
                                        Email
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
                            src="https://images.unsplash.com/photo-1610611424854-5e07f4b2c5b6?auto=format&fit=crop&q=80&w=800"
                            alt="Premium Indonesian Cocoa Beans"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <span className="naturra-products__detail-eyebrow">Product Focus</span>
                        <h2 className="naturra-products__detail-title">Cocoa Products</h2>
                        <p className="naturra-products__detail-text">
                            Indonesia is the world's third-largest cocoa producer. Our cocoa products range from
                            raw fermented beans to processed cocoa powder in both pure (HS 1805.00.0) and sweetened
                            (HS 1806.00.0) varieties. Sourced primarily from Sulawesi and Sumatra, our cocoa is known
                            for its rich flavor profile and consistent quality.
                        </p>
                        <ul className="naturra-products__detail-specs-list">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                HS 1805.00.0 — Cocoa Powder Pure
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                HS 1806.00.0 — Cocoa Powder Sweetened
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Sourced from Sulawesi &amp; Sumatra
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                International quality standards
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
                        <span className="naturra-products__detail-eyebrow">Product Focus</span>
                        <h2 className="naturra-products__detail-title">Cengkeh (Cloves)</h2>
                        <p className="naturra-products__detail-text">
                            Indonesia has been the world's premier clove-producing nation since ancient times.
                            Our cloves are hand-picked from the legendary Spice Islands (Maluku) and North Sulawesi,
                            ensuring the highest essential oil content and aromatic quality for culinary, pharmaceutical,
                            and industrial applications.
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
                        <span className="naturra-products__detail-eyebrow">Product Focus</span>
                        <h2 className="naturra-products__detail-title">Cocopeat</h2>
                        <p className="naturra-products__detail-text">
                            Our cocopeat is sourced from selected suppliers in Surabaya, East Java. Made from coconut
                            husk fibers, cocopeat is an eco-friendly growing medium perfect for horticulture, agriculture,
                            and landscaping. Available in compressed blocks and loose bulk packaging.
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
                        Interested in our products?
                    </h2>
                    <p className="naturra-products__cta-desc">
                        Contact us to discuss pricing, specifications, minimum order quantities,
                        and shipping arrangements for your commodity needs.
                    </p>
                    <div className="naturra-products__cta-actions">
                        <a
                            href="https://wa.me/628951395752"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="naturra-products__cta-btn naturra-products__cta-btn--white"
                        >
                            WhatsApp Us
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </a>
                        <a
                            href="mailto:naturraextal@gmail.com"
                            className="naturra-products__cta-btn naturra-products__cta-btn--outline"
                        >
                            Email: naturraextal@gmail.com
                        </a>
                    </div>
                </div>
            </section>

            <NaturraFooter />
        </div>
    )
}

export default NaturraProducts

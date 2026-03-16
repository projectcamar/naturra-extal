import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import './NaturraHome.css'

const NaturraHome: React.FC = () => {
    return (
        <div className="naturra-home">
            <Helmet>
                <title>Naturra Extal International | Premium Indonesian Commodity Trading</title>
                <meta name="description" content="CV Naturra Extal International - Leaders in Indonesian agricultural commodity trading. Premium cocoa, cloves, and cocopeat sourced directly from Indonesian farmers." />
                <meta property="og:title" content="Naturra Extal International | Premium Indonesian Commodity Trading" />
                <meta property="og:description" content="Leaders in Indonesian agricultural commodity trading. Premium cocoa, cloves, and cocopeat sourced directly from Indonesian farmers." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://naturra-extal.com/" />
            </Helmet>

            <NaturraHeader />

            {/* ===== HERO SECTION (ECOM Style) ===== */}
            <section className="naturra-home__hero">
                <div className="naturra-home__hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1611070857145-5ae045e3dab5?w=1920&q=80"
                        alt="Indonesian cocoa plantation"
                        loading="eager"
                    />
                </div>
                <div className="naturra-home__hero-overlay" />
                <div className="naturra-home__hero-content">
                    <div className="naturra-home__hero-text">
                        <span className="naturra-home__hero-eyebrow">CV Naturra Extal International</span>
                        <h1 className="naturra-home__hero-title">
                            Leaders in<br />
                            <strong>soft commodity</strong><br />
                            services
                        </h1>
                        <p className="naturra-home__hero-desc">
                            Connecting Indonesia's finest agricultural commodities with global markets.
                            Specializing in premium cocoa, cloves, and cocopeat.
                        </p>
                        <div className="naturra-home__hero-actions">
                            <Link to="/products" className="naturra-home__hero-btn naturra-home__hero-btn--primary">
                                Our Products
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                            <Link to="/about" className="naturra-home__hero-btn naturra-home__hero-btn--secondary">
                                Learn More
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
                        <div className="naturra-home__stat-label">Core Products</div>
                    </div>
                    <div className="naturra-home__stat">
                        <div className="naturra-home__stat-number">100%</div>
                        <div className="naturra-home__stat-label">Indonesian Sourced</div>
                    </div>
                    <div className="naturra-home__stat">
                        <div className="naturra-home__stat-number">Global</div>
                        <div className="naturra-home__stat-label">Market Reach</div>
                    </div>
                    <div className="naturra-home__stat">
                        <div className="naturra-home__stat-number">Premium</div>
                        <div className="naturra-home__stat-label">Quality Grade</div>
                    </div>
                </div>
            </section>

            {/* ===== HERITAGE SECTION (ECOM Style - Image 4) ===== */}
            <section className="naturra-home__heritage">
                <div className="naturra-home__heritage-inner">
                    <div className="naturra-home__heritage-image">
                        <img
                            src="https://images.unsplash.com/photo-1606913852359-e8bac53acb3a?w=800&q=80"
                            alt="Indonesian commodity sourcing heritage"
                            loading="lazy"
                        />
                        <div className="naturra-home__heritage-image-accent" />
                    </div>
                    <div className="naturra-home__heritage-text">
                        <span className="naturra-home__heritage-eyebrow">Our Heritage</span>
                        <h2 className="naturra-home__heritage-title">
                            Carrying on our<br />
                            <strong>market experience</strong><br />
                            and family business<br />
                            heritage.
                        </h2>
                        <p className="naturra-home__heritage-desc">
                            CV Naturra Extal International is an Indonesian-based agricultural commodity trading company.
                            We specialize in sourcing, processing, and exporting premium Indonesian commodities including
                            cocoa powder, cloves (cengkeh), and cocopeat to international markets.
                        </p>
                        <div className="naturra-home__heritage-features">
                            <div className="naturra-home__heritage-feature">
                                <div className="naturra-home__heritage-feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <span className="naturra-home__heritage-feature-text">Quality<br />Certified</span>
                            </div>
                            <div className="naturra-home__heritage-feature">
                                <div className="naturra-home__heritage-feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                </div>
                                <span className="naturra-home__heritage-feature-text">Global<br />Distribution</span>
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
                                <span className="naturra-home__heritage-feature-text">Farmer<br />Partnerships</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WHO WE ARE / PRODUCT GRID (ECOM Style - Image 4) ===== */}
            <section className="naturra-home__grid">
                <div className="naturra-home__grid-inner">
                    <span className="naturra-home__section-eyebrow">Our Products</span>
                    <h2 className="naturra-home__section-title">
                        <strong>Who we are</strong>
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
                                <span className="naturra-home__product-card-tag">HS 1805 &amp; 1806</span>
                                <h3 className="naturra-home__product-card-name">Cocoa Products</h3>
                                <p className="naturra-home__product-card-desc">
                                    Premium cocoa powder — both pure (HS 1805.00.0) and sweetened (HS 1806.00.0).
                                    Sourced from Indonesia's finest cocoa-producing regions.
                                </p>
                                <span className="naturra-home__product-card-link">
                                    Learn more
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>

                        {/* Cengkeh */}
                        <Link to="/products" className="naturra-home__product-card">
                            <img
                                className="naturra-home__product-card-image"
                                src="https://images.unsplash.com/photo-1599909533601-ec6cc tried8a7ab3?w=600&q=80"
                                alt="Indonesian Cloves - Cengkeh"
                                loading="lazy"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80' }}
                            />
                            <div className="naturra-home__product-card-body">
                                <span className="naturra-home__product-card-tag">Premium Grade</span>
                                <h3 className="naturra-home__product-card-name">Cengkeh (Cloves)</h3>
                                <p className="naturra-home__product-card-desc">
                                    Hand-picked Indonesian cloves known worldwide for their rich aroma and superior quality.
                                    Ideal for spice trade, cigarettes, and culinary use.
                                </p>
                                <span className="naturra-home__product-card-link">
                                    Learn more
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
                                <span className="naturra-home__product-card-tag">Eco-Friendly</span>
                                <h3 className="naturra-home__product-card-name">Cocopeat</h3>
                                <p className="naturra-home__product-card-desc">
                                    High-quality cocopeat from Indonesian coconut husks. Perfect for horticulture,
                                    agriculture, and sustainable growing media applications.
                                </p>
                                <span className="naturra-home__product-card-link">
                                    Learn more
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
                        <span className="naturra-home__sustainability-badge">Sustainability</span>
                    </div>
                    <div className="naturra-home__sustainability-content">
                        <h3>
                            Committed to a<br />
                            <strong>smarter future</strong>
                        </h3>
                        <p>
                            At Naturra Extal, sustainability isn't just a word — it's how we do business.
                            We partner directly with Indonesian farmers, ensuring fair trade practices
                            and environmental stewardship throughout our supply chain.
                        </p>
                        <ul className="naturra-home__sustainability-list">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Direct farmer partnerships across Indonesia
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Sustainable sourcing and processing methods
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Fair pricing and transparent supply chain
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Quality-controlled from farm to export
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ===== CTA / CONTACT SECTION ===== */}
            <section className="naturra-home__cta">
                <div className="naturra-home__cta-inner">
                    <div>
                        <span className="naturra-home__cta-eyebrow">Get in Touch</span>
                        <h2 className="naturra-home__cta-title">
                            Contact Naturra Extal to<br />
                            <strong>discuss your commodity needs</strong>
                        </h2>
                        <p className="naturra-home__cta-desc">
                            Whether you're looking for premium cocoa powder, Indonesian cloves, or cocopeat,
                            our team is ready to help you find the perfect solution for your business.
                        </p>
                        <div className="naturra-home__cta-actions">
                            <a
                                href="https://wa.me/628951395752"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="naturra-home__cta-btn naturra-home__cta-btn--primary"
                            >
                                WhatsApp Us
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                            </a>
                            <a
                                href="mailto:naturraextal@gmail.com"
                                className="naturra-home__cta-btn naturra-home__cta-btn--secondary"
                            >
                                Email Us
                            </a>
                        </div>
                    </div>

                    <div className="naturra-home__cta-cards">
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">📧</div>
                            <h4 className="naturra-home__cta-card-title">Email</h4>
                            <p className="naturra-home__cta-card-desc">naturraextal@gmail.com</p>
                        </div>
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">📱</div>
                            <h4 className="naturra-home__cta-card-title">WhatsApp</h4>
                            <p className="naturra-home__cta-card-desc">+62 895-1395-7752</p>
                        </div>
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">🌍</div>
                            <h4 className="naturra-home__cta-card-title">Global Trade</h4>
                            <p className="naturra-home__cta-card-desc">Worldwide shipping available</p>
                        </div>
                        <div className="naturra-home__cta-card">
                            <div className="naturra-home__cta-card-icon">🏢</div>
                            <h4 className="naturra-home__cta-card-title">Corporate</h4>
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

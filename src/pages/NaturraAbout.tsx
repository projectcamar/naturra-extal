import React from 'react'
import { Helmet } from 'react-helmet-async'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import './NaturraAbout.css'

const NaturraAbout: React.FC = () => {
    return (
        <div className="naturra-about">
            <Helmet>
                <title>About Us | Naturra Extal International</title>
                <meta name="description" content="Learn about CV Naturra Extal International - Indonesian agricultural commodity trading company specializing in cocoa, cloves and cocopeat, sourced directly from farmers." />
                <link rel="canonical" href="https://naturra-extal.com/about" />
            </Helmet>

            <NaturraHeader />

            {/* ===== HERO (Pipiltin "Founded" style with Naturra branding) ===== */}
            <section className="naturra-about__hero">
                <div className="naturra-about__hero-inner">
                    <span className="naturra-about__hero-eyebrow">About Us</span>
                    <h1 className="naturra-about__hero-title">
                        Naturra Extal<br />International
                    </h1>
                    <p className="naturra-about__hero-desc">
                        CV Naturra Extal International is an Indonesian commodity trading company
                        that bridges the gap between Indonesia's rich agricultural heritage and
                        the global market. We specialize in sourcing premium cocoa, cloves (cengkeh),
                        and cocopeat directly from Indonesian farmers — ensuring quality, sustainability,
                        and fair trade practices from farm to export.
                    </p>
                </div>
            </section>

            {/* ===== SOURCED FROM FARMERS (Pipiltin map section) ===== */}
            <section className="naturra-about__sourcing">
                <div className="naturra-about__sourcing-inner">
                    <div className="naturra-about__sourcing-image">
                        <img
                            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80"
                            alt="Indonesian farmers harvesting commodities"
                            loading="lazy"
                        />
                    </div>
                    <div className="naturra-about__sourcing-text">
                        <h2>SOURCED DIRECTLY FROM THE FARMERS</h2>
                        <p>
                            Indonesia is the third-largest cocoa producer in the world and home to some of the finest cloves
                            and coconut products. At Naturra Extal, we work directly with farming communities across the
                            Indonesian archipelago, cutting out middlemen to ensure farmers receive fair compensation while
                            our clients receive the highest quality commodities at competitive prices.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== INDONESIA COMMODITY DIVERSITY (Pipiltin region grid) ===== */}
            <section className="naturra-about__diversity">
                <div className="naturra-about__diversity-inner">
                    <h2 className="naturra-about__diversity-title">INDONESIA COMMODITY DIVERSITY</h2>
                    <p className="naturra-about__diversity-subtitle">
                        Our sourcing network spans across Indonesia's key agricultural regions
                    </p>

                    <div className="naturra-about__diversity-grid">
                        <div className="naturra-about__diversity-card">
                            <h3>Sulawesi</h3>
                            <p>
                                Indonesia's largest cocoa-producing region, responsible for over 60% of national cocoa output.
                                Sulawesi cocoa is known for its distinct flavor profile with mild acidity and rich chocolate notes
                                favored by international markets.
                            </p>
                        </div>
                        <div className="naturra-about__diversity-card">
                            <h3>East Java</h3>
                            <p>
                                Home to premium cocoa estates and major processing facilities. East Java also serves as our
                                cocopeat sourcing hub, leveraging the region's abundant coconut production and processing capabilities.
                            </p>
                        </div>
                        <div className="naturra-about__diversity-card">
                            <h3>Maluku</h3>
                            <p>
                                The legendary Spice Islands — birthplace of the global clove trade. Maluku cloves are
                                prized worldwide for their exceptional essential oil content and intense aromatic qualities
                                that remain unmatched globally.
                            </p>
                        </div>
                        <div className="naturra-about__diversity-card">
                            <h3>North Sulawesi</h3>
                            <p>
                                A significant cocoa and clove producing region with ideal climate conditions. The volcanic soil
                                enriches the flavor profiles of commodities grown here, contributing unique characteristics
                                sought by specialty buyers.
                            </p>
                        </div>
                        <div className="naturra-about__diversity-card">
                            <h3>Surabaya</h3>
                            <p>
                                Our key logistics and cocopeat supplier hub. Surabaya's strategic port location makes it
                                ideal for commodity processing and export operations, discovered as a prime cocopeat
                                source in January 2025.
                            </p>
                        </div>
                        <div className="naturra-about__diversity-card">
                            <h3>Sumatra</h3>
                            <p>
                                Rich in both cocoa and coconut production. Sumatra's diverse geography supports high-quality
                                cocopeat manufacturing and artisanal cocoa farming, with beans known for their fruity and
                                earthy undertones.
                            </p>
                        </div>
                    </div>

                    {/* Image row like Pipiltin */}
                    <div className="naturra-about__image-row">
                        <img
                            src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80"
                            alt="Cocoa beans drying"
                            loading="lazy"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80"
                            alt="Indonesian spices and cloves"
                            loading="lazy"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80"
                            alt="Agricultural landscape Indonesia"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* ===== OUR JOURNEY (Pipiltin "Bean to Bar" overlay section) ===== */}
            <section className="naturra-about__journey">
                <div className="naturra-about__journey-bg">
                    <img
                        src="https://images.unsplash.com/photo-1501004318855-e73c3a879c5f?w=1400&q=80"
                        alt="Agricultural supply chain"
                        loading="lazy"
                    />
                </div>
                <div className="naturra-about__journey-overlay" />
                <div className="naturra-about__journey-inner">
                    <div>
                        <span className="naturra-about__journey-title">Embracing Sustainability</span>
                        <h2 className="naturra-about__journey-heading">
                            OUR JOURNEY<br />FROM FARM TO<br />GLOBAL MARKET
                        </h2>
                    </div>
                    <div>
                        <p className="naturra-about__journey-desc">
                            At Naturra Extal, every commodity we trade goes through a rigorous quality assurance process.
                            From careful selection at the farm level, through proper drying and processing, to final
                            quality checks before export — we ensure that every shipment meets international standards.
                            Our commitment to sustainability means we invest in farmer education, promote organic farming
                            practices, and ensure that our operations leave a positive impact on local communities.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== PROCESS STEPS (Pipiltin "Bean to Bar Process") ===== */}
            <section className="naturra-about__process">
                <div className="naturra-about__process-inner">
                    <h2 className="naturra-about__process-title">FARM TO EXPORT PROCESS</h2>
                    <p className="naturra-about__process-subtitle">
                        Our quality-controlled supply chain ensures premium commodities at every step
                    </p>

                    <div className="naturra-about__process-grid">
                        <div className="naturra-about__process-step">
                            <div className="naturra-about__process-step-number">1</div>
                            <h4>Sourcing</h4>
                            <p>Direct partnerships with Indonesian farmers across key agricultural regions</p>
                        </div>
                        <div className="naturra-about__process-step">
                            <div className="naturra-about__process-step-number">2</div>
                            <h4>Selection</h4>
                            <p>Rigorous quality grading and selection ensuring only premium commodities</p>
                        </div>
                        <div className="naturra-about__process-step">
                            <div className="naturra-about__process-step-number">3</div>
                            <h4>Processing</h4>
                            <p>Proper drying, cleaning, and processing following international standards</p>
                        </div>
                        <div className="naturra-about__process-step">
                            <div className="naturra-about__process-step-number">4</div>
                            <h4>Export</h4>
                            <p>Quality-checked packaging and global shipping with full documentation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT SECTION (Pipiltin footer-style contact) ===== */}
            <section className="naturra-about__contact">
                <div className="naturra-about__contact-inner">
                    <div className="naturra-about__contact-col">
                        <h4>Company</h4>
                        <p>CV Naturra Extal International</p>
                        <p>Indonesia</p>
                    </div>
                    <div className="naturra-about__contact-col">
                        <h4>Contact</h4>
                        <a href="mailto:naturraextal@gmail.com">naturraextal@gmail.com</a>
                        <a href="https://wa.me/628951395752" target="_blank" rel="noopener noreferrer">
                            +62 895-1395-7752 (WhatsApp)
                        </a>
                    </div>
                    <div className="naturra-about__contact-col">
                        <h4>Follow Us</h4>
                        <div className="naturra-about__contact-social">
                            <a href="https://wa.me/628951395752" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            <a href="mailto:naturraextal@gmail.com">Email</a>
                        </div>
                    </div>
                </div>
            </section>

            <NaturraFooter />
        </div>
    )
}

export default NaturraAbout

import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Phone, Mail, MapPin, Award, Shield, Zap, Globe } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import { generateLocalBusinessStructuredData, generateFAQSchema } from '../utils/structuredData'
import { getFAQBySlug } from '../data/faq'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import './LandingPage.css'

// LANDING PAGE: Commodity Export Bekasi & Indonesia
// Target Keyword: "Indonesian agricultural commodity export" - HIGH INTENT B2B KEYWORD

const CommodityExportBekasi: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const langParam = searchParams.get('lang')
  const isIndonesian = langParam !== 'en'
  const language = isIndonesian ? 'id' : 'en'
  const localeMeta = generateLanguageSpecificMeta(isIndonesian)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const localBusinessSchema = generateLocalBusinessStructuredData()
  const faqData = getFAQBySlug('commodity-export-bekasi')
  const faqSchema = faqData ? generateFAQSchema(faqData.faqs) : null

  return (
    <div className="landing-page commodity-export-bekasi">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>Pusat Ekspor Komoditas Pertanian Bekasi - Cocoa, Cloves & Cocopeat | Naturra Extal</title>
        <meta name="description" content="Eksportir Komoditas Pertanian Terpercaya di Bekasi. Menyediakan Bubuk Kakao (HS 1805), Cengkeh Lal Pari, dan Cocopeat kualitas premium. Fasilitas pemrosesan modern & pengiriman global. Hubungi +62 895-1395-7752" />
        <meta name="keywords" content="ekspor komoditas pertanian bekasi, supplier bubuk kakao indonesia, eksportir cengkeh bekasi, jual cocopeat block ekspor, indonesian spices exporter, cocoa powder manufacturer indonesia, agricultural commodity trading bekasi" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`commodity-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content="Pusat Ekspor Komoditas Pertanian Bekasi - Naturra Extal" />
        <meta property="og:description" content="Mitra terpercaya untuk ekspor komoditas pertanian Indonesia. Bubuk Kakao, Cengkeh, dan Cocopeat kualitas premium dari fasilitas industri di Bekasi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <NaturraHeader isIndonesian={isIndonesian} language={language} />

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <Globe size={20} />
            <span>GLOBAL EXPORT PARTNER | SINCE 1999</span>
          </div>

          <h1 className="landing-hero-title">
            Indonesian Agricultural<br />
            <span className="highlight">Commodity Export Specialist</span>
          </h1>

          <p className="landing-hero-subtitle">
            Connecting premium Indonesian farmers with the global market. We specialize in high-quality Cocoa Powder, Cloves, and Cocopeat, processed in our modern industrial facility in Bekasi.
          </p>

          <div className="landing-hero-features">
            <div className="feature-badge">
              <CheckCircle size={20} />
              <span>Direct Sourcing</span>
            </div>
            <div className="feature-badge">
              <CheckCircle size={20} />
              <span>Premium Quality (HS Certified)</span>
            </div>
            <div className="feature-badge">
              <CheckCircle size={20} />
              <span>Global Logistics Ready</span>
            </div>
          </div>

          <div className="landing-hero-cta">
            <a href="https://wa.me/628951395752?text=Halo%20Naturra%20Extal%2C%20saya%20tertarik%20konsultasi%20ekspor%20komoditas"
              className="cta-button primary"
              target="_blank"
              rel="noopener noreferrer">
              <Phone size={20} />
              Inquiry via WhatsApp
            </a>
            <Link to="/products" className="cta-button secondary">
              View Product Portfolio
            </Link>
          </div>
        </div>

        <div className="landing-hero-image">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop"
            alt="Commodity Export Bekasi - Naturra Extal Industrial Facility"
            title="Naturra Extal - Agricultural Commodity Export Specialist"
            loading="eager"
            fetchPriority="high"
            width="1200"
            height="630"
          />
        </div>
      </section>

      {/* Commodity Highlights */}
      <section className="landing-why-choose">
        <div className="container">
          <h2 className="section-title">Our Premium Export Commodities</h2>
          <p className="section-subtitle">
            Reliable supply chain and rigorous quality control for the international market.
          </p>

          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="card-icon">
                <Award size={40} />
              </div>
              <h3>Premium Cocoa Powder</h3>
              <p>
                Natural and Alkalized cocoa powder (HS 1805 & 1806) with consistent fat content and pH levels.
              </p>
              <ul>
                <li>Sulawesi & Java sourcing</li>
                <li>10-12% Standard Fat</li>
                <li>High-solubility Alkalized options</li>
                <li>HACCP & Halal Certified</li>
              </ul>
            </div>

            <div className="why-choose-card">
              <div className="card-icon">
                <Zap size={40} />
              </div>
              <h3>Indonesian Cloves (Lal Pari)</h3>
              <p>
                Grade A cloves from North Sulawesi, known for the highest eugenol content in the world.
              </p>
              <ul>
                <li>Eugenol Content &gt; 70%</li>
                <li>Moisture &lt; 12%</li>
                <li>Minimum stems and impurities</li>
                <li>Sun-dried natural processing</li>
              </ul>
            </div>

            <div className="why-choose-card">
              <div className="card-icon">
                <Shield size={40} />
              </div>
              <h3>Cocopeat Grow Media</h3>
              <p>
                Sustainable growing media in 5kg blocks, washed for Low EC levels suitable for global agriculture.
              </p>
              <ul>
                <li>Low EC (&lt; 0.5 ms/cm)</li>
                <li>High water retention</li>
                <li>Standard 30x30x12cm blocks</li>
                <li>Available in bulk FCL</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="landing-process">
        <div className="container">
          <h2 className="section-title">Streamlined Export Logistics</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Inquiry & Price</h3>
              <p>Submit your requirements. We provide competitive FOB or CIF quotes within 48 hours.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Quality Sampling</h3>
              <p>We provide lab reports and physical samples for your evaluation and testing.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Contract & Deposit</h3>
              <p>Formal Sales Contract issued. Production begins upon deposit confirmation.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Processing & QC</h3>
              <p>Final processing, packaging, and secondary QC at our Bekasi facility.</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Logistics & Loading</h3>
              <p>Barang dimuat ke kontainer (FCL) di pelabuhan Tanjung Priok, Jakarta.</p>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <h3>Document Release</h3>
              <p>Full export documentation (COO, Phyto, BL) released upon final balance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqData && (
        <section className="landing-faq">
          <div className="container">
            <h2 className="section-title">Common Questions</h2>
            <div className="faq-grid">
              {faqData.faqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="landing-final-cta">
        <div className="container">
          <h2>Expand Your Commodity Sourcing Today</h2>
          <p>Request a detailed quote for your next container order.</p>
          <div className="contact-methods">
            <a href="mailto:naturraextal@gmail.com" className="contact-card email">
              <Mail size={32} />
              <strong>Email</strong>
              <span>naturraextal@gmail.com</span>
            </a>
            <div className="contact-card location">
              <MapPin size={32} />
              <strong>Industrial Facility</strong>
              <span>Bekasi, West Java, Indonesia</span>
            </div>
          </div>
          <div className="final-cta-button">
            <a href="https://wa.me/628951395752"
              className="cta-button primary large"
              target="_blank"
              rel="noopener noreferrer">
              <Phone size={24} />
              Contact Our Export Team
            </a>
          </div>
        </div>
      </section>

      <NaturraFooter />
    </div>
  )
}

export default CommodityExportBekasi

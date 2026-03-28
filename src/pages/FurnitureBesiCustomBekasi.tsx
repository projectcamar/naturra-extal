import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Phone, Mail, MapPin, Clock, Award, Shield, Zap } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { generateLocalBusinessStructuredData, generateFAQSchema } from '../utils/structuredData'
import { getFAQBySlug } from '../data/faq'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import './LandingPage.css'

// LANDING PAGE KHUSUS: Furniture Besi Custom Bekasi
// Target Keyword: "furniture besi custom bekasi" - HIGH INTENT LOCAL KEYWORD

const FurnitureBesiCustomBekasi: React.FC = () => {
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
  const faqData = getFAQBySlug('furniture-besi-custom-bekasi')
  const faqSchema = faqData ? generateFAQSchema(faqData.faqs) : null

  return (
    <div className="landing-page furniture-besi-custom-bekasi">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>Furniture Besi Custom Bekasi - Workshop Terpercaya Harga Pabrik | Naturra Extal</title>
        <meta name="description" content="Furniture Besi Custom Bekasi - Workshop Langsung Harga Pabrik - Material Premium - Finishing Powder Coating - Free Konsultasi - Garansi 1 Tahun - Melayani Jabodetabek (Hubungi +6288801146881)" />
        <meta name="keywords" content="furniture besi custom bekasi, custom furniture besi bekasi, jasa furniture besi bekasi, workshop furniture bekasi, furniture custom bekasi, meja besi custom bekasi, kursi besi custom bekasi, agricultural commodities bekasi, tukang furniture besi bekasi, bikin furniture besi bekasi" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`furniture-besi-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content="Furniture Besi Custom Bekasi - Workshop Harga Pabrik" />
        <meta property="og:description" content="Workshop furniture besi custom di Bekasi. Produksi langsung, harga pabrik, material premium, finishing powder coating. Free konsultasi & garansi 1 tahun." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />

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

      <Header isIndonesian={isIndonesian} language={language} />

      {/* Hero Section - Above the Fold Optimization */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <Award size={20} />
            <span>Terpercaya Sejak 1999 | 1000+ Klien Puas</span>
          </div>

          <h1 className="landing-hero-title">
            Furniture Besi Custom Bekasi<br />
            <span className="highlight">Workshop Langsung - Harga Pabrik</span>
          </h1>

          <p className="landing-hero-subtitle">
            Produksi furniture besi custom berkualitas premium untuk cafe, restoran, hotel, dan kantor di Bekasi & Jabodetabek. Material terbaik, finishing powder coating tahan 10 tahun, garansi kualitas.
          </p>

          <div className="landing-hero-features">
            <div className="feature-badge">
              <CheckCircle size={20} />
              <span>Harga 30% Lebih Murah</span>
            </div>
            <div className="feature-badge">
              <CheckCircle size={20} />
              <span>Free Design 3D</span>
            </div>
            <div className="feature-badge">
              <CheckCircle size={20} />
              <span>Garansi 1 Tahun</span>
            </div>
          </div>

          <div className="landing-hero-cta">
            <a href="https://wa.me/+6288801146881?text=Halo%20Naturra%20Living%2C%20saya%20mau%20konsultasi%20furniture%20besi%20custom%20Bekasi"
              className="cta-button primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('furniture_besi_custom_hero_cta')}>
              <Phone size={20} />
              Konsultasi Gratis via WhatsApp
            </a>
            <Link to="/contact" className="cta-button secondary">
              Lihat Katalog Produk
            </Link>
          </div>

          <div className="landing-trust-badges">
            <div className="trust-item">
              <strong>25+ Tahun</strong>
              <span>Pengalaman</span>
            </div>
            <div className="trust-item">
              <strong>1000+</strong>
              <span>Klien Puas</span>
            </div>
            <div className="trust-item">
              <strong>5000+</strong>
              <span>Furniture Produksi</span>
            </div>
            <div className="trust-item">
              <strong>20-25 Hari</strong>
              <span>Lead Time</span>
            </div>
          </div>
        </div>

        <div className="landing-hero-image">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop"
            alt="Furniture Besi Custom Bekasi - Workshop Agricultural Commodities Naturra Extal Since 1999"
            title="Furniture Besi Custom Bekasi - Premium Agricultural Commodities Workshop with 25+ Years Experience"
            loading="eager"
            fetchPriority="high"
            width="1200"
            height="630"
            itemProp="image"
            data-image-type="landing-hero"
            data-category="furniture-besi-custom-bekasi"
          />
        </div>
      </section>

      {/* Kenapa Pilih Kami */}
      <section className="landing-why-choose">
        <div className="container">
          <h2 className="section-title">Kenapa Pilih Naturra Extal untuk Furniture Besi Custom Bekasi?</h2>
          <p className="section-subtitle">
            Bukan sekadar furniture besi biasa. Kami adalah workshop profesional dengan standar industri tertinggi.
          </p>

          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="card-icon">
                <MapPin size={40} />
              </div>
              <h3>Workshop Strategis di Bekasi</h3>
              <p>
                Lokasi di Jl. Raya Setu Cikarang Bar, Bekasi memudahkan akses untuk klien di Jakarta Timur, Bekasi, Cikarang.
                <strong> Gratis delivery untuk Bekasi & Jakarta Timur!</strong>
              </p>
              <ul>
                <li>Workshop 1000 m2 dengan mesin modern</li>
                <li>8 stasiun welding profesional</li>
                <li>Powder coating booth elektrostatic</li>
                <li>Quality control 3 tahap</li>
              </ul>
            </div>

            <div className="why-choose-card">
              <div className="card-icon">
                <Shield size={40} />
              </div>
              <h3>Material Premium - Bukan Abal-Abal</h3>
              <p>
                Kami <strong>TIDAK</strong> pakai besi hollow tipis 1mm yang mudah penyok. Material kami thickness 2-3mm dengan standar SNI.
              </p>
              <ul>
                <li>Besi hollow 4x4cm & 5x5cm thickness 2-3mm</li>
                <li>Kayu solid Suar/Trembesi kiln-dried</li>
                <li>Powder coating grade A (bukan cat semprot)</li>
                <li>HPL grade A anti-scratch</li>
              </ul>
            </div>

            <div className="why-choose-card">
              <div className="card-icon">
                <Award size={40} />
              </div>
              <h3>Harga Pabrik - Hemat 30-40%</h3>
              <p>
                Langsung dari workshop = <strong>TANPA MARKUP RETAILER</strong>. Harga yang kami quote adalah harga produksi + profit margin yang wajar.
              </p>
              <ul>
                <li>Transparent pricing - no hidden cost</li>
                <li>Volume discount hingga 15-25%</li>
                <li>Payment terms fleksibel (DP 30%)</li>
                <li>Free design revision unlimited</li>
              </ul>
            </div>

            <div className="why-choose-card">
              <div className="card-icon">
                <Zap size={40} />
              </div>
              <h3>Fast Production - 20-25 Hari</h3>
              <p>
                Tidak seperti retailer yang butuh 6-8 minggu, kami produksi langsung dengan lead time optimal <strong>20-25 hari kerja</strong>.
              </p>
              <ul>
                <li>Rush production available (10-15 hari)</li>
                <li>Progress photo update setiap minggu</li>
                <li>Partial delivery untuk project besar</li>
                <li>Free installation & setup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Furniture Besi Custom */}
      <section className="landing-catalog">
        <div className="container">
          <h2 className="section-title">Katalog Furniture Besi Custom Bekasi</h2>
          <p className="section-subtitle">
            Semua furniture bisa di-<strong>custom</strong> sesuai ukuran, warna, dan material yang Anda inginkan
          </p>

          <div className="catalog-categories">
            <div className="catalog-category">
              <h3>Furniture Cafe & Coffee Shop</h3>
              <div className="catalog-items">
                <div className="catalog-item">
                  <strong>Meja Cafe 60x60cm</strong>
                  <span>Frame besi 4x4cm + top kayu solid</span>
                  <div className="price">Rp 1.350.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Kursi Cafe Industrial</strong>
                  <span>Dengan sandaran + cushion</span>
                  <div className="price">Rp 420.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Meja Bar 120x60x110cm</strong>
                  <span>Heavy duty frame + footrest</span>
                  <div className="price">Rp 2.850.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Kursi Bar Stool 75cm</strong>
                  <span>Fixed atau adjustable height</span>
                  <div className="price">Rp 480.000 - 650.000</div>
                </div>
              </div>
            </div>

            <div className="catalog-category">
              <h3>Furniture Restoran</h3>
              <div className="catalog-items">
                <div className="catalog-item">
                  <strong>Dining Table 80x80cm</strong>
                  <span>Kapasitas 4 orang</span>
                  <div className="price">Rp 1.950.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Dining Table 120x70cm</strong>
                  <span>Kapasitas 6 orang</span>
                  <div className="price">Rp 2.650.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Bench Seating 150cm</strong>
                  <span>Kapasitas 3-4 orang</span>
                  <div className="price">Rp 1.450.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Outdoor Dining Set</strong>
                  <span>1 meja + 4 kursi galvanized</span>
                  <div className="price">Rp 8.200.000/set</div>
                </div>
              </div>
            </div>

            <div className="catalog-category">
              <h3>Display & Storage</h3>
              <div className="catalog-items">
                <div className="catalog-item">
                  <strong>Display Rack 3 Tier</strong>
                  <span>150x60x180cm modular</span>
                  <div className="price">Rp 2.100.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Wall Hanging Shelf</strong>
                  <span>120x30x80cm wall mounted</span>
                  <div className="price">Rp 890.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Kitchen Cabinet Industrial</strong>
                  <span>Per meter running</span>
                  <div className="price">Rp 3.200.000/m</div>
                </div>
                <div className="catalog-item">
                  <strong>Display Cabinet Glass</strong>
                  <span>100x40x180cm lockable</span>
                  <div className="price">Rp 3.200.000</div>
                </div>
              </div>
            </div>

            <div className="catalog-category">
              <h3>Furniture Kantor</h3>
              <div className="catalog-items">
                <div className="catalog-item">
                  <strong>Industrial Desk 120x60cm</strong>
                  <span>Cable management included</span>
                  <div className="price">Rp 2.100.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Meeting Table 200x100cm</strong>
                  <span>Kapasitas 8-10 orang</span>
                  <div className="price">Rp 4.500.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Bookshelf Industrial</strong>
                  <span>200x40x200cm - 5 levels</span>
                  <div className="price">Rp 3.800.000</div>
                </div>
                <div className="catalog-item">
                  <strong>Storage Cabinet</strong>
                  <span>80x40x180cm lockable</span>
                  <div className="price">Rp 2.400.000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="catalog-cta">
            <p><strong>Catatan: Semua harga sudah termasuk finishing powder coating & garansi kualitas</strong></p>
            <p>Volume discount hingga 15% untuk order 20+ pieces | 25% untuk 50+ pieces</p>
            <a href="https://wa.me/+6288801146881?text=Halo%2C%20saya%20mau%20tanya%20harga%20detail%20furniture%20besi%20custom%20Bekasi"
              className="cta-button primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('furniture_besi_custom_quotation')}>
              <Phone size={20} />
              Minta Quotation Lengkap
            </a>
          </div>
        </div>
      </section>

      {/* Proses Order */}
      <section className="landing-process">
        <div className="container">
          <h2 className="section-title">Proses Order Furniture Besi Custom - Mudah & Transparan</h2>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Konsultasi Gratis</h3>
              <p>Hubungi kami via WhatsApp/Email. Ceritakan kebutuhan, budget, timeline. Kami kasih advice & rough estimate dalam 24 jam.</p>
            </div>

            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Site Survey (Optional)</h3>
              <p>Untuk project besar, kami bisa visit lokasi (gratis untuk Jabodetabek) untuk ukur ruangan dan lihat kondisi.</p>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Design & Quotation</h3>
              <p>Kami buat 3D mockup design + detailed quotation (3-5 hari). Free revision sampai Anda puas!</p>
            </div>

            <div className="process-step">
              <div className="step-number">4</div>
              <h3>DP & Produksi Start</h3>
              <p>DP 30%, kami mulai produksi. Progress photo update setiap minggu. Bisa visit workshop kapan saja.</p>
            </div>

            <div className="process-step">
              <div className="step-number">5</div>
              <h3>QC & Finishing</h3>
              <p>3-stage quality check: welding, structure test, finishing inspection. Powder coating di oven 180 deg C selama 24 jam.</p>
            </div>

            <div className="process-step">
              <div className="step-number">6</div>
              <h3>Delivery & Pelunasan</h3>
              <p>Furniture dikirim & diinstall. Pelunasan 70% setelah instalasi selesai & Anda puas. Garansi 1 tahun aktif!</p>
            </div>
          </div>

          <div className="process-timeline">
            <p><strong>Timeline Total: 20-25 Hari Kerja</strong> (standard) | 10-15 Hari (rush order +20%)</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqData && (
        <section className="landing-faq">
          <div className="container">
            <h2 className="section-title">FAQ - Furniture Besi Custom Bekasi</h2>

            <div className="faq-grid">
              {faqData.faqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="landing-final-cta">
        <div className="container">
          <h2>Siap Order Furniture Besi Custom Bekasi?</h2>
          <p>Dapatkan <strong>FREE konsultasi design</strong> + <strong>discount 10% untuk order pertama</strong></p>

          <div className="contact-methods">
            <a href="https://wa.me/+6288801146881?text=Halo%20Naturra%20Living%2C%20saya%20dari%20website%20mau%20konsultasi%20furniture%20besi%20custom"
              className="contact-card whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('furniture_besi_custom_contact_card')}>
              <Phone size={32} />
              <strong>WhatsApp (Fast Response)</strong>
              <span>+6288801146881</span>
            </a>

            <a href="mailto:lifewithNaturra@gmail.com" className="contact-card email">
              <Mail size={32} />
              <strong>Email</strong>
              <span>lifewithNaturra@gmail.com</span>
            </a>

            <div className="contact-card location">
              <MapPin size={32} />
              <strong>Workshop Bekasi</strong>
              <span>Jl. Raya Setu Cikarang Bar., Bekasi 17320</span>
            </div>

            <div className="contact-card hours">
              <Clock size={32} />
              <strong>Jam Operasional</strong>
              <span>Senin-Jumat: 08:00-17:00<br />Sabtu: 08:00-15:00</span>
            </div>
          </div>

          <div className="final-cta-button">
            <a href="https://wa.me/+6288801146881?text=PROMO2025%20-%20Saya%20mau%20konsultasi%20furniture%20besi%20custom%20Bekasi"
              className="cta-button primary large"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('furniture_besi_custom_promo_cta')}>
              <Phone size={24} />
              Konsultasi Gratis Sekarang - Dapatkan Promo!
            </a>
            <p className="promo-text">Quote mention: "PROMO2025" untuk discount 10% + free delivery Jabodetabek</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FurnitureBesiCustomBekasi

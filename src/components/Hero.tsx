import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

// Premium Agricultural Commodity Hero Image
const heroImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80'

interface HeroProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

const Hero: React.FC<HeroProps> = ({ language = 'en' }) => {
  const subtitle = language === 'id'
    ? "Mitra Terpercaya untuk Komoditas Pertanian Indonesia. Sejak 1999, kami mengekspor Bubuk Kakao, Cengkeh, dan Cocopeat kualitas premium dari fasilitas industri kami di Bekasi ke seluruh dunia."
    : language === 'ar'
      ? "شريكك الموثوق للمنتجات الزراعية الإندونيسية. منذ عام 1999، نقوم بتصدير مسحوق الكاكاو والقرنفل والكوكوبيت عالي الجودة من منشأتنا الصناعية في بيكاسي إلى العالم."
      : language === 'zh'
        ? "印度尼西亚农产品的可靠合作伙伴。自1999年以来，我们一直从勿加泗的工业设施向全球出口优质可可粉、丁香和椰糠。"
        : language === 'ja'
          ? "インドネシア農産物の信頼できるパートナー。1999年以来、ブカシの産業施設からプレミアム品質のココアパウダー、クローブ、ココピートを世界中に輸出しています。"
          : language === 'es'
            ? "Su socio confiable para productos agrícolas indonesios. Desde 1999, exportamos cacao en polvo, clavos y cocopeat de calidad premium desde nuestra instalación industrial en Bekasi al mundo."
            : language === 'fr'
              ? "Votre partenaire de confiance pour les produits agricoles indonésiens. Depuis 1999, nous exportons de la poudre de cacao, des clous de girofle et du cocopeat de qualité supérieure."
              : language === 'ko'
                ? "인도네시아 농산물의 신뢰할 수 있는 파트너. 1999년부터 브카시 산업 시설에서 프리미엄 코코아 가루, 정향, 코코피트를 전 세계로 수출하고 있습니다."
                : "Your Trusted Partner for Indonesian Agricultural Commodities. Since 1999, we export premium Cocoa Powder, Cloves, and Cocopeat from our industrial facility in Bekasi to the world."

  const buttonText = language === 'id' ? "LIHAT PRODUK" : language === 'ar' ? "تصفح المنتجات" : language === 'zh' ? "查看产品" : language === 'ja' ? "製品を見る" : language === 'es' ? "VER PRODUCTOS" : language === 'fr' ? "VOIR LES PRODUITS" : language === 'ko' ? "제품 보기" : "EXPLORE PRODUCTS"

  return (
    <section className="hero" role="banner" aria-labelledby="hero-title">
      <div className="hero-background">
        <img
          src={heroImage}
          alt="Premium Agricultural Commodities by Naturra Extal - Cocoa, Cloves, Cocopeat Export Since 1999"
          title="Naturra Extal - Agricultural Commodities Exporter Bekasi - Premium Quality Since 1999"
          className="hero-bg-image"
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
          itemProp="image"
          data-image-type="hero"
          data-category="hero-banner"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">
          Naturra Extal
        </h1>
        <p className="hero-subtitle">
          {subtitle}
        </p>
        <Link to="/products" className="hero-btn">
          {buttonText}
        </Link>
      </div>
    </section>
  )
}

export default Hero

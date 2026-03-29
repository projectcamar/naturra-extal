import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'


interface HeroProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

const Hero: React.FC<HeroProps> = ({ language = 'en' }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const translations: Record<string, { title: string, subtitle: string, button: string }> = {
    en: {
      title: "CV Naturra Extal International",
      subtitle: "Connecting Indonesia's finest agricultural commodities with global markets. Specializing in premium cocoa, cloves, and cocopeat.",
      button: "EXPLORE PRODUCTS"
    },
    id: {
      title: "CV Naturra Extal International",
      subtitle: "Mitra Terpercaya untuk Komoditas Pertanian Indonesia. Sejak 1999, kami mengekspor Bubuk Kakao, Cengkeh, dan Cocopeat kualitas premium dari fasilitas industri kami di Bekasi ke seluruh dunia.",
      button: "LIHAT PRODUK"
    },
    ar: {
      title: "CV Naturra Extal International",
      subtitle: "شريكك الموثوق للمنتجات الزراعية الإندونيسية. منذ عام 1999، نقوم بتصدير مسحوق الكاكاو والقرنفل والكوكوبيت عالي الجودة من منشأتنا الصناعية في بيكاسي إلى العالم.",
      button: "تصفح المنتجات"
    },
    zh: {
      title: "CV Naturra Extal International",
      subtitle: "印度尼西亚农产品的可靠合作伙伴。自1999年以来，我们一直从勿加泗的工业设施向全球出口优质可可粉、丁香和椰糠。",
      button: "查看产品"
    },
    ja: {
      title: "CV Naturra Extal International",
      subtitle: "インドネシア農産物の信頼できるパートナー。1999年以来、ブカシの産業施設 from プレミアム品質のココアパウダー、クローブ、ココピートを世界中に輸出しています。",
      button: "製品を見る"
    },
    es: {
      title: "CV Naturra Extal International",
      subtitle: "Su socio confiable para productos agrícolas indonesios. Desde 1999, exportamos cacao en polvo, clavos y cocopeat de calidad premium desde nuestra instalación industrial en Bekasi al mundo.",
      button: "VER PRODUCTOS"
    },
    fr: {
      title: "CV Naturra Extal International",
      subtitle: "Votre partenaire de confiance pour les produits agricoles indonésiens. Depuis 1999, nous exportons de la poudre de cacao, des clous de girofle et du cocopeat de qualité supérieure.",
      button: "VOIR LES PRODUITS"
    },
    ko: {
      title: "CV Naturra Extal International",
      subtitle: "인도네시아 농산물의 신뢰할 수 있는 파트너. 1999년부터 브카시 산업 시설에서 프리미엄 코코아 가루, 정향, 코코피트를 전 세계로 수출하고 있습니다.",
      button: "제품 보기"
    }
  }

  const t = translations[language] || translations.en

  useEffect(() => {
    if (videoRef.current) {
      // Robustly trigger play
      videoRef.current.play().catch(error => {
        console.warn("Hero video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="hero" role="banner" aria-labelledby="hero-title">
      <div className="hero-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-bg-video"
          aria-hidden="true"
        >
          <source src="/video-hero-mainlandingpage.mp4" type="video/mp4" />
          <source src="./video-hero-mainlandingpage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">
          {t.title}
        </h1>
        <p className="hero-subtitle">
          {t.subtitle}
        </p>
        <Link to="/products" className="hero-btn">
          {t.button}
        </Link>
      </div>
    </section>
  )
}

export default Hero

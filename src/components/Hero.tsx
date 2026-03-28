import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
// legacy mangala image import removed

interface HeroProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

const Hero: React.FC<HeroProps> = ({ language = 'en' }) => {
  const subtitle = language === 'id'
    ? "Sejak 1999, kami menghadirkan bar set outdoor, lounge set, sofa bench, storage rack dan furniture industrial terbaik untuk cafe, hotel dan restoran dari workshop Bekasi"
    : language === 'ar'
      ? "منذ عام 1999، نقدم أطقم بار خارجية فاخرة، أطقم صالة، أرائك، رفوف تخزين وأثاث صناعي للمقاهي والفنادق والمطاعم من ورشتنا في بيكاسي"
      : language === 'zh'
        ? "自1999年以来，我们从勿加泗工作坊为咖啡馆、酒店和餐厅提供优质户外吧台套装、休息区套装、沙发长椅、储物架和工业家具"
        : language === 'ja'
          ? "1999年以来、ブカシ工房からカフェ、ホテル、レストラン向けに高品質な屋外バーセット、ラウンジセット、ソファベンチ、収納ラック、インダストリアル家具を提供しています"
          : language === 'es'
            ? "Desde 1999, entregamos sets de bar exterior premium, sets de sala, sofás banco, estanterías de almacenamiento y muebles industriales para cafés, hoteles y restaurantes desde nuestro taller en Bekasi"
            : language === 'fr'
              ? "Depuis 1999, nous livrons des sets de bar extérieur premium, sets de salon, bancs canapés, étagères de rangement et meubles industriels pour cafés, hôtels et restaurants depuis notre atelier à Bekasi"
              : language === 'ko'
                ? "1999년부터 브카시 워크숍에서 카페, 호텔, 레스토랑을 위한 프리미엄 야외 바 세트, 라운지 세트, 소파 벤치, 수납 선반 및 산업용 가구를 제공합니다"
                : "Since 1999, we deliver premium bar set outdoor, lounge set, sofa bench, storage rack and industrial furniture for cafes, hotels and restaurants from our Bekasi workshop"

  const buttonText = language === 'id' ? "BELANJA SEKARANG" : language === 'ar' ? "تسوق الآن" : language === 'zh' ? "立即购买" : language === 'ja' ? "今すぐ購入" : language === 'es' ? "COMPRAR AHORA" : language === 'fr' ? "ACHETER MAINTENANT" : language === 'ko' ? "지금 쇼핑" : "SHOP NOW"

  return (
    <section className="hero" role="banner" aria-labelledby="hero-title">
      <div className="hero-background">
        <img
          src={heroImage}
          alt="Industrial Furniture Collection by Mangala Living - Premium Furniture Besi Custom Bekasi Since 1999"
          title="Mangala Living - Industrial Furniture Manufacturer Workshop Bekasi - Premium Quality Since 1999"
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
          MANGALA LIVING
        </h1>
        <p className="hero-subtitle">
          {subtitle}
        </p>
        <Link to="/shop" className="hero-btn">
          {buttonText}
        </Link>
      </div>
    </section>
  )
}

export default Hero

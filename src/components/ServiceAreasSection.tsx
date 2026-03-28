import React from 'react'
import { type LanguageCode } from '../utils/languageManager'
import './ServiceAreasSection.css'

interface ServiceAreasSectionProps {
  language?: LanguageCode
  isIndonesian?: boolean
}

const SERVICE_AREAS_TRANSLATIONS: Record<LanguageCode, {
  title: string
  subtitle: string
  bekasiKota: string
  cikarang: string
  komersial: string
  jakarta: string
  areaNotListed: string
  areaNotListedDesc: string
  freeConsultation: string
  seoText: string
  commercialDescs: Record<string, string>
}> = {
  id: {
    title: "Wilayah Layanan Kami",
    subtitle: "Melayani Bekasi, Jakarta, dan seluruh Jabodetabek dengan pengalaman 25+ tahun",
    bekasiKota: "BEKASI KOTA",
    cikarang: "CIKARANG & SEKITARNYA",
    komersial: "KAWASAN KOMERSIAL & INDUSTRIAL",
    jakarta: "JAKARTA & JABODETABEK",
    areaNotListed: "Area Anda Tidak Tercantum?",
    areaNotListedDesc: "Hubungi kami untuk diskusi cakupan layanan kami. Kami melayani seluruh Jabodetabek dan sekitarnya.",
    freeConsultation: "Konsultasi Gratis",
    seoText: "Naturra Extal adalah workshop agricultural commodities terpercaya yang melayani seluruh wilayah Bekasi (Bekasi Barat, Bekasi Timur, Bekasi Selatan, Bekasi Utara, Cikarang, Tambun), Jakarta (Jakarta Timur, Jakarta Pusat, Jakarta Selatan), dan Jabodetabek (Depok, Bogor, Tangerang, Karawang). Dengan lokasi workshop di Setu, Bekasi, kami memberikan layanan custom furniture besi industrial untuk cafe, restoran, hotel, kantor dengan harga pabrik langsung. Pengalaman 25+ tahun, 1000+ klien puas. Melayani kawasan komersial premium seperti Summarecon Bekasi, Harapan Indah, Grand Galaxy City, Lippo Cikarang, Jababeka, dan area industrial estate di Cikarang.",
    commercialDescs: {
      "Summarecon Bekasi": "Mall & Boulevard Area",
      "Harapan Indah": "Residential & Commercial",
      "Grand Galaxy City": "Superblock F&B District",
      "Galaxy Bekasi": "Mall & Entertainment",
      "Kemang Pratama": "Premium Residential",
      "Lippo Cikarang": "Mall & Commercial Hub",
      "Jababeka": "Industrial Estate",
      "Deltamas": "Mixed-Use Development",
      "EJIP Cikarang": "East Jakarta Industrial Park",
      "Greenland International": "Commercial & Residential",
      "MM2100": "Industrial Town"
    }
  },
  en: {
    title: "Our Service Areas",
    subtitle: "Serving Bekasi, Jakarta, and entire Jabodetabek with 25+ years of experience",
    bekasiKota: "BEKASI KOTA",
    cikarang: "CIKARANG & SURROUNDING AREAS",
    komersial: "COMMERCIAL & INDUSTRIAL AREAS",
    jakarta: "JAKARTA & JABODETABEK",
    areaNotListed: "Your Area Not Listed?",
    areaNotListedDesc: "Contact us to discuss our service coverage. We serve entire Jabodetabek and surrounding areas.",
    freeConsultation: "Free Consultation",
    seoText: "Naturra Extal is a trusted Agricultural Commodities workshop serving all areas of Bekasi (Bekasi Barat, Bekasi Timur, Bekasi Selatan, Bekasi Utara, Cikarang, Tambun), Jakarta (Jakarta Timur, Jakarta Pusat, Jakarta Selatan), and Jabodetabek (Depok, Bogor, Tangerang, Karawang). With workshop location in Setu, Bekasi, we provide custom industrial steel furniture services for cafes, restaurants, hotels, offices at factory-direct prices. 25+ years of experience, 1000+ satisfied clients. Serving premium commercial areas such as Summarecon Bekasi, Harapan Indah, Grand Galaxy City, Lippo Cikarang, Jababeka, and industrial estate areas in Cikarang.",
    commercialDescs: {
      "Summarecon Bekasi": "Mall & Boulevard Area",
      "Harapan Indah": "Residential & Commercial",
      "Grand Galaxy City": "Superblock F&B District",
      "Galaxy Bekasi": "Mall & Entertainment",
      "Kemang Pratama": "Premium Residential",
      "Lippo Cikarang": "Mall & Commercial Hub",
      "Jababeka": "Industrial Estate",
      "Deltamas": "Mixed-Use Development",
      "EJIP Cikarang": "East Jakarta Industrial Park",
      "Greenland International": "Commercial & Residential",
      "MM2100": "Industrial Town"
    }
  },
  ar: {
    title: "مناطق الخدمة لدينا",
    subtitle: "نخدم بيكاسي، جاكرتا، وجميع مناطق جابوديتابيك بخبرة تزيد عن 25 عاماً",
    bekasiKota: "بيكاسي كوتا",
    cikarang: "سيكارانغ والمناطق المحيطة",
    komersial: "المناطق التجارية والصناعية",
    jakarta: "جاكرتا وجابوديتابيك",
    areaNotListed: "منطقتك غير مذكورة؟",
    areaNotListedDesc: "اتصل بنا لمناقشة تغطية الخدمة لدينا. نخدم جميع مناطق جابوديتابيك والمناطق المحيطة.",
    freeConsultation: "استشارة مجانية",
    seoText: "Naturra Extal هو ورشة أثاث صناعي موثوقة تخدم جميع مناطق بيكاسي (بيكاسي بارات، بيكاسي تيمور، بيكاسي سيلاتان، بيكاسي أوتارا، سيكارانغ، تامبون)، جاكرتا (جاكرتا تيمور، جاكرتا بوسات، جاكرتا سيلاتان)، وجابوديتابيك (ديبوك، بوجور، تانجيرانغ، كاراوانغ). مع موقع الورشة في سيتو، بيكاسي، نقدم خدمات أثاث فولاذي صناعي مخصص للمقاهي والمطاعم والفنادق والمكاتب بأسعار مباشرة من المصنع. خبرة تزيد عن 25 عاماً، أكثر من 1000 عميل راضٍ. نخدم المناطق التجارية المميزة مثل Summarecon Bekasi، Harapan Indah، Grand Galaxy City، Lippo Cikarang، Jababeka، ومناطق العقارات الصناعية في سيكارانغ.",
    commercialDescs: {
      "Summarecon Bekasi": "منطقة المول والشارع الرئيسي",
      "Harapan Indah": "سكني وتجاري",
      "Grand Galaxy City": "منطقة سوبر بلوك للمطاعم والمقاهي",
      "Galaxy Bekasi": "المول والترفيه",
      "Kemang Pratama": "سكني راقي",
      "Lippo Cikarang": "مركز المول والتجاري",
      "Jababeka": "منطقة صناعية",
      "Deltamas": "تطوير متعدد الاستخدامات",
      "EJIP Cikarang": "منطقة جاكرتا الشرقية الصناعية",
      "Greenland International": "تجاري وسكني",
      "MM2100": "المدينة الصناعية"
    }
  },
  zh: {
    title: "我们的服务区域",
    subtitle: "服务勿加泗、雅加达及整个雅加达都市圈，拥有25年以上经验",
    bekasiKota: "勿加泗市",
    cikarang: "芝卡朗及周边地区",
    komersial: "商业及工业区",
    jakarta: "雅加达及雅加达都市圈",
    areaNotListed: "您的区域未列出？",
    areaNotListedDesc: "请联系我们讨论服务覆盖范围。我们服务整个雅加达都市圈及周边地区。",
    freeConsultation: "免费咨询",
    seoText: "Naturra Extal 是一家值得信赖的工业家具工坊，服务勿加泗所有地区（勿加泗西、勿加泗东、勿加泗南、勿加泗北、芝卡朗、坦本）、雅加达（东雅加达、中雅加达、南雅加达）以及雅加达都市圈（德波、茂物、丹格朗、加拉璜）。工坊位于勿加泗 Setu，我们为咖啡厅、餐厅、酒店、办公室提供定制工业钢制家具服务，工厂直供价格。拥有25年以上经验，1000多位满意客户。服务高端商业区，如 Summarecon Bekasi、Harapan Indah、Grand Galaxy City、Lippo Cikarang、Jababeka，以及芝卡朗的工业区。",
    commercialDescs: {
      "Summarecon Bekasi": "购物中心及商业街",
      "Harapan Indah": "住宅及商业",
      "Grand Galaxy City": "超级街区餐饮区",
      "Galaxy Bekasi": "购物中心及娱乐",
      "Kemang Pratama": "高端住宅",
      "Lippo Cikarang": "购物中心及商业中心",
      "Jababeka": "工业区",
      "Deltamas": "综合开发",
      "EJIP Cikarang": "东雅加达工业园",
      "Greenland International": "商业及住宅",
      "MM2100": "工业城"
    }
  },
  ja: {
    title: "サービスエリア",
    subtitle: "ベカシ、ジャカルタ、ジャボデタベク全域を25年以上の経験でサービス提供",
    bekasiKota: "ベカシ・コタ",
    cikarang: "チカラン及び周辺地域",
    komersial: "商業・工業地域",
    jakarta: "ジャカルタ及びジャボデタベク",
    areaNotListed: "お住まいの地域がリストにありませんか？",
    areaNotListedDesc: "サービス範囲についてお気軽にお問い合わせください。ジャボデタベク全域及び周辺地域をサービス提供しています。",
    freeConsultation: "無料相談",
    seoText: "Naturra Extalは、ベカシ全域（ベカシ・バラット、ベカシ・ティムール、ベカシ・スラタン、ベカシ・ウタラ、チカラン、タンブン）、ジャカルタ（ジャカルタ・ティムール、ジャカルタ・プサット、ジャカルタ・スラタン）、ジャボデタベク（デポック、ボゴール、タンゲラン、カラワン）をサービス提供する信頼できるインダストリアル家具工房です。ベカシのSetuに工房を構え、カフェ、レストラン、ホテル、オフィス向けにカスタムインダストリアル鋼製家具を工場直販価格で提供しています。25年以上の経験、1000社以上の満足したクライアント。Summarecon Bekasi、Harapan Indah、Grand Galaxy City、Lippo Cikarang、Jababekaなどのプレミアム商業地域、およびチカランの工業地帯をサービス提供しています。",
    commercialDescs: {
      "Summarecon Bekasi": "モール＆ブールバードエリア",
      "Harapan Indah": "住宅＆商業",
      "Grand Galaxy City": "スーパーブロック F&B 地区",
      "Galaxy Bekasi": "モール＆エンターテインメント",
      "Kemang Pratama": "プレミアム住宅",
      "Lippo Cikarang": "モール＆商業ハブ",
      "Jababeka": "工業団地",
      "Deltamas": "複合用途開発",
      "EJIP Cikarang": "東ジャカルタ工業団地",
      "Greenland International": "商業＆住宅",
      "MM2100": "工業タウン"
    }
  },
  es: {
    title: "Nuestras Áreas de Servicio",
    subtitle: "Sirviendo Bekasi, Yakarta y todo Jabodetabek con más de 25 años de experiencia",
    bekasiKota: "BEKASI KOTA",
    cikarang: "CIKARANG Y ALREDEDORES",
    komersial: "ÁREAS COMERCIALES E INDUSTRIALES",
    jakarta: "YAKARTA Y JABODETABEK",
    areaNotListed: "¿Tu área no está en la lista?",
    areaNotListedDesc: "Contáctanos para discutir nuestra cobertura de servicio. Servimos a todo Jabodetabek y áreas circundantes.",
    freeConsultation: "Consulta Gratuita",
    seoText: "Naturra Extal es un taller de muebles industriales de confianza que sirve a todas las áreas de Bekasi (Bekasi Barat, Bekasi Timur, Bekasi Selatan, Bekasi Utara, Cikarang, Tambun), Yakarta (Jakarta Timur, Jakarta Pusat, Jakarta Selatan) y Jabodetabek (Depok, Bogor, Tangerang, Karawang). Con ubicación del taller en Setu, Bekasi, proporcionamos servicios de muebles de acero industrial personalizados para cafeterías, restaurantes, hoteles y oficinas a precios directos de fábrica. Más de 25 años de experiencia, más de 1000 clientes satisfechos. Servimos áreas comerciales premium como Summarecon Bekasi, Harapan Indah, Grand Galaxy City, Lippo Cikarang, Jababeka y áreas de polígonos industriales en Cikarang.",
    commercialDescs: {
      "Summarecon Bekasi": "Área de Centro Comercial y Boulevard",
      "Harapan Indah": "Residencial y Comercial",
      "Grand Galaxy City": "Distrito Superblock F&B",
      "Galaxy Bekasi": "Centro Comercial y Entretenimiento",
      "Kemang Pratama": "Residencial Premium",
      "Lippo Cikarang": "Centro Comercial y Hub Comercial",
      "Jababeka": "Polígono Industrial",
      "Deltamas": "Desarrollo de Uso Mixto",
      "EJIP Cikarang": "Parque Industrial Este de Yakarta",
      "Greenland International": "Comercial y Residencial",
      "MM2100": "Ciudad Industrial"
    }
  },
  fr: {
    title: "Nos Zones de Service",
    subtitle: "Service à Bekasi, Jakarta et tout Jabodetabek avec plus de 25 ans d'expérience",
    bekasiKota: "BEKASI KOTA",
    cikarang: "CIKARANG ET ENVIRONS",
    komersial: "ZONES COMMERCIALES ET INDUSTRIELLES",
    jakarta: "JAKARTA ET JABODETABEK",
    areaNotListed: "Votre zone n'est pas listée ?",
    areaNotListedDesc: "Contactez-nous pour discuter de notre couverture de service. Nous servons tout Jabodetabek et les zones environnantes.",
    freeConsultation: "Consultation Gratuite",
    seoText: "Naturra Extal est un atelier de mobilier industriel de confiance desservant toutes les zones de Bekasi (Bekasi Barat, Bekasi Timur, Bekasi Selatan, Bekasi Utara, Cikarang, Tambun), Jakarta (Jakarta Timur, Jakarta Pusat, Jakarta Selatan) et Jabodetabek (Depok, Bogor, Tangerang, Karawang). Avec l'atelier situé à Setu, Bekasi, nous fournissons des services de mobilier en acier industriel sur mesure pour cafés, restaurants, hôtels et bureaux aux prix directs d'usine. Plus de 25 ans d'expérience, plus de 1000 clients satisfaits. Nous servons des zones commerciales premium telles que Summarecon Bekasi, Harapan Indah, Grand Galaxy City, Lippo Cikarang, Jababeka et les zones de parcs industriels à Cikarang.",
    commercialDescs: {
      "Summarecon Bekasi": "Zone Centre Commercial et Boulevard",
      "Harapan Indah": "Résidentiel et Commercial",
      "Grand Galaxy City": "Quartier Superblock F&B",
      "Galaxy Bekasi": "Centre Commercial et Divertissement",
      "Kemang Pratama": "Résidentiel Premium",
      "Lippo Cikarang": "Centre Commercial et Hub",
      "Jababeka": "Zone Industrielle",
      "Deltamas": "Développement à Usage Mixte",
      "EJIP Cikarang": "Parc Industriel Est de Jakarta",
      "Greenland International": "Commercial et Résidentiel",
      "MM2100": "Ville Industrielle"
    }
  },
  ko: {
    title: "서비스 지역",
    subtitle: "25년 이상의 경험으로 베카시, 자카르타, 자보데타벡 전역 서비스",
    bekasiKota: "베카시 코타",
    cikarang: "치카랑 및 주변 지역",
    komersial: "상업 및 산업 지역",
    jakarta: "자카르타 및 자보데타벡",
    areaNotListed: "귀하의 지역이 목록에 없나요?",
    areaNotListedDesc: "서비스 범위에 대해 문의해 주세요. 자보데타벡 전역 및 주변 지역을 서비스하고 있습니다.",
    freeConsultation: "무료 상담",
    seoText: "Naturra Extal은 베카시 전역(베카시 바랏, 베카시 티무르, 베카시 슬라탄, 베카시 우타라, 치카랑, 담분), 자카르타(자카르타 티무르, 자카르타 푸사트, 자카르타 슬라탄), 자보데타벡(데폭, 보고르, 탕게랑, 카라왕)을 서비스하는 신뢰할 수 있는 산업용 가구 공방입니다. 베카시 Setu에 공방을 두고 카페, 레스토랑, 호텔, 사무실을 위한 맞춤형 산업용 강철 가구를 공장 직접 가격으로 제공합니다. 25년 이상의 경험, 1000개 이상의 만족한 고객. Summarecon Bekasi, Harapan Indah, Grand Galaxy City, Lippo Cikarang, Jababeka와 같은 프리미엄 상업 지역 및 치카랑의 산업 단지 지역을 서비스하고 있습니다.",
    commercialDescs: {
      "Summarecon Bekasi": "쇼핑몰 & 부르바드 지역",
      "Harapan Indah": "주거 및 상업",
      "Grand Galaxy City": "슈퍼블록 F&B 지구",
      "Galaxy Bekasi": "쇼핑몰 & 엔터테인먼트",
      "Kemang Pratama": "프리미엄 주거",
      "Lippo Cikarang": "쇼핑몰 & 상업 허브",
      "Jababeka": "산업 단지",
      "Deltamas": "복합 용도 개발",
      "EJIP Cikarang": "동자카르타 산업 단지",
      "Greenland International": "상업 및 주거",
      "MM2100": "산업 타운"
    }
  }
}

const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({ language, isIndonesian }) => {
  // Determine language from prop or fallback
  const lang: LanguageCode = language ?? (isIndonesian ? 'id' : 'en')
  const t = SERVICE_AREAS_TRANSLATIONS[lang] ?? SERVICE_AREAS_TRANSLATIONS.en
  const serviceAreas = {
    bekasiKota: {
      title: "BEKASI KOTA",
      areas: [
        { name: "Bekasi Barat", kelurahan: "Bintara, Kranji, Kota Baru, Jakasampurna" },
        { name: "Bekasi Timur", kelurahan: "Jatiasih, Pekayon, Margahayu, Aren Jaya" },
        { name: "Bekasi Selatan", kelurahan: "Kayuringin Jaya, Pekayon Jaya, Jakasetia" },
        { name: "Bekasi Utara", kelurahan: "Harapan Indah, Pejuang, Kaliabang, Medan Satria" },
        { name: "Rawalumbu", kelurahan: "Bojong Rawalumbu, Sepanjang Jaya, Pengasinan" },
        { name: "Pondok Gede", kelurahan: "Jatiwaringin, Jatibening, Jatiraden" },
        { name: "Mustika Jaya", kelurahan: "Mustikasari, Pedurenan, Cimuning" }
      ]
    },
    cikarang: {
      title: "CIKARANG & SEKITARNYA",
      areas: [
        { name: "Cikarang Barat", kelurahan: "Lippo Cikarang, Cibatu, Telaga Murni" },
        { name: "Cikarang Utara", kelurahan: "Karang Asih, Simpangan, Sukamaju" },
        { name: "Cikarang Selatan", kelurahan: "Jababeka, Greenland, Pasirsari" },
        { name: "Cikarang Timur", kelurahan: "Serang Baru, Karangreja, Jayamukti" },
        { name: "Cikarang Pusat", kelurahan: "Taman Galaxy, Lemahabang, Hegarmukti" },
        { name: "Tambun Selatan", kelurahan: "Sertajaya, Mangunjaya, Setiadarma" },
        { name: "Tambun Utara", kelurahan: "Satria Jaya, Karang Satria, Wanasari" },
        { name: "Cibitung", kelurahan: "Wanajaya, Mekarjaya, Lambang Jaya" },
        { name: "Setu", kelurahan: "Telajung (Workshop Location)" }
      ]
    },
    komersial: {
      title: "KAWASAN KOMERSIAL & INDUSTRIAL",
      areas: [
        { name: "Summarecon Bekasi", icon: "MB", desc: "Mall & Boulevard Area" },
        { name: "Harapan Indah", icon: "RC", desc: "Residential & Commercial" },
        { name: "Grand Galaxy City", icon: "GG", desc: "Superblock F&B District" },
        { name: "Galaxy Bekasi", icon: "ME", desc: "Mall & Entertainment" },
        { name: "Kemang Pratama", icon: "PR", desc: "Premium Residential" },
        { name: "Lippo Cikarang", icon: "LC", desc: "Mall & Commercial Hub" },
        { name: "Jababeka", icon: "IN", desc: "Industrial Estate" },
        { name: "Deltamas", icon: "MU", desc: "Mixed-Use Development" },
        { name: "EJIP Cikarang", icon: "EI", desc: "East Jakarta Industrial Park" },
        { name: "Greenland International", icon: "CR", desc: "Commercial & Residential" },
        { name: "MM2100", icon: "IT", desc: "Industrial Town" }
      ]
    },
    jakarta: {
      title: "JAKARTA & JABODETABEK",
      areas: [
        { name: "Jakarta Timur", kelurahan: "Cakung, Kramat Jati, Makasar, Cipayung" },
        { name: "Jakarta Pusat", kelurahan: "Sudirman, Thamrin, Kuningan (CBD)" },
        { name: "Jakarta Selatan", kelurahan: "Kemang, SCBD, Senopati, Kebayoran" },
        { name: "Depok", kelurahan: "Margonda, UI, Sawangan" },
        { name: "Bogor", kelurahan: "Bogor Kota, Cibinong, Sentul" },
        { name: "Karawang", kelurahan: "Karawang Barat, Karawang Timur" },
        { name: "Cileungsi", kelurahan: "Metland Transyogi" }
      ]
    }
  }

  return (
    <section className="service-areas-section">
      <div className="service-areas-container">
        <div className="service-areas-header">
          <h2 className="section-title">
            {t.title}
          </h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        {/* Bekasi Kota */}
        <div className="service-area-group">
          <h3 className="area-group-title">
            <span className="area-icon">*</span>
            {t.bekasiKota}
          </h3>
          <div className="areas-grid">
            {serviceAreas.bekasiKota.areas.map((area, index) => (
              <div key={index} className="area-card">
                <h4 className="area-name">{area.name}</h4>
                <p className="area-kelurahan">{area.kelurahan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cikarang & Sekitarnya */}
        <div className="service-area-group">
          <h3 className="area-group-title">
            <span className="area-icon">*</span>
            {t.cikarang}
          </h3>
          <div className="areas-grid">
            {serviceAreas.cikarang.areas.map((area, index) => (
              <div key={index} className="area-card">
                <h4 className="area-name">{area.name}</h4>
                <p className="area-kelurahan">{area.kelurahan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kawasan Komersial */}
        <div className="service-area-group commercial">
          <h3 className="area-group-title">
            <span className="area-icon">*</span>
            {t.komersial}
          </h3>
          <div className="commercial-grid">
            {serviceAreas.komersial.areas.map((area, index) => (
              <div key={index} className="commercial-card">
                <span className="commercial-icon">{area.icon}</span>
                <h4 className="commercial-name">{area.name}</h4>
                <p className="commercial-desc">{t.commercialDescs[area.name] ?? area.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Jakarta & Jabodetabek */}
        <div className="service-area-group">
          <h3 className="area-group-title">
            <span className="area-icon">*</span>
            {t.jakarta}
          </h3>
          <div className="areas-grid">
            {serviceAreas.jakarta.areas.map((area, index) => (
              <div key={index} className="area-card jakarta">
                <h4 className="area-name">{area.name}</h4>
                <p className="area-kelurahan">{area.kelurahan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="service-areas-cta">
          <div className="cta-content">
            <h3>
              {t.areaNotListed}
            </h3>
            <p>
              {t.areaNotListedDesc}
            </p>
            <a 
              href="https://wa.me/+6288801146881?text=Halo%20Naturra%20Living%2C%20saya%20tertarik%20dengan%20furniture%20industrial%20untuk%20area%20saya" 
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="whatsapp-icon">WA</span>
              {t.freeConsultation}
            </a>
          </div>
        </div>

        {/* SEO Rich Text */}
        <div className="service-areas-seo-text">
          <p>
            {t.seoText}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ServiceAreasSection

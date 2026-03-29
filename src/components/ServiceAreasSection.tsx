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
    title: "Wilayah Operasional & Logistik",
    subtitle: "Pusat pemrosesan di Bekasi, melayani pengiriman ke seluruh dunia melalui pelabuhan utama Indonesia",
    bekasiKota: "BEKASI KOTA",
    cikarang: "CIKARANG & SEKITARNYA",
    komersial: "KAWASAN INDUSTRI & LOGISTIK",
    jakarta: "JAKARTA & HUB EKSPOR",
    areaNotListed: "Butuh Informasi Pengiriman Global?",
    areaNotListedDesc: "Hubungi tim logistik kami untuk diskusi rute pengiriman internasional dan persyaratan dokumen ekspor.",
    freeConsultation: "Konsultasi Ekspor",
    seoText: "Naturra Extal mengoperasikan fasilitas industri pemrosesan komoditas pertanian di Setu, Bekasi. Kami melayani pengadaan bubuk kakao, cengkeh, dan cocopeat untuk pasar domestik dan internasional. Dengan lokasi strategis di koridor industri Bekasi-Cikarang, kami memiliki akses cepat ke pelabuhan Tanjung Priok untuk efisiensi ekspor ke Asia, Eropa, dan Amerika. Kami melayani mitra dagang di kawasan industri seperti MM2100, Jababeka, EJIP, dan Lippo Cikarang dengan standar kualitas internasional (HS Code certified).",
    commercialDescs: {
      "Summarecon Bekasi": "Regional Office Hub",
      "Harapan Indah": "Commercial Central",
      "Grand Galaxy City": "Business District",
      "Galaxy Bekasi": "Corporate Office",
      "Kemang Pratama": "Premium Area",
      "Lippo Cikarang": "Industrial & Export Hub",
      "Jababeka": "Industrial Estate",
      "Deltamas": "Integrated Industrial Port",
      "EJIP Cikarang": "East Jakarta Industrial Park",
      "Greenland International": "Logistic Center",
      "MM2100": "Industrial Town (Sourcing Hub)"
    }
  },
  en: {
    title: "Operational & Logistics Areas",
    subtitle: "Processing hub in Bekasi, serving worldwide shipments through Indonesia's main ports",
    bekasiKota: "BEKASI CITY",
    cikarang: "CIKARANG & SURROUNDINGS",
    komersial: "INDUSTRIAL & LOGISTICS ZONES",
    jakarta: "JAKARTA & EXPORT HUBS",
    areaNotListed: "Need Global Shipping Info?",
    areaNotListedDesc: "Contact our logistics team to discuss international shipping routes and export documentation requirements.",
    freeConsultation: "Export Consultation",
    seoText: "Naturra Extal operates an agricultural commodity processing industrial facility in Setu, Bekasi. We provide cocoa powder, cloves, and cocopeat for domestic and international markets. Strategically located in the Bekasi-Cikarang industrial corridor, we have rapid access to Tanjung Priok Port for efficient export to Asia, Europe, and America. We serve trading partners in industrial zones such as MM2100, Jababeka, EJIP, and Lippo Cikarang with international quality standards (HS Code certified).",
    commercialDescs: {
      "Summarecon Bekasi": "Regional Office Hub",
      "Harapan Indah": "Commercial Central",
      "Grand Galaxy City": "Business District",
      "Galaxy Bekasi": "Corporate Office",
      "Kemang Pratama": "Premium Area",
      "Lippo Cikarang": "Industrial & Export Hub",
      "Jababeka": "Industrial Estate",
      "Deltamas": "Integrated Industrial Port",
      "EJIP Cikarang": "East Jakarta Industrial Park",
      "Greenland International": "Logistic Center",
      "MM2100": "Industrial Town (Sourcing Hub)"
    }
  },
  ar: {
    title: "المناطق التشغيلية واللوجستية",
    subtitle: "مركز المعالجة في بيكاسي، يخدم الشحنات في جميع أنحاء العالم عبر الموانئ الرئيسية في إندونيسيا",
    bekasiKota: "مدينة بيكاسي",
    cikarang: "سيكارانغ والمناطق المحيطة",
    komersial: "المناطق الصناعية واللوجستية",
    jakarta: "جاكرتا ومراكز التصدير",
    areaNotListed: "هل تحتاج إلى معلومات الشحن العالمية؟",
    areaNotListedDesc: "اتصل بفريقنا اللوجستي لمناقشة طرق الشحن الدولية ومتطلبات وثائق التصدير.",
    freeConsultation: "استشارة التصدير",
    seoText: "تدير Naturra Extal منشأة صناعية لمعالجة السلع الزراعية في سيتو، بيكاسي. نحن نوفر مسحوق الكاكاو والقرنفل وcocopeat للأسواق المحلية والدولية. تقع في ممر بيكاسي-سيكارانغ الصناعي الاستراتيجي، ولدينا وصول سريع إلى ميناء تانجونج بريوك للتصدير الفعال إلى آسيا وأوروبا وأمريكا. نحن نخدم الشركاء التجاريين في المناطق الصناعية مثل MM2100 وJababeka وEJIP وLippo Cikarang بمعايير جودة دولية (معتمدة من HS Code).",
    commercialDescs: {
      "Summarecon Bekasi": "مركز المكتب الإقليمي",
      "Harapan Indah": "المركز التجاري",
      "Grand Galaxy City": "منطقة الأعمال",
      "Galaxy Bekasi": "مكتب الشركة",
      "Kemang Pratama": "منطقة متميزة",
      "Lippo Cikarang": "مركز الصناعة والتصدير",
      "Jababeka": "المنطقة الصناعية",
      "Deltamas": "ميناء صناعي متكامل",
      "EJIP Cikarang": "منطقة جاكرتا الشرقية الصناعية",
      "Greenland International": "المركز اللوجستي",
      "MM2100": "المدينة الصناعية (مركز التوريد)"
    }
  },
  zh: {
    title: "运营与物流区域",
    subtitle: "位于勿加泗的处理中心，通过印尼主要港口为全球发货提供服务",
    bekasiKota: "勿加泗市",
    cikarang: "芝卡朗及周边地区",
    komersial: "工业与物流区",
    jakarta: "雅加达与出口枢纽",
    areaNotListed: "需要全球货运信息？",
    areaNotListedDesc: "请联系我们的物流团队，讨论国际航运路线和出口文件要求。",
    freeConsultation: "出口咨询",
    seoText: "Naturra Extal 在勿加泗 Setu 经营一家农产品加工工业设施。我们为国内和国际市场提供可可粉、丁香和椰糠。策略性地位于勿加泗-芝卡朗工业走廊，我们可以快速到达丹绒不鲁港，高效地向亚洲、欧洲和美洲出口。我们为 MM2100、Jababeka、EJIP 和 Lippo Cikarang 等工业区的贸易伙伴提供符合国际质量标准（HS 编码认证）的服务。",
    commercialDescs: {
      "Summarecon Bekasi": "区域办公枢纽",
      "Harapan Indah": "商业中心",
      "Grand Galaxy City": "商业区",
      "Galaxy Bekasi": "公司办公室",
      "Kemang Pratama": "高端区域",
      "Lippo Cikarang": "工业与出口枢纽",
      "Jababeka": "工业区",
      "Deltamas": "综合工业港",
      "EJIP Cikarang": "东雅加达工业园",
      "Greenland International": "物流中心",
      "MM2100": "工业城（采购枢纽）"
    }
  },
  ja: {
    title: "運営・物流エリア",
    subtitle: "ベカシの処理拠点を中心に、インドネシアの主要港を通じて世界中への配送に対応",
    bekasiKota: "ベカシ市",
    cikarang: "チカラン及び周辺",
    komersial: "工業・物流ゾーン",
    jakarta: "ジャカルタ及び輸出拠点",
    areaNotListed: "グローバル配送情報が必要ですか？",
    areaNotListedDesc: "国際配送ルートや輸出書類の要件については、弊社の物流チームにお問い合わせください。",
    freeConsultation: "輸出相談",
    seoText: "Naturra Extalは、ベカシのSetuで農産物加工産業施設を運営しています。国内外の市場向けにココアパウダー、クローブ、ココピートを提供しています。ベカシ〜チカラン工業回廊に位置する戦略的な立地により、タンジュン・プリオク港への迅速なアクセスが可能で、アジア、ヨーロッパ、アメリカへの効率的な輸出を実現しています。MM2100、ジャバベカ、EJIP、リッポーチカランなどの工業地帯の貿易パートナーに、国際品質基準（HSコード認定）に準拠したサービスを提供しています。",
    commercialDescs: {
      "Summarecon Bekasi": "地域オフィスハブ",
      "Harapan Indah": "商業センター",
      "Grand Galaxy City": "ビジネス地区",
      "Galaxy Bekasi": "コーポレートオフィス",
      "Kemang Pratama": "プレミアムエリア",
      "Lippo Cikarang": "工業・輸出ハブ",
      "Jababeka": "工業団地",
      "Deltamas": "統合工業港",
      "EJIP Cikarang": "東ジャカルタ工業団地",
      "Greenland International": "物流センター",
      "MM2100": "工業タウン（ソーシングハブ）"
    }
  },
  es: {
    title: "Áreas Operativas y Logísticas",
    subtitle: "Centro de procesamiento en Bekasi, sirviendo envíos a todo el mundo a través de los principales puertos de Indonesia",
    bekasiKota: "CIUDAD DE BEKASI",
    cikarang: "CIKARANG Y ALREDEDORES",
    komersial: "ZONAS INDUSTRIALES Y LOGÍSTICAS",
    jakarta: "YAKARTA Y CENTROS DE EXPORTACIÓN",
    areaNotListed: "¿Necesita información de envío global?",
    areaNotListedDesc: "Contacte a nuestro equipo de logística para discutir rutas de envío internacional y requisitos de documentación de exportación.",
    freeConsultation: "Consulta de Exportación",
    seoText: "Naturra Extal opera una instalación industrial de procesamiento de productos agrícolas en Setu, Bekasi. Suministramos cacao en polvo, clavos y cocopeat para mercados nacionales e internacionales. Situados estratégicamente en el corredor industrial Bekasi-Cikarang, tenemos un acceso rápido al puerto de Tanjung Priok para una exportación eficiente a Asia, Europa y América. Servimos a socios comerciales en zonas industriales como MM2100, Jababeka, EJIP y Lippo Cikarang con estándares de calidad internacionales (certificación de código HS).",
    commercialDescs: {
      "Summarecon Bekasi": "Centro de Oficinas Regionales",
      "Harapan Indah": "Central Comercial",
      "Grand Galaxy City": "Distrito de Negocios",
      "Galaxy Bekasi": "Oficina Corporativa",
      "Kemang Pratama": "Área Premium",
      "Lippo Cikarang": "Centro Industrial y de Exportación",
      "Jababeka": "Polígono Industrial",
      "Deltamas": "Puerto Industrial Integrado",
      "EJIP Cikarang": "Parque Industrial Este de Yakarta",
      "Greenland International": "Centro Logístico",
      "MM2100": "Ciudad Industrial (Centro de Abastecimiento)"
    }
  },
  fr: {
    title: "Zones Opérationnelles et Logistiques",
    subtitle: "Plateforme de traitement à Bekasi, desservant le monde entier via les principaux ports indonésiens",
    bekasiKota: "VILLE DE BEKASI",
    cikarang: "CIKARANG ET ENVIRONS",
    komersial: "ZONES INDUSTRIELLES ET LOGISTIQUES",
    jakarta: "JAKARTA ET CENTRES D'EXPORTATION",
    areaNotListed: "Besoin d'infos sur le transport mondial ?",
    areaNotListedDesc: "Contactez notre équipe logistique pour discuter des routes maritimes internationales et des documents d'exportation.",
    freeConsultation: "Consultation Export",
    seoText: "Naturra Extal exploite une installation industrielle de traitement de produits agricoles à Setu, Bekasi. Nous fournissons de la poudre de cacao, des clous de girofle et du cocopeat pour les marchés nationaux et internationaux. Idéalement situés dans le corridor industriel Bekasi-Cikarang, nous disposons d'un accès rapide au port de Tanjung Priok pour une exportation efficace vers l'Asie, l'Europe et l'Amérique. Nous servons des partenaires commerciaux dans des zones industrielles telles que MM2100, Jababeka, EJIP et Lippo Cikarang selon les normes de qualité internationales (certifiés code HS).",
    commercialDescs: {
      "Summarecon Bekasi": "Centre de Bureaux Régionaux",
      "Harapan Indah": "Central Commercial",
      "Grand Galaxy City": "Quartier des Affaires",
      "Galaxy Bekasi": "Bureau d'Entreprise",
      "Kemang Pratama": "Zone Premium",
      "Lippo Cikarang": "Centre Industriel et Export",
      "Jababeka": "Zone Industrielle",
      "Deltamas": "Port Industriel Intégré",
      "EJIP Cikarang": "Parc Industriel Est de Jakarta",
      "Greenland International": "Centre Logistique",
      "MM2100": "Ville Industrielle (Centre de Sourcing)"
    }
  },
  ko: {
    title: "운영 및 물류 지역",
    subtitle: "베카시의 처리 허브를 중심으로 인도네시아 주요 항구를 통해 전 세계 배송 서비스 제공",
    bekasiKota: "베카시 시",
    cikarang: "치카랑 및 주변",
    komersial: "산업 및 물류 구역",
    jakarta: "자카르타 및 수출 허브",
    areaNotListed: "글로벌 배송 정보가 필요하십니까?",
    areaNotListedDesc: "국제 해외 배송 경로 및 수출 문서 요구 사항에 대해 물류 팀에 문의하십시오.",
    freeConsultation: "수출 상담",
    seoText: "Naturra Extal은 베카시 Setu에서 농산물 가공 산업 시설을 운영하고 있습니다. 국내 및 국제 시장을 위해 코코아 가루, 정향 및 코코피트를 공급합니다. 베카시-치카랑 산업 회랑에 전략적으로 위치하여 탄중 프리오크 항구에 신속하게 접근할 수 있어 아시아, 유럽 및 아메리카로의 효율적인 수출이 가능합니다. MM2100, Jababeka, EJIP 및 Lippo Cikarang과 같은 산업 단지의 무역 파트너에게 국제 품질 표준(HS 코드 인증)을 준수하는 서비스를 제공합니다.",
    commercialDescs: {
      "Summarecon Bekasi": "지역 사무소 허브",
      "Harapan Indah": "상업 중심지",
      "Grand Galaxy City": "비즈니스 지구",
      "Galaxy Bekasi": "기업 사무소",
      "Kemang Pratama": "프리미엄 지역",
      "Lippo Cikarang": "산업 및 수출 허브",
      "Jababeka": "산업 단지",
      "Deltamas": "통합 산업 항구",
      "EJIP Cikarang": "동자카르타 산업 단지",
      "Greenland International": "물류 센터",
      "MM2100": "산업 타운 (소싱 허브)"
    }
  }
}

const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({ language, isIndonesian }) => {
  const lang: LanguageCode = language ?? (isIndonesian ? 'id' : 'en')
  const t = SERVICE_AREAS_TRANSLATIONS[lang] ?? SERVICE_AREAS_TRANSLATIONS.en

  const serviceAreas = {
    bekasiKota: {
      title: t.bekasiKota,
      areas: [
        { name: "Bekasi Barat", kelurahan: "Logistics Access to Jakarta" },
        { name: "Bekasi Timur", kelurahan: "Sourcing & Distribution" },
        { name: "Bekasi Selatan", kelurahan: "Corporate & Admin" },
        { name: "Bekasi Utara", kelurahan: "Industrial Connectivity" },
        { name: "Rawalumbu", kelurahan: "Warehouse & Storage" },
        { name: "Pondok Gede", kelurahan: "Regional Access" },
        { name: "Mustika Jaya", kelurahan: "Operational Hub" }
      ]
    },
    cikarang: {
      title: t.cikarang,
      areas: [
        { name: "Cikarang Barat", kelurahan: "Export Industrial Park" },
        { name: "Cikarang Utara", kelurahan: "Logistics Hub" },
        { name: "Cikarang Selatan", kelurahan: "Major Industrial Zone" },
        { name: "Cikarang Timur", kelurahan: "Production Expansion" },
        { name: "Cikarang Pusat", kelurahan: "Administration" },
        { name: "Tambun Selatan", kelurahan: "Distribution Network" },
        { name: "Tambun Utara", kelurahan: "Raw Material Handling" },
        { name: "Cibitung", kelurahan: "Strategic Warehouse" },
        { name: "Setu", kelurahan: "Main Processing Facility" }
      ]
    },
    komersial: {
      title: t.komersial,
      areas: [
        { name: "Summarecon Bekasi", icon: "RO", desc: "Regional Office" },
        { name: "Harapan Indah", icon: "CC", desc: "Commercial Central" },
        { name: "Grand Galaxy City", icon: "BD", desc: "Business District" },
        { name: "Galaxy Bekasi", icon: "CO", desc: "Corporate Office" },
        { name: "Kemang Pratama", icon: "PA", desc: "Premium Area" },
        { name: "Lippo Cikarang", icon: "XH", desc: "Export Hub" },
        { name: "Jababeka", icon: "IE", desc: "Industrial Estate" },
        { name: "Deltamas", icon: "IP", desc: "Industrial Port" },
        { name: "EJIP Cikarang", icon: "EP", desc: "Export Park" },
        { name: "Greenland International", icon: "LC", desc: "Logistic Center" },
        { name: "MM2100", icon: "SH", desc: "Sourcing Hub" }
      ]
    },
    jakarta: {
      title: t.jakarta,
      areas: [
        { name: "Jakarta Timur", kelurahan: "Logistics & Forwarding" },
        { name: "Tanjung Priok", kelurahan: "Major Export Port" },
        { name: "Jakarta Pusat", kelurahan: "Trade & Commerce" },
        { name: "Jakarta Selatan", kelurahan: "Financial Center" },
        { name: "Surabaya", kelurahan: "Secondary Export Gateway" },
        { name: "Sulawesi", kelurahan: "Primary Sourcing Region" },
        { name: "Sumatra", kelurahan: "Secondary Sourcing Region" }
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

        {/* Categories Grid */}
        <div className="service-area-group">
          <h3 className="area-group-title">
            <span className="area-icon">🌏</span>
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

        <div className="service-area-group">
          <h3 className="area-group-title">
            <span className="area-icon">🏗️</span>
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

        <div className="service-area-group commercial">
          <h3 className="area-group-title">
            <span className="area-icon">🏢</span>
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

        <div className="service-area-group">
          <h3 className="area-group-title">
            <span className="area-icon">🚢</span>
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

        <div className="service-areas-cta">
          <div className="cta-content">
            <h3>{t.areaNotListed}</h3>
            <p>{t.areaNotListedDesc}</p>
            <a
              href="https://wa.me/628951395752?text=Halo%20Naturra%20Extal%2C%20saya%20ingin%20konsultasi%20ekspor%20komoditas"
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="whatsapp-icon">WA</span>
              {t.freeConsultation}
            </a>
          </div>
        </div>

        <div className="service-areas-seo-text">
          <p>{t.seoText}</p>
        </div>
      </div>
    </section>
  )
}

export default ServiceAreasSection

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './NaturraPartnership.css'

const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

interface PartnershipContent {
  pageTitle: string
  metaDescription: string
  metaKeywords: string
  heroTitle: string
  mainTitle: string
  mainParagraphs: string[]
  experienceTitle: string
  experienceParagraphs: string[]
  collaborationTitle: string
  collaborationSubtitle: string
  collaborationParagraphs: string[]
  flexibilityTitle: string
  flexibilityParagraphs: string[]
  scaleTitle: string
  scaleDescription: string
  scaleQuestion: string
  ctaTitle: string
  ctaDescription: string
  ctaButton: string
}

const TRANSLATIONS: Record<LanguageCode, PartnershipContent> = {
  en: {
    pageTitle: "Global Partnership - Naturra Extal",
    metaDescription: "Learn how to partner with Naturra Extal for bulk agricultural commodity sourcing. B2B partnerships for cocoa, cloves and cocopeat.",
    metaKeywords: "commodity partnership, cocoa supplier, clove partnership, cocopeat b2b",
    heroTitle: "Global B2B Partnership",
    mainTitle: "A Reliable Sourcing Partner",
    mainParagraphs: [
      "Whether you are a food manufacturer, international wholesaler, or distributor, you need a trusted partner in origin. Naturra Extal ensures your supply chain remains uninterrupted and high-quality.",
      "We understand international trade involves strict compliance, precise specifications, and timely deliveries. We accommodate these needs seamlessly."
    ],
    experienceTitle: "Export Expertise",
    experienceParagraphs: [
      "Our team manages exports across continents. We handle documentation, quality control, and logistics to land products at your destination port.",
      "From sample evaluation to bulk container loading, we maintain complete transparency throughout."
    ],
    collaborationTitle: "Direct from the Source",
    collaborationSubtitle: "B2B Commodity Supplier",
    collaborationParagraphs: [
      "By partnering with us, you cut out unnecessary middlemen and work directly with a company rooted in Indonesia's finest farming regions.",
      "Our team is ready to discuss your volume requirements, target specifications, and preferred incoterms (FOB, CIF).",
      "You'll receive accurate quotes, genuine product specs, and consistent quality on every order."
    ],
    flexibilityTitle: "Flexible Contracts",
    flexibilityParagraphs: [
      "We offer flexible MOQs depending on the product, from partial container shipments to regular monthly contracts.",
      "Choose the packaging method that best fits your warehouse and production lines."
    ],
    scaleTitle: "Commitment to Your Scale",
    scaleDescription: "As your volume requirements grow, our farmer networks and processing capabilities will rise to meet your demand.",
    scaleQuestion: "Ready to secure your supply chain?",
    ctaTitle: "Discuss Your Next Contract",
    ctaDescription: "Tell us about your commodity needs. Send us your specifications to start a long-term partnership.",
    ctaButton: "Contact Our Trade Team"
  },
  id: {
    pageTitle: "Kemitraan Global - Naturra Extal",
    metaDescription: "Pelajari cara bermitra dengan Naturra Extal untuk pengadaan komoditas pertanian grosir.",
    metaKeywords: "kemitraan komoditas, pemasok kakao, kemitraan cengkeh",
    heroTitle: "Kemitraan Global B2B",
    mainTitle: "Mitra Pengadaan yang Handal",
    mainParagraphs: [
      "Baik Anda pabrikan makanan, pedagang grosir, atau distributor — Naturra Extal hadir untuk memastikan rantai pasok Anda konsisten dan berkualitas tinggi.",
      "Kami memahami perdagangan internasional: kepatuhan ketat, spesifikasi tepat, dan pengiriman tepat waktu."
    ],
    experienceTitle: "Keahlian Ekspor",
    experienceParagraphs: [
      "Tim kami berpengalaman mengelola ekspor lintas benua. Kami menguasai dokumentasi, kontrol kualitas, dan logistik.",
      "Dari evaluasi sampel hingga pemuatan kontainer penuh, kami menjaga transparansi total."
    ],
    collaborationTitle: "Langsung dari Sumbernya",
    collaborationSubtitle: "Pemasok Komoditas B2B",
    collaborationParagraphs: [
      "Bermitra dengan kami berarti Anda memotong perantara dan bekerja langsung dengan perusahaan yang berakar di wilayah pertanian terbaik Indonesia.",
      "Tim kami siap mendiskusikan kebutuhan volume, spesifikasi target, dan incoterm pilihan Anda (FOB, CIF).",
      "Anda akan mendapatkan penawaran akurat, spesifikasi produk nyata, dan kualitas konsisten di setiap pesanan."
    ],
    flexibilityTitle: "Kontrak Fleksibel",
    flexibilityParagraphs: [
      "Kami menawarkan MOQ fleksibel tergantung produk, dari pengiriman sebagian kontainer hingga kontrak bulanan reguler.",
      "Pilih metode pengemasan yang paling sesuai dengan gudang dan lini produksi Anda."
    ],
    scaleTitle: "Berkomitmen untuk Skala Bisnis Anda",
    scaleDescription: "Seiring bertumbuhnya kebutuhan volume Anda, jaringan petani dan kapasitas pemrosesan kami akan meningkat untuk memenuhi permintaan.",
    scaleQuestion: "Siap mengamankan rantai pasok Anda?",
    ctaTitle: "Diskusikan Kontrak Anda",
    ctaDescription: "Ceritakan kebutuhan komoditas Anda. Kirimkan spesifikasi untuk memulai kemitraan jangka panjang.",
    ctaButton: "Hubungi Tim Perdagangan Kami"
  },
  ar: {
    pageTitle: "الشراكة العالمية - Naturra Extal",
    metaDescription: "تعرف على كيفية الشراكة مع Naturra Extal لتوريد السلع الزراعية بالجملة.",
    metaKeywords: "شراكة سلع، مورد كاكاو، شراكة قرنفل",
    heroTitle: "شراكة B2B العالمية",
    mainTitle: "شريك توريد موثوق",
    mainParagraphs: [
      "سواء كنت مصنعاً غذائياً أو تاجر جملة دولياً أو موزعاً — Naturra Extal هنا لضمان استمرارية سلسلة التوريد الخاصة بك.",
      "نحن نفهم التجارة الدولية: الامتثال الصارم والمواصفات الدقيقة والتسليم في الوقت المحدد."
    ],
    experienceTitle: "الخبرة في التصدير",
    experienceParagraphs: [
      "فريقنا ذو خبرة في إدارة الصادرات عبر القارات، مع معالجة الوثائق والجودة والخدمات اللوجستية.",
      "من تقييم العينات إلى تحميل الحاويات الكاملة، نحافظ على الشفافية التامة."
    ],
    collaborationTitle: "مباشرة من المصدر",
    collaborationSubtitle: "مورد سلع B2B",
    collaborationParagraphs: [
      "من خلال الشراكة معنا، تتخطى الوسطاء غير الضروريين وتعمل مباشرة مع شركة متجذرة في أفضل مناطق الزراعة الإندونيسية.",
      "فريقنا مستعد لمناقشة متطلبات الحجم والمواصفات المستهدفة وشروط الشحن المفضلة (FOB، CIF).",
      "ستحصل على عروض أسعار دقيقة ومواصفات منتجات حقيقية وجودة متسقة في كل طلب."
    ],
    flexibilityTitle: "عقود مرنة",
    flexibilityParagraphs: [
      "نقدم حدوداً دنيا للطلب مرنة، من شحنات جزئية إلى عقود شهرية منتظمة.",
      "اختر طريقة التعبئة الأنسب لمستودعاتك وخطوط إنتاجك."
    ],
    scaleTitle: "التزام بحجم أعمالك",
    scaleDescription: "مع نمو احتياجاتك من الحجم، ستنمو شبكات مزارعينا وقدراتنا لتلبية طلبك.",
    scaleQuestion: "مستعد لتأمين سلسلة التوريد الخاصة بك؟",
    ctaTitle: "ناقش عقدك القادم",
    ctaDescription: "أخبرنا باحتياجاتك من السلع. أرسل لنا مواصفاتك لبدء شراكة طويلة الأمد.",
    ctaButton: "اتصل بفريق التجارة لدينا"
  },
  zh: {
    pageTitle: "全球合作伙伴关系 - Naturra Extal",
    metaDescription: "了解如何与Naturra Extal合作进行大宗农业商品采购。B2B合作伙伴关系。",
    metaKeywords: "大宗商品合作, 可可供应商, 丁香合作伙伴",
    heroTitle: "全球B2B合作",
    mainTitle: "可靠的采购伙伴",
    mainParagraphs: [
      "无论您是食品制造商、国际批发商还是分销商，Naturra Extal确保您的供应链稳定且高质量。",
      "我们了解国际贸易：严格合规、精确规格和及时交货。"
    ],
    experienceTitle: "出口专业知识",
    experienceParagraphs: [
      "我们的团队拥有跨大洲出口管理经验，处理文件、质量控制和物流。",
      "从样品评估到整柜装载，我们全程保持完全透明。"
    ],
    collaborationTitle: "直接来自产地",
    collaborationSubtitle: "B2B大宗商品供应商",
    collaborationParagraphs: [
      "与我们合作，您可以消除不必要的中间商，直接与植根于印度尼西亚优质农业地区的公司合作。",
      "我们的团队随时准备讨论您的数量需求、目标规格和首选贸易条款（FOB、CIF）。",
      "您将在每次订单中获得准确报价、真实产品规格和一致质量。"
    ],
    flexibilityTitle: "灵活合同",
    flexibilityParagraphs: [
      "我们根据产品提供灵活的最低起订量，从部分集装箱货物到定期月度合同。",
      "选择最适合您仓库和生产线的包装方式。"
    ],
    scaleTitle: "与您的规模同行",
    scaleDescription: "随着您的数量需求增长，我们的农民网络和加工能力将随之提升以满足您的需求。",
    scaleQuestion: "准备好保障您的供应链了吗？",
    ctaTitle: "讨论您的下一份合同",
    ctaDescription: "告诉我们您的商品需求。向我们发送您的规格以开始长期合作关系。",
    ctaButton: "联系我们的贸易团队"
  },
  ja: {
    pageTitle: "グローバルパートナーシップ - Naturra Extal",
    metaDescription: "農産物の大量調達についてNaturra Extalと提携する方法をご確認ください。",
    metaKeywords: "商品提携, カカオサプライヤー, クローブパートナーシップ",
    heroTitle: "グローバルB2B提携",
    mainTitle: "信頼できる調達パートナー",
    mainParagraphs: [
      "食品メーカー、国際卸売業者、または流通業者など、Naturra Extalがサプライチェーンの安定と品質を保証します。",
      "国際取引における厳格なコンプライアンス、正確な仕様、迅速な納品に対応します。"
    ],
    experienceTitle: "輸出の専門知識",
    experienceParagraphs: [
      "大陸をまたいだ輸出管理の豊富な経験を持ち、書類、品質管理、物流を一括して対応します。",
      "サンプル評価からフルコンテナ積載まで、完全な透明性を維持します。"
    ],
    collaborationTitle: "産地直送",
    collaborationSubtitle: "B2Bコモディティサプライヤー",
    collaborationParagraphs: [
      "私たちとの提携により、不要な仲介業者を排除し、インドネシアの優良農業地域に根差した企業と直接取引できます。",
      "量の要件、目標仕様、希望するインコタームス（FOB、CIF）についてご相談いただけます。",
      "正確な見積もり、本物の製品仕様、一貫した品質をすべての注文でお届けします。"
    ],
    flexibilityTitle: "柔軟な契約",
    flexibilityParagraphs: [
      "製品に応じた柔軟な最低注文数量を提供し、部分コンテナ輸送から定期的な月次契約まで対応します。",
      "倉庫や生産ラインに最適な包装方法をお選びいただけます。"
    ],
    scaleTitle: "御社の規模に応じたコミットメント",
    scaleDescription: "数量要件が増加するにつれ、農家ネットワークと加工能力がご要望に応えます。",
    scaleQuestion: "サプライチェーンを確保する準備はできていますか？",
    ctaTitle: "次の契約について相談する",
    ctaDescription: "コモディティのニーズをお知らせください。仕様をご送付いただき、長期提携を開始しましょう。",
    ctaButton: "貿易チームに連絡する"
  },
  es: {
    pageTitle: "Asociación Global - Naturra Extal",
    metaDescription: "Conozca cómo asociarse con Naturra Extal para el abastecimiento masivo de materias primas agrícolas.",
    metaKeywords: "asociación de materias primas, proveedor de cacao, asociación de clavo",
    heroTitle: "Asociación Global B2B",
    mainTitle: "Un Socio de Abastecimiento Confiable",
    mainParagraphs: [
      "Ya sea fabricante de alimentos, mayorista internacional o distribuidor, Naturra Extal garantiza que su cadena de suministro sea ininterrumpida y de alta calidad.",
      "Entendemos el comercio internacional: cumplimiento estricto, especificaciones precisas y entregas puntuales."
    ],
    experienceTitle: "Experiencia en Exportación",
    experienceParagraphs: [
      "Nuestro equipo gestiona exportaciones en múltiples continentes, con documentación, control de calidad y logística.",
      "Desde la evaluación de muestras hasta la carga completa de contenedores, mantenemos total transparencia."
    ],
    collaborationTitle: "Directo del Origen",
    collaborationSubtitle: "Proveedor de Materias Primas B2B",
    collaborationParagraphs: [
      "Al asociarse con nosotros, elimina intermediarios innecesarios y trabaja directamente con una empresa arraigada en las mejores regiones agrícolas de Indonesia.",
      "Estamos listos para discutir sus requisitos de volumen, especificaciones objetivo e incoterms preferidos (FOB, CIF).",
      "Recibirá cotizaciones precisas, especificaciones reales del producto y calidad consistente en cada pedido."
    ],
    flexibilityTitle: "Contratos Flexibles",
    flexibilityParagraphs: [
      "Ofrecemos MOQ flexibles según el producto, desde envíos parciales hasta contratos mensuales regulares.",
      "Elija el método de empaque que mejor se adapte a su almacén y líneas de producción."
    ],
    scaleTitle: "Compromiso con su Escala",
    scaleDescription: "A medida que sus necesidades de volumen crecen, nuestras redes de agricultores y capacidades de procesamiento crecerán para satisfacer su demanda.",
    scaleQuestion: "¿Listo para asegurar su cadena de suministro?",
    ctaTitle: "Discuta su Próximo Contrato",
    ctaDescription: "Cuéntenos sobre sus necesidades de materias primas. Envíenos sus especificaciones para iniciar una asociación a largo plazo.",
    ctaButton: "Contactar a Nuestro Equipo Comercial"
  },
  fr: {
    pageTitle: "Partenariat Mondial - Naturra Extal",
    metaDescription: "Découvrez comment vous associer avec Naturra Extal pour l'approvisionnement en vrac de matières premières agricoles.",
    metaKeywords: "partenariat matières premières, fournisseur cacao, partenariat girofle",
    heroTitle: "Partenariat B2B Mondial",
    mainTitle: "Un Partenaire d'Approvisionnement Fiable",
    mainParagraphs: [
      "Que vous soyez fabricant alimentaire, grossiste international ou distributeur, Naturra Extal garantit la continuité et la qualité de votre chaîne d'approvisionnement.",
      "Nous comprenons le commerce international : conformité stricte, spécifications précises et livraisons ponctuelles."
    ],
    experienceTitle: "Expertise à l'Export",
    experienceParagraphs: [
      "Notre équipe gère des exportations sur plusieurs continents, avec une maîtrise de la documentation, du contrôle qualité et de la logistique.",
      "De l'évaluation des échantillons au chargement complet des conteneurs, nous maintenons une totale transparence."
    ],
    collaborationTitle: "Directement de la Source",
    collaborationSubtitle: "Fournisseur de Matières Premières B2B",
    collaborationParagraphs: [
      "En vous associant avec nous, vous éliminez les intermédiaires inutiles et travaillez directement avec une entreprise ancrée dans les meilleures régions agricoles d'Indonésie.",
      "Notre équipe est prête à discuter de vos besoins en volume, spécifications cibles et incoterms préférés (FOB, CIF).",
      "Vous recevrez des devis précis, de vraies spécifications produit et une qualité constante pour chaque commande."
    ],
    flexibilityTitle: "Contrats Flexibles",
    flexibilityParagraphs: [
      "Nous proposons des MOQ flexibles selon le produit, des envois partiels aux contrats mensuels réguliers.",
      "Choisissez la méthode d'emballage la mieux adaptée à votre entrepôt et vos lignes de production."
    ],
    scaleTitle: "Engagement selon votre Échelle",
    scaleDescription: "À mesure que vos besoins en volume augmentent, nos réseaux d'agriculteurs et capacités de traitement évolueront pour répondre à votre demande.",
    scaleQuestion: "Prêt à sécuriser votre chaîne d'approvisionnement ?",
    ctaTitle: "Discutez de votre Prochain Contrat",
    ctaDescription: "Partagez vos besoins en matières premières. Envoyez-nous vos spécifications pour commencer un partenariat à long terme.",
    ctaButton: "Contacter notre Équipe Commerciale"
  },
  ko: {
    pageTitle: "글로벌 파트너십 - Naturra Extal",
    metaDescription: "농산물 대량 조달을 위해 Naturra Extal과 파트너십을 맺는 방법을 알아보세요.",
    metaKeywords: "상품 파트너십, 코코아 공급업체, 정향 파트너십",
    heroTitle: "글로벌 B2B 파트너십",
    mainTitle: "신뢰할 수 있는 조달 파트너",
    mainParagraphs: [
      "식품 제조업체, 국제 도매업체, 또는 유통업체 등 누구든 — Naturra Extal이 공급망의 안정성과 품질을 보장합니다.",
      "국제 무역의 엄격한 규정, 정확한 사양, 적시 납품까지 완벽히 대응합니다."
    ],
    experienceTitle: "수출 전문성",
    experienceParagraphs: [
      "우리 팀은 여러 대륙에 걸친 수출 관리 경험을 보유하며 서류, 품질관리, 물류를 처리합니다.",
      "샘플 평가부터 전체 컨테이너 적재까지 완전한 투명성을 유지합니다."
    ],
    collaborationTitle: "직거래 산지",
    collaborationSubtitle: "B2B 원자재 공급업체",
    collaborationParagraphs: [
      "당사와 파트너십을 구축하면 불필요한 중간상을 없애고 인도네시아 최고 농업 지역에 뿌리를 둔 회사와 직거래할 수 있습니다.",
      "수량 요구사항, 목표 사양, 선호 인코텀즈(FOB, CIF)에 대해 논의할 준비가 되어 있습니다.",
      "모든 주문에서 정확한 견적, 실제 제품 사양, 일관된 품질을 받게 됩니다."
    ],
    flexibilityTitle: "유연한 계약",
    flexibilityParagraphs: [
      "제품에 따라 유연한 최소주문수량을 제공하며, 부분 컨테이너 선적부터 정기 월별 계약까지 가능합니다.",
      "귀사의 창고와 생산 라인에 가장 적합한 포장 방법을 선택하세요."
    ],
    scaleTitle: "귀사 규모에 맞는 헌신",
    scaleDescription: "수량 요구사항이 증가함에 따라 당사의 농민 네트워크와 가공 능력도 귀사의 수요를 충족하도록 성장합니다.",
    scaleQuestion: "공급망을 확보할 준비가 되셨나요?",
    ctaTitle: "다음 계약을 논의하세요",
    ctaDescription: "상품 필요사항을 알려주세요. 장기적인 파트너십을 시작하기 위해 사양서를 보내주세요.",
    ctaButton: "무역팀에 연락하기"
  }
}

const NaturraPartnership: React.FC = () => {
  const location = useLocation()
  const [language, setLanguage] = useState<LanguageCode>(() =>
    getCurrentLanguage(location.pathname, location.search)
  )

  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) setLanguage(currentLang)
  }, [location.pathname, location.search, language])

  useEffect(() => {
    const stored = getStoredLanguage()
    const urlLang = getCurrentLanguage(location.pathname, location.search)
    if (stored || urlLang !== 'en') return
    detectLanguageFromIP().then(ipLang => {
      if (ipLang && !getStoredLanguage()) setLanguage(ipLang)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const t = TRANSLATIONS[language] ?? TRANSLATIONS.en
  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  const handleWhatsAppClick = () => trackWhatsAppClick('Partnership Page CTA')

  return (
    <div className="partnership-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content={t.metaKeywords} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`partnership-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        {OG_LOCALES.filter(altLocale => altLocale !== localeMeta.locale).map((altLocale) => (
          <meta key={`partnership-og-${altLocale}`} property="og:locale:alternate" content={altLocale} />
        ))}
      </Helmet>

      <NaturraHeader />

      {/* Hero */}
      <section className="partnership-hero">
        <div className="partnership-hero-image">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920"
            alt={t.heroTitle}
            title={t.heroTitle}
            loading="eager"
            fetchPriority="high"
          />
          <div className="partnership-hero-overlay" />
        </div>
        <div className="partnership-hero-content">
          <h1 className="partnership-hero-title">{t.heroTitle}</h1>
        </div>
      </section>

      {/* Main Section */}
      <section className="partnership-main-section">
        <div className="partnership-main-container">
          <div className="partnership-main-content">
            <div className="partnership-main-text">
              <h2 className="partnership-section-title">{t.mainTitle}</h2>
              <div className="partnership-main-body">
                {t.mainParagraphs.map((paragraph, index) => (
                  <p key={index} className="partnership-paragraph">{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1499558913904-206263eb210b?auto=format&fit=crop&q=80&w=800"
                alt="Agricultural processing and sorting"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="partnership-experience-section">
        <div className="partnership-experience-container">
          <div className="partnership-experience-layout">
            <div className="partnership-experience-content">
              <h2 className="partnership-section-title">{t.experienceTitle}</h2>
              {t.experienceParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-paragraph">{paragraph}</p>
              ))}
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1582218155981-0675ea108dca?auto=format&fit=crop&q=80&w=800"
                alt="Global export shipping containers"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="partnership-collaboration-section">
        <div className="partnership-collaboration-container">
          <div className="partnership-collaboration-layout">
            <div className="partnership-collaboration-content">
              <span className="partnership-section-subtitle">{t.collaborationSubtitle}</span>
              <h2 className="partnership-section-title">{t.collaborationTitle}</h2>
              {t.collaborationParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-paragraph">{paragraph}</p>
              ))}
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?auto=format&fit=crop&q=80&w=800"
                alt="Commodities stored in warehouse"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flexibility Section */}
      <section className="partnership-flexibility-section">
        <div className="partnership-flexibility-container">
          <div className="partnership-flexibility-layout">
            <div className="partnership-flexibility-content">
              <h2 className="partnership-section-title">{t.flexibilityTitle}</h2>
              {t.flexibilityParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-paragraph">{paragraph}</p>
              ))}
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1599307767316-606b5379cebc?auto=format&fit=crop&q=80&w=800"
                alt="Flexible agricultural supply chain"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scale Section */}
      <section className="partnership-scale-section">
        <div className="partnership-scale-container">
          <div className="partnership-scale-layout">
            <div className="partnership-scale-content">
              <h2 className="partnership-section-title">{t.scaleTitle}</h2>
              <p className="partnership-paragraph">{t.scaleDescription}</p>
              <h3 className="partnership-section-subtitle" style={{ fontSize: '1.2rem', marginTop: '20px' }}>
                {t.scaleQuestion}
              </h3>
            </div>
            <div className="partnership-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&q=80&w=800"
                alt="Scaling global supply chain"
                className="partnership-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="partnership-cta-section">
        <div className="partnership-cta-container">
          <h2 className="partnership-cta-title">{t.ctaTitle}</h2>
          <p className="partnership-cta-description">{t.ctaDescription}</p>
          <a
            href="https://wa.me/6289513957752?text=Hello%20Naturra%20Extal,%20I%20would%20like%20to%20discuss%20a%20B2B%20partnership%20for%20commodity%20sourcing."
            target="_blank"
            rel="noopener noreferrer"
            className="partnership-whatsapp-btn"
            onClick={handleWhatsAppClick}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.ctaButton}
          </a>
        </div>
      </section>

      <NaturraFooter />
    </div>
  )
}

export default NaturraPartnership

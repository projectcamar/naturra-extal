import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import Footer from '../components/Footer'
import { getPostsByPage, getTotalPages, getAllBlogPosts } from '../data/blog'
import { generateLanguageSpecificMeta, generateLocalizedUrls, truncateTitle, truncateMetaDescription } from '../utils/seo'
import { getCurrentLanguage, getLinkWithLanguage, type LanguageCode } from '../utils/languageManager'
import './Blog.css'

const heroImage = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920"

const BLOG_INTRO_TRANSLATIONS: Record<
  LanguageCode,
  {
    mainTitle: string
    introParagraph: string
    bullets: {
      title: string
      description: string
    }[]
  }
> = {
  id: {
    mainTitle: '135+ Artikel seputar Perdagangan Komoditas Internasional',
    introParagraph:
      'Dapatkan wawasan mendalam tentang dunia pertanian Indonesia. Artikel kami ditulis berdasarkan pengalaman puluhan tahun dalam perdagangan global, pengadaan, dan kontrol kualitas.',
    bullets: [
      {
        title: 'Panduan Perdagangan & Pengadaan',
        description: 'Saran ahli tentang pengadaan kakao, cengkeh, dan cocopeat premium langsung dari petani Indonesia.'
      },
      {
        title: 'Kualitas & Spesifikasi',
        description: 'Data teknis terperinci tentang Kode HS, grade produk, dan standar ekspor internasional.'
      },
      {
        title: 'Wawasan Ekspor Global',
        description: 'Pembaruan tentang tren pasar, logistik, dan kepatuhan untuk pembeli internasional.'
      },
      {
        title: 'Keberlanjutan & Dampak',
        description: 'Bagaimana kami memastikan perdagangan adil dan praktik berkelanjutan di seluruh kepulauan Indonesia.'
      }
    ]
  },
  en: {
    mainTitle: '135+ Articles on International Commodity Trading',
    introParagraph:
      'Gain deep insights into the world of Indonesian agriculture. Our articles are based on decades of experience in global trade, sourcing, and quality control.',
    bullets: [
      {
        title: 'Trade & Sourcing Guides',
        description: 'Expert advice on sourcing premium cocoa, cloves, and cocopeat directly from Indonesian farmers.'
      },
      {
        title: 'Quality & Specifications',
        description: 'Detailed technical data on HS Codes, product grades, and international export standards.'
      },
      {
        title: 'Global Export Insights',
        description: 'Updates on market trends, logistics, and compliance for international buyers.'
      },
      {
        title: 'Sustainability & Impact',
        description: 'How we ensure fair trade and sustainable practices across the Indonesian archipelago.'
      }
    ]
  },
  ar: {
    mainTitle: 'أكثر من 135 مقالاً حول تجارة السلع الدولية',
    introParagraph:
      'احصل على رؤى عميقة حول عالم الزراعة الإندونيسية. تعتمد مقالاتنا على عقود من الخبرة في التجارة العالمية والمصادر ومراقبة الجودة.',
    bullets: [
      {
        title: 'أدلة التجارة والمصادر',
        description: 'نصائح الخبراء حول الحصول على الكاكاو والقرنفل والكوكوبيت المتميز مباشرة من المزارعين الإندونيسيين.'
      },
      {
        title: 'الجودة والمواصفات',
        description: 'بيانات فنية مفصلة حول رموز النظام المنسق ودرجات المنتجات ومعايير التصدير الدولية.'
      },
      {
        title: 'رؤى التصدير العالمية',
        description: 'تحديثات حول اتجاهات السوق والخدمات اللوجستية والامتثال للمشترين الدوليين.'
      },
      {
        title: 'الاستدامة والأثر',
        description: 'كيف نضمن التجارة العادلة والممارسات المستدامة في جميع أنحاء الأرخبيل الإندونيسي.'
      }
    ]
  },
  zh: {
    mainTitle: '135+ 篇国际大宗商品交易文章',
    introParagraph:
      '深入了解印尼农业世界。我们的文章基于数十年在全球贸易、采购和质量控制方面的经验。',
    bullets: [
      {
        title: '贸易与采购指南',
        description: '有关直接从印尼农民手中采购优质可可、丁香和椰糠的专家建议。'
      },
      {
        title: '质量与规格',
        description: '有关海关编码、产品等级和国际出口标准的详细技术数据。'
      },
      {
        title: '全球出口洞察',
        description: '面向国际买家的市场趋势、物流和合规性更新。'
      },
      {
        title: '可持续性与影响',
        description: '我们如何确保印尼群岛各地的公平贸易和可持续做法。'
      }
    ]
  },
  ja: {
    mainTitle: '135本以上の国際商品取引に関する記事',
    introParagraph:
      'インドネシア農業の世界についての深い洞察を提供します。当社の記事は、世界貿易、ソーシング、品質管理における数十年の経験に基づいています。',
    bullets: [
      {
        title: '取引・調達ガイド',
        description: 'インドネシアの農家から直接、プレミアムなカカオ、クローブ、ココピートを調達するための専門的なアドバイス。'
      },
      {
        title: '品質と仕様',
        description: 'HSコード、製品グレード、および国際輸出基準に関する詳細な技術データ。'
      },
      {
        title: 'グローバル輸出の洞察',
        description: '国際的なバイヤーのための市場動向、物流、およびコンプライアンスに関するアップデート。'
      },
      {
        title: '持続可能性と影響',
        description: 'インドネシア諸島全体で公平な取引と持続可能な慣行をどのように確保しているか。'
      }
    ]
  },
  es: {
    mainTitle: 'Más de 135 artículos sobre comercio internacional de materias primas',
    introParagraph:
      'Obtenga información detallada sobre el mundo de la agricultura indonesia. Nuestros artículos se basan en décadas de experiencia en el comercio mundial, el abastecimiento y el control de calidad.',
    bullets: [
      {
        title: 'Guías de comercio y abastecimiento',
        description: 'Consejos de expertos sobre el abastecimiento de cacao, clavo y fibra de coco de primera calidad directamente de los agricultores indonesios.'
      },
      {
        title: 'Calidad y especificaciones',
        description: 'Datos técnicos detallados sobre códigos del SA, grados de productos y normas internacionales de exportación.'
      },
      {
        title: 'Información sobre exportaciones mundiales',
        description: 'Actualizaciones sobre tendencias del mercado, logística y cumplimiento para compradores internacionales.'
      },
      {
        title: 'Sostenibilidad e impacto',
        description: 'Cómo garantizamos el comercio justo y las prácticas sostenibles en todo el archipiélago indonesio.'
      }
    ]
  },
  fr: {
    mainTitle: 'Plus de 135 articles sur le commerce international des matières premières',
    introParagraph:
      'Découvrez en profondeur le monde de l\'agriculture indonésienne. Nos articles s\'appuient sur des décennies d\'expérience dans le commerce mondial, l\'approvisionnement et le contrôle qualité.',
    bullets: [
      {
        title: 'Guides de commerce et d\'approvisionnement',
        description: 'Conseils d\'experts sur l\'approvisionnement en cacao, clous de girofle et fibre de coco de qualité supérieure directement auprès des agriculteurs indonésiens.'
      },
      {
        title: 'Qualité et spécifications',
        description: 'Données techniques détaillées sur les codes SH, les qualités des produits et les normes d\'exportation internationales.'
      },
      {
        title: 'Aperçus sur l\'exportation mondiale',
        description: 'Mises à jour sur les tendances du marché, la logistique et la conformité pour les acheteurs internationaux.'
      },
      {
        title: 'Durabilité et impact',
        description: 'Comment nous garantissons un commerce équitable et des pratiques durables à travers l\'archipel indonésien.'
      }
    ]
  },
  ko: {
    mainTitle: '135개 이상의 국제 상품 거래 관련 기사',
    introParagraph:
      '인도네시아 농업의 세계에 대한 깊은 통찰력을 얻으십시오. 당사의 기사는 수십 년간의 글로벌 무역, 소싱 및 품질 관리 경험을 바탕으로 합니다.',
    bullets: [
      {
        title: '무역 및 소싱 가이드',
        description: '인도네시아 농가에서 직접 프리미엄 코코아, 정향 및 코코피트를 조딩하기 위한 전문가 조언.'
      },
      {
        title: '품질 및 사양',
        description: 'HS 코드, 제품 등급 및 국제 수출 표준에 대한 상세한 기술 데이터.'
      },
      {
        title: '글로벌 수출 인사이트',
        description: '해외 구매자를 위한 시장 트렌드, 물류 및 규정 준수에 대한 업데이트.'
      },
      {
        title: '지속 가능성 및 영향',
        description: '인도네시아 전역에서 공정 무역과 지속 가능한 관행을 보장하는 방법.'
      }
    ]
  }
}

const BLOG_PAGINATION_TRANSLATIONS: Record<
  LanguageCode,
  {
    prev: string
    next: string
    numberLocale: string
    archiveTitle: string
  }
> = {
  id: { prev: 'Sebelumnya', next: 'Selanjutnya', numberLocale: 'id-ID', archiveTitle: 'Arsip Blog Lengkap (Semua Artikel)' },
  en: { prev: 'Prev', next: 'Next', numberLocale: 'en-US', archiveTitle: 'Complete Blog Archive (All Articles)' },
  ar: { prev: 'السابق', next: 'التالي', numberLocale: 'ar-EG', archiveTitle: 'أرشيف المدونة الكامل (جميع المقالات)' },
  zh: { prev: '上一页', next: '下一页', numberLocale: 'zh-CN', archiveTitle: '完整博客存档（所有文章）' },
  ja: { prev: '前へ', next: '次へ', numberLocale: 'ja-JP', archiveTitle: '完全なブログアーカイブ（すべての記事）' },
  es: { prev: 'Anterior', next: 'Siguiente', numberLocale: 'es-ES', archiveTitle: 'Archivo Completo del Blog (Todos los Artículos)' },
  fr: { prev: 'Précédent', next: 'Suivant', numberLocale: 'fr-FR', archiveTitle: 'Archive Complète du Blog (Tous les Articles)' },
  ko: { prev: '이전', next: '다음', numberLocale: 'ko-KR', archiveTitle: '전체 블로그 아카이브 (모든 기사)' }
}

const Blog: React.FC = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const [language, setLanguage] = useState<LanguageCode>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })

  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false)

  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  const isIndonesian = language === 'id'
  const postsPerPage = 8
  const rawPage = Number.parseInt(searchParams.get('page') || '1', 10)
  const totalPages = getTotalPages(postsPerPage)
  const currentPage = Number.isNaN(rawPage) ? 1 : Math.min(Math.max(rawPage, 1), totalPages || 1)
  const posts = getPostsByPage(currentPage, postsPerPage)
  const allBlogPosts = getAllBlogPosts()

  const buildPageUrl = (page: number) => (page <= 1 ? '/blog' : `/blog?page=${page}`)
  const prevUrl = currentPage > 1 ? buildPageUrl(currentPage - 1) : null
  const nextUrl = currentPage < totalPages ? buildPageUrl(currentPage + 1) : null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const localeMeta = generateLanguageSpecificMeta(isIndonesian)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)
  const intro = BLOG_INTRO_TRANSLATIONS[language] ?? BLOG_INTRO_TRANSLATIONS.en
  const paginationTexts = BLOG_PAGINATION_TRANSLATIONS[language] ?? BLOG_PAGINATION_TRANSLATIONS.en
  const formatPageNumber = (value: number) =>
    new Intl.NumberFormat(paginationTexts.numberLocale).format(value)

  return (
    <div className="blog-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{truncateTitle('Naturra Extal Blog: International Commodity Trading Insights')}</title>
        <meta name="description" content={truncateMetaDescription('Expert insights on Indonesian agricultural commodities: Cocoa, Cloves, and Cocopeat. Learn about global trade trends, quality standards, and sustainable sourcing directly from Indonesian farmers.')} />
        <meta name="keywords" content="commodity trading blog, cocoa powder export, indonesian cloves trading, cocopeat global supply, agricultural commodities indonesia, international spice trade, sustainable cocoa sourcing, Naturra Extal insights" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`blog-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        {prevUrl && <link rel="prev" href={localizedUrls.canonical + `?page=${currentPage - 1}`} />}
        {nextUrl && <link rel="next" href={localizedUrls.canonical + `?page=${currentPage + 1}`} />}

        {/* AI Search Optimization: Clear article purpose */}
        <meta property="og:title" content="Naturra Extal Blog - International Commodity Trading Insights" />
        <meta property="og:description" content="Comprehensive articles on Indonesian agricultural commodities: Cocoa, Cloves, and Cocopeat. Expert insights on quality control and global trade." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
      </Helmet>

      <NaturraHeader isIndonesian={isIndonesian} language={language} />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-image">
          <img
            src={heroImage}
            alt="International Commodity Trading Blog - Naturra Extal"
            title="Naturra Extal Blog: Insights on Indonesian Agricultural Commodities"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="blog-hero"
            data-category="blog"
          />
          <div className="blog-hero-overlay"></div>
        </div>
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Blog & Article</h1>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="blog-intro">
        <div className="blog-intro-container">
          <div className="blog-intro-grid">
            <div className="blog-intro-text">
              <h2 className="blog-intro-title">{intro.mainTitle}</h2>
              <p className="blog-intro-paragraph">{intro.introParagraph}</p>
            </div>
            <div className="blog-intro-bullets">
              {intro.bullets.map((bullet, idx) => (
                <div key={idx} className="blog-intro-bullet-item">
                  <div className="blog-intro-bullet-dot"></div>
                  <div className="blog-intro-bullet-content">
                    <h4 className="blog-intro-bullet-title">{bullet.title}</h4>
                    <p className="blog-intro-bullet-desc">{bullet.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="blog-feed">
        <div className="blog-container">
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card" itemScope itemType="https://schema.org/BlogPosting">
                <Link to={getLinkWithLanguage(`/blog/${post.slug}`, language)} className="blog-card-image-link">
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} loading="lazy" itemProp="image" />
                    <div className="blog-card-category">{post.category}</div>
                  </div>
                </Link>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time dateTime={post.date} itemProp="datePublished">{post.date}</time>
                    <span className="blog-card-author" itemProp="author">{post.author}</span>
                  </div>
                  <h3 className="blog-card-title" itemProp="headline">
                    <Link to={getLinkWithLanguage(`/blog/${post.slug}`, language)}>{post.title}</Link>
                  </h3>
                  <p className="blog-card-excerpt" itemProp="description">{post.excerpt}</p>
                  <Link to={getLinkWithLanguage(`/blog/${post.slug}`, language)} className="blog-card-more">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="blog-pagination">
              {prevUrl ? (
                <Link to={prevUrl} className="blog-pagination-btn">
                  {paginationTexts.prev}
                </Link>
              ) : (
                <span className="blog-pagination-btn disabled">{paginationTexts.prev}</span>
              )}

              <div className="blog-pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <Link
                    key={num}
                    to={buildPageUrl(num)}
                    className={`blog-pagination-num ${currentPage === num ? 'active' : ''}`}
                  >
                    {formatPageNumber(num)}
                  </Link>
                ))}
              </div>

              {nextUrl ? (
                <Link to={nextUrl} className="blog-pagination-btn">
                  {paginationTexts.next}
                </Link>
              ) : (
                <span className="blog-pagination-btn disabled">{paginationTexts.next}</span>
              )}
            </div>
          )}

          {/* Archive Toggle */}
          <div className="blog-archive-section">
            <button
              className="blog-archive-toggle"
              onClick={() => setIsArchiveExpanded(!isArchiveExpanded)}
              aria-expanded={isArchiveExpanded}
            >
              <h3 className="blog-archive-title">{paginationTexts.archiveTitle}</h3>
              {isArchiveExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {isArchiveExpanded && (
              <div className="blog-archive-grid">
                {allBlogPosts.map((post) => (
                  <Link
                    key={`archive-${post.id}`}
                    to={getLinkWithLanguage(`/blog/${post.slug}`, language)}
                    className="blog-archive-item"
                  >
                    <span className="blog-archive-date">{post.date}</span>
                    <span className="blog-archive-link-title">{post.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer isIndonesian={isIndonesian} />
    </div>
  )
}

export default Blog

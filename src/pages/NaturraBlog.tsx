import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import heroImage from '../assets/main-hero-image.webp'
import { getPostsByPage, getTotalPages, getAllBlogPosts } from '../data/blog'
import { generateLanguageSpecificMeta, generateLocalizedUrls, truncateTitle, truncateMetaDescription } from '../utils/seo'
import { getCurrentLanguage, getLinkWithLanguage, type LanguageCode } from '../utils/languageManager'
import './NaturraBlog.css'

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
    mainTitle: '100+ Artikel Komoditas Global: Panduan Ekspor dari Naturra Extal',
    introParagraph:
      'Temukan wawasan mendalam tentang perdagangan komoditas pertanian Indonesia. Artikel kami disusun berdasarkan pengalaman dalam mengekspor cocoa, cengkeh, dan cocopeat berkualitas premium ke pasar global.',
    bullets: [
      {
        title: 'Tips & Panduan Sourcing',
        description:
          'Cara memilih, memverifikasi, dan memastikan kualitas komoditas pertanian premium dari Indonesia'
      },
      {
        title: 'Wawasan Pasar & Kualitas',
        description:
          'Informasi objektif tentang spesifikasi cocoa (HS 1805/1806), standar cengkeh, dan aplikasi cocopeat'
      },
      {
        title: 'Panduan Ekspor & Logistik',
        description:
          'Pemahaman regulasi ekspor, pengiriman global, dan kemitraan dengan petani lokal'
      },
      {
        title: 'Pembaruan Industri Tren',
        description:
          'Tren komoditas 2025, praktik keberlanjutan, dan dinamika rantai pasokan global'
      }
    ]
  },
  en: {
    mainTitle: '100+ Global Commodity Articles: Export Guide from Naturra Extal',
    introParagraph:
      'Discover in-depth insights into Indonesian agricultural commodity trading. Our articles are based on experience exporting premium cocoa, cloves, and cocopeat to global markets.',
    bullets: [
      {
        title: 'Sourcing Tips & Guides',
        description:
          'How to select, verify, and ensure the quality of premium agricultural commodities from Indonesia'
      },
      {
        title: 'Market & Quality Insights',
        description:
          'Objective information on cocoa specifications (HS 1805/1806), clove standards, and cocopeat applications'
      },
      {
        title: 'Export & Logistics Guides',
        description:
          'Understanding export regulations, global shipping, and partnerships with local farmers'
      },
      {
        title: 'Industry & Trend Updates',
        description:
          '2025 commodity trends, sustainability practices, and global supply chain dynamics'
      }
    ]
  },
  ar: {
    mainTitle: 'أكثر من 100 مقال عن السلع العالمية: دليل التصدير من Naturra Extal',
    introParagraph:
      'اكتشف رؤى متعمقة حول تجارة السلع الزراعية الإندونيسية. مقالاتنا مبنية على خبرتنا في تصدير الكاكاو والقرنفل وجوز الهند (cocopeat) الفاخر إلى الأسواق العالمية.',
    bullets: [
      {
        title: 'نصائح وأدلة التوريد',
        description:
          'كيفية اختيار والتحقق وضمان جودة السلع الزراعية الفاخرة من إندونيسيا'
      },
      {
        title: 'رؤى السوق والجودة',
        description:
          'معلومات موضوعية حول مواصفات الكاكاو، ومعايير القرنفل، وتطبيقات جوز الهند (cocopeat)'
      },
      {
        title: 'أدلة التصدير والخدمات اللوجستية',
        description:
          'فهم لوائح التصدير، الشحن العالمي، والشراكات مع المزارعين المحليين'
      },
      {
        title: 'تحديثات الصناعة والاتجاهات',
        description:
          'اتجاهات السلع لعام 2025، ممارسات الاستدامة، وديناميكيات سلسلة التوريد العالمية'
      }
    ]
  },
  zh: {
    mainTitle: '100+ 全球商品文章：Naturra Extal 出口指南',
    introParagraph:
      '深入了解印尼农产品贸易。我们的文章基于向全球市场出口优质可可、丁香和椰糠的丰富经验。',
    bullets: [
      {
        title: '采购提示与指南',
        description:
          '如何选择、验证并确保印尼优质农产品的质量'
      },
      {
        title: '市场与质量洞察',
        description:
          '关于可可规格（HS 1805/1806）、丁香标准和椰糠应用的客观信息'
      },
      {
        title: '出口与物流指南',
        description:
          '了解出口法规、全球货运以及与当地农民的合作关系'
      },
      {
        title: '行业与趋势更新',
        description:
          '2025年商品趋势、可持续发展实践以及全球供应链动态'
      }
    ]
  },
  ja: {
    mainTitle: '100以上のグローバル商品記事：Naturra Extalからの輸出ガイド',
    introParagraph:
      'インドネシアの農産物取引についての深い考察を発見してください。私たちの記事は、高品質なココア、クローブ、ココピートを世界市場へ輸出してきた経験に基づいています。',
    bullets: [
      {
        title: '調達のヒントとガイド',
        description:
          'インドネシア産の高品質な農産物を選び、検証し、品質を確保する方法'
      },
      {
        title: '市場と品質の洞察',
        description:
          'ココアの仕様（HS 1805/1806）、クローブの基準、ココピートの用途に関する客観的な情報'
      },
      {
        title: '輸出と物流のガイド',
        description:
          '輸出規制、グローバルシッピング、地元農家とのパートナーシップの理解'
      },
      {
        title: '業界とトレンドの最新情報',
        description:
          '2025年の商品トレンド、持続可能性の取り組み、グローバルサプライチェーンの動向'
      }
    ]
  },
  es: {
    mainTitle: '135+ Artículos sobre Muebles Industriales: Guía Completa desde nuestro Taller en Bekasi',
    introParagraph:
      'Encuentra respuestas claras y prácticas a tus dudas sobre muebles industriales. Cada artículo está basado en proyectos reales: más de 1.000 trabajos realizados desde 1999 en el área de Yakarta (Jabodetabek).',
    bullets: [
      {
        title: 'Consejos y Guías Prácticas',
        description:
          'Cómo elegir, mantener y sacar el máximo provecho a los muebles industriales en tu negocio'
      },
      {
        title: 'Comparación de Materiales y Precios',
        description:
          'Datos objetivos sobre acero vs madera, muebles a medida vs estándar, powder coating vs pintura convencional'
      },
      {
        title: 'Guías por Zonas',
        description:
          'Cobertura detallada para Bekasi, Cikarang y Yakarta con apoyo de taller cercano'
      },
      {
        title: 'Inspiración de Diseño',
        description:
          'Tendencias 2025, combinaciones de materiales y optimización de distribución para cafés y restaurantes'
      }
    ]
  },
  fr: {
    mainTitle: '135+ Articles sur le mobilier industriel : guide complet depuis notre atelier de Bekasi',
    introParagraph:
      'Trouvez des réponses précises et concrètes à toutes vos questions sur le mobilier industriel. Chaque article s’appuie sur des projets réels : plus de 1 000 réalisations depuis 1999 dans la région de Jakarta (Jabodetabek).',
    bullets: [
      {
        title: 'Conseils & Guides Pratiques',
        description:
          'Comment choisir, entretenir et optimiser le mobilier industriel pour votre café, restaurant, bureau ou hôtel'
      },
      {
        title: 'Comparatifs Matériaux & Prix',
        description:
          'Analyse objective acier vs bois, sur‑mesure vs prêt‑à‑l’emploi, powder coating vs peinture classique'
      },
      {
        title: 'Guides Locaux',
        description:
          'Couverture détaillée de Bekasi, Cikarang et Jakarta avec indication de l’atelier le plus proche'
      },
      {
        title: 'Inspiration Design',
        description:
          'Tendances 2025, associations de matériaux et optimisation des plans pour cafés et restaurants'
      }
    ]
  },
  ko: {
    mainTitle: '135편 이상의 산업용 가구 블로그: 베카시 공방에서 전하는 완전 가이드',
    introParagraph:
      '산업용 가구에 대한 궁금증을 실제 현장 경험을 바탕으로 정리했습니다. 1999년 이후 자보데타벡 전역에서 1,000개 이상의 프로젝트를 수행한 노하우를 글로 담았습니다.',
    bullets: [
      {
        title: '실전 팁 & 가이드',
        description:
          '카페·레스토랑·오피스·호텔에 맞는 산업용 가구 선택, 관리, 활용 방법'
      },
      {
        title: '자재 & 가격 비교',
        description:
          '철제 vs 원목, 맞춤 제작 vs 기성품, 파우더 코팅 vs 일반 도장에 대한 객관적인 비교'
      },
      {
        title: '로컬 서비스 지역 안내',
        description:
          '베카시, 치카랑, 자카르타 등 서비스 가능 지역과 인근 공방 정보'
      },
      {
        title: '디자인 인스피레이션',
        description:
          '2025년 트렌드, 소재 조합, 카페·레스토랑 공간 레이아웃 최적화 아이디어'
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
  }
> = {
  id: { prev: 'Sebelumnya', next: 'Selanjutnya', numberLocale: 'id-ID' },
  en: { prev: 'Prev', next: 'Next', numberLocale: 'en-US' },
  ar: { prev: 'السابق', next: 'التالي', numberLocale: 'ar-EG' },
  zh: { prev: '上一页', next: '下一页', numberLocale: 'zh-CN' },
  ja: { prev: '前へ', next: '次へ', numberLocale: 'ja-JP' },
  es: { prev: 'Anterior', next: 'Siguiente', numberLocale: 'es-ES' },
  fr: { prev: 'Précédent', next: 'Suivant', numberLocale: 'fr-FR' },
  ko: { prev: '이전', next: '다음', numberLocale: 'ko-KR' }
}

const NaturraBlog: React.FC = () => {
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
        <title>{truncateTitle('Global Commodity Export Blog & Market Insights - Naturra Extal')}</title>
        <meta name="description" content={truncateMetaDescription('Comprehensive guide to Indonesian agricultural commodities for global buyers. Insights on sourcing premium cocoa, cloves, and cocopeat, market trends, quality standards, and export logistics from Naturra Extal.')} />
        <meta name="keywords" content="blog commodity trading, indonesian cocoa export, sourcing premium cloves, cocopeat supplier guide, naturra extal blog, cocoa powder hs 1805 1806, agricultural commodity market trends 2025, global spice trade, sustainable farming indonesia, commodity sourcing tips" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`blog-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        {prevUrl && <link rel="prev" href={`https://naturraextal.com${prevUrl}`} />}
        {nextUrl && <link rel="next" href={`https://naturraextal.com${nextUrl}`} />}

        {/* AI Search Optimization: Clear article purpose */}
        <meta property="og:title" content="Global Commodity Blog - 100+ Articles on Export & Sourcing" />
        <meta property="og:description" content="Comprehensive articles on agricultural commodities: sourcing tips, quality specifications (cocoa, cloves, cocopeat), export logistics, and best practices from Naturra Extal's global market experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
      </Helmet>

      <NaturraHeader />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-image">
          <img
            src={heroImage}
            alt="Global Commodity Export Blog & Market Insights - Naturra Extal"
            title="Global Commodity Blog - Complete Guides from Naturra Extal"
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

      {/* Blog Content Section */}
      <section className="blog-content-section">
        <div className="blog-container">
          {/* AI Search Optimized: Clear intent and value proposition */}
          <h2 className="blog-main-title">{intro.mainTitle}</h2>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto 3rem',
            padding: '1.5rem',
            background: '#e8f0e8',
            borderRadius: '8px',
            borderLeft: '4px solid #004D2C'
          }}>
            <p style={{ margin: '0 0 1rem', fontSize: '1rem', lineHeight: '1.6', color: '#004D2C' }}>
              {intro.introParagraph}
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.7', color: '#555' }}>
              {intro.bullets.map((item, index) => (
                <li key={index}>
                  <strong style={{ color: '#004D2C' }}>{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-image">
                    <img
                      src={post.image}
                      alt={`${post.title} - ${post.category} Commodity Blog Naturra Extal`}
                      title={`${post.title} - ${post.category} Commodity Article`}
                      loading="lazy"
                      width="400"
                      height="250"
                      itemProp="image"
                      data-image-type="blog-post"
                      data-post-slug={post.slug}
                      data-category={post.category}
                    />
                    <div className="blog-card-badge">Naturra Extal</div>
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-card-category">{post.category.toUpperCase()}</span>
                    <h3 className="blog-card-title">{post.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination - Compact Version */}
          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Blog pagination">
              {currentPage > 1 && (
                <Link
                  to={buildPageUrl(currentPage - 1)}
                  className="pagination-btn pagination-prev"
                  aria-label="Previous page"
                >
                  {paginationTexts.prev}
                </Link>
              )}

              {/* Smart Pagination with Ellipsis */}
              {(() => {
                const pages: (number | string)[] = []
                const showEllipsis = totalPages > 7

                if (!showEllipsis) {
                  // Show all pages if 7 or less
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  // Always show first page
                  pages.push(1)

                  if (currentPage <= 3) {
                    // Near the beginning
                    pages.push(2, 3, 4, 5, '...', totalPages)
                  } else if (currentPage >= totalPages - 2) {
                    // Near the end
                    pages.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
                  } else {
                    // In the middle
                    pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
                  }
                }

                return pages.map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="pagination-ellipsis" aria-hidden="true">
                        ...
                      </span>
                    )
                  }

                  const pageNumber = page as number
                  return (
                    <Link
                      key={pageNumber}
                      to={buildPageUrl(pageNumber)}
                      className={`pagination-btn pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                      aria-current={currentPage === pageNumber ? 'page' : undefined}
                    >
                      {formatPageNumber(pageNumber)}
                    </Link>
                  )
                })
              })()}

              {currentPage < totalPages && (
                <Link
                  to={buildPageUrl(currentPage + 1)}
                  className="pagination-btn pagination-next"
                  aria-label="Next page"
                >
                  {paginationTexts.next}
                </Link>
              )}
            </nav>
          )}

          {/* Complete Blog Archive - Collapsible for SEO */}
          <div className="blog-archive-section" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #e0e0e0' }}>
            <button
              className="blog-archive-toggle"
              onClick={() => setIsArchiveExpanded(!isArchiveExpanded)}
              aria-expanded={isArchiveExpanded}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '1rem 0',
                cursor: 'pointer',
                color: '#2C3E50',
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              <span>
                {language === 'id' ? "Arsip Blog Lengkap (Semua Artikel)" :
                  language === 'ar' ? "أرشيف المدونة الكامل (جميع المقالات)" :
                    language === 'zh' ? "完整博客存档（所有文章）" :
                      language === 'ja' ? "完全なブログアーカイブ（全記事）" :
                        language === 'es' ? "Archivo Completo del Blog (Todos los Artículos)" :
                          language === 'fr' ? "Archives Complètes du Blog (Tous les Articles)" :
                            language === 'ko' ? "완전한 블로그 아카이브 (모든 기사)" :
                              "Complete Blog Archive (All Articles)"}
              </span>
              {isArchiveExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            <nav
              className={`blog-archive-links ${isArchiveExpanded ? 'expanded' : 'collapsed'}`}
              aria-label="All blog posts"
              aria-hidden={!isArchiveExpanded}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '10px 20px',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease, opacity 0.3s ease',
                maxHeight: isArchiveExpanded ? '800px' : '0',
                opacity: isArchiveExpanded ? 1 : 0,
                paddingTop: isArchiveExpanded ? '1rem' : '0',
                paddingBottom: isArchiveExpanded ? '1rem' : '0'
              }}
            >
              {allBlogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={getLinkWithLanguage(`/blog/${post.slug}`, language)}
                  style={{
                    color: '#555',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'color 0.3s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                >
                  {post.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>


      <NaturraFooter />
    </div>
  )
}

export default NaturraBlog


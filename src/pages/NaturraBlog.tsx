import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
const heroImage = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920";
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
    mainTitle: '100+ Artículos sobre Materias Primas Globales: Guía de Exportación de Naturra Extal',
    introParagraph:
      'Descubre perspectivas profundas sobre el comercio de materias primas agrícolas de Indonesia. Nuestros artículos se basan en la experiencia exportando cacao, clavo y cocopeat premium a mercados globales.',
    bullets: [
      {
        title: 'Consejos y Guías de Abastecimiento',
        description:
          'Cómo seleccionar, verificar y garantizar la calidad de las materias primas agrícolas premium de Indonesia'
      },
      {
        title: 'Perspectivas de Mercado y Calidad',
        description:
          'Información objetiva sobre especificaciones del cacao (HS 1805/1806), estándares del clavo y aplicaciones del cocopeat'
      },
      {
        title: 'Guías de Exportación y Logística',
        description:
          'Comprensión de regulaciones de exportación, envíos globales y alianzas con agricultores locales'
      },
      {
        title: 'Actualizaciones de la Industria y Tendencias',
        description:
          'Tendencias de materias primas 2025, prácticas de sostenibilidad y dinámicas de la cadena de suministro global'
      }
    ]
  },
  fr: {
    mainTitle: '100+ Articles sur les Matières Premières Mondiales : Guide d\'Export de Naturra Extal',
    introParagraph:
      'Découvrez des analyses approfondies sur le commerce des matières premières agricoles indonésiennes. Nos articles s\'appuient sur notre expérience dans l\'exportation de cacao, clous de girofle et cocopeat premium vers les marchés mondiaux.',
    bullets: [
      {
        title: 'Conseils & Guides d\'Approvisionnement',
        description:
          'Comment sélectionner, vérifier et garantir la qualité des matières premières agricoles premium d\'Indonésie'
      },
      {
        title: 'Analyse Marché & Qualité',
        description:
          'Informations objectives sur les spécifications du cacao (HS 1805/1806), les standards du girofle et les applications du cocopeat'
      },
      {
        title: 'Guides Export & Logistique',
        description:
          'Compréhension des réglementations export, de l\'expédition mondiale et des partenariats avec les agriculteurs locaux'
      },
      {
        title: 'Actualités Industrie & Tendances',
        description:
          'Tendances matières premières 2025, pratiques de durabilité et dynamiques des chaînes d\'approvisionnement mondiales'
      }
    ]
  },
  ko: {
    mainTitle: '100편 이상의 글로벌 원자재 블로그: Naturra Extal의 수출 가이드',
    introParagraph:
      '인도네시아 농산물 원자재 거래에 대한 심층적인 인사이트를 발견하세요. 당사의 아티클은 코코아, 정향, 코코피트 프리미엄 제품을 글로벌 시장에 수출한 경험을 바탕으로 작성되었습니다.',
    bullets: [
      {
        title: '조달 팁 & 가이드',
        description:
          '인도네시아의 프리미엄 농산물의 선택, 검증 및 품질 보장 방법'
      },
      {
        title: '시장 & 품질 인사이트',
        description:
          '코코아 사양(HS 1805/1806), 정향 기준 및 코코피트 응용에 대한 객관적 정보'
      },
      {
        title: '수출 & 물류 가이드',
        description:
          '수출 규정 이해, 글로벌 운송, 현지 농부와의 파트너십'
      },
      {
        title: '업계 & 트렌드 업데이트',
        description:
          '2025년 원자재 트렌드, 지속 가능성 실천, 글로벌 공급망 역학'
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

  const localeMeta = generateLanguageSpecificMeta(language)
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
      <section className="naturra-blog-hero">
        <div className="naturra-blog-hero-image">
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
          <div className="naturra-blog-hero-overlay"></div>
        </div>
        <div className="naturra-blog-hero-content">
          <h1 className="naturra-blog-hero-title">Blog & Article</h1>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="naturra-blog-content-section">
        <div className="blog-container">
          {/* AI Search Optimized: Clear intent and value proposition */}
          <h2 className="naturra-blog-main-title">{intro.mainTitle}</h2>

          <div className="naturra-blog-intro">
            <div className="naturra-blog-intro-bg">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200" alt="Agriculture Background" loading="lazy" />
              <div className="naturra-blog-intro-overlay"></div>
            </div>
            <div className="naturra-blog-intro-content">
              <p className="naturra-blog-intro-text">
                {intro.introParagraph}
              </p>
              <ul className="naturra-blog-intro-list">
                {intro.bullets.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="naturra-blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="naturra-blog-card">
                <Link to={`/blog/${post.slug}`} className="naturra-blog-card-link">
                  <div className="naturra-blog-card-image">
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
                    <div className="naturra-blog-card-badge">Naturra Extal</div>
                  </div>
                  <div className="naturra-blog-card-content">
                    <span className="naturra-blog-card-category">{post.category.toUpperCase()}</span>
                    <h3 className="naturra-blog-card-title">{post.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination - Compact Version */}
          {totalPages > 1 && (
            <nav className="naturra-blog-pagination" aria-label="Blog pagination">
              {currentPage > 1 && (
                <Link
                  to={buildPageUrl(currentPage - 1)}
                  className="naturra-pagination-btn naturra-pagination-prev"
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
                      <span key={`ellipsis-${index}`} className="naturra-pagination-ellipsis" aria-hidden="true">
                        ...
                      </span>
                    )
                  }

                  const pageNumber = page as number
                  return (
                    <Link
                      key={pageNumber}
                      to={buildPageUrl(pageNumber)}
                      className={`naturra-pagination-btn naturra-pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
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
                  className="naturra-pagination-btn naturra-pagination-next"
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
                color: '#004D2C',
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


import type { Product } from '../data/products'
import { ALL_PRODUCTS } from '../data/products'

/**
 * Mapping keywords dari artikel blog ke produk yang relevan
 * Sistem ini akan mendeteksi keyword di title, slug, atau content artikel
 * dan menampilkan produk yang sesuai
 */
export interface ProductKeywordMapping {
  keywords: string[]  // Keyword yang muncul di artikel
  productIds: number[]  // ID produk yang relevan
  category?: string  // Kategori produk (optional)
}

// Mapping keyword artikel ke produk
const PRODUCT_KEYWORD_MAPPINGS: ProductKeywordMapping[] = [
  // COCOA
  {
    keywords: ['cocoa', 'kakao', 'coklat', 'chocolate', 'cocoa powder', 'bubuk kakao', 'fermented beans', 'alkalized', 'natural cocoa'],
    productIds: [1, 2], // Cocoa Powder Alkalized, Natural
    category: 'cocoa'
  },
  // CLOVES
  {
    keywords: ['cloves', 'cengkeh', 'rempah', 'spices', 'lal pari', 'eugenol', 'spices island', 'maluku cloves'],
    productIds: [3, 4], // Cloves Lal Pari, Grade A
    category: 'cloves'
  },
  // COCOPEAT
  {
    keywords: ['cocopeat', 'sabut kelapa', 'coconut husk', 'growing medium', 'horticulture', 'hydroponic', 'media tanam', 'low ec'],
    productIds: [5], // Cocopeat Blocks
    category: 'cocopeat'
  }
]

/**
 * Mendapatkan produk yang relevan berdasarkan artikel blog
 * @param slug - Slug artikel blog
 * @param title - Judul artikel
 * @param excerpt - Excerpt artikel (optional)
 * @returns Array produk yang relevan
 */
export const getRelevantProductsForBlog = (
  slug: string,
  title: string,
  excerpt?: string
): Product[] => {
  // Kombinasi semua teks untuk searching
  const searchText = `${slug} ${title} ${excerpt || ''}`.toLowerCase()

  // Collect semua product IDs yang relevan
  const relevantProductIds = new Set<number>()

  // Loop melalui setiap mapping
  for (const mapping of PRODUCT_KEYWORD_MAPPINGS) {
    // Cek apakah ada keyword yang match
    const hasKeyword = mapping.keywords.some(keyword => {
      const keywordLower = keyword.toLowerCase()
      return searchText.includes(keywordLower)
    })

    // Jika ada keyword match, tambahkan product IDs
    if (hasKeyword) {
      mapping.productIds.forEach(id => relevantProductIds.add(id))
    }
  }

  // Convert Set ke Array dan dapatkan produk
  const productIds = Array.from(relevantProductIds)

  if (productIds.length === 0) {
    // Fallback: tampilkan best sellers jika tidak ada match
    return ALL_PRODUCTS.slice(0, 6)
  }

  // Ambil produk berdasarkan IDs, maksimal 6 produk
  const products = productIds
    .map(id => ALL_PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 6)

  return products
}

/**
 * Mendapatkan heading yang relevan untuk showcase produk
 * @param slug - Slug artikel
 * @param title - Judul artikel
 * @param language - Kode bahasa (id, en, ar, etc.)
 * @returns Heading text untuk showcase section
 */
export const getProductShowcaseHeading = (
  slug: string,
  title: string,
  language: string = 'id'
): string => {
  const searchText = `${slug} ${title}`.toLowerCase()
  const lang = (language || 'id').toLowerCase()

  const translations: Record<string, {
    tables: string
    chairs: string
    storage: string
    bar: string
    dining: string
    kitchen: string
    lounge: string
    default: string
  }> = {
    id: {
      tables: 'Produk Kakao Unggulan Kami',
      chairs: 'Cengkeh Indonesia Kualitas Ekspor',
      storage: 'Media Tanam Cocopeat Premium',
      bar: 'Komoditas Pertanian Pilihan',
      dining: 'Produk Kakao & Cengkeh',
      kitchen: 'Bahan Baku Industri Makanan',
      lounge: 'Produk Hortikultura Berkelanjutan',
      default: 'Komoditas Terkait yang Mungkin Anda Butuhkan'
    },
    en: {
      tables: 'Our Featured Cocoa Products',
      chairs: 'Export Quality Indonesian Cloves',
      storage: 'Premium Cocopeat Growing Medium',
      bar: 'Selected Agricultural Commodities',
      dining: 'Cocoa & Clove Products',
      kitchen: 'Food Industry Raw Materials',
      lounge: 'Sustainable Horticulture Products',
      default: 'Related Commodities You May Need'
    },
    ar: {
      tables: 'منتجات الكاكاو المميزة لدينا',
      chairs: 'القرنفل الإندونيسي عالي الجودة للتصدير',
      storage: 'وسط نمو كوكوبيت متميز',
      bar: 'سلع زراعية مختارة',
      dining: 'منتجات الكاكاو والقرنفل',
      kitchen: 'المواد الخام للصناعات الغذائية',
      lounge: 'منتجات البستنة المستدامة',
      default: 'السلع ذات الصلة التي قد تحتاجها'
    },
    zh: {
      tables: '我们的精选可可产品',
      chairs: '优质印尼外销丁香',
      storage: '优质椰糠生长介质',
      bar: '精选农产品',
      dining: '可可和丁香产品',
      kitchen: '食品工业原料',
      lounge: '可持续园艺产品',
      default: '您可能需要的相关商品'
    },
    ja: {
      tables: '厳選されたココア製品',
      chairs: '高品質なインドネシア産輸出用クローブ',
      storage: 'プレミアムココピート栽培媒体',
      bar: '厳選された農産物',
      dining: 'ココアとクローブの製品',
      kitchen: '食品業界向け原材料',
      lounge: '持続可能な園芸製品',
      default: '関連する農産物'
    },
    es: {
      tables: 'Nuestros Productos de Cacao Destacados',
      chairs: 'Clavo de Olor Indonesio de Calidad de Exportación',
      storage: 'Medio de Cultivo de Cocopeat Premium',
      bar: 'Materias Primas Agrícolas Seleccionadas',
      dining: 'Productos de Cacao y Clavo',
      kitchen: 'Materias Primas para la Industria Alimentaria',
      lounge: 'Productos de Horticultura Sostenibles',
      default: 'Materias Primas Relacionadas que Puede Necesitar'
    },
    fr: {
      tables: 'Nos Produits Cacaotés Vedettes',
      chairs: 'Clous de Girofle Indonésiens de Qualité Export',
      storage: 'Support de Culture Cocopeat Premium',
      bar: 'Matières Premières Agricoles Sélectionnées',
      dining: 'Produits Cacaotés et Girofle',
      kitchen: 'Matières Premières pour l\'Industrie Alimentaire',
      lounge: 'Produits d\'Horticulture Durables',
      default: 'Produits Similaires Successibles de Vous Intéresser'
    },
    ko: {
      tables: '당사의 주요 코코아 제품',
      chairs: '수출 품질의 인도네시아산 정향',
      storage: '프리미엄 코코피트 재배 매체',
      bar: '엄선된 농산물',
      dining: '코코아 및 정향 제품',
      kitchen: '식품 산업 원료',
      lounge: '지속 가능한 원예 제품',
      default: '관련 농산물'
    }
  }

  const t = translations[lang] || translations.en

  if (searchText.includes('cocoa') || searchText.includes('kakao') || searchText.includes('coklat') || searchText.includes('chocolate') || searchText.includes('可可')) {
    return t.tables
  }
  if (searchText.includes('clove') || searchText.includes('cengkeh') || searchText.includes('girofle') || searchText.includes('丁香')) {
    return t.chairs
  }
  if (searchText.includes('cocopeat') || searchText.includes('sabut') || searchText.includes('椰糠') || searchText.includes('husk')) {
    return t.storage
  }
  if (searchText.includes('commodity') || searchText.includes('komoditas') || searchText.includes('ekspor') || searchText.includes('export')) {
    return t.bar
  }
  if (searchText.includes('food') || searchText.includes('makanan') || searchText.includes('industry')) {
    return t.kitchen
  }
  if (searchText.includes('sustainable') || searchText.includes('berkelanjutan') || searchText.includes('horticulture')) {
    return t.lounge
  }

  return t.default
}

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
  // MEJA / TABLE
  {
    keywords: ['meja', 'table', 'meja makan', 'meja cafe', 'meja bar', 'meja kerja', 'dining table', 'bar table', 'coffee table'],
    productIds: [4, 5, 15, 3], // Dining tables, meja kerja, coffee table
    category: 'Tables'
  },
  // KURSI / CHAIR
  {
    keywords: ['kursi', 'chair', 'kursi bar', 'bar chair', 'stall chair', 'barstool'],
    productIds: [6, 7], // Bar chairs
    category: 'Bar Set'
  },
  // RAK / RACK / SHELF / STORAGE
  {
    keywords: ['rak', 'rack', 'shelf', 'display', 'storage', 'rak display', 'display rack', 'bookshelf', 'lemari', 'kabinet'],
    productIds: [1, 9, 10, 11, 12, 13], // Racks, shelves, cabinets
    category: 'Storage'
  },
  // BAR SET / OUTDOOR
  {
    keywords: ['bar set', 'bar-set', 'outdoor', 'balcony', 'teras', 'area luar'],
    productIds: [2, 8], // Bar sets dan outdoor furniture
    category: 'Bar Set'
  },
  // DAYBED / LOUNGE
  {
    keywords: ['daybed', 'loung', 'sofa', 'santai', 'lounge set', 'bench'],
    productIds: [16, 17, 3], // Daybed, bench, lounge set
    category: 'Lounge Set'
  },
  // DINING SET
  {
    keywords: ['dining set', 'set makan', 'meja kursi set'],
    productIds: [4, 5], // Dining sets
    category: 'Dining Set'
  },
  // KITCHEN / DAPUR
  {
    keywords: ['kitchen', 'dapur', 'cabinet', 'kabinet', 'lemari dapur'],
    productIds: [9, 10], // Kitchen cabinets
    category: 'Storage'
  },
  // GANTUNGAN / HANGING
  {
    keywords: ['gantungan', 'hanging', 'coat rack'],
    productIds: [13, 14], // Hanging shelves, coat racks
    category: 'Storage'
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
      tables: 'Produk Meja Industrial Pilihan Kami',
      chairs: 'Kursi Bar & Cafe Industrial Berkualitas',
      storage: 'Rak Display & Storage Industrial Terbaik',
      bar: 'Bar Set & Outdoor agricultural commodities',
      dining: 'Dining Set Industrial untuk Cafe & Restoran',
      kitchen: 'Kitchen Cabinet & Storage Industrial',
      lounge: 'Lounge Set & Daybed Industrial Nyaman',
      default: 'Produk Industrial Terkait yang Mungkin Anda Suka'
    },
    en: {
      tables: 'Our Choice of Industrial Tables',
      chairs: 'Quality Industrial Bar & Cafe Chairs',
      storage: 'Best Industrial Display Racks & Storage',
      bar: 'Industrial Bar Set & Outdoor Furniture',
      dining: 'Industrial Dining Set for Cafe & Restaurant',
      kitchen: 'Industrial Kitchen Cabinet & Storage',
      lounge: 'Comfortable Industrial Lounge Set & Daybed',
      default: 'Related Industrial Products'
    },
    ar: {
      tables: 'اختياراتنا من الطاولات الصناعية',
      chairs: 'كراسي بار ومقهى صناعية عالية الجودة',
      storage: 'أفضل أرفف العرض والتخزين الصناعية',
      bar: 'طقم بار وأثاث خارجي صناعي',
      dining: 'طقم غرفة طعام صناعي للمقهى والمطعم',
      kitchen: 'خزانة مطبخ وتخزين صناعي',
      lounge: 'طقم صالة وسرير نهاري صناعي مريح',
      default: 'منتجات صناعية ذات صلة'
    },
    zh: {
      tables: '我们精选的工业风桌子',
      chairs: '优质工业风吧台和咖啡厅椅子',
      storage: '最佳工业风展示架和储物柜',
      bar: '工业风吧台套装和户外家具',
      dining: '适合咖啡厅和餐厅的工业风餐桌椅',
      kitchen: '工业风厨柜和储物柜',
      lounge: '舒适的工业风休息区套装和日间床',
      default: '相关工业风产品'
    },
    ja: {
      tables: '厳選されたインダストリアルテーブル',
      chairs: '高品質なインダストリアルバー＆カフェチェア',
      storage: '最高のインダストリアルディスプレイラック＆収納',
      bar: 'インダストリアルバーセット＆屋外用家具',
      dining: 'カフェ＆レストラン用インダストリアルダイニングセット',
      kitchen: 'インダストリアルキッチンキャビネット＆収納',
      lounge: '快適なインダストリアルラウンジセット＆デイベッド',
      default: '関連するインダストリアル製品'
    },
    es: {
      tables: 'Nuestra Selección de Mesas Industriales',
      chairs: 'Sillas de Bar y Café Industriales de Calidad',
      storage: 'Los Mejores Estantes y Almacenamiento Industrial',
      bar: 'Set de Bar y Muebles de Exterior Industriales',
      dining: 'Set de Comedor Industrial para Cafés y Restaurantes',
      kitchen: 'Gabinete de Cocina y Almacenamiento Industrial',
      lounge: 'Set de Sala y Diván Industrial Cómodo',
      default: 'Productos Industriales Relacionados'
    },
    fr: {
      tables: 'Notre Sélection de Tables Industrielles',
      chairs: 'Chaises de Bar et Café Industrielles de Qualité',
      storage: 'Meilleurs Racks d\'Affichage et Rangement Industriels',
      bar: 'Ensemble de Bar et Mobilier d\'Extérieur Industriels',
      dining: 'Ensemble de Salle à Manger pour Cafés et Restaurants',
      kitchen: 'Armoire de Cuisine et Rangement Industriels',
      lounge: 'Ensemble de Salon et Méridienne Industriels Confortables',
      default: 'Produits Industriels Connexes'
    },
    ko: {
      tables: '당사가 엄선한 산업용 테이블',
      chairs: '고품질 산업용 바 및 카페 의자',
      storage: '최고의 산업용 디스플레이 랙 및 수납장',
      bar: '산업용 바 세트 및 실외용 가구',
      dining: '카페 및 레스토랑용 산업용 다이닝 세트',
      kitchen: '산업용 주방 캐비닛 및 수납장',
      lounge: '편안한 산업용 라운지 세트 및 데이베드',
      default: '관련 산업용 제품'
    }
  }

  const t = translations[lang] || translations.en

  if (searchText.includes('meja') || searchText.includes('table') || searchText.includes('mesa') || searchText.includes('桌')) {
    return t.tables
  }
  if (searchText.includes('kursi') || searchText.includes('chair') || searchText.includes('silla') || searchText.includes('椅')) {
    return t.chairs
  }
  if (searchText.includes('rak') || searchText.includes('display') || searchText.includes('shelf') || searchText.includes('rack')) {
    return t.storage
  }
  if (searchText.includes('bar') || searchText.includes('outdoor')) {
    return t.bar
  }
  if (searchText.includes('dining') || searchText.includes('makan') || searchText.includes('comedor')) {
    return t.dining
  }
  if (searchText.includes('kitchen') || searchText.includes('dapur') || searchText.includes('cocina')) {
    return t.kitchen
  }
  if (searchText.includes('lounge') || searchText.includes('daybed') || searchText.includes('sofa')) {
    return t.lounge
  }

  return t.default
}

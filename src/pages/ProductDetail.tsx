import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useLocation, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { X, Play } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import ProductDetailAIContent from '../components/ProductDetailAIContent'
import { ALL_PRODUCTS } from '../data/products'
import { getProductDescription, getProductImageAlt, getProductImageCaption, getProductName } from '../data/productDescriptions'
import { generateLanguageSpecificMeta, generateLocalizedUrls, getProductImageUrl, truncateTitle, truncateMetaDescription } from '../utils/seo'
import { DEFAULT_IMAGE_RIGHTS_METADATA } from '../utils/structuredData'
import { sendBackgroundEmail } from '../utils/emailHelpers'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { getCategorySlug } from '../utils/categoryHelpers'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, type LanguageCode } from '../utils/languageManager'
import { translateCategory } from '../utils/categoryTranslations'
import './ProductDetail.css'

interface ProductDetail {
  id: number
  slug: string
  name: string
  categories: string[]
  price: string
  images: string[]
  details: string
  description: string
  video?: string
  variants?: { name: string, price: string, dimensions?: string }[]
}

// Generate product description
const generateProductDescription = (name: string) => {
  // Special descriptions for each product to target specific keywords and queries

  if (name.toLowerCase().includes('hollowline')) {
    return `The Hollowline Display Rack from Naturra Extal is the perfect industrial storage solution for modern retail and commercial spaces. This premium hollowline display rack features a sleek industrial design with hollow steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this hollowline display rack showcases superior welding techniques and attention to detail. The hollow steel frame construction offers excellent strength-to-weight ratio while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for retail stores, cafes, restaurants, and offices, this hollowline display rack provides versatile storage and display capabilities. The modular design allows for easy customization and expansion, making it ideal for growing businesses that need flexible storage solutions.

Built to commercial-grade standards, this hollowline display rack is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The powder-coated finish ensures long-lasting protection against wear and corrosion, making it a smart investment for any commercial space.

Whether you need to display merchandise, organize documents, or create an industrial focal point, the Hollowline Display Rack delivers both functionality and style. Contact Naturra Extal today to learn more about our hollowline display rack solutions and custom Agricultural Commodities options.`
  }

  if (name.toLowerCase().includes('balcony bar table')) {
    return `The Balcony Bar Table from Naturra Extal is the ultimate outdoor dining and entertainment solution for modern spaces. This premium balcony bar table features a robust industrial design with weather-resistant construction that provides maximum durability for outdoor use.

Crafted in our Bekasi workshop since 1999, this balcony bar table showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any outdoor or indoor industrial design.

Perfect for balconies, terraces, patios, and outdoor cafes, this balcony bar table provides versatile dining and entertainment capabilities. The weather-resistant powder coating ensures long-lasting protection against harsh outdoor conditions, making it ideal for year-round use.

Built to commercial-grade standards, this balcony bar table is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, strength, and outdoor durability, making it an ideal choice for hospitality venues, residential balconies, and outdoor entertainment spaces.

Whether you need outdoor dining furniture, balcony seating, or industrial outdoor tables, the Balcony Bar Table delivers both functionality and style. Contact Naturra Extal today to learn more about our balcony bar table solutions and custom outdoor furniture options.`
  }

  if (name.toLowerCase().includes('frame loft bookshelf')) {
    return `The Frame Loft Bookshelf from Naturra Extal is the perfect industrial storage solution for modern homes, offices, and commercial spaces. This premium frame loft bookshelf features a sleek industrial design with modular construction that provides maximum storage flexibility and visual appeal.

Crafted in our Bekasi workshop since 1999, this frame loft bookshelf showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent strength while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for living rooms, offices, cafes, and retail spaces, this frame loft bookshelf provides versatile storage and display capabilities. The modular design allows for easy customization and expansion, making it ideal for growing collections and changing storage needs.

Built to commercial-grade standards, this frame loft bookshelf is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The powder-coated finish ensures long-lasting protection against wear and corrosion, making it a smart investment for any space.

Whether you need book storage, display shelving, or industrial storage solutions, the Frame Loft Bookshelf delivers both functionality and style. Contact Naturra Extal today to learn more about our frame loft bookshelf solutions and custom Agricultural Commodities options.`
  }

  if (name.toLowerCase().includes('bench corner lounge')) {
    return `The Bench Corner Lounge from Naturra Extal is the perfect industrial seating solution for modern cafes, restaurants, and commercial spaces. This premium bench corner lounge features a sleek industrial design with comfortable seating that provides maximum comfort and visual appeal.

Crafted in our Bekasi workshop since 1999, this bench corner lounge showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for cafes, restaurants, waiting areas, and commercial spaces, this bench corner lounge provides versatile seating capabilities. The corner design maximizes space efficiency while creating intimate seating areas for guests and customers.

Built to commercial-grade standards, this bench corner lounge is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, comfort, and durability, making it an ideal choice for hospitality venues, commercial spaces, and modern residences.

Whether you need cafe seating, restaurant furniture, or industrial lounge solutions, the Bench Corner Lounge delivers both functionality and style. Contact Naturra Extal today to learn more about our bench corner lounge solutions and custom Agricultural Commodities options.`
  }

  if (name.toLowerCase().includes('industrial daybed frame')) {
    return `The Industrial Daybed Frame from Naturra Extal is the perfect Agricultural Commodities solution for modern spaces. This premium industrial daybed frame features a robust industrial design with steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial daybed frame showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent strength while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for lounges, waiting areas, hotels, and commercial spaces, this industrial daybed frame provides versatile seating and relaxation capabilities. The daybed design offers comfortable seating and lounging options for guests and customers.

Built to commercial-grade standards, this industrial daybed frame is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, comfort, and durability, making it an ideal choice for hospitality venues, commercial spaces, and modern residences.

Whether you need lounge furniture, daybed solutions, or industrial seating, the Industrial Daybed Frame delivers both functionality and style. Contact Naturra Extal today to learn more about our industrial daybed frame solutions and custom Agricultural Commodities options.`
  }

  if (name.toLowerCase().includes('dining table') || name.toLowerCase().includes('dining set')) {
    return `The ${name} from Naturra Extal is the perfect industrial dining solution for modern homes, cafes, and restaurants. This premium industrial dining table features a robust industrial design with steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial dining table showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for homes, cafes, restaurants, and commercial dining spaces, this industrial dining table provides versatile dining capabilities. The industrial design creates a focal point for dining areas while offering practical functionality for daily use.

Built to commercial-grade standards, this industrial dining table is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, strength, and durability, making it an ideal choice for hospitality venues, commercial spaces, and modern residences.

Whether you need dining furniture, restaurant tables, or industrial dining solutions, the ${name} delivers both functionality and style. Contact Naturra Extal today to learn more about our industrial dining table solutions and custom Agricultural Commodities options.`
  }

  if (name.toLowerCase().includes('bar chair') || name.toLowerCase().includes('bar stool') || name.toLowerCase().includes('stall chair')) {
    return `The ${name} from Naturra Extal is the perfect industrial bar seating solution for modern cafes, restaurants, and commercial spaces. This premium industrial bar chair features a sleek industrial design with steel construction that provides maximum comfort and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial bar chair showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for bars, cafes, restaurants, and commercial spaces, this industrial bar chair provides versatile seating capabilities. The bar height design offers comfortable seating for counter areas and bar spaces.

Built to commercial-grade standards, this industrial bar chair is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, comfort, and durability, making it an ideal choice for hospitality venues, commercial spaces, and modern residences.

Whether you need bar seating, restaurant chairs, or industrial bar furniture, the ${name} delivers both functionality and style. Contact Naturra Extal today to learn more about our industrial bar chair solutions and custom Agricultural Commodities options.`
  }

  if (name.toLowerCase().includes('outdoor bar set') || name.toLowerCase().includes('steelframe outdoor')) {
    return `The ${name} from Naturra Extal is the perfect industrial outdoor furniture solution for modern spaces. This premium industrial outdoor bar set features a robust industrial design with weather-resistant construction that provides maximum durability for outdoor use.

Crafted in our Bekasi workshop since 1999, this industrial outdoor bar set showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any outdoor or industrial design.

Perfect for outdoor cafes, restaurants, patios, and commercial outdoor spaces, this industrial outdoor bar set provides versatile outdoor dining and entertainment capabilities. The weather-resistant powder coating ensures long-lasting protection against harsh outdoor conditions.

Built to commercial-grade standards, this industrial outdoor bar set is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, strength, and outdoor durability, making it an ideal choice for hospitality venues, outdoor dining, and commercial outdoor spaces.

Whether you need outdoor furniture, patio dining, or industrial outdoor solutions, the ${name} delivers both functionality and style. Contact Naturra Extal today to learn more about our industrial outdoor bar set solutions and custom outdoor furniture options.`
  }

  if (name.toLowerCase().includes('cabinet') || name.toLowerCase().includes('storage') || name.toLowerCase().includes('display rack')) {
    return `The ${name} from Naturra Extal is the perfect industrial storage solution for modern spaces. This premium industrial storage furniture features a robust industrial design with steel construction that provides maximum storage capacity and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial storage furniture showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for offices, cafes, restaurants, and commercial spaces, this industrial storage furniture provides versatile storage capabilities. The industrial design creates functional storage solutions while adding visual interest to any space.

Built to commercial-grade standards, this industrial storage furniture is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, strength, and durability, making it an ideal choice for commercial spaces, offices, and modern residences.

Whether you need storage solutions, display furniture, or industrial storage, the ${name} delivers both functionality and style. Contact Naturra Extal today to learn more about our industrial storage solutions and custom Agricultural Commodities options.`
  }

  if (name.toLowerCase().includes('meja kerja') || name.toLowerCase().includes('work table')) {
    return `The ${name} from Naturra Extal is the perfect industrial work table solution for modern offices and commercial spaces. This premium industrial work table features a robust industrial design with steel construction that provides maximum durability and functionality.

Crafted in our Bekasi workshop since 1999, this industrial work table showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary office design.

Perfect for offices, workshops, studios, and commercial spaces, this industrial work table provides versatile work capabilities. The industrial design creates a professional work environment while offering practical functionality for daily tasks.

Built to commercial-grade standards, this industrial work table is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, strength, and durability, making it an ideal choice for professional workspaces, offices, and commercial environments.

Whether you need office furniture, work tables, or industrial workspace solutions, the ${name} delivers both functionality and style. Contact Naturra Extal today to learn more about our industrial work table solutions and custom Agricultural Commodities options.`
  }

  // Default description for other products
  return `The ${name} from Naturra Extal is expertly crafted Agricultural Commodities designed for modern spaces. Built in our workshop in Bekasi, Indonesia, each piece showcases superior welding techniques and attention to detail.

Handcrafted by experienced welders and metalworkers, every piece demonstrates exceptional craftsmanship. Constructed from premium materials including high-grade steel hollow sections, solid steel plates, and powder-coated finishes, this furniture delivers both strength and refined industrial aesthetics.

Designed for durability and style, this piece features carefully selected materials that ensure long-lasting performance. The industrial design paired with expert craftsmanship makes it a standout piece in any modern setting - whether in cafes, restaurants, offices, or contemporary homes.

Built to commercial-grade standards, this furniture is meticulously welded using professional equipment that can withstand heavy daily use for years to come. The sophisticated design effortlessly blends functionality, strength, and industrial character, making it an ideal choice for hospitality venues, co-working spaces, and modern residences.

Naturra Extal is committed to quality and precision, ensuring that every weld and joint not only meets industrial standards but exceeds expectations. Explore our complete collection to find more equally well-crafted pieces designed to bring industrial elegance and durability to your spaces.`
}

// Generate product details based on categories
const generateProductDetails = (categories: string[]) => {
  const details: string[] = []

  if (categories.some(c => c.includes('Table') || c.includes('Dining'))) {
    details.push('Industrial Steel Frame')
    details.push('Powder Coated Finish')
    details.push('Solid Wood/Metal Top')
  }

  if (categories.some(c => c.includes('Chair') || c.includes('Bench') || c.includes('Sofa'))) {
    details.push('Welded Steel Construction')
    details.push('Ergonomic Design')
    details.push('Weather Resistant Finish')
  }

  if (categories.some(c => c.includes('Bar'))) {
    details.push('High-Grade Steel Pipe')
    details.push('Footrest Support')
    details.push('Commercial Grade')
  }

  if (categories.some(c => c.includes('Storage') || c.includes('Accessories'))) {
    details.push('Heavy Duty Construction')
    details.push('Multiple Shelves/Compartments')
    details.push('Easy Assembly')
  }

  if (details.length === 0) {
    details.push('Premium Steel Construction')
    details.push('Powder Coated Black Finish')
    details.push('Industrial Design')
    details.push('Built to Last')
  }

  return details.join(', ')
}

const DETAIL_FEATURE_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Industrial Steel Frame': {
    id: 'Rangka Baja Industrial',
    en: 'Industrial Steel Frame',
    ar: 'هيكل فولاذي صناعي',
    zh: '工业钢结构框架',
    ja: '工業用スチールフレーム',
    es: 'Estructura de acero industrial',
    fr: 'Cadre en acier industriel',
    ko: '산업용 강철 프레임'
  },
  'Powder Coated Finish': {
    id: 'Finishing Powder Coating',
    en: 'Powder Coated Finish',
    ar: 'تشطيب بطلاء بودرة',
    zh: '粉末喷涂表面',
    ja: '粉体塗装仕上げ',
    es: 'Acabado con pintura en polvo',
    fr: 'Finition thermolaquée',
    ko: '분체 도장 마감'
  },
  'Solid Wood/Metal Top': {
    id: 'Top Kayu Solid/Metal',
    en: 'Solid Wood/Metal Top',
    ar: 'سطح من الخشب الصلب / المعدن',
    zh: '实木/金属台面',
    ja: '無垢材／金属天板',
    es: 'Cubierta de madera maciza/metal',
    fr: 'Plateau en bois massif/métal',
    ko: '원목/금속 상판'
  },
  'Welded Steel Construction': {
    id: 'Konstruksi Baja Las',
    en: 'Welded Steel Construction',
    ar: 'هيكل فولاذي ملحوم',
    zh: '焊接钢结构',
    ja: '溶接スチール構造',
    es: 'Construcción de acero soldado',
    fr: 'Structure en acier soudé',
    ko: '용접 강철 구조'
  },
  'Ergonomic Design': {
    id: 'Desain Ergonomis',
    en: 'Ergonomic Design',
    ar: 'تصميم مريح',
    zh: '人体工学设计',
    ja: '人間工学デザイン',
    es: 'Diseño ergonómico',
    fr: 'Design ergonomique',
    ko: '인체공학적 디자인'
  },
  'Weather Resistant Finish': {
    id: 'Finishing Tahan Cuaca',
    en: 'Weather Resistant Finish',
    ar: 'تشطيب مقاوم للعوامل الجوية',
    zh: '耐候性表面处理',
    ja: '耐候仕上げ',
    es: 'Acabado resistente a la intemperie',
    fr: 'Finition résistante aux intempéries',
    ko: '기후에 강한 마감'
  },
  'High-Grade Steel Pipe': {
    id: 'Pipa Baja Kualitas Tinggi',
    en: 'High-Grade Steel Pipe',
    ar: 'أنبوب فولاذي عالي الجودة',
    zh: '高等级钢管',
    ja: '高品質スチールパイプ',
    es: 'Tubo de acero de alta calidad',
    fr: 'Tube en acier de haute qualité',
    ko: '고급 강철 파이프'
  },
  'Footrest Support': {
    id: 'Penopang Sandaran Kaki',
    en: 'Footrest Support',
    ar: 'مسند القدم',
    zh: '脚踏支撑',
    ja: 'フットレストサポート',
    es: 'Apoyo para los pies',
    fr: 'Support repose-pieds',
    ko: '발걸이 지지대'
  },
  'Commercial Grade': {
    id: 'Kualitas Komersial',
    en: 'Commercial Grade',
    ar: 'جودة تجارية',
    zh: '商用级',
    ja: 'コマーシャルグレード',
    es: 'Grado comercial',
    fr: 'Qualité commerciale',
    ko: '상업용 등급'
  },
  'Heavy Duty Construction': {
    id: 'Konstruksi Heavy Duty',
    en: 'Heavy Duty Construction',
    ar: 'هيكل قوي التحمل',
    zh: '重型结构',
    ja: 'ヘビーデューティ構造',
    es: 'Construcción de alta resistencia',
    fr: 'Construction robuste',
    ko: '헤비 듀티 구조'
  },
  'Multiple Shelves/Compartments': {
    id: 'Beberapa Rak/Kompartemen',
    en: 'Multiple Shelves/Compartments',
    ar: 'عدة رفوف / حجرات',
    zh: '多层架/分隔',
    ja: '複数の棚／仕切り',
    es: 'Múltiples estantes/compartimentos',
    fr: 'Plusieurs étagères/compartiments',
    ko: '여러 개의 선반/구획'
  },
  'Easy Assembly': {
    id: 'Mudah Dipasang',
    en: 'Easy Assembly',
    ar: 'سهل التركيب',
    zh: '易于安装',
    ja: '組み立て簡単',
    es: 'Fácil de ensamblar',
    fr: 'Assemblage facile',
    ko: '간편한 조립'
  },
  'Premium Steel Construction': {
    id: 'Konstruksi Baja Premium',
    en: 'Premium Steel Construction',
    ar: 'هيكل فولاذي فاخر',
    zh: '高级钢结构',
    ja: 'プレミアムスチール構造',
    es: 'Construcción de acero premium',
    fr: 'Structure en acier premium',
    ko: '프리미엄 강철 구조'
  },
  'Powder Coated Black Finish': {
    id: 'Finishing Powder Coating Hitam',
    en: 'Powder Coated Black Finish',
    ar: 'تشطيب أسود بطلاء بودرة',
    zh: '黑色粉末喷涂表面',
    ja: 'ブラック粉体塗装仕上げ',
    es: 'Acabado negro con pintura en polvo',
    fr: 'Finition noire thermolaquée',
    ko: '블랙 분체 도장 마감'
  },
  'Industrial Design': {
    id: 'Desain Industrial',
    en: 'Industrial Design',
    ar: 'تصميم صناعي',
    zh: '工业设计',
    ja: 'インダストリアルデザイン',
    es: 'Diseño industrial',
    fr: 'Design industriel',
    ko: '인더스트리얼 디자인'
  },
  'Built to Last': {
    id: 'Dibuat untuk Tahan Lama',
    en: 'Built to Last',
    ar: 'مصمم ليدوم طويلاً',
    zh: '经久耐用',
    ja: '長く使えるよう設計',
    es: 'Construido para durar',
    fr: 'Conçu pour durer',
    ko: '오래도록 사용 가능'
  }
}

const UI_TRANSLATIONS: Record<
  LanguageCode,
  {
    priceNote: string
    orderNow: string
    productDetails: string
    about: string
    youMightBeInterested: string
    clickToConvertUsd: string
    clickToConvertIdr: string
    loading: string
    productNotFound: string
    browseAllProducts: string
    home: string
    priceLabel: string
    priceLabelUsd: string
    priceLabelIdr: string
    selectSize: string
    dimensions: string
  }
> = {
  id: {
    priceNote: '*Harga dapat bervariasi berdasarkan kustomisasi',
    orderNow: 'PESAN SEKARANG',
    productDetails: 'Detail Produk',
    about: 'Tentang',
    youMightBeInterested: 'Anda Mungkin Tertarik',
    clickToConvertUsd: 'Klik untuk konversi ke USD',
    clickToConvertIdr: 'Klik untuk kembali ke IDR',
    loading: 'Memuat...',
    productNotFound: 'Produk tidak ditemukan',
    browseAllProducts: 'Lihat semua produk',
    home: 'Beranda',
    priceLabel: 'Harga',
    priceLabelUsd: 'Harga USD',
    priceLabelIdr: 'Harga IDR',
    selectSize: 'Pilih Ukuran / Harga:',
    dimensions: 'Dimensi:'
  },
  en: {
    priceNote: '*Price may vary based on customization',
    orderNow: 'ORDER NOW',
    productDetails: 'Product Details',
    about: 'About',
    youMightBeInterested: 'You Might be Interested',
    clickToConvertUsd: 'Click to convert to USD',
    clickToConvertIdr: 'Click to convert back to IDR',
    loading: 'Loading...',
    productNotFound: 'Product not found',
    browseAllProducts: 'Browse all products',
    home: 'Home',
    priceLabel: 'Price',
    priceLabelUsd: 'Price (USD)',
    priceLabelIdr: 'Price (IDR)',
    selectSize: 'Select Size / Price:',
    dimensions: 'Dimensions:'
  },
  ar: {
    priceNote: '*قد يختلف السعر بناءً على التخصيص',
    orderNow: 'اطلب الآن',
    productDetails: 'مواصفات المنتج',
    about: 'نبذة عن',
    youMightBeInterested: 'قد يهمك أيضًا',
    clickToConvertUsd: 'اضغط للتحويل إلى الدولار الأمريكي',
    clickToConvertIdr: 'اضغط للعودة إلى الروبية الإندونيسية',
    loading: 'جارٍ التحميل...',
    productNotFound: 'المنتج غير موجود',
    browseAllProducts: 'تصفح جميع المنتجات',
    home: 'الصفحة الرئيسية',
    priceLabel: 'السعر',
    priceLabelUsd: 'السعر (دولار أمريكي)',
    priceLabelIdr: 'السعر (روبية إندونيسية)',
    selectSize: 'اختر المقاس / السعر:',
    dimensions: 'الأبعاد:'
  },
  zh: {
    priceNote: '*价格可能会因定制而有所变化',
    orderNow: '立即下单',
    productDetails: '产品详情',
    about: '关于',
    youMightBeInterested: '您可能感兴趣',
    clickToConvertUsd: '点击转换为美元',
    clickToConvertIdr: '点击切换回印尼盾',
    loading: '加载中...',
    productNotFound: '未找到产品',
    browseAllProducts: '查看所有产品',
    home: '首页',
    priceLabel: '价格',
    priceLabelUsd: '价格 (美元)',
    priceLabelIdr: '价格 (印尼盾)',
    selectSize: '选择尺寸 / 价格:',
    dimensions: '尺寸:'
  },
  ja: {
    priceNote: '※カスタマイズ内容により価格が変動します',
    orderNow: '今すぐ注文',
    productDetails: '商品詳細',
    about: 'について',
    youMightBeInterested: 'こちらもおすすめ',
    clickToConvertUsd: 'クリックしてUSDに変換',
    clickToConvertIdr: 'クリックしてIDRに戻す',
    loading: '読み込み中...',
    productNotFound: '商品が見つかりません',
    browseAllProducts: 'すべての商品を見る',
    home: 'ホーム',
    priceLabel: '価格',
    priceLabelUsd: '価格（USD）',
    priceLabelIdr: '価格（IDR）',
    selectSize: 'サイズ / 価格を選択:',
    dimensions: 'サイズ:'
  },
  es: {
    priceNote: '*El precio puede variar según la personalización',
    orderNow: 'ORDENAR AHORA',
    productDetails: 'Detalles del Producto',
    about: 'Acerca de',
    youMightBeInterested: 'También te puede interesar',
    clickToConvertUsd: 'Haz clic para convertir a USD',
    clickToConvertIdr: 'Haz clic para volver a IDR',
    loading: 'Cargando...',
    productNotFound: 'Producto no encontrado',
    browseAllProducts: 'Ver todos los productos',
    home: 'Inicio',
    priceLabel: 'Precio',
    priceLabelUsd: 'Precio (USD)',
    priceLabelIdr: 'Precio (IDR)',
    selectSize: 'Seleccionar tamaño / precio:',
    dimensions: 'Dimensiones:'
  },
  fr: {
    priceNote: '*Le prix peut varier en fonction de la personnalisation',
    orderNow: 'COMMANDER',
    productDetails: 'Détails du produit',
    about: 'À propos de',
    youMightBeInterested: 'Vous pourriez être intéressé',
    clickToConvertUsd: 'Cliquez pour convertir en USD',
    clickToConvertIdr: 'Cliquez pour revenir en IDR',
    loading: 'Chargement...',
    productNotFound: 'Produit introuvable',
    browseAllProducts: 'Voir tous les produits',
    home: 'Accueil',
    priceLabel: 'Prix',
    priceLabelUsd: 'Prix (USD)',
    priceLabelIdr: 'Prix (IDR)',
    selectSize: 'Choisir la taille / le prix :',
    dimensions: 'Dimensions :'
  },
  ko: {
    priceNote: '*맞춤 제작에 따라 가격이 달라질 수 있습니다',
    orderNow: '지금 주문하기',
    productDetails: '제품 상세정보',
    about: '소개',
    youMightBeInterested: '이 제품도 추천합니다',
    clickToConvertUsd: '클릭하여 USD로 변환',
    clickToConvertIdr: '클릭하여 IDR로 전환',
    loading: '로딩 중...',
    productNotFound: '상품을 찾을 수 없습니다',
    browseAllProducts: '전체 상품 보기',
    home: '홈',
    priceLabel: '가격',
    priceLabelUsd: '가격 (USD)',
    priceLabelIdr: '가격 (IDR)',
    selectSize: '크기 / 가격 선택:',
    dimensions: '치수:'
  }
}

const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

const formatPriceBlock = (language: LanguageCode, priceIDR: string, priceUSD?: string | null) => {
  const t = UI_TRANSLATIONS[language] ?? UI_TRANSLATIONS.en
  if (priceUSD) {
    if (language === 'id') {
      return `${t.priceLabel}: ${priceIDR}\n${t.priceLabelUsd}: ${priceUSD}`
    }
    return `${t.priceLabelUsd}: ${priceUSD}\n${t.priceLabelIdr}: ${priceIDR}`
  }
  const label = language === 'id' ? t.priceLabel : t.priceLabelIdr
  return `${label}: ${priceIDR}`
}

const getWhatsappMessage = (
  language: LanguageCode,
  params: {
    productName: string
    categories: string
    priceIDR: string
    priceUSD?: string | null
    url: string
  }
) => {
  const { productName, categories, priceIDR, priceUSD, url } = params
  const priceBlock = formatPriceBlock(language, priceIDR, priceUSD)

  switch (language) {
    case 'id':
      return `Halo Naturra Extal,

Saya tertarik dengan produk:
*${productName}*

Kategori: ${categories}
${priceBlock}

Link Produk: ${url}

Mohon informasi lebih lanjut dan cara pemesanannya.

Terima kasih!`
    case 'ar':
      return `مرحباً Naturra Extal،

أنا مهتم بالمنتج:
*${productName}*

الفئة: ${categories}
${priceBlock}

رابط المنتج: ${url}

يرجى تزويدي بمزيد من المعلومات وطريقة الطلب.

شكراً لكم!`
    case 'zh':
      return `您好 Naturra Extal，

我对以下产品感兴趣：
*${productName}*

类别：${categories}
${priceBlock}

产品链接：${url}

请提供更多信息和订购方式。

谢谢！`
    case 'ja':
      return `Naturra Extal 様

こちらの製品に興味があります：
*${productName}*

カテゴリー：${categories}
${priceBlock}

製品リンク：${url}

詳細情報と注文方法を教えてください。

よろしくお願いいたします。`
    case 'es':
      return `Hola Naturra Extal,

Estoy interesado en el producto:
*${productName}*

Categoría: ${categories}
${priceBlock}

Enlace del producto: ${url}

Por favor envíenme más información y cómo realizar el pedido.

¡Gracias!`
    case 'fr':
      return `Bonjour Naturra Extal,

Je suis intéressé par le produit :
*${productName}*

Catégorie : ${categories}
${priceBlock}

Lien du produit : ${url}

Merci de me communiquer plus d'informations et la procédure de commande.

Merci !`
    case 'ko':
      return `안녕하세요 Naturra Extal,

다음 제품에 관심이 있습니다:
*${productName}*

카테고리: ${categories}
${priceBlock}

제품 링크: ${url}

자세한 정보와 주문 방법을 알려주세요.

감사합니다!`
    case 'en':
    default:
      return `Hello Naturra Extal,

I'm interested in the product:
*${productName}*

Category: ${categories}
${priceBlock}

Product Link: ${url}

Please provide more information and how to order.

Thank you!`
  }
}

// Create product details from ALL_PRODUCTS
const products: { [key: string]: ProductDetail } = {}
ALL_PRODUCTS.forEach(p => {
  const baseImage = p.image
  const secondaryImage = p.image
  const videoOrFallback = p.video || p.image

  products[p.slug] = {
    id: p.id,
    slug: p.slug,
    name: p.name,
    categories: p.categories,
    price: p.price,
    images: [baseImage, secondaryImage, videoOrFallback],
    details: generateProductDetails(p.categories),
    description: generateProductDescription(p.name),
    video: p.video,
    variants: p.variants
  } as ProductDetail
})

// Related products - random 4 products
const getRelatedProducts = (currentSlug: string) => {
  return ALL_PRODUCTS
    .filter(p => p.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map(p => ({
      slug: p.slug,
      name: p.name,
      category: p.categories[0],
      price: p.price,
      image: p.image
    }))
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const product = products[slug || '']

  const [selectedImage, setSelectedImage] = useState(0)
  const [language, setLanguage] = useState<LanguageCode>('id')
  const [isLoading, setIsLoading] = useState(true)
  const [usdPrice, setUsdPrice] = useState<string | null>(null)
  const [highlightedPrice, setHighlightedPrice] = useState<string | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0)

  const currentPrice = product?.variants && product.variants[selectedVariantIndex]
    ? product.variants[selectedVariantIndex].price
    : product?.price || ''

  const currentDimensions = product?.variants && product.variants[selectedVariantIndex]
    ? product.variants[selectedVariantIndex].dimensions
    : null

  // Language to currency mapping (only non-IDR highlight currencies)
  const LANGUAGE_CURRENCY_MAP: { [key in LanguageCode]: 'KRW' | 'JPY' | 'CNY' | 'SAR' | 'EUR' | 'USD' | null } = {
    'ko': 'KRW',
    'ja': 'JPY',
    'zh': 'CNY',
    'ar': 'SAR',
    'es': 'EUR',
    'fr': 'EUR',
    'en': 'USD', // English highlights USD
    'id': null   // Indonesian highlights IDR (original price)
  }

  const isIndonesian = language === 'id'
  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  // Language detection - instant, no async needed!
  useEffect(() => {
    const detectedLanguage = getCurrentLanguage(location.pathname, location.search)
    setLanguage(prev => (prev === detectedLanguage ? prev : detectedLanguage))
    setIsLoading(false)
  }, [location.pathname, location.search])

  // Convert price to USD and highlighted currency based on language
  useEffect(() => {
    const convertPrice = async () => {
      if (product) {
        // Always convert to USD
        const usdConverted = await convertIDRToUSD(currentPrice)
        setUsdPrice(usdConverted)

        const targetCurrency = LANGUAGE_CURRENCY_MAP[language]

        if (language === 'id') {
          // Indonesian: highlight IDR, show USD as secondary
          setHighlightedPrice(currentPrice)
        } else if (targetCurrency && targetCurrency !== 'USD') {
          // Other languages with specific local currency highlight
          const highlightedConverted = await convertIDRToCurrency(currentPrice, targetCurrency)
          setHighlightedPrice(highlightedConverted)
        } else {
          // Fallback: highlight USD
          setHighlightedPrice(usdConverted)
        }
      }
    }
    convertPrice()
  }, [product, language, currentPrice])

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Localized related products (name + prices aligned with language)
  // MUST be declared BEFORE early returns to follow Rules of Hooks
  const [localizedRelated, setLocalizedRelated] = useState<Array<{
    slug: string
    image: string
    name: string
    category: string
    pricePrimary: string
    priceSecondary?: string | null
  }>>([])

  // Memoize related products to prevent infinite loop - only recalculate when slug changes
  const relatedProducts = useMemo(() => {
    if (!slug) return []
    return getRelatedProducts(slug)
  }, [slug])

  useEffect(() => {
    if (!product || !slug || relatedProducts.length === 0) return

    const buildLocalizedRelated = async () => {
      const targetCurrency = LANGUAGE_CURRENCY_MAP[language]

      const items = await Promise.all(relatedProducts.map(async (relatedProduct) => {
        // Localized name from descriptions if available
        const desc = getProductDescription(relatedProduct.slug)
        const nameLocalized = desc ? (getProductName(relatedProduct.slug, language === 'id', language) || relatedProduct.name) : relatedProduct.name

        // Currency conversion aligned with main product rules
        const usdConverted = await convertIDRToUSD(relatedProduct.price)
        let primary = usdConverted
        let secondary: string | null = null

        if (targetCurrency && targetCurrency !== 'USD') {
          const highlightedConverted = await convertIDRToCurrency(relatedProduct.price, targetCurrency)
          primary = highlightedConverted
          secondary = usdConverted
        } else {
          // For en/id, USD is primary; keep IDR as secondary for extra context
          secondary = relatedProduct.price
        }

        return {
          slug: relatedProduct.slug,
          image: relatedProduct.image,
          name: nameLocalized,
          category: relatedProduct.category,
          pricePrimary: primary,
          priceSecondary: secondary
        }
      }))

      setLocalizedRelated(items)
    }

    buildLocalizedRelated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, slug])

  // Translations
  const uiTranslations = UI_TRANSLATIONS[language] ?? UI_TRANSLATIONS.en

  // Translate product details based on language
  const translateProductDetails = (details: string): string => {
    if (!details) return details
    const tokens = details.split(',').map(item => item.trim()).filter(Boolean)
    const localizedTokens = tokens.map(token => {
      const translationMap = DETAIL_FEATURE_TRANSLATIONS[token]
      if (translationMap) {
        return translationMap[language] ?? translationMap.en ?? token
      }
      return token
    })
    return localizedTokens.join(', ')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="product-detail-page">
        <Header isIndonesian={isIndonesian} language={language} />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          background: '#f8f9fa'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #8B7355',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ color: '#666', margin: 0 }}>
              {uiTranslations.loading}
            </p>
          </div>
        </div>
        <Footer isIndonesian={isIndonesian} language={language} />
      </div>
    )
  }

  // Redirect to NotFound page if product doesn't exist to prevent Soft 404
  if (!product) {
    return <Navigate to="/404-not-found" replace />
  }

  // Get translated product name and description
  const productDesc = getProductDescription(product.slug)
  const translatedProductName = productDesc
    ? getProductName(product.slug, isIndonesian, language)
    : product.name
  const translatedDescription = productDesc
    ? (productDesc[language]?.description || productDesc.en.description)
    : product.description

  // Build breadcrumb with proper category slug mapping
  const primaryCategory = product.categories[0]
  const categorySlug = getCategorySlug(primaryCategory)
  const breadcrumbItems = [
    { label: uiTranslations.home, path: '/' },
    { label: primaryCategory, path: `/product-category/${categorySlug}` },
    { label: translatedProductName, path: `/product/${product.slug}` }
  ]

  // Generate structured data for the product
  const generateStructuredData = () => {
    const price = product.price.replace(/[^\d]/g, '') // Extract numeric price
    const numericPrice = parseInt(price) || 0
    // Convert all images to full URLs
    const imageUrls = product.images.map((img: string) => getProductImageUrl(img, product.slug))

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": translatedProductName,
      "description": translatedDescription,
      "image": imageUrls,
      "brand": {
        "@type": "Brand",
        "name": "Naturra Extal"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Naturra Extal",
        "url": "https://Naturra-living.com",
        "logo": "https://Naturra-living.com/logo.png",
        "image": "https://Naturra-living.com/og-image.jpg"
      },
      "category": product.categories.join(", "),
      "sku": product.slug,
      "mpn": `ML-${product.id}`,
      "offers": {
        "@type": "Offer",
        "price": numericPrice,
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn",
          "applicableCountry": "ID"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "IDR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "ID"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "businessDays": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            },
            "cutoffTime": "14:00",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 3,
              "maxValue": 5,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY"
            }
          }
        },
        "seller": {
          "@type": "Organization",
          "name": "Naturra Extal",
          "url": "https://Naturra-living.com",
          "logo": "https://Naturra-living.com/logo.png",
          "description": "Premium Industrial Scandinavian Furniture for Coffee Shops, Restaurants & Offices. Custom Solutions Since 1999.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. Raya Setu Cikarang Barat.",
            "addressLocality": "Bekasi",
            "addressRegion": "Jawa Barat",
            "postalCode": "17320",
            "addressCountry": "ID"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+6288801146881",
            "contactType": "customer service",
            "email": "lifewithNaturra@gmail.com",
            "availableLanguage": ["Indonesian", "English"]
          }
        },
        "url": `https://Naturra-living.com/product/${product.slug}`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "127",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah M."
          },
          "datePublished": "2025-10-15",
          "reviewBody": "Excellent quality furniture. The industrial design is perfect for our cafe. Highly recommended!",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Ahmad R."
          },
          "datePublished": "2025-10-20",
          "reviewBody": "Great craftsmanship and durable materials. Perfect for commercial use.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Lisa K."
          },
          "datePublished": "2025-10-25",
          "reviewBody": "Beautiful Agricultural Commodities with excellent finishing. Very satisfied with the purchase.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          }
        }
      ]
    }
  }

  return (
    <div className="product-detail-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{truncateTitle(product.slug === 'hollowline-display-rack'
          ? (isIndonesian ? 'Hollowline Display Rack - Harga Rp4.5 Juta - Naturra' : 'Hollowline Display Rack - Rp4.5M - Naturra Extal')
          : `${translatedProductName} - Naturra Extal`)}</title>
        <meta name="description" content={truncateMetaDescription(product.name === 'Hollowline Display Rack'
          ? (isIndonesian ? 'Hollowline Display Rack Industrial - Display Shelf Rack Modern - Harga Rp4.500.000 - Workshop Bekasi - Garansi Kualitas - Call Naturra +6288801146881' : 'Hollowline Display Rack Industrial - Modern Display Shelf Rack - Price Rp4.500.000 - Bekasi Workshop - Quality Guarantee - Call Naturra +6288801146881')
          : (() => {
            const desc = getProductDescription(product.slug)
            return desc ? (desc[language]?.metaDescription || desc.en.metaDescription) : `${product.name} - ${product.details}`
          })())} />
        <meta name="keywords" content={
          product.name === 'Hollowline Display Rack'
            ? 'hollowline display rack, display shelf rack, rak display industrial, hollowline storage, call Naturra furniture, furniture bekasi murah'
            : product.name === 'Industrial Kitchen Cabinet'
              ? 'Naturra kitchen cabinet, kitchen cabinet industrial, kabinet dapur cafe, furniture kitchen bekasi'
              : product.name === 'Bar Stall Chair'
                ? 'stall chair design, bar stall chair, kursi bar industrial, meja kursi cafe'
                : product.name === 'Set Furniture'
                  ? 'set agricultural commodities, meja kursi cafe lengkap, furniture cafe murah'
                  : `${product.name}, Agricultural Commodities, furniture besi, ${product.categories.join(', ')}, Naturra Extal`
        } />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`product-detail-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content={`${translatedProductName} - Naturra Extal`} />
        <meta property="og:description" content={`${translatedProductName} - ${translateProductDetails(product.details)}`} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:type" content="product" />
        <meta property="og:locale" content={localeMeta.locale} />
        {OG_LOCALES.filter(altLocale => altLocale !== localeMeta.locale).map((altLocale) => (
          <meta key={`product-detail-og-${altLocale}`} property="og:locale:alternate" content={altLocale} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${translatedProductName} - Naturra Extal`} />
        <meta name="twitter:description" content={`${translatedProductName} - ${translateProductDetails(product.details)}`} />
        <meta name="twitter:image" content={product.images[0]} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>

        {/* ImageObject Structured Data for Image SEO */}
        {product.images.map((img, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "url": getProductImageUrl(img, product.slug),
              "contentUrl": getProductImageUrl(img, product.slug),
              "caption": `${translatedProductName} - Image ${index + 1} - ${isIndonesian ? 'agricultural commodities' : 'Agricultural Commodities'} ${product.categories.join(' ')} Naturra Extal`,
              "description": `${translatedProductName} - ${isIndonesian ? 'agricultural commodities Premium dari' : 'Premium Agricultural Commodities from'} Naturra Extal Workshop Bekasi - ${product.price}`,
              "width": 800,
              "height": 600,
              "creditText": "Naturra Extal",
              "copyrightHolder": {
                "@type": "Organization",
                "name": "Naturra Extal"
              },
              ...DEFAULT_IMAGE_RIGHTS_METADATA,
              "publisher": {
                "@type": "Organization",
                "name": "Naturra Extal",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://Naturra-living.com/logo.png",
                  ...DEFAULT_IMAGE_RIGHTS_METADATA
                }
              }
            })}
          </script>
        ))}
      </Helmet>

      <Header isIndonesian={isIndonesian} language={language} />

      <main className="product-detail-main">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <div className="product-detail-content">
            {/* Product Gallery */}
            <div className="product-gallery">
              <div className="gallery-thumbnails">
                {product.images.map((image, index) => {
                  const isVideo = index === 2 && product.video
                  return (
                    <button
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View ${product.name} ${isVideo ? 'video' : 'image'} ${index + 1}`}
                      style={{ position: 'relative' }}
                    >
                      {isVideo ? (
                        <>
                          <video
                            src={image}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            muted
                            playsInline
                          />
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0, 0, 0, 0.6)',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none'
                          }}>
                            <Play size={16} color="white" fill="white" />
                          </div>
                        </>
                      ) : (
                        <img
                          src={image}
                          alt={getProductImageAlt(product.slug, isIndonesian, language) + (index > 0 ? ` - Image ${index + 1}` : '')}
                          title={getProductImageCaption(product.slug, isIndonesian, language) + (index > 0 ? ` - View ${index + 1}` : '')}
                          loading={index === 0 ? "eager" : "lazy"}
                          width="100"
                          height="100"
                          itemProp="image"
                          data-image-type="product-thumbnail"
                          data-product-name={product.name}
                          data-image-index={index + 1}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="gallery-main" onClick={() => selectedImage === 2 && product.video ? null : setIsImageModalOpen(true)} style={{ cursor: 'pointer' }}>
                {selectedImage === 2 && product.video ? (
                  <video
                    src={product.images[selectedImage]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                  />
                ) : (
                  <img
                    src={product.images[selectedImage]}
                    alt={getProductImageAlt(product.slug, isIndonesian, language)}
                    title={getProductImageCaption(product.slug, isIndonesian, language)}
                    className={selectedImage === 1 ? 'flipped' : ''}
                    loading="eager"
                    fetchPriority="high"
                    width="800"
                    height="600"
                    itemProp="image"
                    data-image-type="product-main"
                    data-product-name={product.name}
                    data-product-slug={product.slug}
                    data-selected-index={selectedImage}
                  />
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              <h1 className="product-detail-title">{translatedProductName}</h1>
              <p className="product-detail-categories">{product.categories.join(' & ')}</p>

              {/* Price with dual display - highlighted currency based on language, USD always non-highlighted */}
              <div className="product-price-wrapper">
                {usdPrice && highlightedPrice ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {/* Primary price - highlighted currency based on language */}
                    <p
                      className="product-detail-price"
                      style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#333'
                      }}
                    >
                      {highlightedPrice}
                    </p>
                    {/* Secondary price - contextual: ID shows USD; EN shows IDR; others show USD */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: '#999',
                        lineHeight: 1.2
                      }}
                    >
                      {language === 'id' ? usdPrice : language === 'en' ? product.price : usdPrice}
                    </p>
                  </div>
                ) : (
                  <p
                    className="product-detail-price"
                    style={{
                      margin: 0,
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#333'
                    }}
                  >
                    {product.price}
                  </p>
                )}
              </div>

              <p className="product-price-note">{uiTranslations.priceNote}</p>

              {/* Variant Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="variant-selection" style={{ marginBottom: '24px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px' }}>
                    {uiTranslations.selectSize}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.variants.map((variant: { name: string, price: string }, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedVariantIndex(index)}
                        style={{
                          padding: '10px 16px',
                          border: `1.5px solid ${selectedVariantIndex === index ? '#8B7355' : '#ddd'}`,
                          borderRadius: '6px',
                          background: selectedVariantIndex === index ? '#F9F7F4' : '#fff',
                          color: selectedVariantIndex === index ? '#8B7355' : '#666',
                          fontSize: '13px',
                          fontWeight: selectedVariantIndex === index ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="order-now-btn"
                onClick={() => {
                  // Send background email notification
                  sendBackgroundEmail('order_now', {
                    productName: translatedProductName,
                    productSlug: product.slug,
                    productPrice: product.price,
                    productCategory: product.categories.join(', '),
                    productUrl: window.location.href,
                  })

                  // Track WhatsApp click
                  trackWhatsAppClick('product_order_now', {
                    productName: translatedProductName,
                    productSlug: product.slug,
                    productPrice: currentPrice,
                    productCategory: product.categories.join(', '),
                    variant: currentDimensions || 'Standard'
                  })

                  const whatsappMessage = getWhatsappMessage(language, {
                    productName: `${translatedProductName}${currentDimensions ? ` (${currentDimensions})` : ''}`,
                    categories: product.categories.join(', '),
                    priceIDR: currentPrice,
                    priceUSD: usdPrice,
                    url: window.location.href
                  })

                  const whatsappUrl = `https://wa.me/+6288801146881?text=${encodeURIComponent(whatsappMessage)}`
                  window.location.href = whatsappUrl
                }}
              >
                {uiTranslations.orderNow}
              </button>

              <div className="product-details-box">
                <h3>{uiTranslations.productDetails}</h3>
                <div style={{ fontSize: '14px', color: '#555' }}>
                  {currentDimensions && (
                    <p style={{ marginBottom: '8px' }}>
                      <strong>{uiTranslations.dimensions} </strong>
                      {currentDimensions}
                    </p>
                  )}
                  <p>{translateProductDetails(product.details)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Product */}
          <div className="about-product-section">
            <h2>{uiTranslations.about} {translatedProductName}</h2>
            <div className="about-product-content">
              {translatedDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div className="related-products-section">
            <h2>{uiTranslations.youMightBeInterested}</h2>
            <div className="related-products-grid">
              {localizedRelated.map((relatedProduct) => (
                <Link
                  key={relatedProduct.slug}
                  to={`/product/${relatedProduct.slug}`}
                  className="related-product-card"
                >
                  <div className="related-product-image">
                    <img
                      src={relatedProduct.image}
                      alt={`${relatedProduct.name} - Related Agricultural Commodities ${translateCategory(relatedProduct.category, language)} Naturra Extal`}
                      title={`${relatedProduct.name} - Premium Agricultural Commodities ${translateCategory(relatedProduct.category, language)} by Naturra Extal`}
                      loading="lazy"
                      width="300"
                      height="200"
                      itemProp="image"
                      data-image-type="related-product"
                      data-product-name={relatedProduct.name}
                      data-category={translateCategory(relatedProduct.category, language)}
                    />
                  </div>
                  <div className="related-product-info">
                    <h3>{relatedProduct.name}</h3>
                    <p className="related-product-category">{translateCategory(relatedProduct.category, language)}</p>
                    <p className="related-product-price" style={{ marginBottom: relatedProduct.priceSecondary ? 2 : 0 }}>
                      {relatedProduct.pricePrimary}
                    </p>
                    {relatedProduct.priceSecondary ? (
                      <p className="related-product-price" style={{ color: '#888', fontSize: '0.85rem', marginTop: 0 }}>
                        {relatedProduct.priceSecondary}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AI-Optimized Content for Search Engines */}
          <ProductDetailAIContent
            product={{
              name: translatedProductName,
              price: product.price,
              categories: product.categories,
              slug: product.slug
            }}
            isIndonesian={isIndonesian}
          />
        </div>
      </main>

      {/* Image Modal Popup */}
      {isImageModalOpen && (
        <div className="image-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="image-modal-close"
              onClick={() => setIsImageModalOpen(false)}
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            <img
              src={product.images[selectedImage]}
              alt={getProductImageAlt(product.slug, isIndonesian, language)}
              title={getProductImageCaption(product.slug, isIndonesian, language)}
              className={selectedImage === 1 ? 'flipped' : ''}
            />
            <div className="image-modal-title">{translatedProductName}</div>
          </div>
        </div>
      )}

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default ProductDetail

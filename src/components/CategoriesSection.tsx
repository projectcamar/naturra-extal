import React from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../utils/analytics'
import './CategoriesSection.css'

interface CategoriesSectionProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

// Import images
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed

interface Category {
  id: number
  nameKey: string
  image: string
  link: string
}

const categories: Category[] = [
  {
    id: 1,
    nameKey: 'newArrivals',
    image: frameLoftBookshelfImage, // Frame Loft Bookshelf - produk new arrivals
    link: '/product-category/new-arrivals'
  },
  {
    id: 2,
    nameKey: 'loungeSet',
    image: loungeSetCoffeeTableImage, // Lounge Set Coffee Table - sesuai kategori lounge
    link: '/product-category/lounge-seating-set'
  },
  {
    id: 3,
    nameKey: 'sofaBench',
    image: benchImage, // Bench Corner - sesuai kategori sofa bench
    link: '/product-category/industrial-sofa-bench'
  },
  {
    id: 4,
    nameKey: 'diningSet',
    image: mejaMakanImage, // Meja makan dengan 2 kursi - sesuai dining set
    link: '/product-category/dining-set-collection'
  },
  {
    id: 5,
    nameKey: 'barSet',
    image: barChairImage, // Bar Chair - sesuai kategori bar
    link: '/product-category/bar-furniture-collection'
  },
  {
    id: 6,
    nameKey: 'outdoor',
    image: balconyBarImage, // Balcony Bar Table - sesuai outdoor
    link: '/product-category/balcony-outdoor-collection'
  },
  {
    id: 7,
    nameKey: 'daybed',
    image: daybedImage, // Industrial Daybed Frame - sesuai kategori daybed
    link: '/product-category/daybed-lounge-frame'
  },
  {
    id: 8,
    nameKey: 'storage',
    image: hollowlineDisplayRackImage, // Display Rack - sesuai storage
    link: '/product-category/accessories-storage'
  },
  {
    id: 9,
    nameKey: 'tables',
    image: mejaKerjaImage, // Meja Kerja - sesuai kategori tables
    link: '/product-category/table-collection'
  },
  {
    id: 10,
    nameKey: 'dineTable',
    image: mejaImage, // Meja makan industrial - sesuai dine table
    link: '/product-category/dining-table-collection'
  }
]

const translations = {
  en: {
    title: 'Our Categories',
    newArrivals: 'New Arrivals',
    loungeSet: 'Lounge Set',
    sofaBench: 'Sofa Bench',
    diningSet: 'Dining Set',
    barSet: 'Bar Set',
    outdoor: 'Outdoor',
    daybed: 'Daybed',
    storage: 'Storage',
    tables: 'Tables',
    dineTable: 'Dine Table'
  },
  id: {
    title: 'Kategori Produk Kami',
    newArrivals: 'Produk Baru',
    loungeSet: 'Set Lounge',
    sofaBench: 'Sofa Bench',
    diningSet: 'Set Makan',
    barSet: 'Set Bar',
    outdoor: 'Outdoor',
    daybed: 'Daybed',
    storage: 'Penyimpanan',
    tables: 'Meja',
    dineTable: 'Meja Makan'
  },
  ar: {
    title: 'فئاتنا',
    newArrivals: 'وصل حديثاً',
    loungeSet: 'طقم صالة',
    sofaBench: 'أريكة',
    diningSet: 'طقم طعام',
    barSet: 'طقم بار',
    outdoor: 'خارجي',
    daybed: 'سرير نهاري',
    storage: 'تخزين',
    tables: 'طاولات',
    dineTable: 'طاولة طعام'
  },
  zh: {
    title: '我们的类别',
    newArrivals: '新品',
    loungeSet: '休息区套装',
    sofaBench: '沙发长椅',
    diningSet: '餐桌套装',
    barSet: '吧台套装',
    outdoor: '户外',
    daybed: '躺椅',
    storage: '储物',
    tables: '桌子',
    dineTable: '餐桌'
  },
  ja: {
    title: 'カテゴリー',
    newArrivals: '新着',
    loungeSet: 'ラウンジセット',
    sofaBench: 'ソファベンチ',
    diningSet: 'ダイニングセット',
    barSet: 'バーセット',
    outdoor: 'アウトドア',
    daybed: 'デイベッド',
    storage: '収納',
    tables: 'テーブル',
    dineTable: 'ダイニングテーブル'
  },
  es: {
    title: 'Nuestras Categorías',
    newArrivals: 'Novedades',
    loungeSet: 'Set de Sala',
    sofaBench: 'Sofá Banco',
    diningSet: 'Set de Comedor',
    barSet: 'Set de Bar',
    outdoor: 'Exterior',
    daybed: 'Cama de Día',
    storage: 'Almacenamiento',
    tables: 'Mesas',
    dineTable: 'Mesa de Comedor'
  },
  fr: {
    title: 'Nos Catégories',
    newArrivals: 'Nouveautés',
    loungeSet: 'Set de Salon',
    sofaBench: 'Banc Canapé',
    diningSet: 'Set de Salle à Manger',
    barSet: 'Set de Bar',
    outdoor: 'Extérieur',
    daybed: 'Lit de Jour',
    storage: 'Rangement',
    tables: 'Tables',
    dineTable: 'Table à Manger'
  },
  ko: {
    title: '카테고리',
    newArrivals: '신제품',
    loungeSet: '라운지 세트',
    sofaBench: '소파 벤치',
    diningSet: '다이닝 세트',
    barSet: '바 세트',
    outdoor: '야외용',
    daybed: '데이베드',
    storage: '수납',
    tables: '테이블',
    dineTable: '식탁'
  }
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ isIndonesian = false, language = 'en' }) => {
  const t = translations[language]
  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="categories-title">
          {t.title}
        </h2>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link} 
              className="category-card"
              onClick={() => trackEvent.categoryClick(t[category.nameKey as keyof typeof t] as string)}
            >
              <div className="category-image-wrapper">
                <img 
                  src={category.image} 
                  alt={`${t[category.nameKey as keyof typeof t]} Industrial Furniture Collection - Mangala Living Bekasi`}
                  title={`${t[category.nameKey as keyof typeof t]} Industrial Furniture - Premium Quality from Mangala Living`}
                  className="category-image"
                  loading="lazy"
                  width="300"
                  height="200"
                  itemProp="image"
                  data-image-type="category"
                  data-category={(t[category.nameKey as keyof typeof t] as string).toLowerCase().replace(/\s+/g, '-')}
                />
              </div>
              <h3 className="category-name">{t[category.nameKey as keyof typeof t]}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection


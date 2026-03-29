import React from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../utils/analytics'
import './CategoriesSection.css'

interface CategoriesSectionProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

// Commodity images (Unsplash)
const cocoaImage = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80'
const clovesImage = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80'
const cocopeatImage = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80'
const industryImage = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'

interface Category {
  id: number
  nameKey: string
  image: string
  link: string
}

const categories: Category[] = [
  {
    id: 1,
    nameKey: 'cocoa',
    image: cocoaImage,
    link: '/products?category=cocoa'
  },
  {
    id: 2,
    nameKey: 'cloves',
    image: clovesImage,
    link: '/products?category=cloves'
  },
  {
    id: 3,
    nameKey: 'cocopeat',
    image: cocopeatImage,
    link: '/products?category=cocopeat'
  },
  {
    id: 4,
    nameKey: 'all',
    image: industryImage,
    link: '/products'
  }
]

const translations = {
  en: {
    title: 'Our Commodities',
    cocoa: 'Cocoa Products',
    cloves: 'Indonesian Cloves',
    cocopeat: 'Cocopeat & Media',
    all: 'All Products'
  },
  id: {
    title: 'Komoditas Kami',
    cocoa: 'Produk Kakao',
    cloves: 'Cengkeh Indonesia',
    cocopeat: 'Cocopeat & Media',
    all: 'Semua Produk'
  },
  ar: {
    title: 'سلعنا',
    cocoa: 'منتجات الكاكاو',
    cloves: 'القرنفل الإندونيسي',
    cocopeat: 'كوكوبيت',
    all: 'جميع المنتجات'
  },
  zh: {
    title: '我们的商品',
    cocoa: '可可产品',
    cloves: '印度尼西亚丁香',
    cocopeat: '椰糠及培养基',
    all: '所有产品'
  },
  ja: {
    title: '取扱商品',
    cocoa: 'カカオ製品',
    cloves: 'インドネシア産クローブ',
    cocopeat: 'ココピート',
    all: '全商品'
  },
  es: {
    title: 'Nuestras Mercancías',
    cocoa: 'Productos de Cacao',
    cloves: 'Clavo de Indonesia',
    cocopeat: 'Cocopeat y Medios',
    all: 'Todos los productos'
  },
  fr: {
    title: 'Nos Matières Premières',
    cocoa: 'Produits de Cacao',
    cloves: 'Clous de Girofle d\'Indonésie',
    cocopeat: 'Cocopeat',
    all: 'Tous les produits'
  },
  ko: {
    title: '주요 농산물',
    cocoa: '코코아 제품',
    cloves: '인도네시아 정향',
    cocopeat: '코코피트 배양토',
    all: '전체 제품'
  }
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ isIndonesian = false, language = 'en' }) => {
  const t = translations[language] || translations.en
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
                  alt={`${t[category.nameKey as keyof typeof t]} - Naturra Extal`}
                  title={`${t[category.nameKey as keyof typeof t]} - Naturra Extal`}
                  className="category-image"
                  loading="lazy"
                  width="300"
                  height="300"
                  itemProp="image"
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
